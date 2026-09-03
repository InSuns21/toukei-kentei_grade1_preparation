# F0-02B 分離超平面定理・Farkasの補題

この補講では、有限次元の閉凸集合への最近点射影から分離超平面を構成し、閉凸錐の分離を経てFarkasの補題を導きます。

$$
\boxed{
\text{射影}
\to\text{分離超平面}
\to\text{凸錐の分離}
\to\text{Farkas}
\to\text{polar cone}
\to\text{KKT}
}
$$

SVMの「正負クラスの凸包」「最大マージン」「双対変数の幾何」は独立した応用サイクルなので、次講 [F0-02B1](../F0_02B1_SVM_凸包_最大マージン/index.md) へ分離しました。

---

## 0. 前提

この講義で使う床は次です。

- [F0-00C2](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)：有限次元での最小値達成・最近点
- [F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)：内積・直交射影
- [F0-00G](../F0_00G_凸集合_凸関数_凸最適化/index.md)：凸集合・凸包
- [F0-02](../F0_02_制約付き最適化_双対_KKT/index.md)：KKTの意味

Farkasの保証をKKT導出の途中で参照したい場合は [F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) と往復できますが、**02Bの数学的必須前提に02Aは置きません**。これにより参照循環と必須前提循環を区別します。

---

## 0.1 例：単位円板と外の点で「分離」を一周する

抽象的な定理へ進む前に、単位円板

$$
C=\{x\in\mathbb R^2:\|x\|\le1\}
$$

と、その外の点

$$
z=(2,0)
$$

を考えます。$z$ に最も近い $C$ の点は

$$
p=(1,0)
$$

で、$z-p=(1,0)$ は円板の外向き法線です。したがって任意の $x=(x_1,x_2)\in C$ について

$$
x_1\le1<2
$$

すなわち

$$
(z-p)^{\mathsf T}x
\le
(z-p)^{\mathsf T}p
<
(z-p)^{\mathsf T}z
$$

となります。

ここで起きていることは

$$
\boxed{
\text{外の点 }z
\to
\text{最近点 }p
\to
\text{法線 }z-p
\to
\text{分離超平面}
}
$$

です。本章の前半はこの2次元の絵を $\mathbb R^p$ の閉凸集合へ一般化し、後半では「点が錐に入らない」ことを線形不等式の **certificate** として書き直してFarkasの補題へ進みます。

---

## 1. 凸結合・凸集合・凸包

<a id="def-f0-02b-convex-combination-set-hull"></a>

<!-- formal-statement-start -->
> **定義（凸結合・凸集合・凸包）**  
> 点 $x_1,\dots,x_n\in\mathbb R^p$ と $\theta_i\ge0$、$\sum_i\theta_i=1$ に対する $\sum_i\theta_i x_i$ を **凸結合** といいます。集合 $C$ が任意の2点とその凸結合をすべて含むとき **凸集合** といいます。集合 $S$ のすべての有限凸結合からなる集合を **凸包** といい、$\operatorname{conv}(S)$ と書きます。
<!-- formal-statement-end -->

つまり、凸集合では集合内の2点を結ぶ線分が全て集合内に残ります。

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

<a id="def-f0-02b-cones"></a>

<!-- formal-statement-start -->
> **定義（錐・凸錐・有限生成凸錐）**  
> 集合 $K\subset\mathbb R^p$ が $x\in K, a\ge0\Rightarrow ax\in K$ を満たすとき **錐** といいます。さらに凸集合でもある錐を **凸錐** といいます。有限個のベクトル $a_1,\dots,a_n$ により

$$
K=\left\{\sum_{j=1}^n\lambda_j a_j:\lambda_j\ge0\right\}
$$

> と表される凸錐を **有限生成凸錐** といいます。
<!-- formal-statement-end -->

凸結合では係数和が1でしたが、錐では係数和に制約がありません。

---

## 3. 超平面で分離するとは何か

<a id="def-f0-02b-hyperplane"></a>

<!-- formal-statement-start -->
> **定義（超平面）**  
> $a\ne0$ と $b\in\mathbb R$ に対し

$$
H=\{x:a^{\mathsf T}x=b\}
$$

> と表される集合を **超平面** といいます。
<!-- formal-statement-end -->

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

閉性は「極限が $C$ の外へ落ちない」ことを、有限次元のコンパクト性は「距離の下限を実現する部分列が取れる」ことを担当します。

#### 証明の見取り図

$$
\text{距離を下限へ近づける列}
\to
\text{有界化}
\to
\text{閉有界なのでcompact}
\to
\text{収束部分列}
\to
\text{閉性で極限が }C\text{ 内}
$$

という流れです。結論は、空でない閉凸集合 $C\subset\mathbb R^p$ には $z$ からの最近点が存在する、です。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


### 4.2 最近点の一意性

凸性が一意性を担当します。二つの最近点があるなら、その中点はさらに $z$ に近くなってしまいます。

#### 証明の見取り図

$$
p,q\text{ がともに最近点}
\to
m=(p+q)/2\in C
\to
\|z-m\|^2
=\delta^2-\frac14\|p-q\|^2
$$

なので、$p\ne q$ なら最小性に矛盾します。したがって最近点は一意で、$P_C(z)$ と書けます。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

## 5. 射影点では外向き法線が得られる

$p=P_C(z)$ とすると、最近点から集合内へ少し動いたとき距離が減ってはいけません。この「片側微分が非負」という最小化条件が

$$
\boxed{
(z-p)^{\mathsf T}(x-p)\le0
\qquad(\forall x\in C)
}
$$

を与えます。つまり $z-p$ が外向き法線になります。

### 証明の見取り図

$p_t=p+t(x-p)$ と線分上を動かし、$\phi(t)=\|z-p_t\|^2$ の $t=0$ における右微分を調べるだけです。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

<a id="ref-farkas-from-separation"></a>

## 6. 分離超平面定理を射影から導く

空でない閉凸集合 $C\subset\mathbb R^p$ と $z\notin C$ に対し、$p=P_C(z)$、$a=z-p$ と置けば

$$
\boxed{
a^{\mathsf T}x\le a^{\mathsf T}p<a^{\mathsf T}z
\qquad(\forall x\in C)
}
$$

となります。

### 証明の見取り図

前節の射影不等式を $a=z-p$ で読み替えると集合側の上界が得られ、点 $z$ では $\|z-p\|^2>0$ の分だけ厳密に大きくなります。

#### さきほどの円板では

$C=\{\|x\|\le1\}$、$z=(2,0)$ なら $p=(1,0)$、$a=(1,0)$ なので、分離不等式はそのまま $x_1\le1<2$ です。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

## 7. 閉凸錐を外の点から分離する

錐 $K$ ではスカラー倍 $tk\in K$ を自由に使えるため、一般の分離不等式を原点を通る形まで強められます。$v\notin K$ なら、ある $d$ が存在して

$$
\boxed{
d^{\mathsf T}k\le0\ (\forall k\in K),
\qquad d^{\mathsf T}v>0
}
$$

となります。

### 証明の見取り図

最近点 $p=P_K(v)$ に対する射影不等式へ $0$ と $2p$ を代入して $d^{\mathsf T}p=0$ を引き出すのが錐特有の一手です。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

## 8. 有限生成凸錐は閉である

Farkasの補題では

$$
K=\{Ax:x\ge0\}
$$

を **閉** 凸錐として分離する必要があります。有限個のベクトル $a_1,\dots,a_m$ が生成する錐

$$
K=\left\{\sum_{j=1}^m\lambda_ja_j:\lambda_j\ge0\right\}
$$

は閉です。

### 証明の見取り図

係数が無限大へ逃げる問題を、正の線形従属を使って不要な生成元を消すことで回避します。最後は線形独立な生成元だけに落とし、係数列の有界性から極限を錐内へ戻します。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

<a id="thm-farkas"></a>

## 9. Farkasの補題

<!-- formal-statement-start -->
> **補題（Farkasの補題）**  
> $A\in\mathbb R^{m\times n}$、$b\in\mathbb R^m$ とします。次の二つのうち、ちょうど一方が成立します。  
> (A) $Ax=b$、$x\ge0$ を満たす $x\in\mathbb R^n$ が存在する。  
> (B) $A^{\mathsf T}y\le0$、$b^{\mathsf T}y>0$ を満たす $y\in\mathbb R^m$ が存在する。
<!-- formal-statement-end -->

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


### 9.1 例：Farkas certificateを数値で見る

$$
A=I_2,
\qquad
b=\begin{pmatrix}-1\\1\end{pmatrix}
$$

とします。$Ax=b$ を満たす $x$ は $x=b$ しかなく、$x\ge0$ ではありません。つまり $b$ は $A$ の列が張る非負錐（第1象限）に入りません。

そこで

$$
y=\begin{pmatrix}-1\\0\end{pmatrix}
$$

を取ると

$$
A^{\mathsf T}y
=\begin{pmatrix}-1\\0\end{pmatrix}
\le0,
\qquad
b^{\mathsf T}y=1>0.
$$

この $y$ は「$b$ は第1象限に入れない」と一つの内積不等式で証明する **certificate** です。Farkasの補題は、非負解がないときには必ずこの種のcertificateが存在すると保証します。
---

## 10. 両方同時には成立しない

(A) の非負解 $x$ と (B) のcertificate $y$ が同時にあると、同じ量 $y^{\mathsf T}Ax$ が一方では正、他方では非正になって矛盾します。

### 証明の見取り図

$$
y^{\mathsf T}b
=y^{\mathsf T}Ax
=x^{\mathsf T}A^{\mathsf T}y
$$

の符号を見るだけです。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

## 11. どちらか一方は必ず成立する

非負解がない、つまり $b\notin K=\{Ax:x\ge0\}$ なら、前節までに作った **閉凸錐の分離定理** をそのまま使えます。

### 証明の見取り図

$$
b\notin K
\to
\text{separating vector }y
\to
A^{\mathsf T}y\le0,
\ b^{\mathsf T}y>0
$$

です。これが「幾何学的な分離」から「代数的なcertificate」へ移る核心です。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

## 12. KKTで使うFarkas型alternative

等式制約の乗数 $\nu$ は符号自由なので $\nu=\nu^+-\nu^-$ と分解し、不等式制約の生成元と $\pm B^{\mathsf T}e_j$ をまとめて一つの有限生成錐にします。するとFarkasと同じ分離論が使えます。

### 証明の見取り図

$$
K=\{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:\lambda\ge0\}
$$

に $v$ が入るか、入らなければ $K$ を $v$ から分離する方向 $d$ が存在するか、という二者択一に読み替えます。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


---

<a id="ref-polar-cone-formula"></a>

## 13. polar coneの公式

線形化制約集合

$$
L=\{d:Ad\le0,\ Bd=0\}
$$

のpolarは

$$
\boxed{
L^\circ
=\{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:\lambda\ge0\}
}
$$

です。

### 証明の見取り図

右辺から左辺は内積を直接計算します。逆向きは、もし $v$ が右辺に入らなければ前節のFarkas型alternativeが $d\in L$ かつ $v^{\mathsf T}d>0$ を作り、$v\in L^\circ$ に矛盾する、という反証です。

<!-- proof-start -->
### 証明

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
<!-- proof-end -->


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

[前節のpolar coneの公式](#ref-polar-cone-formula)から

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

## 演習

### F0-02B-A01 射影からseparatorを作る

- Level: A
- 目安時間: 12分

$$
C=\{(x_1,x_2):x_1\le0\},\qquad z=(1,0)
$$

とする。$z$ の $C$ への最近点 $p$ を求め、$a=z-p$ を使って $C$ と $z$ を厳密に分離する不等式を書け。

<!-- solution-start -->
#### 詳細解答
最近点は $p=(0,0)$、従って $a=(1,0)$。任意の $x\in C$ で $a^Tx=x_1\le0=a^Tp$、一方 $a^Tz=1$。従って $a^Tx\le0<1=a^Tz$。
#### 本番答案
$p=(0,0)$、$a=(1,0)$。よって $x\in C$ なら $a^Tx\le0<1=a^Tz$。
#### 採点基準（20点）
- 最近点: 5点
- 法線: 5点
- 集合側の評価: 5点
- 厳密分離: 5点
<!-- solution-end -->

### F0-02B-B01 Farkas certificate

- Level: B
- 目安時間: 15分

$$
A=\begin{pmatrix}1\\1\end{pmatrix},\qquad
b=\begin{pmatrix}1\\-1\end{pmatrix}
$$

について $Ax=b,\ x\ge0$ が不可能であることを、Farkas certificate $y$ を具体的に構成して示せ。

<!-- solution-start -->
#### 詳細解答
$y=(1,-1)^T$ と取ると $A^Ty=1-1=0\le0$。一方 $b^Ty=1+1=2>0$。従ってFarkasの補題により非負解は存在しない。
#### 本番答案
$y=(1,-1)^T$ なら $A^Ty=0\le0$, $b^Ty=2>0$。従って $Ax=b,x\ge0$ は不可能。
#### 採点基準（20点）
- certificate候補: 5点
- $A^Ty\le0$: 6点
- $b^Ty>0$: 5点
- Farkasによる結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02B1 SVM・凸包・最大マージン](../F0_02B1_SVM_凸包_最大マージン/index.md)**

---

## 章末チェック

- 凸結合・凸集合・凸包・凸錐を定義できる。
- 閉凸集合への最近点から分離超平面を構成できる。
- 有限生成凸錐が閉である理由を説明できる。
- Farkasの補題を凸錐の分離から導ける。
- polar coneの公式がKKTの乗数表示へつながることを説明できる。
