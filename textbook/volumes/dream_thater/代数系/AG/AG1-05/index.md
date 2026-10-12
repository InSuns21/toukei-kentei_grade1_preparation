# AG1-05 Noether環とHilbertの基底定理

前章の[局所化](../AG1-04/index.md#def-ag1-04-localization)では、点の近くで分母にできる関数を増やしました。しかし局所化する前の多項式環に、そもそも無限に多くの方程式が与えられていたら、すべてを管理できるのでしょうか。例えば $k[x,y]$ のイデアルに数百個の多項式が入っていても、実はごく少数の生成元だけで同じ制約を表せる場合があります。一方、変数が無限個ある環では、何個生成元を追加しても新しい制約が残ることがあります。

本章の中心は、**イデアルの生成元は有限個で済むか**という問いです。無限個の式を有限個へ縮約できることを環の条件として定義し、係数環から多項式環へこの性質を持ち上げる定理を、最高次係数から証明します。この結果が、有限変数の多項式方程式系とそのZariski閉集合を扱うための基盤になります。

以下、特に断らない限り $R$ は単位元 $1\ne0$ を持つ可換環、$k$ は体です。多項式の係数環に整域性を仮定しません。$I\subseteq R$ はイデアルを表します。

## 1. 無限に増えるイデアルを有限個の元で制御する

[生成イデアルの最小性](../AG1-01/index.md#prop-ag1-01-generated-ideal-smallest)によれば、集合 $E\subseteq R$ から作るイデアル $(E)$ は、$E$ を含む最小のイデアルです。例えば $k[x,y]$ の $(x^2,xy)$ の任意の元は $a(x,y)x^2+b(x,y)xy$ と表せます。ここで気になるのは、すべてのイデアルがこのように有限個の式で表せるかどうかです。

まず、イデアルが次第に大きくなる列を考えます。列

$$
I_1\subseteq I_2\subseteq I_3\subseteq\cdots
$$

について、ある $N$ から先は $I_N=I_{N+1}=\cdots$ となる場合を考えます。この性質を環のすべてのイデアル列に要求するのが次の定義です。例えば $(x^3)\subsetneq(x^2)\subsetneq(x)\subsetneq k[x]$ は有限段で止まります。逆に $(x)\supsetneq(x^2)\supsetneq\cdots$ は降鎖なので、これが続いても昇鎖の条件には反しません。

<a id="def-ag1-05-ideal-acc"></a>

<!-- formal-statement-start -->
> **定義（イデアルの昇鎖条件）**  
> 単位的可換環 $R$ のイデアルの任意の昇鎖 $I_1\subseteq I_2\subseteq\cdots$ に対し、ある $N\ge1$ が存在して全 $n\ge N$ で $I_n=I_N$ となるとき、$R$ のイデアルは**昇鎖条件**を満たすという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-05-ideal-acc -->
**定義の確認**：$R=k\times k$（$k$ は体）のイデアルは $0$、$k\times0$、$0\times k$、$R$ の四つに限られます。実際イデアル $I$ と $(a,b)\in I$ に対し、$(1,0)(a,b)=(a,0)$ と $(0,1)(a,b)=(0,b)$ がともに $I$ に属します。よって $I$ は各座標のイデアルの直積であり、体のイデアルが $0,k$ しかないことから四つを尽くします。どの昇鎖でも真の増大は高々2回なので、ある $N$ 以降は $I_n=I_N$ となり、昇鎖条件を満たします。
<!-- definition-example-end -->

<a id="def-ag1-05-noetherian-ring"></a>

<!-- formal-statement-start -->
> **定義（Noether環）**  
> 単位的可換環 $R$ が **Noether環** であるとは、そのイデアルが[昇鎖条件](#def-ag1-05-ideal-acc)を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-05-noetherian-ring -->
**定義の確認**：定義の直接例を確かめましょう。体 $k$ のイデアルは $0$ と $k$ の二つだけです。実際、非零元 $a$ を含むイデアル $I$ は $a^{-1}a=1$ を含み $I=k$ です。従って体のイデアルの昇鎖では、$0$ から $k$ へ高々一度しか真の増大が起きず、体はNoether環です。
<!-- definition-example-end -->

昇鎖の形では確認しにくい場面のため、より使いやすい特徴付けを導きます。

<a id="prop-ag1-05-acc-finite-generation"></a>

<!-- formal-statement-start -->
> **命題（昇鎖条件と有限生成の同値性）**  
> 単位的可換環 $R$ について、次は同値である。
> 1. $R$ はNoether環である。
> 2. $R$ のすべてのイデアルは有限生成である。
> 3. $R$ のイデアルの空でない任意の集合は、包含関係に関する極大元を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$1\Rightarrow2$ では、イデアル全体の元を一つずつ取り出して生成元へ加えます。停止しなければ真の昇鎖ができて矛盾します。$2\Rightarrow1$ では昇鎖の合併を一つのイデアルとして扱います。有限個の生成元は列のどこか一段にすべて入り、その段で合併に達します。極大元との関係も同じ「真に大きいイデアルを何度も作れない」仕組みです。

<!-- proof-start -->
### 証明

**(1)$\Rightarrow$(2).** イデアル $I$ が有限生成でないと仮定します。$a_1\in I$ を取り、$(a_1)\ne I$ だから $a_2\in I\setminus(a_1)$ を取れます。一般に $a_1,\dots,a_n$ を選んでも $(a_1,\dots,a_n)\ne I$ なので

$$
a_{n+1}\in I\setminus(a_1,\dots,a_n)
$$

を選べます。このとき

$$
(a_1)\subsetneq(a_1,a_2)\subsetneq\cdots
$$

は停止しません。矛盾です。零イデアルは空集合で生成されるため、例外にはなりません。

**(2)$\Rightarrow$(1).** 昇鎖 $(I_n)$ を任意に取り、$I=\bigcup_{n\ge1}I_n$ と置きます。$a,b\in I$ なら $a\in I_i,b\in I_j$ となる $i,j$ があり、$m=\max(i,j)$ に対し $a-b\in I_m$ です。また $r\in R$ なら $ra\in I_i$ です。従って $I$ はイデアルです。

有限生成性から $I=(b_1,\dots,b_s)$ と書け、各 $b_j$ はある $I_{n_j}$ に入ります。$I\ne0$ なら $s\ge1$ として $N=\max_{1\le j\le s}n_j$ を選びます。このとき $b_j\in I_N$ なので $I\subseteq I_N$、逆に $I_N\subseteq I$ であり $I=I_N$ です。従って $n\ge N$ では $I_N\subseteq I_n\subseteq I_N$ となり停止します。$I=0$ ならすべての $I_n$ が零なので初めから停止します。

**(1)$\Rightarrow$(3).** 空でないイデアルの集合 $\mathcal F$ に極大元がないなら $J_1\in\mathcal F$ を一つ選び、各 $J_n$ に対して $J_n\subsetneq J_{n+1}\in\mathcal F$ を選べます。これは停止しない昇鎖で矛盾です。

**(3)$\Rightarrow$(1).** 任意の昇鎖の値からなる集合 $\{I_n:n\ge1\}$ には極大元 $I_N$ があります。$n\ge N$ では $I_N\subseteq I_n$ であり、極大性から等号です。
<!-- proof-end -->

この命題のおかげで、以後「Noetherである」を証明するとき、昇鎖そのものを毎回追わずに**任意のイデアルの有限生成性**を示して構いません。体の例では $(0)$ と $(1)$ がすべてです。

### 有限個の変数という条件は必要か

$k[x_1,x_2,\dots]$ を各多項式が有限個の変数にしか依存しない可算無限変数の多項式環とします。

$$
(x_1)\subsetneq(x_1,x_2)\subsetneq(x_1,x_2,x_3)\subsetneq\cdots
$$

は厳密な昇鎖です。なぜ真の包含なのでしょうか。$x_{n+1}$ が $(x_1,\dots,x_n)$ に属すると仮定し、等式の両辺に $x_1=\cdots=x_n=0$ を代入すると、右辺は零、左辺は $x_{n+1}$ のままです。これは多項式の等式ではありえません。従ってこの環はNoetherではありません。有限変数と無限変数を区別する必要が、ここで実際に現れます。

## 2. 最高次係数からHilbertの基底定理を証明する

体 $k$ の一変数多項式環が扱いやすいことは、[$k[t]$ における割り算](../../RNG/RNG4/index.md#thm-rng4-division-algorithm)からも分かります。しかし $R$ が一般の環だと最高次係数で割れません。たとえば $\mathbb Z[t]$ の $2t+1$ を $3t+1$ で割ろうとしても、$2/3$ は係数に使えません。

そこで、先頭係数を割る代わりに、**同じ次数に現れる先頭係数をまとめたイデアル**を作ります。係数環がNoetherなら、このイデアルの増大はいずれ止まります。

<a id="def-ag1-05-leading-ideals"></a>

<!-- formal-statement-start -->
> **定義（次数別最高次係数イデアル）**  
> $R$ を単位的可換環、$J\subseteq R[t]$ をイデアルとする。各整数 $d\ge0$ に対し、$J_d\subseteq R$ を、$J$ に属する次数 $d$ 以下の多項式の $t^d$ の係数全体とする。零多項式の係数も $0$ として含める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-05-leading-ideals -->
**定義の確認**：係数環 $R=k$、イデアル $J=(t^2)\subset k[t]$ とします。$J$ の元はすべて $t^2$ の倍数なので、次数0以下と1以下の元は零だけです。従って $J_0=J_1=(0)$。$d\ge2$ では任意の $a\in k$ に対して $at^d\in J$ があり、その $t^d$ 係数は $a$ です。ゆえに $J_d=k$ です。各次数の係数の全体を定義どおりに求めました。
<!-- definition-example-end -->

これは本当にイデアルです。$f,g\in J$ がともに次数 $d$ 以下なら $f+g\in J$ も次数 $d$ 以下で、その $t^d$ 係数は係数の和です。$r\in R$ について $rf\in J$ で係数は $r$ 倍されます。さらに、$f\in J$ に $t$ を掛ければ $tf\in J$ で次数は高々 $d+1$、$t^{d+1}$ の係数は元の $t^d$ の係数なので

$$
J_0\subseteq J_1\subseteq J_2\subseteq\cdots
$$

となります。

具体例として $R=k[x]$、$J=(xt,t^2)\subseteq R[t]$ を調べましょう。任意の $f\in J$ は $f=xt\,a(x,t)+t^2b(x,t)$ と書けるので、$t$ で割り切れます。従って次数零の元は零だけです。

次数一の係数は、$a(x,t)=a_0(x)+t a_1(x,t)$ と分ければ

$$
f=x a_0(x)t+t^2\bigl(xa_1(x,t)+b(x,t)\bigr)
$$

から $xa_0(x)$ と分かります。これは常に $(x)$ に入り、逆に $xt\in J$ の $R$ 倍ですべての $(x)$ の元を実現できます。また $t^2\in J$ の $t^2$ 係数は $1$ なので、従って

$$
J_0=(0),\qquad J_1=(x),\qquad J_2=R,\qquad J_d=R\ (d\ge2).
$$

ここでは最高次係数のイデアル列が実際に安定します。

<a id="thm-ag1-05-hilbert-basis"></a>

<!-- formal-statement-start -->
> **定理（Hilbertの基底定理）**  
> $R$ が単位的可換Noether環なら、一変数多項式環 $R[t]$ もNoether環である。
<!-- formal-statement-end -->

### 証明の見取り図

任意のイデアル $J\subseteq R[t]$ を取ります。各次数の最高次係数イデアル $J_d$ は $R$ の昇鎖なので、ある次数 $N$ で安定します。$d\le N$ の各 $J_d$ を有限個の係数で生成し、その係数を実現する多項式を $J$ から選びます。$J$ の任意の多項式の最高次項を、選んだ多項式の適当な $t$ 倍で消すと、次数が真に下がります。この操作を有限回繰り返して $J$ 全体を有限個の多項式で生成します。

<!-- proof-start -->
### 証明

$J$ を $R[t]$ の任意のイデアルとし、[次数別最高次係数イデアル](#def-ag1-05-leading-ideals) $J_d$ を考えます。$R$ の昇鎖条件より、ある $N\ge0$ が存在して

$$
J_N=J_{N+1}=J_{N+2}=\cdots
$$

です。さらに[有限生成との同値性](#prop-ag1-05-acc-finite-generation)により、各 $0\le d\le N$ について $J_d$ の生成元を有限個選べます。これを

$$
J_d=(a_{d1},\dots,a_{d r_d})
$$

と書きます。$J_d=0$ の場合には生成元を空に取ります。

$J_d$ の定義から、各 $a_{di}$ には多項式 $f_{di}(t)\in J$ が対応し、その次数は高々 $d$、$t^d$ 係数は $a_{di}$ です。生成元が $0$ でないように選んでいるので、実際に $\deg f_{di}=d$ となります。$d=0,\dots,N$ の全候補は有限個です。これらが生成する $R[t]$ のイデアルを $K$ と置きます。$f_{di}\in J$ なので $K\subseteq J$ です。

逆包含を示します。零多項式は $K$ に属します。非零 $f\in J$ の次数 $m$ に関する帰納法を使います。最高次係数を $a\in R$ とします。

**場合1：$m\le N$。** $a\in J_m$ だから、ある $b_i\in R$ が存在して

$$
a=\sum_{i=1}^{r_m}b_i a_{mi}.
$$

従って $g=\sum_i b_i f_{mi}\in K$ は次数高々 $m$、$t^m$ 係数は $a$ です。ゆえに $f-g\in J$ は零か次数が $m$ 未満です。

**場合2：$m>N$。** $a\in J_m=J_N$ だから、ある $c_i\in R$ が存在して

$$
a=\sum_{i=1}^{r_N}c_i a_{Ni}.
$$

このとき

$$
g=t^{m-N}\sum_{i=1}^{r_N}c_i f_{Ni}\in K
$$

は次数高々 $m$ で、その $t^m$ 係数は $a$ です。やはり $f-g\in J$ は零か次数が $m$ 未満です。

いずれの場合も帰納法の仮定から $f-g\in K$ です。$g\in K$ なので $f\in K$ となります。次数は非負整数なので、これを繰り返して無限に降り続けることはありません。従って $J=K$ で、$J$ は有限生成です。[昇鎖条件と有限生成の同値性](#prop-ag1-05-acc-finite-generation)から $R[t]$ はNoether環です。
<!-- proof-end -->

証明では係数環が体であることも、割り算が可能であることも使っていません。必要だったのは、最高次係数のイデアルが**有限個の係数で生成でき、やがて安定する**ことです。これが除法の代わりになる仕組みです。

## 3. 多変数、商環、局所化へ性質を運ぶ

一変数の定理を繰り返せば有限変数になります。環 $R[x_1,\ldots,x_n]$ は $R[x_1,\ldots,x_{n-1}][x_n]$ と見られるためです。

<a id="cor-ag1-05-multivariate-noether"></a>

<!-- formal-statement-start -->
> **系（有限変数多項式環のNoether性）**  
> $R$ が単位的可換Noether環、$n$ が非負整数なら、$R[x_1,\ldots,x_n]$ はNoether環である。特に任意の体 $k$ に対して $k[x_1,\ldots,x_n]$ はNoether環である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n=0$ では多項式環は $R$ そのものです。$n$ 個の場合を仮定し、$A=R[x_1,\ldots,x_n]$ と置くと $A$ はNoetherです。[Hilbertの基底定理](#thm-ag1-05-hilbert-basis)を係数環 $A$、新しい変数 $x_{n+1}$ に適用すると $A[x_{n+1}]$ がNoetherになります。これで $n$ に関する帰納法が閉じます。体 $k$ のNoether性は第1節で証明したので、$R=k$ とすれば後半が従います。
<!-- proof-end -->

代数的集合の[座標環](../AG1-03/index.md#def-ag1-03-coordinate-ring)は多項式環の商環でした。また前章では[点の局所環](../AG1-04/index.md#def-ag1-04-point-local-ring)を局所化として構成しました。Noether性がこれらに残ることを、元のイデアルから証明します。

**商環と座標環の区別。** $X=V_k(xy)$ に対して、任意の体 $k$ で $k[x,y]/(xy)$ という商環は作れますが、座標環の定義は $A_k(X)=k[x,y]/I_k(X)$ です。$k$ が無限体なら両者は一致します。実際 $f\in I_k(X)$ なら全 $a,b\in k$ に対して $f(a,0)=f(0,b)=0$ です。[無限体上のアフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)で用いた根の個数の議論により、$f(x,0)=0$ と $f(0,y)=0$ は**多項式としての等号**です。前者は $f$ の各単項式に $y$ が現れること、後者は各単項式に $x$ が現れることを意味し、$xy\mid f$ が従います。逆向き $(xy)\subseteq I_k(X)$ は明白なので $I_k(X)=(xy)$ です。

一方 $k$ が有限体なら、$h(x)=\prod_{a\in k}(x-a)$ は $k$ の全元を根に持つモニックな非零多項式です。従って $k^2$ の全点で零となり $h(x)\in I_k(X)$ ですが、$h(x)\notin(xy)$ です。実際、$(xy)$ の元なら $y=0$ を代入すると零多項式になるのに、$h(x)$ は $y$ に依存しない非零多項式だからです。従って有限体の場合は $k[x,y]/(xy)$ を **$xy$ による商環** として扱い、点集合 $X$ の座標環と混同しません。

<a id="prop-ag1-05-quotient-localization"></a>

<!-- formal-statement-start -->
> **命題（商環と局所化でのNoether性の保存）**  
> $R$ を単位的可換Noether環とする。
> 1. 任意のイデアル $I\subseteq R$ に対し、商環 $R/I$ のすべてのイデアルは有限生成である。$I\ne R$ なら $R/I$ は本章の定義でNoether環である。$I=R$ なら零環である。
> 2. $1\in S\subseteq R$ を乗法的集合とする。局所化 $S^{-1}R$ が零環の場合も含め、$S^{-1}R$ のすべてのイデアルは有限生成である。従って零環をNoether環に含める慣習では $S^{-1}R$ もNoether環である。$0\notin S$ かつ局所化が非零なら、本章の単位的Noether環の定義でもNoetherである。
<!-- formal-statement-end -->

### 証明の見取り図

商環ではイデアルを商写像で引き戻すと $R$ のイデアルになります。局所化では逆に、局所化先のイデアルを標準写像で引き戻し、そこで得た有限個の生成元を分母 $1$ の元として再び局所化先へ送ります。分母は可逆なので新しい生成元を必要としません。

<!-- proof-start -->
### 証明

**(1)** 商写像 $\pi:R\to R/I$ と、商環の任意のイデアル $J$ を取ります。$K=\pi^{-1}(J)$ は $R$ のイデアルなので、ある $a_1,\dots,a_s\in R$ で $K=(a_1,\dots,a_s)$ と書けます。任意の $\bar a\in J$ に対し、$\pi(a)=\bar a$ なる $a$ を選ぶと $a\in K$ です。そこで $a=\sum r_i a_i$ と表し、$\pi$ を適用すると

$$
\bar a=\sum_{i=1}^{s}\pi(r_i)\pi(a_i).
$$

各 $\pi(a_i)\in J$ だから $J=(\pi(a_1),\dots,\pi(a_s))$ です。従って商環のすべてのイデアルが有限生成です。$I\ne R$ の場合には $R/I$ で $1\ne0$ なのでNoether環です。$I=R$ の場合は零環に退化しますが、有限生成性は依然として成立します。

**(2)** 標準写像 $\lambda:R\to S^{-1}R$、$a\mapsto a/1$ と局所化先の任意のイデアル $J$ を取ります。$K=\lambda^{-1}(J)$ は $R$ のイデアルなので $K=(a_1,\dots,a_s)$ と書けます。$a/s\in J$ なら $s/1$ は局所化先の単元であり、

$$
a/1=(s/1)(a/s)\in J
$$

となるため $a\in K$ です。よって $a=\sum_i r_i a_i$ と表せて、

$$
a/s=\sum_{i=1}^{s}(r_i/s)(a_i/1)
$$

です。逆に各 $a_i/1\in J$ なので、この有限個が $J$ を生成します。$S^{-1}R=0$ の場合でもイデアルは零のみで同じ議論が成立します。
<!-- proof-end -->

**直接例。** $A=k[x,y]/(xy)$ は零因子を持ちます。[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)を $k[x,y]$ に、その後[商環と局所化でのNoether性の保存](#prop-ag1-05-quotient-localization)を $A$ と $A_x$ に適用すると、どちらもNoetherです。

この局所化では $xy=0$ と $x/1$ の可逆性から

$$
y/1=(x/1)^{-1}(xy/1)=0
$$

です（[局所化の零判定](../AG1-04/index.md#prop-ag1-04-fractions-ring)とも一致します）。さらに $A_x\simeq k[x,x^{-1}]$ を写像の両方向から確かめます。$k[x,y]\to k[x,x^{-1}]$ を $x\mapsto x,\ y\mapsto0$ で定めると $xy$ は零になり、$x$ の像は単元です。[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)から

$$
A_x\longrightarrow k[x,x^{-1}]
$$

を得ます。逆向きの写像は Laurent 多項式 $\sum_{i=-m}^{n}a_ix^i$ を $\sum_{i=-m}^{n}a_i(x/1)^i\in A_x$ へ送るものです。双方の合成は、$x$ とその逆元、さらに $A_x$ の各分数 $a/x^r$ 上で恒等写像となり、互いに逆です。

従ってNoetherであることと、零因子がないことは別の性質です。

上の商環について、$A$ がNoetherだからといって**部分環まで必ずNoether**とは結論できません。また、局所化でNoether性が残る証明は、逆向きに元の $R$ がNoetherだと主張するものではありません。使った写像の方向を取り違えないようにしましょう。

## 4. Zariski閉集合の降鎖が止まる

[Zariski位相](../AG1-01/index.md#def-ag1-01-zariski-topology)で、閉集合は多項式の共通零点集合です。閉集合が次々小さくなる列を考えると、そこに課される方程式の集合は逆に大きくなります。

ここでは閉集合 $X$ に対し、その上で恒等的に零となる多項式の集合 $I(X)$、すなわち[消滅イデアル](../AG1-01/index.md#def-ag1-01-vanishing-ideal)を使います。$X=V(E)$ が閉集合なら

$$
X=V(I(X))
$$

が成立します。実際 $E\subseteq I(X)$ なので $V(I(X))\subseteq V(E)=X$ であり、$I(X)$ の元はすべて $X$ 上で消えるので逆向きの包含も成立します。この等式には零点定理を使っていません。

<a id="thm-ag1-05-zariski-noether"></a>

<!-- formal-statement-start -->
> **定理（アフィン代数的集合のNoether位相）**  
> $k$ を任意の体、$n\ge0$ とする。$k^n$ のZariski閉集合の任意の降鎖 $X_1\supseteq X_2\supseteq\cdots$ は停止する。従って任意のZariski閉部分集合も[Noether位相空間](../AG1-02/index.md#def-ag1-02-noetherian)である。
<!-- formal-statement-end -->

### 証明の見取り図

閉集合の包含を消滅イデアルに移すと向きが逆になります。Noether環 $k[x_1,\ldots,x_n]$ の昇鎖条件で消滅イデアルが停止すれば、各閉集合を $V(I(X))$ として復元して、元の降鎖も停止します。

<!-- proof-start -->
### 証明

$R=k[x_1,\dots,x_n]$ と置くと、[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)により $R$ はNoether環です。閉集合の降鎖 $(X_i)$ に対し

$$
I(X_1)\subseteq I(X_2)\subseteq\cdots
$$

が成り立ちます。なぜなら $X_{i+1}\subseteq X_i$ なら、$X_i$ のすべての点で零となる多項式は、$X_{i+1}$ の点でも零だからです。$R$ の昇鎖条件から $I(X_i)=I(X_N)$ が全 $i\ge N$ で成立する $N$ があります。各 $X_i$ は閉集合で $X_i=V(I(X_i))$ なので、

$$
X_i=V(I(X_i))=V(I(X_N))=X_N
\qquad(i\ge N).
$$

従って降鎖は停止します。閉部分空間の閉集合の降鎖は、元の空間でも閉集合の降鎖なので同じ性質を持ちます。
<!-- proof-end -->

この結果と前章までの[Noether空間での有限既約成分分解](../AG1-02/index.md#thm-ag1-02-noether-components)を組み合わせると、すべてのアフィン代数的集合が有限個の既約成分に分解されます。ここでは**一般のアフィン空間がNoetherである**ことを初めて証明したので、以前の条件付き結果を実際の代数的集合へ適用できるようになりました。

<a id="cor-ag1-05-finite-equations"></a>

<!-- formal-statement-start -->
> **系（多項式方程式は有限個へ縮約できる）**  
> $k$ を体、$n\ge0$、$E\subseteq k[x_1,\dots,x_n]$ を任意の集合とする。このとき $E$ の有限部分集合 $\{f_1,\dots,f_r\}$ が存在し、次が成り立つ。

$$
V_k(E)=V_k(f_1,\dots,f_r).
$$

> $E=\varnothing$ の場合は $r=0$ とし、両辺を $k^n$ と解釈する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[生成イデアル](../AG1-01/index.md#def-ag1-01-generated-ideal) $I=(E)$ を取ります。[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)から $I$ は有限生成です。ただし有限生成元が必ず $E$ の元とは限らないため、次を確認します。$I=(g_1,\dots,g_m)$ とし、各 $g_i$ を $E$ の有限個の元の線形結合で表します。すなわち

$$
g_i=\sum_{j=1}^{r_i}h_{ij}f_{ij},
\qquad h_{ij}\in k[x_1,\dots,x_n],\quad f_{ij}\in E.
$$

全 $i$ について現れた $f_{ij}$ を重複を除いて $f_1,\dots,f_r$ と並べると、$g_i\in(f_1,\dots,f_r)$ なので $I\subseteq(f_1,\dots,f_r)$ です。逆向きは $f_j\in E\subseteq I$ から成立し、従って $I=(f_1,\dots,f_r)$ です。任意の点 $p\in k^n$ で、全 $f_j(p)=0$ なら $I$ のすべての元が $p$ で零となり、特に全 $f\in E$ が零です。逆向きは $f_j\in E$ より直ちに従います。よって共通零点集合は一致します。
<!-- proof-end -->

「方程式の本数を有限にできる」ことと、「その有限組を効率よく計算できる」ことは別です。今回の定理は存在とその証明を与えますが、具体的な消去アルゴリズムや零点定理の証明はまだ与えていません。

## 5. 演習：係数列の停止を使いこなす

以下の各問では特に断らない限り $k$ を体とします。定義を確認するだけでなく、どの段階でNoether性を使うかを紙上で追ってください。

**Level A：定義と最小例**

### A1. 体の昇鎖

体 $k$ のイデアルをすべて求め、任意の昇鎖が停止する理由を示せ。$k[t]$ のイデアル列 $(t)\supsetneq(t^2)\supsetneq(t^3)\supsetneq\cdots$ がその結論と矛盾しない理由も述べよ。

- Level: A
- ID: AG1-05-A1

<!-- solution-start -->
**詳細解答**　$I\subseteq k$ が非零なら $a\in I$、$a\ne0$ を取れます。体では $a^{-1}\in k$ なので、イデアル性により $1=a^{-1}a\in I$ です。従って $I=k$ です。零イデアルと全体イデアル以外はありません。昇鎖の値は $0,k$ の二つに限られ、$k$ の後に真に大きいイデアルはありません。従って停止します。一方、$(t^n)$ は $n$ が増えるほど小さくなります。$t^n=t^{n+1}q(t)$ と書くと $1=tq(t)$ になって不可能なので真の降鎖です。[Noether環の定義](#def-ag1-05-noetherian-ring)は昇鎖についてだけの条件であり、降鎖の停止を要求しません。
<!-- solution-end -->

### A2. 無限変数の失敗

$T=k[x_1,x_2,\dots]$、$I_n=(x_1,\dots,x_n)$ とする。$I_n\subsetneq I_{n+1}$ を示し、$T$ がNoetherでないことを結論せよ。

- Level: A
- ID: AG1-05-A2

<!-- solution-start -->
**詳細解答**　生成元の集合を増やしているので $I_n\subseteq I_{n+1}$ です。もし $x_{n+1}\in I_n$ なら

$$
x_{n+1}=\sum_{i=1}^{n}h_i(x_1,x_2,\dots)x_i
$$

という等式が成り立ちます。代入写像 $x_1=\cdots=x_n=0$ を両辺に適用すると、左辺は $x_{n+1}$、右辺は $0$ となります。$k[x_{n+1},x_{n+2},\dots]$ で $x_{n+1}\ne0$ なので矛盾です。従って各包含は真で、停止しない昇鎖があるため $T$ はNoetherではありません。
<!-- solution-end -->

### A3. 最高次係数イデアルの計算

$R=k[x]$、$J=(xt,t^2)\subset R[t]$ とする。[次数別最高次係数イデアル](#def-ag1-05-leading-ideals) $J_0,J_1,J_2$ を計算し、どこで安定するか示せ。

- Level: A
- ID: AG1-05-A3

<!-- solution-start -->
**詳細解答**　$J$ の任意の元は $f=xt\,a(x,t)+t^2b(x,t)$ なので、$t$ で割り切れます。従って $J_0=(0)$ です。$a(x,t)=a_0(x)+t a_1(x,t)$ と書けば

$$
f=x a_0(x)t+t^2\bigl(xa_1(x,t)+b(x,t)\bigr)
$$

となるので、$f$ の $t$ 係数は $xa_0(x)\in(x)$ です。逆に任意の $c(x)\in k[x]$ に対して $c(x)xt\in J$ の $t$ 係数は $xc(x)$ だから $J_1=(x)$ です。$t^2\in J$ の $t^2$ 係数が $1$ なので $J_2=R$ です。単調性 $J_2\subseteq J_d\subseteq R$ ($d\ge2$) により $J_d=R$、従って $d=2$ から安定します。
<!-- solution-end -->

### A4. 商環の有限生成性

$R=k[x,y]$、$A=R/(xy)$ とする。$A$ のイデアル $L=(\bar x^2,\bar y)$ は有限生成であることを確認し、これだけでは $A$ のNoether性の証明にならない理由を述べ、正しく証明せよ。

- Level: A
- ID: AG1-05-A4

<!-- solution-start -->
**詳細解答**　$L$ の任意の元は $\bar a\bar x^2+\bar b\bar y$ と表せるので、定義どおり二つの元で生成されています。しかし特定の一つのイデアルが有限生成でも、**すべて**のイデアルが有限生成とは限りません。[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)から $R$ はNoetherです。$A=R/(xy)$ はその商環だから、[商環での保存命題](#prop-ag1-05-quotient-localization)の (1) により任意のイデアルが有限生成です。従って $A$ はNoetherです。
<!-- solution-end -->

**Level B：証明の道具を別の設定へ移す**

### B1. 多項式環のNoether性から係数環を判定する

単位的可換環 $R$ について、$R[t]$ がNoetherなら $R$ もNoetherであることを証明せよ。その結果と[Hilbertの基底定理](#thm-ag1-05-hilbert-basis)を用いて、$R$ と $R[t]$ のNoether性が同値であることを示せ。

- Level: B
- ID: AG1-05-B1

<!-- solution-start -->
**詳細解答**　評価写像 $\varepsilon_0:R[t]\to R$、$\sum_i a_it^i\mapsto a_0$ を考えます。和の定数項は定数項の和、積の定数項は定数項どうしの積なので環準同型です。定数多項式の像が任意の $r\in R$ を与えるため全射です。核は定数項が零の多項式全体であり、これは $(t)$ です。従って[環の第一同型定理](../../RNG/RNG1/index.md#thm-rng1-first-isomorphism-ring)をこの全射へ適用して $R[t]/(t)\cong R$ です。$R[t]$ がNoetherなら[商環の保存命題](#prop-ag1-05-quotient-localization)の (1) により $R$ はNoetherです。逆向きは[Hilbertの基底定理](#thm-ag1-05-hilbert-basis)です。よって同値です。
<!-- solution-end -->

### B2. 零因子があってもNoetherである

$A=k[x,y]/(xy)$、$S=\{1,\bar x,\bar x^2,\ldots\}$ とする。$A$ と $S^{-1}A$ がNoetherであることを証明し、$S^{-1}A$ では $\bar y/1=0$ を示せ。$A$ では $\bar y\ne0$ である理由も述べよ。

- Level: B
- ID: AG1-05-B2

<!-- solution-start -->
**詳細解答**　$k$ はNoetherなので、[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)により $k[x,y]$ はNoetherです。[商環と局所化での保存命題](#prop-ag1-05-quotient-localization)をまず $(xy)$ による商へ、次に乗法的集合 $S$ へ適用すると、$A$ と $S^{-1}A$ の全イデアルは有限生成です。

$S^{-1}A$ が零環でないことも確かめます。評価 $x\mapsto1,\ y\mapsto0$ は $xy$ を零にするため $A\to k$ を定め、$S$ の像はすべて $1$ です。[局所化の普遍性](../AG1-04/index.md#thm-ag1-04-universal)をこの評価写像へ適用すると $S^{-1}A\to k$ が得られ、$1$ の像が $1$ なので局所化先は零環ではありません。

$\bar x\bar y=0$ と $\bar x/1$ の可逆性より

$$
\bar y/1=(\bar x/1)^{-1}(\bar x\bar y/1)=0.
$$

一方、$A\to k$ のもう一つの評価 $x\mapsto0,y\mapsto1$ では $\bar y$ の像は $1$ なので $\bar y\ne0$ in $A$ です。局所化写像が単射でないこととNoether性とは両立します。
<!-- solution-end -->

### B3. 降鎖を方程式に変換する

$X_1\supseteq X_2\supseteq\cdots$ を $k^n$ のZariski閉集合の降鎖とする。$I(X_i)$ が昇鎖となることを示し、$I(X_i)$ の停止から $X_i$ の停止を得る際、なぜ $X_i=V(I(X_i))$ が必要かを説明せよ。

- Level: B
- ID: AG1-05-B3

<!-- solution-start -->
**詳細解答**　$X_{i+1}\subseteq X_i$ のとき $f\in I(X_i)$ は $X_i$ のすべての点で零ですから、その部分集合 $X_{i+1}$ のすべての点でも零です。従って $I(X_i)\subseteq I(X_{i+1})$ です。[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)により $k[x_1,\dots,x_n]$ はNoetherなので、ある $N$ で $I(X_i)=I(X_N)$（$i\ge N$）となります。

閉集合 $X=V(E)$ に対し $E\subseteq I(X)$ なので $V(I(X))\subseteq V(E)=X$、一方 $I(X)$ は $X$ の全点で消える多項式全体だから $X\subseteq V(I(X))$ です。従って $X=V(I(X))$ です。この復元式を各 $X_i$ に使えば $X_i=V(I(X_i))=V(I(X_N))=X_N$（$i\ge N$）となります。消滅イデアルの昇鎖停止だけから集合の等式を直接結論するのでなく、復元式を介する必要があります。
<!-- solution-end -->

### B4. 無限の方程式を有限個へ

$E=\{x^m y:m\ge1\}\cup\{y^2\}\subseteq k[x,y]$ とする。$(E)$ を有限個の $E$ の元で生成し、$V(E)$ を具体的に求めよ。$k$ は任意の体とする。

- Level: B
- ID: AG1-05-B4

<!-- solution-start -->
**詳細解答**　$m\ge1$ なら $x^m y=x^{m-1}(xy)$ なので、$E$ のすべての元は $(xy,y^2)$ に属します。逆に $xy,y^2$ は $E$ に入るため $(E)=(xy,y^2)$ です。$(a,b)\in k^2$ が零点なら $ab=0$ かつ $b^2=0$ です。体に非零冪零元はないので $b^2=0$ から $b=0$、そのとき $ab=0$ は自動的に成り立ちます。従って

$$
V(E)=\{(a,0):a\in k\}=V(y).
$$

ここでは無限個の式から $xy$ と $y^2$ の二つを選べました。なお同じ零点集合を与える一つの式 $y$ は $E$ 自身には属さないので、「有限個の $E$ の元を選ぶ」主張と「零点集合の簡単な表示」は区別します。
<!-- solution-end -->

**Level C：最高次係数・局所化・幾何を接続する**

### C1. 二軸の方程式から作る商環で三つの有限性を確かめる

$k$ を体、$R=k[x]$、$J=(xt,t^2)\subset R[t]$、$A=k[x,y]/(xy)$、$X=V_k(xy)$ とする。

1. $J_0,J_1,J_2$ を計算し、$J$ の任意の $f$ が $xt,t^2$ の線形結合となる理由を、最高次係数を消す操作から説明せよ。
2. $A$ がNoether環であることを示せ。$A_{\mathfrak m_o}$（$o=(0,0)$）もNoetherであることを示せ。ただし $\mathfrak m_o$ は $o$ で零となる関数全体とする。
3. $X$ がNoether位相空間であることを示し、$X$ の既約成分を求めよ。閉集合の有限既約成分分解が成立する根拠も述べよ。

- Level: C
- ID: AG1-05-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$J$ の元はすべて $t$ の倍数なので $J_0=(0)$ です。$xt\in J$ より $J_1$ は $(x)$ を含み、第2節で $t$ 係数を展開した結果から $J_1=(x)$ です。$t^2\in J$ より $J_2=R$、単調性から $J_d=R$（$d\ge2$）です。

従って[Hilbertの基底定理](#thm-ag1-05-hilbert-basis)の証明では $N=2$ とでき、代表多項式には $xt$（次数1）と $t^2$（次数2）を選べます。$f\in J$ が次数 $m\ge2$、最高次係数 $a(x)$ を持てば、$a(x)t^{m-2}t^2$ を引くと次数は $m$ 未満です。次数 $1$ に達したらその $t$ 係数は $xb(x)$ なので $b(x)xt$ を引いて零にします。$J_0=0$ なので定数項は残りません。引いた項を足し戻すと $f=U(x,t)t^2+V(x,t)xt$ となり、次数降下の機構を再現できます。

**(2)**　体 $k$ はNoetherです。[有限変数多項式環のNoether性](#cor-ag1-05-multivariate-noether)を $k[x,y]$ に、次に[商環でのNoether性の保存](#prop-ag1-05-quotient-localization)を $(xy)$ に適用して $A$ はNoetherとなります。

$o$ での評価準同型 $A\to k$ の核は $\mathfrak m_o=(\bar x,\bar y)$ です。[点の局所環の構成](../AG1-04/index.md#def-ag1-04-point-local-ring)によると $A_{\mathfrak m_o}=(A\setminus\mathfrak m_o)^{-1}A$ です。[局所化でのNoether性の保存](#prop-ag1-05-quotient-localization)をここへ適用して $A_{\mathfrak m_o}$ もNoetherです。局所環が整域であるとは主張していません。

**(3)**　[アフィン代数的集合のNoether位相](#thm-ag1-05-zariski-noether)により $k^2$ はNoetherで、閉部分集合 $X$ もNoetherです。$xy=0$ は体では $x=0$ または $y=0$ と同値なので

$$
X=V_k(x)\cup V_k(y).
$$

$V_k(y)$ は $t\mapsto(t,0)$ と $(a,0)\mapsto a$ により $k^1$ と対応し、$V_k(x)$ も $t\mapsto(0,t)$ と $(0,b)\mapsto b$ で対応します。これらは多項式で与えられる互いに逆の正則写像なので、[正則写像のZariski連続性](../AG1-03/index.md#prop-ag1-03-continuity)から位相同型です。[無限体上のアフィン直線の閉集合の分類](../AG1-01/index.md#prop-ag1-01-affine-line-closed)によれば、$k$ が無限体ならどちらの直線も既約です。二本は互いに包含されないため、$X$ の既約成分はこの二本です。

有限体の場合を別に検討します。$|k|<\infty$ なら $k^2$ は有限集合で、各一点 $\{(a,b)\}$ は $V_k(x-a,y-b)$ というZariski閉集合です。[零点集合の有限和の性質](../AG1-01/index.md#prop-ag1-01-zero-set-operations)から一点集合の有限和も閉集合なので、$k^2$ のすべての部分集合は閉集合です。従って $k^2$ と部分空間 $X$ は離散空間です。二点以上を含む集合は相異なる二つの非空な真の閉部分集合の和に分解できるため、有限体では $X$ の既約成分は各一点集合です。こちらも有限個です。

両場合で有限既約分解が存在する一般的な根拠は、上で証明したNoether性と[Noether空間での既約成分分解](../AG1-02/index.md#thm-ag1-02-noether-components)です。なお有限体上の商環 $A=k[x,y]/(xy)$ と点集合の座標環 $A_k(X)$ が異なる点は第3節で確かめたとおりで、$A$ のNoether性の計算には影響しません。
<!-- solution-end -->

## 6. 次章へ：有限生成性から整拡大へ

多項式環がNoetherであると分かり、任意のイデアルは有限個の式で生成できるようになりました。しかしこの事実だけでは、代数的集合の次元を有限個の独立変数で記述する方法はまだ得られません。次章 AG1-06 では、ある多項式が別の環の元を満たす**整関係**を調べ、Noether正規化によってアフィン代数的集合を多項式環の有限拡大として捉える道へ進みます。
