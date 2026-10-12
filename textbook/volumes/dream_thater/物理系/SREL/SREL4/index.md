# SREL4 相対論的質点の作用と運動方程式

<!-- definition-example-audit: strict -->

[SREL3 の四元運動量](../SREL3/index.md#def-srel3-four-momentum)を使えば、ある瞬間のエネルギーと運動量を一つの四ベクトルにまとめられます。しかし、運動量の値を知っても、次の瞬間にどう変化するかは決まりません。運動を決めるには、**どの世界線が実現するのか**という動力学の規則が必要です。

古典力学では、作用を変分すると運動方程式が現れました。相対論では座標時刻が慣性系で変化するので、$\int L\,dt$ の形だけを手掛かりに作用を選ぶと、慣性系ごとに別の法則を作ってしまうおそれがあります。一方、[固有時](../SREL2/index.md#def-srel2-proper-time)は慣性系によらない時計の時間です。そこで固有時を使って自由粒子の作用を作り、停留条件から運動方程式を導きます。その後、**自由粒子の作用から導く方程式**と、**外力がある場合に別途与える運動法則**を区別します。

## 1. モデルと変分で固定するもの

時空を $\mathbb R^4$ とし、事象を $X=(ct,\boldsymbol r)$、光速を $c>0$、[Minkowski計量](../SREL2/index.md#def-srel2-minkowski-metric)を

$$
g(V,W)=V^0W^0-\sum_{i=1}^{3}V^iW^i
$$

とします。計量の符号は $(+,-,-,-)$、質点の静止質量は**一定の** $m>0$ です。対象は未来向き時間的な、必要な範囲で $C^2$ の世界線で、全点で $|\boldsymbol v|<c$ とします。角のある経路は各区間で別々に考えます。

作用の変分では**二つの端点事象**を固定します。$t$ でパラメータ表示したときには、固定した $t_0<t_1$ のもとで $\boldsymbol r(t_0)$ と $\boldsymbol r(t_1)$ も固定し、変分 $\boldsymbol h(t)$ は両端で零とします。変分の途中の曲線も未来向き時間的になるよう、十分小さい滑らかな変形だけを使います。

まず静止粒子の世界線では $\Delta\tau=\Delta t$、一定速度 $v$ の粒子では

$$
\Delta\tau=\Delta t\sqrt{1-v^2/c^2}.
$$

この二つを、どの系から見ても同じ値を持つ一つの作用にまとめます。

<a id="def-srel4-free-action"></a>

<!-- formal-statement-start -->
> **定義（自由質点の固有時作用）**  
> 静止質量 $m>0$ の粒子が、固定された二事象を結ぶ未来向き時間的 $C^1$ 世界線 $X$ に沿って動くとき、その自由粒子の作用を

$$
S_0[X]=-mc^2\int_X d\tau
$$

> と定義する。単調増加する $C^1$ パラメータ $\lambda$ に対し、$\dot X=dX/d\lambda$ と書けば

$$
S_0[X]=-mc\int_{\lambda_0}^{\lambda_1}
\sqrt{g(\dot X,\dot X)}\,d\lambda.
$$

> 座標時刻 $t$ で表せるときの Lagrange関数は

$$
L_0(\boldsymbol v)=-mc^2\sqrt{1-|\boldsymbol v|^2/c^2},
\qquad S_0=\int_{t_0}^{t_1}L_0\,dt.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel4-free-action -->
### 例：静止と等速運動

**定義の確認：** どちらも未来向きで $|v|<c$ です。時間幅 $T>0$ に対し、静止なら $S_0=-mc^2T$、$v=3c/5$ の等速世界線なら

$$
S_0=-mc^2 T\sqrt{1-9/25}=-\frac45mc^2T.
$$

二つの値を大小比較する際には注意が必要です。この二つの世界線は、普通は**同じ終点事象に到達しません**。端点を変えて得た数値を、同じ端点の作用の最小性と取り違えてはいけません。
<!-- definition-example-end -->

<a id="prop-srel4-invariant-action"></a>

<!-- formal-statement-start -->
> **命題（自由作用のLorentz不変性と再パラメータ不変性）**  
> 二事象を結ぶ未来向き時間的な区分的 $C^1$ 世界線に対し、$S_0$ は未来方向を保存するLorentz変換と時空並進で不変である。また、方向を保つ $C^1$ の正則なパラメータ変更によっても値は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

前半には[時空間隔の不変性](../SREL2/index.md#thm-srel2-interval-invariance)を世界線の微分ベクトルへ適用します。後半では、パラメータ変更による速度の倍率と積分の微小区間の倍率が相殺します。

<!-- proof-start -->
### 証明

一定のLorentz変換 $\Lambda$ と並進 $a$ に対し、$X'=\Lambda X+a$ です。$\dot X'=\Lambda\dot X$ なので、計量の保存性により

$$
g(\dot X',\dot X')
=g(\Lambda\dot X,\Lambda\dot X)
=g(\dot X,\dot X).
$$

未来向き時間的な世界線では平方根は正であり、積分端点が同じ物理的事象に対応するので $S_0[X']=S_0[X]$ です。

次に $\lambda=\phi(s)$ が狭義増加で $\phi'(s)>0$ の $C^1$ パラメータ変更だとします。連鎖律から

$$
\frac{dX}{ds}=\frac{dX}{d\lambda}\phi'(s),
\qquad
\sqrt{g(dX/ds,dX/ds)}
=\phi'(s)\sqrt{g(\dot X,\dot X)}.
$$

したがって $d\lambda=\phi'(s)\,ds$ の変数変換により

$$
\int_{s_0}^{s_1}\sqrt{g(dX/ds,dX/ds)}\,ds
=\int_{\lambda_0}^{\lambda_1}\sqrt{g(\dot X,\dot X)}\,d\lambda.
$$

区分的な経路では各滑らかな区間で適用して加えます。
<!-- proof-end -->

パラメータを替えても作用が変わらないので、作用の定義は**時計の読み方ではなく世界線そのもの**に付随します。逆に、$m>0$ でなく光的経路なら固有時の増分が零になるため、この作用を質量ゼロ粒子の運動法則としてそのまま使うことはできません。

## 2. 停留条件から自由運動を求める

作用の停留とは、端点を固定した任意の十分小さい滑らかな変分 $X_\varepsilon=X+\varepsilon H$ について、$\varepsilon=0$ での $dS_0[X_\varepsilon]/d\varepsilon$ が零になることです。世界線の長さを単に計算するのではなく、隣り合う経路同士を比較します。

<a id="thm-srel4-free-euler-lagrange"></a>

<!-- formal-statement-start -->
> **定理（自由質点の変分方程式）**  
> 静止質量 $m>0$、固定した二事象、未来向き時間的な $C^2$ 世界線を仮定する。自由作用 $S_0$ が端点を固定するすべての滑らかな変分に対して停留するなら、四元速度 $U=dX/d\tau$ は

$$
\frac{dU^\mu}{d\tau}=0
\quad(\mu=0,1,2,3)
$$

> を満たす。逆に、この方程式を満たす世界線は自由作用の停留世界線である。
<!-- formal-statement-end -->

### 証明の見取り図

パラメータ $\lambda$ で変分し、平方根を微分してから部分積分します。端点の変分が零であるため境界項は消えます。自由作用の停留から出るのは**運動量の固有時微分が零**という式です。

<!-- proof-start -->
### 証明

時間的という条件から $G(\lambda)=g(\dot X,\dot X)>0$ です。$X_\varepsilon=X+\varepsilon H$ とし、$H(\lambda_0)=H(\lambda_1)=0$ を仮定します。$\dot X_\varepsilon=\dot X+\varepsilon\dot H$ なので双線形性から

$$
\left.\frac d{d\varepsilon}
g(\dot X_\varepsilon,\dot X_\varepsilon)\right|_{\varepsilon=0}
=2g(\dot X,\dot H).
$$

平方根の連鎖律を作用の被積分関数へ適用して

$$
\delta S_0
=-mc\int_{\lambda_0}^{\lambda_1}
\frac{g(\dot X,\dot H)}{\sqrt G}\,d\lambda.
$$

共変成分を $\dot X_\mu=g_{\mu\nu}\dot X^\nu$ と書くと、積の微分と部分積分によって

$$
\begin{aligned}
\delta S_0
&=-mc\left[\frac{\dot X_\mu H^\mu}{\sqrt G}\right]_{\lambda_0}^{\lambda_1}
+mc\int_{\lambda_0}^{\lambda_1}
\frac d{d\lambda}\left(\frac{\dot X_\mu}{\sqrt G}\right)H^\mu\,d\lambda\\
&=mc\int_{\lambda_0}^{\lambda_1}
\frac d{d\lambda}\left(\frac{\dot X_\mu}{\sqrt G}\right)H^\mu\,d\lambda.
\end{aligned}
$$

最後の等号は $H$ の端点値が零だからです。各成分の $H^\mu$ を独立に選べるので、変分積分が任意の $H$ について零である条件は

$$
\frac d{d\lambda}\left(\frac{\dot X_\mu}{\sqrt G}\right)=0
$$

です。ここで [固有時](../SREL2/index.md#def-srel2-proper-time)をこの世界線へ適用すると

$$
\frac{d\tau}{d\lambda}=\frac{\sqrt G}{c}>0,
\qquad
\frac{\dot X^\mu}{\sqrt G}
=\frac1c\frac{dX^\mu}{d\tau}=\frac{U^\mu}{c}.
$$

したがって $dU_\mu/d\lambda=0$ です。$d\tau/d\lambda>0$ より

$$
\frac{dU_\mu}{d\lambda}
=\frac{dU_\mu}{d\tau}\frac{d\tau}{d\lambda}=0
\quad\Longleftrightarrow\quad
\frac{dU_\mu}{d\tau}=0.
$$

計量行列は一定かつ可逆なので添字を上げて $dU^\mu/d\tau=0$ となります。逆向きはこの計算を逆にたどれば $\delta S_0=0$ です。
<!-- proof-end -->

四元速度が一定なら、[四元速度の定義](../SREL3/index.md#def-srel3-four-velocity)より座標速度も一定です。$dX/d\tau=U_0$ を積分すると $X(\tau)=X(\tau_0)+U_0(\tau-\tau_0)$、すなわち自由粒子は時空の直線上を運動します。

作用の**停留**と**最小**は同じ言葉ではありません。ただし未来向き時間的な二事象の間では、[慣性世界線の固有時最大性](../SREL2/index.md#prop-srel2-inertial-max-proper-time)から、自由な直線世界線は $\int d\tau$ を最大にします。$S_0=-mc^2\int d\tau$ で $m,c>0$ なので、同じ端点をもつ許容世界線の中で $S_0$ は最小になります。符号を逆にして「固有時が最小」と述べないようにします。

## 3. 座標時刻で運動量とエネルギーを回収する

作用を実際の計算に使うには、任意の慣性系の時刻 $t$ で Euler–Lagrange 方程式を展開すると便利です。$\boldsymbol r=(x^1,x^2,x^3)$ とし、$\boldsymbol v=d\boldsymbol r/dt$ です。

<a id="def-srel4-canonical-energy"></a>

<!-- formal-statement-start -->
> **定義（正準運動量と正準エネルギー）**  
> $|\boldsymbol v|<c$ の自由質点の Lagrange関数 $L_0(\boldsymbol v)$ に対し、正準運動量 $\boldsymbol\pi$ と正準エネルギー $H_0$ を

$$
\pi_i=\frac{\partial L_0}{\partial v_i},
\qquad
H_0=\sum_{i=1}^{3}\pi_i v_i-L_0
$$

> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel4-canonical-energy -->
### 例：静止系

**定義の確認：** $\boldsymbol v=0$ は定義域内で、$L_0(0)=-mc^2$、微分した運動量は $\boldsymbol\pi=0$ です。したがって $H_0=0-(-mc^2)=mc^2$ です。静止粒子にも正準エネルギーがあることが確認できます。
<!-- definition-example-end -->

<a id="thm-srel4-canonical-momentum"></a>

<!-- formal-statement-start -->
> **定理（正準量と四元運動量の一致）**  
> 静止質量 $m>0$ の自由質点について、上の $\boldsymbol\pi,H_0$ は [SREL3 の三次元運動量と全エネルギー](../SREL3/index.md#def-srel3-four-momentum) に等しい。

$$
\boldsymbol\pi=\gamma m\boldsymbol v=\boldsymbol p,
\qquad H_0=\gamma mc^2=E.
$$

> さらに、座標時刻での自由 Euler–Lagrange 方程式は $d\boldsymbol p/dt=0$ となり、先の四元方程式と同じ等速運動を記述する。
<!-- formal-statement-end -->

### 証明の見取り図

平方根を $v_i$ で偏微分したあと、$H_0$ の二項を通分します。最後に Lagrange関数が位置に依存しないことを確認します。

<!-- proof-start -->
### 証明

$q=|\boldsymbol v|^2/c^2$ と置くと $q<1$ です。各 $i$ について連鎖律から

$$
\begin{aligned}
\frac{\partial L_0}{\partial v_i}
&=-mc^2\frac12(1-q)^{-1/2}\left(-\frac{2v_i}{c^2}\right)\\
&=\frac{mv_i}{\sqrt{1-q}}
=\gamma mv_i.
\end{aligned}
$$

次に $\gamma^{-1}=\sqrt{1-q}$ および $\gamma(1-q)=\gamma^{-1}$ を使うと

$$
\begin{aligned}
H_0
&=\gamma m|\boldsymbol v|^2+mc^2\sqrt{1-q}\\
&=mc^2\left(\gamma q+\frac1\gamma\right)\\
&=mc^2\left(\gamma q+\gamma(1-q)\right)
=\gamma mc^2.
\end{aligned}
$$

よって [SREL3 の四元運動量](../SREL3/index.md#def-srel3-four-momentum)の成分と一致します。自由系では $\partial L_0/\partial x^i=0$ です。端点を固定した $\boldsymbol r+\varepsilon\boldsymbol h$ に対する変分は

$$
\delta S_0
=\int_{t_0}^{t_1}\sum_i
\frac{\partial L_0}{\partial v_i}\frac{dh_i}{dt}\,dt
=-\int_{t_0}^{t_1}\sum_i\frac{d\pi_i}{dt}h_i\,dt
$$

となり、任意の端点零の $h_i$ について停留する条件は $d\boldsymbol\pi/dt=0$ です。さらに [質量殻の速度復元式](../SREL3/index.md#thm-srel3-mass-shell)により、一定の $\boldsymbol p$ は一定の $\boldsymbol v=c^2\boldsymbol p/E$ に対応します。従って四元方程式の結論と一致します。
<!-- proof-end -->

## 4. 外力があるとき：三次元の仕事から四元力へ

自由作用が導いたのは $dP/d\tau=0$ です。相互作用を考える場合は、**その相互作用の法則を追加しなくてはなりません**。ここでは相互作用の起源を決めず、観測する一つの慣性系で $\boldsymbol f=d\boldsymbol p/dt$ を与えます。後続章で扱う電磁場の具体的な力は、ここから先の入力になります。

<a id="def-srel4-three-force"></a>

<!-- formal-statement-start -->
> **定義（三次元力と仕事率）**  
> 静止質量 $m>0$ が一定で、未来向き時間的な $C^2$ 世界線に沿う粒子について、選んだ慣性系での三次元力を

$$
\boldsymbol f=\frac{d\boldsymbol p}{dt},
\qquad \boldsymbol p=\gamma m\boldsymbol v
$$

> と定める。$\boldsymbol f\cdot\boldsymbol v$ をその系での仕事率という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel4-three-force -->
### 例：座標加速度が一定でない場合

**定義の確認：** 一次元で瞬間速度 $v=3c/5$、座標加速度 $a=dv/dt$ のとき、[SREL3 の固有加速度の計算](../SREL3/index.md#prop-srel3-proper-accel-1d)と同じ積の微分を使い

$$
\frac{dp_x}{dt}
=m\frac d{dt}(\gamma v)=m\gamma^3a=\frac{125}{64}ma.
$$

従って、相対論的な三次元力は通常 $ma$ とは一致しません。なお $\boldsymbol f$ の大きさが有限でも $|\boldsymbol v|<c$ は保たれます。
<!-- definition-example-end -->

<a id="prop-srel4-work-energy"></a>

<!-- formal-statement-start -->
> **命題（相対論的な仕事とエネルギー）**  
> 一定の静止質量 $m>0$ を持ち、$d\boldsymbol p/dt=\boldsymbol f$ を満たす未来向き時間的な $C^2$ 粒子では、全エネルギー $E$ は

$$
\frac{dE}{dt}=\boldsymbol f\cdot\boldsymbol v,
\qquad
E=\sqrt{m^2c^4+c^2|\boldsymbol p|^2}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[質量殻関係式](../SREL3/index.md#thm-srel3-mass-shell)の正エネルギー枝を $t$ で微分します。根号の微分の後、$\boldsymbol v=c^2\boldsymbol p/E$ を使います。

<!-- proof-start -->
### 証明

$m,c$ は時間によらず $E>0$ ですから、質量殻の両辺を微分すると

$$
2E\frac{dE}{dt}
=2c^2\boldsymbol p\cdot\frac{d\boldsymbol p}{dt}.
$$

$2E>0$ で割り、[速度復元式](../SREL3/index.md#thm-srel3-mass-shell)と $\boldsymbol f=d\boldsymbol p/dt$ を代入すると

$$
\frac{dE}{dt}
=\frac{c^2\boldsymbol p}{E}\cdot\boldsymbol f
=\boldsymbol v\cdot\boldsymbol f.
$$

これは静止質量を一定としたときの法則です。静止質量が変わる系へ、同じ式を仮定確認なしに流用することはできません。
<!-- proof-end -->

速度に垂直な力は、その瞬間には仕事率を生みません。だからといって力が零なのではなく、運動量の**向き**を変えることができます。

<a id="def-srel4-four-force"></a>

<!-- formal-statement-start -->
> **定義（四元力）**  
> 一定の静止質量 $m>0$ を持つ未来向き時間的 $C^2$ 世界線について、四元力を四元運動量 $P=mU$ の固有時微分で定める。

$$
K^\mu=\frac{dP^\mu}{d\tau}=mA^\mu,
\qquad A^\mu=\frac{dU^\mu}{d\tau}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel4-four-force -->
### 例：瞬間静止系

**定義の確認：** ある瞬間に $\boldsymbol v=0$ なら $\gamma=1$、$U=(c,\boldsymbol0)$ です。[四元加速度の瞬間静止系での形](../SREL3/index.md#def-srel3-four-acceleration)を使うと $A=(0,\boldsymbol a)$ なので、$K=(0,m\boldsymbol a)$ です。時間成分が零であるのは瞬間静止系に限った事実で、別の慣性系でも常に零という意味ではありません。
<!-- definition-example-end -->

<a id="thm-srel4-four-force"></a>

<!-- formal-statement-start -->
> **定理（四元力の成分・直交性・質量殻保存）**  
> 静止質量 $m>0$ が一定の未来向き時間的 $C^2$ 世界線で、$\boldsymbol f=d\boldsymbol p/dt$ とする。このとき四元力は

$$
K=\left(\gamma\frac{\boldsymbol f\cdot\boldsymbol v}{c},
\gamma\boldsymbol f\right)
$$

> と表され、四元速度との直交条件

$$
g(U,K)=0
$$

> を満たす。逆に $P=mU$ で $K=dP/d\tau$ とし、$g(U,K)=0$ なら $g(P,P)=m^2c^2$ の値は固有時に沿って保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

$d/d\tau=\gamma\,d/dt$ を四元運動量の各成分に作用させます。時間成分は仕事とエネルギーの関係を使い、直交性では $U=(\gamma c,\gamma\boldsymbol v)$ と内積を取ります。

<!-- proof-start -->
### 証明

[四元運動量](../SREL3/index.md#def-srel3-four-momentum)は $P=(E/c,\boldsymbol p)$ です。[固有時の定義](../SREL2/index.md#def-srel2-proper-time)から $dt/d\tau=\gamma$ なので

$$
\begin{aligned}
K^0&=\frac{d(E/c)}{d\tau}
=\frac{\gamma}{c}\frac{dE}{dt}
=\gamma\frac{\boldsymbol f\cdot\boldsymbol v}{c},\\
\boldsymbol K&=\frac{d\boldsymbol p}{d\tau}
=\gamma\frac{d\boldsymbol p}{dt}
=\gamma\boldsymbol f.
\end{aligned}
$$

従って

$$
\begin{aligned}
g(U,K)
&=(\gamma c)\left(\gamma\frac{\boldsymbol f\cdot\boldsymbol v}{c}\right)
-(\gamma\boldsymbol v)\cdot(\gamma\boldsymbol f)\\
&=\gamma^2\boldsymbol f\cdot\boldsymbol v
-\gamma^2\boldsymbol v\cdot\boldsymbol f=0.
\end{aligned}
$$

別の確認として、[四元加速度の直交性](../SREL3/index.md#prop-srel3-orthogonality)から $g(U,K)=m g(U,A)=0$ も成り立ちます。逆に $P=mU$ かつ $m$ 一定なので

$$
\frac{d}{d\tau}g(P,P)
=2g\left(P,\frac{dP}{d\tau}\right)
=2m\,g(U,K)=0.
$$

最初に [質量殻](../SREL3/index.md#thm-srel3-mass-shell)にあれば、以後も同じ質量殻にとどまります。
<!-- proof-end -->

**仮定を外すと：** 静止質量一定を捨てれば $P=m(\tau)U$ の微分は $(dm/d\tau)U+mA$ であり、

$$
g\left(U,\frac{dP}{d\tau}\right)
=c^2\frac{dm}{d\tau}+m g(U,A)
=c^2\frac{dm}{d\tau}.
$$

一定質量の直交条件は一般には破れます。また、運動中の粒子に一律 $K=(0,F,0,0)$ を割り当てると $g(U,K)=-\gamma v_xF$ で、$v_xF\ne0$ では直交条件を満たしません。「四元力の時間成分は常に零」という思い込みが、どの仮定を壊すかが分かります。

## 5. 一次元の一定力を最後まで解く

質量一定、一次元で一定の三次元力 $F>0$、初期条件 $p_x(0)=x(0)=0$ を考えます。これは**ある慣性系で** $F$ が一定という仮定であって、すべての系で同じ力の成分が一定という意味ではありません。

<a id="prop-srel4-constant-force"></a>

<!-- formal-statement-start -->
> **命題（一次元の一定力と固有加速度）**  
> $m>0$、$F>0$、$t\ge0$ で $dp_x/dt=F$、$p_x(0)=x(0)=0$ とする。質量殻の正エネルギー枝を選べば

$$
\begin{aligned}
p_x(t)&=Ft,\\
E(t)&=\sqrt{m^2c^4+F^2c^2t^2},\\
v(t)&=\frac{c^2Ft}{E(t)},\\
x(t)&=\frac{E(t)-mc^2}{F}.
\end{aligned}
$$

> また固有加速度の大きさは $\alpha=F/m$ で一定であり、任意の有限 $t$ に対して $0\le v(t)<c$ である。
<!-- formal-statement-end -->

### 証明の見取り図

力を積分して運動量を得たら、[質量殻と速度復元式](../SREL3/index.md#thm-srel3-mass-shell)を順に使います。位置は仕事率 $dE/dt=Fv$ を積分します。最後に一次元の $\alpha=\gamma^3|dv/dt|$ を確認します。

<!-- proof-start -->
### 証明

$d p_x/dt=F$ の両辺を $0$ から $t$ へ積分すると、初期運動量が零なので $p_x(t)=Ft$ です。正エネルギー枝を選ぶと

$$
E(t)=\sqrt{m^2c^4+c^2p_x(t)^2}
=\sqrt{m^2c^4+F^2c^2t^2}.
$$

[速度復元式](../SREL3/index.md#thm-srel3-mass-shell)に代入して $v=c^2Ft/E$ を得ます。[仕事とエネルギー](#prop-srel4-work-energy)は $dE/dt=Fv=F\,dx/dt$ なので、$F>0$ で割って積分すると

$$
x(t)-x(0)=\frac{E(t)-E(0)}F,
\qquad E(0)=mc^2,\quad x(0)=0.
$$

これが示した位置の式です。速度が光速未満であることは

$$
\frac{v(t)^2}{c^2}
=\frac{F^2c^2t^2}{m^2c^4+F^2c^2t^2}<1
$$

から全有限時刻で従います。

最後に $\boldsymbol p=\gamma m\boldsymbol v$ の一次元微分を展開します。$a=dv/dt$ と置き、$\dot\gamma=\gamma^3va/c^2$ より

$$
\begin{aligned}
F&=\frac d{dt}(\gamma mv)
=m(\gamma a+\gamma^3v^2a/c^2)\\
&=m\gamma^3a(1-v^2/c^2+v^2/c^2)
=m\gamma^3a.
\end{aligned}
$$

[SREL3 の一次元固有加速度](../SREL3/index.md#prop-srel3-proper-accel-1d)を代入すると $\alpha=\gamma^3|a|=F/m$ です。
<!-- proof-end -->

この例では座標加速度 $a=F/(m\gamma^3)$ が速度上昇とともに小さくなる一方、固有加速度は一定です。光速は**有限時刻に到達する速度**ではなく $t\to\infty$ で近づく上限です。

## 6. ここまでの適用範囲

自由作用 $S_0$ は**自由粒子**の運動方程式を導きました。$\boldsymbol f\ne0$ のときの $d\boldsymbol p/dt=\boldsymbol f$ は、本章では外から与える追加の相互作用法則です。これを自由作用から導いたと主張してはいけません。相互作用まで一つの作用から導くには、何と結合するかを作用へ明示する必要があります。

次章では電場と磁場を共変なテンソルとして整理し、四元力の時間成分と空間成分を、同じ符号規約で結び付けます。本章の仕事率と四元力の直交性が、その計算を検査する基準になります。

---

# 演習

## Level A

### A1. 固有時作用を計算する

$m>0$ の質点がある慣性系で $0\le t\le T$ の間、一定速度 $v=3c/5$ で移動する。作用 $S_0$ を計算し、静止粒子の作用と比較するときに必要な注意を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|v|/c=3/5<1$ なので世界線は時間的です。[固有時作用](#def-srel4-free-action)に $L_0=-mc^2\sqrt{1-v^2/c^2}$ を代入します。

$$
\begin{aligned}
S_0&=-mc^2\int_0^T\sqrt{1-\frac9{25}}\,dt\\
&=-mc^2\int_0^T\frac45\,dt
=-\frac45mc^2T.
\end{aligned}
$$

静止粒子なら $S_0=-mc^2T$ ですが、静止世界線と移動する世界線は同じ $t=T$ に**別の位置**へ到達します。よって端点固定の最小性を、この二つの値の比較から直接結論してはいけません。
<!-- solution-end -->

### A2. 正準運動量と全エネルギー

静止質量 $m>0$、速度 $\boldsymbol v=(3c/5,0,0)$ の自由粒子の $\boldsymbol\pi$ と $H_0$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|v|<c$、$\gamma=(1-9/25)^{-1/2}=5/4$ です。[正準量の一致](#thm-srel4-canonical-momentum)を $\boldsymbol v$ に代入すると

$$
\boldsymbol\pi=\gamma m\boldsymbol v
=\left(\frac54m\frac{3c}{5},0,0\right)
=\left(\frac34mc,0,0\right).
$$

また

$$
H_0=\gamma mc^2=\frac54mc^2.
$$

$H_0$ は運動エネルギーだけでなく静止エネルギーを含む全エネルギーです。
<!-- solution-end -->

### A3. 自由運動の初期値

質量 $m>0$ の自由粒子が $t=0$ に $\boldsymbol r=\boldsymbol0$、$\boldsymbol p=(-3mc/4,0,0)$ を持つ。$t\ge0$ の軌道を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[自由 Euler–Lagrange 方程式](#thm-srel4-canonical-momentum)は $d\boldsymbol p/dt=0$ なので $\boldsymbol p(t)$ は与えた初期値のままです。[質量殻と速度復元式](../SREL3/index.md#thm-srel3-mass-shell)を使うと

$$
E=\sqrt{m^2c^4+\frac9{16}m^2c^4}=\frac54mc^2,
$$

$$
v_x=\frac{c^2(-3mc/4)}{5mc^2/4}=-\frac{3c}{5},
\qquad v_y=v_z=0.
$$

したがって $\boldsymbol r(0)=0$ を使って

$$
\boldsymbol r(t)=\int_0^t\boldsymbol v\,ds
=\left(-\frac{3ct}{5},0,0\right).
$$
<!-- solution-end -->

### A4. 運動方向の四元力

ある瞬間に $\boldsymbol v=(3c/5,0,0)$、$\boldsymbol f=(F,0,0)$（$F>0$）とする。四元力 $K$ と $g(U,K)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|v|<c$、$\gamma=5/4$ です。[四元力の成分公式](#thm-srel4-four-force)で $\boldsymbol f\cdot\boldsymbol v=3Fc/5$ なので

$$
K^0=\frac54\frac{3Fc/5}{c}=\frac{3F}{4},
\qquad
\boldsymbol K=\left(\frac{5F}{4},0,0\right).
$$

[SREL3 の四元速度](../SREL3/index.md#def-srel3-four-velocity)は $U=(5c/4,3c/4,0,0)$ ですから

$$
g(U,K)=\frac{5c}{4}\frac{3F}{4}
-\frac{3c}{4}\frac{5F}{4}=0.
$$

時間成分 $K^0$ を零にすると直交性を失います。
<!-- solution-end -->

### A5. 横向きの力は仕事をするか

ある瞬間に $\boldsymbol v=(3c/5,0,0)$、$\boldsymbol f=(0,F,0)$（$F\ne0$）である。$dE/dt$ と $K$ を計算し、力が零ではないことを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

内積 $\boldsymbol f\cdot\boldsymbol v=0$ です。[相対論的な仕事とエネルギー](#prop-srel4-work-energy)によれば $dE/dt=0$ です。$\gamma=5/4$ を[四元力の成分公式](#thm-srel4-four-force)に代入すると

$$
K=\left(0,0,\frac54F,0\right).
$$

$F\ne0$ より $K$ の $y$ 成分は零でありません。また $d\boldsymbol p/dt=(0,F,0)$ なので、運動量の方向が変化しています。仕事率零は三次元力零を意味しません。
<!-- solution-end -->

## Level B

### B1. 再パラメータ不変性を積分で確かめる

$0\le t\le T$ の等速世界線 $X(t)=(ct,vt,0,0)$（$|v|<c$）を、$\lambda=2t$ で表す。パラメータ $t$ と $\lambda$ で自由作用をそれぞれ計算し、値を比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$t$ を使うと $\dot X_t=(c,v,0,0)$、$g(\dot X_t,\dot X_t)=c^2-v^2>0$ なので、[自由作用](#def-srel4-free-action)は

$$
S_t=-mc\int_0^T\sqrt{c^2-v^2}\,dt
=-mcT\sqrt{c^2-v^2}.
$$

$\lambda=2t$ では $X(\lambda)=(c\lambda/2,v\lambda/2,0,0)$、$0\le\lambda\le2T$ です。従って

$$
g\left(\frac{dX}{d\lambda},\frac{dX}{d\lambda}\right)
=\frac{c^2-v^2}{4}>0
$$

であり

$$
\begin{aligned}
S_\lambda
&=-mc\int_0^{2T}\frac{\sqrt{c^2-v^2}}2\,d\lambda\\
&=-mc\,\frac{\sqrt{c^2-v^2}}2(2T)
=-mcT\sqrt{c^2-v^2}=S_t.
\end{aligned}
$$

速度成分は半分になりましたが、積分区間が倍になるため同じ値です。
<!-- solution-end -->

### B2. 一定の三次元力から世界線を作る

$m,F>0$ で一次元運動を考える。$dp_x/dt=F$、$p_x(0)=x(0)=0$ とする。$p_x(t)$、$E(t)$、$v(t)$、$x(t)$、固有加速度 $\alpha$ を求め、有限の $t$ で $v<c$ を確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

最初に運動量の微分方程式を積分し

$$
p_x(t)-p_x(0)=\int_0^t F\,ds=Ft
$$

を得ます。[質量殻の正エネルギー枝](../SREL3/index.md#thm-srel3-mass-shell)と速度復元から

$$
\begin{aligned}
E(t)&=\sqrt{m^2c^4+F^2c^2t^2},\\
v(t)&=\frac{c^2p_x}{E}
=\frac{c^2Ft}{\sqrt{m^2c^4+F^2c^2t^2}}.
\end{aligned}
$$

[仕事率](#prop-srel4-work-energy)は $dE/dt=Fv=F\,dx/dt$ で、$E(0)=mc^2$、$x(0)=0$ なので

$$
x(t)=\frac{E(t)-mc^2}{F}
=\frac{mc^2}{F}\left(\sqrt{1+\left(\frac{Ft}{mc}\right)^2}-1\right).
$$

$dp_x/dt=m\gamma^3 dv/dt=F$ を使い、[固有加速度](../SREL3/index.md#prop-srel3-proper-accel-1d)と合わせて

$$
\alpha=\gamma^3\left|\frac{dv}{dt}\right|=\frac Fm.
$$

さらに

$$
1-\frac{v^2}{c^2}
=\frac{m^2c^4}{m^2c^4+F^2c^2t^2}>0
$$

なので、どの有限時刻にも $v<c$ です。
<!-- solution-end -->

### B3. 質量殻を保てない四元力

一定質量 $m>0$ の粒子に、座標系でいつも $K=(0,F,0,0)$（$F\ne0$）を作用させるという提案がある。速度が $\boldsymbol v=(v,0,0)$、$0<|v|<c$ の瞬間に直交条件と質量殻の時間変化を調べ、この提案がなぜ一定質量の運動法則にならないか述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[四元速度](../SREL3/index.md#def-srel3-four-velocity)は $U=(\gamma c,\gamma v,0,0)$、$\gamma>0$ です。計量の符号 $(+,-,-,-)$ を用いると

$$
g(U,K)=(\gamma c)\,0-(\gamma v)F=-\gamma vF\ne0.
$$

[四元力の直交条件](#thm-srel4-four-force)に反します。さらに $P=mU$ の場合、$dP/d\tau=K$ とすれば積の微分から

$$
\frac{d}{d\tau}g(P,P)
=2g(P,K)=2m\,g(U,K)
=-2m\gamma vF\ne0.
$$

したがって $g(P,P)=m^2c^2$ を一定に保てません。瞬間静止系で $K^0=0$ でよい事実を、運動中の系にそのまま転用したことが誤りです。
<!-- solution-end -->

## Level C

### C1. 力を加え、その後に逆向きの力を加える

質量 $m>0$ の粒子が一次元で、$x(0)=0$、$p_x(0)=0$ から出発する。ある慣性系の時刻 $0\le t\le T$（$T>0$）で三次元力 $+F$、$T\le t\le2T$ で三次元力 $-F$（$F>0$）を受ける。力の切替時刻では位置と運動量が連続するとする。

1. 両区間の $p_x(t)$、$E(t)$ と $v(t)$ を求め、$t=2T$ に粒子が静止することを示せ。
2. 終点位置 $x(2T)$ を求め、なぜ出発点に戻らないか説明せよ。
3. 各区間の仕事量を求め、全体のエネルギー増分と比較せよ。
4. この折れ曲がった動力学的世界線に**自由作用の停留方程式**をそのまま適用できるか。理由を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $dp_x/dt=F$ と $p_x(0)=0$ を積分し、前半は $p_x(t)=Ft$ です。後半は連続条件 $p_x(T)=FT$ を初期値にして

$$
p_x(t)=FT-\int_T^t F\,ds=F(2T-t)
\quad(T\le t\le2T).
$$

つまり $q(t)=t$（前半）、$q(t)=2T-t$（後半）と書けば $p_x=Fq(t)$ です。[質量殻の正エネルギー枝と速度復元](../SREL3/index.md#thm-srel3-mass-shell)に代入して

$$
E(t)=\sqrt{m^2c^4+F^2c^2q(t)^2},
\qquad
v(t)=\frac{c^2Fq(t)}{E(t)}.
$$

$0\le q(t)\le T$ なので $v(t)\ge0$、かつ $m>0$ により $v(t)<c$ です。終点では $q(2T)=0$、したがって $p_x(2T)=0$、$v(2T)=0$ です。

(2) 前半の位置は [一定力の積分](#prop-srel4-constant-force)から

$$
x(T)=\frac{E(T)-mc^2}{F}
=\frac{mc^2}{F}\left(\sqrt{1+\frac{F^2T^2}{m^2c^2}}-1\right)>0.
$$

後半では $v(t)=v(2T-t)$ です。変数変換 $s=2T-t$ により

$$
\int_T^{2T}v(t)\,dt
=\int_T^0v(s)(-ds)
=\int_0^T v(s)\,ds=x(T).
$$

よって

$$
x(2T)=2x(T)
=\frac{2mc^2}{F}
\left(\sqrt{1+\frac{F^2T^2}{m^2c^2}}-1\right)>0.
$$

逆向きの**力**は運動量を減らしますが、後半の運動量は零になるまで正のままであり、逆向きの**速度**を生みません。これが元の位置に戻らない理由です。

(3) [仕事率](#prop-srel4-work-energy)は $dE/dt=f_xv$ です。前半の仕事は

$$
W_1=\int_0^T Fv\,dt
=E(T)-E(0)=E(T)-mc^2>0.
$$

後半は

$$
W_2=\int_T^{2T}(-F)v\,dt
=E(2T)-E(T)=mc^2-E(T)=-W_1.
$$

従って $W_1+W_2=0=E(2T)-E(0)$ であり、力が途中で符号を変えても仕事とエネルギーの関係が成立します。

(4) [自由作用の変分方程式](#thm-srel4-free-euler-lagrange)は $dU/d\tau=0$ を要求し、これは $d\boldsymbol p/dt=0$ に対応します。しかし問題の各開区間では $d p_x/dt=\pm F\ne0$ です。したがってこの世界線は**自由作用の停留世界線ではありません**。与えた力を表す相互作用の作用を追加していない以上、自由作用だけからこの運動を導くことはできません。
<!-- solution-end -->
