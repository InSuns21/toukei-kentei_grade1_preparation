# RKHS4 最大マージンとハードマージン SVM

<!-- definition-example-audit: strict -->

[OPT12](../OPT12/index.md#def-opt12-quadratic-program) では、ハードマージン SVM の主問題が凸二次計画になるところまで見ました。ここでは、その式を「機械学習の例」として眺めるだけで終わらせず、

$$
\boxed{
\text{線形分離}
\Longrightarrow
\text{幾何マージン}
\Longrightarrow
\text{凸二次計画}
\Longrightarrow
\text{Lagrange 双対}
\Longrightarrow
\text{KKT}
\Longrightarrow
\text{凸包の最近点}
}
$$

という一本の理論として閉じます。

この章で重要なのは、双対問題の式を暗記することではありません。なぜ目的関数が $\frac12\|w\|^2$ なのか、なぜ

$$
w=\sum_i\alpha_i y_i x_i
$$

となるのか、なぜ $\alpha_i>0$ の点だけが境界を支えるのか、そしてなぜ正負クラスの凸包間距離が最大マージンに一致するのかを、自力で再構成できることが目標です。

[RKHS3](../RKHS3/index.md) では無限次元の関数空間が有限個の標本へ落ちる構造を見ました。本章はいったん有限次元の線形分類へ戻り、SVM 固有の最適化構造を分離して理解します。核による非線形化は次章で、この構造をそのまま特徴空間へ持ち上げます。

---

## 1. 線形分離とは何を要求しているのか

訓練データを

$$
(x_1,y_1),\dots,(x_n,y_n),
\qquad
x_i\in\mathbb R^p,
\qquad
y_i\in\{-1,+1\}
$$

とします。本章では正例と負例がともに少なくとも1点存在すると仮定します。

アフィン関数

$$
x\longmapsto w^{\mathsf T}x+b
$$

の符号で分類することを考えます。

<a id="def-rkhs4-linear-separable"></a>
<!-- formal-statement-start -->
> **定義（線形分離可能性）**  
> 正例と負例をともに含む有限標本 $(x_i,y_i)_{i=1}^n$ が **線形分離可能**であるとは、ある
>
> $$
> w\in\mathbb R^p\setminus\{0\},
> \qquad
> b\in\mathbb R
> $$
>
> が存在して
>
> $$
> y_i(w^{\mathsf T}x_i+b)>0
> \qquad
> (i=1,\dots,n)
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs4-linear-separable -->
**定義の確認**：1次元で正負を分ける

正例を

$$
X_+=\{2,3\},
$$

負例を

$$
X_-=\{-1,0\}
$$

とします。

$$
w=1,
\qquad
b=-1
$$

と置けば、

$$
x=2,3
\quad\Longrightarrow\quad
w x+b=1,2>0,
$$

$$
x=-1,0
\quad\Longrightarrow\quad
w x+b=-2,-1<0.
$$

したがって全ての訓練点で

$$
y_i(wx_i+b)>0
$$

となり、線形分離可能です。

境界は

$$
x=1
$$

です。ただし、まだ「なぜ $x=1$ が最もよい境界なのか」は決めていません。線形分離可能性は、単に分けられる超平面が少なくとも一つあることしか言っていません。
<!-- definition-example-end -->

---

## 2. 関数マージンと幾何マージンを分ける

ある分離超平面 $(w,b)$ に対し、点 $(x_i,y_i)$ の分類の余裕を

$$
y_i(w^{\mathsf T}x_i+b)
$$

で測れそうです。

しかし、この量には問題があります。

同じ超平面を表す

$$
(w,b)
\quad\text{と}\quad
(cw,cb),
\qquad c>0
$$

では、分類境界

$$
w^{\mathsf T}x+b=0
$$

は同じなのに、値は $c$ 倍されます。

そこで、超平面の法線の長さで割ります。

<a id="def-rkhs4-margin"></a>
<!-- formal-statement-start -->
> **定義（関数マージン・幾何マージン）**  
> $w\ne0$ とする。訓練点 $(x_i,y_i)$ に対し
>
> $$
> \widehat\gamma_i
> =
> y_i(w^{\mathsf T}x_i+b)
> $$
>
> を **関数マージン**、
>
> $$
> \gamma_i
> =
> \frac{y_i(w^{\mathsf T}x_i+b)}{\|w\|_2}
> $$
>
> を **幾何マージン**という。標本全体の幾何マージンを
>
> $$
> \gamma(w,b)
> =
> \min_{1\le i\le n}
> \gamma_i
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs4-margin -->
**定義の確認**：同じ境界を2通りに書く

1次元で

$$
w=1,\quad b=-1
$$

と

$$
w=10,\quad b=-10
$$

を比べます。どちらも境界は $x=1$ です。

正例 $x=2$ では関数マージンはそれぞれ

$$
1,
\qquad
10
$$

ですが、幾何マージンは

$$
\frac1{|1|}=1,
\qquad
\frac{10}{|10|}=1.
$$

同じです。

したがって、分類境界そのものの余裕を測るには幾何マージンが自然です。
<!-- definition-example-end -->

### 2.1 幾何マージンは超平面までの距離

点 $x$ から超平面

$$
H=\{z:w^{\mathsf T}z+b=0\}
$$

までの距離は

$$
\frac{|w^{\mathsf T}x+b|}{\|w\|_2}
$$

です。

線形分離している点では $y_i$ が符号を正側へ揃えるので、

$$
\gamma_i
=
\frac{y_i(w^{\mathsf T}x_i+b)}{\|w\|_2}
$$

は、各点から境界までの符号付き距離です。

最大マージン分類とは

$$
\boxed{
\text{最も境界に近い訓練点までの距離を最大にする}
}
$$

ことです。

---

## 3. スケーリング自由度を消すと SVM の主問題が出る

幾何マージンは

$$
(w,b)\mapsto(cw,cb),
\qquad c>0
$$

で不変です。

線形分離可能なら

$$
m(w,b)
=
\min_i y_i(w^{\mathsf T}x_i+b)
$$

は正です。そこで

$$
c=\frac1{m(w,b)}
$$

と取れば、同じ分類境界を

$$
\min_i y_i((cw)^{\mathsf T}x_i+cb)=1
$$

となるように正規化できます。

この正規化の下では

$$
\gamma(cw,cb)
=
\frac1{\|cw\|_2}.
$$

したがってマージン最大化は $\|w\|_2$ 最小化へ変わります。

<a id="thm-rkhs4-primal-max-margin"></a>
<!-- formal-statement-start -->
> **定理（最大マージン問題とハードマージン SVM の同値性）**  
> 正例・負例をともに含む有限標本 $(x_i,y_i)_{i=1}^n$ が線形分離可能であるとする。このとき
>
> $$
> \max_{w\ne0,\ b}
> \min_i
> \frac{y_i(w^{\mathsf T}x_i+b)}{\|w\|_2}
> $$
>
> と
>
> $$
> \boxed{
> \min_{w,b}
> \frac12\|w\|_2^2
> \quad
> \text{subject to}
> \quad
> y_i(w^{\mathsf T}x_i+b)\ge1
> \quad(i=1,\dots,n)
> }
> $$
>
> は同じ分類超平面を与える。後者の最適解 $(w^*,b^*)$ に対する最大幾何マージンは
>
> $$
> \gamma^*=\frac1{\|w^*\|_2}.
> $$
>
> また2本の支持超平面
>
> $$
> w^{*\mathsf T}x+b^*=1,
> \qquad
> w^{*\mathsf T}x+b^*=-1
> $$
>
> の間の距離は
>
> $$
> \frac{2}{\|w^*\|_2}
> $$
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の分離超平面は、正の定数倍によって最小関数マージンを1へ正規化できます。正規化すると、幾何マージンは $1/\|w\|_2$ になるため、幾何マージン最大化はノルム最小化と同値になります。

<!-- proof-start -->
### 証明

線形分離可能な $(w,b)$ を一つ取ります。

$$
m
=
\min_i y_i(w^{\mathsf T}x_i+b)
$$

と置けば、有限個の正数の最小値なので

$$
m>0.
$$

そこで

$$
\widetilde w=\frac{w}{m},
\qquad
\widetilde b=\frac{b}{m}
$$

とします。

すると全ての $i$ で

$$
y_i(\widetilde w^{\mathsf T}x_i+\widetilde b)
=
\frac{y_i(w^{\mathsf T}x_i+b)}{m}
\ge1,
$$

かつ少なくとも一つの点で等号が成り立ちます。

この正規化後の幾何マージンは

$$
\min_i
\frac{
y_i(\widetilde w^{\mathsf T}x_i+\widetilde b)
}{
\|\widetilde w\|_2
}
=
\frac1{\|\widetilde w\|_2}.
$$

したがって幾何マージンを最大にすることは

$$
\|\widetilde w\|_2
$$

を最小にすることと同値です。

平方根を避けても最小点は変わらないため、

$$
\frac12\|\widetilde w\|_2^2
$$

を最小化してよいことになります。

最後に、互いに平行な超平面

$$
w^{\mathsf T}x+b=c_1,
\qquad
w^{\mathsf T}x+b=c_2
$$

の距離は

$$
\frac{|c_1-c_2|}{\|w\|_2}.
$$

ここで $c_1=1,c_2=-1$ とすれば、支持超平面間距離は

$$
\frac2{\|w^*\|_2}
$$

です。
<!-- proof-end -->

---

## 4. ハードマージン SVM は凸二次計画である

<a id="def-rkhs4-hard-margin-svm"></a>
<!-- formal-statement-start -->
> **定義（ハードマージン SVM）**  
> 線形分離可能な訓練データ $(x_i,y_i)_{i=1}^n$ に対し
>
> $$
> \min_{w\in\mathbb R^p,\ b\in\mathbb R}
> \frac12\|w\|_2^2
> $$
>
> subject to
>
> $$
> y_i(w^{\mathsf T}x_i+b)\ge1
> \qquad
> (i=1,\dots,n)
> $$
>
> を **ハードマージン SVM** の主問題という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs4-hard-margin-svm -->
**定義の確認**：1次元の主問題を直接解く

再び

$$
X_+=\{2,3\},
\qquad
X_-=\{-1,0\}
$$

とします。

制約は

$$
2w+b\ge1,
\qquad
3w+b\ge1,
$$

$$
w-b\ge1,
\qquad
-b\ge1
$$

です。

候補

$$
w=1,
\qquad
b=-1
$$

では、

$$
2w+b=1,
\qquad
-b=1
$$

となり、$x=2$ と $x=0$ が支持超平面上にあります。

目的値は

$$
\frac12w^2=\frac12.
$$

この後、双対問題と KKT 条件から、この候補が大域最適であることを代数的にも確認します。
<!-- definition-example-end -->

[OPT12 の凸二次計画](../OPT12/index.md#def-opt12-quadratic-program)として見ると、

$$
z=
\begin{pmatrix}
w\\b
\end{pmatrix},
\qquad
Q=
\begin{pmatrix}
I_p&0\\
0&0
\end{pmatrix}
$$

なので

$$
Q\succeq0.
$$

従って主問題は凸二次計画です。

一方、$b$ 方向には二次項がないため

$$
Q\not\succ0.
$$

このため $(w,b)$ 全体に対する目的関数の狭義凸性からは一意性を直ちに言えません。一意性は後で、SVM 固有の構造まで使って確認します。

---

## 5. 線形分離可能なら Slater 条件まで自動的に得られる

Lagrange 双対と KKT 条件を必要十分条件として使うには、強双対を正当化する必要があります。

本章では [OPT5 の Slater 条件](../OPT5/index.md#thm-opt5-slater-strong-duality)を使います。

ハードマージンの不等式を

$$
g_i(w,b)
=
1-y_i(w^{\mathsf T}x_i+b)
\le0
$$

と書きます。

線形分離可能なら、ある $(w_0,b_0)$ で

$$
y_i(w_0^{\mathsf T}x_i+b_0)>0
$$

が全ての $i$ で成り立ちます。

有限標本なので

$$
m_0
=
\min_i y_i(w_0^{\mathsf T}x_i+b_0)
>0.
$$

例えば

$$
c>\frac1{m_0}
$$

を取れば

$$
y_i((cw_0)^{\mathsf T}x_i+cb_0)>1
$$

となり、

$$
g_i(cw_0,cb_0)<0
$$

です。

したがって、線形分離可能性は単なる実行可能性だけでなく **厳密実行可能点**を与えます。

$$
\boxed{
\text{線形分離可能}
\Longrightarrow
\text{Slater 条件}
\Longrightarrow
\text{強双対・KKT の必要十分性}
}
$$

という流れが成立します。

---

## 6. Lagrangian から双対問題を導出する

各制約

$$
1-y_i(w^{\mathsf T}x_i+b)\le0
$$

に対し、Lagrange 乗数

$$
\alpha_i\ge0
$$

を入れます。

Lagrangian は

$$
\begin{aligned}
L(w,b,\alpha)
&=
\frac12\|w\|_2^2
+
\sum_{i=1}^n
\alpha_i
\left[
1-y_i(w^{\mathsf T}x_i+b)
\right]\\
&=
\frac12\|w\|_2^2
-
w^{\mathsf T}
\sum_i\alpha_i y_i x_i
-
b\sum_i\alpha_i y_i
+
\sum_i\alpha_i.
\end{aligned}
$$

双対関数は

$$
q(\alpha)
=
\inf_{w,b}L(w,b,\alpha)
$$

です。

### 6.1 $b$ について下に有界である条件

$b$ は線形にしか現れません。

もし

$$
\sum_i\alpha_i y_i\ne0
$$

なら、$b$ の符号と大きさを選んで

$$
-b\sum_i\alpha_i y_i\to-\infty
$$

とできるので、

$$
q(\alpha)=-\infty.
$$

従って有限な双対値を持つには

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

が必要です。

### 6.2 $w$ について最小化する

上の等式制約を満たすとき、

$$
L(w,b,\alpha)
=
\frac12\|w\|_2^2
-
w^{\mathsf T}
\sum_i\alpha_i y_i x_i
+
\sum_i\alpha_i.
$$

ここで

$$
s(\alpha)
=
\sum_i\alpha_i y_i x_i
$$

と置けば、

$$
\frac12\|w\|_2^2-w^{\mathsf T}s
=
\frac12\|w-s\|_2^2
-\frac12\|s\|_2^2.
$$

従って最小点は

$$
\boxed{
w=s(\alpha)
=
\sum_i\alpha_i y_i x_i
}
$$

であり、双対関数は

$$
q(\alpha)
=
\sum_i\alpha_i
-\frac12
\left\|
\sum_i\alpha_i y_i x_i
\right\|_2^2.
$$

内積を展開すると

$$
\left\|
\sum_i\alpha_i y_i x_i
\right\|_2^2
=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
x_i^{\mathsf T}x_j.
$$

<a id="thm-rkhs4-dual"></a>
<!-- formal-statement-start -->
> **定理（ハードマージン SVM の Lagrange 双対）**  
> 正例・負例をともに含む線形分離可能な有限標本 $(x_i,y_i)_{i=1}^n$ を考える。ハードマージン SVM
>
> $$
> \min_{w,b}
> \frac12\|w\|_2^2
> \quad
> \text{subject to}
> \quad
> y_i(w^{\mathsf T}x_i+b)\ge1
> $$
>
> の Lagrange 双対問題は
>
> $$
> \boxed{
> \max_{\alpha\in\mathbb R^n}
> \left[
> \sum_{i=1}^n\alpha_i
> -
> \frac12
> \sum_{i,j=1}^n
> \alpha_i\alpha_j y_i y_j x_i^{\mathsf T}x_j
> \right]
> }
> $$
>
> subject to
>
> $$
> \alpha_i\ge0,
> \qquad
> \sum_{i=1}^n\alpha_i y_i=0.
> $$
>
> 線形分離可能性から Slater 条件が成り立つため、主問題と双対問題の最適値は一致し、最適解では
>
> $$
> w^*
> =
> \sum_i\alpha_i^* y_i x_i
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

双対関数を

$$
q(\alpha)
=
\inf_{w,b}L(w,b,\alpha)
$$

と定めます。

$\alpha_i\ge0$ の下で、$b$ に関する項は

$$
-b\sum_i\alpha_i y_i.
$$

したがって

$$
\sum_i\alpha_i y_i=0
$$

でなければ $q(\alpha)=-\infty$ です。

等式制約を満たす場合は

$$
L
=
\frac12\|w\|_2^2
-w^{\mathsf T}s(\alpha)
+\sum_i\alpha_i
$$

であり、平方完成により

$$
\inf_w L
=
\sum_i\alpha_i
-\frac12\|s(\alpha)\|_2^2.
$$

ここで

$$
s(\alpha)=\sum_i\alpha_i y_i x_i
$$

です。

従って双対問題は定理に示した形になります。

また線形分離可能性から前節で Slater 条件を確認したので、[OPT5 の強双対](../OPT5/index.md#thm-opt5-slater-strong-duality)により主問題と双対問題の最適値は一致します。

$w$ に関する最小化の一意な条件が

$$
w=s(\alpha)
$$

なので、最適主双対対では

$$
w^*
=
\sum_i\alpha_i^* y_i x_i
$$

です。
<!-- proof-end -->

### 6.3 行列で見るとラベル付き Gram 行列が現れる

Gram 行列を

$$
G_{ij}=x_i^{\mathsf T}x_j
$$

とし、

$$
Y=\operatorname{diag}(y_1,\dots,y_n)
$$

と置けば、双対の二次項は

$$
\alpha^{\mathsf T}YGY\alpha
$$

です。

従って双対目的関数は

$$
\mathbf 1^{\mathsf T}\alpha
-\frac12
\alpha^{\mathsf T}YGY\alpha.
$$

$G\succeq0$ なので

$$
YGY\succeq0.
$$

従って最大化する目的関数は凹です。ここでも主問題の凸性と双対問題の凹性が整合しています。

---

## 7. KKT 条件がサポートベクトルを選ぶ

主問題の制約を

$$
g_i(w,b)
=
1-y_i(w^{\mathsf T}x_i+b)
\le0
$$

と書きます。

Slater 条件が成り立つ凸問題なので、KKT 条件は最適性の必要十分条件です。

<a id="thm-rkhs4-kkt"></a>
<!-- formal-statement-start -->
> **定理（ハードマージン SVM の KKT 条件）**  
> 正例・負例をともに含む線形分離可能な有限標本を考える。組
>
> $$
> (w^*,b^*,\alpha^*)
> $$
>
> がハードマージン SVM の主双対最適解であることと、次をすべて満たすことは同値である。
>
> **主実行可能性**
>
> $$
> y_i(w^{*\mathsf T}x_i+b^*)\ge1.
> $$
>
> **双対実行可能性**
>
> $$
> \alpha_i^*\ge0,
> \qquad
> \sum_i\alpha_i^* y_i=0.
> $$
>
> **停留条件**
>
> $$
> w^*
> =
> \sum_i\alpha_i^* y_i x_i.
> $$
>
> **相補性**
>
> $$
> \alpha_i^*
> \left[
> y_i(w^{*\mathsf T}x_i+b^*)-1
> \right]
> =
> 0
> \qquad(i=1,\dots,n).
> $$
<!-- formal-statement-end -->

この定理は [OPT5 の KKT 条件](../OPT5/index.md#thm-opt5-kkt)を、SVM の具体式へ代入したものです。適用条件は「凸問題で Slater 条件が成り立つこと」であり、それは第4節と第5節で確認済みです。

### 7.1 $\alpha_i>0$ なら必ずマージン上にある

相補性から

$$
\alpha_i^*>0
$$

なら

$$
y_i(w^{*\mathsf T}x_i+b^*)=1.
$$

したがってその点は支持超平面上にあります。

<a id="def-rkhs4-support-vector"></a>
<!-- formal-statement-start -->
> **定義（双対サポートベクトル）**  
> 最適な KKT 組 $(w^*,b^*,\alpha^*)$ に対し
>
> $$
> \alpha_i^*>0
> $$
>
> を満たす訓練点 $x_i$ を、この最適双対解に関する **双対サポートベクトル**と呼ぶ。
>
> また
>
> $$
> y_i(w^{*\mathsf T}x_i+b^*)=1
> $$
>
> を満たす訓練点を **マージン点**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs4-support-vector -->
**定義の確認**：1次元例の双対変数

正例 $x=2,3$、負例 $x=-1,0$ の例で

$$
w^*=1,
\qquad
b^*=-1
$$

でした。

$x=2$ と $x=0$ について

$$
y_i(w^*x_i+b^*)=1
$$

です。

双対変数を

$$
\alpha_{x=2}=\frac12,
\qquad
\alpha_{x=0}=\frac12,
$$

それ以外を0と置きます。

すると

$$
\sum_i\alpha_i y_i
=
\frac12-\frac12
=
0,
$$

さらに

$$
\sum_i\alpha_i y_i x_i
=
\frac12\cdot(+1)\cdot2
+
\frac12\cdot(-1)\cdot0
=
1
=
w^*.
$$

相補性も成り立つので、これは最適 KKT 組です。

したがって $x=2$ と $x=0$ が双対サポートベクトルです。
<!-- definition-example-end -->

### 7.2 分類器は全点ではなく一部の点に支えられる

停留条件は

$$
w^*
=
\sum_i\alpha_i^*y_i x_i
$$

です。

$\alpha_i^*=0$ の点は、この表示に寄与しません。

従って法線ベクトルは、双対サポートベクトルだけから再構成できます。

$$
\boxed{
\text{全訓練点}
\longrightarrow
\text{正の双対変数を持つ点だけが }w^*\text{ を支える}
}
$$

これが support vector という名前の代数的な意味です。

---

## 8. マージン点なら必ず $\alpha_i>0$ とは限らない

KKT の相補性が言うのは

$$
\alpha_i^*>0
\Longrightarrow
y_i(w^{*\mathsf T}x_i+b^*)=1
$$

です。

逆向き

$$
y_i(w^{*\mathsf T}x_i+b^*)=1
\Longrightarrow
\alpha_i^*>0
$$

は一般には成り立ちません。

### 8.1 退化した例

正例を

$$
(2,0),\ (2,1),\ (2,-1),
$$

負例を

$$
(0,0)
$$

とします。

最適境界は

$$
x_1=1
$$

で、

$$
w^*=
\begin{pmatrix}
1\\0
\end{pmatrix},
\qquad
b^*=-1.
$$

正例3点はすべて

$$
w^{*\mathsf T}x+b^*=1
$$

なので、すべてマージン点です。

しかし

$$
\alpha_{(2,0)}=\frac12,
\qquad
\alpha_{(0,0)}=\frac12,
$$

その他を0としても

$$
\sum_i\alpha_i y_i=0
$$

かつ

$$
\sum_i\alpha_i y_i x_i
=
\begin{pmatrix}
1\\0
\end{pmatrix}
=
w^*
$$

が成り立ちます。

したがって $(2,\pm1)$ はマージン上にあるにもかかわらず、この最適双対解では

$$
\alpha_i=0
$$

です。

この違いは、双対解が退化して一意でない場合に重要です。

---

## 9. 線形分離可能性は凸包の非交差と同値

正例集合と負例集合を

$$
X_+
=
\{x_i:y_i=+1\},
\qquad
X_-
=
\{x_i:y_i=-1\}
$$

とし、その凸包を

$$
C_+
=
\operatorname{conv}(X_+),
\qquad
C_-
=
\operatorname{conv}(X_-)
$$

とします。

有限集合の凸包なので、$C_+,C_-$ はコンパクト凸集合です。

<a id="thm-rkhs4-convex-hull-separation"></a>
<!-- formal-statement-start -->
> **定理（線形分離可能性と凸包非交差の同値性）**  
> 正例・負例をともに含む有限標本に対し、次は同値である。
>
> 1. 標本は線形分離可能である。
> 2. 正例凸包と負例凸包が交わらない：
>
> $$
> C_+\cap C_-=\varnothing.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

分離超平面があるなら、凸結合を取っても符号は保たれるので凸包は交わりません。

逆向きでは、コンパクトな二つの凸包の最近点対を取り、その差ベクトルに垂直な中間超平面を作ります。

<!-- proof-start -->
### 証明

まず線形分離可能とします。ある $(w,b)$ が存在して

$$
w^{\mathsf T}x+b>0
\qquad(x\in X_+),
$$

$$
w^{\mathsf T}x+b<0
\qquad(x\in X_-)
$$

です。

任意の

$$
p=\sum_{x_i\in X_+}\theta_i x_i
\in C_+,
\qquad
\theta_i\ge0,
\quad
\sum_i\theta_i=1
$$

に対して

$$
w^{\mathsf T}p+b
=
\sum_i\theta_i(w^{\mathsf T}x_i+b)
>0.
$$

同様に任意の $q\in C_-$ では

$$
w^{\mathsf T}q+b<0.
$$

従って $p=q$ となる点は存在せず、

$$
C_+\cap C_-=\varnothing.
$$

逆に

$$
C_+\cap C_-=\varnothing
$$

とします。

$C_+\times C_-$ はコンパクトで、距離関数

$$
(p,q)\longmapsto\|p-q\|_2
$$

は連続なので、最近点対

$$
p^*\in C_+,
\qquad
q^*\in C_-
$$

が存在します。

非交差なので

$$
\delta
=
\|p^*-q^*\|_2
>0.
$$

$$
r=p^*-q^*
$$

と置きます。

$p^*$ は $C_+$ の中で $q^*$ に最も近い点です。[OPT2 の射影の変分不等式](../OPT2/index.md#thm-opt2-projection-variational-inequality)を $q^*$ から $C_+$ への射影へ適用すると、任意の $p\in C_+$ に対して

$$
(q^*-p^*)^{\mathsf T}(p-p^*)\le0.
$$

すなわち

$$
r^{\mathsf T}p
\ge
r^{\mathsf T}p^*.
$$

同様に、任意の $q\in C_-$ に対して

$$
r^{\mathsf T}q
\le
r^{\mathsf T}q^*.
$$

しかも

$$
r^{\mathsf T}p^*
-
r^{\mathsf T}q^*
=
r^{\mathsf T}(p^*-q^*)
=
\|r\|_2^2
>0.
$$

従って

$$
c
=
\frac{
r^{\mathsf T}p^*
+
r^{\mathsf T}q^*
}{2}
$$

と置けば、

$$
r^{\mathsf T}p>c
\qquad(p\in C_+),
$$

$$
r^{\mathsf T}q<c
\qquad(q\in C_-).
$$

特に全訓練点を厳密に分離します。よって線形分離可能です。
<!-- proof-end -->

---

## 10. 最大マージンは二つの凸包の最短距離

前節の最近点対を

$$
p^*\in C_+,
\qquad
q^*\in C_-
$$

とし、

$$
\delta
=
\|p^*-q^*\|_2
$$

とします。

最近点対の中間超平面は、幾何的には最も幅の広い分離帯の中央にあります。

<a id="thm-rkhs4-convex-hull-distance"></a>
<!-- formal-statement-start -->
> **定理（最大マージンと凸包間最短距離の対応）**  
> 正例・負例をともに含む線形分離可能な有限標本を考え、
>
> $$
> \delta
> =
> \min_{p\in C_+,\ q\in C_-}
> \|p-q\|_2
> $$
>
> とする。このときハードマージン SVM の最適解 $(w^*,b^*)$ は
>
> $$
> \boxed{
> \frac{2}{\|w^*\|_2}
> =
> \delta
> }
> $$
>
> を満たす。従って分類境界から最近の訓練点までの最大幾何マージンは
>
> $$
> \boxed{
> \gamma^*
> =
> \frac{\delta}{2}
> }.
> $$
>
> さらに最近点対 $(p^*,q^*)$ を一つ取れば、
>
> $$
> w^*
> =
> \frac{2(p^*-q^*)}{\|p^*-q^*\|_2^2}
> $$
>
> と表せる。
<!-- formal-statement-end -->

### 証明

まず最近点対 $(p^*,q^*)$ を取ります。

$$
r=p^*-q^*,
\qquad
\delta=\|r\|_2.
$$

前節の射影不等式より

$$
r^{\mathsf T}p
\ge
r^{\mathsf T}p^*
\qquad(p\in C_+),
$$

$$
r^{\mathsf T}q
\le
r^{\mathsf T}q^*
\qquad(q\in C_-).
$$

ここで

$$
w_0
=
\frac{2r}{\delta^2}
$$

と置き、

$$
b_0
=
-\frac12
w_0^{\mathsf T}(p^*+q^*)
$$

とします。

すると

$$
w_0^{\mathsf T}p^*+b_0
=
\frac12w_0^{\mathsf T}(p^*-q^*)
=
\frac12\cdot
\frac{2\delta^2}{\delta^2}
=
1.
$$

同様に

$$
w_0^{\mathsf T}q^*+b_0=-1.
$$

射影不等式から任意の $p\in C_+$ で

$$
w_0^{\mathsf T}p+b_0\ge1,
$$

任意の $q\in C_-$ で

$$
w_0^{\mathsf T}q+b_0\le-1.
$$

従って $(w_0,b_0)$ はハードマージン主問題の実行可能解です。

その法線ノルムは

$$
\|w_0\|_2
=
\frac{2\|r\|_2}{\delta^2}
=
\frac2\delta.
$$

したがって支持超平面間距離は

$$
\frac2{\|w_0\|_2}
=
\delta.
$$

一方、任意の実行可能な $(w,b)$ に対して、任意の $p\in C_+$ と $q\in C_-$ は凸結合なので

$$
w^{\mathsf T}p+b\ge1,
$$

$$
w^{\mathsf T}q+b\le-1.
$$

差を取ると

$$
w^{\mathsf T}(p-q)\ge2.
$$

Cauchy--Schwarz の不等式より

$$
2
\le
w^{\mathsf T}(p-q)
\le
\|w\|_2\|p-q\|_2.
$$

最近点対に対して

$$
2
\le
\|w\|_2\delta
$$

なので

$$
\|w\|_2\ge\frac2\delta.
$$

先ほど作った $w_0$ はこの下界を達成するため、最適です。

従って

$$
\|w^*\|_2=\frac2\delta,
$$

すなわち

$$
\frac2{\|w^*\|_2}=\delta.
$$

分類境界から片側の支持超平面までの距離はその半分なので

$$
\gamma^*=\frac{\delta}{2}.
$$
<!-- proof-end -->

---

## 11. 双対変数は二つの凸包上の点を作る

双対実行可能性は

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0
$$

です。

正例側と負例側の係数和を分けると

$$
\sum_{y_i=+1}\alpha_i
=
\sum_{y_i=-1}\alpha_i.
$$

この共通値を

$$
\rho
$$

と置きます。

最適解では $w^*\ne0$ なので、停留条件

$$
w^*
=
\sum_i\alpha_i^* y_i x_i
$$

から $\alpha^*$ は零ベクトルではありません。従って

$$
\rho>0.
$$

そこで

$$
p
=
\sum_{y_i=+1}
\frac{\alpha_i}{\rho}x_i,
$$

$$
q
=
\sum_{y_i=-1}
\frac{\alpha_i}{\rho}x_i
$$

と置きます。

係数は非負で各側の和は1なので、

$$
p\in C_+,
\qquad
q\in C_-.
$$

さらに

$$
\begin{aligned}
w
&=
\sum_i\alpha_i y_i x_i\\
&=
\sum_{y_i=+1}\alpha_i x_i
-
\sum_{y_i=-1}\alpha_i x_i\\
&=
\rho(p-q).
\end{aligned}
$$

従って SVM の法線は、正負の凸包上の二点を結ぶ方向です。

### 11.1 双対目的関数そのものが凸包間距離を選ぶ

双対目的関数は

$$
\sum_i\alpha_i
-\frac12\|w\|_2^2.
$$

各側の係数和が $\rho$ なので

$$
\sum_i\alpha_i=2\rho.
$$

また

$$
w=\rho(p-q)
$$

なので

$$
\|w\|_2^2
=
\rho^2\|p-q\|_2^2.
$$

従って

$$
D(\rho,p,q)
=
2\rho
-\frac12\rho^2\|p-q\|_2^2.
$$

$p,q$ を固定し、$\rho\ge0$ について最大化します。

$$
\frac{\partial D}{\partial\rho}
=
2-\rho\|p-q\|_2^2.
$$

従って最大点は

$$
\rho^*
=
\frac{2}{\|p-q\|_2^2}.
$$

そのとき

$$
D_{\max}(p,q)
=
\frac{2}{\|p-q\|_2^2}.
$$

双対全体を最大化するには、分母

$$
\|p-q\|_2
$$

を最小にすればよいことになります。

したがって双対問題からも

$$
\boxed{
\text{正負クラスの凸包の最近点対}
}
$$

が現れます。

これは前節の幾何と完全に同じ結論です。

---

## 12. 最適な $w$ と $b$ は一意に決まる

目的関数

$$
\frac12\|w\|_2^2
$$

は $w$ に関して狭義凸です。

実行可能集合は $(w,b)$ に関して凸です。

<a id="prop-rkhs4-unique-classifier"></a>
<!-- formal-statement-start -->
> **命題（最適分類器の一意性）**  
> 正例・負例をともに含む線形分離可能な有限標本に対し、ハードマージン SVM の最適な
>
> $$
> w^*
> \quad\text{と}\quad
> b^*
> $$
>
> はともに一意である。
<!-- formal-statement-end -->

### 証明

まず $w$ の一意性を示します。

二つの最適解

$$
(w_1,b_1),
\qquad
(w_2,b_2)
$$

があり、

$$
w_1\ne w_2
$$

だと仮定します。

実行可能集合は凸なので中点

$$
\left(
\frac{w_1+w_2}{2},
\frac{b_1+b_2}{2}
\right)
$$

も実行可能です。

$\frac12\|w\|_2^2$ は $w$ に関して狭義凸なので

$$
\frac12
\left\|
\frac{w_1+w_2}{2}
\right\|_2^2
<
\frac12
\left[
\frac12\|w_1\|_2^2
+
\frac12\|w_2\|_2^2
\right].
$$

右辺は最適値なので矛盾です。従って

$$
w_1=w_2=w^*.
$$

次に $b$ の一意性を示します。

一意に定まった $w^*$ に対し、

$
a_+
=
\min_{i:y_i=+1}
w^{*\mathsf T}x_i,
$

$
a_-
=
\max_{i:y_i=-1}
w^{*\mathsf T}x_i
$

と置きます。

正例制約は

$
w^{*\mathsf T}x_i+b\ge1
$

なので

$
b\ge1-a_+.
$

負例制約は

$
w^{*\mathsf T}x_i+b\le-1
$

なので

$
b\le-1-a_-.
$

従って実行可能な切片が存在するには

$
a_+-a_-\ge2
$

が必要です。

ここで、もし

$
a_+-a_->2
$

なら

$
c
=
\frac{2}{a_+-a_-}
\in(0,1)
$

と置き、

$
\widetilde w=cw^*
$

とします。さらに

$
\widetilde b
=
1-ca_+
=
-1-ca_-
$

と置けます。最後の等号は

$
c(a_+-a_-)=2
$

から従います。

任意の正例では

$
\widetilde w^{\mathsf T}x_i+\widetilde b
\ge
ca_++1-ca_+
=
1,
$

任意の負例では

$
\widetilde w^{\mathsf T}x_i+\widetilde b
\le
ca_- -1-ca_-
=
-1.
$

従って $(\widetilde w,\widetilde b)$ も実行可能です。

しかし $0<c<1$ なので

$
\|\widetilde w\|_2
=
c\|w^*\|_2
<
\|w^*\|_2,
$

となり、$w^*$ の最適性に反します。

従って最適時には必ず

$
a_+-a_-=2.
$

よって実行可能な $b$ の区間

$
1-a_+
\le b\le
-1-a_-
$

の両端は一致し、

$
b^*
=
1-a_+
=
-1-a_-
$

と一意に定まります。
<!-- proof-end -->

双対変数 $\alpha^*$ 自体は一意とは限りません。前節の退化例のように、複数の凸結合が同じ最近点や同じ法線を表せるからです。

ここでも

$$
\boxed{
\text{分類器の一意性}
\neq
\text{双対係数表示の一意性}
}
$$

です。

---

## 13. 線形分離不能なら何が壊れるか

正例を

$$
X_+=\{0,2\},
$$

負例を

$$
X_-=\{1\}
$$

とします。

正例凸包は

$$
C_+=[0,2],
$$

負例凸包は

$$
C_-=\{1\}.
$$

したがって

$$
C_+\cap C_-=\{1\}\ne\varnothing.
$$

第9節の定理より、この標本は線形分離可能ではありません。

実際、もしハードマージン制約が実行可能なら、

$$
b\ge1
$$

が正例 $x=0$ から、

$$
2w+b\ge1
$$

が正例 $x=2$ から得られます。

負例 $x=1$ からは

$$
-(w+b)\ge1,
$$

すなわち

$$
w+b\le-1
$$

です。

$b\ge1$ なので

$$
w\le-2.
$$

一方、

$$
2w+b\ge1,
\qquad
b\ge1
$$

だけでは直接矛盾に見えませんが、正例 $0$ と $2$ の凸結合

$$
1=\frac12\cdot0+\frac12\cdot2
$$

を取ると、線形性により

$$
w+b
=
\frac12 b
+
\frac12(2w+b)
\ge1.
$$

これは負例 $x=1$ が要求する

$$
w+b\le-1
$$

と矛盾します。

失った仮定は

$$
C_+\cap C_-=\varnothing
$$

です。

証明機構で言えば、

- 凸包間距離 $\delta$ が正でなくなる。
- 最近点差 $p^*-q^*$ が非零の分離法線を作れない。
- ハードマージンの厳密実行可能点が存在しない。
- 主問題そのものが実行不可能になる。

という形で壊れます。

次章では制約違反を許す変数を導入し、この実行不可能性を soft margin へ変換します。

---

## 14. 1次元例を主問題・双対・KKT・凸包で一周する

正例

$$
X_+=\{2,3\},
$$

負例

$$
X_-=\{-1,0\}
$$

へ戻ります。

### 14.1 凸包

$$
C_+=[2,3],
\qquad
C_-=[-1,0].
$$

最近点対は

$$
p^*=2,
\qquad
q^*=0,
$$

なので

$$
\delta=2.
$$

従って最大幾何マージンは

$$
\gamma^*=\frac{\delta}{2}=1.
$$

### 14.2 主問題

$$
w^*=1,
\qquad
b^*=-1.
$$

したがって

$$
\frac1{\|w^*\|}=1
$$

で、凸包の計算と一致します。

### 14.3 双対

$x=2$ の正例と $x=0$ の負例に

$$
\alpha=\frac12
$$

ずつ置き、他を0とします。

すると

$$
\sum_i\alpha_i y_i=0
$$

で、

$$
w
=
\sum_i\alpha_i y_i x_i
=
1.
$$

双対目的値は

$$
\sum_i\alpha_i
-\frac12w^2
=
1-\frac12
=
\frac12.
$$

主目的値も

$$
\frac12(w^*)^2=\frac12.
$$

強双対が直接確認できます。

### 14.4 KKT

正の双対変数を持つ2点では

$$
y_i(w^*x_i+b^*)=1.
$$

残りの点では $\alpha_i=0$ です。

従って主実行可能性・双対実行可能性・停留条件・相補性がすべて確認できます。

一つの小さな例で

$$
\boxed{
\text{凸包距離}
=
\text{支持超平面間距離}
=
\frac2{\|w^*\|}
}
$$

と

$$
\boxed{
w^*
=
\sum_i\alpha_i^*y_ix_i
}
$$

が同時に見えます。

---

## 15. ここまでの構造をまとめる

ハードマージン SVM には、同じ最適解を異なる言語で見る4つの姿があります。

$$
\boxed{
\begin{array}{c}
\text{幾何}\\
\text{正負凸包の最近点}
\end{array}
}
\qquad
\boxed{
\begin{array}{c}
\text{主問題}\\
\min \frac12\|w\|^2
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
\text{双対}\\
\max\ \mathbf1^{\mathsf T}\alpha
-\frac12\alpha^{\mathsf T}YGY\alpha
\end{array}
}
\qquad
\boxed{
\begin{array}{c}
\text{KKT}\\
w=\sum_i\alpha_i y_i x_i
\end{array}
}
$$

どれか一つだけを覚えるより、

- マージンのスケーリングが主問題を作る。
- 線形分離可能性が Slater 条件を与える。
- Lagrangian の $w,b$ 最小化が双対を作る。
- KKT の相補性がサポートベクトルを選ぶ。
- 双対変数の正規化が凸包上の二点を作る。
- 双対最大化が凸包間距離最小化へ変わる。

という因果関係を追う方が重要です。

次章では、線形分離不能データに対して slack variable と hinge loss を導入します。その後、内積

$$
x_i^{\mathsf T}x_j
$$

を核値へ置き換えることで、ここで得た双対構造を RKHS 上の kernel SVM へ持ち上げます。

---

# 演習

## Level A

### RKHS4-A01 スケーリングと幾何マージン

- Level: A
- 目安時間: 10分

1次元の分類器

$$
w=2,
\qquad
b=-2
$$

と、同じ境界を表す

$$
\widetilde w=5w,
\qquad
\widetilde b=5b
$$

を考える。

正例 $x=3$ と負例 $x=0$ に対し、

1. 各点の関数マージンを両方の表現で求めよ。
2. 各点の幾何マージンを両方の表現で求めよ。
3. なぜ最大マージン問題では関数マージンだけを最大化してはいけないか説明せよ。

<!-- solution-start -->
#### 詳細解答

まず元の分類器では

$$
w=2,
\qquad
b=-2.
$$

正例 $x=3$, $y=+1$ の関数マージンは

$$
\widehat\gamma_+
=
(+1)(2\cdot3-2)
=
4.
$$

負例 $x=0$, $y=-1$ では

$$
\widehat\gamma_-
=
(-1)(2\cdot0-2)
=
2.
$$

次に5倍した表現は

$$
\widetilde w=10,
\qquad
\widetilde b=-10.
$$

正例の関数マージンは

$$
(+1)(10\cdot3-10)
=
20,
$$

負例では

$$
(-1)(10\cdot0-10)
=
10.
$$

したがって関数マージンは5倍になります。

一方、1次元なので

$$
\|w\|_2=|2|=2,
\qquad
\|\widetilde w\|_2=|10|=10.
$$

正例の幾何マージンは

$$
\gamma_+
=
\frac4{2}
=
2
$$

で、5倍後も

$$
\widetilde\gamma_+
=
\frac{20}{10}
=
2.
$$

負例では

$$
\gamma_-=\frac2{2}=1,
$$

5倍後も

$$
\widetilde\gamma_-=\frac{10}{10}=1.
$$

したがって幾何マージンは不変です。

関数マージンだけなら、同じ分類境界の $(w,b)$ を任意に大きい正数倍するだけで無限に大きくできます。従って境界の良さを比較できません。

幾何マージンでは法線ノルムで割るため、このスケーリング自由度が消えます。
<!-- solution-end -->

### RKHS4-A02 1次元ハードマージンを解く

- Level: A
- 目安時間: 12分

正例を

$$
X_+=\{2,3\},
$$

負例を

$$
X_-=\{-1,0\}
$$

とする。

1. 正負凸包間距離 $\delta$ を求めよ。
2. 最大マージン境界を求めよ。
3. 正規化制約 $y_i(wx_i+b)\ge1$ の下で最適な $w,b$ を求めよ。
4. 最大幾何マージンと支持超平面間距離を求めよ。

<!-- solution-start -->
#### 詳細解答

正例凸包は

$$
C_+=[2,3],
$$

負例凸包は

$$
C_-=[-1,0].
$$

最近点はそれぞれ2と0なので

$$
\delta=2.
$$

最近点の中点は1なので、最大マージン境界は

$$
x=1.
$$

1次元では境界は

$$
wx+b=0
$$

です。

正例 $x=2$ と負例 $x=0$ が最も境界に近いので、正規化後の支持制約を等号で置きます。

正例から

$$
2w+b=1.
$$

負例 $x=0$, $y=-1$ から

$$
(-1)b=1,
$$

すなわち

$$
b=-1.
$$

よって

$$
2w-1=1
$$

なので

$$
w=1.
$$

他の点を確認すると

$$
3w+b=2\ge1,
$$

$$
(-1)\bigl((-1)w+b\bigr)
=
-(-1-1)
=
2\ge1.
$$

従って実行可能です。

最大幾何マージンは

$$
\gamma^*
=
\frac1{|w|}
=
1.
$$

支持超平面間距離は

$$
\frac2{|w|}
=
2.
$$

これは凸包間距離 $\delta=2$ と一致します。
<!-- solution-end -->

### RKHS4-A03 Lagrangian の停留条件

- Level: A
- 目安時間: 12分

ハードマージン SVM の Lagrangian

$$
L(w,b,\alpha)
=
\frac12\|w\|_2^2
+
\sum_i
\alpha_i
\left[
1-y_i(w^{\mathsf T}x_i+b)
\right]
$$

を考える。

1. $w$ に関する停留条件を導け。
2. $b$ に関する停留条件を導け。
3. これらが双対問題でどのような役割を持つか説明せよ。

<!-- solution-start -->
#### 詳細解答

まず $w$ に依存する部分は

$$
\frac12w^{\mathsf T}w
-
\sum_i\alpha_i y_i w^{\mathsf T}x_i.
$$

勾配は

$$
\nabla_w L
=
w
-
\sum_i\alpha_i y_i x_i.
$$

従って停留条件

$$
\nabla_wL=0
$$

から

$$
\boxed{
w=
\sum_i\alpha_i y_i x_i
}
$$

を得ます。

次に $b$ に依存する部分は

$$
-b\sum_i\alpha_i y_i.
$$

従って

$$
\frac{\partial L}{\partial b}
=
-\sum_i\alpha_i y_i.
$$

停留条件から

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

です。

双対関数は

$$
q(\alpha)=\inf_{w,b}L(w,b,\alpha)
$$

で定義されます。

$b$ の係数が0でなければ $b$ を一方向へ無限に動かして $L\to-\infty$ とできるため、

$$
\sum_i\alpha_i y_i=0
$$

は双対関数が有限になるための条件です。

一方、

$$
w=\sum_i\alpha_i y_i x_i
$$

は $w$ に関する一意な最小点であり、これを Lagrangian に戻すことで双対の二次項が得られます。
<!-- solution-end -->

### RKHS4-A04 KKT からサポートベクトルを判定する

- Level: A
- 目安時間: 10分

ある最適 KKT 組で、3点について

$$
y_i(w^{\mathsf T}x_i+b)
=
1,\ 1,\ 2
$$

であり、対応する双対変数が

$$
\alpha_1>0,
\qquad
\alpha_2=0,
\qquad
\alpha_3=0
$$

だったとする。

1. どの点がマージン点か。
2. 本章の定義でどの点が双対サポートベクトルか。
3. この例が KKT の相補性について何を示しているか説明せよ。

<!-- solution-start -->
#### 詳細解答

マージン点は

$$
y_i(w^{\mathsf T}x_i+b)=1
$$

を満たす点なので、第1点と第2点です。

双対サポートベクトルは

$$
\alpha_i>0
$$

を満たす点なので、第1点だけです。

第3点では関数マージンが2なので、正規化されたマージンの外側にあり、双対変数も0です。

KKT の相補性は

$$
\alpha_i
\left[
y_i(w^{\mathsf T}x_i+b)-1
\right]
=
0
$$

です。

ここから

$$
\alpha_i>0
\Longrightarrow
y_i(w^{\mathsf T}x_i+b)=1
$$

は従います。

しかし第2点のように

$$
y_i(w^{\mathsf T}x_i+b)=1
$$

でも

$$
\alpha_i=0
$$

であってよいので、逆向きは一般には従いません。
<!-- solution-end -->

---

## Level B

### RKHS4-B01 線形分離可能性と凸包非交差を証明する

- Level: B
- 目安時間: 20分

正例・負例をともに含む有限標本について、

$$
\text{線形分離可能}
\quad\Longleftrightarrow\quad
C_+\cap C_-=\varnothing
$$

を証明せよ。

逆向きでは、凸包がコンパクトであることから最近点対が存在することと、最近点対の差ベクトルが分離方向を与えることを明示せよ。

<!-- solution-start -->
#### 詳細解答

まず線形分離可能とします。

ある $w\ne0,b$ が存在して、正例では

$$
w^{\mathsf T}x+b>0,
$$

負例では

$$
w^{\mathsf T}x+b<0
$$

です。

任意の $p\in C_+$ は

$$
p=\sum_{i:y_i=+1}\theta_i x_i,
\qquad
\theta_i\ge0,
\quad
\sum_i\theta_i=1
$$

と書けます。

従って

$$
w^{\mathsf T}p+b
=
\sum_i\theta_i(w^{\mathsf T}x_i+b)
>0.
$$

同様に任意の $q\in C_-$ では

$$
w^{\mathsf T}q+b<0.
$$

よって同じ点が両方の凸包に入ることはなく、

$$
C_+\cap C_-=\varnothing.
$$

逆に凸包が交わらないとします。

有限点集合の凸包はコンパクトなので、

$$
C_+\times C_-
$$

もコンパクトです。

連続関数

$$
(p,q)\mapsto\|p-q\|_2
$$

は最小値を取り、最近点対

$$
p^*\in C_+,
\qquad
q^*\in C_-
$$

が存在します。

非交差なので

$$
\delta=\|p^*-q^*\|_2>0.
$$

$$
r=p^*-q^*
$$

と置きます。

$p^*$ は $q^*$ から $C_+$ への射影なので、射影の変分不等式より

$$
(q^*-p^*)^{\mathsf T}(p-p^*)\le0
$$

が任意の $p\in C_+$ で成り立ちます。

従って

$$
r^{\mathsf T}p
\ge
r^{\mathsf T}p^*.
$$

同様に任意の $q\in C_-$ について

$$
r^{\mathsf T}q
\le
r^{\mathsf T}q^*.
$$

しかも

$$
r^{\mathsf T}p^*
-
r^{\mathsf T}q^*
=
\|r\|_2^2
>0.
$$

従って中間値

$$
c
=
\frac{
r^{\mathsf T}p^*
+
r^{\mathsf T}q^*
}{2}
$$

を取れば

$$
r^{\mathsf T}p>c
\qquad(p\in C_+),
$$

$$
r^{\mathsf T}q<c
\qquad(q\in C_-).
$$

特に正例・負例の全訓練点を厳密に分離するので、線形分離可能です。
<!-- solution-end -->

### RKHS4-B02 双対問題を凸包間距離へ変換する

- Level: B
- 目安時間: 18分

ハードマージン SVM の双対実行可能点 $\alpha$ が

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0
$$

を満たし、$\alpha\ne0$ とする。

1. 正例側・負例側の係数和が共通値 $\rho>0$ になることを示せ。
2. $p\in C_+,q\in C_-$ を構成し、
   $$
   w=\sum_i\alpha_i y_i x_i=\rho(p-q)
   $$
   を示せ。
3. 双対目的関数を
   $$
   2\rho-\frac12\rho^2\|p-q\|_2^2
   $$
   と書け。
4. $p,q$ を固定したとき $\rho$ を最適化し、双対最大化が凸包間距離最小化になることを示せ。

<!-- solution-start -->
#### 詳細解答

等式制約

$$
\sum_i\alpha_i y_i=0
$$

を正負に分けると

$$
\sum_{y_i=+1}\alpha_i
-
\sum_{y_i=-1}\alpha_i
=
0.
$$

従って

$$
\sum_{y_i=+1}\alpha_i
=
\sum_{y_i=-1}\alpha_i
=
\rho.
$$

$\alpha\ne0$ で係数は非負なので

$$
\rho>0.
$$

次に

$$
p
=
\sum_{y_i=+1}
\frac{\alpha_i}{\rho}x_i,
$$

$$
q
=
\sum_{y_i=-1}
\frac{\alpha_i}{\rho}x_i
$$

と置きます。

各係数は非負で、各側の係数和は1です。従って

$$
p\in C_+,
\qquad
q\in C_-.
$$

また

$$
\begin{aligned}
\rho(p-q)
&=
\sum_{y_i=+1}\alpha_i x_i
-
\sum_{y_i=-1}\alpha_i x_i\\
&=
\sum_i\alpha_i y_i x_i\\
&=
w.
\end{aligned}
$$

双対目的関数は

$$
\sum_i\alpha_i-\frac12\|w\|_2^2.
$$

各側の係数和が $\rho$ なので

$$
\sum_i\alpha_i=2\rho.
$$

また

$$
\|w\|_2^2
=
\rho^2\|p-q\|_2^2.
$$

従って

$$
D(\rho,p,q)
=
2\rho
-\frac12\rho^2\|p-q\|_2^2.
$$

$p,q$ を固定して微分すると

$$
\frac{\partial D}{\partial\rho}
=
2-\rho\|p-q\|_2^2.
$$

従って最大点は

$$
\rho^*
=
\frac{2}{\|p-q\|_2^2}.
$$

二階微分は

$$
-\|p-q\|_2^2<0
$$

なので確かに最大です。

代入すると

$$
D_{\max}(p,q)
=
\frac2{\|p-q\|_2^2}.
$$

従って双対値を最大にするには

$$
\|p-q\|_2
$$

を最小にすればよいことになります。

よって双対問題は、正負凸包の最近点対を選ぶ問題と同じ幾何を持ちます。
<!-- solution-end -->

### RKHS4-B03 最適分類器の一意性

- Level: B
- 目安時間: 20分

正例・負例をともに含む線形分離可能な有限標本について、ハードマージン SVM の最適な $w^*$ と $b^*$ が一意であることを示せ。

ただし次を用いてよい。

1. 実行可能集合は凸である。
2. $w\mapsto\frac12\|w\|_2^2$ は狭義凸である。
3. Slater 条件により最適 KKT 組が存在する。

<!-- solution-start -->
#### 詳細解答

まず $w$ の一意性を示します。

二つの最適解

$$
(w_1,b_1),
\qquad
(w_2,b_2)
$$

があり、$w_1\ne w_2$ と仮定します。

実行可能集合は凸なので

$$
\left(
\frac{w_1+w_2}{2},
\frac{b_1+b_2}{2}
\right)
$$

も実行可能です。

狭義凸性より

$$
\frac12
\left\|
\frac{w_1+w_2}{2}
\right\|_2^2
<
\frac12
\left[
\frac12\|w_1\|_2^2
+
\frac12\|w_2\|_2^2
\right].
$$

右辺は最適値に等しいので、より小さい実行可能目的値が得られて矛盾します。

従って

$$
w_1=w_2=w^*.
$$

次に $b$ を考えます。

一意に定まった $w^*$ に対して

$
a_+
=
\min_{i:y_i=+1}
w^{*\mathsf T}x_i,
\qquad
a_-
=
\max_{i:y_i=-1}
w^{*\mathsf T}x_i
$

と置きます。

実行可能性から

$
b\ge1-a_+,
\qquad
b\le-1-a_-,
$

従って

$
a_+-a_-\ge2.
$

もし不等号が厳しければ

$
c=\frac2{a_+-a_-}\in(0,1)
$

として

$
\widetilde w=cw^*
$

と縮められます。

さらに

$
\widetilde b
=
1-ca_+
=
-1-ca_-
$

と置けば、正例では

$
\widetilde w^{\mathsf T}x_i+\widetilde b\ge1,
$

負例では

$
\widetilde w^{\mathsf T}x_i+\widetilde b\le-1
$

なので実行可能です。

ところが

$
\|\widetilde w\|_2
=
c\|w^*\|_2
<
\|w^*\|_2,
$

となり最適性に反します。

従って

$
a_+-a_-=2.
$

よって

$
1-a_+
=
-1-a_-,
$

であり、実行可能な $b$ は

$
b^*=1-a_+=-1-a_-
$

の1点だけです。

したがって最適分類器 $(w^*,b^*)$ は一意です。

なお、この議論は $\alpha^*$ 自体の一意性を示してはいません。複数の $\alpha^*$ が同じ $w^*$ を表すことはあり得ます。
<!-- solution-end -->

---

## Level C

### RKHS4-C01 退化した最大マージン問題を主双対両側から解析する

- Level: C
- 目安時間: 30分

2次元の訓練データを

正例：

$$
x_1=(2,0),
\qquad
x_2=(2,1),
\qquad
x_3=(2,-1),
$$

負例：

$$
x_4=(0,0)
$$

とし、

$$
y_1=y_2=y_3=+1,
\qquad
y_4=-1
$$

とする。

1. 正負凸包を求め、凸包間距離 $\delta$ と最近点対を求めよ。
2. ハードマージン SVM の最適な $w^*,b^*$ を求めよ。
3. 最大幾何マージンを求めよ。
4. 
   $$
   \alpha_1=\frac12,\quad
   \alpha_4=\frac12,\quad
   \alpha_2=\alpha_3=0
   $$
   が KKT 条件を満たすことを確認せよ。
5. $x_2,x_3$ がマージン点であるにもかかわらず、この最適双対解では双対サポートベクトルでないことを確認せよ。
6. 次の1パラメータ族について、どの $t$ で双対実行可能かを調べ、同じ分類器を表す別の最適双対解が存在するか判定せよ。
   $$
   \alpha_2=t,\qquad
   \alpha_3=t,\qquad
   \alpha_1=\frac12-2t,\qquad
   \alpha_4=\frac12.
   $$
7. この例から「分類器の一意性」と「双対係数の一意性」の違いを説明せよ。

<!-- solution-start -->
#### 詳細解答

正例3点の凸包は

$$
C_+
=
\{(2,s):-1\le s\le1\}
$$

です。

負例凸包は1点だけなので

$$
C_-=\{(0,0)\}.
$$

$(0,0)$ から縦線分 $C_+$ への最近点は

$$
p^*=(2,0)
$$

で、

$$
q^*=(0,0).
$$

従って

$$
\delta
=
\|p^*-q^*\|_2
=
2.
$$

最大マージンと凸包間距離の定理より

$$
w^*
=
\frac{2(p^*-q^*)}{\delta^2}
=
\frac{2(2,0)}4
=
(1,0).
$$

最近点対の中点は

$$
(1,0)
$$

なので中央境界は

$$
x_1=1.
$$

従って

$$
b^*=-1.
$$

最大幾何マージンは

$$
\gamma^*
=
\frac{\delta}{2}
=
1.
$$

次に指定された双対変数を確認します。

非負性は明らかです。

等式制約は

$$
\sum_i\alpha_i y_i
=
\frac12-\frac12
=
0.
$$

停留条件では

$$
\begin{aligned}
\sum_i\alpha_i y_i x_i
&=
\frac12(+1)(2,0)
+
\frac12(-1)(0,0)\\
&=
(1,0)\\
&=
w^*.
\end{aligned}
$$

主実行可能性を確認します。

正例3点では

$$
w^{*\mathsf T}x_i+b^*
=
2-1
=
1.
$$

負例では

$$
y_4(w^{*\mathsf T}x_4+b^*)
=
(-1)(0-1)
=
1.
$$

従って全4点がマージン点です。

相補性も、全点で角括弧

$$
y_i(w^{*\mathsf T}x_i+b^*)-1
$$

が0なので成立します。

よって指定された組は KKT 条件を満たし、最適です。

この双対解では

$$
\alpha_2=\alpha_3=0
$$

なので、$x_2,x_3$ はマージン点ですが双対サポートベクトルではありません。

次に1パラメータ族を調べます。

$$
\alpha_2=t,
\qquad
\alpha_3=t,
$$

$$
\alpha_1=\frac12-2t,
\qquad
\alpha_4=\frac12.
$$

非負性から

$$
t\ge0,
$$

$$
\frac12-2t\ge0
$$

なので

$$
0\le t\le\frac14.
$$

等式制約は

$$
\alpha_1+\alpha_2+\alpha_3-\alpha_4
=
\left(\frac12-2t\right)+t+t-\frac12
=
0.
$$

停留条件は

$$
\begin{aligned}
\sum_i\alpha_i y_i x_i
&=
\left(\frac12-2t\right)(2,0)
+t(2,1)
+t(2,-1)
-\frac12(0,0)\\
&=
(1-4t,0)
+
(2t,t)
+
(2t,-t)\\
&=
(1,0)\\
&=
w^*.
\end{aligned}
$$

従って全ての

$$
0\le t\le\frac14
$$

で同じ $w^*$ を表します。

また全点がマージン上なので相補性は自動的に成立します。

したがって、この区間の全ての $t$ が最適双対解を与えます。

特に

$$
t=0
$$

では $x_2,x_3$ の双対変数は0ですが、

$$
t>0
$$

なら両点の双対変数は正です。

つまり、どの点を双対サポートベクトルとして選ぶかは最適双対解によって変わり得ます。

一方、

$$
w^*=(1,0),
\qquad
b^*=-1
$$

は一意です。

従ってこの例は

$$
\boxed{
\text{分類超平面は一意でも、
それを表す最適双対係数は一意とは限らない}
}
$$

ことを具体的に示しています。
<!-- solution-end -->
