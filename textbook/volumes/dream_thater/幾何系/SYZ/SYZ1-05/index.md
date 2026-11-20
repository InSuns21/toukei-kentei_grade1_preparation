# SYZ1-05 McLean理論I――変形方程式の線形化

<!-- definition-example-audit: strict -->

## 1. グラフでない特殊Lagrange部分多様体を動かす

前講の[規格化した特殊Lagrange条件](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)は、向き付き実 $n$ 次元部分多様体 $L$ に対する二つの方程式

$$
\omega|_L=0,\qquad
\operatorname{Im}(e^{-i\theta}\Omega)|_L=0
$$

と、実部の正値性だった。勾配グラフなら[複素行列式の方程式](../SYZ1-04/index.md#thm-syz1-04-graph-equation)へ書き換えられる。しかし曲がった $L$ 全体を単一のグラフ座標で表すことは普通できない。

そこで、$L$ を法線方向へ微小に動かしたとき、この二つの条件の**一次変化**を求める。最初に法線場を1形式へ変換すれば、座標に依存しない二つの微分方程式が現れる。これがMcLean変形理論の線形部分である。

最小の例は $\mathbb C$ 内の実軸である。実軸を上へ一定量平行移動しても位相0のままだが、各点を高さ $t x$ だけ動かすと直線が傾き、その位相は変わる。「法線に動かせる」ことと「固定した位相の特殊Lagrangeであり続ける」ことは別なのである。

## 2. 幾何と符号を固定する

$(X,J,g,\omega,\Omega)$ を複素次元 $n\ge1$ のKähler多様体とする。規約は

$$
\omega(U,W)=g(JU,W)
$$

である。$\Omega$ は零にならない閉じた正則 $n$ 形式で、[前講の規格化](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)を満たすと仮定する。たとえば標準 $\mathbb C^n$ なら

$$
z^j=x^j+i y^j,\quad
\omega=\sum_{j=1}^n dx^j\wedge dy^j,\quad
\Omega=dz^1\wedge\cdots\wedge dz^n
$$

である。

$L\subset X$ は向き付けられた埋め込み $n$ 次元特殊Lagrange部分多様体とし、一定の位相 $\theta$ について

$$
\omega|_L=0,\qquad
\operatorname{Im}(e^{-i\theta}\Omega)|_L=0,\qquad
\operatorname{Re}(e^{-i\theta}\Omega)|_L=\operatorname{vol}_L
$$

が成立しているものとする。$\operatorname{vol}_L$ は誘導計量と指定した向きの体積形式である。次の局所的な一次変分を求めるだけなら、$L$ のコンパクト性や境界なしの仮定は必要ない。

変形は滑らかな埋め込み族 $F_t:L\to X$（$|t|<\varepsilon$）で表し、$F_0$ は包含写像、$V=\left.\partial_t F_t\right|_{t=0}$ はその速度場とする。

ここで $\partial_tF_t(p)$ は点 $p\in L$ を固定して時刻 $t$ で微分したベクトル、$F_t^*\eta$ は $F_t$ による微分形式 $\eta$ の[引き戻し](../../GEO/GEO7/index.md#def-geo7-pullback-form)である。後で使う $d/dt$ はこの引き戻し形式の $t$ に関する微分を表し、$d$ は $L$ 上の外微分を表す。

接方向への速度はパラメータの付け替えなので、まず $V$ を各点で $T_pL$ に直交する**法線ベクトル場**とする。一般の速度の場合も第6節で接成分が一次式に寄与しないことを確認する。

## 3. 法線場を二つの微分形式へ移す

$\omega$ に法線ベクトルを代入すると1形式が得られる。$n$ 形式 $\operatorname{Im}(e^{-i\theta}\Omega)$ に代入すると $(n-1)$ 形式になる。ここで[内部積（縮約）](../../GEO/GEO7/index.md#def-geo7-interior-product) $\iota_V\eta$ は、$k$ 形式 $\eta$ の最初の引数に $V$ を代入して $k-1$ 形式を作る操作である。具体的には

$$
(\iota_V\eta)(U_1,\ldots,U_{k-1})=\eta(V,U_1,\ldots,U_{k-1}).
$$

$|_{TL}$ は残る引数を $L$ の接ベクトルに制限することを表す。符号を曖昧にしないため、1形式側には**マイナス**を付ける。

<a id="def-syz1-05-variation-forms"></a>

<!-- formal-statement-start -->
> **定義（法線変形に対応する二つの形式）**  
> 上記の $(X,J,g,\omega,\Omega)$ と位相 $\theta$ の特殊Lagrange部分多様体 $L$ を固定する。$L$ 上の滑らかな法線ベクトル場 $V$ に対して、$L$ 上の1形式 $\alpha_V$ と $(n-1)$ 形式 $\beta_V$ を

$$
\alpha_V=-\bigl(\iota_V\omega\bigr)|_{TL},\qquad
\beta_V=\bigl(\iota_V\operatorname{Im}(e^{-i\theta}\Omega)\bigr)|_{TL}
$$

> により定める。後者は $n=1$ のとき0形式（関数）である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-05-variation-forms -->
### 直接例：水平平面の上向き変位

**定義の確認**

$X=\mathbb C^2$、$L=\{y^1=y^2=0\}$ を $(x^1,x^2)$ の標準向きにし、$\theta=0$ とする。$V=a_1\partial_{y^1}+a_2\partial_{y^2}$（$a_1,a_2$ は $L$ 上の滑らかな関数）を考える。

$J\partial_{x^j}=\partial_{y^j}$ で、$V$ は接空間に直交するから法線場である。各接基底 $e_k=\partial_{x^k}$ に対して

$$
-\omega(V,e_k)=-g(JV,e_k)=a_k,
\qquad \alpha_V=a_1dx^1+a_2dx^2.
$$

他方 $\operatorname{Im}\Omega=dx^1\wedge dy^2+dy^1\wedge dx^2$ なので

$$
\beta_V(e_1)=-a_2,\qquad
\beta_V(e_2)=a_1,\qquad
\beta_V=a_1dx^2-a_2dx^1.
$$

定義に現れた **1形式・1形式（$n-1=1$）の次数、法線性、符号**を直接確認できた。
<!-- definition-example-end -->

## 4. 計量と向きが作るHodge星・余微分

$\alpha$ と $\beta$ の関係を調べるには、$L$ 自身の誘導計量と向きが必要である。各点の正の向きの正規直交余接基底を $(e^1,\ldots,e^n)$ と書く。1形式 $\alpha=\sum_j a_j e^j$ から、その直交補の方向に向いた $(n-1)$ 形式を作る操作がHodge星 $*$ である。たとえば二次元の標準向きでは $*dx=dy$、$*dy=-dx$ となる。

<a id="def-syz1-05-hodge-star-codifferential"></a>

<!-- formal-statement-start -->
> **定義（1形式のHodge星と余微分）**  
> $L$ を向き付きRiemann $n$ 次元多様体とする。1形式 $\alpha$ に対するHodge星 $*\alpha$ は、任意の1形式 $\eta$ について

$$
\eta\wedge *\alpha=\langle\eta,\alpha\rangle_g\operatorname{vol}_L
$$

> を満たす $(n-1)$ 形式である。さらに1形式の**余微分**（形式的随伴）を0形式として

$$
d^*\alpha=-*d*\alpha
$$

> と定める。ここで右辺の最後の星は最高次形式を関数に移すHodge星で、$*\operatorname{vol}_L=1$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-05-hodge-star-codifferential -->
### 直接例：平面の発散と余微分

**定義の確認**

$L=\mathbb R^2$ を $dx\wedge dy$ の向き、Euclid計量とし、$\alpha=a(x,y)dx+b(x,y)dy$ とする。定義から

$$
*dx=dy,\qquad *dy=-dx,\qquad
*\alpha=a\,dy-b\,dx.
$$

実際に $dx\wedge *dx=dx\wedge dy$、$dy\wedge *dy=dy\wedge(-dx)=dx\wedge dy$、異なる基底同士の外積は0である。外微分を成分ごとに取ると

$$
d*\alpha=(\partial_xa+\partial_yb)\,dx\wedge dy,\qquad
d^*\alpha=-(\partial_xa+\partial_yb).
$$

したがって $d^*\alpha=0$ は、係数ベクトル場の発散が0であることに等しい。一般の誘導計量でも符号は同じである。$\alpha^\sharp$ を $g(\alpha^\sharp,U)=\alpha(U)$ で定まる接ベクトル場、$\nabla$ を計量を保ち捩れのないLevi-Civita接続とする。

点 $p$ の近傍で、$p$ において $\nabla_{e_j}e_k=0$ となる正規直交局所枠 $e_1,\ldots,e_n$ と双対余接枠 $e^1,\ldots,e^n$ を選ぶ。$p$ では $de^j=0$ で、Hodge星の基底公式

$$
*e^j=(-1)^{j-1}e^1\wedge\cdots\wedge\widehat{e^j}\wedge\cdots\wedge e^n
$$

を $\alpha=\sum_j a_j e^j$ に適用すると、各項を外微分したとき $e^j$ 方向の微分だけが残り、

$$
d*\alpha(p)=\sum_{j=1}^n e_j(a_j)(p)\,\operatorname{vol}_L(p).
$$

計量との両立性と $\nabla_{e_j}e_k(p)=0$ より、1形式の共変微分の積の法則を使って

$$
\begin{aligned}
(\nabla_{e_j}\alpha)(e_j)(p)
&=e_j\bigl(\alpha(e_j)\bigr)(p)-\alpha\bigl(\nabla_{e_j}e_j\bigr)(p)\\
&=e_j(a_j)(p),\\
g(\nabla_{e_j}\alpha^\sharp,e_j)(p)
&=(\nabla_{e_j}\alpha)(e_j)(p)
\end{aligned}
$$

が得られる。発散を $\operatorname{div}_L W=\sum_j g(\nabla_{e_j}W,e_j)$ と定義すると

$$
d^*\alpha=-\sum_{j=1}^n(\nabla_{e_j}\alpha)(e_j)
=-\operatorname{div}_L(\alpha^\sharp).
$$

局所枠は各点で選び直せるので、最後の等式は $L$ 全体で成立する。
<!-- definition-example-end -->

ここで **閉** は $d\alpha=0$、**余閉** は $d^*\alpha=0$ を意味する。両方を満たす1形式をこの講義では**調和1形式**と呼ぶ。境界なしのコンパクト多様体上での調和形式の有限次元性・非線形変形への持ち上げは、次講で扱う。

## 5. 法線場の二つの形式はHodge星で結ばれる

$\alpha$ と $\beta$ は別々の変数ではない。SLag接空間の複素構造が、ちょうどHodge星を介して両者を同定する。

<a id="prop-syz1-05-hodge-identification"></a>

<!-- formal-statement-start -->
> **命題（法線場・1形式・Hodge星の同定）**  
> 第2節の規格化したKähler構造と位相 $\theta$ の特殊Lagrange $L$ において、各滑らかな法線場 $V$ に対し、前述の形式は

$$
\alpha_V=-(JV)^\flat,\qquad
V=J(\alpha_V^\sharp),\qquad
\beta_V=*\alpha_V
$$

> を満たす。特に $V\mapsto\alpha_V$ は法線束と余接束の各ファイバーの線形同型である。
<!-- formal-statement-end -->

### 証明の見取り図

接枠 $e_1,\ldots,e_n$ を正の向きに選ぶと、法線枠は $Je_1,\ldots,Je_n$ になる。$V=\sum_j a_jJe_j$ と書けば、$\alpha=\sum_j a_j e^j$。$\Omega$ は複素線形なので、$Je_j$ を一度代入すると係数に $i$ が付く。残る符号は $e_j$ を第1引数へ移す置換の $(-1)^{j-1}$ であり、Hodge星と一致する。

<!-- proof-start -->
### 証明

$L$ はLagrangeだから $T_pL$ の $g$-直交補は $J(T_pL)$ に等しい。実際に $u,v\in T_pL$ に対し $g(Ju,v)=\omega(u,v)=0$ で、両空間の次元は $n$ である。従って、正の向きの正規直交接枠 $e_1,\ldots,e_n$ に対し、法線場を $V=\sum_j a_jJe_j$ と一意に書ける。

各 $k$ について

$$
\alpha_V(e_k)=-\omega(V,e_k)
=-g(JV,e_k)
=-g\!\left(-\sum_j a_je_j,e_k\right)=a_k.
$$

従って $\alpha_V=\sum_j a_j e^j$ かつ $V=J\alpha_V^\sharp$。これは同時に $-(JV)^\flat=\alpha_V$ を示す。

SLagの向きと位相の仮定から $\Omega(e_1,\ldots,e_n)=e^{i\theta}$ である。$\beta_V$ を $(e_1,\ldots,\widehat{e_k},\ldots,e_n)$ に評価する。$\Omega$ の複素線形性 $\Omega(Ju,\ldots)=i\Omega(u,\ldots)$ によって

$$
\begin{aligned}
\beta_V(e_1,\ldots,\widehat{e_k},\ldots,e_n)
&=\operatorname{Im}\sum_j a_je^{-i\theta}
\Omega(Je_j,e_1,\ldots,\widehat{e_k},\ldots,e_n)\\
&=\operatorname{Im}\bigl(i\,a_k(-1)^{k-1}\bigr)\\
&=(-1)^{k-1}a_k.
\end{aligned}
$$

$ j\ne k $ の項は同じ $e_j$ が二度現れるため交代性により0となる。一方Hodge星の定義を正規直交枠へ適用すると

$$
*e^k=(-1)^{k-1}e^1\wedge\cdots\wedge\widehat{e^k}\wedge\cdots\wedge e^n.
$$

従って全ての基底 $(n-1)$ 組上で $\beta_V$ と $*\alpha_V$ の評価が一致し、両形式は等しい。$n=1$ でも $\beta_V=a_1=*\alpha_V$ と同じ計算になる。
<!-- proof-end -->

この同定は「法線変形に対して1形式を自由に選べる」ことを意味するが、その1形式がSLag方程式を一次で満たすとは限らない。次にその条件を求める。

## 6. 変形方程式の一次部分

<a id="thm-syz1-05-linearization"></a>

<!-- formal-statement-start -->
> **定理（固定位相のSLag方程式の線形化）**  
> 第2節の規格化したKähler多様体 $(X,J,g,\omega,\Omega)$、一定の位相 $\theta$ の向き付き特殊Lagrange $L$、滑らかな埋め込み族 $F_t:L\to X$（$F_0$ は包含写像）を取る。速度場 $V$ の法線成分に対する1形式を $\alpha=-\iota_V\omega|_{TL}$ とする。次の一次変化が成り立つ。

$$
\left.\frac{d}{dt}\right|_{0}F_t^*\omega=-d\alpha,
$$

$$
\left.\frac{d}{dt}\right|_{0}F_t^*\operatorname{Im}(e^{-i\theta}\Omega)
=d*\alpha=-(d^*\alpha)\operatorname{vol}_L.
$$

> よって、**位相 $\theta$ を固定したSLag条件の一次部分が零であるための必要十分条件**は

$$
d\alpha=0,\qquad d^*\alpha=0
$$

> である。これは非線形なSLag変形の存在を直ちに保証する主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

閉形式 $\eta$ に対し、変形族による引き戻しの微分はCartanの公式で $d(\iota_V\eta)$ になる。$\omega$ と $\operatorname{Im}(e^{-i\theta}\Omega)$ はともに閉形式である。1形式側のマイナス符号と第5節の $\beta=*\alpha$ を代入して終わりではなく、最後に最高次形式の係数を余微分へ変換する。

<!-- proof-start -->
### 証明

まず $V$ を $L$ の近傍へ滑らかに延長する。任意の閉 $k$ 形式 $\eta$ に対する引き戻しの微分公式と[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)は

$$
\begin{aligned}
\left.\frac{d}{dt}\right|_0F_t^*\eta
&=\bigl(\mathcal L_V\eta\bigr)|_L\\
&=\bigl(d(\iota_V\eta)+\iota_V(d\eta)\bigr)|_L\\
&=d\bigl((\iota_V\eta)|_{TL}\bigr).
\end{aligned}
$$

ここでは $d\eta=0$ を使い、最後の $d$ は $L$ 上の外微分である。$F_t$ は必ずしも $V$ の流れではないが、$t=0$ の引き戻しの一次変化は速度場 $V$ のみで決まる。したがって近傍への延長をどのように選んでも同じ結果になる。

$\eta=\omega$ とすると、$\iota_V\omega|_{TL}=-\alpha$ だから

$$
\left.\frac{d}{dt}\right|_0F_t^*\omega
=d(-\alpha)=-d\alpha.
$$

$\eta=\operatorname{Im}(e^{-i\theta}\Omega)$ とすると、$\theta$ は定数で、正則最高次形式の閉性から $d\eta=0$。第5節の[Hodge星による同定](#prop-syz1-05-hodge-identification)より

$$
\left.\frac{d}{dt}\right|_0F_t^*\eta
=d(\iota_V\eta|_{TL})=d\beta=d*\alpha.
$$

[余微分の定義](#def-syz1-05-hodge-star-codifferential) $d^*\alpha=-*d*\alpha$ と、任意の最高次形式 $\gamma$ に対する $\gamma=(*\gamma)\operatorname{vol}_L$ を併用すれば

$$
d*\alpha=(*d*\alpha)\operatorname{vol}_L
=-(d^*\alpha)\operatorname{vol}_L.
$$

体積形式は各点で零でないので、この $n$ 形式が零であることと $d^*\alpha=0$ は同値である。第一式が零となる条件 $d\alpha=0$ と合わせて主張を得る。

最後に速度場へ接成分 $W\in\Gamma(TL)$ を足しても、$\omega|_{TL}=0$ より $\iota_W\omega|_{TL}=0$、$\operatorname{Im}(e^{-i\theta}\Omega)|_{TL}=0$ より $\iota_W\operatorname{Im}(e^{-i\theta}\Omega)|_{TL}=0$ である。ゆえに一次式は法線成分だけで決まる。
<!-- proof-end -->

主定理は二つの異なる次数の零条件を一つの1形式へまとめている。$d\alpha$ は2形式、$d*\alpha$ は $n$ 形式である。両者を単に「微分が零」と混同せず、それぞれLagrange性と位相条件の一次変化に対応させよう。

## 7. 位相まで動かすと何が変わるか

位相を $\theta(t)$ として変えてよい場合、虚部の式の微分には位相自体の変化も入る。ここでは $\dot\theta(0)=\left.\frac{d\theta(t)}{dt}\right|_{t=0}$ と書き、$\theta(t)$ は $L$ 上の位置には依存しないものとする。コンパクト性をどこで使うかを見るために、ここだけ $L$ をコンパクト・境界なしと仮定する。

<a id="prop-syz1-05-phase-rigidity"></a>

<!-- formal-statement-start -->
> **命題（コンパクトSLagの位相の一次固定）**  
> 第6節の設定に加え、$L$ が非空、コンパクト、境界なしとする。位相を滑らかな実数値関数 $\theta(t)$（$t$ だけに依存し、$\theta(0)=\theta$）として、変形が各時刻で

$$
F_t^*\operatorname{Im}(e^{-i\theta(t)}\Omega)=0
$$

> を満たすなら、$\dot\theta(0)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

位相の微分は虚部に $-\dot\theta(0)\operatorname{vol}_L$ を付け加える。最高次の外微分の積分はStokesの定理と境界なしの仮定で0になる。残るのは位相の導関数と正の体積だけである。

<!-- proof-start -->
### 証明

$t=0$ での積の微分を行う。第6節の[固定位相のSLag方程式の線形化](#thm-syz1-05-linearization)を固定した $\theta$ に適用し、$\partial_t e^{-i\theta(t)}|_0=-i\dot\theta(0)e^{-i\theta}$ を用いると

$$
\begin{aligned}
0&=\left.\frac{d}{dt}\right|_0
F_t^*\operatorname{Im}(e^{-i\theta(t)}\Omega)\\
&=d*\alpha-\dot\theta(0)
\operatorname{Re}(e^{-i\theta}\Omega)|_L\\
&=d*\alpha-\dot\theta(0)\operatorname{vol}_L.
\end{aligned}
$$

ここで $\alpha$ は速度場の法線成分から作る。これを $L$ 上で積分すると、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)と $\partial L=\varnothing$ より $\int_Ld*\alpha=0$。従って

$$
0=-\dot\theta(0)\int_L\operatorname{vol}_L.
$$

非空のコンパクトRiemann多様体の体積は正で有限だから、$\dot\theta(0)=0$ である。
<!-- proof-end -->

**コンパクト性を落とすとどうなるか。** $\mathbb C$ の実軸を $F_t(x)=x+i t x$ と傾けると、その位相は $\theta(t)=\arctan t$、従って $\dot\theta(0)=1$ である。実軸は非コンパクトなので $d*\alpha$ を全体で積分して0とする議論は使えない。

## 8. 一次解と実際の変形を区別する

第6節の線形化定理の核は「閉かつ余閉の1形式」、すなわち調和1形式である。コンパクト境界なしの $L$ ではこの空間は有限次元になり、次講でHodge理論と[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)のBanach空間版と楕円型方程式の解析を用いて実際の局所変形空間と結び付ける。ただし**本講の一次方程式だけでは、任意の解が有限変形へ積分できるとはまだ証明していない**。

### 例1：平坦トーラスの並進

$X=\mathbb C^n/(\mathbb Z^n+i\mathbb Z^n)$ に標準構造を入れ、$L=\{y=0\}$ とする。向きは $dx^1\wedge\cdots\wedge dx^n$、位相0であり、前講の[SLag条件](../SYZ1-04/index.md#prop-syz1-04-slag-conditions)を満たす。定数 $c_j$ に対し

$$
V=\sum_jc_j\partial_{y^j},\quad
\alpha=\sum_jc_jdx^j,\quad
d\alpha=0,\quad d^*\alpha=0.
$$

族 $F_t(x)=x+i t c$ は実際にSLagの平行移動になる。一方、閉形式でも $\alpha=\sum_j x^jdx^j$ はトーラス上では大域的に定義できない。**局所の係数式が周期的であること**も大域変形には必要である。

### 例2：余閉を失うグラフ

$\mathbb C^2$ の水平平面で $V=x\partial_{y^1}+y\partial_{y^2}$ とすると $\alpha=x\,dx+y\,dy$ は閉じているが

$$
d^*\alpha=-2,\qquad d*\alpha=2\,dx\wedge dy.
$$

グラフ $F_t(x,y)=(x,y,tx,ty)$ はすべての $t$ でLagrangeだが、[グラフの複素行列式](../SYZ1-04/index.md#thm-syz1-04-graph-equation)は $(1+it)^2=1-t^2+2it$。位相0の虚部は $t\ne0$ で零にならない。一次計算の係数2と直接一致する。

### 例3：一次解が直線的な非線形解とは限らない

$\mathbb C^3$ の水平平面で $f(x,y,z)=xyz$ とし、$V=J\nabla f$（実軸方向の勾配を $J$ で法線に移したもの）を取る。$\alpha=df$ は閉じており、$\Delta f=0$ より $d^*\alpha=0$ でもある。ところが有限のグラフ $F_t(q)=q+i t\nabla f(q)$ は、実部 $q=(x,y,z)$ を固定して虚部を $t\nabla f$ とする。接基底 $\partial_{q^k}$ に対して

$$
dz^j\bigl(dF_t(\partial_{q^k})\bigr)
=\delta^j_k+it\,\partial_{q^k}\partial_{q^j}f
$$

となるため、[勾配グラフの特殊Lagrange方程式](../SYZ1-04/index.md#thm-syz1-04-graph-equation)で用いた複素評価行列は $I+itH$ である。ここで $H=D^2f$ は実座標でのHessian

$$
H=
\begin{pmatrix}
0&z&y\\
z&0&x\\
y&x&0
\end{pmatrix}
$$

で、$\operatorname{tr}H=0$、$\det H=2xyz$。これを用いると

$$
\operatorname{Im}\det(I+i tH)=-t^3\det H=-2t^3xyz.
$$

一般の点では $t\ne0$ のとき位相0のSLagにならない。これは **この直線的なグラフ族では解けない**という意味であり、より高次の補正を持つ別の変形族まで存在しないと証明したわけではない。

## 9. 演習：符号から非線形の限界まで

### Level A：形式の定義と局所計算

<a id="ex-syz1-05-a01"></a>

#### SYZ1-05-A01 実直線の法線変形

- Level: A

標準 $\mathbb C$ の実軸 $L=\mathbb R$ を増加方向に向け、$\theta=0$、$V=a(x)\partial_y$ とする。$\alpha_V$、$\beta_V$、$*\alpha_V$、$d^*\alpha_V$ を求め、一次で位相を固定する条件を述べよ。

<!-- solution-start -->
### 詳細解答

$\omega=dx\wedge dy$ であり、$-\omega(V,\partial_x)=a(x)$ だから $\alpha=a\,dx$。また $\Omega=dx+i\,dy$ の虚部は $dy$ なので、$\beta=\iota_Vdy=a$ は0形式である。

一次元の体積形式は $dx$ で、定義から $*dx=1$。従って

$$
*\alpha=a,\qquad d*\alpha=a'(x)\,dx,\qquad
d^*\alpha=-*d*\alpha=-a'(x).
$$

1次元では $d\alpha=0$ は自動的であり、固定位相の条件は $a'(x)=0$ である。
<!-- solution-end -->

<a id="ex-syz1-05-a02"></a>

#### SYZ1-05-A02 閉性と余閉性の違い

- Level: A

標準向き・計量の $\mathbb R^2$ に $\alpha=x\,dy$ を置く。$d\alpha$、$*\alpha$、$d^*\alpha$ を求め、二つの条件のうち何が壊れるか示せ。

<!-- solution-start -->
### 詳細解答

外微分すると $d\alpha=dx\wedge dy\ne0$。$*dy=-dx$ だから $*\alpha=-x\,dx$。ここから $d*\alpha=-dx\wedge dx=0$、従って $d^*\alpha=-*0=0$。余閉だが閉ではない。第6節の[固定位相のSLag方程式の線形化](#thm-syz1-05-linearization)より、位相方程式の一次部分は零でもLagrange方程式の一次部分は $-dx\wedge dy$ であり零ではない。
<!-- solution-end -->

<a id="ex-syz1-05-a03"></a>

#### SYZ1-05-A03 放射方向の伸び

- Level: A

標準 $\mathbb C^2$ の水平平面上で $V=x\partial_{y^1}+y\partial_{y^2}$ を取る。$\alpha$ の閉性・余閉性を判定し、$F_t(x,y)=(x,y,tx,ty)$ の $\Omega$ の引き戻しの虚部を計算して一次係数を比較せよ。

<!-- solution-start -->
### 詳細解答

第3節と同じ計算で $\alpha=x\,dx+y\,dy$。外微分は $dx\wedge dx+dy\wedge dy=0$。Hodge星を使うと $*\alpha=x\,dy-y\,dx$ で、

$$
d*\alpha=dx\wedge dy-dy\wedge dx=2\,dx\wedge dy,\qquad d^*\alpha=-2.
$$

接ベクトルへの $dz^j$ の評価行列は $\operatorname{diag}(1+it,1+it)$。従って

$$
F_t^*\Omega=(1+it)^2\,dx\wedge dy=(1-t^2+2it)\,dx\wedge dy.
$$

虚部を $t=0$ で微分すると $2\,dx\wedge dy=d*\alpha$。Lagrange性は保つが固定した位相0は保たない。
<!-- solution-end -->

<a id="ex-syz1-05-a04"></a>

#### SYZ1-05-A04 調和ポテンシャルのグラフ

- Level: A

$f(x,y)=xy$ とし、標準 $\mathbb C^2$ の水平平面上で $\alpha=df$ を取る。一次条件を確かめ、$y_{\mathrm{imag}}=t\nabla f$ というグラフが全ての実数 $t$ で位相0のSLagになることを示せ。

<!-- solution-start -->
### 詳細解答

$\alpha=y\,dx+x\,dy$。$d\alpha=dy\wedge dx+dx\wedge dy=0$。また $*\alpha=y\,dy-x\,dx$ なので $d*\alpha=dy\wedge dy-dx\wedge dx=0$。したがって一次条件を満たす。Hessianは

$$
D^2f=\begin{pmatrix}0&1\\1&0\end{pmatrix}
$$

で、[グラフ方程式](../SYZ1-04/index.md#thm-syz1-04-graph-equation)より $F_t^*\Omega=\det(I+itD^2f)\,dx\wedge dy$。行列式は $1-(it)^2=1+t^2>0$。グラフの埋め込み性は実部の射影が恒等であることから従い、Hessianの対称性からLagrange。虚部0と実部正も満たすので、全ての $t$ で位相0のSLagである。
<!-- solution-end -->

<a id="ex-syz1-05-a05"></a>

#### SYZ1-05-A05 動く位相の微分

- Level: A

$\mathbb C$ の実軸から $F_t(x)=x+i t x$ と変形する。$t$ の小さい範囲で直線の位相 $\theta(t)$ を求め、$\alpha$ と $d*\alpha$ を計算し、位相の変化項を含む一次式の零を確かめよ。

<!-- solution-start -->
### 詳細解答

接ベクトルは $\partial_x+t\partial_y$ で、$dz$ の評価は $1+it$。向きは $x$ の増加方向なので位相は $\theta(t)=\arg(1+it)=\arctan t$、従って $\dot\theta(0)=1$。初速度は $V=x\partial_y$、$\alpha=x\,dx$、$*\alpha=x$ だから $d*\alpha=dx$。動く位相の方程式を微分すると

$$
d*\alpha-\dot\theta(0)\operatorname{vol}_L
=dx-1\cdot dx=0.
$$

コンパクトでない実軸では、位相の一次導関数が零であるという第7節の結論は適用できない。
<!-- solution-end -->

### Level B：局所式・大域式・変形不変性

<a id="ex-syz1-05-b01"></a>

#### SYZ1-05-B01 具体的な閉・余閉場を構成する

- Level: B

$\mathbb R^2$ 上の $\alpha=(x^2-y^2)\,dx-2xy\,dy$ について閉性・余閉性を計算し、$\alpha=df$ となる $f$ を求める。対応する複素グラフ $q+it\nabla f(q)$ が位相0のSLagとなることを全 $t\in\mathbb R$ で調べよ。

<!-- solution-start -->
### 詳細解答

係数を $a=x^2-y^2$、$b=-2xy$ とすると

$$
d\alpha=(\partial_xb-\partial_ya)\,dx\wedge dy
=(-2y+2y)\,dx\wedge dy=0,
$$

$$
d^*\alpha=-(\partial_xa+\partial_yb)=-(2x-2x)=0.
$$

$x$ で積分すると $f=x^3/3-xy^2+C(y)$。この $f_y=-2xy+C'(y)$ が $b=-2xy$ に等しいため $C'=0$。定数を0とすれば

$$
f(x,y)=\frac{x^3}{3}-xy^2,\qquad
D^2f=\begin{pmatrix}2x&-2y\\-2y&-2x\end{pmatrix}.
$$

グラフの実座標射影は恒等、Hessianは対称なので埋め込みかつLagrangeである。$H=D^2f$ は $\operatorname{tr}H=0$、$\det H=-4(x^2+y^2)$。従って

$$
\det(I+itH)=1-t^2\det H+it\operatorname{tr}H
=1+4t^2(x^2+y^2)>0.
$$

[グラフのSLag方程式](../SYZ1-04/index.md#thm-syz1-04-graph-equation)から、位相0の虚部0・実部正、そして誘導体積の等号まで確認できる。
<!-- solution-end -->

<a id="ex-syz1-05-b02"></a>

#### SYZ1-05-B02 二次元トーラスの調和1形式

- Level: B

平坦トーラス $T^2=\mathbb R^2/\mathbb Z^2$ 上の滑らかな周期1形式 $\alpha=a(x,y)\,dx+b(x,y)\,dy$ が $d\alpha=d^*\alpha=0$ を満たすとき、$a,b$ が定数であることを積分を用いて証明せよ。線形化の核の次元を求めよ。

<!-- solution-start -->
### 詳細解答

周期性と閉性・余閉性から

$$
b_x-a_y=0,\qquad a_x+b_y=0.
$$

一式を微分し、二式の交差項を消す。係数 $a$ については

$$
\Delta a=\partial_x(a_x+b_y)-\partial_y(b_x-a_y)=0.
$$

係数 $b$ については

$$
\Delta b=\partial_y(a_x+b_y)+\partial_x(b_x-a_y)=0.
$$

ただし二番目の式の右辺は $a_{xy}+b_{yy}+b_{xx}-a_{yx}=\Delta b$ である。トーラスには境界がないので周期境界の部分積分により

$$
0=\int_{T^2}a\Delta a\,dx\,dy
=-\int_{T^2}(a_x^2+a_y^2)\,dx\,dy,
$$

$$
0=\int_{T^2}b\Delta b\,dx\,dy
=-\int_{T^2}(b_x^2+b_y^2)\,dx\,dy.
$$

各積分の被積分関数は連続・非負なので偏導関数は全て0。連結性から $a,b$ は定数である。逆に定数1形式 $c_1dx+c_2dy$ は閉かつ余閉。従って核は $\operatorname{span}\{dx,dy\}$、次元2である。ここでは一般のHodge定理は使っていない。
<!-- solution-end -->

<a id="ex-syz1-05-b03"></a>

#### SYZ1-05-B03 接成分の追加は影響するか

- Level: B

第6節の設定で、速度場を $V+W$（$V$ は法線、$W$ は接ベクトル場）に替える。二つの一次式が変わらないことを、$W$ の内部積を用いて確かめよ。

<!-- solution-start -->
### 詳細解答

$L$ はLagrangeなので任意の接ベクトル $Z$ に対して $\omega(W,Z)=0$。従って $\iota_W\omega|_{TL}=0$ であり、

$$
-\iota_{V+W}\omega|_{TL}
=-\iota_V\omega|_{TL}=\alpha_V.
$$

また $L$ は位相 $\theta$ のSLagなので任意の $(n-1)$ 本の接ベクトル $Z_1,\ldots,Z_{n-1}$ に対して

$$
\operatorname{Im}(e^{-i\theta}\Omega)(W,Z_1,\ldots,Z_{n-1})=0.
$$

ゆえに

$$
\iota_{V+W}\operatorname{Im}(e^{-i\theta}\Omega)|_{TL}
=\beta_V.
$$

第6節の[固定位相のSLag方程式の線形化](#thm-syz1-05-linearization)では両者の外微分だけを取るので、二つの一次変化は不変である。接方向の速度は形状の実変化ではなくパラメータの付け替えであることと整合する。
<!-- solution-end -->

<a id="ex-syz1-05-b04"></a>

#### SYZ1-05-B04 コンパクト性と完全1形式

- Level: B

$L$ を連結・コンパクト・境界なしの向き付きRiemann多様体とする。$\alpha=df$ が閉かつ余閉であるなら、$df=0$ を示せ。これが非コンパクトな $\mathbb R^2$ では失敗する関数を一つ挙げよ。

<!-- solution-start -->
### 詳細解答

$d^*df=0$ と $d^*=-*d*$ より $d*df=0$。関数 $f$（0形式）と $(n-1)$ 形式 $*df$ に[外微分の次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を適用する。0形式の次数は0だから符号は $(-1)^0=1$ であり、

$$
d(f*df)=df\wedge *df+f\,d*df
=|df|_g^2\operatorname{vol}_L.
$$

[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)と $\partial L=\varnothing$ により積分左辺は0。従って $\int_L|df|_g^2\operatorname{vol}_L=0$。連続な非負関数なので $df=0$ が全点で成り立ち、連結性から $f$ は定数である。

一方 $\mathbb R^2$ で $f=x^2-y^2$ は非定数で、$\alpha=df=2x\,dx-2y\,dy$ は閉、$d^*\alpha=-\Delta f=-(2-2)=0$ となる。非コンパクトでは積分の境界項・収束条件を無視できない。
<!-- solution-end -->

### Level C：線形化の核と非線形変形を見分ける

<a id="ex-syz1-05-c01"></a>

#### SYZ1-05-C01 三変数の調和ポテンシャルと高次障害

- Level: C

$X=\mathbb C^3$、$L=\mathbb R^3$ を水平平面・標準向きの位相0のSLagとする。$f(x,y,z)=xyz$、$\alpha=df$、$V=J\alpha^\sharp$、$F_t(q)=q+it\nabla f(q)$ を考える。

1. $d\alpha$ と $d^*\alpha$ を求め、一次のSLag条件を判定せよ。
2. Hessian $H$ の成分、$\operatorname{tr}H$、2次の主小行列式の和、$\det H$ を求めよ。
3. $\det(I+itH)$ の実部・虚部を求め、$t\ne0$ の直線的グラフ族が位相0でSLagにならない点を示せ。
4. $t\ne0$ でこのグラフ族全体を較正する一定の別位相 $\theta_t$ が存在しない理由を述べ、何が証明されていないか説明せよ。

<!-- solution-start -->
### 詳細解答

**1.** $\alpha=df=yz\,dx+xz\,dy+xy\,dz$ なので $d\alpha=d^2f=0$。余微分は平坦計量で $d^*\alpha=-\Delta f$ である。$f_{xx}=f_{yy}=f_{zz}=0$ より $\Delta f=0$ なので余閉でもある。従って第6節の[固定位相のSLag方程式の線形化](#thm-syz1-05-linearization)の二つの一次式はどちらも零である。

**2.** 1階微分 $(f_x,f_y,f_z)=(yz,xz,xy)$ をさらに各変数で微分すると

$$
H=\begin{pmatrix}0&z&y\\z&0&x\\y&x&0\end{pmatrix},
\qquad \operatorname{tr}H=0.
$$

2次の主小行列式は順に $-z^2,-y^2,-x^2$ なので和 $\sigma_2=-(x^2+y^2+z^2)$。行列式を第1行で展開すると

$$
\det H=-z(z\cdot0-xy)+y(zx-0\cdot y)
=xyz+xyz=2xyz.
$$

**3.** $q=(x,y,z)$ の各座標で $F_t$ を微分すると

$$
dz^j\bigl(dF_t(\partial_{q^k})\bigr)
=\delta^j_k+it\,f_{jk}
$$

であり、$f_{jk}=\partial_{q^j}\partial_{q^k}f$ は $H$ の $(j,k)$ 成分である。このため[勾配グラフの方程式](../SYZ1-04/index.md#thm-syz1-04-graph-equation)より $F_t^*\Omega=\det(I+itH)\,dx\wedge dy\wedge dz$ となる。3次行列の基本対称式展開は

$$
\det(I+itH)=1+it\,\sigma_1-t^2\sigma_2-it^3\sigma_3.
$$

$\sigma_1=0$、$\sigma_2=-(x^2+y^2+z^2)$、$\sigma_3=2xyz$ を代入すると

$$
\det(I+itH)=1+t^2(x^2+y^2+z^2)-2it^3xyz.
$$

$F_t$ は実部が $q$ のグラフなので埋め込みであり、$tH$ の対称性からLagrangeである。しかし虚部は $-2t^3xyz$ だから、$t\ne0$ かつ $xyz\ne0$ の点では位相0のSLagではない。線形の $t$ 項が消えても3次の項は残る。

**4.** 実部 $R=1+t^2(x^2+y^2+z^2)$ は全点で正なので、その位相の正接は

$$
\frac{\operatorname{Im}\det(I+itH)}
{\operatorname{Re}\det(I+itH)}
=\frac{-2t^3xyz}{1+t^2(x^2+y^2+z^2)}.
$$

原点では0、$(1,1,1)$ では $-2t^3/(1+3t^2)\ne0$ となる。この比は位置に依存するので、全グラフで一定の位相 $\theta_t$ を選ぶことはできない。もっとも、これは **$F_t=q+it\nabla f$ という指定した族** の失敗を示しただけで、$t^2,t^3$ 以降の補正項を持つ別の埋め込み族の存在・不存在は判定していない。その問題には次講の非線形解析が必要である。
<!-- solution-end -->

## 10. 次の問い――一次解は本当に変形できるか

法線場 $V$ の空間を1形式の空間に移し、SLag条件の線形化を $d\alpha=0$ と $d^*\alpha=0$ の二つへ還元した。ここまでの結論は**方程式の微分の核**についてのものであり、核の各元から実際のSLag部分多様体を作ったわけではない。

次の **SYZ1-06「McLean理論II――無障害性と変形空間」** では、コンパクト境界なしの仮定の下でHodge分解と[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)のBanach空間版と楕円型方程式の解析を使い、調和1形式が局所変形空間の接ベクトルに実際に対応する理由、そしてその次元が第1Betti数となる理由を証明する。
