# ML2-23 Score matchingとノイズ除去

[前章の敵対的生成モデル](../ML2-22/index.md#def-ml2-22-adversarial-value)は識別器によって分布を比較した。[正規化flow](../ML2-21/index.md#def-ml2-21-flow)は密度を計算できるが、一般に密度の正規化定数を求めるのは難しい。そこで密度の値そのものではなく、**どちらの方向へ密度が増えるか**を学習できないだろうか。

本章では連続空間上の score（対数密度の空間勾配）を定義し、正規化定数の要らない目的関数を導く。さらに観測に Gaussian ノイズを加えると、密度の未知の score を、既知のノイズの score で学習できる。この二つの主張は関連するが、**ノイズ付き分布の score は元の分布の score と同一ではない**ことに注意する。対数は自然対数とする。

## 1. 確率密度の値ではなく、傾きを学ぶ

$x\in\mathbb R^d$ における密度 $p(x)$ が正で微分可能なら、$\log p(x)$ の $x$ に関する勾配を考えられる。パラメータ $\theta$ を微分する勾配ではなく、**観測位置 $x$ を動かす方向**を表すベクトルである。密度を $p(x)=\widetilde p(x)/Z$、$Z>0$ は $x$ と無関係、と書けるなら $\log p=\log\widetilde p-\log Z$ であり、微分すると $Z$ が消える。

<a id="def-ml2-23-score"></a>

<!-- formal-statement-start -->
> **定義（密度のscore）**
> $\mathbb R^d$ の全点で正で、連続微分可能な確率密度 $p:\mathbb R^d\to(0,\infty)$ に対し、密度のscoreを次のベクトル場とする。

$$
s_p(x)=\nabla_x\log p(x)
=\frac{\nabla_x p(x)}{p(x)}\in\mathbb R^d.
$$

> $p_\theta=\widetilde p_\theta/Z_\theta$（$Z_\theta>0$ が $x$ に依存しない）の場合、$s_{p_\theta}=\nabla_x\log\widetilde p_\theta$ である。$p=0$ の点ではこの定義を無条件に使わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-23-score -->
**定義の確認**。一次元正規密度 $p(x)=(2\pi v)^{-1/2}\exp\{-(x-m)^2/(2v)\}$（$v>0$）は全実数で正かつ微分可能で、$\log p$ を $x$ で微分して

$$
s_p(x)=-\frac{x-m}{v}
$$

を得る。$x<m$ なら正で密度が増える右方向、$x>m$ なら負で密度が増える左方向を指す。係数 $(2\pi v)^{-1/2}$ は微分で消える。一方、平均についての微分 $\partial_m\log p=(x-m)/v$ は別の対象である。
<!-- definition-example-end -->

正規化しないエネルギー模型 $\widetilde p_\theta(x)=\exp[-E_\theta(x)]$ なら score は $-\nabla_xE_\theta(x)$ であり、$Z_\theta$ を計算しなくてよい。ただし score の一致は密度の一致を直ちに意味するわけではない。連結な $\mathbb R^d$ 上の正で滑らかな二密度の score が全点一致すれば、$\nabla\log(p/q)=0$ となり $p=Cq$、積分1から $C=1$ である。支持集合が切れた場合や、score が定義できない境界を持つ場合は、各連結成分間の質量比が残り得る。

## 2. Score matching：未知の真のscoreを消す

真の分布 $p$ から独立標本を得るが、$s_p$ は計算できないとする。候補となる連続微分可能なベクトル値関数 $s_\theta$ と真の score の二乗誤差を小さくしたい。形式上の目的に $s_p$ が入っていても、部分積分でそれを消せる。ただし、**境界項が消えることが核心的な仮定**である。

<a id="def-ml2-23-fisher-discrepancy"></a>

<!-- formal-statement-start -->
> **定義（Fisher型score差）**
> $\mathbb R^d$ 上の全点で正の $C^1$ 確率密度 $p$ と、可測なベクトル場 $s:\mathbb R^d\to\mathbb R^d$ に対し、$E_p\|s(X)\|^2$ と $E_p\|s_p(X)\|^2$ が有限のとき、score差を

$$
\mathcal J_p(s)=\frac12 E_p\left[\|s(X)-s_p(X)\|^2\right]
$$

> と定義する。ここで $X\sim p$、$\|\cdot\|$ はEuclidノルムである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-23-fisher-discrepancy -->
**定義の確認**。$p=N(0,1)$ では $s_p(x)=-x$。$s(x)=-x+c$ と置くと $s-s_p=c$ は定数で、$E_p[c^2]=c^2<\infty$、また $E_p[X^2]=1$ だから両二乗可積分性が成り立ち、

$$
\mathcal J_p(s)=\frac{c^2}{2}.
$$

$c=0$ で差は0になる。これはパラメータ $\theta$ の通常のFisher情報量と同じ定義ではなく、**空間scoreの差**を測っている。
<!-- definition-example-end -->

座標 $i$ ごとに積分を考える。$s_\theta=(s_{\theta,1},\ldots,s_{\theta,d})$ について発散を $\operatorname{div}s_\theta=\sum_i\partial_{x_i}s_{\theta,i}$ と書く。これはベクトル場の各成分を対応する座標で微分して足した量である。

<a id="thm-ml2-23-score-matching"></a>

<!-- formal-statement-start -->
> **定理（部分積分によるscore matching恒等式）**
> $p$ は $\mathbb R^d$ 上で正の $C^1$ 確率密度、$s_\theta$ は $C^1$ ベクトル場とする。$E_p\|s_p\|^2$、$E_p\|s_\theta\|^2$ と $E_p|\operatorname{div}s_\theta|$ は有限とする。各座標について、他の座標を固定した一次元積分に部分積分を適用でき、その境界項を積分しても0、すなわち

$$
\int_{\mathbb R^{d-1}}
\left[p(x)s_{\theta,i}(x)\right]_{x_i=-\infty}^{x_i=+\infty}
\,dx_{-i}=0\quad(i=1,\ldots,d)
$$

> が成り立ち、Fubiniの積分交換が許されると仮定する。このとき[score差](#def-ml2-23-fisher-discrepancy)は

$$
\boxed{\mathcal J_p(s_\theta)=
E_p\left[\frac12\|s_\theta(X)\|^2+
\operatorname{div}s_\theta(X)\right]+C_p,}
\qquad
C_p=\frac12E_p\|s_p(X)\|^2.
$$

> $C_p$ は $\theta$ に依存しない。従って右辺の期待値だけを $\theta$ について最小化すればよい。
<!-- formal-statement-end -->

### 証明の見取り図

二乗を展開すると未知の $s_p$ を含む交差項が残る。$p\,s_{p,i}=\partial_{x_i}p$ と書き直して、座標ごとに導関数を $p$ から $s_{\theta,i}$ へ移す。

<!-- proof-start -->
### 証明

二乗を展開し、Cauchy–Schwarz不等式による交差項の絶対可積分性を確認すると、

$$
\begin{aligned}
\mathcal J_p(s_\theta)
&=\frac12E_p\|s_\theta\|^2
-E_p[s_\theta\cdot s_p]
+\frac12E_p\|s_p\|^2,\\
E_p[s_\theta\cdot s_p]
&=\sum_{i=1}^d\int_{\mathbb R^d}
s_{\theta,i}(x)\,\partial_{x_i}p(x)\,dx.
\end{aligned}
$$

固定した $x_{-i}$ に対し、積の微分

$$
\partial_{x_i}(p s_{\theta,i})
=s_{\theta,i}\partial_{x_i}p+
p\partial_{x_i}s_{\theta,i}
$$

を $x_i$ 方向へ積分する。仮定した境界項は0なので、

$$
\int_{\mathbb R}s_{\theta,i}\partial_{x_i}p\,dx_i
=-\int_{\mathbb R}p\partial_{x_i}s_{\theta,i}\,dx_i.
$$

両辺を残りの座標で積分し、仮定した積分交換を使って $i=1,\ldots,d$ を足せば

$$
E_p[s_\theta\cdot s_p]
=-E_p[\operatorname{div}s_\theta].
$$

これを二乗の展開へ代入すると定理の式を得る。$\square$
<!-- proof-end -->

標本 $X_1,\ldots,X_n$ が $p$ に従うなら、定数 $C_p$ を除いた目的を

$$
\widehat L_n(\theta)=\frac1n\sum_{j=1}^n
\left[\frac12\|s_\theta(X_j)\|^2+
\operatorname{div}s_\theta(X_j)\right]
$$

と近似できる。[逆伝播の連鎖律](../ML2-14/index.md#thm-ml2-14-reverse-chain)はパラメータを更新する際に使えるが、高次元では発散の計算に追加の微分計算が必要となる。近似目的の有限標本最小点が真の密度に一致する保証は、この恒等式だけからは出ない。

**境界が大事な理由**。$(0,1)$ で密度1、外で0とする分布では内部のscoreは0だが、候補 $s(x)=x$ に対して内部だけで $E[s\,s_p]=0$、一方 $-E[s']=-1$。積 $p(x)s(x)$ の端点差が1であり、上の証明の境界項が消えない。しかもこの密度は全 $\mathbb R$ で正の $C^1$ 密度ではない。定理を無条件に切断密度へ流用してはいけない。

## 3. Gaussian例で目的と最小点を確かめる

一次元の真の分布を $p=N(\mu,\tau^2)$（$\tau^2>0$）、候補を $q_{m,v}=N(m,v)$（$v>0$）とする。候補scoreは $s_{m,v}(x)=-(x-m)/v$、その微分は $s'_{m,v}(x)=-1/v$ である。正規密度の尾では $p(x)s_{m,v}(x)\to0$、必要な二次モーメントも有限であり、[部分積分定理](#thm-ml2-23-score-matching)の条件が満たされる。

<a id="prop-ml2-23-gaussian-contrast"></a>

<!-- formal-statement-start -->
> **命題（Gaussian族のscore matching最適解）**
> $X\sim N(\mu,\tau^2)$、$\tau^2>0$ に対して、候補score $s_{m,v}(x)=-(x-m)/v$（$m\in\mathbb R,v>0$）の定数を除いたscore matching目的は

$$
L(m,v)=\frac{\tau^2+(\mu-m)^2}{2v^2}-\frac1v.
$$

> この目的の唯一の大域最小点は $m=\mu,\ v=\tau^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二乗平均を分散と平均差に分解する。分散方向は $u=1/v>0$ に置くと二次関数になる。

<!-- proof-start -->
### 証明

$X-m=(X-\mu)+(\mu-m)$ を二乗し、$E(X-\mu)=0$、$E(X-\mu)^2=\tau^2$ を使うと

$$
E(X-m)^2=\tau^2+2(\mu-m)E(X-\mu)+(\mu-m)^2
=\tau^2+(\mu-m)^2.
$$

従って[score matching恒等式](#thm-ml2-23-score-matching)の定数を除いた部分は表示式となる。$A=\tau^2+(\mu-m)^2>0$、$u=1/v$ と置き、平方完成すると

$$
L(m,v)=\frac A2u^2-u
=\frac A2\left(u-\frac1A\right)^2-\frac1{2A}.
$$

固定した $m$ について唯一の最小値は $u=1/A$、すなわち $v=A$ で達する。さらに $A\ge\tau^2$ で等号は $m=\mu$ のときだけなので、$-1/(2A)$ の最小値は $m=\mu$ で達し、そこで $v=\tau^2$。$\square$
<!-- proof-end -->

例えば $\mu=1,\tau^2=4$ なら、$m=1,v=4$ の目的値は $1/8-1/4=-1/8$。負の値になってよい。非負なのは未知の定数 $C_p$ を足した[score差](#def-ml2-23-fisher-discrepancy)である。

## 4. Denoising：ノイズから滑らかなscoreを学ぶ

元のデータ $X$ の密度が不明、あるいは離散分布でも、独立な標準Gaussian $Z\sim N(0,I_d)$ を加えた観測 $Y=X+\sigma Z$（$\sigma>0$）の密度は正で滑らかになる。ここで $I_d$ は $d$ 次元単位行列、$\sigma$ はノイズの標準偏差である。

<a id="def-ml2-23-noisy-score-target"></a>

<!-- formal-statement-start -->
> **定義（Gaussianノイズ分布とdenoising教師信号）**
> $E\|X\|^2<\infty$ を満たす任意の $\mathbb R^d$ 値確率変数 $X$ と、それに独立な $Z\sim N(0,I_d)$、$\sigma>0$ に対し $Y=X+\sigma Z$ とおく。平均0、共分散 $\sigma^2I_d$ のGaussian密度を次のように記す。

$$
\varphi_\sigma(u)=(2\pi\sigma^2)^{-d/2}
\exp\left(-\frac{\|u\|^2}{2\sigma^2}\right).
$$

> $Y$ の密度を

$$
q_\sigma(y)=E[\varphi_\sigma(y-X)]
$$

> とする。観測した組 $(X,Y)$ から計算できるdenoising教師信号は

$$
T_\sigma(X,Y)=\nabla_y\log\varphi_\sigma(Y-X)
=-\frac{Y-X}{\sigma^2}
$$

> である。候補ベクトル場 $s$ のdenoising目的を、二乗可積分である場合に

$$
D_\sigma(s)=\frac12E\|s(Y)-T_\sigma(X,Y)\|^2
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-23-noisy-score-target -->
**定義の確認**。$d=1$、$X$ が等確率で $-a,a$（$a>0$）をとるなら

$$
q_\sigma(y)=\frac12\varphi_\sigma(y+a)
+\frac12\varphi_\sigma(y-a)>0.
$$

各Gaussianは積分1だから混合密度も積分1で、滑らかである。$X=a,Y=y$ なら $T_\sigma=-(y-a)/\sigma^2$、$X=-a$ なら $T_\sigma=-(y+a)/\sigma^2$ と、組から計算できる。離散な $X$ 自身にはLebesgue密度のscoreはないが、$Y$ のscoreには意味がある。
<!-- definition-example-end -->

<a id="thm-ml2-23-denoising-identity"></a>

<!-- formal-statement-start -->
> **定理（Gaussian denoisingの条件付き平均恒等式）**
> [Gaussianノイズと教師信号](#def-ml2-23-noisy-score-target)の仮定のもとで、$q_\sigma$ は全点で正かつ滑らかであり、

$$
\boxed{s_{q_\sigma}(y)
=E[T_\sigma(X,Y)\mid Y=y]
=\frac{E[X\mid Y=y]-y}{\sigma^2}.}
$$

> さらに $E\|s(Y)\|^2<\infty$ の任意の可測なベクトル場 $s$ について

$$
\boxed{D_\sigma(s)=
\frac12E\|s(Y)-s_{q_\sigma}(Y)\|^2+
\frac12E\|T_\sigma-s_{q_\sigma}(Y)\|^2.}
$$

> 従ってdenoising目的の最小化解は、$q_\sigma$ ほとんど至るところで $s=s_{q_\sigma}$ となるベクトル場である。これは元の $X$ のscoreではなく、**ノイズ付き $Y$ の密度のscore**である。
<!-- formal-statement-end -->

### 証明の見取り図

$q_\sigma$ を $y$ で微分するとGaussian核の微分が出る。その比が事後分布に関する条件付き平均になる。二乗誤差をこの条件付き平均からの差で展開すると、交差項が条件付き期待値の性質によって0になる。

<!-- proof-start -->
### 証明

$\varphi_\sigma$ の微分は

$$
\nabla_y\varphi_\sigma(y-x)
=-\frac{y-x}{\sigma^2}\varphi_\sigma(y-x).
$$

固定した $\sigma>0$ では、この一次導関数も高次導関数も $y-x$ の多項式とGaussianの積で一様に有界である。従って確率測度に対して微分と期待値を交換でき、$q_\sigma$ は滑らかである。また核が正なので $q_\sigma(y)>0$。一階微分を代入すると

$$
\begin{aligned}
\nabla_y\log q_\sigma(y)
&=\frac{E[-(y-X)\varphi_\sigma(y-X)/\sigma^2]}
{E[\varphi_\sigma(y-X)]}\\
&=E\left[-\frac{y-X}{\sigma^2}\,\middle|\,Y=y\right].
\end{aligned}
$$

二行目は $Y=y$ を観測したときの $X$ の条件付き分布が、元の分布に $\varphi_\sigma(y-X)$ の重みを掛け、分母 $q_\sigma(y)$ で正規化したものだからである。$E\|X\|^2<\infty$ よりこれらの条件付き平均は定義でき、表示式の最後の形も従う。

次に $r(Y)=E[T_\sigma\mid Y]$ とおき、$s(Y)-T_\sigma=(s(Y)-r(Y))+(r(Y)-T_\sigma)$ を二乗する。交差項を $Y$ で条件付けると

$$
\begin{aligned}
E[(s(Y)-r(Y))\cdot(r(Y)-T_\sigma)]
&=E[(s(Y)-r(Y))\cdot E[r(Y)-T_\sigma\mid Y]]\\
&=0.
\end{aligned}
$$

$E\|T_\sigma\|^2=d/\sigma^2<\infty$ と条件付き期待値の二乗可積分性から交換は正当化できる。残った二つの二乗項に $r=s_{q_\sigma}$ を代入すれば目的の分解を得る。後者は $s$ に依存しないので、最小化の等号条件も従う。$\square$
<!-- proof-end -->

**ノイズ除去としての解釈**。score推定 $s_\theta(y)$ から $y+\sigma^2s_\theta(y)$ を作ると、真のscoreを学べた場合に限り、これは二乗損失で最適な $E[X\mid Y=y]$ となる。この関係は「すべての観測で元データを正確に復元できる」という意味ではない。

## 5. 二峰性データのscoreを直接計算する

等確率の $X=\pm a$（$a>0$）にGaussianノイズを加えた第4節の例を解く。Bayesの重みは $w_+(y)=P(X=a\mid Y=y)$、$w_-(y)=P(X=-a\mid Y=y)$ であり、正規化前の重みはそれぞれ $\exp\{-(y-a)^2/(2\sigma^2)\}$、$\exp\{-(y+a)^2/(2\sigma^2)\}$ である。

<a id="prop-ml2-23-two-point-score"></a>

<!-- formal-statement-start -->
> **命題（二点混合をGaussianで平滑化したscore）**
> $P(X=-a)=P(X=a)=1/2$、$a,\sigma>0$、$Y=X+\sigma Z$、$Z\sim N(0,1)$ は $X$ に独立とする。$Y$ の密度 $q_\sigma$ とそのscore、最適二乗損失推定値は

$$
\begin{aligned}
q_\sigma(y)&=\frac{\varphi_\sigma(y-a)+\varphi_\sigma(y+a)}2,\\
E[X\mid Y=y]&=a\tanh\!\left(\frac{ay}{\sigma^2}\right),\\
s_{q_\sigma}(y)&=\frac{a\tanh(ay/\sigma^2)-y}{\sigma^2}.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの事後重みの比を取り、平方を展開すると指数の差が $2ay/\sigma^2$ になる。条件付き平均を双曲線正接に書き換えて[Gaussian denoisingの条件付き平均恒等式](#thm-ml2-23-denoising-identity)へ入れる。

<!-- proof-start -->
### 証明

密度式は第4節の定義から従う。事後重みの比について

$$
\begin{aligned}
\frac{w_+(y)}{w_-(y)}
&=\exp\left(\frac{(y+a)^2-(y-a)^2}{2\sigma^2}\right)\\
&=\exp\left(\frac{2ay}{\sigma^2}\right).
\end{aligned}
$$

$w_++w_-=1$ より

$$
w_+-w_-=\frac{e^{2ay/\sigma^2}-1}{e^{2ay/\sigma^2}+1}
=\tanh(ay/\sigma^2).
$$

従って $E[X\mid Y=y]=a w_+-a w_-=a\tanh(ay/\sigma^2)$。これを[条件付き平均恒等式](#thm-ml2-23-denoising-identity)に代入してscore式を得る。$\square$
<!-- proof-end -->

$y=0$ では事後重みが等しく、推定値とscoreはともに0。$y>0$ では正の原子が優勢だが、推定値は $a$ を超えない。$\sigma$ を大きくすると同じ $y$ で二原子の区別は弱くなり、score場も変わる。特に元の離散分布には連続密度のscoreが定義できないので、$\sigma\to0$ を無条件に「元のscoreへ収束」と解釈してはならない。逆向き拡散過程や多数のノイズ時刻の算法は次章で扱う。

## 6. 数値ラボ：密度勾配とdenoisingを同じ模型で検算する

以下はPython標準ライブラリのみを用いる実計算である。ノイズ強度、二点間隔、乱数初期値、標本数を変えると、ノイズを加えた密度のscore、有限差分勾配、実際のdenoising目的が再計算される。比較対象は真の混合scoreと、平均0・分散 $a^2+\sigma^2$ の単一Gaussianで近似したscore $s_G(y)=-y/(a^2+\sigma^2)$ である。結果は有限標本の平均で、個々の乱数初期値で常に真の模型の経験損失が小さいとは限らない。

~~~python
import math
import random

rng_init, n = 23, 30000
a, sigma = 2.0, 1.0
assert n > 0 and a > 0 and sigma > 0
rng = random.Random(rng_init)

def log_phi(u):
    return -0.5 * (u / sigma)**2 - math.log(sigma * math.sqrt(2 * math.pi))

def log_density(y):
    left, right = log_phi(y + a), log_phi(y - a)
    shift = max(left, right)
    return shift + math.log((math.exp(left - shift) + math.exp(right - shift)) / 2)

def score(y):
    return (a * math.tanh(a * y / sigma**2) - y) / sigma**2

def posterior_mean(y):
    return y + sigma**2 * score(y)

def gaussian_score(y):
    return -y / (a*a + sigma*sigma)

for y in [-3.0, -1.0, 0.0, 1.0, 3.0]:
    h = 1e-4
    finite_diff = (log_density(y + h) - log_density(y - h)) / (2*h)
    assert abs(finite_diff - score(y)) < 1e-7
    print("y, score, E[X|Y]:", y, round(score(y), 6),
          round(posterior_mean(y), 6))

loss_true = loss_gauss = 0.0
for _ in range(n):
    x = a if rng.random() < 0.5 else -a
    y = x + sigma * rng.gauss(0.0, 1.0)
    target = -(y - x) / sigma**2
    loss_true += 0.5 * (score(y) - target)**2
    loss_gauss += 0.5 * (gaussian_score(y) - target)**2

loss_true /= n
loss_gauss /= n
print("DSM true mixture / Gaussian approximation:",
      round(loss_true, 6), round(loss_gauss, 6))
assert math.isfinite(loss_true) and math.isfinite(loss_gauss)
~~~

**観察の指針**：$a/\sigma$ が大きいほど二つの山を区別しやすい。$a/\sigma$ が小さいと、単一Gaussian近似のscoreとの差は小さくなり得る。有限差分は小さすぎる刻みで丸め誤差が増えるため、解析式との一致は選んだ刻み・評価点についての検査であって無限精度の保証ではない。ノイズ付与は未知の密度を直接微分せずに訓練組 $(X,Y)$ を作れる利点を持つ一方、ノイズ強度ごとに別の目標分布 $q_\sigma$ を学ぶ。

## 7. 演習

### Level A

**ML2-23-A01（正規密度のscoreとパラメータ微分）**
- Level: A
- 問題: $p=N(2,9)$ の空間scoreを求め、$x=5$ で評価せよ。$\partial_m\log N(x;m,9)$ との符号の違いを説明せよ。
<!-- solution-start -->
**詳細解答**。$p(x)=(18\pi)^{-1/2}\exp[-(x-2)^2/18]$ は全実数で正かつ微分可能である。[scoreの定義](#def-ml2-23-score)より定数項の微分は0、指数の微分は $-(x-2)/9$ だから

$$
s_p(x)=-\frac{x-2}{9},\qquad s_p(5)=-\frac13.
$$

一方、固定した $x$ に対して $m$ で $\log N(x;m,9)$ を微分すると $\partial_m[-(x-m)^2/18]=(x-m)/9$。変数と母数では微分する対象が異なるので符号が逆になる。
<!-- solution-end -->

**ML2-23-A02（正規化定数が消える条件）**
- Level: A
- 問題: $\widetilde p(x)=e^{-2x^2+3x}$ を正規化した密度のscoreを求めよ。さらに $\widetilde q(x)=e^{-x^2}e^{\beta x}$ の係数 $e^{\beta x}$ は一般にscoreから消えるか説明せよ。
<!-- solution-start -->
**詳細解答**。$\widetilde p$ は平方完成により $e^{9/8}e^{-2(x-3/4)^2}$ となり、積分は正で有限なので正規化できる。$Z$ が $x$ に依存しないため

$$
s_p(x)=\partial_x[-2x^2+3x-\log Z]=-4x+3.
$$

$\widetilde q$ の $e^{\beta x}$ は $x$ で変化するので定数ではない。$\partial_x\log\widetilde q=-2x+\beta$ となり、$\beta$ は消えない。消せるのは $x$ と無関係な倍率だけである。
<!-- solution-end -->

**ML2-23-A03（Gaussianノイズの教師信号）**
- Level: A
- 問題: 一次元で $X=2$、$\sigma=1/2$、$Y=3/2$ が観測された。Gaussianノイズの教師信号 $T_\sigma$ と、$X=2$ が確定している場合の $Y$ のscoreを計算せよ。
<!-- solution-start -->
**詳細解答**。$Y-X=-1/2$、$\sigma^2=1/4$ だから[教師信号の定義](#def-ml2-23-noisy-score-target)を代入して

$$
T_\sigma=-\frac{-1/2}{1/4}=2.
$$

$X=2$ が定数なら $Y\sim N(2,1/4)$ であり、そのscoreも $-(Y-2)/(1/4)=2$。$X$ が未知の混合分布の場合、教師信号の一標本と周辺密度のscoreは一般には一致しない。
<!-- solution-end -->

**ML2-23-A04（境界項の反例）**
- Level: A
- 問題: $(0,1)$ の一様密度を内部だけで考え、$s(x)=x$ とする。$\int_0^1s(x)p'(x)\,dx$ と $-\int_0^1p(x)s'(x)\,dx$ を計算し、その差の理由を答えよ。
<!-- solution-start -->
**詳細解答**。内部で $p(x)=1$、$p'(x)=0$ なので第1積分は0。一方 $s'(x)=1$ だから第2積分は $-\int_0^1 1\,dx=-1$。積の端点差

$$
[p(x)s(x)]_{0}^{1}=1-0=1
$$

が消えず、部分積分式は $0=1-1$ になる。[score matching定理](#thm-ml2-23-score-matching)は全 $\mathbb R$ で正の滑らかな密度と境界消失を仮定しており、この一様密度はその仮定を失っている。
<!-- solution-end -->

### Level B

**ML2-23-B01（Gaussian score matchingを再導出）**
- Level: B
- 問題: $X\sim N(1,4)$ に対して $s_{m,v}(x)=-(x-m)/v$（$v>0$）を考える。定数を除いた目的 $L(m,v)$ を求め、$v$ を固定した最小点と、$m,v$ を同時に動かした最小点を求めよ。
<!-- solution-start -->
**詳細解答**。$E(X-m)^2=\operatorname{Var}X+(EX-m)^2=4+(1-m)^2$、$s'=-1/v$ である。[部分積分によるscore matching恒等式](#thm-ml2-23-score-matching)を適用して

$$
L(m,v)=\frac{4+(1-m)^2}{2v^2}-\frac1v.
$$

$v$ が固定なら $m$ に依存するのは $(1-m)^2/(2v^2)$ で、唯一の最小点は $m=1$。その後 $L(1,v)=2/v^2-1/v$。$u=1/v>0$ と置き $2u^2-u=2(u-1/4)^2-1/8$ と平方完成すると $u=1/4$、すなわち $v=4$ が唯一の最小点である。
<!-- solution-end -->

**ML2-23-B02（denoising損失の直交分解）**
- Level: B
- 問題: $X$ は二乗可積分、$Y=X+\sigma Z$（$Z$ は独立な標準Gaussian、$\sigma>0$）とする。$T=-(Y-X)/\sigma^2$、$r(Y)=E[T\mid Y]$ に対し、二乗可積分な $s(Y)$ について $E\|s(Y)-T\|^2=E\|s(Y)-r(Y)\|^2+E\|r(Y)-T\|^2$ を証明し、最小点を述べよ。
<!-- solution-start -->
**詳細解答**。$s-T=(s-r)+(r-T)$ と置いて二乗を展開する。交差項は条件付き期待値の塔の性質により

$$
E[(s-r)\cdot(r-T)]
=E[(s-r)\cdot E[r-T\mid Y]]
=0
$$

である。$E\|T\|^2=d/\sigma^2$ と仮定した $s$ の二乗可積分性から項は可積分である。従って二乗の等式が成立する。右辺第2項は $s$ によらず、第1項は非負で、零となる必要十分条件は $s(Y)=r(Y)$ ほとんど確実である。[Gaussian denoisingの条件付き平均恒等式](#thm-ml2-23-denoising-identity)を使うと $r=s_{q_\sigma}$、すなわちノイズを加えた密度のscoreが最小点である。
<!-- solution-end -->

**ML2-23-B03（非対称二点分布のdenoising）**
- Level: B
- 問題: $P(X=a)=\pi$、$P(X=-a)=1-\pi$（$a>0,0<\pi<1$）、$Y=X+\sigma Z$（$\sigma>0$）とする。$w(y)=P(X=a\mid Y=y)$、$E[X\mid Y=y]$、$s_{q_\sigma}(y)$ を求め、$\pi=1/2$ なら本文の式と一致することを示せ。
<!-- solution-start -->
**詳細解答**。条件付きGaussian密度はそれぞれ $\varphi_\sigma(y-a)$、$\varphi_\sigma(y+a)$ である。[密度から事後確率を得る定理](../ML1-07/index.md#thm-ml1-07-posterior)を二クラスの混合に適用すると

$$
w(y)=\frac{\pi e^{-(y-a)^2/(2\sigma^2)}}
{\pi e^{-(y-a)^2/(2\sigma^2)}+
(1-\pi)e^{-(y+a)^2/(2\sigma^2)}}.
$$

分母・分子を $\pi e^{-(y-a)^2/(2\sigma^2)}$ で割り、平方差 $(y+a)^2-(y-a)^2=4ay$ を使えば

$$
w(y)=\frac1{1+\frac{1-\pi}{\pi}e^{-2ay/\sigma^2}}.
$$

従って $E[X\mid Y=y]=aw(y)-a(1-w(y))=a(2w(y)-1)$。[Gaussian denoisingの条件付き平均恒等式](#thm-ml2-23-denoising-identity)を代入して

$$
s_{q_\sigma}(y)=\frac{a(2w(y)-1)-y}{\sigma^2}.
$$

$\pi=1/2$ では $2w-1=(e^{2ay/\sigma^2}-1)/(e^{2ay/\sigma^2}+1)=\tanh(ay/\sigma^2)$ となり、[二点混合の命題](#prop-ml2-23-two-point-score)と一致する。
<!-- solution-end -->

**ML2-23-B04（多次元Gaussianと発散）**
- Level: B
- 問題: $X\sim N_d(\mu,\tau^2 I_d)$（$\tau>0$）に対して $s_{m,v}(x)=-(x-m)/v$（$v>0$）とする。$\operatorname{div}s_{m,v}$ と定数を除いたscore matching目的を求め、最小点を示せ。
<!-- solution-start -->
**詳細解答**。各座標で $\partial_{x_i}s_i=-1/v$、他の成分を微分する必要はない。従って $\operatorname{div}s=-d/v$。また $E\|X-m\|^2=\sum_i E[(X_i-\mu_i)+(\mu_i-m_i)]^2=d\tau^2+\|\mu-m\|^2$ だから

$$
L(m,v)=\frac{d\tau^2+\|\mu-m\|^2}{2v^2}-\frac d v.
$$

固定した $v$ では唯一の最小点は $m=\mu$。$u=1/v$ とすると

$$
L(\mu,1/u)=\frac{d\tau^2}{2}u^2-du
=\frac{d\tau^2}{2}(u-\tau^{-2})^2-\frac{d}{2\tau^2}.
$$

よって $u=\tau^{-2}$、すなわち $v=\tau^2$ が唯一の同時最小点である。Gaussianの尾と多項式型の候補scoreは必要な境界・積分条件を満たす。
<!-- solution-end -->

### Level C

**ML2-23-C01（ノイズ強度・事後平均・score推定の統合）**
- Level: C
- 問題: $X$ は $-2$ または $2$ を確率 $1/2$ でとり、$Y=X+\sigma Z$、$Z\sim N(0,1)$ は独立、$\sigma>0$ とする。

  1. $q_\sigma(y)$ を導き、正規化を確認せよ。
  2. $P(X=2\mid Y=y)$、$E[X\mid Y=y]$、$s_{q_\sigma}(y)$ を導出せよ。
  3. $\sigma=1$ における $y=0,2$ のscoreと推定値を求め、$y=2$ で単純に $X=2$ と決め打ちしてよいか検討せよ。
  4. $\sigma\to\infty$ で固定 $y$ に対する $\sigma^2s_{q_\sigma}(y)$ の極限を求めよ。$\sigma\to0$ で元の離散分布のscoreへ収束すると主張できるか説明せよ。
<!-- solution-start -->
**詳細解答**。(1) 条件付き密度は $X=2$ のとき $\varphi_\sigma(y-2)$、$X=-2$ のとき $\varphi_\sigma(y+2)$。全確率で

$$
q_\sigma(y)=\frac12\varphi_\sigma(y-2)+\frac12\varphi_\sigma(y+2).
$$

両項は非負で、全実数上の積分は $(1/2)\cdot1+(1/2)\cdot1=1$。従って確率密度であり、任意の $y$ で正である。

(2) [密度から事後確率を得る定理](../ML1-07/index.md#thm-ml1-07-posterior)を二点混合に直接適用すると

$$
\begin{aligned}
P(X=2\mid Y=y)
&=\frac{\varphi_\sigma(y-2)}
{\varphi_\sigma(y-2)+\varphi_\sigma(y+2)}\\
&=\frac1{1+\exp(-4y/\sigma^2)}.
\end{aligned}
$$

ここで $(y+2)^2-(y-2)^2=8y$ を用いた。従って[二点混合の命題](#prop-ml2-23-two-point-score)の計算を $a=2$ で再導出して

$$
E[X\mid Y=y]=2\tanh(2y/\sigma^2),\quad
s_{q_\sigma}(y)=\frac{2\tanh(2y/\sigma^2)-y}{\sigma^2}.
$$

(3) $\sigma=1,y=0$ では $\tanh0=0$ なので推定値0、score0。$y=2$ では

$$
E[X\mid Y=2]=2\tanh4,\qquad
s_{q_1}(2)=2\tanh4-2.
$$

$\tanh4<1$ であるから推定値は2より僅かに小さい。$X=-2$ から大きな正のノイズで $Y=2$ となる事象にも正の事後確率があるので、観測値だけで $X=2$ と確定できない。

(4) $\sigma\to\infty$ では固定 $y$ に対し $2y/\sigma^2\to0$、$\tanh(2y/\sigma^2)\to0$。従って

$$
\sigma^2s_{q_\sigma}(y)=2\tanh(2y/\sigma^2)-y\longrightarrow-y.
$$

一方 $\sigma\to0$ では $Y$ の密度は二点への集中を強めるが、$X$ の分布はLebesgue測度に関する密度を持たず、[scoreの定義](#def-ml2-23-score)の対象外である。したがって元のscoreへの収束という主張はできない。
<!-- solution-end -->

## 8. まとめと次章への橋

- Scoreは $\nabla_x\log p$ で、未知の正規化定数が $x$ に依存しなければ消える。
- 部分積分によるscore matchingは真のscoreを含む交差項を消すが、境界項と積分交換の仮定が必要である。
- Gaussian denoisingでは観測組から教師信号を作り、条件付き期待値として **ノイズを加えた観測の分布** のscoreを学べる。
- ノイズ幅を変えれば学習対象も変わる。次章は複数のノイズ時刻を接続し、逆向きに標本を生成する離散拡散模型を扱う。
