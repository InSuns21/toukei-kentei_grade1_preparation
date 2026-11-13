# AQFT26 Rindler wedgeとboostの解析性

[AQFT25の一般モジュラーKMS定理](../AQFT25/index.md#thm-aqft25-modular-kms)では、巡回・分離的真空に付随するモジュラー流が逆温度1のKMS条件を満たすと分かりました。しかしその流れが**時空のどんな運動に相当するか**は未解決です。本講では、右Rindler wedge内の自由スカラー場について、Lorentz boostを複素数のrapidityへ延長し、二点関数の解析帯の幅がなぜ $2\pi$ になるかを検算します。

計量は $(-,+,+,+)$、$c=\hbar=1$ とし、**最初は質量 $m>0$ の実Klein–Gordon自由場のMinkowski真空**だけを対象にします。点場 $\phi(x)$ は作用素値分布であり、二点関数に点 $x,y$ を書くときは分布核の記法です。実際の演算子は実試験関数 $f\in C_c^\infty(M,\mathbb R)$ で平滑化した $\phi(f)$ を使います。自由場での二点関数の解析性と、wedgeのvon Neumann環のモジュラー流の同定は**別の結論**です。後者を証明するのが次のAQFT27です。

## 1. なぜwedgeを動かすのにrapidityがよいか

[右・左wedgeの定義](../AQFT1/index.md#def-aqft1-wedges)を振り返ると、$W_R=\{x^1>|x^0|\}$ は非有界ですが、時間軸方向の並進では不変でありません。代わりに、時間と $x^1$ を混合するLorentz変換なら境界の光線を保てます。rapidity $s$ は速度そのものではなく、合成すると**加法**になる実パラメータです。

<a id="def-aqft26-boost"></a>

<!-- formal-statement-start -->
> **定義（右wedgeを保つLorentz boost）**  
> $M=\mathbb R^{1,3}$ に計量 $\eta=\operatorname{diag}(-1,1,1,1)$ を入れる。$s\in\mathbb R$ に対し $x=(x^0,x^1,x^2,x^3)$ の $(0,1)$ 成分だけを
>
$$
\Lambda(s)
\begin{pmatrix}x^0\\x^1\end{pmatrix}
=
\begin{pmatrix}\cosh s&\sinh s\\\sinh s&\cosh s\end{pmatrix}
\begin{pmatrix}x^0\\x^1\end{pmatrix}
$$
>
> で変換し、$x^2,x^3$ を固定する。$s$ をboostのrapidityとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft26-boost -->
### 直接例：光円錐座標で全条件を確認

$u=x^1+x^0,\ v=x^1-x^0$ と置くと、定義式を加減して
$$
u'=e^s u,\qquad v'=e^{-s}v.
$$
$e^{\pm s}>0$ なので $u,v>0$（すなわち $x^1>|x^0|$）が保たれます。また
$$
-(x'^0)^2+(x'^1)^2=u'v'=uv=-(x^0)^2+(x^1)^2.
$$
したがって計量を保存し、$\Lambda(s)\Lambda(r)=\Lambda(s+r)$、逆元は $\Lambda(-s)$ です。例えば $(x^0,x^1)=(0,2)$ は $(2\sinh s,2\cosh s)$ へ動き、$2\cosh s>|2\sinh s|$ だから任意の実 $s$ で右wedge内にあります。
<!-- definition-example-end -->

<a id="prop-aqft26-boost-wedge"></a>

<!-- formal-statement-start -->
> **命題（boostの群法則とwedge保存）**  
> 上の $\Lambda(s)$ は固有時向きLorentz変換の一パラメータ群であり、任意の $s,r\in\mathbb R$ について
>
$$
\Lambda(s+r)=\Lambda(s)\Lambda(r),\quad
\Lambda(s)W_R=W_R,\quad\Lambda(s)W_L=W_L.
$$
<!-- formal-statement-end -->

### 証明の見取り図

光円錐座標の二つの正の倍率だけで群法則と両wedgeの保存を確認します。計量保存も $uv$ の不変性です。

<!-- proof-start -->
### 証明

$u$ と $v$ はそれぞれ $e^s,e^{-s}$ 倍なので、二回作用させると $e^{s+r},e^{-(s+r)}$ 倍になります。これは $\Lambda(s+r)$ の作用と一致します。また $W_R$ は $u,v>0$、$W_L$ は $u,v<0$ です。両倍率は正であり、逆元 $\Lambda(-s)$ があるので、単なる包含でなく両集合の像の等号が得られます。$\det\Lambda(s)=\cosh^2s-\sinh^2s=1$ で、時間向きは連続変形 $\Lambda(0)=I$ から保たれます。計量は $(x^1)^2-(x^0)^2=uv$ と横方向の二乗和の和だから不変です。
<!-- proof-end -->

## 2. Rindler座標で「時間」がどこにあるかを見る

右wedgeでは $x^1>|x^0|$ なので $(x^1)^2-(x^0)^2>0$。そこでその正の平方根を $\rho$ とし、boostに沿った時間座標を $\eta$ とします。変換式を先に導けば、座標がどこで定義できるかが明瞭です。

<a id="def-aqft26-rindler"></a>

<!-- formal-statement-start -->
> **定義（右wedgeのRindler座標）**  
> $W_R\subset\mathbb R^{1,3}$ 上で、$\rho>0,\ \eta\in\mathbb R,\ y=(x^2,x^3)\in\mathbb R^2$ によって
>
$$
x^0=\rho\sinh\eta,\qquad
x^1=\rho\cosh\eta,\qquad
(x^2,x^3)=y
$$
>
> と表示した $(\eta,\rho,y)$ をRindler座標という。$\eta$ がRindler時間、$\rho$ がwedge頂点からの双曲線半径である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft26-rindler -->
### 直接例：逆変換・範囲・boostを検査

$(x^1)^2-(x^0)^2=\rho^2$ なので $\rho=\sqrt{(x^1)^2-(x^0)^2}>0$。さらに $x^0/x^1=\tanh\eta$ で、$|x^0/x^1|<1$ より $\eta=\operatorname{artanh}(x^0/x^1)$ が実数として一意に定まります。逆に $\cosh\eta>|\sinh\eta|$ なので任意の $\rho>0,\eta\in\mathbb R$ は $W_R$ の点を与えます。$\Lambda(s)$ の加法公式を代入すれば
$$
\Lambda(s):(\eta,\rho,y)\longmapsto(\eta+s,\rho,y).
$$
従って $\rho$ が固定された世界線ではrapidityはこの座標の時間移動そのものです。
<!-- definition-example-end -->

<a id="prop-aqft26-metric-acceleration"></a>

<!-- formal-statement-start -->
> **命題（Rindler計量・固有時・固有加速度）**  
> 上のRindler座標における計量と、$\rho=\rho_0>0,\ y=y_0$ の世界線に沿う固有時 $\tau$ および固有加速度の大きさ $a$ は
>
$$
ds^2=-\rho^2d\eta^2+d\rho^2+dy_1^2+dy_2^2,\qquad
d\tau=\rho_0\,d\eta,\qquad a=\rho_0^{-1}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\eta$ と $\rho$ で偏微分し、時間・空間微分の二乗の差を取ります。その後 $\rho_0$ の双曲線を固有時で二回微分します。

<!-- proof-start -->
### 証明

座標変換を微分すると
$$
dx^0=\sinh\eta\,d\rho+\rho\cosh\eta\,d\eta,\quad
dx^1=\cosh\eta\,d\rho+\rho\sinh\eta\,d\eta.
$$
二乗を引くと、混合項の係数は $-2\rho\sinh\eta\cosh\eta+2\rho\sinh\eta\cosh\eta=0$、$d\rho^2$ の係数は $\cosh^2\eta-\sinh^2\eta=1$、$d\eta^2$ の係数は $\rho^2(\sinh^2\eta-\cosh^2\eta)=-\rho^2$ です。横方向は変わりません。

固定 $\rho_0,y_0$ に沿って $ds^2=-\rho_0^2d\eta^2=-d\tau^2$、未来向きに $d\tau=\rho_0d\eta$。従って
$$
X(\tau)=\bigl(\rho_0\sinh(\tau/\rho_0),
\rho_0\cosh(\tau/\rho_0),y_0\bigr),
$$
$$
\dot X=\bigl(\cosh(\tau/\rho_0),\sinh(\tau/\rho_0),0,0\bigr),\quad
\ddot X=\rho_0^{-1}\bigl(\sinh(\tau/\rho_0),\cosh(\tau/\rho_0),0,0\bigr).
$$
$\eta(\dot X,\dot X)=-1$、$\eta(\ddot X,\ddot X)=\rho_0^{-2}$ であるから、加速度の大きさは $\sqrt{\eta(\ddot X,\ddot X)}=\rho_0^{-1}$ です。
<!-- proof-end -->

**境界の意味。** $\rho=0$ はこの座標表示の範囲外です。時空がそこで曲がるわけではありません。固定加速度の軌道の固有時と、全右wedge共通の無次元rapidityを取り違えないでください。

## 3. 自由場の二点関数を複素boostへ延長する

[AQFT8の自由場真空二点形式](../AQFT8/index.md#def-aqft8-vacuum-two-point)を分布核で書き直します。$p^0=\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ と置き、
$$
W_m(x,y)=\langle\Omega,\phi(x)\phi(y)\Omega\rangle
=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}\,
e^{-i\omega_{\boldsymbol p}(x^0-y^0)+i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}.
$$
これは実時間では一般に通常の絶対収束積分ではなく分布です。いったん $x^0-y^0$ を $x^0-y^0-i\varepsilon$（$\varepsilon>0$）にずらせば質量殻で $e^{-\varepsilon\omega_{\boldsymbol p}}$ が掛かり収束します。この**負の虚時間**の向きが以下の帯を決めます。

質量殻の縦運動量を $p^1=\mu_\perp\sinh\theta$、$\omega_{\boldsymbol p}=\mu_\perp\cosh\theta$、$\mu_\perp=\sqrt{m^2+|\boldsymbol p_\perp|^2}$ と置くと
$$
\frac{dp^1}{2\omega_{\boldsymbol p}}=\frac{d\theta}{2},\qquad
\cosh\theta\,\sinh\eta-\sinh\theta\,\cosh\eta
=\sinh(\eta-\theta).
$$
したがって運動量のrapidityと点のRindler時間は差で現れます。ただし、単に積分変数 $\theta$ を複素平行移動するだけでは帯全体の収束を保証できません。次に分布を解析関数として表示します。

<a id="lem-aqft26-bessel-kernel"></a>

<!-- formal-statement-start -->
> **補題（自由場二点核の解析表示）**  
> $m>0$ とし、$a>0$、$r\in\mathbb R^3$、$R=\sqrt{a^2+|r|^2}$ とする。第二種変形Bessel関数 $K_1$ を
>
$$
K_1(w)=\frac w4\int_0^\infty u^{-2}
\exp\left(-u-\frac{w^2}{4u}\right)\,du\qquad(w>0)
$$
>
> で定める。このとき
>
$$
\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3\,2\omega_{\boldsymbol p}}
e^{-a\omega_{\boldsymbol p}+i\boldsymbol p\cdot r}
=\frac{m}{4\pi^2R}K_1(mR).
$$
>
> 右辺は $R=\sqrt D$ の主値枝 $\operatorname{Re}\sqrt D>0$ を選ぶことで、$D\in\mathbb C\setminus(-\infty,0]$ に正則に延長される。
<!-- formal-statement-end -->

### 証明の見取り図

$1/(2\omega)$ と指数減衰をGaussian積分に直してから、運動量を先に積分します。残る一変数積分が $K_1$ の表示になります。

<!-- proof-start -->
### 証明

Gaussianの積分表示（$b>0,a>0$）
$$
\frac{e^{-a\sqrt b}}{2\sqrt b}
=\frac1{2\sqrt\pi}\int_0^\infty
u^{-1/2}e^{-bu-a^2/(4u)}\,du
$$
は、右辺の変数を $u=v^2$ としたGaussian積分、またはその $a$ 微分から確かめられます。$b=|\boldsymbol p|^2+m^2$ と置き、$a>0$ による可積分性から積分順序を交換すると
$$
\begin{aligned}
I(a,r)
&=\frac1{2\sqrt\pi}\int_0^\infty du\,u^{-1/2}
e^{-m^2u-a^2/(4u)}
\int\frac{d^3p}{(2\pi)^3}e^{-u|\boldsymbol p|^2+i\boldsymbol p\cdot r}\\
&=\frac1{16\pi^2}\int_0^\infty du\,u^{-2}
e^{-m^2u-(a^2+|r|^2)/(4u)}.
\end{aligned}
$$
ここで内側の三次元Gaussianは $(4\pi u)^{-3/2}e^{-|r|^2/(4u)}$ です。$v=m^2u$ と変数変換すれば
$$
I(a,r)=\frac{m^2}{16\pi^2}\int_0^\infty
v^{-2}e^{-v-(mR)^2/(4v)}\,dv
=\frac{m}{4\pi^2R}K_1(mR).
$$
最後は定義式の係数を代入したものです。$D$ が負の実軸を避けるとき主値平方根は正則で、$K_1$ は右半平面で正則なので合成も正則です。実の $a>0$ における等式から、虚時間の小さな変化に対する等式は解析接続で保たれます。
<!-- proof-end -->

ここから $a=\varepsilon+i(x^0-y^0)$ とすれば $R^2=|\boldsymbol x-\boldsymbol y|^2-(x^0-y^0-i\varepsilon)^2$ です。$K_1$ の表示は、**同じ二点分布の複素時空側から見た表示**であって、別の真空を選んだわけではありません。

## 4. なぜ解析帯がちょうど $2\pi$ か

$x,y\in W_R$ をRindler座標 $(\eta_x,\rho_x,x_\perp)$、$(\eta_y,\rho_y,y_\perp)$ で記します。実 $s$ による $x$ のboostを複素数 $z$ に拡張したとき、二点間の複素化したMinkowski二乗間隔は
$$
D_{x,y}(z)=\rho_x^2+\rho_y^2+|x_\perp-y_\perp|^2
-2\rho_x\rho_y\cosh(\eta_x+z-\eta_y).
$$
ここでは $\Lambda(z)$ は複素数成分の行列を代入した**解析計算上の写像**です。$z$ が実数でないとき、実Minkowski時空上のLorentz変換、ましてユニタリ時間発展だと主張していません。

<a id="def-aqft26-boost-strip"></a>

<!-- formal-statement-start -->
> **定義（wedge二点関数の複素boost帯）**  
> $m>0$、$x,y\in W_R$、$z\in\mathbb C$ について、開帯
>
$$
\mathcal S_-=\{z:-2\pi<\operatorname{Im}z<0\}
$$
>
> 上の関数を、主値平方根を用いて
>
$$
\mathcal G_{x,y}(z)=
\frac{m}{4\pi^2\sqrt{D_{x,y}(z)}}
K_1\!\left(m\sqrt{D_{x,y}(z)}\right)
$$
>
> と置く。点 $x,y$ についての値は解析表示の核であり、境界の場の積は平滑化後に分布の意味で読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft26-boost-strip -->
### 直接例：同じ軌道上の二点

$x=(0,\rho,0,0)$、$y=x$ と取ると $D_{x,x}(z)=2\rho^2(1-\cosh z)=-4\rho^2\sinh^2(z/2)$ です。$z=-i\pi$ なら $D=4\rho^2>0$、$z=-i\pi/2$ なら $D=2\rho^2>0$。どちらも平方根の主値枝で正則に定義できます。一方、$z=0$ と $z=-2\pi i$ は $D=0$ で点場の短距離特異性に当たります。**開帯の内部で解析関数として扱えること**と**境界で分布として扱う必要があること**を区別します。
<!-- definition-example-end -->

<a id="thm-aqft26-strip-analyticity"></a>

<!-- formal-statement-start -->
> **定理（自由スカラー場のwedge二点核の解析帯）**  
> $m>0$ とし、実自由Klein–Gordon場のMinkowski真空を取る。任意の $x,y\in W_R$ について、上の $D_{x,y}(z)$ は $z\in\mathcal S_-$ で $(-\infty,0]$ に属さず、$\mathcal G_{x,y}$ は $\mathcal S_-$ で正則である。実 $s$ について、その二つの境界値は分布の意味で
>
$$
\begin{aligned}
\mathcal G_{x,y}(s-i0)
 &=W_m(\Lambda(s)x,y),\\
\mathcal G_{x,y}(s-2\pi i+i0)
 &=W_m(y,\Lambda(s)x).
\end{aligned}
$$
>
> となる。境界値は任意の $f,g\in C_c^\infty(W_R)$ で両点を平滑化して解釈できる。
<!-- formal-statement-end -->

### 証明の見取り図

帯の内部で枝切りへ当たらない理由は $\cosh(A-iv)$ の虚部にあります。幅 $2\pi$ だけ下げると $\cosh$ の値は元に戻りますが、**負の実軸への接近方向が反転**するため、同じ積ではなく場の積の順序が逆になります。ここが単なる周期関数の議論との違いです。

<!-- proof-start -->
### 証明

$z=s-iv$、$0<v<2\pi$、$A=\eta_x+s-\eta_y$ と書きます。$h=\rho_x^2+\rho_y^2+|x_\perp-y_\perp|^2$ とすると
$$
\begin{aligned}
D_{x,y}(s-iv)
 &=h-2\rho_x\rho_y(\cosh A\cos v-i\sinh A\sin v),\\
\operatorname{Im}D_{x,y}(s-iv)
 &=2\rho_x\rho_y\sinh A\sin v.
\end{aligned}
$$
$\sin v\neq0$ かつ $A\neq0$ なら虚部は非零です。虚部が零になる残りの場合を直接調べます。$A=0$ なら
$$
D=(\rho_x-\rho_y)^2+|x_\perp-y_\perp|^2
+2\rho_x\rho_y(1-\cos v)>0
$$
であり、$v=\pi$ なら
$$
D=\rho_x^2+\rho_y^2+|x_\perp-y_\perp|^2
+2\rho_x\rho_y\cosh A>0.
$$
従って $D$ は切断集合に到達しません。[二点核の解析表示](#lem-aqft26-bessel-kernel)から $\mathcal G$ の正則性が従います。

境界の向きも確認します。$v\downarrow0$ のとき
$$
\operatorname{Im}D=2\rho_x\rho_y\,v\sinh A+O(v^3).
$$
実の二点間隔 $D(s)$ が負なら二点は時間的に分離しています。ここで $A$ の符号は、boostした点 $\Lambda(s)x$ が $y$ より未来か過去かを指定します。

その理由をRindler計量で確かめます。$\eta$ を一定にした断面は空間的です。wedge内の未来向き因果曲線では
$
ds^2=-\rho^2d\eta^2+d\rho^2+dy_1^2+dy_2^2\le0
$
かつ時間向きの条件から $d\eta>0$ となります。したがって $v\downarrow0$ からの境界値は、質量殻積分に挿入した負の虚時間 $x^0-y^0-i0$ と同じ方向を選びます。[AQFT8のWightman核](../AQFT8/index.md#thm-aqft8-wightman-match)で用いた場の順序が得られます。

他方、$v\uparrow2\pi$ として $v=2\pi-\varepsilon$ と置くと、$\sin v=-\varepsilon+O(\varepsilon^3)$ なので
$$
\operatorname{Im}D=-2\rho_x\rho_y\,\varepsilon\sinh A+O(\varepsilon^3).
$$
$\cosh(A-2\pi i)=\cosh A$ で実部は元へ戻りますが、負の実軸を**反対側から**たどります。自由実スカラーの二点核の交換順序を逆にすると、Fourier表示の指数が複素共役に変わり、時間的間隔の $i0$ の符号が反転します。よって第二境界値は $W_m(y,\Lambda(s)x)$ です。空間的な二点では両境界値は一致し、これは自由場の局所可換性とも整合します。

最後に点場は分布なので境界での式は点ごとの有限値を意味しません。二つのコンパクト支持試験関数を掛けて積分し、負の虚時間側の質量殻積分の境界値とその逆順の境界値を取ります。実パラメータ $s$ での試験関数のboostは滑らかに変化し、Wightman分布はその作用に連続です。この操作で上の二つの分布的境界式が保たれます。
<!-- proof-end -->

**$i\pi$ と $2\pi i$ の役割。** $\cosh(z-i\pi)=-\cosh z$、$\sinh(z-i\pi)=-\sinh z$ なので、$(x^0,x^1)$ を同時に反転させ、右wedgeの点を左wedge側へ送ります。$\cosh(z-2\pi i)=\cosh z$ はその二倍ですが、解析関数は枝を通ったことを記憶し、二点関数の**順序交換**が残ります。したがって $2\pi$ は「実時間が周期的」という意味ではありません。

## 5. KMSの符号に接続する

真空は[AQFT8のPoincaré不変性](../AQFT8/index.md#thm-aqft8-vacuum-spectrum)を持ちます。実試験関数 $f$ について $f_s(x)=f(\Lambda(-s)x)$ とし、場の共変性から $\alpha_s(\phi(f))=\phi(f_s)$ と書きます。これは**非有界場に対する記法**であり、局所Weyl代数上の自己同型と同じ作用を表しますが、$\phi(f)$ そのものはC*環の有界元ではありません。

<a id="cor-aqft26-two-point-kms"></a>

<!-- formal-statement-start -->
> **系（自由場二点関数のboost–KMS境界）**  
> $m>0$ の実Klein–Gordon自由場のMinkowski真空と $f,g\in C_c^\infty(W_R,\mathbb R)$ を取る。$\mathcal G_{f,g}(z)$ を[前定理](#thm-aqft26-strip-analyticity)の核の二重平滑化とする。このとき $-2\pi<\operatorname{Im}z<0$ で解析的であり、両境界は
>
$$
\begin{aligned}
\mathcal G_{f,g}(s-i0)
 &=\omega_{\mathrm{vac}}(\alpha_s(\phi(f))\phi(g)),\\
\mathcal G_{f,g}(s-2\pi i+i0)
 &=\omega_{\mathrm{vac}}(\phi(g)\alpha_s(\phi(f))).
\end{aligned}
$$
>
> $t=-s/(2\pi)$ と書き換えると、$\sigma_t^{\mathrm{geom}}:=\alpha_{-2\pi t}$ に対する上側帯 $0<\operatorname{Im}t<1$ の二点KMS境界式になる。これは**二点関数の主張**であり、$\sigma_t^{\mathrm{geom}}$ がwedge環のモジュラー流そのものであることはまだ主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

二点核を試験関数で積分してから、$z=-2\pi t$ と変数変換します。符号を逆にすると上側帯は下側帯へ移り、前講のKMS規約と食い違います。

<!-- proof-start -->
### 証明

$f,g$ を実とし、$\mathcal G_{f,g}(z)=\int f(x)g(y)\mathcal G_{x,y}(z)\,d^4x\,d^4y$ と置きます。$x,y$ の支持はともに右wedgeのコンパクト部分集合にあり、$\rho_x,\rho_y$ は正の下限を持つので、開帯の任意のコンパクト部分では前定理の核とその $z$ 微分が一様に有界です。従って積分と複素微分を交換でき、$\mathcal G_{f,g}$ は正則です。境界では前定理の分布的収束を使い、$\Lambda(s)$ のJacobianが1であることから
$$
\begin{aligned}
\int f(x)g(y)W_m(\Lambda(s)x,y)\,dx\,dy
&=\omega_{\mathrm{vac}}(\phi(f_s)\phi(g)),\\
\int f(x)g(y)W_m(y,\Lambda(s)x)\,dx\,dy
&=\omega_{\mathrm{vac}}(\phi(g)\phi(f_s)).
\end{aligned}
$$
これらが二つの境界式です。$t\mapsto z=-2\pi t$ は $\operatorname{Im}t\in(0,1)$ を $\operatorname{Im}z\in(-2\pi,0)$ へ写し、$t+i$ は $z-2\pi i$ に対応します。よって
$$
F_{f,g}(t)=\mathcal G_{f,g}(-2\pi t)
$$
は実軸で $\omega_{\mathrm{vac}}(\sigma_t^{\mathrm{geom}}(\phi(f))\phi(g))$、高さ1の上端で $\omega_{\mathrm{vac}}(\phi(g)\sigma_t^{\mathrm{geom}}(\phi(f)))$ を与えます。

閉帯の有界性も平滑化した場では確認できます。実軸の値は真空不変性とCauchy–Schwarzにより
$$
|\omega_{\mathrm{vac}}(\phi(f_s)\phi(g))|
\le\|\phi(f)\Omega\|\,\|\phi(g)\Omega\|,
$$
上端も同じ評価を持ちます。質量 $m>0$、wedge内のコンパクトな支持に対して核は $|\operatorname{Re}z|\to\infty$ で一様に減衰します（$D_{x,y}(z)$ の絶対値は固定支持上で指数的に増大し、$K_1(m\sqrt D)/\sqrt D$ は主値枝の閉部分帯で減衰します）。境界の有限範囲ではWightman分布の平滑化が連続なので、帯の最大値原理を有限長矩形へ適用し、その長さを無限にすれば内部にも同じ上界が及びます。こうして平滑化された二点相関に必要な有界な閉帯延長が得られます。
<!-- proof-end -->

**一般KMS定理との関係。** [AQFT25の上側帯KMS定理](../AQFT25/index.md#thm-aqft25-modular-kms)は、すでに分かっているモジュラー流に対して全ての有界演算子の相関を扱います。本講は逆に、自由場の幾何学的boostについて**二点相関の**解析性を直接求めました。Gaussianの高次相関やWeyl作用素、標準実部分空間、作用素の定義域まで進んで初めて、幾何学的流とTomita–Takesakiの流を一致させられます。それが次講の仕事です。

## 6. 質量ゼロの極限で $2\pi$ をもう一度検算

前節は $m>0$ で議論しましたが、公式の符号を検算するために4次元の**質量ゼロ**自由場の二点核の極限を取ります。$wK_1(w)\to1$（$w\downarrow0$）だから、枝を保ったまま
$$
\lim_{m\downarrow0}\frac{m}{4\pi^2\sqrt D}K_1(m\sqrt D)
=\frac1{4\pi^2D}.
$$
固定した $\rho>0$、横方向一定の軌道 $X(\eta)=(\rho\sinh\eta,\rho\cosh\eta,y)$ では
$$
D_{X(0),X(0)}(z)=-4\rho^2\sinh^2(z/2),
$$
従って
$$
\mathcal G_0(z)=-\frac1{16\pi^2\rho^2\,\sinh^2(z/2)},
\qquad -2\pi<\operatorname{Im}z<0.
$$
例えば $z=-i\pi$ では $\sinh(-i\pi/2)=-i$ だから $\mathcal G_0(-i\pi)=1/(16\pi^2\rho^2)>0$。この値は直接 $D=4\rho^2$ に代入したものと一致します。

軌道上の固有時間を $\tau=\rho\eta$、加速度を $a=1/\rho$ とすると
$$
\mathcal G_0(\Delta\tau)
=-\frac{a^2}{16\pi^2}
\left[\sinh^2\!\left(\frac{a(\Delta\tau-i0)}2\right)\right]^{-1}.
$$
その解析帯の高さは $\beta_{\mathrm{proper}}=2\pi/a$ であり、単位を戻す前の自然単位では $T=a/(2\pi)$ に対応します。**これは同じ点場の軌道制限における二点相関の熱的解析性**であり、検出器の遷移率や任意の局所netについての結果を自動的に証明するものではありません。また点場の軌道制限は特異性を持つため、測定可能な相関は適切な平滑化や検出器の結合を通じて理解します。

## 7. 演習と詳細解答

### Level A：幾何・符号・規格化を個別に確認する

<a id="ex-aqft26-a01"></a>
#### AQFT26-A01 光円錐座標とboost

- Level: A
- 問題：$u=x^1+x^0$、$v=x^1-x^0$ と置く。$\Lambda(s)$ が $u'=e^su,\ v'=e^{-s}v$ を満たすことを行列から導き、$W_R$ と $W_L$ がそれぞれ不変であることを示せ。

<!-- solution-start -->
**詳細解答。** 行列から $x'^1+x'^0=(\cosh s+\sinh s)(x^1+x^0)=e^s u$。差については $x'^1-x'^0=(\cosh s-\sinh s)(x^1-x^0)=e^{-s}v$。$W_R$ は $u,v>0$、$W_L$ は $u,v<0$ で、正の倍率では符号が変わらない。$\Lambda(-s)$ も同じ性質を持ち、両方向の包含から像は元の集合と等しい。
<!-- solution-end -->

<a id="ex-aqft26-a02"></a>
#### AQFT26-A02 Rindler計量と固有時

- Level: A
- 問題：$x^0=\rho\sinh\eta,\ x^1=\rho\cosh\eta$ を微分し、計量の $d\rho\,d\eta$ の項が消えることを示せ。$\rho=3$ の軌道で $d\tau/d\eta$ と加速度の大きさを求めよ。

<!-- solution-start -->
**詳細解答。** $dx^0=\sinh\eta\,d\rho+\rho\cosh\eta\,d\eta$、$dx^1=\cosh\eta\,d\rho+\rho\sinh\eta\,d\eta$。混合係数は $-2\rho\sinh\eta\cosh\eta+2\rho\cosh\eta\sinh\eta=0$ で、二乗項は $d\rho^2-\rho^2d\eta^2$。$\rho=3$ なら $ds^2=-9d\eta^2=-d\tau^2$ より $d\tau/d\eta=3$、[固有加速度の命題](#prop-aqft26-metric-acceleration)に $\rho_0=3$ を代入して $a=1/3$。
<!-- solution-end -->

<a id="ex-aqft26-a03"></a>
#### AQFT26-A03 複素半周と全周

- Level: A
- 問題：$\Lambda(-i\pi)$ と $\Lambda(-2\pi i)$ の $(0,1)$ 成分行列を求め、どちらが右wedgeから左wedgeへの符号反転に対応するか説明せよ。これらを実Lorentz変換の時間発展と見なしてよいか。

<!-- solution-start -->
**詳細解答。** $\cosh(-i\pi)=\cos\pi=-1$、$\sinh(-i\pi)=-i\sin\pi=0$ なので $\Lambda(-i\pi)|_{01}=-I_2$。$\cosh(-2\pi i)=\cos2\pi=1$、$\sinh(-2\pi i)=0$ なので $\Lambda(-2\pi i)|_{01}=I_2$。前者は $(x^0,x^1)\mapsto(-x^0,-x^1)$ で右を左へ移し、後者は座標を元へ戻す。複素 $s$ の途中の点は一般に複素座標となり、実Lorentz群の連続的時間運動でも実時刻のユニタリ作用でもない。二点関数の順序は解析接続の境界方向に依存するので、最終行列が恒等でも境界値が同じ積とは限らない。
<!-- solution-end -->

<a id="ex-aqft26-a04"></a>
#### AQFT26-A04 質量ゼロ軌道の中心値

- Level: A
- 問題：質量ゼロの同一Rindler軌道の核 $\mathcal G_0(z)=-[16\pi^2\rho^2\sinh^2(z/2)]^{-1}$ に $z=-i\pi$ を代入し、$D=4\rho^2$ の式からの値と一致することを確認せよ。

<!-- solution-start -->
**詳細解答。** $\sinh(-i\pi/2)=-i$ だから $\sinh^2(-i\pi/2)=-1$。よって $\mathcal G_0(-i\pi)=-1/(16\pi^2\rho^2(-1))=1/(16\pi^2\rho^2)$。他方 $D=2\rho^2(1-\cosh(-i\pi))=2\rho^2(1-(-1))=4\rho^2$。$1/(4\pi^2D)=1/(16\pi^2\rho^2)$ で一致する。
<!-- solution-end -->

### Level B：解析帯を再構成する

<a id="ex-aqft26-b01"></a>
#### AQFT26-B01 質量殻のrapidity積分

- Level: B
- 問題：$m>0$、$\mu_\perp=\sqrt{m^2+|\boldsymbol p_\perp|^2}$、$p^1=\mu_\perp\sinh\theta$ とする。(i) $dp^1/(2\omega_{\boldsymbol p})=d\theta/2$、(ii) $x=(\rho\sinh\eta,\rho\cosh\eta,x_\perp)$ の位相 $-\omega_{\boldsymbol p}x^0+p^1x^1=-\mu_\perp\rho\sinh(\eta-\theta)$ を示せ。

<!-- solution-start -->
**詳細解答。** $\omega_{\boldsymbol p}=\sqrt{(p^1)^2+\mu_\perp^2}=\mu_\perp\cosh\theta$（$\cosh\theta>0$）。$dp^1=\mu_\perp\cosh\theta\,d\theta$ より $dp^1/(2\omega_{\boldsymbol p})=d\theta/2$。位相は
$$
-\mu_\perp\cosh\theta\,\rho\sinh\eta
+\mu_\perp\sinh\theta\,\rho\cosh\eta
=-\mu_\perp\rho(\sinh\eta\cosh\theta-\cosh\eta\sinh\theta)
=-\mu_\perp\rho\sinh(\eta-\theta).
$$
この差だけが現れるので、実boostは運動量rapidityの積分変数を平行移動する。しかしその操作のみでは複素帯の正則性までは示していない。
<!-- solution-end -->

<a id="ex-aqft26-b02"></a>
#### AQFT26-B02 枝切りを避ける証明

- Level: B
- 問題：$\rho,\rho'>0$、$h=\rho^2+\rho'^2+R_\perp^2$ とし $D(z)=h-2\rho\rho'\cosh(A-iv)$、$0<v<2\pi$、$A\in\mathbb R$ とする。$\operatorname{Im}D=0$ の全ての場合に $D>0$ となることを証明し、$D$ が負の実軸へ達しないことを示せ。

<!-- solution-start -->
**詳細解答。** $\cosh(A-iv)=\cosh A\cos v-i\sinh A\sin v$ なので $\operatorname{Im}D=2\rho\rho'\sinh A\sin v$。$\rho\rho'>0$ から零となるのは $A=0$ または $\sin v=0$。$0<v<2\pi$ で $\sin v=0$ は $v=\pi$ のみである。$A=0$ では
$$
D=(\rho-\rho')^2+R_\perp^2+2\rho\rho'(1-\cos v)>0
$$
（最後の項は $v\neq0,2\pi$ なので正）。$v=\pi$ では
$$
D=\rho^2+\rho'^2+R_\perp^2+2\rho\rho'\cosh A>0.
$$
従って $\operatorname{Im}D$ が零のとき $D$ は正の実数であり、切断集合 $(-\infty,0]$ は避けられる。
<!-- solution-end -->

<a id="ex-aqft26-b03"></a>
#### AQFT26-B03 Gaussian規格化の係数

- Level: B
- 問題：$a>0$ とし、$e^{-a\omega}/(2\omega)$ のGaussian表示と $\int d^3p(2\pi)^{-3}e^{-u|\boldsymbol p|^2+i\boldsymbol p\cdot r}=(4\pi u)^{-3/2}e^{-|r|^2/(4u)}$ を用いて、二点核の係数 $m/(4\pi^2R)$ を導け。

<!-- solution-start -->
**詳細解答。** $\omega=\sqrt{|\boldsymbol p|^2+m^2}$ として
$$
\frac{e^{-a\omega}}{2\omega}
=\frac1{2\sqrt\pi}\int_0^\infty
u^{-1/2}e^{-u(|\boldsymbol p|^2+m^2)-a^2/(4u)}\,du.
$$
運動量積分にGaussianの結果を代入すると、係数は $(2\sqrt\pi)^{-1}(4\pi)^{-3/2}=1/(16\pi^2)$、$u$ のべきは $u^{-1/2}u^{-3/2}=u^{-2}$。よって
$$
I=\frac1{16\pi^2}\int_0^\infty u^{-2}
e^{-m^2u-R^2/(4u)}du.
$$
$v=m^2u$ とすると $u^{-2}du=m^2v^{-2}dv$。$K_1(mR)=(mR/4)\int_0^\infty v^{-2}e^{-v-(mR)^2/(4v)}dv$ だから、$I=m^2(16\pi^2)^{-1}\,4K_1(mR)/(mR)=mK_1(mR)/(4\pi^2R)$。
<!-- solution-end -->

<a id="ex-aqft26-b04"></a>
#### AQFT26-B04 境界の順序とモジュラー時刻の向き

- Level: B
- 問題：$D_{x,y}(s-iv)$ の虚部を $v\downarrow0$ と $v\uparrow2\pi$ で一次まで展開せよ。続いて $z=-2\pi t$ とすると上側帯 $0<\operatorname{Im}t<1$ がどの帯へ写り、上端 $t+i$ で演算子順序がどうなるか答えよ。

<!-- solution-start -->
**詳細解答。** $A=\eta_x+s-\eta_y$ とおけば
$$
\operatorname{Im}D(s-iv)=2\rho_x\rho_y\sinh A\sin v.
$$
$v=\varepsilon\downarrow0$ で $+2\rho_x\rho_y\sinh A\,\varepsilon+O(\varepsilon^3)$、$v=2\pi-\varepsilon$ で $-2\rho_x\rho_y\sinh A\,\varepsilon+O(\varepsilon^3)$ となる。したがって境界での $i0$ の向きが逆転する。$z=-2\pi t$ は $\operatorname{Im}t\in(0,1)$ を $\operatorname{Im}z\in(-2\pi,0)$ に写す。下端（$t$ 実）では $\omega(\alpha_{-2\pi t}(\phi(f))\phi(g))$、上端（$t+i$）では $\omega(\phi(g)\alpha_{-2\pi t}(\phi(f)))$。これは[二点KMS境界の系](#cor-aqft26-two-point-kms)の順序である。
<!-- solution-end -->

### Level C：物理的な意味までつなぐ

<a id="ex-aqft26-c01"></a>
#### AQFT26-C01 自由場wedge解析帯の全体証明

- Level: C
- 問題：$m>0$ の自由Klein–Gordon真空と二点 $x,y\in W_R$、実試験関数 $f,g\in C_c^\infty(W_R)$ を考える。(i) $D_{x,y}(z)$ をRindler座標で導き、(ii) 開帯で切断集合を避けることを全ケースで証明し、(iii) 二つの境界の演算子順序を追い、(iv) $\sigma_t^{\mathrm{geom}}=\alpha_{-2\pi t}$ の上側帯KMSを示せ。(v) これだけで一般のwedge環のモジュラー流を同定できるか判定せよ。

<!-- solution-start -->
**詳細解答。** (i) Minkowski計量で二点の差の二乗を取り、$-\sinh a\sinh b+\cosh a\cosh b=\cosh(a-b)$ を使えば
$$
D_{x,y}(z)=\rho_x^2+\rho_y^2+|x_\perp-y_\perp|^2
-2\rho_x\rho_y\cosh(\eta_x+z-\eta_y).
$$
(ii) $z=s-iv$、$A=\eta_x+s-\eta_y$ とし、虚部 $2\rho_x\rho_y\sinh A\sin v$ を得る。$A=0$ なら $D=(\rho_x-\rho_y)^2+R_\perp^2+2\rho_x\rho_y(1-\cos v)>0$、$v=\pi$ なら $D=\rho_x^2+\rho_y^2+R_\perp^2+2\rho_x\rho_y\cosh A>0$。他では虚部が非零。よって主値 $\sqrt D$ と $K_1(m\sqrt D)$ は正則である。

(iii) $v\downarrow0$ と $v\uparrow2\pi$ で $\sin v$ の符号が逆になり、負の実軸へ近づく向きが反転する。下端では[AQFT8の二点関数](../AQFT8/index.md#thm-aqft8-wightman-match)の順序 $\langle\Omega,\phi(\Lambda(s)x)\phi(y)\Omega\rangle$、上端では逆の $\langle\Omega,\phi(y)\phi(\Lambda(s)x)\Omega\rangle$ が現れる。試験関数で平滑化して分布として境界を取る。

(iv) $z=-2\pi t$ とし $F(t)=\mathcal G_{f,g}(-2\pi t)$ と置く。$\operatorname{Im}t\in(0,1)$ と $\operatorname{Im}z\in(-2\pi,0)$ は同値である。実軸では $\omega(\sigma_t^{\mathrm{geom}}(\phi(f))\phi(g))$、上端 $t+i$ では $\omega(\phi(g)\sigma_t^{\mathrm{geom}}(\phi(f)))$。平滑化により境界は連続で、実軸のベクトル相関はCauchy–Schwarzで有界、解析帯内部の有界性は[二点KMS境界の系](#cor-aqft26-two-point-kms)で示した最大値原理から従う。

(v) **同定できない。** 今証明したのは自由場の二点関数の幾何学的な解析性である。一般netには自由場の質量殻表示もGaussian状態も存在するとは限らないし、二点相関だけから有界Weyl作用素全体のKMS性やTomita作用素の定義域は定まらない。これらの橋渡しが次講で必要となる。
<!-- solution-end -->

<a id="ex-aqft26-c02"></a>
#### AQFT26-C02 固有時・質量ゼロ・温度の解釈

- Level: C
- 問題：$m\downarrow0$ の4次元自由場で $\rho=\rho_0$、横座標一定の加速軌道を考える。(i) $W_0$ の核を $D^{-1}$ として計算し、(ii) rapidity差の負の虚方向の特異点間隔を求め、(iii) 固有時の逆温度と加速度の関係を導け。(iv) この計算から検出器の熱応答や一般相互作用場のモジュラー同定まで言えるか。

<!-- solution-start -->
**詳細解答。** (i) [二点核の補題](#lem-aqft26-bessel-kernel)で $mK_1(m\sqrt D)\to1/\sqrt D$ を使うと $W_0=1/(4\pi^2D)$。軌道上では
$$
D=\rho_0^2+\rho_0^2-2\rho_0^2\cosh z
=-4\rho_0^2\sinh^2(z/2),
$$
従って $\mathcal G_0(z)=-1/(16\pi^2\rho_0^2\sinh^2(z/2))$。

(ii) $\sinh(z/2)=0$ の解は $z=2\pi i n$（$n\in\mathbb Z$）。実軸から負の虚方向に次の特異点は $z=-2\pi i$ である。ただし境界値は $z=s-i0$、下端は $z=s-2\pi i+i0$ としてとり、特異点そのものへ値を代入しない。

(iii) [固有時と加速度](#prop-aqft26-metric-acceleration)より $\Delta\tau=\rho_0\Delta\eta$、$a=1/\rho_0$。よって固有時での虚方向の幅は $\beta=2\pi\rho_0=2\pi/a$、自然単位で対応する温度は $T=a/(2\pi)$ である。

(iv) **言えない。** ここで扱ったのは自由質量ゼロ場の軌道二点関数だけ。検出器の応答には相互作用・切替関数・長時間極限の条件が要り、一般相互作用場のモジュラー流にはその理論のwedge代数・標準性・作用素領域を扱う証明が必要になる。
<!-- solution-end -->

## 8. 到達点と次講

右wedgeはboostで不変であり、$\eta$ 方向の移動がrapidityの加算となります。計量から固有時と加速度を導き、自由場二点核のBessel表示を得ました。二点間隔 $D_{x,y}(z)$ が負の実軸を避ける解析帯は $\operatorname{Im}z\in(-2\pi,0)$ で、上下端の $i0$ 方向が反転し、場の演算子順序が入れ替わります。この結果を $z=-2\pi t$ と変換すると、[前講のKMS規約](../AQFT25/index.md#def-aqft25-wstar-kms)と同じ上側帯になります。

**次講 AQFT27「Bisognano–Wichmann（自由スカラー場）」**では、この二点関数の手掛かりを、一粒子の標準実部分空間・Tomita作用素・Fock空間の第二量子化へ発展させ、右wedge環のモジュラー流そのものが $\operatorname{Ad}U(\Lambda(-2\pi t))$ であることを証明します。

### 参考資料

- [Bisognano–Wichmann, *On the duality condition for a Hermitian scalar field* (1975)](https://doi.org/10.1063/1.522605)：元のscalar場での複素boostと標準性。
- [Bisognano–Wichmann, *On the duality condition for quantum fields* (1976)](https://doi.org/10.1063/1.522898)：より一般の場への拡張。
- [AQFT8「Minkowski真空とFock二点関数」](../AQFT8/index.md#def-aqft8-vacuum-two-point)：本講で用いた二点関数の規格化。
