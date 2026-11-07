# ITD15 慣性を持つLangevin系：速度反転・Kramers流・散逸

[ITD14の等温拡散](../ITD14/index.md#def-itd14-isothermal-diffusion)では位置だけを確率変数にし、仕事と浴熱を位置のStratonovich積分で測りました。しかし粒子の速さが変化する時間尺度を無視できない場合、位置 $X_t$ だけを反転しても、運動の向きが逆になりません。**速度を持つ粒子の逆再生では何を反転し、熱と散逸をどう数えるのでしょうか。**

ここでは質量 $m>0$ の粒子を長さ $L>0$ の円周で動かします。速度は実数 $V_t\in\mathbb R$ で、位置の実数への持ち上げを $Z_t$、$X_t=Z_t\pmod L$ とします。熱浴の温度 $T>0$ は一定、$\beta=(k_{\mathrm B}T)^{-1}$、摩擦係数 $\gamma>0$ は一定です。仕事は外部から系へ入る向きを正、浴熱 $Q_{\mathrm{bath}}$ は系から浴へ出る向きを正にします。したがって第一法則は $\Delta E=W-Q_{\mathrm{bath}}$ です。

## 1. 位置だけでなく速度を状態にする

位置に力を加えると、まず速度が変わり、速度を積分して位置が変わります。抵抗力 $-\gamma V$ と熱浴の微小な衝撃を同時に入れた確率運動を考えます。位置と速度を合わせた $(X,V)$ が状態であり、同じ位置でも右向きと左向きの運動は異なります。

外力 $F_t$ と周期ポテンシャル $U_t(x)$ の力をまとめて $f_t(x)=F_t-\partial_xU_t(x)$ と書きます。$F_t$ は円周を一周しても仕事をし得るので、必ずしもポテンシャルの一部にはできません。

<a id="def-itd15-inertial-langevin"></a>

<!-- formal-statement-start -->
> **定義（等温慣性付きLangevin実験）**  
> $m,\gamma,L,T,\tau>0$ とする。$U:[0,\tau]\times\mathbb R\to\mathbb R$ は時刻について $C^1$ 級、空間について $C^3$ 級で周期 $L$、混合微分 $\partial_t\partial_xU$ も連続とし、$F\in C^1[0,\tau]$ とする。$f_t(x)=F_t-\partial_xU_t(x)$ と置く。初期状態 $(X_0,V_0)$ はBrown運動 $B$ と独立で、正で二階まで連続微分可能な確率密度 $\rho_0(x,v)$ を持ち、以下の積分と部分積分を正当化できる十分な速度方向の減衰と有限エネルギーを持つとする。**等温慣性付きLangevin実験**を

$$
\begin{aligned}
dZ_t&=V_t\,dt,\qquad X_t=Z_t\pmod L,\\
m\,dV_t&=\{f_t(X_t)-\gamma V_t\}\,dt
   +\sqrt{2\gamma/\beta}\,dB_t
\end{aligned}
$$

> の解とする。内部エネルギーは $E_t(x,v)=mv^2/2+U_t(x)$ とする。位置 $x$ に関する積分は一周期 $[0,L)$、速度 $v$ に関する積分は $\mathbb R$ 上で行う。
<!-- formal-statement-end -->

$U$ の空間微分が有界かつLipschitz連続なので、速度方程式は有限時間で一意な連続解を持ち、位置はその時間積分です。位置経路は微分可能で $dZ=Vdt$ ですが、速度経路はBrown運動を含むため通常は微分できません。これが「位置の変化 $dZ$」と「速度の確率微分 $dV$」の違いです。

**直接例（力のない浴）**：$U=F=0$ の場合、速度はOrnstein–Uhlenbeck過程

$$
dV_t=-\frac\gamma m V_tdt+\frac{\sqrt{2\gamma/\beta}}m dB_t
$$

です。$a=\gamma/m$ と書きます。[Itô積の公式](../../../解析系/STO/STO7/index.md#cor-sto7-product-rule)を $e^{at}V_t$ に適用すると

$$
V_t=e^{-at}V_0+\frac{\sqrt{2\gamma/\beta}}m
\int_0^t e^{-a(t-s)}dB_s.
$$

初期速度が平均0、分散 $1/(\beta m)$ の正規分布なら、独立なBrown増分を用いて

$$
\operatorname{Var}(V_t)=\frac{e^{-2at}}{\beta m}
+\frac{2\gamma}{\beta m^2}\frac{1-e^{-2at}}{2a}
=\frac1{\beta m}.
$$

位置を円周上の定数密度 $1/L$、速度をこの正規分布で初期化すれば、時間が進んでも同じ結合分布を保ちます。速度を無視した模型と異なり、熱浴とのやりとりには運動エネルギーが現れます。

## 2. Kramers方程式と平衡の判定

速度があると確率の流れは位置方向だけではありません。位置方向には速度 $v$ で運ばれ、速度方向には力・摩擦・雑音で流れます。密度 $\rho_t(x,v)$ に対して二方向の流れを分ければ、平衡と非平衡を直接判定できます。

<a id="thm-itd15-kramers-current"></a>

<!-- formal-statement-start -->
> **定理（Kramers方程式と平衡密度）**  
> [等温慣性付きLangevin実験](#def-itd15-inertial-langevin)の時刻 $t>0$ における正で二階まで連続微分可能な確率密度を $\rho_t(x,v)$ とする。$D_v=\gamma/(\beta m^2)$ と置くと、保存則と確率流は

$$
\begin{gathered}
\partial_t\rho_t=-\partial_xJ_{x,t}-\partial_vJ_{v,t},\\
J_{x,t}=v\rho_t,\qquad
J_{v,t}=\frac{f_t(x)}m\rho_t+J_{v,t}^{\mathrm{irr}},\\
J_{v,t}^{\mathrm{irr}}=-\frac\gamma m v\rho_t-D_v\partial_v\rho_t.
\end{gathered}
$$

> $F=0$ かつ $U_t=U$ が時間に依存しないとき、次の正規化密度は定常であり、$J_v^{\mathrm{irr}}=0$ となる。

$$
\pi_U(x,v)=\frac{e^{-\beta\{mv^2/2+U(x)\}}}{\mathcal Z_U},\qquad
\mathcal Z_U=\int_0^L\int_{\mathbb R}
e^{-\beta\{mv^2/2+U(x)\}}\,dv\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

速度方程式へItô公式を適用し、試験関数の期待値を時間微分して二度部分積分します。平衡密度では $\partial_v\pi_U=-\beta mv\pi_U$ なので摩擦流と拡散流が打ち消し合います。残る位置と力の流れも、Hamilton運動の一対の項として相殺されます。

<!-- proof-start -->
### 証明

滑らかな周期試験関数 $\varphi(x,v)$ を取り、速度方向ではコンパクトな台を持つとします。Itô公式と $d[V,V]_t=2D_vdt$ により

$$
d\varphi=\left\{v\partial_x\varphi
+\frac{f_t-\gamma v}{m}\partial_v\varphi
+D_v\partial_{vv}\varphi\right\}dt
+\frac{\sqrt{2\gamma/\beta}}m\partial_v\varphi\,dB_t.
$$

最後のItô積分の期待値は零です。$\rho_t$ で平均し、位置の周期境界と速度方向の減衰を用いて部分積分すると

$$
\begin{aligned}
\frac d{dt}\int\varphi\rho_t
&=\int\varphi\left\{-\partial_x(v\rho_t)
-\partial_v\!\left(\frac{f_t-\gamma v}{m}\rho_t\right)
+D_v\partial_{vv}\rho_t\right\}.
\end{aligned}
$$

これは定理の保存則と流れを与えます。$\mathcal Z_U$ は $U$ の有界性とGaussian積分により有限かつ正です。$\partial_v\pi_U=-\beta mv\pi_U$ を非可逆流へ代入すると

$$
J_v^{\mathrm{irr}}=-\frac\gamma m v\pi_U
+\frac{\gamma}{\beta m^2}\beta mv\pi_U=0.
$$

さらに $f=-U'$、$\partial_x\pi_U=-\beta U'\pi_U$ なので、残る保存則の右辺は

$$
-\partial_x(v\pi_U)-\partial_v\!\left(\frac{-U'}m\pi_U\right)
=\beta vU'\pi_U-\beta vU'\pi_U=0.
$$

よって平衡密度は定常です。
<!-- proof-end -->

**注意**：平衡でも $J_x=v\pi_U$ は位置・速度空間の各点で零ではありません。これは運動そのものを表す可逆流です。散逸を測るのは速度方向の $J_v^{\mathrm{irr}}$ であり、「全確率流が点ごとに零」という判定を使うと誤ります。

## 3. 速度の変化が浴熱になる

力が加えた仕事 $\int f_tV_tdt$ の一部は速度を変えるために蓄えられ、残りが浴へ渡ります。位置 $Z$ は有限変動なので、$U_t(X_t)$ には通常の連鎖律が使えます。一方、速度には二次変分があるため、浴とのエネルギー交換を表す積はStratonovich積分にします。

<a id="def-itd15-work-heat"></a>

<!-- formal-statement-start -->
> **定義（仕事と浴熱）**  
> [等温慣性付きLangevin実験](#def-itd15-inertial-langevin)で、時間区間 $[0,\tau]$ の外部仕事 $W$ と浴へ放出した熱 $Q_{\mathrm{bath}}$ を

$$
\begin{aligned}
W&=\int_0^\tau\partial_tU_t(X_t)dt
+\int_0^\tau F_tV_tdt,\\
Q_{\mathrm{bath}}&=\int_0^\tau\gamma V_t^2dt
-\sqrt{2\gamma/\beta}\int_0^\tau V_t\circ dB_t
\end{aligned}
$$

> とする。$\circ dB_t$ はStratonovich積分であり、通常のItô積分とは区別する。
<!-- formal-statement-end -->

<a id="thm-itd15-first-law"></a>

<!-- formal-statement-start -->
> **定理（慣性付き軌道の第一法則）**  
> [等温慣性付きLangevin実験](#def-itd15-inertial-langevin)の各軌道で、[仕事と浴熱](#def-itd15-work-heat)は

$$
E_\tau(X_\tau,V_\tau)-E_0(X_0,V_0)=W-Q_{\mathrm{bath}}
$$

> を満たす。また浴熱は力がした仕事と運動エネルギーの差として

$$
Q_{\mathrm{bath}}=\int_0^\tau f_t(X_t)V_tdt
-\frac m2(V_\tau^2-V_0^2)
$$

> と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

速度方程式に $V_t$ をStratonovichの意味で掛けると $mV\circ dV=d(mV^2/2)$ になります。これと位置についての連鎖律を足し、保存力のする仕事を相殺します。

<!-- proof-start -->
### 証明

拡散係数が一定なので速度方程式はItô形でもStratonovich形でも同じドリフトを持ちます。それに $V_t$ をStratonovich積の意味で掛ければ

$$
\frac m2d(V_t^2)=mV_t\circ dV_t
=f_t(X_t)V_tdt-\gamma V_t^2dt
+\sqrt{2\gamma/\beta}V_t\circ dB_t.
$$

両辺を積分して[浴熱](#def-itd15-work-heat)を移項すると、まず

$$
\Delta K=\int_0^\tau f_t(X_t)V_tdt-Q_{\mathrm{bath}},
\qquad K=\frac m2V^2
$$

です。さらに $X_t=Z_t\pmod L$、$dZ_t=V_tdt$ なので

$$
\Delta U=\int_0^\tau\partial_tU_t(X_t)dt
+\int_0^\tau\partial_xU_t(X_t)V_tdt.
$$

$f_t=F_t-\partial_xU_t$ を代入して二式を足すと、$\partial_xU_tV_t$ が相殺され、$\Delta E=\int\partial_tU_tdt+\int F_tV_tdt-Q_{\mathrm{bath}}=W-Q_{\mathrm{bath}}$ です。最初の式を $Q_{\mathrm{bath}}$ について解けば第二式も得られます。
<!-- proof-end -->

**Itô形での直接検算**：$d(V_t^2/2)=V_tdV_t+D_vdt$ なので、浴熱の期待値には雑音の補正が残ります。

$$
\begin{aligned}
\mathbb E[Q_{\mathrm{bath}}]
&=\gamma\int_0^\tau\mathbb E[V_t^2]dt
-\sqrt{2\gamma/\beta}\,
\mathbb E\!\left[\int_0^\tau V_t\circ dB_t\right],\\
\mathbb E\!\left[\int_0^\tau V_t\circ dB_t\right]
&=\frac12\mathbb E[[V,B]_\tau]
=\frac12\frac{\sqrt{2\gamma/\beta}}m\tau,\\
\mathbb E[Q_{\mathrm{bath}}]
&=\int_0^\tau\gamma\left\{\mathbb E[V_t^2]-\frac1{\beta m}\right\}dt.
\end{aligned}
$$

定常な平衡速度分布では $\mathbb E[V^2]=1/(\beta m)$ なので、浴への**平均**熱流は零です。摩擦だけを数えると、平衡でも常時熱が流出するという誤答になります。

## 4. 逆実験では速度の符号も反転する

同じ位置を逆順にたどるだけでは、$dZ_t=V_tdt$ の関係が保てません。逆向きに再生した位置の時間微分は元の速度の負になるからです。このため、時間反転では位置はそのまま、速度は符号を変えます。これは[ITD13の位置経路の時間反転](../ITD13/index.md#def-itd13-reverse-experiment)から増えた条件です。

<a id="def-itd15-reversed-experiment"></a>

<!-- formal-statement-start -->
> **定義（速度反転を伴う逆実験）**  
> [等温慣性付きLangevin実験](#def-itd15-inertial-langevin)の正実験の経路を $\Gamma=(X_t,V_t)_{0\le t\le\tau}$、経路法則を $P$、終端密度を正の $\rho_\tau(x,v)$ とする。**速度反転** $\vartheta(x,v)=(x,-v)$ と**経路反転**

$$
(\Theta\Gamma)_s=(X_{\tau-s},-V_{\tau-s}),\qquad 0\le s\le\tau
$$

> を定める。逆実験 $P^{\mathrm R}$ は時刻 $s$ に $U^{\mathrm R}_s=U_{\tau-s}$、$F^{\mathrm R}_s=F_{\tau-s}$ を使い、初期密度を $\rho_\tau(x,-v)$ とした同じ摩擦・雑音係数のLangevin過程とする。正向き経路空間上の比較法則を $Q=\Theta_*P^{\mathrm R}$ とし、経路の無次元全エントロピー生成を

$$
\sigma[\Gamma]=\log\frac{dP}{dQ}(\Gamma)
$$

> とする。正逆の経路測度が同値となる正の初期密度と有限時間の範囲を考える。
<!-- formal-statement-end -->

逆実験の速度を $-V_\tau$ から始めるのは、実験を逆向きに見たときの境界状態を合わせるためです。逆向きの初期分布を $\rho_\tau(x,v)$ のまま置くと、境界エントロピー項に誤った速度符号が残ります。

<a id="thm-itd15-path-ratio"></a>

<!-- formal-statement-start -->
> **定理（慣性付き経路の確率比）**  
> [等温慣性付きLangevin実験](#def-itd15-inertial-langevin)と[速度反転を伴う逆実験](#def-itd15-reversed-experiment)において、$f$ は有界で滑らか、$\rho_0,\rho_\tau$ は正、必要な対数の期待値が有限とする。このとき $P$ と $Q$ は同値であり、$P$ のほとんどすべての経路で

$$
\boxed{\displaystyle
\sigma=\log\frac{\rho_0(X_0,V_0)}{\rho_\tau(X_\tau,V_\tau)}
+\beta Q_{\mathrm{bath}}.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

力のない自由な慣性付き過程を基準にします。その基準過程は、速度の符号を反転すれば正逆対称です。力 $f$ を加えたときの測度変更を[Girsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)で計算すると、時間反転で奇となる項は $\int fVdt$ だけです。基準のMaxwell密度から出る運動エネルギーの境界項と合わせて、浴熱が得られます。

<!-- proof-start -->
### 証明

$M(v)=\sqrt{\beta m/(2\pi)}e^{-\beta mv^2/2}$、$r(x,v)=M(v)/L$ とします。基準実験 $R$ を、初期密度 $r$、力 $f=0$ の慣性付き過程とします。速度のOrnstein–Uhlenbeck過程はMaxwell密度で可逆であり、$dZ=Vdt$ の向きも $V\mapsto -V$ により反転されるため $\Theta_*R=R$ です。この性質は積分形 $Z_t-Z_0=\int_0^tV_sds$ と、速度の定常Gaussian過程の共分散 $\mathbb E[V_sV_t]=e^{-\gamma|t-s|/m}/(\beta m)$ からも直接確認できます。初期位置の一様性により円周上の始終位置の分布も同じです。

基準過程では $m\,dV=-\gamma Vdt+\sqrt{2\gamma/\beta}\,dB$ です。ドリフト差 $f/m$ をBrown変位の係数へ直すと $h_t=f_t(X_t)\sqrt{\beta/(2\gamma)}$ となります。$f$ は有界なので $\int_0^\tau h_t^2dt$ は確定的定数で抑えられ、[Girsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)のNovikov条件が成立します。基準法則 $R$ に対する正実験の対数密度は

$$
\begin{aligned}
\log\frac{dP}{dR}
&=\log\frac{\rho_0(X_0,V_0)}{r(X_0,V_0)}+A_f(\Gamma),\\
A_f(\Gamma)
&=\int_0^\tau h_t\,dB_t-\frac12\int_0^\tau h_t^2dt\\
&=\frac{\beta m}{2\gamma}\int_0^\tau f_t(X_t)dV_t
+\frac\beta2\int_0^\tau f_t(X_t)V_tdt
-\frac\beta{4\gamma}\int_0^\tau f_t(X_t)^2dt.
\end{aligned}
$$

最後の行では基準過程の $\sqrt{2\gamma/\beta}\,dB=m\,dV+\gamma Vdt$ を代入しました。$X_t$ は有限変動なので $[f_t(X_t),V]_\tau=0$ です。したがって最初の $\int f\,dV$ はItô積分でもStratonovich積分でも一致し、部分積分

$$
\int_0^\tau f_t(X_t)dV_t
=f_\tau(X_\tau)V_\tau-f_0(X_0)V_0
-\int_0^\tau V_t\{\partial_tf_t(X_t)+\partial_xf_t(X_t)V_t\}dt
$$

を満たします。逆経路 $\Theta\Gamma$ と逆向きの力 $f^{\mathrm R}_s=f_{\tau-s}$ について同じ部分積分を用いると、$fV$ の両端が同じ符号となり、$V\{\partial_tf+\partial_x f\,V\}$ の積分も同じです。ゆえに

$$
\int_0^\tau f^{\mathrm R}_s(X_{\tau-s})d(-V_{\tau-s})
=\int_0^\tau f_t(X_t)dV_t.
$$

また $\int f^2dt$ は反転不変ですが、$\int fVdt$ は符号を変えます。したがって

$$
A_f(\Gamma)-A_{f^{\mathrm R}}(\Theta\Gamma)
=\beta\int_0^\tau f_t(X_t)V_tdt.
$$

基準法則は反転不変で、逆実験の初期密度は $\rho_\tau(x,-v)$ です。$r(x,-v)=r(x,v)$ に注意すると、密度比は

$$
\begin{aligned}
\log\frac{dP}{dQ}
&=\log\frac{\rho_0(X_0,V_0)/r(X_0,V_0)}
{\rho_\tau(X_\tau,V_\tau)/r(X_\tau,V_\tau)}
+\beta\int_0^\tau f_t(X_t)V_tdt\\
&=\log\frac{\rho_0(X_0,V_0)}{\rho_\tau(X_\tau,V_\tau)}
-\frac{\beta m}{2}(V_\tau^2-V_0^2)
+\beta\int_0^\tau f_t(X_t)V_tdt\\
&=\log\frac{\rho_0(X_0,V_0)}{\rho_\tau(X_\tau,V_\tau)}
+\beta Q_{\mathrm{bath}},
\end{aligned}
$$

最後は[第一法則に伴う浴熱表示](#thm-itd15-first-law)です。両実験の初期密度は正で基準密度と同値、Girsanovの指数密度は正なので $P,Q$ も同値です。
<!-- proof-end -->

## 5. 散逸は速度方向の不可逆流で決まる

同じ位置・速度空間の密度が時間とともに変わっても、すべてが散逸ではありません。例えば保存力による位置・速度の輸送は体積を保ちます。不可逆な部分だけを分離した[確率流](#thm-itd15-kramers-current)を使うと、平均第二法則が非負の平方積分になります。

<a id="thm-itd15-dissipation"></a>

<!-- formal-statement-start -->
> **定理（積分型ゆらぎ関係と不可逆流の平方公式）**  
> [経路の確率比](#thm-itd15-path-ratio)が定義される正で十分に微分可能な確率密度の等温慣性付きLangevin実験で、速度方向の境界項が消え、エントロピーと平均熱の積分が有限とする。$D_v=\gamma/(\beta m^2)$、$J_v^{\mathrm{irr}}=-(\gamma/m)v\rho-D_v\partial_v\rho$ と置くと

$$
\begin{aligned}
\mathbb E_P[e^{-\sigma}]&=1,\\
\mathbb E_P[\sigma]
&=\int_0^\tau\int_0^L\int_{\mathbb R}
\frac{(J_{v,t}^{\mathrm{irr}}(x,v))^2}
{D_v\rho_t(x,v)}\,dv\,dx\,dt\ge0.
\end{aligned}
$$

> 平均散逸が零となる必要十分条件は、$J_v^{\mathrm{irr}}$ が時空間で零となることである。
<!-- formal-statement-end -->

### 証明の見取り図

指数平均は同値な二つの確率測度の正規化です。平均散逸では、密度のShannonエントロピーの増分と浴熱を足します。保存力の輸送は発散零なので寄与せず、残った速度方向の流れから平方が現れます。

<!-- proof-start -->
### 証明

$e^{-\sigma}=dQ/dP$ と $Q$ の正規化により

$$
\mathbb E_P[e^{-\sigma}]=\int(dQ/dP)dP=1.
$$

密度の無次元Shannonエントロピーを $H_t=-\int\rho_t\log\rho_t\,dx\,dv$ と書きます。速度方向の境界項と位置の周期境界が消えるので、[Kramers保存則](#thm-itd15-kramers-current)から

$$
\frac{dH_t}{dt}
=-\int\{J_{x,t}\partial_x\log\rho_t
+J_{v,t}\partial_v\log\rho_t\}\,dx\,dv.
$$

ここで $J_x=v\rho$、$J_v=(f/m)\rho+J_v^{\mathrm{irr}}$ です。可逆ベクトル場 $(v,f/m)$ の発散は $\partial_xv+\partial_v(f/m)=0$ ですから

$$
\int\rho\{v\partial_x\log\rho+(f/m)\partial_v\log\rho\}
=\int\{v\partial_x\rho+(f/m)\partial_v\rho\}=0.
$$

よって $dH_t/dt=-\int J_v^{\mathrm{irr}}\partial_v\log\rho\,dx\,dv$ です。一方、[浴熱のItô補正](#def-itd15-work-heat)を直接積分すると

$$
\frac d{dt}\mathbb E[Q_{\mathrm{bath}}(0,t)]
=\gamma\int v^2\rho_t\,dx\,dv-\frac\gamma{\beta m}.
$$

$\int v\partial_v\rho\,dx\,dv=-\int\rho\,dx\,dv=-1$ なので、不可逆流を使って

$$
-m\int vJ_v^{\mathrm{irr}}\,dx\,dv
=\gamma\int v^2\rho\,dx\,dv
+\frac\gamma{\beta m}\int v\partial_v\rho\,dx\,dv
=\frac d{dt}\mathbb E[Q_{\mathrm{bath}}(0,t)].
$$

[経路比](#thm-itd15-path-ratio)の境界密度項の期待値は $H_\tau-H_0$ です。従って

$$
\begin{aligned}
\mathbb E[\sigma]
&=\int_0^\tau\int J_v^{\mathrm{irr}}
\{-\partial_v\log\rho-\beta mv\}\,dx\,dv\,dt\\
&=\int_0^\tau\int
\frac{(J_v^{\mathrm{irr}})^2}{D_v\rho}\,dx\,dv\,dt,
\end{aligned}
$$

ここでは $J_v^{\mathrm{irr}}=-D_v\rho(\partial_v\log\rho+\beta mv)$ を使いました。$D_v\rho>0$ だから非負です。滑らかさから積分が零なら流れは時空間で零となります。
<!-- proof-end -->

### 定常で流れ続ける最小例

$U=0$、$F_t=F$ が一定とし、$u=F/\gamma$ と置きます。位置一様、速度が平均 $u$、分散 $1/(\beta m)$ の密度

$$
\rho_{\mathrm{st}}(x,v)=\frac1L
\sqrt{\frac{\beta m}{2\pi}}
\exp\left\{-\frac{\beta m}{2}(v-u)^2\right\}
$$

は正規化されています。$\partial_v\log\rho_{\mathrm{st}}=-\beta m(v-u)$ より

$$
J_v^{\mathrm{irr}}=-\frac\gamma m u\rho_{\mathrm{st}}
=-\frac Fm\rho_{\mathrm{st}},\qquad
J_v=\frac Fm\rho_{\mathrm{st}}+J_v^{\mathrm{irr}}=0.
$$

$\partial_xJ_x=0$ なので定常ですが、不可逆流は零ではありません。平方公式から単位時間あたりの平均生成は

$$
\int\frac{(J_v^{\mathrm{irr}})^2}{D_v\rho_{\mathrm{st}}}
=\frac{F^2/m^2}{\gamma/(\beta m^2)}
=\frac{\beta F^2}{\gamma}=\beta\gamma u^2>0
\quad(F\ne0)
$$

となり、平均浴熱率 $\gamma\{\mathbb E[V^2]-1/(\beta m)\}=\gamma u^2$ と一致します。「定常＝平衡」ではないことを示す具体例です。

## 6. 平衡から始める仕事の指数平均

終端の実分布 $\rho_\tau$ から逆実験を始めると全エントロピー生成が得られました。これに対し最終HamiltonianのGibbs分布から逆実験を始めると、仕事に関するJarzynski等式が得られます。[ITD14の二種類の逆実験](../ITD14/index.md#thm-itd14-jarzynski)と同じ区別ですが、今度は運動エネルギーもGibbs分布に含めます。

<a id="thm-itd15-jarzynski"></a>

<!-- formal-statement-start -->
> **定理（慣性付きJarzynski等式と終端補正）**  
> [等温慣性付きLangevin実験](#def-itd15-inertial-langevin)で、正実験の初期密度を $\rho_0=\pi_0$ とし、$\pi_t(x,v)=e^{-\beta E_t(x,v)}/\mathcal Z_t$、$F_{\mathrm{eq}}(t)=-\beta^{-1}\log\mathcal Z_t$、$\Delta F_{\mathrm{eq}}=F_{\mathrm{eq}}(\tau)-F_{\mathrm{eq}}(0)$ と置く。逆実験を $\pi_\tau(x,-v)=\pi_\tau(x,v)$ から始め、その反転法則を $Q_{\mathrm{eq}}$ とする。$F_t$ は任意の有界な時間依存外力でよく、その仕事も $W$ に含める。このとき

$$
\begin{aligned}
\log\frac{dP}{dQ_{\mathrm{eq}}}&=\beta(W-\Delta F_{\mathrm{eq}}),\\
\mathbb E_P[e^{-\beta W}]&=e^{-\beta\Delta F_{\mathrm{eq}}},\\
\beta\{\mathbb E_P[W]-\Delta F_{\mathrm{eq}}\}
&=\mathbb E_P[\sigma]+D(\rho_\tau\|\pi_\tau).
\end{aligned}
$$

> $D(\rho\|\pi)=\int\rho\log(\rho/\pi)\,dx\,dv$ は自然対数の相対エントロピーである。
<!-- formal-statement-end -->

### 証明の見取り図

経路比の証明で逆実験の初期密度のみ $\pi_\tau$ に替えます。Gibbs密度の対数差は $\beta(\Delta E-\Delta F_{\mathrm{eq}})$ であり、浴熱を加えると[第一法則](#thm-itd15-first-law)によって仕事だけが残ります。

<!-- proof-start -->
### 証明

[経路比](#thm-itd15-path-ratio)の導出は逆実験の初期密度を正の $\pi_\tau(x,-v)$ に変更しても成り立ちます。よって

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}
=\log\frac{\pi_0(X_0,V_0)}{\pi_\tau(X_\tau,V_\tau)}
+\beta Q_{\mathrm{bath}}.
$$

$\log\pi_t=-\beta E_t+\beta F_{\mathrm{eq}}(t)$ なので境界項は

$$
\begin{aligned}
\log\frac{\pi_0(X_0,V_0)}{\pi_\tau(X_\tau,V_\tau)}
&=-\beta E_0+\beta F_{\mathrm{eq}}(0)
+\beta E_\tau-\beta F_{\mathrm{eq}}(\tau)\\
&=\beta(\Delta E-\Delta F_{\mathrm{eq}}).
\end{aligned}
$$

したがって $\Delta E+Q_{\mathrm{bath}}=W$ を代入して一式目を得ます。$Q_{\mathrm{eq}}$ が確率法則であるため

$$
1=\int dQ_{\mathrm{eq}}
=\mathbb E_P[e^{-\beta(W-\Delta F_{\mathrm{eq}})}]
=e^{\beta\Delta F_{\mathrm{eq}}}\mathbb E_P[e^{-\beta W}],
$$

すなわち二式目が従います。さらに[全エントロピー生成](#thm-itd15-path-ratio)との差は

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}-\sigma
=\log\frac{\rho_\tau(X_\tau,V_\tau)}{\pi_\tau(X_\tau,V_\tau)}.
$$

正実験の終端密度は $\rho_\tau$ なので、期待値を取れば $D(\rho_\tau\|\pi_\tau)$ です。これで三式目を得ます。
<!-- proof-end -->

相対エントロピーと[散逸平方公式](#thm-itd15-dissipation)はいずれも非負です。したがって平均仕事は平衡自由エネルギー差を下回りません。$F\ne0$ の場合、ここでの $\pi_t$ は外力を取り除いたHamiltonianから作った**Gibbs密度**であり、外力を加えた実過程の定常分布と取り違えないでください。

## 7. 演習（全問詳細解答）

### A1. 自由な速度の平衡分散

- Level: A
- ID: ITD15-A1
- 問題: $U=F=0$、$a=\gamma/m$ とする。$V_0=v_0$ が確定的な場合、$\mathbb E[V_t]$ と $\operatorname{Var}(V_t)$ を求めよ。極限 $t\to\infty$ を確認せよ。

<!-- solution-start -->
**詳細解答**

[自由な速度の積分表示](#def-itd15-inertial-langevin)から $V_t=e^{-at}v_0+(\sqrt{2\gamma/\beta}/m)\int_0^t e^{-a(t-s)}dB_s$ です。Itô積分の平均は零で

$$
\mathbb E[V_t]=e^{-at}v_0.
$$

Itô等長性を適用すると

$$
\begin{aligned}
\operatorname{Var}(V_t)
&=\frac{2\gamma}{\beta m^2}\int_0^t e^{-2a(t-s)}ds\\
&=\frac{2\gamma}{\beta m^2}\frac{1-e^{-2at}}{2a}
=\frac{1-e^{-2at}}{\beta m}.
\end{aligned}
$$

$a>0$ より $t\to\infty$ で平均は零、分散は $1/(\beta m)$ へ収束します。
<!-- solution-end -->

### A2. 速度を反転する理由

- Level: A
- ID: ITD15-A2
- 問題: $Z_t=Z_0+\int_0^tV_sds$ に対し、逆向き位置 $Z_s^\dagger=Z_{\tau-s}$ の時間微分を求めよ。$V_s^\dagger=V_{\tau-s}$ と置く案が運動学的に誤りであることを示せ。

<!-- solution-start -->
**詳細解答**

速度経路は連続なので $Z_t$ は微分可能で $\dot Z_t=V_t$ です。合成関数の連鎖律で

$$
\frac d{ds}Z_{\tau-s}=\dot Z_{\tau-s}(-1)=-V_{\tau-s}.
$$

したがって逆向き過程にも $dZ_s^\dagger=V_s^\dagger ds$ を課すには $V_s^\dagger=-V_{\tau-s}$ が必要です。速度をそのままにすると $V_{\tau-s}=-V_{\tau-s}$ を要求し、零速度以外の経路で破綻します。
<!-- solution-end -->

### A3. Gibbs密度のKramers流

- Level: A
- ID: ITD15-A3
- 問題: $F=0$、$U(x)=u_0\cos(2\pi x/L)$ とする。$\pi_U\propto e^{-\beta(mv^2/2+U)}$ に対して $J_v^{\mathrm{irr}}=0$ と $\partial_xJ_x+\partial_vJ_v=0$ を直接示せ。

<!-- solution-start -->
**詳細解答**

$k=2\pi/L$ と置くと $U'=-u_0k\sin(kx)$、$f=-U'=u_0k\sin(kx)$ です。$\partial_v\pi_U=-\beta mv\pi_U$ を[Kramers流](#thm-itd15-kramers-current)に代入して

$$
J_v^{\mathrm{irr}}=-\frac\gamma m v\pi_U
-\frac\gamma{\beta m^2}(-\beta mv\pi_U)=0.
$$

また $\partial_x\pi_U=-\beta U'\pi_U$ だから

$$
\partial_xJ_x=v(-\beta U'\pi_U),\qquad
\partial_vJ_v=\frac{-U'}m(-\beta mv\pi_U)=\beta vU'\pi_U.
$$

和は零です。位置の流れ $v\pi_U$ 自体は残っても、全密度は変化しません。
<!-- solution-end -->

### A4. 平衡の浴熱補正

- Level: A
- ID: ITD15-A4
- 問題: $V$ が平均零、分散 $1/(\beta m)$ の定常Maxwell分布を持つとき、単位時間あたりの摩擦項 $\gamma\mathbb E[V^2]$ と雑音によるStratonovich補正を別々に計算し、平均浴熱率を求めよ。

<!-- solution-start -->
**詳細解答**

Maxwell分布から $\gamma\mathbb E[V^2]=\gamma/(\beta m)$ です。速度のBrown係数は $\sqrt{2\gamma/\beta}/m$ なので

$$
V_t\circ dB_t=V_t\,dB_t
+\frac12\frac{\sqrt{2\gamma/\beta}}m dt.
$$

Itô積分は平均零、浴熱の雑音項の平均率は

$$
-\sqrt{2\gamma/\beta}\frac12\frac{\sqrt{2\gamma/\beta}}m
=-\frac\gamma{\beta m}.
$$

よって $\gamma/(\beta m)-\gamma/(\beta m)=0$ です。
<!-- solution-end -->

### A5. 定常な外力と速度のずれ

- Level: A
- ID: ITD15-A5
- 問題: $U=0$、$F_t=F$ 一定、$u=F/\gamma$ とする。$\rho_{\mathrm{st}}(x,v)=L^{-1}M(v-u)$ の正規化、平均速度、$J_v$ と $J_v^{\mathrm{irr}}$ を求めよ。ここで $M(w)=\sqrt{\beta m/(2\pi)}e^{-\beta mw^2/2}$ とする。

<!-- solution-start -->
**詳細解答**

$\int_0^Ldx/L=1$、正規分布の積分 $\int_\mathbb R M(v-u)dv=1$ なので正規化されています。変数 $w=v-u$ の奇関数積分が零だから $\mathbb E[V]=u$ です。対数微分 $\partial_v\log\rho=-\beta m(v-u)$ を使い

$$
\begin{aligned}
J_v^{\mathrm{irr}}&=-\frac\gamma m v\rho
-\frac\gamma{\beta m^2}(-\beta m(v-u)\rho)
=-\frac\gamma m u\rho=-\frac Fm\rho,\\
J_v&=\frac Fm\rho+J_v^{\mathrm{irr}}=0.
\end{aligned}
$$

$J_x=v\rho$ は位置に依存しないので、保存則の発散は零です。
<!-- solution-end -->

### B1. 定常外力の経路エントロピー生成

- Level: B
- ID: ITD15-B1
- 問題: A5の正の定常密度から出発する。$\sigma$ を $Z_\tau-Z_0$ と $V_\tau-V_0$ で表し、$\mathbb E[\sigma]$ を計算せよ。平均発熱との一致も確認せよ。

<!-- solution-start -->
**詳細解答**

定常なので $\rho_\tau=\rho_0=\rho_{\mathrm{st}}$ です。$u=F/\gamma$ とし、Gaussian対数比を展開すると

$$
\begin{aligned}
\log\frac{\rho_{\mathrm{st}}(V_0)}{\rho_{\mathrm{st}}(V_\tau)}
&=\frac{\beta m}{2}\{(V_\tau-u)^2-(V_0-u)^2\}\\
&=\beta\Delta K-\beta mu(V_\tau-V_0).
\end{aligned}
$$

[第一法則に伴う浴熱表示](#thm-itd15-first-law)は $Q_{\mathrm{bath}}=F(Z_\tau-Z_0)-\Delta K$ です。よって[経路比](#thm-itd15-path-ratio)は

$$
\sigma=\beta F(Z_\tau-Z_0)-\beta mu(V_\tau-V_0).
$$

定常では $\mathbb E[V_t]=u$、$\mathbb E[V_\tau-V_0]=0$、$\mathbb E[Z_\tau-Z_0]=\int_0^\tau udt=u\tau$ なので

$$
\mathbb E[\sigma]=\beta Fu\tau=\frac{\beta F^2}{\gamma}\tau.
$$

また $\mathbb E[Q_{\mathrm{bath}}]=F\mathbb E[\Delta Z]-\mathbb E[\Delta K]=Fu\tau$ で、境界エントロピーの平均が零なので $\mathbb E[\sigma]=\beta\mathbb E[Q_{\mathrm{bath}}]$ と一致します。
<!-- solution-end -->

### B2. 可逆流はエントロピーを増やさない

- Level: B
- ID: ITD15-B2
- 問題: $U_t(x)$ と $F_t$ が滑らかな周期ポテンシャル・時間依存外力のとき、任意の十分減衰する正密度 $\rho(x,v)$ に対して

$$
\int\rho\left\{v\partial_x\log\rho+\frac{f_t(x)}m\partial_v\log\rho\right\}\,dx\,dv=0
$$

を証明せよ。$f$ が速度に依存した場合に同じ議論を無条件で使えない理由も述べよ。

<!-- solution-start -->
**詳細解答**

正密度なので $\rho\partial_i\log\rho=\partial_i\rho$ です。従って左辺は

$$
\int v\partial_x\rho\,dx\,dv
+\frac1m\int f_t(x)\partial_v\rho\,dx\,dv.
$$

$v$ は $x$ に依存しないので前者は位置一周期の端点差 $v\{\rho(L,v)-\rho(0,v)\}=0$ です。$f_t(x)$ は $v$ に依存しないので後者は $f_t(x)\{\rho(x,+\infty)-\rho(x,-\infty)\}/m=0$ です。もし $f=f(x,v)$ なら部分積分で $-(1/m)\int\rho\partial_v f$ が残り、消えるとは限りません。
<!-- solution-end -->

### B3. Girsanov作用の反転偶奇

- Level: B
- ID: ITD15-B3
- 問題: 時間依存の有界な力 $f_t(x)$ と経路反転 $\Theta(X,V)=(X_{\tau-\cdot},-V_{\tau-\cdot})$ に対し、作用

$$
A_f=\frac{\beta m}{2\gamma}\int_0^\tau f_t(X_t)dV_t
+\frac\beta2\int_0^\tau f_t(X_t)V_tdt
-\frac\beta{4\gamma}\int_0^\tau f_t(X_t)^2dt
$$

のうち、どの項が反転で奇となるかを積分の定義から示せ。

<!-- solution-start -->
**詳細解答**

$f^{\mathrm R}_s=f_{\tau-s}$ とする。時間積分の変数を $t=\tau-s$ と置き換えると

$$
\int_0^\tau f_s^{\mathrm R}(X_{\tau-s})^2ds
=\int_0^\tau f_t(X_t)^2dt
$$

です。速度は反転で負になるから

$$
\int_0^\tau f_s^{\mathrm R}(X_{\tau-s})(-V_{\tau-s})ds
=-\int_0^\tau f_t(X_t)V_tdt.
$$

$\int f\,dV$ は $f_t(X_t)$ が有限変動なので部分積分できます。[経路比の証明](#thm-itd15-path-ratio)の式で端点と $df_t(X_t)=(\partial_tf+\partial_xf\,V)dt$ を明示しておくと、反転後も二つの端点項、積分項とも不変です。従って作用差は二番目の項の二倍

$$
A_f(\Gamma)-A_{f^{\mathrm R}}(\Theta\Gamma)
=\beta\int_0^\tau f_t(X_t)V_tdt
$$

になります。
<!-- solution-end -->

### B4. 終端分布を変えた逆実験

- Level: B
- ID: ITD15-B4
- 問題: 初期 $\rho_0=\pi_0$ のもとで、実際の終端 $\rho_\tau$ から始める逆実験の $\sigma$ と、終端のGibbs密度 $\pi_\tau$ から始める逆実験の $\sigma_{\mathrm{eq}}$ の差の平均を求めよ。等号成立条件も確かめよ。

<!-- solution-start -->
**詳細解答**

[経路比](#thm-itd15-path-ratio)と[Jarzynski型経路比](#thm-itd15-jarzynski)は浴熱が同じで、逆実験の初期密度だけが異なります。引き算すると

$$
\sigma_{\mathrm{eq}}-\sigma
=\log\frac{\pi_0(X_0,V_0)}{\pi_\tau(X_\tau,V_\tau)}
-\log\frac{\pi_0(X_0,V_0)}{\rho_\tau(X_\tau,V_\tau)}
=\log\frac{\rho_\tau(X_\tau,V_\tau)}{\pi_\tau(X_\tau,V_\tau)}.
$$

従って $\mathbb E[\sigma_{\mathrm{eq}}-\sigma]=\int\rho_\tau\log(\rho_\tau/\pi_\tau)=D(\rho_\tau\|\pi_\tau)\ge0$ です。非負性は $-\log y\ge1-y$ を $y=\pi_\tau/\rho_\tau$ として $\rho_\tau$ で積分すれば確認できます。等号は両密度がほとんど至る所一致するときです。
<!-- solution-end -->

### C1. 速度を含む円周駆動の全収支

- Level: C
- ID: ITD15-C1
- 問題: $U_t(x)=a(t)\cos(kx)$（$k=2\pi/L$、$a\in C^1[0,\tau]$）、$F_t=b(t)$（$b\in C^1[0,\tau]$）の等温慣性付き実験を $\rho_0=\pi_0$ から始める。(i) $f,W,Q_{\mathrm{bath}}$ と第一法則、(ii) Kramersの二つの流れと平均散逸、(iii) 平衡自由エネルギー差を使った仕事指数平均と終端補正を求めよ。最後に $a(t)=a_0$、$b(t)=0$ の場合の等号を検査せよ。

<!-- solution-start -->
**詳細解答**

$\partial_xU_t=-ka(t)\sin(kx)$ なので $f_t(x)=b(t)+ka(t)\sin(kx)$ です。定義をそのまま代入して

$$
\begin{aligned}
W&=\int_0^\tau a'(t)\cos(kX_t)dt
+\int_0^\tau b(t)V_tdt,\\
Q_{\mathrm{bath}}&=\int_0^\tau\gamma V_t^2dt
-\sqrt{2\gamma/\beta}\int_0^\tau V_t\circ dB_t.
\end{aligned}
$$

$dU_t(X_t)=a'(t)\cos(kX_t)dt-ka(t)\sin(kX_t)V_tdt$ と $dK_t=f_t(X_t)V_tdt-dQ_{\mathrm{bath}}$ を足すと、$ka\sin(kX)V$ が消えて $\Delta E=W-Q_{\mathrm{bath}}$ です。

[Kramers流](#thm-itd15-kramers-current)は

$$
\begin{aligned}
J_{x,t}&=v\rho_t,\\
J_{v,t}&=\frac{b(t)+ka(t)\sin(kx)}m\rho_t
-\frac\gamma m v\rho_t-\frac\gamma{\beta m^2}\partial_v\rho_t,\\
J_{v,t}^{\mathrm{irr}}&=-\frac\gamma m v\rho_t
-\frac\gamma{\beta m^2}\partial_v\rho_t.
\end{aligned}
$$

ここで $\rho_t$ はこのKramers方程式と初期 $\pi_0$ から定める**実際の**密度であり、時刻ごとに $\pi_t$ と置いてはいけません。[散逸平方公式](#thm-itd15-dissipation)は

$$
\mathbb E[\sigma]
=\int_0^\tau\int_0^L\int_{\mathbb R}
\frac{(J_{v,t}^{\mathrm{irr}})^2}{(\gamma/(\beta m^2))\rho_t}
\,dv\,dx\,dt\ge0,
\qquad\mathbb E[e^{-\sigma}]=1
$$

を与えます。参照分配関数は速度と位置に分離され

$$
\mathcal Z_t
=\sqrt{\frac{2\pi}{\beta m}}\int_0^L
e^{-\beta a(t)\cos(kx)}dx,
\qquad
\Delta F_{\mathrm{eq}}=-\beta^{-1}\log\frac{\mathcal Z_\tau}{\mathcal Z_0}.
$$

ゆえに[慣性付きJarzynski等式](#thm-itd15-jarzynski)から、外力 $b(t)$ の仕事も含めて

$$
\mathbb E[e^{-\beta W}]=\frac{\mathcal Z_\tau}{\mathcal Z_0},
\qquad
\mathbb E[W]-\Delta F_{\mathrm{eq}}
=\frac1\beta\{\mathbb E[\sigma]+D(\rho_\tau\|\pi_\tau)\}\ge0.
$$

$a(t)=a_0$、$b(t)=0$ なら $\rho_t=\pi_{a_0}$ は[Kramers平衡](#thm-itd15-kramers-current)で定常、$J_v^{\mathrm{irr}}=0$ です。$W=0$、$\Delta F_{\mathrm{eq}}=0$、$D(\rho_\tau\|\pi_\tau)=0$ で、第一法則と双方の等号が成立します。
<!-- solution-end -->

## 8. 位置だけの模型と比べて

位置だけの等温拡散では、時間反転で位置経路の向きを入れ替えるだけでした。慣性があると速度は時間反転で符号を変え、運動エネルギーの境界項が経路比に現れます。とはいえ**「境界エントロピー＋浴へ出た熱」**という構造は保たれ、平均生成は速度方向の不可逆確率流の平方になります。

ここでは摩擦と温度が一定で、力が速度に依存せず、円周・有限時間・正密度を仮定しました。磁場のような速度依存力、位置依存摩擦、複数の浴、境界での反射や衝突を含める場合は、逆実験の符号と流れの分解を改めて導かなければなりません。
