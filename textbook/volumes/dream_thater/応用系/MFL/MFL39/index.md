# MFL39 接ベクトル場とchart/frameの変更

<!-- definition-example-audit: strict -->

## 1. スカラー値から「向きをもつ量」へ

[MFL38のスカラー場](../MFL38/index.md#def-mfl38-scalar-chart)は、チャートを変えても同じ点の値を返した。しかし風速や曲面上の移動方向は数値一つではなく、各点の**接空間に属するベクトル**である。曲面の座標を変えると、接ベクトルそのものは同じでも「何本分の座標軸か」を表す数値は変わる。

[GEO2の接空間の座標基底](../../../幾何系/GEO/GEO2/index.md#def-geo2-coordinate-basis)と[GEO5の滑らかなベクトル場](../../../幾何系/GEO/GEO5/index.md#def-geo5-vector-field)を利用し、曲面を局所的にパラメータ化する逆チャート $\phi:U\subset\mathbb R^2\to M$ を考える。ここでは滑らかな二次元埋め込み曲面 $M\subset\mathbb R^3$ を扱う。$\phi$ は像への微分同相であり、$D\phi$ の階数は2とする。標準基底を $\boldsymbol\epsilon_i\in\mathbb R^2$ とすると、座標 $x=(x^1,x^2)$ の方向に点を動かした速度は

$$
D\phi_x(\boldsymbol\epsilon_i)=\partial_{x^i}\phi(x)\in T_{\phi(x)}M
$$

である。$D\phi_x$ の階数が2なので、この二本は一次独立であり、二次元の接空間の基底となる。以下の $E_x$ は、この**三次元接ベクトル二本を列に並べた行列**を意味する。

<a id="def-mfl39-tangent-field-components"></a>
<!-- formal-statement-start -->
> **定義（接ベクトル場の局所成分表示）**  
> $M\subset\mathbb R^3$ を滑らかな二次元埋め込み曲面、$\phi:U\subset\mathbb R^2\to M$ を像への滑らかな微分同相で、$D\phi$ の階数が2である逆チャートとする。滑らかな写像 $V:M\to\mathbb R^3$ が各 $p\in M$ で $V(p)\in T_pM$ を満たすとき、これを接ベクトル場とする。$x\in U$ で

$$
V(\phi(x))=v_\phi^1(x)\,\partial_{x^1}\phi(x)
             +v_\phi^2(x)\,\partial_{x^2}\phi(x)
$$

> と一意に表される二成分列 $v_\phi=(v_\phi^1,v_\phi^2)^{\mathsf T}$ を、そのチャートでの成分表示とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl39-tangent-field-components -->
**定義の確認**。円柱の風向きを調べる。[MFL38の円柱](../MFL38/index.md#def-mfl38-scalar-chart)の開部分で

$$
\phi(u,v)=(\cos u,\sin u,v),\quad
e_u=\partial_u\phi=(-\sin u,\cos u,0),\quad
e_v=\partial_v\phi=(0,0,1)
$$

とする。$e_u,e_v$ は $D\phi$ の二列だから接ベクトルであり、内積は

$$
e_u\cdot e_u=e_v\cdot e_v=1,\qquad e_u\cdot e_v=0.
$$

よって一次独立で、二次元接空間を張る。$V=2e_u-e_v$ と置けば $V$ は滑らかであり、全点で接平面に入る。基底展開の一意性から二成分は $(v_\phi^1,v_\phi^2)=(2,-1)$ である。一方、三次元成分は $(-2\sin u,2\cos u,-1)$ と点ごとに変わる。**二成分**と**三次元の矢印**を混同しない。
<!-- definition-example-end -->

## 2. チャートの軸を変えたら成分は逆向きに変える

逆チャート $\phi(x)$ と $\psi(y)$ が重なる領域では、$x=T(y)=\phi^{-1}\circ\psi(y)$ である。[MFL38で使ったJacobian](../MFL38/index.md#thm-mfl38-metric-transform)を

$$
J^i{}_a(y)=\frac{\partial x^i}{\partial y^a}
$$

と書く。$J$ の第 $a$ 列は、新しい座標軸の接ベクトルが古い二本の軸に対してどんな係数をもつかを表す。すなわち基底を列に並べた $E_x=(\partial_{x^1}\phi,\partial_{x^2}\phi)$ と $E_y=(\partial_{y^1}\psi,\partial_{y^2}\psi)$ は $E_y=E_xJ$ である。二成分を同じままにすると矢印が変わってしまうので、成分は逆行列を用いる必要がある。

<a id="thm-mfl39-chart-change"></a>
<!-- formal-statement-start -->
> **定理（チャート変更での接ベクトル成分と計量ノルム）**  
> $(M,g)$ を滑らかな二次元Riemann多様体、$\phi,\psi$ を重なる滑らかな逆チャート、$T=\phi^{-1}\circ\psi$、$J=DT$ とする。$V$ を共通領域の滑らかな接ベクトル場とし、両チャートの成分を $v_\phi,v_\psi$ とする。$E_x,E_y$ は各座標接ベクトルを列に並べたもの、$(G_x)_{ij}=g(\partial_{x^i},\partial_{x^j})$、$(G_y)_{ab}=g(\partial_{y^a},\partial_{y^b})$ は計量行列とする。対応する各点で、座標基底と成分はそれぞれ

$$
E_y=E_xJ,\qquad v_\psi=J^{-1}v_\phi
$$

> と変換する。また各チャートでの計量行列 $G_x,G_y$ は

$$
v_\psi^{\mathsf T}G_yv_\psi
=v_\phi^{\mathsf T}G_xv_\phi=g(V,V)
$$

> を満たす。各式の右辺は対応する同一点で評価し、$J$ は可逆である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\psi=\phi\circ T$ を各 $y^a$ で微分して $E_y=E_xJ$ とする。幾何学的ベクトル $V$ の二通りの基底展開を等置すると $Jv_\psi=v_\phi$ を得る。ノルムは計量行列の変換則で検算できる。

<!-- proof-start -->
### 証明

固定した点 $p=\psi(y)=\phi(x)$、$x=T(y)$ において、連鎖律より

$$
\partial_{y^a}\psi(y)=D\phi(x)\,\partial_{y^a}T(y)
=\sum_{i=1}^{2}J^i{}_a\,\partial_{x^i}\phi(x).
$$

二つの基底は一次独立だから $J$ は可逆である。$V=E_yv_\psi=E_xv_\phi$ に $E_y=E_xJ$ を代入すると $E_x(Jv_\psi-v_\phi)=0$。$E_x$ の列の一次独立性から $Jv_\psi=v_\phi$ を得る。

[MFL38の計量行列変換則](../MFL38/index.md#thm-mfl38-metric-transform)で $G_y=J^{\mathsf T}G_xJ$ だから

$$
\begin{aligned}
v_\psi^{\mathsf T}G_yv_\psi
&=(J^{-1}v_\phi)^{\mathsf T}
  (J^{\mathsf T}G_xJ)(J^{-1}v_\phi)\\
&=v_\phi^{\mathsf T}(J^{-1})^{\mathsf T}J^{\mathsf T}
  G_xJJ^{-1}v_\phi\\
&=v_\phi^{\mathsf T}G_xv_\phi.
\end{aligned}
$$

最後の式は計量を二回 $V$ に作用させた $g(V,V)$ そのものである。$\square$
<!-- proof-end -->

### 円柱の非線形せん断で方向を検算する

$u=s-t^2,v=t$ に変えると、$t=1/2$ で

$$
J=\begin{pmatrix}1&-1\\0&1\end{pmatrix},
\quad J^{-1}=\begin{pmatrix}1&1\\0&1\end{pmatrix},
\quad G_y=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}.
$$

古い座標の $V=2e_u-e_v$ の成分は $(2,-1)^{\mathsf T}$、新しい座標では

$$
v_\psi=J^{-1}\begin{pmatrix}2\\-1\end{pmatrix}
=\begin{pmatrix}1\\-1\end{pmatrix}.
$$

新しい軸は $\partial_s=e_u,\ \partial_t=-e_u+e_v$ なので、$1\partial_s-1\partial_t=2e_u-e_v$ と矢印が一致する。さらに

$$
(1,-1)\begin{pmatrix}1&-1\\-1&2\end{pmatrix}
\begin{pmatrix}1\\-1\end{pmatrix}=5=2^2+(-1)^2.
$$

チャートの二成分の普通の二乗和 $1^2+(-1)^2=2$ を長さと呼べない。新しい座標軸は直交していないからである。

## 3. チャート変更と、同じ点でのフレーム変更は違う

チャートを固定しても、接平面内に二本の別の軸を自由に選べる。各点で一次独立な滑らかな接ベクトル場二本の組を**局所フレーム**という。曲面の計量 $g$ に対して、各点の軸を長さ1かつ直交に選べば、長さの計算が簡単になる。以下でこの特別なフレームを定義する。$\delta_{ab}$ は $a=b$ なら1、それ以外は0となるKroneckerのデルタである。ここでは向きを反転する取り替えも含めるため、

$$
O(2)=\{R\in\mathbb R^{2\times2}:R^{\mathsf T}R=I_2\}
$$

という二次元直交群を使う。$I_2$ は二次の単位行列である。

<a id="def-mfl39-orthonormal-frame"></a>
<!-- formal-statement-start -->
> **定義（局所正規直交フレーム）**  
> $(M,g)$ を二次元Riemann多様体、$W\subset M$ を開部分とする。$W$ 上の二つの滑らかな接ベクトル場 $e_1,e_2$ が、すべての $p\in W$ で

$$
g_p(e_a,e_b)=\delta_{ab}\qquad(a,b=1,2)
$$

> を満たすとき、$E=(e_1,e_2)$ を $W$ 上の局所正規直交フレームという。$V=e_1c^1+e_2c^2=Ec$ の列 $c$ をフレーム成分という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl39-orthonormal-frame -->
**定義の確認**。円柱では先ほどの $e_u,e_v$ のEuclid内積が $e_u\cdot e_u=e_v\cdot e_v=1$、$e_u\cdot e_v=0$ である。したがって両方は接ベクトルで、滑らかに変わり、全点で正規直交性を満たす。これは定義の各条件を直接確かめた例である。一方、せん断チャートの軸 $(\partial_s,\partial_t)$ は $g(\partial_s,\partial_t)=-2t$ なので一般には正規直交フレームではない。
<!-- definition-example-end -->

<a id="prop-mfl39-frame-change"></a>
<!-- formal-statement-start -->
> **命題（正規直交フレーム変更則）**  
> $(M,g)$ を二次元Riemann多様体、$W\subset M$ を開集合とし、$W$ 上の二つの滑らかな局所正規直交フレームを $E,E'$ とする。滑らかな $R:W\to O(2)$ が一意に存在して $E'=ER$ となる。同じ接ベクトル場 $V=Ec=E'c'$ のフレーム成分は

$$
c'=R^{\mathsf T}c,\qquad |c'|^2=|c|^2=g(V,V)
$$

> を満たす。$R$ は点によって変わってよい。
<!-- formal-statement-end -->

### 証明の見取り図

新しい二本の軸を古い直交基底で展開して係数を列に並べる。新旧双方で内積行列が単位行列になるので $R^{\mathsf T}R=I$。ベクトルの一致 $Ec=ERc'$ から成分変換が決まる。

<!-- proof-start -->
### 証明

$E=(e_1,e_2)$ が各接平面の基底なので $e'_a=\sum_b e_bR^b{}_a$ と一意に書ける。計量の双線形性を使えば

$$
\delta_{ab}=g(e'_a,e'_b)
=\sum_{i,j}R^i{}_aR^j{}_b\,g(e_i,e_j)
=\sum_iR^i{}_aR^i{}_b=(R^{\mathsf T}R)_{ab}.
$$

ゆえに $R^{-1}=R^{\mathsf T}$。$Ec=ERc'$ を基底の一次独立性で比較すると $c=Rc'$、すなわち $c'=R^{\mathsf T}c$。その二乗長は

$$
|c'|^2=c^{\mathsf T}RR^{\mathsf T}c=c^{\mathsf T}c=g(V,V).
$$

二つの滑らかなフレームの内積 $R^b{}_a=g(e_b,e'_a)$ は点に関して滑らかであり、$R$ の滑らかさも従う。$\square$
<!-- proof-end -->

**直接例：90度回転。** $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ なら $e'_1=e_2,e'_2=-e_1$。$V=2e_1-e_2$ の成分は

$$
c'=R^{\mathsf T}(2,-1)^{\mathsf T}=(-1,-2)^{\mathsf T},
\quad -e'_1-2e'_2=2e_1-e_2.
$$

新しいフレームが**90度回転**すると成分は**逆へ90度回転**する。これは三次元空間で物体を回す[MFL37の群作用](../MFL37/index.md#thm-mfl37-representation)とは別の、同じベクトルの表記の取り替えである。

## 4. 球面では「座標の二本」と「直交する二本」が異なる

単位球面 $S^2$ の北極・南極と経度の切れ目を除いた開部分を、余緯度 $0<\theta<\pi$ と経度 $\varphi$（例えば $-\pi<\varphi<\pi$）で

$$
p(\theta,\varphi)=
(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)
$$

と表す。球面上の曲線 $q(t)$ は $q(t)\cdot q(t)=1$ を満たす。その両辺を微分すると

$$
2q(t)\cdot q'(t)=0.
$$

したがって接ベクトルは点 $p$ と直交する。球面は二次元で、$p\ne0$ だから接平面は $p$ に直交する二次元平面に一致する。接ベクトルは $p$ をパラメータで微分して得られるため、球面上の座標軸の意味を三次元ベクトルに戻して検証できる。

<a id="prop-mfl39-sphere-frame"></a>
<!-- formal-statement-start -->
> **命題（球面の座標・正規直交フレーム）**  
> 単位球面の逆チャート $p(\theta,\varphi)=(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)$ を $0<\theta<\pi$、$-\pi<\varphi<\pi$ 上で用い、計量を三次元Euclid内積から誘導する。このチャート上で

$$
e_\theta=(\cos\theta\cos\varphi,\cos\theta\sin\varphi,-\sin\theta),
\quad
e_\varphi=(-\sin\varphi,\cos\varphi,0)
$$

> とする。$E=(e_\theta,e_\varphi)$ は局所正規直交フレームであり、座標基底と計量は

$$
\partial_\theta p=e_\theta,\qquad
\partial_\varphi p=\sin\theta\,e_\varphi,\qquad
G_{\mathrm{coord}}=\begin{pmatrix}1&0\\0&\sin^2\theta\end{pmatrix}.
$$

> 同じ $V=a\,e_\theta+b\,e_\varphi$ の座標成分は $(a,b/\sin\theta)^{\mathsf T}$ で、長さの二乗は $a^2+b^2$ である。極点はこのチャートとフレームの定義域に含まない。
<!-- formal-statement-end -->

### 証明の見取り図

$p$ の偏微分を計算し、$\sin\theta$ が経度方向の軸の長さを決めることを確認する。$e_\theta,e_\varphi$ の内積を計算して正規直交性を示し、基底展開を比較して成分を得る。

<!-- proof-start -->
### 証明

$p$ を $\theta$ と $\varphi$ で別々に微分すると

$$
\partial_\theta p=(\cos\theta\cos\varphi,\cos\theta\sin\varphi,-\sin\theta)=e_\theta,
$$

$$
\partial_\varphi p=(-\sin\theta\sin\varphi,\sin\theta\cos\varphi,0)
=\sin\theta\,e_\varphi.
$$

$p\cdot e_\theta=\sin\theta\cos\theta(\cos^2\varphi+\sin^2\varphi)-\sin\theta\cos\theta=0$。また $p\cdot e_\varphi=0$。よって両者は接平面に入る。その内積は

$$
e_\theta\cdot e_\theta=\cos^2\theta+\sin^2\theta=1,\quad
e_\varphi\cdot e_\varphi=1,\quad
e_\theta\cdot e_\varphi=0.
$$

これで滑らかな正規直交フレームの全条件を満たす。座標軸の内積から $G_{\mathrm{coord}}$ を得る。$\sin\theta>0$ の領域なので

$$
V=a\partial_\theta p+\frac{b}{\sin\theta}\partial_\varphi p.
$$

この座標成分を計量に入れると $a^2+\sin^2\theta(b/\sin\theta)^2=a^2+b^2$。$\theta=0,\pi$ では $\partial_\varphi p=0$ で二本が基底にならないため、この式をそこで使えない。$\square$
<!-- proof-end -->

**数値での確認。** $\theta=\pi/3,\varphi=0$ なら

$$
p=(\sqrt3/2,0,1/2),\quad
e_\theta=(1/2,0,-\sqrt3/2),\quad e_\varphi=(0,1,0).
$$

$V=e_\theta+2e_\varphi$ のフレーム成分は $(1,2)$、座標成分は $(1,4/\sqrt3)$。$G_{\mathrm{coord}}=\operatorname{diag}(1,3/4)$ だから $1+(3/4)(16/3)=5$、直交フレームでの $1^2+2^2=5$ と合う。数値行列だけの確認ではなく、各列がどの接ベクトルを表すかが重要である。

## 5. 隣の点の成分を引くだけでは微分にならない

これまでの変換は**一点の同じ接空間内**で成立した。ところが異なる点 $p,q$ の接ベクトルは、原則として異なる接空間 $T_pM,T_qM$ に入る。フレーム成分が一定でも、実際の矢印の向きは変化しうる。これが、[GEO13の曲線に沿う共変微分](../../../幾何系/GEO/GEO13/index.md#def-geo13-curve-covariant-derivative)と[Levi-Civita接続](../../../幾何系/GEO/GEO13/index.md#def-geo13-levi-civita)が必要な理由である。

球面では、三次元の通常微分を接平面へ直交射影することで共変微分を直接計算できる。点 $p$ での射影は $P_p(w)=w-(w\cdot p)p$ であり、$|p|=1$ なので法線方向の成分を除く。

この方法が球面のLevi-Civita接続を与える理由も確認しよう。球面の接ベクトル場 $X,Y,Z$ と三次元での方向微分 $D_XY$ に対して

$$
\widetilde\nabla_XY=P_p(D_XY)
$$

と置く。射影は接方向では恒等写像だから

$$
\begin{aligned}
X\,g(Y,Z)
&=(D_XY)\cdot Z+Y\cdot(D_XZ)\\
&=g(\widetilde\nabla_XY,Z)+g(Y,\widetilde\nabla_XZ).
\end{aligned}
$$

ここで $X\,g(Y,Z)$ は[GEO5のベクトル場の導分作用](../../../幾何系/GEO/GEO5/index.md#def-geo5-vector-field-derivation)をスカラー場 $g(Y,Z)$ に適用したものである。上式は[GEO13の計量両立性](../../../幾何系/GEO/GEO13/index.md#def-geo13-metric-compatibility)を表す。

次に上で定めた球面の滑らかな座標写像 $p(x^1,x^2)$ の座標ベクトルを $\partial_i p$ と書く。$p$ は滑らかなので各成分に[RA6の混合偏微分の交換](../../../基礎科目/RA/RA6/index.md#thm-ra6-mixed-partials)を適用でき、

$$
\widetilde\nabla_{\partial_i}\partial_j-\widetilde\nabla_{\partial_j}\partial_i
=P_p(\partial_i\partial_jp-\partial_j\partial_ip)=0
$$

となり、座標ベクトルのLie括弧も0である。[GEO13の捩率のテンソル性](../../../幾何系/GEO/GEO13/index.md#prop-geo13-torsion-tensor)により座標基底で捩率が消えれば全ての接ベクトル場について捩率は0となる。射影と通常微分は接続の線形性・Leibniz則を満たすため、[GEO13のLevi-Civita接続の存在一意性](../../../幾何系/GEO/GEO13/index.md#thm-geo13-levi-civita-existence)により $\widetilde\nabla=\nabla$ である。これは球面における具体的な計算方法であり、任意の多様体の接続を三次元射影で定義するものではない。

以下、緯線上の $a'=da/d\varphi$、$b'=db/d\varphi$ は経度 $\varphi$ による導関数を表す。$\partial_\varphi$ は緯度 $\theta=\theta_0$ を固定する偏微分、$d/d\varphi$ は曲線に沿う全微分であり、$\dot\gamma=d\gamma/d\varphi$ と書く。

<a id="prop-mfl39-sphere-connection"></a>
<!-- formal-statement-start -->
> **命題（球面緯線の接続項と平行成分）**  
> 単位球面の逆チャート $p(\theta,\varphi)=(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)$ を $0<\theta<\pi$、$-\pi<\varphi<\pi$ で用い、$e_\theta=\partial_\theta p$、$e_\varphi=(\sin\theta)^{-1}\partial_\varphi p$ とする。$0<\theta_0<\pi$ を固定し、このチャート内の緯線 $\gamma(\varphi)=p(\theta_0,\varphi)$ を考える。$\gamma$ に沿う滑らかな接ベクトル場を

$$
V(\varphi)=a(\varphi)e_\theta+b(\varphi)e_\varphi
$$

> とする。$a'=da/d\varphi$、$b'=db/d\varphi$ と書く。この球面のLevi-Civita共変微分は

$$
\nabla_{\dot\gamma}V
=(a'-\cos\theta_0\,b)e_\theta
 +(b'+\cos\theta_0\,a)e_\varphi.
$$

> 特に $V=e_\theta$ は $\nabla_{\dot\gamma}V=\cos\theta_0\,e_\varphi$ となる。さらに初期値 $V(0)=e_\theta(0)$ の平行場は

$$
a(\varphi)=\cos(\varphi\cos\theta_0),\qquad
b(\varphi)=-\sin(\varphi\cos\theta_0)
$$

> であり、その長さは常に1である。式は経度チャート内の区間で読む。
<!-- formal-statement-end -->

### 証明の見取り図

球面の直交フレームを経度で微分する。$e_\theta$ の変化は接方向、$e_\varphi$ の変化には法線方向も混じる。接平面へ射影すると接方向の回転が残り、これが成分微分を補う項になる。平行条件は二本の成分についての一階連立方程式になる。

<!-- proof-start -->
### 証明

前節の明示式を $\varphi$ で微分する。$\theta=\theta_0$ は固定なので

$$
\partial_\varphi e_\theta
=\cos\theta_0(-\sin\varphi,\cos\varphi,0)
=\cos\theta_0 e_\varphi,
$$

$$
\partial_\varphi e_\varphi=(-\cos\varphi,-\sin\varphi,0).
$$

後者を $e_\theta,e_\varphi,p$ の正規直交基底で展開するため内積を取ると

$$
\partial_\varphi e_\varphi\cdot e_\theta=-\cos\theta_0,\quad
\partial_\varphi e_\varphi\cdot e_\varphi=0,\quad
\partial_\varphi e_\varphi\cdot p=-\sin\theta_0.
$$

したがって

$$
\partial_\varphi e_\varphi
=-\cos\theta_0 e_\theta-\sin\theta_0 p.
$$

$V=ae_\theta+be_\varphi$ の通常の微分で積の微分を行うと

$$
\frac{dV}{d\varphi}
=(a'-\cos\theta_0 b)e_\theta
 +(b'+\cos\theta_0 a)e_\varphi
 -\sin\theta_0 b\,p.
$$

この最後の法線項だけを $P_{\gamma(\varphi)}$ が除き、命題の共変微分の式を得る。$a=1,b=0$ の場合はそのうち $\cos\theta_0e_\varphi$ が残る。

平行条件 $\nabla_{\dot\gamma}V=0$ は、二本の一次独立性から $a'=\cos\theta_0 b$、$b'=-\cos\theta_0 a$ となる。$k=\cos\theta_0$ と置き、初期値 $a(0)=1,b(0)=0$ に対して $a=\cos(k\varphi), b=-\sin(k\varphi)$ を微分すれば

$$
a'=-k\sin(k\varphi)=kb,\qquad
b'=-k\cos(k\varphi)=-ka
$$

が確かめられる。さらに $a^2+b^2=\cos^2(k\varphi)+\sin^2(k\varphi)=1$。連立線形常微分方程式の解の一意性は[GEO13の平行移動の存在一意性](../../../幾何系/GEO/GEO13/index.md#thm-geo13-parallel-existence)で保証される。$\square$
<!-- proof-end -->

$\theta_0=\pi/3$ なら、成分一定の $e_\theta$ は $\nabla_{\dot\gamma}e_\theta=\tfrac12 e_\varphi\ne0$。反対に平行場の成分は $\varphi=\pi/2$ で $(1/\sqrt2,-1/\sqrt2)$ へ変わる。**一定成分≠平行、変動成分≠幾何学的変化**である。例外的に赤道 $\theta_0=\pi/2$ では $\cos\theta_0=0$ となり、この緯線のフレームは進行方向に沿って平行である。一般性を誤って推定してはならない。

曲面上のベクトル特徴を複数点から集約するとき、各点の二成分をそのまま加えると、各点で異なる軸に関する数値を混ぜてしまう。後続のMFL40ではこのフレームの局所回転を各点で独立に行ったときの法則を整理し、MFL41で**辺に沿う輸送**を組み込む。ここでは平行移動の必要性までを確かめ、学習層の一般的な保証とは混同しない。

### 再現可能な計算ラボ

単位球面の $\theta,\varphi$ とフレーム回転角 $\alpha$ を変更すると、同じ三次元接ベクトルを新旧の正規直交フレームで再構成する。別に円柱のチャート変更を検算する。球面上の一定成分場の経度方向の有限差分を接平面に射影した値と、上の解析的な共変微分の残差も計測する。$\varphi$ は切れ目から離して選び、差分幅 $h$ はラジアン単位とする。乱数は使わない。

~~~python
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL39/tangent_frame_lab.py
# timeout-ms: 60000
# lab-preset: 球面のフレーム90度回転 | --theta 1.0471975512 --phi 0.3 --alpha 1.5707963268 --h 0.02
# lab-preset: 緯線の接続項 | --theta 1.0471975512 --phi 0.5 --alpha 0.7 --h 0.01
# lab-preset: 赤道での例外 | --theta 1.5707963268 --phi 0.5 --alpha 0.7 --h 0.01
~~~

解析的な変換則の残差は浮動小数点の丸めに限られる。一方、中心差分の誤差は $h$ を半分にすると概ね4分の1になる。後者を座標やフレームに対する理論的な非等変性と呼んではならない。

## 6. 演習

### Level A：各基底が何を表すか確認する

<a id="ex-mfl39-a01"></a>
### MFL39-A01 円柱での成分とノルム
- Level: A
- 問題: 円柱の $u=s-t^2,v=t$ において $t=1/4$ とする。元の直交座標の接ベクトル $V=3e_u-2e_v$ の新座標成分を求め、変換後の計量行列で長さの二乗を検算せよ。

<a id="ex-mfl39-a02"></a>
### MFL39-A02 直交フレームの90度回転
- Level: A
- 問題: 正規直交フレーム $(e_1,e_2)$ を $e'_1=e_2,e'_2=-e_1$ に替える。$V=e_1+3e_2$ の新フレーム成分と再構成した $V$、二乗長を求めよ。

<a id="ex-mfl39-a03"></a>
### MFL39-A03 球面の座標基底と長さ
- Level: A
- 問題: 単位球面の $\theta=\pi/6$ で $V=2\partial_\theta+4\partial_\varphi$ とする。正規直交フレーム成分と $g(V,V)$ を求めよ。

<a id="ex-mfl39-a04"></a>
### MFL39-A04 一定成分は平行か
- Level: A
- 問題: 緯線上 $V=e_\theta$ とする。$\theta_0=\pi/3$ と $\theta_0=\pi/2$ のそれぞれで $\nabla_{\dot\gamma}V$ を求め、条件の違いを説明せよ。

### Level B：変換則と微分を組み合わせる

<a id="ex-mfl39-b01"></a>
### MFL39-B01 基底側から逆変換を導く
- Level: B
- 問題: 円柱の $u=s-t^2,v=t$ について、$V=p\partial_s+q\partial_t$ の旧座標成分を導け。$t=1/2,(p,q)=(1,-1)$ のとき二つの計量ノルムを直接計算せよ。

<a id="ex-mfl39-b02"></a>
### MFL39-B02 点に依存するフレーム回転
- Level: B
- 問題: 球面の直交フレーム $E=(e_\theta,e_\varphi)$ を、経度 $\varphi$ に依存する回転 $E'=ER(\varphi)$、$R(\varphi)=\begin{pmatrix}\cos\varphi&-\sin\varphi\\\sin\varphi&\cos\varphi\end{pmatrix}$ で取り替える。$V=e_\theta$ の新成分と再構成結果を求め、成分の通常微分だけでは幾何学的微分を判定できない理由を述べよ。

<a id="ex-mfl39-b03"></a>
### MFL39-B03 平行場を出発点から検算する
- Level: B
- 問題: $\theta_0=\pi/3$ の緯線で $a(\varphi)=\cos(\varphi/2)$、$b(\varphi)=-\sin(\varphi/2)$ とする。共変微分の二成分を計算して0になること、$\varphi=\pi/2$ で長さが1であることを示せ。

<a id="ex-mfl39-b04"></a>
### MFL39-B04 座標成分の二乗和の落とし穴
- Level: B
- 問題: 球面で $V=4\partial_\varphi$ とする。$\theta=\pi/6$ と $\theta=\pi/2$ の長さを比較し、「座標成分 $(0,4)$ が同じなら長さも同じ」という主張を反駁せよ。極点へ近づけた場合も説明せよ。

### Level C：チャート・フレーム・接続を一度に扱う

<a id="ex-mfl39-c01"></a>
### MFL39-C01 球面の二重表示と緯線微分
- Level: C
- 問題: 球面で旧座標 $x=(\theta,\varphi)$ に対し新座標 $y=(s,t)$ を $\theta=s,\ \varphi=t+s$ とする。$\theta=s=\pi/6$、$V=e_\theta+e_\varphi$ を考える。緯線のパラメータは $t$ とし $s$ を固定する。

  1. $J=Dx/Dy$ と新座標成分、$G_y$ を求め、二乗長を検算せよ。
  2. 同じ点の正規直交フレームを90度回すと成分はどうなるか。
  3. $V$ を緯線上でフレーム成分 $(1,1)$ 一定の場とすると、$\nabla_{\dot\gamma}V$ とその二乗長はいくらか。

## 7. 詳細解答

### Level A

<!-- solution-start -->
**MFL39-A01。** 新座標から旧座標への微分を列ごとに求めると

$$
J=\begin{pmatrix}1&-2t\\0&1\end{pmatrix},\qquad
J^{-1}\big|_{t=1/4}=\begin{pmatrix}1&1/2\\0&1\end{pmatrix}
$$

となる。[チャート変更則](#thm-mfl39-chart-change)により

$$
v_\psi=J^{-1}(3,-2)^{\mathsf T}=(2,-2)^{\mathsf T}.
$$

円柱の旧計量は $I_2$ で、新計量は $J^{\mathsf T}J$、すなわち

$$
G_y=\begin{pmatrix}1&-1/2\\-1/2&5/4\end{pmatrix}.
$$

計量行列を新成分に作用させると

$$
G_y(2,-2)^{\mathsf T}=(3,-7/2)^{\mathsf T},\qquad
(2,-2)G_y(2,-2)^{\mathsf T}=2\cdot3+(-2)(-7/2)=13.
$$

旧表示でも $3^2+(-2)^2=13$ となる。

**MFL39-A02。** $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ は $R^{\mathsf T}R=I$ を満たす。

$$
c'=R^{\mathsf T}(1,3)^{\mathsf T}=(3,-1)^{\mathsf T}.
$$

$3e'_1-e'_2=3e_2+e_1=V$。どちらも二乗長は $1^2+3^2=10$。

**MFL39-A03。** [球面のフレーム](#prop-mfl39-sphere-frame)の $\partial_\theta=e_\theta$、$\partial_\varphi=\sin\theta e_\varphi$ を $\theta=\pi/6$ で使う。$\sin\theta=1/2$ だから

$$
V=2e_\theta+4(1/2)e_\varphi=2e_\theta+2e_\varphi.
$$

ゆえに二乗長は $2^2+2^2=8$。座標計量で直接計算しても $4+(1/4)16=8$。

**MFL39-A04。** [緯線の共変微分式](#prop-mfl39-sphere-connection)へ $a=1,b=0,a'=b'=0$ を代入すると

$$
\nabla_{\dot\gamma}V=\cos\theta_0e_\varphi
=\begin{cases}\frac12e_\varphi,&\theta_0=\pi/3,\\0,&\theta_0=\pi/2.\end{cases}
$$

前者は零でなく、赤道では零である。成分一定だけでは平行か判定できず、フレームの回転率 $\cos\theta_0$ も必要。
<!-- solution-end -->

### Level B

<!-- solution-start -->
**MFL39-B01。** $\partial_s=\partial_u$、$\partial_t=-2t\partial_u+\partial_v$ なので

$$
V=p\partial_s+q\partial_t=(p-2tq)\partial_u+q\partial_v.
$$

$t=1/2,p=1,q=-1$ なら $(v_u,v_v)=(2,-1)$。旧計量 $I_2$ で長さの二乗は5。一方、新計量は $G_y=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$ で

$$
(1,-1)G_y(1,-1)^{\mathsf T}
=(1,-1)(2,-3)^{\mathsf T}=5.
$$

係数の変換と計量の変換を両方使って初めて同じ長さが得られる。

**MFL39-B02。** 同じベクトルを $E'=ER$ で表示するから、[フレーム変更則](#prop-mfl39-frame-change)によって

$$
c'=R(\varphi)^{\mathsf T}(1,0)^{\mathsf T}
=(\cos\varphi,-\sin\varphi)^{\mathsf T}.
$$

実際に

$$
(\cos\varphi)e'_1-(\sin\varphi)e'_2
=(\cos^2\varphi+\sin^2\varphi)e_\theta
 +(\sin\varphi\cos\varphi-\cos\varphi\sin\varphi)e_\varphi=e_\theta.
$$

新成分だけを微分すれば $(-\sin\varphi,-\cos\varphi)$ と非零であるが、元のフレーム成分 $(1,0)$ の微分は零。それでも[球面の接続項](#prop-mfl39-sphere-connection)を含む幾何学的微分は同一である。成分微分だけを不変量と呼べない。

**MFL39-B03。** $\theta_0=\pi/3$ では $k=\cos\theta_0=1/2$。[緯線の式](#prop-mfl39-sphere-connection)の第一成分は

$$
a'-kb=-\frac12\sin(\varphi/2)-\frac12(-\sin(\varphi/2))=0,
$$

第二成分は

$$
b'+ka=-\frac12\cos(\varphi/2)+\frac12\cos(\varphi/2)=0.
$$

$\varphi=\pi/2$ では $(a,b)=(1/\sqrt2,-1/\sqrt2)$ で、正規直交基底による二乗長は $1/2+1/2=1$。

**MFL39-B04。** [球面の座標基底](#prop-mfl39-sphere-frame)の $\partial_\varphi=\sin\theta e_\varphi$ から $V=4\sin\theta\,e_\varphi$。$0<\theta<\pi$ なので長さと座標計量による検算は

$$
\lVert V\rVert=4\sin\theta,\qquad
g(V,V)=(0,4)\begin{pmatrix}1&0\\0&\sin^2\theta\end{pmatrix}(0,4)^{\mathsf T}=16\sin^2\theta.
$$

$\theta=\pi/6$ なら長さ2、赤道 $\theta=\pi/2$ なら長さ4となる。座標成分の二乗和は両方16だが、計量係数を無視している。極点へ近づくとこのベクトル場の長さは0へ近づき、同時に $\partial_\varphi$ が零へ退化するので、経度座標の二本は基底でなくなる。「フレームの同じ成分」という議論を極点へ持ち込めない。
<!-- solution-end -->

### Level C

<!-- solution-start -->
**MFL39-C01。**

1. **チャート変更と計量。** $\theta=s,\varphi=t+s$ のJacobianと逆行列は

   $$
   J=\begin{pmatrix}1&0\\1&1\end{pmatrix},\qquad
   J^{-1}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
   $$

   $\theta=\pi/6$ では[球面の座標基底](#prop-mfl39-sphere-frame)より $\partial_\varphi=(1/2)e_\varphi$。$V=e_\theta+e_\varphi$ の旧座標成分は $(1,2)^{\mathsf T}$ だから、[チャート変更則](#thm-mfl39-chart-change)で新座標成分を得る。

   $$
   v_y=J^{-1}(1,2)^{\mathsf T}=(1,1)^{\mathsf T}.
   $$

   旧座標の計量 $G_x=\operatorname{diag}(1,1/4)$ から

   $$
   G_y=J^{\mathsf T}G_xJ
   =\begin{pmatrix}5/4&1/4\\1/4&1/4\end{pmatrix}.
   $$

   よって二乗長は

   $$
   (1,1)G_y(1,1)^{\mathsf T}
   =(1,1)(3/2,1/2)^{\mathsf T}=2.
   $$

   元の正規直交フレームでも $1^2+1^2=2$ となる。

2. **フレーム変更。** $E'=(e_\varphi,-e_\theta)=ER$ で、$R$ は90度回転行列である。[フレーム変更則](#prop-mfl39-frame-change)から

   $$
   R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
   c'=R^{\mathsf T}(1,1)^{\mathsf T}=(1,-1)^{\mathsf T}.
   $$

   新しい基底は $e'_1=e_\varphi,\ e'_2=-e_\theta$ だから、再構成は $e'_1-e'_2=e_\theta+e_\varphi$。矢印は同じである。

3. **緯線微分。** $s=\theta$ を固定すれば $d\varphi/dt=1$ であり、連鎖律 $dV/dt=(d\varphi/dt)(dV/d\varphi)$ により、$t$ による曲線速度は経度 $\varphi$ による速度と一致する。$a=b=1$ は一定なので、[接続項](#prop-mfl39-sphere-connection)に代入すると

   $$
   \nabla_{\dot\gamma}V
   =-\cos(\pi/6)e_\theta+\cos(\pi/6)e_\varphi
   =\frac{\sqrt3}{2}(-e_\theta+e_\varphi).
   $$

   二つは直交単位ベクトルだから二乗長は $(3/4)(1+1)=3/2$。$V$ 自体の二乗長2と微分の二乗長 $3/2$ は別の量であり、両者を混同しない。
<!-- solution-end -->

## 8. まとめと次への問い

- チャート変更では**座標基底が $J$、成分が $J^{-1}$** で変換する。計量を一緒に変換して初めて長さが一致する。
- 同一点での正規直交フレーム変更では**基底が $R$、成分が $R^{\mathsf T}$** で変換する。$R$ は点によって変わってよい。
- 異なる点の接空間をつなぐには、成分の通常の差だけでは足りない。球面の $\cos\theta_0$ 項はフレームそのものが回るために現れる。

次のMFL40では、各点で独立にフレームを変更しても「共変微分」や辺の輸送を正しく表せるための変換則を整理する。
