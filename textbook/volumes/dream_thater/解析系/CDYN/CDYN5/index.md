# CDYN5 強制振動・共振・減衰

[CDYN4の周期変分系](../CDYN4/index.md#def-cdyn4-monodromy)では、周期軌道からのずれが一周ごとにどう変化するかを調べました。今回は、そもそも**外から周期的な力を加えたとき、どんな振動が残るか**を考えます。自律系の周期軌道に沿う微小変位と、時刻によって外力が変わる非自律方程式の解は別物です。とくに[CDYN4の「接線方向の乗数は1」定理](../CDYN4/index.md#thm-cdyn4-tangent-unit)を、外力付きの方程式へそのまま適用してはいけません。

一定の速度で振り子を押し続けても、減衰があれば最初の揺れ方は次第に消え、外力と同じ周期の運動だけが残ります。しかし、押す速さを変えると残る振幅も変わり、減衰がなく固有振動とちょうど一致すれば振幅は増大し続けます。[MECH5の減衰強制振動の定常応答](../../../物理系/MECH/MECH5/index.md#prop-mech5-forced-steady-response)では、実際の質量・抵抗・ばね定数に基づく振幅公式が導かれました。ここでは質量で規格化した系を使い、[ODE3の非斉次線形系](../../ODE/ODE3/index.md#thm-ode3-variation-of-constants)の「特解＋斉次解」から周期解の一意性、振幅ピークの境界、共振の極限と平均仕事率を追います。

## 1. 一つの方程式で三種類の運動を分ける

[MECH5の単振動の定義](../../../物理系/MECH/MECH5/index.md#def-mech5-simple-harmonic-motion)に現れた固有角振動数 $\omega_0>0$、減衰係数 $\beta\ge0$、外力の角振動数 $\Omega>0$、外力振幅 $F_0>0$ を固定し、

$$
q''(t)+2\beta q'(t)+\omega_0^2q(t)=F_0\cos(\Omega t)
$$

を考えます。位置を $q(t)$、速度を $v(t)=q'(t)$ とします。係数はすべて定数で、外力だけが時刻に依存します。初期値を $q(0)=q_0$、$q'(0)=v_0$ と指定すると、[ODE3の線形初期値問題](../../ODE/ODE3/index.md#thm-ode3-homogeneous-ivp)と非斉次系の議論により、解は全時刻で一意に存在します。

右辺が0なら自由振動、右辺があれば強制振動です。強制振動の解を、外力と同じ周期の特解 $q_{\mathrm p}$ と、初期値の違いを担う斉次解 $h$ に分けます。

$$
q(t)=q_{\mathrm p}(t)+h(t),\qquad
h''+2\beta h'+\omega_0^2h=0.
$$

右辺に代入すると、$q_{\mathrm p}$ が元の方程式を、$h$ が斉次方程式を解く限り、確かに和も元の方程式を解きます。こうして「残り続ける振動」と「初期条件による過渡振動」を別々に調べられます。

外力周期は $T=2\pi/\Omega$ です。$\beta>0$ のとき、外力と同じ周期をもつ解を求め、長時間後に残る振動として解釈します。

<a id="def-cdyn5-steady-response"></a>

<!-- formal-statement-start -->
### 定義（定常周期応答）

$\omega_0>0$、$\beta>0$、$\Omega>0$、$F_0>0$ に対する上記方程式で、周期 $T=2\pi/\Omega$ をもつ解 $q_{\mathrm p}(t+T)=q_{\mathrm p}(t)$ を**定常周期応答**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn5-steady-response -->

**定義の確認**　$\omega_0=2,\ \beta=1,\ \Omega=2,\ F_0=3$ とします。$q_{\mathrm p}(t)=\tfrac34\sin 2t$ と置くと、

$$
q_{\mathrm p}''=-3\sin2t,\qquad
2\beta q_{\mathrm p}'=3\cos2t,\qquad
\omega_0^2q_{\mathrm p}=3\sin2t.
$$

和は $3\cos2t$ で外力に一致し、$q_{\mathrm p}(t+\pi)=q_{\mathrm p}(t)$ です。従って確かに $T=\pi$ 周期の定常周期応答です。この周期解の存在と一意性は次の二節で証明します。
<!-- definition-example-end -->

## 2. 正弦・余弦の係数を連立して解く

[MECH5の定常応答命題](../../../物理系/MECH/MECH5/index.md#prop-mech5-forced-steady-response)の $m=1,\ c=2\beta,\ k=\omega_0^2$ に当たる場合です。既出の正の減衰の式を自分で再計算するとともに、減衰を0にした場合の可解条件を新しく確かめます。

まず $q_{\mathrm p}(t)=a\cos(\Omega t)+b\sin(\Omega t)$ と置きます。微分を省略せずに書くと、

$$
\begin{aligned}
q_{\mathrm p}'(t)&=-a\Omega\sin(\Omega t)+b\Omega\cos(\Omega t),\\
q_{\mathrm p}''(t)&=-a\Omega^2\cos(\Omega t)-b\Omega^2\sin(\Omega t).
\end{aligned}
$$

そこで計算を短くするため

$$
D=\omega_0^2-\Omega^2,\qquad
G=2\beta\Omega,\qquad
\Delta=D^2+G^2
$$

と置きます。元の方程式の左辺は

$$
(Da+Gb)\cos(\Omega t)+(Db-Ga)\sin(\Omega t).
$$

右辺の正弦係数は0、余弦係数は $F_0$ なので、$t=0$ および $t=\pi/(2\Omega)$ を代入しても確認できるとおり、

$$
Da+Gb=F_0,\qquad -Ga+Db=0.
$$

<a id="thm-cdyn5-forced-response"></a>

<!-- formal-statement-start -->
### 定理（無減衰の場合まで含む周期特解の可解条件）

$\omega_0>0$、$\beta\ge0$、$\Omega>0$、$F_0>0$ とする。$\Delta=(\omega_0^2-\Omega^2)^2+4\beta^2\Omega^2>0$ なら、方程式

$$
q''+2\beta q'+\omega_0^2q=F_0\cos(\Omega t)
$$

は、次の周期特解をもつ。

$$
q_{\mathrm p}(t)=a\cos(\Omega t)+b\sin(\Omega t),\qquad
a=\frac{F_0(\omega_0^2-\Omega^2)}{\Delta},\qquad
b=\frac{2F_0\beta\Omega}{\Delta}.
$$

$\Delta=0$ が起こるのは $\beta=0,\ \Omega=\omega_0$ の場合に限る。
<!-- formal-statement-end -->

**証明の見取り図**　二つの係数を未知数とする線形方程式の行列式が $\Delta$ です。減衰があると $G>0$ なので、外力の周波数と固有角振動数が一致しても解けます。減衰もなく両周波数が一致すると、係数方程式は解を持ちません。

<!-- proof-start -->
### 証明

上で導出した連立方程式を使います。第一式を $D$ 倍、第二式を $G$ 倍して辺々引くと、

$$
D(Da+Gb)-G(-Ga+Db)=DF_0,\qquad
(D^2+G^2)a=DF_0.
$$

第一式を $G$ 倍、第二式を $D$ 倍して加えると、

$$
G(Da+Gb)+D(-Ga+Db)=GF_0,\qquad
(D^2+G^2)b=GF_0.
$$

$\Delta>0$ なら $a=F_0D/\Delta,\ b=F_0G/\Delta$ です。これらを元の係数式へ戻すと、

$$
Da+Gb=\frac{F_0(D^2+G^2)}{\Delta}=F_0,\qquad
-Ga+Db=\frac{F_0(-GD+DG)}{\Delta}=0.
$$

従って元の二階方程式を全時刻で満たします。正弦・余弦の周期が $T=2\pi/\Omega$ なので、特解も $T$ 周期です。

最後に $\Delta=D^2+G^2$ は二つの実数の平方和であり、$\Delta=0$ と $D=G=0$ は同値です。$\Omega>0$ より $G=2\beta\Omega=0$ は $\beta=0$ を意味し、その下で $D=0$ は $\Omega^2=\omega_0^2$、すなわち正の周波数同士の等式 $\Omega=\omega_0$ です。$\square$
<!-- proof-end -->

例えば $\beta>0$ で $\Omega=\omega_0$ とすると $D=0$ でも $G=2\beta\omega_0>0$ です。従って

$$
q_{\mathrm p}(t)=\frac{F_0}{2\beta\omega_0}\sin(\omega_0t).
$$

押す力が最大になる時刻と位置が最大になる時刻は一致しません。位相の遅れも含めて一つの表式へまとめます。

<a id="def-cdyn5-amplitude-phase"></a>

<!-- formal-statement-start -->
### 定義（周波数応答の振幅と位相遅れ）

上記の周期特解で $\Delta>0$ とする。振幅 $R>0$ と位相遅れ $\delta\in[0,\pi]$ は

$$
q_{\mathrm p}(t)=R\cos(\Omega t-\delta),\qquad
R=\sqrt{a^2+b^2},\qquad
\cos\delta=\frac aR,\quad \sin\delta=\frac bR
$$

によって定める。$\beta\ge0$ より $b\ge0$ なのでこの範囲の $\delta$ は一意に決まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn5-amplitude-phase -->

**定義の確認**　$\omega_0=\Omega=2$、$\beta=1$、$F_0=3$ の場合、$D=0,\ G=4,\ \Delta=16$ なので $a=0,\ b=3/4$。従って $R=3/4$、$\cos\delta=0,\ \sin\delta=1$ から $\delta=\pi/2$。実際

$$
R\cos(2t-\delta)=\frac34\cos(2t-\pi/2)=\frac34\sin2t.
$$

周波数は外力と同じでも位置の波形は四分の一周期だけ遅れます。
<!-- definition-example-end -->

係数公式を使って振幅を一度計算すると、

$$
R^2=a^2+b^2
=\frac{F_0^2(D^2+G^2)}{\Delta^2}
=\frac{F_0^2}{\Delta}.
$$

したがって周波数応答は

$$
R(\Omega)=
\frac{F_0}{\sqrt{(\omega_0^2-\Omega^2)^2+4\beta^2\Omega^2}},
\qquad
\cos\delta=\frac D{\sqrt\Delta},\quad
\sin\delta=\frac G{\sqrt\Delta}.
$$

$\beta>0$ なら $G>0$ ですから $0<\delta<\pi$。$\Omega<\omega_0$ では $D>0$ で $0<\delta<\pi/2$、$\Omega=\omega_0$ では $\delta=\pi/2$、$\Omega>\omega_0$ では $\pi/2<\delta<\pi$ です。単に $\tan\delta=G/D$ とするだけでは象限が失われるため、二つの三角関数の符号で位相を定めました。

## 3. 過渡振動は本当に消えるか

[MECH5の減衰振動の三領域](../../../物理系/MECH/MECH5/index.md#prop-mech5-damping-regimes)を基に、任意の初期値からの過渡項を具体的に求め、周期解の一意性も確認します。

周期特解を求めただけでは、実際の初期値から出発する解がその振動へ近づくか分かりません。差 $h=q-q_{\mathrm p}$ は自由振動の方程式を満たします。固有方程式

$$
\lambda^2+2\beta\lambda+\omega_0^2=0
$$

の二根を使って、減衰が小さい場合、ちょうど臨界の場合、強い場合を分けます。

<a id="thm-cdyn5-transient-decay"></a>

<!-- formal-statement-start -->
### 定理（減衰時の過渡項の消滅と定常周期解の一意性）

$\omega_0>0$、$\beta>0$、$\Omega>0$、$F_0>0$ とする。どの初期値 $(q_0,v_0)\in\mathbb R^2$ から出発する解も

$$
q(t)=q_{\mathrm p}(t)+h(t),\qquad
h(t)\longrightarrow0\quad(t\to+\infty)
$$

と書ける。ここで $q_{\mathrm p}$ は前定理の周期特解であり、$h$ は次の形をとる。

- $0<\beta<\omega_0$：$\nu=\sqrt{\omega_0^2-\beta^2}$ として $h(t)=e^{-\beta t}(C\cos\nu t+S\sin\nu t)$。
- $\beta=\omega_0$：$h(t)=e^{-\beta t}(C+St)$。
- $\beta>\omega_0$：$\lambda_\pm=-\beta\pm\sqrt{\beta^2-\omega_0^2}$ として $h(t)=Ce^{\lambda_+t}+Se^{\lambda_-t}$。

さらに外力周期 $T=2\pi/\Omega$ をもつ解は $q_{\mathrm p}$ ただ一つである。
<!-- formal-statement-end -->

**証明の見取り図**　[ODE3の定係数斉次線形系の解](../../ODE/ODE3/index.md#thm-ode3-homogeneous-ivp)を使い、どの特性根も負の実部を持つことを三場合で確かめます。周期解が二つあったと仮定すると、その差は「周期的でありながら0へ収束する」ので恒等的に0でなければなりません。

<!-- proof-start -->
### 証明

[ODE3の定係数線形初期値問題の解の一意性](../../ODE/ODE3/index.md#thm-ode3-homogeneous-ivp)より、$q-q_{\mathrm p}$ は初期値

$$
h(0)=q_0-q_{\mathrm p}(0),\qquad
h'(0)=v_0-q_{\mathrm p}'(0)
$$

をもつ斉次系の唯一解です。固有方程式の判別式は $4(\beta^2-\omega_0^2)$ です。

$0<\beta<\omega_0$ では二根は $-\beta\pm i\nu$。実数値の一般解は表示した $e^{-\beta t}$ と正弦・余弦の積です。正弦・余弦の絶対値は1以下なので

$$
|h(t)|\le(|C|+|S|)e^{-\beta t}\longrightarrow0.
$$

$\beta=\omega_0$ では重根 $-\beta$ で、[ODE3のJordan型の解](../../ODE/ODE3/index.md#thm-ode3-jordan-exponential)と同じく $h=e^{-\beta t}(C+St)$ です。$t\ge1$ について指数級数から $e^{\beta t}\ge(\beta t)^2/2$ だから

$$
0\le te^{-\beta t}\le\frac{2}{\beta^2t}\longrightarrow0.
$$

従って $C e^{-\beta t}$ と $S t e^{-\beta t}$ はともに消えます。

$\beta>\omega_0$ では $0<\sqrt{\beta^2-\omega_0^2}<\beta$ が $\omega_0>0$ から従います。従って $\lambda_+<0$ かつ $\lambda_-<0$ で、両指数項は0へ収束します。

最後に $p_1,p_2$ がともに $T$ 周期解であると仮定します。差 $g=p_1-p_2$ は斉次系の解であり、いま証明した減衰性から $\lim_{t\to\infty}g(t)=0$ です。しかし任意の固定した $s$ と整数 $n\ge0$ で

$$
g(s)=g(s+nT).
$$

$n\to\infty$ とすれば右辺は0なので $g(s)=0$。$s$ は任意で、二つの周期解は一致します。既に $q_{\mathrm p}$ の存在を構成したので、存在と一意性が揃いました。$\square$
<!-- proof-end -->

**初期値を入れる場所**　不足する定数 $C,S$ は $h_0=q_0-a$、$w_0=v_0-\Omega b$ から計算します。弱減衰の場合は

$$
C=h_0,\qquad
-\beta C+\nu S=w_0,\qquad
S=\frac{w_0+\beta h_0}{\nu}.
$$

この手順を飛ばすと、「定常解は求めたが、初期条件を満たしていない」という解答になります。

**例：立ち上がりと定常振動**　$\omega_0=2,\ \beta=1,\ \Omega=2,\ F_0=3$、$q(0)=q'(0)=0$ なら $q_{\mathrm p}=\tfrac34\sin2t$、$\nu=\sqrt3$ です。$h_0=0$、$w_0=-3/2$ から $C=0$、$S=-3/(2\sqrt3)=-\sqrt3/2$。従って

$$
q(t)=\frac34\sin2t-\frac{\sqrt3}{2}e^{-t}\sin(\sqrt3t).
$$

初めのうちは二つの周波数が重なり、最後には外力周波数2の波形だけが残ります。

## 4. 「固有角振動数」と「振幅最大の周波数」は一致するか

[MECH5の共振の定義](../../../物理系/MECH/MECH5/index.md#def-mech5-resonance)では、無減衰の周波数一致と、減衰を伴う有限なピークを区別しました。ピークの値と強減衰の場合の境界まで定量化します。

振幅 $R(\Omega)$ が大きい周波数を調べます。$\beta>0$ では分母が正なので、$R$ を最大にすることと

$$
\Delta(\Omega)=(\omega_0^2-\Omega^2)^2+4\beta^2\Omega^2
$$

を最小にすることは同値です。ただし $\Omega>0$ という定義域を忘れずに判定します。

<a id="prop-cdyn5-resonance-peak"></a>

<!-- formal-statement-start -->
### 命題（減衰振動子の振幅ピーク）

$\omega_0>0$、$\beta>0$、$F_0>0$ とし、$\Omega>0$ を変化させる。定常周期応答の振幅 $R(\Omega)$ について、

1. $0<\beta<\omega_0/\sqrt2$ なら唯一の最大点は

$$
\Omega_{\mathrm r}=\sqrt{\omega_0^2-2\beta^2},\qquad
R(\Omega_{\mathrm r})=\frac{F_0}{2\beta\sqrt{\omega_0^2-\beta^2}}.
$$

2. $\beta\ge\omega_0/\sqrt2$ なら $R(\Omega)$ は $\Omega>0$ で狭義単調減少し、内部の最大点はない。上限は $\lim_{\Omega\downarrow0}R(\Omega)=F_0/\omega_0^2$ である。
<!-- formal-statement-end -->

**証明の見取り図**　分母を微分して符号を調べます。$\Omega=0$ は対象とした正の外力周波数の範囲に含まれないので、強減衰のとき上限はあっても最大値を達成しません。

<!-- proof-start -->
### 証明

積の微分と合成関数の微分を使って

$$
\begin{aligned}
\Delta'(\Omega)
&=2(\omega_0^2-\Omega^2)(-2\Omega)+8\beta^2\Omega\\
&=4\Omega(\Omega^2-\omega_0^2+2\beta^2).
\end{aligned}
$$

$\Omega>0$ なので $\Delta'$ の符号は第二因子の符号です。$\omega_0^2-2\beta^2>0$ なら、$0<\Omega<\Omega_{\mathrm r}$ で $\Delta'<0$、$\Omega>\Omega_{\mathrm r}$ で $\Delta'>0$。従って $\Omega_{\mathrm r}$ で分母の $\Delta$ は正の周波数全範囲にわたり最も小さくなります。その点では

$$
D=\omega_0^2-\Omega_{\mathrm r}^2=2\beta^2,\quad
G^2=4\beta^2(\omega_0^2-2\beta^2),
$$

従って

$$
\begin{aligned}
\Delta(\Omega_{\mathrm r})
&=(2\beta^2)^2+4\beta^2(\omega_0^2-2\beta^2)\\
&=4\beta^2(\omega_0^2-\beta^2).
\end{aligned}
$$

$\beta>0$ かつ $\omega_0^2-\beta^2>0$ なので正の平方根を取り、表示の最大振幅を得ます。

$\omega_0^2-2\beta^2\le0$ なら $\Omega^2-\omega_0^2+2\beta^2>0$ が $\Omega>0$ の全域で成り立ちます。よって $\Delta'>0$、$R=F_0/\sqrt\Delta$ は狭義単調減少です。$\Omega\downarrow0$ を代入すると $\Delta\to\omega_0^4$ なので上限は $F_0/\omega_0^2$。$\Omega=0$ は許していないため、この値には到達しません。$\square$
<!-- proof-end -->

例えば $\omega_0=3$、$\beta=1$ では最大振幅の周波数は $\sqrt7$ であり、固有角振動数3より小さくなります。$\Omega=\omega_0$ は「外力と減衰なしの固有振動が一致する周波数」で、減衰下のピークを必ずしも指しません。

## 5. 減衰をなくした瞬間、何が壊れるか

[MECH5の無減衰線形振動子の厳密共振](../../../物理系/MECH/MECH5/index.md#prop-mech5-undamped-resonance)では、同じ周波数を外力として与えると時間係数 $t$ が現れることを学びました。ここでは初期値を0に固定し、非共振解から共振解への周波数極限を計算します。

$\beta=0$、$\Omega\ne\omega_0$ なら $\Delta=(\omega_0^2-\Omega^2)^2>0$ なので、[無減衰の場合まで含む周期特解の可解条件](#thm-cdyn5-forced-response)の係数を代入して

$$
q_{\mathrm p}(t)=\frac{F_0}{\omega_0^2-\Omega^2}\cos(\Omega t)
$$

を得ます。ただし自由振動 $\cos(\omega_0t),\sin(\omega_0t)$ が消えないため、一般解はこの特解に近づくとは限りません。さらに $\omega_0/\Omega$ が整数なら自由振動自体も外力周期 $T=2\pi/\Omega$ を周期として持つため、$T$ 周期解の一意性も成立しません。

そして $\Omega=\omega_0$ にすると、この形の特解は存在しません。これは「解が存在しない」のではなく、**同じ周波数だけの正弦・余弦では特解が表せない**ということです。

さらに、厳密共振では外力と同じ周期 $T=2\pi/\omega_0$ を持つ解も存在しません。仮に $T$ 周期解 $q$ があったとして、方程式を $\cos(\omega_0t)$ 倍して $[0,T]$ で積分します。$q,q'$ はともに $T$ 周期で、$\sin(\omega_0t)$ も両端で0なので、部分積分を二度使うと

$$
\begin{aligned}
\int_0^Tq''(t)\cos(\omega_0t)\,dt
&=[q'(t)\cos(\omega_0t)]_0^T
+\omega_0\int_0^Tq'(t)\sin(\omega_0t)\,dt\\
&=\omega_0[q(t)\sin(\omega_0t)]_0^T
-\omega_0^2\int_0^Tq(t)\cos(\omega_0t)\,dt\\
&=-\omega_0^2\int_0^Tq(t)\cos(\omega_0t)\,dt.
\end{aligned}
$$

従って運動方程式の左辺を積分した値は0です。しかし右辺は

$$
F_0\int_0^T\cos^2(\omega_0t)\,dt=\frac{F_0T}{2}>0
$$

ですから矛盾します。**周期解は存在しないが、初期値問題の解は存在する**ことを区別してください。その初期値解が時間とともに大きくなる様子を次に計算します。

<a id="thm-cdyn5-undamped-resonance"></a>

<!-- formal-statement-start -->
### 定理（無減衰共振の線形増大と周波数極限）

$\omega_0>0$、$F_0>0$ とする。無減衰方程式

$$
q''+\omega_0^2q=F_0\cos(\Omega t),\qquad q(0)=q'(0)=0
$$

の解は、$\Omega>0,\ \Omega\ne\omega_0$ では

$$
q_\Omega(t)=\frac{F_0}{\omega_0^2-\Omega^2}
\bigl(\cos(\Omega t)-\cos(\omega_0t)\bigr)
$$

であり、$\Omega=\omega_0$ では

$$
q_{\mathrm{res}}(t)=\frac{F_0}{2\omega_0}t\sin(\omega_0t).
$$

各固定 $t\in\mathbb R$ について $\lim_{\Omega\to\omega_0}q_\Omega(t)=q_{\mathrm{res}}(t)$ が成立し、$q_{\mathrm{res}}$ の振幅包絡は時間に比例して増える。
<!-- formal-statement-end -->

**証明の見取り図**　共振しないときは外力と自由振動を引いて初期値を合わせます。共振時には $t\sin(\omega_0t)$ を代入すると $\cos(\omega_0t)$ が生まれます。前者の周波数を固有角振動数へ近づけても同じ式が出ます。

<!-- proof-start -->
### 証明

$\Omega\ne\omega_0$ では前節の特解の係数を $A=F_0/(\omega_0^2-\Omega^2)$ と置きます。自由振動 $C\cos(\omega_0t)+S\sin(\omega_0t)$ を加えると

$$
q(0)=A+C=0,\qquad
q'(0)=\omega_0S=0.
$$

$\omega_0>0$ より $C=-A$、$S=0$。これが表示の $q_\Omega$ です。

共振時は $q(t)=K t\sin(\omega_0t)$ を試します。積の微分を二度使えば

$$
\begin{aligned}
q'(t)&=K\sin(\omega_0t)+K\omega_0t\cos(\omega_0t),\\
q''(t)&=2K\omega_0\cos(\omega_0t)-K\omega_0^2t\sin(\omega_0t),\\
q''+\omega_0^2q&=2K\omega_0\cos(\omega_0t).
\end{aligned}
$$

従って $K=F_0/(2\omega_0)$ と選べば元の方程式を満たします。この解は $q(0)=0$、$q'(0)=0$ も満たすので、[ODE3の初期値解の一意性](../../ODE/ODE3/index.md#thm-ode3-homogeneous-ivp)から求める解です。

最後に各固定 $t$ で、分子と分母は $\Omega=\omega_0$ でともに0です。$\Omega$ に関してそれぞれ微分すると

$$
\frac{d}{d\Omega}\bigl(\cos(\Omega t)-\cos(\omega_0t)\bigr)
=-t\sin(\Omega t),\qquad
\frac{d}{d\Omega}(\omega_0^2-\Omega^2)=-2\Omega.
$$

分母の微分は $\omega_0>0$ で非零なので一変数の極限計算から

$$
\lim_{\Omega\to\omega_0}q_\Omega(t)
=F_0\frac{-t\sin(\omega_0t)}{-2\omega_0}
=\frac{F_0}{2\omega_0}t\sin(\omega_0t).
$$

時刻 $t_n=(\pi/2+2\pi n)/\omega_0$ を取れば $\sin(\omega_0t_n)=1$ で

$$
|q_{\mathrm{res}}(t_n)|=\frac{F_0}{2\omega_0}t_n\longrightarrow\infty.
$$

従って振動は有界ではありません。$\square$
<!-- proof-end -->

ここで二つの極限を区別します。$\beta>0$ を固定すれば定常振幅は $\Omega=\omega_0$ でも有限で、$R(\omega_0)=F_0/(2\beta\omega_0)$ です。一方、$\beta\downarrow0$ の定常振幅は発散します。これは「ある初期値から出発した解を有限時刻で観測する」操作と、「無限時間後の定常振幅を測る」操作が、$\beta=0$ で同じ意味を持たなくなるためです。無減衰・共振の実際の初期値解は上のように時間とともに増大します。

## 6. エネルギーで外力と減衰を読み分ける

[MECH3の非保存力を含むエネルギー収支](../../../物理系/MECH/MECH3/index.md#prop-mech3-energy-balance)を今回の線形振動子へ代入すると、外力と摩擦を切り分けられます。自由振動ではエネルギーを保存しましたが、外力と摩擦が加わると、エネルギーの時間微分には増加項と減少項が現れます。$q'=v$ を使い、

$$
E(t)=\frac12v(t)^2+\frac12\omega_0^2q(t)^2
$$

とします。これは運動エネルギーとばねのポテンシャルの和です。

<a id="prop-cdyn5-energy-balance"></a>

<!-- formal-statement-start -->
### 命題（強制減衰振動のエネルギー収支）

$\omega_0>0$、$\beta\ge0$、$\Omega>0$、$F_0>0$ の強制振動方程式の任意の解について

$$
E'(t)=F_0q'(t)\cos(\Omega t)-2\beta q'(t)^2.
$$

さらに $\beta>0$ の定常周期応答 $q_{\mathrm p}=R\cos(\Omega t-\delta)$ では、一周期 $T=2\pi/\Omega$ で平均した外力仕事率と散逸率が一致し、その共通値は

$$
\frac1T\int_0^T F_0q_{\mathrm p}'(t)\cos(\Omega t)\,dt
=\frac1T\int_0^T2\beta q_{\mathrm p}'(t)^2\,dt
=\beta\Omega^2R^2
$$

である。
<!-- formal-statement-end -->

**証明の見取り図**　運動方程式を速度で掛けると時間微分の形になります。定常応答の一周期ではエネルギーが元の値に戻るので、外力から受け取る平均仕事は摩擦で失う平均仕事と等しくなります。

<!-- proof-start -->
### 証明

積と合成関数の微分により

$$
E'=q'q''+\omega_0^2qq'
=q'(q''+\omega_0^2q).
$$

元の方程式を $q''+\omega_0^2q=F_0\cos(\Omega t)-2\beta q'$ と移項して代入すれば、第一式を得ます。

次に定常解を $q_{\mathrm p}=a\cos(\Omega t)+b\sin(\Omega t)$ と置きます。その速度は

$$
q_{\mathrm p}'=\Omega(-a\sin(\Omega t)+b\cos(\Omega t)).
$$

周期積分では $\sin^2$ と $\cos^2$ の平均がそれぞれ $1/2$、$\sin\cos$ の平均が0なので、

$$
\begin{aligned}
\frac1T\int_0^Tq_{\mathrm p}'(t)^2\,dt
&=\frac{\Omega^2}{2}(a^2+b^2)
=\frac{\Omega^2R^2}{2},\\
\frac1T\int_0^TF_0q_{\mathrm p}'(t)\cos(\Omega t)\,dt
&=\frac{F_0\Omega b}{2}.
\end{aligned}
$$

[無減衰の場合まで含む周期特解の可解条件](#thm-cdyn5-forced-response)から $b=F_0G/\Delta$ と $G=2\beta\Omega$。従って外力平均は

$$
\frac{F_0\Omega b}{2}
=\frac{F_0^2\Omega(2\beta\Omega)}{2\Delta}
=\beta\Omega^2\frac{F_0^2}{\Delta}
=\beta\Omega^2R^2.
$$

散逸平均も $2\beta\cdot\Omega^2R^2/2=\beta\Omega^2R^2$ なので一致します。これは周期性から $\int_0^TE'=E(T)-E(0)=0$ とする計算とも整合します。$\square$
<!-- proof-end -->

外力の仕事率 $F_0q'\cos(\Omega t)$ は正にも負にもなります。従って $\beta>0$ だからといって、**強制振動のエネルギーが各瞬間に必ず減少するわけではありません**。減衰が散逸する仕事と、外力が注ぐ仕事とを区別することが重要です。

## 7. 演習と詳細解答

Level Aでは特解と位相、初期条件、エネルギーの符号を計算します。Level Bではピーク、三つの減衰形、極限、平均仕事率を再構成し、Level Cでは一つの強制振動子の時間波形・周波数応答・エネルギー・無減衰極限を接続します。

### A1. 減衰なしの非共振特解

$\omega_0=3,\ \beta=0,\ \Omega=2,\ F_0=5$ の強制振動方程式について、外力周波数の特解と $q(0)=q'(0)=0$ の解を求めよ。

- Level: A
- ID: CDYN5-A1

<!-- solution-start -->
**詳細解答**　係数は $D=9-4=5$、$G=0$、$\Delta=25$。従って $a=F_0D/\Delta=1$、$b=0$ から $q_{\mathrm p}=\cos2t$ です。

自由振動は $C\cos3t+S\sin3t$。初期値 $q(0)=1+C=0$ より $C=-1$、$q'(0)=3S=0$ より $S=0$。従って $q(t)=\cos2t-\cos3t$ です。
<!-- solution-end -->

### A2. 位相の四分の一周期

$\omega_0=\Omega=2,\ \beta=1/2,\ F_0=4$ の定常周期応答を $R\cos(2t-\delta)$ で表せ。元の方程式へ代入して確かめよ。

- Level: A
- ID: CDYN5-A2

<!-- solution-start -->
**詳細解答**　$D=4-4=0$、$G=2(1/2)2=2$、$\Delta=4$。従って $a=0$、$b=F_0G/\Delta=2$。

$R=\sqrt{0^2+2^2}=2$、$\cos\delta=0$、$\sin\delta=1$ から $\delta=\pi/2$。答えは $q_{\mathrm p}=2\sin2t=2\cos(2t-\pi/2)$。

微分は $q_{\mathrm p}'=4\cos2t$、$q_{\mathrm p}''=-8\sin2t$。左辺は $-8\sin2t+1\cdot4\cos2t+4\cdot2\sin2t=4\cos2t$ で、右辺に一致します。
<!-- solution-end -->

### A3. 臨界減衰は指数関数だけではない

$h''+4h'+4h=0$、$h(0)=1$、$h'(0)=0$ を解き、$h(t)\to0$ を確かめよ。

- Level: A
- ID: CDYN5-A3

<!-- solution-start -->
**詳細解答**　特性多項式は $\lambda^2+4\lambda+4=(\lambda+2)^2$ なので重根 $-2$ です。

[ODE3のJordan型の解](../../ODE/ODE3/index.md#thm-ode3-jordan-exponential)に対応する一般解は $h=e^{-2t}(C+St)$。$h(0)=C=1$。微分すると $h'=e^{-2t}\{S-2(C+St)\}$ ですから、$h'(0)=S-2C=0$ より $S=2$。

従って $h(t)=e^{-2t}(1+2t)$ です。$e^{-2t}\to0$ かつ $te^{-2t}\to0$ なので、和も0へ収束します。
<!-- solution-end -->

### A4. 減衰があってもエネルギーが増える瞬間

$\omega_0=1,\ \beta=1,\ \Omega=2,\ F_0=3$ とし、$q(0)=0,\ q'(0)=1$ とする。$E=(q'^2+q^2)/2$ の $E'(0)$ を求め、符号を解釈せよ。

- Level: A
- ID: CDYN5-A4

<!-- solution-start -->
**詳細解答**　[エネルギー収支](#prop-cdyn5-energy-balance)の式に $q'(0)=1$、$\cos0=1$ を代入して

$$
E'(0)=F_0q'(0)\cos0-2\beta q'(0)^2=3-2=1>0.
$$

この瞬間の外力の仕事率3が摩擦による散逸率2を上回るので、エネルギーは増えます。「減衰係数が正なら全エネルギーは単調減少」は外力なしの結論であって、今回には当てはまりません。
<!-- solution-end -->

### A5. 正弦の符号から位相を判定する

$\omega_0=2,\ \beta=0,\ \Omega=3,\ F_0=5$ の外力周波数の特解を $R\cos(3t-\delta)$ として表し、$\delta$ の範囲 $[0,\pi]$ に注意せよ。

- Level: A
- ID: CDYN5-A5

<!-- solution-start -->
**詳細解答**　$D=4-9=-5$、$G=0$、$\Delta=25$。$a=5(-5)/25=-1$、$b=0$、$R=1$。

$\cos\delta=a/R=-1$、$\sin\delta=b/R=0$ なので $\delta=\pi$。よって $q_{\mathrm p}=-\cos3t=\cos(3t-\pi)$ です。$\tan\delta=0$ だけを見て $\delta=0$ とすると、符号を誤ります。
<!-- solution-end -->

### B1. 振幅最大の周波数

$\omega_0=3,\ \beta=1,\ F_0=8$ に対し、$R(\Omega)$ が $\Omega>0$ で最大になる周波数と最大振幅を求め、$\Omega=\omega_0$ の振幅と比較せよ。

- Level: B
- ID: CDYN5-B1

<!-- solution-start -->
**詳細解答**　$\omega_0^2-2\beta^2=9-2=7>0$ なので、[減衰振動子の振幅ピーク](#prop-cdyn5-resonance-peak)を適用できます。

$$
\Omega_{\mathrm r}=\sqrt7,\qquad
\Delta(\sqrt7)=(9-7)^2+4(1)^2(7)=4+28=32.
$$

従って $R(\sqrt7)=8/\sqrt{32}=\sqrt2$。一方 $\Omega=3$ では $D=0$、$G=2\cdot1\cdot3=6$ なので $R(3)=8/6=4/3$。

$\sqrt2>4/3$ は両辺が正であり、平方すると $2>16/9$ だから確認できます。最大点は $\sqrt7<3$ で、固有角振動数より低い周波数です。
<!-- solution-end -->

### B2. 過渡項まで含む初期値解

$\omega_0=2,\ \beta=1,\ \Omega=2,\ F_0=3$ で $q(0)=q'(0)=0$ とする。解を求めて初期値と長時間挙動を検算せよ。

- Level: B
- ID: CDYN5-B2

<!-- solution-start -->
**詳細解答**　$D=0$、$G=4$、$\Delta=16$、$a=0$、$b=3/4$ より $q_{\mathrm p}=(3/4)\sin2t$ です。$\beta<\omega_0$ なので $\nu=\sqrt{\omega_0^2-\beta^2}=\sqrt3$。

差 $h=q-q_{\mathrm p}$ の初期値は $h_0=q(0)-a=0$、$w_0=q'(0)-\Omega b=0-3/2=-3/2$。$h=e^{-t}(C\cos\sqrt3t+S\sin\sqrt3t)$ と置くと、$C=h_0=0$、$S=(w_0+\beta h_0)/\nu=-3/(2\sqrt3)=-\sqrt3/2$。

従って

$$
q(t)=\frac34\sin2t-\frac{\sqrt3}{2}e^{-t}\sin(\sqrt3t).
$$

$t=0$ では両正弦が0。微分すると $q'(0)=(3/4)2-(\sqrt3/2)\sqrt3=3/2-3/2=0$ です。$e^{-t}\sin\sqrt3t\to0$ より、差 $q-q_{\mathrm p}$ が0へ収束します。
<!-- solution-end -->

### B3. 非共振の初期値解から共振へ

$\beta=0,\ \omega_0=2,\ F_0=6$、初期値 $q(0)=q'(0)=0$ とする。$\Omega\ne2$ の解を求め、各固定 $t$ で $\Omega\to2$ の極限を求めよ。

- Level: B
- ID: CDYN5-B3

<!-- solution-start -->
**詳細解答**　$\Omega\ne2$ の余弦特解は $6\cos(\Omega t)/(4-\Omega^2)$ です。自由振動に初期値を合わせると

$$
q_\Omega(t)=\frac6{4-\Omega^2}\bigl(\cos(\Omega t)-\cos2t\bigr).
$$

$\Omega\to2$ では分子も分母も0です。$\Omega$ で微分した比を使い、分子の微分は $-t\sin(\Omega t)$、分母の微分は $-2\Omega$ と計算すると

$$
\lim_{\Omega\to2}q_\Omega(t)=6\frac{-t\sin2t}{-4}
=\frac32t\sin2t.
$$

直接検算すると $q''+4q=2(3/2)2\cos2t=6\cos2t$ であり、初期位置と速度も0です。時間係数 $t$ があるため、有界な定常振幅は定義できません。
<!-- solution-end -->

### B4. 過減衰の二つの根

$h''+4h'+h=0$、$h(0)=1,\ h'(0)=0$ を解き、減衰があっても振動型の正弦が現れない理由を説明せよ。

- Level: B
- ID: CDYN5-B4

<!-- solution-start -->
**詳細解答**　$\omega_0=1$、$\beta=2>\omega_0$ に当たります。特性根は

$$
\lambda_\pm=-2\pm\sqrt{4-1}=-2\pm\sqrt3.
$$

$h(t)=Ce^{\lambda_+t}+Se^{\lambda_-t}$ と置くと $C+S=1$、$\lambda_+C+\lambda_-S=0$。$S=1-C$ を第二式に入れ、

$$
(\lambda_+-\lambda_-)C=-\lambda_-,
\qquad
2\sqrt3\,C=2+\sqrt3.
$$

従って

$$
C=\frac{2+\sqrt3}{2\sqrt3},\qquad
S=1-C=\frac{\sqrt3-2}{2\sqrt3}.
$$

両根は負の実数なので解は二つの減衰指数関数の和であり、複素根に由来する正弦・余弦は現れません。両項とも $t\to\infty$ で0へ収束します。
<!-- solution-end -->

### B5. 一周期の外力仕事と散逸

$\omega_0=\Omega=2,\ \beta=1,\ F_0=3$ の定常周期応答について、一周期の平均外力仕事率と平均散逸率を別々に計算して一致を確認せよ。

- Level: B
- ID: CDYN5-B5

<!-- solution-start -->
**詳細解答**　定常解は $q_{\mathrm p}=(3/4)\sin2t$ なので速度は $q_{\mathrm p}'=(3/2)\cos2t$、周期は $T=\pi$ です。

外力の仕事率は $F_0q_{\mathrm p}'\cos2t=3(3/2)\cos^22t=(9/2)\cos^22t$。一周期平均で $\cos^22t$ は $1/2$ なので平均仕事率は $9/4$。

散逸率は $2\beta(q_{\mathrm p}')^2=2(9/4)\cos^22t=(9/2)\cos^22t$。同じく平均は $9/4$ です。

別の検算として $R=3/4$ を使うと $\beta\Omega^2R^2=1\cdot4\cdot9/16=9/4$ となり一致します。
<!-- solution-end -->

### C1. 時間波形・振幅ピーク・エネルギー・共振極限の総合

$\omega_0=3,\ \beta=1,\ F_0=8$ として、$q''+2q'+9q=8\cos(\Omega t)$ を考える。

1. $\Omega=3$ の定常周期応答 $q_{\mathrm p}$ を求め、位相遅れ $\delta$ を決めよ。
2. $\Omega=3$ で $q(0)=q'(0)=0$ の全解 $q(t)$ を求め、初期値と過渡項の極限を確認せよ。
3. 外力周波数 $\Omega>0$ を動かしたときの振幅最大点と最大振幅を求め、$\Omega=3$ の振幅と比較せよ。
4. $\Omega=3$ の定常解について、一周期平均の外力仕事率と散逸率を計算せよ。
5. 減衰だけを $\beta=0$ に変更し、同じ $\Omega=3$、同じ初期値0で解がどのように変わるか示せ。

- Level: C
- ID: CDYN5-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$\Omega=3$ では $D=9-9=0$、$G=2\cdot1\cdot3=6$、$\Delta=36$ です。$a=0$、$b=F_0G/\Delta=8\cdot6/36=4/3$。従って

$$
q_{\mathrm p}(t)=\frac43\sin3t
=\frac43\cos(3t-\pi/2),
\qquad R(3)=\frac43,\quad\delta=\frac\pi2.
$$

**(2)**　斉次方程式の根は $-1\pm\sqrt{1-9}=-1\pm2\sqrt2\,i$。よって差は

$$
h(t)=e^{-t}(C\cos(2\sqrt2t)+S\sin(2\sqrt2t)).
$$

初期位置から $C=q(0)-q_{\mathrm p}(0)=0$。定常解の初期速度は $q_{\mathrm p}'(0)=4$ なので $h'(0)=0-4=-4$。$h'(0)=-C+2\sqrt2\,S$ より $S=-4/(2\sqrt2)=-\sqrt2$。答えは

$$
q(t)=\frac43\sin3t-\sqrt2e^{-t}\sin(2\sqrt2t).
$$

$t=0$ では $q(0)=0$。微分した初期速度は $q'(0)=4-\sqrt2(2\sqrt2)=0$。また $\left|\sqrt2e^{-t}\sin(2\sqrt2t)\right|\le\sqrt2e^{-t}\to0$ なので定常波形へ近づきます。

**(3)**　$\omega_0^2-2\beta^2=9-2=7>0$ だから、[減衰振動子の振幅ピーク](#prop-cdyn5-resonance-peak)により $\Omega_{\mathrm r}=\sqrt7$。その周波数の分母は

$$
\Delta(\sqrt7)=(9-7)^2+4\cdot1^2\cdot7=32
$$

なので $R(\sqrt7)=8/\sqrt{32}=\sqrt2$ です。$R(3)=4/3$ と比べ、$2>16/9$ から $\sqrt2>4/3$。従って振幅最大点は $\Omega=3$ ではありません。

**(4)**　$T=2\pi/3$、$q_{\mathrm p}'(t)=4\cos3t$ なので、外力仕事率は $8\cos3t\cdot4\cos3t=32\cos^23t$、散逸率は $2\beta q_{\mathrm p}'{}^2=2\cdot16\cos^23t=32\cos^23t$。それぞれ一周期平均すると $\overline{\cos^23t}=1/2$ により16です。[エネルギー収支](#prop-cdyn5-energy-balance)の $\beta\Omega^2R^2=1\cdot9\cdot16/9=16$ と一致します。

**(5)**　$\beta=0$ なら $\omega_0=\Omega=3$ の無減衰共振です。[無減衰共振の定理](#thm-cdyn5-undamped-resonance)に $F_0=8,\ \omega_0=3$ を代入すると、同じゼロ初期値に対する解は

$$
q(t)=\frac8{2\cdot3}t\sin3t=\frac43t\sin3t.
$$

減衰ありの(2)では過渡項が消え振幅 $4/3$ の波形が残ったのに対し、無減衰では $t$ に比例する包絡が増大して有界ではありません。
<!-- solution-end -->

外力を加えた振動子では、自由振動の消失、周波数に依存する振幅と位相、外力の供給と減衰の散逸、そして無減衰共振の長時間増大が一つの方程式から現れます。次章では復元力自体を非線形にし、井戸型ポテンシャルと分離軌道を調べます。
