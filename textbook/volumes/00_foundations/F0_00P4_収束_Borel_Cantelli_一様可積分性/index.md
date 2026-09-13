# F0-00P4 limsup・liminf・末尾事象・Borel--Cantelli・確率収束

<!-- definition-example-audit: strict -->

確率論では、各時点の確率だけでなく、**標本経路上で同じ種類の事象が無限回起こるのか、ある時点以降ずっと起こるのか**を区別する必要があります。

この章では、事象列の上極限・下極限を対にして導入し、`i.o.`（infinitely often）と eventually の意味を固定します。そのうえで末尾事象と Kolmogorov の 0--1 則を証明し、Borel--Cantelli の2補題を「無限回起こる確率が 0 と 1 のどちらになるかを判定する道具」として位置付けます。最後に、この事象列の言葉を概収束・確率収束へ接続します。

```text
limsup / liminf
  ↓
i.o. / eventually
  ↓
末尾 σ 代数・末尾事象
  ↓
Kolmogorov 0--1 則
  ↓
Borel--Cantelli I / II
  ↓
概収束を「大誤差が i.o. でない」と読む
  ↓
a.s. ⇒ probability,  L^p ⇒ probability
  ↓
probability ⇒ a.s. 収束部分列
```

---

## 1. 事象列の上極限と下極限

事象列 $A_1,A_2,\ldots$ を考えます。各標本点 $\omega$ について、

- $\omega\in A_n$ が無限個の $n$ で起こるのか、
- ある番号以降は全て $\omega\in A_n$ になるのか、

を集合として取り出したものが上極限と下極限です。

<a id="def-f0-00p4-limsup-event"></a>

<!-- formal-statement-start -->
> **定義（事象列の上極限）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の事象列 $A_1,A_2,\ldots\in\mathcal F$ に対し、

$$
\boxed{
\limsup_{n\to\infty}A_n
:=\bigcap_{m=1}^{\infty}\bigcup_{n\ge m}A_n
}
$$

> と定義します。$\omega\in\limsup_nA_n$ であることは、任意の $m$ より後に $\omega\in A_n$ となる $n$ が存在すること、すなわち $A_n$ が**無限回起こる**ことと同値です。この事象を

$$
\{A_n\ \mathrm{i.o.}\}
$$

> とも書きます。`i.o.` は **infinitely often** の略です。
<!-- formal-statement-end -->

<a id="def-f0-00p4-liminf-event"></a>

<!-- formal-statement-start -->
> **定義（事象列の下極限）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の事象列 $A_1,A_2,\ldots\in\mathcal F$ に対し、

$$
\boxed{
\liminf_{n\to\infty}A_n
:=\bigcup_{m=1}^{\infty}\bigcap_{n\ge m}A_n
}
$$

> と定義します。$\omega\in\liminf_nA_n$ であることは、ある $m$ が存在して全ての $n\ge m$ で $\omega\in A_n$ となること、すなわち $A_n$ が**ある時点以降ずっと起こる**ことと同値です。これを「$A_n$ が eventually 起こる」といいます。
<!-- formal-statement-end -->

### 1.1 一つの例で limsup と liminf を見分ける

標本空間を

$$
\Omega=\{a,b,c\}
$$

とし、

$$
A_n=
\begin{cases}
\{a,b\},&n\text{ が偶数},\\
\{a,c\},&n\text{ が奇数}
\end{cases}
$$

とします。

<!-- definition-example-start: def-f0-00p4-limsup-event -->
**上極限の定義を確認します。**  
$a$ は全ての $A_n$ に入り、$b$ は全ての偶数番目、$c$ は全ての奇数番目の $A_n$ に入ります。従って $a,b,c$ のどの点についても、任意の $m$ より後にその点を含む $A_n$ が存在します。よって

$$
\limsup_{n\to\infty}A_n=\{a,b,c\}=\Omega.
$$

$b,c$ は「ずっと」ではありませんが「無限回」は現れるため、上極限に入ります。
<!-- definition-example-end -->

<!-- definition-example-start: def-f0-00p4-liminf-event -->
**下極限の定義を確認します。**  
$a$ は全ての $n$ で $A_n$ に入ります。一方、$b$ は奇数番目で外れ、$c$ は偶数番目で外れるので、$b,c$ について「ある番号以降ずっと $A_n$ に入る」は成り立ちません。従って

$$
\liminf_{n\to\infty}A_n=\{a\}.
$$
<!-- definition-example-end -->

---

<a id="prop-f0-00p4-limsup-liminf-duality"></a>

## 2. limsup と liminf の論理：無限回・有限回・eventually

<!-- formal-statement-start -->
> **命題（上極限・下極限の包含と補集合）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の任意の事象列 $(A_n)$ に対して、

$$
\boxed{
\liminf_{n\to\infty}A_n
\subseteq
\limsup_{n\to\infty}A_n
}
$$

> かつ

$$
\boxed{
\left(\limsup_{n\to\infty}A_n\right)^c
=
\liminf_{n\to\infty}A_n^c
}
$$

$$
\boxed{
\left(\liminf_{n\to\infty}A_n\right)^c
=
\limsup_{n\to\infty}A_n^c
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

標本点 $\omega$ ごとに量化記号へ直すと、二つの違いが見えます。

$$
\omega\in\limsup_nA_n
\iff
\forall m\ \exists n\ge m:\ \omega\in A_n,
$$

$$
\omega\in\liminf_nA_n
\iff
\exists m\ \forall n\ge m:\ \omega\in A_n.
$$

「ある時点以降ずっと」なら「任意の時点より後にも少なくとも一度」は起こります。また補集合の式は、この量化を否定したときに $\forall$ と $\exists$ が入れ替わることそのものです。

<!-- proof-start -->
### 証明

まず $\omega\in\liminf_nA_n$ とします。すると、ある $m_0$ が存在して

$$
\omega\in A_n
\qquad(\forall n\ge m_0)
$$

です。任意の $m$ に対して $n\ge\max\{m,m_0\}$ を一つ取れば $\omega\in A_n$ なので、

$$
\forall m\ \exists n\ge m:\ \omega\in A_n.
$$

従って $\omega\in\limsup_nA_n$ であり、

$$
\liminf_nA_n\subseteq\limsup_nA_n.
$$

次に $\omega\notin\limsup_nA_n$ とします。上極限の量化を否定すると

$$
\neg\left(\forall m\ \exists n\ge m:\ \omega\in A_n\right)
$$

なので

$$
\exists m\ \forall n\ge m:\ \omega\notin A_n.
$$

これは

$$
\exists m\ \forall n\ge m:\ \omega\in A_n^c
$$

と同じです。従って $\omega\in\liminf_nA_n^c$ であり、

$$
(\limsup_nA_n)^c=\liminf_nA_n^c.
$$

同様に $\omega\notin\liminf_nA_n$ は

$$
\neg\left(\exists m\ \forall n\ge m:\ \omega\in A_n\right)
$$

すなわち

$$
\forall m\ \exists n\ge m:\ \omega\notin A_n
$$

と同値です。これは $A_n^c$ が無限回起こることなので

$$
(\liminf_nA_n)^c=\limsup_nA_n^c.
$$
<!-- proof-end -->

したがって、次の4つは同じ構造を別の言葉で見ています。

| 集合 | 経路上の意味 |
|---|---|
| $\limsup A_n$ | $A_n$ が無限回起こる |
| $(\limsup A_n)^c=\liminf A_n^c$ | $A_n$ は有限回しか起こらない |
| $\liminf A_n$ | $A_n$ がある時点以降ずっと起こる |
| $(\liminf A_n)^c=\limsup A_n^c$ | $A_n$ が無限回失敗する |

---

<a id="def-f0-00p4-independent-event-sequence"></a>

## 3. 独立な事象列と末尾事象

Borel--Cantelli 第2補題や Kolmogorov の 0--1 則では、無限個の事象の独立性を扱います。有限個の場合の mutual independence をそのまま無限列へ拡張します。

<!-- formal-statement-start -->
> **定義（独立な事象列）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の事象列 $A_1,A_2,\ldots$ が**独立**であるとは、任意の相異なる有限個の添字 $i_1,\ldots,i_r$ と、各 $j$ について任意の

$$
B_j\in\sigma(A_{i_j})
$$

> に対して

$$
\boxed{
P\left(\bigcap_{j=1}^rB_j\right)
=
\prod_{j=1}^rP(B_j)
}
$$

> が成り立つことです。ここで $\sigma(A_i)=\{\varnothing,A_i,A_i^c,\Omega\}$ です。
<!-- formal-statement-end -->

この形にしておくと、$A_i$ だけでなく $A_i^c$ を混ぜた有限パターンも同時に扱えます。

<!-- definition-example-start: def-f0-00p4-independent-event-sequence -->
### 3.1 例：独立コイン投げ

標準的な無限回の公平コイン投げの積確率モデルを考え、$H_n$ を「$n$ 回目が表」の事象とします。相異なる $i_1,\ldots,i_r$ を取り、それぞれの回について表 $H_{i_j}$ か裏 $H_{i_j}^c$ を指定します。この特定の $r$ 回の表裏パターンが起こる確率は

$$
2^{-r}
=
\prod_{j=1}^r\frac12.
$$

$\varnothing$ や $\Omega$ を選ぶ場合も積公式は直ちに成り立つため、定義どおり $(H_n)$ は独立な事象列です。
<!-- definition-example-end -->

<a id="def-f0-00p4-tail-sigma-field"></a>

<!-- formal-statement-start -->
> **定義（末尾 σ 代数 / tail σ-field）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の事象列 $A_1,A_2,\ldots$ に対して、

$$
\boxed{
\mathcal T_A
:=
\bigcap_{m=1}^{\infty}
\sigma(A_m,A_{m+1},A_{m+2},\ldots)
}
$$

> を $(A_n)$ の**末尾 σ 代数**（tail σ-field）といいます。$T\in\mathcal T_A$ を**末尾事象**（tail event）といいます。
>
> 同様に確率変数列 $X_1,X_2,\ldots$ に対しては

$$
\mathcal T_X
:=
\bigcap_{m=1}^{\infty}
\sigma(X_m,X_{m+1},X_{m+2},\ldots)
$$

> を末尾 σ 代数と定義します。
<!-- formal-statement-end -->

「最初の有限個を無視しても判定できる」というのが末尾事象の直感です。

<!-- definition-example-start: def-f0-00p4-tail-sigma-field -->
### 3.2 例：無限回起こる事象は末尾事象

事象列 $(A_n)$ に対して

$$
T:=\{A_n\ \mathrm{i.o.}\}
=\limsup_{n\to\infty}A_n
$$

と置きます。任意の $m$ について、有限個 $A_1,\ldots,A_{m-1}$ を捨てても「無限回起こるか」は変わらないので

$$
T
=
\bigcap_{r=m}^{\infty}
\bigcup_{n\ge r}A_n.
$$

右辺は $A_m,A_{m+1},\ldots$ だけから作られているため

$$
T\in\sigma(A_m,A_{m+1},\ldots)
\qquad(\forall m).
$$

従って

$$
T\in\mathcal T_A.
$$

同じ理由で $\liminf_nA_n$ も末尾事象です。
<!-- definition-example-end -->

---

<a id="lem-f0-00p4-independent-blocks"></a>

## 4. 独立列は「過去」と「未来」に分けても独立

Kolmogorov の 0--1 則の核心は、独立列の末尾事象がどの有限過去とも独立になることです。そのために、まず独立性を生成 σ 代数へ持ち上げます。

<!-- formal-statement-start -->
> **補題（独立列のブロック独立性）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の独立な事象列 $(A_n)_{n\ge1}$ を考えます。互いに素な添字集合 $I,J\subset\mathbb N$ に対して

$$
\mathcal F_I:=\sigma(A_i:i\in I),
\qquad
\mathcal F_J:=\sigma(A_j:j\in J)
$$

> と置くと、$\mathcal F_I$ と $\mathcal F_J$ は独立な σ 代数です。
<!-- formal-statement-end -->

### 証明の見取り図

独立性の定義から直ちに積公式が分かるのは、有限個の $A_i$ または $A_i^c$ を交差して作る**有限円筒事象**です。そこから生成 σ 代数全体へ広げるため、[π--λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)を2回使います。

<!-- proof-start -->
### 証明

$I$ 側の有限円筒事象全体を

$$
\mathcal P_I
=
\left\{
\bigcap_{k=1}^r B_{i_k}:
 r\ge1,
 i_1,\ldots,i_r\in I\text{ は相異なり},
 B_{i_k}\in\sigma(A_{i_k})
\right\}
\cup\{\Omega\}
$$

とします。$J$ 側も同様に $\mathcal P_J$ とします。

二つの有限円筒事象を交差すると、同じ添字に関する条件は $\sigma(A_i)$ 内で交差して一つにまとめられるので、再び有限円筒事象になります。従って $\mathcal P_I,\mathcal P_J$ は π-system です。また

$$
\sigma(\mathcal P_I)=\mathcal F_I,
\qquad
\sigma(\mathcal P_J)=\mathcal F_J.
$$

$C\in\mathcal P_I$ と $D\in\mathcal P_J$ を取り、空集合でない場合を考えます。ある相異なる $i_1,\ldots,i_r\in I$ と $j_1,\ldots,j_s\in J$ を用いて

$$
C=\bigcap_{k=1}^rB_{i_k},
\qquad
D=\bigcap_{\ell=1}^sB_{j_\ell}
$$

と書けます。$I\cap J=\varnothing$ なので、現れる全ての添字は互いに異なります。独立な事象列の定義から

$$
P(C\cap D)
=
\left(\prod_{k=1}^rP(B_{i_k})\right)
\left(\prod_{\ell=1}^sP(B_{j_\ell})\right).
$$

同じ定義を $C$ と $D$ にそれぞれ適用すると

$$
P(C)=\prod_{k=1}^rP(B_{i_k}),
\qquad
P(D)=\prod_{\ell=1}^sP(B_{j_\ell}),
$$

したがって

$$
P(C\cap D)=P(C)P(D).
$$

$C$ または $D$ が空集合なら両辺とも0なので同じ式が成り立ちます。

まず $C\in\mathcal P_I$ を固定し、

$$
\mathcal D_C
:=
\{D\in\mathcal F_J:P(C\cap D)=P(C)P(D)\}
$$

と置きます。$\mathcal D_C$ が Dynkin 族であることを3条件から確認します。

1. $\Omega\in\mathcal D_C$ です。実際、$P(C\cap\Omega)=P(C)=P(C)P(\Omega)$。
2. $D\in\mathcal D_C$ なら

$$
\begin{aligned}
P(C\cap D^c)
&=P(C)-P(C\cap D)\\
&=P(C)-P(C)P(D)\\
&=P(C)P(D^c),
\end{aligned}
$$

なので $D^c\in\mathcal D_C$ です。
3. $D_1,D_2,\ldots\in\mathcal D_C$ が互いに素なら、$C\cap D_k$ も互いに素なので

$$
\begin{aligned}
P\left(C\cap\bigcup_{k=1}^{\infty}D_k\right)
&=\sum_{k=1}^{\infty}P(C\cap D_k)\\
&=P(C)\sum_{k=1}^{\infty}P(D_k)\\
&=P(C)P\left(\bigcup_{k=1}^{\infty}D_k\right).
\end{aligned}
$$

従って $\bigcup_kD_k\in\mathcal D_C$ です。

よって $\mathcal D_C$ は Dynkin 族です。有限円筒事象についてはすでに積公式を確認したので

$$
\mathcal P_J\subset\mathcal D_C.
$$

[π--λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)より

$$
\mathcal F_J
=\sigma(\mathcal P_J)
\subset\mathcal D_C.
$$

従って、任意の $C\in\mathcal P_I$ と任意の $D\in\mathcal F_J$ で積公式が成り立ちます。

次に

$$
\mathcal E
:=
\{C\in\mathcal F_I:
P(C\cap D)=P(C)P(D)\text{ が全ての }D\in\mathcal F_J\text{ で成り立つ}\}
$$

と置きます。今度は $C$ 側について Dynkin 族の3条件を確認します。

1. 任意の $D\in\mathcal F_J$ に対して $P(\Omega\cap D)=P(D)=P(\Omega)P(D)$ なので $\Omega\in\mathcal E$。
2. $C\in\mathcal E$ とします。任意の $D\in\mathcal F_J$ に対して

$$
\begin{aligned}
P(C^c\cap D)
&=P(D)-P(C\cap D)\\
&=P(D)-P(C)P(D)\\
&=P(C^c)P(D),
\end{aligned}
$$

よって $C^c\in\mathcal E$。
3. $C_1,C_2,\ldots\in\mathcal E$ が互いに素とします。任意の $D\in\mathcal F_J$ に対し $C_k\cap D$ も互いに素なので

$$
\begin{aligned}
P\left(\left(\bigcup_{k=1}^{\infty}C_k\right)\cap D\right)
&=\sum_{k=1}^{\infty}P(C_k\cap D)\\
&=\sum_{k=1}^{\infty}P(C_k)P(D)\\
&=P\left(\bigcup_{k=1}^{\infty}C_k\right)P(D).
\end{aligned}
$$

よって $\bigcup_kC_k\in\mathcal E$。

従って $\mathcal E$ は Dynkin 族です。前段から $\mathcal P_I\subset\mathcal E$ なので、再び [π--λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)より

$$
\mathcal F_I
=\sigma(\mathcal P_I)
\subset\mathcal E.
$$

従って任意の $C\in\mathcal F_I$、$D\in\mathcal F_J$ について

$$
P(C\cap D)=P(C)P(D),
$$

すなわち $\mathcal F_I$ と $\mathcal F_J$ は独立です。
<!-- proof-end -->

---

<a id="thm-f0-00p4-kolmogorov-zero-one"></a>

## 5. Kolmogorov の 0--1 則

末尾事象は「有限個の初期値を見ても決まらない事象」です。独立列では、その性質が極端な結論を生みます。

<!-- formal-statement-start -->
> **定理（Kolmogorov の 0--1 則：事象列版）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の独立な事象列 $(A_n)_{n\ge1}$ と、その末尾 σ 代数

$$
\mathcal T_A
=
\bigcap_{m=1}^{\infty}\sigma(A_m,A_{m+1},\ldots)
$$

> を考えます。任意の末尾事象 $T\in\mathcal T_A$ に対して

$$
\boxed{P(T)\in\{0,1\}}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 何を言っているのか

0--1 則は、末尾事象が**ほとんど確実に起こるか、ほとんど確実に起こらないかのどちらか**だと言っています。しかし、それだけでは 0 と 1 のどちらかまでは教えてくれません。後の Borel--Cantelli 補題が、その判定をしてくれる典型的な道具になります。

### 証明の見取り図

有限過去を

$$
\mathcal F_m:=\sigma(A_1,\ldots,A_m)
$$

とします。末尾事象 $T$ は $A_{m+1},A_{m+2},\ldots$ だけから判定できるため、[独立列のブロック独立性](#lem-f0-00p4-independent-blocks)により $T$ は $\mathcal F_m$ と独立です。これが全ての $m$ で成り立つので、[π--λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)で有限過去の和から全情報

$$
\sigma(A_1,A_2,\ldots)
$$

まで独立性を広げます。ところが $T$ 自身もこの全情報に属するため、最後には $T$ が自分自身と独立になります。

<!-- proof-start -->
### 証明

末尾事象 $T\in\mathcal T_A$ を一つ固定します。各 $m\ge1$ に対して

$$
\mathcal F_m:=\sigma(A_1,\ldots,A_m),
\qquad
\mathcal G_m:=\sigma(A_{m+1},A_{m+2},\ldots)
$$

と置きます。

$T\in\mathcal T_A$ なので、定義から

$$
T\in\mathcal G_m
\qquad(\forall m).
$$

一方、[独立列のブロック独立性](#lem-f0-00p4-independent-blocks)を

$$
I=\{1,\ldots,m\},
\qquad
J=\{m+1,m+2,\ldots\}
$$

へ適用すると、$\mathcal F_m$ と $\mathcal G_m$ は独立です。従って

$$
P(T\cap B)=P(T)P(B)
\qquad(B\in\mathcal F_m).
$$

ここで

$$
\mathcal F_{\infty}:=\sigma(A_1,A_2,\ldots)
$$

とし、

$$
\mathcal P:=\bigcup_{m=1}^{\infty}\mathcal F_m
$$

と置きます。$\mathcal F_m\subseteq\mathcal F_{m+1}$ なので、$B,C\in\mathcal P$ なら十分大きい $r$ に対して $B,C\in\mathcal F_r$ です。従って

$$
B\cap C\in\mathcal F_r\subset\mathcal P,
$$

よって $\mathcal P$ は π-system です。また

$$
\sigma(\mathcal P)=\mathcal F_{\infty}.
$$

次に

$$
\mathcal D_T
:=
\{B\in\mathcal F_{\infty}:P(T\cap B)=P(T)P(B)\}
$$

と置きます。$\mathcal D_T$ が Dynkin 族であることを確認します。

1. $P(T\cap\Omega)=P(T)=P(T)P(\Omega)$ なので $\Omega\in\mathcal D_T$。
2. $B\in\mathcal D_T$ なら

$$
\begin{aligned}
P(T\cap B^c)
&=P(T)-P(T\cap B)\\
&=P(T)-P(T)P(B)\\
&=P(T)P(B^c),
\end{aligned}
$$

よって $B^c\in\mathcal D_T$。
3. $B_1,B_2,\ldots\in\mathcal D_T$ が互いに素なら $T\cap B_k$ も互いに素なので

$$
\begin{aligned}
P\left(T\cap\bigcup_{k=1}^{\infty}B_k\right)
&=\sum_{k=1}^{\infty}P(T\cap B_k)\\
&=P(T)\sum_{k=1}^{\infty}P(B_k)\\
&=P(T)P\left(\bigcup_{k=1}^{\infty}B_k\right).
\end{aligned}
$$

よって $\bigcup_kB_k\in\mathcal D_T$。

従って $\mathcal D_T$ は Dynkin 族です。

任意の $B\in\mathcal P$ はある $m$ について $B\in\mathcal F_m$ なので、上で示した有限過去との独立性から

$$
\mathcal P\subset\mathcal D_T.
$$

従って [π--λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)より

$$
\mathcal F_{\infty}
=\sigma(\mathcal P)
\subset\mathcal D_T.
$$

一方、末尾 σ 代数は全情報の σ 代数に含まれるので

$$
T\in\mathcal T_A\subseteq\mathcal F_{\infty}.
$$

したがって $T\in\mathcal D_T$、すなわち $T$ は自分自身と独立です。よって

$$
P(T)
=P(T\cap T)
=P(T)^2.
$$

$0\le P(T)\le1$ なので

$$
P(T)\in\{0,1\}.
$$
<!-- proof-end -->

### 5.1 確率変数列にも同じ機構が働く

独立な確率変数列 $X_1,X_2,\ldots$ についても、各 $\sigma(X_n)$ が互いに独立な σ 代数をなすという意味で同じ証明を行えます。従って

$$
T\in
\bigcap_{m=1}^{\infty}
\sigma(X_m,X_{m+1},\ldots)
$$

である末尾事象 $T$ は

$$
P(T)\in\{0,1\}
$$

を満たします。

たとえば独立コイン投げで「表が無限回出る」は末尾事象なので、[Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)だけから確率は 0 か 1 のどちらかだと分かります。どちらかを決めるのが次の Borel--Cantelli です。

---

<a id="thm-borel-cantelli-1"></a>
<a id="thm-f0-00p4-borel-cantelli-1"></a>

## 6. Borel--Cantelli 第1補題：確率和が有限なら i.o. は確率0

<!-- formal-statement-start -->
> **補題（Borel--Cantelli 第1補題）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の事象列 $A_1,A_2,\ldots$ が

$$
\sum_{n=1}^{\infty}P(A_n)<\infty
$$

> を満たすなら

$$
\boxed{P(A_n\ \mathrm{i.o.})=0}
$$

> が成り立ちます。独立性は仮定しません。
<!-- formal-statement-end -->

### 証明の見取り図

$i.o.$ の事象は、どの $m$ についても tail union

$$
\bigcup_{n\ge m}A_n
$$

の中にあります。その確率を [union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) で級数の tail に抑えます。

<!-- proof-start -->
### 証明

任意の $m$ について

$$
\{A_n\ \mathrm{i.o.}\}
=\bigcap_{r=1}^{\infty}\bigcup_{n\ge r}A_n
\subseteq
\bigcup_{n\ge m}A_n.
$$

従って [union bound](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-union-bound) より

$$
\begin{aligned}
P(A_n\ \mathrm{i.o.})
&\le
P\left(\bigcup_{n\ge m}A_n\right)\\
&\le
\sum_{n\ge m}P(A_n).
\end{aligned}
$$

$\sum_nP(A_n)$ は収束するので、その tail は

$$
\sum_{n\ge m}P(A_n)\to0
\qquad(m\to\infty).
$$

左辺 $P(A_n\ \mathrm{i.o.})$ は $m$ に依らない非負数なので

$$
P(A_n\ \mathrm{i.o.})=0.
$$
<!-- proof-end -->

第1補題は「各 $A_n$ の確率が0へ行く」だけではなく、**確率の総和が有限**であることを使います。

---

<a id="lem-borel-cantelli-2"></a>
<a id="thm-f0-00p4-borel-cantelli-2"></a>

## 7. Borel--Cantelli 第2補題：独立で確率和が発散なら i.o. は確率1

<!-- formal-statement-start -->
> **補題（Borel--Cantelli 第2補題）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の独立な事象列 $A_1,A_2,\ldots$ が

$$
\sum_{n=1}^{\infty}P(A_n)=\infty
$$

> を満たすなら

$$
\boxed{P(A_n\ \mathrm{i.o.})=1}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

第2補題では「$m$ 回目以降、一度も $A_n$ が起きない」確率を調べます。独立性で積に分解し、

$$
1-x\le e^{-x}
$$

によって、確率和の発散を指数関数の0への収束へ変換します。

<!-- proof-start -->
### 証明

$m\le N$ に対して独立性から

$$
P\left(\bigcap_{n=m}^{N}A_n^c\right)
=
\prod_{n=m}^{N}(1-P(A_n)).
$$

$0\le x\le1$ で $1-x\le e^{-x}$ なので

$$
P\left(\bigcap_{n=m}^{N}A_n^c\right)
\le
\exp\left(-\sum_{n=m}^{N}P(A_n)\right).
$$

$\sum_nP(A_n)=\infty$ だから、固定した $m$ に対して

$$
\sum_{n=m}^{N}P(A_n)\to\infty
\qquad(N\to\infty),
$$

従って右辺は0へ収束します。

$$
C_{m,N}:=\bigcap_{n=m}^{N}A_n^c
$$

と置くと $C_{m,N}$ は $N$ とともに減少します。[確率測度の上からの連続性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-continuity-from-above)より

$$
\begin{aligned}
P\left(\bigcap_{n=m}^{\infty}A_n^c\right)
&=\lim_{N\to\infty}P(C_{m,N})\\
&=0.
\end{aligned}
$$

補集合を取れば

$$
P\left(\bigcup_{n\ge m}A_n\right)=1
\qquad(\forall m).
$$

さらに

$$
\{A_n\ \mathrm{i.o.}\}
=
\bigcap_{m=1}^{\infty}\bigcup_{n\ge m}A_n.
$$

各 $m$ について $\bigcup_{n\ge m}A_n$ の補集合は零事象なので、その補集合の可算和も零事象です。従って上の可算共通部分は確率1であり、

$$
P(A_n\ \mathrm{i.o.})=1.
$$
<!-- proof-end -->

### 7.1 なぜ独立性が必要か

全て同じ事象 $A_n=A$ とし、$0<P(A)<1$ とします。このとき

$$
\sum_{n=1}^{\infty}P(A_n)=\infty
$$

ですが

$$
\{A_n\ \mathrm{i.o.}\}=A
$$

なので

$$
P(A_n\ \mathrm{i.o.})=P(A)\notin\{0,1\}.
$$

独立性を失うと、$\{A_n\ \mathrm{i.o.}\}$ に [Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)を適用できず、第2補題の有限積への分解も保証されません。

### 7.2 0--1 則と Borel--Cantelli の役割分担

独立列では $\{A_n\ \mathrm{i.o.}\}$ は末尾事象なので、[Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)から

$$
P(A_n\ \mathrm{i.o.})\in\{0,1\}
$$

までは分かります。

- $\sum_nP(A_n)<\infty$ なら [Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)が **0** と判定する。
- 独立かつ $\sum_nP(A_n)=\infty$ なら [Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)が **1** と判定する。

ここまで来ると、Borel--Cantelli は「突然出てくる補題」ではなく、末尾事象の確率を具体的に判定する道具として見えます。

---

<a id="def-f0-00p4-as-convergence"></a>

## 8. 概収束と確率収束

事象列の道具を確率変数列へ移します。

<!-- formal-statement-start -->
> **定義（概収束）**  
> 同一の確率空間上の確率変数列 $X_1,X_2,\ldots$ と確率変数 $X$ に対して

$$
P\{\omega:X_n(\omega)\to X(\omega)\}=1
$$

> が成り立つとき、$X_n$ は $X$ へ**概収束**するといい、

$$
\boxed{X_n\xrightarrow{a.s.}X}
$$

> と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p4-as-convergence -->
### 8.1 例：全ての標本点で収束する列

$$
X_n(\omega)=\frac1n,
\qquad
X(\omega)=0
$$

とすると、全ての $\omega$ で $X_n(\omega)\to0$ です。従って

$$
P\{\omega:X_n(\omega)\to0\}=P(\Omega)=1,
$$

よって $X_n\xrightarrow{a.s.}0$ です。
<!-- definition-example-end -->

<a id="def-f0-00p4-probability-convergence"></a>

<!-- formal-statement-start -->
> **定義（確率収束）**  
> 同一の確率空間上の確率変数列 $X_1,X_2,\ldots$ と確率変数 $X$ に対し、任意の $\varepsilon>0$ について

$$
P(|X_n-X|>\varepsilon)\to0
$$

> が成り立つとき、$X_n$ は $X$ へ**確率収束**するといい、

$$
\boxed{X_n\xrightarrow{p}X}
$$

> と書きます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p4-probability-convergence -->
### 8.2 例：まれに1になる確率変数

$X_n$ が

$$
P(X_n=1)=\frac1n,
\qquad
P(X_n=0)=1-\frac1n
$$

を満たすとします。$0<\varepsilon<1$ なら

$$
P(|X_n|>\varepsilon)
=P(X_n=1)
=\frac1n\to0.
$$

$\varepsilon\ge1$ なら左辺は0です。従って任意の $\varepsilon>0$ で定義を満たし、

$$
X_n\xrightarrow{p}0.
$$
<!-- definition-example-end -->

概収束は一つ一つの標本経路の最終的な挙動を見ます。確率収束は各 $n$ で「大きな誤差が出る確率」を見ます。この差を limsup と Borel--Cantelli が橋渡しします。

---

<a id="prop-f0-00p4-as-limsup-characterization"></a>

## 9. 概収束を「大誤差が無限回起こらない」と読む

<!-- formal-statement-start -->
> **命題（概収束の limsup による特徴付け）**  
> 同一の確率空間上の確率変数列 $X_1,X_2,\ldots$ と確率変数 $X$ に対して、各 $k\ge1$ で

$$
A_n^{(k)}
:=
\{|X_n-X|>1/k\}
$$

> と置きます。このとき

$$
\boxed{
X_n\xrightarrow{a.s.}X
\iff
P\left(\limsup_{n\to\infty}A_n^{(k)}\right)=0
\quad(\forall k\ge1)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

$\limsup_nA_n^{(k)}$ は「誤差が $1/k$ を超えることが無限回起こる」事象です。収束する経路では、固定した誤差幅を超えるのは有限回だけです。逆に全ての $1/k$ について大誤差が有限回なら、任意の $\varepsilon>0$ より小さい $1/k$ を選んで通常の収束を復元できます。

<!-- proof-start -->
### 証明

まず $X_n\xrightarrow{a.s.}X$ とします。確率1の集合

$$
C:=\{\omega:X_n(\omega)\to X(\omega)\}
$$

を取ります。$\omega\in C$ と $k\ge1$ を固定すると、収束の定義からある $N=N(\omega,k)$ が存在して

$$
|X_n(\omega)-X(\omega)|\le\frac1k
\qquad(\forall n\ge N).
$$

従って $\omega$ は $A_n^{(k)}$ に有限回しか入りません。つまり

$$
\omega\notin\limsup_nA_n^{(k)}.
$$

よって

$$
C\subseteq\left(\limsup_nA_n^{(k)}\right)^c.
$$

$P(C)=1$ だから

$$
P(\limsup_nA_n^{(k)})=0.
$$

逆に、全ての $k\ge1$ で

$$
P(\limsup_nA_n^{(k)})=0
$$

とします。各 $k$ について

$$
C_k:=\left(\limsup_nA_n^{(k)}\right)^c
$$

と置けば $P(C_k)=1$ です。可算個の確率1事象の共通部分

$$
C:=\bigcap_{k=1}^{\infty}C_k
$$

も $P(C)=1$ を満たします。

$\omega\in C$ を固定します。任意の $\varepsilon>0$ に対して $1/k<\varepsilon$ となる $k$ を選びます。$\omega\in C_k$ なので $A_n^{(k)}$ は有限回しか起こらず、ある $N$ が存在して

$$
|X_n(\omega)-X(\omega)|\le\frac1k<\varepsilon
\qquad(\forall n\ge N).
$$

従って $X_n(\omega)\to X(\omega)$ です。$P(C)=1$ なので

$$
X_n\xrightarrow{a.s.}X.
$$
<!-- proof-end -->

### 9.1 確率和が有限なら概収束

特に全ての $k\ge1$ について

$$
\sum_{n=1}^{\infty}
P(|X_n-X|>1/k)<\infty
$$

なら、[Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)により

$$
P\left(\{|X_n-X|>1/k\}\ \mathrm{i.o.}\right)=0
$$

です。[概収束の limsup による特徴付け](#prop-f0-00p4-as-limsup-characterization)から

$$
X_n\xrightarrow{a.s.}X.
$$

---

<a id="thm-f0-00p4-as-implies-probability"></a>

## 10. 概収束なら確率収束

<!-- formal-statement-start -->
> **定理（概収束は確率収束を含意する）**  
> 同一の確率空間上の確率変数列 $X_1,X_2,\ldots$ と確率変数 $X$ が

$$
X_n\xrightarrow{a.s.}X
$$

> を満たすなら

$$
\boxed{X_n\xrightarrow{p}X}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

固定した $\varepsilon>0$ に対し

$$
A_n:=\{|X_n-X|>\varepsilon\}
$$

とします。概収束なら $A_n$ は無限回起こりません。tail union

$$
B_m:=\bigcup_{n\ge m}A_n
$$

は $m$ とともに減少し、その共通部分が $\limsup A_n$ です。[確率測度の上からの連続性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-continuity-from-above)を使って $P(B_m)\to0$ とします。

<!-- proof-start -->
### 証明

固定した $\varepsilon>0$ に対し

$$
A_n:=\{|X_n-X|>\varepsilon\}
$$

と置きます。概収束から、確率1で $|X_n-X|>\varepsilon$ は有限回しか起こりません。従って

$$
P(\limsup_nA_n)=0.
$$

さらに

$$
B_m:=\bigcup_{n\ge m}A_n
$$

と置くと

$$
B_1\supseteq B_2\supseteq\cdots
$$

かつ

$$
\bigcap_{m=1}^{\infty}B_m
=
\limsup_{n\to\infty}A_n.
$$

[確率測度の上からの連続性](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-continuity-from-above)より

$$
P(B_m)
\to
P(\limsup_nA_n)
=0.
$$

一方 $A_m\subseteq B_m$ なので

$$
0\le
P(|X_m-X|>\varepsilon)
=P(A_m)
\le P(B_m)\to0.
$$

任意の $\varepsilon>0$ で成り立つため

$$
X_n\xrightarrow{p}X.
$$
<!-- proof-end -->

逆向きは一般には成り立ちません。第13節で具体的に壊します。

---

<a id="thm-f0-00p4-lp-implies-probability"></a>

## 11. $L^p$ 収束なら確率収束

<!-- formal-statement-start -->
> **定理（$L^p$ 収束は確率収束を含意する）**  
> $p\ge1$ とし、同一の確率空間上の確率変数 $X_n,X\in L^p$ が

$$
E|X_n-X|^p\to0
$$

> を満たすとします。このとき

$$
\boxed{X_n\xrightarrow{p}X}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

誤差の $p$ 乗を非負確率変数として [Markov不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)へ入れます。

<!-- proof-start -->
### 証明

任意の $\varepsilon>0$ に対し、非負確率変数 $|X_n-X|^p$ へ [Markov不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)を適用すると

$$
\begin{aligned}
P(|X_n-X|>\varepsilon)
&=P(|X_n-X|^p>\varepsilon^p)\\
&\le
\frac{E|X_n-X|^p}{\varepsilon^p}.
\end{aligned}
$$

仮定より分子は0へ収束するので

$$
P(|X_n-X|>\varepsilon)\to0.
$$

従って $X_n\xrightarrow{p}X$ です。
<!-- proof-end -->

---

<a id="thm-f0-00p4-probability-subsequence-as"></a>

## 12. 確率収束から概収束部分列を取れる

<!-- formal-statement-start -->
> **定理（確率収束から概収束部分列）**  
> 同一の確率空間上の確率変数列 $X_1,X_2,\ldots$ と確率変数 $X$ が

$$
X_n\xrightarrow{p}X
$$

> を満たすなら、ある部分列 $(X_{n_k})$ が存在して

$$
\boxed{X_{n_k}\xrightarrow{a.s.}X}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

確率収束から、$k$ 番目の部分列では誤差確率を $2^{-k}$ 以下にできるよう添字を選びます。すると誤差確率の総和が有限になるので、[Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)が概収束へ引き上げます。

<!-- proof-start -->
### 証明

確率収束より、各 $k\ge1$ に対して

$$
P(|X_n-X|>2^{-k})\to0
\qquad(n\to\infty).
$$

従って、$n_1<n_2<\cdots$ を再帰的に選び

$$
P(|X_{n_k}-X|>2^{-k})\le2^{-k}
$$

とできます。

$$
A_k:=\{|X_{n_k}-X|>2^{-k}\}
$$

と置けば

$$
\sum_{k=1}^{\infty}P(A_k)
\le
\sum_{k=1}^{\infty}2^{-k}
<\infty.
$$

[Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)より

$$
P(A_k\ \mathrm{i.o.})=0.
$$

従って確率1で、ある $K(\omega)$ が存在して全ての $k\ge K(\omega)$ で

$$
|X_{n_k}(\omega)-X(\omega)|\le2^{-k}.
$$

右辺は0へ収束するため

$$
X_{n_k}(\omega)\to X(\omega)
$$

です。よって

$$
X_{n_k}\xrightarrow{a.s.}X.
$$
<!-- proof-end -->

この定理は次の [F0-00P4A 一様可積分性・Vitali](../F0_00P4A_一様可積分性_Vitali/index.md) でも使います。

---

## 13. 確率収束しても概収束しないことがある

独立な事象列 $(A_n)$ が

$$
P(A_n)=\frac1n
$$

を満たすとし、

$$
X_n:=\boldsymbol{1}_{A_n}
$$

と置きます。

$0<\varepsilon<1$ なら

$$
P(|X_n|>\varepsilon)
=P(A_n)
=\frac1n\to0,
$$

従って

$$
X_n\xrightarrow{p}0.
$$

一方

$$
\sum_{n=1}^{\infty}P(A_n)
=
\sum_{n=1}^{\infty}\frac1n
=
\infty.
$$

$(A_n)$ は独立なので、[Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)より

$$
P(A_n\ \mathrm{i.o.})=1.
$$

つまり確率1で $X_n=1$ が無限回現れます。従って $X_n(\omega)$ は0へ収束せず、

$$
X_n\not\xrightarrow{a.s.}0.
$$

収束関係をまとめると

```text
a.s. ─────────────→ probability
                       ↑
L^p ──────────────────┘

probability ──→ a.s. convergent subsequence
```

であり、`probability ⇒ a.s.` は一般には成り立ちません。

---

## 14. 演習

### F0-00P4-A01 limsup と liminf を直接計算する

- Level: A
- 目安時間: 10分

標本空間を $\Omega=\{1,2,3\}$ とし、

$$
A_n=
\begin{cases}
\{1,2\},&3\mid n,\\
\{1\},&3\nmid n
\end{cases}
$$

とする。$\limsup_nA_n$ と $\liminf_nA_n$ を求め、それぞれ「無限回」「eventually」の意味と対応させよ。

<!-- solution-start -->
#### 詳細解答

点ごとに $A_n$ への所属を調べます。

- $1$ は全ての $n$ で $A_n$ に入ります。従って無限回入るだけでなく、最初からずっと入っています。
- $2$ は $3,6,9,\ldots$ のときだけ $A_n$ に入ります。従って無限回入りますが、どの番号以降も常に入るわけではありません。
- $3$ は一度も $A_n$ に入りません。

したがって

$$
\limsup_{n\to\infty}A_n=\{1,2\},
\qquad
\liminf_{n\to\infty}A_n=\{1\}.
$$

$2$ は「無限回」には該当しますが「eventually」には該当しません。従って両概念の違いがこの1点に現れています。
<!-- solution-end -->

### F0-00P4-A02 「有限回」と補集合の liminf

- Level: A
- 目安時間: 10分

事象列 $(A_n)$ に対して

$$
\{A_n\text{ は有限回しか起こらない}\}
=
\liminf_{n\to\infty}A_n^c
$$

を、量化記号を使って示せ。

<!-- solution-start -->
#### 詳細解答

「$A_n$ が有限回しか起こらない」とは、ある番号 $m$ が存在し、それ以降は一度も $A_n$ が起こらないことです。標本点 $\omega$ ごとに書けば

$$
\exists m\ \forall n\ge m:\ \omega\notin A_n.
$$

補集合を使うと

$$
\exists m\ \forall n\ge m:\ \omega\in A_n^c.
$$

一方、下極限の定義は

$$
\omega\in\liminf_nA_n^c
\iff
\exists m\ \forall n\ge m:\ \omega\in A_n^c.
$$

です。従って両者は同じ標本点を含み、

$$
\{A_n\text{ は有限回しか起こらない}\}
=
\liminf_nA_n^c.
$$
<!-- solution-end -->

### F0-00P4-A03 i.o. が末尾事象であることを確認する

- Level: A
- 目安時間: 10分

事象列 $(A_n)$ に対して

$$
T:=\{A_n\ \mathrm{i.o.}\}
$$

と置く。任意の $m\ge1$ について

$$
T\in\sigma(A_m,A_{m+1},\ldots)
$$

を示し、$T$ が末尾事象であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$i.o.$ の定義から

$$
T
=
\bigcap_{r=1}^{\infty}\bigcup_{n\ge r}A_n.
$$

有限個の最初の事象を捨てても「無限回起こるか」は変わらないので、任意の固定した $m$ に対して

$$
T
=
\bigcap_{r=m}^{\infty}\bigcup_{n\ge r}A_n.
$$

右辺に現れる事象は全て $A_m,A_{m+1},\ldots$ なので

$$
T\in\sigma(A_m,A_{m+1},\ldots).
$$

これは全ての $m$ で成り立つため

$$
T\in
\bigcap_{m=1}^{\infty}\sigma(A_m,A_{m+1},\ldots)
=
\mathcal T_A.
$$

従って $T$ は末尾事象です。
<!-- solution-end -->

### F0-00P4-A04 Borel--Cantelli 第1補題を誤差事象へ使う

- Level: A
- 目安時間: 12分

確率変数列 $(X_n)$ と確率変数 $X$ が、全ての $k\ge1$ について

$$
\sum_{n=1}^{\infty}P(|X_n-X|>1/k)<\infty
$$

を満たすとする。$X_n\xrightarrow{a.s.}X$ を示せ。

<!-- solution-start -->
#### 詳細解答

各 $k\ge1$ を固定して

$$
A_n^{(k)}:=\{|X_n-X|>1/k\}
$$

と置きます。仮定から

$$
\sum_{n=1}^{\infty}P(A_n^{(k)})<\infty.
$$

従って [Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)より

$$
P(A_n^{(k)}\ \mathrm{i.o.})=0.
$$

つまり各 $k$ について、確率1で誤差が $1/k$ を超えるのは有限回だけです。これらの確率1事象を $k$ について可算共通部分しても確率1です。

その集合上では、任意の $\varepsilon>0$ に対して $1/k<\varepsilon$ となる $k$ を選ぶと、十分大きい $n$ で

$$
|X_n-X|\le\frac1k<\varepsilon.
$$

従って $X_n\to X$ であり、

$$
X_n\xrightarrow{a.s.}X.
$$
<!-- solution-end -->

### F0-00P4-B01 0--1 則と Borel--Cantelli の役割を分ける

- Level: B
- 目安時間: 18分

独立な公平コインを無限回投げ、$H_n$ を「$n$ 回目が表」の事象とする。次を示せ。

1. $T=\{H_n\ \mathrm{i.o.}\}$ は末尾事象である。
2. [Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)だけから $P(T)\in\{0,1\}$ を導け。
3. [Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)を用いて実際には $P(T)=1$ と決定せよ。

<!-- solution-start -->
#### 詳細解答

**1. 末尾事象であること。**  
任意の $m$ に対して

$$
T
=
\bigcap_{r=m}^{\infty}\bigcup_{n\ge r}H_n.
$$

右辺は $H_m,H_{m+1},\ldots$ だけから作られるので

$$
T\in\sigma(H_m,H_{m+1},\ldots)
\qquad(\forall m).
$$

従って $T$ は末尾 σ 代数に属します。

**2. 0--1 則。**  
コイン投げは独立なので、[Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)を適用でき、

$$
P(T)\in\{0,1\}
$$

です。ただし、この段階では 0 と 1 のどちらかまでは決まりません。

**3. 第2補題。**  
各 $n$ で

$$
P(H_n)=\frac12,
$$

したがって

$$
\sum_{n=1}^{\infty}P(H_n)
=\sum_{n=1}^{\infty}\frac12
=\infty.
$$

$(H_n)$ は独立なので [Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)より

$$
P(H_n\ \mathrm{i.o.})=1.
$$

従って $P(T)=1$ です。0--1 則が「候補は0か1」と絞り、第2補題が「1」と判定しています。
<!-- solution-end -->

### F0-00P4-B02 確率収束から概収束部分列を構成する

- Level: B
- 目安時間: 18分

$X_n\xrightarrow{p}X$ とする。部分列 $(X_{n_k})$ を

$$
P(|X_{n_k}-X|>2^{-k})\le2^{-k}
$$

となるように選び、$X_{n_k}\xrightarrow{a.s.}X$ を示せ。

<!-- solution-start -->
#### 詳細解答

確率収束から、固定した $k$ に対して

$$
P(|X_n-X|>2^{-k})\to0
$$

です。従ってまず $n_1$ を十分大きく選んで

$$
P(|X_{n_1}-X|>2^{-1})\le2^{-1}
$$

とできます。$n_1<\cdots<n_{k-1}$ を選んだと仮定すると、再び確率収束から $n_k>n_{k-1}$ を十分大きく選び

$$
P(|X_{n_k}-X|>2^{-k})\le2^{-k}
$$

とできます。

$$
A_k:=\{|X_{n_k}-X|>2^{-k}\}
$$

と置くと

$$
\sum_{k=1}^{\infty}P(A_k)
\le
\sum_{k=1}^{\infty}2^{-k}
=1<\infty.
$$

[Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)より

$$
P(A_k\ \mathrm{i.o.})=0.
$$

従って確率1で、十分大きい $k$ について

$$
|X_{n_k}-X|\le2^{-k}.
$$

右辺が0へ収束するので

$$
X_{n_k}\xrightarrow{a.s.}X.
$$
<!-- solution-end -->

### F0-00P4-B03 確率収束するが概収束しない列

- Level: B
- 目安時間: 18分

独立な事象列 $(A_n)$ が

$$
P(A_n)=\frac1n
$$

を満たすとし、$X_n:=\boldsymbol{1}_{A_n}$ と置く。$X_n\xrightarrow{p}0$ だが $X_n\not\xrightarrow{a.s.}0$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

まず確率収束を確認します。$0<\varepsilon<1$ なら

$$
\{|X_n|>\varepsilon\}=A_n
$$

なので

$$
P(|X_n|>\varepsilon)
=P(A_n)
=\frac1n\to0.
$$

$\varepsilon\ge1$ なら左辺は0です。従って

$$
X_n\xrightarrow{p}0.
$$

次に概収束を調べます。調和級数は発散するため

$$
\sum_{n=1}^{\infty}P(A_n)
=\sum_{n=1}^{\infty}\frac1n
=\infty.
$$

$(A_n)$ は独立なので [Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)から

$$
P(A_n\ \mathrm{i.o.})=1.
$$

従って確率1で $X_n=1$ が無限回現れます。もし $X_n(\omega)\to0$ なら、たとえば $\varepsilon=1/2$ に対して十分大きい $n$ では $X_n(\omega)=0$ でなければならず、1が無限回現れることと矛盾します。

よって

$$
X_n\not\xrightarrow{a.s.}0.
$$
<!-- solution-end -->

### F0-00P4-C01 $p_n=1/n$ と $p_n=1/n^2$ を一つの枠組みで比較する

- Level: C
- 目安時間: 30分

独立な事象列 $(A_n)$ に対し

$$
P(A_n)=p_n,
\qquad
X_n:=\boldsymbol{1}_{A_n}
$$

とする。次に答えよ。

1. $\{A_n\ \mathrm{i.o.}\}$ が末尾事象であることを示せ。
2. $p_n=1/n^2$ のとき、$A_n$ が無限回起こる確率を求めよ。
3. $p_n=1/n$ のとき、$A_n$ が無限回起こる確率を求めよ。
4. それぞれの場合について $X_n\xrightarrow{p}0$ が成り立つか判定せよ。
5. それぞれの場合について $X_n\xrightarrow{a.s.}0$ が成り立つか判定し、2・3の結論との対応を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 末尾事象。**  
任意の $m$ に対して

$$
\{A_n\ \mathrm{i.o.}\}
=
\bigcap_{r=m}^{\infty}\bigcup_{n\ge r}A_n.
$$

右辺は $A_m,A_{m+1},\ldots$ だけで決まるため

$$
\{A_n\ \mathrm{i.o.}\}
\in\sigma(A_m,A_{m+1},\ldots)
$$

です。全ての $m$ で成り立つので末尾事象です。独立列なので [Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)から、この事象の確率は0か1のどちらかです。

**2. $p_n=1/n^2$。**  

$$
\sum_{n=1}^{\infty}P(A_n)
=
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty.
$$

[Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)より

$$
P(A_n\ \mathrm{i.o.})=0.
$$

従って $A_n$ は確率1で有限回しか起こりません。

**3. $p_n=1/n$。**  

$$
\sum_{n=1}^{\infty}P(A_n)
=
\sum_{n=1}^{\infty}\frac1n
=\infty.
$$

さらに $(A_n)$ は独立なので [Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)より

$$
P(A_n\ \mathrm{i.o.})=1.
$$

従って確率1で無限回起こります。

**4. 確率収束。**  
どちらの場合も $p_n\to0$ です。$0<\varepsilon<1$ なら

$$
P(|X_n|>\varepsilon)
=P(X_n=1)
=P(A_n)
=p_n\to0.
$$

$\varepsilon\ge1$ なら左辺は0なので、両方の場合で

$$
X_n\xrightarrow{p}0.
$$

**5. 概収束。**  
$X_n=\boldsymbol{1}_{A_n}$ は0か1しか取りません。従って

$$
X_n(\omega)\to0
$$

であることは、$X_n(\omega)=1$、すなわち $\omega\in A_n$ が有限回しか起こらないことと同値です。

$p_n=1/n^2$ では 2 より $A_n$ は確率1で有限回しか起こらないので

$$
X_n\xrightarrow{a.s.}0.
$$

一方 $p_n=1/n$ では 3 より $A_n$ が確率1で無限回起こるため

$$
X_n\not\xrightarrow{a.s.}0.
$$

この比較は、どちらも $p_n\to0$ なので確率収束はする一方、概収束には「各時点の確率が0へ行く」だけでなく、経路上で大誤差が無限回起こるかどうかの制御が必要であることを示しています。
<!-- solution-end -->

---

## 章末チェック

- $\limsup A_n$ と $\liminf A_n$ を量化記号と経路上の意味の両方で説明できる。
- `i.o.` が infinitely often の略であり、$\limsup A_n$ と同じ事象を表すと説明できる。
- $(\limsup A_n)^c=\liminf A_n^c$ と $(\liminf A_n)^c=\limsup A_n^c$ を証明できる。
- 独立な事象列と末尾 σ 代数・末尾事象を定義できる。
- $\{A_n\ \mathrm{i.o.}\}$ と $\liminf A_n$ が末尾事象であることを確認できる。
- 独立列のブロック独立性を [π--λ定理](../F0_00D3A_pi_lambda_Dynkin/index.md#thm-f0-00d3a-pi-lambda)から証明できる。
- [Kolmogorov の 0--1 則](#thm-f0-00p4-kolmogorov-zero-one)を「末尾事象が自分自身と独立になる」まで追って証明できる。
- [Borel--Cantelli 第1補題](#thm-f0-00p4-borel-cantelli-1)と[Borel--Cantelli 第2補題](#thm-f0-00p4-borel-cantelli-2)の仮定の違いを説明できる。
- 0--1 則と Borel--Cantelli の役割の違いを説明できる。
- 概収束を誤差事象の limsup で特徴付けられる。
- 概収束 $\Rightarrow$ 確率収束、$L^p$ 収束 $\Rightarrow$ 確率収束を証明できる。
- 確率収束列から概収束部分列を抽出できる。
- 確率収束が概収束を一般には含意しない反例を説明できる。

次は [F0-00P4A 一様可積分性・Vitali](../F0_00P4A_一様可積分性_Vitali/index.md) で、確率収束から $L^1$ 収束へ進むために不足する tail control を扱います。
