# ML2-24 離散拡散模型と逆向き推論

[前章のGaussian denoising恒等式](../ML2-23/index.md#thm-ml2-23-denoising-identity)は、ノイズを加えた分布のscoreと条件付き平均を結んだ。しかし、ノイズの大きい観測から一度だけ平均を推定しても、元の分布から新しい標本を作ったことにはならない。**少しずつノイズを加える過程を逆向きにたどる**には、どの条件付き分布が必要だろうか。

本章では時刻 $t=0,1,\ldots,T$ を有限個とし、正方向のGaussian連鎖、元のデータを条件とする逆向き事後分布、ノイズ予測の学習損失を導く。最後に、元のデータを知らずに使う逆向き分布と、計算のために使う「元のデータを条件とした事後分布」を厳密に区別する。連続時間の逆向き確率微分方程式には踏み込まない。

## 1. 正方向：小さなGaussianノイズを積み重ねる

データを表す $\mathbb R^d$ 値確率変数を $X_0$ とする。整数 $T\ge2$ を選び、時刻 $t=1,\ldots,T$ ごとにノイズの**分散率** $\beta_t$ を $0<\beta_t<1$ とする。$\alpha_t=1-\beta_t$ は直前の値を残す倍率の二乗、$\bar\alpha_t=\prod_{j=1}^t\alpha_j$ は初期値の影響が残る倍率の二乗を表す。$\bar\alpha_0=1$ とする。

ノイズ $Z_1,\ldots,Z_T$ は互いに独立な $N_d(0,I_d)$ に従い、$X_0$ とも独立である。$I_d$ は単位行列、$N_d(m,vI_d)$ は平均 $m$、共分散 $vI_d$ の多次元正規分布である。

<a id="def-ml2-24-forward-chain"></a>

<!-- formal-statement-start -->
> **定義（離散Gaussian正方向拡散）**
> 上記の $T,\beta_t,\alpha_t,\bar\alpha_t,Z_t$ を用い、$X_0$ から次のMarkov連鎖を作る。

$$
X_t=\sqrt{\alpha_t}\,X_{t-1}+\sqrt{\beta_t}\,Z_t,
\qquad t=1,\ldots,T.
$$

> 直前の状態を与えた条件付き密度は

$$
q(x_t\mid x_{t-1})=(2\pi\beta_t)^{-d/2}
\exp\left(-\frac{\|x_t-\sqrt{\alpha_t}x_{t-1}\|^2}{2\beta_t}\right).
$$

> $q$ は正方向の分布を表す記号である。$X_0$ の分布は任意とし、最初からGaussianであるとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-24-forward-chain -->
**定義の確認**。一次元で $\beta_1=3/4$、$X_0=2$ が確定しているとする。$\alpha_1=1/4$ なので $X_1=1+\sqrt3 Z_1/2$、従って $X_1\mid X_0=2\sim N(1,3/4)$。条件付き密度は全実数で正、積分1であり、指定した平均と分散を持つ。$\beta_t$ は標準偏差ではなく**分散**に入る。
<!-- definition-example-end -->

$X_t$ は $X_{t-1}$ が分かればそれより前の状態に依存しない。これは各時刻で新しい独立ノイズだけを足すためである。連鎖を複数回展開すると、過去のノイズは独立Gaussianの線形和となる。

## 2. 任意時刻へ一度にノイズを加える公式

各時刻を順に計算しなくても、$X_0=x_0$ を与えた $X_t$ の分布を直接書ける。訓練時に時刻を無作為に選ぶため、この公式が重要になる。

<a id="thm-ml2-24-forward-marginal"></a>

<!-- formal-statement-start -->
> **定理（正方向の時刻別Gaussian分布）**
> [正方向拡散](#def-ml2-24-forward-chain)の各 $t=1,\ldots,T$ について、$X_0=x_0$ を条件とする分布は

$$
\boxed{q(x_t\mid x_0)=N_d\bigl(\sqrt{\bar\alpha_t}\,x_0,
(1-\bar\alpha_t)I_d\bigr).}
$$

> すなわち、$\varepsilon\sim N_d(0,I_d)$ を独立に一回抽出し、

$$
X_t=\sqrt{\bar\alpha_t}\,X_0+
\sqrt{1-\bar\alpha_t}\,\varepsilon
$$

> としても、組 $(X_0,X_t)$ の分布は元の連鎖と同じである。ただし同じ $\varepsilon$ を各時刻に流用すると、**異なる時刻の値の組 $(X_1,\ldots,X_T)$ の分布**まで元の連鎖と一致するとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

前時刻の平均と分散に、$\sqrt{\alpha_t}$ の倍率と独立ノイズを適用する。分散の更新が $1-\bar\alpha_t$ に一致することを帰納法で示す。

<!-- proof-start -->
### 証明

$t=1$ では $\bar\alpha_1=\alpha_1$、$1-\bar\alpha_1=\beta_1$ であり、定義通りである。$t-1$ で成立すると仮定すると、$X_0=x_0$ のもとで $X_{t-1}$ は平均 $\sqrt{\bar\alpha_{t-1}}x_0$、共分散 $(1-\bar\alpha_{t-1})I_d$ のGaussianで、$Z_t$ から独立である。従って線形和 $X_t$ もGaussianで、平均は

$$
\sqrt{\alpha_t}\sqrt{\bar\alpha_{t-1}}x_0
=\sqrt{\bar\alpha_t}\,x_0.
$$

交差共分散は独立性と中心化により0である。よって共分散の係数は

$$
\begin{aligned}
\alpha_t(1-\bar\alpha_{t-1})+\beta_t
&=\alpha_t-\alpha_t\bar\alpha_{t-1}+1-\alpha_t\\
&=1-\bar\alpha_t.
\end{aligned}
$$

帰納法が閉じた。右辺を独立標準Gaussianで表示すれば二つ目の式を得る。ただしこれは各固定 $t$ の条件付き周辺分布を表す構成であり、異なる時刻間の条件付き相関を規定していない。$\square$
<!-- proof-end -->

例えば $T=2$、$\beta_1=\beta_2=3/4$ なら $\bar\alpha_2=(1/4)^2=1/16$ であり、$X_2\mid X_0=x_0\sim N(x_0/4,15/16)$ となる。一段ずつ計算すれば $X_2=X_0/4+\sqrt3 Z_1/4+\sqrt3 Z_2/2$ で、ノイズ分散は $3/16+3/4=15/16$ と一致する。

**終端が標準Gaussianに近い条件**。$E\|X_0\|^2<\infty$ のもとでは $\bar\alpha_T$ が小さいほど $\sqrt{\bar\alpha_T}X_0$ の二乗平均は小さく、ノイズの分散係数 $1-\bar\alpha_T$ は1に近い。ただし有限 $T$ で $\bar\alpha_T>0$ なら、周辺分布 $q_T$ が厳密に $N_d(0,I_d)$ になると一般には言えない。初期分布の混合形状が残る。

## 3. 一時刻だけ戻る条件付き事後分布

訓練中は元の $x_0$ を知っている。そこで $X_t=x_t$ と $X_0=x_0$ の**両方を条件**とする $X_{t-1}$ の分布を求める。これは後で導入する生成時の $q(x_{t-1}\mid x_t)$ とは別物である。

<a id="thm-ml2-24-posterior"></a>

<!-- formal-statement-start -->
> **定理（元データ条件付き逆向きGaussian事後）**
> [正方向拡散](#def-ml2-24-forward-chain)の $t=2,\ldots,T$ に対し、$X_0=x_0,X_t=x_t$ のもとで $X_{t-1}$ は次のGaussian分布を持つ。

$$
\boxed{q(x_{t-1}\mid x_t,x_0)
=N_d(\widetilde\mu_t(x_t,x_0),\widetilde\beta_t I_d),}
$$

$$
\widetilde\beta_t=\frac{\beta_t(1-\bar\alpha_{t-1})}{1-\bar\alpha_t},
$$

$$
\widetilde\mu_t(x_t,x_0)=
\frac{\sqrt{\bar\alpha_{t-1}}\,\beta_t}{1-\bar\alpha_t}x_0
+\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}x_t.
$$

> $t=1$ では $X_{t-1}=X_0$ を既に条件としているため、事後は点質量 $\delta_{x_0}$ であり、正の分散を持つGaussianではない。
<!-- formal-statement-end -->

### 証明の見取り図

Bayes公式による二つのGaussian密度の積 $q(x_t\mid x_{t-1})q(x_{t-1}\mid x_0)$ を、未知の $x_{t-1}$ に関して平方完成する。逆分散（精度）を先に足してから、一次項を精度で割る。

<!-- proof-start -->
### 証明

$t\ge2$ とし $u=x_{t-1}$ を未知変数と置く。[正方向の時刻別分布](#thm-ml2-24-forward-marginal)から、$X_0=x_0$ を固定した $u$ の密度は平均 $\sqrt{\bar\alpha_{t-1}}x_0$、共分散 $(1-\bar\alpha_{t-1})I_d$ のGaussianである。Markov性により $q(x_t\mid u,x_0)=q(x_t\mid u)$ なので、Bayes公式の分子は

$$
q(u\mid x_t,x_0)\ \propto\
\exp\left[-\frac{\|u-\sqrt{\bar\alpha_{t-1}}x_0\|^2}
{2(1-\bar\alpha_{t-1})}
-\frac{\|x_t-\sqrt{\alpha_t}u\|^2}{2\beta_t}\right].
$$

$u$ の二次・一次係数をそれぞれ取り出すと、負の対数の $u$ に依存する部分は

$$
\frac12 A_t\|u\|^2-b_t\cdot u,
$$

$$
A_t=\frac1{1-\bar\alpha_{t-1}}+\frac{\alpha_t}{\beta_t},\qquad
b_t=\frac{\sqrt{\bar\alpha_{t-1}}}{1-\bar\alpha_{t-1}}x_0
+\frac{\sqrt{\alpha_t}}{\beta_t}x_t.
$$

分母を通分し、$\beta_t+\alpha_t(1-\bar\alpha_{t-1})=1-\bar\alpha_t$ を使うと

$$
A_t=\frac{1-\bar\alpha_t}{\beta_t(1-\bar\alpha_{t-1})}
=\widetilde\beta_t^{-1}>0.
$$

平方完成は $A_t\|u-A_t^{-1}b_t\|^2/2$ に $u$ と無関係な定数を加えた形である。従って共分散は $A_t^{-1}I_d=\widetilde\beta_t I_d$ であり、平均 $A_t^{-1}b_t$ の $x_0$ と $x_t$ の係数をそれぞれ掛け合わせれば定理の $\widetilde\mu_t$ になる。$t=1$ では条件 $X_0=x_0$ 自体が対象変数を指定している。$\square$
<!-- proof-end -->

**計算例**。$d=1$、$t=2$、$\beta_1=\beta_2=3/4$、$x_0=2$、$x_2=0$ とする。$1-\bar\alpha_1=3/4$、$1-\bar\alpha_2=15/16$ なので

$$
\widetilde\beta_2=\frac{(3/4)(3/4)}{15/16}=\frac35,
\qquad
\widetilde\mu_2=\frac25x_0+\frac25x_2=\frac45.
$$

事後分布は $N(4/5,3/5)$。平均 $4/5$ を「必ずその位置へ戻る」と誤読しない。条件付き分散 $3/5$ は正であり、標本ごとに散らばる。

## 4. 生成時の逆向き分布は、一般には混合分布になる

$x_0$ は訓練標本では既知だが、未知の新標本を作る生成時には使えない。必要なのは $x_t$ だけを与えた逆向きの条件付き分布である。

<a id="prop-ml2-24-reverse-mixture"></a>

<!-- formal-statement-start -->
> **命題（逆向き周辺分布の混合表示）**
> [正方向拡散](#def-ml2-24-forward-chain)の任意のデータ分布に対し、正則条件付き分布が定義される $q_t$ ほとんどすべての $x_t$ で、

$$
\boxed{q(x_{t-1}\mid x_t)=
\int q(x_{t-1}\mid x_t,x_0)\,q(dx_0\mid x_t).}
$$

> ここで右辺は $x_0$ の事後分布に沿った混合を意味する。$t\ge2$ では各成分が[事後Gaussian](#thm-ml2-24-posterior)だが、混合全体が一つのGaussianになるとは限らない。$t=1$ ではデータ分布上の事後分布 $q(dx_0\mid x_1)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$X_t$ を固定しても $X_0$ はまだ不確かなので、条件付き期待値の塔の性質で $X_0$ を消す。どの分布について平均をとるかが肝心である。

<!-- proof-start -->
### 証明

任意の有界可測関数 $h$ について、条件付き期待値の塔の性質を $X_t$ と $(X_t,X_0)$ に適用すると

$$
\begin{aligned}
E[h(X_{t-1})\mid X_t]
&=E\bigl[E[h(X_{t-1})\mid X_t,X_0]\mid X_t\bigr]\\
&=\int\left[\int h(u)\,q(du\mid X_t,x_0)\right]
q(dx_0\mid X_t).
\end{aligned}
$$

これは左辺の条件付き分布が右辺の混合に一致することを意味する。$t=1$ では内側の分布は $\delta_{x_0}$ である。$\square$
<!-- proof-end -->

例えば $P(X_0=-a)=P(X_0=a)=1/2$（$a>0$）なら、$t=1$ の $q(X_0\mid X_1=x_1)$ は二点 $\{-a,a\}$ の上にだけ質量を置く。[前章の二点混合のBayes計算](../ML2-23/index.md#prop-ml2-23-two-point-score)を、$Y=\sqrt{\alpha_1}X_0+\sqrt{\beta_1}Z_1$ に適用すると

$$
P(X_0=a\mid X_1=x_1)=
\frac1{1+\exp[-2\sqrt{\alpha_1}a x_1/\beta_1]}.
$$

この確率は $0$ と $1$ の間にあり、逆向き分布は連続Gaussianではない。データが離散なら、一つのGaussianで正確に逆向き分布を表すこと自体が不可能な場合がある。

## 5. 学習するGaussian逆向き模型とノイズ予測

逆向きの正しい $q(x_{t-1}\mid x_t)$ は未知なので、現実には学習した平均 $\mu_\theta(x_t,t)$ で近似する。まず $t\ge2$ だけについて、計算可能な分散 $\widetilde\beta_t$ を固定したGaussian模型を考える。添字 $\theta$ は学習パラメータを表す。最後の $t=1$ では、GaussianのKL公式をそのまま使わず別の復元規則を設ける。

<a id="def-ml2-24-noise-predictor"></a>

<!-- formal-statement-start -->
> **定義（ノイズ予測による逆向き平均）**
> [正方向の時刻別分布](#thm-ml2-24-forward-marginal)の $\varepsilon$ を予測する関数 $\varepsilon_\theta:\mathbb R^d\times\{1,\ldots,T\}\to\mathbb R^d$ を選ぶ。$t\ge2$ で逆向き平均とGaussian模型を

$$
\mu_\theta(x_t,t)=\frac1{\sqrt{\alpha_t}}
\left(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}
\varepsilon_\theta(x_t,t)\right),
$$

$$
p_\theta(x_{t-1}\mid x_t)
=N_d\bigl(\mu_\theta(x_t,t),\widetilde\beta_t I_d\bigr)
$$

> と定義する。$\widetilde\beta_t$ は[事後定理](#thm-ml2-24-posterior)の正の値である。時刻 $t=1$ の一例として、$X_0^{\mathrm{gen}}=\mu_\theta(X_1,1)$ とする決定的復元を別途指定できるが、これは真の $q(X_0\mid X_1)$ と一般には一致しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-24-noise-predictor -->
**定義の確認**。一次元で $\beta_1=\beta_2=3/4$、$x_0=2$、$x_2=0$ とする。[前節の事後平均](#thm-ml2-24-posterior)を再現したいなら、式 $x_2=\sqrt{\bar\alpha_2}x_0+\sqrt{1-\bar\alpha_2}\varepsilon$ から $\varepsilon=-2/\sqrt{15}$ である。この値を予測関数へ代入すれば

$$
\mu_\theta(0,2)=2\left(0-\frac{3/4}{\sqrt{15}/4}
\cdot\frac{-2}{\sqrt{15}}\right)
=2\cdot\frac{6}{15}=\frac45.
$$

先ほどの事後平均と一致する。
<!-- definition-example-end -->

直前の式は、予測関数が真の実現ノイズを言い当てた仮想的な組の**代数的な検算**である。実際の $\varepsilon_\theta(x_t,t)$ は $x_0$ を入力に取れないため、同じ $x_t$ へ異なるデータから来たときに全実現ノイズを同時に言い当てることはできない。

<a id="thm-ml2-24-noise-kl"></a>

<!-- formal-statement-start -->
> **定理（事後GaussianのKLとノイズ二乗誤差）**
> $t=2,\ldots,T$ とし、$X_0=x_0,X_t=x_t$ を固定する。真の実現ノイズを

$$
\varepsilon=\frac{x_t-\sqrt{\bar\alpha_t}x_0}
{\sqrt{1-\bar\alpha_t}}
$$

> と書く。[事後Gaussian](#thm-ml2-24-posterior)と[逆向き模型](#def-ml2-24-noise-predictor)の共分散を同じ $\widetilde\beta_t I_d$ とした場合、

$$
\boxed{\operatorname{KL}\left(
q(x_{t-1}\mid x_t,x_0)\,\|\,p_\theta(x_{t-1}\mid x_t)
\right)=w_t\|\varepsilon-\varepsilon_\theta(x_t,t)\|^2,}
$$

$$
w_t=\frac{\beta_t^2}{2\widetilde\beta_t\alpha_t(1-\bar\alpha_t)}>0.
$$

> 全時刻に同じ重みを用いる簡略目的 $E_{t,X_0,\varepsilon}\|\varepsilon-\varepsilon_\theta(X_t,t)\|^2$ は学習に利用できるが、**一般にはこのKLの厳密な重み付き和と同一ではない**。$t=1$ は $\widetilde\beta_1=0$ なのでこのKL式の対象外である。
<!-- formal-statement-end -->

### 証明の見取り図

真の事後平均をノイズ $\varepsilon$ で書き換える。その後、共分散の同じGaussian同士のKLが平均差の二乗を分散で割った値となることを、対数密度比から確かめる。

<!-- proof-start -->
### 証明

$x_0=(x_t-\sqrt{1-\bar\alpha_t}\varepsilon)/\sqrt{\bar\alpha_t}$ を[事後平均公式](#thm-ml2-24-posterior)に代入する。$x_t$ の係数は

$$
\frac{\beta_t}{\sqrt{\alpha_t}(1-\bar\alpha_t)}
+\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}
=\frac1{\sqrt{\alpha_t}},
$$

最後の等号では $\beta_t+\alpha_t(1-\bar\alpha_{t-1})=1-\bar\alpha_t$ を使う。一方、$\varepsilon$ の係数は $-\beta_t/[\sqrt{\alpha_t}\sqrt{1-\bar\alpha_t}]$。従って

$$
\widetilde\mu_t(x_t,x_0)=\frac1{\sqrt{\alpha_t}}
\left(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\varepsilon\right).
$$

二つのGaussianの共通共分散を $vI_d$（ここでは $v=\widetilde\beta_t>0$）、平均を $m_q,m_p$ とする。$U\sim N_d(m_q,vI_d)$ の対数密度比の期待値は

$$
\begin{aligned}
E\log\frac{\varphi_{v}(U-m_q)}{\varphi_{v}(U-m_p)}
&=\frac1{2v}E\left[\|U-m_p\|^2-\|U-m_q\|^2\right]\\
&=\frac{\|m_q-m_p\|^2}{2v},
\end{aligned}
$$

ここで $\varphi_v(u)=(2\pi v)^{-d/2}e^{-\|u\|^2/(2v)}$、二乗の交差項の期待値が0であることを使った。平均差は

$$
m_q-m_p=\frac{\beta_t}{\sqrt{\alpha_t}\sqrt{1-\bar\alpha_t}}
\left(\varepsilon_\theta(x_t,t)-\varepsilon\right).
$$

二乗して $2\widetilde\beta_t$ で割ると主張を得る。簡略目的は $w_t$ を取り除くため、時刻別の相対重要度を変える。$\square$
<!-- proof-end -->

学習では標本 $x_0$ を選び、時刻 $t$ と独立ノイズ $\varepsilon$ を選び、[正方向の直接公式](#thm-ml2-24-forward-marginal)で $x_t$ を作り、予測誤差を測る。これは既知の訓練組から損失を計算できる。一方、$\theta$ の更新には[逆伝播](../ML2-14/index.md#thm-ml2-14-reverse-chain)等の最適化が必要であり、ノイズ予測式だけでは最良のパラメータや生成品質は保証されない。

## 6. 最良ノイズ予測とscore、そして逆向き生成

一つの時刻 $t$ を固定する。$X_t$ だけを見る予測関数にとって、最良の実現ノイズ推定は条件付き平均である。その平均と $X_t$ の周辺密度のscoreが一致する関係は[前章のGaussian denoising恒等式](../ML2-23/index.md#thm-ml2-23-denoising-identity)から導ける。

<a id="thm-ml2-24-noise-score"></a>

<!-- formal-statement-start -->
> **定理（最適ノイズ予測と時刻別score）**
> $E\|X_0\|^2<\infty$ とし、[正方向拡散](#def-ml2-24-forward-chain)の固定時刻 $t\ge1$ を考える。$X_t$ の周辺密度を $q_t$、その空間scoreを $s_{q_t}(x)=\nabla_x\log q_t(x)$ とする。二乗可積分な予測関数 $f(X_t)$ の目的 $E\|\varepsilon-f(X_t)\|^2$ の最小点は

$$
\boxed{f^*(x)=E[\varepsilon\mid X_t=x]
=-\sqrt{1-\bar\alpha_t}\,s_{q_t}(x)}
$$

> である（$q_t$ ほとんどすべての $x$ について）。$q_t$ は $X_0$ の分布とGaussianを混合した**周辺密度**であり、$q(x_t\mid x_0)$ とは異なる。
<!-- formal-statement-end -->

### 証明の見取り図

[Gaussian denoisingの条件付き平均恒等式](../ML2-23/index.md#thm-ml2-23-denoising-identity)の二乗誤差分解を使う。続いて $Y=\sqrt{\bar\alpha_t}X_0+\sqrt{1-\bar\alpha_t}\varepsilon$ として、前章の定理の $X$ とノイズ標準偏差を対応させる。

<!-- proof-start -->
### 証明

$r(X_t)=E[\varepsilon\mid X_t]$ とする。$\varepsilon$ は二乗可積分、$f(X_t)$ も仮定により二乗可積分なので、[Gaussian denoisingの条件付き平均恒等式](../ML2-23/index.md#thm-ml2-23-denoising-identity)の二乗誤差分解を適用すると

$$
E\|\varepsilon-f(X_t)\|^2
=E\|\varepsilon-r(X_t)\|^2+E\|r(X_t)-f(X_t)\|^2.
$$

右辺第2項が0となる場合に限り最小値である。次に[正方向の時刻別Gaussian表示](#thm-ml2-24-forward-marginal)で $U=\sqrt{\bar\alpha_t}X_0$、$\sigma=\sqrt{1-\bar\alpha_t}>0$ と置く。$U$ と $\varepsilon$ は独立で $E\|U\|^2<\infty$。[前章のdenoising定理](../ML2-23/index.md#thm-ml2-23-denoising-identity)において $Y=X_t=U+\sigma\varepsilon$、教師信号は $-\varepsilon/\sigma$ だから

$$
s_{q_t}(x)=E[-\varepsilon/\sigma\mid X_t=x]
=-r(x)/\sigma.
$$

$\sigma$ を元へ戻して主張を得る。$\square$
<!-- proof-end -->

**生成手順と限界**。実装上は $X_T^{\mathrm{gen}}\sim N_d(0,I_d)$ から出発し、$t=T,T-1,\ldots,2$ の順に[学習したGaussian模型](#def-ml2-24-noise-predictor)から抽出し、最後の $t=1$ に指定した復元規則を適用する。ただし次の誤差を区別する必要がある。

1. **終端分布の差**：有限 $T$ の $q_T$ は一般に標準Gaussianではない。
2. **逆向き模型の差**：[逆向き混合命題](#prop-ml2-24-reverse-mixture)の真の分布を、固定分散の単一Gaussianで近似している。
3. **学習の差**：有限の学習データ・容量・最適化では、条件付き平均 $f^*$ も正確には得られない。

学習した最適ノイズ予測が周辺scoreを表すことと、Gaussian逆向き連鎖が厳密なデータ分布を生成することは同値ではない。

## 7. 対話ラボ：順方向と逆方向の標本雲

[離散拡散・逆向き推論の対話ラボ](../../../../../../simulation/ml2-24.html)では、二点分布 $P(X_0=2)=\pi$、$P(X_0=-2)=1-\pi$（$0<\pi<1$）を使い、混合比・時刻数・分散率のschedule・seedを変更して、正方向と逆方向の標本を**実際に再抽出**する。正方向は[定義](#def-ml2-24-forward-chain)のMarkov更新を実行し、理論分散 $1-\bar\alpha_t$（$X_0$ 固定時）と、分布全体の分散 $\bar\alpha_t\operatorname{Var}(X_0)+1-\bar\alpha_t$ を区別して標本分散と比較する。

逆向きでは、$x_t$ のもとで二点 $x_0=\pm2$ の事後重みをBayes公式で計算し、さらに[事後Gaussian](#thm-ml2-24-posterior)から抽出する「厳密混合逆向き」と、条件付き平均に置き換えた「単一Gaussian近似」を切り替えられる（後者も $t\ge2$ ではGaussianノイズを引く）。終端標本を真の $q_T$ または標準Gaussianから選び、その違いも観察できる。**厳密混合逆向き**は教材用に真の二点分布を知って計算する比較基準であり、未知データへの学習済み生成器ではない。

表示する「二点への最近距離の二乗平均」はこの模型だけの復元指標である。各時刻の標本のちらばりと、最終的に二点へ戻った比率を比較しよう。描画点は有限個の乱数標本で、証明の代わりにはならない。

## 8. 演習

### Level A

**ML2-24-A01（ノイズ率と時刻別分布）**
- Level: A
- 問題: $d=1,T=2,\beta_1=1/4,\beta_2=1/2$ とし、$X_0=4$ が確定している。$\alpha_1,\alpha_2,\bar\alpha_2$ と $X_2\mid X_0=4$ の平均・分散を求めよ。
<!-- solution-start -->
**詳細解答**。$\alpha_1=3/4$、$\alpha_2=1/2$ であるから $\bar\alpha_2=(3/4)(1/2)=3/8$。[正方向の周辺定理](#thm-ml2-24-forward-marginal)を $t=2,x_0=4$ へ適用すると

$$
E[X_2\mid X_0=4]=4\sqrt{3/8}=\sqrt6,
\quad\operatorname{Var}(X_2\mid X_0=4)=1-3/8=5/8.
$$

時刻別の標準偏差は $\sqrt{5/8}$ であり、分散 $5/8$ と区別する。
<!-- solution-end -->

**ML2-24-A02（事後分散と平均）**
- Level: A
- 問題: $\beta_1=\beta_2=3/4$、$d=1$、$x_0=2,x_2=0$ とする。$X_1\mid x_2,x_0$ の平均と分散を求めよ。
<!-- solution-start -->
**詳細解答**。$\alpha_1=\alpha_2=1/4$、$\bar\alpha_1=1/4$、$\bar\alpha_2=1/16$。$t=2$ で[事後Gaussianの公式](#thm-ml2-24-posterior)の分母は $1-\bar\alpha_2=15/16$ なので

$$
\widetilde\beta_2=\frac{(3/4)(3/4)}{15/16}=\frac35,
$$

$$
\widetilde\mu_2=
\frac{(1/2)(3/4)}{15/16}\cdot2
+\frac{(1/2)(3/4)}{15/16}\cdot0=\frac45.
$$

従って $X_1\mid (X_2=0,X_0=2)\sim N(4/5,3/5)$。
<!-- solution-end -->

**ML2-24-A03（終端分布は常に標準Gaussianか）**
- Level: A
- 問題: $X_0$ は等確率で $-2,2$ をとり、$0<\bar\alpha_T<1$ とする。$E[X_T]$ と $\operatorname{Var}(X_T)$ を求め、一般に $N(0,1)$ と同一ではないことを示せ。
<!-- solution-start -->
**詳細解答**。[正方向の周辺定理](#thm-ml2-24-forward-marginal)の表示を $a=\bar\alpha_T$ と略記すれば $X_T=\sqrt a X_0+\sqrt{1-a}\varepsilon$ である。独立性と $EX_0=0$、$\operatorname{Var}X_0=4$ から

$$
EX_T=0,\qquad \operatorname{Var}X_T=4a+(1-a)=1+3a>1.
$$

従って平均は0だが分散が1でないので標準Gaussianとは一致しない。$a\to0$ なら分散差は小さくなるが、有限 $a>0$ では等号でない。
<!-- solution-end -->

**ML2-24-A04（最後の逆向き時刻）**
- Level: A
- 問題: $t=1$ の $q(x_0\mid x_1,x_0)$ と $q(x_0\mid x_1)$ は同じか。$P(X_0=\pm a)=1/2$ の場合を例に説明せよ。
<!-- solution-start -->
**詳細解答**。前者は $X_0=x_0$ が既に分かっているので、[事後定理](#thm-ml2-24-posterior)の端点の通り点質量 $\delta_{x_0}$。後者は $X_0$ が未知で、$x_1$ を観測したときの事後分布である。

[二点混合命題](#prop-ml2-24-reverse-mixture)から $P(X_0=a\mid x_1)$ は $0$ と $1$ の間、$P(X_0=-a\mid x_1)$ も正である。前者は真値1点に集中し、後者は2点の不確実性を残すので異なる。
<!-- solution-end -->

### Level B

**ML2-24-B01（事後平均のノイズ表示）**
- Level: B
- 問題: $t\ge2$ とし、$\varepsilon=(x_t-\sqrt{\bar\alpha_t}x_0)/\sqrt{1-\bar\alpha_t}$ とする。$\widetilde\mu_t=(x_t-\beta_t\varepsilon/\sqrt{1-\bar\alpha_t})/\sqrt{\alpha_t}$ を導出せよ。
<!-- solution-start -->
**詳細解答**。$x_0=(x_t-\sqrt{1-\bar\alpha_t}\varepsilon)/\sqrt{\bar\alpha_t}$ を[元データ条件付き逆向きGaussian事後](#thm-ml2-24-posterior)の平均へ代入すると

$$
\widetilde\mu_t=
\frac{\beta_t}{\sqrt{\alpha_t}(1-\bar\alpha_t)}x_t
-\frac{\beta_t}{\sqrt{\alpha_t}\sqrt{1-\bar\alpha_t}}\varepsilon
+\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}x_t.
$$

$x_t$ の係数の分子をまとめれば $\beta_t+\alpha_t(1-\bar\alpha_{t-1})=1-\bar\alpha_t$。よって係数は $1/\sqrt{\alpha_t}$ となり所望の表示が得られる。
<!-- solution-end -->

**ML2-24-B02（KLの重みを具体化）**
- Level: B
- 問題: $\beta_1=\beta_2=3/4$、$t=2$ の $\widetilde\beta_2$ と $w_2$ を求め、ノイズ誤差 $\varepsilon_\theta-\varepsilon=1/2$ のとき事後GaussianのKLを計算せよ。
<!-- solution-start -->
**詳細解答**。$\bar\alpha_2=1/16$、$\alpha_2=1/4$、[元データ条件付き逆向きGaussian事後](#thm-ml2-24-posterior)の分散式より $\widetilde\beta_2=3/5$。従って[KLとノイズ損失の定理](#thm-ml2-24-noise-kl)の係数は

$$
w_2=\frac{(3/4)^2}{2(3/5)(1/4)(15/16)}
=\frac{9/16}{9/32}=2.
$$

従ってKLは $w_2(1/2)^2=2/4=1/2$。KLは非負であり、同じ共分散の正規分布の平均差の二乗を二倍分散で割った式と一致する。
<!-- solution-end -->

**ML2-24-B03（混合逆向きの事後重み）**
- Level: B
- 問題: $X_0=\pm a$ が等確率、$X_t=\sqrt{\bar\alpha_t}X_0+\sqrt{1-\bar\alpha_t}\varepsilon$（$a>0$）とする。$P(X_0=a\mid X_t=x)$ を求め、$x=0$ での値を説明せよ。
<!-- solution-start -->
**詳細解答**。$c=\sqrt{\bar\alpha_t}a$、$v=1-\bar\alpha_t>0$ とおく。$X_0=\pm a$ の条件付き密度は $N(\pm c,v)$ であるからBayes公式で

$$
P(X_0=a\mid X_t=x)=
\frac{\exp[-(x-c)^2/(2v)]}
{\exp[-(x-c)^2/(2v)]+\exp[-(x+c)^2/(2v)]}.
$$

分母・分子を最初の指数で割り、$(x+c)^2-(x-c)^2=4cx$ を使えば

$$
P(X_0=a\mid X_t=x)=\frac1{1+\exp(-2cx/v)}.
$$

$x=0$ では両成分の尤度が等しく、事後確率は $1/2$。$c>0$ のとき $x$ が正なら $a$ の事後確率が高い。
<!-- solution-end -->

**ML2-24-B04（逆向き平均だけでは分散を失う）**
- Level: B
- 問題: $X_0=\pm a$ を等確率とし、$W=P(X_0=a\mid X_1=x)$ と置く。$E[X_0\mid X_1=x]$ と $\operatorname{Var}(X_0\mid X_1=x)$ を $W$ で表し、事後平均だけを返す決定的復元で失われるものを述べよ。
<!-- solution-start -->
**詳細解答**。条件付き分布は $a$ に確率 $W$、$-a$ に確率 $1-W$ を置くから

$$
m=aW-a(1-W)=a(2W-1),\qquad E[X_0^2\mid x]=a^2.
$$

従って

$$
\operatorname{Var}(X_0\mid x)=a^2-m^2
=a^2[1-(2W-1)^2]=4a^2W(1-W).
$$

$0<W<1$ なら条件付き分散は正だが、$X_0^{\mathrm{gen}}=m$ は $x$ を固定すると確定値で条件付き分散0。混合逆向きの標本変動を失い、$m$ 自体が $\pm a$ のどちらでもないこともある。
<!-- solution-end -->

### Level C

**ML2-24-C01（正逆拡散・学習損失の統合）**
- Level: C
- 問題: $d=1,T=2$、$P(X_0=\pm2)=1/2$、$\beta_1=\beta_2=3/4$ とする。

  1. $q(x_2\mid x_0)$ と $EX_2,\operatorname{Var}X_2$ を求めよ。
  2. $x_2=0$ のもとで $P(X_0=2\mid X_2=0)$ と $q(x_1\mid x_2=0)$ を明示せよ。
  3. 同じ $x_2=0$ で $q(x_1\mid x_2=0,x_0=2)$ と、$x_0$ を消した分布の分散を比べよ。
  4. $\varepsilon_\theta(0,2)=0$ と予測したとき、真の $x_0=2$ の訓練組に対するKL値を求めよ。これを生成分布の一致と混同できない理由を述べよ。
<!-- solution-start -->
**詳細解答**。

(1) $\bar\alpha_2=1/16$ なので[正方向の周辺定理](#thm-ml2-24-forward-marginal)から $q(x_2\mid x_0)=N(x_0/4,15/16)$。全期待値で $EX_2=E(X_0/4)=0$。条件付き分散の期待値と条件付き平均の分散を加えると

$$
\operatorname{Var}X_2=\frac{15}{16}
+\operatorname{Var}(X_0/4)=\frac{15}{16}+\frac4{16}=\frac{19}{16}.
$$

(2) $x_2=0$ は両成分 $N(\pm1/2,15/16)$ で同じ尤度なので、[事後重み公式](#prop-ml2-24-reverse-mixture)から $P(X_0=2\mid X_2=0)=1/2$。一方、[事後Gaussian](#thm-ml2-24-posterior)で $x_0=\pm2$ のときの平均は $\pm4/5$、分散は $3/5$。従って $q(x_1\mid x_2=0)$ は

$$
\frac12N\left(\frac45,\frac35\right)
+\frac12N\left(-\frac45,\frac35\right)
$$

という等確率の混合分布である。

(3) $x_0=2$ を条件に追加すると $N(4/5,3/5)$ だけになる。混合分布の平均は0、分散は「成分内分散＋成分平均の分散」で

$$
\operatorname{Var}(X_1\mid X_2=0)
=\frac35+\left(\frac45\right)^2
=\frac{15}{25}+\frac{16}{25}=\frac{31}{25}.
$$

元データを条件に加えた分散 $3/5$ より大きい。

(4) 真の実現ノイズは

$$
\varepsilon=\frac{0-(1/4)\cdot2}{\sqrt{15}/4}
=-\frac2{\sqrt{15}}.
$$

[KLとノイズ誤差の定理](#thm-ml2-24-noise-kl)の $w_2=2$ を用いれば

$$
\operatorname{KL}=2\left(0+\frac2{\sqrt{15}}\right)^2
=\frac8{15}.
$$

これは指定した一組 $(x_0,x_2)$ で二つの**条件付きGaussian**を比較した値に過ぎない。生成時には $x_0$ を知らず、終端分布の差や[混合逆向き](#prop-ml2-24-reverse-mixture)の形の違いも残る。従ってこの一組のKLだけで生成分布の一致は言えない。
<!-- solution-end -->

## 9. まとめと次章への橋

- 正方向のMarkov連鎖は各固定時刻で $q(x_t\mid x_0)=N_d(\sqrt{\bar\alpha_t}x_0,(1-\bar\alpha_t)I_d)$ と一度に抽出できる。
- $q(x_{t-1}\mid x_t,x_0)$ は $t\ge2$ でGaussianだが、生成時に必要な $q(x_{t-1}\mid x_t)$ は一般にはその混合であり、同じ分布ではない。
- 共分散を固定した逆向きGaussianのKLは、正の時刻別重みを掛けたノイズ予測二乗誤差へ変換できる。均等重みの簡略損失と混同しない。
- 最良のノイズ予測は時刻別周辺密度のscoreを与えるが、有限時刻の終端近似・逆向き模型の形・学習誤差は別々に検証する必要がある。次章は複数の生成方式を評価指標で比較する。
