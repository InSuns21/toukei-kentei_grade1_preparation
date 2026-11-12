# INV12 Radon変換は何を測っているか

[INV1 の逆問題](../INV1/index.md)では、未知量から観測を作る写像をまず定め、観測から未知量を戻せるかを調べました。[INV5 の正則化](../INV5/index.md#thm-inv5-tikhonov-minimizer)では、戻す操作が不安定な場合に備えました。ここでは「そもそも、画像の内部を通過した一本の測定線から何が分かるか」を数式にします。

平面上の濃度 $f(x_1,x_2)$ が与えられたとき、一本の直線に沿って $f$ を足し合わせた値を測定すると考えます。直線を動かし、向きも変えて集めたデータを、この講義で定義する線積分の変換によって表します。一枚の画像そのものではなく、線ごとの積分値の表が観測されます。次に、その表を一次元 Fourier 変換すると、元画像の二次元 Fourier 変換の一本の直線上の値になることを示します。

本講の問いは「何を測り、周波数のどこが分かるか」です。反転のための周波数重み・逆投影・雑音処理は次講 INV13 で導出します。

## 1. 一本の測定線を二つの数で指定する

角度 $\varphi\in\mathbb R$ に対し、単位法線とそれに直交する単位接線方向を

$$
\theta_\varphi=(\cos\varphi,\sin\varphi),
\qquad
\theta_\varphi^\perp=(-\sin\varphi,\cos\varphi)
$$

とします。どちらも長さ1で、内積は0です。したがってこの二つは平面の正規直交基底を作ります。法線方向の座標が $s$ の点を集めた直線は

$$
L(\varphi,s)=\{x\in\mathbb R^2:x\cdot\theta_\varphi=s\}
=\{s\theta_\varphi+t\theta_\varphi^\perp:t\in\mathbb R\}.
$$

右辺で $t$ を動かすと $x\cdot\theta_\varphi=s$ が保たれます。逆に左辺のどの点も、正規直交基底による展開

$$
x=(x\cdot\theta_\varphi)\theta_\varphi+
(x\cdot\theta_\varphi^\perp)\theta_\varphi^\perp
$$

から右辺に書けます。パラメータ $t$ の増分がそのまま直線上の距離の増分となるのは、$\|\theta_\varphi^\perp\|=1$ だからです。

角度と符号には重複があります。$\theta_{\varphi+\pi}=-\theta_\varphi$ なので、$L(\varphi+\pi,s)=L(\varphi,-s)$ です。重複しない向きの代表として通常 $0\le\varphi<\pi$ を使います。

### 積分が確実に定義できる関数から始める

直線上で積分し、その積分をさらに Fourier 変換するには、無限遠での減衰を確認する必要があります。まず十分滑らかで、関数と全ての偏導関数が多項式の逆数より速く減る関数に限定します。

<a id="def-inv12-schwartz"></a>

<!-- formal-statement-start -->
> **定義（本講で用いる急減少関数）**  
> $f:\mathbb R^2\to\mathbb C$ が任意回連続偏微分可能で、任意の非負整数 $N$ と偏微分回数を表す非負整数の組 $\beta=(\beta_1,\beta_2)$ に対し、ある有限定数 $C_{N,\beta}$ が存在して、全ての $x\in\mathbb R^2$ で

$$
|\partial_1^{\beta_1}\partial_2^{\beta_2}f(x)|
\le C_{N,\beta}(1+|x|)^{-N}
$$

> を満たすとき、$f$ は **Schwartz 級**に属するといい、$f\in\mathcal S(\mathbb R^2)$ と書く。ここで $|x|=\sqrt{x_1^2+x_2^2}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv12-schwartz -->

**定義の確認**：$f(x)=e^{-|x|^2}$ を考えます。偏導関数を取るたびに多項式が掛かるので、任意の $\beta$ に対し $\partial^\beta f=P_\beta(x)e^{-|x|^2}$ となります。$P_\beta$ の次数を $d$ とすれば、ある $C$ について $|P_\beta(x)|\le C(1+|x|)^d$。ゆえに

$$
(1+|x|)^N|\partial^\beta f(x)|
\le C(1+|x|)^{N+d}e^{-|x|^2}
$$

です。右辺は連続で、$|x|\to\infty$ で0に近づくので上に有界です。全ての $N,\beta$ を確認でき、$f\in\mathcal S(\mathbb R^2)$ です。定数関数 $f\equiv1$ は $N=1$ の条件を満たさず、このクラスには入りません。

<!-- definition-example-end -->

## 2. Radon変換：各直線上の積分を記録する

直線 $L(\varphi,s)$ に沿って濃度を足し合わせます。積分変数 $t$ は直線上の距離をそのまま表す座標です。

<a id="def-inv12-radon"></a>

<!-- formal-statement-start -->
> **定義（平面Radon変換）**  
> $f\in\mathcal S(\mathbb R^2)$、$\varphi\in\mathbb R$、$s\in\mathbb R$ とする。このとき $f$ の **Radon変換** $Rf$ を

$$
(Rf)(\varphi,s)
=\int_{\mathbb R}f(s\theta_\varphi+t\theta_\varphi^\perp)\,dt
$$

> で定める。$\varphi$ を固定して $s$ を変えた値の列は、その向きの平行な直線群から得られる投影データである。
<!-- formal-statement-end -->

上式は絶対収束します。実際、直交性から

$$
|s\theta_\varphi+t\theta_\varphi^\perp|
=\sqrt{s^2+t^2},
$$

急減少性を $N=3$ に適用すれば、積分の絶対値は定数倍の $(1+\sqrt{s^2+t^2})^{-3}$ で抑えられ、$|t|\to\infty$ で可積分です。関数の値だけではなく積分の存在まで確認して初めて測定モデルになります。

<!-- definition-example-start: def-inv12-radon -->

**定義の確認**：Gaussian $f(x)=e^{-|x|^2}$ に対して、正規直交基底で座標を表すと

$$
f(s\theta_\varphi+t\theta_\varphi^\perp)
=e^{-(s^2+t^2)}
=e^{-s^2}e^{-t^2}.
$$

したがって Gaussian 積分 $\int_{\mathbb R}e^{-t^2}dt=\sqrt\pi$ を使い

$$
(Rf)(\varphi,s)
=e^{-s^2}\int_{\mathbb R}e^{-t^2}dt
=\sqrt\pi\,e^{-s^2}.
$$

角度によらないのは、元の関数が回転しても変わらないからです。これが直接の線積分計算です。

<!-- definition-example-end -->

幾何をもう一つ確認します。$f=1_{\{|x|\le a\}}$ は Schwartz 級ではありませんが、各直線上の積分は定義できます。$|s|<a$ なら円盤と直線の交わりは $t^2\le a^2-s^2$、つまり長さ $2\sqrt{a^2-s^2}$ の線分です。このため

$$
(Rf)(\varphi,s)=
\begin{cases}
2\sqrt{a^2-s^2},&|s|<a,\\
0,&|s|\ge a.
\end{cases}
$$

これは**線積分だけ**の幾何学的な例です。後で証明する Schwartz 級向けの微分・反転に、この不連続関数を仮定確認なしに代入することはしません。

### 方向と位置の表を sinogram として読む

向き $\varphi$ を縦軸、直線の位置 $s$ を横軸に並べた二変数の観測データを考えます。特に、点に近い局在した濃度の中心が $a\in\mathbb R^2$ にあると、観測の山は $s=a\cdot\theta_\varphi$ に移動します。

<a id="def-inv12-sinogram"></a>

<!-- formal-statement-start -->
> **定義（sinogram）**  
> $f\in\mathcal S(\mathbb R^2)$ の Radon データを、角度と法線方向の位置を座標とする関数

$$
(\varphi,s)\longmapsto(Rf)(\varphi,s),
\qquad 0\le\varphi<\pi,\quad s\in\mathbb R
$$

> として並べたものを **sinogram** という。元の平面座標 $(x_1,x_2)$ を描いた画像とは別のデータ表示である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv12-sinogram -->

**定義の確認**：$f_a(x)=e^{-|x-a|^2}$ とします。基底成分を $a_\parallel=a\cdot\theta_\varphi$、$a_\perp=a\cdot\theta_\varphi^\perp$ と書けば

$$
|s\theta_\varphi+t\theta_\varphi^\perp-a|^2
=(s-a_\parallel)^2+(t-a_\perp)^2.
$$

$t-a_\perp$ を新しい積分変数に取ると

$$
(Rf_a)(\varphi,s)
=\sqrt\pi\,e^{-(s-a\cdot\theta_\varphi)^2}.
$$

特に $a=(c,0)$ なら山の位置は $s=c\cos\varphi$ です。角度に対して正弦波状に動くので、sinogram という名前の意味が見えます。$\varphi$ は山の座標ではなく、測定線の法線方向を指定しています。

<!-- definition-example-end -->

## 3. データの対称性と全量保存

一本の幾何学的直線を二通りで指定しても、積分値は変わりません。また全ての平行線の測定値を足せば、元の平面全体にある濃度の総量になります。この二つは測定データに対する検算式です。

<a id="prop-inv12-symmetry-mass"></a>

<!-- formal-statement-start -->
> **命題（方向反転対称性と投影の総量）**  
> $f\in\mathcal S(\mathbb R^2)$ とすると、任意の $\varphi,s\in\mathbb R$ について

$$
(Rf)(\varphi+\pi,s)=(Rf)(\varphi,-s)
$$

> である。さらに任意の $\varphi\in\mathbb R$ について

$$
\int_{\mathbb R}(Rf)(\varphi,s)\,ds
=\int_{\mathbb R^2}f(x)\,dx
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

対称性は二つの基底ベクトルの符号を同時に反転し、積分変数を $t\mapsto-t$ と取り直します。総量は直交座標の変数変換で Jacobian の絶対値が1であることから従います。

<!-- proof-start -->
### 証明

$\theta_{\varphi+\pi}=-\theta_\varphi$ および $\theta_{\varphi+\pi}^\perp=-\theta_\varphi^\perp$ により

$$
\begin{aligned}
(Rf)(\varphi+\pi,s)
&=\int_{\mathbb R}f(-s\theta_\varphi-t\theta_\varphi^\perp)\,dt\\
&=\int_{\mathbb R}f(-s\theta_\varphi+u\theta_\varphi^\perp)\,du\\
&=(Rf)(\varphi,-s).
\end{aligned}
$$

二行目では $u=-t$ とし、全実数区間の積分方向も反転させています。

総量の証明では $x=s\theta_\varphi+t\theta_\varphi^\perp$ と置きます。Jacobian 行列は

$$
Q_\varphi=
\begin{pmatrix}
\cos\varphi&-\sin\varphi\\
\sin\varphi&\cos\varphi
\end{pmatrix},
\qquad \det Q_\varphi=1.
$$

$f$ は絶対可積分なので [Fubini の定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を使用できます。従って

$$
\begin{aligned}
\int_{\mathbb R}(Rf)(\varphi,s)\,ds
&=\int_{\mathbb R}\int_{\mathbb R}
f(s\theta_\varphi+t\theta_\varphi^\perp)\,dt\,ds\\
&=\int_{\mathbb R^2}f(x)|\det Q_\varphi|^{-1}\,dx\\
&=\int_{\mathbb R^2}f(x)\,dx.
\end{aligned}
$$
<!-- proof-end -->

この総量保存は「どの角度を選んでも質量が同じ」という観測データの整合性条件です。元の関数を求めていなくても検査できます。

## 4. Fourier slice theorem：投影を周波数に変える

[FOU3 の一次元 Fourier 変換](../../FOU/FOU3/index.md#def-fou3-fourier-transform)は負の指数を使い、反転に $1/(2\pi)$ を置きます。ここでも同じ規約で、投影の位置変数 $s$ に関する一次元 Fourier 変換を

$$
\mathcal F_s(Rf)(\varphi,\omega)
:=\int_{\mathbb R}(Rf)(\varphi,s)e^{-i\omega s}\,ds
$$

と書きます。一方、平面上の関数に対しては二変数を積分して

$$
\widehat f_2(\xi)
:=\int_{\mathbb R^2}f(x)e^{-ix\cdot\xi}\,dx,
\qquad \xi=(\xi_1,\xi_2)\in\mathbb R^2
$$

とします。添字2は二次元 Fourier 変換を区別するだけで、正規化定数はどちらの前向き変換にも付けません。$\widehat f_2$ は $f\in\mathcal S$ のため絶対収束します。

<a id="thm-inv12-slice"></a>

<!-- formal-statement-start -->
> **定理（Fourier slice theorem）**  
> $f\in\mathcal S(\mathbb R^2)$、$\varphi\in\mathbb R$、$\omega\in\mathbb R$ とし、$\theta_\varphi=(\cos\varphi,\sin\varphi)$ とする。平面上の Fourier 変換を

$$
\widehat f_2(\xi)=\int_{\mathbb R^2}f(x)e^{-ix\cdot\xi}\,dx
$$

> と定義すると、Radon変換の $s$ についての一次元 Fourier 変換は

$$
\boxed{\ \mathcal F_s(Rf)(\varphi,\omega)
=\widehat f_2(\omega\theta_\varphi)\ }
$$

> に等しい。左右とも追加の $2\pi$ 因子を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

重要なのは、直線上の変数 $t$ と位置 $s$ が、平面の直交座標を構成することです。指数の中の $\omega s$ が、平面座標では $x\cdot(\omega\theta_\varphi)$ に等しくなることを確かめます。

<!-- proof-start -->
### 証明

Radon変換の定義を代入すると

$$
\begin{aligned}
\mathcal F_s(Rf)(\varphi,\omega)
&=\int_{\mathbb R}\left[
\int_{\mathbb R}f(s\theta_\varphi+t\theta_\varphi^\perp)\,dt
\right]e^{-i\omega s}\,ds\\
&=\int_{\mathbb R^2}f(s\theta_\varphi+t\theta_\varphi^\perp)
e^{-i\omega s}\,dt\,ds.
\end{aligned}
$$

二重積分の順序を扱える理由は

$$
\int_{\mathbb R^2}
|f(s\theta_\varphi+t\theta_\varphi^\perp)e^{-i\omega s}|
\,dt\,ds
=\int_{\mathbb R^2}|f(x)|\,dx<\infty
$$

だからです。ここでも [Fubini の定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)の可積分性を確認しました。

$x=Q_\varphi(s,t)^\mathsf T=s\theta_\varphi+t\theta_\varphi^\perp$ は直交変換で、$\det Q_\varphi=1$ です。また

$$
x\cdot\theta_\varphi
=s(\theta_\varphi\cdot\theta_\varphi)
+t(\theta_\varphi^\perp\cdot\theta_\varphi)=s.
$$

したがって

$$
\begin{aligned}
\mathcal F_s(Rf)(\varphi,\omega)
&=\int_{\mathbb R^2}
f(x)e^{-i\omega(x\cdot\theta_\varphi)}\,dx\\
&=\int_{\mathbb R^2}
f(x)e^{-ix\cdot(\omega\theta_\varphi)}\,dx\\
&=\widehat f_2(\omega\theta_\varphi).
\end{aligned}
$$

$dx=|\det Q_\varphi|\,ds\,dt=ds\,dt$ なので、係数の付け忘れはありません。
<!-- proof-end -->

角度 $\varphi$ を固定すると、$\omega$ を動かすことで周波数平面の原点を通る直線 $\xi=\omega\theta_\varphi$ 上だけを読み出します。$\varphi$ を全ての方向へ動かせば、あらゆる $\xi$ が現れます。これが「投影を Fourier 変換すると断面が見える」という定理の幾何学的意味です。

### Gaussian による係数の照合

$f(x)=e^{-|x|^2}$ では先ほど $Rf=\sqrt\pi e^{-s^2}$ と計算しました。[FOU3 の Gaussian Fourier 変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を $a=1$ に適用すると

$$
\mathcal F_s(Rf)(\varphi,\omega)
=\sqrt\pi\cdot\sqrt\pi\,e^{-\omega^2/4}
=\pi e^{-\omega^2/4}.
$$

他方、二次元では積分が二つの一変数 Gaussian 積分へ分かれるので

$$
\widehat f_2(\xi_1,\xi_2)
=\left(\int e^{-x_1^2}e^{-i\xi_1x_1}dx_1\right)
\left(\int e^{-x_2^2}e^{-i\xi_2x_2}dx_2\right)
=\pi e^{-(\xi_1^2+\xi_2^2)/4}.
$$

ここへ $(\xi_1,\xi_2)=\omega(\cos\varphi,\sin\varphi)$ を入れると $\xi_1^2+\xi_2^2=\omega^2$ となり、両辺は一致します。$2\pi$ を誤って挿入すると、この直接計算で食い違います。

## 5. 全方向を測れた場合、画像は一意か

Fourier slice theorem は「観測で周波数の値を決める」定理ですが、周波数全体が決まっただけで元の関数が決まると主張するには、Fourier 変換の一意性が要ります。ここでは先に、既習の一次元反転から二次元反転が得られることを確認します。

<a id="lem-inv12-fourier2-inversion"></a>

<!-- formal-statement-start -->
> **補題（Schwartz級の二次元Fourier反転）**  
> $f\in\mathcal S(\mathbb R^2)$ のとき、$\widehat f_2$ は $\mathbb R^2$ で絶対可積分であり、任意の $x\in\mathbb R^2$ に対して

$$
f(x)=\frac1{(2\pi)^2}\int_{\mathbb R^2}
\widehat f_2(\xi)e^{ix\cdot\xi}\,d\xi
$$

> が成り立つ。特に $\widehat f_2\equiv0$ なら $f\equiv0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

絶対可積分性は、空間での微分が周波数側の多項式乗算に変わることから得ます。そのあと [FOU3 の一変数 Fourier 反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)を二つの座標に順番に適用します。

<!-- proof-start -->
### 証明

$f$ とその任意階の偏導関数は絶対可積分です。部分積分を二回ずつ行い、境界項は急減少で0になるため

$$
(1+|\xi|^2)^2\widehat f_2(\xi)
=\widehat{(1-\Delta)^2 f}_2(\xi),
\qquad \Delta=\partial_1^2+\partial_2^2.
$$

右辺の絶対値は $\|(1-\Delta)^2f\|_{L^1}$ 以下です。従って

$$
|\widehat f_2(\xi)|
\le\frac{\|(1-\Delta)^2f\|_1}{(1+|\xi|^2)^2}.
$$

極座標で $(1+|\xi|^2)^{-2}$ の平面積分は

$$
2\pi\int_0^\infty\frac{r}{(1+r^2)^2}\,dr
=\pi<\infty
$$

なので、$\widehat f_2\in L^1(\mathbb R^2)$ です。

次に固定した $x_2$ について $x_1$ の Fourier 変換

$$
g(\xi_1,x_2)=\int_{\mathbb R}
f(x_1,x_2)e^{-i\xi_1x_1}\,dx_1
$$

を考えます。$f$ の急減少性と部分積分により、任意の整数 $M,N\ge0$ に対して

$$
|g(\xi_1,x_2)|
\le C_{M,N}(1+|\xi_1|)^{-M}(1+|x_2|)^{-N}.
$$

この評価は、$x_1$ に関して部分積分したあと $f$ の偏導関数を $x_1$ 積分することで得られます。その際、$x_1$ と $x_2$ に対する急減少の指数を十分大きく選べば、$x_1$ 積分の有限性と $x_2$ の任意次数の減衰を同時に確保できます。$x_2$ での微分についても同じ評価が成り立ちます。

従って $g(\xi_1,\cdot)$ とその一変数 Fourier 変換はいずれも $L^1$ で、連続です。[$L^1$ Fourier反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)を $x_2$ について適用すると

$$
g(\xi_1,x_2)=\frac1{2\pi}\int_{\mathbb R}
\widehat f_2(\xi_1,\xi_2)e^{ix_2\xi_2}\,d\xi_2.
$$

ここで、元の $f(\cdot,x_2)$ も Schwartz 級の一変数関数なので、今度は $x_1$ について同じ反転定理を適用して

$$
\begin{aligned}
f(x_1,x_2)
&=\frac1{2\pi}\int_{\mathbb R}
g(\xi_1,x_2)e^{ix_1\xi_1}\,d\xi_1\\
&=\frac1{(2\pi)^2}
\int_{\mathbb R}\int_{\mathbb R}
\widehat f_2(\xi_1,\xi_2)e^{i(x_1\xi_1+x_2\xi_2)}
\,d\xi_2\,d\xi_1.
\end{aligned}
$$

最後の積分交換はすでに証明した $\widehat f_2\in L^1$ により正当化されます。$\widehat f_2\equiv0$ を代入すれば $f\equiv0$ です。
<!-- proof-end -->

<a id="thm-inv12-injectivity"></a>

<!-- formal-statement-start -->
> **定理（完全角度Radonデータの単射性）**  
> $f,g\in\mathcal S(\mathbb R^2)$ とする。全ての $\varphi\in[0,\pi)$ と $s\in\mathbb R$ で

$$
(Rf)(\varphi,s)=(Rg)(\varphi,s)
$$

> が成り立つなら、全ての $x\in\mathbb R^2$ で $f(x)=g(x)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

観測の差に [Fourier slice theorem](#thm-inv12-slice)を使い、周波数平面全体が消えることを確認します。最後は [二次元反転](#lem-inv12-fourier2-inversion)を使います。

<!-- proof-start -->
### 証明

$h=f-g$ と置くと $h\in\mathcal S$ で、線形性から $Rh=0$ です。固定した $\varphi$ について $s$ の Fourier 変換を取れば、[Fourier slice theorem](#thm-inv12-slice)により

$$
0=\mathcal F_s(Rh)(\varphi,\omega)
=\widehat h_2(\omega\theta_\varphi)
$$

が任意の $\omega\in\mathbb R$ について成り立ちます。

任意の $\xi\ne0$ を取ります。$\xi$ の向き、またはその反対向きのどちらかは $0\le\varphi<\pi$ の $\theta_\varphi$ と一致するので、適切な符号付き $\omega$ により $\xi=\omega\theta_\varphi$ と書けます。$\xi=0$ は $\omega=0$ を選べばよいので、全ての $\xi\in\mathbb R^2$ について $\widehat h_2(\xi)=0$ です。

[Schwartz級の二次元Fourier反転](#lem-inv12-fourier2-inversion)より $h(x)=0$ が全ての $x$ で成り立ち、$f=g$ となります。
<!-- proof-end -->

これは**一意性**の定理であって、観測誤差が小さいと復元誤差も小さいという**安定性**の定理ではありません。また「全角度・全位置の連続データ」という仮定が必要です。観測角度を有限個しか使わない場合、同じ証明では周波数平面を埋め尽くせません。INV14 で不完全観測の違いを扱います。

## 6. 演習：線の幾何から周波数の断面まで

### Level A：定義と直接計算

<a id="ex-inv12-a01"></a>

### INV12-A01 直線のパラメータと円盤

- Level: A

$a>0$、$f=1_{\{x_1^2+x_2^2\le a^2\}}$ とする。この関数は Schwartz 級でないが線積分は定義できる。$\varphi=0$ で $L(\varphi,s)$ を座標表示し、$(Rf)(0,s)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\theta_0=(1,0)$、$\theta_0^\perp=(0,1)$ なので、$L(0,s)=\{(s,t):t\in\mathbb R\}$ です。線上の点が円盤に入る条件は

$$
s^2+t^2\le a^2.
$$

$|s|<a$ なら $-\sqrt{a^2-s^2}\le t\le\sqrt{a^2-s^2}$ です。指示関数はこの区間だけ1なので

$$
(Rf)(0,s)=\int_{-\sqrt{a^2-s^2}}^{\sqrt{a^2-s^2}}1\,dt
=2\sqrt{a^2-s^2}.
$$

$|s|>a$ なら交点がなく積分値0、$|s|=a$ でも交点は1点だけなので積分値0です。結果は円盤の弦の長さです。
<!-- solution-end -->

<a id="ex-inv12-a02"></a>

### INV12-A02 尺度付きGaussian

- Level: A

$a>0$、$f(x)=e^{-a|x|^2}$ とする。任意の $\varphi,s$ で $Rf(\varphi,s)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\theta_\varphi,\theta_\varphi^\perp$ は正規直交基底なので

$$
|s\theta_\varphi+t\theta_\varphi^\perp|^2=s^2+t^2.
$$

従って

$$
\begin{aligned}
(Rf)(\varphi,s)
&=\int_{\mathbb R}e^{-a(s^2+t^2)}\,dt\\
&=e^{-as^2}\int_{\mathbb R}e^{-at^2}\,dt.
\end{aligned}
$$

$u=\sqrt a\,t$ と置くと $dt=du/\sqrt a$ なので

$$
\boxed{(Rf)(\varphi,s)=\sqrt{\pi/a}\,e^{-as^2}}.
$$

$e^{-a|x|^2}$ は任意階微分が多項式と Gaussian の積になるため Schwartz 級であり、定義の仮定も満たします。
<!-- solution-end -->

<a id="ex-inv12-a03"></a>

### INV12-A03 法線を反転したときの符号

- Level: A

$f\in\mathcal S(\mathbb R^2)$ とする。$(Rf)(\varphi+\pi,s)=(Rf)(\varphi,-s)$ を定義から示し、同じ幾何学的直線を二重に数えない角度区間を一つ答えよ。

<!-- solution-start -->
#### 詳細解答

$\theta_{\varphi+\pi}=-\theta_\varphi$ と $\theta_{\varphi+\pi}^\perp=-\theta_\varphi^\perp$ を代入すれば

$$
(Rf)(\varphi+\pi,s)
=\int_{\mathbb R}f(-s\theta_\varphi-t\theta_\varphi^\perp)\,dt.
$$

$u=-t$ と置き、積分範囲が全実数であることを使えば

$$
(Rf)(\varphi+\pi,s)
=\int_{\mathbb R}f(-s\theta_\varphi+u\theta_\varphi^\perp)\,du
=(Rf)(\varphi,-s).
$$

従って一つの代表区間は $[0,\pi)$ です。$s$ の符号も同時に変わる点が重要です。
<!-- solution-end -->

<a id="ex-inv12-a04"></a>

### INV12-A04 零周波数は何を表すか

- Level: A

$f\in\mathcal S(\mathbb R^2)$ とする。$\mathcal F_s(Rf)(\varphi,0)$ を $f$ の二次元積分で表し、値が $\varphi$ に依存しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

一次元 Fourier 変換の定義に $\omega=0$ を代入すると指数因子は1です。

$$
\mathcal F_s(Rf)(\varphi,0)
=\int_{\mathbb R}(Rf)(\varphi,s)\,ds.
$$

[投影の総量保存](#prop-inv12-symmetry-mass)で直交座標の Jacobian が1であるため

$$
\boxed{\mathcal F_s(Rf)(\varphi,0)
=\int_{\mathbb R^2}f(x)\,dx}.
$$

右辺に $\varphi$ はなく、全方向の投影は同じ零周波数値を共有します。
<!-- solution-end -->

<a id="ex-inv12-a05"></a>

### INV12-A05 ずれた山の sinogram

- Level: A

$c\in\mathbb R$ とし、$f(x)=e^{-(x_1-c)^2-x_2^2}$ を考える。投影の山が最大となる $s$ を $\varphi$ の関数で求め、$\varphi=0,\pi/2$ で確かめよ。

<!-- solution-start -->
#### 詳細解答

中心 $a=(c,0)$ を法線・接線基底に分けると

$$
a\cdot\theta_\varphi=c\cos\varphi,
\qquad
a\cdot\theta_\varphi^\perp=-c\sin\varphi.
$$

よって

$$
\begin{aligned}
|s\theta_\varphi+t\theta_\varphi^\perp-a|^2
&=(s-c\cos\varphi)^2+(t+c\sin\varphi)^2,\\
(Rf)(\varphi,s)
&=\sqrt\pi\,e^{-(s-c\cos\varphi)^2}.
\end{aligned}
$$

指数の平方が0になるのは

$$
\boxed{s=c\cos\varphi}
$$

です。$\varphi=0$ なら $s=c$、$\varphi=\pi/2$ なら $s=0$ で最大です。
<!-- solution-end -->

### Level B：証明・整合性・観測不足を調べる

<a id="ex-inv12-b01"></a>

### INV12-B01 Fourier slice を一から導く

- Level: B

$f\in\mathcal S(\mathbb R^2)$ とする。$\mathcal F_s(Rf)(\varphi,\omega)$ に線積分の定義を代入し、積分交換の条件、座標変換の Jacobian、指数の変形を一つずつ示して Fourier slice theorem を証明せよ。

<!-- solution-start -->
#### 詳細解答

出発点は

$$
\mathcal F_s(Rf)(\varphi,\omega)
=\int_{\mathbb R}\int_{\mathbb R}
f(s\theta_\varphi+t\theta_\varphi^\perp)e^{-i\omega s}
\,dt\,ds.
$$

Schwartz 級なら $f\in L^1(\mathbb R^2)$ です。指数の絶対値は1であり、$x=Q_\varphi(s,t)^\mathsf T$ と置くと

$$
\int_{\mathbb R^2}|f(Q_\varphi(s,t)^\mathsf T)|\,ds\,dt
=\int_{\mathbb R^2}|f(x)|\,dx<\infty
$$

なので [Fubini の定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)が使えます。$Q_\varphi$ の二列は $\theta_\varphi$ と $\theta_\varphi^\perp$ で、$\det Q_\varphi=\cos^2\varphi+\sin^2\varphi=1$ です。さらに $s=x\cdot\theta_\varphi$ となるので

$$
\begin{aligned}
\mathcal F_s(Rf)(\varphi,\omega)
&=\int_{\mathbb R^2}f(x)e^{-i\omega(x\cdot\theta_\varphi)}\,dx\\
&=\int_{\mathbb R^2}f(x)e^{-ix\cdot(\omega\theta_\varphi)}\,dx\\
&=\widehat f_2(\omega\theta_\varphi).
\end{aligned}
$$

変数変換の係数も前向き Fourier 変換の係数も1です。
<!-- solution-end -->

<a id="ex-inv12-b02"></a>

### INV12-B02 投影の一次モーメント

- Level: B

$f\in\mathcal S(\mathbb R^2)$ とする。$m=\int_{\mathbb R^2}xf(x)\,dx\in\mathbb C^2$ と置き、投影について

$$
\int_{\mathbb R}s(Rf)(\varphi,s)\,ds=\theta_\varphi\cdot m
$$

を示せ。$f_a(x)=e^{-|x-a|^2}$ で両辺を計算して照合せよ。

<!-- solution-start -->
#### 詳細解答

Schwartz 級では $|x||f(x)|$ が可積分です。$s=x\cdot\theta_\varphi$ を利用して

$$
\begin{aligned}
\int_{\mathbb R}s(Rf)(\varphi,s)\,ds
&=\int_{\mathbb R^2}s f(s\theta_\varphi+t\theta_\varphi^\perp)\,ds\,dt\\
&=\int_{\mathbb R^2}(x\cdot\theta_\varphi)f(x)\,dx\\
&=\theta_\varphi\cdot\int_{\mathbb R^2}xf(x)\,dx.
\end{aligned}
$$

積分交換は $\int|x||f(x)|dx<\infty$ から許されます。

$f_a$ では $x=u+a$ と置くと、$\int u e^{-|u|^2}du=0$ は奇関数の積分なので

$$
m=\int (u+a)e^{-|u|^2}du=\pi a.
$$

したがって右辺は $\pi(a\cdot\theta_\varphi)$。左辺には $Rf_a=\sqrt\pi e^{-(s-a\cdot\theta_\varphi)^2}$ を代入し、$v=s-a\cdot\theta_\varphi$ とすれば

$$
\sqrt\pi\int (v+a\cdot\theta_\varphi)e^{-v^2}dv
=\pi(a\cdot\theta_\varphi).
$$

両辺が一致します。
<!-- solution-end -->

<a id="ex-inv12-b03"></a>

### INV12-B03 異方的Gaussianの二つのFourier変換

- Level: B

$a,b>0$ とし、$f(x_1,x_2)=e^{-ax_1^2-bx_2^2}$ とする。$\varphi=0$ の Radon 変換を線積分で求め、その $s$ に関する Fourier 変換が $\widehat f_2(\omega,0)$ に一致することを直接示せ。

<!-- solution-start -->
#### 詳細解答

$\varphi=0$ では $(x_1,x_2)=(s,t)$ なので

$$
(Rf)(0,s)
=e^{-as^2}\int_{\mathbb R}e^{-bt^2}dt
=\sqrt{\pi/b}\,e^{-as^2}.
$$

[Gaussian Fourier公式](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を $a$ に適用すると

$$
\begin{aligned}
\mathcal F_s(Rf)(0,\omega)
&=\sqrt{\pi/b}\int e^{-as^2}e^{-i\omega s}ds\\
&=\sqrt{\pi/b}\sqrt{\pi/a}\,e^{-\omega^2/(4a)}\\
&=\frac{\pi}{\sqrt{ab}}e^{-\omega^2/(4a)}.
\end{aligned}
$$

二次元 Fourier 変換では二変数の積分が分離でき、$f$ は絶対可積分なので Fubini が適用できます。したがって

$$
\widehat f_2(\xi_1,\xi_2)
=\frac{\pi}{\sqrt{ab}}
\exp\left(-\frac{\xi_1^2}{4a}-\frac{\xi_2^2}{4b}\right).
$$

$\xi=(\omega,0)=\omega\theta_0$ と置けば同じ式になります。
<!-- solution-end -->

<a id="ex-inv12-b04"></a>

### INV12-B04 一方向だけでは見えない関数

- Level: B

単位法線 $\theta$ を一つ固定し、$\theta^\perp$ をその直交単位ベクトルとする。$g(x)=e^{-|x|^2}$ とし、$x$ から $\theta^\perp$ 方向へ動かした際の一変数微分で $h(x)=\left.\frac{d}{du}g(x+u\theta^\perp)\right|_{u=0}$ を定める。$h$ が零関数でない Schwartz 級の関数であること、およびその方向の全ての直線で $Rh=0$ となることを示せ。INV12の完全角度単射性と矛盾しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$g(x+u\theta^\perp)=e^{-|x+u\theta^\perp|^2}$ を $u$ で微分し、$u=0$ を代入すると

$$
h(x)=-2(x\cdot\theta^\perp)e^{-|x|^2}.
$$

多項式と Gaussian の積であるため Schwartz 級です。$x=\theta^\perp$ を代入すると $h(x)=-2e^{-1}\ne0$ です。

直線上では $x=s\theta+t\theta^\perp$ なので、$x\cdot\theta^\perp=t$ が成り立ち

$$
h(s\theta+t\theta^\perp)=-2t\,e^{-(s^2+t^2)}
=\frac{d}{dt}e^{-(s^2+t^2)}.
$$

従って

$$
(Rh)(\theta,s)=\int_{-\infty}^\infty\frac{d}{dt}
e^{-(s^2+t^2)}dt
=\lim_{T\to\infty}\left[e^{-(s^2+t^2)}\right]_{-T}^T=0.
$$

一方向における零データしか示していないため、全ての方向で同じデータという単射定理の仮定を満たしません。積分方向の微分が正負で打ち消されることが観測不能の機構です。
<!-- solution-end -->

### Level C：角度によって幅が変わる投影を統合する

<a id="ex-inv12-c01"></a>

### INV12-C01 異方性・平行移動・Fourier slice・単射性

- Level: C

$c\in\mathbb R$ とし、$f(x_1,x_2)=\exp(-(x_1-c)^2-4x_2^2)$ とする。$\theta_\varphi=(\cos\varphi,\sin\varphi)$、$\theta_\varphi^\perp=(-\sin\varphi,\cos\varphi)$ とおく。

1. $A=\cos^2\varphi+4\sin^2\varphi$、$B=3\sin\varphi\cos\varphi$、$C=\sin^2\varphi+4\cos^2\varphi$ とすると $AC-B^2=4$ であることを示せ。
2. 変数を法線・接線方向に移して平方完成し、任意の $\varphi,s$ で $Rf$ を求めよ。
3. その $s$ に関する Fourier 変換と、直接計算した $\widehat f_2(\omega\theta_\varphi)$ を比較せよ。
4. 全ての角度・位置で $Rg=Rf$ を満たす $g\in\mathcal S(\mathbb R^2)$ が存在するとき、$g=f$ を示すにはどの仮定と定理が必要か述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $p=\cos\varphi$、$q=\sin\varphi$ と略記すると

$$
\begin{aligned}
AC-B^2
&=(p^2+4q^2)(q^2+4p^2)-9p^2q^2\\
&=4p^4+4q^4+(1+16-9)p^2q^2\\
&=4(p^4+2p^2q^2+q^4)\\
&=4(p^2+q^2)^2=4.
\end{aligned}
$$

**2.** 中心 $a=(c,0)$ の法線・接線成分は $a_\parallel=cp$、$a_\perp=-cq$ です。$u=s-cp$、$v=t+cq$ と置くと、$x-a=u\theta_\varphi+v\theta_\varphi^\perp$ です。元の指数の正の二次形式は

$$
(x_1-c)^2+4x_2^2
=A u^2+2Buv+Cv^2.
$$

ここで $C>0$ なので平方完成でき、

$$
Au^2+2Buv+Cv^2
=C\left(v+\frac BC u\right)^2
+\left(A-\frac{B^2}{C}\right)u^2.
$$

第1問から $A-B^2/C=4/C$ です。$w=v+(B/C)u$ と変数変換して積分すると

$$
\begin{aligned}
(Rf)(\varphi,s)
&=\int_{\mathbb R}
e^{-C(v+(B/C)u)^2-(4/C)u^2}\,dv\\
&=e^{-(4/C)u^2}\int_{\mathbb R}e^{-Cw^2}dw\\
&=\boxed{\sqrt{\frac\pi C}
\exp\left(-\frac4C(s-c\cos\varphi)^2\right)}.
\end{aligned}
$$

この式は山の中心 $c\cos\varphi$ と、角度によって変わる幅 $C/4$ を別々に示します。

**3.** 位置を $s_0=c\cos\varphi$ だけずらした Gaussian です。$z=s-s_0$ とし、[FOU3 の Gaussian Fourier 公式](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)に係数 $4/C$ を代入すると

$$
\begin{aligned}
\mathcal F_s(Rf)(\varphi,\omega)
&=\sqrt{\frac\pi C}\,e^{-i\omega s_0}
\int_{\mathbb R}e^{-(4/C)z^2}e^{-i\omega z}\,dz\\
&=\sqrt{\frac\pi C}\sqrt{\frac{\pi C}{4}}
e^{-i\omega c\cos\varphi}e^{-C\omega^2/16}\\
&=\frac\pi2 e^{-i\omega c\cos\varphi}e^{-C\omega^2/16}.
\end{aligned}
$$

一方 $y_1=x_1-c$ と置いて二変数積分を分けると

$$
\widehat f_2(\xi_1,\xi_2)
=\frac\pi2 e^{-ic\xi_1}
\exp\left(-\frac{\xi_1^2}4-\frac{\xi_2^2}{16}\right).
$$

$\xi_1=\omega\cos\varphi$、$\xi_2=\omega\sin\varphi$ とし、

$$
\frac{\xi_1^2}4+\frac{\xi_2^2}{16}
=\frac{\omega^2(4\cos^2\varphi+\sin^2\varphi)}{16}
=\frac{C\omega^2}{16}
$$

より、$\widehat f_2(\omega\theta_\varphi)$ は投影の一次元 Fourier 変換と一致します。位相の符号と $1/2$ の係数まで一致しました。

**4.** $f$ は Gaussian に多項式型の偏導関数を掛けた形となるため Schwartz 級です。$g\in\mathcal S$ かつ全角度 $0\le\varphi<\pi$・全位置 $s\in\mathbb R$ で等しいので、[完全角度Radonデータの単射性](#thm-inv12-injectivity)を適用でき、$g=f$ です。有限個の角度しか一致しない場合には、この定理を適用できません。
<!-- solution-end -->

## 7. 次講への接続

本講で分かったのは、線積分のデータを位置方向に Fourier 変換すると、画像の周波数平面の「法線方向の断面」が読めるということです。完全角度データでは全周波数が定まり、一意性まで証明できました。しかしそれはまだ**どのように安定して戻すか**の公式ではありません。

次の INV13 では、周波数平面の極座標変換に現れる Jacobian と $|\omega|$ の重みを追い、逆投影と フィルタ補正逆投影 の式、さらに高周波での雑音増幅と正則化を導出します。
