# QFT48 Euclid相関関数から共形変換・一次場の相関関数へ

<!-- definition-example-audit: strict -->

[QFT20のEuclid二点核](../QFT20/index.md#thm-qft20-euclidean-kernel)では、自由場の実時間相関関数をEuclid時間へ移す条件を計算し、[反射陽性](../QFT20/index.md#def-qft20-reflection-positivity)が実時間の正の内積を復元するために重要であることを学びました。しかしEuclid相関関数を一つずつ積分で求めるだけでは、相互作用する模型の相関関数の形を見通せません。

ここからの問いは、**座標の角度だけでなく局所的な長さの倍率を変えても理論の形が保たれるとき、相関関数はどこまで決まるか**です。まず自由な質量零スカラー場を手で計算し、局所的な倍率をもつ共形写像、一次場の変換則、二点・三点関数の制約へ進みます。

この章の舞台は整数 $d\ge3$ のEuclid空間 $\mathbb R^d$ です。座標、二点間距離、時間反射を次のように固定します。

$$
x=(\tau,\boldsymbol x),\qquad
r_{ij}=|x_i-x_j|,\qquad
\theta(\tau,\boldsymbol x)=(-\tau,\boldsymbol x).
$$

内積はEuclidの標準内積です。実時間へ戻るときは [Lorentz符号規約](../../../../../dream-theater-lorentz-conventions.md) の $(-,+,+,+)$ に従いますが、**Euclid計算の内積をMinkowski内積と同一視しません**。以下の点は断らない限り互いに異なるものとし、接触項や同一点での積は別途正則化を必要とします。

## 1. 自由場のEuclid二点関数を、尺度のある模型から尺度のない模型へ

質量 $m>0$ の自由スカラー場では [QFT20の共分散](../QFT20/index.md#def-qft20-schwinger-two-point)に質量による長さ $m^{-1}$ があります。質量を零にするとこの長さは消えますが、単に式へ $m=0$ を代入するだけでは赤外（低運動量）で積分が存在するか分かりません。そこで次の模型を定義して調べます。

質量零のEuclid自由スカラー場とは、形式的作用

$$
S_E[\phi]=\frac12\int_{\mathbb R^d}|\nabla\phi(x)|^2\,d^dx
$$

をもち、二点関数を $-\Delta$ の逆核で与える**中心化Gaussian一般化場**です。ここで $\Delta=\sum_{\mu=1}^d\partial_\mu^2$ はEuclidのLaplace作用素で、$\phi(x)$ は点ごとの通常の確率変数ではなく試験関数で平均化して扱う分布的な記号です。$d>2$ では零運動量近傍の $|p|^{-2}$ が局所可積分なので、全空間の並進不変な質量零共分散を構成できます。

<a id="def-qft48-massless-schwinger"></a>

<!-- formal-statement-start -->
> **定義（質量零自由場のSchwinger二点分布）**  
> 整数 $d\ge3$ のEuclid空間において、Fourier逆変換の意味で

$$
S_2(x,y)=C_d(x-y),\qquad
C_d(z)=\int_{\mathbb R^d}\frac{d^dp}{(2\pi)^d}
\frac{e^{ip\cdot z}}{|p|^2}
$$

> と定める。積分は無限大で絶対収束する通常積分ではなく、試験関数に作用する温和分布（または熱核正則化の極限）として解釈する。$x\ne y$ での値は後の定理で求める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft48-massless-schwinger -->
**定義の確認** Fourier変換の規約は $\widehat f(p)=\int e^{-ip\cdot x}f(x)\,d^dx$ とします。Schwartz試験関数 $f$ を考えると、原点近傍で球座標の体積要素は $r^{d-1}dr$ を含み、重み $1/r^2$ の積分は

$$
\int_0^1 r^{d-3}\,dr=\frac1{d-2}<\infty
$$

です。無限大では $\widehat f(p)$ がどのべきよりも速く減衰します。従って $\int |p|^{-2}\widehat f(p)\,d^dp$ は定まり、二点分布の意味が確定します。点ごとのFourier積分が絶対収束すると主張しているわけではありません。
さらに、任意のSchwartz試験関数 $f$ に対し、共分散の二次形式は

$$
\int_{\mathbb R^d}\!\int_{\mathbb R^d}
\overline{f(x)}C_d(x-y)f(y)\,d^dx\,d^dy
=\int_{\mathbb R^d}\frac{d^dp}{(2\pi)^d}
\frac{|\widehat f(p)|^2}{|p|^2}\ge0.
$$

Fourier変換で $-\Delta$ は $|p|^2$ の乗法になるため、$-\Delta C_d=\delta_0$ も分布の意味で成立します。これで、単なる形式的な逆核ではなく、正のGaussian共分散として必要な条件を直接検査できました。
<!-- definition-example-end -->

距離則の係数に現れるGamma関数は、$a>0$ に対して次で定義します。

$$
\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}\,du.
$$

以下では $a=d/2-1>0$ なので適用できます。

<a id="thm-qft48-massless-kernel"></a>

<!-- formal-statement-start -->
> **定理（質量零共分散の距離則と反射二次形式）**  
> $d\ge3$ の質量零自由Euclidスカラー場で、相異なる $x,y\in\mathbb R^d$ に対して

$$
S_2(x,y)=\frac{\Gamma(d/2-1)}{4\pi^{d/2}}\,
\frac1{|x-y|^{d-2}},
\qquad
S_2(\lambda x,\lambda y)=\lambda^{-(d-2)}S_2(x,y)
\quad(\lambda>0).
$$

> さらに反射平面 $\tau=0$ の正時間側 $\tau>0$ に支持をもつ滑らかでコンパクトな試験関数 $f$ に対し、$\int\overline{f(x)}S_2(\theta x,y)f(y)\,d^dx\,d^dy\ge0$ となる。この非負性は二点関数に関する反射陽性であり、一般の相互作用する場の全Schwinger関数に対する再構成条件を証明したという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$|p|^{-2}$ を正の熱時間 $s$ のLaplace積分に直すとFourier積分がGaussian積分になります。時間反射の二次形式は空間Fourierモードごとの絶対値二乗になり、非負性と零運動量での可積分性を同時に調べられます。

<!-- proof-start -->
### 証明

$p\ne0$ で $|p|^{-2}=\int_0^\infty e^{-s|p|^2}\,ds$ です。収束因子を付けた試験関数のもとで積分順を交換し、各成分のGaussian Fourier積分を掛け合わせると

$$
\int_{\mathbb R^d}\frac{d^dp}{(2\pi)^d}
e^{-s|p|^2+ip\cdot z}
=(4\pi s)^{-d/2}e^{-|z|^2/(4s)}.
$$

$r=|z|>0$ とおき、$u=r^2/(4s)$ と変数変換すれば

$$
\begin{aligned}
C_d(z)
&=\int_0^\infty(4\pi s)^{-d/2}e^{-r^2/(4s)}\,ds\\
&=(4\pi)^{-d/2}\left(\frac{r^2}{4}\right)^{1-d/2}
\int_0^\infty u^{d/2-2}e^{-u}\,du\\
&=\frac{\Gamma(d/2-1)}{4\pi^{d/2}}r^{2-d}.
\end{aligned}
$$

このGamma積分の指数は $a-1=d/2-2$ であり、$d>2$ がちょうど収束条件です。$r\mapsto\lambda r$ に代入すれば距離則の後半が従います。

次に空間Fourier変換を $\widehat f(\tau,\boldsymbol k)=\int e^{-i\boldsymbol k\cdot\boldsymbol x}f(\tau,\boldsymbol x)\,d^{d-1}\boldsymbol x$ とします。先ほどの $\widehat f(p)$ は全 $d$ 変数のFourier変換でしたが、ここではEuclid時間 $\tau$ を固定し、空間変数 $\boldsymbol x$ のみを変換しています。[QFT20の自由核の時間表示](../QFT20/index.md#thm-qft20-euclidean-kernel)は時間変数だけのFourier逆変換に由来します。QFT20の時間周波数 $p_4$ をここでは $p_\tau$、Euclid時間差を $t\in\mathbb R$ と書くと、空間次元を $d-1$ に替えても各 $\boldsymbol k\ne0$ で

$$
\int_{\mathbb R}\frac{dp_\tau}{2\pi}
\frac{e^{ip_\tau t}}{p_\tau^2+|\boldsymbol k|^2}
=\frac{e^{-|\boldsymbol k||t|}}{2|\boldsymbol k|}
$$

となります。これはQFT20の $\omega_{\boldsymbol k}=\sqrt{|\boldsymbol k|^2+m^2}$ に $m\downarrow0$ を取った式です。$\boldsymbol k=0$ の特異性は最後に積分可能性を検査します。したがって反射された二次形式は

$$
\begin{aligned}
Q(f)&=\int\overline{f(x)}C_d(\theta x-y)f(y)\,d^dx\,d^dy\\
&=\int_{\mathbb R^{d-1}}\frac{d^{d-1}\boldsymbol k}{(2\pi)^{d-1}}
\frac1{2|\boldsymbol k|}
\left|\int_0^\infty e^{-|\boldsymbol k|\tau}
\widehat f(\tau,\boldsymbol k)\,d\tau\right|^2\ge0.
\end{aligned}
$$

導出の要点は $\tau,\sigma>0$ なら反射後の時間差の絶対値が $\tau+\sigma$ になり、核 $e^{-|\boldsymbol k|(\tau+\sigma)}/(2|\boldsymbol k|)$ が積に分離することです。$\boldsymbol k=0$ は測度零で、近傍の重みは球座標で $k^{d-2}dk/k=k^{d-3}dk$ となり $d>2$ で可積分です。無限大は $\widehat f$ の急減少と時間積分によって抑えられます。従って極限操作と非負性がこの試験関数クラスで正当化されます。
<!-- proof-end -->

**計算例。** $d=4$ なら $\Gamma(1)=1$ だから $C_4(z)=1/(4\pi^2|z|^2)$、$d=3$ なら $\Gamma(1/2)=\sqrt\pi$ だから $C_3(z)=1/(4\pi|z|)$。両者とも $C_d(\lambda z)=\lambda^{2-d}C_d(z)$ をそのまま確認できます。

この計算は自由模型の二点関数を明示したものです。[QFT20の再構成条件](../QFT20/index.md#def-qft20-os-data)にある対称性・反射陽性・正則性等を任意の相互作用模型で満たしたと結論してはいません。また、$d=2$ では $\int_1^\infty ds/s$ が発散し、同じ並進不変な場 $\phi$ の二点関数をそのまま $|x|^0$ と置くことはできません。

## 2. 共形写像は角度を保ちながら長さを変える

回転や並進だけでなく、拡大縮小 $x\mapsto\lambda x$ は二点間の長さを一定倍する変換です。より広く、各点で方向によらず長さを同じ倍率で変える写像を考えます。

判定に必要なのはJacobian行列です。$f=(f_1,\ldots,f_d)$ に対し、$Df(x)$ は成分 $(Df(x))_{ij}=\partial f_i/\partial x_j$（行が出力成分、列が入力成分）の行列、$T$ は転置、$I_d$ は単位行列とします。微小変位 $v$ の像は、成分ごとに

$$
(Df(x)v)_i=\sum_{j=1}^d\frac{\partial f_i}{\partial x_j}(x)v_j
$$

です。その長さの二乗は $v^TDf(x)^TDf(x)v$ となります。これが全ての $v$ で $\Omega^2v^Tv$ と等しい条件は、対称行列の二次形式を比較すると $Df^TDf=\Omega^2I_d$ と同値です。**全方向で同じ倍率**という幾何条件を行列で検査できる理由はここにあります。

<a id="def-qft48-conformal-map"></a>

<!-- formal-statement-start -->
> **定義（Euclid共形写像と局所尺度因子）**  
> $U,V\subset\mathbb R^d$ を開集合とし、$f:U\to V$ は滑らかな一対一対応で逆写像も滑らかであるとする。各 $x\in U$ に正数 $\Omega_f(x)>0$ が存在して

$$
Df(x)^T Df(x)=\Omega_f(x)^2 I_d
$$

> が成り立つとき、$f$ をEuclid共形写像、$\Omega_f$ を局所尺度因子という。任意の微小変位を表すベクトル $v,w$ の像についても、次の条件と同値になる。

$$
(Df(x)v)\cdot(Df(x)w)=\Omega_f(x)^2(v\cdot w).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft48-conformal-map -->
**定義の確認** $f(x)=a+\lambda Rx$（$a\in\mathbb R^d$、$\lambda>0$、$R^TR=I$）では $Df=\lambda R$ なので $Df^TDf=\lambda^2R^TR=\lambda^2I$。したがって $\Omega_f=\lambda$ であり、各方向の長さ・二ベクトル間の角度も所定の条件を満たします。$R$ が直交行列なので $f^{-1}(y)=\lambda^{-1}R^T(y-a)$ が存在して滑らかであり、逆写像の条件も確認できました。
<!-- definition-example-end -->

一定の倍率ではない重要な例が原点を避けた**反転**です。

<a id="prop-qft48-inversion"></a>

<!-- formal-statement-start -->
> **命題（反転のJacobianと距離恒等式）**  
> $d\ge2$、$U=\mathbb R^d\setminus\{0\}$ とする。反転 $I:U\to U$ を $I(x)=x/|x|^2$ と定める。このとき $I^{-1}=I$ で、反転は共形写像、局所尺度因子は $\Omega_I(x)=|x|^{-2}$ である。さらに $x,y\in U$ に対して

$$
|I(x)-I(y)|=\frac{|x-y|}{|x|\,|y|}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$I$ のJacobianを積の微分で計算します。対称行列 $H=I_d-2nn^T$ が $H^TH=I_d$ を満たすことから共形性を判定し、距離恒等式は二点の内積を展開して求めます。

<!-- proof-start -->
### 証明

$r^2=x\cdot x$、$n=x/r$ と置きます。添字 $i,j\in\{1,\ldots,d\}$ はそれぞれ出力・入力成分、$\delta_{ij}$ は $i=j$ なら1、異なれば0となるKroneckerのデルタです。成分ごとの微分は

$$
\frac{\partial I_i}{\partial x_j}
=\frac{\delta_{ij}}{r^2}-\frac{2x_ix_j}{r^4}
=r^{-2}(\delta_{ij}-2n_in_j).
$$

$n^Tn=1$ より $H=I_d-2nn^T$ は対称で、

$$
H^TH=H^2=I_d-4nn^T+4n(n^Tn)n^T=I_d.
$$

従って $(DI)^TDI=r^{-4}I_d$ で $\Omega_I=r^{-2}>0$。また $|I(x)|^2=1/r^2$ なので $I(I(x))=(x/r^2)/(1/r^2)=x$ です。反転自身が滑らかな逆写像となることも確認できました。

距離については

$$
\begin{aligned}
|I(x)-I(y)|^2
&=\frac1{|x|^2}+\frac1{|y|^2}
-\frac{2x\cdot y}{|x|^2|y|^2}\\
&=\frac{|x|^2+|y|^2-2x\cdot y}{|x|^2|y|^2}
=\frac{|x-y|^2}{|x|^2|y|^2}.
\end{aligned}
$$

両辺の非負平方根を取って主張が従います。
<!-- proof-end -->

**反転の具体例。** $\mathbb R^3$ で $x=(2,0,0)$、$y=(0,1,0)$ とすると $I(x)=(1/2,0,0)$、$I(y)=(0,1,0)$ です。変換前後の距離は $\sqrt5$ と $\sqrt5/2$ であり、$\sqrt5/(|x||y|)=\sqrt5/2$ に一致します。局所倍率が点ごとに異なるため、一般の二点間距離が単純に一つの共通定数倍されるわけではありません。

## 3. 一次場の変換則と二点相関関数

普通のスカラー関数なら座標を替えた値を合成で書きます。しかし場は長さの尺度を変えると数値の単位も変わり得ます。例えば第1節の自由場は二点関数が $|x-y|^{-(d-2)}$ なので、場一つ分の尺度指数はその半分です。この観察を一般化し、局所尺度因子を用いた場の変換則と指数を次の定義で確定します。

一次場（primary field）は、共形写像を行ったとき他の種類の場や導関数と混合せず、この尺度因子だけで変換するスカラーの場です。単にスケール対称である場が全て一次場とは限りません。これからはEuclid共形対称性をもつ理論の、スカラー一次場だけを扱います。

<a id="def-qft48-scalar-primary"></a>

<!-- formal-statement-start -->
> **定義（スカラー一次場とスケーリング次元）**  
> $d\ge3$ のEuclid共形対称性をもつ理論で、スカラー局所場 $\mathcal O$ と実数 $\Delta$ を考える。共形写像 $x'=f(x)$、局所尺度因子 $\Omega_f(x)>0$ に対して、座標変換後の場が

$$
\mathcal O'(f(x))=\Omega_f(x)^{-\Delta}\mathcal O(x)
$$

> と変換するなら、$\mathcal O$ をスケーリング次元 $\Delta$ のスカラー一次場と呼ぶ。相異なる点での相関関数を

$$
G_n(x_1,\ldots,x_n)
=\langle\mathcal O_1(x_1)\cdots\mathcal O_n(x_n)\rangle
$$

> と定義すると、真空がその共形対称性で不変な場合は

$$
G_n(f(x_1),\ldots,f(x_n))
=\prod_{i=1}^n\Omega_f(x_i)^{-\Delta_i}
G_n(x_1,\ldots,x_n)
$$

> を満たす。ここで場の変換性だけでなく、真空の不変性も仮定している。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft48-scalar-primary -->
**定義の確認** まず $f(x)=\lambda x$ なら $\Omega_f=\lambda$ なので、二つの次元 $\Delta$ の場の相関関数は $\lambda^{-2\Delta}$ 倍です。第1節の $S_2(\lambda x,\lambda y)=\lambda^{-(d-2)}S_2(x,y)$ と突き合わせると自由質量零スカラー場の**二点関数について** $\Delta_\phi=(d-2)/2$ と整合します。反転でも

$$
C_d(I(x)-I(y))
=\frac{c_d}{|I(x)-I(y)|^{d-2}}
=|x|^{d-2}|y|^{d-2}C_d(x-y)
$$

となり、$\Omega_I(x)^{-\Delta_\phi}\Omega_I(y)^{-\Delta_\phi}=|x|^{d-2}|y|^{d-2}$ と一致します。

さらにこの**中心化自由Gaussian場**では、[ボースGaussianのWick対合公式](../QFT19/index.md#thm-qft19-boson-wick)により全ての偶数点関数は二点核の対合積、奇数点関数は零です。各対合で各点はちょうど一回現れるため、二点核の変換倍率を掛け合わせれば全ての相異なる点の相関関数が上の一次場則を満たします。したがって自由場では相関関数の範囲で直接確認できました。ただしこの議論を、任意の相互作用場や接触点での積へそのまま拡張しません。
<!-- definition-example-end -->

<a id="thm-qft48-primary-two-point"></a>

<!-- formal-statement-start -->
> **定理（スカラー一次場の二点関数と次元の選択則）**  
> $d\ge3$ のEuclid理論の真空が並進・回転・正の拡大縮小・反転で不変とする。$\mathcal O_1,\mathcal O_2$ をそれぞれ実スケーリング次元 $\Delta_1,\Delta_2$ のスカラー一次場とし、相異なる点での二点関数が通常の関数として存在するとする。このとき

$$
\langle\mathcal O_1(x)\mathcal O_2(y)\rangle
=\begin{cases}
C_{12}|x-y|^{-2\Delta_1},&\Delta_1=\Delta_2,\\
0,&\Delta_1\ne\Delta_2,
\end{cases}
$$

> となる。$C_{12}$ は理論と場の規格化に依存する定数で、共形対称性だけでは値を決められない。接触項や状態が対称でない場合は、この結論の対象外である。
<!-- formal-statement-end -->

### 証明の見取り図

並進・回転は二点間距離への依存だけを残し、拡大縮小はそのべきを指定します。[反転のJacobianと距離恒等式](#prop-qft48-inversion)により両点の大きさを独立に比較すると、非零関数では二つの次元が一致しなければなりません。

<!-- proof-start -->
### 証明

並進不変性から $G_2(x,y)=F(x-y)$、回転不変性から $F(z)=h(|z|)$ です。拡大縮小 $f(x)=\lambda x$ の [一次場変換則](#def-qft48-scalar-primary) は $h(\lambda r)=\lambda^{-(\Delta_1+\Delta_2)}h(r)$ を与えます。$r=1$ と $\lambda=r>0$ を代入すると

$$
G_2(x,y)=C_{12}|x-y|^{-(\Delta_1+\Delta_2)}.
$$

ここで $x,y$ は原点を避けて取ります。[反転のJacobianと距離恒等式](#prop-qft48-inversion)を適用すると、同じ関数の左辺は

$$
G_2(I(x),I(y))
=C_{12}|x-y|^{-(\Delta_1+\Delta_2)}
|x|^{\Delta_1+\Delta_2}|y|^{\Delta_1+\Delta_2}.
$$

一方、一次場変換則から右辺は

$$
|x|^{2\Delta_1}|y|^{2\Delta_2}
C_{12}|x-y|^{-(\Delta_1+\Delta_2)}.
$$

$C_{12}\ne0$ と仮定して共通因子を消すと、任意の非零で相異なる $x,y$ について $|x|^{\Delta_2-\Delta_1}|y|^{\Delta_1-\Delta_2}=1$。$|x|$ と $|y|$ を独立に変えられるので $\Delta_1=\Delta_2$ でなければなりません。異なる場合は $C_{12}=0$ です。等しい場合に先ほどのべきが $2\Delta_1$ となり証明が終わります。
<!-- proof-end -->

この定理は**運動学的制約**です。例えば反射陽性やスペクトル条件を自動的に保証しません。$C_{12}$ が零になる追加の理由（$\phi\mapsto-\phi$ 対称性など）も理論ごとに調べます。

## 4. 三点関数の指数は三つの次元だけで決まる

三つの点には距離 $r_{12},r_{23},r_{31}$ があり、二点関数のように一つの距離だけでは書けません。三つの距離のべきの積を仮定すると、各点で必要な尺度指数を合わせる三本の線形方程式が現れます。これを解き、任意の共形不変な形がその式へ帰着することを確認します。

<a id="thm-qft48-primary-three-point"></a>

<!-- formal-statement-start -->
> **定理（スカラー一次場の三点関数）**  
> $d\ge3$ のEuclid共形対称な真空で、スケーリング次元 $\Delta_i\in\mathbb R$ のスカラー一次場 $\mathcal O_i$（$i=1,2,3$）の相異なる三点での相関関数が通常の関数として存在するとする。このとき

$$
G_3(x_1,x_2,x_3)
=\frac{C_{123}}{
r_{12}^{\Delta_1+\Delta_2-\Delta_3}
r_{23}^{\Delta_2+\Delta_3-\Delta_1}
r_{31}^{\Delta_3+\Delta_1-\Delta_2}},
$$

> ただし $r_{ij}=|x_i-x_j|>0$、$C_{123}$ は模型依存の定数であり、零でもよい。共形対称性が決めるのは距離の指数までである。
<!-- formal-statement-end -->

### 証明の見取り図

三つの距離のべき $a,b,c$ に対し、反転すると各 $x_i$ の因子が二つの距離から一つずつ出ます。各点で一次場の倍率と一致する条件を解きます。残った比が共形群のもとで不変なら、三点を標準位置へ送れるため定数になります。

<!-- proof-start -->
### 証明

まず $F=r_{12}^{-a}r_{23}^{-b}r_{31}^{-c}$ とします。[反転のJacobianと距離恒等式](#prop-qft48-inversion)で

$$
F(Ix_1,Ix_2,Ix_3)
=|x_1|^{a+c}|x_2|^{a+b}|x_3|^{b+c}F(x_1,x_2,x_3).
$$

[一次場の変換則](#def-qft48-scalar-primary)の反転倍率は $\prod_i |x_i|^{2\Delta_i}$ なので、指数は

$$
a+c=2\Delta_1,\qquad
a+b=2\Delta_2,\qquad
b+c=2\Delta_3.
$$

最初の二式を加えて三式を引くと $2a=2(\Delta_1+\Delta_2-\Delta_3)$。巡回して

$$
a=\Delta_1+\Delta_2-\Delta_3,\quad
b=\Delta_2+\Delta_3-\Delta_1,\quad
c=\Delta_3+\Delta_1-\Delta_2.
$$

これらの和は $\Delta_1+\Delta_2+\Delta_3$ なので、拡大縮小でも $F(\lambda x_i)=\lambda^{-(\Delta_1+\Delta_2+\Delta_3)}F(x_i)$ と必要な倍率に一致します。並進・回転では距離が不変です。

最後に、距離べきの形を**仮定せずに**一意性を示します。相異なる三点では $F\ne0$ なので $H=G_3/F$ を定義できます。$G_3$ と上で作った $F$ は同じ一次場倍率で変換するため、両者の比 $H$ は共形写像で不変です。

共形変換が順序付きの相異なる三点配置へ推移的に作用することを確かめます。ここで共形コンパクト化 $\mathbb R^d\cup\{\infty\}$ とは、反転を計算するためEuclid空間に無限遠点を一つ付け加えた幾何学的な補助空間です。この中で、任意の三点 $(x_1,x_2,x_3)$ を考えます。

まず $x_3$ を原点へ並進し、そこを中心に反転すると、配置は $(u,v,\infty)$（$u\ne v$）になります。さらに $z\mapsto |v-u|^{-1}R(z-u)$ という相似変換で、$R$ を $(v-u)/|v-u|$ から標準基底ベクトル $e_1$ へ送る直交行列として選べば、$(0,e_1,\infty)$ へ移ります。この幾何学的な補助変換を $T_x$ とします。

別の三点配置 $(y_1,y_2,y_3)$ に対しても $T_y$ を作れば、合成 $f=T_y^{-1}\circ T_x$ は各 $x_i$ を有限の $y_i$ へ送ります。したがって合成写像 $f$ は三点それぞれの近傍で極を持たず、そこで滑らかな共形写像として一次場則を適用できます。**途中の補助座標で $x_3$ が無限遠へ移っても、相関関数を無限遠で直接評価していません。**

この有限点どうしの写像に対して $H(y_1,y_2,y_3)=H(x_1,x_2,x_3)$ なので、$H$ はどの三点配置でも同じ定数 $C_{123}$ です。
<!-- proof-end -->

**直接例。** $\Delta_1=\Delta_2=\Delta_3=\Delta$ なら三つの指数はいずれも $\Delta$。一方 $\Delta_1=\Delta_2=1,\Delta_3=2$ なら $(a,b,c)=(0,2,2)$ となり、$r_{12}$ に依存しない $C_{123}/(r_{23}^2r_{31}^2)$ も共形変換則と矛盾しません。ここで指数が零でも三点関数が接触点で正則になるとは言えず、残る距離が零になる場合はこの定理の外です。

三点までが特別なのは、四点になると配置の違いを表す無次元量が残ることです。その代表である**共形交差比**は、異なる四点の距離の積を比にして各点の局所倍率が相殺するよう作る量です。

<a id="def-qft48-conformal-cross-ratios"></a>

<!-- formal-statement-start -->
> **定義（四点の共形交差比）**  
> $d\ge3$、互いに異なる四点 $x_1,x_2,x_3,x_4\in\mathbb R^d$ に対して

$$
u=\frac{r_{12}^2r_{34}^2}{r_{13}^2r_{24}^2},
\qquad
v=\frac{r_{14}^2r_{23}^2}{r_{13}^2r_{24}^2}
$$

> を四点の共形交差比という。分母は四点が相異なるため零にならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft48-conformal-cross-ratios -->
**定義の確認** $x_1=0$、$x_2=e_1$、$x_3=2e_1$、$x_4=3e_1$ とすると $(r_{12},r_{34},r_{13},r_{24},r_{14},r_{23})=(1,1,2,2,3,1)$ なので $u=1/16$、$v=9/16$ です。拡大縮小で距離の倍率が打ち消し合い、反転でも各点の $|x_i|$ の指数が分子・分母で相殺します（反転を検査するときは全点を平行移動して原点から離します）。四点関数の $u,v$ への依存は対称性だけでは一意に定まらず、後で演算子積展開やcrossingを使う動機になります。
<!-- definition-example-end -->

## 5. 共形的な形と、物理的な相関関数の成立条件

これまでの式はEuclid相関関数が**すでに存在し、共形対称な真空と一次場の変換則を持つ**という条件から導いたものです。任意の $C_{12},C_{123}$ を書けば、正のHilbert空間を持つ相対論的量子場理論が得られるわけではありません。

- [QFT20の反射陽性](../QFT20/index.md#def-qft20-reflection-positivity)は正時間側の場の積について検査する条件で、正定値のFourier共分散だけでは不足します。
- [QFT20のWick回転と極の補正](../QFT20/index.md#prop-qft20-crossed-pole)で見たように、解析接続には特異点・積分路・境界値の指定が必要です。Euclidの距離 $|x-y|$ を単純に複素数へ置換して全ての実時間順序を得たことにはなりません。
- $d=2$ の質量零スカラー場そのものには赤外零モードの問題があります。局所導関数や適切な中性演算子を扱う二次元共形場理論は次の章以降で構成します。
- 同一点極限では合成演算子のくりこみや接触項が必要です。ここでの二点・三点公式は**相異なる点**の式です。

逆に、成立条件を正確に分ければ、**自由場の積分から得た距離べき**と**共形対称性から許される距離べき**を照合できます。これが続く応力テンソルWard恒等式、二次元の局所共形変換、Virasoro代数への出発点です。

## 演習 QFT48-A1：四次元の熱核積分

- Level: A
- 問題: $d=4$、$z\ne0$ において $C_4(z)=\int_0^\infty(4\pi s)^{-2}\exp(-|z|^2/(4s))ds$ を $u=|z|^2/(4s)$ で計算せよ。$\lambda>0$ での尺度変換も確かめよ。

<!-- solution-start -->
**詳細解答。** $r=|z|>0$ とすると $s=r^2/(4u)$、$ds=-r^2/(4u^2)\,du$ です。積分区間を反転させ、

$$
\begin{aligned}
C_4(z)&=\frac1{16\pi^2}\int_\infty^0
\left(\frac{4u}{r^2}\right)^2e^{-u}
\left(-\frac{r^2}{4u^2}\right)du\\
&=\frac1{4\pi^2r^2}\int_0^\infty e^{-u}\,du
=\frac1{4\pi^2r^2}.
\end{aligned}
$$

$C_4(\lambda z)=1/(4\pi^2\lambda^2r^2)=\lambda^{-2}C_4(z)$ です。$z=0$ はこの点ごとの式の対象外です。
<!-- solution-end -->

### 演習 QFT48-A2：反転の方向別倍率

- Level: A
- 問題: $x\ne0$、$n=x/|x|$ とし、$H=I_d-2nn^T$ と置く。$Hn=-n$、$Hv=v$（$n\cdot v=0$）を直接示せ。これを用いて反転のJacobianが全方向の長さを $|x|^{-2}$ 倍することを説明せよ。

<!-- solution-start -->
**詳細解答。** $n^Tn=1$ より $Hn=n-2n(n^Tn)=-n$。$n^Tv=0$ なら $Hv=v-2n(n^Tv)=v$ です。任意の $w$ を $w=(n\cdot w)n+w_\perp$、$n\cdot w_\perp=0$ と分解すれば $Hw=-(n\cdot w)n+w_\perp$ なので

$$
|Hw|^2=(n\cdot w)^2+|w_\perp|^2=|w|^2.
$$

Jacobian $DI(x)=|x|^{-2}H$ だから $|DI(x)w|=|x|^{-2}|w|$。径方向だけ符号が反転するものの長さの倍率は全方向で同じです。
<!-- solution-end -->

### 演習 QFT48-A3：反射二次形式の一モード

- Level: A
- 問題: 空間運動量の大きさを $k>0$ と固定し、正時間上の試験的モードを $f(\tau)=a e^{-b\tau}$（複素数 $a$、$b>0$）とする。核 $e^{-k(\tau+\sigma)}/(2k)$ の二次形式を求め非負性を示せ。この一モードの計算だけで一般の反射陽性が証明できるか。

<!-- solution-start -->
**詳細解答。** $k+b>0$ より

$$
\int_0^\infty e^{-k\tau}f(\tau)\,d\tau
=a\int_0^\infty e^{-(k+b)\tau}d\tau
=\frac{a}{k+b}.
$$

従って二次形式は

$$
\frac1{2k}\int_0^\infty\!\int_0^\infty
\overline{f(\tau)}e^{-k(\tau+\sigma)}
f(\sigma)\,d\tau d\sigma
=\frac{|a|^2}{2k(k+b)^2}\ge0.
$$

一モードの非負性は自由Gaussian二点核の検査例です。任意の試験関数・全モードの積分や、相互作用理論の高次Schwinger関数までこの計算で証明したわけではありません。
<!-- solution-end -->

### 演習 QFT48-A4：二点関数のべきと選択則

- Level: A
- 問題: 次元 $\Delta_1,\Delta_2$ のスカラー一次場の二点関数を $G(x,y)=C|x-y|^{-q}$（$C\ne0$）と仮定する。拡大縮小で $q$ を求め、反転での $|x|,|y|$ の指数を比較して $\Delta_1=\Delta_2$ を導け。

<!-- solution-start -->
**詳細解答。** 拡大縮小では $G(\lambda x,\lambda y)=\lambda^{-q}G(x,y)$、一次場変換から $\lambda^{-(\Delta_1+\Delta_2)}G(x,y)$。従って $q=\Delta_1+\Delta_2$ です。[一次場の変換則](#def-qft48-scalar-primary)と[反転のJacobianと距離恒等式](#prop-qft48-inversion)に代入した左辺は $C|x-y|^{-q}|x|^q|y|^q$、一次場則からの右辺は $C|x-y|^{-q}|x|^{2\Delta_1}|y|^{2\Delta_2}$。$C\ne0$ なので $|x|,|y|$ を独立に動かして $q=2\Delta_1=2\Delta_2$ が必要です。よって両次元は一致し、$q=2\Delta_1$ です。
<!-- solution-end -->

### 演習 QFT48-A5：三次元自由場の次元

- Level: A
- 問題: Euclid空間 $d=3$ の自由質量零場について $\Gamma(1/2)=\sqrt\pi$ を用い $C_3(z)$ を求めよ。二点関数をスカラー一次場の形 $C|z|^{-2\Delta}$ と比較し、$\Delta$ を求めて反転の倍率を検算せよ。

<!-- solution-start -->
**詳細解答。** [質量零共分散の公式](#thm-qft48-massless-kernel)へ $d=3$ を代入すると

$$
C_3(z)=\frac{\sqrt\pi}{4\pi^{3/2}}|z|^{-1}
=\frac1{4\pi|z|}.
$$

$2\Delta=d-2=1$ なので $\Delta=1/2$。反転後は $|I(x)-I(y)|^{-1}=|x||y|\,|x-y|^{-1}$ で、各点の一次場倍率は $\Omega_I(x)^{-1/2}=|x|$、$\Omega_I(y)^{-1/2}=|y|$。二つの積が一致します。
<!-- solution-end -->

### 演習 QFT48-B1：三点関数の指数を連立で求める

- Level: B
- 問題: $d\ge3$ で $\Delta_1=1,\Delta_2=2,\Delta_3=3$ のスカラー一次場があると仮定する。$G_3=C/(r_{12}^a r_{23}^b r_{31}^c)$ の $a,b,c$ を反転の三条件から求め、拡大縮小の指数も検算せよ。$C=0$ は許されるか。

<!-- solution-start -->
**詳細解答。** [一次場の変換則](#def-qft48-scalar-primary)で反転の各点に必要なべきは $2\Delta_1=2,2\Delta_2=4,2\Delta_3=6$ だから

$$
a+c=2,\qquad a+b=4,\qquad b+c=6.
$$

最初の二式を加えて三式を引くと $2a=0$ なので $a=0$。次に $b=4$、$c=2$ です。$a+b+c=6=\Delta_1+\Delta_2+\Delta_3$ より、全点を $\lambda$ 倍すると $\lambda^{-6}$ が出ます。従って $G_3=C/(r_{23}^4r_{31}^2)$ であり、係数 $C=0$ も対称性を満たすので許されます。
<!-- solution-end -->

### 演習 QFT48-B2：二次元の赤外零モードはどこで壊れるか

- Level: B
- 問題: $d=2$ で形式的に $C_2(r)=\int_0^\infty(4\pi s)^{-1}e^{-r^2/(4s)}ds$ と置く。$r>0$ を固定したときの大きな $s$ の振る舞いを求め、$C_2(r)$ が有限にならない理由を述べよ。一方、熱時間積分に共通の上限 $R$ を設けた $C_{2,R}(r)$ と $C_{2,R}(r_0)$（$r,r_0>0$）の差の極限が収束し、その値が $-(1/2\pi)\log(r/r_0)$ になることを導け。

<!-- solution-start -->
**詳細解答。** $s\to\infty$ で $e^{-r^2/(4s)}=1+O(s^{-1})$ なので被積分関数は $(4\pi s)^{-1}+O(s^{-2})$ です。従って $\int_1^\infty ds/s$ が対数発散し、個々の $C_2(r)$ は有限ではありません。発散量どうしを直接引くのではなく、共通の上限 $R$ で正則化します。

$$
C_{2,R}(r)=\frac1{4\pi}\int_0^R\frac{e^{-r^2/(4s)}}s\,ds.
$$

二つの $C_{2,R}$ の差を取り、$R\to\infty$ とします。差の被積分関数は $s\to\infty$ で $O(s^{-2})$、$s\downarrow0$ では $r,r_0>0$ により指数減衰するため、

$$
\begin{aligned}
\Delta C_2(r,r_0)
&=\lim_{R\to\infty}\{C_{2,R}(r)-C_{2,R}(r_0)\}\\
&=\frac1{4\pi}\int_0^\infty
\frac{e^{-r^2/(4s)}-e^{-r_0^2/(4s)}}s\,ds
\end{aligned}
$$

は収束します。

$u=1/s$ とすれば $\int_0^\infty (e^{-au}-e^{-bu})du/u=\log(b/a)$（$a,b>0$）。これは $a$ で微分すると $-1/a$、$a=b$ で零という条件から確かめられます。$a=r^2/4,b=r_0^2/4$ を代入して

$$
\Delta C_2(r,r_0)=\frac1{4\pi}\log\frac{r_0^2}{r^2}
=-\frac1{2\pi}\log\frac r{r_0}.
$$

差には参照尺度 $r_0$ が残るので、二次元の場 $\phi$ 自体を安易に次元零の通常の一次場だと宣言できません。
<!-- solution-end -->

### 演習 QFT48-B3：質量はなぜ共形距離則を壊すか

- Level: B
- 問題: $m>0$ のEuclid自由場の二点核 $C_m(x)=\int d^dp/(2\pi)^d\,e^{ip\cdot x}/(|p|^2+m^2)$（分布の意味）について、$\lambda>0$ に対し $C_m(\lambda x)=\lambda^{2-d}C_{\lambda m}(x)$ を示せ。固定した $m$ における $C_m(\lambda x)=\lambda^{2-d}C_m(x)$ が一般には成り立たない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $k=\lambda p$ と変数変換すると $d^dp=\lambda^{-d}d^dk$、分母は $|p|^2+m^2=\lambda^{-2}(|k|^2+\lambda^2m^2)$ です。よって

$$
\begin{aligned}
C_m(\lambda x)
&=\int\frac{\lambda^{-d}d^dk}{(2\pi)^d}
\frac{e^{ik\cdot x}}{\lambda^{-2}(|k|^2+\lambda^2m^2)}\\
&=\lambda^{2-d}C_{\lambda m}(x).
\end{aligned}
$$

右辺には $m$ でなく $\lambda m$ が現れます。固定質量を保った尺度変換にはなっていません。例えばFourier分母の $m^2$ は $|p|^2$ と別の次元を持ち、$m^{-1}$ という固有の長さが残るため、質量零の単一のべき乗距離則は一般に失われます。
<!-- solution-end -->

### 演習 QFT48-B4：四点の交差比は変わらない

- Level: B
- 問題: 相異なる四点 $x_1,\ldots,x_4$ が原点を避けるとき、$u=r_{12}^2r_{34}^2/(r_{13}^2r_{24}^2)$ と $v=r_{14}^2r_{23}^2/(r_{13}^2r_{24}^2)$ が反転で不変であることを示せ。また拡大縮小で不変であることを説明し、三点関数と四点関数の違いを述べよ。

<!-- solution-start -->
**詳細解答。** [反転のJacobianと距離恒等式](#prop-qft48-inversion)から $r_{ij}'{}^2=r_{ij}^2/(|x_i|^2|x_j|^2)$ です。$u$ の分子は分母に比べると $|x_1|^2|x_2|^2|x_3|^2|x_4|^2$ が同じだけ現れ、完全に消えます。$v$ でも各点が分子と分母に一回ずつ現れるため消えます。拡大縮小では距離二乗が全て $\lambda^2$ 倍になり、分子も分母も $\lambda^4$ 倍なので不変です。三点の場合は独立の交差比がないため距離指数以外の関数を作れませんが、四点では相関関数に一般の $F(u,v)$ が残る余地があります。
<!-- solution-end -->

### 演習 QFT48-C1：自由場の二点・三点と対称性を一つの計算で照合する

- Level: C
- 問題: $d=4$ の中心化自由質量零Gaussianスカラー場について、相異なる点で $G(x,y)=1/(4\pi^2|x-y|^2)$ とする。形式的なWick積 $\mathcal O(x)=:\!\phi(x)^2\!:$ は同一点収縮を差し引いた複合場とし、相異なる点での相関関数は [ボースGaussianのWick対合公式](../QFT19/index.md#thm-qft19-boson-wick)で計算するとする。

  1. $\langle\phi(x_1)\phi(x_2)\rangle$ と $\langle\mathcal O(x_1)\mathcal O(x_2)\rangle$ を計算し、共形二点関数の形と比較してそれぞれの候補次元を述べよ。
  2. $\langle\phi(x_1)\phi(x_2)\mathcal O(x_3)\rangle$ の収縮を全て数え、三点関数の指数と係数を求めよ。
  3. $\langle\phi(x_1)\phi(x_2)\phi(x_3)\rangle$ はいくらか。これらの計算だけで任意の相互作用CFTの反射陽性や実時間復元を証明したといえるか。

<!-- solution-start -->
**詳細解答。** まず自由場の二点は仮定から $G_{12}=1/(4\pi^2r_{12}^2)$ です。Wick積は内部の自己収縮を除くため、$\langle:\!\phi(x_1)^2\!::\!\phi(x_2)^2\!:\rangle$ に残るのは点1の二本を点2の二本へ結ぶ二通りの対合だけです。従って

$$
\langle\mathcal O(x_1)\mathcal O(x_2)\rangle
=2G_{12}^2=\frac{2}{(4\pi^2)^2r_{12}^4}
=\frac1{8\pi^4r_{12}^4}.
$$

二点関数の距離指数を $2\Delta$ と比較すると、$\phi$ の候補次元は $\Delta_\phi=1$、$\mathcal O$ は $\Delta_{\mathcal O}=2$ です。これはここで計算した相関関数が一次場の形と**整合する**という主張で、複合場の全ての変換特性をこの式だけで証明したものではありません。

次に $\langle\phi_1\phi_2:\!\phi_3^2\!:\rangle$ では、点3の二本を点1と点2へそれぞれ結ぶ二つの割当てがあります。点1と点2を直接結ぶと点3の内部収縮が残って正規順序により除かれます。したがって

$$
\langle\phi(x_1)\phi(x_2)\mathcal O(x_3)\rangle
=2G_{13}G_{23}
=\frac2{(4\pi^2)^2r_{13}^2r_{23}^2}
=\frac1{8\pi^4r_{13}^2r_{23}^2}.
$$

次元 $(1,1,2)$ を [三点関数定理](#thm-qft48-primary-three-point)へ入力すると、$a=1+1-2=0$、$b=1+2-1=2$、$c=2+1-1=2$ なので距離指数は一致し、係数は $C_{123}=1/(8\pi^4)$ です。

最後に三つの中心化Gaussian場の積では全てを二本ずつ対合する組合せがなく、[ボースGaussianのWick対合公式](../QFT19/index.md#thm-qft19-boson-wick)により三点関数は零です。自由模型での相異なる点の計算と対称性の照合は、任意の相互作用模型の反射陽性、全Schwinger関数の正則性、Wightman境界値の存在を証明しません。それらには第5節で述べた追加条件が必要です。
<!-- solution-end -->

## この章で確認したこと

- Euclid自由質量零場の二点核は $d>2$ で距離の $(d-2)$ 乗に反比例し、反射陽性の二次形式をモードごとの絶対値二乗にできる。
- 共形写像のJacobianは各点で $\Omega^2I_d$ を満たし、反転の距離恒等式が一次場の変換を具体化する。
- スカラー一次場の二点関数は異なる次元間で零、等しい次元では距離べきに固定される。三点関数の三つの指数も決まるが、係数は模型依存である。
- 四点では共形交差比が残る。Euclidの運動学的な形から実時間QFTの成立を無条件に結論しない。
