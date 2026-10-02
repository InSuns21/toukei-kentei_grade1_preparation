# F0-00E ベクトル空間・基底

この講義では、行列計算の背後にある線形代数の構造を最初から組み立てます。

F0-00では「行列式や固有値を計算できる」ことを優先しましたが、ここから先の関数解析ではそれだけでは足りません。有限次元・無限次元、基底、線形写像、表現行列を扱うために、まず

**ベクトル空間 → 部分空間 → 線形包 → 一次独立 → 基底 → 次元**

を定義から通します。

---

## 1. ベクトル空間とは何か

<a id="def-f0-00e-vector-space"></a>

<!-- formal-statement-start -->
> **定義（実ベクトル空間）**  
> 集合 $V$ に加法 $V\times V\to V$ と実数によるスカラー倍 $\mathbb R\times V\to V$ が定義され、任意の $x,y,z\in V$ と $a,b\in\mathbb R$ に対して次を満たすとき、$V$ を **実ベクトル空間** といいます。
>
> 1. $x+y=y+x$
> 2. $(x+y)+z=x+(y+z)$
> 3. $x+0=x$ となる零ベクトル $0\in V$ がある
> 4. $x+(-x)=0$ となる逆元 $-x\in V$ がある
> 5. $a(x+y)=ax+ay$
> 6. $(a+b)x=ax+bx$
> 7. $(ab)x=a(bx)$
> 8. $1x=x$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-vector-space -->
**定義の確認**

### 1.1 多項式全体でベクトル空間の条件を確かめる

2次以下の多項式全体

$
P_2=\{a+bx+cx^2:a,b,c\in\mathbb R\}
$

に、通常の多項式の加法と実数倍を入れます。$p,q,r\in P_2$、$\alpha,\beta\in\mathbb R$ とします。

$p+q$ と $\alpha p$ は再び2次以下なので、演算は $P_2$ の中で閉じています。また多項式の係数を比較すれば

$
p+q=q+p,
\qquad
(p+q)+r=p+(q+r)
$

が成り立ち、零多項式が零ベクトル、$-p$ が加法逆元です。さらに

$
\alpha(p+q)=\alpha p+\alpha q,
\qquad
(\alpha+\beta)p=\alpha p+\beta p,
$

$
(\alpha\beta)p=\alpha(\beta p),
\qquad
1p=p
$

も係数ごとに成り立ちます。

したがって定義の8条件をすべて満たし、$P_2$ は実ベクトル空間です。
<!-- definition-example-end -->

この定義で重要なのは、**ベクトルが数の縦並びである必要はない**ことです。

典型例は

$$
\mathbb R^n
$$

ですが、たとえば2次以下の多項式全体

$$
P_2
=
\{a+bx+cx^2:a,b,c\in\mathbb R\}
$$

もベクトル空間です。

さらに関数全体の集合も、条件を適切に入れればベクトル空間になります。関数解析では「関数そのものをベクトルとして扱う」ので、この抽象化が必要になります。

---

## 2. 部分空間

ベクトル空間の中から一部のベクトルだけを取り出して計算したいとき、加法やスカラー倍を行うたびに集合の外へ出てしまうと、同じ線形代数をその集合の中だけで続けられません。そこで、**線形演算に対して閉じた部分集合**を区別します。

<a id="def-f0-00e-linear-subspace"></a>

<!-- formal-statement-start -->
> **定義（線形部分空間）**  
> ベクトル空間 $V$ の部分集合 $W\subset V$ が、$V$ と同じ加法とスカラー倍についてベクトル空間になるとき、$W$ を $V$ の **線形部分空間** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-linear-subspace -->
**定義の確認**

### 2.1 平面 $x+y+z=0$ は線形部分空間

$
W=\{(x,y,z)\in\mathbb R^3:x+y+z=0\}
$

とします。$0=(0,0,0)\in W$ なので $W$ は空ではありません。

$u=(x_1,y_1,z_1),v=(x_2,y_2,z_2)\in W$ と $a,b\in\mathbb R$ に対し、

$
x_1+y_1+z_1=0,
\qquad
x_2+y_2+z_2=0.
$

したがって $au+bv$ の成分の和は

$
a(x_1+y_1+z_1)+b(x_2+y_2+z_2)=0.
$

よって $au+bv\in W$ です。加法とスカラー倍に閉じているので、$W$ は $\mathbb R^3$ の線形部分空間です。
<!-- definition-example-end -->

実際の判定では、次の条件で十分です。

<a id="prop-f0-00e-subspace-test"></a>

<!-- formal-statement-start -->
> **命題（部分空間判定法）**  
> 空でない集合 $W\subset V$ が部分空間であるための必要十分条件は、任意の $u,v\in W$ と $a,b\in\mathbb R$ に対して

$$
au+bv\in W
$$

> が成り立つことです。
<!-- formal-statement-end -->

### 例1：部分空間になる

$$
W
=
\{(x,y,z)\in\mathbb R^3:x+y+z=0\}
$$

とします。

$u=(x_1,y_1,z_1)$、$v=(x_2,y_2,z_2)$ が $W$ に属するなら

$$
x_1+y_1+z_1=0,
\qquad
x_2+y_2+z_2=0.
$$

したがって

$$
a(x_1+y_1+z_1)+b(x_2+y_2+z_2)=0
$$

なので $au+bv\in W$ です。

### 例2：部分空間にならない

$$
\{(x,y,z):x+y+z=1\}
$$

は原点を含みません。したがって部分空間ではありません。

---

## 3. 線形結合と線形包

有限次元では $v_1,\dots,v_k$ のようにベクトルを有限本並べれば十分でした。一般のベクトル空間では、候補集合 $S\subseteq V$ が無限集合でも扱える形にしておく必要があります。

ここで重要なのは、**$S$ 自体が無限でも、一つの線形結合に実際に現れるベクトルは有限個だけ**という点です。無限個の項を足し合わせる操作はまだ使いません。

<a id="def-f0-00e-linear-combination-span"></a>

<!-- formal-statement-start -->
> **定義（線形結合と線形包）**  
> ベクトル空間 $V$ の部分集合 $S\subseteq V$ に対し、$S$ から有限個のベクトル $v_1,\dots,v_k$ と係数 $a_1,\dots,a_k\in\mathbb R$ を選んで作る $a_1v_1+\cdots+a_kv_k$ を **線形結合** という。$S$ の有限線形結合すべてと零ベクトルを集めた集合を $\operatorname{span}(S)$ と書き、$S$ の **線形包** という。
<!-- formal-statement-end -->

したがって

$
\operatorname{span}(S)

<!-- definition-example-start: def-f0-00e-linear-combination-span -->
**定義の確認**

### 3.1 二つのベクトルの線形包を直接求める

$
v_1=(1,0,1),
\qquad
v_2=(0,1,1)
$

とします。有限線形結合は

$
av_1+bv_2=(a,b,a+b)
$

なので、得られるベクトルは必ず $z=x+y$ を満たします。

逆に $(x,y,z)$ が $z=x+y$ を満たせば、

$
(x,y,z)=xv_1+yv_2.
$

したがって

$
\operatorname{span}\{v_1,v_2\}
=
\{(x,y,z)\in\mathbb R^3:z=x+y\}.
$

これは「$v_1,v_2$ の有限線形結合をすべて集める」という定義を直接使った計算です。
<!-- definition-example-end -->

したがって

$
\operatorname{span}(S)
=
\{0\}
\cup
\left\{
\sum_{i=1}^k a_iv_i:
k\ge1,\ 
v_i\in S,\ 
a_i\in\mathbb R
\right\}.
$$

これは $S$ を含む最小の線形部分空間です。

$S=\{v_1,\dots,v_k\}$ が有限集合なら、従来どおり

$$
\operatorname{span}(v_1,\dots,v_k)
$$

とも書きます。

### 3.1 有限集合の例

$$
v_1=(1,0,1),
\qquad
v_2=(0,1,1)
$$

なら

$$
av_1+bv_2=(a,b,a+b),
$$

したがって

$$
\operatorname{span}\{v_1,v_2\}
=
\{(x,y,z)\in\mathbb R^3:z=x+y\}.
$$

### 3.2 無限集合でも各ベクトルは有限和で作る

多項式空間

$$
\mathbb R[x]
$$

で

$$
S=\{1,x,x^2,x^3,\dots\}
$$

とします。

任意の多項式

$$
p(x)=a_0+a_1x+\cdots+a_nx^n
$$

は $S$ の有限個の元の線形結合です。したがって

$$
\operatorname{span}(S)=\mathbb R[x].
$$

$S$ は無限集合ですが、一つの多項式を表すのに無限和は必要ありません。

---

## 4. 一次独立・一次従属

無限集合 $S$ の一次独立性も、「有限個を取り出したときに余分な関係がない」という形で定義します。

<a id="def-f0-00e-linear-independence"></a>

<!-- formal-statement-start -->
> **定義（一次独立・一次従属）**  
> 部分集合 $S\subseteq V$ が **一次独立** であるとは、$S$ から相異なる有限個 $v_1,\dots,v_k$ と係数 $a_1,\dots,a_k\in\mathbb R$ を任意に取ったとき、

$$
a_1v_1+\cdots+a_kv_k=0
\quad\Longrightarrow\quad
a_1=\cdots=a_k=0
$$

> が成り立つことをいう。一次独立でない集合を **一次従属** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-linear-independence -->
**定義の確認**

### 4.1 標準基底の二本は一次独立

$\mathbb R^2$ で

$
e_1=(1,0),
\qquad
e_2=(0,1)
$

とします。

$
ae_1+be_2=0
$

なら左辺は $(a,b)$ なので、

$
(a,b)=(0,0).
$

従って $a=b=0$ です。非自明な有限線形関係が存在しないため、$\{e_1,e_2\}$ は定義どおり一次独立です。
<!-- definition-example-end -->

この定義から、$S$ が一次独立であることと、$S$ の任意の有限部分集合が一次独立であることは同じです。

有限集合 $S=\{v_1,\dots,v_k\}$ では、以前の「$a_1v_1+\cdots+a_kv_k=0$ なら全係数が0」という判定に戻ります。

一次独立とは、生成に使うベクトルの間に有限な冗長性がないことです。

---

<a id="ref-basis-dimension"></a>

## 5. 基底と座標

線形包と一次独立を任意集合へ拡張したので、基底も有限次元に限定せず定義できます。

<a id="def-f0-00e-basis"></a>

<!-- formal-statement-start -->
> **定義（基底）**  
> ベクトル空間 $V$ の部分集合 $B\subseteq V$ が $\operatorname{span}(B)=V$ を満たし、かつ一次独立であるとき、$B$ を $V$ の **基底** という。この代数的な基底を **Hamel 基底** とも呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-basis -->
**定義の確認**

### 5.1 $\mathbb R^2$ の標準基底

$
B=\{e_1,e_2\}
=
\{(1,0),(0,1)\}
$

とします。任意の $(x,y)\in\mathbb R^2$ は

$
(x,y)=xe_1+ye_2
$

と書けるので

$
\operatorname{span}(B)=\mathbb R^2.
$

また前節で確認したように $B$ は一次独立です。したがって「空間全体を張る」と「一次独立」の二条件を満たし、$B$ は $\mathbb R^2$ の基底です。
<!-- definition-example-end -->

基底 $B$ を固定すると、任意の $x\in V$ は **有限個の基底ベクトル**を使って一意に表せます。

実際、$\operatorname{span}(B)=V$ なので有限表示は存在します。二つの有限表示があれば、差を取ると $B$ の有限個の元の間に線形関係ができ、一次独立性から係数は一致します。

有限次元で順序付き基底

$$
\mathcal B=(v_1,\dots,v_n)
$$

を選んだ場合は、係数を縦に並べたものを次のように定義します。

<a id="def-f0-00e-coordinate-vector"></a>

<!-- formal-statement-start -->
> **定義（座標ベクトル）**  
> 有限次元ベクトル空間の順序付き基底 $\mathcal B=(v_1,\dots,v_n)$ に対し、$x\in V$ を一意に

$$
x=c_1v_1+\cdots+c_nv_n
$$

> と表す。このとき

$$
[x]_{\mathcal B}
=
(c_1,\dots,c_n)^T
$$

> を $\mathcal B$ に関する $x$ の **座標ベクトル** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-coordinate-vector -->
**定義の確認**

### 5.2 順序付き基底に対する座標

$\mathbb R^2$ の順序付き基底

$
\mathcal B=((1,0),(1,1))
$

と $x=(3,2)$ を考えます。

$
(3,2)
=
1(1,0)+2(1,1)
$

なので、定義に従って係数を順に並べれば

$
[x]_{\mathcal B}
=
\begin{pmatrix}
1\\
2
\end{pmatrix}.
$

基底の順序を入れ替えれば係数を並べる順序も変わるため、座標ベクトルは「どの順序付き基底を選んだか」に依存します。
<!-- definition-example-end -->

この「基底を選ぶと抽象ベクトルを係数で記述できる」という事実が、後続の表現行列の土台です。

---

## 6. 交換補題：なぜ基底の本数は同じなのか

「次元」を基底の本数として定義するには、どの基底を選んでも本数が同じであることを示す必要があります。

その核心が次の交換補題です。

<a id="lem-steinitz-exchange"></a>

<!-- formal-statement-start -->
> **補題（Steinitzの交換補題）**  
> $V$ が $n$ 本のベクトル $v_1,\dots,v_n$ で張られているとします。$u_1,\dots,u_m$ が一次独立なら

$$
m\le n.
$$
<!-- formal-statement-end -->

### 証明の考え方

$u_1$ は $v_1,\dots,v_n$ の線形結合で表せます。$u_1\ne0$ なので、少なくとも一つの係数は0でありません。その $v_j$ を $u_1$ と交換しても、空間全体を張る性質は失われません。

次に $u_2$ を入れ、さらに別の $v_j$ と交換します。

一次独立性により、$u_2$ を入れる段階で $u_1$ を捨てる必要はありません。

この操作を繰り返すと、$m$ 本の一次独立なベクトルを、もとの $n$ 本の生成系の中へ1本ずつ入れられます。したがって $m>n$ は不可能です。

---

## 7. 次元は基底の選び方によらない

$V$ が有限本のベクトルで張られるとします。

基底

$$
\mathcal B=(v_1,\dots,v_n),
\qquad
\mathcal C=(w_1,\dots,w_m)
$$

を二つ取ります。

$\mathcal B$ は $V$ を張り、$\mathcal C$ は一次独立なので交換補題から

$$
m\le n.
$$

逆に $\mathcal C$ は $V$ を張り、$\mathcal B$ は一次独立なので

$$
n\le m.
$$

したがって

$$
n=m.
$$

よって有限次元空間では、**どの基底も同じ本数を持ちます**。

<a id="def-f0-00e-dimension"></a>

<!-- formal-statement-start -->
> **定義（次元）**  
> 有限次元ベクトル空間 $V$ の基底に含まれるベクトルの本数を $V$ の **次元** といい、

$$
\dim V
$$

> と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-dimension -->
**定義の確認**

### 7.1 $\mathbb R^2$ の次元

標準基底

$
\{(1,0),(0,1)\}
$

は2本のベクトルからなります。前節の交換補題により、有限次元空間ではどの基底を選んでも本数は同じです。

したがって定義から

$
\dim\mathbb R^2=2.
$

「基底の本数」が基底の選び方に依存しないことを先に示したので、この数を空間そのものの次元として定義できます。
<!-- definition-example-end -->

---

## 8. 次元から直ちに分かること

$\dim V=n$ とします。

### 一次独立なベクトルは高々 $n$ 本

交換補題より、一次独立なベクトル族の本数は $n$ を超えません。

### $n$ 本の一次独立なベクトルは自動的に基底

$n$ 本の一次独立なベクトルが $V$ 全体を張らないと仮定すると、それらを含むより大きい一次独立系を作れてしまい、$n$ 本を超えます。矛盾です。

### $n$ 本で $V$ を張れば自動的に基底

もし一次従属なら1本を捨てても同じ空間を張れるので、$n-1$ 本で $V$ を張れてしまいます。しかし基底は $n$ 本必要です。矛盾です。

---

## 9. 基底延長定理

有限次元空間では、一次独立なベクトル族

$$
u_1,\dots,u_r
$$

を必ず $V$ の基底へ延長できます。

<a id="thm-basis-extension"></a>

<!-- formal-statement-start -->
> **定理（基底延長定理）**  
> $u_1,\dots,u_r$ が有限次元ベクトル空間 $V$ で一次独立なら、ある $v_{r+1},\dots,v_n$ が存在して

$$
u_1,\dots,u_r,v_{r+1},\dots,v_n
$$

> が $V$ の基底になります。
<!-- formal-statement-end -->

### 理由

まだ $V$ 全体を張っていなければ、現在の線形包の外にあるベクトルを1本追加します。すると一次独立性は保たれます。

有限次元では一次独立なベクトルは高々 $\dim V$ 本なので、この追加操作は有限回で止まり、そのとき全体を張ります。

この定理は次講で $\ker T$ の基底を $V$ の基底へ延長して rank-nullity theorem を証明するときに使います。

---

<a id="thm-f0-00e-hamel-basis-existence"></a>

## 10. 一般のベクトル空間にも Hamel 基底が存在する

有限次元の基底延長では、一次独立なベクトルの本数が $\dim V$ を超えられないため、「線形包の外から1本ずつ追加する」操作は有限回で止まりました。

無限次元では、その停止回数を自然数で押さえられません。そこで [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使い、**一次独立集合をこれ以上追加できないところまで一度に極大化**します。

<!-- formal-statement-start -->
> **定理（Hamel 基底の存在）**  
> 任意の実ベクトル空間 $V$ は Hamel 基底を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

### 10.1 Zorn を適用する候補集合

$V$ の一次独立部分集合全体を

$$
P
=
\{S\subseteq V:S\text{ は一次独立}\}
$$

とし、包含関係 $\subseteq$ で順序付けます。空集合は一次独立なので $P$ は空ではありません。

### 10.2 一次独立集合の鎖の合併は一次独立

$\Gamma\subseteq P$ を包含関係についての鎖とし、

$$
U=\bigcup_{S\in\Gamma}S
$$

と置きます。

$U$ から相異なる有限個

$$
v_1,\dots,v_k
$$

を取り、

$$
a_1v_1+\cdots+a_kv_k=0
$$

とします。

各 $v_i$ はある $S_i\in\Gamma$ に属します。$\Gamma$ は包含関係について鎖で、$S_1,\dots,S_k$ は有限個なので、この中に全てを含む集合 $S_*\in\Gamma$ があります。したがって

$$
v_1,\dots,v_k\in S_*.
$$

$S_*$ は一次独立なので

$$
a_1=\cdots=a_k=0.
$$

よって $U$ は一次独立であり $U\in P$ です。さらに各 $S\in\Gamma$ について $S\subseteq U$ なので、$U$ は $\Gamma$ の上界です。

### 10.3 極大一次独立集合は空間全体を張る

[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)より、$P$ は極大元 $B$ を持ちます。つまり $B$ は極大一次独立集合です。

もし

$$
\operatorname{span}(B)\ne V
$$

なら

$$
x\in V\setminus\operatorname{span}(B)
$$

を一つ取れます。

$B\cup\{x\}$ が一次独立であることを確認します。有限個 $b_1,\dots,b_m\in B$ と係数について

$$
a x+a_1b_1+\cdots+a_mb_m=0
$$

とします。

もし $a\ne0$ なら

$$
x
=
-\frac1a
\left(
a_1b_1+\cdots+a_mb_m
\right)
\in
\operatorname{span}(B),
$$

となり $x$ の選び方に矛盾します。したがって $a=0$ です。残りは $B$ の一次独立性から

$$
a_1=\cdots=a_m=0.
$$

よって $B\cup\{x\}$ は一次独立です。これは $B$ の極大性に反します。

したがって

$$
\operatorname{span}(B)=V.
$$

$B$ は一次独立かつ $V$ を張るので、定義より Hamel 基底です。$\square$
<!-- proof-end -->

この証明で [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使う場所は、F0-00A3 の4段階そのものです。

$$
\boxed{
\text{一次独立集合}
\to
\text{包含順序}
\to
\text{鎖の合併}
\to
\text{極大一次独立集合}
\to
\text{Hamel 基底}
}
$$

---

## 11. 部分空間の和と直和

二つの部分空間 $U,W$ を同時に使って大きな部分空間を作るとき、$u+w$ という表示が一意かどうかが重要になります。交わりが零ベクトルだけなら、二つの成分を混同せずに分解できます。この違いを「和」と「直和」として定義します。

<a id="def-f0-00e-sum-direct-sum"></a>

<!-- formal-statement-start -->
> **定義（部分空間の和・直和）**  
> 部分空間 $U,W\subset V$ に対して

$$
U+W=\{u+w:u\in U,\ w\in W\}
$$

> を **部分空間の和** といいます。さらに $U\cap W=\{0\}$ のとき、各元の表示 $u+w$ は一意になり、この和を **直和** といい $U\oplus W$ と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e-sum-direct-sum -->
**定義の確認**

### 11.1 座標軸の直和

$\mathbb R^2$ で

$
U=\{(x,0):x\in\mathbb R\},
\qquad
W=\{(0,y):y\in\mathbb R\}
$

とします。

任意の $(x,y)\in\mathbb R^2$ は

$
(x,y)=(x,0)+(0,y)
$

と書けるので $U+W=\mathbb R^2$ です。

また

$
U\cap W=\{(0,0)\}.
$

もし

$
u_1+w_1=u_2+w_2
$

なら $u_1-u_2=w_2-w_1$ は $U\cap W$ に属するので両辺は $0$ です。従って $u_1=u_2$, $w_1=w_2$ で、表示は一意です。

したがって定義より

$
\mathbb R^2=U\oplus W.
$
<!-- definition-example-end -->

有限次元では

$$
\dim(U+W)
=
\dim U+\dim W-\dim(U\cap W)
$$

が成り立ちます。

特に直和なら

$$
\dim(U\oplus W)
=
\dim U+\dim W.
$$

固有空間による分解や直交分解を理解するために、この言葉を使います。

---

## 12. 座標写像は線形同型

基底

$$
\mathcal B=(v_1,\dots,v_n)
$$

を固定すると

$$
\Phi_{\mathcal B}:V\to\mathbb R^n,
\qquad
x\mapsto[x]_{\mathcal B}
$$

は線形写像で、しかも1対1かつ全射です。

したがって

$$
V\cong\mathbb R^n
$$

です。

ただし重要なのは

> **同型だから同じものなのではなく、基底を選ぶことで座標表示できる**

という順序です。

行列はこの座標化の後に現れます。

---

## 13. 演習

### F0-00E-A01 線形包と一次独立

- Level: A
- 目安時間: 10分
- 主題: 有限集合の線形包

$v_1=(1,0,1)^T$, $v_2=(0,1,1)^T$ とする。

1. $x=(2,3,5)^T$ が $\operatorname{span}\{v_1,v_2\}$ に属することを示せ。
2. $\{v_1,v_2\}$ が一次独立であることを示せ。
3. $\operatorname{span}\{v_1,v_2\}$ の次元を求めよ。

<!-- solution-start -->
#### 詳細解答

任意の係数 $a,b$ に対して

$$
av_1+bv_2=(a,b,a+b)^T.
$$

$a=2$, $b=3$ とすれば

$$
2v_1+3v_2=(2,3,5)^T=x,
$$

なので $x\in\operatorname{span}\{v_1,v_2\}$ です。

次に

$$
av_1+bv_2=0
$$

とします。第1成分から $a=0$、第2成分から $b=0$ です。したがって $\{v_1,v_2\}$ は一次独立です。

よって $v_1,v_2$ は $\operatorname{span}\{v_1,v_2\}$ の基底であり、次元は

$$
2
$$

です。
<!-- solution-end -->

### F0-00E-A02 無限集合の線形包は有限線形結合で作る

- Level: A
- 目安時間: 10分
- 主題: 無限生成集合

$\mathbb R[x]$ で

$$
S=\{1,x,x^2,x^3,\dots\}
$$

とする。

1. $p(x)=2-3x+5x^4$ が $\operatorname{span}(S)$ に属することを示せ。
2. $\operatorname{span}(S)=\mathbb R[x]$ を示せ。
3. この主張で無限個の項を足し合わせる操作が不要な理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
p(x)=2\cdot1+(-3)x+5x^4
$$

なので、$S$ の3個の元の線形結合として表されています。したがって

$$
p\in\operatorname{span}(S).
$$

一般の多項式

$$
q(x)=a_0+a_1x+\cdots+a_nx^n
$$

も $1,x,\dots,x^n$ という有限個の $S$ の元の線形結合です。よって

$$
\mathbb R[x]\subseteq\operatorname{span}(S).
$$

逆に $S\subseteq\mathbb R[x]$ で、$\mathbb R[x]$ は線形結合に閉じているので

$$
\operatorname{span}(S)\subseteq\mathbb R[x].
$$

したがって両者は等しいです。

$S$ 自体は無限集合ですが、一つの多項式に現れる項は有限個なので、その表示に必要な $S$ の元も有限個です。Hamel 基底で使う線形包は有限線形結合だけを使います。
<!-- solution-end -->

### F0-00E-A03 Hamel 基底では各ベクトルの表示は有限

- Level: A
- 目安時間: 8分
- 主題: Hamel 基底の意味

$B$ をベクトル空間 $V$ の Hamel 基底とする。任意の $x\in V$ が $B$ の有限個の元の線形結合で表され、その表示が一意である理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

基底の定義から

$$
\operatorname{span}(B)=V.
$$

線形包は有限線形結合の全体として定義したので、任意の $x\in V$ には相異なる有限個 $b_1,\dots,b_k\in B$ と係数 $a_1,\dots,a_k$ が存在して

$$
x=a_1b_1+\cdots+a_kb_k
$$

と書けます。

二つの有限表示があると仮定します。両辺を移項し、両方に現れる基底ベクトルをまとめれば、$B$ の有限個の元について

$$
c_1u_1+\cdots+c_mu_m=0
$$

という関係を得ます。

$B$ は一次独立なので

$$
c_1=\cdots=c_m=0.
$$

したがって同じ基底ベクトルの係数は一致し、表示は一意です。
<!-- solution-end -->

### F0-00E-A04 一次従属な生成集合

- Level: A
- 目安時間: 10分
- 主題: 線形包と一次従属

$\mathbb R^3$ で

$$
S=\{e_1,e_2,e_1+e_2\}
$$

とする。

1. $S$ が一次従属であることを示せ。
2. $\operatorname{span}(S)=\operatorname{span}\{e_1,e_2\}$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
e_1+e_2-(e_1+e_2)=0
$$

は係数が全て0ではない線形関係です。したがって $S$ は一次従属です。

$\{e_1,e_2\}\subseteq S$ なので

$$
\operatorname{span}\{e_1,e_2\}
\subseteq
\operatorname{span}(S).
$$

一方、$S$ の第3の元 $e_1+e_2$ はすでに $\operatorname{span}\{e_1,e_2\}$ に属します。したがって $S$ の全ての元が $\operatorname{span}\{e_1,e_2\}$ に入り、

$$
\operatorname{span}(S)
\subseteq
\operatorname{span}\{e_1,e_2\}.
$$

よって両者は等しいです。
<!-- solution-end -->

### F0-00E-B01 基底延長と次元

- Level: B
- 目安時間: 15分
- 主題: 有限次元の基底延長

$V=\mathbb R^4$ とし

$$
u_1=(1,0,1,0)^T,
\qquad
u_2=(0,1,0,1)^T
$$

とする。

1. $u_1,u_2$ が一次独立であることを示せ。
2. この2本を $\mathbb R^4$ の基底へ延長するベクトルを2本具体的に与えよ。
3. 一次独立な5本のベクトルが $\mathbb R^4$ に存在しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$$
au_1+bu_2=0
$$

とすると、第1成分から $a=0$、第2成分から $b=0$ なので $u_1,u_2$ は一次独立です。

例えば

$$
e_3=(0,0,1,0)^T,
\qquad
e_4=(0,0,0,1)^T
$$

を追加します。

$$
au_1+bu_2+ce_3+de_4=0
$$

とすると、第1成分から $a=0$、第2成分から $b=0$、第3成分から $c=0$、第4成分から $d=0$ です。したがって4本は一次独立です。

$\mathbb R^4$ の次元は4なので、この4本は基底です。

また [Steinitz の交換補題](#lem-steinitz-exchange)から、4次元空間の一次独立集合は高々4本です。したがって一次独立な5本は存在しません。
<!-- solution-end -->

### F0-00E-B02 一次独立集合の鎖の合併

- Level: B
- 目安時間: 15分
- 主題: Hamel 基底存在証明の鎖上界

$V$ の一次独立部分集合全体を包含関係で順序付ける。$\Gamma$ がその鎖なら

$$
U=\bigcup_{S\in\Gamma}S
$$

が一次独立であることを示せ。

<!-- solution-start -->
#### 詳細解答

$U$ から相異なる有限個

$$
v_1,\dots,v_k
$$

を取り、

$$
a_1v_1+\cdots+a_kv_k=0
$$

とします。

各 $v_i$ について $v_i\in S_i$ となる $S_i\in\Gamma$ を取ります。$S_1,\dots,S_k$ は有限個で、$\Gamma$ は包含関係について鎖なので、この有限個の中に全てを含む最大のもの $S_*$ があります。

したがって

$$
v_1,\dots,v_k\in S_*.
$$

$S_*$ は一次独立なので

$$
a_1=\cdots=a_k=0.
$$

任意の有限線形関係が自明なので、$U$ は一次独立です。
<!-- solution-end -->

### F0-00E-B03 極大一次独立集合は空間を張る

- Level: B
- 目安時間: 15分
- 主題: Zorn 後の極大性

$B\subseteq V$ が包含関係について極大な一次独立集合であるとする。$\operatorname{span}(B)=V$ を示せ。

<!-- solution-start -->
#### 詳細解答

反対に

$$
\operatorname{span}(B)\ne V
$$

と仮定します。すると

$$
x\in V\setminus\operatorname{span}(B)
$$

を一つ取れます。

$B\cup\{x\}$ が一次独立であることを示します。$b_1,\dots,b_m\in B$ と係数について

$$
a x+a_1b_1+\cdots+a_mb_m=0
$$

とします。

もし $a\ne0$ なら

$$
x
=
-\frac1a
(a_1b_1+\cdots+a_mb_m)
\in
\operatorname{span}(B),
$$

となり $x$ の選び方に矛盾します。よって $a=0$ です。

すると

$$
a_1b_1+\cdots+a_mb_m=0
$$

であり、$B$ の一次独立性から $a_1=\cdots=a_m=0$ です。

したがって $B\cup\{x\}$ は一次独立で、$B$ を真に含みます。これは $B$ の極大性に反します。

よって

$$
\operatorname{span}(B)=V.
$$
<!-- solution-end -->

### F0-00E-C01 Zorn の補題から Hamel 基底を構成する

- Level: C
- 目安時間: 22分
- 主題: 一般ベクトル空間の基底存在

任意の実ベクトル空間 $V$ が Hamel 基底を持つことを [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使って証明せよ。候補集合・順序・鎖の上界・極大元の意味をすべて明示すること。

<!-- solution-start -->
#### 詳細解答

候補集合を

$$
P
=
\{S\subseteq V:S\text{ は一次独立}\}
$$

とし、包含関係で順序付けます。空集合は一次独立なので $P$ は非空です。

$\Gamma\subseteq P$ を包含関係についての鎖とし、

$$
U=\bigcup_{S\in\Gamma}S
$$

と置きます。

B02 の議論により、$U$ の任意の有限部分集合は鎖中の一つの一次独立集合に含まれるので、$U$ も一次独立です。したがって $U\in P$ であり、各 $S\in\Gamma$ を含むので $\Gamma$ の上界です。

よって $P$ の任意の鎖は上界を持ちます。[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)から、$P$ は極大元 $B$ を持ちます。つまり $B$ は極大一次独立集合です。

B03 の議論により、もし $\operatorname{span}(B)\ne V$ なら $x\in V\setminus\operatorname{span}(B)$ を追加して $B\cup\{x\}$ をより大きな一次独立集合にでき、極大性に矛盾します。

したがって

$$
\operatorname{span}(B)=V.
$$

$B$ は一次独立かつ $V$ を張るので、定義より Hamel 基底です。
<!-- solution-end -->

---

## 14. 次に進む

ここまでで、有限次元の基底・次元・座標に加え、一般のベクトル空間で Hamel 基底が存在するところまで準備しました。

次は線形写像を基底で座標化し、**表現行列・基底変換・相似・対角化**を構造として扱います。

**次：[F0-00F 線形写像・表現行列・基底変換・対角化](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)**
