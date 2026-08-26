import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = process.cwd();
const textbookRoot = path.join(root, 'textbook', 'volumes');
const rows = [];

for (const volume of fs.readdirSync(textbookRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const volumeDir = path.join(textbookRoot, volume.name);
  for (const chapter of fs.readdirSync(volumeDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const chapterDir = path.join(volumeDir, chapter.name);
    const manifestPath = path.join(chapterDir, 'chapter.yaml');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = YAML.parse(fs.readFileSync(manifestPath, 'utf8'));
    rows.push(auditChapter(chapterDir, manifest.id));
  }
}

rows.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
console.log('通常教材 詳細解答粒度監査（非ブロッキング）');
console.log('粒度基準: statistical-mathematics/core/40_fisher_information_delta_mle_efficiency.md と references/official-scope.md');
for (const row of rows) {
  console.log(`${row.label.padEnd(7)} ${row.id.padEnd(7)} score=${String(row.score).padStart(2)} problems=${row.problemCount} solutions=${row.solutionCount} ${row.notes.join(' / ')}`);
}
console.log('判定は候補抽出です。文字数だけで水増しせず、採点対象の出発点・条件・主要な途中計算・結論を再現できるか本文で確認してください。');

function auditChapter(chapterDir, id) {
  const canonical = path.join(chapterDir, 'index.md');
  let problems = new Map();
  let solutions = new Map();

  if (fs.existsSync(canonical)) {
    const source = fs.readFileSync(canonical, 'utf8');
    ({ problems, solutions } = parseCanonical(source));
  } else {
    const exercises = findPrefix(chapterDir, '06_');
    const answerFile = findPrefix(chapterDir, '07_');
    if (exercises) problems = parseProblems(fs.readFileSync(exercises, 'utf8'));
    if (answerFile) solutions = parseLegacySolutions(fs.readFileSync(answerFile, 'utf8'));
  }

  let score = 0;
  const notes = [];
  const missingIds = [];
  const shortIds = [];
  const missingExamAnswerIds = [];
  const missingRubricIds = [];
  const skipIds = [];
  let skipPhrases = 0;

  for (const [problemId, problem] of problems) {
    const solution = solutions.get(problemId);
    if (solution == null) {
      missingIds.push(problemId);
      score += 10;
      continue;
    }
    const tasks = Math.max(1, (problem.match(/^\s*\d+[.)]\s+/gm) ?? []).length);
    const detail = plainLength(extractDetailedSolution(solution));
    const minimum = Math.max(180, tasks * 220);
    if (detail < minimum) {
      shortIds.push(problemId);
      score += 4;
    }
    if (!/本番答案/.test(solution)) {
      missingExamAnswerIds.push(problemId);
      score += 3;
    }
    if (!/採点基準/.test(solution)) {
      missingRubricIds.push(problemId);
      score += 3;
    }
    const skips = solution.match(/簡単な計算|計算すると|整理すると|直ちに|微分すると|積分すると|平方完成すると|これを解くと/g) ?? [];
    if (skips.length) skipIds.push(`${problemId}:${skips.length}`);
    skipPhrases += skips.length;
    score += Math.min(skips.length, 3);
  }

  if (missingIds.length) notes.push(`解答なし${missingIds.length}[${missingIds.join(',')}]`);
  if (shortIds.length) notes.push(`短い詳細解答候補${shortIds.length}[${shortIds.join(',')}]`);
  if (missingExamAnswerIds.length) notes.push(`本番答案なし${missingExamAnswerIds.length}[${missingExamAnswerIds.join(',')}]`);
  if (missingRubricIds.length) notes.push(`採点基準なし${missingRubricIds.length}[${missingRubricIds.join(',')}]`);
  if (skipPhrases) notes.push(`省略表現${skipPhrases}[${skipIds.join(',')}]`);
  if (!notes.length) notes.push('機械監査では大きな候補なし');

  const label = missingIds.length > 0 || score >= 12 ? 'REWRITE' : score > 0 ? 'EXPAND' : 'PASS';
  return { id, label, score, problemCount: problems.size, solutionCount: solutions.size, notes };
}

function parseProblems(source) {
  const map = new Map();
  const lines = source.split('\n');
  for (let i = 0; i < lines.length;) {
    const match = lines[i].match(/^###\s+([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)\b/);
    if (!match) { i += 1; continue; }
    const id = match[1];
    const block = [lines[i++]];
    while (i < lines.length && !/^##\s+/.test(lines[i]) && !/^###\s+/.test(lines[i])) block.push(lines[i++]);
    map.set(id, block.join('\n'));
  }
  return map;
}

function parseLegacySolutions(source) {
  const map = new Map();
  const lines = source.split('\n');
  for (let i = 0; i < lines.length;) {
    const match = lines[i].match(/^##\s+([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)\s+解答\b/);
    if (!match) { i += 1; continue; }
    const id = match[1];
    const block = [];
    i += 1;
    while (i < lines.length && !/^##\s+/.test(lines[i])) block.push(lines[i++]);
    map.set(id, block.join('\n'));
  }
  return map;
}

function parseCanonical(source) {
  const problems = new Map();
  const solutions = new Map();
  const lines = source.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^(#{2,3})\s+([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)\b/);
    if (!match) continue;

    const headingDepth = match[1].length;
    const id = match[2];
    let end = i + 1;
    while (end < lines.length) {
      const nextHeading = lines[end].match(/^(#{1,6})\s+/);
      if (nextHeading && nextHeading[1].length <= headingDepth) break;
      end += 1;
    }
    const blockLines = lines.slice(i, end);
    const block = blockLines.join('\n');

    // Canonical single-page chapters contain many hyphenated technique/theorem
    // headings (e.g. SUPPORT-1). Only exercise/drill blocks carry exercise
    // metadata or an inline solution marker, so do not count ordinary prose
    // headings as unanswered problems.
    if (!/^-\s+level:\s*/m.test(block) && !block.includes('<!-- solution-start -->')) continue;

    const marker = blockLines.indexOf('<!-- solution-start -->');
    const problemLines = marker >= 0 ? blockLines.slice(0, marker) : blockLines;
    problems.set(id, problemLines.join('\n'));

    if (marker >= 0) {
      const solutionEnd = blockLines.indexOf('<!-- solution-end -->', marker + 1);
      const answerLines = solutionEnd >= 0
        ? blockLines.slice(marker + 1, solutionEnd)
        : blockLines.slice(marker + 1);
      solutions.set(id, answerLines.join('\n'));
    }
  }

  return { problems, solutions };
}

function extractDetailedSolution(solution) {
  const start = solution.search(/#{3,5}\s+詳細解答\b/);
  if (start < 0) return solution;
  const tail = solution.slice(start);
  const end = tail.search(/\n#{3,5}\s+本番答案\b/);
  return end >= 0 ? tail.slice(0, end) : tail;
}

function findPrefix(directory, prefix) {
  const name = fs.readdirSync(directory).find((value) => value.startsWith(prefix) && value.endsWith('.md'));
  return name ? path.join(directory, name) : null;
}

function plainLength(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    // Formula-heavy statistical solutions should not be treated as short merely
    // because mathematics is enclosed in delimiters. Keep the formula body and
    // remove only Markdown/LaTeX delimiters and presentation punctuation.
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/[#*`>|_]/g, '')
    .replace(/\s+/g, '')
    .length;
}
