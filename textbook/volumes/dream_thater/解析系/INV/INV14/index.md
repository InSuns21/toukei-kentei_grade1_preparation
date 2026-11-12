# INV14 不完全観測で何が見えなくなるか

[INV12 の Fourier slice theorem](../INV12/index.md#thm-inv12-slice)によれば、直線の投影値を位置変数について Fourier 変換すると、画像の二次元 Fourier 変換の一断面が得られます。[INV13 のフィルタ補正逆投影](../INV13/index.md#thm-inv13-fbp)では、全方向の断面を積分して画像へ戻しました。

ところが撮影装置が回転できる範囲は有限であり、撮影角度も離散的です。すると何が一意に分かり、何が分からなくなるのでしょうか。「有限本の方向しかない」「方向が連続的でも角度範囲が狭い」「検出器を離散的に読む」は異なる欠測です。本講では、この三つを分けて、非一意性・一意性・不安定性を直接計算します。

本講では画像を主に複素数値の Schwartz 級関数とし、必要な箇所だけ台がコンパクトな滑らかな関数を使います。実画像の反例が必要なときは実数値に取ります。角度は法線方向を表し、$\theta_\varphi=(\cos\varphi,\sin\varphi)$、$\theta_\varphi^\perp=(-\sin\varphi,\cos\varphi)$、$0\leq\varphi<\pi$ とします。Fourier 変換は

$$
\widehat f(\xi)=\int_{\mathbb R^2}f(x)e^{-ix\cdot\xi}\,dx,\qquad
\mathcal F_s p(\omega)=\int_{\mathbb R}p(s)e^{-i\omega s}\,ds
$$

で、逆変換にはそれぞれ $(2\pi)^{-2}$ と $(2\pi)^{-1}$ が付きます。

## 1. どの観測を失ったのか

[INV12 の平面Radon変換](../INV12/index.md#def-inv12-radon)は

$$
(Rf)(\varphi,s)=\int_{\mathbb R}
f(s\theta_\varphi+t\theta_\varphi^\perp)\,dt
$$

でした。測定する法線角度を連続する一部分に限る場合と、角度を有限個に固定する場合を区別します。以下でそれぞれを定義します。

<a id="def-inv14-angle-data"></a>

<!-- formal-statement-start -->
> **定義（限定角度観測と有限方向観測）**  
> $f\in\mathcal S(\mathbb R^2)$、$0\leq\alpha<\beta<\pi$ とし、$I=(\alpha,\beta)$ と置く。**限定角度観測** $M_I f$ は、$Rf$ の $\varphi\in I$ への制限である。
>
> さらに互いに異なる有限個の角度 $\Phi=\{\varphi_1,\ldots,\varphi_m\}\subset[0,\pi)$ に対する **有限方向観測** $M_\Phi f$ を、$m$ 本の関数 $(Rf)(\varphi_j,\cdot)$ の組とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv14-angle-data -->

**定義の確認**：$I=(0,\pi/3)$ なら $\varphi=\pi/6$ におけるすべての $s$ の投影が含まれますが、$\varphi=\pi/2$ は含まれません。$\Phi=\{0,\pi/2\}$ なら水平・垂直の法線方向の投影二本だけを測ります。どちらも検出器の位置変数 $s$ については全実数の値を知る設定です。角度の欠測と位置の標本化をここで混ぜません。

<!-- definition-example-end -->

どの周波数を直接観測したかは、[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)

$$
\mathcal F_s(Rf)(\varphi,\omega)=\widehat f(\omega\theta_\varphi)
$$

に、実際に使える角度を代入すれば分かります。

<a id="def-inv14-visible-wedge"></a>

<!-- formal-statement-start -->
> **定義（観測周波数領域と欠測扇形）**  
> $I=(\alpha,\beta)\subset(0,\pi)$ に対し、**観測周波数領域**を

$$
W_I=\{\omega\theta_\varphi:\varphi\in I,\ \omega\in\mathbb R\}
$$

> とする。周波数平面の $W_I$ の補集合のうち原点を除く開領域を、**欠測扇形**（missing wedge）と呼ぶ。有限方向 $\Phi$ の観測周波数集合は、$\bigcup_{\varphi\in\Phi}\mathbb R\theta_\varphi$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv14-visible-wedge -->

**定義の確認**：$I=(0,\pi/3)$ では $(1,0)$ から角度 $\pi/6$ へ向いた周波数は観測され、$(0,2)$ は観測されません。$\omega<0$ も含むので、原点を挟んで反対側の扇形も観測されます。$\Phi=\{0,\pi/2\}$ では二本の座標軸だけが観測周波数集合です。

<!-- definition-example-end -->

<a id="ref-inv14-wedge-map"></a>

方向を一本ずつ測ると周波数平面に線が増え、角度が連続区間になると扇形が埋まります。ここでの「見える」は **Fourier slice から周波数値が直接分かる**という意味です。画像を追加仮定から一意に決定できるかは、次の節で別に判定します。

## 2. 有限方向には滑らかでコンパクトな画像でも核がある

一方向だけでは、測定線に沿って正負が打ち消されます。[INV12 の一方向の零データ例](../INV12/index.md#ex-inv12-b04)で現れた接線方向の微分を、有限個の角度へ重ねるのが鍵です。

まず $C_c^\infty(\mathbb R^2)$ は、全ての偏導関数が連続で、関数がある有界な閉領域の外で0になる関数の集合とします。これらは Schwartz 級でもあります。

<a id="thm-inv14-finite-view-kernel"></a>

<!-- formal-statement-start -->
> **定理（有限方向観測の非自明な核）**  
> 相異なる有限方向 $\Phi=\{\varphi_1,\ldots,\varphi_m\}\subset[0,\pi)$（$m\geq1$）に対して、零関数でない実数値 $h\in C_c^\infty(\mathbb R^2)$ が存在し、全ての $j=1,\ldots,m$ と全ての $s\in\mathbb R$ で

$$
(Rh)(\varphi_j,s)=0
$$

> が成り立つ。従って $M_\Phi$ は $C_c^\infty(\mathbb R^2)$ 上でも単射でない。
<!-- formal-statement-end -->

### 証明の見取り図

各方向の接線ベクトル $v_j=\theta_{\varphi_j}^{\perp}$ に沿う方向微分 $D_{v_j}=v_j\cdot\nabla$ を用い、非零の滑らかな山 $g$ から $h=D_{v_1}\cdots D_{v_m}g$ を作ります。方向 $\varphi_j$ で積分すると、一つの $D_{v_j}$ が測定線上の全微分になり、端点値が0になります。さらに、微分を重ねても $h\neq0$ となる山を選べることを Fourier 側で確認します。

<!-- proof-start -->
### 証明

$g\in C_c^\infty(\mathbb R^2)$ を非負かつ零関数でない関数とし、

$$
h=D_{v_1}D_{v_2}\cdots D_{v_m}g,\qquad
D_{v_j}g(x)=\left.\frac{d}{du}g(x+uv_j)\right|_{u=0}
$$

と置きます。定係数偏微分は可換なので、固定した $j$ に対して $h=D_{v_j}q_j$、$q_j=\prod_{k\neq j}D_{v_k}g$ と書けます。$q_j$ もコンパクト台の滑らかな関数です。$x=s\theta_{\varphi_j}+t v_j$ と置くと連鎖律で

$$
(D_{v_j}q_j)(s\theta_{\varphi_j}+t v_j)
=\frac{d}{dt}q_j(s\theta_{\varphi_j}+t v_j).
$$

よって十分大きい $T$ の外では $q_j=0$ だから、

$$
\begin{aligned}
(Rh)(\varphi_j,s)
&=\int_{-\infty}^{\infty}\frac{d}{dt}
q_j(s\theta_{\varphi_j}+tv_j)\,dt\\
&=\lim_{T\to\infty}
[q_j(s\theta_{\varphi_j}+tv_j)]_{t=-T}^{T}=0.
\end{aligned}
$$

残るのは $h\neq0$ の確認です。$\widehat g(0)=\int g(x)\,dx>0$ なので、連続性から原点近くで $\widehat g(\xi)\neq0$ です。有限本の直線 $\{\xi:\xi\cdot v_j=0\}$ の和集合は小円板を埋め尽くしません。そこで全ての $\xi\cdot v_j\neq0$ かつ $\widehat g(\xi)\neq0$ である $\xi$ を取れます。部分積分により

$$
\widehat h(\xi)=i^m\prod_{j=1}^m(\xi\cdot v_j)\widehat g(\xi)\neq0.
$$

Fourier 変換が零でないので $h$ は零関数でありません。実数値性とコンパクト台も構成から保たれます。
<!-- proof-end -->

**具体例**：$\Phi=\{0,\pi/2\}$、$g(x)=e^{-|x|^2}$ のとき、接線微分を二回行うと

$$
\partial_{x_1}\partial_{x_2}g(x)=4x_1x_2e^{-|x|^2}.
$$

これはコンパクト台ではありませんが、Schwartz 級の目に見える反例です。$x_1=s$ の線でも $x_2=s$ の線でも、積分する変数に関して奇関数になるため投影は0です。コンパクト台の厳密な反例は定理の構成が与えます。

有限方向では、**コンパクト台であるという強い仮定を加えても非一意性が残ります**。

## 3. 限定角度で「直接見えない」と「一意でない」は違う

角度を少しずつ連続的に動かせる場合、観測周波数集合 $W_I$ には内部があります。しかし欠測扇形にだけ周波数成分を持つ Schwartz 関数は、まったく観測されません。

<a id="thm-inv14-schwartz-nullspace"></a>

<!-- formal-statement-start -->
> **定理（限定角度の Schwartz 級における非一意性）**  
> $0\leq\alpha<\beta<\pi$、$I=(\alpha,\beta)$ とする。零関数でない実数値 $h\in\mathcal S(\mathbb R^2)$ で $M_Ih=0$ となるものが存在する。従って、コンパクト台を仮定しない Schwartz 級全体で $M_I$ は単射でない。
<!-- formal-statement-end -->

### 証明の見取り図

観測領域の外側に小さな円板を取り、その内部に Fourier 変換を集中させます。実画像にするため反対側の円板にも複素共役対称の成分を置きます。Fourier slice に戻すと、観測した方向では全て0です。

<!-- proof-start -->
### 証明

$W_I$ の閉包の外にある $\xi_0\neq0$ を取ります。これは $\beta-\alpha<\pi$ なので可能です。小円板 $B(\xi_0,r)$ とその反転 $B(-\xi_0,r)$ がいずれも $\overline{W_I}$ と交わらないよう $r>0$ を取ります。実数値の非零関数 $\psi\in C_c^\infty(B(\xi_0,r))$ を選び、

$$
H(\xi)=\psi(\xi)+\psi(-\xi)
$$

とします。$H$ は実数値、偶関数、非零で、観測領域の上では0です。二次元 Fourier 逆変換により

$$
h(x)=\frac1{(2\pi)^2}\int_{\mathbb R^2}
H(\xi)e^{ix\cdot\xi}\,d\xi
$$

を定義します。$H(-\xi)=H(\xi)$ だから $h$ は実数値です。$H$ と全導関数がコンパクト台を持つことから、上式を $x$ で任意回微分でき、さらに $\xi$ について部分積分すると、任意の非負整数 $a_1,a_2,b_1,b_2$ に対して $x_1^{a_1}x_2^{a_2}\partial_{x_1}^{b_1}\partial_{x_2}^{b_2}h(x)$ が有界です。従って $h\in\mathcal S$ です。

[Schwartz 級の二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)により $\widehat h=H\neq0$ なので $h\neq0$。一方、$\varphi\in I$、$\omega\in\mathbb R$ では $H(\omega\theta_\varphi)=0$ だから、[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)より

$$
\mathcal F_s(Rh)(\varphi,\omega)=0.
$$

各 $\varphi$ に対して $s\mapsto Rh(\varphi,s)$ は Schwartz 級なので、一次元 Fourier 反転によって $Rh(\varphi,s)=0$ が全 $s$ で成立します。
<!-- proof-end -->

この反例は長い距離まで尾を持つ画像です。撮影対象の範囲が厳密に分かっている場合には、結論が変わります。

### コンパクト台ならなぜ一意に決まるか

コンパクト台の画像 $f$ では、$\widehat f$ の周波数変数による展開を何回でも行えます。欠測扇形の値を単に「任意に置ける」わけではありません。次の定理は、**一意に決まる**ことと**安全に計算できる**ことが別であることを示す出発点です。

<a id="thm-inv14-compact-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（コンパクト台の限定角度一意性）**  
> $0\leq\alpha<\beta<\pi$、$I=(\alpha,\beta)$ とする。$f_1,f_2\in C_c^\infty(\mathbb R^2)$ が全ての $\varphi\in I$ と $s\in\mathbb R$ で $Rf_1(\varphi,s)=Rf_2(\varphi,s)$ を満たすなら、$f_1=f_2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

差 $h=f_1-f_2$ の Fourier 変換は観測扇形で0です。コンパクト台により、周波数を任意の直線に沿って動かしたときの Fourier 変換が、その直線の一点の周囲で**無限半径の冪級数**として表せます。扇形の中の小長方形から一座標ずつこの展開を伸ばし、平面全体で0と示します。複素関数論の大きな定理は使いません。

<!-- proof-start -->
### 証明

$h=f_1-f_2\in C_c^\infty$ とします。[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)と観測データの等しさより $\widehat h=0$ が $W_I$ 上で成立します。$I$ が空でない開区間なので、$W_I$ には原点以外の開集合があり、ある実数 $a<b$、$c<d$ について長方形

$$
Q=(a,b)\times(c,d)\subset W_I
$$

が取れます。$h$ は半径 $R$ の円板の外で0になるとします。

固定した $\eta\in(c,d)$、$\xi_0\in(a,b)$ について、任意の $t\in\mathbb R$ で

$$
\begin{aligned}
\widehat h(\xi_0+t,\eta)
&=\int h(x)e^{-i(\xi_0x_1+\eta x_2)}e^{-itx_1}\,dx\\
&=\sum_{k=0}^{\infty}\frac{(-it)^k}{k!}
\int x_1^k h(x)e^{-i(\xi_0x_1+\eta x_2)}\,dx.
\end{aligned}
$$

この和と積分の交換は、台上の $|x_1|\leq R$ と $\int|h|<\infty$ により、絶対値の総和が $e^{|t|R}\int|h|$ 以下になることで正当化されます。$\widehat h(\xi_0+t,\eta)$ は $t$ が $0$ 付近の小区間にあると0なので、この冪級数の全係数は0です（順次微分して $t=0$ を代入してもよい）。従って $\widehat h(\xi_1,\eta)=0$ が全ての実数 $\xi_1$ で成立します。

次に任意の $\xi_1\in\mathbb R$ を固定し、$\eta_0\in(c,d)$ を取り、同じ議論で $e^{-itx_2}$ を展開します。$\widehat h(\xi_1,\eta_0+t)$ は $\eta_0+t\in(c,d)$ で0なので、全ての実数 $t$ で0です。よって $\widehat h(\xi)=0$ が $\mathbb R^2$ 全体で成立します。

最後に [Schwartz 級の二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)を適用すれば $h=0$、すなわち $f_1=f_2$ です。
<!-- proof-end -->

ここで保証されたのは、**無限精度の連続角度データ**からの一意性です。欠測扇形の周波数値を得るには、観測された値から冪級数の係数を推測し、その展開を大きく延ばす必要があります。小さな観測誤差への頑健性は、まだ何も示していません。

## 4. 一意でも安定には復元できない

「一意なら逆演算が実用的」という推論を、コンパクト台のまま否定します。観測されない向きの高周波を、固定された滑らかな物体へ掛け合わせます。

<a id="thm-inv14-severe-instability"></a>

<!-- formal-statement-start -->
> **定理（コンパクト台でも限定角度逆問題は極端に不安定）**  
> $0\leq\alpha<\beta<\pi$、$I=(\alpha,\beta)$ とする。ある非零 $g\in C_c^\infty(\mathbb R^2)$ と単位ベクトル $u$ を選び、各整数 $n\geq1$ について $h_n(x)=e^{in u\cdot x}g(x)$ と置くと、

$$
\|h_n\|_{L^2(\mathbb R^2)}=\|g\|_{L^2(\mathbb R^2)}>0,
\qquad
\|M_Ih_n\|_{L^2(I\times\mathbb R)}=O(n^{-K})
$$

> が**任意の** $K>0$ について成り立つようにできる。従って $C_c^\infty$ 上の逆問題には、この二つの $L^2$ ノルムに関する一様な安定定数は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ は観測した直線のどれからも正の角度だけ離して選びます。$e^{inu\cdot x}$ を掛けると周波数領域では $\widehat g$ が $nu$ だけ平行移動します。観測線からの距離が $n$ とともに増え、$\widehat g$ の急減少性が作用します。しかし空間での絶対値は $|h_n|=|g|$ のままです。

<!-- proof-start -->
### 証明

$I$ の閉包で得る直線全体の外側から、単位ベクトル $u$ を選びます。コンパクト性から

$$
q=\sup_{\varphi\in[\alpha,\beta]}|u\cdot\theta_\varphi|<1
$$

です。$\omega\in\mathbb R$、$n\geq1$ について、$2n|\omega|\leq n^2+\omega^2$ を使うと

$$
\begin{aligned}
|\omega\theta_\varphi-nu|^2
&=\omega^2+n^2-2n\omega(u\cdot\theta_\varphi)\\
&\geq\omega^2+n^2-2q n|\omega|\\
&\geq(1-q)(\omega^2+n^2).
\end{aligned}
$$

$g\in C_c^\infty$ とすれば部分積分を繰り返して、任意の整数 $N\geq1$ に対して $|\widehat g(\zeta)|\leq C_N(1+|\zeta|)^{-N}$ です。また指数を掛けた Fourier 変換は $\widehat h_n(\xi)=\widehat g(\xi-nu)$ となります。

[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)と一次元 [Plancherel の公式](../../FOU/FOU4/index.md#thm-fou4-parseval)を角度ごとに適用すると、

$$
\begin{aligned}
\|M_Ih_n\|^2_{L^2(I\times\mathbb R)}
&=\frac1{2\pi}\int_\alpha^\beta\int_{\mathbb R}
|\widehat h_n(\omega\theta_\varphi)|^2\,d\omega\,d\varphi\\
&=\frac1{2\pi}\int_\alpha^\beta\int_{\mathbb R}
|\widehat g(\omega\theta_\varphi-nu)|^2\,d\omega\,d\varphi\\
&\leq C'_N\int_{\mathbb R}(n^2+\omega^2)^{-N}\,d\omega.
\end{aligned}
$$

$n\geq1$ で右辺の定数 $C'_N$ は $n$ に依存しません。$\omega=nt$ と置けば

$$
\int_{\mathbb R}(n^2+\omega^2)^{-N}\,d\omega
=n^{1-2N}\int_{\mathbb R}(1+t^2)^{-N}\,dt.
$$

$N\geq1$ なら最後の積分は有限で、$\|M_Ih_n\|\leq C''_N n^{1/2-N}$ です。$N$ は任意に大きく取れるので、所望の $O(n^{-K})$ を得ます。一方、

$$
\|h_n\|_2^2=\int|e^{inu\cdot x}|^2|g(x)|^2\,dx=\|g\|_2^2
$$

は常に正です。もし定数 $C$ が $\|h\|_2\leq C\|M_Ih\|_2$ を全ての $h\in C_c^\infty$ に対し満たせば、$h=h_n$ として右辺が0へ収束し、矛盾します。
<!-- proof-end -->

上の構成では複素指数を使って計算を簡単にしました。実数値関数が必要なら、実数値の $g$ に対して $\Re h_n=g(x)\cos(nu\cdot x)$ と $\Im h_n=g(x)\sin(nu\cdot x)$ の少なくとも一方は $L^2$ ノルムが $\|g\|_2/\sqrt2$ 以上であり、観測ノルムは両方とも上の上界以下です。従って実画像でも安定性の反例になります。

これは [INV1 の安定性と識別可能性の区別](../INV1/index.md#def-inv1-hadamard)に対応します。コンパクト台なら一意でも、小さいデータの変化が大きい画像の差に対応し得るのです。

## 5. 欠測周波数を0と置く再構成とその誤差

欠測扇形は直接観測できません。最も単純な処置は「得た Fourier 値だけを使い、残りを0と置く」ことです。これを一意性の定理と混同しないため、作用素として定義して誤差を計算します。

<a id="def-inv14-zero-filling"></a>

<!-- formal-statement-start -->
> **定義（欠測周波数の零埋め再構成）**  
> $f\in\mathcal S(\mathbb R^2)$、$I=(\alpha,\beta)$ に対して、**零埋め再構成** $Z_I f\in L^2(\mathbb R^2)$ を、周波数領域で

$$
\widehat{Z_I f}(\xi)=\mathbf1_{W_I}(\xi)\widehat f(\xi)
$$

> と定める。ただし $\mathbf1_{W_I}$ は集合 $W_I$ 上で1、それ以外で0の関数である。境界上の値は $L^2$ では問題にならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv14-zero-filling -->

**定義の確認**：$I=(0,\pi/3)$、$\widehat f$ が $\xi_0=(0,2)$ の近くの小円板にのみ台を持つ Schwartz 関数なら、その円板は $W_I$ の外なので $\widehat{Z_If}=0$ となり、$Z_If=0$ です。反対に $\widehat f$ の台が $W_I$ の内部だけなら $Z_If=f$ です。いずれも掛け算する指示関数を実際に確認しています。

<!-- definition-example-end -->

<a id="prop-inv14-zero-filling-error"></a>

<!-- formal-statement-start -->
> **命題（零埋めの誤差は欠測領域の Fourier エネルギー）**  
> $f\in\mathcal S(\mathbb R^2)$ に対し、二次元 Fourier 規約を上記の通り定めると、

$$
\|f-Z_I f\|_{L^2(\mathbb R^2)}^2
=\frac1{(2\pi)^2}\int_{\mathbb R^2\setminus W_I}
|\widehat f(\xi)|^2\,d\xi.
$$

> 特に $Z_I f$ は観測した周波数の値を正しく再現するが、一般には $f$ と一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

観測領域では差の Fourier 変換が0で、欠測領域では差が $\widehat f$ そのものになります。二次元 Plancherel の係数を明示して積分します。

<!-- proof-start -->
### 証明

[二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)と [Plancherel の公式](../../FOU/FOU4/index.md#thm-fou4-parseval)を二変数に適用し、

$$
\begin{aligned}
\|f-Z_If\|_2^2
&=\frac1{(2\pi)^2}\|\widehat f-\widehat{Z_If}\|_2^2\\
&=\frac1{(2\pi)^2}\int_{\mathbb R^2}
|(1-\mathbf1_{W_I}(\xi))\widehat f(\xi)|^2\,d\xi\\
&=\frac1{(2\pi)^2}\int_{\mathbb R^2\setminus W_I}
|\widehat f(\xi)|^2\,d\xi.
\end{aligned}
$$

指示関数の境界の違いは零測度集合なので $L^2$ 等式を変えません。
<!-- proof-end -->

コンパクト台の画像でも周波数の欠測エネルギーは一般に正です。**一意性の定理は、その値を0に埋めてよいとは主張していません**。実画像の再構成では境界の鋭い遮断が方向に依存した振動や線状の模様を生む場合がありますが、ここでは特定の artifact を分類する一般定理を主張しません。

**線状の模様が生まれる幾何学的理由**：[単純逆投影](../INV13/index.md#def-inv13-backprojection)は、投影値 $g(\varphi,s)$ を直線 $x\cdot\theta_\varphi=s$ 上の全点へ配り直します。例えば中心 $x_0$ の Gaussian $f_a(x)=e^{-a|x-x_0|^2}$ の投影は

$$
(Rf_a)(\varphi,s)=\sqrt{\pi/a}\,
e^{-a(s-x_0\cdot\theta_\varphi)^2}.
$$

固定角度の逆投影値は、$x\cdot\theta_\varphi=x_0\cdot\theta_\varphi$ を満たす直線全体で最大になります。多数の角度があれば重ね合わせ・フィルタ処理で方向が補われますが、方向が不足すると偏った線状の寄与が目立ちます。これは直接計算した機構の説明であり、どの特異性がどこへ伝播するかの完全な定理ではありません。

## 6. 角度の有限化と検出器の標本化は別の損失

有限方向 $\Phi$ では、各角度の $s$ をどれほど細かく測っても、定理で作った非零の $h$ が核に残ります。一方、同じ角度で検出器を離散的に読む場合には $s$ 方向の別の情報落ちが起きます。

<a id="def-inv14-detector-sampling"></a>

<!-- formal-statement-start -->
> **定義（等間隔検出器標本）**  
> $p:\mathbb R\to\mathbb C$ と $\Delta>0$ に対し、**等間隔検出器標本**を列 $(p(k\Delta))_{k\in\mathbb Z}$ とする。Radon データの場合、固定角度 $\varphi$ で $p(s)=(Rf)(\varphi,s)$ と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv14-detector-sampling -->

**定義の確認**：$p(s)=e^{-s^2}$、$q(s)=e^{-s^2}\cos(2\pi s/\Delta)$ はともに Schwartz 級で、どの整数 $k$ でも

$$
q(k\Delta)=e^{-(k\Delta)^2}\cos(2\pi k)=p(k\Delta).
$$

しかし $s=\Delta/2$ では $q(s)=-p(s)$ です。従って、一般の滑らかな一次元投影関数を格子点の値だけから一意に決めることはできません。

<!-- definition-example-end -->

この例は一次元の標本化の曖昧さを示すものであり、二つの関数が必ず同じ二次元画像の Radon 投影として同時に実現できる、とは主張していません。周波数を制限した信号の標本化定理を適用する際には、その帯域制限を別途確かめる必要があります。コンパクト台の非零画像に厳密な有限 Fourier 帯域を同時に仮定することもできません（第3節の冪級数による議論から従います）。

半径 $\rho$ の周波数円上で角度を $\Delta\varphi$ だけ離して測ると、隣り合う周波数標本の距離は

$$
2\rho\sin(\Delta\varphi/2)
$$

です。$\rho$ が大きいほど隙間は広がるので、有限 view で高い空間分解能を得たい場合、角度方向の情報不足がより問題になります。これは幾何学的な間隔の式であり、単独で完全な標本化定理を与えるものではありません。

## 7. 演習：観測不能・一意性・不安定性を分けて検算する

### Level A：定義と直接計算

<a id="ex-inv14-a01"></a>

### INV14-A01 二方向で消える Gaussian 微分

- Level: A

$g(x)=e^{-(x_1^2+x_2^2)}$、$h=\partial_{x_1}\partial_{x_2}g$ とする。$h$ を計算し、$\varphi=0,\pi/2$ の両方向で $Rh(\varphi,s)=0$ を全 $s$ について直接確かめよ。

<!-- solution-start -->
#### 詳細解答

まず $\partial_{x_2}g=-2x_2g$、続けて $\partial_{x_1}(-2x_2g)=4x_1x_2g$ だから

$$
h(x)=4x_1x_2e^{-x_1^2-x_2^2}.
$$

$\varphi=0$ では $x=(s,t)$ なので

$$
(Rh)(0,s)=4s e^{-s^2}\int_\mathbb R te^{-t^2}\,dt=0.
$$

$\varphi=\pi/2$ では $x=(-t,s)$ なので

$$
(Rh)(\pi/2,s)=-4s e^{-s^2}\int_\mathbb R te^{-t^2}\,dt=0.
$$

どちらも積分する変数の奇関数性を使いました。$h(1,1)=4e^{-2}\neq0$ なので零関数ではありません。
<!-- solution-end -->

<a id="ex-inv14-a02"></a>

### INV14-A02 観測周波数集合を描く代わりに判定する

- Level: A

$I=(0,\pi/3)$ とする。$\xi=(\sqrt3,1)$、$\eta=(0,2)$、$\zeta=(-\sqrt3,-1)$ はそれぞれ $W_I$ に属するか判定し、$\omega$ と $\varphi$ の取り方を示せ。

<!-- solution-start -->
#### 詳細解答

$\xi$ の偏角は $\pi/6$、長さは2なので $\xi=2\theta_{\pi/6}\in W_I$ です。$\zeta=-2\theta_{\pi/6}$ は同じ観測直線上にあり、$\omega=-2$ として属します。

$\eta=(0,2)$ の方向角は $\pi/2$ で、負の $\omega$ なら角度が $3\pi/2$ となります。どちらも $(0,\pi/3)$ またはその反対向きに該当しないため $\eta\notin W_I$ です。負の周波数も使えることと、任意の方向が使えることは別です。
<!-- solution-end -->

<a id="ex-inv14-a03"></a>

### INV14-A03 高周波の観測線からの距離

- Level: A

$I=(0,\pi/6)$、$u=(0,1)$ とする。任意の $\varphi\in I$ と $\omega\in\mathbb R$ について、点 $nu$ から直線 $\mathbb R\theta_\varphi$ までの距離を求め、$\sqrt3 n/2$ 以上であることを示せ。

<!-- solution-start -->
#### 詳細解答

$\{\theta_\varphi,\theta_\varphi^\perp\}$ は正規直交基底なので、$nu$ の接線方向成分の絶対値が直線までの距離です。

$$
\operatorname{dist}(nu,\mathbb R\theta_\varphi)
=|nu\cdot\theta_\varphi^\perp|
=n|\cos\varphi|.
$$

$0<\varphi<\pi/6$ で $\cos\varphi>\cos(\pi/6)=\sqrt3/2$ なので、要求する下界が成り立ちます。周波数が高くなるほど観測線から遠ざかります。
<!-- solution-end -->

<a id="ex-inv14-a04"></a>

### INV14-A04 零埋めの誤差係数

- Level: A

$\widehat f$ の台が $\mathbb R^2\setminus W_I$ に入る非零 Schwartz 関数 $f$ を考える。$Z_I f$、$\|f-Z_If\|_2^2$ を $\widehat f$ で表し、$(2\pi)$ の指数を確認せよ。

<!-- solution-start -->
#### 詳細解答

台の仮定より $\mathbf1_{W_I}\widehat f=0$ なので、[零埋めの定義](#def-inv14-zero-filling)から $Z_If=0$ です。[零埋めの誤差は欠測領域のFourierエネルギー](#prop-inv14-zero-filling-error)を使うと

$$
\|f-Z_If\|_2^2=\|f\|_2^2
=\frac1{(2\pi)^2}\int_{\mathbb R^2}|\widehat f(\xi)|^2\,d\xi>0.
$$

前向き Fourier 変換に正規化係数がなく、二次元逆変換に $(2\pi)^{-2}$ があるため、二乗ノルムの Plancherel 係数も $(2\pi)^{-2}$ です。
<!-- solution-end -->

<a id="ex-inv14-a05"></a>

### INV14-A05 検出器格子での別信号

- Level: A

$\Delta>0$、$p(s)=e^{-s^2}$、$q(s)=e^{-s^2}\cos(2\pi s/\Delta)$ とする。$p(k\Delta)=q(k\Delta)$ を示し、$s=\Delta/2$ における差を計算せよ。

<!-- solution-start -->
#### 詳細解答

整数 $k$ について $\cos(2\pi k)=1$ だから $q(k\Delta)=e^{-(k\Delta)^2}=p(k\Delta)$。しかし

$$
q(\Delta/2)=e^{-\Delta^2/4}\cos\pi=-e^{-\Delta^2/4},
\quad p(\Delta/2)=e^{-\Delta^2/4}
$$

なので

$$
p(\Delta/2)-q(\Delta/2)=2e^{-\Delta^2/4}>0.
$$

滑らかさだけでは格子標本からの一意復元を保証できません。
<!-- solution-end -->

### Level B：証明と仮定の意味を確かめる

<a id="ex-inv14-b01"></a>

### INV14-B01 任意の有限角度に共通する零投影

- Level: B

任意の有限集合 $\Phi=\{\varphi_1,\ldots,\varphi_m\}$ と、$\int g>0$ を満たす実数値 $g\in C_c^\infty$ について、$h=\prod_j(\theta_{\varphi_j}^\perp\cdot\nabla)g$ と置く。各投影が0となる理由と、$h$ が零関数でない理由を別々に証明せよ。

<!-- solution-start -->
#### 詳細解答

$v_j=\theta_{\varphi_j}^\perp$ とする。固定した $j$ について偏微分は可換なので $h=D_{v_j}q_j$、$q_j=\prod_{k\neq j}D_{v_k}g$ です。$x=s\theta_{\varphi_j}+tv_j$ と置けば $D_{v_j}q_j(x)=\frac d{dt}q_j(x)$ です。$q_j$ はコンパクト台を持つため、$t\to\pm\infty$ で0となり、

$$
(Rh)(\varphi_j,s)=\int_{\mathbb R}\frac d{dt}q_j(s\theta_{\varphi_j}+tv_j)\,dt=0.
$$

一方、$\widehat g(0)=\int g>0$ であり、$\widehat g$ は連続です。原点近くで $\widehat g\neq0$ となる点のうち、有限本の直線 $\xi\cdot v_j=0$ のどれにも乗らない $\xi$ を選べます。すると

$$
\widehat h(\xi)=\prod_{j=1}^m(i\xi\cdot v_j)\widehat g(\xi)\neq0.
$$

従って $h\neq0$ です。単に「微分を重ねたから非零」とは言えない点が重要です。
<!-- solution-end -->

<a id="ex-inv14-b02"></a>

### INV14-B02 コンパクト台の仮定はどこで効いたか

- Level: B

$h\in C_c^\infty(\mathbb R^2)$、$\widehat h=0$ が開長方形 $(a,b)\times(c,d)$ 上で成り立つとする。$h$ の台が $|x|\le R$ にあることを使い、$\widehat h=0$ が全周波数で成立することを、二回の一変数冪級数展開から示せ。

<!-- solution-start -->
#### 詳細解答

$\xi_0\in(a,b)$ と $\eta\in(c,d)$ を固定すると

$$
\widehat h(\xi_0+t,\eta)
=\sum_{k=0}^\infty \frac{(-it)^k}{k!}
\int x_1^k h(x)e^{-i(\xi_0x_1+\eta x_2)}\,dx.
$$

$|x_1|\le R$ なので総和と積分の交換は $e^{R|t|}\int|h|$ による優越から正当化できます。$t$ が十分小さい区間では左辺は0です。よって各係数が0となり、無限半径の冪級数によって任意の $t\in\mathbb R$ で $\widehat h(\xi_0+t,\eta)=0$ です。

これで全 $\xi_1\in\mathbb R$、$\eta\in(c,d)$ に対し $\widehat h(\xi_1,\eta)=0$ と分かりました。今度は $\xi_1$ を固定し、$\eta_0\in(c,d)$ の周りで $e^{-itx_2}$ を同じように展開します。左辺は $t$ の小区間で0なので全 $t$ で0。結果 $\widehat h$ は全平面で0となり、[二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)から $h=0$ です。コンパクト台は $e^{R|t|}$ によって**全ての $t$ まで展開を延長できる**ところに使いました。
<!-- solution-end -->

<a id="ex-inv14-b03"></a>

### INV14-B03 観測ノルムは急速に0へ向かう

- Level: B

$I=(0,\pi/6)$、$u=(0,1)$、$g\in C_c^\infty$ は非零とする。$h_n=e^{inu\cdot x}g$ に対し、$|\widehat g(\zeta)|\le C_2(1+|\zeta|)^{-2}$ から $\|M_Ih_n\|_2=O(n^{-3/2})$ を導け。また画像ノルムを求めよ。

<!-- solution-start -->
#### 詳細解答

$\varphi\in I$ では $|u\cdot\theta_\varphi|=\sin\varphi\le1/2$。したがって

$$
|\omega\theta_\varphi-nu|^2
\ge(1-1/2)(\omega^2+n^2)
=\frac12(\omega^2+n^2).
$$

[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)と一次元 [Plancherel の公式](../../FOU/FOU4/index.md#thm-fou4-parseval)による誤差評価は

$$
\begin{aligned}
\|M_Ih_n\|_2^2
&=\frac1{2\pi}\int_I\int_{\mathbb R}
|\widehat g(\omega\theta_\varphi-nu)|^2\,d\omega\,d\varphi\\
&\le C\int_{\mathbb R}(n^2+\omega^2)^{-2}\,d\omega\\
&=C n^{-3}\int_{\mathbb R}(1+t^2)^{-2}\,dt
=O(n^{-3}).
\end{aligned}
$$

平方根を取って $\|M_Ih_n\|_2=O(n^{-3/2})$ を得ます。一方 $|e^{inu\cdot x}|=1$ なので $\|h_n\|_2=\|g\|_2>0$ です。指数の $-3/2$ は、$\omega=nt$ で積分測度が $n$ 倍になることを含めて計算した結果です。
<!-- solution-end -->

<a id="ex-inv14-b04"></a>

### INV14-B04 有限角度の高周波ギャップ

- Level: B

半径 $\rho>0$ の周波数円上で角度差 $\Delta\varphi\in(0,\pi)$ の二つの点 $\rho\theta_\varphi$ と $\rho\theta_{\varphi+\Delta\varphi}$ の距離を導け。$\Delta\varphi$ を固定して $\rho\to\infty$ とするとどうなるか。これだけで標本化の一意性を主張できるか。

<!-- solution-start -->
#### 詳細解答

内積 $\theta_\varphi\cdot\theta_{\varphi+\Delta\varphi}=\cos\Delta\varphi$ を使うと

$$
\begin{aligned}
|\rho\theta_\varphi-\rho\theta_{\varphi+\Delta\varphi}|^2
&=\rho^2+\rho^2-2\rho^2\cos\Delta\varphi\\
&=4\rho^2\sin^2(\Delta\varphi/2).
\end{aligned}
$$

$\Delta\varphi\in(0,\pi)$ では正の平方根を取って $2\rho\sin(\Delta\varphi/2)$。角度差を固定すると $\rho$ に比例して大きくなります。ただしこれは幾何学的な標本間隔であり、観測作用素が特定の関数クラスで単射か、補間が安定か、という数学的結論には追加の仮定が必要です。
<!-- solution-end -->

### Level C：三種類の「不完全」を一つの判断につなぐ

<a id="ex-inv14-c01"></a>

### INV14-C01 観測設計の違いから復元可能性を判定する

- Level: C

$\Phi=\{0,\pi/2\}$、$I=(0,\pi/3)$ とする。以下の問いに答えよ。

1. 有限方向 $\Phi$ の連続位置データに対して、非零の実数値 Schwartz 関数で全観測が0になる例を構成せよ。
2. $f_1,f_2\in C_c^\infty$ なら、$M_I f_1=M_I f_2$ から $f_1=f_2$ が従う論証を、欠測扇形・開長方形・冪級数・Fourier 反転の順で示せ。
3. それにもかかわらず、画像の $L^2$ ノルムを下から一定に保ち、限定角度の観測ノルムを0へ収束させる列を作り、推定の安定性と一意性を区別せよ。
4. $p(s)=e^{-s^2}$ と $q(s)=e^{-s^2}\cos(2\pi s/\Delta)$ の標本値を比較し、これがどの種類の欠測を示し、何を示していないか述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $g(x)=e^{-|x|^2}$ として $h=\partial_{x_1}\partial_{x_2}g=4x_1x_2e^{-|x|^2}$ と置きます。これは非零実数値の Schwartz 関数です。$\varphi=0$ の線 $(s,t)$ では $h=4st e^{-s^2-t^2}$、$\varphi=\pi/2$ の線 $(-t,s)$ では $h=-4st e^{-s^2-t^2}$。いずれも $t$ について奇関数だから積分0です。有限個の方向の核を示したのであり、連続角度 $I$ の核を示したわけではありません。

**2.** $h=f_1-f_2$ とすれば、[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)により $\widehat h$ は $W_I$ 上で0です。$I$ が開区間なので $W_I$ の内部から長方形 $(a,b)\times(c,d)$ を取れます。$h$ はコンパクト台なので、$\widehat h(\xi_0+t,\eta)$ を

$$
\sum_{k=0}^{\infty}\frac{(-it)^k}{k!}
\int x_1^k h(x)e^{-i(\xi_0x_1+\eta x_2)}\,dx
$$

と全ての実数 $t$ に対して展開できます。台上の $|x_1|\le R$ により、係数の絶対値和は $e^{R|t|}\int|h|$ 以下です。小さい $t$ の範囲で0なので係数がすべて0、従って固定した $\eta\in(c,d)$ について全ての $\xi_1$ で0です。続けて $x_2$ に関する同じ展開を行うと $\widehat h$ は全平面で0になります。[二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)より $h=0$ です。

**3.** 欠測方向 $u=(0,1)$、非零 $g\in C_c^\infty$ を選び、$h_n=e^{inu\cdot x}g$ とします。$0\le\varphi\le\pi/3$ では $|u\cdot\theta_\varphi|=\sin\varphi\le\sqrt3/2<1$。従って

$$
|\omega\theta_\varphi-nu|^2
\ge(1-\sqrt3/2)(\omega^2+n^2).
$$

$\widehat h_n(\xi)=\widehat g(\xi-nu)$ と Schwartz 急減少性を [Fourier slice theorem](../INV12/index.md#thm-inv12-slice)・[Plancherel](../../FOU/FOU4/index.md#thm-fou4-parseval)へ代入すると、各 $N\ge1$ について

$$
\|M_Ih_n\|_2^2\le C_N n^{1-2N}.
$$

$N=2$ でも右辺は0へ収束します。しかし $\|h_n\|_2=\|g\|_2>0$ です。第2問の一意性に反しません。各 $h_n$ 自体の観測は0ではなく、0に**近づく**だけだからです。

**4.** 全ての整数 $k$ で $\cos(2\pi k)=1$ なので $p(k\Delta)=q(k\Delta)$。$s=\Delta/2$ では $p=e^{-\Delta^2/4}$、$q=-e^{-\Delta^2/4}$ と異なります。これは位置変数 $s$ の標本化による曖昧さの一次元例です。有限方向での Radon 変換の非一意性や、コンパクト台画像についての限定角度の一意性への反例をそのまま与えるものではありません。
<!-- solution-end -->

## 8. 何を測れば何が改善するか

ここまでの結論は三通りです。

- **有限方向**：位置 $s$ を連続的に測っても、コンパクト台の滑らかな画像に非零の核があります。方向そのものを追加するか、未知画像を有限次元モデルなどへ制限する必要があります。
- **連続的な限定角度**：一般の Schwartz 級では欠測扇形に支持された周波数成分が消えます。コンパクト台なら一意ですが、欠測方向の高周波に対して任意に悪い条件になるため、単なる高精度計算では克服できません。
- **検出器の離散標本**：同じ方向でも位置変数の情報が不足します。標本化間隔を細かくすることと、観測角度の範囲を広げることは異なる対策です。

実際の復元では、[INV13 の周波数切断による正則化](../INV13/index.md#def-inv13-cutoff)と同じように、どの情報を捨てるか、どの事前仮定を使うか、得た画像にどんな偏りがあるかを併記します。次の INV15 では、この事前仮定を確率分布として明示し、Gaussian 事前分布と観測ノイズから復元値をどのように決めるかを導きます。
