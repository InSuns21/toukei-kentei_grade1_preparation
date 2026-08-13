import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import katex from "katex";
import YAML from "yaml";
import { ROOT, loadSyllabus, readCards } from "./lib.mjs";

const cards = readCards();
const syllabus = loadSyllabus();
const progress = YAML.parse(fs.readFileSync(path.join(ROOT, "progress.yaml"), "utf8"));
const scopeCoverage = YAML.parse(fs.readFileSync(path.join(ROOT, "syllabus", "coverage.yaml"), "utf8"));
const categoryIdList = syllabus.categories.map((item) => item.id);
const childIdList = syllabus.categories.flatMap((item) => item.children);
const categoryIds = new Set(categoryIdList);
const subcategoryIds = new Set(childIdList);
const displayCategoryName = (item) => item.display_name || item.name;
const allowedTypes = new Set(["formula", "theorem", "condition", "proof_step", "calc_step", "expansion", "recognition", "strategy", "reverse", "pitfall"]);
const allowedPriorities = new Set(["S", "A", "B", "C", "D"]);
const ids = new Set();
const errors = [];
const warnings = [];
// 画像1.jpg〜4.jpgから目視転記した対象範囲だけを固定する。aim_summaryは要約なので対象外。
const officialProjection = {
  scope: syllabus.scope,
  categories: syllabus.categories.map(({ id, name, section, source_section, page, children, prerequisite }) => ({
    id, name, section, source_section: source_section ?? null, page, children, prerequisite: prerequisite ?? null,
  })),
  subcategories: syllabus.subcategories,
  items: syllabus.items,
};
const officialScopeHash = createHash("sha256").update(JSON.stringify(officialProjection)).digest("hex");
if (officialScopeHash !== "cfba46381c4839c1732a6b311125a8ea31c1efe1c262c2e5c7382ed35411ca74") errors.push("画像版公式出題範囲から転記した対象・階層・用語例が変更されています");
const expectedApplicationDisplayNames = new Map([["applied-common", "統計応用（共通事項）"], ["applied-engineering", "統計応用（理工学）"]]);
for (const [id, expected] of expectedApplicationDisplayNames) if (syllabus.categories.find((category) => category.id === id)?.display_name !== expected) errors.push(`${id}: display_nameは「${expected}」にします`);
for (const id of expectedApplicationDisplayNames.keys()) if (syllabus.categories.find((category) => category.id === id)?.display_section !== "統計応用") errors.push(`${id}: display_sectionは「統計応用」にします`);
if (syllabus.schema_version !== 2) errors.push("syllabus.yaml は公式画像階層schema_version 2にします");
if (scopeCoverage.schema_version !== 2) errors.push("coverage.yaml はschema_version 2にします");
if (progress.schema_version !== 3) errors.push("progress.yaml は1〜2サブカテゴリー作業schema_version 3にします");
if (categoryIds.size !== categoryIdList.length) errors.push("syllabus.categoriesのIDが重複しています");
if (subcategoryIds.size !== childIdList.length) errors.push("同じ小項目IDが複数の大項目に登録されています");
if (new Set(syllabus.categories.map((item) => item.order)).size !== syllabus.categories.length) errors.push("syllabus.categoriesのorderが重複しています");
const syllabusItemIds = (syllabus.items || []).map((item) => item.id);
if (new Set(syllabusItemIds).size !== syllabusItemIds.length) errors.push("syllabus.itemsのIDが重複しています");
for (const subcategory of subcategoryIds) {
  if (!syllabus.subcategories?.[subcategory]) errors.push(`subcategory ${subcategory} の日本語表示名がありません`);
  const item = syllabus.items?.find((candidate) => candidate.id === subcategory);
  if (!item) errors.push(`subcategory ${subcategory} の公式用語項目がありません`);
  else if (!Array.isArray(item.terms) || !item.terms.length) errors.push(`subcategory ${subcategory} の公式用語例がありません`);
}
for (const itemId of syllabusItemIds) if (!subcategoryIds.has(itemId)) errors.push(`公式用語項目 ${itemId} がカテゴリー階層にありません`);
const sourcePdf = path.resolve(ROOT, "syllabus", syllabus.source?.pdf || "");
if (!syllabus.source?.pdf || !fs.existsSync(sourcePdf)) errors.push(`公式シラバスPDFがありません: ${syllabus.source?.pdf || "未指定"}`);
const sourceImages = syllabus.source?.images || [];
if (sourceImages.length !== 4) errors.push("目視転記の根拠画像は1.jpgから4.jpgまでの4ページを登録します");
if (new Set(sourceImages.map((image) => image.page)).size !== sourceImages.length) errors.push("公式シラバス画像のpageが重複しています");
for (const image of sourceImages) {
  const imagePath = path.resolve(ROOT, "syllabus", image.file);
  if (!fs.existsSync(imagePath)) errors.push(`公式シラバス画像がありません: ${image.file}`);
}
const includedApplicationRows = new Set(syllabus.scope?.included_application_rows || []);
const excludedApplicationRows = new Set(syllabus.scope?.excluded_application_rows || []);
for (const row of includedApplicationRows) if (!syllabus.categories.some((category) => category.name === row)) errors.push(`対象の統計応用行がカテゴリーにありません: ${row}`);
for (const row of excludedApplicationRows) if (syllabus.categories.some((category) => category.name === row)) errors.push(`対象外の統計応用行をカテゴリーへ登録しています: ${row}`);
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
const allowedStatuses = new Set(["planned", "drafting", "self_review", "independent_review", "revision", "reviewed", "blocked"]);
const reviewDirs = new Set();
const workProjection = Object.entries(progress.work || {}).map(([id, item]) => ({
  id, title: item.title, category: item.category, subcategories: item.subcategories, review_dir: item.review_dir,
}));
const workPlanHash = createHash("sha256").update(JSON.stringify(workProjection)).digest("hex");
if (workPlanHash !== "62396f9703a1f88147008b25c734f4751a410f0e874da67dd1fbbfefbd83c8a9") errors.push("意味的に編成した26作業の組合せ・順序・日本語名が変更されています");
const progressSubcategoryIds = Object.values(progress.work || {}).flatMap((item) => item.subcategories || []);
if (new Set(progressSubcategoryIds).size !== progressSubcategoryIds.length || progressSubcategoryIds.length !== subcategoryIds.size || progressSubcategoryIds.some((id) => !subcategoryIds.has(id))) errors.push("progress.workは対象39サブカテゴリーを重複なく1件ずつ登録します");
for (const [workId, item] of Object.entries(progress.work || {})) {
  if (!categoryIds.has(item.category)) errors.push(`${workId}: 未知のcategory ${item.category}`);
  if (typeof item.title !== "string" || !/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(item.title)) errors.push(`${workId}: 日本語のtitleが必要です`);
  for (const subcategory of item.subcategories || []) if (!item.title.includes(syllabus.subcategories[subcategory])) errors.push(`${workId}: titleに日本語サブカテゴリー名「${syllabus.subcategories[subcategory]}」がありません`);
  if (!Array.isArray(item.subcategories) || item.subcategories.length < 1 || item.subcategories.length > 2) errors.push(`${workId}: subcategoriesは1〜2件にします`);
  const parent = syllabus.categories.find((category) => category.id === item.category);
  if ((item.subcategories || []).some((subcategory) => !parent?.children.includes(subcategory))) errors.push(`${workId}: 対象サブカテゴリーは同じcategory ${item.category} の子にします`);
  if (!allowedStatuses.has(item.status)) errors.push(`${workId}: 未知のstatus ${item.status}`);
  if (item.review_dir !== `review/${workId}`) errors.push(`${workId}: review_dir は review/${workId} にします`);
  if (reviewDirs.has(item.review_dir)) errors.push(`${workId}: review_dir ${item.review_dir} が重複しています`);
  reviewDirs.add(item.review_dir);
}
const activeWork = progress.current_work ? progress.work?.[progress.current_work] : null;
const activeStatuses = new Set(["drafting", "self_review", "independent_review", "revision"]);
const activeWorkIds = Object.entries(progress.work || {}).filter(([, item]) => activeStatuses.has(item.status)).map(([workId]) => workId);
if (progress.current_work && !activeWork) errors.push(`current_work ${progress.current_work} がworkにありません`);
if (progress.current_work && (activeWorkIds.length !== 1 || activeWorkIds[0] !== progress.current_work)) errors.push("active statusはcurrent_workの1件だけにします");
if (!progress.current_work && activeWorkIds.length) errors.push("current_workがnullのときactive statusを残せません");
if (progress.current_work && progress.next_work !== progress.current_work) errors.push("進行中はnext_workをcurrent_workと一致させます");
if (!progress.current_work && progress.next_work && (!progress.work?.[progress.next_work] || progress.work[progress.next_work].status !== "planned")) errors.push(`next_work ${progress.next_work} はplanned作業ではありません`);
const expectedNextWork = Object.entries(progress.work || {}).find(([, item]) => item.status === "planned")?.[0] || null;
if (!progress.current_work && progress.next_work !== expectedNextWork) errors.push(`next_work は先頭のplanned作業 ${expectedNextWork} にします`);
for (const legacyName of ["math-review.md", "exam-review.md", "validation.md"]) if (fs.existsSync(path.join(ROOT, "review", legacyName))) errors.push(`review/${legacyName} へ追記せず作業別directoryへ移します`);
if (!progress.current_work && cards.length !== progress.reviewed_card_count) errors.push(`公開カード数 ${cards.length} はreviewed_card_count ${progress.reviewed_card_count} と一致しません`);
if (activeWork) {
  const currentById = new Map(cards.map((card) => [card.id, card]));
  const baselineById = new Map((activeWork.baseline_cards || []).map((card) => [card.id, `${card.category}/${card.subcategory}`]));
  if (baselineById.size !== progress.reviewed_card_count) errors.push(`${progress.current_work}: baseline_cardsがreviewed_card_countと一致しません`);
  if ([...baselineById].some(([cardId, location]) => !currentById.has(cardId) || `${currentById.get(cardId).category}/${currentById.get(cardId).subcategory}` !== location)) errors.push(`${progress.current_work}: 既存カードが削除または別カテゴリー・サブカテゴリーへ移動されています`);
  const added = cards.filter((card) => !baselineById.has(card.id));
  if (added.some((card) => card.category !== activeWork.category || !activeWork.subcategories.includes(card.subcategory))) errors.push(`${progress.current_work}: 対象外サブカテゴリーに新規カードがあります`);
  if (cards.length !== progress.reviewed_card_count + added.length) errors.push(`${progress.current_work}: カード総数が進捗と一致しません`);
}

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
const coverageIds = (scopeCoverage.items || []).map((item) => item.id);
const coveredCardIds = new Set((scopeCoverage.items || []).flatMap((item) => item.cards || []));
if (new Set(coverageIds).size !== coverageIds.length) errors.push("coverage.itemsのIDが重複しています");
for (const itemId of syllabusItemIds) if (!coverageIds.includes(itemId)) errors.push(`coverageに公式小項目 ${itemId} がありません`);
for (const itemId of coverageIds) if (!subcategoryIds.has(itemId)) errors.push(`coverage ${itemId}: 対象範囲にない小項目です`);
for (const item of scopeCoverage.items) {
  if (!new Set(["card", "reference", "planned"]).has(item.status)) errors.push(`coverage ${item.id}: 未知のstatus`);
  for (const cardId of item.cards || []) if (!ids.has(cardId)) errors.push(`coverage ${item.id}: 未知のcard ID ${cardId}`);
  if (item.status === "card" && !(item.cards || []).length) errors.push(`coverage ${item.id}: card statusにカードがありません`);
  if (item.status !== "card" && (item.cards || []).length) errors.push(`coverage ${item.id}: ${item.status} statusにカードIDを登録できません`);
}
for (const card of cards) {
  if (!coveredCardIds.has(card.id)) errors.push(`coverageにカード ${card.id} がありません`);
  const primaryCoverage = scopeCoverage.items.find((item) => item.id === card.subcategory);
  if (!primaryCoverage?.cards?.includes(card.id)) errors.push(`coverage ${card.subcategory} にカード ${card.id} の主分類がありません`);
}

const coverage = syllabus.categories.map((category) => ({
  category: displayCategoryName(category),
  count: cards.filter((card) => card.category === category.id).length,
  missing: category.children.filter((sub) => !cards.some((card) => card.subcategory === sub)),
}));
for (const item of coverage) {
  if (item.count === 0) errors.push(`シラバス category「${item.category}」にカードがありません`);
}

const reportDir = path.join(ROOT, "reports");
fs.mkdirSync(reportDir, { recursive: true });
const typeNames = ["formula", "theorem", "condition", "proof_step", "calc_step", "expansion", "recognition", "strategy", "reverse", "pitfall"];
const coverageLines = ["# シラバス coverage", "", `- 公開カード: ${cards.length}`, "", "| category | cards | subcategory coverage | types |", "|---|---:|---:|---|", ...syllabus.categories.map((category) => {
  const owned = cards.filter((card) => card.category === category.id);
  const covered = category.children.filter((sub) => owned.some((card) => card.subcategory === sub)).length;
  const types = typeNames.filter((type) => owned.some((card) => card.type === type)).join(", ");
  return `| ${displayCategoryName(category)} | ${owned.length} | ${covered}/${category.children.length} | ${types} |`;
}), "", "## 公式範囲の小項目", "", "`card` は計算カードあり、`reference` は正本に定義あり、`planned` は対象範囲内の拡張対象を表す。", "", "| item | status | cards |", "|---|---|---|", ...scopeCoverage.items.map((item) => `| ${syllabus.subcategories[item.id]} | ${item.status} | ${(item.cards || []).join(", ")} |`)];
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
