import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import YAML from "yaml";
import { ROOT, loadSyllabus, readCards } from "./lib.mjs";

const cards = readCards();
const syllabus = loadSyllabus();
const progress = YAML.parse(fs.readFileSync(path.join(ROOT, "progress.yaml"), "utf8"));
const scopeCoverage = YAML.parse(fs.readFileSync(path.join(ROOT, "syllabus", "coverage.yaml"), "utf8"));
const categoryIds = new Set(syllabus.categories.map((item) => item.id));
const subcategoryIds = new Set(syllabus.categories.flatMap((item) => item.children));
const allowedTypes = new Set(["formula", "theorem", "condition", "proof_step", "calc_step", "expansion", "recognition", "strategy", "reverse", "pitfall"]);
const allowedPriorities = new Set(["S", "A", "B", "C", "D"]);
const ids = new Set();
const errors = [];
const warnings = [];
for (const subcategory of subcategoryIds) if (!syllabus.subcategories?.[subcategory]) errors.push(`subcategory ${subcategory} の日本語表示名がありません`);
if (!Number.isInteger(progress.cards_per_page) || progress.cards_per_page < 1 || progress.cards_per_page > 200) errors.push("cards_per_page は1〜200にします");
const notation = fs.readFileSync(path.join(ROOT, "notation.md"), "utf8");
if (!notation.includes("記法の正本")) errors.push("notation.md に正本の宣言がありません");
const formulae = fs.readFileSync(path.join(ROOT, "formulae.md"), "utf8");
if (!formulae.includes("公式・定理・定義の正本")) errors.push("formulae.md に正本の宣言がありません");
for (const [name, source] of [["notation.md", notation], ["formulae.md", formulae]]) {
  for (const match of source.matchAll(/\$\$([\s\S]*?)\$\$|(?<!\$)\$([^\n$]+?)\$(?!\$)/g)) {
    try { katex.renderToString(match[1] ?? match[2], { displayMode: match[1] !== undefined, throwOnError: true, strict: "error" }); }
    catch (err) { errors.push(`${name}: KaTeX: ${err.message}`); }
  }
}
const reviewedEnd = Math.max(0, ...Object.values(progress.batches).filter((batch) => batch.status === "reviewed").map((batch) => batch.range[1]));
const activeBatch = progress.current_batch ? progress.batches[progress.current_batch] : null;
const allowedEnd = activeBatch ? activeBatch.range[1] : reviewedEnd;
if (cards.length < reviewedEnd || cards.length > allowedEnd) errors.push(`カード数 ${cards.length} は進捗範囲 ${reviewedEnd}〜${allowedEnd} と一致しません`);

function error(card, message) {
  errors.push(`${path.relative(ROOT, card.file)}: ${message}`);
}

for (const card of cards) {
  for (const field of ["id", "title", "category", "subcategory", "topic", "type", "difficulty", "priority", "hashtags", "frequency", "sources"]) {
    if (card[field] === undefined || card[field] === null || card[field] === "") error(card, `${field} は必須です`);
  }
  if (ids.has(card.id)) error(card, `ID ${card.id} が重複しています`);
  ids.add(card.id);
  if (!categoryIds.has(card.category)) error(card, `未知の category: ${card.category}`);
  if (!subcategoryIds.has(card.subcategory)) error(card, `未知の subcategory: ${card.subcategory}`);
  const parent = syllabus.categories.find((item) => item.id === card.category);
  if (parent && !parent.children.includes(card.subcategory)) error(card, `${card.subcategory} は category ${card.category} の子ではありません`);
  if (!allowedTypes.has(card.type)) error(card, `未知の type: ${card.type}`);
  if (!Number.isInteger(card.difficulty) || card.difficulty < 1 || card.difficulty > 5) error(card, "difficulty は1〜5の整数です");
  if (!allowedPriorities.has(card.priority)) error(card, `未知の priority: ${card.priority}`);
  const hasConcreteSource = card.sources.some((source) => source.type === "past_exam" || source.type === "textbook" || source.type === "independent_problem");
  const claimedFrequency = Object.values(card.frequency || {}).some((value) => Number(value) > 0);
  if (claimedFrequency && !hasConcreteSource) error(card, "正のfrequencyには具体的な過去問・教科書・独自問題sourceが必要です");
  if (["S", "A"].includes(card.priority) && !hasConcreteSource) error(card, "priority S/Aには具体的sourceが必要です");
  if (!Array.isArray(card.hashtags) || card.hashtags.length === 0) error(card, "hashtags は1件以上必要です");
  if (!card.sections["問題"] || !(card.sections["答え"] || card.sections["方針"])) error(card, "「問題」と「答え」または「方針」が必要です");
  if (!card.sections["使用公式・定理"]) error(card, "「使用公式・定理」が必要です");
  if (!card.sections["計算例"]) error(card, "公式を適用する「計算例」が必要です");
  if (!card.sections["使用公式・定理"]) error(card, "「使用公式・定理」が必要です");
  if (!card.sections["計算例"]) error(card, "公式を適用する「計算例」が必要です");
  if (["formula", "strategy", "calc_step", "expansion", "recognition"].includes(card.type) && !card.sections["計算例"]) {
    error(card, `${card.type} カードには「計算例」が必要です`);
  }
  if ((card.sections["問題"] || "").length > 700) warnings.push(`${card.id}: 問題が長すぎる可能性があります`);
  const delimiters = [...card.body.matchAll(/\$\$([\s\S]*?)\$\$|(?<!\$)\$([^\n$]+?)\$(?!\$)/g)];
  for (const match of delimiters) {
    const latex = match[1] ?? match[2];
    try {
      katex.renderToString(latex, { displayMode: Boolean(match[1]), throwOnError: true, strict: "error" });
    } catch (err) {
      error(card, `KaTeX: ${err.message}`);
    }
  }
  const dollarCount = (card.body.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 !== 0) error(card, "LaTeX delimiter $ の個数が奇数です");
  for (const [pattern, message] of [[/V\s*\[/, "分散は operatorname{Var} を使います"], [/\\\(|\\\[/, "禁止されたLaTeX delimiterです"], [/\bX'/, "転置は mathsf T を使います"]]) {
    if (pattern.test(card.body)) error(card, message);
  }
  const question = card.sections["問題"] || "";
  for (const [symbol, japanese] of [[/(?<!\\mathbb\s)N(?:_|\()/, "正規分布"], [/U\(/, "一様分布"], [/\\operatorname\{Poisson\}/, "Poisson分布"], [/\\operatorname\{Binomial\}/, "二項分布"], [/\\operatorname\{Bernoulli\}/, "Bernoulli分布"], [/\\operatorname\{Exp\}/, "指数分布"], [/\\operatorname\{Beta\}/, "Beta分布"]]) {
    if (symbol.test(question) && !question.includes(japanese)) error(card, `問題では記号より先に日本語名「${japanese}」を明記します`);
  }
}
for (const item of scopeCoverage.items) {
  if (!new Set(["card", "reference", "planned"]).has(item.status)) errors.push(`coverage ${item.id}: 未知のstatus`);
  for (const cardId of item.cards || []) if (!ids.has(cardId)) errors.push(`coverage ${item.id}: 未知のcard ID ${cardId}`);
  if (item.status === "card" && !(item.cards || []).length) errors.push(`coverage ${item.id}: card statusにカードがありません`);
}

const coverage = syllabus.categories.map((category) => ({
  category: category.name,
  count: cards.filter((card) => card.category === category.id).length,
  missing: category.children.filter((sub) => !cards.some((card) => card.subcategory === sub)),
}));
for (const item of coverage) {
  if (item.count === 0) errors.push(`シラバス category「${item.category}」にカードがありません`);
  if (item.missing.length) errors.push(`シラバス category「${item.category}」の未収録 subcategory: ${item.missing.join(", ")}`);
}

const reportDir = path.join(ROOT, "reports");
fs.mkdirSync(reportDir, { recursive: true });
const typeNames = ["formula", "theorem", "condition", "proof_step", "calc_step", "expansion", "recognition", "strategy", "reverse", "pitfall"];
const coverageLines = ["# シラバス coverage", "", `- 公開カード: ${cards.length}`, "", "| category | cards | subcategory coverage | types |", "|---|---:|---:|---|", ...syllabus.categories.map((category) => {
  const owned = cards.filter((card) => card.category === category.id);
  const covered = category.children.filter((sub) => owned.some((card) => card.subcategory === sub)).length;
  const types = typeNames.filter((type) => owned.some((card) => card.type === type)).join(", ");
  return `| ${category.name} | ${owned.length} | ${covered}/${category.children.length} | ${types} |`;
}), "", "## 公式範囲の原子項目", "", "`card` はpilot内で計算カードあり、`reference` は正本に定義あり、`planned` はpilot後の拡張対象を表す。", "", "| item | status | cards |", "|---|---|---|", ...scopeCoverage.items.map((item) => `| ${item.name} | ${item.status} | ${(item.cards || []).join(", ")} |`)];
fs.writeFileSync(path.join(reportDir, "coverage.md"), `${coverageLines.join("\n")}\n`);
const moves = [...new Set(cards.flatMap((card) => card.hashtags))]
  .map((tag) => ({ tag, count: cards.filter((card) => card.hashtags.includes(tag)).length }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
fs.writeFileSync(path.join(reportDir, "frequent_moves.md"), `# 頻出 move（pilot内）\n\n| tag | cards |\n|---|---:|\n${moves.map((item) => `| ${item.tag} | ${item.count} |`).join("\n")}\n`);
const normalized = (card) => `${card.title} ${card.topic}`.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const duplicates = [];
for (let i = 0; i < cards.length; i += 1) for (let j = i + 1; j < cards.length; j += 1) if (normalized(cards[i]) === normalized(cards[j])) duplicates.push(`${cards[i].id} / ${cards[j].id}`);
fs.writeFileSync(path.join(reportDir, "duplicate_candidates.md"), `# 重複候補\n\n${duplicates.length ? duplicates.map((item) => `- ${item}`).join("\n") : "なし"}\n`);
const report = [
  "# カード検証結果",
  "",
  `- カード数: ${cards.length}`,
  `- errors: ${errors.length}`,
  `- warnings: ${warnings.length}`,
  "",
  "## エラー",
  "",
  ...(errors.length ? errors.map((item) => `- ${item}`) : ["なし"]),
  "",
  "## 警告",
  "",
  ...(warnings.length ? warnings.map((item) => `- ${item}`) : ["なし"]),
].join("\n");
fs.writeFileSync(path.join(reportDir, "validation_errors.md"), `${report}\n`);

if (errors.length) {
  console.error(report);
  process.exit(1);
}
console.log(`validated ${cards.length} cards (${warnings.length} warnings)`);
