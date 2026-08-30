---
id: engqc-control-chart-selection
title: 計数管理図を選択し基準値から3シグマ限界まで計算する
category: applied-engineering
subcategory: engineering-quality
topic: attribute-control-chart-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 管理図
  - p管理図
  - np管理図
  - c管理図
  - u管理図
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
---
## 問題
次の計数データについて、使う管理図を選び、必要な管理限界を求めよ。

1. Phase Iで群サイズ $(80,120,100)$、不適合品数 $(4,9,7)$ を得た。まず基準不適合品率 $\overline p$ を推定せよ。次に、群サイズ $n_i=100$ の群に対するp管理図の3シグマ限界を求めよ。
2. 各群の標本数が一定で $n=100$、基準不適合品率が $p_0=0.08$ であり、不適合**品数**そのものを監視したい。管理図を選び限界を求めよ。
3. 検査機会数が毎回同じ製品について、不適合**箇所数**の平均が $\overline c=9$ である。管理図を選び限界を求めよ。
4. 検査面積が群ごとに異なり、単位面積当たり平均不適合数が $\overline u=0.5$、ある群の検査量が $n_i=25$ である。管理図を選び限界を求めよ。

## 記号・用語
**不適合品**は製品1個全体を合格・不合格の2値で数える。一方、**不適合**は1製品・1面積内に複数個生じ得る欠点を数える。

- $p$ 管理図：不適合品**率**。標本数が変わっても使える。
- $np$ 管理図：不適合品**数**。標本数一定。
- $c$ 管理図：不適合**数**。検査機会数・面積などが一定。
- $u$ 管理図：単位検査量当たり不適合**数**。検査量が変動。

$CL,UCL,LCL$ は中心線、上側管理限界、下側管理限界である。Phase Iは過去データから管理基準を作る段階である。

## 使用公式・定理
不適合品データは二項分布、不適合数データはポアソン分布を基本モデルとする。

Phase Iで不適合品率を推定する場合は、群率の単純平均ではなく
$$
\overline p=\frac{\sum_i d_i}{\sum_i n_i}
$$
と全不適合品数を全検査数で割る。

p管理図は群 $i$ ごとに
$$
CL=\overline p,
$$
$$
UCL_i=\overline p+3\sqrt{\frac{\overline p(1-\overline p)}{n_i}},
\qquad
LCL_i=\max\left\{0,\overline p-3\sqrt{\frac{\overline p(1-\overline p)}{n_i}}\right\}.
$$

標本数一定のnp管理図は
$$
CL=np_0,
$$
$$
UCL=np_0+3\sqrt{np_0(1-p_0)},
\qquad
LCL=\max\{0,np_0-3\sqrt{np_0(1-p_0)}\}.
$$

c管理図は
$$
CL=\overline c,
$$
$$
UCL=\overline c+3\sqrt{\overline c},
\qquad
LCL=\max\{0,\overline c-3\sqrt{\overline c}\}.
$$

u管理図は
$$
CL=\overline u,
$$
$$
UCL_i=\overline u+3\sqrt{\frac{\overline u}{n_i}},
\qquad
LCL_i=\max\left\{0,\overline u-3\sqrt{\frac{\overline u}{n_i}}\right\}.
$$

## 一手／方針
**最初に「不適合品か不適合か」、次に「率か個数か／検査量が一定か」を判定する。** 管理図名を先に暗記して式を探すのではなく、確率モデルを決めれば限界式が出る。

- 不適合品 → 二項分布 → 率ならp、個数ならnp。
- 不適合 → ポアソン分布 → 検査量一定ならc、可変ならu。

p・uでは標本数や検査量が変わると標準誤差も変わるため、管理限界は群ごとに変える。

## 答え
1. 全体の基準不適合品率は
$$
\overline p=\frac{4+9+7}{80+120+100}=\frac{20}{300}=0.0667.
$$
不適合品**率**を扱うのでp管理図である。$n_i=100$ では
$$
SE=\sqrt{\frac{0.0667(1-0.0667)}{100}}\approx0.02494,
$$
よって
$$
UCL\approx0.0667+3(0.02494)=0.1415,
$$
$$
LCL=\max\{0,0.0667-3(0.02494)\}=0.
$$

2. 不適合品**数**かつ $n$ 一定なのでnp管理図である。
$$
CL=100(0.08)=8,
$$
$$
\sqrt{100(0.08)(0.92)}\approx2.713,
$$
したがって
$$
UCL\approx16.14,\qquad LCL=0.
$$

3. 不適合**数**かつ検査機会一定なのでc管理図である。
$$
CL=9,
$$
$$
UCL=9+3\sqrt9=18,
\qquad
LCL=\max\{0,9-9\}=0.
$$

4. 不適合**数**かつ検査量可変なのでu管理図である。
$$
\sqrt{\frac{0.5}{25}}\approx0.1414,
$$
よって
$$
UCL\approx0.9243,
\qquad
LCL\approx0.0757.
$$

## 計算例
p管理図で $\overline p=0.05$ のとき、$n_i=100$ の群と $n_i=400$ の群では後者の標準誤差が前者の半分になる。したがって標本数が大きい群ほど管理限界は狭い。

同じ「傷の個数」でも、毎回同じ面積を検査するならc管理図、面積が変わるなら単位面積当たりへ直してu管理図を使う。

## 注意
3シグマ限界は二項分布・ポアソン分布の正規近似に基づくため、期待度数が小さい場合は正確限界を検討する。負になった下方限界は0へ切り上げる。

標本数一定でも不適合品**率**を表示したければp管理図を使える。np管理図は不適合品**数**を直接表示したい場合に便利である。管理限界は工程データから得る統計的限界であり、顧客の規格限界とは別物である。

<!-- CARD -->

---
id: engqc-cpk-offcenter
title: 工程の安定性を確認してCp・Cpk・片側能力を診断する
category: applied-engineering
subcategory: engineering-quality
topic: capability-cp-cpk-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 工程能力指数
  - Cp
  - Cpk
  - Cpu
  - Cpl
  - 工程管理
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 工程能力指数
---
## 問題
工程能力指数について次を解け。

1. 安定した正規工程で $USL=110,LSL=90,\mu=106,\sigma=2$ とする。$C_p$ と $C_{pk}$ を求め、能力低下の主因が「ばらつき」か「中心ずれ」か答えよ。
2. 一般に $C_{pk}\le C_p$ となる理由と等号条件を示せ。
3. 上側規格だけが $USL=25$、工程平均 $\mu=20$、標準偏差 $\sigma=1.5$ のとき、片側能力指数 $C_{pu}$ を求めよ。
4. 工程能力指数を計算する前に、なぜ管理図などで工程の安定性を確認すべきか説明せよ。

## 記号・用語
$USL,LSL$ は上側・下側規格限界、$\mu,\sigma$ は工程平均と工程標準偏差である。

- $C_p$：規格幅と工程の自然変動幅 $6\sigma$ の比。中心ずれを見ない。
- $C_{pk}$：平均から近い側の規格限界までの余裕を測り、中心ずれも反映する。
- $C_{pu},C_{pl}$：上側だけ、下側だけに規格がある場合の片側能力指数。

工程が**統計的管理状態**にあるとは、特殊原因による系統的な変化がなく、工程の分布が時間を通じて概ね安定している状態をいう。

## 使用公式・定理
両側規格では
$$
C_p=\frac{USL-LSL}{6\sigma},
$$
$$
C_{pk}=\min\left\{
\frac{USL-\mu}{3\sigma},
\frac{\mu-LSL}{3\sigma}
\right\}.
$$

規格中心を
$$
m=\frac{USL+LSL}{2},
$$
規格半幅を
$$
d=\frac{USL-LSL}{2}
$$
とすると
$$
C_p=\frac{d}{3\sigma},
\qquad
C_{pk}=\frac{d-|\mu-m|}{3\sigma}.
$$
よって
$$
C_{pk}\le C_p
$$
で、等号は $\mu=m$ のときに成り立つ。

片側規格では
$$
C_{pu}=\frac{USL-\mu}{3\sigma},
\qquad
C_{pl}=\frac{\mu-LSL}{3\sigma}.
$$

## 一手／方針
**順序は「工程が安定しているか → 規格が両側か片側か → ばらつきだけを見るか中心ずれも見るか」で判断する。**

両側規格ならまず $C_p$ で規格幅に対するばらつきを測り、次に上下の片側能力を計算して小さい方を $C_{pk}$ とする。$C_p$ は大きいのに $C_{pk}$ が小さければ、主因は中心ずれである。

## 答え
1. 
$$
C_p=\frac{110-90}{6\cdot2}
=\frac{20}{12}
\approx1.667.
$$
上側能力は
$$
\frac{110-106}{3\cdot2}=\frac46\approx0.667,
$$
下側能力は
$$
\frac{106-90}{3\cdot2}=\frac{16}{6}\approx2.667.
$$
したがって
$$
\boxed{C_{pk}\approx0.667}.
$$
$C_p$ は十分大きい一方で $C_{pk}$ が大きく低下しているので、主因は**工程平均の中心ずれ**である。

2. 規格中心から平均が $|\mu-m|$ だけずれると、近い側の規格限界までの距離は $d-|\mu-m|$ になる。よって
$$
C_{pk}=C_p-\frac{|\mu-m|}{3\sigma}\le C_p.
$$
等号は
$$
\boxed{\mu=m}
$$
のときである。

3. 上側規格しかないので $C_p$ を作らず、
$$
C_{pu}=\frac{25-20}{3(1.5)}
=\frac5{4.5}
\approx\boxed{1.111}.
$$

4. 特殊原因で平均や分散が時間変化している工程では、全期間から計算した $\mu$ や $\sigma$ が将来の工程分布を表さない。そのため能力指数による規格適合性の評価も安定しない。**まず管理図などで特殊原因の有無を確認し、安定した工程について能力を評価する。**

## 計算例
同じ $USL=110,LSL=90,\sigma=2$ でも $\mu=100$ なら
$$
C_{pk}=C_p=\frac{20}{12}\approx1.667.
$$
一方、$\sigma$ を変えず $\mu=106$ にずらすだけで $C_p$ は1.667のままなのに $C_{pk}$ は0.667へ低下する。この比較から、$C_p$ と $C_{pk}$ を対で見る意味が分かる。

## 注意
工程能力指数の**規格限界**と、管理図の**管理限界**は別物である。高い能力指数だからといって工程が統計的管理状態にあるとは限らない。逆に管理状態にあっても、規格に対してばらつきが大きければ能力は不足する。

片側規格しかない場合は、存在しない反対側の規格を仮定して $C_p$ を作らない。目標値からのずれそのものを損失として評価する $C_{pm}$、正規分布を仮定して規格外率を求める問題は、このカードとは別の解法単位として扱う。

<!-- CARD -->

---
id: engqc-cpm-target
title: 目標値ずれを含むCpmを計算する
category: applied-engineering
subcategory: engineering-quality
topic: capability-cpm
type: calc_step
difficulty: 2
priority: A
hashtags: [工程能力指数, Cpm, 目標値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 工程能力指数 }]
---
## 問題
$USL=110,LSL=90$、目標値 $T=100$、$\mu=102$、$\sigma=2$ の $C_{pm}$ を求めよ。
## 記号・用語
$C_{pm}$ はばらつきと目標値からの偏りを同時に罰するTaguchi型指数である。$USL,LSL,T$ は上側・下側規格限界と目標値である。
## 使用公式・定理
$$C_{pm}=\frac{USL-LSL}{6\sqrt{\sigma^2+(\mu-T)^2}}.$$
## 一手／方針
平均二乗偏差 $\sigma^2+(\mu-T)^2$ の平方根を使う。
## 答え
分母は $6\sqrt{4+4}=6\sqrt8$ より、$C_{pm}\approx20/16.971=1.179$。
## 計算例
$\mu=T$ なら $C_{pm}=C_p$。
## 注意
規格中心と品質目標値が同じとは限らない。

<!-- CARD -->

---
id: engqc-capability-defect-rate
title: 正規工程の規格外率を計算する
category: applied-engineering
subcategory: engineering-quality
topic: capability-defect-rate
type: calc_step
difficulty: 2
priority: S
hashtags: [工程能力指数, 規格外率, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 工程能力指数 }]
---
## 問題
正規分布 $X\sim N(100,2^2)$ に従う安定工程で、規格が $94\le X\le106$ のとき規格外率を求めよ。
## 記号・用語
両規格は平均からそれぞれ3標準偏差離れている。$USL,LSL$ は上側・下側規格限界、$\Phi(z)=P(Z\le z)$ は標準正規分布の累積分布関数、ppmはparts per million（100万分率）である。
## 使用公式・定理
$P(X<LSL)+P(X>USL)=2\{1-\Phi(3)\}$。
## 一手／方針
上下を標準化し、対称な両側裾を足す。
## 答え
規格外率は約 $0.00270=0.27\%$、すなわち約2700 ppm。
## 計算例
この設定では $C_p=C_{pk}=1$。
## 注意
正規性と長期安定性が崩れるとppm換算は信用できない。

<!-- CARD -->

---
id: engqc-nonnormal-capability
title: 非正規工程で6シグマ能力指数を使う注意点を答える
category: applied-engineering
subcategory: engineering-quality
topic: nonnormal-capability
type: recognition
difficulty: 2
priority: A
hashtags: [工程能力指数, 非正規分布, 分位点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 工程能力指数 }]
---
## 問題
強く右に歪んだ安定工程で、平均と標準偏差だけから $C_{pk}$ と規格外ppmを結び付ける問題点を答えよ。
## 記号・用語
ppmはparts per million（100万分率）であり、通常のppm換算は正規分布の裾確率を使う。
## 使用公式・定理
非正規分布では平均から3標準偏差の位置と0.135%分位点が一致しない。
## 一手／方針
標準偏差幅と実際の分位点幅を区別する。
## 答え
$C_{pk}$ の数値が同じでも実際の規格外率は正規換算と大きく異なり得る。変換、適切な分布モデル、または分位点ベースの能力評価を用いる。
## 計算例
寿命や待ち時間のような非負・右裾分布では特に注意する。
## 注意
非正規だから能力評価不能なのではなく、評価方法を分布に合わせる。

<!-- CARD -->

---
id: engrel-parallel-common-cause
title: 共通原因故障を含む並列システムの信頼度を計算する
category: applied-engineering
subcategory: engineering-quality
topic: common-cause-reliability
type: calc_step
difficulty: 1
priority: S
hashtags: [信頼性, 共通原因故障, 並列システム]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
確率0.05の共通原因故障が起きると2部品がともに停止する。共通原因がない条件下では各部品の故障確率が0.1で独立である。少なくとも一方が動けば成功するシステムの信頼度を求めよ。
## 記号・用語
共通原因故障は複数部品を同時に故障させ、単純な無条件独立を破る原因である。
## 使用公式・定理
共通原因なしを $C^c$ とすると、全確率の公式より $P(\text{成功})=P(C^c)P(\text{成功}\mid C^c)$。
## 一手／方針
共通原因がない確率と、その条件下で少なくとも一方が動く確率を掛ける。
## 答え
$$R=0.95\{1-(0.1)^2\}=0.9405.$$
## 計算例
共通原因を無視した値0.99より低く、冗長化だけでは0.05の同時故障を消せない。
## 注意
条件付き独立を仮定したモデルであり、共通原因の機構に応じた依存モデルが必要な場合もある。

<!-- CARD -->

---
id: engrel-k-out-of-n
title: k-out-of-nシステムの信頼度を計算する
category: applied-engineering
subcategory: engineering-quality
topic: k-out-of-n
type: calc_step
difficulty: 2
priority: A
hashtags: [信頼性, k-out-of-n, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
独立同一で信頼度0.9の3部品中、2個以上が動けば成功する2-out-of-3システムの信頼度を求めよ。
## 記号・用語
k-out-of-nは $n$ 成分中少なくとも $k$ 成分が動作すれば成功する構成である。
## 使用公式・定理
動作成分数 $X\sim\operatorname{Binomial}(n,r)$ として $P(X\ge k)$。
## 一手／方針
ちょうど2個と3個動作する確率を足す。
## 答え
$$\binom32(0.9)^2(0.1)+(0.9)^3=0.243+0.729=0.972.$$
## 計算例
直列3部品なら0.729、完全並列なら0.999。
## 注意
部品の独立・同一信頼度を仮定している。

<!-- CARD -->

---
id: engrel-series-component-requirement
title: 直列・並列システムの信頼度を計算し部品要件を逆算する
category: applied-engineering
subcategory: engineering-quality
topic: series-parallel-reliability-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 信頼性
  - 直列システム
  - 並列システム
  - 冗長化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 信頼性
---
## 問題
部品寿命は独立とする。
1. 信頼度が $0.9,0.8$ の2部品を、両方が動作して初めて成功する直列系にしたときの信頼度を求めよ。
2. 同じ2部品を、少なくとも一方が動けば成功する並列系にしたときの信頼度を求めよ。
3. 独立で同一信頼度 $r$ の3部品からなる直列系に信頼度0.90以上を要求するとき、各部品に必要な最小 $r$ を求めよ。

## 記号・用語
$R_i(t)=P(T_i>t)$ は使命時間 $t$ まで部品 $i$ が動作する確率である。直列系は全成分の動作が必要、並列系は少なくとも1成分の動作で成功する。

## 使用公式・定理
独立な直列系では
$$
R_S(t)=\prod_{i=1}^mR_i(t).
$$
独立な並列系では「全成分が故障」の補集合を使って
$$
R_P(t)=1-\prod_{i=1}^m\{1-R_i(t)\}.
$$
同一信頼度 $r$ の $m$ 部品直列系なら $R_S=r^m$ なので、系目標 $R_0$ から
$$
r\ge R_0^{1/m}
$$
と逆算できる。

## 一手／方針
成功条件を事象で言い換える。直列なら「すべて成功」なので積、並列なら「少なくとも1つ成功」なので全故障の補集合を取る。逆算問題では得られた系信頼度の式を部品信頼度について解く。

## 答え
1. 直列系は
$$
R_S=0.9\cdot0.8=0.72.
$$
2. 並列系は
$$
R_P=1-(1-0.9)(1-0.8)=1-0.02=0.98.
$$
3. $r^3\ge0.90$ より
$$
r\ge0.90^{1/3}\approx0.96549.
$$

## 計算例
3部品をすべて $r=0.97$ とすれば、直列系信頼度は $0.97^3\approx0.9127$ となり目標0.90を満たす。

## 注意
積や補集合の積への分解には部品故障の独立性が必要である。共通原因故障などの依存がある場合は、この基本公式を無条件には使えない。$k$-out-of-$n$ 系は動作部品数の分布を使う別の判断単位として扱う。

<!-- CARD -->

---
id: engrel-exponential-mtbf
title: 使命信頼度から指数寿命のMTBF要件を求める
category: applied-engineering
subcategory: engineering-quality
topic: mtbf-requirement
type: calc_step
difficulty: 1
priority: S
hashtags: [信頼性, MTBF, 指数分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
指数故障時間モデルで1000時間信頼度を0.90以上にしたい。必要な平均故障間隔MTBFの下限を求めよ。
## 記号・用語
MTBFはmean time between failures（平均故障間隔）で、一定故障率 $\lambda$ の逆数である。
## 使用公式・定理
$$R(t)=e^{-\lambda t},\qquad \operatorname{MTBF}=\frac1\lambda.$$
## 一手／方針
$e^{-1000\lambda}\ge0.90$ の対数を取り、許容故障率の上限をMTBFへ反転する。
## 答え
$$\lambda\le-\frac{\log0.90}{1000}=1.0536\times10^{-4},$$
したがって $\operatorname{MTBF}\ge9491.2$ 時間。
## 計算例
MTBFを10000時間とすれば $R(1000)=e^{-0.1}\approx0.9048$。
## 注意
MTBF要件への換算は一定故障率を仮定する指数モデルに依存する。

<!-- CARD -->

---
id: engrel-weibull-reliability
title: ワイブル分布の信頼度から故障率の形まで導く
category: applied-engineering
subcategory: engineering-quality
topic: weibull-reliability-hazard-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 信頼性
  - ワイブル分布
  - 信頼度
  - 故障率
  - 形状母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 信頼性
---
## 問題
形状母数 $k>0$、尺度母数 $\lambda>0$ のワイブル分布に従う寿命 $T$ を考える。
1. 信頼度関数 $R(t)=P(T>t)$ と故障率 $h(t)$ を書け。
2. $h(t)$ を $R(t)$ から導き、$k<1,k=1,k>1$ で故障率がどう変化するか説明せよ。
3. $k=2,\lambda=1000$ のとき、時刻 $t=500$ の信頼度と故障率を求めよ。

## 記号・用語
信頼度 $R(t)=P(T>t)$ は時刻 $t$ まで故障しない確率である。故障率 $h(t)$ は時刻 $t$ まで生存した条件の下で直後に故障する瞬間的な率で、一般に
$$
h(t)=\frac{f(t)}{R(t)}=-\frac{d}{dt}\log R(t)
$$
と書ける。尺度母数 $\lambda$ は $R(\lambda)=e^{-1}$ となる特性寿命であり、一般には平均寿命そのものではない。

## 使用公式・定理
ワイブル分布の信頼度は
$$
R(t)=\exp\left\{-\left(\frac{t}{\lambda}\right)^k\right\}.
$$
したがって
$$
-\log R(t)=\left(\frac{t}{\lambda}\right)^k
$$
を微分すれば
$$
h(t)=-\frac{d}{dt}\log R(t)
=\frac{k}{\lambda}\left(\frac{t}{\lambda}\right)^{k-1}.
$$
よって時間依存性は $t^{k-1}$ の指数の符号だけで判定できる。

## 一手／方針
**信頼度と故障率を別公式として暗記しない。** まず $R(t)$ を書き、故障率が必要なら $h(t)=-d\log R(t)/dt$ で導く。最後に $k-1$ の符号を見れば減少・一定・増加故障率を判定できる。

## 答え
1.
$$
R(t)=\exp\left\{-\left(\frac{t}{\lambda}\right)^k\right\},\qquad
h(t)=\frac{k}{\lambda}\left(\frac{t}{\lambda}\right)^{k-1}.
$$

2. $k<1$ なら $k-1<0$ なので故障率は時間とともに減少する。$k=1$ なら
$$
h(t)=\frac1\lambda
$$
で一定となり指数分布に一致する。$k>1$ なら故障率は時間とともに増加する。

3. $k=2,\lambda=1000,t=500$ では
$$
R(500)=\exp\{-(0.5)^2\}=e^{-0.25}\approx0.7788,
$$
$$
h(500)=\frac{2}{1000}(0.5)=0.001\quad \text{(時間}^{-1}\text{)}.
$$

## 計算例
$t=\lambda$ なら形状母数 $k$ にかかわらず $R(\lambda)=e^{-1}$ である。一方、故障率は
$$
h(\lambda)=\frac{k}{\lambda}
$$
なので形状母数に依存する。たとえば $k=0.5$ なら減少故障率、$k=1$ なら一定故障率、$k=3$ なら増加故障率である。

## 注意
$k<1,=1,>1$ はそれぞれ初期故障・偶発故障・摩耗故障の局面を近似するのに使えるが、浴槽曲線全体を単一のワイブル分布1本で表せるという意味ではない。尺度母数 $\lambda$ と平均寿命も一般には一致しない。

<!-- CARD -->

---
id: engmaint-steady-availability
title: 定常可用度をMTBF・MTTRと故障率・修復率の両方から導く
category: applied-engineering
subcategory: engineering-quality
topic: steady-availability-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 保全性
  - 可用度
  - MTBF
  - MTTR
  - 故障率
  - 修復率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 保全性
---
## 問題
修理可能な2状態系を考える。
1. 平均故障間隔 $MTBF=1000$ 時間、平均修復時間 $MTTR=20$ 時間の定常可用度 $A$ を求めよ。
2. 故障率 $\lambda=0.01$、修復率 $\mu=0.2$ の連続時間2状態モデルで、定常可用度を定常確率から導いて求めよ。
3. 指数的な故障・修復時間では、2つの公式が同じになることを示せ。

## 記号・用語
可用度は任意の十分遠い時点で系が動作可能である長期確率である。$MTBF$ は平均故障間隔、$MTTR$ は平均修復時間、$\lambda$ は稼働状態から故障状態への率、$\mu$ は故障状態から稼働状態への修復率である。

## 使用公式・定理
稼働時間と修復時間を交互に繰り返す更新過程では、長期の稼働時間割合は
$$
A=\frac{MTBF}{MTBF+MTTR}.
$$
2状態連続時間マルコフモデルの定常確率 $\pi_U,\pi_D$ は
$$
\pi_U\lambda=\pi_D\mu,\qquad \pi_U+\pi_D=1
$$
を満たすので
$$
A=\pi_U=\frac{\mu}{\lambda+\mu}.
$$
指数分布の平均より
$$
MTBF=\frac1\lambda,\qquad MTTR=\frac1\mu.
$$

## 一手／方針
**平均時間で与えられたら「稼働時間／1サイクル時間」、率で与えられたら定常流量の釣合いを使う。** 最後に $MTBF=1/\lambda,MTTR=1/\mu$ を代入すれば両表現が同一だと確認できる。

## 答え
1. 
$$
A=\frac{1000}{1000+20}=\frac{50}{51}\approx0.9804.
$$

2. 定常釣合いから
$$
A=\frac{0.2}{0.01+0.2}=\frac{20}{21}\approx0.9524.
$$

3. 
$$
\frac{MTBF}{MTBF+MTTR}
=\frac{1/\lambda}{1/\lambda+1/\mu}
=\frac{\mu}{\lambda+\mu}.
$$

## 計算例
$\lambda=0.01,\mu=0.2$ なら $MTBF=100,MTTR=5$ なので、時間表現でも
$$
A=\frac{100}{105}=\frac{20}{21}
$$
と一致する。

## 注意
$MTBF=1/\lambda$ や $MTTR=1/\mu$ は指数分布を仮定した場合の関係である。一方、更新過程の長期可用度 $MTBF/(MTBF+MTTR)$ 自体は、適切な再生条件の下で平均時間を用いてより一般に成立する。可用度は「時点で動いている確率」であり、使命時間中ずっと無故障である信頼度とは異なる。

<!-- CARD -->

---
id: engmaint-maintainability-exponential
title: 指数修復時間の保全度を計算する
category: applied-engineering
subcategory: engineering-quality
topic: maintainability
type: calc_step
difficulty: 1
priority: A
hashtags: [保全性, 保全度, 修復率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 保全性 }]
---
## 問題
修復時間が率 $\mu=0.1$ /時間の指数分布に従う。10時間以内に修復完了する保全度を求めよ。
## 記号・用語
保全度 $M(t)=P(T_R\le t)$ は規定時間内に修復できる確率である。
## 使用公式・定理
指数修復時間では $M(t)=1-e^{-\mu t}$。
## 一手／方針
未修復確率を1から引く。
## 答え
$$M(10)=1-e^{-1}\approx0.6321.$$
## 計算例
$MTTR=1/\mu=10$ 時間。
## 注意
保全度と製品寿命の信頼度を混同しない。

<!-- CARD -->

---
id: engrel-failure-rate-exact-ci
title: 総試験時間から故障率の正確信頼区間を求める
category: applied-engineering
subcategory: engineering-quality
topic: failure-rate-confidence-interval
type: calc_step
difficulty: 3
priority: A
hashtags: [信頼性, 故障率, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
一定故障率モデルで、総試験時間 $T_{\mathrm{tot}}=4000$ 時間中に $D=8$ 故障を観測した。故障率 $\lambda$ の95%両側正確信頼区間をカイ二乗分位点で表せ。
## 記号・用語
$\chi^2_{\nu,q}$ は自由度 $\nu$ のカイ二乗分布の上側 $q$ 点、すなわち $P(\chi^2_\nu>\chi^2_{\nu,q})=q$ を表す。
## 使用公式・定理
故障数 $D\sim\operatorname{Poisson}(\lambda T_{\mathrm{tot}})$ の正確区間は
$$\left[\frac{\chi^2_{2D,1-\alpha/2}}{2T_{\mathrm{tot}}},\frac{\chi^2_{2(D+1),\alpha/2}}{2T_{\mathrm{tot}}}\right].$$
## 一手／方針
$D=8$、$\alpha=0.05$ を自由度と分位点添字へ代入する。
## 答え
$$\lambda\in\left[\frac{\chi^2_{16,0.975}}{8000},\frac{\chi^2_{18,0.025}}{8000}\right].$$
## 計算例
表から分位点を得れば、各端点を8000で割って1時間当たり故障率に直す。
## 注意
$D=0$ の下端は0とする。分位点表が下側確率を使う場合は添字を読み替える。

<!-- CARD -->

---
id: engrel-competing-risks-exponential
title: 競合する指数故障原因の全体信頼度を求める
category: applied-engineering
subcategory: engineering-quality
topic: competing-risks
type: calc_step
difficulty: 3
priority: A
hashtags: [信頼性, 競合リスク, 故障率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
独立な故障原因1・2の原因別故障率が $\lambda_1=0.001,\lambda_2=0.002$ で一定とする。100時間信頼度を求めよ。
## 記号・用語
最初に発生した原因で系が故障する競合リスクモデルである。
## 使用公式・定理
独立な指数リスクの最小寿命は率 $\lambda_1+\lambda_2$ の指数分布。
## 一手／方針
原因別故障率を足して全故障率を作る。
## 答え
$$R(100)=e^{-(0.001+0.002)100}=e^{-0.3}\approx0.7408.$$
## 計算例
故障時に原因1である確率は $\lambda_1/(\lambda_1+\lambda_2)=1/3$。
## 注意
原因間依存がある場合は単純加算できない。

<!-- CARD -->

---
id: engrel-bathtub-curve
title: 浴槽曲線の3期間を説明する
category: applied-engineering
subcategory: engineering-quality
topic: bathtub-curve
type: recognition
difficulty: 1
priority: A
hashtags: [信頼性, 浴槽曲線, 故障率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
浴槽曲線の初期・偶発・摩耗故障期で故障率がどう変化するか答えよ。
## 記号・用語
浴槽曲線は使用時間に対する故障率の典型的形状である。
## 使用公式・定理
初期は減少、偶発期はほぼ一定、摩耗期は増加する。
## 一手／方針
製造欠陥の淘汰、ランダム故障、劣化蓄積へ対応させる。
## 答え
初期故障期は弱い個体が早期故障して率が下がる。偶発故障期は率がほぼ一定。摩耗故障期は劣化で率が上がる。
## 計算例
スクリーニングは初期故障、予防保全は摩耗故障への対策。
## 注意
実データが必ず理想的な浴槽形になるわけではない。

<!-- CARD -->

---
id: engmaint-preventive-replacement-rate
title: 年齢取替え方策の長期費用率を書く
category: applied-engineering
subcategory: engineering-quality
topic: preventive-replacement
type: recognition
difficulty: 3
priority: A
hashtags: [保全性, 予防保全, 更新過程]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 保全性 }]
---
## 問題
故障時費用 $C_f$、年齢 $\tau$ での予防取替費用 $C_p$、寿命分布 $F$・信頼度 $R$ の年齢取替え方策の長期費用率を書け。
## 記号・用語
1更新周期は故障時刻 $T$ と予防取替年齢 $\tau$ の小さい方。
## 使用公式・定理
$E[\min(T,\tau)]=\int_0^\tau R(t)\,dt$。
## 一手／方針
1周期期待費用を1周期期待長で割る。
## 答え
$$C(\tau)=\frac{C_fF(\tau)+C_pR(\tau)}{\int_0^\tau R(t)\,dt}.$$
## 計算例
$\tau$ を変えて $C(\tau)$ を最小にする取替年齢を選ぶ。
## 注意
取替時間や停止損失を含めるモデルでは分子・分母へ追加する。

<!-- CARD -->

---
id: engmaint-series-availability
title: 独立直列設備の可用度を計算する
category: applied-engineering
subcategory: engineering-quality
topic: system-availability
type: calc_step
difficulty: 2
priority: A
hashtags: [保全性, 可用度, 直列システム]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 保全性 }]
---
## 問題
独立な2設備が両方稼働してラインが動き、各定常可用度が0.98と0.95である。ライン可用度を求めよ。
## 記号・用語
直列ラインは全設備が同時に利用可能である必要がある。
## 使用公式・定理
独立直列系の可用度は成分可用度の積。
## 一手／方針
同時稼働確率を掛ける。
## 答え
$$A_S=0.98(0.95)=0.931.$$
## 計算例
長期停止割合は $1-0.931=0.069$。
## 注意
保全要員共有などで停止状態が依存すると積は使えない。

<!-- CARD -->

---
id: engmaint-reliability-vs-availability
title: 信頼度と可用度を使い分ける
category: applied-engineering
subcategory: engineering-quality
topic: reliability-vs-availability
type: recognition
difficulty: 1
priority: S
hashtags: [信頼性, 保全性, 可用度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 保全性 }]
---
## 問題
高信頼度と高可用度の違いを、修理可能系を例に説明せよ。
## 記号・用語
信頼度は区間内に一度も故障しない確率、可用度は指定時点で稼働可能な確率である。
## 使用公式・定理
可用度は故障頻度だけでなく修復速度にも依存する。
## 一手／方針
故障を許さない指標と、修理後の復帰を許す指標に分ける。
## 答え
頻繁に故障しても即時修復できれば可用度は高くなり得るが、同じ期間の信頼度は低い。無修理ミッションでは信頼度が中心となる。
## 計算例
サーバ群は部品故障があっても冗長化・迅速修復で高可用度を保てる。
## 注意
要求仕様が無故障継続か稼働率かを先に確認する。

<!-- CARD -->

---
id: engqc-xbar-r-chart-limits
title: Xbar-R管理図の平均とばらつきの限界を対で計算する
category: applied-engineering
subcategory: engineering-quality
topic: xbar-r-chart-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 管理図
  - Xbar管理図
  - R管理図
  - 工程平均
  - 工程分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
---
## 問題
$\overline X$--$R$ 管理図について次を求めよ。
1. 工程平均 $\mu=10$、工程標準偏差 $\sigma=2$ が既知、群サイズ $n=4$ のとき、$\overline X$ 管理図の3シグマ限界を求めよ。
2. Phase Iデータから $\overline{\overline X}=20,\overline R=4$ を得た。群サイズ5で $A_2=0.577,D_3=0,D_4=2.114$ とする。$\overline X$ 管理図とR管理図の両方の限界を求めよ。
3. 実運用では平均図とR図のどちらを先に確認すべきか、その理由を述べよ。

## 記号・用語
$\overline{\overline X}$ は群平均の平均、$R_i=\max_jX_{ij}-\min_jX_{ij}$ は第 $i$ 群の範囲、$\overline R$ は範囲の平均である。$A_2,D_3,D_4$ は群サイズに応じた管理図定数である。

## 使用公式・定理
$\sigma$ 既知なら群平均の標準偏差は $\sigma/\sqrt n$ なので
$$
UCL_{\overline X}=\mu+3\frac{\sigma}{\sqrt n},\quad
CL_{\overline X}=\mu,\quad
LCL_{\overline X}=\mu-3\frac{\sigma}{\sqrt n}.
$$
$\sigma$ を範囲から推定する標準的な $\overline X$--$R$ 管理図では
$$
UCL_{\overline X}=\overline{\overline X}+A_2\overline R,
\quad CL_{\overline X}=\overline{\overline X},
\quad LCL_{\overline X}=\overline{\overline X}-A_2\overline R,
$$
$$
UCL_R=D_4\overline R,\quad CL_R=\overline R,\quad LCL_R=D_3\overline R.
$$

## 一手／方針
**Xbar-Rは2枚の管理図を1組として扱う。** Phase IではまずR図で群内ばらつきが安定していることを確認し、その後にそのばらつき推定を使う平均図を解釈する。

## 答え
1. 
$$
3\frac{\sigma}{\sqrt n}=3\frac2{2}=3
$$
なので
$$
UCL=13,\quad CL=10,\quad LCL=7.
$$

2. 平均図は
$$
A_2\overline R=0.577\times4=2.308
$$
より
$$
UCL_{\overline X}=22.308,\quad CL_{\overline X}=20,\quad LCL_{\overline X}=17.692.
$$
R図は
$$
UCL_R=2.114\times4=8.456,\quad CL_R=4,\quad LCL_R=0.
$$

3. R図を先に確認する。群内ばらつきが特殊原因で不安定なら、$\overline R$ を使った平均図の限界自体が安定な工程分散を表さず、平均図の判定も信用しにくいからである。

## 計算例
$D_3=0$ の群サイズではR図の下方管理限界は0になる。これは範囲が負になれないこととも整合する。

## 注意
個々の観測値の標準偏差 $\sigma$ と群平均の標準偏差 $\sigma/\sqrt n$ を混同しない。群サイズが大きい場合や標準偏差 $S$ を使う設計では $\overline X$--$S$ 管理図を使うことがあり、その定数は別である。

<!-- CARD -->

---
id: engqc-s-chart-limits
title: S管理図の管理限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: s-chart
type: calc_step
difficulty: 2
priority: A
hashtags: [管理図, S管理図, 標準偏差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
$\overline S=3.0$、群サイズ10に対する $B_3=0.284,B_4=1.716$ のS管理図限界を求めよ。
## 記号・用語
$S_i$ は群 $i$ の標本標準偏差、$\overline S$ はその平均である。$B_3,B_4$ は群サイズで決まる管理図定数、$CL,UCL,LCL$ は中心線、上側・下側管理限界である。
## 使用公式・定理
$LCL=B_3\overline S$、$CL=\overline S$、$UCL=B_4\overline S$。
## 一手／方針
上下の管理図定数を平均標準偏差へ掛ける。
## 答え
$LCL=0.852$、$CL=3.0$、$UCL=5.148$。
## 計算例
$S_i=5.4$ は上方管理限界を越える。
## 注意
群サイズが比較的大きい場合はR管理図よりS管理図が情報を多く使う。

<!-- CARD -->

---
id: engqc-imr-moving-range
title: 個別値-MR管理図の限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: individuals-moving-range
type: calc_step
difficulty: 3
priority: A
hashtags: [管理図, 個別値管理図, 移動範囲]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
個別観測の平均 $\overline X=100$、2点移動範囲平均 $\overline{MR}=3$、$d_2=1.128$ とする。個別値管理図の3シグマ限界を求めよ。
## 記号・用語
$MR_i=|X_i-X_{i-1}|$、$\widehat\sigma=\overline{MR}/d_2$。
## 使用公式・定理
$UCL=\overline X+3\overline{MR}/d_2$、$LCL=\overline X-3\overline{MR}/d_2$。
## 一手／方針
移動範囲から工程標準偏差を推定する。
## 答え
$\widehat\sigma=3/1.128\approx2.660$ より、$UCL\approx107.98$、$LCL\approx92.02$。
## 計算例
個別値109は上方限界外。
## 注意
連続観測に自己相関が強いと通常の限界は誤警報率を保てない。

<!-- CARD -->

---
id: engqc-control-vs-specification
title: 管理限界と規格限界を区別する
category: applied-engineering
subcategory: engineering-quality
topic: control-vs-specification
type: recognition
difficulty: 1
priority: S
hashtags: [管理図, 工程能力指数, 規格限界]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: プロセス管理 }]
---
## 問題
管理限界と規格限界はそれぞれ何から決まり、何を判定するか。
## 記号・用語
管理限界は工程データ、規格限界は設計・顧客要求から定める。
## 使用公式・定理
管理図は統計的安定性、工程能力指数は安定工程の分布と規格幅の適合を評価する。
## 一手／方針
「工程の声」と「顧客の声」に分ける。
## 答え
管理限界は共通原因変動の範囲を示し、特殊原因の兆候を検出する。規格限界は製品が要求を満たす許容範囲を示す。
## 計算例
管理内でも規格外品が多い工程、管理外でも規格内の一時点はいずれもあり得る。
## 注意
規格値を管理図の上下限へそのまま置かない。

<!-- CARD -->

---
id: engqc-common-special-causes
title: 共通原因と特殊原因を判別する
category: applied-engineering
subcategory: engineering-quality
topic: variation-causes
type: recognition
difficulty: 1
priority: S
hashtags: [プロセス管理, 共通原因, 特殊原因]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: プロセス管理 }]
---
## 問題
共通原因変動と特殊原因変動に対する改善行動の違いを答えよ。
## 記号・用語
共通原因は通常工程に組み込まれた変動、特殊原因は特定可能な一時的・局所的変動である。
## 使用公式・定理
管理図の管理外信号は特殊原因の候補を示す。
## 一手／方針
現場の個別除去と工程システム全体の改善を分ける。
## 答え
特殊原因は設備故障や材料ロットなどを特定・除去する。共通原因は工程設計、設備能力、標準作業など管理側のシステム改善を要する。
## 計算例
安定工程を作業者が点ごとに調整すると過剰調整で変動を増やし得る。
## 注意
管理図の信号だけで原因そのものが特定されるわけではない。

<!-- CARD -->

---
id: engqc-rational-subgrouping
title: 合理的群分けの目的を説明する
category: applied-engineering
subcategory: engineering-quality
topic: rational-subgroup
type: recognition
difficulty: 2
priority: A
hashtags: [プロセス管理, 合理的群分け, 管理図]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: プロセス管理 }]
---
## 問題
Xbar-R管理図で合理的群分けを行う目的を答えよ。
## 記号・用語
合理的群分けは群内を短時間・同条件の観測で構成する考え方である。
## 使用公式・定理
群内変動は短期共通原因変動を表し、群間変動に時間的な工程変化を現れやすくする。
## 一手／方針
検出したい変化を群内に混ぜず、群間へ出す。
## 答え
同一条件の観測を群内にまとめることで、特殊原因による水準変化を群平均の差として検出しやすくする。
## 計算例
1日中から無作為に5個集めるより、同時刻付近の5個を1群にする。
## 注意
不適切な群分けは特殊原因を群内ばらつきへ吸収してしまう。

<!-- CARD -->

---
id: engqc-phase1-phase2
title: 管理図を合理的群分けからPhase I・IIと原因対応まで運用する
category: applied-engineering
subcategory: engineering-quality
topic: control-chart-operation-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 管理図
  - 合理的群分け
  - Phase-I
  - Phase-II
  - 共通原因
  - 特殊原因
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: プロセス管理
---
## 問題
管理図の運用について次を答えよ。

1. $\overline X$--$R$ 管理図で合理的群分けを行う目的を説明せよ。
2. Phase I と Phase II の目的の違いを説明せよ。
3. 管理図で特殊原因の兆候が出た場合と、管理状態にあるが工程のばらつき自体を小さくしたい場合で、改善行動をどう変えるべきか説明せよ。
4. Phase II で管理外信号が出るたびに管理限界を再計算してよいか。

## 記号・用語
**合理的群分け**とは、1群の中を短時間・同一条件に近い観測で構成し、群内には通常の短期変動を、群間には時間的・条件的な工程変化を現れやすくする考え方である。

- **共通原因**：通常の工程システムに組み込まれた変動。
- **特殊原因**：設備故障、材料ロット変更、設定ミスなど、特定可能な一時的・局所的変動。
- **Phase I**：過去データを用いて工程の安定性を遡及的に調べ、基準となる中心線・管理限界を作る段階。
- **Phase II**：Phase Iで確立した基準を用いて、新しい工程データを逐次監視する段階。

## 使用公式・定理
管理図では、管理限界外の点やランルールなどの非ランダムなパターンを、特殊原因が存在する可能性を示す**信号**として扱う。

合理的群分けでは、群内変動を短期の共通原因変動の代表とみなし、検出したい水準変化や条件変化を群間差へ出しやすくする。

Phase Iでは概念的に
$$
\text{過去データ}\to\text{特殊原因の調査}\to\text{安定部分から基準推定},
$$
Phase IIでは
$$
\text{固定した基準}\to\text{新データの監視}\to\text{信号時の原因調査}
$$
と進める。

## 一手／方針
**管理図は「どう群を作るか → 基準をどう作るか → 基準をどう使うか → 信号にどう対応するか」の順に考える。**

1. 検出したい変化を群内に混ぜないよう合理的群分けをする。
2. Phase Iで特殊原因を調査し、安定したデータから中心線と管理限界を定める。
3. Phase IIではその限界を基準として新データを監視する。
4. 信号が出たら原因候補を調査し、特殊原因なら局所的に除去する。管理状態の共通原因変動をさらに減らしたいなら、工程設計・設備能力・標準作業などシステム側を改善する。

## 答え
1. 例えば1日中からばらばらに5個を集めて1群にすると、途中で起きた工程水準の変化まで群内ばらつきへ混ざり得る。そこで同時刻付近・同一条件の5個を1群にし、**群内を短期の通常変動、群間を時間変化の検出場所**にする。これが合理的群分けの目的である。

2. Phase Iは過去データから「安定したときの工程」を定義する基準作りである。特殊原因候補を調査し、妥当な安定データから中心線と管理限界を推定する。Phase IIはその基準を原則固定し、将来の観測に変化が生じたかを監視する。

3. 特殊原因の兆候が出たときは、設備故障・材料ロット・作業条件など個別原因を調査して除去する。一方、特殊原因がなく管理状態にある工程の共通原因変動を減らすには、個々の点を追いかけるのではなく、工程設計や設備・標準作業など工程システム全体を改善する。

4. 管理外信号が出るたびに無条件で管理限界を再計算してはいけない。まず信号の原因を調査する。単に直近データへ限界を追随させると、検出したい工程変化まで基準へ取り込んでしまう。

## 計算例
ある工程で午前中は平均10、設備交換後の午後は平均12になったとする。午前・午後を混ぜて各群を作ると、変化が群内ばらつきへ吸収される。各時刻付近で群を作れば、午前群と午後群の平均差として管理図に現れやすい。

また、Phase IIで1点だけ上側管理限界を超えたとき、その点を消して直ちに限界を広げるのではなく、まず設備・材料・測定・作業条件など特殊原因の候補を調べる。

## 注意
管理図の信号は**原因そのものを特定するものではない**。あくまで特殊原因を調査すべき兆候である。また、管理限界は工程の統計的変動から作る基準であり、製品要求である規格限界とは別物である。

Phase Iで平均や分散を推定するため、実際の誤警報率は母数既知の理論値からずれることがある。管理状態にある点ごとのランダムな偏差へ毎回設備調整で反応する「過剰調整」は、変動を増やし得る別の重要論点である。

<!-- CARD -->

---
id: engqc-three-sigma-false-alarm
title: 3シグマ誤警報確率から管理内平均連長まで導く
category: applied-engineering
subcategory: engineering-quality
topic: false-alarm-arl0-canonical
type: strategy
difficulty: 2
priority: A
hashtags:
  - 管理図
  - 3シグマ
  - 誤警報
  - 平均連長
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
---
## 問題
管理状態の標準化統計量が各時点で独立に標準正規分布に従い、単点の3シグマルール $|Z|>3$ で信号を出すとする。
1. 1点当たりの誤警報確率 $\alpha$ を求めよ。
2. 信号が出るまでの点数 $N$ の分布を述べ、管理内平均連長 $ARL_0=E[N]$ を求めよ。
3. 1時間に1点観測するなら、平均して何時間に1回誤警報が出るか。

## 記号・用語
$ARL$（average run length、平均連長）は管理図が信号を出すまでの観測点数の期待値である。添字0は工程が管理状態である場合を表す。

## 使用公式・定理
標準正規分布の累積分布関数を $\Phi$ とすると、3シグマ単点ルールの誤警報確率は
$$
\alpha=P(|Z|>3)=2\{1-\Phi(3)\}\approx0.00270.
$$
各点が独立で毎回一定確率 $\alpha$ で信号を出すなら、信号までの点数は成功確率 $\alpha$ の幾何分布に従うため
$$
ARL_0=E[N]=\frac1\alpha.
$$

## 一手／方針
**まず1点で誤って外へ出る確率を両側裾から求め、その信号を「成功」とする幾何分布へつなぐ。** 0.0027と約370を独立した暗記事項にしない。

## 答え
$$
\alpha\approx2(0.00135)=0.00270.
$$
したがって
$$
N\sim\operatorname{Geom}(0.00270),\qquad
ARL_0=\frac1{0.00270}\approx370.4.
$$
1時間に1点なら、管理状態でも平均約370時間に1回は単点ルールだけで誤警報が生じる。

## 計算例
もし単点信号確率が $0.01$ なら $ARL=100$ 点である。信号確率が2倍になれば平均連長は半分になる。

## 注意
点間相関がある場合や複数のランルールを併用する場合、単純な独立幾何分布にはならない。Phase Iで平均や分散を推定した誤差によっても実際の誤警報率は理論値とずれ得る。

<!-- CARD -->

---
id: engqc-arl1-mean-shift
title: 平均シフト後のXbar管理図検出力とARLを求める
category: applied-engineering
subcategory: engineering-quality
topic: shift-detection-arl
type: calc_step
difficulty: 3
priority: S
hashtags: [管理図, 検出力, 平均連長]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
標準化した群平均の管理限界が $\pm3$ で、工程平均が標準誤差の2倍だけ上方へ移動した。1点検出確率と $ARL_1$ を近似せよ。
## 記号・用語
シフト後の標準化統計量は正規分布 $Z\sim N(2,1)$ に従う。標準正規分布の累積分布関数を $\Phi(z)=P(Z_0\le z)$ とし、添字1は工程変化後を表す。
## 使用公式・定理
$p_s=P(Z>3)+P(Z<-3)$、$ARL_1=1/p_s$。
## 一手／方針
平均2の正規分布から上下限外確率を計算する。
## 答え
$P(Z>3)=1-\Phi(1)=0.1587$、下側はほぼ0なので $p_s\approx0.1587$、$ARL_1\approx6.30$。
## 計算例
平均して約6群で2標準誤差シフトを検出する。
## 注意
シフト量を個体標準偏差単位か群平均標準誤差単位か明示する。

<!-- CARD -->

---
id: engqc-run-rule-eight-one-side
title: 中心線片側8点のランルールを判定する
category: applied-engineering
subcategory: engineering-quality
topic: run-rules
type: recognition
difficulty: 1
priority: A
hashtags: [管理図, ランルール, プロセス管理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
連続8点がすべて中心線より上だが、どの点も3シグマ限界内である。どう判定するか。
## 記号・用語
ランルールは単点限界外以外の非ランダムパターンを検出する補助規則である。
## 使用公式・定理
代表的規則として中心線の同じ側に連続8点なら工程水準の変化を疑う。
## 一手／方針
各点の限界内外だけでなく、符号の連続性を見る。
## 答え
管理限界内でもランルール違反であり、上方シフトの特殊原因候補として調査する。
## 計算例
独立対称なら指定した側に8点続く確率は $(1/2)^8$。
## 注意
採用するランルールと点数は運用前に定める。

<!-- CARD -->

---
id: engqc-ewma-update
title: EWMAを逐次更新し再帰式から定常分散まで導く
category: applied-engineering
subcategory: engineering-quality
topic: ewma-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 管理図
  - EWMA管理図
  - 小変化検出
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
---
## 問題
独立な観測 $X_t$ の平均を $\mu$、分散を $\sigma^2$ とし、EWMA統計量を
$$
Z_t=\lambda X_t+(1-\lambda)Z_{t-1},\qquad0<\lambda\le1
$$
とする。
1. $Z_{t-1}=10,X_t=14,\lambda=0.25$ のとき $Z_t$ を求めよ。
2. 定常状態で $\operatorname{Var}(Z_t)=v$ と置き、$v=\sigma^2\lambda/(2-\lambda)$ を導け。
3. $\sigma^2=9,\lambda=0.2$ のとき定常分散を求めよ。

## 記号・用語
EWMAは指数加重移動平均（exponentially weighted moving average）であり、直近の観測と過去の平滑化統計量を重み付けして更新する。小さい $\lambda$ は過去を長く引きずるため、持続的な小変化を平滑に蓄積する。

## 使用公式・定理
更新式は
$$
Z_t=\lambda X_t+(1-\lambda)Z_{t-1}.
$$
$X_t$ と過去の $Z_{t-1}$ が独立で定常分散を $v$ とすると
$$
v=\lambda^2\sigma^2+(1-\lambda)^2v.
$$
よって
$$
v\{1-(1-\lambda)^2\}=\lambda^2\sigma^2,
$$
$$
v=\sigma^2\frac{\lambda}{2-\lambda}.
$$

## 一手／方針
**更新計算と分散公式を別暗記しない。** まず重み付き再帰を使い、長期分散が問われたら同じ再帰式の両辺へ分散を取って定常条件 $\operatorname{Var}(Z_t)=\operatorname{Var}(Z_{t-1})$ を置く。

## 答え
1. 
$$
Z_t=0.25(14)+0.75(10)=11.
$$

2. 上の分散再帰を解いて
$$
\operatorname{Var}(Z_\infty)=\sigma^2\frac{\lambda}{2-\lambda}.
$$

3. 
$$
\operatorname{Var}(Z_\infty)
=9\frac{0.2}{1.8}=1.
$$
したがって定常標準偏差は1である。

## 計算例
定常標準偏差が1で限界幅係数 $L=3$ なら、中心線からの定常限界幅は3である。$\lambda=1$ なら $Z_t=X_t$ となり、定常分散も $\sigma^2$ に戻る。

## 注意
初期時点では分散はまだ定常値に達しておらず、時変管理限界を用いる設計もある。$\lambda$ を小さくすると定常分散は小さくなるが、単純に「小さいほど常に良い」わけではなく、検出したいシフトの大きさとARLを考えて設計する。

<!-- CARD -->

---
id: engqc-cusum-one-step
title: 片側CUSUM統計量を1期更新する
category: applied-engineering
subcategory: engineering-quality
topic: cusum-chart
type: calc_step
difficulty: 2
priority: A
hashtags: [管理図, CUSUM管理図, 小変化検出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
標準化観測 $z_t=1.1$、基準値 $k=0.5$、前期上側CUSUM $C_{t-1}^+=0.8$ のとき $C_t^+$ を求めよ。
## 記号・用語
CUSUMは累積和（cumulative sum）で、小さな持続シフトを蓄積する。$k$ は標準化した参照値、$h$ は標準化した決定限界である。
## 使用公式・定理
$$C_t^+=\max\{0,C_{t-1}^++z_t-k\},\qquad C_t^+>h\text{ で上方シグナル}.$$
## 一手／方針
前期累積へ基準値超過分を加え、負なら0へ戻す。
## 答え
$$C_t^+=\max\{0,0.8+1.1-0.5\}=1.4.$$
## 計算例
判定値 $h=5$ ならまだ信号ではない。
## 注意
下方シフトには別の下側CUSUMを使う。

<!-- CARD -->

---
id: engqc-control-chart-sample-size
title: シフト後平均が3シグマ限界に達する群サイズを求める
category: applied-engineering
subcategory: engineering-quality
topic: chart-sample-size
type: calc_step
difficulty: 3
priority: A
hashtags: [管理図, 検出力, 標本数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 管理図 }]
---
## 問題
個体標準偏差 $\sigma$ の工程で、平均が $1.5\sigma$ 上方シフトしたとき、群平均の標準化シフトを3以上にする最小群サイズを求めよ。
## 記号・用語
群平均の標準誤差は $\sigma/\sqrt n$。
## 使用公式・定理
標準化シフトは $\delta\sqrt n/\sigma$。
## 一手／方針
$1.5\sqrt n\ge3$ を $n$ について解く。
## 答え
$\sqrt n\ge2$ より最小は $n=4$。
## 計算例
$n=4$ ならシフト後平均は上側3シグマ限界の位置に来る。
## 注意
この条件は平均位置だけの比較で、所望検出確率を直接指定した設計ではない。

<!-- CARD -->

---
id: engqc-process-adjustment-overcontrol
title: 安定工程の過剰調整が変動を増やす理由を説明する
category: applied-engineering
subcategory: engineering-quality
topic: overcontrol
type: recognition
difficulty: 2
priority: A
hashtags: [プロセス管理, 過剰調整, 共通原因]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: プロセス管理 }]
---
## 問題
管理状態の工程で、中心線からの各点の偏差を打ち消すよう毎回設備を調整すると何が起こり得るか。
## 記号・用語
過剰調整は共通原因によるランダム変動へ逐次反応する操作である。
## 使用公式・定理
独立な測定誤差に基づく逆方向調整は、次期出力へ余分な調整誤差を加える。
## 一手／方針
ランダム偏差を真の水準変化と誤認した影響を考える。
## 答え
工程平均は改善せず、調整量のばらつきが加わって出力分散を増やし得る。
## 計算例
管理図の信号なしに点ごとにノブを動かす「tampering」が典型。
## 注意
特殊原因の信号が出た場合の原因除去とは区別する。
