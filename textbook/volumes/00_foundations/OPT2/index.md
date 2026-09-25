# OPT2 射影・支持超平面・分離・Farkas

<!-- definition-example-audit: strict -->

OPT1 では、凸性が「線分を集合内に残し、局所情報を大域情報へ変える」仕組みを整えました。本章では、その凸集合を **外側から見る** ことで、最適化・線形計画・ゲーム理論へ共通する分離の幾何を作ります。

中心となる流れは

$$
\boxed{
\text{閉凸集合への最近点射影}
\longrightarrow
\text{射影の変分不等式}
\longrightarrow
\text{支持・分離超平面}
\longrightarrow
\text{凸錐の分離}
\longrightarrow
\text{Farkas の補題}
}
$$

です。

---

## 1. 外の点から凸集合を見る

最初に単位円板

$$
C=\{x\in\mathbb R^2:\|x\|\le1\}
$$

と外側の点

$$
z=(2,0)
$$

を考えます。

$z$ に最も近い $C$ の点は

$$
p=(1,0)
$$

です。差ベクトル

$$
a=z-p=(1,0)
$$

は円板の外向き分離ベクトルになり、任意の $x=(x_1,x_2)\in C$ に対して

$$
a^{\mathsf T}x=x_1\le1
$$

です。一方

$$
a^{\mathsf T}z=2.
$$

したがって

$$
a^{\mathsf T}x\le1<2=a^{\mathsf T}z.
$$

つまり、**最近点を一つ見つければ、集合と外の点を線形な境界で分ける方向が自然に出てくる**わけです。

本章前半では、この2次元の絵を $\mathbb R^n$ の一般の閉凸集合へ拡張します。

---

## 2. 超平面と分離

<a id="def-opt2-hyperplane"></a>
<!-- formal-statement-start -->
> **定義（超平面）**  
> $a\in\mathbb R^n\setminus\{0\}$ と $\beta\in\mathbb R$ に対し
>
$$
H=\{x\in\mathbb R^n:a^{\mathsf T}x=\beta\}
$$
>
> と表される集合を **超平面** という。
<!-- formal-statement-end -->

<a id="def-opt2-separating-hyperplane"></a>
<!-- formal-statement-start -->
> **定義（点と集合を厳密に分離する超平面）**  
> 集合 $C\subset\mathbb R^n$ と点 $z\notin C$ に対し、$a\ne0$ と $\beta\in\mathbb R$ が
>
$$
a^{\mathsf T}x\le\beta<a^{\mathsf T}z
\qquad(\forall x\in C)
$$
>
> を満たすとき、$\{x:a^{\mathsf T}x=\beta\}$ は $C$ と $z$ を **厳密に分離する超平面** であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt2-hyperplane, def-opt2-separating-hyperplane -->
**定義の確認**：

$$
C=\{(x_1,x_2):x_1\le0\},
\qquad
z=(1,0)
$$

とします。

$$
a=(1,0),\qquad\beta=0
$$

と取ると、$x\in C$ なら

$$
a^{\mathsf T}x=x_1\le0=\beta,
$$

一方

$$
a^{\mathsf T}z=1>0.
$$

したがって

$$
H=\{x:x_1=0\}
$$

は定義どおり $C$ と $z$ を厳密に分離します。
<!-- definition-example-end -->

分離を「超平面がある」とだけ覚えると、なぜその分離ベクトルが存在するのかが見えません。次節から、分離ベクトルそのものを「集合内の最も近い点」から構成します。

---

## 3. 閉凸集合への最近点射影

<a id="def-opt2-nearest-point-projection"></a>
<!-- formal-statement-start -->
> **定義（最近点射影）**  
> 空でない集合 $C\subset\mathbb R^n$ と $z\in\mathbb R^n$ に対し、点 $p\in C$ が
>
$$
\|z-p\|
=
\inf_{x\in C}\|z-x\|
$$
>
> を満たすとき、$p$ を $z$ の $C$ への最近点という。最近点が一意であるとき、その点を
>
$$
P_C(z)
$$
>
> と書く。
<!-- formal-statement-end -->

定義だけでは、最近点の存在も一意性も保証されません。閉性と凸性がそれぞれ別の役割を持ちます。

<a id="thm-opt2-projection"></a>
<!-- formal-statement-start -->
> **定理（有限次元の閉凸集合への射影定理）**  
> $C\subset\mathbb R^n$ を空でない閉凸集合とする。このとき任意の $z\in\mathbb R^n$ に対し、最近点 $P_C(z)$ が一意に存在する。
<!-- formal-statement-end -->

### 3.1 存在：閉性と有限次元コンパクト性

### 証明の見取り図

距離の下限へ近づく点列を取り、その列を有界な閉球の中へ閉じ込めます。有限次元では閉有界集合がコンパクトなので収束部分列が取れ、閉性によって極限が $C$ から逃げません。

<!-- proof-start -->
### 証明：存在

$C$ は空でないので、ある $x_0\in C$ が存在し

$$
0\le
\delta:=\inf_{x\in C}\|z-x\|
\le
\|z-x_0\|
<\infty.
$$

したがって下限は有限です。下限の定義から、$x_k\in C$ を

$$
\|z-x_k\|\to\delta
$$

となるように取れます。

十分大きい $k$ では

$$
\|z-x_k\|\le\delta+1
$$

なので、列の後半は閉球

$$
\overline B(z,\delta+1)
$$

に入ります。

したがって $x_k$ の後半は

$$
C\cap\overline B(z,\delta+1)
$$

という閉有界集合に含まれます。[Heine--Borel 定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)により、この集合はコンパクトです。よって部分列 $x_{k_j}$ と点 $p$ が存在して

$$
x_{k_j}\to p.
$$

[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より、$C$ は閉なので $p\in C$ です。またノルムは連続だから

$$
\|z-p\|
=
\lim_{j\to\infty}\|z-x_{k_j}\|
=
\delta.
$$

よって最近点は存在します。$\square$
<!-- proof-end -->

ここでは **閉性** が極限 $p$ を集合内へ戻す役割を、**有限次元性** が閉有界集合のコンパクト性を保証する役割を持っています。

### 3.2 一意性：凸性

<!-- proof-start -->
### 証明：一意性

$p,q\in C$ がともに最近点で

$$
\|z-p\|=\|z-q\|=\delta
$$

とします。

$C$ は凸なので

$$
m=\frac{p+q}{2}\in C.
$$

内積を展開すると

$$
\left\|z-\frac{p+q}{2}\right\|^2
=
\frac12\|z-p\|^2
+
\frac12\|z-q\|^2
-
\frac14\|p-q\|^2.
$$

したがって

$$
\|z-m\|^2
=
\delta^2-\frac14\|p-q\|^2.
$$

もし $p\ne q$ なら右辺は $\delta^2$ より小さくなり、$\delta$ が最小距離であることに矛盾します。よって

$$
p=q.
$$

したがって最近点は一意です。$\square$
<!-- proof-end -->

### 3.3 直接例：半空間への射影

<!-- definition-example-start: def-opt2-nearest-point-projection -->
**定義の確認**：半空間への射影

$$
C=\{(x_1,x_2):x_1\le0\},
\qquad
z=(2,3)
$$

とします。

$C$ 内で $z$ に最も近づくには、第2成分は $3$ のままにし、第1成分だけ境界 $0$ まで戻せばよいので

$$
P_C(z)=(0,3).
$$

実際、任意の $x=(x_1,x_2)\in C$ に対し

$$
\|z-x\|^2
=
(2-x_1)^2+(3-x_2)^2
\ge
2^2+0^2
=
\|z-(0,3)\|^2.
$$

したがって定義を直接満たします。
<!-- definition-example-end -->

### 3.4 凸性を失うと一意性が壊れる

閉性だけでは最近点の一意性は保証されません。例えば

$$
C=\{-1,1\}\subset\mathbb R,
\qquad
z=0
$$

とすると、$C$ は閉ですが凸ではありません。そして

$$
|0-(-1)|=|0-1|=1
$$

なので、$-1$ と $1$ はどちらも最近点です。

したがって射影定理では

- **閉性・有限次元性**が最近点の存在を、
- **凸性**が最近点の一意性を

それぞれ担っています。

---

## 4. 射影の変分不等式

最近点 $p=P_C(z)$ では、$p$ から集合内へ少し動いても距離が減ってはいけません。その一次条件が分離ベクトルを作ります。

<a id="thm-opt2-projection-variational-inequality"></a>
<!-- formal-statement-start -->
> **定理（射影の変分不等式）**  
> $C\subset\mathbb R^n$ を空でない閉凸集合、$z\in\mathbb R^n$、$p\in C$ とする。このとき次は同値である。
>
> 1. $p=P_C(z)$。
> 2. 任意の $x\in C$ に対して
>
$$
(z-p)^{\mathsf T}(x-p)\le0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

凸性により

$$
p_t=p+t(x-p)
$$

は $0\le t\le1$ で $C$ に残ります。距離平方

$$
\phi(t)=\|z-p_t\|^2
$$

は $t=0$ で右側最小なので、右微分が非負です。

<!-- proof-start -->
### 証明

任意の $x\in C$ を固定します。$0\le t\le1$ に対し

$$
p_t=p+t(x-p).
$$

$C$ は凸なので $p_t\in C$ です。$p$ は最近点だから

$$
\phi(t)=\|z-p_t\|^2
$$

は $t=0$ で最小です。したがって

$$
\phi'(0+)\ge0.
$$

一方

$$
\begin{aligned}
\phi(t)
&=
\|z-p-t(x-p)\|^2\\
&=
\|z-p\|^2
-2t(z-p)^{\mathsf T}(x-p)
+t^2\|x-p\|^2.
\end{aligned}
$$

よって

$$
\phi'(0+)
=
-2(z-p)^{\mathsf T}(x-p).
$$

これが非負なので

$$
(z-p)^{\mathsf T}(x-p)\le0.
$$

これで 1 から 2 が示されました。

逆に 2 を仮定します。任意の $x\in C$ に対し

$$
\begin{aligned}
\|z-x\|^2
&=
\|(z-p)-(x-p)\|^2\\
&=
\|z-p\|^2
+\|x-p\|^2
-2(z-p)^{\mathsf T}(x-p).
\end{aligned}
$$

仮定より最後の内積は非正なので

$$
\|z-x\|^2
\ge
\|z-p\|^2.
$$

従って $p$ は $z$ に最も近い $C$ の点です。射影定理により最近点は一意なので

$$
p=P_C(z).
$$

以上で同値性が示されました。$\square$
<!-- proof-end -->

この不等式は

$$
z-p
$$

が $p$ における「外向き分離ベクトル」として働くことを意味します。

---

## 5. 点と閉凸集合の厳密分離

<a id="thm-opt2-point-separation"></a>
<!-- formal-statement-start -->
> **定理（点と閉凸集合の厳密分離）**  
> $C\subset\mathbb R^n$ を空でない閉凸集合、$z\notin C$ とする。このとき、ある $a\ne0$ と $\beta\in\mathbb R$ が存在して
>
$$
a^{\mathsf T}x\le\beta<a^{\mathsf T}z
\qquad(\forall x\in C)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最近点

$$
p=P_C(z)
$$

を取り、

$$
a=z-p
$$

と置きます。射影の変分不等式が集合側の上界を与え、$z$ では

$$
\|z-p\|^2>0
$$

の分だけ厳密に大きくなります。

<!-- proof-start -->
### 証明

$p=P_C(z)$ とし

$$
a=z-p
$$

と置きます。

$z\notin C$ なので $a\ne0$ です。[射影の変分不等式](#thm-opt2-projection-variational-inequality)より

$$
a^{\mathsf T}(x-p)\le0
\qquad(\forall x\in C).
$$

したがって

$$
a^{\mathsf T}x
\le
a^{\mathsf T}p.
$$

一方

$$
\begin{aligned}
a^{\mathsf T}z
&=
a^{\mathsf T}(p+a)\\
&=
a^{\mathsf T}p+\|a\|^2\\
&>
a^{\mathsf T}p.
\end{aligned}
$$

よって

$$
a^{\mathsf T}x
\le
a^{\mathsf T}p
<
a^{\mathsf T}z
\qquad(\forall x\in C).
$$

$\beta=a^{\mathsf T}p$ と置けば主張を得ます。$\square$
<!-- proof-end -->

### 5.1 閉性を失うと何が壊れるか

$$
C=\{(x_1,x_2):x_1<0\},
\qquad
z=(0,0)
$$

を考えます。

$C$ は凸ですが閉ではありません。$z\notin C$ であり、距離は

$$
\inf_{x\in C}\|z-x\|=0
$$

ですが、この距離を達成する $p\in C$ は存在しません。

さらに $C$ と $z$ の間に正の隙間を持つ厳密分離

$$
a^{\mathsf T}x\le\beta<a^{\mathsf T}z
$$

は作れません。実際、$C$ の点列 $x_k=(-1/k,0)$ は $z$ へ収束します。もし上の不等式が全ての $x\in C$ で成り立つなら

$$
a^{\mathsf T}x_k\le\beta
$$

で $k\to\infty$ として、内積の連続性から

$$
a^{\mathsf T}z\le\beta
$$

を得ます。これは $\beta<a^{\mathsf T}z$ に矛盾します。

つまり元の証明では

$$
\boxed{
\text{閉性}
\Rightarrow
\text{最近点の存在}
\Rightarrow
\text{正の距離}
\Rightarrow
\text{厳密分離}
}
$$

という機構が働いていました。

---

## 6. 支持超平面

外の点と集合を分けるだけでなく、凸集合の境界そのものを支える超平面も重要です。経済学では支持価格、最適化では劣勾配・法錐へつながります。

<a id="def-opt2-supporting-hyperplane"></a>
<!-- formal-statement-start -->
> **定義（支持超平面）**  
> 凸集合 $C\subset\mathbb R^n$ と境界点 $x_0\in\partial C$ に対し、$a\ne0$ と $\beta\in\mathbb R$ が
>
$$
a^{\mathsf T}x\le\beta
\qquad(\forall x\in C),
$$
>
$$
a^{\mathsf T}x_0=\beta
$$
>
> を満たすとき、$\{x:a^{\mathsf T}x=\beta\}$ を $C$ の $x_0$ における **支持超平面** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt2-supporting-hyperplane -->
**定義の確認**：単位円板

$$
C=\{x\in\mathbb R^2:\|x\|\le1\},
\qquad
x_0=(1,0)
$$

とします。

$$
a=(1,0),\qquad\beta=1
$$

なら、$x\in C$ に対して $x_1\le1$ なので

$$
a^{\mathsf T}x\le1.
$$

また

$$
a^{\mathsf T}x_0=1.
$$

したがって

$$
x_1=1
$$

は $x_0$ における支持超平面です。
<!-- definition-example-end -->

<a id="thm-opt2-supporting-hyperplane"></a>
<!-- formal-statement-start -->
> **定理（有限次元の支持超平面定理）**  
> $C\subset\mathbb R^n$ を非空閉凸集合、$x_0\in\partial C$ とする。このとき $C$ は $x_0$ において支持超平面を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

境界の外側から $x_0$ へ近づく点列 $z_k$ を取り、それぞれを $C$ へ射影します。各外向き分離ベクトルを単位化し、単位球面のコンパクト性で収束部分列を取ると、極限法線が $x_0$ で集合全体を支えます。

<!-- proof-start -->
### 証明

$C$ は閉集合なので $\partial C\subset C$ であり、特に $x_0\in C$ です。また $x_0\in\partial C$ なので、$C$ の外の点列 $z_k\notin C$ を

$$
z_k\to x_0
$$

となるように取れます。

各 $k$ について

$$
p_k=P_C(z_k)
$$

と置き、

$$
a_k
=
\frac{z_k-p_k}{\|z_k-p_k\|}
$$

とします。$z_k\notin C$ なので分母は正です。

[射影の変分不等式](#thm-opt2-projection-variational-inequality)から

$$
a_k^{\mathsf T}(x-p_k)\le0
\qquad(\forall x\in C).
$$

また $x_0\in C$ なので、最近点性から

$$
\|z_k-p_k\|
\le
\|z_k-x_0\|
\to0.
$$

したがって

$$
p_k\to x_0.
$$

各 $a_k$ は単位ベクトルです。有限次元の単位球面はコンパクトなので、部分列を取り

$$
a_k\to a,
\qquad
\|a\|=1
$$

とできます。

任意の固定した $x\in C$ に対し

$$
a_k^{\mathsf T}(x-p_k)\le0
$$

で極限を取ると

$$
a^{\mathsf T}(x-x_0)\le0.
$$

したがって

$$
a^{\mathsf T}x
\le
a^{\mathsf T}x_0
\qquad(\forall x\in C).
$$

$\|a\|=1$ なので $a\ne0$ です。よって

$$
\{x:a^{\mathsf T}x=a^{\mathsf T}x_0\}
$$

は $x_0$ における支持超平面です。$\square$
<!-- proof-end -->

---

## 7. 凸錐と有限次元の極錐

OPT1 で導入した凸錐は、この章の後半で「非負係数による表現可能性」を判定する道具になります。

<a id="def-opt2-polar-cone-finite"></a>
<!-- formal-statement-start -->
> **定義（有限次元の極錐）**  
> 錐 $K\subset\mathbb R^n$ に対し
>
$$
K^\circ
=
\{y\in\mathbb R^n:y^{\mathsf T}k\le0\ \forall k\in K\}
$$
>
> を $K$ の **極錐（polar cone）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt2-polar-cone-finite -->
**定義の確認**：非負直交錐

$$
K=\mathbb R_+^n
$$

とします。

$y\in K^\circ$ なら、各標準基底 $e_i\in K$ に対して

$$
y^{\mathsf T}e_i=y_i\le0.
$$

したがって $y\le0$ です。

逆に $y\le0$ なら、任意の $k\ge0$ に対し

$$
y^{\mathsf T}k\le0.
$$

よって

$$
(\mathbb R_+^n)^\circ=\mathbb R_-^n.
$$
<!-- definition-example-end -->

後続章では一般の双対空間上で極錐を定義します。本章では Farkas に必要な有限次元版だけを使います。

---

## 8. 閉凸錐の分離

一般の点と閉凸集合の分離を、凸錐に対して使うと式が原点を通る形へ簡約されます。

<a id="thm-opt2-cone-separation"></a>
<!-- formal-statement-start -->
> **定理（閉凸錐の分離）**  
> $K\subset\mathbb R^n$ を閉凸錐、$v\notin K$ とする。このとき、ある $d\in\mathbb R^n$ が存在して
>
$$
d^{\mathsf T}k\le0
\qquad(\forall k\in K),
$$
>
$$
d^{\mathsf T}v>0
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$p=P_K(v)$、$d=v-p$ と置きます。射影不等式に $0$ と $2p$ を代入すると

$$
d^{\mathsf T}p=0
$$

が得られます。これが凸錐特有の一手です。

<!-- proof-start -->
### 証明

$p=P_K(v)$、

$$
d=v-p
$$

と置きます。

[射影の変分不等式](#thm-opt2-projection-variational-inequality)から

$$
d^{\mathsf T}(k-p)\le0
\qquad(\forall k\in K).
$$

$K$ は錐なので

$$
0\in K,\qquad 2p\in K.
$$

$k=0$ を代入すると

$$
-d^{\mathsf T}p\le0,
$$

すなわち

$$
d^{\mathsf T}p\ge0.
$$

$k=2p$ を代入すると

$$
d^{\mathsf T}p\le0.
$$

したがって

$$
d^{\mathsf T}p=0.
$$

ゆえに任意の $k\in K$ に対して

$$
d^{\mathsf T}k\le0.
$$

また

$$
d^{\mathsf T}v
=
d^{\mathsf T}(p+d)
=
\|d\|^2.
$$

$v\notin K$ なので $d\ne0$、従って

$$
d^{\mathsf T}v>0.
$$

$\square$
<!-- proof-end -->

この $d$ は

$$
d\in K^\circ,
\qquad
d^{\mathsf T}v>0
$$

という **非包含の証明書** です。

---

## 9. 有限生成凸錐は閉である

線形不等式の実行可能性を判定する準備として、行列 $A$ の列 $a_1,\dots,a_m$ が生成する錐

$$
K=
\left\{
\sum_{j=1}^m\lambda_j a_j:
\lambda_j\ge0
\right\}
$$

を分離します。そのためには $K$ が閉であることが必要です。

<a id="def-opt2-finitely-generated-cone"></a>
<!-- formal-statement-start -->
> **定義（有限生成凸錐）**  
> 有限個のベクトル $a_1,\dots,a_m\in\mathbb R^n$ に対し
>
$$
\operatorname{cone}(a_1,\dots,a_m)
=
\left\{
\sum_{j=1}^m\lambda_j a_j:
\lambda_j\ge0
\right\}
$$
>
> と表される集合を **有限生成凸錐** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt2-finitely-generated-cone -->
**定義の確認**：

$$
a_1=(1,0),\qquad a_2=(0,1)
$$

なら

$$
\operatorname{cone}(a_1,a_2)
=
\{(\lambda_1,\lambda_2):\lambda_1,\lambda_2\ge0\}
=
\mathbb R_+^2.
$$

係数和を1に固定する凸包と異なり、ここでは非負係数の大きさに上限はありません。
<!-- definition-example-end -->

<a id="thm-opt2-finitely-generated-cone-closed"></a>
<!-- formal-statement-start -->
> **定理（有限生成凸錐の閉性）**  
> 有限個のベクトル $a_1,\dots,a_m\in\mathbb R^n$ が生成する凸錐
>
$$
K=
\left\{
\sum_{j=1}^m\lambda_j a_j:
\lambda_j\ge0
\right\}
$$
>
> は閉集合である。
<!-- formal-statement-end -->

### 証明の見取り図

係数列そのものは有界とは限りません。そこで各点の表示から線形従属な生成元を一つずつ消し、**線形独立な生成元だけを使う表示**へ落とします。有限個の部分集合しかないので、収束列の部分列では同じ生成元集合を使えます。そのとき係数は左逆行列で連続的に復元できます。

<!-- proof-start -->
### 証明

まず、任意の $k\in K$ は線形独立な生成元だけを使って表せることを示します。

$$
k=\sum_{j\in J}\lambda_j a_j,
\qquad
\lambda_j>0
$$

という表示で $\{a_j:j\in J\}$ が線形従属なら、係数 $c_j$ がすべて0ではなく

$$
\sum_{j\in J}c_j a_j=0
$$

となります。必要なら全体の符号を反転し、$c_j>0$ の成分が少なくとも一つあるようにします。

$$
t=
\min_{c_j>0}\frac{\lambda_j}{c_j}
$$

と置くと

$$
\lambda_j-tc_j\ge0
$$

で、少なくとも一つは0です。また

$$
\sum_{j\in J}(\lambda_j-tc_j)a_j
=
k.
$$

したがって使用する生成元を一つ以上減らせます。これを有限回繰り返すと、線形独立な生成元だけによる表示を得ます。

次に $k_r\in K$、$k_r\to k$ とします。

各 $k_r$ を線形独立な生成元の部分集合で表します。元の生成元は有限個なので、部分列を取れば、同じ線形独立集合

$$
a_{j_1},\dots,a_{j_s}
$$

を使うと仮定できます。

$$
M=(a_{j_1}\ \cdots\ a_{j_s})
$$

と置けば

$$
k_r=M\lambda_r,
\qquad
\lambda_r\ge0.
$$

$M$ の列は線形独立なので $M^{\mathsf T}M$ は正則で、

$$
\lambda_r
=
(M^{\mathsf T}M)^{-1}M^{\mathsf T}k_r.
$$

右辺は $k_r$ に連続に依存するため

$$
\lambda_r\to
\lambda=
(M^{\mathsf T}M)^{-1}M^{\mathsf T}k.
$$

各 $\lambda_r\ge0$ なので成分ごとの極限から $\lambda\ge0$ です。したがって

$$
k=M\lambda\in K.
$$

よって $K$ は閉です。$\square$
<!-- proof-end -->

ここで有限生成性は、「使う生成元の候補が有限個なので、同じ部分集合を使う部分列へ固定できる」という箇所で本質的に働いています。

---

## 10. Farkas の補題

行列

$$
A=(a_1\ \cdots\ a_m)\in\mathbb R^{n\times m}
$$

を考えます。

$$
Ax=b,\qquad x\ge0
$$

が解けるとは、

$$
b
=
\sum_{j=1}^m x_j a_j
$$

と $b$ を列ベクトルの非負結合で表せること、すなわち

$$
b\in\operatorname{cone}(a_1,\dots,a_m)
$$

という幾何学的条件です。

<a id="thm-opt2-farkas"></a>
<!-- formal-statement-start -->
> **補題（Farkas の補題）**  
> $A\in\mathbb R^{n\times m}$、$b\in\mathbb R^n$ とする。次の二つのうち、ちょうど一方が成立する。
>
> 1. ある $x\in\mathbb R^m$ が存在して
>
$$
Ax=b,\qquad x\ge0.
$$
>
> 2. ある $y\in\mathbb R^n$ が存在して
>
$$
A^{\mathsf T}y\le0,
\qquad
b^{\mathsf T}y>0.
$$
<!-- formal-statement-end -->

### 10.1 両方同時には成立しない

<!-- proof-start -->
### 証明：排他性

1 と 2 が同時に成立すると仮定します。すると

$$
b^{\mathsf T}y
=
(Ax)^{\mathsf T}y
=
x^{\mathsf T}A^{\mathsf T}y.
$$

$x\ge0$ かつ $A^{\mathsf T}y\le0$ なので

$$
x^{\mathsf T}A^{\mathsf T}y\le0.
$$

したがって

$$
b^{\mathsf T}y\le0,
$$

これは 2 の $b^{\mathsf T}y>0$ に矛盾します。$\square$
<!-- proof-end -->

### 10.2 少なくとも一方は成立する

### 証明の見取り図

列が生成する有限生成凸錐

$$
K=\{Ax:x\ge0\}
$$

を考えます。$b\in K$ なら 1 です。$b\notin K$ なら、[有限生成凸錐の閉性](#thm-opt2-finitely-generated-cone-closed)と[閉凸錐の分離](#thm-opt2-cone-separation)から証明書 $y$ が得られます。

<!-- proof-start -->
### 証明：完全性

$$
K=\{Ax:x\ge0\}
$$

と置きます。これは $A$ の列ベクトルが生成する有限生成凸錐なので、[有限生成凸錐の閉性](#thm-opt2-finitely-generated-cone-closed)により閉凸錐です。

$b\in K$ なら、定義からある $x\ge0$ が存在して

$$
Ax=b
$$

となり、1 が成立します。

$b\notin K$ とします。[閉凸錐の分離](#thm-opt2-cone-separation)により、ある $y$ が存在して

$$
y^{\mathsf T}k\le0
\qquad(\forall k\in K),
$$

$$
y^{\mathsf T}b>0.
$$

各列 $a_j$ は $K$ に属するので

$$
y^{\mathsf T}a_j\le0
\qquad(j=1,\dots,m).
$$

これは

$$
A^{\mathsf T}y\le0
$$

と同値です。また

$$
b^{\mathsf T}y>0.
$$

したがって 2 が成立します。排他性と合わせて、ちょうど一方が成立します。$\square$
<!-- proof-end -->

Farkas の補題は

$$
\boxed{
\text{有限生成凸錐の分離}
\quad\Longleftrightarrow\quad
\text{線形等式＋非負制約の可解性証明}
}
$$

という対応です。

### 10.3 直接例：実行不能性の証明書

$$
A=I_2,
\qquad
b=
\begin{pmatrix}
-1\\
1
\end{pmatrix}
$$

とします。

$Ax=b$ なら $x=b$ しかありませんが、第1成分が負なので $x\ge0$ は不可能です。

そこで

$$
y=
\begin{pmatrix}
-1\\
0
\end{pmatrix}
$$

を取ると

$$
A^{\mathsf T}y
=
\begin{pmatrix}
-1\\
0
\end{pmatrix}
\le0,
$$

かつ

$$
b^{\mathsf T}y=1>0.
$$

この $y$ は、非負解が存在しないことを一つの内積不等式で示す **証明書** です。

---

## 11. Farkas を二者択一の定理として読む

Farkas の補題では、

- 「非負係数で $b$ を作れる」
- 「それが不可能だと証明する $y$ がある」

のどちらか一方が必ず成立します。

したがってこれは **二者択一の定理（theorem of alternatives）** の代表例です。

重要なのは、不可能性が単なる「解が見つからない」ではなく、

$$
A^{\mathsf T}y\le0,
\qquad
b^{\mathsf T}y>0
$$

という有限個の線形不等式で **検証可能な証明書** を持つことです。

この構造は後続の

- 線形計画双対
- KKT 乗数
- minimax
- 協力ゲームの core
- 支持価格

で何度も再登場します。

---

## 12. 射影・分離・Farkas の役割をまとめる

本章の流れを、仮定が何を可能にしたかまで含めて整理します。

$$
\boxed{
\begin{array}{c}
C\text{ が閉}\\
\Downarrow\\
\text{極限が }C\text{ から逃げない}\\
\Downarrow\\
\text{最近点の存在}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
C\text{ が凸}\\
\Downarrow\\
\text{最近点の一意性}\\
\text{射影方向への一次変分が使える}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
\text{射影の変分不等式}\\
\Downarrow\\
\text{外向き分離ベクトル}\\
\Downarrow\\
\text{点と閉凸集合の厳密分離}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
K\text{ が凸錐}\\
\Downarrow\\
0,2p\in K\\
\Downarrow\\
\text{分離超平面を原点通過形へ正規化}
\end{array}
}
$$

$$
\boxed{
\begin{array}{c}
K=\operatorname{cone}(a_1,\dots,a_m)\text{ が有限生成}\\
\Downarrow\\
K\text{ が閉}\\
\Downarrow\\
\text{Farkas の証明書が存在}
\end{array}
}
$$

---

## 13. 演習 Level A

<a id="ex-opt2-a01"></a>
### OPT2-A01 半空間への射影

- Level: A

$$
C=\{(x_1,x_2):x_1\le1\},
\qquad
z=(4,-2)
$$

とする。

1. $P_C(z)$ を求めよ。
2. $a=z-P_C(z)$ を求めよ。
3. $a$ を使って $C$ と $z$ を厳密に分離する不等式を書け。

<!-- solution-start -->
#### 詳細解答

$z$ は第1成分だけ制約 $x_1\le1$ を破っています。第2成分には制約がないので、最短距離にするには第2成分を $-2$ のままにし、第1成分だけ境界 $1$ へ戻します。

したがって

$$
p=P_C(z)=(1,-2).
$$

よって

$$
a=z-p=(3,0).
$$

任意の $x=(x_1,x_2)\in C$ に対して

$$
a^{\mathsf T}x=3x_1\le3.
$$

一方

$$
a^{\mathsf T}z=12.
$$

したがって

$$
a^{\mathsf T}x\le3<12=a^{\mathsf T}z.
$$

よって超平面

$$
a^{\mathsf T}x=3
$$

すなわち $x_1=1$ が $C$ と $z$ を厳密に分離します。
<!-- solution-end -->

<a id="ex-opt2-a02"></a>
### OPT2-A02 射影の変分不等式を検算する

- Level: A

$$
C=\mathbb R_+^2,
\qquad
z=(-1,2)
$$

とする。

1. $p=P_C(z)$ を求めよ。
2. 任意の $x=(x_1,x_2)\in C$ に対し
   $$
   (z-p)^{\mathsf T}(x-p)\le0
   $$
   を直接確認せよ。
3. 射影の変分不等式の逆向きを使い、この不等式だけから $p=P_C(z)$ を再確認せよ。

<!-- solution-start -->
#### 詳細解答

第2成分 $2$ はすでに非負なのでそのままにし、第1成分 $-1$ を境界 $0$ へ戻せば最短です。したがって

$$
p=(0,2).
$$

よって

$$
z-p=(-1,0).
$$

任意の $x=(x_1,x_2)\in C$ では $x_1\ge0$ なので

$$
\begin{aligned}
(z-p)^{\mathsf T}(x-p)
&=
(-1,0)
\begin{pmatrix}
x_1\\
x_2-2
\end{pmatrix}\\
&=
-x_1\\
&\le0.
\end{aligned}
$$

したがって変分不等式を直接確認できました。

さらに $p\in C$ で、全ての $x\in C$ に対してこの変分不等式が成立しています。射影の変分不等式の逆向きから

$$
\|z-x\|^2
\ge
\|z-p\|^2
\qquad(\forall x\in C)
$$

が従うので、$p$ は最近点、すなわち

$$
\boxed{p=P_C(z)}
$$

です。
<!-- solution-end -->

<a id="ex-opt2-a03"></a>
### OPT2-A03 極錐を求める

- Level: A

$$
K=\{(t,0):t\ge0\}\subset\mathbb R^2
$$

の極錐 $K^\circ$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$y=(y_1,y_2)\in K^\circ$ である条件は、任意の $t\ge0$ に対し

$$
y^{\mathsf T}(t,0)=ty_1\le0
$$

となることです。

$t$ は任意の非負数なので、これは

$$
y_1\le0
$$

と同値です。$y_2$ には制約がありません。

したがって

$$
\boxed{
K^\circ
=
\{(y_1,y_2):y_1\le0\}
}.
$$
<!-- solution-end -->

<a id="ex-opt2-a04"></a>
### OPT2-A04 Farkas の証明書を検算する

- Level: A

$$
A=
\begin{pmatrix}
1\\
1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\
-1
\end{pmatrix}
$$

とする。

$$
y=
\begin{pmatrix}
1\\
-1
\end{pmatrix}
$$

が $Ax=b,\ x\ge0$ の実行不能性を証明する Farkas の証明書であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$A$ は $2\times1$ 行列なので

$$
A^{\mathsf T}y
=
(1,1)
\begin{pmatrix}
1\\
-1
\end{pmatrix}
=
0.
$$

したがって

$$
A^{\mathsf T}y\le0.
$$

また

$$
b^{\mathsf T}y
=
(1,-1)
\begin{pmatrix}
1\\
-1
\end{pmatrix}
=
2>0.
$$

よって Farkas の補題の第2条件を満たします。したがって

$$
Ax=b,\qquad x\ge0
$$

を満たす $x$ は存在しません。
<!-- solution-end -->

---

## 14. 演習 Level B

<a id="ex-opt2-b01"></a>
### OPT2-B01 [射影の変分不等式](#thm-opt2-projection-variational-inequality)から分離を再構成する

- Level: B

$C\subset\mathbb R^n$ を空でない閉凸集合、$z\notin C$、$p=P_C(z)$ とする。

射影の変分不等式だけを出発点として

$$
a=z-p
$$

が

$$
a^{\mathsf T}x
\le
a^{\mathsf T}p
<
a^{\mathsf T}z
\qquad(\forall x\in C)
$$

を満たすことを示せ。

<!-- solution-start -->
#### 詳細解答

[射影の変分不等式](#thm-opt2-projection-variational-inequality)から、任意の $x\in C$ に対し

$$
(z-p)^{\mathsf T}(x-p)\le0.
$$

$a=z-p$ と置けば

$$
a^{\mathsf T}x-a^{\mathsf T}p\le0,
$$

したがって

$$
a^{\mathsf T}x\le a^{\mathsf T}p.
$$

次に

$$
z=p+a
$$

なので

$$
a^{\mathsf T}z
=
a^{\mathsf T}p+\|a\|^2.
$$

$z\notin C$ で $p\in C$ だから $z\ne p$、従って $a\ne0$ です。よって

$$
\|a\|^2>0.
$$

したがって

$$
a^{\mathsf T}p<a^{\mathsf T}z.
$$

以上を合わせて

$$
a^{\mathsf T}x
\le
a^{\mathsf T}p
<
a^{\mathsf T}z
\qquad(\forall x\in C)
$$

を得ます。
<!-- solution-end -->

<a id="ex-opt2-b02"></a>
### OPT2-B02 有限生成凸錐の閉性で有限性が使われる場所

- Level: B

有限生成凸錐の閉性の証明を読み、次を説明せよ。

1. なぜ各点の表示を線形独立な生成元だけに減らせるのか。
2. なぜ「生成元が有限個」であることから、収束列の部分列で同じ生成元集合を使えるのか。
3. 同じ生成元集合へ固定したあと、なぜ係数列の極限を取れるのか。

<!-- solution-start -->
#### 詳細解答

1. 使用中の生成元が線形従属なら
   $$
   \sum_j c_j a_j=0
   $$
   となる非自明な係数列があります。正の $c_j$ に対し
   $$
   t=\min_{c_j>0}\frac{\lambda_j}{c_j}
   $$
   と置けば、係数 $\lambda_j-tc_j$ を非負に保ったまま少なくとも一つを0にできます。したがって同じ点を、より少ない生成元で表せます。有限回繰り返せば線形独立になります。

2. 元の生成元が $m$ 個なら、その部分集合は高々 $2^m$ 個しかありません。各 $k_r$ がどの部分集合を使うかには有限個の可能性しかないので、無限列から同じ部分集合を使う無限部分列を選べます。

3. 同じ線形独立な列を並べた行列を $M$ とすると
   $$
   k_r=M\lambda_r.
   $$
   列独立性により $M^{\mathsf T}M$ は正則で
   $$
   \lambda_r=(M^{\mathsf T}M)^{-1}M^{\mathsf T}k_r.
   $$
   右辺は $k_r$ の連続な線形写像なので、$k_r\to k$ から
   $$
   \lambda_r\to(M^{\mathsf T}M)^{-1}M^{\mathsf T}k.
   $$
   各 $\lambda_r\ge0$ なので極限も非負です。

この三段階により、極限点 $k$ も同じ錐内へ戻ります。
<!-- solution-end -->

<a id="ex-opt2-b03"></a>
### OPT2-B03 Farkas の補題を幾何に翻訳する

- Level: B

$$
A=
\begin{pmatrix}
1&0\\
0&1\\
1&1
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
$$

とする。

1. $Ax=b,\ x\ge0$ が解を持たないことを直接確認せよ。
2. Farkas の証明書 $y$ を一つ構成せよ。
3. その $y$ が、$b$ と $A$ の列が生成する錐を分離していることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$x=(x_1,x_2)^{\mathsf T}$ とすると

$$
Ax=
\begin{pmatrix}
x_1\\
x_2\\
x_1+x_2
\end{pmatrix}.
$$

$Ax=b$ なら第1・第2成分から

$$
x_1=1,\qquad x_2=1.
$$

しかしそのとき第3成分は

$$
x_1+x_2=2
$$

となり、$b_3=1$ と一致しません。したがって解は存在しません。非負条件以前に線形方程式が両立しません。

次に Farkas の証明書を構成します。$y=(y_1,y_2,y_3)^{\mathsf T}$ とすると

$$
A^{\mathsf T}y
=
\begin{pmatrix}
y_1+y_3\\
y_2+y_3
\end{pmatrix}.
$$

列が生成する錐を原点の非正側へ置くため、まず境界上に来るよう

$$
y_1+y_3=0,
\qquad
y_2+y_3=0
$$

と置きます。すると $y_1=y_2=-y_3$ です。$b$ に対して正にしたいので

$$
b^{\mathsf T}y
=
y_1+y_2+y_3
=
-y_3
>0
$$

となるよう $y_3=-1$ と選べば

$$
\boxed{
y=(1,1,-1)^{\mathsf T}
}
$$

を得ます。このとき

$$
A^{\mathsf T}y
=
\begin{pmatrix}
0\\
0
\end{pmatrix}
\le0,
\qquad
b^{\mathsf T}y=1>0.
$$

任意の $k=Ax$、$x\ge0$ に対して

$$
y^{\mathsf T}k
=
x^{\mathsf T}A^{\mathsf T}y
\le0.
$$

一方

$$
y^{\mathsf T}b=1>0.
$$

よって超平面 $y^{\mathsf T}u=0$ は、列が生成する錐を非正側へ、$b$ を正側へ置き、両者を分離しています。
<!-- solution-end -->

---

## 15. 演習 Level C

<a id="ex-opt2-c01"></a>
### OPT2-C01 分離から Farkas までを一周する

- Level: C

行列

$$
A=
\begin{pmatrix}
1&0&1\\
0&1&1
\end{pmatrix}
$$

の列が生成する凸錐

$$
K=\{Ax:x\ge0\}
$$

を考える。

1. $K=\mathbb R_+^2$ であることを示せ。
2. $b=(-1,2)^{\mathsf T}$ が $K$ に属さないことを示せ。
3. $b$ の $K$ への射影 $p$ を求めよ。
4. $d=b-p$ が閉凸錐の分離定理の証明書になることを確認せよ。
5. この $d$ を Farkas の補題の $y$ として使い、
   $$
   A^{\mathsf T}y\le0,\qquad b^{\mathsf T}y>0
   $$
   を確認せよ。
6. この例で「射影→分離→Farkas」が同じベクトルを通じてつながることを説明せよ。

<!-- solution-start -->
#### 詳細解答

$A$ の列は

$$
a_1=(1,0)^{\mathsf T},
\qquad
a_2=(0,1)^{\mathsf T},
\qquad
a_3=(1,1)^{\mathsf T}.
$$

まず $a_1,a_2$ だけで任意の $(u,v)$、$u,v\ge0$ を

$$
(u,v)=u a_1+v a_2
$$

と表せます。したがって

$$
\mathbb R_+^2\subset K.
$$

逆に3本の列はすべて $\mathbb R_+^2$ に属し、非負結合も各成分非負なので

$$
K\subset\mathbb R_+^2.
$$

よって

$$
K=\mathbb R_+^2.
$$

次に

$$
b=(-1,2)^{\mathsf T}
$$

は第1成分が負なので $K$ に属しません。

$\mathbb R_+^2$ への最近点を確認します。任意の $k=(k_1,k_2)\in\mathbb R_+^2$ に対して

$$
\begin{aligned}
\|b-k\|^2
&=(-1-k_1)^2+(2-k_2)^2\\
&=(1+k_1)^2+(2-k_2)^2\\
&\ge1.
\end{aligned}
$$

等号は $k_1=0$, $k_2=2$ で成立するので

$$
p=P_K(b)=(0,2)^{\mathsf T}.
$$

したがって

$$
d=b-p=(-1,0)^{\mathsf T}.
$$

任意の $k=(k_1,k_2)\in K$ では $k_1\ge0$ なので

$$
d^{\mathsf T}k=-k_1\le0.
$$

一方

$$
d^{\mathsf T}b
=
(-1,0)
\begin{pmatrix}
-1\\2
\end{pmatrix}
=
1>0.
$$

よって $d$ は $K$ と $b$ を原点通過超平面で分離する証明書です。

次に $y=d$ と置きます。

$$
A^{\mathsf T}y
=
\begin{pmatrix}
1&0\\
0&1\\
1&1
\end{pmatrix}
\begin{pmatrix}
-1\\
0
\end{pmatrix}
=
\begin{pmatrix}
-1\\
0\\
-1
\end{pmatrix}
\le0.
$$

また

$$
b^{\mathsf T}y=1>0.
$$

したがって $y=d$ は Farkas の証明書でもあります。

この例では

$$
\boxed{
p=P_K(b)
\longrightarrow
d=b-p
\longrightarrow
d\in K^\circ
\longrightarrow
A^{\mathsf T}d\le0
}
$$

という一本の流れになっています。

つまり、Farkas の乗数ベクトルは突然現れた代数技巧ではなく、**表現不能な点を有限生成凸錐から分離する分離ベクトル**そのものです。
<!-- solution-end -->

---

## 16. 次に進む

本章で、凸集合の外側から分離ベクトルを作り、その法線を線形不等式の実行不能性証明書へ変換しました。

次の OPT3 では、関数を拡張実数値関数として扱い、epigraph・下半連続性・劣勾配・劣微分・法錐へ進みます。そこで本章の支持超平面が、関数の一次下界と最適性条件へ読み替えられます。
