# GR15 球対称計量の選択とゲージ自由度

<!-- definition-example-audit: strict -->

[GR14のKilling場](../GR14/index.md#def-gr14-killing-field)が分かると、時間並進や回転に沿う粒子の保存量を作れます。しかし、今度は保存量を計算するための**計量そのもの**を求めたい。そのまま一般の対称な $4\times4$ 成分行列を[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)へ入れると、座標の付け替えまで未知数として追うことになります。

球対称性を課せば角度方向の形が決まり、静的性を加えれば時間との交差項を局所的に取り除けます。ただし **球対称性だけでは静的性は出ません**。また、球面の面積から決まる半径と、自由に選べる座標名としての「半径」も違います。この違いを計量の式と曲率の計算の両方で確認し、次のGR16で真空方程式を解ける形まで準備します。

以下、滑らかな時間向き付き4次元Lorentz時空、符号 $(-,+,+,+)$、$x^0=ct$（長さの次元）、$c>0$ を用います。角度は $0<\theta<\pi$ の局所座標と $2\pi$ 周期の $\phi$ を使い、極の座標特異性は球面そのものの特異性ではありません。$G>0$ は重力定数、真空方程式へ進む部分では $\Lambda=0$ とします。

## 1. 回転対称性は何を消し、何を残すか

ここでいう「球対称」は、$SO(3)$ の等長変換が作用し、考える開領域でその一般の軌道が二次元球面 $S^2$ であることを指します。各球面上の点を回転で移し合えますが、時刻と球面を識別する二つの座標 $(y^0,y^1)$ は回転で変わりません。これは球面上の幾何が同じという条件であり、異なる時刻間で同じという条件ではありません。

単位球面の計量を $d\Omega^2=d\theta^2+\sin^2\theta\,d\phi^2$ と書きます。球面の一点を固定する回転は接平面内で全方向を回すため、回転不変な接平面上の対称二次形式は単位球面の計量の定数倍しかなく、回転不変な接平面上の一次形式は零しかありません。この観察が、角度と残りの座標を結ぶ交差項を消します。

<a id="prop-gr15-spherical-general"></a>

<!-- formal-statement-start -->
> **命題（球対称計量の局所一般形）**  
> $SO(3)$ が等長的に作用し、軌道が二次元球面である滑らかな4次元Lorentz領域を考える。球面軌道を表す座標 $(y^0,y^1)$ と角度 $(\theta,\phi)$ を局所的に取ると、計量は

$$
\boxed{
ds^2=h_{ab}(y)\,dy^a dy^b+R(y)^2d\Omega^2,
\qquad a,b\in\{0,1\},\quad R>0
}
$$

> と表せる。$h_{ab}$ は2次元のLorentz計量、$R$ は球面軌道ごとの正の滑らかな関数である。一般には $h_{01}\ne0$ でもよく、$h_{ab}$ と $R$ は時間依存してよい。
<!-- formal-statement-end -->

### 証明の見取り図

一つの球面で回転不変性を要求すると、角度方向の二次形式は $R^2d\Omega^2$ に限られます。球面接方向とそれ以外の方向との混合は、回転不変な一次形式がないため消えます。残りは二次元の計量です。

<!-- proof-start -->
### 証明

軌道の一点で、接空間を球面の接方向 $V$ と、計量によるその直交補空間 $W$ に分けます。球面の誘導計量は回転不変かつ正定値な2次元計量なので、$V$ は非退化、従って $W$ は2次元Lorentz計量を持ちます。軌道の一点を固定する $SO(2)$ は $V$ を平面回転として動かし、$W$ を固定します。$V$ 上の回転不変な対称双線形形式は単位円行列のスカラー倍です。さらに各 $w\in W$ に対し $v\mapsto g(w,v)$ は $V$ 上の回転不変な線形形式ですから零です。このため球面方向との混合項はありません。

球面上では全回転で各点を移し合えるので係数は角度に依存しません。正の係数を $R(y)^2$ と書き、残りの二方向の成分を $h_{ab}(y)$ と書けば主張の形です。直交分解と座標分解は球面軌道の局所的な自明化を使い、特別な軌道が現れる中心点や座標極は主張の領域から除きます。$\square$
<!-- proof-end -->

球対称性が角度に関する自由度を消しただけで、二次元部分の座標変換

$$
(y^0,y^1)\longmapsto(\widetilde y^0(y^0,y^1),\widetilde y^1(y^0,y^1))
$$

はまだ残っています。球対称な時間依存時空にいきなり $h_{01}=0$ や $R=y^1$ を両方要求するには、座標を取れる条件を別途調べなければなりません。

## 2. 面積で定義する半径と、座標として使う条件

球面の半径を座標名から決めると、半径の付け替えが物理量に見えてしまいます。代わりに回転軌道の**面積**から決めます。面積要素は誘導計量 $R^2\operatorname{diag}(1,\sin^2\theta)$ の行列式の平方根、すなわち $R^2\sin\theta$ です。

<a id="def-gr15-areal-radius"></a>

<!-- formal-statement-start -->
> **定義（面積半径）**  
> 球対称Lorentz時空の球面軌道 $S$ の誘導計量による面積を $\mathcal A(S)$ とする。$S$ の **面積半径**を

$$
\boxed{r_{\mathrm{area}}(S)=\sqrt{\frac{\mathcal A(S)}{4\pi}}}
$$

> と定める。$S$ が通常の二次元球面であり、球面誘導計量が $R^2d\Omega^2$ なら $r_{\mathrm{area}}=R$ である。これは任意に選んだ半径座標とは区別する。
<!-- formal-statement-end -->

実際、面積を定義から計算すれば

$$
\mathcal A(S)
=\int_0^{2\pi}\!\int_0^\pi R^2\sin\theta\,d\theta\,d\phi
=R^2\,[2]\,[2\pi]=4\pi R^2.
$$

<!-- definition-example-start: def-gr15-areal-radius -->
**定義の確認（平坦時空の非線形な半径座標）。** Minkowski時空の通常の球座標で $r=\rho^2/L$（$L>0,\rho>0$）と置き換えます。これは $dr/d\rho=2\rho/L>0$ により、対象領域では正則な座標変換です。

$$
ds^2=-(dx^0)^2+\frac{4\rho^2}{L^2}d\rho^2
+\frac{\rho^4}{L^2}(d\theta^2+\sin^2\theta\,d\phi^2).
$$

球面上の接基底は $\partial_\theta,\partial_\phi$ なので、その誘導計量は $\operatorname{diag}(\rho^4/L^2,\,(\rho^4/L^2)\sin^2\theta)$。行列式は $\rho^8\sin^2\theta/L^4$、面積要素は $\rho^4\sin\theta/L^2$ です。積分すると $\mathcal A=4\pi\rho^4/L^2$。従って定義から

$$
r_{\mathrm{area}}=\sqrt{\mathcal A/(4\pi)}=\frac{\rho^2}{L},
$$

であり、座標 $\rho$ そのものではありません。球面計量の両角度成分から同じ $R=\rho^2/L$ を得ていることも確かめられます。
<!-- definition-example-end -->

<a id="prop-gr15-areal-coordinate"></a>

<!-- formal-statement-start -->
> **命題（面積半径を座標にできる条件）**  
> 球対称計量の二次元商領域で面積半径 $R(y)$ が滑らかで $dR\ne0$ なら、各点の近傍で座標の一つを $r=R$ とできる。ただしこれだけでは $g_{rr}>0$ も $g_{0r}=0$ も保証されない。特に静的な領域で時間方向のKilling場が時間的、$R=R(\rho)$ で $R'(\rho)\ne0$ なら、後述の静的な対角表示において $r=R$ を正則な空間的半径座標として使える。
<!-- formal-statement-end -->

### 証明の見取り図

座標にできるかどうかは、Jacobianが零でないかという局所的な問題です。半径の関数が停留するところでは逆写像の微分を作れません。

<!-- proof-start -->
### 証明

$dR\ne0$ なので、もとの局所座標の少なくとも一つの偏微分（例えば $\partial_1 R$）が零でありません。そのとき $(y^0,y^1)\mapsto (y^0,R(y))$ のJacobian行列式は $\partial_1R\ne0$ です。逆関数定理により近傍で新しい座標となります。もとの $\partial_1R=0$ で $\partial_0R\ne0$ の場合は逆に $(R,y^1)$ とします。したがって半径が新しい時間座標になる可能性も含み、この条件だけでは空間的な半径と限りません。静的な対角領域では $R=R(\rho)$、$R'\ne0$ とし、$d\rho/dr=1/R'$ が実在するので、新しい半径係数はもとの正の空間計量係数を $(R')^{-2}>0$ 倍したものです。$\square$
<!-- proof-end -->

**使えない直接例。** $b>0$ に対し

$$
ds^2=-(dx^0)^2+d\rho^2+(b^2+\rho^2)d\Omega^2
$$

は滑らかな静的球対称Lorentz計量です。誘導球面積は $4\pi(b^2+\rho^2)$ なので $R(\rho)=\sqrt{b^2+\rho^2}$。$\rho=0$ では $R'(0)=0$ となり、$\rho$ の正負を同じ面積半径が表すため、$R$ をその点の座標にできません。これは計量の退化ではありません。失敗したのは**面積半径を座標に選ぶためのJacobian条件**です。この計量を真空の解と主張しているわけでもありません。

## 3. 静的性は交差項をどこまで消すか

[GR14の静的Killing場の定義](../GR14/index.md#def-gr14-stationary-static)では、時間方向のKilling場が時間的で、それに直交する空間的超曲面を局所的に取れることを要求しました。以下ではさらに、その時間並進が回転作用と可換である領域を考えます。こうすれば球面軌道を変えずに時間座標を動かせます。

時間並進に適合する座標 $(x^0,\rho)$ では各係数は $x^0$ に依存しません。まず、対角化する前の形を許します。

$$
ds^2=-F(\rho)(dx^0)^2+2H(\rho)\,dx^0d\rho
+J(\rho)d\rho^2+R(\rho)^2d\Omega^2.
$$

ここで $F>0$、二次元部分がLorentzかつ空間半径方向が適切に取れることから $FJ+H^2>0$ です。**$H\ne0$ を見ただけでは非静的とはいえません**。二次元の時間・半径の混合は座標選択で生じ得ます。

<a id="prop-gr15-static-diagonal"></a>

<!-- formal-statement-start -->
> **命題（静的球対称計量の対角化と面積半径ゲージ）**  
> 上の時間非依存な球対称計量で $F>0$、$FJ+H^2>0$ とする。各点の近傍で

$$
\widetilde x^0=x^0-\int^\rho \frac{H(s)}{F(s)}\,ds
$$

> と置けば時間・半径交差項が消え、半径方向係数は $J+H^2/F>0$ になる。さらに $R'(\rho)\ne0$ とし $r=R(\rho)>0$ を選ぶと、滑らかな実関数 $\Phi(r),\Lambda_r(r)$ を用いて

$$
\boxed{
ds^2=-e^{2\Phi(r)}(d\widetilde x^0)^2
+e^{2\Lambda_r(r)}dr^2+r^2d\Omega^2
}
$$

> と書ける。これは時間的Killing場を指定した局所表示であり、$F=0$ の場所、$R'=0$ の場所、特別な球面軌道を横断して同じ座標で覆うとの主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

交差項を除くには時間座標の定義に半径だけの関数を足し、交差項の係数を零にします。その後、球面係数を面積半径そのものにします。

<!-- proof-start -->
### 証明

$f'(\rho)=H/F$ を満たす $f$ を取り、$\widetilde x^0=x^0-f(\rho)$ とします。$dx^0=d\widetilde x^0+f'd\rho$ を元の二次元線素へ代入すると

$$
\begin{aligned}
-F(dx^0)^2+2Hdx^0d\rho+Jd\rho^2
={}&-F(d\widetilde x^0)^2
+2(H-Ff')d\widetilde x^0d\rho\\
&+(J+2Hf'-F(f')^2)d\rho^2.
\end{aligned}
$$

$f'=H/F$ とすると中項は零、最後の係数は

$$
J+\frac{2H^2}{F}-\frac{H^2}{F}=J+\frac{H^2}{F}
=\frac{FJ+H^2}{F}>0.
$$

半径を $r=R(\rho)$ と選ぶと $d\rho=dr/R'(\rho)$ だから、新しい半径係数は $(J+H^2/F)/(R')^2>0$ です。従って

$$
e^{2\Phi(r)}=F(\rho(r)),\qquad
e^{2\Lambda_r(r)}
=\frac{J(\rho(r))+H(\rho(r))^2/F(\rho(r))}
{R'(\rho(r))^2}.
$$

双方正なので実数の対数で $\Phi,\Lambda_r$ を定められます。時間方向の生成場は $\partial_{\widetilde x^0}=\partial_{x^0}$ のままであり、[GR14の座標Killing判定](../GR14/index.md#prop-gr14-killing-coordinate-test)により時間並進不変性も維持されます。$\square$
<!-- proof-end -->

<!-- definition-example-start: prop-gr15-static-diagonal -->
**変換の直接検算。** $F=1,\ H=a,\ J=1$（$a$ は定数）、$R(\rho)=\rho>0$ とすると

$$
ds^2=-(dx^0)^2+2a\,dx^0d\rho+d\rho^2+\rho^2d\Omega^2.
$$

$\widetilde x^0=x^0-a\rho$ とすれば $dx^0=d\widetilde x^0+a\,d\rho$。代入後は

$$
ds^2=-(d\widetilde x^0)^2+(1+a^2)d\rho^2+\rho^2d\Omega^2.
$$

元の二次元行列の行列式は $-(1+a^2)<0$、変換後は交差項が零、時間成分が負、半径成分が正です。球面積は $4\pi\rho^2$ のままで、$\Phi=0,\ e^{2\Lambda_r}=1+a^2$ となります。交差項の有無を曲率の有無と混同しないための例です。この例の空間幾何は $a\ne0$ なら一般には平坦ではありません。
<!-- definition-example-end -->

**ゲージ自由度の注意。** $r=R$ と時間・半径の対角化を同時に固定した後は、面積半径の任意の再ラベル付けは許されません。時間の定数倍による規格化 $\widetilde x^0\mapsto k\widetilde x^0$（$k>0$）はなお残り、$\Phi\mapsto\Phi-\log k$ と変わります。従って $\Phi$ の加法定数まで場の方程式から自動的に決まるわけではありません。時間の物理的な規格化には境界・無限遠の条件が必要です。

## 4. 計量からRicci曲率を作る

以後 $\widetilde x^0$ を改めて $x^0$ と書き、微分記号 $'$ は $d/dr$ とします。関数は少なくとも必要な二階微分が連続と仮定します。逆計量は対角行列の各対角成分の逆であり、$g^{00}=-e^{-2\Phi}$、$g^{rr}=e^{-2\Lambda_r}$、$g^{\theta\theta}=r^{-2}$、$g^{\phi\phi}=(r^2\sin^2\theta)^{-1}$ です。

[LORG4のLevi-Civita接続の公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)に基底と逆行列を代入すると、例えば

$$
\Gamma^r_{00}
=-\tfrac12 g^{rr}\partial_r g_{00}
=\tfrac12e^{-2\Lambda_r}(2\Phi'e^{2\Phi})
=e^{2(\Phi-\Lambda_r)}\Phi',
\qquad
\Gamma^\theta_{r\theta}
=\tfrac12g^{\theta\theta}\partial_r g_{\theta\theta}
=\frac1r.
$$

<a id="prop-gr15-static-christoffels"></a>

<!-- formal-statement-start -->
> **命題（静的球対称計量の接続係数）**  
> $r>0,\ 0<\theta<\pi$ で上記の面積半径・対角計量について、対称な下二添字の交換と以下の一覧を除くChristoffel係数は零である。

$$
\begin{aligned}
\Gamma^0_{0r}&=\Phi',
&
\Gamma^r_{00}&=e^{2(\Phi-\Lambda_r)}\Phi',
&
\Gamma^r_{rr}&=\Lambda_r',\\
\Gamma^r_{\theta\theta}&=-re^{-2\Lambda_r},
&
\Gamma^r_{\phi\phi}&=-re^{-2\Lambda_r}\sin^2\theta,\\
\Gamma^\theta_{r\theta}&=\frac1r,
&
\Gamma^\phi_{r\phi}&=\frac1r,
&
\Gamma^\theta_{\phi\phi}&=-\sin\theta\cos\theta,
&
\Gamma^\phi_{\theta\phi}&=\cot\theta.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

対角計量なので添字が合わない項の多くは零です。$r$ 微分する計量成分は $g_{00},g_{rr},g_{\theta\theta},g_{\phi\phi}$、$\theta$ 微分するのは $g_{\phi\phi}$ のみです。

<!-- proof-start -->
### 証明

接続公式へ $g_{00}=-e^{2\Phi}$、$g_{rr}=e^{2\Lambda_r}$、$g_{\theta\theta}=r^2$、$g_{\phi\phi}=r^2\sin^2\theta$ を代入します。偏微分の非零候補は

$$
\begin{aligned}
\partial_r g_{00}&=-2\Phi'e^{2\Phi},
&
\partial_r g_{rr}&=2\Lambda_r'e^{2\Lambda_r},\\
\partial_r g_{\theta\theta}&=2r,
&
\partial_r g_{\phi\phi}&=2r\sin^2\theta,
&
\partial_\theta g_{\phi\phi}&=2r^2\sin\theta\cos\theta.
\end{aligned}
$$

$\Gamma^0_{0r}=\tfrac12g^{00}\partial_rg_{00}=\Phi'$、$\Gamma^r_{rr}=\tfrac12g^{rr}\partial_rg_{rr}=\Lambda_r'$ です。$\Gamma^r_{\theta\theta}=-\tfrac12g^{rr}\partial_rg_{\theta\theta}=-re^{-2\Lambda_r}$、$\Gamma^r_{\phi\phi}=-\tfrac12g^{rr}\partial_rg_{\phi\phi}$ となります。$\Gamma^\phi_{r\phi}=\tfrac12g^{\phi\phi}\partial_rg_{\phi\phi}=1/r$、$\Gamma^\theta_{\phi\phi}=-\tfrac12g^{\theta\theta}\partial_\theta g_{\phi\phi}=-\sin\theta\cos\theta$、$\Gamma^\phi_{\theta\phi}=\tfrac12g^{\phi\phi}\partial_\theta g_{\phi\phi}=\cot\theta$ です。残る非零候補は冒頭の $\Gamma^r_{00}$ と $\Gamma^\theta_{r\theta}$ で検算済みです。$\square$
<!-- proof-end -->

ここからは[GR6のRicciの縮約規約](../GR6/index.md#def-gr6-ricci-scalar)に従います。曲率の四項式を出力添字と第一方向添字で縮約したときの公式は

$$
R_{\mu\nu}
=\partial_\alpha\Gamma^\alpha_{\nu\mu}
-\partial_\nu\Gamma^\alpha_{\alpha\mu}
+\Gamma^\alpha_{\alpha\beta}\Gamma^\beta_{\nu\mu}
-\Gamma^\alpha_{\nu\beta}\Gamma^\beta_{\alpha\mu}.
$$

<a id="prop-gr15-static-ricci"></a>

<!-- formal-statement-start -->
> **命題（静的球対称計量の独立Ricci成分）**  
> 上記の面積半径・対角計量（$r>0$、$\Phi,\Lambda_r$ は $C^2$）では $R_{\mu\nu}$ の非零候補は次の四つであり、角度方向の二つは同じ一成分から決まる。

$$
\begin{aligned}
R_{00}
&=e^{2(\Phi-\Lambda_r)}
\left(\Phi''+(\Phi')^2-\Phi'\Lambda_r'+\frac{2\Phi'}r\right),\\
R_{rr}
&=-\Phi''-(\Phi')^2+\Phi'\Lambda_r'+\frac{2\Lambda_r'}r,\\
R_{\theta\theta}
&=1-e^{-2\Lambda_r}\left(1+r(\Phi'-\Lambda_r')\right),\\
R_{\phi\phi}
&=\sin^2\theta\,R_{\theta\theta}.
\end{aligned}
$$

> それ以外のRicci成分は零である。真空かつ $\Lambda=0$ の[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)は $R_{\mu\nu}=0$ に帰着し、独立方程式は上の最初の三つの零条件として準備できる。
<!-- formal-statement-end -->

### 証明の見取り図

$00$ 成分と $rr$ 成分では角方向の接続が $2/r$ を作ります。$\theta\theta$ 成分では球面上の $\cot\theta$ の微分と平方から定数 $1$ が残ります。$\phi\phi$ は回転対称性で決まります。

<!-- proof-start -->
### 証明

$Q=e^{2(\Phi-\Lambda_r)}\Phi'$ と置きます。接続の跡は

$$
\Gamma^\alpha_{\alpha r}=\Phi'+\Lambda_r'+\frac2r,\qquad
\Gamma^\alpha_{\alpha\theta}=\cot\theta.
$$

$00$ 成分では $\Gamma^r_{00}=Q$ だけが残るので、Ricci公式の四項を順に代入すると

$$
\begin{aligned}
R_{00}
&=\partial_rQ
+Q\left(\Phi'+\Lambda_r'+\frac2r\right)-2Q\Phi'\\
&=e^{2(\Phi-\Lambda_r)}
\left[\Phi''+2(\Phi'-\Lambda_r')\Phi'
+\Phi'(\Phi'+\Lambda_r'+2/r)-2(\Phi')^2\right]\\
&=e^{2(\Phi-\Lambda_r)}
\left(\Phi''+(\Phi')^2-\Phi'\Lambda_r'+2\Phi'/r\right).
\end{aligned}
$$

$rr$ 成分では第一項が $\partial_r\Lambda_r'=\Lambda_r''$、第二項が $-\partial_r(\Phi'+\Lambda_r'+2/r)$。残り二項を加えると

$$
\begin{aligned}
R_{rr}
&=\Lambda_r''-\left(\Phi''+\Lambda_r''-\frac2{r^2}\right)
+\Lambda_r'\left(\Phi'+\Lambda_r'+\frac2r\right)
-\left((\Phi')^2+(\Lambda_r')^2+\frac2{r^2}\right)\\
&=-\Phi''-(\Phi')^2+\Phi'\Lambda_r'+\frac{2\Lambda_r'}r.
\end{aligned}
$$

最後に $\Gamma^r_{\theta\theta}=-re^{-2\Lambda_r}$ を使います。$\theta\theta$ 成分の第一項と第二項はそれぞれ

$$
\partial_r\Gamma^r_{\theta\theta}
=-e^{-2\Lambda_r}+2r\Lambda_r'e^{-2\Lambda_r},
\qquad
-\partial_\theta\Gamma^\alpha_{\alpha\theta}
=-\partial_\theta\cot\theta=\csc^2\theta
$$

です。第三項は $-re^{-2\Lambda_r}(\Phi'+\Lambda_r'+2/r)$、第四項は $2e^{-2\Lambda_r}-\cot^2\theta$。これらを足し、$\csc^2\theta-\cot^2\theta=1$ を用いると

$$
R_{\theta\theta}
=1-e^{-2\Lambda_r}
+re^{-2\Lambda_r}(\Lambda_r'-\Phi')
$$

になります。球面上で回転不変な対称テンソルは $d\Omega^2$ に比例し、Ricciも計量から自然に作られるテンソルなので $R_{\phi\phi}=\sin^2\theta R_{\theta\theta}$、球面との混合成分は零です。二次元部分は静的な対角表示なので $R_{0r}=0$、他の非対角成分も零です。

最後に真空 $T_{\mu\nu}=0$、$\Lambda=0$ なら場の方程式は $R_{\mu\nu}-\tfrac12\mathcal Rg_{\mu\nu}=0$ です。逆計量で縮約すると $\mathcal R-2\mathcal R=-\mathcal R=0$（4次元）なので $\mathcal R=0$、よって $R_{\mu\nu}=0$ です。$\square$
<!-- proof-end -->

**式の独立性を先に確認する。** 最初の二式を次のように重み付けすると二階微分項が消えます。

$$
\boxed{
e^{2(\Lambda_r-\Phi)}R_{00}+R_{rr}
=\frac{2}{r}(\Phi'+\Lambda_r')
}
$$

従って真空領域では $\Phi'+\Lambda_r'=0$ が必要です。この必要条件と $R_{\theta\theta}=0$ を組み合わせるのがGR16の入口になります。いまは**解を積分して積分定数を物理的に確定する操作は行いません**。また、$\Lambda_r$ は半径係数を表す関数で、場の方程式に現れる宇宙定数 $\Lambda$ とは無関係です。

**平坦性の検算。** $\Phi=\Lambda_r=0$ なら接続の角度成分は残りますが、

$$
R_{00}=R_{rr}=0,\qquad
R_{\theta\theta}=1-(1+0)=0,\qquad R_{\phi\phi}=0.
$$

球座標の接続係数が非零であることと、Ricci曲率が非零であることは同値ではありません。さらに**Ricci零だけから一般の計量がRiemann曲率零とはいえない**ことは、GR6で学んだ縮約の情報損失と整合します。

## 5. 演習：半径の自由と曲率の自由を切り分ける

### Level A

<a id="ex-gr15-a01"></a>
#### GR15-A01 球対称性だけからの結論
- Level: A

$ds^2=-A(x^0)^2(dx^0)^2+B(x^0)^2d\rho^2+C(x^0,\rho)^2d\Omega^2$（$A,B,C>0$）は球対称か。$A',B'\ne0$ の場合、$\partial_{x^0}$ をKilling場と結論できるか。角度と時間の混合項がない理由も答えよ。

<!-- solution-start -->
**詳細解答。** 各 $(x^0,\rho)$ で球面の計量が $C^2d\Omega^2$ となり、$SO(3)$ は二つの座標を固定して角度だけを動かす等長変換です。よって球対称です。一方、[Killing座標判定](../GR14/index.md#prop-gr14-killing-coordinate-test)では $\partial_{x^0}g_{\mu\nu}=0$ が必要です。$g_{00}=-A^2$ の微分は $-2AA'$、$g_{\rho\rho}=B^2$ の微分は $2BB'$ なので、仮定下ではこの座標ベクトルはKillingではありません。別のKilling場がないことまでは示していません。混合項は球面接平面上に回転不変な一次形式が存在しないために消えます。
<!-- solution-end -->

<a id="ex-gr15-a02"></a>
#### GR15-A02 面積半径の直接計算
- Level: A

$ds^2=-(dx^0)^2+9\rho^4/L^4\,d\rho^2+\rho^6/L^4\,d\Omega^2$（$L>0,\rho>0$）における面積半径と、その微分 $dr_{\mathrm{area}}/d\rho$ を求めよ。

<!-- solution-start -->
**詳細解答。** 誘導球面の面積要素は $(\rho^6/L^4)\sin\theta\,d\theta\,d\phi$。したがって $\mathcal A=4\pi\rho^6/L^4$ です。[面積半径の定義](#def-gr15-areal-radius)から $r_{\mathrm{area}}=\rho^3/L^2>0$。微分は $3\rho^2/L^2>0$ なので $r_{\mathrm{area}}$ は $\rho>0$ で局所座標にできます。実際 $dr_{\mathrm{area}}^2=(9\rho^4/L^4)d\rho^2$ で、通常のMinkowski球座標に戻ります。
<!-- solution-end -->

<a id="ex-gr15-a03"></a>
#### GR15-A03 時間と半径の交差項
- Level: A

$ds^2=-4(dx^0)^2+4dx^0d\rho+3d\rho^2+\rho^2d\Omega^2$（$\rho>0$）について、$F,H,J$ を読み取り交差項を消す新しい時間座標と変換後の $g_{\rho\rho}$ を求めよ。

<!-- solution-start -->
**詳細解答。** 一般形の交差項は $2Hdx^0d\rho$ なので $F=4,H=2,J=3$ です。$H/F=1/2$ より $\widetilde x^0=x^0-\rho/2$ とします。$dx^0=d\widetilde x^0+(1/2)d\rho$ を代入すると、時間・半径部分は $-4(d\widetilde x^0)^2+(3+H^2/F)d\rho^2=-4(d\widetilde x^0)^2+4d\rho^2$ です。元の行列式は $-FJ-H^2=-16<0$、新しい係数も正です。
<!-- solution-end -->

<a id="ex-gr15-a04"></a>
#### GR15-A04 Christoffel係数の符号
- Level: A

$g_{00}=-e^{2\Phi(r)}$、$g_{rr}=e^{2\Lambda_r(r)}$、$g_{\theta\theta}=r^2$ のとき $\Gamma^r_{00},\Gamma^r_{\theta\theta},\Gamma^0_{0r}$ を接続の定義式から導け。

<!-- solution-start -->
**詳細解答。** 逆成分は $g^{rr}=e^{-2\Lambda_r}$、$g^{00}=-e^{-2\Phi}$ です。[Levi-Civita接続の公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)へ入れて

$$
\begin{aligned}
\Gamma^r_{00}
&=-\tfrac12 g^{rr}\partial_rg_{00}
=-\tfrac12e^{-2\Lambda_r}(-2\Phi'e^{2\Phi})
=e^{2(\Phi-\Lambda_r)}\Phi',\\
\Gamma^r_{\theta\theta}
&=-\tfrac12g^{rr}\partial_rg_{\theta\theta}
=-\tfrac12 e^{-2\Lambda_r}(2r)=-re^{-2\Lambda_r},\\
\Gamma^0_{0r}
&=\tfrac12g^{00}\partial_rg_{00}
=\tfrac12(-e^{-2\Phi})(-2\Phi'e^{2\Phi})=\Phi'.
\end{aligned}
$$

時間成分と空間成分で逆計量の符号が異なることに注意します。
<!-- solution-end -->

<a id="ex-gr15-a05"></a>
#### GR15-A05 平坦な球座標のRicci
- Level: A

$\Phi(r)=\Lambda_r(r)=0$ の場合に、本章の独立なRicci成分をすべて評価せよ。$\Gamma^\theta_{\phi\phi}\ne0$ と矛盾するか。

<!-- solution-start -->
**詳細解答。** $\Phi'=\Phi''=\Lambda_r'=0$ なので $R_{00}=R_{rr}=0$。角度成分は $R_{\theta\theta}=1-e^0(1+0)=0$、$R_{\phi\phi}=\sin^2\theta R_{\theta\theta}=0$ です。一方 $\Gamma^\theta_{\phi\phi}=-\sin\theta\cos\theta$ は一般に非零です。Ricciは接続係数の微分と二次項が打ち消し合うため零になり、これは曲線座標が曲率を作らないことの検算です。
<!-- solution-end -->

### Level B

<a id="ex-gr15-b01"></a>
#### GR15-B01 面積半径が破綻する場所
- Level: B

$b>0$ として $ds^2=-(dx^0)^2+d\rho^2+(b^2+\rho^2)d\Omega^2$ を考える。$\rho=0$ で $r=\sqrt{b^2+\rho^2}$ を新しい座標とできないこと、$\rho>0$ では $g_{rr}$ がどうなるかを求めよ。

<!-- solution-start -->
**詳細解答。** 面積半径は $r=\sqrt{b^2+\rho^2}$ であり $dr/d\rho=\rho/r$。$\rho=0$ ではJacob​​ianが零（$\rho$ の両符号も同じ $r$ を与える）なので、この点を含む座標としては使えません。$\rho>0$ では逆微分 $d\rho/dr=r/\sqrt{r^2-b^2}$ を使えて

$$
d\rho^2=\frac{r^2}{r^2-b^2}\,dr^2,\qquad
ds^2=-(dx^0)^2+\frac{r^2}{r^2-b^2}dr^2+r^2d\Omega^2.
$$

$r\downarrow b$ で $g_{rr}$ が発散するのはこの座標変換の破綻であり、元の $\rho$ 表示の計量は非退化で滑らかです。真空場方程式を仮定していません。
<!-- solution-end -->

<a id="ex-gr15-b02"></a>
#### GR15-B02 二つのRicciから二階微分を消す
- Level: B

静的球対称計量について $e^{2(\Lambda_r-\Phi)}R_{00}+R_{rr}$ を各項から計算し、真空方程式が意味する一次条件を述べよ。

<!-- solution-start -->
**詳細解答。** [独立Ricci成分](#prop-gr15-static-ricci)の第一式に $e^{2(\Lambda_r-\Phi)}$ を掛けると $\Phi''+(\Phi')^2-\Phi'\Lambda_r'+2\Phi'/r$。第二式の $-\Phi''-(\Phi')^2+\Phi'\Lambda_r'+2\Lambda_r'/r$ を足すと二階微分と二次項が対で消えて

$$
e^{2(\Lambda_r-\Phi)}R_{00}+R_{rr}
=\frac{2(\Phi'+\Lambda_r')}{r}.
$$

$r>0$ かつ真空・宇宙定数零なら $R_{00}=R_{rr}=0$ であり $\Phi'+\Lambda_r'=0$ が必要です。これは積分前の微分条件で、時間の規格化定数まではまだ固定しません。
<!-- solution-end -->

<a id="ex-gr15-b03"></a>
#### GR15-B03 二階微分が零でも曲率が残る例
- Level: B

$\Phi=0$、$e^{2\Lambda_r}=k^2$（定数 $k>0$）とした計量の独立Ricci成分を求め、真空・$\Lambda=0$ となる $k$ を判定せよ。

<!-- solution-start -->
**詳細解答。** $\Phi'=\Phi''=\Lambda_r'=0$ だから $R_{00}=R_{rr}=0$。一方、角度成分には球面の内在的曲率に由来する定数項が残り、

$$
R_{\theta\theta}=1-e^{-2\Lambda_r}=1-\frac1{k^2},
\qquad R_{\phi\phi}=\sin^2\theta\left(1-\frac1{k^2}\right).
$$

$r>0$ では $R_{\theta\theta}=0$ と $k>0$ から $k^2=1$、すなわち $k=1$ が必要十分です。$R_{00}$ と $R_{rr}$ が零というだけでは真空方程式を満たしません。
<!-- solution-end -->

<a id="ex-gr15-b04"></a>
#### GR15-B04 時間の規格化とゲージ
- Level: B

$ds^2=-e^{2\Phi(r)}(dx^0)^2+e^{2\Lambda_r(r)}dr^2+r^2d\Omega^2$ で $\widehat x^0=kx^0$（$k>0$）と置くと、新しい $\widehat\Phi$ と $\widehat\Lambda_r$ はどうなるか。面積半径は変わるか。$k$ が位置 $r$ に依存する場合に問題が生じる理由を示せ。

<!-- solution-start -->
**詳細解答。** $dx^0=d\widehat x^0/k$ なので新しい時間項は $-e^{2\Phi}/k^2(d\widehat x^0)^2$ です。従って $\widehat\Phi=\Phi-\log k$、$\widehat\Lambda_r=\Lambda_r$。角度部分は不変なので面積半径も $r$ のままです。$k=k(r)$ とすると $x^0=\widehat x^0/k(r)$ より

$$
dx^0=\frac{d\widehat x^0}{k(r)}
-\frac{\widehat x^0 k'(r)}{k(r)^2}dr.
$$

二乗の交差項は $\widehat x^0$ に依存して現れ、一般にはもとの時間独立・対角表示を維持できません。任意の関数倍を残余の時間規格化自由度とみなさない理由です。
<!-- solution-end -->

### Level C

<a id="ex-gr15-c01"></a>
#### GR15-C01 球対称計量の座標選択と真空条件を統合する
- Level: C

滑らかな関数 $F(\rho)>0,H(\rho),J(\rho),R(\rho)>0$ が $FJ+H^2>0$、$R'(\rho)>0$ を満たす領域で

$$
ds^2=-F(dx^0)^2+2Hdx^0d\rho+Jd\rho^2+R^2d\Omega^2
$$

とする。(i) 面積半径を確認し、時間・半径の交差項を除け。(ii) 新しい計量の二つの未知関数 $\Phi,\Lambda_r$ を表せ。(iii) $\Phi=\Lambda_r=0$ とした模型をRicci成分で検算せよ。(iv) 真空・宇宙定数零なら必要となる $R_{\mu\nu}$ の三条件と、そのうち二つの組合せから得る微分関係を求めよ。(v) この計算だけで積分定数や質量が確定したと言えるか。

<!-- solution-start -->
**詳細解答。** (i) 球面の誘導計量は $R^2\operatorname{diag}(1,\sin^2\theta)$ ですから、面積は $4\pi R^2$、面積半径は $r=R(\rho)>0$ です。交差項について $\widetilde x^0=x^0-f(\rho)$、$f'=H/F$ とすると

$$
\begin{aligned}
-F(dx^0)^2+2Hdx^0d\rho+Jd\rho^2
&=-F(d\widetilde x^0)^2
+2(H-Ff')d\widetilde x^0d\rho\\
&\quad+(J+2Hf'-F(f')^2)d\rho^2\\
&=-F(d\widetilde x^0)^2+(J+H^2/F)d\rho^2.
\end{aligned}
$$

(ii) $R'>0$ より $d\rho=dr/R'$ が正則です。したがって

$$
e^{2\Phi(r)}=F(\rho(r)),\qquad
e^{2\Lambda_r(r)}
=\frac{J(\rho(r))+H(\rho(r))^2/F(\rho(r))}{R'(\rho(r))^2}.
$$

$F>0$ と $FJ+H^2>0$ より双方が正で、対数関数によって $\Phi,\Lambda_r$ を定められます。

(iii) $\Phi=\Lambda_r=0$ なら $\Phi'=\Phi''=\Lambda_r'=0$。従って[本章のRicci公式](#prop-gr15-static-ricci)で $R_{00}=R_{rr}=0$、$R_{\theta\theta}=1-1=0$、$R_{\phi\phi}=0$ です。平坦球座標の必要な検算となります。

(iv) [GR12の真空方程式](../GR12/index.md#thm-gr12-einstein-equation)は4次元で $R_{\mu\nu}=0$ なので

$$
\begin{aligned}
0&=\Phi''+(\Phi')^2-\Phi'\Lambda_r'+2\Phi'/r,\\
0&=-\Phi''-(\Phi')^2+\Phi'\Lambda_r'+2\Lambda_r'/r,\\
0&=1-e^{-2\Lambda_r}[1+r(\Phi'-\Lambda_r')].
\end{aligned}
$$

最初の二式では $R_{00}$ の正の指数因子を除いています。二式を足すと $0=2(\Phi'+\Lambda_r')/r$ であり、$r>0$ より $\Phi'=-\Lambda_r'$ が必要です。$\phi\phi$ 方程式は $\theta\theta$ に $\sin^2\theta$ を掛けたものなので独立ではありません。

(v) この段階では半径についての微分関係を得ただけです。未知関数の積分、境界・無限遠の条件、Newton極限と結合する質量の同定を行っておらず、積分定数や質量は確定していません。GR16ではこれらを続けて求めます。
<!-- solution-end -->

---

球面の**面積半径**は幾何から決まり、半径を座標に使えるかどうかはJacobianが決めます。静的な時間並進に適合する対角ゲージを選んでも、座標の規格化自由度は一部残ります。こうして未知関数を二つに減らし、Ricciの独立成分を導出したので、次のGR16では真空方程式を微分方程式として解き、境界条件と[GR13のNewton極限](../GR13/index.md#thm-gr13-poisson-newton-limit)によって物理的意味を確定します。
