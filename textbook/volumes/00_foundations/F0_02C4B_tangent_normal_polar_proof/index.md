# F0-02C4B：tangent cone と normal cone の polar 双対

C4Aでは

$$
N_C(x)=T_C(x)^\circ
$$

という関係を使いました。この補講では、凸集合についてこの等式を定義から証明します。

```text
Bouligand tangent cone
  = closure cone(C-x)
  ↓ polar を取る
normal cone
```

---

## 1. 設定

$X$ を実ノルム空間、$C\subset X$ を凸集合、$x\in C$ とします。

Bouligand tangent coneは

$$
T_C(x)=\left\{d:\exists t_n\downarrow0,\ \exists x_n\in C,
\ \frac{x_n-x}{t_n}\to d\right\}.
$$

また

$$
\operatorname{cone}(C-x)
:=\{\alpha(y-x):\alpha\ge0,\ y\in C\}
$$

と置きます。

normal coneは

$$
N_C(x)
:=\{x^*\in X^*:x^*(y-x)\le0\ \forall y\in C\},
$$

錐 $K\subset X$ のpolarは

$$
K^\circ
:=\{x^*\in X^*:x^*(k)\le0\ \forall k\in K\}
$$

です。

---

## 2. tangent cone は閉じた conic hull

<a id="thm-f0-02c4b-tangent-conic-hull"></a>

<!-- formal-statement-start -->
> **定理（凸集合のtangent cone表示）**  
> $C$ が凸、$x\in C$ なら次が成り立つ。

$$
\boxed{T_C(x)=\overline{\operatorname{cone}(C-x)}}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $d=\alpha(y-x)$、$\alpha\ge0$、$y\in C$ とします。$\alpha=0$ なら $d=0\in T_C(x)$ です。$\alpha>0$ なら $t_n\downarrow0$ を $t_n\alpha\le1$ となるように取り

$$
x_n=x+t_nd=(1-t_n\alpha)x+t_n\alpha y
$$

と置きます。凸性より $x_n\in C$ で

$$
\frac{x_n-x}{t_n}=d.
$$

従って

$$
\operatorname{cone}(C-x)\subset T_C(x).
$$

次に $T_C(x)$ が閉であることを示します。$d_m\in T_C(x)$、$d_m\to d$ とします。各 $m$ について定義列から十分先の1点を選び

$$
0<t_m<\frac1m,
\qquad
\left\|\frac{x_m-x}{t_m}-d_m\right\|<\frac1m
$$

とできます。必要なら $t_m$ の単調減少部分列を取り直します。このとき

$$
\left\|\frac{x_m-x}{t_m}-d\right\|
\le
\left\|\frac{x_m-x}{t_m}-d_m\right\|+\|d_m-d\|
\to0.
$$

よって $d\in T_C(x)$。したがって $T_C(x)$ は閉であり

$$
\overline{\operatorname{cone}(C-x)}\subset T_C(x).
$$

逆に $d\in T_C(x)$ なら、ある $x_n\in C$、$t_n\downarrow0$ について

$$
\frac{x_n-x}{t_n}\to d.
$$

各項は $\operatorname{cone}(C-x)$ に属するので

$$
d\in\overline{\operatorname{cone}(C-x)}.
$$

両包含から結論を得ます。$\square$
<!-- proof-end -->

---

## 3. normal cone は tangent cone のpolar

<a id="thm-f0-02c4b-normal-polar"></a>

<!-- formal-statement-start -->
> **定理（normal--tangent polar identity）**  
> $C\subset X$ が凸、$x\in C$ なら次が成り立つ。

$$
\boxed{N_C(x)=T_C(x)^\circ}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x^*\in N_C(x)$ とします。任意の $y\in C$ と $\alpha\ge0$ に対し

$$
x^*(\alpha(y-x))\le0.
$$

従って $x^*$ は $\operatorname{cone}(C-x)$ 上で非正です。$x^*$ は連続なので、その閉包上でも非正です。前節より

$$
T_C(x)=\overline{\operatorname{cone}(C-x)}
$$

だから

$$
x^*\in T_C(x)^\circ.
$$

よって $N_C(x)\subset T_C(x)^\circ$。

逆に $x^*\in T_C(x)^\circ$ とします。任意の $y\in C$ に対し

$$
y-x\in\operatorname{cone}(C-x)\subset T_C(x).
$$

従って

$$
x^*(y-x)\le0,
$$

すなわち $x^*\in N_C(x)$ です。両包含から結論を得ます。$\square$
<!-- proof-end -->

---

## 4. 例：半空間

$$
C=\{z\in\mathbb R^n:a^{\mathsf T}z\le b\}
$$

の境界点 $x$、すなわち $a^{\mathsf T}x=b$ を考えます。すると

$$
T_C(x)=\{d:a^{\mathsf T}d\le0\}.
$$

このpolarは

$$
T_C(x)^\circ=\{\lambda a:\lambda\ge0\}.
$$

normal coneの定義からも

$$
N_C(x)=\{\lambda a:\lambda\ge0\}
$$

であり、確かに一致します。

---

## 5. 例：非負直交錐

$C=\mathbb R_+^n$、$x=0$ なら

$$
T_C(0)=\mathbb R_+^n.
$$

本教材ではpolarを $\le0$ で定義しているので

$$
T_C(0)^\circ=\mathbb R_-^n=N_C(0).
$$

dual cone $K^*$ は $\ge0$ で定義しているため

$$
K^\circ=-K^*
$$

という符号差があります。

---

## 6. KKTへの接続

局所最適点 $x^*$ で、全ての実行可能な接方向 $d\in T_C(x^*)$ に対して

$$
Df(x^*)[d]\ge0
$$

なら

$$
(-Df(x^*))[d]\le0
\qquad(\forall d\in T_C(x^*)).
$$

従って

$$
-Df(x^*)\in T_C(x^*)^\circ=N_C(x^*),
$$

すなわち

$$
\boxed{0\in Df(x^*)+N_C(x^*)}.
$$

KKT乗数表示は、このnormal coneを制約勾配で表現する次の段階です。

---

## 7. 演習A

### A01 conic hull から接方向を作る

$d=\alpha(y-x)$、$y\in C$、$\alpha>0$ とする。凸性だけから $d\in T_C(x)$ を示せ。

<!-- solution-start -->
$t_n\downarrow0$ を $t_n\alpha\le1$ として $x_n=(1-t_n\alpha)x+t_n\alpha y$ と置く。凸性より $x_n\in C$ で、$(x_n-x)/t_n=d$。
<!-- solution-end -->

### A02 半空間

$C=\{z:a^Tz\le b\}$ の境界点で $T_C(x)$ と $N_C(x)$ を求めよ。

<!-- solution-start -->
$T_C(x)=\{d:a^Td\le0\}$。そのpolarは $\{\lambda a:\lambda\ge0\}$ であり、normal coneも同じ。
<!-- solution-end -->

---

## 8. 演習B

### B01 tangent cone の閉性

$d_m\in T_C(x)$、$d_m\to d$ から $d\in T_C(x)$ を、各定義列から1点ずつ選んで示せ。

<!-- solution-start -->
各 $m$ で $t_m<1/m$ と $x_m\in C$ を選び、$\|(x_m-x)/t_m-d_m\|<1/m$ とする。必要なら $t_m$ の減少部分列を取り、三角不等式から $(x_m-x)/t_m\to d$。
<!-- solution-end -->

### B02 制約付き一次条件

$Df(x^*)[d]\ge0$ が全ての $d\in T_C(x^*)$ に対して成り立つとする。$N_C=T_C^\circ$ を用いて

$$
0\in Df(x^*)+N_C(x^*)
$$

を示せ。

<!-- solution-start -->
$(-Df(x^*))[d]\le0$ が全ての接方向で成り立つので $-Df(x^*)\in T_C(x^*)^\circ=N_C(x^*)$。
<!-- solution-end -->

---

## 9. 監査チェック

C4Aで主張だけだった

$$
N_C(x)=T_C(x)^\circ
$$

を、凸集合について

1. $T_C(x)=\overline{\operatorname{cone}(C-x)}$
2. normal cone と polar の両包含

まで証明しました。定義・例・定理・完全証明・A/B演習まで閉じています。
