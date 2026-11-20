# SYZ1-09 Hessian計量とLegendre双対

<!-- definition-example-audit: strict -->

## 1. 二種類の周期座標を結ぶ量を見つける

[前講の二重整数アフィン構造](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)では、特殊Lagrange（SLag）トーラスの変形速度を、シンプレクティック周期 $u$ と複素周期 $t$ という二種類の局所座標で測った。両者の変換は一般には整数行列にならない。では、異なる二組の座標をどのような幾何学的量が結びつけるのか。

手掛かりはファイバー上の長さである。[法線場とHodge星の同定](../SYZ1-05/index.md#prop-syz1-05-hodge-identification)によると、変形速度 $v$ に付随する閉1形式 $\alpha_v$ と $(n-1)$ 形式 $\beta_v$ は $\beta_v=*\alpha_v$ を満たす。この二つを外積してファイバー全体で積分すれば、速度の内積ができる。

本講では、周期積分によってこの内積を座標表示し、**$t$ が $u$ の勾配になり、その微分が正定値行列になる**ことを証明する。次講の双対トーラスの複素座標に必要なLegendre変換をここで準備する。

## 2. SLag変形から基底の自然な計量を作る

$(X,J,g,\omega,\Omega)$ を複素次元 $n\ge1$ のKähler多様体とする。正則体積形式 $\Omega$ は零点を持たず、SLagファイバーでの実部が誘導体積形式になるよう規格化する。開いた連結な実 $n$ 次元多様体 $B_0$ の上に、[滑らかなSLagトーラス・ファイブレーション](../SYZ1-07/index.md#def-syz1-07-regular-fibration)

$$
\pi:X_0\longrightarrow B_0,\qquad L_b=\pi^{-1}(b)\cong T^n
$$

が追加で与えられているとする。ファイバーは連結・コンパクト・境界なしで、向きと位相 $\theta$ を局所的に固定する。$\chi=\operatorname{Im}(e^{-i\theta}\Omega)$ とし、$v\in T_bB_0$ の持ち上げを $\widetilde v$ とすると、

$$
\alpha_v=-\iota_{\widetilde v}\omega|_{L_b},
\qquad \beta_v=\iota_{\widetilde v}\chi|_{L_b}=*_{L_b}\alpha_v
$$

である。持ち上げに垂直方向の場を足しても、ファイバーへの $\omega,\chi$ の制限が零だから値は変わらない。[McLean線形化](../SYZ1-05/index.md#thm-syz1-05-linearization)により $\alpha_v$ は閉かつ余閉であり、[二つの変形・コホモロジー同型](../SYZ1-08/index.md#prop-syz1-08-two-cohomology-isomorphisms)により $v\mapsto[\alpha_v]$ は線形同型である。

この1形式の $L^2$ 内積を基底の速度へ引き戻す。$L^2$ は「ファイバー上の各点で内積を取り、全体で積分する」ことを意味する。

<a id="def-syz1-09-l2-metric"></a>

<!-- formal-statement-start -->
> **定義（SLag変形の積分計量）**  
> 上記の規格化された滑らかなSLagトーラス束において、$b\in B_0$ と $v,w\in T_bB_0$ に対し

$$
G_b(v,w)=\int_{L_b}\alpha_v\wedge *_{L_b}\alpha_w
          =\int_{L_b}\alpha_v\wedge\beta_w
$$

> と定める。右辺は $n$ 形式を向き付きの $n$ 次元トーラス上で積分した実数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-09-l2-metric -->
### 直接例：平坦な二次元トーラスで内積を計算する

$X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ に標準計量、$\omega=\sum_jdx^j\wedge dy^j$、$\Omega=dz^1\wedge dz^2$ を入れ、$L_y=\{y=\text{一定}\}$ とする。これは $dx^1\wedge dx^2$ の向きを持つ位相0のSLagトーラスであり、各座標は周期1である。基底の速度 $v=v^1\partial_{y^1}+v^2\partial_{y^2}$ に対して

$$
\alpha_v=v^1dx^1+v^2dx^2,\qquad
\beta_w=w^1dx^2-w^2dx^1.
$$

外積を展開すると

$$
\alpha_v\wedge\beta_w=(v^1w^1+v^2w^2)dx^1\wedge dx^2,
\quad G_y(v,w)=v^1w^1+v^2w^2.
$$

**定義の確認**：二つの形式の次数の和は2、積分の向きは $dx^1\wedge dx^2>0$、ファイバーの体積は1である。$G_y(v,v)=(v^1)^2+(v^2)^2>0$（$v\ne0$）となる。
<!-- definition-example-end -->

任意の $b$ について、点ごとに $\alpha_v\wedge *\alpha_w=\langle\alpha_v,\alpha_w\rangle_g\operatorname{vol}_{L_b}$ だから $G_b(v,w)=G_b(w,v)$。さらに

$$
G_b(v,v)=\int_{L_b}|\alpha_v|_g^2\operatorname{vol}_{L_b}\ge0.
$$

この積分が0なら連続な $\alpha_v$ はすべての点で0である。[前講の同型](../SYZ1-08/index.md#prop-syz1-08-two-cohomology-isomorphisms)より $v=0$ となる。従って **$G$ は正定値の対称双線形形式**である。局所積表示と滑らかな束のデータから積分は $b$ に滑らかに依存し、$G$ は $B_0$ 上のRiemann計量となる。

## 3. 周期の双対基底が内積を座標へ変換する

前講では独立に、整数1サイクルの基底 $\gamma_i$ と整数 $(n-1)$ サイクルの基底 $\delta_i$ を選んだ。ここでは**互いに双対になるよう**選び直す。この条件は計量を周期の積で表すために不可欠である。

向き付きトーラス $L_b$ の整数1サイクル基底 $\gamma_1,\dots,\gamma_n$ を取る。$H^1(L_b;\mathbb Z)$ の双対基底を $\vartheta^1,\dots,\vartheta^n$ とし、各 $\vartheta^i$ は $\int_{\gamma_j}\vartheta^i=\delta^i_j$ を満たす。これらのPoincaré双対である $(n-1)$ サイクル $\delta_i$ を、すべての閉 $(n-1)$ 形式 $\eta$ に対して

$$
\int_{\delta_i}\eta=\int_{L_b}\vartheta^i\wedge\eta
$$

となる向きに取る。$\delta_i$ も整数ホモロジーの基底である。ここで用いるのは、向き付きトーラスにおけるホモロジーの非退化な積分対合であり、標準の座標トーラスなら下記の例で直接検算できる。$\vartheta^i$ は閉形式のコホモロジー類の代表であり、右辺は代表の選び方に依存しない。

<a id="lem-syz1-09-dual-period-pairing"></a>

<!-- formal-statement-start -->
> **補題（双対周期による積分対合）**  
> 向き付き $n$ 次元トーラス $L$ 上で、上の意味で双対な整数サイクル基底 $\gamma_i\in H_1(L;\mathbb Z)$、$\delta_i\in H_{n-1}(L;\mathbb Z)$ を選ぶ。閉1形式 $a$ と閉 $(n-1)$ 形式 $c$ に対して

$$
\int_L a\wedge c
=\sum_{i=1}^n
 \left(\int_{\gamma_i}a\right)\left(\int_{\delta_i}c\right)
$$

> が成立する。$n=1$ の場合、$(n-1)$ サイクルは点からなる0サイクルで、0形式の積分はその点での評価とする。
<!-- formal-statement-end -->

### 証明の見取り図

閉1形式 $a$ を $\vartheta^i$ の線形結合と完全形式に分け、完全形式の積分が消えることを確かめる。これで右辺の各周期が現れる。

<!-- proof-start -->
### 証明

$a$ のコホモロジー類は $\vartheta^i$ の実線形結合なので、ある滑らかな関数 $f$ により

$$
a=\sum_i a_i\vartheta^i+df,\qquad a_i=\int_{\gamma_i}a.
$$

実際 $\gamma_j$ へ積分すると右辺の周期は $a_j$ となり、差の全1周期が0になるため、差の閉1形式は完全である。$dc=0$ より $df\wedge c=d(f c)$。境界なしトーラスで[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)を適用して $\int_Ldf\wedge c=0$。従って

$$
\int_La\wedge c
=\sum_i a_i\int_L\vartheta^i\wedge c
=\sum_i a_i\int_{\delta_i}c,
$$

と結論される。$n=1$ では $c$ は閉0形式、すなわち連結な円周上で定数なので、同じ計算が成り立つ。
<!-- proof-end -->

### 二次元で双対の「符号」を確かめる

$L=T^2$ に座標 $(x^1,x^2)\in(\mathbb R/\mathbb Z)^2$ と向き $dx^1\wedge dx^2$ を入れる。$\gamma_1=[x^1]$、$\gamma_2=[x^2]$ なら $\vartheta^1=dx^1$、$\vartheta^2=dx^2$。補題の条件は $\delta_1=[x^2]$、$\delta_2=-[x^1]$ を要求する。実際 $c=c_1dx^1+c_2dx^2$ について

$$
\int_Ldx^1\wedge c=c_2=\int_{\delta_1}c,\qquad
\int_Ldx^2\wedge c=-c_1=\int_{\delta_2}c.
$$

符号を無視して $\delta_2=[x^1]$ と選ぶと、積分対合の式は崩れる。これが前講の[平坦トーラスの周期計算](../SYZ1-08/index.md#def-syz1-08-two-period-covectors)で採用した向きである。

## 4. 自然な計量はHessianになる

[前講の周期閉性](../SYZ1-08/index.md#lem-syz1-08-period-closed)により、十分小さい単連結・凸な座標近傍 $U\subset B_0$ 上で、双対サイクル基底を平行移動して

$$
du^i(v)=\int_{\gamma_i}\alpha_v,\qquad
dt_i(v)=\int_{\delta_i}\beta_v,\qquad i=1,\ldots,n
$$

を積分した二組の座標 $u=(u^1,\ldots,u^n)$、$t=(t_1,\ldots,t_n)$ を取れる。前講での $t^i$ を、$u^i$ と対をなす**双対座標**としてここでは下付きの $t_i$ と記す。両組ともそれぞれ整数アフィン座標である。$u(U)$ を凸に取るため必要ならさらに近傍を縮める。

[双対周期の補題](#lem-syz1-09-dual-period-pairing)を $a=\alpha_v$、$c=\beta_w$ に適用すると

$$
G_b(v,w)=\int_{L_b}\alpha_v\wedge\beta_w
=\sum_i du^i(v)\,dt_i(w).
$$

つまり二種類の周期座標の関係は、まさに **$G$ の行列表現**を与えている。

アフィン座標 $u$ で計量の成分を、ある関数 $\phi$ の二階偏微分として表せるかを考える。これは一般の座標で自動的に成立する性質ではない。二階微分を考えるため、$\phi$ は少なくとも $C^2$ 級である必要がある。

<a id="def-syz1-09-hessian-metric"></a>

<!-- formal-statement-start -->
> **定義（Hessian計量）**  
> アフィン座標 $u=(u^1,\ldots,u^n)$ を持つ領域 $U\subset\mathbb R^n$ 上で、滑らかなRiemann計量 $G$ に対し、ある滑らかな実関数 $\phi:U\to\mathbb R$ が存在して

$$
G_{ij}(u)=\frac{\partial^2\phi}{\partial u^i\partial u^j}(u)
$$

> を満たすとき、$G$ を $u$ に関するHessian計量、$\phi$ を局所ポテンシャルという。$G$ が正定値である条件はHessian行列がすべての点で正定値であることに等しい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-09-hessian-metric -->
### 直接例：二次式のHessianを定義と照合する

計量の成分行列は、座標接ベクトル $e_i=\partial/\partial u^i$ を二つの引数に入れた $G_{ij}=G(e_i,e_j)$ を並べたものである。Hessianで判定するには、この $G_{ij}$ と $\partial_i\partial_j\phi$ が各添字 $i,j$ で一致し、任意の零でない接ベクトル $v=\sum_i v^i e_i$ に対して $\sum_{i,j}v^iG_{ij}v^j>0$ となることを確かめる。

$U=\mathbb R^2$、$\phi(u)=\frac12(2(u^1)^2+3(u^2)^2)$ と置く。$d\phi=2u^1du^1+3u^2du^2$ だから

$$
\left(\frac{\partial^2\phi}{\partial u^i\partial u^j}\right)
=\begin{pmatrix}2&0\\0&3\end{pmatrix}.
$$

**定義の確認**：この行列は対称で、零でない $(v^1,v^2)$ について二次形式 $2(v^1)^2+3(v^2)^2>0$ である。従って $G=2(du^1)^2+3(du^2)^2$ は滑らかな正定値計量であり、二階偏微分が計量成分と一致する。ここでの行列は、座標基底 $\partial/\partial u^i$ で評価した $G_{ij}$ である。
<!-- definition-example-end -->

<a id="thm-syz1-09-hessian"></a>

<!-- formal-statement-start -->
> **定理（SLag基底のHessian計量）**  
> 規格化した正則体積形式を持つKähler多様体の滑らかな固定位相SLagトーラス束 $\pi:X_0\to B_0$ を取り、ファイバーを向き付き・連結・コンパクト・境界なしとする。各ファイバーの1サイクル基底 $\gamma_i$ と、積分対合で双対な $(n-1)$ サイクル基底 $\delta_i$ から得る前述の局所整数アフィン座標 $u^i,t_i$ に対し、

$$
G_{ij}=\frac{\partial t_i}{\partial u^j}
=\frac{\partial t_j}{\partial u^i}
$$

> が成り立つ。この行列は対称正定値であり、任意の十分小さい凸な $u$ 座標近傍で滑らかな関数 $\phi$ が存在して

$$
t_i=\frac{\partial\phi}{\partial u^i},\qquad
G_{ij}=\frac{\partial^2\phi}{\partial u^i\partial u^j}
$$

> となる。従って $G$ はシンプレクティック整数アフィン構造に関するHessian計量である。
<!-- formal-statement-end -->

### 証明の見取り図

周期の積分対合を使えば $G_{ij}=\partial_jt_i$ と分かる。内積の対称性によって微分の交差条件が成立し、局所ポテンシャルを積分できる。正定値性はファイバー上の $L^2$ 内積に戻して確かめる。

<!-- proof-start -->
### 証明

$u$ は[前講の局所座標定理](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)によりJacobianが可逆な座標である。その座標ベクトル $e_j=\partial/\partial u^j$ は $du^i(e_j)=\delta^i_j$ を満たす。前節の対合式で $v=e_j,w=e_i$ を代入して

$$
G_{ji}=G(e_j,e_i)=\sum_kdu^k(e_j)\,dt_k(e_i)
=dt_j(e_i)=\frac{\partial t_j}{\partial u^i}.
$$

添字を入れ替えれば $G_{ij}=\partial_jt_i$。第2節で証明した $G_{ij}=G_{ji}$ より

$$
\partial_jt_i=\partial_it_j,\qquad
d\left(\sum_it_i\,du^i\right)
=\sum_{i<j}(\partial_it_j-\partial_jt_i)\,du^i\wedge du^j=0.
$$

$u(U)$ を小さい凸領域に取っているので、この閉1形式は完全である。基点 $u_0$ を固定し、線分に沿う積分によって

$$
\phi(u)=\int_0^1\sum_i t_i(u_0+s(u-u_0))(u^i-u_0^i)\,ds
$$

と定める。ここで $h=u-u_0$ と書く。積分式の被積分関数を $u^j$ で微分すると、積の微分と連鎖律、および $\partial_jt_i=\partial_it_j$ により

$
\begin{aligned}
\frac{\partial\phi}{\partial u^j}
&=\int_0^1\left[t_j(u_0+sh)
+s\sum_i h^i\frac{\partial t_i}{\partial u^j}(u_0+sh)\right]ds\\
&=\int_0^1\left[t_j(u_0+sh)
+s\frac{d}{ds}t_j(u_0+sh)\right]ds\\
&=\int_0^1\frac{d}{ds}\left[s\,t_j(u_0+sh)\right]ds
=t_j(u).
\end{aligned}
$

したがって $d\phi=\sum_it_i\,du^i$ であり、もう一度微分すればHessian表示を得る。閉性と凸領域上の積分により、線分以外の経路で定義しても同じ値となる。

任意の $a=(a^1,\ldots,a^n)\ne0$ に対応する接ベクトル $v=\sum_i a^ie_i$ に対し

$$
\sum_{i,j}a^iG_{ij}a^j=G(v,v)
=\int_{L_b}|\alpha_v|_g^2\operatorname{vol}_{L_b}>0
$$

である。最後の厳密な不等号は、$v\mapsto[\alpha_v]$ が同型で $v\ne0$ だから従う。従ってHessian行列は正定値である。
<!-- proof-end -->

この定理は「どんな実座標でも計量がHessianになる」とは述べていない。周期から得た**特定のアフィン座標**で成り立つという内容である。

## 5. Legendre変換で両方の座標を対称に扱う

Hessianが正定値なら、勾配 $u\mapsto t=\nabla\phi(u)$ は局所的に逆写像を持つ。この新しい座標で同じ幾何を記述するため、元の関数から $\sum_iu^it_i$ を引き算・足し算する双対なポテンシャルを作る。

<a id="def-syz1-09-legendre"></a>

<!-- formal-statement-start -->
> **定義（局所Legendre双対）**  
> 開凸集合 $U\subset\mathbb R^n$ 上の滑らかな関数 $\phi$ のHessianが全点で正定値とする。$t=\nabla\phi(u)$ の像を $V$ とし、その逆写像を $u=u(t)$ と書く。$V$ 上の関数を

$$
\phi^*(t)=\sum_{i=1}^n u^i(t)t_i-\phi(u(t))
$$

> で定め、$\phi$ の局所Legendre双対とする。ここでは対をなす $u^i$ と $t_i$ の標準的な内積を使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-09-legendre -->
### 直接例：斜めでない二次ポテンシャルを反転する

$\phi(u)=\frac12(2(u^1)^2+3(u^2)^2)$ なら、微分から $t_1=2u^1,t_2=3u^2$。Jacobianは $\operatorname{diag}(2,3)$ で行列式6、したがって $u^1=t_1/2,u^2=t_2/3$ が全域で逆写像である。定義に代入して

$$
\phi^*(t)=\frac{t_1^2}{2}+\frac{t_2^2}{3}
-\frac12\left(\frac{t_1^2}{2}+\frac{t_2^2}{3}\right)
=\frac{t_1^2}{4}+\frac{t_2^2}{6}.
$$

**定義の確認**：$U=\mathbb R^2$ は開凸集合で元のHessianは全域で正定値である。勾配写像の像は $V=\mathbb R^2$ で、上に求めた逆写像は各点で一意に存在する。$\phi^*$ は定義の $u(t)^{\mathsf T}t-\phi(u(t))$ から計算したもので、そのHessianは $\operatorname{diag}(1/2,1/3)$。元のHessianの逆行列であり、両方とも正定値である。
<!-- definition-example-end -->

<a id="thm-syz1-09-legendre-duality"></a>

<!-- formal-statement-start -->
> **定理（Legendre座標の逆変換と双対Hessian）**  
> $\phi\in C^\infty(U)$、$U\subset\mathbb R^n$ は開凸集合で、$H(u)=(\partial_i\partial_j\phi(u))$ は各点で正定値とする。このとき $\nabla\phi:U\to V=\nabla\phi(U)$ は滑らかな微分同相で、局所Legendre双対 $\phi^*$ は

$$
\frac{\partial\phi^*}{\partial t_i}=u^i,\qquad
\left(\frac{\partial^2\phi^*}{\partial t_i\partial t_j}\right)
=H(u(t))^{-1}
$$

> を満たす。特に双対Hessianは対称正定値で、逆変換は $u=\nabla_t\phi^*(t)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正定値のHessianが勾配写像の局所可逆性と単射性を与える。Legendreポテンシャルを微分すると、$t=\nabla\phi(u)$ による二項の打ち消しで $u$ が残る。さらに連鎖律でHessianが逆行列になる。

<!-- proof-start -->
### 証明

$\nabla\phi$ のJacobianは $H(u)$ で、正定値だから $\det H(u)>0$。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から各点の近傍で滑らかな逆が存在する。さらに $u\ne v$ を $U$ に取り、$h=u-v$ とする。凸性から線分 $v+sh$（$0\le s\le1$）は $U$ に含まれる。補助関数 $q(s)=\nabla\phi(v+sh)\cdot h$ を考え、連鎖律で $q'(s)=h^{\mathsf T}H(v+sh)h$ を得る。$q(1)-q(0)=\int_0^1q'(s)\,ds$ に代入すると

$$
(\nabla\phi(u)-\nabla\phi(v))\cdot h
=\int_0^1 h^{\mathsf T}H(v+sh)h\,ds>0.
$$

従って $\nabla\phi$ は単射であり、局所逆写像が $V$ 上で整合するので微分同相となる。

$\phi^*(t)=\sum_i u^i(t)t_i-\phi(u(t))$ を $t_j$ で微分する。各 $u^i$ は $t$ の関数なので積と連鎖律を明記すると

$$
\frac{\partial\phi^*}{\partial t_j}
=u^j+\sum_i t_i\frac{\partial u^i}{\partial t_j}
-\sum_i\frac{\partial\phi}{\partial u^i}
  \frac{\partial u^i}{\partial t_j}
=u^j.
$$

最後の等号では $\partial\phi/\partial u^i=t_i$ を使った。一方 $t_i=\partial_i\phi(u)$ を $t_j$ で微分すると

$$
\delta_{ij}
=\sum_k\frac{\partial^2\phi}{\partial u^i\partial u^k}
 \frac{\partial u^k}{\partial t_j}
=\sum_k H_{ik}\frac{\partial u^k}{\partial t_j}.
$$

よって $Du/Dt=H^{-1}$ である。最初の微分結果をさらに微分し

$$
\frac{\partial^2\phi^*}{\partial t_j\partial t_i}
=\frac{\partial u^i}{\partial t_j}
=(H^{-1})_{ij}
$$

が成立する。対称正定値行列の逆も対称正定値なので主張を得る。
<!-- proof-end -->

## 6. 整数アフィン座標の変更と双対性

基底のサイクルを交換するとき、$\gamma$ 側と $\delta$ 側の変更行列を勝手に独立に取ると、周期積分の対合が単位行列でなくなる。双対な基底を保つためには行列が互いに逆転置となる必要がある。

<a id="prop-syz1-09-affine-transition"></a>

<!-- formal-statement-start -->
> **命題（双対周期座標とポテンシャルの遷移）**  
> 前節までの滑らかなSLagトーラス束上で、重なりが連結な二つの局所座標が双対整数サイクルから得られるとする。$\gamma'=A\gamma$、$A\in GL(n,\mathbb Z)$ と取り替えると、双対基底を保つ $(n-1)$ サイクルは $\delta'=A^{-\mathsf T}\delta$ であり、座標はある定数列ベクトル $c,d\in\mathbb R^n$ について

$$
u'=Au+c,\qquad t'=A^{-\mathsf T}t+d
$$

> と遷移する。局所ポテンシャルは適切な定数 $C$ を選べば

$$
\phi'(u')=\phi(A^{-1}(u'-c))+d^{\mathsf T}u'+C
$$

> と取れる。従って $G$、正定値性および両整数アフィン構造の双対関係は座標選択によらない。
<!-- formal-statement-end -->

### 証明の見取り図

新しい1周期の行列が $A$ なら、対合で双対な $(n-1)$ サイクルは逆転置で動く。周期1形式を積分して定数移動を得てから、新ポテンシャルを連鎖律で検査する。

<!-- proof-start -->
### 証明

旧1サイクルの整数基底を列に並べ、$\gamma'_i=\sum_jA_{ij}\gamma_j$ とする。旧双対コホモロジー基底 $\vartheta^i$ の新基底は $\vartheta'=A^{-\mathsf T}\vartheta$ である。実際

$$
\int_{\gamma'_i}\vartheta'{}^j
=\sum_{k,\ell}A_{ik}(A^{-\mathsf T})_{j\ell}\delta^\ell_k
=\sum_kA_{ik}(A^{-1})_{kj}=\delta_{ij}.
$$

Poincaré双対を取れば $\delta'=A^{-\mathsf T}\delta$。周期の線形性から $du'=Adu$、$dt'=A^{-\mathsf T}dt$ となる。[前講の閉周期定理](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)によって積分できるので $u'=Au+c$、$t'=A^{-\mathsf T}t+d$。

$u=A^{-1}(u'-c)$ を用いて候補の $\phi'$ を $u'^i$ で微分すると、列勾配の連鎖律より

$$
\nabla_{u'}\phi'=A^{-\mathsf T}\nabla_u\phi+d
=A^{-\mathsf T}t+d=t'.
$$

さらにHessianは $H'=A^{-\mathsf T}HA^{-1}$。零でないベクトル $z$ に対して $z^{\mathsf T}H'z=(A^{-1}z)^{\mathsf T}H(A^{-1}z)>0$ なので正定値性が保たれる。この計量の積は微分形式の外積ではなく、二つの接ベクトル $v,w$ に各1形式を評価した値の積である。実際、$du'(v)=Adu(v)$、$dt'(w)=A^{-\mathsf T}dt(w)$ なので

$
\sum_i du'^i(v)\,dt'_i(w)
=du(v)^{\mathsf T}A^{\mathsf T}A^{-\mathsf T}dt(w)
=du(v)^{\mathsf T}dt(w)=G(v,w).
$

これでも内積の不変性が確認できる。
<!-- proof-end -->

ポテンシャルへ一次関数と定数を加えてもHessianは変わらない。従って局所ポテンシャルを一つの大域関数として選べるとは限らず、Legendre双対もまず**局所座標上の構成**として理解する。

## 7. 異方的SLagトーラスを最後まで計算する

前講の平坦模型を使う。$a_1,a_2>0$ とし、$X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ 上で

$$
g=\sum_{j=1}^2a_j((dx^j)^2+(dy^j)^2),\quad
\omega=\sum_ja_jdx^j\wedge dy^j,\quad
\Omega=\sqrt{a_1a_2}\,dz^1\wedge dz^2.
$$

ファイバー $L_y=\{y=\text{一定}\}$ は $dx^1\wedge dx^2$ の向きを取り、$\omega|_{L_y}=0$、$\operatorname{Im}\Omega|_{L_y}=0$、$\operatorname{Re}\Omega|_{L_y}=\sqrt{a_1a_2}\,dx^1\wedge dx^2=\operatorname{vol}_{L_y}>0$ なので規格化された位相0のSLagである。$v=v^j\partial_{y^j}$ について

$$
\alpha_v=a_1v^1dx^1+a_2v^2dx^2,\quad
\beta_v=\sqrt{a_1a_2}(v^1dx^2-v^2dx^1).
$$

双対サイクル $\gamma_1=[x^1]$、$\gamma_2=[x^2]$ と $\delta_1=[x^2]$、$\delta_2=-[x^1]$ を用いて

$$
u=(a_1y^1,a_2y^2),\quad
t=(\sqrt{a_1a_2}\,y^1,\sqrt{a_1a_2}\,y^2).
$$

このとき

$$
H=\frac{\partial t}{\partial u}
=\begin{pmatrix}\sqrt{a_1a_2}/a_1&0\\0&\sqrt{a_1a_2}/a_2\end{pmatrix},
\quad
\phi(u)=\frac{\sqrt{a_1a_2}}2
 \left(\frac{(u^1)^2}{a_1}+\frac{(u^2)^2}{a_2}\right).
$$

$H$ の二つの固有値は正である。Legendre双対は $u^1=a_1t_1/\sqrt{a_1a_2}$、$u^2=a_2t_2/\sqrt{a_1a_2}$ を代入して

$$
\phi^*(t)=\frac1{2\sqrt{a_1a_2}}
 \left(a_1t_1^2+a_2t_2^2\right),\qquad
\nabla^2\phi^*=H^{-1}.
$$

さらに $G_y(v,w)=\sqrt{a_1a_2}(a_1v^1w^1+a_2v^2w^2)$ なので、$du(v)^{\mathsf T}H\,du(w)$ と一致する。これは積分で得た $L^2$ 計量との独立な検算になる。$(a_1,a_2)=(2,3)$ なら $H=\operatorname{diag}(\sqrt6/2,\sqrt6/3)$ は整数行列でないが、対称性・正定値性・Legendre双対性はいずれも成立する。

## 8. 演習：周期から双対ポテンシャルへ

### Level A：定義・符号・正定値を手で確かめる

<a id="ex-syz1-09-a01"></a>

#### SYZ1-09-A01 計量の積分と向き

- Level: A

標準向き $dx^1\wedge dx^2$ の単位平坦トーラス $T^2$ で、$\alpha_v=2dx^1-dx^2$、$\beta_w=3dx^2+4dx^1$ とする。$\int_{T^2}\alpha_v\wedge\beta_w$ を求めよ。

<!-- solution-start -->
### 詳細解答

分配法則で外積を展開すると、同じ1形式の外積は零であり、

$$
(2dx^1-dx^2)\wedge(3dx^2+4dx^1)
=6dx^1\wedge dx^2-4dx^2\wedge dx^1
=10dx^1\wedge dx^2.
$$

向き付き単位トーラスの $\int dx^1\wedge dx^2=1$ より答えは10である。第二項を $-4$ とする誤りは外積の交代性を見落としている。
<!-- solution-end -->

<a id="ex-syz1-09-a02"></a>

#### SYZ1-09-A02 双対サイクルの符号

- Level: A

正向き $dx^1\wedge dx^2$ の $T^2$ で、$\gamma_1=[x^1]$、$\gamma_2=[x^2]$ とする。双対な $\delta_1,\delta_2$ を選び、$a=5dx^1+7dx^2$ と $c=2dx^1-3dx^2$ の周期積と外積の積分を比較せよ。

<!-- solution-start -->
### 詳細解答

$\vartheta^1=dx^1,\vartheta^2=dx^2$ より、$\delta_1=[x^2]$、$\delta_2=-[x^1]$。周期は

$$
\left(\int_{\gamma_1}a,\int_{\gamma_2}a\right)=(5,7),\quad
\left(\int_{\delta_1}c,\int_{\delta_2}c\right)=(-3,-2).
$$

その積の和は $5(-3)+7(-2)=-29$。一方

$$
a\wedge c=5(-3)dx^1\wedge dx^2+7(2)dx^2\wedge dx^1
=-29dx^1\wedge dx^2.
$$

積分も $-29$ で一致する。
<!-- solution-end -->

<a id="ex-syz1-09-a03"></a>

#### SYZ1-09-A03 Hessianと正定値性

- Level: A

$\phi(u^1,u^2)=\frac12(3(u^1)^2+4(u^2)^2)+2u^1u^2$ とする。Hessianを求め、正定値であることを平方完成によって示せ。

<!-- solution-start -->
### 詳細解答

第一微分は $\partial_1\phi=3u^1+2u^2$、$\partial_2\phi=2u^1+4u^2$。もう一度微分して

$$
H=\begin{pmatrix}3&2\\2&4\end{pmatrix}.
$$

任意の $(x,y)\ne(0,0)$ について

$$
(x,y)H(x,y)^{\mathsf T}=3x^2+4xy+4y^2
=3(x+2y/3)^2+\frac83y^2>0.
$$

従ってHessian計量であり、ポテンシャルは厳密に凸である。
<!-- solution-end -->

<a id="ex-syz1-09-a04"></a>

#### SYZ1-09-A04 Legendre変換の一次元例

- Level: A

$U=(0,\infty)$ で $\phi(u)=u^2/2+2u$ とする。$t=\phi'(u)$ の像、逆写像、$\phi^*(t)$ と二階微分を求めよ。

<!-- solution-start -->
### 詳細解答

$\phi'(u)=u+2$ なので $t>2$ であり、$u=t-2$。定義から

$$
\phi^*(t)=(t-2)t-\left(\frac{(t-2)^2}{2}+2(t-2)\right)
=\frac12(t-2)^2,\quad t>2.
$$

$\partial_t\phi^*=t-2=u$、$\partial_t^2\phi^*=1=(\phi''(u))^{-1}$。定数と一次項はHessianに影響しないが、双対の定義域は明示する必要がある。
<!-- solution-end -->

<a id="ex-syz1-09-a05"></a>

#### SYZ1-09-A05 1次元の周期と0形式

- Level: A

$L=S^1=\mathbb R/\mathbb Z$ で $\alpha_v=3v\,dx$、$\beta_w=2w$（0形式）、$\gamma=[S^1]$、$\delta=[x_0]$ とする。$\int_L\alpha_v\wedge\beta_w$ と二周期の積を比較せよ。

<!-- solution-start -->
### 詳細解答

$\alpha_v\wedge\beta_w=6vw\,dx$ なので積分は $6vw$。周期は $\int_\gamma\alpha_v=3v$、0サイクルへの積分は関数の評価 $\int_\delta\beta_w=2w$。積は $(3v)(2w)=6vw$。0形式を1サイクル上で積分するという次数違いは行っていない。
<!-- solution-end -->

### Level B：可積分性・座標変更・計算を接続する

<a id="ex-syz1-09-b01"></a>

#### SYZ1-09-B01 対称性のない周期座標の変換式

- Level: B

$U=\mathbb R^2$ に $t_1=u^1+2u^2$、$t_2=3u^1+4u^2$ を与える。$\sum_i t_i\,du^i$ がある関数の微分になるか判定し、なぜこの写像をSLag基底の双対周期として使用できないか説明せよ。

<!-- solution-start -->
### 詳細解答

Jacobianは

$$
\frac{\partial t}{\partial u}=\begin{pmatrix}1&2\\3&4\end{pmatrix},
\quad \partial_2t_1=2,\quad\partial_1t_2=3.
$$

1形式 $\tau=t_1du^1+t_2du^2$ の外微分は

$$
d\tau=(\partial_1t_2-\partial_2t_1)\,du^1\wedge du^2
=du^1\wedge du^2\ne0.
$$

$dd\phi=0$ に反するので $\tau=d\phi$ となる $\phi$ はない。さらにJacobianは対称ではなく、SLag基底の $L^2$ 計量の対称性に反する。二組が単なる実座標であることだけではHessian構造を保証しない。
<!-- solution-end -->

<a id="ex-syz1-09-b02"></a>

#### SYZ1-09-B02 非対角のLegendre双対

- Level: B

$\phi(u)=\frac12(3(u^1)^2+4(u^2)^2)+2u^1u^2$ とする。Legendre座標 $t=\nabla\phi$ の逆写像、双対ポテンシャル、そのHessianを求めよ。

<!-- solution-start -->
### 詳細解答

[A03で計算したHessian](#ex-syz1-09-a03) は $H=\begin{pmatrix}3&2\\2&4\end{pmatrix}$ で、$\det H=12-4=8>0$。従って

$$
t=\begin{pmatrix}3&2\\2&4\end{pmatrix}u,\qquad
u=H^{-1}t=\frac18\begin{pmatrix}4&-2\\-2&3\end{pmatrix}t.
$$

$\phi=\frac12u^{\mathsf T}Hu$、$t=Hu$ なので

$$
\phi^*(t)=u^{\mathsf T}t-\frac12u^{\mathsf T}Hu
=\frac12t^{\mathsf T}H^{-1}t
=\frac1{16}(4t_1^2-4t_1t_2+3t_2^2).
$$

微分すると $\nabla_t\phi^*=\frac18(4t_1-2t_2,-2t_1+3t_2)^{\mathsf T}=u$、二階微分は上の $H^{-1}$。その正定値性は $H$ の正定値性から従う。
<!-- solution-end -->

<a id="ex-syz1-09-b03"></a>

#### SYZ1-09-B03 逆転置の座標遷移

- Level: B

二次元の双対周期座標で $\gamma'=A\gamma$、$A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ とする。$\delta'$、$u',t'$ の線形部分を求め、$du'{}^{\mathsf T}dt'=du^{\mathsf T}dt$ を直接確かめよ。平行移動は0とする。

<!-- solution-start -->
### 詳細解答

まず $A^{-1}=\begin{pmatrix}1&-2\\0&1\end{pmatrix}$ なので

$$
A^{-\mathsf T}=\begin{pmatrix}1&0\\-2&1\end{pmatrix}.
$$

従って $\delta'_1=\delta_1$、$\delta'_2=-2\delta_1+\delta_2$、$u'=(u^1+2u^2,u^2)$、$t'=(t_1,-2t_1+t_2)$。微分を代入して

$$
du'{}^{\mathsf T}dt'
=(du^1+2du^2)dt_1+du^2(-2dt_1+dt_2)
=du^1dt_1+du^2dt_2.
$$

この積はテンソルの各方向の評価であり、同じ計量 $G$ を与える。
<!-- solution-end -->

<a id="ex-syz1-09-b04"></a>

#### SYZ1-09-B04 異方的トーラスのポテンシャル

- Level: B

第7節の正規化された平坦SLag束で $a_1=4$、$a_2=9$ とする。$u,t$、Hessian、$\phi$、$\phi^*$ を求め、$G$ の $u$ 座標表示が積分表示と一致することを示せ。

<!-- solution-start -->
### 詳細解答

$\sqrt{a_1a_2}=6$。正規化された $\Omega=6dz^1\wedge dz^2$ と双対周期の積分により

$$
u=(4y^1,9y^2),\qquad t=(6y^1,6y^2).
$$

$y^1=u^1/4,y^2=u^2/9$ なので

$$
t=(\tfrac32u^1,\tfrac23u^2),\quad
H=\operatorname{diag}(\tfrac32,\tfrac23),\quad
\phi(u)=\tfrac34(u^1)^2+\tfrac13(u^2)^2.
$$

双対の逆は $u=(\tfrac23t_1,\tfrac32t_2)$。定義へ代入すると

$$
\phi^*(t)=\tfrac13t_1^2+\tfrac34t_2^2,\qquad
\nabla_t^2\phi^*=\operatorname{diag}(\tfrac23,\tfrac32)=H^{-1}.
$$

一方、$\alpha_v=4v^1dx^1+9v^2dx^2$、$\beta_w=6(w^1dx^2-w^2dx^1)$ だから

$$
G_y(v,w)=24v^1w^1+54v^2w^2.
$$

$du(v)=(4v^1,9v^2)$ を $du(v)^{\mathsf T}Hdu(w)$ に代入しても $16(3/2)v^1w^1+81(2/3)v^2w^2$ となり一致する。
<!-- solution-end -->

### Level C：対合から双対計量までを再構成する

<a id="ex-syz1-09-c01"></a>

#### SYZ1-09-C01 二つの周期からのHessian・Legendre双対の完全導出

- Level: C

向き付きコンパクトなSLag $T^2$ の滑らかな束が追加で与えられ、前講の同型 $\alpha_v,\beta_v=*\alpha_v$ と閉周期1形式が成立するとする。局所積表示で双対サイクル $\gamma_i,\delta_i$ を固定し、$du^i(v)=\int_{\gamma_i}\alpha_v$、$dt_i(v)=\int_{\delta_i}\beta_v$ と定める。以下を示せ。

1. $\int_L\alpha_v\wedge\beta_w=\sum_i du^i(v)dt_i(w)$ を導く。
2. $t=\nabla_u\phi$ となる局所ポテンシャルの存在と正定値Hessianを証明する。
3. $t$ が局所座標であること、$\nabla_t^2\phi^*=(\nabla_u^2\phi)^{-1}$ を証明する。
4. $\gamma'=A\gamma$ で $A\in GL(2,\mathbb Z)$ とした場合の双対座標遷移を求め、計量の不変性を確かめる。

<!-- solution-start -->
### 詳細解答

**(1) 対合。** $\gamma$ に周期が $\delta^i_j$ となる閉1形式 $\vartheta^i$ を取り、そのPoincaré双対を $\delta_i$ とする。$[\alpha_v]=\sum_i(\int_{\gamma_i}\alpha_v)[\vartheta^i]$ だから、差は完全形式 $df$。$d\beta_w=0$ と境界なしの仮定によって

$$
\int_Ldf\wedge\beta_w
=\int_Ld(f\beta_w)=0.
$$

従って

$$
\int_L\alpha_v\wedge\beta_w
=\sum_i\left(\int_{\gamma_i}\alpha_v\right)
\left(\int_L\vartheta^i\wedge\beta_w\right)
=\sum_i du^i(v)\,dt_i(w).
$$

**(2) 対称性・可積分性。** $G(v,w)=\int_L\alpha_v\wedge *\alpha_w$ と置く。Hodge内積により対称であり、$v\ne0$ なら $\alpha_v\not\equiv0$（速度からコホモロジーへの同型）なので正定値である。$u$ 座標で $e_j=\partial_{u^j}$ を代入すれば

$$
G_{ji}=\sum_kdu^k(e_j)dt_k(e_i)
=\partial_i t_j.
$$

$G_{ji}=G_{ij}$ より $\partial_i t_j=\partial_jt_i$。従って $\tau=\sum_it_i du^i$ は閉じ、凸な小近傍上で $\tau=d\phi$ と書ける。さらに $H_{ij}=\partial_jt_i=G_{ij}$ だから、任意の $a\ne0$ について $a^{\mathsf T}Ha=G(\sum_i a^ie_i,\sum_i a^ie_i)>0$。

**(3) 双対化。** $\det H>0$ から[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $u\mapsto t$ は局所可逆である。$\phi^*=u(t)^{\mathsf T}t-\phi(u(t))$ と定めると、

$$
d\phi^*=u^{\mathsf T}dt+t^{\mathsf T}du-(\nabla_u\phi)^{\mathsf T}du
=u^{\mathsf T}dt.
$$

ゆえに $\nabla_t\phi^*=u$。$dt=Hdu$ から $du=H^{-1}dt$ なので $\nabla_t^2\phi^*=H^{-1}$。

**(4) 整数遷移。** $\gamma'=A\gamma$ に双対な基底は $\delta'=A^{-\mathsf T}\delta$ である。よって $du'=Adu$、$dt'=A^{-\mathsf T}dt$。積分して $u'=Au+c$、$t'=A^{-\mathsf T}t+d$ を得る。各速度 $v,w$ について

$$
du'(v)^{\mathsf T}dt'(w)
=du(v)^{\mathsf T}A^{\mathsf T}A^{-\mathsf T}dt(w)
=du(v)^{\mathsf T}dt(w),
$$

だから周期対合による計量は同じである。二つの構造が互いに整数アフィン同一であるという結論は必要なく、Legendreの微分同相が一般に整数行列であるとも限らない。
<!-- solution-end -->

## 9. 次講へ：座標が分かるとトーラスを双対化できる

滑らかなSLag束の基底には、シンプレクティック周期 $u$ と複素周期 $t$ があり、双対サイクルを選ぶと

$$
(G_{ij})=(\partial_i\partial_j\phi)=\nabla_u^2\phi\quad\text{は正定値}
$$

が成り立つ。Legendre変換は $u$ と $t$ の役割を逆転させ、双対計量の行列を $G^{-1}$ にする。次講では、この二組の整数アフィン格子を使ってトーラスを双対化し、鏡像側の複素座標を実際に貼り合わせる。
