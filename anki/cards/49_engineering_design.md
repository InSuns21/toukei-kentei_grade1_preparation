---
id: engdesign-objective-response-factor
title: 実験目的から応答・因子・実験単位を特定する
category: applied-engineering
subcategory: engineering-design
topic: experiment-planning
type: recognition
difficulty: 1
priority: B
hashtags: [実験の計画と実施, 応答, 実験単位]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
焼成温度が製品強度へ与える影響を調べ、同じ炉で一度に焼く5個へ同じ温度を与える。応答、因子、実験単位を答えよ。
## 記号・用語
応答は測定する結果、因子は操作する条件、実験単位は処置を独立に割り付けられる最小単位である。
## 使用公式・定理
独立な反復数は測定個数ではなく、処置を独立に無作為化できる実験単位数で数える。
## 一手／方針
何を測るか、何を変えるか、どこまで別々に温度を割り付けられるかを分ける。
## 答え
応答は製品強度、因子は焼成温度、実験単位は炉の1回の運転である。
## 計算例
4回の炉運転を各温度へ割り付ければ各温度4反復であり、各運転内5個は測定の反復である。
## 注意
炉内の5個を独立反復として扱うと疑似反復になる。

<!-- CARD -->

---
id: engdesign-weighted-contrast-covariance
title: 不等反復で2コントラストの共分散を判定する
category: applied-engineering
subcategory: engineering-design
topic: unequal-replication-contrasts
type: calc_step
difficulty: 2
priority: B
hashtags: [実験の計画と実施, 不等反復, コントラスト]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 直交表 }]
---
## 問題
3処置の独立標本数が $(2,4,4)$、コントラスト係数が $\boldsymbol c=(1,-1,0)$、$\boldsymbol d=(1/2,1/2,-1)$ である。誤差分散を $\sigma^2$ として両推定量の共分散を求めよ。
## 記号・用語
各係数ベクトルは成分和0を満たし、$\widehat C=\sum_i c_i\overline Y_i$、$\widehat D=\sum_i d_i\overline Y_i$ とする。
## 使用公式・定理
独立・等分散誤差では $\operatorname{Cov}(\widehat C,\widehat D)=\sigma^2\sum_i c_id_i/n_i$。
## 一手／方針
反復数を分母に入れた重み付き内積を計算する。
## 答え
$$\operatorname{Cov}(\widehat C,\widehat D)=\sigma^2\left(\frac{1/2}{2}-\frac{1/2}{4}\right)=\frac{\sigma^2}{8}.$$
## 計算例
共分散が0でないため、この不等反復計画では両コントラストは直交しない。
## 注意
係数の通常内積だけを0にしても、不等反復では無相関にならない。

<!-- CARD -->

---
id: engdesign-missing-run-nonorthogonality
title: 欠測実施により要因列の直交性が崩れることを確認する
category: applied-engineering
subcategory: engineering-design
topic: missing-run-orthogonality
type: calc_step
difficulty: 2
priority: B
hashtags: [実験の計画と実施, 欠測, 直交性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 直交表 }]
---
## 問題
$2^2$ 計画のA列 $(-1,+1,-1,+1)$、B列 $(-1,-1,+1,+1)$ から最後の実施が欠測した。残る3行で列内積を求めよ。
## 記号・用語
$-1,+1$ は低・高水準で、欠測後の列はA=$(-1,+1,-1)$、B=$(-1,-1,+1)$ である。
## 使用公式・定理
列内積 $\boldsymbol x_A^{\mathsf T}\boldsymbol x_B$ が0なら直交する。
## 一手／方針
残った3行だけで符号積を足す。
## 答え
$(-1)(-1)+(+1)(-1)+(-1)(+1)=1-1-1=-1$ なので直交しない。
## 計算例
完全な4行なら最後の積$+1$が加わって0へ戻る。
## 注意
欠測後は効果平方和を元の直交公式で独立に分解せず、残った計画行列で回帰する。

<!-- CARD -->

---
id: engdesign-factorial-pure-error
title: 反復要因計画から純粋誤差平方和を求める
category: applied-engineering
subcategory: engineering-design
topic: factorial-pure-error
type: calc_step
difficulty: 2
priority: B
hashtags: [実験の計画と実施, 純粋誤差, 反復]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
$2^2$ 計画の各セルで2反復し、観測が $(10,12),(14,14),(11,13),(19,21)$ である。純粋誤差平方和と自由度を求めよ。
## 記号・用語
純粋誤差は同じ因子水準組合せ内の反復変動である。
## 使用公式・定理
$$SS_{PE}=\sum_j\sum_{l=1}^{r}(y_{jl}-\overline y_j)^2,\qquad df_{PE}=2^k(r-1).$$
## 一手／方針
各セル平均からの偏差平方をセルごとに足す。
## 答え
各セルの平方和は2、0、2、2なので $SS_{PE}=6$、自由度は $4(2-1)=4$。
## 計算例
$MS_{PE}=6/4=1.5$ を反復に基づく誤差分散推定値として使える。
## 注意
各セル1観測だけでは純粋誤差を直接推定できない。

<!-- CARD -->

---
id: engdesign-centerpoint-curvature
title: 中心点反復から曲率平方和を計算する
category: applied-engineering
subcategory: engineering-design
topic: centerpoint-curvature
type: calc_step
difficulty: 2
priority: B
hashtags: [実験の計画と実施, 中心点, 曲率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
2水準要因計画の隅点観測数が $n_F=8$ で平均10、中心点観測数が $n_C=3$ で平均13である。曲率平方和を求めよ。
## 記号・用語
中心点は全因子を符号0にした条件で、隅点平均との差が一次モデルの曲率を捉える。
## 使用公式・定理
$$SS_{\mathrm{curv}}=\frac{n_Fn_C}{n_F+n_C}(\overline Y_F-\overline Y_C)^2.$$
## 一手／方針
観測数の調和的な係数へ平均差の二乗を掛ける。
## 答え
$$SS_{\mathrm{curv}}=\frac{8\cdot3}{11}(10-13)^2=\frac{216}{11}\approx19.64.$$
## 計算例
中心点反復の純粋誤差と比較して一次応答面の不足を検定する。
## 注意
曲率が有意でも、どの二次項が原因かは追加の軸点などなしには識別できない。

<!-- CARD -->

---
id: engdesign-lack-of-fit-decomposition
title: 残差平方和を純粋誤差と適合不足へ分解する
category: applied-engineering
subcategory: engineering-design
topic: lack-of-fit
type: calc_step
difficulty: 3
priority: B
hashtags: [実験の計画と実施, 適合不足, 純粋誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
異なる設計点が $m=4$、総観測数 $N=12$、切片を含む回帰母数数 $p=2$ である。残差平方和30、純粋誤差平方和18から適合不足平方和と各自由度を求めよ。
## 記号・用語
$m$ は異なる設計点数で、同一設計点の反復から純粋誤差を得る。
## 使用公式・定理
$SS_E=SS_{LOF}+SS_{PE}$、自由度は $df_E=N-p$、$df_{PE}=N-m$、$df_{LOF}=m-p$。
## 一手／方針
残差から純粋誤差を引き、観測数・設計点数・母数数で自由度を分ける。
## 答え
$SS_{LOF}=30-18=12$、$df_E=10$、$df_{PE}=8$、$df_{LOF}=2$。
## 計算例
$F=(12/2)/(18/8)=2.667$ として適合不足を検定できる。
## 注意
同一設計点で独立反復がなければ純粋誤差と適合不足を分離できない。

<!-- CARD -->

---
id: engdesign-foldover-dealias
title: foldoverで主効果と2因子交互作用を分離する
category: applied-engineering
subcategory: engineering-design
topic: foldover
type: recognition
difficulty: 3
priority: B
hashtags: [交絡法, foldover, 逐次実験]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交絡法 }]
---
## 問題
$I=ABC$ の半実施で $A=BC$ が別名である。全因子符号を反転した補完半実施を追加する効果を答えよ。
## 記号・用語
foldoverは元の一部実施と符号を反転した実施を組み合わせる逐次計画である。
## 使用公式・定理
主効果は全因子反転で符号が反転し、2因子交互作用は符号が変わらないため両半実施で分離できる。
## 一手／方針
奇数次数効果と偶数次数効果の符号変化を比較する。
## 答え
追加後はAとBCを別々に推定でき、同様にBとAC、CとABの別名が解ける。
## 計算例
元と補完のA列推定量の差・和からAとBCを取り出す。
## 注意
どの因子を反転するかで解ける別名が変わる部分foldoverもある。

<!-- CARD -->

---
id: engdesign-block-generator-protect-effects
title: ブロック生成子からブロック数を決め重要効果を守る
category: applied-engineering
subcategory: engineering-design
topic: block-generator-workflow-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 交絡法
  - ブロック化
  - ブロック生成子
  - 2水準要因計画
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡法
---
## 問題
2水準要因計画をブロック化する。
1. $2^4$ 計画で独立なブロック生成子を $p=2$ 個使うとき、ブロック数と各ブロックの実施数を求めよ。
2. 生成子をABとCDとしたとき、ブロック定義群に含まれる効果を答えよ。
3. 別の $2^4$ 計画を2ブロックへ分ける。AB交互作用が重要なとき、ブロック生成子としてABとABCDのどちらを選ぶべきか。その理由も述べよ。

## 記号・用語
ブロック生成子は、実施をブロックへ分けるためにブロック効果と完全に交絡させる要因効果である。$p$ 個の**独立な**ブロック生成子を使うと、それらの符号組合せで $2^p$ ブロックに分かれる。生成子自身だけでなく、それらの積からなるブロック定義群に含まれる効果もブロックと交絡する。

## 使用公式・定理
$2^k$ 完全要因計画に $p$ 個の独立ブロック生成子を使うと
$$
\text{ブロック数}=2^p,\qquad
\text{1ブロックの実施数}=2^{k-p}.
$$
2個の生成子を $G_1,G_2$ とすればブロック定義群は
$$
I=G_1=G_2=G_1G_2
$$
の形になる。ブロック定義群に入る処置効果はブロック効果と分離できない。

## 一手／方針
**まず必要なブロック数から独立生成子数 $p$ を決め、次に候補生成子とその積を全部書き、重要な主効果・低次交互作用がブロック定義群へ入っていないか確認する。** ブロック数の計算と生成子選択を別々に考えない。

## 答え
1. $k=4,p=2$ なので
$$
2^p=4
$$
ブロック、各ブロックは
$$
2^{4-2}=4
$$
実施である。

2. $G_1=AB,G_2=CD$ なら
$$
G_1G_2=ABCD
$$
なのでブロック定義群は
$$
I=AB=CD=ABCD.
$$
AB、CD、ABCDはブロック差と交絡する。

3. ABを生成子にすると重要なAB交互作用をブロック差から分離できない。ABCDを生成子にすれば失うのは4因子交互作用でありABは保護される。したがってABCDを選ぶ。

## 計算例
$2^5$ 計画を8ブロックへ分けたいなら $2^p=8$ より $p=3$。各ブロックは $2^{5-3}=4$ 実施である。ただし3個の生成子を選んだ後は、生成子3個だけでなく全ての積から生じる $2^3-1=7$ 個の非恒等ブロック語を確認する必要がある。

## 注意
生成子が互いに独立でなければ、個数を増やしてもブロック数は期待どおり倍増しない。高次交互作用を生成子へ選ぶのは効果の疎性を仮定した設計判断であり、重要と考える効果を先に明示してから決める。反復ごとに交絡対象を変えて情報を回復する部分交絡は別の設計操作である。

<!-- CARD -->

---
id: engdesign-partial-confounding
title: 部分交絡で情報を回復する仕組みを説明する
category: applied-engineering
subcategory: engineering-design
topic: partial-confounding
type: recognition
difficulty: 3
priority: B
hashtags: [交絡法, 部分交絡, 反復]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交絡法 }]
---
## 問題
同じ要因計画を複数反復するとき、各反復で異なる交互作用をブロックと交絡させる部分交絡の利点を答えよ。
## 記号・用語
完全交絡は全反復で同じ効果をブロックと一致させ、部分交絡は反復ごとに一致させる効果を変える。
## 使用公式・定理
ある効果が交絡していない反復の情報を用いれば、その効果を推定できる。
## 一手／方針
各効果について少なくとも一部の反復でブロック列と異なるかを見る。
## 答え
ブロックサイズを保ちながら、交絡対象を反復間で分散させて主要な交互作用の情報を部分的に回復できる。
## 計算例
反復1でABC、反復2でABDを交絡させれば、ABCは反復2、ABDは反復1から推定できる。
## 注意
効果ごとの情報量は完全直交計画より少なくなり得る。

<!-- CARD -->

---
id: engdesign-subsampling-variance
title: 実験単位内の複数測定が平均分散をどれだけ減らすか計算する
category: applied-engineering
subcategory: engineering-design
topic: subsampling-variance
type: calc_step
difficulty: 2
priority: B
hashtags: [実験の計画と実施, 反復, 疑似反復]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
独立な装置効果 $U_i$ と測定誤差 $\varepsilon_{ij}$ による変量切片模型 $Y_{ij}=\mu+U_i+\varepsilon_{ij}$ を考える。各処置に装置を $n=4$ 台割り付け、各装置で $m=5$ 回測定する。$E[U_i]=E[\varepsilon_{ij}]=0$、$\operatorname{Var}(U_i)=\tau^2=9$、$\operatorname{Var}(\varepsilon_{ij})=\sigma^2=16$ のとき、処置平均の分散を求めよ。
## 記号・用語
装置平均は共通装置効果と$m$回の測定誤差平均からなる。
## 使用公式・定理
装置平均の分散は $\tau^2+\sigma^2/m$、n台の処置平均は $(\tau^2+\sigma^2/m)/n$。
## 一手／方針
まず装置内平均で測定誤差だけを$m$分の1にし、装置数nで全体を割る。
## 答え
$$\operatorname{Var}(\overline Y)=\frac{9+16/5}{4}=\frac{12.2}{4}=3.05.$$
## 計算例
$m$ を無限に増やしても分散下限は $\tau^2/n=9/4=2.25$ である。
## 注意
装置間変動が大きい場合、装置内測定数より独立装置数を増やす方が有効である。

<!-- CARD -->

---
id: engdesign-randomization-permutation
title: 完全無作為化の割付表を作る
category: applied-engineering
subcategory: engineering-design
topic: randomization
type: calc_step
difficulty: 1
priority: B
hashtags: [実験の計画と実施, 無作為化, 割付]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
実験単位1〜6へ処置A、Bを各3単位割り付ける。乱数順が $(4,1,6,2,5,3)$ のとき、先頭3単位をAとする割付を答えよ。
## 記号・用語
完全無作為化は制約した処置数を保ちながら全実験単位へ無作為に割り付ける。
## 使用公式・定理
乱数による置換の先頭から必要数を各処置へ割り当てる。
## 一手／方針
並びの先頭3個と残り3個を分ける。
## 答え
Aは単位4、1、6、Bは単位2、5、3である。
## 計算例
割付後は実施順も無作為化し、時間トレンドとの交絡を避ける。
## 注意
都合のよい順序へ事後変更すると無作為化の根拠を失う。

<!-- CARD -->

---
id: engdesign-rerandomization-balance
title: 共変量釣合いを使う再無作為化候補を選ぶ
category: applied-engineering
subcategory: engineering-design
topic: rerandomization
type: recognition
difficulty: 1
priority: B
hashtags: [実験の計画と実施, 完全無作為化, 処置効果]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
処置前共変量の群平均差が、無作為割付候補1で2.4、候補2で0.3である。許容基準を絶対差1以下とした再無作為化で採用する候補を答えよ。
## 記号・用語
再無作為化は事前に定めた釣合い基準を満たすまで無作為割付を引き直す方法である。
## 使用公式・定理
採択規則は応答を見ず、処置前共変量だけで全候補へ同じように適用する。
## 一手／方針
各候補の絶対平均差を基準1と比較する。
## 答え
候補1は2.4で棄却、候補2は0.3で採用する。
## 計算例
採用後の割付確率を反映する無作為化推測または設計に対応した解析を行う。
## 注意
結果を見て釣合い基準を変えると選択バイアスを生む。

<!-- CARD -->

---
id: engdesign-precision-weighted-block-difference
title: 精度が異なるブロック内処置差を重み付き統合する
category: applied-engineering
subcategory: engineering-design
topic: weighted-block-contrast
type: calc_step
difficulty: 2
priority: B
hashtags: [ブロック化, 局所管理, 誤差分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
3ブロックの処置差B−Aが $(2,4,8)$、その分散が $(1,2,4)$ である。独立なブロック差を逆分散重みで統合せよ。
## 記号・用語
逆分散重みは精度の高いブロック差へ大きい重みを与える。
## 使用公式・定理
$$\widehat\Delta=\frac{\sum_jw_jD_j}{\sum_jw_j},\qquad w_j=1/\operatorname{Var}(D_j).$$
## 一手／方針
分散の逆数 $(1,1/2,1/4)$ を作り、加重平均を取る。
## 答え
$$\widehat\Delta=\frac{1(2)+(1/2)4+(1/4)8}{1+1/2+1/4}=\frac6{1.75}=\frac{24}{7}\approx3.43.$$
## 計算例
推定分散は $1/\sum_jw_j=4/7\approx0.571$。
## 注意
分散が同じデータから推定される場合は重み推定の不確実性も考慮する。

<!-- CARD -->

---
id: engdesign-rcbd-adjusted-difference
title: 乱塊法の処置差をブロック内差から求める
category: applied-engineering
subcategory: engineering-design
topic: randomized-complete-block
type: calc_step
difficulty: 2
priority: B
hashtags: [ブロック化, 乱塊法, 処置差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
3ブロックで処置A、Bの観測が $(10,14),(9,12),(13,15)$ である。B−Aの処置差を求めよ。
## 記号・用語
各組は同一ブロック内の $(A,B)$ 観測である。
## 使用公式・定理
完全ブロックで2処置なら処置差推定量はブロック内差 $D_j=Y_{Bj}-Y_{Aj}$ の平均である。
## 一手／方針
ブロックごとの差を作り、その平均を取る。
## 答え
差は $(4,3,2)$ なので $\overline D=(4+3+2)/3=3$。
## 計算例
ブロック水準がそれぞれ大きく違っても、加法モデルなら差で除ける。
## 注意
欠測がある不完備ブロックでは単純な差平均をそのまま使えない。

<!-- CARD -->

---
id: engdesign-cyclic-incomplete-blocks
title: 基本ブロックを巡回して不完備ブロック計画を作る
category: applied-engineering
subcategory: engineering-design
topic: cyclic-incomplete-block
type: calc_step
difficulty: 3
priority: B
hashtags: [ブロック化, 不完備ブロック, 巡回計画]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
処置を $0,1,2,3,4$ とし、基本ブロック $\{0,1\}$ を法5で巡回して5ブロックを作れ。
## 記号・用語
巡回計画は基本ブロックの各処置番号へ同じ整数を法vで加える。
## 使用公式・定理
$B_s=\{(x+s)\bmod5:x\in\{0,1\}\}$、$s=0,\ldots,4$。
## 一手／方針
$s$ を0から4まで動かす。
## 答え
$\{0,1\},\{1,2\},\{2,3\},\{3,4\},\{4,0\}$。
## 計算例
各処置は2回現れ、接続グラフは5角形なので全処置対比が推定可能である。
## 注意
隣接処置対だけが共出現するためBIBDではない。

<!-- CARD -->

---
id: engdesign-graeco-latin-df
title: グレコ・ラテン方格法の自由度を配分する
category: applied-engineering
subcategory: engineering-design
topic: graeco-latin-square
type: calc_step
difficulty: 2
priority: B
hashtags: [ブロック化, ラテン方格法, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
$p=5$ のグレコ・ラテン方格で、行、列、ラテン処置、ギリシャ処置、誤差、全体の自由度を求めよ。
## 記号・用語
直交する2つのラテン方格を重ね、2種類の処置効果を行・列と分離する。
## 使用公式・定理
4つの主効果は各 $p-1$、誤差は $(p-1)(p-3)$、全体は $p^2-1$。
## 一手／方針
$p=5$ を代入し、5区分の自由度和を確かめる。
## 答え
行4、列4、ラテン処置4、ギリシャ処置4、誤差8、全体24で、$4+4+4+4+8=24$。
## 計算例
$p=5$ では2処置因子を各5水準で25実施により評価できる。
## 注意
2つの処置因子間の交互作用は通常この計画から分離できない。

<!-- CARD -->

---
id: engdesign-latin-square-treatment-mean
title: ラテン方格の処置平均を配置から集計する
category: applied-engineering
subcategory: engineering-design
topic: latin-square-calculation
type: calc_step
difficulty: 2
priority: B
hashtags: [ブロック化, ラテン方格法, 処置平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
3×3ラテン方格で処置Aがセル $(1,1),(2,2),(3,3)$ に配置され、応答が8、11、14であった。Aの処置平均を求めよ。
## 記号・用語
処置平均は行や列の位置ではなく、同じ処置記号が置かれたセルを集計する。
## 使用公式・定理
$k(i,j)$ をセル $(i,j)$ に割り付けた処置記号とすると、$\overline Y_A=p^{-1}\sum_{(i,j):k(i,j)=A}Y_{ij}$。
## 一手／方針
Aが現れる3セルだけを足して3で割る。
## 答え
$\overline Y_A=(8+11+14)/3=11$。
## 計算例
行平均や対角平均と一致するのはこの配置例だけで、一般には処置記号を追って集計する。
## 注意
ラテン方格の処置割付は標準方格を無作為に行・列・処置ラベル置換して作る。

<!-- CARD -->

---
id: engdesign-random-slope-covariance
title: 変量切片・変量傾きモデルの群内共分散を計算する
category: applied-engineering
subcategory: engineering-design
topic: random-slope-covariance
type: calc_step
difficulty: 1
priority: B
hashtags: [固定効果, 変量効果, 因子]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固定効果・変量効果 }]
---
## 問題
同一群の応答が $Y(x)=\beta_0+\beta_1x+U_0+U_1x+\varepsilon(x)$ に従う。$\operatorname{Var}(U_0)=4$、$\operatorname{Var}(U_1)=1$、$\operatorname{Cov}(U_0,U_1)=0.5$ のとき、$x=0$ と $x'=2$ の応答の共分散を求めよ。
## 記号・用語
$U_0,U_1$ は群共有のゼロ平均変量切片・変量傾き、異なる時点の誤差は互いに独立で両変量効果とも独立とする。
## 使用公式・定理
$$\operatorname{Cov}\{Y(x),Y(x')\}=\operatorname{Var}(U_0)+(x+x')\operatorname{Cov}(U_0,U_1)+xx'\operatorname{Var}(U_1).$$
## 一手／方針
$x=0,x'=2$ を3項へ代入する。
## 答え
$4+(0+2)(0.5)+0(2)(1)=5$。
## 計算例
両時点が0から離れると変量傾きが共分散へ寄与する。
## 注意
同一時点の分散には測定誤差分散も加わるが、異時点共分散には独立誤差は寄与しない。

<!-- CARD -->

---
id: engdesign-fixed-effect-hypothesis
title: 固定効果因子の帰無仮説を書く
category: applied-engineering
subcategory: engineering-design
topic: fixed-effect-test
type: recognition
difficulty: 1
priority: B
hashtags: [固定効果, 分散分析, 帰無仮説]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固定効果 }]
---
## 問題
$a$ 水準の固定効果因子について、主効果なしの帰無仮説を平均と効果の2通りで書け。
## 記号・用語
$\mu_i$ は第 $i$ 水準の母平均、$\alpha_i$ は総平均からの固定効果で、$\sum_i\alpha_i=0$ とする。
## 使用公式・定理
主効果なしは全水準平均が等しいことと全効果が0であることが同値である。
## 一手／方針
平均の等式を効果パラメータへ書き換える。
## 答え
$$H_0:\mu_1=\cdots=\mu_a,$$
または $H_0:\alpha_1=\cdots=\alpha_a=0$。
## 計算例
対立仮説は「少なくとも1つの平均が異なる」であり、全平均が互いに異なるとは限らない。
## 注意
棄却後にどの水準が違うかは多重比較や事前コントラストで調べる。

<!-- CARD -->

---
id: engdesign-random-effect-blup
title: 変量効果のBLUP縮小量を計算する
category: applied-engineering
subcategory: engineering-design
topic: random-effect-blup
type: calc_step
difficulty: 2
priority: B
hashtags: [変量効果, 分散成分, 群内相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変量効果 }]
---
## 問題
既知の $\mu,\tau^2,\sigma^2$ を持つ独立同分散の変量切片模型 $Y_{ij}=\mu+U_i+\varepsilon_{ij}$ で、$E[U_i]=E[\varepsilon_{ij}]=0$ とする。群平均 $\overline Y_i=12$、$\mu=10$、$\tau^2=4$、$\sigma^2=9$、群サイズ $n=3$ のとき群平均のBLUPを求めよ。
## 記号・用語
BLUPはbest linear unbiased prediction（最良線形不偏予測）で、群平均を全体平均へ縮小する。
## 使用公式・定理
$B=\tau^2/(\tau^2+\sigma^2/n)$、予測群平均は $\widehat\mu_i=\mu+B(\overline Y_i-\mu)$。
## 一手／方針
群平均の誤差分散 $\sigma^2/n$ と縮小係数Bを求める。
## 答え
$B=4/(4+9/3)=4/7$ より
$$\widehat\mu_i=10+\frac47(12-10)=\frac{78}{7}\approx11.14.$$
## 計算例
生の群平均12より全体平均10へ縮小される。
## 注意
分散成分を推定して使う経験BLUPでは追加の推定不確実性がある。

<!-- CARD -->

---
id: engdesign-gage-rr-variance
title: Gage R&Rの分散成分から測定変動割合を求める
category: applied-engineering
subcategory: engineering-design
topic: gage-rr
type: calc_step
difficulty: 3
priority: B
hashtags: [変量効果, Gage R&R, 分散成分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変量効果 }]
---
## 問題
部品間分散9、測定者間分散4、繰返し誤差分散16と推定された交差型Gage R&Rで、総分散と測定システム分散の割合を求めよ。
## 記号・用語
測定システム分散は再現性成分（測定者）と繰返し性成分の和とする。
## 使用公式・定理
$\sigma^2_{\mathrm{GRR}}=\sigma^2_{\mathrm{operator}}+\sigma^2_{\mathrm{repeat}}$、総分散は部品間分散との和。
## 一手／方針
測定者4と繰返し16を足し、全体29で割る。
## 答え
$\sigma^2_{\mathrm{GRR}}=4+16=20$、総分散は $9+20=29$、割合は $20/29\approx0.690$。
## 計算例
標準偏差割合は $\sqrt{20}/\sqrt{29}\approx0.830$ で、分散割合とは異なる。
## 注意
部品×測定者交互作用を含む設計では、その分散成分も再現性側へ加える規約がある。

<!-- CARD -->

---
id: engdesign-confounder-randomization
title: 局外因子をブロック化しブロック内無作為化で処置効果を守る
category: applied-engineering
subcategory: engineering-design
topic: blocking-randomization-canonical
type: strategy
difficulty: 2
priority: A
hashtags:
  - 実験計画法
  - ブロック化
  - 無作為化
  - 交絡因子
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡因子
---
## 問題
4処理を比較したいが、実験日は日ごとの環境差が大きい。さらに、処置Aを午前だけ、処置Bを午後だけ実施すると時間帯差も応答へ影響し得る。
1. 「日」をどう扱うべきか。
2. Aを午前、Bを午後だけに固定することの問題点と改善策を述べよ。

## 記号・用語
ブロックは主目的ではない局外因子の水準が近い実験単位をまとめる単位である。交絡は処置割付と局外因子が対応してしまい、両効果をデータから分離できない状態をいう。

## 使用公式・定理
乱塊法の加法モデルは
$$
Y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij},
\qquad \sum_i\tau_i=\sum_j\beta_j=0,
$$
と書ける。$\tau_i$ は処置効果、$\beta_j$ はブロック効果である。各ブロック内に比較したい処置を配置し、その中で無作為化すれば、加法的なブロック差を処置差から分離できる。

## 一手／方針
応答へ影響するが主目的でない変動要因を先に見つける。それが割付前に分かるカテゴリならブロック候補とし、各ブロック内で全処置を比較できるようにして無作為化する。

## 答え
1. 日をブロックとし、各日の中で4処理を無作為に割り付ける。日差 $\beta_j$ を残差から分離できるため、処置比較の精度が上がる。
2. A=午前、B=午後と固定すると処置差と時間帯差が完全に交絡する。午前・午後それぞれの時間帯内にAとBを配置し、その中で無作為化する。

## 計算例
2処置A、Bを3日で比較するなら、各日でAとBを1回ずつ実施し、日内差 $D_j=Y_{Bj}-Y_{Aj}$ を作れば、加法的な日効果は差から消える。

## 注意
乱塊法の単純な加法モデルでは処置×ブロック交互作用を独立には推定しない。ブロック化は割付前に分かる局外因子を利用する設計上の操作であり、処置後に観測された変数を都合よく調整することとは異なる。

<!-- CARD -->

---
id: engdesign-block-vs-covariate
title: 局外因子をブロックか共変量で扱う
category: applied-engineering
subcategory: engineering-design
topic: block-or-covariate
type: recognition
difficulty: 2
priority: B
hashtags: [ブロック化, 共変量, 実験の計画と実施]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
応答へ影響する初期重量が連続量として実験前に測れる。粗い区分でブロック化する方法と共分散分析で調整する方法を比較せよ。
## 記号・用語
局外因子（nuisance factor）は主目的ではないが応答変動を説明する変数である。共変量は処置前に測定する連続説明変数である。
## 使用公式・定理
ブロック化は区分内比較、共分散分析は $Y=\mu+\tau_i+\beta(X-\overline X)+\varepsilon$ により連続的に調整する。
## 一手／方針
割付前に層として使うか、測定値を回帰調整へ残すかを区別する。
## 答え
ブロック化はモデル依存が小さいが区分で情報を失う。共分散分析は連続情報を使い効率的だが、線形性と処置間の共通傾きを要する。
## 計算例
初期重量を軽・中・重に分け各層内で無作為化し、解析では実測重量も補助的に使える。
## 注意
処置後に変化した変数を共変量として調整すると処置効果の一部を除くおそれがある。

<!-- CARD -->

---
id: engdesign-snr-smaller-better
title: 望小特性のSN比を計算する
category: applied-engineering
subcategory: engineering-design
topic: robust-parameter-design
type: calc_step
difficulty: 3
priority: B
hashtags: [直交表, パラメータ設計, SN比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 直交表 }]
---
## 問題
小さいほどよい損失応答を同一条件で $(2,3,1)$ と観測した。望小特性のSN比を求めよ。
## 記号・用語
SN比はsignal-to-noise ratioで、望小特性では二乗平均を小さくする条件を大きい値として評価する。
## 使用公式・定理
$$\eta=-10\log_{10}\left(\frac1n\sum_{i=1}^ny_i^2\right).$$
## 一手／方針
二乗平均を求め、常用対数へ$-10$を掛ける。
## 答え
二乗平均は $(4+9+1)/3=14/3$ なので $\eta=-10\log_{10}(14/3)\approx-6.69$ dB。
## 計算例
候補条件間ではSN比が大きい方を頑健条件として選ぶ。
## 注意
特性の目的に応じて望大・望目など別のSN比定義を使う。

<!-- CARD -->

---
id: engdesign-split-plot-randomization
title: 分割法の2段階無作為化を説明する
category: applied-engineering
subcategory: engineering-design
topic: split-plot-design
type: recognition
difficulty: 3
priority: B
hashtags: [実験の計画と実施, 分割法, 無作為化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
温度Aは炉運転単位でしか変更できず、材料Bは同じ炉運転内の試験片ごとに変更できる。適切な無作為化を答えよ。
## 記号・用語
温度を受ける炉運転は一次単位、材料を受ける試験片は二次単位である。
## 使用公式・定理
分割法ではAを一次単位へ無作為化し、各一次単位内でBを二次単位へ無作為化する。
## 一手／方針
変更困難因子と変更容易因子が処置を受ける階層を分ける。
## 答え
まず炉運転へ温度Aを無作為化し、次に各炉運転内の試験片へ材料Bを無作為化する。
## 計算例
Aの反復数は炉運転数であり、試験片数ではない。
## 注意
AとBでは無作為化誤差が異なるため、同じ誤差平均平方で検定しない。

<!-- CARD -->

---
id: engdesign-split-plot-degrees-freedom
title: 分割法の一次・二次誤差自由度を計算する
category: applied-engineering
subcategory: engineering-design
topic: split-plot-df
type: calc_step
difficulty: 3
priority: B
hashtags: [実験の計画と実施, 分割法, 誤差項]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
反復ブロック数 $r=4$、一次因子Aが $a=3$ 水準、二次因子Bが $b=2$ 水準の分割法で、一次誤差と二次誤差の自由度を求めよ。
## 記号・用語
各ブロック内でAを一次単位へ、各一次単位内でBを二次単位へ無作為化する。
## 使用公式・定理
$df_{E_A}=(r-1)(a-1)$、$df_{E_B}=a(r-1)(b-1)$。
## 一手／方針
$r=4,a=3,b=2$ を代入する。
## 答え
一次誤差は $(4-1)(3-1)=6$、二次誤差は $3(4-1)(2-1)=9$ 自由度。
## 計算例
全自由度23は、ブロック3、A2、一次誤差6、B1、AB2、二次誤差9へ分かれる。
## 注意
欠測や不釣合いがあると単純な自由度分解から変わる。

<!-- CARD -->

---
id: engdesign-incomplete-incidence-matrix
title: 不完備ブロック計画の接続行列を作る
category: applied-engineering
subcategory: engineering-design
topic: incomplete-block-incidence
type: calc_step
difficulty: 3
priority: B
hashtags: [ブロック化, 不完備ブロック, 接続行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
処置A、B、Cとブロック1=$(A,B)$、2=$(A,C)$、3=$(B,C)$ から、行を処置、列をブロックとする接続行列 $N$ を作れ。
## 記号・用語
$N_{ij}=1$ は処置$i$がブロック$j$に入ること、0は入らないことを表す。
## 使用公式・定理
各ブロックの処置集合を列ごとの0–1指示ベクトルへする。
## 一手／方針
ブロック1、2、3についてA、B、Cの有無を順に記入する。
## 答え
$$N=\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix}.$$
## 計算例
各行和は反復数2、各列和はブロックサイズ2である。
## 注意
不完備ブロックでは全処置が同一ブロックにそろわないため、ブロック調整した比較を使う。

<!-- CARD -->

---
id: engdesign-bibd-parameter-check
title: BIBDのパラメータ関係を確認する
category: applied-engineering
subcategory: engineering-design
topic: bibd-parameters
type: calc_step
difficulty: 3
priority: B
hashtags: [ブロック化, BIBD, 不完備ブロック]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
処置数 $v=4$、ブロックサイズ $k=3$、各処置の反復数 $r=3$、ブロック数 $b=4$ の計画がBIBDの基本関係を満たすか確認し、処置対の共出現数 $\lambda$ を求めよ。
## 記号・用語
BIBDはbalanced incomplete block design（釣合い型不完備ブロック計画）である。
## 使用公式・定理
$vr=bk$、$\lambda(v-1)=r(k-1)$。
## 一手／方針
総処置出現数を両側で確認し、第2式から$\lambda$を解く。
## 答え
$4(3)=4(3)=12$、$\lambda=3(2)/3=2$ なので基本関係を満たす。
## 計算例
各処置対がちょうど2ブロックで一緒に現れる必要がある。
## 注意
パラメータ関係は必要条件であり、整数解があっても実際の配置が存在するとは限らない。

<!-- CARD -->

---
id: engdesign-bibd-contrast-variance
title: BIBDの処置差推定量の分散を計算する
category: applied-engineering
subcategory: engineering-design
topic: bibd-contrast-variance
type: calc_step
difficulty: 4
priority: B
hashtags: [ブロック化, BIBD, 処置比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
ブロック内誤差分散 $\sigma^2=6$、BIBDの処置数 $v=4$、ブロックサイズ $k=3$、反復数 $r=3$、処置対の共出現数 $\lambda=2$ とする。任意の2処置の調整平均差の分散を求めよ。
## 記号・用語
釣合いにより任意の処置対の比較精度は等しい。$\lambda$ は任意の処置対の共出現数、$\widehat\tau_i-\widehat\tau_j$ はブロック調整済み処置効果差である。
## 使用公式・定理
BIBDでは $\lambda(v-1)=r(k-1)$ であり、調整処置差の分散は $\operatorname{Var}(\widehat\tau_i-\widehat\tau_j)=2k\sigma^2/(\lambda v)$。
## 一手／方針
$k=3,\sigma^2=6,\lambda=2,v=4$ を代入する。
## 答え
$2(3)(6)/(2\cdot4)=36/8=4.5$。
## 計算例
標準誤差は $\sqrt{4.5}\approx2.121$。
## 注意
式は等ブロックサイズで釣合った接続を持つBIBDに対するものである。

<!-- CARD -->

---
id: engdesign-incomplete-block-connectivity
title: 不完備ブロック計画で処置対比の推定可能性を判定する
category: applied-engineering
subcategory: engineering-design
topic: incomplete-block-estimability
type: recognition
difficulty: 4
priority: A
hashtags: [ブロック化, 不完備ブロック, 推定可能性]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: ブロック化 }, { type: past_exam, id: SCI-2016-Q1, topic: 不完備ブロックと推定可能性 }]
---
## 問題
ブロック1=$(A,B)$、2=$(B,C)$、3=$(D,E)$ だけからなる計画で、A−CとA−Dの処置対比が推定可能か判定せよ。
## 記号・用語
処置を頂点、同じブロックに現れる処置対を辺とする接続グラフを考える。
## 使用公式・定理
同じ連結成分内の処置対比は推定可能だが、異なる連結成分間の対比はブロック効果と分離できない。
## 一手／方針
Aから各処置まで共出現の辺をたどれるか調べる。
## 答え
A–B–Cと道があるのでA−Cは推定可能。D、Eは別成分なのでA−Dは推定不能。
## 計算例
ブロック $(C,D)$ を1つ追加すれば全処置が連結し、A−Dも推定可能になる。
## 注意
各処置が同じ回数現れるだけでは接続性は保証されない。

<!-- CARD -->

---
id: engdesign-nested-df
title: 入れ子型因子の自由度を計算する
category: applied-engineering
subcategory: engineering-design
topic: nested-design
type: calc_step
difficulty: 3
priority: B
hashtags: [実験の計画と実施, 入れ子型計画, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
工場Aが3水準、各工場内に異なる機械Bが4台ずつある入れ子型計画で、AとB(A)の自由度を求めよ。
## 記号・用語
B(A)は機械水準が工場間で共有されず、工場内に入れ子になっていることを表す。
## 使用公式・定理
Aの自由度は $a-1$、B(A)は $a(b-1)$。
## 一手／方針
$a=3,b=4$ を各式へ代入する。
## 答え
Aは2、B(A)は $3(4-1)=9$ 自由度。
## 計算例
機械総数12の自由度11は、工場間2と工場内機械9へ分かれる。
## 注意
同じ4機種を全工場で使う交差因子なら入れ子型ではない。

<!-- CARD -->

---
id: engdesign-repeated-measures-unit
title: 反復測定で実験単位と相関を特定する
category: applied-engineering
subcategory: engineering-design
topic: repeated-measures-design
type: recognition
difficulty: 2
priority: B
hashtags: [実験の計画と実施, 反復測定, 実験単位]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
10台の装置を処置A、Bへ5台ずつ割り付け、各装置を時点0、1、2で測定する。処置の実験単位と、独立でない観測を答えよ。
## 記号・用語
反復測定は同じ実験単位を複数時点で観測する設計である。
## 使用公式・定理
処置を受ける装置が実験単位で、同一装置内の時点観測は共通個体効果により相関する。
## 一手／方針
処置割付単位と測定時点を分ける。
## 答え
実験単位は装置で各処置5反復。同一装置の3時点観測は独立でない。
## 計算例
処置×時点交互作用は処置効果の時間変化を表す。
## 注意
30観測を独立として通常の二元配置法を使うと誤差構造を誤る。

<!-- CARD -->

---
id: engdesign-replication-power-ratio
title: 反復数と標準誤差の関係を計算する
category: applied-engineering
subcategory: engineering-design
topic: replication-precision
type: calc_step
difficulty: 1
priority: A
hashtags: [実験の計画と実施, 反復, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
等分散で2処置を各 $n$ 回独立反復する。平均差の標準誤差を現在の半分にするには反復数を何倍にすべきか。
## 記号・用語
$\sigma^2$ は1実験単位の誤差分散である。
## 使用公式・定理
$\operatorname{SE}(\overline Y_1-\overline Y_2)=\sigma\sqrt{2/n}$。
## 一手／方針
標準誤差が $n^{-1/2}$ に比例することを使う。
## 答え
$1/\sqrt c=1/2$ より $c=4$。反復数を4倍にする。
## 計算例
各処置5反復から20反復へ増やすと標準誤差は半分になる。
## 注意
測定を同じ実験単位内で増やすだけでは独立反復数は増えない。

<!-- CARD -->

---
id: engdesign-choice-integrated
title: 制約から完全無作為化・ブロック・分割法を選ぶ
category: applied-engineering
subcategory: engineering-design
topic: design-selection
type: recognition
difficulty: 3
priority: B
hashtags: [実験の計画と実施, ブロック化, 分割法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験の計画と実施 }]
---
## 問題
次の計画を選べ。(a) 実験単位が均質で全処置を自由に割付可能、(b) ロット差が大きく各ロットに全処置を置ける、(c) 温度は炉ごと、材料は炉内試験片ごとに変更可能。
## 記号・用語
計画選択では異質性と処置変更の物理的階層を先に確認する。
## 使用公式・定理
(a)完全無作為化、(b)乱塊法、(c)分割法が各制約に対応する。
## 一手／方針
ブロックが必要か、因子ごとに無作為化単位が異なるかを順に判定する。
## 答え
(a)完全無作為化計画、(b)ロットをブロックとする乱塊法、(c)温度を一次因子、材料を二次因子とする分割法。
## 計算例
一部の処置を同一ブロックへ置けないなら不完備ブロック計画を検討する。
## 注意
解析法を先に選ぶのではなく、実際の無作為化単位に解析の誤差層を合わせる。
