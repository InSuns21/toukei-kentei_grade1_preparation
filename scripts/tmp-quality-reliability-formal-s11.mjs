import fs from 'node:fs';

const qPath = 'textbook/volumes/05_engineering/E4_01_管理図と工程能力/index.md';
const rPath = 'textbook/volumes/05_engineering/E4_02_信頼性_保全性/index.md';

function replaceOnce(text, needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S11 needle not found: ${label}`);
  return text.replace(needle, () => replacement);
}

let q = fs.readFileSync(qPath, 'utf8');

if (!q.includes('def-e4-01-control-chart')) {
  const needle = `## 1. 管理図と規格は別の問い\n\nある工程で直径を毎時間5個測るとします。`;
  const replacement = `## 1. 管理図と規格は別の問い\n\n<a id="def-e4-01-control-chart"></a>\n\n<!-- formal-statement-start -->\n> **定義（管理図）**  \n> 工程から時間順に得られる統計量を中心線 $CL$ と上側・下側管理限界 $UCL,LCL$ とともに表示し、管理状態で想定される確率的変動から外れた兆候を検出する図を **管理図** という。管理限界は工程の確率モデルまたは工程データから定めるもので、製品要求から与えられる規格限界とは異なる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e4-01-control-chart -->\n**定義の確認**  \n工程平均50、個体標準偏差4、群サイズ16なら、既知母数の3シグマ $\\bar X$ 管理図は $CL=50$、$LCL=47$、$UCL=53$ です。これは工程平均の安定性を監視する境界であり、製品規格が47〜53という意味ではありません。\n<!-- definition-example-end -->\n\nある工程で直径を毎時間5個測るとします。`;
  q = replaceOnce(q, needle, replacement, 'control-chart-definition');
}

if (!q.includes('def-e4-01-process-capability-index')) {
  const needle = `## 7. 工程能力指数\n\n工程が管理状態にあり、\n$$\nX\\sim N(\\mu,\\sigma^2)\n$$\nで近似できるとします。規格幅と工程の自然ばらつき $6\\sigma$ を比べる指数が`;
  const replacement = `## 7. 工程能力指数\n\n<a id="def-e4-01-process-capability-index"></a>\n\n<!-- formal-statement-start -->\n> **定義（工程能力指数）**  \n> 管理状態にある工程の分布が規格幅に対してどの程度余裕を持つかを、工程のばらつきと規格限界から無次元化して表す指標を **工程能力指数** という。正規近似 $X\\sim N(\\mu,\\sigma^2)$ のもとで、中心ずれを無視した指数を\n> $C_p=(USL-LSL)/(6\\sigma)$、中心ずれも考慮した指数を\n> $C_{pk}=\\min\\{(USL-\\mu)/(3\\sigma),(\\mu-LSL)/(3\\sigma)\\}$\n> と定める。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e4-01-process-capability-index -->\n**定義の確認**  \n$LSL=40,USL=60,\\sigma=2$ なら $C_p=20/12=5/3$ です。平均が50なら $C_{pk}=5/3$ ですが、平均が56へずれると近い上側規格までの余裕が4しかないため $C_{pk}=4/6=2/3$ へ低下します。ばらつきが同じでも中心ずれは $C_{pk}$ に現れます。\n<!-- definition-example-end -->\n\n工程が管理状態にあり、\n$$\nX\\sim N(\\mu,\\sigma^2)\n$$\nで近似できるとします。規格幅と工程の自然ばらつき $6\\sigma$ を比べる指数が`;
  q = replaceOnce(q, needle, replacement, 'process-capability-definition');
}

fs.writeFileSync(qPath, q);

let r = fs.readFileSync(rPath, 'utf8');

if (!r.includes('def-e4-02-reliability')) {
  const needle = `## 1. 信頼度関数\n\n非修理部品の故障時刻を非負確率変数 $T$ とします。分布関数を`;
  const replacement = `## 1. 信頼度関数\n\n<a id="def-e4-02-reliability"></a>\n\n<!-- formal-statement-start -->\n> **定義（信頼性・信頼度関数）**  \n> 非修理対象の故障時刻を非負確率変数 $T$ とするとき、時刻 $t$ まで必要な機能を失わずに動作する確率\n> $R(t)=P(T>t)$\n> を **信頼度関数** という。本章では、このように所定時間まで機能を維持する確率的性質を **信頼性** と呼ぶ。分布関数 $F(t)=P(T\\le t)$ とは $R(t)=1-F(t)$ の関係にある。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e4-02-reliability -->\n**定義の確認**  \n故障時刻が率 $\\lambda$ の指数分布なら $R(t)=e^{-\\lambda t}$ です。例えば $\\lambda=0.01$ /時なら100時間を超えて動作する確率は $R(100)=e^{-1}\\approx0.368$ です。\n<!-- definition-example-end -->\n\n非修理部品の故障時刻を非負確率変数 $T$ とします。分布関数を`;
  r = replaceOnce(r, needle, replacement, 'reliability-definition');
}

if (!r.includes('def-e4-02-hazard-rate')) {
  const needle = `## 2. 危険率\n\n時刻 $t$ まで生存したという条件のもとで、直後に故障する強さを危険率（ハザード率）といい、\n$$\nh(t)=\\frac{f(t)}{R(t)}\n$$\nと定義します。`;
  const replacement = `## 2. 危険率\n\n<a id="def-e4-02-hazard-rate"></a>\n\n<!-- formal-statement-start -->\n> **定義（危険率）**  \n> 連続寿命 $T$ の密度を $f(t)$、信頼度関数を $R(t)=P(T>t)$ とする。$R(t)>0$ のとき\n> $h(t)=f(t)/R(t)$\n> を **危険率（ハザード率）** という。これは「時刻 $t$ まで生存した」という条件のもとで、単位時間当たりに直後の故障が生じる強さを表す。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e4-02-hazard-rate -->\n**定義の確認**  \n指数分布では $f(t)=\\lambda e^{-\\lambda t}$、$R(t)=e^{-\\lambda t}$ なので $h(t)=\\lambda$ です。時刻まで生存した条件を入れても故障強度が変わらないことが、一定危険率として現れます。\n<!-- definition-example-end -->\n\n時刻 $t$ まで生存したという条件のもとで、直後に故障する強さを危険率（ハザード率）といい、\n$$\nh(t)=\\frac{f(t)}{R(t)}\n$$\nと定義します。`;
  r = replaceOnce(r, needle, replacement, 'hazard-definition');
}

if (!r.includes('def-e4-02-maintainability')) {
  const needle = `## 7. 保全性\n\n修理時間を非負確率変数 $D$ とします。保全度を\n$$\nM(t)=P(D\\le t)\n$$\nと定義します。これは「故障後 $t$ 時間以内に修理を完了できる確率」です。`;
  const replacement = `## 7. 保全性\n\n<a id="def-e4-02-maintainability"></a>\n\n<!-- formal-statement-start -->\n> **定義（保全性・保全度）**  \n> 故障後の修理完了までの時間を非負確率変数 $D$ とするとき、\n> $M(t)=P(D\\le t)$\n> を **保全度** という。本章では、故障した対象を所定時間内に修理・復旧できる確率的性質を **保全性** と呼ぶ。したがって信頼性が故障までの時間を扱うのに対し、保全性は故障後の復旧時間を扱う。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-e4-02-maintainability -->\n**定義の確認**  \n修理時間が率 $\\mu=0.5$ /時の指数分布なら、2時間以内に修理完了する保全度は $M(2)=1-e^{-1}\\approx0.632$ です。これは「2時間まで故障しない確率」ではなく、故障後に2時間以内で復旧する確率です。\n<!-- definition-example-end -->\n\n修理時間を非負確率変数 $D$ とします。保全度を\n$$\nM(t)=P(D\\le t)\n$$\nと定義します。これは「故障後 $t$ 時間以内に修理を完了できる確率」です。`;
  r = replaceOnce(r, needle, replacement, 'maintainability-definition');
}

fs.writeFileSync(rPath, r);
