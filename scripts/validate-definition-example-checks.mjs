import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const STRICT_MARKER = '<!-- definition-example-audit: strict -->';
const FORMAL_START = '<!-- formal-statement-start -->';
const FORMAL_END = '<!-- formal-statement-end -->';
const EXAMPLE_START_RE = /^<!--\s*definition-example-start:\s*([^>]+?)\s*-->$/u;
const EXAMPLE_END = '<!-- definition-example-end -->';
const SKIP_RE = /^<!--\s*definition-example-skip:\s*([^|>]+?)\s*\|\s*(.+?)\s*-->$/u;
const ANCHOR_RE = /<a\s+id="([^"]+)"\s*><\/a>/u;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md' && !full.includes(`${path.sep}review${path.sep}`)) out.push(full);
  }
  return out;
}

function parseIds(raw) {
  return raw.split(',').map((id) => id.trim()).filter(Boolean);
}

const errors = [];
let strictPages = 0;
let checkedDefinitions = 0;
let checkedExamples = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const strict = lines.some((line) => line.trim() === STRICT_MARKER);
  if (strict) strictPages += 1;

  const definitions = new Set();
  const covered = new Set();
  const skipped = new Set();

  let lastAnchor = null;
  let inFormal = false;
  let formalAnchor = null;
  let formalLines = [];

  let inExample = false;
  let exampleIds = [];
  let exampleLines = [];
  let exampleStartLine = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const t = line.trim();

    const anchor = ANCHOR_RE.exec(t);
    if (anchor) lastAnchor = { id: anchor[1], line: i + 1 };

    if (t === FORMAL_START) {
      inFormal = true;
      formalAnchor = lastAnchor;
      formalLines = [];
      continue;
    }
    if (t === FORMAL_END && inFormal) {
      const body = formalLines.join('\n');
      if (/\*\*定義(?:[（(]|\*\*)/u.test(body)) {
        if (!formalAnchor?.id?.startsWith('def-')) {
          errors.push(`${rel}:${i + 1}: formal definition must have a preceding def- anchor.`);
        } else {
          definitions.add(formalAnchor.id);
        }
      }
      inFormal = false;
      formalAnchor = null;
      formalLines = [];
      continue;
    }
    if (inFormal) {
      formalLines.push(line);
      continue;
    }

    const startMatch = EXAMPLE_START_RE.exec(t);
    if (startMatch) {
      if (inExample) {
        errors.push(`${rel}:${i + 1}: nested definition-example block is not allowed.`);
        continue;
      }
      exampleIds = parseIds(startMatch[1]);
      if (exampleIds.length === 0) {
        errors.push(`${rel}:${i + 1}: definition-example-start must list at least one def- anchor.`);
      }
      for (const id of exampleIds) {
        if (!id.startsWith('def-')) errors.push(`${rel}:${i + 1}: invalid definition anchor in example block: ${id}`);
      }
      inExample = true;
      exampleLines = [];
      exampleStartLine = i + 1;
      continue;
    }

    if (t === EXAMPLE_END) {
      if (!inExample) {
        errors.push(`${rel}:${i + 1}: definition-example-end without matching start.`);
        continue;
      }
      const body = exampleLines.join('\n');
      if (!/\*\*定義の確認\*\*/u.test(body)) {
        errors.push(`${rel}:${exampleStartLine}: definition-example block must contain **定義の確認**.`);
      }
      for (const id of exampleIds) covered.add(id);
      checkedExamples += 1;
      inExample = false;
      exampleIds = [];
      exampleLines = [];
      exampleStartLine = 0;
      continue;
    }

    if (inExample) {
      exampleLines.push(line);
      continue;
    }

    const skip = SKIP_RE.exec(t);
    if (skip) {
      const id = skip[1].trim();
      const reason = skip[2].trim();
      if (!id.startsWith('def-')) errors.push(`${rel}:${i + 1}: definition-example-skip must reference a def- anchor.`);
      if (reason.length < 8) errors.push(`${rel}:${i + 1}: definition-example-skip reason is too short.`);
      skipped.add(id);
    }
  }

  if (inFormal) errors.push(`${rel}: unclosed formal-statement block.`);
  if (inExample) errors.push(`${rel}:${exampleStartLine}: unclosed definition-example block.`);

  for (const id of covered) {
    if (!definitions.has(id)) errors.push(`${rel}: definition-example references unknown definition anchor ${id}.`);
  }
  for (const id of skipped) {
    if (!definitions.has(id)) errors.push(`${rel}: definition-example-skip references unknown definition anchor ${id}.`);
  }

  if (strict) {
    checkedDefinitions += definitions.size;
    for (const id of definitions) {
      if (!covered.has(id) && !skipped.has(id)) {
        errors.push(`${rel}: strict definition-example audit: ${id} has no explicit verification block or documented skip.`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Definition-example validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Definition-example validation passed: ${strictPages} strict page(s), ${checkedDefinitions} definition(s), ${checkedExamples} verification block(s).`);
