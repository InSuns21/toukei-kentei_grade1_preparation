# F0-02B 分離超平面定理・Farkasの補題・SVM

この補講では、[F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) で使った **Farkasの補題そのものがどこから来るのか** を、有限次元の分離超平面定理まで戻って導きます。

さらに、SVMに分離超平面定理が二重の意味で現れることを整理します。

$$
\boxed{
\text{射影}
\to
\text{分離超平面定理}
\to
\text{凸錐の分離}
\to
\text{Farkas}
\to
\text{polar cone}
\to
\text{KKT}
}
$$

SVM側では

$$
\boxed{
\text{正負クラスの凸包が交わらない}
\Longleftrightarrow
\text{線形分離可能}
}
$$

という形で分離超平面定理が直接現れます。

この内容は統計検定1級の必須暗記事項を増やすためのものではありません。SVM・双対問題・KKTを **凸幾何の一つの流れ** として理解するための発展補講です。

このページは有限次元 $\mathbb R^p$ の議論です。ここで使う「凸集合」「凸包」「凸錐」「閉集合」「コンパクト」「infimum」は次の道具箱で定義してから使います。無限次元へ一般化すると何が変わるかは [F0-02C 関数解析から見る制約想定・KKT・kernel SVM](../F0_02C_関数解析_制約想定_RKHS/index.md) で扱います。

---

## 0. この章で使う数学の道具箱

### 0.1 凸結合・凸集合・凸包

点 $\boldsymbol x_1,\dots,\boldsymbol x_n$ に対し

$$
\theta_i\ge0,
\qquad
\sum_{i=1}^n\theta_i=1
$$

を満たす係数で作る

$$
\sum_{i=1}^n\theta_i\boldsymbol x_i
$$

を **凸結合** といいます。

集合 $C$ が **凸集合** であるとは、任意の $\boldsymbol x,\boldsymbol y\in C$ と $0\le t\le1$ について

$$
(1-t)\boldsymbol x+t\boldsymbol y\in C
$$

となることです。つまり、集合内の2点を結ぶ線分がすべて集合内に残ります。

集合 $S$ のすべての凸結合を集めた最小の凸集合を **凸包** といい、

$$
\boxed{
\operatorname{conv}(S)
}
$$

と書きます。

### 0.2 錐・凸錐・有限生成凸錐

集合 $K$ が **錐** であるとは

$$
\boldsymbol x\in K,\ a\ge0
\Longrightarrow
a\boldsymbol x\in K
$$

となることです。

さらに $K$ が凸集合なら **凸錐** といいます。

有限個のベクトル $\boldsymbol a_1,\dots,\boldsymbol a_n$ から

$$
K
=
\left\{
\sum_{j=1}^n\lambda_j\boldsymbol a_j:
\lambda_j\ge0
\right\}
$$

と作られる凸錐を **有限生成凸錐** と呼びます。

### 0.3 閉集合

この章では、集合 $C$ が **閉集合** であることを

> $C$ 内の収束列 $\boldsymbol x_n\to\boldsymbol x$ の極限 $\boldsymbol x$ も必ず $C$ に入る

という性質で使います。

したがって、閉集合の中で点列の極限を取っても集合の外へ落ちません。

### 0.4 infimum と minimum

集合 $C$ 上の距離の集合

$$
D
=
\{\|\boldsymbol z-\boldsymbol x\|:\boldsymbol x\in C\}
$$

を考えます。

$D$ の **下限（infimum）**

$$
\inf D
$$

とは、すべての要素以下にある数の中で最大のものです。下限は必ずしも $D$ の要素とは限りません。

一方 **minimum** は実際に達成される最小値です。

この章ではまず

$$
\delta
=
\inf_{\boldsymbol x\in C}
\|\boldsymbol z-\boldsymbol x\|
$$

と置き、その後で「このinfimumを達成する点が存在する」ことを証明します。

### 0.5 コンパクト性とHeine--Borel

この章で必要なコンパクト性は、有限次元では次の形だけ使います。

> **Heine--Borelの定理**：$\mathbb R^p$ では、閉かつ有界な集合はコンパクトである。

ここでコンパクトとは、この章では「任意の点列から、その集合内の点へ収束する部分列を取り出せる」と考えて構いません。

したがって閉有界集合内の点列から

$$
\boldsymbol x_{n_k}\to\boldsymbol p
$$

となる部分列を取れます。

これは有限次元で重要な性質です。[F0-02C](../F0_02C_関数解析_制約想定_RKHS/index.md) で見るように、一般の無限次元ノルム空間では

$$
\text{閉有界}\not\Rightarrow\text{コンパクト}
$$

です。

### 0.6 射影

集合 $C$ と点 $\boldsymbol z$ に対し、距離

$$
\|\boldsymbol z-\boldsymbol x\|
$$

を最小にする点 $\boldsymbol p\in C$ が存在するとき、その点を $\boldsymbol z$ の $C$ への **射影** と呼び

$$
P_C(\boldsymbol z)=\boldsymbol p
$$

と書きます。

この射影の存在・一意性は、次節で閉凸集合について証明します。したがってここではまだ「射影はいつでも存在する」と仮定していません。

---

## 1. 超平面で分離するとは何か

$\boldsymbol a\ne\boldsymbol0$ と $b\in\mathbb R$ に対し

$$
H
=
\{\boldsymbol x:\boldsymbol a^{\mathsf T}\boldsymbol x=b\}
$$

を超平面といいます。

集合 $C$ と点 $\boldsymbol z\notin C$ に対して

$$
\boldsymbol a^{\mathsf T}\boldsymbol x
\le b
<
\boldsymbol a^{\mathsf T}\boldsymbol z
\qquad
(\forall\boldsymbol x\in C)
$$

となれば、$H$ は $C$ と $\boldsymbol z$ を分離しています。

以下では、この $\boldsymbol a$ を **最近点への射影** から作ります。

---

## 2. 閉凸集合への最近点射影

$C\subset\mathbb R^p$ を空でない閉凸集合、$\boldsymbol z\in\mathbb R^p$ とします。

距離

$$
\delta
=
\inf_{\boldsymbol x\in C}
\|\boldsymbol z-\boldsymbol x\|
$$

を考えます。

### 2.1 最近点の存在

infimumの定義から、$C$ 内に点列 $\boldsymbol x_n$ を取り

$$
\|\boldsymbol z-\boldsymbol x_n\|
\to\delta
$$

とできます。

十分大きな $n$ では

$$
\|\boldsymbol z-\boldsymbol x_n\|
\le\delta+1
$$

なので、$\boldsymbol x_n$ は閉球

$$
\overline B(\boldsymbol z,\delta+1)
$$

内にあります。

この閉球は閉かつ有界なので、Heine--Borelの定理によりコンパクトです。したがって部分列を取り

$$
\boldsymbol x_{n_k}\to\boldsymbol p
$$

とできます。

$C$ は閉なので $\boldsymbol p\in C$ であり、距離の連続性から

$$
\|\boldsymbol z-\boldsymbol p\|
=
\delta.
$$

したがってinfimumは実際に達成され、最近点は存在します。

### 2.2 最近点の一意性

最近点が二つ $\boldsymbol p,\boldsymbol q\in C$ あると仮定します。

$$
\|\boldsymbol z-\boldsymbol p\|
=
\|\boldsymbol z-\boldsymbol q\|
=
\delta.
$$

$C$ は凸なので

$$
\boldsymbol m
=
\frac{\boldsymbol p+\boldsymbol q}{2}
$$

も $C$ に属します。

ノルム平方を内積で展開すると

$$
\left\|
\boldsymbol z-
\frac{\boldsymbol p+\boldsymbol q}{2}
\right\|^2
=
\frac12\|\boldsymbol z-\boldsymbol p\|^2
+
\frac12\|\boldsymbol z-\boldsymbol q\|^2
-
\frac14\|\boldsymbol p-\boldsymbol q\|^2.
$$

もし $\boldsymbol p\ne\boldsymbol q$ なら右辺は $\delta^2$ より小さくなり、最小距離の定義に反します。

したがって最近点は一意です。

$$
\boxed{
P_C(\boldsymbol z)=\boldsymbol p
}
$$

と書きます。

---

## 3. 射影点では外向き法線が得られる

$\boldsymbol p=P_C(\boldsymbol z)$ とし、任意の $\boldsymbol x\in C$ を取ります。

凸性より

$$
\boldsymbol p_t
=
\boldsymbol p+t(\boldsymbol x-\boldsymbol p)
\qquad(0\le t\le1)
$$

も $C$ に属します。

$\boldsymbol p$ が最近点なので

$$
\phi(t)
=
\|\boldsymbol z-\boldsymbol p_t\|^2
$$

は $t=0$ で右側最小です。

よって

$$
\phi'(0+)
\ge0.
$$

計算すると

$$
\phi'(0+)
=
-2(\boldsymbol z-\boldsymbol p)^{\mathsf T}
(\boldsymbol x-\boldsymbol p).
$$

したがって

$$
\boxed{
(\boldsymbol z-\boldsymbol p)^{\mathsf T}
(\boldsymbol x-\boldsymbol p)
\le0
\qquad
(\forall\boldsymbol x\in C)
}
$$

です。

つまり $\boldsymbol z-\boldsymbol p$ は $C$ の外向き法線になっています。

---

## 4. 分離超平面定理を射影から導く

### 定理：点と閉凸集合の厳密分離

$C\subset\mathbb R^p$ を空でない閉凸集合とし

$$
\boldsymbol z\notin C
$$

とします。

このとき、ある $\boldsymbol a\ne\boldsymbol0$ が存在して

$$
\boxed{
\boldsymbol a^{\mathsf T}\boldsymbol x
\le
\boldsymbol a^{\mathsf T}\boldsymbol p
<
\boldsymbol a^{\mathsf T}\boldsymbol z
\qquad
(\forall\boldsymbol x\in C)
}
$$

となります。ただし $\boldsymbol p=P_C(\boldsymbol z)$ です。

### 証明

$$
\boldsymbol a
=
\boldsymbol z-\boldsymbol p
$$

と置きます。

前節の射影条件から

$$
\boldsymbol a^{\mathsf T}
(\boldsymbol x-\boldsymbol p)
\le0
$$

なので

$$
\boldsymbol a^{\mathsf T}\boldsymbol x
\le
\boldsymbol a^{\mathsf T}\boldsymbol p.
$$

一方

$$
\begin{aligned}
\boldsymbol a^{\mathsf T}\boldsymbol z
&=
\boldsymbol a^{\mathsf T}\boldsymbol p
+
\boldsymbol a^{\mathsf T}(\boldsymbol z-\boldsymbol p)\\
&=
\boldsymbol a^{\mathsf T}\boldsymbol p
+
\|\boldsymbol z-\boldsymbol p\|^2.
\end{aligned}
$$

$\boldsymbol z\notin C$ だから $\boldsymbol z\ne\boldsymbol p$ であり

$$
\|\boldsymbol z-\boldsymbol p\|^2>0.
$$

よって

$$
\boldsymbol a^{\mathsf T}\boldsymbol p
<
\boldsymbol a^{\mathsf T}\boldsymbol z.
$$

したがって点と閉凸集合を超平面で厳密に分離できます。

$$
\boxed{
\text{最近点への射影}
\to
\text{法線}
\to
\text{分離超平面}
}
$$

という構造です。

---

## 5. 閉凸錐の分離

$K$ を閉凸錐とし

$$
\boldsymbol v\notin K
$$

とします。

$\boldsymbol p=P_K(\boldsymbol v)$、

$$
\boldsymbol d
=
\boldsymbol v-\boldsymbol p
$$

と置きます。

射影条件より

$$
\boldsymbol d^{\mathsf T}
(\boldsymbol k-\boldsymbol p)
\le0
\qquad
(\forall\boldsymbol k\in K).
$$

錐なので

$$
\boldsymbol0\in K,
\qquad
2\boldsymbol p\in K.
$$

それぞれ代入すると

$$
\boldsymbol d^{\mathsf T}\boldsymbol p
\ge0,
\qquad
\boldsymbol d^{\mathsf T}\boldsymbol p
\le0.
$$

したがって

$$
\boldsymbol d^{\mathsf T}\boldsymbol p=0.
$$

よって任意の $\boldsymbol k\in K$ に対して

$$
\boxed{
\boldsymbol d^{\mathsf T}\boldsymbol k\le0
}
$$

であり、一方

$$
\begin{aligned}
\boldsymbol d^{\mathsf T}\boldsymbol v
&=
\boldsymbol d^{\mathsf T}(\boldsymbol p+\boldsymbol d)\\
&=
\|\boldsymbol d\|^2
>0.
\end{aligned}
$$

したがって

$$
\boxed{
\boldsymbol d^{\mathsf T}\boldsymbol k\le0
\quad(\forall\boldsymbol k\in K),
\qquad
\boldsymbol d^{\mathsf T}\boldsymbol v>0
}
$$

という分離方向が存在します。

---

## 6. 有限生成凸錐は閉である

Farkasでは

$$
K
=
\left\{
\sum_{j=1}^n\lambda_j\boldsymbol a_j:
\lambda_j\ge0
\right\}
$$

という有限生成凸錐を使います。

この $K$ は閉です。

### 6.1 まず使う生成ベクトルを一次独立に減らせる

ある点が

$$
\boldsymbol k
=
\sum_j\lambda_j\boldsymbol a_j,
\qquad
\lambda_j>0
$$

と表され、使用中の生成ベクトルが一次従属だとします。

すると

$$
\sum_jc_j\boldsymbol a_j=\boldsymbol0
$$

となる $\boldsymbol c\ne\boldsymbol0$ があります。

必要なら符号を反転し、$c_j>0$ の成分があるようにします。

$$
t
=
\min_{c_j>0}
\frac{\lambda_j}{c_j}
$$

と置けば

$$
\lambda_j-tc_j\ge0
$$

で、少なくとも一つの係数が0になり、しかも

$$
\sum_j(\lambda_j-tc_j)\boldsymbol a_j
=
\boldsymbol k.
$$

これを繰り返すと、$\mathbb R^m$ では高々 $m$ 本の一次独立な生成ベクトルだけで表せます。

### 6.2 閉性：「座標が連続」を式で確認する

$\boldsymbol k_n\in K$ かつ

$$
\boldsymbol k_n\to\boldsymbol k
$$

とします。

各 $\boldsymbol k_n$ は一次独立な高々 $m$ 本の生成ベクトルで表せます。生成ベクトルの部分集合は有限個なので、部分列を取れば同じ一次独立集合

$$
\boldsymbol a_{j_1},\dots,\boldsymbol a_{j_s}
$$

だけを使えます。

列ベクトルを並べた行列を

$$
M
=
\begin{pmatrix}
\boldsymbol a_{j_1}&\cdots&\boldsymbol a_{j_s}
\end{pmatrix}
$$

とすると

$$
\boldsymbol k_n=M\boldsymbol\lambda_n,
\qquad
\boldsymbol\lambda_n\ge\boldsymbol0.
$$

列が一次独立なので

$$
M^{\mathsf T}M
$$

は正則です。両辺へ $M^{\mathsf T}$ を掛けると

$$
\boxed{
\boldsymbol\lambda_n
=
(M^{\mathsf T}M)^{-1}M^{\mathsf T}\boldsymbol k_n
}
$$

です。

右辺は $\boldsymbol k_n$ の固定行列による線形変換なので、$\boldsymbol k_n\to\boldsymbol k$ から

$$
\boldsymbol\lambda_n
\to
\boldsymbol\lambda
=
(M^{\mathsf T}M)^{-1}M^{\mathsf T}\boldsymbol k.
$$

各 $\boldsymbol\lambda_n\ge\boldsymbol0$ なので、成分ごとに極限を取って

$$
\boldsymbol\lambda\ge\boldsymbol0.
$$

さらに極限を取れば

$$
\boldsymbol k=M\boldsymbol\lambda\in K.
$$

よって $K$ は閉です。

---

## 7. Farkasの補題を分離超平面定理から導く

$A\in\mathbb R^{m\times n}$、$\boldsymbol b\in\mathbb R^m$ とします。

### Farkasの補題

次の二つのうち **ちょうど一方** が成立します。

**(A)**

$$
\boxed{
A\boldsymbol x=\boldsymbol b,
\qquad
\boldsymbol x\ge\boldsymbol0
}
$$

を満たす $\boldsymbol x$ が存在する。

**(B)**

$$
\boxed{
A^{\mathsf T}\boldsymbol y\le\boldsymbol0,
\qquad
\boldsymbol b^{\mathsf T}\boldsymbol y>0
}
$$

を満たす $\boldsymbol y$ が存在する。

### 7.1 両方同時には成立しない

もし両方成立すれば

$$
\boldsymbol b^{\mathsf T}\boldsymbol y
=
\boldsymbol x^{\mathsf T}A^{\mathsf T}\boldsymbol y.
$$

$\boldsymbol x\ge0$、$A^{\mathsf T}\boldsymbol y\le0$ だから

$$
\boldsymbol b^{\mathsf T}\boldsymbol y\le0,
$$

となり (B) に反します。

### 7.2 どちらか一方は必ず成立する

$A$ の列を $\boldsymbol a_1,\dots,\boldsymbol a_n$ とし

$$
K
=
\{A\boldsymbol x:\boldsymbol x\ge\boldsymbol0\}
$$

と置きます。

§0で定義した有限生成凸錐であり、§6で閉であることも示しました。

もし $\boldsymbol b\in K$ なら、定義から (A) が成立します。

もし $\boldsymbol b\notin K$ なら、前節の凸錐分離により、ある $\boldsymbol y$ が存在して

$$
\boldsymbol y^{\mathsf T}\boldsymbol k\le0
\quad(\forall\boldsymbol k\in K),
\qquad
\boldsymbol y^{\mathsf T}\boldsymbol b>0.
$$

各列 $\boldsymbol a_j\in K$ なので

$$
\boldsymbol y^{\mathsf T}\boldsymbol a_j\le0.
$$

したがって

$$
A^{\mathsf T}\boldsymbol y\le\boldsymbol0.
$$

よって (B) が成立します。

これで

$$
\boxed{
\text{分離超平面定理}
\Rightarrow
\text{Farkasの補題}
}
$$

が示されました。

Farkasの補題は、**有限生成凸錐に対する分離超平面定理の代数版** と見ることができます。

---

## 8. KKTで使うFarkas型 alternative

[F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) では

$$
L
=
\{\boldsymbol d:A\boldsymbol d\le\boldsymbol0,
\ B\boldsymbol d=\boldsymbol0\}
$$

に対し

$$
L^\circ
=
\left\{
A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu:
\boldsymbol\lambda\ge\boldsymbol0
\right\}
$$

を使いました。

ここで

$$
K
=
\left\{
A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu:
\boldsymbol\lambda\ge\boldsymbol0
\right\}
$$

と置きます。

$\boldsymbol\nu$ は符号自由なので

$$
\nu_j
=
\nu_j^+-\nu_j^-.
$$

したがって $K$ は

$$
A^{\mathsf T}\boldsymbol e_i,
\qquad
B^{\mathsf T}\boldsymbol e_j,
\qquad
-B^{\mathsf T}\boldsymbol e_j
$$

という有限個のベクトルで生成される閉凸錐です。

もし $\boldsymbol v\notin K$ なら、凸錐分離により $\boldsymbol d$ が存在して

$$
\boldsymbol d^{\mathsf T}\boldsymbol k\le0
\quad(\forall\boldsymbol k\in K),
\qquad
\boldsymbol d^{\mathsf T}\boldsymbol v>0.
$$

$A^{\mathsf T}\boldsymbol e_i\in K$ から

$$
A\boldsymbol d\le\boldsymbol0.
$$

また $\pm B^{\mathsf T}\boldsymbol e_j\in K$ だから

$$
B\boldsymbol d=\boldsymbol0.
$$

したがって

$$
\boxed{
\begin{array}{l}
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\quad\boldsymbol\lambda\ge\boldsymbol0
\\[1mm]
\text{または}
\\[1mm]
A\boldsymbol d\le\boldsymbol0,
\quad B\boldsymbol d=\boldsymbol0,
\quad\boldsymbol v^{\mathsf T}\boldsymbol d>0
\end{array}
}
$$

のどちらか一方が成立します。

これがF0-02Aで使ったFarkas型 alternative です。

---

## 9. polar cone の公式

$$
L
=
\{\boldsymbol d:A\boldsymbol d\le\boldsymbol0,
B\boldsymbol d=\boldsymbol0\}
$$

とします。

まず

$$
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\qquad
\boldsymbol\lambda\ge\boldsymbol0
$$

なら、任意の $\boldsymbol d\in L$ に対し

$$
\begin{aligned}
\boldsymbol v^{\mathsf T}\boldsymbol d
&=
\boldsymbol\lambda^{\mathsf T}A\boldsymbol d
+
\boldsymbol\nu^{\mathsf T}B\boldsymbol d\\
&\le0.
\end{aligned}
$$

よって $\boldsymbol v\in L^\circ$ です。

逆に $\boldsymbol v\in L^\circ$ なら

$$
A\boldsymbol d\le0,
\quad B\boldsymbol d=0,
\quad\boldsymbol v^{\mathsf T}\boldsymbol d>0
$$

となる $\boldsymbol d$ は存在できません。

したがってFarkas型 alternative より

$$
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\qquad
\boldsymbol\lambda\ge\boldsymbol0.
$$

ゆえに

$$
\boxed{
L^\circ
=
\left\{
A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu:
\boldsymbol\lambda\ge\boldsymbol0
\right\}
}
$$

です。

ここまでで

$$
\boxed{
\text{分離超平面定理}
\to
\text{Farkas}
\to
\text{polar coneの表現}
}
$$

がつながりました。

---

## 10. KKT条件への接続

局所最適点 $\boldsymbol x^*$ では

$$
-\nabla f(\boldsymbol x^*)
\in
T_C(\boldsymbol x^*)^\circ.
$$

適切な制約想定の下で

$$
T_C(\boldsymbol x^*)
=
L_C(\boldsymbol x^*)
$$

なら

$$
-\nabla f(\boldsymbol x^*)
\in
L_C(\boldsymbol x^*)^\circ.
$$

前節の公式から

$$
-\nabla f(\boldsymbol x^*)
=
\sum_{i\in I(\boldsymbol x^*)}
\lambda_i\nabla g_i(\boldsymbol x^*)
+
\sum_j\nu_j\nabla h_j(\boldsymbol x^*),
\qquad
\lambda_i\ge0.
$$

したがって

$$
\boxed{
\nabla f(\boldsymbol x^*)
+
\sum_i\lambda_i\nabla g_i(\boldsymbol x^*)
+
\sum_j\nu_j\nabla h_j(\boldsymbol x^*)
=\boldsymbol0
}
$$

というKKT停留条件が出ます。

つまり理論の依存関係は

$$
\boxed{
\text{射影}
\to
\text{分離超平面定理}
\to
\text{Farkas}
\to
\text{polar cone}
\to
\text{KKT}
}
$$

です。

制約想定がなぜ必要で、無限次元ではどう一般化されるかは [F0-02C](../F0_02C_関数解析_制約想定_RKHS/index.md) で扱います。

---

## 11. SVMの表側：線形分離と凸包

正例と負例の訓練点を

$$
X_+
=
\{\boldsymbol x_i:y_i=+1\},
\qquad
X_-
=
\{\boldsymbol x_i:y_i=-1\}
$$

とします。

それぞれの凸包を

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

ここで凸包は§0.1で定義した「全ての凸結合の集合」です。

有限点集合 $\{\boldsymbol x_1,\dots,\boldsymbol x_n\}$ の凸包がコンパクトであることも確認しておきます。係数集合

$$
\Delta
=
\left\{
\boldsymbol\theta:\theta_i\ge0,
\ \sum_i\theta_i=1
\right\}
$$

は閉かつ有界なのでHeine--Borelによりコンパクトです。写像

$$
\boldsymbol\theta
\mapsto
\sum_i\theta_i\boldsymbol x_i
$$

は連続なので、その像である凸包もコンパクトです。

### 定理

$$
\boxed{
X_+,X_-\text{ が厳密に線形分離可能}
\Longleftrightarrow
C_+\cap C_-=\varnothing
}
$$

です。

### 11.1 線形分離可能なら凸包も交わらない

ある $\boldsymbol w,b$ が存在して

$$
\boldsymbol w^{\mathsf T}\boldsymbol x_i+b>0
\qquad(y_i=+1),
$$

$$
\boldsymbol w^{\mathsf T}\boldsymbol x_i+b<0
\qquad(y_i=-1)
$$

とします。

正例の任意の凸結合

$$
\boldsymbol p
=
\sum_{i:y_i=+1}
\theta_i\boldsymbol x_i,
\qquad
\theta_i\ge0,
\quad
\sum_i\theta_i=1
$$

について

$$
\boldsymbol w^{\mathsf T}\boldsymbol p+b
=
\sum_i\theta_i
(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
>0.
$$

負例の凸包では同様に値が負です。

したがって二つの凸包は交わりません。

### 11.2 凸包が交わらないなら分離可能

逆に

$$
C_+\cap C_-=\varnothing
$$

とします。

$C_+\times C_-$ はコンパクトで、距離関数

$$
(\boldsymbol p,\boldsymbol q)
\mapsto
\|\boldsymbol p-\boldsymbol q\|
$$

は連続なので

$$
\delta
=
\min_{\boldsymbol p\in C_+,\boldsymbol q\in C_-}
\|\boldsymbol p-\boldsymbol q\|
$$

を達成する最近点対

$$
\boldsymbol p^*\in C_+,
\qquad
\boldsymbol q^*\in C_-
$$

が存在します。

二集合は交わらないので

$$
\delta>0.
$$

次節で、この最近点対の中間超平面が二集合を分離することを示します。

---

## 12. 最大マージンは二つの凸包の最短距離

$$
\boldsymbol r
=
\boldsymbol p^*-\boldsymbol q^*,
\qquad
\delta=\|\boldsymbol r\|>0
$$

とします。

$\boldsymbol q^*$ を固定すると $\boldsymbol p^*$ は $C_+$ 上で $\boldsymbol q^*$ に最も近い点なので、射影条件から任意の $\boldsymbol p\in C_+$ について

$$
(\boldsymbol q^*-\boldsymbol p^*)^{\mathsf T}
(\boldsymbol p-\boldsymbol p^*)
\le0.
$$

したがって

$$
\boxed{
\boldsymbol r^{\mathsf T}\boldsymbol p
\ge
\boldsymbol r^{\mathsf T}\boldsymbol p^*
}
$$

です。

同様に任意の $\boldsymbol q\in C_-$ について

$$
\boxed{
\boldsymbol r^{\mathsf T}\boldsymbol q
\le
\boldsymbol r^{\mathsf T}\boldsymbol q^*
}
$$

です。

しかも

$$
\boldsymbol r^{\mathsf T}\boldsymbol p^*
-
\boldsymbol r^{\mathsf T}\boldsymbol q^*
=
\|\boldsymbol r\|^2
=
\delta^2
>0.
$$

よって

$$
\boldsymbol r^{\mathsf T}\boldsymbol x
=
\frac{
\boldsymbol r^{\mathsf T}\boldsymbol p^*
+
\boldsymbol r^{\mathsf T}\boldsymbol q^*
}{2}
$$

という中間超平面が $C_+$ と $C_-$ を厳密に分離します。

単位法線

$$
\boldsymbol u
=
\frac{\boldsymbol r}{\delta}
$$

を使えば、二つの支持超平面間の距離は

$$
\boldsymbol u^{\mathsf T}
(\boldsymbol p^*-\boldsymbol q^*)
=
\delta.
$$

中央の分類境界から各支持超平面までの距離は

$$
\frac\delta2.
$$

一方、ハードマージンSVMでは支持超平面間の距離が

$$
\frac{2}{\|\boldsymbol w\|}
$$

なので、最適解では

$$
\boxed{
\frac{2}{\|\boldsymbol w^*\|}
=
\delta
}
$$

です。

したがってハードマージンSVMは

$$
\boxed{
\text{正例の凸包と負例の凸包の最近点対を見つけ、
その中間超平面を取る}
}
$$

問題とみなせます。

---

## 13. 双対変数 $\alpha_i$ は凸包上の点を作る

ハードマージンSVMの双対制約は

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0.
$$

正例側と負例側の係数和を

$$
\rho
=
\sum_{i:y_i=+1}\alpha_i
=
\sum_{i:y_i=-1}\alpha_i
$$

と置きます。

$\rho>0$ のとき

$$
\boldsymbol p
=
\sum_{i:y_i=+1}
\frac{\alpha_i}{\rho}\boldsymbol x_i,
$$

$$
\boldsymbol q
=
\sum_{i:y_i=-1}
\frac{\alpha_i}{\rho}\boldsymbol x_i
$$

とすれば

$$
\boldsymbol p\in C_+,
\qquad
\boldsymbol q\in C_-.
$$

さらに

$$
\begin{aligned}
\boldsymbol w
&=
\sum_i\alpha_i y_i\boldsymbol x_i\\
&=
\rho(\boldsymbol p-\boldsymbol q).
\end{aligned}
$$

つまりSVMの法線は、二つの凸包上の点を結ぶ方向です。

### 13.1 双対目的関数も凸包間距離になる

双対目的関数

$$
\sum_i\alpha_i
-
\frac12\|\boldsymbol w\|^2
$$

は

$$
2\rho
-
\frac12\rho^2
\|\boldsymbol p-\boldsymbol q\|^2
$$

と書けます。

$\boldsymbol p,\boldsymbol q$ を固定して $\rho$ について最大化すると

$$
\rho^*
=
\frac{2}{\|\boldsymbol p-\boldsymbol q\|^2}
$$

で、最大値は

$$
\frac{2}{\|\boldsymbol p-\boldsymbol q\|^2}.
$$

したがって双対問題全体を最大化するには

$$
\|\boldsymbol p-\boldsymbol q\|
$$

を最小にすればよいことになります。

つまり双対側からも **二つの凸包の最近点対** が現れます。

非零の $\alpha_i$ を持つ訓練点だけが、これらの凸結合と法線ベクトルに寄与します。これがサポートベクトルの幾何学的な意味の一つです。

---

## 14. SVMには二種類の分離超平面がある

### 表側：分類境界

$$
C_+\cap C_-=\varnothing
$$

なら、正負クラスを分離する超平面が存在します。

これはSVMが実際に求める分類境界です。

### 裏側：最適性理論

KKT条件の背後では

$$
\boldsymbol v\notin K
$$

なら $K$ と $\boldsymbol v$ を分離する方向が存在する、という凸錐分離からFarkasを導きます。

したがってSVMは

$$
\boxed{
\text{データを超平面で分離する問題であり、
その最適性理論も超平面分離に支えられる}
}
$$

という二重構造を持ちます。

---

## 15. soft margin と kernel も同じ地図で見られる

もし

$$
C_+\cap C_-\ne\varnothing
$$

なら、二つの凸包を厳密分離する超平面は存在せず、hard margin は不可能です。

そこで [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) で扱うスラック変数を導入し、違反を許す soft margin へ進みます。

$$
\boxed{
\text{凸包が離れている}
\to
\text{hard margin},
\qquad
\text{凸包が重なる}
\to
\text{soft margin}
}
$$

と見ることができます。

kernel SVMでは

$$
\boldsymbol x
\mapsto
\varphi(\boldsymbol x)
$$

と特徴空間へ移し、そこで正負クラスの凸包を分離します。

有限個の訓練標本については、全ての $\varphi(\boldsymbol x_i)$ は高々 $n$ 次元の線形部分空間を張るので、特徴空間自体が無限次元でも、訓練標本の分離幾何はこの有限次元部分空間内で理解できます。

カーネルトリックは、その空間で必要になる内積を

$$
K(\boldsymbol x_i,\boldsymbol x_j)
=
\langle
\varphi(\boldsymbol x_i),
\varphi(\boldsymbol x_j)
\rangle
$$

として直接計算する方法です。

ここで「無限次元の特徴空間」「Hilbert空間」「RKHS」を数学的にどう定義するかは [F0-02C](../F0_02C_関数解析_制約想定_RKHS/index.md) で順に導入します。

---

## 16. 全体像

最適化理論側は

$$
\boxed{
\text{閉凸集合への射影}
\to
\text{分離超平面定理}
\to
\text{Farkas}
\to
\text{polar cone}
\to
\text{KKT}
}
$$

です。

SVM側は

$$
\boxed{
\text{正負クラスの凸包}
\to
\text{非交差}
\to
\text{分離超平面}
\to
\text{最近点対}
\to
\text{最大マージン}
\to
\text{双対変数とサポートベクトル}
}
$$

です。

この二つは別の理論ではなく、どちらも **凸集合と超平面の幾何** に根を持っています。

KKTそのものの導出へ戻る場合は [F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)、関数解析・制約想定・RKHSまで進む場合は [F0-02C](../F0_02C_関数解析_制約想定_RKHS/index.md)、SVMの主問題・双対問題・soft margin・kernelへ戻る場合は [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) を参照してください。
