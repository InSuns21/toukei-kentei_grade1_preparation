# LA1 標準線形代数 I：実・複素線形空間

[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) では実ベクトル空間を定義しました。標準的な線形代数では、同じ公理を複素数上でも使います。

この章では「ベクトル空間の公理をやり直す」のではなく、**スカラーをどこから取るか**で何が変わるかだけを整理します。

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

かだけです。

<!-- definition-example-start: def-la1-real-complex-vector-space -->
**定義の確認**：$\mathbb C^n$ は複素数係数で閉じているので $\mathbb C$ 上のベクトル空間です。同時に複素数を実数2成分と見れば、$\mathbb C^n$ は $\mathbb R$ 上のベクトル空間でもあります。ただし次元は同じではありません。
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
**定義の確認**：$T:\mathbb C\to\mathbb C$, $T(z)=az$ は任意の固定 $a\in\mathbb C$ について複素線形です。一方 $C(z)=\overline z$ は加法と実数倍を保存するため実線形ですが、一般に $C(iz)=-i\overline z\ne i\overline z$ なので複素線形ではありません。
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

複素線形なら $i$ もスカラーなので必要性は明らかです。逆に $\alpha=a+ib$ とすると、実線形性と仮定から
$$
T(\alpha x)
=T(ax+bix)
=aT(x)+bT(ix)
=(a+ib)T(x)
=\alpha T(x).
$$
したがって複素数スカラー倍を保存します。$\square$
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
を考えます。任意の $x\in V$ は
$$
x=\sum_{j=1}^n(a_j+ib_j)v_j
=\sum_{j=1}^na_jv_j+\sum_{j=1}^nb_j(iv_j)
$$
と書けるので、この $2n$ 本は実数係数で $V$ を張ります。

一方
$$
\sum_j a_jv_j+\sum_jb_j(iv_j)=0
$$
なら
$$
\sum_j(a_j+ib_j)v_j=0.
$$
複素基底の一次独立性から $a_j=b_j=0$。よって実一次独立でもあり、実基底です。$\square$
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

は複素線形です。

一方、複素共役を含む

$$
T(z)=A\overline z
$$

は一般に実線形ですが複素線形ではありません。後の複素内積では、転置 $A^{\mathsf T}$ ではなく共役転置 $A^*$ が現れる理由もここにつながります。

---

## 5. 演習

### Level A

<a id="ex-la1-a01"></a>
#### LA1-A01 次元を二つの体で数える
- Level: A

$V=\mathbb C^3$ について $\dim_{\mathbb C}V$ と $\dim_{\mathbb R}V$ を求めよ。

<!-- solution-start -->
**解答**：複素標準基底は3本なので $\dim_{\mathbb C}V=3$。実基底として $e_1,ie_1,e_2,ie_2,e_3,ie_3$ を取れるので $\dim_{\mathbb R}V=6$。
<!-- solution-end -->

<a id="ex-la1-a02"></a>
#### LA1-A02 複素共役は複素線形か
- Level: A

$C(z)=\overline z$ が実線形であることを示し、複素線形でないことを示せ。

<!-- solution-start -->
**解答**：実数 $a,b$ なら $\overline{az+bw}=a\overline z+b\overline w$ なので実線形。一方 $C(i)=-i\ne i=iC(1)$ なので複素線形性の判定を満たさない。
<!-- solution-end -->

<a id="ex-la1-a03"></a>
#### LA1-A03 複素行列による写像
- Level: A

$A\in\mathbb C^{m\times n}$ とし $T(z)=Az$ とする。$T$ が複素線形であることを示せ。

<!-- solution-start -->
**解答**：行列積の分配法則から $A(\alpha z+\beta w)=\alpha Az+\beta Aw$。係数 $\alpha,\beta$ は複素数でもよい。
<!-- solution-end -->

<a id="ex-la1-a04"></a>
#### LA1-A04 $i$ 倍との可換性
- Level: A

実線形写像 $T:\mathbb C\to\mathbb C$ を $T(x+iy)=x+2iy$ とする。複素線形か判定せよ。

<!-- solution-start -->
**解答**：$T(i)=2i$ だが $iT(1)=i$。一致しないので複素線形ではない。
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
**解答**：$u=T(1)$, $v=T(i)$ とする。$z=x+iy$ に対し $T(z)=xu+yv$。一方 $az+b\overline z=(a+b)x+i(a-b)y$ なので $a+b=u$, $i(a-b)=v$ を解けばよい。すなわち $a=(u-iv)/2$, $b=(u+iv)/2$。一意性もこの連立方程式から従う。
<!-- solution-end -->

<a id="ex-la1-b02"></a>
#### LA1-B02 複素線形となる条件
- Level: B

B01の表示 $T(z)=az+b\overline z$ について、$T$ が複素線形であるための必要十分条件を求めよ。

<!-- solution-start -->
**解答**：$T(iz)=aiz+b\overline{iz}=iaz-ib\overline z$、一方 $iT(z)=iaz+ib\overline z$。全ての $z$ で一致するための必要十分条件は $b=0$。
<!-- solution-end -->

<a id="ex-la1-b03"></a>
#### LA1-B03 実行列表現
- Level: B

複素数 $a=p+iq$ による写像 $T(z)=az$ を、実基底 $(1,i)$ に関する $2\times2$ 実行列で表せ。

<!-- solution-start -->
**解答**：$T(1)=p+qi$, $T(i)=-q+pi$ だから
$$
[T]_{(1,i)}=
\begin{pmatrix}p&-q\\q&p\end{pmatrix}.
$$
<!-- solution-end -->

### Level C

<a id="ex-la1-c01"></a>
#### LA1-C01 複素構造としての $J$
- Level: C

実ベクトル空間 $V$ に実線形写像 $J:V\to V$ があり $J^2=-I$ とする。$(a+ib)v:=av+bJv$ と定めると $V$ が複素ベクトル空間になることを確かめよ。

<!-- solution-start -->
**解答**：加法に関する公理は実線形性から従う。重要なのはスカラー積で、$\alpha=a+ib$, $\beta=c+id$ とすると
$$
\alpha(\beta v)
=(ac-bd)v+(ad+bc)Jv
=(\alpha\beta)v,
$$
ここで $J^2=-I$ を使った。$1v=v$ も明らか。したがって $J$ は「$i$ 倍」を与える複素構造になる。
<!-- solution-end -->

---

## 6. 次に進む

複素数をスカラーに許す準備ができました。次は、既存の直和を土台に **補空間・商空間・標準射影・第一同型定理** を導入します。
