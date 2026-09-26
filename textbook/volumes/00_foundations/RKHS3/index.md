# RKHS3 カーネルリッジ回帰

<!-- definition-example-audit: strict -->

[RKHS2](../RKHS2/index.md) では、有限個の訓練点で評価される損失と RKHS ノルム正則化を組み合わせると、最小解を核切片の有限線形結合へ落とせることを示しました。

ここでは、その一般原理を最も計算しやすい二乗損失へ適用します。目的は単に一つの公式を覚えることではありません。

$$
\boxed{
\text{表現定理}
\Longrightarrow
\text{Gram 行列上の二次最適化}
\Longrightarrow
\text{解公式}
\Longrightarrow
\text{固有方向ごとの縮小}
}
$$

という流れを、自力で再構成できることが本章の目標です。

SVM より先にこの例を見る理由も明確です。kernel 法の本質は「分類器特有の技巧」ではなく、核によって関数空間上の問題を有限標本上の線形代数へ変換することにあります。二乗損失なら、その構造を KKT や不等式制約に邪魔されず観察できます。

---

## 1. まず正則化係数の規約を固定する

訓練データを

$$
(x_1,y_1),\dots,(x_n,y_n),
\qquad
x_i\in\mathcal X,
\qquad
y_i\in\mathbb R
$$

とし、$\mathcal H$ を再生核 $K$ を持つ RKHS とします。

本章では二乗損失を「和」ではなく「平均」で書きます。したがって正則化係数 $\lambda>0$ に対して目的関数は

$$
\frac1n
\sum_{i=1}^n
\bigl(f(x_i)-y_i\bigr)^2
+
\lambda\|f\|_{\mathcal H}^2
$$

です。

この規約では解公式に $G+n\lambda I$ が現れます。もし損失を

$$
\sum_{i=1}^n
\bigl(f(x_i)-y_i\bigr)^2
$$

と書く教科書なら、解公式は $\alpha=(G+\lambda I)^{-1}y$ になります。違いは理論ではなく $\lambda$ の尺度です。

<a id="def-rkhs3-kernel-ridge-regression"></a>

<!-- formal-statement-start -->
> **定義（カーネルリッジ回帰）**  
> 訓練データ $(x_i,y_i)_{i=1}^n$、再生核 $K$ を持つ RKHS $\mathcal H$、正則化係数 $\lambda>0$ に対し、
>
$$
J_\lambda(f)
=
\frac1n
\sum_{i=1}^n
\bigl(f(x_i)-y_i\bigr)^2
+
\lambda\|f\|_{\mathcal H}^2
$$
>
> を最小化する問題を **カーネルリッジ回帰** と呼ぶ。本章ではこの平均二乗誤差の規約を一貫して用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs3-kernel-ridge-regression -->
**定義の確認**：線形核なら何を最小化しているか

$\mathcal X=\mathbb R^p$ とし、

$$
K(x,z)=x^{\mathsf T}z
$$

を考えます。[RKHS1](../RKHS1/index.md#def-rkhs1-reproducing-kernel) の線形核では

$$
f_w(x)=w^{\mathsf T}x,
\qquad
\|f_w\|_{\mathcal H}^2=\|w\|_2^2.
$$

したがってカーネルリッジ回帰は

$$
\min_{w\in\mathbb R^p}
\left\{
\frac1n
\sum_{i=1}^n
\bigl(x_i^{\mathsf T}w-y_i\bigr)^2
+
\lambda\|w\|_2^2
\right\}.
$$

これは切片を別扱いしない通常のリッジ回帰そのものです。後で、kernel 表示から得た解がこの主形式と一致することを証明します。
<!-- definition-example-end -->

---

## 2. 表現定理で無限次元問題を有限次元へ落とす

[RKHS2 の表現定理](../RKHS2/index.md#thm-rkhs2-representer)を適用すると、最小解は

$$
f(\cdot)
=
\sum_{j=1}^n
\alpha_j K(x_j,\cdot)
$$

の形に取れます。

訓練点に対する Gram 行列を

$$
G
=
\bigl(K(x_i,x_j)\bigr)_{i,j=1}^n
\in\mathbb R^{n\times n}
$$

とし、

$$
\alpha
=
\begin{pmatrix}
\alpha_1\\
\vdots\\
\alpha_n
\end{pmatrix},
\qquad
y
=
\begin{pmatrix}
y_1\\
\vdots\\
y_n
\end{pmatrix}
$$

と置きます。

再生核の対称性から $G$ は実対称で、正半定値です。

訓練点 $x_i$ では

$$
f(x_i)
=
\sum_{j=1}^n
\alpha_j K(x_j,x_i),
$$

したがって訓練予測ベクトルは

$$
\begin{pmatrix}
f(x_1)\\
\vdots\\
f(x_n)
\end{pmatrix}
=
G\alpha.
$$

また [RKHS2 の Gram 行列表現](../RKHS2/index.md#prop-rkhs2-gram-reduction)から

$$
\|f\|_{\mathcal H}^2
=
\alpha^{\mathsf T}G\alpha.
$$

よって目的関数は

$$
\boxed{
\Phi_\lambda(\alpha)
=
\frac1n
\|G\alpha-y\|_2^2
+
\lambda\alpha^{\mathsf T}G\alpha
}
$$

へ落ちます。

ここで注意が一つあります。$G$ が特異なら、同じ関数 $f$ を複数の $\alpha$ が表すことがあります。したがって「係数ベクトルの一意性」と「RKHS の関数としての一意性」は分けて考えます。

---

## 3. 解公式はなぜ G+nλI になるのか

まず、正半定値行列 $G$ に $\lambda>0$ を加えると何が起きるか確認します。

任意の $v\ne0$ に対して

$$
v^{\mathsf T}(G+n\lambda I)v
=
v^{\mathsf T}Gv
+
n\lambda\|v\|_2^2.
$$

$G$ は正半定値なので第1項は非負であり、第2項は正です。従って

$$
v^{\mathsf T}(G+n\lambda I)v>0
\qquad(v\ne0).
$$

つまり

$$
G+n\lambda I
$$

は正定値で、必ず可逆です。元の $G$ が特異でも問題ありません。

<a id="thm-rkhs3-closed-form"></a>

<!-- formal-statement-start -->
> **定理（カーネルリッジ回帰の解公式）**  
> 訓練データ $(x_i,y_i)_{i=1}^n$ と、再生核 $K$ を持つ RKHS $\mathcal H$ を考える。Gram 行列を
>
$$
G_{ij}=K(x_i,x_j)
$$
>
> とし、$\lambda>0$ とする。このときカーネルリッジ回帰
>
$$
\min_{f\in\mathcal H}
\left\{
\frac1n\sum_{i=1}^n
(f(x_i)-y_i)^2
+
\lambda\|f\|_{\mathcal H}^2
\right\}
$$
>
> は関数として一意な最小解 $\widehat f_\lambda$ を持つ。さらに
>
$$
\alpha_\lambda
=
(G+n\lambda I)^{-1}y
$$
>
> と置けば
>
$$
\boxed{
\widehat f_\lambda(\cdot)
=
\sum_{i=1}^n
(\alpha_\lambda)_i
K(x_i,\cdot)
}
$$
>
> と表せる。$G$ が特異な場合、最小解を表す係数は一意とは限らず、全ての最小係数は
>
$$
\alpha_\lambda+v,
\qquad
v\in\ker G
$$
>
> の形である。
<!-- formal-statement-end -->

### 証明の見取り図

表現定理で $\alpha$ の問題へ落とし、

$$
\Phi_\lambda(\alpha)
=
\frac1n\|G\alpha-y\|^2
+
\lambda\alpha^{\mathsf T}G\alpha
$$

を微分します。

ただし $G$ が特異なら、停留条件から直ちに

$$
(G+n\lambda I)\alpha=y
$$

とは言えません。実際に得られるのは

$$
G\bigl((G+n\lambda I)\alpha-y\bigr)=0
$$

です。

そこでまず

$$
\alpha_\lambda=(G+n\lambda I)^{-1}y
$$

を標準代表として作り、任意の係数との差を $d$ と置いて目的値の差を直接展開します。差が非負になり、0 になるのがちょうど $d\in\ker G$ のときだと示せば、最小係数全体と関数としての一意性が同時に分かります。

<!-- proof-start -->
### 証明

[RKHS2 の表現定理の射影論証](../RKHS2/index.md#thm-rkhs2-representer)により、任意の $f\in\mathcal H$ を標本部分空間へ直交射影しても訓練点での値は変わらず、$\lambda>0$ の二乗ノルム正則化は増えません。従って

$$
\inf_{f\in\mathcal H}J_\lambda(f)
=
\inf_{f\in S}J_\lambda(f),
\qquad
S=\operatorname{span}\{K_{x_1},\dots,K_{x_n}\}.
$$

よってまず

$$
f(\cdot)
=
\sum_{i=1}^n
\alpha_iK(x_i,\cdot)
$$

と置いた有限次元問題を解けば十分です。このとき

$$
\Phi_\lambda(\alpha)
=
\frac1n
(G\alpha-y)^{\mathsf T}(G\alpha-y)
+
\lambda\alpha^{\mathsf T}G\alpha.
$$

$c=n\lambda$ と置き、

$$
\alpha_\lambda=(G+cI)^{-1}y
$$

とします。$G+cI$ は正定値なので、このベクトルは一意に定まります。

任意の $\alpha$ に対して

$$
d=\alpha-\alpha_\lambda
$$

と置きます。定義から

$$
(G+cI)\alpha_\lambda=y
$$

なので

$$
G\alpha_\lambda-y=-c\alpha_\lambda.
$$

目的値の差を展開すると

$$
\begin{aligned}
\Phi_\lambda(\alpha_\lambda+d)-\Phi_\lambda(\alpha_\lambda)
&=
\frac1n
\left(
2d^{\mathsf T}G(G\alpha_\lambda-y)
+
d^{\mathsf T}G^2d
\right)\\
&\quad+
\lambda
\left(
2d^{\mathsf T}G\alpha_\lambda
+
d^{\mathsf T}Gd
\right).
\end{aligned}
$$

ここで $c=n\lambda$ と
$G\alpha_\lambda-y=-c\alpha_\lambda$ を使うと交差項は

$$
-\frac{2c}{n}d^{\mathsf T}G\alpha_\lambda
+
2\lambda d^{\mathsf T}G\alpha_\lambda
=
0
$$

と打ち消し合います。従って

$$
\boxed{
\Phi_\lambda(\alpha_\lambda+d)-\Phi_\lambda(\alpha_\lambda)
=
\frac1n\|Gd\|_2^2
+
\lambda d^{\mathsf T}Gd
\ge0
}
$$

です。ここで $G$ の正半定値性を使いました。よって $\alpha_\lambda$ は標本部分空間上の最小係数です。冒頭の射影不等式から、この係数が表す関数は $\mathcal H$ 全体でも最小解であり、存在も同時に確認できました。

さらに $G$ は実対称正半定値なので、固有値分解から

$$
d^{\mathsf T}Gd=0
\quad\Longleftrightarrow\quad
Gd=0
$$

です。したがって上の差が 0 となるのはちょうど

$$
d\in\ker G
$$

のときです。従って全ての最小係数は

$$
\alpha_\lambda+\ker G
$$

です。

最後に $v\in\ker G$ に対応する核展開

$$
h_v=\sum_{i=1}^n v_iK(x_i,\cdot)
$$

は

$$
\|h_v\|_{\mathcal H}^2
=
v^{\mathsf T}Gv
=
0
$$

を満たすため、RKHS の零元です。従って最小係数が複数あっても、全て同じ RKHS 関数を表します。よって $\widehat f_\lambda$ は関数として一意です。
<!-- proof-end -->

---

## 4. 特異 Gram 行列でも何が一意なのか

ここは kernel 法で混乱しやすい点です。

$G$ が特異なら、ある $v\ne0$ が

$$
Gv=0
$$

を満たします。対応する RKHS の元

$$
h_v
=
\sum_{i=1}^n
v_iK(x_i,\cdot)
$$

を考えると

$$
\|h_v\|_{\mathcal H}^2
=
v^{\mathsf T}Gv
=
0.
$$

Hilbert 空間ではノルム 0 の元は零元なので

$$
h_v=0
$$

です。

従って

$$
\alpha
\quad\text{と}\quad
\alpha+v
$$

は異なる係数ベクトルでも、RKHS の元としては同じ関数を表します。

このため

$$
(G+n\lambda I)^{-1}y
$$

は「唯一の核展開係数」ではなく、**可逆な線形方程式によって選ばれる標準的な代表係数**です。

---

## 5. 階数1の定数核で直接計算する

$\mathcal X$ 上の定数核

$$
K(x,z)=1
$$

を考え、訓練点が2個、応答が

$$
y=
\begin{pmatrix}
3\\
1
\end{pmatrix}
$$

だとします。

Gram 行列は

$$
G=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}
$$

で、階数1です。

$\lambda=1/2$ とすると $n\lambda=1$ なので

$$
G+n\lambda I
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

逆行列は

$$
(G+n\lambda I)^{-1}
=
\frac13
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix},
$$

したがって標準代表係数は

$$
\alpha_\lambda
=
\frac13
\begin{pmatrix}
5\\
-1
\end{pmatrix}.
$$

定数核では $K(x_i,\cdot)=1$ なので

$$
\widehat f_\lambda(x)
=
\frac53-\frac13
=
\frac43
$$

です。

一方

$$
\ker G
=
\operatorname{span}
\left\{
\begin{pmatrix}
1\\
-1
\end{pmatrix}
\right\}.
$$

従って任意の $t\in\mathbb R$ に対して

$$
\alpha_\lambda
+
t
\begin{pmatrix}
1\\
-1
\end{pmatrix}
$$

も同じ関数 $4/3$ を表します。

係数は無数にあるのに、関数は一つです。

直接1変数問題として確認しても同じです。定数関数 $f(x)=c$ の RKHS ノルムは $c^2$ なので

$$
J(c)
=
\frac12
\left[
(c-3)^2+(c-1)^2
\right]
+
\frac12c^2.
$$

微分すると

$$
J'(c)
=
(c-3)+(c-1)+c
=
3c-4.
$$

従って

$$
c=\frac43.
$$

行列公式と直接最適化が一致しました。

---

## 6. 新しい入力では核ベクトルだけが必要になる

訓練後に新しい入力 $x\in\mathcal X$ が来たとします。

<a id="def-rkhs3-kernel-vector"></a>

<!-- formal-statement-start -->
> **定義（核ベクトル）**  
> 訓練点 $x_1,\dots,x_n$ と新しい入力 $x$ に対して
>
$$
k(x)
=
\begin{pmatrix}
K(x_1,x)\\
\vdots\\
K(x_n,x)
\end{pmatrix}
\in\mathbb R^n
$$
>
> を $x$ の **核ベクトル** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs3-kernel-vector -->
**定義の確認**：二次多項式核

$$
K(u,v)=(1+u^{\mathsf T}v)^2
$$

を用い、訓練点が $x_1,x_2$ の2点なら、新しい $x$ に対する核ベクトルは

$$
k(x)
=
\begin{pmatrix}
(1+x_1^{\mathsf T}x)^2\\
(1+x_2^{\mathsf T}x)^2
\end{pmatrix}.
$$

特徴写像の座標を明示しなくても、訓練点との核値を2個計算すれば予測できます。
<!-- definition-example-end -->

解公式から

$$
\widehat f_\lambda(x)
=
\sum_{i=1}^n
(\alpha_\lambda)_iK(x_i,x)
$$

なので

$$
\boxed{
\widehat f_\lambda(x)
=
k(x)^{\mathsf T}
(G+n\lambda I)^{-1}y
}
$$

です。

kernel 法の予測段階でも、特徴空間の座標は不要です。

---

## 7. 訓練点上では応答ベクトルを線形に平滑化する

訓練点での予測値を

$$
\widehat y_\lambda
=
\begin{pmatrix}
\widehat f_\lambda(x_1)\\
\vdots\\
\widehat f_\lambda(x_n)
\end{pmatrix}
$$

と置くと

$$
\widehat y_\lambda
=
G\alpha_\lambda
=
G(G+n\lambda I)^{-1}y.
$$

<a id="def-rkhs3-smoother-matrix"></a>

<!-- formal-statement-start -->
> **定義（平滑化行列）**  
> Gram 行列 $G\in\mathbb R^{n\times n}$ と $\lambda>0$ に対して
>
$$
S_\lambda
=
G(G+n\lambda I)^{-1}
$$
>
> をカーネルリッジ回帰の **平滑化行列** と呼ぶ。このとき訓練予測ベクトルは
>
$$
\widehat y_\lambda=S_\lambda y
$$
>
> で与えられる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs3-smoother-matrix -->
**定義の確認**：$G=I$ なら一様縮小

もし

$$
G=I_n
$$

なら

$$
S_\lambda
=
\frac1{1+n\lambda}I_n.
$$

従って

$$
\widehat y_\lambda
=
\frac1{1+n\lambda}y.
$$

全ての訓練方向が同じ倍率で 0 側へ縮みます。一般の $G$ ではこの倍率が固有方向ごとに変わります。
<!-- definition-example-end -->

---

## 8. 固有値方向ごとに縮小率を見る

Gram 行列は実対称正半定値なので、[実対称行列のスペクトル定理](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#thm-real-symmetric-spectral)により

$$
G
=
Q
\operatorname{diag}(\mu_1,\dots,\mu_n)
Q^{\mathsf T},
\qquad
\mu_j\ge0
$$

と書けます。

<a id="prop-rkhs3-spectral-smoother"></a>

<!-- formal-statement-start -->
> **命題（平滑化行列のスペクトル表示）**  
> 実対称正半定値 Gram 行列
>
$$
G
=
Q\operatorname{diag}(\mu_1,\dots,\mu_n)Q^{\mathsf T},
\qquad
\mu_j\ge0
$$
>
> と $\lambda>0$ に対して、平滑化行列
>
$$
S_\lambda=G(G+n\lambda I)^{-1}
$$
>
> は
>
$$
\boxed{
S_\lambda
=
Q
\operatorname{diag}
\left(
\frac{\mu_1}{\mu_1+n\lambda},
\dots,
\frac{\mu_n}{\mu_n+n\lambda}
\right)
Q^{\mathsf T}
}
$$
>
> と表される。従って固有値 $\mu_j$ に対応する応答成分は
>
$$
\frac{\mu_j}{\mu_j+n\lambda}
$$
>
> 倍される。
<!-- formal-statement-end -->

### 証明の見取り図

$G$ と $G+n\lambda I$ は同じ固有ベクトルを持ちます。したがって逆行列も同じ固有基底で対角化され、対応する固有値だけを割ればよいことになります。

<!-- proof-start -->
### 証明

$$
G+n\lambda I
=
Q
\operatorname{diag}
(\mu_1+n\lambda,\dots,\mu_n+n\lambda)
Q^{\mathsf T}.
$$

$\lambda>0$ なので各 $\mu_j+n\lambda$ は正であり、

$$
(G+n\lambda I)^{-1}
=
Q
\operatorname{diag}
\left(
\frac1{\mu_1+n\lambda},
\dots,
\frac1{\mu_n+n\lambda}
\right)
Q^{\mathsf T}.
$$

従って

$$
\begin{aligned}
S_\lambda
&=
G(G+n\lambda I)^{-1}\\
&=
Q
\operatorname{diag}(\mu_1,\dots,\mu_n)
\operatorname{diag}
\left(
\frac1{\mu_1+n\lambda},
\dots,
\frac1{\mu_n+n\lambda}
\right)
Q^{\mathsf T}\\
&=
Q
\operatorname{diag}
\left(
\frac{\mu_1}{\mu_1+n\lambda},
\dots,
\frac{\mu_n}{\mu_n+n\lambda}
\right)
Q^{\mathsf T}.
\end{aligned}
$$
<!-- proof-end -->

各縮小率は

$$
0
\le
\frac{\mu_j}{\mu_j+n\lambda}
<1.
$$

特に $\mu_j=0$ の方向は完全に消えます。

一方、$\mu_j$ が大きい方向では

$$
\frac{\mu_j}{\mu_j+n\lambda}
$$

は 1 に近く、弱くしか縮みません。

つまりカーネルリッジ回帰は、Gram 行列が「訓練点間で強く表現できる」と判断する方向を比較的残し、弱い方向を強く縮めます。

---

## 9. 残差側から見ると逆の倍率になる

訓練残差は

$$
r_\lambda
=
y-\widehat y_\lambda
=
(I-S_\lambda)y.
$$

恒等式

$$
I-G(G+n\lambda I)^{-1}
=
n\lambda(G+n\lambda I)^{-1}
$$

から

$$
r_\lambda
=
n\lambda(G+n\lambda I)^{-1}y.
$$

固有方向ごとの残差倍率は

$$
\frac{n\lambda}{\mu_j+n\lambda}.
$$

したがって

$$
\frac{\mu_j}{\mu_j+n\lambda}
+
\frac{n\lambda}{\mu_j+n\lambda}
=
1.
$$

予測に残す割合と残差へ送る割合がちょうど補い合っています。

---

## 10. λ を動かすと何が起きるか

<a id="prop-rkhs3-lambda-limits"></a>

<!-- formal-statement-start -->
> **命題（正則化係数の極限）**  
> 実対称正半定値 Gram 行列 $G$ と応答 $y\in\mathbb R^n$ に対し
>
$$
\widehat y_\lambda
=
G(G+n\lambda I)^{-1}y
\qquad(\lambda>0)
$$
>
> とする。このとき
>
> 1. $\lambda\to\infty$ なら $\widehat y_\lambda\to0$。
> 2. $\lambda\downarrow0$ なら $\widehat y_\lambda$ は $y$ の $\operatorname{Im}G$ への直交射影へ収束する。
> 3. 特に $y\in\operatorname{Im}G$ なら $\lambda\downarrow0$ で $\widehat y_\lambda\to y$ となり、訓練点上で補間に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

固有基底で

$$
y
=
\sum_{j=1}^n
c_jq_j
$$

と分解すれば、

$$
\widehat y_\lambda
=
\sum_j
\frac{\mu_j}{\mu_j+n\lambda}
c_jq_j.
$$

あとは各倍率の極限を見るだけです。

<!-- proof-start -->
### 証明

$Gq_j=\mu_jq_j$ となる正規直交固有基底を取ります。$y=\sum_jc_jq_j$ と書けば

$$
\widehat y_\lambda
=
\sum_{j=1}^n
\frac{\mu_j}{\mu_j+n\lambda}
c_jq_j.
$$

まず $\lambda\to\infty$ では各 $j$ について

$$
\frac{\mu_j}{\mu_j+n\lambda}\to0,
$$

従って

$$
\widehat y_\lambda\to0.
$$

次に $\lambda\downarrow0$ とします。

$\mu_j>0$ なら

$$
\frac{\mu_j}{\mu_j+n\lambda}\to1,
$$

一方 $\mu_j=0$ なら全ての $\lambda>0$ で倍率は 0 です。

従って極限は

$$
\sum_{\mu_j>0}
c_jq_j.
$$

実対称行列では

$$
\operatorname{Im}G
=
\operatorname{span}\{q_j:\mu_j>0\},
$$

なので、これは $y$ の $\operatorname{Im}G$ への直交射影です。

特に $y\in\operatorname{Im}G$ なら零固有値方向の成分がなく、極限は $y$ 自身です。
<!-- proof-end -->

$\lambda$ は単なる「小さいほど良い誤差項」ではありません。

- 小さい $\lambda$：訓練データへ強く追従する。
- 大きい $\lambda$：関数ノルムを強く罰し、0関数側へ縮める。

という明確な役割を持ちます。

---

## 11. 線形核では通常のリッジ回帰に戻る

入力を

$$
x_i\in\mathbb R^p
$$

とし、行列

$$
X
=
\begin{pmatrix}
x_1^{\mathsf T}\\
\vdots\\
x_n^{\mathsf T}
\end{pmatrix}
\in\mathbb R^{n\times p}
$$

を作ります。

線形核

$$
K(x,z)=x^{\mathsf T}z
$$

では

$$
G=XX^{\mathsf T}.
$$

主形式のリッジ回帰は

$$
\min_{w\in\mathbb R^p}
\left\{
\frac1n\|Xw-y\|_2^2
+
\lambda\|w\|_2^2
\right\}.
$$

各成分で微分して一階条件をまとめると

$$
\frac2nX^{\mathsf T}(Xw-y)+2\lambda w=0,
$$

すなわち

$$
(X^{\mathsf T}X+n\lambda I_p)w
=
X^{\mathsf T}y.
$$

$n\lambda>0$ なので係数行列は正定値で、

$$
\widehat w_\lambda
=
(X^{\mathsf T}X+n\lambda I_p)^{-1}X^{\mathsf T}y.
$$

一方 kernel 側では

$$
\alpha_\lambda
=
(XX^{\mathsf T}+n\lambda I_n)^{-1}y
$$

です。

<a id="prop-rkhs3-linear-primal-dual"></a>

<!-- formal-statement-start -->
> **命題（線形核と通常のリッジ回帰の一致）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$\lambda>0$ とする。線形核 $K(x,z)=x^{\mathsf T}z$ に対するカーネルリッジ回帰の標準代表係数を
>
$$
\alpha_\lambda
=
(XX^{\mathsf T}+n\lambda I_n)^{-1}y
$$
>
> とする。このとき
>
$$
\widehat w_\lambda
=
X^{\mathsf T}\alpha_\lambda
$$
>
> は通常のリッジ回帰解であり、
>
$$
\boxed{
X^{\mathsf T}
(XX^{\mathsf T}+n\lambda I_n)^{-1}
=
(X^{\mathsf T}X+n\lambda I_p)^{-1}
X^{\mathsf T}
}
$$
>
> が成り立つ。従って主形式と kernel の双対形式は全ての入力で同じ予測を与える。
<!-- formal-statement-end -->

### 証明の見取り図

核心は

$$
(X^{\mathsf T}X+cI_p)X^{\mathsf T}
=
X^{\mathsf T}(XX^{\mathsf T}+cI_n)
$$

という結合則だけです。$c=n\lambda>0$ により左右の括弧内は可逆なので、両側から逆行列を掛けます。

<!-- proof-start -->
### 証明

$c=n\lambda>0$ と置きます。行列の結合則から

$$
(X^{\mathsf T}X+cI_p)X^{\mathsf T}
=
X^{\mathsf T}(XX^{\mathsf T}+cI_n).
$$

$X^{\mathsf T}X$ と $XX^{\mathsf T}$ はともに正半定値なので、

$$
X^{\mathsf T}X+cI_p,
\qquad
XX^{\mathsf T}+cI_n
$$

は正定値で可逆です。

左から $(X^{\mathsf T}X+cI_p)^{-1}$、右から $(XX^{\mathsf T}+cI_n)^{-1}$ を掛けると

$$
X^{\mathsf T}(XX^{\mathsf T}+cI_n)^{-1}
=
(X^{\mathsf T}X+cI_p)^{-1}X^{\mathsf T}.
$$

従って

$$
X^{\mathsf T}\alpha_\lambda
=
X^{\mathsf T}
(XX^{\mathsf T}+cI_n)^{-1}y
$$

は

$$
(X^{\mathsf T}X+cI_p)^{-1}X^{\mathsf T}y
$$

に等しく、これは主形式のリッジ回帰解です。

新しい入力 $x$ に対して kernel 側では

$$
\widehat f_\lambda(x)
=
\sum_i(\alpha_\lambda)_i x_i^{\mathsf T}x
=
x^{\mathsf T}X^{\mathsf T}\alpha_\lambda
=
x^{\mathsf T}\widehat w_\lambda.
$$

よって予測も一致します。
<!-- proof-end -->

主形式では $p\times p$ 行列を解き、双対形式では $n\times n$ 行列を解きます。線形核なら、どちらを使うかは理論よりも $n$ と $p$ の大きさに依存します。

非線形 kernel では明示的な $p$ 次元特徴ベクトル自体を作らないため、Gram 行列側の表示が中心になります。

---

## 12. 特異 G で λ→0 とすると係数だけが大きくなることがある

$G$ の固有分解を

$$
Gq_j=\mu_jq_j
$$

とし、

$$
y
=
\sum_j c_jq_j
$$

と分解します。

標準代表係数は

$$
\alpha_\lambda
=
(G+n\lambda I)^{-1}y
=
\sum_j
\frac{c_j}{\mu_j+n\lambda}q_j.
$$

もし $\mu_j=0$ かつ $c_j\ne0$ なら、その係数成分は

$$
\frac{c_j}{n\lambda}
$$

なので

$$
\lambda\downarrow0
$$

で絶対値が無限大へ向かいます。

しかし $q_j\in\ker G$ です。対応する核切片の線形結合は RKHS の零元なので、その無限大へ向かう係数成分は関数に寄与しません。

訓練予測では

$$
G\alpha_\lambda
=
\sum_j
\frac{\mu_j}{\mu_j+n\lambda}
c_jq_j,
$$

したがって零固有値方向は最初から 0 です。

ここから重要な区別が得られます。

$$
\boxed{
\text{係数ベクトルの大きさ}
\neq
\text{RKHS の関数の大きさ}
}
$$

特異 Gram 行列では、冗長な係数方向が存在するからです。

---

## 13. 2方向の例でスペクトル縮小を読む

Gram 行列の固有ベクトル $q_1,q_2$ に対応する固有値が

$$
\mu_1=9,
\qquad
\mu_2=1
$$

だとします。

$n=2$、$\lambda=1/2$ なら

$$
n\lambda=1.
$$

縮小率は

$$
\frac{\mu_1}{\mu_1+n\lambda}
=
\frac9{10},
$$

$$
\frac{\mu_2}{\mu_2+n\lambda}
=
\frac12.
$$

したがって同じ大きさの応答成分でも、

- $q_1$ 方向は 90% 残る。
- $q_2$ 方向は 50% しか残らない。

という差が生じます。

正則化は全方向を一律に小さくしているのではありません。Gram 行列の幾何と組み合わさって方向別の縮小になります。

---

## 14. kernel 法の核は「特徴写像を作らないこと」だけではない

kernel trick という言葉は、しばしば

$$
\langle\varphi(x),\varphi(z)\rangle
=
K(x,z)
$$

と置き換える計算テクニックとして説明されます。

しかしカーネルリッジ回帰で見えている構造はもう少し深いものです。

1. RKHS という関数空間を選ぶ。
2. ノルムで関数の複雑さを測る。
3. 表現定理で解を訓練点の核切片の張る空間へ落とす。
4. Gram 行列だけで学習する。
5. 新しい点では訓練点との核値だけで予測する。

つまり kernel は、単なる「内積値の計算を核値へ切り替える技巧」ではなく

$$
\boxed{
\text{関数空間の幾何}
\longleftrightarrow
\text{有限標本上の行列計算}
}
$$

を接続しています。

次の RKHS4 では二乗損失を離れ、最大マージン分類へ進みます。そこでは目的関数が二次でも制約が入り、Lagrange 双対・KKT・サポートベクトルが現れます。それでも「有限標本が解を張る」という核は同じです。

---

# 演習

## Level A

### RKHS3-A01 単位 Gram 行列の解公式

- Level: A
- 目安時間: 8分

$n=3$、

$$
G=I_3,
\qquad
y=
\begin{pmatrix}
2\\
-1\\
4
\end{pmatrix},
\qquad
\lambda=\frac13
$$

とする。

1. $\alpha_\lambda$ を求めよ。
2. 訓練予測 $\widehat y_\lambda$ を求めよ。
3. 正則化なしの $y$ と比べ、何が起きているか説明せよ。

<!-- solution-start -->
#### 詳細解答

$n=3$、$\lambda=1/3$ なので

$$
n\lambda=1.
$$

従って

$$
G+n\lambda I
=
I_3+I_3
=
2I_3.
$$

よって

$$
(G+n\lambda I)^{-1}
=
\frac12I_3.
$$

したがって

$$
\alpha_\lambda
=
\frac12y
=
\begin{pmatrix}
1\\
-1/2\\
2
\end{pmatrix}.
$$

訓練予測は

$$
\widehat y_\lambda
=
G\alpha_\lambda
=
\alpha_\lambda
=
\begin{pmatrix}
1\\
-1/2\\
2
\end{pmatrix}.
$$

$G=I$ では全ての固有値が1なので、縮小率は

$$
\frac1{1+n\lambda}
=
\frac12.
$$

従って応答ベクトルの全方向が一様に半分へ縮められています。
<!-- solution-end -->

### RKHS3-A02 定数核の係数非一意性

- Level: A
- 目安時間: 10分

$n=2$、

$$
G=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix},
\qquad
y=
\begin{pmatrix}
2\\
0
\end{pmatrix},
\qquad
\lambda=\frac12
$$

とする。

1. 標準代表係数 $\alpha_\lambda$ を求めよ。
2. $\ker G$ を求めよ。
3. 全ての最小係数を表せ。
4. それらが同じ定数関数を表すことを確認せよ。

<!-- solution-start -->
#### 詳細解答

$n\lambda=1$ なので

$$
G+n\lambda I
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

逆行列は

$$
\frac13
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
$$

従って

$$
\alpha_\lambda
=
\frac13
\begin{pmatrix}
4\\
-2
\end{pmatrix}
=
\begin{pmatrix}
4/3\\
-2/3
\end{pmatrix}.
$$

次に

$$
G
\begin{pmatrix}
a\\
b
\end{pmatrix}
=
\begin{pmatrix}
a+b\\
a+b
\end{pmatrix},
$$

なので

$$
\ker G
=
\left\{
t
\begin{pmatrix}
1\\
-1
\end{pmatrix}
:t\in\mathbb R
\right\}.
$$

従って全最小係数は

$$
\begin{pmatrix}
4/3\\
-2/3
\end{pmatrix}
+
t
\begin{pmatrix}
1\\
-1
\end{pmatrix}.
$$

定数核では各核切片は定数関数1なので、表す関数値は係数和です。

$$
\frac43-\frac23+t-t
=
\frac23.
$$

従って全て同じ定数関数

$$
f(x)=\frac23
$$

を表します。
<!-- solution-end -->

### RKHS3-A03 固有方向の縮小率

- Level: A
- 目安時間: 8分

ある Gram 行列の固有値が

$$
\mu_1=8,
\qquad
\mu_2=2
$$

で、$n=2$、$\lambda=1$ とする。

1. 各固有方向の予測縮小率を求めよ。
2. 各固有方向の残差倍率を求めよ。
3. どちらの方向が強く残るか説明せよ。

<!-- solution-start -->
#### 詳細解答

$n\lambda=2$ です。

予測縮小率は

$$
\frac{\mu_j}{\mu_j+n\lambda}.
$$

従って

$$
q_1:\quad
\frac8{8+2}
=
\frac45,
$$

$$
q_2:\quad
\frac2{2+2}
=
\frac12.
$$

残差倍率は

$$
\frac{n\lambda}{\mu_j+n\lambda},
$$

なので

$$
q_1:\quad
\frac2{10}
=
\frac15,
$$

$$
q_2:\quad
\frac2{4}
=
\frac12.
$$

$\mu_1=8$ の方向は 80% が予測へ残り、$\mu_2=2$ の方向は 50% だけ残ります。従って Gram 行列の固有値が大きい $q_1$ 方向の方が弱く正則化されます。
<!-- solution-end -->

### RKHS3-A04 線形核で主形式へ戻す

- Level: A
- 目安時間: 12分

$$
X=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix},
\qquad
y=
\begin{pmatrix}
2\\
-1
\end{pmatrix},
\qquad
\lambda=\frac12
$$

とする。

1. 主形式のリッジ回帰解 $\widehat w_\lambda$ を求めよ。
2. 線形核の Gram 行列 $G$ と $\alpha_\lambda$ を求めよ。
3. $X^{\mathsf T}\alpha_\lambda=\widehat w_\lambda$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

$n=2$ なので

$$
n\lambda=1.
$$

まず

$$
X^{\mathsf T}X=I_2.
$$

従って

$$
\widehat w_\lambda
=
(X^{\mathsf T}X+n\lambda I_2)^{-1}X^{\mathsf T}y
=
(2I_2)^{-1}y
=
\frac12y.
$$

よって

$$
\widehat w_\lambda
=
\begin{pmatrix}
1\\
-1/2
\end{pmatrix}.
$$

線形核の Gram 行列は

$$
G=XX^{\mathsf T}=I_2.
$$

従って

$$
\alpha_\lambda
=
(G+n\lambda I_2)^{-1}y
=
\frac12y
=
\begin{pmatrix}
1\\
-1/2
\end{pmatrix}.
$$

この例では $X=I_2$ なので

$$
X^{\mathsf T}\alpha_\lambda
=
\alpha_\lambda
=
\widehat w_\lambda.
$$

主形式と双対形式が同じパラメータを与えることを直接確認できました。
<!-- solution-end -->

---

## Level B

### RKHS3-B01 最小係数集合を導出する

- Level: B
- 目安時間: 15分

実対称正半定値 Gram 行列 $G$、$\lambda>0$、$y\in\mathbb R^n$ に対して

$$
\Phi_\lambda(\alpha)
=
\frac1n\|G\alpha-y\|_2^2
+
\lambda\alpha^{\mathsf T}G\alpha
$$

を考える。

$$
\alpha_\lambda
=
(G+n\lambda I)^{-1}y
$$

と置くとき、最小係数全体が

$$
\alpha_\lambda+\ker G
$$

であることを示せ。

<!-- solution-start -->
#### 詳細解答

$c=n\lambda$、$d=\alpha-\alpha_\lambda$ と置きます。

$$
(G+cI)\alpha_\lambda=y
$$

なので

$$
G\alpha_\lambda-y=-c\alpha_\lambda.
$$

目的値の差を直接展開すると

$$
\begin{aligned}
\Phi_\lambda(\alpha_\lambda+d)-\Phi_\lambda(\alpha_\lambda)
&=
\frac1n
\left(
2d^{\mathsf T}G(G\alpha_\lambda-y)
+
d^{\mathsf T}G^2d
\right)\\
&\quad+
\lambda
\left(
2d^{\mathsf T}G\alpha_\lambda
+
d^{\mathsf T}Gd
\right).
\end{aligned}
$$

$c=n\lambda$ を使うと交差項が打ち消し合い、

$$
\Phi_\lambda(\alpha_\lambda+d)-\Phi_\lambda(\alpha_\lambda)
=
\frac1n\|Gd\|_2^2
+
\lambda d^{\mathsf T}Gd
\ge0.
$$

従って $\alpha_\lambda$ は最小係数です。

また $G$ は正半定値なので

$$
d^{\mathsf T}Gd=0
\quad\Longleftrightarrow\quad
d\in\ker G.
$$

したがって目的値の差が 0 になるのはちょうど $d\in\ker G$ の場合です。

よって最小係数全体は確かに

$$
\alpha_\lambda+\ker G
$$

です。
<!-- solution-end -->

### RKHS3-B02 λ を増やすと各固有方向が単調に縮む

- Level: B
- 目安時間: 12分

固定した $\mu>0$ に対して

$$
s_\mu(\lambda)
=
\frac{\mu}{\mu+n\lambda},
\qquad
\lambda>0
$$

とする。

1. $s_\mu(\lambda)$ が $\lambda$ の狭義減少関数であることを示せ。
2. 固定した $\lambda>0$ に対して、$s_\mu(\lambda)$ が $\mu$ の狭義増加関数であることを示せ。
3. この2点をカーネルリッジ回帰の正則化として解釈せよ。

<!-- solution-start -->
#### 詳細解答

$\lambda$ で微分すると

$$
\frac{d}{d\lambda}
s_\mu(\lambda)
=
-\frac{n\mu}{(\mu+n\lambda)^2}.
$$

$\mu>0$、$n>0$ なので

$$
\frac{d}{d\lambda}s_\mu(\lambda)<0.
$$

従って $\lambda$ を増やすほど、その固有方向の予測成分は狭義に小さくなります。

次に $\mu$ で微分すると

$$
\frac{\partial}{\partial\mu}
\frac{\mu}{\mu+n\lambda}
=
\frac{n\lambda}{(\mu+n\lambda)^2}
>0.
$$

従って固定した $\lambda$ では、Gram 行列の固有値が大きい方向ほど多く残ります。

つまり

- $\lambda$ は全方向に対する正則化強度を制御する。
- しかし実際の縮小率は $G$ の固有値にも依存する。
- 同じ $\lambda$ でも、データと核が強く支える方向は弱く縮み、弱い方向は強く縮む。

という構造です。
<!-- solution-end -->

### RKHS3-B03 λ↓0 の極限は像への射影になる

- Level: B
- 目安時間: 18分

実対称正半定値行列

$$
G
=
Q
\operatorname{diag}(\mu_1,\dots,\mu_n)
Q^{\mathsf T}
$$

と

$$
y=\sum_{j=1}^n c_jq_j
$$

を考える。

$$
\widehat y_\lambda
=
G(G+n\lambda I)^{-1}y
$$

について、

1. $\lambda\downarrow0$ の極限を求めよ。
2. その極限が $y$ の $\operatorname{Im}G$ への直交射影であることを示せ。
3. $y\notin\operatorname{Im}G$ のとき、なぜ完全補間できないか説明せよ。

<!-- solution-start -->
#### 詳細解答

スペクトル表示から

$$
\widehat y_\lambda
=
\sum_{j=1}^n
\frac{\mu_j}{\mu_j+n\lambda}
c_jq_j.
$$

$\mu_j>0$ なら

$$
\frac{\mu_j}{\mu_j+n\lambda}\to1.
$$

$\mu_j=0$ なら倍率は全ての $\lambda$ で 0 です。

従って

$$
\lim_{\lambda\downarrow0}
\widehat y_\lambda
=
\sum_{\mu_j>0}
c_jq_j.
$$

実対称行列では、正の固有値に対応する固有空間の直和が $\operatorname{Im}G$ です。また固有ベクトルは正規直交基底をなすので

$$
\sum_{\mu_j>0}c_jq_j
$$

はちょうど $y$ の $\operatorname{Im}G$ への直交射影です。

もし $y\notin\operatorname{Im}G$ なら、$y$ は

$$
y=y_{\operatorname{Im}}+y_{\ker},
\qquad
y_{\ker}\ne0
$$

と分解されます。

しかし任意の核展開の訓練予測は

$$
G\alpha\in\operatorname{Im}G
$$

です。従って $y_{\ker}$ 成分をどんな $\alpha$ でも再現できません。

正則化を 0 に近づけても表現可能な範囲そのものは変わらないので、極限で得られるのは完全補間ではなく像への最良直交近似です。
<!-- solution-end -->

---

## Level C

### RKHS3-C01 係数ノルムが無限大へ向かっても関数は有限

- Level: C
- 目安時間: 25分

実対称正半定値 Gram 行列 $G$ が特異で、

$$
y=y_R+y_N,
\qquad
y_R\in\operatorname{Im}G,
\qquad
0\ne y_N\in\ker G
$$

と直交分解されているとする。

標準代表係数

$$
\alpha_\lambda
=
(G+n\lambda I)^{-1}y
$$

について次を示せ。

1. $\alpha_\lambda$ の $\ker G$ 成分が
$$
\frac1{n\lambda}y_N
$$
であり、$\lambda\downarrow0$ でノルムが無限大へ向かうことを示せ。
2. その無限大へ向かう係数成分が表す RKHS の関数は零元であることを示せ。
3. 訓練予測 $G\alpha_\lambda$ は有限な極限 $y_R$ を持つことを示せ。
4. 「係数ノルムが大きい」ことから「学習された RKHS 関数が大きい」と結論してはいけない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

まず $y_N\in\ker G$ なので

$$
Gy_N=0.
$$

従って

$$
(G+n\lambda I)y_N
=
n\lambda y_N.
$$

よって

$$
(G+n\lambda I)^{-1}y_N
=
\frac1{n\lambda}y_N.
$$

一方 $y_R\in\operatorname{Im}G$ は正の固有値に対応する固有空間の和に属するので、

$$
(G+n\lambda I)^{-1}y_R
$$

は $\lambda\downarrow0$ でも各正固有値の逆数へ収束し、有限です。

従って

$$
\alpha_\lambda
=
(G+n\lambda I)^{-1}y_R
+
\frac1{n\lambda}y_N.
$$

$y_N\ne0$ なので第2項の Euclid ノルムは

$$
\frac{\|y_N\|_2}{n\lambda}
\to\infty.
$$

これで係数ベクトルのノルムが無限大へ向かうことが分かります。

次に $y_N=(v_1,\dots,v_n)^{\mathsf T}$ とし、対応する核展開

$$
h_N
=
\sum_{i=1}^n v_iK(x_i,\cdot)
$$

を考えます。

その RKHS ノルムは

$$
\|h_N\|_{\mathcal H}^2
=
y_N^{\mathsf T}Gy_N.
$$

$Gy_N=0$ なので

$$
\|h_N\|_{\mathcal H}^2=0.
$$

従って Hilbert 空間の元として

$$
h_N=0.
$$

よって

$$
\frac1{n\lambda}y_N
$$

という係数方向は、係数自体はいくら大きくなっても RKHS 関数へは全く寄与しません。

訓練予測については

$$
G\alpha_\lambda
=
G(G+n\lambda I)^{-1}y_R
+
\frac1{n\lambda}Gy_N.
$$

第2項は 0 です。

$y_R$ を正固有値方向で

$$
y_R
=
\sum_{\mu_j>0}c_jq_j
$$

と書けば

$$
G(G+n\lambda I)^{-1}y_R
=
\sum_{\mu_j>0}
\frac{\mu_j}{\mu_j+n\lambda}
c_jq_j.
$$

従って

$$
\lambda\downarrow0
$$

で

$$
G\alpha_\lambda\to y_R.
$$

したがって無限大へ向かっているのは、Gram 行列の零空間に沿った冗長な係数表示だけです。

kernel 展開では

$$
\|\alpha\|_2
$$

は RKHS 関数のノルムではありません。関数ノルムは

$$
\|f\|_{\mathcal H}^2
=
\alpha^{\mathsf T}G\alpha
$$

で決まり、$\ker G$ 成分はこの二次形式から完全に消えます。

よって特異 Gram 行列のもとでは

$$
\|\alpha_\lambda\|_2\to\infty
$$

でも、

- RKHS の関数
- RKHS ノルム
- 訓練予測

が無限大へ向かうとは限りません。係数空間の冗長性と関数空間の大きさを区別する必要があります。
<!-- solution-end -->
