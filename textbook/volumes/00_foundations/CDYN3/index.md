# CDYN3 周期軌道を位相で記述する

[CDYN2の閉軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)によって、状態が閉曲線を有限時間で一周することを証明しました。周期積分で「一周にかかる時間」は計算できましたが、一周のどの段階にいるかを比較するには、位置と速度の二成分を毎回持ち運ぶのは不便です。二つの振動子を比較するときにも、位置だけが一致していて速度の向きが違えば、同じ段階とはいえません。

そこで一周を $2\pi$ として数える座標を作ります。ただし、平面の原点から測った**幾何学的な角度**と、運動が進む時間に比例する**位相**を区別しなければなりません。エネルギー曲線が円でない場合はもちろん、軌道が幾何学的には円そのものであっても、進む速さが一様とは限りません。

## 1. 周期運動を円周上の時計で数える

まず、自律方程式 $x'=F(x)$ の解 $\gamma:\mathbb R\to\mathbb R^n$ が非定常で、最小正周期 $T>0$ を持つとします。右辺 $F$ は $\gamma$ の近傍で局所Lipschitz連続であり、解の一意性を仮定します。$\gamma(t+T)=\gamma(t)$ ですから、一周期の時刻 $0$ と $T$ は同じ状態を表します。

**最初の例**は調和振動子 $q''=-4q$、$q(0)=1$、$q'(0)=0$ です。解は $(q,v)=(\cos2t,-2\sin2t)$、最小正周期は $T=\pi$。時刻 $t=0,\pi/4,\pi/2$ の状態はそれぞれ $(1,0),(0,-2),(-1,0)$ です。この順番を保ちながら、時計の針を角度 $0,\pi/2,\pi$ として表示したいのです。

<a id="def-cdyn3-orbit-phase"></a>

<!-- formal-statement-start -->
### 定義（周期軌道上の時間位相）

局所Lipschitzな自律系 $x'=F(x)$ の非定常周期解 $\gamma:\mathbb R\to\mathbb R^n$ の最小正周期を $T>0$ とする。$\Gamma=\{\gamma(t):t\in\mathbb R\}$ とし、基準状態 $p_*=\gamma(0)$ を選ぶ。$\mathbb S^1=\mathbb R/(2\pi\mathbb Z)$ とおき、

$$
\omega=\frac{2\pi}{T},\qquad
\Theta(\gamma(t))=[\omega t]_{2\pi}\in\mathbb S^1
$$

で定める $\Theta:\Gamma\to\mathbb S^1$ を、この基準状態に関する **時間位相** とする。$\omega$ を角振動数と呼ぶ。$[u]_{2\pi}$ は $2\pi$ の整数倍の差を同一視した類である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn3-orbit-phase -->

**定義の確認**　上の調和振動子では $T=\pi$ なので $\omega=2$、$\Theta(q(t),v(t))=[2t]_{2\pi}$ です。$t=0$ と $t=\pi$ は同じ状態 $(1,0)$ ですが、それぞれの表示 $0,2\pi$ は $\mathbb S^1$ で同じ類です。$t=\pi/4$ では位相は $\pi/2$。時計の一周が実時間 $\pi$ に相当します。
<!-- definition-example-end -->

式は簡単ですが、同じ状態が別々の時刻に現れたとき、別の位相を割り当ててしまわないかを確認する必要があります。これが「軌道を円周座標にする」際の第一の証明責務です。

<a id="thm-cdyn3-well-defined"></a>

<!-- formal-statement-start -->
### 定理（時間位相の整合性と等速進行）

$F$ が周期解 $\gamma$ の近傍で局所Lipschitz連続、$\gamma$ が非定常で最小正周期 $T>0$ を持つとする。このとき定義した $\Theta$ は $\Gamma$ 上で一意に定まり、連続な全単射 $\Gamma\to\mathbb S^1$ である。さらに任意の $t,s\in\mathbb R$ に対し

$$
\Theta(\gamma(t+s))
=\Theta(\gamma(t))+[\omega s]_{2\pi}
$$

が成り立つ。周期軌道上に平衡状態はなく、異なる時刻 $t_1,t_2$ に同じ状態が現れる条件は $t_1-t_2\in T\mathbb Z$ である。
<!-- formal-statement-end -->

**見取り図**　もし周期より短い時間差で状態が一致すれば、一意性を使ってその時間差そのものが周期になるはずです。これが最小周期に反します。また $[0,T]$ の両端を同一視した区間から円周への写像は、連続な一対一対応になります。

<!-- proof-start -->
### 証明

まず、$\gamma(t_1)=\gamma(t_2)$ とします。$d=t_2-t_1$ とおくと、二つの関数 $u(t)=\gamma(t+t_1)$、$w(t)=\gamma(t+t_2)$ はともに同じ自律ODEを解き、$u(0)=w(0)$ です。解の一意性から全時刻で $u(t)=w(t)$ となり、

$$
\gamma(t+d)=\gamma(t)\qquad(t\in\mathbb R)
$$

が成り立ちます。$d\ne0$ なら $|d|$ は正周期です。$|d|=kT+r$、$k\ge0$、$0\le r<T$ と整数部分で分けます。$d$ と $T$ が周期なので、$r$ も周期になります。もし $r>0$ なら最小正周期 $T$ に反するので $r=0$。従って $d\in T\mathbb Z$ です。逆に $d\in T\mathbb Z$ なら、$T$ の周期性から同じ状態です。

ここから $\omega d=(2\pi/T)d\in2\pi\mathbb Z$ なので、$\Theta$ の値は時刻表示の選び方によらず同一です。また $t\mapsto[\omega t]_{2\pi}$ は円周上の全ての類を取ります。上の同値条件により $\Gamma$ 上で異なる状態には異なる類が対応するため、全単射です。

連続性も確認します。写像 $h:\mathbb S^1\to\Gamma$ を $h([u]_{2\pi})=\gamma(u/\omega)$ と置きます。$\gamma$ は $T$ 周期なので $u$ の代表元によらず定まり、連続です。$\mathbb S^1$ はコンパクト、$\Gamma\subset\mathbb R^n$ はHausdorff空間なので、連続全単射 $h$ の逆写像 $\Theta$ は連続です。

もし $\gamma(t_0)$ が平衡状態なら、定数解 $x(t)=\gamma(t_0)$ と $\gamma(t+t_0)$ が同じ初期値を持ち、一意性から一致してしまいます。これは非定常性に反します。最後に

$$
\Theta(\gamma(t+s))
=[\omega(t+s)]_{2\pi}
=[\omega t]_{2\pi}+[\omega s]_{2\pi}
$$

であり、等速進行が従います。$\square$
<!-- proof-end -->

時間位相は「平面座標の偏角」ではなく、**その状態へ基準点から何秒で来るか**を一周で割った座標です。最小周期を使うのは、複数周した時刻を区別するためではなく、同じ状態に同じ位相を割り当てるためです。

## 2. 位相原点と位相差は何を意味するか

同じ周期軌道でも、どの点を $0$ と数えるかは自由です。新しい基準状態を $\gamma(s_0)$ に選んだときの時間位相は、旧位相から定数 $\omega s_0$ を引いたものです。だから「この振動子の絶対位相は何度か」は、基準点の指定なしには定まりません。

一方、**同じ軌道上を同じ向きに進む二つの解**は、ある実数 $s_1,s_2$ を用いて $x_j(t)=\gamma(t+s_j)$ と書けます。両者に同じ位相原点を用いれば、位相差は一定です。

<a id="def-cdyn3-phase-difference"></a>

<!-- formal-statement-start -->
### 定義（同一周期軌道上の位相差）

最小正周期 $T$ の非定常周期解 $\gamma$ と、同じ軌道上の二つの解 $x_j(t)=\gamma(t+s_j)$（$j=1,2$）に対し、共通の時間位相 $\Theta$ を用いて

$$
\Delta=\Theta(x_2(t))-\Theta(x_1(t))
\in\mathbb S^1
$$

を **位相差** とする。ここでは二つの解を同じ周期軌道 $\Gamma$ に制限している。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn3-phase-difference -->

**定義の確認**　$x_1(t)=(\cos2t,-2\sin2t)$、$x_2(t)=(\cos(2t+\pi/3),-2\sin(2t+\pi/3))$ とすると、$x_2(t)=\gamma(t+\pi/6)$。従って共通の原点で測った位相はそれぞれ $[2t]_{2\pi}$、$[2t+\pi/3]_{2\pi}$ で、差は常に $[\pi/3]_{2\pi}$ です。
<!-- definition-example-end -->

<a id="prop-cdyn3-origin-invariance"></a>

<!-- formal-statement-start -->
### 命題（位相差の時間不変性と原点不変性）

上の定義の仮定のもとで、任意の $t\in\mathbb R$ に対し

$$
\Delta=[\omega(s_2-s_1)]_{2\pi}
$$

が成り立つ。共通の位相原点を $\gamma(0)$ から $\gamma(a)$ へ変更しても、$\Delta$ は変わらない。
<!-- formal-statement-end -->

**見取り図**　双方の時計は同じ速さ $\omega$ で進みます。原点を動かす操作も双方の時計から同じ定数を引くので、その差は残ります。

<!-- proof-start -->
### 証明

定理の等速進行を各解に適用すれば

$$
\Theta(x_2(t))=[\omega t+\omega s_2]_{2\pi},\qquad
\Theta(x_1(t))=[\omega t+\omega s_1]_{2\pi}.
$$

円周群 $\mathbb S^1$ の差を取ると $\omega t$ が消え、結論を得ます。新原点 $p_*'=\gamma(a)$ では、状態 $\gamma(u)$ に割り当てる新位相は $[\omega(u-a)]_{2\pi}$ です。両解の新位相差は

$$
[\omega(t+s_2-a)]_{2\pi}
-[\omega(t+s_1-a)]_{2\pi}
=[\omega(s_2-s_1)]_{2\pi}
$$

となります。$\square$
<!-- proof-end -->

ここで得た位相差は、**同じ周期軌道上**という条件に依存しています。違う周期の軌道の時計や、周期軌道から離れた点に同じ式を無条件に延長できません。軌道の周囲まで位相を拡張する問題は、後で学ぶ位相応答と等時相面に関わります。

## 3. 円周を動いても、幾何学的偏角は等速とは限らない

次は平面内の**単位円**を状態として持つ模型です。幾何学的偏角を実数 $\alpha$ で持ち上げ、$x=(\cos\alpha,\sin\alpha)$ と置きます。速度を

$$
\alpha'=f(\alpha)
$$

で与えます。$f:\mathbb R\to(0,\infty)$ は $C^1$ で $2\pi$ 周期と仮定します。すると平面の接線速度は

$$
x'=\alpha'(-\sin\alpha,\cos\alpha)
=f(\alpha)(-x_2,x_1).
$$

速度は接線方向ですが、その大きさは位置によって変わります。$f$ が定数でなければ幾何学的偏角 $\alpha$ 自体は一定速度では進みません。

例えば $f(\alpha)=1+\frac12\cos\alpha$ では、$\alpha=0$ の角速度は $3/2$、$\alpha=\pi$ の角速度は $1/2$ です。これを等速の位相へ直すには、角度ではなく経過時間を積分します。

<a id="thm-cdyn3-circle-reparam"></a>

<!-- formal-statement-start -->
### 定理（正の非一様角速度から時間位相を構成する）

$f\in C^1(\mathbb R)$ が $2\pi$ 周期で、全ての $\alpha\in\mathbb R$ について $f(\alpha)>0$ を満たすとする。円周の方程式 $\alpha'=f(\alpha)$ は一周する非定常運動を定め、その最小正周期 $T$ と角振動数 $\omega$ は

$$
T=\int_0^{2\pi}\frac{du}{f(u)},\qquad
\omega=\frac{2\pi}{T}
$$

である。基準偏角を $\alpha=0$ とした時間位相は

$$
\Theta(\alpha)=
\left[\omega\int_0^\alpha\frac{du}{f(u)}\right]_{2\pi}
$$

で定義でき、任意の解に沿って $\Theta(\alpha(t))=[\Theta_0+\omega t]_{2\pi}$ が成立する。実数への局所的な持ち上げの導関数は

$$
\frac{d\Theta}{d\alpha}=\frac{\omega}{f(\alpha)}>0.
$$
<!-- formal-statement-end -->

**見取り図**　角度の小区間 $du$ を進む所要時間は $du/f(u)$ です。全周の所要時間で割って $2\pi$ 倍すると、速い場所で細かく、遅い場所で大きく時間を数える時計になります。積分の周期性と連鎖律の両方を検査します。

<!-- proof-start -->
### 証明

$f$ は連続で $2\pi$ 周期なので、コンパクト区間 $[0,2\pi]$ 上で $0<m\le f\le M$ となる定数 $m,M$ があります。この評価は全実数へ周期的に延長できます。よって右辺は大域的に有界で、局所Lipschitz連続です。局所解は一意で、有限時刻区間で $|\alpha(t)-\alpha(0)|\le M|t|$ となるので、有限時刻で無限大へ逃げず、全時刻の解が存在します。

$G(a)=\int_0^a du/f(u)$ とおきます。$G'(a)=1/f(a)>0$ なので $G$ は狭義増加であり、解に沿って

$$
\frac{d}{dt}G(\alpha(t))
=G'(\alpha(t))\alpha'(t)
=\frac1{f(\alpha(t))}f(\alpha(t))=1.
$$

従って $G(\alpha(t))=t+G(\alpha(0))$。$f$ の周期性によって

$$
G(a+2\pi)-G(a)
=\int_a^{a+2\pi}\frac{du}{f(u)}
=\int_0^{2\pi}\frac{du}{f(u)}=T
$$

です。したがって偏角が $2\pi$ 増える時間は初期位置によらず $T$ で、単位円の状態は元へ戻ります。$f>0$ なので $\alpha$ は狭義増加し、$0<\alpha(t)-\alpha(0)<2\pi$ の間は $(\cos\alpha,\sin\alpha)$ が元の点と一致しません。ゆえに $T$ は最小正周期です。

$\Theta(a+2\pi)=\Theta(a)+[\omega T]_{2\pi}=\Theta(a)$ なので円周上でwell-definedです。最後に持ち上げ $\widetilde\Theta(a)=\omega G(a)$ を使うと

$$
\frac{d}{dt}\widetilde\Theta(\alpha(t))
=\underbrace{\frac{\omega}{f(\alpha(t))}}_{\widetilde\Theta'(\alpha(t))}
\underbrace{f(\alpha(t))}_{\alpha'(t)}
=\omega.
$$

時刻で積分し、$2\pi$ で剰余を取れば等速進行を得ます。$\square$
<!-- proof-end -->

**仮定の効き方**　例えば $f(\alpha)=1-\cos\alpha$ では $f(0)=0$ なので $\alpha=0$ に平衡状態があり、解の一意性からそこを有限時刻で通過できません。さらに $0<\alpha<1$ では $1-\cos\alpha\le\alpha^2/2$ ですから、$1/f(\alpha)\ge2/\alpha^2$ となり、$\int_0^1d\alpha/f(\alpha)$ は発散します。正の角速度を失うと、一周する時間そのものを有限に定義できなくなる例です。$f<0$ を許すなら向きの扱いも変わるので、上の定理は $f>0$ を仮定しました。

## 4. 本当に角度と時間位相がずれる数値模型

$f(\alpha)=1+\varepsilon\cos\alpha$（$|\varepsilon|<1$）を考えます。$\varepsilon=0$ では定速回転ですが、$\varepsilon\ne0$ なら速度の差があります。まず $T$ を計算します。積分区間を $[-\pi,\pi]$ とし、$u=\tan(\alpha/2)$ と置けば

$$
\cos\alpha=\frac{1-u^2}{1+u^2},\qquad
d\alpha=\frac{2\,du}{1+u^2}.
$$

$\alpha$ が $-\pi$ から $\pi$ へ進むと $u$ は $-\infty$ から $+\infty$ へ進むので

$$
T=\int_{-\pi}^{\pi}\frac{d\alpha}{1+\varepsilon\cos\alpha}
=2\int_{-\infty}^{\infty}
\frac{du}{(1+\varepsilon)+(1-\varepsilon)u^2}.
$$

ここで $a=1+\varepsilon>0,b=1-\varepsilon>0$、$z=u\sqrt{b/a}$ とすると、$du=\sqrt{a/b}\,dz$ より

$$
T=\frac{2}{\sqrt{ab}}\int_{-\infty}^{\infty}
\frac{dz}{1+z^2}
=\frac{2\pi}{\sqrt{1-\varepsilon^2}},\qquad
\omega=\sqrt{1-\varepsilon^2}.
$$

例えば $\varepsilon=1/2$ なら $T=4\pi/\sqrt3$、$\omega=\sqrt3/2$。基準点 $\alpha=0$ から幾何学的角度 $\pi/2$ まで進む時間も求めます。半角置換を $[0,\pi/2]$ へ使うと $u$ は $0$ から $1$ へ変化し、

$$
t_{0\to\pi/2}
=2\int_0^1\frac{du}{3/2+(1/2)u^2}
=\frac4{\sqrt3}\left[\arctan\frac{u}{\sqrt3}\right]_0^1
=\frac{2\pi}{3\sqrt3}.
$$

従ってこの点の**時間位相**は

$$
\Theta(\pi/2)=\omega t_{0\to\pi/2}
=\frac{\sqrt3}{2}\frac{2\pi}{3\sqrt3}
=\frac\pi3.
$$

幾何学的偏角は $\pi/2$ なのに、時間位相は $\pi/3$ です。全周の四分の一の角度へ達しても、時間の四分の一は経過していません。ここで測っている量は「平面の角度」ではなく「一周の時計」です。

## 5. 保存系のエネルギー曲線にも位相を付ける

[CDYN2の周期積分](../CDYN2/index.md#thm-cdyn2-closed-orbit)へ戻ります。$q'=v,\ v'=-U'(q)$ に二つの正則転回点 $a<b$ があり、エネルギー $E$ の一周が閉じるとします。右向きに $a$ から $b$ へ進む片道時間を

$$
\tau=\int_a^b\frac{ds}{\sqrt{2(E-U(s))}},
\qquad T=2\tau,\qquad \omega=\frac{\pi}{\tau}
$$

と置きます。$a$ から位置 $q$ までの所要時間は

$$
I(q)=\int_a^q\frac{ds}{\sqrt{2(E-U(s))}}
\quad(a\le q\le b)
$$

です。正則転回点の端点評価によって $I(a)=0,I(b)=\tau$ は有限で、$I$ は閉区間上で連続です。

<a id="prop-cdyn3-energy-phase"></a>

<!-- formal-statement-start -->
### 命題（二つの転回点を持つ閉軌道の時間位相）

$J\subset\mathbb R$ を開区間、$U\in C^2(J)$ とし、$a,b\in J$、$a<b$、$E\in\mathbb R$ が [CDYN2の閉軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit) の条件を満たすとする。$H(q,v)=v^2/2+U(q)=E$ の閉軌道 $\Gamma_E$ 上で、$\tau,I,\omega$ を上記で定め、

$$
\Theta(q,v)=
\begin{cases}
[\omega I(q)]_{2\pi},&v>0,\\
[\omega(2\tau-I(q))]_{2\pi},&v<0,\\
[0]_{2\pi},&(q,v)=(a,0),\\
[\pi]_{2\pi},&(q,v)=(b,0)
\end{cases}
$$

と置く。この $\Theta$ は $\Gamma_E\to\mathbb S^1$ 上の連続な時間位相であり、解に沿って角速度 $\omega$ で進む。
<!-- formal-statement-end -->

**見取り図**　上側の枝 $v>0$ では経過時間が $I(q)$ です。下側の枝 $v<0$ は右端 $b$ で折り返して戻る途中なので、経過時間は $\tau+(\tau-I(q))=2\tau-I(q)$。この違いによって、同じ位置 $q$ でも速度の向きが異なれば位相が異なります。

<!-- proof-start -->
### 証明

CDYN2の定理は、$a$ から始めて正の速度で $b$ へ達するまで $\tau$、続いて負の速度で $a$ へ戻るまでさらに $\tau$ を要し、得られる最小正周期は $2\tau$ であると述べます。そこで同定義が時間位相 $\Theta(\gamma(t))=[\omega t]_{2\pi}$ と一致することを確かめます。

右向き枝では $v=\sqrt{2(E-U(q))}>0$、したがって微積分学の基本定理と連鎖律から

$$
\frac{d}{dt}I(q(t))
=\frac{q'(t)}{\sqrt{2(E-U(q(t)))}}=\frac{v(t)}{v(t)}=1.
$$

$a$ で $I=0$ なので、この枝で $I(q(t))=t$ です。戻りの枝では $v=-\sqrt{2(E-U(q))}<0$ だから

$$
\frac{d}{dt}(2\tau-I(q(t)))
=-\frac{v(t)}{\sqrt{2(E-U(q(t)))}}=1.
$$

$b$ で $I(b)=\tau$ となるため、戻りの枝の開始時刻 $t=\tau$ と値 $2\tau-I(b)=\tau$ が一致し、帰着する $t=2\tau$ には $I(a)=0$ より $2\tau-I(a)=2\tau$ です。

端点での貼り合わせも確認します。$q\uparrow b$ で上側枝の値は $\omega\tau=\pi$、下側枝の値も $\omega(2\tau-\tau)=\pi$。$q\downarrow a$ では上側枝が0、下側枝が $\omega2\tau=2\pi$ となり、$\mathbb S^1$ では同じ値です。従って位相は連続に一周つながります。上で各枝の時刻微分が1であることを示したので、位相の持ち上げは全軌道に沿って $\omega$ で増加します。$\square$
<!-- proof-end -->

この式が示す最も重要なことは、**位置 $q$ だけでは位相が定まらない**ことです。同じ $q\in(a,b)$ には速度 $+\sqrt{2(E-U(q))}$ と $-\sqrt{2(E-U(q))}$ があり、行きと帰りは普通は別の位相です。

## 6. 調和振動子の楕円と「角度」の落とし穴

$U(q)=\omega_0^2q^2/2$、$\omega_0>0$、$E>0$ とすれば、振幅 $A=\sqrt{2E}/\omega_0$。基準点 $(A,0)$ からの解は

$$
q(t)=A\cos(\omega_0t),\qquad
v(t)=-A\omega_0\sin(\omega_0t),
\qquad T=\frac{2\pi}{\omega_0}.
$$

幾何学的な座標 $(q,v)$ の軌道は楕円です。長軸と短軸の単位をそろえる $X=q/A$、$Y=-v/(A\omega_0)$ という変換を行うと、

$$
(X(t),Y(t))=(\cos\omega_0t,\sin\omega_0t)
$$

は単位円を定速回転します。この**規格化した平面**の偏角は時間位相 $[\omega_0t]_{2\pi}$ に一致します。しかし元の $(q,v)$ 平面での偏角 $\phi=\operatorname{atan2}(v,q)$ の導関数は

$$
\phi'=\frac{qv'-vq'}{q^2+v^2}
=\frac{-\omega_0^2q^2-v^2}{q^2+v^2}.
$$

$t=0$ では $\phi'=-\omega_0^2$、$t=\pi/(2\omega_0)$ では $\phi'=-1$ です。$\omega_0\ne1$ なら幾何学的偏角の回転速度は一定ではありません。この違いは「角度」という語の誤用ではなく、**どの座標平面で角度を測るか**に依存する現象です。非線形ポテンシャルの閉軌道では、単に位置速度の軸を一定倍率で伸ばすだけで等速になるとは限らず、第5節の時間積分が本質的になります。

## 7. 演習と詳細解答

Level Aでは位相と偏角、周期と原点を区別します。Level Bでは時間積分・連鎖律・原点の自由度を再構成します。Level Cでは非一様回転を平面の自律系へ戻して、その全体を接続します。

### A1. 調和振動子の時計

$q''=-9q$、$q(0)=2$、$q'(0)=0$ に対し、$t=\pi/9$ の状態、最小正周期、時間位相を求めよ。

- Level: A
- ID: CDYN3-A1

<!-- solution-start -->
**詳細解答**　$q(t)=2\cos3t,\ v(t)=-6\sin3t$ なので $t=\pi/9$ で $(q,v)=(1,-3\sqrt3)$。非定常解の最小正周期は $3T=2\pi$ より $T=2\pi/3$。基準時刻0の時間位相は $\Theta(t)=[(2\pi/T)t]_{2\pi}=[3t]_{2\pi}$、従って $t=\pi/9$ では $[\pi/3]_{2\pi}$ です。
<!-- solution-end -->

### A2. 時刻のずれから位相差へ

最小正周期 $T=8$ の一つの周期軌道上で $x_1(t)=\gamma(t+1)$、$x_2(t)=\gamma(t+4)$ とする。位相差 $\Theta(x_2)-\Theta(x_1)$ を求めよ。

- Level: A
- ID: CDYN3-A2

<!-- solution-start -->
**詳細解答**　$\omega=2\pi/8=\pi/4$。共通の位相原点では $\Theta(x_j(t))=[\omega(t+s_j)]_{2\pi}$ ですから、差は $[\omega(4-1)]_{2\pi}=[3\pi/4]_{2\pi}$。時刻 $t$ が消えるので一定です。
<!-- solution-end -->

### A3. 定数角速度をもつ円周

$\alpha'=2$、$x=(\cos\alpha,\sin\alpha)$、$\alpha(0)=0$ に対し $T,\omega,\Theta(\alpha)$ を求めよ。

- Level: A
- ID: CDYN3-A3

<!-- solution-start -->
**詳細解答**　$f(\alpha)=2>0$ なので $T=\int_0^{2\pi}du/2=\pi$、$\omega=2\pi/\pi=2$。時間位相は $\Theta(\alpha)=[\omega\int_0^\alpha du/2]_{2\pi}=[\alpha]_{2\pi}$。この特別な模型では偏角と時間位相が一致します。
<!-- solution-end -->

### A4. 偏角の速さが違う場所

$\alpha'=2+\sin\alpha$ とする。$\alpha=0$ と $\alpha=\pi/2$ で偏角の時間微分を求め、同じ単位円上でも偏角が等速ではないことを示せ。時間位相の導関数の比 $\Theta'(0)/\Theta'(\pi/2)$ も求めよ。

- Level: A
- ID: CDYN3-A4

<!-- solution-start -->
**詳細解答**　$f(0)=2$、$f(\pi/2)=3$ で異なるため、偏角 $\alpha$ は等速ではありません。$f(\alpha)\ge1>0$ なので位相構成定理が適用でき、$\Theta'(\alpha)=\omega/f(\alpha)$ です。従って $\Theta'(0)/\Theta'(\pi/2)=(\omega/2)/(\omega/3)=3/2$。$\omega$ 自体を積分で求めなくても比は確定します。
<!-- solution-end -->

### A5. 往路と復路の位相

CDYN2の閉軌道定理の条件を満たす両端 $a<b$、片道時間 $\tau$ に対し、出発直後の枝 $v>0$ と帰りの枝 $v<0$ の位相表示を記し、$(a,0)$ と $(b,0)$ の位相を求めよ。

- Level: A
- ID: CDYN3-A5

<!-- solution-start -->
**詳細解答**　$I(q)=\int_a^q[2(E-U(s))]^{-1/2}ds$、$\omega=\pi/\tau$ と置きます。出発枝は $[\omega I(q)]_{2\pi}$、帰りの枝は $[\omega(2\tau-I(q))]_{2\pi}$。$I(a)=0$ から $(a,0)$ の位相は $[0]_{2\pi}$、$I(b)=\tau$ から $(b,0)$ は $[\omega\tau]_{2\pi}=[\pi]_{2\pi}$ です。$a$ の帰着では $[\omega2\tau]_{2\pi}=[2\pi]_{2\pi}=[0]_{2\pi}$ となり、両枝がつながります。
<!-- solution-end -->

### B1. 生の偏角は等速か

$q''=-\omega_0^2q$、$\omega_0>0$、初期値 $(q(0),v(0))=(A,0)$、$A>0$ とする。元の $(q,v)$ の偏角 $\phi=\operatorname{atan2}(v,q)$ が $\omega_0\ne1$ で等速でないことを示し、等速の偏角を与える座標を構成せよ。

- Level: B
- ID: CDYN3-B1

<!-- solution-start -->
**詳細解答**　解は $q=A\cos\omega_0t$、$v=-A\omega_0\sin\omega_0t$。極座標偏角の導関数は連鎖律によって $\phi'=(qv'-vq')/(q^2+v^2)$ であり、$q'=v,v'=-\omega_0^2q$ を代入すると

$$
\phi'=-\frac{\omega_0^2q^2+v^2}{q^2+v^2}.
$$

$t=0$ では $q=A,v=0$ なので $-\omega_0^2$。$t=\pi/(2\omega_0)$ では $q=0,v=-A\omega_0$ なので $-1$。$\omega_0\ne1$ では異なります。一方 $X=q/A$、$Y=-v/(A\omega_0)$ とすると $(X,Y)=(\cos\omega_0t,\sin\omega_0t)$ です。従って $\operatorname{atan2}(Y,X)=[\omega_0t]_{2\pi}$ は等速で、正方向の時間位相です。
<!-- solution-end -->

### B2. 非一様回転の積分と四分円

$\alpha'=1+\tfrac12\cos\alpha$、$\alpha(0)=0$ とする。(a) 一周の最小正周期を計算せよ。(b) 初めて $\alpha=\pi/2$ になる時間を計算し、その時間位相と幾何学的偏角を比較せよ。

- Level: B
- ID: CDYN3-B2

<!-- solution-start -->
**詳細解答**　$f(\alpha)\ge1/2>0$ なので一周の最小正周期は積分で与えられます。$u=\tan(\alpha/2)$、$d\alpha=2du/(1+u^2)$、$\cos\alpha=(1-u^2)/(1+u^2)$ より

$$
T=\int_{-\pi}^{\pi}\frac{d\alpha}{1+\frac12\cos\alpha}
=2\int_{-\infty}^{\infty}\frac{du}{\frac32+\frac12u^2}
=4\int_{-\infty}^{\infty}\frac{du}{u^2+3}.
$$

ここで $w=u/\sqrt3$ と置くと $du=\sqrt3\,dw$、$du/(u^2+3)=dw/(\sqrt3(1+w^2))$ です。$\int dw/(1+w^2)=\arctan w+C$ を用い、$T=4\pi/\sqrt3$、$\omega=\sqrt3/2$ となります。(b) $\alpha=0$ から $\pi/2$ へは $u:0\to1$ なので

$$
t_* =4\int_0^1\frac{du}{u^2+3}
=\frac4{\sqrt3}\arctan\frac1{\sqrt3}
=\frac{2\pi}{3\sqrt3}.
$$

時間位相は $\Theta(\pi/2)=[\omega t_*]_{2\pi}=[\pi/3]_{2\pi}$。幾何学的偏角 $[\pi/2]_{2\pi}$ とは異なります。$t_*=T/6$ なので円の四分の一を進む所要時間は一周の六分の一です。
<!-- solution-end -->

### B3. 位相原点を変更する

非定常周期解 $\gamma$ の最小正周期を $T$、$\omega=2\pi/T$ とし、時間位相を $\Theta_0(\gamma(t))=[\omega t]_{2\pi}$ とする。基準点を $\gamma(a)$ に変更した位相 $\Theta_a$ を定義し、同じ軌道上の二解の位相差が原点変更で不変であることを証明せよ。

- Level: B
- ID: CDYN3-B3

<!-- solution-start -->
**詳細解答**　新しい原点へは時刻 $a$ からの経過時間を用い、$\Theta_a(\gamma(t))=[\omega(t-a)]_{2\pi}$ とします。同じ状態は時刻が $kT$ だけ異なるので、$\omega kT=2\pi k$ よりこの値はwell-definedです。$x_j(t)=\gamma(t+s_j)$ について

$$
\Theta_a(x_2(t))-\Theta_a(x_1(t))
=[\omega(t+s_2-a)-\omega(t+s_1-a)]_{2\pi}
=[\omega(s_2-s_1)]_{2\pi}.
$$

$a$ と $t$ が双方で相殺されるため、原点にも観測時刻にも依存しません。異なる軌道を同一の $\gamma$ として扱う証明ではない点が仮定です。
<!-- solution-end -->

### B4. 帰り道で時計を逆戻ししてはいけない

CDYN2の閉軌道定理の条件を満たす $a<b$ を持つ保存系で、$I(q)$ と $\tau$ を第5節のように定める。帰りの枝 $v<0$ で $\Theta(q,v)=[\omega I(q)]_{2\pi}$ としてはいけない理由を時間微分で示し、正しい式を導け。

- Level: B
- ID: CDYN3-B4

<!-- solution-start -->
**詳細解答**　帰り道では $v=-\sqrt{2(E-U(q))}$ です。従って $I'(q)=1/\sqrt{2(E-U(q))}$ を用いると

$$
\frac d{dt}(\omega I(q(t)))
=\omega I'(q(t))v(t)=-\omega.
$$

これは時計が逆向きに進むので、時間位相の要件 $\Theta'_{\mathrm{time}}=\omega$ に反します。正しい経過時間は、$a\to b$ の片道 $\tau$ と、$b\to q$ の戻り時間 $\int_q^b ds/\sqrt{2(E-U(s))}=\tau-I(q)$ の和です。よって $\tau+\tau-I(q)=2\tau-I(q)$、正しい位相は $[\omega(2\tau-I(q))]_{2\pi}$。微分すると $-\omega I'(q)v=+\omega$ となります。
<!-- solution-end -->

### C1. 平面自律系としての非一様円運動

平面の単位円 $x_1^2+x_2^2=1$ 上で

$$
x_1'=-(1+\tfrac12x_1)x_2,\qquad
x_2'=(1+\tfrac12x_1)x_1
$$

を考える。(a) 単位円が不変で、正方向へ非定常に周回することを証明せよ。(b) 一周の周期と、$(1,0)$ を位相0とする時間位相を偏角 $\alpha$ の積分で与えよ。(c) 初期値 $x^{(1)}(0)=(1,0)$、$x^{(2)}(0)=(0,1)$ の二解について、共通の時間位相の差がいくつで、なぜ時間とともに変わらないかを示せ。偏角の差との相違も述べよ。

- Level: C
- ID: CDYN3-C1

<!-- solution-start -->
**詳細解答**

(a) $R=x_1^2+x_2^2$ の時間微分を方程式へ代入すると

$$
R'=2x_1x_1'+2x_2x_2'
=-2x_1(1+\tfrac12x_1)x_2+2x_2(1+\tfrac12x_1)x_1=0.
$$

初期値が単位円上なら $R(t)=1$ です。$x=(\cos\alpha,\sin\alpha)$ と置き、接線ベクトル $(-\sin\alpha,\cos\alpha)$ と比較すると

$$
x'=(1+\tfrac12\cos\alpha)(-\sin\alpha,\cos\alpha),
\qquad \alpha'=1+\tfrac12\cos\alpha.
$$

$1+\tfrac12\cos\alpha\ge1/2>0$ なので停止点はなく、正方向へ進みます。大域性は $1/2\le\alpha'\le3/2$ のため任意の有限時間で $\alpha$ が無限大に逃げないことと、角度方程式の局所解の延長から従います。

(b) 偏角 $\alpha=0$ を基準にすれば

$$
T=\int_0^{2\pi}\frac{du}{1+\frac12\cos u}
=\frac{4\pi}{\sqrt3},\qquad
\omega=\frac{\sqrt3}{2},
$$

です。積分は $z=\tan(u/2)$ の二枝をまとめて $[-\pi,\pi]$ とすれば $4\int_{-\infty}^\infty dz/(z^2+3)=4\pi/\sqrt3$ になります。時間位相は

$$
\Theta(\alpha)
=\left[\frac{\sqrt3}{2}\int_0^\alpha\frac{du}{1+\frac12\cos u}\right]_{2\pi}.
$$

積分を一周延ばした変化は $\omega T=2\pi$ なので、$\alpha$ の代表値によらず円周上の値が定まります。

(c) 第一の初期偏角は0、第二は $\pi/2$ です。積分に $z=\tan(u/2)$ を使い $0\le z\le1$ について

$$
\int_0^{\pi/2}\frac{du}{1+\frac12\cos u}
=4\int_0^1\frac{dz}{z^2+3}
=\frac{2\pi}{3\sqrt3}.
$$

従って初期位相差は $[\omega\cdot2\pi/(3\sqrt3)]_{2\pi}=[\pi/3]_{2\pi}$ です。二解とも同じ軌道と同じ正の角速度関数を用い、構成定理よりそれぞれの時間位相が毎秒 $\omega$ だけ増えます。よって差の時間微分は $\omega-\omega=0$ となり、この位相差は全時刻一定です。初期の**幾何学的偏角差**は $\pi/2$ であり、時間位相差 $\pi/3$ と一致しません。さらに偏角の速度が初期点で $3/2$ と $1$ と異なるため、偏角差を一定と誤って結論することもできません。
<!-- solution-end -->

**次への問い**　位相を使えば、周期軌道の接線方向の運動は $\Theta'=\omega$ と簡潔に表せます。しかし、軌道を少し横へずらした摂動が一周期後に拡大するのか減衰するのかは、位相だけでは判定できません。CDYN4ではその**横方向を含む変分方程式**と一周期の線形写像を調べます。
