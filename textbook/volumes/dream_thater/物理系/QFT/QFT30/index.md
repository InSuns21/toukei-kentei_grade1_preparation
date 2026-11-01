# QFT30 Yang–Mills理論の一ループβ関数と漸近自由性

<!-- definition-example-audit: strict -->

[QFT28のYang–Mills作用](../QFT28/index.md#def-qft28-yang-mills-action)には、ゲージ場自身の三点・四点相互作用があります。[QFT29のFaddeev–Popov ghost](../QFT29/index.md#def-qft29-ghost-action)も非可換ゲージ場と結合します。したがって、量子補正を計算すると「ゲージ粒子の輪」と「ghostの輪」の双方が現れます。

前の[QFT25で定義したβ関数](../QFT25/index.md#def-qft25-rg-functions)は、観測する尺度を変えたとき結合がどう動くかを表しました。QEDでは高いエネルギーほど電荷が増す一方、純粋な非可換Yang–Mills理論では逆のことが起きます。**なぜ負号になるのか**を、符号と自由度の数え上げから導くことがこの講義の中心です。

ここでは四次元Euclid空間で、物質場を含まない純粋な $SU(N)$（$N\ge2$）ゲージ理論を扱います。局所的な紫外発散を計算するため、まず大きな有限箱と紫外・赤外カットオフを置きます。連続極限の経路積分や非摂動的な物理Hilbert空間を厳密に構成することは仮定しません。[QFT20のEuclid化と反射陽性](../QFT20/index.md#def-qft20-euclidean-action)が区別したとおり、形式的な摂動計算だけで厳密な量子場の存在が従うわけではありません。

## 1. 結合を場へ吸収して背景と揺らぎを分ける

[QFT28の共変微分と曲率](../QFT28/index.md#def-qft28-curvature)で用いた $D_\mu=\partial_\mu-ig A_\mu$ の $g$ を、接続に吸収します。すなわち $\mathcal A_\mu^a=gA_\mu^a$ と置くと、その曲率は

$$
\mathcal F_{\mu\nu}^a
=\partial_\mu\mathcal A_\nu^a-\partial_\nu\mathcal A_\mu^a
+f^{abc}\mathcal A_\mu^b\mathcal A_\nu^c
=gF_{\mu\nu}^a
$$

です。ここでは $[X,Y]^a=f^{abc}X^bY^c$ と書きます。生成子はHermitianで $\operatorname{tr}(T^aT^b)=\delta^{ab}/2$、$[T^a,T^b]=if^{abc}T^c$ と規格化し、色添字 $a=1,\ldots,N^2-1$ とEuclid時空添字 $\mu=1,\ldots,4$ を反復和します。結合を吸収した表示の作用は

$$
S_E[\mathcal A]=\frac1{4g_0^2}\int d^4x\,
\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a.
$$

$g_0$ はカットオフ付きの**裸結合**です。量子補正を調べるときは、積分変数全体を基準場と小さな揺らぎに分けます。

<a id="def-qft30-background-split"></a>

<!-- formal-statement-start -->
> **定義（背景場分割と随伴背景微分）**  
> 四次元Euclid空間の $SU(N)$ 接続を $\mathcal A_\mu=\mathcal B_\mu+g_0a_\mu$ に分け、固定する $\mathcal B_\mu$ を背景場、積分する $a_\mu$ を量子揺らぎとする。背景曲率 $\mathcal F_{\mu\nu}[\mathcal B]$ と、随伴ベクトル $v^a$ に作用する微分を次のように置く。

$$
(\mathcal D_\mu v)^a=\partial_\mu v^a+
f^{abc}\mathcal B_\mu^b v^c,\qquad
[\mathcal D_\mu,\mathcal D_\nu]v
=[\mathcal F_{\mu\nu}[\mathcal B],v].
$$

> 背景場を動かさず $a_\mu$ のGaussian積分を行い、背景に依存する一ループ有効作用を求める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft30-background-split -->
**定義の確認**：$\mathcal B_1=0$、$\mathcal B_2=x_1hT^3$、他を零とする $SU(2)$ の背景では $\mathcal F_{12}=hT^3$ で、他の成分は零です。実際、$\partial_1\mathcal B_2=hT^3$、$\partial_2\mathcal B_1=0$、$[\mathcal B_1,\mathcal B_2]=0$ です。また、随伴ベクトル $v$ への交換子は色空間の回転なので、場そのものの時空回転と混同しません。
<!-- definition-example-end -->

この $\mathcal B$ は、$\mathcal D_\mu\mathcal F_{\mu\nu}=0$ も満たします。そのため作用の $a$ に一次の項が消え、Gaussian積分の二次部分を読みやすくします。一般の背景では一次の項が残りますが、背景場有効作用の局所的な $\mathcal F^2$ 係数は、ここで選んだ非零の背景によって測れます。

## 2. ゲージ場とghostの二次作用素

背景場を保つゲージ固定条件として $G(a)=\mathcal D_\mu a_\mu=0$ を使います。量子揺らぎを動かす条件ですが、微分には背景 $\mathcal B$ が入ります。[QFT29のFaddeev–Popov作用素](../QFT29/index.md#def-qft29-fp-operator)をこの条件へ適用し、揺らぎの零次（$a=0$）で得るghost作用素は $-\mathcal D^2$ です。

同じくゲージ場の揺らぎにも二次形式が必要です。Feynmanゲージに相当する係数を1にすると、縦方向の混合微分が消えます。

<a id="def-qft30-background-operators"></a>

<!-- formal-statement-start -->
> **定義（背景場Feynmanゲージの二次作用素）**  
> 滑らかなEuclid背景 $\mathcal B_\mu$ に対して、背景随伴微分 $\mathcal D_\mu$ と曲率の随伴作用 $\operatorname{ad}(\mathcal F_{\mu\nu})v=[\mathcal F_{\mu\nu},v]$ を使い、色付きスカラー（ghost）および色付き4ベクトル（ゲージ揺らぎ）への二つの作用素を置く。

$$
\Delta_0=-\mathcal D_\rho\mathcal D_\rho,\qquad
(\Delta_1)_{\mu\nu}
=-\mathcal D_\rho\mathcal D_\rho\,\delta_{\mu\nu}
-2\operatorname{ad}(\mathcal F_{\mu\nu}).
$$

> $\Delta_1$ の $\mu,\nu$ は4ベクトルの成分、内部の随伴作用は色成分に作用する。境界条件と零モードの扱いは、正則化ごとに指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft30-background-operators -->
**定義の確認**：零背景では $\mathcal D_\mu=\partial_\mu$、$\mathcal F=0$ なので $\Delta_0=-\partial^2$、$(\Delta_1)_{\mu\nu}=-\partial^2\delta_{\mu\nu}$ です。非零の一定色磁場では $-2\operatorname{ad}(\mathcal F_{12})$ がベクトルの第1・第2成分を混ぜます。この混合が、スカラーghostと異なる対数係数を作ります。
<!-- definition-example-end -->

<a id="prop-qft30-quadratic-action"></a>

<!-- formal-statement-start -->
> **命題（背景場でのゲージ場・ghostの二次作用）**  
> 四次元Euclidの滑らかな $SU(N)$ 背景 $\mathcal B$ を固定し、部分積分の境界項が消える条件で $S_E[\mathcal B+g_0a]$ を二次まで展開する。背景Feynmanゲージ固定項 $\frac12\int(\mathcal D_\mu a_\mu)^2$ を加えると、ゲージ揺らぎの二次作用は

$$
S_E^{(2)}+S_{\mathrm{gf}}
=\frac12\int d^4x\,a_\mu^a(\Delta_1)_{\mu\nu}^{ab}a_\nu^b.
$$

> ghostの二次作用は $\int d^4x\,\bar c^a(\Delta_0)^{ab}c^b$ となり、形式的な一ループ寄与は

$$
\Gamma^{(1)}[\mathcal B]
=\frac12\operatorname{Tr}\log\Delta_1
-\operatorname{Tr}\log\Delta_0
$$

> である。traceと行列式は有限正則化で定義し、ゼロ固有値を適切に除くものとする。
<!-- formal-statement-end -->

### 証明の見取り図

曲率の一次変分を二乗した項と、背景曲率に二次変分を掛けた項を両方残します。ゲージ固定は $\mathcal D_\mu\mathcal D_\nu$ を消しますが、交換子の曲率項は消せません。最後に実Gaussian積分は行列式の平方根、独立したGrassmann対は行列式そのものを与えます。

<!-- proof-start -->
### 証明

$L_{\mu\nu}=\mathcal D_\mu a_\nu-\mathcal D_\nu a_\mu$ と置けば、[Yang–Mills曲率の展開](../QFT28/index.md#def-qft28-curvature)により

$$
\mathcal F_{\mu\nu}[\mathcal B+g_0a]
=\mathcal F_{\mu\nu}[\mathcal B]+g_0L_{\mu\nu}
+g_0^2[a_\mu,a_\nu].
$$

したがって揺らぎの二次部分は

$$
S_E^{(2)}
=\frac14\int L_{\mu\nu}^aL_{\mu\nu}^a
+\frac12\int \mathcal F_{\mu\nu}^a[a_\mu,a_\nu]^a.
$$

第一項を成分で展開し、$\mathcal D_\mu$ の反対称性を使って部分積分すると

$$
\begin{aligned}
\frac14\int L_{\mu\nu}^2
&=\frac12\int\bigl((\mathcal D_\mu a_\nu)^2
-(\mathcal D_\mu a_\nu)(\mathcal D_\nu a_\mu)\bigr)\\
&=\frac12\int a_\mu
\bigl(-\mathcal D^2\delta_{\mu\nu}
+\mathcal D_\nu\mathcal D_\mu\bigr)a_\nu\\
&=\frac12\int a_\mu
\bigl(-\mathcal D^2\delta_{\mu\nu}
+\mathcal D_\mu\mathcal D_\nu
-\operatorname{ad}(\mathcal F_{\mu\nu})\bigr)a_\nu.
\end{aligned}
$$

最後の行で $[\mathcal D_\nu,\mathcal D_\mu]=-\operatorname{ad}(\mathcal F_{\mu\nu})$ を使いました。第二項は $f^{abc}$ の完全反対称性から

$$
\frac12\int \mathcal F_{\mu\nu}^a f^{abc}a_\mu^ba_\nu^c
=-\frac12\int a_\mu\operatorname{ad}(\mathcal F_{\mu\nu})a_\nu.
$$

一方、ゲージ固定項を部分積分すれば

$$
\frac12\int(\mathcal D_\mu a_\mu)^2
=-\frac12\int a_\mu\mathcal D_\mu\mathcal D_\nu a_\nu.
$$

ゆえに混合二階微分が消え、曲率項は合計 $-2\operatorname{ad}(\mathcal F_{\mu\nu})$ となります。ghostについては[QFT29のGrassmann行列式](../QFT29/index.md#prop-qft29-ghost-determinant)が $\det\Delta_0$ を与え、実ボース場のGaussian積分が $(\det\Delta_1)^{-1/2}$ を与えます。$-\log Z$ を取れば表示式です。
<!-- proof-end -->

零背景では4成分の実ボース自由度が $4/2=2$、複素Grassmann対が $-1$ を対数行列式の重みとして持つため、合計 $1$、すなわち物理的な実偏極2個の $2/2$ に一致します。ただし「ghostは実在する負の粒子」と解釈するのでなく、ゲージ冗長性のJacobianを補正する計算上の場です。

## 3. 色電荷の二乗を数える

一定色磁場を使う前に、非可換群の色方向をどれだけ数えるか確認します。背景をCartan方向へ置くと、随伴表現の各成分は、その方向に対して中性または正負の「色電荷」を持つ複素化固有モードへ分解できます。その電荷の二乗和が群に依存する唯一の係数です。

<a id="def-qft30-adjoint-casimir"></a>

<!-- formal-statement-start -->
> **定義（随伴表現の二次Casimir）**  
> $SU(N)$ の生成子を $\operatorname{tr}(T^aT^b)=\delta^{ab}/2$ と規格化する。構造定数が満たす正の定数 $C_A$ を

$$
f^{acd}f^{bcd}=C_A\delta^{ab}
$$

> で定義する。これは随伴表現の二次Casimir係数である。$SU(N)$ について $C_A=N$。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft30-adjoint-casimir -->
**定義の確認**：$SU(2)$ は $f^{abc}=\varepsilon^{abc}$ です。$a=b=3$ なら非零項は $(c,d)=(1,2),(2,1)$ の二つで、$(\varepsilon^{312})^2+(\varepsilon^{321})^2=2$。$a\ne b$ では反対称性から和は零です。ゆえに $C_A=2$ と定義式の全成分を確認できます。
<!-- definition-example-end -->

$SU(N)$ で $C_A=N$ になる理由も確かめます。$N\times N$ のtraceless行列 $X$ に対し、Hermitian生成子の完全性関係

$$
\sum_a(T^a)_{ij}(T^a)_{kl}
=\frac12\left(\delta_{il}\delta_{jk}
-\frac1N\delta_{ij}\delta_{kl}\right)
$$

を使います。これは $\{\sqrt2T^a,I/\sqrt N\}$ がHermitian行列の実内積 $\operatorname{tr}(XY)$ に関する正規直交基底をなすことから、成分ごとの恒等分解として得られます。実際、$\operatorname{tr}X=0$ なら

$$
\sum_aT^aXT^a=-\frac{X}{2N},\qquad
\sum_aT^aT^a=\frac{N^2-1}{2N}I.
$$

二重交換子を展開すると

$$
\sum_a[T^a,[T^a,X]]
=\frac{N^2-1}{N}X+\frac1NX=NX.
$$

$X=T^b$ を代入し $[T^a,T^b]=if^{abc}T^c$ を二度使うと、左辺の係数は $f^{acd}f^{bcd}$ です。したがって $C_A=N$ が従います。

**色の具体例。** $SU(2)$ の $T^3$ 方向の随伴行列 $\operatorname{ad}(hT^3)$ は、実基底 $(T^1,T^2,T^3)$ で第1・第2成分を回転させます。複素化した固有値は $ih,-ih,0$、そこで電荷の二乗和は $h^2+h^2=2h^2=C_Ah^2$ です。一般の単位色ベクトル $n^a$ に沿う $H=hn^aT^a$ でも

$$
\sum_{\text{随伴色モード }r}q_r^2=C_Ah^2
$$

となります。理由は実反対称行列 $\operatorname{ad}H$ の固有値を $iq_r$ と書いたとき

$$
\sum_rq_r^2=-\operatorname{tr}_{\mathrm{adj}}
((\operatorname{ad}H)^2)
=h^2n^an^bf^{acd}f^{bcd}=C_Ah^2
$$

だからです。これが「色方向の和」を群論の係数へ置き換える橋です。

## 4. 一定色磁場のLandau準位を自分で数える

ここから、$\mathcal F_{12}=hn^aT^a$、$\mathcal F_{\mu\nu}=0$（それ以外）、$h>0$ の背景を選びます。背景はCartan方向なので随伴色モードの電荷 $q_r$ ごとに分離できます。あるモードでは $\mathcal D_2=\partial_2+iq_rx_1$、$\mathcal D_1=\partial_1$ というAbel型の微分が働きます。$q_r$ はすでに磁場の大きさを含む実数であり、ここへ別の $g_0$ を掛けません。

$\Delta_0=-\mathcal D^2$ の固有値を指数 $e^{-t\Delta_0}$ で重み付けして足し上げたものを**熱核のtrace**として使います。パラメータ $t>0$ は長さの二乗の次元を持ち、$t\to0$ が高固有値（紫外）の寄与を強く見る極限です。

<a id="lem-qft30-scalar-heat-kernel"></a>

<!-- formal-statement-start -->
> **補題（一定色磁場のスカラー熱核）**  
> 四次元Euclid空間で $\mathcal D_1=\partial_1$、$\mathcal D_2=\partial_2+iqx_1$、$\mathcal D_3=\partial_3$、$\mathcal D_4=\partial_4$ を使い、$q\in\mathbb R$、$t>0$ とする。無限体積極限における単位四体積あたりの $-\mathcal D^2$ の熱核traceは

$$
K_0(t;q)=\frac1{(4\pi t)^2}
\frac{|q|t}{\sinh(|q|t)}
$$

> である。$q=0$ の値は極限 $(4\pi t)^{-2}$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

第1・第2座標の磁場中の運動は調和振動子となります。残り二方向は通常のGaussian運動量積分です。「準位」と「一準位の縮退度」の両方を数えれば、短時間係数を暗記せずに得られます。

<!-- proof-start -->
### 証明

$x_2$ 方向をFourier変換して $v=e^{ik_2x_2}\phi(x_1)$ と書くと、第1・第2方向の作用素は

$$
-\mathcal D_1^2-\mathcal D_2^2
=-\frac{d^2}{dx_1^2}+(k_2+qx_1)^2.
$$

$q\ne0$ なら中心 $x_1=-k_2/q$、振動数 $|q|$ の調和振動子です。生成消滅演算子を使うかHermite方程式を解くと、固有値は $|q|(2n+1)$（$n=0,1,\ldots$）となります。

面積 $L_1L_2$ の箱で中心が $0\le-k_2/q<L_1$ に入る $k_2=2\pi m/L_2$ の数は、境界の $O(L_1+L_2)$ の補正を除き $|q|L_1L_2/(2\pi)$ 個です。したがって一準位の単位面積あたり縮退度は $|q|/(2\pi)$。残り二方向は

$$
\int_{\mathbb R^2}\frac{d^2k}{(2\pi)^2}
e^{-t(k_3^2+k_4^2)}=\frac1{4\pi t}.
$$

これらを掛けると

$$
\begin{aligned}
K_0(t;q)
&=\frac{|q|}{2\pi}
\sum_{n=0}^\infty e^{-t|q|(2n+1)}
\frac1{4\pi t}\\
&=\frac{|q|}{2\pi}
\frac{e^{-|q|t}}{1-e^{-2|q|t}}\frac1{4\pi t}\\
&=\frac{|q|}{4\pi\sinh(|q|t)}\frac1{4\pi t}
=\frac1{(4\pi t)^2}\frac{|q|t}{\sinh(|q|t)}.
\end{aligned}
$$

$q\to0$ では $\sinh(qt)/(qt)\to1$ なので自由核へ戻ります。
<!-- proof-end -->

例えば $q=h$ の $SU(2)$ 荷電モードは、熱核の短時間展開

$$
\frac{ht}{\sinh(ht)}
=1-\frac{h^2t^2}{6}+O(t^4)
$$

を持ちます。この負の二次補正だけを見ても、ゲージ場のβ関数の符号はまだ分かりません。ベクトルのスピン混合とghostの重みを加える必要があります。

## 5. 4成分の混合とghostを合わせる

色電荷 $q$ のモードでは $\operatorname{ad}(\mathcal F_{12})$ の固有値が $iq$ です。第1・第2ベクトル成分に働く $\Delta_1$ の行列部分 $-2\operatorname{ad}(\mathcal F_{\mu\nu})$ は、Lorentz添字の二次元ブロック上で固有値 $+2q,-2q$ を持ちます。残り第3・第4成分への作用は零です。したがって熱核のベクトル成分traceの追加因子は

$$
e^{-t(-2q)}+e^{-t(2q)}+1+1
=2+2\cosh(2qt).
$$

ここでの固有値は色モードを複素化した表示で求めていますが、最終的な全色traceでは正負電荷をともに数えます。$e^{\pm2qt}$ の一方が低Landau準位で増大し得るため、一定色磁場には赤外側の不安定モードもあります。**以下で使うのは $t\to0$ の紫外係数だけ**であり、$t\to\infty$ までの収束や一定磁場が安定な真空であることは主張しません。

[QFT29のghost行列式](../QFT29/index.md#prop-qft29-ghost-determinant)はスカラー熱核を負の重みで差し引きます。色モード $q$ 一個あたり、行列式の係数に対応する熱核の組合せは

$$
\begin{aligned}
K_{\mathrm{comb}}(t;q)
&=\frac12K_0(t;q)\bigl(2+2\cosh(2qt)\bigr)-K_0(t;q)\\
&=K_0(t;q)\cosh(2qt)\\
&=\frac1{(4\pi t)^2}\left(1+\frac{11}{6}q^2t^2+O(t^4)\right).
\end{aligned}
$$

最後の係数を分解すると、

$$
\underbrace{\frac12\left(4-\frac46q^2t^2+4q^2t^2\right)}_{\text{ゲージ場}}
\underbrace{\left(-1+\frac16q^2t^2\right)}_{\text{ghost}}
=1+\left(\frac53+\frac16\right)q^2t^2.
$$

ゲージ場が $5/3$、ghostが $1/6$ を担います。ghostを落とすと正しい係数になりません。これらは背景Feynmanゲージでの行列式の分解であり、個別の項をそれぞれ観測可能な確率と解釈するものではありません。

<a id="thm-qft30-one-loop-log"></a>

<!-- formal-statement-start -->
> **定理（純Yang–Millsの一ループ対数係数）**  
> 四次元Euclid空間の物質場を持たない純 $SU(N)$ Yang–Mills理論（$N\ge2$）を背景Feynmanゲージで摂動的に正則化する。背景の曲率二次項に関する一ループ有効作用の紫外対数部分は、背景ゲージ不変な正則化で

$$
\Gamma_{\mathrm{UV}}^{(1)}[\mathcal B]
=-\frac1{4}\frac{11C_A}{3(16\pi^2)}
\log\frac{\Lambda^2}{\mu^2}
\int d^4x\,\mathcal F_{\mu\nu}^a[\mathcal B]
\mathcal F_{\mu\nu}^a[\mathcal B]
$$

> となる。ここで $C_A=N$、$\Lambda$ は紫外カットオフ、$\mu$ は有限の減算尺度である。式は局所的な対数係数についての主張であり、有限部分、$\mathcal F^4$ 以降の項、赤外部分を含めない。
<!-- formal-statement-end -->

### 証明の見取り図

Landau準位から得た $11q^2/6$ を全色モードで足し、$\sum q_r^2=C_Ah^2$ を使います。一定磁場の $\mathcal F_{\mu\nu}^2$ は $2h^2$ なので係数が半分になります。さらに $\log\det$ の固有値表示を熱核積分へ変換すると負号が一つ出ます。

<!-- proof-start -->
### 証明

まず有限次元で固有値 $\lambda>0$ を持つ行列に対し、二つの尺度間の固有値依存部分は

$$
\log\lambda=-\int_0^\infty\frac{dt}{t}
(e^{-t\lambda}-e^{-t})\quad
\text{（規格化定数の選択による差）}
$$

と表せます。実際、$\lambda$ で微分すると右辺は
$\int_0^\infty e^{-t\lambda}dt=1/\lambda$ で、左辺と一致します。ここでは紫外領域 $1/\Lambda^2\le t\le1/\mu^2$ の背景依存項だけを抜き出し、負号付きの熱核積分を使います。零・負の固有値は赤外処方で別扱いとし、短時間の局所係数には影響しません。

一定Cartan背景 $\mathcal F_{12}=hn^aT^a$ で[スカラー熱核](#lem-qft30-scalar-heat-kernel)と上のベクトル因子を合わせると、全色traceの $\mathcal F^2$ 次数は

$$
\sum_r\frac{11}{6}q_r^2
=\frac{11}{6}C_Ah^2
=\frac{11}{12}C_A\,
\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a.
$$

ここで最後の等号は非零成分が $\mathcal F_{12}^a=hn^a$ と $\mathcal F_{21}^a=-hn^a$ の二つだからです。これを $(4\pi t)^{-2}t^2=(16\pi^2)^{-1}$ に掛け、proper-timeの対数を積分して

$$
-\frac{11C_A}{12(16\pi^2)}
\int_{1/\Lambda^2}^{1/\mu^2}\frac{dt}{t}
\int d^4x\,\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a
=-\frac{11C_A}{12(16\pi^2)}
\log\frac{\Lambda^2}{\mu^2}\int d^4x\,\mathcal F^2
$$

を得ます。

最後に、この計算は一定Cartan背景を使いましたが、四次元で二階微分以内・背景ゲージ不変・偶パリティの曲率二次局所項は $\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a$ の形に限られます。従って係数は一般背景の同じ局所演算子の係数を定めます。トポロジカルな $\mathcal F\widetilde{\mathcal F}$ はパリティ奇でこの計算では生成せず、全微分項もここでの係数に関わりません。
<!-- proof-end -->

この計算の利点は、発散の答え $11/3$ がどこから出るかを明示できる点です。ただしLandau背景の紫外係数が普遍的であることには、背景ゲージ不変性と局所性を保つ正則化という仮定が働いています。鋭い運動量カットオフだけを任意に入れて背景Ward恒等式を壊す場合は、そのままこの結論を使えません。

## 6. 裸結合を固定してβ関数へ

一ループの係数が分かったので、[QFT25の固定裸量によるくりこみ群](../QFT25/index.md#def-qft25-rg-functions)を使います。対数発散を裸結合の係数へ吸収し、減算尺度 $\mu$ に依存するくりこみ結合 $g_R(\mu)$ を定めます。

<a id="def-qft30-asymptotic-freedom"></a>

<!-- formal-statement-start -->
> **定義（漸近自由性）**  
> 四次元の無次元くりこみ結合 $g_R(\mu)>0$ が、十分大きなエネルギー尺度 $\mu$ に向かうくりこみ群の摂動的領域で減少し、紫外極限で $g_R(\mu)\to0$ に向かう性質を漸近自由性という。特に $\beta(g_R)=\mu\,dg_R/d\mu$ の小結合での先頭非零係数が負なら、一ループ近似はこの性質を示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft30-asymptotic-freedom -->
**定義の確認**：$b>0$ に対して $dg/d\log\mu=-bg^3$ とすると、$d(g^{-2})/d\log\mu=2b$ です。従って $g^{-2}(\mu)=g^{-2}(\mu_0)+2b\log(\mu/\mu_0)$ となり、$\mu>\mu_0$ で結合は確かに小さくなります。逆に $\beta=+bg^3$ では分母の符号が逆になり、漸近自由性は得られません。
<!-- definition-example-end -->

<a id="thm-qft30-beta-function"></a>

<!-- formal-statement-start -->
> **定理（SU(N)純ゲージ理論の一ループβ関数）**  
> 四次元・物質場なしの純 $SU(N)$（$N\ge2$）Yang–Mills理論で、背景ゲージ不変な正則化とくりこみを採用し、小結合で一ループ精度まで考える。このとき

$$
\beta(g_R)
=\mu\frac{dg_R}{d\mu}
=-\frac{11N}{3}\frac{g_R^3}{16\pi^2}
+O(g_R^5).
$$

> とくに一ループ近似は漸近自由的である。$g_R(\mu_0)$ をある摂動的尺度で与えると

$$
\frac1{g_R^2(\mu)}
=\frac1{g_R^2(\mu_0)}
+\frac{2(11N/3)}{16\pi^2}\log\frac{\mu}{\mu_0}
$$

> が一ループ流の解となる。
<!-- formal-statement-end -->

### 証明の見取り図

一ループ有効作用の $\mathcal F^2$ 係数と裸作用の係数を足し、有限な $1/g_R^2(\mu)$ を定義します。裸結合と紫外カットオフを固定して $\mu$ で微分すれば、対数の微分から正の $d(g_R^{-2})/d\log\mu$ が現れ、$\beta$ の負号へ変わります。

<!-- proof-start -->
### 証明

$b_0=11C_A/3=11N/3$ と置き、[一ループ対数係数](#thm-qft30-one-loop-log)を裸作用へ加えると

$$
\frac14\int\mathcal F^2
\left[\frac1{g_0^2}
-\frac{b_0}{16\pi^2}\log\frac{\Lambda^2}{\mu^2}\right]
$$

となります。有限部分について減算条件を定め、その条件に従う結合を

$$
\frac1{g_R^2(\mu)}
=\frac1{g_0^2}
-\frac{b_0}{16\pi^2}\log\frac{\Lambda^2}{\mu^2}
+O(g_R^2)
$$

で定義します。高次の項を省き、$\Lambda$ と $g_0$ を固定すると

$$
\frac{d}{d\log\mu}\frac1{g_R^2}
=\frac{2b_0}{16\pi^2},\qquad
\frac{d}{d\log\mu}(g_R^{-2})
=-2g_R^{-3}\beta(g_R).
$$

両式を等置し、$-2g_R^{-3}\beta=2b_0/(16\pi^2)$ を解いて定理の負号を得ます。最後の流れの式は $\mu_0$ から $\mu$ まで $d(g_R^{-2})/d\log\mu$ を積分したものです。高次項は純ゲージ理論で次の奇数冪 $O(g_R^5)$ から始まります。
<!-- proof-end -->

**数値を入れた確認。** 純 $SU(3)$ では $b_0=11$ です。例えばある摂動的尺度で $g_R^2(\mu_0)=1$ とすれば、尺度を二倍にしたとき一ループ式は

$$
g_R^2(2\mu_0)
=\frac1{1+\frac{22}{16\pi^2}\log2}
\approx0.912.
$$

一方、低エネルギーへ逆に外挿すると分母は小さくなります。これは強結合になる兆候ですが、分母が零となる点で摂動展開は制御できず、その式だけから閉じ込めや質量ギャップを証明することはできません。

よく使われる $\alpha_s=g_R^2/(4\pi)$ について、正の定数 $\Lambda_{\rm YM}$ を一ループ積分定数として選ぶと、

$$
\frac1{g_R^2(\mu)}
=\frac{b_0}{16\pi^2}\log\frac{\mu^2}{\Lambda_{\rm YM}^2},
\qquad
\alpha_s(\mu)
=\frac{4\pi}{b_0\log(\mu^2/\Lambda_{\rm YM}^2)}
$$

です。ただし右辺を使えるのは対数が十分大きく $g_R^2/(16\pi^2)\ll1$ の摂動領域です。$\Lambda_{\rm YM}$ はこの一ループ方式で定義された尺度で、直接「粒子の質量」と同一視しません。

**なぜQEDと逆か。** 純 $U(1)$ なら構造定数は零なので $C_A=0$、ゲージ場の自己相互作用も非自明なghost相互作用もありません。QEDの正のβ関数は[QFT25で計算した荷電物質ループ](../QFT25/index.md#thm-qft25-qed-beta)によります。純 $SU(N)$ の負のβ関数は非可換ゲージ場自身の量子補正を反映し、荷電物質を加えた理論の係数と無条件に同じではありません。

## 7. 何を示し、何をまだ示していないか

1. **確立した範囲**：形式的摂動論の一ループで、純 $SU(N)$ ゲージ場の $-11N/3$ が得られました。背景場ゲージと一定磁場の熱核で、係数と符号を出発点から確認しました。
2. **近似の範囲**：背景の紫外局所係数を使い、背景ゲージ不変性を前提に一般の $\mathcal F^2$ へ拡張しました。赤外不安定モードや高次ループの効果は計算していません。
3. **物理的帰結の限界**：高エネルギーで結合が弱くなることは、低エネルギーでの閉じ込め・質量ギャップを数学的に証明したことではありません。

次に散乱・ループ・Ward/BRST・くりこみを組み合わせるときは、**どの対象のループを数えたか、どの規約の結合か、どの尺度微分か**を先に固定してください。

## 8. 演習

### 演習 QFT30-A1：結合を接続へ移す

- Level: A
- 問題: $SU(N)$ の実成分 $A_\mu^a$ に対し、$F_{\mu\nu}^a=\partial_\mu A_\nu^a-\partial_\nu A_\mu^a+gf^{abc}A_\mu^bA_\nu^c$、$g>0$ を与える。$\mathcal A_\mu^a=gA_\mu^a$ による $\mathcal F_{\mu\nu}$ と作用 $S_E=\int F^2/4$ の表示を求め、なぜ係数が $1/g^2$ になるか説明せよ。

<!-- solution-start -->
**詳細解答。** 定義式を $g$ 倍して

$$
gF_{\mu\nu}^a=\partial_\mu(gA_\nu^a)-\partial_\nu(gA_\mu^a)
+f^{abc}(gA_\mu^b)(gA_\nu^c)=\mathcal F_{\mu\nu}^a
$$

を得ます。従って $F_{\mu\nu}^aF_{\mu\nu}^a=\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a/g^2$ であり、元の作用は $S_E=(4g^2)^{-1}\int\mathcal F^2$ です。$\mathcal A$ に $g$ を一度吸収したあと、曲率の非線形項へさらに $g$ を挿入してはなりません。
<!-- solution-end -->

### 演習 QFT30-A2：SU(2)の色の二乗和

- Level: A
- 問題: $f^{abc}=\varepsilon^{abc}$ とし、$H=hT^3$（$h>0$）への随伴作用を $(T^1,T^2,T^3)$ 基底で行列表示せよ。固有値と電荷の二乗和を求め、$C_A=2$ と照合せよ。

<!-- solution-start -->
**詳細解答。** $[H,v]^a=h\varepsilon^{a3c}v^c$ です。$(a,c)=(1,2)$ では $\varepsilon^{132}=-1$、$(2,1)$ では $\varepsilon^{231}=1$ なので

$$
\operatorname{ad}H=
\begin{pmatrix}0&-h&0\\ h&0&0\\0&0&0\end{pmatrix},
\quad
\det(\lambda I-\operatorname{ad}H)=\lambda(\lambda^2+h^2).
$$

固有値は $ih,-ih,0$ で、$q_r=(h,-h,0)$ と取れます。$\sum_rq_r^2=h^2+h^2=2h^2=C_Ah^2$ です。色の実次元が3であることから $C_A=3$ としてはいけません。
<!-- solution-end -->

### 演習 QFT30-A3：Landau準位の和

- Level: A
- 問題: 実数 $q\ne0$、$t>0$ に対し、磁場中の横方向の固有値 $|q|(2n+1)$（$n\ge0$）、単位面積あたり縮退度 $|q|/(2\pi)$、自由な残り二方向の熱核 $1/(4\pi t)$ が与えられる。四次元スカラー熱核を求め、$q\to0$ の極限を確認せよ。

<!-- solution-start -->
**詳細解答。** 幾何級数の比は $e^{-2|q|t}<1$ ですから

$$
\sum_{n=0}^\infty e^{-|q|t(2n+1)}
=\frac{e^{-|q|t}}{1-e^{-2|q|t}}
=\frac1{2\sinh(|q|t)}.
$$

縮退度とGaussian因子を掛けて

$$
K_0=\frac{|q|}{2\pi}\frac1{2\sinh(|q|t)}
\frac1{4\pi t}
=\frac1{(4\pi t)^2}\frac{|q|t}{\sinh(|q|t)}.
$$

$\lim_{z\to0}z/\sinh z=1$ なので、$K_0(t;0)=(4\pi t)^{-2}$ に連続につながります。
<!-- solution-end -->

### 演習 QFT30-A4：双曲線関数の係数

- Level: A
- 問題: 実数 $z$ が小さいとき、$(z/\sinh z)\cosh(2z)$ の $z^2$ の係数を求めよ。途中でそれぞれのTaylor級数を表示し、$11/6$ を暗記で使わないこと。

<!-- solution-start -->
**詳細解答。** $z=0$ の展開から

$$
\sinh z=z+\frac{z^3}{6}+O(z^5),\qquad
\cosh(2z)=1+\frac{(2z)^2}{2}+O(z^4)=1+2z^2+O(z^4).
$$

よって $(1+z^2/6+O(z^4))^{-1}=1-z^2/6+O(z^4)$ を使うと

$$
\frac z{\sinh z}\cosh(2z)
=(1-z^2/6+O(z^4))(1+2z^2+O(z^4))
=1+\frac{11}{6}z^2+O(z^4).
$$

積の $z^2$ の係数は $2-1/6=11/6$ です。
<!-- solution-end -->

### 演習 QFT30-A5：βから逆結合の微分

- Level: A
- 問題: $b_0>0$ とし、$\mu\,dg/d\mu=-b_0g^3/(16\pi^2)$、$g>0$ とする。$d(g^{-2})/d\log\mu$ を導き、$\mu>\mu_0$ で $g(\mu)<g(\mu_0)$ を示せ。

<!-- solution-start -->
**詳細解答。** 連鎖律と $d\log\mu=d\mu/\mu$ から

$$
\frac d{d\log\mu}g^{-2}
=-2g^{-3}\frac{dg}{d\log\mu}
=-2g^{-3}\left(-\frac{b_0g^3}{16\pi^2}\right)
=\frac{2b_0}{16\pi^2}>0.
$$

積分すると $g^{-2}(\mu)=g^{-2}(\mu_0)+2b_0\log(\mu/\mu_0)/(16\pi^2)$ です。$\mu>\mu_0$ では右辺が増え、$g>0$ なので $g(\mu)<g(\mu_0)$ です。
<!-- solution-end -->

### 演習 QFT30-B1：背景場のHessianを再導出

- Level: B
- 問題: $\mathcal D_\mu=\partial_\mu+\operatorname{ad}\mathcal B_\mu$、$[\mathcal D_\mu,\mathcal D_\nu]=\operatorname{ad}\mathcal F_{\mu\nu}$ とし、$L_{\mu\nu}=\mathcal D_\mu a_\nu-\mathcal D_\nu a_\mu$ とする。二次式 $\int L^2/4+\int\langle\mathcal F,[a_\mu,a_\nu]\rangle/2$ に $\int(\mathcal D_\mu a_\mu)^2/2$ を加え、二次作用素を導け。境界項は消えると仮定する。

<!-- solution-start -->
**詳細解答。** 最初の項は反対称性により

$$
\frac14\int L^2
=\frac12\int\left[(\mathcal D_\mu a_\nu)^2
-(\mathcal D_\mu a_\nu)(\mathcal D_\nu a_\mu)\right].
$$

$\int(\mathcal D_\mu u)v=-\int u(\mathcal D_\mu v)$ をそれぞれに適用して

$$
\frac14\int L^2
=\frac12\int a_\mu
[-\mathcal D^2\delta_{\mu\nu}+\mathcal D_\nu\mathcal D_\mu]a_\nu.
$$

交換子を一度だけ用いると $\mathcal D_\nu\mathcal D_\mu=\mathcal D_\mu\mathcal D_\nu-\operatorname{ad}\mathcal F_{\mu\nu}$。また完全反対称な $f^{abc}$ の添字を並べ替えれば背景曲率との交差項は

$$
\frac12\int\mathcal F_{\mu\nu}^af^{abc}a_\mu^ba_\nu^c
=-\frac12\int a_\mu\operatorname{ad}(\mathcal F_{\mu\nu})a_\nu.
$$

最後にゲージ固定は $-\int a_\mu\mathcal D_\mu\mathcal D_\nu a_\nu/2$ となるため、$\mathcal D_\mu\mathcal D_\nu$ が相殺します。結論は $\Delta_{1,\mu\nu}=-\mathcal D^2\delta_{\mu\nu}-2\operatorname{ad}\mathcal F_{\mu\nu}$ です。
<!-- solution-end -->

### 演習 QFT30-B2：proper-timeからβ関数の符号へ

- Level: B
- 問題: 四次元の規格化で、$\frac12\operatorname{Tr}e^{-t\Delta_1}-\operatorname{Tr}e^{-t\Delta_0}$ の単位体積あたり曲率二次項が $(16\pi^2)^{-1}(11C_A/12)\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a$ と分かったとする。$\Gamma^{(1)}=\frac12\operatorname{Tr}\log\Delta_1-\operatorname{Tr}\log\Delta_0$ への紫外寄与を計算し、$d(g_R^{-2})/d\log\mu$ の符号を求めよ。裸結合と $\Lambda$ は固定する。

<!-- solution-start -->
**詳細解答。** 対数の熱核表示には負号があるので、紫外範囲を積分した作用の係数は

$$
\Gamma_{\rm UV}^{(1)}
=-\frac{11C_A}{12(16\pi^2)}
\int\mathcal F^2
\int_{1/\Lambda^2}^{1/\mu^2}\frac{dt}{t}
=-\frac{11C_A}{12(16\pi^2)}\log\frac{\Lambda^2}{\mu^2}
\int\mathcal F^2.
$$

$\int\mathcal F^2/4$ をくくると、$g_R^{-2}=g_0^{-2}-[11C_A/(3\cdot16\pi^2)]\log(\Lambda^2/\mu^2)$ です。$\mu$ 微分で $\log\Lambda^2-2\log\mu$ の導関数は $-2$ なので

$$
\frac d{d\log\mu}g_R^{-2}
=\frac{22C_A}{3(16\pi^2)}>0.
$$

従って $\beta(g_R)=-11C_Ag_R^3/[3(16\pi^2)]<0$ となります。作用の紫外対数の負号と、逆結合のスケール微分の正号を取り違えないことが要点です。
<!-- solution-end -->

### 演習 QFT30-B3：SU(3)の随伴電荷を数える

- Level: B
- 問題: $SU(3)$ のCartan方向 $T^3=\operatorname{diag}(1,-1,0)/2$ を使い、背景 $\mathcal F_{12}=hT^3$（$h>0$）を置く。複素化した行列単位 $E_{ij}$（$i\ne j$）および二つの対角traceless生成子に対する $\operatorname{ad}(hT^3)$ の電荷を求め、$\sum_rq_r^2=3h^2$ を検算せよ。

<!-- solution-start -->
**詳細解答。** 対角要素を $t=(1/2,-1/2,0)$ とすると、通常の行列交換子は $[hT^3,E_{ij}]=h(t_i-t_j)E_{ij}$ です。一方、本文の成分表示の実Lie括弧は $[X,Y]^a=f^{abc}X^bY^c$ で、行列交換子の $1/i$ 倍に対応します。従ってその随伴微分の固有値 $iq_r$ には $q_r=-h(t_i-t_j)$ を割り当てればよく、二乗和には $h^2(t_i-t_j)^2$ が寄与します。

$(i,j)=(1,2),(2,1)$ で電荷は $\pm h$、$(1,3),(3,1)$ で $\pm h/2$、$(2,3),(3,2)$ で $\mp h/2$ です。対角の二つは零です。従って

$$
\sum_rq_r^2=2h^2+4\frac{h^2}{4}+0=3h^2.
$$

これは $C_A=N=3$ と一致します。零固有値の色方向も随伴次元8の計数には含みますが、曲率二次の係数には寄与しません。
<!-- solution-end -->

### 演習 QFT30-B4：二つの尺度を比較する

- Level: B
- 問題: 純 $SU(2)$ の一ループ近似で $g_R^2(\mu_0)=1/2$ とする。$g_R^2(4\mu_0)$ の式と、$\alpha_s(\mu_0)/\alpha_s(4\mu_0)$ を求めよ。$\alpha_s=g_R^2/(4\pi)$、$b_0=11N/3$ を用いてよい。

<!-- solution-start -->
**詳細解答。** $N=2$ だから $b_0=22/3$ です。$\mu/\mu_0=4$ の一ループ式へ代入すると

$$
\frac1{g_R^2(4\mu_0)}
=2+\frac{2(22/3)}{16\pi^2}\log4
=2+\frac{11}{12\pi^2}\log4.
$$

従って $g_R^2(4\mu_0)=[2+11\log4/(12\pi^2)]^{-1}$。$\alpha_s$ は同じ比例定数 $1/(4\pi)$ を持つので比から消え、

$$
\frac{\alpha_s(\mu_0)}{\alpha_s(4\mu_0)}
=\frac{g_R^2(\mu_0)}{g_R^2(4\mu_0)}
=\frac12\left(2+\frac{11}{12\pi^2}\log4\right)
=1+\frac{11}{24\pi^2}\log4>1.
$$

数値が1より大きいことは、高い尺度で結合が減るという符号判定にもなります。
<!-- solution-end -->

### 演習 QFT30-C1：SU(2)の一ループ係数を全経路で復元

- Level: C
- 問題: 四次元Euclidの純 $SU(2)$ Yang–Mills理論を考える。背景場Feynmanゲージで、$\mathcal F_{12}=hT^3$（$h>0$）、他成分は零とする。背景随伴色電荷は $q=0,\pm h$ である。

  背景二次作用素と、荷電スカラーの単位四体積あたり熱核を次のように与える。

$$
\begin{aligned}
\Delta_0&=-\mathcal D^2,\qquad
\Delta_{1,\mu\nu}=-\mathcal D^2\delta_{\mu\nu}
-2\operatorname{ad}(\mathcal F_{\mu\nu}),\\
K_0(t;q)&=(4\pi t)^{-2}\frac{|q|t}{\sinh(|q|t)}.
\end{aligned}
$$

  1. ベクトルのLorentz成分traceを求めよ。
  2. ghostを差し引いた曲率二次の短時間係数を全色で求めよ。
  3. $\log\det$ のproper-timeの符号、裸結合との合成、固定裸量微分を順に行い、$\beta(g_R)$ を求めよ。
  4. ghostを誤って落とした場合の係数と、赤外外挿から閉じ込めを証明できない理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

**(1)** 色電荷 $q$ の固有空間では $\operatorname{ad}(\mathcal F_{12})$ の固有値は $iq$ です。ベクトル添字の $(1,2)$ の部分行列は固有値 $\pm2q$、$(3,4)$ は零を与えます。よって

$$
\operatorname{tr}_4e^{-t(-2\operatorname{ad}\mathcal F_{\mu\nu})}
=e^{2qt}+e^{-2qt}+2=2+2\cosh(2qt).
$$

**(2)** ボース場の重みは $1/2$、Grassmann対は $-1$ なので

$$
\frac12K_1-K_0
=K_0\left[\frac12(2+2\cosh(2qt))-1\right]
=K_0\cosh(2qt).
$$

短時間では $K_0=(4\pi t)^{-2}(1-q^2t^2/6+O(t^4))$、$\cosh(2qt)=1+2q^2t^2+O(t^4)$。従って一色あたり $(4\pi t)^{-2}[1+(11/6)q^2t^2+O(t^4)]$ です。$q=\pm h$ は二つ、$q=0$ は曲率二次項に寄与しないので、全色の係数は

$$
\frac{11}{6}(h^2+h^2)=\frac{11}{3}h^2
=\frac{11C_A}{12}\mathcal F_{\mu\nu}^a\mathcal F_{\mu\nu}^a,
$$

$C_A=2$、$\mathcal F^2=2h^2$ と一致します。

**(3)** $\log\det$ は熱核の負のproper-time積分です。曲率二次の紫外部分は

$$
\Gamma^{(1)}_{\rm UV}
=-\frac{11}{3}\frac{h^2}{16\pi^2}
\log\frac{\Lambda^2}{\mu^2}\,V_4
=-\frac14\frac{22/3}{16\pi^2}
\log\frac{\Lambda^2}{\mu^2}
\int d^4x\,\mathcal F^2,
$$

ここで $V_4$ は四体積です。裸作用と合わせて

$$
\frac1{g_R^2(\mu)}
=\frac1{g_0^2}-\frac{22/3}{16\pi^2}\log\frac{\Lambda^2}{\mu^2},
\qquad
\frac d{d\log\mu}g_R^{-2}=\frac{44/3}{16\pi^2}.
$$

$d(g_R^{-2})/d\log\mu=-2\beta/g_R^3$ を代入すると

$$
\beta(g_R)=-\frac{22}{3}\frac{g_R^3}{16\pi^2}
+O(g_R^5)
$$

です。

**(4)** ghostを捨てると、荷電一色あたりの $q^2t^2$ 係数はベクトル側の $5/3$ だけとなり、正しい $11/6$ と異なります。$SU(2)$ の $h^2$ の係数は $2(5/3)=10/3$ となり、曲率二次項へ直すと誤った $b_0=20/3$ になります。赤外で一ループ分母が小さくなることは結合の増大を示唆しますが、その領域は高次補正が抑えられません。閉じ込め・質量ギャップは非摂動的主張なので、そこで破綻する一ループ外挿だけでは証明できません。
<!-- solution-end -->

## 9. 学びの整理

- [背景場二次作用素](#prop-qft30-quadratic-action)はゲージ場のスピン混合項とghostを両方含みます。
- [一定磁場の熱核](#lem-qft30-scalar-heat-kernel)はLandau準位と縮退度の二つから導けます。
- [一ループ対数](#thm-qft30-one-loop-log)の $11/3$ は、色モードあたりの $5/3+1/6=11/6$ と $\mathcal F^2=2h^2$ から生じます。
- [β関数の負号](#thm-qft30-beta-function)は裸結合固定の尺度微分から確定します。
- 漸近自由性と、赤外の閉じ込め・質量ギャップの証明は別の問題です。

