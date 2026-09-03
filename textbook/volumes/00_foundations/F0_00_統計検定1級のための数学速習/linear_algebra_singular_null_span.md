# 線形代数補足：span・零空間・特異行列

この補足では、統計で分散共分散行列を扱うときに頻出する **線形包（span）**、**零空間（Null）**、**特異行列**、**階数・退化次数の定理**を整理する。

多変量正規分布、多項分布、回帰、射影行列などでは、行列が「逆行列を持つか」だけでなく、**どの方向の情報が失われているか**を見る必要がある。そのとき零空間と span が便利である。

---

## 1. span（線形包）とは

ベクトル $\boldsymbol v_1,\ldots,\boldsymbol v_m\in\mathbb R^n$ に対し、

$$
\operatorname{span}\{\boldsymbol v_1,\ldots,\boldsymbol v_m\}
=
\left\{
 c_1\boldsymbol v_1+\cdots+c_m\boldsymbol v_m
 :c_1,\ldots,c_m\in\mathbb R
\right\}
$$

を、これらのベクトルが張る **線形包**という。

たとえば

$$
\boldsymbol v=
\begin{pmatrix}1\\1\\1\end{pmatrix}
$$

なら

$$
\operatorname{span}\{\boldsymbol v\}
=
\left\{
 c
\begin{pmatrix}1\\1\\1\end{pmatrix}:c\in\mathbb R
\right\}.
$$

つまり、$\boldsymbol v$ と同じ方向にあるベクトル全部である。

---

## 2. 零空間 Null$(A)$ とは

$A\in\mathbb R^{m\times n}$ に対し、

$$
\boxed{
\operatorname{Null}(A)
=
\{\boldsymbol x\in\mathbb R^n:A\boldsymbol x=\boldsymbol0\}
}
$$

を $A$ の **零空間**という。**核**と呼ぶこともある。

たとえば

$$
A=
\begin{pmatrix}
1&-1\\
2&-2
\end{pmatrix}
$$

なら

$$
A
\begin{pmatrix}1\\1\end{pmatrix}
=
\begin{pmatrix}0\\0\end{pmatrix}.
$$

したがって

$$
\begin{pmatrix}1\\1\end{pmatrix}
\in\operatorname{Null}(A).
$$

実際には

$$
\operatorname{Null}(A)
=
\operatorname{span}\left\{
\begin{pmatrix}1\\1\end{pmatrix}
\right\}.
$$

この式は、「$A\boldsymbol x=0$ となるベクトルは $(1,1)^T$ の定数倍しかない」という意味である。

---

## 3. 特異行列とは

正方行列 $A$ が **特異**であるとは、逆行列 $A^{-1}$ が存在しないことをいう。

正方行列について、次は同値である。

$$
\boxed{
\begin{aligned}
&A\text{ が特異}\\
\Longleftrightarrow{}&\det A=0\\
\Longleftrightarrow{}&\exists\,\boldsymbol x\neq\boldsymbol0
\text{ such that }A\boldsymbol x=\boldsymbol0\\
\Longleftrightarrow{}&\operatorname{Null}(A)\neq\{\boldsymbol0\}.
\end{aligned}
}
$$

最後の形が統計では特に重要である。

「特異」という言葉だけを見ると行列式の話に見えるが、実際には

> **ある非零の方向を、行列が完全に0へつぶしてしまう**

という意味だと理解するとよい。

---

## 4. 階数・退化次数の定理

<a id="thm-f0-00-linear-rank-nullity"></a>

<!-- formal-statement-start -->
> **定理（階数・退化次数の定理）**  
> $A\in\mathbb R^{m\times n}$ を線形写像 $A:\mathbb R^n\to\mathbb R^m$ とみなします。このとき

$$
\boxed{
\operatorname{rank}(A)+\dim\operatorname{Null}(A)=n
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

$A\in\mathbb R^{m\times n}$ に対して

$$
\boxed{
\operatorname{rank}(A)
+
\dim\operatorname{Null}(A)
=n
}
$$

が成り立つ。

これを **階数・退化次数の定理**（rank-nullity theorem）という。

たとえば $A$ が $k\times k$ 行列で

$$
\operatorname{Null}(A)
=\operatorname{span}\{\boldsymbol v\}
$$

なら、零空間は1次元なので

$$
\dim\operatorname{Null}(A)=1.
$$

従って

$$
\operatorname{rank}(A)=k-1.
$$

---

## 5. 分散共分散行列では「分散0の方向」を表す

確率ベクトル $X$ の分散共分散行列を $\Sigma$ とする。

任意のベクトル $a$ に対して

$$
\operatorname{Var}(a^TX)=a^T\Sigma a.
$$

したがって、ある $a\neq0$ について

$$
a^T\Sigma a=0
$$

なら、その線形結合 $a^TX$ はまったく変動しない。

特に $\Sigma$ が半正定値なら、

$$
\Sigma a=0
$$

となる方向 $a$ は、**確率変数が自由に変動できない方向**を表す。

このため、分散共分散行列が特異であることは単なる行列計算上の事故ではない。

> **成分の間に完全な線形制約があり、自由度が1つ以上失われている**

ことを意味する。

---

## 6. 多項分布での典型例

多項比率

$$
\widehat p=(\widehat p_1,\ldots,\widehat p_k)^T
$$

は必ず

$$
\widehat p_1+\cdots+\widehat p_k=1
$$

を満たす。

したがって

$$
\boldsymbol1^T(\widehat p-p)=0,
\qquad
\boldsymbol1=(1,\ldots,1)^T.
$$

分散共分散行列

$$
\Sigma=\operatorname{diag}(p)-pp^T
$$

についても

$$
\Sigma\boldsymbol1=0.
$$

よって

$$
\boldsymbol1\in\operatorname{Null}(\Sigma),
$$

したがって $\Sigma$ は特異である。

さらに全ての $p_i>0$ なら、分散が0になるのは全成分が同じ係数の線形結合だけなので

$$
\operatorname{Null}(\Sigma)
=\operatorname{span}\{\boldsymbol1\}.
$$

零空間は1次元だから

$$
\operatorname{rank}(\Sigma)=k-1.
$$

ここまで分かれば、

- なぜ多項分布の分散共分散行列が特異なのか
- なぜ1カテゴリ落とすと非退化になるのか
- なぜ自由に変動できる方向が $k-1$ 個なのか

が同じ1本の線形制約から説明できる。
