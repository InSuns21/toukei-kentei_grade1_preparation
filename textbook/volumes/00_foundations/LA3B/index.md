<!-- definition-example-audit: loose -->
# LA3B 標準線形代数 III-B：行列式の構成 — 面積・体積倍率をどう作るか

$2\times2$ 行列なら
$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc
$$
を知っています。しかし一般の $n\times n$ 行列で、突然「置換の和」を暗記しても行列式が何をしているのかは見えません。

そこで順序を逆にします。まず **面積・体積倍率として欲しい性質** を考え、その性質を本当に満たす関数を Leibniz 公式で構成します。

---

## 1. どんな量が欲しいのか

行列 $A=[c_1\ \cdots\ c_n]$ の列を、$\mathbb F^n$ に置いた $n$ 本のベクトルとみなします。面積・体積の符号付き倍率を表す量 $D(c_1,\dots,c_n)$ には少なくとも次を期待します。

1. 1本の列を2倍すれば体積も2倍になる。より一般に各列について線形である。
2. 2本の列が同じなら体積はつぶれて0になる。
3. 標準基底 $e_1,\dots,e_n$ が作る標準体積は1である。

条件2と多重線形性から、2列を交換すると符号が反転します。実際、2つの位置に $u+v$ を入れた値は0なので展開すると
$$
D(\dots,u,\dots,v,\dots)+D(\dots,v,\dots,u,\dots)=0.
$$

問題は、これらを同時に満たす関数が一般の $n$ で本当に存在するかです。

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

たとえば $\sigma=(2,3,1)$ なら転倒は $(1,3),(2,3)$ の2個なので $\operatorname{sgn}(\sigma)=1$ です。

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

隣り合う2箇所を交換する置換を $s_k=(k\ k+1)$ とします。並びの第 $k$ 項と第 $k+1$ 項を交換すると、この2項同士の大小関係だけが反転し、他の項との転倒数の合計は変わりません。従って
$$
\operatorname{inv}(\sigma\circ s_k)
\equiv \operatorname{inv}(\sigma)+1\pmod2,
$$
つまり
$$
\operatorname{sgn}(\sigma\circ s_k)=-\operatorname{sgn}(\sigma).
$$

任意の置換 $\rho$ は隣接互換の積
$$
\rho=s_{i_1}\cdots s_{i_m}
$$
と書けます。恒等置換から同じ交換を施せば $\operatorname{sgn}(\rho)=(-1)^m$、$\sigma$ から施せば
$$
\operatorname{sgn}(\sigma\circ\rho)=(-1)^m\operatorname{sgn}(\sigma)
$$
なので積の公式を得ます。

一般の互換 $(p\ q)$ は $2(q-p)-1$ 回の隣接交換で表せるため奇置換で、符号は $-1$ です。$\square$
<!-- proof-end -->

---

## 3. Leibniz 公式で一般の行列式を作る

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

### $2\times2$ の公式はどう戻るか

$S_2$ は恒等置換と互換 $(1\ 2)$ だけなので
$$
\begin{aligned}
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}
&=(+1)ad+(-1)cb\\
&=ad-bc.
\end{aligned}
$$
既知の公式は一般定義の特殊例として戻ってきます。

### $3\times3$ では何を足しているのか

各項は「各列から1成分ずつ、各行も重複なく選んだ積」です。符号は、その行番号の並びを標準順序へ戻す交換回数の偶奇を記録します。

ここで公式を覚える必要はありません。重要なのは、**この和が狙った3性質を本当に満たすか**です。

---

## 4. 欲しかった性質を公式から回収する

<a id="thm-la3b-det-alternating-multilinear"></a>
<!-- formal-statement-start -->
> **定理（行列式の交代多重線形性）**  
> 行列式は各列について線形であり、2列を交換すると符号が反転する。従って同じ列を2本持つ行列の行列式は0である。また
$$
\det I_n=1.
$$
<!-- formal-statement-end -->

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

次に第 $p$ 列と第 $q$ 列を交換した行列を $A'$ とし、$\tau=(p\ q)$ とします。$A'$ の展開で $\sigma$ に対応する成分積は、元の $A$ では $\sigma\circ\tau$ に対応します。一方
$$
\operatorname{sgn}(\sigma\circ\tau)=-\operatorname{sgn}(\sigma)
$$
なので、項は1対1に対応しながら符号だけ反転します。従って
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

$e_{\sigma(1)},\dots,e_{\sigma(n)}$ を標準順序へ戻すたびに交換1回につき符号が反転するので
$$
D(e_{\sigma(1)},\dots,e_{\sigma(n)})
=\operatorname{sgn}(\sigma)D(e_1,
\dots,e_n)
=\operatorname{sgn}(\sigma).
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

多重線形性と「2列交換で符号反転」だけを使って、同じ列を2本持つ行列の行列式が0になることを示せ。

<!-- solution-start -->
**解答**：同じ2列を交換しても行列自体は変わりません。一方交換法則から行列式は $-1$ 倍になるので
$$
\det A=-\det A.
$$
$\mathbb R,\mathbb C$ 上では $2\det A=0$ から $\det A=0$ です。
<!-- solution-end -->

### LA3B-B02 一般の正規化

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


### LA3B-A03 置換行列の行列式

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
一般にも、置換行列の行列式は対応する置換の符号です。
<!-- solution-end -->

### LA3B-A04 交代多重線形性だけで値を追う

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

$A=[c_1\ \cdots\ c_n]$ とする。LA3C の乗法性・余因子・可逆性判定を使わず、LA3B までの結果だけから
$$
\boxed{\det A=0\iff c_1,\dots,c_n\text{ は一次従属}}
$$
を示せ。

<!-- solution-start -->
**解答**：一次従属なら0である向きは B03 で示しました。逆向きの対偶を示します。

$c_1,\dots,c_n$ が一次独立なら、$\mathbb F^n$ の基底です。仮に
$$
\det(c_1,\dots,c_n)=0
$$
とします。標準基底の各 $e_j$ をこの基底で
$$
e_j=\sum_i a_{ij}c_i
$$
と展開します。多重線形性により
$$
\det(e_1,\dots,e_n)
$$
を展開すると、同じ $c_i$ を2回含む項は0で、残る項は $c_1,\dots,c_n$ の置換だけです。各残存項は交換による符号反転から
$$
\pm\det(c_1,
\dots,c_n)=0
$$
です。従って $\det I_n=0$ となりますが、LA3B で $\det I_n=1$ を示しているので矛盾です。

よって一次独立なら $\det A\ne0$。対偶を取れば
$$
\det A=0\Longrightarrow c_1,\dots,c_n\text{ は一次従属}
$$
も得られ、両方向が閉じます。
<!-- solution-end -->

---

## 9. 次に進む

行列式が「何者か」はこれで決まりました。しかし実際に毎回 $n!$ 項の Leibniz 公式を計算するのは現実的ではありません。

次の [LA3C](../LA3C/index.md) では、**基本変形・三角行列・Laplace 展開・余因子・可逆性・乗法性**へ進み、行列式を使える道具にします。