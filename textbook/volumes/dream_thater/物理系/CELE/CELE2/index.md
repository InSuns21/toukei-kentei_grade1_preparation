# CELE2 N体Hamilton系と三体問題

<!-- definition-example-audit: strict -->

> **既習の道具**：[CELE1 の二体Hamiltonianの重心分離](../CELE1/index.md#prop-cele1-canonical-reduction)、[MECH7 の重心運動](../../MECH/MECH7/index.md#thm-mech7-center-of-mass-motion)、[AMECH5 の Hamilton 方程式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)、[AMECH6 の角運動量の Poisson 括弧](../../AMECH/AMECH6/index.md#prop-amech6-angular-momentum)、[INT1 の Liouville 可積分性](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)を利用します。

## 1. 天体を一つ増やすと、何が増えるのか

前章の二体問題では、重心を切り離した相対ベクトルが一本しかありませんでした。さらに逆二乗中心力の下で角運動量が方向を固定し、[Runge--Lenz ベクトル](../CELE1/index.md#def-cele1-runge-lenz)が軌道の向きまで指定しました。

三体では二本の独立な相対ベクトルが必要です。運動量をうまく選べば重心は同じように分離できますが、**二つの相対運動は互いに重力を及ぼすため、二つのKepler問題には分裂しません**。何が分離され、どこに結合が残るかを式で確かめます。そのうえで「保存量が何個あるか」と「可換で独立な保存量を必要数だけ用意できるか」を区別します。

## 2. 衝突を除いたNewtonのN体系

整数 $N\ge2$、質量 $m_i>0$、万有引力定数 $G>0$ を固定します。各粒子の位置 $x_i\in\mathbb R^3$、正準運動量 $p_i\in\mathbb R^3$ をとります。重なる粒子を含まない位置の集合は

$$
Q_N=\{(x_1,\ldots,x_N)\in(\mathbb R^3)^N:
x_i\ne x_j\ \text{for all }i<j\}
$$

です。相空間は $T^*Q_N=Q_N\times(\mathbb R^3)^N$ で、自由度は $3N$、次元は $6N$ です。「自由度」は正準位置と正準運動量の**組**の個数であり、相空間の次元とは二倍だけ異なります。

<a id="def-cele2-newton-nbody"></a>

<!-- formal-statement-start -->
> **定義（NewtonのN体Hamiltonian）**  
> $N\ge2$、$m_i,G>0$ とし、上の非衝突相空間で

$$
H_N(x,p)=\sum_{i=1}^N\frac{|p_i|^2}{2m_i}
-G\sum_{1\le i<j\le N}\frac{m_im_j}{|x_i-x_j|}
$$

> と置く。これをNewtonの $N$ 体Hamiltonianと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele2-newton-nbody -->

**定義の確認**： $N=3$、$m_i=1$、$G=1$ とし、$x_1=(0,0,0)$、$x_2=(1,0,0)$、$x_3=(0,1,0)$、$p_i=0$ を代入します。三つの距離は $1,1,\sqrt2$ と正なので $Q_3$ の点であり、$H_3=-2-1/\sqrt2$ です。三組の対について一度ずつ足すことが、重力を二重計上しないための条件です。

<!-- definition-example-end -->

距離を $r_{ij}=|x_i-x_j|$ と略します。$x_i$ で微分すると

$$
\nabla_{x_i}\left(-\frac{Gm_im_j}{r_{ij}}\right)
=Gm_im_j\frac{x_i-x_j}{r_{ij}^3}.
$$

この微分を全ての $j\ne i$ に足し、[Hamilton方程式](../../AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)を適用します。

<a id="prop-cele2-nbody-equations"></a>

<!-- formal-statement-start -->
> **命題（N体Hamilton方程式と保存量）**  
> $H_N$ のHamilton解がある非衝突時間区間では、各 $i$ について

$$
\dot x_i=\frac{p_i}{m_i},\qquad
\dot p_i=-G\sum_{j\ne i}m_im_j\frac{x_i-x_j}{r_{ij}^3}
$$

> が成立する。また、エネルギー $H_N$、総運動量 $P=\sum_i p_i$、総角運動量 $L=\sum_i x_i\times p_i$ は時間に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーは時間に陽に依存しないHamiltonianであることから、運動量は粒子対の作用・反作用の相殺から、角運動量は各粒子対の力が結線方向を向くことから保存します。

<!-- proof-start -->
### 証明

第一式は $\partial H_N/\partial p_i=p_i/m_i$、第二式は直前の勾配計算を用いると得られます。各対 $(i,j)$ に対して粒子 $i$ に働く力を

$$
F_{ij}=-Gm_im_j\frac{x_i-x_j}{r_{ij}^3}
$$

と置けば $F_{ji}=-F_{ij}$ です。したがって

$$
\dot P=\sum_i\dot p_i
=\sum_{i<j}(F_{ij}+F_{ji})=0.
$$

総角運動量を時間微分すると

$$
\dot L
=\sum_i(\dot x_i\times p_i+x_i\times\dot p_i)
=\sum_i\left(\frac{p_i}{m_i}\times p_i\right)
+\sum_{i<j}(x_i-x_j)\times F_{ij}.
$$

前者の各項は同じベクトルの外積なので零、後者も $F_{ij}$ が $x_i-x_j$ の実数倍なので零です。ゆえに $\dot L=0$。最後に[Poisson括弧による時間発展](../../AMECH/AMECH6/index.md#thm-amech6-time-evolution)から

$$
\frac{dH_N}{dt}=\{H_N,H_N\}
=\sum_i\left(
\frac{\partial H_N}{\partial x_i}\cdot\frac{\partial H_N}{\partial p_i}
-\frac{\partial H_N}{\partial p_i}\cdot\frac{\partial H_N}{\partial x_i}
\right)=0.
$$

保存の主張は解が非衝突領域にある間のものです。衝突点で同じ方程式をそのまま適用したわけではありません。
<!-- proof-end -->

## 3. 並進対称性による重心の分離

総質量 $M=\sum_i m_i$ と重心 $R=M^{-1}\sum_i m_ix_i$ を定めます。[重心の運動方程式](../../MECH/MECH7/index.md#thm-mech7-center-of-mass-motion)は

$$
M\ddot R=\dot P=0,\qquad
R(t)=R(0)+\frac{P(0)}{M}t.
$$

したがって重心運動そのものは自由運動です。しかし、**重心を静止させることは角運動量を全て消すことではありません**。相対座標の回転はまだ残ります。

三体の場合は具体的な正準変換を作るのが最も確実です。質量 $m_1,m_2$ の内側の重心から第三粒子までを結ぶベクトルを使います。以後

$$
M_{12}=m_1+m_2,\quad M=M_{12}+m_3,\quad
\mu_{12}=\frac{m_1m_2}{M_{12}},\quad
\mu_3=\frac{m_3M_{12}}{M}
$$

と置きます。$\rho=x_2-x_1$、$\lambda=x_3-(m_1x_1+m_2x_2)/M_{12}$ は互いに独立な二本の相対ベクトルです。この選び方をJacobi座標といいます。

<a id="def-cele2-jacobi"></a>

<!-- formal-statement-start -->
> **定義（三体のJacobi正準座標）**  
> $m_1,m_2,m_3>0$ の三質点に対して

$$
\begin{aligned}
R&=\frac{m_1x_1+m_2x_2+m_3x_3}{M},&
\rho&=x_2-x_1,&
\lambda&=x_3-\frac{m_1x_1+m_2x_2}{M_{12}},\\
P&=p_1+p_2+p_3,&
\pi&=\mu_{12}(\dot x_2-\dot x_1),&
\eta&=\mu_3\left(\dot x_3-\frac{m_1\dot x_1+m_2\dot x_2}{M_{12}}\right)
\end{aligned}
$$

> をJacobi正準座標と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele2-jacobi -->

**定義の確認**： $m_1=m_2=m_3=1$ の場合、$M_{12}=2$、$M=3$、$\mu_{12}=1/2$、$\mu_3=2/3$。重心静止系で $v_1=(-1,0,0)$、$v_2=(1,0,0)$、$v_3=0$ を与えると $P=0$、$\pi=(1,0,0)$、$\eta=0$。元の運動エネルギーは $1$、Jacobi表示でも $|\pi|^2/(2\mu_{12})=1$ と一致します。

<!-- definition-example-end -->

<a id="prop-cele2-jacobi-reduction"></a>

<!-- formal-statement-start -->
> **命題（三体Hamiltonianの正準重心分離）**  
> $m_i,G>0$ の三体Hamiltonianに上のJacobi座標を用いると、正準一形式は

$$
\sum_{i=1}^3p_i\cdot dx_i
=P\cdot dR+\pi\cdot d\rho+\eta\cdot d\lambda
$$

> と表され、Hamiltonianは

$$
\begin{aligned}
H_3&=\frac{|P|^2}{2M}+H_{\rm int},\\
H_{\rm int}
&=\frac{|\pi|^2}{2\mu_{12}}+\frac{|\eta|^2}{2\mu_3}
-\frac{Gm_1m_2}{|\rho|}
-\frac{Gm_1m_3}{|\lambda+(m_2/M_{12})\rho|}
-\frac{Gm_2m_3}{|\lambda-(m_1/M_{12})\rho|}.
\end{aligned}
$$

> 相対問題は衝突集合を除く $(\rho,\lambda,\pi,\eta)$ の12次元相空間、すなわち6自由度のHamilton系である。
<!-- formal-statement-end -->

### 証明の見取り図

元の $x_i$ を三つの新しい位置から解き直します。正準一形式を直接比較し、運動エネルギーの交差項が消えることと、**ポテンシャルの交差した引数は消えないこと**を別々に確認します。

<!-- proof-start -->
### 証明

内側の重心を $c=(m_1x_1+m_2x_2)/M_{12}$ とすれば、$c=R-(m_3/M)\lambda$ です。また $x_1=c-(m_2/M_{12})\rho$、$x_2=c+(m_1/M_{12})\rho$ ですから

$$
\begin{aligned}
x_1&=R-\frac{m_3}{M}\lambda-\frac{m_2}{M_{12}}\rho,\\
x_2&=R-\frac{m_3}{M}\lambda+\frac{m_1}{M_{12}}\rho,\\
x_3&=R+\frac{M_{12}}{M}\lambda.
\end{aligned}
$$

微分に $p_i$ を掛けて足すと

$$
\sum_i p_i\cdot dx_i
=P\cdot dR+
\left(\frac{m_1p_2-m_2p_1}{M_{12}}\right)\cdot d\rho
+\left(\frac{M_{12}p_3-m_3(p_1+p_2)}{M}\right)\cdot d\lambda.
$$

$p_i=m_i\dot x_i$ を代入すると、二つの括弧はそれぞれ $\mu_{12}(\dot x_2-\dot x_1)=\pi$、$\mu_3(\dot x_3-\dot c)=\eta$ に等しいため、正準一形式の主張を得ます。

速度についても上の逆変換を微分して代入します。$|\dot R|^2$ の係数は $M$、$|\dot\rho|^2$ の係数は

$$
m_1\frac{m_2^2}{M_{12}^2}
+m_2\frac{m_1^2}{M_{12}^2}
=\frac{m_1m_2}{M_{12}}=\mu_{12},
$$

$|\dot\lambda|^2$ の係数は

$$
M_{12}\frac{m_3^2}{M^2}
+m_3\frac{M_{12}^2}{M^2}
=\frac{m_3M_{12}}{M}=\mu_3.
$$

交差項も、逆変換に現れる速度の係数を掛け合わせて確認できます。運動エネルギー $T=\frac12\sum_i m_i|\dot x_i|^2$ における三つの内積の係数は、それぞれ

$
\begin{aligned}
C_{R\rho}
&=-\frac{m_1m_2}{M_{12}}+\frac{m_2m_1}{M_{12}}=0,\\
C_{R\lambda}
&=-\frac{(m_1+m_2)m_3}{M}+\frac{m_3M_{12}}{M}=0,\\
C_{\rho\lambda}
&=\frac{m_1m_2m_3}{M_{12}M}
-\frac{m_2m_1m_3}{M_{12}M}=0.
\end{aligned}
$

したがって交差項は全て消え、

$$
T=\frac{|P|^2}{2M}+
\frac{|\pi|^2}{2\mu_{12}}+
\frac{|\eta|^2}{2\mu_3}.
$$

最後に粒子間ベクトルを逆変換から求めます。

$$
x_2-x_1=\rho,\qquad
x_3-x_1=\lambda+\frac{m_2}{M_{12}}\rho,\qquad
x_3-x_2=\lambda-\frac{m_1}{M_{12}}\rho.
$$

距離の式を元の三体ポテンシャルへ代入すれば表示式です。$R$ が現れないため $\dot P=0$、$\dot R=P/M$ で重心系は分離します。一方、相対座標の三本の距離には $\rho$ と $\lambda$ が同時に現れるので、一般に $H_{\rm int}$ は二つのKepler Hamiltonianの和ではありません。
<!-- proof-end -->

**具体例。** 等質量 $m_1=m_2=m_3=1$、$G=1$ で $\rho=(1,0,0)$、$\lambda=(0,1,0)$ をとると、粒子間距離は $1,\sqrt5/2,\sqrt5/2$。運動量を $\pi=(0,1,0)$、$\eta=(0,0,1)$、$P=0$ とすると

$$
T_{\rm int}=\frac{1}{2(1/2)}+\frac{1}{2(2/3)}
=\frac74,\qquad
H_{\rm int}=\frac74-1-\frac4{\sqrt5}.
$$

重心分離後も、二つの相対距離が独立には動かないことが、この式に含まれています。

## 4. 三体問題の自由度・回転・可換な保存量

正準並進分離後の三体は6自由度です。[角運動量のPoisson関係](../../AMECH/AMECH6/index.md#prop-amech6-angular-momentum)により、回転の生成量は保存されます。[Jacobi正準重心分離](#prop-cele2-jacobi-reduction)の逆変換を用いて元の角運動量を展開すると

$
\begin{aligned}
\sum_{i=1}^3x_i\times p_i
&=R\times(p_1+p_2+p_3)\\
&\quad+\rho\times\frac{m_1p_2-m_2p_1}{M_{12}}\\
&\quad+\lambda\times\frac{M_{12}p_3-m_3(p_1+p_2)}{M}\\
&=R\times P+\rho\times\pi+\lambda\times\eta.
\end{aligned}
$

第2・第3項の運動量係数は正準一形式の比較で得た $\pi,\eta$ と一致します。重心部分 $R\times P$ を除いた内部角運動量を

$
L=\rho\times\pi+\lambda\times\eta
$

と定めます。

**注意。** $L_x,L_y,L_z$ はそれぞれ保存されますが、$\{L_x,L_y\}=L_z$ などの関係があるため、一般には相互にPoisson可換ではありません。そこで三次元での自然な可換候補として $H_{\rm int}$、$|L|^2$、$L_z$ を選びます。

<a id="prop-cele2-involution"></a>

<!-- formal-statement-start -->
> **命題（三体の既知の可換第一積分）**  
> 三体の非衝突内部Hamiltonian $H_{\rm int}$ に対し、

$$
F_1=H_{\rm int},\qquad
F_2=|L|^2,\qquad
F_3=L_z
$$

> は全て保存され、相互にPoisson可換である。これらは少なくとも一つの開集合で関数的に独立であり、等質量 $m_1=m_2=m_3=1$ では非衝突相空間の開稠密集合で独立である。ただし内部系は6自由度なので、**この三つだけからLiouville可積分性は結論できない**。
<!-- formal-statement-end -->

### 証明の見取り図

回転不変性で $H_{\rm int}$ と $L_i$ の括弧が消えます。$|L|^2$ と $L_z$ の括弧は外積の反対称性で消えます。さらに一つの具体点で3×3小行列式を計算し、保存性と関数的独立性を混同しないようにします。

<!-- proof-start -->
### 証明

$H_{\rm int}$ は各距離と運動量の二乗から作られており、$\rho,\lambda,\pi,\eta$ を同時回転しても不変です。したがって[Poisson括弧と回転](../../AMECH/AMECH6/index.md#prop-amech6-angular-momentum)から

$$
\{H_{\rm int},L_i\}=0,\qquad
\{L_i,L_j\}=\sum_k\varepsilon_{ijk}L_k.
$$

これをLeibniz則で展開すると

$$
\{H_{\rm int},|L|^2\}
=2\sum_iL_i\{H_{\rm int},L_i\}=0
$$

かつ

$$
\{|L|^2,L_z\}
=2L_x\{L_x,L_z\}
+2L_y\{L_y,L_z\}
=-2L_xL_y+2L_yL_x=0.
$$

$F_1,F_2,F_3$ の全ての相互括弧は零です。

独立性を計算するため $m_1=m_2=m_3=G=1$ とし、前節の点

$$
\rho=(1,0,0),\quad
\lambda=(0,1,0),\quad
\pi=(0,1,0),\quad
\eta=(0,0,1)
$$

を使います。ここでは $L=(1,0,1)$ で、質量から $1/\mu_{12}=2$、$1/\mu_3=3/2$ です。$\pi_y,\eta_z,\eta_x$ に関する微分を取ると

$$
\begin{array}{c|ccc}
&\partial_{\pi_y}&\partial_{\eta_z}&\partial_{\eta_x}\\
F_1&2&3/2&0\\
F_2&2&2&-2\\
F_3&1&0&-1
\end{array}
$$

です。たとえば $\partial_{\eta_z}L=\lambda\times e_z=e_x$ なので $\partial_{\eta_z}|L|^2=2L\cdot e_x=2$、$\partial_{\eta_x}L=\lambda\times e_x=-e_z$ なので $\partial_{\eta_x}|L|^2=-2$ です。また $L_z=\rho_x\pi_y-\rho_y\pi_x+\lambda_x\eta_y-\lambda_y\eta_x$ から最下行が出ます。小行列式は

$$
\det\begin{pmatrix}2&3/2&0\\2&2&-2\\1&0&-1\end{pmatrix}
=-4\ne0.
$$

従ってその点の近傍で三つの微分は独立です。等質量の非衝突相空間は連結です（$\mathbb R^6$ の相対位置空間から、余次元3の三つの衝突部分空間を除いた集合は道で連結です）。上の小行列式はそこで実解析的なので、一点で非零なら恒等的には零にならず、その非零集合は開稠密です。一般質量の場合も同じ点で第一行が $1/\mu_{12},1/\mu_3,0$ に変わるだけで、行列式は $-2/\mu_{12}\ne0$ となり少なくとも近傍で独立です（同じ実解析性から開稠密性も得られます）。

最後に[Liouville可積分性の定義](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)では6自由度なら6個の独立な可換第一積分が要求されます。上の計算が証明したのは3個の存在です。**三つ足りないという計数は、別の第一積分の不存在証明ではありません**。
<!-- proof-end -->

平面運動だけを初めから仮定する場合、相対位置二本は各2成分となり、重心分離後は4自由度です。平面内で独立な回転の生成量はスカラー $L_z$ 一つなので、既知の可換積分として $H_{\rm int},L_z$ が残ります。これらの独立性も具体点で確かめられます。等質量 $m_i=1$ で

$
\rho=(1,0),\quad \lambda=(0,1),\quad
\pi=(0,1),\quad \eta=(0,0)
$

とすると非衝突であり、$(\pi_y,\eta_x)$ に関する小行列式は

$
\det
\begin{pmatrix}
\partial_{\pi_y}H_{\rm int}&\partial_{\eta_x}H_{\rm int}\\
\partial_{\pi_y}L_z&\partial_{\eta_x}L_z
\end{pmatrix}
=\det\begin{pmatrix}2&0\\1&-1\end{pmatrix}
=-2\ne0.
$

したがって少なくともこの点の近傍で二つは独立ですが、4自由度に必要な4個へは届きません。

三次元でも、$L$ の方向を固定して適切な回転縮約を行えばさらに自由度を減らせますが、その縮約では角運動量の成分を互いに独立な循環運動量三個として単純に数えてはいけません。ここでは**正準並進分離による確実な6自由度の計数**と、回転に関する可換性を区別することを優先します。

## 5. 衝突集合と方程式の適用範囲

[Jacobi正準重心分離](#prop-cele2-jacobi-reduction)で得た粒子間ベクトルを使うと、衝突集合は

$$
\begin{aligned}
x_1=x_2&\quad\Longleftrightarrow\quad \rho=0,\\
x_1=x_3&\quad\Longleftrightarrow\quad \lambda+\frac{m_2}{M_{12}}\rho=0,\\
x_2=x_3&\quad\Longleftrightarrow\quad \lambda-\frac{m_1}{M_{12}}\rho=0
\end{aligned}
$$

の三つの集合の和集合です。三重衝突では $\rho=\lambda=0$ ですが、二体衝突は二つの相対ベクトルが同時に零になる必要はありません。

<a id="prop-cele2-collision-domain"></a>

<!-- formal-statement-start -->
> **命題（衝突でのNewtonベクトル場の特異性）**  
> $m_i,G>0$ のNewtonの $N$ 体系で、$r_{ij}>0$ が全て成り立つ領域ではHamiltonianベクトル場は滑らかであり、各初期値から非衝突時間区間に一意な局所解が存在する。一方 $r_{ij}=0$ を含む点では、少なくとも該当する対のポテンシャル項は有限な滑らかな関数へ延長できず、元のNewton方程式はそのまま定義できない。
<!-- formal-statement-end -->

### 証明の見取り図

非衝突点からは分母が正に離れた近傍が取れます。衝突点へ近づくと $-Gm_im_j/r_{ij}$ が発散し、微分を含む運動方程式を元の形で延長できません。

<!-- proof-start -->
### 証明

非衝突初期値では有限個の距離 $r_{ij}$ の最小値 $d>0$ が存在します。位置を十分小さく変えても全ての距離は $d/2$ 以上であり、$r_{ij}^{-1}$ と $r_{ij}^{-3}$ はその近傍で滑らかです。従ってHamiltonianベクトル場は局所Lipschitzとなり、[常微分方程式の局所存在一意性](../../../解析系/ODE/ODE1/index.md#thm-ode1-picard-lindelof)をこの近傍で適用できます。

一方、$x_i-x_j=\varepsilon u$、$|u|=1$ と近付けると、対 $(i,j)$ のポテンシャルは $-Gm_im_j/\varepsilon\to-\infty$。他の対が衝突する場合にもポテンシャルの各項は非正であるため、この発散を別の正のポテンシャルで相殺できません。よってポテンシャルの有限連続延長はありません。対応する力の大きさも $Gm_im_j/\varepsilon^2$ と発散します。これで元の方程式のまま衝突点を含められないことが分かります。
<!-- proof-end -->

衝突が実際に有限時間で起こりうることは、すでに二体の放射運動から確かめられます。質量をまとめた換算質量 $\mu$ と引力定数 $\kappa=Gm_1m_2$ に対し、角運動量を零とし、距離 $r_0>0$ で静止状態から出発させます。[二体の相対Hamiltonian](../CELE1/index.md#prop-cele1-canonical-reduction)でエネルギーは $E=-\kappa/r_0$ なので、内向き運動では

$$
\dot r=-\sqrt{\frac{2\kappa}{\mu}\left(\frac1r-\frac1{r_0}\right)}.
$$

したがって衝突までの時間は

$$
t_{\rm coll}=\sqrt{\frac{\mu}{2\kappa}}
\int_0^{r_0}\frac{dr}{\sqrt{1/r-1/r_0}}
=\frac{\pi}{2}\sqrt{\frac{\mu r_0^3}{2\kappa}}<\infty.
$$

積分は $r=r_0\sin^2\theta$ とすると $2r_0^{3/2}\int_0^{\pi/2}\sin^2\theta\,d\theta=(\pi/2)r_0^{3/2}$ です。これは衝突が「数値計算の丸め誤差にすぎない」わけではないことを示しますが、任意の三体初期値が衝突するという主張ではありません。

## 6. 問題：導出を自分で再現する

### Level A

<a id="ex-cele2-a01"></a>
**A1. 三体Hamilton方程式。** $m_1=2,m_2=1,m_3=3$、$G=1$、$x_1=(0,0,0)$、$x_2=(1,0,0)$、$x_3=(0,2,0)$、$p_i=0$ とする。$\dot p_1$ を対ごとに求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $r_{12}=1$、$r_{13}=2$。粒子2から受ける力は

$$
F_{12}=-2\cdot1\,\frac{(-1,0,0)}{1^3}=(2,0,0).
$$

粒子3からの力は

$$
F_{13}=-2\cdot3\,\frac{(0,-2,0)}{2^3}
=(0,3/2,0).
$$

従って $\dot p_1=F_{12}+F_{13}=(2,3/2,0)$ です。粒子2と3の引力の寄与を一回ずつ数えます。
<!-- solution-end -->

<a id="ex-cele2-a02"></a>
**A2. Jacobi座標の速度。** $m_1=m_2=m_3=1$、$v_1=(-1,0,0)$、$v_2=(1,0,0)$、$v_3=0$ について $P,\pi,\eta$ を求め、運動エネルギーを旧変数と新変数で計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 総質量 $M=3$、$M_{12}=2$、$\mu_{12}=1/2$、$\mu_3=2/3$。したがって

$$
P=v_1+v_2+v_3=0,\quad
\pi=\frac12(v_2-v_1)=(1,0,0),\quad
\eta=\frac23\left(v_3-\frac{v_1+v_2}2\right)=0.
$$

元の運動エネルギーは $(1+1+0)/2=1$。新変数では

$$
T=\frac{|P|^2}{6}+\frac{|\pi|^2}{2(1/2)}
+\frac{|\eta|^2}{2(2/3)}=0+1+0=1.
$$

この一致だけで正準性まで証明したわけではなく、正準性は[一形式の命題](#prop-cele2-jacobi-reduction)で確認しました。
<!-- solution-end -->

<a id="ex-cele2-a03"></a>
**A3. 三つの衝突集合。** 等質量三体で $\rho=(2,0,0)$ のとき、どの $\lambda$ で粒子1と3、粒子2と3がそれぞれ衝突するかを求めよ。また $\rho=0$ の意味を答えよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 等質量なので $m_1/M_{12}=m_2/M_{12}=1/2$ です。粒子1と3の衝突条件は

$$
\lambda+\frac12\rho=0
\quad\Longleftrightarrow\quad\lambda=(-1,0,0).
$$

粒子2と3の衝突条件は $\lambda-\rho/2=0$、すなわち $\lambda=(1,0,0)$。$\rho=0$ は $x_2-x_1=0$ なので粒子1と2の衝突です。この設問では $\rho\ne0$ のため、二つの値は別の二体衝突を表します。
<!-- solution-end -->

<a id="ex-cele2-a04"></a>
**A4. 自由度と次元。** $N=2,3,4$ の三次元Newton体系について、並進を除く前後の自由度と相空間次元をそれぞれ計算し、表にまとめよ。三体の平面運動では並進分離後いくつか。

- Level: A

<!-- solution-start -->
**詳細解答。** 三次元では粒子一個あたり位置3成分と運動量3成分、すなわち3自由度・相空間6次元です。重心の正準組 $(R,P)$ は3自由度・6次元を占めるため、内部系は $3N-3$ 自由度・$6N-6$ 次元です。従って

$$
\begin{array}{c|ccc}
N&2&3&4\\
\text{全自由度}&6&9&12\\
\text{内部自由度}&3&6&9\\
\text{内部相空間次元}&6&12&18
\end{array}
$$

となります。平面三体ではもと6自由度から平面重心の2自由度を除き、4自由度・8次元です。回転縮約をさらに行う前の数です。
<!-- solution-end -->

### Level B

<a id="ex-cele2-b01"></a>
**B1. 保存量は全て可換か。** 内部三体の角運動量が $L=(1,0,1)$ である点を考える。$\{L_x,L_y\}$、$\{|L|^2,L_z\}$、$\{H_{\rm int},L_z\}$ を評価し、$H_{\rm int},L_x,L_y,L_z$ を四つのLiouville積分として数えられない理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [角運動量のPoisson関係](../../AMECH/AMECH6/index.md#prop-amech6-angular-momentum)から $\{L_x,L_y\}=L_z=1$ です。従って $L_x,L_y$ はこの点で可換ではありません。一方

$$
\{|L|^2,L_z\}=2L_x(-L_y)+2L_yL_x=0.
$$

回転不変なHamiltonianについて $\{H_{\rm int},L_z\}=0$ です。[Liouville可積分性](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)では必要個数に加えて**相互Poisson可換性**が要るため、角運動量成分をそのまま三個足すことはできません。
<!-- solution-end -->

<a id="ex-cele2-b02"></a>
**B2. Jacobi変数から元の状態を復元。** $m_i=G=1$、$R=P=0$、$\rho=(1,0,0)$、$\lambda=(0,1,0)$、$\pi=(0,1,0)$、$\eta=(0,0,1)$ とする。三つの $x_i,p_i$、$L$、$H_3$ を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [Jacobi重心分離の逆変換](#prop-cele2-jacobi-reduction)へ $M=3,M_{12}=2$ を代入すると

$$
x_1=(-1/2,-1/3,0),\quad
x_2=(1/2,-1/3,0),\quad
x_3=(0,2/3,0).
$$

一形式を比較して得られる運動量の逆変換は、等質量かつ $P=0$ なら

$$
p_1=-\pi-\eta/2=(0,-1,-1/2),\quad
p_2=\pi-\eta/2=(0,1,-1/2),\quad
p_3=\eta=(0,0,1).
$$

総運動量は零です。角運動量は内部表示の方が短く

$$
L=\rho\times\pi+\lambda\times\eta
=(0,0,1)+(1,0,0)=(1,0,1).
$$

距離は $r_{12}=1$、$r_{13}=r_{23}=\sqrt5/2$。よって $T=|\pi|^2/(2\mu_{12})+|\eta|^2/(2\mu_3)=1+3/4$、$V=-1-4/\sqrt5$ で

$$
H_3=H_{\rm int}=\frac74-1-\frac4{\sqrt5}
=\frac34-\frac4{\sqrt5}.
$$

これは運動開始時の値であり、非衝突解に沿って保存されます。
<!-- solution-end -->

<a id="ex-cele2-b03"></a>
**B3. なぜ二つのKepler問題にならないか。** 等質量 $m_i=1$、$G>0$ で $\rho=(2,0,0),\lambda=(0,1,0)$ とする。$H_{\rm int}$ から $\dot\pi,\dot\eta$ を計算し、互いの座標が力へ現れる箇所を特定せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [三体内部Hamiltonian](#prop-cele2-jacobi-reduction)に等質量を代入すると、相対ポテンシャルは

$$
U=-G\left(\frac1{|\rho|}
+\frac1{|\lambda+\rho/2|}
+\frac1{|\lambda-\rho/2|}\right).
$$

$u_+=\lambda+\rho/2=(1,1,0)$、$u_-=\lambda-\rho/2=(-1,1,0)$ とおくと、$|u_\pm|=\sqrt2$。分母を微分して

$$
\nabla_\lambda U=
G\left(\frac{u_+}{|u_+|^3}+\frac{u_-}{|u_-|^3}\right)
=G\frac{(0,2,0)}{2\sqrt2}=(0,G/\sqrt2,0).
$$

従って $\dot\eta=-\nabla_\lambda U=(0,-G/\sqrt2,0)$。他方

$$
\nabla_\rho U=
G\left(\frac{\rho}{|\rho|^3}
+\frac12\frac{u_+}{|u_+|^3}
-\frac12\frac{u_-}{|u_-|^3}\right)
=G\left(\frac14+\frac1{2\sqrt2},0,0\right)
$$

なので

$$
\dot\pi=-G\left(\frac14+\frac1{2\sqrt2},0,0\right).
$$

$\dot\eta$ に $\rho$ を含む $u_\pm$ が、$\dot\pi$ に $\lambda$ を含む $u_\pm$ が現れます。このため一方の相対運動を単独の中心力Kepler問題として閉じられません。
<!-- solution-end -->

<a id="ex-cele2-b04"></a>
**B4. 衝突までの時間。** 換算質量 $\mu$、引力定数 $\kappa$ の二体放射運動で、$r(0)=r_0>0,\dot r(0)=0$ とする。エネルギーから有限衝突時刻を導出せよ。なぜこの計算は全三体初期値の衝突を証明しないか。

- Level: B

<!-- solution-start -->
**詳細解答。** [二体の相対Hamiltonian](../CELE1/index.md#prop-cele1-canonical-reduction)で角運動量零とすると

$$
\frac\mu2\dot r^2-\frac\kappa r=-\frac\kappa{r_0},
\qquad
\dot r=-\sqrt{\frac{2\kappa}{\mu}\left(\frac1r-\frac1{r_0}\right)}.
$$

下降する解で $dt= -\sqrt{\mu/(2\kappa)}\,dr/\sqrt{1/r-1/r_0}$。積分の上下を反転し $r=r_0\sin^2\theta$ を用いると

$$
\begin{aligned}
t_{\rm coll}
&=\sqrt{\frac\mu{2\kappa}}
\int_0^{r_0}\frac{dr}{\sqrt{1/r-1/r_0}}\\
&=2\sqrt{\frac{\mu r_0^3}{2\kappa}}
\int_0^{\pi/2}\sin^2\theta\,d\theta\\
&=2\sqrt{\frac{\mu r_0^3}{2\kappa}}\frac\pi4
=\frac\pi2\sqrt{\frac{\mu r_0^3}{2\kappa}}.
\end{aligned}
$$

衝突時刻は有限です。ただしここで仮定したのは二体かつ角運動量零という特別な初期条件です。第三粒子の加速が入る一般三体では同じ一次元エネルギー式を使えず、この計算から一般初期値の衝突を結論できません。
<!-- solution-end -->

### Level C

<a id="ex-cele2-c01"></a>
**C1. 三体の可換積分と独立性。** 等質量 $m_i=G=1$ の内部三体Hamiltonianを用い、次の各問に答えよ。

1. $L=\rho\times\pi+\lambda\times\eta$ について、$H_{\rm int},|L|^2,L_z$ が保存され互いにPoisson可換であることを示せ。
2. $\rho=(1,0,0),\lambda=(0,1,0),\pi=(0,1,0),\eta=(0,0,1)$ において、$(\pi_y,\eta_z,\eta_x)$ に関するヤコビ行列の行列式を計算せよ。
3. 平面と三次元の内部自由度を数え、1. と2. が証明していないことを明記せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** **(1)** 各距離は同時回転で変わらず、運動量のノルムも変わりません。[角運動量のPoisson関係](../../AMECH/AMECH6/index.md#prop-amech6-angular-momentum)から

$$
\{H_{\rm int},L_i\}=0,\quad
\{L_x,L_z\}=-L_y,\quad
\{L_y,L_z\}=L_x.
$$

したがって

$$
\{H_{\rm int},|L|^2\}
=\sum_i2L_i\{H_{\rm int},L_i\}=0,\quad
\{|L|^2,L_z\}=-2L_xL_y+2L_yL_x=0.
$$

$H_{\rm int},|L|^2,L_z$ は相互可換で、[第一積分の保存判定](../../../幾何系/INT/INT1/index.md#prop-int1-conservation-criterion)により保存されます。

**(2)** $\mu_{12}=1/2,\mu_3=2/3$ より $H_{\rm int}$ の運動量微分は $\partial_{\pi_y}H_{\rm int}=2,\partial_{\eta_z}H_{\rm int}=3/2,\partial_{\eta_x}H_{\rm int}=0$。この点で $L=(1,0,1)$。$dL=d\rho\times\pi+\rho\times d\pi+d\lambda\times\eta+\lambda\times d\eta$ ですから、三つの指定運動量方向では

$$
\partial_{\pi_y}L=e_z,\quad
\partial_{\eta_z}L=e_x,\quad
\partial_{\eta_x}L=-e_z.
$$

従って $\partial |L|^2=2L\cdot \partial L$ を順に適用した第二行は $(2,2,-2)$。$L_z=\rho_x\pi_y-\rho_y\pi_x+\lambda_x\eta_y-\lambda_y\eta_x$ の第三行は $(1,0,-1)$。よって

$$
\det\begin{pmatrix}2&3/2&0\\2&2&-2\\1&0&-1\end{pmatrix}
=2(2\cdot(-1)-(-2)\cdot0)
-\frac32(2\cdot(-1)-(-2)\cdot1)
=-4\ne0.
$$

独立性は少なくともこの点の近傍に成立します。

**(3)** 三次元は相対位置二本が各3成分なので内部6自由度・相空間12次元、平面は各2成分なので4自由度・8次元です。[Liouville可積分性](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)には各々6個、4個の独立で相互可換な積分が必要です。ここで示した三次元の三個と、本文で小行列式を確かめた平面系の二個の存在・独立性からは、残りの積分が存在するかどうかは分かりません。従って「未構成」と「不存在」とを区別するのが結論です。
<!-- solution-end -->

## 7. 次章への問い

重心を分離する正準変換は二体でも三体でも実行できました。しかし三体では内部Hamiltonianのポテンシャルに二つの相対ベクトルが同時に入り、自由度の計数と保存量の数だけでは運動を解き尽くせません。

それでも、**特別な形を保って動く三体軌道**は存在します。次のCELE3では、粒子が一直線に並ぶEuler型の解と、正三角形を保つLagrange型の解を導くために、力がどの条件で位置ベクトルの共通倍率になるかを考えます。
