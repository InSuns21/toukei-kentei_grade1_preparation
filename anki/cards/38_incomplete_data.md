---
id: inc-mcar-mar-mnar
title: MCAR・MAR・MNARを条件付き確率で区別する
category: math-data-analysis
subcategory: math-incomplete-data
topic: missing-mechanisms
type: formula
difficulty: 3
priority: B
hashtags: [欠測, MCAR, MAR, MNAR]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
完全データを $Y=(Y_{obs},Y_{mis})$、観測指標をRとしてMCAR・MAR・MNARを表せ。

## 記号・用語
- MAR：観測データを条件とすると、欠測確率が未観測値に依存しない欠測機構
- MCAR：観測値・未観測値のいずれにも欠測確率が依存しない欠測機構
- MNAR：観測データを条件としても、欠測確率が未観測値に依存する欠測機構

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

MARは「欠測が無条件に無作為」ではなく、観測済み情報で条件付けた後に未観測値へ依存しないこと。

## 答え
完全に無作為な欠測（MCAR）は
$$P(R\mid Y_{obs},Y_{mis})=P(R).$$
無作為な欠測（MAR）は
$$P(R\mid Y_{obs},Y_{mis})=P(R\mid Y_{obs}).$$
これが成立せず、未観測値に依存するのがMNAR。

## 計算例
年齢を観測済みとして、欠測確率が年齢だけに依存すればMARになり得る。

## 注意
欠測機構は観測データだけから一般に完全には識別できない。
<!-- CARD -->

---
id: inc-missing-indicator-likelihood
title: 欠測指標を含む完全データ分布を因数分解する
category: math-data-analysis
subcategory: math-incomplete-data
topic: missing-factorization
type: formula
difficulty: 3
priority: C
hashtags: [欠測機構, 尤度, 因数分解]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
データモデルの母数を $\theta$、欠測機構の母数を $\psi$ として同時分布を因数分解せよ。

## 記号・用語
- MAR：観測データを条件とすると、欠測確率が未観測値に依存しない欠測機構

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

観測データ密度は完全データ同時密度の未観測成分に関する周辺化。

## 答え
選択モデルでは
$$f(Y,R;\theta,\psi)=f(Y;\theta)P(R\mid Y;\psi).$$
観測データ尤度は未観測成分を積分・総和して
$$L(\theta,\psi)=\int f(Y_{obs},Y_{mis};\theta)P(R\mid Y_{obs},Y_{mis};\psi)\,dY_{mis}.$$

## 計算例
離散未観測値なら積分を総和へ置き換える。

## 注意
MARと母数の分離条件の下では尤度推測で欠測機構を無視できる場合がある。
<!-- CARD -->

---
id: inc-complete-case-bias
title: 完全ケース解析が不偏になる条件を判定する
category: math-data-analysis
subcategory: math-incomplete-data
topic: complete-case
type: recognition
difficulty: 3
priority: C
hashtags: [完全ケース解析, 欠測バイアス, MCAR]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
標本平均を完全ケースだけで計算して母平均を推定する。どの条件なら一般に不偏か。

## 記号・用語
- MAR：観測データを条件とすると、欠測確率が未観測値に依存しない欠測機構
- MCAR：観測値・未観測値のいずれにも欠測確率が依存しない欠測機構

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

選択された標本の平均は $E[Y\mid R=1]$ を推定する。

## 答え
観測指標RがYと独立なMCARなら
$$E[Y\mid R=1]=E[Y]$$
なので完全ケース平均は母平均に対して不偏。MARでも欠測がY自身と関連する構造では単純平均が偏り得る。

## 計算例
高い測定値ほど欠測しやすいなら観測平均は低く偏る。

## 注意
不偏でも完全ケースを捨てるため効率は低下する。
<!-- CARD -->

---
id: inc-mean-imputation-variance
title: 平均値代入が分散を過小評価する理由を計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: mean-imputation
type: calc_step
difficulty: 2
priority: C
hashtags: [平均値代入, 分散, 欠測]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
観測値が $(1,3)$、1値が欠測している。観測平均2を単一代入したデータ $(1,3,2)$ の偏差平方和を、観測2値だけの平方和と比べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

平均値代入は欠測値の代入誤差を0として扱う。

## 答え
どちらも中心は2。観測値だけでは
$$SS=(1-2)^2+(3-2)^2=2.$$
平均値代入後も
$$SS=(1-2)^2+(3-2)^2+(2-2)^2=2$$
で、標本数だけ増える。したがって分母で割る分散は小さくなり、不確実性を過小評価する。

## 計算例
代入後の不偏分散は $2/(3-1)=1$、観測2値では $2/(2-1)=2$。

## 注意
単一代入後の通常の標準誤差は代入不確実性を反映しない。
<!-- CARD -->

---
id: inc-ipw-mean
title: 逆確率重み付き平均を計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: inverse-probability-weighting
type: calc_step
difficulty: 3
priority: C
hashtags: [逆確率重み付け, 欠測, MAR]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
観測された値が $Y=(2,6)$、観測確率が $\pi=(0.5,1)$。Horvitz–Thompson型の母平均推定量を、元の対象数N=3として求めよ。

## 記号・用語
- IPW：逆確率重み付け（inverse probability weighting）
- $R_i$：対象 $i$ の応答が観測されたとき1、欠測なら0となる指示変数
- $X_i$：観測確率のモデルに用いる共変量
- $\pi_i=P(R_i=1\mid X_i)$：対象 $i$ の観測確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

欠測が共変量を条件として応答値に依存しないMAR条件
$$P(R_i=1\mid Y_i,X_i)=P(R_i=1\mid X_i)=\pi_i>0$$
と、正しい観測確率モデルを仮定する。このとき
$$E\left[\frac{R_iY_i}{\pi_i}\middle|Y_i,X_i\right]
=\frac{Y_i}{\pi_i}E(R_i\mid Y_i,X_i)
=\frac{Y_i}{\pi_i}\pi_i=Y_i.$$
したがってHorvitz–Thompson型の母平均推定量は
$$\widehat\mu_{\mathrm{IPW}}
=\frac1N\sum_{i=1}^N\frac{R_iY_i}{\pi_i}
=\frac1N\sum_{i:R_i=1}\frac{Y_i}{\pi_i}.$$

## 答え
$$\widehat\mu_{IPW}=\frac1N\sum_{i:R_i=1}\frac{Y_i}{\pi_i}
=\frac13\left(\frac2{0.5}+\frac6{1}\right)=\frac{10}{3}.$$

## 計算例
観測されにくい最初の値へ重み2を与える。

## 注意
極端に小さい観測確率は分散を大きくする。
<!-- CARD -->

---
id: inc-em-observed-likelihood
title: EM法のEステップを欠測データへ適用する
category: math-data-analysis
subcategory: math-incomplete-data
topic: em-missing-data
type: formula
difficulty: 4
priority: C
hashtags: [EM法, 欠測データ, 完全データ尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
観測データ $Y_{obs}$、欠測データ $Y_{mis}$ に対するEM法のQ関数を書け。

## 記号・用語
- EM：期待値最大化（expectation–maximization）法

## 使用公式・定理
現在値 $\theta^{(t)}$ の下で、EM法のEステップは完全データ対数尤度の条件付き期待値
$$
Q(\theta\mid\theta^{(t)})
=E_{\theta^{(t)}}[\log f(Y_{obs},Y_{mis};\theta)\mid Y_{obs}]
$$
を作る。

2成分混合分布
$$
f(x)=\pi f_1(x)+(1-\pi)f_2(x)
$$
で潜在所属指標を $Z\in\{0,1\}$ とすると、Eステップで必要な条件付き期待値は
$$
r(x)=E[Z\mid X=x]
=P(Z=1\mid X=x)
=\frac{\pi f_1(x)}{\pi f_1(x)+(1-\pi)f_2(x)}.
$$
完全データ対数尤度に現れる $Z$ を $r(x)$、$1-Z$ を $1-r(x)$ で置き換えて $Q$ を作る。

## 一手
潜在カテゴリや欠測指標があるときは、まず「完全データなら何を数えるか」を書き、その0/1指標を現在の母数の下での条件付き期待値、すなわち事後所属確率へ置き換える。

## 答え
EM法では
$$
Q(\theta\mid\theta^{(t)})
=E_{\theta^{(t)}}[\log f(Y_{obs},Y_{mis};\theta)\mid Y_{obs}]
$$
をEステップで計算し、Mステップで $Q$ を最大化する。混合分布では潜在所属の0/1指標を事後所属確率（負担率）で置き換えるのがEステップの具体形である。

## 計算例
2成分混合で、現在値において
$$
\pi=0.4,\qquad f_1(x)=0.3,\qquad f_2(x)=0.1
$$
とする。まず成分1から観測 $x$ が出る同時重みは
$$
\pi f_1(x)=0.4\times0.3=0.12.
$$
成分2から出る同時重みは
$$
(1-\pi)f_2(x)=0.6\times0.1=0.06.
$$
したがって観測 $x$ の全重みは
$$
0.12+0.06=0.18,
$$
成分1の負担率は
$$
r(x)=\frac{0.12}{0.18}=\frac23.
$$
よって完全データで $Z=1$ と数えていた箇所を、Eステップでは $E[Z\mid x]=2/3$ として扱う。

## 注意
負担率は「成分1に確定所属した」という意味ではなく、現在の母数値に基づく条件付き期待値である。EMは観測データ尤度を減少させないが局所最大点へ収束し得るため、初期値依存にも注意する。
<!-- CARD -->

---
id: inc-multiple-imputation-rubin
title: 多重代入のRubin則で分散を合成する
category: math-data-analysis
subcategory: math-incomplete-data
topic: multiple-imputation
type: calc_step
difficulty: 4
priority: C
hashtags: [多重代入, Rubin則, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 欠測（欠損） }]
---

## 問題
m個の代入推定値 $\widehat\theta_l$ と分散推定値 $U_l$ から合成推定量と全分散を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全分散は代入内分散と代入間分散を合成する。

## 答え
$$\overline\theta=\frac1m\sum_l\widehat\theta_l,\qquad
\overline U=\frac1m\sum_lU_l,$$
$$B=\frac1{m-1}\sum_l(\widehat\theta_l-\overline\theta)^2,$$
$$T=\overline U+\left(1+\frac1m\right)B.$$

## 計算例
m=5、$\overline U=4,B=1$ なら $T=4+1.2=5.2$。

## 注意
単一代入はBを推定できず、欠測による不確実性を落とす。
<!-- CARD -->

---
id: surv-censoring-definition
title: 右・左・区間打ち切りを区別する
category: math-data-analysis
subcategory: math-incomplete-data
topic: censoring-types
type: recognition
difficulty: 2
priority: C
hashtags: [打ち切り, 右打ち切り, 区間打ち切り]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 打ち切り }]
---

## 問題
右打ち切り・左打ち切り・区間打ち切りで寿命Tについて分かる不等式を書け。

## 記号・用語
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

尤度寄与は順に $S(C)$、$F(C)$、$F(R)-F(L)$。

## 答え
右打ち切り時点Cでは $T>C$、左打ち切り時点Cでは $T\le C$、区間 $(L,R]$ では $L<T\le R$ とだけ分かる。

## 計算例
最終追跡時に未発症なら右打ち切り。

## 注意
打ち切り対象は標本に含まれ、事象時刻だけが不完全。
<!-- CARD -->

---
id: surv-right-censored-likelihood
title: 右打ち切りデータの尤度を構成する
category: math-data-analysis
subcategory: math-incomplete-data
topic: censored-likelihood
type: formula
difficulty: 3
priority: C
hashtags: [右打ち切り, 尤度, 生存関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 右打ち切りデータの尤度 }]
---

## 問題
$X_i=\min(T_i,C_i)$、$\delta_i=\boldsymbol1_{\{T_i\le C_i\}}$ とする。独立な非情報打ち切りの下でTに関する尤度を書け。

## 記号・用語
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

非情報打ち切りでは打ち切り分布に関する因子をTの母数尤度から分離できる。

## 答え
$$L(\theta)=\prod_{i=1}^n f(X_i;\theta)^{\delta_i}S(X_i;\theta)^{1-\delta_i}.$$
事象観測なら密度、右打ち切りならその時点を超えて生存する確率が寄与する。

## 計算例
観測 $(x,\delta)=(2,1)$ はf(2)、$(3,0)$ はS(3)を掛ける。

## 注意
打ち切りを単なる事象なしとして除外しない。
<!-- CARD -->

---
id: surv-exponential-censored-mle
title: 右打ち切り指数モデルの最尤推定量を導く
category: math-data-analysis
subcategory: math-incomplete-data
topic: exponential-censored-mle
type: calc_step
difficulty: 3
priority: B
hashtags: [指数分布, 右打ち切り, 最尤推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数分布の生存モデル }]
---

## 問題
指数率 $\lambda$、観測 $(x_i,\delta_i)$ の最尤推定量を求めよ。

## 記号・用語
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事象数を総リスク時間で割る。

## 答え
$f(x)=\lambda e^{-\lambda x}$、$S(x)=e^{-\lambda x}$ より
$$L(\lambda)=\lambda^{\sum_i\delta_i}\exp\left(-\lambda\sum_ix_i\right).$$
対数微分を0とすると
$$\frac{\sum_i\delta_i}{\lambda}-\sum_ix_i=0,$$
$$\widehat\lambda=\frac{\sum_i\delta_i}{\sum_ix_i}.$$

## 計算例
事象3件、総観測時間12なら $\widehat\lambda=0.25$。

## 注意
全員打ち切りで事象0件なら有限の正の最尤推定値は得られない。
<!-- CARD -->

---
id: surv-type-i-type-ii-censoring
title: I型・II型打ち切りを区別する
category: math-data-analysis
subcategory: math-incomplete-data
topic: censoring-designs
type: recognition
difficulty: 2
priority: C
hashtags: [I型打ち切り, II型打ち切り, 実験計画]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 打ち切り }]
---

## 問題
I型右打ち切りとII型右打ち切りの停止規則を述べよ。

## 記号・用語
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

I型では事象数が確率的、II型では終了時刻が確率的。

## 答え
I型はあらかじめ定めた時点Cで実験を終了する。II型はあらかじめ定めたr件の事象が観測された時点 $T_{(r)}$ で終了する。

## 計算例
1年間追跡はI型、10故障まで試験はII型。

## 注意
停止規則に応じて尤度の定数因子や標本空間が異なる。
<!-- CARD -->

---
id: surv-truncation-density
title: トランケーション後の条件付き密度を書く
category: math-data-analysis
subcategory: math-incomplete-data
topic: truncation-density
type: formula
difficulty: 3
priority: C
hashtags: [トランケーション, 条件付き密度, 選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トランケーション }]
---

## 問題
連続変数Xが集合Aに入った個体だけ観測されるとき、観測値の密度を書け。

## 記号・用語
- トランケーション：条件を満たす個体だけが観測標本へ入る仕組み
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

条件付き密度の定義。

## 答え
$$f_{X\mid X\in A}(x)=\frac{f_X(x)\boldsymbol1_A(x)}{P(X\in A)}.$$
尤度では各観測の密度を選択確率で割る。

## 計算例
左トランケーション $X>L$ なら分母は $S(L)$。

## 注意
観測されなかった個体は標本に現れない点が打ち切りと異なる。
<!-- CARD -->

---
id: surv-left-truncated-exponential
title: 左トランケーション指数分布の尤度寄与を計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: left-truncation
type: calc_step
difficulty: 3
priority: C
hashtags: [左トランケーション, 指数分布, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トランケーション }]
---

## 問題
率 $\lambda>0$ の指数分布 $T\sim\operatorname{Exp}(\lambda)$ で $T>L$ の個体だけ観測され、時刻 $t>L$ で事象が起きた。尤度寄与を求めよ。

## 記号・用語
- トランケーション：条件を満たす個体だけが観測標本へ入る仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

左トランケーションでは密度を選択確率 $P(T>L)=S(L)$ で割る。

## 答え
$$f(t\mid T>L)=\frac{\lambda e^{-\lambda t}}{e^{-\lambda L}}
=\lambda e^{-\lambda(t-L)}.$$

## 計算例
L=2,t=5なら寄与は $\lambda e^{-3\lambda}$。

## 注意
指数分布では無記憶性により経過時間 $t-L$ が再び指数分布。
<!-- CARD -->

---
id: surv-censoring-vs-truncation
title: 打ち切りとトランケーションを尤度で区別する
category: math-data-analysis
subcategory: math-incomplete-data
topic: censoring-vs-truncation
type: recognition
difficulty: 2
priority: C
hashtags: [打ち切り, トランケーション, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トランケーション }]
---

## 問題
右打ち切りCと左トランケーションLの尤度寄与の違いを述べよ。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合
- トランケーション：条件を満たす個体だけが観測標本へ入る仕組み
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

打ち切りは不完全観測、トランケーションは選択された標本。

## 答え
右打ち切り個体は観測され、事象時刻がCを超えるので $S(C)$ を寄与する。左トランケーション個体は $T>L$ の場合だけ標本へ入り、観測密度を $S(L)$ で割る。

## 計算例
登録前に事象が起きた個体が研究へ入らないのは左トランケーション。

## 注意
両方ある場合はリスク集合への遅延参加と右打ち切りを同時に扱う。
<!-- CARD -->

---
id: surv-kaplan-meier-formula
title: Kaplan–Meier推定量を積極限で書く
category: math-data-analysis
subcategory: math-incomplete-data
topic: kaplan-meier
type: formula
difficulty: 3
priority: C
hashtags: [Kaplan-Meier推定量, 生存関数, リスク集合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Kaplan–Meier推定量 }]
---

## 問題
異なる事象時刻 $t_j$ 直前のリスク集合サイズを $n_j$、事象数を $d_j$ として生存関数推定量を書け。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

時刻 $t_j$ の直前まで追跡中という条件の下で、その時刻を越えて生存する確率を $(n_j-d_j)/n_j$ で推定し、事象時刻ごとに掛け合わせる積極限法を用いる。

## 答え
$$\widehat S(t)=\prod_{t_j\le t}\left(1-\frac{d_j}{n_j}\right).$$
各因子は時刻 $t_j$ を生き残る条件付き確率の推定値。

## 計算例
打ち切り時刻では積を下げず、その後のリスク集合から除く。

## 注意
事象と同時刻の打ち切りの処理規約を明示する。
<!-- CARD -->

---
id: surv-kaplan-meier-numeric
title: Kaplan–Meier生存率を数値で計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: kaplan-meier-numeric
type: calc_step
difficulty: 3
priority: C
hashtags: [Kaplan-Meier推定量, 数値計算, 打ち切り]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Kaplan–Meier推定量 }]
---

## 問題
事象時刻1で $n_1=5,d_1=1$、時刻2で1人打ち切り、時刻3で $n_2=3,d_2=1$。時刻3直後のKM推定値を求めよ。

## 記号・用語
- KM：Kaplan–Meier法
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

打ち切りは生存率を直接下げないが、後のリスク集合を減らす。

## 答え
$$\widehat S(3)=\left(1-\frac15\right)\left(1-\frac13\right)
=\frac45\cdot\frac23=\frac8{15}\approx0.533.$$

## 計算例
時刻1直後は0.8、時刻2の打ち切り後も0.8。

## 注意
n2には時刻1の事象と時刻2の打ち切りを除いた3人が入る。
<!-- CARD -->

---
id: surv-greenwood-formula
title: Greenwood公式でKM推定量の分散を求める
category: math-data-analysis
subcategory: math-incomplete-data
topic: greenwood
type: formula
difficulty: 4
priority: C
hashtags: [Greenwoodの公式, Kaplan-Meier推定量, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Greenwoodの公式（基本） }]
---

## 問題
Kaplan–Meier推定量のGreenwood分散推定式を書け。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

積の対数を用いたデルタ法に基づく近似。

## 答え
$$\widehat{\operatorname{Var}}\{\widehat S(t)\}
=\widehat S(t)^2\sum_{t_j\le t}\frac{d_j}{n_j(n_j-d_j)}.$$

## 計算例
リスク集合が小さく $n_j-d_j$ が小さい時刻ほど分散寄与が大きい。

## 注意
末尾で全員が事象となる場合は分母0となり通常の式を適用できない。
<!-- CARD -->

---
id: surv-greenwood-numeric
title: Greenwood分散を数値で計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: greenwood-numeric
type: calc_step
difficulty: 4
priority: C
hashtags: [Greenwoodの公式, 数値計算, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Greenwoodの公式（基本） }]
---

## 問題
$\widehat S=8/15$、事象時点が $(n,d)=(5,1),(3,1)$ のGreenwood分散を求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\widehat{\operatorname{SE}}=\widehat S\sqrt{\sum d_j/[n_j(n_j-d_j)]}$。

## 答え
$$\sum\frac{d}{n(n-d)}=\frac1{5\cdot4}+\frac1{3\cdot2}
=\frac1{20}+\frac16=\frac{13}{60}.$$
$$\widehat{\operatorname{Var}}(\widehat S)=\left(\frac8{15}\right)^2\frac{13}{60}
=\frac{208}{3375}\approx0.0616.$$

## 計算例
標準誤差は約 $\sqrt{0.0616}=0.248$。

## 注意
小標本の対称な正規区間は0〜1を外れ得る。
<!-- CARD -->

---
id: surv-logrank-statistic
title: log-rank検定の観測数と期待数を構成する
category: math-data-analysis
subcategory: math-incomplete-data
topic: logrank
type: formula
difficulty: 4
priority: C
hashtags: [log-rank検定, リスク集合, 期待事象数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: log-rank検定 }]
---

## 問題
各事象時刻jで群1のリスク数 $n_{1j}$、全リスク数 $n_j$、全事象数 $d_j$ とする。群1の期待事象数を書け。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合
- ハザード：その時点まで生存した条件の下での瞬間的な事象発生率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各時刻で周辺和を固定した超幾何分散を加える。

## 答え
帰無仮説下では事象がリスク集合に比例配分されるので
$$E_{1j}=d_j\frac{n_{1j}}{n_j},\qquad
O_1-E_1=\sum_j(d_{1j}-E_{1j}).$$
各時刻の超幾何分散を加えた
$$V=\sum_j\frac{d_j(n_j-d_j)n_{1j}(n_j-n_{1j})}{n_j^2(n_j-1)}$$
で標準化し
$$Z=(O_1-E_1)/\sqrt V$$
を用いる。

## 計算例
n1=6,n=10,d=1なら群1の期待事象数は0.6。

## 注意
群差が比例ハザード的に持続するとき効率がよい。
<!-- CARD -->

---
id: surv-logrank-numeric
title: 1時点のlog-rank寄与を計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: logrank-numeric
type: calc_step
difficulty: 4
priority: C
hashtags: [log-rank検定, 超幾何分散, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: log-rank検定 }]
---

## 問題
ある事象時点で $(n_1,n_0)=(6,4)$、全事象数d=2、群1事象数 $d_1=2$。群1の $O-E$ と分散寄与を求めよ。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

複数時点ではO-EとVを各時点について加える。

## 答え
$$E_1=2\cdot\frac6{10}=1.2,\qquad O-E=2-1.2=0.8.$$
超幾何分散は
$$V=\frac{n_1n_0d(n-d)}{n^2(n-1)}
=\frac{6\cdot4\cdot2\cdot8}{10^2\cdot9}
=\frac{384}{900}\approx0.427.$$

## 計算例
この1時点だけならZは $0.8/\sqrt{0.427}\approx1.225$。

## 注意
同時事象の扱いを含め、リスク集合を各時点直前で数える。
<!-- CARD -->

---
id: surv-cox-model
title: Cox比例ハザードモデルを書く
category: math-data-analysis
subcategory: math-incomplete-data
topic: cox-model
type: formula
difficulty: 3
priority: C
hashtags: [Cox比例ハザードモデル, ハザード比, 共変量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Cox比例ハザードモデル }]
---

## 問題
共変量ベクトルxに対するCox比例ハザードモデルを書け。

## 記号・用語
- ハザード：その時点まで生存した条件の下での瞬間的な事象発生率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

2個体xとx*のハザード比は
$$\frac{h(t\mid x)}{h(t\mid x^*)}=\exp\{\beta^{\mathsf T}(x-x^*)\}$$
で時刻tに依存しない。

## 答え
$$h(t\mid x)=h_0(t)\exp(\beta^{\mathsf T}x),$$
ここで $h_0(t)$ は形を特定しないベースラインハザード。

## 計算例
二値治療Xの係数が $\log0.7$ なら治療群のハザードは0.7倍。

## 注意
ハザード比を生存確率比と同一視しない。
<!-- CARD -->

---
id: surv-cox-partial-likelihood
title: Cox部分尤度の1事象寄与を書く
category: math-data-analysis
subcategory: math-incomplete-data
topic: cox-partial-likelihood
type: formula
difficulty: 4
priority: C
hashtags: [Cox比例ハザードモデル, 部分尤度, リスク集合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Cox比例ハザードモデル }]
---

## 問題
時刻 $t_j$ に個体 $i_j$ が単独で事象を起こし、直前リスク集合を $R(t_j)$ とする。部分尤度寄与を書け。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合
- ハザード：その時点まで生存した条件の下での瞬間的な事象発生率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

その時刻に誰が事象を起こすかの条件付き確率。

## 答え
$$\frac{\exp(\beta^{\mathsf T}x_{i_j})}
{\sum_{l\in R(t_j)}\exp(\beta^{\mathsf T}x_l)}.$$
全事象時刻について積を取ると、ベースラインハザード $h_0(t)$ が消去された部分尤度になる。

## 計算例
リスク集合の線形予測子が $(0,\log2)$ で第2個体が事象なら寄与は $2/(1+2)=2/3$。

## 注意
同時事象にはBreslow法などの近似が必要。
<!-- CARD -->

---
id: surv-hazard-ratio-interpretation
title: Cox係数からハザード比を計算する
category: math-data-analysis
subcategory: math-incomplete-data
topic: hazard-ratio
type: calc_step
difficulty: 2
priority: C
hashtags: [ハザード比, Cox比例ハザードモデル, 回帰係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ハザード比 }]
---

## 問題
Coxモデルで連続共変量Xの係数が $\beta=0.20$。Xが3増えるハザード比を求めよ。

## 記号・用語
- HR：ハザード比（hazard ratio）
- ハザード：その時点まで生存した条件の下での瞬間的な事象発生率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

共変量差 $\Delta x$ に対するハザード比は $e^{\beta\Delta x}$。

## 答え
$$HR=\exp\{\beta\cdot3\}=e^{0.6}\approx1.82.$$

## 計算例
瞬間事象率が約82%高い。

## 注意
累積発生確率が82%高いという意味ではない。
<!-- CARD -->

---
id: surv-proportional-hazards-check
title: 比例ハザード仮定の破れを判定する
category: math-data-analysis
subcategory: math-incomplete-data
topic: proportional-hazards
type: recognition
difficulty: 3
priority: C
hashtags: [比例ハザード仮定, Cox比例ハザードモデル, 診断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 比例ハザード仮定 }]
---

## 問題
Coxモデルの比例ハザード仮定と代表的な診断法を述べよ。

## 記号・用語
- ハザード：その時点まで生存した条件の下での瞬間的な事象発生率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

時変効果なら $h(t\mid x)=h_0(t)\exp\{\beta(t)x\}$ と表され、通常の比例性が破れる。

## 答え
共変量差に対するハザード比が時刻によらず一定であること。Schoenfeld残差と時刻の系統的関連、または群別 $\log\{-\log\widehat S(t)\}$ 曲線が概ね平行かを調べる。

## 計算例
曲線が明確に交差する場合は非比例の疑い。

## 注意
検定結果だけでなく図と科学的時間尺度も確認する。
<!-- CARD -->

---
id: surv-delayed-entry-risk-set
title: 左トランケーションでリスク集合を作る
category: math-data-analysis
subcategory: math-incomplete-data
topic: delayed-entry
type: calc_step
difficulty: 3
priority: C
hashtags: [左トランケーション, 遅延参加, リスク集合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トランケーション }]
---

## 問題
個体iの研究参加時刻を $L_i$、退出時刻を $X_i$ とする。事象時刻tのリスク集合への包含条件を書け。

## 記号・用語
- リスク集合：各事象時点の直前に、まだ事象を経験せず観察対象である個体の集合
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

遅延参加を無視すると、観測されるまで生存したという選択を無視することになる。

## 答え
$$i\in R(t)\quad\Longleftrightarrow\quad L_i<t\le X_i.$$
参加前は観測対象でなく、参加後かつ事象・打ち切り前だけリスク集合へ入る。

## 計算例
$L_i=3,X_i=8$ の個体はt=2では非加入、t=5では加入。

## 注意
時刻端点の不等号はデータ処理規約と同時事象規約に合わせる。
<!-- CARD -->
