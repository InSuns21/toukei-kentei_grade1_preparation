# F0-02B 分離超平面定理・Farkasの補題・SVM

この補講では、[F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) で使ったFarkasの補題を、有限次元の凸幾何まで戻って導きます。

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

という形で分離定理が直接現れます。

この内容は統計検定1級の必須暗記事項を増やすためのものではありません。SVM・双対問題・KKTを **凸幾何の一つの流れ** として理解するための発展補講です。

---

## 0. この章の前提を分離した

以前はこの章の冒頭で

- 閉集合
- infimum / minimum
- コンパクト性
- Heine--Borel

まで一気に定義していました。

これらは分離定理だけの道具ではなく、今後の関数解析全体で使うため、独立した補講へ移しました。

未習なら次を先に参照してください。

- [F0-00A 集合・写像・上限と下限](../F0_00A_集合_写像_上限下限/index.md)：infimum / minimum
- [F0-00B 距離空間・開集合・閉集合・収束](../F0_00B_距離空間_開集合_閉集合_収束/index.md)：閉集合・収束
- [F0-00C 連続写像・コンパクト性・最大最小](../F0_00C_連続写像_コンパクト性_最大最小/index.md)：コンパクト性・Heine--Borel・最小値達成

この章では、これらを使って **凸幾何そのもの** に集中します。

---

## 1. 凸結合・凸集合・凸包

点 $x_1,\dots,x_n\in\mathbb R^p$ に対し

$$
\theta_i\ge0,
\qquad
\sum_{i=1}^n\theta_i=1
$$

を満たす係数で作る

$$
\sum_{i=1}^n\theta_i x_i
$$

を **凸結合** といいます。

集合 $C\subset\mathbb R^p$ が **凸集合** であるとは、任意の $x,y\in C$ と $0\le t\le1$ について

$$
(1-t)x+ty\in C
$$

となることです。

つまり、集合内の2点を結ぶ線分が全て集合内に残ります。

集合 $S$ の全ての有限凸結合からなる集合を **凸包** といい

$$
\boxed{\operatorname{conv}(S)}
$$

と書きます。

有限点集合では

$$
\operatorname{conv}\{x_1,\dots,x_n\}
=
\left\{
\sum_{i=1}^n\theta_i x_i:
\theta_i\ge0,\ \sum_i\theta_i=1
\right\}.
$$

---

## 2. 錐・凸錐・有限生成凸錐

集合 $K\subset\mathbb R^p$ が **錐** であるとは

$$
x\in K,\ a\ge0
\Longrightarrow
ax\in K
$$

となることです。

さらに凸集合でもあれば **凸錐** といいます。

有限個のベクトル $a_1,\dots,a_n$ から

$$
\boxed{
K
=
\left\{
\sum_{j=1}^n\lambda_j a_j:
\lambda_j\ge0
\right\}
}
$$

と作られるものを **有限生成凸錐** といいます。

凸結合では係数和が1でしたが、錐では係数和に制約がありません。

---

## 3. 超平面で分離するとは何か

$a\ne0$ と $b\in\mathbb R$ に対し

$$
H
=\{x:a^{\mathsf T}x=b\}
$$

を超平面といいます。

集合 $C$ と点 $z\notin C$ に対して

$$
\boxed{
a^{\mathsf T}x
\le b
<a^{\mathsf T}z
\qquad(\forall x\in C)
}
$$

となれば、$H$ は $C$ と $z$ を厳密に分離しています。

以下では、この法線 $a$ を最近点への射影から作ります。

---

## 4. 閉凸集合への最近点射影

$C\subset\mathbb R^p$ を空でない閉凸集合、$z\in\mathbb R^p$ とします。

距離の下限

$$
\delta
=\inf_{x\in C}\|z-x\|
$$

を考えます。

### 4.1 最近点の存在

infimumの定義から、$C$ 内に点列 $x_n$ を取り

$$
\|z-x_n\|\to\delta
$$

とできます。

十分大きな $n$ では

$$
\|z-x_n\|\le\delta+1
$$

なので、点列の後半は閉球

$$
\overline B(z,\delta+1)
$$

内にあります。

したがって

$$
C\cap\overline B(z,\delta+1)
$$

という閉有界集合の中で考えればよく、有限次元のHeine--Borelによりコンパクトです。

よって部分列

$$
x_{n_k}\to p
$$

を取れます。

$C$ は閉なので $p\in C$、距離関数は連続なので

$$
\|z-p\|=\delta.
$$

したがって最近点は存在します。

この証明で使った一般論は [F0-00C](../F0_00C_連続写像_コンパクト性_最大最小/index.md) で分解してあります。

### 4.2 最近点の一意性

最近点が二つ $p,q\in C$ あると仮定します。

$$
\|z-p\|=\|z-q\|=\delta.
$$

凸性より

$$
m=\frac{p+q}{2}\in C.
$$

内積でノルム平方を展開すると

$$
\left\|
z-\frac{p+q}{2}
\right\|^2
=
\frac12\|z-p\|^2
+\frac12\|z-q\|^2
-\frac14\|p-q\|^2.
$$

$p\ne q$ なら右辺は $\delta^2$ より小さくなり、最小距離に反します。

したがって最近点は一意です。

$$
\boxed{P_C(z)=p}
$$

と書きます。

---

## 5. 射影点では外向き法線が得られる

$p=P_C(z)$ とし、任意の $x\in C$ を取ります。

凸性より

$$
p_t=p+t(x-p)
\qquad(0\le t\le1)
$$

も $C$ に属します。

$p$ が最近点なので

$$
\phi(t)=\|z-p_t\|^2
$$

は $t=0$ で右側最小です。

したがって

$$
\phi'(0+)\ge0.
$$

計算すると

$$
\phi'(0+)
=-2(z-p)^{\mathsf T}(x-p).
$$

よって

$$
\boxed{
(z-p)^{\mathsf T}(x-p)
\le0
\qquad(\forall x\in C)
}
$$

です。

つまり $z-p$ は $C$ の外向き法線になっています。

---

## 6. 分離超平面定理を射影から導く

$C\subset\mathbb R^p$ を空でない閉凸集合、$z\notin C$ とします。

$p=P_C(z)$ とし

$$
a=z-p
$$

と置きます。

$z\notin C$ なので $a\ne0$ です。

前節から

$$
a^{\mathsf T}(x-p)\le0
$$

なので

$$
a^{\mathsf T}x
\le a^{\mathsf T}p
\qquad(\forall x\in C).
$$

一方

$$
a^{\mathsf T}z
=a^{\mathsf T}p+\|z-p\|^2
>a^{\mathsf T}p.
$$

したがって

$$
\boxed{
a^{\mathsf T}x
\le a^{\mathsf T}p
<a^{\mathsf T}z
\qquad(\forall x\in C)
}
$$

です。

構造は

$$
\boxed{
\text{最近点への射影}
\to
\text{外向き法線}
\to
\text{分離超平面}
}
$$

です。

---

## 7. 閉凸錐を外の点から分離する

$K$ を閉凸錐、$v\notin K$ とします。

$p=P_K(v)$、

$$
d=v-p
$$

と置きます。

射影条件より

$$
d^{\mathsf T}(k-p)\le0
\qquad(\forall k\in K).
$$

錐なので

$$
0\in K,
\qquad
2p\in K.
$$

それぞれ代入すると

$$
d^{\mathsf T}p\ge0,
\qquad
d^{\mathsf T}p\le0.
$$

したがって

$$
d^{\mathsf T}p=0.
$$

よって

$$
\boxed{
d^{\mathsf T}k\le0
\qquad(\forall k\in K)
}
$$

であり、

$$
d^{\mathsf T}v
=\|d\|^2>0.
$$

したがって

$$
\boxed{
d^{\mathsf T}k\le0
\quad(\forall k\in K),
\qquad
d^{\mathsf T}v>0
}
$$

という分離証明書が存在します。

---

## 8. 有限生成凸錐は閉である

Farkasでは

$$
K
=\left\{
\sum_{j=1}^n\lambda_j a_j:
\lambda_j\ge0
\right\}
$$

を使います。

この $K$ は閉です。

### 8.1 表現に使う生成ベクトルを一次独立に減らせる

ある点

$$
k=\sum_j\lambda_j a_j,
\qquad\lambda_j>0
$$

の表現で、使用中の生成ベクトルが一次従属だとします。

すると

$$
\sum_jc_ja_j=0
$$

となる $c\ne0$ があります。

必要なら符号を反転し、$c_j>0$ の成分があるようにします。

$$
t
=\min_{c_j>0}
\frac{\lambda_j}{c_j}
$$

と置けば

$$
\lambda_j-tc_j\ge0
$$

で、少なくとも一つの係数が0になり、しかも

$$
\sum_j(\lambda_j-tc_j)a_j=k.
$$

これを繰り返すと、$\mathbb R^m$ では高々 $m$ 本の一次独立な生成ベクトルだけで表せます。

### 8.2 極限を取っても錐から出ない

$k_n\in K$ かつ $k_n\to k$ とします。

各 $k_n$ は一次独立な生成ベクトルの部分集合で表せます。元の生成ベクトルは有限個なので、部分列を取れば同じ一次独立集合

$$
a_{j_1},\dots,a_{j_s}
$$

だけを使えます。

列ベクトルを並べた行列を

$$
M=(a_{j_1}\ \cdots\ a_{j_s})
$$

とすると

$$
k_n=M\lambda_n,
\qquad\lambda_n\ge0.
$$

列が一次独立なので

$$
M^{\mathsf T}M
$$

は正則で

$$
\boxed{
\lambda_n
=(M^{\mathsf T}M)^{-1}M^{\mathsf T}k_n
}.
$$

したがって

$$
\lambda_n\to
\lambda=(M^{\mathsf T}M)^{-1}M^{\mathsf T}k.
$$

各 $\lambda_n\ge0$ なので $\lambda\ge0$ です。

極限を取れば

$$
k=M\lambda\in K.
$$

よって $K$ は閉です。

---

## 9. Farkasの補題

$A\in\mathbb R^{m\times n}$、$b\in\mathbb R^m$ とします。

次の二つのうち **ちょうど一方** が成立します。

### (A) 非負解が存在する

$$
\boxed{
Ax=b,
\qquad
x\ge0
}
$$

### (B) 不可能性の証明書が存在する

$$
\boxed{
A^{\mathsf T}y\le0,
\qquad
b^{\mathsf T}y>0
}
$$

---

## 10. 両方同時には成立しない

もし両方成立すれば

$$
b^{\mathsf T}y
=x^{\mathsf T}A^{\mathsf T}y.
$$

$x\ge0$、$A^{\mathsf T}y\le0$ なので

$$
b^{\mathsf T}y\le0,
$$

となり(B)に反します。

---

## 11. どちらか一方は必ず成立する

$A$ の列を $a_1,\dots,a_n$ とし

$$
K
=\{Ax:x\ge0\}
$$

と置きます。

$K$ は前節の有限生成閉凸錐です。

$b\in K$ なら定義から(A)が成立します。

$b\notin K$ なら、閉凸錐の分離により、ある $y$ が存在して

$$
y^{\mathsf T}k\le0
\quad(\forall k\in K),
\qquad
y^{\mathsf T}b>0.
$$

各列 $a_j\in K$ なので

$$
y^{\mathsf T}a_j\le0.
$$

したがって

$$
A^{\mathsf T}y\le0.
$$

よって(B)が成立します。

$$
\boxed{
\text{分離超平面定理}
\Longrightarrow
\text{Farkasの補題}
}
$$

です。

Farkasの補題は **有限生成凸錐に対する分離定理の代数版** と考えられます。

---

## 12. KKTで使うFarkas型alternative

F0-02Aでは

$$
L
=\{d:Ad\le0,\ Bd=0\}
$$

に対し

$$
L^\circ
=
\left\{
A^{\mathsf T}\lambda
+B^{\mathsf T}\nu:
\lambda\ge0
\right\}
$$

を使いました。

右辺の集合を

$$
K
=
\left\{
A^{\mathsf T}\lambda
+B^{\mathsf T}\nu:
\lambda\ge0
\right\}
$$

と置きます。

$\nu$ は符号自由なので

$$
\nu_j=\nu_j^+-\nu_j^-.
$$

したがって $K$ は

$$
A^{\mathsf T}e_i,
\qquad
B^{\mathsf T}e_j,
\qquad
-B^{\mathsf T}e_j
$$

という有限個のベクトルで生成される閉凸錐です。

$v\notin K$ なら凸錐分離により $d$ が存在して

$$
d^{\mathsf T}k\le0
\quad(\forall k\in K),
\qquad
d^{\mathsf T}v>0.
$$

$A^{\mathsf T}e_i\in K$ から

$$
Ad\le0.
$$

また $\pm B^{\mathsf T}e_j\in K$ だから

$$
Bd=0.
$$

したがって、次の二つのどちらか一方が成立します。

1. $v=A^{\mathsf T}\lambda+B^{\mathsf T}\nu$ を満たす $\lambda\ge0,\nu$ が存在する。
2. $Ad\le0$, $Bd=0$, $v^{\mathsf T}d>0$ を満たす $d$ が存在する。

これがF0-02Aで使ったFarkas型alternativeです。

---

## 13. polar coneの公式

$$
L
=\{d:Ad\le0,\ Bd=0\}
$$

とします。

まず

$$
v=A^{\mathsf T}\lambda+B^{\mathsf T}\nu,
\qquad\lambda\ge0
$$

なら、任意の $d\in L$ に対し

$$
v^{\mathsf T}d
=\lambda^{\mathsf T}Ad
+\nu^{\mathsf T}Bd
\le0.
$$

よって $v\in L^\circ$ です。

逆に $v\in L^\circ$ なら

$$
Ad\le0,
\quad Bd=0,
\quad v^{\mathsf T}d>0
$$

となる $d$ は存在できません。

Farkas型alternativeより

$$
v=A^{\mathsf T}\lambda+B^{\mathsf T}\nu,
\qquad\lambda\ge0.
$$

したがって

$$
\boxed{
L^\circ
=
\left\{
A^{\mathsf T}\lambda
+B^{\mathsf T}\nu:
\lambda\ge0
\right\}
}
$$

です。

---

## 14. KKT条件への接続

局所最適点 $x^*$ では

$$
-\nabla f(x^*)
\in T_C(x^*)^\circ.
$$

適切な制約想定の下で、真の接錐を線形化された制約方向で正しく表せるなら

$$
-\nabla f(x^*)
\in L_C(x^*)^\circ.
$$

前節の公式から

$$
-\nabla f(x^*)
=
\sum_{i\in I(x^*)}
\lambda_i\nabla g_i(x^*)
+
\sum_j\nu_j\nabla h_j(x^*),
\qquad
\lambda_i\ge0.
$$

したがって

$$
\boxed{
\nabla f(x^*)
+
\sum_i\lambda_i\nabla g_i(x^*)
+
\sum_j\nu_j\nabla h_j(x^*)
=0
}
$$

というKKT停留条件が出ます。

制約想定そのものを丁寧に追う場合は [F0-02C5](../F0_02C5_一般化KKT_制約写像_制約想定/index.md) を参照してください。

---

## 15. SVMの表側：線形分離と凸包

正例と負例の訓練点を

$$
X_+=\{x_i:y_i=+1\},
\qquad
X_-=\{x_i:y_i=-1\}
$$

とします。

それぞれの凸包を

$$
C_+=\operatorname{conv}(X_+),
\qquad
C_-=\operatorname{conv}(X_-)
$$

とします。

有限点集合の凸包はコンパクトです。

実際、係数単体

$$
\Delta
=\left\{
\theta:\theta_i\ge0,\ \sum_i\theta_i=1
\right\}
$$

は閉有界なのでコンパクトであり、連続写像

$$
\theta\mapsto\sum_i\theta_i x_i
$$

の像が凸包です。

したがって [F0-00C](../F0_00C_連続写像_コンパクト性_最大最小/index.md) の「連続像はコンパクト」が使えます。

---

## 16. 線形分離可能性と凸包の非交差

$$
\boxed{
X_+,X_-
\text{ が厳密に線形分離可能}
\Longleftrightarrow
C_+\cap C_-=\varnothing
}
$$

です。

### 16.1 線形分離可能なら凸包も交わらない

ある $w,b$ が存在して

$$
w^{\mathsf T}x_i+b>0
\qquad(y_i=+1),
$$

$$
w^{\mathsf T}x_i+b<0
\qquad(y_i=-1)
$$

とします。

正例凸包の任意の点

$$
p=\sum_{i:y_i=+1}\theta_i x_i
$$

について

$$
w^{\mathsf T}p+b
=\sum_i\theta_i(w^{\mathsf T}x_i+b)>0.
$$

負例凸包では同様に負です。

したがって二つの凸包は交わりません。

### 16.2 凸包が交わらないなら分離可能

逆に

$$
C_+\cap C_-=\varnothing
$$

とします。

$C_+\times C_-$ はコンパクトで、距離関数

$$
(p,q)\mapsto\|p-q\|
$$

は連続なので、最近点対

$$
p^*\in C_+,
\qquad
q^*\in C_-
$$

が存在します。

二集合は交わらないので

$$
\delta=\|p^*-q^*\|>0.
$$

次節で、この最近点対の中間超平面が二集合を分離することを示します。

---

## 17. 最大マージンは二つの凸包の最短距離

$$
r=p^*-q^*,
\qquad
\delta=\|r\|>0
$$

とします。

$q^*$ を固定すると $p^*$ は $C_+$ 上で $q^*$ に最も近い点なので、射影条件から任意の $p\in C_+$ について

$$
(q^*-p^*)^{\mathsf T}(p-p^*)\le0.
$$

したがって

$$
\boxed{r^{\mathsf T}p\ge r^{\mathsf T}p^*}.
$$

同様に任意の $q\in C_-$ について

$$
\boxed{r^{\mathsf T}q\le r^{\mathsf T}q^*}.
$$

しかも

$$
r^{\mathsf T}p^*
-r^{\mathsf T}q^*
=\|r\|^2
=\delta^2>0.
$$

よって中間超平面

$$
r^{\mathsf T}x
=
\frac{r^{\mathsf T}p^*+r^{\mathsf T}q^*}{2}
$$

が二つの凸包を厳密に分離します。

単位法線

$$
u=\frac r\delta
$$

を使えば、二つの支持超平面間距離は $\delta$、中央境界から各支持超平面までの距離は $\delta/2$ です。

ハードマージンSVMでは支持超平面間距離が

$$
\frac{2}{\|w\|}
$$

なので最適解で

$$
\boxed{
\frac{2}{\|w^*\|}
=\delta
}
$$

です。

したがってハードマージンSVMは

$$
\boxed{
\text{正例凸包と負例凸包の最近点対を見つけ、
その中間超平面を取る}
}
$$

問題とみなせます。

---

## 18. 双対変数 $\alpha_i$ は凸包上の点を作る

ハードマージンSVMの双対制約は

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0.
$$

正例側と負例側の係数和を

$$
\rho
=\sum_{i:y_i=+1}\alpha_i
=\sum_{i:y_i=-1}\alpha_i
$$

と置きます。

$\rho>0$ のとき

$$
p
=\sum_{i:y_i=+1}
\frac{\alpha_i}{\rho}x_i,
$$

$$
q
=\sum_{i:y_i=-1}
\frac{\alpha_i}{\rho}x_i
$$

とすれば

$$
p\in C_+,
\qquad
q\in C_-.
$$

さらに

$$
w
=\sum_i\alpha_i y_i x_i
=\rho(p-q).
$$

つまりSVMの法線は、二つの凸包上の点を結ぶ方向です。

---

## 19. 双対目的関数も凸包間距離になる

双対目的関数

$$
\sum_i\alpha_i
-\frac12\|w\|^2
$$

は

$$
2\rho
-\frac12\rho^2\|p-q\|^2
$$

と書けます。

$p,q$ を固定して $\rho$ について最大化すると

$$
\rho^*
=\frac{2}{\|p-q\|^2},
$$

最大値は

$$
\frac{2}{\|p-q\|^2}.
$$

したがって双対問題全体を最大化するには

$$
\|p-q\|
$$

を最小にすればよいことになります。

双対側からも **二つの凸包の最近点対** が現れます。

非零の $\alpha_i$ を持つ訓練点だけが、これらの凸結合と法線ベクトルに寄与します。これがsupport vectorの幾何学的な意味の一つです。

---

## 20. SVMには二種類の「分離」がある

### 表側：分類境界

$$
C_+\cap C_-=\varnothing
$$

なら、正負クラスを分離する超平面が存在します。

これはSVMが実際に求める分類境界です。

### 裏側：最適性理論

KKT条件の背後では

$$
v\notin K
$$

なら $K$ と $v$ を分離する方向が存在する、という凸錐分離からFarkasを導きます。

したがってSVMは

$$
\boxed{
\text{データを超平面で分離する問題であり、
その最適性理論も超平面分離に支えられる}
}
$$

という二重構造を持ちます。

---

## 21. soft marginとkernelへ

もし

$$
C_+\cap C_-\ne\varnothing
$$

なら、二つの凸包を厳密分離するhard marginは不可能です。

そこで [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) で扱うスラック変数を導入し、違反を許すsoft marginへ進みます。

kernel SVMでは

$$
x\mapsto\varphi(x)
$$

と特徴空間へ移し、そこで同じ凸幾何を考えます。

有限個の訓練標本については、$\varphi(x_i)$ は高々 $n$ 次元の部分空間を張ります。このため特徴空間全体が無限次元でも、訓練標本の分離幾何は有限次元部分空間に落ちます。

ただし「Hilbert空間」「RKHS」「なぜkernelが内積になるのか」を数学的に理解するには、[F0-02C 関数解析補講ロードマップ](../F0_02C_関数解析_制約想定_RKHS/index.md) からC1〜C7へ進んでください。

---

## 22. 全体像

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
\text{最近点対}
\to
\text{分離超平面}
\to
\text{最大マージン}
\to
\text{双対変数・support vector}
}
$$

です。

この二つは別の理論ではなく、どちらも **凸集合と超平面の幾何** に根を持っています。

---

## 章末チェック

- 凸結合・凸集合・凸包・凸錐を定義できる。
- 閉凸集合への最近点の存在でHeine--Borelがどこに使われるか説明できる。
- 射影条件から分離超平面を構成できる。
- 有限生成凸錐が閉である理由を説明できる。
- Farkasの補題を凸錐の分離から導ける。
- polar coneの公式がKKTの乗数表示へつながることを説明できる。
- 線形分離可能性と正負クラスの凸包の非交差を結び付けられる。
- ハードマージンと凸包間最短距離の関係を説明できる。
- 双対変数 $\alpha_i$ を凸包上の点を作る係数として解釈できる。
