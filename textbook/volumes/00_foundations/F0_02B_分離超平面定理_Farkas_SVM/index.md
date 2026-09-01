# F0-02B 分離超平面定理・Farkasの補題・SVM

この補講では、[F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) で使った **Farkasの補題そのものがどこから来るのか** を、有限次元の分離超平面定理まで戻って導きます。

さらに、分離超平面定理がSVMに二重の意味で現れることを整理します。

$$
\boxed{
\begin{array}{c}
\text{Euclid空間の射影}\
\Downarrow\\
\text{分離超平面定理}\
\Downarrow\\
\text{凸錐の分離}\
\Downarrow\\
\text{Farkasの補題}\
\Downarrow\\
\text{polar coneの表現}\
\Downarrow\\
\text{KKT条件}
\end{array}
}
$$

一方、SVMの表側では

$$
\boxed{
\text{2クラスの凸包が交わらない}
\Longleftrightarrow
\text{線形分離できる}
}
$$

という形で、分離超平面定理が直接現れます。

この内容は統計検定1級で定理の証明まで暗記するためのものではありません。SVM・双対問題・KKT条件を「別々の公式」としてではなく、**凸幾何の一つの流れ**として理解するための発展補講です。

---

## 1. まず「超平面で分離する」とは何か

$\boldsymbol a\ne\boldsymbol0$ と $b\in\mathbb R$ に対し

$$
H
=
\{\boldsymbol x:\boldsymbol a^{\mathsf T}\boldsymbol x=b\}
$$

を超平面といいます。

この超平面は空間を

$$
\boldsymbol a^{\mathsf T}\boldsymbol x<b,
\qquad
\boldsymbol a^{\mathsf T}\boldsymbol x>b
$$

という二つの側へ分けます。

したがって、集合 $C$ と点 $\boldsymbol z\notin C$ を分けたいなら、例えば

$$
\boldsymbol a^{\mathsf T}\boldsymbol x
\le b
<
\boldsymbol a^{\mathsf T}\boldsymbol z
\qquad
(\forall\boldsymbol x\in C)
$$

となる $\boldsymbol a,b$ を見つければよいわけです。

問題は、**そのような超平面がいつ存在するのか**です。

---

## 2. 凸集合が重要な理由

集合 $C\subset\mathbb R^p$ が凸であるとは、任意の $\boldsymbol x,\boldsymbol y\in C$ と $0\le t\le1$ に対して

$$
(1-t)\boldsymbol x+t\boldsymbol y\in C
$$

となることです。

つまり、集合内の2点を結ぶ線分がすべて集合内にあります。

分離超平面定理は凸性と非常に相性がよい定理です。非凸集合では、外側の一点を一枚の超平面で綺麗に分離できないことがあります。

SVMで後ほど使う各クラスの **凸包** は必ず凸なので、この定理をそのまま使えます。

---

## 3. 射影定理：閉凸集合には最近点が一意に存在する

分離超平面定理を有限次元で示す最も見通しのよい方法の一つは、まず最近点への射影を作ることです。

$C\subset\mathbb R^p$ を空でない閉凸集合、$\boldsymbol z\in\mathbb R^p$ を任意の点とします。

距離

$$
\delta
=
\inf_{\boldsymbol x\in C}
\|\boldsymbol z-\boldsymbol x\|
$$

を考えます。

### 3.1 最近点の存在

$\delta$ の定義から、$C$ 内に点列 $\boldsymbol x_n$ を取って

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

の中にあります。

有限次元Euclid空間では閉かつ有界な集合はコンパクトです。したがって部分列を取り

$$
\boldsymbol x_{n_k}\to\boldsymbol p
$$

とできます。

$C$ は閉なので

$$
\boldsymbol p\in C.
$$

距離の連続性から

$$
\|\boldsymbol z-\boldsymbol p\|
=
\delta.
$$

したがって最近点 $\boldsymbol p$ は存在します。

### 3.2 最近点の一意性

最近点が二つ $\boldsymbol p,\boldsymbol q\in C$ 存在したと仮定します。

$$
\|\boldsymbol z-\boldsymbol p\|
=
\|\boldsymbol z-\boldsymbol q\|
=
\delta.
$$

$C$ は凸なので中点

$$
\boldsymbol m
=
\frac{\boldsymbol p+\boldsymbol q}{2}
$$

も $C$ に属します。

中点に対する平方距離は

$$
\left\|
\boldsymbol z-rac{\boldsymbol p+\boldsymbol q}{2}
\right\|^2
=
\frac12\|\boldsymbol z-\boldsymbol p\|^2
+
\frac12\|\boldsymbol z-\boldsymbol q\|^2
-
\frac14\|\boldsymbol p-\boldsymbol q\|^2.
$$

したがって $\boldsymbol p\ne\boldsymbol q$ なら

$$
\|\boldsymbol z-\boldsymbol m\|^2
<
\delta^2
$$

となり、$\delta$ が最小距離であることに反します。

よって

$$
\boxed{
\boldsymbol p=\boldsymbol q
}
$$

で、最近点は一意です。

この最近点を $P_C(\boldsymbol z)$ と書くことがあります。

---

## 4. 射影点で成り立つ法線条件

$\boldsymbol p=P_C(\boldsymbol z)$ とします。

任意の $\boldsymbol x\in C$ に対して、凸性より

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

は $t=0$ で右側最小になります。

よって

$$
\phi'(0+)
\ge0.
$$

微分すると

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

これは非常に重要な式です。

$\boldsymbol z-\boldsymbol p$ は、最近点 $\boldsymbol p$ において集合 $C$ の外向き法線になっています。

---

## 5. 分離超平面定理を射影から導く

### 定理：点と閉凸集合の厳密分離

$C\subset\mathbb R^p$ を空でない閉凸集合とし、

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

先ほどの射影条件から

$$
(\boldsymbol z-\boldsymbol p)^{\mathsf T}
(\boldsymbol x-\boldsymbol p)
\le0.
$$

ここで

$$
\boldsymbol a
=
\boldsymbol z-\boldsymbol p
$$

と置きます。

すると

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

$\boldsymbol z\notin C$ なので $\boldsymbol z\ne\boldsymbol p$ であり

$$
\|\boldsymbol z-\boldsymbol p\|^2>0.
$$

よって

$$
\boldsymbol a^{\mathsf T}\boldsymbol p
<
\boldsymbol a^{\mathsf T}\boldsymbol z.
$$

以上より

$$
\boxed{
\sup_{\boldsymbol x\in C}
\boldsymbol a^{\mathsf T}\boldsymbol x
<
\boldsymbol a^{\mathsf T}\boldsymbol z
}
$$

となり、点と閉凸集合を超平面で厳密に分離できました。

### 5.1 何が本質だったか

証明の核心は、最近点 $\boldsymbol p$ で

$$
\boldsymbol z-\boldsymbol p
$$

が集合 $C$ の法線になることです。

したがって、分離超平面は突然現れたのではなく、

$$
\boxed{
\text{最近点への射影}
\to
\text{法線}
\to
\text{分離超平面}
}
$$

という流れで作られています。

---

## 6. 凸錐なら分離がさらに単純になる

$K$ を閉凸錐とします。つまり

$$
\boldsymbol k\in K,\ t\ge0
\Longrightarrow
t\boldsymbol k\in K
$$

です。

$\boldsymbol v\notin K$ とします。

$\boldsymbol p=P_K(\boldsymbol v)$ と置き、

$$
\boldsymbol d
=
\boldsymbol v-\boldsymbol p
$$

とします。

射影条件より

$$
\boldsymbol d^{\mathsf T}
(\boldsymbol k-\boldsymbol p)
\le0
\qquad(\forall\boldsymbol k\in K).
$$

ここで錐なので

$$
\boldsymbol0\in K,
\qquad
2\boldsymbol p\in K.
$$

$\boldsymbol k=\boldsymbol0$ と $2\boldsymbol p$ を代入すると

$$
-\boldsymbol d^{\mathsf T}\boldsymbol p\le0,
\qquad
\boldsymbol d^{\mathsf T}\boldsymbol p\le0.
$$

したがって

$$
\boxed{
\boldsymbol d^{\mathsf T}\boldsymbol p=0
}
$$

です。

よって任意の $\boldsymbol k\in K$ について

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

となります。

これが **凸錐に対する分離** です。

Farkasの補題は、まさにこの形を線形代数の言葉へ翻訳したものです。

---

## 7. 準備：有限個のベクトルが作る錐は閉じている

Farkasで現れる

$$
K
=
\left\{
\sum_{j=1}^n\lambda_j\boldsymbol a_j:
\lambda_j\ge0
\right\}
$$

は有限生成凸錐です。

この集合は閉です。理由も簡単に確認しておきます。

### 7.1 conic Caratheodory の簡単な形

$\mathbb R^m$ では、有限生成錐の任意の点は、**一次独立な高々 $m$ 本の生成ベクトル**の非負結合で表せます。

実際、

$$
\boldsymbol k
=
\sum_j\lambda_j\boldsymbol a_j,
\qquad
\lambda_j>0
$$

という表現で使っている $\boldsymbol a_j$ が一次従属なら、ある $\boldsymbol c\ne\boldsymbol0$ により

$$
\sum_j c_j\boldsymbol a_j=\boldsymbol0
$$

となります。

必要なら $\boldsymbol c$ の符号を反転し、$c_j>0$ の成分があるようにします。

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

で、少なくとも一つの係数が0になります。しかも

$$
\sum_j(\lambda_j-tc_j)\boldsymbol a_j
=
\boldsymbol k.
$$

これを繰り返せば一次独立な生成ベクトルだけが残ります。

### 7.2 閉性

$K$ 内の収束列

$$
\boldsymbol k_n\to\boldsymbol k
$$

を取ります。

各 $\boldsymbol k_n$ は高々 $m$ 本の一次独立な生成ベクトルで表せます。生成ベクトルの部分集合は有限個しかないので、部分列を取れば同じ一次独立集合

$$
\boldsymbol a_{j_1},\dots,\boldsymbol a_{j_s}
$$

だけを使って

$$
\boldsymbol k_n
=
\sum_{\ell=1}^s
\lambda_{n\ell}\boldsymbol a_{j_\ell},
\qquad
\lambda_{n\ell}\ge0
$$

とできます。

これらのベクトルは一次独立なので、係数は $\boldsymbol k_n$ に対する連続な線形座標です。したがって

$$
\lambda_{n\ell}\to\lambda_\ell\ge0
$$

となり

$$
\boldsymbol k
=
\sum_{\ell=1}^s
\lambda_\ell\boldsymbol a_{j_\ell}
\in K.
$$

よって $K$ は閉です。

---

## 8. Farkasの補題を分離超平面定理から導く

まず古典的な形を示します。

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

符号をすべて反転した同値な形もよく使われます。

### 8.1 なぜ同時には成立しないか

(A) と (B) が両方成立すると仮定します。

すると

$$
\boldsymbol b^{\mathsf T}\boldsymbol y
=
\boldsymbol x^{\mathsf T}A^{\mathsf T}\boldsymbol y.
$$

$\boldsymbol x\ge0$、$A^{\mathsf T}\boldsymbol y\le0$ なので

$$
\boldsymbol b^{\mathsf T}\boldsymbol y\le0,
$$

これは (B) の

$$
\boldsymbol b^{\mathsf T}\boldsymbol y>0
$$

に反します。

### 8.2 どちらか一方が必ず成立することを分離から示す

$A$ の列ベクトルを

$$
\boldsymbol a_1,\dots,\boldsymbol a_n
$$

とします。

非負結合で作られる錐

$$
K
=
\{A\boldsymbol x:\boldsymbol x\ge\boldsymbol0\}
=
\left\{
\sum_jx_j\boldsymbol a_j:x_j\ge0
\right\}
$$

を考えます。

先ほど示したように $K$ は閉凸錐です。

もし

$$
\boldsymbol b\in K
$$

なら、定義そのものから (A) が成立します。

一方

$$
\boldsymbol b\notin K
$$

なら、凸錐の分離より、ある $\boldsymbol y$ が存在して

$$
\boldsymbol y^{\mathsf T}\boldsymbol k\le0
\quad(\forall\boldsymbol k\in K),
\qquad
\boldsymbol y^{\mathsf T}\boldsymbol b>0.
$$

特に各列 $\boldsymbol a_j\in K$ なので

$$
\boldsymbol y^{\mathsf T}\boldsymbol a_j\le0.
$$

これは

$$
A^{\mathsf T}\boldsymbol y\le\boldsymbol0
$$

と同じです。

したがって (B) が成立します。

以上でFarkasの補題が分離超平面定理から導かれました。

つまり

$$
\boxed{
\text{Farkasの補題}
=
\text{有限生成凸錐に対する分離超平面定理の代数版}
}
$$

と見ることができます。

---

## 9. KKTで使うFarkas型 alternative を導く

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

という表現を使いました。

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

$K$ は有限生成錐と線形部分空間の和として得られる polyhedral cone であり、閉凸錐です。

ある $\boldsymbol v$ について、もし

$$
\boldsymbol v\notin K
$$

なら、凸錐の分離から $\boldsymbol d$ が存在して

$$
\boldsymbol d^{\mathsf T}\boldsymbol k\le0
\quad(\forall\boldsymbol k\in K),
\qquad
\boldsymbol d^{\mathsf T}\boldsymbol v>0.
$$

$\boldsymbol\lambda=\boldsymbol e_i$、$\boldsymbol\nu=\boldsymbol0$ を選べば

$$
A^{\mathsf T}\boldsymbol e_i\in K
$$

なので

$$
(A\boldsymbol d)_i\le0.
$$

よって

$$
A\boldsymbol d\le\boldsymbol0.
$$

また $\boldsymbol\nu$ は符号自由なので

$$
B^{\mathsf T}\boldsymbol e_j\in K,
\qquad
-B^{\mathsf T}\boldsymbol e_j\in K.
$$

したがって

$$
(B\boldsymbol d)_j\le0,
\qquad
-(B\boldsymbol d)_j\le0
$$

より

$$
B\boldsymbol d=\boldsymbol0.
$$

よって次のalternativeが得られます。

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
\quad\boldsymbol v^{\mathsf T}\boldsymbol d>0.
\end{array}
}
$$

これがF0-02Aで使ったFarkas型 alternative の出所です。

---

## 10. polar cone の公式も分離定理の帰結

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

なら、任意の $\boldsymbol d\in L$ に対して

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

したがって $\boldsymbol v\in L^\circ$ です。

逆に $\boldsymbol v\in L^\circ$ なら

$$
A\boldsymbol d\le0,
\quad B\boldsymbol d=0
$$

を満たす $\boldsymbol d$ について

$$
\boldsymbol v^{\mathsf T}\boldsymbol d>0
$$

となることはありません。

したがって前節のalternativeより

$$
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\qquad
\boldsymbol\lambda\ge0.
$$

よって

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

つまりF0-02Aで突然使ったように見えるpolar coneの公式は

$$
\boxed{
\text{分離超平面定理}
\to
\text{Farkas}
\to
\text{polar coneの表現}
}
$$

という流れの結果です。

---

## 11. ここからKKT条件へどうつながるか

F0-02Aで示した通り、局所最適点 $\boldsymbol x^*$ では

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

と置き換えられれば

$$
-\nabla f(\boldsymbol x^*)
\in
L_C(\boldsymbol x^*)^\circ.
$$

前節のpolar cone表現を使って

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

移項すれば

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

です。

したがって理論の依存関係は

$$
\boxed{
\text{射影定理}
\to
\text{分離超平面定理}
\to
\text{Farkas}
\to
\text{polar cone}
\to
\text{KKT停留条件}
}
$$

となります。

---

## 12. SVMの表側：線形分離と凸包

ここからは、分離超平面定理がSVMそのものにどう現れるかを見ます。

正例の集合を

$$
X_+
=
\{\boldsymbol x_i:y_i=+1\},
$$

負例を

$$
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

有限個の点の凸包なので $C_+,C_-$ はコンパクトな凸集合です。

### 定理：有限データの線形分離と凸包

$$
\boxed{
X_+,X_-\text{ が厳密に線形分離可能}
\Longleftrightarrow
C_+\cap C_-=\varnothing
}
$$

です。

### 12.1 線形分離できるなら凸包も交わらない

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
\sum_{i:y_i=+1}\theta_i\boldsymbol x_i,
\qquad
\theta_i\ge0,
\quad\sum_i\theta_i=1
$$

について、線形性から

$$
\boldsymbol w^{\mathsf T}\boldsymbol p+b
=
\sum_i\theta_i
(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
>0.
$$

同様に $C_-$ の全点では値が負です。

したがって

$$
C_+\cap C_-=\varnothing.
$$

### 12.2 凸包が交わらないなら分離できる

逆に

$$
C_+\cap C_-=\varnothing
$$

とします。

$C_+,C_-$ はコンパクト凸集合なので、二集合の間の距離

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

が存在し、互いに素なので

$$
\delta>0.
$$

次節で示すように

$$
\boldsymbol p^*-\boldsymbol q^*
$$

に垂直な中間超平面が二つの凸集合を厳密に分離します。

したがって元の有限データも厳密に線形分離できます。

---

## 13. 最大マージンは「二つの凸包の最短距離」になる

最近点対 $\boldsymbol p^*,\boldsymbol q^*$ を取り

$$
\boldsymbol r
=
\boldsymbol p^*-\boldsymbol q^*,
\qquad
\delta=\|\boldsymbol r\|>0
$$

とします。

### 13.1 最近点対から支持超平面が出る

$\boldsymbol q^*$ を固定すると $\boldsymbol p^*$ は $C_+$ 上で $\boldsymbol q^*$ に最も近い点です。

射影条件から任意の $\boldsymbol p\in C_+$ に対して

$$
(\boldsymbol q^*-\boldsymbol p^*)^{\mathsf T}
(\boldsymbol p-\boldsymbol p^*)
\le0.
$$

符号を反転すると

$$
\boxed{
\boldsymbol r^{\mathsf T}\boldsymbol p
\ge
\boldsymbol r^{\mathsf T}\boldsymbol p^*
}
$$

です。

同様に $\boldsymbol p^*$ を固定して $C_-$ へ射影すると、任意の $\boldsymbol q\in C_-$ に対して

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

したがって

$$
\boldsymbol r^{\mathsf T}\boldsymbol x
=
\frac{
\boldsymbol r^{\mathsf T}\boldsymbol p^*
+
\boldsymbol r^{\mathsf T}\boldsymbol q^*
}{2}
$$

という超平面は $C_+$ と $C_-$ のちょうど中間にあり、両者を分離します。

### 13.2 幾何学的マージン

単位法線

$$
\boldsymbol u
=
\frac{\boldsymbol r}{\delta}
$$

を使えば、二つの支持超平面

$$
\boldsymbol u^{\mathsf T}\boldsymbol x
=
\boldsymbol u^{\mathsf T}\boldsymbol p^*,
$$

$$
\boldsymbol u^{\mathsf T}\boldsymbol x
=
\boldsymbol u^{\mathsf T}\boldsymbol q^*
$$

の距離は

$$
\boldsymbol u^{\mathsf T}(\boldsymbol p^*-\boldsymbol q^*)
=
\delta.
$$

中央の分類超平面から各支持超平面までの距離は

$$
\boxed{
\frac\delta2
}
$$

です。

したがってハードマージンSVMの最大マージン問題は、幾何学的には

$$
\boxed{
\text{正例の凸包と負例の凸包の最短距離を見つけ、その中間面を取る}
}
$$

問題とみなせます。

SVMの標準化

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
$$

では支持超平面間の距離は

$$
\frac{2}{\|\boldsymbol w\|}.
$$

したがって最適点では

$$
\boxed{
\frac{2}{\|\boldsymbol w^*\|}
=
\delta
}
$$

です。

---

## 14. SVM双対変数は「凸包上の点」を作っている

ハードマージンSVMの双対問題では

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0
$$

です。

正例側と負例側の係数和を

$$
\rho
=
\sum_{i:y_i=+1}\alpha_i
=
\sum_{i:y_i=-1}\alpha_i
$$

と置けます。

非自明な最適解では $\rho>0$ です。

そこで

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

と置くと、係数は非負で和が1なので

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

つまりSVMの法線ベクトルは、**二つの凸包上の点を結ぶベクトル**になっています。

### 14.1 双対目的関数も凸包間距離になる

双対目的関数は

$$
\sum_i\alpha_i
-
\frac12\|\boldsymbol w\|^2.
$$

いま

$$
\sum_i\alpha_i=2\rho,
\qquad
\boldsymbol w=\rho(\boldsymbol p-\boldsymbol q)
$$

なので

$$
\boxed{
2\rho
-
\frac12\rho^2
\|\boldsymbol p-\boldsymbol q\|^2
}
$$

となります。

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

を最小にすればよい。

つまり双対問題から見ても

$$
\boxed{
\boldsymbol p^*,\boldsymbol q^*
=
\text{二つの凸包の最近点対}
}
$$

が現れます。

非零の $\alpha_i$ を持つ点だけがこれらの凸結合に寄与します。これがサポートベクトルの幾何学的な意味の一つです。

---

## 15. SVMには二種類の「分離超平面」が登場する

ここまでを整理すると、SVMでは分離超平面定理が二重に現れます。

### 15.1 表側：データを分離する超平面

$$
\boxed{
C_+\cap C_-=\varnothing
\Longrightarrow
\text{クラスを分離する超平面が存在}
}
$$

です。

これはSVMが実際に求める分類境界そのものです。

### 15.2 裏側：最適性条件を導く分離超平面

一方、KKT条件の背後では

$$
\boxed{
\boldsymbol v\notin K
\Longrightarrow
K\text{ と }\boldsymbol v\text{ を分離する方向が存在}
}
$$

という凸錐の分離からFarkasの補題を導きます。

そこからpolar coneの表現を得てKKT条件へ進みます。

したがって

$$
\boxed{
\begin{array}{c}
\text{SVMは超平面でデータを分離する}\
\text{かつ}\
\text{その最適性理論も超平面分離に支えられる}
\end{array}
}
$$

という二重構造になっています。

---

## 16. ハードマージンが不可能になる条件も凸包で分かる

もし

$$
C_+\cap C_-\ne\varnothing
$$

なら、正例と負例の凸包を厳密に分離する超平面は存在しません。

したがってハードマージンSVMの制約

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
$$

を全点で満たすことはできません。

このとき [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) で扱うスラック変数を導入し、違反を許す **ソフトマージンSVM** へ進むのが自然です。

凸包の言葉では

$$
\boxed{
\text{凸包が離れている}
\to
\text{hard margin},
\qquad
\text{凸包が重なる}
\to
\text{soft marginが必要}
}
$$

と理解できます。

---

## 17. カーネルSVMでは特徴空間で同じ話をする

カーネルSVMでは

$$
\boldsymbol x
\mapsto
\varphi(\boldsymbol x)
$$

と特徴空間へ写します。

すると線形分離の問題は

$$
\operatorname{conv}
\{\varphi(\boldsymbol x_i):y_i=+1\}
$$

と

$$
\operatorname{conv}
\{\varphi(\boldsymbol x_i):y_i=-1\}
$$

を特徴空間の超平面で分離する問題になります。

訓練標本が有限個なら、これらの凸包は

$$
\operatorname{span}
\{\varphi(\boldsymbol x_1),\dots,\varphi(\boldsymbol x_n)\}
$$

という高々 $n$ 次元の部分空間に入ります。

したがって特徴空間自体が無限次元でも、有限標本についてのこの分離幾何は有限次元部分空間の中で理解できます。

カーネルトリックは、この特徴空間で必要になる内積

$$
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
$$

を

$$
K(\boldsymbol x_i,\boldsymbol x_j)
$$

で直接計算する方法です。

つまり

$$
\boxed{
\text{kernel SVM}
=
\text{特徴空間の凸包を分離する最大マージン法}
}
$$

とも見ることができます。

---

## 18. 理論の全体地図

最後に一本につなぎます。

$$
\boxed{
\begin{array}{c}
\text{閉凸集合への最近点射影}\
\Downarrow\\
\text{射影点での法線条件}\
\Downarrow\\
\text{点と閉凸集合の分離超平面定理}\
\Downarrow\\
\text{凸錐の分離}\
\Downarrow\\
\text{Farkasの補題}\
\Downarrow\\
\text{線形化錐のpolar cone表現}\
\Downarrow\\
\text{KKT条件}
\end{array}
}
$$

SVM側では

$$
\boxed{
\begin{array}{c}
\text{正負クラスの凸包}\
\Downarrow\\
C_+\cap C_-=\varnothing\ ?\\
\Downarrow\\
\text{分離超平面の存在}\
\Downarrow\\
\text{最近点対}\
\Downarrow\\
\text{最大マージン超平面}\
\Downarrow\\
\text{双対変数による凸結合}\
\Downarrow\\
\text{サポートベクトル}
\end{array}
}
$$

となります。

この二本は別の話ではなく、どちらも **凸集合と超平面の幾何** から出ています。

---

## 19. どこまで押さえるか

統計検定1級のSVMで優先すべきなのは

- ハードマージン主問題
- 双対問題
- KKT条件
- サポートベクトル
- ソフトマージンとhinge損失
- カーネルトリック

です。

その背景としては

$$
\boxed{
\text{線形分離可能}
\Longleftrightarrow
\text{正負クラスの凸包が交わらない}
}
$$

と

$$
\boxed{
\text{分離超平面定理}
\Rightarrow
\text{Farkas}
\Rightarrow
\text{KKT}
}
$$

の二本を理解しておけば、SVMの式がかなり再構成しやすくなります。

KKTそのものの導出へ戻る場合は [F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)、SVMの主問題・双対問題・ソフトマージン・カーネルへ戻る場合は [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) を参照してください。
