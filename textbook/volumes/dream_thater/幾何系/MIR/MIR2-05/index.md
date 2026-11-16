# MIR2-05 種数0ポテンシャルとA側Yukawa結合

<!-- definition-example-audit: strict -->

## 1. 三点関数を、なぜ「三回微分したもの」として扱うのか

前講では、滑らかなquintic三次元多様体 $X\subset\mathbb P^4_{\mathbb C}$ のambient小量子積を、[三点相関から復元する積表](../MIR2-04/index.md#prop-mir2-04-product-table)として求めた。その係数は

$$
C^X_{HHH}(Q)=5+\sum_{d\ge1}d^3N_d^XQ^d,\qquad
H*_QH=\frac{C^X_{HHH}(Q)}5H^2
$$

だった。ここで $H=c_1(\mathcal O_X(1))$ は超平面類、$d$ は超平面次数、$Q$ は数値を代入しないNovikov形式変数、$N_d^X\in\mathbb Q$ は $d>0$ の[無標点・種数0仮想GW数](../MIR2-03/index.md#def-mir2-03-unmarked-number)である。

三点を固定した値から積は得られたが、標点へ $H$ を何個追加した場合も一つの式で管理できるだろうか。前講の[因子方向の大きい量子積](../MIR2-04/index.md#prop-mir2-04-big-divisor)では、追加の因子一つにつき曲線次数 $d$ が一回掛かり、$e^{dt}$ が現れた。今回はその現象を**一つの母関数の三階微分**として組み立て、A側の三次結合を定義する。

扱うのは $tH$ という**一次元の因子方向**だけである。$t$ は新たな形式変数で、B側の[ミラー写像](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)の周期比や鏡像座標とまだ同一視しない。非凸標的 $X$ における仮想基本類の大域的構成と忘却射の仮想公理は[既習の適用範囲](../MIR2-03/index.md#thm-mir2-03-divisor)と同様に**外部数学的入力**とする。その入力のもとで以下の形式級数の計算・微分・復元はすべて本文で証明する。

## 2. 安定な標点数から種数0ポテンシャルを作る

[仮想次元公式](../MIR2-02/index.md#prop-mir2-02-virtual-dimension)より、種数0・$n$ 標点の仮想**複素**次元は $n$ である。$H$ の実次数が2なので、$n$ 個の $H$ を挿入する一次不変量は次数条件に合う。しかし、**次数条件だけで安定性は保証されない**。

$d>0$ では非定数写像は標点が0個でも安定性を満たし得る。これはすべての次数で曲線の存在を主張するものではない。該当するモジュライが空でも仮想不変量を0として扱える。[反復因子挿入](../MIR2-03/index.md#prop-mir2-03-repeated-divisors)から、$n\ge0$ に対し

$$
I_{d,n}:=\langle\underbrace{H,\ldots,H}_{n\text{個}}\rangle^X_{0,d}
=d^nN_d^X,\qquad d>0
$$

となる（$n=0$ では $d^0=1$）。以下、$H^{[n]}$ は異なる $n$ 個の標点への $H$ 挿入の略記とし、$I_{d,n}=\langle H^{[n]}\rangle^X_{0,d}$ と書く。これは $X$ 上のカップ冪 $H^n$ とは異なる。

一方、$d=0$ の定数写像では $n\ge3$ が安定性の必要条件である。そのうち $n=3$ は[次数0の三点交叉](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)により $\int_XH^3=5$、$n>3$ の場合は、定数写像上の各評価類が $X$ から引き戻されるため $H^n=0$（$X$ の複素次元は3）で積分が零になる。$d=0,n=0,1,2$ に値を勝手に割り当ててはならない。

標点は番号付きである。$n$ 個の同じ挿入 $tH$ を一つの母関数へ入れるとき、順序の付け替えを対称化するため $n!$ で割る。以下の定義は、[quinticのNovikov係数環](../MIR2-04/index.md#def-mir2-04-novikov)に新しい形式変数 $t$ を追加した $\mathbb Q[[Q,t]]$ の中で行う。

<a id="def-mir2-05-potential"></a>

<!-- formal-statement-start -->
> **定義（因子方向の種数0ポテンシャル）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$、$Q,t$ を独立な形式変数とする。$d>0$ の無標点種数0仮想GW数を $N_d^X\in\mathbb Q$ とし、一次（子孫類なし）の不変量で定める因子方向のポテンシャルを次の形式級数とする。

$$
\mathcal F_0^X(t,Q):=
\sum_{\substack{d\ge0,\ n\ge0\\d>0\ \text{または}\ n\ge3}}
\frac{Q^dt^n}{n!}
\langle H,\ldots,H\rangle^X_{0,d}.
$$

> $d=0$ の項は安定な $n\ge3$ に限定し、$d>0$ では $n=0$ の空挿入も含める。右辺は $\mathbb Q[[Q,t]]$ の元として定義する。
<!-- formal-statement-end -->

この定義の「ポテンシャル」は、**種数0・一次不変量を標点数と曲線次数でまとめた母関数**という意味である。一般のすべてのコホモロジー方向のGWポテンシャルを定義したのではなく、$tH$ の直線への制限である。特に $Q$ を固定したまま $t$ について微分する。

<!-- definition-example-start: def-mir2-05-potential -->
**定義の確認**（次数0と次数2）。$d=0$ は $n=3$ だけが非零だから、母関数に $5t^3/3!=5t^3/6$ が入る。一方 $d=2>0$ の無標点数を $N_2^X=b\in\mathbb Q$ とすれば、[反復因子挿入](../MIR2-03/index.md#prop-mir2-03-repeated-divisors)によって $n=0,1,2,3$ の値は $b,2b,4b,8b$ であり、寄与は

$$
bQ^2\left(1+2t+\frac{4t^2}{2!}+\frac{8t^3}{3!}+\cdots\right).
$$

$n=0$ でも安定な $d=2$ と、不安定な $d=0,n=0$ は異なる。$n=3$ の係数を三回微分すると $8bQ^2$ となり、[三点関数の次数2係数](../MIR2-03/index.md#prop-mir2-03-series-coefficients)と一致する。
<!-- definition-example-end -->

## 3. 古典三次項と正次数の指数級数を分離する

さきほどの係数計算を任意の次数・標点数で行う。形式指数級数は

$$
e^{dt}:=\sum_{n\ge0}\frac{d^nt^n}{n!}\in\mathbb Q[[t]]
$$

と定める。これは解析的収束の主張ではない。固定した $Q^dt^n$ の係数は一意に決まり、二変数形式級数の各係数を扱う限り無限和の並べ替えも問題を起こさない。

<a id="prop-mir2-05-potential-expansion"></a>

<!-- formal-statement-start -->
> **命題（種数0ポテンシャルの指数表示）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$、$Q,t$ を独立な形式変数とし、$N_d^X$（$d\ge1$）を無標点種数0仮想GW数とする。[因子方向の種数0ポテンシャル](#def-mir2-05-potential) $\mathcal F_0^X(t,Q)$ は、$e^{dt}=\sum_{n\ge0}(dt)^n/n!$ と書くと $\mathbb Q[[Q,t]]$ で

$$
\boxed{\mathcal F_0^X(t,Q)=\frac56t^3+\sum_{d\ge1}N_d^XQ^de^{dt}}
$$

> と等しい。前項は次数0の古典交叉項、後項は正次数の曲線寄与である。
<!-- formal-statement-end -->

### 証明の見取り図

$d=0$ の安定な標点数を先に調べ、$5t^3/6$ だけが残ることを示す。$d>0$ では仮想版因子公理を $n$ 回使って $d^nN_d^X$ に還元し、$n!$ を分母に持つ級数を指数級数としてまとめる。

<!-- proof-start -->
### 証明

$d=0$ では $n\ge3$ のみを取る。$n=3$ は[次数0の三点相関](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)により5である。$n\ge4$ では定数写像の評価類の積が $H^n=0$ だから不変量は零。従って $d=0$ の和は $5t^3/3!=5t^3/6$。

$d\ge1$ を固定する。正次数の安定写像は標点を忘れて安定化しても正次数を持ち、無標点の場合まで因子公理を適用できる。各次数に実際の写像が存在すると仮定する必要はない。[仮想版一次因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)を $H$ へ適用するたびに $\int_dH=d$ が掛かる。まず $n=0$ では $\langle H^{[0]}\rangle^X_{0,d}=N_d^X$ である。この値を起点に、$n\ge1$ では帰納的に

$$
\langle H^{[n]}\rangle^X_{0,d}
=d\langle H^{[n-1]}\rangle^X_{0,d}
=\cdots=d^nN_d^X
$$

を得る。最初の等号は忘却後の標点数が $n-1\ge0$ でなお安定であることに依存する。

よって固定した $d$ の和は

$$
\sum_{n\ge0}\frac{Q^dt^n}{n!}\langle H^{[n]}\rangle^X_{0,d}
=N_d^XQ^d\sum_{n\ge0}\frac{(dt)^n}{n!}
=N_d^XQ^de^{dt}.
$$

右辺を $d\ge1$ について加える。この操作は、各 $Q^dt^n$ の係数を保ったまままとめる形式級数の等式である。次数0の寄与と合わせて主張が従う。
<!-- proof-end -->

**手で確かめる初項**。$N_1^X=a,\ N_2^X=b$ と一時的に置くと、次数2まで

$$
\begin{aligned}
\mathcal F_0^X(t,Q)
={}&\frac56t^3
+aQ\left(1+t+\frac{t^2}{2}+\frac{t^3}{6}+\cdots\right)\\
&+bQ^2\left(1+2t+2t^2+\frac43t^3+\cdots\right)
+O(Q^3).
\end{aligned}
$$

$a,b$ は一般に有理GW数であり、幾何的な曲線像の本数や後に登場する整数型数値で置き換えてはいない。

## 4. 三階微分をA側Yukawa結合と呼ぶ

一つの因子変数 $t$ について、**他の変数 $Q$ を固定した形式微分**を使う。$\partial_t$ は $t^n$ を $nt^{n-1}$ に送る $\mathbb Q[[Q]]$-線形作用素である。積や形式指数には通常の積の微分則が係数ごとに成り立つ。

後の演習で使う $\partial_Q$ は、逆に $t$ を固定して $Q^d$ を $dQ^{d-1}$（$d\ge1$、定数項は0）へ送る形式微分である。$\partial_t$ と $\partial_Q$ は作用する変数が異なる。

<a id="def-mir2-05-a-yukawa"></a>

<!-- formal-statement-start -->
> **定義（quinticのA側Yukawa結合）**  
> 滑らかなquintic $X$ の[因子方向の種数0ポテンシャル](#def-mir2-05-potential)に対し、三つの超平面挿入に対応するA側Yukawa結合を

$$
Y_A^X(t,Q):=\frac{\partial^3\mathcal F_0^X}{\partial t^3}(t,Q)
\quad\in\mathbb Q[[Q,t]]
$$

> と定める。すべての微分で $Q$ を固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-05-a-yukawa -->
**定義の確認**。$d=2$ の一項 $bQ^2e^{2t}$ を三回微分すると、微分ごとに2が掛かるため $8bQ^2e^{2t}$ になる。一方 $\partial_t^3(5t^3/6)=5$ である。$t=0$ では $d=2$ の寄与は $8bQ^2$、$Q=0$ では古典交叉数5だけが残る。どちらも定義式から直接確かめられる。
<!-- definition-example-end -->

<a id="prop-mir2-05-yukawa-series"></a>

<!-- formal-statement-start -->
> **命題（A側三次結合と三点関数）**  
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな五次超曲面、$H=c_1(\mathcal O_X(1))$、$Q,t$ を独立な形式変数とする。$N_d^X$ を正次数の無標点種数0仮想GW数、$Y_A^X$ を[因子方向のA側Yukawa結合](#def-mir2-05-a-yukawa)とする。このとき次の等式が $\mathbb Q[[Q,t]]$ で成り立つ。

$$
Y_A^X(t,Q)
=5+\sum_{d\ge1}d^3N_d^XQ^de^{dt}
=C^X_{HHH}(Qe^t).
$$

> ここで $C^X_{HHH}(x)=5+\sum_{d\ge1}d^3N_d^Xx^d$ は[既習の三点関数](../MIR2-03/index.md#def-mir2-03-three-point-series)を形式変数 $x$ で書き直したもので、$Qe^t$ は形式級数への代入を意味する。特に

$$
Y_A^X(0,Q)=C^X_{HHH}(Q),\qquad
Y_A^X(t,0)=5.
$$
<!-- formal-statement-end -->

### 証明の見取り図

指数の各項を $t$ で微分すると曲線次数 $d$ が一回ずつ現れる。三回微分で得た係数を、[因子公理](../../GW/GW1-15/index.md#thm-gw1-15-divisor)の[quintic仮想版](../MIR2-03/index.md#thm-mir2-03-divisor)から定めた三点関数と比較する。最後に $t=0$ と $Q=0$ の異なる特殊化を調べる。

<!-- proof-start -->
### 証明

[ポテンシャルの指数表示](#prop-mir2-05-potential-expansion)から出発する。$\partial_t e^{dt}$ を定義級数で計算すると

$$
\begin{aligned}
\partial_t e^{dt}
&=\sum_{n\ge1}\frac{d^nn}{n!}t^{n-1}
=d\sum_{m\ge0}\frac{d^mt^m}{m!}
=de^{dt}.
\end{aligned}
$$

従って $\partial_t^ke^{dt}=d^ke^{dt}$ が $k=1,2,3$ で帰納的に成立する。一方、三次項は

$$
\frac56t^3\xrightarrow{\partial_t}\frac52t^2
\xrightarrow{\partial_t}5t
\xrightarrow{\partial_t}5.
$$

それゆえ

$$
\frac{\partial^3\mathcal F_0^X}{\partial t^3}
=5+\sum_{d\ge1}d^3N_d^XQ^de^{dt}
=5+\sum_{d\ge1}d^3N_d^X(Qe^t)^d.
$$

最後の等号は $Q^de^{dt}=(Qe^t)^d$ による。$Q$ の各次数の係数だけに微分を施すので、$Q$ 方向の無限和と形式微分の交換に解析的収束は不要である。[三点関数の係数と形式微分](../MIR2-03/index.md#prop-mir2-03-series-coefficients)から右辺は $C^X_{HHH}(Qe^t)$ に等しい。

$t=0$ では $e^{d\cdot0}=1$、$Q=0$ では $d\ge1$ の項がすべて消える。二つの特殊化を代入すると残りの等式を得る。
<!-- proof-end -->

この計算から、より一般に $k\ge0$ に対して正次数部分の $k$ 階微分は $\sum_{d\ge1}d^kN_d^XQ^de^{dt}$ である。**三階**が特別なのは、次数0の三点交叉と、三つの超平面挿入を一度に回収するからである。

## 5. Yukawa結合は量子積を決める三点ペアリングである

三階微分は単なる記号の操作ではない。前講の[因子方向の大きい量子積](../MIR2-04/index.md#prop-mir2-04-big-divisor)では

$$
H*_{tH,Q}H=A(Qe^t)H^2,\qquad
A(x)=\frac15C^X_{HHH}(x)
$$

を得た。なぜ係数が $1/5$ だったかを思い出すと、[Poincaré双対基底を使った積の定義](../MIR2-04/index.md#def-mir2-04-small-product)は三点数をコホモロジー類へ変換したのであった。具体的には基底元 $H$ の双対元が $e^1=H^2/5$ であることを、

$$
\eta(e^1,H)=\int_X\frac{H^2}{5}\smile H
=\frac15\int_XH^3=1
$$

で確かめられる。したがって積を作る際の $1/5$ は、出力を $H$ とペアリングする際の交叉数5によって打ち消される。

<a id="prop-mir2-05-pairing"></a>

<!-- formal-statement-start -->
> **命題（量子積とのPoincaréペアリング）**  
> 滑らかなquintic $X\subset\mathbb P^4_{\mathbb C}$ に対し、$H=c_1(\mathcal O_X(1))$、$t,Q$ を独立な形式変数とする。[A側Yukawa結合](#def-mir2-05-a-yukawa)を $Y_A^X$、正次数の無標点種数0仮想GW数を $N_d^X$ とし、$A(x):=1+\frac15\sum_{d\ge1}d^3N_d^Xx^d$ と置く。Poincaréペアリング $\eta(u,v)=\int_Xu\smile v$ を $\mathbb Q[[Q,t]]$-双線形に延長すると

$$
\boxed{Y_A^X(t,Q)=\eta(H*_{tH,Q}H,H)=5A(Qe^t)}
$$

> が成り立つ。$H^2$ は通常のカップ二乗であり、左辺の積は追加挿入 $tH$ を持つ大きい量子積である。
<!-- formal-statement-end -->

### 証明の見取り図

既習の大きい量子積の積表へ入力 $H,H$ を代入し、その出力 $A(Qe^t)H^2$ と $H$ のカップ積を積分する。交叉数5と先ほど得た三階微分の式を比較する。

<!-- proof-start -->
### 証明

[因子方向の量子積の特殊化](../MIR2-04/index.md#prop-mir2-04-big-divisor)により

$$
H*_{tH,Q}H=A(Qe^t)H^2.
$$

$\eta$ は係数環上で双線形だから、[次数0の三点交叉数](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point) $\int_XH^3=5$ を使うと

$$
\begin{aligned}
\eta(H*_{tH,Q}H,H)
&=\eta(A(Qe^t)H^2,H)\\
&=A(Qe^t)\int_XH^2\smile H
=5A(Qe^t).
\end{aligned}
$$

$A(x)=C^X_{HHH}(x)/5$ を代入し、[三階微分の命題](#prop-mir2-05-yukawa-series)の $Y_A^X(t,Q)=C^X_{HHH}(Qe^t)$ と比較すると主張が従う。
<!-- proof-end -->

**二次項の検算**。記号 $[Q^2t^2]F$ は形式級数 $F$ の $Q^2t^2$ の係数を表す。$[Q^2t^2]Y_A^X(t,Q)$ は $d=2$ に対して

$$
8N_2^X\,[t^2]e^{2t}
=8N_2^X\frac{2^2}{2!}
=16N_2^X
$$

となる。一方 $H*_{tH,Q}H$ の $Q^2t^2$ 成分は [前講の計算](../MIR2-04/index.md#prop-mir2-04-big-divisor)から $(16N_2^X/5)H^2$、これを $H$ とペアリングすると $5$ 倍され同じ値になる。

この一致は**A側の三点相関とA側の量子積の整合性**を示したものである。B側で計算した周期由来のYukawa結合との一致は、座標・規格化・quinticミラー定理という別の入力を要する。ここだけでミラー対称性を証明したとは言わない。

## 6. 三階微分からポテンシャルをどこまで復元できるか

三階微分を使えば $Y_A^X$ が分かる。しかし、その逆操作には**二次以下の多項式の不定性**がある。これは「ミラー対称性による何らかの数値誤差」ではなく、微分という演算そのものの核である。

<a id="prop-mir2-05-quadratic-ambiguity"></a>

<!-- formal-statement-start -->
> **命題（三階微分の核と低次多項式の不定性）**  
> $R=\mathbb Q[[Q]]$ とし、$F,G\in R[[t]]$ に対して $\partial_t^3F=\partial_t^3G$ と仮定する。このとき、ある一意な $a_0(Q),a_1(Q),a_2(Q)\in R$ が存在して

$$
F(t,Q)-G(t,Q)
=a_0(Q)+a_1(Q)t+a_2(Q)t^2
$$

> となる。逆に、この形の差は三階微分で消える。従って $Y_A^X$ だけからは $\mathcal F_0^X$ を二次以下の項まで一意には復元できない。
<!-- formal-statement-end -->

### 証明の見取り図

差 $D=F-G$ を形式的な $t$-級数として展開する。三回微分後の $t^m$ 係数を比較し、有理数体上では $(m+3)(m+2)(m+1)$ が可逆であることを使う。

<!-- proof-start -->
### 証明

$D=\sum_{n\ge0}a_n(Q)t^n$ と一意に書ける。形式微分を三回適用すると

$$
\partial_t^3D
=\sum_{n\ge3}n(n-1)(n-2)a_n(Q)t^{n-3}.
$$

$\partial_t^3F=\partial_t^3G$ より左辺は零。$t^m$ の係数を比較すれば

$$
(m+3)(m+2)(m+1)a_{m+3}(Q)=0
\qquad(m\ge0)
$$

となる。$R=\mathbb Q[[Q]]$ では正の整数は単元なので、$a_{m+3}(Q)=0$。よって $D=a_0(Q)+a_1(Q)t+a_2(Q)t^2$ に限られる。逆向きは各項を三回微分してすべて零になることから従う。係数比較は $t$-形式級数の一意性だけを使っており、解析的な原始関数を仮定していない。
<!-- proof-end -->

例えば $\widetilde{\mathcal F}(t,Q)=\mathcal F_0^X(t,Q)+Q^2(3-2t+t^2)$ としても三階微分は同じである。しかしこの $\widetilde{\mathcal F}$ は、定義したGW母関数と同じではない。次数2における無標点・一標点・二標点の係数を変更してしまうためである。

**区別する二つの主張**。Yukawa結合だけを与えられた場合は二次以下の項が不定である。一方、[ポテンシャルの定義](#def-mir2-05-potential)には、$d>0$ の $n=0,1,2$ のGW不変量まで**最初から含まれる**ので、別の規約を加えなくても $\mathcal F_0^X$ は定義により一意に定まる。$Q=0$ にした古典規格化は $5t^3/6$ であるが、その条件だけでは $a_i(Q)\in Q\mathbb Q[[Q]]$ の自由度はまだ消えない。

**微分変数への注意**。補助形式変数 $x$ に対して $G(x)=\sum_{d\ge1}N_d^Xx^d$ と置く。$\partial_x$ は $x^d$ を $dx^{d-1}$ に送る形式微分である。

$x=Qe^t$ は $Q$ の正次数から始まるため $G$ へ代入できる。$Q$ を固定した $t$ 微分では

$$
\partial_tG(Qe^t)
=\sum_{d\ge1}dN_d^XQ^de^{dt}
=\left.x\frac{\partial G}{\partial x}\right|_{x=Qe^t}.
$$

各項で $x\partial_x(x^d)=dx^d$ が成り立つため、両辺の $Q^d$ 係数は一致する。この関係は**正次数部分に対して**成立し、古典項 $5t^3/6$ の微分を消してよいわけではない。$t=\log(x/Q)$ を $Q=0$ で使える形式冪級数だとみなすこともできない。

## 7. 演習：定義から三階微分、量子積、復元まで

以下すべて $X$ を滑らかなquintic、$H$ を超平面類、$Q,t$ を独立な形式変数、$N_d^X$ を種数0無標点仮想GW数とする。次数1、2の値を具体的に指定する問題でも、整数型数値・曲線像の本数と同一視しないこと。

### Level A：安定性・係数・微分の基礎

<a id="ex-mir2-05-a01"></a>
#### MIR2-05-A01 次数0の標点数を判定する
- Level: A

$d=0$ における $n=0,2,3,4$ の全ての超平面挿入を調べ、種数0ポテンシャルへ寄与する値と、そもそも安定でない値を区別せよ。

<!-- solution-start -->
**詳細解答**。定数写像の種数0安定性には $n\ge3$ が必要である。従って $n=0,2$ は安定写像が存在せず、不変量はこの定義では作らない。

$n=3$ では安定なモジュライが $X$ に対応する。[次数0の三点交叉](../MIR2-02/index.md#prop-mir2-02-degree-zero-three-point)を使うと

$$
\langle H,H,H\rangle^X_{0,0}=\int_XH^3=5
$$

であり、母関数への寄与は $5t^3/3!=5t^3/6$ である。

$n=4$ は安定だが、定数写像上で評価類の積が $H^4=0$ になる。$X$ の複素次元が3なので、四つの超平面類の積は零である。従って不変量も零となる。これは安定性が失われる場合とは理由が違う。
<!-- solution-end -->

<a id="ex-mir2-05-a02"></a>
#### MIR2-05-A02 反復因子の係数を手で求める
- Level: A

$N_2^X=b\in\mathbb Q$ とする。次数2、標点数 $n=0,1,2,3,4$ の全超平面挿入の値と、対応するポテンシャルの $Q^2$ 係数を $t^4$ まで書け。

<!-- solution-start -->
**詳細解答**。[正次数の反復因子挿入](../MIR2-03/index.md#prop-mir2-03-repeated-divisors)から $I_{2,n}=2^nb$ であり、順に $b,2b,4b,8b,16b$ となる。母関数では $n!$ で割るから

$$
[Q^2]\mathcal F_0^X
=b\left(1+2t+\frac{4t^2}{2}+\frac{8t^3}{6}+\frac{16t^4}{24}\right)+O(t^5).
$$

よって $[Q^2]\mathcal F_0^X=b(1+2t+2t^2+\tfrac43t^3+\tfrac23t^4)+O(t^5)$。$n=0$ でも $d=2>0$ なので安定性に問題はない。
<!-- solution-end -->

<a id="ex-mir2-05-a03"></a>
#### MIR2-05-A03 古典三次項を微分する
- Level: A

$5t^3/6$ を一階、二階、三階微分せよ。なぜ三階微分の定数項が5になるのかを $3!$ の意味とともに説明せよ。

<!-- solution-start -->
**詳細解答**。係数ごとに微分して

$$
\partial_t\left(\frac56t^3\right)=\frac52t^2,\qquad
\partial_t^2\left(\frac56t^3\right)=5t,\qquad
\partial_t^3\left(\frac56t^3\right)=5.
$$

三回の微分による係数は $3\cdot2\cdot1=3!=6$。三つの番号付き標点に同じ $H$ を挿入したGW数5をポテンシャルで $3!$ により対称化したので、微分でその因子がちょうど打ち消される。
<!-- solution-end -->

<a id="ex-mir2-05-a04"></a>
#### MIR2-05-A04 どの変数を固定するか
- Level: A

$E(t,Q)=bQ^2e^{2t}$ とする。$Q$ を固定した $\partial_t^3E$ と、$t$ を固定した $\partial_QE$ を求めよ。両者を同一視できない理由も示せ。

<!-- solution-start -->
**詳細解答**。$\partial_t(Q^2)=0$ として指数を三回微分するので

$$
\partial_t^3E=2^3bQ^2e^{2t}=8bQ^2e^{2t}.
$$

一方 $\partial_Q(Q^2)=2Q$ で $e^{2t}$ は固定だから

$$
\partial_QE=2bQe^{2t}.
$$

$Q$ の冪まで変化する後者は三点挿入に対応せず、$Q=0$ での次数も違う。A側Yukawaの定義は $\partial_t^3$ である。
<!-- solution-end -->

<a id="ex-mir2-05-a05"></a>
#### MIR2-05-A05 二次以下の自由度と三次項の違い
- Level: A

$P(t,Q)=2Q-Q^2t+3Qt^2$ と $R(t,Q)=Qt^3$ をそれぞれ三階微分せよ。$Y_A^X$ を保つ変更はどちらか。

<!-- solution-start -->
**詳細解答**。$P$ の各項は $t$ の次数が2以下なので $\partial_t^3P=0$。一方 $R$ は

$$
\partial_t(Qt^3)=3Qt^2,\quad
\partial_t^2(Qt^3)=6Qt,\quad
\partial_t^3(Qt^3)=6Q
$$

である。従って $P$ を足してもYukawa結合は変わらないが、$R$ を足すと $6Q$ だけ変わる。この違いは[三階微分の核の命題](#prop-mir2-05-quadratic-ambiguity)そのものである。
<!-- solution-end -->

### Level B：公式を自分で再導出する

<a id="ex-mir2-05-b01"></a>
#### MIR2-05-B01 GW不変量から指数級数まで復元する
- Level: B

$d\ge1$ を一つ固定し、$\langle H^{[n]}\rangle_{0,d}^X=d^nN_d^X$ を[因子公理](../../GW/GW1-15/index.md#thm-gw1-15-divisor)の[quintic仮想版](../MIR2-03/index.md#thm-mir2-03-divisor)から帰納的に導き、$\sum_{n\ge0}t^n\langle H^{[n]}\rangle_{0,d}^X/n!$ を計算せよ。$d=0$ に同じ議論を使えない理由も述べよ。

<!-- solution-start -->
**詳細解答**。$n=0$ は[無標点GW数の定義](../MIR2-03/index.md#def-mir2-03-unmarked-number)で $I_{d,0}=N_d^X$。$d>0$ では忘却後も安定なので、[仮想版因子公理](../MIR2-03/index.md#thm-mir2-03-divisor)が

$$
I_{d,n+1}=\left(\int_dH\right)I_{d,n}=dI_{d,n}
$$

を与える。$I_{d,n}=d^nN_d^X$ と仮定すれば $I_{d,n+1}=d^{n+1}N_d^X$。帰納法で全 $n\ge0$ に成立し、

$$
\sum_{n\ge0}\frac{t^nI_{d,n}}{n!}
=N_d^X\sum_{n\ge0}\frac{(dt)^n}{n!}
=N_d^Xe^{dt}.
$$

$d=0$ では無標点の安定な定数写像が存在せず、$I_{0,0}$ を起点に帰納できない。安定な $n\ge3$ から別に扱い、$n=3$ の値5だけが残る。
<!-- solution-end -->

<a id="ex-mir2-05-b02"></a>
#### MIR2-05-B02 積とペアリングで三点数を戻す
- Level: B

$A(x)=1+\frac{N_1^X}{5}x+\frac{8N_2^X}{5}x^2+O(x^3)$ とする。[因子方向の大きい量子積の特殊化](../MIR2-04/index.md#prop-mir2-04-big-divisor)を使い、$\eta(H*_{tH,Q}H,H)$ を $Q^2$ まで求め、$[Q^2t^2]$ の係数を示せ。

<!-- solution-start -->
**詳細解答**。積表から $H*_{tH,Q}H=A(Qe^t)H^2$。$\eta(H^2,H)=\int_XH^3=5$ なので

$$
\eta(H*_{tH,Q}H,H)
=5A(Qe^t)
=5+N_1^XQe^t+8N_2^XQ^2e^{2t}+O(Q^3).
$$

$e^{2t}=1+2t+2t^2+\cdots$ より、$[Q^2t^2]$ は $8N_2^X\cdot2=16N_2^X$。これは[三階微分の式](#prop-mir2-05-yukawa-series)で得る係数と一致する。交叉数の5を掛けずに積の係数を三点値と取り違えると $1/5$ の誤差が残る。
<!-- solution-end -->

<a id="ex-mir2-05-b03"></a>
#### MIR2-05-B03 Yukawaだけから復元すると何が残るか
- Level: B

$Y(t,Q)=5+aQe^t+8bQ^2e^{2t}+O(Q^3)$ が与えられたとする。$Q^2$ までの $\partial_t^3F=Y$ を満たす $F$ の一般形を求めよ。さらに $d>0$ の無標点GW数が $N_1^X=a,N_2^X=b$ であるというポテンシャル定義を課すと何が決まるか。

<!-- solution-start -->
**詳細解答**。指数に三回微分を掛けると、$e^t$ は係数1倍、$e^{2t}$ は係数8倍になる。従って一つの解は

$$
F_*(t,Q)=\frac56t^3+aQe^t+bQ^2e^{2t}+O(Q^3).
$$

[三階微分の核](#prop-mir2-05-quadratic-ambiguity)により、与えられた次数までの解の一般形は

$$
F=F_*+c_0(Q)+c_1(Q)t+c_2(Q)t^2
$$

である。ここで $O(Q^3)$ の部分は、指定されていないYukawaの高次項に合わせて選ぶ。

一方、GW母関数の定義を追加すると、曲線次数 $d>0$ の無標点・一標点・二標点の係数はそれぞれ

$$
N_d^X,\qquad dN_d^X,\qquad \frac{d^2N_d^X}{2}
$$

に定まる。従って $Q$ の次数1と2で $c_0,c_1,c_2$ に追加の自由度はない。$Q^0$ の $t^0,t^1,t^2$ の係数も、次数0では標点数3未満の安定写像が存在しないので、母関数に含めない。

三階微分だけでは決まらない低次の情報を、GW母関数の定義が補っている。
<!-- solution-end -->

<a id="ex-mir2-05-b04"></a>
#### MIR2-05-B04 形式変数の置換を係数で確かめる
- Level: B

$G(x)=a x+b x^2+O(x^3)$ とし、$x=Qe^t$ とする。$\partial_tG(Qe^t)=\left.x\partial_xG(x)\right|_{x=Qe^t}$ を $Q^2$ まで確認せよ。そのうえで、この等式だけから $\partial_t(5t^3/6)=0$ と結論できない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。左辺は

$$
\partial_t(aQe^t+bQ^2e^{2t})
=aQe^t+2bQ^2e^{2t}+O(Q^3).
$$

右辺は $G'(x)=a+2bx+O(x^2)$ より $xG'(x)=ax+2bx^2+O(x^3)$。$x=Qe^t$ と置けば同じ式となる。ただしこの同一性は $G(Qe^t)$ という**正次数部分**の形式合成に対するものである。古典項は $G$ に含まれず、

$$
\partial_t(5t^3/6)=5t^2/2
$$

は零でない。$Q$ と $t$ を独立に定めた規約を保持しなければ、曲線寄与と古典項を混同する。
<!-- solution-end -->

### Level C：母関数から量子積までの総合問題

<a id="ex-mir2-05-c01"></a>
#### MIR2-05-C01 次数2までのA側の全鎖を再構成する
- Level: C

$N_1^X=a,N_2^X=b\in\mathbb Q$ とする。以下を順に示せ。

1. $\mathcal F_0^X(t,Q)$ を $Q^2$・$t^3$ まで展開する。
2. 三階微分 $Y_A^X(t,Q)$ を $Q^2$ まで求め、$t=0$ での三点関数を示す。
3. $\eta(H*_{tH,Q}H,H)=Y_A^X(t,Q)$ を確認し、$[Q^2t^2]$ を求める。
4. $F$ に $Q(1+t+t^2)$ を加えた場合と $Qt^3$ を加えた場合を比較し、三点相関から復元できない項を説明する。
5. 計算で得た $a,b$ を、B側の周期から求まる整数型曲線数とそのまま同一視できるかを論理的に判定する。

<!-- solution-start -->
**詳細解答**。

1. [指数表示](#prop-mir2-05-potential-expansion)に $e^t=1+t+t^2/2+t^3/6+\cdots$ と $e^{2t}=1+2t+2t^2+4t^3/3+\cdots$ を代入する。

$$
\mathcal F_0^X(t,Q)=\frac56t^3
+aQ\left(1+t+\frac12t^2+\frac16t^3\right)
+bQ^2\left(1+2t+2t^2+\frac43t^3\right)
+O(Q^3)+O(t^4)Q.
$$

ここで $O(t^4)Q$ は $Q$ 次数が1以上で $t$ 次数が4以上の項を表す。

2. 截断した $t^3$ の式だけを三回微分して $t$ 依存が消えたと誤認しないよう、**微分前の指数表示**を使う。

$$
Y_A^X(t,Q)=5+aQe^t+8bQ^2e^{2t}+O(Q^3).
$$

従って $t=0$ では $C^X_{HHH}(Q)=5+aQ+8bQ^2+O(Q^3)$ となる。

3. [量子積の特殊化](../MIR2-04/index.md#prop-mir2-04-big-divisor)では

$$
H*_{tH,Q}H
=\left(1+\frac a5Qe^t+\frac{8b}{5}Q^2e^{2t}+O(Q^3)\right)H^2.
$$

$\eta(H^2,H)=5$ を使うと右辺の係数に5が掛かり、2の $Y_A^X$ に一致する。$[t^2]e^{2t}=2$ だから $[Q^2t^2]Y_A^X=8b\cdot2=16b$。

4. $Q(1+t+t^2)$ は $t$ の次数が2以下で三階微分が零、従ってYukawaを変えない。ただし無標点・一標点・二標点のGW母関数係数は変えてしまう。$Qt^3$ は三階微分が $6Q$ なのでYukawaも変える。これは[低次多項式の不定性](#prop-mir2-05-quadratic-ambiguity)の具体例である。

5. $a,b$ は[無標点・種数0仮想GW数](../MIR2-03/index.md#def-mir2-03-unmarked-number)という有理数の積分値である。今の計算はGW母関数から三点関数を**A側内部で**復元しただけであり、B側の周期と同一であるとするミラー定理を使用していない。また多重被覆の補正もしていない。したがって $a,b$ が整数型数値あるいは曲線像の本数と一致するとは、この段階では結論できない。
<!-- solution-end -->

## 8. 次講へ：母関数から平坦な接続へ

この講義で、正次数の無標点GW数をまとめた母関数は

$$
\mathcal F_0^X(t,Q)=\frac56t^3+\sum_{d\ge1}N_d^XQ^de^{dt}
$$

となり、その三階微分は [三点関数](#prop-mir2-05-yukawa-series)、さらに[量子積のPoincaréペアリング](#prop-mir2-05-pairing)と一致した。古典三次項の交叉数5、因子公理の $d^3$、双対基底に由来する積の係数 $1/5$ がそれぞれ別の理由で現れることも区別できた。

次の MIR2-06 では、この**積を微分方程式の係数へ変える**ため、量子接続と量子微分方程式を導入する。そこでも接続の平坦性に必要な公理と、実際に計算した式を分けて扱う。
