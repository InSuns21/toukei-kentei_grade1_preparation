# F0-02C5A 関数解析V-A：制約想定・LICQ・MFCQ・Robinson CQ

KKT は「局所最適なら必ず成立する公式」ではありません。制約の一次近似が退化すると、真の実行可能集合と線形化された集合が全く違う形になり、乗数が存在しないことがあります。

この講義では有限次元の滑らかな制約

$$
g_i(x)\le0
\quad(i=1,\ldots,m),
\qquad
h_j(x)=0
\quad(j=1,\ldots,r)
$$

について、次の鎖を証明します。

```text
LICQ
  ↓
MFCQ
  ⇔
通常制約に対する Robinson CQ
  ↓
T_C(x*) = L_C(x*)
  ↓
L_C(x*)° = 制約勾配の錐結合 + 等式勾配の線形結合
  ↓
KKT乗数が存在
```

---

## 1. まずKKTが失敗する最小の反例

$$
\min_{x\in\mathbb R} f(x)=x
$$

subject to

$$
g(x)=x^2\le0
$$

を考えます。実行可能点は $x=0$ だけなので $x^*=0$ は局所最適点です。

しかし stationarity は

$$
f'(0)+\lambda g'(0)=0
$$

であり

$$
f'(0)=1,
\qquad
g'(0)=0
$$

なので

$$
1+\lambda\cdot0=0
$$

を満たす $\lambda$ は存在しません。

壊れているのは「最適性」ではなく、制約を一次微分で見る近似です。

---

## 2. active set と線形化cone

実行可能集合を

$$
C
=
\{x:g_i(x)\le0,\ h_j(x)=0\}
$$

とします。

<a id="def-f0-02c5a-active-linearized"></a>

<!-- formal-statement-start -->
> **定義（active set・線形化cone）**  
> 実行可能点 $x^*$ における active set を
>
> $$
> I(x^*)
> =
> \{i:g_i(x^*)=0\}
> $$
>
> とします。また
>
> $$
> L_C(x^*)
> =
> \left\{
> d:
> \begin{array}{ll}
> \nabla g_i(x^*)^{\mathsf T}d\le0,&i\in I(x^*),\\
> \nabla h_j(x^*)^{\mathsf T}d=0,&j=1,\ldots,r
> \end{array}
> \right\}
> $$
>
> を $x^*$ における線形化coneといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-active-linearized -->
### 2.1 例：$x^2\le0$ では線形化が制約を消してしまう

**定義の確認**

$x^*=0$ では

$$
g(0)=0
$$

なので active set は $I(0)=\{1\}$ です。一方

$$
g'(0)=0
$$

だから線形化条件は

$$
0\cdot d\le0,
$$

すなわち全ての $d\in\mathbb R$ が通ります。従って

$$
L_C(0)=\mathbb R.
$$

しかし真の実行可能集合は $C=\{0\}$ なので [tangent cone](../F0_02C4A_tangent_polar_dual_cone/index.md#def-f0-02c4a-tangent-cone) は

$$
T_C(0)=\{0\}.
$$

定義を実際に計算すると

$$
\boxed{T_C(0)\ne L_C(0)}
$$

が露出します。
<!-- definition-example-end -->

---

## 3. LICQ

<a id="def-f0-02c5a-licq"></a>

<!-- formal-statement-start -->
> **定義（LICQ）**  
> 実行可能点 $x^*$ で
>
> $$
> \{\nabla g_i(x^*):i\in I(x^*)\}
> \cup
> \{\nabla h_j(x^*):j=1,\ldots,r\}
> $$
>
> が一次独立であるとき、LICQ が成立するといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-licq -->
### 3.1 例：二次元の直交するactive制約

**定義の確認**

$$
g_1(x)=x_1\le0,
\qquad
g_2(x)=x_2\le0
$$

を $x^*=(0,0)$ で考えると両方 active で

$$
\nabla g_1=(1,0)^{\mathsf T},
\qquad
\nabla g_2=(0,1)^{\mathsf T}.
$$

二ベクトルは一次独立なので LICQ の定義を満たします。
<!-- definition-example-end -->

---

## 4. MFCQ

<a id="def-f0-02c5a-mfcq"></a>

<!-- formal-statement-start -->
> **定義（MFCQ）**  
> 実行可能点 $x^*$ で次の二条件を満たすとき、MFCQ が成立するといいます。
>
> 1. 等式制約の勾配 $\nabla h_1(x^*),\ldots,\nabla h_r(x^*)$ が一次独立である。
> 2. ある方向 $v\in\mathbb R^n$ が存在して
>
> $$
> \nabla h_j(x^*)^{\mathsf T}v=0
> \quad(\forall j),
> $$
>
> かつ
>
> $$
> \nabla g_i(x^*)^{\mathsf T}v<0
> \quad(\forall i\in I(x^*)).
> $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-mfcq -->
### 4.1 例：MFCQは成立するがLICQは失敗する

**定義の確認**

$$
g_1(x)=x\le0,
\qquad
g_2(x)=2x\le0
$$

を $x^*=0$ で考えます。active勾配は1と2で一次従属なので LICQ は失敗します。

一方 $v=-1$ と取れば

$$
g_1'(0)v=-1<0,
\qquad
g_2'(0)v=-2<0.
$$

等式制約はないので第1条件は空条件です。従って MFCQ の二条件を満たします。
<!-- definition-example-end -->

退化例 $g(x)=x^2$ では $g'(0)v=0$ が全ての $v$ で成り立つため、strict inequality を作れず MFCQ は失敗します。

---

## 5. LICQならMFCQが成立する

<a id="thm-f0-02c5a-licq-mfcq"></a>

<!-- formal-statement-start -->
> **定理（LICQ $\Rightarrow$ MFCQ）**  
> 有限次元の滑らかな制約で、実行可能点 $x^*$ において LICQ が成立すれば MFCQ も成立します。
<!-- formal-statement-end -->

### 5.1 証明の見取り図

active 不等式勾配と等式勾配を行に並べた行列は行フルランクです。従って右辺を自由に指定でき、等式側を0、active不等式側を全て $-1$ にする方向を解けば、それが MFCQ 方向になります。

<!-- proof-start -->
### 証明

active index の個数を $q$ とします。行列

$$
A
=
\begin{pmatrix}
\nabla h_1(x^*)^{\mathsf T}\\
\vdots\\
\nabla h_r(x^*)^{\mathsf T}\\
\nabla g_{i_1}(x^*)^{\mathsf T}\\
\vdots\\
\nabla g_{i_q}(x^*)^{\mathsf T}
\end{pmatrix}
$$

を考えます。LICQ により行ベクトルは一次独立なので $A$ は行フルランクです。従って線形写像

$$
A:\mathbb R^n\to\mathbb R^{r+q}
$$

は全射です。

よって

$$
Av
=
(0,\ldots,0,-1,\ldots,-1)^{\mathsf T}
$$

を満たす $v$ が存在します。この $v$ は

$$
\nabla h_j(x^*)^{\mathsf T}v=0,
$$

$$
\nabla g_i(x^*)^{\mathsf T}v=-1<0
\qquad(i\in I(x^*))
$$

を満たします。従って MFCQ が成立します。$\square$
<!-- proof-end -->

---

## 6. 真のtangent coneは必ず線形化coneに含まれる

<a id="thm-f0-02c5a-tangent-subset-linearized"></a>

<!-- formal-statement-start -->
> **定理（常に $T_C(x^*)\subset L_C(x^*)$）**  
> 全ての $g_i,h_j$ が $x^*$ で微分可能なら
>
> $$
> \boxed{T_C(x^*)\subset L_C(x^*)}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 6.1 証明の見取り図

実行可能点列 $x_k$ を $x^*$ へ近づけ、制約式を一次展開します。active不等式では $g_i(x^*)=0$、等式では両端が0なので、極限で線形化条件が残ります。

<!-- proof-start -->
### 証明

$d\in T_C(x^*)$ とします。tangent cone の定義から、$t_k\downarrow0$ と $x_k\in C$ が存在して

$$
\frac{x_k-x^*}{t_k}\to d.
$$

active な $i\in I(x^*)$ について

$$
g_i(x_k)\le0=g_i(x^*).
$$

微分可能性から

$$
g_i(x_k)-g_i(x^*)
=
\nabla g_i(x^*)^{\mathsf T}(x_k-x^*)
+o(\|x_k-x^*\|).
$$

$t_k$ で割って極限を取れば

$$
\nabla g_i(x^*)^{\mathsf T}d\le0.
$$

同様に等式制約では

$$
h_j(x_k)-h_j(x^*)=0
$$

なので

$$
\nabla h_j(x^*)^{\mathsf T}d=0.
$$

従って $d\in L_C(x^*)$ です。$\square$
<!-- proof-end -->

退化例 $x^2\le0$ では、この包含が strict になっていました。制約想定の仕事は逆包含を回復することです。

---

## 7. MFCQなら線形化方向を実際の接方向へ戻せる

<a id="thm-f0-02c5a-mfcq-tangent-equality"></a>

<!-- formal-statement-start -->
> **定理（MFCQ下の接錐一致）**  
> $g_i,h_j$ が $C^1$ 級で、実行可能点 $x^*$ において MFCQ が成立するとします。このとき
>
> $$
> \boxed{T_C(x^*)=L_C(x^*)}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 7.1 証明の見取り図

$T\subset L$ は前節で証明済みです。逆向きでは $d\in L$ に MFCQ 方向 $v$ を少量足して

$$
d_\varepsilon=d+\varepsilon v
$$

とすると、active不等式の一次項が全て strict に負になります。等式制約がある場合は、行フルランク性により陰関数定理で $o(t)$ の補正を加え、等式を正確に満たす曲線へ直します。

<!-- proof-start -->
### 証明

前節から $T_C(x^*)\subset L_C(x^*)$ は既に分かっています。逆包含を示します。

$d\in L_C(x^*)$ を任意に取ります。MFCQ方向を $v$ とし、$\varepsilon>0$ に対して

$$
d_\varepsilon=d+\varepsilon v
$$

と置きます。等式制約について

$$
\nabla h_j(x^*)^{\mathsf T}d_\varepsilon=0,
$$

active不等式について

$$
\nabla g_i(x^*)^{\mathsf T}d_\varepsilon
=
\nabla g_i(x^*)^{\mathsf T}d
+
\varepsilon\nabla g_i(x^*)^{\mathsf T}v
<0.
$$

まず等式制約を正確に満たす曲線を作ります。$B=DH(x^*)$ と置きます。MFCQより $B$ は行フルランクなので

$$
\mathbb R^n=\ker B\oplus V
$$

となり、$B|_V:V\to\mathbb R^r$ が同型になる部分空間 $V$ を取れます。

$$
F(t,w)
=
H(x^*+td_\varepsilon+w)
\qquad(w\in V)
$$

と置くと

$$
F(0,0)=0,
\qquad
D_wF(0,0)=B|_V
$$

は可逆です。有限次元の陰関数定理により、十分小さい $t$ に対して $w(t)\in V$ が存在し

$$
H(x^*+td_\varepsilon+w(t))=0,
\qquad
w(0)=0
$$

となります。さらに $d_\varepsilon\in\ker B$ なので微分すると

$$
B(d_\varepsilon+w'(0))=0
$$

であり、$B|_V$ の可逆性から $w'(0)=0$ です。従って

$$
w(t)=o(t).
$$

そこで

$$
x_\varepsilon(t)
=x^*+td_\varepsilon+w(t)
$$

と置きます。等式制約は正確に満たしています。

active不等式については

$$
\begin{aligned}
g_i(x_\varepsilon(t))
&=g_i(x^*)
+t\nabla g_i(x^*)^{\mathsf T}d_\varepsilon
+o(t)\\
&=t\nabla g_i(x^*)^{\mathsf T}d_\varepsilon+o(t)
<0
\end{aligned}
$$

が十分小さい $t>0$ で成り立ちます。inactive不等式は $g_i(x^*)<0$ なので連続性だけで小さい $t$ に対して負のままです。従って $x_\varepsilon(t)\in C$ です。

また

$$
\frac{x_\varepsilon(t)-x^*}{t}
=
d_\varepsilon+rac{w(t)}t
\to d_\varepsilon.
$$

よって $d_\varepsilon\in T_C(x^*)$ です。

最後に $\varepsilon\downarrow0$ で $d_\varepsilon\to d$ です。Bouligand tangent cone は閉集合です。実際、$d_k\in T_C(x^*)$、$d_k\to d$ なら、各 $k$ の定義列から $t<1/k$ かつ差商が $d_k$ から $1/k$ 未満の点を一つ選ぶ対角化で $d$ の定義列を作れます。従って $d\in T_C(x^*)$ です。

以上から $L_C(x^*)\subset T_C(x^*)$ も成り立ち、両者は一致します。$\square$
<!-- proof-end -->

---

## 8. Robinson CQ

錐制約の一般形では MFCQ を成分ごとに書く代わりに、制約値空間の0の周囲を線形化で埋められるかを見ます。

<a id="def-f0-02c5a-robinson"></a>

<!-- formal-statement-start -->
> **定義（通常制約に対するRobinson CQ）**  
> $H=(h_1,\ldots,h_r)$、$G=(g_1,\ldots,g_m)$ とし、実行可能点 $x^*$ で
>
> $$
> 0
> \in
> \operatorname{int}
> \left(
> (H(x^*),G(x^*))
> +D(H,G)(x^*)\mathbb R^n
> +(\{0\}\times\mathbb R_+^m)
> \right)
> $$
>
> が成り立つとき、Robinson CQ が成立するといいます。内部は $\mathbb R^{r+m}$ で取ります。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-robinson -->
### 8.1 例：$g(x)=x\le0$ の境界ではRobinson CQが成立する

**定義の確認**

等式制約はなく、$x^*=0$ では

$$
G(0)=0,
\qquad
DG(0)\mathbb R=\mathbb R,
\qquad
K=\mathbb R_+.
$$

従って

$$
G(0)+DG(0)\mathbb R+\mathbb R_+
=
\mathbb R+\mathbb R_+
=
\mathbb R.
$$

0は $\mathbb R$ の内部にあるので、Robinson CQ の定義を満たします。
<!-- definition-example-end -->

---

## 9. 通常の滑らかな制約ではRobinson CQとMFCQが同値

<a id="thm-f0-02c5a-robinson-mfcq"></a>

<!-- formal-statement-start -->
> **定理（通常制約では Robinson CQ $\iff$ MFCQ）**  
> 有限次元の $C^1$ 級不等式・等式制約について、実行可能点 $x^*$ における上の Robinson CQ と MFCQ は同値です。
<!-- formal-statement-end -->

### 9.1 証明の見取り図

MFCQ方向は active 不等式を一斉に strict な内側へ押します。等式Jacobianの全射性で等式側の小さな変動も作れるため、制約値空間の0の周囲が埋まります。逆に Robinson CQ の内部条件から、等式側の全射性と「全active不等式を $-\varepsilon$ より小さくする方向」を直接取り出せます。

<!-- proof-start -->
### 証明

$B=DH(x^*)$、$A=DG(x^*)$、$G^*=G(x^*)$ と書きます。実行可能なので $H(x^*)=0$、$G^*\le0$ です。

まず MFCQ を仮定します。$B$ は行フルランクなので右逆行列 $R$ を取り

$$
BR=I_r
$$

とできます。また MFCQ方向 $v$ は

$$
Bv=0,
\qquad
A_iv<0
\quad(i\in I(x^*)).
$$

十分小さい固定の $t_0>0$ を取れば、active成分では $G_i^*+t_0A_iv<0$、inactive成分でも元々 $G_i^*<0$ なので

$$
q:=G^*+A(t_0v)<0
$$

を全成分で実現できます。

$(z,y)$ を $(0,0)$ に十分近い点とします。$d=t_0v+Rz$ と置けば

$$
Bd=z.
$$

また $z$ が十分小さければ $A Rz$ も小さいので

$$
G^*+Ad<y
$$

を成分ごとに保てます。従って

$$
k:=y-(G^*+Ad)\in\mathbb R_+^m
$$

と置けば

$$
(z,y)
=(0,G^*)+(Bd,Ad)+(0,k)
$$

です。よって0の近傍全体が Robinson の集合に含まれ、0は内部点です。

逆に Robinson CQ を仮定します。集合の等式側成分は $B\mathbb R^n$ だけなので、0の近傍を含むためには

$$
B\mathbb R^n=\mathbb R^r
$$

でなければなりません。従って等式勾配は一次独立です。

さらに内部条件から、ある $\varepsilon>0$ に対して

$$
(0,-\varepsilon\mathbf1)
$$

も Robinson の集合に入ります。従ってある $d$ と $k\ge0$ が存在して

$$
Bd=0,
$$

$$
G^*+Ad+k=-\varepsilon\mathbf1.
$$

active $i$ では $G_i^*=0$ なので

$$
A_i d
=-\varepsilon-k_i
<0.
$$

従ってこの $d$ が MFCQ方向です。以上で同値性が示されました。$\square$
<!-- proof-end -->

---

## 10. 線形化coneのpolarを制約勾配で表す

active勾配を行に並べた行列を $A_I$、等式勾配を行に並べた行列を $B$ とします。すると

$$
L_C(x^*)
=
\{d:A_Id\le0,\ Bd=0\}.
$$

<a id="lem-f0-02c5a-linearized-polar"></a>

<!-- formal-statement-start -->
> **補題（線形化coneのpolar）**  
> 上の $L_C(x^*)$ に対して
>
> $$
> \boxed{
> L_C(x^*)^\circ
> =
> \{A_I^{\mathsf T}\lambda+B^{\mathsf T}\nu:
> \lambda\ge0,\ \nu\in\mathbb R^r\}
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 10.1 証明の見取り図

右辺から左辺は内積を計算するだけです。逆向きは、もしある polar ベクトルが右辺の閉凸錐の外にあれば、その錐と点を分離します。分離方向は自動的に $A_Id\le0$、$Bd=0$ を満たすので $d\in L_C$ となり、polar条件と矛盾します。

<!-- proof-start -->
### 証明

まず

$$
w=A_I^{\mathsf T}\lambda+B^{\mathsf T}\nu,
\qquad\lambda\ge0
$$

とします。$d\in L_C(x^*)$ なら

$$
w^{\mathsf T}d
=
\lambda^{\mathsf T}A_Id
+
u^{\mathsf T}Bd
\le0,
$$

よって $w\in L_C(x^*)^\circ$ です。

逆に $w\in L_C(x^*)^\circ$ とし、

$$
M
=
\{A_I^{\mathsf T}\lambda+B^{\mathsf T}\nu:
\lambda\ge0,\ \nu\in\mathbb R^r\}
$$

と置きます。$M$ は有限生成錐と部分空間の和なので閉凸錐です。

もし $w\notin M$ なら、有限次元の点と閉凸集合の分離により、ある $d$ が存在して

$$
w^{\mathsf T}d>0,
\qquad
m^{\mathsf T}d\le0
\quad(\forall m\in M)
$$

となります。

$B^{\mathsf T}\nu$ は $\nu$ と $-\nu$ の両方について $M$ に現れるので

$$
\nu^{\mathsf T}Bd=0
\qquad(\forall\nu),
$$

従って $Bd=0$ です。また $A_I^{\mathsf T}\lambda$ について全ての $\lambda\ge0$ で

$$
\lambda^{\mathsf T}A_Id\le0
$$

なので $A_Id\le0$ です。従って $d\in L_C(x^*)$ です。

しかし $w\in L_C(x^*)^\circ$ なら $w^{\mathsf T}d\le0$ でなければならず、$w^{\mathsf T}d>0$ に矛盾します。従って $w\in M$ です。$\square$
<!-- proof-end -->

---

## 11. MFCQからKKT乗数の存在を導く

<a id="thm-f0-02c5a-mfcq-kkt"></a>

<!-- formal-statement-start -->
> **定理（MFCQ下のKKT乗数存在）**  
> $f,g_i,h_j$ を $C^1$ 級とし、$x^*$ を局所最適な実行可能点とします。$x^*$ で MFCQ が成立すれば、ある
>
> $$
> \lambda_i\ge0,
> \qquad
> \nu_j\in\mathbb R
> $$
>
> が存在して
>
> $$
> \boxed{
> \nabla f(x^*)
> +\sum_{i=1}^m\lambda_i\nabla g_i(x^*)
> +\sum_{j=1}^r\nu_j\nabla h_j(x^*)
> =0
> }
> $$
>
> および
>
> $$
> \boxed{
> \lambda_i g_i(x^*)=0
> \qquad(i=1,\ldots,m)
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 11.1 証明の見取り図

局所最適性から $-\nabla f$ は真の tangent cone の polar に入ります。MFCQ が $T=L$ を保証し、前節の polar 表示が $-\nabla f$ を active 制約勾配の非負結合と等式勾配の線形結合へ分解します。これがそのまま KKT 乗数です。

<!-- proof-start -->
### 証明

[局所最適点の接方向条件](../F0_02C5_一般化KKT_制約写像_制約想定/index.md#lem-f0-02c5-local-min-tangent)から

$$
-\nabla f(x^*)
\in
T_C(x^*)^\circ.
$$

MFCQ 下では [接錐一致](#thm-f0-02c5a-mfcq-tangent-equality)により

$$
T_C(x^*)^\circ
=
L_C(x^*)^\circ.
$$

さらに [線形化coneのpolar表示](#lem-f0-02c5a-linearized-polar)から、active index に対する $\lambda_i\ge0$ と $\nu_j\in\mathbb R$ が存在して

$$
-\nabla f(x^*)
=
\sum_{i\in I(x^*)}\lambda_i\nabla g_i(x^*)
+
\sum_{j=1}^r\nu_j\nabla h_j(x^*)
$$

と書けます。inactive index では $\lambda_i=0$ と定めれば stationarity が得られます。

active index では $g_i(x^*)=0$、inactive index では $\lambda_i=0$ なので全ての $i$ で

$$
\lambda_i g_i(x^*)=0.
$$

従って KKT 条件が成立します。$\square$
<!-- proof-end -->

[Robinson CQとMFCQの同値](#thm-f0-02c5a-robinson-mfcq)と合わせれば、通常の滑らかな有限次元制約では Robinson CQ からも同じ KKT 乗数存在が従います。

---

## 12. smooth convex inequality のnormal cone公式

等式制約なしで、各 $g_i$ が凸かつ微分可能とします。このとき

$$
C=\{x:g_i(x)\le0\}
$$

は凸集合です。

<a id="cor-f0-02c5a-smooth-normal"></a>

<!-- formal-statement-start -->
> **系（MFCQ下のsmooth convex inequalityのnormal cone）**  
> $x^*\in C$ で MFCQ が成立すると
>
> $$
> \boxed{
> N_C(x^*)
> =
> \left\{
> \sum_{i=1}^m\lambda_i\nabla g_i(x^*):
> \lambda_i\ge0,
> \ \lambda_i g_i(x^*)=0
> \right\}
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 12.1 証明の見取り図

凸集合では $N_C=T_C^\circ$ です。MFCQ で $T_C=L_C$、線形化coneのpolarで active 勾配の非負結合へ変換すれば式が出ます。

<!-- proof-start -->
### 証明

凸集合について

$$
N_C(x^*)=T_C(x^*)^\circ.
$$

MFCQ と前節までの結果から

$$
T_C(x^*)^\circ
=
\left\{
\sum_{i\in I(x^*)}\lambda_i\nabla g_i(x^*):
\lambda_i\ge0
\right\}.
$$

inactive index の係数を0とすれば、これは相補性 $\lambda_i g_i(x^*)=0$ を含む表示と同じです。$\square$
<!-- proof-end -->

これで C4 で抽象的に置いた normal cone が、滑らかな不等式制約の勾配から実際に生成されることまでつながりました。

---

## 13. 演習 Level A

### F0-02C5A-A01 退化制約でMFCQが壊れる

- Level: A
- 目安時間: 8分
- 主題: MFCQ
- 使用技術: active勾配

$g(x)=x^2\le0$ の実行可能点0で MFCQ が失敗する理由を定義から示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$g(0)=0$ なので active です。しかし

$$
g'(0)=0
$$

なので任意の方向 $v$ で

$$
g'(0)v=0
$$

です。MFCQ が要求する strict inequality $g'(0)v<0$ を満たす方向は存在しません。
##### 本番答案
$g'(0)=0$ より全ての $v$ で $g'(0)v=0$。従って active 制約を strict に内側へ動かす方向がなく MFCQ は失敗。
##### 採点基準（20点）
- active判定: 5点
- 微分: 5点
- MFCQ条件: 6点
- 結論: 4点
<!-- solution-end -->

### F0-02C5A-A02 MFCQは成立するがLICQは失敗

- Level: A
- 目安時間: 10分
- 主題: LICQとMFCQ
- 使用技術: 一次従属・方向選択

$g_1(x)=x\le0$、$g_2(x)=2x\le0$ を0で考え、LICQとMFCQを判定せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
active勾配は1と2で一次従属なので LICQ は失敗します。一方 $v=-1$ とすれば

$$
1\cdot(-1)<0,
\qquad
2\cdot(-1)<0
$$

なので MFCQ は成立します。
##### 本番答案
勾配1,2は一次従属なので LICQ 不成立。$v=-1$ で両方向微分が負なので MFCQ 成立。
##### 採点基準（20点）
- active勾配: 4点
- LICQ判定: 6点
- MFCQ方向: 6点
- 結論: 4点
<!-- solution-end -->

### F0-02C5A-A03 Robinson CQを直接確認する

- Level: A
- 目安時間: 10分
- 主題: Robinson CQ
- 使用技術: 線形化像と錐の和

$g(x)=x\le0$ を $x^*=0$ で考え、Robinson CQ を定義式から確認せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答

$$
G(0)=0,
\qquad
DG(0)\mathbb R=\mathbb R,
\qquad
K=\mathbb R_+.
$$

従って

$$
G(0)+DG(0)\mathbb R+K=\mathbb R.
$$

0はその内部点なので Robinson CQ が成立します。
##### 本番答案
$0+\mathbb R+\mathbb R_+=\mathbb R$ で $0\in\operatorname{int}\mathbb R$。従って Robinson CQ 成立。
##### 採点基準（20点）
- $G(0)$: 4点
- 線形化像: 6点
- 集合和: 6点
- 内部判定: 4点
<!-- solution-end -->

---

## 14. 演習 Level B

### F0-02C5A-B01 LICQからMFCQ方向を構成する

- Level: B
- 目安時間: 15分
- 主題: LICQ $\Rightarrow$ MFCQ
- 使用技術: 線形方程式

$\mathbb R^2$ で

$$
g_1(x)=x_1\le0,
\qquad
g_2(x)=x_2\le0
$$

を原点で考える。LICQを確認し、MFCQ方向を一つ構成せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
勾配は

$$
\nabla g_1=(1,0)^T,
\qquad
\nabla g_2=(0,1)^T
$$

で一次独立なので LICQ が成立します。

$$
v=(-1,-1)^T
$$

と取れば

$$
\nabla g_1^Tv=-1<0,
\qquad
\nabla g_2^Tv=-1<0.
$$

従って MFCQ も成立します。
##### 本番答案
勾配は標準基底で一次独立。$v=(-1,-1)^T$ なら両 active 制約の方向微分が $-1$ なので MFCQ 成立。
##### 採点基準（20点）
- 勾配: 4点
- LICQ: 6点
- 方向構成: 6点
- MFCQ確認: 4点
<!-- solution-end -->

### F0-02C5A-B02 tangent coneと線形化coneを一致させる

- Level: B
- 目安時間: 15分
- 主題: 接錐一致
- 使用技術: MFCQ

$$
C=\{(x_1,x_2):x_1^2+x_2^2\le1\}
$$

の点 $x^*=(1,0)$ で $L_C(x^*)$ を求め、MFCQを確認して $T_C(x^*)=L_C(x^*)$ を結論せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
制約を

$$
g(x)=x_1^2+x_2^2-1\le0
$$

と置くと

$$
\nabla g(1,0)=(2,0)^T.
$$

従って

$$
L_C(1,0)
=\{d:2d_1\le0\}
=\{d:d_1\le0\}.
$$

$v=(-1,0)$ とすれば $\nabla g^Tv=-2<0$ なので MFCQ が成立します。定理より

$$
\boxed{T_C(1,0)=\{d:d_1\le0\}}.
$$
##### 本番答案
$\nabla g(1,0)=(2,0)^T$ より $L_C=\{d:d_1\le0\}$。$v=(-1,0)$ で strict に負なので MFCQ 成立。従って $T_C=L_C$。
##### 採点基準（20点）
- 勾配: 4点
- 線形化cone: 6点
- MFCQ: 5点
- 接錐一致: 5点
<!-- solution-end -->

### F0-02C5A-B03 MFCQからKKT乗数を求める

- Level: B
- 目安時間: 18分
- 主題: KKT乗数存在
- 使用技術: active勾配の非負結合

$$
\min_{x\in\mathbb R} (x-1)^2
\quad\text{subject to}\quad
x\le0
$$

を考える。最適点 $x^*=0$ で MFCQ を確認し、KKT乗数を求めよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$g(x)=x$ とすると $g'(0)=1$ です。$v=-1$ で $g'(0)v=-1<0$ なので MFCQ が成立します。

目的関数の微分は

$$
f'(0)=2(0-1)=-2.
$$

stationarity

$$
-2+\lambda\cdot1=0
$$

より

$$
\lambda=2\ge0.
$$

また $g(0)=0$ なので相補性も成立します。
##### 本番答案
$v=-1$ で MFCQ。$f'(0)=-2,g'(0)=1$ より stationarity は $-2+\lambda=0$、従って $\boxed{\lambda=2}$。相補性も $2\cdot0=0$。
##### 採点基準（20点）
- MFCQ: 5点
- 微分: 5点
- stationarity: 6点
- 相補性: 4点
<!-- solution-end -->

### F0-02C5A-B04 smooth inequalityのnormal cone

- Level: B
- 目安時間: 15分
- 主題: normal cone公式
- 使用技術: active勾配

単位円板

$$
C=\{x\in\mathbb R^2:x_1^2+x_2^2\le1\}
$$

について $N_C(1,0)$ を smooth inequality のnormal cone公式から求めよ。

<!-- solution-start -->
#### 解答
##### 詳細解答

$$
g(x)=x_1^2+x_2^2-1,
\qquad
\nabla g(1,0)=(2,0)^T.
$$

この制約は凸で、$v=(-1,0)$ により MFCQ も成立します。従って

$$
N_C(1,0)
=\{\lambda(2,0)^T:\lambda\ge0\}
=\{(t,0)^T:t\ge0\}.
$$
##### 本番答案
$\nabla g(1,0)=(2,0)^T$、MFCQ成立。従って

$$
\boxed{N_C(1,0)=\{(t,0)^T:t\ge0\}}.
$$
##### 採点基準（20点）
- 制約関数: 4点
- 勾配: 5点
- MFCQ: 4点
- normal cone: 7点
<!-- solution-end -->

---

## 15. 章末チェック

- active set と線形化coneを定義から計算できる。
- 退化制約で $T_C\ne L_C$ となる理由を説明できる。
- LICQ と MFCQ を具体例で判定できる。
- LICQ $\Rightarrow$ MFCQ を線形代数から証明できる。
- MFCQ 下で $T_C=L_C$ を証明できる。
- 通常制約で Robinson CQ $\iff$ MFCQ を証明できる。
- 線形化coneのpolarを制約勾配で表せる。
- MFCQ / Robinson CQ から KKT 乗数の存在を導ける。
- smooth convex inequality のnormal coneを active 勾配の非負結合で書ける。

次は [F0-02C6 Hahn--Banach・汎関数拡張](../F0_02C6_Hahn_Banach_分離定理/index.md) へ進みます。
