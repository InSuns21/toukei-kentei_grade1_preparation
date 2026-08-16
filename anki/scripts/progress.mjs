import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import YAML from "yaml";
import { ROOT, baselineFile, readBaseline, readCards } from "./lib.mjs";

const file = path.join(ROOT, "progress.yaml");
const progress = YAML.parse(fs.readFileSync(file, "utf8"));
const [command, requestedId] = process.argv.slice(2);
const workEntries = () => Object.entries(progress.work || {});
const plannedWorkEntries = () => Object.entries(progress.planned_work || {});
const allWorkEntries = () => [...workEntries(), ...plannedWorkEntries()];
const allWorkMap = () => Object.fromEntries(allWorkEntries());
const refreshSummary = () => {
  const counts = [...Object.values(progress.legacy_runs || {}), ...Object.values(progress.work || {}), ...Object.values(progress.planned_work || {})]
    .reduce((out, item) => ({ ...out, [item.status]: (out[item.status] || 0) + 1 }), {});
  progress.summary = { total: Object.values(counts).reduce((sum, count) => sum + count, 0), planned: 0, drafting: 0, self_review: 0, independent_review: 0, revision: 0, reviewed: 0, blocked: 0, ...counts };
};
const save = () => {
  refreshSummary();
  progress.next_work = progress.current_work || allWorkEntries().find(([, item]) => item.status === "planned")?.[0] || null;
  progress.updated_at = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());
  fs.writeFileSync(file, YAML.stringify(progress));
};
const summary = () => {
  refreshSummary();
  console.log(YAML.stringify({
    cards: readCards().length,
    current_work: progress.current_work,
    current_work_title: progress.current_work ? allWorkMap()[progress.current_work]?.title : null,
    current_work_target: progress.current_work ? allWorkMap()[progress.current_work]?.target : null,
    next_work: progress.next_work,
    next_work_title: progress.next_work ? allWorkMap()[progress.next_work]?.title : null,
    next_work_target: progress.next_work ? allWorkMap()[progress.next_work]?.target : null,
    status_counts: Object.fromEntries(Object.entries(progress.summary).filter(([key]) => key !== "total")),
  }));
};
const getWork = (id) => {
  const item = progress.work?.[id] || progress.planned_work?.[id];
  if (!item) throw new Error(`未知のAnki作業ID: ${id}`);
  return item;
};
const inspectWorkScope = (id, item, requireAdded = false) => {
  const cards = readCards();
  const currentById = new Map(cards.map((card) => [card.id, card]));
  const baseline = readBaseline(id);
  if (!baseline) throw new Error(`${id} の一時baselineがありません: ${item.baseline_file}`);
  const baselineById = new Map(baseline.map((card) => [card.id, `${card.category}/${card.subcategory}`]));
  if (baselineById.size !== progress.reviewed_card_count || item.baseline_card_count !== baselineById.size) throw new Error(`${id} のbaseline件数がreviewed_card_countと一致しません`);
  if ([...baselineById].some(([cardId, location]) => !currentById.has(cardId) || `${currentById.get(cardId).category}/${currentById.get(cardId).subcategory}` !== location)) throw new Error(`${id} で既存カードが削除または別カテゴリー・サブカテゴリーへ移動されています`);
  const added = cards.filter((card) => !baselineById.has(card.id));
  if (added.some((card) => card.category !== item.category || !item.subcategories.includes(card.subcategory))) throw new Error(`${id} の対象外サブカテゴリーに新規カードがあります`);
  if (cards.length !== progress.reviewed_card_count + added.length) throw new Error(`${id} 以外のカテゴリー変更またはカード削除があります`);
  if (requireAdded && !added.length) throw new Error(`${id} に新規カードがありません`);
  return { cards, added };
};

if (!command) summary();
else if (command === "plan") {
  const planId = requestedId;
  const queue = progress.planning?.queue;
  const plan = queue?.[planId];
  if (!plan) throw new Error(`unknown plan ID or missing planning.queue entry: ${planId}`);
  const workId = plan.work_id || planId;
  if (progress.work?.[workId] || progress.planned_work?.[workId]) throw new Error(`${workId} is already registered`);
  const required = ["title", "category", "subcategories", "target", "review_dir", "source", "parent", "title_ids", "priority_counts"];
  const missing = required.filter((key) => plan[key] === undefined);
  if (missing.length) throw new Error(`${planId} is missing required fields: ${missing.join(", ")}`);
  progress.planned_work ||= {};
  const { work_id: ignoredWorkId, ...planned } = plan;
  planned.status = "planned";
  progress.planned_work[workId] = planned;
  delete queue[planId];
  save(); summary();
} else if (command === "start") {
  const id = requestedId || progress.next_work;
  const item = getWork(id);
  if (progress.current_work && progress.current_work !== id) throw new Error(`${progress.current_work} が進行中です`);
  if (!progress.current_work && id !== progress.next_work) throw new Error(`次の作業は ${progress.next_work} です`);
  if (!new Set(["planned", "drafting", "revision"]).has(item.status)) throw new Error(`${id} は開始できません: ${item.status}`);
  if (item.status === "planned") {
    if (readCards().length !== progress.reviewed_card_count) throw new Error(`${id} の開始前に未追跡のカード差分があります`);
    item.status = "drafting";
    const snapshot = readCards().map((card) => ({ id: card.id, category: card.category, subcategory: card.subcategory })).sort((a, b) => a.id.localeCompare(b.id));
    fs.mkdirSync(path.dirname(baselineFile(id)), { recursive: true });
    fs.writeFileSync(baselineFile(id), YAML.stringify(snapshot));
    item.baseline_file = `.state/${id}-baseline.yaml`;
    item.baseline_card_count = snapshot.length;
  } else inspectWorkScope(id, item);
  item.started_at ||= new Date().toISOString();
  progress.current_work = id;
  fs.mkdirSync(path.join(ROOT, item.review_dir), { recursive: true });
  save(); summary();
} else if (command === "stage") {
  const id = requestedId || progress.current_work;
  const status = process.argv[4];
  const item = getWork(id);
  const transitions = { drafting: "self_review", self_review: "independent_review", independent_review: "revision" };
  if (transitions[item.status] !== status || progress.current_work !== id) throw new Error("状態遷移は drafting -> self_review -> independent_review -> revision の順です");
  const { added } = inspectWorkScope(id, item);
  if (item.status === "drafting" && (added.length < item.target.min || added.length > item.target.max)) throw new Error(`${id} の新規カード${added.length}枚は目安${item.target.min}〜${item.target.max}枚の範囲外です`);
  item.status = status;
  item[`${status}_at`] = new Date().toISOString();
  save(); summary();
} else if (command === "complete") {
  const id = requestedId || progress.current_work;
  const item = getWork(id);
  if (item.status !== "revision") throw new Error(`${id} は修正・再査読前のため完了できません: ${item.status}`);
  const independentReviewAt = Date.parse(item.independent_review_at || "");
  const revisionAt = Date.parse(item.revision_at || "");
  if (!Number.isFinite(independentReviewAt) || !Number.isFinite(revisionAt) || independentReviewAt >= revisionAt) throw new Error(`${id} の独立査読・修正開始日時が不正です`);
  const reviewDir = path.join(ROOT, item.review_dir);
  for (const name of ["math-review.md", "exam-review.md"]) {
    const review = path.join(reviewDir, name);
    if (!fs.existsSync(review)) throw new Error(`査読記録がありません: ${path.relative(ROOT, review)}`);
    const body = fs.readFileSync(review, "utf8");
    const verdicts = [...body.matchAll(/fatal:\s*(\d+)\s*\/\s*major:\s*(\d+)\s*\/\s*minor:\s*(\d+)/gi)];
    const latest = verdicts.at(-1);
    if (!latest || latest.slice(1).some((count) => Number(count) !== 0)) throw new Error(`査読の最新判定が未解消です: ${path.relative(ROOT, review)}`);
    const initial = body.match(/initial_reviewer_id:\s*(\S+)/i)?.[1];
    const final = body.match(/final_reviewer_id:\s*(\S+)/i)?.[1];
    if (!initial || !final || initial !== final) throw new Error(`初回と再査読の担当IDが一致しません: ${path.relative(ROOT, review)}`);
    const initialAt = Date.parse(body.match(/initial_reviewed_at:\s*(\S+)/i)?.[1] || "");
    const finalAt = Date.parse(body.match(/final_reviewed_at:\s*(\S+)/i)?.[1] || "");
    if (!Number.isFinite(initialAt) || !Number.isFinite(finalAt)) throw new Error(`初回・再査読日時がありません: ${path.relative(ROOT, review)}`);
    if (initialAt < independentReviewAt || initialAt >= revisionAt || finalAt <= revisionAt) throw new Error(`日時は independent_review開始 <= 初回査読 < 修正開始 < 再査読 の順にします: ${path.relative(ROOT, review)}`);
    if (!/初回指摘/.test(body) || !/修正確認/.test(body)) throw new Error(`初回指摘・修正確認の記録がありません: ${path.relative(ROOT, review)}`);
    if (name === "exam-review.md" && (!/ねらい適合性/.test(body) || !/知識充足性/.test(body) || !/過不足/.test(body) || !/優先度根拠/.test(body))) throw new Error(`試験適合性査読にねらい適合性・知識充足性・過不足・優先度根拠の判定がありません: ${path.relative(ROOT, review)}`);
  }
  const { cards, added: addedCards } = inspectWorkScope(id, item, true);
  if (addedCards.length < item.target.min || addedCards.length > item.target.max) throw new Error(`${id} の新規カード${addedCards.length}枚は目安${item.target.min}〜${item.target.max}枚の範囲外です`);
  const added = addedCards.map((card) => card.id).sort();
  const projectRoot = path.resolve(ROOT, "..");
  const npmCli = process.env.npm_execpath;
  if (!npmCli || !fs.existsSync(npmCli)) throw new Error("npm CLIのパスを取得できません。npm run anki:progress -- complete <WORK-ID> で実行してください");
  const runNpm = (script) => execFileSync(process.execPath, [npmCli, "run", script], { cwd: projectRoot, encoding: "utf8" });
  const ankiResult = runNpm("anki:validate");
  const allResult = runNpm("validate");
  fs.writeFileSync(path.join(reviewDir, "validation.md"), `# 最終機械検証\n\n- 実行日時: ${new Date().toISOString()}\n- npm run anki:validate: success\n- npm run validate: success\n\n## 出力\n\n\`\`\`text\n${ankiResult.trim()}\n${allResult.trim()}\n\`\`\`\n`);
  item.status = "reviewed";
  item.completed_at = new Date().toISOString();
  item.added_card_ids = added;
  fs.unlinkSync(baselineFile(id));
  delete item.baseline_file;
  delete item.baseline_card_count;
  item.review_result = { fatal: 0, major: 0, minor: 0 };
  progress.reviewed_card_count = cards.length;
  progress.last_completed_work = id;
  progress.current_work = null;
  save(); summary();
} else throw new Error("usage: anki:progress -- [plan PLAN-ID|start ID|stage ID STATUS|complete ID]");
