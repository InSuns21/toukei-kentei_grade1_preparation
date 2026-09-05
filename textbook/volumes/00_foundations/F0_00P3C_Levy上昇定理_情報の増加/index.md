# F0-00P3C Lévy上昇定理：情報を増やすと条件付き期待値は何へ近づくか

条件付き期待値を「情報 $\mathcal G$ のもとでの最良予測」と読めるようになりました。次は情報を段階的に増やします。

$$
\mathcal G_1\subset\mathcal G_2\subset\cdots
$$

とすると

$$
E[X\mid\mathcal G_n]
$$

は、より多くの情報を使う予測へ変わっていきます。Lévy上昇定理は、この予測列が最終的に

$$
E[X\mid\mathcal G_\infty],
\qquad
\mathcal G_\infty:=\sigma\left(\bigcup_{n\ge1}\mathcal G_n\right)
$$

へ近づくことを保証します。

---

## 1. 増加する部分σ代数列

<a id="def-f0-00p3c-increasing-sigma-fields"></a>

<!-- formal-statement-start -->
> **定義（増加する部分$\sigma$代数列）**  
> 同一の確率空間 $(\Omega,\mathcal F,P)$ 上の部分σ代数列 $(\mathcal G_n)$ が

$$
\mathcal G_1\subset\mathcal G_2\subset\cdots\subset\mathcal F
$$

> を満たすとき、$(\mathcal G_n)$ を増加する部分σ代数列といいます。また

$$
\mathcal G_\infty
:=
\sigma\left(\bigcup_{n=1}^{\infty}\mathcal G_n\right)
$$

> と置きます。
<!-- formal-statement-end -->

典型例は二進分割です。$\Omega=[0,1]$ とし、$\mathcal G_n$ を長さ $2^{-n}$ の二進区間が生成するσ代数とします。$n$ が増えるほど、どの細区間にいるかという情報が細かくなります。

---

<a id="lem-f0-00p3c-algebra-approximation"></a>

## 2. 増加情報の代数による集合近似

<!-- formal-statement-start -->
> **補題（増加情報の代数による集合近似）**  
> $\mathcal G_1\subset\mathcal G_2\subset\cdots$ とし、

$$
\mathcal A:=\bigcup_{n=1}^{\infty}\mathcal G_n,
\qquad
\mathcal G_\infty:=\sigma(\mathcal A)
$$

> と置きます。任意の $B\in\mathcal G_\infty$ と $\varepsilon>0$ に対し、ある $A\in\mathcal A$ が存在して

$$
P(A\triangle B)<\varepsilon
$$

> とできます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：近似可能集合族がσ代数になることを示す

$$
\mathcal D
:=
\left\{
B\in\mathcal G_\infty:
\forall\varepsilon>0,
\ \exists A\in\mathcal A,
\ P(A\triangle B)<\varepsilon
\right\}
$$

と置きます。$\mathcal A\subset\mathcal D$ は明らかです。

補集合については

$$
A^c\triangle B^c=A\triangle B
$$

なので閉じています。

また $B_j\in\mathcal D$ $(j\ge1)$ とします。まず有限個について各 $B_j$ を $A_j\in\mathcal A$ で近似します。有限個の $A_j$ は、十分大きい一つの $\mathcal G_N$ に全て入るので、有限和も $\mathcal A$ に入ります。

次に

$$
B^{(m)}:=\bigcup_{j=1}^{m}B_j
$$

と置くと $B^{(m)}\uparrow\bigcup_{j=1}^{\infty}B_j$ です。確率測度の下からの連続性から、十分大きい $m$ で

$$
P\left(
\left(\bigcup_{j=1}^{\infty}B_j\right)
\setminus B^{(m)}
\right)
$$

を任意に小さくできます。各 $B_j$ の近似誤差も合わせて小さくすれば、可算和も近似できます。

従って $\mathcal D$ は $\mathcal A$ を含むσ代数です。よって

$$
\mathcal G_\infty
=
\sigma(\mathcal A)
\subset\mathcal D.
$$

逆包含は定義から明らかなので結論を得ます。
<!-- proof-end -->

---

## 3. 上向き横断

<a id="def-f0-00p3c-upcrossing"></a>

<!-- formal-statement-start -->
> **定義（上向き横断）**  
> 実数列 $x_1,x_2,\ldots$ と $a<b$ に対し、区間 $[a,b]$ の上向き横断とは、時刻

$$
s_1<t_1<s_2<t_2<\cdots
$$

> を選んで

$$
x_{s_j}\le a,
\qquad
x_{t_j}\ge b
$$

> とできる往復の回数です。最初の $N$ 項までの最大回数を $U_N(a,b)$ と書きます。
<!-- formal-statement-end -->

上向き横断回数が有限なら、列が固定幅の区間を無限回上下し続けることはできません。この事実がmartingale収束の核心です。

---

<a id="thm-f0-00p3c-levy-upward"></a>

## 4. Lévy上昇定理

<!-- formal-statement-start -->
> **定理（Lévy上昇定理）**  
> $X\in L^1$ とし、$\mathcal G_1\subset\mathcal G_2\subset\cdots$ を増加する部分σ代数列、

$$
\mathcal G_\infty
:=
\sigma\left(\bigcup_{n=1}^{\infty}\mathcal G_n\right)
$$

> とします。このとき

$$
\boxed{
E[X\mid\mathcal G_n]
\longrightarrow
E[X\mid\mathcal G_\infty]
\quad\text{in }L^1\text{ and a.s.}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

以下では

$$
M_n:=E[X\mid\mathcal G_n],
\qquad
Y:=E[X\mid\mathcal G_\infty]
$$

と置きます。

### 4.1 まず $L^1$ 収束を示す

$Y$ は $\mathcal G_\infty$ 可測で可積分です。第2節の近似補題を単関数近似へ持ち上げると、任意の $\varepsilon>0$ に対して、ある $N$ と $\mathcal G_N$ 可測な可積分単関数 $Z$ が存在して

$$
E|Y-Z|<\varepsilon
$$

とできます。

$n\ge N$ なら $Z$ は $\mathcal G_n$ 可測なので

$$
E[Z\mid\mathcal G_n]=Z.
$$

またtower propertyより

$$
M_n
=E[X\mid\mathcal G_n]
=E[Y\mid\mathcal G_n].
$$

従って条件付き期待値の $L^1$ 縮小性から

$$
\begin{aligned}
E|M_n-Y|
&\le E|M_n-Z|+E|Z-Y|\\
&=E\left|E[Y-Z\mid\mathcal G_n]\right|+E|Z-Y|\\
&\le2E|Y-Z|\\
&<2\varepsilon.
\end{aligned}
$$

よって $M_n\to Y$ in $L^1$ です。

### 4.2 martingale構造

$m<n$ ならtower propertyから

$$
E[M_n\mid\mathcal G_m]
=
E[E[X\mid\mathcal G_n]\mid\mathcal G_m]
=E[X\mid\mathcal G_m]
=M_m.
$$

したがって $(M_n,\mathcal G_n)$ はmartingaleです。また条件付き期待値の $L^1$ 縮小性より

$$
\sup_nE|M_n|
\le E|X|<\infty.
$$

### 4.3 上向き横断不等式

$a<b$ を固定します。martingaleの上向き横断不等式から

$$
(b-a)E[U_N(a,b)]
\le
E[(M_N-a)^-]
+E[(M_1-a)^+]
$$

を得ます。右辺は $\sup_nE|M_n|<\infty$ から $N$ に一様に有界です。従って

$$
\sup_NE[U_N(a,b)]<\infty.
$$

$U_N(a,b)\uparrow U_\infty(a,b)$ なので単調収束定理より

$$
E[U_\infty(a,b)]<\infty.
$$

従って

$$
U_\infty(a,b)<\infty
\quad\text{a.s.}
$$

です。

### 4.4 a.s.極限の存在

もしある標本経路で

$$
\liminf_{n\to\infty}M_n<\limsup_{n\to\infty}M_n
$$

なら、その間に有理数 $a<b$ を取れます。その経路は $a$ 以下と $b$ 以上を無限回行き来するので $U_\infty(a,b)=\infty$ です。

有理数対 $(a,b)$ は可算個なので、確率1ですべての有理数対について上向き横断回数が有限です。従って確率1で $M_n$ の拡張実数値極限が存在します。

さらにFatouの補題から

$$
E\left[\liminf_{n\to\infty}|M_n|\right]
\le\liminf_{n\to\infty}E|M_n|
\le E|X|<\infty.
$$

極限が $+\infty$ または $-\infty$ になる集合が正の確率を持てば左辺が無限大になるので矛盾です。従って有限確率変数 $M_\infty$ が存在して

$$
M_n\to M_\infty\quad\text{a.s.}
$$

です。

### 4.5 証明：極限を同定する

第4.1節で $M_n\to Y$ in $L^1$、第4.4節で $M_n\to M_\infty$ a.s. を得ました。したがって

$$
|M_n-Y|\to|M_\infty-Y|
\quad\text{a.s.}
$$

です。Fatouの補題を非負確率変数 $|M_n-Y|$ に適用すると

$$
E|M_\infty-Y|
\le
\liminf_{n\to\infty}E|M_n-Y|
=0.
$$

従って

$$
M_\infty=Y
\quad\text{a.s.}
$$

です。よって

$$
\boxed{E[X\mid\mathcal G_n]\longrightarrow E[X\mid\mathcal G_\infty]
\quad L^1\text{ and a.s.}}
$$

が示されました。
<!-- proof-end -->

---

## 5. 二進分割の例で何が起きるか

第1節の二進分割を使い

$$
X(t)=t,
\qquad
M_n=E[X\mid\mathcal G_n]
$$

とします。$M_n$ は、$t$ が属する長さ $2^{-n}$ の二進区間上での $X$ の平均です。つまり区間の中点です。

$n$ が増えると二進区間は $t$ の位置を細かく特定するので

$$
M_n(t)\to t
$$

となります。Lévy上昇定理は、この有限分割の直感を一般の増加σ代数へ拡張したものです。

---

## 演習

### F0-00P3C-A01 二進分割と条件付き期待値

- Level: A
- 目安時間: 10分

$\Omega=[0,1]$、$P$ をLebesgue確率測度とし、$\mathcal G_n$ を長さ $2^{-n}$ の二進区間で生成されるσ代数とする。$X(t)=t$ に対する $E[X\mid\mathcal G_n]$ を求めよ。

<!-- solution-start -->
#### 詳細解答
各二進区間 $I_{k,n}=[k2^{-n},(k+1)2^{-n})$ 上で条件付き期待値は $X$ の平均なので

$$
E[X\mid\mathcal G_n](t)
=\left(k+\frac12\right)2^{-n}
\qquad(t\in I_{k,n}).
$$

#### 本番答案
$E[X\mid\mathcal G_n]$ は各二進区間上でその中点の値を取る階段関数。

#### 採点基準（20点）
- 区間ごとの定数性: 8点
- 平均値計算: 8点
- 結論: 4点
<!-- solution-end -->

### F0-00P3C-B01 Lévy上昇定理の意味

- Level: B
- 目安時間: 15分

$X\in L^1$、$\mathcal G_n\uparrow\mathcal G_\infty$ とする。Lévy上昇定理が「情報を増やすほど予測が改善する」という主張であることを、条件付き期待値の最良予測解釈と結びつけて説明せよ。

<!-- solution-start -->
#### 詳細解答
$E[X\mid\mathcal G_n]$ は$\mathcal G_n$可測な予測の中でXを近似する対象で、$n$とともに利用可能な情報が増える。Lévy上昇定理はこれらが最終情報$\mathcal G_\infty$を使う条件付き期待値へL1かつa.s.収束することを保証する。

#### 本番答案
$\mathcal G_n$の増加は利用可能情報の増加を表し、最良予測$E[X\mid\mathcal G_n]$は最終情報による予測$E[X\mid\mathcal G_\infty]$へ収束する。

#### 採点基準（20点）
- 情報増加の解釈: 7点
- 条件付き期待値の意味: 7点
- 収束先: 6点
<!-- solution-end -->

---

## 章末チェック

- 増加する部分σ代数列を定義できる。
- $\bigcup_n\mathcal G_n$ が代数になる理由を説明できる。
- $\mathcal G_\infty$ の集合を $\bigcup_n\mathcal G_n$ の集合で確率近似できることを説明できる。
- 条件付き期待値列がmartingaleになることをtower propertyから示せる。
- 上向き横断回数が有限なら経路の振動が止まることを説明できる。
- Lévy上昇定理を $L^1$ とa.s.の両方で述べられる。

次は [F0-00P3D 押し出し・Doob--Dynkin](../F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md) で、条件付き期待値を $m(Y)$ の形へ落とします。
