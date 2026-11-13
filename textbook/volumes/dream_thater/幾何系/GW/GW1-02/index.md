# GW1-02 擬正則方程式とエネルギー恒等式

<!-- definition-example-audit: strict -->

## 1. 面積を数えられる写像を、複素座標に頼らず調べる

[前講のべき写像の面積定理](../GW1-01/index.md#thm-gw1-01-power-area)では、射影直線の正則写像の面積が被覆次数を測った。しかし一般のシンプレクティック多様体には、正則関数を定義するための複素座標があるとは限らない。[シンプレクティック多様体](../../SYM/SYM2/index.md#def-sym2-symplectic-manifold)の閉2形式は面積を測れるが、それだけでは「どの写像を曲線として数えるか」を決めない。

そこで、定義域の接方向を90度回す操作と、標的の接方向を回す操作を写像の微分が交換する、と要求する。これが擬正則方程式である。さらに[適合概複素構造と正定値計量](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)を使うと、微分の大きさとシンプレクティック面積の差が、**この方程式の誤差の二乗**となる。これが本講の中心結果である。

以下、$(\Sigma,j)$ は複素1次元の滑らかな複素多様体（Riemann面）、$j:T\Sigma\to T\Sigma$ は複素座標 $z=s+it$ で $j\partial_s=\partial_t$、$j\partial_t=-\partial_s$ と作用する複素構造とする。向きは $ds\wedge dt>0$ とする。必要に応じて $\Sigma$ は境界のないコンパクト曲面であると仮定する。標的 $(X^{2m},\omega)$ はシンプレクティック多様体、$J:TX\to TX$ は $\omega$ に適合する滑らかな概複素構造とする。すなわち $J^2=-I$ であり、各接空間の実双線形形式

$$
g_J(v,w)=\omega(v,Jw)
$$

は[適合性の判定定理](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)によって対称・正定値である。**$J$ が複素座標から生じること（可積分性）は仮定しない。**

## 2. 複素線形な微分を取り出す

実線形写像 $A:T_p\Sigma\to T_{u(p)}X$ が複素線形であるとは、$A(jv)=J(A(v))$ が任意の接ベクトル $v$ で成り立つことをいう。微分 $du_p$ にこの条件を課したいが、一般の $du_p$ はその条件を満たさない。そこで微分を、複素線形な成分と、それに反する成分とに分ける。

<a id="def-gw1-02-cr-operator"></a>

<!-- formal-statement-start -->
> **定義（非線形Cauchy–Riemann作用素）**  
> $(\Sigma,j)$ をRiemann面、$(X,J)$ を滑らかな概複素多様体、$u:\Sigma\to X$ を滑らかな写像とする。$u$ に沿った接束 $u^*TX$ の値を持つ1形式を、各 $p\in\Sigma$、$v\in T_p\Sigma$ について

$$
(\bar\partial_Ju)_p(v)=
\frac12\left(du_p(v)+J_{u(p)}du_p(j_pv)\right)
$$

> で定める。この写像 $u\mapsto\bar\partial_Ju$ を非線形Cauchy–Riemann作用素という。
<!-- formal-statement-end -->

「非線形」は、$J$ を評価する点 $u(p)$ が未知写像 $u$ に依存することを指す。$X=\mathbb C$ で $J$ が一定なら通常のCauchy–Riemann作用素に戻る。

<!-- definition-example-start: def-gw1-02-cr-operator -->
**定義の確認**。$\Sigma=X=\mathbb C$、$j=J=i$（実平面の90度回転）、$u(s,t)=p(s,t)+iq(s,t)$ とする。$\partial_s$ と $\partial_t$ への作用を個別に計算すると

$$
\begin{aligned}
(\bar\partial_Ju)(\partial_s)
&=\tfrac12(u_s+i u_t)
=\tfrac12\{(p_s-q_t)+i(q_s+p_t)\},\\
(\bar\partial_Ju)(\partial_t)
&=\tfrac12(u_t-i u_s)
=-i(\bar\partial_Ju)(\partial_s).
\end{aligned}
$$

両方とも $u^*T\mathbb C$ の接ベクトルであり、実線形性と式の型も一致する。特に $u(s,t)=s+it$ なら $u_s=1$、$u_t=i$ より両方零となる。定数写像でも $du=0$ なので零となる。
<!-- definition-example-end -->

微分の反複素線形成分が消える写像を曲線として採用する。

<a id="def-gw1-02-j-holomorphic"></a>

<!-- formal-statement-start -->
> **定義（擬正則写像）**  
> $(\Sigma,j)$ をRiemann面、$(X,J)$ を概複素多様体とする。滑らかな写像 $u:\Sigma\to X$ が

$$
\bar\partial_Ju=0
$$

> を満たすとき、$u$ を $J$-正則写像、または擬正則写像という。同値な条件は、すべての $p\in\Sigma$ で $du_p\circ j_p=J_{u(p)}\circ du_p$ が成り立つことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-02-j-holomorphic -->
**定義の確認**。複素平面の写像 $u(z)=z^2$ は、$z=s+it$ において

$$
u(s,t)=(s^2-t^2)+i(2st),\quad
u_s=2s+2it,\quad u_t=-2t+2is=i u_s.
$$

従って $\bar\partial_Ju(\partial_s)=\tfrac12(u_s+i u_t)=0$。$\partial_t$ への作用もその $-i$ 倍で零となるので、全ての接ベクトル上で作用素が零となる。定義域・標的とも通常の複素構造を持ち、滑らかさも満たす。
<!-- definition-example-end -->

<a id="prop-gw1-02-local-cr"></a>

<!-- formal-statement-start -->
> **命題（局所Cauchy–Riemann方程式と複素線形性）**  
> $(\Sigma,j)$ をRiemann面、$(X,J)$ を概複素多様体、$u:\Sigma\to X$ を滑らかな写像とする。$\Sigma$ の任意の正則局所座標 $z=s+it$ で、次は同値である。
>
> 1. $\bar\partial_Ju=0$。
> 2. $u_t=J(u)u_s$。
> 3. $du\circ j=J\circ du$。
>
> 特に $X=\mathbb C$、$J=i$、$u=p+iq$ なら、条件は通常の二つの実Cauchy–Riemann方程式に一致する。

$$
p_s=q_t,\qquad p_t=-q_s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\partial_s$ への作用を計算し、$J^2=-I$ によって符号を反転する。$\partial_t=j\partial_s$ に対しても確認すれば、座標基底全体での同値性が得られる。

<!-- proof-start -->
### 証明

定義から $\bar\partial_Ju(\partial_s)=\tfrac12(u_s+Ju_t)$。この値が零なら $u_s+Ju_t=0$。左から $J$ を作用させると $Ju_s+J^2u_t=Ju_s-u_t=0$、よって $u_t=Ju_s$。逆にこの関係を代入すると

$$
\bar\partial_Ju(\partial_s)
=\tfrac12(u_s+J(Ju_s))=0.
$$

さらに

$$
\bar\partial_Ju(\partial_t)
=\tfrac12(u_t-Ju_s)
$$

だから、$u_t=Ju_s$ ならこちらも零である。二つの座標ベクトルが $T_p\Sigma$ を張るため、(1)と(2)は同値となる。

(3)を座標基底に適用すると、$\partial_s$ では $du(j\partial_s)=u_t=Ju_s$、$\partial_t$ では $du(j\partial_t)=-u_s=Ju_t$ となる。後者は前者に $J$ を作用させれば従い、逆も成立する。従って(2)と(3)も同値である。

最後に $X=\mathbb C$ では $J(u_s)=i(p_s+iq_s)=-q_s+ip_s$。$u_t=p_t+iq_t$ と実部・虚部を比較して $p_t=-q_s$ と $q_t=p_s$ を得る。
<!-- proof-end -->

**正則と擬正則のつながり**。標的が複素多様体から来る $J$ を持つ場合、[複素多様体間の正則写像の定義](../../CM/CM1-02/index.md#def-cm1-02-holomorphic-map)は各局所座標で上の実Cauchy–Riemann方程式を満たすことに一致する。一般の $J$ では標的に正則座標を選ぶ必要はなく、接束上の等式で方程式を解釈できる。

## 3. 微分の長さを面積と比較する

写像 $u$ の「エネルギー」は、定義域の二つの互いに直交する単位方向に沿った微分の長さの二乗を足した量で測る。定義域には、$j$ と両立するRiemann計量 $h$ を選ぶ。すなわち $h(jv,jw)=h(v,w)$ とする。局所的に $h=\lambda(s,t)^2(ds^2+dt^2)$ と表せ、$\lambda>0$ である。標的には既述の $g_J$ を用いる。

[GA8で導入した写像のDirichletエネルギー](../../GA/GA8/index.md#def-ga8-map-energy)は、Riemann多様体間の写像の微分を正規直交基底で二乗し、係数 $\tfrac12$ を付けて積分する量である。この定義を本講の $(\Sigma,h)$ と $(X,g_J)$ に適用する。$h$-正規直交基底 $e_1,e_2$ に対し

$$
|du|_{h,g_J}^2
=g_J(du(e_1),du(e_1))+g_J(du(e_2),du(e_2))
$$

と書けば、コンパクトな $\Sigma$ に対するエネルギーは

$$
E(u)=\frac12\int_\Sigma|du|_{h,g_J}^2\,d\operatorname{vol}_h
$$

である。[GA8の正規直交基底の交換計算](../../GA/GA8/index.md#def-ga8-map-energy)により、$|du|^2$ と $E(u)$ は基底の選択に依存しない。同じ方式で $|\bar\partial_Ju|^2$ も定める。後者は、各点で $\bar\partial_Ju:T_p\Sigma\to T_{u(p)}X$ が実線形なので、正規直交基底上で二乗ノルムを足せばよい。

### 直接例：平坦トーラス上の写像

**定義の確認**。$\Sigma=X=\mathbb R^2/\mathbb Z^2$ を座標 $(s,t)$、$(x,y)$ で表した平坦なトーラスとし、$h=ds^2+dt^2$、$\omega=dx\wedge dy$、$J(\partial_x)=\partial_y$、$J(\partial_y)=-\partial_x$ とする。[適合性の直接判定](../../SYM/SYM8/index.md#def-sym8-compatible)により $g_J=dx^2+dy^2$ となる。写像

$$
u([s,t])=[2s-t,s+2t]
$$

は整数係数なので $\mathbb Z^2$ による商の上で一価かつ滑らかである。正規直交基底 $\partial_s,\partial_t$ に対して $u_s=(2,1)$、$u_t=(-1,2)$ だから

$$
|du|^2=5+5=10,\qquad
E(u)=\frac12\cdot10\cdot\operatorname{area}(\Sigma)=5.
$$

基本領域 $[0,1]^2$ の面積は1であり、エネルギーは有限である。

**定義域の計量を取り替えたら？** 二次元で $h'=\rho^2h$（$\rho$ は正の滑らかな関数）とすれば、$h'$ の正規直交基底は $\rho^{-1}e_i$ である。よって $|du|_{h',g_J}^2=\rho^{-2}|du|_{h,g_J}^2$、$d\operatorname{vol}_{h'}=\rho^2d\operatorname{vol}_h$。両者が相殺し、**エネルギーは同じ複素構造に適合する計量の共形倍に依存しない**。以下の恒等式も同様である。

## 4. エネルギーとシンプレクティック面積の差

まず各点で、向き付き $h$-正規直交基底を $e,je$ と取る。この基底が存在するのは $j$ が $h$ に関して等長で、$j^2=-I$ だからである。$a=du(e)$、$b=du(je)$ と置くと、点ごとのエネルギー密度は $\tfrac12(|a|_{g_J}^2+|b|_{g_J}^2)$、2形式 $u^*\omega$ の係数は $(u^*\omega)(e,je)=\omega(a,b)$ となる。

<a id="thm-gw1-02-energy-identity"></a>

<!-- formal-statement-start -->
> **定理（擬正則写像のエネルギー恒等式）**  
> $(\Sigma,j,h)$ を $j$ に適合する計量を持つ向き付きコンパクトRiemann面、$(X,\omega)$ をシンプレクティック多様体、$J$ を $\omega$ に適合する滑らかな概複素構造、$u:\Sigma\to X$ を滑らかな写像とする。各点で次の2形式の等式が成り立つ。

$$
\frac12|du|_{h,g_J}^2\,d\operatorname{vol}_h
=u^*\omega+|\bar\partial_Ju|_{h,g_J}^2\,d\operatorname{vol}_h.
$$

> 従って積分すると

$$
E(u)=\int_\Sigma u^*\omega+
\int_\Sigma|\bar\partial_Ju|_{h,g_J}^2\,d\operatorname{vol}_h.
$$

> $\Sigma$ が境界を持つ場合や非コンパクトでも点ごとの等式は成立し、積分が定義・収束するときに積分形が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[適合計量の等長性](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)で $|Jv|=|v|$ と $g_J(a,Jb)=-\omega(a,b)$ が使える。$\bar\partial_Ju$ を基底 $e,je$ 上で二乗して足すと、二乗和と面積の差が現れる。

<!-- proof-start -->
### 証明

点 $p\in\Sigma$ を固定し、前述の正規直交基底 $e,je$ と $a=du(e)$、$b=du(je)$ を使う。[非線形Cauchy–Riemann作用素](#def-gw1-02-cr-operator)から

$$
(\bar\partial_Ju)(e)=\tfrac12(a+Jb),\qquad
(\bar\partial_Ju)(je)=\tfrac12(b-Ja).
$$

[適合性と正定値内積の同値](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)より $g_J(Jv,Jw)=g_J(v,w)$ である。また $g_J(Ja,b)=\omega(Ja,Jb)=\omega(a,b)$ だから、対称性を用いて

$$
g_J(a,Jb)=-g_J(Ja,b)=-\omega(a,b).
$$

そこで二つの二乗を**別々に**展開する。

$$
\begin{aligned}
|a+Jb|_{g_J}^2
&=|a|^2+|b|^2+2g_J(a,Jb)
=|a|^2+|b|^2-2\omega(a,b),\\
|b-Ja|_{g_J}^2
&=|b|^2+|a|^2-2g_J(b,Ja)
=|a|^2+|b|^2-2\omega(a,b).
\end{aligned}
$$

したがって

$$
\begin{aligned}
|\bar\partial_Ju|^2
&=\tfrac14\bigl(|a+Jb|^2+|b-Ja|^2\bigr)\\
&=\tfrac12(|a|^2+|b|^2)-\omega(a,b)\\
&=\tfrac12|du|^2-(u^*\omega)(e,je).
\end{aligned}
$$

向き付き正規直交基底では $d\operatorname{vol}_h(e,je)=1$ なので、この実数の等式に体積形式を掛ければ主張した2形式の等式を得る。コンパクトな $\Sigma$ と滑らかな $u$ では全ての項が連続で積分可能であるから、両辺を積分してエネルギーの等式を得る。
<!-- proof-end -->

**等号になるのはどんなときか。** 誤差項は正定値計量に関する二乗ノルムの積分で非負である。従って $E(u)\ge\int_\Sigma u^*\omega$。等号なら連続で非負の関数 $|\bar\partial_Ju|^2$ の積分が零である。もしある点で正なら近傍でも正となり積分が正になるので、全点で零でなければならない。よって等号はちょうど $J$-正則写像のときに成立する。

ここで二つの落とし穴がある。第一に、**任意の滑らかな写像について面積とエネルギーが等しいわけではない**。第二に、$\int u^*\omega$ は向き付きの符号を持つ量であり、一般の写像では負になり得る。

### 具体例：向きを反転させる写像

平坦トーラス $T^2=\mathbb R^2/\mathbb Z^2$ 上で $u([s,t])=[s,-t]$ とする。$u_s=(1,0)$、$u_t=(0,-1)$ だから

$$
\frac12|du|^2=\frac12(1+1)=1,\qquad
(u^*\omega)(\partial_s,\partial_t)=\det\begin{pmatrix}1&0\\0&-1\end{pmatrix}=-1.
$$

従って $E(u)=1$、$\int_{T^2}u^*\omega=-1$。また $\bar\partial_Ju(\partial_s)=\tfrac12((1,0)+J(0,-1))=(1,0)$、$\bar\partial_Ju(\partial_t)=(0,-1)$ で

$$
\int_{T^2}|\bar\partial_Ju|^2\,d\operatorname{vol}=2,\qquad
1=-1+2.
$$

この写像は $u_t\ne Ju_s$ なので擬正則ではない。「適合性」を外す場合も、$g_J$ の正定値性と上の二乗展開が失われるため、このままのエネルギーの議論は使えない。

## 5. 閉じた定義域で面積が変形に依存しない理由

シンプレクティック形式の閉性 $d\omega=0$ が、局所的なエネルギー計算を曲線類と結び付ける。ここでは「閉じたRiemann面」とは、**コンパクトで境界のない**Riemann面を指す。

<a id="prop-gw1-02-homotopy-area"></a>

<!-- formal-statement-start -->
> **命題（閉曲面からの写像のシンプレクティック面積はホモトピー不変）**  
> $\Sigma$ をコンパクトで境界のない向き付き滑らかな曲面、$(X,\omega)$ を $d\omega=0$ を満たす滑らかな2形式を持つ多様体とする。滑らかなホモトピー $H:[0,1]\times\Sigma\to X$ の両端を $u_0(p)=H(0,p)$、$u_1(p)=H(1,p)$ とすれば

$$
\int_\Sigma u_1^*\omega=\int_\Sigma u_0^*\omega.
$$

> 特に $\Sigma$ が閉Riemann面で $\beta=u_*[\Sigma]$ なら、面積は $\langle[\omega],\beta\rangle$ と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

円筒 $[0,1]\times\Sigma$ の境界は、終端の曲面から始端の曲面を引いたものとなる。[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)と $d\omega=0$ を使う。境界がある定義域では円筒の側面が残り、結論はそのままでは成立しない。

<!-- proof-start -->
### 証明

$M=[0,1]\times\Sigma$ に積の向きを与える。$\partial\Sigma=\varnothing$ だから境界は向き付きで

$$
\partial M=(\{1\}\times\Sigma)-(\{0\}\times\Sigma).
$$

[微分形式の引き戻しと外微分の可換性](../../GEO/GEO7/index.md#thm-geo7-pullback-commutes-d)により $d(H^*\omega)=H^*(d\omega)=0$ である。[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を3次元のコンパクト境界付き多様体 $M$ と2形式 $H^*\omega$ に適用して

$$
\begin{aligned}
0&=\int_M d(H^*\omega)
=\int_{\partial M}H^*\omega\\
&=\int_{\Sigma}u_1^*\omega-\int_\Sigma u_0^*\omega.
\end{aligned}
$$

従って積分は等しい。閉2形式のde Rham類 $[\omega]$ と、向き付き閉曲面の基本類 $[\Sigma]$ に対する評価は、定義により $\int_\Sigma u^*\omega=\langle[\omega],u_*[\Sigma]\rangle$ である。
<!-- proof-end -->

**境界条件の意味**。もし $\partial\Sigma\ne\varnothing$ なら $\partial([0,1]\times\Sigma)$ に $[0,1]\times\partial\Sigma$ が追加される。たとえば単位円盤から $\mathbb R^2$ への $u_a(s,t)=(as,at)$（$a\ge0$）はホモトピーでつながるが、$\int u_a^*(dx\wedge dy)=\pi a^2$ は変化する。境界で写像を固定しないからである。

<a id="cor-gw1-02-energy-area"></a>

<!-- formal-statement-start -->
> **系（擬正則写像のエネルギーと面積）**  
> $(\Sigma,j,h)$ を連結な閉Riemann面、$(X,\omega,J)$ を $J$ が $\omega$ に適合するシンプレクティック多様体とする。滑らかな $J$-正則写像 $u:\Sigma\to X$ と $\beta=u_*[\Sigma]$ に対し

$$
E(u)=\int_\Sigma u^*\omega
=\langle[\omega],\beta\rangle\ge0.
$$

> 等号 $E(u)=0$ は $u$ が定数写像であることと同値である。非定数なら面積は正である。
<!-- formal-statement-end -->

### 証明の見取り図

擬正則条件を[擬正則写像のエネルギー恒等式](#thm-gw1-02-energy-identity)へ代入する。零エネルギーなら微分が全点で零となり、連結性から写像が定数と分かる。

<!-- proof-start -->
### 証明

[擬正則写像の定義](#def-gw1-02-j-holomorphic)から $\bar\partial_Ju=0$ なので、[擬正則写像のエネルギー恒等式](#thm-gw1-02-energy-identity)の誤差項が零となり $E(u)=\int_\Sigma u^*\omega$。面積の類による表示は[ホモトピー不変性の命題](#prop-gw1-02-homotopy-area)の末尾に示した評価式である。

$g_J$ は正定値なので $|du|^2\ge0$。従って $E(u)\ge0$。$E(u)=0$ なら、非負連続関数 $|du|^2$ の積分が零だから $du=0$ が全点で成り立つ。各座標近傍では曲線に沿って微分すると値が一定で、$u$ は局所定数写像である。連結な $\Sigma$ 上では局所定数写像は定数となる。逆に定数なら $du=0$ なので $E(u)=0$。
<!-- proof-end -->

## 6. 射影直線と定数写像で確かめる

[大域Fubini–Study形式](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)と標準複素構造 $J$ の組を $X=\mathbb{CP}^1$ に入れ、定義域にも同じ複素構造と適合計量を入れる。有限チャート $z=s+it$、$w=f_d(z)=z^d$（整数 $d\ge1$）では

$$
(f_d)_s=d z^{d-1},\qquad
(f_d)_t=i d z^{d-1}=J(f_d)(f_d)_s.
$$

無限遠点のチャートでも $w'=1/w=(1/z)^d=(z')^d$ となり同じ関係を満たす。従って $f_d$ は球面全体で $J$-正則である。臨界点 $z=0$（$d>1$）では微分が零だが、方程式はなお成立する。**はめ込みであることは定義の条件ではない。**

[べき写像の面積定理](../GW1-01/index.md#thm-gw1-01-power-area)では $\int_{\mathbb{CP}^1}f_d^*\omega_{\mathrm{FS}}=2\pi d$ を直接積分した。[エネルギーと面積の系](#cor-gw1-02-energy-area)に代入すれば

$$
E(f_d)=2\pi d,\qquad
\int_{\mathbb{CP}^1}|\bar\partial_Jf_d|^2\,d\operatorname{vol}=0.
$$

定数写像 $u\equiv x_0$（$x_0\in X$）なら $du=0$、$\bar\partial_Ju=0$、$u^*\omega=0$ だから $E(u)=0$。従って零エネルギーの曲線も定義には含まれる。

この面積の規格化を変えれば、例えば $\omega'=\omega_{\mathrm{FS}}/(2\pi)$ に対し適合計量も $g'_J=g_J/(2\pi)$ とすれば $E'(f_d)=d$ となる。一方、同じ $\omega_{\mathrm{FS}}$ のままエネルギーの係数 $1/2$ だけを落とすと本講の恒等式と整合しない。**$2\pi$、$1/2$、向きの符号を一組として扱う。**

## 7. 演習：局所方程式・面積・エネルギーの連結

### Level A

<a id="ex-gw1-02-a01"></a>
#### GW1-02-A01 局所方程式を実成分へ戻す
- Level: A

$\mathbb C$ の標準複素構造の下で $u(s,t)=(s^2-t^2,2st)$ とする。$\bar\partial_Ju$ を両座標方向で計算し、擬正則性を判定せよ。

<!-- solution-start -->
**詳細解答**。$p_s=2s$、$p_t=-2t$、$q_s=2t$、$q_t=2s$ だから

$$
\begin{aligned}
(\bar\partial_Ju)(\partial_s)
&=\tfrac12\{(p_s-q_t)+i(q_s+p_t)\}\\
&=\tfrac12\{(2s-2s)+i(2t-2t)\}=0,\\
(\bar\partial_Ju)(\partial_t)
&=-i(\bar\partial_Ju)(\partial_s)=0.
\end{aligned}
$$

二つの座標方向で零なので[本講の擬正則条件の同値命題](#prop-gw1-02-local-cr)により全接ベクトルで $\bar\partial_Ju=0$。従って擬正則である。
<!-- solution-end -->

<a id="ex-gw1-02-a02"></a>
#### GW1-02-A02 定数写像の三つの量
- Level: A

閉Riemann面 $(\Sigma,j,h)$ から適合構造を持つ $(X,\omega,J)$ への定数写像 $u(p)=x_0$ について、$\bar\partial_Ju$、$E(u)$、$\int_\Sigma u^*\omega$ を定義から計算せよ。

<!-- solution-start -->
**詳細解答**。どの点でも $du_p:T_p\Sigma\to T_{x_0}X$ は零写像である。従って[作用素の定義](#def-gw1-02-cr-operator)の二項はともに零で $\bar\partial_Ju=0$。[写像のDirichletエネルギーの定義](../../GA/GA8/index.md#def-ga8-map-energy)では $|du|^2=0$ なので $E(u)=0$。2形式の引き戻しも $u^*\omega(v,w)=\omega(du(v),du(w))=0$ であり、積分は零。すべての項が $0=0+0$ と一致する。
<!-- solution-end -->

<a id="ex-gw1-02-a03"></a>
#### GW1-02-A03 トーラス上の正則な整数行列
- Level: A

平坦な単位トーラス $T^2$ で $h=ds^2+dt^2$、$\omega=dx\wedge dy$、標準 $J$ とする。$u([s,t])=[2s-t,s+2t]$ について $u_t=Ju_s$、$E(u)$、$\int u^*\omega$ を計算せよ。

<!-- solution-start -->
**詳細解答**。整数係数のため商写像は一価で滑らか。$u_s=(2,1)$ で $Ju_s=(-1,2)=u_t$ だから[局所方程式](#prop-gw1-02-local-cr)を満たす。二つの微分の二乗は各5で、面積1の定義域上で

$$
E(u)=\int_{T^2}\tfrac12(5+5)\,ds\,dt=5.
$$

引き戻した面積形式は

$$
u^*(dx\wedge dy)
=\det\begin{pmatrix}2&-1\\1&2\end{pmatrix}ds\wedge dt
=5\,ds\wedge dt.
$$

従って $\int u^*\omega=5$。適合条件と向きが一致することも確認できた。
<!-- solution-end -->

<a id="ex-gw1-02-a04"></a>
#### GW1-02-A04 反正則写像は等号を満たさない
- Level: A

A03と同じ平坦な単位トーラス上で $u([s,t])=[s,-t]$ とする。$E(u)$、$\int u^*\omega$、$\int|\bar\partial_Ju|^2$ を求め、エネルギー恒等式を照合せよ。

<!-- solution-start -->
**詳細解答**。$u_s=(1,0)$、$u_t=(0,-1)$ より $|du|^2=1+1=2$、したがって $E(u)=1$。引き戻しの係数は $\det\operatorname{diag}(1,-1)=-1$ だから $\int u^*\omega=-1$。

$J(x,y)=(-y,x)$ とすると $\bar\partial_Ju(\partial_s)=\tfrac12((1,0)+(1,0))=(1,0)$、$\bar\partial_Ju(\partial_t)=\tfrac12((0,-1)-(0,1))=(0,-1)$。二乗和は2、積分も2である。よって $E=1=-1+2$。$\bar\partial_Ju\ne0$ なので[擬正則写像のエネルギー恒等式](#thm-gw1-02-energy-identity)の等号条件を満たさない。
<!-- solution-end -->

<a id="ex-gw1-02-a05"></a>
#### GW1-02-A05 共形倍でエネルギーは変わるか
- Level: A

向き付きRiemann面上の適合計量を $h'=\rho^2h$（$\rho>0$ は滑らかな関数）に変更する。$|du|^2$ と体積形式がどう変換され、Dirichletエネルギーがどうなるか示せ。

<!-- solution-start -->
**詳細解答**。$h$-正規直交基底を $e_1,e_2$ とすると、$h'$-正規直交基底は $e'_i=\rho^{-1}e_i$。微分の線形性から $du(e'_i)=\rho^{-1}du(e_i)$ なので

$$
|du|_{h',g_J}^2
=\sum_i|du(\rho^{-1}e_i)|^2
=\rho^{-2}|du|_{h,g_J}^2.
$$

二次元では基底方向を二つとも $\rho$ 倍した体積が $\rho^2$ 倍になるから $d\operatorname{vol}_{h'}=\rho^2d\operatorname{vol}_h$。積分の被積分形式の積は元と一致し、$E_{h'}(u)=E_h(u)$。
<!-- solution-end -->

### Level B

<a id="ex-gw1-02-b01"></a>
#### GW1-02-B01 局所エネルギー恒等式を実成分だけで証明する
- Level: B

標準平面で $u=p+iq$、定義域計量は $ds^2+dt^2$、標的は $\omega=dx\wedge dy$ と $g_J=dx^2+dy^2$ とする。$\bar\partial_Ju$ の実成分から、点ごとのエネルギー密度と面積の差を計算せよ。

<!-- solution-start -->
**詳細解答**。[作用素の局所式](#def-gw1-02-cr-operator)から

$$
|\bar\partial_Ju|^2
=\tfrac12\{(p_s-q_t)^2+(q_s+p_t)^2\}.
$$

展開して混合項を整理すると

$$
\begin{aligned}
|\bar\partial_Ju|^2
&=\tfrac12(p_s^2+q_t^2-2p_sq_t+q_s^2+p_t^2+2q_sp_t)\\
&=\tfrac12(p_s^2+p_t^2+q_s^2+q_t^2)
-(p_sq_t-p_tq_s).
\end{aligned}
$$

第一項は $\tfrac12|du|^2$、第二項は $(u^*\omega)(\partial_s,\partial_t)$ なので、$|\bar\partial_Ju|^2=\tfrac12|du|^2-\omega(u_s,u_t)$。面積形式 $ds\wedge dt$ を掛ければ[擬正則写像のエネルギー恒等式](#thm-gw1-02-energy-identity)の点ごとの形が得られる。
<!-- solution-end -->

<a id="ex-gw1-02-b02"></a>
#### GW1-02-B02 一般の整数行列で等号条件を分類する
- Level: B

平坦な単位トーラスの写像 $u([s,t])=[as+bt,cs+dt]$（$a,b,c,d\in\mathbb Z$）に対し、$E(u)$、$\int u^*\omega$、$\int|\bar\partial_Ju|^2$ を求めよ。さらに擬正則となる整数行列をすべて記述せよ。

<!-- solution-start -->
**詳細解答**。整数係数なので商上に一価な滑らかな写像を定める。$u_s=(a,c)$、$u_t=(b,d)$ であるから

$$
E(u)=\frac12(a^2+b^2+c^2+d^2)
$$

となる。面積の引き戻しは行列式に等しく

$$
\int_{T^2}u^*\omega=ad-bc.
$$

一方、[作用素の定義](#def-gw1-02-cr-operator)から $\bar\partial_Ju(\partial_s)=\tfrac12((a,c)+J(b,d))=\tfrac12(a-d,c+b)$。$\partial_t$ での値は $-J$ を掛けたもので、二つの長さが等しい。従って

$$
\int_{T^2}|\bar\partial_Ju|^2
=\tfrac12\{(a-d)^2+(b+c)^2\}.
$$

展開すれば

$$
\tfrac12(a^2+b^2+c^2+d^2)-(ad-bc)
=\tfrac12\{(a-d)^2+(b+c)^2\}
$$

と一致する。二乗和が零となる必要十分条件は $a=d$ かつ $b=-c$。したがって求める整数行列は $\begin{pmatrix}a&-c\\c&a\end{pmatrix}$ であり、その面積は $a^2+c^2\ge0$。
<!-- solution-end -->

<a id="ex-gw1-02-b03"></a>
#### GW1-02-B03 射影直線の次数とエネルギー
- Level: B

$X=\Sigma=\mathbb{CP}^1$ に標準複素構造と Fubini–Study形式を入れる。整数 $d\ge1$ に対し $f_d([s:t])=[s^d:t^d]$ が $J$-正則であることを両チャートで示し、$E(f_d)$ と $\int|\bar\partial_J f_d|^2$ を求めよ。

<!-- solution-start -->
**詳細解答**。$t\ne0$ の座標 $z=s/t$ では $f_d(z)=z^d$、$(f_d)_t=i(f_d)_s$ が成り立つ（ここで添字 $t$ は局所実座標の虚部方向を指す）。$s\ne0$ の座標 $\zeta=t/s$ と、標的の対応座標では写像も $\zeta\mapsto\zeta^d$ であるため、同じ微分関係が成立する。よって[局所方程式](#prop-gw1-02-local-cr)から全域で擬正則である。

[べき写像の正規化面積と逆像数](../GW1-01/index.md#thm-gw1-01-power-area)では $\int f_d^*\omega_{\mathrm{FS}}=2\pi d$ と計算した。これを[擬正則写像のエネルギーの系](#cor-gw1-02-energy-area)に適用し、$E(f_d)=2\pi d$。擬正則条件により $\bar\partial_Jf_d=0$ なので二乗ノルムの積分は零である。$d>1$ で枝点があってもこの判定は変わらない。
<!-- solution-end -->

<a id="ex-gw1-02-b04"></a>
#### GW1-02-B04 境界があると面積が変わる
- Level: B

閉単位円盤 $D=\{(s,t):s^2+t^2\le1\}$ と $\omega=dx\wedge dy$ を考える。$u_a(s,t)=(as,at)$（$a\ge0$）の面積を計算し、$a$ を連続的に変えても面積が一定とは限らない理由を、Stokesの証明で失われる仮定から説明せよ。

<!-- solution-start -->
**詳細解答**。$du_a(\partial_s)=(a,0)$、$du_a(\partial_t)=(0,a)$ なので $u_a^*\omega=a^2ds\wedge dt$。従って

$$
\int_Du_a^*\omega=a^2\int_Dds\,dt=\pi a^2.
$$

$a$ を連続に変えるホモトピーは存在するが、$D$ に境界がある。[ホモトピー不変性の証明](#prop-gw1-02-homotopy-area)に使った円筒の境界には、終端と始端のほかに $[0,1]\times\partial D$ が加わり、その積分は一般に零でない。従って閉曲面の場合と同じ式を引くことはできない。なお $a=0$ は定数写像であり、$\pi a^2$ が零となることにも矛盾はない。
<!-- solution-end -->

### Level C

<a id="ex-gw1-02-c01"></a>
#### GW1-02-C01 等号条件・次数・符号を一つの計算で照合する
- Level: C

平坦な単位トーラス $T^2=\mathbb R^2/\mathbb Z^2$ を標準の $h,\omega,J$ で考える。整数行列

$$
A=\begin{pmatrix}2&1\\-1&1\end{pmatrix},\qquad
B=\begin{pmatrix}2&1\\-1&2\end{pmatrix}
$$

の各々が誘導する写像 $u_A,u_B$ について次を示せ。

1. どちらも商上の滑らかな写像である。複素線形な微分を持つ方を判定せよ。
2. 両写像のエネルギー・シンプレクティック面積・誤差項を求め、恒等式を検証せよ。
3. $u_A$ と同じホモトピー類の滑らかな写像について、エネルギーが $3$ 未満になれないことを示せ。この下界が達成されるかどうかも、使った不等式から判断できる範囲を述べよ。
4. $A$ の写像の面積が正でも、$J$-正則とは限らないことを説明せよ。

<!-- solution-start -->
**詳細解答**。

**（1）** 行列 $A,B$ の各成分は整数だから、$(s,t)$ を整数格子だけ変えても像の座標は整数格子だけ変わる。よって双方とも商上で一価かつ滑らかである。標準複素構造で $u_t=Ju_s$ となる条件は[局所方程式](#prop-gw1-02-local-cr)から、行列の成分を $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と書けば $a=d$、$b=-c$。$B$ は $(a,d)=(2,2)$、$(b,c)=(1,-1)$ だから満たす。$A$ は $a=2,d=1$ なので満たさない。

**（2）** $A$ では $u_s=(2,-1)$、$u_t=(1,1)$。二乗和は $5+2=7$、面積は $\det A=2\cdot1-1\cdot(-1)=3$。従って

$$
E(u_A)=\tfrac72,\quad
\int_{T^2}u_A^*\omega=3,\quad
\int_{T^2}|\bar\partial_Ju_A|^2
=\tfrac12\{(2-1)^2+(1-1)^2\}=\tfrac12.
$$

右辺は $3+\tfrac12=\tfrac72$ で一致する。

$B$ では $u_s=(2,-1)$、$u_t=(1,2)$。二乗和は $5+5=10$、面積は $\det B=2\cdot2-1\cdot(-1)=5$。従って

$$
E(u_B)=5,\quad
\int_{T^2}u_B^*\omega=5,\quad
\int_{T^2}|\bar\partial_Ju_B|^2
=\tfrac12\{(2-2)^2+(1-1)^2\}=0.
$$

**（3）** [閉曲面上の面積のホモトピー不変性](#prop-gw1-02-homotopy-area)により、$u_A$ と滑らかにホモトピー同値な写像 $v$ について、シンプレクティック面積は $3$ のままである。[擬正則写像のエネルギー恒等式](#thm-gw1-02-energy-identity)を適用すると

$$
E(v)=3+\int_{T^2}|\bar\partial_Jv|^2\,d\operatorname{vol}\ge3.
$$

したがって **$E(v)<3$ は不可能** である。等号を達成するには $\bar\partial_Jv=0$ が必要だが、この不等式だけではそのような写像の存在は分からない。実際に $u_A$ 自身の誤差項は $\tfrac12$ なので、$u_A$ は下界を達成していない。

**（4）** $u_A$ は面積3で正だが、（1）のとおり $u_t\ne Ju_s$ であり、誤差項は $\tfrac12>0$ である。正の面積だけでは擬正則性を保証しない。一方、$u_B$ は等号を満たす。
<!-- solution-end -->

## 8. 次講で何が問題になるか

本講では、滑らかな写像について点ごとの恒等式を完全に導出した。閉じた定義域からの擬正則写像は $E(u)=\langle[\omega],u_*[\Sigma]\rangle$ を満たすので、同じ曲線類の写像のエネルギーは一定である。しかし**エネルギーが一定だから写像列が滑らかに収束する**とは限らない。

次講では、擬正則方程式を写像の近くで線形化し、局所楕円型評価とFredholm性がどのように現れるかを調べる。その後、微分が一部に集中して球面の泡ができる現象へ進む。
