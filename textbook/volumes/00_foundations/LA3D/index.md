<!-- definition-example-audit: loose -->
# LA3D 標準線形代数 III-D：抽象行列式 — 座標を捨てると何が残るか

LA3B・LA3C では行列 $A$ に対して $\det A$ を構成し、その性質を証明しました。

しかし線形写像
$$
T:V\to V
$$
そのものには行列が貼り付いているわけではありません。行列は基底を選んだ後の座標表示です。

それでも行列式が本質的な量なら、基底を選ばずに

> **$T$ は符号付き体積を何倍するか**

として定義できるはずです。この章では、そのための「体積を測る道具」を作り、通常の行列式と一致することを示します。

LA4 に必要な計算的行列式は LA3C で完結しています。この章は、行列式を座標から解放して理解するための概念的な仕上げです。

---

## 1. 面積を測る写像を行列なしで書く

$V=\mathbb R^2$ なら
$$
\omega(u,v)=u_1v_2-u_2v_1
$$
は2本のベクトルが作る符号付き面積です。

この写像には2つの特徴があります。

- $u$ を固定すれば $v$ について線形、$v$ を固定すれば $u$ について線形。
- 同じベクトルを2回入れると $\omega(u,u)=0$。

座標公式そのものより、この2性質を抽象化します。

<a id="def-la3d-alternating-form"></a>
<!-- formal-statement-start -->
> **定義（交代多重線形形式）**  
> $n$ 個の変数を持つ写像
$$
\omega:V^n\to\mathbb F
$$
> が各変数について線形で、$v_i=v_j$ となる2つの引数があるとき常に
$$
\omega(v_1,\dots,v_n)=0
$$
> となるとき、$\omega$ を **交代 $n$ 重線形形式** という。
<!-- formal-statement-end -->

交代性と多重線形性から、2つの引数を交換すると符号が反転します。実際
$$
0=\omega(\dots,u+v,\dots,u+v,\dots)
$$
を展開し、$u,u$ と $v,v$ の項を0にすると
$$
\omega(\dots,u,\dots,v,\dots)
=-\omega(\dots,v,\dots,u,\dots)
$$
が残ります。

---

## 2. $n$ 次元空間の「体積形式」は本質的に1種類しかない

$n$ 次元空間で $n$ 本のベクトルから符号付き体積を作る交代 $n$ 重線形形式を考えます。基底 $e_1,\dots,e_n$ に対する1個の値
$$
\omega(e_1,\dots,e_n)
$$
を決めれば、他の入力での値も全部決まりそうです。

<a id="thm-la3d-top-alternating-one-dimensional"></a>
<!-- formal-statement-start -->
> **定理（最高次交代形式は1次元）**  
> $V$ を $n$ 次元ベクトル空間とし、基底 $e_1,\dots,e_n$ を固定する。任意の交代 $n$ 重線形形式 $\omega$ は
$$
\omega(e_1,\dots,e_n)
$$
> だけで一意に決まる。また $\omega(e_1,\dots,e_n)=1$ を満たす交代 $n$ 重線形形式が存在する。従って交代 $n$ 重線形形式全体の空間は1次元である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $v_1,\dots,v_n\in V$ を
$$
v_j=\sum_{i=1}^na_{ij}e_i
$$
と書きます。多重線形性で展開すると
$$
\omega(v_1,\dots,v_n)
=
\sum_{i_1,\dots,i_n}
\left(\prod_{j=1}^na_{i_jj}\right)
\omega(e_{i_1},\dots,e_{i_n}).
$$
添字が重複する項は交代性で0です。従って生き残るのは
$$
(i_1,\dots,i_n)=(\sigma(1),\dots,\sigma(n))
$$
と置換で書ける項だけです。

交換による符号反転から
$$
\omega(e_{\sigma(1)},\dots,e_{\sigma(n)})
=\operatorname{sgn}(\sigma)\omega(e_1,\dots,e_n).
$$
したがって
$$
\begin{aligned}
\omega(v_1,\dots,v_n)
&=
\left(
\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^na_{\sigma(j),j}
\right)
\omega(e_1,\dots,e_n)\\
&=\det[a_{ij}]\,\omega(e_1,\dots,e_n).
\end{aligned}
$$
従って基底での1個の値が全てを決めます。

次に存在を示します。基底 $\mathcal B=(e_1,\dots,e_n)$ を固定して
$$
\omega_0(v_1,\dots,v_n)
=\det[v_1\ \cdots\ v_n]_{\mathcal B}
$$
と定めます。[行列式の交代多重線形性](../LA3B/index.md#thm-la3b-det-alternating-multilinear)から $\omega_0$ は交代 $n$ 重線形形式で
$$
\omega_0(e_1,\dots,e_n)=\det I=1.
$$
従って非零な最高次交代形式が存在します。

任意の $\omega$ は
$$
\omega=\omega(e_1,\dots,e_n)\omega_0
$$
なので、最高次交代形式全体は $\omega_0$ が張る1次元空間です。$\square$
<!-- proof-end -->

この定理が抽象行列式の核心です。**体積形式の空間が1次元だから、線形写像を作用させても元の体積形式のスカラー倍にしかなりません。**

---

## 3. 線形写像が体積形式を何倍するか

非零な最高次交代形式 $\omega$ を1つ取ります。$T:V\to V$ を通した後の体積を
$$
\omega_T(v_1,\dots,v_n)
=\omega(Tv_1,\dots,Tv_n)
$$
で測ります。

$T$ と $\omega$ の線形性から $\omega_T$ は多重線形で、$v_i=v_j$ なら $Tv_i=Tv_j$ なので交代的です。従って $\omega_T$ も最高次交代形式です。

最高次交代形式の空間は1次元なので、ある一意なスカラー $c$ があって
$$
\omega_T=c\omega
$$
となります。この $c$ を行列式と呼びます。

<a id="def-la3d-abstract-determinant"></a>
<!-- formal-statement-start -->
> **定義（抽象行列式）**  
> $V$ を $n$ 次元ベクトル空間、$T:V\to V$ を線形写像とする。非零な交代 $n$ 重線形形式 $\omega$ を1つ取る。このとき一意なスカラー $\det T$ を
$$
\omega(Tv_1,\dots,Tv_n)
=(\det T)\,\omega(v_1,\dots,v_n)
$$
> が全ての $v_1,\dots,v_n\in V$ で成り立つように定める。
<!-- formal-statement-end -->

### 例：平面の面積倍率

$$
T(x,y)=(2x+y,x+3y)
$$
とし
$$
\omega(u,v)=u_1v_2-u_2v_1
$$
を使います。標準基底について
$$
Te_1=(2,1)^T,
\qquad
Te_2=(1,3)^T
$$
なので
$$
\omega(Te_1,Te_2)=2\cdot3-1\cdot1=5.
$$
一方 $\omega(e_1,e_2)=1$ なので
$$
\det T=5.
$$

---

## 4. 選んだ体積形式に依存しないのか

定義で非零な $\omega$ を1つ「選んだ」ので、別の体積形式を選んだら値が変わりそうに見えます。

しかし最高次交代形式は1次元なので、別の非零形式 $\eta$ は
$$
\eta=a\omega\qquad(a\ne0)
$$
と書けます。もし
$$
\omega(Tv_1,\dots,Tv_n)=c\omega(v_1,\dots,v_n)
$$
なら
$$
\begin{aligned}
\eta(Tv_1,\dots,Tv_n)
&=a\omega(Tv_1,\dots,Tv_n)\\
&=ac\omega(v_1,\dots,v_n)\\
&=c\eta(v_1,\dots,v_n).
\end{aligned}
$$
同じ $c$ が出ます。

つまり抽象行列式は **体積形式を1つ選んで定義するが、その選択には依存しません**。

---

## 5. 座標表示に戻すと普通の行列式になる

<a id="thm-la3d-abstract-matrix-det-agree"></a>
<!-- formal-statement-start -->
> **定理（抽象行列式と表現行列の行列式）**  
> $V$ の任意の基底 $\mathcal B$ に対して
$$
\det T=\det[T]_{\mathcal B}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

基底を $e_1,\dots,e_n$ とし
$$
\omega(e_1,\dots,e_n)=1
$$
となる最高次交代形式を取ります。$T$ の表現行列を $A=(A_{ij})$ とすると
$$
Te_j=\sum_iA_{ij}e_i.
$$
前節の展開式から
$$
\omega(Te_1,\dots,Te_n)
=\det A\,\omega(e_1,\dots,e_n)
=\det A.
$$
一方、抽象行列式の定義から
$$
\omega(Te_1,\dots,Te_n)
=(\det T)\omega(e_1,\dots,e_n)
=\det T.
$$
従って
$$
\det T=\det A=\det[T]_{\mathcal B}.
$$
$\square$
<!-- proof-end -->

これで「行列の行列式」と「線形写像の行列式」は別物ではなく、**同じ量の座標表示と座標自由な表示**だと分かります。

---

## 6. LA3C の結果が抽象定義ではどう見えるか

LA3C で苦労して証明した乗法性
$$
\det(S\circ T)=(\det S)(\det T)
$$
は、抽象定義では仕組みが直接見えます。

非零な最高次交代形式 $\omega$ に対して
$$
\begin{aligned}
\omega(STv_1,\dots,STv_n)
&=(\det S)\omega(Tv_1,\dots,Tv_n)\\
&=(\det S)(\det T)\omega(v_1,\dots,v_n).
\end{aligned}
$$
一方 $S\circ T$ の定義から同じ左辺は
$$
\det(S\circ T)\,\omega(v_1,\dots,v_n)
$$
です。$\omega$ は非零なので、値が非零になる入力を1組選んで比較すれば乗法性が得られます。

ここが抽象化の利点です。計算結果を増やすのではなく、**なぜその性質が自然なのかを短い構造で説明できる**ようになります。

この「次元を潰す」という意味も、基底延長まで書けば完全に座標なしで確認できます。

<a id="cor-la3d-det-invertible"></a>
<!-- formal-statement-start -->
> **系（抽象行列式による可逆性判定）**  
> 有限次元ベクトル空間 $V$ の線形写像 $T:V\to V$ に対して

$$
\det T=0
\Longleftrightarrow
T\text{ は可逆でない}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $T$ が可逆でないとします。有限次元なので $T$ は単射でなく、$0\ne v_1\in\ker T$ を取れます。$v_1$ を基底
$$
v_1,v_2,\dots,v_n
$$
へ延長します。非零な最高次交代形式 $\omega$ は任意の基底上で非零です。実際、この基底上で $\omega(v_1,\dots,v_n)=0$ なら、最高次交代形式の1次元性の証明と同じ展開により $\omega$ は全ての入力で0となり、非零性に矛盾します。

ところが $Tv_1=0$ なので
$$
\omega(Tv_1,Tv_2,\dots,Tv_n)=0.
$$
抽象行列式の定義から
$$
0=(\det T)\,\omega(v_1,\dots,v_n),
$$
右の第2因子は非零だから $\det T=0$ です。

逆に $\det T=0$ なら、任意の基底 $\mathcal B$ について
$$
\det[T]_{\mathcal B}=\det T=0.
$$
LA3C の可逆性判定により $[T]_{\mathcal B}$ は可逆でなく、従って $T$ も可逆ではありません。$\square$
<!-- proof-end -->


---

## 7. 具体と抽象を往復する

行列式には2つの見方があります。

### 計算するなら

LA3B・LA3C の

- Leibniz 公式
- 基本変形
- 三角化
- Laplace 展開
- 余因子

を使います。

### 構造を見るなら

この章の
$$
\omega(Tv_1,\dots,Tv_n)
=(\det T)\omega(v_1,\dots,v_n)
$$
を使います。

抽象化は具体計算を捨てることではありません。**具体計算で作った概念から座標依存部分を取り除き、同じ量を別の角度から見ること**です。

---

## 8. 演習

### LA3D-A01 面積形式

$V=\mathbb R^2$ で
$$
\omega(u,v)=3(u_1v_2-u_2v_1)
$$
とする。$T(x,y)=(2x,y)$ の抽象行列式を $\omega$ から計算せよ。

<!-- solution-start -->
**解答**：
$$
\omega(e_1,e_2)=3,
\qquad
Te_1=(2,0),\quad Te_2=(0,1).
$$
従って
$$
\omega(Te_1,Te_2)=3(2\cdot1)=6.
$$
定義から
$$
6=(\det T)3
$$
なので $\det T=2$ です。体積形式を3倍しても行列式自体は変わりません。
<!-- solution-end -->

### LA3D-A02 最高次交代形式

$V=\mathbb R^3$ で $\omega(e_1,e_2,e_3)=2$ とする。
$$
v_1=(1,1,0)^T,\quad
v_2=(0,1,1)^T,\quad
v_3=(1,0,1)^T
$$
について $\omega(v_1,v_2,v_3)$ を求めよ。

<!-- solution-start -->
**解答**：本文の展開式から
$$
\omega(v_1,v_2,v_3)
=\det\begin{pmatrix}
1&0&1\\
1&1&0\\
0&1&1
\end{pmatrix}\omega(e_1,e_2,e_3).
$$
行列式は2なので
$$
\omega(v_1,v_2,v_3)=2\cdot2=4.
$$
<!-- solution-end -->

### LA3D-B01 体積形式の選択独立性

非零な最高次交代形式 $\omega,\eta$ を使って抽象行列式を定義したとき、同じスカラーが得られることを示せ。

<!-- solution-start -->
**解答**：最高次交代形式全体は1次元なので $\eta=a\omega$（$a\ne0$）と書けます。$\omega(Tv)=c\omega(v)$ なら
$$
\eta(Tv)=a\omega(Tv)=ac\omega(v)=c\eta(v)
$$
です。従って $\eta$ を使っても同じ $c$ が得られます。
<!-- solution-end -->

### LA3D-B02 乗法性を座標なしに導く

[抽象行列式](#def-la3d-abstract-determinant)の定義だけから
$$
\det(S\circ T)=\det S\det T
$$
を導け。

<!-- solution-start -->
**解答**：非零な最高次交代形式 $\omega$ を固定すると
$$
\omega(STv_1,\dots,STv_n)
=(\det S)(\det T)\omega(v_1,\dots,v_n)
$$
です。一方 $S\circ T$ に定義を適用すると
$$
\omega(STv_1,\dots,STv_n)
=\det(S\circ T)\omega(v_1,\dots,v_n).
$$
$\omega$ が非零になる入力を選んで比較すれば結論を得ます。
<!-- solution-end -->


### LA3D-A03 多項式空間上の平行移動

$V=\mathbb R_2[x]$ とし
$$
T(p)(x)=p(x+1)
$$
で線形写像 $T:V\to V$ を定める。基底 $(1,x,x^2)$ を使って $\det T$ を求めよ。

<!-- solution-start -->
**解答**：
$$
T(1)=1,
\qquad
T(x)=1+x,
\qquad
T(x^2)=1+2x+x^2.
$$
従って表現行列は
$$
[T]=
\begin{pmatrix}
1&1&1\\
0&1&2\\
0&0&1
\end{pmatrix}.
$$
上三角なので
$$
\boxed{\det T=1}.
$$
抽象行列式と表現行列の行列式が一致するため、別の基底で計算しても答えは変わりません。
<!-- solution-end -->

### LA3D-A04 せん断を体積形式だけで読む

$V$ の基底を $e_1,e_2,e_3$ とし
$$
Te_1=e_1,
\qquad
Te_2=e_1+e_2,
\qquad
Te_3=e_2+e_3
$$
で $T:V\to V$ を定める。行列式の座標公式を使わず、非零な最高次交代形式 $\omega$ を用いて $\det T$ を求めよ。

<!-- solution-start -->
**解答**：交代多重線形性から
$$
\begin{aligned}
\omega(Te_1,Te_2,Te_3)
&=\omega(e_1,e_1+e_2,e_2+e_3)\\
&=\omega(e_1,e_2,e_2+e_3)\\
&=\omega(e_1,e_2,e_3).
\end{aligned}
$$
途中で同じベクトルを2回含む項が全て0になりました。$\omega(e_1,e_2,e_3)\ne0$ なので定義と比較して
$$
\boxed{\det T=1}.
$$
せん断は符号付き体積を変えない、という幾何的意味がそのまま式に現れています。
<!-- solution-end -->

### LA3D-B03 $\det T=0$ を完全に座標なしで判定する

$V$ を有限次元、$T:V\to V$ を線形写像とする。表現行列や LA3C の可逆性判定を使わず、最高次交代形式だけから
$$
\det T=0
\Longleftrightarrow
T\text{ は単射でない}
$$
を示せ。

<!-- solution-start -->
**解答**：$T$ が単射でないなら $0\ne v_1\in\ker T$ を取り、基底 $v_1,\dots,v_n$ へ延長します。非零な最高次交代形式 $\omega$ は基底上で非零なので
$$
\omega(v_1,\dots,v_n)\ne0.
$$
一方 $Tv_1=0$ だから
$$
\omega(Tv_1,\dots,Tv_n)=0.
$$
定義より
$$
0=(\det T)\omega(v_1,\dots,v_n)
$$
なので $\det T=0$ です。

逆に $T$ が単射だとします。有限次元なので $T$ は同型で、任意の基底 $v_1,\dots,v_n$ の像
$$
Tv_1,\dots,Tv_n
$$
も基底です。従って非零な最高次交代形式について
$$
\omega(v_1,\dots,v_n)\ne0,
\qquad
\omega(Tv_1,\dots,Tv_n)\ne0.
$$
両者を結ぶ係数 $\det T$ は0ではありません。よって対偶から $\det T=0$ なら単射ではありません。
<!-- solution-end -->

### LA3D-C01 共役による行列式不変性を座標なしで示す

$V,W$ を同じ有限次元のベクトル空間、$S:V\to W$ を線形同型、$T:V\to V$ を線形写像とする。
$$
U=STS^{-1}:W\to W
$$
と置く。表現行列・相似変換・LA3C の相似不変性を使わず、最高次交代形式の定義だけから
$$
\boxed{\det U=\det T}
$$
を示せ。

<!-- solution-start -->
**解答**：$W$ 上の非零な最高次交代形式 $\eta$ を1つ取ります。$V$ 上に
$$
\omega(v_1,\dots,v_n)
=\eta(Sv_1,\dots,Sv_n)
$$
と定めると、$S$ が同型なので $\omega$ も非零な最高次交代形式です。

任意の $w_i\in W$ を $w_i=Sv_i$ と書くと
$$
\begin{aligned}
\eta(Uw_1,\dots,Uw_n)
&=\eta(STv_1,\dots,STv_n)\\
&=\omega(Tv_1,\dots,Tv_n)\\
&=(\det T)\omega(v_1,\dots,v_n)\\
&=(\det T)\eta(w_1,\dots,w_n).
\end{aligned}
$$
一方、$U$ の抽象行列式の定義では左辺は
$$
(\det U)\eta(w_1,\dots,w_n)
$$
です。$\eta$ が非零になる入力を選べるので係数を比較して
$$
\det U=\det T.
$$
これは「相似不変性」が座標表示の偶然ではなく、同型で空間を読み替えても体積倍率が変わらないという構造的事実であることを示します。
<!-- solution-end -->

---

## 9. 次に進む

通常行列式の計算コアは LA3C、座標自由な意味づけはこの LA3D で完了です。

次の [LA4](../LA4/index.md) では
$$
\chi_T(t)=\det(tI-T)
$$
から特性多項式を作り、最小多項式・Cayley--Hamilton・一般化固有空間・Jordan 構造へ進みます。