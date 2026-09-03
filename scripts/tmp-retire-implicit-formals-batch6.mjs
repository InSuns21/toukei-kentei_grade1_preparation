import fs from 'node:fs';

function replaceOnce(file, from, to) {
  let s = fs.readFileSync(file, 'utf8');
  const n = s.split(from).length - 1;
  if (n !== 1) throw new Error(`${file}: expected exactly one match, found ${n}: ${from.slice(0, 120)}`);
  s = s.replace(from, () => to);
  fs.writeFileSync(file, s);
}

const em = 'textbook/volumes/03_inference/I4_02_欠測_不完全データ_期待値最大化法/index.md';
replaceOnce(em,
`$Z_i=1$ の条件付き確率を

$$
r_i^{(t)}
=P(Z_i=1\\mid X_i=x_i,\\theta^{(t)})
$$

とします。ベイズの定理より

$$
\\boxed{
r_i^{(t)}
=
\\frac{
\\pi^{(t)}\\phi(x_i;\\mu_1^{(t)},\\sigma^2)
}{
\\pi^{(t)}\\phi(x_i;\\mu_1^{(t)},\\sigma^2)
+(1-\\pi^{(t)})\\phi(x_i;\\mu_2^{(t)},\\sigma^2)
}
}.
$$

これを **責任度**と呼びます。`,
`<a id="def-i4-02-responsibility"></a>

<!-- formal-statement-start -->
> **定義（責任度）**  
> 混合モデルのE-stepで、観測 $x_i$ が成分1に属する潜在指示変数を $Z_i$ とするとき、現在の母数 $\\theta^{(t)}$ の下での事後確率

$$
r_i^{(t)}
=P(Z_i=1\\mid X_i=x_i,\\theta^{(t)})
=
\\frac{
\\pi^{(t)}\\phi(x_i;\\mu_1^{(t)},\\sigma^2)
}{
\\pi^{(t)}\\phi(x_i;\\mu_1^{(t)},\\sigma^2)
+(1-\\pi^{(t)})\\phi(x_i;\\mu_2^{(t)},\\sigma^2)
}
$$

> を観測 $i$ に対する成分1の **責任度** といいます。
<!-- formal-statement-end -->`);

const suff = 'textbook/volumes/03_inference/S1_02_統計量_十分性_分解定理/index.md';
replaceOnce(suff,
`標本全体 $X$ は常に十分ですが、圧縮になっていません。

そこで、十分統計量の中で本質的に最も粗いものを **最小十分統計量** と呼びます。

直感的には、他の十分統計量 $S$ があれば

$$
T=\\phi(S)
$$

と書けるような $T$ です。`,
`標本全体 $X$ は常に十分ですが、圧縮になっていません。

<a id="def-s1-02-minimal-sufficient-statistic"></a>

<!-- formal-statement-start -->
> **定義（最小十分統計量）**  
> 統計量 $T$ が十分統計量であり、任意の十分統計量 $S$ に対して、ある可測関数 $\\phi$ が存在して

$$
T=\\phi(S)
$$

> と書けるとき、$T$ を **最小十分統計量** といいます。
<!-- formal-statement-end -->

つまり、十分統計量の中で本質的に最も粗い圧縮です。`);

const sample = 'textbook/volumes/03_inference/S1_03_標本抽出_研究設計/index.md';
replaceOnce(sample,
`そこで例えば

1. 第1段階: 市区町村や調査区を抽出する。
2. 第2段階: 選ばれた調査区内から世帯や個人を抽出する。

という二段階抽出を使います。

第1段階の単位を **一次抽出単位** と呼びます。`,
`そこで例えば

1. 第1段階: 市区町村や調査区を抽出する。
2. 第2段階: 選ばれた調査区内から世帯や個人を抽出する。

という二段階抽出を使います。

<a id="def-s1-03-two-stage-psu"></a>

<!-- formal-statement-start -->
> **定義（二段階抽出・一次抽出単位）**  
> 母集団を構成する大きな単位を第1段階で抽出し、選ばれた単位の内部から第2段階の標本を抽出する設計を **二段階抽出** といいます。第1段階で抽出対象となる単位を **一次抽出単位**（primary sampling unit; PSU）といいます。
<!-- formal-statement-end -->`);

const anova = 'textbook/volumes/04_linear_models/L1_03_分散分析/index.md';
replaceOnce(anova,
`Aの周辺平均は11と16なので、Aの平均的な効果は
$$
16-11=5.
$$
Bの周辺平均は10と17なので、Bの平均的な効果は
$$
17-10=7.
$$

このように、もう一方の因子について平均して見た効果を**主効果**と呼びます。`,
`Aの周辺平均は11と16なので、Aの平均的な効果は
$$
16-11=5.
$$
Bの周辺平均は10と17なので、Bの平均的な効果は
$$
17-10=7.
$$

<a id="def-l1-03-main-effect"></a>

<!-- formal-statement-start -->
> **定義（主効果）**  
> 多因子実験で、ある因子の各水準について他の因子の水準を平均した **周辺平均** を比較して得る平均的な効果を、その因子の **主効果** といいます。
<!-- formal-statement-end -->`);

const reg = 'textbook/volumes/04_linear_models/L1_04_回帰診断_一般化最小二乗_正則化/index.md';
replaceOnce(reg,
`ハット行列の対角成分

$$
\\boxed{h_{ii}}
$$

を観測 $i$ の **レバレッジ** と呼びます。`,
`<a id="def-l1-04-leverage"></a>

<!-- formal-statement-start -->
> **定義（レバレッジ）**  
> ハット行列 $H=X(X^{\\mathsf T}X)^{-1}X^{\\mathsf T}$ の対角成分

$$
h_{ii}
$$

> を観測 $i$ の **レバレッジ** といいます。
<!-- formal-statement-end -->`);
replaceOnce(reg,
`したがって変換後のモデルへ OLS を適用すればよく、その推定量は GLS と一致します。

この変換を **白色化** と呼びます。`,
`したがって変換後のモデルへ OLS を適用すればよく、その推定量は GLS と一致します。

<a id="def-l1-04-whitening"></a>

<!-- formal-statement-start -->
> **定義（白色化）**  
> 誤差共分散が $\\operatorname{Var}(\\varepsilon\\mid X)=\\sigma^2\\Omega$ のとき、$\\Omega=LL^{\\mathsf T}$ などを用いて $\\varepsilon^*=L^{-1}\\varepsilon$ と変換し、

$$
\\operatorname{Var}(\\varepsilon^*\\mid X)=\\sigma^2I
$$

> となるように誤差の相関と尺度差を取り除く変換を **白色化** といいます。
<!-- formal-statement-end -->`);

const mvn = 'textbook/volumes/05_engineering/E1_01_多変量正規_標本平均ベクトル/index.md';
replaceOnce(mvn,
`## 5. 白色化：楕円を球へ戻す

前節で使った、共分散を単位行列へ変換する操作を**白色化**といいます。

平均 $\\boldsymbol\\mu$、正定値な分散共分散行列 $\\Sigma$ をもつ確率ベクトル $\\boldsymbol X$ を考え、`,
`## 5. 白色化：楕円を球へ戻す

<a id="def-e1-01-whitening"></a>

<!-- formal-statement-start -->
> **定義（白色化）**  
> 平均 $\\boldsymbol\\mu$、正定値な分散共分散行列 $\\Sigma$ をもつ確率ベクトル $\\boldsymbol X$ に対し、中心化後の線形変換 $\\boldsymbol Z=W(\\boldsymbol X-\\boldsymbol\\mu)$ が

$$
\\operatorname{Cov}(\\boldsymbol Z)=I_p
$$

> を満たすようにする操作を **白色化** といいます。
<!-- formal-statement-end -->

以下では具体的な白色化行列を固有分解から構成します。$\\Sigma$ を`);

const factor = 'textbook/volumes/05_engineering/E1_03_因子分析_クラスター分析/index.md';
replaceOnce(factor,
`第 $i$ 変数について

$$
\\operatorname{Var}(X_i)
=\\sum_{j=1}^m\\lambda_{ij}^2+\\psi_i.
$$

共通因子で説明される分散

$$
\\boxed{
h_i^2=\\sum_{j=1}^m\\lambda_{ij}^2
}
$$

を**共通性**と呼びます。

独自因子の分散

$$
\\boxed{
\\psi_i
}
$$

を**独自性**と呼びます。`,
`第 $i$ 変数について

$$
\\operatorname{Var}(X_i)
=\\sum_{j=1}^m\\lambda_{ij}^2+\\psi_i.
$$

<a id="def-e1-03-communality-uniqueness"></a>

<!-- formal-statement-start -->
> **定義（共通性・独自性）**  
> 共通因子モデルで、第 $i$ 変数の分散のうち共通因子で説明される部分

$$
h_i^2=\\sum_{j=1}^m\\lambda_{ij}^2
$$

> を **共通性** といい、独自因子の分散 $\\psi_i$ を **独自性** といいます。
<!-- formal-statement-end -->`);
replaceOnce(factor,
`因子 $\\boldsymbol F$ は直接観測されません。各標本について「この対象の第1因子はどれくらい高いか」を表す値を**因子得点**と呼びます。

因子負荷量が母集団の相関構造を説明する係数であるのに対し、因子得点は個々の観測対象に対する潜在因子の推定値です。`,
`因子 $\\boldsymbol F$ は直接観測されません。

<a id="def-e1-03-factor-score"></a>

<!-- formal-statement-start -->
> **定義（因子得点）**  
> 各観測対象について、その対象の潜在因子 $\\boldsymbol F$ の値を観測データから推定した量を **因子得点** といいます。
<!-- formal-statement-end -->

因子負荷量が母集団の相関構造を説明する係数であるのに対し、因子得点は個々の観測対象に対する潜在因子の推定値です。`);

const svm = 'textbook/volumes/05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md';
replaceOnce(svm,
`そこで

$$
\\boxed{
\\ell_{\\mathrm{hinge}}(y,f)
=
\\max\\{0,1-yf\\}
}
$$

を **hinge損失** と呼びます。`,
`<a id="def-e1-04-hinge-loss"></a>

<!-- formal-statement-start -->
> **定義（hinge損失）**  
> 二値ラベル $y\\in\\{-1,+1\\}$ と判別関数値 $f$ に対し

$$
\\ell_{\\mathrm{hinge}}(y,f)
=\\max\\{0,1-yf\\}
$$

> を **hinge損失** といいます。
<!-- formal-statement-end -->`);

const ts = 'textbook/volumes/05_engineering/E2_03_ar_ma_arima時系列/index.md';
replaceOnce(ts,
`ラグを横軸、標本ACFまたは標本PACFを縦軸にして棒で描いた図を **コレログラム** と呼びます。実データでは理論値どおりに0になるのではなく、標本変動で小さな棒が残ります。`,
`<a id="def-e2-03-correlogram"></a>

<!-- formal-statement-start -->
> **定義（コレログラム）**  
> ラグを横軸、各ラグの標本自己相関（ACF）または標本偏自己相関（PACF）を縦軸として棒などで表した図を **コレログラム** といいます。
<!-- formal-statement-end -->

実データでは理論値どおりに0になるのではなく、標本変動で小さな棒が残ります。`);

const ssm = 'textbook/volumes/05_engineering/E2_05_状態空間モデル/index.md';
replaceOnce(ssm,
`まずスカラー形から始めます。

$$
\\boxed{x_t=ax_{t-1}+w_t}
$$

を **状態方程式**、

$$
\\boxed{y_t=cx_t+v_t}
$$

を **観測方程式** と呼びます。`,
`まずスカラー形から始めます。

<a id="def-e2-05-state-observation-equations"></a>

<!-- formal-statement-start -->
> **定義（状態方程式・観測方程式）**  
> スカラー線形状態空間モデルで

$$
x_t=ax_{t-1}+w_t
$$

> を **状態方程式**、

$$
y_t=cx_t+v_t
$$

> を **観測方程式** といいます。$w_t$ はシステムノイズ、$v_t$ は観測ノイズです。
<!-- formal-statement-end -->`);
replaceOnce(ssm,
`ここで

$$
\\boxed{K_t=\\frac{cP_t^-}{c^2P_t^-+r}}
$$

を **Kalman gain** と呼びます。`,
`<a id="def-e2-05-kalman-gain"></a>

<!-- formal-statement-start -->
> **定義（Kalman gain）**  
> スカラー線形Gaussian状態空間モデルの更新で、予測誤差分散 $S_t=c^2P_t^-+r$ に対して

$$
K_t=\\frac{cP_t^-}{S_t}
=\\frac{cP_t^-}{c^2P_t^-+r}
$$

> と定める係数を **Kalman gain** といいます。
<!-- formal-statement-end -->`);

const doe = 'textbook/volumes/05_engineering/E3_01_実験計画_直交表_交絡/index.md';
replaceOnce(doe,
`### 1.1 応答

観測したい結果を**応答**と呼びます。この例では植物の成長量です。確率変数として記述するときは $Y$ を使います。`,
`### 1.1 応答

<a id="def-e3-01-response"></a>

<!-- formal-statement-start -->
> **定義（応答）**  
> 実験で観測し、因子や処理の影響を調べたい結果を **応答** といいます。
<!-- formal-statement-end -->

この例では植物の成長量です。確率変数として記述するときは $Y$ を使います。`);
replaceOnce(doe,
`### 1.2 因子と水準

実験者が変化させ、応答への影響を調べたい変数を**因子**と呼びます。この例では薬剤量が因子です。因子が取る具体的な設定値を**水準**と呼び、たとえば「0 mg、10 mg、20 mg」の3水準です。`,
`### 1.2 因子と水準

<a id="def-e3-01-factor-level"></a>

<!-- formal-statement-start -->
> **定義（因子・水準）**  
> 実験者が変化させ、応答への影響を調べたい変数を **因子** といいます。因子が取る具体的な設定値・カテゴリを **水準** といいます。
<!-- formal-statement-end -->

この例では薬剤量が因子で、「0 mg、10 mg、20 mg」の3水準です。`);
replaceOnce(doe,
`### 1.3 処理

複数因子がある場合も含め、実験単位へ実際に与える条件の組合せを**処理**と呼びます。薬剤量だけなら3水準がそのまま3処理です。薬剤量3水準と温度2水準を同時に変えるなら、完全要因実験では $3\\times2=6$ 通りの処理があります。`,
`### 1.3 処理

<a id="def-e3-01-treatment"></a>

<!-- formal-statement-start -->
> **定義（処理）**  
> 複数因子がある場合も含め、実験単位へ実際に与える因子水準の組合せを **処理** といいます。
<!-- formal-statement-end -->

薬剤量だけなら3水準がそのまま3処理です。薬剤量3水準と温度2水準を同時に変えるなら、完全要因実験では $3\\times2=6$ 通りの処理があります。`);
replaceOnce(doe,
`### 1.4 実験単位

処理を**独立に割り付けられる最小の単位**を実験単位と呼びます。この例では鉢です。`,
`### 1.4 実験単位

<a id="def-e3-01-experimental-unit"></a>

<!-- formal-statement-start -->
> **定義（実験単位）**  
> 処理を **独立に割り付けられる最小の単位** を **実験単位** といいます。
<!-- formal-statement-end -->

この例では鉢です。`);
replaceOnce(doe,
`### 1.5 外乱因子

応答へ影響しそうだが、主目的ではない変数を外乱因子と考えます。日、ロット、圃場の位置、担当者などが典型です。測定できるならモデルへ入れ、実験前に扱えるならブロック化などで設計へ組み込みます。`,
`### 1.5 外乱因子

<a id="def-e3-01-nuisance-factor"></a>

<!-- formal-statement-start -->
> **定義（外乱因子）**  
> 応答へ影響し得るが、その効果自体が実験の主目的ではない変数を **外乱因子** といいます。
<!-- formal-statement-end -->

日、ロット、圃場の位置、担当者などが典型です。測定できるならモデルへ入れ、実験前に扱えるならブロック化などで設計へ組み込みます。`);

const baseline = 'scripts/implicit-formal-baseline.txt';
const remaining = fs.readFileSync(baseline, 'utf8').split(/\r?\n/).filter(Boolean);
if (remaining.length !== 17) throw new Error(`expected 17 remaining baseline entries, found ${remaining.length}`);
fs.writeFileSync(baseline, '');
console.log('batch6 formalized all remaining candidates; baseline 17 -> 0');
