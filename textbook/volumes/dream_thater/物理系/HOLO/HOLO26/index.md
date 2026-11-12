# HOLO26 HKLL再構成

<!-- definition-example-audit: strict -->

[HOLO25の因果くさび領域とエンタングルメントくさび領域](../HOLO25/index.md#def-holo25-entanglement-wedge)では、境界の領域に対応するバルクの幾何学的領域を区別しました。しかし幾何を指定しただけでは、内部の**場の値や作用素をどの境界データから取り出すか**は分かりません。光が往復できることと、線形波動方程式を解いて場を復元できることも別です。

本講では、固定された反de Sitter（AdS）背景上の自由スカラー場について、**境界で読める正規化可能モードの係数をFourier変換で取り出し、内部の波を合成し直す**手続きを作ります。これがHamilton–Kabat–Lifschytz–Lowe（HKLL）型の再構成の最も計算しやすい姿です。[HOLO9のbulk-to-boundary核](../HOLO9/index.md#def-holo9-bulk-boundary)が境界の**源**からEuclid解を構成したのに対し、ここではLorentz時空で**正規化可能な量子状態の応答係数**から内部の場を復元します。

## 0. 模型・記号・結論の有効範囲

時空は時間をほどいた純global $AdS_3$、半径は $L>0$、計量符号は $(-,+,+)$、単位は $c=\hbar=1$ とします。[global計量](../HOLO2/index.md#prop-holo2-global-boundary)に用いた無次元時刻を $t\in\mathbb R$、動径を $0\le\rho<\pi/2$、角を $\theta\in\mathbb R/(2\pi\mathbb Z)$ として

$$
ds^2=\frac{L^2}{\cos^2\rho}
\left(-dt^2+d\rho^2+\sin^2\rho\,d\theta^2\right).
$$

質量 $m=0$ の実スカラー $\phi$ に、固定背景上の線形方程式 $\Box_g\phi=0$ を課します。境界では非正規化可能な源を零とする反射型（標準Dirichlet）条件を選び、中心で正則な解だけを扱います。まず有限個の正規化可能なモードの線形結合を考えます。この場合、以下のFourier積分はすべて通常の有限和として厳密です。無限和では収束条件と演算子の分布的意味を別に述べます。重力の逆反作用、場の相互作用、有限 $N$ の演算子等式は仮定しません。

$AdS_3$ の境界の空間断面は円 $S^1$ です。全時刻 $t\in\mathbb R$ を用いますが、**この質量零の自由模型の正規モードの周波数だけは整数**となるため、Fourier係数を求める積分に便宜上長さ $2\pi$ の時間区間を使えます。時空そのものの時間を同一視したわけではありません。

## 1. 波動方程式を空間と時間のモードに分ける

境界に沿う角依存を $e^{i\ell\theta}$（$\ell\in\mathbb Z$）、時間依存を $e^{-i\omega t}$（$\omega>0$）とし、

$$
\phi_{\omega\ell}(t,\rho,\theta)
=e^{-i\omega t+i\ell\theta}f_{\omega\ell}(\rho)
$$

と置きます。$\ell$ は円周方向のFourier番号、$\omega$ は無次元のglobal周波数です。実場はこれらのモードと複素共役を組み合わせます。計量の成分から

$$
\sqrt{|g|}=\frac{L^3\sin\rho}{\cos^3\rho},\quad
g^{tt}=-\frac{\cos^2\rho}{L^2},\quad
g^{\rho\rho}=\frac{\cos^2\rho}{L^2},\quad
g^{\theta\theta}=\frac{\cos^2\rho}{L^2\sin^2\rho}.
$$

したがって $\Box_g\phi=|g|^{-1/2}\partial_\mu(\sqrt{|g|}g^{\mu\nu}\partial_\nu\phi)$ に代入すると

$$
\Box_g\phi=\frac{\cos^2\rho}{L^2}
\left[-\partial_t^2\phi
+\frac1{\tan\rho}\partial_\rho(\tan\rho\,\partial_\rho\phi)
+\frac1{\sin^2\rho}\partial_\theta^2\phi\right].
$$

$\partial_t^2e^{-i\omega t}=-\omega^2e^{-i\omega t}$、$\partial_\theta^2e^{i\ell\theta}=-\ell^2e^{i\ell\theta}$ を用い、零でない共通因子を除けば、径方向の常微分方程式は

$$
\boxed{f''+\frac{f'}{\sin\rho\cos\rho}
+\left(\omega^2-\frac{\ell^2}{\sin^2\rho}\right)f=0.}
$$

ここでプライムは $\rho$ 微分です。中心 $\rho=0$ では $\sin\rho\sim\rho$ のため、有限エネルギーで正則な解は $|\ell|=k$ とおくと $f\sim\rho^k$ となります。境界 $\rho\to\pi/2$ では、[HOLO8の質量・次元関係](../HOLO8/index.md#prop-holo8-mass-dimension)を $d=2,m=0$ に適用すると $\Delta(\Delta-2)=0$ です。標準量子化の正規化可能な枝は $\Delta=2$ で、$f=O(\cos^2\rho)$ を選びます。零冪の枝はここでは源として除外します。

## 2. globalモードの具体式を導く

径方向の境界条件に合わせ、$u=\sin^2\rho$（$0\le u<1$）、$k=|\ell|$ として

$$
f(\rho)=u^{k/2}(1-u)h(u)
=(\sin\rho)^k(\cos\rho)^2h(\sin^2\rho)
$$

を試みます。最初の因子は中心正則性、二つ目は境界での $\cos^2\rho$ の減衰を担います。連鎖律 $du/d\rho=2\sin\rho\cos\rho$ と $d^2u/d\rho^2=2(1-2u)$ を使い、前節の方程式へ代入して因子 $u^{k/2}(1-u)$ を除くと

$$
u(1-u)h''+\{k+1-(k+3)u\}h'
+\frac{\omega^2-(k+2)^2}{4}h=0.
$$

この節のプライムは $u$ 微分です。中心で正則な解のうち多項式で閉じるものを求め、$h(u)=\sum_{j=0}^{n}c_ju^j$、$c_0=1$ とします。$u^j$ の係数比較から

$$
(j+1)(j+k+1)c_{j+1}
+\left[\frac{\omega^2-(k+2)^2}{4}-j(j+k+2)\right]c_j=0.
$$

最高次数 $j=n$ では $c_{n+1}=0$ なので $\omega^2-(k+2)^2=4n(n+k+2)$、正の周波数は $\omega=k+2+2n$ です。その結果、

$$
c_{j+1}=\frac{(j-n)(j+n+k+2)}{(j+1)(j+k+1)}c_j
$$

となり、$n$ で級数が止まります。

<a id="def-holo26-global-normal-mode"></a>

<!-- formal-statement-start -->
> **定義（global正規化可能モード）**  
> 質量零の自由スカラー場を持つ上記の純global $AdS_3$ で、整数 $n\ge0$、$\ell\in\mathbb Z$、$k=|\ell|$ に対して、$h_{n k}(u)=\sum_{j=0}^nc_ju^j$、$c_0=1$、

$$
c_{j+1}=\frac{(j-n)(j+n+k+2)}{(j+1)(j+k+1)}c_j
$$

> と定める。径方向関数 $f_{n\ell}=(\sin\rho)^k(\cos\rho)^2h_{nk}(\sin^2\rho)$、周波数 $\omega_{n\ell}=2+k+2n$ を用いた $e^{-i\omega_{n\ell}t+i\ell\theta}f_{n\ell}(\rho)$ を、本講のglobal正規化可能モードと呼ぶ。正規化は中心側の多項式係数 $c_0=1$ で固定し、Klein–Gordon内積による単位ノルムは要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo26-global-normal-mode -->
**定義の確認**。 $n=0,\ell=0$ なら $h_{00}=1$、$f_{00}=\cos^2\rho$、$\omega_{00}=2$ です。中心では $f_{00}(0)=1$ と有限で、境界では $f_{00}/\cos^2\rho=1$ です。径方程式にも、$\tan\rho\,f'_{00}=-2\sin^2\rho$ から $(\tan\rho)^{-1}(\tan\rho f'_{00})'=-4\cos^2\rho$ を得て、$\omega^2f_{00}=4\cos^2\rho$ と打ち消すので確かに解です。
<!-- definition-example-end -->

<a id="prop-holo26-mode-spectrum"></a>

<!-- formal-statement-start -->
> **命題（正則な多項式モードのスペクトル）**  
> 前述の質量零・標準Dirichlet境界条件を持つ純global $AdS_3$ について、任意の $n\ge0,\ell\in\mathbb Z$ に対する上のモードは、中心で正則、境界で $O(\cos^2\rho)$ であり、$\Box_g\phi=0$ を満たす。境界係数 $b_{n\ell}$ を

$$
b_{n\ell}:=\lim_{\rho\to\pi/2}
\frac{f_{n\ell}(\rho)}{\cos^2\rho}
$$

> と定めると、

$$
\boxed{b_{n\ell}=(-1)^n\frac{(n+1)!}{(k+1)(k+2)\cdots(k+n)}\ne0}
$$

> である。$n=0$ の空積は $1$ とする。
<!-- formal-statement-end -->

**証明の見取り図：** 方程式への代入は係数漸化式に還元されています。残る核心は境界で多項式が零にならないことです。積の式からすべてのモードが境界で識別できると分かります。

<!-- proof-start -->
### 証明

$u\to0$ で $h_{nk}(u)\to1$ だから $f_{n\ell}\sim\rho^k$ となり中心で正則です。$u\to1$ では多項式 $h_{nk}(1)$ が有限で、$f_{n\ell}$ は $(1-u)=\cos^2\rho$ を因子に持ちます。係数漸化式は直前に径方程式から導出したもので、各次数の係数が零になるため波動方程式を満たします。

境界値を計算するには有限多項式をGaussの超幾何多項式

$$
h_{nk}(u)={}_2F_1(-n,n+k+2;k+1;u)
$$

と書けます。ここで $(a)_j=a(a+1)\cdots(a+j-1)$ とすると、$u^j$ の係数は $(-n)_j(n+k+2)_j/((k+1)_j j!)$ であり、隣接係数比は定義の漸化式と一致します。有限和のChu–Vandermonde恒等式

$$
{}_2F_1(-n,b;c;1)=\frac{(c-b)_n}{(c)_n}
$$

を $b=n+k+2,c=k+1$ に使うと

$$
h_{nk}(1)=\frac{(-n-1)_n}{(k+1)_n}
=\frac{(-1)^n(n+1)!}{(k+1)_n}.
$$

分母は正整数の積で零でないため $b_{n\ell}\ne0$ です。この有限和の恒等式も直接証明します。$n\ge0$ に対して

$$
S_n(b,c):=\sum_{j=0}^n
(-1)^j\frac{n!}{j!(n-j)!}\frac{(b)_j}{(c)_j}
$$

と置きます。係数の基本恒等式は $1\le j\le n-1$ で

$$
\frac{n!}{j!(n-j)!}
=\frac{(n-1)!}{j!(n-1-j)!}
+\frac{(n-1)!}{(j-1)!(n-j)!}
$$

です。右辺を共通分母で通分すると分子は $(n-1)![(n-j)+j]=n!$ となります。$j=0,n$ の端も各一項だけで扱えば、和を分割して

$$
S_n(b,c)=S_{n-1}(b,c)-\frac bc S_{n-1}(b+1,c+1)
$$

が得られます。$n=0$ なら $S_0=1=(c-b)_0/(c)_0$ です。$n-1$ に対する式を仮定すると

$$
S_n(b,c)=\frac{(c-b)_{n-1}}{(c)_{n-1}}
-\frac bc\frac{(c-b)_{n-1}}{(c+1)_{n-1}}
=\frac{(c-b)_{n-1}(c+n-1-b)}{(c)_n}
=\frac{(c-b)_n}{(c)_n}.
$$

これで数学的帰納法が閉じます。ここでは $c=k+1>0$ で分母は消えず、無限級数の解析接続も不要です。
<!-- proof-end -->

例えば $n=1,\ell=0$ なら漸化式は $c_1=-3$ を与え、

$$
f_{10}=(\cos\rho)^2(1-3\sin^2\rho),\quad
\omega_{10}=4,\quad b_{10}=1-3=-2.
$$

$-2$ という符号を落とすと、後の再構成でこのモードが逆符号になります。$n=0,\ell=1$ では $f_{01}=\sin\rho\cos^2\rho$、$\omega_{01}=3$、$b_{01}=1$ です。

## 3. 境界に何を測れば各モードが分かるか

[正規化可能な境界枝](../HOLO8/index.md#def-holo8-quantization-choices)は境界で場そのものが零になる一方、その先頭の減衰係数は零とは限りません。源が零の解では、この係数を境界の演算子に対応させるのが標準的なextrapolate辞書です。本節ではまず古典的な関数として定義し、量子化については後で条件付きに述べます。

<a id="def-holo26-extrapolate-data"></a>

<!-- formal-statement-start -->
> **定義（正規化可能な境界データ）**  
> 純global $AdS_3$ の質量零・源零の有限モード和 $\phi$ について、境界の時刻 $t$ と角 $\theta$ におけるデータを

$$
\mathcal O(t,\theta):=
\lim_{\rho\to\pi/2}(\cos\rho)^{-2}\phi(t,\rho,\theta)
$$

> と定める。本講の $\mathcal O$ は境界係数であり、作用素として読む場合には自由場の量子化と辞書の仮定を追加する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo26-extrapolate-data -->
**定義の確認**。 実場 $\phi=3\cos^2\rho\cos(2t)$ では $\mathcal O=3\cos(2t)$ です。$\rho\to\pi/2$ で $\phi\to0$ でも $(\cos\rho)^{-2}\phi$ は有限な $3\cos(2t)$ に近づきます。時間・角度の関数として存在し、源零の条件も満たすため、この定義の非自明な条件が実際に確認できます。
<!-- definition-example-end -->

有限モード和を、複素係数 $a_{n\ell}$ を使って

$$
\phi(t,\rho,\theta)
=\sum_{n,\ell}^{\rm finite}
f_{n\ell}(\rho)
\left(a_{n\ell}e^{-i\omega_{n\ell}t+i\ell\theta}
+\overline{a_{n\ell}}e^{i\omega_{n\ell}t-i\ell\theta}\right)
$$

と書きます。正の周波数をもつ第一項と複素共役を対にしたので実場です。境界極限は有限和と交換でき、[境界係数の命題](#prop-holo26-mode-spectrum)から

$$
\mathcal O(t,\theta)
=\sum_{n,\ell}^{\rm finite}b_{n\ell}
\left(a_{n\ell}e^{-i\omega_{n\ell}t+i\ell\theta}
+\overline{a_{n\ell}}e^{i\omega_{n\ell}t-i\ell\theta}\right).
$$

時間・角度の完全な波形が分かれば、正の周波数成分と角度成分を選び出せます。時間区間 $[0,2\pi]$ での積分を行うのは、この模型のすべての $\omega_{n\ell}$ が正整数だからです。

<a id="prop-holo26-boundary-fourier-inversion"></a>

<!-- formal-statement-start -->
> **命題（境界Fourier係数によるモードの復元）**  
> 上記の純global $AdS_3$、質量零・源零の有限モード和について、$\omega_{n\ell}=2+|\ell|+2n$、$b_{n\ell}\ne0$ とする。境界データ $\mathcal O$ の係数

$$
\mathcal O_{n\ell}:=\frac1{(2\pi)^2}
\int_0^{2\pi}\!dt'\int_0^{2\pi}\!d\theta'\,
e^{i\omega_{n\ell}t'-i\ell\theta'}\mathcal O(t',\theta')
$$

> は $\mathcal O_{n\ell}=b_{n\ell}a_{n\ell}$ となる。したがって $a_{n\ell}=\mathcal O_{n\ell}/b_{n\ell}$ と一意に取り出せる。
<!-- formal-statement-end -->

**証明の見取り図：** 時刻の積分は周波数、角度の積分は角番号の一致だけを残します。正負周波数を混同しないことが鍵です。

<!-- proof-start -->
### 証明

任意の整数 $p$ について、$p=0$ なら $\int_0^{2\pi}e^{ipt'}dt'=2\pi$、$p\ne0$ なら原始関数 $(e^{ipt'}/ip)$ の両端の差が零です。したがって

$$
\frac1{2\pi}\int_0^{2\pi}e^{ipt'}dt'=
\begin{cases}1&(p=0),\\0&(p\ne0).\end{cases}
$$

境界和の正周波数側 $e^{-i\omega_{mr}t'+ir\theta'}$ にFourier因子を掛けると、時間差 $\omega_{n\ell}-\omega_{mr}$ と角差 $r-\ell$ がともに零の場合だけ残ります。$\ell=r$ なら $\omega_{n\ell}=\omega_{m\ell}$ は $2n=2m$、すなわち $n=m$ を意味します。

負周波数側の複素共役成分との時間差は $\omega_{n\ell}+\omega_{mr}>0$ なので、たとえ角積分が一致しても消えます。従って唯一残る項は $b_{n\ell}a_{n\ell}$ であり、[非零の境界係数](#prop-holo26-mode-spectrum)で割れます。
<!-- proof-end -->

## 4. HKLL型smearing核を作る

境界の波形を**一つの内部点の場の値へ写す積分核**をsmearing kernel（積分再構成核）と呼びます。上で得た係数を内部のモード展開へ戻し、その係数積分を先にまとめると核が生じます。ここでは有限モード集合 $F\subset\{(n,\ell):n\ge0,\ell\in\mathbb Z\}$ を固定し、$F$ に含まれるモードの和だけを取ります。

<a id="def-holo26-smearing-kernel"></a>

<!-- formal-statement-start -->
> **定義（global有限モードHKLL型核）**  
> 上記の質量零・標準Dirichlet条件を持つ純global $AdS_3$、有限集合 $F$ に対して、内部点 $X=(t,\rho,\theta)$ と境界点 $y=(t',\theta')$ の再構成核を

$$
K_F(X;y):=2\sum_{(n,\ell)\in F}
\frac{f_{n\ell}(\rho)}{b_{n\ell}}
\cos\!\left[\omega_{n\ell}(t-t')-\ell(\theta-\theta')\right]
$$

> と定める。これは固定された境界条件とモード選択に依存する実核であり、特定の因果的な支持域を定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo26-smearing-kernel -->
**定義の確認**。 $F=\{(0,0)\}$ では $f_{00}=\cos^2\rho$、$b_{00}=1$ なので $K_F=2\cos^2\rho\cos[2(t-t')]$ です。これは実数値の滑らかな核で、$2\pi$ 周期の時間積分が定義できます。境界波形 $\mathcal O(t',\theta')=3\cos2t'$ を入れると、角積分が $2\pi$、時間積分の $\cos[2(t-t')]\cos2t'$ の平均が $\tfrac12\cos2t$ なので、$3\cos^2\rho\cos2t$ を再現します。
<!-- definition-example-end -->

<a id="thm-holo26-finite-hkll"></a>

<!-- formal-statement-start -->
> **定理（有限モードでのHKLL型再構成）**  
> 質量零の純global $AdS_3$、前述の反射型境界条件、有限モード集合 $F$ を固定する。$\phi$ が $F$ の正周波数モードとその複素共役の実線形結合なら、任意の内部点 $X=(t,\rho,\theta)$ で、境界データ $\mathcal O$ から

$$
\boxed{\phi(X)=\frac1{(2\pi)^2}
\int_0^{2\pi}\!dt'\int_0^{2\pi}\!d\theta'\,
K_F(X;t',\theta')\mathcal O(t',\theta')}
$$

> が厳密に成り立つ。これは**固定背景の自由場の有限モード空間**での等式である。
<!-- formal-statement-end -->

**証明の見取り図：** 核の余弦を二つの複素指数関数に展開すれば、[境界Fourier逆変換](#prop-holo26-boundary-fourier-inversion)がそのまま現れます。核に係数 $2$ が必要な理由もここで確認します。

<!-- proof-start -->
### 証明

余弦の展開 $2\cos q=e^{iq}+e^{-iq}$ を用いると

$$
K_F(X;y)=\sum_{(n,\ell)\in F}\frac{f_{n\ell}(\rho)}{b_{n\ell}}
\left[e^{-i\omega_{n\ell}(t-t')+i\ell(\theta-\theta')}
+e^{i\omega_{n\ell}(t-t')-i\ell(\theta-\theta')}\right].
$$

第一項を境界データに掛けて積分すると、$e^{-i\omega t+i\ell\theta}$ を外へ出せるので、

$$
\frac1{(2\pi)^2}\int dt'\,d\theta'\,
e^{-i\omega t+i\ell\theta}
e^{i\omega t'-i\ell\theta'}\mathcal O(t',\theta')
=e^{-i\omega t+i\ell\theta}\mathcal O_{n\ell}
$$

です（積分区間は定理のもの）。第二項からはその複素共役が出ます。よって全体は

$$
\sum_{(n,\ell)\in F}\frac{f_{n\ell}(\rho)}{b_{n\ell}}
\left[e^{-i\omega_{n\ell}t+i\ell\theta}\mathcal O_{n\ell}
+e^{i\omega_{n\ell}t-i\ell\theta}\overline{\mathcal O_{n\ell}}\right].
$$

$\mathcal O_{n\ell}=b_{n\ell}a_{n\ell}$ かつ $b_{n\ell}$ は実数なので、これは第3節の $\phi(X)$ に一致します。有限和であるため、和・積分・境界極限の交換には追加の収束仮定を要しません。
<!-- proof-end -->

### モードが無限にあるとき

$s=n+|\ell|$ として $e^{-\varepsilon s}$（$\varepsilon>0$）を各項に掛ければ、収束を調整した核 $K_\varepsilon$ を考えられます。各内部点で $\sum_{n,\ell}|a_{n\ell}f_{n\ell}(\rho)|<\infty$ が成立し、境界Fourier係数を定義できるだけの正則性があれば、係数ごとの操作の後に $\varepsilon\downarrow0$ とする際の極限は絶対収束和の支配収束で正当化できます。より一般の量子場では、この核は試験関数に作用する**分布**として解釈し、任意の時空点の非有界作用素をそのまま通常関数のように積分しません。

| 入力 | 取り出すもの | 計算で保証した範囲 |
| --- | --- | --- |
| 境界の $\mathcal O(t,\theta)$ | Fourier係数 $\mathcal O_{n\ell}$ | 源零で正規化可能、全境界・必要な時間波形 |
| $\mathcal O_{n\ell}$ と $b_{n\ell}$ | バルク係数 $a_{n\ell}$ | $b_{n\ell}\ne0$、固定した自由場方程式 |
| 各 $a_{n\ell}$ と $f_{n\ell}$ | 内部の $\phi(X)$ | 有限モードでは厳密、無限モードは収束を別途確認 |

この核は全周の境界と長さ $2\pi$ の時間データを使っています。**ある境界部分領域 $A$ のみで復号できることは、この計算からは従いません。** また、再構成核の表現にはモード和の零になる関数を加える自由度があり、一意の局所的支持域を主張していません。

## 5. 再構成できることと、局所作用素が厳密に存在すること

自由場を正準量子化する場合、正のノルムで規格化したモード $\widehat u_{n\ell}$ を使い

$$
\widehat\phi(X)=\sum_{n,\ell}
\left(\widehat a_{n\ell}\widehat u_{n\ell}(X)
+\widehat a_{n\ell}^{\dagger}\overline{\widehat u_{n\ell}(X)}\right)
$$

と展開します。$\widehat a,\widehat a^\dagger$ はそれぞれ消滅・生成作用素で、交換関係は選んだKlein–Gordon内積によるモード規格化で固定します。本講の $f_{n\ell}$ はその規格化を選んでいないため、上式の $\widehat u_{n\ell}$ との係数は一致するとは限りません。しかし**境界極限と内部展開で同じ規格化**を用いるなら、モードごとの比 $f_{n\ell}/b_{n\ell}$ は変わらず、有限モードでの再構成の代数は演算子にも適用できます。

固定背景・摂動的な大 $N$ のコード部分空間において、適切な単一トレースの境界演算子を $\mathcal O$ に対応させる、という辞書を追加した場合に初めて、上の積分を境界理論によるバルク場の近似表示として読めます。[HOLO6の半古典極限の条件](../HOLO6/index.md#def-holo6-controlled-window)に照らして、相互作用・重力のdressing・有限 $N$ の補正を除外していません。局所バルク場そのものは重力のゲージ不変観測量ではなく、重力結合系での「位置」を固定するには関係的な指定が必要です。

### 反例：一時刻の境界値だけでは足りない

$n=0,1$ の角依存しないモードを用い、

$$
\phi(t,\rho)=f_{00}(\rho)\cos2t
+\tfrac12 f_{10}(\rho)\cos4t
$$

とします。[境界係数](#prop-holo26-mode-spectrum)は $b_{00}=1,b_{10}=-2$ なので、境界データは

$$
\mathcal O(t)=\cos2t-\cos4t,\qquad \mathcal O(0)=0
$$

です。しかし内部では

$$
\phi(0,\rho)=f_{00}(\rho)+\tfrac12 f_{10}(\rho)
=\cos^2\rho\left(\tfrac32-\tfrac32\sin^2\rho\right)
=\tfrac32\cos^4\rho
$$

となり、$0\le\rho<\pi/2$ で零ではありません。**時間波形を欠いている**ために周波数を分離する証明が壊れたのであって、境界データを完全に知っても再構成できない、という反例ではありません。

この章で示したのは全境界の**線形global再構成**です。[HOLO25のentanglement wedge](../HOLO25/index.md#def-holo25-entanglement-wedge)を任意の境界部分領域から再構成できるという命題には、これと別に領域・状態・コード部分空間・復号の仮定が要ります。次のHOLO27でその問題に入ります。

## 6. 演習と詳細解答

各問は断りがなければ本講の純global $AdS_3$、$m=0$、標準Dirichlet条件、$k=|\ell|$、$u=\sin^2\rho$ を使います。正の周波数は $\omega_{n\ell}=2+k+2n$、径方向の多項式係数は第2節の漸化式で定めます。

### Level A：モードと境界極限を計算する

<a id="ex-holo26-a01"></a>
### 演習 HOLO26-A01：波動作用素の成分
- Level: A

計量 $ds^2=L^2\cos^{-2}\rho(-dt^2+d\rho^2+\sin^2\rho\,d\theta^2)$ を用い、$\sqrt{|g|}g^{\rho\rho}$ を求めて径方向の項が $(\cos^2\rho/L^2)(\tan\rho)^{-1}\partial_\rho(\tan\rho\,\partial_\rho\phi)$ となることを示せ。

<!-- solution-start -->
**詳細解答。** 行列式の絶対値は $L^6\sin^2\rho/\cos^6\rho$ なので $\sqrt{|g|}=L^3\sin\rho/\cos^3\rho$。さらに $g^{\rho\rho}=\cos^2\rho/L^2$ だから $\sqrt{|g|}g^{\rho\rho}=L\tan\rho$ です。これを $\Box_g$ の径方向項へ代入すると

$$
\frac1{\sqrt{|g|}}\partial_\rho(\sqrt{|g|}g^{\rho\rho}\partial_\rho\phi)
=\frac{\cos^3\rho}{L^3\sin\rho}\partial_\rho(L\tan\rho\,\partial_\rho\phi)
=\frac{\cos^2\rho}{L^2\tan\rho}\partial_\rho(\tan\rho\,\partial_\rho\phi).
$$

正の共形因子を除けば第1節と一致します。
<!-- solution-end -->

<a id="ex-holo26-a02"></a>
### 演習 HOLO26-A02：境界指数の選択
- Level: A

$AdS_3$ で $d=2,m=0$ とする。質量・次元関係 $\Delta(\Delta-d)=m^2L^2$ を解き、標準量子化・源零の径モードがどの冪で減衰するか答えよ。

<!-- solution-start -->
**詳細解答。** [質量・次元関係](../HOLO8/index.md#prop-holo8-mass-dimension)へ $d=2,m=0$ を代入して $\Delta(\Delta-2)=0$、解は $\Delta_-=0,\Delta_+=2$ です。標準量子化で源零なら非正規化可能な零冪の係数を零とし、速い枝の $\Delta_+=2$ を選びます。global境界の定義関数 $\cos\rho\to0$ に関して、$f=O(\cos^2\rho)$ が必要です。
<!-- solution-end -->

<a id="ex-holo26-a03"></a>
### 演習 HOLO26-A03：最小モード
- Level: A

$f_{00}=\cos^2\rho$ とする。$\ell=0,\omega=2$ の径方程式を直接満たすことと、$b_{00}=1$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $f'=-2\sin\rho\cos\rho$、$f''=-2(\cos^2\rho-\sin^2\rho)$ だから

$$
f''+\frac{f'}{\sin\rho\cos\rho}+4f
=-2(\cos^2\rho-\sin^2\rho)-2+4\cos^2\rho
=2(\sin^2\rho+\cos^2\rho)-2=0.
$$

また $f/\cos^2\rho=1$ が恒等的に成立するため $b_{00}=1$ です。
<!-- solution-end -->

<a id="ex-holo26-a04"></a>
### 演習 HOLO26-A04：次の径モードの符号
- Level: A

$\ell=0,n=1$ の多項式 $h_{10}(u)$、周波数、境界係数を漸化式から求めよ。なぜ $b_{10}$ の符号が重要か述べよ。

<!-- solution-start -->
**詳細解答。** $c_0=1$、$j=0$ で $c_1=(0-1)(0+1+0+2)/((0+1)(0+0+1))=-3$。従って $h_{10}=1-3u$、$\omega_{10}=2+0+2=4$ です。境界 $u\to1$ で $b_{10}=1-3=-2$。逆変換は $a_{10}=\mathcal O_{10}/b_{10}=-\mathcal O_{10}/2$ を用いるため、符号を誤ると再構成されるこのモードの位相が反転します。
<!-- solution-end -->

<a id="ex-holo26-a05"></a>
### 演習 HOLO26-A05：角度を持つモード
- Level: A

$n=0,\ell=1$ に対して $f_{01}$、$\omega_{01}$、$b_{01}$ を求め、中心正則性を確かめよ。

<!-- solution-start -->
**詳細解答。** $k=1,n=0$ では $h_{01}=1$、従って $f_{01}=\sin\rho\cos^2\rho$、$\omega_{01}=2+1=3$ です。$f_{01}/\cos^2\rho=\sin\rho\to1$ なので $b_{01}=1$。中心では $\sin\rho=\rho+O(\rho^3)$、$\cos^2\rho=1+O(\rho^2)$ より $f_{01}=\rho+O(\rho^3)$。角因子 $e^{i\theta}$ と組み合わせると局所Cartesian座標 $x=\rho\cos\theta,y=\rho\sin\theta$ で $f_{01}e^{i\theta}=x+iy+O(\rho^3)$ となり、角座標の特異性は実際の場の特異性ではありません。
<!-- solution-end -->

### Level B：係数の抽出と成立条件

<a id="ex-holo26-b01"></a>
### 演習 HOLO26-B01：二次多項式と非零境界係数
- Level: B

$n=2,\ell=0$ について $h_{20}(u)=1+c_1u+c_2u^2$ を漸化式から求め、$h_{20}(1)$ が第2節の積公式と一致することを示せ。

<!-- solution-start -->
**詳細解答。** $j=0$ の式から $c_1=(-2)(4)/(1\cdot1)=-8$ です。次に $j=1$ では $c_2/c_1=(1-2)(1+2+0+2)/((2)(2))=-5/4$、従って $c_2=(-8)(-5/4)=10$ となります。よって $h_{20}=1-8u+10u^2$、$h_{20}(1)=1-8+10=3$。積公式でも $(-1)^2(2+1)!/(1\cdot2)=6/2=3$ で一致し、境界係数は非零です。
<!-- solution-end -->

<a id="ex-holo26-b02"></a>
### 演習 HOLO26-B02：異なる角番号を分離する
- Level: B

有限実場

$$
\phi=3f_{00}(\rho)\cos2t+2f_{01}(\rho)\cos(3t-\theta)
$$

について境界データ $\mathcal O$ を計算せよ。さらに境界Fourier係数 $\mathcal O_{00}$ と $\mathcal O_{01}$ を求め、これらから元の場を再構成せよ。

<!-- solution-start -->
**詳細解答。** 両方とも境界係数は $1$ なので $\mathcal O=3\cos2t+2\cos(3t-\theta)$。余弦を指数関数で書くと

$$
\mathcal O=\tfrac32(e^{2it}+e^{-2it})
+(e^{i(3t-\theta)}+e^{-i(3t-\theta)}).
$$

[Fourier逆変換の命題](#prop-holo26-boundary-fourier-inversion)で、$\mathcal O_{00}$ は $e^{-2it}$ の係数 $3/2$、$\mathcal O_{01}$ は $e^{-3it+i\theta}$ の係数 $1$ です。他の正周波数の番号は零です。$b_{00}=b_{01}=1$ で割ると $a_{00}=3/2,a_{01}=1$。モードと共役を足して $3f_{00}\cos2t+2f_{01}\cos(3t-\theta)$ を得ます。
<!-- solution-end -->

<a id="ex-holo26-b03"></a>
### 演習 HOLO26-B03：同一時刻の境界値が消えても内部は零とは限らない
- Level: B

$\phi=f_{00}\cos2t+\tfrac12 f_{10}\cos4t$ について、$t=0$ での境界係数と内部の値を計算せよ。第3節のFourier逆変換のどの仮定が、一時刻だけの情報では満たされないか述べよ。

<!-- solution-start -->
**詳細解答。** $b_{00}=1,b_{10}=-2$ だから $\mathcal O(t)=\cos2t-\cos4t$、$\mathcal O(0)=1-1=0$。しかし

$$
\phi(0,\rho)=\cos^2\rho+\tfrac12\cos^2\rho(1-3\sin^2\rho)
=\tfrac32\cos^2\rho(1-\sin^2\rho)=\tfrac32\cos^4\rho.
$$

内部では正の値です。逆変換は時間区間 $0\le t'<2\pi$ 上で $\mathcal O(t',\theta')$ を積分し、異なる整数周波数を直交性で分けます。一時刻の値にはこの時間直交性を適用できず、二モードの係数を区別できません。
<!-- solution-end -->

<a id="ex-holo26-b04"></a>
### 演習 HOLO26-B04：無限モードへ進むときの極限
- Level: B

$|\ell|\le M$ の各角番号で無限個の $n$ がある実場を考え、内部点 $X$ について $\sum_{\ell=-M}^{M}\sum_{n\ge0}|a_{n\ell}f_{n\ell}(\rho)|<\infty$ とする。各モードに $e^{-\varepsilon n}$ を掛けた再構成値が $\varepsilon\downarrow0$ で $\phi(X)$ に収束することを示せ。ただし各 $\varepsilon>0$ で境界Fourier展開と積分が正当化できる正則性を仮定する。

<!-- solution-start -->
**詳細解答。** 有限和で証明した [HKLL型再構成定理](#thm-holo26-finite-hkll)を各Fourier係数に用いると、調整後の値は

$$
\phi_\varepsilon(X)=
\sum_{\ell=-M}^{M}\sum_{n\ge0}
e^{-\varepsilon n}f_{n\ell}(\rho)
\left(a_{n\ell}e^{-i\omega_{n\ell}t+i\ell\theta}
+\overline{a_{n\ell}}e^{i\omega_{n\ell}t-i\ell\theta}\right).
$$

固定した $(n,\ell)$ について $e^{-\varepsilon n}\to1$、また $0<e^{-\varepsilon n}\le1$ です。各項の絶対値は高々 $2|a_{n\ell}f_{n\ell}(\rho)|$ で、その総和は仮定により有限です。従って級数の支配収束が使え、極限は元のモード和 $\phi(X)$ となります。収束仮定を外して同じ操作をすることは許されません。
<!-- solution-end -->

### Level C：境界の全波形から内部点を復元する

<a id="ex-holo26-c01"></a>
### 演習 HOLO26-C01：三種類のモードの再構成
- Level: C

$F=\{(0,0),(1,0),(0,1)\}$ とし、正規化可能な自由場の境界データが

$$
\mathcal O(t,\theta)=2\cos2t-2\cos4t+3\cos(3t-\theta)
$$

で与えられるとする。

1. $F$ の各 $(n,\ell)$ について $\omega_{n\ell}$、$b_{n\ell}$ と境界Fourier係数 $\mathcal O_{n\ell}$ を求めよ。
2. 内部の $\phi(t,\rho,\theta)$ をHKLL型再構成で求めよ。
3. $t=0,\rho=\pi/4,\theta=0$ での値を計算し、同時刻・同角度での境界データの値と比較せよ。
4. この再構成が境界の任意の一部分からの復号、または有限 $N$ での厳密な局所重力演算子の構成を意味しない理由を述べよ。

<!-- solution-start -->
**詳細解答。**

(1) $n=0,\ell=0$ では $\omega_{00}=2$、$b_{00}=1$、$\mathcal O_{00}=1$。$n=1,\ell=0$ では $\omega_{10}=4$、$b_{10}=-2$、$\mathcal O_{10}=-1$。$n=0,\ell=1$ では $\omega_{01}=3$、$b_{01}=1$、$\mathcal O_{01}=3/2$。最後の係数は $3\cos(3t-\theta)=\tfrac32e^{-3it+i\theta}+\tfrac32e^{3it-i\theta}$ を用いました。各値は [境界Fourier逆変換](#prop-holo26-boundary-fourier-inversion)の積分でほかの周波数・角番号が零になることから従います。

(2) $a_{n\ell}=\mathcal O_{n\ell}/b_{n\ell}$ により

$$
a_{00}=1,\qquad a_{10}=\tfrac12,\qquad a_{01}=\tfrac32.
$$

[有限モード再構成定理](#thm-holo26-finite-hkll)で対応する正周波数とその共役を足すと

$$
\boxed{\phi=2f_{00}(\rho)\cos2t
+f_{10}(\rho)\cos4t
+3f_{01}(\rho)\cos(3t-\theta).}
$$

各径モードは $f_{00}=\cos^2\rho$、$f_{10}=\cos^2\rho(1-3\sin^2\rho)$、$f_{01}=\sin\rho\cos^2\rho$ です。

(3) $\rho=\pi/4$ では $\sin^2\rho=\cos^2\rho=1/2$、$\sin\rho=1/\sqrt2$ なので

$$
f_{00}=\tfrac12,\quad
f_{10}=\tfrac12(1-\tfrac32)=-\tfrac14,\quad
f_{01}=\tfrac1{2\sqrt2}.
$$

$t=\theta=0$ では三つの余弦が $1$ だから

$$
\phi(0,\pi/4,0)=1-\tfrac14+\frac3{2\sqrt2}
=\boxed{\tfrac34+\frac3{2\sqrt2}}.
$$

一方、境界データの一時刻・一角度の値は $\mathcal O(0,0)=2-2+3=3$ です。これらは別の量であり、一点の境界値を内部値にそのままコピーする操作は再構成ではありません。

(4) 本計算は全境界円と長さ $2\pi$ の時間波形を用いており、境界領域 $A$ だけの作用素代数へ核を局在させる証明はありません。また自由場・固定背景という仮定の下での等式なので、相互作用、量子重力のゲージ不変な位置指定、有限 $N$ の補正を制御していません。従ってそのような強い結論には別の条件と証明が必要です。
<!-- solution-end -->

## 7. まとめと次講へ

境界の場の値そのものは零へ減衰しても、その**正規化した境界係数**には内部の各正規モードの情報が残ります。global波動方程式から整数周波数と非零の境界係数を求めたことで、境界Fourier変換→係数の除算→内部モード和という再構成を有限モードで完全に確かめました。smearing核はこの手順を積分としてまとめたものです。

この再構成は線形自由場・全境界での結果であり、「どの境界部分領域がどのバルク作用素を復号できるか」への答えではありません。次の **HOLO27 部分領域再構成**では、[HOLO25の幾何学的wedge](../HOLO25/index.md#def-holo25-entanglement-wedge)とコード部分空間の仮定を接続し、全境界のモード再構成との隔たりを調べます。

**参考資料（原論文と講義ノート）**：Hamilton–Kabat–Lifschytz–Lowe, [*Local bulk operators in AdS/CFT*](https://arxiv.org/abs/hep-th/0506118)；Harlow, [*TASI Lectures on the Emergence of the Bulk in AdS/CFT*](https://arxiv.org/abs/1802.01040)。本講の多項式モデルの係数と逆変換は本文で導出したものであり、資料の文章や図を転載していません。
