# NT7 連分数・Pell 方程式・Diophantine 近似

整数の方程式は「一つ解があるか」だけでなく「解をどこまで列挙できるか」が重要です。[一次不定方程式の全整数解](../NT6/index.md#thm-nt6-linear-diophantine)は整数一つで表示できました。しかし $x^2-2y^2=1$ は $(3,2),(17,12),(99,70),\ldots$ と際限なく増える正整数解を持ちます。この数列を力任せの探索で見つけるのは非効率です。

鍵は $x^2-2y^2=(x-\sqrt2y)(x+\sqrt2y)$ です。$y$ が大きいとき解の比 $x/y$ は $\sqrt2$ に極めて近くなります。そこでまず**無理数を分数で近似する規則**を作り、それから Pell 方程式の解の存在と全解の構造を証明します。

この章を読み終えると、連分数から近似分数を計算し、その分母以下の近似と比較でき、平方根の連分数が繰り返す理由を説明し、Pell 方程式の正整数解を最小解からすべて生成できます。

## 1. Euclid の割り算から連分数へ

$415/93$ を整数部分と残りへ分解すると $415/93=4+43/93$、さらに残りを逆数にして $93/43=2+7/43$ と続けられます。これは[Euclid の互除法](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)と同じ計算を分数の中に保存する方法です。一般の実数でも、整数部分を取り、残りの逆数を取る操作を繰り返せます。

実数 $\alpha$ の整数部分を $a_0=\lfloor\alpha\rfloor$ とし、$\alpha_0=\alpha$、$\alpha_n$ が整数でない間、

$$
a_n=\lfloor\alpha_n\rfloor,\qquad
\alpha_{n+1}=\frac1{\alpha_n-a_n}
$$

とします。$n\ge1$ では $\alpha_n>1$ なので $a_n\ge1$ です。計算が停止したときは有限連分数、停止しないときは無限連分数になります。

<a id="def-nt7-continued-fraction"></a>

<!-- formal-statement-start -->
> **定義（単純連分数）**  
> 実数 $\alpha$ に上述の整数部分・逆数操作を適用して得られる整数列を $a_0,a_1,\ldots$ とする。表記

$$
\alpha=[a_0;a_1,a_2,\ldots]
=a_0+\cfrac1{a_1+\cfrac1{a_2+\cdots}}
$$

> を $\alpha$ の単純連分数という。計算が停止する場合は最後の $a_n$ で式を終える。途中の $\alpha_n$ を完全商という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt7-continued-fraction -->
**定義の確認**：$19/7=2+5/7$、$7/5=1+2/5$、$5/2=2+1/2$、$2/1=2$ なので $19/7=[2;1,2,2]$ です。整数部分は順に $2,1,2,2$、途中の逆数は $7/5,5/2,2$ です。最後が整数になり停止するため有限連分数です。
<!-- definition-example-end -->

無理数ならどの完全商も整数にならず、無限に続きます。逆に有理数では、逆数操作を分子・分母の余りへ読み替えれば、正の分母が互除法で減少して有限回で止まります。よって**有理数と有限連分数が対応**します。

## 2. 収束分数と近似誤差

途中で打ち切った $[a_0;\ldots,a_n]$ は有理数です。分子・分母を毎回深い入れ子から計算する代わりに、二項漸化式だけで求められます。

<a id="def-nt7-convergent"></a>

<!-- formal-statement-start -->
> **定義（収束分数）**  
> 単純連分数 $[a_0;a_1,\ldots]$ の $n$ 番目の収束分数を $p_n/q_n=[a_0;\ldots,a_n]$（$n\ge0$）とする。分子・分母は次の初期値と漸化式で定める。

$$
\begin{gathered}
p_{-2}=0,\quad p_{-1}=1,\qquad
q_{-2}=1,\quad q_{-1}=0,\\
p_n=a_np_{n-1}+p_{n-2},\qquad
q_n=a_nq_{n-1}+q_{n-2}.
\end{gathered}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt7-convergent -->
**定義の確認**：$[1;2,2,2,\ldots]$ では $p_0=1,q_0=1$、$p_1=2\cdot1+1=3,q_1=2\cdot1+0=2$、$p_2=2\cdot3+1=7,q_2=2\cdot2+1=5$ です。直接展開しても $[1;2]=3/2$、$[1;2,2]=1+1/(2+1/2)=7/5$ で一致します。
<!-- definition-example-end -->

<a id="lem-nt7-convergent-matrix"></a>

<!-- formal-statement-start -->
> **補題（収束分数の行列式と完全商公式）**  
> 単純連分数の収束分数について、すべての $n\ge0$ で

$$
p_nq_{n-1}-p_{n-1}q_n=(-1)^{n-1}
$$

> が成立する（$n=0$ でも右辺は $-1$）。さらに無理数 $\alpha$ の完全商 $\alpha_{n+1}$ に対し

$$
\alpha=\frac{p_n\alpha_{n+1}+p_{n-1}}
{q_n\alpha_{n+1}+q_{n-1}}
$$

> が成り立つ。特に $\gcd(p_n,q_n)=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一段連分数を付け足すと分子・分母がともに同じ線形漸化式を満たします。行列式の差では $a_n$ を含む項が打ち消され、符号だけ交替します。完全商公式は末尾を変数として同じ漸化式を使います。

<!-- proof-start -->
### 証明

最初の収束分数は $p_0=a_0,q_0=1$ なので、$p_0q_{-1}-p_{-1}q_0=0-1=-1$ です。$n\ge1$ の場合は

$$
\begin{aligned}
p_nq_{n-1}-p_{n-1}q_n
&=(a_np_{n-1}+p_{n-2})q_{n-1}\\
&\quad-p_{n-1}(a_nq_{n-1}+q_{n-2})\\
&=p_{n-2}q_{n-1}-p_{n-1}q_{n-2}
\end{aligned}
$$

となり、前の行列式の負です。帰納法で符号公式を得ます。$p_n,q_n$ の公約数はこの整数 $1$ または $-1$ を割るので互いに素です。

任意の実数 $t>0$ について、入れ子の末尾を $t$ に置き換えた式を $F_n(t)=[a_0;a_1,\ldots,a_n+t^{-1}]$ と書くと、初期段階は

$$
F_0(t)=a_0+\frac1t
=\frac{p_0t+p_{-1}}{q_0t+q_{-1}}.
$$

次の段階の入れ子を追加する操作では、$t$ の前の係数が $a_n$ 倍と一段前の和になるため、同じ漸化式を使って

$$
F_n(t)=\frac{p_nt+p_{n-1}}{q_nt+q_{n-1}}
$$

を帰納的に得ます。無理数 $\alpha$ の場合、$[a_0;\ldots,a_n,\alpha_{n+1}]$ はちょうど $\alpha$ なので $t=\alpha_{n+1}$ として結論が従います。
<!-- proof-end -->

<a id="thm-nt7-convergent-error"></a>

<!-- formal-statement-start -->
> **定理（収束分数の誤差と交互近似）**  
> 無理数 $\alpha$ の単純連分数の収束分数を $p_n/q_n$ とする。すべての $n\ge0$ について

$$
0<\left|\alpha-\frac{p_n}{q_n}\right|
<\frac1{q_nq_{n+1}}
\le\frac1{q_n^2}
$$

> である。また $\alpha-p_n/q_n$ の符号は $(-1)^n$ であり、収束分数は $\alpha$ の両側から交互に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

分子の $p_n$ と完全商を含む $\alpha$ を共通分母に乗せると、直前の補題の行列式だけが残ります。完全商は次の整数部分より大きいため、分母が $q_{n+1}$ より大きくなります。

<!-- proof-start -->
### 証明

[完全商公式](#lem-nt7-convergent-matrix)を分母へ代入すると

$$
\begin{aligned}
q_n\alpha-p_n
&=\frac{q_np_{n-1}-p_nq_{n-1}}
{q_n\alpha_{n+1}+q_{n-1}}\\
&=\frac{(-1)^n}{q_n\alpha_{n+1}+q_{n-1}}.
\end{aligned}
$$

$n\ge0$ で $q_n>0$、$\alpha_{n+1}>a_{n+1}$、$q_{n-1}\ge0$ なので、分母は正で、しかも

$$
q_n\alpha_{n+1}+q_{n-1}
>q_na_{n+1}+q_{n-1}=q_{n+1}.
$$

従って $|q_n\alpha-p_n|<1/q_{n+1}$ です。両辺を $q_n$ で割ります。また $q_{n+1}\ge q_n$（$a_{n+1}\ge1$）なので最後の不等式も成立します。符号は分母が正であることから得られます。
<!-- proof-end -->

例えば $\sqrt2=[1;2,2,\ldots]$ の $7/5$ は $1.4$ で、$\sqrt2$ より小さい値です。定理から $|\sqrt2-7/5|<1/(5\cdot12)=1/60$ です。実際 $7^2-2\cdot5^2=-1$ であり、近似の鋭さを整数の式で確かめられます。

<a id="thm-nt7-best-approximation"></a>

<!-- formal-statement-start -->
> **定理（第二種最良近似）**  
> 無理数 $\alpha$ の収束分数を $p_n/q_n$ とする。$p\in\mathbb Z$、$q\in\mathbb Z$、$0<q<q_{n+1}$ なら

$$
|q\alpha-p|\ge |q_n\alpha-p_n|
$$

> が成立し、等号は $(p,q)=(p_n,q_n)$ の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

隣り合う収束分数の分子・分母は行列式が $\pm1$ なので、すべての整数組をこの二組の整数線形結合で書けます。分母を $q_{n+1}$ より小さくするには、同符号の正の係数を両方は使えません。その一方、誤差は交互符号なので、係数を逆符号にすると誤差の絶対値は加算されます。

<!-- proof-start -->
### 証明

[行列式の補題](#lem-nt7-convergent-matrix)により $(p_n,q_n)$ と $(p_{n+1},q_{n+1})$ の行列式は $\pm1$ です。従って任意の整数組 $(p,q)$ は一意的に

$$
(p,q)=a(p_n,q_n)+b(p_{n+1},q_{n+1}),
\qquad a,b\in\mathbb Z
$$

と書けます。$r_j=q_j\alpha-p_j$ と置くと $r_n$ と $r_{n+1}$ は[誤差定理](#thm-nt7-convergent-error)によって異符号です。

$b=0$ の場合、$q=aq_n>0$ より $a\ge1$ なので $|q\alpha-p|=a|r_n|\ge|r_n|$、等号は $a=1$ です。$a=0$ で $b\ne0$ なら $0<q<q_{n+1}$ を満たせません。

$a,b$ が同符号で両方非零なら、正の場合は $q\ge q_n+q_{n+1}>q_{n+1}$、負の場合は $q<0$ です。よって許される残りの場合は $a,b$ が逆符号です。ここでは $r_n,r_{n+1}$ も異符号であるため

$$
|q\alpha-p|=|ar_n+br_{n+1}|
=|a|\,|r_n|+|b|\,|r_{n+1}|
>|r_n|
$$

が成立します（$|a|,|b|\ge1$）。以上です。
<!-- proof-end -->

この「最良」は $|\alpha-p/q|$ そのものではなく、**分母を掛けた誤差 $|q\alpha-p|$** に関する主張です。異なる意味の最良近似を混同しないことが大切です。

## 3. $\sqrt D$ の連分数はなぜ周期を持つか

$\sqrt2$ の整数部分は $1$ で、残りを逆数にすると

$$
\frac1{\sqrt2-1}=\sqrt2+1=2+(\sqrt2-1).
$$

同じ小数部分に戻るため $\sqrt2=[1;\overline{2}]$ です。$\overline{2}$ は $2$ の無限反復を意味します。$\sqrt3=[1;\overline{1,2}]$ も計算で確かめられます。偶然ではなく、平方根を含む完全商は整数パラメータ二つだけで記録でき、その候補が有限個に限られるためです。

<a id="thm-nt7-square-root-periodic"></a>

<!-- formal-statement-start -->
> **定理（平方根の連分数の周期性）**  
> $D\ge2$ を平方数でない正整数とする。$\sqrt D$ の単純連分数は $a_0=\lfloor\sqrt D\rfloor$ の後、有限個の項を経て周期的になる。すなわちある $N\ge1,L\ge1$ が存在して、すべての $n\ge N$ で $a_{n+L}=a_n$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

完全商を $(\sqrt D+m_n)/d_n$ と表示し、整数 $m_n,d_n$ の上下限を示します。平方根の共役 $\sqrt D\mapsto-\sqrt D$ を取ると、二つの完全商の位置関係から $0<m_n<\sqrt D$、$0<d_n<2\sqrt D$ が得られます。

<!-- proof-start -->
### 証明

$a_0=\lfloor\sqrt D\rfloor$ として $\alpha_0=\sqrt D$ から開始し、各段階を

$$
\alpha_n=\frac{\sqrt D+m_n}{d_n}
$$

と書きます。初期状態は $m_0=0,d_0=1$ です。$\alpha_n-a_n=(\sqrt D+m_n-a_nd_n)/d_n$ を逆数にして分母を有理化すると、

$$
\begin{aligned}
m_{n+1}&=a_nd_n-m_n,\\
d_{n+1}&=\frac{D-m_{n+1}^2}{d_n},\\
a_{n+1}&=\left\lfloor\frac{\sqrt D+m_{n+1}}{d_{n+1}}\right\rfloor.
\end{aligned}
$$

$m_0,d_0$ は整数であり、$d_0=1$ は $D-m_0^2$ を割ります。$d_n\mid D-m_n^2$ と仮定すると $m_{n+1}\equiv-m_n\pmod{d_n}$ から $d_n\mid D-m_{n+1}^2$ です。よって帰納的に $m_{n+1},d_{n+1}$ は整数になります。$\alpha_n-a_n=(\sqrt D-m_{n+1})/d_n>0$ と $\alpha_n'-a_n=-(\sqrt D+m_{n+1})/d_n<-1$ から、$d_n>0$ を仮定すれば $-\sqrt D<m_{n+1}<\sqrt D$ です。従って $D-m_{n+1}^2>0$ で $d_{n+1}>0$ となり、この正値性も帰納的に成立します。

$\alpha_n'$ を $\sqrt D$ を $-\sqrt D$ に置き換えた共役完全商とします。最初の逆数操作で

$$
\alpha_1'=\frac1{-\sqrt D-a_0}\in(-1,0),
\qquad \alpha_1>1
$$

です。$n\ge1$ で $\alpha_n'>-1$ かつ $\alpha_n'<0$ と仮定します。$a_n\ge1$ だから $\alpha_n'-a_n<-1$、従って

$$
\alpha_{n+1}'=\frac1{\alpha_n'-a_n}\in(-1,0).
$$

一方 $\alpha_{n+1}=1/(\alpha_n-a_n)>1$ です。帰納的にすべての $n\ge1$ で $\alpha_n>1$、$-1<\alpha_n'<0$ となります。

共役表示 $\alpha_n'=(m_n-\sqrt D)/d_n$ において $d_n>0$ とすると、$\alpha_n'<0$ より $m_n<\sqrt D$、$\alpha_n+\alpha_n'=2m_n/d_n>0$ より $m_n>0$、$\alpha_n>1$ より $d_n<\sqrt D+m_n<2\sqrt D$ です。$d_1=D-a_0^2>0$ で、$m_{n+1}<\sqrt D$ により漸化式中の $d_{n+1}>0$ が保証され、帰納は閉じます。

従って $n\ge1$ の整数対 $(m_n,d_n)$ は

$$
0<m_n<\sqrt D,\qquad 0<d_n<2\sqrt D
$$

を満たす有限集合に属します。次の状態は現在の $(m_n,d_n)$ だけで決まるため、鳩の巣原理で同じ状態が再出現した後は状態列が反復し、$a_n$ もやがて周期的です。
<!-- proof-end -->

一般の実二次無理数でも連分数が最終的に周期的になるという Lagrange の定理があります。ここでは Pell 方程式に直接使う $\sqrt D$ の場合を完全に証明しました。

**具体計算**：$D=3$ では $a_0=1$、$(m_1,d_1)=(1,2)$ から $a_1=1$、次に $(m_2,d_2)=(1,1)$、$a_2=2$、そして $(m_3,d_3)=(1,2)$ へ戻ります。ゆえに $\sqrt3=[1;\overline{1,2}]$ と実際の状態の反復が対応します。

## 4. Pell 方程式の解は本当に存在するか

<a id="def-nt7-pell-equation"></a>

<!-- formal-statement-start -->
> **定義（Pell 方程式と基本解）**  
> $D\ge2$ を平方数でない正整数とする。整数方程式

$$
x^2-Dy^2=1
$$

> を Pell 方程式という。$x>0,y>0$ の整数解のうち $x+y\sqrt D$ が最小となるものを基本解 $(x_1,y_1)$ とする。基本解が存在することは後の定理で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt7-pell-equation -->
**定義の確認**：$D=2$ では $(x,y)=(3,2)$ が $3^2-2\cdot2^2=9-8=1$ を満たします。$y=1$ なら $x^2=3$ で不可能なので、これが $y>0$ で最初の候補です。$x^2=2y^2+1$ は $y$ とともに増大するため $(3,2)$ が基本解です。$D$ が平方数なら異なる問題になるので、定義では除いています。
<!-- definition-example-end -->

まず基本解の存在を、連分数の周期性を仮定せずに確かめます。使うのは実数の小数部分を区間に分ける単純な鳩の巣原理です。

<a id="lem-nt7-dirichlet-approximation"></a>

<!-- formal-statement-start -->
> **補題（一次元の Dirichlet 近似）**  
> 無理数 $\alpha$ と正整数 $M$ に対し、整数 $p$ と $1\le q\le M$ が存在して

$$
|q\alpha-p|<\frac1M
$$

> が成り立つ。特に相異なる分母 $q$ を持つ組で $|q\alpha-p|<1/q$ を満たすものが無限に存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0,\alpha,2\alpha,\ldots,M\alpha$ の小数部分 $M+1$ 個を、長さ $1/M$ の半開区間 $[j/M,(j+1)/M)$（$0\le j<M$）へ入れます。二つ $i\alpha,j\alpha$（$0\le i<j\le M$）の小数部分が同じ区間へ入るので、整数 $p=\lfloor j\alpha\rfloor-\lfloor i\alpha\rfloor$、$q=j-i$ とすれば $1\le q\le M$ かつ $|q\alpha-p|<1/M$ です。

もしこのような $(p,q)$ が有限個しかなければ、各 $\alpha q-p$ は無理数性により非零なので、その絶対値の最小値 $\delta>0$ が存在します。しかし $M>1/\delta$ に取ると今の構成で $|q\alpha-p|<1/M<\delta$ という新しい組が必要になり矛盾します。有限個の分母 $q$ に対して $|q\alpha-p|<1/q$ を満たす整数 $p$ は有限個なので、分母も無限に異なります。
<!-- proof-end -->

<a id="thm-nt7-pell-existence"></a>

<!-- formal-statement-start -->
> **定理（Pell 方程式の正整数解の存在）**  
> $D\ge2$ が平方数でない正整数なら、$x^2-Dy^2=1$ は $x>0,y>0$ の整数解を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

近似から $x^2-Dy^2$ が小さい整数となる組を無限に作ります。ノルムの値と二つの座標の剰余が同じ二組を選び、代数的な比を取ると、ノルム $1$ の整数係数に戻ります。

<!-- proof-start -->
### 証明

$\alpha=\sqrt D$ に[Dirichlet 近似の補題](#lem-nt7-dirichlet-approximation)を適用します。相異なる正整数 $y$ で $|x-\sqrt D\,y|<1/y$ を満たす整数 $x$ を無限に選べます。$y$ を十分大きくすれば $x>0$ で、

$$
\begin{aligned}
|x^2-Dy^2|
&=|x-\sqrt D\,y|\,(x+\sqrt D\,y)\\
&<\frac1y\left(2\sqrt D\,y+\frac1y\right)
\le2\sqrt D+1.
\end{aligned}
$$

ここで $x<\sqrt D\,y+1/y$ を使いました。$D$ は平方数ではないので $x^2-Dy^2\ne0$ です。従って整数 $N=x^2-Dy^2$ が取り得る値は、非零の有限個に限られます。無限個の組の中から $N$ が同じものを無限個取り出します。さらに $|N|$ を法とする $x,y$ の剰余はそれぞれ有限通りなので、異なる二組 $(x_1,y_1),(x_2,y_2)$ を

$$
\begin{gathered}
x_1\equiv x_2\pmod{|N|},\qquad
y_1\equiv y_2\pmod{|N|},\\
x_1+y_1\sqrt D>x_2+y_2\sqrt D>0
\end{gathered}
$$

となるように選べます。ここで両組は同じ $N$ を満たします。比

$$
u+v\sqrt D
=\frac{x_1+y_1\sqrt D}{x_2+y_2\sqrt D}
=\frac{(x_1+y_1\sqrt D)(x_2-y_2\sqrt D)}{N}
$$

を展開すると

$$
u=\frac{x_1x_2-Dy_1y_2}{N},\qquad
v=\frac{y_1x_2-x_1y_2}{N}
$$

です。合同条件により第一の分子は $x_2^2-Dy_2^2=N$ と合同、第二の分子は $0$ と合同（いずれも法 $|N|$）なので $u,v\in\mathbb Z$ です。比は $1$ より大きく、共役の積は両組のノルムが $N$ であることから

$$
(u+v\sqrt D)(u-v\sqrt D)
=\frac{x_1^2-Dy_1^2}{x_2^2-Dy_2^2}
=\frac NN=1.
$$

よって $u^2-Dv^2=1$ です。また $u+v\sqrt D>1$ と $u-v\sqrt D=1/(u+v\sqrt D)\in(0,1)$ を足し引きすれば $u>0,v>0$ と分かります。これが要求する正整数解です。
<!-- proof-end -->

<a id="thm-nt7-pell-all-solutions"></a>

<!-- formal-statement-start -->
> **定理（Pell 方程式の全正整数解）**  
> $D\ge2$ は平方数でない正整数とし、$(x_1,y_1)$ を $x^2-Dy^2=1$ の基本解とする。$x>0,y>0$ の整数解全体は、ただ一つの整数 $n\ge1$ に対して

$$
x_n+y_n\sqrt D=(x_1+y_1\sqrt D)^n
$$

> と表される組 $(x_n,y_n)$ である。従ってすべての正整数解を基本解から生成できる。
<!-- formal-statement-end -->

### 証明の見取り図

ノルム $1$ の数は掛けてもノルム $1$ です。逆数にも整数係数が残ることから、もし基本解と次の解の間に別の解があれば「基本解の最小性」に反します。

<!-- proof-start -->
### 証明

直前の[存在定理](#thm-nt7-pell-existence)により正整数解があり、$x$ は正整数、$y^2=(x^2-1)/D$ なので、$x$ が最小の解を選べます。$x+y\sqrt D$ は $x$ に伴い増えるため、基本解 $\varepsilon=x_1+y_1\sqrt D>1$ が存在します。

$N(a+b\sqrt D)=a^2-Db^2$ と置くと、二つの積を展開して

$$
N((a+b\sqrt D)(c+d\sqrt D))
=(a^2-Db^2)(c^2-Dd^2)
$$

を得ます。$N(\varepsilon)=1$ なので $\varepsilon^{-1}=x_1-y_1\sqrt D$ は整数係数を持ち、$N(\varepsilon^{-1})=1$ です。ゆえに $\varepsilon^n$ の係数も整数で、共役は $\varepsilon^{-n}$、また $\varepsilon^n>1$ なので二つの係数は正です。従って右辺はすべて解になります。

逆に任意の正整数解 $\delta=x+y\sqrt D>1$ を取ります。$\varepsilon>1$ なのである $n\ge0$ に対して

$$
\varepsilon^n\le\delta<\varepsilon^{n+1}
$$

が成立します。$t=\delta\varepsilon^{-n}$ は整数係数 $a+b\sqrt D$ を持ち、$N(t)=1$、かつ $1\le t<\varepsilon$ です。$t=1$ なら $\delta=\varepsilon^n$ で結論を得ます。$t>1$ なら共役は $t^{-1}<1$ なので

$$
a=\frac{t+t^{-1}}2>0,\qquad
b=\frac{t-t^{-1}}{2\sqrt D}>0.
$$

よって $(a,b)$ は基本解より小さい正整数解となり矛盾します。したがって $t=1$ であり、正整数解の表示は一意です。
<!-- proof-end -->

**計算の仕方**：$D=2$ の基本解は $(3,2)$ です。平方すると

$$
(3+2\sqrt2)^2=9+12\sqrt2+8=17+12\sqrt2,
$$

さらに一度掛けると

$$
(17+12\sqrt2)(3+2\sqrt2)=99+70\sqrt2.
$$

確かに $17^2-2\cdot12^2=289-288=1$、$99^2-2\cdot70^2=9801-9800=1$ です。二つ目以降の解を探索する必要はなく、基本解を繰り返し掛ければ十分です。

## 5. Diophantine 近似へつなぐ

$\sqrt D$ の近似 $p/q$ を与えると、その誤差と $p^2-Dq^2$ は

$$
\left|\sqrt D-\frac pq\right|
=\frac{|p^2-Dq^2|}{q^2(\sqrt D+p/q)}
$$

で直結します。ただしこの表示では $p\ge0,q>0$ を仮定しました。Pell 解なら分子はちょうど $1$ で、二次の誤差 $O(q^{-2})$ が得られます。

一方、[収束分数の誤差評価](#thm-nt7-convergent-error)から $|\alpha-p_n/q_n|<1/q_n^2$ は任意の無理数で成立します。この基本的な仕組みの先に、無理数ごとに近似のしやすさを比較する Diophantine 近似論があります。例えばより強い指数での近似の可否や、ほとんどすべての実数の近似挙動は独立した理論的問いになります。

## 6. 演習と詳細解答

### Level A：手を動かして構成を確かめる

#### A1. 有限連分数

$43/19$ の連分数表示を求め、入れ子の形から元の分数へ戻せ。

- Level: A
- ID: NT7-A1

<!-- solution-start -->
**詳細解答**　$43=2\cdot19+5$、$19=3\cdot5+4$、$5=1\cdot4+1$、$4=4\cdot1$ なので整数部分は $2,3,1,4$ です。

$$
[2;3,1,4]=2+\frac1{3+\frac1{1+\frac14}}
=2+\frac1{3+\frac45}
=2+\frac5{19}=\frac{43}{19}.
$$
<!-- solution-end -->

#### A2. 漸化式と既約性

$[1;2,2,2]$ の全収束分数を求め、最後の二つの分子・分母の行列式を計算せよ。

- Level: A
- ID: NT7-A2

<!-- solution-start -->
**詳細解答**　[収束分数の定義](#def-nt7-convergent)で $(p_0,q_0)=(1,1)$、$(p_1,q_1)=(3,2)$、$(p_2,q_2)=(7,5)$、$(p_3,q_3)=(17,12)$ です。最後の二組の行列式は $17\cdot5-7\cdot12=85-84=1$ で、[行列式の補題](#lem-nt7-convergent-matrix)の $n=3$ の符号 $(-1)^2=1$ と一致します。$17,12$ の公約数は $1$ の約数なので最後の分数も既約です。
<!-- solution-end -->

#### A3. $\sqrt3$ の周期

$\sqrt3$ の完全商を二段先まで求め、連分数表示を書け。

- Level: A
- ID: NT7-A3

<!-- solution-start -->
**詳細解答**　$a_0=1$、$\alpha_1=1/(\sqrt3-1)=(\sqrt3+1)/2$ で $a_1=1$ です。次に

$$
\alpha_2=\frac1{(\sqrt3+1)/2-1}
=\frac2{\sqrt3-1}=\sqrt3+1,
$$

なので $a_2=2$ です。さらに $\alpha_3=1/(\sqrt3+1-2)=1/(\sqrt3-1)=\alpha_1$ に戻り、$\sqrt3=[1;\overline{1,2}]$ です。
<!-- solution-end -->

#### A4. Pell の解の検算

$(2+\sqrt3)^3$ を $x+y\sqrt3$ の形へ展開し、$x^2-3y^2=1$ を確かめよ。

- Level: A
- ID: NT7-A4

<!-- solution-start -->
**詳細解答**　$(2+\sqrt3)^2=4+4\sqrt3+3=7+4\sqrt3$ です。さらに

$$
(7+4\sqrt3)(2+\sqrt3)
=14+7\sqrt3+8\sqrt3+12
=26+15\sqrt3.
$$

$26^2-3\cdot15^2=676-675=1$ です。
<!-- solution-end -->

#### A5. 近似誤差と符号

$\sqrt2$ の収束分数 $7/5$ に対し、誤差を有理化し、$7/5$ が上下どちらから近似するか示せ。

- Level: A
- ID: NT7-A5

<!-- solution-start -->
**詳細解答**　$7^2-2\cdot5^2=-1$ より $7<5\sqrt2$、従って下からの近似です。有理化すると

$$
\sqrt2-\frac75
=\frac{(5\sqrt2)^2-7^2}{5(5\sqrt2+7)}
=\frac1{5(5\sqrt2+7)}>0.
$$

$5\sqrt2+7>12$ なのでこの誤差は $1/60$ 未満となり、[誤差定理](#thm-nt7-convergent-error)と一致します。
<!-- solution-end -->

### Level B：仮定と構成を使い分ける

#### B1. 最良近似を数値で確かめる

$\alpha=\sqrt2$、$n=1$ とする。$q=1,2,3,4$ について整数 $p$ を動かした $|q\alpha-p|$ の最小値を求め、$3/2$ の役割を説明せよ。

- Level: B
- ID: NT7-B1

<!-- solution-start -->
**詳細解答**　各 $q$ で $q\sqrt2$ の最近整数を選びます。$q=1$ は $p=1$ で $\sqrt2-1$、$q=2$ は $p=3$ で $3-2\sqrt2$、$q=3$ は $p=4$ で $3\sqrt2-4$、$q=4$ は $p=6$ で $6-4\sqrt2$ です。近似値は順に約 $0.4142,0.1716,0.2426,0.3431$ です。$\sqrt2=[1;2,2,\ldots]$ の $q_1=2$、$q_2=5$ なので、[第二種最良近似](#thm-nt7-best-approximation)により $0<q<5$ の中では $3/2$ が最小を実現します。
<!-- solution-end -->

#### B2. $D=3$ の全正整数解

$x^2-3y^2=1$ の基本解を求め、$y\le60$ を満たす正整数解をすべて列挙せよ。

- Level: B
- ID: NT7-B2

<!-- solution-start -->
**詳細解答**　$y=1$ なら $x^2=4$ なので $(2,1)$ が解です。$y\ge1$ で $x$ は $y$ とともに増えるため、$(2,1)$ が基本解です。[全解定理](#thm-nt7-pell-all-solutions)から $(2+\sqrt3)^n$ を列挙します。

$$
\begin{aligned}
(2+\sqrt3)^1&=2+\sqrt3,\\
(2+\sqrt3)^2&=7+4\sqrt3,\\
(2+\sqrt3)^3&=26+15\sqrt3,\\
(2+\sqrt3)^4&=97+56\sqrt3,\\
(2+\sqrt3)^5&=362+209\sqrt3.
\end{aligned}
$$

係数の漸化式 $x_{n+1}=2x_n+3y_n$、$y_{n+1}=x_n+2y_n$ により $y_n$ は単調増加です。従って $y\le60$ の全解は $(2,1),(7,4),(26,15),(97,56)$ です。
<!-- solution-end -->

#### B3. なぜ平方数の $D$ を除くか

$D=4$ に対して $x^2-4y^2=1$ を整数で解け。なぜ正の $y$ の解がないか、因数分解で示せ。

- Level: B
- ID: NT7-B3

<!-- solution-start -->
**詳細解答**　$(x-2y)(x+2y)=1$ です。両因子は整数で積が $1$ なので、ともに $1$ またはともに $-1$ です。前者なら二式を加減して $(x,y)=(1,0)$、後者なら $(-1,0)$ です。$y>0$ の解はありません。平方数を除く仮定がなければ[存在定理](#thm-nt7-pell-existence)は成立しないことが、この反例で確認できます。
<!-- solution-end -->

#### B4. 近似とノルムを接続する

$p/q=17/12$ について $|p/q-\sqrt2|$ を平方差から求め、$1/q^2$ より小さいことを式で証明せよ。

- Level: B
- ID: NT7-B4

<!-- solution-start -->
**詳細解答**　$17^2-2\cdot12^2=289-288=1$ なので

$$
\frac{17}{12}-\sqrt2
=\frac{17^2-2\cdot12^2}{12(17+12\sqrt2)}
=\frac1{12(17+12\sqrt2)}.
$$

$17+12\sqrt2>12$ であるため分母は $12^2$ より大きく、従って $0<17/12-\sqrt2<1/12^2$ です。符号も $17^2>2\cdot12^2$ から正と確認できます。
<!-- solution-end -->

### Level C：全解生成を証明から再現する

#### C1. $x^2-2y^2=1$ の再帰式と全解

(1) 基本解が $(3,2)$ であることを示せ。(2) $(x_n,y_n)$ が $n$ 番目の正整数解なら $(x_{n+1},y_{n+1})$ の二項漸化式を導け。(3) $n=1,2,3$ の値を求めよ。(4) その漸化式で正整数解を漏れなく生成する理由を説明せよ。

- Level: C
- ID: NT7-C1

<!-- solution-start -->
**詳細解答**　(1) $y=1$ では $x^2=3$ となり不可能です。$y=2$ では $x^2=9$ なので $(x,y)=(3,2)$ が最小の正整数解です。$y$ と $x=\sqrt{2y^2+1}$ はともに増大するので基本解です。

(2) [Pell 全解定理](#thm-nt7-pell-all-solutions)における $x_n+y_n\sqrt2=(3+2\sqrt2)^n$ の両辺へ $3+2\sqrt2$ を掛けます。

$$
\begin{aligned}
(x_n+y_n\sqrt2)(3+2\sqrt2)
&=(3x_n+4y_n)+(2x_n+3y_n)\sqrt2.
\end{aligned}
$$

係数比較で $x_{n+1}=3x_n+4y_n$、$y_{n+1}=2x_n+3y_n$、初期値 $(x_1,y_1)=(3,2)$ です。

(3) $n=2$ では $(x_2,y_2)=(3\cdot3+4\cdot2,\ 2\cdot3+3\cdot2)=(17,12)$、$n=3$ では $(x_3,y_3)=(3\cdot17+4\cdot12,\ 2\cdot17+3\cdot12)=(99,70)$ です。$17^2-2\cdot12^2=1$、$99^2-2\cdot70^2=1$ と検算できます。

(4) $3+2\sqrt2$ は最小の $1$ より大きいノルム $1$ の整数係数の数です。別の正整数解 $\delta$ を取れば、一意の $n$ について $(3+2\sqrt2)^n\le\delta<(3+2\sqrt2)^{n+1}$ です。$\delta(3-2\sqrt2)^n$ は係数が整数、ノルム $1$、値が $1$ 以上で基本解未満です。$1$ でなければ基本解の最小性に反するので、$\delta=(3+2\sqrt2)^n$ に限られます。これにより漏れがありません。
<!-- solution-end -->

## 7. 学んだ道具を次に使う

連分数は無理数を小さい分母で近似する手続きであり、Pell 方程式は近似誤差が整数係数のノルム $1$ に達したときの構造を教えます。合同条件や二平方和だけでは見えなかった**無限解の生成**が可能になりました。次章では素数の個数を数える関数を導入し、整数の分布を定量的に問います。
