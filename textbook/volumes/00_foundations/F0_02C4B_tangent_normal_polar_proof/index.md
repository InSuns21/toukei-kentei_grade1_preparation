# F0-02C4B：tangent cone と normal cone の polar 双対

C4Aでは

$$
N_C(x)=T_C(x)^\circ
$$

という関係を使いました。この補講では、**凸集合についてなぜ本当に一致するのか**を定義から証明します。

証明は

```text
Bouligand tangent cone
  = closure cone(C-x)
  ↓ polar を取る
normal cone
```

の2段です。

---

## 1. 設定

$X$ を実ノルム空間、$C\subset X$ を凸集合、$x\in C$ とします。

C4Aで定義したBouligand tangent coneは

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

凸解析で用いるnormal coneは

$$
\boxed{
N_C(x)
:=\{x^*\in X^*:x^*(y-x)\le0\ \forall y\in C\}
}.
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
> $C$ が凸、$x\in C$ なら
>
> $$
> \boxed{T_C(x)=\overline{\operatorname{cone}(C-x)}}.
> $$
<!-- formal-statement-end -->

### 2.1 まず $\operatorname{cone}(C-x)\subset T_C(x)$

$d=\alpha(y-x)$、$\alpha\ge0$、$y\in C$ とします。

$\alpha=0$ なら $d=0\in T_C(x)$ です。$\alpha>0$ なら $t_n\downarrow0$ を $t_n\alpha\le1$ となるように取って

$$
x_n=x+t_nd
=(1-t_n\alpha)x+t_n\alpha y
$$

と置きます。

$C$ は凸なので $x_n\in C$ です。しかも

$$
\frac{x_n-x}{t_n}=d.
$$

したがって $d\in T_C(x)$ です。

### 2.2 $T_C(x)$ は閉集合

$d_m\in T_C(x)$、$d_m\to d$ とします。

各 $m$ について、$d_m\in T_C(x)$ の定義から十分小さい $t_m>0$ と $x_m\in C$ を選んで

$$
t_m<\frac1m,
\qquad
\left\|\frac{x_m-x}{t_m}-d_m\right\|<\frac1m
$$

とできます。

すると $t_m\downarrow0$ となる部分列を取ることができ、

$$
\left\|\frac{x_m-x}{t_m}-d\right\|
\le
\left\|\frac{x_m-x}{t_m}-d_m\right\|+\|d_m-d\|
\to0.
$$

従って $d\in T_C(x)$。よって $T_C(x)$ は閉です。

以上から

$$
\overline{\operatorname{cone}(C-x)}\subset T_C(x).
$$

### 2.3 逆包含

$d\in T_C(x)$ とします。定義により

$$
\frac{x_n-x}{t_n}\to d,
\qquad x_n\in C,\ t_n>0.
$$

各 $n$ について

$$
\frac{x_n-x}{t_n}
\in\operatorname{cone}(C-x)
$$

です。したがって極限 $d$ はその閉包に属します。

よって

$$
T_C(x)\subset\overline{\operatorname{cone}(C-x)}.
$$

両包含から結論が従います。$\square$

---

## 3. normal cone は tangent cone のpolar

<a id="thm-f0-02c4b-normal-polar"></a>

<!-- formal-statement-start -->
> **定理（normal--tangent polar identity）**  
> $C\subset X$ が凸、$x\in C$ なら
>
> $$
> \boxed{N_C(x)=T_C(x)^\circ}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x^*\in N_C(x)$ とします。任意の $y\in C$ に対して

$$
x^*(y-x)\le0.
$$

線形性から任意の $\alpha\ge0$ について

$$
x^*(\alpha(y-x))\le0.
$$

したがって $x^*$ は $\operatorname{cone}(C-x)$ 上で非正です。$x^*$ は連続なので、その閉包上でも非正です。前節より

$$
T_C(x)=\overline{\operatorname{cone}(C-x)}
$$

だから

$$
x^*\in T_C(x)^\circ.
$$

よって

$$
N_C(x)\subset T_C(x)^\circ.
$$

逆に $x^*\in T_C(x)^\circ$ とします。任意の $y\in C$ に対し

$$
y-x\in\operatorname{cone}(C-x)\subset T_C(x).
$$

したがって

$$
x^*(y-x)\le0.
$$

これは $x^*\in N_C(x)$ の定義そのものです。ゆえに

$$
T_C(x)^\circ\subset N_C(x).
$$

以上から

$$
N_C(x)=T_C(x)^\circ.
$$

$\square$
<!-- proof-end -->

---

## 4. 例：半空間

$$
C=\{z\in\mathbb R^n:a^{\mathsf T}z\le b\}
$$

を考え、境界点 $x$ で $a^{\mathsf T}x=b$ とします。

一次的に実行可能な方向は

$$
T_C(x)=\{d:a^{\mathsf T}d\le0\}.
$$

このpolarは

$$
T_C(x)^\circ
=\{\lambda a:\lambda\ge0\}.
$$

一方normal coneの定義からも

$$
N_C(x)=\{\lambda a:\lambda\ge0\}.
$$

確かに一致します。

---

## 5. 例：非負直交錐

$$
C=\mathbb R_+^n,
\qquad x=0
$$

なら

$$
T_C(0)=\mathbb R_+^n.
$$

本教材のpolarの符号規約は $\le0$ なので

$$
T_C(0)^\circ=\mathbb R_-^n.
$$

normal coneも

$$
N_C(0)=\mathbb R_-^n
$$

です。

dual cone $K^*$ は $\ge0$ で定義しているため

$$
K^\circ=-K^*
$$

という符号差を忘れないことが重要です。

---

## 6. KKTで何が起きているか

局所最適点 $x^*$ では、実行可能な接方向 $d\in T_C(x^*)$ に沿って目的関数を一次的に減らせないため

$$
Df(x^*)[d]\ge0
\qquad(\forall d\in T_C(x^*)).
$$

従って

$$
-Df(x^*)\in T_C(x^*)^\circ=N_C(x^*).
$$

つまり制約付き最適性の基本形

$$
\boxed{0\in Df(x^*)+N_C(x^*)}
$$

は、**実行可能方向に対する一次条件をpolar側へ移した式**です。

C5のKKT乗数表示は、このnormal coneを制約勾配で表現する段階に対応します。

---

## 7. 演習A

### A01 conic hull から接方向を作る

$d=\alpha(y-x)$、$y\in C$、$\alpha>0$ とする。$C$ の凸性だけを使って $d\in T_C(x)$ を示せ。

<!-- solution-start -->
$t_n\downarrow0$ を $t_n\alpha\le1$ として $x_n=(1-t_n\alpha)x+t_n\alpha y$ と置く。凸性より $x_n\in C$、かつ $(x_n-x)/t_n=d$。
<!-- solution-end -->

### A02 半空間

$C=\{z:a^Tz\le b\}$ の境界点で $T_C(x)$ と $N_C(x)$ を求めよ。

<!-- solution-start -->
$T_C(x)=\{d:a^Td\le0\}$、そのpolarは $\{\lambda a:\lambda\ge0\}$。normal coneも同じ。
<!-- solution-end -->

---

## 8. 演習B

### B01 tangent cone の閉性

$d_m\in T_C(x)$、$d_m\to d$ から $d\in T_C(x)$ を、各 $d_m$ の定義列から対角的に1点ずつ選ぶことで示せ。

<!-- solution-start -->
各 $m$ で $t_m<1/m$、$x_m\in C$ を選び $\|(x_m-x)/t_m-d_m\|<1/m$ とする。必要なら $t_m$ の減少部分列を取り、三角不等式で $(x_m-x)/t_m\to d$。
<!-- solution-end -->

### B02 制約付き一次条件

局所最適点で $Df(x^*)[d]\ge0$ が全ての $d\in T_C(x^*)$ に対して成り立つとする。$N_C=T_C^\circ$ を用いて

$$
0\in Df(x^*)+N_C(x^*)
$$

を示せ。

<!-- solution-start -->
$Df(x^*)[d]\ge0$ は $(-Df(x^*))[d]\le0$ と同値。従って $-Df(x^*)\in T_C(x^*)^\circ=N_C(x^*)$ であり、結論を得る。
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
