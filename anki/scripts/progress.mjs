import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import YAML from "yaml";
import { ROOT, readCards } from "./lib.mjs";

const file = path.join(ROOT, "progress.yaml");
const progress = YAML.parse(fs.readFileSync(file, "utf8"));
const [command, batchId] = process.argv.slice(2);
const save = () => {
  progress.updated_at = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(file, YAML.stringify(progress));
};
const summary = () => {
  const counts = Object.values(progress.batches).reduce((out, batch) => ({ ...out, [batch.status]: (out[batch.status] || 0) + 1 }), {});
  console.log(YAML.stringify({ cards: readCards().length, current_batch: progress.current_batch, next_batch: progress.next_batch, status_counts: counts }));
};

if (!command) summary();
else if (command === "start") {
  const id = batchId || progress.next_batch;
  const batch = progress.batches[id];
  if (!batch) throw new Error(`未知のbatch: ${id}`);
  if (progress.current_batch && progress.current_batch !== id) throw new Error(`${progress.current_batch} が進行中です`);
  if (!new Set(["planned", "drafting", "revision"]).has(batch.status)) throw new Error(`${id} は開始できません: ${batch.status}`);
  if (batch.status === "planned") batch.status = "drafting";
  batch.started_at ||= new Date().toISOString();
  progress.current_batch = id;
  fs.mkdirSync(path.join(ROOT, batch.review_dir), { recursive: true });
  save(); summary();
} else if (command === "stage") {
  const id = batchId || progress.current_batch;
  const status = process.argv[4];
  const transitions = { drafting: "self_review", self_review: "independent_review", independent_review: "revision" };
  if (!progress.batches[id] || transitions[progress.batches[id].status] !== status || progress.current_batch !== id) throw new Error("状態遷移は drafting -> self_review -> independent_review -> revision の順です");
  progress.batches[id].status = status;
  progress.batches[id][`${status}_at`] = new Date().toISOString();
  save(); summary();
} else if (command === "complete") {
  const id = batchId || progress.current_batch;
  const batch = progress.batches[id];
  if (!batch) throw new Error(`未知のbatch: ${id}`);
  if (batch.status !== "revision") throw new Error(`${id} は修正・再査読前のため完了できません: ${batch.status}`);
  const independentReviewAt = Date.parse(batch.independent_review_at || "");
  const revisionAt = Date.parse(batch.revision_at || "");
  if (!Number.isFinite(independentReviewAt) || !Number.isFinite(revisionAt) || independentReviewAt >= revisionAt) throw new Error(`${id} の独立査読・修正開始日時が不正です`);
  const reviewDir = path.join(ROOT, batch.review_dir);
  const reviews = ["math-review.md", "exam-review.md"].map((name) => path.join(reviewDir, name));
  for (const review of reviews) {
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
  }
  const cardCount = readCards().length;
  if (cardCount !== batch.range[1]) throw new Error(`${id} 完了時の公開カード数は ${batch.range[1]} 枚です（現在 ${cardCount} 枚）`);
  const projectRoot = path.resolve(ROOT, "..");
  const ankiResult = execFileSync("npm.cmd", ["run", "anki:validate"], { cwd: projectRoot, encoding: "utf8" });
  const allResult = execFileSync("npm.cmd", ["run", "validate"], { cwd: projectRoot, encoding: "utf8" });
  fs.writeFileSync(path.join(reviewDir, "validation.md"), `# 最終機械検証\n\n- 実行日時: ${new Date().toISOString()}\n- npm run anki:validate: success\n- npm run validate: success\n\n## 出力\n\n\`\`\`text\n${ankiResult.trim()}\n${allResult.trim()}\n\`\`\`\n`);
  batch.status = "reviewed";
  batch.completed_at = new Date().toISOString();
  batch.review_result = { fatal: 0, major: 0, minor: 0 };
  progress.current_batch = null;
  const number = Number(id.match(/\d+$/)?.[0] || 0) + 1;
  const next = `batch-${String(number).padStart(3, "0")}`;
  if (!progress.batches[next]) {
    const start = batch.range[1] + 1;
    progress.batches[next] = { range: [start, start + progress.cards_per_batch - 1], status: "planned", review_dir: `review/${next}` };
  }
  progress.next_batch = next;
  save(); summary();
} else throw new Error("usage: anki:progress -- [start ID|stage ID STATUS|complete ID]");
