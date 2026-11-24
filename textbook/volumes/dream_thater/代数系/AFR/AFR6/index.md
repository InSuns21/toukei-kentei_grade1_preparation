# AFR6 Hecke作用とスペクトルの接続

前講までに、双曲Laplace作用素の固有方程式と、カスプでのFourier展開を調べました。一つの固有値に複数のカスプ形式が属する場合、その中でどの関数を選ぶべきでしょうか。整数行列から作る有限和には、微分方程式を保ちつつ算術的な情報を取り出す力があります。これを使って固有空間をさらに分解し、次講のL関数を作る準備をします。

<!-- definition-example-audit: strict -->

## 1. 素数に対応する有限個の移動

[上半平面](../../MF/MF1/index.md#def-mf1-upper-half-plane)を $\mathbb H$、[整数モジュラー群](../../MF/MF1/index.md#def-mf1-modular-group)を $\Gamma=SL_2(\mathbb Z)$ とします。点を $z=x+iy$（$x,y\in\mathbb R,\ y>0$）と書きます。[実特殊線形群の上半平面への作用](../AFR1/index.md#def-afr1-real-group) と同じ記法で、正の行列式を持つ実行列 $B=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ の点移動を

$$
Bz=\frac{az+b}{cz+d}
$$

と書きます。分母は上半平面で零にならず、虚部は $(\det B)y/|cz+d|^2>0$ です。行列全体を正の数で割っても分子・分母の倍率は相殺されます。特に $B$ と $B/\sqrt{\det B}$ は同じ点移動を与え、後者は行列式1なので、[双曲計量と面積要素の群不変性](../AFR2/index.md#prop-afr2-metric-invariance)が適用できます。

素数 $p$ に対し $\mathcal M_p$ を行列式 $p$ の整数二次正方行列全体とします。左から $\Gamma$ の行列を掛けて移り合うものを同じ左剰余類とみなします。[整数行列の左剰余類代表](../../MF/MF5/index.md#lem-mf5-hermite)を $n=p$ に適用すると、代表は

$$
D=\begin{pmatrix}p&0\\0&1\end{pmatrix},
\qquad
B_b=\begin{pmatrix}1&b\\0&p\end{pmatrix}
\quad(0\le b<p)
$$

の $p+1$ 個です。補題の条件 $ad=p$ から $(a,d)=(p,1),(1,p)$ の二通りしかなく、それぞれ上右成分の範囲が $0\le b<1$ と $0\le b<p$ になるためです。一次分数変換に代入すると

$$
Dz=pz,\qquad B_bz=\frac{z+b}{p}.
$$

MF5の[レベル1のHecke作用素](../../MF/MF5/index.md#def-mf5-hecke-level-one)を参考に、各点移動の先で関数を評価し、その値を足し合わせる線形作用を構成します。

$\Gamma$ 不変とは、任意の $\gamma\in\Gamma$ と $z\in\mathbb H$ で $u(\gamma z)=u(z)$ が成立することです。ここでは正則性を課しません。

MF5の式で重さを0とした場合の正規化は $1/p$ でした。本講ではその $\sqrt p$ 倍を用います。後で非零Fourier係数の漸化式が簡単になります。


<a id="def-afr6-hecke"></a>
<!-- formal-statement-start -->
> **定義（重さ0の素数Hecke作用素）**  
> $p$ を素数、$u:\mathbb H\to\mathbb C$ を $\Gamma$ 不変な関数とする。作用素を

$$
(T_pu)(z)=\frac1{\sqrt p}
\left(u(pz)+\sum_{b=0}^{p-1}u\left(\frac{z+b}{p}\right)\right)
$$

> と定める。
<!-- formal-statement-end -->


<!-- definition-example-start: def-afr6-hecke -->
**定義の確認**：$p=2$ は素数で、$u(z)=1$ は全ての $\Gamma$ の作用に不変です。[整数行列の左剰余類代表](../../MF/MF5/index.md#lem-mf5-hermite)の条件に $p=2$ を代入すると、代表は

$$
\begin{pmatrix}2&0\\0&1\end{pmatrix},
\quad\begin{pmatrix}1&0\\0&2\end{pmatrix},
\quad\begin{pmatrix}1&1\\0&2\end{pmatrix}
$$

です。いずれも行列式2であり、対角成分は正、上右成分は下右成分未満の非負整数です。それぞれの点移動は $2z,z/2,(z+1)/2$ で、虚部は $2y,y/2,y/2$ とすべて正です。したがって各評価点で $u$ が定義され、値は1になります。

$$
(T_2 1)(z)=\frac{1+1+1}{\sqrt2}=\frac3{\sqrt2}.
$$

したがって定数関数に対して、定義は有限で、再び不変な関数を与えます。
<!-- definition-example-end -->

右からも $\Gamma$ を掛けて移り合う行列の集合 $\Gamma D\Gamma$ を二重剰余類とします。$S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とすると $SDS^{-1}=\operatorname{diag}(1,p)$ です。後者に右から $\begin{pmatrix}1&b\\0&1\end{pmatrix}$ を掛ければ $B_b$ となります。従って全代表が一つの二重剰余類に入り、$\mathcal M_p=\Gamma D\Gamma$ です。これは合成数にはそのまま成立しません。例えば $2I$ は行列式4ですが、左右から整数可逆行列を掛けても成分が全て偶数であるため $\operatorname{diag}(1,4)$ と移り合いません。

## 2. 微分方程式とカスプ条件を保存する

[双曲Laplace作用素](../AFR2/index.md#def-afr2-laplacian) $\Delta_{\mathbb H}=-y^2(\partial_x^2+\partial_y^2)$ を用います。$\partial_x$ は高さ $y$ を固定した横方向の偏微分、$\partial_y$ は $x$ を固定した高さ方向の偏微分です。[Maass形式](../AFR2/index.md#def-afr2-maass)の不変性、固有方程式、増大条件と、[Maassカスプ形式](../AFR3/index.md#def-afr3-maass-cusp)の平均0および作用素の定義域への所属を一つずつ確かめます。


<a id="thm-afr6-preserve"></a>
<!-- formal-statement-start -->
> **定理（Hecke作用による保型固有方程式の保存）**  
> $p$ を素数、$u$ を滑らかな $\Gamma$ 不変関数とする。$T_pu$ も滑らかで不変であり、

$$
\Delta_{\mathbb H}T_pu=T_p\Delta_{\mathbb H}u
$$

> が成立する。$u$ が [重さ0のMaass形式](../AFR2/index.md#def-afr2-maass)なら、$T_pu$ は零関数または同じ固有値のMaass形式である。さらに $u$ が [重さ0のMaassカスプ形式](../AFR3/index.md#def-afr3-maass-cusp)なら、$T_pu$ は零関数または同じ固有値のMaassカスプ形式である。
<!-- formal-statement-end -->

### 証明の見取り図

代表の置換で不変性を示し、各移動と微分の可換性を使います。定数項については小区間をつなげて一周期の積分に戻します。

<!-- proof-start -->
### 証明

任意の $\gamma\in\Gamma$ について右乗法 $B\mapsto B\gamma$ は左剰余類の全単射です。逆は $\gamma^{-1}$ の右乗法であり、各代表を左から $\Gamma$ の行列で直しても $u$ の値は変わりません。従って $T_pu(\gamma z)=T_pu(z)$ です。有限和なので滑らかさも保存されます。

$B/\sqrt p\in SL_2(\mathbb R)$ に [双曲Laplace作用素の群作用との可換性](../AFR2/index.md#thm-afr2-laplacian-equivariance) を適用すると $\Delta_{\mathbb H}(u\circ B)=(\Delta_{\mathbb H}u)\circ B$ です。有限和を取れば主張の等式が成立します。$\Delta_{\mathbb H}u=\lambda u$ の場合は右辺が $\lambda T_pu$ です。

Maass形式の増大条件を $|u(x+iy)|\le C y^M$（$y\ge1$）とします。$y\ge p$ なら全ての移動先の高さが1以上なので、

$$
|T_pu(x+iy)|\le
\frac C{\sqrt p}(p^M+p^{1-M})y^M.
$$

$1\le y\le p$ では $T_pu$ は周期1かつ連続で、$0\le x\le1$ のコンパクトな帯上で有界です。定数を大きくすれば $y\ge1$ 全体で増大条件が成立します。

横方向の平均を $a_0(y)=\int_0^1u(x+iy)dx$ とします。高さ $y$ を固定し、横座標だけを $v=px$ と置換します。$dv/dx=p>0$ なので $dx=dv/p$ となり、第一項の平均は

$$
\int_0^1u(px+ipy)dx
=\frac1p\int_0^pu(v+ipy)dv=a_0(py).
$$

第二項も高さ $y/p$ を固定し、$v=(x+b)/p$ と置換します。$dv/dx=1/p>0$ より $dx=p\,dv$ となり、区間の両端は $b/p,(b+1)/p$ です。したがって

$$
\sum_{b=0}^{p-1}p\int_{b/p}^{(b+1)/p}
u(v+iy/p)dv=p\,a_0(y/p).
$$

従って $T_pu$ の平均は $p^{-1/2}a_0(py)+p^{1/2}a_0(y/p)$ です。$a_0=0$ ならこの平均も0です。非零の場合には既にMaass形式であることを示したので、[定数項を除いたカスプでの指数減衰](../AFR4/index.md#thm-afr4-cusp-decay)を適用して二乗可積分性とエネルギー実現の定義域への所属を得ます。
<!-- proof-end -->


## 3. 積分で逆向きの移動を調べる

[重さ0のPetersson内積](../AFR3/index.md#def-afr3-petersson)を用いる空間を $H=L^2(\Gamma\backslash\mathbb H,d\mu)$、$d\mu=dx\,dy/y^2$ とします。[標準基本領域](../../MF/MF1/index.md#def-mf1-standard-domain)を $F$ とし、内積は第一変数について線形な規約 $(u,v)=\int_F u\overline v\,d\mu$ です。

有界とは、ある定数 $C$ がすべての $u\in H$ に対して $\|T_pu\|\le C\|u\|$ を満たすことです。ここでは $H$ の要素は不変な二乗可積分関数をほとんど至る所の一致で同一視したものです。定義域が空間全体の有界線形作用素について、内積の左右に作用素を移せる等式が自己共役性を意味します。

自己共役性を示すには、単に各点の移動が面積を保存するだけでは足りません。移動した基本領域をどの部分群の基本領域として扱うかを調べます。部分群 $J\subset\Gamma$ の指数とは左剰余類 $J\backslash\Gamma$ の個数です。


<a id="thm-afr6-self-adjoint"></a>
<!-- formal-statement-start -->
> **定理（重さ0のHecke作用素の自己共役性）**  
> 各素数 $p$ に対し、$T_p$ は $H$ 上で有界な自己共役作用素を与える。任意の $u,v\in H$ について

$$
(T_pu,v)=(u,T_pv),
\qquad
\|T_pu\|\le\frac{p+1}{\sqrt p}\|u\|
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

正則形式の場合の [MF5のHecke随伴性の証明](../../MF/MF5/index.md#thm-mf5-self-adjoint) と同じ対応を、ここでは二乗可積分関数について積分の有限性から確かめます。逆行列の正のスカラー倍が同じ二重剰余類に入ることが鍵です。

<!-- proof-start -->
### 証明

$D=\operatorname{diag}(p,1)$ とし、

$$
J=\Gamma\cap D^{-1}\Gamma D,\qquad
J'=\Gamma\cap D\Gamma D^{-1}=DJD^{-1}
$$

と置きます。左剰余類の一致条件を順に書くと、

$$
\begin{aligned}
\Gamma D\gamma=\Gamma D\delta
&\iff D\gamma\delta^{-1}D^{-1}\in\Gamma\\
&\iff \gamma\delta^{-1}\in J\\
&\iff J\gamma=J\delta
\end{aligned}
$$

となります。従って $J\backslash\Gamma$ の代表 $\gamma_j$ は $p+1$ 個で、$D\gamma_j$ は二重剰余類の左代表です。

$pD^{-1}=\operatorname{diag}(1,p)=SDS^{-1}$ なので、逆向きの二重剰余類にも同数の左代表があり、$J'$ の指数も $p+1$ です。

境界の零測度部分を除けば $F_J=\bigcup_j\gamma_j F$ は $J$ の基本領域です。実際、任意の点を $\gamma z$（$z\in F$）と書き、$\gamma=h\gamma_j$（$h\in J$）と分解すればこの領域で代表できます。

内部での重複を調べます。$z,z'\in F^\circ$ と $h\in J$ について、次の等式が成り立つと仮定します。

$$
h\gamma_j z=\gamma_k z'
\quad\Longrightarrow\quad
z'=(\gamma_k^{-1}h\gamma_j)z.
$$

括弧内の行列は $\Gamma$ に属します。[基本領域の存在と内部での一意性](../../MF/MF1/index.md#thm-mf1-fundamental-domain)より $z=z'$ であり、$\gamma_k^{-1}h\gamma_j=\pm I$ です。$\pm I\in J$ なので

$$
J\gamma_j=J\gamma_k
$$

となり、代表の一意性から $j=k$ です。

$DF_J$ は共役部分群 $J'$ の基本領域です。

[面積要素の不変性](../AFR2/index.md#prop-afr2-metric-invariance)を $\gamma_j$ と $D/\sqrt p$ に適用して、

$$
\begin{aligned}
\sum_j\int_F |u(D\gamma_j z)|^2d\mu(z)
&=\int_{F_J}|u(Dw)|^2d\mu(w)\\
&=\int_{DF_J}|u(t)|^2d\mu(t)\\
&=(p+1)\int_F|u(t)|^2d\mu(t).
\end{aligned}
$$

最後の等号は、$u$ が $\Gamma$ 不変なので $J'$ の基本領域を $p+1$ 枚の $F$ に折り畳んだものです。別の基本領域を用いても非負の不変関数の積分が一致するのは、二つの領域を群で重なる可算個の部分に分割し、面積保存の変数変換で対応させられるからです。

この等式から零測度上の代表の違いは作用後も零測度上にしか現れません。さらに有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
\|T_pu\|^2
\le\frac{p+1}{p}\sum_j\int_F |u(D\gamma_j z)|^2d\mu(z)
=\frac{(p+1)^2}{p}\|u\|^2.
$$

混合積は二乗可積分関数の積なので [Petersson内積の絶対可積分性](../AFR3/index.md#def-afr3-petersson) と同じCauchy–Schwarzの評価で絶対可積分です。従って変数変換で

$$
\begin{aligned}
\sqrt p(T_pu,v)
&=\int_{F_J}u(Dw)\overline{v(w)}d\mu(w)\\
&=\int_{DF_J}u(t)\overline{v(D^{-1}t)}d\mu(t).
\end{aligned}
$$

$J'$ の左代表を $\delta_j$ として最後の積分を $\bigcup_j\delta_j F$ で計算します。任意の $h'\in J'$ について $D^{-1}h'D\in J\subset\Gamma$ です。したがって $u(h't)=u(t)$ かつ

$$
v(D^{-1}h't)=v((D^{-1}h'D)D^{-1}t)=v(D^{-1}t)
$$

となります。被積分関数は $J'$ 不変かつ絶対可積分なので基本領域の交換が許されます。$t=\delta_j z$ によって

$$
\sqrt p(T_pu,v)=
\sum_j\int_F u(z)\overline{v(D^{-1}\delta_j z)}d\mu(z).
$$

$D^{-1}$ と $pD^{-1}$ は同じ点移動を与えます。後者の二重剰余類は $D$ のものと一致するため、最後の和は $\sqrt p(u,T_pv)$ です。有界な作用素がHilbert空間全体でこの内積等式を満たすので、自己共役です。
<!-- proof-end -->


特に非零の $u\in H$ が $T_pu=\eta_pu$ を満たせば、$\eta_p=(T_pu,u)/\|u\|^2$ は実数で、$|\eta_p|\le\sqrt p+1/\sqrt p$ です。これは後のより精密な固有値評価とは区別します。定数関数の例では上界に達します。AFR5の一般のEisenstein級数は二乗可積分とは限らないので、この内積による固有値の実数性をそのまま適用できません。

## 4. 非零Fourier係数と固有値

[Maass形式の非零周波数展開](../AFR4/index.md#thm-afr4-maass-expansion)を用います。カスプ形式 $u$ のLaplace固有値を $\lambda$ とし、$\nu^2=1/4-\lambda$ を満たす次数 $\nu$ を選びます。ここで $\rho(n)$ は整数周波数 $n\ne0$ に対応する定数で、$K_\nu$ は [変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel) です。定数項が0なので

$$
u(x+iy)=\sqrt y\sum_{n\ne0}\rho(n)K_\nu(2\pi|n|y)e^{2\pi inx}.
$$

各高さで絶対収束し、横座標 $x$ について一様収束します。以下で $\rho(n/p)$ は $p\nmid n$ のとき0とする約束を置きます。


<a id="thm-afr6-coefficient"></a>
<!-- formal-statement-start -->
> **定理（Maass形式のHecke係数公式）**  
> $p$ を素数、$u$ を [重さ0のMaassカスプ形式](../AFR3/index.md#def-afr3-maass-cusp) とする。$u$ と $T_pu$ の同じ次数 $\nu$（$\nu^2=1/4-\lambda$、$\lambda$ は $u$ のLaplace固有値）を用いた非零周波数展開の係数をそれぞれ $\rho(n),\rho_p(n)$ とする。$p\nmid n$ の場合は $\rho(n/p)=0$ と約束すれば

$$
\rho_p(n)=\rho(pn)+\rho(n/p)
\qquad(n\in\mathbb Z\setminus\{0\})
$$

> である。$T_pu=0$ の場合も全係数を0とすれば成立する。
<!-- formal-statement-end -->

### 証明の見取り図

高さを $p$ 倍する項は周波数も $p$ 倍します。高さを $1/p$ 倍する項は横方向の有限等比和で選別されます。

<!-- proof-start -->
### 証明

$u(pz)/\sqrt p$ に[Maass形式の非零周波数展開](../AFR4/index.md#thm-afr4-maass-expansion)を代入すると

$$
\sqrt y\sum_{m\ne0}\rho(m)K_\nu(2\pi|pm|y)e^{2\pi ipmx}.
$$

周波数 $n$ に寄与するのは $pm=n$ のときだけです。第二項に代入すると

$$
\frac{\sqrt y}{p}\sum_{m\ne0}\rho(m)
K_\nu(2\pi|m|y/p)e^{2\pi imx/p}
\sum_{b=0}^{p-1}e^{2\pi imb/p}.
$$

内側の和は $p\mid m$ なら $p$、それ以外なら0です。後者では比 $q=e^{2\pi im/p}\ne1$ で、$(1-q^p)/(1-q)=0$ となります。$m=pn$ に置き換えると第二項は

$$
\sqrt y\sum_{n\ne0}\rho(pn)K_\nu(2\pi|n|y)e^{2\pi inx}.
$$

各高さでの絶対収束により項の選別と有限和の交換が許されます。二項の和を取り、[非零周波数展開の係数の一意性](../AFR4/index.md#thm-afr4-maass-expansion)を適用します。
<!-- proof-end -->


同時対角化とは一つの基底を選び、全ての作用素が各基底ベクトルをそれぞれ定数倍するようにすることです。互いに異なる素数の作用が交換できれば、この基底を選ぶことができます。

例えば $T_2$ の周波数1は $\rho(2)$、周波数2は $\rho(4)+\rho(1)$ です。正則形式の係数公式と似ていますが、$\sqrt y$ を含む基底と $p^{-1/2}$ の正規化によって二項の係数がともに1になりました。


<a id="thm-afr6-joint"></a>
<!-- formal-statement-start -->
> **定理（カスプ固有空間の同時対角化と係数の漸化式）**  
> 固定したLaplace固有値 $\lambda$ に属する [重さ0のMaassカスプ形式](../AFR3/index.md#def-afr3-maass-cusp) と零関数の空間を $W_\lambda$ とする。この空間は全ての素数Hecke作用素に共通の直交固有基底を持つ。
>
> その非零共通固有関数 $u$ の固有値を $\eta_p$ とする。符号 $\epsilon\in\{1,-1\}$ を $\rho(\epsilon)\ne0$ となるように選べる。正整数 $m$ に対して $c(m)=\rho(\epsilon m)/\rho(\epsilon)$ と置くと

$$
c(1)=1,\qquad c(p)=\eta_p,
$$

$$
c(p^{r+1})=\eta_p c(p^r)-c(p^{r-1})
\quad(r\ge1),
$$

$$
c(mn)=c(m)c(n)\quad(\gcd(m,n)=1)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

有限次元性はAFR3で得ています。異なる素数による添字の掛け算・割り算が可換であることを確かめ、同時対角化の後は、[Maass形式のHecke係数公式](#thm-afr6-coefficient) を用います。

<!-- proof-start -->
### 証明

$W_\lambda$ が零空間なら主張は空の基底で成立します。非零ならカスプ形式はエネルギー実現の定義域に属するので、[エネルギー実現の自己共役性と非負性](../AFR3/index.md#thm-afr3-self-adjoint) により $\lambda\ge0$ です。そこで [カスプ固有値の有限重複度と非集積性](../AFR3/index.md#prop-afr3-cusp-discrete) を区間 $[0,\lambda]$ に適用すると、$W_\lambda$ は有限次元です。[保型固有方程式の保存](#thm-afr6-preserve) から $W_\lambda$ は各 $T_p$ で不変、[自己共役性](#thm-afr6-self-adjoint) から制限も自己共役です。

異なる素数 $p,q$ に対し [係数公式](#thm-afr6-coefficient) を二度使うと、$T_pT_qu$ の係数は

$$
\rho(pqn)+\rho(pn/q)+\rho(qn/p)+\rho(n/(pq)).
$$

例えば $q\mid pn$ と $q\mid n$ は同値なので、整数でない添字を0とする約束も順序交換で一致します。$p,q$ を入れ替えても同じ式です。定数項は0であり、[展開の一意性](../AFR4/index.md#thm-afr4-maass-expansion) から $T_pT_q=T_qT_p$ が従います。同一素数の場合は自明です。

有限次元の自己共役作用素は直交固有基底を持ちます。例えば [MF5の同時固有形式の証明](../../MF/MF5/index.md#thm-mf5-eigenforms) にある有限次元の議論は正則性と無関係です。一つの作用素がスカラー倍でなければ、その固有空間へ直交分解します。他の作用素 $T$ は可換性によって各固有空間を保ちます。実際 $Av=av$ なら $A(Tv)=T(Av)=aTv$ です。各部分空間で再びスカラー倍でない作用素を選び、分解します。真の分割のたびに部分空間の次元が減るので、有限回で全ての作用素がスカラー倍となる部分空間だけが残ります。そこで直交基底を取ればよいです。

[Maass形式のHecke係数公式](#thm-afr6-coefficient) を共通固有関数に適用すると

$$
\eta_p\rho(n)=\rho(pn)+\rho(n/p).
$$

もし $\rho(1)=\rho(-1)=0$ なら、絶対値の帰納法で全係数が0となります。実際 $|n|>1$ に対し素因数 $p$ を選んで $n=pm$ と書くと $\rho(n)=\eta_p\rho(m)-\rho(m/p)$ であり、右辺はより小さい絶対値の係数だけです。定数項も0なので展開から $u=0$ となり矛盾します。

選んだ符号で割ると、$p\nmid m$ なら $c(pm)=\eta_p c(m)$、$m=p^r$ なら表示した漸化式になります。より一般に $p\nmid m$ の場合、

$$
c(p^{r+1}m)=\eta_p c(p^rm)-c(p^{r-1}m)
\quad(r\ge1).
$$

初期値は $c(m)$ と $\eta_p c(m)$ です。$c(p^r)c(m)$ も同じ初期値・漸化式を持つので、帰納法で $c(p^rm)=c(p^r)c(m)$ です。互いに素な $m,n$ について $n$ の素因数を一つずつ取り出してこの等式を繰り返せば乗法性が従います。
<!-- proof-end -->


符号を選ぶ条件は重要です。正則形式と違い、非零周波数は正負両方にあります。ここでは $\rho(1)\ne0$ を無条件には仮定せず、選んだ側を正規化しました。例えば仮に $\eta_2=3/2$、$\eta_3=-1$ なら $c(4)=9/4-1=5/4$、$c(6)=-3/2$ です。これは係数法則の数値模型であって、その固有値を持つ実際のカスプ形式の存在を主張するものではありません。

## 5. Eisenstein級数にも同じ作用を施す

連続的なパラメータを持つ前講の級数でも、Hecke作用の固有値を直接計算できます。


<a id="thm-afr6-eisenstein"></a>
<!-- formal-statement-start -->
> **定理（Eisenstein級数の素数Hecke固有値）**  
> 素数 $p$ と $\Re s>1$ に対し、[非正則Eisenstein級数](../AFR5/index.md#def-afr5-eisenstein) は

$$
T_p E(z,s)=
\left(p^{s-1/2}+p^{1/2-s}\right)E(z,s)
$$

> を満たす。この式は有理型関数として解析接続後も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

原始的な組の条件を外した格子和に戻し、各代表がどの整数行ベクトルを像に持つか数えます。行格子とは行列の二つの行の整数係数線形結合の全体です。

<!-- proof-start -->
### 証明

[Eisenstein級数の格子和表示と収束](../AFR5/index.md#thm-afr5-convergence)を使い、

$$
G(z,s)=\sum_{(c,d)\ne(0,0)}
\left(\frac{y}{|cz+d|^2}\right)^s
=2\zeta(2s)E(z,s)
$$

とします。行ベクトル $v=(c,d)$ に対し $B=\begin{pmatrix}a&b\\e&f\end{pmatrix}$ が行列式 $p$ なら、[一次分数変換の虚部公式](../AFR1/index.md#def-afr1-real-group)を $B/\sqrt p$ に適用すると $\Im(Bz)=py/|ez+f|^2$ です。また

$$
c(Bz)+d=\frac{(ca+de)z+(cb+df)}{ez+f}.
$$

分母 $ez+f$ は零でなく、行ベクトル $vB$ も非零なので、絶対値の二乗を取って虚部の式と割り合わせると

$$
\frac{\Im(Bz)}{|c(Bz)+d|^2}
=\frac{py}{|(ca+de)z+(cb+df)|^2}.
$$

つまり $vB$ の格子和が現れ、倍率は $p^s$ です。各整数行ベクトル $(m,n)$ に対する行列積は

$$
(m,n)D=(pm,n),\qquad
(m,n)B_b=(m,bm+pn).
$$

よって $(h,k)$ が $D$ の行格子に入る条件は $p\mid h$ です。このとき逆像は $(h/p,k)$ です。$B_b$ の行格子に入る条件は $k\equiv bh\pmod p$ で、逆像は $(h,(k-bh)/p)$ です。これで各条件の必要性と十分性が確認できました。

非零の整数組 $(h,k)$ が両成分とも $p$ で割れれば、$p+1$ 個全ての行格子に入ります。

それ以外で $p\mid h$ なら $p\nmid k$ なので $D$ の格子だけに入ります。

$p\nmid h$ なら $h$ は法 $p$ で逆元を持ちます。合同式

$$
b\equiv kh^{-1}\pmod p
$$

を満たす代表 $0\le b<p$ は一意なので、ちょうど一つの行格子に入ります。各行列の行ベクトルへの作用は単射です。

従って絶対収束する和を並べ替えると、

$$
\begin{aligned}
T_pG(z,s)
&=p^{s-1/2}\left(G(z,s)
+p\sum_{(h,k)\in p\mathbb Z^2\setminus\{0\}}
\left(\frac{y}{|hz+k|^2}\right)^s\right)\\
&=p^{s-1/2}(1+p^{1-2s})G(z,s).
\end{aligned}
$$

第二行では $(h,k)=p(c,d)$ と置き、分母の二乗から $p^{-2s}$ を取り出しました。[Riemann ζ 関数のEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product) により $\Re s>1$ では $\zeta(2s)$ は零でないので割ることができます。これで表示式を得ます。[Eisenstein級数の解析接続と関数等式](../AFR5/index.md#thm-afr5-functional) により両辺は $s$ の有理型関数であり、一致の定理により接続後も等しいです。
<!-- proof-end -->


$s=1/2+it$（$t\in\mathbb R$）では係数は $p^{it}+p^{-it}=2\cos(t\log p)$ です。[Eisenstein級数の固有方程式](../AFR5/index.md#thm-afr5-convergence)のLaplace固有値は $s(1-s)=1/4+t^2$ でした。級数が正則かつ非零の点では両方の固有方程式を満たします。これは連続パラメータを持つ固有関数の算術的な目印です。二乗可積分空間の固有基底と同一視せず、連続スペクトルの完全な分解はここでは主張しません。

## 6. 演習と詳細解答

<a id="ex-afr6-a1"></a>
#### AFR6-A1 代表と正規化

- Level: A

$p=3$ の代表を全て書き、$T_3$ を定数関数2に施せ。

<!-- solution-start -->
**詳細解答**

[重さ0の素数Hecke作用素](#def-afr6-hecke) の表示により $\operatorname{diag}(3,1)$ と $\begin{pmatrix}1&b\\0&3\end{pmatrix}$（$b=0,1,2$）の4個です。全て行列式3で、左剰余類の代表条件を満たします。定数2は全移動先で2なので

$$
T_3(2)=\frac{2+2+2+2}{\sqrt3}=\frac8{\sqrt3}.
$$
<!-- solution-end -->

<a id="ex-afr6-a2"></a>
#### AFR6-A2 平均の消失

- Level: A

周期1の滑らかな関数 $u$ の横方向の平均が $a_0(y)=y^2+2/y$ であるとする。$p=2$ で定義式から得る有限和の平均を求めよ。ここでは保型性を仮定しない。

<!-- solution-start -->
**詳細解答**

[平均の変換計算](#thm-afr6-preserve) は周期1だけを用います。第一項は $a_0(2y)=4y^2+1/y$、第二項の合計は $2a_0(y/2)=2(y^2/4+4/y)=y^2/2+8/y$。従って平均は

$$
\frac1{\sqrt2}\left(\frac92y^2+\frac9y\right)
=\frac9{2\sqrt2}a_0(y).
$$

定数項が0でない場合、一般には有限和の平均も0になりません。
<!-- solution-end -->

<a id="ex-afr6-a3"></a>
#### AFR6-A3 周波数の移動

- Level: A

あるMaassカスプ形式の係数が $\rho(1)=2,\rho(2)=3,\rho(3)=-1,\rho(4)=5,\rho(6)=7$ であると仮定した計算模型で、$T_2$ の周波数1,2,3の係数を求めよ。

<!-- solution-start -->
**詳細解答**

[Hecke係数公式](#thm-afr6-coefficient) で $p=2$ とします。整数でない添字は0なので

$$
\rho_2(1)=3,\qquad
\rho_2(2)=5+2=7,\qquad
\rho_2(3)=7+0=7.
$$

元の係数の組が共通固有形式であることは仮定していません。
<!-- solution-end -->

<a id="ex-afr6-a4"></a>
#### AFR6-A4 固有値の範囲

- Level: A

$u\in H$ が非零で $T_5u=\eta u$ とする。$\eta$ の実数性と絶対値の上界を示せ。

<!-- solution-start -->
**詳細解答**

[自己共役性](#thm-afr6-self-adjoint)から

$$
\eta\|u\|^2=(T_5u,u)=(u,T_5u)=\overline\eta\|u\|^2.
$$

$\|u\|^2>0$ より $\eta=\overline\eta$。また同定理の有界性から $|\eta|\|u\|=\|T_5u\|\le6\|u\|/\sqrt5$ なので $|\eta|\le6/\sqrt5$ です。
<!-- solution-end -->

<a id="ex-afr6-b1"></a>
#### AFR6-B1 逆対応の部分群

- Level: B

$p=3$ と $D=\operatorname{diag}(3,1)$ に対して $J=\Gamma\cap D^{-1}\Gamma D$ と $J'=DJD^{-1}$ の整数行列の条件を成分で書き、$SJS^{-1}=J'$ を確認せよ。

<!-- solution-start -->
**詳細解答**

$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in\Gamma$ について

$$
D\gamma D^{-1}=\begin{pmatrix}a&3b\\c/3&d\end{pmatrix}.
$$

従って $J$ は $3\mid c$ の条件です。逆に $D^{-1}\gamma D=\begin{pmatrix}a&b/3\\3c&d\end{pmatrix}$ より $J'$ は $3\mid b$ の条件です。共役 $S\gamma S^{-1}=\begin{pmatrix}d&-c\\-b&a\end{pmatrix}$ は第一条件を第二条件に移します。$S^{-1}$ の共役で戻るので集合の等式が成立します。[自己共役性の対応](#thm-afr6-self-adjoint) がこの具体例で確認できました。
<!-- solution-end -->

<a id="ex-afr6-b2"></a>
#### AFR6-B2 二素数の可換性

- Level: B

$p=2,q=3,n=6$ のとき、二つの順序でHecke係数を計算して一致させよ。

<!-- solution-start -->
**詳細解答**

[係数公式](#thm-afr6-coefficient) から $T_2T_3u$ の係数は $\rho_3(12)+\rho_3(3)$ です。さらに代入すると

$$
\rho(36)+\rho(4)+\rho(9)+\rho(1).
$$

$T_3T_2u$ の係数は $\rho_2(18)+\rho_2(2)$ なので

$$
\rho(36)+\rho(9)+\rho(4)+\rho(1).
$$

四つの項が一致します。異なる素数であるため割り算の条件が独立に働きます。
<!-- solution-end -->

<a id="ex-afr6-b3"></a>
#### AFR6-B3 格子像の数え上げ

- Level: B

$p=3$ とし、行ベクトル $(0,1),(1,2),(3,6)$ がどの代表行列の行格子に入るか求めよ。

<!-- solution-start -->
**詳細解答**

[格子像の計算](#thm-afr6-eisenstein)から $D$ では第一成分が3の倍数、$B_b$ では第二成分が第一成分の $b$ 倍と法3で合同であることが条件です。$(0,1)$ は $D$ のみ、$(1,2)$ は $B_2$ のみです。$(3,6)$ は両成分が3の倍数なので $D,B_0,B_1,B_2$ の全てです。例えば $(3,6)=(1,6)D$、また $(3,6)=(3,2-b)B_b$ と具体的に逆像も書けます。
<!-- solution-end -->

<a id="ex-afr6-c1"></a>
#### AFR6-C1 算術的な係数と生成関数

- Level: C

共通固有関数の正規化された係数 $c$ を考える。仮の固有値を $\eta_2=1/2,\eta_3=2$ として $c(4),c(8),c(9),c(72)$ を求めよ。また任意の素数 $p$ について形式的冪級数（変数 $X$ の各次数の係数を比較する級数）

$$
F_p(X)=\sum_{r\ge0}c(p^r)X^r
$$

に対して $(1-\eta_pX+X^2)F_p(X)=1$ を示せ。収束は仮定しない。

<!-- solution-start -->
**詳細解答**

[同時固有形式の漸化式と乗法性](#thm-afr6-joint) により $c(1)=1,c(2)=1/2,c(3)=2$ です。

$$
c(4)=\tfrac12\cdot\tfrac12-1=-\tfrac34,
$$

$$
c(8)=\tfrac12(-\tfrac34)-\tfrac12=-\tfrac78,\qquad
c(9)=2\cdot2-1=3.
$$

$72=8\cdot9$ で $\gcd(8,9)=1$ だから $c(72)=(-7/8)\cdot3=-21/8$ です。

次に $c_r=c(p^r)$ と書くと、$c_0=1,c_1=\eta_p$ です。形式的冪級数の積は各次数の係数について有限個の積の和で定めます。

$$
(1-\eta_pX+X^2)F_p(X)
=c_0+(c_1-\eta_pc_0)X
+\sum_{r\ge2}(c_r-\eta_pc_{r-1}+c_{r-2})X^r.
$$

一次係数は0で、二次以上も漸化式により全て0です。定数項だけが1なので主張が成立します。この段階では解析的な級数の収束は示しておらず、次講で複素変数の収束域を別に調べます。
<!-- solution-end -->


## 7. 次の講義へ

微分方程式の固有空間をHecke作用で分解すると、選んだ固有関数から乗法的な数列が得られました。次講ではこの数列をDirichlet級数として組み立て、素数ごとの生成関数がEuler積につながる理由を考えます。

## 参考文献

- Daniel Bump, *Automorphic Forms and Representations*, Cambridge University Press.
- Henryk Iwaniec, *Spectral Methods of Automorphic Forms*, American Mathematical Society.
- [MF5 Hecke作用素・固有形式](../../MF/MF5/index.md)、[AFR5 Eisenstein級数と関数等式](../AFR5/index.md)。
