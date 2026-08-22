import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import katex from "katex";
import YAML from "yaml";
import { ROOT, loadSyllabus, readBaseline, readCards } from "./lib.mjs";

const cards = readCards();
const syllabus = loadSyllabus();
const progress = YAML.parse(fs.readFileSync(path.join(ROOT, "progress.yaml"), "utf8"));
const scopeCoverage = YAML.parse(fs.readFileSync(path.join(ROOT, "syllabus", "coverage.yaml"), "utf8"));
const pastExamIndex = YAML.parse(fs.readFileSync(path.resolve(ROOT, "..", "references", "past-exam-index.yaml"), "utf8"));
const pastExamIds = new Set((pastExamIndex.entries || []).map((entry) => entry.id));
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
// 画像1.jpg〜4.jpgから目視転記した対象範囲と「ねらい」を固定する。
const officialProjection = {
  scope: syllabus.scope,
  categories: syllabus.categories.map(({ id, name, section, source_section, page, children, prerequisite, aims }) => ({
    id, name, section, source_section: source_section ?? null, page, children, prerequisite: prerequisite ?? null, aims,
  })),
  subcategories: syllabus.subcategories,
  items: syllabus.items,
};
const officialScopeHash = createHash("sha256").update(JSON.stringify(officialProjection)).digest("hex");
if (officialScopeHash !== "a3d347dad185b8f5add4a88ceeef25f5723e44cfcaa46410296bca8d09ce9f97") errors.push("画像版公式出題範囲から転記した対象・階層・ねらい・用語例が変更されています");
const expectedApplicationDisplayNames = new Map([["applied-common", "統計応用（共通事項）"], ["applied-engineering", "統計応用（理工学）"]]);
for (const [id, expected] of expectedApplicationDisplayNames) if (syllabus.categories.find((category) => category.id === id)?.display_name !== expected) errors.push(`${id}: display_nameは「${expected}」にします`);
for (const id of expectedApplicationDisplayNames.keys()) if (syllabus.categories.find((category) => category.id === id)?.display_section !== "統計応用") errors.push(`${id}: display_sectionは「統計応用」にします`);
if (syllabus.schema_version !== 3) errors.push("syllabus.yaml は公式画像階層・ねらいschema_version 3にします");
if (scopeCoverage.schema_version !== 3) errors.push("coverage.yaml は公式用語単位のschema_version 3にします");
if (progress.schema_version !== 4) errors.push("progress.yaml はカード枚数目安付きschema_version 4にします");
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
for (const category of syllabus.categories || []) {
  const coveredByAims = (category.aims || []).flatMap((aim) => aim.subcategories || []);
  if (!Array.isArray(category.aims) || !category.aims.length || category.aims.some((aim) => typeof aim.text !== "string" || !aim.text.trim())) errors.push(`category ${category.id}: 公式シラバスのねらい aims がありません`);
  if (coveredByAims.length !== category.children.length || new Set(coveredByAims).size !== category.children.length || coveredByAims.some((id) => !category.children.includes(id))) errors.push(`category ${category.id}: aims は全サブカテゴリーを重複なく対応付けます`);
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
const formulaSections = formulae.split(/^## /m).slice(1).map((chunk) => {
  const newline = chunk.indexOf("\n");
  return [chunk.slice(0, newline).trim(), chunk.slice(newline + 1)];
});
for (const [sectionName, sectionBody] of formulaSections) {
  if (!sectionBody.includes("**この節の記号**")) {
    errors.push("formulae.md/" + sectionName + ": 「この節の記号」で分野固有の記号を定義してください");
  }
}
for (const requiredNotation of [
  "## 共通の記号",
  "$\\phi(z)$",
  "$\\Phi(z)",
  "$z_\\alpha$",
  "$I_1(\\theta)$",
  "$\\boldsymbol I(\\boldsymbol\\theta)$",
]) if (!notation.includes(requiredNotation)) errors.push("notation.md: 共通記号 " + requiredNotation + " がありません");
for (const [name, source] of [["notation.md", notation], ["formulae.md", formulae]]) {
  for (const match of source.matchAll(/\$\$([\s\S]*?)\$\$|(?<!\$)\$([^\n$]+?)\$(?!\$)/g)) {
    try { katex.renderToString(match[1] ?? match[2], { displayMode: match[1] !== undefined, throwOnError: true, strict: "error" }); }
    catch (err) { errors.push(`${name}: KaTeX: ${err.message}`); }
  }
}
const allowedStatuses = new Set(["planned", "drafting", "self_review", "independent_review", "revision", "reviewed", "blocked"]);
const reviewDirs = new Set();
const plannedWork = progress.planned_work || {};
const allWork = { ...(progress.work || {}), ...plannedWork };
for (const workId of Object.keys(progress.work || {})) if (Object.prototype.hasOwnProperty.call(plannedWork, workId)) errors.push(`${workId}: duplicate ID in work and planned_work`);
const planSource = progress.planning?.source_index;
if (!planSource || !fs.existsSync(path.resolve(ROOT, "..", planSource))) errors.push(`planning.source_index file is missing: ${planSource || "unspecified"}`);
const queuedPlans = progress.planning?.queue || {};
for (const [planId, item] of Object.entries(queuedPlans)) {
  const required = ["work_id", "title", "category", "subcategories", "target", "review_dir", "source", "parent", "title_ids", "priority_counts"];
  for (const key of required) if (item[key] === undefined) errors.push(`planning.queue.${planId}: missing ${key}`);
  if (item.work_id && (allWork[item.work_id] || Object.values(queuedPlans).filter((candidate) => candidate.work_id === item.work_id).length > 1)) errors.push(`planning.queue.${planId}: work_id is already used or duplicated`);
  if (item.review_dir && item.work_id && item.review_dir !== `review/${item.work_id}`) errors.push(`planning.queue.${planId}: review_dir must be review/${item.work_id}`);
  if (item.source && !fs.existsSync(path.resolve(ROOT, "..", item.source))) errors.push(`planning.queue.${planId}: source file is missing: ${item.source}`);
  if (!Array.isArray(item.title_ids) || !item.title_ids.length) errors.push(`planning.queue.${planId}: title_ids must not be empty`);
  if (!item.priority_counts || typeof item.priority_counts !== "object" || Array.isArray(item.priority_counts)) errors.push(`planning.queue.${planId}: priority_counts is missing`);
}
const workProjection = Object.entries(progress.work || {}).map(([id, item]) => ({
  id, title: item.title, category: item.category, subcategories: item.subcategories, target: item.target, review_dir: item.review_dir,
}));
const workPlanHash = createHash("sha256").update(JSON.stringify(workProjection)).digest("hex");
if (workPlanHash !== "a10ab9f4f453fc5977d4528b85af58c12377cccfcff6f5eb6d33070edd3ecb39") errors.push("意味的に編成した26作業の組合せ・順序・日本語名・枚数目安が変更されています");
const progressSubcategoryIds = Object.values(progress.work || {}).flatMap((item) => item.subcategories || []);
if (new Set(progressSubcategoryIds).size !== progressSubcategoryIds.length || progressSubcategoryIds.length !== subcategoryIds.size || progressSubcategoryIds.some((id) => !subcategoryIds.has(id))) errors.push("progress.workは対象39サブカテゴリーを重複なく1件ずつ登録します");
for (const [workId, item] of Object.entries(allWork)) {
  if (!categoryIds.has(item.category)) errors.push(`${workId}: 未知のcategory ${item.category}`);
  if (typeof item.title !== "string" || !/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(item.title)) errors.push(`${workId}: 日本語のtitleが必要です`);
  for (const subcategory of item.subcategories || []) if (!item.title.includes(syllabus.subcategories[subcategory])) errors.push(`${workId}: titleに日本語サブカテゴリー名「${syllabus.subcategories[subcategory]}」がありません`);
  if (!Array.isArray(item.subcategories) || item.subcategories.length < 1 || item.subcategories.length > 2) errors.push(`${workId}: subcategoriesは1〜2件にします`);
  if (!Number.isInteger(item.target?.min) || !Number.isInteger(item.target?.max) || item.target.min < 1 || item.target.min > item.target.max) errors.push(`${workId}: targetは正の整数で min <= max にします`);
  const parent = syllabus.categories.find((category) => category.id === item.category);
  if ((item.subcategories || []).some((subcategory) => !parent?.children.includes(subcategory))) errors.push(`${workId}: 対象サブカテゴリーは同じcategory ${item.category} の子にします`);
  if (!allowedStatuses.has(item.status)) errors.push(`${workId}: 未知のstatus ${item.status}`);
  if (item.review_dir !== `review/${workId}`) errors.push(`${workId}: review_dir は review/${workId} にします`);
  if (reviewDirs.has(item.review_dir)) errors.push(`${workId}: review_dir ${item.review_dir} が重複しています`);
  reviewDirs.add(item.review_dir);
}
const activeWork = progress.current_work ? allWork[progress.current_work] : null;
const activeStatuses = new Set(["drafting", "self_review", "independent_review", "revision"]);
const activeWorkIds = Object.entries(allWork).filter(([, item]) => activeStatuses.has(item.status)).map(([workId]) => workId);
if (progress.current_work && !activeWork) errors.push(`current_work ${progress.current_work} がworkにありません`);
if (progress.current_work && (activeWorkIds.length !== 1 || activeWorkIds[0] !== progress.current_work)) errors.push("active statusはcurrent_workの1件だけにします");
if (!progress.current_work && activeWorkIds.length) errors.push("current_workがnullのときactive statusを残せません");
if (progress.current_work && progress.next_work !== progress.current_work) errors.push("進行中はnext_workをcurrent_workと一致させます");
if (!progress.current_work && progress.next_work && (!allWork[progress.next_work] || allWork[progress.next_work].status !== "planned")) errors.push(`next_work ${progress.next_work} must be planned`);
const expectedNextWork = Object.entries(allWork).find(([, item]) => item.status === "planned")?.[0] || null;
for (const legacyName of ["math-review.md", "exam-review.md", "validation.md"]) if (fs.existsSync(path.join(ROOT, "review", legacyName))) errors.push(`review/${legacyName} へ追記せず作業別directoryへ移します`);
if (!progress.current_work && cards.length !== progress.reviewed_card_count) errors.push(`公開カード数 ${cards.length} はreviewed_card_count ${progress.reviewed_card_count} と一致しません`);
if (activeWork) {
  const currentById = new Map(cards.map((card) => [card.id, card]));
  const baseline = readBaseline(progress.current_work);
  const expectedBaselineFile = `.state/${progress.current_work}-baseline.yaml`;
  if (activeWork.baseline_file !== expectedBaselineFile || !baseline) errors.push(`${progress.current_work}: 一時baseline ${expectedBaselineFile} がありません`);
  const baselineById = new Map((baseline || []).map((card) => [card.id, `${card.category}/${card.subcategory}`]));
  if (baselineById.size !== progress.reviewed_card_count || activeWork.baseline_card_count !== baselineById.size) errors.push(`${progress.current_work}: baseline件数がreviewed_card_countと一致しません`);
  if ([...baselineById].some(([cardId, location]) => !currentById.has(cardId) || `${currentById.get(cardId).category}/${currentById.get(cardId).subcategory}` !== location)) errors.push(`${progress.current_work}: 既存カードが削除または別カテゴリー・サブカテゴリーへ移動されています`);
  const added = cards.filter((card) => !baselineById.has(card.id));
  if (added.some((card) => card.category !== activeWork.category || !activeWork.subcategories.includes(card.subcategory))) errors.push(`${progress.current_work}: 対象外サブカテゴリーに新規カードがあります`);
  if (cards.length !== progress.reviewed_card_count + added.length) errors.push(`${progress.current_work}: カード総数が進捗と一致しません`);
  if (["self_review", "independent_review", "revision"].includes(activeWork.status) && (added.length < activeWork.target.min || added.length > activeWork.target.max)) errors.push(`${progress.current_work}: 新規カード${added.length}枚は目安${activeWork.target.min}〜${activeWork.target.max}枚の範囲外です`);
  if (["self_review", "independent_review", "revision"].includes(activeWork.status) && added.length >= 10 && new Set(added.map((card) => card.priority)).size < 2) errors.push(`${progress.current_work}: 10枚以上の新規カードでpriorityが全件同一です。過去問根拠と依存度を比較して優先度を査定します`);
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
  const pastExamSources = card.sources.filter((source) => source.type === "past_exam");
  for (const source of pastExamSources) if (!source.id || !pastExamIds.has(source.id)) error(card, `past_exam sourceはpast-exam-index.yamlの具体的IDを使います: ${source.id || "未指定"}`);
  if (card.frequency.past_exam !== new Set(pastExamSources.map((source) => source.id)).size) error(card, "frequency.past_examは重複を除くpast_exam source ID数と一致させます");
  const claimedFrequency = Object.values(card.frequency || {}).some((value) => Number(value) > 0);
  if (claimedFrequency && !hasConcreteSource) error(card, "正のfrequencyには具体的な過去問・教科書・独自問題sourceが必要です");
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
  for (const [symbol, japanese] of [[/(?<!\\mathbb\s)N(?:_|\()/, "\u6b63\u898f\u5206\u5e03"], [/U\(/, "\u4e00\u69d8\u5206\u5e03"], [/\\operatorname\{Poisson\\}/, "\u30dd\u30a2\u30bd\u30f3\u5206\u5e03"], [/\\operatorname\{Binomial\\}/, "\u4e8c\u9805\u5206\u5e03"], [/\\operatorname\{Bernoulli\\}/, "\u30d9\u30eb\u30cc\u30fc\u30a4\u5206\u5e03"], [/\\operatorname\{Exp\\}/, "\u6307\u6570\u5206\u5e03"], [/\\operatorname\{Beta\\}/, "\u30d9\u30fc\u30bf\u5206\u5e03"]]) {
    if (symbol.test(question) && !question.includes(japanese)) error(card, `問題では記号より先に日本語名「${japanese}」を明記します`);
  }
}
const coverageIds = (scopeCoverage.items || []).map((item) => item.id);
const coveredCardIds = new Set((scopeCoverage.items || []).flatMap((item) => item.cards || []));
if (new Set(coverageIds).size !== coverageIds.length) errors.push("coverage.itemsのIDが重複しています");
for (const itemId of syllabusItemIds) if (!coverageIds.includes(itemId)) errors.push(`coverageに公式小項目 ${itemId} がありません`);
for (const itemId of coverageIds) if (!subcategoryIds.has(itemId)) errors.push(`coverage ${itemId}: 対象範囲にない小項目です`);
for (const item of scopeCoverage.items) {
  if (!new Set(["complete", "partial", "planned"]).has(item.status)) errors.push(`coverage ${item.id}: 未知のstatus`);
  for (const cardId of item.cards || []) if (!ids.has(cardId)) errors.push(`coverage ${item.id}: 未知のcard ID ${cardId}`);
  if (["complete", "partial"].includes(item.status) && !(item.cards || []).length) errors.push(`coverage ${item.id}: ${item.status} statusにカードがありません`);
  if (item.status === "planned" && (item.cards || []).length) errors.push(`coverage ${item.id}: planned statusにカードIDを登録できません`);
  const officialTerms = syllabus.items.find((candidate) => candidate.id === item.id)?.terms || [];
  const coveredTerms = (item.terms || []).map((term) => term.name);
  if (JSON.stringify(coveredTerms) !== JSON.stringify(officialTerms)) errors.push(`coverage ${item.id}: 公式の「項目（学習しておくべき用語）例」を同じ順序で全件登録します`);
  for (const term of item.terms || []) {
    if (!new Set(["card", "planned"]).has(term.status)) errors.push(`coverage ${item.id}/${term.name}: statusはcardまたはplannedにします`);
    if (term.status === "card" && !(term.cards || []).length) errors.push(`coverage ${item.id}/${term.name}: card statusに対応カードがありません`);
    if (term.status === "planned" && (term.cards || []).length) errors.push(`coverage ${item.id}/${term.name}: planned statusにカードIDを登録できません`);
    for (const cardId of term.cards || []) {
      const card = cards.find((candidate) => candidate.id === cardId);
      if (!card) errors.push(`coverage ${item.id}/${term.name}: 未知のcard ID ${cardId}`);
      else if (card.subcategory !== item.id) errors.push(`coverage ${item.id}/${term.name}: ${cardId} は別サブカテゴリー ${card.subcategory} です`);
    }
  }
  const allTermsComplete = (item.terms || []).length > 0 && item.terms.every((term) => term.status === "card" && (term.cards || []).length);
  if ((item.status === "complete") !== allTermsComplete) errors.push(`coverage ${item.id}: 全公式用語のcard対応とcomplete statusを一致させます`);
}
const worksRequiringCompleteTerms = Object.entries(progress.work || {}).filter(([id, item]) => item.status === "reviewed" || (id === progress.current_work && ["self_review", "independent_review", "revision"].includes(item.status)));
for (const [workId, work] of worksRequiringCompleteTerms) {
  for (const subcategory of work.subcategories || []) {
    const item = scopeCoverage.items.find((candidate) => candidate.id === subcategory);
    const missingTerms = (item?.terms || []).filter((term) => term.status !== "card" || !(term.cards || []).length).map((term) => term.name);
    if (missingTerms.length) errors.push(`${workId}: 公式用語の対応カードが未完成です（${subcategory}: ${missingTerms.join("、")}）`);
  }
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
}), "", "## 公式範囲の小項目", "", "`complete` は全公式用語に操作カードあり、`partial` は既存カードがあるが未完、`planned` は未着手を表す。", "", "| item | status | cards |", "|---|---|---|", ...scopeCoverage.items.map((item) => `| ${syllabus.subcategories[item.id]} | ${item.status} | ${(item.cards || []).join(", ")} |`), "", "## 項目（学習しておくべき用語）例", "", "作業を完了するには、対象サブカテゴリーの全用語が `card` で、実際に操作するカードIDを持つ必要がある。", "", "| item | term | status | cards |", "|---|---|---|---|", ...scopeCoverage.items.flatMap((item) => (item.terms || []).map((term) => `| ${syllabus.subcategories[item.id]} | ${term.name} | ${term.status} | ${(term.cards || []).join(", ")} |`))];
fs.writeFileSync(path.join(reportDir, "coverage.md"), `${coverageLines.join("\n")}\n`);
const frequentMoveAliases = new Map([
  ["PDF", "確率密度関数"],
  ["CDF", "累積分布関数"],
  ["PMF", "確率関数"],
  ["MGF", "モーメント母関数（積率母関数）"],
  ["Gamma\u5206\u5e03", "ガンマ分布"],
  ["Beta\u5206\u5e03", "ベータ分布"],
  ["Cauchy\u5206\u5e03", "コーシー分布"],
  ["Weibull\u5206\u5e03", "ワイブル分布"],
  ["Poisson\u5206\u5e03", "ポアソン分布"],
  ["Bernoulli\u5206\u5e03", "ベルヌーイ分布"],
  ["Bayes", "ベイズの定理"],
  ["Bayes\u306e\u5b9a\u7406", "ベイズの定理"],
  ["Fisher\u60c5\u5831", "フィッシャー情報量（1次元）"],
  ["GLM", "一般化線形モデル"],
  ["MLE", "最尤推定"],
  ["CLT", "中心極限定理"],
  ["DeltaMethod", "デルタ法"],
  ["NeymanPearson", "ネイマン・ピアソンの基本定理"],
  ["AIC", "情報量規準AIC"],
  ["OLS", "最小二乗法"],
  ["Jacobian", "変数変換"],
  ["support", "台"],
  ["Markov\u9023\u9396", "マルコフ連鎖"],
  ["Poisson\u904e\u7a0b", "ポアソン過程"],
  ["正規分布", "正規分布（ガウス分布）"],
  ["ガウス分布", "正規分布（ガウス分布）"],
  ["離散一様分布", "一様分布"],
  ["連続一様分布", "一様分布"],
  ["確率計算", "確率の計算"],
  ["確率質量関数", "確率関数"],
  ["同時確率質量関数", "同時分布"],
  ["同時確率密度関数", "同時分布"],
  ["同時累積分布関数", "同時分布"],
  ["独立性", "統計的独立"],
  ["不偏推定", "不偏性"],
  ["分位点", "パーセント点"],
  ["変換", "変数変換"],
  ["線形結合", "確率変数の線形結合"],
  ["共分散行列", "分散共分散行列"],
  ["適合度検定", "適合度の検定"],
  ["実験計画", "実験計画法"],
  ["時系列", "時系列解析"],
  ["回帰", "回帰分析"],
  ["平均", "期待値"],
  ["正規近似", "二項分布の正規近似とポアソン近似"],
  ["ポアソン近似", "二項分布の正規近似とポアソン近似"],
  ["大数則", "大数の弱法則"]
]);
const displayTermAliases = new Map([
  ["PDF", "\u78ba\u7387\u5bc6\u5ea6\u95a2\u6570"],
  ["CDF", "\u7d2f\u7a4d\u5206\u5e03\u95a2\u6570"],
  ["PMF", "\u78ba\u7387\u95a2\u6570"],
  ["MGF", "\u30e2\u30fc\u30e1\u30f3\u30c8\u6bcd\u95a2\u6570\uff08\u7a4d\u7387\u6bcd\u95a2\u6570\uff09"],
  ["Gamma\u5206\u5e03", "\u30ac\u30f3\u30de\u5206\u5e03"],
  ["Beta\u5206\u5e03", "\u30d9\u30fc\u30bf\u5206\u5e03"],
  ["Cauchy\u5206\u5e03", "\u30b3\u30fc\u30b7\u30fc\u5206\u5e03"],
  ["Weibull\u5206\u5e03", "\u30ef\u30a4\u30d6\u30eb\u5206\u5e03"],
  ["Poisson\u5206\u5e03", "\u30dd\u30a2\u30bd\u30f3\u5206\u5e03"],
  ["Bernoulli\u5206\u5e03", "\u30d9\u30eb\u30cc\u30fc\u30a4\u5206\u5e03"],
  ["Bayes\u306e\u5b9a\u7406", "\u30d9\u30a4\u30ba\u306e\u5b9a\u7406"],
  ["Bayes", "\u30d9\u30a4\u30ba\u306e\u5b9a\u7406"],
  ["Fisher\u60c5\u5831\u91cf", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf\uff081\u6b21\u5143\uff09"],
  ["Fisher \u60c5\u5831\u91cf", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf\uff081\u6b21\u5143\uff09"],
  ["\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf\uff081\u6b21\u5143\uff09\u91cf", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf\uff081\u6b21\u5143\uff09"],
  ["Fisher\u60c5\u5831\u884c\u5217", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u884c\u5217"],
  ["Fisher \u60c5\u5831\u884c\u5217", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u884c\u5217"],
  ["Cram\u00e9r--Rao", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["Cram\u00e9r-Rao", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["Cram\u00e9r\u2013Rao", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["Cramer--Rao", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["Cramer-Rao", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["Cramer\u2013Rao", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["CRLB", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f"],
  ["\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u4e0b\u754c", "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f\u306b\u3088\u308b\u4e0b\u754c"],
  ["Fisher\u6b63\u78ba\u691c\u5b9a", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u691c\u5b9a"],
  ["Fisher\u306e\u6b63\u78ba\u691c\u5b9a", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u691c\u5b9a"],
  ["Fisher\u691c\u5b9a", "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u691c\u5b9a"],
  ["GLM", "\u4e00\u822c\u5316\u7dda\u5f62\u30e2\u30c7\u30eb"],
  ["MLE", "\u6700\u5c24\u63a8\u5b9a"],
  ["CLT", "\u4e2d\u5fc3\u6975\u9650\u5b9a\u7406"],
  ["DeltaMethod", "\u30c7\u30eb\u30bf\u6cd5"],
  ["NeymanPearson", "\u30cd\u30a4\u30de\u30f3\u30fb\u30d4\u30a2\u30bd\u30f3\u306e\u57fa\u672c\u5b9a\u7406"],
  ["ANOVA", "\u5206\u6563\u5206\u6790"],
  ["OLS", "\u6700\u5c0f\u4e8c\u4e57\u6cd5"],
  ["Markov\u9023\u9396", "\u30de\u30eb\u30b3\u30d5\u9023\u9396"],
  ["Poisson\u904e\u7a0b", "\u30dd\u30a2\u30bd\u30f3\u904e\u7a0b"]
]);
const officialTermSet = new Set((syllabus.items || []).flatMap((item) => item.terms || []));
for (const canonical of [
  "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf\uff081\u6b21\u5143\uff09",
  "\u30af\u30e9\u30fc\u30e1\u30eb\u30fb\u30e9\u30aa\u306e\u4e0d\u7b49\u5f0f",
  "\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u691c\u5b9a",
]) if (!officialTermSet.has(canonical)) errors.push(`canonical display term is not in syllabus terms: ${canonical}`);
for (const card of cards) {
  const displayText = `${card.title}\n${card.body}\n${card.hashtags.join(" ")}`.replaceAll("\u60c5\u5831\u91cf\u898f\u6e96AIC", "");
  for (const [alias, canonical] of displayTermAliases) if (displayText.includes(alias)) errors.push(`${card.id}: noncanonical display term ${alias} -> ${canonical}`);
  if (/\u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf(?!\uff081\u6b21\u5143\uff09)/u.test(displayText)) {
    errors.push(`${card.id}: noncanonical display term \u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf -> \u30d5\u30a3\u30c3\u30b7\u30e3\u30fc\u60c5\u5831\u91cf\uff081\u6b21\u5143\uff09`);
  }
}
const normalizeFrequentMove = (tag) => frequentMoveAliases.get(tag) ?? tag;
const moveCounts = new Map();
for (const card of cards) {
  for (const tag of new Set(card.hashtags.map(normalizeFrequentMove))) moveCounts.set(tag, (moveCounts.get(tag) ?? 0) + 1);
}
const moves = [...moveCounts.entries()]
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
fs.writeFileSync(path.join(reportDir, "frequent_moves.md"), `# \u983b\u51fa move\uff08pilot\u5185\u30fb\u30b7\u30e9\u30d0\u30b9\u7528\u8a9e\u8868\u8a18\uff09\n\n| term | cards |\n|---|---:|\n${moves.map((item) => `| ${item.tag} | ${item.count} |`).join("\n")}\n`);
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
