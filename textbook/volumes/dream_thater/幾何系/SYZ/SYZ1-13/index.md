# SYZ1-13 K3と超Kähler回転

<!-- definition-example-audit: strict -->

## 1. 正則な楕円曲線を、どうしてSLagトーラスと呼べるのか

[前講の楕円曲線](../SYZ1-12/index.md#thm-syz1-12-slag-fibration)では、初めから複素1次元のトーラスにSLag円周束を作った。今回は複素2次元のK3曲面にある**正則楕円曲線**を調べる。ただし、正則曲線を**同じ複素構造のままで**特殊Lagrange（SLag）曲面と呼ぶのは誤りである。正則曲線の接平面上ではKähler形式は面積を与え、Lagrange条件の零にはならない。

何を変えると両者が両立するのだろうか。K3にRicci平坦Kähler計量を選ぶと、一つの計量と両立する三つの複素構造を使える。この**超Kähler回転**で、元の正則曲線を、別の複素構造に関する位相一定のSLag曲面として読み直せる。

本講の約束は次のとおりである。

- 実4次元のK3曲面を $X$ とし、最初の複素構造を $I$、固定するRiemann計量を $g$ とする。
- 実2形式は $\omega_A(u,v)=g(Au,v)$（$A=I,J,K$）で定める。積の順序は $IJ=K=-JI$ とする。
- 元の正則2形式と回転後の正則2形式は、それぞれ $\Omega_I=\omega_J+i\omega_K$、$\Omega_J=\omega_K+i\omega_I$ と規格化する。
- $I$-正則な曲線の向きは複素構造 $I$ が与える向きとし、回転後も**同じ向き**を保つ。
- $I$-正則な楕円ファイブレーションは存在すると仮定する。すべてのK3が、選んだ複素構造について楕円ファイブレーションを持つわけではない。

[既習のK3曲面の定義](../../CYG/CYG1-05/index.md#def-cyg1-05-k3)では単連結性と正則標準束の自明性が必要だった。[YauのRicci平坦計量存在定理](../../CYG/CYG1-10/index.md#cor-cyg1-10-ricci-flat)は、K3のKähler類を固定するとRicci平坦計量を選べることを保証する。そこから三つの複素構造を取り出すための計量幾何を次に明記する。

## 2. 一つの計量から三つの複素構造を作る

複素構造とは接束の自己準同型 $A$ で $A^2=-\mathrm{id}$ を満たし、さらに積分可能なものをいう。積分可能性は局所的な複素座標があることを意味する。Kählerでは、その $A$ が計量と両立し、$\omega_A$ が閉形式になる。ここではそれを同時に三つ持ち、積が四元数の乗法を満たす状況を考える。

<a id="def-syz1-13-hyperkahler"></a>

<!-- formal-statement-start -->
> **定義（4次元の超Kähler構造）**  
> 向き付けられた滑らかな実4次元多様体 $X$ 上の超Kähler構造とは、Riemann計量 $g$ と、そのLevi–Civita接続に関して平行な三つの直交複素構造 $I,J,K$ で、各点で

$$
I^2=J^2=K^2=-\mathrm{id},\qquad IJ=K=-JI
$$

> を満たすものをいう。各 $A=I,J,K$ に対し $\omega_A(u,v)=g(Au,v)$ と書く。ここで「平行」は $\nabla I=\nabla J=\nabla K=0$ の意味である。これにより三つの $\omega_A$ は閉形式となる。
<!-- formal-statement-end -->

直交性から $g(Au,Av)=g(u,v)$、また $A^{-1}=-A$ だから $g(Au,v)=-g(u,Av)$ である。したがって $\omega_A$ は交代2形式になる。$A$ が平行なら $\nabla\omega_A=0$ であり、ねじれのないLevi–Civita接続について外微分は共変微分の交代和だから $d\omega_A=0$ となる。

積分可能性も平行性から従う。実ベクトル場 $U,V$ に対してNijenhuisテンソルを

$$
N_A(U,V)=[AU,AV]-A[AU,V]-A[U,AV]-[U,V]
$$

と書く。ねじれが零なので $[U,V]=\nabla_UV-\nabla_VU$ であり、各Lie括弧をこの形にして展開すると、$\nabla A=0$ と $A^2=-\mathrm{id}$ によって全項が打ち消され $N_A=0$ となる。従って平行な各 $A$ は局所複素座標を持つ。

<!-- definition-example-start: def-syz1-13-hyperkahler -->
### 直接例：$\mathbb R^4$ の四元数模型

$\mathbb R^4$ の標準正規直交基底を $(e_0,e_1,e_2,e_3)$ とし、$1,i,j,k$ に対応させる。$I,J,K$ はそれぞれ左から $i,j,k$ を掛ける線形写像とする。例えば

$$
\begin{aligned}
&Ie_0=e_1,\quad Ie_1=-e_0,\quad Ie_2=e_3,\quad Ie_3=-e_2,\\
&Je_0=e_2,\quad Je_1=-e_3,\quad Je_2=-e_0,\quad Je_3=e_1,\\
&Ke_0=e_3,\quad Ke_1=e_2,\quad Ke_2=-e_1,\quad Ke_3=-e_0.
\end{aligned}
$$

各写像は符号付きで正規直交基底を置換するため直交し、各基底ベクトルへ二度適用すると $-e_a$ になる。さらに例えば $IJ e_0=I e_2=e_3=K e_0$、$JIe_0=J e_1=-e_3$ であり、四元数の乗法 $ij=k=-ji$ によって全基底上で $IJ=K=-JI$ が成立する。係数は定数だから三写像は平行である。

座標 $e_a=\partial/\partial x^a$ に対して、三つの複素構造の複素座標は例えば

$$
\begin{aligned}
I:&\quad z_I^1=x^0+ix^1,\quad z_I^2=x^2+ix^3,\\
J:&\quad z_J^1=x^0+ix^2,\quad z_J^2=x^1-ix^3,\\
K:&\quad z_K^1=x^0+ix^3,\quad z_K^2=x^1+ix^2
\end{aligned}
$$

と取れる。各式は上の $Ae_a$ の表と $dz_A^j(Ae_a)=i\,dz_A^j(e_a)$ を満たすので、複素座標によって積分可能性も直接確かめられる。

双対基底を $(dx^0,dx^1,dx^2,dx^3)$ とすると、定義 $\omega_A(e_a,e_b)=g(Ae_a,e_b)$ から

$$
\begin{aligned}
\omega_I&=dx^0\wedge dx^1+dx^2\wedge dx^3,\\
\omega_J&=dx^0\wedge dx^2-dx^1\wedge dx^3,\\
\omega_K&=dx^0\wedge dx^3+dx^1\wedge dx^2.
\end{aligned}
$$

**定義の確認**：三つの写像は $A^2=-\mathrm{id}$、直交性、平行性、四元数積の条件を満たす。これらの2形式は定数係数の閉形式である。例えば $\omega_I(e_0,e_1)=1$、$\omega_J(e_0,e_1)=\omega_K(e_0,e_1)=0$。平面 $P=\operatorname{span}(e_0,e_1)$ は $I$ で不変だが、$J$ のKähler形式ではLagrangeである。この差が回転の要点になる。
<!-- definition-example-end -->

## 3. 回転後の正則2形式と位相を計算する

二つの実2形式を組み合わせると、複素構造に関する正則2形式になる。記号 $\Omega_A$ は**どの複素構造に関して正則か**を表す添字である。$\omega_I$ をそのまま複素構造 $I$ に関する正則2形式と見なすのではない。

以下で使う**comass**は、実2形式 $\varphi$ を単位長の直交2組 $(u,v)$ に評価した絶対値の上限

$$
\|\varphi\|_*=\sup_{\substack{u\perp v\\|u|=|v|=1}}|\varphi(u,v)|
$$

であり、[既習の較正形式の定義](../SYZ1-03/index.md#def-syz1-03-calibration)に現れる量である。

<a id="prop-syz1-13-rotated-volume"></a>

<!-- formal-statement-start -->
> **命題（超Kähler構造の正則2形式と規格化）**  
> 超Kähler4次元多様体 $(X,g,I,J,K)$ において

$$
\Omega_I=\omega_J+i\omega_K,\qquad
\Omega_J=\omega_K+i\omega_I,\qquad
\Omega_K=\omega_I+i\omega_J
$$

> は、それぞれ複素構造 $I,J,K$ に関する零にならない平行な正則 $(2,0)$ 形式である。$g$ の向きを三つの複素構造が与える共通の向きに取れば

$$
\frac12\omega_I^2=\frac12\omega_J^2
=\frac12\omega_K^2=\operatorname{vol}_g,\qquad
\omega_I\wedge\omega_J=\omega_J\wedge\omega_K=\omega_K\wedge\omega_I=0.
$$

> 各 $\omega_A$ はcomassが1であり、例えば $\operatorname{Re}(-i\Omega_J)=\omega_I$ は回転後のSLag較正として使える。
<!-- formal-statement-end -->

### 証明の見取り図

四元数積を使って $\Omega_J(Ju,v)=i\Omega_J(u,v)$ を確かめると、$J$-複素双線形性が見える。正規直交の四元数基底で外積を計算すれば、三つのKähler形式の規格化と較正の大きさが同時に分かる。

<!-- proof-start -->
### 証明

最初に $KJ=-I$、$IJ=K$ を用いる。定義から任意の実接ベクトル $u,v$ に対し

$$
\begin{aligned}
\Omega_J(Ju,v)
&=g(KJu,v)+i\,g(IJu,v)\\
&=-g(Iu,v)+i\,g(Ku,v)\\
&=i\{g(Ku,v)+i\,g(Iu,v)\}
=i\Omega_J(u,v).
\end{aligned}
$$

同様に第二変数にもこの式が成り立つ（2形式の交代性を使う）。よって $\Omega_J$ は型 $(2,0)$ である。$\nabla\omega_I=\nabla\omega_K=0$ なので $\Omega_J$ は平行であり、したがって閉かつ正則である。添字の循環置換により $I,K$ についても同様。

任意の点で長さ1の $u$ を選ぶと $(u,Iu,Ju,Ku)$ は正規直交基底になる。例えば $g(Iu,Ju)=-g(u,IJu)=-g(u,Ku)=0$、他も同じ乗法で調べられる。ここで第2節の四元数模型と同じ2形式の表示ができる。各形式は直交する二つの面積形式の和（符号付き）だから、外積の交差項を二つ取って $\omega_A^2=2\operatorname{vol}_g$ となる。異なる二つの形式の外積では各項に重複した $dx^a$ が現れて0になる。

正規直交な $u,v$ について $|\omega_A(u,v)|=|g(Au,v)|\le |Au||v|=1$。等号は $v=Au$ で達成されるからcomassは1である。また $\operatorname{Re}(-i\Omega_J)=\operatorname{Re}(\omega_I-i\omega_K)=\omega_I$ は閉である。ゆえに[較正形式の定義](../SYZ1-03/index.md#def-syz1-03-calibration)を満たす。
<!-- proof-end -->

**規格化の意味。** $\Omega_J$ を勝手な複素定数倍に変えると、位相や較正のcomassは変わる。以下ではこの命題の平行な組を固定するので、[SLag条件の規格化](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)に要求される値が各点で一致する。

## 4. 楕円K3ファイバーをSLagとして読み直す

先にファイブレーション自体の仮定を整理する。ここでいうファイバーは楕円曲線上の「円周」ではなく、複素次元1、実次元2のトーラスである。基底は $\mathbb P^1$、すなわち位相的には2球面である。

本講の「楕円ファイブレーション」は、まず**滑らかな一般ファイバーが種数1**という意味（種数1ファイブレーション）で使い、切断の存在は定義に含めない。切断を要請する流儀での「楕円ファイブレーション」とは区別し、第5節のWeierstrass模型では改めて切断を仮定する。

<a id="def-syz1-13-elliptic-k3"></a>

<!-- formal-statement-start -->
> **定義（楕円ファイブレーションをもつK3）**  
> 複素構造 $I$ を備えたK3曲面 $X$ から $\mathbb P^1$ への全射正則写像 $\pi$ で、一般のファイバーが連結・滑らかな種数1の複素曲線であるものを楕円K3ファイブレーションという。$\Delta_{\pi}$ を $\pi$ の臨界値集合とし、次を正則値集合とファイバーの記法とする。

$$
B_0=\mathbb P^1\setminus\Delta_{\pi},\qquad L_b=\pi^{-1}(b)\quad(b\in B_0).
$$

> 各 $L_b$ は滑らかな実2トーラスである。
<!-- formal-statement-end -->

各楕円ファイバーに原点を指定するには、$\pi\circ s=\mathrm{id}$ を満たす正則写像 $s:\mathbb P^1\to X$ が便利である。しかし、回転によるSLag判定そのものではこのような正則右逆を選ばない。

<!-- definition-example-start: def-syz1-13-elliptic-k3 -->
### 直接例：滑らかな点でファイバー条件を確かめる

正則局所座標 $(z^1,z^2)$ を選び、次の表示を持つ領域を考える。

$$
\pi(z^1,z^2)=z^2.
$$

ここで $d\pi$ は写像 $\pi$ の微分であり、複素接ベクトル上で

$$
d\pi\left(\frac{\partial}{\partial z^1}\right)=0,\qquad
d\pi\left(\frac{\partial}{\partial z^2}\right)=1
$$

となるので、複素階数は1である。逆に正則値上では正則写像の局所的な階数定理によりこの表示を選べる。固定した基底点 $b$ の局所ファイバーは $z^2=b$ で、その接空間は

$$
T_pL_b=\ker(d\pi_p)
=\operatorname{span}_{\mathbb C}\left(\frac{\partial}{\partial z^1}\right).
$$

この核は $I$ で不変である。偏微分 $\partial/\partial z^1$ は $z^2$ を固定した接方向を表す。

正則2形式を $\Omega_I=h\,dz^1\wedge dz^2$ と書くと、ファイバーの接ベクトル上では $dz^2=0$ だから、その制限は零である。

**定義の確認**：この局所判定に加え、ファイバーがコンパクトで連結な滑らかな種数1曲線という定義の仮定を使うと、$L_b$ は実2トーラスである。局所方程式だけでコンパクト性や種数1を証明したことにはならない。
<!-- definition-example-end -->

<a id="thm-syz1-13-hyperkahler-rotation"></a>

<!-- formal-statement-start -->
> **定理（K3の正則楕円ファイバーと超Kähler回転）**  
> $(X,I)$ を楕円ファイブレーション $\pi:(X,I)\to\mathbb P^1$ をもつK3曲面とする。$I$ に関するRicci平坦Kähler計量 $g$ と、それを延長する超Kähler三つ組 $(I,J,K)$ を選び、第3節の $\omega_A,\Omega_J$ を用いる。各正則値 $b\in B_0$ に対し、$I$ が定める向きの滑らかなファイバー $L_b$ は、**回転後の複素構造 $J$** に関して位相 $\pi/2$ のSLagトーラスであり、

$$
\omega_J|_{L_b}=0,\qquad
\Omega_J|_{L_b}=i\,\operatorname{vol}_{g|_{L_b}},\qquad
\operatorname{Re}(e^{-i\pi/2}\Omega_J)|_{L_b}
=\operatorname{vol}_{g|_{L_b}}.
$$

> 一方、元の複素構造 $I$ については $\omega_I|_{L_b}=\operatorname{vol}_{g|_{L_b}}\ne0$ であり、$L_b$ は $I$-Kähler形式に関してLagrangeではない。
<!-- formal-statement-end -->

### 証明の見取り図

回転では**曲面 $X$、部分集合 $L_b$、計量 $g$ は動かさず**、何を複素構造・Kähler形式・正則体積形式と読むかを変える。正則ファイバーの接平面は $I$ で不変なので、$\omega_J,\omega_K$ はそこへ制限すると消え、$\omega_I$ は正の面積形式になる。この三つの値を $\Omega_J=\omega_K+i\omega_I$ に代入する。

<!-- proof-start -->
### 証明

[コンパクトK3のKähler類におけるYauの存在結果](../../CYG/CYG1-10/index.md#cor-cyg1-10-ricci-flat)から $g$ を選ぶ。K3のRicci平坦Kähler計量が超Kählerであるという四次元ホロノミーの標準結果をここで入力する。これは[全ホロノミーと平行な正則体積形式](../../CYG/CYG1-11/index.md#thm-cyg1-11-full-parallel)で説明された $SU(2)\simeq Sp(1)$ の特別な幾何に基づく（本講では一般ホロノミー分類の証明を繰り返さない）。この入力によって固定した $I$ と同じ計量 $g$ に両立する $J,K$ が存在する。

正則値上の $L_b$ は滑らかな複素曲線なので、任意の $p\in L_b$ で長さ1の接ベクトル $u$ を選ぶと $(u,Iu)$ は $T_pL_b$ の正の向きの正規直交基底である。$I$ の直交性により

$$
\omega_I(u,Iu)=g(Iu,Iu)=1.
$$

$IJ=K$ と交代性を使うと、$J,K$ の接平面上での値は

$$
\begin{aligned}
\omega_J(u,Iu)&=g(Ju,Iu)=-g(IJu,u)=-g(Ku,u)=0,\\
\omega_K(u,Iu)&=g(Ku,Iu)=-g(IKu,u)=g(Ju,u)=0.
\end{aligned}
$$

どの2形式の接平面への制限も、向き付き正規直交基底での評価値を面積形式に掛けたものである。従って

$$
\omega_I|_{L_b}=\operatorname{vol}_{g|_{L_b}},\qquad
\omega_J|_{L_b}=\omega_K|_{L_b}=0.
$$

ここで**回転後**の正則2形式を代入する。

$$
\Omega_J|_{L_b}
=(\omega_K+i\omega_I)|_{L_b}
=i\,\operatorname{vol}_{g|_{L_b}}.
$$

ゆえに $\operatorname{Im}(e^{-i\pi/2}\Omega_J)|_{L_b}=0$、実部は正の面積形式そのものになる。[規格化したSLag条件](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)を複素次元2、位相角 $\theta=\pi/2$、Kähler形式 $\omega_J$ に適用すれば結論を得る。最後に $\omega_I|_{L_b}=\operatorname{vol}_{g|_{L_b}}$ は非零であり、$I$ に関するLagrange条件 $\omega_I|_{L_b}=0$ を満たさない。
<!-- proof-end -->

**別の回転を選んだ場合。** 複素構造 $K$ と $\Omega_K=\omega_I+i\omega_J$ を用いれば、同じ向きのファイバー上で $\Omega_K=\operatorname{vol}$ となるので位相0のSLagになる。$J$ と $K$ の選択で位相が違うだけで、固定した計量と元のファイバー集合は同じである。

### 最小模型で位相を確かめる

第2節の $\mathbb R^4$ で $P=\operatorname{span}(e_0,e_1)$ を取る。$(e_0,e_1)$ に関して $\omega_I(P)=1$、$\omega_J(P)=\omega_K(P)=0$。回転前の $\omega_I$ は零でなく、回転後の $\omega_J$ は零。さらに

$$
\Omega_J(e_0,e_1)=i,\quad
e^{-i\pi/2}\Omega_J(e_0,e_1)=(-i)i=1.
$$

向きを $(e_1,e_0)$ に逆転すると値は $-i$、位相は $-\pi/2$（$\pi/2+\pi$ と同じ）になる。位相角の計算には**向き**が欠かせない。

## 5. なぜK3には典型的に24個の特異ファイバーが現れるのか

超Kähler回転は滑らかなファイバー上でSLag条件を与える。しかし全基底で滑らかなトーラス束になるわけではない。何が失われるかを、楕円K3の最もよく使われる具体模型から調べる。

切断をもつ楕円K3には、適切な最小Weierstrass模型で、$\mathbb P^1$ の斉次座標 $[s:t]$ に関する係数を次数8と12の斉次多項式として取れる場合がある。局所座標でファイバーの方程式は

$$
y^2=x^3+a(u)x+b(u),\qquad
a\in H^0(\mathbb P^1,\mathcal O(8)),\quad
b\in H^0(\mathbb P^1,\mathcal O(12)).
$$

ここで $u$ は基底の局所複素座標、$a,b$ はそのチャートでの係数関数である。$H^0(\mathbb P^1,\mathcal O(d))$ は、$\mathbb P^1$ 上の次数 $d$ の線束 $\mathcal O(d)$ の**大域正則切断の空間**を表す。斉次座標 $[s:t]$ では次数 $d$ の斉次多項式で表示できる。

したがって $a,b$ の二つの座標チャート間の変換は、それぞれ線束 $\mathcal O(8),\mathcal O(12)$ の貼り合わせ規則に従う。次数8,12という**大域的な線束の次数**は、一般の三次曲線から出る数字ではない。楕円K3のWeierstrass基本線束が $\mathcal O(2)$ になるという標準的な標準束公式を外部入力として $a\in L^4,b\in L^6$ に代入したものである。詳細な構成は [Huybrechts, Lectures on K3 Surfaces, 楕円ファイブレーションの章](https://ncatlab.org/nlab/files/HuybrechtsLecturesOnK3.pdf) を参照できる。

三次多項式が重根を持つかを判定する量は**判別式**であり、$y^2=x^3+a(u)x+b(u)$ の滑らかさは $4a(u)^3+27b(u)^2\ne0$ と同値である。

ここでは基底座標 $u$ を**固定**し、ファイバーの方程式を

$$
F(x,y;u)=y^2-x^3-a(u)x-b(u)=0
$$

と置く。特異点は $F=F_x=F_y=0$ を満たす点であり、$x,y$ で偏微分すれば

$$
F_x=-3x^2-a(u),\qquad F_y=2y.
$$

従って $y=0$ を $F=0$ に代入すると、$f_u(x)=x^3+a(u)x+b(u)$ が $f_u(x)=f_u'(x)=0$ を満たす重根を持つ。三次式の判別式の公式から、この条件は $4a(u)^3+27b(u)^2=0$ と同値である。射影閉包の無限遠点は滑らかなので、これでファイバー全体の判定になる。基底方向の微分 $\partial F/\partial u$ は**ファイバー自身の特異点判定**には使わない。

<a id="def-syz1-13-nodal"></a>

<!-- formal-statement-start -->
> **定義（節点型特異ファイバー）**  
> 複素平面曲線の孤立特異点の局所方程式が、可逆な正則座標変換の下で二つの異なる接線方向を持つ通常二重点となるとき、その点を節点という。楕円ファイブレーションのファイバーが**既約な射影三次曲線（算術種数1）**でただ一つの節点を持つ場合、本講では節点型（Kodaira型 $I_1$）ファイバーという。その正規化は $\mathbb P^1$ で、節点の二つの原像が一つに同一視される。したがって、特異ファイバー自体の**幾何種数は0**であり、滑らかな種数1ファイバーと混同しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-13-nodal -->
### 直接例：二重根が二つの接線を生む

$r\ne0$ として $a=-3r^2,b=2r^3$ を選ぶと、

$$
x^3+ax+b=(x-r)^2(x+2r),\qquad
4a^3+27b^2=-108r^6+108r^6=0.
$$

特異点候補は $(x,y)=(r,0)$。$x=r+\xi$ とずらすと

$$
y^2=\xi^2(3r+\xi),\qquad
y^2-3r\xi^2=\xi^3.
$$

最低次数の二次式は

$$
y^2-3r\xi^2=(y-\sqrt{3r}\,\xi)(y+\sqrt{3r}\,\xi).
$$

$r\ne0$ だから二本の接線は異なり、局所的に一つの節点である。三次曲線の他の点は滑らかである。実際、$F_y=2y=0$ と $F_x=-3x^2-a=0$ の共通解は三次式の二重根 $x=r$ に対応する一組だけである。

また射影閉包 $Y^2Z=X^3+aXZ^2+bZ^3$ の無限遠点 $[0:1:0]$ では

$$
F_Z=Y^2-2aXZ-3bZ^2=1
$$

なので滑らかである。$x+2r$ は一次式であり、その平方根は $\mathbb C(x)$ に存在しないため $y^2-(x-r)^2(x+2r)$ は既約である。よって射影閉包は一つの節点を持つ既約三次曲線になる。

**定義の確認**：重根、特異点の位置、接線の相異、節点が一つであること、射影閉包の他の点の滑らかさと既約性を調べた。$r=0$ にすると二次式が消え、同じ証明は使えない。
<!-- definition-example-end -->

<a id="prop-syz1-13-discriminant-24"></a>

<!-- formal-statement-start -->
> **命題（一般位置の楕円K3と24個の節点）**  
> 切断を持つ複素楕円K3が、上記の最小Weierstrassデータ $a\in H^0(\mathbb P^1,\mathcal O(8))$、$b\in H^0(\mathbb P^1,\mathcal O(12))$ で表されるとする。判別式

$$
\Delta=-16(4a^3+27b^2)
$$

> が $\mathbb P^1$ 上に互いに異なる単純零点を持ち、Weierstrass模型の全空間が滑らかであるなら、零点は正確に24個あり、その上のファイバーはすべて節点型 $I_1$ である。単純零点の条件を外したとき、**相異なる特異ファイバーが24個とは限らない**。
<!-- formal-statement-end -->

### 証明の見取り図

判別式の二項はそれぞれ次数 $3\cdot8$ と $2\cdot12$ の同じ線束の切断だから、零点の重複度の総和は24になる。単純零点では三次式が二重根を一つだけ持ち、三重根にはならないので節点の局所模型を使える。

<!-- proof-start -->
### 証明

$a^3$ は $\mathcal O(8)^{\otimes3}=\mathcal O(24)$、$b^2$ は $\mathcal O(12)^{\otimes2}=\mathcal O(24)$ の切断であり、足し算は同じ線束内で定義される。従って $\Delta$ は $\mathcal O(24)$ の切断である。$\mathbb P^1$ 上の非零な次数24の斉次多項式は、複素数体上で重複度を数えると24個の零点を持つ。単純零点だけなら相異なる点が24個となる。

局所的な零点 $u_0$ で $a(u_0)=b(u_0)=0$ だと、$a^3$ は少なくとも3次、$b^2$ は少なくとも2次で消える。従って $\Delta$ は少なくとも2次で消えるので、単純零点の仮定に反する。よって $(a(u_0),b(u_0))\ne(0,0)$ である。

$\Delta(u_0)=0$ の三次式には重根 $r$ があり、三重根なら $r=0$ かつ $a=b=0$ になるため不可能。そこで三次式は $(x-r)^2(x+2r)$、$r\ne0$ の形になり、定義例で示した二本の異なる接線を持つ節点となる。零点の外では判別式は非零で、ファイバーは滑らかな楕円曲線である。
<!-- proof-end -->

**24という数の意味。** [K3のEuler標数24](../../CYG/CYG1-05/index.md#prop-cyg1-05-euler-24)とも整合する。滑らかなトーラスのEuler標数は0であり、節点三次曲線は正規化 $\mathbb P^1$ の2点を一つに貼るので $2-1=1$。従って24個の節点型ファイバーが合計 $24\cdot1=24$ を寄与する。ただし判別式の次数24は**重複度付き**の数である。零点が合流したときに24個の異なる節点が残ると結論してはいけない。

## 6. 全K3を滑らかなSLagトーラス束で覆えない理由

正則値集合 $B_0$ 上では、$\pi^{-1}(B_0)\to B_0$ の各ファイバーが実2トーラスである。$X$ はコンパクトなので $\pi$ の正則値上への制限は固有な滑らかな全射沈め込みである。

この仮定に**Ehresmannの局所自明化定理**（固有な滑らかな全射沈め込みは滑らかな局所自明束；本講では外部入力）を適用すると、各 $b\in B_0$ の近くで $U\times T^2$ という局所積を得る。これに第4節のSLag判定を合わせれば、既習の[滑らかなSLagトーラス束の定義](../SYZ1-07/index.md#def-syz1-07-regular-fibration)を満たす。したがって[二つの整数アフィン周期](../SYZ1-08/index.md#def-syz1-08-two-period-covectors)と局所的なsemi-flat双対化へ進める。

しかし $B_0$ と全基底 $\mathbb P^1$ は違う。この違いは単なる座標の取り方の問題ではない。

**K3のEuler標数が24となる理由。** この値はFermat四次曲面だけの偶然ではない。コンパクトなKähler K3曲面では単連結性から $b_1=0$、Hodge分解から $h^{0,1}=0$ である。また標準束が正則自明で、連結コンパクト上の正則関数は定数だから

$$
h^{2,0}=\dim H^0(X,K_X)=1.
$$

Kähler多様体のHodge対称性から $h^{0,2}=h^{2,0}=1$。ここで $\chi(\mathcal O_X)$ は構造層の正則Euler標数、すなわち $h^{0,q}$ の交代和なので

$$
\chi(\mathcal O_X)=1-h^{0,1}+h^{0,2}=2.
$$

複素曲面のNoether公式（本講では外部入力）

$$
12\chi(\mathcal O_X)=\int_X\bigl(c_1(TX)^2+c_2(TX)\bigr)
$$

に $c_1(TX)=0$（標準束の自明性）を入れると $\int_Xc_2(TX)=24$。さらに[複素曲面のChern–Gauss–Bonnet](../../CYG/CYG1-05/index.md#thm-cyg1-05-gauss-bonnet-input)により $\chi_{\mathrm{top}}(X)=24$ となる。既出の[Fermat四次K3の直接計算](../../CYG/CYG1-05/index.md#prop-cyg1-05-euler-24)とも一致する。

<a id="prop-syz1-13-no-smooth-global"></a>

<!-- formal-statement-start -->
> **命題（K3上の全域的な滑らかなトーラス束の障害）**  
> $X$ をコンパクトなKähler K3曲面とする。$X$ を全空間、$\mathbb P^1$ を基底、$T^2$ をファイバーとする局所自明な滑らかなファイバー束 $X\to\mathbb P^1$ は存在しない。従って楕円K3の回転によるSLagファイブレーションでは、全基底を通して滑らかなトーラス束であるとはいえない。
<!-- formal-statement-end -->

### 証明の見取り図

滑らかな局所自明束のEuler標数は、有限CW型の空間では基底とファイバーのEuler標数の積になる。球面の値は2、トーラスは0。K3の既知のEuler標数24と衝突する。

<!-- proof-start -->
### 証明

局所自明な束 $T^2\hookrightarrow X\to\mathbb P^1$ が存在すると仮定する。基底とファイバーは有限CW複体のホモトピー型を持ち、ファイバーのEuler標数は $\chi(T^2)=1-2+1=0$ である。束のEuler標数乗法則（有限CW基底を各セルで局所自明化し、符号付きセル数を集計して導ける）より

$$
\chi(X)=\chi(\mathbb P^1)\chi(T^2)=2\cdot0=0.
$$

一方、直前のNoether公式とChern–Gauss–Bonnetの適用から、任意のコンパクトKähler K3には $\chi(X)=24$ が成り立つ。よって矛盾する。複素構造の回転は $X$ の位相空間を変えないので、回転後にも同じ障害が残る。
<!-- proof-end -->

**壊れる機構。** 正則値に限定した議論では、各ファイバーに階数2の $H_1(L_b;\mathbb Z)$ があり、局所的に基底を選んで周期を測れた。特異値上ではファイバーが滑らかなトーラスでなくなり、その同じ局所積表示と周期基底を延長できない。次講は、この延長に失敗する仕方を**消滅サイクルとモノドロミー**の行列で測る。

## 7. 演習：回転・判別式・位相障害を自力でつなぐ

### Level A：定義と一次の計算

<a id="ex-syz1-13-a01"></a>
#### SYZ1-13-A01 四元数の積とKähler形式
- Level: A

第2節の基底で $Je_1$、$Ke_1$、$\omega_J(e_0,e_2)$、$\omega_K(e_0,e_3)$ を求め、$IJ e_0=-JI e_0$ を確認せよ。

<!-- solution-start -->
### 詳細解答

$j i=-k$、$k i=j$ より $Je_1=-e_3$、$Ke_1=e_2$。定義 $\omega_A(u,v)=g(Au,v)$ と直交性から $\omega_J(e_0,e_2)=g(e_2,e_2)=1$、$\omega_K(e_0,e_3)=g(e_3,e_3)=1$。$IJ e_0=I e_2=e_3$、$JI e_0=J e_1=-e_3$ だから $IJ e_0=-JI e_0$。
<!-- solution-end -->

<a id="ex-syz1-13-a02"></a>
#### SYZ1-13-A02 位相と向きの符号
- Level: A

$I$-正則な接平面 $P$ の正の向きの正規直交基底 $(u,Iu)$ に $\Omega_J$ を制限した値、位相、および向きを逆転したときの値を求めよ。

<!-- solution-start -->
### 詳細解答

$\omega_K(u,Iu)=0$、$\omega_I(u,Iu)=g(Iu,Iu)=1$ なので $\Omega_J(u,Iu)=0+i=i$。従って位相は $\pi/2$（$2\pi$ を法として）。向きを逆転して $(Iu,u)$ とすると交代性により $\Omega_J(Iu,u)=-i$、位相は $-\pi/2$。位相が変わっても $\omega_J$ の零性は変わらない。
<!-- solution-end -->

<a id="ex-syz1-13-a03"></a>
#### SYZ1-13-A03 判別式の線束次数
- Level: A

$a\in H^0(\mathbb P^1,\mathcal O(8))$、$b\in H^0(\mathbb P^1,\mathcal O(12))$ とする。$4a^3+27b^2$ が何次の切断かを両項から求めよ。

<!-- solution-start -->
### 詳細解答

$a^3$ の線束は $\mathcal O(8)^{\otimes3}=\mathcal O(24)$、$b^2$ では $\mathcal O(12)^{\otimes2}=\mathcal O(24)$。同じ線束なので加算でき、判別式は $\mathcal O(24)$ の切断である。次数8と12を足して20にするのではなく、指数3と2をそれぞれ掛ける。
<!-- solution-end -->

<a id="ex-syz1-13-a04"></a>
#### SYZ1-13-A04 節点の接線を判定する
- Level: A

$y^2=(x-2)^2(x+4)$ の特異点 $(2,0)$ で $\xi=x-2$ とする。最低次の方程式と接線を示せ。

<!-- solution-start -->
### 詳細解答

$x=2+\xi$ で $x+4=6+\xi$ だから $y^2=\xi^2(6+\xi)$、すなわち $y^2-6\xi^2=\xi^3$。最低次の二次式は $(y-\sqrt6\,\xi)(y+\sqrt6\,\xi)$ となる。係数 $\sqrt6\ne0$ なので二つの異なる接線 $y=\pm\sqrt6\,\xi$ があり、節点である。
<!-- solution-end -->

<a id="ex-syz1-13-a05"></a>
#### SYZ1-13-A05 位相的Euler標数の矛盾
- Level: A

K3曲面のEuler標数が24、球面が2、トーラスが0である。K3から球面への滑らかな局所自明な $T^2$ 束を仮定すると何が矛盾するか。

<!-- solution-start -->
### 詳細解答

有限CW型の局所自明束ならEuler標数の乗法則が使える。仮定から $\chi(X)=\chi(S^2)\chi(T^2)=2\cdot0=0$。一方、K3では $\chi(X)=24$。$0\ne24$ なので束の仮定が成り立たない。結論は「K3に楕円写像がない」ではなく「**全ファイバーを滑らかなトーラスとする**局所自明な束にはならない」である。
<!-- solution-end -->

### Level B：論証と失敗機構

<a id="ex-syz1-13-b01"></a>
#### SYZ1-13-B01 回転後の$(2,0)$性
- Level: B

超Kähler三つ組で $\Omega_K=\omega_I+i\omega_J$ とする。$\Omega_K(Ku,v)=i\Omega_K(u,v)$ を四元数積から導き、これが何を表すか説明せよ。

<!-- solution-start -->
### 詳細解答

$I K=-J$、$J K=I$ なので

$$
\begin{aligned}
\Omega_K(Ku,v)
&=g(IKu,v)+i\,g(JKu,v)\\
&=-g(Ju,v)+i\,g(Iu,v)\\
&=i\{g(Iu,v)+i\,g(Ju,v)\}
=i\Omega_K(u,v).
\end{aligned}
$$

交代性によって第二変数でも同様の複素線形性がある。これは $\Omega_K$ が複素構造 $K$ に関して型 $(2,0)$ であることを表す。三つ組が平行なので $\Omega_K$ も平行、従って閉かつ正則である。
<!-- solution-end -->

<a id="ex-syz1-13-b02"></a>
#### SYZ1-13-B02 接平面を使ってSLagを証明する
- Level: B

$I$-不変な実2平面 $P$ と正の向きの単位ベクトル $u$ を取る。$J$ のKähler形式に関してLagrangeであること、位相 $\pi/2$ の較正の等号、および元の $I$ ではLagrangeでないことを独立に示せ。

<!-- solution-start -->
### 詳細解答

$I$-不変性から $P=\operatorname{span}(u,Iu)$。$IJ=K$ と交代性で $\omega_J(u,Iu)=-g(Ku,u)=0$、同様に $\omega_K(u,Iu)=g(Ju,u)=0$。従って $\omega_J|_P=0$。一方、$\omega_I(u,Iu)=g(Iu,Iu)=1$ なので $\Omega_J(u,Iu)=i$ であり、

$$
\operatorname{Re}\{e^{-i\pi/2}\Omega_J(u,Iu)\}
=\operatorname{Re}\{(-i)i\}=1
=\operatorname{vol}_{P}(u,Iu).
$$

$P$ は実次元2で、$J$ の複素次元2の半分であるためLagrangeの次元条件も満たす。$\omega_I(u,Iu)=1\ne0$ だから、元の $I$ についてはLagrangeではない。
<!-- solution-end -->

<a id="ex-syz1-13-b03"></a>
#### SYZ1-13-B03 判別式の単純零点が壊れる例
- Level: B

局所的に $a(u)=u$、$b(u)=u$ としたWeierstrass式の判別式の零点の次数を求めよ。これが一般位置の24節点という結論へ直結しない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$$
\Delta(u)=-16(4u^3+27u^2)=-16u^2(4u+27).
$$

$u=0$ は少なくとも2位の零点で、単純零点でない。また $a(0)=b(0)=0$ なので、三次式は $x^3$ になり、節点の判定で必要とした $r\ne0$ が失われる。$u=0$ のファイバーは $y^2=x^3$ で尖点を持つ（接線の二本への分解は起きない）。従って「判別式が消える」だけから節点型と結論できない。K3全体の模型として使うにはさらに大域的な係数と全空間の滑らかさを検査する必要がある。
<!-- solution-end -->

<a id="ex-syz1-13-b04"></a>
#### SYZ1-13-B04 節点のEuler寄与
- Level: B

滑らかな楕円曲線、$\mathbb P^1$、節点三次曲線のEuler標数を比較し、24個の節点型ファイバーの寄与を求めよ。

<!-- solution-start -->
### 詳細解答

滑らかな種数1曲線は位相的に $T^2$ なので $\chi=1-2+1=0$。$\mathbb P^1\simeq S^2$ は $\chi=2$。節点三次曲線は正規化 $\mathbb P^1$ の異なる2点を同一視するため、その有限CW構造では点が一つ減り $\chi=2-1=1$ になる。24個の節点型ファイバーがあれば寄与は $24\cdot1=24$。この計算は**24個が互いに異なる節点型**という仮定を使っている。一般の合流型に同じ寄与1を適用することはできない。
<!-- solution-end -->

### Level C：回転と特異性の総合

<a id="ex-syz1-13-c01"></a>
#### SYZ1-13-C01 楕円K3をSLag束として解析する
- Level: C

$(X,I)$ は切断を持つコンパクト楕円K3であり、$\pi:(X,I)\to\mathbb P^1$ は最小Weierstrass模型の係数 $a\in H^0(\mathcal O(8))$、$b\in H^0(\mathcal O(12))$ を持つとする。判別式 $\Delta=-16(4a^3+27b^2)$ は単純零点だけを持ち、全空間は滑らかである。$I$ に関するRicci平坦Kähler計量 $g$ と超Kähler三つ組 $I,J,K$ を選び、$\Omega_J=\omega_K+i\omega_I$ とする。

1. 判別集合の点数と各特異ファイバーの型を計算せよ。
2. $b_0$ が正則値のとき、$L_{b_0}$ の $J$ に関するSLagの2条件と位相・向き・体積の等号をすべて確認せよ。
3. $X$ 全体を滑らかなSLag $T^2$ 束にできないことを示し、どの局所構成が失われるか説明せよ。

<!-- solution-start -->
### 詳細解答

**(1) 判別集合。** $a^3$ と $b^2$ はいずれも $\mathcal O(24)$ の切断である。従って $\Delta$ の零点の重複度の和は24。単純零点の仮定により相異なる零点は24個である。その零点 $u_0$ で $a=b=0$ なら $\Delta$ は2位以上で消えて矛盾する。よって三次式の重根は三重根でなく二重根 $r\ne0$ である。$x=r+\xi$ として $y^2=\xi^2(3r+\xi)$、最低次式が二本の異なる接線へ分解するから各特異ファイバーは $I_1$ 型。

**(2) 回転によるSLag。** 正則値では $L_{b_0}$ は複素次元1、実次元2の滑らかなトーラス。接平面で $g$ の単位ベクトル $u$ を選び、$(u,Iu)$ を正向き直交基底とする。

$$
\begin{aligned}
\omega_I(u,Iu)&=g(Iu,Iu)=1,\\
\omega_J(u,Iu)&=-g(Ku,u)=0,\\
\omega_K(u,Iu)&=g(Ju,u)=0.
\end{aligned}
$$

従って $\omega_J|_L=0$（Lagrange条件）かつ $\Omega_J|_L=i\operatorname{vol}_{g|_L}$。$e^{-i\pi/2}=-i$ を掛けると $\operatorname{Im}(e^{-i\pi/2}\Omega_J)|_L=0$、$\operatorname{Re}(e^{-i\pi/2}\Omega_J)|_L=\operatorname{vol}_{g|_L}>0$ である。正向きで位相は $\pi/2$、較正の等号も満たす。これを元の複素構造 $I$ に関するSLagと呼ぶと、$\omega_I|_L=\operatorname{vol}\ne0$ に反する。

**(3) 全域延長の障害。** 仮に全基底 $\mathbb P^1$ 上の滑らかな局所自明 $T^2$ 束なら、Euler標数の乗法則で

$$
\chi(X)=\chi(\mathbb P^1)\chi(T^2)=2\cdot0=0.
$$

しかしK3のEuler標数は24で矛盾する。実際、判別集合の24点上は節点を持つので滑らかなトーラスではない。$B_0=\mathbb P^1\setminus\Delta_\pi$ では局所積と $H_1(T^2;\mathbb Z)$ の階数2の周期格子を使えるが、特異値を含む局所自明化はできず、同じ滑らかなアフィン座標・双対トーラスをそのまま全基底へ貼る推論が止まる。
<!-- solution-end -->

## 8. 次講へ：消えるサイクルを行列で追う

回転によって得たのは、**楕円K3の正則値上のSLagトーラス束**である。複素構造 $J$ への変更後も、元の $I$ で定義したファイバーを同じ実部分集合として扱える。一般位置では判別集合に24個の節点型特異値があるが、特異ファイバーを含む全域的な滑らかなトーラス束にはならない。

次講SYZ1-14では、一つの節点に近づくとトーラスのどの1サイクルが縮み、その周りを一周した周期基底にどの $SL(2,\mathbb Z)$ の変換が起きるかを計算する。