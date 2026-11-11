# INV4 逆を正則化するとはどういうことか

<!-- definition-example-audit: strict -->

INV3 の[Picard の可解性判定](../INV3/index.md#thm-inv3-picard-solvability)では、正確なデータに対して逆係数の二乗和が収束するかを判定しました。しかし観測値には通常、微小な誤差があります。例えば

$$
(Dx)_n=\frac{x_n}{n}\qquad (x\in\ell^2)
$$

という観測で、真の未知量を $0$、観測誤差を $e_N/N$ とすると、誤差のノルムは $1/N\to0$ なのに、厳密な逆による復元は $e_N$ でノルム $1$ のままです。これは[コンパクト作用素の不安定性](../INV2/index.md#thm-inv2-compact-instability)の具体的な姿でした。

それでも、極端に小さい特異値に対応する係数をすぐには割らず、最初の有限項だけ復元すれば、各段階ではノイズの増幅を有限に抑えられます。ただし有限項のままでは真の未知量の一部を捨てます。この講義の問いは、**どこまで復元するかをノイズ水準と一緒に調整したとき、元の未知量へ収束させられるか**です。

以降、$X,Y$ を実 Hilbert 空間、$A:X\to Y$ を[有界線形写像](../../F0/F0-02C3/index.md#def-f0-02c3-bounded-linear-operator)とし、データ誤差を

$$
\|y^\delta-y\|_Y\le\delta,\qquad \delta>0
$$

と表します。構成例では INV3 と同じコンパクト作用素を使います。随伴は $A^*$、最小ノルム一般化逆は $A^\dagger$ と書き分けます。

---

## 1. 「逆」の定義域を先に確定する

解が存在しない観測値に対してまで $A^{-1}$ と書くことはできません。また $A$ に核があれば、厳密な解は一意でない場合があります。[INV3 の最小ノルム解](../INV3/index.md#cor-inv3-minimum-norm)は、厳密に実現できるデータ $y_0\in\mathcal R(A)$ に対して、この曖昧さをなくします。

ここでは未知量側の $\ker A$ と観測データ側の $\ker A^*$ を区別します。$k\in\ker A$ なら $A(x+k)=Ax$ なので、前者は観測結果を変えない未知量の方向です。一方、後者の意味を確かめるため、[Hilbert 随伴の定義](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)を $z\in Y$ に適用します。

$$
\begin{aligned}
z\perp\mathcal R(A)
&\Longleftrightarrow \langle Ax,z\rangle_Y=0\quad(\forall x\in X)\\
&\Longleftrightarrow \langle x,A^*z\rangle_X=0\quad(\forall x\in X)\\
&\Longleftrightarrow A^*z=0.
\end{aligned}
$$

従って $\mathcal R(A)^\perp=\ker A^*$ です。$Y_0=\overline{\mathcal R(A)}$ と置き、[閉部分空間の直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)を $Y_0$ に適用すると、

$$
Y=Y_0\oplus\ker A^*
$$

です。$\ker A^*$ は、どの未知量からも生成できない**観測データ側**の方向です。$\ker A$ と $\ker A^*$ は属する空間も役割も異なります。データを厳密に実現できる部分 $y_0$ と到達不能な方向 $z$ に分けられる場合に、以下の一般化逆を定義します。

<a id="def-inv4-pseudoinverse-domain"></a>

<!-- formal-statement-start -->
> **定義（最小ノルム一般化逆の定義域）**
> 実 Hilbert 空間 $X,Y$ と有界線形写像 $A:X\to Y$ に対して、最小ノルム一般化逆の定義域を

$$
\mathcal D(A^\dagger):=\mathcal R(A)\oplus\ker A^*
$$

> とする。各 $y=y_0+z\in\mathcal D(A^\dagger)$（$y_0\in\mathcal R(A)$、$z\in\ker A^*$）について、$A^\dagger y$ は $Ax=y_0$ を満たす解のうち $(\ker A)^\perp$ に属する唯一の元とする。
<!-- formal-statement-end -->

定義が一意に意味を持つことを確認しましょう。$y_0\in\mathcal R(A)$ なので、$Ax=y_0$ となる $x$ を選べます。[閉部分空間の直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)を $x$ と $\ker A$ に適用すると

$$
x=x_0+k,\qquad x_0\perp\ker A,\quad k\in\ker A
$$

です。$Ak=0$ を代入して $Ax_0=Ax-Ak=y_0$ となり、必要な解が存在します。同じ条件を満たす $x_0'$ があれば、

$$
x_0-x_0'\in\ker A\cap(\ker A)^\perp=\{0\}
$$

なので解は一意です。さらに $\mathcal R(A)\perp\ker A^*$ なので、入力 $y=y_0+z$ の分け方も一意です。$y,w$ に対応する核と直交する解を $x_y,x_w$ とすると、$ax_y+bx_w$ も $ay+bw$ の実現可能部分を与え、核に直交します。この一意性により

$$
A^\dagger(ay+bw)=aA^\dagger y+bA^\dagger w
$$

が成立し、一般化逆の線形性も確かめられます。

<!-- definition-example-start: def-inv4-pseudoinverse-domain -->
### 例：観測できない第二成分を持つ行列

**定義の確認**：定義域の直交和、解の存在、核への直交性による一意性を順に確かめます。

$A:\mathbb R^2\to\mathbb R^2$ を $A(s,t)=(2s,0)$ とします。両空間の標準内積で[Hilbert 随伴の定義](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)を具体的に書くと、任意の $(s,t),(a,b)\in\mathbb R^2$ に対して

$$
\langle A(s,t),(a,b)\rangle=2sa
=\langle(s,t),(2a,0)\rangle
$$

です。従って $A^*(a,b)=(2a,0)$ であり、これらの写像の出力を成分ごとに調べると

$$
\mathcal R(A)=\operatorname{span}\{(1,0)\},\quad
\ker A^*=\operatorname{span}\{(0,1)\},\quad
\ker A=\operatorname{span}\{(0,1)\}.
$$

したがって $\mathcal D(A^\dagger)=\mathbb R^2$ です。$y=(a,b)$ は $y_0=(a,0)$、$z=(0,b)$ に一意に分かれ、$A(s,t)=y_0$ なら $s=a/2$、$t$ は任意です。核に直交する解を選ぶため $t=0$ として

$$
A^\dagger(a,b)=(a/2,0).
$$

$b\ne0$ では $Ax=(a,b)$ に厳密解はありませんが、一般化逆は $b$ を復元できない方向として取り除きます。この有限次元例では $\|A^\dagger\|=1/2$ であり、一般化逆自体が有界です。
<!-- definition-example-end -->

コンパクト作用素でも有限ランクでない場合、$\mathcal D(A^\dagger)$ が $Y$ 全体とは限らず、$A^\dagger$ は定義域上で非有界になり得ます。例えば先頭の $D$ は単射で稠密値域ですが、データ $(1/n)_{n\ge1}\in\ell^2$ は[Picard 条件](../INV3/index.md#def-inv3-picard-condition)を満たさず、$\mathcal D(D^\dagger)=\mathcal R(D)$ に入りません。**一般化逆の記号を導入しただけではノイズへの安定性は得られません。**

## 2. 各段階では有界で、極限で逆へ近づく

不安定な $A^\dagger$ を一度に作用させず、正のパラメータ $\alpha$ ごとに有界な近似復元作用素 $R_\alpha:Y\to X$ を用意します。$\alpha$ が小さくなるにつれて、正確なデータでの無雑音で残る誤差が消えるようにします。$\alpha$ は復元の細かさを調整する数であり、必ずしも数値的な「小さな摂動」を意味しません。

<a id="def-inv4-regularization-family"></a>

<!-- formal-statement-start -->
> **定義（正則化作用素族）**
> 実 Hilbert 空間 $X,Y$ と有界線形写像 $A:X\to Y$ に対して、各 $\alpha>0$ で定義された**有界線形写像** $R_\alpha:Y\to X$ の族が $A^\dagger$ の正則化作用素族であるとは、任意の $y\in\mathcal D(A^\dagger)$ に対して無雑音の整合性

$$
\lim_{\alpha\downarrow0}\|R_\alpha y-A^\dagger y\|_X=0
$$

> を満たすことをいう。この収束は各 $y$ を固定して調べるノルム収束であり、$\sup_{\alpha>0}\|R_\alpha\|<\infty$ や作用素ノルムでの収束は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv4-regularization-family -->
### 例：対角観測で小さな特異値を一時的に除く

**定義の確認**：全データ空間での定義、有界性、線形性、すべての可解データでの整合性を確かめます。

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$ について、$\alpha>0$ ごとに整数

$$
m(\alpha)=\max\{1,\lfloor1/\alpha\rfloor\}
$$

を選び、$R_\alpha y$ の最初の $m(\alpha)$ 成分だけを

$$
(R_\alpha y)_n=
\begin{cases}
ny_n,&1\le n\le m(\alpha),\\
0,&n>m(\alpha)
\end{cases}
$$

とします。$y\in\ell^2$ なら有限台の列に写るので、定義域は $Y$ 全体です。さらに

$a,b\in\mathbb R$、$y,z\in\ell^2$ に対し、各成分の式は $R_\alpha(ay+bz)=aR_\alpha y+bR_\alpha z$ を与えるので線形性も成立します。ノルムについては

$$
\|R_\alpha y\|_2^2
=\sum_{n\le m(\alpha)}n^2|y_n|^2
\le m(\alpha)^2\|y\|_2^2
$$

で有界です。$y=e_{m(\alpha)}$ では等号になるので $\|R_\alpha\|=m(\alpha)$ とも分かります。

無雑音データ $y=Dx$（$x\in\ell^2$）については $R_\alpha y=(x_1,\ldots,x_{m(\alpha)},0,\ldots)$ です。$D$ は単射なので、[INV3 の最小ノルム解の系](../INV3/index.md#cor-inv3-minimum-norm)を $y=Dx$ に適用すると $D^\dagger y=x$ となります。$\alpha\downarrow0$ なら $m(\alpha)\to\infty$、従って

$$
\|R_\alpha y-D^\dagger y\|_2^2
=\sum_{n>m(\alpha)}|x_n|^2\longrightarrow0.
$$

このように、**それぞれの $R_\alpha$ は有界、無雑音の各可解データでは整合的、しかし $\|R_\alpha\|\to\infty$** です。これは定義に矛盾しません。
<!-- definition-example-end -->

ここでは有限項復元を正則化の存在例として使いました。別の係数の抑え方を詳しく比較するのは次の INV5 です。

## 3. 正則化パラメータをノイズ水準に結び付ける

$R_\alpha$ が無雑音で収束しても、$\alpha$ を極端に小さくした復元ではノイズが増幅されます。そこで、$\delta$ が小さくなるときのパラメータを $\alpha(\delta)$ として選び、**どんな許容ノイズでも**真の最小ノルム解へ近づくことを要求します。

<a id="def-inv4-noisy-convergence"></a>

<!-- formal-statement-start -->
> **定義（ノイズ下での正則化収束）**
> 実 Hilbert 空間 $X,Y$、有界線形写像 $A:X\to Y$ と正則化作用素族 $(R_\alpha)_{\alpha>0}$ を固定する。正のパラメータ選択 $\alpha:(0,\delta_0)\to(0,\infty)$ が**ノイズ下で収束する**とは、$\alpha(\delta)\to0$（$\delta\downarrow0$）であり、任意の $y\in\mathcal D(A^\dagger)$ について

$$
\sup_{\|y^\delta-y\|_Y\le\delta}
\|R_{\alpha(\delta)}y^\delta-A^\dagger y\|_X
\longrightarrow0
$$

> が成立することをいう。上限は $Y$ 全体の許容観測 $y^\delta$ にわたり、$y^\delta\in\mathcal D(A^\dagger)$ は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv4-noisy-convergence -->
### 例：有限次元で有界な逆なら調整は不要

**定義の確認**：パラメータの極限と、許容ノイズ全体にわたる誤差上界をそれぞれ検査します。

$A:\mathbb R\to\mathbb R$ を $Ax=2x$ とし、すべての $\alpha>0$ で $R_\alpha y=y/2$ とします。$\mathcal D(A^\dagger)=\mathbb R$、$A^\dagger y=y/2$ なので整合性は恒等的です。例えば $\alpha(\delta)=\delta$ と選べば $\alpha(\delta)\to0$。任意の $|y^\delta-y|\le\delta$ に対し

$$
|R_{\alpha(\delta)}y^\delta-A^\dagger y|
=\frac12|y^\delta-y|\le\frac{\delta}{2}\to0.
$$

上限を取っても同じ評価です。有限次元の有界な逆は、パラメータを実際に変えずとも収束条件を満たします。
<!-- definition-example-end -->

### 誤差分解は二つの異なる原因を見せる

復元のずれに $R_\alpha y$ を加えて引けば、次の恒等式が得られます。

$$
R_\alpha y^\delta-A^\dagger y
=R_\alpha(y^\delta-y)+(R_\alpha y-A^\dagger y).
$$

第1項はノイズを作用素がどれだけ増幅したか、第2項はノイズがなくても残る切捨て・近似の誤差です。両方が消えなければ、すべてのノイズに安定な復元にはなりません。

<a id="thm-inv4-error-splitting"></a>

<!-- formal-statement-start -->
> **定理（正則化誤差の二項分解と収束）**
> $X,Y$ を実 Hilbert 空間、$A:X\to Y$ を有界線形写像、$(R_\alpha)_{\alpha>0}$ を $A^\dagger$ の正則化作用素族とする。$y\in\mathcal D(A^\dagger)$ と $\|y^\delta-y\|_Y\le\delta$ に対して、任意の $\alpha>0$ で

$$
\|R_\alpha y^\delta-A^\dagger y\|_X
\le\delta\|R_\alpha\|+
\|R_\alpha y-A^\dagger y\|_X.
$$

> 特に $\alpha(\delta)>0$ が

$$
\alpha(\delta)\longrightarrow0,\qquad
\delta\|R_{\alpha(\delta)}\|\longrightarrow0
\quad(\delta\downarrow0)
$$

> を満たせば、$\alpha(\delta)$ は[ノイズ下で収束する](#def-inv4-noisy-convergence)。
<!-- formal-statement-end -->

### 証明の見取り図

ノイズの項には有界作用素のノルム評価を適用します。近似の項は各データに対する[無雑音の整合性](#def-inv4-regularization-family)で零へ向かいます。前者の上界は観測誤差の向きに依存しないため、許容ノイズすべてについて同時に結論できます。

<!-- proof-start -->
### 証明

$R_\alpha$ は線形なので

$$
R_\alpha y^\delta-A^\dagger y
=R_\alpha(y^\delta-y)+R_\alpha y-A^\dagger y.
$$

まず三角不等式を適用し、次に[作用素ノルムの定義](../../F0/F0-02C3/index.md#def-f0-02c3-operator-norm)を各項へ適用すると

$$
\begin{aligned}
\|R_\alpha y^\delta-A^\dagger y\|_X
&\le\|R_\alpha(y^\delta-y)\|_X+
\|R_\alpha y-A^\dagger y\|_X\\
&\le\|R_\alpha\|\|y^\delta-y\|_Y+
\|R_\alpha y-A^\dagger y\|_X\\
&\le\delta\|R_\alpha\|+
\|R_\alpha y-A^\dagger y\|_X.
\end{aligned}
$$

$y\in\mathcal D(A^\dagger)$ を固定します。$\alpha(\delta)\to0$ と[正則化作用素族の整合性](#def-inv4-regularization-family)より第2項は零へ収束し、仮定より第1項も零へ収束します。右辺には $y^\delta$ が現れないため、$\|y^\delta-y\|\le\delta$ の範囲で上限を取っても同じ収束が成り立ちます。$\square$
<!-- proof-end -->

この定理で要求されるのは「$\delta\to0$ ならとにかく $\alpha\to0$」だけではありません。**逆を正確にしようとする速度を、ノイズの減少速度より慎重に選ぶ**ことが必要です。

## 4. 不安定な逆なのに、有界な近似でよい理由

「すべての $R_\alpha$ が有界なら、極限も有界になるのでは」という疑問は自然です。しかし有界性の定数が $\alpha$ に依存して発散すれば、その推論は成立しません。むしろ、不安定な逆を正確に近似するには、この発散を避けられません。

<a id="thm-inv4-norm-divergence"></a>

<!-- formal-statement-start -->
> **定理（不安定な逆に対する正則化ノルムの発散）**
> 実 Hilbert 空間 $X,Y$ と有界線形写像 $A:X\to Y$ について、$A^\dagger:\mathcal D(A^\dagger)\to X$ が非有界であるとする。このとき任意の[正則化作用素族](#def-inv4-regularization-family) $(R_\alpha)_{\alpha>0}$ は

$$
\lim_{\alpha\downarrow0}\|R_\alpha\|=\infty
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

仮にノルムが発散しないなら、$\alpha_k\to0$ に沿って $\|R_{\alpha_k}\|$ が一様に有限になるはずです。その評価を正確なデータ $y$ に適用し、整合性による極限を取ると、非有界と仮定した $A^\dagger$ 自体に有界なノルム評価が生じます。

<!-- proof-start -->
### 証明

結論が偽なら、ある $M<\infty$ と $\alpha_k\downarrow0$ が存在して $\|R_{\alpha_k}\|\le M$ とできます。したがって任意の $y\in\mathcal D(A^\dagger)$ に対して

$$
\|R_{\alpha_k}y\|_X\le M\|y\|_Y.
$$

[正則化作用素族の整合性](#def-inv4-regularization-family)により $R_{\alpha_k}y\to A^\dagger y$ が $X$ のノルムで成立します。ノルムの連続性から

$$
\|A^\dagger y\|_X
=\lim_{k\to\infty}\|R_{\alpha_k}y\|_X
\le M\|y\|_Y.
$$

これは全ての $y\in\mathcal D(A^\dagger)$ について同じ $M$ で成立するので、$A^\dagger$ が有界になって仮定に矛盾します。$\square$
<!-- proof-end -->

例えば $D^\dagger(e_N/N)=e_N$ なので $\|e_N/N\|_2\to0$ にもかかわらず復元ノルムは $1$ です。上の定理は「ノイズ増幅の可能性を全ての $\alpha$ で一様に消す」ことができないと述べています。[INV2 の下界評価と閉値域の定理](../INV2/index.md#thm-inv2-closed-range)にも対応します。

## 5. 有限項正則化で二つの極限を両立させる

先ほどの $D$ に対して、整数 $m\ge1$ を明示して

$$
(R_m y)_n=
\begin{cases}ny_n,&n\le m,\\0,&n>m\end{cases}
$$

と記します。これは[第2節の正則化作用素族](#def-inv4-regularization-family)で $\alpha=1/m$ としたものです。$\|R_m\|=m$ で、厳密データ $y=Dx$ について $R_my=P_mx$（$P_m$ は最初の $m$ 座標への直交射影）でした。

<a id="prop-inv4-diagonal-truncation"></a>

<!-- formal-statement-start -->
> **命題（対角観測の有限項正則化）**
> $D:\ell^2\to\ell^2$ を $(Dx)_n=x_n/n$ とし、上の有界線形写像 $R_m$ を用いる。任意の $x\in\ell^2$、真のデータ $y=Dx$、$\|y^\delta-y\|_2\le\delta$ に対して

$$
\|R_my^\delta-x\|_2
\le m\delta+
\left(\sum_{n>m}|x_n|^2\right)^{1/2}.
$$

> 従って整数値の選択 $m(\delta)\to\infty$ と $\delta m(\delta)\to0$ が同時に成り立てば、$R_{m(\delta)}y^\delta\to x$ はすべての許容ノイズに対して成立する。特に $0<\delta<1$ で $m(\delta)=\lfloor\delta^{-1/2}\rfloor$ と選べる。
<!-- formal-statement-end -->

### 証明の見取り図

各座標で、前半はノイズを $n$ 倍してしまい、後半は真の $x_n$ を捨てます。二つの部分が互いに異なる座標に乗ることを使い、ノルムを評価します。

<!-- proof-start -->
### 証明

$\eta=y^\delta-y$ と置きます。$n\le m$ では

$$
(R_my^\delta-x)_n=n(y_n+\eta_n)-x_n
=n\eta_n
$$

であり、$n>m$ では $(R_my^\delta-x)_n=-x_n$ です。よって座標の直交性から

$$
\begin{aligned}
\|R_my^\delta-x\|_2^2
&=\sum_{n\le m}n^2|\eta_n|^2+\sum_{n>m}|x_n|^2\\
&\le m^2\sum_{n\le m}|\eta_n|^2+\sum_{n>m}|x_n|^2\\
&\le m^2\delta^2+\sum_{n>m}|x_n|^2.
\end{aligned}
$$

$a,b\ge0$ について $\sqrt{a^2+b^2}\le a+b$ を適用すると表示の上界が出ます。$x\in\ell^2$ なので $\sum_{n>m}|x_n|^2\to0$、一方 $\delta m(\delta)\to0$ です。$m(\delta)=\lfloor\delta^{-1/2}\rfloor$ なら $m(\delta)\to\infty$ で

$$
0\le\delta m(\delta)\le\sqrt\delta\to0.
$$

従って結論が成立します。$\square$
<!-- proof-end -->

### 二種類の失敗を区別する

**打切りが早過ぎる場合。** $m=m_0$ のままにすると、未知量 $x=e_{m_0+1}$ の正確なデータ $y=Dx=e_{m_0+1}/(m_0+1)$ に対して $R_{m_0}y=0$ です。ノイズが零でも $\|R_{m_0}y-x\|=1$ のままです。これは無雑音で残る誤差が消えない失敗です。

**打切り解除が速過ぎる場合。** $m(\delta)=\lfloor1/\delta\rfloor$ とし、真の未知量とデータをともに零にします。許容誤差 $y^\delta=\delta e_{m(\delta)}$ を入れると

$$
\|y^\delta\|_2=\delta,\qquad
\|R_{m(\delta)}y^\delta\|_2=\delta m(\delta)\to1.
$$

こちらは真の未知量が零でも、ノイズ増幅が消えない失敗です。元の作用素の特異値をより多く使うことが、必ずしも良い復元につながるわけではありません。

<a id="prop-inv4-noise-necessity"></a>

<!-- formal-statement-start -->
> **命題（ノイズ増幅条件の必要性）**
> 実 Hilbert 空間 $X,Y$、有界線形写像 $A:X\to Y$ と有界線形写像族 $(R_\alpha)_{\alpha>0}$ を考える。パラメータ選択 $\alpha(\delta)>0$ について、真のデータ $y=0$（従って $A^\dagger0=0$）で全許容ノイズに対する復元誤差が零へ収束するための必要十分条件は

$$
\delta\|R_{\alpha(\delta)}\|\longrightarrow0
$$

> である。これにより、[正則化作用素族の無雑音整合性](#def-inv4-regularization-family)と $\alpha(\delta)\to0$ を既に仮定したとき、[ノイズ下での収束](#def-inv4-noisy-convergence)にはこの条件が必要十分となる。
<!-- formal-statement-end -->

### 証明の見取り図

零データの周りでは無雑音で残る誤差が零なので、最悪ノイズの復元ノルムは有界線形写像のノルムの定義そのものです。これを使って必要性を確かめ、十分性には[誤差分解定理](#thm-inv4-error-splitting)を適用します。

<!-- proof-start -->
### 証明

$R_{\alpha(\delta)}$ は線形で $R_{\alpha(\delta)}0=0$ です。$y=0$ の許容観測は $\|\eta\|_Y\le\delta$ を満たす $\eta$ 全体なので、作用素ノルムの定義を $\eta=\delta v$ と変数変換して

$$
\begin{aligned}
\sup_{\|\eta\|_Y\le\delta}
\|R_{\alpha(\delta)}\eta-A^\dagger0\|_X
&=\sup_{\|\eta\|_Y\le\delta}\|R_{\alpha(\delta)}\eta\|_X\\
&=\delta\sup_{\|v\|_Y\le1}\|R_{\alpha(\delta)}v\|_X\\
&=\delta\|R_{\alpha(\delta)}\|.
\end{aligned}
$$

従って零データでの収束と条件は同値です。全てのデータでの[ノイズ下の収束](#def-inv4-noisy-convergence)は零データを含むので必要性が従います。逆に $\alpha(\delta)\to0$、無雑音整合性、$\delta\|R_{\alpha(\delta)}\|\to0$ を仮定すれば[誤差分解定理](#thm-inv4-error-splitting)がすべての $y\in\mathcal D(A^\dagger)$ の十分性を与えます。$\square$
<!-- proof-end -->

ここまでで、正則化の基本構造がはっきりしました。整合性には $\alpha\downarrow0$ が必要であり、不安定な逆を近似すると $\|R_\alpha\|$ は増えます。しかし、ノイズ水準との積 $\delta\|R_{\alpha(\delta)}\|$ を零にする速さで近似を進めればよいのです。

---

## 6. 演習：整合性とノイズ増幅を別々に判定する

各問で、正確なデータに対する無雑音で残る誤差と観測誤差の増幅を混同しないことを意識してください。

### Level A：定義と基本評価

<a id="ex-inv4-a01"></a>

### INV4-A01 有限ランクの一般化逆
- Level: A

$A:\mathbb R^2\to\mathbb R^2$ を $A(s,t)=(3s,0)$ とする。$\mathcal R(A)$、$\ker A$、$\ker A^*$、$\mathcal D(A^\dagger)$、$A^\dagger(a,b)$ を求めよ。$b\ne0$ の場合に厳密な解がない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

標準内積で $\langle A(s,t),(a,b)\rangle=3sa=\langle(s,t),(3a,0)\rangle$ だから $A^*(a,b)=(3a,0)$ です。従って

$$
\mathcal R(A)=\operatorname{span}\{(1,0)\},\quad
\ker A=\ker A^*=\operatorname{span}\{(0,1)\}.
$$

[一般化逆の定義域](#def-inv4-pseudoinverse-domain)から $\mathcal D(A^\dagger)=\mathbb R^2$。$y=(a,b)=(a,0)+(0,b)$ に対し、$A(s,t)=(a,0)$ は $s=a/3$ を要求し、核に直交するため $t=0$ を選びます。よって

$$
A^\dagger(a,b)=(a/3,0).
$$

一方 $Ax$ の第二成分は常に零です。$b\ne0$ なら $Ax=(a,b)$ を満たす $x$ は存在しません。一般化逆は観測不能な成分を取り除いているだけで、元の方程式を厳密に解いてはいません。
<!-- solution-end -->

<a id="ex-inv4-a02"></a>

### INV4-A02 有限項復元の作用素ノルム
- Level: A

$R_m:\ell^2\to\ell^2$ を $(R_my)_n=ny_n$（$n\le m$）、$(R_my)_n=0$（$n>m$）で定める。$\|R_m\|=m$ を上界と下界の両方から示せ。

<!-- solution-start -->
#### 詳細解答

任意の $y\in\ell^2$ について

$$
\|R_my\|_2^2=\sum_{n\le m}n^2|y_n|^2
\le m^2\sum_{n\le m}|y_n|^2\le m^2\|y\|_2^2
$$

なので $\|R_m\|\le m$ です。他方 $\|e_m\|_2=1$ で $R_me_m=me_m$。したがって $\|R_m\|\ge\|R_me_m\|_2=m$ です。両者を合わせて $\|R_m\|=m$ と確定します。
<!-- solution-end -->

<a id="ex-inv4-a03"></a>

### INV4-A03 誤差分解の二項を特定する
- Level: A

有界線形写像 $R_\alpha:Y\to X$、$y\in\mathcal D(A^\dagger)$、$\|y^\delta-y\|_Y\le\delta$ に対して、$R_\alpha y^\delta-A^\dagger y$ を二項に分け、各項のノルムの上界を示せ。

<!-- solution-start -->
#### 詳細解答

$R_\alpha$ の線形性を用いて $R_\alpha y$ を加減すると

$$
R_\alpha y^\delta-A^\dagger y
=R_\alpha(y^\delta-y)+(R_\alpha y-A^\dagger y).
$$

第1項は作用素ノルムの定義と誤差条件から

$$
\|R_\alpha(y^\delta-y)\|_X
\le\|R_\alpha\|\|y^\delta-y\|_Y
\le\delta\|R_\alpha\|
$$

です。第2項は無雑音で残る誤差 $\|R_\alpha y-A^\dagger y\|_X$ そのものです。[誤差分解定理](#thm-inv4-error-splitting)の評価は三角不等式で両者を足した結果です。
<!-- solution-end -->

<a id="ex-inv4-a04"></a>

### INV4-A04 切捨て誤差の具体計算
- Level: A

$D:\ell^2\to\ell^2$ を $(Dx)_n=x_n/n$ とし、$x_n=1/n$、$y=Dx$ とする。有限項復元 $R_my$ と $x$ の距離の二乗を級数で書け。また積分比較で

$$
\frac1{m+1}\le\|R_my-x\|_2^2\le\frac1m
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$x=(1/n)$ は $\sum_n1/n^2<\infty$ なので $\ell^2$ に属します。観測は $y_n=1/n^2$。最初の $m$ 成分では $ny_n=1/n=x_n$ ですから、差は $n>m$ の尾部のみで

$$
\|R_my-x\|_2^2=\sum_{n=m+1}^\infty\frac1{n^2}.
$$

$t\mapsto t^{-2}$ は正で単調減少なので、各区間での矩形と積分を比較すると

$$
\int_{m+1}^\infty t^{-2}\,dt
\le\sum_{n=m+1}^\infty n^{-2}
\le\int_m^\infty t^{-2}\,dt.
$$

$\int_a^\infty t^{-2}\,dt=[-t^{-1}]_a^\infty=1/a$ なので、求める上下界が得られます。
<!-- solution-end -->

<a id="ex-inv4-a05"></a>

### INV4-A05 定数でなくても有界な逆
- Level: A

$A:\mathbb R\to\mathbb R$ を $Ax=4x$ とし、$0<\alpha<1$ で $R_\alpha y=(1-\alpha)y/4$、$\alpha\ge1$ で $R_\alpha=0$ とする。この族が正則化作用素族であることと、$\alpha(\delta)=\sqrt\delta$（$0<\delta<1$）がノイズ下で収束することを示せ。

<!-- solution-start -->
#### 詳細解答

$A^\dagger y=y/4$、$\mathcal D(A^\dagger)=\mathbb R$ です。各 $R_\alpha$ は全実数上の有界線形写像で、$0<\alpha<1$ では $\|R_\alpha\|=(1-\alpha)/4\le1/4$、$\alpha\ge1$ では零です。固定した $y$ に対して

$$
|R_\alpha y-A^\dagger y|
=\frac{\alpha|y|}{4}\longrightarrow0\qquad(\alpha\downarrow0)
$$

なので[正則化の定義](#def-inv4-regularization-family)を満たします。$\alpha(\delta)=\sqrt\delta\to0$、さらに

$$
\delta\|R_{\alpha(\delta)}\|
=\frac{\delta(1-\sqrt\delta)}4\le\frac\delta4\to0.
$$

よって[誤差分解定理](#thm-inv4-error-splitting)から全許容ノイズで収束します。無雑音の誤差も $\sqrt\delta|y|/4\to0$ と直接確かめられます。
<!-- solution-end -->

### Level B：条件の必要性と失敗機構

<a id="ex-inv4-b01"></a>

### INV4-B01 不安定な逆のノルム発散を直接示す
- Level: B

$D:\ell^2\to\ell^2$、$(Dx)_n=x_n/n$ に対し、任意の正則化作用素族 $(S_\alpha)_{\alpha>0}$ が $\|S_\alpha\|\to\infty$ を満たすことを、[ノルム発散定理](#thm-inv4-norm-divergence)を引用するだけでなく、その証明の矛盾論法を $e_n$ に適用して示せ。

<!-- solution-start -->
#### 詳細解答

各 $n$ について $y^{(n)}=De_n=e_n/n\in\mathcal R(D)$ であり、$D^\dagger y^{(n)}=e_n$ です。仮に $\alpha_k\downarrow0$ と $M<\infty$ が存在して $\|S_{\alpha_k}\|\le M$ なら、どの $n$ についても

$$
\|S_{\alpha_k}y^{(n)}\|_2\le M\|y^{(n)}\|_2=\frac Mn
$$

です。固定した $n$ に対して整合性から $S_{\alpha_k}y^{(n)}\to e_n$ なので、$k\to\infty$ で

$$
1=\|e_n\|_2\le\frac Mn
$$

を得ます。ここで $n>M$ を選ぶと矛盾します。したがってノルムが有界な $\alpha_k\to0$ は存在せず、$\|S_\alpha\|\to\infty$ です。$n$ を固定してから極限を取り、最後に $n$ を選ぶ量化順序が重要です。
<!-- solution-end -->

<a id="ex-inv4-b02"></a>

### INV4-B02 パラメータの指数を分類する
- Level: B

対角観測 $D$ の有限項復元 $R_m$ に対し、$0<\delta<1$、$q>0$ として $m_q(\delta)=\lfloor\delta^{-q}\rfloor$ とする。どの $q$ で全ての $x\in\ell^2$ と全許容ノイズに対して収束するかを必要十分に判定せよ。失敗する場合は具体的なノイズ列を構成せよ。

<!-- solution-start -->
#### 詳細解答

$q>0$ より $\delta^{-q}\to\infty$、したがって $m_q(\delta)\to\infty$ です。床関数について

$$
\delta^{-q}-1<m_q(\delta)\le\delta^{-q}
$$

なので両辺に $\delta$ を掛ければ

$$
\delta^{1-q}-\delta<\delta m_q(\delta)\le\delta^{1-q}.
$$

$0<q<1$ なら両辺は零へ収束し、[対角観測の有限項正則化](#prop-inv4-diagonal-truncation)から全許容ノイズで収束します。$q=1$ なら $\delta m_q(\delta)\to1$、$q>1$ なら下界も無限大へ発散します。

後二者で真の未知量 $x=0$、真のデータ $y=0$ として $y^\delta=\delta e_{m_q(\delta)}$ を選びます。これは $\|y^\delta-y\|_2=\delta$ を満たす一方、

$$
\|R_{m_q(\delta)}y^\delta-x\|_2
=\delta m_q(\delta)
$$

が零へ向かいません。したがって必要十分条件は $0<q<1$ です。ノイズが特定の一方向に乗るだけで全許容ノイズでの収束を否定できます。
<!-- solution-end -->

<a id="ex-inv4-b03"></a>

### INV4-B03 一般化逆と厳密解の違い
- Level: B

$H=\ell^2\oplus\mathbb R$、$B:H\to H$ を $B((x_n),t)=((x_n/n),0)$ とする。$x=(1/n)_{n\ge1}\in\ell^2$、$a\ne0$ として $w=((x_n/n)_{n\ge1},a)$ を与える。次を求めよ。

1. $\mathcal R(B)$、$\ker B^*$、$w\in\mathcal D(B^\dagger)$ かどうか。
2. $B^\dagger w$ と、$Bw=w$ が可解かどうか。
3. $S_m((z_n),b)=((nz_n)_{n\le m},0,0,\ldots;0)$ とする。$S_mw$ の極限を求めよ。

<!-- solution-start -->
#### 詳細解答

$u=((u_n),s)$、$v=((v_n),t)\in H$ とすると、直交和の内積と実数列の対角作用素 $D$ の定義から

$$
\langle Bu,v\rangle_H
=\sum_{n=1}^\infty\frac{u_nv_n}{n}
=\langle u,Bv\rangle_H.
$$

従って $B$ は自己共役であり $B^*=B$ です。出力の最後の実数成分は必ず零で、先頭の列は $D$ の値域なので

$$
\mathcal R(B)=\mathcal R(D)\oplus\{0\},\quad
\ker B^*=\{0\}\oplus\mathbb R.
$$

$Dx=(x_n/n)$ で、$w=(Dx,0)+(0,a)$ はこの二つの直交部分に分解されます。また $B((z_n),t)=0$ なら全ての $z_n=0$ なので $\ker B=\{0\}\oplus\mathbb R$ です。$(x,0)$ はこの核に直交するため、[一般化逆の定義](#def-inv4-pseudoinverse-domain)の全条件を満たし、$w\in\mathcal D(B^\dagger)$ で

$$
B^\dagger w=(x,0).
$$

しかし $a\ne0$ なので $Bw=w$ は最後の成分が一致せず不可解です。最後に

$$
S_mw=((x_1,\ldots,x_m,0,\ldots),0)
$$

で、$\|S_mw-B^\dagger w\|_H^2=\sum_{n>m}1/n^2\to0$。これが厳密なデータとして実現不可能な $w$ でも、一般化逆の定義域には属して正則化できる例です。
<!-- solution-end -->

<a id="ex-inv4-b04"></a>

### INV4-B04 点ごとの収束と作用素ノルム収束
- Level: B

$P_m:\ell^2\to\ell^2$ を最初の $m$ 成分だけ残す直交射影とする。全ての $x\in\ell^2$ で $P_mx\to x$ だが、$\|P_m-I\|=1$ であることを示せ。これを $P_m=R_mD$ と結び付け、[正則化の定義](#def-inv4-regularization-family)が作用素ノルム収束を要求しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

固定した $x\in\ell^2$ に対して、最初の $m$ 成分は一致するので

$$
\|P_mx-x\|_2^2=\sum_{n>m}|x_n|^2\to0
$$

です。一方任意の $x$ に対して

$$
\|(P_m-I)x\|_2^2=\sum_{n>m}|x_n|^2\le\|x\|_2^2
$$

より $\|P_m-I\|\le1$。$\|e_{m+1}\|_2=1$ なのに $(P_m-I)e_{m+1}=-e_{m+1}$ なので逆向きの不等式も成り立ち、$\|P_m-I\|=1$ です。

$D$ の各座標は $1/n$ 倍され、$R_m$ は最初の $m$ 座標だけ $n$ 倍するので $R_mD=P_m$ です。無雑音の各未知量を固定すれば $P_mx\to x$ ですが、すべての単位ベクトルに共通の一様精度にはなりません。$x=e_{m+1}$ という復元されない方向を $m$ とともに変えているのが、二つの収束の違いです。
<!-- solution-end -->

### Level C：整合性・零空間・ノイズを統合する

<a id="ex-inv4-c01"></a>

### INV4-C01 見えない成分と打切り選択
- Level: C

$H=\ell^2\oplus\mathbb R$、$B:H\to H$ を $B((z_n),t)=((z_n/n),0)$ とする。未知量 $x=((1/n)_{n\ge1},0)$、真のデータ $y=Bx=((1/n^2)_{n\ge1},0)$ とし、整数 $m\ge1$ について

$$
S_m((w_n),b)=((nw_n)_{1\le n\le m},0,0,\ldots;0)
$$

と定める。以下を順に解け。

1. $\ker B$、$\ker B^*$、$\mathcal D(B^\dagger)$ を求め、$B^\dagger y=x$ を示せ。
2. $\|S_m\|=m$ と $\|S_my-x\|_H^2=\sum_{n>m}n^{-2}$ を示せ。
3. 任意の $\|y^\delta-y\|_H\le\delta$ について、$m(\delta)=\lfloor\delta^{-1/2}\rfloor$ による誤差の上界を求め、全許容ノイズでの収束を証明せよ。
4. $m(\delta)=\lfloor1/\delta\rfloor$ としたとき、許容ノイズを具体的に選んで収束が失敗することを示せ。
5. データ $y+(0,a)$（$a\ne0$）が $B$ の値域に入らないこと、しかし $\mathcal D(B^\dagger)$ に属して $S_m(y+(0,a))\to x$ となることを説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 核と一般化逆の定義域。** $B((z_n),t)=0$ なら全ての $z_n/n=0$ なので $z=0$ です。一方 $t$ は観測されません。直交和の内積を $u=((u_n),s)$、$v=((v_n),t)\in H$ に適用すると

$
\langle Bu,v\rangle_H
=\sum_{n=1}^\infty\frac{u_nv_n}{n}
=\langle u,Bv\rangle_H.
$

従って $B^*=B$ であり、

$$
\ker B=\ker B^*=\{0\}\oplus\mathbb R,\quad
\mathcal R(B)=\mathcal R(D)\oplus\{0\}.
$$

[一般化逆の定義域](#def-inv4-pseudoinverse-domain)は

$$
\mathcal D(B^\dagger)
=\bigl(\mathcal R(D)\oplus\{0\}\bigr)
\oplus\bigl(\{0\}\oplus\mathbb R\bigr).
$$

$y=Bx$ であり、$x$ の最後の成分は零なので $x\perp\ker B$。ゆえに $B^\dagger y=x$ です。

**2. 有界性と無雑音で残る誤差。** 任意の $w=((w_n),b)\in H$ に対して

$$
\|S_mw\|_H^2
=\sum_{n\le m}n^2|w_n|^2
\le m^2\sum_{n\le m}|w_n|^2
\le m^2\|w\|_H^2.
$$

$(e_m,0)$ は単位ベクトルで $\|S_m(e_m,0)\|_H=m$ なので $\|S_m\|=m$。真のデータは第 $n$ 成分が $1/n^2$ だから、最初の $m$ 成分の復元は $n(1/n^2)=1/n$ で一致し、

$$
\|S_my-x\|_H^2=\sum_{n>m}\frac1{n^2}.
$$

**3. 適切な打切り。** $\eta^\delta=y^\delta-y$ とおけば $\|\eta^\delta\|_H\le\delta$。作用素ノルム評価と三角不等式で

$$
\|S_my^\delta-x\|_H
\le\|S_m\eta^\delta\|_H+\|S_my-x\|_H
\le m\delta+\left(\sum_{n>m}n^{-2}\right)^{1/2}.
$$

[A04 の積分比較](#ex-inv4-a04)を用いて尾部は $1/m$ 以下なので

$$
\|S_{m(\delta)}y^\delta-x\|_H
\le \delta m(\delta)+\frac1{\sqrt{m(\delta)}}
\le \sqrt\delta+\frac1{\sqrt{\lfloor\delta^{-1/2}\rfloor}}.
$$

$m(\delta)\to\infty$ で右辺は零へ向かい、選んだノイズに依存しません。従って全許容ノイズに対して収束します。

**4. 速過ぎる打切り解除。** $m(\delta)=\lfloor1/\delta\rfloor$ とし、$y^\delta=y+\delta(e_{m(\delta)},0)$ を選びます。確かに $\|y^\delta-y\|_H=\delta$ です。復元差の最初の $m(\delta)$ 成分では真の未知量は正確に復元され、誤差成分は第 $m(\delta)$ 座標の $\delta m(\delta)$ だけです。したがって

$$
\|S_{m(\delta)}y^\delta-x\|_H^2
=\delta^2m(\delta)^2+\sum_{n>m(\delta)}n^{-2}
\ge\delta^2m(\delta)^2\to1.
$$

極限が零でないため収束に失敗します。切捨て誤差が零へ向かっても、ノイズの増幅が消えないのです。

**5. 観測不能方向。** $B$ の出力の最後の成分は常に零なので、$a\ne0$ の $y+(0,a)$ は値域に入りません。しかし $y\in\mathcal R(B)$、$(0,a)\in\ker B^*$ なので、和は $\mathcal D(B^\dagger)$ に属します。[一般化逆の定義](#def-inv4-pseudoinverse-domain)より $B^\dagger(y+(0,a))=B^\dagger y=x$。$S_m$ は最後の実数成分を常に零へ写すので

$$
S_m(y+(0,a))=S_my\longrightarrow x.
$$

この例は「厳密な方程式が解けること」と「一般化逆が定義され正則化で近似できること」を区別しています。
<!-- solution-end -->

---

## 7. ここから次の方法へ

今回分かったのは、正則化が単なる逆行列の近似ではなく、**無雑音の整合性と、ノイズ水準に応じた増幅制御を同時に満たす操作**だということです。

- $\alpha\downarrow0$ によって無雑音で残る誤差を減らします。
- 同時に $\delta\|R_{\alpha(\delta)}\|\to0$ として観測ノイズの増幅を抑えます。
- 不安定な逆では $\|R_\alpha\|\to\infty$ を避けられず、この二条件の釣合いが本質です。

次の INV5 では、特異値を急に切り捨てる TSVD と、係数を滑らかに抑える Tikhonov 正則化を、同じ誤差分解の枠組みで比較します。
