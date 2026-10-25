# ML2-09 Mean-field変分Bayes・再パラメータ化

[前講のELBO恒等式](../ML2-08/index.md#thm-ml2-08-elbo-identity)は、真の事後分布を求めずに評価できる下界を与えた。しかし潜在変数が多ければ、任意の変分分布 $q$ の期待値も計算しにくい。そこで、近似分布の各成分を独立と仮定し、一成分ずつ更新する。これが **mean-field変分Bayes** の基本的な発想である。さらに、連続変数で分布の形そのものを勾配法で調整するには、乱数を固定して微分できる形へ書き直す必要がある。

本講では、最初に二つの二値変数だけで「独立という制約が何を失うか」を確かめる。そのあと座標更新の正規化と単調性を証明し、連続因子へ拡張する。最後にGaussian乱数の再パラメータ化から、勾配と期待値を交換できる条件および交換してはいけない例を調べる。

## 1. 独立な近似で計算を簡単にする

観測値 $x$ と母数 $\theta$ を固定し、潜在状態を $z=(z_1,\ldots,z_m)$ と書く。まず $z_i$ は非空有限集合 $\mathcal Z_i$ に属するとし、全状態の集合を $\mathcal Z=\prod_{i=1}^m\mathcal Z_i$ とする。同時確率または同時密度の観測値 $x$ における値を

$$
f(z)=p_\theta(x,z)>0,\qquad
e=\sum_{z\in\mathcal Z}f(z)>0,\qquad r(z)=\frac{f(z)}e
$$

とする。**この節ではすべての状態で $f(z)>0$** と仮定する。零のある模型は後で区別する。

例えば二値の $z_1,z_2\in\{0,1\}$ に対し、表の4つの重みを与える。

| $z_1\backslash z_2$ | 0 | 1 |
| --- | ---: | ---: |
| 0 | 1 | 1 |
| 1 | 1 | 4 |

周辺尤度は $e=1+1+1+4=7$、事後分布は表を7で割ったものとなる。$z_1=1$ の周辺確率は $5/7$、$z_2=1$ も $5/7$ だが、同時確率 $P(z_1=1,z_2=1\mid x)=4/7$ は周辺確率の積 $25/49$ と一致しない。**真の事後には依存がある。**

そこで、各変数について確率ベクトル $q_i$ を一つずつ選び、それらの積から $q(z)$ を作る。積の形なので、周辺や期待値の計算を因子ごとに分けられる。

<a id="def-ml2-09-mean-field"></a>

<!-- formal-statement-start -->
> **定義（mean-field変分族）**
> 有限直積 $\mathcal Z=\mathcal Z_1\times\cdots\times\mathcal Z_m$（$m\ge2$）上で、各 $\mathcal Z_i$ の確率ベクトル $q_i$ を選び、

$$
q(z_1,\ldots,z_m)=\prod_{i=1}^m q_i(z_i)
$$

> と書ける確率分布全体を **mean-field変分族** という。$q_{-i}(z_{-i})=\prod_{j\ne i}q_j(z_j)$ と書き、$z_{-i}$ は第 $i$ 成分以外をまとめた状態を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-09-mean-field -->
**定義の確認**。上の二値模型で $q_1(1)=s$、$q_2(1)=t$（$s,t\in[0,1]$）とすれば、

$$
q(0,0)=(1-s)(1-t),\quad q(0,1)=(1-s)t,
$$

$$
q(1,0)=s(1-t),\quad q(1,1)=st.
$$

各項は非負で、総和は $((1-s)+s)((1-t)+t)=1$。さらに $q_1(1)=q(1,0)+q(1,1)=s$、$q_2(1)=t$ と確かめられる。一方、積分布は常に $q(0,0)q(1,1)=q(0,1)q(1,0)$ を満たす。真の事後では左辺が $4/49$、右辺が $1/49$ なので、この模型の真の $r$ はどの $s,t$ でも表せない。
<!-- definition-example-end -->

独立性は**近似分布の制約**であり、元の潜在変数が事後的に独立だという主張ではない。[変分最適化と近似の残差](../ML2-08/index.md#prop-ml2-08-variational-optimum)から、積形式に制限した最良のELBOでも $\log e$ に達するとは限らない。

## 2. 一成分だけを最適にする座標更新

一度に全ての因子を変える代わりに、第 $i$ 因子だけを動かし、他の $q_{-i}$ は固定する。$f$ が正なので、各 $z_i$ について $\log f(z_i,z_{-i})$ の $q_{-i}$ による平均を計算できる。この平均を

$$
a_i(z_i)=\sum_{z_{-i}}q_{-i}(z_{-i})\log f(z_i,z_{-i})
$$

と書く。$a_i$ は第 $i$ 成分の状態に応じた実数の表であり、**確率ではない**。これを指数化し、総和で割って確率ベクトルへ直す。

<a id="thm-ml2-09-coordinate"></a>

<!-- formal-statement-start -->
> **定理（有限正値模型の座標最適更新）**
> $m\ge2$、各 $\mathcal Z_i$ は非空有限集合、$f:\prod_i\mathcal Z_i\to(0,\infty)$ とする。mean-field変分分布 $q(z)=\prod_jq_j(z_j)$ のうち $q_{-i}$ を固定し、第 $i$ 因子は全確率ベクトルから選べるとする。
>
> $a_i(z_i)=\sum_{z_{-i}}q_{-i}(z_{-i})\log f(z_i,z_{-i})$ とし、

$$
Z_i=\sum_{u\in\mathcal Z_i}\exp a_i(u),\qquad
q_i^*(z_i)=\frac{\exp a_i(z_i)}{Z_i}.
$$

> このとき $0<Z_i<\infty$ で、$q_i^*$ は固定した $q_{-i}$ に対するELBOの**一意の最大化因子**である。すなわち

$$
\boxed{\log q_i^*(z_i)=E_{q_{-i}}[\log f(z_i,Z_{-i})]-\log Z_i}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[有限状態のELBOの定義](../ML2-08/index.md#def-ml2-08-elbo-finite)に積形式を代入すると、第 $i$ 因子を含む部分は $E_{q_i}a_i$ とそのエントロピーに分かれる。$a_i=\log q_i^*+\log Z_i$ と置き直すと、第 $i$ 因子の変化分がKLになる。[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)が最大点の一意性を与える。

<!-- proof-start -->
### 証明

有限個の $f(z)$ はすべて正なので $\log f(z)$ は有限実数である。$q_{-i}$ は確率分布だから $a_i(z_i)$ は有限な加重和となる。よって $\exp a_i(z_i)>0$、$Z_i$ は有限個の正数の和で、定義された $q_i^*$ は正かつ総和1である。

積形式のELBOを [定義](../ML2-08/index.md#def-ml2-08-elbo-finite)から展開する。$\log q(z)=\sum_j\log q_j(z_j)$ は $q(z)>0$ の状態で用い、零確率の状態は期待値から除く。まず

$$
\begin{aligned}
\mathcal L(q)
&=\sum_zq(z)\log f(z)-\sum_zq(z)\log q(z)\\
&=\sum_{z_i}q_i(z_i)\sum_{z_{-i}}q_{-i}(z_{-i})\log f(z_i,z_{-i})\\
&\quad-\sum_{z_i:q_i(z_i)>0}q_i(z_i)\log q_i(z_i)
 -\sum_{j\ne i}\sum_{z_j:q_j(z_j)>0}q_j(z_j)\log q_j(z_j).
\end{aligned}
$$

最後の項は固定因子にしか依存しないので $C_{-i}$ と置く。最初の加重和は $a_i$ だから

$$
\mathcal L(q)=\sum_{z_i}q_i(z_i)a_i(z_i)
 -\sum_{q_i(z_i)>0}q_i(z_i)\log q_i(z_i)+C_{-i}.
$$

$a_i(z_i)=\log q_i^*(z_i)+\log Z_i$ を代入し、$\sum q_i=1$ を使うと

$$
\begin{aligned}
\mathcal L(q)
&=\sum_{z_i}q_i(z_i)\log q_i^*(z_i)
  -\sum_{q_i(z_i)>0}q_i(z_i)\log q_i(z_i)\\
&\quad+\log Z_i+C_{-i}\\
&=\log Z_i+C_{-i}-D(q_i\|q_i^*).
\end{aligned}
$$

$q_i^*$ はすべての状態で正なので、このKLはどの確率ベクトル $q_i$ に対しても有限である。[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)より $D(q_i\|q_i^*)\ge0$ で、等号は $q_i=q_i^*$ の場合だけ。従って $q_i^*$ が一意の最大化因子である。$\square$
<!-- proof-end -->

**二値模型で定義を直接使う。** 表の重みを $f(z_1,z_2)=4^{z_1z_2}$ と書く。$q_2(1)=t$ を固定すると

$$
a_1(0)=0,\qquad a_1(1)=(1-t)\log1+t\log4=t\log4.
$$

したがって

$$
Z_1=1+4^t,\qquad q_1^*(1)=\frac{4^t}{1+4^t}.
$$

同様に第2因子を更新すると、$q_1(1)=s$ を固定した場合の最適値は $q_2^*(1)=4^s/(1+4^s)$。この更新は **他方の因子を更新時点の値で評価する**。正規化を省いた $q_i\propto\exp(a_i)$ という書き方だけでは確率分布は確定しない。

<a id="prop-ml2-09-ascent"></a>

<!-- formal-statement-start -->
> **命題（座標上昇の単調性と限界）**
> 前定理の有限正値模型で、各ステップに一つの因子 $q_i$ をその一意の最適値 $q_i^*$ へ置き換えると、ELBOは非減少である。また $\mathcal L(q)\le\log e$ なので、反復に沿うELBOの実数列は収束する。ただし、これは因子列の収束、大域最大点への収束、真の事後分布との一致を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

座標更新前後の差は、更新前因子から最適因子へのKLに等しい。上界はELBO恒等式で得る。値が収束することと更新変数の収束は異なる主張である。

<!-- proof-start -->
### 証明

固定した $q_{-i}$ について[座標最適更新の証明](#thm-ml2-09-coordinate)の分解を更新前の $q_i$ と更新後の $q_i^*$ に適用する。

$$
\begin{aligned}
\mathcal L(q_i^*q_{-i})-\mathcal L(q_iq_{-i})
&=(\log Z_i+C_{-i})\\
&\quad-(\log Z_i+C_{-i}-D(q_i\|q_i^*))\\
&=D(q_i\|q_i^*)\ge0.
\end{aligned}
$$

一方、各反復の積分布は正の $f$ に絶対連続だから、[有限状態の ELBO 恒等式と等号条件](../ML2-08/index.md#thm-ml2-08-elbo-identity)により $\mathcal L(q)\le\log e$。非減少で上に有界な実数列は収束する。なおこの議論に因子列の収束や大域最適性を結論する部分はない。$\square$
<!-- proof-end -->

前の二値例で $s=t=1/2$ から第1因子を更新すると $s'=2/3$ となり、その後第2因子を更新すれば

$$
t'=\frac{4^{2/3}}{1+4^{2/3}}\approx0.716.
$$

各ステップのELBOは下がらない。しかし $f(0,0)f(1,1)\ne f(0,1)f(1,0)$ のため真の事後は積形式で表現できず、**ELBOの増加と事後分布への完全一致は別**である。初期値、更新順序、変分族の制約が重要になる。

## 3. 連続因子の更新には積分条件が要る

連続変数で単に和を積分へ置き換えると、指数化した関数が積分できない場合がある。また $\log f$ の期待値が $+\infty$ と $-\infty$ を同時に含むと式そのものが未定義となる。そこで、他の因子を固定したときの更新が正規化可能で、ELBOが有限となる条件を先に固定する。

<a id="prop-ml2-09-continuous"></a>

<!-- formal-statement-start -->
> **命題（連続因子の座標更新）**
> $z=(z_i,z_{-i})$ はEuclid空間の直積 $\Omega_i\times\Omega_{-i}$ を動き、$f(z)>0$ は可測、$0<e=\int f(z)\,dz<\infty$ とする。固定した積密度 $q_{-i}$ に対し、$\log f(z_i,Z_{-i})$ が $q_{-i}$ に関して絶対可積分となる $z_i$ 上の可測関数

$$
a_i(z_i)=\int q_{-i}(z_{-i})\log f(z_i,z_{-i})\,dz_{-i}
$$

> がほとんど至る所有限とする。さらに $0<Z_i=\int_{\Omega_i}e^{a_i(u)}\,du<\infty$、$q_i^*=e^{a_i}/Z_i$ とし、固定因子のエントロピー項が有限であるとする。$q_i^*$ と候補 $q_i$ はそれぞれ

$$
\int_{\Omega_i}q_i(z_i)\int_{\Omega_{-i}}q_{-i}(z_{-i})|\log f(z_i,z_{-i})|\,dz_{-i}dz_i<\infty,
\qquad E_{q_i}|\log q_i|<\infty
$$

> を満たすと仮定する（$q_i=q_i^*$ についても同じ条件を要求する）。この候補についてELBOは

$$
\mathcal L(q_iq_{-i})=\log Z_i+C_{-i}-D(q_i\|q_i^*)
$$

> と書ける。よって上記の可積分性を満たす密度の中で、一意の最適因子は $q_i^*$（ほとんど至る所の意味）である。
<!-- formal-statement-end -->

### 証明の見取り図

有限模型で使った $a_i=\log q_i^*+\log Z_i$ の恒等式は積分でも同じ。違いは積分交換、正規化、各項の有限性を先に確認しなければいけない点である。

<!-- proof-start -->
### 証明

定義した $Z_i$ は正で有限なので $q_i^*$ は正の確率密度となる。仮定した絶対可積分性の下で、積密度による同時積分の順序を交換し、対数積を各因子へ分解できる。固定した第 $i$ 因子以外のエントロピー和を $C_{-i}$ とすると、

$$
\mathcal L(q_iq_{-i})
=\int q_i(z_i)a_i(z_i)\,dz_i
 -\int q_i(z_i)\log q_i(z_i)\,dz_i+C_{-i}.
$$

$\log q_i^*=a_i-\log Z_i$ と $\int q_i=1$ から

$$
\begin{aligned}
\mathcal L(q_iq_{-i})
&=\int q_i\log q_i^*-\int q_i\log q_i+\log Z_i+C_{-i}\\
&=\log Z_i+C_{-i}-D(q_i\|q_i^*).
\end{aligned}
$$

ここでもKLの非負性と等号条件を、[連続密度のELBO恒等式で示したKLの議論](../ML2-08/index.md#thm-ml2-08-elbo-density-identity)と同じく密度比 $q_i/q_i^*$ に適用する。正の $q_i^*$ へのKLが零になるのは $q_i=q_i^*$ がほとんど至る所で成立するときだけである。$\square$
<!-- proof-end -->

**Gaussianの直接例。** $\Omega_1=\Omega_2=\mathbb R$、$\lambda\in(-1,1)$ とし、非正規化同時密度を

$$
f(z_1,z_2)=\exp\left[-\frac12(z_1^2+z_2^2-2\lambda z_1z_2)\right]
$$

とする。指数部の二次形式を座標 $z=(z_1,z_2)^{\mathsf T}$ で表す行列は

$$
A=\begin{pmatrix}1&-\lambda\\-\lambda&1\end{pmatrix}
$$

である。実際に $z^{\mathsf T}Az$ の交差項まで展開し、平方完成すると

$$
z^{\mathsf T}Az=z_1^2+z_2^2-2\lambda z_1z_2
=(z_1-\lambda z_2)^2+(1-\lambda^2)z_2^2.
$$

$|\lambda|<1$ なので、これは $z\ne0$ で正である。変数変換 $u=z_1-\lambda z_2$、$v=z_2$ はJacobianの絶対値が1だから、[Gaussian積分の正規化](../ML1-07/index.md#lem-ml1-07-gaussian-normalization)を各変数へ適用して

$$
e=\int_{\mathbb R^2}f(z_1,z_2)\,dz_1dz_2
=\sqrt{2\pi}\sqrt{\frac{2\pi}{1-\lambda^2}}
=\frac{2\pi}{\sqrt{1-\lambda^2}}\in(0,\infty)
$$

を確かめられる。$q_2$ が平均 $m_2$、有限二次モーメントと有限のエントロピー項を持てば、$z_1$ に依存する平均対数重みは

$$
a_1(z_1)=-\frac12z_1^2+\lambda m_2z_1-\frac12E_{q_2}[Z_2^2].
$$

最初の二項を平方完成して

$$
-\frac12z_1^2+\lambda m_2z_1
=-\frac12(z_1-\lambda m_2)^2+\frac12\lambda^2m_2^2
$$

とする。$z_1$ に依存しない項は正規化で相殺され、$Z_1$ が有限だから、更新後は $q_1^*=N(\lambda m_2,1)$ である。これは分布名の暗記ではなく、[Gaussianの平方完成](../ML2-07/index.md#thm-ml2-07-posterior)と同じ操作を今回の座標平均へ適用した結果である。第2因子も $q_2^*=N(\lambda m_1,1)$ となる。一方、[多変量Gaussian密度の定義](../ML1-07/index.md#def-ml1-07-gaussian)と指数部の $A$ を比べると、真の事後の共分散行列は

$$
A^{-1}=\frac1{1-\lambda^2}
\begin{pmatrix}1&\lambda\\\lambda&1\end{pmatrix}
$$

である（$AA^{-1}=I_2$ を直接掛け算で確認できる）。$\lambda\ne0$ なら共分散の非対角成分が非零だが、積近似では相関を表せない。$\lambda=0$ の場合に限り、この模型の真の事後は独立な標準Gaussianの積である。

もし $f$ が零になる領域へ変分分布が正の質量を与えれば、[台を外れる場合](../ML2-08/index.md#prop-ml2-08-support)と同様にELBOは $-\infty$ となり、ここでの有限なKL分解は使えない。「指数化して正規化すれば常に解ける」という一般論にはならない。

## 4. Gaussian再パラメータ化：分布からの抽出を固定乱数へ変える

座標更新に必要な期待値が計算できない場合でも、Gaussianのように標本を作りやすい変分分布なら、乱数から期待値を近似できる。ただし、$Z\sim q_\phi$ とだけ書いたまま母数 $\phi$ で微分すると、標本の分布自体も母数に依存する。そこで基準乱数の分布は動かさず、標本を作る写像だけを微分する。

平均 $\mu\in\mathbb R$、標準偏差 $\sigma>0$ の正規分布 $N(\mu,\sigma^2)$ を考える。標準正規分布 $N(0,1)$ は平均0、分散1の正規分布である。$\varepsilon\sim N(0,1)$ を先に取り、$Z=\mu+\sigma\varepsilon$ とすれば $Z$ は目的の正規分布に従う。これは $E[Z]=\mu+\sigma E[\varepsilon]=\mu$、$\operatorname{Var}(Z)=\sigma^2\operatorname{Var}(\varepsilon)=\sigma^2$ というだけでなく、標準正規密度への変数変換でも確認できる。

<a id="def-ml2-09-reparam"></a>

<!-- formal-statement-start -->
> **定義（Gaussian再パラメータ化）**
> $\mu\in\mathbb R$、$\sigma>0$ を固定し、$\varepsilon\sim N(0,1)$ を母数に依存しない基準乱数とする。$Z=\mu+\sigma\varepsilon$ と表すことを、$N(\mu,\sigma^2)$ の**再パラメータ化**という。最適化において正の標準偏差を保つため、$\rho=\log\sigma\in\mathbb R$、$\sigma=e^\rho$ と置くこともある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-09-reparam -->
**定義の確認**。$\mu=2$、$\sigma=3$ とすると、標準正規乱数 $\varepsilon$ から作る $Z=2+3\varepsilon$ は $E[Z]=2$、分散9である。密度も $z=2+3\varepsilon$、$d\varepsilon/dz=1/3$ を使えば

$$
q(z)=\frac{1}{3\sqrt{2\pi}}\exp\left(-\frac{(z-2)^2}{18}\right)
$$

となり、$N(2,9)$ の確率密度関数に一致する。$\rho=\log3$ と置いても $e^\rho=3>0$ であり、$Z=2+e^\rho\varepsilon$ は同じ分布を表す。
<!-- definition-example-end -->

再パラメータ化は、期待値そのものを微分してよいことを**自動的には保証しない**。$h:\mathbb R\to\mathbb R$ を積分したい関数とし、

$$
F(\mu,\rho)=E[h(\mu+e^\rho\varepsilon)]
$$

を考える。内部の合成関数は連鎖律で微分できても、その微分を期待値の外へ出せるかは別の問題である。

<a id="thm-ml2-09-pathwise"></a>

<!-- formal-statement-start -->
> **定理（Gaussian再パラメータ化勾配）**
> $U\subset\mathbb R^2$ は開集合とし、$\varepsilon\sim N(0,1)$ とする。$h:\mathbb R\to\mathbb R$ は連続微分可能で、各 $(\mu,\rho)\in U$ について $h(\mu+e^\rho\varepsilon)$ が可積分とする。任意の $(\mu_0,\rho_0)\in U$ に対し、閉長方形 $K$ を $(\mu_0,\rho_0)$ の近傍として $K\subset U$ に取れ、標準正規に関して可積分な非負関数 $G_K(\varepsilon)$ が存在し、同一の確率零集合を除いたすべての $\varepsilon$ と $K$ の全点で

$$
|h'(\mu+e^\rho\varepsilon)|
+|e^\rho\varepsilon h'(\mu+e^\rho\varepsilon)|
\le G_K(\varepsilon)
$$

> が成り立つとする。このとき $F(\mu,\rho)=E[h(\mu+e^\rho\varepsilon)]$ は $U$ 上で偏微分可能で、

$$
\boxed{\partial_\mu F=E[h'(Z)],\qquad
\partial_\rho F=E[\sigma\varepsilon h'(Z)]},
\quad Z=\mu+\sigma\varepsilon,\ \sigma=e^\rho.
$$
<!-- formal-statement-end -->

### 証明の見取り図

先に $\varepsilon$ を固定して連鎖律を適用する。パラメータを小さく変えた差商は平均値の定理により、近傍で共通に支配する関数 $G_K$ で抑えられる。よって[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を差商へ適用し、期待値と微分を交換する。

<!-- proof-start -->
### 証明

固定した点 $(\mu_0,\rho_0)$ と、その点を内部に含む閉長方形 $K\subset U$ を取る。$\rho_0$ を固定した $\mu$ 方向では、各 $\varepsilon$ に対し $g_\varepsilon(\mu)=h(\mu+e^{\rho_0}\varepsilon)$ は微分可能で、

$$
g_\varepsilon'(\mu)=h'(\mu+e^{\rho_0}\varepsilon).
$$

十分小さい $t\ne0$ に対し、一変数の平均値の定理を区間 $\mu_0$ と $\mu_0+t$ の間へ使うと、間の点 $\xi_{\varepsilon,t}$ が存在し

$$
\frac{h(\mu_0+t+e^{\rho_0}\varepsilon)-h(\mu_0+e^{\rho_0}\varepsilon)}{t}
=h'(\xi_{\varepsilon,t}+e^{\rho_0}\varepsilon)
$$

となる。右辺の絶対値は $G_K(\varepsilon)$ 以下で、$t\to0$ では連続微分可能性から $h'(\mu_0+e^{\rho_0}\varepsilon)$ に収束する。支配関数は積分可能なので、[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)より期待値の差商の極限も交換できる。

同様に $\mu_0$ を固定し、$\rho$ の関数 $k_\varepsilon(\rho)=h(\mu_0+e^\rho\varepsilon)$ を作る。連鎖律を段階的に使うと

$$
\frac{d}{d\rho}(\mu_0+e^\rho\varepsilon)=e^\rho\varepsilon,\qquad
k_\varepsilon'(\rho)=e^\rho\varepsilon\,h'(\mu_0+e^\rho\varepsilon).
$$

$\rho_0$ と $\rho_0+t$ の差商を平均値の定理で表すと、やはり $G_K$ に支配され、$t\to0$ の点ごとの極限は $e^{\rho_0}\varepsilon h'(\mu_0+e^{\rho_0}\varepsilon)$ となる。もう一度[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用して第二式を得る。点は任意だから主張が成り立つ。$\square$
<!-- proof-end -->

**交換条件を直接確認する例**。$h(z)=-z^2/2$ とすれば $h'(z)=-z$。$K$ 上で $|\mu|\le M$、$0<e^\rho\le S$ と抑えられるので

$$
|h'(Z)|+|\sigma\varepsilon h'(Z)|
\le(M+S|\varepsilon|)(1+S|\varepsilon|).
$$

右辺は標準正規の二次モーメントが有限なので可積分である。また

$$
F(\mu,\rho)=-\frac12E[(\mu+\sigma\varepsilon)^2]
=-\frac12(\mu^2+\sigma^2)
$$

だから、直接微分すると $\partial_\mu F=-\mu$、$\partial_\rho F=-\sigma^2$。定理の右辺も

$$
E[-(\mu+\sigma\varepsilon)]=-\mu,\qquad
E[-\sigma\varepsilon(\mu+\sigma\varepsilon)]=-\sigma^2
$$

となって一致する。

**交換できない例**。$h(z)=\boldsymbol{1}_{\{z>0\}}$ は不連続であり、$h'(z)=0$ とみなせる点がほとんどすべてでも、経路勾配を零にしてはならない。$\sigma=1$ なら

$$
F(\mu,0)=P(\varepsilon>-\mu)
=\Phi(\mu),\qquad
\partial_\mu F(\mu,0)=\frac{e^{-\mu^2/2}}{\sqrt{2\pi}}>0.
$$

ここで $\Phi$ は標準正規の累積分布関数である。$h$ の跳び目を標本が通過するときの変化を点ごとの微分0では拾えず、定理の連続微分可能性が失われたことが失敗原因である。

## 5. Gaussian変分ELBOの勾配

再パラメータ化を変分推論へ戻す。固定観測値 $x$ に対して $f_x(z)=p_\theta(x,z)>0$ とし、$z\in\mathbb R$ 上で $0<\int f_x(z)\,dz<\infty$ とする。変分族を $q_{\mu,\sigma}=N(\mu,\sigma^2)$ とすると、[連続密度のELBO](../ML2-08/index.md#def-ml2-08-elbo-density)は

$$
\mathcal L(\mu,\rho)
=E_{q_{\mu,\sigma}}[\log f_x(Z)]
 -E_{q_{\mu,\sigma}}[\log q_{\mu,\sigma}(Z)]
$$

である。ただし二項はともに絶対可積分とする。$\log q_{\mu,\sigma}(z)=-\frac12\log(2\pi)-\log\sigma-(z-\mu)^2/(2\sigma^2)$ だから、$Z=\mu+\sigma\varepsilon$ を代入すると

$$
-E_{q_{\mu,\sigma}}\log q_{\mu,\sigma}(Z)
=\frac12\log(2\pi)+\rho+\frac12E[\varepsilon^2]
=\rho+\frac12\log(2\pi)+\frac12.
$$

従って密度の対数とGaussianエントロピーを別々に扱える。

<a id="prop-ml2-09-elbo-gradient"></a>

<!-- formal-statement-start -->
> **命題（Gaussian変分ELBOの勾配）**
> $f_x:\mathbb R\to(0,\infty)$ は可測かつ $\int f_x\in(0,\infty)$、$h(z)=\log f_x(z)$ は連続微分可能とする。開領域 $U\subset\mathbb R^2$ 上の各 $(\mu,\rho)$ で $h(\mu+e^\rho\varepsilon)$ が絶対可積分であり、[Gaussian再パラメータ化勾配の定理](#thm-ml2-09-pathwise)の局所的な支配条件を満たすとする。$q_{\mu,\sigma}=N(\mu,\sigma^2)$、$\sigma=e^\rho$ に対するELBOは

$$
\mathcal L(\mu,\rho)
=E_\varepsilon[h(\mu+\sigma\varepsilon)]
+\rho+\frac12\log(2\pi)+\frac12
$$

> と書け、その勾配は

$$
\boxed{\partial_\mu\mathcal L=E_\varepsilon[h'(Z)],\qquad
\partial_\rho\mathcal L=E_\varepsilon[\sigma\varepsilon h'(Z)]+1}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Gaussianの対数密度へ $Z=\mu+\sigma\varepsilon$ を代入すると二乗項が $\varepsilon^2$ に変わり、エントロピーを明示式で計算できる。残る期待値の勾配には前定理の支配条件を使う。

<!-- proof-start -->
### 証明

密度の形を直接代入すると

$$
\begin{aligned}
-E_{q_{\mu,\sigma}}[\log q_{\mu,\sigma}(Z)]
&=E_\varepsilon\left[\frac12\log(2\pi)+\rho+\frac{\varepsilon^2}{2}\right]\\
&=\frac12\log(2\pi)+\rho+\frac12,
\end{aligned}
$$

ここでは $E[\varepsilon^2]=1$ を使用した。絶対可積分性によりELBOの二項を分けられる。$h$ の期待値は[経路勾配の定理](#thm-ml2-09-pathwise)で微分でき、$\partial_\mu\rho=0$、$\partial_\rho\rho=1$ を足すと主張の二式が得られる。$\square$
<!-- proof-end -->

**標準正規模型で検算する。** $f_x(z)=(2\pi)^{-1/2}e^{-z^2/2}$ とすれば $e=1$、真の事後は $N(0,1)$。期待値とエントロピーから

$$
\begin{aligned}
\mathcal L(\mu,\rho)
&=-\frac12\log(2\pi)-\frac12(\mu^2+\sigma^2)
 +\rho+\frac12\log(2\pi)+\frac12\\
&=\frac12-\frac12(\mu^2+\sigma^2)+\rho.
\end{aligned}
$$

ゆえに勾配は $\partial_\mu\mathcal L=-\mu$、$\partial_\rho\mathcal L=1-\sigma^2$。$1-\sigma^2=0$ と $\sigma>0$ から $\sigma=1$、$\mu=0$ となり、ELBOは0で $\log e$ に一致する。これ以外の点では

$$
\log e-\mathcal L
=\frac12(\mu^2+\sigma^2-1-2\log\sigma)>0,
$$

すなわち [連続密度のELBO恒等式](../ML2-08/index.md#thm-ml2-08-elbo-density-identity)の事後KLに等しい。Gaussianの形が正しくても、母数が真値から外れれば下界には隙間が残る。

多変量で対角標準偏差を使う場合も $Z_j=\mu_j+e^{\rho_j}\varepsilon_j$ とし、成分独立の標準正規乱数を用いれば同様の式を各成分に適用できる。ただし各偏微分の支配条件は成分ごとに必要で、任意のブラックボックス模型の勾配が無条件に不偏になるわけではない。

## 6. 計算ラボ：初期値・更新順序・勾配を検査する

二値相互作用模型 $f(z_1,z_2)=e^{cz_1z_2}$ を使う。$c=\log4$ は上の表と一致する。以下は **乱数に頼らず真の事後分布を列挙できる小模型** なので、ELBOだけではなく真のKLも独立に求めて検算できる。初期値、更新順序、結合係数を変えると、更新軌道と各反復の数値が再計算される。これは計算可能性を確認するPythonラボであり、ブラウザ上の対話UIそのものではない。

```python
import math

def sigmoid(v):
    if v >= 0:
        return 1 / (1 + math.exp(-v))
    t = math.exp(v)
    return t / (1 + t)

def hbern(p):
    if p in (0.0, 1.0):
        return 0.0
    return -p * math.log(p) - (1 - p) * math.log(1 - p)

def experiment(coupling=math.log(4), initial=(0.5, 0.5),
               order=(0, 1), sweeps=8):
    assert 0 < initial[0] < 1 and 0 < initial[1] < 1
    assert sorted(order) == [0, 1] and sweeps >= 0
    s, t = initial
    evidence = 3 + math.exp(coupling)
    posterior = [1 / evidence, 1 / evidence,
                 1 / evidence, math.exp(coupling) / evidence]
    log_e = math.log(evidence)
    history = []

    def record():
        q = [(1 - s) * (1 - t), (1 - s) * t,
             s * (1 - t), s * t]
        elbo = coupling * s * t + hbern(s) + hbern(t)
        kl = sum(u * math.log(u / v) for u, v in zip(q, posterior))
        assert abs(log_e - elbo - kl) < 1e-10
        history.append((s, t, elbo, kl))

    record()
    for _ in range(sweeps):
        for coordinate in order:
            if coordinate == 0:
                s = sigmoid(coupling * t)
            else:
                t = sigmoid(coupling * s)
            previous = history[-1][2]
            record()
            assert history[-1][2] >= previous - 1e-12
    return history

for row in experiment():
    print("s={:.6f}, t={:.6f}, ELBO={:.6f}, KL={:.6f}".format(*row))

print("reverse order:", experiment(initial=(0.3, 0.8),
                                    order=(1, 0), sweeps=3)[-1])
```

例えば $c=\log4$、初期値 $(s,t)=(1/2,1/2)$ なら、最初の第1因子更新は $s=2/3$、次の第2因子更新は $t\approx0.716$ になる。ログの各行は $\log e-\mathrm{ELBO}=\mathrm{KL}$ を検査し、更新後のELBO非減少も別に判定する。大きな模型では真のKLを直接計算できないので、この等式を検算用の小模型で習得しておく意義がある。

Gaussian勾配を数値で検査するときは、$h(z)=-z^2/2$ の期待値を使う。次のコードは実数の有限差分と解析勾配を独立に計算する。丸め誤差と打切り誤差があるため、許容誤差は $10^{-5}$ にしている。

```python
import math

def gaussian_elbo(mu, rho):
    sigma = math.exp(rho)
    return 0.5 - 0.5 * (mu * mu + sigma * sigma) + rho

def centered_diff(fun, x, step=1e-5):
    return (fun(x + step) - fun(x - step)) / (2 * step)

mu, rho = 0.7, math.log(1.3)
grad_mu, grad_rho = -mu, 1 - math.exp(2 * rho)
num_mu = centered_diff(lambda v: gaussian_elbo(v, rho), mu)
num_rho = centered_diff(lambda v: gaussian_elbo(mu, v), rho)
assert abs(num_mu - grad_mu) < 1e-5
assert abs(num_rho - grad_rho) < 1e-5
print("mu gradient:", grad_mu, num_mu)
print("log-sigma gradient:", grad_rho, num_rho)
```

## 7. 演習

### ML2-09-A01 積形式の条件を表で確認する

- Level: A

二値の潜在変数 $Z_1,Z_2\in\{0,1\}$ について、候補 $q_1(1)=1/3$、$q_2(1)=3/4$ とする。$q$ の4状態の確率を計算し、総和1と独立性の積条件を確認せよ。また $r(0,0)=r(0,1)=r(1,0)=1/7$、$r(1,1)=4/7$ を同じ積形式にできないことを示せ。

<!-- solution-start -->
#### 詳細解答

[mean-field変分族の定義](#def-ml2-09-mean-field)で各状態の周辺確率を掛ける。

$$
q(0,0)=\frac23\frac14=\frac16,\quad
q(0,1)=\frac23\frac34=\frac12,
$$

$$
q(1,0)=\frac13\frac14=\frac1{12},\quad
q(1,1)=\frac13\frac34=\frac14.
$$

すべて非負で、総和は $(2+6+1+3)/12=1$。積条件は

$$
q(0,0)q(1,1)=\frac1{24}
=q(0,1)q(1,0)
$$

となる。一方 $r$ では左辺が $4/49$、右辺が $1/49$ で等しくない。どの二つの確率ベクトルの積でもこの等式が必要なので、$r$ は積形式にできない。
<!-- solution-end -->

### ML2-09-A02 二値座標更新を正規化する

- Level: A

$f(z_1,z_2)=4^{z_1z_2}$、$z_1,z_2\in\{0,1\}$、$q_2(1)=1/2$ とする。$a_1(0),a_1(1)$、$Z_1$ と最適 $q_1^*(1)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

固定分布の二状態はそれぞれ確率 $1/2$ である。$z_1=0$ では $f(0,z_2)=1$ なので $a_1(0)=(1/2)\log1+(1/2)\log1=0$。$z_1=1$ では $f(1,0)=1$、$f(1,1)=4$ より

$$
a_1(1)=\frac12\log1+\frac12\log4=\log2.
$$

[座標最適更新の定理](#thm-ml2-09-coordinate)へこの二値表を代入すれば

$$
Z_1=e^0+e^{\log2}=3,\qquad
q_1^*(1)=\frac{e^{\log2}}{3}=\frac23.
$$

$q_1^*(0)=1/3$ も合わせて総和1になっている。
<!-- solution-end -->

### ML2-09-A03 Gaussian再パラメータ化の密度

- Level: A

$\varepsilon\sim N(0,1)$ とし、$Z=-1+2\varepsilon$ とする。$E[Z]$、$\operatorname{Var}(Z)$ と $Z$ の確率密度を変数変換で求め、対数標準偏差 $\rho$ を答えよ。

<!-- solution-start -->
#### 詳細解答

$E[\varepsilon]=0$、$\operatorname{Var}(\varepsilon)=1$ から

$$
E[Z]=-1+2\cdot0=-1,\qquad \operatorname{Var}(Z)=2^2\cdot1=4.
$$

$\varepsilon=(z+1)/2$、$d\varepsilon/dz=1/2$ なので、標準正規密度を変数変換して

$$
q(z)=\frac1{\sqrt{2\pi}}e^{-((z+1)/2)^2/2}\cdot\frac12
=\frac1{2\sqrt{2\pi}}e^{-(z+1)^2/8}.
$$

これは $N(-1,4)$ の密度で、$\sigma=2>0$、$\rho=\log2$ である。
<!-- solution-end -->

### ML2-09-A04 二次関数の経路勾配

- Level: A

$\varepsilon\sim N(0,1)$、$h(z)=-z^2/2$、$Z=\mu+e^\rho\varepsilon$ とする。$E[h(Z)]$ と $\mu,\rho$ に関する偏微分を期待値の計算から直接求めよ。

<!-- solution-start -->
#### 詳細解答

$\sigma=e^\rho>0$ とすると、二乗展開で

$$
E[Z^2]=E[\mu^2+2\mu\sigma\varepsilon+\sigma^2\varepsilon^2]
=\mu^2+0+\sigma^2.
$$

従って $E[h(Z)]=-(\mu^2+\sigma^2)/2$。$\partial_\mu(\mu^2/2)=\mu$、$\partial_\rho(\sigma^2)=\partial_\rho e^{2\rho}=2e^{2\rho}$ だから

$$
\partial_\mu E[h(Z)]=-\mu,\qquad
\partial_\rho E[h(Z)]=-\sigma^2.
$$

ここではGaussianの二次モーメントが有限であり、[経路勾配の定理](#thm-ml2-09-pathwise)の支配条件も二次多項式で確かめられる。
<!-- solution-end -->

### ML2-09-B01 座標上昇の増加量を二通りで求める

- Level: B

二値模型 $f(z_1,z_2)=4^{z_1z_2}$ で、初期値 $q_1(1)=q_2(1)=1/2$ とする。第1因子だけを最適更新し、その前後のELBO差を直接計算せよ。さらに更新前後のBernoulli分布のKLでも同じ値が出ることを示せ。

<!-- solution-start -->
#### 詳細解答

[座標最適更新](#thm-ml2-09-coordinate)から更新後の $s=q_1(1)$ は $2/3$、固定因子は $t=1/2$。積分布のELBOは、重みの対数の期待値と二つのエントロピーにより

$$
\mathcal L(s,t)=st\log4+H(s)+H(t),\qquad
H(u)=-u\log u-(1-u)\log(1-u).
$$

初期値では $H(1/2)=\log2$、$st=1/4$ なので

$$
\mathcal L(1/2,1/2)
=\frac14\log4+2\log2=\frac52\log2.
$$

更新後は $st=1/3$、$H(2/3)=\log3-(2/3)\log2$ だから

$$
\begin{aligned}
\mathcal L(2/3,1/2)
&=\frac13\log4+\log3-\frac23\log2+\log2\\
&=\log3+\log2=\log6.
\end{aligned}
$$

差は $\log6-(5/2)\log2=\log(3/(2\sqrt2))=\tfrac12\log(9/8)>0$。一方、[単調性の命題](#prop-ml2-09-ascent)で使うKLは、更新前の $q_1=(1/2,1/2)$ から更新後の $q_1^*=(1/3,2/3)$ への向きで

$$
\begin{aligned}
D(q_1\|q_1^*)
&=\frac12\log\frac{1/2}{1/3}
 +\frac12\log\frac{1/2}{2/3}\\
&=\frac12\log\frac32+\frac12\log\frac34
=\frac12\log\frac98.
\end{aligned}
$$

これが直接計算した増加量と一致する。KLの向きを逆にすると別の値になる。
<!-- solution-end -->

### ML2-09-B02 反復値の収束と真の事後の違い

- Level: B

$z_1,z_2\in\{0,1\}$、$f(0,0)=f(0,1)=f(1,0)=1$、$f(1,1)=4$ とする。積形式 $q(z_1,z_2)=q_1(z_1)q_2(z_2)$ を座標更新する。

1. すべての初期確率ベクトルからのELBO値の列が収束する理由を述べよ。
2. 収束するELBO値が $\log7$ と一致するとは限らないことを、真の事後の積条件から示せ。
3. 反復中にELBOが増えなくなった場合、それだけで大域最大といえるか答えよ。

<!-- solution-start -->
#### 詳細解答

**（1）** $f>0$ は有限集合上で成り立つ。各座標を[最適更新](#thm-ml2-09-coordinate)へ置き換えると、[単調性命題](#prop-ml2-09-ascent)よりELBOは減少しない。また $e=1+1+1+4=7$ である。[有限状態の ELBO 恒等式と等号条件](../ML2-08/index.md#thm-ml2-08-elbo-identity)からすべての積分布で $\mathcal L\le\log7$。よってELBO値は単調有界で収束する。

**（2）** 真の事後は $(1/7,1/7,1/7,4/7)$。積形式に必要な等式は $r(0,0)r(1,1)=r(0,1)r(1,0)$ だが、左辺は $4/49$、右辺は $1/49$。従ってどの積分布も $r$ と一致しない。この有限状態で $f>0$ なので、[ELBO恒等式の等号条件](../ML2-08/index.md#thm-ml2-08-elbo-identity)により、各積分布のELBOは $\log7$ より小さい。

**（3）** 一回の座標更新でELBOが増えなくなっただけなら、[座標上昇の単調性と限界](#prop-ml2-09-ascent)からその因子が最適値に一致したと分かるだけで、他方の因子はまだ更新できる。実際に $(s,t)=(2/3,1/2)$ から第1因子を更新しても $s'=2/3$ で増加量は0だが、第2因子の更新は

$$
t'=\frac{4^{2/3}}{1+4^{2/3}}>\frac12
$$

でELBOを増加させる。従って**一座標で増加0という情報だけでは**大域最大といえない。ただしこの設問の二値模型は、一般論より強い結論を持つ。$c=\log4$ として $0<s,t<1$ で

$$
\mathcal L(s,t)=cst+H(s)+H(t),\qquad
\nabla^2\mathcal L=
\begin{pmatrix}
-\frac1{s(1-s)}&c\\c&-\frac1{t(1-t)}
\end{pmatrix}.
$$

$s(1-s)\le1/4$、$t(1-t)\le1/4$ なので、対角成分は負で、行列式は

$$
\frac1{s(1-s)t(1-t)}-c^2\ge16-(\log4)^2>0.
$$

よってELBOは内部で厳密凹である。境界の $s=0,1$ を内側へ距離 $\delta>0$ だけ動かすと、エントロピーの増加と相互作用項の変化はそれぞれ

$$
H(\delta)=-\delta\log\delta+O(\delta),\qquad
|\Delta(cst)|\le |c|\delta
$$

である。十分小さい $\delta$ では前者が勝るのでELBOは増加する。$t$ の境界も同様であり、最大点は内部にある。両座標が同時に最適更新と一致する場合は各偏微分が0となり、その点は厳密凹性により一意の大域最大である。

この特別な結論は本模型の凹性によるものであり、一般のmean-field模型にまで拡張できない。また大域最大でも真の事後 $r$ が積形式でない点は（2）のままである。
<!-- solution-end -->

### ML2-09-B03 連続Gaussian因子の正規化

- Level: B

連続潜在変数 $z_1,z_2\in\mathbb R$ の非正規化密度を

$$
f(z_1,z_2)=\exp[-(z_1^2+z_2^2-z_1z_2)/2]
$$

とする。固定因子は $q_2=N(2,1)$ である。$a_1(z_1)$、正規化定数 $Z_1$ と更新後 $q_1^*$ を求めよ。必要な積分の有限性も確認せよ。

<!-- solution-start -->
#### 詳細解答

$\log f=-(z_1^2+z_2^2-z_1z_2)/2$ であり、$q_2=N(2,1)$ の平均と二次モーメントは $E[Z_2]=2$、$E[Z_2^2]=1+2^2=5$。従って

$$
\begin{aligned}
a_1(z_1)
&=-\frac12z_1^2-\frac12E[Z_2^2]+\frac12z_1E[Z_2]\\
&=-\frac12z_1^2+z_1-\frac52\\
&=-\frac12(z_1-1)^2-2.
\end{aligned}
$$

指数化して正規化するための積分は

$$
Z_1=e^{-2}\int_{\mathbb R}e^{-(u-1)^2/2}du
=e^{-2}\sqrt{2\pi}\in(0,\infty).
$$

よって[連続因子の座標更新命題](#prop-ml2-09-continuous)に代入すると

$$
q_1^*(z_1)=\frac{e^{-2}e^{-(z_1-1)^2/2}}{e^{-2}\sqrt{2\pi}}
=\frac1{\sqrt{2\pi}}e^{-(z_1-1)^2/2}.
$$

これは $N(1,1)$ の密度である。$f$ の二次形式についても平方完成すれば

$$
z_1^2+z_2^2-z_1z_2=(z_1-\tfrac12z_2)^2+\tfrac34z_2^2
$$

である。変数 $(u,v)=(z_1-z_2/2,z_2)$ への変換はJacobianの絶対値1で、[Gaussian積分の正規化](../ML1-07/index.md#lem-ml1-07-gaussian-normalization)から $e=4\pi/\sqrt3<\infty$ が従う。Gaussian因子は有限な二次モーメントとエントロピーを持ち、更新後の $|a_1|$ と $|\log q_1^*|$ も二次多項式で抑えられて可積分となる。
<!-- solution-end -->

### ML2-09-B04 不連続関数で経路勾配を誤用しない

- Level: B

$\varepsilon\sim N(0,1)$ とし、$F(\mu)=E[\boldsymbol{1}_{\{\mu+\varepsilon>0\}}]$ とする。

1. $F(\mu)$ と $F'(0)$ を求めよ。
2. 標本ごとに指示関数を微分して平均すると0になりそうな理由と、実際にはそれが誤る理由を述べよ。
3. [Gaussian再パラメータ化勾配の定理](#thm-ml2-09-pathwise)のどの仮定を確認できないか答えよ。

<!-- solution-start -->
#### 詳細解答

**（1）** $\varepsilon>-\mu$ の確率なので、標準正規密度 $\varphi(u)=(2\pi)^{-1/2}e^{-u^2/2}$ を用いて

$$
F(\mu)=\int_{-\mu}^{\infty}\varphi(u)\,du=\Phi(\mu).
$$

変数変換 $v=-u$ と対称性から $F(\mu)=\int_{-\infty}^\mu\varphi(v)\,dv$。差商を取れば

$$
\frac{F(\mu+t)-F(\mu)}{t}
=\frac1t\int_\mu^{\mu+t}\varphi(v)\,dv
\longrightarrow\varphi(\mu)
$$

となる。最後は $\varphi$ の連続性により、積分区間上の最大値と最小値ではさめるためである。特に $F'(0)=1/\sqrt{2\pi}>0$。

**（2）** $\mu+\varepsilon\ne0$ の標本では、$\mu$ を十分小さく動かしても指示関数は局所的に一定であり、点ごとの微分は0になる。しかし境界の近くにいる標本の集合は $\mu$ の移動とともに入れ替わる。その寄与が $F'(\mu)=\varphi(\mu)$ に現れるため、点ごとの微分の平均とは異なる。

**（3）** $h(z)=\boldsymbol{1}_{\{z>0\}}$ は $z=0$ で不連続で、連続微分可能性を満たさない。差商が一点の近傍で大きくなるため、定理が要求する近傍で共通の可積分支配関数も導けない。従って定理を適用してはならない。
<!-- solution-end -->

### ML2-09-C01 座標更新・事後KL・Gaussian勾配をつなぐ

- Level: C

第1の模型は $Z_1,Z_2\in\{0,1\}$、$f(z_1,z_2)=4^{z_1z_2}$。積近似 $q_1(1)=s$、$q_2(1)=t$ を $(s,t)=(1/2,1/2)$ から開始する。第2の模型は $z\in\mathbb R$ 上の密度 $f_x(z)=(2\pi)^{-1/2}e^{-z^2/2}$、変分族 $N(\mu,e^{2\rho})$ とする。

1. 第1模型で第1因子を一回、その後第2因子を一回更新し、$s',t'$ を正規化式から求めよ。
2. 初期ELBO、第一更新後ELBO、第二更新後ELBOを式で求め、それぞれの大小関係を確認せよ。第二更新後の真の事後KLも求めよ。
3. 真の事後が積形式ではないことを示し、ELBOの単調上昇から何を結論できないか述べよ。
4. 第2模型のELBOと $\mu,\rho$ 勾配を導出し、最大点と最大ELBOを求めよ。経路勾配で微分と期待値を交換してよい理由も示せ。

<!-- solution-start -->
#### 詳細解答

**（1）** $a_1(0)=0$、$a_1(1)=t\log4$ だから[座標最適更新](#thm-ml2-09-coordinate)で

$$
s'=\frac{e^{(\log4)/2}}{1+e^{(\log4)/2}}
=\frac23.
$$

次の座標では第1因子を新しい $s'$ に固定するので、$a_2(0)=0$、$a_2(1)=s'\log4$、従って

$$
t'=\frac{4^{2/3}}{1+4^{2/3}},\qquad
1-t'=\frac1{1+4^{2/3}}.
$$

**（2）** $H(u)=-u\log u-(1-u)\log(1-u)$ を二値エントロピーと置く。$f$ の対数は $z_1=z_2=1$ のときだけ $\log4$、それ以外は0だから

$$
\mathcal L(s,t)=st\log4+H(s)+H(t).
$$

初期値と第一更新後については

$$
\mathcal L_0=\frac52\log2,\qquad
\mathcal L_1=\log6.
$$

第二更新は、固定した $s'=2/3$ のもとで $a_2(0)=0$、$a_2(1)=(2/3)\log4$ という二状態の正規化に相当する。従って最適第2因子に対する「期待対数重み＋エントロピー」の値は $\log(1+4^{2/3})$。第1因子のエントロピー $H(2/3)=\log3-(2/3)\log2$ を足すと

$$
\mathcal L_2=\log(1+4^{2/3})+\log3-\frac23\log2.
$$

比較を曖昧にせず、[座標上昇の増加量公式](#prop-ml2-09-ascent)で

$$
\mathcal L_1-\mathcal L_0=D(\mathrm{Bern}(1/2)\|\mathrm{Bern}(2/3))>0,
$$

$$
\mathcal L_2-\mathcal L_1=D(\mathrm{Bern}(1/2)\|\mathrm{Bern}(t'))>0
$$

を得る。第二のKLが正なのは $t'\ne1/2$ による。$e=7$、真の事後 $r=f/7$ は正なので[ELBO恒等式](../ML2-08/index.md#thm-ml2-08-elbo-identity)を適用でき、第二更新後のKLは

$$
D(q_{s',t'}\|r)=\log7-\mathcal L_2
=\log7-\log(1+4^{2/3})-\log3+\frac23\log2.
$$

**（3）** 真の $r$ では $r(0,0)r(1,1)=4/49$、$r(0,1)r(1,0)=1/49$ で異なる。従って積形式へ一致できず、真の事後を得ることはできない。[座標上昇の単調性と限界](#prop-ml2-09-ascent)だけから一般の模型の大域最大点への収束も保証できない。

ただし**この二値模型で二座標を交互に最適更新する場合**には、さらに結論できる。$g(u)=e^{cu}/(1+e^{cu})$、$c=\log4$ とすると、更新は $s_{n+1}=g(t_n)$、$t_{n+1}=g(s_{n+1})$ である。導関数は

$$
g'(u)=c\,g(u)(1-g(u)),\qquad |g'(u)|\le\frac{c}{4}.
$$

よって二座標一巡の写像 $t\mapsto g(g(t))$ の差は、任意の二点間で高々 $c^2/16<1$ 倍となる。連続する更新値の差が幾何級数で抑えられるので $t_n$ は収束し、$s_n$ も収束する。極限は両座標の最適更新に一致する。B02（3）で確かめた本模型の厳密凹性から、それは**唯一の大域最大点**である。これは単調性だけでは得られない、この模型固有の追加証明である。

**（4）** 第2模型で $Z=\mu+\sigma\varepsilon$、$\sigma=e^\rho$ と置く。標準正規の $E[\varepsilon]=0$、$E[\varepsilon^2]=1$ とGaussianエントロピーから、[Gaussian変分ELBO勾配命題](#prop-ml2-09-elbo-gradient)の導出を具体化すると

$$
\begin{aligned}
\mathcal L(\mu,\rho)
&=-\frac12\log(2\pi)-\frac12E[Z^2]
 +\frac12\log(2\pi)+\frac12+\rho\\
&=\frac12-\frac12(\mu^2+e^{2\rho})+\rho.
\end{aligned}
$$

$\mu$ による微分は $-\mu$、$\rho$ による微分は $1-e^{2\rho}$。従って停留点は $\mu=0$、$\rho=0$ である。$\mu$ 方向の二階微分は $-1$、$\rho$ 方向は $-2e^{2\rho}<0$、交差項は0なので、この点が一意の大域最大点で最大ELBOは0になる。また真の事後 $N(0,1)$ が変分族内にあり、[ELBOの等号条件](../ML2-08/index.md#thm-ml2-08-elbo-density-identity)でも同じ結論を確認できる。

最後に $h(z)=-z^2/2$ は連続微分可能で $h'(z)=-z$、$\mu,\rho$ の任意の有界閉近傍で $|h'(Z)|+|\sigma\varepsilon h'(Z)|$ は定数倍の $1+|\varepsilon|+\varepsilon^2$ で抑えられる。標準正規の二次モーメントは有限なので、[経路勾配の定理](#thm-ml2-09-pathwise)の支配条件を満たし、微分と期待値を交換できる。
<!-- solution-end -->

## 8. 次に向けて

mean-field更新は因子ごとの正規化とKL最小化から出るので、アルゴリズムの単調性を追える。一方、積形式に制限した分布が真の事後依存を表せないことと、更新値が大域最適を保証しないことを同時に理解する必要がある。Gaussian再パラメータ化は、分布を変える最適化を固定乱数の下の微分へ移すが、連続微分可能性と支配条件がその交換を支えている。次のML2-10では、期待値を標本で推定する際の分散や重要度重みを扱う。
