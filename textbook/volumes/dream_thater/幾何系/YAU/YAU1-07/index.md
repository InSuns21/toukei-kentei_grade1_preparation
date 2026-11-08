# YAU1-07 C0評価II：Moser反復

## 1. 平均的に小さい谷が、なぜ点でも浅いのか

[前章のGreen核による評価](../YAU1-06/index.md#thm-yau1-06-upper-l1)は、平均ゼロの許容ポテンシャル $\varphi$ に対して $\sup\varphi\le C_0$ と $\int_X|\varphi|\,d\mu\le2VC_0$ を保証した。しかし $L^1$ 評価は、幅の狭い深い谷をまだ排除しない。[前章の熱核集中例](../YAU1-06/index.md#ex-yau1-06-c01)が教えたのは、**許容性だけでは谷は埋まらず、方程式の右辺を使う必要がある**ということだった。

本章では複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体 $(X,\omega)$ を固定し、$d\mu=\omega^n$、$V=\int_Xd\mu>0$、$\bar f=V^{-1}\int_Xf\,d\mu$ と書く。滑らかな実関数 $F$ は $\int_Xe^Fd\mu=V$ を満たす。[体積正規化パス](../YAU1-05/index.md#def-yau1-05-path)のうち、**解が存在する** $t\in[0,1]$ だけを考える。

$$
\rho_t=1-t+te^F,\qquad
\omega_{\varphi_t}=\omega+i\partial\bar\partial\varphi_t>0,
\qquad \omega_{\varphi_t}^{n}=\rho_t\,\omega^n,
\qquad \bar\varphi_t=0.
$$

右辺は固定した $F$ によって

$$
0<\min\{1,\min_Xe^F\}\le\rho_t\le
\max\{1,\max_Xe^F\},\qquad
|\rho_t-1|\le D:=\|e^F-1\|_{L^\infty(X)}
$$

を満たす。最後の定数 $D$ は $t$ に依存しない。平均ゼロの代表を上限ゼロに替え、$m_t=\sup_X\varphi_t$、$\psi_t=\varphi_t-m_t\le0$ とする。[上限ゼロ規格化の系](../YAU1-06/index.md#cor-yau1-06-sup-gauge)から

$$
0\le m_t\le C_0,\qquad
\int_X(-\psi_t)\,d\mu=Vm_t\le VC_0.
$$

反復中に零で割ったり、負のべきで谷を見たりしないよう、**常に1を加えた正の関数**

$$
v=1-\psi_t=1+m_t-\varphi_t\ge1,
\qquad B:=\int_Xv\,d\mu=V(1+m_t)\le V(1+C_0)
$$

を使う。目標は $v$ の $L^\infty$ 上界である。以下、指数と定数の追跡が終わるまでは $t$ を省略する。

## 2. 方程式を勾配エネルギーに変える

$\omega_\varphi=\omega-i\partial\bar\partial v$ なので、二つの $n$ 乗の差を因数分解してから部分積分する。正のKähler形式の積を残すことが、谷の勾配を抑える仕組みである。形式

$$
T=\sum_{k=0}^{n-1}\omega_\varphi^k\wedge\omega^{n-1-k}
$$

は閉形式であり、各項は非負の $(n-1,n-1)$ 形式である。$\omega_\varphi^n-\omega^n=-i\partial\bar\partial v\wedge T$ が成り立つ。

<a id="lem-yau1-07-energy"></a>

<!-- formal-statement-start -->
> **補題（Monge–Ampèreエネルギー評価）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$d\mu=\omega^n$ とする。$v\ge1$ が $X$ 上で滑らかで、$\omega-i\partial\bar\partial v>0$ と $(\omega-i\partial\bar\partial v)^n=\rho\omega^n$ を満たすとする。$\rho>0$、$\|\rho-1\|_\infty\le D<\infty$ なら、すべての実数 $q\ge2$ に対して

$$
\int_X\left|\nabla_\omega(v^{q/2})\right|^2d\mu
\le\frac{nDq^2}{2(q-1)}\int_Xv^{q-1}d\mu
\le nDq\int_Xv^q\,d\mu.
$$

> ここで実Laplacianの規約は $\Delta_\omega=\operatorname{div}_\omega\nabla_\omega=2g^{j\bar k}\partial_j\partial_{\bar k}$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

$v^{q-1}$ をMonge–Ampère方程式の差に掛け、$T$ が閉じていることを使って微分を $v^{q-1}$ へ移す。$T$ のうち $\omega^{n-1}$ だけ残せば、基準計量の勾配エネルギーが下から得られる。

<!-- proof-start -->
### 証明

差の因数分解は $a^n-b^n=(a-b)\sum_{k=0}^{n-1}a^kb^{n-1-k}$ を可換な偶数次数の形式の外積へ適用したものである。$d\omega=d\omega_\varphi=0$ なので $\partial T=\bar\partial T=0$。境界がないため[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すると

$$
\begin{aligned}
\int_Xv^{q-1}(\rho-1)\,d\mu
&=-\int_Xv^{q-1}i\partial\bar\partial v\wedge T\\
&=(q-1)\int_Xv^{q-2}i\partial v\wedge\bar\partial v\wedge T\\
&\ge(q-1)\int_Xv^{q-2}i\partial v\wedge\bar\partial v\wedge\omega^{n-1}.
\end{aligned}
$$

最後の行で、$T$ の $k=0$ 項だけを残した。局所的に $g_{j\bar k}=\delta_{jk}$ となる基底を取ると

$$
i\partial v\wedge\bar\partial v\wedge\omega^{n-1}
=\frac1n\sum_j|v_j|^2\omega^n
=\frac1{2n}|\nabla_\omega v|^2\,d\mu.
$$

第二の等号では、実Riemann計量が $2g_{j\bar k}$ を係数に持ち $|\nabla_\omega v|^2=2\sum_j|v_j|^2$ であることを用いた。[前章のLaplacian規約](../YAU1-06/index.md#prop-yau1-06-laplacian-lower)と一致する。従って

$$
\frac{q-1}{2n}\int_Xv^{q-2}|\nabla_\omega v|^2d\mu
\le\int_Xv^{q-1}(\rho-1)d\mu
\le D\int_Xv^{q-1}d\mu.
$$

ここで $\nabla(v^{q/2})=(q/2)v^{(q-2)/2}\nabla v$ を代入して

$$
\int_X|\nabla(v^{q/2})|^2d\mu
=\frac{q^2}{4}\int_Xv^{q-2}|\nabla v|^2d\mu
\le\frac{nDq^2}{2(q-1)}\int_Xv^{q-1}d\mu.
$$

$q\ge2$ なら $q/[2(q-1)]\le1$、$v\ge1$ なら $v^{q-1}\le v^q$ なので後半の不等式も得る。$\square$
<!-- proof-end -->

**直接例（平坦楕円曲線）。** $E=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$、$\omega_0=i\,dz\wedge d\bar z=2dx\,dy$、$0<a<1$ とする。ここでは楕円曲線を $E$ と書き、上の外積形式 $T$ と区別する。$\varphi_a=a\cos(2\pi x)/\pi^2$ は周期的な滑らかな実関数である。[前章の平坦例のWirtinger微分](../YAU1-05/index.md#def-yau1-05-path)を使うと、

$$
\begin{aligned}
\partial_z\partial_{\bar z}\varphi_a
&=\frac14(\partial_x^2+\partial_y^2)\varphi_a\\
&=-a\cos(2\pi x),\\
\omega_{\varphi_a}&=(1-a\cos2\pi x)\omega_0.
\end{aligned}
$$

複素次元 $1$ では基準形式の係数を比較するだけでよく、$1-a\cos2\pi x\ge1-a>0$ が正値性を示す。$\rho=1-a\cos2\pi x$ と置くと $\omega_{\varphi_a}=\rho\omega_0$ であり、$\int_E\varphi_a\,d\mu=0$ は余弦の一周期積分から従う。したがって $m=\sup_E\varphi_a=a/\pi^2$、$v=1+(a/\pi^2)(1-\cos2\pi x)\ge1$。複素次元 $1$、$q=2$ のとき

$$
\begin{aligned}
\int_Ev(\rho-1)d\mu
&=\int_0^1\!\int_0^1 2\left(1+\frac a{\pi^2}-\frac a{\pi^2}\cos2\pi x\right)(-a\cos2\pi x)dx\,dy
=\frac{a^2}{\pi^2},\\
\frac12\int_E|\nabla_{\omega_0}v|^2d\mu
&=\frac12\int_0^1\!\int_0^1\left[\frac12\left(\frac{2a}{\pi}\sin2\pi x\right)^2\right]2dx\,dy
=\frac{a^2}{\pi^2}.
\end{aligned}
$$

この場合は外積形式 $T=\omega_0^0=1$ だからエネルギー恒等式は等号になる。**方程式から勾配を制御した**というつながりが数値でも見える。

## 3. 最初の $L^2$ と次元に応じたSobolev指数

反復式は $L^q$ から $L^{q\beta}$ へ進むが、最初の $L^2$ は $L^1$ だけでは一般に制御できない。そこで[GA2の平均零Poincaré不等式](../../GA/GA2/index.md#thm-ga2-poincare)を使う。[GA2のSobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)は実次元 $2n$ に対する定理であり、積分測度 $\omega^n=n!dV_\omega$ への変更は固定の定数倍だけである。

<a id="lem-yau1-07-l2-start"></a>

<!-- formal-statement-start -->
> **補題（反復開始のL2評価）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体とし、$d\mu=\omega^n$、$V=\int_Xd\mu$ とする。滑らかな $v\ge1$ が $\omega-i\partial\bar\partial v>0$ と $(\omega-i\partial\bar\partial v)^n=\rho\omega^n$（$\rho>0$、$\|\rho-1\|_\infty\le D$）を満たし、$B=\int_Xv\,d\mu\le V(1+C_0)$（$C_0\ge0$ は固定定数）とする。このとき、[平均零Poincaré不等式](../../GA/GA2/index.md#thm-ga2-poincare)の定数 $C_P$ を選ぶと

$$
\|v\|_{L^2(d\mu)}
\le C_P\sqrt{2nDB}+\frac B{\sqrt V}.
$$

> 特に右辺は連続性パラメータ $t$ と個々の解に依存しない定数で抑えられる。
<!-- formal-statement-end -->

### 証明の見取り図

[Monge–Ampèreエネルギー評価](#lem-yau1-07-energy)の $q=2$ は $\|\nabla v\|_2^2\le2nDB$ を与える。平均値 $B/V$ を取り除いてPoincaré不等式を適用し、最後に定数部分を足す。

<!-- proof-start -->
### 証明

$q=2$ の[Monge–Ampèreエネルギー評価](#lem-yau1-07-energy)の最初の不等式に $\int v=B$ を代入すると

$$
\|\nabla_\omega v\|_2^2\le\frac{nD\cdot4}{2(2-1)}B=2nDB.
$$

$\bar v=B/V$ であり、[平均零Poincaré不等式](../../GA/GA2/index.md#thm-ga2-poincare)を $v-\bar v$ に適用する。$d\mu=n!dV_\omega$ は定数倍だから同じ $C_P$ を採用でき、

$$
\|v-\bar v\|_2\le C_P\|\nabla v\|_2
\le C_P\sqrt{2nDB}.
$$

一方 $\|\bar v\|_2=(B/V)\sqrt V=B/\sqrt V$。三角不等式で両者を足せば結論となる。$\square$
<!-- proof-end -->

次にSobolev指数を選ぶ。実次元 $2n\ge4$ なら $H^1\hookrightarrow L^{2n/(n-1)}$、実次元2では端点 $L^\infty$ へ直接埋め込めないため、有限の $L^4$ を選ぶ。どちらでも指数は1より大きい固定倍率となる。

<a id="def-yau1-07-exponents"></a>

<!-- formal-statement-start -->
> **定義（Moser反復の指数列）**  
> 複素次元 $n\ge1$ に対し

$$
\beta=\begin{cases}2&(n=1),\\ n/(n-1)&(n\ge2),\end{cases}
\qquad q_j=2\beta^j\quad(j=0,1,2,\ldots)
$$

> と定める。$q_j$ を、$H^1$ からの指数増幅を繰り返すためのMoser反復の指数列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-07-exponents -->
**定義の確認**。複素次元1なら実次元2で $\beta=2$、指数列は $2,4,8,16,\ldots$ となり、[GA2の埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)の $H^1\to L^4$ を毎回利用できる。複素次元2なら $\beta=2$、複素次元3なら $\beta=3/2$ で、いずれも $q_{j+1}/q_j=\beta>1$。$q_j\to\infty$ になることが反復の目的である。
<!-- definition-example-end -->

## 4. 一段の指数増幅から無限回の積を評価する

Sobolev不等式を $v$ 自身ではなく $w=v^{q/2}$ に当てる。すると $w\in L^{2\beta}$ は $v\in L^{q\beta}$ に変わる。ここで「定数が各段階で増えるのだから発散するのでは」という疑問が残る。各段階の倍率は $q$ 乗根で弱められ、その対数の和が有限になる。

<a id="prop-yau1-07-gain"></a>

<!-- formal-statement-start -->
> **命題（Sobolevによる指数増幅）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$d\mu=\omega^n$ とする。滑らかな実関数 $v\ge1$ と正関数 $\rho$ が $\omega-i\partial\bar\partial v>0$、$(\omega-i\partial\bar\partial v)^n=\rho\omega^n$、$\|\rho-1\|_\infty\le D$ を満たすとする。[指数列の定義](#def-yau1-07-exponents)で選ぶ $\beta>1$ に対し、$(X,\omega,D)$ のみで決まる $C\ge1$ が存在し、すべての $q\ge2$ について

$$
\|v\|_{L^{q\beta}(d\mu)}
\le(Cq)^{1/q}\|v\|_{L^q(d\mu)}.
$$

> $C$ は $(X,\omega)$ と $D$ のみで決められ、$q,t,\varphi_t$ には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[GA2のSobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)を $w=v^{q/2}$ に使い、[勾配エネルギー](#lem-yau1-07-energy)を代入する。左辺は $\|w\|_{2\beta}^2=\|v\|_{q\beta}^q$ となる。

<!-- proof-start -->
### 証明

実次元 $2n$ に合わせて $2\beta$ を選んだので、[Sobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)により定数 $S\ge1$ があり、$d\mu=n!dV_\omega$ の違いを定数へ吸収して

$$
\|w\|_{2\beta}^2
\le S\bigl(\|\nabla_\omega w\|_2^2+\|w\|_2^2\bigr)
$$

がすべての滑らかな $w$ に成り立つ。$w=v^{q/2}$ を入れると $\|w\|_2^2=\int v^q$、$\|w\|_{2\beta}^2=(\int v^{q\beta})^{1/\beta}=\|v\|_{q\beta}^q$ である。[Monge–Ampèreエネルギー評価](#lem-yau1-07-energy)から

$$
\|v\|_{q\beta}^q
\le S\left(nDq\int_Xv^qd\mu+\int_Xv^qd\mu\right)
\le S(1+nD)q\|v\|_q^q.
$$

最後は $q\ge2\ge1$ を使用した。$C=S(1+nD)\ge1$ と置いて正の $q$ 乗根を取ればよい。$\square$
<!-- proof-end -->

<a id="thm-yau1-07-moser"></a>

<!-- formal-statement-start -->
> **定理（Moser反復による一様C0評価）**  
> $(X,\omega)$ を境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X,\mathbb R)$ を $\int_Xe^F\omega^n=\int_X\omega^n$ を満たす固定関数とする。すべての $t\in[0,1]$ のうち、滑らかな平均ゼロ解 $\varphi_t$ が存在し、$\omega_{\varphi_t}>0$、$\omega_{\varphi_t}^n=(1-t+te^F)\omega^n$ を満たすものについて、$(X,\omega,F)$ のみで決まる有限定数 $M$ が存在し、

$$
\sup_X(-\psi_t)\le M,
\qquad\psi_t=\varphi_t-\sup_X\varphi_t.
$$

> とくに $\|\varphi_t\|_{L^\infty}$ は $t$ と解に依存せず一様有界となる。
<!-- formal-statement-end -->

### 証明の見取り図

[反復開始の $L^2$ 評価](#lem-yau1-07-l2-start)に[一段の増幅](#prop-yau1-07-gain)を $q_j=2\beta^j$ で繰り返す。増幅定数の積の対数を幾何級数で抑え、指数が無限大へ向かう極限を取る。

<!-- proof-start -->
### 証明

[指数列の定義](#def-yau1-07-exponents)と[指数増幅の命題](#prop-yau1-07-gain)を $q=q_j$ に適用し、$j=0,\ldots,N-1$ にわたって掛けると、

$$
\|v\|_{q_N}
\le\|v\|_2\prod_{j=0}^{N-1}(Cq_j)^{1/q_j}.
$$

$q_j=2\beta^j$ を明示的に代入して積の対数を取り、

$$
\begin{aligned}
\log\prod_{j=0}^{N-1}(Cq_j)^{1/q_j}
&=\sum_{j=0}^{N-1}\frac{\log(Cq_j)}{q_j}\\
&=\frac12\sum_{j=0}^{N-1}\beta^{-j}
\bigl(\log(2C)+j\log\beta\bigr)\\
&\le\frac{\beta\log(2C)}{2(\beta-1)}
+\frac{\beta\log\beta}{2(\beta-1)^2}=:K.
\end{aligned}
$$

ここでは $\sum_{j\ge0}\beta^{-j}=\beta/(\beta-1)$、$\sum_{j\ge0}j\beta^{-j}=\beta/(\beta-1)^2$ をそれぞれ用いた。$\beta>1$ より $K<\infty$ である。

一方、[開始補題](#lem-yau1-07-l2-start)と $B\le B_*:=V(1+C_0)$ は

$$
\|v\|_2\le C_P\sqrt{2nDB_*}+\frac{B_*}{\sqrt V}=:H
$$

を与える（$B\mapsto\sqrt B$ も $B\mapsto B$ も単調増加）。したがって全 $N$ で $\|v\|_{q_N}\le He^K$。$v$ はコンパクトな $X$ 上で滑らかであり、有限測度空間で $q_N\to\infty$ のとき $\|v\|_{q_N}\to\|v\|_\infty$。この極限は、最大点の近傍で $v\ge\max v-\varepsilon$ となる正測度の集合を取れば下から、$\int v^q\le V(\max v)^q$ から上から示せる。ゆえに

$$
\|v\|_\infty\le He^K,
\qquad \sup_X(-\psi)=\sup_X(v-1)\le He^K-1=:M.
$$

$m=\sup\varphi\in[0,C_0]$、$\varphi=m+1-v=m+\psi$ に戻すと $-M\le\varphi\le C_0$。すべての定数 $C_0,B_*,D,C_P,S,\beta$ は $X,\omega,F$ だけで決まり、$t$ には依存しない。$\square$
<!-- proof-end -->

具体的に複素次元1なら $\beta=2$ なので、積の定数は $K=\log(2C)+(\log2)$、したがって $e^K=4C$ と計算できる。各反復で倍率が $Cq_j$ と増えても、その $q_j$ 乗根の積は有限なのである。

<a id="cor-yau1-07-path-c0"></a>

<!-- formal-statement-start -->
> **系（連続性のパスでの上下界）**  
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$F\in C^\infty(X,\mathbb R)$ を $\int_Xe^F\omega^n=\int_X\omega^n$ を満たす関数とする。$t\in[0,1]$ に滑らかな平均ゼロ解 $\varphi_t$ が存在し、$\omega_{\varphi_t}>0$ と $\omega_{\varphi_t}^n=(1-t+te^F)\omega^n$ を満たすとする。[前章の上限評価](../YAU1-06/index.md#thm-yau1-06-upper-l1)の定数を $C_0$、[Moser反復定理](#thm-yau1-07-moser)の定数を $M$ とし、$C_*=\max\{C_0,M\}$ を取れば

$$
-C_*\le\varphi_t(x)\le C_*
\qquad(x\in X)
$$

> が同じ $C_*$ で成立する。これは可解な $t$ に対する**一様事前評価**であって、まだ全 $t\in[0,1]$ に解が存在すると主張するものではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[前章の上限評価](../YAU1-06/index.md#thm-yau1-06-upper-l1)により $\sup\varphi_t=m_t\le C_0$。[Moser反復による一様C0評価](#thm-yau1-07-moser)から $\varphi_t=m_t+\psi_t\ge-M$。$C_*$ を両方以上に選べば結論が成立する。$\square$
<!-- proof-end -->

## 5. 仮定を落としたとき、どの歯車が止まるか

- **密度上界を固定しない場合。** [前章のGreen核集中例](../YAU1-06/index.md#ex-yau1-06-c01)では $\omega_{u_\varepsilon}/\omega_0=(1+Vp_\varepsilon)/2$ の最大値が発散する。したがって $D$ を一つに固定できず、[Monge–Ampèreエネルギー評価](#lem-yau1-07-energy)の定数が発散する。正値性・平均ゼロ・一様 $L^1$ だけから今回の結論を得たわけではない。
- **コンパクト性を落とす場合。** [GA2のSobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)を固定の大域定数で使えるとは限らない。体積 $V<\infty$ や極限 $\|v\|_{q_j}\to\|v\|_\infty$ の扱いも改めて確かめる必要がある。
- **連結性を落とす場合。** [平均零Poincaré不等式](../../GA/GA2/index.md#thm-ga2-poincare)は全体平均を引くだけでは成立しない。各成分の定数方向が残り、反復開始の $L^2$ 上界を統一できない。
- **$v\ge1$ を用意しない場合。** $v^{q-1}\le v^q$ が使えず、$q$ が非整数のとき負の底の冪も定義できない。上限ゼロ正規化と $+1$ は単なる見た目の細工ではない。

ここで使ったのは $\rho_t>0$ による許容解の存在と、$D=\|e^F-1\|_\infty$ という固定上界である。下限 $\inf\rho_t>0$ は、**本章のエネルギー不等式そのものの定数には登場しない**。次章以降の計量の二側評価では、こうした仮定の役割を再び追う。

## 6. 演習：各段階を自力で接続する

<a id="ex-yau1-07-a01"></a>

### Level A — YAU1-07-A01：密度の一様定数
- Level: A

$0\le t\le1$、$e^F>0$、$\rho_t=1-t+te^F$ とする。$\rho_t$ の正の上下界と $\|\rho_t-1\|_\infty$ の上界を $F$ だけで書け。

<!-- solution-start -->
**詳細解答。** $\rho_t(x)$ は $1$ と $e^{F(x)}$ の非負係数 $1-t,t$ による和だから、各 $x$ で $\min\{1,e^{F(x)}\}\le\rho_t(x)\le\max\{1,e^{F(x)}\}$。$X$ 上の最小値・最大値を取り $0<\min\{1,\min_Xe^F\}\le\rho_t\le\max\{1,\max_Xe^F\}$ となる。さらに $\rho_t-1=t(e^F-1)$ なので $\|\rho_t-1\|_\infty=t\|e^F-1\|_\infty\le D$。係数は $t$ に依存しない。
<!-- solution-end -->

<a id="ex-yau1-07-a02"></a>

### Level A — YAU1-07-A02：複素形式から実勾配へ
- Level: A

$g_{j\bar k}=\delta_{jk}$ となる一点で、$i\partial v\wedge\bar\partial v\wedge\omega^{n-1}$ を $|\nabla_\omega v|^2\omega^n$ の定数倍で表せ。

<!-- solution-start -->
**詳細解答。** $\omega^n=n!\bigwedge_{j=1}^n(i\,dz^j\wedge d\bar z^j)$。$i\partial v\wedge\bar\partial v$ のうち $\omega^{n-1}$ と非零に積を取るのは $j=k$ 成分だけで、各 $j$ の係数は $(n-1)!|v_j|^2$。従って比は $\sum_j|v_j|^2/n$。実計量 $2\sum_j(dx_j^2+dy_j^2)$ に対する勾配ノルムは $|\nabla v|^2=2\sum_j|v_j|^2$ なので、求める形は $|\nabla v|^2\omega^n/(2n)$ である。
<!-- solution-end -->

<a id="ex-yau1-07-a03"></a>

### Level A — YAU1-07-A03：冪の連鎖律
- Level: A

$q\ge2$、$v\ge1$ とする。$w=v^{q/2}$ の勾配エネルギーと $\int v^{q-2}|\nabla v|^2$ の関係、および $q^2/[2(q-1)]\le q$ を示せ。

<!-- solution-start -->
**詳細解答。** $\nabla w=(q/2)v^{q/2-1}\nabla v$ なので $|\nabla w|^2=(q^2/4)v^{q-2}|\nabla v|^2$。不等式は $q>0$ で割ると $q\le2(q-1)$、すなわち $q\ge2$ と同値である。また $v\ge1$ から $v^{q-1}\le v^q$ となり、[Monge–Ampèreエネルギー評価](#lem-yau1-07-energy)の最後の段を得る。
<!-- solution-end -->

<a id="ex-yau1-07-a04"></a>

### Level A — YAU1-07-A04：指数列と幾何級数
- Level: A

$\beta>1$、$q_j=2\beta^j$ のとき、$\sum_{j\ge0}q_j^{-1}$ と $\sum_{j\ge0}j/q_j$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $r=\beta^{-1}\in(0,1)$ と置くと $\sum r^j=1/(1-r)$、$\sum jr^j=r/(1-r)^2$（有限幾何和を微分してから極限）。従って $\sum 1/q_j=(1/2)\beta/(\beta-1)$、$\sum j/q_j=(1/2)\beta/(\beta-1)^2$。どちらも有限なので $\log(Cq_j)/q_j$ の和も収束する。
<!-- solution-end -->

<a id="ex-yau1-07-a05"></a>

### Level A — YAU1-07-A05：平均を戻して $L^2$ へ
- Level: A

体積 $V$ の連結コンパクト多様体で $\int v=B$、$\|\nabla v\|_2^2\le E$ が分かっているとする。[GA2の平均零での勾配評価](../../GA/GA2/index.md#thm-ga2-poincare)から $\|v\|_2\le C_P\sqrt E+B/\sqrt V$ を導け。

<!-- solution-start -->
**詳細解答。** 平均は $\bar v=B/V$ なので $\|\bar v\|_2=(B/V)\sqrt V=B/\sqrt V$。[Poincaré不等式](../../GA/GA2/index.md#thm-ga2-poincare)に $v-\bar v$ を代入すると $\|v-\bar v\|_2\le C_P\|\nabla v\|_2\le C_P\sqrt E$。$v=(v-\bar v)+\bar v$ の三角不等式で足せばよい。
<!-- solution-end -->

<a id="ex-yau1-07-a06"></a>

### Level A — YAU1-07-A06：トーラスのエネルギー
- Level: A

第2節の $\varphi_a$ に対し $q=2$ の部分積分の等号を、$\int_0^1\cos2\pi x\,dx=0$、$\int_0^1\cos^22\pi x\,dx=\int_0^1\sin^22\pi x\,dx=1/2$ から再確認せよ。

<!-- solution-start -->
**詳細解答。** $v=1+a/\pi^2-(a/\pi^2)\cos2\pi x$ と $\rho-1=-a\cos2\pi x$ を掛け、$d\mu=2dxdy$ で積分すると交差項だけが残って $2(a^2/\pi^2)(1/2)=a^2/\pi^2$。$v_x=(2a/\pi)\sin2\pi x$、実計量は $2(dx^2+dy^2)$ だから $|\nabla v|^2=v_x^2/2$。よって $(1/2)\int|\nabla v|^2d\mu=(1/2)\int(v_x^2/2)2dxdy=(2a^2/\pi^2)(1/2)=a^2/\pi^2$。一致する。
<!-- solution-end -->

<a id="ex-yau1-07-b01"></a>

### Level B — YAU1-07-B01：積分恒等式を一般次元で復元する
- Level: B

$(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクトKähler多様体とする。滑らかな実関数 $v\ge1$ と各点で正値の関数 $\rho$ が

$$
\omega_\varphi=\omega-i\partial\bar\partial v>0,\qquad
\omega_\varphi^n=\rho\,\omega^n
$$

を満たすとする。$T=\sum_{k=0}^{n-1}\omega_\varphi^k\wedge\omega^{n-1-k}$、$q\ge2$ とするとき、$\int_X v^{q-1}(\rho-1)\omega^n$ を、$\partial T=\bar\partial T=0$ を使って勾配形式の積分に直せ。境界なしが必要な箇所を示せ。

<!-- solution-start -->
**詳細解答。** 二つの $n$ 乗の差を因数分解すると

$$
\omega_\varphi^n-\omega^n=-i\partial\bar\partial v\wedge T.
$$

$T$ が閉じているので、積の微分を展開して

$$
\begin{aligned}
\partial(v^{q-1}i\bar\partial v\wedge T)
&=(q-1)v^{q-2}i\partial v\wedge\bar\partial v\wedge T\\
&\quad+v^{q-1}i\partial\bar\partial v\wedge T
\end{aligned}
$$

を得る。左辺で微分される形式 $v^{q-1}i\bar\partial v\wedge T$ は型 $(n-1,n)$ だから、その $\bar\partial$ は次数の理由で零であり、この $\partial$ は外微分 $d$ と一致する。

$X$ は境界がないので、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)によって全微分の積分は零となる。よって

$$
\begin{aligned}
\int_X v^{q-1}(\rho-1)\omega^n
&=-\int_X v^{q-1}i\partial\bar\partial v\wedge T\\
&=(q-1)\int_X v^{q-2}i\partial v\wedge\bar\partial v\wedge T.
\end{aligned}
$$

境界があると、Stokesの境界積分を制御せずに落とせない。
<!-- solution-end -->

<a id="ex-yau1-07-b02"></a>

### Level B — YAU1-07-B02：次元を間違えないSobolev指数
- Level: B

複素次元 $n=1,2,3$ で $\beta$、$2\beta$ と最初の三つの $q_j$ を求め、複素次元1で $H^1\to L^\infty$ を直接使えない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $n=1$ は実次元2なので $\beta=2$、$2\beta=4$、$(q_0,q_1,q_2)=(2,4,8)$。$n=2$ は実次元4で $\beta=2$、$2\beta=4$、同じ指数列。$n=3$ は実次元6で $\beta=3/2$、$2\beta=3$、$(2,3,9/2)$。[GA2の埋め込み定理](../../GA/GA2/index.md#thm-ga2-embedding)は実次元2の $H^1$ について任意の有限 $L^q$ までであり、$L^\infty$ までは主張しない。したがって有限 $L^4$ を繰り返し使う。
<!-- solution-end -->

<a id="ex-yau1-07-b03"></a>

### Level B — YAU1-07-B03：一定でない密度の破綻
- Level: B

前章の平坦トーラスの族 $u_\varepsilon=-VG_\varepsilon(\cdot,q)$ は平均ゼロ・許容性・$L^1$ 一様上界を持つ。一方、$\inf u_\varepsilon\to-\infty$ である。今回の証明のどの定数が固定できないか、具体式から指摘せよ。

<!-- solution-start -->
**詳細解答。** 前章の[Green核集中例](../YAU1-06/index.md#ex-yau1-06-c01)では $\rho_\varepsilon=(1+Vp_\varepsilon)/2$。熱核の対角値 $p_\varepsilon(q,q)\ge1/(4\pi\varepsilon)$ が発散するため、$D_\varepsilon=\|\rho_\varepsilon-1\|_\infty\ge(Vp_\varepsilon(q,q)-1)/2\to\infty$。エネルギー評価の係数 $nD_\varepsilon q$、開始 $L^2$ の $\sqrt{D_\varepsilon B}$、Sobolev増幅の $C=S(1+nD_\varepsilon)$ が一様に選べない。したがって本章の定理と矛盾しない。
<!-- solution-end -->

<a id="ex-yau1-07-b04"></a>

### Level B — YAU1-07-B04：規格化を外すと何が不変か
- Level: B

平均ゼロの解 $\varphi$ と任意の定数 $c$ に対して $\widetilde\varphi=\varphi+c$ と置く。Monge–Ampère方程式、$v=1+\sup\varphi-\varphi$、$\|\widetilde\varphi\|_\infty$ の評価をそれぞれ考察せよ。

<!-- solution-start -->
**詳細解答。** $i\partial\bar\partial c=0$ なので $\omega_{\widetilde\varphi}=\omega_\varphi$ で方程式は変化しない。$\sup\widetilde\varphi=\sup\varphi+c$ より $1+\sup\widetilde\varphi-\widetilde\varphi=1+\sup\varphi-\varphi=v$ も不変である。しかし $\|\widetilde\varphi\|_\infty$ は $|c|\to\infty$ で発散し得る。最後に平均ゼロを指定して $\sup\varphi\le C_0$ とする段階が、ポテンシャルそのものの一様評価に不可欠である。
<!-- solution-end -->

<a id="ex-yau1-07-c01"></a>

### Level C — YAU1-07-C01：定数を最後まで追うMoser反復
- Level: C

体積 $V$ の連結コンパクトKähler多様体で $\int v\le B_*$、$v\ge1$、すべての $q\ge2$ について $\|\nabla(v^{q/2})\|_2^2\le\frac{nDq^2}{2(q-1)}\int v^{q-1}$ とする。Sobolev定数 $S\ge1$、Poincaré定数 $C_P$、指数倍率 $\beta>1$ を使って、$v$ の $L^\infty$ の上界を具体的に示せ。積の対数を省略しないこと。

<!-- solution-start -->
**詳細解答。** まず $q=2$ に元のより強い[エネルギー評価](#lem-yau1-07-energy)を使うと $\|\nabla v\|_2^2\le2nD\int v\le2nDB_*$。[GA2の平均零での勾配評価](../../GA/GA2/index.md#thm-ga2-poincare)から $\|v\|_2\le H:=C_P\sqrt{2nDB_*}+B_*/\sqrt V$。ここで $B_*/\sqrt V$ は $\|\bar v\|_2$ の上界である。次に $w=v^{q/2}$ へ[GA2のSobolev埋め込み](../../GA/GA2/index.md#thm-ga2-embedding)を適用すると

$$
\|v\|_{q\beta}^q\le S(\|\nabla w\|_2^2+\|w\|_2^2)
\le S(1+nDq)\|v\|_q^q
\le Cq\|v\|_q^q,\quad C=S(1+nD).
$$

$q_j=2\beta^j$ で繰り返せば $\|v\|_{q_N}\le H\prod_{j=0}^{N-1}(2C\beta^j)^{1/(2\beta^j)}$。この積の対数は $\frac12\sum_{j<N}\beta^{-j}[\log(2C)+j\log\beta]$ で、幾何級数とその微分から $K=\beta\log(2C)/[2(\beta-1)]+\beta\log\beta/[2(\beta-1)^2]$ 以下。$q_N\to\infty$ の極限で $\|v\|_\infty\le He^K$ を得る。$q_j$ が実数でも、滑らかな正の $v$ の冪は微分可能であり、適用に問題はない。
<!-- solution-end -->

<a id="ex-yau1-07-c02"></a>

### Level C — YAU1-07-C02：開閉論法へ渡せる結論と渡せない結論
- Level: C

$t_k$ が可解で $t_k\to t_*$、$\bar\varphi_{t_k}=0$ とする。前章と本章で証明済みの一様評価を列挙し、その評価だけでは $\omega_{\varphi_{t_k}}>0$ の極限の正値性や $C^2$ コンパクト性を保証できない理由を示せ。

<!-- solution-start -->
**詳細解答。** [Green核の上限・$L^1$ 評価](../YAU1-06/index.md#thm-yau1-06-upper-l1)、[Moser反復による一様C0評価](#thm-yau1-07-moser)、[前章のLaplacian片側下界](../YAU1-06/index.md#prop-yau1-06-laplacian-lower)を順に適用すると、同一の定数 $C_0,M$ を用いて

$$
0\le\sup_X\varphi_{t_k}\le C_0,\qquad
\int_X|\varphi_{t_k}|d\mu\le2VC_0,
$$

$$
\inf_X\varphi_{t_k}\ge-M,\qquad
\|\varphi_{t_k}\|_\infty\le\max\{C_0,M\},\qquad
\Delta_\omega\varphi_{t_k}>-2n
$$

を得る。しかし、これだけでは複素Hessianの固有値に上界がない。複素次元 $n\ge2$ では、例えば正値行列 $\operatorname{diag}(R,R^{-1},1,\ldots,1)$ は行列式 $1$ を保ちながら $R\to\infty$ で最大固有値が発散する。ポテンシャルの値を抑えるだけではその二階微分の一様制御を結論できない。次の二階評価で計量の双側評価を得てからでなければ、極限の一様楕円性と $C^2$ コンパクト性は未証明であり、閉性もまだ示せない。
<!-- solution-end -->

## 7. 次章へ：値の制御から二階微分へ

[一様C0評価](#cor-yau1-07-path-c0)によって、開性で得た解が存在する限り、$t$ に依存しない $\|\varphi_t\|_\infty$ 上界が得られた。次章YAU1-08では $\operatorname{tr}_\omega\omega_\varphi$ のLaplacianを局所正則座標で計算し、曲率項を正確に追う。そこで得る二階微分の情報と本章のC0評価を組み合わせて、YAU1-09で一様楕円性を確保する。
