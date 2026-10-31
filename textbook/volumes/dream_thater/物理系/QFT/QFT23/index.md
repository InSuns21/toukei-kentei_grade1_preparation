# QFT23 φ⁴模型の正則化・くりこみ条件・反項と波動関数くりこみ

[QFT22の一ループ頂点](../QFT22/index.md#thm-qft22-one-loop-vertices)では、四次元Euclid型の実スカラー場で、二点関数に二次発散、四点関数に対数発散が現れました。しかしカットオフ $\Lambda$ は実験で測る質量や結合ではありません。では、発散する積分を含む計算から、有限の運動量依存をどう取り出せるのでしょうか。

この講義の中心問いは、**どの値を測定の基準として固定し、裸の係数をどのように調整すれば、一ループの二点・四点頂点を有限にできるか**です。前半では運動量カットオフを使って反項を決め、後半では次元正則化で同じ問題を計算します。いずれも**固定した摂動次数の計算**であり、四次元相互作用場の非摂動的な存在を証明するものではありません。

## 1. 計算の規約と三種類の係数

時空は四次元Euclid空間、$\hbar=1$、$m_R^2>0$、$\lambda_R\ge0$ とします。添字 $R$ は指定した条件で定める**くりこみ済み**の量を表します。$\Lambda>0$ は鋭い球形UVカットオフで、必要なら先に有限体積・有限Fourierモードで計算してから体積を無限にします。[有限モードの定義](../QFT22/index.md#def-qft22-sharp-cutoff)と同じ正のEuclid伝播核を使用します。

もともとの作用の係数は、正則化を変えると別の値に調整されるため「裸の」係数 $m_B^2,\lambda_B,Z_B$ と区別します。基準となる $m_R^2,\lambda_R$ の周りで計算し、その差を反項 $\delta m^2,\delta\lambda,\delta Z$ として頂点に追加するのが手順です。$Z_B$ は場の勾配の二次項の係数で、粒子の伝播の運動量依存を規格化する役割を持ちます。

<a id="def-qft23-bare-counterterms"></a>

<!-- formal-statement-start -->
> **定義（裸の作用・くりこみ済み係数・反項）**
> 四次元Euclid型の実スカラー場 $\phi$ に対し、基準パラメータ $m_R^2>0,\lambda_R\ge0$ と、正則化に依存しうる係数 $\delta Z,\delta m^2,\delta\lambda$ を用いて

$$
\begin{aligned}
S_B[\phi]&=\int d^4x\left\{
\frac{Z_B}{2}(\partial_\mu\phi)^2
+\frac{m_B^2}{2}\phi^2+\frac{\lambda_B}{4!}\phi^4\right\},\\
Z_B&=1+\delta Z,\qquad
m_B^2=m_R^2+\delta m^2,\qquad
\lambda_B=\lambda_R+\delta\lambda.
\end{aligned}
$$

> この表示で $S_B=S_R+S_{\mathrm{ct}}$ と分け、$S_R$ は $Z=1,m_R^2,\lambda_R$ の作用、$S_{\mathrm{ct}}$ は $\delta Z,\delta m^2,\delta\lambda$ の項とする。有限カットオフの摂動展開では、$\delta m^2=O(\lambda_R)$、$\delta\lambda=O(\lambda_R^2)$、$\delta Z=O(\lambda_R^2)$ と次数を割り当てる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft23-bare-counterterms -->
### 例：二点と四点で反項の係数がどう見えるか

**定義の確認**：$S_{\mathrm{ct}}$ の二次部分をFourier変換します。$\partial_\mu\phi$ は運動量 $p$ で $ip_\mu\phi(p)$ となるため、二回微分した二点の係数は $\delta Z p^2+\delta m^2$ です。四次項 $\delta\lambda\phi^4/4!$ の四回微分は $4!\delta\lambda/4!=\delta\lambda$ となります。従って、どの反項がどの頂点を変更するかを式から判定できます。
<!-- definition-example-end -->

以下の $O(\lambda_R^n)$ は固定有限正則化での形式的摂動次数を指します。次数ごとに反項を決めてから $\Lambda\to\infty$ を調べるのであって、裸作用がすべての $\Lambda$ で正定値であると仮定しません。質量反項は大きな負の値になり得ます。

## 2. 零運動量を基準にするくりこみ条件

測定に対応させたい量を指定しなければ、反項の有限部分は一意には決まりません。ここでは外線運動量 $p=0$ を基準に、二点1PI頂点の値・運動量の傾きと四点1PI頂点を固定します。$p^2$ の微分はEuclid回転不変な二点頂点を $p^2$ の関数として扱う微分です。

<a id="def-qft23-subtraction-conditions"></a>

<!-- formal-statement-start -->
> **定義（零運動量のくりこみ条件）**
> $m_R^2>0$ の四次元Euclid型 $\phi^4$ 摂動論で、[1PI頂点](../QFT22/index.md#def-qft22-proper-vertices)の $p=0$ の近傍を考える。各固定有限正則化で反項を次数ごとに調整し、指定次数まで

$$
\Gamma_R^{(2)}(0)=m_R^2,\qquad
\left.\frac{\partial\Gamma_R^{(2)}(p)}{\partial p^2}\right|_{p^2=0}=1,\qquad
\Gamma_R^{(4)}(0,0,0,0)=\lambda_R
$$

> を満たす方式を零運動量減算法とする。外線の四運動量は保存し、質量が正なので基準点での赤外特異性はない。この $m_R$ は零運動量の逆伝播関数を規格化するパラメータであり、一般にMinkowski空間の物理的な極質量と同じとは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft23-subtraction-conditions -->
### 例：自由理論で三条件を検査する

**定義の確認**：$\lambda_R=0$、反項をすべて零とした自由理論では $\Gamma^{(2)}(p)=p^2+m_R^2$ です。$p=0$ の値は $m_R^2$、$p^2$ の係数は $1$、四階微分は $0=\lambda_R$ です。三条件は別々の微分を指定しており、互いの代用にはなりません。
<!-- definition-example-end -->

## 3. カットオフで反項を出発点から求める

[QFT22の二点tadpole・四点bubble](../QFT22/index.md#thm-qft22-one-loop-vertices)に、先ほど確認した反項頂点を加えます。$I_1(\Lambda,m_R)$ は一本の伝播線の積分、$B_\Lambda(P;m_R)$ は二本の伝播線に共通の鋭いカットオフを課した積分であり、$I_2(\Lambda,m_R)=B_\Lambda(0;m_R)$ です。

<a id="thm-qft23-counterterms-cutoff"></a>

<!-- formal-statement-start -->
> **定理（零運動量減算法の一ループ反項）**
> 四次元Euclid型実 $\phi^4$ 理論で $m_R^2>0$、$\lambda_R\ge0$、固定有限の鋭いUVカットオフ $\Lambda$ を用い、前節の三条件を一ループで課す。反項を摂動次数で比較すると

$$
\boxed{\delta m^2=-\frac{\lambda_R}{2}I_1(\Lambda,m_R)},\qquad
\boxed{\delta\lambda=\frac{3\lambda_R^2}{2}I_2(\Lambda,m_R)},\qquad
\boxed{\delta Z=0}
$$

> となる（表示した次数の係数）。ここで $\delta m^2$ の次の補正は $O(\lambda_R^2)$、$\delta\lambda$ の次の補正は $O(\lambda_R^3)$、$\delta Z$ の最初の非零候補は $O(\lambda_R^2)$ である。得られる二点・四点頂点は

$$
\Gamma_R^{(2)}(p)=p^2+m_R^2+O(\lambda_R^2),
$$

$$
\Gamma_R^{(4)}(p_i)=\lambda_R-\frac{\lambda_R^2}{2}
\sum_{(ij)=(12),(13),(14)}\left\{B_\Lambda(p_i+p_j;m_R)-I_2(\Lambda,m_R)\right\}
+O(\lambda_R^3).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一ループ図の符号と対称因子は[前講の頂点定理](../QFT22/index.md#thm-qft22-one-loop-vertices)で確定しています。二点では定数だけ、四点では三チャネルの和が現れます。各条件を代入すると、カットオフに依存する反項は連立一次方程式として決まります。

<!-- proof-start -->
### 証明

相互作用次数を数えると、質量反項を一ループ内部線へ挿入した寄与は少なくとも $O(\lambda_R^2)$、結合反項をbubbleへ挿入すると $O(\lambda_R^3)$ です。従ってこの次数では、自由伝播線の質量には $m_R^2$ を使ってよく、二点頂点は

$$
\Gamma_R^{(2)}(p)=p^2+m_R^2
+\delta Z p^2+\delta m^2+\frac{\lambda_R}{2}I_1(\Lambda,m_R)
+O(\lambda_R^2).
$$

$p=0$ を入れると $\delta m^2+\lambda_R I_1/2=0$。この式を $p^2$ で微分すると、$I_1$ は外線運動量と無関係なので $1+\delta Z=1$ です。従って $\delta m^2=-\lambda_R I_1/2$、$\delta Z=0$ が得られます。

四点については、外線の組分け $(12|34),(13|24),(14|23)$ のそれぞれに対称因子 $1/2$ があるため

$$
\Gamma_R^{(4)}(p_i)=\lambda_R+\delta\lambda
-\frac{\lambda_R^2}{2}\sum_{(ij)}B_\Lambda(p_i+p_j;m_R)
+O(\lambda_R^3).
$$

外線をすべて零とすると三つとも $B_\Lambda(0)=I_2$ になり、指定条件は

$$
\lambda_R=\lambda_R+\delta\lambda-\frac{3\lambda_R^2}{2}I_2,
$$

すなわち $\delta\lambda=3\lambda_R^2 I_2/2$ を与えます。この値を四点式へ戻して、各チャネルから同じ零運動量値を差し引けば第二の表示式が出ます。以上の等式はそれぞれ明記した摂動次数までの等式です。
<!-- proof-end -->

### 具体例：$\Lambda=m_R$ で反項の符号を確認する

[カットオフ積分の厳密式](../QFT22/index.md#thm-qft22-cutoff-integrals)から

$$
\delta m^2=-\frac{\lambda_R m_R^2}{32\pi^2}(1-\log2)<0,
$$

$$
\delta\lambda=\frac{3\lambda_R^2}{32\pi^2}\left(\log2-\frac12\right)>0.
$$

ループの質量補正は正、四点補正は負なので、両反項がそれぞれ逆符号となることを数値で検査できました。$\delta Z=0$ は「場を規格化する必要が永久にない」という意味ではありません。ここでのtadpoleが運動量 $p$ を含まない、という一ループ固有の結果です。

## 4. カットオフを外しても残る有限な運動量依存

反項を付けた後に重要なのは、$B_\Lambda(P)-B_\Lambda(0)$ の極限です。前講で示した[bubble差の収束](../QFT22/index.md#prop-qft22-bubble-difference)により、固定 $P$ で差の極限が存在します。次に、その極限値を具体的な積分で求めます。

<a id="prop-qft23-subtracted-bubble"></a>

<!-- formal-statement-start -->
> **命題（差し引いたbubbleの有限極限）**
> 四次元Euclid型で $m>0$、外部運動量 $P\in\mathbb R^4$ を固定する。双方の内部伝播線に鋭い球カットオフを課した $B_\Lambda(P;m)$ と $I_2(\Lambda,m)=B_\Lambda(0;m)$ に対し

$$
\lim_{\Lambda\to\infty}\{B_\Lambda(P;m)-I_2(\Lambda,m)\}
=-\frac1{16\pi^2}\int_0^1
\log\left(1+\frac{x(1-x)P^2}{m^2}\right)dx.
$$

> 従って零運動量で差し引いた一ループ四点頂点は、固定外線運動量について有限な極限を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず[収束命題](../QFT22/index.md#prop-qft22-bubble-difference)によって、鋭いカットオフ境界に残る誤差が極限で消えることを確かめます。その後は二つの分母をFeynmanパラメータ $x$ でまとめ、**収束する差の積分**に限って運動量を平行移動します。

<!-- proof-start -->
### 証明

絶対収束する差の極限ではカットオフの境界殻が消えるので、まず分母の積に

$$
\frac1{AB}=\int_0^1\frac{dx}{\{xA+(1-x)B\}^2}
$$

を使います。この公式は $A,B>0$ のとき、$y=xA+(1-x)B$ と置いて $\int_A^B y^{-2}dy/(B-A)=1/(AB)$ を計算して確かめられます。$A=k^2+m^2$、$B=(k+P)^2+m^2$ とすると

$$
xA+(1-x)B=\{k+(1-x)P\}^2+m^2+x(1-x)P^2.
$$

各項を無限領域で別々に積分すると発散するため、次の**差全体**に対してのみ平行移動と極限操作をします。$M_x^2=m^2+x(1-x)P^2$ と書き、絶対可積分な差をFourier運動量の $q$ で積分すると

$$
\lim_{\Lambda\to\infty}(B_\Lambda(P)-I_2)
=\int_0^1dx\int_{\mathbb R^4}\frac{d^4q}{(2\pi)^4}
\left\{\frac1{(q^2+M_x^2)^2}-\frac1{(q^2+m^2)^2}\right\}.
$$

中括弧は $|q|\to\infty$ で $O(|q|^{-6})$ なので四次元で積分できます。半径を $R$ まで取ると[前講の $I_2$ の原始関数](../QFT22/index.md#thm-qft22-cutoff-integrals)から

$$
\begin{aligned}
&\int_{|q|\le R}\frac{d^4q}{(2\pi)^4}
\left\{\frac1{(q^2+M_x^2)^2}-\frac1{(q^2+m^2)^2}\right\}\\
&=\frac1{16\pi^2}\left\{
\log\frac{R^2+M_x^2}{M_x^2}
-\frac{R^2}{R^2+M_x^2}
-\log\frac{R^2+m^2}{m^2}
+\frac{R^2}{R^2+m^2}\right\}.
\end{aligned}
$$

$R\to\infty$ では $\log(R^2+M_x^2)-\log(R^2+m^2)\to0$、二つの有理項の差も零です。従って残るのは $-\log(M_x^2/m^2)/(16\pi^2)$。$0\le x\le1$ と $m>0$ により一様な可積分上界があり、$x$ の積分へ極限を通せます。
<!-- proof-end -->

<a id="cor-qft23-finite-vertex"></a>

<!-- formal-statement-start -->
> **系（零運動量減算法の一ループ有限四点頂点）**
> $m_R^2>0$ を固定し、前節の反項を次数ごとに選ぶと、四次元Euclid型実 $\phi^4$ 理論の四点1PI頂点の $O(\lambda_R^2)$ までの係数は、$\Lambda\to\infty$ で

$$
\Gamma_R^{(4)}(p_i)=\lambda_R
+\frac{\lambda_R^2}{32\pi^2}
\sum_{(ij)=(12),(13),(14)}\int_0^1
\log\left(1+\frac{x(1-x)(p_i+p_j)^2}{m_R^2}\right)dx
+O(\lambda_R^3)
$$

> となる。ただし剰余はカットオフと独立な一様評価を主張せず、ここで極限を取ったのは明示した摂動係数である。
<!-- formal-statement-end -->

この結果は[一ループ反項定理](#thm-qft23-counterterms-cutoff)の三つの差に[収束命題の式](#prop-qft23-subtracted-bubble)を一つずつ代入して得られます。$p_i=0$ なら対数がすべて零になり、条件 $\Gamma_R^{(4)}(0)=\lambda_R$ に戻ります。

## 5. 次元正則化は何を変更するのか

鋭いカットオフは運動量領域を球に制限しました。別の正則化では、整数の次元 $4$ で発散する積分を、まず収束する複素パラメータ $d$ の領域で計算し、その解析接続を $d=4-2\varepsilon$ の近傍へ持ち込みます。これが**次元正則化**です。解析接続と極を計算する道具として、既習の[Gamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)と[その有理型解析接続](../../../解析系/CA/CA11/index.md#thm-ca11-meromorphic-continuation)を使います。非整数次元の積分を普通の正値測度として構成した、と主張しているわけではありません。

四次元で無次元の結合を保つため、$\varepsilon$ が零でないときには任意の基準スケール $\mu>0$ を入れます。$d=4-2\varepsilon$ では $\phi^4$ 結合の質量次元が $2\varepsilon$ なので、$\mu^{2\varepsilon}$ が次元を補います。

<a id="def-qft23-dimensional-regularization"></a>

<!-- formal-statement-start -->
> **定義（次元正則化と基準スケール）**
> $m>0$、$\mu>0$、$\alpha>0$ とし、$d$ が実数で $0<d<2\alpha$ のときに収束する回転不変積分を解析接続して

$$
J_\alpha(d;m,\mu)=\mu^{2\varepsilon}
\int\frac{d^dk}{(2\pi)^d}\frac1{(k^2+m^2)^\alpha},
\qquad d=4-2\varepsilon
$$

> と表す。整数以外の $d$ における右辺は以下のGamma関数表示で定める解析的正則化の記法であり、文字通りのLebesgue積分を意味しない。$\mu$ は質量次元を合わせる任意の基準スケールである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft23-dimensional-regularization -->
### 例：Gamma関数の引数を代入する

**定義の確認**：四点bubbleの零外部運動量は分母が二乗なので $\alpha=2$ です。$d/2=2-\varepsilon$ から $\alpha-d/2=\varepsilon$ となり、$J_2$ は $\Gamma(\varepsilon)$ を含みます。$\Gamma(\varepsilon)\sim1/\varepsilon$ が四次元での対数発散に対応します。質量 $m>0$ により赤外の零運動量発散とは区別できます。
<!-- definition-example-end -->

<a id="thm-qft23-dimensional-integral"></a>

<!-- formal-statement-start -->
> **定理（次元正則化した二点・四点の基本積分）**
> $m,\mu>0$、$\alpha>0$ とする。収束域 $0<\operatorname{Re}d<2\alpha$ からの有理型解析接続で

$$
J_\alpha(d;m,\mu)=\frac{\mu^{2\varepsilon}}{(4\pi)^{d/2}}
\frac{\Gamma(\alpha-d/2)}{\Gamma(\alpha)}
(m^2)^{d/2-\alpha},\qquad d=4-2\varepsilon.
$$

> $\varepsilon\to0$ の展開で $\Delta_\varepsilon=1/\varepsilon-\gamma_E+\log(4\pi)$ とおけば

$$
J_1=-\frac{m^2}{16\pi^2}
\left\{\Delta_\varepsilon+1+\log\frac{\mu^2}{m^2}\right\}+O(\varepsilon),
$$

$$
J_2=\frac1{16\pi^2}
\left\{\Delta_\varepsilon+\log\frac{\mu^2}{m^2}\right\}+O(\varepsilon).
$$

> ここで $\gamma_E$ は[Euler--Mascheroni 定数](../../../解析系/CA/CA11/index.md#def-ca11-euler-mascheroni)。$J_1$ の負符号は解析接続の値であって、正の積分核を持つ四次元の有限カットオフ積分が負になるという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

分母を指数関数の積分へ直すSchwingerパラメータを使い、Gaussian積分を実行します。最後にGamma関数の $\varepsilon=0$ 周りでの展開を行います。

<!-- proof-start -->
### 証明

$a>0,\alpha>0$ について $a^{-\alpha}=\Gamma(\alpha)^{-1}\int_0^\infty t^{\alpha-1}e^{-at}dt$ は、$u=at$ と置いてGamma関数の定義から従います。収束域では積分交換できるので

$$
\begin{aligned}
J_\alpha
&=\frac{\mu^{2\varepsilon}}{\Gamma(\alpha)}
\int_0^\infty t^{\alpha-1}e^{-tm^2}dt
\int\frac{d^dk}{(2\pi)^d}e^{-tk^2}\\
&=\frac{\mu^{2\varepsilon}}{(4\pi)^{d/2}\Gamma(\alpha)}
\int_0^\infty t^{\alpha-1-d/2}e^{-tm^2}dt\\
&=\frac{\mu^{2\varepsilon}}{(4\pi)^{d/2}}
\frac{\Gamma(\alpha-d/2)}{\Gamma(\alpha)}
(m^2)^{d/2-\alpha}.
\end{aligned}
$$

Gaussian積分は最初に正整数次元で各座標に分けて $(4\pi t)^{-d/2}$ を得て、その式を $d$ へ解析接続して使います。[Gamma関数の関数等式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation)と[Euler--Mascheroni 定数](../../../解析系/CA/CA11/index.md#def-ca11-euler-mascheroni)を用いると $\Gamma(\varepsilon)=1/\varepsilon-\gamma_E+O(\varepsilon)$、$\Gamma(-1+\varepsilon)=\Gamma(\varepsilon)/(\varepsilon-1)=-1/\varepsilon+\gamma_E-1+O(\varepsilon)$ です。また

$$
(4\pi)^\varepsilon\left(\frac{\mu^2}{m^2}\right)^\varepsilon
=1+\varepsilon\left\{\log(4\pi)+\log\frac{\mu^2}{m^2}\right\}
+O(\varepsilon^2).
$$

$\alpha=2$ では $\Gamma(2)=1$、$\alpha=1$ では質量因子が $m^2$ となります。それぞれ掛け合わせると、上記の極と有限部分が得られます。
<!-- proof-end -->

### 例：極の符号をカットオフと混同しない

[QFT22の厳密積分](../QFT22/index.md#thm-qft22-cutoff-integrals)は $I_1>0$ で、先頭発散が $+\Lambda^2/(16\pi^2)$ でした。一方、次元正則化は $J_1\sim-m^2/(16\pi^2\varepsilon)$ です。ここには $\Lambda^2$ の項自体がありません。**正則化ごとに発散部分の見え方が異なる**ので、$1/\varepsilon$ を機械的に $\Lambda^2$ と同一視してはいけません。

## 6. 次元正則化の反項と方式の違い

次元正則化では質量・波動関数の二次項を先と同じ形にし、四次項は $\mu^{2\varepsilon}(\lambda_R+\delta\lambda)\phi^4/4!$ と書きます。$J_1,J_2$ の極は、カットオフの発散と同じ局所的な $\phi^2,\phi^4$ 項で打ち消せます。ただし、有限部分まで差し引くかどうかは指定した方式によって異なります。

<a id="def-qft23-msbar"></a>

<!-- formal-statement-start -->
> **定義（修正最小減算法）**
> $d=4-2\varepsilon$ の次元正則化において、次の組を反項で差し引く方式を修正最小減算法（$\overline{\mathrm{MS}}$）とする。

$$
\Delta_\varepsilon=\frac1\varepsilon-\gamma_E+\log(4\pi).
$$

> 有限な $\log(\mu^2/m_R^2)$ や外線運動量依存は、別のくりこみ条件を加えない限り差し引かない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft23-msbar -->
### 例：何が残るかを直接確認する

**定義の確認**：$J_2=(\Delta_\varepsilon+\log(\mu^2/m_R^2))/(16\pi^2)+O(\varepsilon)$ です。$\Delta_\varepsilon$ の係数を反項へ移せば $\log(\mu^2/m_R^2)/(16\pi^2)$ が残ります。零運動量減算法とは違い、この有限対数を消すことは $\overline{\mathrm{MS}}$ の定義に含まれていません。
<!-- definition-example-end -->

<a id="thm-qft23-msbar-counterterms"></a>

<!-- formal-statement-start -->
> **定理（修正最小減算法の一ループ反項）**
> $d=4-2\varepsilon$ の実スカラー $\phi^4$ 摂動論で $m_R^2>0$ とし、四次項を $\mu^{2\varepsilon}(\lambda_R+\delta\lambda)\phi^4/4!$ と定義する。$\overline{\mathrm{MS}}$ により、$\varepsilon=0$ の極に対する一ループ反項は

$$
\boxed{\delta m^2=\frac{\lambda_R m_R^2}{32\pi^2}\Delta_\varepsilon},\qquad
\boxed{\delta\lambda=\frac{3\lambda_R^2}{32\pi^2}\Delta_\varepsilon},\qquad
\boxed{\delta Z=0}
$$

> となる。質量・結合反項については、それぞれ $O(\lambda_R)$、$O(\lambda_R^2)$ の極を定めている。波動関数反項の $O(\lambda_R)$ 項は零であり、最初の非零候補は $O(\lambda_R^2)$ である。二点・四点の有限値は零運動量減算法とは一般に異なる。
<!-- formal-statement-end -->

### 証明の見取り図

$J_1,J_2$ の $\Delta_\varepsilon$ の係数を、頂点の符号と対称因子を保ったまま反転させます。特に $J_1$ の極は負なので、質量反項の極は正です。

<!-- proof-start -->
### 証明

[一ループの図の係数](../QFT22/index.md#thm-qft22-one-loop-vertices)を $J_1,J_2$ に置き換えると、二点の極は

$$
\frac{\lambda_R}{2}J_1\big|_{\mathrm{pole}}
=-\frac{\lambda_Rm_R^2}{32\pi^2}\Delta_\varepsilon.
$$

これを $+\delta m^2$ で相殺するため第一式になります。四点の零運動量での極は

$$
-\frac{3\lambda_R^2}{2}J_2\big|_{\mathrm{pole}}
=-\frac{3\lambda_R^2}{32\pi^2}\Delta_\varepsilon,
$$

なので第二式を加えます。外線の運動量に関して一ループtadpoleは定数であり、$p^2$ の極がないので $\delta Z=0$ です。$d\ne4$ の四点は $\mu^{2\varepsilon}$ を共通因子として持ち、相殺後に $\varepsilon\to0$ とします。
<!-- proof-end -->

### 方式比較：有限部分は指定によって変わる

零運動量減算法では $\Gamma_R^{(4)}(0)=\lambda_R$ を定義として固定しました。一方、$\overline{\mathrm{MS}}$ での同じ零運動量四点頂点は一ループで

$$
\Gamma_{\overline{\mathrm{MS}}}^{(4)}(0)
=\lambda_{\overline{\mathrm{MS}}}
-\frac{3\lambda_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\log\frac{\mu^2}{m_{\overline{\mathrm{MS}}}^2}
+O(\lambda_{\overline{\mathrm{MS}}}^3).
$$

ここでは同じ文字を機械的に同じ数値として比較していません。二つの方式の結合を、**同じ規格化条件から得た同じ1PI頂点**に一致させるなら、有限な再定義が必要です。物理的な予測を比べるには、その対応と同じ摂動次数を使わなければなりません。

<a id="prop-qft23-dr-bubble"></a>

<!-- formal-statement-start -->
> **命題（次元正則化の外部運動量差）**
> $m,\mu>0$、四次元Euclid型の固定外部運動量 $P$ に対して、次元正則化の二伝播線積分

$$
J_{\mathrm{bub}}(P)=\mu^{2\varepsilon}\int\frac{d^{4-2\varepsilon}k}{(2\pi)^{4-2\varepsilon}}
\frac1{(k^2+m^2)((k+P)^2+m^2)}
$$

> は、$\varepsilon\to0$ で

$$
J_{\mathrm{bub}}(P)=\frac1{16\pi^2}
\left\{\Delta_\varepsilon-
\int_0^1\log\frac{m^2+x(1-x)P^2}{\mu^2}\,dx\right\}+O(\varepsilon).
$$

> 特に $J_{\mathrm{bub}}(P)-J_{\mathrm{bub}}(0)$ の極限は、[鋭いカットオフの差](#prop-qft23-subtracted-bubble)と等しい。
<!-- formal-statement-end -->

### 証明の見取り図

次元正則化の収束域でFeynmanパラメータと運動量シフトを適用すると、質量 $m^2$ を $m^2+x(1-x)P^2$ に置き換えた $J_2$ になります。

<!-- proof-start -->
### 証明

前の[分母の合成公式](#prop-qft23-subtracted-bubble)で $M_x^2=m^2+x(1-x)P^2$ を置くと、収束域で

$$
J_{\mathrm{bub}}(P)=\int_0^1J_2(4-2\varepsilon;M_x,\mu)\,dx.
$$

[次元積分定理](#thm-qft23-dimensional-integral)を $m=M_x$ に適用すると、極 $\Delta_\varepsilon$ は $x$ に依存しません。$\int_0^1dx=1$ と $\log(\mu^2/M_x^2)=-\log(M_x^2/\mu^2)$ により表示式です。$P=0$ との差を取れば極と $\log\mu^2$ が消え、残るのは

$$
-\frac1{16\pi^2}\int_0^1
\log\left(1+\frac{x(1-x)P^2}{m^2}\right)dx.
$$

従って二つの正則化が同じ有限差を与えることを直接確認できます。
<!-- proof-end -->

## 7. 波動関数くりこみと摂動論の境界

波動関数くりこみは、二点頂点の運動量 $p^2$ の係数を規格化する操作です。[零運動量のくりこみ条件](#def-qft23-subtraction-conditions)を実行すると、$δZ$ は $δm^2$ とは独立な二点頂点の傾きから決まります。[一ループ反項定理](#thm-qft23-counterterms-cutoff)で $δZ=0$ になったのは、四次相互作用の一ループtadpoleが運動量に依存しないためです。二ループ以降では運動量を伝える内部構造が現れ、一般に $p^2$ の補正が必要になります。

**注意する三つの境界**

1. 反項を導入することは、固定次数での発散相殺の処方です。すべての摂動次数の収束や、四次元の非自明な連続極限の存在を証明しません。
2. 次元正則化の極とカットオフのべき発散は、項ごとに数値を同一視できません。比較できるのは、同じくりこみ条件で定めた有限な頂点・観測量です。
3. $μ$ の変化は物理的な外線運動量の変化ではありません。$μ$ 依存と結合の走り方を結びつけるくりこみ群方程式は後続講義で扱います。

ここまでで、**二点の定数、二点の傾き、四点の零運動量値**という三条件が、それぞれ質量反項、波動関数反項、結合反項を決めることが分かりました。次はこの手続きを自分の手で再現します。

## 8. 演習：反項から有限な予測を取り出す

特記しない限り、四次元Euclid型の実 $\phi^4$ 模型、$m_R^2>0$、$\lambda_R\ge0$、$\hbar=1$ とし、摂動展開の表示次数を超える項は比較しません。$I_1,I_2,B_\Lambda$ は[QFT22のカットオフ積分](../QFT22/index.md#thm-qft22-cutoff-integrals)と[二伝播線の定義](../QFT22/index.md#def-qft22-proper-vertices)の記法です。

### 演習 QFT23-A1：反項の作用を微分する

- Level: A
- 問題：実スカラー場の反項作用 $S_{\mathrm{ct}}=\int d^4x\{\delta Z(\partial_\mu\phi)^2/2+\delta m^2\phi^2/2+\delta\lambda\phi^4/4!\}$ を用いる。零背景の二点・四点1PI頂点に加わる木レベル反項を、Fourier変換および係数の微分から導け。

<!-- solution-start -->
**詳細解答**

Fourier変換を $\phi(x)=\int d^4p/(2\pi)^4\,e^{ipx}\phi(p)$ とします。二次項に代入し、$x$ の積分で運動量保存 $q=-p$ を使うと

$$
S_{\mathrm{ct},2}=\frac12\int\frac{d^4p}{(2\pi)^4}
\phi(p)\phi(-p)(\delta Zp^2+\delta m^2).
$$

$\partial_\mu$ が $ip_\mu$ と $-ip_\mu$ を与えるため $(ip_\mu)(-ip_\mu)=p^2$ です。二回微分して保存deltaを除くと $\delta\Gamma^{(2)}(p)=\delta Zp^2+\delta m^2$。一方、定数背景 $v$ に対して四次作用密度は $\delta\lambda v^4/24$ なので

$$
\frac{d^4}{dv^4}\frac{\delta\lambda v^4}{24}
=\frac{4!}{24}\delta\lambda=\delta\lambda.
$$

従って四点への木レベル寄与は $\delta\Gamma^{(4)}=\delta\lambda$ です。これは[反項の定義](#def-qft23-bare-counterterms)と整合します。
<!-- solution-end -->

### 演習 QFT23-A2：カットオフが質量と等しい場合

- Level: A
- 問題：$m_R>0$、$\lambda_R>0$、$\Lambda=m_R$ の鋭いカットオフで、零運動量減算法の $\delta m^2$ と $\delta\lambda$ を厳密に求め、符号を説明せよ。

<!-- solution-start -->
**詳細解答**

[積分の厳密評価](../QFT22/index.md#thm-qft22-cutoff-integrals)へ $\Lambda=m_R$ を代入すると

$$
I_1=\frac{m_R^2}{16\pi^2}(1-\log2),\qquad
I_2=\frac1{16\pi^2}\left(\log2-\frac12\right).
$$

ここへ[反項定理](#thm-qft23-counterterms-cutoff)の係数 $-\lambda_R/2$、$3\lambda_R^2/2$ を掛けるので

$$
\delta m^2=-\frac{\lambda_Rm_R^2}{32\pi^2}(1-\log2),
\quad
\delta\lambda=\frac{3\lambda_R^2}{32\pi^2}
\left(\log2-\frac12\right).
$$

$1/2<\log2<1$ であることから前者は負、後者は正です。二点ループ補正 $+\lambda_RI_1/2$ と四点ループ補正 $-3\lambda_R^2I_2/2$ の逆符号を選んでおり、指定した零運動量値へ戻ります。
<!-- solution-end -->

### 演習 QFT23-A3：有限な差の低運動量展開

- Level: A
- 問題：$m>0$ と固定したEuclid外部運動量 $P$ について、$P^2/m^2$ が小さいときの $D(P)=-\frac1{16\pi^2}\int_0^1\log(1+x(1-x)P^2/m^2)dx$ の $P^2$ の係数を求めよ。$D(0)$ の値も示せ。

<!-- solution-start -->
**詳細解答**

$0\le x(1-x)\le1/4$ なので $|P^2|<4m^2$ なら対数級数を区間上で一様に扱えます。$u=x(1-x)P^2/m^2$ に $\log(1+u)=u+O(u^2)$ を用い

$$
D(P)=-\frac{P^2}{16\pi^2m^2}\int_0^1x(1-x)dx
+O(P^4/m^4).
$$

$\int_0^1x(1-x)dx=[x^2/2-x^3/3]_0^1=1/2-1/3=1/6$ より

$$
D(P)=-\frac{P^2}{96\pi^2m^2}+O(P^4/m^4),
\qquad D(0)=0.
$$

符号が負なのは、正のEuclid運動量 $P^2$ を入れると対数の引数が $1$ より大きいからです。
<!-- solution-end -->

### 演習 QFT23-A4：Gamma関数の極

- Level: A
- 問題：$\Gamma(\varepsilon)=1/\varepsilon-\gamma_E+O(\varepsilon)$ と[Gamma関数の関数等式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation) $\Gamma(z+1)=z\Gamma(z)$ を使い、$\Gamma(-1+\varepsilon)$ の定数項まで求めよ。それが $J_1$ の極に与える符号を説明せよ。

<!-- solution-start -->
**詳細解答**

漸化式に $z=-1+\varepsilon$ を代入すると

$$
\Gamma(-1+\varepsilon)=\frac{\Gamma(\varepsilon)}{\varepsilon-1}.
$$

ここで $1/(\varepsilon-1)=-(1+\varepsilon+O(\varepsilon^2))$ です。従って

$$
\Gamma(-1+\varepsilon)=
\left(\frac1\varepsilon-\gamma_E+O(\varepsilon)\right)
\left(-1-\varepsilon+O(\varepsilon^2)\right)
=-\frac1\varepsilon+\gamma_E-1+O(\varepsilon).
$$

[次元積分の定理](#thm-qft23-dimensional-integral)の $\alpha=1$ では、その他の主要因子 $(4\pi)^{-2}m^2$ は正なので、極は $-m^2/(16\pi^2\varepsilon)$ です。正値積分そのものの符号ではなく、解析接続後の極の符号です。
<!-- solution-end -->

### 演習 QFT23-A5：波動関数反項の判定

- Level: A
- 問題：一ループの二点頂点を $\Gamma^{(2)}(p)=p^2+m_R^2+\delta Zp^2+\delta m^2+c$ とする。$c$ は $p$ に依存しない数とし、零運動量での値と $p^2$ 微分の二条件から $\delta Z,\delta m^2$ を決定せよ。$c=\lambda_RI_1/2$ のときの意味を述べよ。

<!-- solution-start -->
**詳細解答**

$p=0$ を入れて $m_R^2+\delta m^2+c=m_R^2$ だから $\delta m^2=-c$。次に $p^2$ で微分すると $1+\delta Z$ が残り、傾き $1$ の条件から $\delta Z=0$ です。$c=\lambda_RI_1/2$ を入れれば $\delta m^2=-\lambda_RI_1/2$ です。

ここで $c$ が定数であることが結論に必須です。もし二点補正が $c+ap^2$ を含めば傾き条件は $1+\delta Z+a=1$ となり、$\delta Z=-a$ が必要になります。ゆえに「一ループで波動関数反項が零」という結論はこの模型のtadpole構造に依存します。
<!-- solution-end -->

### 演習 QFT23-B1：発散の型を反項へ移す

- Level: B
- 問題：$m_R>0$、$\lambda_R>0$ を固定する。鋭いカットオフ $\Lambda\to\infty$ で、$\delta m^2=-\lambda_RI_1(\Lambda,m_R)/2$ および $\delta\lambda=3\lambda_R^2I_2(\Lambda,m_R)/2$ の発散する先頭項と対数項を求め、なぜ同じ定数反項だけでは二条件を満たせないか述べよ。

<!-- solution-start -->
**詳細解答**

[積分の漸近式](../QFT22/index.md#thm-qft22-cutoff-integrals)を二つの反項へ代入します。

$$
\begin{aligned}
\delta m^2
&=-\frac{\lambda_R}{32\pi^2}
\left\{\Lambda^2-m_R^2\log\frac{\Lambda^2}{m_R^2}\right\}
+O\left(\frac{\lambda_Rm_R^4}{\Lambda^2}\right),\\
\delta\lambda
&=\frac{3\lambda_R^2}{32\pi^2}
\left\{\log\frac{\Lambda^2}{m_R^2}-1\right\}
+O\left(\frac{\lambda_R^2m_R^2}{\Lambda^2}\right).
\end{aligned}
$$

質量反項には $-\lambda_R\Lambda^2/(32\pi^2)$ と $+\lambda_Rm_R^2\log(\Lambda^2/m_R^2)/(32\pi^2)$ があり、結合反項には $+3\lambda_R^2\log(\Lambda^2/m_R^2)/(32\pi^2)$ があります。これらはそれぞれ $\phi^2$ と $\phi^4$ の別の微分係数へ寄与します。$\delta m^2$ のみでは四階微分に寄与せず、$\delta\lambda$ のみでは零背景の二階微分に寄与しないため、一種類の反項では二条件を同時に満たせません。
<!-- solution-end -->

### 演習 QFT23-B2：Feynmanパラメータと運動量差

- Level: B
- 問題：$m>0$、固定 $P\in\mathbb R^4$ に対し、次元正則化した $J_{\mathrm{bub}}(P)$ をFeynmanパラメータで表し、$J_{\mathrm{bub}}(P)-J_{\mathrm{bub}}(0)$ の $\varepsilon\to0$ 極限を求めよ。鋭いカットオフでも有限 $\Lambda$ の積分領域を平行移動してよいか答えよ。

<!-- solution-start -->
**詳細解答**

$A=k^2+m^2$、$B=(k+P)^2+m^2$ を使い $1/(AB)=\int_0^1dx/[xA+(1-x)B]^2$ とします。分母を平方完成すると

$$
xA+(1-x)B=(k+(1-x)P)^2+m^2+x(1-x)P^2.
$$

次元正則化の収束域で $q=k+(1-x)P$ と置き、$M_x^2=m^2+x(1-x)P^2$ とすれば

$$
J_{\mathrm{bub}}(P)=\int_0^1dx\,J_2(4-2\varepsilon;M_x,\mu).
$$

[次元積分定理](#thm-qft23-dimensional-integral)によって

$$
J_{\mathrm{bub}}(P)=\frac1{16\pi^2}
\left\{\Delta_\varepsilon-\int_0^1\log\frac{M_x^2}{\mu^2}\,dx\right\}
+O(\varepsilon).
$$

$P=0$ なら $M_x^2=m^2$ なので、差を取ると $\Delta_\varepsilon$ と基準スケール $\mu$ に依存する部分が消えて

$$
\lim_{\varepsilon\to0}\{J_{\mathrm{bub}}(P)-J_{\mathrm{bub}}(0)\}
=-\frac1{16\pi^2}\int_0^1
\log\left(1+\frac{x(1-x)P^2}{m^2}\right)dx.
$$

鋭いカットオフの有限 $\Lambda$ では $\{|k|\le\Lambda,\ |k+P|\le\Lambda\}$ がシフトで変わるため、領域をそのままの球へ置き換えてはいけません。[前講の境界殻の見積り](../QFT22/index.md#prop-qft22-bubble-difference)を用いて差の極限でのみ比較します。
<!-- solution-end -->

### 演習 QFT23-B3：二つの結合の有限な変換

- Level: B
- 問題：質量 $m>0$ と基準スケール $\mu>0$ を固定し、一ループの四点頂点を同じ物理的な規格化条件 $\Gamma^{(4)}(0)=g$ で比較する。零運動量減算法の結合 $g=\lambda_{\mathrm{ZM}}$ と修正最小減算法の結合 $\lambda_{\overline{\mathrm{MS}}}$ の関係を $O(\lambda^2)$ まで求めよ。

<!-- solution-start -->
**詳細解答**

[修正最小減算法の計算](#thm-qft23-msbar-counterterms)では $J_2$ から極だけを除き、有限な $\log(\mu^2/m^2)$ が残ります。したがって

$$
g=\Gamma_{\overline{\mathrm{MS}}}^{(4)}(0)
=\lambda_{\overline{\mathrm{MS}}}
-\frac{3\lambda_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\log\frac{\mu^2}{m^2}+O(\lambda_{\overline{\mathrm{MS}}}^3).
$$

零運動量減算法では定義上 $g=\lambda_{\mathrm{ZM}}$ なので

$$
\lambda_{\mathrm{ZM}}
=\lambda_{\overline{\mathrm{MS}}}
-\frac{3\lambda_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\log\frac{\mu^2}{m^2}
+O(\lambda_{\overline{\mathrm{MS}}}^3).
$$

$\mu=m$ ではこの次数の有限な差は零です。質量パラメータの方式差は $O(\lambda)$ ですが、上の結合の補正に代入した際の差は $O(\lambda^3)$ なので、表示次数では同じ正の $m$ を使えます。異なる方式の結合を無条件で同じ数値として扱わないことが重要です。
<!-- solution-end -->

### 演習 QFT23-B4：二点の有限部分と質量方式の変換

- Level: B
- 問題：次元正則化で $J_1=-m^2\{\Delta_\varepsilon+1+\log(\mu^2/m^2)\}/(16\pi^2)+O(\varepsilon)$ とする。$\overline{\mathrm{MS}}$ の質量反項を加えた零運動量二点頂点を一ループまで求め、同じ二点頂点の値を零運動量減算法の $m_{\mathrm{ZM}}^2$ と一致させる式を求めよ。

<!-- solution-start -->
**詳細解答**

$\overline{\mathrm{MS}}$ の反項は $\delta m^2=+\lambda m^2\Delta_\varepsilon/(32\pi^2)$ です。二点補正には $+\lambda J_1/2$ が入るので、極が相殺され

$$
\begin{aligned}
\Gamma_{\overline{\mathrm{MS}}}^{(2)}(0)
&=m_{\overline{\mathrm{MS}}}^2
+\frac{\lambda_{\overline{\mathrm{MS}}}m_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\Delta_\varepsilon
-\frac{\lambda_{\overline{\mathrm{MS}}}m_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\left\{\Delta_\varepsilon+1+
\log\frac{\mu^2}{m_{\overline{\mathrm{MS}}}^2}\right\}
+O(\lambda^2)\\
&=m_{\overline{\mathrm{MS}}}^2
-\frac{\lambda_{\overline{\mathrm{MS}}}m_{\overline{\mathrm{MS}}}^2}{32\pi^2}
\left\{1+\log\frac{\mu^2}{m_{\overline{\mathrm{MS}}}^2}\right\}
+O(\lambda^2).
\end{aligned}
$$

零運動量減算法ではこの値を定義上 $m_{\mathrm{ZM}}^2$ と置くので、上の右辺が変換式です。外線運動量の傾きはどちらも一ループで $1$ のままであり、質量の有限再定義と波動関数くりこみを混同しません。
<!-- solution-end -->

### 演習 QFT23-C1：二つの正則化から同じ運動量依存へ

- Level: C
- 問題：$m_R^2>0$、$\lambda_R>0$ とし、四点の外線運動量を $(p_1,p_2,p_3,p_4)=(q,-q,0,0)$、$q\in\mathbb R^4$ とする。(1) 鋭いカットオフでの三つのbubble引数と零運動量減算法の四点頂点を求め、$\Lambda\to\infty$ の有限係数を導け。(2) $q^2/m_R^2$ が小さいときの最初の非定数項を求めよ。(3) 次元正則化でも同じ運動量依存を得ることを反項と差の極を明示して検算し、二つの正則化の**裸の質量反項の符号**が違う理由を述べよ。

<!-- solution-start -->
**詳細解答**

(1) 四運動量の和は $q-q+0+0=0$ なので保存条件を満たします。三組に対応する和は

$$
P_{12}=p_1+p_2=0,\qquad
P_{13}=p_1+p_3=q,\qquad
P_{14}=p_1+p_4=q.
$$

[一ループの三チャネル式](../QFT22/index.md#thm-qft22-one-loop-vertices)へ代入すると、反項を含む頂点は

$$
\Gamma_\Lambda^{(4)}(q,-q,0,0)
=\lambda_R+\delta\lambda
-\frac{\lambda_R^2}{2}\{I_2+2B_\Lambda(q;m_R)\}
+O(\lambda_R^3).
$$

[零運動量での反項](#thm-qft23-counterterms-cutoff)は $\delta\lambda=3\lambda_R^2I_2/2$ です。代入して $I_2$ の係数をまとめると

$$
\begin{aligned}
\Gamma_\Lambda^{(4)}
&=\lambda_R+\frac{3\lambda_R^2}{2}I_2
-\frac{\lambda_R^2}{2}I_2-\lambda_R^2B_\Lambda(q;m_R)
+O(\lambda_R^3)\\
&=\lambda_R-\lambda_R^2\{B_\Lambda(q;m_R)-I_2\}
+O(\lambda_R^3).
\end{aligned}
$$

[差の極限定理](#prop-qft23-subtracted-bubble)を適用すれば

$$
\boxed{\Gamma_R^{(4)}(q,-q,0,0)
=\lambda_R+\frac{\lambda_R^2}{16\pi^2}
\int_0^1\log\left(1+\frac{x(1-x)q^2}{m_R^2}\right)dx
+O(\lambda_R^3).}
$$

(2) $u=q^2/m_R^2$ と置くと $x(1-x)u\le u/4$ です。$u\to0$ で対数をTaylor展開し、$\int_0^1x(1-x)dx=1/6$ から

$$
\int_0^1\log(1+x(1-x)u)dx=\frac u6+O(u^2).
$$

従って非定数の最初の項は

$$
\Gamma_R^{(4)}=\lambda_R+
\frac{\lambda_R^2q^2}{96\pi^2m_R^2}
+O\left(\frac{\lambda_R^2q^4}{m_R^4}\right)+O(\lambda_R^3).
$$

(3) 次元正則化では、三チャネルから $J_{\mathrm{bub}}(0)+2J_{\mathrm{bub}}(q)$ が現れます。[次元正則化のbubble](#prop-qft23-dr-bubble)はどの $P$ でも極が $\Delta_\varepsilon/(16\pi^2)$ なので、三つのbubbleの極は

$$
-\frac{\lambda_R^2}{2}\cdot
\frac{3\Delta_\varepsilon}{16\pi^2}
=-\frac{3\lambda_R^2}{32\pi^2}\Delta_\varepsilon.
$$

これは $\overline{\mathrm{MS}}$ の $\delta\lambda=3\lambda_R^2\Delta_\varepsilon/(32\pi^2)$ で消えます。さらに有限な結合の調整で $\Gamma^{(4)}(0)=\lambda_R$ とすれば、

$$
\Gamma^{(4)}(q)-\Gamma^{(4)}(0)
=-\lambda_R^2\{J_{\mathrm{bub}}(q)-J_{\mathrm{bub}}(0)\}
=\frac{\lambda_R^2}{16\pi^2}
\int_0^1\log\left(1+\frac{x(1-x)q^2}{m_R^2}\right)dx,
$$

となり (1) と一致します。カットオフでは $I_1>0$ だから $\delta m^2=-\lambda_RI_1/2<0$、次元正則化では解析接続で $J_1$ の極が負だから $\delta m^2$ の極が正です。[次元積分定理](#thm-qft23-dimensional-integral)の符号を参照すれば、正則化方式ごとに発散の表現が違うだけで、同じ条件で規格化した有限な運動量差に矛盾がないと分かります。
<!-- solution-end -->

## 9. 学びの整理

- [反項の定理](#thm-qft23-counterterms-cutoff)は、裸の係数を測定条件へ対応させる連立条件を具体的に解いたものです。
- [差し引いたbubble](#prop-qft23-subtracted-bubble)は、発散を相殺しても運動量による非自明な有限情報が残ることを示しました。
- [次元正則化](#def-qft23-dimensional-regularization)では極の形が変わりますが、[外部運動量差](#prop-qft23-dr-bubble)は同じでした。
- 波動関数反項が一ループで零というのはこの $\phi^4$ 模型の結果であり、一般理論についての普遍的結論ではありません。

次は、QEDの一ループ量子補正や、くりこみスケールを動かしたときの結合の変化へ進む準備が整いました。
