# F0-00D2C 補講：積測度・Tonelliの定理・Fubiniの定理

D2Bまでは一つの測度空間上の積分でした。この講義では2つの測度空間を組み合わせ、二重積分・反復積分を正当化します。

中心線は

```text
積σ代数
 ↓
積測度
 ↓
切断測度公式
 ↓
Tonelli（非負）
 ↓
Fubini（絶対可積分）
```

です。

> **証明依存**  
> 積測度の存在・一意性には [Carathéodory 拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)を使います。標準ルートではこの定理を受け入れて先へ進んで構いません。DREAM THEATER ルートでは [D3](../F0_00D3_外測度_Caratheodory可測性/index.md) → [D4](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension) で拡張定理そのものを証明します。本章では、それ以外の 切断 → Tonelli → Fubini の論理を黒箱なしで閉じます。

---

## 0. まず普通の二重積分から「順序交換の条件」を考える

長方形上の

$$
f(x,y)=xy,
\qquad 0\le x\le1,\ 0\le y\le2
$$

では

$$
\int_0^1\int_0^2xy\,dy\,dx
=
\int_0^2\int_0^1xy\,dx\,dy
=1.
$$

しかし測度論では、積分順序の交換は無条件ではありません。

- $f\ge0$ なら **Tonelli**：値が $+\infty$ でもよい。
- 符号があるなら **Fubini**：$\int|f|<\infty$ を要求する。

この違いを証明から理解するのが本章の目的です。

---

## 1. 積σ代数

<a id="def-f0-00d2c-01"></a>

<!-- formal-statement-start -->
### 定義（積σ代数）

可測空間 $(X,\mathcal A)$ と $(Y,\mathcal B)$ に対して

$$
\boxed{
\mathcal A\otimes\mathcal B
:=
\sigma\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
}
$$

を **積σ代数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2c-01 -->
### 例1：Euclid空間

**定義の確認**

$A=[0,1]\in\mathcal B(\mathbb R)$、$B=(0,2)\in\mathcal B(\mathbb R)$ とすると、$A\times B$ は定義で使う生成集合

$$
\{A'\times B':A',B'\in\mathcal B(\mathbb R)\}
$$

の一つです。したがって

$$
[0,1]\times(0,2)
\in
\mathcal B(\mathbb R)\otimes\mathcal B(\mathbb R).
$$

一般に通常の Borel σ代数について

$$
\mathcal B(\mathbb R^m)\otimes\mathcal B(\mathbb R^n)
=
\mathcal B(\mathbb R^{m+n})
$$

が成り立ちます。したがって通常の二変数連続関数は積σ代数に関して可測です。
<!-- definition-example-end -->

---

## 2. 積測度

長方形 $A\times B$ なら「横の大きさ × 縦の大きさ」で

$$
\mu(A)\nu(B)
$$

と測るのが自然です。問題は、この長方形の規則を **積σ代数上の任意の可測集合へ矛盾なく延長できるか**です。

ここで D4 の Carathéodory 拡張定理を使います。ただし一意性まで得るには、空間を有限測度の部分へ可算分割して議論できることが重要です。その条件が σ有限性です。

<a id="def-f0-00d2c-03"></a>

<!-- formal-statement-start -->
### 定義（σ有限測度）

測度空間 $(X,\mathcal A,\mu)$ が **σ有限** であるとは、可測集合 $X_1,X_2,\ldots$ が存在して

$$
X=\bigcup_{n=1}^{\infty}X_n,
\qquad
\mu(X_n)<\infty
$$

を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2c-03 -->
### 例：Lebesgue 測度は σ有限

$\mathbb R$ 上の Lebesgue 測度 $m$ では

$$
\mathbb R=\bigcup_{n=1}^{\infty}[-n,n],
\qquad
m([-n,n])=2n<\infty.
$$

したがって $(\mathbb R,\mathcal B(\mathbb R),m)$ は σ有限です。全空間の測度が無限大でも、有限測度の領域を可算個つないで全体を覆えればよい点が重要です。
<!-- definition-example-end -->

この条件の下で、長方形の規則から積測度を構成できます。

<a id="thm-f0-00d2c-01"></a>

<!-- formal-statement-start -->
### 定理（σ有限測度の積測度）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$ に対して、積σ代数 $\mathcal A\otimes\mathcal B$ 上に一意な測度 $\mu\times\nu$ が存在し、

$$
\boxed{
(\mu\times\nu)(A\times B)=\mu(A)\nu(B)
}
$$

を全ての $A\in\mathcal A,B\in\mathcal B$ について満たす。
<!-- formal-statement-end -->

### 証明の見取り図

1. 可測長方形の有限互いに素和からなる集合代数を作る。
2. 長方形へ $\mu(A)\nu(B)$ を与え、分割しても値が変わらないことと可算加法性を確認して前測度にする。
3. D4 の Carathéodory 拡張定理で積σ代数へ延長する。
4. σ有限性を使い、拡張の一意性を得る。

<!-- proof-start -->
### 証明

#### Step 1：長方形上の積が前測度になる

可測長方形の有限互いに素和からなる algebra を $\mathcal R$ とします。長方形について

$$
\pi(A\times B):=\mu(A)\nu(B)
$$

と置き、互いに素な有限和には加法的に延長します。

同じ集合が異なる有限長方形分割で表されても、二つの分割を共通細分して各小長方形上で比較すれば、有限加法性により総和は一致します。したがってこの延長は分割の選び方に依存しません。

前測度性で非自明なのは、長方形が可算個の互いに素な長方形へ分解された場合の可算加法性です。例えば

$$
A\times B=\bigsqcup_{n=1}^\infty(A_n\times B_n)
$$

なら各 $(x,y)$ について

$$
1_A(x)1_B(y)
=
\sum_{n=1}^\infty1_{A_n}(x)1_{B_n}(y).
$$

固定した $x$ で $y$ について積分し、非負級数に [MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) を使うと

$$
1_A(x)\nu(B)
=
\sum_{n=1}^\infty1_{A_n}(x)\nu(B_n).
$$

さらに $x$ について [MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) を使えば

$$
\mu(A)\nu(B)
=
\sum_{n=1}^\infty\mu(A_n)\nu(B_n).
$$

有限互いに素和に分解した一般の $R\in\mathcal R$ でも、各成分と可算分割を共通細分して同じ計算を有限個足し合わせれば可算加法性が従います。したがって $\pi$ は $\mathcal R$ 上の前測度です。

#### Step 2：Carathéodory 拡張定理を適用する

[D4 の Carathéodory 拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)により $\pi$ は

$$
\sigma(\mathcal R)=\mathcal A\otimes\mathcal B
$$

上の測度へ拡張されます。これを $\mu\times\nu$ と書きます。

$\mu,\nu$ がσ有限なら、有限測度の長方形で $X\times Y$ を可算に覆えるため $\pi$ もσ有限です。したがって拡張の一意性も同じ定理の一意性部分から従います。$\square$
<!-- proof-end -->

> 積測度の存在・一意性は D4 の一般拡張定理を依存先として明示し、その上で証明済みです。

---

## 3. 切断（section）

積測度が作れても、まだ二重積分を一変数ずつ計算する公式はありません。そのためには、まず積集合を「$x$ を固定して縦に切る」と何が残るかを記述する必要があります。これが切断です。

<a id="def-f0-00d2c-02"></a>

<!-- formal-statement-start -->
### 定義（集合の切断）

$E\subset X\times Y$ と $x\in X,y\in Y$ に対して

$$
E_x:=\{y\in Y:(x,y)\in E\},
\qquad
E^y:=\{x\in X:(x,y)\in E\}
$$

をそれぞれ **$x$-切断**、**$y$-切断**という。英語では section と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2c-02 -->
### 例2：長方形を縦に切る

**定義の確認**

$E=[0,1]\times[0,2]$ とします。固定した $x$ に対して

$$
(x,y)\in E
\iff
x\in[0,1]\ \text{かつ}\ y\in[0,2].
$$

したがって定義へそのまま代入すると

$$
E_x=
\begin{cases}
[0,2],&x\in[0,1],\\
\varnothing,&x\notin[0,1].
\end{cases}
$$

となり

$$
\nu(E_x)=2\,1_{[0,1]}(x).
$$

切断は「二次元集合を一方向に切り、その断面の大きさをもう一方で積分する」操作です。
<!-- definition-example-end -->

<a id="prop-f0-00d2c-01"></a>

<!-- formal-statement-start -->
### 命題（可測集合の切断は可測）

$E\in\mathcal A\otimes\mathcal B$ なら、任意の $x,y$ について

$$
E_x\in\mathcal B,
\qquad
E^y\in\mathcal A.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
#### 証明

固定した $x\in X$ に対して

$$
\mathcal C_x:=\{E\subset X\times Y:E_x\in\mathcal B\}
$$

と置きます。切断は補集合と可算和に可換するので $\mathcal C_x$ はσ代数です。

長方形について

$$
(A\times B)_x=
\begin{cases}
B,&x\in A,\\
\varnothing,&x\notin A
\end{cases}
$$

だから全ての可測長方形が $\mathcal C_x$ に入ります。従って

$$
\mathcal A\otimes\mathcal B\subset\mathcal C_x.
$$

$E^y$ も同様です。$\square$
<!-- proof-end -->

---

## 4. 切断測度公式

Tonelli の証明で本当に必要なのは、単に 切断が可測集合になることだけではありません。

<a id="lem-section-measure"></a>

<!-- formal-statement-start -->
### 補題（切断測度公式）

$(X,\mathcal A,\mu),(Y,\mathcal B,\nu)$ をσ有限測度空間とし、$E\in\mathcal A\otimes\mathcal B$ とする。このとき

$$
x\longmapsto\nu(E_x)
$$

は $\mathcal A$-可測で、

$$
\boxed{
(\mu\times\nu)(E)=\int_X\nu(E_x)\,d\mu(x)
}
$$

が成り立つ。変数を逆にした

$$
(\mu\times\nu)(E)=\int_Y\mu(E^y)\,d\nu(y)
$$

も成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### Step 1：有限測度の場合

$\mu(X)<\infty,\nu(Y)<\infty$ とします。次の性質を満たす集合族を

$$
\mathcal D
:=
\left\{
E\in\mathcal A\otimes\mathcal B:
 x\mapsto\nu(E_x)\text{ が可測かつ }
(\mu\times\nu)(E)=\int_X\nu(E_x)d\mu
\right\}
$$

と置きます。

長方形 $E=A\times B$ では

$$
\nu(E_x)=1_A(x)\nu(B)
$$

なので可測で、

$$
\int_X\nu(E_x)d\mu
=
\mu(A)\nu(B)
=
(\mu\times\nu)(A\times B).
$$

$E\in\mathcal D$ なら有限測度性により

$$
\nu((E^c)_x)=\nu(Y)-\nu(E_x)
$$

で可測です。また

$$
\begin{aligned}
\int_X\nu((E^c)_x)d\mu
&=\mu(X)\nu(Y)-\int_X\nu(E_x)d\mu\\
&=(\mu\times\nu)(X\times Y)-(\mu\times\nu)(E)\\
&=(\mu\times\nu)(E^c).
\end{aligned}
$$

さらに $E_n\in\mathcal D$ が互いに素なら、各 $x$ で $(E_n)_x$ も互いに素だから

$$
\nu\left(\left(\bigcup_nE_n\right)_x\right)
=
\sum_n\nu((E_n)_x).
$$

MCT と積測度の可算加法性から

$$
\begin{aligned}
\int_X\nu\left(\left(\bigcup_nE_n\right)_x\right)d\mu
&=\sum_n\int_X\nu((E_n)_x)d\mu\\
&=\sum_n(\mu\times\nu)(E_n)\\
&=(\mu\times\nu)\left(\bigcup_nE_n\right).
\end{aligned}
$$

従って $\mathcal D$ は Dynkin 族です。可測長方形全体は交わりで閉じる π-system であり、それを含むので [π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から

$$
\mathcal D=\mathcal A\otimes\mathcal B.
$$

#### Step 2：σ有限の場合へ局所化する

σ有限性から、有限測度集合による被覆 $X=\bigcup_n A_n$、$Y=\bigcup_n B_n$ を取れます。ここで

$$
X_n:=\bigcup_{k=1}^n A_k,
\qquad
Y_n:=\bigcup_{k=1}^n B_k
$$

と置けば、有限和の劣加法性から $\mu(X_n)<\infty$、$\nu(Y_n)<\infty$ であり、

$$
X_n\uparrow X,
\qquad
Y_n\uparrow Y
$$

も成り立ちます。以後この増大列を使います。

$$
E_n:=E\cap(X_n\times Y_n)
$$

と置けば、有限測度の場合の結果より

$$
x\mapsto1_{X_n}(x)\nu(E_x\cap Y_n)
$$

は可測で、

$$
(\mu\times\nu)(E_n)
=
\int_X1_{X_n}(x)\nu(E_x\cap Y_n)d\mu(x).
$$

左辺では $E_n\uparrow E$。右辺の被積分関数も各点で

$$
1_{X_n}(x)\nu(E_x\cap Y_n)\uparrow\nu(E_x).
$$

したがって測度の下からの連続性と [MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) により

$$
\begin{aligned}
(\mu\times\nu)(E)
&=\lim_n(\mu\times\nu)(E_n)\\
&=\lim_n\int_X1_{X_n}\nu(E_x\cap Y_n)d\mu\\
&=\int_X\nu(E_x)d\mu.
\end{aligned}
$$

同時に $x\mapsto\nu(E_x)$ の可測性も可測関数の単調極限として従います。$y$ 側も同様です。$\square$
<!-- proof-end -->

---

## 5. Tonelli の定理

<a id="thm-tonelli"></a>

<!-- formal-statement-start -->
### 定理（Tonelli）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$ 上の非負可測関数

$$
f:X\times Y\to[0,\infty]
$$

に対して

$$
x\mapsto\int_Y f(x,y)d\nu(y),
\qquad
y\mapsto\int_X f(x,y)d\mu(x)
$$

は可測であり、

$$
\boxed{
\int_{X\times Y}f\,d(\mu\times\nu)
=
\int_X\left(\int_Yf(x,y)d\nu(y)\right)d\mu(x)
}
$$

$$
\boxed{
=
\int_Y\left(\int_Xf(x,y)d\mu(x)\right)d\nu(y)
}
$$

が成り立つ。値は $+\infty$ でもよい。
<!-- formal-statement-end -->

### 証明の見取り図

```text
可測集合の指示関数
 ↓ 切断測度公式
非負単関数
 ↓ 有限線形性
一般の非負可測関数
 ↓ 単関数近似 + MCT
Tonelli
```

<!-- proof-start -->
### 証明

#### Step 1：指示関数

$f=1_E$、$E\in\mathcal A\otimes\mathcal B$ とします。[切断測度公式](#lem-section-measure)から

$$
\int_Y1_E(x,y)d\nu(y)=\nu(E_x)
$$

は $x$ の可測関数で、

$$
\int_X\int_Y1_E(x,y)d\nu d\mu
=(\mu\times\nu)(E)
=
\int_{X\times Y}1_Ed(\mu\times\nu).
$$

#### Step 2：非負単関数

$$
\phi=\sum_{k=1}^m a_k1_{E_k},
\qquad a_k\ge0
$$

なら有限線形性により

$$
\int_X\int_Y\phi\,d\nu d\mu
=
\int_{X\times Y}\phi\,d(\mu\times\nu).
$$

内側積分の可測性も有限和から従います。

#### Step 3：一般の非負可測関数

[単関数近似定理](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)により非負単関数 $\phi_n$ を

$$
0\le\phi_n\uparrow f
$$

となるよう取れます。各 $x$ で [MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) を使うと

$$
\int_Y\phi_n(x,y)d\nu(y)
\uparrow
\int_Yf(x,y)d\nu(y).
$$

よって内側積分は可測関数の単調極限なので可測です。さらに $X$ 側と積空間側へ [MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) を使って

$$
\begin{aligned}
\int_X\int_Yf\,d\nu d\mu
&=\lim_n\int_X\int_Y\phi_n\,d\nu d\mu\\
&=\lim_n\int_{X\times Y}\phi_n\,d(\mu\times\nu)\\
&=\int_{X\times Y}f\,d(\mu\times\nu).
\end{aligned}
$$

逆順も同じです。$\square$
<!-- proof-end -->

---

## 6. Fubini の定理

Tonelli は非負関数なら $+\infty$ を許したまま反復積分へ移せました。符号がある関数では、正部分と負部分が別々に無限大になると $+\infty-\infty$ が現れ、差を取れません。

そこで「正部分・負部分の両方が有限になる」という条件、すなわち絶対可積分性を課します。これが Fubini の定理です。

<a id="thm-f0-00d2c-02"></a>

<!-- formal-statement-start -->
### 定理（Fubini）

σ有限測度空間 $(X,\mathcal A,\mu)$ と $(Y,\mathcal B,\nu)$ をとる。$(\mathcal A\otimes\mathcal B)$-可測関数 $f:X\times Y\to\mathbb R$ が

$$
\boxed{
\int_{X\times Y}|f|d(\mu\times\nu)<\infty
}
$$

を満たすとする。このとき、ほとんど全ての $x$ で $f(x,\cdot)$ は $\nu$-可積分、ほとんど全ての $y$ で $f(\cdot,y)$ は $\mu$-可積分で、

$$
\boxed{
\int_{X\times Y}f\,d(\mu\times\nu)
=
\int_X\int_Yf(x,y)d\nu(y)d\mu(x)
=
\int_Y\int_Xf(x,y)d\mu(x)d\nu(y)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Tonelli を $|f|\ge0$ に適用すると

$$
\int_X\left(\int_Y|f(x,y)|d\nu(y)\right)d\mu(x)
=
\int_{X\times Y}|f|d(\mu\times\nu)<\infty.
$$

従って

$$
\int_Y|f(x,y)|d\nu(y)<\infty
$$

が a.e. $x$ で成り立ちます。$y$ 側も同様です。

次に

$$
f=f^+-f^-,
\qquad
|f|=f^++f^-.
$$

絶対可積分性から

$$
\int f^+\,d(\mu\times\nu)<\infty,
\qquad
\int f^-\,d(\mu\times\nu)<\infty
$$

です。Tonelli を $f^+$ と $f^-$ に別々に適用すると、a.e. $x$ で

$$
\int_Y f^+(x,y)d\nu(y)<\infty,
\qquad
\int_Y f^-(x,y)d\nu(y)<\infty
$$

となり、その点では

$$
\int_Y f(x,y)d\nu(y)
=
\int_Y f^+(x,y)d\nu(y)
-
\int_Y f^-(x,y)d\nu(y)
$$

と差を正当に定義できます。さらに Tonelli の二つの等式を引き算して

$$
\begin{aligned}
\int_X\left(\int_Y f(x,y)d\nu(y)\right)d\mu(x)
&=
\int_{X\times Y}f^+\,d(\mu\times\nu)
-
\int_{X\times Y}f^-\,d(\mu\times\nu)\\
&=
\int_{X\times Y}f\,d(\mu\times\nu).
\end{aligned}
$$

を得ます。$x,y$ を交換して同じ議論を行えば逆順の反復積分も同じ値になります。$\square$
<!-- proof-end -->

---

## 7. Tonelli と Fubini の使い分け

| | Tonelli | Fubini |
|---|---|---|
| 関数 | $f\ge0$ | 符号あり可 |
| 仮定 | 非負可測 | $\int|f|<\infty$ |
| 値 $+\infty$ | 許す | 許さない |
| 主用途 | 非負級数・非負二重積分 | 積分順序交換 |

判定は

```text
f >= 0 ?
 ├─ Yes → Tonelli
 └─ No
      ↓
   ∫|f| < ∞ ?
      ├─ Yes → Fubini
      └─ No  → 順序交換は自動ではない
```

です。

### 例3：非負なら先に Tonelli

$$
f(x,y)=e^{-(2x+3y)},\qquad x,y\ge0
$$

は非負なので

$$
\int_0^\infty\int_0^\infty e^{-(2x+3y)}dy\,dx
=
\left(\int_0^\infty e^{-2x}dx\right)
\left(\int_0^\infty e^{-3y}dy\right)
=
\frac16.
$$

### 例4：確率論での独立性

独立な確率変数 $X,Y$ の結合分布が積測度 $P_X\times P_Y$ で、$g,h\ge0$ なら [Tonelli](#thm-tonelli) により

$$
E[g(X)h(Y)]
=
\int g(x)h(y)d(P_X\times P_Y)
=E[g(X)]E[h(Y)].
$$

絶対可積分なら Fubini で符号付き関数にも同じ分離が使えます。

---

# 8. 演習

## F0-00D2C-A01 長方形の積測度

- Level: A
- 目安時間: 8分

Lebesgue測度 $m$ に対して

$$
(m\times m)([0,2]\times[1,4])
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

積測度の定義から

$$
(m\times m)([0,2]\times[1,4])
=m([0,2])m([1,4])=2\cdot3=6.
$$

<!-- solution-end -->

## F0-00D2C-A02 切断を求める

- Level: A
- 目安時間: 10分

$$
E=\{(x,y)\in[0,1]^2:y\le x\}
$$

について $E_x$ と $m(E_x)$ を求め、$m_2(E)$ [を切断測度公式](#lem-section-measure)から計算せよ。

<!-- solution-start -->
### 詳細解答

$x\in[0,1]$ では

$$
E_x=[0,x],
\qquad m(E_x)=x.
$$

従って [切断測度公式](#lem-section-measure)から

$$
m_2(E)=\int_0^1m(E_x)dx=\int_0^1x\,dx=\frac12.
$$

<!-- solution-end -->

## F0-00D2C-A03 Tonelli か Fubini か

- Level: A
- 目安時間: 8分

非負可測関数 $f$ について $\int f$ が有限か分からない段階で反復積分を使いたい。どちらを使うべきか。

<!-- solution-start -->
### 詳細解答

Tonelli。非負可測性だけで使え、積分値が $+\infty$ でもよい。Fubini は絶対可積分性を要求する。

<!-- solution-end -->

## F0-00D2C-B01 切断測度補題の有限測度版

- Level: B
- 目安時間: 20分

有限測度空間で、切断測度公式を満たす集合族 $\mathcal D$ が Dynkin 族になることを示し、π–λ 定理で全ての積可測集合へ拡張せよ。

<!-- solution-start -->
### 詳細解答

長方形 $A\times B$ では

$$
\nu((A\times B)_x)=1_A(x)\nu(B)
$$

なので公式が直接成立する。

$E\in\mathcal D$ なら有限測度性により

$$
\nu((E^c)_x)=\nu(Y)-\nu(E_x)
$$

を使え、補集合でも公式を保つ。互いに素な $E_n\in\mathcal D$ については 切断も互いに素なので、可算加法性と [MCT](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) により $\bigcup_nE_n\in\mathcal D$。よって $\mathcal D$ は Dynkin 族である。

可測長方形全体は π-system で $\mathcal D$ に含まれるため、[π–λ 定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から

$$
\mathcal A\otimes\mathcal B\subset\mathcal D.
$$

<!-- solution-end -->

## F0-00D2C-B02 Tonelli の証明を再構成する

- Level: B
- 目安時間: 20分

切断測度公式を既知として、Tonelli を

$$
1_E\to\text{非負単関数}\to\text{一般非負可測関数}
$$

の順に証明せよ。

<!-- solution-start -->
### 詳細解答

$f=1_E$ では [切断測度公式](#lem-section-measure)により

$$
\int_{X\times Y}1_Ed(\mu\times\nu)
=
\int_X\int_Y1_Ed\nu d\mu.
$$

非負単関数では指示関数の有限非負線形結合なので有限線形性で拡張できる。

一般の $f\ge0$ には非負単関数列 $\phi_n\uparrow f$ を取り、各 $x$ の $Y$ 積分、外側の $X$ 積分、積空間積分に MCT を順に適用して極限を通す。逆順も同様。

<!-- solution-end -->

## F0-00D2C-B03 Fubini の切断可積分性

- Level: B
- 目安時間: 15分

$$
\int_{X\times Y}|f|d(\mu\times\nu)<\infty
$$

から a.e. $x$ について

$$
\int_Y|f(x,y)|d\nu(y)<\infty
$$

が従う理由を説明せよ。

<!-- solution-start -->
### 詳細解答

[Tonelli](#thm-tonelli) により

$$
h(x):=\int_Y|f(x,y)|d\nu(y)
$$

は非負可測で

$$
\int_Xh(x)d\mu(x)=\int_{X\times Y}|f|d(\mu\times\nu)<\infty.
$$

もし $h=+\infty$ となる集合が正の測度を持てば $\int h=+\infty$ となるので矛盾する。従って $h(x)<\infty$ a.e.

<!-- solution-end -->

## F0-00D2C-B04 なぜ絶対可積分性が必要か

- Level: B
- 目安時間: 20分

条件収束級数 $\sum_{n\ge1}a_n$ を正方形格子上の関数へ埋め込むと、積分順序の交換が級数の並べ替えに対応し得る。この事実を踏まえ、Fubini が $\int|f|<\infty$ を要求する意味を説明せよ。

<!-- solution-start -->
### 詳細解答

絶対可積分性がない場合、正部分と負部分が別々に無限大となり得て、反復積分の途中で

$$
+\infty-\infty
$$

型の不定形が生じ得る。また級数の場合の条件収束と同様に、項を数える順序に依存する現象が起こり得る。

一方

$$
\int|f|<\infty
$$

なら

$$
\int f^+<\infty,
\qquad
\int f^-<\infty
$$

で、正負両部分へ Tonelli を安全に適用して差を取れる。これが Fubini の順序交換を保証する仕組みである。

<!-- solution-end -->

## F0-00D2C-A04 σ有限性を確認する

- Level: A
- 目安時間: 8分

Lebesgue 測度 $m$ を備えた $\mathbb R$ が σ有限であることを、定義から確認せよ。

<!-- solution-start -->
### 詳細解答

σ有限性では、全空間を有限測度の可測集合の可算和で覆えばよい。そこで

$$
X_n=[-n,n]
$$

と置く。各 $X_n$ は Borel 集合で、

$$
m(X_n)=2n<\infty.
$$

また任意の $x\in\mathbb R$ に対し $n>|x|$ を取れば $x\in[-n,n]$ なので

$$
\mathbb R=\bigcup_{n=1}^{\infty}[-n,n].
$$

したがって $\mathbb R$ 上の Lebesgue 測度は σ有限である。
<!-- solution-end -->

## F0-00D2C-C01 絶対可積分性を Tonelli で確認してから Fubini を使う

- Level: C
- 目安時間: 25分

$[0,\infty)^2$ 上で

$$
f(x,y)=e^{-(x+y)}(x-y)
$$

とする。

1. $f$ が絶対可積分であることを Tonelli の定理を使って示せ。
2. Fubini の定理を適用して $\int_0^\infty\int_0^\infty f(x,y)\,dy\,dx$ を求めよ。
3. 積分順序を逆にしても同じ値になることを確認せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
|x-y|\le x+y
$$

なので

$$
|f(x,y)|
\le
e^{-(x+y)}(x+y)
=
xe^{-x}e^{-y}+e^{-x}ye^{-y}.
$$

右辺は非負である。Tonelli を各項へ適用すると

$$
\begin{aligned}
\int_0^\infty\int_0^\infty xe^{-x}e^{-y}\,dy\,dx
&=
\left(\int_0^\infty xe^{-x}dx\right)
\left(\int_0^\infty e^{-y}dy\right)=1,\\
\int_0^\infty\int_0^\infty e^{-x}ye^{-y}\,dy\,dx
&=
\left(\int_0^\infty e^{-x}dx\right)
\left(\int_0^\infty ye^{-y}dy\right)=1.
\end{aligned}
$$

したがって

$$
\int_{[0,\infty)^2}|f|\,d(m\times m)\le2<\infty.
$$

よって Fubini を適用できる。

$y$ を先に積分すると

$$
\begin{aligned}
\int_0^\infty e^{-(x+y)}(x-y)\,dy
&=
e^{-x}
\left(
x\int_0^\infty e^{-y}dy
-
\int_0^\infty ye^{-y}dy
\right)\\
&=
e^{-x}(x-1).
\end{aligned}
$$

したがって

$$
\int_0^\infty e^{-x}(x-1)dx
=
\int_0^\infty xe^{-x}dx
-
\int_0^\infty e^{-x}dx
=
1-1=0.
$$

逆に $x$ を先に積分すると

$$
\int_0^\infty e^{-(x+y)}(x-y)dx
=
e^{-y}(1-y),
$$

ゆえに

$$
\int_0^\infty e^{-y}(1-y)dy=1-1=0.
$$

絶対可積分性を先に確認したため、この二つの反復積分を Fubini によって同じ積空間積分として扱える。
<!-- solution-end -->

---

## 9. 章末チェック

- 積σ代数と積測度を定義できる。
- 積測度が Carathéodory 拡張から存在する論理を説明できる。
- 切断の可測性を証明できる。
- 切断測度公式を有限測度→σ有限局所化で証明できる。
- Tonelli を指示関数→単関数→MCTで証明できる。
- Fubini を $|f|$ への Tonelli と正負分解から証明できる。
- Tonelli と Fubini の仮定を使い分けられる。

## 10. 次に進む

次は積分可能性そのものをノルムとして扱います。

**次：F0-00D2D $L^p$空間・Hölder・Minkowski**
