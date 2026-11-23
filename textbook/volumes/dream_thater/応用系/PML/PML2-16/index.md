# PML2-16 Fourier Neural OperatorはなぜFourier係数を用いるか

## 1. 全点から情報を集める積分を、周波数ごとの計算へ

[前講の積分核型 Neural Operator 層](../PML2-15/index.md#def-pml2-15-kernel-layer)は、位置 $x$ の情報と、他の位置 $t$ から届く情報を組み合わせた。節点数 $N$、チャネル数 $m$ の一般の核行列を各節点対で評価すると、積分部分にはおおむね $N^2m^2$ 回の積和が要る。

もし核が位置の差 $x-t$ だけで決まるなら、すべての節点対へ異なる行列を用意する必要はない。この**並進に依存しない構造**を利用する方法が Fourier Neural Operator（FNO）の中心である。Fourier係数へ変換すると、空間上の畳み込みが周波数ごとの行列積になる。

ただし区間の両端で値が違う関数を、周期関数と無条件にみなすことはできない。本講では長さ1の周期領域を先に固定し、周期的な入力と核に限定して構成を証明する。非周期境界の処理と解像度変更時の精度は後続で別に検討する。

## 2. 周期関数とFourier係数を定義する

円周を一周する座標 $x$ を実数の $x$ と $x+1$ を同一視して表す。周期領域 $\mathbb T=\mathbb R/\mathbb Z$ 上の連続関数は、$h(x+1)=h(x)$ を満たす連続関数として扱える。区間 $[0,1]$ で書けば特に $h(0)=h(1)$ である。

周波数 $k\in\mathbb Z$ の基本波 $e^{2\pi ikx}=\cos(2\pi kx)+i\sin(2\pi kx)$ を考える。$i^2=-1$ であり、複素共役は $a+ib$ を $a-ib$ に移す。整数周波数の波同士の積分が直交することを利用して、関数から周波数の成分を取り出す。

<a id="def-pml2-16-fourier"></a>

<!-- formal-statement-start -->
> **定義（周期関数のFourier係数）**  
> 整数 $m\ge1$、$h\in C(\mathbb T;\mathbb R^m)$ と整数 $k$ に対し、各チャネルを成分ごとに積分して

$$
\widehat h_k=\int_0^1h(x)e^{-2\pi ikx}\,dx
\in\mathbb C^m
$$

> と定める。これを周波数 $k$ の **Fourier係数** とする。$h$ が実数値なら $\widehat h_{-k}=\overline{\widehat h_k}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-16-fourier -->
**定義の確認。** $m=1$、$h(x)=2+\cos(2\pi x)$ とする。$h(0)=h(1)=3$ で周期条件を満たし、連続である。指数表示 $\cos(2\pi x)=(e^{2\pi ix}+e^{-2\pi ix})/2$ を代入すると、$\widehat h_0=2$、$\widehat h_1=\widehat h_{-1}=1/2$、それ以外は0となる。$h$ が実数値なので、係数の共役対称性も満たす。
<!-- definition-example-end -->

直交性は有限和の計算だけで確認できる。整数 $k,\ell$ に対して

$$
\int_0^1e^{2\pi i(k-\ell)x}\,dx
=\begin{cases}1&k=\ell,\\0&k\ne\ell.\end{cases}
$$

$k\ne\ell$ なら原始関数 $e^{2\pi i(k-\ell)x}/(2\pi i(k-\ell))$ を端点で引き、$e^{2\pi i(k-\ell)}=1$ を使えば0である。これによって有限個の基本波の和では係数が一意に求まる。本講の対角化は**有限和**を使うため、一般の連続関数のFourier級数が点ごとに収束するとの仮定は必要ない。

## 3. 差だけに依存する核と畳み込み

一般核 $K(x,t)$ を、$x-t$ のみに依存する周期核 $K(x-t)$ に限定する。周期性により $x-t$ が負になっても $K(x-t+1)=K(x-t)$ と解釈できる。$\mathbb R^{m\times m}$ 値の核が各チャネルを結合する点は前講と同じである。

<a id="def-pml2-16-convolution"></a>

<!-- formal-statement-start -->
> **定義（周期畳み込み）**  
> 整数 $m\ge1$ と周期連続行列値核 $K:\mathbb T\to\mathbb R^{m\times m}$、$h\in C(\mathbb T;\mathbb R^m)$ に対し、

$$
(K*h)(x)=\int_0^1K(x-t)h(t)\,dt
$$

> と定める。積分は各行列成分と各チャネルについて取る。これを **周期畳み込み** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-16-convolution -->
**定義の確認。** $m=1$、$K(s)=2\cos(2\pi s)$、$h(t)=\cos(2\pi t)$ とする。両者は実数値・連続・周期1である。加法定理により

$$
\begin{aligned}
(K*h)(x)
&=2\int_0^1\{\cos(2\pi x)\cos(2\pi t)
+\sin(2\pi x)\sin(2\pi t)\}\cos(2\pi t)\,dt\\
&=2\cos(2\pi x)\cdot\frac12
+2\sin(2\pi x)\cdot0
=\cos(2\pi x).
\end{aligned}
$$

ここで $\int_0^1\cos^2(2\pi t)dt=1/2$、$\int_0^1\sin(2\pi t)\cos(2\pi t)dt=0$ を用いた。出力も連続周期関数であり、定義の値域に属する。
<!-- definition-example-end -->

**畳み込みが周波数を分ける理由。** $K$ を有限個の基本波で表し、積分へ代入すると、周波数 $k$ ごとに入力の係数 $\widehat h_k$ だけが残る。別の周波数の係数を混ぜる必要がない。

<a id="thm-pml2-16-diagonal"></a>

<!-- formal-statement-start -->
> **定理（有限Fourier核による畳み込みの対角化）**  
> $m\ge1$、$M\ge0$ を整数とし、行列 $R_k\in\mathbb C^{m\times m}$（$-M\le k\le M$）が $R_{-k}=\overline{R_k}$ を満たすとする。核

$$
K_M(s)=\sum_{k=-M}^{M}R_ke^{2\pi iks}
$$

> は実数行列値の周期連続核である。任意の $h\in C(\mathbb T;\mathbb R^m)$ について

$$
(K_M*h)(x)=
\sum_{k=-M}^{M}e^{2\pi ikx}R_k\widehat h_k
$$

> がすべての $x\in\mathbb T$ で成立する。右辺は実数値である。
<!-- formal-statement-end -->

**証明の見取り図。** $K_M(x-t)$ の指数を $x$ と $t$ の積に分け、有限和と積分を交換する。$t$ に関する積分が[Fourier係数](#def-pml2-16-fourier)である。最後に正負の周波数を共役の組でまとめる。

<!-- proof-start -->
### 証明

$R_{-k}=\overline{R_k}$ なので $R_0$ は実行列である。$k>0$ の二項を組にすれば

$$
R_ke^{2\pi iks}+R_{-k}e^{-2\pi iks}
=2\operatorname{Re}(R_ke^{2\pi iks})
$$

となり、$K_M(s)$ は実行列値、連続、周期1である。従って[周期畳み込み](#def-pml2-16-convolution)が定義される。

和は有限個なので、積分の線形性と $e^{2\pi ik(x-t)}=e^{2\pi ikx}e^{-2\pi ikt}$ から

$$
\begin{aligned}
(K_M*h)(x)
&=\int_0^1\left(\sum_{k=-M}^{M}R_ke^{2\pi ik(x-t)}\right)h(t)\,dt\\
&=\sum_{k=-M}^{M}e^{2\pi ikx}R_k
\int_0^1h(t)e^{-2\pi ikt}\,dt\\
&=\sum_{k=-M}^{M}e^{2\pi ikx}R_k\widehat h_k.
\end{aligned}
$$

$h$ が実数値なので、定義の積分を共役に取れば

$$
\widehat h_{-k}
=\int_0^1h(t)e^{2\pi ikt}\,dt
=\overline{\widehat h_k}.
$$

従って $R_{-k}\widehat h_{-k}
=\overline{R_k\widehat h_k}$。$k=0$ の項は実数値で、残りは正負の二項の和が実数値だから、結果全体は実ベクトルとなる。
<!-- proof-end -->

**具体例。** $K(s)=2\cos(2\pi s)$ は $R_1=R_{-1}=1$、その他0に対応する。入力

$$
h(x)=1+2\cos(2\pi x)+\sin(4\pi x)
$$

では $\widehat h_{\pm1}=1$。よって $(K*h)(x)=2\cos(2\pi x)$ であり、定数成分と周波数2の成分が消える。Fourier係数は、何を残すかを周波数ごとに指定するための座標なのである。

## 4. Fourier Neural Operator層の定義と安定性

前講の[持ち上げ](../PML2-15/index.md#def-pml2-15-lift)で、位置ごとの特徴量を $m$ 個のチャネルへ置ける。[積分核型層](../PML2-15/index.md#def-pml2-15-kernel-layer)の積分核を $K_M(x-t)$ とした場合、[対角化定理](#thm-pml2-16-diagonal)により積分部分を周波数の有限和で計算できる。

<a id="def-pml2-16-fno-layer"></a>

<!-- formal-statement-start -->
> **定義（有限モードのFourier Neural Operator層）**  
> $m\ge1$、$M\ge0$ を整数とする。$W\in\mathbb R^{m\times m}$、$b\in C(\mathbb T;\mathbb R^m)$、連続な実数値活性化関数 $\sigma:\mathbb R\to\mathbb R$、$R_k\in\mathbb C^{m\times m}$（$-M\le k\le M$）を取り、$R_{-k}=\overline{R_k}$ を課す。$h\in C(\mathbb T;\mathbb R^m)$ に対し

$$
(\mathcal Fh)(x)=
\sigma\left(Wh(x)+b(x)+
\sum_{k=-M}^{M}e^{2\pi ikx}R_k\widehat h_k\right)
$$

> とする。$\sigma$ はベクトルの各成分へ適用する。この写像を **有限モードのFNO層** とする。保持する周波数の最大絶対値 $M$ を **モード切断位置** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-16-fno-layer -->
**定義の確認。** $m=1$、$M=1$、$R_{\pm1}=1$、$R_0=0$、$W=0$、$b=0$、$\sigma(s)=s$ とする。行列の次元はすべて $1\times1$、重みは共役対称で実出力条件を満たす。入力 $h(x)=1+2\cos(2\pi x)+\sin(4\pi x)$ に適用した結果は前節より $2\cos(2\pi x)$ であり、連続な周期実関数となる。切断によって高周波が捨てられ、活性化が恒等であれば新しい周波数は生じない。
<!-- definition-example-end -->

実際のネットワークはこの層を有限個合成して、最初と最後にチャネルの持ち上げと読み出しを置く。活性化を非線形にすると、ある層の出力には保持していなかった周波数が発生しうる。そのため**層間でモード切断が再び必要になる**ことがある。

また、$R_k$ の和を減らせば必ず安定になるわけではない。入力の小さい変化に対する評価は活性化と局所行列にも依存する。

<a id="thm-pml2-16-stability"></a>

<!-- formal-statement-start -->
> **定理（FNO層の実数性と一様ノルム安定性）**  
> [有限モードFNO層](#def-pml2-16-fno-layer)で、$\sigma$ が $L_\sigma$-Lipschitz連続とする。行列の最大行絶対和を

$$
\|A\|_{\mathrm{row}}=\max_i\sum_j|A_{ij}|
$$

> とし、実数値ベクトル周期関数のノルムを

$$
\|h\|_{\infty,m}=\max_x\max_i|h_i(x)|
$$

> とする。このとき $\mathcal Fh$ は実数値連続周期関数であり、任意の $h,g\in C(\mathbb T;\mathbb R^m)$ について

$$
\|\mathcal Fh-\mathcal Fg\|_{\infty,m}
\le L_\sigma\left(\|W\|_{\mathrm{row}}
+\sum_{k=-M}^{M}\|R_k\|_{\mathrm{row}}\right)
\|h-g\|_{\infty,m}
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 実数性は[対角化定理](#thm-pml2-16-diagonal)を使う。二入力の差を取るとバイアスは消え、Fourier係数の差が入力の一様ノルム以下であることを利用する。

<!-- proof-start -->
### 証明

[対角化定理](#thm-pml2-16-diagonal)の右辺は実数値で有限和の連続周期関数である。$Wh$、$b$ も同様なので、連続な $\sigma$ を成分ごとに適用した $\mathcal Fh$ は実数値連続周期関数である。

$d=h-g$、$E=\|d\|_{\infty,m}$ と置く。各成分について

$$
|(\widehat d_k)_j|
=\left|\int_0^1d_j(t)e^{-2\pi ikt}\,dt\right|
\le\int_0^1|d_j(t)|\,dt\le E.
$$

従って任意の $x,i$ で

$$
\begin{aligned}
\left|\left(\sum_k e^{2\pi ikx}R_k\widehat d_k\right)_i\right|
&\le\sum_k\sum_j|(R_k)_{ij}|\,|(\widehat d_k)_j|\\
&\le E\sum_k\|R_k\|_{\mathrm{row}}.
\end{aligned}
$$

一方 $|(Wd(x))_i|\le\|W\|_{\mathrm{row}}E$。[前講の層安定性の議論](../PML2-15/index.md#thm-pml2-15-stability)と同様に、バイアスを差で消し、$\sigma$ のLipschitz条件を適用してから $x,i$ の最大を取ると結論を得る。
<!-- proof-end -->

この上界は周波数係数の絶対値をすべて足す保守的な評価である。精度の評価、学習により得た $R_k$ の適切さ、PDE の真の解との一致は主張していない。

## 5. 有限格子の離散Fourier変換

コンピュータでは $h$ を全点で積分できない。$N\ge2$ 個の等間隔格子点 $x_j=j/N$（$j=0,\ldots,N-1$）で値 $h_j=h(x_j)$ を取る。周期性により $x_N=1$ は $x_0=0$ と同じ位置なので、配列には重複して保存しない。

有限個の複素数列を周波数ごとの係数へ分解する変換が、離散Fourier変換（DFT）である。これは連続Fourier係数を**必ず厳密に返す操作ではない**。

<a id="def-pml2-16-dft"></a>

<!-- formal-statement-start -->
> **定義（離散Fourier変換と格子FNO）**  
> $N\ge2$、$m\ge1$ とし、周期格子上の $h_j\in\mathbb R^m$ に対し

$$
\widetilde h_r
=\frac1N\sum_{j=0}^{N-1}h_j e^{-2\pi irj/N},
\qquad 0\le r<N
$$

> を **離散Fourier係数** とする。$N$ を偶数、$0\le M<N/2$ とし、[FNO層](#def-pml2-16-fno-layer)の同じ $W,b,R_k,\sigma$ を使い、格子点での出力を

$$
(\mathcal F_N h)_j=
\sigma\left(Wh_j+b(x_j)
+\sum_{k=-M}^{M}e^{2\pi ikj/N}
R_k\widetilde h_{\,k\bmod N}\right)
$$

> と定める。これを **格子FNO** とする。添字 $k\bmod N$ は $0,\ldots,N-1$ の剰余とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-16-dft -->
**定義の確認。** $N=4$、$m=1$、$h_j=(1,0,-1,0)$、$M=1$ とする。$M<N/2=2$ が成立し、周期格子の4値を正しく指定した。DFTは

$$
\widetilde h_0=0,\quad
\widetilde h_1=\frac12,\quad
\widetilde h_2=0,\quad
\widetilde h_3=\frac12.
$$

$W=b=0$、$\sigma(s)=s$、$R_1=R_{-1}=1$、$R_0=0$ とすると、格子FNOの出力は

$$
(\mathcal F_4h)_j
=\frac12e^{2\pi ij/4}
+\frac12e^{-2\pi ij/4}
=\cos(2\pi j/4),
$$

すなわち $(1,0,-1,0)$ である。$R_{-1}$ は配列の周波数添字3へ作用することを確認できる。
<!-- definition-example-end -->

DFTを逆向きに計算する式も有限等比数列から導ける。$q,r\in\{0,\ldots,N-1\}$ の直交性

$$
\frac1N\sum_{r=0}^{N-1}e^{2\pi ir(j-q)/N}
=\begin{cases}1&j=q,\\0&j\ne q\end{cases}
$$

から

$$
h_j=\sum_{r=0}^{N-1}\widetilde h_r e^{2\pi irj/N}
$$

を得る。したがってモードごとに $R_k$ を掛けた後、逆変換で格子の値へ戻せる。局所項、バイアス、活性化を加えれば格子上の一層が完成する。

## 6. モードを切るときに現れるエイリアシング

連続の周波数 $k$ と $k+N$ は、$N$ 個の格子点では区別できない。実際、

$$
e^{2\pi i(k+N)j/N}
=e^{2\pi ikj/N}e^{2\pi ij}
=e^{2\pi ikj/N}.
$$

これが **エイリアシング（周波数の折り返し）** である。単に高周波を捨てることと、高周波が低周波へ紛れ込むことは異なる。

<a id="thm-pml2-16-alias"></a>

<!-- formal-statement-start -->
> **定理（格子における周波数の同一視）**  
> $N\ge2$ とし、有限Fourier和

$$
h(x)=\sum_{|k|\le H}c_ke^{2\pi ikx}
$$

> を $x_j=j/N$ で標本化する。このとき[DFT係数](#def-pml2-16-dft)は、各 $0\le r<N$ に対し

$$
\widetilde h_r=
\sum_{\substack{|k|\le H\\k\equiv r\pmod N}}c_k
$$

> を満たす。特に $N$ が偶数で $H<N/2$ なら、各周波数の係数が重複せず格子DFTから正確に回収できる。
<!-- formal-statement-end -->

**証明の見取り図。** 標本値の有限和をDFTへ代入し、複素指数の有限等比級数で、剰余が一致する周波数だけが残ることを示す。

<!-- proof-start -->
### 証明

定義へ代入し、二つの有限和の順序を入れ替えると

$$
\begin{aligned}
\widetilde h_r
&=\frac1N\sum_{j=0}^{N-1}
\left(\sum_{|k|\le H}c_ke^{2\pi ikj/N}\right)
e^{-2\pi irj/N}\\
&=\sum_{|k|\le H}c_k
\left(\frac1N\sum_{j=0}^{N-1}
e^{2\pi i(k-r)j/N}\right).
\end{aligned}
$$

$k-r$ が $N$ の倍数なら括弧内の各項は1であり和は1。そうでなければ比 $z=e^{2\pi i(k-r)/N}\ne1$、$z^N=1$ なので

$$
\sum_{j=0}^{N-1}z^j=\frac{1-z^N}{1-z}=0.
$$

従って主張の剰余類の和だけが残る。$H<N/2$ の場合は異なる $k,\ell\in[-H,H]$ の差の絶対値が $2H<N$ であり、$N$ の倍数にはならないため、各係数は衝突しない。
<!-- proof-end -->

**反例。** $N=4$ で

$$
h_{\mathrm{low}}(x)=\cos(2\pi x),\qquad
h_{\mathrm{high}}(x)=\cos(10\pi x)
$$

を考える。後者は周波数5だが、$5\equiv1\pmod4$ なので4節点で両者の値は同じである。一方 $K(s)=2\cos(2\pi s)$ として連続畳み込みを計算すると、[対角化定理](#thm-pml2-16-diagonal)から低周波入力の出力は $\cos(2\pi x)$、高周波入力の出力は0になる。格子上のFNOは両者に同じ出力を返す。壊れたのは**連続Fourier係数を格子DFTが区別できる**という条件であり、パラメータ $R_{\pm1}$ の不足ではない。

## 7. FFTはなぜ計算を速くできるか

DFTの定義通りに各周波数の和を計算すれば、$N$ 個の周波数それぞれで $N$ 項を足すので $O(N^2)$ 回の演算になる。高速Fourier変換（FFT）は、**同じDFTの値を求める手順を共有して重複計算を減らすアルゴリズム**であり、別の変換ではない。

まず $N=2^q$（$q\ge1$）とする。正規化前のDFTを $F_r=\sum_{j=0}^{N-1}h_j\omega_N^{rj}$、$\omega_N=e^{-2\pi i/N}$ と書く。入力を偶数番目 $h_{2t}$ と奇数番目 $h_{2t+1}$ に分け、それぞれ長さ $N/2$ のDFTを計算する。

<a id="thm-pml2-16-fft"></a>

<!-- formal-statement-start -->
> **定理（偶奇分割によるFFTの再帰式）**  
> $N=2^q$、$q\ge1$ とする。長さ $N/2$ の偶数列・奇数列の正規化前DFTをそれぞれ $E_r,O_r$ とすれば、$0\le r<N/2$ について

$$
F_r=E_r+\omega_N^rO_r,\qquad
F_{r+N/2}=E_r-\omega_N^rO_r
$$

> となる。各段でこの分割を再帰的に行うと、DFTは $O(N\log_2N)$ 回の複素数演算で求められる。
<!-- formal-statement-end -->

**証明の見取り図。** 添字の偶奇分割では、指数の底 $\omega_N^2$ が長さ $N/2$ の根 $\omega_{N/2}$ に等しい。上半分の周波数では奇数列だけ符号が反転する。

<!-- proof-start -->
### 証明

定義から $j=2t$ と $j=2t+1$ を分離すると

$$
\begin{aligned}
F_r
&=\sum_{t=0}^{N/2-1}h_{2t}\omega_N^{2rt}
+\sum_{t=0}^{N/2-1}h_{2t+1}\omega_N^{r(2t+1)}\\
&=\sum_t h_{2t}\omega_{N/2}^{rt}
+\omega_N^r\sum_t h_{2t+1}\omega_{N/2}^{rt}\\
&=E_r+\omega_N^rO_r.
\end{aligned}
$$

$r$ を $r+N/2$ へ替えると、$\omega_N^{N/2}=-1$、かつ $\omega_{N/2}^{(r+N/2)t}=\omega_{N/2}^{rt}$ なので

$$
F_{r+N/2}=E_r-\omega_N^rO_r.
$$

長さ $N$ の計算は長さ $N/2$ を2回と、各 $r$ の和・差・乗算の $O(N)$ 回からなる。$T(1)=O(1)$、$T(N)=2T(N/2)+O(N)$ だから、再帰を $q=\log_2N$ 段展開すると各段の仕事量は $O(N)$、合計 $O(N\log_2N)$ となる。最後に $1/N$ を掛けて定義の正規化へ戻す。
<!-- proof-end -->

**4点の手計算。** $h=(1,2,3,4)$ とすると、偶数列 $(1,3)$ のDFTは $(4,-2)$、奇数列 $(2,4)$ は $(6,-2)$。$\omega_4=-i$ なので

$$
F_0=10,\quad
F_1=-2+2i,\quad
F_2=-2,\quad
F_3=-2-2i.
$$

DFT係数はこれを4で割る。偶奇2点DFTをそれぞれ一度だけ計算し、4点の全周波数へ再利用した。

## 8. 有限格子でのFNOの計算量と保証の境界

$N$ を2の冪、$N>2M$、チャネル数を $m$ とする。各チャネルでFFTを行い、保持モードの $m$ 成分ベクトルへ $m\times m$ 行列 $R_k$ を掛け、逆FFTで格子へ戻す。周波数変換に $O(mN\log N)$、保持モードの行列積に $O((2M+1)m^2)$、局所行列 $W$ の全格子適用に $O(Nm^2)$ を要する（活性化・バイアス評価は $O(Nm)$）。これは密な一般核の $O(N^2m^2)$ に比べた構造的な利点である。

同じ $R_k$ を異なる $N$ で使えることは、**重みが格子の節点番号に固有ではない**という意味である。しかし離散DFTにエイリアシングや標本化誤差があれば、同じ重みであっても連続作用素の近似精度は変わる。境界が周期でない場合の延長や周波数切断の選択も別途検査する必要がある。次講ではこの区別を誤差の形で調べる。

## 9. 演習：周波数の選択、FFT、標本化の落とし穴

### Level A：定義と小さな計算

### PML2-16-A01：Fourier係数を求める
- Level: A

周期関数 $h(x)=3+2\cos(2\pi x)$ の非零Fourier係数をすべて求め、実数性の条件を確認せよ。

<!-- solution-start -->
**詳細解答。** $\cos(2\pi x)=(e^{2\pi ix}+e^{-2\pi ix})/2$ を使うと

$$
h(x)=3+e^{2\pi ix}+e^{-2\pi ix}.
$$

[係数の定義](#def-pml2-16-fourier)と基本波の直交性より、$\widehat h_0=3$、$\widehat h_1=\widehat h_{-1}=1$、それ以外は0。各係数は実数なので $\widehat h_{-k}=\overline{\widehat h_k}$ を満たす。$h(0)=h(1)=5$ で周期条件も成立する。
<!-- solution-end -->

### PML2-16-A02：核が残す成分
- Level: A

$K(s)=2\cos(2\pi s)$、$h(x)=4+3\cos(2\pi x)+2\sin(4\pi x)$ に対して $(K*h)(x)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $K$ の係数は $R_{\pm1}=1$、他は0である。入力の周波数1の係数は $\widehat h_{\pm1}=3/2$。定数成分は $k=0$、$\sin(4\pi x)$ は $k=\pm2$ なので消える。[対角化定理](#thm-pml2-16-diagonal)より

$$
(K*h)(x)=\frac32 e^{2\pi ix}+\frac32e^{-2\pi ix}
=3\cos(2\pi x).
$$

<!-- solution-end -->

### PML2-16-A03：複素重みでも実数になる
- Level: A

$m=1$、$M=1$、$R_1=1+i$、$R_{-1}=1-i$、$R_0=0$、$h(x)=\cos(2\pi x)$ とする。Fourier項を実数の三角関数で表せ。

<!-- solution-start -->
**詳細解答。** $\widehat h_{\pm1}=1/2$ だから

$$
\begin{aligned}
\sum_{k=-1}^{1}e^{2\pi ikx}R_k\widehat h_k
&=\frac12(1+i)e^{2\pi ix}
+\frac12(1-i)e^{-2\pi ix}\\
&=\operatorname{Re}((1+i)e^{2\pi ix})\\
&=\cos(2\pi x)-\sin(2\pi x).
\end{aligned}
$$

共役対称性 $R_{-1}=\overline{R_1}$ により虚部が相殺され、実数値になる。
<!-- solution-end -->

### PML2-16-A04：4点DFT
- Level: A

$N=4$、$h=(1,0,-1,0)$ の離散Fourier係数 $\widetilde h_0,\ldots,\widetilde h_3$ を定義から計算せよ。

<!-- solution-start -->
**詳細解答。** [DFTの定義](#def-pml2-16-dft)より、零でない入力は $j=0,2$ のみなので

$$
\widetilde h_r
=\frac14\{1-e^{-2\pi ir(2/4)}\}
=\frac14\{1-(-1)^r\}.
$$

$r=0,2$ では0、$r=1,3$ では $1/2$。従って $(0,1/2,0,1/2)$ となる。$\widetilde h_3=\overline{\widetilde h_1}$ も確認できる。
<!-- solution-end -->

### PML2-16-A05：格子で区別できない周波数
- Level: A

$N=4$ の格子で $\cos(2\pi x)$ と $\cos(10\pi x)$ の値が一致することを示し、両者の連続Fourier係数が同じではない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $x_j=j/4$ では

$$
\cos(10\pi j/4)
=\cos(2\pi j/4+2\pi j)
=\cos(2\pi j/4).
$$

連続Fourier係数は前者が周波数 $\pm5$、後者が $\pm1$ に $1/2$ ずつある。異なる関数なのに同じ有限個の値しか観測していないため、DFTは同じ配列を返す。[周波数同一視定理](#thm-pml2-16-alias)の $5\equiv1\pmod4$ が原因である。
<!-- solution-end -->

### Level B：条件を変えて論証する

### PML2-16-B01：二チャネルの畳み込み
- Level: B

$m=2$、$K(s)=\operatorname{diag}(2\cos(2\pi s),1)$、$h(x)=(\cos(2\pi x),1)^\mathsf T$ とする。連続周期性と次元を確認した上で $(K*h)(x)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $K$ は実 $2\times2$ 行列で各成分が連続周期1、$h$ は実2ベクトル値連続周期関数である。[周期畳み込み](#def-pml2-16-convolution)の積分は成分ごとに計算する。第1成分では

$$
2\int_0^1\cos(2\pi(x-t))\cos(2\pi t)\,dt
=\cos(2\pi x)
$$

となる。第2成分は $\int_0^1 1\cdot1\,dt=1$。非対角成分は0なので他チャネルは混ざらず、

$$
(K*h)(x)=(\cos(2\pi x),1)^\mathsf T.
$$

出力も2チャネルの連続周期関数で、定義の値域条件を満たす。
<!-- solution-end -->

### PML2-16-B02：FNOの安定性定数
- Level: B

$m=1$、$M=1$、$R_{\pm1}=1$、$R_0=0$、$W=0$、$b=0$、$\sigma(s)=\max\{0,s\}$ のFNO層について、任意の実数値周期連続入力 $h,g$ の出力差の上界を求めよ。上界と学習誤差を区別せよ。

<!-- solution-start -->
**詳細解答。** ReLUは、同符号の場合は距離を保つか0とし、異符号の場合も正の部分の差が元の距離を超えないので1-Lipschitzである。$\|W\|_{\mathrm{row}}=0$、$\sum_{k=-1}^1\|R_k\|_{\mathrm{row}}=1+0+1=2$。[FNO安定性定理](#thm-pml2-16-stability)へ代入して

$$
\|\mathcal Fh-\mathcal Fg\|_\infty
\le2\|h-g\|_\infty
$$

を得る。これは同じ学習済み層へ二つの入力を入れた際の差の上界であり、PDEの真の解作用素と $\mathcal F$ の距離を測るものではない。
<!-- solution-end -->

### PML2-16-B03：偶奇分割から4点FFT
- Level: B

配列 $h=(1,2,3,4)$ の正規化前DFTを偶奇分割で求め、正規化した係数も示せ。

<!-- solution-start -->
**詳細解答。** 偶数番目は $(1,3)$ なので長さ2の正規化前DFTは $(1+3,1-3)=(4,-2)$。奇数番目は $(2,4)$ なので $(6,-2)$。$\omega_4=e^{-2\pi i/4}=-i$ とし、[FFT再帰式](#thm-pml2-16-fft)へ $r=0,1$ を代入する。

$$
\begin{aligned}
F_0&=4+6=10,&F_2&=4-6=-2,\\
F_1&=-2+(-i)(-2)=-2+2i,&
F_3&=-2-(-i)(-2)=-2-2i.
\end{aligned}
$$

従って定義のDFTは各値を4で割った $(5/2,(-1+i)/2,-1/2,(-1-i)/2)$。
<!-- solution-end -->

### PML2-16-B04：パラメータ共有だけでは精度が出ない
- Level: B

任意の偶数 $N\ge4$ で $h_N(x)=\cos(2\pi(N+1)x)$ とし、$K(s)=2\cos(2\pi s)$ を固定する。真の連続畳み込みと、$M=1$、$R_{\pm1}=1$、$W=b=0$、恒等活性化の格子FNO出力を比較せよ。$R_k$ は $N$ に依存しない。

<!-- solution-start -->
**詳細解答。** $h_N$ の連続Fourier係数は $k=\pm(N+1)$ にのみ $1/2$ があり、$k=\pm1$ では0。[対角化定理](#thm-pml2-16-diagonal)から真の畳み込みは全点で0。一方、各格子点で

$$
h_N(j/N)=\cos(2\pi j+2\pi j/N)=\cos(2\pi j/N).
$$

よってDFTは $\widetilde h_1=\widetilde h_{N-1}=1/2$ を返し、格子FNOは $\cos(2\pi j/N)$ を返す。$j=0$ では誤差1である。$h_N$ 自体が $N$ に応じて高周波化しているため、固定された滑らかな入力についての収束の反例と混同しない。[格子周波数の同一視](#thm-pml2-16-alias)が効いた結果で、同じ重みを使えることは精度の保証ではない。
<!-- solution-end -->

### Level C：一つの入力に対する解像度依存を突き止める

### PML2-16-C01：8点と16点で変わるFourier層
- Level: C

周期入力を

$$
h(x)=1+2\cos(2\pi x)+\sin(4\pi x)+\cos(14\pi x)
$$

とする。$K(s)=2\cos(2\pi s)$、$W=b=0$、$\sigma(s)=s$、$M=1$、$R_{\pm1}=1$、$R_0=0$ で、以下を求めよ。

1. 真の連続畳み込み $K*h$。
2. $N=8$ のDFTで周波数 $\pm1$ の係数と格子FNO出力。
3. 同じ重みで $N=16$ とした場合の周波数 $\pm1$ と出力。
4. 真の出力との各格子上の最大誤差、および誤差が変化した理由。

<!-- solution-start -->
**詳細解答。**

**(1) 連続解。** [Fourier係数](#def-pml2-16-fourier)では、入力の非零周波数は $0,\pm1,\pm2,\pm7$。周波数 $\pm1$ の係数はそれぞれ $1$ である。核は $\pm1$ 成分だけを残すので、[対角化定理](#thm-pml2-16-diagonal)から

$$
(K*h)(x)=e^{2\pi ix}+e^{-2\pi ix}
=2\cos(2\pi x).
$$

**(2) 8点。** $7\equiv-1\pmod8$、$-7\equiv1\pmod8$ なので、$\cos(14\pi x)$ の係数 $1/2$ がそれぞれ周波数 $\mp1$ へ加わる。有限和に対する[エイリアシング定理](#thm-pml2-16-alias)より

$$
\widetilde h_1=\widetilde h_7=1+\frac12=\frac32.
$$

$k=\pm1$ で $R_k=1$ のため、8点FNO出力は

$$
(\mathcal F_8 h)_j
=\frac32e^{2\pi ij/8}+\frac32e^{-2\pi ij/8}
=3\cos(2\pi j/8).
$$

**(3) 16点。** 周波数7と $-7$ は $\pm1$ と剰余が一致しない。したがって

$$
\widetilde h_1=\widetilde h_{15}=1,\qquad
(\mathcal F_{16} h)_j=2\cos(2\pi j/16).
$$

**(4) 誤差と原因。** 8点では差が $\cos(2\pi j/8)$ で、$j=0$ において絶対値1を取り、他の節点でも1以下なので最大誤差は1。16点では真の出力の各格子評価と完全一致するので最大誤差0。入力関数も重み $R_{\pm1}$ も変えていない。変わったのは、周波数7が8点では周波数1に折り返すのに対し16点では別の周波数として識別される、という標本化条件である。これが「重みを共有できる」と「同精度で解ける」を区別すべき具体例である。
<!-- solution-end -->

## 10. この講で区別すべき三つの事実

1. 周期的で差だけに依存する核は、[畳み込みの対角化](#thm-pml2-16-diagonal)によりFourier係数へ各周波数の行列を掛ける形にできる。
2. 有限格子のDFTを[FFT](#thm-pml2-16-fft)で高速に計算できるが、FFTそのものが標本化誤差を解消するわけではない。
3. 同じ $R_k$ を別の解像度で使えても、[エイリアシング](#thm-pml2-16-alias)・モード切断・境界条件による誤差は別に評価する。

次のPML2-17では、入力の正則性、格子幅、モード切断、境界の延長を明示しながら、解像度と精度の関係を扱う。
