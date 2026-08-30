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
title: 工程の安定性からCp・Cpk・Cpm・規格外率まで診断する
category: applied-engineering
subcategory: engineering-quality
topic: capability-index-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 工程能力指数
  - Cp
  - Cpk
  - Cpm
  - Cpu
  - Cpl
  - 規格外率
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
工程能力について次を解け。

1. 安定した正規工程で $USL=110,LSL=90,\mu=106,\sigma=2$ とする。$C_p$ と $C_{pk}$ を求め、能力低下の主因がばらつきか中心ずれか答えよ。
2. 一般に $C_{pk}\le C_p$ となる理由と等号条件を示せ。
3. 上側規格だけが $USL=25$、$\mu=20,\sigma=1.5$ のとき、$C_{pu}$ を求めよ。
4. $USL=110,LSL=90$、品質目標値 $T=100$、$\mu=102,\sigma=2$ のとき $C_{pm}$ を求め、$C_p$ との違いを説明せよ。
5. 正規分布 $N(100,2^2)$ に従う安定工程で規格が $94\le X\le106$ のとき、規格外率とppmを求めよ。この設定の $C_p,C_{pk}$ も答えよ。
6. 工程能力指数を計算する前に工程の安定性を確認すべき理由と、強く非正規な工程で $C_{pk}$ を正規分布のppmへ機械的に換算してはいけない理由を述べよ。

## 記号・用語
$USL,LSL$ は上側・下側規格限界、$T$ は品質目標値、$\mu,\sigma$ は工程平均と工程標準偏差である。

- $C_p$：規格幅と自然変動幅 $6\sigma$ の比で、中心ずれを見ない。
- $C_{pk}$：平均から近い側の規格限界までの余裕を測り、中心ずれも反映する。
- $C_{pu},C_{pl}$：片側規格に対する能力指数。
- $C_{pm}$：ばらつきだけでなく、品質目標値 $T$ からの平均のずれも罰する指数。

ppmはparts per million、すなわち100万分率である。工程が統計的管理状態にあるとは、特殊原因による系統的な変化がなく、工程分布が時間を通じて概ね安定している状態をいう。

## 使用公式・定理
両側規格では
$$
C_p=\frac{USL-LSL}{6\sigma},
$$
$$
C_{pk}=\min\left\{\frac{USL-\mu}{3\sigma},\frac{\mu-LSL}{3\sigma}\right\}.
$$
規格中心 $m=(USL+LSL)/2$、規格半幅 $d=(USL-LSL)/2$ とすると
$$
C_p=\frac d{3\sigma},\qquad
C_{pk}=\frac{d-|\mu-m|}{3\sigma}.
$$
よって $C_{pk}\le C_p$ で、等号は $\mu=m$ のときである。

片側規格では
$$
C_{pu}=\frac{USL-\mu}{3\sigma},\qquad
C_{pl}=\frac{\mu-LSL}{3\sigma}.
$$

目標値ずれも含めると
$$
C_{pm}=\frac{USL-LSL}{6\sqrt{\sigma^2+(\mu-T)^2}}.
$$
特に $\mu=T$ なら $C_{pm}=C_p$ である。

正規工程の規格外率は標準正規分布の累積分布関数 $\Phi$ を用いて
$$
P(X<LSL)+P(X>USL)
=\Phi\left(\frac{LSL-\mu}{\sigma}\right)
+1-\Phi\left(\frac{USL-\mu}{\sigma}\right)
$$
と計算する。

## 一手／方針
**「安定性 → 分布仮定 → 規格の片側・両側 → 中心ずれや目標値ずれを何まで評価するか → 必要なら規格外確率」の順で処理する。**

$C_p$ と $C_{pk}$ の差が大きければ中心ずれを疑う。品質目標値そのものからのずれを評価するなら $C_{pm}$ を見る。ppmへ進むときは正規性を追加仮定していることを明示する。

## 答え
1.
$$
C_p=\frac{110-90}{6\cdot2}=\frac{20}{12}\approx\boxed{1.667}.
$$
一方
$$
C_{pu}=\frac{110-106}{6}=\frac23,\qquad
C_{pl}=\frac{106-90}{6}=\frac83,
$$
なので
$$
C_{pk}=\boxed{0.667}.
$$
$C_p$ は十分大きいのに $C_{pk}$ が小さいため、主因はばらつきより**中心ずれ**である。

2.
$$
C_{pk}=\frac{d-|\mu-m|}{3\sigma}\le\frac d{3\sigma}=C_p.
$$
等号は $|\mu-m|=0$、すなわち $\mu=m$ のとき。

3.
$$
C_{pu}=\frac{25-20}{3\cdot1.5}=\frac5{4.5}\approx\boxed{1.111}.
$$

4.
$$
C_{pm}=\frac{20}{6\sqrt{2^2+(102-100)^2}}
=\frac{20}{6\sqrt8}
\approx\boxed{1.179}.
$$
この設定では
$$
C_p=\frac{20}{12}\approx1.667
$$
であり、$C_{pm}$ は目標値からの2のずれも分母へ入れるため小さくなる。

5. 上下規格は平均からそれぞれ $3\sigma$ なので
$$
P(X<94)+P(X>106)=2\{1-\Phi(3)\}\approx\boxed{0.00270}.
$$
したがって約 $0.27\%$、すなわち約 $\boxed{2700\ \mathrm{ppm}}$ である。また
$$
C_p=C_{pk}=\frac{106-94}{6\cdot2}=\boxed{1}.
$$

6. 特殊原因で平均や分散が時間変化する工程では、全期間から計算した $\mu,\sigma$ が将来の工程を表さないため、まず管理状態を確認する。さらに非正規工程では平均から何標準偏差離れたかと裾確率の対応が正規分布と異なるので、$C_{pk}$ から正規ppmへ機械的に換算できない。

## 計算例
同じ $USL=110,LSL=90,\sigma=2$ でも $\mu=100$ なら
$$
C_{pk}=C_p\approx1.667.
$$
一方、$\mu=106$ では $C_p$ は変わらないが $C_{pk}\approx0.667$ まで低下する。この比較で「工程の幅」と「中心位置」を分けて診断できる。

$C_{pm}$ では $\mu=T$ なら $\sqrt{\sigma^2+(\mu-T)^2}=\sigma$ となるので $C_{pm}=C_p$ へ戻る。

## 注意
管理限界は工程の統計的変動から定める限界、規格限界は顧客・設計上の要求であり別物である。高い工程能力指数だけでは管理状態を保証しない。

非正規工程では、適切な分布モデル、変換、または実分位点に基づく能力評価を検討する。片側規格しかない場合に、存在しない反対側規格を仮定して $C_p$ を作らない。

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
title: ワイブル分布の信頼度・故障率を導き浴槽曲線を解釈する
category: applied-engineering
subcategory: engineering-quality
topic: weibull-reliability-hazard-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 信頼性
  - ワイブル分布
  - 故障率
  - 浴槽曲線
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
形状母数 $k>0$、尺度母数 $\eta>0$ のワイブル分布に従う寿命 $T$ を考える。

1. 信頼度関数 $R(t)=P(T>t)$ と故障率 $h(t)$ を書き、$h(t)$ を $R(t)$ から導け。
2. $k<1,k=1,k>1$ のとき故障率が時間とともにどう変化するか説明せよ。
3. $k=2,\eta=1000$ のとき、$t=500$ における信頼度と故障率を求めよ。
4. 信頼性工学の浴槽曲線における初期故障期・偶発故障期・摩耗故障期を、故障率の形と代表的な対策に対応させて説明せよ。

## 記号・用語
**信頼度**
$$
R(t)=P(T>t)
$$
は時刻 $t$ まで故障せず動作する確率である。

**故障率（ハザード）** $h(t)$ は、時刻 $t$ まで生存したという条件の下で直後に故障する瞬間的な率であり、連続寿命では
$$
h(t)=\frac{f(t)}{R(t)}=-\frac{d}{dt}\log R(t)
$$
と書ける。

浴槽曲線は、製品のライフサイクルで故障率が概ね「減少→ほぼ一定→増加」と推移する典型像を表す。

## 使用公式・定理
ワイブル分布の信頼度は
$$
R(t)=\exp\left\{-\left(\frac{t}{\eta}\right)^k\right\}.
$$
したがって
$$
-\log R(t)=\left(\frac{t}{\eta}\right)^k
$$
を微分すれば
$$
h(t)=\frac{k}{\eta}\left(\frac{t}{\eta}\right)^{k-1}.
$$

よって形状母数 $k$ が故障率の時間変化を決める。
- $k<1$：減少故障率
- $k=1$：一定故障率
- $k>1$：増加故障率

## 一手／方針
**信頼度の式を丸暗記した後に故障率を別公式として覚えるのではなく、$h(t)=-d\log R(t)/dt$ から導く。** そのうえで指数 $k-1$ の符号を見れば、故障率が減る・一定・増えるの判定まで一続きでできる。

浴槽曲線を問われたら、3期間を単に名前で暗記せず、
$$
\text{弱い個体の淘汰}\to\text{ランダム故障}\to\text{劣化蓄積}
$$
と原因を対応させる。

## 答え
1. 
$$
R(t)=\exp\left\{-\left(\frac{t}{\eta}\right)^k\right\}.
$$
したがって
$$
\log R(t)=-\left(\frac{t}{\eta}\right)^k
$$
より
$$
\boxed{
h(t)=-\frac{d}{dt}\log R(t)
=\frac{k}{\eta}\left(\frac{t}{\eta}\right)^{k-1}
}.
$$

2. $k<1$ なら $k-1<0$ なので $h(t)$ は減少する。$k=1$ なら
$$
h(t)=\frac1\eta
$$
で一定となり、ワイブル分布は指数分布に一致する。$k>1$ なら $h(t)$ は増加する。

3. $k=2,\eta=1000,t=500$ では
$$
R(500)=\exp\{-(0.5)^2\}=e^{-0.25}\approx\boxed{0.7788}.
$$
また
$$
h(500)=\frac{2}{1000}(0.5)=\boxed{0.001}.
$$

4. 浴槽曲線では、
- **初期故障期**：故障率が減少。製造欠陥などを持つ弱い個体が早期に故障して淘汰される。スクリーニングやバーンインが代表的対策。
- **偶発故障期**：故障率がほぼ一定。時間に強く依存しないランダム故障が中心で、指数寿命モデルが近似として使いやすい。
- **摩耗故障期**：故障率が増加。摩耗・疲労・劣化が蓄積するため、点検や予防保全・計画交換が重要になる。

## 計算例
同じ尺度 $\eta$ でも、$k=0.5$ なら減少故障率、$k=1$ なら一定故障率、$k=3$ なら増加故障率となる。したがってワイブル分布は浴槽曲線の**各局面**を個別に近似するのに使える。

ただし典型的な浴槽曲線全体は、減少・一定・増加という異なる局面をつないだ概念である。単一の固定 $k$ を持つワイブル分布1本だけでは、故障率の方向を途中で「減少から増加へ」変えることはできない。

## 注意
尺度母数 $\eta$ は一般には平均寿命そのものではない。平均寿命は
$$
E[T]=\eta\,\Gamma\left(1+\frac1k\right)
$$
であり、$k=1$ の指数分布でのみ $E[T]=\eta$ となる。

また、浴槽曲線は典型的な説明モデルであり、実データが必ず理想的な浴槽形になるわけではない。使命時間中ずっと無故障である確率としての信頼度と、修理を含めた時点稼働確率である可用度も区別する。

<!-- CARD -->

---
id: engmaint-steady-availability
title: 定常可用度を導き信頼度と区別して系可用度まで計算する
category: applied-engineering
subcategory: engineering-quality
topic: steady-availability-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 保全性
  - 可用度
  - MTBF
  - MTTR
  - 故障率
  - 修復率
  - 信頼度
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
修理可能系の可用度について次を解け。

1. 平均故障間隔 $MTBF=1000$ 時間、平均修復時間 $MTTR=20$ 時間の定常可用度 $A$ を求めよ。
2. 稼働状態から故障状態への故障率 $\lambda=0.01$、故障状態から稼働状態への修復率 $\mu=0.2$ の2状態連続時間モデルについて、定常確率から可用度を導いて求めよ。
3. 故障時間・修復時間が指数分布なら、1の時間表現と2の率表現が一致することを示せ。
4. 信頼度と可用度の違いを説明せよ。特に「途中で故障してもすぐ修復できる系」で両者が異なり得る理由を述べよ。
5. 独立な2設備が両方稼働して初めてラインが動く。各設備の定常可用度が $0.98,0.95$ のとき、ラインの定常可用度を求めよ。

## 記号・用語
**定常可用度**は、十分長時間運用したときの任意時点で系が稼働可能である長期確率である。

- $MTBF$：平均故障間隔。
- $MTTR$：平均修復時間。
- $\lambda$：稼働状態から故障状態への故障率。
- $\mu$：故障状態から稼働状態への修復率。
- **信頼度** $R(t)$：使命時間 $[0,t]$ を途中故障なしで生き残る確率。

可用度は**修復後の復帰を許す時点確率**、信頼度は**使命時間中の無故障継続確率**である。

## 使用公式・定理
稼働時間と修復時間を交互に繰り返す再生過程では、長期の稼働時間割合より
$$
A=\frac{MTBF}{MTBF+MTTR}.
$$

2状態連続時間マルコフモデルの定常確率 $\pi_U,\pi_D$ は流量釣合い
$$
\pi_U\lambda=\pi_D\mu,
\qquad
\pi_U+\pi_D=1
$$
を満たすので
$$
A=\pi_U=\frac{\mu}{\lambda+\mu}.
$$

指数分布なら
$$
MTBF=\frac1\lambda,
\qquad
MTTR=\frac1\mu.
$$

独立な設備がすべて稼働して初めて系が稼働する直列系では
$$
A_{\mathrm{sys}}=\prod_i A_i.
$$

## 一手／方針
**まず「無故障継続を問うのか、ある時点で動いている確率を問うのか」を判定する。** 前者なら信頼度、後者で修理可能系なら可用度を考える。

可用度では、
1. 平均時間が与えられたら「稼働時間／1サイクル時間」。
2. 故障率・修復率が与えられたら2状態の定常流量を釣り合わせる。
3. 複数設備なら系が稼働する論理条件を確認する。独立直列なら成分可用度を掛ける。

## 答え
1. 
$$
A=\frac{1000}{1000+20}=\frac{50}{51}\approx\boxed{0.9804}.
$$

2. 定常状態では
$$
\pi_U\lambda=\pi_D\mu,
\qquad
\pi_U+\pi_D=1.
$$
よって
$$
\pi_U=\frac{\mu}{\lambda+\mu}
=\frac{0.2}{0.01+0.2}
=\frac{20}{21}
\approx\boxed{0.9524}.
$$

3. 指数分布なら
$$
\frac{MTBF}{MTBF+MTTR}
=\frac{1/\lambda}{1/\lambda+1/\mu}
=\boxed{\frac{\mu}{\lambda+\mu}}.
$$
したがって2つの表現は一致する。

4. 信頼度は「途中で1回でも故障したら失敗」と数える。一方、可用度は故障後に修復して再び動いていれば、その時点では稼働として数える。したがって**故障が比較的多くても修復が非常に速ければ、高可用度と低めの使命信頼度が同時に起こり得る。** 無修理ミッションでは信頼度、長期運用サービスでは可用度が重要になりやすい。

5. 2設備が独立で、両方稼働が必要なので
$$
A_{\mathrm{sys}}=0.98\times0.95=\boxed{0.931}.
$$

## 計算例
故障率 $\lambda=0.01$、修復率 $\mu=0.99$ の指数モデルなら
$$
A=\frac{0.99}{1.00}=0.99
$$
と高可用度である。一方、修復を許さず100時間を無故障で完走する信頼度は
$$
R(100)=e^{-0.01\cdot100}=e^{-1}\approx0.368
$$
にすぎない。この例は、信頼度と可用度が別の要求指標であることを示す。

また各設備の可用度が高くても、直列設備数が増えると系可用度は積で低下する。例えば3設備が各0.99なら
$$
0.99^3\approx0.9703.
$$

## 注意
$MTBF=1/\lambda$、$MTTR=1/\mu$ は指数分布を仮定した場合の関係である。一方、適切な再生条件の下では長期可用度
$$
\frac{MTBF}{MTBF+MTTR}
$$
は平均稼働時間・平均修復時間を用いてより一般に成立する。

直列系で可用度を積に分解するには、設備の稼働状態の独立性が必要である。共通設備、共通原因故障、保全要員の共有などで依存がある場合は単純積を使えない。

保全度 $M(t)=P(T_R\le t)$ は「規定時間内に修復完了する確率」であり、定常可用度とは別の解法単位である。

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
id: engqc-phase1-phase2
title: 合理的群分けからPhase I・II・特殊原因対応・過剰調整まで運用する
category: applied-engineering
subcategory: engineering-quality
topic: control-chart-operation-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 管理図
  - 合理的群分け
  - Phase I
  - Phase II
  - 特殊原因
  - 共通原因
  - 過剰調整
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
管理図の実務運用について次を答えよ。

1. 合理的群分けとは何か。群内変動と群間変動をどう考えるか。
2. Phase IとPhase IIの役割の違いを説明せよ。
3. Phase Iで管理限界外の点が見つかったとき、単にその点を削除すればよいわけではない理由を述べよ。
4. 管理状態にある工程の各観測を $X_t=\mu+\varepsilon_t$、$\varepsilon_t$ は独立で平均0、分散 $\sigma^2$ とする。観測 $X_t$ が平均から $\varepsilon_t$ だけずれたことを見て、設備設定を次回に $-\varepsilon_t$ だけ補正する過剰調整を毎回行うとする。次回観測の平均からの偏差とその分散を求め、なぜ過剰調整が変動を増やし得るか説明せよ。

## 記号・用語
**共通原因**は安定工程に内在する多数の小さな変動要因、**特殊原因**は特定可能で除去・是正の対象になり得る異常要因である。

合理的群分けでは、短時間・同条件で取った観測を群内へまとめ、特殊原因による時間的・条件的な変化ができるだけ群間差として現れるようにする。

## 使用公式・定理
Phase Iは過去データを使って工程の安定性を吟味し、特殊原因を調査したうえで中心線・管理限界を推定する段階である。Phase IIは確立した基準を用いて将来の工程を逐次監視する段階である。

過剰調整の簡単なモデルでは、時点 $t$ の偶然偏差 $\varepsilon_t$ を打ち消すため次回設定を $-\varepsilon_t$ だけ動かすと、次回の平均からの偏差は
$$
-\varepsilon_t+\varepsilon_{t+1}.
$$
独立性より
$$
\operatorname{Var}(-\varepsilon_t+\varepsilon_{t+1})
=\sigma^2+\sigma^2=2\sigma^2.
$$

## 一手／方針
**管理図の信号は「設備を直ちに動かせ」という命令ではなく、「特殊原因があるか調査せよ」という診断信号として読む。**

Phase Iでは原因を調べ、説明可能な特殊原因が除去された工程から基準を作る。Phase IIではその基準からの逸脱を監視する。管理内のランダムな上下動へ反射的に補正をかけない。

## 答え
1. 同一時点・同一条件の短期変動を群内へ集め、時間変化・ロット差・設備差など検出したい変化を群間へ出しやすくするのが合理的群分けである。群分けが悪いと異常変動を群内分散へ混ぜて管理限界を不必要に広げることがある。

2. Phase Iは基準を**作る**段階、Phase IIは基準で将来を**監視する**段階である。Phase Iでは中心線・管理限界自体が推定対象で、Phase IIでは原則として確立した基準に照らして信号を判定する。

3. 限界外点はまず原因調査の対象である。記録ミス、設備異常、原材料変更など説明可能な特殊原因が確認され、工程から除去・是正された場合に、その期間を基準データから除外して限界を再推定する。原因不明の点を機械的に消すと、都合のよい基準を作ってしまう。

4. 補正後の次回偏差は
$$
\boxed{\varepsilon_{t+1}-\varepsilon_t}
$$
であり、その分散は
$$
\boxed{2\sigma^2}.
$$
もともと分散 $\sigma^2$ の共通原因変動だったのに、前回の偶然誤差を設備へ持ち込むため変動が増える。これが過剰調整の典型的な機構である。

## 計算例
元工程の標準偏差が $\sigma=2$ なら、上の単純モデルで過剰調整後の標準偏差は
$$
\sqrt{2\sigma^2}=2\sqrt2\approx2.83
$$
まで増える。管理内の1点が平均より高かったというだけで次回設定を下げると、共通原因を特殊原因と誤認していることになる。

## 注意
管理限界外だから即座に「不良品」とは限らず、規格限界内だから工程が「管理状態」とも限らない。管理図は時間的安定性、規格は製品要求を扱う。

Phase Iで平均・分散を同じデータから推定するため、母数既知の理論的な3シグマ誤警報率と実際の誤警報率は完全には一致しない。自己相関が強い系列では通常の独立前提の管理図をそのまま使わない。

<!-- CARD -->

---
id: engqc-three-sigma-false-alarm
title: 3シグマ管理図の誤警報・シフト検出力・ARL・群サイズを通して解く
category: applied-engineering
subcategory: engineering-quality
topic: control-chart-detection-arl-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 管理図
  - 3シグマ
  - 誤警報
  - 検出力
  - ARL
  - 平均連長
  - 群サイズ
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
群平均を用いる両側3シグマ管理図を考える。管理状態では標準化統計量 $Z$ が各時点で独立に標準正規分布に従うとする。

1. 1点当たりの誤警報確率 $\alpha$ と管理内平均連長 $ARL_0$ を求めよ。
2. 工程平均が群平均の標準誤差の2倍だけ上方へ移動したとする。シフト後の標準化統計量は $N(2,1)$ に従う。1点当たり検出確率 $p_s$ と $ARL_1$ を求めよ。
3. 個々の観測の標準偏差を $\sigma$、工程平均の上方シフトを $\delta>0$、群サイズを $n$ とする。シフト後の標準化平均の平均 $\Delta$ を求めよ。
4. シフト量が $\delta=1.5\sigma$ のとき、シフト後平均そのものが上側3シグマ限界に達する最小群サイズを求めよ。この条件が「高い検出確率」を意味しない理由も説明せよ。

## 記号・用語
$ARL$（average run length、平均連長）は管理図が信号を出すまでの観測点数の期待値である。$ARL_0$ は管理状態、$ARL_1$ は工程変化後を表す。

1点ごとの信号確率が $p$ で時点間独立なら、信号までの点数は成功確率 $p$ の幾何分布に従い、平均は $1/p$ である。

## 使用公式・定理
管理状態の両側3シグマルールでは
$$
\alpha=P(|Z|>3)=2\{1-\Phi(3)\}.
$$
よって
$$
ARL_0=\frac1\alpha.
$$

上方へ標準誤差単位で $\Delta$ だけ平均シフトした場合は $Z\sim N(\Delta,1)$ なので
$$
p_s=P(Z>3)+P(Z<-3)
=1-\Phi(3-\Delta)+\Phi(-3-\Delta),
$$
$$
ARL_1=\frac1{p_s}.
$$

個体標準偏差が $\sigma$、群サイズが $n$ なら群平均の標準誤差は $\sigma/\sqrt n$ なので、絶対シフト $\delta$ は
$$
\Delta=\frac{\delta}{\sigma/\sqrt n}
=\frac{\delta\sqrt n}{\sigma}
$$
標準誤差単位に拡大される。

## 一手／方針
**「まず1点の信号確率を正規分布で求め、独立反復なら逆数をARLにする」。**

群サイズの効果は別公式として覚えず、標準誤差 $\sigma/\sqrt n$ が小さくなるため同じ絶対シフトが $\Delta=\delta\sqrt n/\sigma$ 倍に見える、と理解する。

## 答え
1.
$$
\alpha=2\{1-\Phi(3)\}\approx0.00270,
$$
したがって
$$
ARL_0\approx\frac1{0.00270}\approx\boxed{370}.
$$
1時間に1点なら、理論上は平均約370時間に1回の誤警報である。

2. $\Delta=2$ なので
$$
p_s=1-\Phi(1)+\Phi(-5)\approx0.1587,
$$
$$
ARL_1\approx\frac1{0.1587}\approx\boxed{6.30}.
$$
つまり平均約6.3群で信号が出る。

3.
$$
\boxed{\Delta=\frac{\delta\sqrt n}{\sigma}}.
$$
$n$ を4倍にすると、同じシフトは標準化尺度で2倍に見える。

4. シフト後平均が上側限界位置に来る条件は
$$
\delta=\frac{3\sigma}{\sqrt n}.
$$
$\delta=1.5\sigma$ を代入すると
$$
1.5=\frac3{\sqrt n},\qquad \sqrt n=2,
$$
よって最小は
$$
\boxed{n=4}.
$$
ただし平均がちょうど上側限界にあるなら、正規分布のばらつきのため上側へ出る確率はおよそ1/2にすぎない。これは所望検出確率を直接指定した設計ではない。

## 計算例
$\delta=\sigma$ の上方シフトを考えると、$n=1$ では $\Delta=1$、$n=4$ では $\Delta=2$、$n=9$ では $\Delta=3$ となる。群サイズを増やすほど小さな平均シフトを検出しやすくなる。

## 注意
$ARL=1/p$ は各時点の信号事象を独立で同じ確率とみなせる場合の結果である。自己相関、複数のランルール、Phase Iで推定した管理限界などがあると実際のARLは単純計算からずれる。

シフト量が「個体標準偏差 $\sigma$ の何倍」なのか「群平均の標準誤差の何倍」なのかを混同しない。

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
