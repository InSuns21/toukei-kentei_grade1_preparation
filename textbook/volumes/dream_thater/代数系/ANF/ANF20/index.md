# ANF20 大域Artin写像と剰余類体

[前講のイデール類群](../ANF19/index.md#def-anf19-idele-class)は、すべての素点の乗法情報を大域元で割った群です。そこで、[局所Artin写像](../ANF17/index.md#def-anf17-finite-reciprocity)をすべての素点で掛け合わせ、数体の有限Abel拡大を記述します。さらに、無限個のイデール成分のうち有限個の合同条件だけを記録できる**法によるイデアル類の群**を作ります。

本講では数体 $K/\mathbb Q$ を有限拡大、$\mathcal O_K$ をその整数環とします。有限素点・無限素点の集合をそれぞれ $V_f$、$V_\infty$ と書きます。全素点の集合は両者の直和 $V_K=V_f\sqcup V_\infty$ です。

有限素点 $\mathfrak p$ の剰余体の位数を $N\mathfrak p$ とします。

各有限素点の $\operatorname{ord}_{\mathfrak p}$ は、[素イデアル付値](../ANF9/index.md#def-anf9-prime-valuation)の $v_{\mathfrak p}$ と同じ規格化です。[分数イデアルの一意分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)と[イデールのイデアル写像](../ANF19/index.md#thm-anf19-idele-ideal-exact)を使います。

**この講で証明する部分**は、法によるイデアル類の群の合同条件、有限性、イデール商との具体的な対応、局所写像の積が定義できること、および円分体のFrobenius計算です。大域相互法則の主張と一般の剰余類体の存在は、次講ANF21で証明経路を扱う**外部の中心定理**として、ここでは結論・適用条件・計算を明確に分けて使います。

## 1. 有限個の素点に合同条件を課す

イデールの全成分を直接調べる代わりに、有限個の有限素点で高次の合同条件、必要な実素点で正の符号条件を指定します。複素素点には符号条件はありません。

<a id="def-anf20-modulus"></a>

<!-- formal-statement-start -->
> **定義（数体の法）**  
> 数体 $K$ の法 $\mathfrak m$ は、非零整イデアル $\mathfrak m_0$ と実素点の部分集合 $\mathfrak m_\infty$ の組である。有限部分を素イデアル分解して次のように書く。

$$
\mathfrak m=\mathfrak m_0\mathfrak m_\infty,\qquad
\mathfrak m_0=\prod_{\mathfrak p}\mathfrak p^{n_{\mathfrak p}},
\quad n_{\mathfrak p}\ge 0,\quad
n_{\mathfrak p}=0\ \text{はほぼすべて}.
$$

> $a\in K^\times$ が $a\equiv1\pmod{\mathfrak m}$ を満たすとは、各 $n_{\mathfrak p}>0$ について $a\in\mathcal O_{\mathfrak p}^\times$ かつ $a-1\in\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}$ であり、各 $v\in\mathfrak m_\infty$ で実埋め込み $v(a)>0$ であることをいう。
<!-- formal-statement-end -->

分数 $a=b/c$ の合同を判定するときは、まず約分または[素イデアル付値](../ANF9/index.md#def-anf9-prime-valuation)によって $\operatorname{ord}_{\mathfrak p}(a)=0$ を確かめます。局所的に分母 $c$ が単数となる表示を選べば、$a-1\in\mathfrak p^n\mathcal O_{\mathfrak p}$ は $b\equiv c\pmod{\mathfrak p^n}$ と同値です。つまり分母の剰余を逆元で割る計算は、定義の**単数条件と差の合同条件**を同時に判定する方法です。

<!-- definition-example-start: def-anf20-modulus -->
**定義の確認**。 $K=\mathbb Q$、$\mathfrak m=(5)\infty$ とします。$a=6/11$ の分子・分母はともに $5$ と互いに素なので $\operatorname{ord}_{(5)}(a)=0$ です。分母 $11\equiv1$ は法 $5$ で可逆であり、

$
6\cdot11^{-1}\equiv1\pmod5,
\qquad 6/11>0.
$

ゆえに有限・実の両条件を満たします。$a=-4$ は $-4\equiv1\pmod5$ で局所単数ですが、負なので実条件に反します。$a=5$ は $\operatorname{ord}_{(5)}(5)=1$ で局所単数ではなく、有限条件に反します。
<!-- definition-example-end -->

## 2. いつ二つのイデアルを同じとみなすか

法の有限部分を割る素イデアルは除外します。$I_{\mathfrak m}$ を $\mathfrak m_0$ と互いに素な非零分数イデアルの群とします。具体的には素イデアル分解で $n_{\mathfrak p}>0$ の素点の指数が $0$ となる群です。

<a id="def-anf20-ray-class"></a>

<!-- formal-statement-start -->
> **定義（剰余類群）**  
> 数体 $K$ と法 $\mathfrak m$ に対し、法に関する主イデアル部分群と剰余類群を次で定める。

$$
P_{\mathfrak m,1}=
\{(a):a\in K^\times,\ a\equiv1\pmod{\mathfrak m}\},
\qquad
\operatorname{Cl}_{\mathfrak m}(K)
=I_{\mathfrak m}/P_{\mathfrak m,1}.
$$

> ここで $(a)=a\mathcal O_K$ は分数主イデアルを表す。
<!-- formal-statement-end -->

$P_{\mathfrak m,1}$ は群です。実際 $a,b$ がいずれも局所的に $1$ に合同なら、$ab-1=(a-1)+(b-1)+(a-1)(b-1)$ も指定した冪に属し、$a^{-1}-1=-(a-1)/a$ も同様です。正の実数の積と逆数は正です。

<!-- definition-example-start: def-anf20-ray-class -->
**定義の確認**。 $K=\mathbb Q$、$\mathfrak m=(5)\infty$ では、$I_{\mathfrak m}$ の各イデアルはただ一つの**正**の有理数 $r=a/b$（$a,b$ は正整数で $5\nmid ab$）によって $r\mathbb Z$ と表せます。正の生成元について

$$
[(a/b)\mathbb Z]\longmapsto
\overline a\,\overline b^{-1}\in(\mathbb Z/5\mathbb Z)^\times
$$

は積を保ち、その核が $P_{\mathfrak m,1}$ です。$2\mathbb Z$ と $7\mathbb Z$ は共に剰余 $2$ を持ち、$(2/7)\mathbb Z$ は $2/7\equiv1\pmod5$ なので同じ類です。逆に $-4\equiv1\pmod5$ だけを根拠に法の実素点の正条件を外すことはできません。
<!-- definition-example-end -->

<a id="prop-anf20-ray-q"></a>

<!-- formal-statement-start -->
> **命題（有理数体の法5∞と法5）**  
> $\mathbb Q$ について、次の同型がある。

$$
\operatorname{Cl}_{(5)\infty}(\mathbb Q)\simeq
(\mathbb Z/5\mathbb Z)^\times\simeq C_4,
\qquad
\operatorname{Cl}_{(5)}(\mathbb Q)\simeq
(\mathbb Z/5\mathbb Z)^\times/\{\pm1\}\simeq C_2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\mathbb Z$ の非零分数イデアルは正の有理数倍で一意に書けます。実素点を含めると正の生成元しか許さず、含めなければ生成元の符号を変えられます。

<!-- proof-start -->
### 証明

写像 $r\mathbb Z\mapsto\overline r$ は、正の生成元 $r>0$ が一意なので定義が曖昧でなく、乗法と両立します。任意の単数剰余 $\overline a$ は $1\le a\le4$ の正整数のイデアル $a\mathbb Z$ から得られるので全射です。核の条件 $\overline r=1$ は、$r>0$ かつ $r\equiv1\pmod5$ と同値で、これは法 $(5)\infty$ の主イデアル部分群そのものです。

法 $(5)$ では、同じイデアル $r\mathbb Z$ の生成元は $r$ と $-r$ だけです（$\mathbb Z^\times=\{\pm1\}$）。いずれかが $1$ に合同となる条件は $\overline r=\pm1$ です。したがって核を $\{\pm1\}$ まで広げた商となります。$2^2\equiv-1$、$2^4\equiv1\pmod5$ より第一群は位数 $4$ の巡回群、第二群は位数 $2$ です。
<!-- proof-end -->

一般の剰余類群でも有限性が成り立ちます。証明には有限個の局所合同を同時に満たす元を用意する補助定理が要ります。

<a id="lem-anf20-weak-approx"></a>

<!-- formal-statement-start -->
> **補題（数体の弱近似）**  
> 数体 $K$、相異なる有限個の素点 $S$、各 $v\in S$ の局所元 $x_v\in K_v$ と開近傍 $W_v\subset K_v$（$x_v\in W_v$）に対し、すべての $v\in S$ で $a\in W_v$ を満たす $a\in K$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

有限素点では十分高い素イデアル冪に関する中国剰余定理で合同条件を同時に解きます。無限素点では[整数環のMinkowski埋め込みの格子性](../ANF5/index.md#thm-anf5-ideal-covolume)を使い、分母を大きく取って格子の間隔を縮めます。

<!-- proof-start -->
### 証明

有限素点の各開近傍に対し、ある整数 $N_{\mathfrak p}$ で $x_{\mathfrak p}+\mathfrak p^{N_{\mathfrak p}}\mathcal O_{\mathfrak p}\subseteq W_{\mathfrak p}$ となります。先に $d_0\in\mathcal O_K\setminus\{0\}$ を選び、指定したすべての有限素点で $d_0x_{\mathfrak p}\in\mathcal O_{\mathfrak p}$ とします。指数 $e_{\mathfrak p}$ を $e_{\mathfrak p}-\operatorname{ord}_{\mathfrak p}(d_0)\ge N_{\mathfrak p}$ となるように選べば、各 $\mathfrak p$ で

$$
b\equiv d_0T x_{\mathfrak p}
\pmod{\mathfrak p^{e_{\mathfrak p}}}
$$

を課すと、$\operatorname{ord}_{\mathfrak p}(T)=0$ である限り、$b/(d_0T)-x_{\mathfrak p}$ の付値は $e_{\mathfrak p}-\operatorname{ord}_{\mathfrak p}(d_0)$ 以上となり、$b/(d_0T)\in W_{\mathfrak p}$ です。ここで $T$ は指定した有限素点の下の有理素数と互いに素な正整数から選びます。各右辺は局所整数であり、[局所剰余環の同型](../ANF9/index.md#prop-anf9-number-field-completion)によって $\mathcal O_K/\mathfrak p^{e_{\mathfrak p}}$ の剰余類として指定できます。異なる素イデアルの冪は互いに素なので、中国剰余定理から $b$ が得られます。

その解全体は、固定した非零整イデアルについての格子剰余類です。

$$
\mathfrak a=\prod_{\mathfrak p}\mathfrak p^{e_{\mathfrak p}},
\qquad b\in b_0+\mathfrak a.
$$

[Minkowski埋め込みの格子性](../ANF5/index.md#thm-anf5-ideal-covolume)を使います。$K\otimes_\mathbb Q\mathbb R$ において、目標 $d_0T(x_v)_{v\mid\infty}$ から格子剰余類 $b_0+\mathfrak a$ のある点 $b$ までの距離は、格子 $\mathfrak a$ の基本領域の有界な直径 $M$ で抑えられます。

無限素点が指定されていない座標には任意の目標値（例えば $0$）を補います。$c=\min_{v\mid\infty}|v(d_0)|>0$ とおけば、埋め込みごとの $b/(d_0T)$ と $x_v$ の誤差は高々 $M/(cT)$ です。指定有限素点を避ける正整数 $T$ は任意に大きく取れるので、この誤差は $0$ に近づき、すべての指定無限近傍にも入ります。無限素点が指定されていない場合は中国剰余定理だけで十分です。
<!-- proof-end -->

<a id="prop-anf20-ray-finite"></a>

<!-- formal-statement-start -->
> **命題（剰余類群の有限性）**  
> 任意の数体 $K$ と法 $\mathfrak m$ に対して、剰余類群 $\operatorname{Cl}_{\mathfrak m}(K)$ は有限である。自然な全射

$$
\operatorname{Cl}_{\mathfrak m}(K)\longrightarrow\operatorname{Cl}(K)
$$

> があり、その核は有限群 $(\mathcal O_K/\mathfrak m_0)^\times\times\{\pm1\}^{|\mathfrak m_\infty|}$ の商である。$\mathfrak m_0=\mathcal O_K$ なら第一因子は自明とする。
<!-- formal-statement-end -->

### 証明の見取り図

法と互いに素なイデアルを各通常イデアル類に選ぶことで全射を得ます。通常類で自明な剰余類は主イデアルの生成元の有限剰余と実符号で決まります。

<!-- proof-start -->
### 証明

[類群の有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound)を使います。任意の分数イデアル $\mathfrak a$ に対し、[弱近似](#lem-anf20-weak-approx)で、法を割る素点において $\operatorname{ord}_{\mathfrak p}(b)=\operatorname{ord}_{\mathfrak p}(\mathfrak a)$ となる $b\in K^\times$ を選べます。すると $\mathfrak a(b)^{-1}\in I_{\mathfrak m}$ で元と同じ通常類を表し、全射です。

核の元は $(a)$（$a\in K^\times$、法を割る素点で付値 $0$）という形です。この $a$ の法の有限部分での単数剰余と、指定実素点での符号を記録します。ただし生成元は単数倍だけ曖昧なので、これだけで核から剰余群への写像が定まるとは主張しません。まず有限群

$$
R_{\mathfrak m}=
(\mathcal O_K/\mathfrak m_0)^\times
\times\{\pm1\}^{|\mathfrak m_\infty|}
$$

が現れます。[弱近似](#lem-anf20-weak-approx)により、$R_{\mathfrak m}$ の任意の剰余・符号データを持つ $a\in K^\times$ を選べます。$R_{\mathfrak m}\to\ker(\operatorname{Cl}_{\mathfrak m}(K)\to\operatorname{Cl}(K))$ をこのデータから $[(a)]$ へ送る写像とします。同じデータを持つ $a,b$ は各法の有限素点で単数かつ $a/b\equiv1$、各指定実素点で $a/b>0$ なので $[(a)]=[(b)]$ となり、写像は選択によらず定まります。

また剰余・符号は積の下で乗法的であり、任意の核の類はある $(a)$ から来ます。従ってこの写像は全射準同型であり、その核による商が求める有限群です。[通常の類群の有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound)から剰余類群全体も有限です。
<!-- proof-end -->

## 3. 剰余類群をイデールで見る

[イデール群](../ANF19/index.md#def-anf19-idele)では有限素点のほとんどが単数です。今度は、法を割る有限素点では単数のさらに小さい部分群、法に含む実素点では正の部分群を指定します。

<a id="def-anf20-ray-ideles"></a>

<!-- formal-statement-start -->
> **定義（法に対応する局所単数部分群）**  
> 数体 $K$ の法 $\mathfrak m$ に対し、各素点で部分群 $U_v(\mathfrak m)$ を以下のように置く。
>
> - 有限素点で $n_{\mathfrak p}=0$：$\mathcal O_{\mathfrak p}^\times$。
> - 有限素点で $n_{\mathfrak p}>0$：$1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}$。
> - 法に含む実素点：$\mathbb R_{>0}$。
> - その他の実素点：$\mathbb R^\times$。
> - 複素素点：$\mathbb C^\times$。

$$
U(\mathfrak m)=\prod_{v\in V_K}U_v(\mathfrak m)
\subseteq\mathbb I_K.
$$

> 積はイデールの制限付き直積位相で開部分群である。
<!-- formal-statement-end -->

有限素点での $1+\mathfrak p^n\mathcal O_{\mathfrak p}$ は局所単数部分群です。法に含む実素点の正半直線も $\mathbb R^\times$ の開部分群です。その他の有限素点では全単数群なので、積はイデールの基本開集合になります。

<!-- definition-example-start: def-anf20-ray-ideles -->
**定義の確認**。 $K=\mathbb Q$、$\mathfrak m=(5)\infty$ のとき、

$$
U(\mathfrak m)=
\mathbb R_{>0}\times
(1+5\mathbb Z_5)\times
\prod_{p\ne5}\mathbb Z_p^\times.
$$

たとえば $5$ 成分が $6$、無限成分が $2$、他の有限成分が $1$ のイデールはここに属します。$5$ 成分が $2$ なら $2-1\notin5\mathbb Z_5$ なので属しません。
<!-- definition-example-end -->

<a id="thm-anf20-ray-idele-isom"></a>

<!-- formal-statement-start -->
> **定理（剰余類群とイデール商）**  
> 数体 $K$ と任意の法 $\mathfrak m$ に対し、イデールから得られる商と剰余類群との間に自然な群同型がある。

$$
\operatorname{Cl}_{\mathfrak m}(K)
\simeq
\mathbb I_K/(K^\times U(\mathfrak m))
\simeq C_K/q(U(\mathfrak m)),\qquad q:\mathbb I_K\to C_K.
$$

> ここで $q$ は $C_K=\mathbb I_K/K^\times$ への商写像であり、$q(U(\mathfrak m))$ はその像を表す。
<!-- formal-statement-end -->

### 証明の見取り図

法を割らない素イデアルの一様化元をその場所だけに置き、法の場所では成分を $1$ にしたイデールを対応させます。合同 $1$ の主イデアルは商で消えます。逆方向では弱近似を使って法の場所での成分を $1$ に近づけ、残りの有限素点の付値をイデアルへ戻します。

<!-- proof-start -->
### 証明

$\mathfrak a=\prod_{\mathfrak p\nmid\mathfrak m_0}\mathfrak p^{e_{\mathfrak p}}\in I_{\mathfrak m}$ を取ります。各該当素点で一様化元 $\pi_{\mathfrak p}$ を選び、$y(\mathfrak a)_{\mathfrak p}=\pi_{\mathfrak p}^{e_{\mathfrak p}}$、法を割る有限素点とすべての無限素点では $1$、他の有限素点でも $1$ とします。非零指数は有限個なのでこれはイデールです。一様化元の選択を変えると比は法の外の局所単数となり、商で同じ類です。従って

$$
\theta:I_{\mathfrak m}\longrightarrow
\mathbb I_K/(K^\times U(\mathfrak m)),
\qquad
\mathfrak a\longmapsto[y(\mathfrak a)]
$$

はよく定義された群準同型です。

$a\equiv1\pmod{\mathfrak m}$ なら、$y((a))\Delta(a)^{-1}$ は法の外の有限素点で局所単数、法の有限素点で $a^{-1}\in1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}$、法の実素点では正です。よって $y((a))\in K^\times U(\mathfrak m)$ であり、$P_{\mathfrak m,1}\subseteq\ker\theta$ です。

逆に $y(\mathfrak a)=\Delta(a)u$（$u\in U(\mathfrak m)$）なら、法の有限素点の成分が $1$ なので $a^{-1}=u_{\mathfrak p}\in1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}$。逆数を取って $a\equiv1$ です。法の実素点でも $u_v=a_v^{-1}>0$ だから $a_v>0$。法の外の有限素点では $u_{\mathfrak p}$ の付値が $0$ なので、$\operatorname{ord}_{\mathfrak p}(a)=e_{\mathfrak p}$ です。法の素点での付値は $0$ ですから $\mathfrak a=(a)\in P_{\mathfrak m,1}$。従って核はちょうど $P_{\mathfrak m,1}$ です。

任意のイデール $x$ を取ります。法を割る有限素点では、非零の $x_{\mathfrak p}$ に対して

$
W_{\mathfrak p}=x_{\mathfrak p}(1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p})\subset K_{\mathfrak p}^\times
$

を開近傍に選びます。法に含む実素点では $x_v$ と同符号の開半直線を選びます。これらの有限個の開集合に[弱近似](#lem-anf20-weak-approx)を適用すると、$a$ を各 $W_{\mathfrak p}$ に入れ、指定実素点で同符号にできます。いずれかの条件があるとき、この $a$ は非零です。法が自明で条件が一つもなければ $a=1$ とします。よって各法の有限素点で $x_{\mathfrak p}a^{-1}\in1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}$、法の実素点で $x_va_v^{-1}>0$ が成立し、$x\Delta(a)^{-1}$ は法の場所で $U(\mathfrak m)$ に入ります。法の外では、一様化元の冪と局所単数に分けられるので、有限個の非零付値を持つイデアル $\mathfrak a$ の $y(\mathfrak a)$ に、ある $u\in U(\mathfrak m)$ を掛けたものです。よって $\theta$ は全射であり、核による商が主張の同型です。
<!-- proof-end -->

## 4. 局所Artin写像を掛け合わせる

$L/K$ を有限Abel Galois拡大とします。各素点 $v$ について、一つの素点 $w\mid v$ を $L$ 上で選び、局所拡大 $L_w/K_v$ の [局所Artin写像](../ANF17/index.md#thm-anf17-local-reciprocity)を使います。Abel拡大では分解群が可換な大域Galois群の部分群なので、$w$ の取り方で得られる大域自己同型は変わりません。

実素点で $L_w/K_v=\mathbb C/\mathbb R$ となるときは、ノルムが $N_{\mathbb C/\mathbb R}(z)=z\overline z=|z|^2$ であり、像は $\mathbb R_{>0}$ です。したがって $\mathbb R^\times/\mathbb R_{>0}\simeq\{\pm1\}$ を $\operatorname{Gal}(\mathbb C/\mathbb R)=\{1,c\}$ と対応させ、負元を複素共役 $c(z)=\overline z$ へ送ります。実素点で分裂する場合と複素素点では局所Galois群は自明です。

<a id="def-anf20-global-artin"></a>

<!-- formal-statement-start -->
> **定義（有限Abel拡大の大域Artin積）**  
> 数体の有限Abel Galois拡大 $L/K$ と $x=(x_v)_v\in\mathbb I_K$ に対し、算術的Frobenius規約の局所写像の積を次で定める。

$$
\operatorname{Art}_{L/K}(x)=
\prod_{v\in V_K}
\operatorname{rec}_{L_w/K_v}(x_v)
\quad\in\operatorname{Gal}(L/K).
$$
<!-- formal-statement-end -->

この節以降の円分体の例では、$\zeta_5$ を原始五乗根、$L=\mathbb Q(\zeta_5)$ とします。$a\in(\mathbb Z/5\mathbb Z)^\times$ に対して

$
\sigma_a(\zeta_5)=\zeta_5^a,
\qquad \sigma_a\sigma_b=\sigma_{ab}
$

と書きます。これは $L/\mathbb Q$ の**大域**自己同型です。[ANF18の円分Galois指数](../ANF18/index.md#def-anf18-cyclotomic-exponent)と指数の読み方は同じですが、そこでの局所拡大 $\mathbb Q_5(\zeta_5)/\mathbb Q_5$ の自己同型とは作用先を区別します。

<!-- definition-example-start: def-anf20-global-artin -->
**定義の確認**。 $L=\mathbb Q(\zeta_5)$ とし、$x_2=2$、他の全素点の成分を $1$ とします。これは有限個を除き単数であり、各成分も非零なのでイデールです。$p=2$ の局所拡大は非分岐で、一様化元 $2$ は算術的Frobenius $\sigma_2$ に写ります。その他の成分 $1$ の像はすべて恒等です。従って $\operatorname{Art}_{L/\mathbb Q}(x)=\sigma_2$ と定義を直接計算できます。
<!-- definition-example-end -->

<a id="prop-anf20-artin-product"></a>

<!-- formal-statement-start -->
> **命題（大域Artin積の有限性と準同型性）**  
> 有限Abel Galois拡大 $L/K$ について、上の積は任意のイデール $x$ に対して非自明な因子が有限個しかなく、連続群準同型 $\mathbb I_K\to\operatorname{Gal}(L/K)$ を与える。非分岐有限素点 $\mathfrak p$ では、一様化元の像は算術的Frobenius、局所単数の像は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

数体の有限拡大で分岐する有限素点は有限個です。それ以外で局所拡大は非分岐になり、局所単数の像が消えます。

<!-- proof-start -->
### 証明

$L/K$ は有限拡大なので、分岐しうる有限素点は相対判別式を割る有限個に限られます。イデールの定義により $x_v\in\mathcal O_v^\times$ でない有限素点も有限個です。この二つの有限集合と無限素点以外では、[非分岐局所Artin写像の規格化](../ANF15/index.md#thm-anf15-unramified-reciprocity)により局所単数は $1$ へ移ります。従って積は有限個の因子の積です。局所準同型の積なので群準同型であり、Abel性により因子順にも依存しません。

連続性について、分岐する有限個の局所点では局所写像の開核を取り、無限素点でも同様に開核を選びます。その他の有限素点では単数群全体を取れば、これらの積はイデールの開近傍で、そこでは大域Artin積が $1$ です。有限離散群への準同型は単位元で連続なら全点で連続です。最後のFrobenius規格化は同じ局所定理から従います。
<!-- proof-end -->

<a id="thm-anf20-global-reciprocity"></a>

<!-- formal-statement-start -->
> **定理（大域Artin相互法則：外部定理）**  
> 数体 $K$ と有限Abel Galois拡大 $L/K$ に対し、[大域Artin積](#def-anf20-global-artin)は対角の $K^\times$ 上で自明で、全射である。またその核は局所ノルムを合わせたイデールノルムの像と対角元の積である。

$$
\operatorname{Art}_{L/K}(\Delta(a))=1\quad(a\in K^\times),
$$

$$
C_K/N_{L/K}(C_L)
\xrightarrow{\ \sim\ }\operatorname{Gal}(L/K).
$$

> 後者のノルムは各素点の局所ノルムを掛け合わせて定める $C_L\to C_K$ の写像である。
<!-- formal-statement-end -->

**証明の射程**。前命題が示したのは「積が定義できること」までです。対角元で積が $1$ となる主張、全射性とノルム核は前命題の有限個の因子の積だけからは従いません。ここでは大域類体論の中心定理として採用し、ANF21で局所・大域の接合と必要な証明機構を扱います。参考：J. S. Milne, *Class Field Theory*, Global Class Field Theory（https://www.jmilne.org/math/CourseNotes/cft.html）。

ここから先は、この外部定理の**使い方**を吟味します。$\mathfrak p$ が $L/K$ で非分岐なら、[イデールとイデアルの対応](#thm-anf20-ray-idele-isom)によって素イデアル $\mathfrak p$ だけに一様化元を置いたイデールの像は、その素イデアルの算術的Frobeniusになります。

<a id="def-anf20-ideal-artin"></a>

<!-- formal-statement-start -->
> **定義（イデアルのArtin写像）**  
> $L/K$ を有限Abel Galois拡大、$S$ をその分岐有限素点をすべて含む有限集合とする。$S$ と互いに素な分数イデアルの群 $I^S_K$ から、各非分岐素イデアルにおける算術的Frobeniusで定める準同型を次で与える。

$$
\left(\frac{L/K}{\cdot}\right): I^S_K\longrightarrow
\operatorname{Gal}(L/K),
\qquad
\prod_{\mathfrak p\notin S}\mathfrak p^{e_{\mathfrak p}}
\longmapsto
\prod_{\mathfrak p\notin S}
\operatorname{Frob}_{\mathfrak p}^{e_{\mathfrak p}}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf20-ideal-artin -->
**定義の確認**。 $L=\mathbb Q(\zeta_5)$ とし、$S=\{5\}$ を選びます。素イデアル $(11)$ は非分岐で、$11\equiv1\pmod5$ より $\operatorname{Frob}_{11}=1$ です。一方 $(2)(3)^{-1}$ の指数は $2$ で $1$、$3$ で $-1$、その他で $0$ なので、像は $\sigma_2\sigma_3^{-1}=\sigma_{2\cdot2}=\sigma_4$ です。これにより正負両方の素イデアル指数に対して準同型の定義を直接確認できます。
<!-- definition-example-end -->

一意な素イデアル分解があるので、各指数が一意に決まり、負の指数はFrobeniusの逆元として扱えます。ただし、**すべての主イデアルが核に入るわけではありません**。外部の大域相互法則と、有限個の合同条件に応じた法 $\mathfrak m$ を選ぶことにより、$P_{\mathfrak m,1}$ が核に入るようにできます。

<a id="thm-anf20-ray-class-field"></a>

<!-- formal-statement-start -->
> **定理（剰余類体とArtin対応：外部存在定理）**  
> 数体 $K$ と法 $\mathfrak m$ に対し、$K$ の有限Abel拡大 $K_{\mathfrak m}/K$ が、$K$ 内の固定された代数閉包の中で一意に存在する。この拡大は $\mathfrak m_0$ の外では非分岐で、Artin写像が同型

$$
\operatorname{Cl}_{\mathfrak m}(K)
\xrightarrow{\ \sim\ }
\operatorname{Gal}(K_{\mathfrak m}/K)
$$

> を誘導する。この体を法 $\mathfrak m$ の剰余類体という。また任意の有限Abel拡大 $L/K$ は、ある法 $\mathfrak m$ に対する $K_{\mathfrak m}$ に含まれ、そのArtin写像は剰余類群からの全射として得られる。
<!-- formal-statement-end -->

**証明の射程**。剰余類体の存在・一意性、およびすべての有限Abel拡大を捉える部分は、前節の有限性やイデール商同型から単独で証明できません。大域類体論の**存在定理**を追加で使っています。対して、一度対応があると認めた後の「剰余類群を計算してGalois群の位数を知る」部分は本講の証明で十分です。

## 5. 円分体を使ってArtin記号を計算する

$\zeta_5=e^{2\pi i/5}$ とし、前節で導入した大域自己同型 $\sigma_a$ を使います。五次円分多項式は $\Phi_5(X)=X^4+X^3+X^2+X+1$ であり、

$$
\Phi_5(1+T)=T^4+5T^3+10T^2+10T+5
$$

は $5$ についてEisenstein多項式です。[Eisensteinの既約性判定](../ANF10/index.md#thm-anf10-eisenstein-irreducible)から $[L:\mathbb Q]=4$ です。四つの根 $\zeta_5^a$ はすべて $L$ に属するので $L/\mathbb Q$ はGalois拡大です。四つの $\sigma_a$ が全自己同型を尽くし、合成則により可換です。特に $2^2\equiv-1$、$2^4\equiv1\pmod5$ から $\sigma_2$ の位数は $4$ です。

<a id="prop-anf20-cyclotomic-artin"></a>

<!-- formal-statement-start -->
> **命題（五次円分体のArtin計算）**  
> $L=\mathbb Q(\zeta_5)$ では $5$ 以外の有限素点で非分岐であり、任意の素数 $p\ne5$ に対して

$$
\operatorname{Frob}_{p}(\zeta_5)=\zeta_5^p.
$$

> したがって $\operatorname{Cl}_{(5)\infty}(\mathbb Q)\to\operatorname{Gal}(L/\mathbb Q)$ は、正の分数イデアル $r\mathbb Z$ の $5$ を割らない生成元 $r$ を $\sigma_{\overline r}$ へ送る同型である。
<!-- formal-statement-end -->

### 証明の見取り図

五次円分多項式は $x^4+x^3+x^2+x+1$ です。$p\ne5$ ではその還元の根が重複しないことから非分岐性を確かめ、還元上の $p$ 乗写像が $\zeta_5$ のGalois作用を指定します。

<!-- proof-start -->
### 証明

$p\ne5$ では $X^5-1$ の導関数が $5X^4$ なので、両多項式は共通根を持ちません。従って $\overline\Phi_5$ は $\mathbb F_p$ 上で重根を持ちません。ただしこの条件から素イデアルの分岐指数を読むには、**整数環の表示が法 $p$ で正しい**ことも確かめます。

$\alpha$ が $\zeta_5$ の四つの共役根を動くとき、$\Phi_5'(\alpha)=5\alpha^4/(\alpha-1)$ です。また $\prod_{a=1}^4(1-\zeta_5^a)=\Phi_5(1)=5$、$\prod_{a=1}^4\zeta_5^a=1$ です。[基底の判別式](../ANF2/index.md#def-anf2-basis-discriminant)をVandermonde積で表して

$
\left|\operatorname{disc}(1,\zeta_5,\zeta_5^2,\zeta_5^3)\right|
=\left|\prod_{a=1}^4\Phi_5'(\zeta_5^a)\right|
=\frac{5^4}{5}=5^3.
$

[判別式と指数の平方](../ANF2/index.md#thm-anf2-discriminant-index)から、$[\mathcal O_L:\mathbb Z[\zeta_5]]$ の素因子は $5$ に限られます。よって $p\ne5$ では $p$ 進完備化した整数環が $\mathcal O_L\otimes_{\mathbb Z}\mathbb Z_p\simeq\mathbb Z_p[\zeta_5]$ となり、特に

$
\mathcal O_L/(p)\simeq\mathbb F_p[T]/(\overline\Phi_5(T)).
$

この環に[単項生成の場合の素イデアル分解の議論](../ANF4/index.md#thm-anf4-monogenic-factorization)を適用すると、各分岐指数は $\overline\Phi_5$ の既約因子の重複度と等しくなります。重複度はすべて $1$ なので非分岐です。

算術的Frobeniusは剰余体で $z\mapsto z^p$ です。$\zeta_5$ の還元に適用すると次を得ます。

$$
\overline{\zeta_5}\longmapsto\overline{\zeta_5^p}.
$$

自己同型 $\sigma_p$ もこの作用を持ち、$\zeta_5$ が $L$ を生成するので二つの自己同型は一致します。

$p\ne5$ の素イデアルの積と逆数へ拡張すれば、正の有理数 $r$（分子・分母が $5$ と互いに素）で生成されるイデアルの像は $\sigma_{\overline r}$ です。[法 $5\infty$ の群の計算](#prop-anf20-ray-q)による定義域とGalois群はいずれも位数 $4$。$\overline r$ が全部の非零剰余を走るので、この写像は同型です。
<!-- proof-end -->

**具体計算**。$p=2$ のFrobeniusは $\zeta_5\mapsto\zeta_5^2$、$p=3$ では $\zeta_5\mapsto\zeta_5^3$、$p=11$ では恒等写像です。$2$ の剰余は位数 $4$、$11\equiv1\pmod5$ です。

**局所積の打消し**。対角有理数 $2$ を考えます。[ANF18の全分岐四次拡大](../ANF18/index.md#prop-anf18-cyclotomic-degree)によれば $\mathbb Q_5(\zeta_5)/\mathbb Q_5$ の次数は $4$ です。これは上で示した $[L:\mathbb Q]=4$ と等しいので、$5$ の上の素点は一つだけで、そこでの完備化は $L_w=\mathbb Q_5(\zeta_5)$ です。従って局所の明示公式をこの大域拡大の $5$ 成分へ適用できます。

$2$ 以外の非分岐素点の局所単数成分は自明です。$2$ 成分は $\sigma_2$、$5$ 成分の[素数冪円分拡大の明示局所相互法則](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)は単数 $2$ を $\sigma_{2^{-1}}=\sigma_3$ へ、正の実成分は恒等へ送ります。よって

$$
\operatorname{Art}_{L/\mathbb Q}(\Delta(2))
=\sigma_2\sigma_3
=\sigma_6
=1.
$$

これは[素数冪円分拡大の明示局所相互法則の規格化](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)と整合する具体的な検算であり、一般の大域相互法則全体の証明ではありません。

法から実素点を外すと剰余類群が位数 $2$ になる一方、この拡大のGalois群は位数 $4$ です。したがって $L$ は法 $(5)$ の剰余類体には**なりません**。$\mathbb Q$ の実素点が複素化するという条件を落とすと、符号に対応する複素共役の情報が失われるためです。

## 6. 演習：合同条件からFrobeniusへ

### A1. 法の合同条件

$K=\mathbb Q$、$\mathfrak m=(5)\infty$ で $6/11$、$-4$、$5$、$-9$ のどれが $1$ に合同か判定せよ。

- Level: A
- ID: ANF20-A1

<!-- solution-start -->
**詳細解答**。分母が $5$ と互いに素で、分子も $5$ と互いに素なことが最初の条件です。$6/11$ は $6\equiv11\equiv1\pmod5$ なので剰余 $1$、しかも正なので適合します。$-4\equiv1$ ですが負なので不適合です。$5$ は付値が $1$ で局所単数ではないため不適合です。$-9\equiv1$ ですが負なので不適合です。従って適合するのは $6/11$ だけです。
<!-- solution-end -->

### A2. $5\infty$ の四つの類

$\operatorname{Cl}_{(5)\infty}(\mathbb Q)$ における $2\mathbb Z$ の位数を求めよ。

- Level: A
- ID: ANF20-A2

<!-- solution-start -->
**詳細解答**。[有理数体の剰余類計算](#prop-anf20-ray-q)で $2\mathbb Z$ の類は $\overline2$ に対応します。$2^2=4\equiv-1\ne1\pmod5$、$2^4=16\equiv1\pmod5$ なので最小の正指数は $4$ です。従って位数は $4$ です。
<!-- solution-end -->

### A3. 無限素点を落としたら

法 $(5)$ では $2\mathbb Z$ の類の位数はいくらか。法 $(5)\infty$ と比較せよ。

- Level: A
- ID: ANF20-A3

<!-- solution-start -->
**詳細解答**。法 $(5)$ の群は $(\mathbb Z/5\mathbb Z)^\times/\{\pm1\}$ です。$2^2\equiv-1$ はこの商では単位類であり、$2\not\equiv\pm1$ なので $[2]$ の位数は $2$。実素点の正条件を外したため、正負の生成元が同じ判定となり、位数 $4$ から $2$ に減ります。
<!-- solution-end -->

### A4. 素数のFrobenius

$\mathbb Q(\zeta_5)$ の $p=2,3,11$ のFrobeniusが $\zeta_5$ をどこへ送るか求めよ。

- Level: A
- ID: ANF20-A4

<!-- solution-start -->
**詳細解答**。[円分Artin計算](#prop-anf20-cyclotomic-artin)から $\operatorname{Frob}_p(\zeta_5)=\zeta_5^{p\bmod5}$。$2$ は指数 $2$、$3$ は指数 $3$、$11\equiv1$ は指数 $1$ なので順に $\zeta_5^2,\zeta_5^3,\zeta_5$ です。$2,3,11$ はいずれも $5$ と異なり非分岐条件を満たします。
<!-- solution-end -->

### A5. 対角元 $2$ の打消し

$\operatorname{Art}_{\mathbb Q(\zeta_5)/\mathbb Q}(\Delta(2))$ を有限素点と実素点の因子に分けて計算せよ。

- Level: A
- ID: ANF20-A5

<!-- solution-start -->
**詳細解答**。$p=2$ は付値 $v_2(2)=1$ なのでFrobenius $\sigma_2$。$p=5$ では $2$ が単数で、[素数冪円分拡大の明示局所相互法則](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)から $\sigma_{2^{-1}}=\sigma_3$ です。$p\ne2,5$ は非分岐局所拡大の単数なので $1$、実素点では $2>0$ なので $1$ です。積の指数は $2\cdot3\equiv1\pmod5$。従って全積は恒等自己同型です。
<!-- solution-end -->

### B1. 剰余類群の有限性を組み立てる

一般の $K$ で、通常の類群への全射と、その核が法の有限剰余・実符号で決まることを説明せよ。

- Level: B
- ID: ANF20-B1

<!-- solution-start -->
**詳細解答**。任意のイデアル $\mathfrak a$ に対し、法を割る素点での付値を $b\in K^\times$ に[弱近似](#lem-anf20-weak-approx)で合わせます。すると $\mathfrak a(b)^{-1}$ は法と互いに素で、元のイデアルと同じ通常類を表します。これで通常の類群への全射が得られます。

核の元は主分数イデアル $(a)$ で表せます。法に含む各有限素点で $v_{\mathfrak p}(a)=0$ なので、$a$ は法の有限剰余で単数です。これに指定実素点での符号を組み合わせ、次の有限群に写します。

$$
R_{\mathfrak m}=
(\mathcal O_K/\mathfrak m_0)^\times
\times\{\pm1\}^{|\mathfrak m_\infty|}.
$$

同じ剰余と符号を持つ $a,b$ の比は法に関して $1$ に合同で、指定実素点では正です。従って $[(a)]=[(b)]$。また[弱近似](#lem-anf20-weak-approx)で任意のデータを実現できます。よって核はこの有限群の商です。

最後に[通常の類群の有限性](../ANF6/index.md#thm-anf6-minkowski-class-bound)と合わせ、剰余類群も有限です。
<!-- solution-end -->

### B2. イデール商への写像の核

法 $\mathfrak m$ と互いに素なイデアル $\mathfrak a$ の一様化元イデール $y(\mathfrak a)$ が $K^\times U(\mathfrak m)$ に入るなら、$\mathfrak a\in P_{\mathfrak m,1}$ となることを再現せよ。

- Level: B
- ID: ANF20-B2

<!-- solution-start -->
**詳細解答**。$y(\mathfrak a)=\Delta(a)u$ と書きます。法の有限素点では $y_{\mathfrak p}=1$ だから $a^{-1}=u_{\mathfrak p}\in1+\mathfrak p^{n_{\mathfrak p}}\mathcal O_{\mathfrak p}$。この群は逆元に関して閉じているので $a\equiv1$ です。法の実素点では $1=a_v u_v$、$u_v>0$ なので $a_v>0$。その他の有限素点では $u_{\mathfrak p}$ が単数で、$v_{\mathfrak p}(a)=v_{\mathfrak p}(y)=e_{\mathfrak p}$。法の素点の付値は $0$ だから $J(\Delta(a))=\mathfrak a$ です。よって $\mathfrak a=(a)$ であり、指定の合同条件も成立します。
<!-- solution-end -->

### B3. $5$ 成分に単数 $2$ を置く

$\mathbb Q$ のイデール $x$ を $x_5=2$、それ以外の全素点で $x_v=1$ とする。法 $(5)\infty$ のイデール商で、$x$ に対応する剰余類と $\mathbb Q(\zeta_5)$ 上のArtin像を計算せよ。

- Level: B
- ID: ANF20-B3

<!-- solution-start -->
**詳細解答**。$\Delta(2)$ で割った $x'=x\Delta(2)^{-1}$ は、$5$ 成分が $1$、実成分が $1/2>0$、$p\ne5$ 成分は $1/2$ です。$p=2$ の付値は $-1$、$p\ne2,5$ の付値は $0$ なので、[剰余類群とイデール商の対応](#thm-anf20-ray-idele-isom)で対応する分数イデアルは $(2)^{-1}$ です。その法 $5\infty$ の剰余は $2^{-1}\equiv3\pmod5$、よって[五次円分体のArtin計算](#prop-anf20-cyclotomic-artin)からArtin像は $\sigma_3$ です。局所的にも[円分体の明示局所相互法則](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)により、$5$ 成分の単数 $2$ は $\sigma_{2^{-1}}=\sigma_3$、他の成分は $1$ なので一致します。
<!-- solution-end -->

### B4. 符号が見える局所因子

対角元 $-1$ の $5$ 成分と実成分が $\mathbb Q(\zeta_5)$ 上でどのように相殺するか求めよ。

- Level: B
- ID: ANF20-B4

<!-- solution-start -->
**詳細解答**。$5$ 成分の $-1$ は局所単数です。[素数冪円分拡大の明示局所相互法則](../ANF18/index.md#thm-anf18-explicit-cyclotomic-reciprocity)から、その像は $\sigma_{(-1)^{-1}}=\sigma_{-1}$ です。

実成分も負なので、[本章で導入した実素点のノルム商](#def-anf20-global-artin)により複素共役 $\sigma_{-1}$ を与えます。他の有限素点では非分岐局所拡大の単数だから、像はすべて $1$ です。

従って大域Artin積は $\sigma_{-1}^2=1$ になります。実素点を法から外すと、複素共役を区別する正負の情報が失われることも分かります。
<!-- solution-end -->

### C1. 分数イデアルのArtin記号と法の変更

$\mathfrak a=(14/3)\mathbb Z$ を法 $(5)\infty$ の剰余類とみなし、$\mathbb Q(\zeta_5)$ へのArtin像と位数を求めよ。さらに法 $(5)$ に変えると同じ類の位数がどう変わるか論じよ。

- Level: C
- ID: ANF20-C1

<!-- solution-start -->
**詳細解答**。$5\nmid14\cdot3$ なので法と互いに素です。正の生成元 $14/3$ の剰余は

$$
14\cdot3^{-1}\equiv4\cdot2\equiv3\pmod5.
$$

よって[有理数体の剰余類計算](#prop-anf20-ray-q)から $\mathfrak a$ の類は $\overline3$ です。$3^2=9\equiv-1$、$3^4\equiv1$ なので位数は $4$。一方[イデアルのArtin写像](#def-anf20-ideal-artin)で

$$
\mathfrak a=(2)(7)(3)^{-1},
\qquad
\left(\frac{L/\mathbb Q}{\mathfrak a}\right)
=\sigma_2\sigma_7\sigma_3^{-1}
=\sigma_{2\cdot2\cdot2}
=\sigma_3.
$$

ここでは $7\equiv2$、$3^{-1}\equiv2\pmod5$ を用いました。像 $\sigma_3$ も位数 $4$ です。法 $(5)$ の剰余類群では $\{\pm1\}$ でさらに割るので $3^2\equiv-1$ が単位類となり、位数は $2$ へ減ります。この法では四次拡大 $L/\mathbb Q$ のArtin写像が剰余類群から同型となることはありません。実素点での正条件が四次の複素共役情報を保持するために必要です。
<!-- solution-end -->

次講ANF21では、ここで外部定理として使った「対角元で局所積が消える」「ノルムが核になる」「剰余類体が存在する」の三つを、局所から大域への証明依存に分解します。
