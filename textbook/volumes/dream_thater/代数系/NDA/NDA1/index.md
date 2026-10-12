# NDA1 連分数と最良有理近似の精密化

[NT7の収束分数の誤差定理](../../NT/NT7/index.md#thm-nt7-convergent-error)は、無理数 $\alpha$ に対して $p_n/q_n$ が分母の二乗の速さで近づくことを示しました。しかし、同じ二乗のオーダーでも係数はどのくらい小さいのでしょうか。また、NT7の「最良」は $|q\alpha-p|$ に関するものであり、分数そのものの距離 $|\alpha-p/q|$ の最良性とは違います。

例えば $\sqrt2$ に近い $3/2$ と $4/3$ では、分数としては $4/3$ の方が近いのに、分母を掛けた誤差は $3/2$ の方が小さくなります。これを偶然の数値例ではなく、連分数の途中で現れる分数の構造から理解するのが前半の目標です。

後半では、[NT7の平方根の周期性](../../NT/NT7/index.md#thm-nt7-square-root-periodic)を一般の実二次無理数へ広げます。平方根とは違う形の数でも、完全商の共役を追跡すると、ある時点以降は有限個の整数状態だけが残ります。最終周期性が成立する必要十分条件まで示します。

## 1. 近似誤差の定数を取り出す

ここでは $\alpha$ を無理数とし、$a_n,p_n,q_n,\alpha_n$ を[NT7の連分数と収束分数](../../NT/NT7/index.md#def-nt7-convergent)の記号で表します。特に $q_{-1}=0,q_0=1$、$q_n>0$ です。

誤差 $|\alpha-p_n/q_n|$ に $q_n^2$ を掛けると、分母の大きさだけによる減少を除いた近似の質が見えます。この値を正確に計算しておきます。

<a id="def-nda1-normalized-error"></a>

<!-- formal-statement-start -->
> **定義（正規化近似誤差）**  
> 無理数 $\alpha$ の第 $n$ 収束分数 $p_n/q_n$（$n\ge0$）に対し、正規化近似誤差を次で定める。

$$
\theta_n(\alpha)=q_n^2\left|\alpha-\frac{p_n}{q_n}\right|.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda1-normalized-error -->
**定義の確認**：$\alpha=\sqrt2$ の $p_1/q_1=3/2$ について、$n=1,q_1=2$ を代入すると

$$
\theta_1(\sqrt2)=4\left(\frac32-\sqrt2\right)=6-4\sqrt2>0
$$

です。$3/2>\sqrt2$ は $9>8$ から確認できます。誤差そのものと、二乗を掛けた正規化誤差を区別しました。
<!-- definition-example-end -->

<a id="prop-nda1-exact-error"></a>

<!-- formal-statement-start -->
> **命題（正規化誤差の完全商表示）**  
> 無理数 $\alpha$ のすべての $n\ge0$ について、次の等式と厳密な不等式が成立する。

$$
\theta_n(\alpha)=
\frac1{\alpha_{n+1}+q_{n-1}/q_n},
$$

$$
\frac1{a_{n+1}+1+q_{n-1}/q_n}
<\theta_n(\alpha)<
\frac1{a_{n+1}+q_{n-1}/q_n}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

完全商を残した[差積恒等式と完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)を、近似の差の分子に適用します。残った分母を $q_n^2$ で正規化し、$a_{n+1}<\alpha_{n+1}<a_{n+1}+1$ を代入します。

<!-- proof-start -->
### 証明

[NT7の完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)を固定した $n$ に適用すると、

$$
\alpha=\frac{p_n\alpha_{n+1}+p_{n-1}}
{q_n\alpha_{n+1}+q_{n-1}}.
$$

よって分子を通分して

$$
\begin{aligned}
q_n\alpha-p_n
&=\frac{q_np_{n-1}-p_nq_{n-1}}
{q_n\alpha_{n+1}+q_{n-1}}\\
&=\frac{(-1)^n}{q_n\alpha_{n+1}+q_{n-1}}.
\end{aligned}
$$

二行目の符号 $(-1)^n$ は[NT7の収束分数の差積恒等式と完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)に代入して確かめられます。分母は正なので絶対値を取り、さらに $q_n^2|\alpha-p_n/q_n|=q_n|q_n\alpha-p_n|$ を代入して

$$
\begin{aligned}
\theta_n(\alpha)
&=\frac{q_n}{q_n\alpha_{n+1}+q_{n-1}}\\
&=\frac1{\alpha_{n+1}+q_{n-1}/q_n}
\end{aligned}
$$

を得ます。完全商は無理数であり、定義から $a_{n+1}<\alpha_{n+1}<a_{n+1}+1$ です。正の分母について逆数を取れば、表示した両側の厳密不等式が従います。
<!-- proof-end -->

**読み方**：次の部分商 $a_{n+1}$ が大きいほど $\theta_n$ は小さくなります。「すべての収束分数は二乗のオーダーで近づく」という事実より一歩進み、近似の鋭さが次の整数部分と直前の分母比で決まることが分かりました。

## 2. 収束分数の途中にも有理近似がある

収束分数 $p_{n-1}/q_{n-1}$ から $p_n/q_n$ へ進むとき、[漸化式](../../NT/NT7/index.md#def-nt7-convergent)では $p_{n-2}$ に $a_np_{n-1}$ を足し、分母でも同じことをします。係数を $1,2,\ldots,a_n$ と一つずつ増やした分数も調べられます。整数格子上の二つのベクトルを足すだけなので、計算可能です。

<a id="def-nda1-intermediate"></a>

<!-- formal-statement-start -->
> **定義（中間収束分数）**  
> 無理数 $\alpha=[a_0;a_1,a_2,\ldots]$ とその収束分数 $p_j/q_j$ に対し、$n\ge1$ と整数 $1\le m\le a_n$ で

$$
P_{n,m}=p_{n-2}+mp_{n-1},\qquad
Q_{n,m}=q_{n-2}+mq_{n-1}
$$

> と置く。$P_{n,m}/Q_{n,m}$ をこの段の中間収束分数と呼ぶ。終点 $m=a_n$ は $p_n/q_n$ であり、特に $1\le m<a_n$ のものを狭義の中間収束分数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda1-intermediate -->
**定義の確認**：$\sqrt2=[1;2,2,\ldots]$ において、$n=2$ の直前の二組は $(p_0,q_0)=(1,1)$、$(p_1,q_1)=(3,2)$ です。$a_2=2$ だから

$$
\frac{P_{2,1}}{Q_{2,1}}=\frac{1+3}{1+2}=\frac43,\qquad
\frac{P_{2,2}}{Q_{2,2}}=\frac{1+2\cdot3}{1+2\cdot2}=\frac75.
$$

> いずれも正の分母を持ち、後者が収束分数で前者が狭義の中間収束分数です。
<!-- definition-example-end -->

<a id="prop-nda1-intermediate-error"></a>

<!-- formal-statement-start -->
> **命題（中間収束分数の誤差公式）**  
> 上記の $n\ge1$、$1\le m\le a_n$ に対して、$P_{n,m},Q_{n,m}$ は互いに素であり、

$$
Q_{n,m}\alpha-P_{n,m}
=\frac{(-1)^{n-2}(\alpha_n-m)}
{q_{n-1}\alpha_n+q_{n-2}}.
$$

> 特に $Q_{n,m}>0$、$\alpha_n-m>0$ であり、符号は $(-1)^{n-2}$ で決まる。
<!-- formal-statement-end -->

### 証明の見取り図

新しい分子・分母は連続する二組の整数線形結合です。隣り合う整数組の差積が $\pm1$ であることから既約性が分かり、完全商公式へ代入すると $m$ と $\alpha_n$ の差だけが残ります。

<!-- proof-start -->
### 証明

[NT7の差積恒等式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)に $n-1$ を代入すると

$$
p_{n-1}q_{n-2}-p_{n-2}q_{n-1}=(-1)^{n-2}.
$$

したがって

$$
\begin{aligned}
P_{n,m}q_{n-1}-Q_{n,m}p_{n-1}
&=(p_{n-2}+mp_{n-1})q_{n-1}\\
&\quad-(q_{n-2}+mq_{n-1})p_{n-1}\\
&=p_{n-2}q_{n-1}-q_{n-2}p_{n-1}\\
&=(-1)^{n-1}.
\end{aligned}
$$

左辺が $\pm1$ なので $P_{n,m},Q_{n,m}$ の公約数は $1$ です。また $Q_{n,m}=q_{n-2}+mq_{n-1}>0$ です。

[完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)を $n-1$ に適用して

$$
\alpha=\frac{p_{n-1}\alpha_n+p_{n-2}}
{q_{n-1}\alpha_n+q_{n-2}}
$$

を得ます。この式へ $Q_{n,m}$ を掛けて $P_{n,m}$ を引くと、

$$
\begin{aligned}
Q_{n,m}\alpha-P_{n,m}
&=\frac{(q_{n-2}+mq_{n-1})(p_{n-1}\alpha_n+p_{n-2})}
{q_{n-1}\alpha_n+q_{n-2}}\\
&\quad-(p_{n-2}+mp_{n-1})\\
&=\frac{(\alpha_n-m)(p_{n-1}q_{n-2}-p_{n-2}q_{n-1})}
{q_{n-1}\alpha_n+q_{n-2}}\\
&=\frac{(-1)^{n-2}(\alpha_n-m)}
{q_{n-1}\alpha_n+q_{n-2}}
\end{aligned}
$$

となります。$m\le a_n<\alpha_n$ と分母の正値性から符号も確定します。
<!-- proof-end -->

中間分数は勝手に作った分数ではなく、完全商を整数 $m$ に置き換えたものです。次に「何を最良と呼ぶか」で役割が変わることを調べます。

## 3. 第一種と第二種の最良近似は一致しない

[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)では $|q\alpha-p|$ を比較しました。ここでは $|\alpha-p/q|$ を直接比較する基準も導入します。

<a id="def-nda1-first-kind"></a>

<!-- formal-statement-start -->
> **定義（第一種最良近似）**  
> 無理数 $\alpha$ に対し、既約分数 $p/q$（$p\in\mathbb Z,q\ge1$）が第一種最良近似であるとは、$1\le s\le q$ となる整数 $r,s$ に対して、$r/s\ne p/q$ なら

$$
\left|\alpha-\frac pq\right|
<\left|\alpha-\frac rs\right|
$$

> が成立することをいう。これに対し、同じ分母制約の下で $|q\alpha-p|$ を比較するものを第二種という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda1-first-kind -->
**定義の確認**：$\sqrt2$ に対し $4/3$ の分母は $3$ です。$s=1,2,3$ それぞれで最も近い整数を分子に選ぶと $1/1,3/2,4/3$ が候補です。距離は

$$
\sqrt2-1,\qquad
\frac32-\sqrt2,\qquad
\sqrt2-\frac43.
$$

> $1<4/3<\sqrt2<3/2$、かつ $\sqrt2-4/3<3/2-\sqrt2$（すなわち $2\sqrt2<17/6$）なので、$4/3$ は第一種最良近似です。同じ分母で他の整数分子を取れば距離はこれより大きくなります。
<!-- definition-example-end -->

<a id="prop-nda1-kind-comparison"></a>

<!-- formal-statement-start -->
> **命題（中間収束分数による第一種・第二種比較）**  
> 無理数 $\alpha$、$n\ge2$、$1\le m<a_n$ に対し、狭義の中間収束分数 $P_{n,m}/Q_{n,m}$ を考える。この分数は直前の収束分数 $p_{n-1}/q_{n-1}$ より第二種誤差が必ず大きい。一方、第一種誤差が直前の収束分数より小さくなる必要十分条件は

$$
\alpha_n<2m+\frac{q_{n-2}}{q_{n-1}}
$$

> である。等号の場合には第一種誤差が等しい。
<!-- formal-statement-end -->

### 証明の見取り図

二つの誤差に同じ正の分母が現れます。第二種では $\alpha_n-m>1$ が効き、第一種では分母 $Q_{n,m}$ による割り算が判定を逆転させます。

<!-- proof-start -->
### 証明

[中間収束分数の誤差公式](#prop-nda1-intermediate-error)より

$$
|Q_{n,m}\alpha-P_{n,m}|
=\frac{\alpha_n-m}{q_{n-1}\alpha_n+q_{n-2}}.
$$

一方、[NT7の完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)を同じ $n-1$ に用いれば、差積が $\pm1$ なので

$$
|q_{n-1}\alpha-p_{n-1}|
=\frac1{q_{n-1}\alpha_n+q_{n-2}}.
$$

$m\le a_n-1$ と $\alpha_n>a_n$ から $\alpha_n-m>1$ です。よって前者は後者より大きく、第二種では改良になりません。

第一種では両者をそれぞれ正の分母 $Q_{n,m}$ と $q_{n-1}$ で割ります。同じ正の分母 $q_{n-1}\alpha_n+q_{n-2}$ を除くと、改善条件は

$$
\frac{\alpha_n-m}{Q_{n,m}}<\frac1{q_{n-1}}.
$$

さらに $Q_{n,m}=q_{n-2}+mq_{n-1}$ を代入し、正の数を掛けて

$$
(\alpha_n-m)q_{n-1}
<q_{n-2}+mq_{n-1}
$$

を得ます。両辺を $q_{n-1}>0$ で割り $m$ を移せば、表示した条件と同値です。
<!-- proof-end -->

**二種類を実際に比べる**：$\alpha=\sqrt2$、$n=2$、$m=1$ なら $\alpha_2=1+\sqrt2$、$q_0=1,q_1=2$ です。第一種の改善条件は

$$
1+\sqrt2<2+\frac12.
$$

これは $\sqrt2<3/2$ と等価で、平方して $2<9/4$ から成立します。一方、第二種では

$$
|3\sqrt2-4|=3\sqrt2-4
>3-2\sqrt2=|2\sqrt2-3|.
$$

つまり $4/3$ は、分数の距離では $3/2$ に勝ちますが、分母を掛けた距離では負けます。したがって[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)を第一種の主張に読み替えることはできません。全ての中間収束分数が第一種最良近似になるわけでもなく、上の条件はあくまで直前の収束分数との比較です。

## 4. 一般の二次無理数はなぜ最終周期的なのか

[平方根の場合の証明](../../NT/NT7/index.md#thm-nt7-square-root-periodic)では、完全商が $(\sqrt D+m_n)/d_n$ と書け、整数対が有限個になることを利用しました。一般の実二次無理数では、初めから共役完全商が負の範囲に入るとは限りません。この一点を解消すれば、同じ有限状態の議論を拡張できます。

ここで**実二次無理数**とは、有理係数の既約二次多項式を零にする実数をいいます。判別式が正となる既約二次方程式には二つの異なる実根があり、この数と別の根（共役）を区別して扱えます。

まず、連分数の整数部分が「最初から」周期になる必要はないことを定式化します。

<a id="def-nda1-eventual-periodicity"></a>

<!-- formal-statement-start -->
> **定義（最終周期連分数）**  
> 無理数 $\alpha=[a_0;a_1,a_2,\ldots]$ に対して、整数 $N\ge1,L\ge1$ が存在し、すべての $n\ge N$ で

$$
a_{n+L}=a_n
$$

> となるとき、$\alpha$ の単純連分数は最終周期的であるという。$N$ より前の有限部分を非周期部分、$L$ を周期の一つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda1-eventual-periodicity -->
**定義の確認**：$\alpha=(1+\sqrt3)/2$ では

$$
\begin{aligned}
\alpha_0&=\frac{1+\sqrt3}{2},&a_0&=1,\\
\alpha_1&=\frac1{\alpha_0-1}=1+\sqrt3,&a_1&=2,\\
\alpha_2&=\frac1{\alpha_1-2}=\frac{1+\sqrt3}{2},&a_2&=1.
\end{aligned}
$$

> 次に $\alpha_3=\alpha_1$ なので、$a_1,a_2,a_3,\ldots=2,1,2,1,\ldots$ となります。したがって $N=1,L=2$ が定義の条件を満たします。
<!-- definition-example-end -->

<a id="thm-nda1-lagrange"></a>

<!-- formal-statement-start -->
> **定理（Lagrangeの最終周期性と逆向き）**  
> 無理数 $\alpha\in\mathbb R$ について、次の二条件は同値である。
>
> 1. $\alpha$ は有理係数の既約二次多項式の根である。
> 2. $\alpha$ の単純連分数は最終周期的である。
<!-- formal-statement-end -->

### 証明の見取り図

順方向では、$\alpha$ と共役 $\alpha'$ を用い、収束分数が $\alpha$ に近づく一方、$\alpha'$ には近づかないことから、十分後の共役完全商が $(-1,0)$ に入ると示します。そこから整数対の状態が有限であることを証明します。逆方向では、周期を一巡しても値が変わらない一次分数変換を作り、二次方程式を得ます。

<!-- proof-start -->
### 証明

**（二次無理数なら最終周期的）**

整数係数の既約二次方程式を $A\alpha^2+B\alpha+C=0$ と書き、必要なら符号を反転して $A>0$ とします。判別式 $D=B^2-4AC$ は正で平方数ではありません。二つの根は

$$
\frac{-B+\sqrt D}{2A},\qquad
\frac{-B-\sqrt D}{2A}
$$

です。後者は $(B+\sqrt D)/(-2A)$ とも書けます。よってどちらの根 $\alpha$ を取っても、整数 $P_0,Q_0$ で

$$
\alpha_0=\alpha=\frac{P_0+\sqrt D}{Q_0},
\qquad Q_0\ne0,\qquad
Q_0\mid(D-P_0^2)
$$

と表せます。最後の可除性は $D-B^2=-4AC$ と $Q_0=\pm2A$ から従います。

[連分数の完全商](../../NT/NT7/index.md#def-nt7-continued-fraction)に従って $a_n=\lfloor\alpha_n\rfloor$ と置きます。帰納的に $\alpha_n=(P_n+\sqrt D)/Q_n$ かつ $Q_n\mid(D-P_n^2)$ と表されるとき、

$$
\begin{aligned}
\alpha_{n+1}
&=\frac1{\alpha_n-a_n}
=\frac{Q_n}{\sqrt D+P_n-a_nQ_n}\\
&=\frac{Q_n(\sqrt D-P_n+a_nQ_n)}
{D-(P_n-a_nQ_n)^2}
\end{aligned}
$$

です。そこで

$$
P_{n+1}=a_nQ_n-P_n,\qquad
Q_{n+1}=\frac{D-P_{n+1}^2}{Q_n}
$$

と定めれば $\alpha_{n+1}=(P_{n+1}+\sqrt D)/Q_{n+1}$ です。$P_{n+1}\equiv-P_n\pmod{Q_n}$ なので、帰納法の仮定 $Q_n\mid(D-P_n^2)$ から

$
D-P_{n+1}^2\equiv D-P_n^2\equiv0\pmod{Q_n}
$

です。従って $Q_{n+1}$ は整数であり、また

$
Q_nQ_{n+1}=D-P_{n+1}^2
$

から $Q_{n+1}\mid(D-P_{n+1}^2)$ も分かります。$D$ は平方数でないため全ての $Q_n$ は非零で、この操作は続けられます。

次は**十分後に共役完全商が $(-1,0)$ に入る**ことを示します。$\alpha'$ を $\alpha$ と異なる二次方程式の根とし、$\alpha'_n=(P_n-\sqrt D)/Q_n$ と置きます。有理数の四則演算と共役は両立します。[NT7の完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)を $n-1$ に適用してから共役を取ると、$n\ge1$ に対して

$$
\alpha'=\frac{p_{n-1}\alpha'_n+p_{n-2}}
{q_{n-1}\alpha'_n+q_{n-2}}.
$$

従って項を移し、分子分母に $-1$ を掛けて

$$
\alpha'_n
=-\frac{p_{n-2}-q_{n-2}\alpha'}
{p_{n-1}-q_{n-1}\alpha'}.
$$

ここで $\delta=\alpha-\alpha'\ne0$、$e_j=p_j-q_j\alpha$ と置きます。[NT7の誤差評価](../../NT/NT7/index.md#thm-nt7-convergent-error)により

$$
|e_j|<\frac1{q_{j+1}}\longrightarrow0,
\qquad
p_j-q_j\alpha'=q_j\delta+e_j.
$$

また、[分母の漸化式](../../NT/NT7/index.md#def-nt7-convergent)で $q_j\ge q_{j-1}+q_{j-2}$（$j\ge2$）であるため、$q_j\to\infty$ かつ $q_j-q_{j-1}\ge q_{j-2}\to\infty$ です。十分大きい $j$ では $q_j\delta+e_j$ は $\delta$ と同じ符号を持ち、さらに

$$
\begin{aligned}
|q_j\delta+e_j|-|q_{j-1}\delta+e_{j-1}|
&\ge|\delta|(q_j-q_{j-1})\\
&\quad-|e_j|-|e_{j-1}|>0.
\end{aligned}
$$

これを $j=n-1$ に使うと、十分大きい $n$ について共役完全商の式の分子・分母は同符号で、分子の絶対値は分母より小さくなります。したがって

$$
-1<\alpha'_n<0,\qquad \alpha_n>1
$$

が同時に成立します。後者は $n\ge1$ に対して $\alpha_n=1/(\alpha_{n-1}-a_{n-1})>1$ だからです。

整数状態 $(P_n,Q_n)$ が有界であることを示します。二つの完全商の差と和は

$$
\alpha_n-\alpha'_n=\frac{2\sqrt D}{Q_n},
\qquad
\alpha_n+\alpha'_n=\frac{2P_n}{Q_n}.
$$

十分大きい $n$ で $\alpha_n>1>\alpha'_n$ なので最初の式から $Q_n>0$、また $\alpha_n+\alpha'_n>0$ なので $P_n>0$ です。$\alpha'_n<0$ より $P_n<\sqrt D$、$\alpha_n>1$ より $Q_n<P_n+\sqrt D$ です。結局

$$
0<P_n<\sqrt D,\qquad
0<Q_n<2\sqrt D
$$

となります。整数対 $(P_n,Q_n)$ には有限個の候補しかありません。$a_n=\lfloor(P_n+\sqrt D)/Q_n\rfloor$ と次の整数対は現在の対から一意に決まります。同じ状態が二度現れた後は、その先の状態も部分商も一致し続けるので、連分数は最終周期的です。

**（最終周期的なら二次無理数）**

部分商が $N\ge1$ 以降で周期 $L\ge1$ を持つとし、周期の先頭から見た無限連分数の値を $\beta=\alpha_N$ と置きます。周期の一巡を表す写像を

$$
T(x)=a_N+\cfrac1{a_{N+1}+\cfrac1{\ddots+\cfrac1{a_{N+L-1}+1/x}}}
$$

とします。各段階は $x\mapsto a+1/x=(ax+1)/x$ なので、整数係数の一次分数変換の合成として

$$
T(x)=\frac{ux+v}{wx+z}
$$

と書けます。$a_N,\ldots,a_{N+L-1}\ge1$ のため、対応する行列 $\left(\begin{smallmatrix}a&1\\1&0\end{smallmatrix}\right)$ の積において $w>0$ です。周期性から $\beta=T(\beta)$ であり、

$$
w\beta^2+(z-u)\beta-v=0.
$$

$w>0$ なのでこれは零でない整数係数二次多項式です。$\beta$ は無限単純連分数であり、[有理数は有限連分数で停止する事実](../../NT/NT7/index.md#def-nt7-continued-fraction)から無理数です。従ってこの多項式は有理数上既約で、$\beta$ は二次無理数です。

最後に、[NT7の完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)を $n=N-1$ に適用すると、

$
\alpha=\frac{p_{N-1}\beta+p_{N-2}}{q_{N-1}\beta+q_{N-2}}
$

です。分母を払い、$\beta$ の項をまとめれば

$
(p_{N-1}-q_{N-1}\alpha)\beta
=q_{N-2}\alpha-p_{N-2}
$

となります。$p_{N-1}-q_{N-1}\alpha\ne0$ です。実際、ゼロなら $\alpha=p_{N-1}/q_{N-1}$ は有理数となり、仮定に反します。従って

$
\beta=\frac{q_{N-2}\alpha-p_{N-2}}{p_{N-1}-q_{N-1}\alpha}.
$

この式を先に得た $w\beta^2+(z-u)\beta-v=0$ に代入し、分母の二乗を掛けると

$
\begin{aligned}
0={}&w(q_{N-2}\alpha-p_{N-2})^2\\
&+(z-u)(q_{N-2}\alpha-p_{N-2})(p_{N-1}-q_{N-1}\alpha)\\
&-v(p_{N-1}-q_{N-1}\alpha)^2.
\end{aligned}
$

右辺は $\alpha$ に関する整数係数の次数高々 $2$ の多項式です。また、[NT7の差積恒等式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)から

$
p_{N-1}q_{N-2}-p_{N-2}q_{N-1}=(-1)^{N-2}\ne0
$

なので、$\alpha$ と $\beta$ の間の一次分数変換は可逆です。従って、零でない多項式 $wx^2+(z-u)x-v$ を代入して得た上の多項式は零多項式ではありません。$\alpha$ は無理数なので、非零の有理係数一次以下の多項式を満たせません。ゆえに得られた多項式は次数 $2$ で、有理数上既約です。
<!-- proof-end -->

**平方根だけではない具体例**：$\alpha=(1+\sqrt3)/2$ は $2\alpha^2-2\alpha-1=0$ の根です。上述の直接計算から

$$
\alpha=[1;\overline{2,1}]
$$

であり、実二次無理数の最終周期性を実際に確認できます。ここで横線は $2,1$ の反復を表し、平方根そのものに限る必要はありません。

**共役を追う意味**：$\alpha=(2+\sqrt2)/3$ なら共役は $(2-\sqrt2)/3$ で、最初はともに正です。しかし $a_0=1$ なので

$$
\alpha'_1=\frac1{(2-\sqrt2)/3-1}
=-3(\sqrt2-1)<-1.
$$

もう一段進むと $a_1=\lfloor3(1+\sqrt2)\rfloor=7$ で

$$
\alpha'_2=\frac1{\alpha'_1-7}\in(-1,0).
$$

この例でも初めから共役を $(-1,0)$ と仮定してはならず、証明で「十分大きい $n$」を取った理由が見えます。

## 5. 演習と詳細解答

### Level A：定義と公式を動かす

#### A1. 正規化誤差と次の部分商

$\alpha=\sqrt2$、$n=1$ について、完全商を用いた $\theta_1$ の値を求め、定義による $6-4\sqrt2$ と一致することを示せ。

- Level: A
- ID: NDA1-A1

<!-- solution-start -->
**詳細解答**　$\sqrt2=[1;2,2,\ldots]$ なので $\alpha_2=1+\sqrt2$ です。[正規化誤差の公式](#prop-nda1-exact-error)へ $q_0=1,q_1=2$ を代入すると

$$
\theta_1=\frac1{1+\sqrt2+1/2}
=\frac2{3+2\sqrt2}.
$$

有理化すると

$$
\frac2{3+2\sqrt2}
=\frac{2(3-2\sqrt2)}{9-8}
=6-4\sqrt2.
$$

これは $q_1^2|3/2-\sqrt2|=4(3/2-\sqrt2)$ と一致します。
<!-- solution-end -->

#### A2. 中間収束分数の構成

$\alpha=\sqrt3=[1;1,2,1,2,\ldots]$ で $n=2$ の $m=1,2$ に対応する分数を求め、既約性を差積で確認せよ。

- Level: A
- ID: NDA1-A2

<!-- solution-start -->
**詳細解答**　初めの収束分数は $p_0/q_0=1/1$、$p_1/q_1=2/1$ です。[中間収束分数の定義](#def-nda1-intermediate)へ代入すると

$$
\frac{P_{2,1}}{Q_{2,1}}=\frac{1+2}{1+1}=\frac32,
\qquad
\frac{P_{2,2}}{Q_{2,2}}=\frac{1+2\cdot2}{1+2\cdot1}=\frac53.
$$

最初の分数では $3\cdot1-2\cdot2=-1$、後者では $5\cdot1-3\cdot2=-1$ です。どちらも $P_{2,m}q_1-Q_{2,m}p_1=-1$ を満たすため、分子・分母は互いに素です。
<!-- solution-end -->

#### A3. 二種類の誤差を数字で見る

$\alpha=\sqrt2$ の $3/2$ と $4/3$ について、第一種と第二種の誤差をそれぞれ計算し、どちらが小さいかを根拠付きで答えよ。

- Level: A
- ID: NDA1-A3

<!-- solution-start -->
**詳細解答**　$4/3<\sqrt2<3/2$ は、それぞれ平方して $16/9<2<9/4$ と確認できます。従って第一種誤差は

$$
\left|\sqrt2-\frac43\right|=\sqrt2-\frac43,
\qquad
\left|\sqrt2-\frac32\right|=\frac32-\sqrt2.
$$

前者が小さいことは $2\sqrt2<17/6$ と同値であり、両辺が正なので平方して $8<289/36$ から分かります。第二種誤差は

$$
|3\sqrt2-4|=3\sqrt2-4,\qquad
|2\sqrt2-3|=3-2\sqrt2.
$$

前者が大きい条件は $5\sqrt2>7$ であり、平方すると $50>49$ です。よって第一種では $4/3$、第二種では $3/2$ が優れます。
<!-- solution-end -->

#### A4. 二次無理数の周期

$\alpha=(1+\sqrt3)/2$ について $\alpha_0,\alpha_1,\alpha_2,\alpha_3$ を求め、周期開始位置と周期を示せ。

- Level: A
- ID: NDA1-A4

<!-- solution-start -->
**詳細解答**　$a_0=1$、$\alpha_0-1=(\sqrt3-1)/2$ なので

$$
\alpha_1=\frac2{\sqrt3-1}
=\sqrt3+1,\qquad a_1=2.
$$

次は

$$
\alpha_2=\frac1{\sqrt3+1-2}
=\frac1{\sqrt3-1}
=\frac{\sqrt3+1}{2}=\alpha_0.
$$

従って $a_2=1$、$\alpha_3=1/(\alpha_2-1)=\alpha_1$ です。以後は $2,1$ が反復するため、$N=1,L=2$ が[最終周期性の定義](#def-nda1-eventual-periodicity)を満たし、$\alpha=[1;\overline{2,1}]$ となります。
<!-- solution-end -->

### Level B：誤差比較と共役の使い分け

#### B1. 中間分数の改善条件を導く

$n\ge2$、$1\le m<a_n$ に対し、中間収束分数が $p_{n-1}/q_{n-1}$ より第一種誤差を改善する条件を、誤差公式から再導出せよ。第二種では改善しない理由も示せ。

- Level: B
- ID: NDA1-B1

<!-- solution-start -->
**詳細解答**　[中間収束分数の誤差公式](#prop-nda1-intermediate-error)により、共通分母 $H=q_{n-1}\alpha_n+q_{n-2}>0$ に対して

$$
|Q_{n,m}\alpha-P_{n,m}|=\frac{\alpha_n-m}{H},
\qquad
|q_{n-1}\alpha-p_{n-1}|=\frac1H.
$$

狭義の中間分数では $m\le a_n-1$ なので $\alpha_n-m>1$、よって第二種では劣ります。第一種ではそれぞれ $Q_{n,m}$ と $q_{n-1}$ で割るから、

$$
\begin{aligned}
\left|\alpha-\frac{P_{n,m}}{Q_{n,m}}\right|
&<\left|\alpha-\frac{p_{n-1}}{q_{n-1}}\right|\\
&\Longleftrightarrow
\frac{\alpha_n-m}{HQ_{n,m}}<\frac1{Hq_{n-1}}\\
&\Longleftrightarrow
\alpha_n-m<m+\frac{q_{n-2}}{q_{n-1}}\\
&\Longleftrightarrow
\alpha_n<2m+\frac{q_{n-2}}{q_{n-1}}.
\end{aligned}
$$

正の数で掛け割りしたので、各段階は同値です。
<!-- solution-end -->

#### B2. 周期部分から二次方程式を作る

純周期連分数 $\beta=[\overline{2}]$ と、その前に $1$ を置いた $\alpha=[1;\overline2]$ の値を求めよ。周期を一巡した値が元に戻る方程式を実際に書くこと。

- Level: B
- ID: NDA1-B2

<!-- solution-start -->
**詳細解答**　周期の先頭へ戻るので $\beta=2+1/\beta$ です。$\beta>1$ を用いて

$$
\beta^2-2\beta-1=0,\qquad
\beta=\frac{2+\sqrt8}{2}=1+\sqrt2.
$$

先頭に $1$ を置いた連分数の値は

$$
\alpha=1+\frac1\beta
=1+\frac1{1+\sqrt2}
=1+(\sqrt2-1)=\sqrt2.
$$

$\alpha$ は $x^2-2=0$ の無理数根です。周期尾の二次方程式が、有限個の部分商を付けても二次方程式に変換される例となりました。
<!-- solution-end -->

#### B3. 共役は最初から範囲内とは限らない

$\alpha=(2+\sqrt2)/3$ と共役 $\alpha'=(2-\sqrt2)/3$ について、$\alpha_1,\alpha'_1,a_1,\alpha'_2$ を計算し、どの段階で $\alpha'_n\in(-1,0)$ となるかを確認せよ。

- Level: B
- ID: NDA1-B3

<!-- solution-start -->
**詳細解答**　$1<\alpha<2$ より $a_0=1$ です。分母を有理化すると

$$
\alpha_1=\frac1{\alpha-1}
=\frac3{\sqrt2-1}=3(\sqrt2+1).
$$

$7<3(\sqrt2+1)<8$ は $4/3<\sqrt2<5/3$ から分かるため $a_1=7$ です。一方、

$$
\alpha'_1=\frac1{\alpha'-1}
=-\frac3{1+\sqrt2}=-3(\sqrt2-1).
$$

$-3(\sqrt2-1)<-1$ は $\sqrt2>4/3$ によります。そこで

$$
\alpha'_2=\frac1{-3(\sqrt2-1)-7}.
$$

分母は $-7$ 未満なので $-1/7<\alpha'_2<0$、特に $-1<\alpha'_2<0$ です。$n=1$ の段階ではまだ範囲外、$n=2$ で範囲内に入ります。
<!-- solution-end -->

#### B4. 有理数と周期の境界

有理数 $19/7$ の連分数が有限回で止まることを確認し、無限の周期連分数と取り違えられない理由を説明せよ。また周期尾 $\beta=[\overline1]$ の二次方程式を求めよ。

- Level: B
- ID: NDA1-B4

<!-- solution-start -->
**詳細解答**　[NT7の連分数の構成](../../NT/NT7/index.md#def-nt7-continued-fraction)により

$$
\frac{19}7=2+\frac57,\quad
\frac75=1+\frac25,\quad
\frac52=2+\frac12,\quad
\frac21=2.
$$

したがって $19/7=[2;1,2,2]$ で最後が整数になり停止します。周期性の定義は無限個の部分商 $a_n$ が存在することを要するため、有限列を形式上繰り返しても元の有理数の連分数にはなりません。一方、$\beta=[\overline1]$ では $\beta=1+1/\beta$ なので

$$
\beta^2-\beta-1=0,\qquad
\beta=\frac{1+\sqrt5}{2}
$$

です。判別式 $5$ は平方数でないため、こちらは無理数です。
<!-- solution-end -->

### Level C：周期性の核心を再構成する

#### C1. 二次無理数から有限状態へ

$A\alpha^2+B\alpha+C=0$ を満たす実二次無理数 $\alpha$ について、次を順に示せ。

1. 判別式 $D=B^2-4AC$ を用い、完全商を整数 $P_n,Q_n$ で $(P_n+\sqrt D)/Q_n$ と表す再帰式を導け。
2. 共役 $\alpha'$ と収束分数の誤差評価から、十分大きい $n$ で共役完全商が $(-1,0)$ にあることを示せ。
3. 整数状態 $(P_n,Q_n)$ が有限集合に入ることを示し、最終周期性を結論せよ。
4. 平方根の形でない $\alpha=(1+\sqrt3)/2$ に適用して、実際の部分商を求めよ。

- Level: C
- ID: NDA1-C1

<!-- solution-start -->
**詳細解答**　まず整数係数の既約二次方程式を $A>0$ で選びます。二次無理数なので $D>0$ は非平方整数です。解の公式を使い、根の選択に応じて $(P_0,Q_0)=(-B,2A)$ または $(B,-2A)$ とすれば、$\alpha=(P_0+\sqrt D)/Q_0$、$Q_0\mid(D-P_0^2)$ です。[完全商の定義](../../NT/NT7/index.md#def-nt7-continued-fraction)で $a_n=\lfloor\alpha_n\rfloor$ とし、有理化すれば

$$
\begin{aligned}
\alpha_{n+1}
&=\frac{Q_n}{\sqrt D+P_n-a_nQ_n}\\
&=\frac{\sqrt D+(a_nQ_n-P_n)}
{(D-(a_nQ_n-P_n)^2)/Q_n}.
\end{aligned}
$$

従って $P_{n+1}=a_nQ_n-P_n$、$Q_{n+1}=(D-P_{n+1}^2)/Q_n$ です。$P_{n+1}\equiv-P_n\pmod{Q_n}$ より $Q_{n+1}$ は整数、また $D$ が非平方のため非零です。

次に $e_j=p_j-q_j\alpha$ と置きます。[収束分数の誤差と交互近似](../../NT/NT7/index.md#thm-nt7-convergent-error)より $|e_j|<1/q_{j+1}\to0$ です。$\delta=\alpha-\alpha'\ne0$ に対し

$$
p_j-q_j\alpha'=q_j\delta+e_j.
$$

$q_j-q_{j-1}\ge q_{j-2}\to\infty$ なので、十分大きい $j$ では両辺の右辺は $\delta$ と同符号で、絶対値は $j$ とともに厳密に増大します。より具体的には

$$
|q_j\delta+e_j|-|q_{j-1}\delta+e_{j-1}|
\ge|\delta|(q_j-q_{j-1})-|e_j|-|e_{j-1}|>0.
$$

[完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)の共役版を解いて

$$
\alpha'_n=-\frac{p_{n-2}-q_{n-2}\alpha'}
{p_{n-1}-q_{n-1}\alpha'}
$$

と書けば、十分大きい $n$ で分子分母は同符号かつ前者の絶対値が小さいので $-1<\alpha'_n<0$ です。元の完全商は $n\ge1$ で $\alpha_n>1$ です。

最後に $\alpha_n=(P_n+\sqrt D)/Q_n$ と $\alpha'_n=(P_n-\sqrt D)/Q_n$ の和と差を使います。差が正なので $Q_n>0$、和も $\alpha_n+\alpha'_n>0$ なので $P_n>0$ です。$\alpha'_n<0$ は $P_n<\sqrt D$、$\alpha_n>1$ は $Q_n<P_n+\sqrt D<2\sqrt D$ を与えます。よって有限個の整数対のうちに状態が限られ、再帰式が一意的なので同じ対が現れればその後の部分商が繰り返します。

具体例では $a_0=1$、$\alpha_1=1+\sqrt3$、$a_1=2$、$\alpha_2=(1+\sqrt3)/2$、$a_2=1$ です。$\alpha_2=\alpha_0$ より $a_3=2$ となり

$$
\alpha=[1;\overline{2,1}].
$$

この例は、定理の有限状態という抽象結論が具体的な周期 $2,1$ と対応することを示しています。
<!-- solution-end -->

## 6. 次に比較したい定数

[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)の意味を保ったまま、今回は近似定数を完全商で評価し、中間収束分数が第一種の比較で役立つ理由と、全実二次無理数の最終周期性を証明しました。次は二乗近似の**定数をどこまで一様に改善できるか**という問題に進みます。そこで次章では近似定数 $1/\sqrt5$ の改良と最適性、悪近似数と有界部分商が重要になります。
