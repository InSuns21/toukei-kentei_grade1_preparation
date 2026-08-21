import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const cardsDir = path.join(root, "anki", "cards");
const targets = fs.readdirSync(cardsDir)
  .filter((name) => {
    const number = Number(name.slice(0, 2));
    return number >= 31 && number <= 43 && name.endsWith(".md");
  })
  .sort();

const abbreviations = [
  ["SSE", "残差平方和（sum of squared errors）"],
  ["SSR", "回帰平方和（regression sum of squares）"],
  ["SST", "全平方和（total sum of squares）"],
  ["SE", "標準誤差（standard error）"],
  ["OR", "オッズ比（odds ratio）"],
  ["RR", "リスク比（risk ratio）"],
  ["NNT", "治療必要数（number needed to treat）"],
  ["UMP", "一様最強力（uniformly most powerful）"],
  ["PCA", "主成分分析（principal component analysis）"],
  ["MAR", "観測データを条件とすると、欠測確率が未観測値に依存しない欠測機構"],
  ["MCAR", "観測値・未観測値のいずれにも欠測確率が依存しない欠測機構"],
  ["MNAR", "観測データを条件としても、欠測確率が未観測値に依存する欠測機構"],
  ["MAP", "最大事後確率（maximum a posteriori）推定"],
  ["MCMC", "マルコフ連鎖モンテカルロ法"],
  ["LOOCV", "1個抜き交差検証（leave-one-out cross-validation）"],
  ["CV", "交差検証（cross-validation）"],
  ["DEFF", "設計効果（design effect）"],
  ["SRS", "単純無作為抽出（simple random sampling）"],
  ["ARE", "漸近相対効率（asymptotic relative efficiency）"],
  ["VIF", "分散拡大係数（variance inflation factor）"],
  ["BLUE", "最良線形不偏推定量"],
  ["MCSE", "モンテカルロ標準誤差"],
  ["AIC", "赤池情報量規準"],
  ["BIC", "ベイズ情報量規準"],
  ["LDA", "線形判別分析"],
  ["QDA", "二次判別分析"],
  ["KS", "Kolmogorov–Smirnov"],
  ["EM", "期待値最大化（expectation–maximization）法"],
  ["ESS", "有効標本サイズ（effective sample size）"],
  ["HPD", "最高事後密度（highest posterior density）"],
  ["CRD", "完全無作為化法（completely randomized design）"],
  ["RCBD", "乱塊法（randomized complete block design）"],
  ["PRESS", "予測残差平方和"],
  ["FGLS", "実行可能一般化最小二乗法"],
  ["GLS", "一般化最小二乗法"],
  ["HC0", "異分散頑健共分散推定量の基本形"],
  ["HC3", "レバレッジ補正を行う異分散頑健共分散推定量"],
  ["FWER", "家族内誤り率（family-wise error rate）"],
  ["IPW", "逆確率重み付け（inverse probability weighting）"],
  ["KM", "Kaplan–Meier法"],
  ["HR", "ハザード比（hazard ratio）"],
  ["GLM", "一般化線形モデル"],
  ["SVM", "サポートベクターマシン"],
  ["IRLS", "反復重み付き最小二乗法"],
  ["DFFITS", "観測を除いたときの当てはめ値変化を測る回帰診断量"],
  ["DFBETA", "観測を除いたときの回帰係数変化を測る回帰診断量"],
  ["L1", "係数絶対値の和を使うL1罰則"],
  ["L2", "係数平方和を使うL2罰則"],
];

const phrases = [
  ["母数空間", "母数空間：母数が取り得る値をすべて集めた集合"],
  ["棄却域", "棄却域：帰無仮説を棄却する統計量・標本結果の集合"],
  ["検出力", "検出力：対立仮説が真のとき帰無仮説を棄却する確率"],
  ["p値", "p値：帰無仮説の下で、観測結果以上に帰無仮説と整合しない結果が出る確率"],
  ["スコア関数", "スコア関数：対数尤度を母数で微分した量"],
  ["フィッシャー情報量", "フィッシャー情報量：スコアの分散。正則条件下では対数尤度の負の2階微分の期待値に等しい"],
  ["リスク集合", "リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合"],
  ["ハザード", "ハザード：その時点まで生存した条件の下での瞬間的な事象発生率"],
  ["トランケーション", "トランケーション：条件を満たす個体だけが観測標本へ入る仕組み"],
  ["飽和モデル", "飽和モデル：各観測を完全に当てはめられる最大自由度のモデル"],
  ["逸脱度", "逸脱度：当てはめモデルと飽和モデルの最大対数尤度差を2倍した適合度指標"],
  ["ハット行列", "ハット行列：観測ベクトルを当てはめ値へ写す射影行列"],
  ["レバレッジ", "レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素"],
  ["事前分布", "事前分布：データ観測前の母数に関する不確実性を表す分布"],
  ["事後分布", "事後分布：事前分布を尤度で更新した、データ観測後の母数分布"],
  ["周辺尤度", "周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率"],
  ["ベイズファクター", "ベイズファクター：2モデルの周辺尤度の比"],
  ["ブートストラップ", "ブートストラップ：観測標本からの復元抽出で推定量の標本変動を近似する方法"],
  ["ジャックナイフ", "ジャックナイフ：観測を1個ずつ除いた推定値からバイアスや標準誤差を評価する方法"],
  ["置換検定", "置換検定：帰無仮説下で交換可能なラベルを入れ替え、統計量の帰無分布を作る検定"],
  ["包含確率", "包含確率：有限母集団の要素が標本に含まれる、標本設計上の確率"],
];

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function glossaryFor(text) {
  const result = [];
  for (const [term, definition] of abbreviations) {
    if (new RegExp(`\\b${escapeRegExp(term)}\\b`).test(text)) result.push(`- ${term}：${definition}`);
  }
  if (/\bMH\b/.test(text)) {
    const definition = /Metropolis|MCMC|マルコフ連鎖/.test(text)
      ? "Metropolis–Hastings法"
      : "Mantel–Haenszel法";
    result.push(`- MH：${definition}`);
  }
  if (/\bHT\b/.test(text) && /Horvitz|標本|抽出|包含確率/.test(text)) {
    result.push("- HT：Horvitz–Thompson推定量");
  }
  for (const [term, definition] of phrases) {
    if (text.includes(term)) result.push(`- ${definition}`);
  }
  if (text.includes("打ち切り")) {
    result.push("- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み");
  }
  if (text.includes("交絡")) {
    const definition = /要因計画|ブロック|別名|alias/.test(text)
      ? "交絡：実験計画上、複数の効果が同じコントラストに対応して分離できない状態"
      : "交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと";
    result.push(`- ${definition}`);
  }
  if (text.includes("\\Phi")) result.push("- $\\Phi$：標準正規分布の累積分布関数");
  if (text.includes("\\xrightarrow{d}")) result.push("- $\\xrightarrow{d}$：分布収束");
  if (text.includes("\\ell") && text.includes("尤度")) result.push("- $\\ell$：対数尤度");
  if (/Tobit|トービット/.test(text) && text.includes("\\phi")) {
    result.push("- $\\phi$：標準正規分布の確率密度関数");
  }
  return [...new Set(result)];
}

function parseCard(raw) {
  const problemIndex = raw.indexOf("\n## 問題\n");
  if (problemIndex < 0) return null;
  const prefix = raw.slice(0, problemIndex).trimEnd();
  const body = raw.slice(problemIndex + 1);
  const sections = [];
  for (const part of body.split(/\n(?=## )/)) {
    const match = part.match(/^## ([^\n]+)\n([\s\S]*)$/);
    if (match) sections.push({ name: match[1], content: match[2].trim() });
  }
  return { prefix, sections };
}

function transformCard(raw) {
  const parsed = parseCard(raw);
  if (!parsed) return raw;
  const byName = new Map(parsed.sections.map((section) => [section.name, section]));
  // Front matter and title disambiguate abbreviations such as MH:
  // MCMC cards mean Metropolis–Hastings, whereas contingency-table cards
  // mean Mantel–Haenszel.
  const text = `${parsed.prefix}\n${parsed.sections.map((section) => section.content).join("\n")}`;
  const definitions = glossaryFor(text);
  if (definitions.length > 0 && !byName.has("記号・用語")) {
    byName.set("記号・用語", { name: "記号・用語", content: definitions.join("\n") });
  }

  const usage = byName.get("使用公式・定理");
  if (usage && !usage.content.includes("**この欄の役割：")) {
    usage.content = `**この欄の役割：解答で使う定義・公式・定理と、その適用条件**\n\n${usage.content}`;
  }

  const preferred = ["問題", "記号・用語", "使用公式・定理", "一手", "方針", "答え", "計算例", "注意"];
  const ordered = [];
  for (const name of preferred) {
    const section = byName.get(name);
    if (section) ordered.push(section);
  }
  for (const section of parsed.sections) {
    if (!preferred.includes(section.name)) ordered.push(section);
  }
  return `${parsed.prefix}\n\n${ordered.map((section) => `## ${section.name}\n${section.content}`).join("\n\n")}\n`;
}

let changedCards = 0;
for (const name of targets) {
  const file = path.join(cardsDir, name);
  const source = fs.readFileSync(file, "utf8");
  const parts = source.split("<!-- CARD -->");
  const transformed = parts.map((part) => {
    if (!part.trim() || !/^\s*---[\s\S]*?^id:/m.test(part)) return part;
    const next = transformCard(part);
    if (next !== part) changedCards += 1;
    return next;
  });
  fs.writeFileSync(file, transformed.join("<!-- CARD -->"), "utf8");
}

console.log(`improved ${changedCards} cards in ${targets.length} files`);
