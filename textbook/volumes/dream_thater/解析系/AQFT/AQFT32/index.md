# AQFT32 相対エントロピーの正値性

[AQFT31で構成した非忠実状態の相対エントロピー](../AQFT31/index.md#def-aqft31-relative-entropy-extended)は、二状態の違いを実数または $+\infty$ で表します。しかし定義の先頭に負号があるだけでは、その値が負にならないことも、値が0となるのが同一状態に限られることも分かりません。有限行列のトレース計算を局所Type III環へ移すことはできないので、**相対モジュラー作用素のスペクトル測度**から直接証明します。

本講で使うのは、正規状態の支持射影、反線形な相対Tomita作用素、非負自己共役作用素のスペクトル測度、そして一変数の対数不等式です。まず可換な二点模型で不等式の意味を確認し、次に一般のvon Neumann環で証明します。最後に作用素凸性との関係と、次講の部分環への制限で何が追加で必要になるかを区別します。対数は自然対数です。

## 1. 正値性を生む一変数不等式

確率 $p_1,p_2>0$、$q_1,q_2>0$ をそれぞれ和1で選びます。可換二点環では相対モジュラー作用素の固有値は $q_j/p_j$、その入力重みは $p_j$ です。[AQFT30の可換模型とスペクトル表示](../AQFT30/index.md#def-aqft30-araki-relative-entropy)を用いると、例えば

$$
p=(3/4,1/4),\qquad q=(1/2,1/2)
$$

の場合、固有値は $2/3,2$、重みは $3/4,1/4$ です。固有値の平均は

$$
\frac34\frac23+\frac14\,2=1,
$$

相対エントロピーは

$$
-\frac34\log\frac23-\frac14\log2
=\frac34\log3-\log2>0
$$

となります。正の固有値には1を超えるものもあるため、各項 $-\log\lambda$ がすべて非負であるわけではありません。**重みを付けた総和**の非負性を保証する道具が必要です。

以下で使う「対数の接線不等式」は、$\log$ が厳密に凹であることの具体形です。

<a id="lem-aqft32-log-tangent"></a>

<!-- formal-statement-start -->
> **補題（対数の接線不等式と等号）**  
> すべての実数 $t>0$ に対し、
>
$$
-\log t\ge 1-t
$$
>
> が成立する。等号は $t=1$ の場合に限る。さらに $g(t)=t-1-\log t$ は非負で、$g(t)=0$ は $t=1$ と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\log t$ と、点 $t=1$ での接線 $t-1$ を比較します。等号条件も微分で確定させます。

<!-- proof-start -->
### 証明

$t>0$ に対して $g(t)=t-1-\log t$ と置くと

$$
g'(t)=1-\frac1t=\frac{t-1}{t},
\qquad
g''(t)=\frac1{t^2}>0.
$$

従って $g$ は $(0,1)$ 上で減少し $(1,\infty)$ 上で増加します。唯一の極小点は $t=1$ であり、$g(1)=1-1-\log1=0$ です。ゆえに $g(t)\ge0$、等号は $t=1$ に限ります。
<!-- proof-end -->

## 2. 任意の正規状態でスペクトルの一次モーメントを抑える

$\mathcal M$ を単位的von Neumann環とし、$\rho,\sigma$ をその正規状態とします。標準形の自然正錐代表を単位ベクトル $\xi_\rho,\xi_\sigma$ とします。$\Delta=\Delta_{\sigma\mid\rho}$ は[AQFT31の支持付き相対Tomita作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)から作った非負自己共役作用素で、そのスペクトル射影を $E_\Delta(B)$ とします。

入力ベクトルのスペクトル測度は、Borel集合 $B\subset[0,\infty)$ に対して

$$
\mu_\rho(B)=\langle\xi_\rho,E_\Delta(B)\xi_\rho\rangle
=\|E_\Delta(B)\xi_\rho\|^2
$$

です。$\|\xi_\rho\|=1$ だから $\mu_\rho([0,\infty))=1$ で、これは確率測度です。対数の積分が存在するかを調べる前に、一次モーメントを計算します。

<a id="lem-aqft32-first-moment"></a>

<!-- formal-statement-start -->
> **補題（相対スペクトル測度の一次モーメント）**  
> $\mathcal M$ 上の任意の正規状態 $\rho,\sigma$ について、$p=s(\rho)$ とすると
>
$$
\int_{[0,\infty)}\lambda\,d\mu_\rho(\lambda)
=\sigma(p)\le1.
$$
>
> 特に $\rho,\sigma$ がともに忠実なら一次モーメントは1である。一般の非忠実状態では1より小さい場合がある。
<!-- formal-statement-end -->

### 証明の見取り図

[AQFT31の支持付き相対Tomita作用素の定義](../AQFT31/index.md#def-aqft31-relative-tomita-supported)に $A=1$ を代入します。定義域の問題を避けるため、非有界な $\Delta$ 自体を直接ベクトルに作用させるのでなく、その平方根のノルムを用います。

<!-- proof-start -->
### 証明

$p=s_{\mathcal M}(\xi_\rho)$、$q=s_{\mathcal M'}(\xi_\rho)$ と置きます。$\xi_\rho=1\xi_\rho\in\mathcal M\xi_\rho$ なので $\xi_\rho$ は初期作用素 $S_{\sigma\mid\rho,0}$、従ってその閉包 $S$ の定義域に入ります。初期作用素の式に $A=1$ と $\zeta=0$ を代入すると

$$
S\xi_\rho=p\,1^*\xi_\sigma=p\xi_\sigma.
$$

[相対モジュラー作用素](../AQFT29/index.md#def-aqft29-relative-modular)の平方根ノルム等式により $\operatorname{Dom}\Delta^{1/2}=\operatorname{Dom}S$ かつ

$$
\int_{[0,\infty)}\lambda\,d\mu_\rho(\lambda)
=\|\Delta^{1/2}\xi_\rho\|^2
=\|S\xi_\rho\|^2.
$$

$p$ は直交射影なので $p=p^*=p^2$ です。したがって

$$
\|p\xi_\sigma\|^2
=\langle\xi_\sigma,p\xi_\sigma\rangle
=\sigma(p)\le\sigma(1)=1.
$$

最後の不等号は $0\le p\le1$ と状態の正値性によります。もし $\rho$ が忠実なら[支持射影の特徴付け](../AQFT31/index.md#def-aqft31-support)から $p=1$ で、等号が成立します。
<!-- proof-end -->

### 直接計算：非忠実な二準位状態

以下の二準位例では、$e_1,e_2$ を $\mathbb C^2$ の標準正規直交基底、$E_{ij}=|e_i\rangle\langle e_j|$ を行列単位とします（[AQFT31での行列単位と支持付き作用素の確認](../AQFT31/index.md#def-aqft31-relative-tomita-supported)）。入力を $\rho=|e_1\rangle\langle e_1|$、比較相手を $\sigma=I_2/2$ とします。$\rho,\sigma$ はそれぞれ正半定値・トレース1ですが、$\rho$ は非忠実です。支持は $p=|e_1\rangle\langle e_1|$ なので

$$
\sigma(p)=\operatorname{Tr}(\sigma p)=\frac12.
$$

[AQFT31の有限行列の相対作用素](../AQFT31/index.md#thm-aqft31-finite-modular)では、入力 $\rho^{1/2}=E_{11}$ は固有値 $1/2$ に重み1を持ちます。従って直接にも $\int\lambda\,d\mu_\rho=1/2$ です。「正規状態だから一次モーメントは常に1」という推論は誤りです。

## 3. Araki相対エントロピーの正値性と零条件

[AQFT31の拡張定義](../AQFT31/index.md#def-aqft31-relative-entropy-extended)では、$s(\rho)\nleq s(\sigma)$ のとき相対エントロピーは $+\infty$ です。支持包含が成立するとき、入力の零固有値重みが消え、正スペクトル上の $-\log\lambda$ を $\mu_\rho$ で積分できます。ただし、正の固有値が0へ近付くため値はなお $+\infty$ になり得ます。

まず積分の等号条件を途中で失わないため、接線との差を一つの式にします。$\mu_\rho(\{0\})=0$ の場合、[対数の接線不等式と等号](#lem-aqft32-log-tangent)から $g\ge0$ です。また[相対スペクトル測度の一次モーメント](#lem-aqft32-first-moment)から次の等式が従います。

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-\int_{(0,\infty)}\log\lambda\,d\mu_\rho(\lambda)\\
&=1-\sigma(s(\rho))
+\int_{(0,\infty)}
\bigl(\lambda-1-\log\lambda\bigr)\,d\mu_\rho(\lambda).
\end{aligned}
$$

この恒等式は値が $+\infty$ でも成立します。実際、$\int\lambda\,d\mu_\rho\le1$ から $\int|1-\lambda|\,d\mu_\rho<\infty$ であり、最後の積分の integrand は非負なので拡張実数の加算が定義できます。対数の正部分は $\log^+\lambda\le\lambda$ で積分可能です。

<a id="thm-aqft32-positivity-rigidity"></a>

<!-- formal-statement-start -->
> **定理（正規状態のAraki相対エントロピーの正値性・零条件）**  
> $\mathcal M$ を任意の単位的von Neumann環とし、$\rho,\sigma$ をその正規状態とする。[AQFT31で定義した拡張Araki相対エントロピー](../AQFT31/index.md#def-aqft31-relative-entropy-extended)は
>
$$
0\le S_{\mathrm A}(\rho\Vert\sigma)\le+\infty
$$
>
> を満たし、次が同値である。
>
$$
S_{\mathrm A}(\rho\Vert\sigma)=0
\quad\Longleftrightarrow\quad
\rho=\sigma.
$$
>
> $\rho=\sigma$ は、すべての $A\in\mathcal M$ に対して $\rho(A)=\sigma(A)$ となることを意味する。有限次元性、トレース、Type I性、両状態の忠実性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

正値性は、対数の接線不等式を確率測度で積分して得ます。零になるなら二つの非負項が両方零でなければならず、スペクトル測度は固有値1に集中します。その後、反線形作用素の随伴関係を使って任意の $A\in\mathcal M$ に対する両状態の期待値が一致することを示します。逆向きも支持付き作用素の定義へ戻って証明します。

<!-- proof-start -->
### 証明

**（I）正値性。** $s(\rho)\nleq s(\sigma)$ なら定義により $S_{\mathrm A}=+\infty$ で、主張は成立します。以下、$s(\rho)\le s(\sigma)$ とします。[支持と零重みの判定](../AQFT31/index.md#def-aqft31-relative-entropy-extended)により $\mu_\rho(\{0\})=0$ です。上の分解の第1項は $1-\sigma(s(\rho))\ge0$、第2項の被積分関数も[対数の接線不等式と等号](#lem-aqft32-log-tangent)により非負です。ゆえに $S_{\mathrm A}\ge0$ です。一般の正規状態にしか用いていないので、Type III環でも成立します。

**（II）零なら状態が等しい。** $S_{\mathrm A}=0$ と仮定します。分解の二つの非負項はそれぞれ0なので

$$
\sigma(p)=1,\quad
\int g(\lambda)\,d\mu_\rho(\lambda)=0,
\qquad p=s(\rho).
$$

$g(\lambda)>0$ は $\lambda\ne1$ のすべての正の点で成立します。非負関数の積分が零ならその関数はほとんど至る所零なので、$\mu_\rho(\{1\})=1$ です。[AQFT30の相対スペクトル測度の構成](../AQFT30/index.md#def-aqft30-araki-relative-entropy)で用いた非負自己共役作用素の関数計算から

$$
E_\Delta(\{1\})\xi_\rho=\xi_\rho,\qquad
\xi_\rho\in\operatorname{Dom}\Delta,\qquad
\Delta\xi_\rho=\xi_\rho.
$$

一方 $\sigma(p)=1$ なら

$$
\|(1-p)\xi_\sigma\|^2=\sigma(1-p)=0,
\qquad p\xi_\sigma=\xi_\sigma.
$$

[支持付き相対Tomita作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)の定義を使うと、任意の $A\in\mathcal M$ に対し

$$
S\xi_\rho=p\xi_\sigma=\xi_\sigma,\qquad
S(A\xi_\rho)=pA^*\xi_\sigma.
$$

ここで $S$ は反線形、$\Delta=S^\sharp S$ は非負自己共役です。[反線形随伴の関係](../AQFT29/index.md#def-aqft29-relative-modular)を $x=\xi_\rho\in\operatorname{Dom}\Delta$ と $y=A\xi_\rho\in\operatorname{Dom}S$ に使います。内積は第2変数線形なので

$$
\begin{aligned}
\rho(A)
&=\langle\xi_\rho,A\xi_\rho\rangle\\
&=\langle\Delta\xi_\rho,A\xi_\rho\rangle\\
&=\langle S(A\xi_\rho),S\xi_\rho\rangle\\
&=\langle pA^*\xi_\sigma,\xi_\sigma\rangle\\
&=\langle A^*\xi_\sigma,p\xi_\sigma\rangle\\
&=\langle A^*\xi_\sigma,\xi_\sigma\rangle
=\langle\xi_\sigma,A\xi_\sigma\rangle=\sigma(A).
\end{aligned}
$$

従ってすべての $A$ で値が等しく、状態 $\rho=\sigma$ です。ここでは相対モジュラー共役が一般の $J$ に等しいとの未証明の主張を使っていません。

**（III）状態が等しければ零。** $\rho=\sigma$ とし、$p=s(\rho)$、$q=s_{\mathcal M'}(\xi_\rho)$ を置きます。[支持付き定義](../AQFT31/index.md#def-aqft31-relative-tomita-supported)によれば

$$
S\xi_\rho=p\xi_\rho=\xi_\rho.
$$

さらに初期定義域 $D_0=\mathcal M\xi_\rho\oplus(1-q)\mathcal H$ の任意の $y=A\xi_\rho+\zeta$ について

$$
\begin{aligned}
\langle Sy,S\xi_\rho\rangle
&=\langle pA^*\xi_\rho,\xi_\rho\rangle\\
&=\langle A^*\xi_\rho,\xi_\rho\rangle\\
&=\langle\xi_\rho,A\xi_\rho\rangle
=\langle\xi_\rho,y\rangle.
\end{aligned}
$$

最後の等式では $q\xi_\rho=\xi_\rho$ と $\zeta\perp q\mathcal H$ を使いました。$D_0$ は $S$ のグラフで稠密であり、両辺は $y$ と $Sy$ の極限で連続なので、等式は $\operatorname{Dom}S$ 全体に延長されます。反線形随伴の定義により $S\xi_\rho\in\operatorname{Dom}S^\sharp$ かつ $S^\sharp S\xi_\rho=\xi_\rho$、すなわち

$$
\Delta\xi_\rho=\xi_\rho.
$$

したがって $\mu_\rho=\delta_1$ であり、$\rho=\sigma$ の支持は一致するので

$$
S_{\mathrm A}(\rho\Vert\rho)
=-\int\log\lambda\,d\delta_1(\lambda)
=-\log1=0.
$$

逆向きも一般の非忠実正規状態に対して証明できました。
<!-- proof-end -->

### 二つの非負項は何を測るか

証明で得た分解

$$
S_{\mathrm A}(\rho\Vert\sigma)
=\underbrace{1-\sigma(s(\rho))}_{\text{入力支持の外にある比較相手の重み}}
+\underbrace{\int g(\lambda)\,d\mu_\rho(\lambda)}_{\text{相対スペクトルが1から離れる量}}
$$

は、正値性の原因を二段階に分けます。支持が含まれない場合は値が無限になり得るため、この有限な分解は支持包含がある場合に読む式です。二つの項が同時に消えることが、零値のための条件です。片方だけでは不十分です。

## 4. 作用素凸性との関係を区別する

これまでに必要だったのは**スカラー関数**の接線不等式です。比較した作用素が可換であるという仮定は一度も置きませんでした。次講の部分環制限を考えるときには、行列や作用素の順序を保ちながら平均を取る問題が現れます。その準備として、別のより強い性質を証明します。

同じHilbert空間 $\mathcal H$ 上の**有界自己共役作用素** $X,Y$ について、$X\le Y$ とは、すべての $v\in\mathcal H$ で $\langle v,Xv\rangle\le\langle v,Yv\rangle$ が成り立つことを意味します（Löwner順序）。非有界作用素では二次形式の定義域の指定が別に必要なので、以下の作用素凸性の議論は有界作用素に限定します。$f$ が**作用素凸**であるとは、任意の同じHilbert空間上の有界・正定値自己共役作用素 $A,B$ と $0\le\theta\le1$ に対して

$$
f((1-\theta)A+\theta B)
\le(1-\theta)f(A)+\theta f(B)
$$

がこの順序で成り立つことです。作用素関数 $f(A)$ はスペクトル計算で定義します。

<a id="def-aqft32-operator-convex"></a>

<!-- formal-statement-start -->
> **定義（正の作用素上の作用素凸関数）**  
> $f:(0,\infty)\to\mathbb R$ を連続関数とする。すべてのHilbert空間上の有界で下から正数で抑えられた自己共役作用素 $A,B$ と $0\le\theta\le1$ に対し
>
$$
f((1-\theta)A+\theta B)
\le(1-\theta)f(A)+\theta f(B)
$$
>
> が作用素の非負順序で成立するとき、$f$ を $(0,\infty)$ 上の作用素凸関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft32-operator-convex -->
### 直接例：可換な二行列で定義の不等式を確認する

$A=\operatorname{diag}(1,4)$、$B=\operatorname{diag}(4,1)$、$\theta=1/2$、$f(t)=-\log t$ とします。$A,B$ は正定値・有界で、$0\le\theta\le1$ です。ここで行列は $\mathbb C^2$ の標準正規直交基底 $e_1,e_2$ による作用素表示です。$P_j=|e_j\rangle\langle e_j|$ とすると

$
A=P_1+4P_2,\qquad B=4P_1+P_2,\qquad
(A+B)/2=\tfrac52(P_1+P_2).
$

スペクトル計算は各固有空間に関数値を掛ける操作です。例えば任意の $v=v_1e_1+v_2e_2$ に対し
$f(A)v=f(1)v_1e_1+f(4)v_2e_2$ となるので、

$
\begin{aligned}
f((A+B)/2)&=-\log(5/2)\,I_2,\\
\bigl(f(A)+f(B)\bigr)/2&=-\log2\,I_2.
\end{aligned}
$

定義の作用素順序を判定するため、右辺から左辺を引いて $D=\log(5/4)I_2$ を作ります。任意の $v\in\mathbb C^2$ について

$
\langle v,Dv\rangle=\log(5/4)(|v_1|^2+|v_2|^2)\ge0
$

なので $D\ge0$、すなわちこの組では作用素凸性の不等式が成立します。ただし一つの可換な例だけでは、非可換な任意の $A,B$ に対する定義を証明したことにはなりません。

**定義の確認**：入力の正定値性・有界性、凸結合の係数範囲、作用素順序の差の非負性を具体的に検査しました。
<!-- definition-example-end -->

<a id="lem-aqft32-operator-log-convex"></a>

<!-- formal-statement-start -->
> **補題（負の対数の作用素凸性）**  
> $f(t)=-\log t$ は $(0,\infty)$ 上で作用素凸である。すなわち、有界で厳密に正な自己共役作用素 $A,B$ と $0\le\theta\le1$ について
>
$$
-\log((1-\theta)A+\theta B)
\le-(1-\theta)\log A-\theta\log B
$$
>
> が成立する。$A$ と $B$ の可換性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

対数を正の逆作用素の積分として表します。逆作用素の凸性を、二次形式の平方完成から示せば、非可換な作用素についても結論を積分で得られます。

<!-- proof-start -->
### 証明

まずHilbert空間 $\mathcal H$ 上の有界自己共役作用素 $T\ge cI$（$c>0$）と、任意の $x,y\in\mathcal H$ に対して、平方完成から

$$
\begin{aligned}
&2\operatorname{Re}\langle x,y\rangle
-\langle y,Ty\rangle\\
&=\langle x,T^{-1}x\rangle
-\|T^{1/2}y-T^{-1/2}x\|^2.
\end{aligned}
$$

従って右辺を $y$ について上限にすると

$$
\langle x,T^{-1}x\rangle
=\sup_{y\in\mathcal H}\left\{
2\operatorname{Re}\langle x,y\rangle-\langle y,Ty\rangle
\right\}.
$$

平方項は $y=T^{-1}x$ で零になり、この上限は実際に達成されます。$C=(1-\theta)A+\theta B$ とします。括弧内の式は $T$ に関してアフィンなので、共通の $y$ で取る上限は $A,B$ それぞれ独立に $y$ を選んだ上限の重み付き和以下です。従って

$$
\begin{aligned}
\langle x,C^{-1}x\rangle
&\le(1-\theta)\langle x,A^{-1}x\rangle\\
&\quad+\theta\langle x,B^{-1}x\rangle.
\end{aligned}
$$

すべての $x$ で成立するので $C^{-1}\le(1-\theta)A^{-1}+\theta B^{-1}$ です。これを $A+sI,B+sI$（$s\ge0$）へ適用します。

次に実数 $t>0$ の積分公式

$$
-\log t=\int_0^\infty
\left(\frac1{t+s}-\frac1{1+s}\right)\,ds
$$

は、右辺を $s=0$ から $R$ まで積分すると

$$
\log\frac{t+R}{1+R}-\log t\longrightarrow-\log t
\quad(R\to\infty)
$$

となることで確かめられます。有界で下から正に抑えられた作用素 $T$ ではスペクトルがコンパクトな正区間内にあるため、この収束はスペクトル上一様で、関数計算へ移せます。従って

$$
-\log T=\int_0^\infty
\bigl((T+sI)^{-1}-(1+s)^{-1}I\bigr)\,ds
$$

が作用素ノルムで成立します。各 $s$ の逆作用素不等式を積分すると、定数項は係数 $(1-\theta)+\theta=1$ により一致し、目的の $-\log C\le(1-\theta)(-\log A)+\theta(-\log B)$ が従います。
<!-- proof-end -->

**射程の注意。** この補題は有界で下から正に抑えられた作用素を入力とする作用素凸性を完全に証明しました。一方、一般の相対モジュラー作用素は非有界で核も持ち得ます。本講の一般正値性の証明は作用素凸性を非有界作用素へ無条件に適用していません。また、作用素凸性だけから部分環への単調性を一行で結論することもできません。部分環に伴う収縮写像と作用素比較の準備はAQFT33の課題です。

## 5. 支持と極限を取り違えない

[AQFT31の支持判定](../AQFT31/index.md#prop-aqft31-support-criterion)と[非忠実有限次元の公式](../AQFT31/index.md#thm-aqft31-nonfaithful-reduction)を利用すると、三準位の可換例を直接検査できます。

$$
\rho=\operatorname{diag}(1/2,1/2,0),\qquad
\sigma=\operatorname{diag}(1/4,1/2,1/4).
$$

両行列は正半定値・トレース1であり、$s(\rho)\le s(\sigma)=I_3$ です。入力の正重みは第1、第2成分のそれぞれ $1/2$ で、相対固有値は $1/2,1$ です。従って

$$
S_{\mathrm A}(\rho\Vert\sigma)
=-\frac12\log\frac12-\frac12\log1
=\frac12\log2>0.
$$

一次モーメントは $\frac12\cdot\frac12+\frac12\cdot1=3/4=\sigma(s(\rho))$ です。入力の第3成分が零であるため、$\sigma$ が第3成分に持つ重み $1/4$ が一次モーメントに入らず、値は1に達しません。

逆に $\rho=\operatorname{diag}(1,0)$、$\sigma=\operatorname{diag}(0,1)$ とすると、支持包含が破れ $\mu_\rho(\{0\})=1$ です。[AQFT31のスペクトル切断の定義](../AQFT31/index.md#def-aqft31-relative-entropy-extended)による値は $+\infty$。核の零固有値を「積分から捨てて0」としてしまうと、正値性だけは偶然保てても零条件が破綻します。

一般に $s(\rho)\le s(\sigma)$ だけでは有限値は保証されません。[AQFT31の可換無限系の例](../AQFT31/index.md#def-aqft31-relative-entropy-extended)では両支持が1でも $\sum_n p_n\log(p_n/q_n)=+\infty$ です。そこで本講の定理は相対エントロピーの**値域を $[0,+\infty]$ としたうえで**証明されています。一般環における状態の忠実化極限を有限次元の極限と取り違えないことも重要です。

## 6. 演習と詳細解答

### Level A：接線・支持・零条件

<a id="ex-aqft32-a01"></a>
#### AQFT32-A01 対数の接線と等号
- Level: A

$t=1/2,1,2$ で $g(t)=t-1-\log t$ の値を求め、零となる $t$ とその理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 定義へ順に代入すると

$$
\begin{aligned}
g(1/2)&=-\frac12+\log2>0,\\
g(1)&=0,\\
g(2)&=1-\log2>0.
\end{aligned}
$$

$\log2>1/2$ は $\log2=\int_1^2t^{-1}dt>\int_1^2(1/2)\,dt=1/2$ から、$\log2<1$ は $t^{-1}<1$（$t>1$）の積分から確かめられます。[接線補題](#lem-aqft32-log-tangent)では $g'(t)<0$（$t<1$）、$g'(t)>0$（$t>1$）なので、一般に零点は $t=1$ だけです。
<!-- solution-end -->

<a id="ex-aqft32-a02"></a>
#### AQFT32-A02 忠実な可換二点模型
- Level: A

$p=(3/4,1/4)$、$q=(1/2,1/2)$ について、相対固有値・入力重み・一次モーメント・相対エントロピーを順に求めよ。

<!-- solution-start -->
**詳細解答。** 各比を $q_j/p_j$ と取ると $2/3,2$、重みは $3/4,1/4$ です。[一次モーメント補題](#lem-aqft32-first-moment)と直接和から

$$
\frac34\frac23+\frac14\,2
=\frac12+\frac12=1.
$$

[AQFT30のスペクトル表示](../AQFT30/index.md#def-aqft30-araki-relative-entropy)を使い

$$
\begin{aligned}
S_{\mathrm A}(p\Vert q)
&=-\frac34\log\frac23-\frac14\log2\\
&=\frac34\log3-\log2.
\end{aligned}
$$

$q/p$ の二つの値が1以外なので[接線補題](#lem-aqft32-log-tangent)の等号条件は破れ、正値性定理から厳密に正です。
<!-- solution-end -->

<a id="ex-aqft32-a03"></a>
#### AQFT32-A03 非忠実な入力と一次モーメント
- Level: A

$\rho=\operatorname{diag}(1,0)$、$\sigma=I_2/2$ とする。支持と相対作用素の入力重みを確かめ、一次モーメントと相対エントロピーを求めよ。

<!-- solution-start -->
**詳細解答。** $s(\rho)=E_{11}$、$s(\sigma)=I_2$ で支持包含が成立します。[AQFT31の有限行列定理](../AQFT31/index.md#thm-aqft31-finite-modular)では $\Delta(X)=\frac12XE_{11}$、入力 $\xi_\rho=E_{11}$ に固有値 $1/2$ の重み1があります。ゆえに

$$
\int\lambda\,d\mu_\rho=\frac12
=\operatorname{Tr}\sigma E_{11},\qquad
S_{\mathrm A}(\rho\Vert\sigma)=-\log\frac12=\log2.
$$

非忠実な入力ではモーメントが1未満でもよく、正値性に矛盾はありません。
<!-- solution-end -->

<a id="ex-aqft32-a04"></a>
#### AQFT32-A04 同一の純粋状態
- Level: A

$\rho=\sigma=E_{11}$ を二準位系で取る。$\Delta_{\rho\mid\rho}$ が全行列空間上の恒等作用素でないこと、しかし $S_{\mathrm A}(\rho\Vert\rho)=0$ であることを示せ。

<!-- solution-start -->
**詳細解答。** $\rho^+=E_{11}$ です。[非忠実有限行列の相対モジュラー作用素](../AQFT31/index.md#thm-aqft31-finite-modular)により $\Delta(X)=E_{11}XE_{11}$ なので、$\Delta(E_{11})=E_{11}$、$\Delta(E_{12})=\Delta(E_{21})=\Delta(E_{22})=0$ です。従って $\Delta\ne I$。しかし $\xi_\rho=E_{11}$ は固有値1のベクトルなので、入力測度は $\delta_1$ です。支持は等しく

$$
S_{\mathrm A}(\rho\Vert\rho)=-\int\log\lambda\,d\delta_1=-\log1=0.
$$

零値に必要なのは $\Delta=I$ ではなく、**入力に関するスペクトル重みが1に集中すること**です。
<!-- solution-end -->

### Level B：一般証明の再構成と非可換模型

<a id="ex-aqft32-b01"></a>
#### AQFT32-B01 任意の正規状態のモーメント
- Level: B

一般の標準形で $p=s(\rho)$、$S_{\sigma\mid\rho,0}(A\xi_\rho+\zeta)=pA^*\xi_\sigma$ とする。$\int\lambda\,d\mu_\rho=\sigma(p)\le1$ を、定義域の確認から証明せよ。$\rho$ が忠実なら何が変わるか。

<!-- solution-start -->
**詳細解答。** $\xi_\rho=1\xi_\rho$ だから初期定義域に入り、$S\xi_\rho=p\xi_\sigma$ です。[相対モジュラー作用素](../AQFT29/index.md#def-aqft29-relative-modular)の平方根ノルム等式により $\xi_\rho\in\operatorname{Dom}\Delta^{1/2}$ であり、[AQFT30の相対スペクトル測度の構成](../AQFT30/index.md#def-aqft30-araki-relative-entropy)と非負自己共役作用素の関数計算から

$$
\int\lambda\,d\mu_\rho
=\|\Delta^{1/2}\xi_\rho\|^2
=\|p\xi_\sigma\|^2
=\langle\xi_\sigma,p\xi_\sigma\rangle
=\sigma(p)\le1.
$$

最後は射影 $0\le p\le1$ と $\sigma(1)=1$ を使いました。$\rho$ が忠実なら[支持射影の特徴付け](../AQFT31/index.md#def-aqft31-support)で $p=1$ となり、等号が成立します。$\sigma$ の忠実性だけでは $p=1$ は保証されません。
<!-- solution-end -->

<a id="ex-aqft32-b02"></a>
#### AQFT32-B02 零条件の作用素論的証明
- Level: B

$s(\rho)\le s(\sigma)$ と $S_{\mathrm A}(\rho\Vert\sigma)=0$ を仮定する。$\mu_\rho=\delta_1$、$\sigma(s(\rho))=1$ を導き、反線形随伴の関係から任意の $A\in\mathcal M$ に $\rho(A)=\sigma(A)$ を証明せよ。

<!-- solution-start -->
**詳細解答。** [対数の接線不等式と等号](#lem-aqft32-log-tangent)を適用します。また[相対スペクトル測度の一次モーメント](#lem-aqft32-first-moment)を代入すると

$$
0=1-\sigma(p)+\int g(\lambda)\,d\mu_\rho,\qquad p=s(\rho).
$$

二項とも非負なので $\sigma(p)=1$、$g=0$ が $\mu_\rho$ ほとんど至る所で成立します。$g(t)$ の唯一の零点は1で、零スペクトルの質量も0ですから $\mu_\rho=\delta_1$。スペクトル定理で $\Delta\xi_\rho=\xi_\rho$ です。また $\sigma(1-p)=0$ により $p\xi_\sigma=\xi_\sigma$。

$A\xi_\rho$ は[支持付き相対Tomita作用素](../AQFT31/index.md#def-aqft31-relative-tomita-supported)の定義域にあり、$S(A\xi_\rho)=pA^*\xi_\sigma$、$S\xi_\rho=\xi_\sigma$。反線形随伴から

$$
\begin{aligned}
\rho(A)
&=\langle\Delta\xi_\rho,A\xi_\rho\rangle
=\langle S(A\xi_\rho),S\xi_\rho\rangle\\
&=\langle pA^*\xi_\sigma,\xi_\sigma\rangle
=\langle\xi_\sigma,A\xi_\sigma\rangle
=\sigma(A).
\end{aligned}
$$

$A$ は任意なので状態が一致します。途中で $\rho,\sigma$ の有限次元表示を仮定していません。
<!-- solution-end -->

<a id="ex-aqft32-b03"></a>
#### AQFT32-B03 非可換二準位の正値性を二経路で検証
- Level: B

$\rho=E_{11}$、$\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ とする。両状態の正値性・支持包含・非可換性を確認し、入力スペクトルから $S_{\mathrm A}$ と接線分解の二項を求めよ。

<!-- solution-start -->
**詳細解答。** $\rho$ の固有値は1,0、$\sigma$ の固有値は $3/4,1/4$ で、ともに非負・トレース1です。$\sigma$ は忠実なので $s(\rho)\le s(\sigma)$。交換子は

$$
[\rho,\sigma]=
\begin{pmatrix}0&1/4\\-1/4&0\end{pmatrix}\ne0.
$$

$\sigma$ の固有ベクトル $u_\pm=(e_1\pm e_2)/\sqrt2$ に対し、$\rho$ の入力ベクトル $E_{11}$ の重みはそれぞれ $|\langle u_\pm,e_1\rangle|^2=1/2$ です。[有限相対作用素のスペクトル公式](../AQFT31/index.md#thm-aqft31-finite-modular)で固有値は $3/4,1/4$ となり

$$
S_{\mathrm A}
=-\frac12\log\frac34-\frac12\log\frac14
=\log\frac4{\sqrt3}.
$$

一方、$p=E_{11}$ なので $\sigma(p)=1/2$。接線の差 $g(t)=t-1-\log t$ の期待値は

$$
\begin{aligned}
\int g\,d\mu_\rho
&=\tfrac12g(3/4)+\tfrac12g(1/4)\\
&=\tfrac12(3/4+1/4)-1
-\tfrac12\log\frac34-\tfrac12\log\frac14\\
&=-\frac12+\log\frac4{\sqrt3}.
\end{aligned}
$$

従って $1-\sigma(p)+\int g\,d\mu_\rho=\frac12-\frac12+\log(4/\sqrt3)$ となり一致します。非可換でも相対密度行列を無理に同時対角化する必要はありません。
<!-- solution-end -->

<a id="ex-aqft32-b04"></a>
#### AQFT32-B04 負の対数の作用素凸性
- Level: B

有界な正定値作用素 $A,B$、$0\le\theta\le1$ に対して $-\log((1-\theta)A+\theta B)\le-(1-\theta)\log A-\theta\log B$ を、逆作用素の変分表示と積分表示から証明せよ。単なるスカラーJensenとの違いも述べよ。

<!-- solution-start -->
**詳細解答。** $T\ge cI$（$c>0$）と $x\in\mathcal H$ を固定します。任意の $y\in\mathcal H$ について平方完成し、$y=T^{-1}x$ で平方項が零になることから

$$
\langle x,T^{-1}x\rangle
=\sup_{y\in\mathcal H}\bigl(2\operatorname{Re}\langle x,y\rangle-\langle y,Ty\rangle\bigr)
$$

です。$C=(1-\theta)A+\theta B$ を代入すると括弧内が重み付き和になります。一つの $y$ で取る上限は、$A$ と $B$ に別々の $y$ を選べる上限以下なので

$$
\langle x,C^{-1}x\rangle
\le(1-\theta)\langle x,A^{-1}x\rangle
+\theta\langle x,B^{-1}x\rangle.
$$

任意の $x$ について成り立ち、$C^{-1}\le(1-\theta)A^{-1}+\theta B^{-1}$。$A+sI,B+sI$ へ適用し、

$$
-\log T=\int_0^\infty
\bigl((T+sI)^{-1}-(1+s)^{-1}I\bigr)\,ds
$$

を各項へ代入します。正の下限があるので積分は作用素ノルムで収束します。各 $s$ の作用素不等式を積分し、定数項の係数和が1であることを使うと主張の不等式です。[本章の作用素凸性補題](#lem-aqft32-operator-log-convex)と同じく、$A$ と $B$ の交換関係は一度も使いません。スカラーJensenは一つの確率分布に数値を代入する主張ですが、ここでは**全ベクトルに対する二次形式の順序**を証明しました。
<!-- solution-end -->

### Level C：無限次元への論理と極限を統合する

<a id="ex-aqft32-c01"></a>
#### AQFT32-C01 三準位のギャップと零値の一般証明
- Level: C

$\rho=\operatorname{diag}(1/2,1/2,0)$、$\sigma=\operatorname{diag}(1/4,1/2,1/4)$ について、相対スペクトルと接線分解から正値性を検算せよ。次に一般の単位的von Neumann環で $S_{\mathrm A}(\rho\Vert\sigma)=0$ と仮定し、どの段階で状態の一致まで導けるかを論証せよ。

<!-- solution-start -->
**詳細解答。** 三準位では両状態が正半定値・トレース1であり、$s(\rho)=\operatorname{diag}(1,1,0)\le s(\sigma)=I_3$ です。入力のスペクトル測度は固有値 $1/2$ と1にそれぞれ重み $1/2$、従って

$$
\begin{aligned}
S_{\mathrm A}&=\tfrac12\log2,\\
m&=\tfrac12\cdot\tfrac12+\tfrac12\cdot1=\tfrac34,\\
\int g\,d\mu_\rho
&=\tfrac12(\tfrac12-1+\log2)+\tfrac12(1-1)\\
&=-\tfrac14+\tfrac12\log2.
\end{aligned}
$$

ゆえに $1-m+\int g\,d\mu_\rho=\tfrac14-\tfrac14+\tfrac12\log2=S_{\mathrm A}$ です。

一般環ではまず[本章のモーメント補題](#lem-aqft32-first-moment)で $m=\sigma(p)\le1$、[接線補題](#lem-aqft32-log-tangent)で $g\ge0$ を得ます。零値から $1-m=0$ と $\int g=0$ の両方が必要です。後者と $g$ の唯一の零点が1であることから $\mu_\rho=\delta_1$、従って $\Delta\xi_\rho=\xi_\rho$。前者から $p\xi_\sigma=\xi_\sigma$ です。$A\in\mathcal M$ に対し $S(A\xi_\rho)=pA^*\xi_\sigma$ を用い、反線形随伴で

$$
\langle\Delta\xi_\rho,A\xi_\rho\rangle
=\langle S(A\xi_\rho),S\xi_\rho\rangle
=\langle pA^*\xi_\sigma,\xi_\sigma\rangle
$$

とします。左辺は $\rho(A)$、右辺は $\sigma(A)$ なので全観測量の一致が得られます。これは有限行列の固有ベクトルの同時対角化を前提にしない証明です。
<!-- solution-end -->

<a id="ex-aqft32-c02"></a>
#### AQFT32-C02 支持の破れと忠実化による発散
- Level: C

$\rho=E_{11}$、$|+\rangle=(e_1+e_2)/\sqrt2$、$\sigma_0=|+\rangle\langle+|$ とする。$t\in(0,1)$ で $\sigma_t=(1-t)\sigma_0+tI_2/2$ と置く。支持、非可換性、$\rho$ の入力スペクトル、$S_{\mathrm A}(\rho\Vert\sigma_t)$ と $t\downarrow0$ の極限を調べよ。一般の単調性を使用してはならない。

<!-- solution-start -->
**詳細解答。** $\rho$ は純粋、$\sigma_0$ は $|+\rangle$ に支持された純粋状態です。$\langle-,e_1\rangle=1/\sqrt2$（$|-\rangle=(e_1-e_2)/\sqrt2$）だから、$\operatorname{Tr}\rho(1-s(\sigma_0))=1/2>0$。[支持包含判定](../AQFT31/index.md#prop-aqft31-support-criterion)により $S_{\mathrm A}(\rho\Vert\sigma_0)=+\infty$ です。

$t>0$ なら $\sigma_t$ の固有ベクトルは $|+\rangle,|-\rangle$、固有値はそれぞれ $1-t/2,t/2$ でともに正、トレースは1です。$\rho$ との交換子は

$$
[\rho,\sigma_t]=(1-t)
\begin{pmatrix}0&1/2\\-1/2&0\end{pmatrix}\ne0
$$

です。入力ベクトル $E_{11}$ の二つの正固有方向への重みはそれぞれ $1/2$。[非忠実有限次元のトレース公式と発散条件](../AQFT31/index.md#thm-aqft31-nonfaithful-reduction)から

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma_t)
&=-\frac12\log(1-t/2)-\frac12\log(t/2)\\
&=-\frac12\log(t/2)+o(1)
\longrightarrow+\infty.
\end{aligned}
$$

$o(1)$ は $t\downarrow0$ で $-\frac12\log(1-t/2)\to0$ から従います。一次モーメントは常に

$$
\sigma_t(s(\rho))
=\langle e_1,\sigma_t e_1\rangle=\frac12
$$

である一方、相対スペクトルの正固有値 $t/2$ が0に近付き、重み $1/2$ が残るため対数積分は発散します。これは有限次元での直接計算であり、後続講の部分環単調性や一般の混合状態の極限定理を先取りしていません。
<!-- solution-end -->

## 7. 本講の到達点と次講への境界

- 正規状態の支持付き相対Tomita作用素から一次モーメント $\sigma(s(\rho))$ を導いた。
- 接線不等式と反線形随伴を用い、任意のvon Neumann環で $S_{\mathrm A}\ge0$、零値と状態の一致の同値性を証明した。
- 正定値有界作用素に限り $-\log$ の作用素凸性を証明したが、一般の非有界相対モジュラー作用素への拡張はこの証明で行っていない。
- **部分環へ制限すると相対エントロピーが増えないことはまだ証明していない。** それはAQFT33で、収縮写像の定義域と作用素比較を別途構成して扱う。

### 参考文献

- Huzihiro Araki, [Relative Entropy of States of von Neumann Algebras](https://doi.org/10.2977/prims/1195191148), *Publ. RIMS* **11** (1975/76), 809–833. 一般の厳密正値性の原典。
- Huzihiro Araki, [Relative Entropy of States of von Neumann Algebras II](https://ems.press/journals/prims/articles/2844) (1977). 非忠実状態の支持付き相対モジュラー理論。
- Dénes Petz, [Quasi-entropies for States of a von Neumann Algebra](https://math.bme.hu/~petz/pdf/26quasi.pdf) (1985). 相対エントロピーの支持条件と作用素凸関数の文脈。
