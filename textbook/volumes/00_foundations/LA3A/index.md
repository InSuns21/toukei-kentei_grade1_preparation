# LA3A 代数的双対・双対基底・零化空間

線形代数では、ベクトルそのものを見るだけでなく、**ベクトルから1個の数を読み取る線形な測定器**を見ると構造が急に見やすくなることがあります。

たとえば
$$
W=\{(x,y,z)\in\mathbb R^3:x+2y-z=0\}
$$
という平面は、ベクトルを並べて記述する代わりに
$$
\varphi(x,y,z)=x+2y-z
$$
という1本の線形な測定器の「値が0になる場所」としても記述できます。

この章では、まず具体的な測定器を触り、そこから

> 線形形式 → 代数的双対 → 双対基底 → 零化空間→ 双対写像 → 二重双対

を組み立てます。定義を覚えることではなく、**「何を測っているのか」「なぜ反対向きの写像が出るのか」**を追うのが目的です。

---

## 1. まず「線形な測定器」を作る

$V=\mathbb R^3$ とし
$$
\varphi(x,y,z)=x+2y-z
$$
とします。任意の $u,v\in V$ と $a,b\in\mathbb R$ に対して
$$
\varphi(au+bv)=a\varphi(u)+b\varphi(v)
$$
です。入力はベクトルですが、出力はスカラーです。

この型の写像を一般化します。

<a id="def-la3a-linear-form"></a>
<!-- formal-statement-start -->
> **定義（線形形式）**  
> $\mathbb F=\mathbb R$ または $\mathbb C$ とし、$V$ を $\mathbb F$ 上のベクトル空間とする。線形写像
$$
\varphi:V\to\mathbb F
$$
> を **線形形式** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3a-linear-form -->
**定義の確認**：章頭の

$
\varphi(x,y,z)=x+2y-z
$

について、$u=(u_1,u_2,u_3)$、$v=(v_1,v_2,v_3)$ とすると

$
\begin{aligned}
\varphi(au+bv)
&=a(u_1+2u_2-u_3)+b(v_1+2v_2-v_3)\\
&=a\varphi(u)+b\varphi(v).
\end{aligned}
$

従って $\varphi:\mathbb R^3\to\mathbb R$ は線形形式です。
<!-- definition-example-end -->

線形形式は足し算とスカラー倍ができます。そこで全部まとめます。

<a id="def-la3a-dual-space"></a>
<!-- formal-statement-start -->
> **定義（代数的双対）**  
> $V$ 上の線形形式全体
$$
V^*=\{\varphi:V\to\mathbb F:\varphi\text{ は線形}\}
$$
> を $V$ の **代数的双対** という。加法とスカラー倍は点ごとに定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3a-dual-space -->
**定義の確認**：$\varphi,\psi\in V^*$ と $a,b\in\mathbb F$ に対して

$
(a\varphi+b\psi)(x):=a\varphi(x)+b\psi(x)
$

と定めます。$x,y\in V$ と $\alpha,\beta\in\mathbb F$ に対し

$
\begin{aligned}
(a\varphi+b\psi)(\alpha x+\beta y)
&=a\varphi(\alpha x+\beta y)+b\psi(\alpha x+\beta y)\\
&=\alpha\{a\varphi(x)+b\psi(x)\}
 +\beta\{a\varphi(y)+b\psi(y)\}\\
&=\alpha(a\varphi+b\psi)(x)+\beta(a\varphi+b\psi)(y).
\end{aligned}
$

従って $a\varphi+b\psi$ も線形形式です。零写像が零元、$-\varphi$ が加法逆元となり、残りのベクトル空間公理も各 $x\in V$ での $\mathbb F$ の等式に帰着します。よって $V^*$ 自身がベクトル空間になります。
<!-- definition-example-end -->

### 座標では何に見えるか

$V=\mathbb R^n$ なら、任意の $a\in\mathbb R^n$ に対して
$$
\varphi_a(x)=a^{\mathsf T}x
$$
は線形形式です。

逆に $\varphi\in(\mathbb R^n)^*$ とし、標準基底を $e_1,\dots,e_n$ とします。
$$
a_i=\varphi(e_i)
$$
と置けば、$x=\sum_i x_i e_i$ に対して
$$
\varphi(x)=\sum_i x_i\varphi(e_i)=\sum_i a_ix_i=a^{\mathsf T}x.
$$
したがって有限次元の標準座標では、線形形式は「行ベクトルとの積」として見えます。

ただし重要なのは行ベクトルそのものではありません。**基底を選ばなくても存在する写像 $V\to\mathbb F$ が本体**です。

---

## 2. 座標を読む関数：双対基底

標準基底なら $x_1,x_2,\dots$ を読む関数はすぐ書けます。しかし基底が
$$
v_1=(1,1)^T,\qquad v_2=(1,-1)^T
$$
ならどうでしょうか。

$x=av_1+bv_2$ と書いたとき、係数 $a$ だけを返す関数、$b$ だけを返す関数が欲しくなります。これが双対基底です。

<a id="def-la3a-dual-basis"></a>
<!-- formal-statement-start -->
> **定義（双対基底）**  
> $V$ の基底 $e_1,\dots,e_n$ に対して
$$
e^i(e_j)=\delta_{ij}
$$
> を満たす線形形式 $e^1,\dots,e^n\in V^*$ を **双対基底** という。
<!-- formal-statement-end -->

つまり $e^i$ は「第 $i$ 座標だけを読む関数」です。

双対基底について必要なのは、座標を読む関数が本当に一意に作れ、しかもその関数たち自身が $V^*$ の基底になることです。構成は「各ベクトルの一意な座標表示から、第 $i$ 座標を取り出す」とすればよく、その後に生成性と一次独立性を確認します。

<a id="thm-la3a-dual-basis"></a>
<!-- formal-statement-start -->
> **定理（双対基底定理）**  
> 有限次元ベクトル空間 $V$ の任意の基底 $e_1,\dots,e_n$ に対して双対基底 $e^1,\dots,e^n$ が一意に存在し、これは $V^*$ の基底である。特に
$$
\dim V^*=\dim V.
$$
<!-- formal-statement-end -->

### 証明の見取り図

基底表示

$$
x=\sum_jx_je_j
$$

の第 $i$ 係数を返す写像を $e^i$ と定めます。まずこれが線形形式であることを確認し、次に条件 $e^i(e_j)=\delta_{ij}$ が一意性を決めることを示します。最後に、任意の $\varphi\in V^*$ が値 $\varphi(e_j)$ を係数として $e^j$ の線形結合に展開できることを示します。

<!-- proof-start -->
### 証明

任意の $x\in V$ は一意に
$$
x=\sum_{j=1}^n x_je_j
$$
と書けます。そこで
$$
e^i(x)=x_i
$$
と定めます。座標表示の一意性により、この定義は曖昧ではありません。

$x=\sum_jx_je_j$, $y=\sum_jy_je_j$ なら
$$
a x+b y=\sum_j(ax_j+by_j)e_j
$$
なので
$$
e^i(ax+by)=ax_i+by_i=ae^i(x)+be^i(y).
$$
よって $e^i$ は線形形式で、定義から $e^i(e_j)=\delta_{ij}$ です。

一意性も確認します。$f^i(e_j)=\delta_{ij}$ を満たす線形形式 $f^i$ があれば
$$
f^i(x)=\sum_jx_jf^i(e_j)=x_i=e^i(x)
$$
なので $f^i=e^i$ です。

次に任意の $\varphi\in V^*$ について
$$
\varphi(x)=\sum_jx_j\varphi(e_j)
=\sum_j\varphi(e_j)e^j(x),
$$
従って
$$
\varphi=\sum_j\varphi(e_j)e^j.
$$
よって $e^1,\dots,e^n$ は $V^*$ を張ります。

さらに
$$
\sum_i a_i e^i=0
$$
なら、$e_j$ を代入して
$$
0=\sum_i a_ie^i(e_j)=a_j.
$$
全ての $j$ で $a_j=0$ だから一次独立です。従って双対基底は $V^*$ の基底で
$$
\dim V^*=n=\dim V.
$$
$\square$
<!-- proof-end -->

<!-- definition-example-start: def-la3a-dual-basis -->
### 定義の確認：非標準基底の座標を読む

先ほどの
$$
v_1=(1,1)^T,\qquad v_2=(1,-1)^T
$$
について
$$
x=av_1+bv_2
$$
なら
$$
x_1=a+b,\qquad x_2=a-b.
$$
したがって
$$
a=\frac{x_1+x_2}{2},\qquad b=\frac{x_1-x_2}{2}.
$$
よって双対基底は
$$
v^1(x)=\frac{x_1+x_2}{2},\qquad
v^2(x)=\frac{x_1-x_2}{2}.
$$
「双対基底を求める」とは、結局 **その基底での座標を読む線形形式を求めること**です。
<!-- definition-example-end -->

---

## 3. 部分空間を方程式側から見る：零化空間

再び
$$
W=\{(x,y,z):x+2y-z=0\}
$$
を考えます。$W$ の全てのベクトルに対して0を返す線形形式は、$W$ を「方程式側」から記述しています。

<a id="def-la3a-零化空間"></a>
<!-- formal-statement-start -->
> **定義（零化空間）**  
> 部分空間 $W\subset V$ に対して
$$
W^\circ=\{\varphi\in V^*: \varphi(w)=0\ \forall w\in W\}
$$
> を $W$ の **零化空間（annihilator）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3a-零化空間 -->
**定義の確認**：$W=\operatorname{span}(e_1,e_2)\subset\mathbb R^3$ とします。標準双対基底 $e^1,e^2,e^3$ を使うと、一般の線形形式は

$
\varphi=a_1e^1+a_2e^2+a_3e^3
$

と書けます。$\varphi(e_1)=a_1$、$\varphi(e_2)=a_2$ なので、$W$ 上で常に0になるための必要十分条件は

$
a_1=a_2=0.
$

従って

$
W^\circ=\operatorname{span}(e^3).
$
<!-- definition-example-end -->
平面が2次元なら、それを切り出す独立な線形方程式は1本です。この感覚は一般に次元公式になります。

$W$ を消す線形形式が何個独立にあるかは、「$W$ の基底を $V$ の基底まで延長したとき、追加した方向が何個あるか」で数えられます。双対基底を使うと、その対応がそのまま式になります。

<a id="thm-la3a-零化空間-dimension"></a>
<!-- formal-statement-start -->
> **定理（零化空間の次元公式）**  
> $V$ を有限次元、$W\subset V$ を部分空間とすると
$$
\dim W^\circ=\dim V-\dim W=\dim(V/W).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W$ の基底 $e_1,\dots,e_r$ を $V$ の基底
$$
e_1,\dots,e_r,e_{r+1},\dots,e_n
$$
へ延長し、双対基底を $e^1,\dots,e^n$ とします。

任意の $\varphi\in V^*$ は
$$
\varphi=\sum_{i=1}^na_ie^i
$$
と一意に書けます。$\varphi$ が $W$ を消すなら
$$
0=\varphi(e_j)=a_j\qquad(j=1,\dots,r).
$$
逆に $a_1=\cdots=a_r=0$ なら、任意の $w=\sum_{j=1}^rc_je_j\in W$ に対して $\varphi(w)=0$ です。

従って
$$
W^\circ=\operatorname{span}(e^{r+1},\dots,e^n),
$$
したがって
$$
\dim W^\circ=n-r.
$$
[LA2 の商空間の次元公式](../LA2/index.md#thm-la2-quotient-dimension)から
$$
\dim(V/W)=n-r
$$
でもあるので結論を得ます。$\square$
<!-- proof-end -->

### 商空間の線形形式は、どこから来るのか

商空間 $V/W$ では $v$ と $v+w$（$w\in W$）を同じ点とみなします。したがって $V/W$ 上の線形形式を $V$ へ戻すと、$W$ の方向は必ず0にならなければなりません。

<a id="thm-la3a-quotient-dual-零化空間"></a>
<!-- formal-statement-start -->
> **定理（商空間の双対と零化空間）**  
> $V$ をベクトル空間、$W\subset V$ を部分空間とし、$q:V\to V/W$, $q(v)=v+W$ を標準射影とする。このとき
$$
\Phi_q:(V/W)^*\to W^\circ,\qquad \Phi_q(\psi)=\psi\circ q
$$
> は線形同型である。従って
$$
(V/W)^*\cong W^\circ.
$$
<!-- formal-statement-end -->

### 証明の見取り図

商空間上の線形形式 $\psi$ を $q$ と合成すれば、$W$ は $q$ で0へ送られるため $W$ を消す線形形式が得られます。逆向きには、$\varphi\in W^\circ$ から

$$
v+W\longmapsto\varphi(v)
$$

を作ります。核心は、この値が剰余類の代表元によらないことです。

<!-- proof-start -->
### 証明

$\psi\in(V/W)^*$ と $w\in W$ に対して $q(w)=0$ なので
$$
(\Phi_q(\psi))(w)=\psi(q(w))=0.
$$
従って $\Phi_q(\psi)\in W^\circ$ です。

逆向きを具体的に作ります。$\varphi\in W^\circ$ に対して
$$
\widetilde\varphi(v+W)=\varphi(v)
$$
と置きます。$v+W=v'+W$ なら $v-v'\in W$ なので
$$
\varphi(v)-\varphi(v')=\varphi(v-v')=0.
$$
よって代表元によらず良定義です。また
$$
\widetilde\varphi(a(v+W)+b(u+W))
=\varphi(av+bu)
=a\varphi(v)+b\varphi(u)
$$
なので線形です。

$R(\varphi)=\widetilde\varphi$ と書けば
$$
(\Phi_q R(\varphi))(v)=R(\varphi)(v+W)=\varphi(v),
$$
また
$$
(R(\Phi_q(\psi)))(v+W)=(\Phi_q(\psi))(v)=\psi(v+W).
$$
従って $\Phi_q R=I$ かつ $R\Phi_q=I$ で、$\Phi_q$ は同型です。$\square$
<!-- proof-end -->

ここでは「次元が同じだから同型」と済ませず、**商空間の代表元から写像を作り、良定義性まで確認した**ことが核心です。

---

## 4. 写像を通して測定器を引き戻す：双対写像

$T:V\to W$ があり、$W$ 側に測定器 $\psi:W\to\mathbb F$ があるとします。$v\in V$ を測りたければ
$$
v\xmapsto{T}Tv\xmapsto{\psi}\psi(Tv)
$$
とすればよい。つまり $\psi\circ T$ が $V$ 上の線形形式になります。

<a id="def-la3a-dual-map"></a>
<!-- formal-statement-start -->
> **定義（双対写像）**  
> 線形写像 $T:V\to W$ に対し
$$
T^*:W^*\to V^*,\qquad T^*(\psi)=\psi\circ T
$$
> を双対写像という。
<!-- formal-statement-end -->

前節の $\Phi_q$ は、ここで $T=q$ としたときの双対写像 $q^*$ を、値域を $W^\circ$ に制限して見たものです。したがって商空間と零化空間の同型は、双対写像が「測定器を手前へ引き戻す」ことの最初の具体例でもあります。

<!-- definition-example-start: def-la3a-dual-map -->
**定義の確認**：$T:\mathbb R^2\to\mathbb R^2$ を

$
T(x,y)=(x+y,y)
$

とし、$\psi(u,v)=2u-v$ とします。このとき

$
\begin{aligned}
(T^*\psi)(x,y)
&=\psi(T(x,y))\\
&=\psi(x+y,y)\\
&=2(x+y)-y\\
&=2x+y.
\end{aligned}
$

つまり出力側の測定器 $\psi$ を $T$ の前へ合成すると、入力側の線形形式 $2x+y$ が得られます。
<!-- definition-example-end -->

ここで向きが
$$
V\xrightarrow{T}W
\qquad\text{に対して}\qquad
W^*\xrightarrow{T^*}V^*
$$
と**反転する**ことが重要です。これは記号上の偶然ではなく、「$W$ 上の測定器を $V$ へ引き戻している」ためです。

基底 $e_1,\dots,e_n$ と $f_1,\dots,f_m$ を取り、$T$ の表現行列を $A=(A_{ij})$ とすると
$$
T(e_j)=\sum_iA_{ij}f_i.
$$
双対基底について
$$
(T^*f^i)(e_j)=f^i(T(e_j))=A_{ij},
$$
従って
$$
T^*f^i=\sum_jA_{ij}e^j.
$$
よって $T^*$ の表現行列は $A^{\mathsf T}$ です。

### 核と像は零化空間でつながる

双対写像の核は「像を全部0と測る測定器」、双対写像の像は「核を全部0と測る測定器」になるはずです。前者は定義を直接ほどけば確認でき、後者はまず包含を示した後、有限次元性を使って両辺の次元が一致することから等号へ進めます。

双対写像と 零化空間は別々の定義ではなく、核と像を通じて直接つながります。

<a id="thm-la3a-dual-map-kernel-image"></a>
<!-- formal-statement-start -->
> **定理（双対写像の核・像と 零化空間）**  
> $V,W$ を有限次元ベクトル空間、$T:V\to W$ を線形写像とする。このとき

$$
\ker T^*=(\operatorname{im}T)^\circ,
\qquad
\operatorname{im}T^*=(\ker T)^\circ.
$$

> 特に

$$
\operatorname{rank}T^*=\operatorname{rank}T.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\psi\in W^*$ に対して
$$
\psi\in\ker T^*
\Longleftrightarrow
\psi(Tv)=0\quad(\forall v\in V)
\Longleftrightarrow
\psi|_{\operatorname{im}T}=0.
$$
従って
$$
\ker T^*=(\operatorname{im}T)^\circ.
$$

次に $T^*\psi=\psi\circ T$ は $v\in\ker T$ に対して
$$
(T^*\psi)(v)=\psi(Tv)=\psi(0)=0
$$
なので
$$
\operatorname{im}T^*\subset(\ker T)^\circ.
$$
ここで $T^*:W^*\to V^*$ に [階数・退化次数の定理](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)を適用すると

$$
\dim\operatorname{im}T^*
=\dim W^*-\dim\ker T^*.
$$

[双対基底定理](#thm-la3a-dual-basis)より $\dim W^*=\dim W$ です。また、すでに示した

$$
\ker T^*=(\operatorname{im}T)^\circ
$$

と [零化空間の次元公式](#thm-la3a-annihilator-dimension)から

$$
\dim(\operatorname{im}T)^\circ
=\dim W-\dim\operatorname{im}T.
$$

従って

$$
\begin{aligned}
\dim\operatorname{im}T^*
&=\dim W-\{\dim W-\dim\operatorname{im}T\}\\
&=\dim\operatorname{im}T\\
&=\operatorname{rank}T.
\end{aligned}
$$

一方、$T:V\to W$ に [階数・退化次数の定理](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)を適用し、さらに [零化空間の次元公式](#thm-la3a-annihilator-dimension)を使うと

$$
\dim(\ker T)^\circ
=\dim V-\dim\ker T
=\operatorname{rank}T.
$$
包含する2つの部分空間の次元が等しいので
$$
\operatorname{im}T^*=(\ker T)^\circ.
$$
同時に $\operatorname{rank}T^*=\operatorname{rank}T$ も得られました。$\square$
<!-- proof-end -->

ここで使ったのは線形性と双対基底だけで、複素共役を伴う構造は導入していません。したがって複素数上でも、双対写像の表現行列に現れるのは **共役転置ではなく単なる転置** です。

---

## 5. ベクトルは「測定器を測るもの」として戻ってくる

$v\in V$ を固定すると、任意の線形形式 $\varphi\in V^*$ に対して値 $\varphi(v)$ を返すことができます。つまり $v$ 自身が $V^*$ 上の線形形式を作ります。

<a id="thm-la3a-double-dual"></a>
<!-- formal-statement-start -->
> **定理（有限次元二重双対同型）**  
> 有限次元ベクトル空間 $V$ に対し
$$
J:V\to V^{**},\qquad J(v)(\varphi)=\varphi(v)
$$
> は基底の選択によらない線形同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\varphi,\psi\in V^*$ と $a,b\in\mathbb F$ に対して
$$
J(v)(a\varphi+b\psi)=a\varphi(v)+b\psi(v)
$$
なので $J(v)\in V^{**}$ です。また
$$
J(av+bw)(\varphi)=\varphi(av+bw)
=(aJ(v)+bJ(w))(\varphi)
$$
なので $J$ は線形です。

単射性を示します。$v\ne0$ とし、$v$ を含む基底
$$
v,v_2,\dots,v_n
$$
を取ります。その双対基底の第1要素を $v^1$ とすれば
$$
J(v)(v^1)=v^1(v)=1\ne0.
$$
従って $v\ne0$ なら $J(v)\ne0$ で、$J$ は単射です。

[双対基底定理](#thm-la3a-dual-basis)から
$$
\dim V^{**}=\dim V^*=\dim V.
$$
同次元有限次元空間の間の単射は全射でもあるので $J$ は同型です。

最後に、定義
$$
J(v)(\varphi)=\varphi(v)
$$
には基底が一切現れていません。基底を選んだのは単射性を証明するためだけです。従ってこの同型は、基底を選んで無理に作った同型ではなく標準的なものです。$\square$
<!-- proof-end -->

有限次元では $\dim V=\dim V^*$ なので $V\cong V^*$ となる同型も作れます。しかし一般には、その同型は基底などの追加の選択に依存します。これに対し
$$
J(v)(\varphi)=\varphi(v)
$$
で定まる $V\to V^{**}$ は、式そのものに基底の選択がなく自然です。この違いは、後で「双対」と「随伴」を混同しないためにも重要です。

---

## 6. 章全体を1枚でつなぐ

この章の対象は全部「測定器」という見方でつながります。

- $V^*$：$V$ をスカラーで測る線形な測定器全体。
- 双対基底：選んだ基底の各座標を1個ずつ読む測定器。
- $W^\circ$：部分空間 $W$ を全部0と判定する測定器。
- $T^*$：写像 $T$ の先にある測定器を手前へ引き戻す操作。
- $V^{**}$：測定器そのものを入力とする測定器。有限次元では $V$ が自然に戻ってくる。

定義名を別々に暗記するより、この一本の像を持っておく方が後続の関数解析でも崩れにくくなります。

---

## 7. 演習

### LA3A-A01 双対基底

$V=\mathbb R^2$ の基底
$$
v_1=(1,2)^T,\qquad v_2=(1,-1)^T
$$
に対する双対基底を求めよ。

<!-- solution-start -->
**解答**：$x=av_1+bv_2$ とすると
$$
x_1=a+b,\qquad x_2=2a-b.
$$
2式を足して
$$
a=\frac{x_1+x_2}{3},
$$
従って
$$
b=x_1-a=\frac{2x_1-x_2}{3}.
$$
よって
$$
v^1(x)=\frac{x_1+x_2}{3},\qquad
v^2(x)=\frac{2x_1-x_2}{3}.
$$
実際に $v^i(v_j)=\delta_{ij}$ を確認できます。
<!-- solution-end -->

### LA3A-A02 零化空間

$$
W=\{(x,y,z):x+y+z=0\}\subset\mathbb R^3
$$
の $W^\circ$ を求めよ。

<!-- solution-start -->
**解答**：$\varphi(x,y,z)=x+y+z$ と置けば $W=\ker\varphi$ なので
$$
\operatorname{span}(\varphi)\subset W^\circ.
$$
[零化空間の次元公式](#thm-la3a-零化空間-dimension)より $\dim W=2$ なら $\dim W^\circ=1$。従って
$$
W^\circ=\operatorname{span}(\varphi).
$$
<!-- solution-end -->

### LA3A-B01 商空間の双対

$\varphi\in V^*$ が $V/W$ 上の線形形式へ降りる、すなわち
$$
\widetilde\varphi(v+W)=\varphi(v)
$$
が 良定義 になるための必要十分条件が $\varphi\in W^\circ$ であることを示せ。

<!-- solution-start -->
**解答**：十分性は本文で示した通りです。逆に $\widetilde\varphi$ が 良定義 なら、任意の $w\in W$ について
$$
0+W=w+W
$$
なので
$$
\varphi(w)=\widetilde\varphi(w+W)=\widetilde\varphi(0+W)=\varphi(0)=0.
$$
従って $\varphi\in W^\circ$ です。
<!-- solution-end -->

### LA3A-B02 二重双対の自然性

$T:V\to W$ に対して
$$
T^{**}\circ J_V=J_W\circ T
$$
を示せ。

<!-- solution-start -->
**解答**：$v\in V$, $\psi\in W^*$ を任意に取ると
$$
\begin{aligned}
(T^{**}J_V(v))(\psi)
&=J_V(v)(T^*\psi)\\
&=(T^*\psi)(v)\\
&=\psi(Tv)\\
&=(J_W(Tv))(\psi).
\end{aligned}
$$
全ての $\psi$ で一致するので $T^{**}J_V(v)=J_W(Tv)$。全ての $v$ で成り立つから写像等式を得ます。
<!-- solution-end -->


### LA3A-A03 3次元の双対基底

$V=\mathbb R^3$ の基底
$$
v_1=(1,0,1)^T,\qquad
v_2=(1,1,0)^T,\qquad
v_3=(0,1,1)^T
$$
の双対基底 $v^1,v^2,v^3$ を、標準座標 $x=(x_1,x_2,x_3)^T$ を用いて求めよ。

<!-- solution-start -->
**解答**：$x=av_1+bv_2+cv_3$ と置くと
$$
x_1=a+b,\qquad x_2=b+c,\qquad x_3=a+c.
$$
従って
$$
a=\frac{x_1-x_2+x_3}{2},\quad
b=\frac{x_1+x_2-x_3}{2},\quad
c=\frac{-x_1+x_2+x_3}{2}.
$$
双対基底は各係数を読むので
$$
\boxed{
\begin{aligned}
v^1(x)&=\frac{x_1-x_2+x_3}{2},\\
v^2(x)&=\frac{x_1+x_2-x_3}{2},\\
v^3(x)&=\frac{-x_1+x_2+x_3}{2}.
\end{aligned}}
$$
実際、各 $v^i$ に $v_j$ を代入すると $v^i(v_j)=\delta_{ij}$ になります。
<!-- solution-end -->

### LA3A-A04 双対写像を具体的に計算する

$$
T:\mathbb R^2\to\mathbb R^3,\qquad
T(x,y)=(x+2y,\,3x-y,\,x)
$$
とし、$\psi\in(\mathbb R^3)^*$ を
$$
\psi(a,b,c)=2a-b+4c
$$
で定める。$T^*\psi$ を求め、標準基底で $T^*$ の表現行列が $T$ の表現行列の転置になることを確認せよ。

<!-- solution-start -->
**解答**：定義から
$$
\begin{aligned}
(T^*\psi)(x,y)
&=\psi(T(x,y))\\
&=2(x+2y)-(3x-y)+4x\\
&=3x+5y.
\end{aligned}
$$
一方
$$
[T]=
\begin{pmatrix}
1&2\\
3&-1\\
1&0
\end{pmatrix},
\qquad
[T]^\mathsf T=
\begin{pmatrix}
1&3&1\\
2&-1&0
\end{pmatrix}.
$$
$\psi$ の係数ベクトル $(2,-1,4)^T$ に $[T]^\mathsf T$ を掛けると
$$
\begin{pmatrix}1&3&1\\2&-1&0\end{pmatrix}
\begin{pmatrix}2\\-1\\4\end{pmatrix}
=
\begin{pmatrix}3\\5\end{pmatrix},
$$
確かに $3x+5y$ の係数と一致します。
<!-- solution-end -->

### LA3A-B03 $\operatorname{im}T^*$ と $(\ker T)^\circ$ を手で照合する

$$
T:\mathbb R^3\to\mathbb R^2,\qquad
T(x,y,z)=(x+y,\,y+z)
$$
について $\ker T$ と $\operatorname{im}T^*$ を求め、
$$
\operatorname{im}T^*=(\ker T)^\circ
$$
を座標計算で確認せよ。

<!-- solution-start -->
**解答**：$T(x,y,z)=0$ なら
$$
x=-y,\qquad z=-y,
$$
なので
$$
\ker T=\operatorname{span}\{(1,-1,1)^T\}.
$$
$\psi(u,v)=\alpha u+\beta v$ とすると
$$
(T^*\psi)(x,y,z)
=\alpha(x+y)+\beta(y+z)
=\alpha x+(\alpha+\beta)y+\beta z.
$$
従って $\operatorname{im}T^*$ は係数 $(a,b,c)$ が
$$
b=a+c
$$
を満たす線形形式全体です。一方、$ax+by+cz$ が $(1,-1,1)^T$ を消す条件は
$$
a-b+c=0,
$$
すなわち同じく $b=a+c$。従って両者は一致します。
<!-- solution-end -->

### LA3A-C01 二重 零化空間

$V$ を有限次元ベクトル空間、$W\subset V$ を部分空間とする。$W^\circ\subset V^*$ の 零化空間を
$$
(W^\circ)^\circ
=\{F\in V^{**}:F(\varphi)=0\ \text{for all }\varphi\in W^\circ\}
$$
と定める。上で定義した写像 $J:V\to V^{**}$ に対して
$$
\boxed{J(W)=(W^\circ)^\circ}
$$
を示せ。

<!-- solution-start -->
**解答**：まず $w\in W$ と $\varphi\in W^\circ$ なら
$$
J(w)(\varphi)=\varphi(w)=0
$$
なので
$$
J(W)\subset(W^\circ)^\circ.
$$
あとは次元を比較します。$J$ は単射なので
$$
\dim J(W)=\dim W.
$$
また $\dim V^*=\dim V=n$ と [零化空間の次元公式](#thm-la3a-零化空間-dimension)から
$$
\dim W^\circ=n-\dim W.
$$
これを $V^*$ の部分空間 $W^\circ$ にもう一度適用すると
$$
\dim(W^\circ)^\circ
=n-\dim W^\circ
=\dim W.
$$
包含する有限次元部分空間の次元が等しいため
$$
J(W)=(W^\circ)^\circ.
$$
「二回消すと元へ戻る」と言っても、厳密には $W\subset V$ と $(W^\circ)^\circ\subset V^{**}$ を写像 $J$ を通して同一視している点が重要です。
<!-- solution-end -->

---

## 8. 次に進む

次の [LA3B](../LA3B/index.md) では話題を切り替えます。行列式を公式集として使うのではなく、**面積・体積倍率に欲しい性質から出発し、Leibniz 公式で一般の $n\times n$ 行列式を構成**します。