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
id: engdesign-lack-of-fit-decomposition
title: 反復点から純粋誤差・適合不足・中心点曲率を一続きで診断する
category: applied-engineering
subcategory: engineering-design
topic: lack-of-fit-curvature-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 実験計画法
  - 適合不足
  - 純粋誤差
  - 反復
  - 中心点
  - 曲率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
---
## 問題
回帰モデルと反復要因計画の適合性を診断する。

1. $2^2$ 計画の各セルで2回独立反復し、観測が $(10,12),(14,14),(11,13),(19,21)$ である。純粋誤差平方和 $SS_{PE}$、自由度、平均平方を求めよ。
2. 異なる設計点が $m=4$、総観測数 $N=12$、切片を含む回帰母数数 $p=2$ とする。残差平方和が $SS_E=30$、同一設計点内の反復から得た純粋誤差平方和が $SS_{PE}=18$ のとき、適合不足平方和、各自由度、適合不足検定の $F$ 値を求めよ。
3. 2水準要因計画の隅点観測数が $n_F=8$ で平均 $\overline Y_F=10$、中心点観測数が $n_C=3$ で平均 $\overline Y_C=13$ のとき、中心点による曲率平方和を求めよ。
4. 中心点反復が何のために必要か、また曲率が有意だったとき何が分かり、何までは分からないか説明せよ。

## 記号・用語
**純粋誤差**は、同じ設計点で独立に反復した観測のばらつきから得る誤差である。**適合不足**は、当てはめたモデルでは説明できない設計点間の系統的なずれである。

したがって残差は
$$
\text{残差}=\text{純粋な反復ばらつき}+\text{モデル形の不足}
$$
と考えて分解できる。中心点は全因子を符号0にした設計点で、2水準要因計画の隅点だけでは見えにくい一次モデルからの曲がりを検出するために追加する。

## 使用公式・定理
設計点 $j$ に $r_j$ 回の独立反復があるとき、純粋誤差平方和は
$$
SS_{PE}=\sum_j\sum_{l=1}^{r_j}(y_{jl}-\overline y_j)^2,
$$
自由度は
$$
df_{PE}=\sum_j(r_j-1)=N-m.
$$
$2^k$ 計画の全セルで同じ反復数 $r$ なら
$$
df_{PE}=2^k(r-1).
$$

同一設計点で反復があるとき
$$
SS_E=SS_{LOF}+SS_{PE}.
$$
自由度は
$$
df_E=N-p,\qquad
df_{PE}=N-m,\qquad
df_{LOF}=m-p,
$$
なので
$$
F=\frac{SS_{LOF}/df_{LOF}}{SS_{PE}/df_{PE}}
$$
で適合不足を検定できる。

2水準要因計画で隅点平均と中心点平均の差による1自由度の曲率平方和は
$$
SS_{\mathrm{curv}}
=\frac{n_Fn_C}{n_F+n_C}
(\overline Y_F-\overline Y_C)^2.
$$

## 一手／方針
**同じ条件で独立反復された観測があるかを最初に探す。** あればまず各設計点平均からの偏差平方を足して純粋誤差を作る。その後、残差平方和との差を適合不足へ割り当てる。2水準要因計画に中心点があれば、さらに「隅点平均と中心点平均の差」を1自由度の曲率として見る。

公式を別々に暗記せず、**反復点がモデル診断の基準になる**と捉える。

## 答え
1. 各セル平均は順に $11,14,12,20$ である。したがってセル内平方和は
$$
(10-11)^2+(12-11)^2=2,
$$
$$
(14-14)^2+(14-14)^2=0,
$$
$$
(11-12)^2+(13-12)^2=2,
$$
$$
(19-20)^2+(21-20)^2=2.
$$
よって
$$
\boxed{SS_{PE}=2+0+2+2=6}.
$$
4セル、各2反復なので
$$
\boxed{df_{PE}=4(2-1)=4},
$$
$$
\boxed{MS_{PE}=6/4=1.5}.
$$

2. 適合不足平方和は
$$
SS_{LOF}=30-18=12.
$$
自由度は
$$
df_E=12-2=10,
$$
$$
df_{PE}=12-4=8,
$$
$$
df_{LOF}=4-2=2.
$$
よって
$$
F=\frac{12/2}{18/8}
=\frac{6}{2.25}
\approx\boxed{2.667}.
$$

3. 曲率平方和は
$$
SS_{\mathrm{curv}}
=\frac{8\cdot3}{8+3}(10-13)^2
=\frac{216}{11}
\approx\boxed{19.64}.
$$

4. 中心点を**反復**することで同じ条件でのばらつき、すなわち純粋誤差を推定できる。その純粋誤差を基準に隅点平均と中心点平均の差が偶然のばらつきより大きいかを調べれば、一次モデルに曲率が不足しているかを診断できる。ただし有意な曲率から、どの $x_j^2$ や二次項が原因かまでは特定できない。

## 計算例
各セル1観測の $2^2$ 計画では4観測すべてが異なる設計点なので、セル内反復から純粋誤差を直接推定できない。各セルを2回独立反復すれば、上のように4自由度の純粋誤差が得られる。

また中心点を1回しか置かなければ中心点平均は得られても、その中心点だけから純粋誤差を推定できない。中心点を複数回独立反復すれば、中心点内平方和を純粋誤差の一部として使える。曲率が有意なら、次段階として軸点を追加した中心複合計画などで二次応答面を識別する。

## 注意
同一設計点の**独立反復**が一つもなければ、残差平方和を純粋誤差と適合不足へ分離できない。単なる繰返し測定を独立反復として数えてはいけない。

純粋誤差はモデルが正しいと仮定して作る残差とは違い、同じ設計点での実際の反復変動から得る。中心点曲率検定は一次モデルからの総合的な曲がりを検出するもので、個々の二次係数を識別する検定ではない。

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
title: ブロック生成子で完全交絡を設計し部分交絡で情報を回復する
category: applied-engineering
subcategory: engineering-design
topic: block-confounding-workflow-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - 交絡法
  - ブロック化
  - ブロック生成子
  - 完全交絡
  - 部分交絡
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
2水準要因計画を小さいブロックへ分ける交絡法について次を解け。

1. $2^3$ 計画を4実施ずつの2ブロックへ分け、ABC列の符号でブロックを定めた。どの処置効果がブロック効果と完全に交絡するか。
2. $2^4$ 計画で独立なブロック生成子を $p=2$ 個使う。ブロック数と1ブロック当たりの実施数を求めよ。
3. 2で生成子を $G_1=AB,G_2=CD$ とした。ブロック定義群を求め、どの処置効果がブロックと交絡するか答えよ。
4. 別の $2^4$ 計画を2ブロックへ分ける。AB交互作用が重要なら、生成子としてABとABCDのどちらを選ぶべきか。理由も述べよ。
5. 同じ要因計画を2反復し、反復1ではABC、反復2ではABDをブロックと交絡させる。この操作を何と呼ぶか。ABCとABDの情報をどこから得られるか説明せよ。

## 記号・用語
**ブロック生成子**は、実施をブロックへ分けるためにブロック効果と一致させる処置効果列である。同じ列を持つため、その処置効果とブロック効果はその反復内では分離できない。

- **完全交絡**：同じ処置効果を全反復でブロックと交絡させる。
- **部分交絡**：反復ごとにブロックと交絡させる処置効果を変え、各効果について交絡していない反復の情報を残す。

一般には、重要な主効果や低次交互作用を守るため、無視できると判断した高次交互作用をブロック生成子へ選ぶ。

## 使用公式・定理
$2^k$ 完全要因計画で $p$ 個の**独立な**ブロック生成子を使うと
$$
\text{ブロック数}=2^p,
\qquad
\text{1ブロックの実施数}=2^{k-p}.
$$

2個の生成子を $G_1,G_2$ とすると、ブロック定義群は
$$
I=G_1=G_2=G_1G_2
$$
となる。恒等語を除き、この群に入る処置効果はブロック効果と交絡する。

1個の生成子 $G$ で2ブロックに分ける場合は、$G=+1$ の実施と $G=-1$ の実施を別ブロックへ置く。したがってブロック指標と $G$ の効果列が同一になり、$G$ はブロック差から分離できない。

## 一手／方針
**交絡法では「必要ブロック数 → 独立生成子数 → 生成子と全ての積 → 失われる効果 → 重要効果が守られているか」の順に確認する。**

さらに反復が複数あるなら、ある重要な交互作用を全反復で失う必要があるかを考える。各反復で異なる高次交互作用をブロックと交絡させれば、部分交絡によって交絡していない反復から情報を回復できる。

## 答え
1. ブロック指標をABC列そのもので作っているので
$$
\boxed{ABC\text{ とブロック効果が完全交絡する}}.
$$
ABC=+1の4実施とABC=-1の4実施を別ブロックへ置くため、ブロック差とABC効果を同じデータから分離できない。

2. $k=4,p=2$ だから
$$
2^p=\boxed{4}\text{ブロック},
$$
各ブロックは
$$
2^{4-2}=\boxed{4}\text{実施}
$$
である。

3.
$$
G_1G_2=(AB)(CD)=ABCD
$$
より
$$
I=AB=CD=ABCD.
$$
したがって
$$
\boxed{AB,CD,ABCD}
$$
がブロック効果と交絡する。生成子ABとCDだけでなく、その積ABCDも確認する必要がある。

4. ABを生成子にすると、重要としたAB交互作用をブロック差から分離できなくなる。一方ABCDを生成子にすれば、失うのは4因子交互作用でありABは保護される。したがって
$$
\boxed{ABCD\text{ を選ぶ}}
$$
のが適切である。ただしこれは高次交互作用ABCDを小さいとみなす仮定に依存する。

5. これは**部分交絡**である。反復1ではABCがブロックと交絡するがABDは交絡していないのでABDの情報を得られる。反復2ではABDが交絡するがABCは交絡していないのでABCの情報を得られる。したがって
$$
\boxed{ABC\text{ は反復2、}ABD\text{ は反復1から情報を得られる}}.
$$
全反復で同じ効果を完全に失う代わりに、反復間で情報損失を分散させる設計である。

## 計算例
$2^5$ 計画を8ブロックへ分けるなら
$$
2^p=8\Rightarrow p=3,
$$
1ブロック当たり
$$
2^{5-3}=4
$$
実施である。3個の独立生成子を決めた後は、生成子自身だけでなく全ての積から生じる
$$
2^3-1=7
$$
個の非恒等ブロック語を列挙し、重要効果が含まれないか確認する。

また$2^3$ の2ブロック化でABCを生成子にするのは、「3因子交互作用は主効果や2因子交互作用より小さい」という効果の疎性を利用した典型例である。

## 注意
生成子は互いに独立でなければならない。従属な生成子を追加してもブロック数は期待どおり倍増しない。

「高次交互作用をブロックと交絡させればよい」は絶対則ではない。科学的に重要な効果を先に決め、ブロック定義群にそれらが入らないことを確認する。部分交絡では各効果の情報量が完全に交絡のない計画より少なくなることがある。

一部実施要因計画の別名構造と、完全要因計画をブロック化したときのブロック交絡は、どちらも列の一致を使うが設計目的が異なる。前者は実験点を減らすため、後者は同時に実施できる大きさへ分けるためである。

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
id: engdesign-fixed-effect-hypothesis
title: 固定効果と変量効果を推測対象から判別し分散成分まで読む
category: applied-engineering
subcategory: engineering-design
topic: fixed-random-effects-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 固定効果
  - 変量効果
  - 分散分析
  - 分散成分
  - 級内相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 固定効果
---
## 問題
実験計画における固定効果と変量効果について次を解け。

1. 3種類の触媒A,B,Cそのものの性能差を比較したい。触媒因子は固定効果・変量効果のどちらとして扱うのが自然か。推測対象も述べよ。
2. 多数ある製造ロットから無作為に4ロットを選び、ロット間ばらつきを母集団へ一般化したい。ロット因子はどちらとして扱うのが自然か。
3. $a$ 水準の固定効果一元配置で「主効果なし」の帰無仮説を、平均と効果パラメータの2通りで書け。
4. 変量切片模型
$$
Y_{ij}=\mu+U_i+\varepsilon_{ij},
$$
で $\operatorname{Var}(U_i)=\tau^2=4$、$\operatorname{Var}(\varepsilon_{ij})=\sigma^2=6$ とする。同一群内の2観測の共分散、各観測の分散、級内相関係数を求めよ。
5. 「機械」という同じ因子名でも、固定効果にも変量効果にもなり得る理由を説明せよ。

## 記号・用語
**固定効果**では、実験で採用した水準そのものの平均差・効果が推測対象である。水準効果 $\alpha_i$ は未知だが固定された定数として扱う。

**変量効果**では、観測した水準をより大きな水準母集団からの標本と考え、水準ごとの値そのものより、水準間変動を表す分散成分などが推測対象になる。典型的には
$$
U_i\overset{\mathrm{iid}}{\sim}(0,\tau^2)
$$
と置く。

分類は因子の名前だけで決まらず、**どこまで一般化したいかという推測目的**で決まる。

## 使用公式・定理
固定効果一元配置
$$
Y_{ij}=\mu+\alpha_i+\varepsilon_{ij},
\qquad \sum_{i=1}^a\alpha_i=0
$$
では主効果なしは
$$
H_0:\mu_1=\cdots=\mu_a
$$
と同値に
$$
H_0:\alpha_1=\cdots=\alpha_a=0
$$
と書ける。

変量切片模型
$$
Y_{ij}=\mu+U_i+\varepsilon_{ij},
$$
で $U_i$ と $\varepsilon_{ij}$ が独立、
$$
\operatorname{Var}(U_i)=\tau^2,\qquad
\operatorname{Var}(\varepsilon_{ij})=\sigma^2
$$
なら、同一群内の異なる2観測について
$$
\operatorname{Cov}(Y_{ij},Y_{ik})=\tau^2,
$$
各観測の分散は
$$
\operatorname{Var}(Y_{ij})=\tau^2+\sigma^2.
$$
よって級内相関係数は
$$
\rho=\frac{\tau^2}{\tau^2+\sigma^2}.
$$

## 一手／方針
**固定か変量かは「観測した水準そのものを比べたいのか、それらを母集団からの標本として水準間ばらつきを知りたいのか」で判定する。**

固定効果なら平均差やコントラストを推測し、変量効果ならまず分散成分を読む。変量切片模型が出たら「共通の群効果 $U_i$ が同一群内の共分散を作る」と考える。

## 答え
1. A,B,Cそのものを比較したいので**固定効果**が自然である。推測対象は各触媒水準の母平均や、それらの差・コントラストである。

2. 選んだ4ロット自体の順位より、将来のロットも含むロット間ばらつきを一般化したいので**変量効果**が自然である。推測対象は主としてロット間分散 $\tau^2$ である。

3.
$$
\boxed{H_0:\mu_1=\cdots=\mu_a}
$$
または
$$
\boxed{H_0:\alpha_1=\cdots=\alpha_a=0}.
$$
対立仮説は「少なくとも1つの水準平均が異なる」である。

4. 同じ群の2観測は $U_i$ を共有するので
$$
\operatorname{Cov}(Y_{ij},Y_{ik})=\tau^2=\boxed{4}.
$$
各観測の分散は
$$
4+6=\boxed{10}.
$$
したがって
$$
\rho=\frac4{10}=\boxed{0.4}.
$$
全変動の40%が群共有の変動に由来すると読める。

5. 例えば「この3台の機械そのものを比較したい」なら機械は固定効果になりやすい。一方「多数ある同型機から3台を抽出し、機械間ばらつきを推定したい」なら変量効果になりやすい。同じ因子名でも、推測対象と水準の選び方が違えば扱いは変わる。

## 計算例
変量切片模型で $\tau^2=1,\sigma^2=9$ なら
$$
\rho=\frac1{10}=0.1,
$$
なので同一群内相関は弱い。逆に $\tau^2=9,\sigma^2=1$ なら
$$
\rho=0.9,
$$
で、同一群の観測は強く似る。

固定効果では、例えば触媒A,B,Cの平均が $(10,12,15)$ なら、主効果なしの仮説は「10,12,15という標本値が等しいか」ではなく、対応する母平均が等しいかを検定する。

## 注意
固定効果・変量効果は「水準数が少ないから固定、多いから変量」と機械的に決めない。水準の選び方と推測対象が本質である。

変量効果の分散成分に対する $H_0:\tau^2=0$ は母数空間の境界にあるため、通常の内部点の検定と同じ漸近論をそのまま使えない場合がある。統計検定1級の理工学対策では、まず固定効果は水準差、変量効果は水準間分散を推測するという役割の違いを優先して押さえる。

BLUPによる個別群効果の予測や変量傾きモデルは、この基本判別より発展的な論点なので別途必要なときに扱う。

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
title: 分割法を2段階無作為化から誤差自由度まで解く
category: applied-engineering
subcategory: engineering-design
topic: split-plot-workflow-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 実験計画法
  - 分割法
  - 無作為化
  - 誤差項
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
---
## 問題
反復ブロック数 $r=4$ の実験で、温度Aは炉運転単位でしか変更できず $a=3$ 水準、材料Bは各炉運転内の試験片ごとに変更でき $b=2$ 水準である。
1. 一次実験単位と二次実験単位を特定し、適切な2段階無作為化を説明せよ。
2. A、B、ABを検定するときに使う誤差項を区別せよ。
3. ブロック、A、一次誤差、B、AB、二次誤差の自由度を求め、全自由度と一致することを確認せよ。

## 記号・用語
分割法では、変更困難因子Aを受ける大きな単位を**一次実験単位（whole plot）**、その内部で変更容易因子Bを受ける小さな単位を**二次実験単位（subplot）**と呼ぶ。無作為化が2段階なので、Aに対する一次誤差とB・ABに対する二次誤差が生じる。

## 使用公式・定理
各ブロック内にAの $a$ 水準を一次単位へ無作為化し、各一次単位内でBの $b$ 水準を二次単位へ無作為化する。

平衡な分割法では自由度は
$$
df_{\mathrm{block}}=r-1,
\qquad df_A=a-1,
$$
$$
df_{E_A}=(r-1)(a-1),
$$
$$
df_B=b-1,
\qquad df_{AB}=(a-1)(b-1),
$$
$$
df_{E_B}=a(r-1)(b-1).
$$
全観測数は $rab$ なので全自由度は $rab-1$ である。Aは一次誤差 $E_A$、BとABは二次誤差 $E_B$ を分母にして検定する。

## 一手／方針
**まず「どの因子をどの単位で無作為化したか」を読む。** その階層が分かれば、Aには一次単位間の誤差、BとABには一次単位内の誤差を対応させられる。自由度公式を先に暗記しない。

## 答え
1. 炉運転が一次実験単位、各炉運転内の試験片が二次実験単位である。各ブロック内で温度Aを炉運転へ無作為化し、次に各炉運転内で材料Bを試験片へ無作為化する。

2. Aは一次誤差 $E_A$ で検定する。BとABは二次誤差 $E_B$ で検定する。同じ誤差平均平方を3つすべてへ使ってはいけない。

3. $r=4,a=3,b=2$ より
$$
df_{\mathrm{block}}=3,\qquad df_A=2,
$$
$$
df_{E_A}=3\cdot2=6,
$$
$$
df_B=1,\qquad df_{AB}=2\cdot1=2,
$$
$$
df_{E_B}=3\cdot3\cdot1=9.
$$
合計は
$$
3+2+6+1+2+9=23.
$$
一方、全観測数は $4\cdot3\cdot2=24$ なので全自由度は $24-1=23$ となり一致する。

## 計算例
Aを2水準、Bを3水準、反復ブロックを5個とすると、一次誤差自由度は
$$
(5-1)(2-1)=4,
$$
二次誤差自由度は
$$
2(5-1)(3-1)=16.
$$
Bの測定数が多くても、Aの実質的な反復数は一次実験単位数で決まる。

## 注意
分割法で最重要なのは「試験片が多いからAの標本サイズも大きい」と誤認しないこと。Aの独立な反復は炉運転などの一次実験単位である。欠測・不釣合い・より複雑な無作為化では単純な自由度分解が崩れるため、混合モデルとして扱うのが自然である。

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
