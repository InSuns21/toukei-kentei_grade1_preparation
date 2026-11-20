# ANF4 素数の分解・分岐・惰性

[ANF3 の素イデアル分解定理](../ANF3/index.md#thm-anf3-prime-ideal-factorization)により、整数環の非零イデアルは素イデアルの冪積に一意に分解されます。しかし有理素数 $p$ を数体 $K$ へ持ち込むと、$(p)$ が素イデアルのままとは限りません。たとえば $\mathbb Z[\sqrt{-5}]$ では $(2)$ が一つの素イデアルの **平方**になり、$(3)$ は **異なる二つ**の素イデアルに分かれます。

この違いを、素イデアルの数だけではなく、冪指数と剰余体の大きさで測ります。さらに [ANF2 の体の判別式](../ANF2/index.md#def-anf2-field-discriminant)が二次体のどの素数の分岐を検出するか、証明と計算をつなぎます。

以下、$K/\mathbb Q$ は次数 $n=[K:\mathbb Q]\geq2$ の数体、$A=\mathcal O_K$ はその[整数環](../ANF1/index.md#def-anf1-ring-of-integers)とし、$p$ は正の有理素数です。$A$ が [Dedekind整域](../ANF3/index.md#thm-anf3-number-ring-dedekind)であることを使います。$\mathfrak p\mid(p)$ という記法は、$A$ の非零素イデアル $\mathfrak p$ が $(p)\subseteq\mathfrak p$ を満たすことを表します。

<!-- definition-example-audit: strict -->

## 1. 有理素数が何個の素イデアルに分かれるか

[素イデアル分解の一意性](../ANF3/index.md#thm-anf3-prime-ideal-factorization)を $(p)$ に適用すると、相異なる非零素イデアルについて

$$
(p)=\mathfrak p_1^{e_1}\cdots\mathfrak p_g^{e_g},
\qquad e_i\geq1
$$

と書けます。ここで $\mathfrak p_i$ はすべて $(p)$ を含みます。積が各因子に含まれるからです。また逆に $(p)$ を含む素イデアルは、この積のいずれかの因子を含み、非零素イデアルがすべて極大であることから、その因子と一致します。

指数 $e_i$ だけでは情報が足りません。各 $\mathfrak p_i$ で割った剰余環 $A/\mathfrak p_i$ の大きさも数えます。まず、この商が有限体であることを確かめます。非零元 $\alpha\in\mathfrak p_i$ の $\mathbb Q$ 上のモニック最小多項式は、[整性判定](../ANF1/index.md#thm-anf1-minimal-polynomial)から整数係数で、定数項 $a_0$ は $\alpha\ne0$ のため零でありません。多項式の等式を整理すると $a_0\in(\alpha)\subseteq\mathfrak p_i$ です。ゆえに $\mathfrak p_i\cap\mathbb Z$ は非零素イデアル $(p)$ であり、

$$
\mathbb F_p=\mathbb Z/(p)\longrightarrow A/\mathfrak p_i
$$

が単射になります。[整数基底](../ANF1/index.md#thm-anf1-integral-basis)により $A/(p)$ は $n$ 次元の $\mathbb F_p$ ベクトル空間なので、その商 $A/\mathfrak p_i$ は有限です。$\mathfrak p_i$ が極大なので商は体です。従って大きさは $p$ の冪で表されます。

<a id="def-anf4-ramification-residue"></a>

<!-- formal-statement-start -->
> **定義（分岐指数と剰余次数）**  
> $K/\mathbb Q$ を数体、$p$ を有理素数、$(p)=\prod_{i=1}^{g}\mathfrak p_i^{e_i}$ を $A=\mathcal O_K$ における素イデアル分解とする。正整数 $e_i$ を $\mathfrak p_i$ の **分岐指数**という。剰余体 $k_i=A/\mathfrak p_i$ は $\mathbb F_p$ の有限次拡大であり、その **剰余次数**を

$$
f_i=[k_i:\mathbb F_p],
\qquad |k_i|=p^{f_i}
$$

> で定義する。素イデアルの個数 $g$、分岐指数 $e_i$、剰余次数 $f_i$ は別々の数値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf4-ramification-residue -->
**定義の確認**：$K=\mathbb Q(\sqrt{-5})$ では $s=\sqrt{-5}$ と置くと $A=\mathbb Z[s]$ です。[ANF3 の具体的なイデアル](../ANF3/index.md#thm-anf3-prime-ideal-factorization)と同じ $\mathfrak q=(3,s-1)$ を考えます。$A/\mathfrak q$ では $3=0,\ s=1$ となるので $\mathbb F_3$ そのものです。よって $f(\mathfrak q\mid3)=1$。後で $(3)=\mathfrak q(3,s+1)$ と証明するので、$\mathfrak q$ の分岐指数は $e=1$ です。剰余体の計算と、イデアルの積の計算を分けて確認できました。
<!-- definition-example-end -->

## 2. イデアルの大きさから次数公式を導く

整数環の商 $A/I$ の元の個数を用いると、分岐指数と剰余次数の積が現れます。非零イデアル $I$ は非零整数を含むので、$A/I$ は有限集合です。

<a id="def-anf4-ideal-norm"></a>

<!-- formal-statement-start -->
> **定義（整イデアルのノルム）**  
> 数体 $K/\mathbb Q$ の整数環 $A$ と非零整イデアル $I\subseteq A$ に対して、その **絶対イデアルノルム**を

$$
N(I)=|A/I|
$$

> と定義する。これは正の整数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf4-ideal-norm -->
**定義の確認**：$A=\mathbb Z$ として $I=(12)$ なら、$\mathbb Z/(12)$ は $0,1,\ldots,11$ の12個の剰余類を持つので $N((12))=12$ です。一般の数体で $I=(m)$、$0\ne m\in\mathbb Z$ なら、整数基底に沿って $A/(m)\cong(\mathbb Z/m\mathbb Z)^n$（加法群）となるため $N((m))=|m|^n$ です。
<!-- definition-example-end -->

次の補題が「一つの素イデアルの冪を一つ増やすと、剰余体の大きさだけ商が増える」ことを保証します。

<a id="lem-anf4-prime-power-norm"></a>

<!-- formal-statement-start -->
> **補題（素イデアル冪のノルム）**  
> $K/\mathbb Q$ を数体、$A=\mathcal O_K$ とする。$p$ の上にある非零素イデアル $\mathfrak p$ の剰余次数が $f$ なら、任意の整数 $a\geq1$ に対して

$$
N(\mathfrak p^a)=p^{af}
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** $A/\mathfrak p^a$ を、$\mathfrak p^j/\mathfrak p^{j+1}$ を一段ずつ足して作ります。[ANF3 の局所単項性](../ANF3/index.md#lem-anf3-local-principal)により各段は剰余体と同じ大きさです。

<!-- proof-start -->
### 証明

$\mathfrak p$ は極大で、$k=A/\mathfrak p$ は位数 $p^f$ の体です。$j\geq0$ に対し

$$
M_j=\mathfrak p^j/\mathfrak p^{j+1}
$$

を考えます。$\mathfrak p M_j=0$ なので $M_j$ は $k$ ベクトル空間です。$\mathfrak p$ の外の $s\in A$ は $k$ で非零、従って $M_j$ 上で可逆に作用します。よって $M_j$ を $\mathfrak p$ で局所化しても何も変わりません。

[Dedekind整域の局所単項性](../ANF3/index.md#lem-anf3-local-principal)から $A_{\mathfrak p}$ の極大イデアルは一様化元 $\pi$ で生成され、$\mathfrak p^jA_{\mathfrak p}=(\pi^j)$ です。従って局所化した段は

$$
(M_j)_{\mathfrak p}
 =(\pi^j)/(\pi^{j+1})
 \cong A_{\mathfrak p}/(\pi)
 \cong A/\mathfrak p=k.
$$

最初の同型は $a\bmod(\pi)$ を $a\pi^j\bmod(\pi^{j+1})$ に送る写像です。ここでは局所環が整域であるため、$\pi^j$ を掛けた核がちょうど $(\pi)$ になります。従って $M_j$ は $k$ 上1次元で、元の数は $p^f$ 個です。

各段の短い完全列

$$
0\longrightarrow \mathfrak p^j/\mathfrak p^{j+1}
\longrightarrow A/\mathfrak p^{j+1}
\longrightarrow A/\mathfrak p^j\longrightarrow0
$$

で元の個数を掛け合わせます。$A/\mathfrak p^0=A/A$ は1元集合なので、$j=0,\ldots,a-1$ を順に適用して

$$
|A/\mathfrak p^a|
 =\prod_{j=0}^{a-1}|M_j|
 =(p^f)^a=p^{af}
$$

となります。
<!-- proof-end -->

<a id="thm-anf4-fundamental-identity"></a>

<!-- formal-statement-start -->
> **定理（分岐指数・剰余次数の次数公式）**  
> $K/\mathbb Q$ を次数 $n$ の数体とする。任意の有理素数 $p$ に対し、整数環 $A$ で

$$
(p)=\prod_{i=1}^{g}\mathfrak p_i^{e_i},
\qquad f_i=[A/\mathfrak p_i:\mathbb F_p]
$$

> と分解したとき、次の等式が成り立つ。

$$
\sum_{i=1}^{g}e_i f_i=n.
$$

> 特に $e_i f_i\leq n$ であり、一つの素イデアルについて常に $e_if_i=n$ としてよいわけではない。
<!-- formal-statement-end -->

**証明の見取り図。** [整数基底の存在](../ANF1/index.md#thm-anf1-integral-basis)による $N((p))=p^n$ と、[素イデアル冪のノルム](#lem-anf4-prime-power-norm)を比較します。相異なる極大イデアルが互いに素であることが、商の個数を積に分ける鍵です。

<!-- proof-start -->
### 証明

整数基底 $\omega_1,\ldots,\omega_n$ により $A=\bigoplus_{j=1}^{n}\mathbb Z\omega_j$ です。従って

$$
A/(p)\cong\bigoplus_{j=1}^{n}\mathbb Z/p\mathbb Z,
\qquad N((p))=p^n.
$$

$\mathfrak p_i$ と $\mathfrak p_j$ ($i\ne j$) は異なる極大イデアルなので $\mathfrak p_i+\mathfrak p_j=A$ です。$a+b=1$ ($a\in\mathfrak p_i,b\in\mathfrak p_j$) を取って $(a+b)^{e_i+e_j-1}$ を展開すれば、各項は $\mathfrak p_i^{e_i}$ または $\mathfrak p_j^{e_j}$ に入り、冪同士も互いに素となります。

互いに素なイデアル $I,J$ では写像 $A/(IJ)\to A/I\times A/J$ が同型です。実際、核について $I\cap J=IJ$ は $a+b=1$ を掛けて示せます。全射性も $a\in I,\ b\in J,\ a+b=1$ を用い、指定剰余 $(x\bmod I,y\bmod J)$ に $bx+ay$ を対応させれば確認できます。これを繰り返すと

$$
A/(p)\cong\prod_{i=1}^{g}A/\mathfrak p_i^{e_i}.
$$

両辺の元の個数を数え、[補題](#lem-anf4-prime-power-norm)を $a=e_i$、$f=f_i$ に適用すると

$$
p^n=N((p))
=\prod_{i=1}^{g}N(\mathfrak p_i^{e_i})
=\prod_{i=1}^{g}p^{e_if_i}
=p^{\sum_i e_if_i}.
$$

$p>1$ なので指数を比較して $\sum_i e_i f_i=n$ です。
<!-- proof-end -->

次数公式から $g\leq n$、$1\leq e_i,f_i\leq n$ が分かります。ただし $g>1$ のとき、個々の $e_if_i$ ではなく **全素イデアルにわたる和**を取らなくてはなりません。

## 3. 分裂・惰性・分岐を区別する

一般の次数では素イデアルがいくつかに分かれ、各剰余次数が1より大きいという中間的な場合もあります。まず区別したい代表的な三つの現象に名前を与えます。

<a id="def-anf4-splitting-types"></a>

<!-- formal-statement-start -->
> **定義（完全分裂・惰性・分岐）**  
> 数体 $K/\mathbb Q$ の次数を $n\geq2$ とし、$(p)=\prod_{i=1}^{g}\mathfrak p_i^{e_i}$、$f_i=[A/\mathfrak p_i:\mathbb F_p]$ とする。
>
> - $g=n$ で全て $e_i=f_i=1$ のとき、$p$ は **完全分裂**する。
> - $g=1,\ e_1=1,\ f_1=n$ のとき、$p$ は **惰性**（不活性）である。
> - ある $i$ で $e_i>1$ のとき、$p$ は **分岐**する。
>
> 全て $e_i=1$ のときは **不分岐**という。次数 $n>2$ では、これら以外の不分岐な分解型もあり得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf4-splitting-types -->
**定義の確認**：$K=\mathbb Q(\sqrt{-5})$ で $s=\sqrt{-5}$ と置き、$\mathfrak q_+=(3,s-1)$、$\mathfrak q_-=(3,s+1)$ とします。どちらの剰余体も $\mathbb F_3$ で、$\mathfrak q_+\ne\mathfrak q_-$（$1$ と $-1$ は $\mathbb F_3$ で異なる）です。$(3)=\mathfrak q_+\mathfrak q_-$ は後述の多項式判定でも確認でき、$g=2,e_+=e_-=1,f_+=f_-=1$ です。次数公式 $1+1=2$ を満たし、完全分裂の条件をすべて確認できました。
<!-- definition-example-end -->

特に二次体では $\sum e_if_i=2$ の正整数解が三通りしかありません。

| 振る舞い | $(p)$ の形 | $(g;e_i;f_i)$ | $A/(p)$ の元の個数 |
| --- | --- | --- | --- |
| 完全分裂 | $\mathfrak p_1\mathfrak p_2$ | $g=2;\ (1,1),(1,1)$ | $p^2$ |
| 惰性 | $\mathfrak p$ | $g=1;\ (1,2)$ | $p^2$ |
| 分岐 | $\mathfrak p^2$ | $g=1;\ (2,1)$ | $p^2$ |

これを「割り算ができる有限環」の側から判定できるのが次節です。

## 4. 最小多項式を法 $p$ で因数分解する

整数環がある整元 $\theta$ によって $A=\mathbb Z[\theta]$ と生成され、$\theta$ のモニック最小多項式が $h(T)\in\mathbb Z[T]$ であるとします。$\theta$ に多項式を代入する写像は

$$
A\cong\mathbb Z[T]/(h(T))
$$

を与えます。実際、整元 $\theta$ のモニック最小多項式で割れば余りは次数 $n$ 未満となり、$1,\theta,\ldots,\theta^{n-1}$ は $\mathbb Q$ 上独立なので余りが零のときだけ代入値が零です。この表示を法 $p$ に落とすと

$$
A/(p)\cong \mathbb F_p[T]/(\overline h(T)).
$$

右辺の既約因子は素イデアルの候補を表し、因子の重複度は分岐指数に対応します。

<a id="thm-anf4-monogenic-factorization"></a>

<!-- formal-statement-start -->
> **定理（整数環が単項生成されるときの素イデアル分解）**  
> $K/\mathbb Q$ は次数 $n$ の数体、$A=\mathcal O_K=\mathbb Z[\theta]$、$h\in\mathbb Z[T]$ は $\theta$ のモニック最小多項式とする。有理素数 $p$ に対して

$$
\overline h(T)=\prod_{i=1}^{g}g_i(T)^{m_i}
\quad\text{in }\mathbb F_p[T]
$$

> が相異なるモニック既約多項式 $g_i$ の積であるとする。$g_i$ の整数係数の持ち上げを $\widetilde g_i$ とし、

$$
\mathfrak p_i=(p,\widetilde g_i(\theta))\subseteq A
$$

> と置く。このとき $\mathfrak p_i$ は $p$ の上の相異なる素イデアルの全てであり、

$$
(p)=\prod_{i=1}^{g}\mathfrak p_i^{m_i},
\qquad
e_i=m_i,\qquad f_i=\deg g_i
$$

> が成り立つ。持ち上げ方によって $\mathfrak p_i$ は変わらない。
<!-- formal-statement-end -->

**証明の見取り図。** $\mathbb F_p[T]/(\overline h)$ を、互いに素な $g_i^{m_i}$ の商の直積に分けます。各直積因子の唯一の極大イデアルが $g_i$ で生成され、その冪が零になる最小指数が $m_i$ です。この局所的な冪指数を [ANF3 の分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)と照合します。

<!-- proof-start -->
### 証明

$\mathbb Z[T]\to A$ の核が $(h)$ であることは上の余りの議論から従います。法 $p$ に落として $R=A/(p)\cong\mathbb F_p[T]/(\overline h)$ です。$\overline h$ の各 $g_i$ は既約なので

$$
A/\mathfrak p_i\cong\mathbb F_p[T]/(g_i)
$$

は体であり、$\mathfrak p_i$ は極大です。その元数は $p^{\deg g_i}$ 個だから、$f_i=\deg g_i$ です。$\widetilde g_i$ を別に選んでも差は $p$ の倍数なのでイデアルは変わりません。

$\overline h=\prod g_i^{m_i}$ で各因子は互いに素です。直積の商に対する上節と同じ互いに素なイデアルの証明により、

$$
R\cong\prod_{i=1}^{g}R_i,
\qquad R_i=\mathbb F_p[T]/(g_i^{m_i}).
$$

$R_i$ の素イデアルは $(g_i)/(g_i^{m_i})$ だけです。実際、素イデアルに $g_i^{m_i}$ が入れば $g_i$ 自身が入り、$g_i$ による商は体です。従って $R$ の極大イデアルは各 $i$ に一つずつで、$A$ の $(p)$ を含む極大イデアルも $\mathfrak p_i$ に限ります。

ここで $R_i$ の極大イデアル $\mathfrak m_i$ には

$$
\mathfrak m_i^{m_i}=0,
\qquad \mathfrak m_i^{m_i-1}\ne0
$$

が成り立ちます。後者は $\deg(g_i^{m_i-1})<\deg(g_i^{m_i})$ のため、$g_i^{m_i-1}$ が $g_i^{m_i}$ の倍数ではないからです。一方、[Dedekind整域の分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)により $(p)=\prod_i\mathfrak p_i^{e_i}$。互いに素な冪による商の直積では、$i$ 番目の局所成分は $A/\mathfrak p_i^{e_i}$ で、極大イデアルの冪が零になる最小指数は、[局所単項性](../ANF3/index.md#lem-anf3-local-principal)と $\mathfrak p_i^{e_i-1}\ne\mathfrak p_i^{e_i}$ から $e_i$ です。

この局所成分は $R_i$ と同型なので、最小指数を比較して $e_i=m_i$ です。
<!-- proof-end -->

この定理の **$A=\mathbb Z[\theta]$** という仮定は重要です。一般の整元 $\theta$ が生成する部分環 $\mathbb Z[\theta]$ と整数環 $A$ が異なる場合、多項式を単に法 $p$ で分解する方法は、$p$ が指数 $[A:\mathbb Z[\theta]]$ を割るときにはそのまま使えません。整数基底を確定させてから適用します。

## 5. 二次体では判別式で三つの型を判定する

$d\ne1$ を平方因子を持たない整数とし、$K=\mathbb Q(\sqrt d)$ とします。[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)と [判別式公式](../ANF2/index.md#thm-anf2-quadratic-discriminant)から、整数環を生成する元 $\theta$、そのモニック多項式 $h(T)$、体の判別式 $D_K$ は次の通りです。

| $d$ の条件 | $\theta$ | $h(T)$ | $D_K$ |
| --- | --- | --- | --- |
| $d\equiv2,3\pmod4$ | $\sqrt d$ | $T^2-d$ | $4d$ |
| $d\equiv1\pmod4$ | $(1+\sqrt d)/2$ | $T^2-T+(1-d)/4$ | $d$ |

両方で $A=\mathbb Z[\theta]$ なので、[単項生成の場合の素イデアル分解定理](#thm-anf4-monogenic-factorization)を任意の $p$ に適用できます。

二次多項式 $h=T^2-tT+u$ の根を $\theta,\theta'$ とすると、基底 $(1,\theta)$ の跡行列は

$$
\begin{pmatrix}
2&t\\ t&t^2-2u
\end{pmatrix}.
$$

したがって [基底判別式](../ANF2/index.md#def-anf2-basis-discriminant)は

$$
D_K=2(t^2-2u)-t^2=t^2-4u=(\theta-\theta')^2.
$$

この式は「法 $p$ で二つの根が重なること」と「$p$ が判別式を割ること」を結びます。

<a id="thm-anf4-quadratic-splitting"></a>

<!-- formal-statement-start -->
> **定理（二次体での分裂・惰性・分岐判定）**  
> $d\ne1$ を平方自由整数、$K=\mathbb Q(\sqrt d)$、$D_K$ を体の判別式とする。素数 $p$ について次が成り立つ。
>
> **(1) 奇素数 $p$ の場合：** $D_K$ の法 $p$ での値によって、次の三通りに分かれる。
>
> - 零なら $(p)=\mathfrak p^2$、$e=2,f=1$（分岐）。
> - 非零平方なら $(p)=\mathfrak p_1\mathfrak p_2$、各 $e_i=f_i=1$（完全分裂）。
> - 非平方なら $(p)$ は素イデアル、$e=1,f=2$（惰性）。
>
> **(2) $p=2$ の場合：** $2\mid D_K$ なら分岐する。$D_K$ が奇数なら、$D_K\equiv1\pmod8$ のとき完全分裂し、$D_K\equiv5\pmod8$ のとき惰性となる。
>
> 特に二次体では、**素数 $p$ が分岐することと $p\mid D_K$ は同値**である。
<!-- formal-statement-end -->

**証明の見取り図。** [上の定理](#thm-anf4-monogenic-factorization)で、$\overline h$ の異なる一次因子・既約二次因子・一次因子の二乗が、それぞれ分裂・惰性・分岐に対応します。奇素数では平方完成、$p=2$ では多項式そのものを二通りに場合分けします。

<!-- proof-start -->
### 証明

**奇素数の場合。** $2$ は $\mathbb F_p$ で可逆なので、$\overline h(T)=0$ は

$$
(2T-t)^2=t^2-4u=D_K\pmod p
$$

と同値です。$D_K\equiv0\pmod p$ なら唯一の重根 $t/2$ を持ち、$\overline h=(T-t/2)^2$。$D_K$ が非零平方なら相異なる二根 $(t\pm\sqrt{D_K})/2$ を持ち、二つの一次因子へ分かれます。非平方なら根がなく、二次多項式なので既約です。[単項生成の分解定理](#thm-anf4-monogenic-factorization)から順に $(e,f)=(2,1)$、$(1,1)$ が二つ、$(1,2)$ となります。

**$p=2$ の場合。** $D_K$ が偶数なら $d\equiv2,3\pmod4$ で $h(T)=T^2-d$ です。$d$ が偶数なら $\overline h=T^2$、奇数なら $\overline h=T^2+1=(T+1)^2$ です。いずれも一次因子の二乗なので分岐します。

$D_K$ が奇数なら $d\equiv1\pmod4$ で、

$$
\overline h(T)=T^2+T+\overline{(1-d)/4}\quad\text{in }\mathbb F_2[T].
$$

$d\equiv1\pmod8$ なら $(1-d)/4$ は偶数で、$\overline h=T(T+1)$ は異なる一次因子を持ちます。$d\equiv5\pmod8$ なら $(1-d)/4$ は奇数で、$\overline h=T^2+T+1$ は $0,1$ のどちらも根に持たないので既約です。$D_K=d$ より、これは $D_K\bmod8$ による判定です。

全ての素数について三つの分解型が尽くされ、二乗因子の出現（分岐）と $p\mid D_K$ が一致します。
<!-- proof-end -->

### 具体例：$\mathbb Q(\sqrt{-5})$

$s=\sqrt{-5}$、$A=\mathbb Z[s]$、$h=T^2+5$、$D_K=-20$ です。

- **$p=2$**：$\overline h=T^2+1=(T+1)^2$ より $\mathfrak p_2=(2,s+1)$、$(2)=\mathfrak p_2^2$、$e=2,f=1$。
- **$p=3$**：$\overline h=T^2+2=(T-1)(T+1)$ より $\mathfrak q_+=(3,s-1)$、$\mathfrak q_-=(3,s+1)$、$(3)=\mathfrak q_+\mathfrak q_-$。それぞれ $e=f=1$。
- **$p=5$**：$\overline h=T^2$ より $\mathfrak p_5=(5,s)$、$(5)=\mathfrak p_5^2$、$e=2,f=1$。
- **$p=11$**：$-5\equiv6\pmod{11}$ は非平方（非零平方は $1,3,4,5,9$）なので $\overline h$ は既約、$(11)$ は素イデアル、$e=1,f=2$。

最初の二例は [ANF3 の $6$ の分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)とも一致します。分岐する素数は判別式 $-20$ を割る $2,5$ に限られます。

### 具体例：$\mathbb Q(\sqrt5)$ で $2$ と $5$

$\theta=(1+\sqrt5)/2$、$h=T^2-T-1$、$D_K=5$ です。法 $2$ では

$$
\overline h=T^2+T+1
$$

が既約なので $(2)$ は惰性で、$N((2))=2^2=4$ です。法 $5$ では $\overline h=(T-3)^2$ なので $\mathfrak p=(5,\theta-3)$ について $(5)=\mathfrak p^2$、$N(\mathfrak p)=5$ です。「同じ二次体の素数」でも、剰余体の次数と分岐指数は異なります。

## 6. 演習：次数・判別式・商環を往復する

**Level A：三つの数値と小さな素数の計算**

### A1. 有理素数の基本形

$K=\mathbb Q(\sqrt2)$、$p=3$ とする。$T^2-2$ を法 $3$ で調べ、$(3)$ の分解型、$g$、$e_i$、$f_i$ と $N((3))$ を求めよ。

- Level: A
- ID: ANF4-A1

<!-- solution-start -->
**詳細解答**　$\overline h=T^2+1$ です。$T=0,1,2$ を代入した値は順に $1,2,2$ なので根はありません。二次式なので既約です。[単項生成の分解定理](#thm-anf4-monogenic-factorization)より $(3)$ 自身が素イデアル、$g=1,e_1=1,f_1=2$ で惰性です。[次数公式](#thm-anf4-fundamental-identity)では $1\cdot2=2$。整数基底 $(1,\sqrt2)$ での加法商は $\mathbb F_3^2$ なので $N((3))=3^2=9$ です。
<!-- solution-end -->

### A2. 二つの素イデアルを作る

$K=\mathbb Q(\sqrt{-5})$、$s=\sqrt{-5}$、$p=3$ とする。$A=\mathbb Z[s]$ における $(3)$ の素イデアルと各剰余体を求めよ。

- Level: A
- ID: ANF4-A2

<!-- solution-start -->
**詳細解答**　$T^2+5\equiv T^2-1=(T-1)(T+1)\pmod3$ です。従って [単項生成の分解定理](#thm-anf4-monogenic-factorization)より

$$
(3)=(3,s-1)(3,s+1).
$$

一方の商では $s=1$、他方では $s=-1$ で、どちらも $\mathbb F_3$ と同型です。それぞれ $f=1$、因子が重ならないので $e=1$。$g=2$、$e_1f_1+e_2f_2=1+1=2$ を確認できます。
<!-- solution-end -->

### A3. 法 $2$ の既約性

$K=\mathbb Q(\sqrt5)$、$\theta=(1+\sqrt5)/2$ とする。$(2)$ が惰性であることを $\theta$ の最小多項式から確かめよ。

- Level: A
- ID: ANF4-A3

<!-- solution-start -->
**詳細解答**　$\theta^2-\theta-1=0$ なので $h=T^2-T-1$。法 $2$ で $\overline h=T^2+T+1$ です。$\overline h(0)=1$、$\overline h(1)=1+1+1=1$ で、$\mathbb F_2$ に根がなく既約です。$A=\mathbb Z[\theta]$ なので [分解定理](#thm-anf4-monogenic-factorization)から $(2)$ は素イデアル、$e=1,f=2$ です。剰余体は $\mathbb F_2[T]/(T^2+T+1)$ で4元あります。
<!-- solution-end -->

### A4. 判別式が割れる素数

$K=\mathbb Q(\sqrt5)$ について $p=5$ の分解を判別式と多項式の両方から求めよ。

- Level: A
- ID: ANF4-A4

<!-- solution-start -->
**詳細解答**　[二次体の判別式公式](../ANF2/index.md#thm-anf2-quadratic-discriminant)から $D_K=5$ で、$5\mid D_K$ です。[二次体の分裂定理](#thm-anf4-quadratic-splitting)より分岐します。直接には $h=T^2-T-1$ を法 $5$ に落として

$$
(T-3)^2=T^2-6T+9\equiv T^2-T-1\pmod5
$$

です。$\mathfrak p=(5,\theta-3)$ とすると $(5)=\mathfrak p^2$、$e=2,f=1$。$A/\mathfrak p\cong\mathbb F_5$ なので $N(\mathfrak p)=5$ です。
<!-- solution-end -->

### A5. 非平方と剰余次数

$K=\mathbb Q(\sqrt{-5})$、$p=11$ とする。$T^2+5$ の法 $11$ での既約性を示し、$(11)$ のノルムを求めよ。

- Level: A
- ID: ANF4-A5

<!-- solution-start -->
**詳細解答**　$\overline h=T^2-6$ です。$\mathbb F_{11}$ の非零平方を $1^2,\ldots,5^2$ で求めると $1,4,9,5,3$ であり $6$ はありません。従って二次式 $\overline h$ は根を持たず既約です。[分解定理](#thm-anf4-monogenic-factorization)から $(11)$ は素イデアル、$e=1,f=2$。よって [素イデアル冪のノルム](#lem-anf4-prime-power-norm)により $N((11))=11^2=121$ です。
<!-- solution-end -->

**Level B：指数の根拠と判定方法を接続する**

### B1. 次数6の分解データ

ある次数 $6$ の数体 $K/\mathbb Q$ と有理素数 $p$ について、$(p)$ が相異なる三素イデアル $\mathfrak p_1,\mathfrak p_2,\mathfrak p_3$ に分かれ、$(e_i,f_i)$ が順に $(2,1),(1,2),(1,2)$ だったと仮定する。次数公式を検算し、$N(\mathfrak p_i)$、$N((p))$、および分岐の有無を求めよ。

- Level: B
- ID: ANF4-B1

<!-- solution-start -->
**詳細解答**　[次数公式](#thm-anf4-fundamental-identity)の左辺は

$$
2\cdot1+1\cdot2+1\cdot2=6
$$

で、$[K:\mathbb Q]=6$ に一致します。[イデアルノルムの定義](#def-anf4-ideal-norm)および [素イデアル冪の補題](#lem-anf4-prime-power-norm)から、$N(\mathfrak p_1)=p$、$N(\mathfrak p_2)=N(\mathfrak p_3)=p^2$。従って

$$
N((p))=p^{2\cdot1}\,p^{1\cdot2}\,p^{1\cdot2}=p^6.
$$

$e_1=2>1$ なので分岐します。ただし $g=3$ であり、完全分裂でも惰性でもありません。$e_2f_2=2$ だけを次数6と誤って等置しない点が重要です。
<!-- solution-end -->

### B2. 分岐をイデアルの積でも確かめる

$K=\mathbb Q(\sqrt{-5})$、$s=\sqrt{-5}$ とし、$\mathfrak p=(2,1+s)$ と置く。$(2)=\mathfrak p^2$ を、生成元とノルムの二つの観点から示せ。

- Level: B
- ID: ANF4-B2

<!-- solution-start -->
**詳細解答**　積イデアルは

$$
\mathfrak p^2=(4,\ 2(1+s),\ (1+s)^2).
$$

$s^2=-5$ より $(1+s)^2=1+2s-5=2(s-2)$。従って全生成元が $2A$ に属し $\mathfrak p^2\subseteq(2)$ です。また $A/\mathfrak p$ では $s=-1=1$、$2=0$ なので $\mathbb F_2$ となり $N(\mathfrak p)=2$。[素イデアル冪のノルム](#lem-anf4-prime-power-norm)は $N(\mathfrak p^2)=2^2=4$ を与えます。一方、整数基底 $(1,s)$ により $N((2))=2^2=4$。包含 $\mathfrak p^2\subseteq(2)$ は有限商への全射 $A/\mathfrak p^2\to A/(2)$ を与え、両辺は4元なので同型です。よって $\mathfrak p^2=(2)$ です。したがって $e=2,f=1$ で、$p=2$ は分岐します。
<!-- solution-end -->

### B3. $2$ の分解を法 $8$ で決める

平方自由な $d\equiv1\pmod4$ に対し、$K=\mathbb Q(\sqrt d)$ の素数 $2$ が、$d\equiv1\pmod8$ で完全分裂し、$d\equiv5\pmod8$ で惰性となることを自分で導出せよ。$d=17$ と $d=-3$ を検算せよ。

- Level: B
- ID: ANF4-B3

<!-- solution-start -->
**詳細解答**　[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)より $\theta=(1+\sqrt d)/2$ は整数環を生成し、$h=T^2-T+(1-d)/4$ です。$d\equiv1\pmod8$ なら $(1-d)/4$ は偶数なので

$$
\overline h=T^2+T=T(T+1)\quad(\bmod 2).
$$

二つの一次因子は異なるため完全分裂、各 $e=f=1$ です。$d\equiv5\pmod8$ なら $(1-d)/4$ は奇数で、$\overline h=T^2+T+1$ は $0,1$ を代入しても零にならず、既約です。従って惰性、$e=1,f=2$ です。$17\equiv1\pmod8$ なので $K=\mathbb Q(\sqrt{17})$ では完全分裂します。$-3\equiv5\pmod8$ なので $K=\mathbb Q(\sqrt{-3})$ では惰性です。いずれも判別式は奇数で、分岐ではありません。
<!-- solution-end -->

### B4. 剰余次数とノルムから因子の重複を読む

$K=\mathbb Q(\sqrt{13})$、$\theta=(1+\sqrt{13})/2$ とする。素数 $3$ と $13$ の分解型を決め、各素イデアルの剰余次数と $(3),(13)$ のノルムを説明せよ。

- Level: B
- ID: ANF4-B4

<!-- solution-start -->
**詳細解答**　整数環は $\mathbb Z[\theta]$ で、$h=T^2-T-3$、判別式は $D_K=13$ です。法 $3$ では

$$
\overline h=T^2-T=T(T-1),
$$

二つの相異なる一次因子が現れます。従って $\mathfrak p_0=(3,\theta)$、$\mathfrak p_1=(3,\theta-1)$ として $(3)=\mathfrak p_0\mathfrak p_1$、各 $f=1,e=1$ です。よって $N(\mathfrak p_i)=3$、$N((3))=3^2=9$。

法 $13$ では判別式が零です。二重根は $1/2\equiv7\pmod{13}$ なので $\overline h=(T-7)^2$、$\mathfrak q=(13,\theta-7)$ に対して $(13)=\mathfrak q^2$、$e=2,f=1$ です。$N(\mathfrak q)=13$ なので $N((13))=13^2=169$。同じ二次体でも、$3$ は完全分裂、$13$ は分岐です。
<!-- solution-end -->

**Level C：元の分解・素イデアル・判別式を統合する**

### C1. $\mathbb Q(\sqrt{-5})$ の $2,3,5,11$ と $(6)$

$K=\mathbb Q(\sqrt{-5})$、$s=\sqrt{-5}$、$A=\mathbb Z[s]$ とする。

1. 体の判別式を求め、$2,3,5,11$ の分裂型を決めよ。
2. 上の4素数について $(p)$ の素イデアル分解と各 $(e_i,f_i)$ を明示し、次数公式を検算せよ。
3. $(6)$ の素イデアル分解を求め、剰余類の個数 $N((6))$ が $36$ となることを確かめよ。
4. $6=2\cdot3=(1+s)(1-s)$ という元の異なる分解と、上のイデアル分解が矛盾しない理由を説明せよ。

- Level: C
- ID: ANF4-C1

<!-- solution-start -->
**詳細解答**

**1. 判別式。** $-5\equiv3\pmod4$ なので $A=\mathbb Z[s]$、$\theta=s$ の多項式は $h=T^2+5$ です。[二次体の判別式公式](../ANF2/index.md#thm-anf2-quadratic-discriminant)から $D_K=4(-5)=-20$。これを割る $2,5$ は [二次体の分岐判定](#thm-anf4-quadratic-splitting)で分岐します。$p=3$ では $D_K\equiv1$ は非零平方なので完全分裂、$p=11$ では $D_K\equiv2$ で非平方（平方集合 $1,3,4,5,9$）なので惰性です。

**2. イデアルと指数。** 多項式を法 $p$ へ落として [単項生成の分解定理](#thm-anf4-monogenic-factorization)を適用します。

- $p=2$：$T^2+5\equiv(T+1)^2$。$\mathfrak p_2=(2,s+1)$ で $(2)=\mathfrak p_2^2$、$(e,f)=(2,1)$。
- $p=3$：$T^2+5\equiv(T-1)(T+1)$。$\mathfrak q_+=(3,s-1)$、$\mathfrak q_-=(3,s+1)$ で $(3)=\mathfrak q_+\mathfrak q_-$、各 $(e,f)=(1,1)$。
- $p=5$：$T^2+5\equiv T^2$。$\mathfrak p_5=(5,s)$ で $(5)=\mathfrak p_5^2$、$(e,f)=(2,1)$。
- $p=11$：$T^2+5\equiv T^2-6$ は根を持たず既約。$(11)$ そのものが素イデアルで $(e,f)=(1,2)$。

どの場合も $\sum e_i f_i$ はそれぞれ $2\cdot1=2$、$1\cdot1+1\cdot1=2$、$2\cdot1=2$、$1\cdot2=2$ となり、$[K:\mathbb Q]=2$ に一致します。

**3. $(6)$ とノルム。** $(6)=(2)(3)$ なので [素イデアル分解の一意性](../ANF3/index.md#thm-anf3-prime-ideal-factorization)から

$$
(6)=\mathfrak p_2^2\mathfrak q_+\mathfrak q_-.
$$

[素イデアル冪のノルム](#lem-anf4-prime-power-norm)と互いに素な商の積より

$$
N((6))=N(\mathfrak p_2^2)N(\mathfrak q_+)N(\mathfrak q_-)
=2^2\cdot3\cdot3=36.
$$

これは整数基底 $(1,s)$ からの $A/(6)\cong(\mathbb Z/6\mathbb Z)^2$ の36元とも一致します。

**4. 元とイデアル。** 元では $6=2\cdot3=(1+s)(1-s)$ と異なる既約因子の積を持ちますが、素イデアルに直すとどちらも上の **同じ一意な分解**になります。[ANF3 の具体計算](../ANF3/index.md#thm-anf3-prime-ideal-factorization)のとおり、元が一意分解しないことと、イデアルが一意分解することは両立します。分岐指数 $2$ は「元 $2$ が平方である」とは主張していません。
<!-- solution-end -->

## 7. 次講への橋

この講で素数の分解を整数環の有限商として計算し、二次体では分岐する素数が判別式を割ることまで証明しました。次の ANF5「Minkowski埋め込みと格子」では、整数基底を実・複素埋め込みで Euclid 空間の格子へ写し、イデアルの小さい元を探す幾何学的な方法を学びます。
