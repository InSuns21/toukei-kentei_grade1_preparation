# MFL38 多様体上のスカラー場と座標に依存しない作用素

<!-- definition-example-audit: strict -->

## 1. 同じ曲面を別の座標で見ると何が変わるか

[MFL37のスカラー型特徴](../MFL37/index.md#def-mfl37-low-rank-types)は、空間を回転させても値が変わらない。一方、曲がった面の各点に温度や濃度を置く場合は、空間の回転とは別に、**同じ点へ付ける座標ラベルを変更する**自由がある。例えば円柱の一点を「角度・高さ」で表しても、角度と高さを混ぜた二数の組で表しても、そこにある温度は同じである。

ここで扱うのは、幾何学的対象である関数と、その数値配列・数式による座標表示を区別する方法である。[MFL12の連続作用素](../MFL12/index.md#prop-mfl12-circle)と[GA1のLaplace--Beltrami座標式](../../../幾何系/GA/GA1/index.md)を、局所座標を非線形に取り替える具体例で試す。連続的な恒等式と有限格子の差分・補間に由来する誤差を混同しない。

[GEO12のRiemann計量](../../../幾何系/GEO/GEO12/index.md#def-geo12-riemannian-metric)が既に定義された二次元滑らかな曲面 $(M,g)$ を考える。チャートとは、曲面の開部分を $\mathbb R^2$ の開集合と一対一に滑らかに対応させ、逆写像も滑らかな局所座標である。以下では逆向きの写像、すなわち座標から曲面上の点を与えるパラメータ表示 $\phi:U\to M$ を使う。$U\subset\mathbb R^2$ は開集合、$\phi$ はその像への微分同相とする。

曲面上のスカラー場は各点 $p$ に一つの実数 $f(p)$ を割り当てる滑らかな関数 $f:M\to\mathbb R$ である。座標表示はこの同じ関数に座標を代入して作る二変数関数であり、別の物理量を定義するわけではない。この違いを次で固定する。

<a id="def-mfl38-scalar-chart"></a>
<!-- formal-statement-start -->
> **定義（スカラー場のチャート表示）**  
> $M$ を滑らかな二次元多様体、$f:M\to\mathbb R$ を滑らかなスカラー場とする。二つの滑らかなチャートの逆写像 $\phi:U\to M$、$\psi:V\to M$ が共通の開部分 $W=\phi(U)\cap\psi(V)$ をもつとする。各表示を

$$
f_\phi(x)=f(\phi(x)),\qquad f_\psi(y)=f(\psi(y))
$$

> と定める。重なりに対応する領域上のチャート移行写像 $T=\phi^{-1}\circ\psi$ に対し

$$
f_\psi=f_\phi\circ T
$$

> が成立する。これをスカラー場の**座標変更則**という。ここで $x,y$ は各座標の二成分を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl38-scalar-chart -->
**定義の確認**。半径1の円柱面の一部分で、角度 $u\in(-\pi,\pi)$、高さ $v\in(-1,1)$ を使う。

$$
\phi(u,v)=(\cos u,\sin u,v).
$$

角度と高さを混ぜて $s=u+v^2,\ t=v$ とし、$V=\{(s,t):|s-t^2|<\pi,\ |t|<1\}$ 上に

$$
\psi(s,t)=(\cos(s-t^2),\sin(s-t^2),t)
$$

を定める。$\phi$ は指定した角度幅で一対一であり、$T(s,t)=(s-t^2,t)$ は逆変換 $(u,v)\mapsto(u+v^2,v)$ をもつから、どちらも同じ開いた円柱面部分へのチャートである。

$f(\phi(u,v))=u^4+v^2$ と定めると、二つの表示は

$$
f_\phi(u,v)=u^4+v^2,\qquad
f_\psi(s,t)=(s-t^2)^4+t^2.
$$

点 $p=\phi(1,1/2)=\psi(5/4,1/2)$ では、両方とも $f(p)=1+1/4=5/4$ である。$T(5/4,1/2)=(1,1/2)$ が、定義の**同じ点**という条件を実際に確認している。角度の切れ目を越えると $u^4$ は円柱全体の滑らかな関数とは限らないので、ここでは指定した開部分だけを定義域とする。
<!-- definition-example-end -->

## 2. 座標の変換は微分と計量を一緒に変える

単なる値は上の合成でよい。しかしスカラー場の「変化の速さ」は、座標軸の伸縮に影響される。同じ微分を表すには、接ベクトルの基底と計量を同時に変えなければならない。

$x=(x^1,x^2)=T(y^1,y^2)$ を重なりのチャート移行写像とし、$J^i{}_a=\partial x^i/\partial y^a$ をそのJacobian行列の成分とする。[GEO12の計量行列の定義](../../../幾何系/GEO/GEO12/index.md#def-geo12-riemannian-metric)に従い、$G_x=(g(\partial_{x^i},\partial_{x^j}))$、$G_y=(g(\partial_{y^a},\partial_{y^b}))$ と書く。添字の繰り返しは1,2で総和する。

<a id="thm-mfl38-metric-transform"></a>
<!-- formal-statement-start -->
> **定理（計量とスカラー勾配の座標変換則）**  
> $(M,g)$ を滑らかな二次元Riemann多様体、$\phi,\psi$ を上記の重なる滑らかなチャートの逆写像、$T=\phi^{-1}\circ\psi$、$J=DT$ とする。$J$ は各点で可逆である。$f\in C^\infty(M)$ とすると、共通領域の対応する各点で

$$
G_y=J^{\mathsf T}G_xJ,\qquad
\partial_y f_\psi=J^{\mathsf T}\partial_x f_\phi,
$$

$$
\sqrt{\det G_y}=|\det J|\sqrt{\det G_x},\qquad
(\partial_y f_\psi)^{\mathsf T}G_y^{-1}(\partial_y f_\psi)
=(\partial_x f_\phi)^{\mathsf T}G_x^{-1}(\partial_x f_\phi).
$$

> $\partial_x f_\phi$ と $\partial_y f_\psi$ は各座標での偏微分を縦に並べた列ベクトルである。
<!-- formal-statement-end -->

### 証明の見取り図

まず座標接ベクトルを連鎖律で展開し、その内積から $G_y$ を作る。関数値の合成にも連鎖律を適用すると、偏微分の列は $J^{\mathsf T}$ で変換される。計量の逆行列に挟めば、$J$ と $J^{-1}$ が消える。

<!-- proof-start -->
### 証明

曲面上の同じ点 $p=\psi(y)=\phi(T(y))$ で連鎖律を使うと

$$
\partial_{y^a}
=\sum_{i=1}^2\frac{\partial x^i}{\partial y^a}\partial_{x^i}
=J^i{}_a\partial_{x^i}.
$$

計量の双線形性から

$$
(G_y)_{ab}=g(\partial_{y^a},\partial_{y^b})
=\sum_{i,j}J^i{}_a (G_x)_{ij}J^j{}_b,
$$

すなわち $G_y=J^{\mathsf T}G_xJ$ となる。$T$ が微分同相なので $J$ は可逆であり、行列式の積をとると $\det G_y=(\det J)^2\det G_x$。正定値性によって両計量の行列式は正なので、正の平方根を取って体積密度の変換則を得る。

$f_\psi(y)=f_\phi(T(y))$ に同じ連鎖律を適用すると

$$
\partial_{y^a}f_\psi
=\sum_iJ^i{}_a\partial_{x^i}f_\phi,
$$

である。また $G_y^{-1}=J^{-1}G_x^{-1}(J^{\mathsf T})^{-1}$。これを代入すれば

$$
\begin{aligned}
(\partial_y f_\psi)^{\mathsf T}G_y^{-1}(\partial_y f_\psi)
&=(\partial_x f_\phi)^{\mathsf T}J
  J^{-1}G_x^{-1}(J^{\mathsf T})^{-1}J^{\mathsf T}\partial_x f_\phi\\
&=(\partial_x f_\phi)^{\mathsf T}G_x^{-1}(\partial_x f_\phi).
\end{aligned}
$$

これは[GEO12の勾配ノルム](../../../幾何系/GEO/GEO12/index.md#prop-geo12-gradient-coordinate)の二つの座標表示の一致である。$\square$
<!-- proof-end -->

### 例：円柱の二つの座標で計量を計算する

前節の $\phi$ の接ベクトルは $\phi_u=(-\sin u,\cos u,0)$、$\phi_v=(0,0,1)$ で、内積はそれぞれ $1,1$、交差項は0である。したがって $G_x=I_2$。

一方、$T(s,t)=(s-t^2,t)$ を実際に微分すると

$$
J=\begin{pmatrix}1&-2t\\0&1\end{pmatrix},\qquad
G_y=J^{\mathsf T}J
=\begin{pmatrix}1&-2t\\-2t&1+4t^2\end{pmatrix}.
$$

これは単に「行列式を計算してよい」という話ではない。$J$ の列は新しい座標接ベクトルを元の直交基底で展開した係数であり、その列同士の内積を並べたのが $G_y$ である。$\det J=1$、$\det G_y=1$ は非退化性も確認し、

$$
G_y^{-1}=\begin{pmatrix}1+4t^2&2t\\2t&1\end{pmatrix}
$$

となる。特に $t=1/2$ で $G_y=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$。スカラー $f=u^4+v^2$ の偏微分列は

$$
\partial_xf_\phi=\begin{pmatrix}4u^3\\2v\end{pmatrix},\qquad
\partial_yf_\psi=\begin{pmatrix}4u^3\\-8tu^3+2t\end{pmatrix}.
$$

$u=1,t=1/2$ では後者が $(4,-3)^{\mathsf T}$。その勾配ノルムの二乗は

$$
(4,-3)\begin{pmatrix}2&1\\1&1\end{pmatrix}
\begin{pmatrix}4\\-3\end{pmatrix}
=(4,-3)\begin{pmatrix}5\\1\end{pmatrix}
=17=4^2+1^2.
$$

**座標表示の偏微分の数値は異なる**が、計量で測った速さは同じなのである。

## 3. Laplace--Beltrami作用素も同じ値を返す

[GEO12のLaplace--Beltrami作用素の定義](../../../幾何系/GEO/GEO12/index.md#def-geo12-div-laplacian)は $\Delta_g f=\operatorname{div}_g(\nabla_gf)$ であり、その[座標公式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)は、$\rho=\sqrt{\det G}$ を使って

$$
\Delta_g f=\frac1\rho\partial_i\left(\rho\,g^{ij}\partial_j f\right)
$$

と表せる。$g^{ij}$ は逆計量の成分である。この式は単に $\partial_1^2f+\partial_2^2f$ とするものではない。以下、微分と発散がチャートの切替にどう追従するかを二次元で直接検算する。

<a id="thm-mfl38-laplacian-invariance"></a>
<!-- formal-statement-start -->
> **定理（二次元Laplace–Beltrami作用素の座標不変性）**  
> $(M,g)$ を滑らかな二次元Riemann多様体、$\phi,\psi$ を重なる滑らかなチャートの逆写像、$T=\phi^{-1}\circ\psi$ とする。$f\in C^\infty(M)$、$p=\psi(y)=\phi(T(y))$ なら、各座標で計算した上の発散形の値は

$$
(\Delta_g f)_\psi(y)=(\Delta_g f)_\phi(T(y))
$$

> で一致する。いずれの側も実数値であり、座標表示に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[前節の計量変換則](#thm-mfl38-metric-transform)で、逆計量を含む流束の座標成分を求める。次にチャート移行写像のJacobianの小行列式を使い、微分した際に生じるJacobianの偏微分が混合偏微分の等式によって打ち消し合うことを示す。

<!-- proof-start -->
### 証明

共通領域を局所的に縮め、$T(y)=(x^1(y),x^2(y))$ のJacobianの行列式 $d=\det J$ の符号を一定とする。まず $d>0$ の場合を示す。$x$ 座標で $\rho_x=\sqrt{\det G_x}$、$Z^i=(G_x^{-1})^{ij}\partial_{x^j}f_\phi$ と置く。前節より、$y$ 座標の流束は

$$
\rho_yG_y^{-1}\partial_yf_\psi
=d\rho_x J^{-1}Z.
$$

$J=\begin{pmatrix}x^1_s&x^1_t\\x^2_s&x^2_t\end{pmatrix}$ と書くと、$dJ^{-1}$ は

$$
dJ^{-1}=
\begin{pmatrix}x^2_t&-x^1_t\\-x^2_s&x^1_s\end{pmatrix}.
$$

任意の滑らかなベクトル成分 $W^i(x)$ に対し、$dJ^{-1}W$ の $s,t$ 成分の発散を展開する。$W$ は $x=T(y)$ で評価する。

$$
\begin{aligned}
&\partial_s(x^2_tW^1-x^1_tW^2)
 +\partial_t(-x^2_sW^1+x^1_sW^2)\\
&=(x^2_{ts}-x^2_{st})W^1
 +(-x^1_{ts}+x^1_{st})W^2\\
&\quad+x^2_t\partial_sW^1-x^2_s\partial_tW^1
 -x^1_t\partial_sW^2+x^1_s\partial_tW^2.
\end{aligned}
$$

$T$ は滑らかなので混合偏微分の差は0である。さらに

$$
\partial_sW^i=x^1_s\partial_{x^1}W^i+x^2_s\partial_{x^2}W^i,\qquad
\partial_tW^i=x^1_t\partial_{x^1}W^i+x^2_t\partial_{x^2}W^i.
$$

を代入すると、$W^1$ の係数は $x^1_sx^2_t-x^1_tx^2_s=d$、$W^2$ も同じ係数 $d$ だけが残る。したがって

$$
\partial_{y^a}\!\left(d(J^{-1})^a{}_iW^i\right)
=d\,\partial_{x^i}W^i.
$$

これを $W=\rho_xZ$ に適用し、$\rho_y=d\rho_x$ で割ると

$$
\frac1{\rho_y}\partial_{y^a}(\rho_y(G_y^{-1})^{ab}\partial_{y^b}f_\psi)
=\frac1{\rho_x}\partial_{x^i}(\rho_xZ^i).
$$

$d<0$ の場合は $|d|=-d$ だが符号が局所的に一定なので、両辺の $d$ を $|d|$ に替えても同じ消去が成り立つ。任意の重なりの点の近くで証明でき、結論は全重なりへ及ぶ。$\square$
<!-- proof-end -->

<a id="prop-mfl38-cylinder"></a>
<!-- formal-statement-start -->
> **命題（円柱面の二つのチャートでの作用素計算）**  
> 第1節の円柱面部分、二つのチャート $\phi,\psi$、$f_\phi(u,v)=u^4+v^2$ に対し、$u=s-t^2,\ v=t$ と書くと

$$
(\Delta_gf)_\phi(u,v)=12u^2+2,\qquad
(\Delta_gf)_\psi(s,t)=12(s-t^2)^2+2.
$$

> 対照的に、$\partial_{ss}f_\psi+\partial_{tt}f_\psi$ は一般にはこの値と一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

角度・高さ座標の計量は単位行列である。非線形なもう一方の座標では逆計量と体積密度を先ほどの計算から採用し、**流束の二成分を作ってから発散を取る**。

<!-- proof-start -->
### 証明

$G_x=I_2$ なので、[Laplace--Beltrami座標式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)に $\rho_x=1$ を代入すると

$$
\Delta_gf=\partial_{uu}(u^4+v^2)+\partial_{vv}(u^4+v^2)
=12u^2+2.
$$

$y=(s,t)$ では $\rho_y=1$、$G_y^{-1}$ は第2節の行列である。$\partial_sf_\psi=4u^3$、$\partial_tf_\psi=-8tu^3+2t$ を代入した流束は

$$
\begin{aligned}
Q^s&=(1+4t^2)4u^3+2t(-8tu^3+2t)
=4u^3+4t^2,\\
Q^t&=2t\cdot4u^3-8tu^3+2t=2t.
\end{aligned}
$$

$\partial_su=1$ だから $\partial_sQ^s=12u^2$、$\partial_tQ^t=2$。したがって $\Delta_gf=\partial_sQ^s+\partial_tQ^t=12u^2+2$。他方、$u_t=-2t$ を微分に入れると

$$
\partial_{ss}f_\psi=12u^2,\qquad
\partial_{tt}f_\psi=-8u^3+48t^2u^2+2.
$$

$u=1,t=1/2$ で素朴な偏微分和は $12-8+12+2=18$、幾何学的な作用素値は $14$ である。ここで壊したのは「座標の計量が単位行列」という仮定であり、曲面が変わったのではない。$\square$
<!-- proof-end -->

## 4. 離散計算で生じる不一致は別の原因をもつ

連続の座標不変性は厳密である。一方、格子上では、微分の差分近似や格子間の補間を行う。**前者は作用素の差分誤差、後者はスカラー値の再標本化誤差**であり、異なる手順・評価量を持つ。

幅 $h>0$ の中心差分を $D_h^sQ=[Q(s+h,t)-Q(s-h,t)]/(2h)$、$D_h^tQ=[Q(s,t+h)-Q(s,t-h)]/(2h)$ とする。格子内の近接点を使用するため、対象点とその周囲の評価点がチャート領域内にあるものとする。

双線形補間 $I_hF$ は、$s,t$ の直交格子で一つのセルの四隅の関数値を、各方向に線形の非負重みで混ぜる手続きである。$s=a+\lambda h,t=b+\mu h$（$0\le\lambda,\mu\le1$）なら

$$
\begin{aligned}
I_hF(s,t)&=(1-\lambda)(1-\mu)F(a,b)+\lambda(1-\mu)F(a+h,b)\\
&\quad+(1-\lambda)\mu F(a,b+h)+\lambda\mu F(a+h,b+h).
\end{aligned}
$$

これらの方法は、幾何学的な関数そのものではなく、有限個の関数評価を使って数値を作る。

<a id="prop-mfl38-discrete-errors"></a>
<!-- formal-statement-start -->
> **命題（中心差分と双線形補間の誤差の分離）**  
> 前命題の円柱面で $f_\phi=u^4+v^2$ を用い、$h>0$ とする。中心差分を、各チャートで計量を考慮した**解析的な流束**に適用し、$(D_h^u(4u^3)+D_h^v(2v))$ および $(D_h^sQ^s+D_h^tQ^t)$ とする。全評価点がチャート内なら、両者はともに

$$
12u^2+2+4h^2
$$

> に等しい。一方、$C^2$ 関数 $F$ を一辺 $h$ の閉じたセルで双線形補間すると、セル全体で

$$
|I_hF-F|\le\frac{h^2}{8}\left(
\sup_{\mathrm{cell}}|\partial_{ss}F|
+\sup_{\mathrm{cell}}|\partial_{tt}F|\right)
$$

> が成立する。補間の誤差は作用素の差分誤差とは別である。
<!-- formal-statement-end -->

### 証明の見取り図

中心差分では三次式の対称差を展開する。補間は一変数の線形補間を二回施したものなので、一変数の剰余を二方向へ分けて評価する。

<!-- proof-start -->
### 証明

第一チャートで $4u^3$ を中心差分すると、二項展開により

$$
\begin{aligned}
D_h^u(4u^3)
&=\frac{4[(u+h)^3-(u-h)^3]}{2h}\\
&=\frac{4(6u^2h+2h^3)}{2h}
=12u^2+4h^2,
\qquad D_h^v(2v)=2.
\end{aligned}
$$

第二チャートでは[前命題の流束](#prop-mfl38-cylinder)は $Q^s=4(s-t^2)^3+4t^2$、$Q^t=2t$。$t$ を固定した $s$ の中心差分は上式で $u=s-t^2$ と置いたものに等しく、$D_h^tQ^t=2$。したがって両表示の値と厳密な $4h^2$ の差分誤差を得る。

次に一変数の区間 $[a,a+h]$ 上の $C^2$ 関数 $q$ について、両端線形補間を $Lq$ と書く。点 $z$ での補間誤差は、$q-Lq$ に両端と $z$ を零点とする補助関数を加えてRolleの定理を二度適用することで

$$
q(z)-Lq(z)=\frac{q''(\xi)}2(z-a)(z-a-h)
$$

となる（$\xi$ は区間内部）。$|(z-a)(z-a-h)|\le h^2/4$ より $|q-Lq|\le h^2\sup|q''|/8$。

二変数では $L_s,L_t$ を各方向の線形補間とすると $I_hF=L_tL_sF$ である。恒等式

$$
F-L_tL_sF=(F-L_tF)+L_t(F-L_sF)
$$

と $L_t$ の非負で総和1の重みによる最大値ノルム非増大性を使い、二つの一変数誤差上界を足して結論を得る。$\square$
<!-- proof-end -->

この命題は **正確な流束を差分した場合**の誤差である。実装で計量や関数値自体を格子から近似すれば、その誤差もさらに加わる。格子を変換したときの点の集合も一般に一致しないため、「有限差分・補間を含めた二つの実装の出力が厳密に同じ」とは結論できない。

### 再現可能な小規模実験

円柱上の同一点を二通りの座標で評価し、解析的な作用素値、計量を含む中心差分の値、計量を省いた二階偏微分和、各チャートの格子からの双線形補間を分けて表示する。乱数は使わず、全プリセットが決定論的である。測る量は無次元の関数値と差分誤差で、曲面の半径は1とする。

~~~python
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL38/scalar_chart_lab.py
# timeout-ms: 60000
# lab-preset: 同一点の二座標 | --u 1 --v 0.5 --h 0.2
# lab-preset: 再標本化の誤差 | --u 0.4 --v 0.37 --h 0.2
# lab-preset: 格子幅半減 | --u 0.4 --v 0.37 --h 0.1
~~~

実験で表示する「座標変換残差」は解析式の比較、「差分誤差」は $4h^2$ の項、「補間誤差」は関数値の再標本化誤差を指す。それぞれ原因が違うので、一つの平均値にまとめない。

## 5. 演習

### Level A：定義と係数を一段ずつ確認する

<a id="ex-mfl38-a01"></a>

### MFL38-A01 同一点の二つの表示

- Level: A
- 問題: 第1節の円柱チャート $\phi(u,v)=(\cos u,\sin u,v)$、$\psi(s,t)=\phi(s-t^2,t)$ とスカラー場 $f_\phi=u^4+v^2$ を使う。$u=v=1/2$ の点に対応する $(s,t)$ を求め、$f_\phi,f_\psi$ の値が一致することを、変換の逆写像を明記して確認せよ。

<a id="ex-mfl38-a02"></a>

### MFL38-A02 計量・逆計量・体積

- Level: A
- 問題: $T(s,t)=(s-t^2,t)$ と元の計量行列 $I_2$ について、$t=1/2$ のJacobian $J$ と $G_y=J^{\mathsf T}J$、$G_y^{-1}$、$\sqrt{\det G_y}$ を求めよ。どの行列が座標接ベクトルの内積を表すか説明せよ。

<a id="ex-mfl38-a03"></a>

### MFL38-A03 勾配のノルム

- Level: A
- 問題: $f_\phi=u^4+v^2$、$u=1,v=1/2$ における $(f_u,f_v)$ と、対応する $s=5/4,t=1/2$ における $(f_s,f_t)$ を求めよ。両チャートの逆計量を用いた二次形式を評価し、値が同じになることを確かめよ。

<a id="ex-mfl38-a04"></a>

### MFL38-A04 偏微分の素朴な和

- Level: A
- 問題: $f_\psi(s,t)=(s-t^2)^4+t^2$ とする。$u=s-t^2$ を途中の補助変数として明記し、$\partial_{ss}f_\psi+\partial_{tt}f_\psi$ を導け。$u=1,t=1/2$ での値を真の $\Delta_gf=12u^2+2$ と比較せよ。

### Level B：座標変更・数値近似を組み合わせる

<a id="ex-mfl38-b01"></a>

### MFL38-B01 発散とJacobianの打ち消し

- Level: B
- 問題: 平面の滑らかなチャート移行写像 $x^1=x^1(s,t),x^2=x^2(s,t)$ のJacobianの行列式 $d>0$ と、滑らかなベクトル成分 $W=(W^1,W^2)$ を与える。$dJ^{-1}W$ の発散を全展開し、$\partial_s(dJ^{-1}W)^s+\partial_t(dJ^{-1}W)^t=d(\partial_{x^1}W^1+\partial_{x^2}W^2)$ を、混合偏微分と連鎖律から証明せよ。

<a id="ex-mfl38-b02"></a>

### MFL38-B02 さらに別のチャート

- Level: B
- 問題: 円柱の $\psi(s,t)$ 座標に加え $r=s+2t,\ w=t$ とする座標を使う。$(u,v)$ を $(r,w)$ で表し、新座標での $f(r,w)$ と、$(u,v)$ に関する合成Jacobianを求めよ。$u=1,v=1/2$ の一点で関数値が同じことを確認せよ。

<a id="ex-mfl38-b03"></a>

### MFL38-B03 双線形補間の誤差

- Level: B
- 問題: 一辺 $h$ の矩形セル上の $F\in C^2$ について、$s$ 方向と $t$ 方向の線形補間を $L_s,L_t$ と定義する。一変数補間誤差の上界が $h^2\sup|q''|/8$ であることを用いて $|F-L_tL_sF|\le(h^2/8)(\sup|F_{ss}|+\sup|F_{tt}|)$ を証明せよ。なぜこれはLaplace–Beltrami作用素の座標不変性の破れではないか述べよ。

<a id="ex-mfl38-b04"></a>

### MFL38-B04 差分誤差を係数まで

- Level: B
- 問題: $f_\phi=u^4+v^2$ と、そのせん断チャートでの流束 $Q^s=4(s-t^2)^3+4t^2,Q^t=2t$ に対し、両チャートで解析流束の中心差分を計算せよ。どの $h$ について誤差が $4h^2$ となるか、評価点がチャート内にある条件を含めて述べよ。

### Level C：同一点で幾何と計算を統合する

<a id="ex-mfl38-c01"></a>

### MFL38-C01 円柱の二座標での完全照合

- Level: C
- 問題: $M$ を第1節の半径1円柱面部分とし、$p=\phi(1/2,1/2)$、$f_\phi=u^4+v^2$ とする。次を一つの計算として示せ。

  1. $p$ の $(s,t)$ 座標、各表示の関数値、$G_y,G_y^{-1}$、両表示の勾配ノルムの一致を計算する。
  2. $\Delta_gf(p)$ を二座標で流束から再導出し、$\partial_{ss}f_\psi+\partial_{tt}f_\psi$ との不一致を数値で示す。
  3. 正確な流束の中心差分を $h=1/10$ で行う場合の結果と厳密値との差を求める。双線形補間で再標本化する場合には、連続恒等式とは別に何の誤差上界を使うか書く。

## 6. 詳細解答

### Level A

<!-- solution-start -->
**MFL38-A01。** $u=s-t^2,v=t$ の逆は $s=u+v^2,t=v$ である。$u=v=1/2$ なら $s=1/2+1/4=3/4,t=1/2$。したがって

$$
f_\phi(1/2,1/2)=1/16+1/4=5/16,
$$

$$
f_\psi(3/4,1/2)=(3/4-1/4)^4+(1/2)^2=5/16.
$$

二つの引数は同じ曲面の点へ写るので一致する。これは座標値 $(u,v)$ と $(s,t)$ が一致するという意味ではない。

**MFL38-A02。** 変換を成分ごとに微分し、$t=1/2$ とすると

$$
J=\begin{pmatrix}1&-1\\0&1\end{pmatrix},\quad
J^{\mathsf T}J=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}.
$$

行列式は $2-1=1>0$、よって逆行列は

$$
G_y^{-1}=\begin{pmatrix}2&1\\1&1\end{pmatrix},\qquad \sqrt{\det G_y}=1.
$$

$J$ の列は $\partial_s,\partial_t$ を元の $\partial_u,\partial_v$ で展開した係数。$G_y$ はその列の内積を並べたGram行列であり、元の計量が $I_2$ だから $J^{\mathsf T}J$ となる。

**MFL38-A03。** 偏微分を先に計算すると

$$
(f_u,f_v)=(4u^3,2v)=(4,1),
$$

$$
(f_s,f_t)=(4u^3,-8tu^3+2t)=(4,-3).
$$

第一座標の逆計量は $I_2$ なのでノルム二乗は $4^2+1^2=17$。第二座標では

$$
(4,-3)\begin{pmatrix}2&1\\1&1\end{pmatrix}
\begin{pmatrix}4\\-3\end{pmatrix}
=(4,-3)\begin{pmatrix}5\\1\end{pmatrix}=17.
$$

これは偏微分の**各成分**ではなく、計量を使った二次形式が一致する例である。

**MFL38-A04。** $u=s-t^2$ なので $u_s=1,u_t=-2t$。まず

$$
f_s=4u^3,\quad f_{ss}=12u^2,\quad
f_t=-8tu^3+2t.
$$

これをさらに $t$ で微分すると

$$
f_{tt}=-8u^3-8t\cdot3u^2(-2t)+2
=-8u^3+48t^2u^2+2.
$$

$u=1,t=1/2$ で偏微分和は $12-8+12+2=18$。一方、逆計量を使う作用素は $12u^2+2=14$。差4は座標を取り替えたことで物理量が変わったためではなく、非直交計量の補正を省いたためである。
<!-- solution-end -->

### Level B

<!-- solution-start -->
**MFL38-B01。** $J=\begin{pmatrix}x^1_s&x^1_t\\x^2_s&x^2_t\end{pmatrix}$ とすると

$$
dJ^{-1}W=
\begin{pmatrix}x^2_tW^1-x^1_tW^2\\-x^2_sW^1+x^1_sW^2\end{pmatrix}.
$$

発散の積の微分を展開すると、$W^1$ に掛かる二階項 $x^2_{ts}-x^2_{st}$ と $W^2$ に掛かる $-x^1_{ts}+x^1_{st}$ は滑らかさから消える。残りの $W^1$ に関する項は

$$
x^2_t\partial_sW^1-x^2_s\partial_tW^1
=(x^2_tx^1_s-x^2_sx^1_t)\partial_{x^1}W^1
+(x^2_tx^2_s-x^2_sx^2_t)\partial_{x^2}W^1
=d\,\partial_{x^1}W^1.
$$

同じく $W^2$ に関する項は

$$
-x^1_t\partial_sW^2+x^1_s\partial_tW^2
=(-x^1_tx^1_s+x^1_sx^1_t)\partial_{x^1}W^2
+(-x^1_tx^2_s+x^1_sx^2_t)\partial_{x^2}W^2
=d\,\partial_{x^2}W^2.
$$

よって両者を足すと所望の式になる。ここで $W^i$ は $x=T(s,t)$ を通じて評価するので、連鎖律を用いた。

**MFL38-B02。** $w=t=v$、$r=s+2t=u+v^2+2v$ なので

$$
u=r-w^2-2w,\quad v=w,\quad
f(r,w)=(r-w^2-2w)^4+w^2.
$$

合成Jacobianは直接微分すると

$$
\frac{\partial(u,v)}{\partial(r,w)}
=\begin{pmatrix}1&-2w-2\\0&1\end{pmatrix}.
$$

これは $\partial(u,v)/\partial(s,t)$ と $\partial(s,t)/\partial(r,w)$ の積にも等しい。$u=1,v=1/2$ では $r=1+1/4+1=9/4,w=1/2$ であり、$u=9/4-1/4-1=1$。したがって $f(r,w)=1+1/4=5/4$。チャートを二度切り替えても関数は同じ点を評価する。

**MFL38-B03。** セルの $s$ 軸方向で端点線形補間すると、どの $t$ でも

$$
|F-L_sF|\le\frac{h^2}{8}\sup_{\mathrm{cell}}|F_{ss}|.
$$

同じく $t$ 方向で $|F-L_tF|\le(h^2/8)\sup|F_{tt}|$。二つの補間は異なる変数に作用するので可換であり、$L_t$ の重みは非負で和が1だから $\|L_tG\|_\infty\le\|G\|_\infty$。よって

$$
\begin{aligned}
|F-L_tL_sF|
&\le |F-L_tF|+|L_t(F-L_sF)|\\
&\le \frac{h^2}{8}
\left(\sup|F_{tt}|+\sup|F_{ss}|\right).
\end{aligned}
$$

これが有限格子の値から近似した**関数値**の誤差である。[座標不変性の定理](#thm-mfl38-laplacian-invariance)は滑らかな元の $F$ に作用する連続の等式なので矛盾しない。

**MFL38-B04。** 第一チャートでは流束 $(4u^3,2v)$ を使う。$h$ の正負両側に評価できる任意の点で

$$
\frac{4(u+h)^3-4(u-h)^3}{2h}
+\frac{2(v+h)-2(v-h)}{2h}
=12u^2+4h^2+2.
$$

第二チャートでは $t$ を固定した $Q^s$ の差分をとると、$u(s\pm h,t)=u\pm h$ だから同じ三次差分になる。$s$ を固定した $Q^t=2t$ の差分は2。両方とも真の値 $12u^2+2$ との差は正確に $4h^2$。条件は $h>0$、$(u\pm h,v)$ および $(s\pm h,t),(s,t\pm h)$ がそれぞれのチャート領域内にあることである。数値実装ではこのほか浮動小数丸めがあり得る。
<!-- solution-end -->

### Level C

<!-- solution-start -->
**MFL38-C01。** まず $s=u+v^2=3/4,t=v=1/2$。$f_\phi=1/16+1/4=5/16$、$f_\psi=(3/4-1/4)^4+1/4=5/16$。変換Jacobianの列を直交基底で表せば

$$
J=\begin{pmatrix}1&-1\\0&1\end{pmatrix},\qquad
G_y=\begin{pmatrix}1&-1\\-1&2\end{pmatrix},\qquad
G_y^{-1}=\begin{pmatrix}2&1\\1&1\end{pmatrix}.
$$

第一チャートの偏微分は $(4u^3,2v)=(1/2,1)$。第二チャートは $J^{\mathsf T}(1/2,1)^{\mathsf T}=(1/2,1/2)^{\mathsf T}$。したがって

$$
|\nabla_gf|^2=\frac14+1=\frac54,\qquad
(\tfrac12,\tfrac12)G_y^{-1}(\tfrac12,\tfrac12)^{\mathsf T}
=(\tfrac12,\tfrac12)(\tfrac32,1)^{\mathsf T}
=\frac54.
$$

第一座標での作用素は $\partial_u(4u^3)+\partial_v(2v)=12u^2+2=5$。第二座標では計量を含む流束

$$
Q^s=4(s-t^2)^3+4t^2,\qquad Q^t=2t
$$

を使い、$\partial_sQ^s=12u^2=3$、$\partial_tQ^t=2$ なので同じく5。一方、素朴な偏微分和は

$$
12u^2-8u^3+48t^2u^2+2
=3-1+3+2=7.
$$

計量の非対角項とその位置依存を落としたため2だけずれた。

最後に正確な流束の中心差分は、両チャートで $5+4(1/10)^2=5.04$、誤差は $0.04$。双線形補間を併用するときは、セルがチャート領域内に含まれ、対象の表示 $F=f_\phi$ または $f_\psi$ の二階偏微分がセル上で有界であることを確かめ、

$$
|I_hF-F|\le(h^2/8)(\sup|F_{ss}|+\sup|F_{tt}|)
$$

（第一チャートでは $s,t$ を $u,v$ と読み替える）を別に使う。格子点だけの計算で連続の座標不変性そのものを否定してはならない。$\square$
<!-- solution-end -->

## 7. まとめと次への問い

- スカラー場は曲面の点に付いた値であり、座標表示は $f_\psi=f_\phi\circ T$ と変わる。
- 計量 $G_y=J^{\mathsf T}G_xJ$ と微分 $\partial_yf=J^{\mathsf T}\partial_xf$ を同時に変えれば、勾配の長さやLaplace–Beltrami作用素の値は一致する。
- 円柱面の非線形せん断座標では、素朴な二階偏微分和と正しい作用素は異なる。正しい流束を使っても数値差分には $O(h^2)$ の差分誤差がある。
- 曲面の格子上のデータは再標本化・補間されるので、その誤差を座標の幾何学的な不変性とは分けて評価する。

次はスカラーではなく**接ベクトル場**を扱う。点ごとの基底を取り替えると、値が同じままではなくベクトルの座標成分も変わる。そこから局所frameの比較、さらに辺上の輸送へ進む。
