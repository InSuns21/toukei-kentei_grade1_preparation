# RBD6 慣性テンソルの座標変換と具体物体

<!-- definition-example-audit: strict -->

> **前提**：[MECH8 の慣性テンソル](../../MECH/MECH8/index.md#def-mech8-inertia-tensor)、[MECH8 の主軸・主慣性モーメント](../../MECH/MECH8/index.md#def-mech8-principal-axis)と[主軸の存在](../../MECH/MECH8/index.md#thm-mech8-principal-axis-existence)、[RBD1 の剛体配置](../RBD1/index.md#def-rbd1-configuration)、[RBD3 の空間・物体角速度](../RBD3/index.md#def-rbd3-angular-velocity)を用います。$R$ は**物体固定成分を空間成分へ移す**右手系の能動回転、すなわち $R^{\mathsf T}R=I_3$、$\det R=1$ です。

## 1. 同じ物体なのに慣性テンソルの数字が変わるのはなぜか

質量が一様な直方体を手で持って向きを変えても、質量や辺の長さは変わりません。しかし、実験室に固定した $x,y,z$ 軸から見た慣性テンソルの行列成分は変わります。一方、物体に描いた軸を使えば、質量分布は常に同じです。

[MECH8 の定義](../../MECH/MECH8/index.md#def-mech8-inertia-tensor)によれば、重心 $C$ からの位置を $u$、質量要素を $dm$ とすると、慣性テンソルは

$$
J_C=\int\bigl(|u|^2I_3-uu^{\mathsf T}\bigr)\,dm
$$

です。同じ物体を二つの座標系で計算し直すより、**座標を変える法則**を作る方が確実です。その後、密度と積分領域をはっきり定めて円柱・円板・直方体を計算します。

全質量を $M>0$ とし、物体固定の重心基準位置を $u_b$、空間基準位置を $u_s=Ru_b$ と書きます。下付き添字 $b$ は物体系、$s$ は空間系です。各成分は同じ質量要素を指しており、回転で $dm$ 自体は変わりません。

## 2. 物体固定成分と空間成分を結ぶ

まず対角の慣性テンソルを空間座標へ移すと、一般には非対角成分が現れます。これは新たな相互作用ではなく、基底を傾けた結果です。

<a id="thm-rbd6-inertia-rotation"></a>

<!-- formal-statement-start -->
### 定理（慣性テンソルの座標変換）

有限の正の総質量 $M$ と有限の二次質量モーメントをもつ三次元剛体について、同じ重心 $C$ を原点とした物体系と空間系を考える。物体系から空間系への回転行列 $R\in SO(3)$ に対し、各座標系での慣性テンソルを $J_b,J_s$ とする。このとき

$$
\boxed{J_s=RJ_bR^{\mathsf T}}.
$$

さらに角速度成分 $\omega_s=R\omega_b$ に対応する角運動量は

$$
L_s=RL_b,\qquad L_b=J_b\omega_b,\qquad L_s=J_s\omega_s
$$

である。$J_b$ と $J_s$ の固有値（主慣性モーメント）は重複度込みで一致する。
<!-- formal-statement-end -->

### 証明の見取り図

各質量要素について $u_s=Ru_b$ を定義式へ代入します。直交行列だから $|Ru_b|=|u_b|$、$RI_3R^{\mathsf T}=I_3$ です。したがって行列 $R$ を積分の外へ出せます。固有ベクトルにも $R$ を掛けると固有値が変わらないことが分かります。

<!-- proof-start -->
### 証明

[慣性テンソルの定義](../../MECH/MECH8/index.md#def-mech8-inertia-tensor)を空間成分に適用すると

$$
J_s=\int\left(|u_s|^2I_3-u_su_s^{\mathsf T}\right)\,dm.
$$

$u_s=Ru_b$、$R^{\mathsf T}R=I_3$ より

$$
|u_s|^2=u_b^{\mathsf T}R^{\mathsf T}Ru_b=|u_b|^2,
\qquad
u_su_s^{\mathsf T}=Ru_bu_b^{\mathsf T}R^{\mathsf T}.
$$

したがって被積分行列は

$$
\begin{aligned}
|u_s|^2I_3-u_su_s^{\mathsf T}
&=R\bigl(|u_b|^2I_3-u_bu_b^{\mathsf T}\bigr)R^{\mathsf T}.
\end{aligned}
$$

$R$ は同じ時刻の剛体全体で一定なので

$$
J_s=R\left[\int\bigl(|u_b|^2I_3-u_bu_b^{\mathsf T}\bigr)\,dm\right]R^{\mathsf T}
=RJ_bR^{\mathsf T}.
$$

[MECH8 の角運動量の公式](../../MECH/MECH8/index.md#thm-mech8-inertia-relations)を両座標系に適用すると

$$
J_s\omega_s=RJ_bR^{\mathsf T}R\omega_b
=RJ_b\omega_b=RL_b.
$$

最後に $J_bv=\lambda v$、$v\ne0$ なら

$$
J_s(Rv)=RJ_bR^{\mathsf T}Rv=RJ_bv=\lambda Rv.
$$

$R$ は可逆なので $Rv\ne0$ です。逆変換 $R^{\mathsf T}$ も同様に使えるため、すべての固有値とその重複度は一致します。
<!-- proof-end -->

例えば $J_b=\operatorname{diag}(I_1,I_2,I_3)$ を $z$ 軸まわりに角 $\alpha$ だけ回すと、$c=\cos\alpha,\ s=\sin\alpha$ として

$$
R=\begin{pmatrix}c&-s&0\\s&c&0\\0&0&1\end{pmatrix},
$$

$$
J_s=
\begin{pmatrix}
I_1c^2+I_2s^2&(I_1-I_2)cs&0\\
(I_1-I_2)cs&I_1s^2+I_2c^2&0\\
0&0&I_3
\end{pmatrix}.
$$

ここで $I_1\ne I_2$、$\alpha=\pi/4$ とすれば非対角成分は $(I_1-I_2)/2$ です。$J_s$ が対角でなくても主慣性値は変わりません。また $I_1=I_2$ なら、$z$ 軸まわりに回しても行列成分は変わりません。この違いは第6節の縮退につながります。

## 3. 基準点を移す：テンソル形の平行軸公式

座標軸の**向きを変える**操作と、軸の**通る点を変える**操作は別です。[MECH8 の平行軸の定理](../../MECH/MECH8/index.md#thm-mech8-parallel-axis)は一本の軸に対する式ですが、三次元のすべての軸を同時に扱うには行列の形が便利です。

<a id="thm-rbd6-parallel-axis-tensor"></a>

<!-- formal-statement-start -->
### 定理（平行軸のテンソル公式）

有限の正の総質量 $M$ と有限の二次質量モーメントをもつ剛体の重心を $C$、別の基準点を $O$ とする。両テンソルを**同じ向きの正規直交座標系**で表す。$d=C-O$ を $O$ から $C$ への位置ベクトル、$J_C$ と $J_O$ を各点まわりの慣性テンソルとすると

$$
\boxed{J_O=J_C+M\bigl(|d|^2I_3-dd^{\mathsf T}\bigr)}.
$$

とくに単位方向 $n$ を軸方向とする二本の平行軸の慣性モーメント差は

$$
n^{\mathsf T}(J_O-J_C)n=M\bigl(|d|^2-(n\cdot d)^2\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

各質量要素の位置を $r_O=d+u$ と表し、$u$ は重心基準とします。$uu^{\mathsf T}$ と $|u|^2$ の二次式をそれぞれ展開します。一次項は $\int u\,dm=0$ で消えます。

<!-- proof-start -->
### 証明

$u=r-C$ と置けば $r-O=u+d$、[MECH7 の重心の定義](../../MECH/MECH7/index.md#def-mech7-center-of-mass)より $\int u\,dm=0$ です。

$$
|u+d|^2=|u|^2+2u\cdot d+|d|^2
$$

と

$$
(u+d)(u+d)^{\mathsf T}=uu^{\mathsf T}+ud^{\mathsf T}+du^{\mathsf T}+dd^{\mathsf T}
$$

を慣性テンソルの積分へ代入すると

$$
\begin{aligned}
J_O
&=\int\bigl(|u+d|^2I_3-(u+d)(u+d)^{\mathsf T}\bigr)\,dm\\
&=J_C+\int\bigl(2(u\cdot d)I_3-ud^{\mathsf T}-du^{\mathsf T}\bigr)\,dm\\
&\quad+\int\bigl(|d|^2I_3-dd^{\mathsf T}\bigr)\,dm.
\end{aligned}
$$

中段の三項はすべて $\int u\,dm=0$ で消え、最終項は位置に依らないので $M$ 倍となります。単位ベクトル $n$ で左右から挟めば

$$
n^{\mathsf T}(|d|^2I_3-dd^{\mathsf T})n
=|d|^2-(n\cdot d)^2
$$

です。これは $d$ の軸に垂直な成分の長さの二乗だから、[スカラーの平行軸の定理](../../MECH/MECH8/index.md#thm-mech8-parallel-axis)とも一致します。
<!-- proof-end -->

たとえば $d=(a,0,0)^{\mathsf T}$ なら

$$
J_O-J_C=M\begin{pmatrix}0&0&0\\0&a^2&0\\0&0&a^2\end{pmatrix}.
$$

**$x$ 軸方向へ原点を移しても、これに平行な軸の慣性は増えない**ことに注目してください。なお $J_O\omega$ が点 $O$ まわりの角運動量そのものを表すのは、剛体の速度場が $v=\omega\times(r-O)$ となる運動、たとえば $O$ を空間固定点とする純回転の場合です。自由に並進する剛体へ無条件に適用してはいけません。

## 4. まず積分を設定する：一様直円柱と円板

連続物体の計算は、**領域・密度・原点・軸・積分要素**を先に固定します。以下では物体固定の $z$ 軸を対称軸、重心を原点とします。

半径 $a>0$、高さ $h>0$、全質量 $M>0$ の一様な**中実**直円柱を

$$
0\le r\le a,\qquad 0\le\theta<2\pi,\qquad -h/2\le z\le h/2
$$

に置きます。直交座標は $x=r\cos\theta,\ y=r\sin\theta$、体積要素は $dV=r\,dr\,d\theta\,dz$、体積密度は $\rho=M/(\pi a^2h)$、質量要素は $dm=\rho\,dV$ です。

<a id="prop-rbd6-solid-cylinder"></a>

<!-- formal-statement-start -->
### 命題（一様中実直円柱の慣性テンソル）

半径 $a>0$、高さ $h>0$、質量 $M>0$ の一様中実直円柱の重心を原点とし、円柱軸を物体固定 $z$ 軸に取ると、慣性テンソルは

$$
\boxed{
J_C=\operatorname{diag}
\left(
M\left(\frac{a^2}{4}+\frac{h^2}{12}\right),
M\left(\frac{a^2}{4}+\frac{h^2}{12}\right),
\frac{Ma^2}{2}
\right)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$J_{zz}$ は軸からの距離二乗 $r^2$ を積分します。$J_{xx}$ は $y^2+z^2$ の積分で、円周方向の平均 $\sin^2\theta$ が $1/2$ になることを使います。非対角項は奇関数の対称積分で消えます。

<!-- proof-start -->
### 証明

[慣性テンソルの定義](../../MECH/MECH8/index.md#def-mech8-inertia-tensor)の $zz$ 成分から

$$
\begin{aligned}
J_{zz}
&=\rho\int_{-h/2}^{h/2}\int_0^{2\pi}\int_0^a
r^2\,r\,dr\,d\theta\,dz\\
&=\rho h(2\pi)\frac{a^4}{4}
=\frac{Ma^2}{2}.
\end{aligned}
$$

$x$ 軸まわりでは距離二乗が $y^2+z^2=r^2\sin^2\theta+z^2$ なので

$$
J_{xx}
=\rho\int_{-h/2}^{h/2}\int_0^{2\pi}\int_0^a
(r^2\sin^2\theta+z^2)r\,dr\,d\theta\,dz.
$$

$r^2\sin^2\theta$ の寄与は

$$
\rho h\left(\int_0^{2\pi}\sin^2\theta\,d\theta\right)
\left(\int_0^a r^3\,dr\right)
=\rho h\pi\frac{a^4}{4}
=\frac{Ma^2}{4}.
$$

$z^2$ の寄与は

$$
\rho\left(\int_{-h/2}^{h/2}z^2\,dz\right)
\left(\int_0^{2\pi}d\theta\right)
\left(\int_0^a r\,dr\right)
=\rho\frac{h^3}{12}\,\pi a^2
=\frac{Mh^2}{12}.
$$

従って $J_{xx}=M(a^2/4+h^2/12)$。$x$ と $y$ を交換しても領域と密度が変わらないので、同じ積分で $J_{yy}=J_{xx}$ です。非対角成分は

$$
J_{xy}=-\int xy\,dm,\quad J_{xz}=-\int xz\,dm,\quad J_{yz}=-\int yz\,dm.
$$

$\theta\mapsto\theta+\pi$ で $x,y$ は符号を変え、$z\mapsto-z$ で $z$ は符号を変えます。また $\int_0^{2\pi}\cos\theta\sin\theta\,d\theta=0$ です。よって三積分はいずれも0。主張の対角行列を得ます。
<!-- proof-end -->

この計算で $J_{xx}=J_{yy}$ が出るのは、**円柱の質量分布が $z$ 軸まわりの回転に対称**だからです。逆に同じ主慣性値が二つあることだけから、物体の外形が円柱であるとは結論できません。

厚みをなくした「円板」は三次元の体積密度 $\rho$ のまま $h=0$ と置く物体ではありません。半径 $a>0$、質量 $M>0$ の**面密度** $\sigma=M/(\pi a^2)$ を持つ円板を $z=0$ に置き、$dm=\sigma r\,dr\,d\theta$ と定め直します。

<a id="prop-rbd6-uniform-disc"></a>

<!-- formal-statement-start -->
### 命題（一様薄円板の慣性テンソル）

半径 $a>0$、質量 $M>0$ の一様薄円板を $z=0$ の平面に置き、その重心を原点とする。面密度を $M/(\pi a^2)$ とすると

$$
\boxed{J_C=\operatorname{diag}\left(\frac{Ma^2}{4},\frac{Ma^2}{4},\frac{Ma^2}{2}\right)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

面積分で $J_{zz}$ と $J_{xx}$ を出し、$J_{yy}$ と非対角項を対称性で確認します。三次元の体積積分を使わないことが重要です。

<!-- proof-start -->
### 証明

$\sigma=M/(\pi a^2)$ とすると

$$
J_{zz}=\sigma\int_0^{2\pi}\int_0^a r^2r\,dr\,d\theta
=\sigma(2\pi)\frac{a^4}{4}=\frac{Ma^2}{2}.
$$

また $z=0$ より $J_{xx}=\int y^2\,dm$ なので

$$
J_{xx}=\sigma\int_0^{2\pi}\sin^2\theta\,d\theta\int_0^a r^3\,dr
=\sigma\pi\frac{a^4}{4}=\frac{Ma^2}{4}.
$$

同様に $\int_0^{2\pi}\cos^2\theta\,d\theta=\pi$ から $J_{yy}=Ma^2/4$。非対角項は $xz=yz=0$、$\int xy\,dm\propto\int_0^{2\pi}\sin\theta\cos\theta\,d\theta=0$ により消えます。
<!-- proof-end -->

円柱の式で総質量 $M$ を固定したまま $h\to0$ とすると、円板の値へ近づきます。しかしこれは**密度を $h$ に応じて変えた極限**であり、$h=0$ を体積密度に単純代入したものではありません。

## 5. 直方体は各辺の二乗の和で決まる

辺の長さを $a,b,c>0$ とする一様中実直方体を

$$
-\frac a2\le x\le\frac a2,\qquad
-\frac b2\le y\le\frac b2,\qquad
-\frac c2\le z\le\frac c2
$$

に置きます。原点は重心、密度は $\rho=M/(abc)$、質量要素は $dm=\rho\,dx\,dy\,dz$ です。

<a id="prop-rbd6-rectangular-block"></a>

<!-- formal-statement-start -->
### 命題（一様直方体の慣性テンソル）

辺 $a,b,c>0$ がそれぞれ物体固定 $x,y,z$ 軸に平行な、質量 $M>0$ の一様中実直方体では、重心まわりの慣性テンソルは

$$
\boxed{J_C=\frac{M}{12}\operatorname{diag}(b^2+c^2,\ a^2+c^2,\ a^2+b^2)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$x$ 軸まわりは $y^2+z^2$ を積分します。$y$ の二乗の積分と $z$ の二乗の積分を分離すれば、それぞれ $Mb^2/12$ と $Mc^2/12$ になります。非対角項は各変数の対称区間上の奇関数積分です。

<!-- proof-start -->
### 証明

$J_{xx}=\int(y^2+z^2)\,dm$ より

$$
\int y^2\,dm
=\rho\left(\int_{-a/2}^{a/2}dx\right)
\left(\int_{-b/2}^{b/2}y^2\,dy\right)
\left(\int_{-c/2}^{c/2}dz\right).
$$

$\int_{-b/2}^{b/2}y^2dy=[y^3/3]_{-b/2}^{b/2}=b^3/12$ なので

$$
\int y^2\,dm=\rho a\frac{b^3}{12}c=\frac{Mb^2}{12}.
$$

同じ積分を $z$ に対して行えば $\int z^2\,dm=Mc^2/12$。従って

$$
J_{xx}=\frac{M(b^2+c^2)}{12}.
$$

同じ手順で $J_{yy}=\int(x^2+z^2)dm=M(a^2+c^2)/12$、$J_{zz}=\int(x^2+y^2)dm=M(a^2+b^2)/12$。非対角項の一例は

$$
J_{xy}=-\rho\int_{-a/2}^{a/2}x\,dx\int_{-b/2}^{b/2}y\,dy\int_{-c/2}^{c/2}dz=0.
$$

$J_{xz},J_{yz}$ も各奇関数積分が0なので、対角形になります。
<!-- proof-end -->

ここまでの三物体では、物体固定の座標軸が[主軸](../../MECH/MECH8/index.md#def-mech8-principal-axis)です。たとえば $(a,b,c)=(3\ell,2\ell,\ell)$、$\ell>0$ なら

$$
J_b=\frac{M\ell^2}{12}\operatorname{diag}(5,10,13).
$$

これを空間系で $z$ 軸のまわりに $\pi/4$ 回すと、[座標変換の定理](#thm-rbd6-inertia-rotation)によって

$$
J_s=\frac{M\ell^2}{24}
\begin{pmatrix}
15&-5&0\\-5&15&0\\0&0&26
\end{pmatrix}.
$$

空間成分の角速度を $\omega_s=(\Omega,0,0)^{\mathsf T}$（$\Omega\ne0$）とすれば、[MECH8 の角運動量公式](../../MECH/MECH8/index.md#thm-mech8-inertia-relations)から

$$
L_s=J_s\omega_s
=\frac{M\ell^2\Omega}{24}(15,-5,0)^{\mathsf T}.
$$

角速度の $y$ 成分は0でも角運動量の $y$ 成分は0ではありません。これが **$L$ と $\omega$ が一般には平行でない**ことの具体的な計算です。

## 6. 主慣性値の縮退、零方向、慣性楕円体

主慣性モーメントが等しいことを**縮退**と呼びます。円柱と円板では $I_x=I_y$ なので、$xy$ 平面内のどの単位方向も主軸です。立方体 $a=b=c=\ell$ なら三つとも $M\ell^2/6$ で、任意の方向が主軸になります。ただし**慣性テンソルが等方的だからといって質量分布そのものが球対称とは限りません**（立方体が反例です）。

また、[慣性テンソルの定義](../../MECH/MECH8/index.md#def-mech8-inertia-tensor)から、その二次形式は幾何的に検査できます。

<a id="prop-rbd6-positivity"></a>

<!-- formal-statement-start -->
### 命題（慣性テンソルの非負性と正定値性）

有限の正の質量 $M$ と有限の二次質量モーメントを持つ三次元質量分布を、点 $O$ を原点として表す。慣性テンソルを $J_O$ とすると、すべての $v\in\mathbb R^3$ に対し

$$
v^{\mathsf T}J_Ov=\int|v\times(r-O)|^2\,dm\ge0
$$

であり、$J_O$ は半正定値である。さらに $J_O$ が正定値であることと、質量が $O$ を通る**一本の直線上にほとんどすべて集中してはいない**ことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

内積の恒等式 $|v\times u|^2=|v|^2|u|^2-(v\cdot u)^2$ を定義式へ代入します。積分が0になるのは $v\times u=0$ が質量に関してほとんど至る所成立するとき、すなわち各位置 $u$ がある一本の軸に平行なときです。

<!-- proof-start -->
### 証明

$u=r-O$ とすると

$$
\begin{aligned}
v^{\mathsf T}J_Ov
&=\int\left(|u|^2v^{\mathsf T}v-(v^{\mathsf T}u)^2\right)\,dm\\
&=\int\left(|u|^2|v|^2-(v\cdot u)^2\right)\,dm\\
&=\int|v\times u|^2\,dm\ge0.
\end{aligned}
$$

$J_O$ が正定値でないなら、実対称かつ半正定値なので、ある $v\ne0$ で $v^{\mathsf T}J_Ov=0$ です。非負関数の積分が0なら $|v\times u|^2=0$ が質量に関してほとんど至る所成立します。したがって $u$ は $v$ に平行であり、質量は $O+\mathbb Rv$ に集中します。

逆に、質量が $O+\mathbb Rv$（$v\ne0$）上に集中していれば、そこで $v\times u=0$ なので $v^{\mathsf T}J_Ov=0$ となり、正定値ではありません。二方向がともに成立しました。
<!-- proof-end -->

正定値なら三つの主慣性値はすべて正で、[MECH8 の主軸の存在定理](../../MECH/MECH8/index.md#thm-mech8-principal-axis-existence)によって直交主軸で二次形式を対角にできます。ここで、**同じ回転エネルギーを与える角速度をすべて並べると、どんな面になるか**を見ます。

<a id="def-rbd6-inertia-ellipsoid"></a>

<!-- formal-statement-start -->
### 定義（回転エネルギーの慣性楕円体）

重心まわりの正定値慣性テンソル $J_C$ とエネルギー値 $E_0>0$ に対し、角速度成分を座標とする集合

$$
\boxed{\mathcal E_{E_0}:=\left\{\omega\in\mathbb R^3:\frac12\omega^{\mathsf T}J_C\omega=E_0\right\}}
$$

を、本章では**回転エネルギーの慣性楕円体**と呼ぶ。ここで座標は同じ正規直交基底に関するものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd6-inertia-ellipsoid -->
### 直接例：三つの主軸方向で半径を確認する

**定義の確認**：$J_C=\operatorname{diag}(2I,3I,6I)$、$I>0$ を持つ剛体の主軸基底を取り、$E_0>0$ を固定します（各係数 $2I,3I,6I$ は正）。集合の条件へ代入すると

$$
I\omega_1^2+\frac{3I}{2}\omega_2^2+3I\omega_3^2=E_0.
$$

各軸との交点はそれぞれ

$$
\omega_1=\pm\sqrt{\frac{E_0}{I}},\quad
\omega_2=\pm\sqrt{\frac{2E_0}{3I}},\quad
\omega_3=\pm\sqrt{\frac{E_0}{3I}}
$$

です。たとえば第1交点 $(\sqrt{E_0/I},0,0)$ を定義式へ直接代入すると、$\frac12(2I)(E_0/I)=E_0$ です。他の二点もそれぞれ $\frac12(3I)(2E_0/(3I))=E_0$ と $\frac12(6I)(E_0/(3I))=E_0$。正定値なので三軸の半径は有限かつ正で、定義された集合は原点を中心とする楕円体です。
<!-- definition-example-end -->

一般に $J_C=\operatorname{diag}(I_1,I_2,I_3)$、$I_i>0$ なら

$$
\frac{\omega_1^2}{2E_0/I_1}
+\frac{\omega_2^2}{2E_0/I_2}
+\frac{\omega_3^2}{2E_0/I_3}=1.
$$

したがって主半軸長は $\sqrt{2E_0/I_i}$ です。**慣性が大きい主軸ほど、同じエネルギーで許される角速度成分の最大値は小さい**のです。正定値でなく零固有値があると、その方向には上限がなく楕円柱などになるので、本章の「楕円体」定義の仮定を外せません。

この楕円体は角速度空間の等エネルギー面です。実空間に浮かぶ剛体そのものの輪郭とは異なります。外力や運動方程式を導入する前にも、この面と $L=J\omega$ の向きから、物体ごとの回転の違いを読めます。

## 7. 検算の視点：単位・原点・座標・幾何

ここまでの公式を使うときは、**どの原点で・どの向きの基底で・どの物質モデルで** $J$ を計算したかを毎回固定します。

- 各成分の単位は常に質量×長さの二乗（SIなら $\mathrm{kg\,m^2}$）です。円柱で $Ma^2$ に $Mh^2$ が足されることはよくても、$Ma$ を足すことはできません。
- $J_s=RJ_bR^{\mathsf T}$ は**同じ重心**に関する座標変換です。別の点まわりにしたいなら[平行軸のテンソル公式](#thm-rbd6-parallel-axis-tensor)も必要です。
- 回転行列によって固有値は変わらず、$J$ の跡 $I_1+I_2+I_3$ も変わりません。位置を移す操作では一般に固有値も跡も変わります。
- 円板は厚さ0でも面内に質量が広がるので $J$ は正定値です。一方、一本の線に質量をすべて集めた理想棒は、その線方向に固有値0を持ちます。

RBD7では、これらの具体的なテンソルを使い、外力の作用点と基準点を指定して運動方程式を作ります。

---

# 演習

## Level A

### 問題 A1：軸を四分の一回転させる

物体系で $J_b=\operatorname{diag}(2,3,5)\,Q$、$Q>0$ は慣性の単位を持つ定数とする。$R=R_z(\pi/2)$ について $J_s$ を求め、三主慣性値を確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$R=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}$ であり、[座標変換公式](#thm-rbd6-inertia-rotation)へ代入すると

$$
RJ_b=Q\begin{pmatrix}0&-3&0\\2&0&0\\0&0&5\end{pmatrix},
$$

$$
J_s=RJ_bR^{\mathsf T}=Q\operatorname{diag}(3,2,5).
$$

対角成分の並びは変わりましたが固有値の集合は $\{2Q,3Q,5Q\}$ で同じです。
<!-- solution-end -->

### 問題 A2：一様な正方形薄板

一辺 $\ell>0$、総質量 $M>0$、重心を原点とする一様な薄い正方形板を $z=0$、$|x|,|y|\le\ell/2$ に置く。三つの座標軸まわりの主慣性モーメントを求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

面密度は $\sigma=M/\ell^2$。$J_{xx}=\int y^2dm$ なので

$$
J_{xx}=\frac{M}{\ell^2}\int_{-\ell/2}^{\ell/2}dx\int_{-\ell/2}^{\ell/2}y^2dy
=\frac{M}{\ell^2}\ell\frac{\ell^3}{12}
=\frac{M\ell^2}{12}.
$$

$x,y$ を入れ替えて $J_{yy}=M\ell^2/12$。さらに

$$
J_{zz}=\int(x^2+y^2)dm=J_{xx}+J_{yy}=\frac{M\ell^2}{6}.
$$

対称区間で $\int xy\,dm=0$、$z=0$ で $J_{xz}=J_{yz}=0$ だから三軸は主軸です。
<!-- solution-end -->

### 問題 A3：原点だけをずらす

質量 $M$ の剛体について $J_C=\operatorname{diag}(A,B,C)$ とし、別の基準点 $O$ が $C-O=(d,0,0)^{\mathsf T}$ を満たす（$d\ne0$）。$J_O$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$d_0=(d,0,0)^{\mathsf T}$ と書き、[テンソル平行軸公式](#thm-rbd6-parallel-axis-tensor)を使います。

$$
|d_0|^2I_3-d_0d_0^{\mathsf T}
=d^2\begin{pmatrix}0&0&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

従って

$$
\boxed{J_O=\operatorname{diag}(A,\ B+Md^2,\ C+Md^2)}.
$$

原点を $x$ 方向に移しても、同じ向きの $x$ 軸まわりの値 $A$ は変わりません。
<!-- solution-end -->

### 問題 A4：円柱の縦と横

半径 $a>0$、高さ $h=a$、質量 $M>0$ の一様中実円柱の重心まわりの主慣性値を求め、最大の値を持つ軸を答えよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[円柱の積分結果](#prop-rbd6-solid-cylinder)に $h=a$ を代入すると

$$
I_x=I_y=M\left(\frac{a^2}{4}+\frac{a^2}{12}\right)=\frac{Ma^2}{3},
\qquad
I_z=\frac{Ma^2}{2}.
$$

$\frac12>\frac13$ なので最大は円柱の中心軸 $z$ 方向です。単位はいずれも質量×長さの二乗です。
<!-- solution-end -->

### 問題 A5：非平行の角運動量

重心まわりの空間座標で $J_s=Q\begin{pmatrix}3&-1&0\\-1&3&0\\0&0&4\end{pmatrix}$、$Q>0$ とし、$\omega_s=(0,\Omega,0)^{\mathsf T}$、$\Omega\ne0$ とする。$L_s$ と回転運動エネルギーを求め、$L_s\parallel\omega_s$ か判定せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[角運動量公式](../../MECH/MECH8/index.md#thm-mech8-inertia-relations)より

$$
L_s=J_s\omega_s=Q\Omega(-1,3,0)^{\mathsf T}.
$$

第1成分が非零で、$\omega_s$ の第1成分は0なので平行ではありません。また

$$
K_{\mathrm{rot}}=\frac12\omega_s^{\mathsf T}J_s\omega_s
=\frac12(0,\Omega,0)\cdot Q\Omega(-1,3,0)
=\boxed{\frac32Q\Omega^2}.
$$
<!-- solution-end -->

## Level B

### 問題 B1：回転すると非対角成分が生じる

物体系で $J_b=\operatorname{diag}(A,B,C)$、$A,B,C>0$、$A\ne B$ とする。$R_z(\pi/4)$ で回転した空間系のテンソルを直接行列積で求め、固有値 $A,B,C$ が維持されることを固有ベクトルでも示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$c=s=1/\sqrt2$ とすると

$$
RJ_b=\begin{pmatrix}Ac&-Bs&0\\As&Bc&0\\0&0&C\end{pmatrix}.
$$

これへ $R^{\mathsf T}$ を右から掛けると

$$
\boxed{
J_s=\begin{pmatrix}(A+B)/2&(A-B)/2&0\\(A-B)/2&(A+B)/2&0\\0&0&C\end{pmatrix}.
}
$$

物体の $e_1$ は固有値 $A$ の固有ベクトルなので、空間で $Re_1=(1,1,0)^{\mathsf T}/\sqrt2$ に変わります。実際

$$
J_sRe_1
=\frac1{\sqrt2}(A,A,0)^{\mathsf T}=ARe_1.
$$

$Re_2=(-1,1,0)^{\mathsf T}/\sqrt2$ についても $J_sRe_2=BRe_2$、$e_3$ は $J_se_3=Ce_3$。よって主慣性値は同じです。
<!-- solution-end -->

### 問題 B2：直方体を積分し、平行軸で確認する

一様中実直方体の辺を $(a,b,c)=(2\ell,\ell,3\ell)$、質量を $M$ とする。重心まわりの $J_{xx}$ を体積積分から求めた後、$C-O=(0,\ell,0)^{\mathsf T}$ として $O$ まわりの $J_{xx}$ を求めよ（$\ell>0$）。

- Level: B

<!-- solution-start -->
### 詳細解答

領域は $|x|\le\ell,\ |y|\le\ell/2,\ |z|\le3\ell/2$、体積密度は $\rho=M/(6\ell^3)$ です。

$$
\int y^2\,dm
=\rho(2\ell)\frac{\ell^3}{12}(3\ell)
=\frac{M\ell^2}{12}.
$$

また $\int_{-3\ell/2}^{3\ell/2}z^2dz=(3\ell)^3/12$ なので

$$
\int z^2\,dm
=\rho(2\ell)(\ell)\frac{27\ell^3}{12}
=\frac{9M\ell^2}{12}.
$$

従って $J_{C,xx}=M\ell^2(1+9)/12=5M\ell^2/6$。$d=(0,\ell,0)^{\mathsf T}$ に対する補正は

$$
M(|d|^2I_3-dd^{\mathsf T})
=M\ell^2\operatorname{diag}(1,0,1).
$$

したがって $J_{O,xx}=5M\ell^2/6+M\ell^2=\boxed{11M\ell^2/6}$。これは[平行軸のテンソル公式](#thm-rbd6-parallel-axis-tensor)を $x$ 軸に適用したものです。
<!-- solution-end -->

### 問題 B3：零固有値と薄板の違い

長さ $\ell>0$、質量 $M>0$ の一様細棒を $x$ 軸上の区間 $[-\ell/2,\ell/2]$ に置き、線密度 $M/\ell$ とする。重心まわりの $J_C$ を求め、一様薄円板（半径 $a>0$、質量 $M$）との正定値性の違いを説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

棒上の位置は $u=(x,0,0)^{\mathsf T}$ なので

$$
|u|^2I_3-uu^{\mathsf T}=\operatorname{diag}(0,x^2,x^2).
$$

線積分で

$$
\int x^2\,dm=\frac{M}{\ell}\int_{-\ell/2}^{\ell/2}x^2dx
=\frac{M\ell^2}{12}.
$$

従って

$$
\boxed{J_C=\operatorname{diag}(0,M\ell^2/12,M\ell^2/12)}.
$$

$x$ 方向の角速度に対し $v^{\mathsf T}J_Cv=0$ となり、棒の質量がその回転軸上にすべて乗るので半正定値だが正定値ではありません。[非負性命題](#prop-rbd6-positivity)の等号条件そのものです。

円板では[円板の式](#prop-rbd6-uniform-disc)より固有値は $Ma^2/4,Ma^2/4,Ma^2/2$ で、$M,a>0$ よりすべて正です。厚さ0かどうかではなく、質量が一本の直線に集中するかが境目です。
<!-- solution-end -->

### 問題 B4：慣性楕円体の半軸と等方性

$J_C=\operatorname{diag}(I,2I,4I)$、$I>0$、$E_0>0$ で定義される回転エネルギーの慣性楕円体について半軸長を求めよ。さらに $J_C=I I_3$ のとき集合が球面となることを式で確かめよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[慣性楕円体の定義](#def-rbd6-inertia-ellipsoid)から

$$
\frac12(I\omega_1^2+2I\omega_2^2+4I\omega_3^2)=E_0.
$$

両辺を $E_0$ で割ると

$$
\frac{\omega_1^2}{2E_0/I}+
\frac{\omega_2^2}{E_0/I}+
\frac{\omega_3^2}{E_0/(2I)}=1.
$$

従って半軸長は順に $\sqrt{2E_0/I},\sqrt{E_0/I},\sqrt{E_0/(2I)}$ です。$J_C=I I_3$ なら $\frac12I|\omega|^2=E_0$、すなわち $|\omega|=\sqrt{2E_0/I}$。全方向で同じ半径の球面になります。
<!-- solution-end -->

## Level C

### 問題 C1：円柱の姿勢・基準点・角運動量を一つにする

半径 $a>0$、高さ $h>0$、質量 $M>0$ の一様中実直円柱がある。重心 $C$ を通る物体 $z$ 軸が円柱軸であり、物体系の $J_b$ は[円柱の公式](#prop-rbd6-solid-cylinder)で与えられる。ある瞬間の姿勢を $R=R_y(\pi/2)$ とし、空間系に固定した点 $O$ と重心の位置差を $d=C-O=(s,s,0)^{\mathsf T}$、$s>0$ とする。この瞬間には剛体は **固定点 $O$ のまわりの純回転**をし、角速度を $\omega_s=(\Omega,0,0)^{\mathsf T}$、$\Omega\ne0$ とする。

1. $J_b$ の主慣性値と $J_{C,s}$ を求めよ。
2. $J_{O,s}$ を求め、非対角成分がどこから来るか説明せよ。
3. $O$ まわりの角運動量 $L_{O,s}$ と回転エネルギー $K$ を求めよ。
4. $L_{O,s}$ と $\omega_s$ の平行性を判定し、$s\to0$ の結果を説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

まず $A:=M(a^2/4+h^2/12)$、$B:=Ma^2/2$ と置きます。$M,a,h>0$ だから $A,B>0$ です。[円柱の積分公式](#prop-rbd6-solid-cylinder)から物体系では

$$
J_b=\operatorname{diag}(A,A,B)
$$

です。$R_y(\pi/2)=\begin{pmatrix}0&0&1\\0&1&0\\-1&0&0\end{pmatrix}$ なので、円柱の $z$ 軸は空間の $x$ 軸へ移ります。[座標変換の定理](#thm-rbd6-inertia-rotation)に代入すると

$$
RJ_b=\begin{pmatrix}0&0&B\\0&A&0\\-A&0&0\end{pmatrix},
\qquad
\boxed{J_{C,s}=RJ_bR^{\mathsf T}=\operatorname{diag}(B,A,A)}.
$$

次に $d=(s,s,0)^{\mathsf T}$ なので

$$
|d|^2=2s^2,\qquad
dd^{\mathsf T}=\begin{pmatrix}s^2&s^2&0\\s^2&s^2&0\\0&0&0\end{pmatrix}.
$$

よって

$$
|d|^2I_3-dd^{\mathsf T}
=s^2\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&2\end{pmatrix}.
$$

[平行軸のテンソル公式](#thm-rbd6-parallel-axis-tensor)より

$$
\boxed{
J_{O,s}=
\begin{pmatrix}
B+Ms^2&-Ms^2&0\\
-Ms^2&A+Ms^2&0\\
0&0&A+2Ms^2
\end{pmatrix}.
}
$$

非対角項は円柱自体の姿勢変更ではなく、$d$ が $x,y$ 両方の成分を持つ**基準点の移動**で生じます。

今回は $O$ が空間固定点で、そのまわりの純回転と明示されているため、[MECH8 の角運動量公式](../../MECH/MECH8/index.md#thm-mech8-inertia-relations)を $O$ に適用できます。

$$
\boxed{
L_{O,s}=J_{O,s}\omega_s
=\Omega(B+Ms^2,-Ms^2,0)^{\mathsf T}.
}
$$

回転エネルギーも

$$
\boxed{K=\frac12\omega_s^{\mathsf T}J_{O,s}\omega_s
=\frac12(B+Ms^2)\Omega^2}.
$$

$s>0$ かつ $\Omega\ne0$ なので $L_{O,s}$ の $y$ 成分は $-Ms^2\Omega\ne0$、一方 $\omega_s$ の $y$ 成分は0。従って二つは平行ではありません。$s\to0$ なら $d\to0$ で

$$
J_{O,s}\to\operatorname{diag}(B,A,A),\qquad
L_{O,s}\to(B\Omega,0,0)^{\mathsf T},
\qquad K\to\frac12B\Omega^2.
$$

この極限では基準点が重心と一致し、角速度は円柱の主軸に沿うので $L$ と $\omega$ は平行になります。$s=0$ と $s>0$ の違いは、原点の取り方を角運動量へ反映した結果です。
<!-- solution-end -->

---

## まとめ

剛体の向きと基準点の違いを分ければ、どの一様物体でも計算の筋道は同じです。

$$
\boxed{J_s=RJ_bR^{\mathsf T}},
\qquad
\boxed{J_O=J_C+M\bigl(|d|^2I_3-dd^{\mathsf T}\bigr)}.
$$

円柱では二つ、立方体では三つの主慣性値が等しくなる一方、質量が一本の軸に集中する場合は零固有値を持ちます。正定値なら同じ回転エネルギーの角速度は楕円体を描き、主軸ごとの回りやすさを一つの図形で比較できます。次は外力・トルクを与えて、この慣性を運動方程式へ接続します。
