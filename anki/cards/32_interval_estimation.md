---
id: ci-coverage-probability
title: 被覆確率と信頼係数の定義
category: math-estimation
subcategory: math-interval-estimation
topic: coverage-probability
type: formula
difficulty: 2
priority: S
hashtags: [被覆確率, 信頼係数, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
信頼区間の「被覆確率（coverage probability）」と「信頼係数」を定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$C(\theta)=P_\theta\bigl(L(X)\le \theta\le U(X)\bigr),\qquad \inf_{\theta\in\Theta}C(\theta)\ge1-\alpha.$$

## 答え
標本から作る区間推定量 $I(X)=[L(X),U(X)]$ に対し、$C(\theta)=P_\theta\{\theta\in I(X)\}$ を被覆確率という。$C(\theta)=1-\alpha$ がすべての $\theta$ で成り立つ区間は、信頼係数 $1-\alpha$ の正確な信頼区間である。一般には $\inf_{\theta\in\Theta}C(\theta)$ を信頼係数と呼ぶ。

## 計算例
信頼係数 $0.95$ なら、同じ手順で繰り返し区間を作ると約 $95\%$ が真値を覆う。

## 注意
頻度主義では $\theta$ は固定され、確率を担うのは区間の方である。「$\theta$ が区間に入る確率」は誤り。

<!-- CARD -->

---
id: ci-pivot-construction
title: ピボット量から信頼区間を構成する手順
category: math-estimation
subcategory: math-interval-estimation
topic: pivot-construction
type: proof_step
difficulty: 3
priority: A
hashtags: [ピボット量, 信頼区間の構成, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
ピボット量 $Q(X,\theta)$ から、いかにして信頼係数 $1-\alpha$ の区間を得るか手順を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$P(a\le Q(X,\theta)\le b)=1-\alpha$ を $\theta$ について同値変形し、$\theta$ を含む区間として表す。

## 一手
分布が未知母数に依存しないピボット量 $Q(X,\theta)$ を作り、
$$
P(a\le Q(X,\theta)\le b)=1-\alpha
$$
を未知母数 $\theta$ について解く。**公式を暗記するのではなく、確率不等式を反転して区間を作る**。

## 答え
$Q(X,\theta)$ の分布が未知母数に依存せず、
$$
P(a\le Q(X,\theta)\le b)=1-\alpha
$$
となる分位点 $a,b$ を選べるなら、この不等式を $\theta$ について同値変形した集合が信頼係数 $1-\alpha$ の信頼区間となる。

正規平均で母分散既知なら
$$
Q=\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1)
$$
なので
$$
\mu\in
\left[
\overline X-z_{\alpha/2}\frac{\sigma}{\sqrt n},
\overline X+z_{\alpha/2}\frac{\sigma}{\sqrt n}
\right].
$$

## 計算例
95%区間では
$$
P\left(
-1.96\le
\frac{\overline X-\mu}{\sigma/\sqrt n}
\le1.96
\right)=0.95.
$$
$\sigma/\sqrt n>0$ なので全辺へ掛けると
$$
-1.96\frac{\sigma}{\sqrt n}
\le \overline X-\mu
\le
1.96\frac{\sigma}{\sqrt n}.
$$
全辺から $\overline X$ を引き、符号を反転すると
$$
\overline X-1.96\frac{\sigma}{\sqrt n}
\le\mu\le
\overline X+1.96\frac{\sigma}{\sqrt n}.
$$

例えば $\overline x=10$, $\sigma=2$, $n=25$ なら
$$
\frac{\sigma}{\sqrt n}=\frac25=0.4,
$$
半幅は
$$
1.96\times0.4=0.784.
$$
よって
$$
\mu\in[10-0.784,10+0.784]
=[9.216,10.784].
$$

## 注意
ピボット量の分布が未知母数に依存しないことが重要である。母分散が未知なら $\sigma$ をそのまま $S$ に置換するだけではなく、正規標本で得られる $t$ ピボットを使う。

<!-- CARD -->

---
id: ci-t-interval-pivot
title: t区間のピボット構成と正規性依存
category: math-estimation
subcategory: math-interval-estimation
topic: t-interval-pivot
type: proof_step
difficulty: 3
priority: S
hashtags: [t区間, ピボット量, 正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立同分布標本が正規分布 $N(\mu,\sigma^2)$ に従い、$\sigma$ 未知のとき、$\mu$ の信頼区間を与える統計量が $t$ 分布に従うことを示し、正規性仮定の役割を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Z=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$ と
$$V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$$
は正規標本では独立である。したがってt分布の定義から
$$\frac{Z}{\sqrt{V/(n-1)}}
=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{S/\sigma}
=\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.$$

## 答え
正規標本で母分散が未知なら
$$
T=\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1},
$$
よって信頼係数 $1-\alpha$ の区間は
$$
\overline X\pm t_{n-1,\alpha/2}\frac{S}{\sqrt n}.
$$

## 計算例
正規標本では
$$
Z=\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1),
\qquad
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$
で、$Z$ と $V$ は独立である。したがって
$$
\begin{aligned}
\frac{Z}{\sqrt{V/(n-1)}}
&=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}
{\sqrt{\{(n-1)S^2/\sigma^2\}/(n-1)}}\\
&=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{S/\sigma}\\
&=\frac{\overline X-\mu}{S/\sqrt n}
\sim t_{n-1}.
\end{aligned}
$$
例えば $n=10$, $\overline x=12$, $S=3$、95%区間で $t_{9,0.025}=2.262$ とする。標準誤差は
$$
\frac{S}{\sqrt n}=\frac3{\sqrt{10}}\approx0.949.
$$
半幅は
$$
2.262\times0.949\approx2.146,
$$
したがって
$$
12\pm2.146=[9.854,14.146].
$$

## 注意
$t$ 分布が有限標本で正確に成り立つのは正規標本であるため。母分散既知なら $S$ への置換が不要なので $z$ 区間を使う。大標本では $t_{n-1,\alpha/2}\to z_{\alpha/2}$ となる。

<!-- CARD -->

---
id: ci-variance-chi-derivation
title: 正規分散のカイ二乗区間の構成（非対称性）
category: math-estimation
subcategory: math-interval-estimation
topic: variance-chi-derivation
type: proof_step
difficulty: 3
priority: S
hashtags: [カイ二乗区間, 母分散, 非対称]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
正規標本の不偏分散 $S^2$ から $\sigma^2$ の信頼区間を導け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ここで $\chi^2_{\nu,\gamma}$ は上側確率が $\gamma$ となる点、すなわち $P(\chi^2_\nu\ge\chi^2_{\nu,\gamma})=\gamma$ とする。この記法で
$$P\left(\chi^2_{n-1,1-\alpha/2}\le\frac{(n-1)S^2}{\sigma^2}\le\chi^2_{n-1,\alpha/2}\right)=1-\alpha,$$
$A=(n-1)S^2>0$、$c_L=\chi^2_{n-1,1-\alpha/2}$、$c_U=\chi^2_{n-1,\alpha/2}$ と置く。$0<c_L<c_U$ なので
$$c_L\le\frac{A}{\sigma^2}\le c_U
\quad\Longleftrightarrow\quad
\frac{A}{c_U}\le\sigma^2\le\frac{A}{c_L}.$$
よって区間は
$$\left[\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},\ 
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}\right].$$

## 答え
正規標本では
$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$
$\chi^2_{\nu,\gamma}$ を上側確率 $\gamma$ の点とすると、信頼係数 $1-\alpha$ の区間は
$$
\left[
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}
\right].
$$

## 計算例
まず
$$
P\left(
c_L\le \frac{A}{\sigma^2}\le c_U
\right)=1-\alpha,
$$
と置く。ただし
$$
A=(n-1)S^2>0,
\quad
c_L=\chi^2_{n-1,1-\alpha/2},
\quad
c_U=\chi^2_{n-1,\alpha/2},
$$
で $0<c_L<c_U$ である。不等式を $\sigma^2$ について解くと
$$
c_L\le\frac{A}{\sigma^2}\le c_U
\quad\Longleftrightarrow\quad
\frac{A}{c_U}\le\sigma^2\le\frac{A}{c_L}.
$$
分母の大小が逆になる点が重要である。

数値例として $n=10$, $S^2=4$、95%区間を考え、表から
$$
\chi^2_{9,0.025}=19.023,
\qquad
\chi^2_{9,0.975}=2.700
$$
を用いる。$A=9\times4=36$ なので
$$
\begin{aligned}
\sigma_L^2&=\frac{36}{19.023}\approx1.892,\\
\sigma_U^2&=\frac{36}{2.700}\approx13.333.
\end{aligned}
$$
よって
$$
\sigma^2\in[1.892,13.333].
$$

## 注意
カイ二乗分布は非対称なので区間も一般に非対称になる。分位点記号が「上側確率」か「下側累積確率」かを問題文で必ず確認する。

<!-- CARD -->

---
id: ci-f-variance-ratio
title: 2正規母分散比のF区間
category: math-estimation
subcategory: math-interval-estimation
topic: f-variance-ratio
type: formula
difficulty: 3
priority: S
hashtags: [F分布, 分散比, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2つの正規分布 $N(\mu_1,\sigma_1^2)$、$N(\mu_2,\sigma_2^2)$ からの標本で、$\sigma_1^2/\sigma_2^2$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$F_{\nu_1,\nu_2,\gamma}$ を上側確率が $\gamma$ となる点とすると、区間は
$$F_{\nu_1,\nu_2,1-\alpha/2}
\le
\frac{S_1^2/S_2^2}{\sigma_1^2/\sigma_2^2}
\le F_{\nu_1,\nu_2,\alpha/2}.$$
$R=S_1^2/S_2^2$、$\rho=\sigma_1^2/\sigma_2^2$ と置き、正数の不等式を $\rho$ について解くと
$$\frac{R}{F_{\nu_1,\nu_2,\alpha/2}}
\le\rho\le
\frac{R}{F_{\nu_1,\nu_2,1-\alpha/2}}.$$
したがって区間は
$$\left[\frac{S_1^2/S_2^2}{F_{n_1-1,n_2-1,\alpha/2}},\ \frac{S_1^2/S_2^2}{F_{n_1-1,n_2-1,1-\alpha/2}}\right].$$

## 答え
独立な正規2標本では
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
\sim F_{n_1-1,n_2-1}.
$$
$F_{\nu_1,\nu_2,\gamma}$ を上側確率 $\gamma$ の点とすると
$$
\frac{\sigma_1^2}{\sigma_2^2}
\in
\left[
\frac{S_1^2/S_2^2}{F_{n_1-1,n_2-1,\alpha/2}},
\frac{S_1^2/S_2^2}{F_{n_1-1,n_2-1,1-\alpha/2}}
\right].
$$

## 計算例
$R=S_1^2/S_2^2$、$\rho=\sigma_1^2/\sigma_2^2$ と置くとピボットは $R/\rho$ である。したがって
$$
c_L\le\frac{R}{\rho}\le c_U
\quad\Longleftrightarrow\quad
\frac{R}{c_U}\le\rho\le\frac{R}{c_L}.
$$
例えば $n_1=n_2=11$, $S_1^2=9$, $S_2^2=4$ なら
$$
R=\frac94=2.25.
$$
95%区間について表から
$$
F_{10,10,0.025}\approx3.717,
\qquad
F_{10,10,0.975}\approx0.269
$$
を用いると
$$
\begin{aligned}
\rho_L&=\frac{2.25}{3.717}\approx0.605,\\
\rho_U&=\frac{2.25}{0.269}\approx8.364.
\end{aligned}
$$
よって
$$
\frac{\sigma_1^2}{\sigma_2^2}\in[0.605,8.364].
$$

## 注意
分散比区間は非対称である。$F_{\nu_1,\nu_2}$ の逆数は自由度を入れ替えた $F_{\nu_2,\nu_1}$ になるため、分位点の自由度順序にも注意する。

<!-- CARD -->

---
id: ci-two-sample-mean-diff
title: 2標本平均差の区間推定（等分散）
category: math-estimation
subcategory: math-interval-estimation
topic: two-sample-mean-diff
type: formula
difficulty: 3
priority: S
hashtags: [2標本, 平均差, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2つの正規分布 $N(\mu_1,\sigma^2)$、$N(\mu_2,\sigma^2)$ からの標本で、母分散が等しい（$\sigma^2$ 未知）とき、$\mu_1-\mu_2$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$(\overline X-\overline Y)\pm t_{n_1+n_2-2,\alpha/2}\,S_p\sqrt{\frac1{n_1}+\frac1{n_2}},$$
$$S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}.$$

## 答え
等分散を仮定する独立2標本では
$$
(\overline X-\overline Y)
\pm t_{n_1+n_2-2,\alpha/2}
S_p\sqrt{\frac1{n_1}+\frac1{n_2}},
$$
$$
S_p^2=
\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}.
$$

## 計算例
$n_1=10$, $n_2=12$, $\overline x=15$, $\overline y=14$, $S_1^2=4$, $S_2^2=9$ とする。まずプール分散は
$$
\begin{aligned}
S_p^2
&=\frac{9\cdot4+11\cdot9}{10+12-2}\\
&=\frac{36+99}{20}\\
&=6.75.
\end{aligned}
$$
よって標準誤差は
$$
\begin{aligned}
SE
&=\sqrt{6.75\left(\frac1{10}+\frac1{12}\right)}\\
&\approx1.112.
\end{aligned}
$$
自由度は $20$。95%区間で $t_{20,0.025}=2.086$ を使うと半幅は
$$
2.086\times1.112\approx2.320.
$$
標本平均差は $15-14=1$ なので
$$
(\mu_1-\mu_2)\in1\pm2.320=[-1.320,3.320].
$$

## 注意
$S_p^2$ を使えるのは母分散が共通という仮定の下だけである。不等分散なら各群の分散を別々に使うWelch型へ切り替える。

<!-- CARD -->

---
id: ci-welch-interval
title: Welch型区間推定（不等分散）
category: math-estimation
subcategory: math-interval-estimation
topic: welch-interval
type: formula
difficulty: 3
priority: A
hashtags: [Welch, 不等分散, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2つの正規分布 $N(\mu_1,\sigma_1^2)$、$N(\mu_2,\sigma_2^2)$ からの標本で、母分散が等しくないとき、$\mu_1-\mu_2$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$(\overline X-\overline Y)\pm t_{\nu,\alpha/2}\sqrt{\frac{S_1^2}{n_1}+\frac{S_2^2}{n_2}},$$
$$\nu=\frac{\left(\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2}\right)^2}{\dfrac{(S_1^2/n_1)^2}{n_1-1}+\dfrac{(S_2^2/n_2)^2}{n_2-1}}.$$

## 答え
不等分散を許す独立2標本では
$$
(\overline X-\overline Y)
\pm t_{\nu,\alpha/2}
\sqrt{\frac{S_1^2}{n_1}+\frac{S_2^2}{n_2}},
$$
$$
\nu=
\frac{\left(S_1^2/n_1+S_2^2/n_2\right)^2}
{(S_1^2/n_1)^2/(n_1-1)+(S_2^2/n_2)^2/(n_2-1)}.
$$

## 計算例
$n_1=10$, $n_2=12$, $\overline x=15$, $\overline y=14$, $S_1^2=4$, $S_2^2=9$ とする。まず
$$
\frac{S_1^2}{n_1}=\frac4{10}=0.4,
\qquad
\frac{S_2^2}{n_2}=\frac9{12}=0.75.
$$
したがって
$$
SE=\sqrt{0.4+0.75}=\sqrt{1.15}\approx1.072.
$$
自由度は
$$
\begin{aligned}
\nu
&=\frac{1.15^2}{0.4^2/9+0.75^2/11}\\
&=\frac{1.3225}{0.01778+0.05114}\\
&\approx19.19.
\end{aligned}
$$
95%区間で $t_{19.19,0.025}\approx2.094$ とすれば半幅は
$$
2.094\times1.072\approx2.245.
$$
よって
$$
(\mu_1-\mu_2)\in1\pm2.245=[-1.245,3.245].
$$

## 注意
$\nu$ は整数でなくてよい。等分散を仮定して機械的に $n_1+n_2-2$ を使わず、標準誤差と自由度の両方をWelch型にする。

<!-- CARD -->

---
id: ci-proportion
title: 母比率の正規近似区間
category: math-estimation
subcategory: math-interval-estimation
topic: proportion-ci
type: formula
difficulty: 2
priority: S
hashtags: [母比率, 正規近似, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
ベルヌーイ標本から母比率 $p$ の信頼区間を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p));\quad \widehat p\pm z_{\alpha/2}\sqrt{\frac{\widehat p(1-\widehat p)}{n}}.$$

## 答え
大標本でのWald型区間は
$$
\widehat p\pm z_{\alpha/2}
\sqrt{\frac{\widehat p(1-\widehat p)}{n}}.
$$

## 計算例
$n=100$ 回中 $x=40$ 回成功したとする。標本比率は
$$
\widehat p=\frac{40}{100}=0.4.
$$
推定標準誤差は
$$
\begin{aligned}
SE
&=\sqrt{\frac{0.4(1-0.4)}{100}}\\
&=\sqrt{0.0024}\\
&\approx0.0490.
\end{aligned}
$$
95%区間では $z_{0.025}=1.96$ なので半幅は
$$
1.96\times0.0490\approx0.0960.
$$
よって
$$
p\in0.4\pm0.0960=[0.304,0.496].
$$

## 注意
これは正規近似に基づくWald区間である。$n$ が小さい場合や $\widehat p$ が0または1に近い場合は被覆が悪くなりやすく、Wilson区間やClopper--Pearson正確区間などを検討する。

<!-- CARD -->

---
id: ci-proportion-diff
title: 母比率差の区間推定
category: math-estimation
subcategory: math-interval-estimation
topic: proportion-diff-ci
type: formula
difficulty: 3
priority: A
hashtags: [母比率差, 信頼区間, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2群の母比率 $p_1,p_2$ の差の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$(\widehat p_1-\widehat p_2)\pm z_{\alpha/2}\sqrt{\frac{\widehat p_1(1-\widehat p_1)}{n_1}+\frac{\widehat p_2(1-\widehat p_2)}{n_2}}.$$

## 答え
独立2群の母比率差では
$$
(\widehat p_1-\widehat p_2)
\pm z_{\alpha/2}
\sqrt{
\frac{\widehat p_1(1-\widehat p_1)}{n_1}
+\frac{\widehat p_2(1-\widehat p_2)}{n_2}
}.
$$

## 計算例
群1は $n_1=100$ 中60成功、群2は $n_2=80$ 中36成功とする。
$$
\widehat p_1=0.60,
\qquad
\widehat p_2=0.45,
\qquad
\widehat p_1-\widehat p_2=0.15.
$$
区間推定では各群の比率を個別に使い
$$
\begin{aligned}
SE^2
&=\frac{0.60(0.40)}{100}
+\frac{0.45(0.55)}{80}\\
&=0.0024+0.00309375\\
&=0.00549375,
\end{aligned}
$$
したがって
$$
SE\approx0.0741.
$$
95%区間の半幅は
$$
1.96\times0.0741\approx0.1453.
$$
よって
$$
p_1-p_2\in0.15\pm0.1453
=[0.0047,0.2953].
$$

## 注意
$H_0:p_1=p_2$ の検定では帰無仮説の下で比率をプールする場合があるが、母比率差そのもののWald区間では通常、各群の標本比率で分散を個別推定する。

<!-- CARD -->

---
id: ci-one-sided
title: 片側信頼区間の定義と構成
category: math-estimation
subcategory: math-interval-estimation
topic: one-sided-ci
type: formula
difficulty: 2
priority: S
hashtags: [片側信頼区間, 信頼係数, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
片側信頼区間（上側・下側）を定義し、正規平均既知分散での形を示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

下側：$P(\theta\ge \overline X-z_{\alpha}\sigma/\sqrt n)=1-\alpha$。上側：$P(\theta\le \overline X+z_{\alpha}\sigma/\sqrt n)=1-\alpha$。

## 答え
正規平均・分散既知で信頼係数 $1-\alpha$ の下側信頼限界は
$$
L=\overline X-z_\alpha\frac{\sigma}{\sqrt n},
$$
上側信頼限界は
$$
U=\overline X+z_\alpha\frac{\sigma}{\sqrt n}.
$$
したがって区間はそれぞれ $[L,\infty)$、$(-\infty,U]$ である。

## 計算例
$\overline x=10$, $\sigma=2$, $n=25$、95%片側区間を考える。標準誤差は
$$
\frac{\sigma}{\sqrt n}=\frac2{5}=0.4.
$$
$z_{0.05}=1.645$ なので片側の半幅は
$$
1.645\times0.4=0.658.
$$
よって下側95%信頼区間は
$$
[10-0.658,\infty)=[9.342,\infty),
$$
上側95%信頼区間は
$$
(-\infty,10+0.658]=(-\infty,10.658].
$$

## 注意
同じ95%でも両側区間は両端へ2.5%ずつ振り分けるので $z_{0.025}=1.96$、片側区間は片方へ5%を置くので $z_{0.05}=1.645$ を使う。

<!-- CARD -->

---
id: ci-duality-acceptance
title: 受容域が信頼区間になることを確認する
category: math-estimation
subcategory: math-interval-estimation
topic: duality-acceptance
type: proof_step
difficulty: 3
priority: S
hashtags: [双対性, 受容域, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
両側 $z$ 検定の受容域が、正規平均既知分散の信頼区間と一致することを示せ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

受容域 $\{|\overline x-\mu|\le z_{\alpha/2}\sigma/\sqrt n\}$ を $\mu$ に関して書くと $\mu\in[\overline x\pm z_{\alpha/2}\sigma/\sqrt n]$。

## 答え
$|z|=|\overline x-\mu|/(\sigma/\sqrt n)\le z_{\alpha/2}$ を $\mu$ について解くと、ちょうど両側区間になる。

## 計算例
検定で棄却しない $\mu$ は、区間内の $\mu$ と一致する。

## 注意
検定と区間は同じ統計量・同じ片側または両側の棄却域を使って反転する。異なる検定を反転すれば異なる信頼集合になる。

<!-- CARD -->

---
id: ci-asymptotic-mle
title: 最尤推定量に基づく漸近信頼区間
category: math-estimation
subcategory: math-interval-estimation
topic: asymptotic-mle-ci
type: formula
difficulty: 3
priority: S
hashtags: [最尤推定, 漸近正規性, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
正則条件の下で、最尤推定量 $\widehat\theta$ から $\theta$ の漸近信頼区間を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\widehat\theta\pm z_{\alpha/2}\,\frac{1}{\sqrt{n\,I_1(\widehat\theta)}},$$
または対数尤度のヘッセ行列から標準誤差を推定する。

## 答え
正則条件の下で
$$
\sqrt n(\widehat\theta-\theta)
\xrightarrow{d}
N\left(0,I_1(\theta)^{-1}\right).
$$
よってPlug-inしたWald型漸近区間は
$$
\widehat\theta
\pm z_{\alpha/2}
\frac1{\sqrt{nI_1(\widehat\theta)}}.
$$
この区間は $n\to\infty$ で被覆確率が $1-\alpha$ へ収束する。

## 計算例
$X_i\sim\operatorname{Poisson}(\lambda)$ では
$$
\widehat\lambda=\overline X,
\qquad
I_1(\lambda)=\frac1\lambda.
$$
$n=100$, $\widehat\lambda=4$ とすると
$$
I_1(\widehat\lambda)=\frac14.
$$
推定標準誤差は
$$
\begin{aligned}
\widehat{SE}(\widehat\lambda)
&=\frac1{\sqrt{100\cdot(1/4)}}\\
&=\frac1{5}\\
&=0.2.
\end{aligned}
$$
95%区間では
$$
4\pm1.96(0.2)
=4\pm0.392,
$$
したがって
$$
\lambda\in[3.608,4.392].
$$

## 注意
これは有限標本で正確な区間とは限らない。情報量を真値 $\theta$ で評価できないため、通常は $I_1(\widehat\theta)$ や観測情報量を使う。

<!-- CARD -->

---
id: ci-delta-method
title: デルタ法による信頼区間
category: math-estimation
subcategory: math-interval-estimation
topic: delta-method-ci
type: formula
difficulty: 3
priority: S
hashtags: [デルタ法, 信頼区間, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$\sqrt n(T_n-\theta)$ が正規分布 $N(0,\sigma^2)$ へ分布収束するとする。$\eta=g(\theta)$ の信頼区間をデルタ法で書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$g(T_n)\pm z_{\alpha/2}\,|g'(T_n)|\,\frac{\widehat\sigma}{\sqrt n}.$$

## 答え
$\sqrt n(T_n-\theta)\xrightarrow{d}N(0,\sigma^2)$ で $g$ が微分可能なら
$$
\sqrt n\{g(T_n)-g(\theta)\}
\xrightarrow{d}
N\left(0,g'(\theta)^2\sigma^2\right).
$$
したがって
$$
g(T_n)\pm z_{\alpha/2}|g'(T_n)|\,\widehat{SE}(T_n)
$$
を漸近信頼区間として用いる。

## 計算例
$T_n$ が $\theta$ を推定し、観測値が
$$
T_n=\log2\approx0.693,
\qquad
\widehat{SE}(T_n)=0.10
$$
とする。$g(\theta)=e^\theta$ を推定したい。
$$
g(T_n)=e^{\log2}=2,
\qquad
g'(T_n)=e^{\log2}=2.
$$
よって変換後の標準誤差は
$$
\widehat{SE}\{g(T_n)\}
=|g'(T_n)|\widehat{SE}(T_n)
=2\times0.10=0.20.
$$
95%区間は
$$
2\pm1.96(0.20)
=2\pm0.392,
$$
したがって
$$
e^\theta\in[1.608,2.392].
$$

## 注意
デルタ法は局所線形化による近似である。非線形性が強い場合、$T_n$ の区間端点を $g$ で変換する方法と数値的に異なることがある。

<!-- CARD -->

---
id: ci-sample-size-for-width
title: 目標幅から必要標本サイズを決める
category: math-estimation
subcategory: math-interval-estimation
topic: sample-size-for-width
type: calc_step
difficulty: 3
priority: S
hashtags: [標本サイズ, 区間幅, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
正規平均・分散既知で、半幅を $E$ 以下にしたい。必要な $n$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$n=\left\lceil\left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2\right\rceil.$$

## 答え
正規平均・分散既知で両側信頼区間の半幅を $E$ 以下にするには
$$
z_{\alpha/2}\frac{\sigma}{\sqrt n}\le E
$$
を満たせばよい。したがって
$$
n\ge
\left(\frac{z_{\alpha/2}\sigma}{E}\right)^2,
\qquad
n=
\left\lceil
\left(\frac{z_{\alpha/2}\sigma}{E}\right)^2
\right\rceil.
$$

## 計算例
$\sigma=2$, 目標半幅 $E=0.5$、95%信頼区間なら $z_{0.025}=1.96$ なので
$$
\begin{aligned}
n
&\ge\left(\frac{1.96\cdot2}{0.5}\right)^2\\
&=7.84^2\\
&=61.4656.
\end{aligned}
$$
よって整数へ切り上げて
$$
n=62.
$$

同じ $\sigma,E$ で90%区間なら $z_{0.05}=1.645$ なので
$$
\begin{aligned}
n
&\ge\left(\frac{1.645\cdot2}{0.5}\right)^2\\
&=6.58^2\\
&\approx43.30,
\end{aligned}
$$
よって $n=44$ で足りる。**信頼係数を95%へ上げると分位点が大きくなり、同じ幅を保つため必要標本数も44から62へ増える**。

## 注意
固定した $n$ では信頼係数を上げるほど区間は広くなる。逆に区間幅を固定したまま信頼係数を上げるには $n$ を増やす必要がある。$\sigma$ 未知なら事前研究・予備調査などの保存的な見積もりを用いる。

<!-- CARD -->

---
id: ci-poisson-rate-exact
title: ポアソン率の正確信頼区間をカイ二乗分位点で作る
category: math-estimation
subcategory: math-interval-estimation
topic: exact-poisson-rate-confidence-interval
type: calc_step
difficulty: 4
priority: S
hashtags: [ポアソン分布, 正確信頼区間, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
観測時間 $T$ における事象数 $K$ がポアソン分布 $\operatorname{Poisson}(T\lambda)$ に従う。観測値 $k=5$、$T=10$ のとき、$\lambda$ の95%正確信頼区間を求めよ。下側確率 $q$ のカイ二乗分位点を $\chi^2_{\nu;q}$ とし、$\chi^2_{10;0.025}=3.247$、$\chi^2_{12;0.975}=23.337$ を用いよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$K\sim\operatorname{Poisson}(\Lambda)$ の観測値が $k>0$ のとき、信頼係数 $1-\alpha$ の正確区間は
$$\Lambda_L=\frac12\chi^2_{2k;\alpha/2},\qquad
\Lambda_U=\frac12\chi^2_{2(k+1);1-\alpha/2}.$$
$\Lambda=T\lambda$ なので両端を $T$ で割る。

## 一手
ポアソン平均の区間を先に作り、最後に観測時間で割って率へ戻す。

## 答え
$$\lambda\in
\left[\frac{\chi^2_{2k;0.025}}{2T},
\frac{\chi^2_{2(k+1);0.975}}{2T}\right]
=\left[\frac{3.247}{20},\frac{23.337}{20}\right]
\approx[0.162,1.167].$$

## 計算例
まず平均事象数 $\Lambda$ の区間を作ると
$$\Lambda_L=\frac12(3.247)=1.6235,\qquad
\Lambda_U=\frac12(23.337)=11.6685.$$
次に $T=10$ で割って
$$\lambda_L=0.16235,\qquad \lambda_U=1.16685.$$

## 注意
$k=0$ のとき下端は0とする。

<!-- CARD -->

---
id: ci-clopper-pearson-zero-success
title: 成功0回の二項比率にClopper–Pearson正確区間を作る
category: math-estimation
subcategory: math-interval-estimation
topic: clopper-pearson-zero-success
type: calc_step
difficulty: 3
priority: S
hashtags: [二項分布, 正確信頼区間, Clopper–Pearson区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
$X\sim\operatorname{Binomial}(n,p)$ で $n=20$、観測成功数が $x=0$ だった。Clopper–Pearsonの95%両側正確信頼区間を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

観測値 $x=0$ の両側区間では下端を0とし、上端 $p_U$ は
$$P_{p_U}(X=0)=(1-p_U)^n=\frac\alpha2$$
を満たすように定める。したがって
$$p_U=1-(\alpha/2)^{1/n}.$$

## 一手
成功0回では、二項確率のうち $P(X=0)=(1-p)^n$ だけで上端を解ける。

## 答え
$$p\in\left[0,\ 1-(0.025)^{1/20}\right]\approx[0,0.1684].$$

## 計算例
$\alpha=0.05,n=20$ だから
$$p_U=1-0.025^{1/20}.$$
対数を使うと
$$0.025^{1/20}
=\exp\left(\frac{\log0.025}{20}\right)
\approx\exp(-0.18444)\approx0.8316,$$
よって $p_U\approx1-0.8316=0.1684$。

## 注意
Wald区間は $x=0$ で幅0になってしまうため、この状況には不適切である。

<!-- CARD -->

---
id: ci-paired-mean-difference
title: 対応のある平均差のt信頼区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: paired-mean-confidence-interval
type: calc_step
difficulty: 2
priority: S
hashtags: [対応のあるデータ, 平均差, t分布, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
同じ10人の処置前後の差を $D_i=Y_i-X_i$ とし、$\overline d=2.4$、$s_D=1.5$ を得た。差が正規分布に従うとして、母平均差 $\mu_D$ の95%信頼区間を求めよ。$t_{9;0.975}=2.262$ とする。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対応のあるデータは各ペアの差 $D_i$ を1標本として扱う。
$$\frac{\overline D-\mu_D}{S_D/\sqrt n}\sim t_{n-1}.$$

## 一手
対応ありでは2群の分散を別々に足さず、最初に個体内差を作る。

## 答え
$$\mu_D\in
\overline d\pm t_{n-1;0.975}\frac{s_D}{\sqrt n}
=2.4\pm2.262\frac{1.5}{\sqrt{10}}
\approx[1.327,3.473].$$

## 計算例
標準誤差は
$$\frac{1.5}{\sqrt{10}}\approx0.4743.$$
半幅は
$$2.262(0.4743)\approx1.073.$$
したがって
$$2.4-1.073=1.327,\qquad
2.4+1.073=3.473.$$

## 注意
自由度はペア数から1を引いた $n-1=9$ である。
