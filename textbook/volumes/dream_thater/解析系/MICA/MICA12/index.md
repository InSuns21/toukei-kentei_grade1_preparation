# MICA12 局所Hadamard parametrix

<!-- definition-example-audit: strict -->

[MICA11の二点分布](../MICA11/index.md#def-mica11-two-point)は、場の方程式・交換関係・正値性を別々の条件として記述しました。しかし、曲がった時空には一般に全時空共通の正周波数Fourier変換がありません。では、**どの状態を選んでも共通する短距離の特異性**を、幾何学だけからどう取り出せるのでしょうか。

手がかりは、[HPDE13で構成した世界関数](../../HPDE/HPDE13/index.md#def-hpde13-world-function)と[van Vleck因子](../../HPDE/HPDE13/index.md#def-hpde13-van-vleck)です。点源の遅延基本解では光円錐の面と内部を扱いました。ここでは**正の周波数を選ぶ境界値の処方**に切り替え、光円錐上の極と対数項を作ります。同じ「Hadamard係数」でも、遅延基本解のRiesz展開と二点分布の対数展開は係数の定義・符号が異なります。

結論への道筋は次の順です。

1. 二点間の局所幾何から特異項の分母と先頭係数を定める。
2. 平坦な質量零模型から、時間の向きと $8\pi^2$ の正規化を決める。
3. 作用素を掛け、極と対数の係数を打ち消す輸送方程式を導く。
4. 有限次数の式と、状態依存の滑らかな余りを区別する。

## 1. 二点間で使える幾何学を固定する

$(M,g)$ は滑らかで境界のない、時間向き付きの**4次元大域双曲Lorentz時空**とします。計量の符号は $(-,+,+,+)$、$\Box_g=g^{ab}\nabla_a\nabla_b$、質量 $m\ge0$ と曲率結合 $\xi\in\mathbb R$ を固定して

$$
P=-\Box_g+q,\qquad q=m^2+\xi R
$$

と置きます。$R$ はスカラー曲率、$q$ は実数値の滑らかなポテンシャルです。この作用素は[MICA11で固定したKlein–Gordon作用素](../MICA11/index.md#def-mica11-smeared-algebra)と同じです。以下、微分は特記しない限り第一変数 $x$ に作用し、$d\mu_g$ を使って分布核を解釈します。

[LORG5の測地的凸正規近傍](../../../幾何系/LORG/LORG5/index.md#def-lorg5-convex-normal) $C$ を一つ選び、$x,y\in C$ を結ぶ一意な測地線を $\gamma_{xy}(s)=\exp_y(sv)$（$0\le s\le1$、$x=\exp_yv$）とします。これは光が必ず $x$ から $y$ へ到達するという主張ではありません。この近傍の中で短い測地線が一意だという仮定です。

[Syngeの世界関数](../../HPDE/HPDE13/index.md#def-hpde13-world-function)とその放射ベクトル場は

$$
\sigma(x,y)=\frac12g_y(v,v),\qquad
D:=\sigma^{;a}(x,y)\nabla_a
$$

です。セミコロンは共変微分、添字 $a$ は第一変数の添字を表します。[世界関数のアイコナール恒等式](../../HPDE/HPDE13/index.md#lem-hpde13-eikonal)から

$$
\sigma^{;a}\sigma_{;a}=2\sigma,\qquad
(D f)(\gamma_{xy}(s),y)=s\frac{d}{ds}f(\gamma_{xy}(s),y)
$$

を得ます。二番目は滑らかな二点スカラー $f$ に対する式で、$y$ を固定して測地線に沿って微分しています。

さらに、[van Vleck–Morette因子とその輸送式](../../HPDE/HPDE13/index.md#lem-hpde13-van-vleck-transport)を使い

$$
U(x,y):=\Delta(x,y)^{1/2},\qquad
2DU+(\Box_x\sigma-4)U=0,\qquad U(y,y)=1
$$

と置きます。$U$ は局所幾何で決まり、状態によって選び直す関数ではありません。

### 直接例：平坦時空の分母と先頭係数

$g=-dt^2+d\boldsymbol x^2$ とすると、$z=x-y$、$\tau=t_x-t_y$、$\boldsymbol r=\boldsymbol x-\boldsymbol y$ に対し

$$
\sigma(x,y)=\frac12(-\tau^2+|\boldsymbol r|^2),\quad
D=\tau\partial_\tau+\sum_{j=1}^3 r^j\partial_{r^j},\quad
\Box_x\sigma=4.
$$

混合二階微分行列は $-\partial_x\partial_y\sigma=g$、体積密度の行列式は $|\det g|=1$ なので、[van Vleck–Morette因子](../../HPDE/HPDE13/index.md#def-hpde13-van-vleck)の定義から $\Delta=1$、$U=1$ です。従って $DU=0$ と $\Box\sigma-4=0$ の両方を確かめ、輸送式も満たします。$\sigma=0$ は光円錐であり、$\sigma$ の符号を「常に正の距離の二乗」として扱うのは誤りです。

## 2. 正周波数を $i0$ 境界値に移す

正周波数の意味を符号ごと確定するため、$C$ 上で未来に増加する滑らかな時間関数 $T$（勾配が時間的で、未来向き因果曲線上で増加）を選びます。$T(x)-T(y)$ は **二点の時間の順序**を指定します。時空全体の時間並進対称性は要求しません。

分布には点ごとの分母の零割りが許されないため、正の $\varepsilon$ を導入してから**分布として極限**を取ります。

<a id="def-mica12-positive-boundary"></a>
<!-- formal-statement-start -->
> **定義（正周波数境界値）**  
> $C$ を時間向き付き4次元Lorentz時空の測地的凸正規近傍、$\sigma$ をその世界関数、$T$ を未来へ増加する滑らかな時間関数とする。$\varepsilon>0$ に対して

$$
\sigma_\varepsilon(x,y)
=\sigma(x,y)+i\varepsilon\{T(x)-T(y)\}+\frac{\varepsilon^2}{2}
$$

> とする。分布極限が存在するとき

$$
\frac1{\sigma_+}
:=\lim_{\varepsilon\downarrow0}\frac1{\sigma_\varepsilon},
\qquad
\log\frac{\sigma_+}{\ell^2}
:=\lim_{\varepsilon\downarrow0}\log\frac{\sigma_\varepsilon}{\ell^2}
$$

> と書く。$\ell>0$ は長さの次元を持つ定数、対数の枝は負の実軸に沿って切る主枝とする。式は $C\times C$ 上の分布であり、$\sigma=0$ における通常関数の値を定めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica12-positive-boundary -->
### 定義の確認：未来向きの時間差はどちらに入るか

**定義の確認**。実部・虚部と指数の減衰の双方から正周波数境界値の条件を確かめます。

Minkowski時空で $T=t$ とすれば

$$
2\sigma_\varepsilon
=|\boldsymbol r|^2-(\tau-i\varepsilon)^2.
$$

展開すると右辺は $|\boldsymbol r|^2-\tau^2+2i\varepsilon\tau+\varepsilon^2$ ですから、定義の実部・虚部・正の微小項をすべて再現します。正周波数 $e^{-i\omega\tau}$ は $\tau\mapsto\tau-i\varepsilon$ で $e^{-\varepsilon\omega}$ に減衰します。**$\tau+i\varepsilon$ へ置換すると負周波数側**になり、同じ二点分布ではありません。
<!-- definition-example-end -->

正則化した式から分布極限を取るときは、先に $x=y$ や $\sigma=0$ を代入しません。一次元模型では

$$
\frac1{s+i0}=\operatorname{pv}\frac1s-i\pi\delta(s),
\qquad
\frac1{s-i0}=\operatorname{pv}\frac1s+i\pi\delta(s)
$$

であり、境界値の符号が分布の虚部を変えることは[MICA4の片側境界値計算](../MICA4/index.md#prop-mica4-sokhotski)にも現れます。ここでの $i0$ は $T(x)-T(y)$ の符号を伴うため、単なる一定符号の $s+i0$ を時空全域へ機械的に代入してはいけません。

<a id="prop-mica12-massless-boundary"></a>
<!-- formal-statement-start -->
> **命題（質量零Minkowski真空の正規化）**  
> 4次元Minkowski時空で $P=-\Box_g$、$T=t$ とする。[MICA11の正周波数二点分布](../MICA11/index.md#def-mica11-two-point)の質量零版

$$
W_0(\tau,\boldsymbol r)
=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3\,2|\boldsymbol p|}
e^{-i|\boldsymbol p|\tau+i\boldsymbol p\cdot\boldsymbol r}
$$

> は分布として

$$
W_0(x,y)=\frac{1}{8\pi^2}\frac1{\sigma_+(x,y)}
$$

> に等しい。ただし $\sigma_+$ は $T=t$ による上の正周波数境界値である。
<!-- formal-statement-end -->

### 証明の見取り図

Fourier積分の高周波を $e^{-\varepsilon|\boldsymbol p|}$ で減衰させると角度積分と一変数積分を順に実行できます。$\varepsilon\downarrow0$ の分布極限で、正規化だけでなく時間の符号を確認します。

<!-- proof-start -->
### 証明

$r=|\boldsymbol r|>0$、$\varepsilon>0$ とし、[正周波数表示](../MICA11/index.md#def-mica11-two-point)に $e^{-\varepsilon|\boldsymbol p|}$ を挿入します。$\boldsymbol r$ を極軸とする球座標で

$$
\int_{S^2}e^{ipr\cos\theta}\,d\Omega
=2\pi\int_{-1}^{1}e^{ipru}\,du
=4\pi\frac{\sin(pr)}{pr}.
$$

従って $p^2dp$ を含む体積要素と $2p$ の分母を約分すると

$$
\begin{aligned}
W_{0,\varepsilon}(\tau,r)
&=\frac1{4\pi^2r}\int_0^\infty
e^{-(\varepsilon+i\tau)p}\sin(pr)\,dp\\
&=\frac1{4\pi^2r}\frac{r}{(\varepsilon+i\tau)^2+r^2}\\
&=\frac1{4\pi^2\{r^2-(\tau-i\varepsilon)^2\}}
=\frac1{8\pi^2\sigma_\varepsilon}.
\end{aligned}
$$

第2等号では $\operatorname{Re}(\varepsilon+i\tau)>0$ なので、$\int_0^\infty e^{-ap}\sin(pr)\,dp=r/(a^2+r^2)$ を使えます。この式は $r=0$ にも連続延長できます。$\varepsilon$ を下げると、左辺は正周波数の緩増加分布へ、右辺は定義した境界値へ収束します。よって分布恒等式が成立します。$\square$
<!-- proof-end -->

この計算で得た $1/(8\pi^2)$ は、平坦時空での正周波数の正規化です。遅延Green関数の円錐上デルタの正規化をそのまま流用した数字ではありません。

## 3. 極と対数の係数はどう決まるか

一般の $q$ や曲率があると、先頭項 $U/\sigma_+$ だけでは場の波動方程式に必要な特異項を打ち消せません。そこで、特異性の弱い $\log\sigma_+$ に滑らかな係数を掛けます。$U$ は[HPDE13の輸送方程式](../../HPDE/HPDE13/index.md#lem-hpde13-van-vleck-transport)で既に決まっているので、新しく必要なのは対数係数です。

<a id="def-mica12-hadamard-coefficients"></a>
<!-- formal-statement-start -->
> **定義（局所Hadamard係数の形式漸近展開）**  
> $C$ を4次元Lorentz時空の測地的凸正規近傍とし、実スカラー作用素 $P_x=-\Box_x+q(x)$、世界関数 $\sigma$、$U=\Delta^{1/2}$ を固定する。対数項の滑らかな係数を形式的に

$$
V(x,y)\sim\sum_{n=0}^{\infty}v_n(x,y)\sigma(x,y)^n
$$

> と展開する。この $v_n\in C^\infty(C\times C)$ を、次の定理の輸送方程式で順に定まる**二点分布のHadamard係数**と呼ぶ。記号 $\sim$ は漸近展開であり、一般の滑らかな計量について級数の収束を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica12-hadamard-coefficients -->
### 定義の確認：何を「係数」と呼んでいるか

**定義の確認**。形式級数と収束級数を区別して係数が定義どおりかを確認します。

平坦な質量零模型では $U=1$、$P1=0$ です。このとき以下の輸送式から $v_0=0$、帰納的に $v_n=0$ が得られ、対数項は消えます。一方、$m>0$ の平坦模型では $v_0=m^2/2$ となります。いずれも**係数の列**についての主張であり、任意の無限和が収束するという意味ではありません。遅延基本解の[HPDE13のRiesz係数](../../HPDE/HPDE13/index.md#def-hpde13-hadamard-coefficients)と同じ $V_k$ を代入することもできません。
<!-- definition-example-end -->

<a id="thm-mica12-transport"></a>
<!-- formal-statement-start -->
> **定理（4次元対数係数の輸送方程式と一意な滑らかな解）**  
> $C$ を4次元の測地的凸正規近傍とする。$P=-\Box_g+q$ は実スカラー波動型作用素で、$q\in C^\infty(C;\mathbb R)$、$U=\Delta^{1/2}$、$D=\sigma^{;a}\nabla_a$ とする。極および対数の形式的な特異項を各次数で消す条件は

$$
2Dv_0+(\Box_x\sigma-2)v_0=P_xU,
$$

$$
2Dv_{n+1}+(\Box_x\sigma+2n)v_{n+1}
=\frac1{n+1}P_xv_n\qquad(n\ge0)
$$

> である。対角へ滑らかに延長する解は各次数で一意で、$\gamma(s)=\gamma_{xy}(s)$ とすると

$$
\begin{aligned}
v_0(x,y)
&=\frac{U(x,y)}2\int_0^1
\frac{(P_xU)(\gamma(s),y)}{U(\gamma(s),y)}\,ds,\\
v_{n+1}(x,y)
&=\frac{U(x,y)}{2(n+1)}
\int_0^1s^{n+1}
\frac{(P_xv_n)(\gamma(s),y)}{U(\gamma(s),y)}\,ds.
\end{aligned}
$$

> 特に $[v_0]=[P_xU]/2$、$[v_{n+1}]=[P_xv_n]/\{2(n+1)(n+2)\}$ である。角括弧 $[F]$ は $x=y$ での対角値を表す。
<!-- formal-statement-end -->

### 証明の見取り図

まず円錐外の $\sigma\ne0$ で $P$ を $U/\sigma$ と $v\log\sigma$ に作用させます。$1/\sigma^2$ の項は $U$ の輸送式で消え、$1/\sigma$ の項が $v_0$ を決めます。残る対数係数の各べき乗が $v_{n+1}$ を決めます。最後は $v_n=U w_n$ と置くと測地線上の一次常微分方程式になり、滑らかさが積分定数を固定します。

<!-- proof-start -->
### 証明

**1. 極と対数へ作用させる。** [世界関数のアイコナール恒等式](../../HPDE/HPDE13/index.md#lem-hpde13-eikonal)を、第一変数に関する連鎖律

$$
\Box_xF(\sigma)=2\sigma F''(\sigma)+(\Box_x\sigma)F'(\sigma)
$$

へ代入します。$P=-\Box+q$ のLeibniz則を使うと、$\sigma\ne0$ で

$$
P_x\left(\frac U\sigma\right)
=\frac{P_xU}{\sigma}
+\frac{2DU+(\Box_x\sigma-4)U}{\sigma^2},
$$

$$
P_x\left(v\log\frac{\sigma}{\ell^2}\right)
=(P_xv)\log\frac{\sigma}{\ell^2}
-\frac{2Dv+(\Box_x\sigma-2)v}{\sigma}.
$$

一番目の $1/\sigma^2$ は[van Vleck因子の輸送式](../../HPDE/HPDE13/index.md#lem-hpde13-van-vleck-transport)で零です。二番目の $v$ を $v_0+v_1\sigma+\cdots$ と置くと、$1/\sigma$ の係数は $P_xU-2Dv_0-(\Box_x\sigma-2)v_0$ であり、最初の方程式が得られます。

**2. 対数の係数を順に消す。** $n\ge1$ について積の微分を二回使えば

$$
P_x(v_n\sigma^n)
=(P_xv_n)\sigma^n
-n\{2Dv_n+(\Box_x\sigma+2n-2)v_n\}\sigma^{n-1}.
$$

従って $(P_xV)\log(\sigma/\ell^2)$ に現れる $\sigma^n\log\sigma$ の係数を零にする条件は

$$
P_xv_n-(n+1)
\{2Dv_{n+1}+(\Box_x\sigma+2n)v_{n+1}\}=0,
$$

すなわち定理の再帰です。これらはまず**形式的な特異係数の相殺**を示します。分布境界値としての正当化と滑らかな余りは、後節で有限次数・全次数を区別して扱います。

**3. 測地線の積分へ直す。** $U>0$ と $2DU+(\Box\sigma-4)U=0$ を使い、$w_n=v_n/U$ と置きます。$v_0$ の方程式は

$$
2D(Uw_0)+(\Box\sigma-2)Uw_0
=2U(Dw_0+w_0)=P_xU
$$

となるので $Dw_0+w_0=(P_xU)/(2U)$。$\gamma(s)$ 上では $D=s\,d/ds$ だから

$$
\frac d{ds}\{s w_0(\gamma(s),y)\}
=\frac{(P_xU)(\gamma(s),y)}{2U(\gamma(s),y)}.
$$

滑らかな $w_0$ なら $s w_0\to0$（$s\downarrow0$）です。$0$ から $1$ まで積分し、$v_0=Uw_0$ に戻すと最初の積分表示が従います。

同じ計算を $v_{n+1}=Uw_{n+1}$ に使うと

$$
s\frac d{ds}w_{n+1}+(n+2)w_{n+1}
=\frac{(P_xv_n)(\gamma(s),y)}{2(n+1)U(\gamma(s),y)}.
$$

左辺へ $s^{n+1}$ を掛けると

$$
\frac d{ds}\{s^{n+2}w_{n+1}\}
=\frac{s^{n+1}(P_xv_n)}{2(n+1)U}.
$$

再び $s=0$ の項は滑らかさで零になり、第2の積分式を得ます。被積分関数は $\gamma(s),y$ と $s$ に滑らかで、$U>0$ のため分母は零になりません。固定区間での積分は $x,y$ に滑らかです。二解の差は $s^{n+2}w=\text{定数}$ を満たすので、対角の有界性から定数は零です。よって存在・一意性が示されました。

**4. 対角値。** $\gamma_{yy}(s)=y$、$U(y,y)=1$ と $\int_0^1s^{n+1}ds=1/(n+2)$ を用いれば定理の対角公式が従います。$\square$
<!-- proof-end -->

### 曲率が初めて入る位置

[HPDE13の正規座標での体積Jacobian計算](../../HPDE/HPDE13/index.md#ex-hpde13-c01)により、上で使った曲率規約では

$$
[\Box_xU]=\frac16R,\qquad
[P_xU]=m^2+\left(\xi-\frac16\right)R.
$$

したがって[4次元対数係数の輸送方程式と一意な滑らかな解](#thm-mica12-transport)を $x=y$ で評価すると

$$
[v_0]=\frac12\left\{m^2+\left(\xi-\frac16\right)R\right\}.
$$

$m=0$、$\xi=1/6$ のときこの**対角値**は零です。ただし一般の曲がった時空では、これだけで $v_0(x,y)$ が全ての異なる点で零、まして $V=0$ と結論できません。

<a id="prop-mica12-flat-mass"></a>
<!-- formal-statement-start -->
> **命題（質量付き平坦時空の全対数係数）**  
> $M=\mathbb R^{1+3}$、$g=-dt^2+d\boldsymbol x^2$、$P=-\Box_g+m^2$（$m\ge0$ 定数）とする。上の輸送方程式で定めた係数は二点に依存しない定数であり、任意の $n\ge0$ に対し

$$
v_n=\frac{m^{2n+2}}{2^{n+1}n!(n+1)!}.
$$

> 特に $v_0=m^2/2$、$v_1=m^4/8$ であり、$m=0$ なら全係数が零になる。
<!-- formal-statement-end -->

### 証明の見取り図

$U=1$ と $\Box\sigma=4$ なので積分表示の幾何因子が消えます。$v_n$ が定数なら $P v_n=m^2v_n$ となり、係数間の漸化式が一つで閉じます。

<!-- proof-start -->
### 証明

$U=1$、$P U=m^2$ を[積分表示](#thm-mica12-transport)の最初の式へ入れると

$$
v_0=\frac12\int_0^1m^2\,ds=\frac{m^2}{2}.
$$

$v_n$ が定数だと仮定すると $\Box v_n=0$、$P v_n=m^2v_n$ なので

$$
\begin{aligned}
v_{n+1}
&=\frac{m^2v_n}{2(n+1)}\int_0^1s^{n+1}\,ds\\
&=\frac{m^2v_n}{2(n+1)(n+2)}.
\end{aligned}
$$

帰納法で定数性が保たれ、$n=0$ の値から

$$
v_n=\frac{m^2}{2}
\prod_{j=0}^{n-1}\frac{m^2}{2(j+1)(j+2)}
=\frac{m^{2n+2}}{2^{n+1}n!(n+1)!}
$$

となります。空積は $1$ とします。$m=0$ なら最初の式と再帰から全項が零です。$\square$
<!-- proof-end -->

この模型での $v_1>0$ は、[HPDE13の遅延Riesz係数 $V_1=-m^2$](../../HPDE/HPDE13/index.md#def-hpde13-hadamard-coefficients)と矛盾しません。**展開する分布そのもの**が異なるので、添字が同じでも数値を一致させる必要はありません。

## 4. 局所parametrixと状態の滑らかな部分

いま定めた $U,v_n$ は局所幾何と $P$ から決まりました。一方、[二点分布](../MICA11/index.md#def-mica11-two-point)が量子状態を表すには、双解性・場の交換関係・正値性という独立の条件が要ります。**幾何学的な特異項を作れたことと、状態を作れたことは同じではありません。**

円錐上の分布の特異構造については、[MICA4の境界値の例](../MICA4/index.md#def-mica4-boundary-value)のように、有限個の項を引くだけで無限階の滑らかさが保証されるわけではありません。有限次数まで残差を制御する書き方と、すべての次数を考える書き方を分けます。

<a id="def-mica12-local-parametrix"></a>
<!-- formal-statement-start -->
> **定義（4次元局所Hadamard parametrixとHadamard余り）**  
> $C$ を測地的凸正規近傍、$P=-\Box_g+m^2+\xi R$、$U$ および $v_n$ を上の輸送式で定め、時間関数 $T$ と尺度 $\ell>0$ を固定する。整数 $N\ge0$ に対し、**有限次の局所Hadamard式**を

$$
H_{\ell,N}(x,y)=\frac1{8\pi^2}
\left\{\frac{U(x,y)}{\sigma_+(x,y)}
+\left(\sum_{n=0}^{N}v_n(x,y)\sigma(x,y)^n\right)
\log\frac{\sigma_+(x,y)}{\ell^2}\right\}
$$

> と定める。さらに、滑らかな関数 $V_\infty$ が上記の全次数の漸近係数 $v_n$ を持つように選ばれた**全次数の局所Hadamard式**を

$$
H_{\ell,\infty}
=\frac1{8\pi^2}
\left\{\frac U{\sigma_+}
+V_\infty\log\frac{\sigma_+}{\ell^2}\right\}
$$

> と書く。実自由場の分布型二点量 $\omega_2$ が、局所的に適切な全次数の式を引いた差

$$
W_{\omega,\ell}:=\omega_2-H_{\ell,\infty}
\in C^\infty(C\times C)
$$

> を持つとき、**局所Hadamard形を持つ**という。すべて分布としての等式であり、$H_{\ell,\infty}$ 単独に状態の正値性や双解性を仮定しない。有限次 $H_{\ell,N}$ から $W_{\omega,\ell}\in C^\infty$ を推論してはならない。
<!-- formal-statement-end -->

**全次数**は無限和の収束宣言ではありません。各次数の輸送係数を、適切な切断を付けて滑らかな $V_\infty$ へ漸近的に組み立てる方法があります。切断方法の違いは滑らかな項に吸収されます。Hadamard形を確認するには、対象の二点分布との差が実際に滑らかであること、または各次数の有限式を引いた余りに次数とともに任意に高い微分可能性があることを確認します。円錐付近の分布境界値の精密な構成は文献の定理に依存し、単なる形式級数の代入だけを存在証明とはしません。

<!-- definition-example-start: def-mica12-local-parametrix -->
### 定義の確認：質量零平坦模型

**定義の確認**。質量零模型では差を零と計算し、滑らかさまで直接確かめます。

[正周波数模型の命題](#prop-mica12-massless-boundary)と[平坦な対数係数](#prop-mica12-flat-mass)で $m=0$ とすれば、$U=1$、全 $v_n=0$ です。従って $H_{\ell,N}=H_{\ell,\infty}=1/(8\pi^2\sigma_+)=W_0$ となり、差は零関数で滑らかです。この模型では**実際に**局所Hadamard形が成立します。一方、係数だけから全ての曲がった時空に状態が存在すると主張したわけではありません。
<!-- definition-example-end -->

### 有限切断から滑らかさを飛躍させない

任意の整数 $N\ge0$ に対し、一次元の関数 $f_N(s)=s^{N+1}\log|s|$（$s\ne0$）を $s=0$ で零と延長すると、$f_N\in C^N$ ですが一般に $C^{N+1}$ ではありません。たとえば

$$
f_0'(s)=\log|s|+1
$$

は $s\to0$ で発散します。光円錐の滑らかな点では $\sigma$ を横断方向の局所座標に取れるため、$v_{N+1}\sigma^{N+1}\log\sigma_+$ に同じ障害が現れ得ます。有限次数だけを固定しても、未収録の次項が滑らかとは言えません。

ここで「余りが $C^k$ になる」という主張は、$N$ を $k$ に応じて十分大きくした**各次数のHadamard漸近条件**の下で用います。任意の有限 $N$ について無条件に $C^\infty$ とする主張とは異なります。また、$W_{\omega,\ell}$ は特異部分を引いた**滑らかな関数**であって、$\omega_2(x,x)$ の値を直接定義する操作ではありません。対角制限は後の章で別に扱います。

<a id="prop-mica12-scale-shift"></a>
<!-- formal-statement-start -->
> **命題（長さスケールの変更）**  
> 同じ局所Hadamard二点分布 $\omega_2$ と同じ全次数の滑らかな係数 $V_\infty$ を用い、$\ell' = e^s\ell$（$s\in\mathbb R$）とする。局所Hadamard式と滑らかな余りは

$$
H_{\ell',\infty}-H_{\ell,\infty}
=-\frac{s}{4\pi^2}V_\infty,
\qquad
W_{\omega,\ell'}-W_{\omega,\ell}
=\frac{s}{4\pi^2}V_\infty
$$

> を満たす。従って尺度の変更は共通の特異方向を変えず、滑らかな局所項を付け替える。
<!-- formal-statement-end -->

### 証明の見取り図

$\log(\sigma_+/\ell^2)$ の分母だけを変えます。二つの境界値の差では $\sigma_+$ が対数から消え、滑らかな $V_\infty$ の定数倍だけ残ります。

<!-- proof-start -->
### 証明

$\ell'=e^s\ell$ なので $\ell'^2=e^{2s}\ell^2$ です。$\varepsilon>0$ で

$$
\log\frac{\sigma_\varepsilon}{\ell'^2}
-\log\frac{\sigma_\varepsilon}{\ell^2}
=\log(e^{-2s})=-2s.
$$

右辺は $\varepsilon$ に依存しないので、分布極限でも等式が成立します。$U/\sigma_+$ は不変だから

$$
H_{\ell',\infty}-H_{\ell,\infty}
=\frac{V_\infty}{8\pi^2}(-2s)
=-\frac{s}{4\pi^2}V_\infty.
$$

$W_{\omega,\ell}=\omega_2-H_{\ell,\infty}$ の差を取ると第二の式が従います。$V_\infty$ は滑らかなので、[MICA3の滑らかな付加項の波面集合の性質](../MICA3/index.md#prop-mica3-sum)により特異方向は変わりません。$\square$
<!-- proof-end -->

この命題は「尺度が変わっても $W_{\omega,\ell}$ の数値は不変」とは述べません。幾何学的な共通特異部分と状態依存の滑らかな項を**どの規約で分けたか**が変わるのです。また、同じ背景・同じ作用素に対する異なるHadamard状態の二点分布の差は、同じparametrixを差し引けば滑らかですが、これだけで正値性や一意な状態選択は導けません。

## 5. 演習――境界値・輸送再帰・滑らかな余りを検算する

<a id="ex-mica12-a01"></a>
### 演習 MICA12-A1：平坦な幾何の条件を全部確かめる

- Level: A
- 目安時間: 18分

$g=-dt^2+d\boldsymbol x^2$ の4次元Minkowski時空で、$z=x-y$、$\sigma=g(z,z)/2$ とする。$D=\sigma^{;a}\partial_{x^a}$、$\Delta$ はvan Vleck因子とする。

1. $\sigma^{;a}\sigma_{;a}=2\sigma$ と $\Box_x\sigma=4$ を成分から計算せよ。
2. $\Delta=1$、$U=\sqrt\Delta=1$ が[先頭輸送式](../../HPDE/HPDE13/index.md#lem-hpde13-van-vleck-transport)と対角条件を満たすことを確認せよ。

<!-- solution-start -->
#### 詳細解答

時差 $\tau$ と空間差 $r^j$ を用いると $\sigma=(-\tau^2+\sum_j(r^j)^2)/2$ です。従って下付き微分成分は $\sigma_{;0}=-\tau$、$\sigma_{;j}=r^j$、上付き成分は $\sigma^{;0}=\tau$、$\sigma^{;j}=r^j$。よって

$$
\sigma^{;a}\sigma_{;a}
=-\tau^2+\sum_j(r^j)^2=2\sigma.
$$

$\Box=-\partial_\tau^2+\sum_j\partial_{r^j}^2$ だから

$$
\Box_x\sigma=-(-1)+\sum_{j=1}^3 1=4.
$$

混合二階微分は $-\partial_x\partial_y\sigma=g$、$\det g=-1$ なので、[van Vleck因子の定義](../../HPDE/HPDE13/index.md#def-hpde13-van-vleck)で分子も分母も $1$。従って $\Delta=1$ で $U=1$、$DU=0$。ゆえに $2DU+(\Box\sigma-4)U=0$、$U(y,y)=1$ の双方が成立します。
<!-- solution-end -->

<a id="ex-mica12-a02"></a>
### 演習 MICA12-A2：$\varepsilon$ の符号と正周波数

- Level: A
- 目安時間: 16分

Minkowski時空で $T=t$、$\sigma=(-\tau^2+r^2)/2$ とし、$\sigma_\varepsilon=\sigma+i\varepsilon\tau+\varepsilon^2/2$（$\varepsilon>0$）とする。

1. $2\sigma_\varepsilon=r^2-(\tau-i\varepsilon)^2$ を展開して示せ。
2. $e^{-i\omega\tau}$（$\omega>0$）に対し $\tau-i\varepsilon$ と $\tau+i\varepsilon$ のどちらが高周波を減衰させるか、指数を計算せよ。

<!-- solution-start -->
#### 詳細解答

$(\tau-i\varepsilon)^2=\tau^2-2i\varepsilon\tau-\varepsilon^2$ だから

$$
r^2-(\tau-i\varepsilon)^2
=r^2-\tau^2+2i\varepsilon\tau+\varepsilon^2
=2\sigma_\varepsilon.
$$

指数の虚数部分を省略せず代入すると

$$
e^{-i\omega(\tau-i\varepsilon)}
=e^{-i\omega\tau-\omega\varepsilon},\qquad
e^{-i\omega(\tau+i\varepsilon)}
=e^{-i\omega\tau+\omega\varepsilon}.
$$

前者だけが $\omega\to\infty$ で減衰します。したがって[正周波数境界値の定義](#def-mica12-positive-boundary)の符号が選ばれます。
<!-- solution-end -->

<a id="ex-mica12-a03"></a>
### 演習 MICA12-A3：質量零Fourier模型の角度積分

- Level: A
- 目安時間: 18分

$\varepsilon>0$、$r>0$ とし、$a=\varepsilon+i\tau$（$\tau\in\mathbb R$）とする。質量零のFourier模型に現れる積分

$$
I(a,r)=\int_0^\infty e^{-ap}\sin(pr)\,dp
$$

を評価し、$W_{0,\varepsilon}=I/(4\pi^2r)$ が $1/(8\pi^2\sigma_\varepsilon)$ に一致することを示せ。ここで $\sigma_\varepsilon=\{r^2-(\tau-i\varepsilon)^2\}/2$ である。

<!-- solution-start -->
#### 詳細解答

$\operatorname{Re}a=\varepsilon>0$ だから、指数積分は収束します。$\sin(pr)=(e^{ipr}-e^{-ipr})/(2i)$ を使い

$$
\begin{aligned}
I(a,r)
&=\frac1{2i}\left\{\frac1{a-ir}-\frac1{a+ir}\right\}\\
&=\frac1{2i}\frac{2ir}{a^2+r^2}
=\frac{r}{a^2+r^2}.
\end{aligned}
$$

$a=\varepsilon+i\tau=i(\tau-i\varepsilon)$ だから $a^2=-(\tau-i\varepsilon)^2$ です。従って

$$
W_{0,\varepsilon}
=\frac{I}{4\pi^2r}
=\frac{1}{4\pi^2\{r^2-(\tau-i\varepsilon)^2\}}
=\frac{1}{8\pi^2\sigma_\varepsilon}.
$$

$r=0$ を先に代入して分母を零にしないことが重要です。分布としての極限は[模型の命題](#prop-mica12-massless-boundary)に従います。
<!-- solution-end -->

<a id="ex-mica12-a04"></a>
### 演習 MICA12-A4：最初の輸送係数と質量

- Level: A
- 目安時間: 17分

平坦な4次元時空で $P=-\Box+m^2$（$m>0$ 定数）、$U=1$ とする。[輸送方程式](#thm-mica12-transport)の最初の式から、$v_0$ が定数ならその値を求めよ。また輸送積分式から、**定数以外の滑らかな解はない**ことを説明せよ。

<!-- solution-start -->
#### 詳細解答

$v_0$ が定数なら $Dv_0=0$、$\Box\sigma=4$、$PU=m^2$ なので

$$
2Dv_0+(\Box\sigma-2)v_0=2v_0=m^2,
\quad v_0=\frac{m^2}{2}.
$$

一般の滑らかな候補にも[測地線積分表示](#thm-mica12-transport)が成立し、$U=1$、$PU=m^2$ を代入すると

$$
v_0(x,y)=\frac12\int_0^1m^2\,ds=\frac{m^2}{2}
$$

です。初期点での有界性が積分定数を零にするため、二点に依存する別の滑らかな解はありません。
<!-- solution-end -->

<a id="ex-mica12-a05"></a>
### 演習 MICA12-A5：曲率の対角値と共形結合

- Level: A
- 目安時間: 18分

4次元の $P=-\Box_g+m^2+\xi R$、$U=\Delta^{1/2}$ に対し、曲率規約を $[\Box_xU]=R/6$ とする。[輸送係数の対角式](#thm-mica12-transport)から $[v_0]$ を求めよ。$m=0,\xi=1/6$ で何が零になり、何までは結論できないか説明せよ。

<!-- solution-start -->
#### 詳細解答

$[U]=1$ と $[P_xU]=-[\Box_xU]+(m^2+\xi R)[U]$ から

$$
[P_xU]=-\frac R6+m^2+\xi R
=m^2+\left(\xi-\frac16\right)R.
$$

[輸送定理の対角値](#thm-mica12-transport)へ代入すると

$$
[v_0]=\frac12\left\{m^2+\left(\xi-\frac16\right)R\right\}.
$$

$m=0,\xi=1/6$ の場合はこの**対角値**が零です。しかし $[v_0]=0$ は $x\ne y$ の $v_0(x,y)=0$ を含意せず、高次係数も自動的に零とはなりません。
<!-- solution-end -->

<a id="ex-mica12-b01"></a>
### 演習 MICA12-B1：位置に依存するポテンシャル

- Level: B
- 目安時間: 30分

4次元Minkowski時空の凸な小領域で $P=-\Box+q(t)$、$q(t)=a+bt$（$a,b\in\mathbb R$）、$U=1$ とする。$t_x,t_y$ を二点の時間座標として、[最初の輸送積分式](#thm-mica12-transport)から $v_0(x,y)$ を求めよ。結果を微分方程式へ代入して検算せよ。$q$ は局所的な実滑らかなポテンシャルであり、全時空で非負と仮定しない。

<!-- solution-start -->
#### 詳細解答

測地線 $\gamma_{xy}(s)=y+s(x-y)$ の時間座標は $t_y+s(t_x-t_y)$ です。$U=1$ なので $P_xU=q(t)$。輸送積分式にこれを代入すると

$$
\begin{aligned}
v_0(x,y)
&=\frac12\int_0^1\{a+b[t_y+s(t_x-t_y)]\}\,ds\\
&=\frac12\{a+bt_y+\tfrac b2(t_x-t_y)\}\\
&=\frac a2+\frac b4(t_x+t_y).
\end{aligned}
$$

ここで $D=(t_x-t_y)\partial_{t_x}+\sum_j(x^j-y^j)\partial_{x^j}$、$\Box\sigma=4$ です。$v_0$ は空間差に依存せず、$\partial_{t_x}v_0=b/4$ なので

$$
\begin{aligned}
2Dv_0+(\Box\sigma-2)v_0
&=\frac b2(t_x-t_y)+2\left\{\frac a2+\frac b4(t_x+t_y)\right\}\\
&=a+bt_x=q(t_x)=P_xU.
\end{aligned}
$$

正しく第一変数の $q(t_x)$ が現れます。$q(t_y)$ に固定すると輸送方程式を満たしません。
<!-- solution-end -->

<a id="ex-mica12-b02"></a>
### 演習 MICA12-B2：次の係数を独立に再導出する

- Level: B
- 目安時間: 28分

4次元Minkowski時空で $P=-\Box+m^2$、$m>0$ 定数、$U=1$ とする。$v_0=m^2/2$ を使い、$v_1$ を次の二通りで求め一致を確かめよ。

1. [輸送積分式](#thm-mica12-transport)へ $n=0$ を代入する。
2. $v_1$ が定数と仮定し、$2Dv_1+(\Box\sigma)v_1=Pv_0$ を解く。

<!-- solution-start -->
#### 詳細解答

$v_0$ は定数なので $Pv_0=m^2(m^2/2)=m^4/2$。積分式では

$$
v_1=\frac1{2(0+1)}\int_0^1s^{0+1}\frac{m^4}{2}\,ds
=\frac{m^4}{4}\cdot\frac12
=\frac{m^4}{8}.
$$

一方、$v_1$ が定数なら $Dv_1=0$、$\Box\sigma=4$ なので、輸送式の左辺は $4v_1$ です。従って

$$
4v_1=Pv_0=\frac{m^4}{2},
\qquad v_1=\frac{m^4}{8}.
$$

二つの導出が一致します。定数解以外がないのは[輸送定理の一意性](#thm-mica12-transport)によります。
<!-- solution-end -->

<a id="ex-mica12-b03"></a>
### 演習 MICA12-B3：有限次の対数項は何階まで滑らかか

- Level: B
- 目安時間: 29分

整数 $N\ge0$ について、$f_N(s)=s^{N+1}\log|s|$（$s\ne0$）、$f_N(0)=0$ とする。$f_N$ が $C^N$ である一方、一般には $C^{N+1}$ でないことを、微分の最高次に残る項を追って示せ。この結果から、$H_{\ell,N}$ を引いた余りが無条件に滑らかとは言えない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$k$ 回微分したとき、Leibniz則から

$$
\frac{d^k}{ds^k}\{s^{N+1}\log|s|\}
=\frac{(N+1)!}{(N+1-k)!}s^{N+1-k}\log|s|
+c_{N,k}s^{N+1-k}
$$

という形になります（$0\le k\le N+1$、$c_{N,k}$ は定数）。これは $k=0$ から帰納法で確認できます。$k\le N$ なら $N+1-k\ge1$ なので、$s^a\log|s|\to0$（$a>0$）より $k$ 階導関数は零へ連続延長します。延長値が実際に $f_N^{(k)}(0)$ と一致することも、前階の式を差商に入れて $s\to0$ とすれば帰納的に確かめられます。

$k=N+1$ では

$$
f_N^{(N+1)}(s)=(N+1)!\log|s|+c_{N,N+1}
$$

となり、$s\to0$ で発散します。従って $f_N\in C^N$ ですが $C^{N+1}$ ではありません。局所Hadamard展開の未収録次項は $\sigma^{N+1}\log\sigma_+$ 型なので、有限 $N$ だけで $C^\infty$ を主張することはできません。必要な微分階数に応じた高次切断が要ります。
<!-- solution-end -->

<a id="ex-mica12-b04"></a>
### 演習 MICA12-B4：状態を変える操作と尺度を変える操作

- Level: B
- 目安時間: 30分

同じ4次元大域双曲時空の実Klein–Gordon作用素 $P$ について、$W_\omega$ を局所Hadamard二点分布とする。$v$ は実滑らかな双曲方程式の解 $Pv=0$、$\lambda\ge0$ とし、$W_\lambda=W_\omega+\lambda v\otimes v$ が[MICA11の状態の変更](../MICA11/index.md#prop-mica11-smooth-shift)から得られるとする。

1. 同じ局所Hadamard式 $H_{\ell,\infty}$ に対する $W_\lambda-H_{\ell,\infty}$ の正則性を求めよ。
2. $\ell'=e^s\ell$ としたとき、同じ尺度で比べる二状態の滑らかな余りの差は変わるか。

<!-- solution-start -->
#### 詳細解答

初めに $F_\omega=W_\omega-H_{\ell,\infty}\in C^\infty(C\times C)$ と置きます。$v$ は滑らかなので $(x,y)\mapsto v(x)v(y)$ も滑らかです。従って

$$
W_\lambda-H_{\ell,\infty}
=F_\omega+\lambda v(x)v(y)\in C^\infty(C\times C).
$$

これは滑らかさの主張であり、状態の正値性と場の交換関係は[引用したMICA11の命題](../MICA11/index.md#prop-mica11-smooth-shift)の仮定の下で別途保証されます。尺度変更では[本章の尺度命題](#prop-mica12-scale-shift)から両状態の余りに同じ $sV_\infty/(4\pi^2)$ が加わります。従って差を取ると

$$
\begin{aligned}
(W_\lambda-H_{\ell',\infty})
 -(W_\omega-H_{\ell',\infty})
&=W_\lambda-W_\omega\\
&=\lambda v(x)v(y),
\end{aligned}
$$

となり $\ell$ に依存しません。状態変更と尺度変更は異なる操作です。
<!-- solution-end -->

<a id="ex-mica12-c01"></a>
### 演習 MICA12-C1：一つの局所parametrixを四方向から査読する

- Level: C
- 目安時間: 45分

4次元Minkowski時空で $g=-dt^2+d\boldsymbol x^2$、$P=-\Box+m^2$（$m>0$ 定数）を固定する。$\sigma=(-\tau^2+r^2)/2$、$T=t$、$U=1$、$\ell>0$ とする。局所Hadamard形式

$$
H_{\ell,N}=\frac1{8\pi^2}
\left\{\frac1{\sigma_+}
+\sum_{n=0}^Nv_n\sigma^n\log\frac{\sigma_+}{\ell^2}\right\}
$$

について、次を計算・説明せよ。

1. $\sigma_\varepsilon$ の符号が正周波数表示と一致することを確かめ、$1/(8\pi^2)$ の正規化を質量零模型の積分から確認せよ。
2. $v_0,v_1,v_2$ を輸送再帰から求めよ。
3. $\ell' =e^s\ell$ のとき全次数の局所式 $H_{\ell,\infty}$ の変化を求めよ。
4. 有限次 $H_{\ell,1}$ を作っただけで任意の二点分布 $W$ に対し $W-H_{\ell,1}\in C^\infty$ とは言えない理由を、未収録の対数項と状態の条件の両面から述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** [境界値の定義](#def-mica12-positive-boundary)から

$$
2\sigma_\varepsilon=r^2-\tau^2+2i\varepsilon\tau+\varepsilon^2
=r^2-(\tau-i\varepsilon)^2.
$$

指数 $e^{-i|\boldsymbol p|\tau}$ は $\tau-i\varepsilon$ で $e^{-|\boldsymbol p|\varepsilon}$ を受け取ります。[質量零Fourier模型の積分計算](#prop-mica12-massless-boundary)では球面角度積分 $4\pi\sin(pr)/(pr)$ の後に

$$
\frac1{4\pi^2r}\int_0^\infty
e^{-(\varepsilon+i\tau)p}\sin(pr)\,dp
=\frac1{4\pi^2\{r^2-(\tau-i\varepsilon)^2\}}
=\frac1{8\pi^2\sigma_\varepsilon}
$$

となるので正規化と符号は一致します。

**2.** $PU=m^2$、$Dv_0=0$、$\Box\sigma=4$ から $2v_0=m^2$。次は[輸送再帰](#thm-mica12-transport)の定数解で

$$
v_{n+1}=\frac{m^2v_n}{2(n+1)(n+2)}.
$$

従って

$$
v_0=\frac{m^2}{2},\qquad
v_1=\frac{m^2}{4}\frac{m^2}{2}=\frac{m^4}{8},\qquad
v_2=\frac{m^2}{12}\frac{m^4}{8}=\frac{m^6}{96}.
$$

**3.** $\ell'^2=e^{2s}\ell^2$ より対数が $-2s$ 変化します。[尺度変更命題](#prop-mica12-scale-shift)で $\omega_2$ は固定して

$$
H_{\ell',\infty}-H_{\ell,\infty}
=-\frac{s}{4\pi^2}V_\infty.
$$

ここで $V_\infty$ は全次数の漸近係数を持つ滑らかな選択です。選択した二つの尺度で余りが滑らかなら、余りの差は逆符号になります。

**4.** $H_{\ell,1}$ に含まれる対数項は次の2項までです。

$$
v_0\log\sigma_++v_1\sigma\log\sigma_+.
$$

しかし、この模型では $v_2=m^6/96\ne0$ なので、次項

$$
v_2\sigma^2\log\sigma_+
$$

が未収録です。光円錐の滑らかな部分で $\sigma$ は横断座標になります。$s^2\log|s|$ は $C^1$ ですが $C^2$ ではないため、残差を無条件に $C^\infty$ とはできません。

さらに任意の分布 $W$ は、そもそも[二点分布の正値性・双解性・交換子条件](../MICA11/index.md#def-mica11-two-point-conditions)や局所Hadamard形を満たすとは限りません。輸送係数は特異性の候補を作るのであって、任意の $W$ をHadamard状態へ変換する操作ではありません。
<!-- solution-end -->

## 6. この構成で分かること、まだ検査が必要なこと

| 対象 | 決まる根拠 | 取り違えやすい点 |
| --- | --- | --- |
| $\sigma$、$U$ | 短い測地線と体積Jacobian | 大域的に一意な測地線を仮定しない |
| $i0$ の向き | 正周波数の分布境界値 | 符号反転で同じ状態にはならない |
| $v_0,v_1,\ldots$ | $P$ と輸送再帰 | 遅延Green核のRiesz係数とは異なる |
| $H_{\ell,N}$ | 有限次数の漸近式 | 余りが自動的に $C^\infty$ にはならない |
| $W_{\omega,\ell}$ | 選んだHadamard二点分布との差 | 正値性と状態の存在は別条件 |

ここまでで、局所的に共通する特異構造を**幾何学・作用素・正周波数の向き**から作れました。ただし、二点分布が本当にこの形を持つかは、その波面集合と方程式を用いた検査が必要です。次は波面集合によるHadamard条件へ進み、局所表示と特異方向の等式との接続を扱います。

## 参考文献

- C. Bär, N. Ginoux, F. Pfäffle, [*Wave Equations on Lorentzian Manifolds and Quantization*](https://ems.press/books/esi/34), 第2章（局所基本解、輸送係数の幾何学）。
- V. Moretti, [*On the global Hadamard parametrix in QFT and the signed squared geodesic distance*](https://arxiv.org/abs/2107.04903), §§3–4（局所表示、有限次数、時間関数と凸近傍の注意）。
- [*球対称な特性面上のHadamard状態*](https://doi.org/10.1088/1361-6382/acb039), §3（4次元の $U,V_n$ と有限次数の剰余正則性）。
