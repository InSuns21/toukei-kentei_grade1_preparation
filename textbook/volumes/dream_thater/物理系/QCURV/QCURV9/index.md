# QCURV9 地平線・表面重力と遠方観測者の時刻

<!-- definition-example-audit: strict -->

[QCURV8のUnruh温度](../QCURV8/index.md#thm-qcurv8-unruh)は、加速検出器の**固有時計**で測るエネルギーと、定常二点関数の熱的な比を結びました。ブラックホールでも「温度」を語りたくなりますが、今度は観測者ごとに時計の進み方が違います。地平線近くの時計で数えた一秒と、遠方で数えた一秒を混ぜると、温度の指数の係数まで変わってしまいます。

この章の中心問いは「**ブラックホールの出射光線を、どの時計でラベル付けすると後で量子場の周波数を比較できるか**」です。[GR26の零時刻](../../GR/GR26/index.md#def-gr26-null-times)、[GR27の正則なKruskal座標](../../GR/GR27/index.md#def-gr27-kruskal-nulls)、[GR45の表面重力](../../GR/GR45/index.md#def-gr45-surface-gravity)を土台に、光線と観測者の時計を一続きの計算へ接続します。これらの幾何学の一般定理を再定義するのではなく、次章でin/out波束を比較するための物理的な時刻・周波数の対応を導きます。

4次元、計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$ とし、$M>0$ は長さの次元を持つSchwarzschild質量パラメータです。面積半径 $r$、無限遠で正規化された静的時刻 $t$ を使い、$r_s=2M$、$f(r)=1-2M/r$、$d\Omega^2=d\theta^2+\sin^2\theta\,d\varphi^2$ とします。静的外部 $r>2M$ では[Schwarzschild計量](../../GR/GR16/index.md#thm-gr16-schwarzschild)が

$$
ds^2=-f(r)\,dt^2+\frac{dr^2}{f(r)}+r^2d\Omega^2
$$

です。$\partial_t$ は時間並進の[Killing場](../../GR/GR14/index.md#def-gr14-killing-field)で、$g(\partial_t,\partial_t)=-f\to-1$（$r\to\infty$）。この極限が**どの遠方時計を基準にするか**を固定します。

## 1. 同じ光の周波数が観測者で違うのはなぜか

遠方へ進む光を幾何光学近似の未来向き零測地線で表すと、運動量 $p^a=dx^a/d\lambda$（$\lambda$ はアフィンパラメータ）を使えます。その光を静止観測者が測る周波数は、観測者の単位四元速度と $p^a$ の内積の負号です。一方、時空の対称性に沿って保存される量には、単位四元速度ではなくKilling場が入ります。この二つを区別して名称と測定手順を固定します。

<a id="def-qcurv9-frequencies"></a>

<!-- formal-statement-start -->
> **定義（無限遠基準の周波数と静止時計の局所周波数）**
> $M>0$ のSchwarzschild静的外部 $r>2M$ において、$\xi=\partial_t$ を $g(\xi,\xi)\to-1$（$r\to\infty$）で規格化した未来向きKilling場とする。未来向き零測地線の非零アフィン接ベクトル $p^a$ に対して、無限遠基準の周波数 $E_\infty$ と半径 $r$ に静止する観測者の局所周波数 $E_{\rm loc}(r)$ を

$$
E_\infty:=-g(p,\xi),\qquad
u_{\rm stat}:=\frac{\xi}{\sqrt{f(r)}},\qquad
E_{\rm loc}(r):=-g(p,u_{\rm stat})
$$

> と定める。$p$ の規格化を選ぶまでは両量は同じ正の倍率の自由度を持つが、その**比**は規格化によらない。$r=2M$ には静止する単位時間的観測者をこの式で定義できない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv9-frequencies -->
### 直接例：半径 $4M$ で同じ光を測る

$r=4M$ では $f=1/2$ です。したがって $g(\xi,\xi)=-1/2<0$、$u_{\rm stat}=\sqrt2\,\xi$ は

$$
g(u_{\rm stat},u_{\rm stat})=2g(\xi,\xi)=-1
$$

を満たす未来向き単位時間的ベクトルです。光の零条件も直接確かめます。$r=4M$ の一点で、外向き零測地線のアフィン接ベクトルの初期値を $p=4\partial_t+2\partial_r$ と選びます。角度成分は零で、$p^t=4>0$、$p^r/p^t=1/2=f(4M)$ です。さらに

$$
g(p,p)=-\frac12(4)^2+\frac{1}{1/2}(2)^2=-8+8=0,
\qquad E_\infty=-g(p,\xi)=\frac12(4)=2>0.
$$

この初期値から出る未来向き零測地線で測れば、

$$
E_{\rm loc}(4M)=-g(p,\sqrt2\,\xi)=2\sqrt2>0.
$$

**定義の確認**：外部条件 $4M>2M$、Killing場の無限遠規格化、静止時計の単位ノルム、光の未来向き性に基づく周波数の正値をそれぞれ確かめました。$r\to\infty$ では $\sqrt f\to1$ なので二つの周波数が一致します。地平線上へ静止観測者を延ばして「無限大の周波数を直接測った」とは解釈しません。
<!-- definition-example-end -->

量子場の波束にも同じ時間尺度が入ります。静的時刻に関して位相が $e^{-i\omega_\infty t}$ の正振動数モードを固定半径で観測すると、時計の進み方 $d\tau=\sqrt f\,dt$ から、その世界線上では $e^{-i(\omega_\infty/\sqrt f)\tau}$ と見えます。これは単一Killing周波数成分についての変換であり、一般の非定常波束に一つの周波数があるという主張ではありません。

<a id="prop-qcurv9-redshift"></a>

<!-- formal-statement-start -->
> **命題（Killing周波数の保存と赤方偏移）**
> 上記のSchwarzschild外部で $\xi=\partial_t$ とし、アフィンパラメータ $\lambda$ を持つ未来向き零測地線の接ベクトルを $p^a$ とする。測地線が静的外部を通る間 $E_\infty=-p^a\xi_a>0$ は一定で、半径 $r>2M$ の静止観測者に対し

$$
\boxed{E_{\rm loc}(r)=\frac{E_\infty}{\sqrt{1-2M/r}}.}
$$

> 特に二つの静止観測者 $r_e,r_o>2M$ が同一の零測地線上の光を測れば、比は

$$
\frac{E_{\rm loc}(r_o)}{E_{\rm loc}(r_e)}
=\sqrt{\frac{f(r_e)}{f(r_o)}}
$$

> である。遠方極限は $E_{\rm loc}\to E_\infty$。局所のエネルギー発散という $r\downarrow2M$ の形式的極限は、地平線に静止時計が存在することを意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

測地線のアフィン条件とKilling方程式を使い、$\lambda$ で $p\cdot\xi$ を微分します。静止四元速度は $\xi/\sqrt f$ であるため、保存量を観測者の単位時計へ換算できます。

<!-- proof-start -->
### 証明

零測地線のアフィン接ベクトルは $p^b\nabla_b p^a=0$ を満たします。[Killing方程式](../../GR/GR14/index.md#def-gr14-killing-field)は $\nabla_{(a}\xi_{b)}=0$ です。従って

$$
\begin{aligned}
\frac{d}{d\lambda}(p^a\xi_a)
&=p^b\nabla_b(p^a\xi_a)\\
&=(p^b\nabla_b p^a)\xi_a+p^ap^b\nabla_b\xi_a\\
&=0+\frac12p^ap^b(\nabla_b\xi_a+\nabla_a\xi_b)=0.
\end{aligned}
$$

外部では $\xi$ と $p$ がともに未来向き（前者は時間的、後者は零）なので $-g(p,\xi)>0$ です。さらに $g(\xi,\xi)=-f$ で $f>0$ だから $u_{\rm stat}=\xi/\sqrt f$ は定義どおり単位時間的です。よって

$$
E_{\rm loc}(r)=-g\!\left(p,\frac{\xi}{\sqrt f}\right)
=\frac{-g(p,\xi)}{\sqrt f}=\frac{E_\infty}{\sqrt f}.
$$

$r_e,r_o$ では同じ $E_\infty$ を用いて割れば比が得られます。$f(r_o)\to1$ が遠方極限を与えます。$\square$
<!-- proof-end -->

## 2. 二本の光線を遠方の時計で比べる

周波数の基準を固定しても、出射した二本の光が遠方に何秒差で届くかを追わなければ、後の量子場の波束に時刻ラベルを付けられません。[GR26のtortoise座標](../../GR/GR26/index.md#def-gr26-tortoise) $r_*$ は、外部の動径方向の光線を直線にする変数です。

$$
r_*(r)=r+2M\log\left(\frac r{2M}-1\right),\qquad
\frac{dr_*}{dr}=\frac1{f(r)}.
$$

微分の検算をすると、$dr_*/dr=1+2M/(r-2M)=r/(r-2M)=1/f$ です。$r>2M$ で対数の引数は正、$r\downarrow2M$ で $r_*\to-\infty$。この座標は地平線まで有限値で延長できません。

角度を固定した光的曲線では $0=-fdt^2+f^{-1}dr^2$ なので、$dt>0$ の未来向き光線に対し

$$
\frac{dr}{dt}=\begin{cases}+f & \text{外向き},\\-f&\text{内向き}.\end{cases}
$$

ここでの $dr/dt$ は座標速度であり、局所で測った光速ではありません。[GR26の零時刻の定義](../../GR/GR26/index.md#def-gr26-null-times)へつなぐと、出射側 $u=t-r_*$ と入射側 $v=t+r_*$ が得られます。出射光線では $dt=dr/f=dr_*$ だから $du=0$、入射光線では $dt=-dr_*$ だから $dv=0$ です。$u$ と $v$ は別々の零光線族をラベル付けします。

<a id="prop-qcurv9-arrival"></a>

<!-- formal-statement-start -->
> **命題（出射零時刻と静止時計の到着間隔）**
> $M>0$ のSchwarzschild静的外部 $r>2M$ で、角度を固定して外向きに進む二本の未来向き動径零光線の出射零時刻を $u_1,u_2$ とし、$u_2>u_1$ とする。一定半径 $R>2M$ の静止観測者が各光線を一度ずつ受け取るとき、その到着時刻差と固有時間差は

$$
\boxed{\Delta t_R=u_2-u_1,\qquad
\Delta\tau_R=\sqrt{f(R)}(u_2-u_1).}
$$

> 同じ光線族を十分遠方の一定半径で受け取る極限では $\Delta\tau_R/\Delta u\to1$ となる。これは二本の外向き光線と静的な受信者についての関係であり、落下観測者の時計や崩壊時空全体の光線追跡を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

出射光線上で一定の $u_i$ を、半径が変わらない受信者の $t$ に戻します。二本の差を取れば $r_*(R)$ が消えます。その受信者の世界線に沿う計量から固有時間を掛け直します。

<!-- proof-start -->
### 証明

受信半径 $R$ は固定です。[出射零時刻](../../GR/GR26/index.md#def-gr26-null-times) $u_i=t_i-r_*(R)$ から

$$
t_i=u_i+r_*(R)\quad(i=1,2),\qquad
t_2-t_1=(u_2-u_1)+[r_*(R)-r_*(R)]=u_2-u_1.
$$

受信者は $dr=d\theta=d\varphi=0$ だから、計量に代入すると $d\tau_R^2=f(R)dt^2$ です。未来向きなので $d\tau_R=\sqrt{f(R)}dt$ と取り、$R$ 一定の間積分すれば $\Delta\tau_R=\sqrt{f(R)}\Delta t_R$。最後に $\lim_{R\to\infty}f(R)=1$ を代入します。$\square$
<!-- proof-end -->

**直接計算**：$R=4M$ なら $f=1/2$ で、出射ラベル差 $\Delta u=8M$ の二本が届く間隔は $\Delta t_R=8M$、受信者の時計では $\Delta\tau_R=4\sqrt2\,M$ です。$R$ を固定したまま局所時計だけを測れば、$t$ と $\tau_R$ が同じではないと分かります。

## 3. 表面重力の係数はどの時計から出るか

ここまでの $t$ は無限遠で規格化しました。地平線そのものは、外部の $t$ で $r=2M$ を直接代入するのでは扱えません。[GR26の入射Eddington–Finkelstein（EF）計量](../../GR/GR26/index.md#prop-gr26-ef-metric-domain)を使います。$v=t+r_*$ と $dt=dv-dr/f$ を外部で代入すると

$$
ds^2=-f\,dv^2+2\,dv\,dr+r^2d\Omega^2.
$$

なぜこの表示から地平線を判定できるのでしょうか。座標基底 $(\partial_v,\partial_r)$ での計量の成分は、交差項 $2\,dv\,dr$ が $g_{vr}=g_{rv}=1$ を意味するので、[GR26のEF計量と逆計量](../../GR/GR26/index.md#prop-gr26-ef-metric-domain)のとおり

$$
(g_{ab})=\begin{pmatrix}-f&1\\1&0\end{pmatrix},\qquad
(g^{ab})=\begin{pmatrix}0&1\\1&f\end{pmatrix},\qquad
\det(g_{ab})=-1
$$

です。したがって $r=2M$ でもこのブロックは非退化です。候補面を $F=r-2M=0$ と置くと法線共変ベクトルは $dF=dr\ne0$ で、逆計量による長さは $g^{-1}(dF,dF)=g^{rr}=f=0$ です。つまり面そのものが零超曲面です。

計量は $v$ に依存しないため、[座標によるKilling判定](../../GR/GR14/index.md#prop-gr14-killing-coordinate-test)から非零の $\chi=\partial_v$ はKilling場です。$v=t+r_*(r)$ なので $r$ 固定の偏微分では $\partial_v=\partial_t$ であり、地平線上の計量双対は

$$
\chi^\flat=g_{vv}\,dv+g_{rv}\,dr=-f\,dv+dr
\ \xrightarrow{r=2M}\ dr=dF.
$$

これで零超曲面・非零Killing場・法線方向という[GR29のKilling地平線の定義](../../GR/GR29/index.md#def-gr29-killing-horizon)の各条件を確認しました。$\chi$ が零ベクトルになるという意味ではありません。

地平線の[表面重力の定義](../../GR/GR45/index.md#def-gr45-surface-gravity)は、正則な地平線生成場 $\chi$ の非アフィン性 $\chi^b\nabla_b\chi^a=\kappa_\chi\chi^a$ です。地平線で測った静止観測者の「局所加速度」とは別の量です。ここでは[GR45の静的球対称地平線の定理](../../GR/GR45/index.md#thm-gr45-static)に具体的な $f$ を代入し、遠方時計との整合を確認します。

<a id="prop-qcurv9-kappa"></a>

<!-- formal-statement-start -->
> **命題（無限遠規格化のSchwarzschild表面重力）**
> $M>0$ のSchwarzschild時空の未来Killing地平線 $r=2M$ の正則部分で、無限遠で $g(\xi,\xi)\to-1$ と規格化した $\xi=\partial_t$ を入射EF表示の $\chi=\partial_v$ へ延長する。この生成場の表面重力は

$$
\boxed{\kappa_\infty=\frac1{4M}=\frac1{2r_s}>0.}
$$

> 時刻 $t'=bt$（$b>0$）に合わせて生成場を $\xi'=\partial_{t'}=b^{-1}\xi$ と取ると、表面重力は $\kappa_{\xi'}=\kappa_\infty/b$ となる。その代わり $\xi'^2\to-1/b^2$ となり、$\xi'$ は同じ無限遠単位時計ではない。
<!-- formal-statement-end -->

### 証明の見取り図

外部から正則に延長した入射EFの生成場を採用し、$f'(2M)$ を計算します。前提の $f(2M)=0$、滑らかさ、地平線上の正規化を確認してからGR45の定理へ代入します。時刻再標準化にはGR45の線形スケーリング則を使います。

<!-- proof-start -->
### 証明

$f(r)=1-2M/r$ は $r>0$ で滑らか、$f(2M)=0$、$f'(r)=2M/r^2$ です。入射EF計量は $r=2M$ で非退化で、$\chi=\partial_v$ は未来向きの零生成場です。従って[GR45の定理](../../GR/GR45/index.md#thm-gr45-static)を $r_h=2M$、$f$ のこの導関数へ適用すると

$$
\kappa_\infty=\frac12f'(2M)
=\frac12\frac{2M}{(2M)^2}
=\frac1{4M}.
$$

外部で $v=t+r_*(r)$ なので、$r$ 固定の偏微分は $\partial_v=\partial_t$。$g(\xi,\xi)=-f\to-1$ によりこの生成場の規格化が無限遠の単位時計と一致します。

次に $t'=bt$ なら $r$ 固定で $\partial_{t'}=b^{-1}\partial_t$ です。[GR45の生成場スケーリング命題](../../GR/GR45/index.md#prop-gr45-scaling)に定数 $A=1/b$ を代入して $\kappa_{\xi'}=\kappa_\infty/b$。ノルムも $g(\xi',\xi')=b^{-2}g(\xi,\xi)\to-b^{-2}$ です。$\square$
<!-- proof-end -->

この $\kappa_\infty$ の次元は自然単位で長さの逆数です。SIの「加速度としての表面重力」は[GR45の単位換算](../../GR/GR45/index.md#thm-gr45-static)のとおり $g_H=c^4/(4GM_{\rm SI})$。$\kappa_\infty$ をそのまま $\,{\rm m\,s^{-2}}$ と表記するのは次元の誤りです。

### 近づく静止観測者の加速度は発散する

静止観測者の四元加速度の大きさは[GR45の赤方偏移加速度命題](../../GR/GR45/index.md#prop-gr45-redshift)から

$$
a_{\rm stat}(r)=\frac{f'(r)}{2\sqrt f}
=\frac{M}{r^2\sqrt{1-2M/r}}.
$$

$r\downarrow2M$ で分母が零に近づくため $a_{\rm stat}\to+\infty$、しかし $\sqrt f\,a_{\rm stat}=M/r^2\to1/(4M)=\kappa_\infty$。有限に残るのは**遠方の時計で赤方偏移させた極限**です。地平線に静止観測者がいるわけではありません。[QCURV8の固有加速度から定まるUnruh温度](../QCURV8/index.md#thm-qcurv8-unruh)を、この発散する $a_{\rm stat}$ へそのまま代入し、崩壊放射の温度と呼ぶのも別の議論が欠けています。

## 4. 遠方で遅い出射光線のラベルは指数で圧縮される

[GR27のKruskal零座標](../../GR/GR27/index.md#def-gr27-kruskal-nulls)は、同じ外部の出射零時刻 $u=t-r_*$ から正則な地平線側のラベル $U$ を作りました。一般の時刻座標変換に指数が登場する理由は、$r_*$ が地平線で対数的に発散するからです。その指数の係数が、先に遠方で規格化した $\kappa_\infty=1/(4M)$ と一致することを確かめます。

<a id="thm-qcurv9-compression"></a>

<!-- formal-statement-start -->
> **定理（Kruskal出射ラベルの指数圧縮と地平線近傍の線形性）**
> $M>0$ の永遠のSchwarzschild解の右静的外部 $r>r_s=2M$ において、$u=t-r_*(r)$、$v=t+r_*(r)$ とする。無限遠規格化の $\kappa_\infty=1/(4M)$ に対し[外部のKruskal零座標](../../GR/GR27/index.md#def-gr27-kruskal-nulls)を

$$
U=-e^{-\kappa_\infty u}<0,\qquad
V=e^{\kappa_\infty v}>0
$$

> と取る。任意の $\Delta u>0$ と外部の $u\in\mathbb R$ について

$$
\boxed{\frac{U(u+\Delta u)}{U(u)}=e^{-\kappa_\infty\Delta u},
\qquad \frac{dU}{du}=-\kappa_\infty U>0.}
$$

> さらに $v=v_0\in\mathbb R$ を固定して $r=r_s+\varepsilon$、$\varepsilon\downarrow0$ と近づくと、

$$
\boxed{-U=e^{1-\kappa_\infty v_0}
\frac{\varepsilon}{r_s}\left[1+O(\varepsilon/r_s)\right].}
$$

> この極限は右外部から未来地平線 $U=0,V=e^{\kappa_\infty v_0}>0$ へ近づくものである。ここで示す指数関係は**永遠の静的外部の二つの座標ラベルの関係**であり、崩壊前の入射 $v$ と崩壊後の出射 $u$ を結ぶ光線追跡則とは異なる。
<!-- formal-statement-end -->

### 証明の見取り図

第一式は指数の比と微分だけで出ます。近地平線側は $u=v-2r_*$ と書き換え、$2\kappa_\infty=1/r_s$ を代入して対数を指数の中で打ち消します。$v$ を固定していることが、$U\to0$ に到達する地平線の枝を決めます。

<!-- proof-start -->
### 証明

$U(u)=-e^{-\kappa_\infty u}$ だから

$$
\frac{U(u+\Delta u)}{U(u)}
=\frac{-e^{-\kappa_\infty(u+\Delta u)}}{-e^{-\kappa_\infty u}}
=e^{-\kappa_\infty\Delta u},
\qquad
\frac{dU}{du}=\kappa_\infty e^{-\kappa_\infty u}=-\kappa_\infty U.
$$

外部では $U<0$、$\kappa_\infty>0$ より $dU/du>0$ です。$u\to+\infty$ のとき、$U$ は負側から0へ近づきます。

次に $v=v_0$ を固定します。$u=t-r_*$、$v=t+r_*$ なので $u=v_0-2r_*$。$r_s=2M$、$\kappa_\infty=1/(2r_s)$ として

$$
\begin{aligned}
-U&=e^{-\kappa_\infty u}
=e^{-\kappa_\infty v_0}e^{2\kappa_\infty r_*}\\
&=e^{-\kappa_\infty v_0}
\exp\!\left[\frac{r}{r_s}+\log\left(\frac r{r_s}-1\right)\right]\\
&=e^{-\kappa_\infty v_0}e^{r/r_s}
\left(\frac r{r_s}-1\right).
\end{aligned}
$$

$r=r_s+\varepsilon$、$\varepsilon>0$ を代入すると

$$
-U=e^{1-\kappa_\infty v_0}
\frac{\varepsilon}{r_s}e^{\varepsilon/r_s}.
$$

指数関数のTaylor展開 $e^x=1+x+O(x^2)$ を $x=\varepsilon/r_s\to0$ に適用して表示式を得ます。$V=e^{\kappa_\infty v_0}$ は有限正値のままなので、[GR27の四領域とEF座標の被覆範囲](../../GR/GR27/index.md#prop-gr27-regions-ef)により、極限は右外部から未来地平線 $U=0,V>0$ へ向かいます。$\square$
<!-- proof-end -->

**指数圧縮の数値例**：$\Delta u=4M\log2$ なら $\kappa_\infty\Delta u=\log2$ なので $U(u+\Delta u)/U(u)=1/2$。同じ間隔 $\Delta u$ の出射ラベルを順に取るたび、負の $U$ の絶対値は半分になります。$u$ は遠方時刻と同じ規格化ですが、$U$ は無次元の幾何学的ラベルです。$U$ の間隔をそのまま観測者の「秒」と解釈してはいけません。また、$U\to0^-$ のみでは時空上の地平線への接近を意味せず、例えば有限な $v$（従って有限正の $V$）を固定する条件が必要です。

**二つの指数を混同しない**：[GR27のKruskal変換](../../GR/GR27/index.md#prop-gr27-regular-metric)は古典的Schwarzschild外部の二つの時刻ラベルの対応です。崩壊時空で入射の過去零無限遠から未来零無限遠へ実際に光線を追ったとき、

$$
v_H-v_{\rm in}(u)\simeq A e^{-\kappa_\infty u}
$$

という**別の**関係を導くには、崩壊する物質内部との接続、地平線形成、遅い時刻、幾何光学近似が必要です。定数 $v_H,A$ は崩壊模型・時刻原点に依存します。上のKruskal変換だけではこの式も、Hawking粒子数も、まだ証明していません。

## 5. 何の「地平線」であるかを確かめる

「地平線」と言っても、判定に使う情報が違います。[GR29の未来事象地平線](../../GR/GR29/index.md#def-gr29-event-horizon)は未来零無限遠への因果到達可能性から決まり、[GR29の見かけの地平線](../../GR/GR29/index.md#def-gr29-trapped-apparent)は二球面に直交する光の膨張から判定し、[GR29のKilling地平線](../../GR/GR29/index.md#def-gr29-killing-horizon)はKilling生成場が零超曲面の法線になる条件から決まります。

| 名称 | 判定に必要なもの | この講義での注意 |
| --- | --- | --- |
| 未来事象地平線 | 適切な未来零無限遠へ届く因果曲線の全体 | 将来全体を使う大域的境界。瞬間的な $f=0$ だけでは一般に決まらない |
| 見かけの地平線 | 選んだ空間的切片上の外向き零膨張など | 切片依存で、時間依存背景では事象地平線とずれうる |
| Killing地平線 | 非零Killing生成場と零法線 | 時間並進等の対称性が要る。表面重力 $\kappa_\chi$ は生成場の規格化も要る |
| Rindler地平線 | Minkowski内の一様加速観測者がアクセスできる領域の境界 | [QCURV7のくさび](../QCURV7/index.md#def-qcurv7-wedges)は平坦時空の観測者依存の領域で、ブラックホール事象地平線を意味しない |

永遠のSchwarzschildの標準的な切片では、[GR29で証明した三種類の地平線の一致](../../GR/GR29/index.md#prop-gr29-schwarzschild-coincidence)により $r=2M$ が未来事象・見かけ・Killingの境界と一致します。ただし定義が一致したわけではありません。時間依存の[Vaidya模型での分離](../../GR/GR29/index.md#prop-gr29-vaidya-separation)は、局所条件 $f=0$ から未来事象地平線を即断する推論が壊れる直接例です。

量子場の議論に引き渡すものは、(i) $t$・$u$ が遠方で規格化されていること、(ii) 未来地平線では $U$ が滑らかなラベルであること、(iii) 二つのラベルを結ぶ係数が $\kappa_\infty$ であること、の三点です。これらは**温度導出の幾何学的入力**であって、状態・Bogoliubov係数・遠方の粒子流束についてはまだ何も確定しません。

## 演習

### Level A：符号・時計・零光線を一つずつ計算する

<a id="ex-qcurv9-a01"></a>
#### QCURV9-A01 静止時計と周波数

- Level: A
- 問題: $M>0$ のSchwarzschild外部 $r=4M$ にいる静止観測者の $d\tau/dt$、$u_{\rm stat}$ と、$E_\infty=3$ の光の $E_{\rm loc}$ を[定義](#def-qcurv9-frequencies)から求めよ。

<!-- solution-start -->
**詳細解答**：$f(4M)=1-2M/(4M)=1/2$ です。静止世界線上で $ds^2=-fdt^2=-d\tau^2$ なので $d\tau/dt=1/\sqrt2$。単位四元速度は $u_{\rm stat}=\xi/\sqrt f=\sqrt2\,\partial_t$ です。実際 $g(u_{\rm stat},u_{\rm stat})=2(-1/2)=-1$。従って $E_{\rm loc}=-g(p,\sqrt2\xi)=\sqrt2E_\infty=3\sqrt2$。$E_\infty$ と局所量を直接等置しません。
<!-- solution-end -->

<a id="ex-qcurv9-a02"></a>
#### QCURV9-A02 tortoise座標の値と端点

- Level: A
- 問題: $r_s=2M$ とし、[tortoise座標](../../GR/GR26/index.md#def-gr26-tortoise)の $r=2r_s$ における値と導関数を求めよ。また $r\downarrow r_s$ に対する極限を答えよ。

<!-- solution-start -->
**詳細解答**：[tortoise座標](../../GR/GR26/index.md#def-gr26-tortoise)の定義式へ $r=2r_s$ を代入し、動径 $r$ で微分すると

$$
\begin{aligned}
r_*(2r_s)&=2r_s+r_s\log(2-1)=2r_s,\\
\frac{dr_*}{dr}&=1+\frac{r_s}{r-r_s}=\frac{r}{r-r_s},\\
\left.\frac{dr_*}{dr}\right|_{r=2r_s}&=2.
\end{aligned}
$$

$r\downarrow r_s$ では $r/r_s-1\downarrow0^+$ なので対数は $-\infty$ に発散し、有限な $r$ の項に勝って $r_*\to-\infty$ です。外部の座標としての発散を、曲率の発散とはみなしません。
<!-- solution-end -->

<a id="ex-qcurv9-a03"></a>
#### QCURV9-A03 零時刻の向き

- Level: A
- 問題: $r=4M$ における角度一定の未来向き動径零光線の $dr/dt$ を外向き・内向き別に求め、それぞれ $du/dt$、$dv/dt$ のどちらが零かを示せ。

<!-- solution-start -->
**詳細解答**：零条件 $0=-fdt^2+f^{-1}dr^2$ より $(dr/dt)^2=f^2$、$f(4M)=1/2$ なので外向きは $dr/dt=+1/2$、内向きは $-1/2$。$dr_*/dt=(dr_*/dr)(dr/dt)=f^{-1}(dr/dt)$ は順に $+1,-1$ です。外向きでは $du/dt=1-dr_*/dt=0$、内向きでは $dv/dt=1+dr_*/dt=0$。逆の零時刻を一定にすると入射と出射を取り違えます。
<!-- solution-end -->

<a id="ex-qcurv9-a04"></a>
#### QCURV9-A04 表面重力の規格化

- Level: A
- 問題: 質量パラメータ $M=2$（幾何単位）のSchwarzschild外部について $\kappa_\infty$ を求める。さらに $t'=3t$、$\xi'=\partial_{t'}$ にすると $\kappa_{\xi'}$ と無限遠の $\xi'^2$ はいくつになるか。

<!-- solution-start -->
**詳細解答**：[表面重力の命題](#prop-qcurv9-kappa)より $\kappa_\infty=1/(4M)=1/8$。$t'=3t$ は座標基底を $\xi'=\partial_{t'}=\xi/3$ とするので、[GR45のスケーリング則](../../GR/GR45/index.md#prop-gr45-scaling)から $\kappa_{\xi'}=1/24$。ノルムは $\xi'^2=\xi^2/9\to-1/9$ です。値が小さくなったのは質量の変化でなく、生成場の時間基準を変更したためです。
<!-- solution-end -->

<a id="ex-qcurv9-a05"></a>
#### QCURV9-A05 指数ラベルの符号と比

- Level: A
- 問題: $M>0$、$\kappa_\infty=1/(4M)$、$U=-e^{-\kappa_\infty u}$ とし、有限な入射零時刻 $v=v_0$（従って $V=e^{\kappa_\infty v_0}>0$）を固定する。$u_1=0$、$u_2=4M\log2$ に対する $U_1,U_2$ と比を求め、未来地平線へ近づく向きを述べよ。

<!-- solution-start -->
**詳細解答**：二つのラベルへ定義式を代入します。

$$
U_1=-e^0=-1,\qquad
\kappa_\infty u_2=\log2,\qquad
U_2=-e^{-\log2}=-\frac12,\qquad
\frac{U_2}{U_1}=\frac12.
$$

$U$ は $-1$ から $-1/2$ へ**増加**します。固定した有限 $v_0$ に対して $V=e^{\kappa_\infty v_0}>0$ は一定であり、$u\to+\infty$ では $U\to0^-$ です。[GR27のEF被覆範囲](../../GR/GR27/index.md#prop-gr27-regions-ef)から、このときは右外部から未来地平線に近づくと結論できます。

ただし $v$ を固定しなければ、$U\to0^-$ だけで同じ結論にはなりません。
<!-- solution-end -->

### Level B：保存則・極限と適用条件をつなぐ

<a id="ex-qcurv9-b01"></a>
#### QCURV9-B01 Killing周波数を再導出する

- Level: B
- 問題: 時間的Killing場 $\xi$ とアフィン媒介した未来向き零測地線の接ベクトル $p$ に対し $d(-p^a\xi_a)/d\lambda=0$ を証明せよ。続いてSchwarzschild外部 $r_e=4M$ と $r_o=8M$ の静止観測者が同じ光を測る場合の $E_{\rm loc}(r_o)/E_{\rm loc}(r_e)$ を求めよ。

<!-- solution-start -->
**詳細解答**：積の共変微分で $p^b\nabla_b(p^a\xi_a)=(p^b\nabla_b p^a)\xi_a+p^ap^b\nabla_b\xi_a$。第一項はアフィン測地線方程式で0、第二項は $p^ap^b$ が対称でKilling方程式 $\nabla_b\xi_a+\nabla_a\xi_b=0$ と縮約するので0です。$f(4M)=1/2$、$f(8M)=1-1/4=3/4$。同じ保存量 $E_\infty$ に[局所周波数の命題](#prop-qcurv9-redshift)を使えば、$E_{\rm loc}(8M)/E_{\rm loc}(4M)=\sqrt{(1/2)/(3/4)}=\sqrt{2/3}<1$ です。外へ進む光の局所周波数は減ります。
<!-- solution-end -->

<a id="ex-qcurv9-b02"></a>
#### QCURV9-B02 発散する加速度と有限な表面重力

- Level: B
- 問題: $ds^2=-fdt^2+f^{-1}dr^2+r^2d\Omega^2$、$f=1-2M/r$ の $r>2M$ で、静止四元速度 $u=f^{-1/2}\partial_t$ の四元加速度の大きさを求めよ。$r\downarrow2M$ で $|a|$ と $\sqrt f|a|$ の極限を比較せよ。

<!-- solution-start -->
**詳細解答**：静止世界線では $r$ は一定なので $u^b\partial_bu^a=0$ です。$f'=df/dr$ とし、Levi-Civita接続の係数を計算すると

$$
\Gamma^r_{tt}=-\frac12g^{rr}\partial_rg_{tt}
=\frac12ff',\qquad
a^r=\Gamma^r_{tt}(u^t)^2
=\frac{ff'}2\frac1f=\frac{f'}2=\frac{M}{r^2}.
$$

他の加速度成分は零です。動径計量 $g_{rr}=f^{-1}$ でノルムを取り、外部の $f'>0$ を使うと

$$
a^aa_a=g_{rr}(a^r)^2=\frac{(f')^2}{4f},\qquad
|a|=\frac{f'}{2\sqrt f}=\frac{M}{r^2\sqrt f}.
$$

$r\downarrow2M$ で $f\downarrow0$ かつ $M/r^2\to1/(4M)>0$ だから局所加速度は発散します。一方、赤方偏移した量は

$$
\sqrt f\,|a|=\frac{M}{r^2}\longrightarrow\frac1{4M}
$$

となり、[無限遠規格化の表面重力](#prop-qcurv9-kappa)と一致します。これによって局所静止観測者が地平線に存在すると示したわけではありません。
<!-- solution-end -->

<a id="ex-qcurv9-b03"></a>
#### QCURV9-B03 固定入射時刻での地平線近傍極限

- Level: B
- 問題: $r_s=2M$、$\kappa=1/(2r_s)$ とする。外部で $u=v-2r_*$、$U=-e^{-\kappa u}$、$r_*=r+r_s\log(r/r_s-1)$ を使い、$v=v_0$ を固定して $r=r_s+\varepsilon$、$\varepsilon\downarrow0$ の $(-U)/\varepsilon$ の極限を計算せよ。$V=e^{\kappa v_0}$ の符号も記せ。

<!-- solution-start -->
**詳細解答**：$-U=e^{-\kappa v_0}e^{2\kappa r_*}$ で $2\kappa=1/r_s$ です。$r_*$ を代入すると $e^{2\kappa r_*}=e^{r/r_s}(r/r_s-1)$。$r=r_s+\varepsilon$ より

$$
\frac{-U}{\varepsilon}
=\frac{e^{-\kappa v_0}}{r_s}e^{1+\varepsilon/r_s}
\longrightarrow\frac{e^{1-\kappa v_0}}{r_s}>0.
$$

$v_0$ は有限実数なので $V=e^{\kappa v_0}>0$、したがって極限は $U\to0^-$、$V>0$ の右外部から未来地平線への接近です。$v$ も同時に無限大へ送るならこの結論を無条件に流用できません。
<!-- solution-end -->

<a id="ex-qcurv9-b04"></a>
#### QCURV9-B04 時計の間隔と光線の間隔

- Level: B
- 問題: $r_e=4M$ に静止する発光者が、固有時間差 $\Delta\tau_e=2M$ で二本の外向き零光線を発射する。両光線を $R=8M$ に静止する受信者が受け取るとき、$\Delta u$、$\Delta t_R$、$\Delta\tau_R$ を求めよ。各世界線が静止し、外部の光線が一度ずつ届くとする。

<!-- solution-start -->
**詳細解答**：発光者の同一半径上では $\Delta\tau_e=\sqrt{f(r_e)}\Delta t_e$、$f(4M)=1/2$ だから $\Delta t_e=2\sqrt2\,M$。$r_*(r_e)$ は両発射で同じなので、$u_i=t_{e,i}-r_*(r_e)$ より $\Delta u=\Delta t_e=2\sqrt2\,M$。[到着間隔の命題](#prop-qcurv9-arrival)から $\Delta t_R=\Delta u$。$f(8M)=3/4$ だから

$$
\Delta\tau_R=\sqrt{\frac34}\,\Delta t_R
=\frac{\sqrt3}{2}(2\sqrt2\,M)=\sqrt6\,M.
$$

遠方側の固有時間が長いのは、同じKilling時刻差に対して $r_o$ の時計が発光者より速く進むためです。落下する受信者にはこの式を直接適用しません。
<!-- solution-end -->

### Level C：周波数・時計・地平線を一つの説明へ統合する

<a id="ex-qcurv9-c01"></a>
#### QCURV9-C01 光線の指数ラベルから先、何がまだ必要か

- Level: C
- 問題: $M>0$ の永遠のSchwarzschild外部で、$r_e=4M$ の静止発光者が固有時間差 $2M$ で二本の外向き光線を発射する。両方とも無限遠へ到達するものとし、次の4点を求めよ。

  1. 無限遠で規格化した $\xi$、$f(r_e)$、$\Delta u$ を確定せよ。
  2. $\kappa_\infty$ とそれに対応する $U_2/U_1$ を求めよ。
  3. 各光線の発射時の局所周波数が同じ $\omega_e$ なら遠方の周波数はいくつか。
  4. 事象・見かけ・Killing地平線の一致とRindler地平線の違いを述べ、この計算だけでは崩壊時空のHawking粒子数を出せない理由を、欠けている入力とともに説明せよ。

<!-- solution-start -->
**詳細解答**：

**（1）** 無限遠で規格化した生成場は $\xi=\partial_t$ で $g(\xi,\xi)=-f\to-1$。$f(4M)=1/2$、発光者の静止時計は $d\tau_e=dt_e/\sqrt2$ なので、$\Delta t_e=(2M)/(1/\sqrt2)=2\sqrt2\,M$。各出射光線で $u_i=t_{e,i}-r_*(4M)$、同じ $r_*$ が差で消えるから $\Delta u=2\sqrt2\,M$ です。

**（2）** [表面重力](#prop-qcurv9-kappa)は $\kappa_\infty=1/(4M)$ です。[指数圧縮定理](#thm-qcurv9-compression)に $\Delta u=2\sqrt2\,M$ を代入して

$$
\frac{U_2}{U_1}=\exp\!\left[-\frac1{4M}(2\sqrt2\,M)\right]
=e^{-\sqrt2/2}.
$$

両 $U_i$ は負ですが比は正で $1$ 未満です。二本の $u$ の差が正なので、後の光線ほど $U$ は0へ近づきます。

**（3）** [Killing周波数の赤方偏移](#prop-qcurv9-redshift)より発光点で $\omega_e=\omega_\infty/\sqrt{f_e}=\sqrt2\,\omega_\infty$。従って $\omega_\infty=\omega_e/\sqrt2$。質量パラメータ $M$ の単位と、周波数の逆長さ次元は整合します。

**（4）** 永遠のSchwarzschildの標準的な切片では、[GR29の三地平線の一致](../../GR/GR29/index.md#prop-gr29-schwarzschild-coincidence)により $r=2M$ ですが、それぞれ未来への因果到達、零膨張、Killing零法線という異なる条件で判定しました。[Rindlerくさび](../QCURV7/index.md#def-qcurv7-wedges)は平坦Minkowski中の加速観測者のアクセス領域であり、曲率を持つブラックホールの大域的な事象地平線ではありません。

さらにここでの $U=-e^{-\kappa_\infty u}$ は永遠の外部の**二つの座標ラベルの対応**で、崩壊前に過去零無限遠から入射した光線の $v_{\rm in}$ がどの出射 $u$ へ到達するかを計算していません。崩壊時空の内部との接続、$v_H-v_{\rm in}(u)$ の遅い時刻の指数関係、in/outモードの正負周波数分解と波束規格化、量子状態の選択が追加で必要です。従ってこの比だけを粒子占有数やHawking温度の導出済み結果とはみなしません。
<!-- solution-end -->

## 次の計算へ

本章で無限遠の時計 $t$ と出射零時刻 $u$ の規格化を固定し、正則な未来地平線の出射ラベル $U$ が $e^{-\kappa_\infty u}$ で変わると計算しました。次に必要なのは、この**静的外部内の関係**を、星が崩壊する時空における入射光線と出射光線の**実際の対応**へ接続することです。そこでは物質内部の光線追跡、地平線形成と遅い時刻の近似を明示してから、初めてin/out波束の位相を比較できます。
