# MQFC5 Euclid自由場の共分散

実時間の自由場からは指数振動を含む二点分布が得られます。[QFT20の自由モードのEuclid核](../../QFT/QFT20/index.md#thm-qft20-euclidean-kernel)では時間をEuclid化して減衰する指数関数を得ました。今回は逆に、Euclid空間の微分作用素だけを出発点として二点の相関を作ります。まだ無限次元の確率測度を仮定する必要はありません。次講で測度を構成するため、試験関数の組に割り当てる共分散が正で連続であることを確かめます。

直接の前提は [MQFC1](../MQFC1/index.md)、[QFT20](../../QFT/QFT20/index.md)、[PDE3](../../../解析系/PDE/PDE3/index.md) です。$d\ge1$ をEuclid空間の全次元とし、実時間の計量ではなく $|x|^2=\sum_{j=1}^d x_j^2$ を用います。質量はまず $m>0$ とします。

## 1. 二次形式の逆を周波数ごとに求める

[Schwartz空間](../MQFC1/index.md#def-mqfc1-schwartz) $S=\mathcal S(\mathbb R^d)$ の元を測定の重みとします。実数値の重みは実の測定に、複素数値の重みは計算に使います。$dx$ はLebesgue測度です。$S$ 上のFourier規約は [MQFC1のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) と同じです。

$$
\widehat f(p)=\int e^{-ip\cdot x}f(x)\,dx,\qquad
f(x)=(2\pi)^{-d}\int e^{ip\cdot x}\widehat f(p)\,dp.
$$

$\Delta=\sum_j\partial_j^2$ と置きます。[自由スカラー場のEuclid作用](../../QFT/QFT20/index.md#def-qft20-euclidean-action)の二次形式を一般次元で見ると、実の $u\in S$ に対して部分積分（境界項は急減少性で消える）により

$$
\int (|\nabla u|^2+m^2u^2)\,dx
=\int u(-\Delta+m^2)u\,dx.
$$

ここで $A_m=-\Delta+m^2$ と書きます。[分布微分のFourier表示](../MQFC1/index.md#prop-mqfc1-derivative)を二回使うと、$\widehat{\partial_j^2u}=-p_j^2\widehat u$ なので

$$
\widehat{A_mu}(p)=a_m(p)\widehat u(p),\qquad
a_m(p)=|p|^2+m^2.
$$

したがって $A_mu=f$ を解くには周波数ごとに $a_m$ で割ればよいことになります。周波数側で関数に掛ける係数をFourier乗数といいます。有限次元で正の二次形式を表す行列の逆が共分散になることに対応して、ここでは逆の乗数から共分散を作ります。

<a id="def-mqfc5-covariance-form"></a>

<!-- formal-statement-start -->
> **定義（Euclid自由場の試験関数共分散）**
> $d\ge1$、$m>0$ とし、$p\in\mathbb R^d$ に対して

$$
w_m(p)=\frac1{|p|^2+m^2}
$$

> と置く。$f,g\in\mathcal S(\mathbb R^d)$ に対し、試験関数共分散を

$$
B_m(f,g)=(2\pi)^{-d}\int
\overline{\widehat f(p)}w_m(p)\widehat g(p)\,dp
$$

> と定める。第1引数は共役線形、第2引数は線形である。実の試験関数に制限して両引数について実線形な写像として用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc5-covariance-form -->
### 直接例

**定義の確認**。$d=1,m=2$ とし、$\widehat f(p)=e^{-p^2}$、$g=2f$ とします。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier)により逆変換 $f$ もSchwartz関数です。実偶関数の逆変換は実偶関数なので $f$ は実です。積分は

$$
B_2(f,g)=\frac1{2\pi}\int_{\mathbb R}
\frac{2e^{-2p^2}}{p^2+4}\,dp.
$$

被積分関数は正で $e^{-2p^2}/2$ 以下だから有限な正の実数です。任意の複素数 $a,b$ についてFourier変換の線形性と積分の線形性を使うと、第1引数の $af+bg$ は $\bar a\overline{\widehat f}+\bar b\overline{\widehat g}$ を、第2引数の $af+bg$ は $a\widehat f+b\widehat g$ を生みます。これで両引数の線形性の条件を確認できます。
<!-- definition-example-end -->

## 2. 逆作用素と二点分布核

共分散が単なる形式的積分でないことを示します。$w_m$ の逆Fourier積分は点ごとに絶対収束するとは限らないため、$G_m=\mathcal F^{-1}w_m$ を[緩増加分布](../MQFC1/index.md#def-mqfc1-tempered)として定義します。$\langle G_m,h\rangle$ は分布の線形作用であって内積ではありません。

<a id="thm-mqfc5-inverse"></a>

<!-- formal-statement-start -->
> **定理（質量付きEuclid作用素の逆と共分散核）**
> $d\ge1$、$m>0$、$A_m=-\Delta+m^2$、$w_m(p)=(|p|^2+m^2)^{-1}$ とする。$A_m$ は $\mathcal S(\mathbb R^d)$ 上の線形全単射であり、逆作用素 $C_m$ は

$$
C_m g=\mathcal F^{-1}(w_m\widehat g)
$$

> で与えられる。$G_m=\mathcal F^{-1}w_m$ は $A_mG_m=\delta_0$ を満たす唯一の緩増加分布である。さらに $B_m(f,g)$ は

$$
B_m(f,g)=\int \overline{f(x)}(C_mg)(x)\,dx
=\langle G_m,h_{f,g}\rangle,\qquad
h_{f,g}(z)=\int\overline{f(y+z)}g(y)\,dy
$$

> と表される。
<!-- formal-statement-end -->

### 証明の見取り図

多項式 $a_m$ はどこでも正なので割り算で特異点を作りません。分布についても試験関数を $a_m$ で割る操作が可能です。最後に二つの重みを位置差 $z=x-y$ でまとめます。

<!-- proof-start -->
### 証明

$w_m$ の任意の階数の微分は、多項式を $a_m$ の正整数冪で割った有限和です。実際、$P/a_m^k$ の $p_j$ 微分は

$$
\frac{\partial_jP}{a_m^k}
-\frac{2kp_jP}{a_m^{k+1}}
$$

となるので帰納できます。$a_m\ge m^2$ により各微分は高々多項式増大です。

積の微分則から、各半ノルム $p_{N,r}(w_m v)$ は有限個の $p_{N+q,r}(v)$ の定数倍で抑えられます（$q$ は現れる単項式の指数の和の最大値）。よって $w_m v\in S$ です。

多項式 $a_m$ の乗算も同様に $S$ を保ちます。両乗算の積が1であり、[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier)が全単射だから $C_mA_m=A_mC_m=I$ です。

$w_m$ は有界なので[多項式増大関数による緩増加分布](../MQFC1/index.md#prop-mqfc1-polynomial)として定まり、逆Fourier変換も[分布のFourier変換](../MQFC1/index.md#def-mqfc1-duality)により緩増加分布です。[分布微分のFourier表示](../MQFC1/index.md#prop-mqfc1-derivative)と $\widehat{\delta_0}=1$ から

$$
\widehat{A_mG_m}=a_mw_m=1=\widehat{\delta_0}.
$$

Fourier変換の単射性で $A_mG_m=\delta_0$ です。別の解との差 $T$ は $a_m\widehat T=0$ を満たします。任意の $\psi\in S$ に対し $w_m\psi\in S$ なので

$$
\langle\widehat T,\psi\rangle
=\langle a_m\widehat T,w_m\psi\rangle=0.
$$

従って $T=0$ です。

$C_mg$ の逆Fourier積分に $\overline f$ を掛けて積分します。$|f|$ と $|w_m\widehat g|$ は可積分であり、積の二重積分も有限なので [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)で順序交換できます。内側の積分は $\int\overline{f(x)}e^{ip\cdot x}\,dx=\overline{\widehat f(p)}$ です。これが最初の等式を与えます。

$h=h_{f,g}$ はSchwartz関数です。$1+|z|\le(1+|y+z|)(1+|y|)$ を使うと、任意の多重指数 $\alpha$ に対し

$$
(1+|z|)^N|\partial^\alpha h(z)|
\le p_{N,|\alpha|}(f)
\int(1+|y|)^N|g(y)|\,dy.
$$

右辺は有限です。積分下の微分も $f$ の有界な各階微分と $|g|$ で支配できます。分布の逆変換の定義では

$$
\langle G_m,h\rangle=(2\pi)^{-d}\int w_m(p)\widehat h(-p)\,dp.
$$

変数 $x=y+z$ への置換とFubini（絶対積分は $\|f\|_1\|g\|_1$）で

$$
\begin{aligned}
\widehat h(-p)
&=\iint e^{ip\cdot z}\overline{f(y+z)}g(y)\,dy\,dz\\
&=\int e^{ip\cdot x}\overline{f(x)}\,dx
\int e^{-ip\cdot y}g(y)\,dy\\
&=\overline{\widehat f(p)}\widehat g(p).
\end{aligned}
$$

よって最後の等式も成り立ちます。
<!-- proof-end -->

一般の二変数試験関数 $F(x,y)\in\mathcal S(\mathbb R^{2d})$ に対しても $h_F(z)=\int F(y+z,y)\,dy$ とすれば同じ核が使えます。実際 $1+|z|\le 1+|x|+|y|\le 2(1+|(x,y)|)$、$1+|y|\le1+|(x,y)|$ なので、$N$ 次の重み付き微分は $2^N p_{N+d+1,r}(F)\int(1+|y|)^{-d-1}\,dy$ 以下です。したがって $F\mapsto h_F$ は連続で、$K_m(F)=\langle G_m,h_F\rangle$ は[二点分布核](../MQFC1/index.md#def-mqfc1-kernel)を与えます。記号 $G_m(x-y)$ はこの分布核を意味します。

## 3. 正値性と連続性

確率測度を作るとき、実の線形測定の分散は負になってはいけません。また重みを少し変えたら共分散も少ししか変わらない必要があります。

<a id="thm-mqfc5-positivity"></a>

<!-- formal-statement-start -->
> **定理（試験関数共分散の正値性と連続性）**
> $d\ge1$、$m>0$ とする。[試験関数共分散](#def-mqfc5-covariance-form) $B_m$ はHermite対称な連続半双線形形式であり、非零の $f\in S$ に対して $B_m(f,f)>0$ である。実の試験関数に対しては実対称である。任意の有限族の共分散行列は正半定値となる。さらに

$$
|B_m(f,g)|\le m^{-2}\|f\|_2\|g\|_2
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

非負の乗数で重みを付けた二乗の積分が分散になります。正の下限を持つ分母は連続性も保証します。

<!-- proof-start -->
### 証明

$w_m$ が実かつ正なので、積分の複素共役を取れば $\overline{B_m(f,g)}=B_m(g,f)$ です。また

$$
B_m(f,f)=(2\pi)^{-d}\int w_m(p)|\widehat f(p)|^2\,dp.
$$

$f\ne0$ ならFourier変換の単射性から $\widehat f\ne0$ であり、連続性からある開球上で絶対値が正の下限を持ちます。その球を有界に選べば $w_m$ も正の下限を持つので積分は正です。

$w_m\le m^{-2}$ と積分のCauchy–Schwarz不等式で

$$
|B_m(f,g)|\le (2\pi)^{-d}m^{-2}
\left(\int|\widehat f|^2\right)^{1/2}
\left(\int|\widehat g|^2\right)^{1/2}.
$$

ここでSchwartz関数に限れば、一般の $L^2$ Fourier理論を使わずに[Fourier逆変換](../MQFC1/index.md#thm-mqfc1-fourier)から二乗積分の関係を導けます。$f$ の逆変換を $\bar f$ との積分へ代入し、$\|f\|_1\|\widehat f\|_1<\infty$ によりFubiniで交換すると

$$
\int |f(x)|^2\,dx=(2\pi)^{-d}\int|\widehat f(p)|^2\,dp.
$$

$g$ も同様です。よって目的の評価が従います。整数 $N>d/2$ を取ると

$$
\|f\|_2\le p_{N,0}(f)
\left(\int(1+|x|)^{-2N}\,dx\right)^{1/2}.
$$

この積分は有限です。従って積の半ノルムによる評価が得られ、例えば $B_m(f+h,g+k)-B_m(f,g)=B_m(h,g)+B_m(f,k)+B_m(h,k)$ の各項が零に近づくことから同時連続です。

実の $f,g$ については $\widehat f(-p)=\overline{\widehat f(p)}$ です。$w_m$ の偶性から $p\mapsto-p$ の置換で $B_m(f,g)=\overline{B_m(f,g)}$ が従います。[有限個の試験関数による正値性判定](../MQFC1/index.md#prop-mqfc1-gram)により共分散行列は正半定値です。
<!-- proof-end -->

例えば $g=2f$ なら行列は $B_m(f,f)\begin{pmatrix}1&2\\2&4\end{pmatrix}$ です。$f\ne0$ でも係数 $(2,-1)$ の線形結合は零なので、行列が正定値とは限りません。独立な重みを選んだときだけ非零係数が非零関数を作ります。

## 4. 熱核の重ね合わせ

分母の逆を指数関数で表すと、周波数の積分を空間の拡散核に置き換えられます。$s>0$ を補助的な積分変数とし、物理的なEuclid時間座標とは区別します。[一次元熱核](../../../解析系/PDE/PDE3/index.md#def-pde3-heat-kernel)で拡散係数を1とし、$d$ 個の座標の積を取った核は

$$
H_s(x)=(4\pi s)^{-d/2}e^{-|x|^2/(4s)}.
$$

一次元Gaussian積分を各座標に適用すると $\int H_s=1$ です。[GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)で $x=2\sqrt{s}\,u$ と置けば、一座標の変換は $\pi^{-1/2}\int e^{-u^2}e^{-2i\sqrt{s}pu}\,du=e^{-sp^2}$ です。各座標の積から $\widehat H_s(p)=e^{-s|p|^2}$ を得ます。

<a id="thm-mqfc5-heat-resolvent"></a>

<!-- formal-statement-start -->
> **定理（質量付き逆核の熱核積分表示）**
> $d\ge1$、$m>0$、$s>0$ とする。熱核と逆核を

$$
H_s(x)=(4\pi s)^{-d/2}e^{-|x|^2/(4s)},\qquad
G_m=\mathcal F^{-1}[(|p|^2+m^2)^{-1}]
$$

> とすると、任意の $h\in\mathcal S(\mathbb R^d)$ に対して

$$
\langle G_m,h\rangle=
\int_0^\infty e^{-m^2s}
\int_{\mathbb R^d}H_s(x)h(x)\,dx\,ds
\qquad(h\in S)
$$

> と表される。特に非負の可積分関数

$$
G_m(x)=\int_0^\infty e^{-m^2s}H_s(x)\,ds
\quad\text{(a.e.)}
$$

> がこの分布を表し、$\int G_m(x)\,dx=m^{-2}$ である。$x\ne0$ では積分は有限である。
<!-- formal-statement-end -->

### 証明の見取り図

正の数 $a$ について $\int_0^\infty e^{-sa}ds=1/a$ です。熱核の変換が指数関数なので、積分してからFourier変換すれば目的の乗数になります。

<!-- proof-start -->
### 証明

非負の $e^{-m^2s}H_s(x)$ に [Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli)を適用すると

$$
\int_{\mathbb R^d}\int_0^\infty e^{-m^2s}H_s(x)\,ds\,dx
=\int_0^\infty e^{-m^2s}\,ds=m^{-2}.
$$

よって内側の積分はほとんど至る所有限で可積分な関数を定めます。$x\ne0$ を固定すると $s\le1$ では $s^{-d/2}e^{-|x|^2/(4s)}$ が可積分です。実際 $u=1/s$ とすれば $\int_1^\infty u^{d/2-2}e^{-|x|^2u/4}du<\infty$ です。$s\ge1$ では $s^{-d/2}\le1$ と $e^{-m^2s}$ で積分できます。

Fourier変換では $|e^{-ip\cdot x}|=1$ なので上で求めた二重積分が絶対収束を保証します。[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を用いると

$$
\begin{aligned}
\widehat G_m(p)
&=\int_0^\infty e^{-m^2s}\widehat H_s(p)\,ds\\
&=\int_0^\infty e^{-s(m^2+|p|^2)}\,ds\\
&=\frac1{m^2+|p|^2}.
\end{aligned}
$$

分布のFourier変換と通常の変換の一致、および単射性（[MQFC1](../MQFC1/index.md#def-mqfc1-duality)）により先に構成した分布と一致します。$h$ を掛けた二重積分は $\|h\|_\infty m^{-2}$ で支配されるので表示式もFubiniで成立します。
<!-- proof-end -->

同一点 $x=0$ では事情が違います。$s\downarrow0$ で $H_s(0)=(4\pi s)^{-d/2}$ となるため、$d\ge2$ では $\int_0^1s^{-d/2}ds$ が発散します。これは高周波側の発散に対応します。核全体は可積分であっても、同一点で有限な値を持つとは限りません。試験関数で測定する理由がここにもあります。

一次元では [QFT20の自由モードの核](../../QFT/QFT20/index.md#thm-qft20-euclidean-kernel)で $\omega=m$、$\tau=x$ と選ぶと $G_m(x)=e^{-m|x|}/(2m)$ です。全質量は $2(2m)^{-1}\int_0^\infty e^{-mx}dx=m^{-2}$ となり、熱核表示からの結果と一致します。

## 5. 質量ゼロで何が変わるか

$m>0$ では原点近くでも分母が正でした。$m=0$ にすると $w_0(p)=|p|^{-2}$ が低周波の原点で特異になります。このような低周波側の問題を赤外の問題と呼びます。高周波側の同一点の特異性とは別です。

<a id="prop-mqfc5-massless"></a>

<!-- formal-statement-start -->
> **命題（質量ゼロ極限の赤外条件）**
> $d\ge1$ とし、$B_m$ を質量 $m>0$ の試験関数共分散とする。
> $d\ge3$ なら任意の $f,g\in S$ に対して

$$
\lim_{m\downarrow0}B_m(f,g)
=(2\pi)^{-d}\int
\frac{\overline{\widehat f(p)}\widehat g(p)}{|p|^2}\,dp
$$

> が絶対収束し、右辺は連続な正値の半双線形形式である。
> $d=1,2$ では $\int f\ne0$ なら $B_m(f,f)\to+\infty$ となる。一方、両方の試験関数が積分零なら上の極限式は絶対収束し、その部分空間上で連続かつ正値である。
<!-- formal-statement-end -->

### 証明の見取り図

原点近くで試験関数の変換が定数に近い場合と、一次以上の零を持つ場合を分けます。半径 $r$ の球殻の体積が $r^{d-1}dr$ に比例することが臨界次元を決めます。

<!-- proof-start -->
### 証明

単位球の外では $w_m(p)\le |p|^{-2}\le1$ であり、$\widehat f,\widehat g$ は急減少なので積は可積分です。単位球内では両者は有界です。$d\ge3$ であれば、単位球面の面積を $\sigma_{d-1}$ として極座標から

$$
\int_{|p|<1}|p|^{-2}\,dp
=\sigma_{d-1}\int_0^1 r^{d-3}\,dr
=\frac{\sigma_{d-1}}{d-2}<\infty.
$$

よって優収束定理（[積分論の優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)）を $p$ に適用できます。原点の値は測度零なので任意に定めてよいです。

$d=1,2$ で $\int f\ne0$ とすると $\widehat f(0)\ne0$ であり、連続性からある $\delta\in(0,1)$ と $c>0$ に対して $|\widehat f(p)|\ge c$（$|p|<\delta$）です。$0<m<\delta$ として $m<|p|<\delta$ に積分を限定すると

$$
B_m(f,f)\ge
\frac{c^2\sigma_{d-1}}{2(2\pi)^d}
\int_m^\delta r^{d-3}\,dr.
$$

ここで $r^2+m^2\le2r^2$ を用いました。$d=1$ なら積分は $1/m-1/\delta$、$d=2$ なら $\log(\delta/m)$ であり、どちらも発散します（$d=1$ では $\sigma_0=2$）。

両方が積分零なら

$$
\widehat f(p)=\int(e^{-ip\cdot x}-1)f(x)\,dx.
$$

実数 $t$ に対し $e^{-it}-1=\int_0^t(-i)e^{-iu}\,du$ から $|e^{-it}-1|\le|t|$ です。従って

$$
|\widehat f(p)|\le |p|\int |x||f(x)|\,dx.
$$

$g$ も同じ評価を満たします。原点近傍の積を $|p|^2$ で割ったものは有界なので全次元で可積分です。球外の支配と合わせ、再び優収束定理を適用できます。

連続性については球内の評価に現れた $\|f\|_1$ または $\int|x||f(x)|dx$ が $p_{N,0}(f)$ の定数倍以下になるよう $N>d+1$ を選びます。球外は前節と同様にCauchy–Schwarzで $\|\widehat f\|_2\|\widehat g\|_2$ を用いれば積の半ノルム評価となります。対称性、非零の $f$ に対する正値性は[質量付きの場合の証明](#thm-mqfc5-positivity)と同じく、原点以外に正の積分を与える開球を取ることで得られます。
<!-- proof-end -->

例えば一次元で積分零の $f(x)=\partial_x e^{-x^2}$ は奇関数です。$\widehat f(p)=ip\sqrt\pi e^{-p^2/4}$ なので二乗から $p^2$ が打ち消され、質量ゼロでも有限です。質量ゼロで逆が一意という主張はできません。例えば $\Delta1=0$ なので、ある分布解に定数を足しても同じ源を持ちます。

## 6. 演習

### 演習 MQFC5-A1：微分の乗数

- Level: A

$d=2,m=3$ とする。$A_m$ とその逆のFourier乗数を求め、$p=(1,2)$ での値を計算せよ。

<!-- solution-start -->
**詳細解答**

[分布微分のFourier表示](../MQFC1/index.md#prop-mqfc1-derivative)より $\partial_1^2$ は $-p_1^2$、$\partial_2^2$ は $-p_2^2$ に対応します。従って

$$
a_3(p)=p_1^2+p_2^2+9,\qquad
w_3(p)=\frac1{p_1^2+p_2^2+9}.
$$

指定の点では $1+4+9=14$ なのでそれぞれ $14,1/14$ です。積は1であり、分母は全ての $p$ で9以上なので逆が定まります。
<!-- solution-end -->

### 演習 MQFC5-A2：熱核の正規化

- Level: A

$d=2$ で $H_s(x)=(4\pi s)^{-1}e^{-|x|^2/(4s)}$ の全積分を求めよ。$m=2$ の逆核の全積分も求めよ。

<!-- solution-start -->
**詳細解答**

$s>0$ として極座標 $r=|x|$ を使うと $dx=r\,dr\,d\theta$ です。$u=r^2/(4s)$ と置くと $r\,dr=2s\,du$ なので

$$
\int H_s(x)\,dx
=\frac{2\pi}{4\pi s}\int_0^\infty re^{-r^2/(4s)}\,dr
=\int_0^\infty e^{-u}\,du=1.
$$

[熱核積分表示](#thm-mqfc5-heat-resolvent)で $m=2$ を代入します。非負なので積分順序を交換でき、全積分は $\int_0^\infty e^{-4s}ds=1/4$ です。
<!-- solution-end -->

### 演習 MQFC5-A3：共分散行列の零方向

- Level: A

$m>0$、非零の実の $f\in S$ に対し、$f_1=f,f_2=-3f$ の共分散行列とその零方向を求めよ。

<!-- solution-start -->
**詳細解答**

[試験関数共分散](#def-mqfc5-covariance-form)の線形性より $b=B_m(f,f)>0$ と置くと

$$
M=b\begin{pmatrix}1&-3\\-3&9\end{pmatrix}.
$$

任意の実係数 $(u,v)$ に対して $(u,v)M(u,v)^T=b(u-3v)^2\ge0$ です。零方向は $u=3v$、すなわち $(3,1)^T$ の実数倍です。これは重みの線形結合 $3f_1+f_2=0$ に対応します。
<!-- solution-end -->

### 演習 MQFC5-A4：同一点の短時間積分

- Level: A

$d=1,2,3$ について $\int_\varepsilon^1 s^{-d/2}ds$ を計算し、$\varepsilon\downarrow0$ での挙動を分類せよ。

<!-- solution-start -->
**詳細解答**

$0<\varepsilon<1$ とします。原始関数をそれぞれ $2\sqrt s,\log s,-2s^{-1/2}$ とすると

$$
\begin{aligned}
d=1:\quad&2(1-\sqrt\varepsilon),\\
d=2:\quad&\log(1/\varepsilon),\\
d=3:\quad&2(\varepsilon^{-1/2}-1).
\end{aligned}
$$

従って一次元は有限値2に収束し、二次元は対数、三次元は逆平方根の速さで発散します。$s\in(0,1)$ で $e^{-m^2}\le e^{-m^2s}\le1$ なので質量因子を掛けてもこの収束・発散の分類は変わりません。
<!-- solution-end -->

### 演習 MQFC5-B1：逆作用素による検算

- Level: B

任意の $u,v\in S$ と $m>0$ に対し $B_m(A_mu,v)=\int\overline u\,v\,dx$ を示せ。特に $v=A_mu$ とした場合を求めよ。

<!-- solution-start -->
**詳細解答**

[試験関数共分散](#def-mqfc5-covariance-form)に $\widehat{A_mu}=a_m\widehat u$ を入れると $a_m$ は実で $a_mw_m=1$ だから

$$
B_m(A_mu,v)=(2\pi)^{-d}\int\overline{\widehat u}\widehat v\,dp.
$$

[Fourier逆変換](../MQFC1/index.md#thm-mqfc1-fourier)を $v$ に適用し、$\|u\|_1\|\widehat v\|_1<\infty$ なのでFubiniで交換すると右辺は $\int\bar u v$ です。$v=A_mu$ とすると

$$
B_m(A_mu,A_mu)=\int\bar u(-\Delta u+m^2u)\,dx
=\int (|\nabla u|^2+m^2|u|^2)\,dx.
$$

最後は各座標で部分積分し、$\bar u\,\partial_j u$ が急減少するので境界項を消しました。$u\ne0$ なら質量項だけでも正です。
<!-- solution-end -->

### 演習 MQFC5-B2：平行移動と直交変換

- Level: B

$a\in\mathbb R^d$、$R^TR=I$ の実 $d\times d$ 行列について、$f_{a,R}(x)=f(R^T(x-a))$ と置く。$B_m(f_{a,R},g_{a,R})=B_m(f,g)$ を示せ。

<!-- solution-start -->
**詳細解答**

$R$ は直交行列なので $|\det R|=1$ です。$x=Ry+a$ と置くと

$$
\widehat{f_{a,R}}(p)
=e^{-ip\cdot a}\int e^{-i(R^Tp)\cdot y}f(y)\,dy
=e^{-ip\cdot a}\widehat f(R^Tp).
$$

$g$ も同じ変換式です。[共分散の定義](#def-mqfc5-covariance-form)では第1引数が共役なので位相 $e^{ip\cdot a}$ と $e^{-ip\cdot a}$ が相殺されます。$q=R^Tp$ と置けば $dp=dq$、$|p|=|q|$ だから

$$
B_m(f_{a,R},g_{a,R})
=(2\pi)^{-d}\int\frac{\overline{\widehat f(q)}\widehat g(q)}
{|q|^2+m^2}\,dq=B_m(f,g).
$$

この対称性は全Euclid座標についてのもので、時間反射を挟んだ別の二次形式の非負性をまだ意味しません。
<!-- solution-end -->

### 演習 MQFC5-B3：質量ゼロの零平均の具体例

- Level: B

$d=1$、$f(x)=\partial_x e^{-x^2}$ とする。$B_m(f,f)$ の質量ゼロ極限を計算せよ。

<!-- solution-start -->
**詳細解答**

$f$ はSchwartz関数で $\int f=e^{-x^2}|_{-\infty}^{+\infty}=0$ です。[GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)と[微分のFourier表示](../MQFC1/index.md#prop-mqfc1-derivative)から

$$
\widehat f(p)=ip\sqrt\pi e^{-p^2/4},\qquad
B_m(f,f)=\frac12\int_{\mathbb R}
\frac{p^2}{p^2+m^2}e^{-p^2/2}\,dp.
$$

$0\le p^2/(p^2+m^2)\le1$ で $p\ne0$ なら1に収束します。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)の支配関数は $e^{-p^2/2}/2$ です。$p=\sqrt2\,u$ と置いてGaussian積分を使うと

$$
\lim_{m\downarrow0}B_m(f,f)
=\frac12\int e^{-p^2/2}\,dp
=\frac{\sqrt{2\pi}}2.
$$

[赤外条件](#prop-mqfc5-massless)の零平均の場合を具体的に検算できました。
<!-- solution-end -->

### 演習 MQFC5-B4：二つの質量の比較

- Level: B

$0<m_1<m_2$、$f\in S$ とする。$B_{m_1}(f,f)\ge B_{m_2}(f,f)$ を示し、非零の $f$ では厳密な不等号になることを示せ。差を $\|f\|_2^2$ の定数倍で上から抑えよ。

<!-- solution-start -->
**詳細解答**

分母の差を通分すると

$$
w_{m_1}(p)-w_{m_2}(p)
=\frac{m_2^2-m_1^2}
{(|p|^2+m_1^2)(|p|^2+m_2^2)}.
$$

分子は正で分母も正なので、これに $(2\pi)^{-d}|\widehat f|^2$ を掛けて積分すると差は非負です。$f\ne0$ なら $\widehat f$ が非零の開球があるため厳密に正です。分母は $m_1^2m_2^2$ 以上で、[正値性と連続性の証明](#thm-mqfc5-positivity)で示した二乗積分の関係を使うと

$$
0\le B_{m_1}(f,f)-B_{m_2}(f,f)
\le\frac{m_2^2-m_1^2}{m_1^2m_2^2}\|f\|_2^2.
$$

質量が小さいほど低周波の分散を大きくすることが分かります。
<!-- solution-end -->

### 演習 MQFC5-C1：周波数切断と質量ゼロの順序

- Level: C

$d=2$、$\widehat f(p)=e^{-|p|^2/2}$ とする。$m>0$、$0<\varepsilon<1$ に対し

$$
b_{m,\varepsilon}=(2\pi)^{-2}
\int_{|p|\ge\varepsilon}\frac{|\widehat f(p)|^2}{|p|^2+m^2}\,dp
$$

と置く。

(1) 半径による積分に直せ。

(2) $\varepsilon$ 固定での $m\downarrow0$ 極限が有限であることを示せ。

(3) 続いて $\varepsilon\downarrow0$ で発散することを下界から示せ。

(4) $\widehat g(p)=ip_1\widehat f(p)$ と取り替えると両切断を同時に外せることを示し、極限を求めよ。

<!-- solution-start -->
**詳細解答**

(1) $dp=r\,dr\,d\theta$、$\int_0^{2\pi}d\theta=2\pi$ なので

$$
b_{m,\varepsilon}=\frac1{2\pi}
\int_\varepsilon^\infty\frac{re^{-r^2}}{r^2+m^2}\,dr.
$$

(2) $r\ge\varepsilon$ では積分の中身が $e^{-r^2}/r$ 以下であり、$[\varepsilon,1]$ では $1/\varepsilon$、$[1,\infty)$ では $e^{-r^2}$ で支配できます。[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)から

$$
b_{0,\varepsilon}=\frac1{2\pi}\int_\varepsilon^\infty
\frac{e^{-r^2}}r\,dr<\infty.
$$

(3) $\varepsilon\le r\le1$ で $e^{-r^2}\ge e^{-1}$ なので

$$
b_{0,\varepsilon}\ge \frac{e^{-1}}{2\pi}
\int_\varepsilon^1\frac{dr}{r}
=\frac{e^{-1}}{2\pi}\log(1/\varepsilon)\to+\infty.
$$

固定した質量では $\varepsilon$ を先に外しても有限ですが、その後の質量ゼロ極限は[赤外条件](#prop-mqfc5-massless)で発散します。

(4) $p_1=r\cos\theta$ です。任意の $m,\varepsilon>0$ に対して切断を含む被積分関数は

$$
0\le\frac{p_1^2e^{-|p|^2}}{|p|^2+m^2}
\boldsymbol 1_{\{|p|\ge\varepsilon\}}\le e^{-|p|^2}.
$$

右辺は可積分で、$p\ne0$ ならどの順序・経路で $m,\varepsilon$ が零へ近づいても $\cos^2\theta\, e^{-r^2}$ に収束します。任意のそのような列に優収束定理を適用し、$\int_0^{2\pi}\cos^2\theta\,d\theta=\pi$、$u=r^2$ より $\int_0^\infty re^{-r^2}dr=1/2$ を使うと極限は

$$
(2\pi)^{-2}\pi\cdot\frac12=\frac1{8\pi}.
$$

$g$ は $f$ の第1座標微分で積分零なので、原点の特異性を打ち消せたことになります。
<!-- solution-end -->

## 7. 次の講義

質量付きの逆作用素から、実の試験関数上で正かつ連続な共分散が得られました。熱核表示は位置空間の相関を解析する道具になります。次講 MQFC6 ではこの共分散を持つGaussian測度の存在を、有限次元から無限次元へ順に構成します。
