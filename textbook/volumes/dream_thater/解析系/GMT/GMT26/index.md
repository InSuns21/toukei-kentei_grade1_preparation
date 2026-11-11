# GMT26 De Giorgi構造定理 I：半空間blow-up

<!-- definition-example-audit: strict -->

## 1. 平均法線から、集合の形まで復元できるか

前講で、[縮約境界](../GMT25/index.md#def-gmt25-reduced-boundary)の点 $x$ では、球内の外向き法線の平均がある単位ベクトル $n=\nu_E^*(x)$ に近づくと学びました。これは**境界測度が向いている方向**についての情報です。欲しいのは、それより強い、境界で集合そのものを拡大したときの形です。

例えば $E=\{(s,t):t<s^2\}$ の原点を拡大すると、条件 $rt<(rs)^2$ は $t<rs^2$ となり、下半平面へ近づきます。しかし一般の有限周長集合は滑らかなグラフではありません。[GMT25の滑らかな境界の証明](../GMT25/index.md#prop-gmt25-smooth-boundary)を使い回すことはできません。

ここでは、$d\ge2$、$\Omega\subset\mathbb R^d$ は開集合、$E\subset\mathbb R^d$ は $\Omega$ で局所有限周長を持つLebesgue可測集合とします。[Gauss--Green測度](../GMT24/index.md#def-gmt24-gauss-green)の符号を

$$
\mathcal G_E=-D\chi_E=\nu_E\mu_E,\qquad \mu_E=|D\chi_E|,\qquad |\nu_E|=1\quad\mu_E\text{-a.e.}
$$

と固定します。$\omega_d=|B_1^d|$ は $d$ 次元単位球の体積、$\omega_{d-1}=|B_1^{d-1}|$ とします。$B_r(x)\Subset\Omega$ は閉包まで $\Omega$ に含まれる球です。球面や超平面の面積には、[GMT10の正規化](../GMT10/index.md#lem-gmt10-hausdorff-normalization)に従い $\widehat{\mathcal H}^{\,d-1}=c_{d-1}^{-1}\mathcal H^{d-1}$ を用います。元の $\mathcal H^{d-1}$ は非正規化で、$c_{d-1}$ を1と見なしません。

## 2. 周長が体積の二相を分ける：相対等周評価

半空間の証明には、球の内部に $E$ とその補集合が両方見えていれば、境界測度も十分な大きさを持つ、という不等式が要ります。球の外側にある境界を周長に混ぜないことが肝心です。

<a id="lem-gmt26-ball-sobolev"></a>

<!-- formal-statement-start -->
> **補題（球上のBV--Sobolev--Poincaré評価）**
> $d\ge2$、$B=B_r(x)\subset\mathbb R^d$ とする。$u\in BV(B)$、$u_B=|B|^{-1}\int_Bu$ に対し、$q=d/(d-1)$ とおくと、次の定数 $C_d$ は $u,x,r$ に依存しない。

$$
\left(\int_B|u-u_B|^q\,dy\right)^{1/q}\le C_d|Du|(B).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一次元の微積分から、コンパクト台を持つ滑らかな関数の値は各座標方向の微分の積で抑えられます。FubiniとHölderを繰り返すと全空間の $L^1$ 型Sobolev評価が出ます。球内の平均を引いた関数を、球面の外へ反射して延長し、$L^1$ Poincaré評価で反射時の誤差を消します。最後にBV近似を適用します。

<!-- proof-start -->
### 証明

**(1) 全空間の評価。** $v\in C_c^1(\mathbb R^d)$ とし、$x=(x_i,\widehat x_i)$ を $i$ 番目の座標と残りの座標に分けます。$v$ は両端の無限遠で0なので、左右から積分して

$$
|v(x)|\le\frac12\int_{\mathbb R}|\partial_i v(t,\widehat x_i)|\,dt
=\frac12 A_i(\widehat x_i),\qquad 1\le i\le d.
$$

各不等式を掛け、$1/(d-1)$ 乗します。$A_i$ は $x_i$ に依存しません。非負関数についての反復[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)（$d=2$ では[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)による二つの積分の積、一般の $d$ では一座標ずつHölderを適用する）により

$$
\begin{aligned}
\int_{\mathbb R^d}|v|^{d/(d-1)}
&\le 2^{-d/(d-1)}\int\prod_{i=1}^d A_i(\widehat x_i)^{1/(d-1)}\,dx\\
&\le 2^{-d/(d-1)}\prod_{i=1}^d
\left(\int_{\mathbb R^{d-1}}A_i\,d\widehat x_i\right)^{1/(d-1)}.
\end{aligned}
$$

ここで $\int A_i=\int|\partial_i v|$ です。両辺を $(d-1)/d$ 乗し、相加相乗平均と $\sum_i|\partial_i v|\le\sqrt d|\nabla v|$ を順に使うと

$$
\|v\|_{L^q(\mathbb R^d)}
\le\frac12\prod_i\|\partial_i v\|_1^{1/d}
\le\frac1{2d}\sum_i\|\partial_i v\|_1
\le C_d\|\nabla v\|_1.
$$

コンパクト台のBV関数に対しては、[局所平滑化](../GMT22/index.md#prop-gmt22-local-convolution)と[全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)でこの評価を延長できます。全空間で有限体積の集合 $F$ の指示関数に適用すると、**鋭い定数は主張しない**等周評価

$$
|F|^{(d-1)/d}\le C_dP(F;\mathbb R^d)
$$

も得られます。

**(2) 球内の $L^1$ Poincaré評価。** まず $u\in C^1(\overline B)$ とします。任意の $x,y\in B$ を結ぶ線分は $B$ 内にあり、$t\mapsto u((1-t)y+tx)$ を微分して区間 $[0,1]$ で積分すると

$$
|u(x)-u(y)|\le |x-y|\int_0^1|\nabla u((1-t)y+tx)|\,dt.
$$

$x,y$ について積分し、$t\le1/2$ では $y\mapsto(1-t)y+tx$、$t\ge1/2$ では $x\mapsto(1-t)y+tx$ に変数変換すると、各Jacobianの逆数は高々 $2^d$ です。$|x-y|\le2r$ なので

$$
\int_B|u-u_B|\le |B|^{-1}\int_B\int_B|u(x)-u(y)|\,dy\,dx
\le C_dr\int_B|\nabla u|.
$$

**(3) 反射延長。** 平行移動・拡大で $B=B_1(0)$ とします。$w=u-u_B$ を $|x|<1$ に置き、$1<|x|<3/2$ では

$$
\widetilde w(x)=w\left((2-|x|)\frac{x}{|x|}\right)
$$

と球面で反射します。$1/2<|x|<1$ と $1<|x|<3/2$ の間の反射写像は、距離の歪みとJacobianを上下から定数で抑えられる双Lipschitz写像です。半径1で値が一致し跳躍項は生じません。$|x|\le1$ で1、$|x|\ge3/2$ で0の滑らかな半径cutoff $\eta$ を掛けて $v=\eta\widetilde w$ とすると、連鎖律と積の微分から

$$
\int_{\mathbb R^d}|\nabla v|
\le C_d\left(\int_B|\nabla u|+\int_B|u-u_B|\right)
\le C_d\int_B|\nabla u|.
$$

全空間の評価を $v$ に適用し、$v=w$ が球内で成立することから結論を得ます。一般の $BV(B)$ 関数は[滑らかなBV近似](../GMT22/index.md#thm-gmt22-smooth-approx)で $L^1$ 収束かつ全変動を近似し、平均の収束とFatouの補題で極限に渡します。尺度 $r$ に戻すと左辺・右辺とも $r^{d-1}$ 倍になり、定数は不変です。$\square$
<!-- proof-end -->

この補題を指示関数に適用するだけで、二相が存在する球の周長を下から抑えられます。

<a id="thm-gmt26-relative-iso"></a>

<!-- formal-statement-start -->
> **定理（球上の相対等周不等式）**
> $d\ge2$、$B=B_r(x)\Subset\Omega$、$E$ は $B$ で有限周長とする。$a=|E\cap B|$、$b=|B\setminus E|$ とおくと、次の次元だけに依存する $c_d>0$ が存在する。

$$
P(E;B)\ge c_d\min\{a,b\}^{(d-1)/d}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\chi_E$ の球平均が0か1に近くなければ、$\chi_E$ と平均との差の $L^q$ ノルムは大きくなります。その大きさを直前の補題が周長で抑える、という一行の幾何学です。

<!-- proof-start -->
### 証明

$m=a/(a+b)$ とおきます。$a\le b$ なら $m\le1/2$ で、$E\cap B$ 上では $|\chi_E-m|=1-m\ge1/2$ です。従って

$$
\|\chi_E-m\|_{L^q(B)}^q
\ge 2^{-q}a,\qquad
\|\chi_E-m\|_{L^q(B)}\ge\tfrac12 a^{1/q}.
$$

$b\le a$ なら補集合に同じ議論を用い、$|D\chi_{E^c}|=|D\chi_E|$ を使います。[球上のBV--Sobolev--Poincaré評価](#lem-gmt26-ball-sobolev)により、どちらも $\tfrac12\min(a,b)^{1/q}\le C_dP(E;B)$。$1/q=(d-1)/d$ より結論を得ます。$\square$
<!-- proof-end -->

**直接例。** $E=\{y_d<0\}$、$x=0$ なら $a=b=\omega_dr^d/2$、$P(E;B_r)=\omega_{d-1}r^{d-1}$ です。不等式の両辺は同じ $r^{d-1}$ の次数を持ちます。$a=0$ または $b=0$ の場合には右辺が0となり、球内に界面がない場合と整合します。

## 3. 縮約境界点での体積・周長の密度評価

相対等周評価だけでは、$E$ が球の中でごく薄く消える可能性を排除できません。追加の入力は、[縮約境界上での法線平均の極限](../GMT25/index.md#thm-gmt25-normal-mean)です。単位方向 $n$ にほとんど全部が揃うなら、球の**内部の周長**は球面を横切る $E$ の面積で制御できます。

<a id="lem-gmt26-spherical-flux"></a>

<!-- formal-statement-start -->
> **補題（球面flux恒等式）**
> $E$ は $\Omega$ で局所有限周長、$x\in\Omega$ とする。ほとんどすべての $r>0$ で $\overline{B_r(x)}\subset\Omega$ が成り立つ範囲について、次のベクトル等式が成立する。

$$
\mathcal G_E(B_r(x))=-\int_{E\cap\partial B_r(x)}\frac{y-x}{r}\,d\widehat{\mathcal H}^{\,d-1}(y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[Gauss--Green恒等式](../GMT24/index.md#thm-gmt24-gauss-green)のテスト場に、球の指示関数を外から滑らかに近似するcutoffを入れます。cutoffの勾配が球面に集中し、その符号は外向き法線の**負**です。

<!-- proof-start -->
### 証明

単位ベクトル $e_i$ ごとに $\varphi_\varepsilon(y)=e_i h_\varepsilon(|y-x|)$ と置き、$h_\varepsilon=1$（$s\le r$）、$h_\varepsilon=1-(s-r)/\varepsilon$（$r<s<r+\varepsilon$）、$h_\varepsilon=0$（$s\ge r+\varepsilon$）とします。角のあるcutoffは滑らかな近似で扱えます。Gauss--Greenに代入すると

$$
\int h_\varepsilon(|y-x|)\,d\mathcal G_{E,i}(y)
=-\frac1\varepsilon\int_{E\cap\{r<|y-x|<r+\varepsilon\}}
e_i\cdot\frac{y-x}{|y-x|}\,dy.
$$

左辺は、$\mu_E(\partial B_r(x))=0$ となる半径（単調な球質量の不連続点は高々可算）で $\mathcal G_{E,i}(B_r(x))$ に収束します。右辺は極座標のFubiniと一変数Lebesgue微分定理により、ほとんどすべての半径で $-\int_{E\cap\partial B_r}e_i\cdot(y-x)/r\,d\widehat{\mathcal H}^{\,d-1}$ に収束します。$i=1,\ldots,d$ をそろえて結論を得ます。$\square$
<!-- proof-end -->

<a id="thm-gmt26-density-bounds"></a>

<!-- formal-statement-start -->
> **定理（縮約境界点での二相体積密度と周長密度の上下評価）**
> $d\ge2$、$E$ は $\Omega$ で局所有限周長、$x\in\partial^*E\cap\Omega$ とする。$c_d,C_d>0$ は次元のみに依存する定数とする。ある $r_x>0$ が存在し、$0<r<r_x$ で次を満たす。

$$
\begin{gathered}
c_dr^d\le |E\cap B_r(x)|,\qquad c_dr^d\le|B_r(x)\setminus E|,\\
c_dr^{d-1}\le\mu_E(B_r(x))\le C_dr^{d-1}.
\end{gathered}
$$
<!-- formal-statement-end -->

### 証明の見取り図

球面fluxと法線平均の長さが1へ向かうことから $\mu_E(B_r)\le2\widehat{\mathcal H}^{\,d-1}(E\cap\partial B_r)$ を導きます。$g(r)=|E\cap B_r|$ とすると、球との共通部分への非鋭い全空間等周評価により $g^{(d-1)/d}\le Cg'$。これを積分すると $g(r)\ge cr^d$ です。補集合でも同じ議論を行い、[球上の相対等周不等式](#thm-gmt26-relative-iso)で周長を下から抑えます。

<!-- proof-start -->
### 証明

平行移動で $x=0$ とし、$n=\nu_E^*(0)$ とします。縮約境界の定義から $\mu_E(B_r)>0$、$\mathcal G_E(B_r)/\mu_E(B_r)\to n$、$|n|=1$ です。十分小さい $r$ で

$$
n\cdot\mathcal G_E(B_r)\ge\tfrac12\mu_E(B_r).
$$

[球面flux恒等式](#lem-gmt26-spherical-flux)と $|n\cdot y/r|\le1$ より、ほとんどすべての小さい半径で

$$
\mu_E(B_r)\le2\widehat{\mathcal H}^{\,d-1}(E\cap\partial B_r)
\le2d\omega_dr^{d-1}.
$$

任意の小半径 $r$ に対してこの不等式が成立する $s\in(r,2r)$ を取り、球質量の単調性を使えば $\mu_E(B_r)\le2d\omega_d(2r)^{d-1}$ です。$r_x$ を小さくして $B_{2r}\Subset\Omega$ を確保すれば、上側周長密度が示されました。

次に $g(r)=|E\cap B_r|$ とします。球面積分についての[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)から $g$ は絶対連続です。以下の「ほとんど至る所（almost everywhere; a.e.）」は、Lebesgue測度零集合を除く半径で成立することを意味します。

$$
g(r)=\int_0^r\widehat{\mathcal H}^{\,d-1}(E\cap\partial B_s)\,ds,\qquad
g'(r)=\widehat{\mathcal H}^{\,d-1}(E\cap\partial B_r)\quad\text{a.e.}
$$

また $g(r)>0$ が全小半径で成立します。もし $g(r)=0$ なら $\chi_E=0$ が $B_r$ でa.e.なので、$D\chi_E$ もそこで0となり、$0\in\operatorname{supp}\mu_E$ に反するためです。$F_r=E\cap B_r$ へ球面で切断すると、a.e.半径で

$$
P(F_r;\mathbb R^d)\le \mu_E(B_r)+\widehat{\mathcal H}^{\,d-1}(E\cap\partial B_r)
\le3g'(r).
$$

切断の第一項は球内の元の境界、第二項は球面上で新たに現れた境界で、同じ境界を重複して加えていません。第2節の証明で得た[全空間の非鋭い等周評価](#lem-gmt26-ball-sobolev)を有限体積集合 $F_r$ に適用して

$$
g(r)^{(d-1)/d}\le C_dP(F_r;\mathbb R^d)
\le3C_dg'(r)\quad\text{a.e.}
$$

とします。$g(r)>0$ なので連鎖律で

$$
\frac{d}{dr}g(r)^{1/d}
=\frac1d g(r)^{-(d-1)/d}g'(r)
\ge\frac1{3dC_d}\quad\text{a.e.}
$$

$g(0)=0$ から積分すれば $g(r)\ge(3dC_d)^{-d}r^d$ です。補集合 $E^c$ に対しては $\mathcal G_{E^c}=-\mathcal G_E$、$\mu_{E^c}=\mu_E$、法線平均の極限が $-n$ です。[補集合での法線反転](../GMT25/index.md#prop-gmt25-invariance)により同じ議論が適用でき、$|B_r\setminus E|\ge c_dr^d$ も得ます。

二相の体積下界がそろったので、[球上の相対等周不等式](#thm-gmt26-relative-iso)を球 $B_r$ に適用して

$$
\mu_E(B_r)\ge c_d\min\{|E\cap B_r|,|B_r\setminus E|\}^{(d-1)/d}
\ge c'_dr^{d-1}.
$$

上下の定数を小さい方・大きい方に取り直せば定理の三つの評価になります。$\square$
<!-- proof-end -->

**なぜ両側が必要か。** 球内に $E$ の体積だけが正の割合で残っても、拡大極限が全空間になる可能性を排除できません。$E^c$ の体積も一様に残ることが、次節で「ずれた半空間」を退ける鍵です。周長の上界はBVコンパクト性、下界は界面が消滅しないことを保証します。

## 4. 拡大した集合と拡大した測度は異なる

点 $x$ の近傍を倍率 $r^{-1}$ で拡大した集合を扱います。$E_{x,r}$ は集合、$\mu_{x,r}$ は測度であり、同じ記号で混同しないようにします。測度には周長の次元 $d-1$ に合わせた係数が必要です。測度の写像による移送は[GMT19の像測度の定義](../GMT19/index.md#def-gmt19-blow-up)を使います。

<a id="def-gmt26-rescalings"></a>

<!-- formal-statement-start -->
> **定義（集合blow-upと周長測度の再尺度化）**
> $x\in\Omega$、$r>0$、$T_{x,r}(y)=(y-x)/r$ とする。$E$ が $\Omega$ で局所有限周長のとき、拡大した集合と、$T_{x,r}$ による像測度を再正規化した拡大測度を

$$
E_{x,r}=T_{x,r}(E),\qquad
\mu_{x,r}(A)=r^{1-d}\mu_E(x+rA),\qquad
\mathcal G_{x,r}(A)=r^{1-d}\mathcal G_E(x+rA)
$$

> と定める。$A$ は $x+rA\Subset\Omega$ となるBorel集合とする。$E_{x,r}$ の収束は $\chi_{E_{x,r}}$ の $L^1_{\mathrm{loc}}$ 収束、測度の収束は[コンパクト台連続関数で検査する局所弱収束](../GMT19/index.md#def-gmt19-vague)として区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt26-rescalings -->
**定義の確認**（半空間）。$E=\{y_d<0\}$、$x=0$ とすると $E_{0,r}=E$。境界上の面積測度は $\mu_E(B_{rR})=\omega_{d-1}(rR)^{d-1}$ だから

$$
\mu_{0,r}(B_R)=r^{1-d}\omega_{d-1}(rR)^{d-1}
=\omega_{d-1}R^{d-1},\qquad
\mathcal G_{0,r}(B_R)=e_d\omega_{d-1}R^{d-1}.
$$

集合も測度も拡大の前後で一致します。係数を $r^{-d}$ とすると周長は $r^{-1}$ 倍に発散してしまい、集合の体積密度との次元が食い違います。
<!-- definition-example-end -->

<a id="lem-gmt26-rescaling-variation"></a>

<!-- formal-statement-start -->
> **補題（BV微分と再尺度化の両立）**
> $E$ と $T_{x,r}$ は上記の条件を満たすとする。$x+rU\Subset\Omega$ となる開集合 $U$ 上で次が成り立つ。

$$
\mathcal G_{E_{x,r}}\llcorner U=\mathcal G_{x,r}\llcorner U,
\qquad |D\chi_{E_{x,r}}|\llcorner U=\mu_{x,r}\llcorner U.
$$
<!-- formal-statement-end -->

### 証明の見取り図

テスト場のdivergenceに変数変換を適用すると、体積Jacobian $r^d$ と微分の $r^{-1}$ が相殺して $r^{d-1}$ だけ残ります。

<!-- proof-start -->
### 証明

$\varphi\in C_c^1(U;\mathbb R^d)$ とします。$z=(y-x)/r$、$dy=r^d dz$ なので

$$
\begin{aligned}
\int_{E_{x,r}}\operatorname{div}_z\varphi(z)\,dz
&=r^{-d}\int_E\operatorname{div}_z\varphi((y-x)/r)\,dy\\
&=r^{1-d}\int_E\operatorname{div}_y\bigl[\varphi((y-x)/r)\bigr],dy\\
&=r^{1-d}\int\varphi((y-x)/r)\cdot d\mathcal G_E(y).
\end{aligned}
$$

最後は[Gauss--Green恒等式](../GMT24/index.md#thm-gmt24-gauss-green)です。これが第1式を示します。正値の倍率と双Lipschitz写像による像測度の操作はベクトル値測度の全変動と可換なので、第2式も従います。$\square$
<!-- proof-end -->

## 5. すべての縮約境界点で半空間になる

ここでDe Giorgiのblow-up定理を証明します。球の中の集合の収束と測度の収束を順に確認し、極限の**法線の方向だけ**から、最後に**境界の位置**まで決めます。整流可能性と周長の面積測度への同定は次講で扱います。

<a id="thm-gmt26-halfspace-blowup"></a>

<!-- formal-statement-start -->
> **定理（De Giorgiの半空間blow-up）**
> $d\ge2$、$E\subset\mathbb R^d$ は開集合 $\Omega$ で局所有限周長を持つとする。任意の $x\in\partial^*E\cap\Omega$ に対し、$n=\nu_E^*(x)$、$H_n^-=\{z\in\mathbb R^d:z\cdot n<0\}$ と置く。このとき

$$
\chi_{E_{x,r}}\longrightarrow\chi_{H_n^-}
\quad\text{in }L^1_{\mathrm{loc}}(\mathbb R^d)
\qquad(r\downarrow0).
$$

> さらに $x$ における $E$ の体積密度は $1/2$ で、周長の密度は次の値になる。

$$
\lim_{r\downarrow0}\frac{|E\cap B_r(x)|}{\omega_dr^d}=\frac12,
\qquad
\lim_{r\downarrow0}\frac{\mu_E(B_r(x))}{\omega_{d-1}r^{d-1}}=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

1. 周長密度の上界と[BVの局所コンパクト性](../GMT23/index.md#thm-gmt23-compactness)により、任意の尺度列から集合の $L^1_{\mathrm{loc}}$ 収束部分列を取る。
2. 縮約境界では法線の**二乗平均振動**が消えるため、極限のGauss--Green測度は $n$ と非負測度の積になる。
3. すると極限の指示関数は $n$ と直交する方向に一定で、$n$ 方向には減少する。従って極限は、位置が未確定の平行半空間。
4. 両相の体積密度の下界により、半空間の境界は原点を通らねばならない。極限が一意なので部分列でなく全尺度で収束する。

<!-- proof-start -->
### 証明

**(1) コンパクト性。** 平行移動・回転で $x=0$、$n=e_d$ とします。任意の $r_j\downarrow0$ を固定し、$E_j=E_{0,r_j}$ と書きます。任意の固定 $R>0$ について、前節までに得た[密度評価](#thm-gmt26-density-bounds)と[尺度変換の恒等式](#lem-gmt26-rescaling-variation)を組み合わせると、十分大きい $j$ で

$$
\int_{B_R}\chi_{E_j}\le\omega_dR^d,
\qquad |D\chi_{E_j}|(B_R)=r_j^{1-d}\mu_E(B_{r_jR})\le C_dR^{d-1}.
$$

$R=1,2,3,\ldots$ ごとに[BV局所コンパクト性](../GMT23/index.md#thm-gmt23-compactness)を適用し、対角部分列を取ります。すると、ある $f$ へ $L^1_{\mathrm{loc}}$ 収束します。

さらに部分列を取り、各球 $B_m$ 上で誤差の $L^1$ ノルムの級数が有限になるよう選びます。誤差の級数はLebesgueほとんどすべての点で有限になり、点ごとにも収束します。

各 $\chi_{E_j}\in\{0,1\}$ から $f\in\{0,1\}$ がほとんど至る所で成立するので、$f=\chi_F$ と書けます。[全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)から $F$ も局所有限周長です。

**(2) 測度の極限の方向。** 拡大後の周長測度を $\mu_j=|D\chi_{E_j}|$、外向き法線を $\nu_j$ とします。$\mu_j(B_R)$ は一様有界なので、[GMT19の局所弱コンパクト性](../GMT19/index.md#lem-gmt19-vague-compactness)を適用し、さらに対角部分列で $\mu_j\rightharpoonup_{\mathrm v}\lambda$ とできます。法線の二乗平均振動の恒等式は[前講](../GMT25/index.md#thm-gmt25-normal-mean)から

$$
\begin{aligned}
\int_{B_R}|\nu_j-e_d|^2\,d\mu_j
&=r_j^{1-d}\int_{B_{r_jR}}|\nu_E-e_d|^2\,d\mu_E\\
&=2\mu_j(B_R)\bigl(1-e_d\cdot N_{r_jR}(E,0)\bigr)\longrightarrow0.
\end{aligned}
$$

従ってCauchy--Schwarzで

$$
|\mathcal G_{E_j}-e_d\mu_j|(B_R)
\le \mu_j(B_R)^{1/2}
\left(\int_{B_R}|\nu_j-e_d|^2\,d\mu_j\right)^{1/2}\to0.
$$

一方、任意のコンパクト台 $C^1$ ベクトル場 $\varphi$ に対し、$L^1_{\mathrm{loc}}$ 収束とGauss--Greenから

$$
\int\varphi\cdot d\mathcal G_{E_j}
=\int\chi_{E_j}\operatorname{div}\varphi
\longrightarrow\int\chi_F\operatorname{div}\varphi
=\int\varphi\cdot d\mathcal G_F.
$$

両方を合わせると $\mathcal G_F=e_d\lambda$ です。$|e_d|=1$ なので**全変動を取って** $\mu_F=|\mathcal G_F|=\lambda$、$\nu_F=e_d$ が $\mu_F$-a.e.で成り立ちます。ここで $\mu_j$ の弱*極限が先験的に $\mu_F$ に等しいと仮定したのではなく、法線の揃い方から等しさを導いた点が重要です。

**(3) 形の分類。** $\mathcal G_F=-D\chi_F=e_d\mu_F$ から、超関数の意味で

$$
D_i\chi_F=0\quad(i<d),\qquad D_d\chi_F=-\mu_F\le0.
$$

非負の滑らかなmollifier $\rho_\varepsilon$ と畳み込んだ $f_\varepsilon=\rho_\varepsilon*\chi_F$ は滑らかで、$\partial_i f_\varepsilon=0$（$i<d$）、$\partial_df_\varepsilon\le0$ を満たします。従って $f_\varepsilon(z',t)=h_\varepsilon(t)$ で、$h_\varepsilon$ は非増加です。$\varepsilon\downarrow0$ で $L^1_{\mathrm{loc}}$ 収束させると、$\chi_F$ は横方向 $z'$ に依存せず、縦方向 $t$ に非増加な $\{0,1\}$ 値関数です。ゆえに（零集合を除いて）

$$
F=\{(z',t):t<a\},\qquad a\in\mathbb R\cup\{-\infty,+\infty\}.
$$

**(4) 平行移動の自由度を消す。** 第3節の[両相の体積密度下界](#thm-gmt26-density-bounds)を $B_{r_jR}(0)$ に適用し、変数変換すると、すべての固定 $R>0$ について

$$
c_dR^d\le |E_j\cap B_R|\le(\omega_d-c_d)R^d.
$$

$L^1(B_R)$ 収束によって同じ不等式が $F$ にも成り立ちます。$a=+\infty$ または $-\infty$ なら一相が消え矛盾します。$a>0$ なら $0<R<a$ を取ると $F\cap B_R=B_R$ で補集合の下界に矛盾します。$a<0$ も $0<R<-a$ で $F\cap B_R=\varnothing$ となり矛盾します。従って $a=0$、$F=H_{e_d}^-$ です。

任意の尺度列が同じ極限への収束部分列を持ちます。仮に全尺度の $L^1(B_R)$ 収束が失敗すれば、ある $\varepsilon>0$ と尺度列で距離が $\varepsilon$ 以上となり、上記の収束部分列の存在に矛盾します。よって全尺度で $L^1_{\mathrm{loc}}$ 収束します。回転を戻して半空間の向きが $n$ となります。

**(5) 密度の正規化。** 体積については $R=1$ で

$$
\frac{|E\cap B_r(x)|}{\omega_dr^d}
=\frac{|E_{x,r}\cap B_1|}{\omega_d}
\longrightarrow\frac{|H_n^-\cap B_1|}{\omega_d}=\frac12.
$$

周長については、(2) の議論を任意の尺度列で行うと、$\mu_{x,r}$ の局所弱部分列極限は必ず $|D\chi_{H_n^-}|$ です。後者は超平面上の面積測度で、$\partial B_1$ に質量を置かないため、[局所弱収束における球質量の収束](../GMT19/index.md#def-gmt19-vague)により

$$
\frac{\mu_E(B_r(x))}{r^{d-1}}
=\mu_{x,r}(B_1)\longrightarrow
|D\chi_{H_n^-}|(B_1)=\omega_{d-1}.
$$

任意の尺度列からの議論なので、周長密度も全尺度の極限です。$\square$
<!-- proof-end -->

**得られたこと。** 球内の法線がほぼ一定という測度上の事実から、集合がほぼ半空間という体積上の事実が出ました。前講では滑らかな境界の場合だけ得た $\theta_E=1/2$ が、今度は**縮約境界のすべての点**で成立します。角点は $\partial^*E$ に含まれないことがあり、単に体積比が $1/2$ の点ならどこでも成立するわけではありません。

## 6. 具体例と、次の問い

**角点を持つ集合。** $E=(0,1)^2$ の開いた辺では、拡大後の集合は半平面へ収束します。原点（角点）では $E_{0,r}$ が第一象限のままです。前講の[角での法線相殺](../GMT25/index.md#def-gmt25-reduced-boundary)により原点は縮約境界ではなく、定理の仮定を満たしません。

**周長測度の収束と集合の収束の違い。** $E_{x,r}\to H_n^-$ を $L^1_{\mathrm{loc}}$ で示しただけでは、一般に $|D\chi_{E_{x,r}}|\to|D\chi_{H_n^-}|$ は従いません。微小な振動が周長を余分に作れるからです。本証明では、縮約境界の法線平均の条件から**余剰周長が生じないこと**を別に証明しました。

次講では半空間への近似を多数の点で統一的に使い、[可算整流可能集合の定義](../GMT12/index.md#def-gmt12-countably-rectifiable)と接続して、縮約境界の可算整流可能性と周長測度の面積表示へ進みます。今回のblow-upだけでそれらの全体定理を証明したことにはしません。

## 7. 演習：密度、方向、blow-upを自分で確かめる

### Level A：半空間と係数の確認

<a id="ex-gmt26-a01"></a>
### GMT26-A01 半平面の体積と周長

- Level: A

$E=\{(s,t)\in\mathbb R^2:t<0\}$、$x=0$ とする。すべての $r>0$ について $|E\cap B_r|$、$|B_r\setminus E|$、$\mu_E(B_r)$ を求め、相対等周不等式の両辺が $r$ の同じ次数を持つことを確認せよ。

<!-- solution-start -->
#### 詳細解答

反射 $(s,t)\mapsto(s,-t)$ が円盤を二等分するので両体積は $\pi r^2/2$ です。[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)を水平直線に使うと、その球内長さは $2r$ だから $\mu_E(B_r)=2r$。相対等周の右辺は $c_2(\pi r^2/2)^{1/2}=c_2\sqrt{\pi/2}\,r$ で、左辺も $2r$ です。$r^2$ を周長密度の正規化に使わず、$r^{d-1}=r$ とする理由も分かります。
<!-- solution-end -->

<a id="ex-gmt26-a02"></a>
### GMT26-A02 縮尺と周長測度

- Level: A

$d=3$、$H=\{z_3<0\}$ とする。$\mu_H(B_{rR}(0))$ と $\mu_{0,r}(B_R(0))$ をそれぞれ計算し、再尺度化の係数 $r^{1-d}$ を検算せよ。

<!-- solution-start -->
#### 詳細解答

境界は $z_3=0$ の平面で、半径 $rR$ の円板の面積は $\pi(rR)^2$ です。[平滑境界の面積表示](../GMT24/index.md#prop-gmt24-smooth-boundary)により $\mu_H(B_{rR})=\pi r^2R^2$ です。$d=3$ では $r^{1-d}=r^{-2}$ なので

$$
\mu_{0,r}(B_R)=r^{-2}\mu_H(B_{rR})=\pi R^2
=\omega_2R^2.
$$

これは $r$ に依存しません。$r^{-3}$ を使うと $\pi R^2/r$ になり誤りです。
<!-- solution-end -->

<a id="ex-gmt26-a03"></a>
### GMT26-A03 正方形の角が仮定を破る場所

- Level: A

$E=(0,2)^2$、$x=(0,0)$ とする。十分小さい球での $N_r(E,x)$ と体積密度を計算し、今回のblow-up定理を適用できない理由を明示せよ。

<!-- solution-start -->
#### 詳細解答

球内の左辺は長さ $r$、下辺も長さ $r$ です。法線は $-e_1$、$-e_2$ だから $\mathcal G_E(B_r)=-r(e_1+e_2)$、$\mu_E(B_r)=2r$。従って

$$
N_r(E,x)=-\frac{e_1+e_2}{2},\qquad |N_r(E,x)|=\frac1{\sqrt2}<1.
$$

縮約境界の[単位長条件](../GMT25/index.md#def-gmt25-reduced-boundary)に反します。球の中は四分円なので密度は $1/4$、また $E_{0,r}$ は $B_1$ 内で第一象限のままです。これは定理の反例でなく、仮定の必要性を示す例です。
<!-- solution-end -->

<a id="ex-gmt26-a04"></a>
### GMT26-A04 局所弱収束を試すテスト関数

- Level: A

$\mu_j=2\delta_{1/j}+\delta_2$ を $\mathbb R$ 上の正Radon測度とする。$\mu_j\rightharpoonup^*\mu$ の極限を、コンパクト台連続関数 $\varphi$ の積分を計算して求めよ。集合の $L^1$ 収束を主張する問題ではないことも説明せよ。

<!-- solution-start -->
#### 詳細解答

任意の $\varphi\in C_c(\mathbb R)$ について

$$
\int\varphi\,d\mu_j=2\varphi(1/j)+\varphi(2)
\longrightarrow2\varphi(0)+\varphi(2).
$$

連続性により $\varphi(1/j)\to\varphi(0)$ だから $\mu=2\delta_0+\delta_2$ です。対象は測度であり、$\chi_{E_j}$ のようなLebesgue可積分関数ではありません。$\mu_j$ の極限から集合の形を言うには、別に指示関数の収束と微分との整合が必要です。
<!-- solution-end -->

<a id="ex-gmt26-a05"></a>
### GMT26-A05 球面fluxの向き

- Level: A

$E=\{(s,t):t<0\}$、$x=0$ に対し、$-\int_{E\cap\partial B_r}y/r\,d\widehat{\mathcal H}^{\,1}$ を直接積分し、$\mathcal G_E(B_r)$ と一致することを示せ。

<!-- solution-start -->
#### 詳細解答

下半円を $y=r(\cos\theta,\sin\theta)$、$\pi<\theta<2\pi$ と置くと弧長要素は $r\,d\theta$ です。よって

$$
-\int_{E\cap\partial B_r}\frac yr\,d\widehat{\mathcal H}^{\,1}
=-r\int_\pi^{2\pi}(\cos\theta,\sin\theta)\,d\theta
=-r\bigl((0,-2)\bigr)=(0,2r).
$$

一方、$t=0$ 上の外向き法線は $e_2$ なので $\mathcal G_E(B_r)=2re_2$。符号が一致します。cutoffの勾配が外向き球面方向に対して負になるため、球面積分には負号が必要です。
<!-- solution-end -->

### Level B：証明の核を別の設定で使う

<a id="ex-gmt26-b01"></a>
### GMT26-B01 球内体積の成長を積分する

- Level: B

$d\ge2$、$g:[0,r_0]\to[0,\infty)$ は絶対連続、$g(0)=0$、$g(r)>0$（$r>0$）で、ほとんどすべての $r$ について $g(r)^{(d-1)/d}\le K g'(r)$ とする。$g(r)\ge(r/(dK))^d$ を導け。正値の条件をどの段階で使ったかも述べよ。

<!-- solution-start -->
#### 詳細解答

$r>0$ で $g(r)>0$ なので $g^{-(d-1)/d}$ を掛けられ、連鎖律を使うと

$$
\frac d{dr}g(r)^{1/d}
=\frac1d g(r)^{-(d-1)/d}g'(r)
\ge\frac1{dK}
$$

がa.e.成り立ちます。$0<\varepsilon<r$ で積分すると

$$
g(r)^{1/d}-g(\varepsilon)^{1/d}
\ge\frac{r-\varepsilon}{dK}.
$$

絶対連続性により $g(\varepsilon)\to g(0)=0$。$\varepsilon\downarrow0$ として $g(r)^{1/d}\ge r/(dK)$、両辺を $d$ 乗して結論です。正値は負冪を掛けるところで必要です。
<!-- solution-end -->

<a id="ex-gmt26-b02"></a>
### GMT26-B02 一定法線から平行半空間へ

- Level: B

$F\subset\mathbb R^2$ は局所有限周長で $-D\chi_F=e_2|D\chi_F|$ とする。$\chi_F$ を滑らかに畳み込み、$F$ が零集合を除いて $\{(s,t):t<a\}$、空集合、全空間のいずれかであることを証明せよ。$a=0$ まで結論できるか。

<!-- solution-start -->
#### 詳細解答

$u_\varepsilon=\rho_\varepsilon*\chi_F$ とおきます。測度値微分を畳み込めば $\partial_su_\varepsilon=0$、$\partial_tu_\varepsilon=-\rho_\varepsilon*|D\chi_F|\le0$ です。従って $u_\varepsilon(s,t)=h_\varepsilon(t)$ で非増加です。

$u_\varepsilon\to\chi_F$ が $L^1_{\rm loc}$ なので、部分列のa.e.極限は横座標に依存しない非増加の $\{0,1\}$ 値関数となります。非増加な指示関数の1の部分は下向き半直線であり、$F=\{t<a\}$（$a=\pm\infty$ を含む）と書けます。

法線が同じ半空間 $\{t<4\}$ も条件を満たすので、**この条件だけでは $a=0$ は示せません**。中心を固定するには[両相の体積密度下界](#thm-gmt26-density-bounds)が別途必要です。
<!-- solution-end -->

<a id="ex-gmt26-b03"></a>
### GMT26-B03 集合の収束だけでは周長が収束しない

- Level: B

$Q=(-\pi,\pi)\times(-2,2)$ とし、整数 $k\ge1$ に対して $E_k=\{(s,t):t<k^{-1}\sin(ks)\}$、$H=\{t<0\}$ とする。$E_k\to H$ が $L^1(Q)$ で成立する一方、$P(E_k;Q)$ が $P(H;Q)$ へ収束しないことを示せ。

<!-- solution-start -->
#### 詳細解答

$|k^{-1}\sin(ks)|\le1/k$ なので、各 $s\in(-\pi,\pi)$ の二つの集合の縦断面の対称差の長さは $|\sin(ks)|/k$ です。[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)から

$$
\|\chi_{E_k}-\chi_H\|_{L^1(Q)}
=\frac1k\int_{-\pi}^\pi|\sin(ks)|\,ds
=\frac4k\to0.
$$

グラフ $t=k^{-1}\sin(ks)$ の導関数は $\cos(ks)$ であり、[滑らかな境界のGauss--Green表示](../GMT24/index.md#prop-gmt24-smooth-boundary)から

$$
P(E_k;Q)=\int_{-\pi}^{\pi}\sqrt{1+\cos^2(ks)}\,ds
=\int_{-\pi}^{\pi}\sqrt{1+\cos^2 s}\,ds>2\pi.
$$

周期性と $k$ が整数であることを使いました。対して $P(H;Q)=2\pi$ です。界面の振動は体積では消えても、弧長に余分な量を残します。De Giorgi定理では法線の平均振動が消えるので、この余剰分を排除できます。
<!-- solution-end -->

<a id="ex-gmt26-b04"></a>
### GMT26-B04 極限の全変動を確定する

- Level: B

$\mu_j$ は非負Radon測度、$G_j$ はベクトル値Radon測度で、$G_j=\nu_j\mu_j$、$|\nu_j|=1$ とする。コンパクト集合上の $\mu_j$ は一様有界で、$\mu_j\rightharpoonup_{\mathrm v}\lambda$、$G_j\rightharpoonup_{\mathrm v}G$（[局所弱収束](../GMT19/index.md#def-gmt19-vague)を各成分に適用）とする。ある単位ベクトル $n$ について各 $R>0$ で $\int_{B_R}|\nu_j-n|^2d\mu_j\to0$ なら $G=n\lambda$、$|G|=\lambda$ を示せ。

<!-- solution-start -->
#### 詳細解答

コンパクト台のテスト場 $\varphi$ の台が $B_R$ に含まれるようにします。Cauchy--Schwarzを使うと

$$
\left|\int\varphi\cdot d(G_j-n\mu_j)\right|
\le\|\varphi\|_\infty\mu_j(B_R)^{1/2}
\left(\int_{B_R}|\nu_j-n|^2d\mu_j\right)^{1/2}\to0.
$$

一方、二つの局所弱収束から左の積分は $\int\varphi\cdot d(G-n\lambda)$ に収束するため、すべてのテスト場で0です。従って $G=n\lambda$。$n$ は定数で $|n|=1$、$\lambda$ は非負なので、任意のBorel集合 $A$ で $|G|(A)=\int_A|n|\,d\lambda=\lambda(A)$ となります。単に $G_j\rightharpoonup_{\mathrm v}G$ だけなら全変動の等号は得られず、法線の振動消失を使った点が本質です。
<!-- solution-end -->

### Level C：定理を組み立て直す

<a id="ex-gmt26-c01"></a>
### GMT26-C01 blow-upの一意性まで証明する

- Level: C

$d\ge2$、$x\in\partial^*E\cap\Omega$ とする。[周長・体積密度の評価](#thm-gmt26-density-bounds)および[BV局所コンパクト性](../GMT23/index.md#thm-gmt23-compactness)を使用してよい。次を示せ。

1. 任意の $r_j\downarrow0$ に沿う $E_{x,r_j}$ は、$L^1_{\rm loc}$ 収束部分列を持つ。
2. どの部分列極限 $F$ も $-D\chi_F=\nu_E^*(x)|D\chi_F|$ を満たす。
3. 極限は原点を通る半空間に限られ、**元の全尺度**について収束する。

<!-- solution-start -->
#### 詳細解答

$n=\nu_E^*(x)$ と置き、座標を回転して $n=e_d$ とします。任意の $R$ で $|D\chi_{E_{x,r_j}}|(B_R)=r_j^{1-d}\mu_E(B_{r_jR}(x))\le C_dR^{d-1}$、$L^1$ ノルムは $\omega_dR^d$ 以下なので、[局所BVコンパクト性](../GMT23/index.md#thm-gmt23-compactness)と対角線法で $L^1_{\rm loc}$ 収束部分列が取れます。さらに各球で誤差の $L^1$ ノルムの和が有限になる部分列を選べば、Lebesgueほとんどすべての点で極限は $\chi_F$ です。

拡大後の $\mu_j$ と法線 $\nu_j$ を使い、[前講の二乗平均振動の恒等式](../GMT25/index.md#thm-gmt25-normal-mean)を代入すると

$$
\int_{B_R}|\nu_j-e_d|^2d\mu_j
=2\mu_j(B_R)(1-e_d\cdot N_{r_jR}(E,x))\to0.
$$

[GMT26-B04](#ex-gmt26-b04)の計算で $G_F=e_d\lambda$ と $|G_F|=\lambda$ が従い、$-D\chi_F=e_d|D\chi_F|$ です。[GMT26-B02](#ex-gmt26-b02)の分類から $F=\{z_d<a\}$（空・全空間を含む）です。両相の体積密度下界は、任意の固定 $R>0$ で

$$
c_dR^d\le|F\cap B_R|\le(\omega_d-c_d)R^d
$$

を与えます。$a\ne0$ なら $R<|a|$ の球が一相のみになり矛盾します。従って $a=0$ です。任意の尺度列の収束部分列が同じ $\{z_d<0\}$ を極限に持ちます。全尺度の収束が失敗すれば、ある $B_R$ 上で距離が $\varepsilon>0$ 以上の尺度列を取れてしまい、その列に半空間へ収束する部分列が存在することと矛盾します。回転を戻して極限は $H_n^-$ です。
<!-- solution-end -->

<a id="ex-gmt26-c02"></a>
### GMT26-C02 ずれた境界と振動する境界の二重反証

- Level: C

$d=2$ で次の二つの条件を比較せよ。集合 $F$ に対する条件(I)は $-D\chi_F=n|D\chi_F|$（一定の単位ベクトル $n$）であること、条件(II)は原点中心のあらゆる十分小さい球で $F$ と $F^c$ の体積比がともに $c>0$ 以上であることとする。

1. $F_a=\{(s,t):t<a\}$、$a\ne0$ は条件(I)を満たすが、条件(II)を破ることを示せ。
2. $E_k=\{t<k^{-1}\sin(ks)\}$ は $L^1_{\rm loc}$ で下半平面へ収束するが、法線振動の消失なしに周長測度の同定を導けないことを示せ。
3. 二条件が半空間blow-upの証明のどの異なる段階を担うか述べよ。

<!-- solution-start -->
#### 詳細解答

(1) $F_a$ のGauss--Green測度は $e_2\mathcal H^1\llcorner\{t=a\}$ で、$\nu_{F_a}=e_2$ は一定です。$a>0$ なら $0<R<a$ の球は $F_a$ に含まれ、$|B_R\setminus F_a|=0$。$a<0$ なら $0<R<-a$ の球と $F_a$ は交わらず、$|F_a\cap B_R|=0$。従って条件(II)に反します。

(2) [GMT26-B03](#ex-gmt26-b03)から、任意の固定長方形で対称差の体積は $O(k^{-1})$ ですが、グラフ上の周長は $\int\sqrt{1+\cos^2(ks)}\,ds$ で、平らな境界の長さより大きい値が残ります。実際、法線は

$$
\nu_k(s)=\frac{(-\cos(ks),1)}{\sqrt{1+\cos^2(ks)}}
$$

であり、点ごとに $e_2$ へ近づきません。周長の余剰が残る例です。

(3) 条件(I)は弱*極限 $G_F=n\lambda$ を出し、$\chi_F$ が横方向に一定で縦方向に非増加であることを保証します。しかし平行移動の自由度 $a$ が残ります。条件(II)は、半空間境界が原点以外なら小球の一相が消えるという矛盾で $a=0$ を確定します。逆に(II)だけでは、原点の交差する二象限のような法線が相殺する形を排除できません。両方を組み合わせて初めて向きと位置の双方が決まります。
<!-- solution-end -->
