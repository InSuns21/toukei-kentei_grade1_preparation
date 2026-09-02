import fs from 'node:fs';
import path from 'node:path';

const SITE = path.resolve('_site');
const TEXTBOOK = path.join(SITE, 'textbook');
const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
const STABLE_PREFIX = '(?:def|thm|prop|lem|cor|axiom|principle|ref)';
const stableFragmentRe = new RegExp(`^${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*$`);
const stableFragmentInHrefRe = new RegExp(`#${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*`);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function resolveGeneratedTarget(sourceFile, href) {
  const hashIndex = href.indexOf('#');
  const pathPart = hashIndex < 0 ? href : href.slice(0, hashIndex);
  const fragment = hashIndex < 0 ? '' : href.slice(hashIndex + 1).split('?', 1)[0];
  if (!stableFragmentRe.test(fragment)) return null;

  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) {
    throw new Error(`stable formal reference must be internal: ${href}`);
  }

  if (!pathPart || pathPart.startsWith('#')) {
    return { target: sourceFile, fragment };
  }
  if (pathPart.startsWith('/')) {
    throw new Error(`project-site absolute path is not allowed for formal reference: ${href}`);
  }

  let decoded;
  try {
    decoded = decodeURIComponent(pathPart.split('?', 1)[0]).replaceAll('\\', '/');
  } catch (error) {
    throw new Error(`malformed URL encoding in ${href}: ${error.message}`);
  }

  const normalized = path.posix.normalize(decoded.replace(/^\.\//, ''));
  if (normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`formal reference is still directory-relative after Pages normalization: ${href}`);
  }
  return { target: path.resolve(SITE, ...normalized.split('/')), fragment };
}

function visibleMarkdownLines(markdown) {
  const out = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    out.push(line.replace(/`[^`]*`/g, ''));
  }
  return out;
}

if (!fs.existsSync(TEXTBOOK)) {
  console.error('Formal Pages reference validation failed: _site/textbook does not exist. Run after Pages assembly.');
  process.exit(1);
}

const errors = [];
let checked = 0;
const files = walk(TEXTBOOK);
const siteRoot = SITE + path.sep;

for (const file of files) {
  const rel = path.relative(SITE, file).replaceAll(path.sep, '/');
  const markdown = fs.readFileSync(file, 'utf8');
  for (const line of visibleMarkdownLines(markdown)) {
    for (const match of line.matchAll(linkRe)) {
      const href = match[2].trim();
      if (!stableFragmentInHrefRe.test(href)) continue;

      let resolved;
      try {
        resolved = resolveGeneratedTarget(file, href);
      } catch (error) {
        errors.push(`${rel}: ${error.message}`);
        continue;
      }
      if (!resolved) continue;
      checked += 1;

      const { target, fragment } = resolved;
      if (target !== SITE && !target.startsWith(siteRoot)) {
        errors.push(`${rel}: formal reference escapes generated site: ${href}`);
        continue;
      }
      if (!fs.existsSync(target)) {
        errors.push(`${rel}: formal reference target file is missing after Pages assembly: ${href}`);
        continue;
      }

      const targetMarkdown = fs.readFileSync(target, 'utf8');
      const doubleQuoted = `<a id="${fragment}"></a>`;
      const singleQuoted = `<a id='${fragment}'></a>`;
      if (!targetMarkdown.includes(doubleQuoted) && !targetMarkdown.includes(singleQuoted)) {
        const targetRel = path.relative(SITE, target).replaceAll(path.sep, '/');
        errors.push(`${rel}: #${fragment} is missing from generated target ${targetRel}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Formal Pages reference validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Formal Pages reference validation passed: ${checked} generated stable formal link(s) across ${files.length} textbook Markdown file(s).`);
