---
id: bayes-density-formula
title: ベイズの公式を密度で書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-density
type: formula
difficulty: 2
priority: A
hashtags: [ベイズ統計, 事前分布, 事後分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 事前分布・尤度・事後分布 }]
---

## 問題
母数 $\theta$ の事前密度 $\pi(\theta)$ と観測xの尤度 $f(x\mid\theta)$ から事後密度を書け。周辺尤度は $0<m(x)<\infty$ とする。

## 記号・用語
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率

## 使用公式・定理
連続母数では
$$
\pi(\theta\mid x)
=\frac{f(x\mid\theta)\pi(\theta)}{m(x)},
\qquad
m(x)=\int f(x\mid u)\pi(u)\,du.
$$
離散仮説 $H_k$ では積分が和になり
$$
P(x)=\sum_k P(x\mid H_k)P(H_k),
$$
$$
P(H_j\mid x)
=\frac{P(x\mid H_j)P(H_j)}{P(x)}.
$$
$\propto_{\theta}$ で核だけを見る段階では $\theta$ に依存しない正の因子を落としてよいが、周辺尤度やベイズファクターの計算では勝手に落とさない。

## 一手
ベイズ更新ではまず
$$
\text{事後分布}\propto_{\theta}\text{尤度}\times\text{事前分布}
$$
と書き、母数 $\theta$ に依存する因子だけで分布の核を同定する。最終的な確率や密度が必要なら、周辺尤度で正規化する。

## 答え
$$
\pi(\theta\mid x)
=\frac{f(x\mid\theta)\pi(\theta)}
{\int f(x\mid u)\pi(u)\,du}.
$$
分布族の同定だけなら
$$
\pi(\theta\mid x)\propto_{\theta}f(x\mid\theta)\pi(\theta)
$$
として母数に依存しない因子を省ける。

## 計算例
離散仮説 $H_1,H_0$ について
$$
P(H_1)=0.3,\qquad P(H_0)=0.7,
$$
$$
P(x\mid H_1)=0.8,\qquad P(x\mid H_0)=0.2
$$
とする。まず周辺確率は
$$
\begin{aligned}
P(x)
&=P(x\mid H_1)P(H_1)+P(x\mid H_0)P(H_0)\\
&=0.8\times0.3+0.2\times0.7\\
&=0.24+0.14\\
&=0.38.
\end{aligned}
$$
したがって
$$
\begin{aligned}
P(H_1\mid x)
&=\frac{0.8\times0.3}{0.38}\\
&=\frac{0.24}{0.38}\\
&=\frac{12}{19}\\
&\approx0.632.
\end{aligned}
$$
連続母数でも分母を積分で作るだけで同じ構造である。

## 注意
「尤度に比例する」段階と「正規化済みの事後分布」を区別する。二項尤度の組合せ係数のように母数へ依存しない因子は事後分布の核を求めるときには落とせるが、モデル間の周辺尤度を比較するベイズファクターではモデルごとの定数を保存する。

<!-- CARD -->

---
id: bayes-normal-credible-interval
title: 正規事後分布の信用区間を計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: credible-interval-normal
type: calc_step
difficulty: 2
priority: A
hashtags: [ベイズ統計, 信用区間, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信用区間と信頼区間の違い }]
---

## 問題
事後分布が正規分布 $\theta\mid x\sim N(2.4,0.8)$ のとき、等裾95%信用区間を求めよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規分布の中央95%点は平均 $\pm z_{0.975}$×標準偏差。

## 答え
事後標準偏差は $\sqrt{0.8}\approx0.8944$ なので
$$2.4\pm1.96\sqrt{0.8}
\approx2.4\pm1.753,$$
$$[0.647,4.153].$$

## 計算例
事後確率 $P(0.647\le\theta\le4.153\mid x)=0.95$。

## 注意
第2母数0.8は分散。

<!-- CARD -->

---
id: bayes-beta-equal-tail-interval
title: ベータ事後分布の等裾信用区間を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: credible-interval-beta
type: formula
difficulty: 3
priority: B
hashtags: [ベイズ統計, 信用区間, ベータ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信用区間と信頼区間の違い }]
---

## 問題
$p\mid x\sim\operatorname{Beta}(\alpha,\beta)$ の等裾 $100(1-\gamma)$%信用区間を書け。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事後分布の分位点定義。

## 答え
事後分布の分位点を $q_u$ とすると
$$[q_{\gamma/2},q_{1-\gamma/2}],$$
かつ
$$P(p<q_{\gamma/2}\mid x)=P(p>q_{1-\gamma/2}\mid x)=\frac\gamma2.$$

## 計算例
95%区間なら2.5%点と97.5%点。

## 注意
正規近似で台 $[0,1]$ を外れる場合はBeta分位点を直接使う。

<!-- CARD -->

---
id: bayes-hpd-interval
title: HPD信用領域を定義する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: hpd-region
type: recognition
difficulty: 3
priority: B
hashtags: [ベイズ統計, HPD, 信用領域]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信用区間と信頼区間の違い }]
---

## 問題
最高事後密度（HPD）$100(1-\alpha)$%領域を定義せよ。

## 記号・用語
- HPD：最高事後密度（highest posterior density）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

連続な単峰事後密度では、同じ事後確率をもつ領域のうち最短になりやすい。

## 答え
ある閾値cに対し
$$C=\{\theta:\pi(\theta\mid x)\ge c\},\qquad
P(\theta\in C\mid x)=1-\alpha$$
を満たす領域。領域内の全ての点の事後密度が領域外の点以上。

## 計算例
対称単峰分布では中央等裾区間と一致する。

## 注意
多峰分布ではHPD領域が複数区間に分かれ得る。

<!-- CARD -->

---
id: bayes-credible-vs-confidence
title: 信用区間と信頼区間の確率解釈を区別する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: credible-confidence
type: recognition
difficulty: 2
priority: A
hashtags: [ベイズ統計, 信用区間, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信用区間と信頼区間の違い }]
---

## 問題
95%信用区間と95%信頼区間の確率解釈を述べ分けよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベイズでは母数を確率変数、頻度論では母数を固定値として扱う。

## 答え
信用区間は観測xの下で
$$P(\theta\in C(x)\mid x)=0.95$$
という母数の事後確率を表す。信頼区間は固定された母数 $\theta$ に対し、反復標本で
$$P_\theta\{\theta\in C(X)\}=0.95$$
となる手続きの被覆確率を表す。

## 計算例
データ観測後の頻度論的区間に「母数が95%で入る」とは通常いわない。

## 注意
数値的に同じ区間でも解釈は異なり得る。

<!-- CARD -->

---
id: bayes-factor-discrete-numeric
title: 周辺尤度からベイズファクターを数値計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-factor-numeric
type: calc_step
difficulty: 2
priority: B
hashtags: [ベイズ統計, ベイズファクター, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベイズファクター（基本） }]
---

## 問題
周辺尤度が $m_1(x)=0.12,\ m_0(x)=0.03$、事前モデル確率が等しい。ベイズファクターと事後モデル確率を求めよ。

## 記号・用語
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
モデル $M_k$ の周辺尤度は
$$
m_k(x)
=\int f_k(x\mid\theta_k)\pi_k(\theta_k)d\theta_k.
$$
ベイズファクターは
$$
BF_{10}=\frac{m_1(x)}{m_0(x)}.
$$
事後オッズは
$$
\frac{P(M_1\mid x)}{P(M_0\mid x)}
=BF_{10}
\frac{P(M_1)}{P(M_0)}.
$$

## 一手
ベイズファクターでは各モデルの母数を最尤値へ固定せず、**モデル内の事前分布で尤度を積分した周辺尤度**を比べる。その後、事前オッズを掛けて事後オッズへ更新する。

## 答え
$$
BF_{10}=4,
\qquad
P(M_1\mid x)=0.8.
$$

## 計算例
与えられた周辺尤度は
$$
m_1(x)=0.12,
\qquad
m_0(x)=0.03.
$$
したがって
$$
\begin{aligned}
BF_{10}
&=\frac{m_1(x)}{m_0(x)}\\
&=\frac{0.12}{0.03}\\
&=4.
\end{aligned}
$$
事前モデル確率が等しいので事前オッズは
$$
\frac{P(M_1)}{P(M_0)}=1.
$$
よって事後オッズは
$$
\frac{P(M_1\mid x)}{P(M_0\mid x)}
=4\cdot1=4.
$$
$P(M_0\mid x)=1-P(M_1\mid x)$ と置けば
$$
\frac{P(M_1\mid x)}{1-P(M_1\mid x)}=4.
$$
したがって
$$
\begin{aligned}
P(M_1\mid x)
&=4\{1-P(M_1\mid x)\},\\
5P(M_1\mid x)&=4,\\
P(M_1\mid x)&=0.8.
\end{aligned}
$$

## 注意
ベイズファクターは事後確率そのものではなく、**データによるモデル間オッズの更新倍率**である。また周辺尤度は事前分布全体で尤度を平均するため、複合モデル側の事前尺度に敏感になり得る。

通常のベイズファクターではモデル内事前分布をproperに取る。improper事前 $\pi_k(\theta)\propto c_kh_k(\theta)$ では任意定数 $c_1/c_0$ が周辺尤度比に残り、ベイズファクターが一意に定まらないことがある。

<!-- CARD -->

---
id: bayes-hierarchical-definition
title: 階層ベイズモデルの因子分解を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: hierarchical-bayes
type: formula
difficulty: 3
priority: B
hashtags: [ベイズ統計, 階層ベイズモデル, 超母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 階層ベイズの考え方 }]
---

## 問題
群別母数 $\theta_1,\ldots,\theta_J$、共通超母数 $\eta$ をもつ階層モデルの同時分布を因子分解せよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

データ層、群母数層、超事前分布の3層。

## 答え
条件付き独立を仮定すると
$$p(\boldsymbol y,\boldsymbol\theta,\eta)
=p(\eta)\prod_{j=1}^J
p(\theta_j\mid\eta)p(y_j\mid\theta_j).$$

## 計算例
各群の推定を共通分布 $p(\theta_j\mid\eta)$ を通じて結び付ける。

## 注意
超母数を固定未知量として推定する経験ベイズ法とは区別する。

<!-- CARD -->

---
id: bayes-normal-hierarchical-shrinkage
title: 正規階層モデルの縮小平均を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: hierarchical-normal-shrinkage
type: calc_step
difficulty: 4
priority: B
hashtags: [ベイズ統計, 階層ベイズモデル, 縮小推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 階層ベイズの考え方 }]
---

## 問題
観測モデルが正規分布 $\bar Y_j\mid\theta_j\sim N(\theta_j,v_j)$、事前分布が正規分布 $\theta_j\mid\mu,\tau^2\sim N(\mu,\tau^2)$ で $\mu,\tau^2$ を既知とする。$\theta_j$ の事後平均を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Normal–Normalの精度加重平均。

## 答え
$$E[\theta_j\mid\bar y_j,\mu,\tau^2]
=B_j\bar y_j+(1-B_j)\mu,$$
$$B_j=\frac{\tau^2}{\tau^2+v_j}.$$

## 計算例
$\tau^2=1,v_j=3$ なら $B_j=1/4$ で群平均を強く全体平均へ縮小する。

## 注意
観測分散 $v_j$ が大きい群ほど縮小が強い。

<!-- CARD -->

---
id: bayes-hierarchical-conditional-independence
title: 階層モデルの条件付き独立を判定する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: hierarchical-conditional-independence
type: recognition
difficulty: 3
priority: B
hashtags: [ベイズ統計, 階層ベイズモデル, 条件付き独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 階層ベイズの考え方 }]
---

## 問題
$\theta_j\mid\eta$ が群間で独立な階層モデルで、周辺化前後の $\theta_j,\theta_k$ の独立性を述べよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

共通原因を条件付けると独立でも、周辺化により依存が生じる。

## 答え
超母数 $\eta$ を条件付ければ
$$p(\theta_j,\theta_k\mid\eta)
=p(\theta_j\mid\eta)p(\theta_k\mid\eta)$$
で条件付き独立。しかし共通のランダムな $\eta$ を積分すると一般に周辺では依存する。

## 計算例
ある群のデータが $\eta$ の事後分布を更新し、他群の推定にも影響する。

## 注意
条件付き独立と周辺独立を混同しない。

<!-- CARD -->

---
id: bayes-gibbs-full-conditionals
title: ギブスサンプリング用の完全条件付き分布を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gibbs-full-conditionals
type: formula
difficulty: 4
priority: B
hashtags: [ベイズ統計, ギブスサンプリング, 完全条件付き分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ギブスサンプリング }]
---

## 問題
事後密度 $\pi(\theta_1,\ldots,\theta_K\mid y)$ からギブスサンプリングで使う第 $k$ 成分の完全条件付き分布を比例式で書け。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
他成分を $\boldsymbol\theta_{-k}$ とすると
$$
\pi(\theta_k\mid\boldsymbol\theta_{-k},y)
\propto_{\theta_k}
\pi(\theta_1,\ldots,\theta_K\mid y).
$$
例えば
$$
Y_i\mid\theta\overset{\mathrm{iid}}{\sim}N(\theta,\sigma^2),
\qquad
\theta\mid m_0,s_0^2\sim N(m_0,s_0^2)
$$
なら、他の母数を固定した完全条件付き分布は
$$
V=\left(\frac n{\sigma^2}+\frac1{s_0^2}\right)^{-1},
\qquad
M=V\left(\frac{n\bar y}{\sigma^2}+\frac{m_0}{s_0^2}\right),
$$
$$
\theta\mid-\sim N(M,V)
$$
となる。

## 一手
ギブスサンプリングでは「周辺事後分布を直接求める」のではなく、更新する成分以外をすべて固定し、その成分に依存する因子だけを残して既知分布の核を同定する。

## 答え
各成分について
$$
\pi(\theta_k\mid\boldsymbol\theta_{-k},y)
\propto_{\theta_k}
\pi(\boldsymbol\theta\mid y)
$$
と書き、$\theta_k$ に依存しない因子を落として完全条件付き分布を同定する。共役階層モデルでは、この操作が正規–正規更新やガンマ更新などの既知の共役更新に帰着することが多い。

## 計算例
上の正規モデルで
$$
m_0=0,\qquad s_0^2=4,\qquad \sigma^2=9,
\qquad n=9,\qquad \bar y=3
$$
とする。まず完全条件付き分布の精度は
$$
\frac1V
=\frac9{9}+\frac14
=1+\frac14
=\frac54,
$$
したがって
$$
V=\frac45=0.8.
$$
平均の分子は
$$
\frac{9\cdot3}{9}+\frac0{4}=3
$$
なので
$$
M=0.8\times3=2.4.
$$
よって
$$
\theta\mid-\sim N(2.4,0.8).
$$
正規階層モデルで群効果 $\theta_j$ や全体平均 $\mu$ を更新するときも、条件付けた残りの母数を現在値として扱い、同じ精度加算の型を使う。

## 注意
完全条件付き分布 $\pi(\theta_k\mid\boldsymbol\theta_{-k},y)$ と周辺事後分布 $\pi(\theta_k\mid y)$ は別物である。ギブス掃引では更新済み成分には新しい値を使う。

<!-- CARD -->

---
id: bayes-normal-hierarchical-gibbs-theta
title: 正規階層モデルの群効果のギブス更新を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gibbs-normal-theta
type: calc_step
difficulty: 4
priority: B
hashtags: [ベイズ統計, ギブスサンプリング, 正規階層モデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ギブスサンプリング }]
---

## 問題
観測モデルが正規分布 $Y_{ij}\mid\theta_j\overset{\mathrm{iid}}{\sim}N(\theta_j,\sigma^2)$、事前分布が正規分布 $\theta_j\mid\mu,\tau^2\sim N(\mu,\tau^2)$ で分散既知とする。$\theta_j$ の完全条件付き分布を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Normal–Normal共役更新。

## 答え
群jの標本数を $n_j$、平均を $\bar y_j$ とすると
$$V_j=\left(\frac{n_j}{\sigma^2}+\frac1{\tau^2}\right)^{-1},$$
$$M_j=V_j\left(\frac{n_j\bar y_j}{\sigma^2}
+\frac{\mu}{\tau^2}\right),$$
$$\theta_j\mid-\sim N(M_j,V_j).$$

## 計算例
各ギブス掃引で現在の $\mu,\tau^2$ を代入する。

## 注意
記号「$-$」は他の全母数とデータを条件付ける意味。

<!-- CARD -->

---
id: bayes-normal-hierarchical-gibbs-mu
title: 正規階層モデルの全体平均のギブス更新を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gibbs-normal-mu
type: calc_step
difficulty: 4
priority: B
hashtags: [ベイズ統計, ギブスサンプリング, 正規階層モデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ギブスサンプリング }]
---

## 問題
群効果が正規分布 $\theta_j\mid\mu,\tau^2\overset{\mathrm{iid}}{\sim}N(\mu,\tau^2)$、事前分布が正規分布 $\mu\sim N(m_0,s_0^2)$ とする。J個の $\theta_j$ を条件付けた $\mu$ の完全条件付き分布を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

J個の正規観測 $\theta_j$ に対するNormal–Normal更新。

## 答え
$$V_\mu=\left(\frac1{s_0^2}+\frac J{\tau^2}\right)^{-1},$$
$$M_\mu=V_\mu\left(\frac{m_0}{s_0^2}
+\frac{\sum_j\theta_j}{\tau^2}\right),$$
$$\mu\mid-\sim N(M_\mu,V_\mu).$$

## 計算例
現在の群効果平均 $\bar\theta$ と事前平均の精度加重平均。

## 注意
観測 $Y_{ij}$ は $\theta_j$ を条件付けるとこの完全条件付き核に直接現れない。

<!-- CARD -->

---
id: bayes-beta-binomial-hierarchy
title: ベータ–二項階層モデルの群間情報共有を説明する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: hierarchical-beta-binomial
type: recognition
difficulty: 3
priority: B
hashtags: [ベイズ統計, 階層ベイズモデル, ベータ–二項]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 階層ベイズの考え方 }]
---

## 問題
$X_j\mid p_j\sim\operatorname{Bin}(n_j,p_j)$、$p_j\mid a,b\sim\operatorname{Beta}(a,b)$ という階層化の効果を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベータ–二項共役更新と階層的部分プーリング。

## 答え
$a,b$ が既知なら
$$p_j\mid x_j,a,b\sim
\operatorname{Beta}(a+x_j,b+n_j-x_j).$$
共通のa,bにより、各群の推定が全体傾向 $a/(a+b)$ へ縮小される。a,bも推定すれば全群データが超母数を介して情報共有する。

## 計算例
$n_j$ が小さい群ほど事前擬似度数の影響が大きい。

## 注意
全群を同じpとする完全プーリングとは異なる。

<!-- CARD -->

---
id: bayes-empirical-bayes
title: 経験ベイズ法と完全ベイズ法を区別する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: empirical-bayes
type: recognition
difficulty: 3
priority: B
hashtags: [ベイズ統計, 経験ベイズ法, 超母数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 階層ベイズの考え方 }]
---

## 問題
超母数 $\eta$ の扱いについて経験ベイズ法と完全ベイズ法を区別せよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

完全ベイズ：
$$\pi(\theta\mid y)=\int\pi(\theta\mid y,\eta)\pi(\eta\mid y)\,d\eta.$$

## 答え
経験ベイズ法は周辺尤度などで $\widehat\eta$ を推定し、その値へ固定して $\pi(\theta\mid y,\widehat\eta)$ を使う。完全ベイズ法は超事前分布 $\pi(\eta)$ を置き、$\eta$ の不確実性も事後分布で積分する。

## 計算例
経験ベイズは計算が軽いが、超母数推定の不確実性を過小評価しやすい。

## 注意
データから事前分布を推定するため、通常の固定事前ベイズとは異なる。

<!-- CARD -->

---
id: bayes-posterior-predictive-check
title: 事後予測チェックのP値を構成する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: posterior-predictive-check
type: formula
difficulty: 3
priority: B
hashtags: [ベイズ統計, 事後予測チェック, モデル診断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 事後予測分布 }]
---

## 問題
不一致統計量 $T(y)$ を用いた事後予測チェックの片側確率を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事後予測分布 $p(y^{\mathrm{rep}}\mid y)=\int p(y^{\mathrm{rep}}\mid\theta)\pi(\theta\mid y)\,d\theta$。

## 答え
$$p_{\mathrm{ppc}}
=P\{T(Y^{\mathrm{rep}})\ge T(y)\mid y\},$$
ここで
$$\theta^{(b)}\sim\pi(\theta\mid y),\qquad
Y^{\mathrm{rep},(b)}\sim p(y^{\mathrm{rep}}\mid\theta^{(b)}).$$
反復中の指示関数平均で近似する。

## 計算例
1000反復中920回で再現統計量が観測値以上なら $p_{\mathrm{ppc}}=0.92$。

## 注意
同じデータを更新と評価に使うため、一様な頻度論的P値ではない。

<!-- CARD -->

---
id: bayes-prior-sensitivity
title: 事前分布の感度分析を設計する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: prior-sensitivity
type: recognition
difficulty: 3
priority: B
hashtags: [ベイズ統計, 事前分布, 感度分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 無情報事前分布（基本） }]
---

## 問題
事前分布の選択に対する感度分析で比較すべきものを述べよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\pi(\theta\mid x)\propto L(\theta;x)\pi(\theta)$$
より、データが弱いほど事前分布の影響が残る。

## 答え
科学的に妥当な複数の事前中心・尺度・裾の重さを設定し、事後平均・信用区間・予測分布・意思決定・ベイズファクターがどの程度変わるかを比較する。

## 計算例
有効事前標本サイズを変えたBeta事前分布で二項比率を再計算する。

## 注意
「無情報」という名称だけで一つの事前分布を自動採用しない。

<!-- CARD -->

---
id: bayes-evidence-discrete
title: 離散仮説の周辺確率を計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-evidence
type: calc_step
difficulty: 2
priority: B
hashtags: [ベイズ統計, 周辺尤度, 全確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ベイズの公式を密度で書く }]
---

## 問題
$P(H_1)=0.3,\ P(H_0)=0.7$、$P(x\mid H_1)=0.8,\ P(x\mid H_0)=0.2$ のとき、$P(x)$ と $P(H_1\mid x)$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全確率の公式とベイズの公式。

## 答え
$$P(x)=0.8(0.3)+0.2(0.7)=0.38,$$
$$P(H_1\mid x)=\frac{0.8(0.3)}{0.38}
=\frac{12}{19}\approx0.632.$$

## 計算例
事前確率0.3が観測xにより約0.632へ更新された。

## 注意
尤度 $P(x\mid H_1)$ と事後確率 $P(H_1\mid x)$ を逆にしない。

<!-- CARD -->

---
id: bayes-conjugate-definition
title: 共役事前分布を定義する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: conjugate-prior
type: recognition
difficulty: 2
priority: A
hashtags: [ベイズ統計, 共役事前分布, 事後分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共役事前分布 }]
---

## 問題
尤度族に対する共役事前分布とは何か。利点も述べよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\pi(\theta\mid x)\propto L(\theta;x)\pi(\theta).$$

## 答え
事後分布が事前分布と同じ分布族に属するような事前分布。更新後の超母数を十分統計量の加算として得られ、正規化・事後要約・予測計算が容易になる。

## 計算例
二項尤度にBeta事前分布を置くと事後分布もBeta。

## 注意
共役性は計算上の便利さであり、事前知識への適合性とは別。

<!-- CARD -->

---
id: bayes-proper-improper
title: proper事前分布とimproper事前分布を区別する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: improper-prior
type: recognition
difficulty: 3
priority: B
hashtags: [ベイズ統計, 無情報事前分布, improper-prior]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 無情報事前分布（基本） }]
---

## 問題
事前密度 $\pi(\theta)$ がproperである条件と、improper事前分布を使う際の確認事項を述べよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事後密度の正規化可能性。

## 答え
properなら $\pi(\theta)\ge0$ かつ $\int\pi(\theta)\,d\theta=1$。積分が有限でないimproper事前分布を形式的に使う場合は
$$\int L(\theta;x)\pi(\theta)\,d\theta<\infty$$
を確認し、事後分布がproperになることを保証する。

## 計算例
位置母数の一様事前 $\pi(\mu)\propto1$ は実数全体ではimproper。

## 注意
improper事前分布では任意定数が消えないため、通常のベイズファクターは定義できない。

<!-- CARD -->

---
id: bayes-prior-predictive
title: 事前予測分布を周辺化して求める
category: math-data-analysis
subcategory: math-bayesian-methods
topic: prior-predictive
type: formula
difficulty: 2
priority: B
hashtags: [ベイズ統計, 事前予測分布, 周辺化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 事後予測分布 }]
---

## 問題
事前分布 $\pi(\theta)$ と標本モデル $f(x\mid\theta)$ から事前予測密度を求める式を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全確率の公式による母数の周辺化。

## 答え
$$m(x)=\int f(x\mid\theta)\pi(\theta)\,d\theta.$$
これはベイズ公式の分母であり、観測前にxがどの程度もっともらしいかを表す。

## 計算例
離散母数なら積分を $\sum_\theta f(x\mid\theta)\pi(\theta)$ に置き換える。

## 注意
事後予測分布は観測xで更新した $\pi(\theta\mid x)$ を使う。

<!-- CARD -->

---
id: bayes-likelihood-principle
title: 事後分布で尤度の比例部分を見抜く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: likelihood-kernel
type: recognition
difficulty: 2
priority: B
hashtags: [ベイズ統計, 尤度, 核]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 事前分布・尤度・事後分布 }]
---

## 問題
事後分布を求める際、尤度から母数 $\theta$ に依存しない因子を落としてよい理由を述べよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

母数に関する比例記号 $\propto_\theta$。

## 答え
ベイズ更新では
$$\pi(\theta\mid x)\propto_\theta L(\theta;x)\pi(\theta)$$
なので、xだけに依存する正の因子は事後密度を正規化すると相殺される。

## 計算例
二項尤度の $\binom ns$ はpに依存しないのでBeta核の同定では落とせる。

## 注意
周辺尤度やベイズファクターを計算するときは、モデル間で異なる定数を勝手に落とさない。

<!-- CARD -->

---
id: bayes-beta-posterior-mean-mode
title: ベータ事後分布の平均とMAPを比較する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: beta-posterior-summary
type: calc_step
difficulty: 3
priority: B
hashtags: [ベイズ統計, 事後平均, MAP]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 0-1損失→MAP }]
---

## 問題
$p\mid x\sim\operatorname{Beta}(9,6)$ の事後平均と事後最頻値（MAP）を求めよ。

## 記号・用語
- MAP：最大事後確率（maximum a posteriori）推定

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Beta}(\alpha,\beta)$ の最頻値は $(\alpha-1)/(\alpha+\beta-2)$（$\alpha,\beta>1$）。

## 答え
$$E[p\mid x]=\frac9{15}=0.6.$$
$9,6>1$ なので
$$p_{\mathrm{MAP}}=\frac{9-1}{9+6-2}
=\frac8{13}\approx0.615.$$

## 計算例
平均とMAPは一般に一致しない。

## 注意
超母数が1以下なら境界が最頻値になり得る。

<!-- CARD -->

---
id: bayes-gamma-exponential-update
title: ガンマ–指数事後分布を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gamma-exponential
type: calc_step
difficulty: 3
priority: B
hashtags: [ベイズ統計, ガンマ分布, 指数分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布・指数分布 }]
---

## 問題
$X_i\mid\lambda\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(\lambda)$（台 $x_i\ge0$、密度 $\lambda e^{-\lambda x_i}$）、事前分布 $\lambda\sim\operatorname{Gamma}(a,b)$（shape–rate）の事後分布を求めよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Gamma密度の核 $\lambda^{a-1}e^{-b\lambda}$。

## 一手
指数標本の尤度を $\lambda$ の核だけに整理し、事前ガンマ密度の指数と掛け合わせる。$\lambda$ のべき指数と $e^{-\lambda(\cdot)}$ の係数を読むと、事後ガンマ分布のshapeとrateがそのまま分かる。

## 答え
$$L(\lambda)\propto\lambda^n
\exp\left(-\lambda\sum_i x_i\right),$$
$$\pi(\lambda)\propto\lambda^{a-1}e^{-b\lambda}.$$
したがって
$$\lambda\mid\boldsymbol x\sim
\operatorname{Gamma}\left(a+n,b+\sum_i x_i\right).$$

## 計算例
事前分布を
$$
\lambda\sim\operatorname{Gamma}(2,1)
$$
とし、指数標本で
$$
n=3,\qquad \sum_{i=1}^n x_i=5
$$
を観測したとする。尤度核は
$$
L(\lambda)
\propto
\lambda^3e^{-5\lambda},
$$
事前密度核は
$$
\pi(\lambda)
\propto
\lambda^{2-1}e^{-1\lambda}.
$$
よって事後核は
$$
\begin{aligned}
\pi(\lambda\mid\boldsymbol x)
&\propto
\lambda^3e^{-5\lambda}
\lambda^{1}e^{-\lambda}\\
&=\lambda^4e^{-6\lambda}.
\end{aligned}
$$
これはshape–rate型
$$
\operatorname{Gamma}(5,6)
$$
の核なので
$$
\lambda\mid\boldsymbol x\sim\operatorname{Gamma}(5,6).
$$
事後平均は
$$
E[\lambda\mid\boldsymbol x]=\frac56,
$$
事後最頻値は
$$
\frac{5-1}{6}=\frac23.
$$

## 注意
ここでは第2母数をrateとする。scale母数化では更新式が変わる。また $E[\lambda\mid x]$ と $E[1/\lambda\mid x]$ は異なるので、故障率の事後平均を平均寿命の推定値と取り違えない。

<!-- CARD -->

---
id: bayes-gamma-exponential-numeric
title: ガンマ–指数更新を数値計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: gamma-exponential-numeric
type: calc_step
difficulty: 2
priority: B
hashtags: [ベイズ統計, ガンマ分布, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガンマ分布・指数分布 }]
---

## 問題
$\lambda\sim\operatorname{Gamma}(2,1)$（shape–rate）、指数分布から $n=3,\ \sum x_i=5$ を観測した。事後分布と事後平均を求めよ。

## 記号・用語
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

shape–rate型ガンマ分布の平均は shape/rate。

## 答え
$$\lambda\mid\boldsymbol x\sim\operatorname{Gamma}(2+3,1+5)
=\operatorname{Gamma}(5,6).$$
$$E[\lambda\mid\boldsymbol x]=\frac56.$$

## 計算例
事後最頻値は $(5-1)/6=2/3$。

## 注意
率 $\lambda$ の推定であり平均寿命 $1/\lambda$ の事後平均とは異なる。

<!-- CARD -->

---
id: bayes-normal-normal-update
title: 正規–正規事後分布を平方完成する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-normal
type: calc_step
difficulty: 4
priority: A
hashtags: [ベイズ統計, 正規分布, 平方完成]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正規–正規モデル }]
---

## 問題
観測モデルが正規分布 $X_i\mid\mu\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$（$\sigma^2$ 既知）、事前分布も正規分布 $\mu\sim N(m_0,s_0^2)$ のとき、事後平均と事後分散を求めよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規核の平方完成。精度＝分散の逆数。

## 一手
正規–正規更新では、尤度と事前分布の指数部を足し、$\mu^2$ の係数を**事後精度**、$\mu$ の一次係数を**精度付き平均**として平方完成する。

## 答え
$$
s_n^2
=\left(\frac1{s_0^2}+\frac n{\sigma^2}\right)^{-1},
$$
$$
m_n
=s_n^2\left(
\frac{m_0}{s_0^2}
+\frac{n\bar x}{\sigma^2}
\right),
$$
したがって
$$
\mu\mid\boldsymbol x\sim N(m_n,s_n^2).
$$

## 計算例
尤度と事前分布の $\mu$ に依存する部分だけを残すと
$$
\pi(\mu\mid\boldsymbol x)
\propto
\exp\left[
-\frac12\left\{
\frac n{\sigma^2}(\mu-\bar x)^2
+\frac1{s_0^2}(\mu-m_0)^2
\right\}
\right].
$$
中括弧を $\mu$ について展開する。
$$
\begin{aligned}
&\frac n{\sigma^2}(\mu-\bar x)^2
+\frac1{s_0^2}(\mu-m_0)^2\\
&=\left(\frac n{\sigma^2}+\frac1{s_0^2}\right)\mu^2
-2\left(
\frac{n\bar x}{\sigma^2}
+\frac{m_0}{s_0^2}
\right)\mu
+C,
\end{aligned}
$$
ここで $C$ は $\mu$ に依存しない。

$$
A=\frac n{\sigma^2}+\frac1{s_0^2},
\qquad
B=\frac{n\bar x}{\sigma^2}+\frac{m_0}{s_0^2}
$$
と置けば
$$
\begin{aligned}
A\mu^2-2B\mu
&=A\left\{
\mu^2-2\frac BA\mu
\right\}\\
&=A\left(\mu-\frac BA\right)^2
-\frac{B^2}{A}.
\end{aligned}
$$
最後の項は正規化定数へ吸収できるため、事後分布は
$$
N\left(\frac BA,\frac1A\right)
$$
である。すなわち $s_n^2=1/A$, $m_n=B/A$。

数値例として $m_0=0$, $s_0^2=4$, $\sigma^2=9$, $n=9$, $\bar x=3$ とすると
$$
A=\frac14+\frac99=\frac54,
\qquad
s_n^2=\frac1A=\frac45=0.8.
$$
また
$$
B=\frac0{4}+\frac{9\cdot3}{9}=3,
$$
したがって
$$
m_n=\frac BA=3\cdot\frac45=\frac{12}{5}=2.4.
$$
よって
$$
\mu\mid\boldsymbol x\sim N(2.4,0.8).
$$
事前平均0と標本平均3の間へ縮小されていることも確認できる。

## 注意
精度は分散の逆数である。したがって
$$
\frac1{s_n^2}
=\frac1{s_0^2}+\frac n{\sigma^2}
$$
は「事後精度＝事前精度＋データ精度」を表す。標本平均の分散は $\sigma^2/n$ なので、データ精度は $n/\sigma^2$ である。

<!-- CARD -->

---
id: bayes-nig-update
title: 正規–逆ガンマ共役更新を書く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-inverse-gamma
type: formula
difficulty: 5
priority: B
hashtags: [ベイズ統計, 正規分布, 逆ガンマ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共役事前分布 }]
---

## 問題
観測モデルが正規分布 $X_i\mid\mu,\sigma^2\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$、条件付き事前分布が正規分布 $\mu\mid\sigma^2\sim N(m_0,\sigma^2/\kappa_0)$、$\sigma^2\sim\operatorname{InvGamma}(\alpha_0,\beta_0)$ とする。事後超母数を書け。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

平方和分解と正規–逆Gamma共役性。

## 答え
$$\kappa_n=\kappa_0+n,\qquad
m_n=\frac{\kappa_0m_0+n\bar x}{\kappa_n},$$
$$\alpha_n=\alpha_0+\frac n2,$$
$$\beta_n=\beta_0+\frac12\sum_i(x_i-\bar x)^2
+\frac{\kappa_0n}{2\kappa_n}(\bar x-m_0)^2.$$
事後も $\mu\mid\sigma^2,\boldsymbol x\sim N(m_n,\sigma^2/\kappa_n)$、$\sigma^2\mid\boldsymbol x\sim\operatorname{InvGamma}(\alpha_n,\beta_n)$。

## 計算例
最後の項は事前平均と標本平均の不一致を分散更新へ反映する。

## 注意
逆ガンマ分布の母数化を密度 $\propto(\sigma^2)^{-\alpha-1}e^{-\beta/\sigma^2}$ と明記する。

<!-- CARD -->

---
id: bayes-dirichlet-multinomial-update
title: ディリクレ–多項事後分布を導く
category: math-data-analysis
subcategory: math-bayesian-methods
topic: dirichlet-multinomial
type: calc_step
difficulty: 3
priority: B
hashtags: [ベイズ統計, Dirichlet分布, 多項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共役事前分布 }]
---

## 問題
カテゴリ確率 $\boldsymbol p=(p_1,\ldots,p_K)$ に $\operatorname{Dirichlet}(\alpha_1,\ldots,\alpha_K)$ 事前分布を置き、度数 $\boldsymbol n=(n_1,\ldots,n_K)$ を観測した。事後分布を求めよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Dirichlet分布は多項分布の共役事前分布。

## 答え
尤度核は $\prod_kp_k^{n_k}$、事前密度核は $\prod_kp_k^{\alpha_k-1}$ なので
$$\boldsymbol p\mid\boldsymbol n\sim
\operatorname{Dirichlet}(\alpha_1+n_1,\ldots,\alpha_K+n_K).$$

## 計算例
各カテゴリの擬似度数 $\alpha_k$ に観測度数を加える。

## 注意
$p_k>0$、$\sum_kp_k=1$。
