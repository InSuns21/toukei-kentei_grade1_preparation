# ITD14 位置依存拡散の熱力学：雑音誘起ドリフト・経路反転・散逸

[ITD12の確率流](../ITD12/index.md#thm-itd12-current-and-heat)と[ITD13の経路反転](../ITD13/index.md#thm-itd13-girsanov-reversal)は、拡散係数が空間で一定の模型でした。では、粒子が場所によって動きやすかったり動きにくかったりするとどうなるのでしょうか。単にBrown運動の係数を位置の関数に置き換えるだけでは、力が零でも不自然に偏った「平衡分布」が生じます。

ここで解きたいのは、**熱浴の温度はどこでも同じなのに雑音の強さが場所で変わる場合、平衡・経路反転・第二法則を一貫して記述するには何が必要か**という問いです。位置依存移動度に伴うドリフトをまず導き、そのドリフトを含む可逆な拡散を基準として正逆経路の確率比を計算します。

扱うのは有限時間 $[0,\tau]$、長さ $L>0$ の円周 $\mathbb R/L\mathbb Z$、単一の等温浴 $T>0$ です。$k_{\mathrm B}$ をBoltzmann定数、$\beta=(k_{\mathrm B}T)^{-1}$ とします。円周の位置を $X_t$、一周した回数も保持する実数値の持ち上げを $Z_t$ と書き、$X_t=Z_t\pmod L$ とします。$\int F_t\circ dZ_t$ のような積分には持ち上げを使います。

## 1. 拡散係数を位置依存にすると何が変わるか

移動度 $\mu(x)$ は同じ力を加えたときの動きやすさ、$D(x)$ は位置 $x$ での拡散の強さです。等温浴では局所的なEinstein関係 $D(x)=\mu(x)k_{\mathrm B}T$ を課します。$D'(x)=dD(x)/dx$ は位置 $x$ に関する微分であり、時刻微分ではありません。また $U_t(x)=U(t,x)$ と書き、$\partial_xU_t(x)$ は時刻 $t$ を固定した位置微分、$\partial_tU_t(x)$ は位置 $x$ を固定した時刻微分を意味します。$F_t=F(t)$ は時刻だけに依存する外力です。

Itô積分の係数 $\sqrt{2D(X_t)}$ を位置に依存させると、Itô形とStratonovich形のドリフトが異なります。これを「雑音誘起ドリフト」と呼びます。名前だけで物理的な向きを決めず、平衡で流れが零になる条件から係数を判定しましょう。

<a id="def-itd14-isothermal-diffusion"></a>

<!-- formal-statement-start -->
> **定義（位置依存移動度を持つ等温円周拡散）**  
> $\tau,L,T>0$ を固定する。$D:\mathbb R\to(0,\infty)$ は $C^3$ 級、周期 $L$ で、ある $d_->0$ について $D(x)\ge d_-$ とする。$\mu(x)=\beta D(x)$ とする。$U:[0,\tau]\times\mathbb R\to\mathbb R$ は時刻について $C^1$ 級、空間について $C^3$ 級の周期ポテンシャル、$F\in C^1[0,\tau]$ は位置に依存しない外力とする。$f_t(x)=F_t-\partial_xU_t(x)$ と置く。初期位置 $X_0$ は正の $C^2$ 級周期密度 $\rho_0$ に従い、Brown運動 $B$ と独立とする。**等温円周拡散**を次のItô確率微分方程式の解と定める。

$$
dZ_t=\{\beta D(X_t)f_t(X_t)+D'(X_t)\}\,dt
 +\sqrt{2D(X_t)}\,dB_t,\qquad X_t=Z_t\pmod L.
$$

> この式と同じ経路を表すStratonovich形は次である。

$$
dZ_t=\{\beta D(X_t)f_t(X_t)+\tfrac12D'(X_t)\}\,dt
 +\sqrt{2D(X_t)}\circ dB_t.
$$
<!-- formal-statement-end -->

**変換を確かめる**：[STO7のItô–Stratonovich変換公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)を位置依存の雑音係数に適用します。$g(x)=\sqrt{2D(x)}$ と置くと、$d[g(X),B]_t=g'(X_t)g(X_t)\,dt$ なので、$g(X_t)\circ dB_t$ から $g(X_t)\,dB_t$ への補正は

$$
\frac12g(x)g'(x)
=\frac12\sqrt{2D(x)}\frac{D'(x)}{\sqrt{2D(x)}}
=\frac12D'(x).
$$

従ってStratonovichのドリフトへ $D'/2$ を足すと、定義のItôドリフト $\beta Df+D'$ になります。$D$ は正で滑らか、円周上で有界ですから係数は一様Lipschitzで、有限時間の強解が一意に存在します。$D'$ を付ける理由そのものは、次節で定常流を計算して確認します。

<!-- definition-example-start: def-itd14-isothermal-diffusion -->
### 直接例：右半分と左半分で動きやすさが違う円周

$k=2\pi/L$、$D_0>0$、$0<\varepsilon<1$ とし、

$$
D(x)=D_0\{1+\varepsilon\cos(kx)\},\qquad
D'(x)=-D_0\varepsilon k\sin(kx).
$$

**定義の確認**：下限 $D_0(1-\varepsilon)>0$、周期性、滑らかさが直接確かめられます。$U=0$、$F=0$ とすれば両者は求められる滑らかさを持ち、初期密度 $\rho_0=1/L$ も正で正規化されています。$f=0$ のときでも定義のItôドリフトは $D'$ で零とは限らず、Stratonovichドリフトは $D'/2$ です。これは粒子に非保存外力が働くという意味ではありません。$D$ の異なる位置で同じ一様平衡分布を保つための項です。
<!-- definition-example-end -->

## 2. 力が零なら何が平衡になるか

密度 $\rho_t(x)$ の確率流 $J_t(x)$ とは、区間の端を単位時間に正方向へ横切る確率の正味量です。密度の減少は流出で説明されるので、保存則は $\partial_t\rho_t=-\partial_xJ_t$ です。

<a id="thm-itd14-current-equilibrium"></a>

<!-- formal-statement-start -->
> **定理（確率流と平衡密度）**  
> [等温円周拡散](#def-itd14-isothermal-diffusion)の仮定の下で、初期の正の周期密度 $\rho_0$ から得られる時刻 $t$ の密度 $\rho_t$ は正で滑らかであり、確率流 $J_t$ は

$$
\partial_t\rho_t=-\partial_xJ_t,\qquad
J_t(x)=\beta D(x)f_t(x)\rho_t(x)-D(x)\partial_x\rho_t(x)
$$

> と表せる。特に $F_t=0$、$U_t=U$ が時刻によらないとき、

$$
\pi_U(x)=\frac{e^{-\beta U(x)}}{\mathcal Z_U},\qquad
\mathcal Z_U=\int_0^L e^{-\beta U(x)}\,dx
$$

> は正規化された定常密度で、$J=0$ である。逆に周期的な正密度で $J=0$ なら $\rho=\pi_U$ である。
<!-- formal-statement-end -->

力が零のときに一様密度が平衡になるのは、$D'$ を含むモデルの**検証可能な帰結**です。これは単なる慣習による選択ではありません。

### 証明の見取り図

Itô公式を試験関数に適用すると、$D'$ が拡散項の積の微分から生じる項と打ち消し合います。その結果、流れを $J=D(\beta f\rho-\rho')$ と書けます。$f=-U'$ を代入すると、Gibbs密度の対数微分によって二項が相殺されます。

<!-- proof-start -->
### 証明

周期的な滑らかな関数 $\varphi$ を取り、[STO7の時間依存Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を定義のSDEに適用します。$\varphi$ は時刻によらないので $\partial_t\varphi=0$ であり、二次変分率 $2D$ の半分が $D\varphi''$ になります。確率積分の期待値は零なので

$$
\frac{d}{dt}\int_0^L\varphi(x)\rho_t(x)\,dx
=\int_0^L\{(\beta Df_t+D')\varphi'+D\varphi''\}\rho_t\,dx.
$$

二度目の項を一度部分積分し、周期境界での端点項を消すと

$$
\int_0^LD\varphi''\rho_t\,dx
=-\int_0^L\varphi'(D'\rho_t+D\rho_t')\,dx.
$$

従って $D'\varphi'\rho_t$ が相殺され、

$$
\frac{d}{dt}\int\varphi\rho_t\,dx
=\int\varphi'\{\beta Df_t\rho_t-D\rho_t'\}\,dx
=-\int\varphi\,\partial_xJ_t\,dx.
$$

これが弱形式での保存則です。$D\ge d_->0$ という正の下限と滑らかな周期係数、正の滑らかな初期密度から、有限時間の古典解と正性が得られ、式は点ごとにも成立します。

$F=0$ なら $f=-U'$ です。$\pi_U'=-\beta U'\pi_U$ を代入すると

$$
J=\beta D(-U')\pi_U-D(-\beta U'\pi_U)=0.
$$

逆に $J=0$ なら正の $D,\rho$ について $\rho'/\rho=\beta f=-\beta U'$ だから

$$
\frac{d}{dx}\{\log\rho(x)+\beta U(x)\}=0.
$$

従って $\rho=C e^{-\beta U}$、積分が1になる条件から $C=1/\mathcal Z_U$ と一意に決まります。
<!-- proof-end -->

### 直接例：補正を一項落とすと別の模型になる

先の $D(x)=D_0(1+\varepsilon\cos kx)$、$U=F=0$ を考えます。正しい模型では $J=-D\rho'$ なので、$\rho=1/L$ が平衡です。これに対して、誤ってItô式を $dZ_t=\sqrt{2D(X_t)}\,dB_t$ とした場合、試験関数の同じ計算から流れは

$$
J_{\mathrm{wrong}}=-(D\rho)' .
$$

無流条件は $D(x)\rho(x)=C$ だから $\rho(x)\propto1/D(x)$ となります。例えば $\varepsilon=1/2$ では拡散の弱い地点に多く粒子が集まります。これは先の等温模型の平衡と異なり、**同じ温度・同じ物理条件での別表記ではない**のです。

## 3. 仕事と熱の向きは変える必要があるか

移動度が変わっても、物理的な仕事の定義まで変更する必要はありません。位置依存の $D$ は運動の統計を変えますが、ポテンシャルの連鎖律は同じStratonovich積分で書けます。仕事は系へ入る向き、浴熱は系から浴へ出る向きを正とします。

<a id="def-itd14-heat-work"></a>

<!-- formal-statement-start -->
> **定義（位置依存拡散における仕事と浴熱）**  
> [等温円周拡散](#def-itd14-isothermal-diffusion)に対して、時刻依存ポテンシャル $U_t$ と外力 $F_t$ による仕事 $W$、浴へ出る熱 $Q_{\mathrm{bath}}$、内部エネルギー変化 $\Delta U$ を

$$
\begin{aligned}
W&=\int_0^\tau\partial_tU_t(X_t)\,dt
   +\int_0^\tau F_t\circ dZ_t,\\
Q_{\mathrm{bath}}&=\int_0^\tau f_t(X_t)\circ dZ_t,\\
\Delta U&=U_\tau(X_\tau)-U_0(X_0)
\end{aligned}
$$

> と定める。$\circ dZ_t$ はStratonovich積分とし、$Z_t$ は円周位置 $X_t$ の持ち上げである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd14-heat-work -->
### 直接例：位置ごとに摩擦が違う坂を上下させる

$U_t(x)=a(t)\cos(kx)$、$F_t=0$、$a\in C^1[0,\tau]$、$D(x)=D_0(1+\varepsilon\cos kx)$ とします。定義に代入すると

$$
W=\int_0^\tau a'(t)\cos(kX_t)\,dt,\qquad
Q_{\mathrm{bath}}=\int_0^\tau k a(t)\sin(kX_t)\circ dZ_t.
$$

**定義の確認**：$0<\varepsilon<1$ により $D(x)\ge D_0(1-\varepsilon)>0$ を満たし、$U$ は時刻 $C^1$・空間周期的で滑らか、$F=0$ も許された外力です。$\partial_tU$ と $f=-\partial_xU$ を定義の両積分へ実際に代入したので、仕事と浴熱の二つの非自明な条件を満たします。ポテンシャルの時間変更による仕事は、粒子が一周しなくても生じます。$D'$ を浴熱へ別途加算してはいけません。
<!-- definition-example-end -->

<a id="thm-itd14-first-law"></a>

<!-- formal-statement-start -->
> **定理（位置依存拡散の軌道第一法則）**  
> [等温円周拡散](#def-itd14-isothermal-diffusion)の任意の有限時間経路について、[仕事と浴熱](#def-itd14-heat-work)は確率1で

$$
\Delta U=W-Q_{\mathrm{bath}}
$$

> を満たす。この等式に $D'$ 由来の追加の仕事項・熱項は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

Stratonovichの連鎖律で $dU_t(X_t)$ を時刻変化と位置変化に分離します。位置の変化について $-\partial_xU=f-F$ を使えば、仕事と浴熱の差になります。

<!-- proof-start -->
### 証明

周期関数 $U_t$ は持ち上げ $Z_t$ に対しても同じ値を持つので、[Stratonovich連鎖律](../ITD7/index.md#prop-itd7-stratonovich-balance)より

$$
dU_t(X_t)=\partial_tU_t(X_t)\,dt+\partial_xU_t(X_t)\circ dZ_t.
$$

$f_t=F_t-\partial_xU_t$ を移項して $\partial_xU_t=F_t-f_t$ とし、$t=0$ から $\tau$ まで積分すると

$$
\begin{aligned}
U_\tau(X_\tau)-U_0(X_0)
&=\int_0^\tau\partial_tU_t(X_t)\,dt
  +\int_0^\tau\{F_t-f_t(X_t)\}\circ dZ_t\\
&=W-Q_{\mathrm{bath}}.
\end{aligned}
$$

Stratonovich連鎖律は拡散係数が位置に依存していても成立します。雑音誘起ドリフトは経路法則を定める項であり、この連鎖律に独立な熱項として加わるものではありません。
<!-- proof-end -->

## 4. 何を基準に正逆経路を比較するか

[ITD13](../ITD13/index.md#thm-itd13-girsanov-reversal)では一様Brown運動が時間反転で不変でした。しかし $D$ が位置依存のとき、ドリフト零のItô拡散は平衡で一様になりません。今度は **$f=0$ でItôドリフト $D'$ を持つ可逆拡散**を基準にします。

基準過程 $R$ は初期位置を一様に選び、

$$
dZ_t=D'(X_t)\,dt+\sqrt{2D(X_t)}\,dB_t
$$

に従います。生成作用素は $\mathcal L_0\varphi=(D\varphi')'$ です。周期関数 $u,v$ に対して

$$
\int_0^Lu\mathcal L_0v\,dx
=-\int_0^LDu'v'\,dx
=\int_0^Lv\mathcal L_0u\,dx.
$$

この対称な生成作用素から得られるMarkov半群も一様測度について対称です。時刻幅 $s>0$ の円周上の遷移密度を $p_s(x,y)$ とすると、$p_s(x,y)=p_s(y,x)$ が成り立ちます。例えば $0<t_1<t_2$ における三点の同時密度は

$
\frac1L p_{t_1}(x_0,x_1)p_{t_2-t_1}(x_1,x_2)
=\frac1L p_{t_2-t_1}(x_2,x_1)p_{t_1}(x_1,x_0).
$

右辺は時刻間隔を逆順にした経路の三点密度です。任意の有限個の時刻でも同じ積の反転ができ、連続円周経路の法則はこれらの有限次元分布で定まるので、基準過程 $R$ は時間反転不変です。連続する円周経路から持ち上げの**増分**は一意に復元できるため、逆経路では各増分と全変位 $Z_\tau-Z_0$ の符号を反転させます。

<a id="def-itd14-reversed-path"></a>

<!-- formal-statement-start -->
> **定義（位置依存拡散の逆実験と全エントロピー生成）**  
> [等温円周拡散](#def-itd14-isothermal-diffusion)で正方向の力 $f_t(x)=F_t-\partial_xU_t(x)$ と正の初期密度 $\rho_0$ を与え、時刻 $\tau$ の密度を $\rho_\tau$ とする。正実験の経路法則を $P$ とする。
>
> 逆実験は、初期密度 $\rho_\tau$、同じ位置依存の $D$ と、逆順の力 $f_t^{\mathrm R}(x)=f_{\tau-t}(x)$ に従う等温円周拡散とし、その経路法則を $P_{\mathrm R}$ とする。
>
> 経路反転 $\Theta$ は円周経路を $X_t^\dagger=X_{\tau-t}$ へ写し、持ち上げの増分は逆符号で逆順にする。$Q=P_{\mathrm R}\circ\Theta^{-1}$ と置き、全エントロピー生成（$k_{\mathrm B}$ 単位）を

$$
\sigma=\log\frac{dP}{dQ}
$$

> と定義する。$dP/dQ$ は同じ向きに並べ直した円周経路と持ち上げ増分に対するRadon–Nikodym密度である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd14-reversed-path -->
### 直接例：力を切った平衡過程

$U=F=0$、$\rho_0=1/L$、$D(x)=D_0(1+\varepsilon\cos kx)$（$0<\varepsilon<1$）とします。**定義の確認**：この $D$ は正で周期的、密度は正で正規化され、[確率流](#thm-itd14-current-equilibrium)が零なので全時刻で $\rho_t=1/L$ です。逆実験の力 $f^{\mathrm R}_t=f_{\tau-t}=0$、初期密度 $\rho_\tau=1/L$ も確定します。前節の可逆基準過程がそのまま正・逆実験となり、遷移核の対称性によって $P=Q$、従って $\sigma=0$ です。$D(x)$ が一定でないこと自体は、平衡の散逸を意味しません。
<!-- definition-example-end -->

<a id="thm-itd14-path-ratio"></a>

<!-- formal-statement-start -->
> **定理（可逆基準過程の作用と経路確率比）**  
> 正の周期的 $D\in C^3$、$U_t$ と $F_t$、正の初期・終端密度を持つ[等温円周拡散](#def-itd14-isothermal-diffusion)と[逆実験](#def-itd14-reversed-path)を考える。一様初期密度の無力基準過程 $R$ に対する正実験 $P$ の密度は

$$
\frac{dP}{dR}=L\rho_0(X_0)\exp(A_f),
$$

> ただし作用 $A_f$ は

$$
\begin{aligned}
A_f={}&\frac{\beta}{2}\int_0^\tau f_t(X_t)\circ dZ_t
-\frac{\beta}{2}\int_0^\tau \partial_x(Df_t)(X_t)\,dt\\
&-\frac{\beta^2}{4}\int_0^\tau D(X_t)f_t(X_t)^2\,dt.
\end{aligned}
$$

> さらに $P,Q$ は互いに絶対連続であり、$P$-ほとんど確実に

$$
\boxed{\sigma
=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\beta Q_{\mathrm{bath}}}
$$

> が成立する。$Q_{\mathrm{bath}}$ は[Stratonovich浴熱](#def-itd14-heat-work)である。
<!-- formal-statement-end -->

### 証明の見取り図

基準過程と力を加えた過程では、拡散係数が**同じ**でドリフトだけが $\beta Df$ 異なります。まず[Girsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)でItô積分を含む確率測度の密度比を出し、Stratonovichへ直すと線積分・空間導関数・二乗項の三項になります。逆経路では線積分だけが負号を受け、残りの二項が相殺されます。

<!-- proof-start -->
### 証明

基準過程のドリフトを $b_0=D'$、正実験のドリフトを $b=b_0+\beta Df_t$、拡散係数を $g=\sqrt{2D}$ とします。[Girsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)に入れるBrown変位の係数は

$$
h_t=\frac{b-b_0}{g}(X_t)
=\frac{\beta D(X_t)f_t(X_t)}{\sqrt{2D(X_t)}}
=\beta f_t(X_t)\sqrt{D(X_t)/2}.
$$

$f$ と $D$ はコンパクトな時空間で有界なので $\int_0^\tau h_t^2dt$ も確定的定数で上から抑えられ、Novikov条件が成り立ちます。初期密度の比は $\rho_0/(1/L)=L\rho_0$ です。$R$ の下で $dB_t=(dZ_t-D'(X_t)dt)/\sqrt{2D(X_t)}$ を代入して

$$
\begin{aligned}
\log\frac{dP}{dR}
={}&\log(L\rho_0(X_0))
+\int_0^\tau h_t\,dB_t-\frac12\int_0^\tau h_t^2dt\\
={}&\log(L\rho_0(X_0))
+\frac\beta2\int_0^\tau f_t(X_t)\,dZ_t
-\frac\beta2\int_0^\tau f_t(X_t)D'(X_t)\,dt\\
&-\frac{\beta^2}{4}\int_0^\tau D(X_t)f_t(X_t)^2\,dt.
\end{aligned}
$$

二次変分 $d[Z,Z]_t=2D(X_t)\,dt$ と[Itô–Stratonovich変換公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)を用います。時刻による係数変化は二次共変動を生じず、$d[f_\cdot(X_\cdot),Z]_t=2D(X_t)\partial_xf_t(X_t)\,dt$ なので

$$
\int_0^\tau f_t(X_t)\,dZ_t
=\int_0^\tau f_t(X_t)\circ dZ_t
-\int_0^\tau D(X_t)\partial_x f_t(X_t)\,dt.
$$

従って $D f_t'+D'f_t=(Df_t)'$ を用いると、定理の $A_f$ が得られます。

次に基準過程は $\mathcal L_0=(D\partial_x)'$ の対称性により時間反転不変です。逆実験の力を $f^{\mathrm R}_s=f_{\tau-s}$ とし、その作用を反転した経路上で評価します。Stratonovich和の向きは変わり、通常の時間積分は $s=\tau-t$ でそのままなので

$$
\begin{aligned}
A_{f^{\mathrm R}}(\Theta Z)
={}&-\frac\beta2\int_0^\tau f_t(X_t)\circ dZ_t
-\frac\beta2\int_0^\tau(Df_t)'(X_t)dt\\
&-\frac{\beta^2}{4}\int_0^\tau D(X_t)f_t(X_t)^2dt.
\end{aligned}
$$

両作用の後二項は**それぞれ同じ値**なので差を取ると消え、線積分は二倍になります。正実験と逆実験の初期密度を加えると

$$
\begin{aligned}
\log\frac{dP}{dQ}
&=\log\frac{L\rho_0(X_0)}{L\rho_\tau(X_\tau)}
  +A_f(Z)-A_{f^{\mathrm R}}(\Theta Z)\\
&=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
  +\beta\int_0^\tau f_t(X_t)\circ dZ_t.
\end{aligned}
$$

初期・終端密度が厳密に正であり、Girsanovの指数密度も正なので、$P$ と $Q$ は共通の基準測度 $R$ と同値です。最後の積分は定義の $Q_{\mathrm{bath}}$ であり、主張が示されました。
<!-- proof-end -->

### なぜ単純なBrown運動を基準にできないか

通常のBrown運動は拡散係数が一定です。$D(x)$ が変化すると二次変分 $[Z,Z]_t=2\int_0^tD(X_s)ds$ が経路から観測できるため、一般に異なる拡散係数の経路法則をGirsanovの**ドリフト変更だけ**で比較できません。ここで基準を $D'$ の可逆拡散にしたのは、この障害を避けるためです。

## 5. 第二法則はどの形になるか

対数密度の境界項を平均すれば、連続分布のShannonエントロピー $H_t=-\int_0^L\rho_t\log\rho_t\,dx$ の変化になります。$\rho_t>0$ なので対数は有限です。流れを使って微分すると、散逸は非負の平方積分として現れます。

<a id="thm-itd14-fluctuation-dissipation"></a>

<!-- formal-statement-start -->
> **定理（ゆらぎ関係と散逸平方公式）**  
> [等温円周拡散](#def-itd14-isothermal-diffusion)で $D\ge d_->0$ が時刻に依存せず、初期密度が正の滑らかな周期密度であるとする。[逆実験](#def-itd14-reversed-path)に対する全エントロピー生成 $\sigma=\log(dP/dQ)$ は

$$
\mathbb E_P[e^{-\sigma}]=1,\qquad
\mathbb E_P[\sigma]
=\int_0^\tau\int_0^L\frac{J_t(x)^2}{D(x)\rho_t(x)}\,dx\,dt\ge0
$$

> を満たす。$J_t=D(\beta f_t\rho_t-\partial_x\rho_t)$ は[確率流](#thm-itd14-current-equilibrium)である。平均が零となるのは $J_t(x)=0$ が時空間で恒等的に成立するときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

指数平均は互いに同値な確率測度の密度比を積分するだけです。平均散逸の方は $H_t$ の時間微分を保存則から求め、平均浴熱 $\int f_t J_t$ と足します。最後に $J_t=D(\beta f_t\rho_t-\rho_t')$ を変形した $\beta f_t-\partial_x\log\rho_t=J_t/(D\rho_t)$ を代入します。

<!-- proof-start -->
### 証明

[経路比](#thm-itd14-path-ratio)より $e^{-\sigma}=dQ/dP$ なので、$Q$ が確率測度であることから

$$
\mathbb E_P[e^{-\sigma}]
=\int\frac{dQ}{dP}\,dP=\int dQ=1.
$$

次に $H_t=-\int\rho_t\log\rho_t\,dx$ と置きます。$\int\partial_t\rho_t\,dx=0$ を使うと

$$
\begin{aligned}
\frac{dH_t}{dt}
&=-\int_0^L(1+\log\rho_t)\partial_t\rho_t\,dx\\
&=\int_0^L(1+\log\rho_t)\partial_xJ_t\,dx\\
&=-\int_0^LJ_t\,\partial_x\log\rho_t\,dx.
\end{aligned}
$$

浴熱の平均はStratonovich積分をItôへ変換して求めます。一般の時刻依存の $f_t(x)$ に対して

$$
f_t(X_t)\circ dZ_t
=f_t(X_t)\,dZ_t+D(X_t)\partial_xf_t(X_t)\,dt.
$$

Itô積分の期待値は零で、ドリフトは $\beta Df+D'$ です。密度で平均し周期部分積分すると

$$
\begin{aligned}
\frac{d}{dt}\mathbb E[Q_{\mathrm{bath}}(0,t)]
&=\int_0^L\rho_t\{f_t(\beta Df_t+D')+D f_t'\}\,dx\\
&=\int_0^L\{\beta Df_t^2\rho_t+\rho_t(Df_t)'\}\,dx\\
&=\int_0^L\{\beta Df_t\rho_t-D\rho_t'\}f_t\,dx
=\int_0^L f_tJ_t\,dx.
\end{aligned}
$$

ここで $Q_{\mathrm{bath}}(0,t)$ は定義の浴熱を終端時刻 $t$ で止めたものです。境界密度比の平均は $H_\tau-H_0$ なので、[経路比](#thm-itd14-path-ratio)を平均すると

$$
\begin{aligned}
\mathbb E_P[\sigma]
&=H_\tau-H_0+\beta\mathbb E_P[Q_{\mathrm{bath}}]\\
&=\int_0^\tau\int_0^L
J_t\{\beta f_t-\partial_x\log\rho_t\}\,dx\,dt.
\end{aligned}
$$

$\rho_t>0$ なので[確率流](#thm-itd14-current-equilibrium)を割って

$$
\beta f_t-\partial_x\log\rho_t
=\frac{\beta Df_t\rho_t-D\rho_t'}{D\rho_t}
=\frac{J_t}{D\rho_t}.
$$

これで非負の平方積分が得られます。$D\rho_t>0$ で $J$ は連続なので、積分が零なら $J$ は全時空で零です。
<!-- proof-end -->

### 定常円周流という検算

$U=0$、$F_t=F$ 一定のとき、定常密度 $\rho_{\mathrm st}$ の流れは位置によらない定数 $j$ です。周期性から $\int_0^L\rho'_{\mathrm st}/\rho_{\mathrm st}\,dx=0$ なので

$$
\int_0^L\frac{j^2}{D\rho_{\mathrm st}}\,dx
=j\int_0^L\left(\beta F-\frac{\rho'_{\mathrm st}}{\rho_{\mathrm st}}\right)dx
=\beta F jL.
$$

従って $F\ne0$ なら $j$ の符号は $F$ と同じです。定常密度の時間変化が零であっても、一周し続ける確率流は正の散逸を生じます。

## 6. 平衡から出発した仕事の指数平均

Jarzynski等式では、実際の終端密度 $\rho_\tau$ から逆実験を始める代わりに、**最終ポテンシャルの平衡密度**から逆実験を始めます。この二つの実験は同じではありません。[ITD13での二種類の逆実験](../ITD13/index.md#thm-itd13-jarzynski)と区別の仕方は同じです。

<a id="thm-itd14-jarzynski"></a>

<!-- formal-statement-start -->
> **定理（平衡初期のJarzynski等式）**  
> 正の周期的 $D\in C^3$ と、[等温円周拡散](#def-itd14-isothermal-diffusion)の時刻依存の $U_t,F_t$ を考える。正実験の初期密度を $\rho_0=\pi_0=e^{-\beta U_0}/\mathcal Z_0$ とし、逆実験は最終平衡密度 $\pi_\tau=e^{-\beta U_\tau}/\mathcal Z_\tau$ から始める。$F_{\mathrm{eq}}(t)=-\beta^{-1}\log\mathcal Z_t$、$\Delta F_{\mathrm{eq}}=F_{\mathrm{eq}}(\tau)-F_{\mathrm{eq}}(0)$ と置く。この逆経路法則を反転したものを $Q_{\mathrm{eq}}$ とすれば

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}
=\beta(W-\Delta F_{\mathrm{eq}}),\qquad
\mathbb E_P[e^{-\beta W}]=e^{-\beta\Delta F_{\mathrm{eq}}}.
$$

> また実際の終端密度 $\rho_\tau$ に対する全エントロピー生成 $\sigma$ との平均関係は

$$
\beta\{\mathbb E_P[W]-\Delta F_{\mathrm{eq}}\}
=\mathbb E_P[\sigma]+D(\rho_\tau\|\pi_\tau),
$$

> ここで $D(\rho\|\pi)=\int_0^L\rho\log(\rho/\pi)\,dx$ は自然対数の相対エントロピーである。これは二つの密度を引数とする量であり、位置 $x$ の関数である拡散係数 $D(x)$ とは区別する。
<!-- formal-statement-end -->

$F_t$ は正実験に加える外力、$F_{\mathrm{eq}}(t)$ は平衡自由エネルギーです。同じ文字 $F$ を使いますが別の物理量であり、後者は分配関数から定まります。

### 証明の見取り図

逆実験の初期密度だけを変えても、経路比の浴熱項は変わりません。平衡密度の対数比を内部エネルギー変化と平衡自由エネルギー差へ直し、第一法則を使います。指数平均は確率測度の正規化から従います。

<!-- proof-start -->
### 証明

正実験の初期・終端に使う平衡密度は正で滑らかなので、[経路比の証明](#thm-itd14-path-ratio)を逆実験の初期密度 $\pi_\tau$ に対して再適用できます。すると

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}
=\log\frac{\pi_0(X_0)}{\pi_\tau(X_\tau)}+\beta Q_{\mathrm{bath}}.
$$

この節で導入した $\mathcal Z_t$ と $F_{\mathrm{eq}}(t)$ の式を代入すると $\log\pi_t(x)=-\beta U_t(x)+\beta F_{\mathrm{eq}}(t)$ です。ゆえに境界項は

$$
\begin{aligned}
\log\frac{\pi_0(X_0)}{\pi_\tau(X_\tau)}
&=-\beta U_0(X_0)+\beta F_{\mathrm{eq}}(0)
 +\beta U_\tau(X_\tau)-\beta F_{\mathrm{eq}}(\tau)\\
&=\beta(\Delta U-\Delta F_{\mathrm{eq}}).
\end{aligned}
$$

[位置依存拡散の軌道第一法則](#thm-itd14-first-law)の $\Delta U+Q_{\mathrm{bath}}=W$ を代入すると、対数比は $\beta(W-\Delta F_{\mathrm{eq}})$ です。従って

$$
1=\int dQ_{\mathrm{eq}}
=\mathbb E_P\!\left[e^{-\beta(W-\Delta F_{\mathrm{eq}})}\right]
=e^{\beta\Delta F_{\mathrm{eq}}}\mathbb E_P[e^{-\beta W}],
$$

すなわち指数平均の等式が得られます。

実際の終端密度で始めた逆実験と比べると、[経路比](#thm-itd14-path-ratio)から

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}-\sigma
=\log\frac{\rho_\tau(X_\tau)}{\pi_\tau(X_\tau)}.
$$

$X_\tau$ の分布は $\rho_\tau$ なので、両辺を平均すると定理の相対エントロピーを含む式になります。相対エントロピーは非負で、これと[散逸平方公式](#thm-itd14-fluctuation-dissipation)によって平均仕事の下限も得られます。
<!-- proof-end -->

## 7. 演習（全問詳細解答）

### A1. 二つの積分規約のドリフト

- Level: A
- ID: ITD14-A1
- 問題: $D(x)=D_0(1+\varepsilon\cos kx)$（$D_0>0$、$0<\varepsilon<1$、$k=2\pi/L$）、$f=0$ に対して、等温模型のItôドリフト、Stratonovichドリフトとその差を求めよ。また $D$ が正であることを確かめよ。

<!-- solution-start -->
**詳細解答**

$-1\le\cos kx\le1$ なので $D(x)\ge D_0(1-\varepsilon)>0$ です。$D'(x)=-D_0\varepsilon k\sin kx$ であり、[定義](#def-itd14-isothermal-diffusion)のItôドリフトは

$$
b_{\mathrm I}(x)=D'(x)=-D_0\varepsilon k\sin kx.
$$

拡散振幅 $g=\sqrt{2D}$ から $gg'/2=D'/2$ を計算し、Stratonovichドリフトは

$$
b_{\mathrm S}(x)=b_{\mathrm I}(x)-\tfrac12D'(x)
=-\tfrac12D_0\varepsilon k\sin kx.
$$

差 $b_{\mathrm I}-b_{\mathrm S}=D'/2$ が実際に確認できます。
<!-- solution-end -->

### A2. Gibbs密度で流れが消える

- Level: A
- ID: ITD14-A2
- 問題: $F=0$、$U(x)=u\cos(kx)$（$u\in\mathbb R$）、正の周期関数 $D(x)$ に対し、$\pi_U(x)=e^{-\beta U(x)}/\mathcal Z_U$ の流れ $J$ が零になることを直接示せ。

<!-- solution-start -->
**詳細解答**

まず $U'(x)=-uk\sin(kx)$、$f=-U'=uk\sin(kx)$ です。$\pi_U'=(-\beta U')\pi_U=\beta uk\sin(kx)\pi_U$ となります。[確率流](#thm-itd14-current-equilibrium)に代入すると

$$
J=\beta D(uk\sin kx)\pi_U-D(\beta uk\sin kx\pi_U)=0.
$$

$\mathcal Z_U>0$ で有限なので $\pi_U$ は正の正規化密度です。$D$ が一定であることは使っていません。
<!-- solution-end -->

### A3. 第一法則を経路で確かめる

- Level: A
- ID: ITD14-A3
- 問題: $U_t(x)=a(t)\cos(kx)$、$F_t=0$ の等温拡散に対して、$W-Q_{\mathrm{bath}}=\Delta U$ を連鎖律から示せ。$a\in C^1[0,\tau]$、$D$ は正の滑らかな周期関数とする。

<!-- solution-start -->
**詳細解答**

$\partial_tU_t=a'\cos(kx)$、$\partial_xU_t=-ka\sin(kx)$ です。[Stratonovich連鎖律](../ITD7/index.md#prop-itd7-stratonovich-balance)を $U_t(X_t)$ に用い、

$$
dU_t(X_t)=a'(t)\cos(kX_t)dt-ka(t)\sin(kX_t)\circ dZ_t.
$$

積分すると右辺第1項は[仕事](#def-itd14-heat-work)、第2項は $f_t=ka(t)\sin(kX_t)$ による浴熱の負です。従って $\Delta U=W-Q_{\mathrm{bath}}$ です。$D'$ の追加の仕事は発生しません。
<!-- solution-end -->

### A4. 無外力の密度の拡散

- Level: A
- ID: ITD14-A4
- 問題: $U_t=F_t=0$、正の非一様初期密度 $\rho_0$ に対して、$J_t$、$dH_t/dt$、$\mathbb E[Q_{\mathrm{bath}}]$ を求めよ。$D$ は正で滑らかとする。

<!-- solution-start -->
**詳細解答**

$f_t=0$ だから[確率流](#thm-itd14-current-equilibrium)は $J_t=-D\rho_t'$ であり、保存則は $\partial_t\rho_t=\partial_x(D\rho_t')$ です。エントロピーの微分は[平方公式の証明](#thm-itd14-fluctuation-dissipation)の部分積分から

$$
\frac{dH_t}{dt}=-\int_0^LJ_t\frac{\rho_t'}{\rho_t}dx
=\int_0^L\frac{D(\rho_t')^2}{\rho_t}dx\ge0.
$$

$Q_{\mathrm{bath}}=\int f_t\circ dZ_t=0$ は各経路で成立します。初期が非一様なら $\rho_0'$ がどこかで非零なので、時間連続性により十分短い正時間でも $dH_t/dt>0$ です。
<!-- solution-end -->

### A5. 外力が一定の定常流

- Level: A
- ID: ITD14-A5
- 問題: $U=0$、$F_t=F\ne0$ が一定、$D(x)>0$ の滑らかな周期拡散を考える。正の定常密度 $\rho_{\mathrm st}$ の確率流 $j$ について $\int_0^Lj^2/(D\rho_{\mathrm st})dx=\beta FjL$ を導き、$Fj>0$ を示せ。

<!-- solution-start -->
**詳細解答**

定常保存則は $\partial_xJ=0$ なので $J=j$ です。[確率流](#thm-itd14-current-equilibrium)を正の $D\rho_{\mathrm st}$ で割ると

$$
\frac{j}{D\rho_{\mathrm st}}=\beta F-\frac{\rho_{\mathrm st}'}{\rho_{\mathrm st}}.
$$

両辺に $j$ を掛け $[0,L]$ で積分し、$\int_0^L(\log\rho_{\mathrm st})'dx=0$ を使うと目的の等式を得ます。もし $j=0$ なら $\rho'_{\mathrm st}/\rho_{\mathrm st}=\beta F$ となり周期条件から $0=\beta FL$、$F\ne0$ に矛盾します。従って左辺は厳密に正で $Fj>0$ です。
<!-- solution-end -->

### B1. Girsanov作用に残る導関数

- Level: B
- ID: ITD14-B1
- 問題: $D(x)=D_0(1+\varepsilon\cos kx)$、$f_t(x)=F_0$ 一定、$|\varepsilon|<1$、$F_0\ne0$ のとき、可逆基準拡散に対する作用 $A_f$ の三項を具体的に書け。逆経路での作用との差も求めよ。

<!-- solution-start -->
**詳細解答**

$\partial_x(Df)=F_0D'=-F_0D_0\varepsilon k\sin(kx)$ です。[Girsanov作用](#thm-itd14-path-ratio)へ代入すると

$$
\begin{aligned}
A_f={}&\frac{\beta F_0}{2}(Z_\tau-Z_0)
+\frac{\beta F_0D_0\varepsilon k}{2}\int_0^\tau\sin(kX_t)dt\\
&-\frac{\beta^2F_0^2D_0}{4}\int_0^\tau\{1+\varepsilon\cos(kX_t)\}dt.
\end{aligned}
$$

逆経路では $Z_\tau-Z_0$ だけ符号反転し、$\sin$・$\cos$ の通常時間積分は $t\mapsto\tau-t$ で変わりません。従って

$$
A_f(Z)-A_f(\Theta Z)=\beta F_0(Z_\tau-Z_0).
$$

作用中の導関数項を最初から落とすことは誤りですが、正逆差を取ると相殺されます。
<!-- solution-end -->

### B2. Itôドリフトを落とした別模型

- Level: B
- ID: ITD14-B2
- 問題: $U=F=0$、$D(x)=D_0(1+\varepsilon\cos kx)$（$0<\varepsilon<1$）で、誤ってItô方程式 $dZ_t=\sqrt{2D(X_t)}dB_t$ を採用したとする。その零流定常密度を正規化して求め、正しい等温模型の平衡密度と比較せよ。

<!-- solution-start -->
**詳細解答**

Itôドリフト零のFokker–Planck方程式の流れは $J=-(D\rho)'$ です。零流なら $(D\rho)'=0$ なので $D\rho=C$ です。よって

$$
\rho_{\mathrm{wrong}}(x)=\frac{C}{D_0(1+\varepsilon\cos kx)}.
$$

標準積分を自分で検算します。$y=kx$、次いで $t=\tan(y/2)$ と置き、$[0,2\pi]$ を二つに分けて実数全体へ写すと

$$
\int_0^{2\pi}\frac{dy}{1+\varepsilon\cos y}
=\int_{-\infty}^{\infty}\frac{2\,dt}{(1+\varepsilon)+(1-\varepsilon)t^2}
=\frac{2\pi}{\sqrt{1-\varepsilon^2}}.
$$

$k=2\pi/L$ なので、$\int_0^L dx/(1+\varepsilon\cos kx)=L/\sqrt{1-\varepsilon^2}$ です。正規化定数は $C=D_0\sqrt{1-\varepsilon^2}/L$、従って

$$
\rho_{\mathrm{wrong}}(x)
=\frac{\sqrt{1-\varepsilon^2}}{L\{1+\varepsilon\cos(kx)\}}.
$$

正しい等温模型では[確率流](#thm-itd14-current-equilibrium)が $J=-D\rho'$ で、零流は一様密度 $\rho_{\mathrm{eq}}=1/L$ です。ドリフトの省略は平衡分布そのものを変えます。
<!-- solution-end -->

### B3. 二つの逆実験の差

- Level: B
- ID: ITD14-B3
- 問題: $\rho_0=\pi_0$ とする。実際の終端密度 $\rho_\tau$ を使う逆実験の対数比 $\sigma$ と、最終平衡密度 $\pi_\tau$ を使う逆実験の対数比 $\sigma_{\mathrm{eq}}$ の差を経路ごとに求め、その期待値が非負であることを示せ。

<!-- solution-start -->
**詳細解答**

[経路比](#thm-itd14-path-ratio)と[平衡初期の経路比](#thm-itd14-jarzynski)における浴熱項は同じなので

$$
\begin{aligned}
\sigma_{\mathrm{eq}}-\sigma
&=\log\frac{\pi_0(X_0)}{\pi_\tau(X_\tau)}
-\log\frac{\pi_0(X_0)}{\rho_\tau(X_\tau)}\\
&=\log\frac{\rho_\tau(X_\tau)}{\pi_\tau(X_\tau)}.
\end{aligned}
$$

$X_\tau$ の確率密度が $\rho_\tau$ であることから

$$
\mathbb E_P[\sigma_{\mathrm{eq}}-\sigma]
=\int_0^L\rho_\tau\log\frac{\rho_\tau}{\pi_\tau}dx
=D(\rho_\tau\|\pi_\tau)\ge0.
$$

非負性は $\log y\le y-1$ を $y=\pi_\tau/\rho_\tau$ に適用し、$-\log y\ge1-y$ を $\rho_\tau$ で積分すれば確認できます。等号は二密度がほとんど至る所等しいときです。
<!-- solution-end -->

### C1. 動くポテンシャル・変わる摩擦・二種類の第二法則

- Level: C
- ID: ITD14-C1
- 問題: $D(x)=D_0(1+\varepsilon\cos kx)$（$D_0>0$、$0<\varepsilon<1$）、$U_t(x)=a(t)\cos(kx)$（$a\in C^1[0,\tau]$）、$F_t=0$ とし、初期分布を $\rho_0=\pi_0$ とする。実際の終端密度を $\rho_\tau$ と書く。(i) 流れ $J_t$ と経路の $W,Q_{\mathrm{bath}}$、(ii) $\sigma$ の指数平均と平均散逸、(iii) $\mathbb E[e^{-\beta W}]$ と平均仕事の非負の余分な部分を求めよ。最後に $a(t)$ が定数の場合の等号を確認せよ。

<!-- solution-start -->
**詳細解答**

力は $f_t(x)=-U_t'(x)=ka(t)\sin(kx)$ なので、[確率流](#thm-itd14-current-equilibrium)から

$$
J_t(x)=D_0(1+\varepsilon\cos kx)
\{\beta ka(t)\sin(kx)\rho_t(x)-\rho_t'(x)\}.
$$

[仕事と浴熱](#def-itd14-heat-work)は、$F=0$、$\partial_tU_t=a'\cos kx$ を代入して

$$
W=\int_0^\tau a'(t)\cos(kX_t)dt,\qquad
Q_{\mathrm{bath}}=\int_0^\tau ka(t)\sin(kX_t)\circ dZ_t.
$$

$\Delta U=a(\tau)\cos(kX_\tau)-a(0)\cos(kX_0)$ で、連鎖律の積分から $\Delta U=W-Q_{\mathrm{bath}}$ です。

正負両経路は共通の正の可逆基準過程に同値です。[経路比](#thm-itd14-path-ratio)を使い、$e^{-\sigma}=dQ/dP$ を積分して

$$
\mathbb E[e^{-\sigma}]=1,
\qquad
\mathbb E[\sigma]=\int_0^\tau\int_0^L\frac{J_t(x)^2}{D_0(1+\varepsilon\cos kx)\rho_t(x)}dxdt\ge0.
$$

ここで密度は $\partial_t\rho_t=-\partial_xJ_t$、初期条件 $\rho_0=e^{-\beta a(0)\cos kx}/\mathcal Z_0$ を満たします。一般の $a(t)$ では $\rho_t$ を初めから平衡密度と置けません。

分配関数 $\mathcal Z_t=\int_0^Le^{-\beta a(t)\cos kx}dx$、自由エネルギー差 $\Delta F_{\mathrm{eq}}=-\beta^{-1}\log(\mathcal Z_\tau/\mathcal Z_0)$ です。[平衡初期のJarzynski等式](#thm-itd14-jarzynski)により

$$
\mathbb E[e^{-\beta W}]
=\frac{\mathcal Z_\tau}{\mathcal Z_0}
=e^{-\beta\Delta F_{\mathrm{eq}}}.
$$

さらに[同定理](#thm-itd14-jarzynski)の終端補正と散逸平方公式をつなぐと

$$
\begin{aligned}
\mathbb E[W]-\Delta F_{\mathrm{eq}}
=\frac1\beta\Bigg\{
\int_0^\tau\int_0^L\frac{J_t^2}{D\rho_t}dxdt
+D(\rho_\tau\|\pi_\tau)\Bigg\}\ge0.
\end{aligned}
$$

二項のうち前者は過程中の不可逆散逸、後者は終端に残る非平衡自由エネルギーです。

最後に $a(t)=a_0$ が定数なら、初期 $\rho_0=\pi_{a_0}$ は[平衡密度の定理](#thm-itd14-current-equilibrium)により定常で $J_t=0$、$\rho_\tau=\pi_\tau$ です。また $a'=0$ より $W=0$、$\Delta F_{\mathrm{eq}}=0$、$\sigma=0$ であり、すべての等号が直接確認できます。
<!-- solution-end -->

## 8. 何が変わり、何が変わらなかったか

拡散係数が位置で変化すると、Itôドリフトには $D'$ が必要です。これにより無力の等温浴では一様密度、保存力の下ではGibbs密度が平衡になり、可逆基準過程の経路反転対称性が成立します。一方、**浴熱は依然として力のStratonovich線積分**であり、正逆の経路比は境界エントロピーと浴熱に帰着します。平均散逸も $J^2/(D\rho)$ の形を保ちます。

この導出は、温度一定・正の滑らかな $D(x)$・円周・有限時間・正密度を用いています。温度勾配がある場合、拡散係数を時刻にも変える場合、反射・吸収境界や密度の支持欠損がある場合には、基準測度や境界項を改めて検討する必要があります。
