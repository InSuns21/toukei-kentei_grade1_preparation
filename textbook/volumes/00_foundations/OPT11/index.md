# OPT11 線形計画 II：単体法・内点法・感度解析

<!-- definition-example-audit: strict -->

[OPT10](../OPT10/index.md) では、標準形
$
\min c^{\mathsf T}x
\quad\text{subject to}\quad
Ax=b,\qquad x\ge0
$
に対して、多面体・極点・基本実行可能解・LP 双対・強双対・相補性を学びました。
[OPT9](../OPT9/index.md) では、対数障壁、中心路、摂動 KKT 系、主双対 Newton 法を一般の制約付き最適化で学びました。

本章では、この二つを線形計画に特化して結びます。

線形計画を解く代表的な二つの視点は対照的です。

$
\boxed{
\begin{array}{c}
\text{単体法：境界上の極点から極点へ移る}\\[2mm]
\text{内点法：正の内部を通る中心路をたどる}
\end{array}
}
$

さらに、最適解を一つ求めて終わりにはしません。右辺や費用係数が少し変わったときに

$
\boxed{
\text{最適基底は変わるか}
\quad\text{／}\quad
\text{最適値はどれだけ変わるか}
}
$

まで読み取ります。ここで双対変数は「下界証明書」であるだけでなく、局所的な影の価格として現れます。

本章の主線は

$
\boxed{
\text{被約費用}
\to
\text{進入変数}
\to
\text{比率検定}
\to
\text{基底交換}
\to
\text{退化・実行不能・非有界}
\to
\text{中心路}
\to
\text{主双対 Newton 法}
\to
\text{感度解析}
}
$

です。

---

## 1. 基底から目的関数の傾きを読む

OPT10 と同じく

$
A\in\mathbb R^{m\times n},
\qquad
\operatorname{rank}A=m
$

とし、標準形 LP

$
\min c^{\mathsf T}x
\quad\text{subject to}\quad
Ax=b,\qquad x\ge0
$

を考えます。

基底添字集合を \(B\)、非基底添字集合を \(N\) とし、

$
A=(A_B\ A_N),
\qquad
x=
\begin{pmatrix}
x_B\\x_N
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
c_B\\c_N
\end{pmatrix}
$

と分けます。

基底解では

$
x_N=0,
\qquad
x_B=A_B^{-1}b
$

です。

ここから「どの非基底変数を 0 から増やせば目的関数が下がるか」を読みます。

<a id="def-opt11-reduced-cost"></a>
<!-- formal-statement-start -->
> **定義（被約費用）**  
> 可逆な基底行列 \(A_B\) に対して
>
> \[
> A_B^{\mathsf T}y_B=c_B
> \]
>
> を満たす \(y_B\in\mathbb R^m\) を取る。すなわち
>
> \[
> y_B=A_B^{-\mathsf T}c_B.
> \]
>
> 非基底変数 \(j\in N\) に対して
>
> \[
> \boxed{
> \bar c_j
> =
> c_j-a_j^{\mathsf T}y_B
> }
> \]
>
> を、その基底に関する **被約費用**という。ベクトル表示では
>
> \[
> \bar c_N
> =
> c_N-A_N^{\mathsf T}y_B.
> \]
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt11-reduced-cost -->
**定義の確認**：初期スラック基底

$
\min -3x_1-2x_2
$

subject to

$
x_1+x_2+x_3=4,
\qquad
2x_1+x_2+x_4=5,
\qquad
x\ge0
$

を考えます。

$
A=
\begin{pmatrix}
1&1&1&0\\
2&1&0&1
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
-3\\-2\\0\\0
\end{pmatrix}.
$

基底 \(B=\{3,4\}\) を取ると

$
A_B=I,
\qquad
x_B=
\begin{pmatrix}
4\\5
\end{pmatrix},
\qquad
c_B=
\begin{pmatrix}
0\\0
\end{pmatrix}.
$

従って

$
y_B=A_B^{-\mathsf T}c_B=0.
$

非基底変数 \(x_1,x_2\) の被約費用は

$
\bar c_1=-3,
\qquad
\bar c_2=-2.
$

どちらも負なので、現在の基本実行可能解はまだ最適ではありません。特に \(x_1\) を 0 から増やす方向には、目的関数を下げる余地があります。
<!-- definition-example-end -->

<a id="thm-opt11-reduced-cost-decomposition"></a>
<!-- formal-statement-start -->
> **定理（被約費用による目的関数分解と最適性判定）**  
> \(B\) を実行可能基底とし、
>
> \[
> x_B^0=A_B^{-1}b\ge0,
> \qquad
> x_N^0=0
> \]
>
> とする。また
>
> \[
> y_B=A_B^{-\mathsf T}c_B,
> \qquad
> \bar c_N=c_N-A_N^{\mathsf T}y_B
> \]
>
> と置く。
>
> 任意の実行可能解 \(x\) に対して
>
> \[
> \boxed{
> c^{\mathsf T}x
> =
> c^{\mathsf T}x^0
> +
> \bar c_N^{\mathsf T}x_N
> }
> \]
>
> が成り立つ。
>
> 特に
>
> \[
> \bar c_N\ge0
> \]
>
> なら \(x^0\) は最適解であり、\(y_B\) は双対実行可能かつ双対最適である。
<!-- formal-statement-end -->

### 証明の見取り図

等式制約から \(x_B\) を \(x_N\) の関数として消去します。
すると目的関数に残る \(x_N\) の係数が、そのまま被約費用になります。

<!-- proof-start -->
### 証明

実行可能解 \(x\) は

$
A_Bx_B+A_Nx_N=b
$

を満たします。

\(A_B\) は可逆なので

$
x_B
=
A_B^{-1}b
-
A_B^{-1}A_Nx_N.
$

従って

$
\begin{aligned}
c^{\mathsf T}x
&=
c_B^{\mathsf T}x_B
+
c_N^{\mathsf T}x_N\\
&=
c_B^{\mathsf T}A_B^{-1}b
-
c_B^{\mathsf T}A_B^{-1}A_Nx_N
+
c_N^{\mathsf T}x_N.
\end{aligned}
$

ここで

$
y_B=A_B^{-\mathsf T}c_B
$

なので

$
c_B^{\mathsf T}A_B^{-1}
=
y_B^{\mathsf T}.
$

したがって

$
c_B^{\mathsf T}A_B^{-1}b
=
b^{\mathsf T}y_B.
$

また

$
c_N^{\mathsf T}
-
c_B^{\mathsf T}A_B^{-1}A_N
=
\left(
c_N-A_N^{\mathsf T}y_B
\right)^{\mathsf T}
=
\bar c_N^{\mathsf T}.
$

よって

$
c^{\mathsf T}x
=
b^{\mathsf T}y_B
+
\bar c_N^{\mathsf T}x_N.
$

基底解 \(x^0\) では \(x_N^0=0\) なので

$
c^{\mathsf T}x^0=b^{\mathsf T}y_B.
$

従って

$
c^{\mathsf T}x
=
c^{\mathsf T}x^0
+
\bar c_N^{\mathsf T}x_N.
$

さらに \(\bar c_N\ge0\) なら、任意の実行可能解で \(x_N\ge0\) だから

$
c^{\mathsf T}x
\ge
c^{\mathsf T}x^0.
$

よって \(x^0\) は最適です。

また基底成分では

$
A_B^{\mathsf T}y_B=c_B,
$

非基底成分では

$
A_N^{\mathsf T}y_B
=
c_N-\bar c_N
\le c_N.
$

したがって

$
A^{\mathsf T}y_B\le c,
$

すなわち \(y_B\) は双対実行可能です。

主目的値と双対目的値は

$
c^{\mathsf T}x^0=b^{\mathsf T}y_B
$

で一致するので、[OPT10 の弱双対性](../OPT10/index.md#thm-opt10-weak-duality)より両者は最適です。

\(\square\)
<!-- proof-end -->

この定理は単体法の停止判定そのものです。

$
\boxed{
\text{実行可能基底}
+
\text{すべての被約費用が非負}
\Longrightarrow
\text{最適}
}
$

---

## 2. 負の被約費用から隣の極点へ移る

ある非基底変数 \(x_j\) の被約費用が

$
\bar c_j<0
$

なら、その変数を少し増やせば目的関数は下がります。

しかし \(Ax=b\) を保つため、基底変数も同時に動かす必要があります。

$
p=A_B^{-1}a_j
$

と置きます。

\(x_j\) を \(t\) だけ増やすと

$
x_B(t)=x_B^0-tp
$

です。

<a id="thm-opt11-simplex-pivot"></a>
<!-- formal-statement-start -->
> **定理（単体法の一回のピボットと非有界判定）**  
> \(B\) を実行可能基底とし、
>
> \[
> x_B^0=A_B^{-1}b\ge0
> \]
>
> とする。非基底添字 \(j\in N\) が
>
> \[
> \bar c_j<0
> \]
>
> を満たすとし、
>
> \[
> p=A_B^{-1}a_j
> \]
>
> と置く。
>
> 1. \(p_i>0\) となる成分が一つもなければ、主問題は下方非有界である。
> 2. \(p_i>0\) となる成分が存在すれば、
>
> \[
> \boxed{
> \theta
> =
> \min_{i:p_i>0}
> \frac{(x_B^0)_i}{p_i}
> }
> \]
>
> と置くことで
>
> \[
> x_j=\theta,
> \qquad
> x_B=x_B^0-\theta p
> \]
>
> は実行可能となり、少なくとも一つの基底変数が 0 になる。
> さらに
>
> \[
> c^{\mathsf T}x
> =
> c^{\mathsf T}x^0+\theta\bar c_j.
> \]
>
> よって \(\theta>0\) なら目的値は厳密に減少する。
<!-- formal-statement-end -->

### 証明の見取り図

\(a_j\) を現在の基底列で展開した係数が \(p\) です。
非基底変数を増やすと、その分だけ基底変数を \(p\) に沿って減らします。
非負性が最初に破れる直前まで進むのが比率検定です。

<!-- proof-start -->
### 証明

方向 \(d\in\mathbb R^n\) を

$
d_j=1,
\qquad
d_k=0\quad(k\in N,\ k\ne j),
\qquad
d_B=-p
$

と定めます。

すると

$
Ad
=
A_B(-p)+a_j
=
-A_BA_B^{-1}a_j+a_j
=
0.
$

したがって

$
x(t)=x^0+td
$

は任意の \(t\) で等式制約 \(Ax=b\) を保ちます。

非基底成分は

$
x_j(t)=t\ge0
$

です。他の非基底成分は 0 のままです。

基底成分は

$
x_B(t)=x_B^0-tp.
$

もし \(p_i\le0\) がすべての \(i\) で成り立つなら、

$
x_B^0-tp\ge x_B^0\ge0
$

なので、任意の \(t\ge0\) で実行可能です。

一方、目的値は被約費用の分解から

$
c^{\mathsf T}x(t)
=
c^{\mathsf T}x^0+t\bar c_j.
$

\(\bar c_j<0\) なので

$
c^{\mathsf T}x(t)\to-\infty
\qquad(t\to\infty).
$

従って主問題は下方非有界です。

次に \(p_i>0\) の成分があるとします。

各 \(p_i>0\) に対して非負性

$
(x_B^0)_i-tp_i\ge0
$

は

$
t\le\frac{(x_B^0)_i}{p_i}
$

と同値です。

したがって全成分の非負性を保つ最大歩幅は

$
\theta
=
\min_{i:p_i>0}
\frac{(x_B^0)_i}{p_i}.
$

この \(\theta\) では少なくとも一つの成分が 0 になります。

目的値は

$
c^{\mathsf T}x(\theta)
=
c^{\mathsf T}x^0+\theta\bar c_j.
$

\(\bar c_j<0\) なので、\(\theta>0\) なら目的値は厳密に減少します。

\(\square\)
<!-- proof-end -->

### 2.1 具体例：一回の基底交換

先ほどの問題で \(x_1\) を進入変数にします。

基底は \(B=\{3,4\}\) なので

$
A_B=I,
\qquad
x_B^0=
\begin{pmatrix}
4\\5
\end{pmatrix}.
$

\(a_1=(1,2)^{\mathsf T}\) だから

$
p=A_B^{-1}a_1
=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$

比率は

$
\frac41=4,
\qquad
\frac52=\frac52.
$

従って

$
\theta=\frac52
$

で、\(x_4\) が最初に 0 になります。

新しい点は

$
x_1=\frac52,
\qquad
x_3=4-\frac52=\frac32,
\qquad
x_4=5-2\cdot\frac52=0,
\qquad
x_2=0.
$

目的値は

$
-\frac{15}{2}.
$

初期点の目的値 0 から確かに減少しています。

このとき \(a_1\) の基底表示のうち、離脱する \(x_4\) に対応する係数は 2 で 0 ではありません。
従って \(a_4\) を \(a_1\) で置き換えた新しい基底行列も可逆です。

---

## 3. 単体法は何を反復しているのか

単体法の一回の反復は次の四段です。

1. 現在の実行可能基底から被約費用を計算する。
2. \(\bar c_j<0\) の非基底変数を一つ進入変数に選ぶ。
3. \(p=A_B^{-1}a_j\) を計算し、比率検定で離脱変数を決める。
4. 基底を交換して次の基本実行可能解へ移る。

すべての被約費用が非負になれば終了です。

これは「表を機械的に変形する操作」ではなく、

$
\boxed{
\text{多面体の辺に沿って}
\quad
\text{目的関数が下がる隣の極点へ移る}
}
$

という幾何を、線形代数で実装したものです。

### 3.1 実行不能と非有界は別の失敗である

二つは区別が必要です。

- **実行不能**：\(Ax=b,\ x\ge0\) を満たす点が一つもない。
- **非有界**：実行可能点はあるが、目的値を \(-\infty\) へ下げられる。

単体法の比率検定で \(p_i>0\) が一つもない場合は、後者の証明書がその場で得られます。

一方、初めから実行可能基底が見つからない場合は、後で扱う Phase I を使います。

### 3.2 双対単体法の位置付け

通常の単体法は

$
x_B\ge0
$

という **主実行可能性を保ち**ながら、被約費用を改善して双対実行可能性へ近づきます。

これに対して双対単体法は

$
\bar c_N\ge0
$

という **双対実行可能性を保ち**ながら、負の基底変数を解消して主実行可能性を回復します。

したがって、右辺 \(b\) を変更した結果

- 被約費用はそのまま非負
- しかし新しい \(A_B^{-1}b\) の一部が負

となった場面では、双対単体法が自然です。

これは後の感度解析と直接つながります。

---

## 4. 退化すると「基底は変わるが点は動かない」

OPT10 で、基底変数の一部が 0 の基本実行可能解を退化した基本実行可能解と呼びました。

単体法では、この 0 が比率検定に現れます。

### 4.1 具体例：歩幅 0 のピボット

$
A=
\begin{pmatrix}
1&1&0\\
0&1&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\0
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
0\\0\\-1
\end{pmatrix}
$

を考えます。

基底 \(B=\{1,2\}\) では

$
A_B=
\begin{pmatrix}
1&1\\
0&1
\end{pmatrix},
\qquad
x_B=
A_B^{-1}b
=
\begin{pmatrix}
1\\0
\end{pmatrix}.
$

従って現在点は

$
x=(1,0,0)
$

で、退化しています。

\(c_B=0\) だから \(y_B=0\) で、

$
\bar c_3=-1<0.
$

\(x_3\) を進入させます。

$
a_3=
\begin{pmatrix}
0\\1
\end{pmatrix},
\qquad
p=A_B^{-1}a_3
=
\begin{pmatrix}
-1\\1
\end{pmatrix}.
$

\(p_2=1>0\) であり、比率は

$
\frac{(x_B)_2}{p_2}
=
\frac01
=
0.
$

したがって

$
\theta=0.
$

基底は \(x_2\) を出して \(x_3\) を入れることで

$
B'=\{1,3\}
$

へ変わりますが、点そのものは

$
x=(1,0,0)
$

のままです。

これが退化したピボットです。

### 4.2 なぜ退化が厄介か

非退化なら各ピボットで目的値が厳密に下がるため、同じ基底へ戻ることはありません。

退化では

$
\theta=0
$

が起こり、基底だけが変わって目的値が変わらないことがあります。
選択規則が悪いと基底が循環する場合があります。

実装上は、例えば **Bland 規則**のように添字順を使う反循環規則を採用できます。
本章ではその停止証明自体を主題にはせず、「退化では単純な目的値減少だけでは停止を保証できない」という点を押さえます。

---

## 5. 実行可能基底がないとき：Phase I

単体法は実行可能基底から始める必要があります。

標準形

$
Ax=b,
\qquad
x\ge0
$

で初期基底が見つからない場合、まず「実行可能点を探すためだけの LP」を解きます。

必要なら各等式を \(-1\) 倍して

$
b\ge0
$

となるようにしておきます。

<a id="def-opt11-phase-one"></a>
<!-- formal-statement-start -->
> **定義（Phase I 補助問題）**  
> \(b\ge0\) とする。元の実行可能性問題
>
> \[
> Ax=b,\qquad x\ge0
> \]
>
> に対して人工変数 \(a\in\mathbb R^m\) を導入し、
>
> \[
> \boxed{
> \min \mathbf1^{\mathsf T}a
> \quad\text{subject to}\quad
> Ax+a=b,
> \qquad
> x\ge0,
> \qquad
> a\ge0
> }
> \]
>
> を **Phase I 補助問題**とする。
>
> 初期点
>
> \[
> x=0,
> \qquad
> a=b
> \]
>
> はこの補助問題の基本実行可能解である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt11-phase-one -->
**定義の確認**：矛盾する二本の等式

$
x_1+x_2=1,
\qquad
x_1+x_2=2,
\qquad
x_1,x_2\ge0
$

を考えます。

Phase I は

$
\min a_1+a_2
$

subject to

$
x_1+x_2+a_1=1,
$

$
x_1+x_2+a_2=2,
$

$
x_1,x_2,a_1,a_2\ge0
$

です。

初期点

$
x_1=x_2=0,
\qquad
a_1=1,
\qquad
a_2=2
$

は実行可能で、人工変数 \(a_1,a_2\) を基底に取れます。
<!-- definition-example-end -->

<a id="thm-opt11-phase-one-feasibility"></a>
<!-- formal-statement-start -->
> **定理（Phase I 最適値による実行可能性判定）**  
> Phase I 補助問題の最適値を \(\rho^*\) とする。
>
> 元の系
>
> \[
> Ax=b,\qquad x\ge0
> \]
>
> が実行可能であることと
>
> \[
> \boxed{\rho^*=0}
> \]
>
> は同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず元の系が実行可能だとします。

ある \(\hat x\ge0\) が存在して

$
A\hat x=b
$

です。

すると Phase I で

$
x=\hat x,
\qquad
a=0
$

と置けば実行可能で、目的値は

$
\mathbf1^{\mathsf T}a=0.
$

一方 \(a\ge0\) なので Phase I の目的値は常に 0 以上です。
従って

$
\rho^*=0.
$

逆に

$
\rho^*=0
$

とします。

最適解 \((x^*,a^*)\) では

$
a^*\ge0,
\qquad
\mathbf1^{\mathsf T}a^*=0.
$

非負成分の和が 0 なので

$
a^*=0.
$

Phase I の等式制約から

$
Ax^*+a^*=b
$

であり、従って

$
Ax^*=b.
$

また \(x^*\ge0\) です。
よって元の系は実行可能です。

\(\square\)
<!-- proof-end -->

先ほどの矛盾例では

$
t=x_1+x_2
$

と置くと

$
a_1=1-t,
\qquad
a_2=2-t.
$

非負性から \(0\le t\le1\) なので

$
a_1+a_2
=
3-2t
\ge1.
$

最適値は 1 であり、0 にはなりません。
従って元の LP は実行不能です。

---

## 6. 境界を歩かず、内部から近づく

単体法は基本実行可能解、すなわち多面体の極点を移動します。

一方、[OPT9 の中心路](../OPT9/index.md#def-opt9-central-path)は厳密可行な内部点を通ります。

標準形 LP では非負制約 \(x\ge0\) に対して対数障壁を置きます。

$
\min_{Ax=b,\ x>0}
\left[
c^{\mathsf T}x
-
\mu\sum_{j=1}^n\log x_j
\right].
$

等式制約の Lagrange 乗数の符号を LP 双対に合わせて

$
y^{\mathsf T}(b-Ax)
$

と置きます。

<a id="thm-opt11-lp-central-path"></a>
<!-- formal-statement-start -->
> **定理（LP 中心路方程式と双対ギャップ）**  
> \(\mu>0\) とし、対数障壁問題
>
> \[
> \min_{Ax=b,\ x>0}
> \left[
> c^{\mathsf T}x
> -
> \mu\sum_{j=1}^n\log x_j
> \right]
> \]
>
> が最小点 \(x(\mu)\) を持つとする。
>
> その等式制約の乗数を \(y(\mu)\) とし、
>
> \[
> s(\mu)=c-A^{\mathsf T}y(\mu)
> \]
>
> と置く。
>
> このとき
>
> \[
> \boxed{
> \begin{aligned}
> Ax&=b,\\
> A^{\mathsf T}y+s&=c,\\
> Xs&=\mu\mathbf1,\\
> x&>0,\quad s>0
> \end{aligned}
> }
> \]
>
> が成り立つ。ここで \(X=\operatorname{diag}(x)\) である。
>
> さらに主双対ギャップは
>
> \[
> \boxed{
> c^{\mathsf T}x-b^{\mathsf T}y
> =
> n\mu
> }
> \]
>
> である。
<!-- formal-statement-end -->

### 証明の見取り図

対数障壁の微分から

$
s_j=\frac{\mu}{x_j}
$

が出ます。
これを LP の双対余裕と同一視すると、相補性

$
x_js_j=0
$

が

$
x_js_j=\mu
$

へ摂動された形になります。

<!-- proof-start -->
### 証明

障壁問題の Lagrangian を

$
\mathcal L_\mu(x,y)
=
c^{\mathsf T}x
-
\mu\sum_{j=1}^n\log x_j
+
y^{\mathsf T}(b-Ax)
$

とします。

\(x\) による勾配は

$
\nabla_x\mathcal L_\mu
=
c
-
\mu X^{-1}\mathbf1
-
A^{\mathsf T}y.
$

最小点での停留条件から

$
c-A^{\mathsf T}y
=
\mu X^{-1}\mathbf1.
$

左辺を

$
s=c-A^{\mathsf T}y
$

と置けば

$
s=\mu X^{-1}\mathbf1.
$

\(x>0\) かつ \(\mu>0\) なので

$
s>0.
$

両辺に \(X\) を掛けると

$
Xs=\mu\mathbf1.
$

また制約から

$
Ax=b.
$

従って中心路方程式が得られます。

双対ギャップは

$
\begin{aligned}
c^{\mathsf T}x-b^{\mathsf T}y
&=
x^{\mathsf T}c-y^{\mathsf T}Ax\\
&=
x^{\mathsf T}(c-A^{\mathsf T}y)\\
&=
x^{\mathsf T}s\\
&=
\sum_{j=1}^n x_js_j.
\end{aligned}
$

中心路上では各成分で

$
x_js_j=\mu
$

なので

$
c^{\mathsf T}x-b^{\mathsf T}y
=
n\mu.
$

\(\square\)
<!-- proof-end -->

### 6.1 具体例：双対ギャップがそのまま見える

$
\min x_2
$

subject to

$
x_1+x_2=1,
\qquad
x_1,x_2\ge0
$

を考えます。

$
A=
\begin{pmatrix}
1&1
\end{pmatrix},
\qquad
b=1,
\qquad
c=
\begin{pmatrix}
0\\1
\end{pmatrix}.
$

$
\mu=\frac38
$

に対して

$
x=
\begin{pmatrix}
3/4\\1/4
\end{pmatrix},
\qquad
y=-\frac12,
\qquad
s=
\begin{pmatrix}
1/2\\3/2
\end{pmatrix}
$

を取ります。

主可行性は

$
Ax=\frac34+\frac14=1.
$

双対可行性は

$
A^{\mathsf T}y+s
=
\begin{pmatrix}
-1/2\\-1/2
\end{pmatrix}
+
\begin{pmatrix}
1/2\\3/2
\end{pmatrix}
=
\begin{pmatrix}
0\\1
\end{pmatrix}
=c.
$

摂動相補性は

$
x_1s_1
=
\frac34\cdot\frac12
=
\frac38,
$

$
x_2s_2
=
\frac14\cdot\frac32
=
\frac38.
$

従って

$
Xs=\mu\mathbf1.
$

双対ギャップは

$
c^{\mathsf T}x-b^{\mathsf T}y
=
\frac14-\left(-\frac12\right)
=
\frac34
=
2\mu.
$

変数数 \(n=2\) なので定理と一致します。

---

## 7. LP の主双対 Newton ステップ

中心路方程式

$
Ax=b,
$

$
A^{\mathsf T}y+s=c,
$

$
Xs=\mu\mathbf1
$

は非線形連立方程式です。

[OPT9 の主双対 Newton 方程式](../OPT9/index.md#thm-opt9-primal-dual-newton)を線形計画に特化すると、Hessian や非線形制約 Jacobian が消え、非常に単純なブロック系になります。

<a id="thm-opt11-lp-primal-dual-newton"></a>
<!-- formal-statement-start -->
> **定理（LP の主双対 Newton 方程式）**  
> \(x>0\)、\(s>0\) とし、
>
> \[
> r_p=Ax-b,
> \]
>
> \[
> r_d=A^{\mathsf T}y+s-c,
> \]
>
> \[
> r_c=Xs-\mu\mathbf1
> \]
>
> と置く。
>
> 中心路方程式に Newton 法を適用すると、ステップ
>
> \[
> (\Delta x,\Delta y,\Delta s)
> \]
>
> は
>
> \[
> \boxed{
> \begin{pmatrix}
> 0&A^{\mathsf T}&I\\
> A&0&0\\
> S&0&X
> \end{pmatrix}
> \begin{pmatrix}
> \Delta x\\
> \Delta y\\
> \Delta s
> \end{pmatrix}
> =
> -
> \begin{pmatrix}
> r_d\\
> r_p\\
> r_c
> \end{pmatrix}
> }
> \]
>
> を満たす。ここで \(S=\operatorname{diag}(s)\) である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

双対残差

$
r_d=A^{\mathsf T}y+s-c
$

の一次変化は

$
A^{\mathsf T}\Delta y+\Delta s.
$

主残差

$
r_p=Ax-b
$

の一次変化は

$
A\Delta x.
$

相補性残差

$
r_c=Xs-\mu\mathbf1
$

は成分ごとに

$
(r_c)_j=x_js_j-\mu
$

なので、その一次変化は

$
s_j\Delta x_j+x_j\Delta s_j.
$

ベクトル表示では

$
S\Delta x+X\Delta s.
$

Newton 法は

$
\text{現在残差}
+
\text{一次変化}
=
0
$

と置くので、

$
A^{\mathsf T}\Delta y+\Delta s=-r_d,
$

$
A\Delta x=-r_p,
$

$
S\Delta x+X\Delta s=-r_c.
$

三式をまとめれば結論を得ます。

\(\square\)
<!-- proof-end -->

実際の内点法では、Newton ステップを計算した後

$
x+\alpha\Delta x>0,
\qquad
s+\alpha\Delta s>0
$

を保つように歩幅 \(\alpha\) を選びます。

そして \(\mu\) を徐々に小さくしながら

$
\|r_p\|,
\qquad
\|r_d\|,
\qquad
x^{\mathsf T}s
$

を同時に減らします。

---

## 8. 単体法と内点法は同じ最適性条件へ向かう

二つの方法は経路が違います。

| 観点 | 単体法 | 内点法 |
|---|---|---|
| 主な位置 | 多面体の境界・極点 | \(x>0,\ s>0\) の内部 |
| 一回の更新 | 基底交換 | Newton ステップ |
| 相補性 | 最適点で \(x_js_j=0\) | 途中では \(x_js_j\approx\mu\) |
| 終了判定 | 被約費用と実行可能性 | 主残差・双対残差・双対ギャップ |
| 幾何 | 辺を歩く | 中心路をたどる |

しかし最終的に狙っている条件は同じです。

$
\boxed{
Ax=b,
\qquad
A^{\mathsf T}y+s=c,
\qquad
x\ge0,
\qquad
s\ge0,
\qquad
Xs=0
}
$

これは OPT10 の主双対可行性と相補性です。

単体法は相補性を「基底／非基底」という離散構造で保ちながら進み、内点法は

$
Xs=\mu\mathbf1
$

と滑らかに摂動して進む、と見ることができます。

---

## 9. 右辺を変える：影の価格と感度解析

線形計画を一度解いたあと、制約右辺 \(b\) が少し変わったとします。

同じ基底 \(B\) を使い続けられるなら

$
x_B(b)=A_B^{-1}b
$

なので、解の変化は行列一つで追えます。

さらに重要なのは最適値です。

<a id="thm-opt11-rhs-sensitivity"></a>
<!-- formal-statement-start -->
> **定理（固定最適基底の右辺感度と影の価格）**  
> 基底 \(B\) が元の LP で最適であり、
>
> \[
> x_B=A_B^{-1}b\ge0,
> \qquad
> \bar c_N\ge0
> \]
>
> を満たすとする。
>
> \[
> y_B=A_B^{-\mathsf T}c_B
> \]
>
> と置く。
>
> 右辺を
>
> \[
> b\mapsto b+\Delta b
> \]
>
> と変えたとき、
>
> \[
> \boxed{
> A_B^{-1}(b+\Delta b)\ge0
> }
> \]
>
> が保たれる限り、同じ基底 \(B\) は新しい LP でも最適である。
>
> さらに最適値を \(v(b)\) と書けば
>
> \[
> \boxed{
> v(b+\Delta b)
> =
> v(b)+y_B^{\mathsf T}\Delta b
> }
> \]
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

右辺 \(b\) は基底解 \(x_B\) には影響しますが、被約費用

$
\bar c_N
=
c_N-A_N^{\mathsf T}A_B^{-\mathsf T}c_B
$

には入りません。

したがって、同じ基底が実行可能である限り、最適性もそのままです。

<!-- proof-start -->
### 証明

右辺を \(b+\Delta b\) に変えても \(A\) と \(c\) は変わりません。

したがって

$
y_B=A_B^{-\mathsf T}c_B
$

も

$
\bar c_N=c_N-A_N^{\mathsf T}y_B
$

も変わりません。

仮定より

$
\bar c_N\ge0.
$

また

$
A_B^{-1}(b+\Delta b)\ge0
$

なら、同じ基底 \(B\) から新しい基本実行可能解

$
x_B'
=
A_B^{-1}(b+\Delta b),
\qquad
x_N'=0
$

が得られます。

従って[被約費用による最適性判定](#thm-opt11-reduced-cost-decomposition)から、この基底は新しい LP でも最適です。

新しい最適値は

$
\begin{aligned}
v(b+\Delta b)
&=
c_B^{\mathsf T}A_B^{-1}(b+\Delta b)\\
&=
c_B^{\mathsf T}A_B^{-1}b
+
c_B^{\mathsf T}A_B^{-1}\Delta b.
\end{aligned}
$

ここで

$
c_B^{\mathsf T}A_B^{-1}
=
y_B^{\mathsf T}
$

なので

$
v(b+\Delta b)
=
v(b)+y_B^{\mathsf T}\Delta b.
$

\(\square\)
<!-- proof-end -->

この式のため、最適双対変数 \(y_B\) の各成分は、同じ最適基底が保たれる範囲で右辺を 1 単位変えたときの最適値変化を表します。
これが LP における **影の価格**の基本的な意味です。

### 9.1 具体例：許される右辺変化を計算する

第2節で使った問題の最適解は

$
x_1=1,
\qquad
x_2=3,
\qquad
x_3=x_4=0
$

です。

最適基底を \(B=\{1,2\}\) とすると

$
A_B=
\begin{pmatrix}
1&1\\
2&1
\end{pmatrix},
\qquad
A_B^{-1}
=
\begin{pmatrix}
-1&1\\
2&-1
\end{pmatrix}.
$

$
c_B=
\begin{pmatrix}
-3\\-2
\end{pmatrix}
$

なので

$
y_B=A_B^{-\mathsf T}c_B
=
\begin{pmatrix}
-1\\-1
\end{pmatrix}.
$

右辺を

$
b+
\Delta b
=
\begin{pmatrix}
4+\delta_1\\
5+\delta_2
\end{pmatrix}
$

へ変えると

$
x_B'
=
A_B^{-1}(b+\Delta b)
=
\begin{pmatrix}
1-\delta_1+\delta_2\\
3+2\delta_1-\delta_2
\end{pmatrix}.
$

従って同じ基底が実行可能である条件は

$
1-\delta_1+\delta_2\ge0,
$

$
3+2\delta_1-\delta_2\ge0.
$

この範囲では最適値は厳密に

$
v(b+\Delta b)
=
-9-\delta_1-\delta_2
$

です。

---

## 10. 費用係数を変える：被約費用の符号が境界になる

今度は \(b\) を固定し、目的係数 \(c\) を変えます。

この場合、基底解

$
x_B=A_B^{-1}b
$

は変わりません。
変わるのは双対変数と被約費用です。

<a id="thm-opt11-cost-sensitivity"></a>
<!-- formal-statement-start -->
> **定理（固定基底の費用係数感度）**  
> 実行可能基底 \(B\) を固定し、目的係数を
>
> \[
> c\mapsto c+\Delta c
> \]
>
> と変える。
>
> \[
> y_B'
> =
> A_B^{-\mathsf T}(c_B+\Delta c_B)
> \]
>
> とし、
>
> \[
> \bar c_N'
> =
> c_N+\Delta c_N
> -
> A_N^{\mathsf T}y_B'
> \]
>
> と置く。
>
> \[
> \boxed{
> \bar c_N'\ge0
> }
> \]
>
> が成り立つ限り、同じ基底 \(B\) は新しい LP でも最適である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

\(A\) と \(b\) は変わらないので、基底解

$
x_B=A_B^{-1}b
$

は元と同じです。
元の基底が実行可能なら、新しい問題でも同じ点は実行可能です。

新しい目的係数に対する被約費用が

$
\bar c_N'\ge0
$

なら、[被約費用による最適性判定](#thm-opt11-reduced-cost-decomposition)を新しい目的係数へ適用して、同じ基底が最適だと分かります。

\(\square\)
<!-- proof-end -->

### 10.1 具体例：一つの費用係数を動かす

最適基底 \(B=\{1,2\}\) のまま

$
c_1=-3+\gamma
$

と変えます。

基底費用は

$
c_B(\gamma)
=
\begin{pmatrix}
-3+\gamma\\
-2
\end{pmatrix}.
$

$
A_B^{\mathsf T}y=c_B(\gamma)
$

を解くと

$
y_1+2y_2=-3+\gamma,
$

$
y_1+y_2=-2.
$

差を取って

$
y_2=-1+\gamma,
$

$
y_1=-1-\gamma.
$

非基底列は

$
a_3=
\begin{pmatrix}
1\\0
\end{pmatrix},
\qquad
a_4=
\begin{pmatrix}
0\\1
\end{pmatrix}.
$

したがって

$
\bar c_3
=
0-a_3^{\mathsf T}y
=
1+\gamma,
$

$
\bar c_4
=
0-a_4^{\mathsf T}y
=
1-\gamma.
$

よって同じ基底が最適である範囲は

$
\boxed{
-1\le\gamma\le1.
}
$

この範囲では主最適解そのものは

$
(x_1,x_2)=(1,3)
$

のままです。

---

## 11. 感度解析で基底境界を越えると何が起きるか

右辺感度では

$
A_B^{-1}(b+\Delta b)\ge0
$

が破れると、現在の基底は主実行可能でなくなります。

費用係数感度では

$
\bar c_N'\ge0
$

が破れると、現在の基底は双対実行可能でなくなります。

この境界では、典型的には

- 基底変数が 0 になる
- 非基底変数の被約費用が 0 になる
- 最適基底が複数になる
- 最適値関数の傾きが切り替わる

といった現象が起こります。

特に退化した最適点では、同じ主最適点に複数の基底が対応し得ます。
そのため影の価格を「全域で一意な微分係数」とみなすのは危険です。

本章の感度公式は

$
\boxed{
\text{同じ最適基底が保たれる範囲}
}
$

での厳密な線形式です。

---

## 12. 演習 Level A

<a id="ex-opt11-a01"></a>
### OPT11-A01 被約費用と最適性

- Level: A
- 目安時間: 10分

$
A=
\begin{pmatrix}
1&1&1&0\\
2&1&0&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
4\\5
\end{pmatrix},
\qquad
c=
\begin{pmatrix}
-3\\-2\\0\\0
\end{pmatrix}
$

とする。

基底 \(B=\{3,4\}\) について、

1. 基本実行可能解を求めよ。
2. \(y_B\) を求めよ。
3. \(x_1,x_2\) の被約費用を求めよ。
4. 現在の基底が最適か判定せよ。

<!-- solution-start -->
#### 詳細解答

基底行列は

$
A_B=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}
=I.
$

したがって

$
x_B=A_B^{-1}b=b
=
\begin{pmatrix}
4\\5
\end{pmatrix}.
$

非基底変数は

$
x_1=x_2=0.
$

よって

$
\boxed{
x=(0,0,4,5).
}
$

基底費用は

$
c_B=
\begin{pmatrix}
0\\0
\end{pmatrix}.
$

従って

$
y_B=A_B^{-\mathsf T}c_B=0.
$

非基底列は

$
a_1=
\begin{pmatrix}
1\\2
\end{pmatrix},
\qquad
a_2=
\begin{pmatrix}
1\\1
\end{pmatrix}.
$

したがって

$
\bar c_1
=
c_1-a_1^{\mathsf T}y_B
=
-3,
$

$
\bar c_2
=
c_2-a_2^{\mathsf T}y_B
=
-2.
$

どちらも負なので

$
\bar c_N\not\ge0.
$

よって被約費用による最適性判定は満たされず、現在の基底は最適ではありません。
<!-- solution-end -->

<a id="ex-opt11-a02"></a>
### OPT11-A02 一回の比率検定

- Level: A
- 目安時間: 10分

OPT11-A01 の問題で \(x_1\) を進入変数とする。

1. \(p=A_B^{-1}a_1\) を求めよ。
2. 比率検定から \(\theta\) と離脱変数を求めよ。
3. 新しい基本実行可能解と目的値を求めよ。

<!-- solution-start -->
#### 詳細解答

\(A_B=I\) なので

$
p=A_B^{-1}a_1=a_1
=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$

現在の基底変数は

$
x_3=4,
\qquad
x_4=5.
$

比率は

$
\frac{x_3}{p_1}
=
\frac41
=
4,
$

$
\frac{x_4}{p_2}
=
\frac52.
$

したがって

$
\boxed{
\theta=\frac52
}
$

で、\(x_4\) が離脱します。

更新後は

$
x_1=\frac52,
\qquad
x_2=0,
$

$
x_3=4-\frac52=\frac32,
$

$
x_4=5-2\cdot\frac52=0.
$

したがって

$
\boxed{
x=
\left(
\frac52,0,\frac32,0
\right).
}
$

目的値は

$
-3\cdot\frac52
=
-\frac{15}{2}.
$

初期目的値 0 より小さくなっています。
<!-- solution-end -->

<a id="ex-opt11-a03"></a>
### OPT11-A03 非有界方向を見つける

- Level: A
- 目安時間: 10分

$
\min -x_1
$

subject to

$
-x_1+x_2=1,
\qquad
x_1,x_2\ge0
$

を考える。

基底 \(B=\{2\}\) から始める。

1. 基本実行可能解を求めよ。
2. \(x_1\) の被約費用を求めよ。
3. \(p=A_B^{-1}a_1\) を求めよ。
4. 比率検定が上限を与えないことを示し、問題が下方非有界であることを示せ。

<!-- solution-start -->
#### 詳細解答

ここでは

$
A=
\begin{pmatrix}
-1&1
\end{pmatrix},
\qquad
b=1,
\qquad
c=
\begin{pmatrix}
-1\\0
\end{pmatrix}.
$

基底列は \(a_2=1\) なので

$
A_B=(1).
$

従って

$
x_2=A_B^{-1}b=1,
\qquad
x_1=0.
$

基底費用は \(c_2=0\) だから

$
y_B=0.
$

よって

$
\bar c_1
=
-1-(-1)\cdot0
=
-1<0.
$

\(x_1\) を進入させると

$
p=A_B^{-1}a_1=-1.
$

\(p>0\) となる成分はありません。

方向は

$
d_1=1,
\qquad
d_2=-p=1.
$

したがって任意の \(t\ge0\) について

$
x(t)
=
\begin{pmatrix}
t\\
1+t
\end{pmatrix}
$

です。

制約は

$
-t+(1+t)=1
$

なので常に実行可能です。

目的値は

$
-x_1=-t\to-\infty.
$

従って

$
\boxed{
\text{この LP は下方非有界である。}
}
$
<!-- solution-end -->

<a id="ex-opt11-a04"></a>
### OPT11-A04 右辺感度と影の価格

- Level: A
- 目安時間: 15分

最適基底

$
B=\{1,2\}
$

について

$
A_B=
\begin{pmatrix}
1&1\\
2&1
\end{pmatrix},
\qquad
c_B=
\begin{pmatrix}
-3\\-2
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
4\\5
\end{pmatrix}
$

とする。

1. \(A_B^{-1}\) を求めよ。
2. \(y_B=A_B^{-\mathsf T}c_B\) を求めよ。
3. \(b\mapsto(4+\delta_1,5+\delta_2)^{\mathsf T}\) と変えたとき、同じ基底が実行可能である条件を求めよ。
4. その範囲での最適値変化を求めよ。

<!-- solution-start -->
#### 詳細解答

行列式は

$
\det A_B
=
1\cdot1-1\cdot2
=
-1.
$

従って

$
A_B^{-1}
=
\begin{pmatrix}
-1&1\\
2&-1
\end{pmatrix}.
$

次に

$
A_B^{\mathsf T}y_B=c_B
$

を解きます。

$
y_1+2y_2=-3,
$

$
y_1+y_2=-2.
$

差を取ると

$
y_2=-1,
$

したがって

$
y_1=-1.
$

よって

$
\boxed{
y_B=
\begin{pmatrix}
-1\\-1
\end{pmatrix}.
}
$

右辺を変えると

$
x_B'
=
A_B^{-1}
\begin{pmatrix}
4+\delta_1\\
5+\delta_2
\end{pmatrix}
=
\begin{pmatrix}
1-\delta_1+\delta_2\\
3+2\delta_1-\delta_2
\end{pmatrix}.
$

したがって同じ基底が実行可能である条件は

$
\boxed{
1-\delta_1+\delta_2\ge0,
\qquad
3+2\delta_1-\delta_2\ge0.
}
$

元の最適値は

$
-3\cdot1-2\cdot3=-9.
$

固定最適基底の右辺感度から

$
v(b+\Delta b)
=
v(b)+y_B^{\mathsf T}\Delta b.
$

従って

$
\boxed{
v
=
-9-\delta_1-\delta_2.
}
$
<!-- solution-end -->

---

## 13. 演習 Level B

<a id="ex-opt11-b01"></a>
### OPT11-B01 単体法を最適基底まで実行する

- Level: B
- 目安時間: 25分

$
\min -3x_1-2x_2
$

subject to

$
x_1+x_2+x_3=4,
$

$
2x_1+x_2+x_4=5,
$

$
x\ge0
$

を考える。

初期基底を \(B=\{3,4\}\) とする。

1. \(x_1\) を進入させて一回目のピボットを行え。
2. 新基底で被約費用を計算せよ。
3. 必要なら二回目のピボットを行い、最適解を求めよ。
4. 最適双対解と非基底被約費用を求め、最適性を確認せよ。

<!-- solution-start -->
#### 詳細解答

初期基底では

$
x=(0,0,4,5),
\qquad
y=0,
$

$
\bar c_1=-3,
\qquad
\bar c_2=-2.
$

\(x_1\) を進入させます。

$
p=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$

比率は

$
4,
\qquad
\frac52
$

なので

$
\theta=\frac52.
$

\(x_4\) が離脱し、新基底を

$
B=\{3,1\}
$

とします。

新しい基本実行可能解は

$
x_3=\frac32,
\qquad
x_1=\frac52,
\qquad
x_2=x_4=0.
$

基底行列は

$
A_B=
\begin{pmatrix}
1&1\\
0&2
\end{pmatrix},
$

基底費用は

$
c_B=
\begin{pmatrix}
0\\-3
\end{pmatrix}.
$

双対基底方程式

$
A_B^{\mathsf T}y=c_B
$

は

$
\begin{pmatrix}
1&0\\
1&2
\end{pmatrix}
\begin{pmatrix}
y_1\\y_2
\end{pmatrix}
=
\begin{pmatrix}
0\\-3
\end{pmatrix}.
$

第1式から

$
y_1=0.
$

第2式から

$
2y_2=-3,
$

したがって

$
y_2=-\frac32.
$

非基底 \(x_2\) の列は

$
a_2=
\begin{pmatrix}
1\\1
\end{pmatrix}
$

なので

$
\bar c_2
=
-2-a_2^{\mathsf T}y
=
-2-\left(-\frac32\right)
=
-\frac12.
$

まだ負なので \(x_2\) を進入させます。

$
p=A_B^{-1}a_2.
$

方程式

$
A_Bp=a_2
$

を解くと

$
2p_2=1
$

より

$
p_2=\frac12,
$

さらに

$
p_1+p_2=1
$

より

$
p_1=\frac12.
$

現在の基底変数は

$
x_3=\frac32,
\qquad
x_1=\frac52.
$

比率は

$
\frac{3/2}{1/2}=3,
$

$
\frac{5/2}{1/2}=5.
$

従って

$
\theta=3
$

で \(x_3\) が離脱します。

更新後は

$
x_2=3,
$

$
x_3=\frac32-3\cdot\frac12=0,
$

$
x_1=\frac52-3\cdot\frac12=1,
$

$
x_4=0.
$

したがって

$
\boxed{
x^*=(1,3,0,0).
}
$

目的値は

$
-3\cdot1-2\cdot3=-9.
$

最適基底を \(B=\{1,2\}\) とします。

$
A_B=
\begin{pmatrix}
1&1\\
2&1
\end{pmatrix},
\qquad
c_B=
\begin{pmatrix}
-3\\-2
\end{pmatrix}.
$

$
A_B^{\mathsf T}y=c_B
$

より

$
y_1+2y_2=-3,
$

$
y_1+y_2=-2.
$

従って

$
\boxed{
y^*=(-1,-1).
}
$

非基底 \(x_3,x_4\) に対して

$
\bar c_3
=
0-
\begin{pmatrix}
1\\0
\end{pmatrix}^{\mathsf T}
\begin{pmatrix}
-1\\-1
\end{pmatrix}
=
1,
$

$
\bar c_4
=
0-
\begin{pmatrix}
0\\1
\end{pmatrix}^{\mathsf T}
\begin{pmatrix}
-1\\-1
\end{pmatrix}
=
1.
$

したがって

$
\bar c_N=(1,1)\ge0.
$

よって \(x^*\) は最適です。

双対目的値も

$
b^{\mathsf T}y^*
=
4(-1)+5(-1)
=
-9
$

で主目的値と一致します。
<!-- solution-end -->

<a id="ex-opt11-b02"></a>
### OPT11-B02 Phase I と Farkas 証明書

- Level: B
- 目安時間: 20分

$
x_1+x_2=1,
$

$
x_1+x_2=2,
$

$
x_1,x_2\ge0
$

を考える。

1. Phase I 補助問題を書け。
2. その最適値を求めよ。
3. 元の系が実行不能であることを結論せよ。
4. さらに
   \[
   A^{\mathsf T}y\ge0,
   \qquad
   b^{\mathsf T}y<0
   \]
   を満たす Farkas 証明書 \(y\) を一つ求めよ。

<!-- solution-start -->
#### 詳細解答

$
A=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$

Phase I は

$
\min a_1+a_2
$

subject to

$
x_1+x_2+a_1=1,
$

$
x_1+x_2+a_2=2,
$

$
x_1,x_2,a_1,a_2\ge0.
$

$
t=x_1+x_2
$

と置きます。

すると

$
a_1=1-t,
\qquad
a_2=2-t.
$

\(a_1,a_2\ge0\) から

$
t\le1.
$

また \(x_1,x_2\ge0\) から

$
t\ge0.
$

目的値は

$
a_1+a_2
=
3-2t.
$

これは \(t\) が大きいほど小さくなるので、\(0\le t\le1\) のもとで

$
t=1
$

が最適です。

従って

$
\boxed{
\rho^*=1.
}
$

Phase I 最適値が 0 ではないので、元の系は実行不能です。

次に Farkas 証明書を探します。

$
y=
\begin{pmatrix}
1\\-1
\end{pmatrix}
$

と置くと

$
A^{\mathsf T}y
=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}
\begin{pmatrix}
1\\-1
\end{pmatrix}
=
\begin{pmatrix}
0\\0
\end{pmatrix}
\ge0.
$

一方

$
b^{\mathsf T}y
=
1\cdot1+2\cdot(-1)
=
-1<0.
$

したがって

$
\boxed{
y=(1,-1)
}
$

は実行不能性の証明書です。

もし \(Ax=b,\ x\ge0\) を満たす \(x\) が存在したなら

$
b^{\mathsf T}y
=
x^{\mathsf T}A^{\mathsf T}y
\ge0
$

のはずですが、実際には \(-1\) です。
これが矛盾です。
<!-- solution-end -->

<a id="ex-opt11-b03"></a>
### OPT11-B03 中心路と Newton ステップ

- Level: B
- 目安時間: 25分

$
\min x_2
$

subject to

$
x_1+x_2=1,
\qquad
x_1,x_2\ge0
$

を考える。

$
\mu=\frac38
$

とする。

1. 
   \[
   x=
   \begin{pmatrix}
   3/4\\1/4
   \end{pmatrix},
   \quad
   y=-\frac12,
   \quad
   s=
   \begin{pmatrix}
   1/2\\3/2
   \end{pmatrix}
   \]
   が中心路方程式を満たすことを確認せよ。
2. 双対ギャップを計算し、\(n\mu\) と一致することを示せ。
3. 次の主双対可行点
   \[
   x=
   \begin{pmatrix}
   1/2\\1/2
   \end{pmatrix},
   \quad
   y=-\frac12,
   \quad
   s=
   \begin{pmatrix}
   1/2\\3/2
   \end{pmatrix}
   \]
   から、同じ \(\mu\) に対する Newton ステップを一回計算せよ。

<!-- solution-start -->
#### 詳細解答

ここでは

$
A=
\begin{pmatrix}
1&1
\end{pmatrix},
\qquad
b=1,
\qquad
c=
\begin{pmatrix}
0\\1
\end{pmatrix}.
$

まず

$
Ax
=
\frac34+\frac14
=
1=b.
$

次に

$
A^{\mathsf T}y+s
=
\begin{pmatrix}
-1/2\\-1/2
\end{pmatrix}
+
\begin{pmatrix}
1/2\\3/2
\end{pmatrix}
=
\begin{pmatrix}
0\\1
\end{pmatrix}
=c.
$

また

$
x_1s_1
=
\frac34\cdot\frac12
=
\frac38,
$

$
x_2s_2
=
\frac14\cdot\frac32
=
\frac38.
$

したがって

$
Xs
=
\frac38\mathbf1
=
\mu\mathbf1.
$

よって中心路方程式を満たします。

双対ギャップは

$
c^{\mathsf T}x-b^{\mathsf T}y
=
\frac14-\left(-\frac12\right)
=
\frac34.
$

変数数は \(n=2\) なので

$
n\mu
=
2\cdot\frac38
=
\frac34.
$

一致しました。

次に

$
x=
\begin{pmatrix}
1/2\\1/2
\end{pmatrix}
$

から Newton ステップを計算します。

この点は主双対可行なので

$
r_p=0,
\qquad
r_d=0.
$

相補性残差は

$
Xs
=
\begin{pmatrix}
(1/2)(1/2)\\
(1/2)(3/2)
\end{pmatrix}
=
\begin{pmatrix}
1/4\\3/4
\end{pmatrix}.
$

したがって

$
r_c
=
Xs-\mu\mathbf1
=
\begin{pmatrix}
1/4-3/8\\
3/4-3/8
\end{pmatrix}
=
\begin{pmatrix}
-1/8\\3/8
\end{pmatrix}.
$

Newton 方程式は

$
A\Delta x=0
$

より

$
\Delta x_1+\Delta x_2=0.
$

そこで

$
\Delta x_1=t,
\qquad
\Delta x_2=-t
$

と置きます。

双対残差の式

$
A^{\mathsf T}\Delta y+\Delta s=0
$

から

$
\Delta s_1=-\Delta y,
\qquad
\Delta s_2=-\Delta y.
$

相補性の一次式

$
S\Delta x+X\Delta s=-r_c
$

を成分ごとに書くと

$
\frac12 t
+
\frac12(-\Delta y)
=
\frac18,
$

$
\frac32(-t)
+
\frac12(-\Delta y)
=
-\frac38.
$

第1式を2倍して

$
t-\Delta y=\frac14.
$

第2式を2倍して

$
-3t-\Delta y=-\frac34.
$

差を取ると

$
-4t=-1,
$

従って

$
t=\frac14.
$

第1式へ戻して

$
\Delta y=0.
$

よって

$
\Delta s=0.
$

したがって

$
\boxed{
\Delta x=
\begin{pmatrix}
1/4\\-1/4
\end{pmatrix},
\qquad
\Delta y=0,
\qquad
\Delta s=0.
}
$

歩幅 1 で更新すると

$
x^+
=
\begin{pmatrix}
3/4\\1/4
\end{pmatrix}
$

となり、先ほどの中心路点へ一回で到達します。
<!-- solution-end -->

---

## 14. 演習 Level C

<a id="ex-opt11-c01"></a>
### OPT11-C01 単体法・感度解析・中心路を一つの LP でつなぐ

- Level: C
- 目安時間: 45分

$
\min -3x_1-2x_2
$

subject to

$
x_1+x_2+x_3=4,
$

$
2x_1+x_2+x_4=5,
$

$
x\ge0
$

を考える。

1. 初期基底 \(B=\{3,4\}\) から単体法を実行し、最適解を求めよ。
2. 最適基底 \(B=\{1,2\}\) に対する最適双対解を求めよ。
3. 第1右辺だけを
   \[
   4\mapsto4+t
   \]
   と変える。同じ基底が最適であり続ける \(t\) の範囲と、その範囲での最適値 \(v(t)\) を求めよ。
4. 目的係数だけを
   \[
   c_1=-3+\gamma
   \]
   と変える。同じ基底が最適であり続ける \(\gamma\) の範囲を求めよ。
5. \(t\) や \(\gamma\) が上の範囲の端点に達したとき、なぜ「基底が切り替わる可能性」が生じるのか説明せよ。
6. この LP の主双対中心路上では、双対ギャップが \(4\mu\) であることを示せ。特に \(\mu=0.01\) なら、中心路上の主目的値と双対目的値の差はいくらか。

<!-- solution-start -->
#### 詳細解答

### 1. 単体法

初期基底 \(B=\{3,4\}\) では

$
x=(0,0,4,5),
$

$
\bar c_1=-3,
\qquad
\bar c_2=-2.
$

\(x_1\) を進入させます。

$
p=
\begin{pmatrix}
1\\2
\end{pmatrix}.
$

比率は

$
4,
\qquad
\frac52.
$

従って

$
\theta=\frac52
$

で \(x_4\) が離脱します。

新しい点は

$
x=
\left(
\frac52,0,\frac32,0
\right).
$

新基底 \(B=\{3,1\}\) で

$
A_B=
\begin{pmatrix}
1&1\\
0&2
\end{pmatrix},
\qquad
c_B=
\begin{pmatrix}
0\\-3
\end{pmatrix}.
$

$
A_B^{\mathsf T}y=c_B
$

から

$
y=
\begin{pmatrix}
0\\-3/2
\end{pmatrix}.
$

\(x_2\) の被約費用は

$
\bar c_2
=
-2-
\begin{pmatrix}
1\\1
\end{pmatrix}^{\mathsf T}
\begin{pmatrix}
0\\-3/2
\end{pmatrix}
=
-\frac12.
$

よって \(x_2\) を進入させます。

$
p=A_B^{-1}a_2
=
\begin{pmatrix}
1/2\\1/2
\end{pmatrix}.
$

比率は

$
\frac{3/2}{1/2}=3,
$

$
\frac{5/2}{1/2}=5.
$

従って

$
\theta=3
$

で \(x_3\) が離脱します。

更新後は

$
\boxed{
x^*=(1,3,0,0).
}
$

目的値は

$
\boxed{
v=-9.
}
$

### 2. 最適双対解

最適基底は \(B=\{1,2\}\) です。

$
A_B=
\begin{pmatrix}
1&1\\
2&1
\end{pmatrix},
\qquad
c_B=
\begin{pmatrix}
-3\\-2
\end{pmatrix}.
$

$
A_B^{\mathsf T}y=c_B
$

すなわち

$
y_1+2y_2=-3,
$

$
y_1+y_2=-2
$

を解くと

$
\boxed{
y^*=(-1,-1).
}
$

双対目的値は

$
4(-1)+5(-1)=-9
$

で主目的値と一致します。

### 3. 第1右辺の感度

$
b(t)
=
\begin{pmatrix}
4+t\\5
\end{pmatrix}.
$

$
A_B^{-1}
=
\begin{pmatrix}
-1&1\\
2&-1
\end{pmatrix}.
$

従って

$
x_B(t)
=
A_B^{-1}b(t)
=
\begin{pmatrix}
1-t\\
3+2t
\end{pmatrix}.
$

同じ基底が実行可能である条件は

$
1-t\ge0,
$

$
3+2t\ge0.
$

従って

$
\boxed{
-\frac32\le t\le1.
}
$

被約費用は \(b\) に依存しないので、この範囲では同じ基底が最適です。

影の価格は

$
y^*=(-1,-1)
$

なので、第1右辺を \(t\) だけ変えたとき

$
v(t)
=
v(0)+y_1^*t
=
-9-t.
$

従って

$
\boxed{
v(t)=-9-t
\qquad
\left(
-\frac32\le t\le1
\right).
}
$

### 4. \(c_1\) の感度

$
c_1=-3+\gamma
$

とします。

基底費用は

$
c_B(\gamma)
=
\begin{pmatrix}
-3+\gamma\\
-2
\end{pmatrix}.
$

$
A_B^{\mathsf T}y=c_B(\gamma)
$

から

$
y_1+2y_2=-3+\gamma,
$

$
y_1+y_2=-2.
$

従って

$
y_2=-1+\gamma,
\qquad
y_1=-1-\gamma.
$

非基底変数は \(x_3,x_4\) です。

$
\bar c_3
=
0-y_1
=
1+\gamma,
$

$
\bar c_4
=
0-y_2
=
1-\gamma.
$

同じ基底が最適である条件は

$
1+\gamma\ge0,
$

$
1-\gamma\ge0.
$

従って

$
\boxed{
-1\le\gamma\le1.
}
$

### 5. 範囲端点の意味

右辺感度の端点では、例えば \(t=1\) なら

$
x_1=1-t=0.
$

つまり現在の基底変数が 0 になり、退化または隣接基底への切替点になります。

費用係数感度の端点では、例えば \(\gamma=1\) なら

$
\bar c_4=0.
$

非基底変数を増やしても一階的に目的値が変わらないため、別の基底が同じ最適値を持つ可能性が生じます。

したがって範囲端点は

$
\boxed{
\text{主実行可能性または双対実行可能性の余裕が 0 になる点}
}
$

です。

### 6. 中心路の双対ギャップ

この LP の変数数は

$
n=4.
$

LP 中心路方程式では各成分で

$
x_js_j=\mu.
$

従って

$
c^{\mathsf T}x-b^{\mathsf T}y
=
x^{\mathsf T}s
=
\sum_{j=1}^4x_js_j
=
4\mu.
$

よって

$
\boxed{
\text{双対ギャップ}=4\mu.
}
$

$
\mu=0.01
$

なら

$
\boxed{
4\mu=0.04.
}
$

したがって中心路上では、主目的値と双対目的値の差が 0.04 です。
<!-- solution-end -->

---

## 15. この章の要点

- 実行可能基底 \(B\) に対して
  \[
  y_B=A_B^{-\mathsf T}c_B
  \]
  を置くと、非基底変数の被約費用は
  \[
  \bar c_N=c_N-A_N^{\mathsf T}y_B
  \]
  である。
- 任意の実行可能解について
  \[
  c^{\mathsf T}x
  =
  c^{\mathsf T}x^0+\bar c_N^{\mathsf T}x_N
  \]
  なので、\(\bar c_N\ge0\) なら現在の基本実行可能解は最適である。
- \(\bar c_j<0\) の非基底変数を増やすとき
  \[
  p=A_B^{-1}a_j
  \]
  と置き、
  \[
  \theta
  =
  \min_{i:p_i>0}
  \frac{(x_B)_i}{p_i}
  \]
  が比率検定になる。
- \(p_i>0\) が一つもなければ、その方向へ無限に進めるため主問題は下方非有界である。
- 退化した基本実行可能解では \(\theta=0\) のピボットが起こり、点を動かさず基底だけが変わり得る。
- Phase I
  \[
  \min \mathbf1^{\mathsf T}a
  \quad
  Ax+a=b,\quad x,a\ge0
  \]
  の最適値が 0 であることと、元の標準形が実行可能であることは同値である。
- LP の中心路では
  \[
  Ax=b,
  \qquad
  A^{\mathsf T}y+s=c,
  \qquad
  Xs=\mu\mathbf1,
  \qquad
  x,s>0
  \]
  が成り立つ。
- 中心路上の双対ギャップは
  \[
  \boxed{
  c^{\mathsf T}x-b^{\mathsf T}y=n\mu
  }
  \]
  である。
- 内点法では中心路方程式へ Newton 法を適用し、主残差・双対残差・相補性残差を同時に減らす。
- 固定最適基底のもとで右辺を \(\Delta b\) だけ変え、同じ基底が実行可能であり続けるなら
  \[
  \boxed{
  v(b+\Delta b)=v(b)+y_B^{\mathsf T}\Delta b
  }
  \]
  である。
- 双対変数は、この範囲で制約右辺の変化に対する最適値の影の価格になる。
- 費用係数の感度は、更新後の被約費用が非負であり続ける範囲として計算できる。

次の OPT12 では、線形目的関数を二次目的関数へ拡張し、凸二次計画、等式制約 QP、KKT 線形系、active-set の見方、二次錐計画への入口を扱います。
