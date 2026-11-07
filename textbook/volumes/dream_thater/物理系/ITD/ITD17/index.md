# ITD17 位置依存摩擦の小質量極限：雑音誘起ドリフトはどこから来るか

<!-- definition-example-audit: strict -->

[ITD16の位置の小質量極限](../ITD16/index.md#thm-itd16-position-limit)では摩擦係数を一定にしました。一方、[ITD14の等温位置拡散](../ITD14/index.md#def-itd14-isothermal-diffusion)には、位置によって移動度が変わるときの「雑音誘起ドリフト」が登場しました。**速度を含む力学から出発しても、この補正は同じ符号・係数で現れるのでしょうか。**

ここでは熱浴の温度を一定に保ち、摩擦係数だけを位置の関数にします。質量を零へ近づける前に、速い速度を消去しやすい「摩擦座標」を作ります。[MECH4の運動量](../../../物理系/MECH/MECH4/index.md#def-mech4-linear-momentum)を使った二乗平均評価、同じBrown運動に結び付けた位置の収束、最後に円周上の平衡分布という三段階で答えを確かめます。経路ごとの浴熱や温度勾配の極限については、位置の収束だけから結論しません。

記号は $\beta=(k_{\mathrm B}T)^{-1}>0$ とし、$T$ は熱浴の絶対温度、$k_{\mathrm B}$ はBoltzmann定数です。位置は実数の持ち上げ $Z_t$、速度は $V_t$、質量は $m>0$ とします。円周の例では最後に $Z_t$ を周期 $L$ で同一視します。

## 1. 摩擦が場所で変わる慣性付き粒子

摩擦 $\gamma(x)$ が大きい場所では、同じ速度に働く抵抗力の大きさが増します。ただし温度一定の浴では、[ITD15の等温慣性付きLangevin模型](../ITD15/index.md#def-itd15-inertial-langevin)と同様に、雑音の強さも摩擦の平方根に比例させます。抵抗だけを変えて雑音を固定すると、別の熱浴模型になってしまいます。

外力 $F(x)$ は位置だけに依存する力とし、以下の有限時間の議論では有界かつ大域的にLipschitz連続とします。摩擦は正の下限 $\gamma_->0$ と有限の上限 $\gamma_+$ を持ち、二階まで微分可能で、その一階・二階導関数も有界とします。この条件は、後で使う逆関数と確率微分方程式の係数を一様に制御するためです。

<a id="def-itd17-inertial-variable-friction"></a>

<!-- formal-statement-start -->
> **定義（等温・位置依存摩擦の慣性付き実験）**
> $\beta>0$、$m>0$、観測時間 $\tau>0$、初期位置 $z_0\in\mathbb R$ を固定する。$F:\mathbb R\to\mathbb R$ は有界かつ大域的にLipschitz連続、$\gamma:\mathbb R\to(0,\infty)$ は $C^2$ 級で、$\gamma,\gamma',\gamma''$ が有界、かつ $0<\gamma_-\le\gamma(x)\le\gamma_+$ を満たすとする。Brown運動 $B$ と独立な初期速度 $V_0^m$ は平均零、分散 $1/(\beta m)$ の正規分布とする。位置と速度を次のItô方程式で定める。

$$
\begin{aligned}
dZ_t^m&=V_t^m\,dt,\qquad Z_0^m=z_0,\\
m\,dV_t^m
&=\{F(Z_t^m)-\gamma(Z_t^m)V_t^m\}\,dt
  +\sqrt{2\gamma(Z_t^m)/\beta}\,dB_t.
\end{aligned}
$$

> $P_t^m=mV_t^m$ を運動量とする。異なる $m$ の実験は同じ $B$ を使って結合し、$V_0^m$ の選び方には上記の分布・独立性以外の制約を課さない。
<!-- formal-statement-end -->

初期のMaxwell速度は $m$ を小さくすると典型的大きさが $m^{-1/2}$ になります。それでも運動量 $P^m=mV^m$ は二乗平均で $\sqrt m$ 程度です。ここが速い速度を扱う鍵です。係数が局所Lipschitzで、速度のドリフトは線形以下の増大なので、この方程式は有限時間で爆発しない一意な強解を持ちます。

<!-- definition-example-start: def-itd17-inertial-variable-friction -->
**定義の確認**

**直接例：摩擦が周期的に増減する場合**

$\gamma_0>0$、$0<\varepsilon<1$ とし、$\gamma(x)=\gamma_0(1+\varepsilon\cos x)$、$F(x)=0$ とします。$\gamma$ は $2\pi$ 周期の $C^\infty$ 級で、

$$
\gamma_0(1-\varepsilon)\le\gamma(x)\le\gamma_0(1+\varepsilon),
\qquad
|\gamma'(x)|\le\gamma_0\varepsilon,\quad
|\gamma''(x)|\le\gamma_0\varepsilon
$$

が成立します。したがって正の下限、上限、導関数の有界性、外力のLipschitz性を一つずつ確かめられます。$V_0^m\sim N(0,1/(\beta m))$ をBrown運動と独立に選べば初期条件も満たします。摩擦が大きい位置では減衰だけでなく雑音分散率 $2\gamma(x)/\beta$ も大きくなります。
<!-- definition-example-end -->

## 2. 運動量が小さくなることを先に証明する

速度そのものを二乗平均で零へ近づけようとしても、初期分散 $1/(\beta m)$ が発散するため失敗します。代わりに運動量 $P^m$ の方程式へ[Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を適用し、$m$ に比例する評価を作ります。

<a id="thm-itd17-momentum-bound"></a>

<!-- formal-statement-start -->
> **定理（小質量の運動量二乗評価）**
> [等温・位置依存摩擦の慣性付き実験](#def-itd17-inertial-variable-friction)で $M=\sup_x|F(x)|<\infty$ とする。任意の $t\in[0,\tau]$ について、

$$
\begin{aligned}
\mathbb E[(P_t^m)^2]
&\le e^{-\gamma_-t/m}\frac m\beta\\
&\quad+\left(1-e^{-\gamma_-t/m}\right)
\left(\frac{m^2M^2}{\gamma_-^2}
+\frac{2m\gamma_+}{\beta\gamma_-}\right).
\end{aligned}
$$

> 特に $0<m\le1$ では、$m$ に依存しない定数 $C$ が存在して

$$
\sup_{0\le t\le\tau}\mathbb E[(P_t^m)^2]\le Cm
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

運動量には大きさ $-\gamma P/m$ の減衰が働きます。外力との積 $2PF$ をYoungの不等式で吸収し、雑音の二次変分による $2\gamma/\beta$ の項と釣り合わせます。大きな速度分散があっても、運動量の分散は小さいままです。

<!-- proof-start -->
### 証明

定義の運動量へ方程式を書き直すと

$$
dP_t^m=\left\{F(Z_t^m)-\frac{\gamma(Z_t^m)}mP_t^m\right\}dt
+\sqrt{2\gamma(Z_t^m)/\beta}\,dB_t.
$$

[Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を関数 $p\mapsto p^2$ に適用します。二次変分率は $2\gamma(Z_t^m)/\beta$ なので

$$
\begin{aligned}
d(P_t^m)^2
&=\left\{2P_t^mF(Z_t^m)
-\frac{2\gamma(Z_t^m)}m(P_t^m)^2
+\frac{2\gamma(Z_t^m)}\beta\right\}dt\\
&\quad+2P_t^m\sqrt{2\gamma(Z_t^m)/\beta}\,dB_t.
\end{aligned}
$$

実数 $a,b$ に対する $2ab\le a^2+b^2$ に $a=\sqrt{\gamma_-/m}\,|P_t^m|$、$b=\sqrt{m/\gamma_-}\,M$ を入れると

$$
2P_t^mF(Z_t^m)
\le\frac{\gamma_-}m(P_t^m)^2+\frac{mM^2}{\gamma_-}.
$$

減衰では $\gamma(Z_t^m)\ge\gamma_-$、雑音の項では $\gamma(Z_t^m)\le\gamma_+$ を使います。確率積分を停止時刻で局所化し、二乗モーメント評価後に停止を外して期待値を取ると、$q(t)=\mathbb E[(P_t^m)^2]$ は

$$
q'(t)\le-\frac{\gamma_-}{m}q(t)
+\frac{mM^2}{\gamma_-}+\frac{2\gamma_+}\beta
$$

を満たします。積分因子 $e^{\gamma_-t/m}$ を掛けて積分すると

$$
q(t)\le e^{-\gamma_-t/m}q(0)
+\frac{m}{\gamma_-}\left(\frac{mM^2}{\gamma_-}+\frac{2\gamma_+}{\beta}\right)
(1-e^{-\gamma_-t/m}).
$$

初期Maxwell分布から $q(0)=m^2/(\beta m)=m/\beta$ です。$0<m\le1$ と $0\le e^{-\gamma_-t/m}\le1$ を用いれば、右辺は一様に $Cm$ 以下です。
<!-- proof-end -->

この評価は $\mathbb E[(V_t^m)^2]$ が消えることを言っていません。$m^2\mathbb E[(V_t^m)^2]=O(m)$ と $m\mathbb E[(V_t^m)^2]=O(1)$ は両立します。[ITD16の運動エネルギー境界項](../ITD16/index.md#thm-itd16-kinetic-boundary)が消えない理由もここにあります。

## 3. 摩擦座標で小質量極限を取る

位置の方程式を形式的に $m=0$ と置くと、$V$ が大きいためどの確率積分規約を採用するか不明です。そこで、位置を摩擦で重み付けした座標へ移します。$\gamma>0$ なので、摩擦の原始関数は単調増加し、逆関数を持ちます。

<a id="def-itd17-friction-coordinate"></a>

<!-- formal-statement-start -->
> **定義（摩擦座標と過減衰比較過程）**
> [等温・位置依存摩擦の慣性付き実験](#def-itd17-inertial-variable-friction)の $\gamma,F,\beta,z_0$ を使い、

$$
G(x)=\int_0^x\gamma(r)\,dr,\qquad H=G^{-1}
$$

> を摩擦座標とその逆写像とする。同じBrown運動 $B$ に対して

$$
\begin{aligned}
dY_t&=F(H(Y_t))\,dt+
\sqrt{2\gamma(H(Y_t))/\beta}\,dB_t,\\
Y_0&=G(z_0),\qquad Z_t=H(Y_t)
\end{aligned}
$$

> を満たす過程 $Z$ を、位置だけの過減衰比較過程とする。上の $Y$ 方程式はItôの意味で解釈する。
<!-- formal-statement-end -->

ここでは $G'(x)=\gamma(x)$ なので、どの位置でも傾きは正です。また、$x>y$ に対して

$$
\gamma_-(x-y)\le G(x)-G(y)\le\gamma_+(x-y)
$$

です。したがって $G$ は $\mathbb R$ から $\mathbb R$ への全単射で、逆関数は $|H(a)-H(b)|\le|a-b|/\gamma_-$ を満たします。$F\circ H$ と $\sqrt{2\gamma\circ H/\beta}$ は有界かつ大域的Lipschitz連続だから、$Y$ の強解も一意です。

<!-- definition-example-start: def-itd17-friction-coordinate -->
**定義の確認**

**直接例：摩擦座標を実際に積分する**

前節の $\gamma(x)=\gamma_0(1+\varepsilon\cos x)$ に対して、

$$
G(x)=\gamma_0(x+\varepsilon\sin x),\qquad
G'(x)=\gamma_0(1+\varepsilon\cos x)>0.
$$

さらに $G(x+2\pi)=G(x)+2\pi\gamma_0$ で、$G(x)\to\pm\infty$ は $x\to\pm\infty$ に対応します。従って逆関数 $H$ は実数全体で定義され、単なる局所的な変数変換ではありません。$F=0$ の比較過程は $dY_t=\sqrt{2\gamma(H(Y_t))/\beta}\,dB_t$ と具体的に書け、初期値も $Y_0=\gamma_0(z_0+\varepsilon\sin z_0)$ と確定します。
<!-- definition-example-end -->

<a id="thm-itd17-variable-friction-limit"></a>

<!-- formal-statement-start -->
> **定理（位置依存摩擦のSmoluchowski–Kramers極限）**
> [等温・位置依存摩擦の慣性付き実験](#def-itd17-inertial-variable-friction)と[過減衰比較過程](#def-itd17-friction-coordinate)を同じBrown運動で構成する。任意の観測時間 $\tau>0$ に対し、$m$ に依存しない定数 $C_\tau$ が存在して、$0<m\le1$ と $t\in[0,\tau]$ について

$$
\mathbb E[|Z_t^m-Z_t|^2]\le C_\tau m.
$$

> したがって各固定時刻 $t$ で、二乗平均誤差 $\mathbb E|Z_t^m-Z_t|^2$ は零に近づく。極限 $Z$ は一意なItô方程式

$$
dZ_t=\left\{\frac{F(Z_t)}{\gamma(Z_t)}
-\frac{\gamma'(Z_t)}{\beta\gamma(Z_t)^2}\right\}dt
+\sqrt{\frac{2}{\beta\gamma(Z_t)}}\,dB_t
$$

> を満たし、$Z_0=z_0$ である。結論は固定時刻での収束評価であり、経路全体の一様収束や浴熱の収束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

摩擦座標では $dG(Z^m)=\gamma(Z^m)dZ^m$ となります。運動量の方程式を積分して代入すると、極限の $Y$ 方程式との差は運動量の端点差だけになります。その端点差は[運動量二乗評価](#thm-itd17-momentum-bound)で小さくします。確率積分の誤差は[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)で評価します。最後に[積分形Gronwall補題](../../../解析系/STO/STO9/index.md#lem-sto9-gronwall)で積分不等式を閉じ、逆関数 $H$ へ[STO7のItô公式](../../../解析系/STO/STO7/index.md#thm-sto7-multidimensional-ito)を適用すると、求める補正ドリフトが現れます。

<!-- proof-start -->
### 証明

$Z^m$ は時間積分 $dZ_t^m=V_t^m dt$ で定まる有限変動過程です。従って通常の連鎖律で

$$
dG(Z_t^m)=G'(Z_t^m)dZ_t^m
=\gamma(Z_t^m)V_t^m\,dt.
$$

運動量の式から $\gamma(Z_t^m)V_t^m dt=F(Z_t^m)dt+\sqrt{2\gamma(Z_t^m)/\beta}\,dB_t-dP_t^m$ です。時刻 $0$ から $t$ まで積分し、$G(Z_0^m)=G(z_0)$ を使うと、

$$
\begin{aligned}
G(Z_t^m)=G(z_0)
&+\int_0^tF(Z_s^m)\,ds\\
&+\int_0^t\sqrt{2\gamma(Z_s^m)/\beta}\,dB_s
-(P_t^m-P_0^m).
\end{aligned}
$$

$Y_t^m=G(Z_t^m)$、$f(y)=F(H(y))$、$s(y)=\sqrt{2\gamma(H(y))/\beta}$ と置きます。前の段階で $f,s$ はLipschitz連続と確かめました。そのLipschitz定数をそれぞれ $L_f,L_s$ とし、$e_t=Y_t^m-Y_t$ とすると、

$$
e_t=\int_0^t\{f(Y_s^m)-f(Y_s)\}\,ds
+\int_0^t\{s(Y_s^m)-s(Y_s)\}\,dB_s
-(P_t^m-P_0^m).
$$

三項の和の二乗を3倍した二乗和で抑え、時間積分にはCauchy–Schwarz、確率積分には[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)を使います。$t\le\tau$ に対して

$$
\begin{aligned}
\mathbb E|e_t|^2
&\le3tL_f^2\int_0^t\mathbb E|e_s|^2\,ds
+3L_s^2\int_0^t\mathbb E|e_s|^2\,ds\\
&\quad+3\mathbb E|P_t^m-P_0^m|^2.
\end{aligned}
$$

[運動量二乗評価](#thm-itd17-momentum-bound)と $\mathbb E|P_t^m-P_0^m|^2\le2\mathbb E(P_t^m)^2+2\mathbb E(P_0^m)^2$ より、最後の項は $C_1m$ 以下です。$A=3(\tau L_f^2+L_s^2)$ とおけば、

$$
h(t):=\mathbb E|e_t|^2
\le A\int_0^t h(s)\,ds+C_1m.
$$

[積分形Gronwall補題](../../../解析系/STO/STO9/index.md#lem-sto9-gronwall)に $a=C_1m$、$c=A$ を代入して $h(t)\le C_1m e^{A\tau}$ を得ます。逆関数のLipschitz評価から

$$
\mathbb E|Z_t^m-Z_t|^2
=\mathbb E|H(Y_t^m)-H(Y_t)|^2
\le\frac{C_1e^{A\tau}}{\gamma_-^2}m.
$$

最後に $H'=1/\gamma(H)$ を $G(H(y))=y$ の微分から得て、さらにもう一度 $y$ で微分します。$x=H(y)$ と書くと

$$
H''(y)=-\frac{\gamma'(x)}{\gamma(x)^3}.
$$

$Y$ の二次変分率は $s(Y)^2=2\gamma(x)/\beta$ です。[Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $H(Y)$ に使えば、ドリフトは

$$
H'(Y)f(Y)+\frac12H''(Y)s(Y)^2
=\frac{F(x)}{\gamma(x)}
-\frac12\frac{\gamma'(x)}{\gamma(x)^3}
\frac{2\gamma(x)}{\beta}
=\frac{F(x)}{\gamma(x)}
-\frac{\gamma'(x)}{\beta\gamma(x)^2}
$$

となり、雑音係数は $H'(Y)s(Y)=\sqrt{2/(\beta\gamma(x))}$ です。このSDEの係数も大域的Lipschitz連続なので強解は一意です。
<!-- proof-end -->

$\mu(x)=1/\gamma(x)$、$D(x)=1/(\beta\gamma(x))$ と置けば、得られたItôドリフトは

$$
\mu(x)F(x)+D'(x),\qquad
D'(x)=-\frac{\gamma'(x)}{\beta\gamma(x)^2}
$$

です。これは[ITD14の等温円周拡散](../ITD14/index.md#def-itd14-isothermal-diffusion)と同じです。$D'$ は「力をもう一つ追加した」ものではなく、速度を消去して位置に対するItô方程式を作ると必然的に現れる補正です。

### 定数摩擦では前章に戻る

$\gamma(x)\equiv\gamma_0$ とすれば $G(x)=\gamma_0x$、$\gamma'=0$ です。外力も一定 $F(x)\equiv F_0$ なら

$$
dZ_t=\frac{F_0}{\gamma_0}\,dt
+\sqrt{\frac{2}{\beta\gamma_0}}\,dB_t,
$$

となり、[ITD16の過減衰比較実験](../ITD16/index.md#def-itd16-overdamped)と一致します。

## 4. なぜ平衡密度まで一致するのか

小質量の極限で補正項の符号を確かめるもう一つの方法は、質量が正の段階から平衡分布を追うことです。円周の長さを $L>0$ とし、$\gamma,U$ は滑らかな $L$ 周期関数、$F=-U'$ とします。以下では座標を周期 $L$ で同一視し、確率密度の積分範囲を $[0,L)$ とします。

<a id="thm-itd17-equilibrium-consistency"></a>

<!-- formal-statement-start -->
> **定理（慣性付き平衡と過減衰平衡の整合）**
> [等温・位置依存摩擦の慣性付き実験](#def-itd17-inertial-variable-friction)の運動方程式で、$\gamma$ と $U\in C^3(\mathbb R)$ が $L$ 周期、$F(x)=-U'(x)$ とする。位置を円周とみなし、初期分布を任意に選べる同じ方程式の定常解を考える。任意の $m>0$ で、位置・速度の正規化密度

$$
\rho_m^{\mathrm{eq}}(x,v)
=\frac{e^{-\beta U(x)}}{\int_0^Le^{-\beta U(r)}dr}
\sqrt{\frac{\beta m}{2\pi}}\,e^{-\beta mv^2/2}
$$

> は慣性付き方程式の定常密度であり、その位置周辺密度は質量・摩擦に依存せず、次のGibbs密度である。

$$
\pi_U(x)=\frac{e^{-\beta U(x)}}{\int_0^Le^{-\beta U(r)}dr}.
$$

> 小質量極限の位置拡散の確率流は、正で $C^2$ 級の確率密度 $p_t$ に対して

$$
J_t(x)=\frac{F(x)p_t(x)-\beta^{-1}\partial_xp_t(x)}
{\gamma(x)},\qquad
\partial_tp_t=-\partial_xJ_t,
$$

> と書ける。従って $p_t=\pi_U$ なら $J_t=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

慣性付きでは、[ITD15のKramers確率流](../ITD15/index.md#thm-itd15-kramers-current)を摩擦の位置依存へ書き替えます。速度方向の摩擦流と雑音流はMaxwell因子で打ち消し合い、残る位置輸送と保存力の項も相殺します。過減衰ではItôドリフトと拡散係数の空間微分を確率流に代入し、[ITD14の平衡条件](../ITD14/index.md#thm-itd14-current-equilibrium)と照合します。

<!-- proof-start -->
### 証明

$x$ を周期座標、$v\in\mathbb R$ を速度とします。$dZ=vdt$ は有限変動なので $d[Z,B]=0$ です。試験関数へのItô公式と部分積分から、[Kramers保存則](../ITD15/index.md#thm-itd15-kramers-current)の計算と同じ手順で

$$
\partial_t\rho=-\partial_x(v\rho)-\partial_vJ_v,\quad
J_v=\frac{F(x)}m\rho-\frac{\gamma(x)}m v\rho
-\frac{\gamma(x)}{\beta m^2}\partial_v\rho
$$

を得ます。$\gamma(x)$ は $v$ に依存しないので、速度方向の部分積分に余分な導関数は生じません。与えた密度は積分が1で、$\partial_v\rho_m^{\mathrm{eq}}=-\beta mv\rho_m^{\mathrm{eq}}$ だから

$$
-\frac{\gamma(x)}m v\rho_m^{\mathrm{eq}}
-\frac{\gamma(x)}{\beta m^2}\partial_v\rho_m^{\mathrm{eq}}
=0.
$$

残る部分では $\partial_x\rho_m^{\mathrm{eq}}=-\beta U'(x)\rho_m^{\mathrm{eq}}$ と $F=-U'$ を用いると、

$$
-\partial_x(v\rho_m^{\mathrm{eq}})
-\partial_v\!\left(\frac{F(x)}m\rho_m^{\mathrm{eq}}\right)
=\beta vU'\rho_m^{\mathrm{eq}}+\beta vF\rho_m^{\mathrm{eq}}=0.
$$

従って $\rho_m^{\mathrm{eq}}$ は定常です。速度のGaussian因子を $\mathbb R$ 上で積分すると1なので、位置の周辺密度は $\pi_U$ です。

次に過減衰方程式のドリフトと拡散係数を

$$
b(x)=\frac{F(x)}{\gamma(x)}-\frac{\gamma'(x)}{\beta\gamma(x)^2},
\qquad D(x)=\frac{1}{\beta\gamma(x)}
$$

と置きます。Itô公式を周期試験関数に適用し、二度部分積分すれば $J=bp-(Dp)'$ です。積を微分して

$$
\begin{aligned}
J&=\left(\frac F\gamma-\frac{\gamma'}{\beta\gamma^2}\right)p
-\left(\frac{p'}{\beta\gamma}
-\frac{\gamma'p}{\beta\gamma^2}\right)\\
&=\frac{Fp-\beta^{-1}p'}{\gamma}
\end{aligned}
$$

となります。$\pi_U'=-\beta U'\pi_U=\beta F\pi_U$ を代入すると $J=0$ です。
<!-- proof-end -->

### 一項を落としたときの失敗

外力を零としたまま、補正を省いたItô方程式 $dZ=\sqrt{2/(\beta\gamma(Z))}\,dB$ を採用すると、確率流は

$$
J_{\mathrm{naive}}=-\partial_x\left(\frac{p}{\beta\gamma}\right).
$$

周期密度 $p\propto\gamma$ はこの流れを零にしますが、一様な $p$ は $\gamma'\ne0$ の場所で零にしません。[ITD14の誤ったドリフトの例](../ITD14/index.md#thm-itd14-current-equilibrium)と同じ失敗です。失われたのは「温度が一様な浴で、外力零のとき位置が一様平衡になる」という条件です。元の証明では $-(\gamma'/\beta\gamma^2)p$ が $(Dp)'$ 中の $\gamma'$ を相殺していました。

## 5. 演習（全問詳細解答）

### A1. 摩擦座標とその逆写像の条件

- Level: A
- 問題：$\gamma_0>0$、$0<\varepsilon<1$ とし、$\gamma(x)=\gamma_0(1+\varepsilon\cos x)$ とする。$G(x)=\int_0^x\gamma(r)dr$ を求め、$G$ が実数全体の全単射で、逆写像 $H$ がLipschitz連続であることを示せ。

<!-- solution-start -->
**詳細解答**

積分区間を固定して計算すると

$$
G(x)=\gamma_0\int_0^x(1+\varepsilon\cos r)\,dr
=\gamma_0(x+\varepsilon\sin x).
$$

導関数の下限は $G'(x)=\gamma_0(1+\varepsilon\cos x)\ge\gamma_0(1-\varepsilon)>0$ です。従って $G$ は狭義単調増加です。$|\varepsilon\sin x|\le\varepsilon$ なので $G(x)\to+\infty$（$x\to+\infty$）、$G(x)\to-\infty$（$x\to-\infty$）です。連続性と中間値の定理で全射にもなります。

$a>b$ とし $x=H(a)$、$y=H(b)$ と置くと、積分から

$$
a-b=G(x)-G(y)=\int_y^x\gamma(r)dr
\ge\gamma_0(1-\varepsilon)(x-y).
$$

従って $|H(a)-H(b)|\le |a-b|/\{\gamma_0(1-\varepsilon)\}$ です。
<!-- solution-end -->

### A2. 外力のない定数摩擦の運動量

- Level: A
- 問題：$F=0$、$\gamma(x)=\gamma_0>0$、$P_0^m$ はBrown運動と独立で平均0、分散 $m/\beta$ と仮定する。$dP_t^m=-(\gamma_0/m)P_t^m dt+\sqrt{2\gamma_0/\beta}\,dB_t$ の二乗平均を求めよ。

<!-- solution-start -->
**詳細解答**

$a=\gamma_0/m$ として積分因子を使うと

$$
P_t^m=e^{-at}P_0^m+\sqrt{2\gamma_0/\beta}
\int_0^te^{-a(t-s)}\,dB_s.
$$

初期値とBrown運動は独立で、両項の平均は零です。[Itô等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)より

$$
\begin{aligned}
\mathbb E(P_t^m)^2
&=e^{-2at}\frac m\beta+\frac{2\gamma_0}\beta
\int_0^te^{-2a(t-s)}ds\\
&=\frac m\beta e^{-2at}+\frac{\gamma_0}{\beta a}(1-e^{-2at})
=\frac m\beta.
\end{aligned}
$$

運動量の分散は $O(m)$ ですが、速度の分散はこれを $m^2$ で割るので $1/(\beta m)$ です。
<!-- solution-end -->

### A3. 雑音誘起ドリフトの符号

- Level: A
- 問題：$F=0$、$\gamma(x)=\gamma_0(1+\varepsilon\cos x)$、$\gamma_0>0$、$0<\varepsilon<1$ とする。[位置依存摩擦の小質量極限](#thm-itd17-variable-friction-limit)のItôドリフト $b(x)$ と拡散係数 $D(x)$ を具体的に求めよ。

<!-- solution-start -->
**詳細解答**

$\gamma'(x)=-\gamma_0\varepsilon\sin x$、$D=1/(\beta\gamma)$ なので

$$
b(x)=-\frac{\gamma'(x)}{\beta\gamma(x)^2}
=\frac{\varepsilon\sin x}
{\beta\gamma_0(1+\varepsilon\cos x)^2},
\qquad
D(x)=\frac{1}{\beta\gamma_0(1+\varepsilon\cos x)}.
$$

$x=\pi/2$ では $\sin x=1$ なので $b>0$、$x=3\pi/2$ では $b<0$ です。ただしこれは単独の外力を意味せず、密度流には $-(Dp)'$ も入るので、漂移 $b$ だけから平衡の向きを推測してはいけません。
<!-- solution-end -->

### A4. 外力零の一様平衡

- Level: A
- 問題：$L$ 周期の正の滑らかな摩擦 $\gamma$ と $F=0$ を考える。[平衡整合定理](#thm-itd17-equilibrium-consistency)の流れを用い、$p(x)=1/L$ が定常であることを直接確かめよ。

<!-- solution-start -->
**詳細解答**

$p'=0$ かつ $F=0$ を流れへ代入すれば

$$
J(x)=\frac{0\cdot(1/L)-\beta^{-1}\cdot0}{\gamma(x)}=0.
$$

したがって保存則 $\partial_tp=-\partial_xJ$ の右辺は零です。$p>0$ かつ $\int_0^L p(x)dx=1$ で正規化も満たします。摩擦が非定数でも一様平衡は保たれます。
<!-- solution-end -->

### A5. 初期速度の尺度を外すと何が起こるか

- Level: A
- 問題：$F=0$、$\gamma=\gamma_0>0$、$Z_0^m=z_0$、決定的な初期速度 $V_0^m=1/m$ とする。この初期速度は[定義](#def-itd17-inertial-variable-friction)のMaxwell初期条件を満たさない。$P_0^m$ と、固定時刻 $t>0$ における初期速度が位置へ与える変位の極限を求めよ。

<!-- solution-start -->
**詳細解答**

$P_0^m=mV_0^m=1$ であり、$\mathbb E(P_0^m)^2=1$ は $O(m)$ ではありません。速度方程式へ積分因子 $e^{\gamma_0t/m}$ を掛け、得た $e^{-\gamma_0t/m}V_0^m$ を時間積分します。この操作は[ITD16の速度積分表示の導出](../ITD16/index.md#thm-itd16-explicit-solution)と同じですが、ここでは初期化を変更しているので直接計算します。初期速度から来る変位は

$$
\frac{1-e^{-\gamma_0t/m}}{\gamma_0/m}\,\frac1m
=\frac{1-e^{-\gamma_0t/m}}{\gamma_0}
\longrightarrow\frac1{\gamma_0}
$$

です。$t>0$ では初期の速い層が有限の位置ずれを残します。初期運動量を小さくする仮定が、極限の初期位置を保つために必要な機構だと分かります。
<!-- solution-end -->

### B1. Maxwell分布を仮定しない運動量評価

- Level: B
- 問題：$\gamma_-\le\gamma(x)\le\gamma_+$、$|F(x)|\le M$ とし、$P_0^m$ はBrown運動と独立で $\mathbb E(P_0^m)^2\le C_0m$ のみを仮定する。[運動量二乗評価](#thm-itd17-momentum-bound)の結論 $\sup_{t\le\tau}\mathbb E(P_t^m)^2=O(m)$ が引き続き成り立つことを示せ。

<!-- solution-start -->
**詳細解答**

運動量方程式のItô展開は初期分布の形に依存しません。[Itô公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)と $2PF\le(\gamma_-/m)P^2+mM^2/\gamma_-$ を使うと、

$$
q'(t)\le-\frac{\gamma_-}m q(t)
+\frac{mM^2}{\gamma_-}+\frac{2\gamma_+}\beta,
\qquad q(t)=\mathbb E(P_t^m)^2.
$$

$e^{\gamma_-t/m}$ を掛けて $0$ から $t$ まで積分すると

$$
q(t)\le e^{-\gamma_-t/m}C_0m
+(1-e^{-\gamma_-t/m})
\left(\frac{m^2M^2}{\gamma_-^2}+\frac{2m\gamma_+}{\beta\gamma_-}\right).
$$

$0<m\le1$ なら両括弧は $m$ の定数倍以下です。定理の収束証明で必要なのは正規分布の形自体ではなく、この初期運動量の二乗評価であることが分かります。
<!-- solution-end -->

### B2. 定数摩擦で直接結合する

- Level: B
- 問題：$F(x)=F_0$、$\gamma(x)=\gamma_0$、$Z_0^m=z_0$ とする。$P_t^m$ の積分表示から、同じBrown運動による過減衰過程 $Z_t=z_0+(F_0/\gamma_0)t+\sqrt{2/(\beta\gamma_0)}B_t$ との誤差を導け。$P_0^m=O_{L^2}(\sqrt m)$ のとき、固定時刻でその誤差の二乗平均が零に近づくことを説明せよ。

<!-- solution-start -->
**詳細解答**

定数 $\gamma_0$ に対して運動量を積分した関係は

$$
\gamma_0(Z_t^m-z_0)
=F_0t+\sqrt{2\gamma_0/\beta}\,B_t-(P_t^m-P_0^m).
$$

これを $\gamma_0$ で割り、指定された過減衰位置を差し引くと

$$
Z_t^m-Z_t=-\frac{P_t^m-P_0^m}{\gamma_0}.
$$

従って

$$
\mathbb E|Z_t^m-Z_t|^2
\le\frac{2}{\gamma_0^2}
\{\mathbb E(P_t^m)^2+\mathbb E(P_0^m)^2\}=O(m).
$$

一般の位置依存摩擦の場合はこの単純な割り算をできないため、摩擦座標とGronwallの不等式が必要になります。
<!-- solution-end -->

### B3. 自由エネルギーの減少と流れ

- Level: B
- 問題：周期 $L$ の $C^3$ 級ポテンシャル $U$、$F=-U'$、正で時間・空間に関して十分に微分可能な確率密度 $p_t$ を考える。$\pi_U\propto e^{-\beta U}$ とし、$\mathcal A[p]=\beta^{-1}\int_0^L p\log(p/\pi_U)dx$ と置く。[平衡整合定理](#thm-itd17-equilibrium-consistency)の流れと周期境界から、$\mathcal A[p_t]$ の時間微分を $J_t^2/p_t$ の積分で表せ。

<!-- solution-start -->
**詳細解答**

$\int_0^Lp_tdx=1$ は保存されるので $\int\partial_tp_tdx=0$ です。したがって

$$
\frac d{dt}\mathcal A[p_t]
=\beta^{-1}\int_0^L(\partial_tp_t)\log(p_t/\pi_U)dx.
$$

保存則 $\partial_tp_t=-\partial_xJ_t$ を使い、周期境界で積分すると

$$
\frac d{dt}\mathcal A[p_t]
=\beta^{-1}\int_0^LJ_t\,\partial_x\log(p_t/\pi_U)dx.
$$

$\pi_U'/\pi_U=-\beta U'=\beta F$ であるため、

$$
\partial_x\log(p_t/\pi_U)
=\frac{p_t'}{p_t}-\beta F
=-\frac{\beta\gamma J_t}{p_t}.
$$

これを直前の式へ代入して

$$
\boxed{\frac d{dt}\mathcal A[p_t]
=-\int_0^L\frac{\gamma(x)J_t(x)^2}{p_t(x)}dx\le0}
$$

を得ます。正の $\gamma,p_t$ の下、等号は $J_t=0$ のときです。[ITD14の散逸平方公式](../ITD14/index.md#thm-itd14-fluctuation-dissipation)とも一致します。
<!-- solution-end -->

### B4. 慣性付き平衡での二種類の相殺

- Level: B
- 問題：$F=-U'$、$U,\gamma$ が周期的、$\rho(x,v)=C e^{-\beta(U(x)+mv^2/2)}$ とする。位置依存摩擦のKramers流

$$
J_v=\frac Fm\rho-\frac{\gamma(x)}m v\rho
-\frac{\gamma(x)}{\beta m^2}\partial_v\rho
$$

について、速度方向の摩擦・雑音と、残る位置輸送・保存力がそれぞれ相殺することを示せ。

<!-- solution-start -->
**詳細解答**

指数の微分から

$$
\partial_v\rho=-\beta mv\rho,\qquad
\partial_x\rho=-\beta U'\rho.
$$

まず速度方向の不可逆流は

$$
-\frac{\gamma}m v\rho
-\frac{\gamma}{\beta m^2}(-\beta mv\rho)=0.
$$

残る保存則の右辺では

$$
\begin{aligned}
-\partial_x(v\rho)-\partial_v(F\rho/m)
&=-v(-\beta U'\rho)-\frac Fm(-\beta mv\rho)\\
&=\beta v(U'+F)\rho=0
\end{aligned}
$$

です。$F=-U'$ を最後に使用しました。摩擦が位置依存でも、$\partial_v$ は $\gamma(x)$ を微分しないことが肝心です。
<!-- solution-end -->

### C1. 非一様摩擦と周期ポテンシャルを一度につなぐ

- Level: C
- 問題：$L=2\pi$、$\gamma(x)=\gamma_0(1+\varepsilon\cos x)$（$\gamma_0>0$、$0<\varepsilon<1$）、$U(x)=u\cos x$（$u\in\mathbb R$）、$F=-U'$、$\beta>0$ を考える。初期位置 $z_0$ は固定、慣性付き初期速度はBrown運動と独立な $N(0,1/(\beta m))$ とする。

  1. 摩擦座標と外力、摩擦の上下界を求め、固定時刻での小質量極限が適用できる理由を説明せよ。
  2. 極限のItôドリフト・拡散係数を求め、平衡密度 $\pi_U$ を書いて流れが零になることを示せ。
  3. 補正ドリフトを削除した場合、同じ $\pi_U$ が流れを零にするか判定し、失敗する位置と証明機構を述べよ。

<!-- solution-start -->
**詳細解答**

**1. 摩擦座標と仮定**：$U'(x)=-u\sin x$ なので $F(x)=u\sin x$ です。$\gamma$ と $F$ は滑らかで周期的ゆえ有界かつLipschitz、$\gamma_\pm=\gamma_0(1\pm\varepsilon)$ と置けます。積分により

$$
G(x)=\gamma_0(x+\varepsilon\sin x),\qquad
G'(x)=\gamma_0(1+\varepsilon\cos x)\ge\gamma_->0.
$$

また初期運動量は $\mathbb E(P_0^m)^2=m/\beta$ です。従って[運動量評価](#thm-itd17-momentum-bound)と[小質量極限定理](#thm-itd17-variable-friction-limit)の仮定が全て満たされ、各固定時刻 $t$ で $\mathbb E|Z_t^m-Z_t|^2\le C_\tau m$ です。

**2. ドリフトと平衡**：$\gamma'(x)=-\gamma_0\varepsilon\sin x$ を代入して

$$
\begin{aligned}
b(x)&=\frac{u\sin x}{\gamma_0(1+\varepsilon\cos x)}
+\frac{\varepsilon\sin x}
{\beta\gamma_0(1+\varepsilon\cos x)^2},\\
D(x)&=\frac{1}{\beta\gamma_0(1+\varepsilon\cos x)}.
\end{aligned}
$$

正規化したGibbs密度は、$Z_U=\int_0^{2\pi}e^{-\beta u\cos r}dr$ と置いて

$$
\pi_U(x)=Z_U^{-1}e^{-\beta u\cos x}.
$$

その位置微分は $\pi_U'=\beta u\sin x\,\pi_U=\beta F\pi_U$ です。[平衡整合定理](#thm-itd17-equilibrium-consistency)の流れへ代入すると

$$
J=\frac{F\pi_U-\beta^{-1}\pi_U'}{\gamma}
=\frac{F\pi_U-F\pi_U}{\gamma}=0.
$$

**3. 補正を欠いた場合**：ドリフトを $b_0=F/\gamma$ に変えると

$$
\begin{aligned}
J_0
&=\frac F\gamma\pi_U-\partial_x\left(\frac{\pi_U}{\beta\gamma}\right)\\
&=\frac{F\pi_U-\beta^{-1}\pi_U'}{\gamma}
+\frac{\gamma'}{\beta\gamma^2}\pi_U
=-\frac{\varepsilon\sin x}
{\beta\gamma_0(1+\varepsilon\cos x)^2}\pi_U(x).
\end{aligned}
$$

$\sin x\ne0$ の位置では流れが零ではありません。削除したのは $D'=-\gamma'/(\beta\gamma^2)$ であり、$J=bp-(Dp)'$ の二つの $\gamma'$ の項が打ち消し合う仕組みを壊しました。正しい小質量極限と一様温度の平衡条件を同時に満たせなくなります。
<!-- solution-end -->

## 6. 位置の極限から言えること・言えないこと

この章では、摩擦の空間変化があっても等温の慣性付き運動から位置拡散へ進めることを、**各固定時刻の二乗平均誤差が零に近づくこと**として証明しました。摩擦座標で運動量の端点差を分離することが、位置依存の雑音にも適用できる仕組みです。得られた $D'=-(\gamma'/\beta\gamma^2)$ は[ITD14のItô形](../ITD14/index.md#def-itd14-isothermal-diffusion)と一致し、保存力のもとで質量によらないGibbs平衡も維持します。

ただし、$\mathbb E|Z_t^m-Z_t|^2\to0$ から $\sup_{0\le t\le\tau}|Z_t^m-Z_t|\to0$ や浴熱の収束を自動的に結論することはできません。[ITD16の運動エネルギー境界項](../ITD16/index.md#thm-itd16-kinetic-boundary)は、位置が収束しても速度のエネルギーが残り得る具体例でした。温度勾配、境界の反射・吸収、非有界な力や摩擦、仕事・熱・エントロピー生成の経路極限には、それぞれ追加の仮定と別の議論が必要です。
