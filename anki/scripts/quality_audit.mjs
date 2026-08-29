import fs from "node:fs";
import path from "node:path";
import { ROOT, plainText, readAllCards } from "./lib.mjs";

const strict = process.argv.includes("--strict");
const cards = readAllCards();
const reportDir = path.join(ROOT, "reports");
fs.mkdirSync(reportDir, { recursive: true });

const operationTypes = new Set(["calc_step", "strategy", "expansion", "proof_step"]);
const jumpPattern = /(計算すると|整理すると|同様に|直ちに|容易に分かる|簡単に分かる|ただちに)/;

function normalize(text = "") {
  return text
    .normalize("NFKC")
    .replace(/\\begin\{aligned\}|\\end\{aligned\}|\\begin\{cases\}|\\end\{cases\}/g, "")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .toLowerCase();
}

function mathBlocks(text = "") {
  return [...text.matchAll(/\$\$([\s\S]*?)\$\$/g)].map((match) => match[1]);
}

function operationSignals(text = "") {
  const equality = (text.match(/(?<![<>!])=(?!=)/g) || []).length;
  const implication = (text.match(/\\(?:Longleftrightarrow|Leftrightarrow|Rightarrow|to|xrightarrow)/g) || []).length;
  const calculus = (text.match(/\\(?:frac\{d|int|sum|prod|partial|log|exp)/g) || []).length;
  return equality + implication + Math.min(calculus, 2);
}

function hasLinewiseMath(text = "") {
  return /\\begin\{aligned\}|\\begin\{align/.test(text) || /\\\\/.test(text);
}

function isCompressedMath(block = "") {
  const equality = (block.match(/(?<![<>!])=(?!=)/g) || []).length;
  const implication = (block.match(/\\(?:Longleftrightarrow|Leftrightarrow|Rightarrow)/g) || []).length;
  return block.length >= 180 && equality + implication >= 3 && !hasLinewiseMath(block);
}

function similarity(a = "", b = "") {
  const x = normalize(a);
  const y = normalize(b);
  if (!x || !y) return 0;
  if (x === y) return 1;
  if (x.includes(y) || y.includes(x)) return Math.min(x.length, y.length) / Math.max(x.length, y.length);
  const grams = (value) => {
    const set = new Set();
    for (let i = 0; i < value.length - 2; i += 1) set.add(value.slice(i, i + 3));
    return set;
  };
  const gx = grams(x);
  const gy = grams(y);
  if (!gx.size || !gy.size) return 0;
  let common = 0;
  for (const gram of gx) if (gy.has(gram)) common += 1;
  return common / (gx.size + gy.size - common);
}

function addIssue(issues, severity, card, reason) {
  issues.push({
    severity,
    id: card.id,
    title: card.title,
    type: card.type,
    difficulty: Number(card.difficulty || 0),
    category: card.category,
    subcategory: card.subcategory,
    reason,
  });
}

const issues = [];
for (const card of cards) {
  const example = card.sections["計算例"] || "";
  const answer = card.sections["答え"] || card.sections["方針"] || "";
  const formula = card.sections["使用公式・定理"] || "";
  const examplePlain = plainText(example);
  const exampleSignals = operationSignals(example);
  const answerSignals = operationSignals(answer);
  const formulaSignals = operationSignals(formula);
  const difficulty = Number(card.difficulty || 0);
  const operational = operationTypes.has(card.type);

  if (!example.trim()) {
    addIssue(issues, "P0", card, "計算例が空です");
    continue;
  }

  if (operational && difficulty >= 2 && examplePlain.length < 55 && exampleSignals === 0) {
    addIssue(issues, "P0", card, "計算・解法カードだが、計算例が短く本質的操作を確認できません");
  } else if (operational && difficulty >= 3 && examplePlain.length < 100 && exampleSignals < 2) {
    addIssue(issues, "P1", card, "難度3以上の計算・解法カードとして途中操作が少なく、式展開を追いにくい可能性があります");
  }

  const answerSimilarity = similarity(example, answer);
  if (answerSimilarity >= 0.9 && normalize(example).length < 260) {
    addIssue(issues, "P1", card, "計算例が答え・方針のほぼ再掲になっています");
  }

  const compressed = mathBlocks(example).filter(isCompressedMath);
  if (compressed.length) {
    addIssue(issues, "P1", card, `計算例に長い1行式が${compressed.length}個あり、複数操作を aligned 等で分ける余地があります`);
  }

  if (jumpPattern.test(example) && exampleSignals < 2) {
    addIssue(issues, "P1", card, "「計算すると／整理すると／同様に」等で主要な途中式を飛ばしている可能性があります");
  }

  if (operational && formulaSignals >= 3 && exampleSignals <= 1 && examplePlain.length < 180) {
    addIssue(issues, "P1", card, "導出の主要部分が「使用公式・定理」に偏り、計算例が適用過程を再現していません");
  }

  if (operational && difficulty >= 2 && answerSignals >= 2 && exampleSignals <= 1 && examplePlain.length < 180) {
    addIssue(issues, "P1", card, "主要な計算が「答え」に集中し、「計算例」が適用過程を担っていません");
  }

  if (difficulty >= 3 && operational) {
    const hasMoveSection = Boolean(
      card.sections["一手"]
      || card.sections["重要な一手"]
      || card.sections["方針"]
      || card.sections["なぜ"]
      || card.sections["なぜ？"]
    );
    if (!hasMoveSection) {
      addIssue(issues, "P2", card, "難度3以上だが「一手／重要な一手／方針／なぜ」がなく、発火条件が弱いです");
    }
  }

  if (difficulty >= 2 && operational && examplePlain.length > 1500) {
    addIssue(issues, "P2", card, "計算例が長すぎ、1カード1解法単位を超えている可能性があります");
  }
}

const severityRank = new Map([["P0", 0], ["P1", 1], ["P2", 2]]);
issues.sort((a, b) => severityRank.get(a.severity) - severityRank.get(b.severity)
  || b.difficulty - a.difficulty
  || a.id.localeCompare(b.id, "ja"));

const counts = { P0: 0, P1: 0, P2: 0 };
for (const issue of issues) counts[issue.severity] += 1;
const affected = new Set(issues.map((issue) => issue.id));

const lines = [
  "# Anki canonical card 品質監査",
  "",
  `- canonical cards: ${cards.length}`,
  `- affected cards: ${affected.size}`,
  `- P0: ${counts.P0}`,
  `- P1: ${counts.P1}`,
  `- P2: ${counts.P2}`,
  "",
  "> P0/P1/P2 は自動ヒューリスティックです。削除・書換えの最終判断はカード本文を読んで行います。",
  "",
  "## 判定基準",
  "",
  "- P0: 計算例が実質空、または計算・解法カードとして本質的操作を確認できない",
  "- P1: 答え再掲、答え欄への計算偏在、長い1行式、主要な途中式の飛躍など学習上の問題が疑われる",
  "- P2: 一手・説明・長さなど改善余地がある",
  "",
  "## 修正キュー",
  "",
  "| severity | id | title | type | difficulty | reason |",
  "|---|---|---|---|---:|---|",
  ...issues.map((issue) => `| ${issue.severity} | ${issue.id} | ${String(issue.title).replaceAll("|", "\\|")} | ${issue.type} | ${issue.difficulty} | ${issue.reason.replaceAll("|", "\\|")} |`),
  "",
  "## 運用",
  "",
  "- まず重複・低価値カードを archive し、残す canonical だけを書き直します。",
  "- merge 時は archive 側にしかない有益な導出・条件を canonical へ吸収してから削減します。",
  "- `答え` は結論を短く示し、主要な導出・数値代入・途中式は `計算例` で追える形にします。",
  "- 自動監査だけでカードを削除しません。",
  "- 既存負債の移行中は通常実行を non-strict とし、`--strict` のときのみ P0 があれば失敗します。",
  "",
];

const reportPath = path.join(reportDir, "quality_audit.md");
fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");
console.log(`quality audit: ${cards.length} cards, ${affected.size} affected (P0=${counts.P0}, P1=${counts.P1}, P2=${counts.P2})`);
console.log(`report: ${path.relative(process.cwd(), reportPath)}`);

if (strict && counts.P0 > 0) process.exit(1);
