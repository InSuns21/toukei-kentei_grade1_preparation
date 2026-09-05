# F0-02C5A 関数解析V-A：制約想定・LICQ・MFCQ・Robinson CQ

KKT は「局所最適なら自動的に成立する公式」ではありません。制約の一次近似が退化すると、真の実行可能集合と線形化された集合が食い違い、乗数が存在しないことがあります。

この講義では有限次元の滑らかな制約

$$
g_i(x)\le0\quad(i=1,\ldots,m),
\qquad
h_j(x)=0\quad(j=1,\ldots,r)
$$

について、次の鎖を閉じます。

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

## 1. KKT が失敗する最小の反例

$$
\min_{x\in\mathbb R} f(x)=x
\qquad\text{subject to}\qquad
x^2\le0
$$

を考えます。実行可能点は $x=0$ だけなので $x^*=0$ は局所最適点です。

ところが KKT の停留条件は

$$
f'(0)+\lambda g'(0)=1+\lambda\cdot0=0
$$

となり、どの $\lambda$ でも成立しません。壊れているのは最適性ではなく、$g'(0)=0$ のため一次近似が制約を見失っていることです。

---

## 2. active set と線形化cone

実行可能集合を

$$
C=\{x:g_i(x)\le0,\ h_j(x)=0\}
$$

とします。

<a id="def-f0-02c5a-active-linearized"></a>

<!-- formal-statement-start -->
> **定義（active set・線形化cone）**  
> 実行可能点 $x^*$ における active set を
>
> $$
> I(x^*)=\{i:g_i(x^*)=0\}
> $$
>
> とします。また
>
> $$
> L_C(x^*)=
> \left\{d:
> \nabla g_i(x^*)^{\mathsf T}d\le0\ (i\in I(x^*)),\ 
> \nabla h_j(x^*)^{\mathsf T}d=0\ (j=1,\ldots,r)
> \right\}
> $$
>
> を $x^*$ における線形化coneといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-active-linearized -->
### 2.1 例：$x^2\le0$ では線形化が制約を消す

**定義の確認**

$x^*=0$ では $g(0)=0$ なので $I(0)=\{1\}$ です。しかし $g'(0)=0$ だから線形化条件は

$$
0\cdot d\le0,
$$

すなわち全ての $d\in\mathbb R$ を許します。従って

$$
L_C(0)=\mathbb R.
$$

一方、真の実行可能集合は $C=\{0\}$ なので [Bouligand tangent cone](../F0_02C4A_tangent_polar_dual_cone/index.md#def-f0-02c4a-tangent-cone) は

$$
T_C(0)=\{0\}.
$$

したがって $T_C(0)\ne L_C(0)$ です。
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

を $x^*=(0,0)$ で考えると、両方 active で

$$
\nabla g_1=(1,0)^{\mathsf T},
\qquad
\nabla g_2=(0,1)^{\mathsf T}.
$$

二つは一次独立なので LICQ を満たします。
<!-- definition-example-end -->

---

## 4. MFCQ

<a id="def-f0-02c5a-mfcq"></a>

<!-- formal-statement-start -->
> **定義（MFCQ）**  
> 実行可能点 $x^*$ で次の二条件を満たすとき、MFCQ が成立するといいます。
>
> 1. $\nabla h_1(x^*),\ldots,\nabla h_r(x^*)$ が一次独立である。
> 2. ある $v\in\mathbb R^n$ が存在して
>
> $$
> \nabla h_j(x^*)^{\mathsf T}v=0\quad(\forall j),
> $$
>
> かつ
>
> $$
> \nabla g_i(x^*)^{\mathsf T}v<0\quad(\forall i\in I(x^*)).
> $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-mfcq -->
### 4.1 例：MFCQ は成立するが LICQ は失敗する

**定義の確認**

$$
g_1(x)=x\le0,
\qquad g_2(x)=2x\le0
$$

を $x^*=0$ で考えます。active勾配は1と2で一次従属なので LICQ は失敗します。

一方 $v=-1$ と取れば

$$
g_1'(0)v=-1<0,
\qquad g_2'(0)v=-2<0.
$$

等式制約はないので第1条件は空条件です。従って MFCQ は成立します。
<!-- definition-example-end -->

退化例 $g(x)=x^2$ では $g'(0)v=0$ が全ての $v$ で成り立つため MFCQ も失敗します。

---

## 5. LICQ なら MFCQ

<a id="thm-f0-02c5a-licq-mfcq"></a>

<!-- formal-statement-start -->
> **定理（LICQ $\Rightarrow$ MFCQ）**  
> 有限次元の滑らかな制約で、実行可能点 $x^*$ において LICQ が成立すれば MFCQ も成立します。
<!-- formal-statement-end -->

### 証明の見取り図

active不等式勾配と等式勾配を行に並べた行列は行フルランクです。そこで等式側の方向微分を0、active不等式側をすべて $-1$ にする線形方程式を解きます。

<!-- proof-start -->
### 証明

active index を $i_1,\ldots,i_q$ とし

$$
A=
\begin{pmatrix}
\nabla h_1(x^*)^{\mathsf T}\\
\vdots\\
\nabla h_r(x^*)^{\mathsf T}\\
\nabla g_{i_1}(x^*)^{\mathsf T}\\
\vdots\\
\nabla g_{i_q}(x^*)^{\mathsf T}
\end{pmatrix}
$$

とします。LICQ により $A$ は行フルランクなので

$$
A:\mathbb R^n\to\mathbb R^{r+q}
$$

は全射です。従って

$$
Av=(0,\ldots,0,-1,\ldots,-1)^{\mathsf T}
$$

を満たす $v$ が存在します。この $v$ は MFCQ の二条件を満たします。$\square$
<!-- proof-end -->

---

## 6. 常に $T_C(x^*)\subset L_C(x^*)$

<a id="thm-f0-02c5a-tangent-subset-linearized"></a>

<!-- formal-statement-start -->
> **定理（接錐は線形化coneに含まれる）**  
> 全ての $g_i,h_j$ が $x^*$ で微分可能なら
>
> $$
> T_C(x^*)\subset L_C(x^*)
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

接方向を与える実行可能点列へ各制約の一次展開を適用し、$t_k$ で割って極限を取ります。

<!-- proof-start -->
### 証明

$d\in T_C(x^*)$ とします。定義から $t_k\downarrow0$ と $x_k\in C$ が存在して

$$
\frac{x_k-x^*}{t_k}\to d.
$$

active な $i$ について $g_i(x_k)\le0=g_i(x^*)$ です。微分可能性から

$$
g_i(x_k)-g_i(x^*)
=\nabla g_i(x^*)^{\mathsf T}(x_k-x^*)+o(\|x_k-x^*\|).
$$

$t_k$ で割って極限を取ると

$$
\nabla g_i(x^*)^{\mathsf T}d\le0.
$$

等式制約では $h_j(x_k)-h_j(x^*)=0$ なので同様に

$$
\nabla h_j(x^*)^{\mathsf T}d=0.
$$

従って $d\in L_C(x^*)$ です。$\square$
<!-- proof-end -->

---

## 7. MFCQ の下では $T_C(x^*)=L_C(x^*)$

<a id="thm-f0-02c5a-mfcq-tangent-equality"></a>

<!-- formal-statement-start -->
> **定理（MFCQ下の接錐一致）**  
> $g_i,h_j$ が $C^1$ 級で、実行可能点 $x^*$ において MFCQ が成立するとします。このとき
>
> $$
> T_C(x^*)=L_C(x^*)
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

$d\in L_C(x^*)$ に MFCQ 方向 $v$ を少量足して $d_\varepsilon=d+\varepsilon v$ とすると、active不等式の方向微分がすべて厳密に負になります。等式制約は陰関数定理で作る等式多様体上の曲線に沿わせます。

<!-- proof-start -->
### 証明

前節から $T_C(x^*)\subset L_C(x^*)$ は分かっています。逆包含を示します。

$d\in L_C(x^*)$ を取り、MFCQ方向を $v$ とします。$\varepsilon>0$ に対して

$$
d_\varepsilon=d+\varepsilon v
$$

と置けば

$$
\nabla h_j(x^*)^{\mathsf T}d_\varepsilon=0
$$

かつ active な全ての $i$ について

$$
\nabla g_i(x^*)^{\mathsf T}d_\varepsilon<0.
$$

MFCQ の第1条件から $Dh(x^*)$ は行フルランクです。座標を並べ替えれば、$x=(u,z)$ と分けたとき $D_zh(x^*)$ を正則にできます。陰関数定理により、$x^*$ の近くで等式集合 $h(x)=0$ は

$$
z=\varphi(u)
$$

と表せます。

$d_\varepsilon=(d_u,d_z)$ と分けます。$Dh(x^*)d_\varepsilon=0$ と陰関数定理の微分公式から

$$
D\varphi(u^*)d_u=d_z.
$$

そこで

$$
x_\varepsilon(t)
=\bigl(u^*+td_u,\ \varphi(u^*+td_u)\bigr)
$$

と置けば

$$
h(x_\varepsilon(t))=0,
\qquad
\frac{x_\varepsilon(t)-x^*}{t}\to d_\varepsilon.
$$

active不等式について一次展開すると

$$
g_i(x_\varepsilon(t))
=t\nabla g_i(x^*)^{\mathsf T}d_\varepsilon+o(t)<0
$$

が十分小さい $t>0$ で成り立ちます。inactive不等式は $g_i(x^*)<0$ なので連続性により小さい $t$ で負のままです。従って $x_\varepsilon(t)\in C$ であり、$d_\varepsilon\in T_C(x^*)$ です。

最後に $\varepsilon\downarrow0$ とすると $d_\varepsilon\to d$ です。Bouligand tangent cone は閉です。実際、$d_k\in T_C(x^*)$、$d_k\to d$ のとき、各 $k$ の定義列から $t<1/k$ かつ差商が $d_k$ から $1/k$ 未満となる点を一つ選べば、対角化により $d$ の定義列を作れます。よって $d\in T_C(x^*)$ です。

従って $L_C(x^*)\subset T_C(x^*)$ も成り立ち、両者は一致します。$\square$
<!-- proof-end -->

---

## 8. Robinson CQ

通常制約に対して Robinson CQ を一次近似の像として書きます。active不等式を $q$ 本とし

$$
A d
=\bigl(\nabla g_i(x^*)^{\mathsf T}d\bigr)_{i\in I(x^*)},
\qquad
B d
=\bigl(\nabla h_j(x^*)^{\mathsf T}d\bigr)_{j=1}^r
$$

とします。

<a id="def-f0-02c5a-robinson"></a>

<!-- formal-statement-start -->
> **定義（有限次元の通常制約に対する Robinson CQ）**  
> 集合
>
> $$
> \mathcal R
> =
> \{(Bd,\ Ad+s):d\in\mathbb R^n,\ s\in\mathbb R_+^q\}
> $$
>
> が原点の近傍を含む、すなわち
>
> $$
> 0\in\operatorname{int}\mathcal R
> $$
>
> であるとき Robinson CQ が成立するといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c5a-robinson -->
### 8.1 例：$x\le0$ では Robinson CQ が成立する

**定義の確認**

$x^*=0$、$g(x)=x$ とすると $A=1$、等式制約はありません。従って

$$
\mathcal R=\{d+s:d\in\mathbb R,\ s\ge0\}=\mathbb R.
$$

よって $0$ はその内部にあり Robinson CQ が成立します。
<!-- definition-example-end -->

### 8.2 退化例では失敗する

$g(x)=x^2$、$x^*=0$ では $A=0$ なので

$$
\mathcal R=\mathbb R_+.
$$

原点は内部点ではないため Robinson CQ は失敗します。

---

## 9. 通常制約では Robinson CQ と MFCQ は同値

<a id="thm-f0-02c5a-robinson-mfcq"></a>

<!-- formal-statement-start -->
> **定理（Robinson CQ $\Longleftrightarrow$ MFCQ）**  
> 有限次元の滑らかな通常制約では、上の Robinson CQ と MFCQ は同値です。
<!-- formal-statement-end -->

### 証明の見取り図

Robinson CQ からは近傍内の $(0,-\mathbf1)$ を作ると MFCQ方向が出ます。逆向きは、等式側を解く方向と strict に内側へ向く MFCQ方向を組み合わせ、任意の小さな右辺を表します。

<!-- proof-start -->
### 証明

まず Robinson CQ を仮定します。$0$ の近傍を $\mathcal R$ が含むので、十分小さい $\delta>0$ に対して

$$
(0,-\delta\mathbf1)\in\mathcal R.
$$

従ってある $v$ と $s\ge0$ が存在して

$$
Bv=0,
\qquad
Av+s=-\delta\mathbf1.
$$

よって $Av\le-\delta\mathbf1<0$ です。また $\mathcal R$ の第1成分への射影が $0$ の近傍を含むので $B$ は全射、すなわち等式勾配は一次独立です。従って MFCQ が成立します。

逆に MFCQ を仮定します。$B$ は全射なので、右逆写像 $R:\mathbb R^r\to\mathbb R^n$ を一つ取れます。MFCQ方向 $v$ は

$$
Bv=0,
\qquad Av<0
$$

を満たします。有限個の成分しかないので、ある $c>0$ が存在して $Av\le-c\mathbf1$ です。

小さい $(y,z)\in\mathbb R^r\times\mathbb R^q$ に対し、まず $d_0=Ry$ と置くと $Bd_0=y$ です。$A d_0$ は $(y,z)$ とともに小さいので、十分大きいが固定の $\tau>0$ を選び

$$
d=d_0+\tau\|(y,z)\|v
$$

とすれば

$$
Ad\le z
$$

が近傍内で成り立つようにできます。そこで

$$
s=z-Ad\ge0
$$

と置けば

$$
(Bd,Ad+s)=(y,z).
$$

従って原点のある近傍が $\mathcal R$ に含まれ、Robinson CQ が成立します。$\square$
<!-- proof-end -->

---

## 10. 線形化coneのpolar

<a id="thm-f0-02c5a-linearized-polar"></a>

<!-- formal-statement-start -->
> **定理（線形化coneのpolar表示）**  
> active不等式の勾配を行に並べた行列を $A$、等式勾配を行に並べた行列を $B$ とすると
>
> $$
> L_C(x^*)=\{d:Ad\le0,\ Bd=0\}
> $$
>
> に対して
>
> $$
> \boxed{
> L_C(x^*)^\circ
> =
> \{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:
> \lambda\ge0,\ \nu\in\mathbb R^r\}
> }
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

右辺から左辺は直接計算できます。逆向きは右辺を有限生成凸錐とみなし、そこに入らないベクトルを射影で分離すると、線形化coneの元が作れて矛盾します。

<!-- proof-start -->
### 証明

右辺の集合を

$$
M=\{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:\lambda\ge0\}
$$

とします。$y\in M$、$d\in L_C(x^*)$ なら

$$
y^{\mathsf T}d
=\lambda^{\mathsf T}Ad+\nu^{\mathsf T}Bd
\le0,
$$

なので $M\subset L_C(x^*)^\circ$ です。

逆に $y\in L_C(x^*)^\circ$ なのに $y\notin M$ と仮定します。$M$ は

$$
\operatorname{cone}\{a_1,\ldots,a_q,b_1,-b_1,\ldots,b_r,-b_r\}
$$

という有限生成凸錐なので閉です。$y$ の $M$ への最近点を $p$ とし $d=y-p$ と置きます。閉凸集合への射影の特徴付けから

$$
d^{\mathsf T}(z-p)\le0\qquad(\forall z\in M).
$$

$M$ は錐なので $z=0$ と $z=2p$ を代入すると $d^{\mathsf T}p=0$ が従います。従って

$$
d^{\mathsf T}z\le0\qquad(\forall z\in M),
$$

一方

$$
d^{\mathsf T}y=\|y-p\|^2>0.
$$

$A$ の各行ベクトル $a_i$ は $M$ に入るので $Ad\le0$、また $\pm b_j\in M$ なので $Bd=0$ です。従って $d\in L_C(x^*)$ です。しかし $y\in L_C(x^*)^\circ$ なら $y^{\mathsf T}d\le0$ でなければならず矛盾します。従って $y\in M$ です。$\square$
<!-- proof-end -->

---

## 11. MFCQ から KKT 乗数が存在する

<a id="thm-f0-02c5a-mfcq-kkt"></a>

<!-- formal-statement-start -->
> **定理（MFCQ下のKKT乗数存在）**  
> $x^*$ が $C$ 上の局所最適点で、$f,g_i,h_j$ が $C^1$ 級、かつ $x^*$ で MFCQ が成立するとします。このとき、ある $\lambda_i\ge0$ と $\nu_j\in\mathbb R$ が存在して
>
> $$
> \nabla f(x^*)
> +\sum_{i=1}^m\lambda_i\nabla g_i(x^*)
> +\sum_{j=1}^r\nu_j\nabla h_j(x^*)=0,
> $$
>
> $$
> \lambda_i g_i(x^*)=0
> $$
>
> を満たします。
<!-- formal-statement-end -->

### 証明の見取り図

局所最適性で $-\nabla f(x^*)$ は接錐のpolarに入ります。MFCQで接錐を線形化coneへ置き換え、前節のpolar表示から乗数を読み取ります。

<!-- proof-start -->
### 証明

[局所最適点の接方向条件](../F0_02C5_一般化KKT_制約写像_制約想定/index.md#lem-f0-02c5-local-min-tangent) から

$$
-\nabla f(x^*)\in T_C(x^*)^\circ.
$$

MFCQ下では [接錐一致](#thm-f0-02c5a-mfcq-tangent-equality) により

$$
T_C(x^*)=L_C(x^*).
$$

従って [線形化coneのpolar表示](#thm-f0-02c5a-linearized-polar) から

$$
-\nabla f(x^*)
=A^{\mathsf T}\lambda+B^{\mathsf T}\nu,
\qquad\lambda\ge0
$$

と書けます。inactive な不等式には $\lambda_i=0$ を補えば停留条件が得られます。active な制約では $g_i(x^*)=0$、inactive な制約では $\lambda_i=0$ なので、全ての $i$ について

$$
\lambda_i g_i(x^*)=0
$$

です。$\square$
<!-- proof-end -->

したがってこのページの鎖は

$$
\boxed{
\text{MFCQ}
\Longleftrightarrow
\text{Robinson CQ}
\Longrightarrow
T=L
\Longrightarrow
\text{KKT乗数存在}
}
$$

まで閉じました。

---

## 12. 凸制約では normal cone の公式になる

<a id="thm-f0-02c5a-convex-normal-cone"></a>

<!-- formal-statement-start -->
> **定理（滑らかな凸制約集合のnormal cone）**  
> 各 $g_i$ が凸で $C^1$ 級、各 $h_j$ がアフィンで、$x^*$ で MFCQ が成立するとします。このとき
>
> $$
> N_C(x^*)
> =
> \left\{
> \sum_i\lambda_i\nabla g_i(x^*)
> +\sum_j\nu_j\nabla h_j(x^*):
> \lambda_i\ge0,
> \lambda_i g_i(x^*)=0
> \right\}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

凸集合では normal cone は tangent cone のpolarです。MFCQで $T=L$ とし、線形化coneのpolar表示を代入します。

<!-- proof-start -->
### 証明

凸制約の下で $C$ は凸集合なので

$$
N_C(x^*)=T_C(x^*)^\circ.
$$

MFCQにより $T_C(x^*)=L_C(x^*)$ であり、[線形化coneのpolar表示](#thm-f0-02c5a-linearized-polar) を適用すれば active 制約の非負結合と等式勾配の線形結合になります。inactive 制約の係数を0で補えば表示式が得られます。$\square$
<!-- proof-end -->

---

## 演習

### F0-02C5A-A01 退化制約で MFCQ が壊れる

- Level: A
- 目安時間: 8分

$g(x)=x^2\le0$ の実行可能点0で MFCQ が失敗する理由を述べよ。

<!-- solution-start -->
#### 詳細解答
active制約の微分は $g'(0)=0$ です。MFCQ はある $v$ について $g'(0)v<0$ を要求しますが、左辺は常に0なので不可能です。
#### 本番答案
$g'(0)=0$ なので任意の $v$ に対し $g'(0)v=0$。従って strict inequality を作れず MFCQ は失敗する。
#### 採点基準（20点）
- active制約の確認: 5点
- 微分 $g'(0)=0$: 5点
- MFCQ条件との比較: 6点
- 結論: 4点
<!-- solution-end -->

### F0-02C5A-A02 LICQ の判定

- Level: A
- 目安時間: 8分

$g_1(x)=x_1\le0$, $g_2(x)=x_2\le0$ を $x^*=(0,0)$ で考える。LICQ を判定せよ。

<!-- solution-start -->
#### 詳細解答
両制約がactiveで、勾配は $(1,0)^T,(0,1)^T$。一次独立なので LICQ は成立します。
#### 本番答案
$I(x^*)=\{1,2\}$、$\nabla g_1=(1,0)^T$, $\nabla g_2=(0,1)^T$ は一次独立。よって LICQ 成立。
#### 採点基準（20点）
- active set: 4点
- 勾配計算: 6点
- 一次独立性: 6点
- 結論: 4点
<!-- solution-end -->

### F0-02C5A-A03 Robinson CQ の判定

- Level: A
- 目安時間: 10分

$g(x)=x\le0$ を $x^*=0$ で考える。定義から Robinson CQ を確認せよ。

<!-- solution-start -->
#### 詳細解答
$A=1$ なので $\mathcal R=\{d+s:d\in\mathbb R,s\ge0\}=\mathbb R$。従って0は内部点です。
#### 本番答案
$\mathcal R=\mathbb R$ だから $0\in\operatorname{int}\mathcal R$。Robinson CQ は成立する。
#### 採点基準（20点）
- $A$ の計算: 4点
- $\mathcal R$ の計算: 8点
- 内部点判定: 4点
- 結論: 4点
<!-- solution-end -->

### F0-02C5A-B01 MFCQ は成立するが LICQ は失敗する例

- Level: B
- 目安時間: 12分

$g_1(x)=x\le0$, $g_2(x)=2x\le0$ を0で考え、LICQとMFCQを判定せよ。

<!-- solution-start -->
#### 詳細解答
active勾配1と2は一次従属なので LICQ は失敗します。一方 $v=-1$ なら両方向微分が負なので MFCQ は成立します。
#### 本番答案
$1,2$ は一次従属なので LICQ 不成立。$v=-1$ なら $g_1'v=-1<0$, $g_2'v=-2<0$ なので MFCQ 成立。
#### 採点基準（20点）
- active set: 3点
- LICQ判定: 6点
- MFCQ方向の提示: 7点
- 結論: 4点
<!-- solution-end -->

### F0-02C5A-B02 接錐と線形化cone

- Level: B
- 目安時間: 15分

$C=\{(x_1,x_2):x_2\ge x_1^2\}$ と $x^*=(0,0)$ を考える。$T_C(x^*)$ と線形化coneを求め、一致を確認せよ。

<!-- solution-start -->
#### 詳細解答
制約を $g(x)=x_1^2-x_2\le0$ と書くと $\nabla g(0,0)=(0,-1)^T$。従って線形化coneは $d_2\ge0$。実際、$d_2>0$ なら $(td_1,td_2)$ は十分小さい $t$ で実行可能、$d_2=0$ は $d_2^{(k)}>0$ から極限を取れるので接錐も $\{d:d_2\ge0\}$ です。
#### 本番答案
$\nabla g(0,0)=(0,-1)^T$ より $L_C=\{d:d_2\ge0\}$。$d_2>0$ は直線で実現でき、境界 $d_2=0$ は極限で入るため $T_C=L_C$。
#### 採点基準（20点）
- 制約表現: 4点
- 線形化cone: 6点
- 接方向の構成: 6点
- 一致の結論: 4点
<!-- solution-end -->

### F0-02C5A-B03 線形化coneのpolar

- Level: B
- 目安時間: 15分

$$
L=\{(d_1,d_2):d_1\le0,\ d_2=0\}
$$

の polar cone を求め、定理の表示と照合せよ。

<!-- solution-start -->
#### 詳細解答
$A=(1,0)$、$B=(0,1)$ と置けます。従って $L^\circ=\{(\lambda,\nu):\lambda\ge0,\nu\in\mathbb R\}$。直接にも $y_1d_1\le0$ を全ての $d_1\le0$ で満たすには $y_1\ge0$、$d_2=0$ なので $y_2$ は自由です。
#### 本番答案
$L^\circ=\{(y_1,y_2):y_1\ge0,\ y_2\in\mathbb R\}$。これは $A^T\lambda+B^T\nu$ ($\lambda\ge0$) と一致する。
#### 採点基準（20点）
- polar条件: 5点
- $y_1$ の符号: 5点
- $y_2$ 自由の確認: 4点
- 定理との照合: 6点
<!-- solution-end -->

### F0-02C5A-B04 KKT乗数の計算

- Level: B
- 目安時間: 15分

$$
\min_{x\in\mathbb R} \frac12(x+1)^2
\qquad\text{subject to}\qquad x\ge0
$$

について、最適解とKKT乗数を求めよ。制約は $g(x)=-x\le0$ と書け。

<!-- solution-start -->
#### 詳細解答
制約なし最小点は $x=-1$ で実行不能なので $x^*=0$。停留条件は $f'(0)+\lambda g'(0)=1-\lambda=0$ だから $\lambda=1$。主実行可能性、$\lambda\ge0$、相補性 $\lambda g(0)=0$ も満たします。
#### 本番答案
$x^*=0$。$1-\lambda=0$ より $\lambda=1$。$g(0)=0$, $\lambda\ge0$, $\lambda g(0)=0$ なのでKKT条件を満たす。
#### 採点基準（20点）
- 最適解: 5点
- 停留条件: 6点
- 乗数: 4点
- 残りのKKT確認: 5点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C6 Hahn--Banach・汎関数拡張](../F0_02C6_Hahn_Banach_分離定理/index.md)**
