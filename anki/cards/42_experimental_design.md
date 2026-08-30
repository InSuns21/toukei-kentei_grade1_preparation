---
id: design-fisher-three-principles
title: 実験単位を見抜きフィッシャーの3原則で計画を組み立てる
category: applied-common
subcategory: applied-design
topic: experimental-design-principles-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 実験計画法
  - フィッシャーの3原則
  - 無作為化
  - 反復
  - 局所管理
  - 実験単位
  - 擬似反復
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 無作為化・反復・局所管理
---

## 問題
製品の焼成温度が強度へ与える影響を調べる。低温・高温の2条件を比較し、各条件へ独立な炉運転を4回ずつ割り付ける。1回の炉運転では同じ温度で製品5個を同時に焼き、それぞれの強度を測る。

1. 応答、因子、実験単位、観測単位を答えよ。また各温度条件の独立な反復数はいくつか。
2. フィッシャーの3原則である無作為化・反復・局所管理を挙げ、この実験でそれぞれ何のために行うか説明せよ。
3. 炉内の製品5個を独立な反復5個として解析してはいけない理由を説明せよ。
4. 日ごとに炉の状態が変わり、日差が強度へ影響すると事前に分かっている。局所管理をどう実施するとよいか。
5. 無作為化を行えば有限標本でも背景因子が必ず完全一致すると言えるか。

## 記号・用語
- **応答**：実験で測定する結果。この例では製品強度。
- **因子**：実験者が操作・比較する条件。この例では焼成温度。
- **実験単位**：処置を独立に割り付けられる最小単位。
- **観測単位**：実際に応答を測定する単位。

実験単位と観測単位は一致するとは限らない。同じ処置割付を共有する複数観測を、独立な実験単位として数える誤りを**擬似反復**という。

フィッシャーの3原則は、**無作為化・反復・局所管理**である。局所管理の代表例がブロック化である。

## 使用公式・定理
真の反復数は測定回数ではなく、**処置を独立に割り付けられた実験単位数**で数える。

無作為化では、処置ラベルを実験単位へ確率的に割り付けることで、割付前の既知・未知の背景因子と処置との系統的な結び付きを避ける。これにより無作為化に基づく標本変動の評価が可能になる。

反復は独立な実験単位を複数用意することで誤差分散を推定可能にし、一般に処置差推定の精度を高める。独立・同分散な反復を増やす単純な状況では、平均の標準誤差は反復数 $r$ に対して概ね
$$
\frac{1}{\sqrt r}
$$
の割合で小さくなる。

局所管理では、処置とは無関係だが応答へ影響する既知の異質性で実験単位をブロック化し、**ブロック内で無作為化**する。説明可能なブロック間変動を誤差から分離できれば、処置比較の精度が上がる。

## 一手／方針
**実験計画問題では、最初に「何を測るか・何を変えるか・どこへ独立に処置を割り付けられるか」を決める。** その後で3原則を当てはめる。

1. 応答と因子を特定する。
2. 処置割付の最小単位から実験単位を決める。
3. 観測数と独立反復数を分ける。
4. 実験単位間で処置を無作為化する。
5. 独立な実験単位を反復する。
6. 既知の大きな異質性があれば、処置割付前の情報でブロック化し、その中で無作為化する。

「データが何個あるか」より先に「処置を何回独立に割り付けたか」を見るのが擬似反復を避ける要点である。

## 答え
1. 応答は**製品強度**、因子は**焼成温度**である。1回の炉運転に含まれる5個は同じ温度割付を共有するので、実験単位は**炉の1回の運転**、観測単位は**各製品**である。したがって各温度の独立な反復数は
$$
\boxed{4}
$$
であり、製品数20を独立反復数とはしない。

2. **無作為化**は炉運転への温度割付と背景条件の系統的な結び付きを避け、確率的な誤差評価を正当化する。**反復**は各温度を複数の独立な炉運転へ割り付け、炉運転間の誤差を推定して処置比較の精度を上げる。**局所管理**は日など既知の異質性をブロックとして取り出し、そのブロック内で温度を比較することで不要な変動を誤差から除く。

3. 同じ炉運転の5個は温度だけでなく炉内環境も共有するため、条件付きに相関し得る。5個を独立な処置反復とみなすと、本当は1回しかない温度割付を5回行ったかのように誤差自由度を水増しし、標準誤差を過小評価する。これが擬似反復である。

4. 例えば同じ日に低温・高温の炉運転を含められるなら、**日をブロックとし、各日内で温度の実施順を無作為化する。** 日差をブロック効果として分離することで、温度比較に使う残差変動を小さくできる。

5. 言えない。無作為化は背景因子を**平均的・確率的に均衡させる仕組み**であり、有限標本で全ての既知・未知共変量が完全一致することを保証しない。ただし意図的・系統的な交絡を避け、割付機構に基づく推論を可能にする。

## 計算例
この実験では各温度について4回の炉運転、各運転5製品なので、測定値は各温度20個ある。しかし処置の独立反復は4である。

対して、8回の炉運転を用意し、4回ずつ低温・高温へ無作為割付すれば、独立な実験単位は合計8となる。同じ総測定数40でも、1回の炉運転から40個測る設計とは処置効果を識別する情報量が全く異なる。

動物実験でも、1匹から3枚の組織切片を測れば観測値は3個だが処置反復は1である。複数個体へ独立に処置を割り付けることが真の反復になる。

## 注意
**技術的反復**は同じ実験単位を複数回測定して測定誤差を減らすのには有用だが、処置効果に対する独立な誤差自由度を増やさない。

ブロック化に使う変数は原則として処置割付前に決まっている背景要因を用いる。処置によって変化した事後変数でブロックを作ると、処置効果の解釈を壊し得る。

階層モデルで群内相関を表現しても、例えば処置ごとに水槽1個しかなければ処置効果と水槽効果を分離できない。解析法だけで真の反復不足を補うことはできない。

分割法では無作為化が複数段階に分かれ、効果ごとに実験単位と誤差層が異なる。これは別カードで扱う。

<!-- CARD -->

---
id: design-interaction-plot
title: 交互作用プロットを判定する
category: applied-common
subcategory: applied-design
topic: interaction-plot
type: recognition
difficulty: 2
priority: B
hashtags: [交互作用, プロファイルプロット, 二元配置法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 主効果と交互作用 }]
---

## 問題
2因子実験で、横軸を因子A、線を因子Bの各水準とする交互作用プロットを考える。

1. 線が平行・非平行・交差する場合をどう解釈するか。
2. セル平均を $(\mu_{11},\mu_{12},\mu_{21},\mu_{22})=(10,14,12,20)$ とする。第1添字を因子A、第2添字を因子Bの水準とするとき、交互作用を表す「差の差」を求めよ。

## 使用公式・定理
2水準×2水準の場合、Aの単純効果がB水準でどれだけ変わるかは
$$
\Delta_{AB}
=(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11})
$$
で測れる。これは「A効果の差」であり、同値に「B効果の差」として計算しても符号規約を揃えれば同じ交互作用を表す。

加法モデル
$$
\mu_{ij}=\mu+\alpha_i+\beta_j
$$
なら母集団で $\Delta_{AB}=0$ になる。

## 答え
平行なら交互作用なし、非平行なら交互作用が示唆され、交差は効果の向きまで逆転する強い非加法性を示す。

数値例の差の差は
$$
\Delta_{AB}=4.
$$

## 計算例
Bが水準1のときのA効果は
$$
\mu_{21}-\mu_{11}
=12-10
=2.
$$
Bが水準2のときのA効果は
$$
\mu_{22}-\mu_{12}
=20-14
=6.
$$
したがって差の差は
$$
\begin{aligned}
\Delta_{AB}
&=6-2\\
&=4.
\end{aligned}
$$
Aの効果がBの水準によって2から6へ変わっているので、セル平均は加法的ではない。

## 一手／方針
交互作用は「Aの効果がBの水準によって変わるか」を見る。図なら線の傾きが同じか、数値なら **単純効果を2本計算してから差を取る**。

## 注意
標本セル平均から得た差の差が0でないだけで、母集団の交互作用が統計的に有意とは断定できない。反復データがあるなら交互作用平方和・F検定や区間推定で標本変動も評価する。

<!-- CARD -->

---
id: design-random-oneway-components
title: 変量一元配置の分散成分を推定する
category: applied-common
subcategory: applied-design
topic: random-oneway-variance-components
type: calc_step
difficulty: 4
priority: B
hashtags: [変量効果, 分散成分, 平均平方]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固定効果・変量効果 }]
---

## 問題
各水準r反復の変量一元配置モデル $Y_{ij}=\mu+A_i+\varepsilon_{ij}$ で、$MS_A=14$、$MS_E=2$、$r=4$ を得た。水準間分散 $\tau^2$ と誤差分散 $\sigma^2$ を推定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$A_i$ は独立に正規分布 $N(0,\tau^2)$、$\varepsilon_{ij}$ は独立に正規分布 $N(0,\sigma^2)$ に従い、両者も独立とする。

## 答え
$$E[MS_A]=\sigma^2+r\tau^2,\qquad E[MS_E]=\sigma^2.$$
よって
$$\widehat{\sigma^2}=MS_E=2,\qquad
\widehat{\tau^2}=\frac{MS_A-MS_E}{r}=\frac{14-2}{4}=3.$$

## 計算例
$\widehat{\tau^2}/(\widehat{\tau^2}+\widehat{\sigma^2})=3/5$ は同一水準内の相関の推定値。

## 注意
$MS_A<MS_E$ ならモーメント推定値は負になるため、実務では0へ制約する方法もある。

<!-- CARD -->

---
id: design-random-intercept-covariance
title: 変量効果が群内相関を生むことを示す
category: applied-common
subcategory: applied-design
topic: random-effect-covariance
type: calc_step
difficulty: 4
priority: B
hashtags: [変量効果, 群内相関, 分散成分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固定効果・変量効果 }]
---

## 問題
$Y_{ij}=\mu+U_i+\varepsilon_{ij}$、$E[U_i]=0$、$\operatorname{Var}(U_i)=\tau^2$、$\operatorname{Var}(\varepsilon_{ij})=\sigma^2$、全て独立とする。同群内2観測の共分散と相関を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同じ群の観測は共通変量効果 $U_i$ を共有する。

## 答え
$$\operatorname{Cov}(Y_{ij},Y_{ik})
=\operatorname{Var}(U_i)=\tau^2\quad(j\ne k),$$
$$\rho=\frac{\tau^2}{\tau^2+\sigma^2}.$$

## 計算例
$\tau^2=1,\sigma^2=3$ なら群内相関は0.25。

## 注意
異なる群の観測はこのモデルでは共分散0。

<!-- CARD -->

---
id: design-two-level-effect-contrast
title: 2水準要因計画を符号化から効果・平方和まで解く
category: applied-common
subcategory: applied-design
topic: two-level-factorial-effect-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - 2水準要因計画
  - 符号化
  - コントラスト
  - 主効果
  - 交互作用
  - 平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 2水準要因計画
---

## 問題
$2^k$ 完全要因計画で各因子の低水準を $-1$、高水準を $+1$ と符号化する。
1. 主効果列と交互作用列の作り方を説明し、効果列 $x_j\in\{-1,+1\}$ とセル平均 $\bar y_j$ から効果推定値を導け。
2. $2^3$ 計画のセル平均が
$$
(1,a,b,ab,c,ac,bc,abc)=(10,14,12,18,8,16,10,22)
$$
のとき、A効果とAB効果を求めよ。
3. 各セルを $r$ 回反復するとき、セル平均から作った効果コントラスト $C$ の平方和を求める公式を示せ。上の $2^3$ 計画を $r=2$ 回反復したときの $SS_A,SS_{AB}$ も求めよ。

## 記号・用語
2水準完全要因計画では各因子列を $-1,+1$ で表す。AB交互作用列は各実験点で $x_Ax_B$、ABC列は $x_Ax_Bx_C$ と、対応する因子列の積で作る。効果は「高水準側平均−低水準側平均」であり、回帰モデルを $\beta_0+\beta_Ax_A+\cdots$ と書く規約では通常 $\beta_A$ はA効果の半分である。

## 使用公式・定理
効果列の符号を $x_j$ とすると、セル平均から作るコントラストは
$$
C=\sum_{j=1}^{2^k}x_j\bar y_j.
$$
$+1$ 側と $-1$ 側にはそれぞれ $2^{k-1}$ セルがあるので
$$
\widehat{\mathrm{effect}}
=\frac{\sum_{x_j=+1}\bar y_j}{2^{k-1}}
-\frac{\sum_{x_j=-1}\bar y_j}{2^{k-1}}
=\frac{C}{2^{k-1}}.
$$
各セルを同じ回数 $r$ だけ反復し、$C$ をセル平均で作るなら、その1自由度効果の平方和は
$$
SS=\frac{rC^2}{2^k}
=r2^{k-2}\,\widehat{\mathrm{effect}}^{\,2}.
$$

## 一手／方針
**「効果を求めよ」と言われたら、対象効果の±1列をまず作り、その列でセル平均に符号を付けて足す。最後に $2^{k-1}$ で割る。平方和まで必要なら同じコントラストをそのまま $rC^2/2^k$ に入れる。** 符号化・効果公式・平方和公式を別々に暗記しない。

## 答え
1. 主効果列は各因子の $-1,+1$ 符号、交互作用列は対応列の積で作る。上の導出より
$$
\widehat{\mathrm{effect}}=\frac{C}{2^{k-1}}.
$$

2. A列で $+1$ となるセルは $a,ab,ac,abc$、$-1$ は $1,b,c,bc$ なので
$$
C_A=(14+18+16+22)-(10+12+8+10)=30,
$$
$$
\widehat A=\frac{30}{4}=7.5.
$$
AB列で $+1$ となるセルは $1,ab,c,abc$ なので
$$
C_{AB}=(10+18+8+22)-(14+12+16+10)=6,
$$
$$
\widehat{AB}=\frac{6}{4}=1.5.
$$

3. $r=2,k=3$ だから
$$
SS_A=\frac{2\cdot30^2}{8}=225,
$$
$$
SS_{AB}=\frac{2\cdot6^2}{8}=9.
$$

## 計算例
$2^2$ 計画でセル平均が $(1,a,b,ab)=(10,14,12,18)$、各セル $r=2$ 回反復なら
$$
C_A=-10+14-12+18=10,
$$
$$
\widehat A=10/2=5,
$$
$$
SS_A=\frac{2\cdot10^2}{4}=50.
$$
同じコントラストから効果と平方和を連続して計算できる。

## 注意
この平方和公式は**各セルの反復数が等しく、$C$ をセル平均から作った場合**の式である。生データの合計からコントラストを作る規約では分母が変わる。不均衡計画では直交性が崩れるため、この単純な平方和分解をそのまま使わず一般線形モデルとして扱う。

<!-- CARD -->

---
id: design-block-confounding
title: ブロック化で高次交互作用を交絡させる
category: applied-common
subcategory: applied-design
topic: block-confounding
type: recognition
difficulty: 4
priority: B
hashtags: [交絡, ブロック化, 要因実験]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交絡 }]
---

## 問題
$2^3$ 計画を各4点の2ブロックへ分けるため、ABC符号でブロックを作った。何が交絡するか。

## 記号・用語
- 交絡：実験計画上、複数の効果が同じコントラストに対応して分離できない状態

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同じ計画行列の列をもつ効果は完全交絡する。

## 答え
ブロック指標がABC列と同一なので、ブロック効果とABC交互作用を分離できない。ABCを無視できると仮定して主効果・低次交互作用を推定する。

## 計算例
ABC=+1の4点を一方、−1の4点を他方のブロックへ置く。

## 注意
重要と考える主効果や2因子交互作用をブロックと交絡させない。

<!-- CARD -->

---
id: design-fraction-generator
title: 生成子から一部実施計画・定義対比群・実験点数まで構成する
category: applied-common
subcategory: applied-design
topic: fractional-factorial-construction-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - 一部実施要因計画
  - 生成式
  - 定義関係
  - 実験点数
  - 2水準要因計画
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 部分実施要因計画
---

## 問題
2水準一部実施要因計画について次を解け。
1. $2^{3-1}$ 計画で生成式 $C=AB$ を使う。A,Bの符号を $(--),(+-),(-+),(++)$ としたときC列と採用する4実施を書き、定義関係も求めよ。
2. $2^{5-2}$ 計画で独立生成式 $D=AB,E=AC$ を使う。実験点数と完全な定義対比群を求めよ。
3. 6因子の完全要因計画と $2^{6-2}$ 計画の実験点数を比較せよ。

## 記号・用語
$2^{k-p}$ 計画は、$k$ 個の2水準因子に対し $p$ 個の独立生成子を課した $1/2^p$ 実施計画である。$I$ は全行で $+1$ となる恒等列。生成式を $I=$ の形へ直した語と、それらの積全体を定義対比群と呼ぶ。

## 使用公式・定理
±1符号では同じ列を掛けると $A^2=B^2=\cdots=I$ である。したがって例えば
$$
C=AB\quad\Longleftrightarrow\quad I=ABC.
$$
$p$ 個の独立生成子なら実験点数は
$$
2^{k-p},
$$
定義対比群の語数は恒等語を含めて $2^p$ 個である。複数生成子では各定義語だけでなく、それら同士の積も必ず含める。

## 一手／方針
**生成子を見たら「列を作る → $I=$ へ直す → 独立生成子同士を全て掛ける → 点数を $2^{k-p}$ で確認する」の順に処理する。** 実験表・定義関係・点数を別暗記しない。

## 答え
1. $C=AB$ なので
$$
C=(+,-,-,+).
$$
採用実施は
$$
(--+),(+--),(-+-),(+++).
$$
両辺へCを掛けると
$$
I=ABC.
$$

2. 実験点数は
$$
2^{5-2}=8.
$$
$D=AB$ から $I=ABD$、$E=AC$ から $I=ACE$。さらに
$$
(ABD)(ACE)=BCDE
$$
なので
$$
I=ABD=ACE=BCDE.
$$

3. 完全計画は
$$
2^6=64
$$
点、$1/4$ 実施は
$$
2^{6-2}=16
$$
点なので、48点、すなわち75%を削減する。

## 計算例
$2^{4-1}$ で $D=ABC$ なら $I=ABCD$ で、実験点数は8点である。反対の符号 $D=-ABC$ を選べば補完する別の半実施になる。

## 注意
生成子は独立でなければならない。実験点削減の代償として効果間の別名関係が生じるため、構成後は必ず定義対比群から別名構造と解像度を確認する。

<!-- CARD -->

---
id: design-alias-structure
title: 定義対比群から別名構造・解像度・推定可能性を判定する
category: applied-common
subcategory: applied-design
topic: alias-resolution-estimability-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - 一部実施要因計画
  - 別名構造
  - 解像度
  - 交絡
  - 定義関係
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡
---

## 問題
一部実施要因計画の定義対比群を用いて次を解け。
1. $I=ABC$ の $2^{3-1}$ 計画で、AとABの別名相手を求めよ。
2. $I=ABCD$ の半実施で3因子以上の交互作用を無視するとき、A、AB、ACのうち単独で推定できるものを判定せよ。
3. 解像度III、IV、Vで、主効果と2因子交互作用が何と別名になるかを述べよ。
4. 定義語が計画1では $ABD,ACE,BCDE$、計画2では $ABCD,ABCE,DE$ である。各計画の解像度を求め、主効果推定により適する方を選べ。

## 記号・用語
別名（alias）とは、計画上同じ符号列を持つためデータだけでは分離できない効果の組をいう。解像度（resolution）は定義対比群に含まれる非恒等語の最短文字数であり、短いほど低次効果同士の交絡が強い。

## 使用公式・定理
効果 $E$ の別名群は、$E$ に定義対比群の各語を掛けて得る。±1符号なので同じ文字が2回現れれば消える。

解像度の基本的な読み方は次の通り。
- III：主効果と2因子交互作用が別名になり得る。
- IV：主効果は2因子交互作用とは別名にならないが、2因子交互作用同士は別名になり得る。
- V：主効果は4因子以上、2因子交互作用は3因子以上とのみ別名になる。

## 一手／方針
**まず対象効果へ定義語を掛けて別名相手を具体的に出す。次に最短定義語長から解像度を読み、最後に「無視してよい高次効果か」を使って推定可能性を判断する。** 解像度だけを暗記して終えない。

## 答え
1. $I=ABC$ なので
$$
A=A(ABC)=BC,
$$
$$
AB=AB(ABC)=C.
$$
よって $A\leftrightarrow BC$、$AB\leftrightarrow C$。

2. $I=ABCD$ から
$$
A\leftrightarrow BCD,\qquad
AB\leftrightarrow CD,\qquad
AC\leftrightarrow BD.
$$
3因子以上を無視する仮定ではAは単独推定できる。一方ABとACは別の2因子交互作用と混ざるので単独推定できない。

3. IIIでは主効果と2因子交互作用が交絡し得る。IVでは主効果は2因子交互作用から分離されるが2因子交互作用同士が交絡し得る。Vでは主効果と2因子交互作用を互いに分離できる。

4. 計画1の最短語長は3なので解像度III。計画2には長さ2の $DE$ があるので解像度II。主効果同士の交絡を避ける観点では計画1を選ぶ。

## 計算例
同じ解像度の候補同士なら、最短語長の語が少ない方を優先する最小アベレーションの考え方を使う。例えば解像度III同士なら長さ3の定義語数をまず比較する。

## 注意
「高次交互作用は無視できる」は効果の疎性に基づく仮定であり、データだけから常に保証されるわけではない。また別名の等号は真の効果値が等しいという意味ではなく、推定に使う列が同じという意味である。

<!-- CARD -->

---
id: design-orthogonal-array-basic
title: 直交表を均衡・割付・効果・交絡まで一続きで読む
category: applied-common
subcategory: applied-design
topic: orthogonal-array-workflow-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 直交表
  - 直交性
  - L4直交表
  - 因子割付
  - 交互作用
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表の基本
---

## 問題
2水準直交表について次を解け。
1. 任意の1列と任意の2列に必要な均衡条件を述べ、$A=(-1,-1,+1,+1)$、$B=(-1,+1,-1,+1)$ が直交することを確かめよ。
2. L4直交表で列1=A、列2=Bとし、列3を列1×列2で作れ。列3へCを割り付けたとき、どの効果が識別不能になるか。
3. 同じL4計画でAの低水準の応答が8,10、高水準が13,15ならA効果を求めよ。
4. L8直交表が7本の2水準列を持つとき、A,B,C,AB,ACを割り付けた場合の使用自由度と残り自由度を求めよ。
5. バランスした直交計画で各効果の平方和を分離しやすい理由を計画行列から説明せよ。

## 記号・用語
2水準直交表では各列を $-1,+1$ で表す。異なる効果列 $\boldsymbol x_j,\boldsymbol x_k$ が
$$
\boldsymbol x_j^{\mathsf T}\boldsymbol x_k=0
$$
を満たすとき直交する。同じ列へ割り付けられた効果はデータだけでは分離できず、別名（alias）になる。

## 使用公式・定理
2水準直交表の基本条件は、各列で $-1,+1$ が同数現れ、任意の2列で
$$
(--),(-+),(+-),(++)
$$
が同数ずつ現れることである。したがって各列の和は0、異なる列の内積も0になる。

交互作用列は対応する列の符号積で作る。2水準因子または2因子交互作用は各1自由度を使い、$N$ 実施の全自由度は $N-1$。2水準因子効果は
$$
\text{高水準平均}-\text{低水準平均}
$$
で求める。

切片を含む計画行列を $\boldsymbol X$ とすると、直交計画では $\boldsymbol X^{\mathsf T}\boldsymbol X$ の効果間の非対角成分が0となる。

## 一手／方針
**直交表を見たら「均衡を確認 → 列積で交互作用列を確認 → 重要効果が同じ列へ載っていないか確認 → 水準平均差で効果を出す → 自由度を数える」の順に処理する。** 「列が何本あるか」だけで割付を決めない。

## 答え
1. 各列で $-1,+1$ が同数、任意の2列では4種類の水準組合せが同数ずつ必要である。数値例では
$$
A^{\mathsf T}B
=(+1)+(-1)+(-1)+(+1)=0,
$$
よってA,Bは直交する。

2. 列3は
$$
AB=(+1,-1,-1,+1).
$$
ここへCを割り付けると、C主効果とAB交互作用が同じ列になり、両者は識別不能である。

3. 低水準平均は $(8+10)/2=9$、高水準平均は $(13+15)/2=14$ だから
$$
\widehat{\text{A効果}}=14-9=5.
$$

4. L8の全自由度は $8-1=7$。A,B,C,AB,ACで5自由度を使うので、残りは2自由度である。

5. 直交により $\boldsymbol X^{\mathsf T}\boldsymbol X$ の効果間交差項が0となるため、各係数の正規方程式が分離し、効果ごとの平方和を加法的に分けやすい。

## 計算例
L4で列1=A、列2=B、列3=ABとして使えば、AとBの主効果をABから分けて推定できる。一方、列3へ別の主効果Cも割り付ければ観測される列3効果はCとABの混合になる。交互作用を無視するならC効果として扱えるが、それは設計から自動的に保証されるわけではない。

## 注意
欠測や不均衡があると元の列の直交性は崩れ得る。その場合、元の直交公式を機械的に使わず、残った計画行列で回帰する。また未使用列を誤差へ回しても、それが独立反復に基づく純粋誤差とは限らない。

<!-- CARD -->

---
id: design-power-determinants
title: 実験の検出力を左右する要因を答える
category: applied-common
subcategory: applied-design
topic: power-determinants
type: recognition
difficulty: 2
priority: A
hashtags: [検出力, 標本サイズ, 効果量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力と標本サイズの考え方 }]
---

## 問題
有意水準を固定したとき、処置効果検定の検出力を高める代表的要因を4つ挙げよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検出力は対立仮説下で帰無仮説を棄却する確率 $1-\beta$。

## 答え
標本サイズを増やす、検出対象の効果が大きい、誤差分散を小さくする、片側仮説が科学的に正当なら片側検定を用いる。ブロック化や精密測定は誤差分散を減らす。

## 計算例
同じ効果なら標準誤差を半分にすると非心度が2倍。

## 注意
データ観測後に片側検定へ変更しない。

<!-- CARD -->

---
id: design-two-sample-size
title: 2群平均差の必要標本数を計算する
category: applied-common
subcategory: applied-design
topic: two-sample-power
type: calc_step
difficulty: 3
priority: A
hashtags: [検出力, 標本サイズ, 2群比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力と標本サイズの考え方 }]
---

## 問題
等分散 $\sigma^2$ の独立2群へ同数nずつ割り付け、両側有意水準 $\alpha$、検出力 $1-\beta$ で平均差 $\delta$ を検出する正規近似標本数を書け。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対立仮説下の標準化平均差が棄却境界を越える条件。

## 答え
平均差の標準誤差は $\sigma\sqrt{2/n}$ なので
$$n\approx
\frac{2\sigma^2(z_{1-\alpha/2}+z_{1-\beta})^2}{\delta^2}.$$
各群について右辺を切り上げる。

## 計算例
$\alpha=0.05,\ 1-\beta=0.8$ なら $z_{0.975}+z_{0.8}\approx1.96+0.84=2.80$。

## 注意
脱落率を見込む場合は必要解析数を回収率で割る。

<!-- CARD -->

---
id: design-paired-sample-size
title: 対応設計の必要標本数を書く
category: applied-common
subcategory: applied-design
topic: paired-power
type: formula
difficulty: 3
priority: B
hashtags: [検出力, 対応のある比較, 標本サイズ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力と標本サイズの考え方 }]
---

## 問題
対応差Dの標準偏差を $\sigma_D$ とし、平均差 $\delta$ を両側有意水準 $\alpha$、検出力 $1-\beta$ で検出する組数nの正規近似式を書け。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対応差平均の標準誤差は $\sigma_D/\sqrt n$。

## 答え
$$n\approx
\frac{\sigma_D^2(z_{1-\alpha/2}+z_{1-\beta})^2}{\delta^2}.$$

## 計算例
組内相関が正なら $\sigma_D^2=\sigma_1^2+\sigma_0^2-2\rho\sigma_1\sigma_0$ が小さくなり得る。

## 注意
nは観測数2nでなくペア数。

<!-- CARD -->

---
id: design-anova-effect-size-power
title: 一元配置の効果量と非心度を書く
category: applied-common
subcategory: applied-design
topic: anova-power
type: formula
difficulty: 4
priority: B
hashtags: [検出力, 一元配置法, 効果量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力と標本サイズの考え方 }]
---

## 問題
a群の母平均を $\mu_i$、割付比を $p_i$、全平均を $\mu_\cdot=\sum_ip_i\mu_i$、共通誤差分散を $\sigma^2$ とする。Cohenの効果量fと非心度を書け。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検出力は非心F分布 $F_{a-1,N-a}(\lambda)$ が臨界値を越える確率。

## 答え
$$f^2=\frac{\sum_{i=1}^ap_i(\mu_i-\mu_\cdot)^2}{\sigma^2}.$$
総標本数をNとすると、近似的に対立仮説下のF分布の非心度は
$$\lambda=Nf^2.$$

## 計算例
平均差が大きい、誤差分散が小さい、Nが大きいほど非心度が増える。

## 注意
計画時には科学的に意味のある平均配置を置く。

<!-- CARD -->

---
id: design-split-plot-error-strata
title: 分割法で2種類の誤差を使い分ける
category: applied-common
subcategory: applied-design
topic: split-plot
type: recognition
difficulty: 4
priority: B
hashtags: [実験計画, 分割法, 実験単位]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験単位と観測単位 }]
---

## 問題
主区因子Aを大区画へ割り付け、その各大区画内の小区画へ因子Bを割り付ける分割法で、AとBの検定誤差を区別せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

無作為化段階ごとに異なる実験単位と誤差層が生じる。

## 答え
Aは大区画間でしか無作為化されないため主区誤差を分母に使う。BとA×Bは小区画レベルで無作為化されるため小区誤差を分母に使う。

## 計算例
変更困難な温度を主区、変更容易な触媒を小区へ割り付ける。

## 注意
全効果を同じ残差平均平方で検定しない。

<!-- CARD -->

---
id: design-rcbd-missing-value
title: 乱塊法の欠測値を加法モデルで補う
category: applied-common
subcategory: applied-design
topic: randomized-block-missing-value
type: calc_step
difficulty: 4
priority: B
hashtags: [乱塊法, 欠測値, 加法モデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱塊法 }]
---

## 問題
a処置、bブロックの乱塊法で1観測が欠測した。欠測セルを除く処置合計を $T_i'$、ブロック合計を $B_j'$、総合計を $G'$ とする。$a=3,b=4,T_i'=18,B_j'=14,G'=66$ のとき欠測値を推定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

欠測セルの当てはめ値が「処置平均＋ブロック平均－総平均」を満たす正規方程式をxについて解く。

## 答え
加法モデルによる最小二乗補完値は
$$\widehat x=\frac{aT_i'+bB_j'-G'}{(a-1)(b-1)}.$$
したがって
$$\widehat x
=\frac{3\cdot18+4\cdot14-66}{(3-1)(4-1)}
=\frac{44}{6}=\frac{22}{3}.$$

## 計算例
$\widehat x\approx7.33$ を補って平方和を計算する。

## 注意
補完しても情報は増えないため、誤差自由度を1減らす。

<!-- CARD -->

---
id: design-randomization-purpose
title: 無作為化が推論を支える理由を説明する
category: applied-common
subcategory: applied-design
topic: randomization
type: recognition
difficulty: 3
priority: B
hashtags: [フィッシャーの3原則, 無作為化, 交絡]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 無作為化・反復・局所管理 }]
---

## 問題
処置の無作為割付が、観測された交絡因子だけでなく未観測交絡にも有効な理由を述べよ。

## 記号・用語
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

完全無作為化では固定された潜在結果に対し、処置ラベルだけが無作為。

## 答え
割付前の実験単位特性と処置割付を確率的に独立にするため、処置群間の背景差が平均的に均衡する。割付機構そのものから帰無分布と標準誤差を評価できる。

## 計算例
大標本では年齢、重症度、未知の予後因子も群間で均衡しやすい。

## 注意
無作為化は有限標本で全共変量の完全一致を保証しない。

<!-- CARD -->

---
id: design-replication-purpose
title: 真の反復と技術的反復を区別する
category: applied-common
subcategory: applied-design
topic: replication
type: recognition
difficulty: 2
priority: B
hashtags: [フィッシャーの3原則, 反復, 実験単位]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 無作為化・反復・局所管理 }]
---

## 問題
真の反復と、同じ実験単位を複数回測る技術的反復を区別せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

解析上の標本数は観測数でなく独立に無作為化された実験単位数で決まる。

## 答え
真の反復は処置を独立な複数の実験単位へ割り付ける。技術的反復は一つの実験単位から複数測定を得て測定誤差を減らすが、処置効果の独立な誤差自由度は増やさない。

## 計算例
1匹の動物から3組織切片を測るのは処置反復1、測定反復3。

## 注意
技術的反復を独立標本として扱うと擬似反復になる。

<!-- CARD -->

---
id: design-local-control
title: 局所管理で誤差を減らす仕組みを説明する
category: applied-common
subcategory: applied-design
topic: local-control
type: recognition
difficulty: 3
priority: B
hashtags: [フィッシャーの3原則, 局所管理, ブロック化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化の意味 }]
---

## 問題
処置と無関係だが応答に影響する因子Zが既知のとき、局所管理をどう行い、何が改善するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

乱塊法では全変動を処置・ブロック・誤差へ分解する。

## 答え
Zが近い実験単位を同じブロックにまとめ、各ブロック内で処置を無作為化する。ブロック間変動を誤差平方和から分離し、処置差の誤差分散を小さくする。

## 計算例
患者を施設または重症度でブロック化して治療を割り付ける。

## 注意
処置後に決まる変数でブロック化しない。

<!-- CARD -->

---
id: design-experimental-observational-unit
title: 実験単位と観測単位を判別する
category: applied-common
subcategory: applied-design
topic: experimental-unit
type: recognition
difficulty: 3
priority: B
hashtags: [実験単位, 観測単位, 無作為割付]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験単位と観測単位 }]
---

## 問題
実験単位と観測単位を、無作為割付との関係で定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

処置割付が共有される観測は条件付きに相関し得る。

## 答え
実験単位は処置を独立に割り付けられる最小単位。観測単位は実際に応答を測定する単位。両者が異なる場合、誤差自由度と解析単位は実験単位に基づける。

## 計算例
教室単位で教材を割り付け、生徒得点を測ると、実験単位は教室、観測単位は生徒。

## 注意
観測数をそのまま処置の反復数としない。

<!-- CARD -->

---
id: design-pseudoreplication
title: 擬似反復による標準誤差過小評価を判定する
category: applied-common
subcategory: applied-design
topic: pseudoreplication
type: recognition
difficulty: 3
priority: B
hashtags: [実験単位, 擬似反復, クラスタ相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験単位と観測単位 }]
---

## 問題
処置群ごとに水槽1個だけを用意し、各水槽から魚10匹を測った。魚を独立な処置反復として比較できない理由を述べよ。

## 記号・用語
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同一実験単位内の観測には共通ランダム効果による相関がある。

## 答え
処置は水槽へ割り付けられ、魚は水槽環境を共有する。処置効果と水槽効果が交絡し、独立な処置反復は各群1しかない。魚10匹を独立扱いすると誤差自由度を水増しする。

## 計算例
複数水槽を各処置へ無作為割付する必要がある。

## 注意
階層モデルを使っても処置ごとに実験単位1では処置と単位効果を分離できない。

<!-- CARD -->

---
id: design-crd-allocation-count
title: 完全無作為化法の割付数を数える
category: applied-common
subcategory: applied-design
topic: completely-randomized-design
type: calc_step
difficulty: 2
priority: B
hashtags: [完全無作為化法, 割付, 組合せ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 完全無作為化法 }]
---

## 問題
合計n単位を処置1へ $n_1$、処置2へ $n_2=n-n_1$ 割り付ける完全無作為化法で、可能な割付数を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

処置1の単位集合をn単位から選べば処置2は自動的に決まる。

## 答え
$$\binom n{n_1}=\frac{n!}{n_1!n_2!}.$$
全割付を等確率で選ぶ。

## 計算例
$n=6,n_1=n_2=3$ なら20通り。

## 注意
処置人数を固定する完全無作為化と、各単位を独立なコインで割り付ける方法を区別する。

<!-- CARD -->

---
id: design-crd-difference-means
title: 完全無作為化法の処置差を推定する
category: applied-common
subcategory: applied-design
topic: crd-treatment-effect
type: calc_step
difficulty: 3
priority: B
hashtags: [完全無作為化法, 平均差, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 完全無作為化法 }]
---

## 問題
独立な2処置群の平均が $(\bar y_1,\bar y_0)=(12,9)$、標本分散が $(s_1^2,s_0^2)=(4,9)$、標本数が $(n_1,n_0)=(10,15)$。平均処置差とWelch型標準誤差を求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立な標本平均差の分散は各平均分散の和。

## 答え
$$\widehat\tau=\bar y_1-\bar y_0=3,$$
$$\widehat{\operatorname{SE}}(\widehat\tau)
=\sqrt{\frac{s_1^2}{n_1}+\frac{s_0^2}{n_0}}
=\sqrt{0.4+0.6}=1.$$

## 計算例
標準化統計量は3。

## 注意
無作為化検定なら割付機構による帰無分布を使える。

<!-- CARD -->

---
id: design-blocking-paired-variance
title: ブロック化が差の分散を減らす条件を示す
category: applied-common
subcategory: applied-design
topic: blocking-efficiency
type: calc_step
difficulty: 4
priority: B
hashtags: [ブロック化, 対応のある比較, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化の意味 }]
---

## 問題
ブロック内の2処置応答を $(Y_{1j},Y_{0j})$、各分散を $\sigma^2$、相関を $\rho$ とする。差 $D_j=Y_{1j}-Y_{0j}$ の分散を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(X-Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)-2\operatorname{Cov}(X,Y)$。

## 答え
$$\operatorname{Var}(D_j)
=\sigma^2+\sigma^2-2\rho\sigma^2
=2\sigma^2(1-\rho).$$

## 計算例
$\rho=0.8$ なら差の分散は $0.4\sigma^2$。

## 注意
ブロック内相関が低い因子で無理に組むと効率改善は小さい。

<!-- CARD -->

---
id: design-rcbd-relative-efficiency
title: 乱塊法の完全無作為化法に対する効率を計算する
category: applied-common
subcategory: applied-design
topic: randomized-block-relative-efficiency
type: calc_step
difficulty: 4
priority: B
hashtags: [乱塊法, 完全無作為化法, 相対効率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱塊法 }]
---

## 問題
$a=3$ 処置、$b=4$ ブロックの乱塊法で $SS_{\mathrm{bl}}=40$、$SS_E=20$ を得た。ブロックを無視した完全無作為化法と比べる近似相対効率を計算せよ。

## 記号・用語
- CRD：完全無作為化法（completely randomized design）
- RCBD：乱塊法（randomized complete block design）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ブロックを無視した一元配置では誤差平方和が $SS_{\mathrm{bl}}+SS_E$、誤差自由度が $ab-a$ となる。

## 答え
ブロックを無視すると、その平方和は誤差へ入るから
$$MS_{E,\mathrm{CRD}}=\frac{SS_{\mathrm{bl}}+SS_E}{ab-a}
=\frac{40+20}{12-3}=\frac{20}{3}.$$
乱塊法では
$$MS_{E,\mathrm{RCBD}}=\frac{SS_E}{(a-1)(b-1)}
=\frac{20}{6}=\frac{10}{3}.$$
よって近似相対効率は
$$\frac{MS_{E,\mathrm{CRD}}}{MS_{E,\mathrm{RCBD}}}=2.$$

## 計算例
この指標では、ブロック化により誤差分散推定値が半分になった。

## 注意
処置×ブロック交互作用が無視できる加法モデルの下で比較する。

<!-- CARD -->

---
id: design-rcbd-sums-squares
title: 乱塊法の平方和を分解する
category: applied-common
subcategory: applied-design
topic: rcbd-sums-squares
type: formula
difficulty: 4
priority: B
hashtags: [乱塊法, 平方和, 分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱塊法 }]
---

## 問題
a処置、bブロック、各セル1観測の乱塊法で平方和を平均記号で書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

バランスした加法モデルの直交平方和分解。

## 答え
$$SS_T=\sum_{i,j}(y_{ij}-\bar y_{\cdot\cdot})^2,$$
$$SS_A=b\sum_i(\bar y_{i\cdot}-\bar y_{\cdot\cdot})^2,$$
$$SS_B=a\sum_j(\bar y_{\cdot j}-\bar y_{\cdot\cdot})^2,$$
$$SS_E=SS_T-SS_A-SS_B.$$

## 計算例
処置平方和は処置平均差、ブロック平方和はブロック平均差を測る。

## 注意
ここで添字Tは全平方和、Aは処置、Bはブロック。

<!-- CARD -->

---
id: design-rcbd-degrees-freedom
title: 乱塊法の自由度を穴埋めする
category: applied-common
subcategory: applied-design
topic: rcbd-degrees-freedom
type: calc_step
difficulty: 2
priority: B
hashtags: [乱塊法, 自由度, 分散分析表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱塊法 }]
---

## 問題
a処置、bブロック、各セル1観測の乱塊法について、全・処置・ブロック・誤差の自由度を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$ab-1=(a-1)+(b-1)+(a-1)(b-1).$$

## 答え
$$df_T=ab-1,\quad df_A=a-1,\quad df_B=b-1,$$
$$df_E=(a-1)(b-1).$$

## 計算例
$a=4,b=5$ なら自由度は全19、処置3、ブロック4、誤差12。

## 注意
交互作用を誤差として扱う各セル1観測の加法モデル。

<!-- CARD -->

---
id: design-rcbd-anova-numeric
title: 乱塊法のF統計量を計算する
category: applied-common
subcategory: applied-design
topic: rcbd-anova-numeric
type: calc_step
difficulty: 3
priority: B
hashtags: [乱塊法, F検定, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱塊法 }]
---

## 問題
$a=3,b=4$ の乱塊法で $SS_A=24,SS_B=15,SS_E=12$。処置効果のF統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

処置数を $a$、ブロック数を $b$ とすると、処置と誤差の自由度は
$$df_A=a-1,\qquad df_E=(a-1)(b-1).$$
平方和 $SS$ を自由度で割った平均平方を $MS=SS/df$ と定義し、処置効果の検定統計量を
$$F_A=\frac{MS_A}{MS_E}$$
とする。
帰無仮説 $H_0:\tau_1=\cdots=\tau_a=0$ の下で $F_A\sim F_{a-1,(a-1)(b-1)}$。

## 答え
$$df_A=2,\qquad df_E=(3-1)(4-1)=6,$$
$$MS_A=24/2=12,\qquad MS_E=12/6=2,$$
$$F_A=MS_A/MS_E=6.$$

## 計算例
ブロック平方和は処置F統計量の分子に入らない。

## 注意
分母はブロック平均平方でなく誤差平均平方。

<!-- CARD -->

---
id: design-latin-square-definition
title: ラテン方格法の配置条件を答える
category: applied-common
subcategory: applied-design
topic: latin-square
type: recognition
difficulty: 3
priority: B
hashtags: [ラテン方格法, 行ブロック, 列ブロック]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ラテン方格法 }]
---

## 問題
p処置のラテン方格法で、各処置が行・列に現れる回数を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

処置、行、列の各水準数が全てpである完全ラテン方格。

## 答え
$p\times p$ の配置で、各処置は各行に1回、各列に1回ずつ現れ、全体でp回反復される。行と列という2つのブロック因子を同時に制御する。

## 計算例
p=3なら9実験単位へA,B,Cを各行・各列1回ずつ置く。

## 注意
処置×行、処置×列などの交互作用は通常推定しない。

<!-- CARD -->

---
id: design-latin-square-model
title: ラテン方格法のモデルを書く
category: applied-common
subcategory: applied-design
topic: latin-square-model
type: formula
difficulty: 3
priority: B
hashtags: [ラテン方格法, 加法モデル, 局所管理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ラテン方格法 }]
---

## 問題
行i、列jに処置 $k(i,j)$ を配置したラテン方格法の加法モデルを書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

行・列・処置の加法性と、誤差が独立に正規分布 $N(0,\sigma^2)$ に従うことを仮定する。

## 答え
$$Y_{ij}=\mu+\rho_i+\kappa_j+\tau_{k(i,j)}
+\varepsilon_{ij},$$
各効果の和を0とする識別制約を置く。

## 計算例
行を日、列を測定装置として両方の系統差を除ける。

## 注意
行×列交互作用は誤差と分離できない。

<!-- CARD -->

---
id: design-latin-square-degrees-freedom
title: ラテン方格法の自由度を計算する
category: applied-common
subcategory: applied-design
topic: latin-square-degrees-freedom
type: calc_step
difficulty: 3
priority: B
hashtags: [ラテン方格法, 自由度, 分散分析表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ラテン方格法 }]
---

## 問題
p×pラテン方格の全・行・列・処置・誤差自由度を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$p^2-1=3(p-1)+(p-1)(p-2).$$

## 答え
$$df_T=p^2-1,$$
$$df_R=df_C=df_A=p-1,$$
$$df_E=(p-1)(p-2).$$

## 計算例
p=4なら全15、行3、列3、処置3、誤差6。

## 注意
p=2では誤差自由度0で、誤差分散を推定できない。

<!-- CARD -->

---
id: design-latin-square-anova-numeric
title: ラテン方格法のF統計量を計算する
category: applied-common
subcategory: applied-design
topic: latin-square-anova
type: calc_step
difficulty: 3
priority: B
hashtags: [ラテン方格法, F検定, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ラテン方格法 }]
---

## 問題
p=4のラテン方格で処置平方和18、誤差平方和12。処置F統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$F_A=MS_A/MS_E$。

## 答え
$$df_A=p-1=3,\qquad df_E=(p-1)(p-2)=6,$$
$$MS_A=18/3=6,\qquad MS_E=12/6=2,$$
$$F_A=6/2=3.$$

## 計算例
帰無仮説下で $F_A\sim F_{3,6}$。

## 注意
行・列平方和を先に全平方和から除いて誤差平方和を得る。

<!-- CARD -->

---
id: design-oneway-vs-block
title: 一元配置法と乱塊法を選び分ける
category: applied-common
subcategory: applied-design
topic: one-way-design-choice
type: recognition
difficulty: 2
priority: B
hashtags: [一元配置法, 乱塊法, ブロック化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置法 }]
---

## 問題
完全無作為化による一元配置法と乱塊法を、実験単位の異質性から選び分けよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一元配置：$Y_{ij}=\mu+\tau_i+\varepsilon_{ij}$。乱塊法はブロック効果を加える。

## 答え
実験単位が処置割付前に十分均質なら完全無作為化の一元配置法。応答へ強く影響する既知の群分けがあり、各群内で全処置を比較できるなら乱塊法。

## 計算例
同一バッチ内で全処置を比較できるならバッチをブロックにする。

## 注意
ブロック数が反復数となる。

<!-- CARD -->

---
id: design-twoway-crossed-nested
title: 二元配置の交差因子と枝分かれ因子を判別する
category: applied-common
subcategory: applied-design
topic: two-way-crossed-nested
type: recognition
difficulty: 3
priority: B
hashtags: [二元配置法, 交差因子, 枝分かれ因子]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二元配置法 }]
---

## 問題
因子AとBが交差している場合と、BがAに枝分かれしている場合を区別せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

交差設計ではA×B交互作用を定義できる。枝分かれ設計ではB水準の比較は同じA内で行う。

## 答え
全てのA水準と全てのB水準の組合せを観測するなら交差。各B水準が一つのA水準にだけ属し、別のA水準のBと同一視できないなら $B(A)$ の枝分かれ。

## 計算例
同じ3装置で全4材料を測るのは交差、各工場固有の作業員は工場に枝分かれ。

## 注意
ラベルが同じでも実体が異なる水準を交差因子としない。

<!-- CARD -->

---
id: design-factorial-definition
title: 要因実験の利点を答える
category: applied-common
subcategory: applied-design
topic: factorial-experiment
type: recognition
difficulty: 2
priority: B
hashtags: [要因実験, 主効果, 交互作用]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 要因実験 }]
---

## 問題
複数因子を一度に変える要因実験が、一因子ずつ行う実験より有利な点を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

完全要因計画は全因子水準の直積の組合せを含む。

## 答え
同じ実験単位で各因子の主効果を効率よく推定でき、ある因子の効果が他因子の水準で変わる交互作用も検出できる。

## 計算例
温度2水準×圧力3水準なら6処置組合せ。

## 注意
交互作用が大きいと主効果だけの解釈は不十分。

<!-- CARD -->

---
id: design-two-by-two-effects
title: 2×2要因計画の主効果と交互作用を書く
category: applied-common
subcategory: applied-design
topic: two-factor-effects
type: formula
difficulty: 3
priority: B
hashtags: [要因実験, 主効果, 交互作用]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 主効果と交互作用 }]
---

## 問題
因子A,Bが低水準0・高水準1で、セル平均を $\mu_{ab}$ とする。A主効果と差の差としての交互作用を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

主効果は他因子水準で平均した効果、交互作用は単純効果の差。

## 答え
A主効果は
$$A=\frac{\mu_{10}+\mu_{11}}2
-\frac{\mu_{00}+\mu_{01}}2.$$
交互作用は
$$AB=(\mu_{11}-\mu_{01})-(\mu_{10}-\mu_{00}).$$

## 計算例
B主効果は $(\mu_{01}+\mu_{11}-\mu_{00}-\mu_{10})/2$。

## 注意
交互作用の尺度は定義流儀により1/2倍されることがある。

<!-- CARD -->

---
id: design-two-by-two-numeric
title: 2×2要因効果を数値で計算する
category: applied-common
subcategory: applied-design
topic: two-factor-effects-numeric
type: calc_step
difficulty: 3
priority: B
hashtags: [要因実験, 主効果, 交互作用]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 主効果と交互作用 }]
---

## 問題
セル平均が $(\mu_{00},\mu_{10},\mu_{01},\mu_{11})=(10,14,12,20)$。A主効果、B主効果、差の差ABを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各主効果は周辺平均差、交互作用は単純効果差。

## 答え
$$A=\frac{14+20}{2}-\frac{10+12}{2}=17-11=6,$$
$$B=\frac{12+20}{2}-\frac{10+14}{2}=16-12=4,$$
$$AB=(20-12)-(14-10)=8-4=4.$$

## 計算例
Aの効果はB=0で4、B=1で8。

## 注意
AB=4はA効果がB高水準で4だけ増えることを表す。
