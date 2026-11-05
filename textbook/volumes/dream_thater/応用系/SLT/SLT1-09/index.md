# SLT1-09 関数クラスの被覆数とpacking

<!-- definition-example-audit: strict -->

## 1. 仮説を数える代わりに、互いの違いを数える

[有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)では候補の個数を数え、[VC汎化界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)では二値予測の有限標本上のパターンを数えた。しかし、実数値の予測関数は、異なる関数でもほとんど同じ値を返す場合がある。例えば $f_t(x)=tx$（$0\le t\le1$）は無限個あるが、$t$ が近ければ全ての $x\in[0,1]$ で値が近い。

そこで「指定した誤差まで近ければ同じ候補と見なす」と決め、**必要な代表関数の個数**を数える。この代表の集合が被覆（cover）、互いに遠い候補の集合がpackingである。両者は[HDP10で学んだ有限距離空間の被覆数](../../../解析系/HDP/HDP10/index.md#def-hdp10-covering-number)を、関数の集合へ適用・拡張するものだ。ただし、関数の距離を何で測るかによって個数は変わる。

以下で $\mathcal X$ は可測な入力空間、$\mathcal F$ は $\mathcal X$ 上の可測な実数値関数の非空クラス、$P$ は入力の確率分布とする。$S=(X_1,\ldots,X_n)$ は入力標本（同じ点が繰り返されてもよい）。この章の確率的な定理では $X_i$ を $P$ から独立同分布で抽出する。記号

$$
Pf=\mathbb E_{X\sim P}f(X),\qquad P_nf=\frac1n\sum_{i=1}^nf(X_i)
$$

はそれぞれ母集団平均と標本平均を表す。損失関数を $f(x)=\ell(h(x),y)$ と置けば、これらは[母集団リスクと経験リスク](../SLT1-04/index.md#def-slt1-04-uniform-deviation)に対応する。以下では説明のため入力 $x$ にラベル $y$ を含めてもよい。

## 2. 母集団と標本では「近い」の意味が違う

二つの関数 $f,g$ の距離を、関数値の差から作る。母集団での平均的な近さを見るなら $P$ で積分し、観測点だけでの近さを見るなら $n$ 点の平均を取る。この二つは、同じ関数対でも一致するとは限らない。

<a id="def-slt1-09-function-distances"></a>

<!-- formal-statement-start -->
> **定義（関数クラスの母集団・経験Lq擬距離）**
> $q\in[1,\infty)$ とし、全ての $f\in\mathcal F$ が $P|f|^q<\infty$ を満たすとする。
> 任意の $f,g\in\mathcal F$ に対して
>
$$
d_{P,q}(f,g)=\bigl(P|f-g|^q\bigr)^{1/q},\qquad
d_{S,q}(f,g)=\left(\frac1n\sum_{i=1}^n|f(X_i)-g(X_i)|^q\right)^{1/q}.
$$
>
> また、有限値の有界関数に対して
>
$$
d_\infty(f,g)=\sup_{x\in\mathcal X}|f(x)-g(x)|
$$
>
> とする。指定された関数クラス上で、これらは**擬距離**である。すなわち非負性、対称性、三角不等式を満たすが、$f\ne g$ でも距離が $0$ となり得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-09-function-distances -->
**定義の確認**。$\mathcal X=\{a,b\}$、$P(a)=P(b)=1/2$ とし、関数を値の組 $(f(a),f(b))$ で表す。

$$
f_0=(0,0),\qquad f_1=(1,0),\qquad f_2=(1,1).
$$

$q=1$ なら $d_{P,1}(f_0,f_1)=1/2$、$d_{P,1}(f_1,f_2)=1/2$、$d_{P,1}(f_0,f_2)=1$ である。一方、重複標本 $S=(a,a)$ では

$$
d_{S,1}(f_0,f_1)=1,\quad
d_{S,1}(f_1,f_2)=0,\quad
d_{S,1}(f_0,f_2)=1.
$$

$f_1$ と $f_2$ は関数として異なるのに、どの観測点でも値が一致するため経験擬距離は $0$。非負性・対称性は絶対値から、三角不等式は各点での $|f-h|\le|f-g|+|g-h|$ を平均することで確認できる（一般の $q$ では[Minkowski不等式](../../../解析系/F0/F0-00D2D/index.md#thm-f0-00d2d-02)を用いる）。
<!-- definition-example-end -->

母集団の $L_q$ で距離 $0$ となるのは、$P$-ほとんど確実に一致する関数対である。経験距離 $0$ は、**今回の標本点で一致するだけ**でよい。$d_\infty$ は入力空間の全点での最悪差を測る。$L_1$・$L_2$・一様距離は互換ではない。

## 3. 被覆、packing、計量エントロピー

$\varepsilon>0$ を許容誤差とする。関数を一つずつ保存する代わりに、全ての関数から距離 $\varepsilon$ 以下の代表を持つようにしたい。代表の中心を元の $\mathcal F$ から選ぶ規約をここでは一貫して採る。

<a id="def-slt1-09-covering"></a>

<!-- formal-statement-start -->
> **定義（関数クラスのepsilon-netと被覆数）**
> 擬距離 $d$ の入った非空クラス $\mathcal F$ と $\varepsilon>0$ に対し、有限集合 $G\subseteq\mathcal F$ が **$\varepsilon$-net** であるとは
>
$$
\forall f\in\mathcal F\ \exists g\in G:\ d(f,g)\le\varepsilon
$$
>
> を満たすことをいう。**被覆数** $N(\varepsilon,\mathcal F,d)$ はそのような $G$ の最小要素数とし、有限netが存在しない場合は $\infty$ とする。母集団・経験距離の場合は $N(\varepsilon,\mathcal F,d_{P,q})$ と $N(\varepsilon,\mathcal F,d_{S,q})$ と書き分ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-09-covering -->
**定義の確認**。前節の三関数で $\varepsilon=0.4$ とすると、$d_{P,1}$ では異なるどの二関数の距離も $0.5$ 以上なので、代表を二つだけ選ぶと残りがどちらからも $0.4$ より遠い。従って $N(0.4,\mathcal F,d_{P,1})=3$。

$d_{S,1}$ では $G=\{f_0,f_1\}$ を取ると、$f_0,f_1$ は自身で被覆され、$f_2$ は $d_{S,1}(f_2,f_1)=0$ により被覆される。一つの代表では $f_0$ と $f_1$ の距離 $1$ を覆えないから $N(0.4,\mathcal F,d_{S,1})=2$。半径を $0.5$ に増やすと $d_{P,1}$ では $f_1$ 一つで三関数を覆うため、今度は $N(0.5,\mathcal F,d_{P,1})=1$ となる。境界の等号を含める規約がここで効いている。
<!-- definition-example-end -->

逆向きに、互いの距離が指定値を**超える**関数をいくつ選べるかも知りたい。数が多ければ、それだけ区別しなければならない候補が多い。

<a id="def-slt1-09-packing"></a>

<!-- formal-statement-start -->
> **定義（packing数）**
> $\varepsilon>0$ と擬距離空間 $(\mathcal F,d)$ に対し、集合 $A\subseteq\mathcal F$ が **$\varepsilon$-packing** であるとは、異なる $f,g\in A$ の全組について $d(f,g)>\varepsilon$ となることをいう。packing数 $M(\varepsilon,\mathcal F,d)$ を、そのような集合の要素数の上限（有限なら最大値）とし、無界なら $\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-09-packing -->
**定義の確認**。三関数を $d_{P,1}$ で比べると、半径 $0.4$ では全ての異なる距離が $0.4$ を超えるので三関数全体がpackingであり $M(0.4)=3$。半径 $0.5$ では $f_0,f_2$ の距離は $1>0.5$ で二つ選べるが、三つは選べない（隣り合う距離がちょうど $0.5$）。従って $M(0.5)=2$。$d_{S,1}$ の半径 $0.4$ では $f_1,f_2$ 間の距離は $0$ なので両方を同時に選べず、$M(0.4)=2$。
<!-- definition-example-end -->

<a id="def-slt1-09-metric-entropy"></a>

<!-- formal-statement-start -->
> **定義（計量エントロピー）**
> 被覆数が有限なら $H(\varepsilon,\mathcal F,d)=\log N(\varepsilon,\mathcal F,d)$ を**計量エントロピー**という。$\log$ は自然対数とし、$N=\infty$ なら $H=\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-09-metric-entropy -->
**定義の確認**。三関数の母集団 $L_1$ では $H(0.4)=\log3$、経験 $L_1$ では $H(0.4)=\log2$。どちらも個数を対数へ変えただけであり、**どの距離・どの半径の個数か**は消えない。$\varepsilon$ を大きくすれば被覆数とエントロピーは増えない。
<!-- definition-example-end -->

## 4. coveringとpackingは互いを挟む

被覆の代表は近い点を拾い、packingは遠い点だけを選ぶ。一見別の最適化に見えるが、最大限に遠い点を選び終えると、その集合は自動的に全体を被覆する。

<a id="lem-slt1-09-cover-packing"></a>

<!-- formal-statement-start -->
> **補題（被覆数とpacking数の比較）**
> 任意の非空擬距離空間 $(\mathcal F,d)$ と $\varepsilon>0$ に対し、拡張自然数の意味で
>
$$
N(\varepsilon,\mathcal F,d)
\le M(\varepsilon,\mathcal F,d)
\le N(\varepsilon/2,\mathcal F,d).
$$
<!-- formal-statement-end -->

### 証明の見取り図

右側は「半径 $\varepsilon/2$ の同じ球に、距離が $\varepsilon$ を超える二点は入れない」から従う。左側は「これ以上遠い点を追加できないpackingなら、どの点も既存のpacking点から $\varepsilon$ 以内にある」と考える。

<!-- proof-start -->
### 証明

まず $N(\varepsilon/2,\mathcal F,d)=K<\infty$ とする。半径 $\varepsilon/2$ のnet $G=\{g_1,\ldots,g_K\}$ を固定する。任意の $\varepsilon$-packing $A$ の二点 $f\ne h$ が同じ $g_j$ から $\varepsilon/2$ 以内なら、三角不等式で

$$
d(f,h)\le d(f,g_j)+d(g_j,h)\le\varepsilon
$$

となり、packingの厳密な不等号 $d(f,h)>\varepsilon$ に反する。そこで各 $f\in A$ に、それを覆う一つの $g_j$ を割り当てると、異なる $f$ には異なる $j$ が必要である。よって $|A|\le K$、従って $M(\varepsilon)\le N(\varepsilon/2)$。

この上界によって $\varepsilon$-packing の大きさは有限整数 $K$ 以下となる。非空なpackingの要素数の集合には最大値があり、その最大値を実現する $A_\star$ を取れる。もし $f\in\mathcal F$ が全ての $a\in A_\star$ から $d(f,a)>\varepsilon$ なら、$A_\star\cup\{f\}$ はより大きなpackingとなって最大性に反する。従って全ての $f$ は少なくとも一つの $a$ から $\varepsilon$ 以内にあり、$A_\star$ は $\varepsilon$-netである。ゆえに $N(\varepsilon)\le|A_\star|=M(\varepsilon)$。

最後に $N(\varepsilon/2)=\infty$ の場合、右側の不等式は自明である。$M(\varepsilon)<\infty$ なら、任意の有限packingを最大要素数にまで延長した集合 $A_\star$ が存在し、同じ追加不能性の議論で $A_\star$ は $\varepsilon$-netになる。従ってこの場合も $N(\varepsilon)\le M(\varepsilon)$。$M(\varepsilon)=\infty$ の場合も左側は自明である。
<!-- proof-end -->

「距離 $\varepsilon$ **以上**」をpackingの条件に採る流儀では、等号の境界に注意して比較式を調整する必要がある。この章は $>\varepsilon$ と $\le\varepsilon$ を使い続ける。

## 5. 無限関数族も、距離次第では有限化できる

**一次元の連続パラメータ**。$\mathcal X=[0,1]$、$\mathcal F_{\rm lin}=\{f_t(x)=tx:0\le t\le1\}$ とする。差は $|(t-u)x|$ なので $x=1$ で最大値を取り、$d_\infty(f_t,f_u)=|t-u|$。従って関数の被覆は区間 $[0,1]$ を実数の距離で覆う問題になる。

<a id="prop-slt1-09-linear-cover"></a>

<!-- formal-statement-start -->
> **命題（一次元関数族の被覆数）**
> $\mathcal F_{\rm lin}=\{x\mapsto tx:t\in[0,1]\}$ と $0<\varepsilon<1$ に対して
>
$$
\left\lceil\frac1{2\varepsilon}\right\rceil
\le N(\varepsilon,\mathcal F_{\rm lin},d_\infty)
\le\left\lceil\frac1\varepsilon\right\rceil+1.
$$
>
> 特に計量エントロピーは $\varepsilon\downarrow0$ で $\log(1/\varepsilon)$ と同じ次数で増加する。
<!-- formal-statement-end -->

### 証明の見取り図

格子を用いれば有限netを構成できる。逆に、一つの代表が覆えるパラメータ区間の長さは高々 $2\varepsilon$ である。

<!-- proof-start -->
### 証明

$m=\lceil1/\varepsilon\rceil$、$t_j=j/m$（$j=0,\ldots,m$）とする。任意の $t\in[0,1]$ は、左隣の格子点 $t_j$ を選べば $0\le t-t_j<1/m\le\varepsilon$（$t=1$ のときは $t_m=1$）。したがって $m+1$ 個の関数が $\varepsilon$-netである。

一方、任意の代表 $f_u$ の半径 $\varepsilon$ の球が覆うパラメータは $[u-\varepsilon,u+\varepsilon]\cap[0,1]$ で、その区間長は $2\varepsilon$ 以下である。$N$ 個で長さ $1$ の区間全体を覆うには区間長の和が少なくとも $1$、すなわち $2N\varepsilon\ge1$ が必要。従って下界を得る。上下界に自然対数を取れば、両辺はともに $\log(1/\varepsilon)+O(1)$ である。
<!-- proof-end -->

**閾値クラスでは距離が決定的**。今度は $\mathcal F_{\rm th}=\{f_t(x)=\boldsymbol1_{\{x\ge t\}}:t\in[0,1]\}$ とし、$P$ は $[0,1]$ 上で密度が常に1の確率分布とする。$t<u$ なら二関数が異なるのは区間 $[t,u)$ だけなので

$$
d_{P,1}(f_t,f_u)=u-t,\qquad
d_{P,2}(f_t,f_u)=\sqrt{u-t},\qquad
d_\infty(f_t,f_u)=1.
$$

最初の二つは、それぞれパラメータ間隔 $\varepsilon$、$\varepsilon^2$ 程度の格子で有限netを作れる。しかし一様距離で半径が1より小さいとき、互いに異なる閾値は一つの球へ入らず、被覆数は無限大である。

一方、固定標本 $S$ 上では閾値の予測列は標本の昇順に高々 $n+1$ 通りしかない。このため任意の正の半径と $q\ge1$ について

$$
N(\varepsilon,\mathcal F_{\rm th},d_{S,q})\le n+1.
$$

これは[VC次元と成長関数](../SLT1-05/index.md#def-slt1-05-growth)で数えた標本上の二値列と同じ構造だが、ここでは距離と半径を明示している。

## 6. 固定した被覆なら一様偏差に使える

関数族 $\mathcal F\subseteq[0,1]^{\mathcal X}$ の全関数値を、標本を**見る前に**選んだ有限代表で近似できるとする。各代表に [Hoeffding不等式](../../../解析系/HDP/HDP1/index.md#thm-hdp1-hoeffding)を適用し、有限個の事象を足し合わせればよい。代表と元の関数の母集団平均・標本平均は、それぞれ $\varepsilon$ 以内である。

<a id="thm-slt1-09-deterministic-cover"></a>

<!-- formal-statement-start -->
> **定理（決定論的L∞被覆からの一様偏差界）**
> $\mathcal F$ を $[0,1]$ 値の非空・有限または可算な可測関数クラス、$X_1,\ldots,X_n$ を分布 $P$ からの独立同分布標本とする。$0<\delta<1$、$\varepsilon>0$ とし、$d_\infty$ に関する決定論的な有限 $\varepsilon$-net $G\subseteq\mathcal F$ が $|G|=N$ 個あるなら、確率 $1-\delta$ 以上で
>
$$
\sup_{f\in\mathcal F}|P_nf-Pf|
\le2\varepsilon+\sqrt{\frac{\log(2N/\delta)}{2n}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定された有限個の代表だけへ集中不等式と[可算劣加法性（union bound）](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)を使う。その上で任意の $f$ を近い $g$ で挟み、三角不等式を二度使う。

<!-- proof-start -->
### 証明

標本と独立に $G$ を固定しておく。各 $g\in G$ は $0\le g(X_i)\le1$ を満たす独立同分布な確率変数だから、[Hoeffding不等式](../../../解析系/HDP/HDP1/index.md#thm-hdp1-hoeffding)より任意の $t>0$ で

$$
\Pr\{|P_ng-Pg|>t\}\le2e^{-2nt^2}.
$$

有限和の上界から

$$
\Pr\left\{\max_{g\in G}|P_ng-Pg|>t\right\}
\le2Ne^{-2nt^2}.
$$

$t=\sqrt{\log(2N/\delta)/(2n)}$ を代入すると失敗確率は $\delta$ 以下である。この事象の外で任意の $f\in\mathcal F$ に対し $d_\infty(f,g)\le\varepsilon$ の $g\in G$ を選ぶと、

$$
\begin{aligned}
|P_nf-Pf|
&\le |P_n(f-g)|+|P_ng-Pg|+|P(g-f)|\\
&\le\varepsilon+t+\varepsilon.
\end{aligned}
$$

この評価は全 $f$ に共通だから上限を取れる。可算性により上限の可測性も確保される。
<!-- proof-end -->

本定理は強い $L_\infty$ 被覆を仮定するため、前節の閾値族全体のように $N(\varepsilon,d_\infty)=\infty$ の場合には非自明な結論を出せない。より柔軟な距離での有限化には、次のように**ランダム符号だけを動かし、標本自体を条件として固定する**方法が役に立つ。

## 7. 経験被覆は独立な符号の条件付き評価に使う

$S=(X_1,\ldots,X_n)$ を固定し、$\sigma_i$ を互いに独立で $+1$ と $-1$ を確率 $1/2$ ずつ取る符号とする。この符号は標本とは独立に後から発生させる。各 $f$ について符号付き平均 $Z_f=n^{-1}\sum_i\sigma_i f(X_i)$ を考え、$\sup_f|Z_f|$ の符号についての条件付き期待値を評価する。この量が次章で使うRademacher複雑度に近い。

<a id="thm-slt1-09-empirical-cover"></a>

<!-- formal-statement-start -->
> **定理（経験被覆からの条件付きRademacher評価）**
> 標本 $S=(X_1,\ldots,X_n)$ を任意に固定する。
> $\mathcal F$ は $[0,1]$ 値の非空・有限または可算な関数クラスとする。
> 経験距離 $d_{S,1}$ で、半径 $\varepsilon>0$ の有限net $G_S\subseteq\mathcal F$ があるとする。その要素数を $N\ge1$ とする。
> 独立な公平符号 $\sigma_1,\ldots,\sigma_n$ は標本から独立とする。このとき
>
$$
\mathbb E_\sigma\!\left[\sup_{f\in\mathcal F}
\left|\frac1n\sum_{i=1}^n\sigma_i f(X_i)\right|\ \middle|\ S\right]
\le\varepsilon+\sqrt{\frac{2\log(2N)}n}.
$$
>
> 代表集合 $G_S$ は標本に依存してよいが、符号 $\sigma$ には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

標本を固定した後は被覆の代表も固定される。近い関数同士の符号付き和の差は経験 $L_1$ 距離以下である。有限代表の最大値は指数モーメントで制御する。

<!-- proof-start -->
### 証明

任意の $f$ を $d_{S,1}(f,g)\le\varepsilon$ の $g\in G_S$ に対応させる。どの符号実現についても

$$
\left|Z_f-Z_g\right|
\le\frac1n\sum_i|\sigma_i||f(X_i)-g(X_i)|
=d_{S,1}(f,g)\le\varepsilon.
$$

よって $\sup_f|Z_f|\le\varepsilon+\max_{g\in G_S}|Z_g|$。$S$ は固定され、$0\le g(X_i)\le1$ なので、独立な符号に関する $\cosh u\le e^{u^2/2}$ を使って

$$
\begin{aligned}
\mathbb E_\sigma e^{\lambda Z_g}
&=\prod_{i=1}^n\cosh\!\left(\frac{\lambda g(X_i)}n\right)\\
&\le\exp\!\left(\frac{\lambda^2}{2n^2}
\sum_{i=1}^ng(X_i)^2\right)
\le e^{\lambda^2/(2n)}.
\end{aligned}
$$

同じ上界は $-Z_g$ にも成立する。$\lambda>0$ なら、$\exp(\lambda\max_g|Z_g|)$ は $g$ と符号 $\pm$ にわたる $2N$ 個の指数の和以下である。指数関数の凸性から $e^{\lambda\mathbb E_\sigma M}\le\mathbb E_\sigma e^{\lambda M}$（$M=\max_g|Z_g|$）であり、前式と合わせると

$$
\lambda\,\mathbb E_\sigma\max_g|Z_g|
\le\log\bigl(2N e^{\lambda^2/(2n)}\bigr)
=\log(2N)+\frac{\lambda^2}{2n}.
$$

両辺を $\lambda$ で割り、$\lambda=\sqrt{2n\log(2N)}$ を代入すれば $\mathbb E_\sigma\max_g|Z_g|\le\sqrt{2\log(2N)/n}$ を得る。先ほどの $\varepsilon$ を加えると結論である。
<!-- proof-end -->

この証明で網を作った後にランダムなのは $\sigma$ だけだから、標本依存の $G_S$ に対しても有限和を使える。対して、前節の母集団偏差では、標本依存の $G_S$ を**標本を見る前から固定された候補**と見なすことはできない。

**誤用を見破る反例**。$P$ を $[0,1]$ 上で密度1の分布とし、有限集合 $T\subset[0,1]$ の指示関数 $f_T=\boldsymbol1_T$ 全体を考える。

固定されたどの有限 $T$ も $Pf_T=0$、さらに確率1で $P_nf_T=0$ である。しかし標本を見て $T_S=\{X_1,\ldots,X_n\}$ を選ぶと

$$
P_nf_{T_S}=1,\qquad Pf_{T_S}=0
$$

となる。**各固定関数の偏差が確率1で0でも、標本依存に選んだ関数の偏差は1になる。**

このクラスは非可算であり、上の可算クラスの定理の仮定を満たすわけでもない。失敗機構は、標本依存の選択を固定候補の評価へすり替えたことにある。

## 8. 何を保証し、何を保証しないか

- 母集団 $L_q$ と経験 $L_q$ は別の擬距離である。経験標本で未観測の違いが隠れる。
- $N(\varepsilon)$ は**半径 $\varepsilon$ 以下**の近似個数、$M(\varepsilon)$ は**互いに距離 $\varepsilon$ 超**の分離個数である。[比較補題](#lem-slt1-09-cover-packing)では半径が半分になる。
- 決定論的 $L_\infty$ 被覆は[一様偏差界](#thm-slt1-09-deterministic-cover)へ直接使えるが、強い条件である。
- 経験 $L_1$ 被覆は、標本を固定した[条件付きRademacher評価](#thm-slt1-09-empirical-cover)へ使える。母集団の汎化界へ進むにはsymmetrizationなど次章の追加の議論が必要である。
- 無限クラスでは上限の可測性、netを選ぶ規則、距離0の関数の同一視に気を付ける。上限が可測であると確かめずに有限クラスの確率式を無限へ移さない。

## 演習

**問題 SLT1-09-A01（三関数の被覆数）**
- Level: A

$\mathcal X=\{a,b\}$ 上で $f_0=(0,0)$、$f_1=(1,0)$、$f_2=(1,1)$、$P(a)=P(b)=1/2$ とする。$d_{P,1}$ の下で $N(0.4)$、$N(0.5)$、$M(0.5)$ を計算せよ。中心は $\mathcal F=\{f_0,f_1,f_2\}$ 内から選ぶ。

<!-- solution-start -->
**詳細解答**。距離表は $d(f_0,f_1)=d(f_1,f_2)=1/2$、$d(f_0,f_2)=1$。半径 $0.4$ では異なる点を一つも覆えず、代表が三つ必要だから $N(0.4)=3$。半径 $0.5$ では $f_1$ から両端まで距離 $0.5$ なので $N(0.5)=1$。packingでは距離が $0.5$ **より大**でなければならず、$\{f_0,f_2\}$ は使えるが三つ同時には使えない。従って $M(0.5)=2$。
<!-- solution-end -->

**問題 SLT1-09-A02（経験距離は真の距離と異なる）**
- Level: A

前問の $\mathcal F$ で $S=(a,a)$ とする。$d_{S,1}(f_i,f_j)$ の全組と $N(0.4,\mathcal F,d_{S,1})$ を求め、母集団の結果と比べよ。

<!-- solution-start -->
**詳細解答**。標本上の二つの値はともに $a$ での値なので、$d_{S,1}(f_0,f_1)=(1+1)/2=1$、$d_{S,1}(f_1,f_2)=(0+0)/2=0$、$d_{S,1}(f_0,f_2)=1$。$f_1$ が $f_2$ を半径0で覆うから $\{f_0,f_1\}$ は $0.4$-net。一方、$f_0$ と $f_1$ は距離1なので一つの中心からは両方を半径 $0.4$ で覆えない。よって $N(0.4,d_{S,1})=2$ であり、母集団の3より小さい。未観測点 $b$ の違いが経験距離から消えたためである。
<!-- solution-end -->

**問題 SLT1-09-A03（半径とpackingの境界）**
- Level: A

擬距離空間の三点 $u,v,w$ で $d(u,v)=d(v,w)=1$、$d(u,w)=2$ とする。$N(1)$ と $M(1)$ を求めよ。packingの条件を $d\ge1$ と誤った場合、何が変わるか。

<!-- solution-start -->
**詳細解答**。中心 $v$ は $u,v,w$ をすべて距離1以下で覆うので $N(1)=1$。一方 $d(u,w)=2>1$ だから二点packingがあり、三点では $d(u,v)=1$ が厳密不等号を満たさないので $M(1)=2$。条件を $d\ge1$ に取り違えると三点全体をpackingと数えて3となる。本章の比較補題では境界を $>\varepsilon$ とした。
<!-- solution-end -->

**問題 SLT1-09-A04（閾値の距離）**
- Level: A

$P$ は $[0,1]$ 上で密度1の分布、$f_t=\boldsymbol1_{\{x\ge t\}}$ とする。$0\le s<t\le1$ に対し $d_{P,1}$、$d_{P,2}$、$d_\infty$ を計算せよ。$d_{P,2}\le0.1$ にするパラメータ差の条件を述べよ。

<!-- solution-start -->
**詳細解答**。$[s,t)$ でのみ関数値の差は1、それ以外では0。従って積分は $\int_s^t1\,dx=t-s$ である。$q=1$ では $d_{P,1}=t-s$、$q=2$ では二乗して積分し平方根を取るので $d_{P,2}=\sqrt{t-s}$。$s<t$ なら区間内の差の上限は1だから $d_\infty=1$。$d_{P,2}\le0.1$ は $\sqrt{t-s}\le0.1$、両辺を二乗して $t-s\le0.01$ と同値である。
<!-- solution-end -->

**問題 SLT1-09-A05（計量エントロピーと半径）**
- Level: A

$f_t(x)=tx$（$x,t\in[0,1]$）の $d_\infty$ において、半径 $\varepsilon=1/4$ の具体的なnetを挙げ、$H(1/4)\le\log5$ を示せ。また $\varepsilon$ を小さくすると被覆数が減らない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$t_j=j/4$（$j=0,1,2,3,4$）に対応する五関数を選ぶ。任意の $t\in[0,1]$ は隣接する格子点の一つから距離 $|t-t_j|\le1/4$ にある。$d_\infty(f_t,f_{t_j})=|t-t_j|$ なので五つは $1/4$-netで、$N(1/4)\le5$、従って $H(1/4)\le\log5$。$\varepsilon'<\varepsilon$ の $\varepsilon'$-net は必ず $\varepsilon$-net でもあるから $N(\varepsilon')\ge N(\varepsilon)$。半径縮小は条件を厳しくするためである。
<!-- solution-end -->

**問題 SLT1-09-B01（極大packingからnetを作る）**
- Level: B

有限擬距離空間 $\mathcal F$ と $\varepsilon>0$ を考える。$\varepsilon$-packingへ距離 $\varepsilon$ を超える点が存在する限り追加する手続きを考え、停止性と得られる被覆性を証明せよ。さらに半径 $\varepsilon/2$ のnetが $K$ 個なら、停止時点までの追加点数が $K$ 以下であることを示せ。

<!-- solution-start -->
**詳細解答**。最初に任意の一点を選ぶ。追加する点は既存の全点から距離が $\varepsilon$ より大なので、packing条件は各段階で保存される。$\mathcal F$ が有限だから異なる点を無限に追加できず、手続きは停止する。

停止時にまだ既存集合 $A$ の全点から半径 $\varepsilon$ より遠い点があれば追加できるはずで矛盾する。従って任意の点は $A$ の一点から距離 $\varepsilon$ 以下であり、$A$ はnetである。

さらに半径 $\varepsilon/2$ の中心 $g_1,\ldots,g_K$ へpackingの各点を割り当てる。二点が同じ中心に対応すれば、三角不等式から

$$
d(f,h)\le d(f,g_j)+d(g_j,h)\le\varepsilon/2+\varepsilon/2=\varepsilon
$$

となり、packing条件と矛盾する。従って割当ては単射で $|A|\le K$。
<!-- solution-end -->

**問題 SLT1-09-B02（L∞被覆による標本数設計）**
- Level: B

$\mathcal F\subseteq[0,1]^{\mathcal X}$ が固定された $\varepsilon$-netを $N$ 個持つとする。$0<\delta<1$ で $\sup_f|P_nf-Pf|\le3\varepsilon$ を確率 $1-\delta$ 以上で保証するための十分な $n$ を求めよ。またnetを訓練標本から選ぶと証明のどこが破綻するか説明せよ。

<!-- solution-start -->
**詳細解答**。[決定論的被覆の一様偏差界](#thm-slt1-09-deterministic-cover)の右辺を $3\varepsilon$ 以下にするには

$$
\sqrt{\frac{\log(2N/\delta)}{2n}}\le\varepsilon
\quad\Longleftrightarrow\quad
n\ge\frac{\log(2N/\delta)}{2\varepsilon^2}
$$

で十分である。証明では固定 $g$ に対するHoeffding界を有限集合 $G$ に足し合わせた。

しかし $g=g(S)$ なら、その選択にも訓練標本を使っている。固定関数の独立同分布和としてHoeffdingを適用する段階が正当化されない。
<!-- solution-end -->

**問題 SLT1-09-B03（条件付き符号平均の係数）**
- Level: B

$S$ を固定し、$\mathcal F$ の経験 $L_1$ 半径 $\varepsilon$ のnetが $N$ 個あるとする。$Z_f=n^{-1}\sum_i\sigma_i f(X_i)$ で $f(X_i)\in[0,1]$ とし、$\mathbb E_\sigma e^{\lambda Z_g}\le e^{\lambda^2/(2n)}$ から

$$
\mathbb E_\sigma\sup_f|Z_f|
\le\varepsilon+\sqrt{2\log(2N)/n}
$$

を、$\lambda$ の選択まで示して導け。

<!-- solution-start -->
**詳細解答**。netの各 $f$ の近似 $g$ について $|Z_f-Z_g|\le n^{-1}\sum_i|f(X_i)-g(X_i)|\le\varepsilon$ であり、$\sup_f|Z_f|\le\varepsilon+\max_g|Z_g|$。指数関数の凸性から $e^{\lambda\mathbb E M}\le\mathbb E e^{\lambda M}$（$M=\max_g|Z_g|$）を用い、$\pm Z_g$ の指数の和を上から評価すると、任意の $\lambda>0$ で

$$
\begin{aligned}
\lambda\mathbb E_\sigma\max_g|Z_g|
&\le\log\sum_{g\in G}\bigl(\mathbb E e^{\lambda Z_g}+\mathbb E e^{-\lambda Z_g}\bigr)\\
&\le\log(2N)+\lambda^2/(2n).
\end{aligned}
$$

$\lambda$ で割った上界 $\log(2N)/\lambda+\lambda/(2n)$ を微分すると $-\log(2N)/\lambda^2+1/(2n)$。零点は $\lambda=\sqrt{2n\log(2N)}$ で、代入値は $\sqrt{2\log(2N)/n}$。最後に近似誤差 $\varepsilon$ を加える。$G$ が $S$ に依存しても、条件付け後に固定されていればこの証明は有効である。
<!-- solution-end -->

**問題 SLT1-09-B04（標本依存候補の落とし穴）**
- Level: B

$X_1,\ldots,X_n$ は $[0,1]$ 上で密度が1の分布から独立同分布とする。$\mathcal F=\{\boldsymbol1_T:T\subseteq[0,1]\text{ は有限}\}$ に対し、任意に**固定した** $T$ では $P_nf_T=Pf_T=0$ が確率1で成立すること、しかし $\sup_{f\in\mathcal F}|P_nf-Pf|=1$ が標本ごとに成立することを示せ。何の仮定を取り違えたか述べよ。

<!-- solution-start -->
**詳細解答**。固定された有限 $T$ はLebesgue測度0なので $Pf_T=0$。各 $X_i\in T$ の確率も0で、有限個の和事象も0だから確率1で $P_nf_T=0$。

一方、観測後に $T_S=\{X_1,\ldots,X_n\}$ を選べば有限集合なので $f_{T_S}\in\mathcal F$ であり、各標本点が $T_S$ に入る。従って

$$
P_nf_{T_S}=\frac nn=1,\qquad Pf_{T_S}=0.
$$

各 $f$ が $[0,1]$ 値だから偏差は1を超えず、従って上限は1。このクラスは非可算である。「各固定 $f$ について確率1」と「全ての $f$ について同時に確率1」を交換してしまった。標本依存の候補への固定候補の集中評価は直接使えない。
<!-- solution-end -->

**問題 SLT1-09-C01（線形関数族の汎化界と経験被覆の差）**
- Level: C

$\mathcal F=\{f_t(x)=tx:t\in[0,1]\}$、$\mathcal X=[0,1]$ とし、$P$ を任意の入力分布、$X_1,\ldots,X_n$ を独立同分布標本とする。

1. $\varepsilon=1/m$（整数 $m\ge2$）で $m+1$ 個の決定論的 $L_\infty$ netを構成せよ。
2. $\mathcal F$ の一様偏差が確率 $1-\delta$ 以上で $2/m+\sqrt{\log(2(m+1)/\delta)/(2n)}$ 以下になることを証明せよ。
3. 同じnetが任意の標本 $S$ に関する経験 $L_1$ netでもあることを証明し、条件付き符号平均の上界を導け。
4. 2の結論を3の上界だけから直ちに導けない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。

1. $t_j=j/m$（$j=0,\ldots,m$）を選び、$G=\{f_{t_j}\}$ とする。任意の $t$ について $j=\lfloor mt\rfloor$（$t=1$ なら $j=m$）を取ると $0\le t-t_j<1/m$ または0なので $d_\infty(f_t,f_{t_j})=\sup_{x\in[0,1]}|(t-t_j)x|=|t-t_j|\le1/m$。従って $G$ は固定netである。
2. $0\le f_t(X_i)\le1$ が全ての $t$ と標本点で成り立つ。各固定 $f_{t_j}$ に[Hoeffding不等式](../../../解析系/HDP/HDP1/index.md#thm-hdp1-hoeffding)を適用すると、$t>0$ で最大偏差の失敗確率は $2(m+1)e^{-2nt^2}$ 以下。$t=\sqrt{\log(2(m+1)/\delta)/(2n)}$ で失敗確率は $\delta$ 以下になる。任意の $f_t$ と最近の $g\in G$ は全入力で $|f_t-g|\le1/m$ だから、母集団平均と経験平均の差の双方に各 $1/m$ を加え、結論を得る。
3. $d_{S,1}(f_t,f_u)=|t-u|\,n^{-1}\sum_iX_i\le|t-u|$。したがって同じ $G$ は任意の $S$ で半径 $1/m$ のnetである。[条件付き符号平均の定理](#thm-slt1-09-empirical-cover)を $N=m+1$ で適用すると

   $$
   \mathbb E_\sigma\sup_{t\in[0,1]}\left|\frac1n\sum_i\sigma_i tX_i\right|
   \le\frac1m+\sqrt{\frac{2\log(2m+2)}n}.
   $$

4. 3の確率は固定標本に条件付けた補助符号についての期待値であり、2の確率は元の独立同分布標本についてである。両者は別の確率量で、3だけでは母集団平均 $Pf$ と標本平均 $P_nf$ の差を比較していない。そこを結ぶにはghost sampleを用いるsymmetrizationなど、追加の議論が必要である。
<!-- solution-end -->

## まとめ

関数クラスの大きさは単純な要素数ではなく、**どの距離で、どの精度まで区別するか**で測れる。coveringとpackingの比較により、近似できる関数の数と互いに区別すべき関数の数が結び付く。固定 $L_\infty$ 被覆なら有限union boundが使え、経験距離での被覆は補助符号に条件付けた評価で使える。次章では、この条件付き評価を実際の汎化誤差へ接続するためのRademacher複雑度とsymmetrizationを学ぶ。
