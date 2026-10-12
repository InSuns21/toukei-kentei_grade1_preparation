# NDA5 無理性指数と近似指数

前章では、整数倍した実数の小数部分が長い時間でどのように分布するかを調べました。本章では問題を一点への**近づき方の速さ**に戻します。無理数 $\alpha$ に対し、ある有理数 $p/q$ が非常に近くても、それが小さい分母で一度だけ起こったのか、分母をいくらでも大きくして繰り返せるのかは別問題です。

[Dirichlet近似](../../NT/NT7/index.md#lem-nt7-dirichlet-approximation)は分母の二乗に反比例する誤差を無限回保証します。一方、[悪近似数](../NDA2/index.md#def-nda2-badly-approximable)は、この二乗よりどこまでも速く近づくことを一様に防ぎます。では、二乗、三乗、四乗と「分母の何乗で近づけるか」を、数ごとに一つの指標で比較できるでしょうか。

本章では「無限に多くの**既約分数**」という量化を含めて近似のべき指数を定義し、指数の上下界を導きます。さらに連分数の分母の成長から指数を求める公式を証明し、二次無理数、悪近似でないのに指数が2の数、指数3の数、指数が無限大の数を実際に構成します。超越性の判定は次章で扱います。

## 1. 「一度」と「無限回」を区別する

例えば $\sqrt2$ に近い分数 $7/5$ を見つけても、それだけでは大きい分母について何も言えません。また $p/q=7/5$ を $14/10,21/15,\ldots$ と書き直しても、近い有理数が増えたわけではありません。そこで分母を正とし、分子と分母を互いに素とした表示を数えます。

<a id="def-nda5-irrationality-exponent"></a>

<!-- formal-statement-start -->
> **定義（無理性指数）**  
> 無理数 $\alpha\in\mathbb R\setminus\mathbb Q$ に対し、実数 $\nu>0$ が**許容される**とは、互いに素な整数 $p\in\mathbb Z$、$q\in\mathbb Z_{\ge2}$ の組で
$$
\left|\alpha-\frac pq\right|<\frac1{q^\nu}
$$
> を満たすものが無限個存在することをいう。この許容指数の集合を $E(\alpha)$ と書き、その上限
$$
\mu(\alpha)=\sup E(\alpha)\in[0,\infty]
$$
> を $\alpha$ の**無理性指数**（irrationality exponent）という。集合が上に有界でない場合は $\mu(\alpha)=\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda5-irrationality-exponent -->
**定義の確認**：$\alpha=\sqrt2$ について [連分数の収束分数](../../NT/NT7/index.md#def-nt7-convergent) は既約で、分母 $q_n$ は無限大へ発散します。[収束分数の誤差評価](../../NT/NT7/index.md#thm-nt7-convergent-error) から
$$
\left|\sqrt2-\frac{p_n}{q_n}\right|<\frac1{q_n^2}
$$
を満たす分数が無限個あります。従って $2\in E(\sqrt2)$ であり、$\mu(\sqrt2)\ge2$ と実際に確認できます。$\mu(\sqrt2)=2$ という**上界**は後に別途証明します。
<!-- definition-example-end -->

ここで「指数 $\nu$ の不等式に無限個の解がある」ということと、「分母がいくらでも大きい解がある」ということは、この設定では同値です。分母 $q$ が固定されると $|\alpha-p/q|<q^{-\nu}$ に入る整数 $p$ は有限個しかないためです。逆に、異なる既約分数の分母が無限大へ進めば、もちろん解は無限個あります。

さらに $q\ge2$ では、$0<\nu_1<\nu_2$ なら $q^{-\nu_2}<q^{-\nu_1}$ です。よって $\nu_2\in E(\alpha)$ なら $\nu_1\in E(\alpha)$ です。ただし**上限そのものが許容されるとは限りません**。以下で必要なのは、上限の両側での量化です。

<a id="prop-nda5-exponent-quantifiers"></a>

<!-- formal-statement-start -->
> **命題（指数の量化と上下界）**  
> 無理数 $\alpha$ について $\mu(\alpha)$ を上の定義で定める。
>
> 1. $0<\nu<\mu(\alpha)$ なら、指数 $\nu$ の近似不等式を満たす既約分数は無限個ある。
> 2. $\mu(\alpha)<\nu$ なら、それを満たす既約分数は有限個しかない。
> 3. $0<\mu(\alpha)<\infty$ とし $\nu>\mu(\alpha)$ なら、ある $C_{\alpha,\nu}>0$ が存在し、任意の整数 $p$ と正整数 $q$ に対して
$$
\left|\alpha-\frac pq\right|\ge \frac{C_{\alpha,\nu}}{q^\nu}
$$
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

第1項は上限の定義と、指数を小さくすると条件が弱くなることから従います。第3項のポイントは、「例外が有限個」だけではまだ正の下界定数が出ないように見える点です。大きい分母と小さい分母を分ければ、一様な正の定数を作れます。

<!-- proof-start -->
### 証明

$0<\nu<\mu(\alpha)$ のとき、上限の性質から $E(\alpha)$ に $\nu$ より大きい数 $\nu'$ が存在します。無限大を上限とする場合も同様です。$q\ge2$ に対し $q^{-\nu'}<q^{-\nu}$ なので、$\nu'$ について無限に存在した分数はすべて $\nu$ についても条件を満たします。これが第1項です。

第2項は背理法で示せます。$\nu>\mu(\alpha)$ なのに該当する既約分数が無限個なら、定義上 $\nu\in E(\alpha)$ となり $\sup E(\alpha)\ge\nu$ となって矛盾します。

第3項を示します。第2項から、ある整数 $Q\ge2$ を取れば、**既約で分母 $q\ge Q$** の分数には
$$
\left|\alpha-\frac pq\right|\ge q^{-\nu}
$$
が成立します。残る既約分母 $1\le q<Q$ について、各 $q$ で $p$ による誤差を最小化する整数が存在し、$\alpha$ は無理数なのでその最小値は正です。有限個の $q$ しかないため
$$
C_0=\min_{1\le q<Q}\left(q^\nu\min_{p\in\mathbb Z}\left|\alpha-\frac pq\right|\right)>0
$$
と置けます。$C_{\alpha,\nu}=\min(1,C_0)>0$ とすれば、すべての**既約**分数について下界が成り立ちます。既約でない $p/q$ は約分すると $p'/q'$ となり $q'\le q$ です。$\nu>0$ より
$$
\left|\alpha-\frac pq\right|
=\left|\alpha-\frac{p'}{q'}\right|
\ge\frac{C_{\alpha,\nu}}{(q')^\nu}
\ge\frac{C_{\alpha,\nu}}{q^\nu}.
$$
従って任意の整数組にも拡張できます。
<!-- proof-end -->

この命題は、$\nu>\mu$ に対する**定数付き下界**を保証しますが、その定数を計算できるとは限りません。また $\nu=\mu$ の場合に下界が成立するかどうかは、無理性指数だけでは決定できません。

## 2. すべての無理数で指数は少なくとも2

<a id="thm-nda5-dirichlet-lower-bound"></a>

<!-- formal-statement-start -->
> **定理（無理性指数の普遍下界）**  
> 任意の無理数 $\alpha\in\mathbb R\setminus\mathbb Q$ に対して
$$
\mu(\alpha)\ge2
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[NT7の連分数](../../NT/NT7/index.md#def-nt7-convergent)では、各収束分数が分母の二乗より小さい誤差を持ちます。さらに分母は無限大へ進み、分数は既約なので「無限に多くの**相異なる**近似」を確保できます。

<!-- proof-start -->
### 証明

$\alpha$ の収束分数を $p_n/q_n$ とします。[収束分数の差積恒等式と完全商公式](../../NT/NT7/index.md#lem-nt7-convergent-matrix)から $p_n$ と $q_n$ は互いに素です。[収束分数の誤差評価](../../NT/NT7/index.md#thm-nt7-convergent-error)を $n$ 番目の分数へ適用すると
$$
\left|\alpha-\frac{p_n}{q_n}\right|
<\frac1{q_nq_{n+1}}
\le\frac1{q_n^2}
$$
となります。分母漸化式 $q_{n+1}=a_{n+1}q_n+q_{n-1}$ と $a_{n+1}\ge1$ より $q_n\to\infty$ です。十分大きい $n$ では $q_n\ge2$ かつ $q_{n+1}>q_n$ なので上の右側も厳密な不等式です。従って指数 $2$ の条件を満たす相異なる既約分数が無限個あり、定義から $\mu(\alpha)\ge2$ です。
<!-- proof-end -->

点列の分布についての「訪問回数」の議論とは異なり、この結論は単なる密度ではなく**分母と誤差を結ぶ量的評価**に由来します。

## 3. 二次無理数で指数はちょうど2

まず $\sqrt2$ の場合、整数 $p^2-2q^2$ を使うと、どんな整数 $p,q$ でも誤差が分母二乗より桁違いに小さくならないことが直接分かります。

<a id="prop-nda5-sqrt2-upper-bound"></a>

<!-- formal-statement-start -->
> **命題（平方根2の無理性指数）**  
> $\alpha=\sqrt2$ に対し、任意の $p\in\mathbb Z$、$q\in\mathbb Z_{>0}$ について
$$
\left|\sqrt2-\frac pq\right|
\ge\frac1{(2\sqrt2+1)q^2}
$$
> が成立する。特に $\mu(\sqrt2)=2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$p^2-2q^2$ は零でない整数なので絶対値が1以上です。近い分数と遠い分数を分けて、平方の差から一様な正の定数を作ります。指数の上界には、定数 $C/q^2$ と $1/q^\nu$ の比較が必要です。

<!-- proof-start -->
### 証明

$\delta=|\sqrt2-p/q|$ と置きます。まず誤差 $\delta$ が $1$ 以下である場合を考えます。このとき三角不等式から
$$
\left|\frac pq+\sqrt2\right|
\le\left|\frac pq-\sqrt2\right|+2\sqrt2
\le1+2\sqrt2.
$$
$\sqrt2$ は無理数なので $p^2-2q^2\ne0$ です。従って
$$
\begin{aligned}
1&\le|p^2-2q^2|\\
&=q^2\left|\frac pq-\sqrt2\right|
\left|\frac pq+\sqrt2\right|\\
&\le q^2\delta(1+2\sqrt2),
\end{aligned}
$$
すなわち主張の下界を得ます。$\delta>1$ なら $q\ge1$ より
$$
\delta>1\ge\frac1{(2\sqrt2+1)q^2}
$$
なので同じ下界が成立します。

任意の $\nu>2$ を固定すると、$q^{\nu-2}>2\sqrt2+1$ となるほど大きな分母について
$$
\frac1{(2\sqrt2+1)q^2}>\frac1{q^\nu}
$$
です。したがって指数 $\nu$ の近似は大きな分母では起こらず、[指数の量化](#prop-nda5-exponent-quantifiers)から $\mu(\sqrt2)\le2$ です。[普遍下界](#thm-nda5-dirichlet-lower-bound)と合わせ $\mu(\sqrt2)=2$ となります。
<!-- proof-end -->

一般の実二次無理数にも同じ結論が成立します。[NDA1のLagrange最終周期性定理](../NDA1/index.md#thm-nda1-lagrange)で部分商は有界になり、[NDA2の有界部分商定理](../NDA2/index.md#thm-nda2-bounded-quotients)で $C>0$ が存在し $|\alpha-p/q|\ge C/q^2$ が成り立つからです。

<a id="cor-nda5-badly-approximable"></a>

<!-- formal-statement-start -->
> **系（悪近似数の無理性指数）**  
> 無理数 $\alpha$ が[悪近似数](../NDA2/index.md#def-nda2-badly-approximable)なら $\mu(\alpha)=2$ である。特にすべての実二次無理数の無理性指数は2である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

悪近似数には定義から $C>0$ があり、$|\alpha-p/q|\ge Cq^{-2}$ がすべての整数 $p,q$ に成り立ちます。$\nu>2$ として $q^{\nu-2}>1/C$ なら $Cq^{-2}>q^{-\nu}$ です。従って指数 $\nu$ の解の分母は有界です。無理性指数は高々2であり、[普遍下界](#thm-nda5-dirichlet-lower-bound)から等号が成り立ちます。二次無理数は上記二つの既出定理により悪近似数です。
<!-- proof-end -->

逆はまだ言えません。無理性指数2は「**固定した2より大きい指数**で無限回近づけない」という性質です。悪近似性は「すべての分母について**同じ正の定数** $C$ を用いて二乗の下界を保てる」という、より強い性質です。

## 4. 連分数の分母から指数を直接計算する

「近似指数」を具体的に計算するには、連分数の誤差を単純に上から見るだけでなく、**任意の分数**の誤差を下から押さえる必要があります。ここで[第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)が効きます。

$\alpha=[a_0;a_1,a_2,\ldots]$ を無理数の単純連分数とし、$p_n/q_n$ を収束分数とします。以下、$n$ は十分大きく、$q_n>1$ かつ $q_n<q_{n+1}$ とします。

<a id="lem-nda5-block-error"></a>

<!-- formal-statement-start -->
> **補題（収束分数の誤差と分母区間）**  
> 無理数 $\alpha$ の収束分数 $p_n/q_n$ について、十分大きい $n$ で
$$
\frac1{q_n(q_{n+1}+q_n)}
<
\left|\alpha-\frac{p_n}{q_n}\right|
<
\frac1{q_nq_{n+1}}
$$
> が成立する。また任意の整数 $p$ と $q_n\le q<q_{n+1}$ に対して
$$
\left|\alpha-\frac pq\right|
>\frac1{q(q_{n+1}+q_n)}
>\frac1{2qq_{n+1}}
$$
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

前半は完全商の誤差表示の分母を $q_{n+1}+s_nq_n$ と書き、$0<s_n<1$ を使います。後半は任意の $p,q$ を収束分数に比較してから $q$ で割ります。

<!-- proof-start -->
### 証明

[完全商による正規化誤差式](../NDA1/index.md#prop-nda1-exact-error)を分子と分母へ戻します。$s_n=1/\alpha_{n+2}\in(0,1)$ と置くと、$q_{n+1}=a_{n+1}q_n+q_{n-1}$ だから
$$
\begin{aligned}
|q_n\alpha-p_n|
&=\frac1{q_n(\alpha_{n+1}+q_{n-1}/q_n)}\\
&=\frac1{q_{n+1}+s_nq_n}.
\end{aligned}
$$
$0<s_n<1$ より
$$
q_{n+1}<q_{n+1}+s_nq_n<q_{n+1}+q_n.
$$
正数の逆数では不等号が反転し、さらに $q_n$ で割って最初の二つの評価を得ます。

次に $q_n\le q<q_{n+1}$ を満たす整数 $q$ を選びます。[NT7の第二種最良近似](../../NT/NT7/index.md#thm-nt7-best-approximation)から任意の整数 $p$ について
$$
|q\alpha-p|\ge|q_n\alpha-p_n|
>\frac1{q_{n+1}+q_n}.
$$
これを $q$ で割り、$q_n<q_{n+1}$ から $q_{n+1}+q_n<2q_{n+1}$ を用いれば後半の不等式が従います。
<!-- proof-end -->

この補題は、隣接する二つの収束分数の分母の間にいる**すべての分母**を一度に支配します。そこで次の対数成長率だけを調べれば十分です。

<a id="thm-nda5-denominator-growth"></a>

<!-- formal-statement-start -->
> **定理（無理性指数の連分数表示）**  
> 無理数 $\alpha=[a_0;a_1,a_2,\ldots]$ の収束分数の分母を $q_n$ とする。このとき
$$
\mu(\alpha)
=1+\limsup_{n\to\infty}
\frac{\log q_{n+1}}{\log q_n}
=2+\limsup_{n\to\infty}
\frac{\log a_{n+1}}{\log q_n}.
$$
> 極限上限は $q_n>1$ となる十分大きい $n$ について取る。右辺は $\infty$ を許す。
<!-- formal-statement-end -->

### 証明の見取り図

最初の式を示します。もし $q_{n+1}$ が $q_n$ の高いべき乗ほど大きいことが無限回起これば、その直前の収束分数が高い指数で近似します。逆に成長率に上限があれば、[分母区間の下界](#lem-nda5-block-error)によって、収束分数以外も含めたすべての近似に上限が付きます。第二式は分母漸化式から得られます。

<!-- proof-start -->
### 証明

まず
$$
L=\limsup_{n\to\infty}
\frac{\log q_{n+1}}{\log q_n}\in[1,\infty]
$$
と置きます。任意の $0<\nu<1+L$ を取ります。上極限の定義により
$$
\frac{\log q_{n+1}}{\log q_n}>\nu-1
$$
となる添字 $n$ が無限個あります（$L=\infty$ の場合も同じです）。$\log q_n>0$ を掛けて指数関数を取ると
$$
q_{n+1}>q_n^{\nu-1}.
$$
[分母区間の補題](#lem-nda5-block-error)の収束分数側の評価を代入すれば
$$
\left|\alpha-\frac{p_n}{q_n}\right|
<\frac1{q_nq_{n+1}}
<\frac1{q_n^\nu}.
$$
収束分数は既約で、$q_n\to\infty$ です。よってこの $\nu$ は許容され、$\mu(\alpha)\ge1+L$ を得ます。$L=\infty$ ならこれで $\mu(\alpha)=\infty$ です。

次に $L<\infty$ と仮定します。任意の $\nu>1+L$ に対し
$$
L<t<\nu-1
$$
となる実数 $t$ を選びます。上極限の定義から、十分大きい全 $n$ で
$$
\frac{\log q_{n+1}}{\log q_n}<t,
\qquad
q_{n+1}<q_n^t.
$$
任意の十分大きい整数 $q$ を一意の分母区間 $q_n\le q<q_{n+1}$ に入れます。$q_n\le q$ なので、[補題の下界](#lem-nda5-block-error)は
$$
\begin{aligned}
\left|\alpha-\frac pq\right|
&>\frac1{2qq_{n+1}}
>\frac1{2q q_n^t}\\
&\ge\frac1{2q^{1+t}}
\end{aligned}
$$
となります。一方 $\nu>1+t$ なので、$q^{\nu-(1+t)}>2$ となるほど大きな $q$ では
$$
\frac1{2q^{1+t}}>\frac1{q^\nu}
$$
です。従って指数 $\nu$ の不等式を満たす分数は大きい分母では存在せず、[量化の命題](#prop-nda5-exponent-quantifiers)から $\mu(\alpha)\le1+L$ です。

最後に部分商を使った式を示します。[収束分数の分母漸化式](../../NT/NT7/index.md#def-nt7-convergent)から、十分大きい $n$ について
$$
a_{n+1}q_n\le q_{n+1}
=a_{n+1}q_n+q_{n-1}
<(a_{n+1}+1)q_n
\le2a_{n+1}q_n.
$$
両辺を $q_n$ で割り対数を取ると
$$
0\le
\log\frac{q_{n+1}}{q_n}-\log a_{n+1}
<\log2.
$$
$\log q_n\to\infty$ なので、$\log q_n$ で割った両辺の差は0へ収束します。したがって
$$
\limsup\frac{\log q_{n+1}}{\log q_n}
=1+\limsup\frac{\log a_{n+1}}{\log q_n}.
$$
先ほど証明した第一式へ代入すると第二式が従います。
<!-- proof-end -->

分母の次の部分商 $a_{n+1}$ が大きいほど、直前の $p_n/q_n$ は高精度になります。ただし大切なのは $a_{n+1}$ の**絶対的な大きさ**ではなく、$\log a_{n+1}$ と $\log q_n$ の比です。

## 5. 具体例：同じ指数2でも性質は違う

最初の例は、有界部分商を持たないのに指数が2となる数です。
$$
\gamma=[0;1,2,3,4,\ldots],
\qquad a_{n+1}=n+1\quad(n\ge0).
$$
[悪近似数と有界部分商の同値](../NDA2/index.md#thm-nda2-bounded-quotients)から $\gamma$ は悪近似数ではありません。一方、分母漸化式と $a_n\ge1$ により $q_{n+2}\ge2q_n$ です。従って $q_n$ は少なくとも指数的に増え、ある $c>0$ と十分大きい $n$ について $\log q_n\ge cn$ とできます。ゆえに
$$
0\le\frac{\log a_{n+1}}{\log q_n}
=\frac{\log(n+1)}{\log q_n}
\le\frac{\log(n+1)}{cn}\longrightarrow0.
$$
[無理性指数の連分数表示](#thm-nda5-denominator-growth)から $\mu(\gamma)=2$ です。つまり
$$
\mu(\gamma)=2,\qquad c(\gamma)=0
$$
が同時に成り立ちます。ここで $c(\gamma)$ は[近似定数](../NDA2/index.md#def-nda2-approximation-constant)です。これにより「指数2なら悪近似数」という逆向きの主張は反例を持つことが分かりました。

次に、指数を指定して無理数を作ります。$\sigma\ge0$ を固定し、単純連分数の $a_0=0$, $a_1=1$ を選び、分母 $q_n$ が定まるたびに
$$
a_{n+1}=\left\lceil q_n^\sigma\right\rceil\qquad(n\ge1)
$$
と定めます。正整数の部分商が順次定まるので、無限単純連分数は一つの無理数 $\alpha_\sigma$ を定めます。$q_n^\sigma\ge1$ であり
$$
q_n^\sigma\le a_{n+1}<q_n^\sigma+1\le2q_n^\sigma
$$
なので、$q_n>1$ で対数を取れば
$$
\sigma\le\frac{\log a_{n+1}}{\log q_n}
<\sigma+\frac{\log2}{\log q_n}.
$$
$ q_n\to\infty $ から誤差項は0に収束し、[無理性指数の連分数表示](#thm-nda5-denominator-growth)によって
$$
\boxed{\mu(\alpha_\sigma)=2+\sigma}.
$$
特に $\sigma=1$ なら無理性指数3です。$\sigma=0$ ならすべての部分商が1となり、悪近似数の例になります。$\sigma>0$ なら $a_{n+1}\to\infty$ なので、[有界部分商との同値](../NDA2/index.md#thm-nda2-bounded-quotients)から悪近似数ではありません。

最後に各段階で $a_{n+1}=q_n^n$（$n\ge1$）と選ぶと
$$
\frac{\log a_{n+1}}{\log q_n}=n
$$
となり、[無理性指数の連分数表示](#thm-nda5-denominator-growth)から $\mu(\alpha)=\infty$ です。指数が無限大でも $\alpha$ は無理数であり、**任意の大きい有限指数の近似が無限回ある**という意味です。このような極端に良い近似と超越性の関係は次章で証明します。

## 6. 演習：指数を定義から判定する

### Level A：量化と二乗の下界

**NDA5-A1（既約という条件）**  
$\alpha\notin\mathbb Q$ と $\nu>0$ を固定する。ある正整数 $Q$ について $q\le Q$ の分数 $p/q$ が $|\alpha-p/q|<q^{-\nu}$ を満たす組は有限個であることを示してください。また、互いに素という条件を外すと、同じ有理数に対して分母だけを何度も大きくできることを説明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$q$ を一つ固定すると、条件を満たす $p$ は
$$
q\alpha-q^{1-\nu}<p<q\alpha+q^{1-\nu}
$$
という有界区間に入る整数だけです。従ってその数は有限です。$q=1,\ldots,Q$ の有限個の集合を合わせても有限です。なお $p_0/q_0$ と同じ有理数は $(mp_0)/(mq_0)$ と表せますが、$m\ge2$ では互いに素ではありません。さらにこの表記で分母を大きくした場合は右辺 $(mq_0)^{-\nu}$ が小さくなるので、**条件自体も維持されるとは限らない**点に注意します。既約性は「異なる近似分数を数える」ための条件です。
<!-- solution-end -->

**NDA5-A2（指数の単調性）**  
$\alpha$ は無理数とする。$\nu_2=3$ が許容されると仮定したとき $\nu_1=5/2$ も許容されることを示してください。また $\nu=4$ が許容されない場合に、$\mu(\alpha)$ に対して何が言えるかを答えてください。

- Level: A

<!-- solution-start -->
**詳細解答**

各 $q\ge2$ で $q^{-3}<q^{-5/2}$ です。従って $q^{-3}$ より小さい誤差を持つ既約分数はすべて $q^{-5/2}$ の条件も満たします。無限個という条件は保存されます。$4$ が許容されないなら、もし $\mu(\alpha)>4$ であれば[指数の量化](#prop-nda5-exponent-quantifiers)から $4$ は許容されるはずで矛盾します。よって $\mu(\alpha)\le4$ ですが、$\mu(\alpha)=4$ は排除できません。
<!-- solution-end -->

**NDA5-A3（平方根のノルム）**  
任意の整数 $p$ と正整数 $q$ について、$|\sqrt2-p/q|\le1$ のとき
$$
|p^2-2q^2|\le (2\sqrt2+1)q^2|\sqrt2-p/q|
$$
を導き、$\mu(\sqrt2)=2$ への使い道を説明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

平方差で因数分解すると
$$
|p^2-2q^2|
=q^2|\sqrt2-p/q|\,|\sqrt2+p/q|.
$$
三角不等式を $p/q+\sqrt2=(p/q-\sqrt2)+2\sqrt2$ に適用すると
$$
|\sqrt2+p/q|
\le|\sqrt2-p/q|+2\sqrt2
\le1+2\sqrt2.
$$
この二式を合わせると主張の上界を得ます。左辺は $\sqrt2$ が無理数なので零でない整数の絶対値であり1以上です。従って $|\sqrt2-p/q|\ge[(2\sqrt2+1)q^2]^{-1}$ という下界を得ます。誤差が1より大きい場合もこの下界は自動的に成り立ちます。[普遍下界](#thm-nda5-dirichlet-lower-bound)と併用して指数2と判定できます。
<!-- solution-end -->

**NDA5-A4（分母成長率）**  
無理数 $\alpha$ の連分数の部分商が $a_n\le3$（すべての $n\ge1$）を満たすとき、$q_{n+1}/q_n$ の上界を示し、無理性指数を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

分母漸化式から
$$
q_{n+1}=a_{n+1}q_n+q_{n-1}\le3q_n+q_n=4q_n
$$
です。十分大きい $n$ では $1<q_n<q_{n+1}$ なので
$$
1\le\frac{\log q_{n+1}}{\log q_n}
\le1+\frac{\log4}{\log q_n}.
$$
$q_n\to\infty$ より右端は1へ収束します。従って[無理性指数の連分数表示](#thm-nda5-denominator-growth)で $\mu(\alpha)=1+1=2$ を得ます。
<!-- solution-end -->

### Level B：上界の論理と反例を自分で作る

**NDA5-B1（指数2だが悪近似ではない）**  
$\gamma=[0;1,2,3,\ldots]$ とし、部分商 $a_{n+1}=n+1$ とする。(i) $q_{n+2}\ge2q_n$、(ii) $\mu(\gamma)=2$、(iii) $\gamma$ は悪近似数でないことを示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

分母漸化式を二回使うと
$$
q_{n+2}=a_{n+2}q_{n+1}+q_n
\ge q_{n+1}+q_n\ge2q_n.
$$
従って偶数添字、奇数添字それぞれについて2段ごとに少なくとも2倍となり、$q_n\ge2^{(n-2)/2}$（$n\ge2$）が従います。ゆえに $\log q_n\ge(n-2)\log2/2$ です。$a_{n+1}=n+1$ なので
$$
0\le\frac{\log a_{n+1}}{\log q_n}
\le\frac{2\log(n+1)}{(n-2)\log2}\longrightarrow0.
$$
[無理性指数の連分数表示](#thm-nda5-denominator-growth)から $\mu(\gamma)=2$ です。一方 $a_{n+1}$ はいくらでも大きくなり有界でないため、[悪近似数と有界部分商の同値](../NDA2/index.md#thm-nda2-bounded-quotients)により $\gamma$ は悪近似数ではありません。
<!-- solution-end -->

**NDA5-B2（指数4の構成）**  
無理数 $\alpha=[0;1,a_2,a_3,\ldots]$ の連分数を $a_{n+1}=q_n^2$（$n\ge1$）によって順次定める。指数が4になることを証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

初期値は $q_0=q_1=1$ です。各 $q_n$ は正整数だから $a_{n+1}=q_n^2$ は正整数であり、無限単純連分数が定まります。分母漸化式から $q_n\to\infty$ です。十分大きい $n$ では
$$
\frac{\log a_{n+1}}{\log q_n}
=\frac{\log(q_n^2)}{\log q_n}=2.
$$
従って[無理性指数の連分数表示](#thm-nda5-denominator-growth)へ代入すれば
$$
\mu(\alpha)=2+\limsup_{n\to\infty}2=4.
$$
有限個の初期部分商は上極限に影響しません。
<!-- solution-end -->

**NDA5-B3（有限個の例外から一様下界へ）**  
無理数 $\alpha$、実数 $\nu>\mu(\alpha)$ とし、指数 $\nu$ の近似が既約分数では有限個しか存在しないことだけを出発点として、すべての整数 $p$、正整数 $q$ に対して $|\alpha-p/q|\ge Cq^{-\nu}$ を満たす $C>0$ を構成してください。

- Level: B

<!-- solution-start -->
**詳細解答**

まず無限個の既約分数で近似が起これば $\nu$ は許容されてしまうので、違反する既約分数の分母はある $Q\ge2$ より小さいです。従って既約な $q\ge Q$ では $q^\nu|\alpha-p/q|\ge1$ です。小さい分母は各 $q$ について整数 $p$ を選ぶ距離が最小値 $d_q=\min_{p\in\mathbb Z}|\alpha-p/q|>0$ を持ちます。有限個の最小値から
$$
C=\min\{1,d_1,2^\nu d_2,\ldots,(Q-1)^\nu d_{Q-1}\}>0
$$
を得ます。すべての既約分数について $q^\nu|\alpha-p/q|\ge C$ です。非既約分数は $p/q=p'/q'$ と約分すると $q'\le q$ なので
$$
q^\nu\left|\alpha-\frac pq\right|
\ge(q')^\nu\left|\alpha-\frac{p'}{q'}\right|\ge C.
$$
これで量化の対象をすべての整数組へ拡張できます。
<!-- solution-end -->

**NDA5-B4（悪近似定数と指数のずれ）**  
無理数 $\alpha$ について、$c(\alpha)=0$ であっても $\mu(\alpha)=2$ が可能であることを示してください。逆に $c(\alpha)>0$ なら $\mu(\alpha)>2$ は不可能であることを証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

前半は B1 の $\gamma=[0;1,2,3,\ldots]$ を取ります。B1で $\mu(\gamma)=2$ と証明しました。部分商は無界なので[有界部分商との同値](../NDA2/index.md#thm-nda2-bounded-quotients)から悪近似ではなく、[近似定数](../NDA2/index.md#def-nda2-approximation-constant)の定義により $c(\gamma)=0$ です。

後半は $c(\alpha)>0$ とします。任意の整数 $p$、正整数 $q$ について
$$
q^2\left|\alpha-\frac pq\right|
=q|q\alpha-p|\ge c(\alpha)>0.
$$
もし $\nu>2$ の不等式 $|\alpha-p/q|<q^{-\nu}$ が起これば
$$
c(\alpha)<q^{2-\nu}.
$$
$\nu>2$ だから右辺は $q\to\infty$ で0に収束し、大きい分母では矛盾します。よってその指数の近似は有限個しかなく、$\mu(\alpha)\le2$ です。[普遍下界](#thm-nda5-dirichlet-lower-bound)から等号です。
<!-- solution-end -->

### Level C：連分数の構成と全分母の評価をつなぐ

**NDA5-C1（任意の有限指数と無限指数）**  
$\tau>2$ を固定する。(i) $a_0=0,a_1=1$ とし、$a_{n+1}=\lceil q_n^{\tau-2}\rceil$（$n\ge1$）で作る無理数 $\alpha_\tau$ が $\mu(\alpha_\tau)=\tau$ を満たすことを証明してください。(ii) この数が悪近似数でない理由を示してください。(iii) さらに $a_{n+1}=q_n^n$ で作る無理数 $\beta$ について、任意の $M>0$ に対し $|\beta-p/q|<q^{-M}$ を満たす既約分数が無限個存在することを証明してください。

- Level: C

<!-- solution-start -->
**詳細解答**

(i) $s=\tau-2>0$ と置きます。$q_0=q_1=1$ から再帰的に $q_{n+1}=a_{n+1}q_n+q_{n-1}$ と定めれば、各 $a_{n+1}$ は正整数なので無限単純連分数 $\alpha_\tau$ が存在し無理数です。$x=q_n^s\ge1$ に対して $x\le\lceil x\rceil<x+1\le2x$ だから
$$
s\log q_n\le\log a_{n+1}
<s\log q_n+\log2.
$$
十分大きい $n$ で $\log q_n>0$ により割ると
$$
s\le\frac{\log a_{n+1}}{\log q_n}
<s+\frac{\log2}{\log q_n}.
$$
$q_n\to\infty$ より上極限は $s$ なので、[無理性指数の連分数表示](#thm-nda5-denominator-growth)から
$$
\mu(\alpha_\tau)=2+s=\tau.
$$

(ii) $s>0$ より $q_n^s\to\infty$、したがって $a_{n+1}=\lceil q_n^s\rceil\to\infty$ です。[悪近似数と有界部分商の同値](../NDA2/index.md#thm-nda2-bounded-quotients)の必要条件を破るので、$\alpha_\tau$ は悪近似数ではありません。

(iii) $\beta$ の分母も $q_n\to\infty$ であり、十分大きい $n$ に対し
$$
\frac{\log a_{n+1}}{\log q_n}
=\frac{\log q_n^n}{\log q_n}=n.
$$
その上極限は $\infty$ だから[無理性指数の連分数表示](#thm-nda5-denominator-growth)で $\mu(\beta)=\infty$ です。最後に任意の $M>0$ を固定して $M+1<\mu(\beta)$ とすると、[指数の量化](#prop-nda5-exponent-quantifiers)により $M+1$ は許容されます。その無限個の既約分数では
$$
\left|\beta-\frac pq\right|<q^{-(M+1)}<q^{-M}
$$
が成立し、主張が従います。分母を無限に大きくすることと、指数を固定した後に無限個取ることの順序を交換していない点が重要です。
<!-- solution-end -->

## 7. 次章への接続

指数が2であることは、任意の $\varepsilon>0$ に対して**分母の $2+\varepsilon$ 乗で近づく分数は有限個**という情報です。しかし指数2だけでは、分母二乗の一様な正の下界は得られません。二次無理数の場合は強い下界を直接証明できました。

次章では整数係数多項式の性質から代数的無理数の指数に上界を付け、どこまでも高い指数で近づける数の超越性を証明します。さらに後続の定理では、代数的無理数全体に対して指数2という鋭い結論を目指します。
