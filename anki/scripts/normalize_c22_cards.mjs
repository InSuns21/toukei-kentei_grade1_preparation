import fs from "node:fs";
import path from "node:path";

const file = path.resolve(import.meta.dirname, "../cards/44_stochastic_time_series.md");
const source = fs.readFileSync(file, "utf8");

const groupRules = [
  {
    test: (id) => id.startsWith("stoch-") && (id.includes("markov") || id.includes("transition") || id.includes("stationary") || id.includes("communicating") || id.includes("period") || id.includes("absorption") || id.includes("hitting")),
    terms: String.raw`$p_{ij}=P(X_{n+1}=j\mid X_n=i)$ は1段階遷移確率、$P=(p_{ij})$ は遷移行列である。$P_{ij}^{(n)}$ は $n$ 段階遷移確率を表す。`,
    strategy: "状態と時点を固定し、1段階なら遷移行列の該当成分、多段階なら行列積または条件付けに直して計算する。",
  },
  {
    test: (id) => id.includes("random-walk") || id.includes("gambler") || id.includes("martingale"),
    terms: String.raw`$S_n=\sum_{k=1}^n\xi_k$ はランダムウォーク、$\xi_k$ は互いに独立で同じ分布に従う増分である。$\mathcal F_n$ は時刻 $n$ までの情報を表す。`,
    strategy: "位置を独立な増分の和に展開し、期待値の線形性と独立な変数の分散加法を適用する。到達問題では次の1歩で条件付けする。",
  },
  {
    test: (id) => id.includes("poisson") || id.includes("compound"),
    terms: String.raw`$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。`,
    strategy: String.raw`対象区間の長さを求めてポアソン分布の平均 $\lambda\times\text{区間長}$ を定める。条件付き問題では二項分布、和では全期待値・全分散を使う。`,
  },
  {
    test: (id) => id.includes("brownian") || id.includes("geometric"),
    terms: String.raw`$B(t)$ は標準ブラウン運動、$0\le s<t$ では増分 $B(t)-B(s)$ が平均0、分散 $t-s$ の正規分布に従う。`,
    strategy: "値そのものではなく増分へ直し、独立増分・正規分布・共分散 $\min(s,t)$ のうち必要な性質を選ぶ。",
  },
  {
    test: (id) => id.startsWith("ts-"),
    terms: String.raw`$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。`,
    strategy: "モデルを平均からの偏差またはバックシフト表示に直し、ホワイトノイズが過去と無相関であることを使って平均・分散・自己相関・予測量を順に求める。",
  },
];

const strategyById = {
  "stoch-markov-property": "現在の状態を条件に置き、過去を追加しても次状態の条件付き確率が変わらないことを式で確認する。",
  "ts-weak-vs-strong-stationarity": "強定常性は同時分布、弱定常性は平均と自己共分散だけを比較し、どちらまで確認できたかを分ける。",
  "ts-autocovariance-properties": "自己共分散の定義で時点を同じだけ平行移動し、定常性と共分散の対称性を順に使う。",
  "ts-white-noise-identification": "平均一定、分散一定、異時点の共分散0の3条件をデータまたはモデルから一つずつ確認する。",
  "ts-random-walk-nonstationary": "初期値から革新の和へ展開し、互いに無相関な革新の分散を加えて時刻依存性を示す。",
  "ts-ar1-mean": "モデル両辺の期待値を取り、定常平均が時刻によらないことから一次方程式を解く。",
  "ts-ar1-acf": "モデル式と過去値の共分散を取り、現在の革新と過去値が無相関であることから再帰式を作る。",
  "ts-ar1-one-step-forecast": "次時点のモデル式を条件付き期待値に入れ、未知の革新だけを平均0で落とす。",
  "ts-ar1-hstep-forecast": "1期先予測式を繰り返し代入し、平均からの偏差が各期で係数倍されることを使う。",
  "ts-ar1-forecast-error-variance": "実現値を革新の有限和へ展開し、予測値との差に残る将来革新の分散を加える。",
  "ts-ar2-stationarity": "AR多項式を作って二次方程式を解き、2根の絶対値をそれぞれ1と比較する。",
  "ts-yule-walker-ar2": "与えられた自己相関を2本のYule--Walker方程式へ代入し、連立一次方程式を消去法で解く。",
  "ts-ma1-invertibility": "モデル式を革新について解き、過去の革新へ再帰代入して係数が減衰する条件を調べる。",
  "ts-maq-acf-cutoff": "2時点のMA表示に共通して現れる革新だけを拾い、ラグが次数を超えると共通項が消えることを示す。",
  "ts-arma11-mean": "モデル両辺の期待値を取り、ホワイトノイズの平均0と定常平均一定を代入する。",
  "ts-backshift-arma": "各ラグ項をバックシフト演算子で置き換え、Xの項と革新の項をそれぞれ多項式にまとめる。",
  "stoch-transition-matrix-check": "各成分が非負かを確認した後、行ごとに和を計算して1になるかを判定する。",
  "stoch-three-state-two-step": "中間状態を1つ挟む全経路を列挙し、対応する2つの遷移確率の積を足す。",
  "stoch-three-state-stationary": "未知の定常確率を置き、定常方程式と確率の総和1を連立して解く。",
  "stoch-detailed-balance-check": "状態の各組について定常確率×往路確率と定常確率×復路確率を比較する。",
  "stoch-communicating-classes": "正の確率で到達できる有向経路を両方向に調べ、相互到達可能な状態を同じクラスへまとめる。",
  "stoch-period-computation": "同じ状態へ戻れる歩数を列挙し、その最大公約数を取る。",
  "stoch-absorption-probability": "次の1歩で条件付けた再帰式を作り、吸収状態の境界値を代入して解く。",
  "stoch-expected-hitting-time": "目標状態では0と置き、非目標状態では最初の1歩の時間1を足した再帰式を解く。",
  "stoch-random-walk-mean-variance": "位置を独立同分布な増分の和に展開し、期待値は足し、分散は独立性により足す。",
  "stoch-gambler-ruin": "次の1歩で条件付けて吸収確率の二階差分方程式を作り、2つの境界条件で定数を決める。",
  "stoch-random-walk-martingale": "次時点の位置を現在位置と新増分に分け、現在までの情報で条件付き期待値を取る。",
  "stoch-poisson-increments": "対象区間の長さを求め、定常増分で分布を決め、区間が重ならない場合だけ独立増分を使う。",
  "stoch-poisson-count-numeric": "到着率に区間長を掛けてポアソン分布の平均を定め、確率質量関数へ件数を代入する。",
  "stoch-poisson-arrival-gamma": "第k到着時刻をk個の独立な指数待ち時間の和と見て、ガンマ分布の形状母数を決める。",
  "stoch-poisson-thinning": "各到着を独立に分類し、元の到着率へ各分類確率を掛ける。",
  "stoch-poisson-superposition": "独立な計数過程の区間内件数を足し、独立なポアソン分布の再生性で到着率を加える。",
  "stoch-poisson-conditional-binomial": "総到着数を固定すると各到着点が部分区間へ入る確率は区間長比になるため、二項分布へ直す。",
  "stoch-compound-poisson-moments": "まず到着数で条件付け、条件付き平均と条件付き分散を求めてから全期待値・全分散を適用する。",
  "stoch-brownian-definition": "初期値、正規増分、独立増分、標本路連続性の4条件を漏れなく列挙する。",
  "stoch-brownian-increment-probability": "増分の区間長から分散を求め、標準偏差で割って標準正規分布へ変換する。",
  "stoch-brownian-covariance": "遅い時点までの値とその後の独立増分に分解し、独立部分との共分散を0にする。",
  "stoch-brownian-scaling": "変換後過程の有限次元分布を調べ、平均0と共分散が標準ブラウン運動と一致することを示す。",
  "stoch-brownian-drift": "ブラウン運動の正規分布へ線形変換を適用し、平均と分散を別々に変換する。",
  "stoch-geometric-brownian-solution": "伊藤公式を対数関数へ適用して確率微分方程式を加法形にし、両辺を時間積分して指数を取る。",
};

function fallback(id) {
  return {
    terms: "問題文に現れる添字は時点または状態を表す。確率、期待値、分散の対象を式ごとに確認する。",
    strategy: "求める量を定義式の左辺に置き、成立条件を確認してから既知量を右辺へ代入する。",
  };
}

function normalizeCard(raw) {
  const id = raw.match(/^id:\s*(\S+)/m)?.[1];
  if (!id) return raw;
  const divider = raw.indexOf("\n---\n");
  if (divider < 0) return raw;
  const header = raw.slice(0, divider + 5).trimEnd();
  const body = raw.slice(divider + 5).replace(/<!-- CARD -->\s*$/, "").trim();
  const sections = new Map();
  for (const part of body.split(/\n(?=## )/)) {
    const match = part.match(/^## ([^\n]+)\n([\s\S]*)$/);
    if (match) sections.set(match[1], match[2].trim());
  }
  const rule = groupRules.find((candidate) => candidate.test(id)) ?? fallback(id);
  if (!sections.has("記号・用語")) sections.set("記号・用語", rule.terms);
  const existingStep = sections.get("一手／方針") ?? sections.get("一手") ?? sections.get("方針");
  sections.delete("一手");
  sections.delete("方針");
  sections.set("一手／方針", strategyById[id] ?? existingStep ?? rule.strategy);

  const appendUnique = (name, addition) => {
    const current = sections.get(name) ?? "";
    if (!current.includes(addition)) sections.set(name, `${current}\n${addition}`.trim());
  };
  if (id === "ts-random-walk-nonstationary") {
    sections.set("記号・用語", "$X_t$ は時刻 $t$ の値、$\\varepsilon_t$ は互いに無相関な革新で、$E[\\varepsilon_t]=0$、$\\operatorname{Var}(\\varepsilon_t)=\\sigma^2$ とする。");
  }
  if (id === "stoch-three-state-two-step") {
    sections.set("記号・用語", "$p_{ij}=P(X_{n+1}=j\\mid X_n=i)$ は1段階遷移確率、$p_{ij}^{(2)}=P(X_{n+2}=j\\mid X_n=i)$ は2段階遷移確率である。");
  }
  if (id === "stoch-detailed-balance-check") {
    sections.set("記号・用語", "$p_{ij}$ は状態 $i$ から $j$ への1段階遷移確率、$\\pi_i$ は定常分布で状態 $i$ に割り当てる確率である。");
  }
  if (id === "stoch-compound-poisson-moments") {
    sections.set("記号・用語", "$N\\sim\\operatorname{Poisson}(\\lambda)$ とする。$Y_1,Y_2,\\ldots$ は互いに独立で同じ分布に従い、$N$ とも独立で、$E[Y_i]=\\mu$、$\\operatorname{Var}(Y_i)=\\sigma^2$ とする。$S=\\sum_{i=1}^NY_i$ である。");
    sections.set("答え", "条件付き平均は $E[S\\mid N]=N\\mu$ だから $$E[S]=E[N\\mu]=\\lambda\\mu.$$ また、全分散の公式により $$\\operatorname{Var}(S)=E[N\\sigma^2]+\\operatorname{Var}(N\\mu)=\\lambda\\sigma^2+\\lambda\\mu^2=\\lambda E[Y_1^2].$$");
  }
  if (id === "stoch-poisson-conditional-binomial") {
    appendUnique("注意", "$N(t)=n$ の条件下で、順序を無視した $n$ 個の到着点は独立な一様分布と同じであり、順序付き到着時刻はその順序統計量である。");
  }
  if (id === "ts-ar1-acf") {
    appendUnique("一手／方針", "$h\\ge1$ でモデル式と $X_{t-h}$ の共分散を取り、革新 $\\varepsilon_t$ が過去の $X_{t-h}$ と無相関であることを使う。");
    appendUnique("答え", "$$\\gamma(h)=\\operatorname{Cov}(\\phi X_{t-1}+\\varepsilon_t,X_{t-h})=\\phi\\gamma(h-1),$$ よって反復して $\\gamma(h)=\\phi^h\\gamma(0)$、したがって $\\rho(h)=\\phi^h$ となる。");
  }
  if (id === "ts-yule-walker-ar2") {
    appendUnique("答え", "第1式から $\\phi_1=0.6-0.6\\phi_2$。これを第2式へ代入すると $0.4=0.36+0.64\\phi_2$ なので $\\phi_2=0.0625$、さらに $\\phi_1=0.5625$ を得る。");
  }
  if (id === "stoch-gambler-ruin") {
    appendUnique("答え", "$h_i=(h_{i-1}+h_{i+1})/2$ を移項すると $h_{i+1}-h_i=h_i-h_{i-1}$。したがって差分は一定で $h_i=A+Bi$、境界条件 $h_0=0,h_N=1$ から $h_i=i/N$ となる。");
  }
  if (id === "ts-ar2-stationarity") {
    sections.set("計算例", "$\\phi_1=0.5,\\phi_2=0.2$ なら特性方程式 $1-0.5z-0.2z^2=0$ の根は $z=(-0.5\\pm\\sqrt{1.05})/0.4$。絶対値は約 $1.31,3.81$ でともに1を超えるため定常である。");
  }
  const order = ["問題", "記号・用語", "使用公式・定理", "一手／方針", "答え", "計算例", "注意"];
  const output = [];
  for (const name of order) {
    const content = sections.get(name);
    if (content) output.push(`## ${name}\n${content}`);
  }
  for (const [name, content] of sections) {
    if (!order.includes(name)) output.push(`## ${name}\n${content}`);
  }
  return `${header}\n${output.join("\n")}\n<!-- CARD -->`;
}

const prefix = source.startsWith("---\n") ? "" : source.slice(0, source.indexOf("---\n"));
const cards = source.slice(prefix.length).split(/(?=^---\nid: )/m).filter((part) => part.trim());
const normalized = prefix + cards.map(normalizeCard).join("\n\n") + "\n";
fs.writeFileSync(file, normalized, "utf8");
console.log(`normalized ${cards.length} C22 cards`);
