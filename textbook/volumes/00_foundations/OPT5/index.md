# OPT5 Lagrange 双対・Slater 条件・KKT

<!-- definition-example-audit: strict -->

OPT4 では共役関数を使って双対問題を作りました。本章では、有限個の凸不等式制約と affine 等式制約を

$$
\min_{x\in\mathbb R^n} f(x)
\quad\text{subject to}\quad
g_i(x)\le0\ (i=1,\dots,m),\qquad Ax=b
$$

という標準形にそろえ、**Lagrangian → 双対関数 → 弱双対性 → Slater 条件 → 強双対性 → KKT 条件**を一つの流れとして閉じます。

> **この章の停止線**
>
> 接錐と制約の一次近似から KKT 乗数の存在を導く幾何学的議論、LICQ・MFCQ は OPT6 の担当です。本章では凸問題に対する Slater 条件を使い、KKT を必要十分条件として使えるところまで進みます。

---

## 1. なぜ制約を目的関数へ移すのか

実行可能点だけを直接探す代わりに、制約違反へ「価格」を付けます。不等式制約 $g_i(x)\le0$ の価格を $\lambda_i\ge0$、等式制約 $Ax=b$ の価格を $\nu\in\mathbb R^r$ とすると、

$$
f(x)+\sum_{i=1}^m\lambda_i g_i(x)+\nu^{\mathsf T}(Ax-b)
$$

が現れます。実行可能な $x$ では $\lambda_i g_i(x)\le0$、等式項は0なので、この量を $x$ について最小化すれば主問題の最適値に対する下界が得られます。

この「制約に価格を付けて下界を作る」操作が Lagrange 双対です。

---

## 2. Lagrangian と双対関数

<a id="def-opt5-lagrangian"></a>
<!-- formal-statement-start -->
> **定義（Lagrangian）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$、$A\in\mathbb R^{r\times n}$、$b\in\mathbb R^r$ に対する制約付き最小化問題
>
$$
\min_x f(x)
\quad\text{subject to}\quad
g_i(x)\le0\ (i=1,\dots,m),\qquad Ax=b
$$
>
> を考える。$\lambda\in\mathbb R_+^m$、$\nu\in\mathbb R^r$ に対して
>
$$
L(x,\lambda,\nu)
=
f(x)+\sum_{i=1}^m\lambda_i g_i(x)+\nu^{\mathsf T}(Ax-b)
$$
>
> をこの問題の **Lagrangian** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-lagrangian -->
**定義の確認**：境界で止まる二次関数

$$
\min_x (x-2)^2
\quad\text{subject to}\quad x\le1
$$

では $g(x)=x-1$ と置くので

$$
L(x,\lambda)=(x-2)^2+\lambda(x-1),\qquad\lambda\ge0.
$$

不等式を $x\le1$ のまま眺めるのではなく、$g(x)\le0$ に統一した符号が $\lambda\ge0$ と組になっていることが重要です。
<!-- definition-example-end -->

<a id="def-opt5-dual-function"></a>
<!-- formal-statement-start -->
> **定義（双対関数）**  
> 上の Lagrangian に対し
>
$$
q(\lambda,\nu)=\inf_{x\in\mathbb R^n}L(x,\lambda,\nu)
$$
>
> を **双対関数** という。
<!-- formal-statement-end -->

<a id="def-opt5-primal-dual"></a>
<!-- formal-statement-start -->
> **定義（主問題・Lagrange 双対問題）**  
> 元の制約付き最小化問題を **主問題** といい、その最適値を $p^*$ とする。双対関数を用いた
>
$$
\sup_{\lambda\ge0,\,\nu\in\mathbb R^r}q(\lambda,\nu)
$$
>
> を **Lagrange 双対問題** といい、その最適値を $d^*$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-dual-function, def-opt5-primal-dual -->
**定義の確認**：同じ1変数問題で双対まで計算する

上の例では

$$
\frac{\partial L}{\partial x}=2(x-2)+\lambda=0
$$

より $x=2-\lambda/2$ で infimum を達成します。代入すると

$$
q(\lambda)=\lambda-\frac{\lambda^2}{4},\qquad\lambda\ge0.
$$

双対問題はこの凹二次関数の最大化で、$\lambda^*=2$、$d^*=1$。主問題も $x^*=1$、$p^*=1$ なので、この例では双対ギャップが0です。
<!-- definition-example-end -->

---

## 3. 弱双対性は凸性を必要としない

<a id="thm-opt5-weak-duality"></a>
<!-- formal-statement-start -->
> **定理（Lagrange 双対の弱双対性）**  
> 上の主問題について、$x$ が主実行可能、$(\lambda,\nu)$ が $\lambda\ge0$ を満たすなら
>
$$
q(\lambda,\nu)\le f(x).
$$
>
> 従って常に
>
$$
\boxed{d^*\le p^*}
$$
>
> が成り立つ。この結論には $f,g_i$ の凸性を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

双対関数は $L$ の全 $x$ にわたる下限なので $q\le L(x,\lambda,\nu)$。一方、実行可能点では $g_i(x)\le0$ と $\lambda_i\ge0$ により Lagrangian は $f(x)$ 以下です。

<!-- proof-start -->
### 証明

$x$ が実行可能なら $g_i(x)\le0$、$Ax=b$ です。従って

$$
L(x,\lambda,\nu)
=
f(x)+\sum_i\lambda_i g_i(x)
\le f(x).
$$

また双対関数の定義から

$$
q(\lambda,\nu)
=
\inf_z L(z,\lambda,\nu)
\le L(x,\lambda,\nu).
$$

よって $q(\lambda,\nu)\le f(x)$。任意の主実行可能 $x$ と双対実行可能 $(\lambda,\nu)$ について成立するので、左辺の上限と右辺の下限を取れば $d^*\le p^*$ です。$\square$
<!-- proof-end -->

---

## 4. Slater 条件：強双対性を支える内部点

凸問題でも、強双対性を無条件に期待してはいけません。制約集合が退化していると、支持超平面を「有限の乗数」として取り出す議論が壊れることがあります。その代表が Slater 条件です。

<a id="def-opt5-slater"></a>
<!-- formal-statement-start -->
> **定義（Slater 条件）**  
> $f,g_1,\dots,g_m$ を凸関数、等式制約を $Ax=b$ とする凸最適化問題を考える。ある $\bar x\in\operatorname{ri}(\operatorname{dom}f\cap\bigcap_i\operatorname{dom}g_i)$ が存在して
>
$$
g_i(\bar x)<0\qquad(i=1,\dots,m),\qquad A\bar x=b
$$
>
> を満たすとき、この問題は **Slater 条件**を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-slater -->
**定義の確認**：厳密実行可能点を実際に入れる

$$
\min_x x^2
\quad\text{subject to}\quad x-1\le0
$$

では $\bar x=0$ と取ると

$$
g(0)=-1<0.
$$

従って Slater 条件を満たします。境界点 $x=1$ が存在するだけではなく、制約を厳密に満たす点があることを確認しています。
<!-- definition-example-end -->

<a id="thm-opt5-slater-strong-duality"></a>
<!-- formal-statement-start -->
> **定理（Slater 条件下の強双対性）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to(-\infty,+\infty]$ を閉真凸関数とし、等式制約を $Ax=b$ とする。主問題の最適値が有限で、Slater 条件を満たすなら、Lagrange 双対問題は最適解を持ち、
>
$$
\boxed{d^*=p^*}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

OPT2 の分離定理を使います。目的値と制約違反を同時に記録する凸集合を作り、最適値より真に低い点から分離します。Slater 条件は、分離超平面の「目的値方向の係数」が0になる退化を排除します。正規化すると残りの係数が Lagrange 乗数になります。

<!-- proof-start -->
### 証明

主問題の最適値を $p^*$ とし、

$$
\mathcal C=
\left\{
(u,v,t):
\begin{array}{l}
\exists x\in\operatorname{dom}f\text{ such that}\\
g_i(x)\le u_i\ (i=1,\dots,m),\\
Ax-b=v,\quad f(x)\le t
\end{array}
\right\}
$$

を考えます。凸性から $\mathcal C$ は凸です。任意の $\varepsilon>0$ に対して $(0,0,p^*-\varepsilon)\notin\mathcal C$ なので、分離定理により非零の $(\lambda,\nu,\mu)$ が存在し、$\mathcal C$ とこの点を分離できます。

$u$ は各成分を上へ自由に増やせるため、分離係数は $\lambda\ge0$。$t$ も上へ自由に増やせるため $\mu\ge0$ です。Slater 点 $\bar x$ ではすべての不等式に厳密な余裕があります。この余裕を分離不等式へ入れると、$\mu=0$ なら $\lambda=0$ が強制され、さらに等式方向を動かす分離関係から $\nu=0$ となり、分離ベクトルが非零であることに反します。従って $\mu>0$ です。

$\mu=1$ となるよう正規化すると、分離不等式から任意の $x$ に対して

$$
f(x)+\sum_i\lambda_i g_i(x)+\nu^{\mathsf T}(Ax-b)\ge p^*.
$$

従って

$$
q(\lambda,\nu)\ge p^*.
$$

弱双対性から常に $q(\lambda,\nu)\le p^*$ なので等号が成立し、この $(\lambda,\nu)$ は双対最適解です。よって $d^*=p^*$。$\square$
<!-- proof-end -->

> **仮定が働いた場所**  
> 凸性は $\mathcal C$ を凸にして分離定理を使えるようにし、Slater の厳密不等式は $\mu=0$ という退化した分離を排除しました。ここが「内部点があるとなぜ強双対になるのか」の核心です。

---

## 5. KKT 条件

以下では $f,g_i$ が微分可能な場合をまず扱います。非滑らかな場合は勾配を OPT3 の劣微分に置き換えます。

<a id="thm-opt5-kkt"></a>
<!-- formal-statement-start -->
> **定理（凸問題の KKT 条件）**  
> $f,g_1,\dots,g_m:\mathbb R^n\to\mathbb R$ を微分可能な凸関数とし、$A\in\mathbb R^{r\times n}$、$b\in\mathbb R^r$ とする。問題
>
$$
\min_x f(x)
\quad\text{subject to}\quad
g_i(x)\le0,\qquad Ax=b
$$
>
> が Slater 条件を満たすとする。このとき $x^*$ が主最適解であることと、ある $\lambda^*\ge0$、$\nu^*\in\mathbb R^r$ が存在して次の4条件を満たすことは同値である。
>
> 1. **主実行可能性**
>    $$
>    g_i(x^*)\le0,\qquad Ax^*=b.
>    $$
> 2. **双対実行可能性**
>    $$
>    \lambda_i^*\ge0.
>    $$
> 3. **停留条件**
>    $$
>    \nabla f(x^*)+\sum_i\lambda_i^*\nabla g_i(x^*)+A^{\mathsf T}\nu^*=0.
>    $$
> 4. **相補性**
>    $$
>    \lambda_i^*g_i(x^*)=0\qquad(i=1,\dots,m).
>    $$
<!-- formal-statement-end -->

### 証明の見取り図

必要性は Slater による強双対性から得ます。主・双対最適値が一致すると、実行可能点で常に非正だった $\sum_i\lambda_i g_i(x)$ の総和が0になり、各項が非正なので一つずつ0、すなわち相補性が出ます。また $x^*$ は $L(\cdot,\lambda^*,\nu^*)$ を最小化するため停留条件が出ます。

十分性では逆に、KKT の4条件から $x^*$ が Lagrangian を大域的に最小化することを凸性で示し、弱双対性の下界と主目的値が一致することを確認します。

<!-- proof-start -->
### 証明

まず $x^*$ が主最適解とします。[Slater 条件下の強双対性](#thm-opt5-slater-strong-duality)により双対最適解 $(\lambda^*,\nu^*)$ が存在し、

$$
p^*=d^*=q(\lambda^*,\nu^*)
$$

です。一方、主実行可能性から

$$
L(x^*,\lambda^*,\nu^*)
=
f(x^*)+\sum_i\lambda_i^*g_i(x^*)
\le f(x^*)=p^*.
$$

また $q$ は $L$ の下限なので

$$
q(\lambda^*,\nu^*)\le L(x^*,\lambda^*,\nu^*).
$$

両端がともに $p^*$ だからすべて等号です。従って

$$
\sum_i\lambda_i^*g_i(x^*)=0.
$$

各項は $\lambda_i^*\ge0$、$g_i(x^*)\le0$ により非正なので、各 $i$ で $\lambda_i^*g_i(x^*)=0$。また $x^*$ は $L(\cdot,\lambda^*,\nu^*)$ の最小点です。$L$ は微分可能な凸関数なので

$$
\nabla_xL(x^*,\lambda^*,\nu^*)=0,
$$

すなわち停留条件が得られます。

逆に4条件を満たす $(x^*,\lambda^*,\nu^*)$ があるとします。$L(\cdot,\lambda^*,\nu^*)$ は凸で、停留条件から $x^*$ はその大域最小点です。従って

$$
q(\lambda^*,\nu^*)=L(x^*,\lambda^*,\nu^*).
$$

主実行可能性と相補性から

$$
L(x^*,\lambda^*,\nu^*)=f(x^*).
$$

よって $q(\lambda^*,\nu^*)=f(x^*)$。弱双対性では任意の主実行可能 $x$ に対して

$$
q(\lambda^*,\nu^*)\le f(x)
$$

なので $f(x^*)\le f(x)$。従って $x^*$ は主最適解です。$\square$
<!-- proof-end -->

### 5.1 非滑らかな凸問題

$f,g_i$ が凸だが微分可能とは限らない場合、停留条件は

$$
0\in
\partial f(x^*)
+
\sum_i\lambda_i^*\partial g_i(x^*)
+
A^{\mathsf T}\nu^*
$$

と書きます。ここで集合の和は Minkowski 和です。OPT3 の劣微分和則を使うための条件を確認した上で適用します。

---

## 6. 相補性は「効いていない制約の価格は0」

<a id="def-opt5-active-constraint"></a>
<!-- formal-statement-start -->
> **定義（活性制約）**  
> 不等式制約 $g_i(x)\le0$ が実行可能点 $x$ で
>
$$
g_i(x)=0
$$
>
> を満たすとき、その制約を $x$ における **活性制約**という。$g_i(x)<0$ のときは非活性という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt5-active-constraint -->
**定義の確認**：二つの上限制約

$x^*=1$ に対して

$$
g_1(x)=x-1,\qquad g_2(x)=x-3
$$

なら $g_1(1)=0$ なので第1制約は活性、$g_2(1)=-2<0$ なので第2制約は非活性です。相補性から第2制約に対応する最適乗数は必ず $\lambda_2^*=0$ です。
<!-- definition-example-end -->

相補性

$$
\lambda_i^*g_i(x^*)=0
$$

は、$g_i(x^*)<0$ なら $\lambda_i^*=0$ を意味します。逆に $\lambda_i^*>0$ なら必ず $g_i(x^*)=0$ です。ただし **活性だから乗数が必ず正**とは限りません。活性制約でも $\lambda_i^*=0$ はあり得ます。

---

## 7. KKT を実際に解く

$$
\min_x (x-2)^2
\quad\text{subject to}\quad x\le1
$$

を再び考えます。Lagrangian は

$$
L(x,\lambda)=(x-2)^2+\lambda(x-1).
$$

[KKT 条件](#thm-opt5-kkt)は

$$
x-1\le0,\qquad \lambda\ge0,
$$

$$
2(x-2)+\lambda=0,
$$

$$
\lambda(x-1)=0.
$$

もし $\lambda=0$ なら停留条件から $x=2$ となり主実行可能性に反します。従って $\lambda>0$ で、相補性から $x=1$。停留条件より $\lambda=2$ です。

$$
\boxed{x^*=1,\qquad\lambda^*=2}.
$$

この例では Slater 点 $x=0$ があり、凸問題なので KKT を満たす点が大域最適解であることまで保証されます。

---

## 8. Slater を失うと何が壊れるか

$$
\min_x x
\quad\text{subject to}\quad x^2\le0
$$

を考えます。実行可能点は $x^*=0$ だけなので、これは最適解です。しかし $g(x)=x^2$ に対して $g(x)<0$ となる点は存在せず、Slater 条件は失敗します。

KKT の停留条件は

$$
1+\lambda\,2x^*=1=0
$$

を要求するので、どんな $\lambda\ge0$ でも満たせません。

ここで壊れたのは「最適解が存在すること」ではありません。**最適解を有限の Lagrange 乗数で表現できること**です。OPT6 では、この現象を接錐と制約の一次近似が作る錐のずれとして詳しく見ます。

---

## 9. OPT4 の Fenchel 双対との接続

制約 $g_i(x)\le0$ をベクトル

$$
G(x)=(g_1(x),\dots,g_m(x))
$$

としてまとめ、非正直交象限への indicator 関数を使えば、制約付き問題は拡張実数値関数を含む無制約問題として書けます。OPT4 の「indicator の共役が support function」という関係から、非負乗数 $\lambda\ge0$ が自然に現れます。

したがって Fenchel 双対と Lagrange 双対は別々の暗記項目ではなく、

$$
\boxed{
\text{制約を indicator 関数で表す}
\Longrightarrow
\text{共役側に Lagrange 乗数が現れる}
}
$$

という同じ凸双対性の二つの表現です。

---

## 10. 演習 Level A

### OPT5-A01 Lagrangian を作る

- Level: A
- 目安時間: 10分

$$
\min_{x,y} x^2+y^2
$$

subject to

$$
x+y\ge1,\qquad x-y=0
$$

について、不等式を $g\le0$ に直して Lagrangian を書け。

<!-- solution-start -->
#### 詳細解答

不等式は

$$
g(x,y)=1-x-y\le0
$$

と書く。乗数を $\lambda\ge0$、等式制約の乗数を $\nu\in\mathbb R$ とすると

$$
\boxed{
L(x,y,\lambda,\nu)
=
x^2+y^2+\lambda(1-x-y)+\nu(x-y)
}.
$$

$\lambda$ にだけ符号制約があり、$\nu$ は自由である点が重要です。
<!-- solution-end -->

### OPT5-A02 双対関数を計算する

- Level: A
- 目安時間: 12分

$$
\min_x \frac12x^2
\quad\text{subject to}\quad x\ge1
$$

の双対関数と双対問題を求めよ。

<!-- solution-start -->
#### 詳細解答

$g(x)=1-x\le0$ と置くと

$$
L(x,\lambda)=\frac12x^2+\lambda(1-x),\qquad\lambda\ge0.
$$

$x$ について微分すると $x-\lambda=0$ なので $x=\lambda$ で最小化され、

$$
q(\lambda)=\lambda-\frac12\lambda^2.
$$

従って双対問題は

$$
\boxed{
\max_{\lambda\ge0}
\left(\lambda-\frac12\lambda^2\right)
}.
$$

最大化点は $\lambda^*=1$、双対最適値は $1/2$ です。
<!-- solution-end -->

### OPT5-A03 KKT で境界解を求める

- Level: A
- 目安時間: 12分

$$
\min_x (x+1)^2
\quad\text{subject to}\quad x\ge0
$$

を [KKT 条件](#thm-opt5-kkt)から解け。

<!-- solution-start -->
#### 詳細解答

$g(x)=-x\le0$ とすると

$$
L(x,\lambda)=(x+1)^2-\lambda x.
$$

KKT 条件は

$$
x\ge0,\quad\lambda\ge0,\quad
2(x+1)-\lambda=0,\quad\lambda x=0.
$$

$\lambda=0$ なら $x=-1$ となり実行不能なので、$x=0$。停留条件から $\lambda=2$。従って

$$
\boxed{x^*=0,\qquad\lambda^*=2}.
$$
<!-- solution-end -->

### OPT5-A04 活性制約と相補性

- Level: A
- 目安時間: 10分

ある KKT 点 $x^*$ で $g_1(x^*)=-2$、$g_2(x^*)=0$ とする。対応する乗数 $\lambda_1^*,\lambda_2^*$ について相補性から必ず言えることを述べよ。

<!-- solution-start -->
#### 詳細解答

相補性は

$$
\lambda_i^*g_i(x^*)=0
$$

です。$g_1(x^*)=-2\ne0$ なので

$$
\boxed{\lambda_1^*=0}.
$$

一方 $g_2(x^*)=0$ では積は $\lambda_2^*$ の値によらず0なので、相補性だけから $\lambda_2^*>0$ とは言えません。双対実行可能性から言えるのは

$$
\boxed{\lambda_2^*\ge0}
$$

までです。
<!-- solution-end -->

---

## 11. 演習 Level B

### OPT5-B01 弱双対性を定義から証明する

- Level: B
- 目安時間: 15分

主実行可能点 $x$ と双対実行可能点 $(\lambda,\nu)$ に対して $q(\lambda,\nu)\le f(x)$ を示し、$d^*\le p^*$ を導け。

<!-- solution-start -->
#### 詳細解答

双対関数の定義から

$$
q(\lambda,\nu)=\inf_zL(z,\lambda,\nu)\le L(x,\lambda,\nu).
$$

$x$ は実行可能なので $Ax=b$、$g_i(x)\le0$。また $\lambda_i\ge0$ だから

$$
L(x,\lambda,\nu)
=
f(x)+\sum_i\lambda_i g_i(x)
\le f(x).
$$

従って $q(\lambda,\nu)\le f(x)$。これは任意の実行可能点について成立するので、双対側で上限、主問題側で下限を取って

$$
\boxed{d^*\le p^*}.
$$
<!-- solution-end -->

### OPT5-B02 二変数問題を KKT で解く

- Level: B
- 目安時間: 20分

$$
\min_{x,y}\frac12(x^2+y^2)
\quad\text{subject to}\quad x+y\ge2
$$

を [KKT 条件](#thm-opt5-kkt)から解き、乗数も求めよ。

<!-- solution-start -->
#### 詳細解答

$g(x,y)=2-x-y\le0$ と置くと

$$
L=\frac12(x^2+y^2)+\lambda(2-x-y).
$$

停留条件は

$$
x-\lambda=0,\qquad y-\lambda=0,
$$

よって $x=y=\lambda$。主実行可能性は $2-2\lambda\le0$、すなわち $\lambda\ge1$。相補性は

$$
\lambda(2-2\lambda)=0.
$$

$\lambda\ge1$ なので $\lambda=0$ は不可能、従って $\lambda=1$。したがって

$$
\boxed{x^*=y^*=1,\qquad\lambda^*=1}.
$$

目的関数と制約関数は凸で、例えば $(2,2)$ は厳密実行可能なので Slater 条件も成立します。よって KKT 条件は大域最適性を保証します。
<!-- solution-end -->

### OPT5-B03 Slater が失敗する例を診断する

- Level: B
- 目安時間: 20分

$$
\min_x x
\quad\text{subject to}\quad x^2\le0
$$

について、(i) 最適解、(ii) Slater 条件、(iii) KKT 乗数の存在を順に調べ、どの機構が壊れたか説明せよ。

<!-- solution-start -->
#### 詳細解答

$x^2\le0$ は $x=0$ と同値なので、実行可能集合は $\{0\}$。従って唯一の最適解は $x^*=0$ です。

Slater 条件には $\bar x$ で $\bar x^2<0$ が必要ですが、そのような実数は存在しません。従って Slater 条件は失敗します。

Lagrangian は

$$
L(x,\lambda)=x+\lambda x^2
$$

で、KKT の停留条件は

$$
1+2\lambda x^*=0.
$$

$x^*=0$ を代入すると $1=0$ となり、どの有限な $\lambda\ge0$ でも成立しません。

したがって壊れたのは最適解の存在ではなく、最適性を有限の Lagrange 乗数で表す KKT 必要条件です。制約勾配 $g'(0)=0$ が一次近似で実行可能集合の狭さを捉えられないことが背景にあり、OPT6 の接錐と制約の一次近似の議論へつながります。
<!-- solution-end -->

---

## 12. 演習 Level C

### OPT5-C01 二次目的・不等式・等式制約を同時に解く

- Level: C
- 目安時間: 30分

$$
\min_{x,y}\frac12(x^2+y^2)
$$

subject to

$$
x\ge0,\qquad y\ge0,\qquad x+y=1
$$

について、Lagrangian と KKT 条件を構成し、主最適解と一組の最適乗数を求めよ。さらに Slater 条件を確認し、KKT が必要十分条件として使える理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

不等式を

$$
g_1(x,y)=-x\le0,\qquad g_2(x,y)=-y\le0
$$

と書き、乗数を $\lambda_1,\lambda_2\ge0$、等式制約の乗数を $\nu\in\mathbb R$ とする。Lagrangian は

$$
L=
\frac12(x^2+y^2)-\lambda_1x-\lambda_2y+\nu(x+y-1).
$$

KKT 条件は

$$
x\ge0,\quad y\ge0,\quad x+y=1,
$$

$$
\lambda_1,\lambda_2\ge0,
$$

$$
x-\lambda_1+\nu=0,\qquad
y-\lambda_2+\nu=0,
$$

$$
\lambda_1x=0,\qquad\lambda_2y=0.
$$

等式制約上で $x,y$ がともに正となる候補を考えると、相補性から $\lambda_1=\lambda_2=0$。停留条件は

$$
x+\nu=0,\qquad y+\nu=0
$$

なので $x=y$。$x+y=1$ から

$$
x^*=y^*=\frac12.
$$

従って $\nu^*=-1/2$ であり、

$$
\boxed{
(x^*,y^*)=(1/2,1/2),\quad
\lambda_1^*=\lambda_2^*=0,\quad
\nu^*=-1/2
}.
$$

Slater 条件については、等式 $x+y=1$ を満たしながら両不等式を厳密に満たす点が必要です。$(1/2,1/2)$ 自身が

$$
-x=-\frac12<0,\qquad -y=-\frac12<0
$$

を満たすので Slater 条件が成立します。目的関数と不等式制約は凸、等式制約は affine です。従って本章の KKT 定理により、この KKT 点は大域最適解です。

なお二つの不等式は最適点で非活性なので、乗数が0になることも相補性と一致します。
<!-- solution-end -->

---

## 13. 次に進む

次は **OPT6「KKT の幾何学的導出・制約想定」** です。本章で Slater 条件を使って得た乗数が、一般の滑らかな制約付き最適化でいつ存在するのかを、活性集合・接錐・制約の一次近似・LICQ・MFCQ から組み立て直します。
