# SYZ1-03 較正形式と体積最小性

<!-- definition-example-audit: strict -->

## 1. Lagrangeであるだけでは長さ・面積を比較できない

前講では[閉1形式のグラフとLagrange条件](../SYZ1-02/index.md#prop-syz1-02-infinitesimal-closed)を調べた。しかし、シンプレクティック形式が接空間上で消えることだけでは、その部分多様体の**体積が最小かどうか**は決まらない。体積にはRiemann計量が必要である。SYZで必要になる特殊Lagrange部分多様体は、Lagrange性に加えて、向き付き接平面上である閉形式が体積形式に一致するという強い条件を持つ。

この講義の道筋は次の通りである。まず向き付き接平面で微分形式の大きさを測る道具を導入し、点ごとの評価を閉形式の積分に変換する。最後に複素行列式を実際に評価し、特殊Lagrange較正の核心を証明する。位相を含む一般のグラフ方程式は次講で扱う。

以下、断らない限り実多様体、計量、微分形式は滑らかとする。$M$ は向きが必要な場合に向きを指定するRiemann多様体で、$1\le k\le\dim M$ とする。

## 2. comass：単位接平面で形式がどれだけ大きいか

$k$ 個の接ベクトルを並べて作る向き付き $k$ 次元接平面には、計量から長さ1の体積単位が定まる。具体的にはその平面の正の向きに沿う正規直交基底 $(v_1,\ldots,v_k)$ を選ぶ。交代 $k$ 形式 $\varphi_p$ の値 $\varphi_p(v_1,\ldots,v_k)$ は、正の向きを保つ正規直交基底の取り替えで変わらない。したがって、形式と接平面を比較できる。

形式の **comass** は、この絶対値をすべての単位 $k$ 平面で最大化した量である。向きを反転すると符号が反転するため、定義には絶対値を入れる。

<a id="def-syz1-03-comass"></a>

<!-- formal-statement-start -->
> **定義（comass）**  
> $(M,g)$ をRiemann多様体、$\varphi$ を $M$ 上の実 $k$ 形式、$p\in M$ とする。点 $p$ でのcomassを
>
> $$
> \|\varphi_p\|_*=\sup\{|\varphi_p(v_1,\ldots,v_k)|:\ g_p(v_i,v_j)=\delta_{ij}\}
> $$
>
> と定める。上限は $T_pM$ のすべての正規直交 $k$ 組について取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-03-comass -->
### 直接例：平面への射影でcomassを計算する

**定義の確認**：$\mathbb R^3$ のEuclid計量と $\varphi=dx\wedge dy$ を考える。正規直交な二つのベクトル $u,v$ に対して

$$
\varphi(u,v)=u_xv_y-u_yv_x=(u\times v)_z.
$$

外積 $u\times v$ の長さは1なので $|\varphi(u,v)|\le1$。$u=e_x,v=e_y$ では値1を取るため $\|\varphi_p\|_*=1$ である。さらに $u\times v=\pm e_z$ のときだけ絶対値が1になる。**数値1は定義の上限を達成する値**であり、任意の斜め平面で自動的に達成されるわけではない。
<!-- definition-example-end -->

この例で $d\varphi=0$ であることも $d(dx\wedge dy)=0$ から分かる。次に、comassが1以下であり、かつ閉じている形式を使う。

## 3. 較正形式と較正された接平面

ある $k$ 形式が各単位接平面で「面積を超えない」だけでなく、閉形式であるとする。このとき接平面で等号が成立する部分多様体では、形式の積分が体積と一致し、別の部分多様体との比較に使える。

<a id="def-syz1-03-calibration"></a>

<!-- formal-statement-start -->
> **定義（較正形式と較正部分多様体）**  
> $(M,g)$ をRiemann多様体、$\varphi$ を $M$ 上の実 $k$ 形式とする。$d\varphi=0$ かつ全ての $p\in M$ で $\|\varphi_p\|_*\le1$ なら、$\varphi$ を **較正形式** と呼ぶ。向き付き埋め込み $k$ 次元部分多様体 $L\subset M$ が、各 $p\in L$ の正の向きの正規直交接基底 $(e_1,\ldots,e_k)$ について
>
> $$
> \varphi_p(e_1,\ldots,e_k)=1
> $$
>
> を満たすとき、$L$ は $\varphi$ によって **較正されている** という。これは $\varphi|_L=\operatorname{vol}_{L}$ と同値である。
<!-- formal-statement-end -->

ここで $\operatorname{vol}_{L}$ は、$g$ の制限と **指定した向き** による体積形式である。comassは絶対値で測るが、較正条件は $+1$ であり、$-1$ ではない。

<!-- definition-example-start: def-syz1-03-calibration -->
### 直接例：水平平面と向きの反転

**定義の確認**：$M=\mathbb R^3$、$g$ をEuclid計量、$\varphi=dx\wedge dy$ とする。前節でcomassは1と確認し、$d\varphi=0$ も確認した。$L_c=\{z=c\}$ を $(\partial_x,\partial_y)$ の向きで取れば、埋め込み二次元、誘導計量は $dx^2+dy^2$、誘導体積形式は $dx\wedge dy$ である。従って $\varphi|_{L_c}=\operatorname{vol}_{L_c}$ である。

同じ平面を逆向き $(\partial_y,\partial_x)$ にすると $\varphi(\partial_y,\partial_x)=-1$。comassと閉性は変わらないが、この向きの $L_c$ は $\varphi$ では較正されない。向きは飾りではなく等号条件の一部である。
<!-- definition-example-end -->

別の例として $\mathbb R^2$ 上の $\varphi=(3\,dx+4\,dy)/5$ は長さ1の閉1形式であり、接方向 $(3,4)/5$ を正に向けた直線を較正する。$k=1$ でも同じ定義が働く。

## 4. 閉形式の積分が体積の下界になる

体積を最小化する相手は、**向き付きで同じホモロジー類に属する部分多様体**である。ここでは、コンパクトで境界のない向き付き $k$ 次元部分多様体 $L,N$ が同じ実ホモロジー類を表すとは、両者の差がある向き付き $(k+1)$ 次元鎖 $C$ の境界 $\partial C=L-N$ と書けることをいう。鎖への積分に対して[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)が使える状況を考える。

<a id="thm-syz1-03-volume-minimization"></a>

<!-- formal-statement-start -->
> **定理（較正された部分多様体の体積最小性）**  
> $(M,g)$ をRiemann多様体、$\varphi$ をその上の閉じた実 $k$ 形式とし、全点で次のcomass条件を仮定する。
>
> $$
> \|\varphi_p\|_*\le1\qquad(p\in M).
> $$
>
> $L$ をコンパクト・境界なし・向き付きの埋め込み $k$ 次元部分多様体とし、次の較正等号を仮定する。
>
> $$
> \varphi|_L=\operatorname{vol}_L.
> $$
>
> $N$ を同じ次元のコンパクト・境界なし・向き付きの部分多様体とし、$[N]=[L]$（同じ実ホモロジー類）を仮定する。このとき
>
> $$
> \operatorname{Vol}_g(L)\le\operatorname{Vol}_g(N).
> $$
>
> $N$ の全点でも $\varphi|_N=\operatorname{vol}_N$ が成り立てば等号である。逆に等号が成立すれば、連続な接平面評価のもとでは各点でこの較正等号が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

**点ごとの不等式**と**位相的な等式**を分ける。comassより $N$ 上で $\varphi|_N\le\operatorname{vol}_N$ が成り立つ。閉性と $L-N=\partial C$ から $\int_L\varphi=\int_N\varphi$。$L$ での較正等号と結べばよい。

<!-- proof-start -->
### 証明

$N$ の各点 $p$ で正の向きの正規直交接基底 $(e_1,\ldots,e_k)$ を選ぶ。$\varphi_p(e_1,\ldots,e_k)\le|\varphi_p(e_1,\ldots,e_k)|\le1$ だから、関数 $a(p)=\varphi_p(e_1,\ldots,e_k)$ によって $\varphi|_N=a\,\operatorname{vol}_N$、$a\le1$ と書ける。従って

$$
\int_N\varphi=\int_N a\,\operatorname{vol}_N
\le\int_N\operatorname{vol}_N=\operatorname{Vol}_g(N).
$$

一方、ホモロジーの仮定 $L-N=\partial C$ と閉性 $d\varphi=0$ に[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を適用すると

$$
\int_L\varphi-\int_N\varphi
=\int_{\partial C}\varphi
=\int_C d\varphi=0.
$$

$L$ 上では $\varphi|_L=\operatorname{vol}_L$ なので、二つを合わせて

$$
\operatorname{Vol}_g(L)
=\int_L\varphi
=\int_N\varphi
\le\operatorname{Vol}_g(N).
$$

等号なら $\int_N(1-a)\operatorname{vol}_N=0$ である。$1-a$ は連続非負だから、もしある点で正ならその近傍で正の体積を持ち積分も正となる。よって全点で $a=1$ である。逆向きは $N$ の較正等号を積分すれば従う。
<!-- proof-end -->

**閉性がどこで必要だったか。** comassだけから得られるのは、各曲面についてその形式の積分が体積以下であるという評価にすぎない。$\int_L\varphi=\int_N\varphi$ は閉性から初めて出る。同じホモロジー類でない曲面にも体積最小性を主張することはできない。

### 具体例：平坦トーラスの斜め閉路

$T^2=(\mathbb R/\mathbb Z)^2$ に $dx^2+dy^2$ を入れる。$\varphi=(dx+dy)/\sqrt2$ は閉形式であり、正規直交枠で係数ベクトル $(1,1)/\sqrt2$ の長さが1だからcomassも1である。斜め閉路 $L(t)=([t],[t])$（$0\le t\le1$）は接ベクトル $(1,1)$ の速さが $\sqrt2$ で、$\varphi(\dot L)=\sqrt2$。従って弧長単位の接ベクトルに $\varphi$ は1を返す。$L$ は較正され、同じ向き付きホモロジー類 $(1,1)$ の閉曲線の中で長さ $\sqrt2$ が最小である。

## 5. 極小・安定・最小を区別する

変形 $L_t$ が $L_0$ と同じホモロジー類に留まれば、上の定理は各時刻の体積に対して $\operatorname{Vol}(L_t)\ge\operatorname{Vol}(L_0)$ を与える。滑らかな変形で体積が二回微分可能なら、$t=0$ で一階微分は0、二階微分は非負になる。一般に一階微分が0という**停留性（極小）**、二階変分が非負という**安定性**、同じホモロジー類全体での**大域的最小性**は論理的に別の条件である。

<a id="prop-syz1-03-stationary-stable"></a>

<!-- formal-statement-start -->
> **命題（較正と変分の関係）**  
> コンパクト・境界なしの向き付き部分多様体 $L$ が閉較正形式で較正されているとする。$L_0=L$ から出発する滑らかな向きを保つ埋め込み変形 $L_t$ を考える。その体積関数が二回微分可能であるとき、
>
> $$
> V(t)=\operatorname{Vol}(L_t),\qquad V'(0)=0,\qquad V''(0)\ge0.
> $$
>
> ただし $V''(0)>0$ は一般には従わない。
<!-- formal-statement-end -->

### 証明の見取り図

変形の軌跡は境界が $L_t-L_0$ の鎖を作る。したがって変形前後が同じホモロジー類であり、較正による体積比較を時刻ごとに適用できる。

<!-- proof-start -->
### 証明

$F:[-\epsilon,\epsilon]\times L\to M$ を向きを保つ変形の写像とする。$[0,t]\times L$ の像を向き付き鎖として取れば、$L$ が境界なしなのでその境界は $L_t-L_0$ である。ゆえに $[L_t]=[L_0]$。前定理から $V(t)\ge V(0)$。$t=0$ は内部の局所最小なので、二回微分可能な実関数の必要条件を適用して $V'(0)=0$、$V''(0)\ge0$。二階微分が厳密に正とは限らない。例えば平坦トーラスの水平閉路を平行移動した族は全て較正され、$V(t)$ が一定になる。
<!-- proof-end -->

**逆は成り立たない。** 単位球面 $S^2$ の赤道は測地線なので一階変分は0だが、緯度 $t$ の円の長さは $2\pi\cos t$。実際に

$$
\left.\frac{d}{dt}(2\pi\cos t)\right|_{t=0}=0,\qquad
\left.\frac{d^2}{dt^2}(2\pi\cos t)\right|_{t=0}=-2\pi<0.
$$

したがって赤道はこの変形に関して安定ですらない。**極小**という語を「同じホモロジー類で最短・最小」と読み替えてはいけない。

## 6. 複素体積形式が較正になる理由：線形代数

今度は $\mathbb C^n$ に、$z^j=x^j+i y^j$、Euclid計量

$$
g=\sum_{j=1}^n\bigl((dx^j)^2+(dy^j)^2\bigr),
\qquad \omega=\sum_{j=1}^n dx^j\wedge dy^j
$$

を入れる。$\omega$ は既習の[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)に使う標準シンプレクティック形式である。さらに **複素体積形式** $\Omega=dz^1\wedge\cdots\wedge dz^n$ を取る。これは[複素トーラスの正則最高次形式](../../CYG/CYG1-04/index.md#prop-cyg1-04-volume-form)の平坦空間でのモデルでもある。

実 $n$ 平面の正規直交基底を複素 $n$ 列ベクトルに並べれば、$\Omega$ の評価はその複素行列式になる。列の長さが1の行列の行列式の絶対値は1を超えない。この等号が、複素Hermitian内積で列が直交する条件、すなわちLagrange条件になることが核心である。

<a id="lem-syz1-03-complex-determinant"></a>

<!-- formal-statement-start -->
> **補題（複素行列式の不等式とLagrange等号条件）**  
> $\mathbb C^n$ に上記の $g,\omega,\Omega$ を入れ、$(v_1,\ldots,v_n)$ を実内積 $g$ に関する正規直交 $n$ 組とする。このとき
>
> $$
> |\Omega(v_1,\ldots,v_n)|\le1.
> $$
>
> 等号が成り立つことと、実 $n$ 平面 $P=\operatorname{span}_{\mathbb R}\{v_1,\ldots,v_n\}$ が $\omega|_P=0$ を満たすことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$A_{aj}=dz^a(v_j)$ と置くと $\Omega(v_1,\ldots,v_n)=\det_{\mathbb C}A$。複素Hadamard不等式の等号条件は列がHermitian直交すること。実部は既に $g(v_i,v_j)=\delta_{ij}$ だから、残る虚部だけが $\omega(v_i,v_j)$ と一致する。

<!-- proof-start -->
### 証明

複素列 $c_j=(dz^1(v_j),\ldots,dz^n(v_j))$ のHermitian内積を $\langle c_i,c_j\rangle_{\mathbb C}=\sum_a\overline{c_i^a}c_j^a$ と定義する。座標から直接展開すると

$$
\begin{aligned}
\operatorname{Re}\langle c_i,c_j\rangle_{\mathbb C}
&=\sum_a\bigl(dx^a(v_i)dx^a(v_j)+dy^a(v_i)dy^a(v_j)\bigr)
=g(v_i,v_j),\\
\operatorname{Im}\langle c_i,c_j\rangle_{\mathbb C}
&=\sum_a\bigl(dx^a(v_i)dy^a(v_j)-dy^a(v_i)dx^a(v_j)\bigr)
=\omega(v_i,v_j).
\end{aligned}
$$

従って各列のHermitianノルムは $\|c_j\|^2=g(v_j,v_j)=1$。列へのGram–Schmidt直交化（あるいは複素Hadamard不等式）を適用すると

$$
|\Omega(v_1,\ldots,v_n)|
=|\det_{\mathbb C}A|
\le\prod_{j=1}^n\|c_j\|=1.
$$

等号は列 $c_1,\ldots,c_n$ が互いにHermitian直交するとき、かつそのときに限り成立する。ここで $i\ne j$ に対して実部は正規直交性から既に0なので、Hermitian直交性は $\omega(v_i,v_j)=0$ と同値。$\omega$ の交代性により対角成分も0だから、これは $\omega|_P=0$ と等価である。
<!-- proof-end -->

### 直接計算：Lagrangeでない平面は等号を失う

$n=2$ とし、$v_1=\partial_{x^1}$、$v_2=(\partial_{y^1}+\partial_{x^2})/\sqrt2$ とする。二つは実正規直交だが

$$
\omega(v_1,v_2)=\frac{1}{\sqrt2}\ne0,\qquad
\Omega(v_1,v_2)
=\det\begin{pmatrix}1&i/\sqrt2\\0&1/\sqrt2\end{pmatrix}
=\frac{1}{\sqrt2}<1.
$$

つまり **実次元が半分**というだけでは複素体積形式の等号は成立しない。失われた仮定はLagrange性である。

## 7. 位相を選ぶと特殊Lagrange較正が現れる

$\theta\in\mathbb R$ を固定し、複素数 $e^{-i\theta}$ を掛けた $\Omega$ の実部を取る。$\Omega$ は定数係数の形式だから閉じており、その実部も閉じる。前節の不等式から、この実部はどの正規直交実 $n$ 組でも1を超えない。

<a id="thm-syz1-03-special-lagrangian-calibration"></a>

<!-- formal-statement-start -->
> **定理（平坦空間での特殊Lagrange較正）**  
> $\mathbb C^n$ にEuclid計量 $g$、$\omega=\sum_jdx^j\wedge dy^j$、$\Omega=dz^1\wedge\cdots\wedge dz^n$ を入れ、実数 $\theta$ を固定する。
>
> $$
> \varphi_\theta=\operatorname{Re}(e^{-i\theta}\Omega)
> $$
>
> は閉じたcomass 1 の実 $n$ 形式である。向き付き実 $n$ 次元の埋め込み部分多様体 $L\subset\mathbb C^n$ が $\varphi_\theta$ で較正されるための必要十分条件は、各点の正の向きの正規直交接基底 $(e_1,\ldots,e_n)$ について
>
> $$
> \omega|_{T_pL}=0,\qquad
> \Omega(e_1,\ldots,e_n)=e^{i\theta}
> $$
>
> が成り立つことである。このような $L$ を位相 $\theta$ の **特殊Lagrange部分多様体** と呼ぶ。
<!-- formal-statement-end -->

ここでは **向きと正値性**を含む条件を述べた。単に $\operatorname{Im}(e^{-i\theta}\Omega)|_L=0$ だけでは、実部が負の向きの平面も混ざる。一般のCalabi–Yau多様体上では $\Omega$ と計量の**点ごとの規格化**が必要であり、その仮定とグラフ方程式は次講で扱う。

### 証明の見取り図

複素数 $w$ について $\operatorname{Re}w\le|w|$。これを前補題の $|\Omega(e_1,\ldots,e_n)|\le1$ とつなぐ。両不等式で等号が成り立つ条件が、Lagrange性と位相の一致である。

<!-- proof-start -->
### 証明

$\Omega$ は定数係数だから $d\Omega=0$、従って $d\varphi_\theta=0$。任意の正規直交実 $n$ 組について

$$
\varphi_\theta(v_1,\ldots,v_n)
=\operatorname{Re}(e^{-i\theta}\Omega(v_1,\ldots,v_n))
\le|\Omega(v_1,\ldots,v_n)|\le1.
$$

向きを反転すれば左辺の符号も反転するので絶対値も1以下である。さらに複素線形な実座標回転 $v_j=e^{i\theta/n}\partial_{x^j}$ を取ると、$v_j$ は実正規直交、$\Omega(v_1,\ldots,v_n)=e^{i\theta}$、従って $\varphi_\theta(v_1,\ldots,v_n)=1$。よってcomassはちょうど1。

$L$ の正の向きの正規直交接基底で較正の等号が成立するなら、連鎖する二つの不等式がともに等号である。補題から $\omega|_{T_pL}=0$。さらに $e^{-i\theta}\Omega(e_1,\ldots,e_n)$ は絶対値1で実部1なので、複素数として1でなければならない。従って $\Omega(e_1,\ldots,e_n)=e^{i\theta}$。逆にこの二条件なら $\varphi_\theta(e_1,\ldots,e_n)=\operatorname{Re}1=1$ であり、定義どおり較正される。
<!-- proof-end -->

<!-- definition-example-start: thm-syz1-03-special-lagrangian-calibration -->
### 直接例：回転した実平面の位相を測る

**条件の確認**：$\mathbb C^2$ で $v_1=e^{ia}\partial_{x^1}$、$v_2=e^{ib}\partial_{x^2}$ が張る向き付き平面を考える。異なる複素座標軸の方向なので $g(v_i,v_j)=\delta_{ij}$、$\omega(v_1,v_2)=0$。さらに

$$
\Omega(v_1,v_2)=
\det\begin{pmatrix}e^{ia}&0\\0&e^{ib}\end{pmatrix}
=e^{i(a+b)}.
$$

この平面は $\theta\equiv a+b\pmod{2\pi}$ のとき較正される。$\theta$ を変えて虚部だけ0にした場合、$a+b-\theta=\pi$ なら実部は $-1$ であり較正ではない。
<!-- definition-example-end -->

本節の「特殊」は、**閉形式による体積最小性という幾何的結論**につながる言葉である。ただし定理4のコンパクト境界なし・同一ホモロジーという条件を、非コンパクトな全平面へそのまま適用してはいけない。平坦なグラフや平面のコンパクト部分では、同じ境界を持ち差が鎖の境界になる競合曲面に対して同様のStokes計算を行える。

## 8. 演習：較正を自分の手で判定する

### Level A：定義と向きを数値で確かめる

<a id="ex-syz1-03-a01"></a>

#### SYZ1-03-A01 一次形式のcomass

- Level: A

$\mathbb R^2$ のEuclid計量で $\alpha=(3\,dx+4\,dy)/5$ のcomassを求めよ。$v=(3,4)/5$ と逆向きの $-v$ における評価を比較せよ。

<!-- solution-start -->
### 詳細解答

単位ベクトル $u=(u_x,u_y)$ に対してCauchy–Schwarz不等式より

$$
|\alpha(u)|=\frac{|3u_x+4u_y|}{5}
\le\frac{\sqrt{3^2+4^2}}5\sqrt{u_x^2+u_y^2}=1.
$$

$u=v$ では $\alpha(v)=(9+16)/25=1$、$u=-v$ では $-1$。従ってcomassは1である。後者では絶対値の上限は達成するが、較正の正の向きの等号は満たさない。
<!-- solution-end -->

<a id="ex-syz1-03-a02"></a>

#### SYZ1-03-A02 傾いた平面の評価

- Level: A

$\mathbb R^3$ で $\varphi=dx\wedge dy$ とし、$u=e_x$、$v=\cos t\,e_y+\sin t\,e_z$（$0\le t\le\pi/2$）とする。正規直交性、$\varphi(u,v)$ と較正の等号条件を調べよ。

<!-- solution-start -->
### 詳細解答

$g(u,u)=1$、$g(v,v)=\cos^2t+\sin^2t=1$、$g(u,v)=0$ なので正規直交である。外積評価を直接計算して

$$
(dx\wedge dy)(u,v)=dx(u)dy(v)-dx(v)dy(u)=\cos t.
$$

$\cos t=1$ は指定区間では $t=0$ に限られる。$t>0$ ではcomassの上限より小さく、傾いた平面はこの向きで較正されない。
<!-- solution-end -->

<a id="ex-syz1-03-a03"></a>

#### SYZ1-03-A03 閉性を先に調べる

- Level: A

$\mathbb R^2$ のEuclid計量で $\beta=\cos x\,dx+\sin x\,dy$ とする。comassが1でも較正形式でない理由を、外微分と定義から示せ。

<!-- solution-start -->
### 詳細解答

任意の単位ベクトル $u$ に対し

$$
|\beta(u)|\le\sqrt{\cos^2 x+\sin^2x}\,\|u\|=1
$$

で、$u=(\cos x,\sin x)$ で等号が成立するから各点のcomassは1。ところが

$$
d\beta=d(\cos x)\wedge dx+d(\sin x)\wedge dy
=-\sin x\,dx\wedge dx+\cos x\,dx\wedge dy
=\cos x\,dx\wedge dy
$$

となり恒等的には0でない。よって閉性が欠け、較正形式ではない。
<!-- solution-end -->

<a id="ex-syz1-03-a04"></a>

#### SYZ1-03-A04 複素一次元の位相

- Level: A

$\mathbb C$ で $\Omega=dz$、$\varphi_\theta=\operatorname{Re}(e^{-i\theta}dz)$ とする。向きを $v=(\cos a,\sin a)$ で決めた直線の較正条件を求めよ。

<!-- solution-start -->
### 詳細解答

$v$ はEuclid長さ1で、$dz(v)=\cos a+i\sin a=e^{ia}$。従って

$$
\varphi_\theta(v)
=\operatorname{Re}(e^{i(a-\theta)})
=\cos(a-\theta)\le1.
$$

較正条件は $\cos(a-\theta)=1$、すなわち $a-\theta\in2\pi\mathbb Z$。差が $\pi$ なら実部は $-1$ であり、向きを反転すれば対応する較正向きになる。
<!-- solution-end -->

<a id="ex-syz1-03-a05"></a>

#### SYZ1-03-A05 二複素座標軸の回転

- Level: A

$\mathbb C^2$ の向き付き平面を $v_1=e^{i\pi/6}\partial_{x^1}$、$v_2=e^{i\pi/3}\partial_{x^2}$ で張る。Lagrange性と較正位相を求め、$\theta=-\pi/2$ での実部を計算せよ。

<!-- solution-start -->
### 詳細解答

$v_1,v_2$ は異なる複素座標軸の単位方向で、$\omega(v_1,v_2)=0$。従って二次元で$\omega$ が消えLagrangeである。複素体積形式の値は

$$
\Omega(v_1,v_2)=e^{i(\pi/6+\pi/3)}=e^{i\pi/2}=i.
$$

較正位相は $\theta=\pi/2$（$2\pi$ を法として）である。一方 $\theta=-\pi/2$ なら $e^{-i\theta}=i$ なので

$$
\operatorname{Re}(e^{-i\theta}\Omega(v_1,v_2))
=\operatorname{Re}(i\cdot i)=-1.
$$

虚部が0という条件だけでは向きの選択を決められない。
<!-- solution-end -->

### Level B：証明の仮定がどこで働くか

<a id="ex-syz1-03-b01"></a>

#### SYZ1-03-B01 トーラスでの長さの下界

- Level: B

平坦トーラス $T^2$ に $\varphi=(2dx+dy)/\sqrt5$ を入れる。$L(t)=([2t],[t])$（$0\le t\le1$）が較正されることを調べ、同じ向き付きホモロジー類の任意の滑らかな閉路の長さの下界を示せ。

<!-- solution-start -->
### 詳細解答

$\varphi$ は定数係数で $d\varphi=0$。係数ベクトル $(2,1)/\sqrt5$ のEuclid長さは1だから、comassも1。閉路 $L$ の速度は $(2,1)$、速さ $\sqrt5$ なので正の単位接ベクトルは $(2,1)/\sqrt5$ である。その評価は

$$
\varphi\left(\frac{(2,1)}{\sqrt5}\right)
=\frac{2\cdot2+1\cdot1}{5}=1.
$$

従って $L$ は較正され、長さは $\int_0^1\sqrt5\,dt=\sqrt5$。同じホモロジー類の閉路 $N$ ならStokesにより $\int_N\varphi=\int_L\varphi=\sqrt5$。[comassの定義](#def-syz1-03-comass)による接線上の評価から $\int_N\varphi\le\operatorname{Length}(N)$。ゆえに $\operatorname{Length}(N)\ge\sqrt5$。
<!-- solution-end -->

<a id="ex-syz1-03-b02"></a>

#### SYZ1-03-B02 等号を失う複素平面

- Level: B

$\mathbb C^2$ で $v_1=\partial_{x^1}$、$v_2=(\partial_{y^1}+\partial_{x^2})/\sqrt2$ を取る。$\omega(v_1,v_2)$、Hermitian Gram行列、$|\Omega(v_1,v_2)|$ を計算し、複素行列式の等号が成立しない理由を述べよ。

<!-- solution-start -->
### 詳細解答

複素列は $c_1=(1,0)^T$、$c_2=(i/\sqrt2,1/\sqrt2)^T$。内積は

$$
\langle c_1,c_2\rangle_{\mathbb C}=\frac{i}{\sqrt2},
\quad
G=\begin{pmatrix}1&i/\sqrt2\\-i/\sqrt2&1\end{pmatrix},
\quad\det G=1-\frac12=\frac12.
$$

同時に $\omega(v_1,v_2)=1/\sqrt2\ne0$。複素行列式は

$$
\det\begin{pmatrix}1&i/\sqrt2\\0&1/\sqrt2\end{pmatrix}
=\frac1{\sqrt2},
\qquad |\det A|^2=\det G=\frac12.
$$

実内積での直交性は満たしてもHermitian内積の虚部が0でない。したがってLagrange等号条件が壊れ、絶対値は1に達しない。
<!-- solution-end -->

<a id="ex-syz1-03-b03"></a>

#### SYZ1-03-B03 閉性を落とすと体積比較は壊れる

- Level: B

$M=(\mathbb R/\mathbb Z)_x\times(-1/2,1/2)_y$ に

$$
g=dy^2+(2-y^2)^2dx^2,\qquad\alpha=(2-y^2)dx
$$

を入れる。$\alpha$ のcomass、外微分、$L_a=\{y=a\}$ の長さを求め、$L_0$ と $L_a$ が同じホモロジー類でも体積最小性が結論できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

正規直交余基底は $e^1=(2-y^2)dx$、$e^2=dy$ であり、$\alpha=e^1$ だからcomassは常に1。しかし

$$
d\alpha=d(2-y^2)\wedge dx=-2y\,dy\wedge dx
$$

であり、$y\ne0$ で非零だから閉形式ではない。$L_a$ を増加する $x$ の向きに取ると、その接方向の速さは $2-a^2$ で、長さは $\int_0^1(2-a^2)\,dx=2-a^2$。すべての $L_a$ は円筒の中で同じ向き付きホモロジー類である。$a=0$ では $\alpha(\partial_x)/(2-0)=1$ と接線上で等号になるが、$a\ne0$ では $2-a^2<2$ でより短い。

定理の証明で壊れる箇所は $\int_{L_0}\alpha=\int_{L_a}\alpha$ をStokesから導く部分である。実際、二つの積分はそれぞれ $2$ と $2-a^2$ で一致しない。
<!-- solution-end -->

<a id="ex-syz1-03-b04"></a>

#### SYZ1-03-B04 停留性と安定性

- Level: B

単位球面 $S^2$ で赤道から緯度 $t$ の円へ動かすと長さが $2\pi\cos t$ になることを使い、一階・二階微分を計算せよ。また平坦トーラスの水平閉路の平行移動は、較正されても二階微分が正にならない例であることを示せ。

<!-- solution-start -->
### 詳細解答

球面の緯度 $t$ の円の半径は $\cos t$ なので長さは $V(t)=2\pi\cos t$。微分すると

$$
V'(t)=-2\pi\sin t,\qquad V''(t)=-2\pi\cos t.
$$

従って $V'(0)=0$ だが $V''(0)=-2\pi<0$。赤道はこの変形で停留しても安定でない。

次に $T^2$ の $L_t=\{y=t\}$ はいずれも $dx$ で較正される。誘導計量は $dx^2$ で $V(t)=\int_0^1dx=1$。よって $V'(0)=V''(0)=0$ である。較正は二階変分の非負性を与えるが、厳密な正性は保証しない。
<!-- solution-end -->

### Level C：Lagrangeグラフから較正へ進む

<a id="ex-syz1-03-c01"></a>

#### SYZ1-03-C01 二次ポテンシャルのグラフを全条件で判定する

- Level: C

$\mathbb C^2=\mathbb R_x^2\times\mathbb R_y^2$ に標準の $g,\omega,\Omega=dz^1\wedge dz^2$ を入れる。実数 $a,b$ に対し、$f(x^1,x^2)=\frac a2((x^1)^2-(x^2)^2)$ および $h(x^1,x^2)=\frac b2(x^1)^2$ を考える。

1. それぞれの勾配グラフ $L_f=\{y=\nabla f(x)\}$、$L_h=\{y=\nabla h(x)\}$ がLagrangeであることを検算せよ。
2. $L_f$ の正の向きを $x^1,x^2$ の増加方向とし、引き戻した $\Omega$ と誘導体積形式を計算して、位相0で較正されることを証明せよ。
3. $b\ne0$ のとき $L_h$ が位相0では較正されないことを確かめよ。
4. $L_f$ 全体は非コンパクトである。体積最小性の主張に必要な競合曲面の条件を述べよ。

<!-- solution-start -->
### 詳細解答

**第1問。** 前講の[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)を $df,dh$ に適用する。まず

$$
df=a x^1dx^1-a x^2dx^2,\qquad dh=b x^1dx^1.
$$

二つとも外微分は $d(df)=d(dh)=0$ なので、グラフはLagrangeである。直接にも、接ベクトルをそれぞれ

$$
F_1=(1,0,a,0),\quad F_2=(0,1,0,-a),
\qquad H_1=(1,0,b,0),\quad H_2=(0,1,0,0)
$$

（順序は $x^1,x^2,y^1,y^2$）とすると、$\omega(F_1,F_2)=\omega(H_1,H_2)=0$ となる。$x$ 射影が恒等写像なので双方とも埋め込み二次元である。

**第2問。** $L_f$ 上では $z^1=(1+ia)x^1$、$z^2=(1-ia)x^2$ なので

$$
F^*\Omega=(1+ia)(1-ia)\,dx^1\wedge dx^2
=(1+a^2)\,dx^1\wedge dx^2.
$$

誘導計量は $g(F_1,F_1)=g(F_2,F_2)=1+a^2$、$g(F_1,F_2)=0$。従って

$$
F^*g=(1+a^2)\bigl((dx^1)^2+(dx^2)^2\bigr),\quad
\operatorname{vol}_{L_f}=\sqrt{(1+a^2)^2}\,dx^1\wedge dx^2
=(1+a^2)\,dx^1\wedge dx^2.
$$

よって $F^*\operatorname{Re}\Omega=\operatorname{vol}_{L_f}$ であり、向きを含め位相0で較正される。

**第3問。** $L_h$ 上では $z^1=(1+ib)x^1$、$z^2=x^2$ なので

$$
H^*\Omega=(1+ib)\,dx^1\wedge dx^2,\qquad
\operatorname{vol}_{L_h}=\sqrt{1+b^2}\,dx^1\wedge dx^2.
$$

$b\ne0$ なら $1<\sqrt{1+b^2}$。従って $\operatorname{Re}\Omega$ は誘導体積形式と一致しない。Lagrangeであることだけでは較正は結論できない。

**第4問。** 第4節の定理はコンパクト境界なしのサイクルを比較するので、非コンパクトな $L_f$ 全体にはそのまま適用できない。一方、$L_f$ のコンパクトな向き付き部分 $K$ と同じ境界を持つコンパクトな競合曲面 $N$ について、$K-N=\partial C$ を満たす鎖が存在すれば、

$$
\operatorname{Area}(K)=\int_K\operatorname{Re}\Omega
=\int_N\operatorname{Re}\Omega\le\operatorname{Area}(N)
$$

とStokesの議論を適用できる。境界条件と鎖の存在を指定せずに「全ての非コンパクト曲面の中で最小」とは言えない。
<!-- solution-end -->

## 9. 次講への橋渡し

較正形式を使うと、comassによる局所的な体積不等式と閉性による大域的な積分等式を結び、同一ホモロジー類での体積最小性を証明できる。$\mathbb C^n$ の $\operatorname{Re}(e^{-i\theta}\Omega)$ では、**複素行列式の等号 = Lagrange接平面 + 正しい向きの位相** が成立する。

次の **SYZ1-04「正則体積形式・位相とSLag方程式」** では、一般のCalabi–Yauでの規格化を明示し、Lagrangeグラフを較正等号へ代入して非線形方程式を導く。
