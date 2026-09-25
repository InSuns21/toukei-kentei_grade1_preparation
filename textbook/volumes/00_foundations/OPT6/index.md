# OPT6 KKT の幾何学的導出・制約想定

<!-- definition-example-audit: strict -->

OPT5 では Slater 条件の下で凸問題の KKT 条件を導きました。本章では凸性を外し、滑らかな一般制約

$$
g_i(x)\le0\quad(i=1,\ldots,m),\qquad
h_j(x)=0\quad(j=1,\ldots,r)
$$

の局所最適化へ進みます。主線は

$$
\boxed{
\text{局所最適性}
\to T_C(x^*)^\circ
\to T_C(x^*)=L_C(x^*)
\to L_C(x^*)^\circ
\to \text{KKT 乗数}
}
$$

です。KKT を公式として暗記するのではなく、「実際に動ける方向」と「一次近似が許す方向」がいつ一致するかを追います。

> **停止線**  
> Robinson CQ と一般錐制約は OPT6A、二階条件の本格的な臨界錐解析は後続の数値最適化へ送ります。本章では LICQ・MFCQ、KKT 乗数存在、二階条件の入口までを扱います。

---

## 1. 活性集合と接錐

実行可能集合を

$$
C=\{x:g_i(x)\le0, h_j(x)=0\}
$$

とします。

<a id="def-opt6-active-set"></a>
<!-- formal-statement-start -->
> **定義（活性集合）**  
> 実行可能点 $x^*\in C$ に対して
>
$$
I(x^*)=\{i:g_i(x^*)=0\}
$$
>
> を $x^*$ における **活性集合**という。
<!-- formal-statement-end -->

OPT5 の「活性制約」を添字集合としてまとめたものです。$g_i(x^*)<0$ の制約は連続性により $x^*$ の十分近くでも余裕があるため、一次の局所幾何を直接は制限しません。

<a id="def-opt6-tangent-cone"></a>
### OPT3 の接錐を再利用する

本章では、OPT3 で一般の集合に対して定義した [Bouligand 接錐](../OPT3/index.md#def-opt3-tangent-cone) をそのまま使います。すなわち $x^*\in C$ に対して

$$
T_C(x^*)
=
\left\{
d:
\exists\,x_k\in C,\ 
\exists\,t_k\downarrow0,\ 
\frac{x_k-x^*}{t_k}\to d
\right\}.
$$

これは凸集合に限らない定義です。OPT6 では制約関数が非凸でもよいので、この一般性が必要になります。

**再確認**：上半平面

$$
C=\{(x_1,x_2):x_2\ge0\},\qquad x^*=(0,0)
$$

では、$d_2\ge0$ なら $x_k=t_kd$ と置いて実行可能列を作れます。逆に $d\in T_C(0)$ なら $x_{k2}\ge0$ と $t_k>0$ から

$$
\frac{x_{k2}}{t_k}\ge0
$$

であり、極限を取って $d_2\ge0$ です。従って

$$
\boxed{T_C(0)=\{d:d_2\ge0\}}.
$$


---

## 2. 局所最適性が与える接方向条件

<a id="thm-opt6-local-tangent"></a>
<!-- formal-statement-start -->
> **定理（局所最適点の接方向条件）**  
> 集合 $C\subset\mathbb R^n$、点 $x^*\in C$、$x^*$ の近傍で定義された関数 $f$ を考える。$f$ が $x^*$ で微分可能で、$x^*$ が $C$ 上の局所最小点なら
>
$$
\nabla f(x^*)^{\mathsf T}d\ge0
\qquad(\forall d\in T_C(x^*)).
$$
>
> 極錐
>
$$
K^\circ
=
\{v:v^{\mathsf T}d\le0\ (\forall d\in K)\}
$$
>
> を用いれば
>
$$
\boxed{-\nabla f(x^*)\in T_C(x^*)^\circ}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$d\in T_C(x^*)$ を取る。定義から $x_k\in C$, $t_k\downarrow0$ で

$$
x_k=x^*+t_kd+o(t_k)
$$

となる列がある。局所最小性より十分大きな $k$ で $f(x_k)-f(x^*)\ge0$。微分可能性から

$$
f(x_k)-f(x^*)
=
\nabla f(x^*)^{\mathsf T}(x_k-x^*)+o(\|x_k-x^*\|)
=
t_k\nabla f(x^*)^{\mathsf T}d+o(t_k).
$$

$t_k>0$ で割って極限を取れば $\nabla f(x^*)^{\mathsf T}d\ge0$。これは $-\nabla f(x^*)\in T_C(x^*)^\circ$ と同値です。$\square$
<!-- proof-end -->

ここまでは制約関数の勾配を使っていません。接錐は正しい対象ですが、点列定義なので計算しにくい。そこで制約を一次近似します。

---

## 3. 制約の一次近似を錐として表す

<a id="def-opt6-linearization-cone"></a>
<!-- formal-statement-start -->
> **定義（線形化錐）**  
> 微分可能な関数 $g_i,h_j$ によって
>
$$
C
=
\{x:g_i(x)\le0\ (i=1,\dots,m),\ h_j(x)=0\ (j=1,\dots,r)\}
$$
>
> とし、$x^*\in C$ とする。活性集合
>
$$
I(x^*)=\{i:g_i(x^*)=0\}
$$
>
> に対して
>
$$
L_C(x^*)
=
\left\{
d:
\begin{array}{ll}
\nabla g_i(x^*)^{\mathsf T}d\le0,&i\in I(x^*),\\
\nabla h_j(x^*)^{\mathsf T}d=0,&j=1,\dots,r
\end{array}
\right\}
$$
>
> を $x^*$ における **線形化錐**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6-linearization-cone -->
**定義の確認**：放物線の上側

$$
C=\{(x_1,x_2):x_1^2-x_2\le0\}
$$

を原点で考えると

$$
\nabla g(0,0)=(0,-1)^{\mathsf T},
$$

したがって

$$
L_C(0)=\{d:d_2\ge0\}.
$$

実際の接錐も同じです。$d_2>0$ は直線で実現でき、$d_2=0$ は $d_2^{(k)}>0$ の方向から極限を取れます。
<!-- definition-example-end -->

<a id="thm-opt6-tangent-subset"></a>
<!-- formal-statement-start -->
> **定理（接錐と線形化錐の基本包含）**  
> 微分可能な $g_i,h_j$ による実行可能集合
>
$$
C
=
\{x:g_i(x)\le0\ (i=1,\dots,m),\ h_j(x)=0\ (j=1,\dots,r)\}
$$
>
> と実行可能点 $x^*\in C$ に対して
>
$$
\boxed{T_C(x^*)\subseteq L_C(x^*)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$d\in T_C(x^*)$ を与える実行可能列を $x_k=x^*+t_kd+o(t_k)$ とする。活性な $i$ では

$$
g_i(x_k)\le0=g_i(x^*).
$$

一次展開して $t_k$ で割り極限を取ると

$$
\nabla g_i(x^*)^{\mathsf T}d\le0.
$$

等式制約では $h_j(x_k)=h_j(x^*)=0$ から同様に

$$
\nabla h_j(x^*)^{\mathsf T}d=0.
$$

従って $d\in L_C(x^*)$。$\square$
<!-- proof-end -->

逆包含は自動ではありません。ここが制約想定の出番です。

---

## 4. 一次近似が嘘をつく最小例

$$
C=\{x:x^2\le0\}=\{0\}
$$

を $x^*=0$ で考えます。実際には一点から動けないので

$$
T_C(0)=\{0\}.
$$

ところが $g'(0)=0$ なので一次近似条件は $0\cdot d\le0$、従って

$$
L_C(0)=\mathbb R.
$$

つまり

$$
\boxed{T_C(0)\subsetneq L_C(0)}.
$$

この問題で $f(x)=x$ を最小化すると $x^*=0$ は唯一の最適解ですが、KKT 停留条件

$$
1+\lambda\,0=0
$$

を満たす乗数は存在しません。失われた仮定と壊れた機構は明確です。**制約勾配が退化したため線形化錐が偽の方向を許し、接錐を制約勾配から復元できなくなった**のです。

---

## 5. LICQ と MFCQ

<a id="def-opt6-licq"></a>
<!-- formal-statement-start -->
> **定義（LICQ）**  
> 微分可能な制約
>
$$
g_i(x)\le0\ (i=1,\dots,m),
\qquad
h_j(x)=0\ (j=1,\dots,r)
$$
>
> と実行可能点 $x^*$ を考え、$I(x^*)=\{i:g_i(x^*)=0\}$ とする。ベクトル族
>
$$
\{\nabla g_i(x^*):i\in I(x^*)\}
\cup
\{\nabla h_j(x^*):j=1,\dots,r\}
$$
>
> が一次独立であるとき、**LICQ** が成立するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6-licq -->
**定義の確認**：直交する二制約

$g_1(x)=x_1\le0$, $g_2(x)=x_2\le0$ を原点で考えると、活性勾配は $(1,0)^{\mathsf T}$ と $(0,1)^{\mathsf T}$。一次独立なので LICQ が成立します。
<!-- definition-example-end -->

<a id="def-opt6-mfcq"></a>
<!-- formal-statement-start -->
> **定義（MFCQ）**  
> 微分可能な制約
>
$$
g_i(x)\le0\ (i=1,\dots,m),
\qquad
h_j(x)=0\ (j=1,\dots,r)
$$
>
> と実行可能点 $x^*$ を考え、$I(x^*)=\{i:g_i(x^*)=0\}$ とする。等式制約の勾配
>
$$
\nabla h_1(x^*),\dots,\nabla h_r(x^*)
$$
>
> が一次独立であり、さらにある $v\in\mathbb R^n$ が存在して
>
$$
\nabla h_j(x^*)^{\mathsf T}v=0
\qquad(j=1,\dots,r),
$$
>
$$
\nabla g_i(x^*)^{\mathsf T}v<0
\qquad(i\in I(x^*))
$$
>
> を満たすとき、**MFCQ** が成立するという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6-mfcq -->
**定義の確認**：MFCQ は成立するが LICQ は失敗

$$
g_1(x)=x\le0,\qquad g_2(x)=2x\le0
$$

を $x^*=0$ で考えます。勾配 $1,2$ は一次従属なので LICQ は失敗します。一方 $v=-1$ とすれば

$$
g_1'(0)v=-1<0,\qquad g_2'(0)v=-2<0,
$$

よって MFCQ は成立します。
<!-- definition-example-end -->

<a id="thm-opt6-licq-mfcq"></a>
<!-- formal-statement-start -->
> **定理（LICQ なら MFCQ）**  
> 有限次元の微分可能な不等式・等式制約を考える。実行可能点 $x^*$ で LICQ が成立すれば、同じ点で MFCQ が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

活性不等式勾配と等式勾配を行に並べた行列を $G$ とする。LICQ により $G$ は行フルランク、従って写像 $G:\mathbb R^n\to\mathbb R^{r+|I|}$ は全射です。等式側の成分を0、活性不等式側をすべて $-1$ とする右辺を選べば、それを実現する $v$ が存在します。この $v$ が MFCQ の方向です。$\square$
<!-- proof-end -->

逆は上の $g_1=x$, $g_2=2x$ が反例です。従って

$$
\boxed{\text{LICQ}\Longrightarrow\text{MFCQ}}
$$

ですが一般に逆は成り立ちません。

---

## 6. MFCQ が接錐と線形化錐を一致させる

<a id="thm-opt6-mfcq-tangent-equality"></a>
<!-- formal-statement-start -->
> **定理（MFCQ 下の接錐一致）**  
> $C^1$ 級関数 $g_i,h_j$ による実行可能集合
>
$$
C
=
\{x:g_i(x)\le0\ (i=1,\dots,m),\ h_j(x)=0\ (j=1,\dots,r)\}
$$
>
> と実行可能点 $x^*\in C$ を考える。$x^*$ で MFCQ が成立するとき
>
$$
\boxed{T_C(x^*)=L_C(x^*)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$d\in L_C(x^*)$ に MFCQ 方向 $v$ を少量足すと、活性不等式をすべて**厳密に内側へ向く方向**にできます。等式制約は RA6A の陰関数定理で作る等式多様体上の曲線に沿わせます。

<!-- proof-start -->
### 証明

既に $T_C(x^*)\subseteq L_C(x^*)$ は示しました。逆包含を示します。

$d\in L_C(x^*)$、MFCQ 方向を $v$ とし、$d_\varepsilon=d+\varepsilon v$ と置きます。すると

$$
\nabla h_j(x^*)^{\mathsf T}d_\varepsilon=0,
$$

かつ全ての活性 $i$ について

$$
\nabla g_i(x^*)^{\mathsf T}d_\varepsilon<0.
$$

MFCQ により $Dh(x^*)$ は行フルランクです。座標を $(u,z)$ に並べ替え、正則な部分行列 $D_zh(x^*)$ を選びます。[RA6A の陰関数定理](../RA6A/index.md#thm-ra6a-implicit-function)により、等式集合は局所的に $z=\varphi(u)$ と書けます。

$d_\varepsilon=(d_u,d_z)$ と分けると $Dh(x^*)d_\varepsilon=0$ から

$$
D\varphi(u^*)d_u=d_z.
$$

そこで

$$
x_\varepsilon(t)=
\bigl(u^*+td_u,\varphi(u^*+td_u)\bigr)
$$

と置けば $h(x_\varepsilon(t))=0$ であり、

$$
\frac{x_\varepsilon(t)-x^*}{t}\to d_\varepsilon.
$$

活性不等式は

$$
g_i(x_\varepsilon(t))
=
t\nabla g_i(x^*)^{\mathsf T}d_\varepsilon+o(t)
$$

です。各活性 $i$ で一次係数が厳密に負で、活性制約は有限個なので、十分小さい一つの $t>0$ を取れば全て同時に

$$
g_i(x_\varepsilon(t))<0
\qquad(i\in I(x^*))
$$

となります。非活性制約は $g_i(x^*)<0$ と連続性から十分近くで負のままです。従って $x_\varepsilon(t)\in C$ であり、$d_\varepsilon\in T_C(x^*)$ です。

最後に $\varepsilon\downarrow0$ とします。ここで Bouligand 接錐が任意の集合に対して閉であることを定義から確認します。$d_\ell\in T_C(x^*)$、$d_\ell\to d$ とします。各 $\ell$ について接錐の定義から、ある $t_\ell\in(0,1/\ell)$ と $x_\ell\in C$ を

$$
\left\|
\frac{x_\ell-x^*}{t_\ell}
-d_\ell
\right\|
<
\frac1\ell
$$

となるように選べます。すると $t_\ell\downarrow0$ となる部分列を必要なら取り直せ、三角不等式から

$$
\frac{x_\ell-x^*}{t_\ell}
\to d.
$$

よって $d\in T_C(x^*)$ です。これを $d_\varepsilon\to d$ に適用して $d\in T_C(x^*)$。従って $L_C(x^*)\subseteq T_C(x^*)$ です。$\square$
<!-- proof-end -->

> **MFCQ が働いた場所**  
> 不等式側では「弱い一次条件 $\le0$」を「厳密に内側 $<0$」へ押し込む方向を供給し、等式側では陰関数定理を使える行フルランク性を供給しました。

---

## 7. 線形化錐の極錐

活性不等式勾配を行に並べた行列を $A$、等式勾配を行に並べた行列を $B$ とすると

$$
L_C(x^*)=\{d:Ad\le0,\ Bd=0\}.
$$

<a id="thm-opt6-linearized-polar"></a>
<!-- formal-statement-start -->
> **定理（線形化錐の極錐表示）**  
> $A\in\mathbb R^{p\times n}$、$B\in\mathbb R^{r\times n}$ とし
>
$$
K
=
\{d\in\mathbb R^n:Ad\le0,\ Bd=0\}
$$
>
> と置く。このとき
>
$$
\boxed{
K^\circ
=
\{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:
\lambda\in\mathbb R_+^p,\ \nu\in\mathbb R^r\}.
}
$$
>
> 特に $A$ を活性不等式勾配、$B$ を等式制約勾配から作れば $K=L_C(x^*)$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

右辺を $M$ とします。$A$ の行ベクトルを $a_1,\dots,a_p$、$B$ の行ベクトルを $b_1,\dots,b_r$ とすれば

$$
M
=
\operatorname{cone}
\{a_1,\dots,a_p,b_1,-b_1,\dots,b_r,-b_r\}.
$$

従って $M$ は [有限生成凸錐の閉性](../OPT2/index.md#thm-opt2-finitely-generated-cone-closed)により閉凸錐です。

$y=A^{\mathsf T}\lambda+B^{\mathsf T}\nu\in M$ と $d\in K$ に対して

$$
y^{\mathsf T}d
=
\lambda^{\mathsf T}Ad+\nu^{\mathsf T}Bd\le0,
$$

よって $M\subseteq K^\circ$。

逆に $y\in K^\circ$ だが $y\notin M$ と仮定します。[有限次元閉凸集合への射影](../OPT2/index.md#thm-opt2-convex-projection)により $p=P_M(y)$ が存在し、$d=y-p$ と置きます。射影の特徴付けと $M$ が錐であることから

$$
d^{\mathsf T}z\le0\quad(\forall z\in M),
\qquad
d^{\mathsf T}y=\|y-p\|^2>0.
$$

$A$ の各行ベクトルは $M$ に入り、$B$ の各行ベクトルは正負とも $M$ に入るので $Ad\le0$, $Bd=0$。従って $d\in K$ です。しかし $y\in K^\circ$ なら $y^{\mathsf T}d\le0$ でなければならず、$d^{\mathsf T}y>0$ に矛盾します。よって $y\in M$。$\square$
<!-- proof-end -->

この定理は OPT2 の Farkas の補題と同じ alternative の幾何です。ここでは既に canonical な分離・射影理論を再証明せず利用しています。

---

## 8. MFCQ から KKT 乗数を導く

<a id="thm-opt6-mfcq-kkt"></a>
<!-- formal-statement-start -->
> **定理（MFCQ 下の KKT 乗数存在）**  
> $C^1$ 級関数 $f,g_i,h_j$ に対する問題
>
$$
\min_x f(x)
\quad\text{制約}\quad
g_i(x)\le0\ (i=1,\dots,m),\qquad
h_j(x)=0\ (j=1,\dots,r)
$$
>
> を考える。$x^*$ が局所最小点で、$x^*$ で MFCQ が成立するなら、ある
>
$$
\lambda\in\mathbb R_+^m,
\qquad
\nu\in\mathbb R^r
$$
>
> が存在して
>
$$
\nabla f(x^*)
+\sum_{i=1}^m\lambda_i\nabla g_i(x^*)
+\sum_{j=1}^r\nu_j\nabla h_j(x^*)=0,
$$
>
$$
\lambda_i g_i(x^*)=0
\qquad(i=1,\dots,m)
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所最適性から

$$
-\nabla f(x^*)\in T_C(x^*)^\circ.
$$

MFCQ により $T_C(x^*)=L_C(x^*)$ なので

$$
-\nabla f(x^*)\in L_C(x^*)^\circ.
$$

前節の 極錐表示から、活性制約について

$$
-\nabla f(x^*)
=
\sum_{i\in I(x^*)}\lambda_i\nabla g_i(x^*)
+
\sum_j\nu_j\nabla h_j(x^*),
\qquad\lambda_i\ge0
$$

と書けます。非活性制約には $\lambda_i=0$ を補えば停留条件が得られます。活性なら $g_i(x^*)=0$、非活性なら $\lambda_i=0$ なので相補性も成立します。$\square$
<!-- proof-end -->

OPT5 では凸性と Slater 条件から KKT を得ました。本章では局所最適性と MFCQ から得ています。**凸性は KKT 乗数の存在そのものに必須ではありません。** 一方、非凸問題では KKT は一般に必要条件であり、それだけで大域最適性は保証しません。

---

## 9. LICQ が追加で与えるもの：乗数の一意性

<a id="thm-opt6-licq-unique-multiplier"></a>
<!-- formal-statement-start -->
> **定理（LICQ 下の KKT 乗数の一意性）**  
> 微分可能な制約 $g_i(x)\le0$、$h_j(x)=0$ を持つ問題の実行可能点 $x^*$ を考える。$x^*$ で KKT 条件を満たす乗数 $(\lambda,\nu)$ が存在し、LICQ が成立するなら、その KKT 乗数は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二組の乗数 $(\lambda,\nu)$、$(\tilde\lambda,\tilde\nu)$ があるとする。非活性制約の乗数は相補性からともに0です。二つの停留条件を引けば

$$
\sum_{i\in I(x^*)}(\lambda_i-\tilde\lambda_i)\nabla g_i(x^*)
+
\sum_j(\nu_j-\tilde\nu_j)\nabla h_j(x^*)=0.
$$

LICQ によりこれらの勾配は一次独立なので全係数が0。従って乗数は一致します。$\square$
<!-- proof-end -->

MFCQ だけでは重複制約が許されるため乗数は一意とは限りません。例えば $x\le0$ と $2x\le0$ を同時に置けば、停留条件に現れる二乗数の分配には自由度が残り得ます。

---

## 10. 二階条件への入口

KKT は一次情報です。停留条件によって一次変化が消える実行可能方向では、次に二次変化を調べる必要があります。ただし、**単に $Dh(x^*)d=0$ と書くだけでは、その $d$ が本当に実行可能曲線の速度になるとは限りません**。ここでも正則性が要ります。

<a id="thm-opt6-second-order-equality"></a>
<!-- formal-statement-start -->
> **定理（正則な等式制約に対する二階必要条件）**  
> $f:\mathbb R^n\to\mathbb R$ と $h=(h_1,\dots,h_r):\mathbb R^n\to\mathbb R^r$ を $C^2$ 級とする。問題
>
$$
\min_x f(x)
\quad\text{制約}\quad
h(x)=0
$$
>
> の局所最小点を $x^*$ とし、$Dh(x^*)$ が行フルランクであるとする。KKT 乗数 $\nu^*\in\mathbb R^r$ を
>
$$
\nabla f(x^*)+Dh(x^*)^{\mathsf T}\nu^*=0
$$
>
> で定め、Lagrangian
>
$$
L(x,\nu)=f(x)+\nu^{\mathsf T}h(x)
$$
>
> を考える。このとき任意の
>
$$
d\in\ker Dh(x^*)
$$
>
> に対して
>
$$
\boxed{
d^{\mathsf T}
\nabla_{xx}^2L(x^*,\nu^*)
d
\ge0
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

行フルランク性と[陰関数定理](../RA6A/index.md#thm-ra6a-implicit-function)により、$Dh(x^*)d=0$ を満たす任意の $d$ を速度に持つ実行可能曲線 $x(t)$ を作れます。$f(x(t))$ は $t=0$ で局所最小なので二階微分が非負です。制約 $h(x(t))=0$ を二回微分すると、曲線の加速度項が KKT 停留条件によって消え、Lagrangian の Hessian だけが残ります。

<!-- proof-start -->
### 証明

$d\in\ker Dh(x^*)$ を取ります。$Dh(x^*)$ は行フルランクなので、MFCQ 下の接錐一致で使ったのと同じ陰関数定理の議論により、ある $C^2$ 級曲線 $x(t)$ を

$$
x(0)=x^*,
\qquad
x'(0)=d,
\qquad
h(x(t))=0
$$

となるように取れます。

一変数関数

$$
\phi(t)=f(x(t))
$$

は $t=0$ で局所最小なので

$$
\phi''(0)\ge0.
$$

連鎖律より

$$
\phi''(0)
=
d^{\mathsf T}\nabla^2 f(x^*)d
+
\nabla f(x^*)^{\mathsf T}x''(0).
$$

一方、各 $j$ について $h_j(x(t))=0$ を二回微分すると

$$
d^{\mathsf T}\nabla^2 h_j(x^*)d
+
\nabla h_j(x^*)^{\mathsf T}x''(0)
=
0.
$$

KKT 停留条件

$$
\nabla f(x^*)
=
-
\sum_{j=1}^r
\nu_j^*\nabla h_j(x^*)
$$

を使えば

$$
\begin{aligned}
\nabla f(x^*)^{\mathsf T}x''(0)
&=
-
\sum_j\nu_j^*
\nabla h_j(x^*)^{\mathsf T}x''(0)\\
&=
\sum_j\nu_j^*
d^{\mathsf T}\nabla^2 h_j(x^*)d.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\phi''(0)
&=
d^{\mathsf T}
\left(
\nabla^2 f(x^*)
+
\sum_j\nu_j^*\nabla^2 h_j(x^*)
\right)d\\
&=
d^{\mathsf T}
\nabla_{xx}^2L(x^*,\nu^*)
d
\ge0.
\end{aligned}
$$

これが主張です。$\square$
<!-- proof-end -->

> **行フルランク性を落とすと何が壊れるか**  
> $h(x)=x^2=0$ では実行可能集合は $\{0\}$ なので、$f(x)=-x^2$ に対して $x^*=0$ は局所最小点です。しかし $Dh(0)=0$ なので全ての $d$ が形式上 $Dh(0)d=0$ を満たします。$\nu^*=0$ は停留条件を満たしますが
>
$$
d^2\,\nabla_{xx}^2L(0,0)
=
-2d^2<0
\qquad(d\ne0).
$$
>
> つまり壊れたのは、**一次方程式 $Dh(x^*)d=0$ から実際の実行可能曲線を復元する機構**です。

**直接例**：単位円上の線形目的関数

$$
\min_{x_1,x_2} x_1
\quad\text{制約}\quad
h(x)=x_1^2+x_2^2-1=0
$$

では $x^*=(-1,0)$、$Dh(x^*)=(-2,0)$ は行フルランクです。停留条件

$$
(1,0)+\nu^*(-2,0)=0
$$

から $\nu^*=1/2$。接方向は $d=(0,d_2)$ であり、

$$
\nabla_{xx}^2L(x^*,\nu^*)
=
2\nu^*I
=
I.
$$

従って

$$
d^{\mathsf T}\nabla_{xx}^2L(x^*,\nu^*)d
=
d_2^2\ge0.
$$

不等式制約まで含めると、全ての線形化方向ではなく、一次変化が実際に消える方向だけを集めた **臨界錐** 上で二階条件を調べます。本章ではここを停止線とし、後続の数値最適化で扱います。

---

## 11. 演習 Level A

### OPT6-A01 接錐を直接求める

- Level: A
- 目安時間: 10分

$C=\{(x,y):y\ge0\}$ の原点における接錐を定義から求めよ。

<!-- solution-start -->
#### 詳細解答

$d=(d_1,d_2)$ で $d_2\ge0$ なら、任意の $t_k\downarrow0$ に対し $x_k=t_kd$ は $C$ に属し、$x_k/t_k=d$。よって $d\in T_C(0)$。

逆に $d\in T_C(0)$ なら、実行可能列 $x_k=(x_{k1},x_{k2})$ は $x_{k2}\ge0$。$t_k>0$ なので $x_{k2}/t_k\ge0$、極限を取って $d_2\ge0$。従って

$$
\boxed{T_C(0)=\{d:d_2\ge0\}}.
$$
<!-- solution-end -->

### OPT6-A02 線形化錐を求める

- Level: A
- 目安時間: 10分

$g(x_1,x_2)=x_1^2-x_2\le0$ を原点で考え、線形化錐を求めよ。

<!-- solution-start -->
#### 詳細解答

原点では $g(0)=0$ なので制約は活性です。

$$
\nabla g(0,0)=(0,-1)^{\mathsf T}.
$$

従って一次近似から得る条件は

$$
(0,-1)d=-d_2\le0,
$$

すなわち $d_2\ge0$。よって

$$
\boxed{L_C(0)=\{d:d_2\ge0\}}.
$$
<!-- solution-end -->

### OPT6-A03 LICQ と MFCQ を判定する

- Level: A
- 目安時間: 12分

$g_1(x)=x\le0$, $g_2(x)=2x\le0$ を $x^*=0$ で考え、LICQ と MFCQ を判定せよ。

<!-- solution-start -->
#### 詳細解答

両制約は活性で、勾配は $1$ と $2$。一次従属なので LICQ は成立しません。

一方 $v=-1$ とすると

$$
g_1'(0)v=-1<0,\qquad g_2'(0)v=-2<0.
$$

等式制約はないので MFCQ の等式側条件は空条件です。従って

$$
\boxed{\text{LICQ は不成立、MFCQ は成立}}.
$$
<!-- solution-end -->

### OPT6-A04 退化制約を診断する

- Level: A
- 目安時間: 12分

$g(x)=x^2\le0$ を $x^*=0$ で考え、$T_C(0)$、$L_C(0)$、MFCQ を求めよ。

<!-- solution-start -->
#### 詳細解答

実行可能集合は $C=\{0\}$ なので

$$
T_C(0)=\{0\}.
$$

一方 $g'(0)=0$ だから一次近似から得る条件は全ての $d$ を許し、

$$
L_C(0)=\mathbb R.
$$

MFCQ はある $v$ について $g'(0)v<0$ を要求しますが、左辺は常に0なので成立しません。従って

$$
\boxed{T_C(0)\ne L_C(0),\qquad\text{MFCQ 不成立}}.
$$

失敗の原因は一次近似が制約を完全に消してしまうことです。
<!-- solution-end -->

---

## 12. 演習 Level B

### OPT6-B01 局所最適性から 極錐条件を導く

- Level: B
- 目安時間: 15分

接錐の定義と微分可能性だけを使って、局所最小点 $x^*$ で $-\nabla f(x^*)\in T_C(x^*)^\circ$ を導け。

<!-- solution-start -->
#### 詳細解答

$d\in T_C(x^*)$ を任意に取る。実行可能列 $x_k$ と $t_k\downarrow0$ を

$$
x_k-x^*=t_kd+o(t_k)
$$

となるように取れる。局所最小性から $f(x_k)-f(x^*)\ge0$。微分可能性より

$$
f(x_k)-f(x^*)
=
t_k\nabla f(x^*)^{\mathsf T}d+o(t_k).
$$

$t_k$ で割って極限を取れば $\nabla f(x^*)^{\mathsf T}d\ge0$。$d$ は任意なので

$$
(-\nabla f(x^*))^{\mathsf T}d\le0
\quad(\forall d\in T_C(x^*)),
$$

すなわち

$$
\boxed{-\nabla f(x^*)\in T_C(x^*)^\circ}.
$$
<!-- solution-end -->

### OPT6-B02 MFCQ から接錐一致へ

- Level: B
- 目安時間: 20分

等式制約がない場合に限定し、MFCQ が成立するなら $L_C(x^*)\subseteq T_C(x^*)$ となる理由を示せ。

<!-- solution-start -->
#### 詳細解答

$d\in L_C(x^*)$、MFCQ 方向を $v$ とする。$\varepsilon>0$ に対して

$$
d_\varepsilon=d+\varepsilon v
$$

と置けば、活性な全ての $i$ で

$$
\nabla g_i(x^*)^{\mathsf T}d_\varepsilon<0.
$$

そこで $x(t)=x^*+td_\varepsilon$ とする。$C^1$ 性から

$$
g_i(x(t))
=
t\nabla g_i(x^*)^{\mathsf T}d_\varepsilon+o(t)<0
$$

が十分小さい $t>0$ で成立する。非活性制約も連続性から負のままなので $x(t)$ は実行可能。従って $d_\varepsilon\in T_C(x^*)$。

$\varepsilon\downarrow0$ で $d_\varepsilon\to d$、接錐の閉性から $d\in T_C(x^*)$。よって $L_C(x^*)\subseteq T_C(x^*)$。基本包含と合わせて一致します。
<!-- solution-end -->

### OPT6-B03 KKT 乗数を幾何から求める

- Level: B
- 目安時間: 20分

$$
\min_{x,y} f(x,y)=x+y
$$

subject to

$$
x^2+y^2\le1
$$

について、最適点と KKT 乗数を求め、MFCQ を確認せよ。

<!-- solution-start -->
#### 詳細解答

Cauchy--Schwarz の不等式から、単位円板上では

$$
x+y
=
(1,1)^{\mathsf T}(x,y)
\ge
-\sqrt2\sqrt{x^2+y^2}
\ge
-\sqrt2.
$$

等号は $(x,y)$ が $(-1,-1)$ と同方向で境界上にあるとき、すなわち

$$
x^*=y^*=-\frac1{\sqrt2}
$$

で成立します。従ってこれが最適点です。

制約を $g=x^2+y^2-1\le0$ とすると活性で、

$$
\nabla g(x^*)=(-\sqrt2,-\sqrt2)^{\mathsf T}\ne0.
$$

不等式が1本だけなので $v=-\nabla g(x^*)$ と取れば

$$
\nabla g(x^*)^{\mathsf T}v=-\|\nabla g(x^*)\|^2<0,
$$

よって MFCQ が成立します。

停留条件

$$
(1,1)+\lambda(-\sqrt2,-\sqrt2)=0
$$

から

$$
\boxed{\lambda^*=\frac1{\sqrt2}}.
$$

$\lambda^*>0$、$g(x^*)=0$ なので相補性も成立します。
<!-- solution-end -->

---

## 13. 演習 Level C

### OPT6-C01 制約想定から KKT までを再構成する

- Level: C
- 目安時間: 35分

$$
\min_{x,y} f(x,y)=x
$$

subject to

$$
g(x,y)=x^2-y\le0,\qquad h(x,y)=y-1=0
$$

を考える。

1. 実行可能集合と最適点を求めよ。
2. 最適点で LICQ と MFCQ を判定せよ。
3. 線形化錐を求めよ。
4. KKT 乗数を求めよ。
5. この例で「局所最適性 → 接錐 → 線形化錐 → polar → KKT」のどこに制約想定が使われるか説明せよ。

<!-- solution-start -->
#### 詳細解答

等式制約から $y=1$。不等式は $x^2\le1$ なので実行可能集合は

$$
C=\{(x,1):-1\le x\le1\}.
$$

$f=x$ だから最適点は

$$
x^*=(-1,1).
$$

勾配は

$$
\nabla g(x^*)=(-2,-1)^{\mathsf T},\qquad
\nabla h(x^*)=(0,1)^{\mathsf T}.
$$

二つは一次独立なので LICQ が成立し、従って MFCQ も成立します。

線形化錐は

$$
-2d_x-d_y\le0,\qquad d_y=0,
$$

したがって

$$
\boxed{L_C(x^*)=\{(d_x,0):d_x\ge0\}}.
$$

MFCQ によりこれは実際の接錐 $T_C(x^*)$ と一致します。

Lagrangian を

$$
L=x+\lambda(x^2-y)+\nu(y-1)
$$

とすると停留条件は

$$
1+2\lambda x=0,\qquad -\lambda+\nu=0.
$$

$x=-1$ を代入して

$$
\lambda^*=\frac12,\qquad \nu^*=\frac12.
$$

$\lambda^*\ge0$、制約は活性なので相補性も成立します。

最後に論理鎖を確認します。局所最適性だけで $-\nabla f(x^*)\in T_C(x^*)^\circ$ までは得られます。しかし KKT 乗数を制約勾配の係数として読み取るには、接錐を計算可能な線形化錐へ置き換える必要があります。本例では LICQ、従って MFCQ が

$$
T_C(x^*)=L_C(x^*)
$$

を保証し、その 極錐表示から非負乗数 $\lambda^*$ と自由乗数 $\nu^*$ が現れます。ここが制約想定の役割です。
<!-- solution-end -->

---

## 14. 次に進む

次は **OPT6A「錐制約・一般化 KKT」** です。通常の有限個の不等式・等式から、双対錐を使う一般錐制約へ進み、Robinson CQ を canonical に扱います。
