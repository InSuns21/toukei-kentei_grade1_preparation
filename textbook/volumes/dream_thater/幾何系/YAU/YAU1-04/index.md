# YAU1-04 一意性と正規化

## 1. 体積方程式の解が二つ見つかったら

前章では、境界のないコンパクト連結Kähler多様体 $X$（複素次元 $n\ge1$）と基準Kähler形式 $\omega$ に対して、未知の滑らかな実関数 $\varphi$ を[正値領域 $\mathcal H_\omega$](../YAU1-03/index.md#def-yau1-03-positive-domain)に制限した。体積方程式は、与えられた滑らかな実関数 $F$ に対する

$$
\omega_\varphi^n=e^F\omega^n,\qquad
\omega_\varphi=\omega+i\partial\bar\partial\varphi>0
$$

である。[対数Monge–Ampère作用素](../YAU1-03/index.md#def-yau1-03-log-ma)を使えば $\mathcal M_\omega(\varphi)=F$ と書ける。

たとえば平坦楕円曲線 $T=\mathbb C/(\mathbb Z+i\mathbb Z)$ で、$\omega_0=i\,dz\wedge d\bar z$ に対し $\varphi=0$ と $\psi=7$ はともに $F=0$ の解である。定数には $\partial\bar\partial7=0$ だから、二つのポテンシャルは同じ計量を表す。**計量が一意**という主張と**関数そのものが一意**という主張は違う。

前章の[正値領域の凸性](../YAU1-03/index.md#prop-yau1-03-domain)により、二つの候補 $\varphi_0,\varphi_1$ を結ぶ線分も常に正値領域に入る。この線分上で対数行列式を微分し、差を積分すれば、非線形方程式の二解の差 $u=\varphi_1-\varphi_0$ が、正の係数を持つ**線形**二階方程式を満たすと分かる。ここに最大値原理が働く。

ただし、体積の整合条件

$$
\int_Xe^F\omega^n=\int_X\omega^n
$$

は[前章の必要条件](../YAU1-03/index.md#prop-yau1-03-compatibility)であり、まだ一般的な解の存在を意味しない。これから証明するのは、**もし二解があれば**その差は定数しかない、という主張である。

## 2. 対数行列式の差を線形方程式へ変える

$\varphi_0,\varphi_1\in\mathcal H_\omega$ と仮定し、$u=\varphi_1-\varphi_0$ および実パラメータ $0\le t\le1$ に対して

$$
\varphi_t=\varphi_0+tu,\qquad
\omega_t=\omega_{\varphi_t}=(1-t)\omega_{\varphi_0}+t\omega_{\varphi_1}
$$

と置く。各 $\omega_t$ は正値である。局所正則座標で $\omega_t=i(g_t)_{j\bar k}\,dz^j\wedge d\bar z^k$ と表し、正値Hermite行列 $G_t=((g_t)_{j\bar k})$ の逆行列成分を $g_t^{j\bar k}$ と書く。添字 $j,\bar k$ は複素方向の混合二階微分を指定するもので、$u_{j\bar k}=\partial_j\partial_{\bar k}u$ である。

[Jacobiの行列式微分公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)を $G_t=G_0+tU$（$U=(u_{j\bar k})$）へ適用する。$G_t$ は $0\le t\le1$ で可逆なので

$$
\frac{d}{dt}\log\det G_t
=\operatorname{tr}(G_t^{-1}U)
=\sum_{j,k}g_t^{j\bar k}u_{j\bar k}.
$$

$G_t$ は滑らかに $t$ に依存し、有限閉区間上で正値だから、各点で微積分の基本定理を使える。そこで逆行列成分の**線分平均**

$$
a^{j\bar k}(x):=\int_0^1g_t^{j\bar k}(x)\,dt
$$

を取ると、行列式の差は

$$
\log\frac{\det G_1}{\det G_0}
=\int_0^1\sum_{j,k}g_t^{j\bar k}u_{j\bar k}\,dt
=\sum_{j,k}a^{j\bar k}u_{j\bar k}.
$$

ここで $u$ は $t$ に依存しないので、積分の外へ出してよい。[前章の線形化公式](../YAU1-03/index.md#prop-yau1-03-linearization)を線分全体で積分した形でもある。

各 $G_t^{-1}$ は正値Hermite行列なので、任意の非零ベクトル $\xi\in\mathbb C^n$ に対して

$$
\sum_{j,k}a^{j\bar k}\xi_j\overline{\xi_k}
=\int_0^1\sum_{j,k}g_t^{j\bar k}\xi_j\overline{\xi_k}\,dt>0.
$$

この式により、係数行列 $A=(a^{j\bar k})$ の正値性が元のKähler形式の正値性から従うことが分かる。$x,t$ のコンパクトな領域上で $G_t$ の固有値は正の下限と有限の上限を持つため、$A$ も局所座標を固定した閉小領域で一様に正値である。これは許容集合全体に共通の定数という意味ではない。

二つの解が同じ右辺 $F$ を持つとき、

$$
\frac{\omega_{\varphi_1}^n}{\omega^n}
=e^F
=\frac{\omega_{\varphi_0}^n}{\omega^n},
\qquad
Lu:=\sum_{j,k}a^{j\bar k}u_{j\bar k}=0.
$$

左辺の $L$ は各座標で定義される二階作用素の表示であり、係数と混合Hessianの縮約は正則座標の取り替えで不変である。$A$ は与えられた二解から作る係数なので、ここで $u$ を未知とする場合は係数がすでに定まった線形二階方程式として扱える。

## 3. 正の二階係数に対する最大値原理を証明する

実二階微分が小近傍で最小値を取る点で非負になるのと同じく、実 $C^2$ 関数 $v$ がそこで最小値を取ると、複素Hessian $(v_{j\bar k})$ も半正値である。実変数での二方向微分を複素ベクトルに対応させれば確認でき、正係数 $A$ との縮約は $Lv\ge0$ となる。

しかしこれだけでは「零の最大点で二階微分が零」と分かるにすぎず、関数全体が定数とは結論できない。**強**最大値原理には、正の部分から零点へ近付くときの傾きを比較する障壁が必要になる。[GA3の強最大値原理](../../GA/GA3/index.md#thm-ga3-strong-maximum)はRiemann計量のLaplacianについて証明されている。ここでは $A$ が必ずしもKähler計量の逆行列とは限らないため、正係数の一般形で計算し直す。

<a id="lem-yau1-04-strong-maximum"></a>

<!-- formal-statement-start -->
> **補題（正係数複素二階作用素の強最大値原理）**
>
> $D$ を複素多様体の連結開集合とし、局所正則座標で

$$
Lv=\sum_{j,k=1}^na^{j\bar k}(x)\,
\frac{\partial^2v}{\partial z^j\partial\bar z^k}
$$

> と書ける実関数上の二階作用素 $L$ を考える。係数 $A=(a^{j\bar k})$ は連続な正値Hermite行列であり、表示は正則座標の取り替えで整合するとする。$v\in C^2(D;\mathbb R)$ が $Lv=0$ を満たし、ある $p\in D$ で有限の最大値 $\sup_Dv=v(p)$ を取れば、$v$ は $D$ 全体で定数である。最小値についても同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最大値 $M$ との差 $h=M-v\ge0$ を考える。$h$ の零点集合と正の部分の境目に接する小球を置き、その球の環状部分で $w=e^{-\alpha r^2}-e^{-\alpha R^2}$ を作る。$Lw>0$ を行列の固有値評価から直接確かめ、$h\ge\varepsilon w$ を弱い最小値比較で導くと、零点で勾配が零であることに矛盾する。

<!-- proof-start -->
### 証明

$M=\sup_Dv$、$h=M-v$ とおく。$h\ge0$、$Lh=0$ で、零点が存在する。$Z=\{x:h(x)=0\}$ は $D$ で閉じている。$Z\ne D$ と仮定すると、連結性から $D$ 内に $Z$ と $\{h>0\}$ の境界点がある。

その点の小さな正則座標球内で $h(q)>0$ となる点 $q$ を零点集合に十分近く選ぶ。通常のユークリッド距離による $R=\operatorname{dist}(q,Z)>0$ を取り、閉球 $\overline B_R(q)$ がこの座標近傍内に収まるようにする。閉球の内側では $h>0$、球面上には $h(z_0)=0$ となる点 $z_0$ がある。さらに閉環状領域

$$
\overline{\mathcal A}
=\{z:R/2\le |z-q|\le R\}
$$

において、正値行列 $A(z)$ の最小固有値の正の下限を $\lambda>0$、最大固有値の上限を $\Lambda<\infty$ とする（係数の連続性と閉環状領域のコンパクト性）。

$r^2=\sum_j|z^j-q^j|^2$ とおき、$w=e^{-\alpha r^2}-e^{-\alpha R^2}$（$\alpha>0$）を考える。混合微分を省略せずに計算すると

$$
\partial_{\bar z^k}e^{-\alpha r^2}
=-\alpha(z^k-q^k)e^{-\alpha r^2},
$$

$$
\partial_{z^j}\partial_{\bar z^k}e^{-\alpha r^2}
=e^{-\alpha r^2}
\left[\alpha^2(\bar z^j-\bar q^j)(z^k-q^k)
-\alpha\delta_{jk}\right].
$$

正値性を方向 $z-q$ に適用すると、環状領域上で

$$
Lw
=e^{-\alpha r^2}\left(
\alpha^2\sum_{j,k}a^{j\bar k}(\bar z^j-\bar q^j)(z^k-q^k)
-\alpha\sum_ja^{j\bar j}\right)
\ge e^{-\alpha r^2}
\left(\alpha^2\lambda\frac{R^2}{4}-\alpha n\Lambda\right).
$$

したがって $\alpha>4n\Lambda/(\lambda R^2)$ を選べば $Lw>0$ である。内球面 $r=R/2$ では $h$ は厳密に正で最小値 $m>0$ を持つ。一方 $w$ の内球面値は $W=e^{-\alpha R^2/4}-e^{-\alpha R^2}>0$。$0<\varepsilon\le m/W$ を選ぶと、$\psi=h-\varepsilon w$ は内球面で非負、外球面でも $w=0$ より非負となる。

環状領域内では $L\psi=-\varepsilon Lw<0$ である。もし $\psi$ が内部で負の最小値を取れば、そこで複素Hessian $(\psi_{j\bar k})$ は半正値なので $L\psi\ge0$ となり矛盾する。従って

$$
h\ge\varepsilon w\qquad\text{on }\overline{\mathcal A}.
$$

零点 $z_0$ から $q$ に向かう単位速度の直線 $z(s)$（$z(0)=z_0$、$r(z(s))=R-s$）を取り、$s\downarrow0$ とする。$h(z_0)=w(z_0)=0$ だから

$$
\liminf_{s\downarrow0}
\frac{h(z(s))-h(z_0)}s
\ge\varepsilon\lim_{s\downarrow0}
\frac{e^{-\alpha(R-s)^2}-e^{-\alpha R^2}}s
=2\varepsilon\alpha R e^{-\alpha R^2}>0.
$$

他方 $z_0$ は開集合 $D$ 内で $h\ge0$ の最小点であり、$h\in C^2$ なので $dh(z_0)=0$。左辺の極限は零で矛盾する。従って $Z=D$、$v=M$ である。最小値の場合は $-v$ へ適用する。$\square$
<!-- proof-end -->

この証明で必要なのは、局所で $A$ の固有値が正の下限を持つことだけである。$A$ が一つのKähler計量の逆行列である必要はない。また境界のないコンパクト連結 $X$ なら、任意の連続な $v$ は最大値を内部で取るので、$Lv=0$ の滑らかな解は定数となる。

## 4. 二解の差は定数しか残らない

<a id="thm-yau1-04-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（複素Monge–Ampère方程式の解の定数差一意性）**
>
> $X$ を境界のないコンパクト連結Kähler多様体（複素次元 $n\ge1$）、$\omega$ をそのKähler形式、$F\in C^\infty(X;\mathbb R)$ とする。$\varphi_0,\varphi_1\in\mathcal H_\omega$ がともに

$$
(\omega+i\partial\bar\partial\varphi_j)^n
=e^F\omega^n\qquad(j=0,1)
$$

> を満たすなら、ある実定数 $c$ が存在して $\varphi_1=\varphi_0+c$ である。逆に、$\varphi_0$ が解なら任意の定数 $c$ について $\varphi_0+c$ も同じ方程式の解である。
<!-- formal-statement-end -->

### 証明の見取り図

第2節の線分積分によって差 $u=\varphi_1-\varphi_0$ は $Lu=0$ を満たす。各点での $A$ の正値性を確認して[本章の正係数二階作用素の補題](#lem-yau1-04-strong-maximum)を適用する。コンパクト性が最大値の存在を保証し、連結性が一つの定数にまとめる。逆向きには定数の混合二階微分が消える。

<!-- proof-start -->
### 証明

$u=\varphi_1-\varphi_0$ とし、[許容領域の凸性](../YAU1-03/index.md#prop-yau1-03-domain)から $\varphi_t=\varphi_0+tu$ は全 $t\in[0,1]$ で許容である。第2節で証明した対数行列式の積分式を、この線分の各点で用いると

$$
\sum_{j,k}a^{j\bar k}u_{j\bar k}
=\log\frac{\det G_1}{\det G_0}
=\log\frac{\omega_{\varphi_1}^n}{\omega_{\varphi_0}^n}
=\log\frac{e^F\omega^n}{e^F\omega^n}=0.
$$

係数 $A=\int_0^1G_t^{-1}dt$ は局所で連続かつ正値Hermiteである。$X$ はコンパクトなので $u$ は最大値を取り、境界がないのでその点は内部点である。[本章の正係数作用素の補題](#lem-yau1-04-strong-maximum)と連結性から $u\equiv c$ が従う。

逆に定数 $c$ は $\partial_j\partial_{\bar k}c=0$ であるため、

$$
\omega_{\varphi_0+c}
=\omega+i\partial\bar\partial(\varphi_0+c)
=\omega_{\varphi_0}.
$$

正値性も最高次外積も保たれ、$\varphi_0+c$ は同じ右辺 $F$ の解である。$\square$
<!-- proof-end -->

特に同じ右辺に対するKähler形式 $\omega_\varphi$ は一つしかない。この定理は**存在を仮定した一意性**であり、正の解の構成は後続の連続性の方法で扱う。

### もう一つの検算：エネルギー恒等式

複素Monge–Ampèreの一意性は、[既習の同一類・同一Ricci形式の一意性証明](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)と同型のStokesの計算でも確認できる。二解に対して $\omega_0=\omega_{\varphi_0}$、$\omega_1=\omega_{\varphi_1}$ と一時的に書き、$u=\varphi_1-\varphi_0$ とする。偶次数の外積は可換なので

$$
\omega_1^n-\omega_0^n
=(\omega_1-\omega_0)\wedge
\sum_{k=0}^{n-1}\omega_1^k\wedge\omega_0^{n-1-k}
=i\partial\bar\partial u\wedge S,
$$

$$
S:=\sum_{k=0}^{n-1}\omega_1^k\wedge\omega_0^{n-1-k},
\qquad dS=0.
$$

両解の右辺は同じだから最高次外積の差は零である。[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を、境界のない $X$ 上の $d(iu\bar\partial u\wedge S)$ に適用すると

$$
0=\int_Xu\,i\partial\bar\partial u\wedge S
=-\int_Xi\partial u\wedge\bar\partial u\wedge S.
$$

右辺の符号と正値性を確かめる。各点で $\omega_0$ に関して単位直交な正則余接枠を取ると

$$
i\partial u\wedge\bar\partial u\wedge\omega_0^{n-1}
=\frac1n\sum_{j=1}^n|u_j|^2\,\omega_0^n\ge0.
$$

$S$ の他の項も、正値Kähler形式の混合外積であるため非負である。従って零の積分ではすべての点で $u_j=0$。$u$ は実なので $du=\partial u+\bar\partial u=0$、連結性から定数となる。こちらの経路は定理の独立した符号検算にもなり、**正値性を失うと非負性が消える**ことをはっきり示す。

## 5. 平均ゼロは何を正規化しているか

解の定数加算は、求める計量 $\omega_\varphi$ を全く変えない。この自由度を**ゲージ**と呼ぶことがある。一つの計量を表す無数の関数の中から代表を一つ選ぶため、基準形式 $\omega$ の正の体積形式 $\omega^n$ を使い、$\varphi$ の平均を零にする。

$V_\omega=\int_X\omega^n>0$ は $X$ のコンパクト性とKähler正値性から有限で正である。関数の平均を $V_\omega^{-1}\int_X\varphi\,\omega^n$ と定義し、零となる許容関数の集合を取る。体積形式は未知の $\omega_\varphi^n$ ではなく、あらかじめ固定した $\omega^n$ である。こうして正規化条件そのものを固定しておけば、後続の解の変動にも同じ関数空間を使える。

<a id="def-yau1-04-mean-zero"></a>

<!-- formal-statement-start -->
> **定義（平均ゼロKählerポテンシャルの正規化）**
>
> $X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式、$V_\omega=\int_X\omega^n$ とする。[許容領域](../YAU1-03/index.md#def-yau1-03-positive-domain)のうち、基準体積に関する平均が零の集合を

$$
\mathcal H_\omega^0
:=\left\{\varphi\in\mathcal H_\omega:
\frac1{V_\omega}\int_X\varphi\,\omega^n=0\right\}
$$

> と定める。この条件を満たす $\varphi$ を平均ゼロに正規化されたKählerポテンシャルという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-04-mean-zero -->
**定義の確認**（平坦楕円曲線）。$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z=2\,dx\wedge dy$ とし、$|a|<1$ に対して

$$
\varphi_a(x,y)=\frac a{\pi^2}\cos(2\pi x)
$$

を取る。周期性から $T$ 上の滑らかな実関数で、[前章の正値判定](../YAU1-03/index.md#def-yau1-03-positive-domain)より $\omega_{\varphi_a}=(1-a\cos2\pi x)\omega_0>0$。また $V_{\omega_0}=2$、$\int_0^1\cos2\pi x\,dx=0$ なので

$$
\frac1{V_{\omega_0}}\int_T\varphi_a\,\omega_0
=\frac12\cdot\frac{2a}{\pi^2}
\int_0^1\!\int_0^1\cos2\pi x\,dx\,dy=0.
$$

よって $\varphi_a\in\mathcal H_{\omega_0}^0$ である。一方 $\varphi_a+c$ も許容だが、その平均は $c$ となり、$c\ne0$ ではこの集合に入らない。この確認は「滑らかさ・正値・平均ゼロ」という定義の各条件を別々に使っている。
<!-- definition-example-end -->

**上限ゼロ**という別の選び方もある。コンパクト性により $\sup_X\varphi=\max_X\varphi$ は有限で、$\varphi-\sup_X\varphi$ は上限が零となる。平均ゼロと上限ゼロは一般には同じ代表を選ばない。

<a id="prop-yau1-04-normalized"></a>

<!-- formal-statement-start -->
> **命題（平均ゼロ・上限ゼロの代表と解の一意性）**
>
> $X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式、$F$ を滑らかな実関数とする。任意の $\varphi\in\mathcal H_\omega$ の定数差の類には、平均ゼロの代表がちょうど一つ、上限ゼロの代表もちょうど一つある。具体的には

$$
\varphi^{\mathrm{mean}}
=\varphi-\frac1{V_\omega}\int_X\varphi\,\omega^n,
\qquad
\varphi^{\mathrm{sup}}=\varphi-\sup_X\varphi.
$$

> 特に $\mathcal M_\omega(\varphi)=F$ の解が存在すれば、平均ゼロに正規化した解はちょうど一つであり、上限ゼロに正規化した解もちょうど一つである。
<!-- formal-statement-end -->

### 証明の見取り図

定数加算で $\omega_\varphi$ と方程式は不変であり、平均と上限はその定数の分だけ移る。[一意性定理](#thm-yau1-04-uniqueness)によってすべての解が一つの定数差の類に属するので、代表を選べば一意性が得られる。

<!-- proof-start -->
### 証明

$c\in\mathbb R$ に対して $\partial\bar\partial c=0$ だから $\varphi+c\in\mathcal H_\omega$ かつ $\omega_{\varphi+c}=\omega_\varphi$。$V_\omega>0$ より

$$
\frac1{V_\omega}\int_X(\varphi+c)\omega^n
=\frac1{V_\omega}\int_X\varphi\,\omega^n
+\frac{cV_\omega}{V_\omega}
=\frac1{V_\omega}\int_X\varphi\,\omega^n+c.
$$

従って平均が零になる定数は $c=-V_\omega^{-1}\int_X\varphi\,\omega^n$ だけであり、第一の公式が得られる。また

$$
\sup_X(\varphi+c)=\sup_X\varphi+c
$$

なので、上限が零になる定数は $c=-\sup_X\varphi$ だけである。

最後に二つの正規化された解があると仮定する。[定数差一意性](#thm-yau1-04-uniqueness)からその差は定数 $c$。二解の平均がともに零なら上式より $c=0$、上限がともに零の場合も同じく $c=0$ となる。いずれの規約でも正規化された解は一つに限られる。$\square$
<!-- proof-end -->

先ほどの楕円曲線では、$\varphi_a$ の平均は零だが上限は $|a|/\pi^2$ である。したがって

$$
\varphi_a^{\mathrm{mean}}=\varphi_a,\qquad
\varphi_a^{\mathrm{sup}}=\varphi_a-\frac{|a|}{\pi^2}.
$$

$a\ne0$ のとき二つの代表は異なるものの、体積比はどちらも $e^{F_a}=1-a\cos2\pi x$ である。

### 正規化を二つ混同しない

前々章では、指定Ricci形式から得る既知関数 $u_R$ に対し、正の体積密度の積分が $V_\omega$ となるよう

$$
C=\log\frac{V_\omega}{\int_Xe^{-u_R}\omega^n},
\qquad F=C-u_R
$$

とした。[Ricciポテンシャルと正規化定数](../YAU1-02/index.md#prop-yau1-02-real-potential)に由来するこの処理は、**方程式の右辺 $F$ を決める操作**である。$u_R$ を $u_R+b$ に変えれば分母が $e^{-b}$ 倍され $C$ は $C+b$ に変わるから、$F$ 自体は不変である。

一方、ここでの $\int_X\varphi\omega^n=0$ は、**未知の解 $\varphi$ の定数を選ぶ操作**である。$\varphi$ の定数変更で右辺 $F$ は変わらない。これら二つは、記号がともに「正規化」であっても役割が異なる。

## 6. 線形化の核はなぜ定数なのか

次章では、連続性の方法に沿って方程式の右辺を動かす。そのためには、非線形作用素の線形化がどの方向で零になるかを先に知っておく必要がある。

[Monge–Ampère作用素の線形化と外積表示](../YAU1-03/index.md#prop-yau1-03-linearization)によれば、許容な $\varphi$ を固定し、滑らかな実関数 $v$ の方向に微分すると

$$
D\mathcal M_\omega|_\varphi(v)
=\sum_{j,k}g_\varphi^{j\bar k}v_{j\bar k}
=\frac12\Delta_{\omega_\varphi}v.
$$

ここで $\Delta_{\omega_\varphi}$ は実Laplacianであり、係数 $2$ は本系列の規約である。定数関数なら二階微分は零となるが、定数以外に核がないことも示せる。

<a id="prop-yau1-04-kernel"></a>

<!-- formal-statement-start -->
> **命題（Monge–Ampère線形化の核）**
>
> $X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式とし、$\varphi\in\mathcal H_\omega$ とする。実線形作用素

$$
D\mathcal M_\omega|_\varphi:
C^\infty(X;\mathbb R)\longrightarrow C^\infty(X;\mathbb R)
$$

> の核は、定数関数全体である。特に固定体積に関して平均ゼロの滑らかな実関数空間へ定義域を制限すると、核は $\{0\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\omega_\varphi$ が正値なので、線形化の二階係数 $g_\varphi^{j\bar k}$ は正値である。[本章の正係数作用素の補題](#lem-yau1-04-strong-maximum)で核の元は定数となり、平均ゼロならその定数は零となる。

<!-- proof-start -->
### 証明

$D\mathcal M_\omega|_\varphi(v)=0$ なら

$$
\sum_{j,k}g_\varphi^{j\bar k}v_{j\bar k}=0.
$$

$\omega_\varphi>0$ より $G_\varphi^{-1}$ は正値Hermite行列である。$X$ がコンパクト連結・境界なしなので、[本章の正係数作用素の補題](#lem-yau1-04-strong-maximum)を $v$ に適用して $v=c$ と得る。逆に任意の定数 $c$ は $c_{j\bar k}=0$ を満たし核に属する。さらに $\int_Xc\,\omega^n=cV_\omega=0$ なら $V_\omega>0$ より $c=0$。$\square$
<!-- proof-end -->

平均ゼロの条件が核を取り除くことと、線形化が適切な関数空間の間で**全射**であることは別の主張である。次章では変動する体積測度に対する積分障害も扱い、開性を証明する。

## 7. 仮定を外すと一意性はどう壊れるか

1. **非コンパクト：最大値が存在しない。** $\mathbb C$ 上で $\omega_0=i\,dz\wedge d\bar z$、$\varphi_0=0$、$\varphi_1=\operatorname{Re}z$ とすると、$\partial_z\partial_{\bar z}\operatorname{Re}z=0$。どちらも正値計量 $\omega_0$ を与え $F=0$ を満たすが、差は非定数である。最大値を取るという第4節の論法を使えず、Stokesの積分もコンパクトな全空間上では実行できない。
2. **非連結：定数が成分ごとに異なる。** 同じ面積の二つの楕円曲線の非交和 $T_1\sqcup T_2$ を取る。$\varphi=0$ と、$T_1$ 上で $+1$、$T_2$ 上で $-1$ の関数 $\psi$ はともに $F=0$ を満たし、どちらも全体の平均が零である。それでも $\psi-\varphi$ は全体では定数でない。強最大値原理が一つの定数を強制するのは**各連結成分上だけ**である。
3. **正値性を失う：行列式の等号だけでは足りない。** $\mathbb C^2$ の局所領域で $\omega_0=i(dz^1\wedge d\bar z^1+dz^2\wedge d\bar z^2)$ とし、$\psi=-2(|z^1|^2+|z^2|^2)$ とすれば $\omega_\psi=-\omega_0$、$\omega_\psi^2=\omega_0^2$ なのに $\psi$ は非定数である。この $\omega_\psi$ は正値ではないので許容解ではない。線分も正値領域を通らず、$G_t^{-1}$ は途中で特異になり、比較原理を使う係数が作れない。
4. **右辺が違う：差の方程式は同次でない。** 楕円曲線上の $\varphi_a$ と $0$ はそれぞれ $F_a=\log(1-a\cos2\pi x)$ と $0$ を満たす。$a\ne0$ なら差は非定数だが、これは同じ $F$ の二解ではない。第2節の右辺差が $F_a-0$ となり、$Lu=0$ を導けない。また $F\equiv\log2$ では $\int e^F\omega^n=2V_\omega$ となるから、そもそもコンパクトな固定Kähler類で許容解が存在しない。

この四つは互いに異なる障害である。特に、体積整合条件と正規化条件を満たしたという情報だけでは、非線形方程式の解は生まれない。

## 8. 演習：定数差の自由度を自力で取り除く

<a id="ex-yau1-04-a01"></a>

### Level A — YAU1-04-A01：線分上の対数行列式
- Level: A

$G_0=\operatorname{diag}(1,2)$、$G_1=\operatorname{diag}(2,2)$、$U=G_1-G_0$ とする。$G_t=G_0+tU$ の逆行列を計算し、$\int_0^1\operatorname{tr}(G_t^{-1}U)\,dt$ が $\log(\det G_1/\det G_0)$ に等しいことを確かめよ。

<!-- solution-start -->
**詳細解答。** $U=\operatorname{diag}(1,0)$ なので

$$
G_t=\begin{pmatrix}1+t&0\\0&2\end{pmatrix},
\qquad
G_t^{-1}=\begin{pmatrix}(1+t)^{-1}&0\\0&1/2\end{pmatrix}.
$$

$0\le t\le1$ では両固有値が正で、逆行列は全区間で存在する。積は $\operatorname{diag}((1+t)^{-1},0)$ だから

$$
\int_0^1\operatorname{tr}(G_t^{-1}U)\,dt
=\int_0^1\frac{dt}{1+t}
=[\log(1+t)]_0^1=\log2.
$$

一方 $\det G_0=2$、$\det G_1=4$ より $\log(4/2)=\log2$ で一致する。線分平均 $A=\operatorname{diag}(\log2,1/2)$ の $U$ との縮約も $\log2$ である。
<!-- solution-end -->

<a id="ex-yau1-04-a02"></a>

### Level A — YAU1-04-A02：楕円曲線の二つの正規化
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$|a|<1$、$\varphi_a=a\cos2\pi x/\pi^2$ とする。平均ゼロ代表・上限ゼロ代表を求め、両者の体積比が同じであることを示せ。

<!-- solution-start -->
**詳細解答。** $\omega_0=2dx\wedge dy$ なので $V_{\omega_0}=2$。積分 $\int_0^1\cos2\pi x\,dx=0$ から $\int_T\varphi_a\omega_0=0$、平均ゼロ代表は $\varphi_a$ 自身である。

余弦の最大値・最小値は $1,-1$ であり、$a$ の符号によらず $\sup_T\varphi_a=|a|/\pi^2$。上限ゼロ代表は $\varphi_a-|a|/\pi^2$ となる。いずれの代表でも二階微分は

$$
\partial_z\partial_{\bar z}\varphi_a=-a\cos2\pi x
$$

だから $\omega_{\varphi_a}=(1-a\cos2\pi x)\omega_0$。$|a|<1$ により正値で、体積比は両者とも $1-a\cos2\pi x$ である。
<!-- solution-end -->

<a id="ex-yau1-04-a03"></a>

### Level A — YAU1-04-A03：定数の右辺は自由に選べるか
- Level: A

境界のないコンパクト連結Kähler多様体 $X$ の固定形式 $\omega$ に対して、$\omega_\varphi^n=e^b\omega^n$（$b\in\mathbb R$ は定数）に許容解があるための $b$ の必要十分条件を求め、平均ゼロ解を特定せよ。

<!-- solution-start -->
**詳細解答。** [体積整合条件](../YAU1-03/index.md#prop-yau1-03-compatibility)を適用すると

$$
\int_X\omega_\varphi^n=e^b\int_X\omega^n,
\qquad
\int_X\omega_\varphi^n=\int_X\omega^n=V_\omega>0.
$$

従って $e^b=1$、実数 $b=0$ が必要。逆に $b=0$ なら $\varphi=0$ は許容で方程式を満たすため十分でもある。[定数差一意性](#thm-yau1-04-uniqueness)により全解は定数関数で、平均ゼロなら $\varphi=0$ に限る。
<!-- solution-end -->

<a id="ex-yau1-04-a04"></a>

### Level A — YAU1-04-A04：一次元の指数障壁
- Level: A

複素平面の環状領域 $R/2\le|z-q|\le R$（$R>0$）で $L=a\,\partial_z\partial_{\bar z}$（$a>0$ は定数）とする。$w=e^{-\alpha|z-q|^2}-e^{-\alpha R^2}$ の $Lw$ を求め、$Lw>0$ を保証する $\alpha$ の条件を一つ挙げよ。

<!-- solution-start -->
**詳細解答。** $r^2=(z-q)(\bar z-\bar q)$ なので

$$
\partial_{\bar z}e^{-\alpha r^2}
=-\alpha(z-q)e^{-\alpha r^2},
$$

$$
\partial_z\partial_{\bar z}e^{-\alpha r^2}
=e^{-\alpha r^2}(\alpha^2r^2-\alpha).
$$

定数項の微分は零だから $Lw=a e^{-\alpha r^2}(\alpha^2r^2-\alpha)$。環状領域では $r^2\ge R^2/4$ なので、$\alpha>4/R^2$ なら $\alpha^2r^2-\alpha\ge\alpha(\alpha R^2/4-1)>0$。$a>0$ から $Lw>0$ が従う。
<!-- solution-end -->

<a id="ex-yau1-04-a05"></a>

### Level A — YAU1-04-A05：既知関数の変更と未知関数の変更
- Level: A

既知のRicciポテンシャル $u_R$ に対し $I=\int_Xe^{-u_R}\omega^n$、$C=\log(V_\omega/I)$、$F=C-u_R$ とする。$u_R$ を $u_R+b$ に変更したときの $I,C,F$ を計算せよ。次に許容な解 $\varphi$ を $\varphi+d$ に変更したときの $F$ を答えよ。

<!-- solution-start -->
**詳細解答。** $b$ が定数だから

$$
I'=\int_Xe^{-u_R-b}\omega^n=e^{-b}I,\qquad
C'=\log\frac{V_\omega}{e^{-b}I}=C+b.
$$

従って $F'=C'-(u_R+b)=C-u_R=F$。一方 $\partial\bar\partial d=0$ なので $\omega_{\varphi+d}=\omega_\varphi$、最高次外積は変化しない。方程式の右辺 $e^F\omega^n$ も、従って $F$ も変わらない。前者は与えた密度の表示の自由度、後者は解の代表の自由度である。
<!-- solution-end -->

<a id="ex-yau1-04-b01"></a>

### Level B — YAU1-04-B01：複素一次元では何が簡単になるか
- Level: B

境界のないコンパクト連結な複素一次元のKähler多様体 $X$ で、$\varphi_0,\varphi_1\in\mathcal H_\omega$ が同じ $\omega_\varphi=e^F\omega$ を満たすとする。$u=\varphi_1-\varphi_0$ が調和関数であることを座標式から直接示し、その差が定数になる根拠を説明せよ。

<!-- solution-start -->
**詳細解答。** 正則座標 $z$ で $\omega=i g\,dz\wedge d\bar z$、$g>0$ とする。複素次元 $1$ では最高次外積は形式自身なので、同じ方程式を引くと

$$
0=\omega_{\varphi_1}-\omega_{\varphi_0}
=i\partial\bar\partial u
=i u_{z\bar z}\,dz\wedge d\bar z.
$$

$i\,dz\wedge d\bar z$ は消えないため $u_{z\bar z}=0$。$\omega$ の複素Laplacianは $g^{-1}u_{z\bar z}$、実Laplacianはその二倍なので $\Delta_\omega u=2g^{-1}u_{z\bar z}=0$。コンパクト連結・境界なしという仮定の下で[GA3の調和関数の定数性](../../GA/GA3/index.md#prop-ga3-harmonic-constant)を適用でき、$u$ は定数である。次元が2以上では最高次外積の等号から個々の係数行列が等しいとはいえず、線分積分またはエネルギー恒等式が必要になる。
<!-- solution-end -->

<a id="ex-yau1-04-b02"></a>

### Level B — YAU1-04-B02：二次元のエネルギー符号
- Level: B

$X$ を境界のないコンパクト連結Kähler曲面（複素次元 $2$）とする。許容な $\varphi_0,\varphi_1$ が同じ体積方程式を満たすとき、$u=\varphi_1-\varphi_0$、$\omega_j=\omega_{\varphi_j}$ に対して

$$
0=\int_X i\partial u\wedge\bar\partial u
\wedge(\omega_0+\omega_1)
$$

を導き、これが $du=0$ を意味する理由を二次元の局所座標で示せ。

<!-- solution-start -->
**詳細解答。** 二次元の因数分解は

$$
0=\omega_1^2-\omega_0^2
=(\omega_1-\omega_0)\wedge(\omega_1+\omega_0)
=i\partial\bar\partial u\wedge(\omega_1+\omega_0).
$$

両 $\omega_j$ は閉じているため $S=\omega_0+\omega_1$ も閉じている。[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で

$$
0=\int_Xu\,i\partial\bar\partial u\wedge S
=-\int_Xi\partial u\wedge\bar\partial u\wedge S.
$$

各点で $\omega_0=i(dz^1\wedge d\bar z^1+dz^2\wedge d\bar z^2)$ とできる単位直交余接枠を取る。$\partial u=u_1dz^1+u_2dz^2$ を代入して外積すると、交差項は同じ $dz^j$ または $d\bar z^k$ を繰り返すため消え、

$$
i\partial u\wedge\bar\partial u\wedge\omega_0
=\frac{|u_1|^2+|u_2|^2}{2}\,\omega_0^2.
$$

$\omega_1$ は正値なので $i\partial u\wedge\bar\partial u\wedge\omega_1\ge0$ も成り立つ。合計が零の積分だから $u_1=u_2=0$ が全点で成立する。実 $u$ には $\bar\partial u=\overline{\partial u}=0$ も従い $du=0$、連結性から定数である。
<!-- solution-end -->

<a id="ex-yau1-04-b03"></a>

### Level B — YAU1-04-B03：Ricci形式の一意性に戻る
- Level: B

境界のないコンパクト連結Kähler多様体 $X$ 上の二つのKähler形式 $\omega_0,\omega_1$ が同じde Rham類を持ち、$\rho(\omega_0)=\rho(\omega_1)$ を満たすとする。体積比が恒等的に $1$ となる過程を、Ricci差、調和関数の定数性、体積積分の順で導け。その後 $\omega_0=\omega_1$ を結論せよ。

<!-- solution-start -->
**詳細解答。** 正の体積比 $R=\omega_1^n/\omega_0^n$ は大域的な滑らかな関数で、[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)より

$$
0=\rho(\omega_1)-\rho(\omega_0)
=-i\partial\bar\partial\log R.
$$

$h=\log R$ は実関数なので、計量 $\omega_0$ の実Laplacianを取ると $\Delta_{\omega_0}h=2g_0^{j\bar k}h_{j\bar k}=0$。[コンパクト連結な調和関数の定数性](../../GA/GA3/index.md#prop-ga3-harmonic-constant)から $h=c$、従って $\omega_1^n=e^c\omega_0^n$。

同じKähler類の二形式では、最高次外積の差は完全形式になる。例えば[大域ポテンシャル](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)を使い $\omega_1-\omega_0=i\partial\bar\partial v$ と書くと、外積因数分解の各項が閉じているから、その差は $d(i\bar\partial v\wedge S)$ である。[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により

$$
\int_X\omega_1^n=\int_X\omega_0^n=V>0
$$

なので $e^cV=V$、$c=0$、$R=1$。

ここで $v$ は、基準形式 $\omega_0$ に関する右辺 $F=0$ の体積方程式を満たす。$0$ も同じ方程式の許容解である。[定数差一意性](#thm-yau1-04-uniqueness)から $v$ は定数となり、$\omega_1=\omega_0$ が従う。これは[既習のRicci一意性命題](../../CYG/CYG1-10/index.md#prop-cyg1-10-uniqueness)の別経路の確認にもなっている。
<!-- solution-end -->

<a id="ex-yau1-04-b04"></a>

### Level B — YAU1-04-B04：平均ゼロだけで足りない場合
- Level: B

同じ平坦楕円曲線 $T$ 二つの非交和 $X=T_1\sqcup T_2$ と、その平坦Kähler形式 $\omega$ を考える。二つの実関数を次のように置く。

$$
\varphi=0,\qquad
\psi|_{T_1}=c,\quad \psi|_{T_2}=-c,\quad c\ne0.
$$

次を確かめよ。

1. 二つとも全体の平均が零である。
2. 同じ $F=0$ の許容解である。
3. 差は全体で定数でない。

連結性を仮定しない場合の自然な正規化方法も述べよ。

<!-- solution-start -->
**詳細解答。** $T_1,T_2$ の体積はともに $V_T=2$ だから

$$
\int_X\psi\,\omega
=c\int_{T_1}\omega-c\int_{T_2}\omega
=2c-2c=0.
$$

$\varphi=0$ の積分も零なので(1)を満たす。$\psi$ は各成分上で定数、従って $i\partial\bar\partial\psi=0$、$\omega_\psi=\omega_\varphi=\omega>0$。最高次外積はともに $\omega$ で、同じ $F=0$ を満たし(2)が従う。

他方 $c\ne0$ なら $\psi$ は $T_1$ と $T_2$ で異なる値を取り、全体で定数でない。(3)も成立する。[本章の補題](#lem-yau1-04-strong-maximum)を各成分に適用しても差は成分別定数までしか決まらない。従って連結性なしでは、各 $T_i$ ごとに $\int_{T_i}\varphi\,\omega=0$ を課せば成分別の自由度を除去できる。
<!-- solution-end -->

<a id="ex-yau1-04-c01"></a>

### Level C — YAU1-04-C01：線形化・強最大値・積分証明をつなぐ
- Level: C

$X$ を境界のないコンパクト連結Kähler多様体、$\omega$ を固定Kähler形式、$F$ を滑らかな実関数とする。許容な二解 $\varphi_0,\varphi_1$ が存在すると仮定する。

1. $\varphi_t$ の凸線分を通して $Lu=0$ を導き、局所的な一様楕円性の根拠を記せ。
2. $L$ が単一のKähler計量のLaplacianだと仮定せずに、内部最大点から定数性を導くための障壁 $w$ と必要な係数評価を再構成せよ。
3. $S=\sum_{k=0}^{n-1}\omega_{\varphi_1}^k\wedge\omega_{\varphi_0}^{n-1-k}$ を用いる積分証明の符号と、定数性を強制する非負項を求めよ。
4. $\int_X\varphi_j\omega^n=0$ も両方で成立する場合の結論を述べよ。

<!-- solution-start -->
**詳細解答。** (1) $u=\varphi_1-\varphi_0$、$\varphi_t=\varphi_0+tu$ とすると[許容領域の凸性](../YAU1-03/index.md#prop-yau1-03-domain)から $G_t=G_0+t(u_{j\bar k})>0$。[Jacobi公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)を閉区間で積分して

$$
0=\log\frac{\det G_1}{\det G_0}
=\sum_{j,k}\left(\int_0^1g_t^{j\bar k}\,dt\right)u_{j\bar k}
=Lu.
$$

$A=\int_0^1G_t^{-1}dt$ に対し、任意の $\xi\ne0$ で $\xi^*A\xi=\int_0^1\xi^*G_t^{-1}\xi\,dt>0$。局所閉小領域と $[0,1]$ はコンパクトで係数が連続だから、固有値に共通の正の下限 $\lambda$ と上限 $\Lambda$ を選べる。

(2) $M=\max_Xu$、$h=M-u\ge0$ とする。零点集合と正の部分が接する局所球 $B_R(q)$ があれば、環状領域 $R/2\le r\le R$ で $w=e^{-\alpha r^2}-e^{-\alpha R^2}$ を取る。複素Hessianの計算により

$$
Lw\ge e^{-\alpha r^2}
\left(\frac{\alpha^2\lambda R^2}{4}-\alpha n\Lambda\right)>0
$$

となるよう $\alpha>4n\Lambda/(\lambda R^2)$ を選ぶ。内球面の $h$ の正の最小値と外球面の $w=0$ から $\varepsilon>0$ を選び $h-\varepsilon w\ge0$ を両境界で成立させる。もし内部で負の最小値があればその点の複素Hessianは半正値で、$L(h-\varepsilon w)\ge0$ となるが、実際には $-\varepsilon Lw<0$ で矛盾する。従って $h\ge\varepsilon w$。球面上の零点から内向きに微分すると右辺の傾き $2\varepsilon\alpha Re^{-\alpha R^2}>0$ を強制するが、$h$ はその零点で最小なので勾配零。よって $h=0$ が全域で成立し、$u$ は定数である。

(3) $\omega_1^n-\omega_0^n=i\partial\bar\partial u\wedge S=0$。$dS=0$ なので[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から

$$
0=\int_Xu\,i\partial\bar\partial u\wedge S
=-\int_Xi\partial u\wedge\bar\partial u\wedge S.
$$

正値形式の混合外積は非負で、特に $S$ に含まれる $\omega_0^{n-1}$ との積は $n^{-1}|\partial u|_{\omega_0}^2\omega_0^n$。これが零の積分なら $\partial u=0$、実関数なので $du=0$。従って別経路でも定数性が出る。

(4) $u=c$ の平均は $cV_\omega$。二つの平均が零だから $cV_\omega=0$、$V_\omega>0$ より $c=0$、すなわち $\varphi_0=\varphi_1$。いずれの証明も「二解が存在すれば」の主張であって、解の存在を構成したわけではない。
<!-- solution-end -->

<a id="ex-yau1-04-c02"></a>

### Level C — YAU1-04-C02：三つの誤った一意性主張を修正する
- Level: C

次の主張について、成立しない場合は具体例と壊れる論証を示し、成立させるための適切な条件を述べよ。

1. 「任意のKähler多様体上では、同じ体積方程式の二解の差は定数である」
2. 「連結性がなくても、全体で平均ゼロにすれば同じ体積方程式の解は一意である」
3. 「正値性は不要で、行列式が同じならポテンシャルは定数差である」

<!-- solution-start -->
**詳細解答。** (1) 非コンパクトな $\mathbb C$ では、$\omega_0=i\,dz\wedge d\bar z$ と $\varphi_0=0,\ \varphi_1=\operatorname{Re}z$ が反例である。$\partial_z\partial_{\bar z}\operatorname{Re}z=0$ のため両方同じ正値形式と $F=0$ を与えるが、差は非定数。最大値が存在するとは限らず、全空間上のStokesの積分にも無限遠の境界項が出得る。コンパクト・連結・境界なし・両解の正値性を仮定すれば[一意性定理](#thm-yau1-04-uniqueness)が適用できる。

(2) $T_1\sqcup T_2$ 上で $\varphi_0=0$ と $\varphi_1|_{T_1}=1,\ \varphi_1|_{T_2}=-1$ は、同体積の平坦トーラスなら両方全体平均零で同じ $F=0$ の許容解である。[本章の補題](#lem-yau1-04-strong-maximum)は連結成分ごとにしか定数を強制せず、全体平均は成分別の二つの定数の和しか固定しない。連結性を仮定するか、各成分で平均零を課せばよい。

(3) $\mathbb C^2$ の局所領域で

$$
\omega_0=i\sum_{j=1}^2dz^j\wedge d\bar z^j,\qquad
\varphi_0=0,\qquad
\varphi_1=-2(|z^1|^2+|z^2|^2)
$$

とすると $\omega_{\varphi_1}=-\omega_0$ なので、二乗すれば $\omega_{\varphi_1}^2=\omega_0^2$ なのに差は定数でない。後者は負定値で許容領域外である。二解の間の係数は $G_t=(1-2t)I$ となり、$t=1/2$ で特異化するため対数行列式の線分積分も強最大値原理も使えない。正値Kähler形式であることが十分な修正条件である。なおこの例は**局所の反例**であり、コンパクト多様体上の全域反例と取り違えてはならない。
<!-- solution-end -->

## 9. 次章へ：定数を取り除いたあと何が残るか

同じ右辺を持つ体積方程式では二解の差が定数であり、平均ゼロにすれば解は存在する場合に一つだけになる。また線形化は定数方向だけを核に持つことが分かった。

次章の連続性の方法では、右辺を連続的に動かしたとき、線形化の**核だけでなく像**も制御する必要がある。特に体積の積分条件により、関数の平均は測度 $\omega_\varphi^n$ とともに変化する。固定した平均ゼロ条件とのずれを明示して、適切な関数空間上で局所可解性を証明する。

### 参考文献

- [V. V. Datar, *Lecture Notes on Calabi’s Conjectures and Kähler–Einstein Metrics*](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf)：一意性から連続性の方法への移行。
- [Z. Błocki, *The Complex Monge–Ampère Equation on Compact Kähler Manifolds*](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf)：対数行列式の線分積分と一意性。
