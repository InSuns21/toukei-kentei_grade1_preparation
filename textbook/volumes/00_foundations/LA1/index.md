# LA1 標準線形代数 I：実・複素線形空間

[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) では実ベクトル空間を定義しました。標準的な線形代数では、同じ公理を複素数上でも使います。

この章では「ベクトル空間の公理をやり直す」のではなく、**スカラーをどこから取るか**で何が変わるかを整理します。

---

## 1. スカラー体を明示する

<a id="def-la1-real-complex-vector-space"></a>
<!-- formal-statement-start -->
> **定義（実・複素ベクトル空間）**  
> $\mathbb F$ を $\mathbb R$ または $\mathbb C$ とする。集合 $V$ が、加法 $V\times V\to V$ とスカラー倍 $\mathbb F\times V\to V$ についてベクトル空間の公理を満たすとき、$V$ を $\mathbb F$ 上のベクトル空間という。$\mathbb F=\mathbb R$ なら実ベクトル空間、$\mathbb F=\mathbb C$ なら複素ベクトル空間という。
<!-- formal-statement-end -->

公理の形は同じです。違いは、許される係数が
$$
\mathbb R\quad\text{か}\quad\mathbb C
$$
かです。

<!-- definition-example-start: def-la1-real-complex-vector-space -->
**定義の確認**：$V=\mathbb C^n$ で加法とスカラー倍を成分ごとに
$$
(z_1,\dots,z_n)+(w_1,\dots,w_n)
=(z_1+w_1,\dots,z_n+w_n),
$$
$$
\alpha(z_1,\dots,z_n)
=(\alpha z_1,\dots,\alpha z_n)
$$
と定めます。

$z_j,w_j,\alpha\in\mathbb C$ なら $z_j+w_j,\alpha z_j\in\mathbb C$ なので、和と複素数スカラー倍は $\mathbb C^n$ の中に留まります。例えば分配法則は各成分で
$$
\alpha(z_j+w_j)=\alpha z_j+\alpha w_j
$$
が成り立つため
$$
\alpha(z+w)=\alpha z+\alpha w.
$$
加法の結合則・交換則、零ベクトル、逆ベクトル、スカラー倍の結合則なども全て複素数の演算則を成分ごとに使えば成り立ちます。従って $\mathbb C^n$ は $\mathbb C$ 上のベクトル空間です。

同じ加法を使い、スカラーを実数 $a\in\mathbb R\subset\mathbb C$ に限定しても全ての公理は保たれます。従って同じ集合 $\mathbb C^n$ は $\mathbb R$ 上のベクトル空間としても見られます。ただし後で示すように次元は変わります。
<!-- definition-example-end -->

### スカラーを忘れることはできる

複素ベクトル空間 $V$ では、スカラー倍を実数 $a\in\mathbb R\subset\mathbb C$ に限定すれば実ベクトル空間として扱えます。これを **スカラー制限** と考えます。

逆方向は自動ではありません。実ベクトル空間に「$iv$ をどう定めるか」という追加構造がなければ複素ベクトル空間にはなりません。

---

## 2. 複素線形写像

<a id="def-la1-complex-linear-map"></a>
<!-- formal-statement-start -->
> **定義（複素線形写像）**  
> 複素ベクトル空間 $V,W$ の間の写像 $T:V\to W$ が、任意の $x,y\in V$ と $\alpha,\beta\in\mathbb C$ に対して
$$
T(\alpha x+\beta y)=\alpha T(x)+\beta T(y)
$$
> を満たすとき、$T$ を複素線形写像という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la1-complex-linear-map -->
**定義の確認**：固定した $a\in\mathbb C$ に対して
$$
T:\mathbb C\to\mathbb C,
\qquad
T(z)=az
$$
と置きます。任意の $z,w,\alpha,\beta\in\mathbb C$ に対し
$$
\begin{aligned}
T(\alpha z+\beta w)
&=a(\alpha z+\beta w)\\
&=\alpha(az)+\beta(aw)\\
&=\alpha T(z)+\beta T(w),
\end{aligned}
$$
なので $T$ は複素線形です。

一方
$$
C(z)=\overline z
$$
は実数 $r,s$ に対して
$$
C(rz+sw)=r\overline z+s\overline w
$$
なので実線形です。しかし
$$
C(iz)=\overline{iz}=-i\overline z,
$$
一方
$$
iC(z)=i\overline z.
$$
例えば $z=1$ なら $C(i)=-i\ne i=iC(1)$ なので複素線形ではありません。
<!-- definition-example-end -->

<a id="prop-la1-complex-linearity"></a>
<!-- formal-statement-start -->
> **命題（複素線形性の判定）**  
> $V,W$ を複素ベクトル空間とし、$T:V\to W$ が実線形であるとする。このとき $T$ が複素線形であることと
$$
T(ix)=iT(x)\qquad(x\in V)
$$
> が成り立つことは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $T$ が複素線形だとします。複素線形性の式に $\alpha=i$, $\beta=0$ を入れると
$$
T(ix)=iT(x)
$$
を得ます。

逆に $T$ は実線形で、全ての $x$ について
$$
T(ix)=iT(x)
$$
が成り立つとします。任意の複素数
$$
\alpha=a+ib
\qquad(a,b\in\mathbb R)
$$
と $x\in V$ に対して
$$
\begin{aligned}
T(\alpha x)
&=T((a+ib)x)\\
&=T(ax+b(ix))\\
&=aT(x)+bT(ix)\\
&=aT(x)+biT(x)\\
&=(a+ib)T(x)\\
&=\alpha T(x).
\end{aligned}
$$
また実線形性から加法も保存するので、任意の $x,y$ と $\alpha,\beta\in\mathbb C$ に対して
$$
\begin{aligned}
T(\alpha x+\beta y)
&=T(\alpha x)+T(\beta y)\\
&=\alpha T(x)+\beta T(y).
\end{aligned}
$$
従って $T$ は複素線形です。$\square$
<!-- proof-end -->

複素線形性の確認は、実線形性に加えて「$i$ 倍と可換するか」を見るだけで十分です。

---

## 3. 複素基底を実基底として見る

複素ベクトル空間では、一次独立・span・基底・次元の定義も係数を $\mathbb C$ から取るだけです。

たとえば $\mathbb C^n$ の標準基底 $e_1,\dots,e_n$ は複素基底です。

<a id="thm-la1-dimension"></a>
<!-- formal-statement-start -->
> **定理（複素次元と実次元の関係）**  
> 有限次元複素ベクトル空間 $V$ が
$$
\dim_{\mathbb C}V=n
$$
> を満たすなら、$V$ をスカラー制限によって実ベクトル空間と見たとき
$$
\dim_{\mathbb R}V=2n
$$
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

複素基底を $v_1,\dots,v_n$ とします。実ベクトル族
$$
v_1,iv_1,\dots,v_n,iv_n
$$
を考えます。

まず実数係数で全空間を張ることを示します。任意の $x\in V$ は複素基底により
$$
x=\sum_{j=1}^n c_jv_j
$$
と書けます。各 $c_j$ を
$$
c_j=a_j+ib_j
\qquad(a_j,b_j\in\mathbb R)
$$
と書けば
$$
\begin{aligned}
x
&=\sum_{j=1}^n(a_j+ib_j)v_j\\
&=\sum_{j=1}^na_jv_j+\sum_{j=1}^nb_j(iv_j).
\end{aligned}
$$
従ってこの $2n$ 本は実数係数で $V$ を張ります。

次に実一次独立性を示します。実数 $a_j,b_j$ が
$$
\sum_ja_jv_j+\sum_jb_j(iv_j)=0
$$
を満たすとすると
$$
\sum_j(a_j+ib_j)v_j=0.
$$
$v_1,\dots,v_n$ は複素一次独立なので
$$
a_j+ib_j=0
$$
が全ての $j$ で成り立ち、従って
$$
a_j=b_j=0.
$$
よって $v_1,iv_1,\dots,v_n,iv_n$ は実基底です。本数は $2n$ なので
$$
\dim_{\mathbb R}V=2n.
$$
$\square$
<!-- proof-end -->

特に
$$
\dim_{\mathbb C}\mathbb C^n=n,
\qquad
\dim_{\mathbb R}\mathbb C^n=2n.
$$

「同じ集合でも、どのスカラー体の上で見るかによって次元は変わる」という点が重要です。

---

## 4. 実行列と複素行列

行列表示も本質は同じです。複素基底を固定した複素線形写像は複素行列で表されます。

$$
A\in\mathbb C^{m\times n}
$$
に対する
$$
T_A(z)=Az
$$
は複素線形です。実際
$$
A(\alpha z+\beta w)=\alpha Az+\beta Aw
$$
が複素数 $\alpha,\beta$ に対して成り立ちます。

一方、複素共役を含む
$$
T(z)=A\overline z
$$
は一般に実線形ですが複素線形ではありません。実際
$$
T(iz)=A\overline{iz}=-iA\overline z=-iT(z)
$$
となり、通常は $iT(z)$ と一致しません。後の複素内積では、転置 $A^{\mathsf T}$ ではなく共役転置 $A^*$ が現れる理由もここにつながります。

---

## 5. 演習

### Level A

<a id="ex-la1-a01"></a>
#### LA1-A01 次元を二つの体で数える
- Level: A

$V=\mathbb C^3$ について $\dim_{\mathbb C}V$ と $\dim_{\mathbb R}V$ を求めよ。

<!-- solution-start -->
**解答**：複素標準基底
$$
e_1,e_2,e_3
$$
は3本なので
$$
\dim_{\mathbb C}V=3.
$$
実ベクトル空間としては
$$
e_1,ie_1,e_2,ie_2,e_3,ie_3
$$
が実基底になるので
$$
\dim_{\mathbb R}V=6.
$$
<!-- solution-end -->

<a id="ex-la1-a02"></a>
#### LA1-A02 複素共役は複素線形か
- Level: A

$C(z)=\overline z$ が実線形であることを示し、複素線形でないことを示せ。

<!-- solution-start -->
**解答**：実数 $a,b$ なら
$$
C(az+bw)
=\overline{az+bw}
=a\overline z+b\overline w
=aC(z)+bC(w),
$$
なので実線形です。一方
$$
C(i)=-i,
\qquad
iC(1)=i.
$$
両者は一致しないので、複素線形性の判定から複素線形ではありません。
<!-- solution-end -->

<a id="ex-la1-a03"></a>
#### LA1-A03 複素行列による写像
- Level: A

$A\in\mathbb C^{m\times n}$ とし $T(z)=Az$ とする。$T$ が複素線形であることを示せ。

<!-- solution-start -->
**解答**：任意の $z,w\in\mathbb C^n$ と $\alpha,\beta\in\mathbb C$ に対し
$$
\begin{aligned}
T(\alpha z+\beta w)
&=A(\alpha z+\beta w)\\
&=\alpha Az+\beta Aw\\
&=\alpha T(z)+\beta T(w).
\end{aligned}
$$
従って複素線形です。
<!-- solution-end -->

<a id="ex-la1-a04"></a>
#### LA1-A04 $i$ 倍との可換性
- Level: A

実線形写像 $T:\mathbb C\to\mathbb C$ を $T(x+iy)=x+2iy$ とする。複素線形か判定せよ。

<!-- solution-start -->
**解答**：
$$
T(i)=2i,
$$
一方
$$
iT(1)=i.
$$
一致しないので $T(ix)=iT(x)$ を全ての $x$ で満たさず、複素線形ではありません。
<!-- solution-end -->

### Level B

<a id="ex-la1-b01"></a>
#### LA1-B01 実線形写像の一般形
- Level: B

実線形写像 $T:\mathbb C\to\mathbb C$ は、ある $a,b\in\mathbb C$ を用いて
$$
T(z)=az+b\overline z
$$
と一意に書けることを示せ。

<!-- solution-start -->
**解答**：
$$
u=T(1),
\qquad
v=T(i)
$$
と置きます。$z=x+iy$（$x,y\in\mathbb R$）なら実線形性から
$$
T(z)=xT(1)+yT(i)=xu+yv.
$$
一方
$$
\begin{aligned}
az+b\overline z
&=a(x+iy)+b(x-iy)\\
&=(a+b)x+i(a-b)y.
\end{aligned}
$$
これを $xu+yv$ と一致させるには
$$
a+b=u,
\qquad
i(a-b)=v
$$
が必要です。第2式から $a-b=-iv$ なので
$$
a=\frac{u-iv}{2},
\qquad
b=\frac{u+iv}{2}.
$$
この値を選べば全ての $z$ で表示が成立します。また連立方程式の解が一意なので $a,b$ も一意です。
<!-- solution-end -->

<a id="ex-la1-b02"></a>
#### LA1-B02 複素線形となる条件
- Level: B

B01の表示 $T(z)=az+b\overline z$ について、$T$ が複素線形であるための必要十分条件を求めよ。

<!-- solution-start -->
**解答**：
$$
T(iz)=ai z+b\overline{iz}
=iaz-ib\overline z,
$$
一方
$$
iT(z)=iaz+ib\overline z.
$$
両者の差は
$$
T(iz)-iT(z)=-2ib\overline z.
$$
これが全ての $z$ で0となるための必要十分条件は
$$
b=0.
$$
<!-- solution-end -->

<a id="ex-la1-b03"></a>
#### LA1-B03 実行列表現
- Level: B

複素数 $a=p+iq$ による写像 $T(z)=az$ を、実基底 $(1,i)$ に関する $2\times2$ 実行列で表せ。

<!-- solution-start -->
**解答**：
$$
T(1)=p+qi=p\cdot1+q\cdot i,
$$
$$
T(i)=(p+iq)i=-q+pi=(-q)\cdot1+p\cdot i.
$$
表現行列の列は基底ベクトルの像の座標なので
$$
[T]_{(1,i)}=
\begin{pmatrix}
p&-q\\
q&p
\end{pmatrix}.
$$
<!-- solution-end -->

### Level C

<a id="ex-la1-c01"></a>
#### LA1-C01 複素構造としての $J$
- Level: C

実ベクトル空間 $V$ に実線形写像 $J:V\to V$ があり $J^2=-I$ とする。$(a+ib)v:=av+bJv$ と定めると $V$ が複素ベクトル空間になることを確かめよ。

<!-- solution-start -->
**解答**：$V$ の加法はもとの実ベクトル空間の加法をそのまま使います。新しく確認すべきなのは複素スカラー倍との整合性です。

まず $\alpha=a+ib$, $\beta=c+id$ とします。スカラーの加法について
$$
\begin{aligned}
(\alpha+\beta)v
&=((a+c)+i(b+d))v\\
&=(a+c)v+(b+d)Jv\\
&=(av+bJv)+(cv+dJv)\\
&=\alpha v+\beta v.
\end{aligned}
$$
ベクトルの加法については $J$ の実線形性から
$$
\begin{aligned}
\alpha(v+w)
&=a(v+w)+bJ(v+w)\\
&=av+aw+bJv+bJw\\
&=\alpha v+\alpha w.
\end{aligned}
$$

次にスカラー積の結合則を確認します。
$$
\beta v=cv+dJv
$$
なので
$$
\begin{aligned}
\alpha(\beta v)
&=a(cv+dJv)+bJ(cv+dJv)\\
&=acv+adJv+bcJv+bdJ^2v\\
&=(ac-bd)v+(ad+bc)Jv,
\end{aligned}
$$
ここで $J^2=-I$ を使いました。一方
$$
\alpha\beta=(ac-bd)+i(ad+bc)
$$
なので
$$
(\alpha\beta)v=(ac-bd)v+(ad+bc)Jv.
$$
従って
$$
\alpha(\beta v)=(\alpha\beta)v.
$$
最後に
$$
1v=(1+0i)v=v.
$$
よって複素スカラー倍に関する公理が全て成り立ち、$V$ は複素ベクトル空間になります。この $J$ が「$i$ 倍」の役割をしています。
<!-- solution-end -->

---

## 6. 次に進む

複素数をスカラーに許す準備ができました。次は、既存の直和を土台に **補空間・商空間・標準射影・第一同型定理** を導入します。
