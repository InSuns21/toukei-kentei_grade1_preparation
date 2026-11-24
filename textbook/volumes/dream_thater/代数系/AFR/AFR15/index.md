# AFR15 分岐局所表現・newvector

[主系列の球固定空間](../AFR13/index.md#thm-afr13-spherical) は単数上非自明な指標を持つと消えます。そこで行列の合同条件を段階的に強め、初めて固定ベクトルが現れる段を調べます。さらに、上三角の加法方向に沿った Fourier 係数で表現を関数として実現します。この二つの操作は、局所的なレベルと大域的な Fourier 係数を結び付ける準備になります。

## 1. 二種類のレベル部分群

素数 $p$ を固定し、$F=\mathbb Q_p$、$O=\mathbb Z_p$、$G=GL_2(F)$、$K=GL_2(O)$ とします。付値は $v_p(0)=+\infty$ と約束します。[主合同部分群](../AFR13/index.md#def-afr13-congruence) は全成分を単位行列に近づけますが、今回は第二行だけに条件を課します。

<a id="def-afr15-level"></a>

<!-- formal-statement-start -->
> **定義（レベル部分群）**
> $n\ge1$ に対して
$$
K_0(p^n)=\left\{\begin{pmatrix}a&b\\c&d\end{pmatrix}\in K:c\in p^nO\right\},
$$
$$
K_1(p^n)=\left\{k\in K_0(p^n):d\equiv1\bmod p^n\right\}.
$$
> $K_0(p^0)=K_1(p^0)=K$ と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr15-level -->
**定義の確認**

$p=3,n=1$ とします。行列 $\begin{pmatrix}2&1\\3&1\end{pmatrix}$ の行列式は $-1$ で単元、左下成分は3、右下成分は1なので $K_1(3)$ に属します。しかし左上が法3で1でなく、右上も法3で0でないので主合同部分群には属しません。$\operatorname{diag}(1,2)$ は $K_0(3)$ に属しますが $K_1(3)$ に属しません。
<!-- definition-example-end -->

法 $p^n$ で還元すると $K_0(p^n)$ は上三角可逆行列群の逆像です。従って部分群です。その元の右下成分は単元であり、積の右下成分は法 $p^n$ で右下成分同士の積です。写像 $k\mapsto d\bmod p^n$ は全射準同型で、核が $K_1(p^n)$ です。両者は主合同部分群を含むコンパクト開部分群であり、$K_1(p^{n+1})\subset K_1(p^n)$ です。

表現 $(\pi,V)$ の中心指標 $\omega:F^\times\to\mathbb C^\times$ は $\pi(zI_2)=\omega(z)\operatorname{id}_V$ を満たす指標です。中心指標がある場合、$K_1$ による固定条件を $K_0$ による変換条件に言い換えられます。

<a id="prop-afr15-central-level"></a>

<!-- formal-statement-start -->
> **命題（レベルと中心指標）**
> 中心指標 $\omega$ を持つ滑らかな複素表現 $(\pi,V)$ と $n\ge1$ に対して
$$
V^{K_1(p^n)}
=\{v\in V:\pi(k)v=\omega(d)v\quad(k\in K_0(p^n))\}
$$
> が成立する。ただし $d=k_{22}$ である。非零の固定ベクトルが存在するなら $\omega$ は $1+p^nO$ 上で自明である。
<!-- formal-statement-end -->

### 証明の見取り図

右下成分をスカラー行列で割れば $K_1$ に入ります。逆向きでは右下成分が1に近い単数による中心作用を確認します。

<!-- proof-start -->
### 証明

$v\in V^{K_1(p^n)}$ とします。$k\in K_0(p^n)$ の右下成分 $d$ は単元なので $h=d^{-1}k$ は $K_1(p^n)$ に属します。よって
$$
\pi(k)v=\pi(dI_2)\pi(h)v=\omega(d)v.
$$
特に $u\in1+p^nO$ なら $uI_2\in K_1(p^n)$ なので $(\omega(u)-1)v=0$ です。$v\ne0$ なら $\omega(u)=1$ です。

逆に右辺の条件を満たす $v$ を取ります。右下成分による変換則と群の積が整合することから、中心指標の必要な自明性を導きます。

$k=\begin{pmatrix}1&0\\p^n&1\end{pmatrix}$、$l=\begin{pmatrix}1&t\\0&1\end{pmatrix}$ ($t\in O$) とすると、両者は $K_0(p^n)$ の元で右下成分は1です。従って $\pi(k)\pi(l)v=v$ です。一方 $kl$ の右下成分は $1+p^nt$ なので
$$
v=\pi(kl)v=\omega(1+p^nt)v.
$$
$v\ne0$ なら $\omega$ は $1+p^nO$ 上自明です。従って任意の $h\in K_1(p^n)$ に対して $\omega(h_{22})=1$ となり $\pi(h)v=v$ です。$v=0$ の場合も成立します。
<!-- proof-end -->

## 2. 導手と最初の固定ベクトル

単数上の指標の分岐を整数で測り、同様に表現についても最小レベルを記録します。

<a id="def-afr15-conductor"></a>

<!-- formal-statement-start -->
> **定義（導手指数と新ベクトル）**
> 局所定数な乗法指標 $\chi:F^\times\to\mathbb C^\times$ に対し $U_0=O^\times$、$U_j=1+p^jO$ ($j\ge1$) と置く。導手指数 $a(\chi)$ は $\chi|_{U_j}=1$ となる最小の $j\ge0$ である。
> 滑らかな複素表現 $(\pi,V)$ で $V^{K_1(p^n)}\ne0$ となる $n\ge0$ が存在するとき、
$$
a(\pi)=\min\{n\ge0:V^{K_1(p^n)}\ne0\}
$$
> を導手指数、$p^{a(\pi)}O$ を導手と呼ぶ。最小レベルの固定空間の非零元を新ベクトル（newvector）と呼ぶ。固定空間が直線の場合はスカラー倍を除いて一意である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr15-conductor -->
**定義の確認**

$p=3$ で $\eta(3^mu)$ を $u\bmod3$ が1なら1、2なら $-1$ とします。単数の剰余の積を保ち、$1+3O$ 上で1、2で $-1$ なので $a(\eta)=1$ です。一方、自明表現では $V^K=\mathbb C$ なので $a(\pi)=0$、導手は $O$、$1$ は新ベクトルです。
<!-- definition-example-end -->

指標の導手指数は局所定数性により必ず有限です。表現の導手指数については滑らかさだけでは有限性は保証されません。例えば $p=3$ の一次元表現 $\pi(g)=\eta(\det g)$ では $\operatorname{diag}(2,1)$ がすべての $K_1(3^n)$ に属して $-1$ 倍で作用するので、全レベルで固定空間が零です。この表現は滑らかですが新ベクトルを持ちません。

## 3. 主系列の固定空間を数える

[局所三角分解](../AFR13/index.md#thm-afr13-bk) により $G=BK$ です。$B$ は上三角可逆行列群、$D=B\cap K$ とします。[p進正規化主系列](../AFR13/index.md#def-afr13-principal) $I(\chi_1,\chi_2)$ の関数は $f(bg)=\lambda(b)f(g)$ を満たし、
$$
\lambda\left(\begin{pmatrix}a&b\\0&d\end{pmatrix}\right)
=|a/d|_p^{1/2}\chi_1(a)\chi_2(d).
$$
$K$ 上では絶対値因子は1です。右から $K_1(p^n)$ を掛けても値が変わらない関数を作るには、左の $D$ と右の $K_1(p^n)$ で同一視した集合を調べればよいことになります。

<a id="thm-afr15-orbits"></a>

<!-- formal-statement-start -->
> **定理（レベル二重剰余類）**
> $n\ge1$、$D=B\cap K$ とする。$D\backslash K/K_1(p^n)$ の代表元は
$$
k_0=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\quad
k_i=\begin{pmatrix}1&0\\p^i&1\end{pmatrix}\ (1\le i<n),
\quad k_n=I_2
$$
> であり、重複はない。
<!-- formal-statement-end -->

### 証明の見取り図

第二行を単元倍する左作用と、右からの上三角に近い行列による作用を調べます。左下成分の付値を $n$ で打ち切った値が軌道の番号になります。

<!-- proof-start -->
### 証明

$K_0(p^n)=O^\times I_2\cdot K_1(p^n)$ です。中心の単元行列は $D$ に属するので $DkK_0(p^n)=DkK_1(p^n)$ です。

二つの $K$ の元の第二行が単元倍で一致すれば、それらを $g,h$ と書いて $e_2h=ue_2g$ から $e_2hg^{-1}=(0,u)$ となり $hg^{-1}\in D$ です。従って第二行の単元倍を同一視すれば左の $D$ 作用を除けます。

第二行 $(c,d)$ は少なくとも一成分が単元です。$h=\begin{pmatrix}a&b\\c'&d'\end{pmatrix}\in K_0(p^n)$ で右乗算すると第一成分は $ca+dc'$ です。$a$ は単元、$c'\in p^nO$ なので $v_p(c)<n$ なら $v_p(ca+dc')=v_p(c)$、$v_p(c)\ge n$ なら $ca+dc'\in p^nO$ です。従って $i=\min(v_p(c),n)$ は不変です。

$i=0$ なら $c$ が単元です。単元倍して $(1,t)$ とし、右から $\begin{pmatrix}1&-t\\0&1\end{pmatrix}$ を掛けると $(1,0)$ になります。

$1\le i<n$ なら $d$ が単元なので $(p^iu,1)$ ($u\in O^\times$) と単元倍で規格化し、右から $\operatorname{diag}(u^{-1},1)$ を掛けると $(p^i,1)$ になります。

$i=n$ なら $d$ が単元で $(t,1)$ ($t\in p^nO$) に規格化でき、右から $\begin{pmatrix}1&0\\-t&1\end{pmatrix}$ を掛けると $(0,1)$ になります。使った右乗算はすべて $K_0(p^n)$ に属します。各行は主張の代表の第二行であり、番号の不変性により互いに異なる類です。
<!-- proof-end -->

次に各類に値を自由に置けるかを調べます。左変換と右不変を同時に課すため、代表を動かさない左作用に対して指標が自明でなければなりません。

<a id="thm-afr15-principal-conductor"></a>

<!-- formal-statement-start -->
> **定理（主系列の導手と固定空間）**
> 局所定数な乗法指標 $\chi_1,\chi_2:F^\times\to\mathbb C^\times$ に対し $r_j=a(\chi_j)$ とする。正規化主系列 $I=I(\chi_1,\chi_2)$ について、全ての $n\ge0$ で
$$
\dim I^{K_1(p^n)}=\max(0,n-r_1-r_2+1).
$$
> 従って $a(I)=r_1+r_2$ で、最小レベルの固定空間は一次元である。
<!-- formal-statement-end -->

### 証明の見取り図

代表 $k_i$ での値が非零になれる条件を、上三角行列を共役して求めます。二つの指標の導手が許す整数 $i$ の個数が次元です。

<!-- proof-start -->
### 証明

$n=0$ の場合は [主系列の球固定空間](../AFR13/index.md#thm-afr13-spherical) により、両方が不分岐なら1、そうでなければ0となり公式と一致します。以下 $n\ge1$ とします。

[レベル二重剰余類](#thm-afr15-orbits) の代表 $k_i$ に対して $S_i=D\cap k_iK_1(p^n)k_i^{-1}$ と置きます。$d_0\in S_i$ なら $d_0k_i=k_ih$ ($h\in K_1(p^n)$) なので
$$
\lambda(d_0)f(k_i)=f(d_0k_i)=f(k_ih)=f(k_i).
$$
従って非零の値を置ける必要条件は $\lambda|_{S_i}=1$ です。逆にこの条件が成立すれば $f(dk_ih)=\lambda(d)t_i$ と定義できます。二つの表示が等しければ $d_2^{-1}d_1=k_ih_2h_1^{-1}k_i^{-1}\in S_i$ なので値は一致します。他の類では零または同様に独立な値を指定できます。

この関数を $K$ から $G$ へ $f(bk)=\lambda(b)f(k)$ で拡張します。[局所三角分解](../AFR13/index.md#thm-afr13-bk) で表示の差は $D$ に属し、左変換則が値の一致を保証します。右 $K_1(p^n)$ 不変なので主合同部分群 $K_n$ でも不変で、主系列の条件を満たします。従って条件を満たす類につき自由度はちょうど1です。

$d_0=\begin{pmatrix}a&b\\0&d\end{pmatrix}\in D$ とします。$1\le i<n$ では $q=p^i$ と書けば
$$
k_i^{-1}d_0k_i
=\begin{pmatrix}a+bq&b\\q(d-a-bq)&d-bq\end{pmatrix}.
$$
右下成分の条件は $d-bq\equiv1\bmod p^n$、左下成分の条件は $d-a-bq\equiv0\bmod p^{n-i}$ です。両条件から
$$
d\in1+p^iO,\qquad a\in1+p^{n-i}O.
$$
逆に任意のこのような $a,d$ に対し $b=(d-1)/q\in O$ と選べば、右下は1、左下は $q(1-a)\in p^nO$ です。従って二つの対角成分は上記の範囲を独立に動けます。

$i=0$ では共役は $\begin{pmatrix}d&0\\-b&a\end{pmatrix}$ となり $a\in1+p^nO$、$b\in p^nO$、$d\in O^\times$ です。$i=n$ では共役は元の行列で $a\in O^\times$、$d\in1+p^nO$ です。両端も含め、対角成分の範囲は $a\in U_{n-i}$、$d\in U_i$ です。

$\lambda(d_0)=\chi_1(a)\chi_2(d)$ なので、片方を1にして調べれば $\lambda|_{S_i}=1$ は $\chi_1|_{U_{n-i}}=1$ かつ $\chi_2|_{U_i}=1$ と同値です。[導手指数と新ベクトル](#def-afr15-conductor) の定義からこれは
$$
r_2\le i\le n-r_1
$$
と同値です。範囲が空なら次元は0、空でなければ整数の個数は $n-r_1-r_2+1$ です。最初の非零レベルは $n=r_1+r_2$、そのとき $i=r_2$ だけが残ります。
<!-- proof-end -->

例えば $p=3$、$\chi_1=\eta$、$\chi_2=1$ とすると $r_1=1,r_2=0$ です。レベル0,1,2,3で次元は順に0,1,2,3です。レベル1では $k_0$ の類だけに値を置けるので、$f(k_0)=1$、他の類で零とすれば新ベクトルが具体的に得られます。

## 4. Whittaker模型：加法方向の係数

[Whittaker係数を扱う前講](../AFR4/index.md) では実変数の Fourier 係数を調べました。局所表現でも加法方向の変換則を持つ係数を抽出します。

$n(x)=\begin{pmatrix}1&x\\0&1\end{pmatrix}$ とし、$\psi:F\to\mathbb C^\times$ を加法指標、すなわち $\psi(x+y)=\psi(x)\psi(y)$ を満たす局所定数な絶対値1の関数で、$O$ 上自明、$p^{-1}O$ 上非自明なものとします。例えば $p$ 進数の負の桁の有限和を $\{x\}_p$ とすると $\psi(x)=\exp(2\pi i\{x\}_p)$ が使えます。足し算の繰り上がりによる差 $\{x+y\}_p-\{x\}_p-\{y\}_p$ は整数なので、指数関数の積の公式から $\psi(x+y)=\psi(x)\psi(y)$ です。

<a id="def-afr15-whittaker"></a>

<!-- formal-statement-start -->
> **定義（Whittaker汎関数と模型）**
> 滑らかな複素表現 $(\pi,V)$ と非自明な加法指標 $\psi$ を考える。非零の線形汎関数 $\ell:V\to\mathbb C$ が
$$
\ell(\pi(n(x))v)=\psi(x)\ell(v)
$$
> を全ての $x\in F,v\in V$ で満たすものとする。この条件を満たす非零の線形汎関数を **Whittaker汎関数** と呼ぶ。そのような汎関数を持つ表現を generic（ジェネリック）と呼ぶ。$W_v(g)=\ell(\pi(g)v)$ として得られる関数の空間を Whittaker 模型と呼ぶ。既約表現の場合には次の命題により元の表現と同型になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr15-whittaker -->
**定義の確認**

加法群の例として、局所定数な関数 $\phi:F\to\mathbb C$ で台がコンパクトなものを取り、$(T(y)\phi)(x)=\phi(x+y)$ とします。$\ell_0(\phi)=\int_F\phi(x)\psi(-x)\,dx$ とすると、変数 $z=x+y$ により
$$
\ell_0(T(y)\phi)=\int_F\phi(z)\psi(y-z)\,dz=\psi(y)\ell_0(\phi).
$$
$\phi=1_O$ の場合は $\psi|_O=1$ で、$\operatorname{vol}(O)=1$ と規格化すると $\ell_0(1_O)=1$ です。これは加法群での変換則の直接例です。次節で主系列全体に対して同じ条件を満たす汎関数を構成します。
<!-- definition-example-end -->

<a id="prop-afr15-model"></a>

<!-- formal-statement-start -->
> **命題（Whittaker関数の変換則）**
> Whittaker 汎関数 $\ell$ を持つ滑らかな複素表現 $(\pi,V)$ に対して
$$
W_v(n(x)g)=\psi(x)W_v(g),\qquad
W_{\pi(h)v}(g)=W_v(gh).
$$
> $v\in V^{K_1(p^n)}$ なら $W_v(gk)=W_v(g)$ ($k\in K_1(p^n)$) である。さらに $V$ が既約なら $v\mapsto W_v$ は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

左の加法変換は汎関数の条件、右変換は表現の積の条件から従います。核は不変部分空間なので既約性が単射性を与えます。

<!-- proof-start -->
### 証明

定義から
$$
W_v(n(x)g)=\ell(\pi(n(x))\pi(g)v)=\psi(x)\ell(\pi(g)v).
$$
また $W_{\pi(h)v}(g)=\ell(\pi(g)\pi(h)v)=\ell(\pi(gh)v)$ です。$k$ が $v$ を固定するなら後者は $W_v(gk)=W_v(g)$ を与えます。

核は全ての $g$ について $\ell(\pi(g)v)=0$ となるベクトルの空間です。右変換の式から核は $G$ 不変です。$\ell\ne0$ なので $\ell(v)\ne0$ となる $v$ があり $W_v(I_2)\ne0$ です。従って核は全体ではありません。既約なら核は零です。
<!-- proof-end -->

## 5. 主系列上で汎関数を実際に作る

加法 Haar 測度は [p進加法Haar測度の規格化](../AFR9/index.md#prop-afr9-local-measure) に従い $O$ の体積を1とします。無限領域の積分を無条件に収束すると考えるのではなく、有限半径で切った積分の値が最後には変化しなくなることを示します。

<a id="thm-afr15-jacquet"></a>

<!-- formal-statement-start -->
> **定理（主系列の安定Whittaker積分）**
> $I(\chi_1,\chi_2)$ を局所定数な乗法指標による正規化主系列とし、$\psi$ は $O$ 上自明、$p^{-1}O$ 上非自明な加法指標とする。$w=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ と置くと
$$
\ell(f)=\lim_{M\to\infty}\int_{p^{-M}O}f(wn(x))\psi(-x)\,dx
$$
> は各 $f$ に対して有限段以降一定となる極限で定まり、非零の Whittaker 汎関数である。
<!-- formal-statement-end -->

### 証明の見取り図

大きな $x$ では上三角行列と単位行列に近い行列の積に分解できます。十分遠い殻では指標の値が小さな平行移動で変わらず、加法指標だけが変化するため積分が零になります。

<!-- proof-start -->
### 証明

$x\ne0$ について
$$
wn(x)=\begin{pmatrix}0&-1\\1&x\end{pmatrix}
=\begin{pmatrix}x^{-1}&-1\\0&x\end{pmatrix}
\begin{pmatrix}1&0\\x^{-1}&1\end{pmatrix}.
$$
$f$ はある主合同部分群 $K_j$ で右不変です。$|x|_p=p^m$ で $m\ge j$ なら第二因子は $K_j$ の元です。主系列の変換則から
$$
f(wn(x))=|x|_p^{-1}\chi_1(x^{-1})\chi_2(x)f(I_2).
$$
$r=\max(1,a(\chi_1),a(\chi_2))$ とします。$\psi(y)\ne1$ となる $y\in p^{-1}O$ を選びます。$m\ge\max(j,r+1)$ では $v_p(y/x)\ge m-1\ge r$ です。従って $1+y/x\in U_r$ なので両乗法指標の値は $x$ を $x+y$ に置き換えても変わりません。絶対値も変わらず、平行移動は殻 $|x|_p=p^m$ をそれ自身へ写します。

殻の積分を $J_m$ とすれば測度の平行移動不変性により
$$
J_m=\int_{|x|_p=p^m}f(wn(x+y))\psi(-x-y)\,dx
=\psi(-y)J_m.
$$
$\psi(-y)\ne1$ なので $J_m=0$ です。各有限球はコンパクトであり、被積分関数は各点の近傍で一定なので有限個の値しか取らず、積分が定まります。十分大きい $M$ では外側の殻の寄与が零になるため極限が存在します。共通の十分大きい $M$ を選べるので線形です。

$\pi(n(t))f$ に対して $x+t=z$ と置換します。十分大きい $M$ なら $t\in p^{-M}O$ なので積分領域は変わらず、
$$
\int_{p^{-M}O}f(wn(x+t))\psi(-x)\,dx
=\psi(t)\int_{p^{-M}O}f(wn(z))\psi(-z)\,dz.
$$
極限で $\ell(\pi(n(t))f)=\psi(t)\ell(f)$ です。

最後に非零性を示します。$K$ の行列 $k=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ について、$c$ が単元なら
$$
k=\begin{pmatrix}\det(k)/c&a\\0&c\end{pmatrix}wn(d/c).
$$
そこで $c$ が単元のとき $\phi(k)=\chi_1(\det(k)/c)\chi_2(c)$、そうでないとき $\phi(k)=0$ と定めます。左から $D$ の元（対角成分 $u,v$）を掛けると $c$ は $vc$、行列式は $uv\det(k)$ になるので $\phi$ は $\chi_1(u)\chi_2(v)$ 倍になります。$c$ の単元性も不変です。

十分大きな $j$（例えば $j\ge r$）で $k'$ が $k$ と法 $p^j$ で一致すれば単元性と単元の指標値が一致するため、$\phi$ は右 $K_j$ 不変です。[局所三角分解](../AFR13/index.md#thm-afr13-bk) により $f(b_0k)=\lambda(b_0)\phi(k)$ と一意に拡張できます（表示の差は $D$ で、左変換則が値を一致させます）。

$x\in O$ なら $wn(x)\in K$、その $c=1$、行列式は1なので $f(wn(x))=1$ です。$x\notin O$ なら冒頭の分解の第二因子の左下成分 $x^{-1}$ は非単元なので $f(wn(x))=0$ です。従ってこの $f$ について
$$
\ell(f)=\int_O\psi(-x)\,dx=1.
$$
これで非零性も示されました。
<!-- proof-end -->

$p=3,\chi_1=\eta,\chi_2=1$ の場合には、この最後の $f$ がレベル1の新ベクトルそのものです。

実際 $k\in K$ の左下成分が単元である条件は右 $K_1(3)$ 乗算で不変で、行列式と左下成分の比は法3で変わりません。

後者について $h\in K_1(3)$ の左上成分を $u$ とすると、積の左下成分は法3で $cu$、行列式は法3で $u\det k$ なので比が一致します。

従って $f$ は右 $K_1(3)$ 不変であり、$f(w)=1$ です。[主系列の導手と固定空間](#thm-afr15-principal-conductor) により最小レベルの非零元です。

対応する $W_f(I_2)=1$ が直接得られます。

## 6. 一般の局所表現では何が言えるか

本講で証明した固定空間の次元公式と汎関数の存在は正規化主系列に対するものです。一般の既約許容的な滑らかな generic 表現に対しては Casselman の局所新形式定理が、有限の最小レベルの存在、最小レベルでの一次元性、およびレベル $n$ での次元 $\max(0,n-a(\pi)+1)$ を与えます。Whittaker 汎関数のスカラー倍を除いた一意性は別の一般定理です。これらを主系列の証明だけで一般化することはできません。特に、分岐した一次元表現の例は generic ではなく、新形式定理の仮定から外れています（$n(x)$ は行列式1なので恒等作用となり、非自明な $\psi$ に対する汎関数は零しかありません）。

ここでは一般定理の適用範囲を把握し、主系列では二重剰余類の計算と安定積分で核心を自力再現することを目標とします。一般定理の証明には本講で扱わない局所表現論を要します。原典は W. Casselman, *On some results of Atkin and Lehner*, Math. Ann. 201 (1973), 301–314。定理の記述と非超尖点表現については [Lansky–Raghuram, Conductors and newforms for SL(2)](https://msp.org/pjm/2007/231-1/pjm-v231-n1-p08-p.pdf) の導入部も参照できます。

次講では各素点の局所ベクトルを組み合わせます。不分岐素点では球ベクトル、分岐素点では適切なレベルのベクトルを選ぶ、という区別が大域的なレベルを理解する鍵になります。

## 7. 演習と詳細解答

<a id="ex-afr15-a1"></a>

### A1. レベルの判定

$p=3$ とし、$k=\begin{pmatrix}2&1\\9&4\end{pmatrix}$ が $K_0(9),K_1(9),K_1(3)$ のそれぞれに属するか判定せよ。

- Level: A
- ID: AFR15-A1

<!-- solution-start -->
**詳細解答**

行列式は $8-9=-1$ なので $k\in K$ です。[レベル部分群](#def-afr15-level) の条件から左下は9なので $K_0(9)$ に属します。右下は4で $4-1=3$ は9の倍数でないので $K_1(9)$ には属しません。一方 $9,4-1$ はともに3の倍数なので $K_1(3)$ に属します。
<!-- solution-end -->

<a id="ex-afr15-a2"></a>

### A2. 指標の導手

$p=5$ で $\chi(5^mu)=2^m\epsilon(u\bmod5)$ とする。ただし $\epsilon(1)=\epsilon(4)=1,\epsilon(2)=\epsilon(3)=-1$ とする。指標であることと導手指数を確認せよ。

- Level: A
- ID: AFR15-A2

<!-- solution-start -->
**詳細解答**

法5の単数は2の冪 $1,2,4,3$ であり、$\epsilon(2^j)=(-1)^j$ です。2の位数は4、$(-1)^4=1$ なので剰余群上の乗法指標です。$5^mu$ の分解の一意性と指数の加法性から $\chi$ も乗法指標になります。$1+5O$ 上で1なので局所定数です。$\chi(2)=-1$ なので単数群上は非自明です。[導手指数と新ベクトル](#def-afr15-conductor) により $a(\chi)=1$ です。
<!-- solution-end -->

<a id="ex-afr15-a3"></a>

### A3. 軌道番号

$p=3,n=3$ のとき、第二行が $(6,1)$ の $K$ の行列はどの代表 $k_i$ の類に入るか。第二行を代表へ移す右乗算を一つ示せ。

- Level: A
- ID: AFR15-A3

<!-- solution-start -->
**詳細解答**

$v_3(6)=1$ なので [レベル二重剰余類](#thm-afr15-orbits) の番号は $i=1$ です。右から $\operatorname{diag}(1/2,1)$ を掛ければ第二行は $(3,1)$ になります。この行列は単元の対角行列で $K_0(27)$ に属し、右下が1なので $K_1(27)$ にも属します。第二行が一致した行列同士の差は左の $D$ 作用で吸収されます。
<!-- solution-end -->

<a id="ex-afr15-a4"></a>

### A4. 初めて現れる段

$a(\chi_1)=2,a(\chi_2)=1$ の正規化主系列の導手とレベル0から5までの固定空間の次元を求めよ。

- Level: A
- ID: AFR15-A4

<!-- solution-start -->
**詳細解答**

[主系列の導手と固定空間](#thm-afr15-principal-conductor) により $a(I)=2+1=3$ なので導手は $p^3O$ です。次元は $\max(0,n-2)$ であり $n=0,1,2,3,4,5$ では $0,0,0,1,2,3$ です。レベル3では許される番号は $1\le i\le3-2=1$ なので $k_1$ の類だけです。
<!-- solution-end -->

<a id="ex-afr15-b1"></a>

### B1. 共役で固定条件を調べる

$p=3,n=3,i=1$ とする。$b_0=\begin{pmatrix}a&b\\0&d\end{pmatrix}\in D$ に対し $k_i^{-1}b_0k_i\in K_1(27)$ となる対角成分の可能な範囲を求め、任意のその範囲の対角成分が実現することを示せ。

- Level: B
- ID: AFR15-B1

<!-- solution-start -->
**詳細解答**

$k_i=\begin{pmatrix}1&0\\3&1\end{pmatrix}$ なので積は
$$
k_i^{-1}b_0k_i=\begin{pmatrix}a+3b&b\\3(d-a-3b)&d-3b\end{pmatrix}.
$$
[レベル部分群](#def-afr15-level) の条件は $d-3b\equiv1\bmod27$ と $d-a-3b\equiv0\bmod9$ です。従って $d\equiv1\bmod3$、$a\equiv1\bmod9$ です。逆にこの二条件を満たす $a,d$ を任意に選び $b=(d-1)/3$ とすると右下は1、左下は $3(1-a)\in27O$ です。$a,d$ は単元なので共役前も後も可逆で、任意の対角成分が実現しました。
<!-- solution-end -->

<a id="ex-afr15-b2"></a>

### B2. 導手の差と中心指標

$a(\chi_1)=2,a(\chi_2)=2$、$\chi_2=\chi_1^{-1}$ の正規化主系列を考える。中心指標の導手指数と表現の導手指数を求め、中心指標だけから表現の導手を決められないことを示せ。

- Level: B
- ID: AFR15-B2

<!-- solution-start -->
**詳細解答**

スカラー行列 $zI_2$ は中心にあるので、主系列の変換則から
$$
(\pi(zI_2)f)(g)=f(zI_2g)=\chi_1(z)\chi_2(z)f(g)=f(g).
$$
従って中心指標は自明で導手指数0です。一方 [主系列の導手と固定空間](#thm-afr15-principal-conductor) から表現の導手指数は4です。両指標が自明な主系列でも中心指標は自明ですが表現の導手指数は0です。[レベルと中心指標](#prop-afr15-central-level) の必要条件だけでは最小レベルは決まらないことが分かります。
<!-- solution-end -->

<a id="ex-afr15-b3"></a>

### B3. Whittaker関数の台の制約

$\psi$ は $O$ 上自明、$p^{-1}O$ 上非自明とする。$W_v$ が Whittaker 関数で $v$ は $K_1(p^n)$ 固定とする。$y\in F^\times$ で $v_p(y)<0$ なら $W_v(\operatorname{diag}(y,1))=0$ であることを示せ。

- Level: B
- ID: AFR15-B3

<!-- solution-start -->
**詳細解答**

任意の $t\in O$ に対し $n(t)\in K_1(p^n)$ です。$a_y=\operatorname{diag}(y,1)$ とすると行列積から
$$
a_y n(t)=\begin{pmatrix}y&yt\\0&1\end{pmatrix}=n(yt)a_y.
$$
[Whittaker関数の変換則](#prop-afr15-model) により
$$
W_v(a_y)=W_v(a_y n(t))=\psi(yt)W_v(a_y).
$$
$v_p(y)<0$ なら $yO$ は $p^{-1}O$ を含みます。$\psi(z)\ne1$ となる $z\in p^{-1}O$ を取り $t=z/y\in O$ とすれば $\psi(yt)\ne1$ です。従って $W_v(a_y)=0$ です。
<!-- solution-end -->

<a id="ex-afr15-c1"></a>

### C1. 分岐主系列から新ベクトルと係数を構成する

$p=3$、$\chi_1=\eta$（単数の法3剰余で符号を取る指標で $\eta(3)=1$）、$\chi_2=1$ とする。$K$ 上の関数
$$
\phi\left(\begin{pmatrix}a&b\\c&d\end{pmatrix}\right)=
\begin{cases}\eta(\det k/c)& c\in O^\times,\\0& c\notin O^\times\end{cases}
$$
から主系列の新ベクトルを構成せよ。左変換則、右不変性、最小性を示し、安定 Whittaker 積分の値を求めよ。

- Level: C
- ID: AFR15-C1

<!-- solution-start -->
**詳細解答**

左から $b_0=\begin{pmatrix}u&z\\0&v\end{pmatrix}\in D$ を掛けると左下成分は $vc$、行列式は $uv\det k$ です。$v$ は単元なので $c$ の単元性は変わりません。単元の場合は比が $u\det k/c$ となるため
$$
\phi(b_0k)=\eta(u)\phi(k)=\lambda(b_0)\phi(k).
$$
非単元の場合も両辺零です。[局所三角分解](../AFR13/index.md#thm-afr13-bk) により $f(b_0k)=\lambda(b_0)\phi(k)$ と拡張できます。二表示の差は $D$ にあり、今確認した変換則で値が一致します。

$h=\begin{pmatrix}u&z\\3t&v\end{pmatrix}\in K_1(3)$ なら $v\equiv1\bmod3$、$u$ は単元です。$kh$ の左下成分は $cu+3dt$ で法3では $cu$、行列式は $\det k\det h\equiv u\det k\bmod3$ です。従って左下の単元性は保たれ、単元の場合の比は法3で $\det k/c$ と等しいので $\phi(kh)=\phi(k)$ です。右不変性は拡張した $f$ にも従います。特に主合同部分群 $K_1$ で不変であり主系列の元です。

$w=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ に対して $c=1,\det w=1$ なので $f(w)=1$ です。[主系列の導手と固定空間](#thm-afr15-principal-conductor) で $r_1=1,r_2=0$ とすれば最小レベルは1で次元は1です。よって $f$ は新ベクトルです。

$x\in O$ なら $wn(x)\in K$ で左下成分と行列式はともに1なので $f(wn(x))=1$ です。$x\notin O$ なら [主系列の安定Whittaker積分](#thm-afr15-jacquet) の分解で右の行列の左下成分は $x^{-1}\in3O$ なので値は零です。従って積分は
$$
\ell(f)=\int_O\psi(-x)\,dx=1.
$$
これは $W_f(I_2)=1$ を意味します。固定ベクトルの具体的構成と加法方向の係数の規格化が両立しました。
<!-- solution-end -->

<a id="ex-afr15-c2"></a>

### C2. 分岐と generic を混同しない

$p=3$ の一次元表現 $\pi(g)=\eta(\det g)$（$\eta(3^mu)$ は $u\bmod3$ が1なら1、2なら $-1$ とする）を考える。滑らかさ、許容性、既約性、レベル固定空間、および非自明な $\psi$ に対する Whittaker 汎関数の存在を判定せよ。

- Level: C
- ID: AFR15-C2

<!-- solution-start -->
**詳細解答**

主合同部分群 $K_1$ の行列式は法3で1なので $\eta(\det k)=1$ です。全ベクトルがこの開部分群で固定されるため [p進群の滑らかな表現](../AFR13/index.md#def-afr13-smooth) の条件を満たします。一次元空間の固定部分空間は次元0または1なので [p進表現の許容性](../AFR13/index.md#def-afr13-admissible) を満たし、非零一次元空間なので既約です。

$\operatorname{diag}(2,1)$ は全レベルの $K_1(3^n)$ に含まれ、作用は $\eta(2)=-1$ です。固定条件 $-v=v$ から $v=0$ です。従ってすべてのレベルで固定空間は零であり、新ベクトルはありません。

$n(x)$ の行列式は1なので $\pi(n(x))$ は恒等です。[Whittaker汎関数と模型](#def-afr15-whittaker) の条件は $\ell(v)=\psi(x)\ell(v)$ になります。$\psi(x)\ne1$ となる $x$ を選ぶと全ての $v$ に対して $\ell(v)=0$ です。従って generic ではありません。滑らか・許容的・既約という三条件を満たしても generic の仮定を省略して一般の新形式定理を適用することはできません。
<!-- solution-end -->
