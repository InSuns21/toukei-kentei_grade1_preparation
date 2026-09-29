# F0-00D2B 補講：単調収束定理・Fatouの補題・優収束定理

D2AでLebesgue積分を定義しました。次に必要なのは、関数列の極限と積分をどう交換するかです。

この講義では、単調収束定理（Monotone Convergence Theorem; MCT）、Fatouの補題（Fatou's lemma）、Lebesgueの優収束定理（Dominated Convergence Theorem; DCT）を次の順に使います。

```text
MCT
 ↓
Fatou
 ↓
DCT
```

以後、このページでは **MCT**、**DCT** という略称を使います。

「極限と積分を交換してよい」という結論だけ覚えるのではなく、**なぜ各定理の仮定が違うのか**まで理解します。

## 0. まず「点ごとに収束したから積分も収束」は偽だと知る

$[0,1]$ 上で

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

を考えます。各 $x>0$ では十分大きい $n$ で $f_n(x)=0$ なので

$$
f_n\to0\quad\text{a.e.}
$$

です。ここで **a.e.** は *almost everywhere*（ほとんど至る所）の略で、「測度0の例外を除いて成り立つ」という意味です。

しかし面積は高さ $n$ × 幅 $1/n$ なので

$$
\int_0^1 f_n(x)\,dx=1
$$

のままです。したがって

$$
\lim_n\int f_n=1
\ne
0=\int\lim_n f_n.
$$

つまり極限と積分の交換には追加条件が必要です。

この講義の三定理は、その追加条件を別々の形で与えます。

| 定理 | 何を保証に使うか |
|---|---|
| MCT | 非負で下から単調増加 |
| Fatou | 非負性だけを残し、等号ではなく下からの不等式 |
| DCT | 単調性の代わりに一つの可積分な支配関数 |

最初にこの失敗例を持っておくと、仮定が単なる技術条件ではないことが分かります。

---

<a id="ref-limit-integral-exchange"></a>

## 1. 単調収束定理

<!-- formal-statement-start -->
### 定理（単調収束定理 / Monotone Convergence Theorem; MCT）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数列 $(f_n)_{n\ge1}$ が

$$
0\le f_1(\omega)\le f_2(\omega)\le\cdots
$$

を全ての $\omega\in\Omega$ について満たし、

$$
f(\omega)=\lim_{n\to\infty}f_n(\omega)
$$

と定める。このとき $f$ は非負可測であり、

$$
\boxed{
\lim_{n\to\infty}\int_\Omega f_n\,d\mu
=
\int_\Omega f\,d\mu
}
$$

が成り立つ。積分値は $\infty$ でもよい。
<!-- formal-statement-end -->

### 1.1 証明の見取り図

$f_n\le f$ なので

$$
\lim_n\int f_n\le\int f
$$

はすぐ出ます。難しいのは逆向きです。

そこで $f$ の下にある任意の単関数 $\phi$ を固定し、$f_n$ が最終的に $\alpha\phi$ を覆う部分を増やしていきます。測度の下からの連続性で

$$
\int f_n\gtrsim \alpha\int\phi
$$

を得て、最後に $\alpha\uparrow1$、さらに全ての $\phi\le f$ の 上限 を取ります。

つまり **一般の $f$ を直接つかまず、Lebesgue積分の定義である単関数近似へ戻る** のが核心です。

<!-- proof-start -->
### 証明

まず極限関数 $f$ が可測であることを確認します。任意の $a\in\mathbb R$ に対して、$f_n\uparrow f$ だから

$$
\{f\le a\}
=
\bigcap_{n=1}^{\infty}\{f_n\le a\}.
$$

各 $f_n$ は可測なので右辺は可測です。従って $f$ は非負可測関数です。

また $f_n\le f$ なので[Lebesgue積分の単調性](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#prop-f0-00d2a-02)より

$$
\int f_n\,d\mu\le\int f\,d\mu.
$$

さらに $f_n\le f_{n+1}$ なので積分列も単調増加です。したがって拡張実数値の極限

$$
L:=\lim_{n\to\infty}\int f_n\,d\mu
$$

は存在し、$L\le\int f$ です。逆向きの不等式を示します。

任意の非負単関数 $\phi$ で

$$
0\le\phi\le f
$$

を満たすものを固定し、$0<\alpha<1$ を取ります。

$$
E_n
:=
\{\omega:f_n(\omega)\ge\alpha\phi(\omega)\}
$$

と置きます。この集合が可測であることを、$\phi$ の有限値性から確認します。$\phi$ の正の値を $a_1,\ldots,a_m$、対応する値集合を $A_1,\ldots,A_m$ とすると

$$
E_n
=
\{\phi=0\}
\cup
\bigcup_{k=1}^m
\left(
A_k\cap\{f_n\ge\alpha a_k\}
\right).
$$

各集合は可測なので $E_n$ も可測です。$f_n$ は単調増加だから

$$
E_1\subset E_2\subset\cdots.
$$

また $\phi(\omega)>0$ なら $f_n(\omega)\uparrow f(\omega)\ge\phi(\omega)$ なので、十分大きい $n$ で $f_n(\omega)\ge\alpha\phi(\omega)$ となります。したがって

$$
\bigcup_{n=1}^\infty E_n
\supset
\{\phi>0\}.
$$

$E_n$ 上では $f_n\ge\alpha\phi$ なので

$$
\int f_n\,d\mu
\ge
\alpha\int_{E_n}\phi\,d\mu.
$$

D2A の定義に合わせ、$\phi$ が取る正の値だけを並べて

$$
\phi=\sum_{k=1}^m a_k1_{A_k},
\qquad
a_k>0,
\qquad
A_k=\{\phi=a_k\}
$$

と書きます。このとき

$$
A_k\subset\{\phi>0\}.
$$

したがって $\bigcup_nE_n\supset\{\phi>0\}$ から

$$
A_k\cap E_n\uparrow A_k.
$$

また

$$
\int_{E_n}\phi\,d\mu
=
\sum_{k=1}^m a_k\mu(A_k\cap E_n).
$$

D2の測度の[下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)を各 $A_k\cap E_n$ に適用すると

$$
\mu(A_k\cap E_n)\uparrow\mu(A_k).
$$

有限個の和なので極限を各項へ通せて、

$$
\int_{E_n}\phi\,d\mu
\to
\int\phi\,d\mu.
$$

よって

$$
L\ge\alpha\int\phi\,d\mu.
$$

$\alpha\uparrow1$ とすれば

$$
L\ge\int\phi\,d\mu.
$$

これは任意の $0\le\phi\le f$ なる単関数について成り立つため、Lebesgue積分の定義から

$$
L\ge\int f\,d\mu.
$$

すでに逆向き $L\le\int f$ を得ているので等号です。$\square$
<!-- proof-end -->

### 例1：$x^n$ の積分

$[0,1]$ 上で

$$
f_n(x)=1-x^n
$$

とすると $0\le f_n\uparrow1_{[0,1)}$。[MCT](#ref-limit-integral-exchange)より

$$
\int_0^1(1-x^n)\,dx
\to
\int_0^1 1\,dx=1.
$$

実際左辺は $1-1/(n+1)$ です。

---

## 1.2 MCT から積分の加法性を回収する

DCT の証明では

$$
\int(2g-h)
=
2\int g-\int h
$$

のような積分の代数を使います。これを暗黙の既知事項にせず、いま得た MCT から導いておきます。

<a id="prop-f0-00d2b-nonnegative-additivity"></a>

<!-- formal-statement-start -->
### 命題（非負Lebesgue積分の加法性と正の斉次性）

非負可測関数 $u,v$ と定数 $c\ge0$ に対して

$$
\int(u+v)\,d\mu
=
\int u\,d\mu
+
\int v\,d\mu,
$$

$$
\int cu\,d\mu
=
c\int u\,d\mu
$$

が成り立つ。値 $\infty$ を許し、$0\cdot\infty=0$ と約束する。
<!-- formal-statement-end -->

### 証明の見取り図

D2A の単関数近似を

$$
\phi_n\uparrow u,
\qquad
\psi_n\uparrow v
$$

と取ります。単関数では共通細分を使えば加法性が有限和の計算として成り立ちます。そこで

$$
\phi_n+\psi_n\uparrow u+v
$$

へ MCT を適用し、単関数での等式を一般の非負可測関数へ持ち上げます。

<!-- proof-start -->
### 証明

[D2A の単関数近似定理](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)から、非負単関数列 $(\phi_n),(\psi_n)$ を

$$
0\le\phi_n\uparrow u,
\qquad
0\le\psi_n\uparrow v
$$

となるように取ります。

まず単関数の加法性を確認します。$\phi_n$ と $\psi_n$ の値を取る可測集合を共通細分すると、各小片上で $\phi_n,\psi_n$ は定数です。従って「高さ×測度」の有限和を小片ごとに足せば

$$
\int(\phi_n+\psi_n)\,d\mu
=
\int\phi_n\,d\mu
+
\int\psi_n\,d\mu.
$$

また

$$
\phi_n+\psi_n\uparrow u+v.
$$

[MCT](#ref-limit-integral-exchange)を $\phi_n,\psi_n,\phi_n+\psi_n$ に適用すると

$$
\begin{aligned}
\int(u+v)\,d\mu
&=
\lim_{n\to\infty}
\int(\phi_n+\psi_n)\,d\mu\\
&=
\lim_{n\to\infty}
\left(
\int\phi_n\,d\mu
+
\int\psi_n\,d\mu
\right)\\
&=
\int u\,d\mu
+
\int v\,d\mu.
\end{aligned}
$$

正の斉次性も同じです。$c>0$ なら $c\phi_n\uparrow cu$ で、単関数では

$$
\int c\phi_n\,d\mu
=
c\int\phi_n\,d\mu.
$$

MCT を適用して

$$
\int cu\,d\mu
=
c\int u\,d\mu.
$$

$c=0$ は両辺0です。$\square$
<!-- proof-end -->

<a id="cor-f0-00d2b-integral-linearity"></a>

<!-- formal-statement-start -->
### 系（可積分関数の線形性と絶対値評価）

可積分関数 $u,v$ と実数 $a,b$ に対して $au+bv$ は可積分で

$$
\int(au+bv)\,d\mu
=
a\int u\,d\mu
+
b\int v\,d\mu.
$$

また任意の可積分関数 $h$ について

$$
\boxed{
\left|\int h\,d\mu\right|
\le
\int|h|\,d\mu
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず、非負可積分関数 $P,N$ があって

$$
h=P-N
$$

と書ける場合を考えます。点ごとに

$$
h^+ + N
=
h^- + P
$$

が成り立ちます。実際、$h=P-N$ の正負どちらの場合でも両辺は $\max(P,N)$ です。

直前の非負積分の加法性から

$$
\int h^+\,d\mu+\int N\,d\mu
=
\int h^-\,d\mu+\int P\,d\mu.
$$

全て有限なので移項でき、

$$
\int h\,d\mu
=
\int P\,d\mu-\int N\,d\mu.
$$

ここで実数 $a,b$ に対して

$$
a^+=\max(a,0),
\qquad
a^-=\max(-a,0),
$$

$$
b^+=\max(b,0),
\qquad
b^-=\max(-b,0)
$$

と置きます。このとき

$$
a=a^+-a^-,
\qquad
b=b^+-b^-.
$$

さらに

$$
au+bv
=
P-N
$$

となるよう

$$
P
=
a^+u^+ + a^-u^- + b^+v^+ + b^-v^-,
$$

$$
N
=
a^+u^- + a^-u^+ + b^+v^- + b^-v^+
$$

と取れば、$P,N$ は非負可積分です。非負積分の加法性と正の斉次性を使って整理すると

$$
\int(au+bv)\,d\mu
=
a\int u\,d\mu
+
b\int v\,d\mu.
$$

最後に

$$
|h|=h^++h^-
$$

なので非負積分の加法性から

$$
\int|h|\,d\mu
=
\int h^+\,d\mu
+
\int h^-\,d\mu.
$$

従って

$$
\left|\int h\,d\mu\right|
=
\left|
\int h^+\,d\mu
-
\int h^-\,d\mu
\right|
\le
\int|h|\,d\mu.
$$

$\square$
<!-- proof-end -->

---

## 2. Fatouの補題

単調でない非負関数列でも、下からの評価は残せます。

<a id="def-f0-00d2b-01"></a>
 
<!-- formal-statement-start -->
### 定義（点ごとのliminf）

実数列 $(a_n)$ に対して

$$
\liminf_{n\to\infty}a_n
:=
\lim_{n\to\infty}\inf_{k\ge n}a_k.
$$

関数列では各 $\omega$ ごとにこの定義を適用します。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d2b-01 -->
**定義の確認**

例えば $a_n=0$（$n$ が偶数）、$a_n=1$（$n$ が奇数）とします。どの $n$ から先を見ても 0 と 1 が現れるので、

$$
\inf_{k\ge n}a_k=0
$$

が全ての $n$ で成り立ちます。したがって定義どおり

$$
\liminf_{n\to\infty}a_n=0.
$$

つまり liminf は「十分先の尾部に残り続ける下側の値」を拾う量です。
<!-- definition-example-end -->

### 2.1 直感：単調でない列から「単調な下側包絡」を作る

元の $f_n$ が上下に振動していても、

$$
g_n=\inf_{k\ge n}f_k
$$

と置けば

$$
g_1\le g_2\le\cdots
$$

という単調増加列になります。

しかも極限は

$$
g_n\uparrow\liminf f_n.
$$

したがってFatouは「振動する列を liminf という単調な下側近似へ変換し、[MCT](#ref-limit-integral-exchange)を使う定理」と読めます。

<a id="lem-f0-00d2b-01"></a>
 
<!-- formal-statement-start -->
### 補題（Fatouの補題 / Fatou's lemma）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の非負可測関数列 $(f_n)$ に対して

$$
\boxed{
\int_\Omega \liminf_{n\to\infty}f_n\,d\mu
\le
\liminf_{n\to\infty}
\int_\Omega f_n\,d\mu
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 2.2 証明の見取り図

1. $g_n=\inf_{k\ge n}f_k$ を作る。
2. $g_n\uparrow\liminf f_n$ なのでMCT。
3. $g_n\le f_k$ $(k\ge n)$ から積分も下から抑える。
4. $n\to\infty$ で liminf が現れる。

Fatouは独立の巨大定理というより、MCTを使える形へ列を加工した結果です。

<!-- proof-start -->
### 証明

$$
g_n(\omega)
:=
\inf_{k\ge n}f_k(\omega)
$$

と置きます。まず $g_n$ の可測性を確認します。任意の $t\in\mathbb R$ に対して

$$
\{g_n<t\}
=
\bigcup_{k\ge n}\{f_k<t\}.
$$

右辺は可測集合の可算和なので可測です。さらに

$$
\{g_n\le a\}
=
\bigcap_{r=1}^{\infty}
\left\{
g_n<a+\frac1r
\right\},
$$

よって [D2 の可測関数の定義](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#def-f0-00d2-07)に照らして $g_n$ は可測です。

尾部を短くすると下限は大きくなるので

$$
g_1\le g_2\le\cdots.
$$

また点ごとの liminf の定義そのものから

$$
g_n\uparrow\liminf_{n\to\infty}f_n.
$$

[MCT](#ref-limit-integral-exchange)より

$$
\int\liminf f_n\,d\mu
=
\lim_{n\to\infty}\int g_n\,d\mu.
$$

一方、任意の $k\ge n$ について $g_n\le f_k$ なので

$$
\int g_n\,d\mu
\le
\inf_{k\ge n}\int f_k\,d\mu.
$$

$n\to\infty$ とすれば

$$
\int\liminf f_n\,d\mu
\le
\lim_{n\to\infty}\inf_{k\ge n}\int f_k\,d\mu
=
\liminf_{n\to\infty}\int f_n\,d\mu.
$$

$\square$
<!-- proof-end -->

### 例2：等号にならないFatou

$[0,1]$ 上で

$$
f_n(x)=n\,1_{(0,1/n)}(x)
$$

とします。各 $n$ で

$$
\int_0^1f_n(x)\,dx=1.
$$

しかし各 $x>0$ について十分大きい $n$ では $x\notin(0,1/n)$ なので $f_n(x)=0$。したがって $f_n\to0$ a.e. で

$$
\int\liminf f_n=0
<1=\liminf\int f_n.
$$

Fatouは一般には等号ではありません。

---

## 3. 優収束定理

単調性を失っても、「全てを一つの可積分関数が支配する」なら積分と極限を交換できます。

### 3.1 直感：支配関数は「質量が細い場所へ逃げて集中する」のを防ぐ

冒頭の反例 $n1_{(0,1/n)}$ は、高さがどんどん大きくなるため、一つの可積分関数では全てを支配できません。

DCTの条件

$$
|f_n|\le g,\qquad \int g<\infty
$$

は、関数列の質量が無限に高いスパイクとして逃げるのを一つの積分可能な天井で抑えます。

単調性がなくてもこの天井があれば、点ごとの収束を $L^1$ 収束まで強められます。ここで **$L^1$ 収束**とは、$\int|f_n-f|\,d\mu\to0$ となる収束です。

<a id="thm-f0-00d2b-01"></a>
 
<!-- formal-statement-start -->
### 定理（Lebesgueの優収束定理 / Dominated Convergence Theorem; DCT）

測度空間 $(\Omega,\mathcal F,\mu)$ 上の可測関数列 $(f_n)$ と可測関数 $f$ が

$$
f_n\to f\quad\text{a.e.}
$$

を満たすとする。さらに、ある可積分関数 $g:\Omega\to[0,\infty)$ が存在し、全ての $n$ について

$$
|f_n|\le g\quad\text{a.e.}
$$

が成り立つとする。このとき $f$ は可積分で

$$
\boxed{
\int_\Omega |f_n-f|\,d\mu\to0
}
$$

したがって

$$
\boxed{
\int_\Omega f_n\,d\mu
\to
\int_\Omega f\,d\mu
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 3.2 証明の見取り図

$|f_n-f|\to0$ を示したいので、それを直接DCTに使うのではなくFatouへ戻します。

$$
0\le 2g-|f_n-f|
$$

という非負関数を作ると、Fatouの不等式を整理するだけで

$$
\limsup_n\int|f_n-f|\le0
$$

が出ます。

つまり証明の依存関係は

```text
MCT
 ↓
Fatou
 ↓
DCT
```

そのものです。

<!-- proof-start -->
### 証明

まず a.e. の条件を同じ零集合の外で同時に使える形へそろえます。$f_n\to f$ が失敗する零集合を $N_0$、$|f_n|\le g$ が失敗する零集合を $N_n$ とします。可算和

$$
N
=
N_0\cup\bigcup_{n=1}^{\infty}N_n
$$

も測度0です。そこで

$$
\widetilde f_n=f_n1_{N^c},
\qquad
\widetilde f=f1_{N^c}
$$

と置きます。$N^c$ 上では元の仮定が全て成り立ち、$N$ 上では両方0なので

$$
\widetilde f_n\to\widetilde f,
\qquad
|\widetilde f_n|\le g
$$

が全ての点で成り立ちます。

また

$$
|\widetilde f_n|=|f_n|\quad\text{a.e.},
\qquad
|\widetilde f|=|f|\quad\text{a.e.}
$$

です。[D2A の非負可測関数の a.e. 変更による積分不変性](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#prop-f0-00d2a-nonnegative-ae-invariance)から、絶対値の積分はこの変更で変わりません。

以下では記号を簡単にするため $\widetilde f_n,\widetilde f$ を改めて $f_n,f$ と書きます。すると仮定は全点で成り立ちます。

極限を取ると

$$
|f|\le g.
$$

[Lebesgue積分の単調性](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#prop-f0-00d2a-02)から

$$
\int|f|\,d\mu
\le
\int g\,d\mu
<
\infty.
$$

従って $f$ は可積分です。各 $n$ についても $|f_n|\le g$ なので

$$
\int|f_n|\,d\mu
\le
\int g\,d\mu
<
\infty
$$

なので可積分です。

$$
h_n:=|f_n-f|
$$

と置くと

$$
0\le h_n\le |f_n|+|f|\le2g,
\qquad
h_n\to0.
$$

したがって

$$
q_n:=2g-h_n
$$

は非負可測関数列で

$$
q_n\to2g.
$$

[Fatouの補題](#lem-f0-00d2b-01)を $(q_n)$ に適用すると

$$
2\int g\,d\mu
=
\int\liminf q_n\,d\mu
\le
\liminf_{n\to\infty}\int q_n\,d\mu.
$$

一方、$q_n+h_n=2g$ です。[非負Lebesgue積分の加法性と正の斉次性](#prop-f0-00d2b-nonnegative-additivity)より

$$
\int q_n\,d\mu
+
\int h_n\,d\mu
=
2\int g\,d\mu.
$$

右辺は有限なので

$$
\int q_n\,d\mu
=
2\int g\,d\mu
-
\int h_n\,d\mu.
$$

ここで

$$
a_n:=\int h_n\,d\mu,
\qquad
C:=2\int g\,d\mu
$$

と置きます。$0\le a_n\le C<\infty$ であり、

$$
\int q_n\,d\mu=C-a_n.
$$

従って Fatou の不等式は

$$
C
\le
\liminf_{n\to\infty}(C-a_n)
$$

となります。一方、$a_n\ge0$ なので各 $n$ で

$$
C-a_n\le C.
$$

従って

$$
\liminf_{n\to\infty}(C-a_n)=C.
$$

この等式から $a_n\to0$ を直接確認します。任意の $\varepsilon>0$ に対して、下極限の定義から十分大きい $N$ を取れば

$$
n\ge N
\quad\Longrightarrow\quad
C-a_n>C-\varepsilon.
$$

従って

$$
0\le a_n<\varepsilon
\qquad(n\ge N).
$$

よって

$$
a_n\to0,
$$

すなわち

$$
\int|f_n-f|\,d\mu
=
\int h_n\,d\mu
\to0.
$$

最後に[可積分関数の線形性と絶対値評価](#cor-f0-00d2b-integral-linearity)を $h=f_n-f$ に使うと

$$
\begin{aligned}
\left|
\int f_n\,d\mu-\int f\,d\mu
\right|
&=
\left|
\int(f_n-f)\,d\mu
\right|\\
&\le
\int|f_n-f|\,d\mu
\to0.
\end{aligned}
$$

ここまでの $f_n,f$ は、零集合 $N$ 上を0へ変更した代表でした。元の関数を $f_n^{\mathrm{orig}},f^{\mathrm{orig}}$ と書くと

$$
|f_n^{\mathrm{orig}}|
=
|f_n|
\quad\text{a.e.},
\qquad
|f^{\mathrm{orig}}|
=
|f|
\quad\text{a.e.}
$$

です。[D2A の非負可測関数の a.e. 変更による積分不変性](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#prop-f0-00d2a-nonnegative-ae-invariance)から、元の $f_n^{\mathrm{orig}},f^{\mathrm{orig}}$ も可積分です。

そこで [D2A の零集合上の変更に関する定理](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-f0-00d2a-01)を適用すると

$$
\int f_n^{\mathrm{orig}}\,d\mu
=
\int f_n\,d\mu,
\qquad
\int f^{\mathrm{orig}}\,d\mu
=
\int f\,d\mu.
$$

また

$$
|f_n^{\mathrm{orig}}-f^{\mathrm{orig}}|
=
|f_n-f|
\quad\text{a.e.}
$$

なので、非負関数の a.e. 不変性から

$$
\int
|f_n^{\mathrm{orig}}-f^{\mathrm{orig}}|
\,d\mu
=
\int|f_n-f|\,d\mu
\to0.
$$

従って元の関数列についても $L^1$ 収束と積分の収束が成り立ちます。$\square$
<!-- proof-end -->

### 例3：$x^n$ にDCTを使う

$[0,1]$ 上で $f_n(x)=x^n$ とします。$x\in[0,1)$ では $x^n\to0$、$x=1$ では1ですが、一点集合は測度0なので

$$
f_n\to0\quad\text{a.e.}
$$

また $0\le x^n\le1$ で、$g=1$ は可積分。[DCT](#thm-f0-00d2b-01)より

$$
\int_0^1x^n\,dx\to0.
$$

---

## 4. どの定理を使うか

| 状況 | まず考える定理 |
|---|---|
| $0\le f_n\uparrow f$ | MCT |
| 非負だが単調性なし、下から評価したい | Fatou |
| $f_n\to f$ a.e. で一つの可積分 $g$ が支配 | DCT |

DCTは便利ですが、「支配関数 $g$ がある」という条件は本質的です。

---

## 4.1 三定理を一つの絵で覚える

```text
非負 + 単調増加
   └─ MCT: 等号で極限交換

非負だけ
   └─ Fatou: 下からの不等式だけ残る

符号あり・単調でない
   + 可積分な共通上界
   └─ DCT: L1収束まで得る
```

「どの定理名だったか」より、**何が極限交換を安全にしているか**を先に見ます。

## 5. DCTの仮定がないと何が起きるか

再び

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

を考えます。$f_n\to0$ a.e. ですが

$$
\int_0^1f_n=1
$$

なので積分は0へ収束しません。

この列を一つの可積分関数 $g$ で支配することはできません。実際、各 $n$ について

$$
f_n\le g\quad\text{a.e.}
$$

と仮定します。各不等式が失敗する零集合を $N_n$ とし、

$$
N=\bigcup_{n=1}^{\infty}N_n
$$

と置けば $\mu(N)=0$ で、$N^c$ 上では全ての $n$ について同時に $g\ge f_n$ です。

$$
I_n
=
\left(\frac1{n+1},\frac1n\right)
$$

と置くと、$x\in I_n\setminus N$ では $x<1/n$ なので

$$
f_n(x)=n,
\qquad
g(x)\ge n.
$$

区間 $I_n$ は互いに素で、零集合 $N$ を除いても

$$
\lambda(I_n\setminus N)
=
\lambda(I_n)
=
\frac1n-\frac1{n+1}.
$$

従って非負積分の加法性と単調性から

$$
\begin{aligned}
\int_0^1g(x)\,dx
&\ge
\sum_{n=1}^{\infty}
\int_{I_n\setminus N}g(x)\,dx\\
&\ge
\sum_{n=1}^{\infty}
n\,\lambda(I_n\setminus N)\\
&=
\sum_{n=1}^{\infty}
n\left(
\frac1n-\frac1{n+1}
\right)\\
&=
\sum_{n=1}^{\infty}\frac1{n+1}
=
\infty.
\end{aligned}
$$

従って可積分な共通支配関数は存在しません。失敗例では、幅が縮むのと同時に高さが上がり、その積分質量が消えずに残っています。

---

# 6. 演習

## F0-00D2B-A01 MCTの適用

- Level: A
- 目安時間: 8分

$[0,1]$ 上で $f_n=1-x^n$ とする。MCTの仮定を確認し、積分の極限を求めよ。

<!-- solution-start -->
### 詳細解答

$0\le1-x^n\le1-x^{n+1}$ なので単調増加。$x\in[0,1)$ で $x^n\to0$、$x=1$ でも $f_n(1)=0$ なので極限は $1_{[0,1)}$。[MCT](#ref-limit-integral-exchange)より

$$
\lim_n\int_0^1(1-x^n)dx
=
\int_0^11_{[0,1)}dx=1.
$$

実際左辺は $1-1/(n+1)$ です。

<!-- solution-end -->

## F0-00D2B-A02 Fatouの不等式

- Level: A
- 目安時間: 8分

$f_n=n1_{(0,1/n)}$ についてFatouの補題の両辺を計算せよ。

<!-- solution-start -->
### 詳細解答

$f_n\to0$ a.e. なので左辺は0。各 $n$ で $\int f_n=1$ なので右辺は1。したがって

$$
0\le1.
$$

<!-- solution-end -->

## F0-00D2B-A03 liminf を尾部下限から計算する

- Level: A
- 目安時間: 10分

実数列

$$
a_n
=
\begin{cases}
2+1/n,&n\text{ が偶数},\\
5+1/n,&n\text{ が奇数}
\end{cases}
$$

について

$$
\inf_{k\ge n}a_k
$$

の極限を調べ、$\liminf a_n$ を求めよ。

<!-- solution-start -->
### 詳細解答

十分先の尾部にも偶数番目と奇数番目の項が両方残ります。奇数番目の項は常に5より大きい一方、偶数番目の項は

$$
2+\frac1k
$$

で2へ近づきます。

従って各 $n$ について、尾部の下限は偶数番目の項から決まり、

$$
2
\le
\inf_{k\ge n}a_k
\le
2+\frac1m
$$

を満たす任意に大きな偶数 $m\ge n$ を取れます。$n\to\infty$ とすると

$$
\inf_{k\ge n}a_k\to2.
$$

したがって定義から

$$
\liminf_{n\to\infty}a_n=2.
$$
<!-- solution-end -->

## F0-00D2B-A04 MCT から非負積分の加法性を使う

- Level: A
- 目安時間: 10分

非負可測関数 $u,v$ が

$$
\int u\,d\mu=2,
\qquad
\int v\,d\mu=3
$$

を満たすとする。本文で MCT から導いた加法性を使って

$$
\int(4u+2v)\,d\mu
$$

を求め、どの性質をどの順に使ったか説明せよ。

<!-- solution-start -->
### 詳細解答

まず正の斉次性から

$$
\int4u\,d\mu
=
4\int u\,d\mu
=
8,
$$

$$
\int2v\,d\mu
=
2\int v\,d\mu
=
6.
$$

次に非負積分の加法性から

$$
\int(4u+2v)\,d\mu
=
\int4u\,d\mu
+
\int2v\,d\mu
=
8+6
=
14.
$$

使った順序は「正の斉次性で各係数を外へ出す → 加法性で和を分ける」です。これらは単関数での有限和計算を MCT で一般の非負可測関数へ持ち上げた性質です。
<!-- solution-end -->

## F0-00D2B-B01 DCTで極限交換

- Level: B
- 目安時間: 12分

$$
f_n(x)=\frac{x}{1+nx}
\qquad(0\le x\le1)
$$

について、[DCT](#thm-f0-00d2b-01)を用いて $\lim_n\int_0^1f_n(x)dx$ を求めよ。

<!-- solution-start -->
### 詳細解答

$x>0$ では $f_n(x)\to0$、$x=0$ でも0。さらに

$$
0\le f_n(x)\le x\le1.
$$

$g(x)=x$ は $[0,1]$ 上可積分なので[DCT](#thm-f0-00d2b-01)より

$$
\lim_n\int_0^1f_n(x)dx
=
\int_0^10dx=0.
$$

<!-- solution-end -->

## F0-00D2B-B02 MCTかDCTか

- Level: B
- 目安時間: 15分

$[0,1]$ 上で次の2列について、MCTとDCTのどちらが自然か理由とともに答えよ。

1. $f_n(x)=1-e^{-nx}$
2. $g_n(x)=x^n$

<!-- solution-start -->
### 詳細解答

1. $f_n$ は非負で $n$ とともに増加し、$x>0$ で1へ収束するのでMCTが自然。
2. $g_n$ は非負だが $n$ とともに減少するためMCTの形ではない。$0\le g_n\le1$、$g_n\to0$ a.e. なのでDCTが自然。

<!-- solution-end -->

## F0-00D2B-B03 $L^1$収束まで示す

- Level: B
- 目安時間: 15分

DCTの仮定の下で、単に $\int f_n\to\int f$ だけでなく

$$
\int|f_n-f|\,d\mu\to0
$$

が成り立つ理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$f_n\to f$ a.e. かつ $|f_n|\le g$ なら $|f|\le g$ a.e.。したがって

$$
|f_n-f|\le2g,
$$

かつ $|f_n-f|\to0$ a.e.。$2g$ は可積分なのでDCTを $|f_n-f|$ に適用して結論を得る。

<!-- solution-end -->

## F0-00D2B-C01 極限交換が失敗する列

- Level: C
- 目安時間: 20分

$[0,1]$ 上で $f_n\to0$ a.e. だが

$$
\int_0^1f_n\,dx=1
$$

となる非負関数列を構成し、なぜDCTを適用できないか説明せよ。

<!-- solution-start -->
### 詳細解答

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

とすればよい。各 $x>0$ では十分大きい $n$ で $x\ge1/n$ なので $f_n(x)=0$。$x=0$ も区間に含めなければ0。したがってa.e.で0へ収束。

一方

$$
\int_0^1f_n=n\cdot\frac1n=1.
$$

もし DCT の仮定を満たす可積分関数 $g$ が存在すると仮定します。各 $n$ について

$$
f_n\le g\quad\text{a.e.}
$$

なので、失敗する零集合を全部まとめた可算和 $N$ を除けば、全ての $n$ について同時に $f_n\le g$ です。

$$
I_n
=
\left(\frac1{n+1},\frac1n\right)
$$

では $f_n=n$ だから、$I_n\setminus N$ 上で $g\ge n$ です。$N$ は零集合なので

$$
\lambda(I_n\setminus N)
=
\lambda(I_n)
=
\frac1n-\frac1{n+1}.
$$

従って

$$
\begin{aligned}
\int_0^1g(x)\,dx
&\ge
\sum_{n=1}^{\infty}
\int_{I_n\setminus N}g(x)\,dx\\
&\ge
\sum_{n=1}^{\infty}
n\left(
\frac1n-\frac1{n+1}
\right)\\
&=
\sum_{n=1}^{\infty}\frac1{n+1}
=
\infty.
\end{aligned}
$$

これは $g$ が可積分という仮定に反します。したがって可積分な共通支配関数は存在せず、DCT の支配条件を満たせません。

<!-- solution-end -->

---

## 7. 次に進む

ここまでは一つの測度空間上の積分でした。次は2つの測度空間を組み合わせ、

$$
\int_X\int_Y f(x,y)\,d\nu(y)d\mu(x)
$$

を正当化します。

**次：F0-00D2C 積測度・Tonelli・Fubini**
