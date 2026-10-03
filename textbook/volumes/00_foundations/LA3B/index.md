# LA3B 置換の符号・Leibniz 公式・行列式の構成

$2\times2$ 行列なら
$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc
$$
を知っています。しかし一般の $n\times n$ 行列で、突然「置換の和」を暗記しても行列式が何をしているのかは見えません。

そこで順序を逆にします。まず **面積・体積倍率として欲しい性質** を考え、その性質を本当に満たす関数を Leibniz 公式で構成します。

実数上では面積・体積の直感が使えますが、この章の構成は同じ式を複素数上でも使えるよう、最終的には **多重線形性・交代性・正規化** という代数的性質だけで記述します。

---

## 1. どんな量が欲しいのか

以下、係数体を $\mathbb F=\mathbb R$ または $\mathbb C$ とします。

行列 $A=[c_1\ \cdots\ c_n]$ の列を、$\mathbb F^n$ に置いた $n$ 本のベクトルとみなします。実数上で面積・体積の符号付き倍率を表す量 $D(c_1,\dots,c_n)$ を考えると、少なくとも次を期待します。

1. 1本の列を $\alpha$ 倍したり、二つの列ベクトルを足したりしたとき、その列について線形に値が変わる。
2. 2本の列が同じなら、張られる図形がつぶれるので値は0になる。
3. 標準基底 $e_1,\dots,e_n$ が作る標準体積は1である。

条件1が **多重線形性**、条件2が **交代性** に当たります。この章で候補 $D:(\mathbb F^n)^n\to\mathbb F$ に要求する二つの性質を式で書くと

- 各位置 $k$ を固定して見ると、その引数について線形である。
- 異なる2位置に同じベクトルを入れると値が0になる。

というものです。後の発展分岐では、この二つを満たす写像そのものを一般のベクトル空間上で抽象化しますが、ここでは行列式を構成するために必要な性質として使います。

**性質の確認**：$n=2$ で

$$
D_2(u,v)=u_1v_2-u_2v_1
$$

とします。$u,w,v\in\mathbb R^2$ と $\alpha,\beta\in\mathbb R$ に対して

$$
\begin{aligned}
D_2(\alpha u+\beta w,v)
&=(\alpha u_1+\beta w_1)v_2-(\alpha u_2+\beta w_2)v_1\\
&=\alpha D_2(u,v)+\beta D_2(w,v),
\end{aligned}
$$

同様に第2引数についても

$$
D_2(u,\alpha v+\beta w)
=\alpha D_2(u,v)+\beta D_2(u,w)
$$

です。また

$$
D_2(u,u)=u_1u_2-u_2u_1=0.
$$

従って $D_2$ は多重線形かつ交代的です。

交代性と多重線形性から、2つの引数を交換すると符号が反転します。位置 $p,q$ に $u+v$ を入れると交代性から値は0です。一方、多重線形性で二つの引数を順に展開すると

$$
\begin{aligned}
0
&=D(\dots,u+v,\dots,u+v,\dots)\\
&=D(\dots,u,\dots,u,\dots)
 +D(\dots,u,\dots,v,\dots)\\
&\quad+D(\dots,v,\dots,u,\dots)
 +D(\dots,v,\dots,v,\dots).
\end{aligned}
$$

第1項と第4項は交代性で0なので

$$
D(\dots,u,\dots,v,\dots)
=-D(\dots,v,\dots,u,\dots).
$$

したがって「2列交換で符号反転」は別の暗記事項ではなく、交代多重線形性から出てきます。

問題は、これらを同時に満たし、さらに

$$
D(e_1,\dots,e_n)=1
$$

と正規化された関数が一般の $n$ で本当に存在するかです。

---

## 2. 置換の符号は「列の並べ替えの向き」を記録する

$a_{ij}$ から各列1個ずつ、しかも各行も1回ずつ選ぶには置換が必要です。

<a id="def-la3b-permutation-sign"></a>
<!-- formal-statement-start -->
> **定義（置換の転倒数と符号）**  
> $n$ 個の記号 $1,\dots,n$ の置換全体を $S_n$ とする。$\sigma\in S_n$ に対して
$$
\operatorname{inv}(\sigma)
=\#\{(i,j):i<j,\ \sigma(i)>\sigma(j)\}
$$
> を転倒数といい
$$
\operatorname{sgn}(\sigma)=(-1)^{\operatorname{inv}(\sigma)}
$$
> を $\sigma$ の符号という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3b-permutation-sign -->
**定義の確認**：$\sigma=(2,3,1)$ なら、位置の組 $(1,3),(2,3)$ について

$$
\sigma(1)=2>1=\sigma(3),\qquad
\sigma(2)=3>1=\sigma(3)
$$

となるので転倒は2個です。従って

$$
\operatorname{inv}(\sigma)=2,\qquad
\operatorname{sgn}(\sigma)=(-1)^2=1.
$$
<!-- definition-example-end -->

Leibniz 公式では、列を交換したときに置換の符号も正確に1回反転してほしいので、符号が置換の合成に対して積になることが必要です。そのために、まず「隣り合う2箇所の交換では転倒数の偶奇が必ず反転する」ことを確認し、一般の置換を隣接交換へ分解します。

<a id="lem-la3b-permutation-sign-product"></a>
<!-- formal-statement-start -->
> **補題（置換の符号の積）**  
> $\sigma,\rho\in S_n$ に対して
$$
\operatorname{sgn}(\sigma\circ\rho)
=\operatorname{sgn}(\sigma)\operatorname{sgn}(\rho).
$$
> 特に互換 $\tau$ について $\operatorname{sgn}(\tau)=-1$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

隣り合う2箇所を交換する置換を

$$
s_k=(k\ k+1)
$$

とします。$\sigma$ の一列表記で第 $k$ 項を $a=\sigma(k)$、第 $k+1$ 項を $b=\sigma(k+1)$ とします。この二項を交換すると、$a,b$ 同士の大小関係は必ず反転します。

一方、位置 $r<k$ の項 $c=\sigma(r)$ から見れば、交換前後の

$$
[c>a]+[c>b]
$$

という2個分の転倒判定の合計は変わりません。位置 $r>k+1$ の項についても

$$
[a>c]+[b>c]
$$

の合計は変わりません。従って変わるのは $a,b$ 同士の1組だけで、

$$
\operatorname{inv}(\sigma\circ s_k)
\equiv \operatorname{inv}(\sigma)+1\pmod2.
$$

よって

$$
\operatorname{sgn}(\sigma\circ s_k)
=-\operatorname{sgn}(\sigma).
$$

次に、任意の置換 $\rho$ を隣接互換の積へ分解できることを確認します。$\rho$ の一列表記に転倒が残っているなら、どこかに隣り合う転倒があります。そこを隣接交換すると転倒数が1減ります。これを繰り返すと有限回で

$$
(1,2,\dots,n)
$$

へ到達するので、逆にたどれば

$$
\rho=s_{i_1}\cdots s_{i_m}
$$

と書けます。

恒等置換からこの $m$ 回の交換を施せば

$$
\operatorname{sgn}(\rho)=(-1)^m.
$$

同じ交換を $\sigma$ の右から順に合成すると

$$
\begin{aligned}
\operatorname{sgn}(\sigma\circ\rho)
&=\operatorname{sgn}(\sigma\circ s_{i_1}\cdots s_{i_m})\\
&=(-1)^m\operatorname{sgn}(\sigma)\\
&=\operatorname{sgn}(\sigma)\operatorname{sgn}(\rho).
\end{aligned}
$$

最後に $p<q$ とすると、一般の互換は

$$
(p\ q)
=
s_p s_{p+1}\cdots s_{q-2}s_{q-1}
s_{q-2}\cdots s_{p+1}s_p
$$

と表せます。隣接互換の個数は

$$
(q-p)+(q-p-1)=2(q-p)-1
$$

で奇数なので

$$
\operatorname{sgn}(p\ q)=-1.
$$

$\square$
<!-- proof-end -->

---

## 3. Leibniz 公式で一般の行列式を作る

置換の符号を使えば、「各列から1成分ずつ、各行も重複なく選ぶ」という規則を一つの和にまとめられます。ここまでの準備を使って、一般の正方行列に対する行列式そのものを定義します。

<a id="def-la3b-matrix-determinant"></a>
<!-- formal-statement-start -->
> **定義（Leibniz 公式による行列式）**  
> $A=(a_{ij})\in\mathbb F^{n\times n}$ に対して
$$
\det A
=\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^n a_{\sigma(j),j}
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3b-matrix-determinant -->
### 定義の確認：$2\times2$ の公式はどう戻るか

$S_2$ は恒等置換と互換 $(1\ 2)$ だけなので
$$
\begin{aligned}
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}
&=(+1)ad+(-1)cb\\
&=ad-bc.
\end{aligned}
$$
既知の公式は一般定義の特殊例として戻ってきます。
<!-- definition-example-end -->

### $3\times3$ では何を足しているのか

各項は「各列から1成分ずつ、各行も重複なく選んだ積」です。例えば $\sigma=(2,3,1)$ なら

$$
\prod_{j=1}^3 a_{\sigma(j),j}
=a_{21}a_{32}a_{13}
$$

を選びます。この置換の符号は $+1$ なので、この積は正符号で入ります。

$S_3$ の6個の置換を全て並べると

$$
\begin{aligned}
\det A
={}&a_{11}a_{22}a_{33}
-a_{11}a_{32}a_{23}
-a_{21}a_{12}a_{33}\\
&+a_{21}a_{32}a_{13}
+a_{31}a_{12}a_{23}
-a_{31}a_{22}a_{13}.
\end{aligned}
$$

この6項を暗記する必要はありません。重要なのは、各項が「各列から1個・各行から1個」を選び、その並べ替えの向きを符号で補正していることです。そして次に、この和が狙った性質を本当に満たすかを確認します。

---

## 4. 欲しかった性質を公式から回収する

Leibniz 公式を定義しただけでは、面積・体積から出発した性質とまだ結び付いていません。そこで、各列の線形性、列交換による符号反転、正規化 $\det I_n=1$ を公式から一つずつ回収します。

<a id="thm-la3b-det-alternating-multilinear"></a>
<!-- formal-statement-start -->
> **定理（行列式の交代多重線形性）**  
> 行列式は各列について線形であり、2列を交換すると符号が反転する。従って同じ列を2本持つ行列の行列式は0である。また
$$
\det I_n=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

第 $k$ 列の線形性は、Leibniz 和の各項に第 $k$ 列の成分がちょうど1因子だけ現れることから分配します。列交換では、交換後の各項を元の行列の置換項へ添字付けし直し、置換の符号の積を使います。最後に単位行列では恒等置換以外の項が0になることを確認します。

<!-- proof-start -->
### 証明

第 $k$ 列だけを
$$
c_k=\alpha u+\beta v
$$
とします。[Leibniz 公式](#def-la3b-matrix-determinant)の各項には第 $k$ 列の成分 $a_{\sigma(k),k}$ がちょうど1個だけ現れます。その因子について分配すれば
$$
\det(c_1,\dots,\alpha u+\beta v,\dots,c_n)
=
\alpha\det(c_1,\dots,u,\dots,c_n)
+
\beta\det(c_1,\dots,v,\dots,c_n).
$$
よって各列について線形です。

次に第 $p$ 列と第 $q$ 列を交換した行列を $A'$ とし、$\tau=(p\ q)$ とします。交換後の成分は

$$
a'_{ij}=a_{i,\tau(j)}
$$

です。従って $A'$ の Leibniz 展開で $\sigma$ に対応する成分積は

$$
\begin{aligned}
\prod_{j=1}^n a'_{\sigma(j),j}
&=\prod_{j=1}^n a_{\sigma(j),\tau(j)}\\
&=\prod_{k=1}^n a_{\sigma(\tau(k)),k}\\
&=\prod_{k=1}^n a_{(\sigma\circ\tau)(k),k}.
\end{aligned}
$$

2行目では $k=\tau(j)$ と置き直し、互換なので $\tau^{-1}=\tau$ を使いました。つまり $A'$ の $\sigma$ 項は、元の $A$ の $\sigma\circ\tau$ 項と同じ成分積です。

一方、[置換の符号の積](#lem-la3b-permutation-sign-product)より

$$
\operatorname{sgn}(\sigma\circ\tau)
=\operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)
=-\operatorname{sgn}(\sigma).
$$

従って項は1対1に対応しながら符号だけ反転し、

$$
\det A'=-\det A.
$$

2列が同じなら交換しても行列は変わらないので
$$
\det A=-\det A,
$$
従って $\mathbb R,\mathbb C$ 上では $\det A=0$ です。

最後に $I_n$ の [Leibniz 公式](#def-la3b-matrix-determinant)では恒等置換以外の項はどこかで非対角成分0を含みます。従って
$$
\det I_n=1.
$$
$\square$
<!-- proof-end -->

ここで最初に要求した「多重線形・交代・標準体積1」がすべて得られました。

---

## 5. この3性質を満たす量は他にない

存在だけでなく一意性も重要です。これにより、後で別の方法から同じ3性質を持つ量が出てきたとき「それは行列式だ」と認定できます。

任意の多重線形かつ交代的な写像 $D$ に列ベクトルの基底展開を代入すると、交代性によって「同じ基底ベクトルを2回選んだ項」が全て消え、置換に対応する項だけが残ります。これが Leibniz 公式そのものになることを確認します。

<a id="thm-la3b-det-characterization"></a>
<!-- formal-statement-start -->
> **定理（行列式の特徴付け）**  
> $D:(\mathbb F^n)^n\to\mathbb F$ が列について多重線形、交代的で
$$
D(e_1,\dots,e_n)=1
$$
> を満たすなら
$$
D(c_1,\dots,c_n)=\det[c_1\ \cdots\ c_n].
$$
<!-- formal-statement-end -->

### 証明の見取り図

各列 $c_j$ を標準基底で展開し、多重線形性で全ての組合せを展開します。交代性により添字が重複する項は0なので、残る添字列は置換 $\sigma$ だけです。さらに置換された基底を標準順序へ戻す隣接交換の回数の偶奇が $\operatorname{sgn}(\sigma)$ を与えるため、残った和は Leibniz 公式に一致します。

<!-- proof-start -->
### 証明

各列を
$$
c_j=\sum_{i=1}^na_{ij}e_i
$$
と展開します。多重線形性から
$$
D(c_1,\dots,c_n)
=
\sum_{i_1,\dots,i_n}
\left(\prod_{j=1}^na_{i_jj}\right)
D(e_{i_1},\dots,e_{i_n}).
$$
添字 $i_1,\dots,i_n$ に重複がある項は、同じ基底ベクトルが2回入るので交代性から0です。従って生き残るのは
$$
(i_1,\dots,i_n)=(\sigma(1),\dots,\sigma(n))
$$
と置換で書ける項だけです。

置換 $\sigma$ の一列表記を標準順序へ戻すには、隣り合う転倒を1つずつ解消できます。各隣接交換で交代性から符号が1回反転し、必要な交換回数の偶奇は $\operatorname{inv}(\sigma)$ と一致します。従って

$$
\begin{aligned}
D(e_{\sigma(1)},\dots,e_{\sigma(n)})
&=(-1)^{\operatorname{inv}(\sigma)}
  D(e_1,\dots,e_n)\\
&=\operatorname{sgn}(\sigma).
\end{aligned}
$$
したがって
$$
D(c_1,\dots,c_n)
=
\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{j=1}^na_{\sigma(j),j}
=\det[c_1\ \cdots\ c_n].
$$
$\square$
<!-- proof-end -->

同じ証明から、正規化が1でない場合も
$$
D(c_1,\dots,c_n)
=D(e_1,\dots,e_n)\det[c_1\ \cdots\ c_n]
$$
と分かります。この形は LA3C の乗法性の証明で使います。

---

## 6. 行と列は本当に対称か

これまでは列について議論しました。行について対応する性質を得るには、転置で値が変わらないことを確認すれば十分です。

列について作った理論を行にも移すには、転置しても行列式が変わらないことを示せば十分です。Leibniz 公式で行と列を交換した後、置換 $\sigma$ を逆置換 $\sigma^{-1}$ へ付け替えるのが核心です。

<a id="thm-la3b-det-transpose"></a>
<!-- formal-statement-start -->
> **定理（転置で行列式は変わらない）**  
> 任意の正方行列 $A$ に対して
$$
\det(A^{\mathsf T})=\det A.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Leibniz 公式](#def-la3b-matrix-determinant)から
$$
\det(A^{\mathsf T})
=
\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{j=1}^n a_{j,\sigma(j)}.
$$
$i=\sigma(j)$、すなわち $j=\sigma^{-1}(i)$ と付け替えると
$$
\prod_{j=1}^n a_{j,\sigma(j)}
=
\prod_{i=1}^n a_{\sigma^{-1}(i),i}.
$$
また
$$
1=\operatorname{sgn}(\sigma\sigma^{-1})
=\operatorname{sgn}(\sigma)\operatorname{sgn}(\sigma^{-1})
$$
より
$$
\operatorname{sgn}(\sigma^{-1})=\operatorname{sgn}(\sigma).
$$
$\sigma\mapsto\sigma^{-1}$ は $S_n$ の全単射なので、和を $\rho=\sigma^{-1}$ で取り直して
$$
\det(A^{\mathsf T})
=
\sum_{\rho\in S_n}\operatorname{sgn}(\rho)
\prod_i a_{\rho(i),i}
=\det A.
$$
$\square$
<!-- proof-end -->

従って列について得た多重線形性・交換による符号反転・同一列で0という性質は、行についても成立します。

---

## 7. 章全体の見取り図

この章では

1. 面積・体積倍率に欲しい性質を先に決める。
2. 置換の符号で「向き」を管理する。
3. Leibniz 公式で一般の $n\times n$ 行列式を構成する。
4. その公式が多重線形・交代・$\det I=1$ を満たすことを証明する。
5. その3性質が行列式を一意に決めることを証明する。

という順に進みました。

つまり Leibniz 公式は突然現れる暗記公式ではなく、**欲しい性質を実現するための存在証明**です。

---

## 8. 演習

### LA3B-A01 置換の符号
- Level: A

$\sigma=(3,1,4,2)$ の転倒数と符号を求めよ。

<!-- solution-start -->
**解答**：転倒は
$$
(1,2),(1,4),(3,4)
$$
の3個です。従って
$$
\operatorname{inv}(\sigma)=3,
\qquad
\operatorname{sgn}(\sigma)=-1.
$$
<!-- solution-end -->

### LA3B-A02 Leibniz 公式
- Level: A

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$
について [Leibniz 公式](#def-la3b-matrix-determinant)から $\det A=ad-bc$ を導け。

<!-- solution-start -->
**解答**：$S_2=\{\mathrm{id},(1\ 2)\}$ で符号はそれぞれ $+1,-1$ です。従って
$$
\det A=(+1)a_{11}a_{22}+(-1)a_{21}a_{12}=ad-cb.
$$
<!-- solution-end -->

### LA3B-B01 同じ列があると0
- Level: B

多重線形性と「2列交換で符号反転」だけを使って、同じ列を2本持つ行列の行列式が0になることを示せ。

<!-- solution-start -->
**解答**：同じ2列を交換しても行列自体は変わりません。一方交換法則から行列式は $-1$ 倍になるので
$$
\det A=-\det A.
$$
$\mathbb R,\mathbb C$ 上では $2\det A=0$ から $\det A=0$ です。
<!-- solution-end -->

### LA3B-B02 一般の正規化
- Level: B

$D$ が交代多重線形で $D(e_1,\dots,e_n)=c$ を満たすとき
$$
D(c_1,\dots,c_n)=c\det[c_1\ \cdots\ c_n]
$$
を示せ。

<!-- solution-start -->
**解答**：特徴付け定理の証明と同じ基底展開を行います。生き残る置換項について
$$
D(e_{\sigma(1)},\dots,e_{\sigma(n)})
=\operatorname{sgn}(\sigma)c
$$
なので、Leibniz 和全体に共通因子 $c$ が掛かり結論を得ます。
<!-- solution-end -->


### LA3B-A03 標準基底を並べ替えた行列の行列式
- Level: A

$4\times4$ 行列 $P$ の列が順に
$$
e_2,\ e_4,\ e_1,\ e_3
$$
であるとする。[Leibniz 公式](#def-la3b-matrix-determinant)を使って $\det P$ を求めよ。

<!-- solution-start -->
**解答**：各列には1個だけ1があるので、Leibniz 公式で非零になるのは
$$
\sigma=(2,4,1,3)
$$
に対応する項だけです。この並びの転倒は
$$
(2,1),\quad(4,1),\quad(4,3)
$$
の3個なので
$$
\operatorname{sgn}(\sigma)=(-1)^3=-1.
$$
従って
$$
\boxed{\det P=-1}.
$$
一般にも、標準基底を置換して列に並べた行列の行列式は、対応する置換の符号です。
<!-- solution-end -->

### LA3B-A04 交代多重線形性だけで値を追う
- Level: A

$n=3$ とし
$$
D(c_1,c_2,c_3)=d
$$
とする。$D$ が交代3重線形であることだけを使って、次を求めよ。
$$
D(c_1+2c_2,c_2,c_3),\qquad
D(c_3,c_2,c_1),\qquad
D(2c_1,c_2,3c_3).
$$

<!-- solution-start -->
**解答**：多重線形性と交代性から
$$
\begin{aligned}
D(c_1+2c_2,c_2,c_3)
&=D(c_1,c_2,c_3)+2D(c_2,c_2,c_3)=d,\\
D(c_3,c_2,c_1)&=-D(c_1,c_2,c_3)=-d,\\
D(2c_1,c_2,3c_3)&=6D(c_1,c_2,c_3)=6d.
\end{aligned}
$$
2番目は第1・第3引数を1回交換しているので符号が反転します。
<!-- solution-end -->

### LA3B-B03 列が一次従属なら行列式は0
- Level: B

$n\times n$ 行列 $A=[c_1\ \cdots\ c_n]$ の列ベクトルが一次従属なら
$$
\det A=0
$$
であることを、乗法性や可逆性判定を使わず、交代多重線形性だけから示せ。

<!-- solution-start -->
**解答**：一次従属なので、係数の少なくとも1つが非零な関係
$$
\alpha_1c_1+\cdots+\alpha_nc_n=0
$$
があります。添字を入れ替えて $\alpha_n\ne0$ としてよいので
$$
c_n=-\sum_{j=1}^{n-1}\frac{\alpha_j}{\alpha_n}c_j.
$$
最終列について線形性を使うと
$$
\det(c_1,\dots,c_n)
=-\sum_{j=1}^{n-1}\frac{\alpha_j}{\alpha_n}
\det(c_1,\dots,c_{n-1},c_j).
$$
各項には $c_j$ が2回現れるため交代性から0です。従って $\det A=0$ です。
<!-- solution-end -->

### LA3B-C01 行列式0と一次従属を構成論から結ぶ
- Level: C

$A=[c_1\ \cdots\ c_n]$ とする。LA3C の乗法性・余因子・可逆性判定を使わず、LA3B までの結果だけから
$$
\boxed{\det A=0\iff c_1,\dots,c_n\text{ は一次従属}}
$$
を示せ。

<!-- solution-start -->
**解答**：一次従属なら $\det A=0$ である向きは B03 で示しました。逆向きは対偶

$$
c_1,\dots,c_n\text{ が一次独立}
\Longrightarrow
\det A\ne0
$$

を示します。

$c_1,\dots,c_n$ が一次独立なら、$n$ 本あるので $\mathbb F^n$ の基底です。仮に

$$
\det(c_1,\dots,c_n)=0
$$

とします。標準基底の各 $e_j$ をこの基底で

$$
e_j=\sum_{i=1}^n a_{ij}c_i
$$

と展開します。各列について順に多重線形性を使うと

$$
\det(e_1,\dots,e_n)
=
\sum_{i_1,\dots,i_n}
\left(\prod_{j=1}^n a_{i_jj}\right)
\det(c_{i_1},\dots,c_{i_n}).
$$

添字 $i_1,\dots,i_n$ に重複があれば、同じ列ベクトル $c_i$ が2回現れるので交代性からその項は0です。従って残るのは

$$
(i_1,\dots,i_n)
=(\sigma(1),\dots,\sigma(n))
\qquad(\sigma\in S_n)
$$

という置換項だけです。

各残存項は列交換で

$$
\det(c_{\sigma(1)},\dots,c_{\sigma(n)})
=
\operatorname{sgn}(\sigma)\det(c_1,\dots,c_n)
=0.
$$

したがって展開の全ての項が0となり

$$
\det(e_1,\dots,e_n)=0.
$$

しかし左辺は $\det I_n=1$ なので矛盾です。よって一次独立なら $\det A\ne0$ です。対偶を取れば

$$
\det A=0
\Longrightarrow
c_1,\dots,c_n\text{ は一次従属}
$$

を得ます。B03 と合わせて

$$
\det A=0
\iff
c_1,\dots,c_n\text{ は一次従属}
$$

です。
<!-- solution-end -->

---

## 9. 次に進む

行列式が「何者か」はこれで決まりました。しかし実際に毎回 $n!$ 項の Leibniz 公式を計算するのは現実的ではありません。

次の [LA3C](../LA3C/index.md) では、**基本変形・三角行列・Laplace 展開・余因子・可逆性・乗法性**へ進み、行列式を使える道具にします。