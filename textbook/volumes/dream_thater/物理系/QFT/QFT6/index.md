# QFT6 遅延・先進・Feynman伝播関数とiε処方

<!-- definition-example-audit: strict -->

[QFT5の因果核](../QFT5/index.md#thm-qft5-commutator-cauchy)は、自由場の交換子がどの時空差で消えるかを教えました。しかし「外力を加えたとき、その影響がどちら向きの時間へ伝わるか」と「真空で時刻順に二つの場を測ったとき、何が残るか」は別の問いです。どちらも同じKlein–Gordon作用素を使うのに、境界条件の選択で答えが変わります。

この章ではまず、外力への**因果的応答**を遅延・先進核で作り、次に量子真空の**時間順序相関**を二点量として組み立てます。複素エネルギー平面の極をどちらへ避けるかが、その違いをどのように表すのかまで導きます。

全章で時空は $\mathbb R^{1+3}$、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、質量は $m>0$、単位は $c=\hbar=1$ とします。$x=(t,\boldsymbol x)$、$p=(p^0,\boldsymbol p)$ とし、

$$
P=\partial_t^2-\Delta_{\boldsymbol x}+m^2,\qquad
\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}.
$$

Fourier変換は[QFT5の二点核](../QFT5/index.md#thm-qft5-wightman-positive)と同じ符号を採ります。

$$
\widehat f(p^0,\boldsymbol p)
=\int_{\mathbb R^4}e^{ip^0t-i\boldsymbol p\cdot\boldsymbol x}
f(t,\boldsymbol x)\,dt\,d^3x,\qquad
f(x)=\int\frac{d p^0\,d^3p}{(2\pi)^4}
e^{-ip^0t+i\boldsymbol p\cdot\boldsymbol x}\widehat f(p).
$$

従って $\widehat{Pf}=(\omega_{\boldsymbol p}^2-(p^0)^2)\widehat f$ です。核は[QFT3の緩増加分布](../QFT3/index.md#def-qft3-tempered)として扱い、時空点での場の作用素積は仮定しません。真空期待値を取る際は[QFT4の有限粒子領域](../QFT4/index.md#def-qft4-fock-space)で場をsmearingしてから二点分布を解釈します。

## 1. 同じ因果核から未来向きと過去向きの解を作る

前章の実因果核を

$$
E(t,\boldsymbol x)=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3}
\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}
e^{i\boldsymbol p\cdot\boldsymbol x}
$$

とします。[初期値の定理](../QFT5/index.md#thm-qft5-commutator-cauchy)により $PE=0$、$E(0)=0$、$\partial_tE(0)=\delta^3$ が空間分布として成立し、[Klein–Gordon解の有限伝播速度](../QFT5/index.md#thm-qft5-finite-speed)から $E$ の支持は両向きの光円錐内にあります。

外力が時刻零に加わるなら、その前に応答してはいけません。そこで $t>0$ の部分だけを残します。逆向きに残す場合は $t=0$ の時間微分の符号も合わせる必要があります。ここで「$P$ の基本解」の判定条件は、$P$ を分布として作用させたときに時空の点源 $\delta^4$ が得られること、すなわち $PG=\delta^4$ です。以下の核がこの条件を満たすことは次の定理で確認します。

<a id="def-qft6-retarded-advanced"></a>

<!-- formal-statement-start -->
> **定義（遅延・先進基本解）**
> $m>0$ とし、$PE=0$、$E(0)=0$、$\partial_tE(0)=\delta^3$ を満たす上記の因果核 $E$ を用いる。$\theta(t)$ は $t>0$ で1、$t<0$ で0とする時刻の切替係数とし、時刻変数について空間分布値の積

$$
R(t,\boldsymbol x)=\theta(t)E(t,\boldsymbol x),
\qquad
A(t,\boldsymbol x)=-\theta(-t)E(t,\boldsymbol x)
$$

> を定める。$R$ を遅延基本解、$A$ を先進基本解と呼ぶ。時刻零での $\theta(0)$ の値には依存しない。
<!-- formal-statement-end -->

時刻零で $E(0)=0$ なので、空間分布値の滑らかな関数 $t\mapsto E(t)$ を二つの半直線へ制限してつないだものとして定義できます。$R$、$A$ は各時空点で値を持つとは限りません。特に光円錐上の特異性を分布として保ちます。

<!-- definition-example-start: def-qft6-retarded-advanced -->
### 例：一つの振動数で時間の向きを確かめる

**定義の確認**：空間Fourier変換を $\mathcal F_{\boldsymbol x}$ と書くと、$-\Delta_{\boldsymbol x}$ は $|\boldsymbol p|^2$ の乗法です。従って

$$
\mathcal F_{\boldsymbol x}(PR)
=(\partial_t^2+\omega_{\boldsymbol p}^2)\mathcal F_{\boldsymbol x}R,
\qquad \mathcal F_{\boldsymbol x}R(t,\boldsymbol p)
=\theta(t)\frac{\sin(\omega_{\boldsymbol p}t)}{\omega_{\boldsymbol p}}.
$$

このため、空間運動量を一つ固定した $\omega=\omega_{\boldsymbol p}>0$ について

$$
r_\omega(t)=\theta(t)\frac{\sin(\omega t)}{\omega},
\qquad
a_\omega(t)=-\theta(-t)\frac{\sin(\omega t)}{\omega}
$$

を見ます。ここでプライムは $\omega$ を固定した一変数 $t$ の微分であり、上式の $\partial_t$ と同じ時間変数に作用します。$r_\omega$ は負の時刻で零、$a_\omega$ は正の時刻で零です。それぞれの一階微分の跳び（右値から左値を引く）は

$$
\begin{aligned}
r_\omega'(0+)-r_\omega'(0-)&=1-0=1,\\
a_\omega'(0+)-a_\omega'(0-)&=0-(-1)=1
\end{aligned}
$$

です。先進核の前に負号を付けなければ、この跳びが逆になります。二階分布微分ではこの跳びが $\delta(t)$ になるので、各運動量での基本解の判定条件に対応します。
<!-- definition-example-end -->

<a id="thm-qft6-fundamental-support"></a>

<!-- formal-statement-start -->
> **定理（遅延・先進核の基本解性と支持）**
> $m>0$ のMinkowski時空における上記の $P,E,R,A$ について、緩増加分布として

$$
PR=PA=\delta^4,\qquad R-A=E.
$$

> さらに $J^+(0)=\{(t,\boldsymbol x):t\ge|\boldsymbol x|\}$、$J^-(0)=\{(t,\boldsymbol x):-t\ge|\boldsymbol x|\}$ とすれば

$$
\operatorname{supp}R\subset J^+(0),\qquad
\operatorname{supp}A\subset J^-(0).
$$

> 任意の $f\in C_c^\infty(\mathbb R^4)$ に対し、畳み込み $u_R=R*f$、$u_A=A*f$ は滑らかで $Pu_R=Pu_A=f$ を満たし、その支持はそれぞれ $J^+(\operatorname{supp}f)$、$J^-(\operatorname{supp}f)$ に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

$E$ は時刻零で値が零・時間微分がデルタというCauchyデータを持ちます。時間半直線への切り分けを二度微分すると、この時間微分の跳びが時空のデルタ源になります。支持は[前章の有限伝播速度](../QFT5/index.md#thm-qft5-finite-speed)と、$\theta$ が時間方向を切ることから決まります。外力の解ではこの核を各源点へ平行移動して重ねます。

<!-- proof-start -->
### 証明

空間Fourier変換後には $r_\omega$ について、分布の積微分を用いると

$$
\begin{aligned}
r_\omega'&=\delta(t)\frac{\sin(0)}{\omega}
  +\theta(t)\cos(\omega t)
  =\theta(t)\cos(\omega t),\\
r_\omega''&=\delta(t)\cos(0)
  -\theta(t)\omega\sin(\omega t)
  =\delta(t)-\omega^2r_\omega.
\end{aligned}
$$

従って $(\partial_t^2+\omega^2)r_\omega=\delta(t)$ です。先進側も

$$
a_\omega'=-\theta(-t)\cos(\omega t),\qquad
a_\omega''=\delta(t)-\omega^2a_\omega
$$

となります。第1式は $-\theta(-t)\sin(\omega t)/\omega$ を積微分し、$\partial_t\theta(-t)=-\delta(t)$ と $\sin(0)=0$ を使ったものです。空間Fourier逆変換で $\delta(t)$ が $\delta(t)\delta^3(\boldsymbol x)$ になるため、$PR=PA=\delta^4$ を得ます。分布微分はSchwartz試験関数に対して行っており、点での場の積ではありません。

$t>0$ では $R=E$、$A=0$、$t<0$ では $R=0$、$A=-E$ です。時刻零の切り口で $E(0)=0$ なので $R-A=E$ が分布として成り立ちます。

次に[QFT5の有限伝播速度](../QFT5/index.md#thm-qft5-finite-speed)によって $\operatorname{supp}E\subset\{|\boldsymbol x|\le|t|\}$ です。$R$ は $t\ge0$、$A$ は $t\le0$ に支持を制限するので、示した二つの光円錐に入ります。

$f\in C_c^\infty$ なら、任意階の微分を $f$ 側に移して

$$
\partial^\alpha(R*f)=R*(\partial^\alpha f),\qquad
P(R*f)=(PR)*f=\delta^4*f=f
$$

とできます。$A$ も同様です。畳み込みで寄与する $x$ と源点 $y\in\operatorname{supp}f$ は $x-y\in\operatorname{supp}R$ を満たさねばならず、従って $x\in J^+(\operatorname{supp}f)$。先進側も同じ支持論法で示せます。
<!-- proof-end -->

**何が得られたか。** $R*f$ は源より過去で零という条件を組み込んだ解です。源より前の時刻で零の解の一意性は、外力のない差に対する[QFT3のCauchy一意性](../QFT3/index.md#thm-qft3-cauchy)から従います。この条件を課さずに $Pu=f$ だけを解くと、同次解を加えられるので一意ではありません。

## 2. 複素エネルギーのどちら側から極を見るか

時刻の向きはFourier変換でも読み取れます。ただし実軸上で分母が零になるため、分母を持つ式へ実エネルギーを単に代入するだけでは足りません。時刻に小さな指数減衰を入れ、その極限を試験関数上で取ります。

<a id="def-qft6-energy-boundary"></a>

<!-- formal-statement-start -->
> **定義（エネルギー境界値と極の処方）**
> $m>0$、$\omega_{\boldsymbol p}>0$ とし、実エネルギー $p^0$ の関数として、$\varepsilon>0$ による次の緩増加分布の極限を定める。

$$
\frac1{\omega_{\boldsymbol p}^2-(p^0\pm i0)^2}
:=\lim_{\varepsilon\downarrow0}
\frac1{\omega_{\boldsymbol p}^2-(p^0\pm i\varepsilon)^2}.
$$

> $\pm i0$ は点ごとの数ではなく、Schwartz関数との積分で取る境界値を表す。ここでは複素数 $p^0$ の実軸からのずらしと、分母の定数 $\pm i\varepsilon$ によるずらしを区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft6-energy-boundary -->
### 例：二つの極を実際にずらす

**定義の確認**：実エネルギー $p^0$ を複素変数 $z$ に拡張します。ここでいう極は、次の分数表示で分母が零になる複素数 $z$ です。固定した $\omega>0$ について、遅延側の分母は

$$
\omega^2-(z+i\varepsilon)^2
=-(z-\omega+i\varepsilon)(z+\omega+i\varepsilon).
$$

極は $z=\omega-i\varepsilon$、$z=-\omega-i\varepsilon$ で**両方とも虚部が負**です。先進側の $\omega^2-(z-i\varepsilon)^2$ なら極は $\pm\omega+i\varepsilon$ で両方とも虚部が正です。$\omega=2$、$\varepsilon=0.1$ なら遅延側は $2-0.1i,-2-0.1i$ となり、二つの根で実軸の同じ側を選ぶことが直接確認できます。
<!-- definition-example-end -->

<a id="thm-qft6-causal-fourier"></a>

<!-- formal-statement-start -->
> **定理（遅延・先進のFourier境界値）**
> 質量 $m>0$ の自由Klein–Gordon作用素 $P$ と[遅延・先進基本解](#def-qft6-retarded-advanced) $R,A$ について、前述のFourier規約の下で

$$
\widehat R(p^0,\boldsymbol p)
=\frac1{\omega_{\boldsymbol p}^2-(p^0+i0)^2},
\qquad
\widehat A(p^0,\boldsymbol p)
=\frac1{\omega_{\boldsymbol p}^2-(p^0-i0)^2}.
$$

> これらはエネルギーの緩増加分布としての境界値であり、$\widehat R-\widehat A=\widehat E$ である。
<!-- formal-statement-end -->

### 証明の見取り図

遅延側は $t>0$、先進側は $t<0$ だけの時間積分です。前者には $e^{-\varepsilon t}$、後者には $e^{\varepsilon t}$ を入れると積分が収束します。その結果、遅延の二極は下へ、先進の二極は上へ移ります。この極の位置が時間支持に対応しています。

<!-- proof-start -->
### 証明

$\omega=\omega_{\boldsymbol p}>0$ を固定します。$r_\omega$ を指数減衰したもののFourier変換を、$\operatorname{Im}(p^0+i\varepsilon)>0$ で積分すると

$$
\begin{aligned}
\int_0^\infty e^{(ip^0-\varepsilon)t}
\frac{\sin(\omega t)}{\omega}\,dt
&=\frac1{2i\omega}
\left(\frac1{\varepsilon-i(p^0+\omega)}
      -\frac1{\varepsilon-i(p^0-\omega)}\right)\\
&=\frac1{\omega^2-(p^0+i\varepsilon)^2}.
\end{aligned}
$$

最初の行は $\sin(\omega t)=(e^{i\omega t}-e^{-i\omega t})/(2i)$ を各指数積分に代入した結果です。$e^{-\varepsilon t}\theta(t)\sin(\omega t)/\omega$ は $\varepsilon\downarrow0$ で緩増加分布へ収束するので、上側の境界値が $\widehat R$ です。

先進側には $t=-s$（$s>0$）と置きます。$a_\omega(-s)=\sin(\omega s)/\omega$ なので

$$
\begin{aligned}
\int_{-\infty}^{0}e^{(ip^0+\varepsilon)t}
\left(-\frac{\sin(\omega t)}{\omega}\right)\,dt
&=\int_0^\infty e^{(-ip^0-\varepsilon)s}
\frac{\sin(\omega s)}{\omega}\,ds\\
&=\frac1{\omega^2-(p^0-i\varepsilon)^2}.
\end{aligned}
$$

$\varepsilon\downarrow0$ として $\widehat A$ を得ます。最後に[基本解の差](#thm-qft6-fundamental-support) $R-A=E$ をFourier変換すれば $\widehat R-\widehat A=\widehat E$ が従います。
<!-- proof-end -->

極の上下と正・負のエネルギーの区別を混同しないでください。遅延・先進では**正負の二極を実軸の同じ側**へ動かします。次に作る時間順序付き二点量では**正の極と負の極を逆側**へ動かします。

## 3. 時間順序を指定した真空の二点量

[QFT5のWightman二点分布](../QFT5/index.md#def-qft5-wightman)は場の順序をそのまま固定しました。真空で時刻の遅い場を左に並べると、$t>0$ では $W(t,\boldsymbol x)$、$t<0$ では $W(-t,-\boldsymbol x)$ が選ばれます。この切替は外力への応答を指定するものではありません。

<a id="def-qft6-feynman-two-point"></a>

<!-- formal-statement-start -->
> **定義（Feynman二点分布）**
> $m>0$ の自由実スカラー場のFock真空 $\Omega$ と[Wightman二点分布](../QFT5/index.md#def-qft5-wightman) $W$ に対し、時空差 $z=(t,\boldsymbol x)$ の時間順序付き二点核を

$$
D_F(z)=\theta(t)W(z)+\theta(-t)W(-z)
$$

> と定める。これは $t>0$ で $\omega_0(\Phi(x)\Phi(y))$、$t<0$ で $\omega_0(\Phi(y)\Phi(x))$ を表す分布であり、$x-y=z$ である。等時刻を含めた定義は次の空間Fourier表示を用いる。

$$
D_F(t,\boldsymbol x)=
\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3}
\frac{\theta(t)e^{-i\omega_{\boldsymbol p}t}
     +\theta(-t)e^{i\omega_{\boldsymbol p}t}}
{2\omega_{\boldsymbol p}}e^{i\boldsymbol p\cdot\boldsymbol x}.
$$
<!-- formal-statement-end -->

各 $\boldsymbol p$ について時刻 $t$ に依存する係数は、$t=0$ で左右から同じ $1/(2\omega_{\boldsymbol p})$ に接続します。そのため時間半直線への切替が定める分布には、恣意的な $\theta(0)$ を指定する必要がありません。場の点ごとの積そのものを定義したわけではなく、二点の真空期待値の核を定めています。

<!-- definition-example-start: def-qft6-feynman-two-point -->
### 例：時間を逆にして正負周波数を切り替える

**定義の確認**：空間運動量 $\boldsymbol p$ を固定します。空間Fourier表示の時間係数は、正負の時刻でそれぞれ

$$
\begin{aligned}
t=2 &: \quad \frac{e^{-2i\omega_{\boldsymbol p}}}{2\omega_{\boldsymbol p}},\\
t=-2 &: \quad \frac{e^{-2i\omega_{\boldsymbol p}}}{2\omega_{\boldsymbol p}}
\end{aligned}
$$

となります。前者は $W(2,\boldsymbol x)$、後者は $W(2,-\boldsymbol x)$ から来ます。単純に $W(t,\boldsymbol x)$ を両側へ使うと、負の時刻では $e^{+2i\omega_{\boldsymbol p}}/(2\omega_{\boldsymbol p})$ となり時間順序を再現しません。
<!-- definition-example-end -->

<a id="thm-qft6-feynman-poles"></a>

<!-- formal-statement-start -->
> **定理（時間順序二点分布の極とデルタ源）**
> $m>0$ の自由実スカラー場のFock真空から得た上記 $D_F$ について、緩増加分布として

$$
\widehat D_F(p^0,\boldsymbol p)
=\lim_{\varepsilon\downarrow0}
\frac{i}{(p^0)^2-\omega_{\boldsymbol p}^2+i\varepsilon},
\qquad
P D_F=-i\delta^4.
$$

> 正のエネルギー極は虚部が負の側、負のエネルギー極は虚部が正の側から近づく。右辺の $-i$ は、$D_F$ を真空期待値そのものとした本章の規約による。
<!-- formal-statement-end -->

### 証明の見取り図

$t>0$ では正振動数 $e^{-i\omega t}$、$t<0$ では負振動数 $e^{i\omega t}$ です。両半直線を少し減衰させて時間Fourier変換すると、正・負の極が逆方向へずれる分母を得ます。また時間係数の値は零で連続ですが、**一階微分が $-i$ だけ跳ぶ**ため、Klein–Gordon作用素を掛けると $-i\delta^4$ が現れます。

<!-- proof-start -->
### 証明

固定した $\omega>0$ で時間Fourier成分を $d_\omega(t)$ と書きます。

$$
d_\omega(t)
=\frac{\theta(t)e^{-i\omega t}+\theta(-t)e^{i\omega t}}{2\omega}.
$$

$e^{-\varepsilon|t|}$ を掛けて積分すると、二つの半直線から

$$
\begin{aligned}
\int_{\mathbb R}e^{ip^0t-\varepsilon|t|}d_\omega(t)\,dt
&=\frac1{2\omega}
\left[\frac1{\varepsilon-i(p^0-\omega)}
     +\frac1{\varepsilon+i(p^0+\omega)}\right]\\
&=\frac{i}{2\omega}
\left[\frac1{p^0-\omega+i\varepsilon}
     -\frac1{p^0+\omega-i\varepsilon}\right].
\end{aligned}
$$

これは $\varepsilon\downarrow0$ で

$$
\frac{i}{2\omega}
\left(\frac1{p^0-\omega+i0}
-\frac1{p^0+\omega-i0}\right)
=\frac{i}{(p^0)^2-\omega^2+i0}
$$

に収束します。最後の記号は **右辺の境界値分布が等しい**という意味です。両辺を有限の $\varepsilon$ のまま同じ分母へ機械的に通分した厳密な等式ではありません。実際、$(p^0)^2-\omega^2+i\varepsilon$ の極は

$$
p^0=\pm\sqrt{\omega^2-i\varepsilon}
=\begin{cases}
\omega-i\varepsilon/(2\omega)+O(\varepsilon^2),\\
-\omega+i\varepsilon/(2\omega)+O(\varepsilon^2).
\end{cases}
$$

従って正の極は下、負の極は上です。

次にデルタ源を確認します。$d_\omega$ の左右の値は $d_\omega(0\pm)=1/(2\omega)$ で一致します。一方

$$
d_\omega'(0+)=-\frac i2,\qquad
d_\omega'(0-)=+\frac i2,\qquad
d_\omega'(0+)-d_\omega'(0-)=-i.
$$

$t\ne0$ では $(\partial_t^2+\omega^2)d_\omega=0$ で、値の跳びが零なので $\delta'(t)$ の項は生じません。導関数の跳びだけが残り、

$$
(\partial_t^2+\omega^2)d_\omega=-i\delta(t).
$$

空間Fourier逆変換を取ると $PD_F=-i\delta(t)\delta^3(\boldsymbol x)$ を得ます。
<!-- proof-end -->

Feynman処方の $i\varepsilon$ は、[遅延・先進の処方](#thm-qft6-causal-fourier)に出る $(p^0\pm i0)^2$ とは違います。ここを取り違えると「時間順序の相関」を「過去から未来へだけ進む応答」と誤認します。

## 4. 基本解にする係数と、光円錐の外で残る相関

前節の $D_F$ は時間順序付き真空期待値として自然ですが、$PD_F=-i\delta^4$ です。数学的に $PG=\delta^4$ を満たす核と呼びたいときは、係数を明記して別の記号を使います。

<a id="def-qft6-feynman-fundamental"></a>

<!-- formal-statement-start -->
> **定義（Feynman基本解）**
> $m>0$ の自由実スカラー場のFeynman二点分布 $D_F$ から

$$
G_F=iD_F
$$

> を定める。$G_F$ はKlein–Gordon作用素 $P=\partial_t^2-\Delta+m^2$ のFeynman基本解である。そのFourier境界値は

$$
\widehat G_F(p^0,\boldsymbol p)
=-\frac1{(p^0)^2-\omega_{\boldsymbol p}^2+i0}
$$

> と表される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft6-feynman-fundamental -->
### 例：デルタ源の係数を確かめる

**定義の確認**：$D_F$ について[時間順序二点分布の極とデルタ源](#thm-qft6-feynman-poles)を使うと

$$
P G_F=iP D_F=i(-i\delta^4)=\delta^4.
$$

また $\widehat G_F=i\widehat D_F=i\cdot i/((p^0)^2-\omega^2+i0)$ なので分子は $-1$ です。単に $\widehat D_F$ の $i$ を削る操作とは違います。
<!-- definition-example-end -->

遅延・先進とFeynmanは同じ方程式のデルタ源を与えても、支持条件は異なります。これを分かりやすくするため、時刻零の空間的に離れた点を調べます。

<a id="prop-qft6-response-correlation"></a>

<!-- formal-statement-start -->
> **命題（因果的応答と空間的真空相関の相違）**
> 質量 $m>0$ の自由実スカラー場とそのFock真空について、[遅延・先進基本解](#def-qft6-retarded-advanced) $R,A$ と[Feynman二点分布](#def-qft6-feynman-two-point) $D_F$ を考える。任意の $\boldsymbol x\ne0$ に対し、$r=|\boldsymbol x|$ と書くと

$$
R(0,\boldsymbol x)=A(0,\boldsymbol x)=0,\qquad
D_F(0,\boldsymbol x)
=\frac1{16\pi^2}\int_0^\infty
\frac{e^{-m^2s-r^2/(4s)}}{s^2}\,ds>0.
$$

> 後者は時刻零の原点から離れた領域に制限した滑らかな関数としての等式である。従って $D_F$ と $G_F=iD_F$ は光円錐支持を持たず、零交換子と非零相関は矛盾しない。
<!-- formal-statement-end -->

### 証明の見取り図

$R,A$ は[遅延・先進核の基本解性と支持](#thm-qft6-fundamental-support)から、時刻零では原点以外に支持を持てません。他方 $D_F(0,\boldsymbol x)$ は正の振動数の重ね合わせです。[QFT5の等時刻Wightman核の例](../QFT5/index.md#ref-qft5-spacelike-wightman)と同様に、正の補助積分変数 $s$（Schwingerパラメータ）で $1/\sqrt a$ をGaussian積分へ表せば、空間的に離れても一般に消えないことを直接示せます。

<!-- proof-start -->
### 証明

$R,A$ の支持はそれぞれ $t\ge|\boldsymbol x|$ と $-t\ge|\boldsymbol x|$ に含まれるため、$t=0,\boldsymbol x\ne0$ の近傍で両分布は零です。ここでの零は特異な原点での分布値の主張ではありません。

$D_F$ の空間Fourier表示を $t=0$ で取ると、[既習のWightman核](../QFT5/index.md#ref-qft5-spacelike-wightman)と同じ積分になり、

$$
D_F(0,\boldsymbol x)
=\int\frac{d^3p}{(2\pi)^3}
\frac{e^{i\boldsymbol p\cdot\boldsymbol x}}{2\sqrt{|\boldsymbol p|^2+m^2}}.
$$

正の実数 $a$ に対してGaussian積分から

$$
\int_0^\infty s^{-1/2}e^{-as}\,ds
=\frac{\sqrt\pi}{\sqrt a}
$$

を得るので、$a=|\boldsymbol p|^2+m^2$ を代入して

$$
\frac1{2\omega_{\boldsymbol p}}
=\frac1{2\sqrt\pi}\int_0^\infty
s^{-1/2}e^{-s(|\boldsymbol p|^2+m^2)}\,ds.
$$

さらに三次元Gaussian Fourier積分は

$$
\int\frac{d^3p}{(2\pi)^3}
e^{-s|\boldsymbol p|^2+i\boldsymbol p\cdot\boldsymbol x}
=(4\pi s)^{-3/2}e^{-r^2/(4s)}.
$$

これらを組み合わせると係数は
$(2\sqrt\pi)^{-1}(4\pi)^{-3/2}=1/(16\pi^2)$、積分の冪は $s^{-1/2}s^{-3/2}=s^{-2}$ です。$r>0$ なら $s\downarrow0$ で $e^{-r^2/(4s)}$、$s\to\infty$ で $e^{-m^2s}$ が収束を保証し、積分は厳密に正です。

振動積分と $s$ 積分の交換は、まず運動量側に $e^{-\lambda|\boldsymbol p|^2}$（$\lambda>0$）を掛けて行います。このときGaussian積分の $s$ が $s+\lambda$ になるので、正則化した等時刻核は

$$
D_{F,\lambda}(0,\boldsymbol x)
=\frac1{16\pi^2}\int_0^\infty
s^{-1/2}(s+\lambda)^{-3/2}
e^{-m^2s-r^2/(4(s+\lambda))}\,ds.
$$

$r\ge r_0>0$ の領域で $s\ge\lambda$ の部分は次の可積分関数に抑えられます。

$$
s^{-1/2}(s+\lambda)^{-3/2}e^{-m^2s-r^2/(4(s+\lambda))}
\le s^{-2}e^{-m^2s-r_0^2/(8s)}.
$$

一方、$0<s<\lambda$ の部分では

$$
\int_0^\lambda s^{-1/2}(s+\lambda)^{-3/2}
e^{-m^2s-r^2/(4(s+\lambda))}\,ds
\le 2\lambda^{-1}e^{-r_0^2/(8\lambda)}\longrightarrow0.
$$

従って $\lambda\downarrow0$ の極限を $r>0$ の領域で取れ、上の正の積分表示が分布の制限として得られます。

最後に[QFT5の局所的可換性](../QFT5/index.md#thm-qft5-locality)は交換子 $C=-iE$ が空間的分離で消えるという主張です。$D_F$ や $W$ が消えるとは主張していません。
<!-- proof-end -->

ここまでの核を次の表で整理します。$W$ は時間順序を入れる前の二点分布です。

| 核 | Klein–Gordon方程式 | 支持・時間の選択 | エネルギーの極 |
| --- | --- | --- | --- |
| $R$ | $PR=\delta^4$ | 未来光円錐内 | 正負とも下 |
| $A$ | $PA=\delta^4$ | 過去光円錐内 | 正負とも上 |
| $D_F$ | $PD_F=-i\delta^4$ | 真空で時間順序、空間的分離でも非零 | 正は下、負は上 |
| $G_F=iD_F$ | $PG_F=\delta^4$ | $D_F$ と同じ支持 | 正は下、負は上 |

外力 $f$ からの未来向きの解を求めるなら $R*f$、過去向きなら $A*f$ です。量子真空の時間順序付き期待値なら $D_F$ です。**因果的応答の支持**と**真空の量子相関**を、どちらも「伝播」という語だけで同一視しないのが重要です。

## 5. 演習：支持・極・時間順序を手で確かめる

以下はすべて $m>0$、$P=\partial_t^2-\Delta+m^2$、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$、本章のFourier符号を用います。$R,A,D_F,G_F$ は本章で定めた分布とし、外力は特に指定がなければ実 $C_c^\infty$ 関数、空間試験関数は実 $C_c^\infty$ 関数とします。

### Level A：一つの操作を正しい規約で使う

### 演習 QFT6-A1：半直線への切り分けとデルタ源

$\omega>0$ を固定し、$e_\omega(t)=\sin(\omega t)/\omega$ とする。$r(t)=\theta(t)e_\omega(t)$ の一階・二階分布微分を求め、$(\partial_t^2+\omega^2)r$ を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$e_\omega(0)=0$、$e_\omega'(t)=\cos(\omega t)$ です。$r$ は $t<0$ で零、$t>0$ で $e_\omega$ なので、[遅延核の定義](#def-qft6-retarded-advanced)に従い

$$
\begin{aligned}
r'&=\delta(t)e_\omega(0)+\theta(t)e_\omega'(t)
=\theta(t)\cos(\omega t),\\
r''&=\delta(t)\cos(0)-\theta(t)\omega\sin(\omega t)
=\delta(t)-\omega^2r.
\end{aligned}
$$

したがって $(\partial_t^2+\omega^2)r=\delta(t)$ です。最初の微分では値の跳びが零なのでデルタは出ず、二度目で微分の跳び $1$ がデルタになります。
<!-- solution-end -->

### 演習 QFT6-A2：光円錐の外の観測点

$f\in C_c^\infty(\mathbb R^4)$ の支持が $0\le s\le1$、$|\boldsymbol y|\le2$ に含まれるとする。$u_R=R*f$、$u_A=A*f$ について、$|\boldsymbol x|=10$、$t=3$ での値を求めよ。どの支持不等式を使ったかを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

源点 $(s,\boldsymbol y)$ と観測点 $(3,\boldsymbol x)$ の距離は、$\boldsymbol x=(\boldsymbol x-\boldsymbol y)+\boldsymbol y$ とノルムの基本性質から

$$
|\boldsymbol x-\boldsymbol y|
\ge|\boldsymbol x|-|\boldsymbol y|\ge10-2=8.
$$

遅延核が寄与するには[遅延・先進核の基本解性と支持](#thm-qft6-fundamental-support)により $3-s\ge|\boldsymbol x-\boldsymbol y|$ が必要ですが、$0\le s\le1$ なら $3-s\le3<8$ です。先進核が寄与するには $s-3\ge|\boldsymbol x-\boldsymbol y|$ が必要ですが、$s-3\le-2<8$ です。両方とも可能な源点がないため、

$$
u_R(3,\boldsymbol x)=u_A(3,\boldsymbol x)=0
\quad (|\boldsymbol x|=10).
$$
<!-- solution-end -->

### 演習 QFT6-A3：遅延側の二つの極

$\omega>0$、$\varepsilon>0$ とする。複素エネルギー $z$ の次の分数式

$$
F_\varepsilon(z)=\frac1{\omega^2-(z+i\varepsilon)^2}
$$

の極を二つ求め、上・下の半平面のどちらに属するか判定せよ。$\omega=3$、$\varepsilon=1/5$ を代入して確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

分母が零になるのは $(z+i\varepsilon)^2=\omega^2$、すなわち $z+i\varepsilon=\pm\omega$ のときです。従って

$$
z_+=\omega-i\varepsilon,\qquad
z_-=-\omega-i\varepsilon.
$$

両方とも虚部が $-\varepsilon<0$ なので実軸より下側にあります。指定値では $z_+=3-i/5$、$z_-=-3-i/5$ です。これは[遅延・先進のFourier境界値](#thm-qft6-causal-fourier)の遅延側に対応します。
<!-- solution-end -->

### 演習 QFT6-A4：時間順序で変わる指数

$\omega>0$ に対し

$$
d_\omega(t)=
\frac{\theta(t)e^{-i\omega t}+\theta(-t)e^{i\omega t}}{2\omega}
$$

とする。$t=1,-1$ の値をそれぞれ求め、$d_\omega(0+)$ と $d_\omega(0-)$ が等しいことを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$t=1>0$ では $\theta(t)=1$、$\theta(-t)=0$ なので $d_\omega(1)=e^{-i\omega}/(2\omega)$。$t=-1<0$ では逆に $\theta(-t)=1$ なので

$$
d_\omega(-1)=\frac{e^{i\omega(-1)}}{2\omega}
=\frac{e^{-i\omega}}{2\omega}=d_\omega(1).
$$

右極限と左極限はそれぞれ $e^0/(2\omega)$ なので

$$
d_\omega(0+)=d_\omega(0-)=\frac1{2\omega}.
$$

[Feynman二点分布の定義](#def-qft6-feynman-two-point)では、時間の向きを反転すると周波数の符号も切り替わります。
<!-- solution-end -->

### 演習 QFT6-A5：Feynman基本解の係数

$P D_F=-i\delta^4$ を満たすFeynman二点分布 $D_F$ が与えられたとする。$\alpha D_F$ が $P(\alpha D_F)=\delta^4$ を満たすための複素定数 $\alpha$ を求めよ。また $\widehat D_F=i/((p^0)^2-\omega_{\boldsymbol p}^2+i0)$ から、そのFourier表示の分子を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$P$ は複素線形なので $P(\alpha D_F)=-i\alpha\delta^4$ です。デルタ源の係数を1とする条件は $-i\alpha=1$ であり、

$$
\alpha=\frac1{-i}=i.
$$

従って[本章のFeynman基本解](#def-qft6-feynman-fundamental)は $G_F=iD_F$ です。Fourier側では

$$
\widehat G_F=i\widehat D_F
=\frac{i^2}{(p^0)^2-\omega_{\boldsymbol p}^2+i0}
=-\frac1{(p^0)^2-\omega_{\boldsymbol p}^2+i0}.
$$

$\widehat D_F$ の分子の $i$ は、基本解にするために消えるのではなく、もう一つの $i$ と掛かって $-1$ になります。
<!-- solution-end -->

### Level B：二つの主張をつないで説明する

### 演習 QFT6-B1：外力を加えた解の一意性

$m>0$、$f\in C_c^\infty(\mathbb R^4)$ とし、$\operatorname{supp}f\subset\{t\ge0\}$ とする。$u=R*f$ が $Pu=f$ かつ $t<0$ で零であることを示せ。また $v$ が同じ方程式を満たす滑らかな解で、$t<0$ で零かつ各時刻でSchwartz級のCauchyデータを持つなら、$v=u$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[遅延核の基本解性](#thm-qft6-fundamental-support)は $PR=\delta^4$ を与えます。コンパクト台の $f$ との畳み込みでは微分を移せるので

$$
Pu=P(R*f)=(PR)*f=\delta^4*f=f.
$$

また $u(t,\boldsymbol x)$ が非零になり得るなら、ある $(s,\boldsymbol y)\in\operatorname{supp}f$ に対し $t-s\ge|\boldsymbol x-\boldsymbol y|\ge0$ が必要です。$s\ge0$ だから $t\ge0$ となり、$t<0$ では $u=0$ です。

$w=v-u$ を取ると $Pw=0$ であり、$t<0$ では $w=0$ です。任意の $t_0<0$ におけるCauchyデータは

$$
w(t_0,\boldsymbol x)=0,\qquad
\partial_tw(t_0,\boldsymbol x)=0
$$

です。$u$ はコンパクト台源からの滑らかな解であり、各時刻で空間コンパクト台を持つので、$w$ のCauchyデータも仮定のSchwartz級です。

時刻を平行移動した関数を作ると、

$$
\widetilde w(\tau,\boldsymbol x)=w(t_0+\tau,\boldsymbol x),
\qquad P\widetilde w=0,
\qquad \widetilde w(0)=\partial_\tau\widetilde w(0)=0.
$$

ここで $\partial_\tau$ は元の $\partial_t$ を時刻の平行移動後に書き直したものです。[QFT3のCauchy一意性](../QFT3/index.md#thm-qft3-cauchy)を $\widetilde w$ に適用すれば $\widetilde w=0$、すなわち $v=u$ です。同次解を足す自由を、過去で零という条件が除いています。
<!-- solution-end -->

### 演習 QFT6-B2：遅延と先進の差は因果核になる

$\omega>0$ を固定する。分布の境界値恒等式

$$
\frac1{x+i0}-\frac1{x-i0}=-2\pi i\delta(x)
$$

を用いて

$$
\frac1{\omega^2-(p^0+i0)^2}
-\frac1{\omega^2-(p^0-i0)^2}
$$

をデルタ分布二つの和として表せ。その時間逆Fourier変換が $\sin(\omega t)/\omega$ となることを確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[境界値定理](#thm-qft6-causal-fourier)の分数を部分分数へ分けます。実軸の上・下の極限ごとに

$$
\frac1{\omega^2-(p^0\pm i0)^2}
=-\frac1{2\omega}
\left(\frac1{p^0-\omega\pm i0}
-\frac1{p^0+\omega\pm i0}\right).
$$

両者の差を取り、与えられた境界値恒等式を $x=p^0-\omega$、$x=p^0+\omega$ に適用すると

$$
\begin{aligned}
\widehat R-\widehat A
&=-\frac1{2\omega}
\left[-2\pi i\delta(p^0-\omega)
+2\pi i\delta(p^0+\omega)\right]\\
&=\frac{\pi i}{\omega}
\left[\delta(p^0-\omega)-\delta(p^0+\omega)\right].
\end{aligned}
$$

時間逆変換の符号は $e^{-ip^0t}$ なので

$$
\begin{aligned}
\int\frac{dp^0}{2\pi}e^{-ip^0t}
(\widehat R-\widehat A)
&=\frac{i}{2\omega}(e^{-i\omega t}-e^{i\omega t})\\
&=\frac{\sin(\omega t)}{\omega}.
\end{aligned}
$$

これは[因果核の表示](../QFT5/index.md#thm-qft5-commutator-cauchy)の一つの空間Fourier成分です。差 $R-A$ にデルタ源が残らないことも、$PR=PA$ と整合します。
<!-- solution-end -->

### 演習 QFT6-B3：空間的相関は距離とともにどう変わるか

質量 $m>0$、空間距離 $r>0$ において

$$
H(r)=\frac1{16\pi^2}\int_0^\infty
s^{-2}e^{-m^2s-r^2/(4s)}\,ds
$$

がFeynman二点分布の等時刻核であるとする。$H(r)$ が正・有限であることを示し、$H'(r)<0$ を中間式付きで証明せよ。これは光円錐支持の主張ではないことも述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$r,m>0$ のため被積分関数は正です。$s\downarrow0$ では $e^{-r^2/(4s)}$ が任意の逆冪より速く減衰し、$s\to\infty$ では $e^{-m^2s}$ が減衰するため積分は有限かつ正です。

$r$ を任意の正の閉区間 $[r_0,r_1]$ に制限すれば、微分した被積分関数は $s^{-3}e^{-m^2s-r_0^2/(4s)}$ の定数倍で抑えられ、積分可能です。従って積分記号の下で微分でき、

$$
\begin{aligned}
H'(r)
&=\frac1{16\pi^2}\int_0^\infty
s^{-2}e^{-m^2s-r^2/(4s)}
\left(-\frac r{2s}\right)\,ds\\
&=-\frac r{32\pi^2}\int_0^\infty
s^{-3}e^{-m^2s-r^2/(4s)}\,ds<0.
\end{aligned}
$$

つまり相関の大きさは距離とともに減るものの、有限距離で零になるわけではありません。一方[遅延・先進核の支持](#thm-qft6-fundamental-support)は光円錐の外で**厳密に零**という別の主張です。
<!-- solution-end -->

### 演習 QFT6-B4：時間順序核の微分の跳びを再構成する

$\omega>0$ とし

$$
d_\omega(t)=\frac1{2\omega}
\begin{cases}
e^{-i\omega t},&t>0,\\
e^{i\omega t},&t<0
\end{cases}
$$

とする。連続接続した分布について $\partial_td_\omega$ の左右極限を求め、$(\partial_t^2+\omega^2)d_\omega=-i\delta(t)$ を導け。また同じ式から $(\partial_t^2+\omega^2)(i d_\omega)=\delta(t)$ が出ることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

各半直線で微分すると

$$
d_\omega'(t)=
\begin{cases}
-\frac i2e^{-i\omega t},&t>0,\\
+\frac i2e^{i\omega t},&t<0.
\end{cases}
$$

$d_\omega(0+)=d_\omega(0-)=1/(2\omega)$ なので、最初の分布微分にデルタ項はありません。時間微分の跳びは

$$
d_\omega'(0+)-d_\omega'(0-)
=-\frac i2-\frac i2=-i.
$$

二階分布微分にはこの跳びが掛かった $\delta(t)$ が加わります。一方、$t\ne0$ では $d_\omega''=-\omega^2d_\omega$ なので

$$
(\partial_t^2+\omega^2)d_\omega=-i\delta(t).
$$

複素線形性から $(\partial_t^2+\omega^2)(i d_\omega)=i(-i)\delta(t)=\delta(t)$ です。[Feynman二点分布のデルタ源定理](#thm-qft6-feynman-poles)は、この振動数ごとの跳びを空間Fourier逆変換したものです。
<!-- solution-end -->

### Level C：外力と真空相関を同じ観測配置で区別する

### 演習 QFT6-C1：離れた二つの領域の応答と時間順序相関

質量 $m>0$ の自由実スカラー場を考える。外力 $f\in C_c^\infty(\mathbb R^4)$ は

$$
\operatorname{supp}f\subset
\{(s,\boldsymbol y):0\le s\le a,\ |\boldsymbol y|\le b\},
\qquad a,b>0
$$

を満たす。観測点 $(0,\boldsymbol x)$ を $L=|\boldsymbol x|>a+b$ に置く。また $h,k\in C_c^\infty(\mathbb R^3)$ は非負で零でない関数とし、$\operatorname{supp}h\subset B(\boldsymbol x,\rho)$、$\operatorname{supp}k\subset B(0,\rho)$、$L>2\rho>0$ とする。

1. 遅延応答 $(R*f)(0,\boldsymbol x)$ と先進応答 $(A*f)(0,\boldsymbol x)$ がともに零であることを、源点との距離の下界で示せ。
2. [QFT4の等時刻場](../QFT4/index.md#def-qft4-equal-time-fields) $\Phi_0(h)$ と $\Phi_0(k)$ の交換子が零であることを説明せよ。下付きの $0$ は空間試験関数 $h,k$ を固定して場の時刻パラメータ $t$ を零にした意味で、空間座標を零とする添字ではない。
3. 等時刻Feynman相関の空間smearing

$$
I=\int_{\mathbb R^3}\int_{\mathbb R^3}
h(\boldsymbol z)k(\boldsymbol y)
D_F(0,\boldsymbol z-\boldsymbol y)
\,d^3z\,d^3y
$$

が正であることを示せ。
4. $R,A,D_F,G_F$ のデルタ源の係数と正負エネルギーの極の位置をまとめ、1〜3の結論に矛盾がない理由を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 外力への応答。** 任意の源点 $(s,\boldsymbol y)\in\operatorname{supp}f$ について $\boldsymbol x=(\boldsymbol x-\boldsymbol y)+\boldsymbol y$ とノルムの基本性質から

$$
|\boldsymbol x-\boldsymbol y|
\ge|\boldsymbol x|-|\boldsymbol y|
\ge L-b>a.
$$

遅延核が寄与するには $0-s\ge|\boldsymbol x-\boldsymbol y|$ が必要です。しかし $s\ge0$ だから左辺は $0$ 以下、右辺は正です。先進核が寄与するには $s-0\ge|\boldsymbol x-\boldsymbol y|$ が必要ですが、左辺は $s\le a$、右辺は $L-b>a$ なので不可能です。[遅延・先進核の基本解性と支持](#thm-qft6-fundamental-support)より

$$
(R*f)(0,\boldsymbol x)=(A*f)(0,\boldsymbol x)=0.
$$

この結論は $f$ の符号や積分の打消しに依存せず、支持だけで従います。

**2. 交換子。** 二つの空間球の中心距離は $L>2\rho$ なので、任意の $\boldsymbol z\in\operatorname{supp}h$、$\boldsymbol y\in\operatorname{supp}k$ について

$$
|\boldsymbol z-\boldsymbol y|\ge L-2\rho>0.
$$

等時刻では[QFT5の因果核初期値](../QFT5/index.md#thm-qft5-commutator-cauchy)が $E(0,\boldsymbol z-\boldsymbol y)=0$ です。従って二つの場の交換子は

$$
[\Phi_0(h),\Phi_0(k)]
=-i\int h(\boldsymbol z)k(\boldsymbol y)
E(0,\boldsymbol z-\boldsymbol y)\,d^3z\,d^3y\,I_{\mathcal F}=0.
$$

ここで $I_{\mathcal F}$ はFock空間の恒等作用素です。

**3. 相関。** $|\boldsymbol z-\boldsymbol y|\ge L-2\rho>0$ より、[本章のGaussian表示](#prop-qft6-response-correlation)を各空間差へ適用できます。

$$
D_F(0,\boldsymbol z-\boldsymbol y)
=\frac1{16\pi^2}\int_0^\infty
s^{-2}e^{-m^2s-|\boldsymbol z-\boldsymbol y|^2/(4s)}\,ds>0.
$$

被積分核は連続・正であり、$h,k$ は非負で零でない滑らかな関数です。その正値集合はそれぞれ非空の開集合を含むため、正の積を積分する領域は正の体積を持ちます。従って $I>0$ です。$L>2\rho$ が零距離の特異性を避けるので積分も有限です。

**4. 極とデルタ源。** [遅延・先進核の基本解性と支持](#thm-qft6-fundamental-support)から $PR=PA=\delta^4$、[時間順序二点分布の極とデルタ源](#thm-qft6-feynman-poles)から $PD_F=-i\delta^4$、[Feynman基本解](#def-qft6-feynman-fundamental)から $PG_F=\delta^4$ です。遅延は正負二極とも実軸より下側、先進はともに上側、Feynmanは正の極を下・負の極を上へ置きます。

外力 $f$ への応答では未来・過去の**光円錐支持**が効きます。等時刻の交換子は二つの順序の**差**で消えます。しかし時間順序付きの二点量は、真空の非零の**相関**を残します。異なる量へ異なる条件を課しているため、零応答・零交換子・正の相関は同時に成立します。
<!-- solution-end -->

## 6. まとめと次の問い

- 遅延核 $R=\theta E$ と先進核 $A=-\theta(-t)E$ は、共に $P$ の基本解ですが、支持は未来と過去に分かれます。差は $E=R-A$ です。
- 時間Fourierで遅延・先進の極はそれぞれ正負とも下・正負とも上。時間順序付きFeynman二点分布の極は正が下・負が上です。
- $D_F$ は真空期待値として $PD_F=-i\delta^4$ を満たし、$G_F=iD_F$ は $PG_F=\delta^4$ を満たします。定義上の $i$ を混同しません。
- 遅延・先進の外力応答は光円錐の外で消えますが、等時刻のFeynman相関は離れた点でも正です。これは[局所的可換性](../QFT5/index.md#thm-qft5-locality)と両立します。

次は、この自由場の時間順序を、相互作用場の展開やスピノル場の伝播へどう使うかを学びます。時間順序積を同一点で繰り返し掛ける場合は、分布の積の定義という新たな問題が生じるため、ここで扱った二点核だけで一般の相互作用の積が自動的に定義されるわけではありません。
