# KAH1-05 平坦模型と構成操作

<!-- definition-example-audit: strict -->

## 1. 一つのKähler模型から、ほかの多様体へ

[局所Kählerポテンシャル](../KAH1-04/index.md#def-kah1-04-local-potential)を用いると、正値な複素Hessianから閉じた基本2形式を作れる。しかし、既に作った計量を**商・積・部分多様体**へ移しても、その性質は保たれるだろうか。どの操作も同じように見えるが、閉性・正値性・曲率の判定は別々である。

まず実座標を $z^j=x^j+iy^j$ とし、$\mathbb C^n$ の実Euclid計量を

$$
g_0=\sum_{j=1}^n\bigl((dx^j)^2+(dy^j)^2\bigr)
$$

とする。以下、$g$ は実Riemann計量、$J$ は複素構造、$\omega(u,v)=g(Ju,v)$ とする。この対応は既習の[基本2形式の定義](../KAH1-01/index.md#def-kah1-01-fundamental-form)による。複素座標の規約は

$$
\omega=i\sum_{i,j}g_{i\bar j}\,dz^i\wedge d\bar z^j,
\qquad
g_{i\bar j}=\frac{\delta_{ij}}2
\quad\text{（標準模型）}
$$

である。ここで $g_{i\bar j}$ は実計量そのものの行列ではなく、この規約での **Hermite係数**である。$1/2$ を落とすと実Euclid計量の規格化が二倍になる。

[既出のポテンシャル計算](../KAH1-04/index.md#def-kah1-04-local-potential)から

$$
\varphi_0=\frac12\sum_j|z^j|^2,\qquad
\omega_0=i\partial\bar\partial\varphi_0
=\sum_jdx^j\wedge dy^j
$$

を得る。$\varphi_0$ は実数値で滑らか、$(g_{i\bar j})=I_n/2$ は正定値、$d\omega_0=0$ だから、この三つ組はKähler構造である。定数計量のもとでは直交実座標のLevi–Civita接続の係数がすべて零で、[Riemann 曲率作用素](../../GEO/GEO16/index.md#def-geo16-curvature)から $R=0$ である。

## 2. 定数Hermite行列による平坦模型

対角行列以外にも正定値なHermite行列を選んでよい。$H=(H_{i\bar j})$ を定数の複素 $n\times n$ 行列とし、Hermite性 $H_{j\bar i}=\overline{H_{i\bar j}}$ と正定値性

$$
\sum_{i,j}H_{i\bar j}v^i\overline{v^j}>0
\qquad (v\in\mathbb C^n,\ v\ne0)
$$

を課す。まず次の実 $(1,1)$ 形式を候補として作る。

$$
\omega_H=i\sum_{i,j}H_{i\bar j}\,dz^i\wedge d\bar z^j.
$$

ここで $H$ は、正則座標の基底 $dz^i$ で基本形式を展開したときの係数行列であり、行列の正定値性は[基本形式の正値性判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)と同値である。実接ベクトル $u$ の複素座標成分を $a^i=dz^i(u)$ とすると、$u\ne0$ なら $a=(a^i)\ne0$ であり、

$$
\omega_H(u,J_0u)=2\sum_{i,j}H_{i\bar j}a^i\overline{a^j}>0
$$

となる。この条件を満たす基本形式から復元される実計量を、実接ベクトル $u,v$ に対して

$$
g_H(u,v)=2\operatorname{Re}
\sum_{i,j}H_{i\bar j}\,dz^i(u)\overline{dz^j(v)}
$$

である。特に $H=I_n/2$ なら $g_H=g_0$ となる。複素数の係数行列から実計量を作る際の係数 $2$ は、この一致によって確かめられる。

<a id="prop-kah1-05-constant-model"></a>

<!-- formal-statement-start -->
> **命題（定数Hermite行列から作る平坦Kähler構造）**  
> $\mathbb C^n$ 上に定数の正定値Hermite行列 $H=(H_{i\bar j})$ を与える。上で定めた $g_H$ と標準複素構造 $J_0$ に対応する基本形式は

$$
\omega_H=i\sum_{i,j}H_{i\bar j}\,dz^i\wedge d\bar z^j
=i\partial\bar\partial
\left(\sum_{i,j}H_{i\bar j}z^i\bar z^j\right)
$$

> である。$(\mathbb C^n,J_0,g_H,\omega_H)$ はKähler多様体であり、そのRiemann曲率テンソルは恒等的に零である。
<!-- formal-statement-end -->

### 証明の見取り図

実計量の定義から基本形式を復元し、ポテンシャルの混合二階微分が $H$ を与えることを確認する。正値性・閉性の後、計量の実座標係数が定数であることを使って曲率零を示す。

<!-- proof-start -->
### 証明

$u\in T\mathbb C^n$ を実接ベクトルとすると $dz^i(J_0u)=i\,dz^i(u)$。従って

$$
\begin{aligned}
g_H(J_0u,v)
&=2\operatorname{Re}\left(i\sum_{i,j}
H_{i\bar j}dz^i(u)\overline{dz^j(v)}\right)\\
&=-2\operatorname{Im}\sum_{i,j}
H_{i\bar j}dz^i(u)\overline{dz^j(v)}.
\end{aligned}
$$

一方、$\omega_H$ を実ベクトル $u,v$ に評価すると、Hermite性により第二項は第一項の共役になるので、

$$
\begin{aligned}
\omega_H(u,v)
&=i\sum_{i,j}H_{i\bar j}
\bigl(dz^i(u)d\bar z^j(v)-dz^i(v)d\bar z^j(u)\bigr)\\
&=i(A-\bar A)=-2\operatorname{Im}A,\\
A&=\sum_{i,j}H_{i\bar j}dz^i(u)\overline{dz^j(v)}.
\end{aligned}
$$

よって $\omega_H(u,v)=g_H(J_0u,v)$ である。$g_H(u,u)=2\sum H_{i\bar j}dz^i(u)\overline{dz^j(u)}>0$ は $u\ne0$ から従い、対称性と実双線形性も定義とHermite性から従う。

実関数 $\varphi_H=\sum_{i,j}H_{i\bar j}z^i\bar z^j$ は、複素共役を取り添字を入れ替えると $\overline{\varphi_H}=\varphi_H$。さらに

$$
\partial_{\bar j}\varphi_H=\sum_iH_{i\bar j}z^i,
\qquad
\partial_i\partial_{\bar j}\varphi_H=H_{i\bar j}.
$$

従って $\omega_H=i\partial\bar\partial\varphi_H$ であり、[局所ポテンシャルからのKähler形式](../KAH1-02/index.md#prop-kah1-02-potential-suffices)の適用条件（実関数・正定値Hessian）を満たすので閉じている。最後に $H$ が定数だから $g_H$ の実座標成分も定数である。[曲率の局所表示](../../GEO/GEO16/index.md#prop-geo16-tensoriality-coordinate)ではChristoffel係数およびその微分が零となり、$R=0$ である。$\square$
<!-- proof-end -->

例えば $n=2$ で

$$
H=\begin{pmatrix}2&1\\1&3\end{pmatrix},
\qquad
\varphi_H=2|z^1|^2+3|z^2|^2+2\operatorname{Re}(z^1\bar z^2)
$$

とすると、任意の $v\ne0$ に対して

$$
v^iH_{i\bar j}\bar v^j
=2\left|v^1+\frac{v^2}2\right|^2+\frac52|v^2|^2>0
$$

である。$H$ は実対称なのでHermite性を満たし、平方完成はすべての零でない $v$ に対する正値性を示す。また全係数が定数なので $d\omega_H=0$、実計量のChristoffel係数が零なので $R=0$ である。このように **Hermite性、正値性、閉性、曲率零**はそれぞれ別の条件として確かめられる。

## 3. 複素トーラス：平坦計量は商へ降りる

[全格子と複素トーラスの定義](../../CM/CM1-09/index.md#def-cm1-09-complex-torus)を思い出そう。$\Lambda\subset\mathbb C^n$ は実ベクトル空間として $\mathbb C^n\simeq\mathbb R^{2n}$ を張る $2n$ 本の実線形独立ベクトルの整数係数結合全体であり、$T=\mathbb C^n/\Lambda$ はコンパクトな複素多様体である。[格子商の正則アトラス](../../CM/CM1-09/index.md#thm-cm1-09-quotient-atlas)で、重なりの座標変換は $z\mapsto z+\lambda$（$\lambda\in\Lambda$）となる。

ポテンシャル $\varphi_0$ は一般に周期的ではない。それでも、ポテンシャルから作った **微分形式と計量は周期的** である。

<a id="prop-kah1-05-torus"></a>

<!-- formal-statement-start -->
> **命題（平坦複素トーラスのKähler構造）**  
> $\Lambda\subset\mathbb C^n$ を全格子、$T=\mathbb C^n/\Lambda$ をその複素トーラスとする。任意の定数正定値Hermite行列 $H$ に対し、$\mathbb C^n$ 上の $g_H$ と $\omega_H$ は商 $T$ 上の滑らかなKähler計量と基本形式を一意に定める。そのRiemann曲率は零である。
<!-- formal-statement-end -->

### 証明の見取り図

商の各座標上で同じテンソルを定義するには、格子平行移動に関して不変であることを確かめればよい。商上での正値性と閉性は局所座標ごとに確認できる。

<!-- proof-start -->
### 証明

$\tau_\lambda(z)=z+\lambda$ に対し $\tau_\lambda^*dz^i=d(z^i+\lambda^i)=dz^i$ であり、$H$ は定数なので

$$
\tau_\lambda^*\omega_H
=iH_{i\bar j}\,\tau_\lambda^*dz^i\wedge\tau_\lambda^*d\bar z^j
=\omega_H.
$$

同じ理由で $\tau_\lambda^*g_H=g_H$。格子商の正則座標遷移がこれらの平行移動だから、座標ごとの計量と形式は重なりで一致し、$T$ 上の大域テンソルを定める。

局所的には $\mathbb C^n$ と同じ座標式であり、$H$ の正定値性は座標変換で失われない。さらに $d\omega_H=0$ は商の各チャートで成立するので大域的にも成立する。曲率は局所テンソルであり、定数係数の各チャートで $R=0$ だから、$T$ のすべての点で零になる。$\square$
<!-- proof-end -->

一次元では $\Lambda=\mathbb Z+i\mathbb Z$ と $H=(1/2)$ を取ると、$\omega=dx\wedge dy$ である。商での局所表示は常に同じだが、

$$
\varphi_0(z+\lambda)-\varphi_0(z)
=\operatorname{Re}(\bar\lambda z)+\frac12|\lambda|^2
$$

は一般に零でない。これが矛盾でないのは、[ポテンシャルの差の定理](../KAH1-04/index.md#thm-kah1-04-gauge)によって右辺の混合二階微分が零となるからである。なお、このトーラス上には単一の大域ポテンシャルを置けないことは[Stokesによる反証](../KAH1-04/index.md#prop-kah1-04-torus-obstruction)で既に示した。**大域Kähler形式の存在**と**大域ポテンシャルの存在**は別の問題である。

## 4. 積：二つのKähler構造を合わせる

二つのKähler多様体 $(X,J_X,g_X,\omega_X)$ と $(Y,J_Y,g_Y,\omega_Y)$ を考える。積 $X\times Y$ の接ベクトルは $(u,v)\in T_xX\oplus T_yY$ と表せる。射影 $\pi_X,\pi_Y$ を使い、$J$ を二つの成分に別々に作用させると、計量と基本形式の自然な候補は

$$
\begin{aligned}
J(u,v)&=(J_Xu,J_Yv),\\
g&=\pi_X^*g_X+\pi_Y^*g_Y,\\
\omega&=\pi_X^*\omega_X+\pi_Y^*\omega_Y
\end{aligned}
$$

となる。ここで引き戻しは、例えば $(\pi_X^*\omega_X)((u_1,v_1),(u_2,v_2))=\omega_X(u_1,u_2)$ を意味する。

<a id="thm-kah1-05-product"></a>

<!-- formal-statement-start -->
> **定理（Kähler多様体の積）**  
> $(X,J_X,g_X,\omega_X)$ と $(Y,J_Y,g_Y,\omega_Y)$ を滑らかなKähler多様体とする。積複素構造 $J_X\oplus J_Y$ と、上記の和で定めた $g,\omega$ は $X\times Y$ にKähler構造を与える。積のLevi–Civita接続とRiemann曲率は各因子のものの直和であり、積が平坦であるための必要十分条件は両因子が平坦なことである。
<!-- formal-statement-end -->

### 証明の見取り図

複素チャートの積が正則であることから可積分性を得る。正値性ではゼロでない接ベクトルのいずれかの成分が非零であること、閉性では外微分が引き戻しと可換なことを用いる。曲率はブロック対角計量のChristoffel係数から確かめる。

<!-- proof-start -->
### 証明

$X$ と $Y$ の正則座標をそれぞれ $z^i,w^\alpha$ とすれば、$(z,w)$ は積の正則座標であり、$J$ は標準複素構造である。正定値性は

$$
g((u,v),(u,v))=g_X(u,u)+g_Y(v,v)>0
$$

が $(u,v)\ne(0,0)$ で成り立つことから従う。二つの計量の対称性と滑らかさから $g$ にも同じ性質がある。さらに

$$
\begin{aligned}
g(J(u_1,v_1),(u_2,v_2))
&=g_X(J_Xu_1,u_2)+g_Y(J_Yv_1,v_2)\\
&=\omega((u_1,v_1),(u_2,v_2)).
\end{aligned}
$$

外微分と引き戻しの交換性および各因子の閉性から

$$
d\omega=\pi_X^*(d\omega_X)+\pi_Y^*(d\omega_Y)=0
$$

である。これでKähler性を示した。

曲率について、実局所座標を $x^a$（$X$）と $y^\mu$（$Y$）と書く。積計量の成分は

$$
(g_{AB})=
\begin{pmatrix}g^X_{ab}(x)&0\\0&g^Y_{\mu\nu}(y)\end{pmatrix}.
$$

このブロック形では各因子の計量係数は他方の変数に依存せず、

$$
\partial_{y^\mu}g^X_{ab}=0,\qquad
\partial_{x^a}g^Y_{\mu\nu}=0.
$$

ここで[Levi–Civita接続の係数公式](../../GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)へ積計量を代入する。

$$
\Gamma^A_{BC}
=\frac12g^{AD}
(\partial_Bg_{CD}+\partial_Cg_{BD}-\partial_Dg_{BC}).
$$

逆計量もブロック対角だから、例えば混合した添字について

$$
\Gamma^a_{b\mu}
=\frac12(g_X)^{ac}\partial_{y^\mu}g^X_{bc}=0,
\qquad
\Gamma^\mu_{ab}
=-\frac12(g_Y)^{\mu\nu}\partial_{y^\nu}g^X_{ab}=0
$$

となる。$X,Y$ を入れ替えた成分も同じ理由で零となり、同一因子に属する添字だけが残る：

$$
\Gamma^a_{bc}=\Gamma^{X,a}_{bc},
\qquad
\Gamma^\mu_{\nu\rho}=\Gamma^{Y,\mu}_{\nu\rho}.
$$

これらを[曲率作用素の座標表示](../../GEO/GEO16/index.md#prop-geo16-tensoriality-coordinate)に代入すると、交差項は消え、残りは各因子の曲率成分そのものである。従って共変微分も曲率作用素も因子ごとに分かれる。積の曲率が零なら、一方の因子に接するベクトルだけを選んで各因子の曲率が零と分かる。逆に両因子の曲率が零なら直和も零である。$\square$
<!-- proof-end -->

例えば $\mathbb C$ と一次元平坦トーラスの積は、複素次元二の平坦Kähler多様体である。一方、積の片方が曲がっていれば積全体にもその曲率が残る。積を取ることと平坦化することは同じではない。

## 5. 正則部分多様体：閉性と正値性は残るが平坦とは限らない

複素多様体 $X,Y$ の間の滑らかな写像 $f:X\to Y$ が**正則**なら、その微分は $df\circ J_X=J_Y\circ df$ を満たす。さらに各点で $df_x:T_xX\to T_{f(x)}Y$ が単射なら、$f$ を**正則はめ込み**という。埋め込みはこれに加え、像への位相同型であることを要求する。ここでは局所構成に必要な単射微分の条件だけを使う。

$f$ が正則はめ込みなら $f^*\omega_Y$ を $X$ 上へ引き戻せる。引き戻しは接ベクトルの像で評価する操作であり、

$$
(f^*g_Y)_x(u,v)=g_{Y,f(x)}(df_xu,df_xv),
\qquad
(f^*\omega_Y)_x(u,v)=\omega_{Y,f(x)}(df_xu,df_xv)
$$

と定める。形式の閉性は一般の滑らかな写像でも保たれるが、**正値性は微分の単射性がなければ失われ得る**。

<a id="def-kah1-05-induced-form"></a>

<!-- formal-statement-start -->
> **定義（正則はめ込みに沿う誘導Kähler構造）**  
> $(Y,J_Y,g_Y,\omega_Y)$ をKähler多様体、$X$ を複素多様体、$f:X\to Y$ を正則はめ込みとする。$X$ 上の組

$$
g_X=f^*g_Y,\qquad \omega_X=f^*\omega_Y
$$

> を $f$ に沿う**誘導計量・誘導基本形式**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-05-induced-form -->
**定義の確認**。$f:\mathbb C\to\mathbb C^2$ を $f(z)=(z,z^2)$ とし、$\mathbb C^2$ に標準計量・形式を入れる。微分は

$$
df_z(v)=(v,2zv)
$$

だから、$df_z(v)=0$ なら第一成分より $v=0$。従って全点で単射で、成分は多項式なので正則。標準実計量 $g_0$ は二つの複素座標の長さの二乗の和だから、任意の実接ベクトル $v$ について

$$
(f^*g_0)_z(v,v)
=|dz(v)|^2+|2z\,dz(v)|^2
=(1+4|z|^2)|dz(v)|^2.
$$

$|dz(v)|^2=dx(v)^2+dy(v)^2$ なので、これは実計量の表示

$$
g_X=(1+4|z|^2)(dx^2+dy^2)
$$

を意味する。係数が正であり、$v\ne0$ なら $dz(v)\ne0$ だから正定値である。形式についても、標準形式 $\omega_0=\frac i2(dz^1\wedge d\bar z^1+dz^2\wedge d\bar z^2)$ の各微分形式を引き戻すと

$$
f^*dz^1=dz,\quad f^*dz^2=2z\,dz,
\qquad
\omega_X=\frac i2(1+4|z|^2)\,dz\wedge d\bar z.
$$

この表示は実 $(1,1)$ 型であり、実二次元では任意の3形式が零なので $d\omega_X=0$ である。さらに正則性の $df_z(Jv)=J_0df_z(v)$ により

$$
\omega_X(u,v)=g_0(J_0df_z(u),df_z(v))
=g_X(Ju,v)
$$

である。これで定義の誘導関係とKähler性を、判定方法の由来も含めて確認した。
<!-- definition-example-end -->

<a id="thm-kah1-05-holomorphic-immersion"></a>

<!-- formal-statement-start -->
> **定理（正則はめ込みによるKähler構造の引き戻し）**  
> $(Y,J_Y,g_Y,\omega_Y)$ をKähler多様体、$X$ を複素多様体、$f:X\to Y$ を正則はめ込みとする。このとき誘導計量 $f^*g_Y$ は正定値で、その基本形式は $f^*\omega_Y$ に等しい。特に $X$ は誘導Kähler構造を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$df_x$ による接ベクトルの像を $Y$ の計量に入れる。Kähler形式の引き戻しは閉じる一方、正値性には像が非零となる条件が必要である。

<!-- proof-start -->
### 証明

$u,v\in T_xX$ を取る。正則性から $df_x(J_Xu)=J_Ydf_x(u)$ であり、引き戻しの定義によって

$$
\begin{aligned}
(f^*\omega_Y)_x(u,v)
&=(\omega_Y)_{f(x)}(df_xu,df_xv)\\
&=(g_Y)_{f(x)}(J_Ydf_xu,df_xv)\\
&=(g_Y)_{f(x)}(df_x(J_Xu),df_xv)\\
&=(f^*g_Y)_x(J_Xu,v).
\end{aligned}
$$

$u\ne0$ なら $df_xu\ne0$ であり、$g_Y$ が正定値だから

$$
(f^*g_Y)_x(u,u)=g_Y(df_xu,df_xu)>0.
$$

引き戻しは滑らかで対称性を保つため、$f^*g_Y$ はRiemann計量である。また $d(f^*\omega_Y)=f^*(d\omega_Y)=0$。$X$ の複素構造は正則アトラス由来なので可積分であり、以上でKählerの条件が全て成立する。$\square$
<!-- proof-end -->

正則座標でこの構成の係数を自力で確かめよう。$f=(f^1,\ldots,f^N)$ とし、$w^i$ を $Y$ の正則座標、$h_{i\bar j}$ をそのHermite係数とする。$z^a$ を $X$ の正則座標とすると、$f$ の正則性と連鎖律から

$$
f^*(dw^i)=d(f^i)=\sum_a\frac{\partial f^i}{\partial z^a}dz^a,
\qquad
f^*(d\bar w^j)=\sum_b\overline{\frac{\partial f^j}{\partial z^b}}d\bar z^b.
$$

したがって $\omega_Y=i\sum h_{i\bar j}\,dw^i\wedge d\bar w^j$ の両方の1形式を引き戻し、$i\,dz^a\wedge d\bar z^b$ の係数を比較すると

$$
(f^*\omega_Y)_{a\bar b}
=\sum_{i,j}h_{i\bar j}(f(z))
\frac{\partial f^i}{\partial z^a}
\overline{\frac{\partial f^j}{\partial z^b}}.
$$

これは「係数だけを代入する」のではなく、**両方の微分形式を引き戻してから係数を比較した**式である。任意の複素ベクトル $v\ne0$ について右辺の二次形式は $df(v)\ne0$ の正値評価になる。

ただし、周囲が平坦でも部分多様体の誘導計量は平坦とは限らない。上の $f(z)=(z,z^2)$ で、$\lambda(x,y)=1+4(x^2+y^2)$ とおく。$g_X=\lambda(dx^2+dy^2)$ は共形平面計量である。[共形平面計量のGauss曲率の計算](../../GEO/GEO16/index.md#ex-geo16-b02)によって、$e^{2u}=\lambda$、$u=\tfrac12\log\lambda$ と置くと

$$
K=-e^{-2u}(u_{xx}+u_{yy})
=-\frac1{2\lambda}(\partial_x^2+\partial_y^2)\log\lambda.
$$

実際、$\partial_x\log\lambda=8x/\lambda$ だから

$$
\partial_x^2\log\lambda=\frac8\lambda-\frac{64x^2}{\lambda^2},
\quad
\partial_y^2\log\lambda=\frac8\lambda-\frac{64y^2}{\lambda^2}.
$$

$\lambda=1+4(x^2+y^2)$ を代入して

$$
\Delta\log\lambda
=\frac{16\lambda-64(x^2+y^2)}{\lambda^2}
=\frac{16}{\lambda^2},
\qquad
K=-\frac8{(1+4|z|^2)^3}<0.
$$

この例では $\mathbb C^2$ は曲率零、曲線はKählerだが負曲率である。**誘導Kähler性と誘導曲率零を取り違えない**ことが核心となる。

## 6. 構成が適用できない場合

どの複素多様体も、ここで述べた三つの方法で自動的にKählerになるわけではない。トーラス商では「平行移動不変な計量」の存在を使い、積では「各因子にKähler計量が既にある」ことを仮定し、はめ込みでは「Kählerな対象への正則かつ単射微分な写像」を仮定した。仮定を除いて単なる滑らかな写像 $f$ を使うと、$df\circ J_X=J_Y\circ df$ が失われ、引き戻しは $(1,1)$ 型とは限らない。

正則写像であっても $df$ が零となる点では、正値性は失われる。例えば $f:\mathbb C\to\mathbb C,\ f(z)=z^2$ では

$$
f^*g_0=4|z|^2(dx^2+dy^2),
$$

となり、原点で計量が退化する。$f^*\omega_0$ は依然として閉じているが、**閉形式であるだけではKähler形式ではない**。また、前節の放物線の例は、はめ込みを仮定しても曲率零までは保存しないことを示した。

## 7. 演習：構成・正値性・曲率を区別する

### Level A

<a id="ex-kah1-05-a01"></a>
#### KAH1-05-A01 標準模型の係数と曲率
- Level: A

$\mathbb C$ の $g=dx^2+dy^2$ について、$\omega$、Hermite係数 $g_{z\bar z}$、実ポテンシャル $\varphi$ を求め、閉性と曲率零を確認せよ。

<!-- solution-start -->
**詳細解答**。$J\partial_x=\partial_y$ なので $\omega(\partial_x,\partial_y)=g(\partial_y,\partial_y)=1$、よって $\omega=dx\wedge dy$。$dz\wedge d\bar z=-2i\,dx\wedge dy$ より

$$
\omega=\frac i2\,dz\wedge d\bar z,\qquad g_{z\bar z}=\frac12.
$$

$\varphi=\frac12z\bar z$ とすれば $\partial_{\bar z}\varphi=z/2$、$\partial_z(z/2)=1/2$ より $i\partial\bar\partial\varphi=\omega$。係数は正で、実二次元上の $d\omega$ は3形式ゆえ零。実計量成分は定数なのでChristoffel係数が零、従って $R=0$。
<!-- solution-end -->

<a id="ex-kah1-05-a02"></a>
#### KAH1-05-A02 非対角な定数Hermite計量
- Level: A

$\mathbb C^2$ で $H=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ とする。$\varphi_H$ を書き下し、正値性と閉性を示せ。

<!-- solution-start -->
**詳細解答**。Hermite性は行列が実対称であることから従う。ポテンシャルは

$$
\varphi_H=2|z^1|^2+z^1\bar z^2+z^2\bar z^1+3|z^2|^2.
$$

混合二階微分を順に行えば $\partial_1\partial_{\bar1}\varphi_H=2$、$\partial_1\partial_{\bar2}\varphi_H=1$、$\partial_2\partial_{\bar1}\varphi_H=1$、$\partial_2\partial_{\bar2}\varphi_H=3$。したがって $i\partial\bar\partial\varphi_H=iH_{i\bar j}dz^i\wedge d\bar z^j$。任意の $v\ne0$ に対し

$$
2|v^1|^2+2\operatorname{Re}(v^1\bar v^2)+3|v^2|^2
=2|v^1+v^2/2|^2+\frac52|v^2|^2>0.
$$

$H$ の全成分が定数なので $\partial_kH_{i\bar j}=0=\partial_iH_{k\bar j}$ が成り立つ。[Kähler閉性の局所係数条件](../KAH1-02/index.md#thm-kah1-02-local-closedness)から $d\omega_H=0$ と判定でき、正値と閉性は異なる検証である。
<!-- solution-end -->

<a id="ex-kah1-05-a03"></a>
#### KAH1-05-A03 トーラスへ降りるもの・降りないもの
- Level: A

$\Lambda=\mathbb Z+i\mathbb Z$ とする。$\omega_0=dx\wedge dy$ が $\mathbb C/\Lambda$ に降りる一方、$\varphi_0=|z|^2/2$ が降りないことを、$\lambda=1$ の平行移動で示せ。

<!-- solution-start -->
**詳細解答**。$z'=z+1$ なら $dx'=dx,dy'=dy$ なので $\tau_1^*\omega_0=dx\wedge dy=\omega_0$。一般の格子元 $\lambda=m+in$ でも $d(z+\lambda)=dz$ より不変である。一方、

$$
\varphi_0(z+1)-\varphi_0(z)
=\frac{|z+1|^2-|z|^2}2
=\operatorname{Re}z+\frac12
$$

は一定の零関数ではなく、例えば $z=0$ で $1/2$。従って $\varphi_0$ は商の関数にならない。しかし差の $\partial\bar\partial$ は零なので形式が降りる事実とは矛盾しない。
<!-- solution-end -->

<a id="ex-kah1-05-a04"></a>
#### KAH1-05-A04 直線の正則埋め込み
- Level: A

$a\in\mathbb C$ を定数とし、$f(z)=(z,az):\mathbb C\to\mathbb C^2$ に標準Kähler計量を引き戻せ。誘導計量の正値性とGauss曲率を求めよ。

<!-- solution-start -->
**詳細解答**。$df_z(v)=(v,av)$ であり、第一成分が $v$ なので単射。$f$ の第一座標への射影は逆写像 $f(\mathbb C)\to\mathbb C$ を与えるため、像への位相同型でもあり正則埋め込みである。さらに

$$
f^*g_0(v,v)=|v|^2+|a v|^2=(1+|a|^2)|v|^2.
$$

従って $g_X=(1+|a|^2)(dx^2+dy^2)$、$\omega_X=\frac i2(1+|a|^2)dz\wedge d\bar z$。係数 $1+|a|^2>0$ なので正値であり、形式は引き戻しのため閉じている。実計量成分は全点で定数、Christoffel係数は零、従って $K=0$。
<!-- solution-end -->

### Level B

<a id="ex-kah1-05-b01"></a>
#### KAH1-05-B01 積のポテンシャルと大域的な注意
- Level: B

$X=\mathbb C$ に $\omega_X=\frac i2 dz\wedge d\bar z$、$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ に $\omega_T=dx'\wedge dy'$ を入れる。$X\times T$ がKählerかつ平坦であることを示し、$\mathbb C\times\mathbb C$ 上のポテンシャルを一つ求めよ。それが商全体の関数となるか判定せよ。

<!-- solution-start -->
**詳細解答**。両因子はそれぞれ閉・正値の基本形式を持ち、定数係数ゆえ平坦である。[積の定理](#thm-kah1-05-product)により $X\times T$ の $\omega=\pi_X^*\omega_X+\pi_T^*\omega_T$ はKählerで、曲率は両因子の曲率の直和だから零。被覆座標 $(z,w)$ では

$$
\omega=\frac i2dz\wedge d\bar z+\frac i2dw\wedge d\bar w,
\quad
\Phi(z,w)=\frac{|z|^2+|w|^2}{2}
$$

とすれば $i\partial\bar\partial\Phi=\omega$。しかし第二変数に格子元 $1$ を足すと

$$
\Phi(z,w+1)-\Phi(z,w)=\operatorname{Re}w+\frac12,
$$

なので $\Phi$ は商全体の関数にはならない。局所ポテンシャルが存在することと大域関数への降下は別である。
<!-- solution-end -->

<a id="ex-kah1-05-b02"></a>
#### KAH1-05-B02 非対角計量でも平坦
- Level: B

$\Lambda=\mathbb Z(1,0)+\mathbb Z(i,0)+\mathbb Z(0,1)+\mathbb Z(0,i)\subset\mathbb C^2$ とし、定数Hermite行列 $H=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ を用いる。$\omega_H$ が商へ降りること、正値性、曲率を説明せよ。直交計量である必要があるか。

<!-- solution-start -->
**詳細解答**。提示された4本は $\mathbb C^2$ の実基底をなすので全格子であり、商は複素トーラス。格子平行移動は $dz^i$ を変えず、定数 $H$ も変えないため

$$
\tau_\lambda^*\omega_H=iH_{i\bar j}dz^i\wedge d\bar z^j=\omega_H.
$$

$H$ は実対称だからHermiteであり、

$$
2|v^1|^2+2|v^2|^2+
2\operatorname{Re}(v^1\bar v^2)
=|v^1+v^2|^2+|v^1|^2+|v^2|^2>0
$$

となる。定数係数なので閉性と曲率零が成り立つ。与えられた格子の生成元は標準Euclid計量について直交する。一方、今回の計量では実座標方向の内積が

$$
g_H(\partial_{x^1},\partial_{x^2})
=2\operatorname{Re}H_{1\bar2}=2\ne0
$$

だから、この座標方向は直交しない。**格子基底の直交性**と**選んだHermite計量の直交性**は別の条件である。どちらにせよ平行移動不変性・正値性・閉性が成立し、曲率は零である。
<!-- solution-end -->

<a id="ex-kah1-05-b03"></a>
#### KAH1-05-B03 微分が退化する正則写像
- Level: B

$f:\mathbb C\to\mathbb C^2$ を $f(z)=(z^2,z^3)$ とする。標準実Euclid計量の引き戻しが正定値となる点の集合を求めよ。閉性はどこで成立するか。

<!-- solution-start -->
**詳細解答**。複素微分は $df_z(v)=(2zv,3z^2v)$ で、誘導計量は

$$
(f^*g_0)_z(v,v)
=4|z|^2|v|^2+9|z|^4|v|^2
=(4|z|^2+9|z|^4)|v|^2.
$$

$z\ne0$ なら係数は正で、$df_z$ は単射。$z=0$ なら係数零で、$df_0=0$。よって正定値となるのは $\mathbb C\setminus\{0\}$ だけである。形式 $\omega=f^*\omega_0$ は全平面上で滑らかであり、$d\omega=f^*d\omega_0=0$ は原点を含む全点で成立する。**閉性は保たれ、正値性だけが原点で壊れる**。
<!-- solution-end -->

### Level C

<a id="ex-kah1-05-c01"></a>
#### KAH1-05-C01 正則埋め込みと曲率の全分類
- Level: C

$a\in\mathbb C$ に対して $f_a(z)=(z,az^2)$ とする。$\mathbb C^2$ の標準Kähler計量を引き戻し、次をすべて導け。

1. 任意の $a$ についてKähler計量となること。
2. Gauss曲率 $K_a(z)$ の具体式。
3. 平坦となる $a$ の必要十分条件。

計量の正値性・閉性・曲率を混同せず検証せよ。

<!-- solution-start -->
**詳細解答**。正則写像の微分は

$$
df_{a,z}(v)=(v,2azv).
$$

第一成分が $v$ なので $df_{a,z}$ はどの $a,z$ でも単射である。$f_a$ 自体も第一座標で逆写像が連続となるため像への位相同型であり、正則埋め込みである。誘導係数を

$$
\lambda_a(z)=1+4|a|^2|z|^2
$$

とおけば

$$
g_a=\lambda_a(dx^2+dy^2),\qquad
\omega_a=\frac i2\lambda_a\,dz\wedge d\bar z.
$$

$\lambda_a\ge1>0$ なので正定値。形式は標準形式の引き戻しであり $d\omega_a=f_a^*(d\omega_0)=0$。基本形式と誘導計量の両立性は $df_{a,z}(iv)=i\,df_{a,z}(v)$ を引き戻しの式へ代入して確認できる。これは[正則はめ込みによるKähler構造の引き戻し](#thm-kah1-05-holomorphic-immersion)に対応し、全 $a$ についてKählerである。

曲率を求めるため $r^2=x^2+y^2$、$c=4|a|^2\ge0$ と置き、$\lambda_a=1+cr^2$ とする。共形曲率公式の $u=(1/2)\log\lambda_a$ を使う。まず

$$
\partial_x\log\lambda_a=\frac{2cx}{\lambda_a},
\quad
\partial_x^2\log\lambda_a
=\frac{2c}{\lambda_a}-\frac{4c^2x^2}{\lambda_a^2}.
$$

$y$ について同様に計算して和を取ると

$$
\begin{aligned}
\Delta\log\lambda_a
&=\frac{4c}{\lambda_a}-\frac{4c^2(x^2+y^2)}{\lambda_a^2}\\
&=\frac{4c(\lambda_a-cr^2)}{\lambda_a^2}
=\frac{4c}{\lambda_a^2}.
\end{aligned}
$$

従って [共形計量のGauss曲率計算](../../GEO/GEO16/index.md#ex-geo16-b02)へ代入すると

$$
K_a(z)=-\frac1{2\lambda_a}\Delta\log\lambda_a
=-\frac{2c}{\lambda_a^3}
=-\frac{8|a|^2}{(1+4|a|^2|z|^2)^3}.
$$

$a=0$ なら $f_0(z)=(z,0)$、$\lambda_0=1$、$K_0=0$。$a\ne0$ なら分子が負、分母が正なので全点で $K_a(z)<0$。ゆえに **平坦となる必要十分条件は $a=0$** である。周囲の平坦性と引き戻したKähler性から、誘導計量の平坦性は結論できない。
<!-- solution-end -->

## 8. 次の模型へ

平坦な複素トーラスでは定数Hermite係数が局所座標間で一致し、積では計量がブロックに分かれ、正則はめ込みでは接ベクトルの像で正値性を検証した。三つの構成を通じ、閉性は保たれても、正値性には操作ごとに条件があり、曲率は別途計算が必要であることが分かった。

次に考える射影空間では、全体を覆う単一座標も一つの大域ポテンシャルもない。局所ポテンシャルを計算し、遷移の下で基本形式が一致するかを確かめる。
