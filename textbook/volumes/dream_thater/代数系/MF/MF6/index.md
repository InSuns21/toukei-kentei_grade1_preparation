# MF6 モジュラー形式のL関数

[MF5 の正規化Hecke固有形式](../MF5/index.md#thm-mf5-eigenforms)では、Fourier係数が互いに素な添字で乗法的になることを証明しました。一方、[ANT2 のDirichlet級数](../../ANT/ANT2/index.md#def-ant2-complex-dirichlet-series)は係数列を複素変数の関数へ変えます。これらを合わせると素数ごとのEuler積を作れますが、それだけでは級数が収束する右半平面の外を説明できません。

本章では、変換則を積分の変数変換へ読み替えます。[CA12 のtheta Mellin表現](../../../解析系/CA/CA12/index.md#thm-ca12-mellin-representation)と同じ「係数列→Mellin積分→対称性」の道筋です。ただし、theta関数の半整数重さの変換則を、整数重さのカスプ形式の変換則と取り違えません。まずカスプでの指数減衰を確認し、次に上半平面の反転行列で積分の小さい高さを大きい高さへ移し、最後に固有形式の場合だけEuler積を組み立てます。

<!-- definition-example-audit: strict -->

## 1. 係数列からL関数を作る

[MF4で定義したカスプ形式](../MF4/index.md#def-mf4-level-form)のうち、整数 $N\ge1$、偶数 $k\ge2$、自明指標に対する $f\in S_k(\Gamma_0(N))$ を固定します。$\infty$ における幅は1なので、[MF2の$q$展開](../MF2/index.md#def-mf2-q-expansion)を使い

$$
f(\tau)=\sum_{n\ge1}a_nq^n,\qquad q=e^{2\pi i\tau}
$$

と書けます。定数項が0なのはカスプ形式の条件です。係数 $a_n$ を $n^{-s}$ で重み付けすればDirichlet級数ができますが、最初から全ての $s$ で収束すると考えてはいけません。

<a id="lem-mf6-growth"></a>
<!-- formal-statement-start -->
> **補題（カスプ形式の係数と端点での減衰）**  
> $N\ge1$、偶数 $k\ge2$、$f=\sum_{n\ge1}a_nq^n\in S_k(\Gamma_0(N))$ とする。$n\ge1$ について

$$
|a_n|\le C_f n^{k/2}.
$$

> また $y\to\infty$ では $f(iy)=O(e^{-2\pi y})$ である。
<!-- formal-statement-end -->

### 証明の見取り図

係数を取り出すFourier積分を高さ $y=1/n$ で行います。そのために、$y^{k/2}|f(x+iy)|$ が上半平面全体で有界であることをカスプでの消失から確認します。

<!-- proof-start -->
### 証明

$\tau=x+iy$ とする。[MF1の虚部変換公式](../MF1/index.md#thm-mf1-imaginary-action)と重さ $k$ の変換則から

$$
\operatorname{Im}(\gamma\tau)^{k/2}|f(\gamma\tau)|
=\frac{y^{k/2}|c\tau+d|^k|f(\tau)|}{|c\tau+d|^k}
=y^{k/2}|f(\tau)|.
$$

従って $H(\tau)=y^{k/2}|f(\tau)|$ は $\Gamma_0(N)$ 不変である。商のコンパクト部分上では連続だから有界である。各カスプ近傍では[MF4のスケーリング座標](../MF4/index.md#def-mf4-cusp-width)に移ると、カスプ形式のFourier展開は正の指数から始まる。高さ $v\to\infty$ で変換後の形式は $O(e^{-2\pi v/h})$ であり、$v^{k/2}e^{-2\pi v/h}\to0$。カスプは有限個なので、全上半平面で $H(\tau)\le C$ とできる。

周期1のFourier係数を高さ $y>0$ で取り出すと

$$
a_n=e^{2\pi ny}\int_0^1 f(x+iy)e^{-2\pi inx}\,dx,
\qquad
|a_n|\le C e^{2\pi ny}y^{-k/2}.
$$

$y=1/n$ を代入すれば $|a_n|\le Ce^{2\pi}n^{k/2}$ である。さらに $y\ge1$ なら

$$
|f(iy)|\le \sum_{n\ge1}|a_n|e^{-2\pi ny}
\le Ce^{-2\pi y}\sum_{n\ge1}n^{k/2}e^{-2\pi(n-1)},
$$

右辺の和は有限なので所望の減衰を得る。
<!-- proof-end -->

この上界は最良の係数評価を狙ったものではありません。**和と積分を交換するために十分な、再現可能な評価**として用います。

<a id="def-mf6-l-series"></a>
<!-- formal-statement-start -->
> **定義（カスプ形式のL関数）**  
> $N\ge1$、偶数 $k\ge2$、$f=\sum_{n\ge1}a_nq^n\in S_k(\Gamma_0(N))$ に対し、$\operatorname{Re}s>1+k/2$ で

$$
L(f,s)=\sum_{n=1}^{\infty}\frac{a_n}{n^s}
$$

> と定める。右辺を最初から解析接続後の式だとは解釈しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf6-l-series -->
**定義の確認**。[MF2のモジュラー判別式](../MF2/index.md#def-mf2-discriminant) $\Delta=q-24q^2+252q^3+\cdots\in S_{12}(SL_2(\mathbb Z))$ に対し、$N=1,k=12$ を選べます。補題によって $|a_n|\le Cn^6$ なので、$\operatorname{Re}s>7$ では

$$
L(\Delta,s)=1-24\cdot2^{-s}+252\cdot3^{-s}+\cdots
$$

が絶対収束します。$a_1=1$ でも、$\operatorname{Re}s\le7$ にこの級数を無条件で代入できるわけではありません。
<!-- definition-example-end -->

補題から $\sigma=\operatorname{Re}s>1+k/2$ なら

$$
\sum_{n\ge1}|a_n|n^{-\sigma}
\le C\sum_{n\ge1}n^{k/2-\sigma}<\infty.
$$

したがって[Dirichlet級数の絶対収束半平面での正則性](../../ANT/ANT2/index.md#thm-ant2-holomorphic-halfplane)により、この右半平面で $L(f,s)$ は正則です。

## 2. Mellin変換とGamma因子

$q^n$ を虚軸で評価すると $e^{-2\pi ny}$ になります。これを $y^{s-1}$ に掛けて積分すると、$n^{-s}$ が現れます。これは[CA12のtheta Mellin積分](../../../解析系/CA/CA12/index.md#thm-ca12-mellin-representation)で使ったGamma積分の仕組みです。

<a id="thm-mf6-mellin"></a>
<!-- formal-statement-start -->
> **定理（カスプ形式のMellin表現）**  
> $N\ge1$、偶数 $k\ge2$、$f=\sum_{n\ge1}a_nq^n\in S_k(\Gamma_0(N))$ とし、$\operatorname{Re}s>1+k/2$ とする。このとき

$$
\int_0^\infty f(iy)y^{s-1}\,dy
=(2\pi)^{-s}\Gamma(s)L(f,s).
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず絶対値の和を積分して有限であることを示し、その後に項別積分します。Gamma関数の引数は $s$ であり、Riemann ζ関数のtheta Mellin表現のような $s/2$ ではありません。

<!-- proof-start -->
### 証明

$\sigma=\operatorname{Re}s>1+k/2$ とする。$\sigma>0$ なので、$u=2\pi ny$ を置けばGamma積分から

$$
\int_0^\infty e^{-2\pi ny}y^{\sigma-1}\,dy
=(2\pi n)^{-\sigma}\int_0^\infty e^{-u}u^{\sigma-1}\,du
=(2\pi n)^{-\sigma}\Gamma(\sigma).
$$

従って係数の絶対値を掛けて和を取ると

$$
\sum_{n\ge1}|a_n|\int_0^\infty e^{-2\pi ny}y^{\sigma-1}\,dy
=(2\pi)^{-\sigma}\Gamma(\sigma)\sum_{n\ge1}|a_n|n^{-\sigma}<\infty.
$$

絶対可積分な級数なので積分と和を交換できる。複素変数 $s$ に戻して同じ置換を行えば

$$
\begin{aligned}
\int_0^\infty f(iy)y^{s-1}\,dy
&=\sum_{n\ge1}a_n\int_0^\infty e^{-2\pi ny}y^{s-1}\,dy\\
&=\sum_{n\ge1}a_n(2\pi n)^{-s}\Gamma(s)\\
&=(2\pi)^{-s}\Gamma(s)\sum_{n\ge1}a_nn^{-s}.
\end{aligned}
$$
<!-- proof-end -->

この積分が収束するのは右半平面だけでしょうか。いいえ。$y\to0$ の減衰も、モジュラー形式の変換則を使うと指数的であると分かります。この違いが解析接続の入口です。

## 3. Fricke作用が小さい高さと大きい高さを交換する

レベル1では $S:\tau\mapsto-1/\tau$ が基本でした。レベル $N$ では $y\leftrightarrow1/(Ny)$ を使うため、行列式が $N$ の行列を使います。[MF5の行列式つきslash作用](../MF5/index.md#def-mf5-slash)ならその正規化が定まっています。

<a id="def-mf6-fricke"></a>
<!-- formal-statement-start -->
> **定義（Fricke作用）**  
> $N\ge1$、偶数 $k\ge2$、$f\in S_k(\Gamma_0(N))$ とする。

$$
W_N=\begin{pmatrix}0&-1\\N&0\end{pmatrix},
\qquad
g=f|_kW_N.
$$

> $g$ を $f$ のFricke変換とする。具体的に

$$
g(\tau)=N^{-k/2}\tau^{-k}f\left(-\frac1{N\tau}\right).
$$
<!-- formal-statement-end -->

まず $W_N$ が変換則を保つことを行列で確かめます。$\gamma=\begin{pmatrix}a&b\\Nc&d\end{pmatrix}\in\Gamma_0(N)$ に対し、

$$
W_N^{-1}=\begin{pmatrix}0&1/N\\-1&0\end{pmatrix},
\qquad
W_N\gamma W_N^{-1}
=\begin{pmatrix}d&-c\\-Nb&a\end{pmatrix}\in\Gamma_0(N).
$$

下左成分は $N$ の倍数であり、行列式は $ad-Nbc=1$ のままです。逆向きの共役 $W_N^{-1}\gamma W_N$ も同じ形なので、$W_N$ は $\Gamma_0(N)$ を正規化します。[slash作用の右作用](../MF5/index.md#def-mf5-slash)を用いると

$$
g|_k\gamma=f|_k(W_N\gamma)
=f|_k(W_N\gamma W_N^{-1})W_N=f|_kW_N=g
$$

となり、$g$ の変換則が従います。上半平面での正則性は $W_N\tau=-1/(N\tau)\in\mathbb H$ とslashの式から従います。

残るのは **全カスプでの定数項の消失** です。[MF4のスケーリング行列・幅](../MF4/index.md#def-mf4-cusp-width)に従い、任意のカスプ $s=\sigma_s\infty$ を取ります。$W_N$ が有理境界を有理境界へ写し、群を正規化するので、ある $\delta\in\Gamma_0(N)$ とカスプ代表 $s'=\sigma_{s'}\infty$ を選んで $\delta W_Ns=s'$ とできます。このとき

$$
B=\sigma_{s'}^{-1}\delta W_N\sigma_s
=\begin{pmatrix}u&v\\0&w\end{pmatrix},
\qquad \det B=N>0,\quad \frac{u}{w}>0.
$$

$f$ は $s'$ でカスプ形式なので、幅 $h_{s'}$ の展開は $n\ge1$ から始まります。$f|_k\delta=f$ と右作用を使えば

$$
\begin{aligned}
(g|_k\sigma_s)(\tau)
&=(f|_k\sigma_{s'})|_k B(\tau)\\
&=(\det B)^{k/2}w^{-k}
\sum_{n\ge1}a_n(s')
\exp\left(\frac{2\pi i n v}{w h_{s'}}\right)
\exp\left(\frac{2\pi i n (u/w)\tau}{h_{s'}}\right).
\end{aligned}
$$

$u/w>0$ なので、$f|_k\sigma_{s'}$ のカスプ展開に $B$ を代入した級数は、虚部が十分大きい領域で絶対一様収束し、虚部を無限大へ送ると零になります。これは元のカスプ展開が定数項を持たないことによります。

一方、先に証明した $\Gamma_0(N)$ 不変性から、$g|_k\sigma_s$ は幅 $h_s$ の周期を持ちます。[周期正則関数の$q$表示](../MF2/index.md#thm-mf2-q-coordinate)を適用すると

$$
(g|_k\sigma_s)(\tau)=\sum_{n\ge0}b_n(s)q_s^n,
\qquad q_s=e^{2\pi i\tau/h_s}.
$$

と展開されます。左辺は虚部を無限大へ送ると零になるため、$b_0(s)=0$ です。任意のカスプ $s$ でこの結論が成立するため、[カスプ形式の定義](../MF4/index.md#def-mf4-level-form)の変換則と全カスプでの消失という両条件が揃い、$g\in S_k(\Gamma_0(N))$ が示されました。

<!-- definition-example-start: def-mf6-fricke -->
**定義の確認**。$N=1$ なら $W_1=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ は[MF1の生成元](../MF1/index.md#thm-mf1-generators) $S$ そのもので、レベル1の変換則により $f|_kW_1=f$ です。一般の $N$ では

$$
W_N^2=-NI,\qquad (f|_kW_N)|_kW_N=f|_k(-NI)=(-1)^kf=f
$$

です。最後の等号には $k$ が偶数であることを使いました。従ってFricke作用はこの空間上の線形な対合であり、固有値は $\varepsilon=1$ または $-1$ に限られます。ただし**全ての形式が固有形式という意味ではありません**。

レベル2の直接例も確認します。$f(\tau)=\Delta(\tau)$ はレベル1のカスプ形式なので、レベル2の両カスプでも消失します。$\Delta(-1/z)=z^{12}\Delta(z)$ を $z=2\tau$ へ適用すると

$$
\begin{aligned}
g(\tau)=(\Delta|_{12}W_2)(\tau)
&=2^{-6}\tau^{-12}\Delta\left(-\frac1{2\tau}\right)\\
&=2^{-6}\tau^{-12}(2\tau)^{12}\Delta(2\tau)
=2^6\Delta(2\tau).
\end{aligned}
$$

[レベル2のカスプは $\infty$ と $0$](../MF4/index.md#prop-mf4-prime-cusps) で、$0$ のスケーリング行列は $S$、幅は2です。[MF5で確認した $\Delta(2\tau)$ のカスプ展開](../MF5/index.md#def-mf5-level-operators)を使えば

$$
g(\tau)=2^6q^2+O(q^4),\qquad
(g|_{12}S)(\tau)=2^{-6}\Delta(\tau/2)
=2^{-6}q_0+O(q_0^2),\quad q_0=e^{\pi i\tau}.
$$

両方とも負冪と定数項がなく、$g\in S_{12}(\Gamma_0(2))$ を直接確認できました。さらに $(g|_{12}W_2)=f$ も上の対合計算から従います。
<!-- definition-example-end -->

虚軸上で上の定義に $\tau=it$ を代入すると

$$
g(it)=N^{-k/2}(it)^{-k}f\left(\frac{i}{Nt}\right).
$$

$t=1/(Ny)$ と置けば次の相互関係を得ます。

$$
f(iy)=i^kN^{-k/2}y^{-k}g\left(\frac{i}{Ny}\right).
$$

ここでは $i^k$ を落としてはいけません。例えば重さ2なら $i^2=-1$、重さ12なら $i^{12}=1$ です。

## 4. Mellin積分の整解析接続と対称性

Dirichlet級数自体は十分右側だけで定義しました。Mellin積分に $N^{s/2}$ を掛けたものを新しい関数として考えると、$s$ と $k-s$ が同じ式の中に現れます。この補正を次の定義にまとめます。

<a id="def-mf6-completed"></a>
<!-- formal-statement-start -->
> **定義（完成L関数）**  
> $N\ge1$、偶数 $k\ge2$、$f\in S_k(\Gamma_0(N))$ とする。$\operatorname{Re}s>1+k/2$ で

$$
\Lambda(f,s)=N^{s/2}(2\pi)^{-s}\Gamma(s)L(f,s)
$$

> と置く。$N^{s/2}=\exp((s/2)\log N)$ は実数 $\log N$ で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf6-completed -->
**定義の確認**。$N=1$ なら $N^{s/2}=1$ であり、$\Lambda(\Delta,s)=(2\pi)^{-s}\Gamma(s)L(\Delta,s)$ です。$N=11$ なら $11^{s/2}$ が残ります。これは単なる飾りではなく、積分分割点 $y=1/\sqrt N$ を使う際に係数を $s\leftrightarrow k-s$ で対称にする因子です。
<!-- definition-example-end -->

<a id="thm-mf6-functional-equation"></a>
<!-- formal-statement-start -->
> **定理（Fricke変換と完成L関数の関数等式）**  
> $N\ge1$、偶数 $k\ge2$、$f\in S_k(\Gamma_0(N))$、$g=f|_kW_N$ とする。初めに絶対収束半平面で定義した $\Lambda(f,s)$ と $\Lambda(g,s)$ は複素平面全体へ**整関数**として延長され、

$$
\Lambda(f,s)=i^k\Lambda(g,k-s)
$$

> を満たす。特に $f|_kW_N=\varepsilon f$（$\varepsilon\in\{1,-1\}$）なら

$$
\Lambda(f,s)=i^k\varepsilon\,\Lambda(f,k-s).
$$

> レベル1では $g=f$ なので $\Lambda(f,s)=i^k\Lambda(f,k-s)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Mellin積分を $1/\sqrt N$ で分割し、低い高さの側だけ $t=1/(Ny)$ と置き換えます。両項が高さ $1/\sqrt N$ から無限大への積分に変わるので、**任意の複素数 $s$** で収束します。$f$ と $g$ を交換して同じ式を作り、Fricke作用を2回行うと元へ戻ることを使えば関数等式が出ます。

<!-- proof-start -->
### 証明

$J_f(s)=\int_0^\infty f(iy)y^{s-1}\,dy$ と置く。大きい $y$ では[係数減衰](#lem-mf6-growth)がある。小さい $y$ では直前に計算したFrickeの相互関係と $g(it)=O(e^{-2\pi t})$ から

$$
|f(iy)|\le C y^{-k}\exp\left(-\frac{2\pi}{Ny}\right)\quad(0<y\le1/\sqrt N)
$$

である。従って $J_f(s)$ は任意の $s\in\mathbb C$ で絶対収束する。コンパクトな $s$ の集合上でも同じ端点評価が共通の可積分優関数を与えるので、$J_f$ は整関数である。

元の収束半平面では[Mellin表現](#thm-mf6-mellin)より $\Lambda(f,s)=N^{s/2}J_f(s)$。これを全平面への延長の定義とする。積分を分けて

$$
J_f(s)
=\int_{1/\sqrt N}^{\infty}f(iy)y^{s-1}\,dy
+\int_0^{1/\sqrt N}f(iy)y^{s-1}\,dy.
$$

第2項へFrickeの式を代入し、$t=1/(Ny)$、$dy=-dt/(Nt^2)$ と置く。積分区間は $y=0$ で $t=\infty$、$y=1/\sqrt N$ で $t=1/\sqrt N$ となり、

$$
\begin{aligned}
\int_0^{1/\sqrt N}f(iy)y^{s-1}\,dy
&=i^kN^{-k/2}\int_0^{1/\sqrt N}g\left(\frac{i}{Ny}\right)y^{s-k-1}\,dy\\
&=i^kN^{-k/2}N^{k-s}
\int_{1/\sqrt N}^{\infty}g(it)t^{k-s-1}\,dt\\
&=i^kN^{k/2-s}\int_{1/\sqrt N}^{\infty}g(it)t^{k-s-1}\,dt.
\end{aligned}
$$

従って全ての $s$ で

$$
\begin{aligned}
\Lambda(f,s)
={}&N^{s/2}\int_{1/\sqrt N}^{\infty}f(iy)y^{s-1}\,dy\\
&+i^kN^{(k-s)/2}\int_{1/\sqrt N}^{\infty}g(iy)y^{k-s-1}\,dy.
\end{aligned}
$$

右辺の2積分は上端で指数的に減衰し、下端は正の定数なので、全平面で整関数である。

次に同じ式へ $g$ と $k-s$ を代入する。Fricke作用を2回施すと $g|_kW_N=f$（$k$ は偶数）なので

$$
\begin{aligned}
\Lambda(g,k-s)
={}&N^{(k-s)/2}\int_{1/\sqrt N}^{\infty}g(iy)y^{k-s-1}\,dy\\
&+i^kN^{s/2}\int_{1/\sqrt N}^{\infty}f(iy)y^{s-1}\,dy.
\end{aligned}
$$

これに $i^k$ を掛けると $(i^k)^2=(-1)^k=1$ によって最初の式へ戻る。よって $\Lambda(f,s)=i^k\Lambda(g,k-s)$。Fricke固有性がある場合だけ $g=\varepsilon f$ を代入して、同一関数の等式が得られる。
<!-- proof-end -->

**何が延長されたか。** $\Lambda(f,s)$ が整関数だと分かったので、Gamma関数の逆数 $1/\Gamma(s)$ が整関数であることを用い、

$$
L(f,s)=N^{-s/2}(2\pi)^s\frac{\Lambda(f,s)}{\Gamma(s)}
$$

として $L(f,s)$ 自体も整関数へ延長されます。ただし延長後の値を、収束しない元のDirichlet級数と同一視してはいけません。また一般の $f$ に対する関数等式の相手は **$g=f|_kW_N$** であり、Fricke固有性を仮定せずに同じ $f$ へ戻してはいけません。非自明なDirichlet指標ではFricke作用は指標や双対形式も変えるので、本章の自明指標の式を無条件に適用しません。

## 5. Euler積はHecke固有性から生まれる

[Mellin表現](#thm-mf6-mellin)はカスプ形式なら固有性なしでも成立しました。一方、Euler積は係数に乗法性が必要です。[ANT2の乗法的係数のEuler積](../../ANT/ANT2/index.md#thm-ant2-euler-product)を使うので、形式に追加条件を置きます。

<a id="thm-mf6-euler"></a>
<!-- formal-statement-start -->
> **定理（Hecke固有形式のEuler積）**  
> 偶数 $k\ge2$、零でないレベル1の正規化同時Hecke固有カスプ形式

$$
f=\sum_{n\ge1}a_nq^n\in S_k(SL_2(\mathbb Z)),\qquad a_1=1
$$

> に対し、$\operatorname{Re}s>1+k/2$ で絶対収束する積として

$$
L(f,s)=\prod_{p\ \mathrm{prime}}
\left(1-a_pp^{-s}+p^{k-1-2s}\right)^{-1}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

同じ素数の冪は2項漸化式を生成関数に直し、異なる素数は乗法性を使います。分母の二次項が $p^{k-1}$ となる理由は、[MF5のHecke合成則](../MF5/index.md#thm-mf5-hecke-algebra)にあります。

<!-- proof-start -->
### 証明

[同時固有形式と乗法的Fourier係数](../MF5/index.md#thm-mf5-eigenforms)から、$(m,n)=1$ なら $a_{mn}=a_ma_n$、また $r\ge1$ に対し

$$
a_{p^{r+1}}=a_pa_{p^r}-p^{k-1}a_{p^{r-1}},
\qquad a_{p^0}=1.
$$

形式的変数 $X$ に対して $A_p(X)=\sum_{r\ge0}a_{p^r}X^r$ と置く。$a_p=a_{p^1}$ だから、係数を順に比較すると

$$
\begin{aligned}
(1-a_pX+p^{k-1}X^2)A_p(X)
&=a_1+(a_p-a_pa_1)X\\
&\quad+\sum_{r\ge2}(a_{p^r}-a_pa_{p^{r-1}}+p^{k-1}a_{p^{r-2}})X^r\\
&=1.
\end{aligned}
$$

ここで $a_1=1$ を使った。従って $A_p(X)=(1-a_pX+p^{k-1}X^2)^{-1}$。元のDirichlet級数は[係数上界](#lem-mf6-growth)により $\operatorname{Re}s>1+k/2$ で絶対収束する。[ANT2のEuler積定理](../../ANT/ANT2/index.md#thm-ant2-euler-product)の乗法性と絶対収束の仮定が両方満たされるので、$X=p^{-s}$ を代入した各局所級数の積を取れて、結論を得る。
<!-- proof-end -->

**レベル $N$ の素数の区別。** $p\nmid N$ で $T_p f=a_pf$ なら[合同部分群上の素数作用素の係数](../MF5/index.md#prop-mf5-level-q)から、$m=p^r$ を代入して同じ2項漸化式を得ます。一方 $p\mid N$ で **さらに** $U_pf=a_pf$ が成り立つ場合は

$$
a_{pm}=a_pa_m\quad(m\ge1),
\qquad
\sum_{r\ge0}a_{p^r}X^r=(1-a_pX)^{-1}.
$$

従って、この追加固有性と全体の乗法性が成立する形式では、悪い素数の局所因子は一次因子（$a_p=0$ なら因子1）になります。ただし、レベル $N$ の任意のカスプ形式について $U_p$ 固有性・乗法性を仮定してよいわけではありません。oldform/newformとレベルを割る素数のより精密な構造はMF7で学びます。一般のDirichlet指標 $\chi$ の良い素数の因子では二次項が $\chi(p)p^{k-1-2s}$ に変わり、本章の自明指標の公式とは区別します。

**計算例：$\Delta$ の素数2の因子。** $k=12$、$a_2=-24$ なので

$$
\frac1{1+24X+2048X^2}
=1-24X+(576-2048)X^2+\cdots
=1-24X-1472X^2+\cdots.
$$

これは[MF5の $\Delta$ に対する漸化式](../MF5/index.md#thm-mf5-eigenforms)から得る $a_4=-1472$ と一致します。分母を $1-a_pX$ の一次式にすると、$2048$ が失われます。

## 6. 中心点と関数等式の符号

重さ $k$ の関数等式で $s$ と $k-s$ が交換されるので、その中心は $s=k/2$ です。重さ2のときが $s=1$ であり、「全てのL関数の中心が1」というわけではありません。

<a id="cor-mf6-central"></a>
<!-- formal-statement-start -->
> **系（中心値が強制的に零になる条件）**  
> $N\ge1$、偶数 $k\ge2$、$f\in S_k(\Gamma_0(N))$ が $f|_kW_N=\varepsilon f$、$\varepsilon\in\{1,-1\}$ を満たすとする。$w=i^k\varepsilon$ と置くと

$$
\Lambda(f,k/2)=w\Lambda(f,k/2).
$$

> $w=-1$ なら $L(f,k/2)=0$ である。$w=+1$ だけから非零性は結論できない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Fricke関数等式](#thm-mf6-functional-equation)へ $s=k/2$ を代入すると $k-s=k/2$ である。従って $(1-w)\Lambda(f,k/2)=0$。$w=-1$ では $2\Lambda(f,k/2)=0$、すなわち完成L関数の中心値は0である。$k/2$ は正整数だから $\Gamma(k/2)$ は有限で零でなく、$N^{k/4}(2\pi)^{-k/2}$ も非零なので、定義より $L(f,k/2)=0$ が従う。$w=+1$ なら式は $\Lambda=\Lambda$ という恒等式であり、値の非零性に関する条件は出ない。
<!-- proof-end -->

レベル1の $\Delta$ は $k=12$、$\varepsilon=1$ です。従って $w=i^{12}=1$、中心 $s=6$ で関数等式だけから零点の有無は決まりません。もし重さ2のFricke固有形式が $\varepsilon=1$ なら $w=i^2=-1$ なので中心 $s=1$ に零点を持ちます。ここでは固有性の検証を省かず、**そうした形式が与えられた場合**という条件付きの主張です。

## 7. 演習と詳細解答

### A1. Mellin積分の変数変換

$n\ge1$、$\operatorname{Re}s>0$ について $\int_0^\infty e^{-2\pi ny}y^{s-1}\,dy$ を求め、$2\pi$ と $n$ の指数を説明せよ。

- Level: A
- ID: MF6-A1

<!-- solution-start -->
**詳細解答**　$u=2\pi ny$ とすると、$y=u/(2\pi n)$、$dy=du/(2\pi n)$。従って

$$
\begin{aligned}
\int_0^\infty e^{-2\pi ny}y^{s-1}\,dy
&=\int_0^\infty e^{-u}\left(\frac{u}{2\pi n}\right)^{s-1}\frac{du}{2\pi n}\\
&=(2\pi n)^{-s}\int_0^\infty e^{-u}u^{s-1}\,du\\
&=(2\pi)^{-s}n^{-s}\Gamma(s).
\end{aligned}
$$

Gamma積分が収束するのは $\operatorname{Re}s>0$ である。$n^{-s}$ は置換の $y^{s-1}$ と $dy$ の両方の因子から生じる。
<!-- solution-end -->

### A2. 収束範囲の十分条件

重さ8のカスプ形式の係数について $|a_n|\le Cn^4$ が分かっている。Dirichlet級数の絶対収束を保証できる右半平面を答え、$\operatorname{Re}s=5$ では何が不足するか述べよ。

- Level: A
- ID: MF6-A2

<!-- solution-start -->
**詳細解答**　$\sigma=\operatorname{Re}s$ とおくと

$$
\sum_{n\ge1}|a_n n^{-s}|
\le C\sum_{n\ge1}n^{4-\sigma}.
$$

右辺の指数は $4-\sigma<-1$、すなわち $\sigma>5$ で収束する。$\sigma=5$ では右辺が調和級数 $\sum 1/n$ となり発散する。この評価だけでは元の級数が発散すると証明したことにはならず、**絶対収束の保証ができない**という結論にとどまる。
<!-- solution-end -->

### A3. Fricke作用を二度施す

$W_N=\begin{pmatrix}0&-1\\N&0\end{pmatrix}$ を二乗せよ。偶数の重さ $k$ について $(f|_kW_N)|_kW_N=f$ となる理由を、slash作用のスカラー因子を含めて説明せよ。

- Level: A
- ID: MF6-A3

<!-- solution-start -->
**詳細解答**　行列積は

$$
W_N^2=\begin{pmatrix}-N&0\\0&-N\end{pmatrix}=-NI.
$$

[MF5のslash作用](../MF5/index.md#def-mf5-slash)の右作用から $(f|_kW_N)|_kW_N=f|_k(-NI)$。$-NI$ の行列式は $N^2$、下行は $(0,-N)$ なので

$$
(f|_k(-NI))(\tau)=\frac{(N^2)^{k/2}}{(-N)^k}f(\tau)=(-1)^kf(\tau)=f(\tau).
$$

最後に $k$ が偶数であることを使う。負のスカラー倍を正のスカラー倍と同じと決めつけず、$(-1)^k$ を確認した。
<!-- solution-end -->

### A4. 局所因子の2次の係数

$k=12$、$a_2=-24$ とする。$(1-a_2X+2^{k-1}X^2)^{-1}$ を $X^2$ まで展開せよ。

- Level: A
- ID: MF6-A4

<!-- solution-start -->
**詳細解答**　$2^{11}=2048$ なので分母は $1+24X+2048X^2$。逆数を $1+bX+cX^2+O(X^3)$ と置くと、積の $X$ 係数は $24+b=0$、$X^2$ 係数は $2048+24b+c=0$。従って $b=-24$、$c=-2048-24(-24)=576-2048=-1472$。よって $1-24X-1472X^2+O(X^3)$ となる。
<!-- solution-end -->

### B1. Fricke置換の係数を検算する

$f(iy)=i^kN^{-k/2}y^{-k}g(i/(Ny))$ を仮定し、

$$
N^{s/2}\int_0^{1/\sqrt N} f(iy)y^{s-1}\,dy
$$

を $g$ の $[1/\sqrt N,\infty)$ 上の積分へ変換せよ。置換による指数をすべて示せ。

- Level: B
- ID: MF6-B1

<!-- solution-start -->
**詳細解答**　まず関係式を代入して

$$
i^kN^{(s-k)/2}\int_0^{1/\sqrt N}g\left(\frac{i}{Ny}\right)y^{s-k-1}\,dy
$$

を得る。$t=1/(Ny)$ により $dy=-N^{-1}t^{-2}dt$、$y^{s-k-1}=N^{k+1-s}t^{k+1-s}$ なので、その積は $-N^{k-s}t^{k-s-1}dt$。向きを反転すると

$$
\begin{aligned}
&i^kN^{(s-k)/2}N^{k-s}
\int_{1/\sqrt N}^{\infty}g(it)t^{k-s-1}\,dt\\
&\qquad=i^kN^{(k-s)/2}\int_{1/\sqrt N}^{\infty}g(it)t^{k-s-1}\,dt.
\end{aligned}
$$

従って $(k-s)/2$ が指数として残る。$i^k$ と $N^{-1}$ のJacobianを落とすと関数等式の正規化が壊れる。
<!-- solution-end -->

### B2. 素数2でEuler積の漸化式を調べる

レベル1・重さ12の正規化同時固有形式で $a_2=-24$ とする。$a_4$ と $a_8$ を求め、素数2の局所生成関数の先頭4項と照合せよ。

- Level: B
- ID: MF6-B2

<!-- solution-start -->
**詳細解答**　[MF5の素数冪漸化式](../MF5/index.md#thm-mf5-eigenforms)を $p=2$、$k-1=11$ に適用する。$a_1=1$ なので

$$
a_4=a_2^2-2^{11}a_1=576-2048=-1472.
$$

次に

$$
a_8=a_2a_4-2^{11}a_2=(-24)(-1472)-2048(-24)=35328+49152=84480.
$$

局所生成関数は

$$
\frac1{1+24X+2048X^2}
=1-24X-1472X^2+84480X^3+\cdots.
$$

両辺へ分母を掛けると、$X^3$ 係数は $84480+24(-1472)+2048(-24)=84480-35328-49152=0$ である。
<!-- solution-end -->

### B3. 中心値の零と非零の違い

偶数 $k$ のFricke固有形式 $f$ が $\varepsilon\in\{\pm1\}$ を持つとする。$k=2,\varepsilon=1$ と $k=12,\varepsilon=1$ のそれぞれで、関数等式だけから中心値の消失を言えるか判断せよ。

- Level: B
- ID: MF6-B3

<!-- solution-start -->
**詳細解答**　[中心値の系](#cor-mf6-central)より符号は $w=i^k\varepsilon=(-1)^{k/2}\varepsilon$。$k=2,\varepsilon=1$ では $w=-1$。$s=1$ に代入すると $\Lambda(f,1)=-\Lambda(f,1)$、従って $\Lambda(f,1)=0$。Gamma因子は $\Gamma(1)=1$ で非零だから $L(f,1)=0$。$k=12,\varepsilon=1$ では $w=1$、中心は $s=6$。関数等式は $\Lambda(f,6)=\Lambda(f,6)$ となるだけで、$L(f,6)$ の零・非零のどちらも決定しない。
<!-- solution-end -->

### B4. Mellin積分の正当化に必要な仮定

$|a_n|\le Cn^{k/2}$ を満たすFourier係数の系列を考える。どの半平面なら $\sum a_ne^{-2\pi ny}$ と積分の交換が絶対収束によって許されるか示せ。また、Fricke変換があれば完成L関数の積分が全平面で収束する理由を説明せよ。

- Level: B
- ID: MF6-B4

<!-- solution-start -->
**詳細解答**　$\sigma>1+k/2$ では $y$ 積分の絶対値の和が

$$
\sum_{n\ge1}|a_n|\int_0^\infty e^{-2\pi ny}y^{\sigma-1}dy
=(2\pi)^{-\sigma}\Gamma(\sigma)\sum_{n\ge1}|a_n|n^{-\sigma}
\le C(2\pi)^{-\sigma}\Gamma(\sigma)\sum_{n\ge1}n^{k/2-\sigma}<\infty
$$

となるので交換が許される。Fricke変換は $0<y\le1/\sqrt N$ で $f(iy)=O(y^{-k}e^{-2\pi/(Ny)})$ を与える。任意の固定 $\sigma$ について $y^{\sigma-k-1}e^{-2\pi/(Ny)}$ は $y\to0$ で可積分であり、大きい $y$ 側は $e^{-2\pi y}y^{\sigma-1}$ が可積分である。従って完成L関数の積分は全複素平面へ延長できる。これは元のDirichlet級数の収束域を拡大したとの主張ではない。
<!-- solution-end -->

### C1. $\Delta$ の解析と算術をつなぐ

レベル1、重さ12の $\Delta=q-24q^2+252q^3+\cdots$ と $\dim S_{12}=1$ を用いる。(i) $L(\Delta,s)$ を定義できる右半平面を係数上界から示し、Mellin積分を得よ。(ii) Fricke作用を決定し、Mellin積分の整解析接続とFricke対称性を正しいGamma因子込みで示せ。(iii) 素数2と3の局所因子を求め、$a_6$ を二つの因子から再現せよ。(iv) $s=6$ の値が関数等式から零と決定できるか答えよ。

- Level: C
- ID: MF6-C1

<!-- solution-start -->
**詳細解答**　(i) [係数上界](#lem-mf6-growth)を $k=12$ に適用すると $|a_n|\le Cn^6$ である。従って $\operatorname{Re}s>7$ では $\sum |a_n|n^{-\operatorname{Re}s}$ が有限で、

$$
L(\Delta,s)=\sum_{n\ge1}a_nn^{-s},\qquad
\int_0^\infty\Delta(iy)y^{s-1}dy=(2\pi)^{-s}\Gamma(s)L(\Delta,s)
$$

となる。積分交換は絶対値積分が $(2\pi)^{-\sigma}\Gamma(\sigma)\sum|a_n|n^{-\sigma}<\infty$ であることから従う。

(ii) レベル1の変換則で $\Delta|_{12}W_1=\Delta$。従って $g=\Delta$、$i^{12}=1$ である。[関数等式の定理](#thm-mf6-functional-equation)の証明では小さい高さを $t=1/y$ で移すと、両積分の下端が1になり、全平面で指数減衰する。よって

$$
\Lambda(\Delta,s)=(2\pi)^{-s}\Gamma(s)L(\Delta,s)
$$

は整関数へ延長され、$\Lambda(\Delta,s)=\Lambda(\Delta,12-s)$ を満たす。延長後の $L$ は $\Gamma(s)$ の逆数を掛けて定める。

(iii) [MF3の次元公式](../MF3/index.md#thm-mf3-dimension)で $S_{12}$ は1次元、[MF5の作用](../MF5/index.md#thm-mf5-coefficient)は $S_{12}$ を保つから $\Delta$ は正規化同時固有形式である。従って[Euler積定理](#thm-mf6-euler)を適用できる。素数2,3ではそれぞれ

$$
\begin{aligned}
L_2(s)&=(1+24\cdot2^{-s}+2048\cdot2^{-2s})^{-1},\\
L_3(s)&=(1-252\cdot3^{-s}+3^{11}\cdot3^{-2s})^{-1}.
\end{aligned}
$$

最初の因子の $2^{-s}$ 係数は $-24$、後者の $3^{-s}$ 係数は $252$。積の $6^{-s}$ 係数は $(-24)\cdot252=-6048$ となり、互いに素な添字の乗法性と一致する。

(iv) 重さ12の中心は $s=6$。関数等式の符号は $i^{12}=1$ なので $\Lambda(\Delta,6)=\Lambda(\Delta,6)$ に過ぎない。関数等式だけから $L(\Delta,6)=0$ とも非零とも結論できない。
<!-- solution-end -->

## 8. 次章への接続

Mellin変換・Fricke作用からの解析接続は、Hecke固有性を仮定しなくても成立しました。一方Euler積は、素数係数が他の係数を支配するという追加構造を使いました。ここではレベル1の二次因子を完全に導き、レベルを割る素数では $U_p$ 固有性を別に要することを確認しました。MF7では、どの固有形式が低いレベルから持ち上がったものかを分離し、newformと局所因子の関係を扱います。
