const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
const RUN_HISTORY_SCAN = process.argv.includes("--history");
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

const IGNORED_DIRS = new Set([
  ".git",
  "node_modules",
]);

const IGNORED_FILE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".mp4",
  ".mp3",
  ".mov",
  ".avi",
  ".exe",
  ".dll",
]);

const SCAN_RULES = [
  { name: "Private key block", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { name: "AWS access key", regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g },
  { name: "GitHub token", regex: /\bghp_[A-Za-z0-9]{20,}\b/g },
  { name: "GitHub fine-grained token", regex: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g },
  { name: "Slack token", regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { name: "OpenAI live key", regex: /\bsk_live_[A-Za-z0-9]{10,}\b/g },
  { name: "Google API key", regex: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { name: "Credential in URL", regex: /:\/\/[^/\s:@]+:[^/\s@]+@/g },
  { name: "Bearer token", regex: /\bBearer\s+[A-Za-z0-9._-]{20,}\b/g },
  {
    name: "Sensitive assignment",
    regex: /\b(password|passwd|pwd|secret|token|api[_-]?key|client[_-]?secret|private[_-]?key)\b\s*[:=]\s*["'][^"'\n]{6,}["']/gi,
  },
  {
    name: "Sensitive env var assignment",
    regex: /^(PASSWORD|PASSWD|SECRET|TOKEN|API_KEY|CLIENT_SECRET|PRIVATE_KEY)\s*=\s*.+$/gim,
  },
];

const HISTORY_SCAN_PATTERNS = [
  "BEGIN [A-Z ]*PRIVATE KEY",
  "(AKIA|ASIA)[0-9A-Z]{16}",
  "ghp_[A-Za-z0-9]{20,}",
  "github_pat_[A-Za-z0-9_]{20,}",
  "xox[baprs]-[A-Za-z0-9-]{10,}",
  "sk_live_[A-Za-z0-9]{10,}",
  "AIza[0-9A-Za-z_-]{35}",
  "://[^/[:space:]:@]+:[^/[:space:]@]+@",
  "Bearer[[:space:]]+[A-Za-z0-9._-]{20,}",
];

function shouldIgnorePath(filePath) {
  const rel = path.relative(ROOT, filePath);
  if (!rel || rel.startsWith("..")) {
    return true;
  }

  const segments = rel.split(path.sep);
  if (segments.some((seg) => IGNORED_DIRS.has(seg))) {
    return true;
  }

  const ext = path.extname(filePath).toLowerCase();
  return IGNORED_FILE_EXTENSIONS.has(ext);
}

function isLikelyText(buffer) {
  if (!buffer.length) return true;
  for (let i = 0; i < Math.min(buffer.length, 1024); i += 1) {
    if (buffer[i] === 0) return false;
  }
  return true;
}

function listFilesRecursively(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const item of items) {
    const absolute = path.join(dirPath, item.name);
    if (shouldIgnorePath(absolute)) continue;

    if (item.isDirectory()) {
      files.push(...listFilesRecursively(absolute));
      continue;
    }
    if (item.isFile()) {
      files.push(absolute);
    }
  }

  return files;
}

function scanCurrentFiles() {
  const findings = [];
  const files = listFilesRecursively(ROOT);

  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.size > MAX_FILE_SIZE_BYTES) continue;

    const raw = fs.readFileSync(file);
    if (!isLikelyText(raw)) continue;
    const content = raw.toString("utf8");
    const relative = path.relative(ROOT, file);

    for (const rule of SCAN_RULES) {
      const re = new RegExp(rule.regex.source, rule.regex.flags);
      let match = re.exec(content);
      while (match) {
        findings.push({
          source: "working-tree",
          rule: rule.name,
          file: relative,
          snippet: String(match[0]).slice(0, 120),
        });
        if (findings.length > 200) return findings;
        match = re.exec(content);
      }
    }
  }

  return findings;
}

function runGit(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function scanHistory() {
  const findings = [];
  let revisions = [];

  try {
    const revRaw = runGit(["rev-list", "--all"]);
    revisions = revRaw ? revRaw.split(/\r?\n/).filter(Boolean) : [];
  } catch {
    return findings;
  }

  for (const rev of revisions) {
    for (const pattern of HISTORY_SCAN_PATTERNS) {
      try {
        const output = runGit(["grep", "-nEI", pattern, rev, "--", "."]);
        if (!output) continue;
        output.split(/\r?\n/).forEach((line) => {
          if (!line) return;
          findings.push({
            source: `git-history:${rev.slice(0, 8)}`,
            rule: `Pattern: ${pattern}`,
            file: line.split(":")[0] || line,
            snippet: line.slice(0, 160),
          });
        });
      } catch (error) {
        // Exit code 1 means no match for git grep; ignore it.
        if (typeof error.status === "number" && error.status === 1) {
          continue;
        }
        findings.push({
          source: "git-history",
          rule: "Scan error",
          file: rev,
          snippet: `Failed to scan revision: ${error.message}`,
        });
      }
      if (findings.length > 200) return findings;
    }
  }

  return findings;
}

function printFindings(findings) {
  // eslint-disable-next-line no-console
  console.error(`\nSecurity scan found ${findings.length} potential issue(s):`);
  findings.forEach((item, index) => {
    // eslint-disable-next-line no-console
    console.error(
      `${index + 1}. [${item.source}] ${item.rule}\n   file: ${item.file}\n   match: ${item.snippet}`
    );
  });
}

function main() {
  const findings = scanCurrentFiles();
  const historyFindings = RUN_HISTORY_SCAN ? scanHistory() : [];
  const allFindings = findings.concat(historyFindings);

  if (allFindings.length) {
    printFindings(allFindings);
    process.exitCode = 1;
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    RUN_HISTORY_SCAN
      ? "security-scan=ok scope=working-tree+history"
      : "security-scan=ok scope=working-tree"
  );
}

main();
