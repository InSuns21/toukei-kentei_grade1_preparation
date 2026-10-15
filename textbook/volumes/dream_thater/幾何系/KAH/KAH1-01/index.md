# KAH1-01 複素構造とHermite計量の出会い

<!-- definition-example-audit: strict -->

## 1. 複素構造だけでは長さが測れない

複素多様体には、実接空間で複素数 $i$ の作用を表す[複素構造 $J$](../../CM/CM1-03/index.md#thm-cm1-03-induced-j) がある。点ごとに $J^2=-I$ が成り立ち、$J$ は実方向を四分の一回転した方向へ送る。しかし $J$ だけからベクトルの長さや二つの方向の角度は決まらない。例えば同じ複素平面でも、どこを長く測るかは自由に決められる。

一方、実接束へRiemann計量を勝手に入れると、$J$ が長さを変えてしまうことがある。複素構造を回転として尊重する計量が必要である。本章では **複素構造 → 両立する実計量 → 基本2形式** の順に構成し、最後に閉性を追加すると何が変わるかを確かめる。

以下 $X$ は複素次元 $n\ge1$ の複素多様体、$J:TX\to TX$ はその正則座標から誘導される複素構造とする。接ベクトルは実ベクトルとして扱い、計量 $g$ は滑らかな実対称双線形形式で、各点で正定値である。別に断らなければ $g$ は $g_{\mathbb R}$ の略記である。

## 2. $J$ に両立する実計量

既習の[概複素構造](../../CM/CM1-03/index.md#def-cm1-03-almost-complex)では $J^2=-I$ だけが要求される。これを保つ計量は、$J$ による回転前後の長さが同じになるよう選ぶ。

<a id="def-kah1-01-compatible-metric"></a>

<!-- formal-statement-start -->
> **定義（複素構造と両立するRiemann計量）**  
> 滑らかな概複素構造 $J$ を持つ実 $2n$ 次元多様体 $M$ と、滑らかなRiemann計量 $g$ に対し、すべての $x\in M$、$u,v\in T_xM$ で次の等式が成り立つとき、$g$ は $J$ と**両立する**という。

$$
g_x(Ju,Jv)=g_x(u,v).
$$

> 特に $M$ が複素多様体で $J$ がその複素構造のとき、組 $(J,g)$ をHermite構造と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-01-compatible-metric -->
**定義の確認**。$\mathbb C$ を実座標 $(x,y)$ で表し、$J(a,b)=(-b,a)$、$g(u,v)=u_1v_1+u_2v_2$ とする。$J$ は滑らかな定数行列、$J^2=-I$ である。任意の $u=(a,b)$、$v=(c,d)$ について

$$
g(Ju,Jv)=(-b)(-d)+ac=ac+bd=g(u,v).
$$

$u\ne0$ なら $g(u,u)=a^2+b^2>0$、対称性と双線形性も成分式から確認できる。よってこれは両立する計量の直接例である。
<!-- definition-example-end -->

両立条件では $J$ の両側に作用させている。$g(Ju,v)=g(u,Jv)$ と書くのは誤りで、正しい符号は次で導く。

<a id="prop-kah1-01-skew-identity"></a>

<!-- formal-statement-start -->
> **命題（両立条件と交代性）**  
> 実ベクトル空間 $V$ 上で $J^2=-I$ とし、$g$ を正定値対称双線形形式とする。$g(Ju,Jv)=g(u,v)$ がすべての $u,v\in V$ で成立することと、次の等式がすべての $u,v$ で成立することは同値である。

$$
g(Ju,v)=-g(u,Jv).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$J^2=-I$ を片方の変数へ代入する。逆向きにも同じ恒等式を二度使う。

<!-- proof-start -->
### 証明

両立条件の第二変数に $Jv$ を代入すると

$$
g(Ju,J(Jv))=g(u,Jv).
$$

$J^2v=-v$ だから左辺は $-g(Ju,v)$ であり、目的の符号が得られる。逆に交代性の等式の第二変数を $Jv$ に換えると

$$
g(Ju,Jv)=-g(u,J(Jv))=-g(u,-v)=g(u,v).
$$

よって両条件は同値である。$\square$
<!-- proof-end -->

実際に両立計量を作れることも重要である。存在を仮定しないまま先へ進む必要はない。

<a id="prop-kah1-01-averaging"></a>

<!-- formal-statement-start -->
> **命題（平均による両立計量の構成）**  
> 滑らかな概複素構造 $J$ を持つ実多様体 $M$ に滑らかなRiemann計量 $g_0$ が与えられているとする。このとき

$$
g(u,v)=\frac12\bigl(g_0(u,v)+g_0(Ju,Jv)\bigr)
$$

> は滑らかな正定値対称双線形形式であり、$J$ と両立する。
<!-- formal-statement-end -->

### 証明の見取り図

各点の双線形形式を平均し、正値性は第一項で、両立性は $J^2=-I$ で確かめる。

<!-- proof-start -->
### 証明

$g_0$ と $J$ が滑らかだから $g$ は滑らかである。$g_0$ の対称性・双線形性から $g$ も対称双線形となる。非零ベクトル $u$ では $Ju\ne0$ であり、

$$
g(u,u)=\frac12\{g_0(u,u)+g_0(Ju,Ju)\}>0.
$$

また

$$
\begin{aligned}
g(Ju,Jv)
&=\frac12\{g_0(Ju,Jv)+g_0(J(Ju),J(Jv))\}\\
&=\frac12\{g_0(Ju,Jv)+g_0(-u,-v)\}\\
&=\frac12\{g_0(Ju,Jv)+g_0(u,v)\}=g(u,v).
\end{aligned}
$$

従って全条件が成立する。$\square$
<!-- proof-end -->

一般に滑らかな多様体へ計量 $g_0$ を与えられることは、[滑らかな1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)により局所Euclid計量を貼り合わせる方法から従う。この命題の役割は、選んだ計量を **複素構造に合わせて平均できる**点にある。

## 3. 長さを面積へ変換する基本2形式

両立計量があると、$Ju$ と $v$ の内積を取ることができる。二方向を入力とするこの値が、向き付きの微小面積を表す。

<a id="def-kah1-01-fundamental-form"></a>

<!-- formal-statement-start -->
> **定義（基本2形式）**  
> 実 $2n$ 次元多様体 $M$ に滑らかな概複素構造 $J$ とそれに両立するRiemann計量 $g$ があるとする。各点 $x$ の二つの接ベクトルに対して

$$
\omega_x(u,v)=g_x(Ju,v)
$$

> と定めた微分2形式 $\omega$ を、組 $(J,g)$ の**基本2形式**という。
<!-- formal-statement-end -->

この式が本当に微分2形式を定めるには、$u,v$ の交換で符号が反転することが必要である。そこは定義と[交代性の命題](#prop-kah1-01-skew-identity)を結び付けて確かめる。

<!-- definition-example-start: def-kah1-01-fundamental-form -->
**定義の確認**。上の $\mathbb C$ の標準計量で、$u=(a,b)$、$v=(c,d)$ とすると

$$
\omega(u,v)=g((-b,a),(c,d))=ad-bc.
$$

従って $\omega=dx\wedge dy$。交換すれば $cb-da=-(ad-bc)$ で交代性を満たし、係数は滑らかで実数値である。また $u\ne0$ なら $\omega(u,Ju)=a^2+b^2>0$ なので非退化である。単に式を書いただけでなく、2形式の各条件を確認した。
<!-- definition-example-end -->

<a id="prop-kah1-01-reconstruction"></a>

<!-- formal-statement-start -->
> **命題（基本2形式の性質と計量の復元）**  
> $J^2=-I$ と $J$ に両立する正定値対称形式 $g$ に対し、$\omega(u,v)=g(Ju,v)$ は実交代双線形かつ非退化であり、次を満たす。

$$
\omega(Ju,Jv)=\omega(u,v),\qquad
g(u,v)=\omega(u,Jv).
$$

> 逆に、実交代双線形形式 $\omega$ が $J$ に関して不変であり、$g(u,v)=\omega(u,Jv)$ が正定値なら、$g$ は対称で $J$ と両立し、元の $\omega$ が基本2形式になる。
<!-- formal-statement-end -->

### 証明の見取り図

まず $g$ の対称性と $J^2=-I$ で交代性を導く。復元式を得た後、逆向きでは $\omega$ の不変性を使って対称性を確かめる。

<!-- proof-start -->
### 証明

[交代性の命題](#prop-kah1-01-skew-identity)と $g$ の対称性から

$$
\omega(v,u)=g(Jv,u)=g(u,Jv)=-g(Ju,v)=-\omega(u,v).
$$

双線形性・滑らかさ・実数値性は定義式から従う。$u\ne0$ なら

$$
\omega(u,Ju)=g(Ju,Ju)=g(u,u)>0,
$$

従って $\omega(u,\cdot)$ は零汎関数ではなく、$\omega$ は非退化である。さらに

$$
\omega(Ju,Jv)=g(J(Ju),Jv)=-g(u,Jv)=g(Ju,v)=\omega(u,v),
$$

そして

$$
\omega(u,Jv)=g(Ju,Jv)=g(u,v).
$$

逆向きには $\omega(Ju,Jv)=\omega(u,v)$ を仮定する。この両辺の第二変数に $Jv$ を代入して

$$
\omega(Ju,-v)=\omega(u,Jv)
$$

を得る。交代性より $-\omega(Ju,v)=\omega(v,Ju)$ なので

$$
g(u,v)=\omega(u,Jv)=\omega(v,Ju)=g(v,u).
$$

また

$$
g(Ju,Jv)=\omega(Ju,J(Jv))=-\omega(Ju,v)=\omega(u,Jv)=g(u,v).
$$

最後に $\omega_{\mathrm{new}}(u,v)=g(Ju,v)=\omega(Ju,Jv)=\omega(u,v)$。よって定義も元へ戻る。$\square$
<!-- proof-end -->

したがって **$J$ と $g$ から $\omega$ は一意に定まり、$J$ と正値で不変な $\omega$ から $g$ も一意に戻せる**。ただし $g$ だけでは一般に $J$ は決まらない。例えば $\mathbb R^4$ のEuclid計量には、複数の直交する複素構造を選べる。

## 4. Hermite内積との接続と正規化

既習の[Hermite計量](../../CM/CM2-09/index.md#def-cm2-09-hermitian-metric)は第一変数が共役線形、第二変数が線形である。本章の実接空間は $Ju=i u$ によって複素ベクトル空間とみなせるから、実計量と基本2形式を一つの複素内積にまとめられる。

<a id="prop-kah1-01-hermitian-inner-product"></a>

<!-- formal-statement-start -->
> **命題（実計量と基本2形式からのHermite内積）**  
> $V$ を $J^2=-I$ を持つ有限次元実ベクトル空間、$g$ を $J$ に両立する正定値対称双線形形式とする。$i u=Ju$ とする複素ベクトル空間 $V$ 上で

$$
h(u,v)=g(u,v)+i\,g(Ju,v)
$$

> とおくと、$h$ は第一変数共役線形・第二変数線形の正定値Hermite内積である。さらに $g=\operatorname{Re}h$、$\omega=\operatorname{Im}h$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$J$ による $i$ 倍を各変数へ代入し、符号を直接確かめる。実部は対称、虚部は交代である。

<!-- proof-start -->
### 証明

[交代性の命題](#prop-kah1-01-skew-identity)を使い、第二変数を $Jv$ とすると

$$
\begin{aligned}
h(u,Jv)
&=g(u,Jv)+i\,g(Ju,Jv)\\
&=-g(Ju,v)+i\,g(u,v)=i\,h(u,v).
\end{aligned}
$$

第一変数を $Ju$ とすれば

$$
\begin{aligned}
h(Ju,v)
&=g(Ju,v)+i\,g(J(Ju),v)\\
&=g(Ju,v)-i\,g(u,v)=-i\,h(u,v).
\end{aligned}
$$

実双線形性と合わせて複素共役線形性・線形性が従う。また $g$ は対称で $\omega$ は交代なので

$$
h(v,u)=g(v,u)+i\omega(v,u)
=g(u,v)-i\omega(u,v)=\overline{h(u,v)}.
$$

$\omega(u,u)=0$ より $h(u,u)=g(u,u)>0$（$u\ne0$）。実部・虚部の式も構成から得られる。$\square$
<!-- proof-end -->

**座標規約の確認**。$\mathbb C$ の $z=x+iy$ では

$$
dz\wedge d\bar z=(dx+i\,dy)\wedge(dx-i\,dy)=-2i\,dx\wedge dy.
$$

従って標準実計量 $dx^2+dy^2$ の基本形式は

$$
\omega=dx\wedge dy=\frac{i}{2}\,dz\wedge d\bar z.
$$

今後 $\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j$ と書く場合、標準Euclid計量では $g_{i\bar j}=\delta_{ij}/2$ である。**ここでの $1/2$ は規約に不可欠**であり、複素内積 $h$ の実接ベクトルに対する係数行列と無断で同一視しない。

## 5. 閉性を要求したときがKähler幾何の入口

基本2形式は交代かつ非退化であるが、一般には閉じていない。微分形式に対する[外微分](../../GEO/GEO7/index.md#def-geo7-exterior-derivative)で $d\omega=0$ を要求すると、さらに強い幾何が現れる。閉かつ非退化な2形式はシンプレクティック形式とも呼ばれる。

<a id="def-kah1-01-kahler-structure"></a>

<!-- formal-statement-start -->
> **定義（Hermite構造・Kähler構造・概Kähler構造）**  
> 複素多様体 $X$ にその複素構造 $J$ と両立する滑らかなRiemann計量 $g$ を与えた組 $(X,J,g)$ を **Hermite多様体**という。その基本2形式を $\omega(u,v)=g(Ju,v)$ とする。さらに $d\omega=0$ が成り立つとき、組 $(X,J,g)$ を **Kähler多様体**という。
>
> 複素構造の可積分性を仮定しない滑らかな概複素構造 $J$ と両立する計量 $g$ について、基本2形式が閉じている組を **概Kähler構造**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-01-kahler-structure -->
**定義の確認**。$\mathbb C^n$ の標準複素構造と標準Euclid計量を考える。$J^2=-I$、正定値性、$g(Ju,Jv)=g(u,v)$ は各座標対で成立する。[基本2形式](#def-kah1-01-fundamental-form)は

$$
\omega_0=\sum_{j=1}^n dx^j\wedge dy^j.
$$

各係数は定数で、$d(dx^j)=d(dy^j)=0$ なので $d\omega_0=0$。また $u\ne0$ に対し $\omega_0(u,Ju)=g(u,u)>0$。従って閉性と非退化性を別々に検証でき、これはKähler多様体である。
<!-- definition-example-end -->

可積分な複素構造の下では、KählerならHermiteであり概Kählerでもある。ただし **Hermiteであるだけでは閉性は保証されない**。また概Kählerの定義はそもそも複素アトラスの存在を仮定しない。両者を同義語として扱うことはできない。

**閉性が壊れる直接例**。$\mathbb C^2$ で $f=e^{x^1}$ と置き、

$$
g=f\sum_{j=1}^2\bigl((dx^j)^2+(dy^j)^2\bigr)
$$

を与える。$f>0$ なので正定値、$J_0$ は各座標対で回転し、$g(J_0u,J_0v)=g(u,v)$。しかし基本2形式は

$$
\omega=f(dx^1\wedge dy^1+dx^2\wedge dy^2)
$$

となり、積の外微分則を使うと

$$
\begin{aligned}
d\omega
&=df\wedge(dx^1\wedge dy^1+dx^2\wedge dy^2)\\
&=e^{x^1}dx^1\wedge dx^2\wedge dy^2\ne0.
\end{aligned}
$$

第一項は $dx^1\wedge dx^1=0$ で消えるが、第二項は消えない。これは全点でHermiteだがKählerではない例である。なお複素次元1では実次元2のため、任意の2形式の外微分は次数3となり自動的に零である。この次元依存も忘れないようにする。

今後は閉性を局所成分へ翻訳し、接続の一致・局所ポテンシャルへ進む。本章で確かめたのは、**正値性、複素構造との両立、閉性が互いに異なる検査条件である**という出発点である。

## 6. 演習

各題では、仮定を書き出してから両立条件・交代性・正値性・閉性を区別して計算する。

### Level A

<a id="ex-kah1-01-a01"></a>
#### KAH1-01-A01 回転と計量の両立
- Level: A

$J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$G=\operatorname{diag}(a,b)$（$a,b>0$）とする。$g(u,v)=u^{\mathsf T}Gv$ が $J$ と両立する条件を求めよ。

<!-- solution-start -->
**詳細解答**。両立条件はすべての $u,v$ に対し $u^{\mathsf T}J^{\mathsf T}GJv=u^{\mathsf T}Gv$、すなわち $J^{\mathsf T}GJ=G$ である。積を順に計算すると

$$
GJ=\begin{pmatrix}0&-a\\b&0\end{pmatrix},\qquad
J^{\mathsf T}GJ=\begin{pmatrix}b&0\\0&a\end{pmatrix}.
$$

従って必要十分条件は $a=b$。実際このとき $G=aI$ だから $J^{\mathsf T}GJ=aI=G$ となる。
<!-- solution-end -->

<a id="ex-kah1-01-a02"></a>
#### KAH1-01-A02 面積形式の符号
- Level: A

$\mathbb R^2$ の $J(a,b)=(-b,a)$ と $g(u,v)=u\cdot v$ で $\omega(e_1,e_2)$、$\omega(e_2,e_1)$、$\omega(u,Ju)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$Je_1=e_2$、$Je_2=-e_1$ より

$$
\omega(e_1,e_2)=g(e_2,e_2)=1,\qquad
\omega(e_2,e_1)=g(-e_1,e_1)=-1.
$$

$u=(a,b)$ なら $Ju=(-b,a)$ であり、$g(Ju,Ju)=a^2+b^2$。従って $\omega(u,Ju)=a^2+b^2$。この値は $u\ne0$ なら正だから非退化性の判定にもなる。
<!-- solution-end -->

<a id="ex-kah1-01-a03"></a>
#### KAH1-01-A03 平均して計量を作る
- Level: A

$J$ を標準回転、$G_0=\operatorname{diag}(2,8)$ とする。平均公式の $G$ を求め、正値性と両立性を検算せよ。

<!-- solution-start -->
**詳細解答**。[平均公式](#prop-kah1-01-averaging)を行列で表すと

$$
G=\frac12(G_0+J^{\mathsf T}G_0J)
=\frac12\left(\begin{pmatrix}2&0\\0&8\end{pmatrix}
+\begin{pmatrix}8&0\\0&2\end{pmatrix}\right)=5I.
$$

任意の $u\ne0$ に対し $u^{\mathsf T}Gu=5\|u\|^2>0$。さらに $J^{\mathsf T}GJ=5J^{\mathsf T}J=5I=G$ である。
<!-- solution-end -->

<a id="ex-kah1-01-a04"></a>
#### KAH1-01-A04 複素座標の係数
- Level: A

$z=x+iy$、$\omega=dx\wedge dy$ のとき、$\omega=c\,i\,dz\wedge d\bar z$ の実定数 $c$ を求めよ。

<!-- solution-start -->
**詳細解答**。外積を分配すると

$$
\begin{aligned}
dz\wedge d\bar z
&=(dx+i\,dy)\wedge(dx-i\,dy)\\
&=-i\,dx\wedge dy+i\,dy\wedge dx\\
&=-2i\,dx\wedge dy.
\end{aligned}
$$

従って $ci\,dz\wedge d\bar z=2c\,dx\wedge dy$。係数比較で $2c=1$、すなわち $c=1/2$。
<!-- solution-end -->

### Level B

<a id="ex-kah1-01-b01"></a>
#### KAH1-01-B01 非標準Jから両立計量を作る
- Level: B

$a>0$ に対し $J_a=\begin{pmatrix}0&-a\\a^{-1}&0\end{pmatrix}$ とする。$J_a^2=-I$ を確かめ、Euclid計量 $G_0=I$ の平均による $G$ を計算せよ。$G$ と $J_a$ の両立性を行列積で示せ。

<!-- solution-start -->
**詳細解答**。まず

$$
J_a^2=\begin{pmatrix}-1&0\\0&-1\end{pmatrix},\qquad
J_a^{\mathsf T}J_a=\operatorname{diag}(a^{-2},a^2).
$$

平均で

$$
G=\frac12(I+J_a^{\mathsf T}J_a)
=\frac12\operatorname{diag}(1+a^{-2},1+a^2).
$$

両対角成分は正。$J_a^{\mathsf T}GJ_a$ の対角成分を順に計算すると

$$
\frac{1+a^2}{2a^2}=\frac{1+a^{-2}}2,\qquad
\frac{a^2(1+a^{-2})}{2}=\frac{1+a^2}2.
$$

非対角成分は零なので $J_a^{\mathsf T}GJ_a=G$。単にEuclid計量を使うと $a\ne1$ では両立しないが、平均すると両立する。
<!-- solution-end -->

<a id="ex-kah1-01-b02"></a>
#### KAH1-01-B02 閉性と次元の違い
- Level: B

$\mathbb C^2$ で $g=f\sum_{j=1}^2((dx^j)^2+(dy^j)^2)$、$f=2+x_1^2$ とする。正値性・両立性を確認し、$d\omega$ を計算してKählerか判定せよ。$\mathbb C$ 上の同様の計量との違いも述べよ。

<!-- solution-start -->
**詳細解答**。$f\ge2>0$ で、標準Euclid計量の正値性を保つ。$J_0$ は各座標対で直交するので $g(J_0u,J_0v)=f\,g_0(J_0u,J_0v)=f\,g_0(u,v)=g(u,v)$。基本形式は $\omega=f(dx^1\wedge dy^1+dx^2\wedge dy^2)$ である。$df=2x_1dx^1$ を代入すると

$$
d\omega=2x_1dx^1\wedge dx^2\wedge dy^2.
$$

$x_1\ne0$ では非零なので全体として $d\omega\ne0$、Kählerではない。$\mathbb C$ は実次元2だから、同じ形の2形式 $\omega=f\,dx\wedge dy$ には $d\omega$ が3形式として自動的に零となる。次元が変わると判定結果が変わる。
<!-- solution-end -->

<a id="ex-kah1-01-b03"></a>
#### KAH1-01-B03 $h$ の複素線形性を確かめる
- Level: B

実2次元の標準 $J,g$ から $h(u,v)=g(u,v)+i\,g(Ju,v)$ を作る。$u=(a,b)$、$v=(c,d)$ を複素数 $a+ib$、$c+id$ と同一視し、$h(u,v)=\overline{(a+ib)}(c+id)$ を成分計算で証明せよ。

<!-- solution-start -->
**詳細解答**。実部は $g(u,v)=ac+bd$。$Ju=(-b,a)$ より虚部は $g(Ju,v)=-bc+ad$。ゆえに

$$
h(u,v)=(ac+bd)+i(ad-bc).
$$

一方、

$$
(a-ib)(c+id)=ac+iad-ibc+bd
=(ac+bd)+i(ad-bc).
$$

両式が一致する。したがって第一変数に $i$ を掛けると複素共役のため $-i$ が出る一方、第二変数では $+i$ が出る。[Hermite内積の命題](#prop-kah1-01-hermitian-inner-product)と整合する。
<!-- solution-end -->

### Level C

<a id="ex-kah1-01-c01"></a>
#### KAH1-01-C01 $J$ と2形式から計量を復元する
- Level: C

実4次元空間 $V=\mathbb R^4$ で $J(e_1)=e_2$、$J(e_2)=-e_1$、$J(e_3)=e_4$、$J(e_4)=-e_3$ とする。実交代2形式

$$
\omega=A\,e^1\wedge e^2+B\,e^3\wedge e^4
$$

を考える。ただし $(e^j)$ は双対基底、$A,B\in\mathbb R$。$\omega$ が $J$ 不変であることを示し、$g(u,v)=\omega(u,Jv)$ の行列を求める。正定値の必要十分条件と、そのときの非退化性を説明せよ。

<!-- solution-start -->
**詳細解答**。任意の $u=(u_1,u_2,u_3,u_4)$、$v=(v_1,v_2,v_3,v_4)$ に対し

$$
\omega(u,v)=A(u_1v_2-u_2v_1)+B(u_3v_4-u_4v_3).
$$

$Ju=(-u_2,u_1,-u_4,u_3)$、$Jv=(-v_2,v_1,-v_4,v_3)$ を代入すると、それぞれの括弧は $u_1v_2-u_2v_1$ と $u_3v_4-u_4v_3$ に戻る。従って $\omega(Ju,Jv)=\omega(u,v)$。また

$$
\begin{aligned}
g(u,v)&=\omega(u,Jv)\\
&=A(u_1v_1+u_2v_2)+B(u_3v_3+u_4v_4),
\end{aligned}
$$

だから $G=\operatorname{diag}(A,A,B,B)$。$u=e_1,e_3$ を代入すれば正定値には $A>0,B>0$ が必要であり、この条件なら任意の非零 $u$ に対し $g(u,u)=A(u_1^2+u_2^2)+B(u_3^2+u_4^2)>0$、十分でもある。[復元命題](#prop-kah1-01-reconstruction)により基本形式は元の $\omega$。$A,B>0$ のとき任意の $u\ne0$ に対し $\omega(u,Ju)=g(u,u)>0$ だから $\omega$ は非退化である。逆に $A=0$ または $B=0$ ならその対応2平面が核となる。非退化性だけなら $AB\ne0$ だが、正値性には両方の正符号が必要である。
<!-- solution-end -->
