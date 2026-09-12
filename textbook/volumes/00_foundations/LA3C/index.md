<!-- definition-example-audit: loose -->
# LA3C 標準線形代数 III-C：行列式の計算・可逆性・乗法性

LA3B で行列式そのものは構成できました。しかし Leibniz 公式は $n!$ 個の項を持つので、計算道具として毎回そのまま使うのは現実的ではありません。

この章の出発点はもっと実務的です。

> **行基本変形で三角行列まで持っていったとき、行列式を追跡できないか？**

この問いから基本変形、三角行列、Laplace 展開、余因子へ進み、最後に
$$
\det(AB)=\det A\det B,
\qquad
A\text{ 可逆}\Longleftrightarrow\det A\ne0
$$
まで閉じます。LA4 の特性多項式・Cayley--Hamilton に必要な通常行列式のコアはこの章で揃います。

---

## 1. 基本変形で行列式はどう変わるか

LA3B で、列について「線形」「2列交換で符号反転」「同じ列が2本なら0」を示しました。また $\det A^{\mathsf T}=\det A$ なので同じ性質は行にも成り立ちます。

<a id="thm-la3c-det-elementary-operations"></a>
<!-- formal-statement-start -->
> **定理（基本変形と行列式）**  
> 行または列の基本変形に対して行列式は次のように変化する。
>
> 1. 2行（2列）を交換すると $-1$ 倍。
> 2. 1行（1列）を $c$ 倍すると $c$ 倍。
> 3. ある行（列）に別の行（列）の $c$ 倍を加えても不変。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 は交換による符号反転、2 は各行・列についての線形性です。

3 を列について示します。第 $j$ 列を $c_j+\lambda c_k$ に変えると
$$
\begin{aligned}
&\det(c_1,\dots,c_j+\lambda c_k,\dots,c_n)\\
&\qquad=
\det(c_1,\dots,c_j,\dots,c_n)
+\lambda\det(c_1,\dots,c_k,\dots,c_n).
\end{aligned}
$$
第2項には第 $k$ 列と同じ列が2本あるので0です。従って値は変わりません。行の場合は転置を使えば同じです。$\square$
<!-- proof-end -->

### 例：行基本変形だけで計算する

$$
A=\begin{pmatrix}
1&2&3\\
2&5&7\\
1&0&4
\end{pmatrix}
$$
とします。
$$
R_2\leftarrow R_2-2R_1,
\qquad
R_3\leftarrow R_3-R_1
$$
は行列式を変えないので
$$
\det A=
\det\begin{pmatrix}
1&2&3\\
0&1&1\\
0&-2&1
\end{pmatrix}.
$$
さらに
$$
R_3\leftarrow R_3+2R_2
$$
として
$$
\det A=
\det\begin{pmatrix}
1&2&3\\
0&1&1\\
0&0&3
\end{pmatrix}.
$$
残る問題は三角行列の行列式です。

---

## 2. 三角行列なら対角成分だけ見ればよい

<a id="thm-la3c-triangular-determinant"></a>
<!-- formal-statement-start -->
> **定理（三角行列の行列式）**  
> 上三角または下三角行列 $A=(a_{ij})$ に対して
$$
\det A=\prod_{i=1}^na_{ii}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上三角の場合を示します。Leibniz 公式の項
$$
\prod_{j=1}^na_{\sigma(j),j}
$$
が非零であるためには、下三角部分が0なので全ての $j$ で
$$
\sigma(j)\le j
$$
でなければなりません。

しかし
$$
\sum_j\sigma(j)=1+\cdots+n=\sum_jj.
$$
全てで $\sigma(j)\le j$ なのに和が等しいため、各 $j$ で $\sigma(j)=j$ です。従って非零になり得るのは恒等置換の項だけで
$$
\det A=a_{11}\cdots a_{nn}.
$$
下三角の場合は転置を使います。$\square$
<!-- proof-end -->

したがって先ほどの例では
$$
\det A=1\cdot1\cdot3=3.
$$

Gaussian elimination と行列式が自然につながりました。

---

## 3. 1行・1列に分解する：Laplace 展開

基本変形が向く行列もあれば、0が多くて1行だけ展開した方が速い行列もあります。そのための道具が余因子です。

行 $i$ と列 $j$ を取り除いてできる $(n-1)\times(n-1)$ 行列を $M_{ij}$ とし
$$
C_{ij}=(-1)^{i+j}\det M_{ij}
$$
を $(i,j)$ 余因子と呼びます。

<a id="thm-la3c-laplace-expansion"></a>
<!-- formal-statement-start -->
> **定理（Laplace 展開）**  
> 任意の $n\times n$ 行列 $A=(a_{ij})$ と固定した列 $j$ に対して
$$
\det A=\sum_{i=1}^n a_{ij}C_{ij}.
$$
> 固定した行 $i$ に対しても
$$
\det A=\sum_{j=1}^n a_{ij}C_{ij}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列 $j$ で展開します。Leibniz 公式を $\sigma(j)=i$ となる項ごとに分けると
$$
\det A
=
\sum_{i=1}^n
\sum_{\sigma:\sigma(j)=i}
\operatorname{sgn}(\sigma)
\prod_{k=1}^n a_{\sigma(k),k}.
$$
固定した $i$ の内側の和では $a_{ij}$ が共通なので外へ出せます。

$\sigma(j)=i$ を固定します。列番号 $1,\dots,n$ から $j$ を除いた集合を
$$
C=\{1,\dots,n\}\setminus\{j\},
$$
行番号 $1,\dots,n$ から $i$ を除いた集合を
$$
R=\{1,\dots,n\}\setminus\{i\}
$$
とし、それぞれを昇順に
$$
c_1<\cdots<c_{n-1},\qquad r_1<\cdots<r_{n-1}
$$
と並べます。$\sigma(j)=i$ なので、$\sigma$ は $C$ を $R$ へ全単射に移します。従って一意な $\bar\sigma\in S_{n-1}$ が
$$
\sigma(c_k)=r_{\bar\sigma(k)}
$$
で定まります。これは $\sigma(j)=i$ を満たす置換と $S_{n-1}$ の置換との1対1対応です。

成分積から $a_{ij}$ を除いた部分は、この対応の下でちょうど小行列 $M_{ij}$ の Leibniz 項になります。残るのは符号です。位置 $j$ を先頭へ移すには $j-1$ 回、値 $i$ を先頭へ移すには $i-1$ 回の隣接交換が必要で、その後に残る置換が $\bar\sigma$ です。従って
$$
\operatorname{sgn}(\sigma)
=(-1)^{(j-1)+(i-1)}\operatorname{sgn}(\bar\sigma)
=(-1)^{i+j}\operatorname{sgn}(\bar\sigma).
$$
ここで最後の等号は、$i+j$ と $(i-1)+(j-1)$ が2だけ違い、$(-1)^2=1$ だからです。

したがって固定した $i$ に対応する項の和は
$$
a_{ij}(-1)^{i+j}
\sum_{\bar\sigma\in S_{n-1}}
\operatorname{sgn}(\bar\sigma)
\prod_{k=1}^{n-1}(M_{ij})_{\bar\sigma(k),k}
=a_{ij}C_{ij}.
$$
これを $i$ について足せば列展開を得ます。行展開は $A^{\mathsf T}$ に列展開を適用し、$\det A^{\mathsf T}=\det A$ を使えば従います。$\square$
<!-- proof-end -->

### 例：0の多い行を使う

$$
A=\begin{pmatrix}
1&2&0\\
0&3&4\\
5&0&6
\end{pmatrix}
$$
を第1行で展開すると
$$
\begin{aligned}
\det A
&=1\det\begin{pmatrix}3&4\\0&6\end{pmatrix}
-2\det\begin{pmatrix}0&4\\5&6\end{pmatrix}\\
&=18-2(-20)=58.
\end{aligned}
$$
Leibniz 公式の6項を全部書く必要はありません。

---

## 4. 余因子を行列にまとめる

<a id="def-la3c-adjugate"></a>
<!-- formal-statement-start -->
> **定義（余因子行列）**  
> 余因子 $C_{ij}$ を用いて
$$
\operatorname{adj}(A)_{ji}=C_{ij}
$$
> と定めた行列を $A$ の **余因子行列（adjugate）** という。
<!-- formal-statement-end -->

$2\times2$ なら
$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
\quad\Longrightarrow\quad
\operatorname{adj}(A)=
\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.
$$

<a id="thm-la3c-adjugate-identity"></a>
<!-- formal-statement-start -->
> **定理（余因子行列の基本恒等式）**  
> 任意の正方行列 $A$ に対して

$$
A\operatorname{adj}(A)
=\operatorname{adj}(A)A
=(\det A)I.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A\operatorname{adj}(A)$ の $(i,j)$ 成分は
$$
\sum_{k=1}^na_{ik}C_{jk}
$$
です。

$i=j$ なら第 $i$ 行の Laplace 展開そのものなので $\det A$ です。$i\ne j$ なら、第 $j$ 行を第 $i$ 行で置き換えた行列を考えます。その第 $j$ 行に沿う Laplace 展開が上の和であり、この行列には第 $i$ 行と第 $j$ 行として同じ行が2本あるため行列式は0です。従って
$$
A\operatorname{adj}(A)=(\det A)I.
$$

同様に $\operatorname{adj}(A)A$ の $(i,j)$ 成分を列の Laplace 展開として読むと、$i=j$ で $\det A$、$i\ne j$ で同じ列を2本持つ行列の行列式0になるため
$$
\operatorname{adj}(A)A=(\det A)I.
$$
$\square$
<!-- proof-end -->

したがって $\det A\ne0$ なら
$$
A^{-1}=\frac1{\det A}\operatorname{adj}(A).
$$

この恒等式は LA4 の Cayley--Hamilton 証明で多項式行列 $tI-A$ に対して再利用します。

---

## 5. 積の行列式を、巨大な展開なしで証明する

$\det(AB)$ を Leibniz 公式へ直接代入すると二重の置換和になり、何が起きているか見えにくくなります。LA3B の「交代多重線形関数は標準基底での値だけで決まる」を使うと短く証明できます。

<a id="thm-la3c-det-multiplicative"></a>
<!-- formal-statement-start -->
> **定理（行列式の乗法性）**  
> 正方行列 $A,B$ に対して
$$
\det(AB)=\det A\det B.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$B$ の列を $b_1,\dots,b_n$ とし
$$
D_A(b_1,\dots,b_n)=\det(Ab_1,\dots,Ab_n)
$$
と置きます。

$A$ は線形写像なので $b_j\mapsto Ab_j$ は線形です。さらに行列式は各列について線形だから $D_A$ は多重線形です。同じ $b_i=b_j$ を入れれば $Ab_i=Ab_j$ なので $D_A=0$。従って $D_A$ は交代多重線形です。

標準基底では
$$
D_A(e_1,\dots,e_n)
=\det(Ae_1,\dots,Ae_n)
=\det A.
$$
LA3B の特徴付け定理の一般形から
$$
D_A(b_1,\dots,b_n)
=(\det A)\det(b_1,\dots,b_n).
$$
左辺は $AB$ の列に対する行列式、右辺第2因子は $\det B$ なので
$$
\det(AB)=\det A\det B.
$$
$\square$
<!-- proof-end -->

---

## 6. 行列式は「次元を潰したか」を検出する

<a id="thm-la3c-det-invertible"></a>
<!-- formal-statement-start -->
> **定理（行列式による可逆性判定）**  
> 正方行列 $A$ について
$$
A\text{ が可逆}
\Longleftrightarrow
\det A\ne0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\det A\ne0$ とします。前節の余因子計算から
$$
A\operatorname{adj}(A)=(\det A)I,
$$
従って
$$
A^{-1}=\frac1{\det A}\operatorname{adj}(A)
$$
が存在します。

逆に $A$ が可逆とします。乗法性から
$$
1=\det I
=\det(A^{-1}A)
=\det(A^{-1})\det A.
$$
積が1なので $\det A\ne0$ です。$\square$
<!-- proof-end -->

これは「行列式が0かどうか」が単なる計算結果ではなく、**線形写像が情報を潰しているかどうか**を判定していることを意味します。

---

## 7. 基底を変えても行列式は変わらない

同じ線形写像でも基底を変えると表現行列は
$$
B=P^{-1}AP
$$
へ変わります。行列式が線形写像に付随する量として使えるには、この変化で値が不変でなければなりません。

<a id="thm-la3c-det-similarity-invariant"></a>
<!-- formal-statement-start -->
> **定理（行列式の相似不変性）**  
> $P$ が可逆なら
$$
\det(P^{-1}AP)=\det A.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

乗法性から
$$
\det(P^{-1}AP)
=\det(P^{-1})\det(A)\det(P).
$$
また
$$
1=\det(P^{-1}P)=\det(P^{-1})\det(P).
$$
従って
$$
\det(P^{-1}AP)=\det A.
$$
$\square$
<!-- proof-end -->

この結果により、後続 LA4 の
$$
\chi_T(t)=\det(tI-T)
$$
は基底を変えても同じ多項式になります。

---

## 8. どの計算法を使うか

行列式には複数の顔があります。

- **Leibniz 公式**：一般定義・理論証明向き。
- **基本変形 + 三角化**：数値計算・大きめの行列向き。
- **Laplace 展開**：0が多い行・列、小さいサイズの手計算向き。
- **余因子行列**：逆行列や Cayley--Hamilton の理論向き。

全部を同じ「公式集」として覚えるのではなく、**何をしたいときの道具か**で選びます。

---

## 9. 演習

### LA3C-A01 基本変形

$$
A=\begin{pmatrix}
2&1&0\\
4&3&1\\
0&2&5
\end{pmatrix}
$$
の行列式を行基本変形で求めよ。

<!-- solution-start -->
**解答**：
$$
R_2\leftarrow R_2-2R_1
$$
では行列式は不変なので
$$
\det A=
\det\begin{pmatrix}
2&1&0\\
0&1&1\\
0&2&5
\end{pmatrix}.
$$
さらに
$$
R_3\leftarrow R_3-2R_2
$$
として
$$
\det A=
\det\begin{pmatrix}
2&1&0\\
0&1&1\\
0&0&3
\end{pmatrix}=2\cdot1\cdot3=6.
$$
<!-- solution-end -->

### LA3C-A02 Laplace 展開

$$
A=\begin{pmatrix}
1&0&2\\
0&3&0\\
4&0&5
\end{pmatrix}
$$
の行列式を最も計算量の少ない行または列で展開せよ。

<!-- solution-start -->
**解答**：第2行で展開すると非零項は中央だけです。
$$
\det A
=3\det\begin{pmatrix}1&2\\4&5\end{pmatrix}
=3(5-8)=-9.
$$
<!-- solution-end -->

### LA3C-B01 乗法性の核心

固定した $A$ に対して
$$
D_A(b_1,\dots,b_n)=\det(Ab_1,\dots,Ab_n)
$$
が交代多重線形であることを、各性質を1つずつ確認して示せ。

<!-- solution-start -->
**解答**：第 $j$ 引数について
$$
A(\alpha u+\beta v)=\alpha Au+\beta Av
$$
であり、その後の行列式が第 $j$ 列について線形なので $D_A$ も線形です。全ての引数で同様なので多重線形。$b_i=b_j$ なら $Ab_i=Ab_j$ となり行列式に同じ列が2本現れるため0です。従って交代的です。
<!-- solution-end -->

### LA3C-B02 相似変換と特性多項式

$B=P^{-1}AP$ とする。任意の $t$ に対して
$$
\det(tI-B)=\det(tI-A)
$$
を示せ。

<!-- solution-start -->
**解答**：
$$
tI-B=P^{-1}(tI-A)P
$$
なので相似不変性から
$$
\det(tI-B)
=\det(P^{-1}(tI-A)P)
=\det(tI-A).
$$
従って特性多項式は表現行列の基底選択に依存しません。
<!-- solution-end -->


### LA3C-A03 パラメータ付き行列の可逆性

$t\in\mathbb R$ とし
$$
A_t=
\begin{pmatrix}
1&t&0\\
0&1&t\\
t&0&1
\end{pmatrix}.
$$
$\det A_t$ を求め、$A_t$ が可逆でない $t$ を全て求めよ。

<!-- solution-start -->
**解答**：第1行で展開すると
$$
\begin{aligned}
\det A_t
&=1\det\begin{pmatrix}1&t\\0&1\end{pmatrix}
-t\det\begin{pmatrix}0&t\\t&1\end{pmatrix}\\
&=1-t(0-t^2)=1+t^3.
\end{aligned}
$$
実数では
$$
1+t^3=(t+1)(t^2-t+1)
$$
で、$t^2-t+1>0$ なので
$$
\boxed{t=-1}
$$
のときだけ $\det A_t=0$、従って可逆ではありません。
<!-- solution-end -->

### LA3C-A04 余因子行列から逆行列を作る

$$
A=
\begin{pmatrix}
1&1&0\\
0&1&1\\
1&0&1
\end{pmatrix}
$$
について $\det A$ と $\operatorname{adj}(A)$ を求め、[上で示した余因子行列の等式](#thm-la3c-adjugate-identity)から $A^{-1}$ を求めよ。

<!-- solution-start -->
**解答**：計算すると
$$
\det A=2.
$$
各余因子を並べて転置すると
$$
\operatorname{adj}(A)=
\begin{pmatrix}
1&-1&1\\
1&1&-1\\
-1&1&1
\end{pmatrix}.
$$
従って
$$
A^{-1}
=\frac1{\det A}\operatorname{adj}(A)
=\frac12
\begin{pmatrix}
1&-1&1\\
1&1&-1\\
-1&1&1
\end{pmatrix}.
$$
実際に $A\operatorname{adj}(A)=2I$ を掛け算で確認できます。
<!-- solution-end -->

### LA3C-B03 Cramer の公式を導く

$A=[a_1\ \cdots\ a_n]$ を可逆な $n\times n$ 行列とし、$Ax=b$ の解を
$$
x=(x_1,\dots,x_n)^T
$$
とする。$A_j$ を $A$ の第 $j$ 列だけを $b$ に置き換えた行列とするとき
$$
\boxed{x_j=\frac{\det A_j}{\det A}}
$$
を、行列式の多重線形性と交代性から導け。

<!-- solution-start -->
**解答**：$Ax=b$ は列ベクトルで書けば
$$
b=x_1a_1+\cdots+x_na_n
$$
です。従って第 $j$ 列について多重線形性を使うと
$$
\det A_j
=\sum_{k=1}^n x_k
\det(a_1,\dots,a_{j-1},a_k,a_{j+1},\dots,a_n).
$$
$k\ne j$ の項には $a_k$ が2本現れるので0です。残るのは $k=j$ の項だけで
$$
\det A_j=x_j\det A.
$$
$A$ は可逆だから $\det A\ne0$。従って
$$
x_j=\frac{\det A_j}{\det A}.
$$
公式を暗記するより、「置換列 $b$ を解の線形結合で展開すると重複列が全部消える」と見るのが本質です。
<!-- solution-end -->

### LA3C-C01 corank 1 の行列と余因子行列

$A\in\mathbb F^{n\times n}$ が
$$
\operatorname{rank}A=n-1
$$
を満たすとする。次を示せ。

1. $\operatorname{adj}(A)\ne0$。
2. $\operatorname{adj}(A)$ の各列は $\ker A$ に属する。
3. $\operatorname{rank}\operatorname{adj}(A)=1$。

<!-- solution-start -->
**解答**：$\operatorname{rank}A=n-1$ なので $\det A=0$ です。

まず「rank が $r$ なら非零な $r\times r$ 小行列式が存在する」という事実を、この場合に必要な範囲で確認します。$\operatorname{rank}A=n-1$ なので $A$ には一次独立な $n-1$ 本の列があり、それらだけを取り出した $n\times(n-1)$ 行列を $B$ とします。$B$ の列階数は $n-1$ です。行階数と列階数は等しいので、$B$ の行のうち $n-1$ 本を選んで一次独立にできます。その行と先ほど選んだ列の交差部分は正則な $(n-1)\times(n-1)$ 行列であり、その行列式は非零です。したがって $A$ には少なくとも1つの非零な $(n-1)\times(n-1)$ 小行列式があります。

その値は符号を除いて $A$ の余因子の1つなので
$$
\operatorname{adj}(A)\ne0.
$$

[上で示した余因子行列の等式](#thm-la3c-adjugate-identity)から
$$
A\operatorname{adj}(A)=(\det A)I=0.
$$
従って $\operatorname{adj}(A)$ の各列 $u$ は $Au=0$ を満たし、$u\in\ker A$ です。rank-nullity より
$$
\dim\ker A=n-(n-1)=1.
$$
したがって $\operatorname{adj}(A)$ の全ての列は同じ1次元空間に入り
$$
\operatorname{rank}\operatorname{adj}(A)\le1.
$$
しかし第1段階で $\operatorname{adj}(A)\ne0$ を示したので rank は0ではありません。従って
$$
\boxed{\operatorname{rank}\operatorname{adj}(A)=1}.
$$
なお $\operatorname{adj}(A)A=0$ から、行についても同様に左核へ入ることが分かります。
<!-- solution-end -->

---

## 10. 次に進む

ここまでで LA4 に必要な通常行列式の理論は閉じました。先に作用素多項式・Cayley--Hamiltonへ進むなら [LA4](../LA4/index.md) へ進めます。

一方、行列式を「座標公式」ではなく **線形写像が最高次の体積形式を何倍するか**として捉え直したい場合は [LA3D](../LA3D/index.md) へ進みます。LA3D は概念的な抽象化であり、LA4 の必須前提ではありません。