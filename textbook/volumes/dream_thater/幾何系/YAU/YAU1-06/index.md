# YAU1-06 C0評価I：平均とGreen関数

## 1. 開性から閉性へ進むための最初の一歩

[連続性の方法の開性](../YAU1-05/index.md#thm-yau1-05-openness)では、あるパラメータで解が存在すれば、その近くでも解けると示した。しかし $t_k\to t_*$ で解 $\varphi_{t_k}$ が極端に大きく振れるなら、極限を取れない。まずは**解の値**を制御したい。

本章では $X$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体、$\omega$ を固定したKähler形式とする。$d\mu=\omega^n$、$V=\int_Xd\mu>0$、$\bar u=V^{-1}\int_Xu\,d\mu$ と書く。滑らかな実関数 $F$ は $\int_Xe^F d\mu=V$ を満たし、[前章の体積正規化パス](../YAU1-05/index.md#def-yau1-05-path)を

$$
\rho_t=1-t+te^F,\qquad
\omega_{\varphi_t}^n=\rho_t\omega^n,\qquad 0\le t\le1
$$

とする。存在する滑らかな許容解 $\varphi_t$ は、[平均ゼロ規格化](../YAU1-04/index.md#def-yau1-04-mean-zero)により $\bar\varphi_t=0$ とする。ここでは $t$ の全区間で解が存在するとは仮定しない。**存在する各解に同じ定数が使える評価**を示す。

本章の到達点は $\sup_X\varphi_t$ と $\int_X|\varphi_t|d\mu$ の一様評価であり、$\inf_X\varphi_t$ の一様評価ではない。後者は次章YAU1-07のMoser反復へ渡す問題である。

## 2. Kähler正値性だけでLaplacianの片側が決まる

ここでの実Laplacianは[GA1の符号規約](../../GA/GA1/index.md#thm-ga1-green-first)と一致する $\Delta_\omega=\operatorname{div}_\omega\nabla_\omega$（非正作用素）である。[複素Monge–Ampère作用素の線形化](../YAU1-03/index.md#prop-yau1-03-linearization)では $\Delta_\omega u=2g^{j\bar k}u_{j\bar k}$ を用いた。$L=-\Delta_\omega$ は非負作用素である。

局所正則座標で $\omega=i g_{j\bar k}dz^j\wedge d\bar z^k$ と書く。正値性 $\omega_\varphi>0$ から何が従うのかを、まず行列で確認する。基準計量 $G=(g_{j\bar k})$ の単位直交基底では、$G_\varphi=(g_{j\bar k}+\varphi_{j\bar k})$ の固有値を $\lambda_1,\ldots,\lambda_n>0$ と書ける。[正の$(1,1)$形式の行列判定](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)がこの固有値の正値性を保証する。よって

$$
\operatorname{tr}_{\omega}\omega_\varphi
=\sum_{j,k}g^{j\bar k}(g_{j\bar k}+\varphi_{j\bar k})
=\sum_{j=1}^n\lambda_j>0,
$$

$$
\Delta_\omega\varphi
=2\sum_{j,k}g^{j\bar k}\varphi_{j\bar k}
=2\bigl(\operatorname{tr}_{\omega}\omega_\varphi-n\bigr)>-2n.
$$

<a id="prop-yau1-06-laplacian-lower"></a>

<!-- formal-statement-start -->
> **命題（許容ポテンシャルの一様Laplacian下界）**  
> 上記の $(X,\omega)$ と任意の滑らかな実関数 $\varphi$ について、$\omega+i\partial\bar\partial\varphi>0$ なら

$$
\Delta_\omega\varphi>-2n
$$

> が各点で成り立つ。この定数は $\varphi$、$F$、連続性のパラメータ $t$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

正値な $G^{-1/2}G_\varphi G^{-1/2}$ の跡は正であり、それが $n+\Delta_\omega\varphi/2$ に一致する。

<!-- proof-start -->
### 証明

任意の点で $G$ に関して単位直交な複素基底を選ぶと、$G^{-1/2}G_\varphi G^{-1/2}$ は正値Hermite行列である。その正の固有値の総和は $\operatorname{tr}(G^{-1}G_\varphi)>0$。一方

$$
\operatorname{tr}(G^{-1}G_\varphi)
=\operatorname{tr}(I_n+G^{-1}(\varphi_{j\bar k}))
=n+\frac12\Delta_\omega\varphi.
$$

従って $\Delta_\omega\varphi>-2n$。座標選択に依存する行列表示から出発したが、最後の跡とLaplacianは不変量なので全点で同じ結論となる。$\square$
<!-- proof-end -->

**直接例。** 平坦楕円曲線 $T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$\varphi_a=a\cos(2\pi x)/\pi^2$（$|a|<1$）について、[前章で計算した混合二階微分](../YAU1-05/index.md#def-yau1-05-path)は $\varphi_{z\bar z}=-a\cos(2\pi x)$。従って

$$
\omega_{\varphi_a}=(1-a\cos2\pi x)\omega_0>0,
\qquad \Delta_{\omega_0}\varphi_a=-2a\cos2\pi x>-2.
$$

ただし、$\Delta\varphi>-2n$ は**下側だけ**の評価であって $\varphi$ 自身の下限ではない。負の深い谷を除外するには別の情報が要る。

## 3. 熱核から平均ゼロGreen核を作る

平均ゼロの関数 $u$ は $Lu$ から復元できるはずだ。[GA3のPoisson存在一意性](../../GA/GA3/index.md#thm-ga3-poisson-existence)がこの考えを保証する。しかし $Lu\le2n$ のように上からしか抑えていない不等式を $u$ の評価へ移すには、復元する積分核の符号を知りたい。

[GA5の熱核](../../GA/GA5/index.md#def-ga5-heat-kernel)を $p_s(x,y)$ と書く。これは実Laplacian $\Delta_\omega$ に関する核で、体積 $dV_\omega=\omega^n/n!$ に対して定義されたものなので、ここでは $d\mu=n!dV_\omega$ に対する核として $p_s$ を $1/n!$ 倍して読み替える。こうすると

$$
T_s f(x)=\int_Xp_s(x,y)f(y)\,d\mu(y),\qquad
\int_Xp_s(x,y)\,d\mu(y)=1.
$$

以下ではこの**$d\mu$用の核**に記号 $p_s$ を用いる。[熱核の正値性・質量保存](../../GA/GA5/index.md#thm-ga5-positivity-mass)と[長時間均一化](../../GA/GA5/index.md#thm-ga5-longtime)により、$p_s\ge0$、$p_s\to1/V$ が一様に成り立つ。

小さい時間の熱核は対角付近で大きくなる。そこで $s=0$ をいきなり代入せず、$\varepsilon>0$ で切ってから極限を取る。

<a id="def-yau1-06-green-kernel"></a>

<!-- formal-statement-start -->
> **定義（平均ゼロGreen核）**  
> 上記のコンパクト連結Kähler多様体の $L=-\Delta_\omega$ と、$d\mu$ に関する熱核 $p_s$ に対し、$\varepsilon>0$ で

$$
G_\varepsilon(x,y)=\int_\varepsilon^\infty
\left(p_s(x,y)-\frac1V\right)ds
$$

> と置く。$\varepsilon\downarrow0$ で $G_\varepsilon(x,\cdot)$ が $L^1(X,d\mu)$ 収束した極限 $G(x,\cdot)$ を、平均ゼロGreen核という。核の値は $d\mu$ に関してほとんど至る所で解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-06-green-kernel -->
**定義の確認（平坦楕円曲線の一つの固有モード）。** 上の $T$ は $V=2$、$\Delta_{\omega_0}=\tfrac12(\partial_x^2+\partial_y^2)$ である。$f(x,y)=\cos2\pi x$ は $\bar f=0$ で、$Lf=2\pi^2f$。固有関数による[GA5の熱半群](../../GA/GA5/index.md#def-ga5-heat-semigroup)から $T_sf=e^{-2\pi^2s}f$ となる。したがって

$$
\int_TG_\varepsilon(x,y)Lf(y)\,d\mu(y)
=\int_\varepsilon^\infty2\pi^2e^{-2\pi^2s}f(x)\,ds
=e^{-2\pi^2\varepsilon}f(x).
$$

極限は $f(x)$ で、平均ゼロの関数を復元するという定義の狙いを直接検算できた。定数関数では $L1=0$ であり、復元されるのは $1-\bar1=0$ である。
<!-- definition-example-end -->

<a id="lem-yau1-06-green-properties"></a>

<!-- formal-statement-start -->
> **補題（Green核の構成・下界・再現公式）**  
> 上記の $X,\omega,d\mu,V$ に対し、$G(x,\cdot)$ は各 $x\in X$ で $L^1(d\mu)$ の元として存在する。$X,\omega$ だけで決まる有限定数 $A>0$ を選べて、各 $x$ についてほとんどすべての $y$ で

$$
G(x,y)\ge-A,\qquad
\int_XG(x,y)\,d\mu(y)=0.
$$

> さらに任意の滑らかな実関数 $u$ に対し

$$
u(x)-\bar u
=\int_XG(x,y)(Lu)(y)\,d\mu(y)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$0<s<1$ の部分は熱核の非負性と全質量1で積分可能性を示す。$s\ge1$ ではスペクトルギャップが一様収束と下界を与える。再現公式は $T_su$ を時間微分して積分する。

<!-- proof-start -->
### 証明

**長時間の制御。** [GA5の長時間評価](../../GA/GA5/index.md#thm-ga5-longtime)を $d\mu$ 用に定数変更すると、ある $C_H<\infty$ と $\lambda_1>0$ が存在して

$$
\sup_{x,y}\left|p_s(x,y)-\frac1V\right|
\le C_He^{-\lambda_1(s-1)}\qquad(s\ge1).
$$

従って $\int_1^\infty(p_s-1/V)ds$ は二変数について絶対一様収束し、絶対値は $C_H/\lambda_1$ 以下である。

**短時間の $L^1$ 収束。** $0<\delta<\varepsilon\le1$ と $x$ を固定する。熱核は非負で質量1だから、三角不等式とTonelliの定理で

$$
\begin{aligned}
\|G_\delta(x,\cdot)-G_\varepsilon(x,\cdot)\|_{L^1(d\mu)}
&\le\int_\delta^\varepsilon\int_X
\left(p_s(x,y)+\frac1V\right)d\mu(y)\,ds\\
&=2(\varepsilon-\delta).
\end{aligned}
$$

よって $G_\varepsilon(x,\cdot)$ は $L^1$ でCauchy列となり、極限 $G$ が存在する。[GA5の質量保存](../../GA/GA5/index.md#thm-ga5-positivity-mass)より各 $\varepsilon$ で $\int G_\varepsilon d\mu=0$（先に有限区間で積分し、長時間の一様収束で極限を取る）。$L^1$ 極限で $\int Gd\mu=0$ を得る。

**片側下界。** $0<\varepsilon\le1$ として積分を $[\varepsilon,1]$ と $[1,\infty)$ に分ける。前半は $p_s\ge0$ により $-(1-\varepsilon)/V$ 以上、後半は $-C_H/\lambda_1$ 以上なので

$$
G_\varepsilon(x,y)\ge-\frac1V-\frac{C_H}{\lambda_1}.
$$

従って $A=1/V+C_H/\lambda_1$（必要なら大きくする）を選べる。$L^1$ 収束する列からほとんど至る所収束する部分列を選べば、極限でも $G\ge-A$ が残る。

**再現公式。** $u$ は滑らかで、$Lu$ の積分は[Greenの第一公式](../../GA/GA1/index.md#thm-ga1-green-first)により零である。[GA5の熱方程式と半群](../../GA/GA5/index.md#thm-ga5-heat-solution)により $\partial_sT_su=-T_sLu$ なので、$R>\varepsilon$ について

$$
\int_\varepsilon^RT_sLu(x)\,ds
=T_\varepsilon u(x)-T_Ru(x).
$$

左辺の $T_sLu$ は $\int_X(p_s-1/V)Lu\,d\mu$ に等しい。$R\to\infty$ で $T_Ru\to\bar u$、$\varepsilon\downarrow0$ で $T_\varepsilon u\to u$ が成立する。[熱半群の強連続性](../../GA/GA5/index.md#thm-ga5-semigroup)と滑らかな $u$ の場合の点ごとの収束を用いれば、左辺は $G$ の $L^1$ 収束および $Lu\in L^\infty$ から $\int G Lu$ へ収束する。結論が得られた。$\square$
<!-- proof-end -->

**注意：** $G$ 自身は全点で非負とは限らない。必要なのは $G+A\ge0$ である。この**定数シフト**は、$\int_XLu\,d\mu=0$ なので再現公式を変えない。

## 4. 平均ゼロから上限と $L^1$ まで

<a id="thm-yau1-06-upper-l1"></a>

<!-- formal-statement-start -->
> **定理（許容Kählerポテンシャルの上限・L1評価）**  
> $(X,\omega)$ を本章のコンパクト連結Kähler多様体とし、$A$ を[Green核補題](#lem-yau1-06-green-properties)の定数とする。任意の滑らかな許容ポテンシャル $\varphi$ について

$$
\sup_X(\varphi-\bar\varphi)\le2nAV.
$$

> 特に $\bar\varphi=0$ の場合は、$C_0=2nAV$ として

$$
0\le\sup_X\varphi\le C_0,
\qquad
\int_X|\varphi|\,d\mu\le2VC_0.
$$

> これらの定数は基準計量 $(X,\omega)$ のみで決まり、右辺密度・解・パラメータに依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[正値性からの $L\varphi<2n$](#prop-yau1-06-laplacian-lower)を、非負核 $G+A$ と積分する。平均ゼロなら正部分と負部分の積分が等しいので $L^1$ を制御できる。

<!-- proof-start -->
### 証明

[Green核の再現公式](#lem-yau1-06-green-properties)と $\int_XL\varphi\,d\mu=0$ により、各 $x$ で

$$
\varphi(x)-\bar\varphi
=\int_X(G(x,y)+A)L\varphi(y)\,d\mu(y).
$$

$G+A\ge0$ であり、[Laplacian下界](#prop-yau1-06-laplacian-lower)から $L\varphi=-\Delta_\omega\varphi<2n$。負の被積分部分があっても上から比較でき、

$$
\begin{aligned}
\varphi(x)-\bar\varphi
&\le2n\int_X(G(x,y)+A)d\mu(y)\\
&=2n\left(\int_XG(x,y)d\mu(y)+AV\right)
=2nAV=C_0.
\end{aligned}
$$

平均ゼロなら $\sup\varphi\ge\bar\varphi=0$ でもある。$\varphi_+=\max\{\varphi,0\}$、$\varphi_-=\max\{-\varphi,0\}$ とすると、$\int\varphi=0$ から

$$
\int_X\varphi_+d\mu=\int_X\varphi_-d\mu,
\qquad
\int_X\varphi_+d\mu\le V\sup_X\varphi\le VC_0.
$$

従って $\int|\varphi|=\int(\varphi_++\varphi_-)=2\int\varphi_+\le2VC_0$。$\square$
<!-- proof-end -->

<a id="cor-yau1-06-sup-gauge"></a>

<!-- formal-statement-start -->
> **系（上限ゼロ規格化との橋渡し）**  
> 上の定理の平均ゼロ許容 $\varphi$ に対し $m=\sup_X\varphi$、$\psi=\varphi-m$ と置くと

$$
\sup_X\psi=0,\quad \psi\le0,\quad
0\le m\le C_0,\quad
\int_X(-\psi)\,d\mu=Vm\le VC_0.
$$

> また $\omega_\psi=\omega_\varphi$ であり、Monge–Ampère方程式の右辺は変わらない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\psi=\varphi-m$ なので $\sup\psi=0$、全点で $\psi\le0$。平均ゼロから

$$
\int_X(-\psi)d\mu
=\int_X(m-\varphi)d\mu=mV-0=mV.
$$

$0\le m\le C_0$ は[上限定理](#thm-yau1-06-upper-l1)。定数の $i\partial\bar\partial$ は零だから $\omega_\psi=\omega_\varphi$。[正規化代表の命題](../YAU1-04/index.md#prop-yau1-04-normalized)とも一致する。$\square$
<!-- proof-end -->

**何が残ったか。** $\psi\le0$ と $\int(-\psi)\le VC_0$ は、$-\psi$ の**平均的な大きさ**の制約である。点ごとの最大値 $\sup(-\psi)$ はまだ評価していない。次章では、[GA2のSobolev不等式](../../GA/GA2/index.md#thm-ga2-embedding)と方程式の両辺を結ぶエネルギー評価から指数を上げ、$L^1$ を $L^\infty$ へ引き上げる。

## 5. 対照例：正値性だけでは深い谷を除けない

上限評価が強力でも、上下を入れ替えて同じ証明を使うことはできない。$L\varphi<2n$ しか分かっておらず、$L\varphi$ の一様**下界**はないからである。

実際、複素一次元の平坦トーラスでは、滑らかな許容ポテンシャル $u_\varepsilon$ を平均ゼロに保ちつつ $\inf u_\varepsilon\to-\infty$ とできる。上の[切断Green核](#def-yau1-06-green-kernel)を用い、任意の $q\in T$ に対し $V=2$ として

$$
u_\varepsilon(x)=-V G_\varepsilon(x,q)
$$

と置く。この関数は $\varepsilon>0$ で滑らかかつ平均ゼロである。[熱核の方程式](../../GA/GA5/index.md#thm-ga5-kernel)を時間積分すると

$$
L G_\varepsilon(x,q)
=p_\varepsilon(x,q)-1/V,
\qquad
\Delta u_\varepsilon=V p_\varepsilon(x,q)-1\ge-1.
$$

複素一次元では $\omega_u/\omega_0=1+\Delta u/2$ なので、$\omega_{u_\varepsilon}\ge\omega_0/2>0$ である。それでも[平坦トーラスの周期化Gaussian熱核](../../GA/GA5/index.md#thm-ga5-torus-gaussian)を対角 $q=q$ で用いると、大きいピークを作れる。

実際、座標を $\theta=2\pi(x,y)$ と拡大すると、標準 $2\pi$ 周期トーラスのLaplacian $\Delta_{\theta}$ に対して

$$
\Delta_{\omega_0}=2\pi^2\Delta_\theta,\qquad
\tau=2\pi^2s,\qquad
d\mu=\frac{d\theta_1d\theta_2}{2\pi^2}
$$

となる。時間 $\tau$ の標準熱核を $p^{\mathrm{std}}_\tau$ と書けば、密度の体積変換から $p_s=2\pi^2p^{\mathrm{std}}_\tau$ である。周期化Gaussianの原点項は

$$
p_s(q,q)\ge\frac{2\pi^2}{4\pi\tau}
=\frac1{4\pi s}
$$

を与える。従って

$$
G_\varepsilon(q,q)
\ge\int_\varepsilon^1\left(\frac1{4\pi s}-\frac12\right)ds
-\frac{C_H}{\lambda_1}
=\frac1{4\pi}\log\frac1\varepsilon-O(1),
$$

ゆえに $u_\varepsilon(q)\to-\infty$。この例では $\omega_{u_\varepsilon}/\omega_0=\tfrac12+Vp_\varepsilon/2$ の最大値が発散する。**一つの固定された滑らかな $F$ のパス上の反例ではない**。右辺密度 $\rho_t\le\max\{1,e^F\}$ の一様上界を使う次章の議論と矛盾しない。

## 6. 演習：核の符号と平均の操作を自分で再計算する

<a id="ex-yau1-06-a01"></a>

### Level A — YAU1-06-A01：跡からLaplacianへ
- Level: A

複素次元 $2$ の点で $G=I_2$、$G_\varphi=\operatorname{diag}(1/2,3)$ とする。$\Delta_\omega\varphi$ を求め、一般の下界 $-2n$ と比較せよ。

<!-- solution-start -->
**詳細解答。** $\operatorname{tr}(G^{-1}G_\varphi)=1/2+3=7/2$。$n=2$ なので

$$
\Delta_\omega\varphi=2\left(\frac72-2\right)=3>-4=-2n.
$$

二つの固有値が正なので $G_\varphi>0$。これが跡の正値性に必要な仮定である。
<!-- solution-end -->

<a id="ex-yau1-06-a02"></a>

### Level A — YAU1-06-A02：正負部分の積分
- Level: A

$V<\infty$、$\bar u=0$、$\sup u\le M$ の実関数について $\int|u|d\mu\le2VM$ を証明せよ。

<!-- solution-start -->
**詳細解答。** $u=u_+-u_-$、$|u|=u_++u_-$ と分解する。平均ゼロから $\int u_+=\int u_-$。また $0\le u_+\le\sup u\le M$ なので $\int u_+\le VM$。よって $\int|u|=2\int u_+\le2VM$。平均ゼロから $M\ge0$ も従う。
<!-- solution-end -->

<a id="ex-yau1-06-a03"></a>

### Level A — YAU1-06-A03：核の定数をずらす
- Level: A

$\int_XG(x,y)d\mu(y)=0$、$G\ge-A$、$\int_Xf\,d\mu=0$ とする。$\int(G+A)f=\int Gf$ と $\int(G+A)d\mu=AV$ を示せ。

<!-- solution-start -->
**詳細解答。** 積分の線形性から

$$
\int_X(G+A)f\,d\mu
=\int_XGf\,d\mu+A\int_Xf\,d\mu
=\int_XGf\,d\mu.
$$

同じく $\int(G+A)d\mu=\int Gd\mu+A\int1d\mu=0+AV$。$G+A\ge0$ は次の上からの比較を可能にする。
<!-- solution-end -->

<a id="ex-yau1-06-a04"></a>

### Level A — YAU1-06-A04：平坦トーラスの固有モード
- Level: A

$T,\omega_0$ を第2節の平坦楕円曲線とする。$f=\cos2\pi x$ について $Lf$ と $T_sf$ を求め、$\int_0^\infty T_sLf\,ds=f$ を直接積分して確かめよ。

<!-- solution-start -->
**詳細解答。** $\Delta_{\omega_0}=\tfrac12(\partial_x^2+\partial_y^2)$ なので $\Delta f=-2\pi^2f$、$Lf=2\pi^2f$。[GA5の熱半群の定義](../../GA/GA5/index.md#def-ga5-heat-semigroup)に固有値 $2\pi^2$ を代入すると $T_sf=e^{-2\pi^2s}f$。従って

$$
\int_0^\infty T_sLf\,ds
=2\pi^2f\int_0^\infty e^{-2\pi^2s}ds
=2\pi^2f\frac1{2\pi^2}=f.
$$

$\bar f=0$ なので再現公式の右辺と一致する。
<!-- solution-end -->

<a id="ex-yau1-06-a05"></a>

### Level A — YAU1-06-A05：二つの正規化
- Level: A

$\varphi_a=a\cos2\pi x/\pi^2$（$0<a<1$）について平均ゼロ・上限ゼロの代表と、後者の $\int(-\psi)\omega_0$ を求めよ。

<!-- solution-start -->
**詳細解答。** 周期積分 $\int_0^1\cos2\pi x\,dx=0$ により $\bar\varphi_a=0$。最大値は $m=a/\pi^2$ なので $\psi=\varphi_a-a/\pi^2=(a/\pi^2)(\cos2\pi x-1)$。$\omega_0=2dxdy$ と $V=2$ に注意して

$$
\int_T(-\psi)\omega_0
=\frac{2a}{\pi^2}\int_0^1(1-\cos2\pi x)dx
=\frac{2a}{\pi^2}=Vm.
$$

定数変更なので $\omega_\psi=\omega_{\varphi_a}$ である。
<!-- solution-end -->

<a id="ex-yau1-06-b01"></a>

### Level B — YAU1-06-B01：Green核の短時間収束
- Level: B

コンパクト連結多様体の非負熱核 $p_s$ が $\int p_s(x,y)d\mu(y)=1$ を満たすとする。$0<\delta<\varepsilon\le1$ で、$G_\varepsilon-G_\delta$ の $L^1(d\mu)$ ノルムを $2(\varepsilon-\delta)$ 以下に抑えよ。これだけで長時間部分の積分が有限だと主張できるか。

<!-- solution-start -->
**詳細解答。** 定義から $G_\delta-G_\varepsilon=\int_\delta^\varepsilon(p_s-1/V)ds$。三角不等式とTonelliを順に用いると

$$
\|G_\delta-G_\varepsilon\|_1
\le\int_\delta^\varepsilon\int_X|p_s-1/V|d\mu\,ds
\le\int_\delta^\varepsilon(1+1)ds=2(\varepsilon-\delta).
$$

これは $s\downarrow0$ 側だけのCauchy性である。$s\to\infty$ 側は[GA5のスペクトルギャップによる一様減衰](../../GA/GA5/index.md#thm-ga5-longtime)から $\int_1^\infty Ce^{-\lambda_1(s-1)}ds=C/\lambda_1<\infty$ と別に示す必要がある。
<!-- solution-end -->

<a id="ex-yau1-06-b02"></a>

### Level B — YAU1-06-B02：平均を指定しない解の評価
- Level: B

滑らかな許容 $\varphi$ の平均を $b$ とする。Green核再現公式と $\Delta\varphi>-2n$ から $\sup_X\varphi\le b+C_0$ を導き、$\int_X|\varphi-b|d\mu\le2VC_0$ も証明せよ。

<!-- solution-start -->
**詳細解答。** $w=\varphi-b$ と置けば $\bar w=0$、$\omega_w=\omega_\varphi>0$、$Lw=L\varphi<2n$。再現公式で

$$
w(x)=\int_X(G+A)Lw\,d\mu
\le2n\int_X(G+A)d\mu=2nAV=C_0.
$$

従って $\sup\varphi=b+\sup w\le b+C_0$。さらに $w_+,w_-$ の積分が一致し、$w_+\le C_0$ から $\int|\varphi-b|=\int|w|=2\int w_+\le2VC_0$。
<!-- solution-end -->

<a id="ex-yau1-06-b03"></a>

### Level B — YAU1-06-B03：開性からの解列に定数をそろえる
- Level: B

$t_k$ に可解な $\omega_{\varphi_k}^n=\rho_{t_k}\omega^n$ があり、$\bar\varphi_k=0$ とする。$k$ に依存しない $\sup\varphi_k$、$\int|\varphi_k|$、$\int(-\psi_k)$ の評価を求めよ。ただし $\psi_k=\varphi_k-\sup\varphi_k$ とする。

<!-- solution-start -->
**詳細解答。** $X,\omega$ は全 $k$ で同じで、各 $\omega_{\varphi_k}>0$ である。従って[上限・$L^1$定理](#thm-yau1-06-upper-l1)は同じ $A,V,n$ を使い、

$$
0\le\sup\varphi_k\le C_0,
\quad\int|\varphi_k|d\mu\le2VC_0.
$$

$m_k=\sup\varphi_k$ とおけば $\bar\varphi_k=0$ から $\int(-\psi_k)d\mu=Vm_k\le VC_0$。$\rho_{t_k}$ を各 $k$ で別途評価する必要はない。ただし $\inf\varphi_k$ に関する結論はまだない。
<!-- solution-end -->

<a id="ex-yau1-06-b04"></a>

### Level B — YAU1-06-B04：連結性が外れると何が壊れるか
- Level: B

$X=X_1\sqcup X_2$ を二つの連結なコンパクト成分の非交和とし、$u$ は $X_1$ で $1$、$X_2$ で $-V_1/V_2$（$V_i=\int_{X_i}d\mu$）とする。$Lu$、$\bar u$ を計算し、単一の全体平均を使うGreen再現公式が成立しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $u$ は各成分で定数なので各成分の微分は零、$Lu=0$。全体平均は

$$
\bar u=\frac{V_1\cdot1+V_2(-V_1/V_2)}{V_1+V_2}=0.
$$

もし $u-\bar u=\int G Lu$ がこの $u$ に成立すると、左辺は非零、右辺は零で矛盾する。非連結なら零固有値の核は各成分の定数からなり、[GA5の長時間均一化](../../GA/GA5/index.md#thm-ga5-longtime)の全体定数 $1/V$ への収束が崩れる。正しい核は成分ごとの平均を除く。
<!-- solution-end -->

<a id="ex-yau1-06-c01"></a>

### Level C — YAU1-06-C01：深い谷を持つ正値Kählerポテンシャル
- Level: C

平坦楕円曲線 $(T,\omega_0)$ と $q\in T$ を固定し、$G_\varepsilon$ を本章の切断Green核、$u_\varepsilon=-VG_\varepsilon(\cdot,q)$ とする。$u_\varepsilon$ の滑らかさ、平均ゼロ、$\omega_{u_\varepsilon}>0$ を証明し、[GA5の周期化Gaussian](../../GA/GA5/index.md#thm-ga5-torus-gaussian)から $u_\varepsilon(q)\to-\infty$ を示せ。これが固定右辺 $F$ の連続性のパスへの反例にならない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $\varepsilon>0$ では[熱核の滑らかさと時間減衰](../../GA/GA5/index.md#thm-ga5-kernel)により $G_\varepsilon$ は滑らかである。質量保存・対称性から $\int_TG_\varepsilon(x,q)\,d\mu(x)=0$、したがって $\bar u_\varepsilon=0$。$\partial_sp_s=\Delta_xp_s$ と長時間の一様極限を使うと

$$
LG_\varepsilon
=-\int_\varepsilon^\infty\Delta_xp_s\,ds
=-\int_\varepsilon^\infty\partial_sp_s\,ds
=p_\varepsilon-\frac1V.
$$

従って $\Delta u_\varepsilon=Vp_\varepsilon-1\ge-1$。複素次元1の局所係数で

$$
\frac{\omega_{u_\varepsilon}}{\omega_0}
=1+\frac12\Delta u_\varepsilon
=\frac{1+Vp_\varepsilon}{2}\ge\frac12>0.
$$

平坦トーラスでは $\Delta_{\omega_0}=\tfrac12\Delta_{\mathbb R^2}$、$d\mu=2dxdy$。標準 $2\pi$ 周期の座標 $\theta=2\pi(x,y)$ に替えると $\Delta_{\omega_0}=2\pi^2\Delta_\theta$、$d\mu=(2\pi^2)^{-1}d\theta_1d\theta_2$ である。従って時間 $\tau=2\pi^2s$ における標準熱核 $p^{\mathrm{std}}_\tau$ は、$d\mu$ 用に $p_s=2\pi^2p^{\mathrm{std}}_\tau$ と変換する。[周期化Gaussian](../../GA/GA5/index.md#thm-ga5-torus-gaussian)の原点項は $p_s(q,q)\ge2\pi^2/(4\pi\tau)=(4\pi s)^{-1}$ を与える。長時間部分は $\left|\int_1^\infty(p_s(q,q)-1/V)ds\right|\le C_H/\lambda_1$。ゆえに

$$
G_\varepsilon(q,q)
\ge\frac1{4\pi}\log\frac1\varepsilon-\frac12-\frac{C_H}{\lambda_1}
\longrightarrow+\infty,
$$

したがって $u_\varepsilon(q)=-VG_\varepsilon(q,q)\to-\infty$。他方この族の密度は $\omega_{u_\varepsilon}/\omega_0=(1+Vp_\varepsilon)/2$ で、$\varepsilon\downarrow0$ に従い最大値が発散する。一つの固定した滑らかな $F$ に対する $\rho_t\le\max\{1,e^F\}$ という一様密度上界を満たす族ではない。$C^0$ 下限のために右辺方程式の情報が必要であることを確認した。
<!-- solution-end -->

## 7. 次章への引き渡し

- 正値性 $\omega_{\varphi_t}>0$ は $\Delta_\omega\varphi_t>-2n$ を与える。
- [平均ゼロGreen核](#def-yau1-06-green-kernel)は $G\ge-A$ かつ平均零であり、[再現公式](#lem-yau1-06-green-properties)から $\sup\varphi_t\le C_0$ を導く。
- [上限ゼロ規格化](#cor-yau1-06-sup-gauge)した $\psi_t\le0$ には $\int_X(-\psi_t)d\mu\le VC_0$ がある。
- まだ $\sup_X(-\psi_t)$ を抑えていない。次章では、**固定した** $F$ に対して $\rho_t$ の正の上下界が $t$ に依存せずに存在することと、複素Monge–Ampère方程式の積分恒等式を合わせ、Moser反復の各段階を追う。
