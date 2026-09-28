# MICRO11 不確実性下の選択・期待効用

<!-- definition-example-audit: strict -->

MICRO1 では、消費束のような確実な選択肢の集合上で選好を考え、効用関数はその順位を実数で表す道具だと学びました。

不確実性が入ると、比較対象そのものが変わります。たとえば「100円を確実にもらう」と「半分の確率で400円、半分の確率で0円」は、どちらも一つの選択肢です。しかし後者は一つの確実な結果ではなく、複数の結果に確率を割り当てた選択肢です。

この章では、このような選択肢を **くじ** として扱います。

中心となる問いは、

$$
\boxed{
\text{くじの順位を、なぜ結果効用の確率加重平均で表してよいのか}
}
$$

です。

ここで確率加重平均の形を最初から仮定することはしません。有限個の結果を持つくじについて、選択肢を一貫して比較できること、確率混合を連続的に変えられること、共通部分を同じ比率で加えても元の順位が保たれることを順に定式化し、その条件から確率加重平均による順位表現を導きます。

本章では、

$$
\text{結果への確率割当}
\longrightarrow
\text{二段階の確率を最終結果へまとめる}
\longrightarrow
\text{二つの選択肢を確率的に混ぜる}
\longrightarrow
\text{共通部分を加えた比較}
\longrightarrow
\text{確率加重平均による順位表現}
$$

を、章後半の表現定理の証明まで閉じます。

---

## 1. 確実な結果ではなく「結果の確率分布」を選ぶ

結果の有限集合を

$$
Z=\{z_1,\dots,z_n\}
$$

とします。

たとえば

$$
Z=\{0\text{円},100\text{円},400\text{円}\}
$$

なら、実現し得る最終的な賞金が三つあるという意味です。

<a id="def-micro11-simple-lottery"></a>

<!-- formal-statement-start -->
> **定義（単純なくじ）**  
> 有限な結果集合
>
$$
Z=\{z_1,\dots,z_n\}
$$
>
> に対し、各結果 $z_i$ に確率 $p_i$ を割り当てるベクトル
>
$$
p=(p_1,\dots,p_n)
$$
>
> が
>
$$
p_i\ge0,
\qquad
\sum_{i=1}^n p_i=1
$$
>
> を満たすとき、$p$ を $Z$ 上の **単純なくじ**という。
>
> 単純なくじ全体を
>
$$
\Delta(Z)
=
\left\{
p\in\mathbb R_+^n:
\sum_{i=1}^n p_i=1
\right\}
$$
>
> と書く。
>
> 結果 $z_i$ が確実に起こるくじを
>
$$
\delta_i
=
(0,\dots,0,1,0,\dots,0)
$$
>
> と書き、**退化くじ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-simple-lottery -->
**定義の確認**：三つの賞金を持つくじ

$$
Z=\{0,100,400\}
$$

とし、

$$
p=
\left(
\frac14,
\frac12,
\frac14
\right)
$$

とします。

成分は全て非負で、

$$
\frac14+\frac12+\frac14=1
$$

なので、$p$ は単純なくじです。

このくじでは、0円が確率 $1/4$、100円が確率 $1/2$、400円が確率 $1/4$ で実現します。

また

$$
\delta_2=(0,1,0)
$$

は100円を確実にもらう選択肢です。したがって、確実な選択肢もくじの特別な場合として同じ集合 $\Delta(Z)$ の中で比較できます。
<!-- definition-example-end -->

MICRO1 では選好関係を一般の選択集合 $X$ 上で考えました。本章では選択集合そのものを

$$
X=\Delta(Z)
$$

へ取り替えます。

したがって

$$
p\succeq q
$$

は、「くじ $p$ をくじ $q$ 以上に望む」という意味です。

---

## 2. 二段階のくじを最終結果の確率へまとめる

現実の不確実な選択は、しばしば二段階以上です。

たとえば最初にコインを投げ、表ならくじ $p$、裏ならくじ $q$ を実行する場合、最終結果の確率は二段階をまとめて計算できます。

<a id="def-micro11-compound-reduction"></a>

<!-- formal-statement-start -->
> **定義（複合くじの縮約）**  
> $Z=\{z_1,\dots,z_n\}$ 上の単純なくじ
>
$$
p^1,\dots,p^m\in\Delta(Z)
$$
>
> と、それらを選ぶ第一段階の確率
>
$$
\mu_k\ge0,
\qquad
\sum_{k=1}^m\mu_k=1
$$
>
> を考える。
>
> まず確率 $\mu_k$ でくじ $p^k$ を選び、次に $p^k$ に従って最終結果を決める仕組みを **複合くじ**という。
>
> 最終結果 $z_i$ の総確率を
>
$$
\bar p_i
=
\sum_{k=1}^m
\mu_k p_i^k
$$
>
> とした
>
$$
\bar p=(\bar p_1,\dots,\bar p_n)
$$
>
> を、その **複合くじの縮約**という。
>
> 本章では、複合くじは **複合くじの縮約** を行った後の単純なくじだけで評価されるものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-compound-reduction -->
**定義の確認**：二段階くじを一つの確率分布へ直す

結果を

$$
Z=\{0,100,200\}
$$

とします。

第一段階で確率 $1/2$ ずつ

$$
p^1=
\left(
\frac12,
\frac12,
0
\right),
\qquad
p^2=
\left(
0,
\frac12,
\frac12
\right)
$$

のどちらかを選ぶとします。

0円の最終確率は

$$
\bar p_1
=
\frac12\cdot\frac12
+
\frac12\cdot0
=
\frac14.
$$

100円の最終確率は

$$
\bar p_2
=
\frac12\cdot\frac12
+
\frac12\cdot\frac12
=
\frac12.
$$

200円の最終確率は

$$
\bar p_3
=
\frac12\cdot0
+
\frac12\cdot\frac12
=
\frac14.
$$

従って最終結果の確率をまとめると

$$
\boxed{
\bar p=
\left(
\frac14,
\frac12,
\frac14
\right)
}
$$

です。

途中でどのくじを選んだかではなく、最終的に各結果がどの確率で起こるかへ圧縮しました。
<!-- definition-example-end -->

**複合くじの縮約**は後の証明で重要です。

「確率 $p_i$ で確実結果 $z_i$ を選ぶ」という複合くじは、最終結果の確率をまとめれば元の単純なくじ

$$
p=(p_1,\dots,p_n)
$$

そのものです。

---

## 3. 二つのくじを同じ比率で混ぜる

後で共通部分を加えた比較条件を述べるには、「二つのくじを同じ第三のくじと混ぜる」という操作が必要です。

<a id="def-micro11-mixture"></a>

<!-- formal-statement-start -->
> **定義（くじの混合）**  
> 二つの単純なくじ
>
$$
p,q\in\Delta(Z)
$$
>
> と
>
$$
\alpha\in[0,1]
$$
>
> に対し、
>
$$
\alpha p+(1-\alpha)q
$$
>
> を、確率 $\alpha$ で $p$ を選び、確率 $1-\alpha$ で $q$ を選ぶ複合くじの縮約とする。
>
> 成分ごとには
>
$$
\bigl(\alpha p+(1-\alpha)q\bigr)_i
=
\alpha p_i+(1-\alpha)q_i
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-mixture -->
**定義の確認**：確実な100円と二点くじを半分ずつ混ぜる

結果を

$$
Z=\{0,100,200\}
$$

とし、

$$
p=(0,1,0),
\qquad
q=
\left(
\frac12,
0,
\frac12
\right)
$$

とします。

$\alpha=1/2$ で混ぜると、

$$
\frac12p+\frac12q
=
\frac12(0,1,0)
+
\frac12
\left(
\frac12,0,\frac12
\right).
$$

各成分を計算して、

$$
\boxed{
\frac12p+\frac12q
=
\left(
\frac14,
\frac12,
\frac14
\right)
}
$$

です。

これは「まず $p$ か $q$ を半分ずつ選ぶ」という二段階構造を最終結果の確率へまとめたベクトルです。
<!-- definition-example-end -->

$\Delta(Z)$ は確率単体なので、くじの混合はその中の線分を動く操作でもあります。

---

## 4. 完備性・推移性に二つの公理を加える

[MICRO1 の完備性・推移性](../MICRO1/index.md#def-micro1-complete-transitive)は、そのままくじ上の選好にも適用します。

つまり任意の $p,q,r\in\Delta(Z)$ について、

- $p\succeq q$ または $q\succeq p$
- $p\succeq q$ かつ $q\succeq r$ なら $p\succeq r$

を要求します。

確率加重平均による表現を導くには、さらに「混合比を少し変えても順位が突然飛ばない」ことと、「共通部分を同じように混ぜても元の順位を保つ」ことが必要です。

### 4.1 混合比を連続的に変えたときの条件

<a id="def-micro11-mixture-continuity"></a>

<!-- formal-statement-start -->
> **定義（混合連続性）**  
> $\Delta(Z)$ 上の選好 $\succeq$ が **混合連続** であるとは、任意の
>
$$
p,q,r\in\Delta(Z)
$$
>
> に対し、
>
$$
A
=
\{
\alpha\in[0,1]:
\alpha p+(1-\alpha)q\succeq r
\}
$$
>
> と
>
$$
B
=
\{
\alpha\in[0,1]:
r\succeq\alpha p+(1-\alpha)q
\}
$$
>
> がともに $[0,1]$ の閉集合であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-mixture-continuity -->
**定義の確認**：確率加重得点で順位を付ける場合

三結果に数値

$$
a_1=0,
\qquad
a_2=1,
\qquad
a_3=3
$$

を割り当て、くじ $p$ の得点を

$$
V(p)=p_2+3p_3
$$

とし、

$$
p\succeq q
\iff
V(p)\ge V(q)
$$

とします。

固定した $p,q,r$ に対して、

$$
V(\alpha p+(1-\alpha)q)
=
\alpha V(p)+(1-\alpha)V(q)
$$

は $\alpha$ の連続関数です。

したがって

$$
A
=
\{
\alpha:
V(\alpha p+(1-\alpha)q)\ge V(r)
\}
$$

と

$$
B
=
\{
\alpha:
V(r)\ge V(\alpha p+(1-\alpha)q)
\}
$$

は閉集合になります。

この選好は混合連続です。
<!-- definition-example-end -->

この条件は後で、「最良結果と最悪結果を何対何で混ぜれば、ある確実結果とちょうど無差別になるか」を保証します。

### 4.2 共通部分を混ぜても順位を保つ条件

<a id="def-micro11-independence"></a>

<!-- formal-statement-start -->
> **定義（独立性公理）**  
> $\Delta(Z)$ 上の選好 $\succeq$ が **独立性公理**を満たすとは、任意の
>
$$
p,q,r\in\Delta(Z)
$$
>
> と任意の
>
$$
\alpha\in(0,1)
$$
>
> に対して、
>
$$
p\succeq q
$$
>
> であることと
>
$$
\alpha p+(1-\alpha)r
\succeq
\alpha q+(1-\alpha)r
$$
>
> であることが同値であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-independence -->
**定義の確認**：共通部分を混ぜても期待得点の差は同じ符号を持つ

先ほどと同じ

$$
V(p)=p_2+3p_3
$$

で順位を付けます。

$p\succeq q$、すなわち

$$
V(p)-V(q)\ge0
$$

とします。

任意の第三くじ $r$ と $\alpha\in(0,1)$ について、

$$
\begin{aligned}
&
V\bigl(\alpha p+(1-\alpha)r\bigr)
-
V\bigl(\alpha q+(1-\alpha)r\bigr)
\\
&=
\alpha V(p)+(1-\alpha)V(r)
-
\alpha V(q)-(1-\alpha)V(r)
\\
&=
\alpha\bigl(V(p)-V(q)\bigr).
\end{aligned}
$$

$\alpha>0$ なので、右辺の符号は $V(p)-V(q)$ と同じです。

従って、共通の $r$ を同じ比率で混ぜても順位は変わりません。
<!-- definition-example-end -->

独立性の核心は、両側に同じ不確実な共通部分を付け加えたとき、その共通部分は比較から相殺されるということです。

これは強い条件です。実際の人間の選択が常に満たすと仮定するのではなく、**この公理を満たす選好が期待効用で表せる**という表現定理として読むのが重要です。

---

## 5. 期待効用とは「結果に数値を付け、その確率平均でくじを比べる」こと

<a id="def-micro11-expected-utility"></a>

<!-- formal-statement-start -->
> **定義（期待効用表現）**  
> 有限な結果集合
>
$$
Z=\{z_1,\dots,z_n\}
$$
>
> 上のくじの選好 $\succeq$ を考える。
>
> 結果ごとの実数値
>
$$
u:Z\to\mathbb R
$$
>
> が存在し、任意の
>
$$
p,q\in\Delta(Z)
$$
>
> について
>
$$
p\succeq q
\iff
\sum_{i=1}^n p_i u(z_i)
\ge
\sum_{i=1}^n q_i u(z_i)
$$
>
> が成り立つとき、$u$ は $\succeq$ の **期待効用表現**を与えるという。
>
> くじ $p$ の数値
>
$$
U(p)
=
\sum_{i=1}^n p_i u(z_i)
$$
>
> を、その表現における期待効用という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-expected-utility -->
**定義の確認**：賞金そのものではない数値でくじを評価する

結果を

$$
Z=\{0,100,400\}
$$

とし、結果効用を

$$
u(0)=0,
\qquad
u(100)=1,
\qquad
u(400)=2
$$

とします。

くじ

$$
p=
\left(
\frac12,
0,
\frac12
\right)
$$

の期待効用は、

$$
U(p)
=
\frac12\cdot0
+
0\cdot1
+
\frac12\cdot2
=
1.
$$

一方、100円を確実にもらう退化くじ

$$
q=(0,1,0)
$$

の期待効用は、

$$
U(q)=1.
$$

したがってこの期待効用表現では

$$
p\sim q.
$$

しかし賞金額そのものの確率加重平均は、

$$
\frac12\cdot0
+
\frac12\cdot400
=
200,
$$

$$
1\cdot100
=
100
$$

で異なります。

期待効用は「賞金額の確率加重平均」と同じ概念ではありません。
<!-- definition-example-end -->

MICRO1 の通常の効用表現では、選好を保つ任意の狭義単調変換を施しても同じ選好を表せました。

期待効用ではそうではありません。

なぜなら非線形変換 $f$ について一般に

$$
f\left(
\sum_i p_i u(z_i)
\right)
\ne
\sum_i p_i f(u(z_i))
$$

だからです。

<a id="def-micro11-positive-affine"></a>

<!-- formal-statement-start -->
> **定義（正のアフィン変換）**  
> 結果集合 $Z$ 上の実数値関数
>
$$
u:Z\to\mathbb R
$$
>
> に対し、
>
$$
a>0,
\qquad
b\in\mathbb R
$$
>
> を固定して
>
$$
\tilde u(z)=a u(z)+b
\qquad
(\forall z\in Z)
$$
>
> と置く変換を **正のアフィン変換**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-positive-affine -->
**定義の確認**：結果効用の目盛りと原点を変える

三つの結果に

$$
u(z_1)=0,
\qquad
u(z_2)=1,
\qquad
u(z_3)=2
$$

を割り当て、$a=3$, $b=-5$ とします。

すると、

$$
\tilde u(z_1)=-5,
\qquad
\tilde u(z_2)=-2,
\qquad
\tilde u(z_3)=1.
$$

差は3倍され、全体が5だけ下へ移りますが、結果同士の大小順序は保たれます。
<!-- definition-example-end -->

期待効用表現で許される結果効用の変換は、後で示すようにこの正のアフィン変換に限られます。

---

## 6. 最良結果と最悪結果だけのくじを物差しにする

結果集合 $Z$ は有限です。

完備性と推移性により、退化くじ

$$
\delta_1,\dots,\delta_n
$$

の中から少なくとも一つの最良結果 $b$ と最悪結果 $w$ を選べます。

つまり、

$$
\delta_b\succeq\delta_i\succeq\delta_w
\qquad
(\forall i)
$$

です。

非自明な場合、

$$
\delta_b\succ\delta_w
$$

とします。

<a id="def-micro11-standard-lottery"></a>

<!-- formal-statement-start -->
> **定義（標準くじ）**  
> 有限結果集合 $Z$ 上の退化くじのうち、最良結果を $\delta_b$、最悪結果を $\delta_w$ とし、
>
$$
\delta_b\succ\delta_w
$$
>
> とする。
>
> $\alpha\in[0,1]$ に対し、
>
$$
L(\alpha)
=
\alpha\delta_b+(1-\alpha)\delta_w
$$
>
> を **標準くじ**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro11-standard-lottery -->
**定義の確認**：最良結果を確率 $3/4$ で得る標準くじ

$\alpha=3/4$ なら、

$$
L\left(\frac34\right)
=
\frac34\delta_b
+
\frac14\delta_w.
$$

したがって、最良結果が確率 $3/4$、最悪結果が確率 $1/4$ で起こり、それ以外の結果には確率0を割り当てる二点くじです。
<!-- definition-example-end -->

<a id="lem-micro11-standard-lottery"></a>

<!-- formal-statement-start -->
> **補題（標準くじの単調性）**  
> 有限結果集合 $Z$ 上のくじの選好 $\succeq$ が完備性・推移性・独立性公理を満たし、
>
$$
\delta_b\succ\delta_w
$$
>
> とする。
>
> 標準くじ
>
$$
L(\alpha)
=
\alpha\delta_b+(1-\alpha)\delta_w
$$
>
> に対して、
>
$$
\alpha>\beta
$$
>
> なら
>
$$
L(\alpha)\succ L(\beta)
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\beta<1$ とします。

$$
t
=
\frac{\alpha-\beta}{1-\beta}
$$

と置くと、$\alpha>\beta$ なので

$$
0<t\le1.
$$

直接計算すると、

$$
L(\alpha)
=
t\delta_b+(1-t)L(\beta).
$$

一方、

$$
L(\beta)
=
tL(\beta)+(1-t)L(\beta).
$$

$\beta<1$ なので、$L(\beta)$ は最悪結果を正の確率で含みます。

$\delta_b\succ\delta_w$ と独立性公理から、

$$
\delta_b\succ L(\beta).
$$

この二つを同じ $L(\beta)$ と比率 $t$ で混ぜると、

$$
t\delta_b+(1-t)L(\beta)
\succ
tL(\beta)+(1-t)L(\beta).
$$

従って、

$$
L(\alpha)\succ L(\beta).
$$

$\beta=1$ なら $\alpha>\beta$ は不可能なので、これで全てです。$\square$
<!-- proof-end -->

標準くじでは、最良結果の確率 $\alpha$ がそのまま一次元の物差しになります。

---

## 7. 無差別な選択肢は混合の中でも置き換えられる

後の表現定理の証明では、各確実結果を、それと無差別な標準くじへ一つずつ置き換えます。

<a id="lem-micro11-indifferent-substitution"></a>

<!-- formal-statement-start -->
> **補題（無差別なくじの混合置換）**  
> $\Delta(Z)$ 上の選好 $\succeq$ が独立性公理を満たすとする。
>
> $p\sim q$ なら、任意の
>
$$
r\in\Delta(Z),
\qquad
\alpha\in[0,1]
$$
>
> について
>
$$
\alpha p+(1-\alpha)r
\sim
\alpha q+(1-\alpha)r
$$
>
> である。
>
> したがって有限個のくじ
>
$$
p^1,\dots,p^m,
\qquad
q^1,\dots,q^m
$$
>
> が
>
$$
p^k\sim q^k
\qquad
(k=1,\dots,m)
$$
>
> を満たし、重み
>
$$
\lambda_k\ge0,
\qquad
\sum_{k=1}^m\lambda_k=1
$$
>
> が与えられたなら、
>
$$
\sum_{k=1}^m\lambda_kp^k
\sim
\sum_{k=1}^m\lambda_kq^k
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\sim q$ は

$$
p\succeq q
\quad\text{かつ}\quad
q\succeq p
$$

を意味します。

独立性公理をそれぞれの向きに適用すると、

$$
\alpha p+(1-\alpha)r
\succeq
\alpha q+(1-\alpha)r
$$

かつ

$$
\alpha q+(1-\alpha)r
\succeq
\alpha p+(1-\alpha)r.
$$

従って両者は無差別です。

有限個の混合については、この二項の置き換えを一つずつ反復します。

例えば最初の成分を置き換え、次に二番目を置き換える、という操作を有限回行えば、各段階で無差別が保たれます。

推移性により、最初と最後の混合も無差別です。$\square$
<!-- proof-end -->

この補題が、「各結果を同価値の標準くじへ置き換え、その後で全部まとめる」操作を正当化します。

---

## 8. 公理から確率加重平均表現を導く

<a id="thm-micro11-vnm"></a>

<!-- formal-statement-start -->
> **定理（von Neumann--Morgenstern の期待効用定理）**  
> 有限な結果集合
>
$$
Z=\{z_1,\dots,z_n\}
$$
>
> 上の単純なくじ全体 $\Delta(Z)$ に選好 $\succeq$ が定義されているとする。
>
> 次の二条件は同値である。
>
> 1. $\succeq$ は完備性・推移性・混合連続性・独立性公理を満たす。
> 2. ある関数
>
$$
u:Z\to\mathbb R
$$
>
> が存在し、任意の
>
$$
p,q\in\Delta(Z)
$$
>
> について
>
$$
p\succeq q
\iff
\sum_{i=1}^n p_i u(z_i)
\ge
\sum_{i=1}^n q_i u(z_i)
$$
>
> が成り立つ。
>
> さらに $u$ と $v$ がともにこの期待効用表現を与えるなら、ある
>
$$
a>0,
\qquad
b\in\mathbb R
$$
>
> が存在して
>
$$
v(z)
=
a u(z)+b
\qquad
(\forall z\in Z)
$$
>
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の確実結果から最良結果 $b$ と最悪結果 $w$ を選びます。

次に各結果 $z_i$ を、

$$
\delta_i
\sim
u_i\delta_b+(1-u_i)\delta_w
$$

となる一意な確率 $u_i\in[0,1]$ を各結果 $z_i$ に割り当てます。

すると任意のくじ

$$
p=(p_1,\dots,p_n)
$$

は、各確実結果 $z_i$ を確率 $p_i$ で選ぶ複合くじと見なせます。

各 $\delta_i$ を無差別な標準くじへ置き換えて最終結果の確率をまとめると、

$$
p
\sim
L\left(
\sum_i p_i u_i
\right).
$$

標準くじの順位は最良結果の確率だけで決まるので、

$$
p\succeq q
\iff
\sum_i p_i u_i
\ge
\sum_i q_i u_i.
$$

これが期待効用です。

逆向きは短く、期待効用が実数値の線形関数であることから四条件を直接確認できます。したがって定理は単なる十分条件ではなく、有限結果上ではこの四条件と期待効用表現の同値性を述べています。

<!-- proof-start -->
### 証明

### 8.1 期待効用表現なら四条件を満たす

期待効用表現

$$
U(p)=\sum_{i=1}^n p_i u(z_i)
$$

が存在するとします。

実数の大小関係は完備で推移的なので、

$$
p\succeq q
\iff
U(p)\ge U(q)
$$

で定まる選好も完備かつ推移的です。

次に任意の $p,q,r\in\Delta(Z)$ に対して、

$$
U\bigl(\alpha p+(1-\alpha)q\bigr)
=
\alpha U(p)+(1-\alpha)U(q)
$$

は $\alpha\in[0,1]$ の連続関数です。

したがって、

$$
\{
\alpha:
\alpha p+(1-\alpha)q\succeq r
\}
=
\{
\alpha:
\alpha U(p)+(1-\alpha)U(q)\ge U(r)
\}
$$

と、その逆向きの上位集合はいずれも閉集合です。よって混合連続性が成立します。

最後に $\alpha\in(0,1)$ とすると、

$$
\begin{aligned}
&
U\bigl(\alpha p+(1-\alpha)r\bigr)
-
U\bigl(\alpha q+(1-\alpha)r\bigr)
\\
&=
\alpha\bigl(U(p)-U(q)\bigr).
\end{aligned}
$$

$\alpha>0$ なので、左辺と $U(p)-U(q)$ は同じ符号を持ちます。従って、

$$
p\succeq q
\iff
\alpha p+(1-\alpha)r
\succeq
\alpha q+(1-\alpha)r.
$$

独立性公理も成立します。

これで期待効用表現から四条件への向きが示されました。

以下では四条件から期待効用表現を構成します。

### 8.2 全ての結果が無差別な場合

まず、

$$
\delta_i\sim\delta_j
\qquad
(\forall i,j)
$$

の場合を考えます。

[無差別なくじの混合置換](#lem-micro11-indifferent-substitution)を使えば、任意のくじ $p$ は、全ての退化くじを一つの固定した退化くじ $\delta_1$ へ置き換えられるので、

$$
p\sim\delta_1.
$$

従って全てのくじが無差別です。

この場合は

$$
u(z_i)=0
\qquad
(\forall i)
$$

と置けば、

$$
U(p)=0
$$

で全てのくじを同じ値にし、選好を表せます。

以下では非自明な場合を考えます。

### 8.3 最良結果と最悪結果を選ぶ

$Z$ は有限であり、退化くじ上の選好は完備・推移的です。

したがって、最良結果 $b$ と最悪結果 $w$ を選んで、

$$
\delta_b\succeq\delta_i\succeq\delta_w
\qquad
(\forall i)
$$

とできます。

非自明なので、

$$
\delta_b\succ\delta_w.
$$

標準くじを

$$
L(\alpha)
=
\alpha\delta_b+(1-\alpha)\delta_w
$$

とします。

### 8.4 各確実結果はある標準くじと無差別になる

固定した結果 $z_i$ を取ります。

集合

$$
A_i
=
\{
\alpha\in[0,1]:
L(\alpha)\succeq\delta_i
\}
$$

と

$$
B_i
=
\{
\alpha\in[0,1]:
\delta_i\succeq L(\alpha)
\}
$$

を考えます。

混合連続性により、$A_i$ と $B_i$ はともに閉集合です。

また完備性により、

$$
A_i\cup B_i=[0,1].
$$

ここで選んだ最良結果・最悪結果の順位から、

$$
L(1)=\delta_b\succeq\delta_i
$$

なので

$$
1\in A_i.
$$

同様に、

$$
\delta_i\succeq\delta_w=L(0)
$$

なので

$$
0\in B_i.
$$

したがって $A_i$ と $B_i$ はともに空ではありません。

もし

$$
A_i\cap B_i=\varnothing
$$

なら、連結な区間 $[0,1]$ が互いに交わらない二つの非空閉集合 $A_i,B_i$ に分離されてしまいます。

これは不可能です。

従ってある

$$
u_i\in[0,1]
$$

が存在して、

$$
u_i\in A_i\cap B_i.
$$

つまり、

$$
\boxed{
\delta_i\sim L(u_i)
}
$$

です。

さらに [標準くじの単調性](#lem-micro11-standard-lottery)により、この $u_i$ は一意です。

特に、

$$
u_b=1,
\qquad
u_w=0.
$$

ここで

$$
u(z_i)=u_i
$$

と定めます。

### 8.5 任意のくじを標準くじへ置き換える

任意の

$$
p=(p_1,dots,p_n)\in\Delta(Z)
$$

を取ります。

$p$ は「確率 $p_i$ で退化くじ $\delta_i$ を選ぶ複合くじ」の最終結果確率をまとめたものです。

したがって、

$$
p
=
\sum_{i=1}^n p_i\delta_i.
$$

各 $i$ について、

$$
\delta_i\sim L(u_i)
$$

なので、[無差別なくじの混合置換](#lem-micro11-indifferent-substitution)から、

$$
p
\sim
\sum_{i=1}^n p_i L(u_i).
$$

右辺の最終結果確率をまとめます。

$L(u_i)$ では最良結果 $b$ が確率 $u_i$、最悪結果 $w$ が確率 $1-u_i$ で起こります。

したがって混合全体で最良結果が起こる確率は、

$$
\sum_{i=1}^n p_i u_i.
$$

最悪結果が起こる確率は、

$$
\sum_{i=1}^n p_i(1-u_i)
=
1-
\sum_{i=1}^n p_i u_i.
$$

よって最終分布は、

$$
L\left(
\sum_{i=1}^n p_i u_i
\right).
$$

従って、

$$
\boxed{
p
\sim
L\left(
\sum_{i=1}^n p_i u_i
\right)
}
$$

です。

### 8.6 二つのくじの順位を比較する

同様に、

$$
q
\sim
L\left(
\sum_{i=1}^n q_i u_i
\right).
$$

[標準くじの単調性](#lem-micro11-standard-lottery)から、

$$
L(\alpha)\succeq L(\beta)
\iff
\alpha\ge\beta.
$$

したがって、

$$
p\succeq q
$$

であることと、

$$
\sum_{i=1}^n p_i u_i
\ge
\sum_{i=1}^n q_i u_i
$$

であることは同値です。

よって

$$
U(p)
=
\sum_{i=1}^n p_i u(z_i)
$$

は選好を表します。

### 8.7 正のアフィン変換による一意性

まず $u$ が期待効用表現なら、

$$
\tilde u(z)
=
a u(z)+b,
\qquad
a>0
$$

も期待効用表現です。

実際、

$$
\begin{aligned}
\tilde U(p)
&=
\sum_i p_i\{a u(z_i)+b\}
\\
&=
a\sum_i p_i u(z_i)
+
b\sum_i p_i
\\
&=
aU(p)+b.
\end{aligned}
$$

$a>0$ なので、$U(p)$ の大小関係は保たれます。

逆に、$u$ と $v$ が同じ選好の期待効用表現を与えるとします。

非自明な場合、最良結果 $b$ と最悪結果 $w$ について、

$$
u(b)>u(w),
\qquad
v(b)>v(w).
$$

それぞれを

$$
\hat u(z)
=
\frac{u(z)-u(w)}{u(b)-u(w)},
$$

$$
\hat v(z)
=
\frac{v(z)-v(w)}{v(b)-v(w)}
$$

と正規化します。

すると、

$$
\hat u(b)=\hat v(b)=1,
\qquad
\hat u(w)=\hat v(w)=0.
$$

結果 $z_i$ と標準くじ $L(u_i)$ は選好上無差別でした。

正規化された期待効用表現 $\hat u$ でこの無差別を評価すると、

$$
\hat u(z_i)
=
u_i\hat u(b)+(1-u_i)\hat u(w)
=
u_i.
$$

同じ選好を表す $\hat v$ でも同じ無差別が成立するので、

$$
\hat v(z_i)
=
u_i.
$$

従って全ての $i$ について、

$$
\hat u(z_i)=\hat v(z_i).
$$

正規化を戻せば、

$$
v(z)
=
a u(z)+b
$$

となり、

$$
a
=
\frac{v(b)-v(w)}{u(b)-u(w)}
>0
$$

です。

全ての結果が無差別な場合、期待効用表現は全結果へ同じ定数を割り当てなければならず、二つの定数関数も正のアフィン変換で結べます。

以上で存在と一意性が示されました。$\square$
<!-- proof-end -->

---

## 9. なぜ一般の狭義単調変換ではなく正のアフィン変換なのか

確実な選択肢だけを比較する通常の効用なら、

$$
u(x)
$$

を

$$
f(u(x))
$$

へ変えても、$f$ が狭義単調なら順位は変わりません。

しかし期待効用では、くじの評価に線形平均

$$
\sum_i p_i u(z_i)
$$

を使います。

正のアフィン変換なら、

$$
\sum_i p_i\{a u(z_i)+b\}
=
a\sum_i p_i u(z_i)+b
$$

となり、くじ全体の効用に同じ正のアフィン変換を施しただけです。

一方、たとえば

$$
f(t)=t^2
$$

のような非線形変換では、

$$
\sum_i p_i u(z_i)^2
$$

は一般に

$$
\left(
\sum_i p_i u(z_i)
\right)^2
$$

と一致しません。

したがって、結果効用の「曲がり方」自体がくじの順位へ影響します。

この点が、MICRO1 の序数的効用と期待効用の重要な違いです。

---

## 10. 独立性公理は何を排除するのか

独立性公理は、

$$
p\succ q
$$

なら、任意の共通なくじ $r$ を同じ比率で混ぜても

$$
\alpha p+(1-\alpha)r
\succ
\alpha q+(1-\alpha)r
$$

であることを要求します。

したがって、ある観測で

$$
p\succ q
$$

なのに、同じ $r$ と同じ比率 $\alpha$ を混ぜた後で

$$
\alpha q+(1-\alpha)r
\succ
\alpha p+(1-\alpha)r
$$

へ順位が逆転すれば、その選好は独立性公理を満たしません。

その場合、von Neumann--Morgenstern 型の期待効用表現は存在しません。

これは「その人の選好が非合理である」という結論ではありません。

言えるのは、**完備性・推移性・混合連続性・独立性という特定の公理体系では表せない**ということです。

---

## 11. 期待効用は賞金額の確率加重平均ではない

賞金を結果 $z$ そのものとして、結果効用を

$$
u(z)=z
$$

と選んだ場合に限り、

$$
U(p)
=
\sum_i p_i z_i
$$

は賞金額の確率加重平均と一致します。

しかし期待効用定理が要求するのは、結果に割り当てる数値 $u(z)$ が存在することだけです。

一般には、

$$
u(z)\ne z.
$$

たとえば先ほどの

$$
u(0)=0,
\qquad
u(100)=1,
\qquad
u(400)=2
$$

では、

$$
\frac12\delta_0+\frac12\delta_{400}
\sim
\delta_{100}
$$

でした。

賞金額の確率加重平均だけを見れば左辺は200円、右辺は100円ですが、期待効用は同じです。

次の MICRO12 では、この $u$ の凹性とリスク回避、確実性等価、リスクプレミアム、Arrow--Pratt の指標を結びます。

本章では、その前段階として「なぜ確率加重平均という形が現れるのか」を公理から確定しました。

---

# 演習

## Level A

<a id="ex-micro11-a01"></a>

### MICRO11-A01 単純なくじを確率ベクトルで表す

- Level: A
- 目安時間: 10分

結果集合を

$$
Z=\{0,100,300\}
$$

とする。

くじ $p$ は0円を確率 $1/5$、100円を確率 $1/2$、300円を残りの確率で与える。

1. $p$ を確率ベクトルで表せ。
2. 300円が確実に得られる退化くじを表せ。
3. $p$ が単純なくじの条件を満たすことを確認せよ。

<!-- solution-start -->
#### 詳細解答

300円の確率を $p_3$ とします。

確率の総和は1なので、

$$
\frac15+\frac12+p_3=1.
$$

左辺の既知部分を通分すると、

$$
\frac15+\frac12
=
\frac{2}{10}+\frac{5}{10}
=
\frac{7}{10}.
$$

従って、

$$
p_3
=
1-\frac{7}{10}
=
\frac{3}{10}.
$$

よって、

$$
\boxed{
p=
\left(
\frac15,
\frac12,
\frac{3}{10}
\right)
}
$$

です。

300円が確実に得られる退化くじは、第三成分だけが1なので、

$$
\boxed{
\delta_3=(0,0,1)
}
$$

です。

最後に、

$$
\frac15\ge0,
\qquad
\frac12\ge0,
\qquad
\frac{3}{10}\ge0
$$

であり、

$$
\frac15+\frac12+\frac{3}{10}
=
\frac{2+5+3}{10}
=
1.
$$

したがって $p\in\Delta(Z)$ です。
<!-- solution-end -->

<a id="ex-micro11-a02"></a>

### MICRO11-A02 複合くじの縮約を計算する

- Level: A
- 目安時間: 15分

結果集合を

$$
Z=\{0,100,200\}
$$

とする。

第一段階で確率 $1/3$ で

$$
p^1=
\left(
\frac12,
\frac12,
0
\right)
$$

を、確率 $2/3$ で

$$
p^2=
\left(
0,
\frac14,
\frac34
\right)
$$

を選ぶ複合くじを考える。

**複合くじの縮約**によって得られる単純なくじ $\bar p$ を求めよ。

<!-- solution-start -->
#### 詳細解答

最終結果ごとの確率は、

$$
\bar p_i
=
\frac13p_i^1
+
\frac23p_i^2
$$

で計算します。

0円の確率は、

$$
\bar p_1
=
\frac13\cdot\frac12
+
\frac23\cdot0
=
\frac16.
$$

100円の確率は、

$$
\begin{aligned}
\bar p_2
&=
\frac13\cdot\frac12
+
\frac23\cdot\frac14
\\
&=
\frac16+\frac16
=
\frac13.
\end{aligned}
$$

200円の確率は、

$$
\bar p_3
=
\frac13\cdot0
+
\frac23\cdot\frac34
=
\frac12.
$$

したがって、

$$
\boxed{
\bar p
=
\left(
\frac16,
\frac13,
\frac12
\right)
}
$$

です。

総和も、

$$
\frac16+\frac13+\frac12
=
\frac16+\frac26+\frac36
=
1
$$

なので、確かに単純なくじです。
<!-- solution-end -->

<a id="ex-micro11-a03"></a>

### MICRO11-A03 くじの混合と期待効用

- Level: A
- 目安時間: 15分

結果集合を

$$
Z=\{z_1,z_2,z_3\}
$$

とし、

$$
p=
\left(
\frac12,
\frac12,
0
\right),
\qquad
q=
\left(
0,
\frac12,
\frac12
\right)
$$

とする。

結果効用を

$$
u(z_1)=0,
\qquad
u(z_2)=2,
\qquad
u(z_3)=5
$$

とする。

1.
$$
r=\frac14p+\frac34q
$$
を求めよ。
2. $U(p),U(q),U(r)$ を求めよ。
3.
$$
U(r)
=
\frac14U(p)+\frac34U(q)
$$
を確認せよ。

<!-- solution-start -->
#### 詳細解答

まず、

$$
\frac14p
=
\left(
\frac18,
\frac18,
0
\right),
$$

$$
\frac34q
=
\left(
0,
\frac38,
\frac38
\right).
$$

従って、

$$
\boxed{
r=
\left(
\frac18,
\frac12,
\frac38
\right)
}
$$

です。

$p$ の期待効用は、

$$
U(p)
=
\frac12\cdot0
+
\frac12\cdot2
+
0\cdot5
=
1.
$$

$q$ の期待効用は、

$$
U(q)
=
0\cdot0
+
\frac12\cdot2
+
\frac12\cdot5
=
1+\frac52
=
\frac72.
$$

$r$ の期待効用は、

$$
\begin{aligned}
U(r)
&=
\frac18\cdot0
+
\frac12\cdot2
+
\frac38\cdot5
\\
&=
1+\frac{15}{8}
=
\frac{23}{8}.
\end{aligned}
$$

一方、

$$
\frac14U(p)+\frac34U(q)
=
\frac14
+
\frac34\cdot\frac72.
$$

第二項は、

$$
\frac34\cdot\frac72
=
\frac{21}{8}.
$$

第一項は

$$
\frac14=\frac28
$$

なので、

$$
\frac14U(p)+\frac34U(q)
=
\frac{23}{8}
=
U(r).
$$

期待効用はくじの混合に対して線形です。
<!-- solution-end -->

<a id="ex-micro11-a04"></a>

### MICRO11-A04 正のアフィン変換

- Level: A
- 目安時間: 15分

ある結果効用 $u$ がくじの選好を期待効用で表しているとする。

$$
v(z)=3u(z)-5
$$

と置く。

1. 任意のくじ $p$ について、$V(p)=3U(p)-5$ を示せ。
2. $U(p)>U(q)$ なら $V(p)>V(q)$ であることを示せ。
3. なぜ
$$
v(z)=-u(z)
$$
は一般に同じ選好を表さないか説明せよ。

<!-- solution-start -->
#### 詳細解答

くじ $p=(p_1,dots,p_n)$ に対して、

$$
V(p)
=
\sum_i p_i v(z_i).
$$

$v(z_i)=3u(z_i)-5$ を代入すると、

$$
\begin{aligned}
V(p)
&=
\sum_i p_i\{3u(z_i)-5\}
\\
&=
3\sum_i p_i u(z_i)
-
5\sum_i p_i.
\end{aligned}
$$

確率の総和は1なので、

$$
\sum_i p_i=1.
$$

従って、

$$
\boxed{
V(p)=3U(p)-5
}
$$

です。

$U(p)>U(q)$ なら、3は正なので、

$$
3U(p)-5
>
3U(q)-5.
$$

したがって、

$$
V(p)>V(q).
$$

一方、

$$
v(z)=-u(z)
$$

なら、

$$
V(p)=-U(p).
$$

この変換では、

$$
U(p)>U(q)
$$

から

$$
V(p)<V(q)
$$

へ順位が逆転します。

係数が正であることが必要です。
<!-- solution-end -->

## Level B

<a id="ex-micro11-b01"></a>

### MICRO11-B01 標準くじから結果効用を作る

- Level: B
- 目安時間: 25分

結果集合を

$$
Z=\{z_1,z_2,z_3,z_4\}
$$

とし、$z_1$ が最悪、$z_4$ が最良であるとする。

標準くじを

$$
L(\alpha)
=
\alpha\delta_4+(1-\alpha)\delta_1
$$

とする。

選好について、

$$
\delta_2\sim L\left(\frac14\right),
\qquad
\delta_3\sim L\left(\frac35\right)
$$

が分かっている。

1.
$$
u(z_1)=0,
\qquad
u(z_4)=1
$$
と正規化したとき、$u(z_2),u(z_3)$ を求めよ。
2.
$$
p=
\left(
\frac15,
\frac25,
\frac15,
\frac15
\right)
$$
の期待効用を求めよ。
3. $p$ と標準くじ $L(\alpha)$ が無差別になる $\alpha$ を求めよ。

<!-- solution-start -->
#### 詳細解答

正規化された von Neumann--Morgenstern 型効用では、結果 $z_i$ と無差別な標準くじの最良結果確率が、その結果の効用になります。

したがって、

$$
\boxed{
u(z_2)=\frac14,
\qquad
u(z_3)=\frac35
}
$$

です。

くじ $p$ の期待効用は、

$$
U(p)
=
\frac15u(z_1)
+
\frac25u(z_2)
+
\frac15u(z_3)
+
\frac15u(z_4).
$$

値を代入すると、

$$
U(p)
=
\frac15\cdot0
+
\frac25\cdot\frac14
+
\frac15\cdot\frac35
+
\frac15\cdot1.
$$

各項は、

$$
\frac25\cdot\frac14
=
\frac{1}{10},
$$

$$
\frac15\cdot\frac35
=
\frac{3}{25},
$$

$$
\frac15\cdot1
=
\frac15.
$$

通分して、

$$
\frac{1}{10}
=
\frac{5}{50},
\qquad
\frac{3}{25}
=
\frac{6}{50},
\qquad
\frac15
=
\frac{10}{50}.
$$

従って、

$$
\boxed{
U(p)
=
\frac{21}{50}
}
$$

です。

標準くじ $L(\alpha)$ の期待効用は、

$$
U(L(\alpha))
=
\alpha\cdot1+(1-\alpha)\cdot0
=
\alpha.
$$

無差別条件は、

$$
\alpha=U(p).
$$

よって、

$$
\boxed{
\alpha=\frac{21}{50}
}
$$

です。
<!-- solution-end -->

<a id="ex-micro11-b02"></a>

### MICRO11-B02 独立性公理の違反を見抜く

- Level: B
- 目安時間: 25分

ある選好について、

$$
p\succ q
$$

が観測されたとする。

さらに、ある第三くじ $r$ と

$$
\alpha=\frac25
$$

について、

$$
\frac25q+\frac35r
\succ
\frac25p+\frac35r
$$

も観測された。

1. この二つの観測が独立性公理と両立しないことを示せ。
2. この選好が本章の von Neumann--Morgenstern 型期待効用表現を持てない理由を説明せよ。
3. ここから直ちに「選好が完備でない」または「推移的でない」と結論してよいか。

<!-- solution-start -->
#### 詳細解答

独立性公理は、

$$
p\succ q
$$

なら、任意の共通なくじ $r$ と任意の $\alpha\in(0,1)$ について、

$$
\alpha p+(1-\alpha)r
\succ
\alpha q+(1-\alpha)r
$$

を要求します。

ここで

$$
\alpha=\frac25
$$

なので、独立性公理が成立するなら、

$$
\frac25p+\frac35r
\succ
\frac25q+\frac35r
$$

でなければなりません。

しかし観測では逆に、

$$
\frac25q+\frac35r
\succ
\frac25p+\frac35r
$$

です。

したがって独立性公理に違反します。

本章の期待効用定理では、完備性・推移性・混合連続性・独立性公理が期待効用表現の十分条件です。

また期待効用表現そのものは独立性を満たします。実際、期待効用の差は共通くじを混ぜると正の係数 $\alpha$ 倍されるだけです。

従って、この観測された順位反転を持つ選好は von Neumann--Morgenstern 型期待効用では表せません。

ただし、独立性の違反だけから完備性や推移性の違反は従いません。

四つの条件は別々の性質です。

したがって、

$$
\boxed{
\text{独立性には違反するが、完備性・推移性についてはこの情報だけでは判定できない}
}
$$

が結論です。
<!-- solution-end -->

<a id="ex-micro11-b03"></a>

### MICRO11-B03 無差別な結果を混合の中で置き換える

- Level: B
- 目安時間: 30分

独立性公理を満たす選好を考える。

三つのくじ $p,q,r$ が

$$
p\sim q
$$

を満たすとする。

1. 任意の $\alpha\in(0,1)$ について、
$$
\alpha p+(1-\alpha)r
\sim
\alpha q+(1-\alpha)r
$$
を証明せよ。
2. さらに
$$
r\sim s
$$
なら、$\lambda,\mu,\nu\ge0$、
$$
\lambda+\mu+\nu=1
$$
のもとで
$$
\lambda p+\mu r+\nu t
\sim
\lambda q+\mu s+\nu t
$$
を示せ。

<!-- solution-start -->
#### 詳細解答

$p\sim q$ は、

$$
p\succeq q
$$

かつ

$$
q\succeq p
$$

を意味します。

独立性公理を第一の不等式に適用すると、

$$
\alpha p+(1-\alpha)r
\succeq
\alpha q+(1-\alpha)r.
$$

第二の不等式に適用すると、

$$
\alpha q+(1-\alpha)r
\succeq
\alpha p+(1-\alpha)r.
$$

両方が成立するので、

$$
\boxed{
\alpha p+(1-\alpha)r
\sim
\alpha q+(1-\alpha)r
}
$$

です。

次に三項混合を扱います。

$\lambda=1$ なら $\mu=\nu=0$ なので、結論は $p\sim q$ そのものです。

以下 $\lambda<1$ とします。

まず、

$$
R
=
\frac{\mu}{1-\lambda}r
+
\frac{\nu}{1-\lambda}t
$$

と置きます。

係数は非負で総和1なので $R$ はくじです。

第一の結果から、

$$
\lambda p+(1-\lambda)R
\sim
\lambda q+(1-\lambda)R.
$$

これを展開すると、

$$
\lambda p+\mu r+\nu t
\sim
\lambda q+\mu r+\nu t.
$$

次に $r\sim s$ を使います。

$\mu=0$ なら置き換えは不要です。

$\mu>0$ なら、残りの共通部分

$$
T
=
\frac{\lambda}{1-\mu}q
+
\frac{\nu}{1-\mu}t
$$

を用いて独立性を適用すると、

$$
\mu r+(1-\mu)T
\sim
\mu s+(1-\mu)T.
$$

展開して、

$$
\lambda q+\mu r+\nu t
\sim
\lambda q+\mu s+\nu t.
$$

推移性により、

$$
\boxed{
\lambda p+\mu r+\nu t
\sim
\lambda q+\mu s+\nu t
}
$$

です。
<!-- solution-end -->

## Level C

<a id="ex-micro11-c01"></a>

### MICRO11-C01 三結果で期待効用表現を再構成する

- Level: C
- 目安時間: 50分

結果集合を

$$
Z=\{z_L,z_M,z_H\}
$$

とし、くじ上の選好 $\succeq$ は完備性・推移性・混合連続性・独立性公理を満たすとする。

また、

$$
\delta_H\succ\delta_M\succ\delta_L
$$

とする。

標準くじを

$$
L(\alpha)
=
\alpha\delta_H+(1-\alpha)\delta_L
$$

とする。

1. 混合連続性から、ある
$$
c\in(0,1)
$$
が存在して
$$
\delta_M\sim L(c)
$$
となることを示せ。
2. 独立性公理から、この $c$ が一意であることを示せ。
3.
$$
u(z_L)=0,
\qquad
u(z_M)=c,
\qquad
u(z_H)=1
$$
と置く。任意の
$$
p=(p_L,p_M,p_H)
$$
について
$$
p\sim L\bigl(p_Mc+p_H\bigr)
$$
を証明せよ。
4. 任意の二つのくじ $p,q$ について、
$$
p\succeq q
\iff
p_Lu(z_L)+p_Mu(z_M)+p_Hu(z_H)
\ge
q_Lu(z_L)+q_Mu(z_M)+q_Hu(z_H)
$$
を導け。
5. 別の期待効用表現 $v$ が
$$
v(z_L)=2,
\qquad
v(z_H)=8
$$
を満たすとき、$v(z_M)$ を $c$ で表せ。

<!-- solution-start -->
#### 詳細解答

まず、

$$
A
=
\{
\alpha\in[0,1]:
L(\alpha)\succeq\delta_M
\}
$$

と

$$
B
=
\{
\alpha\in[0,1]:
\delta_M\succeq L(\alpha)
\}
$$

を定めます。

混合連続性により $A,B$ は閉集合です。

完備性により、

$$
A\cup B=[0,1].
$$

また、

$$
L(1)=\delta_H\succ\delta_M
$$

なので、

$$
1\in A.
$$

一方、

$$
\delta_M\succ\delta_L=L(0)
$$

なので、

$$
0\in B.
$$

したがって $A,B$ はともに非空です。

もし $A\cap B$ が空なら、連結区間 $[0,1]$ が互いに交わらない二つの非空閉集合へ分離されます。

これは不可能なので、

$$
A\cap B\ne\varnothing.
$$

従ってある $c\in[0,1]$ が存在して、

$$
L(c)\sim\delta_M.
$$

さらに、

$$
\delta_H\succ\delta_M\succ\delta_L
$$

なので $c=1$ と $c=0$ は不可能です。

よって、

$$
\boxed{
c\in(0,1)
}
$$

です。

次に一意性を示します。

もし

$$
c>d
$$

かつ

$$
L(c)\sim\delta_M\sim L(d)
$$

なら、推移性から

$$
L(c)\sim L(d).
$$

しかし独立性公理と

$$
\delta_H\succ\delta_L
$$

から得られる標準くじの単調性により、

$$
c>d
\Longrightarrow
L(c)\succ L(d).
$$

矛盾です。

従って $c$ は一意です。

次に任意のくじ

$$
p=(p_L,p_M,p_H)
$$

を考えます。

[複合くじの縮約](#def-micro11-compound-reduction)の定義から、

$$
p
=
p_L\delta_L
+
p_M\delta_M
+
p_H\delta_H.
$$

ここで、

$$
\delta_M\sim L(c)
=
c\delta_H+(1-c)\delta_L.
$$

独立性公理による無差別な選択肢の置き換えから、

$$
p
\sim
p_L\delta_L
+
p_M\{c\delta_H+(1-c)\delta_L\}
+
p_H\delta_H.
$$

$\delta_L$ の係数は、

$$
p_L+p_M(1-c).
$$

$\delta_H$ の係数は、

$$
p_Mc+p_H.
$$

確率の総和は、

$$
p_L+p_M+p_H=1
$$

なので、

$$
p_L+p_M(1-c)
=
1-(p_Mc+p_H).
$$

従って右辺は、

$$
L(p_Mc+p_H)
$$

です。

よって、

$$
\boxed{
p\sim L(p_Mc+p_H)
}
$$

を得ます。

同様に、

$$
q\sim L(q_Mc+q_H).
$$

標準くじの単調性から、

$$
p\succeq q
$$

であることと、

$$
p_Mc+p_H
\ge
q_Mc+q_H
$$

であることは同値です。

一方、定めた $u$ による期待効用は、

$$
\begin{aligned}
U(p)
&=
p_Lu(z_L)+p_Mu(z_M)+p_Hu(z_H)
\\
&=
p_L\cdot0+p_Mc+p_H\cdot1
\\
&=
p_Mc+p_H.
\end{aligned}
$$

同様に、

$$
U(q)=q_Mc+q_H.
$$

従って、

$$
\boxed{
p\succeq q
\iff
U(p)\ge U(q)
}
$$

です。

最後に、期待効用表現は正のアフィン変換を除いて一意です。

$u(z_L)=0$、$u(z_H)=1$ に対して、

$$
v(z)=a u(z)+b
$$

とします。

$z_L$ から、

$$
2=v(z_L)=a\cdot0+b
$$

なので、

$$
b=2.
$$

$z_H$ から、

$$
8=v(z_H)=a\cdot1+2
$$

なので、

$$
a=6.
$$

したがって、

$$
\boxed{
v(z_M)=6c+2
}
$$

です。
<!-- solution-end -->

---

## まとめ

有限結果上の不確実性下の選択では、比較対象は確実な結果ではなく確率分布です。

この章で得た流れは、

$$
\boxed{
\begin{aligned}
&\text{完備性・推移性}
\\
&\quad+
\text{混合連続性}
\\
&\quad+
\text{独立性公理}
\\
&\Longrightarrow
\text{期待効用表現}
\end{aligned}
}
$$

です。

証明の核心は、各確実結果を最良結果と最悪結果の標準くじへ変換し、

$$
\delta_i
\sim
u_i\delta_b+(1-u_i)\delta_w
$$

と数値化することでした。

任意のくじ

$$
p=(p_1,dots,p_n)
$$

では、その置き換えと複合くじの縮約により、

$$
p
\sim
L\left(
\sum_i p_i u_i
\right)
$$

となります。

したがって、

$$
U(p)
=
\sum_i p_i u_i
$$

という確率加重平均が公理から導かれます。

さらに結果効用は任意の狭義単調変換ではなく、

$$
\tilde u=au+b,
\qquad
a>0
$$

という正のアフィン変換を除いて一意です。

次の MICRO12 では、この結果効用の凹性を使って、リスク回避・確実性等価・リスクプレミアム・Arrow--Pratt の指標・確率優越へ進みます。
