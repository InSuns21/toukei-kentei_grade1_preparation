# CDYN7 ゆっくり変わる振幅の平均化

[CDYN6のエネルギー水準と軌道の分類](../CDYN6/index.md#thm-cdyn6-energy-regimes)では、外力も減衰もない非線形振動子の軌道がエネルギーで決まり、周期も変わると分かりました。しかし弱い減衰を加えるとエネルギーは少しずつ失われ、一周ごとに振幅が変わります。一周の細かな上下動をすべて追わず、**何十、何百周期にもわたる変化**をどこまで正確に記述できるでしょうか。

小さな係数 $\varepsilon$ を見て、振動項をただ平均値で置き換えるだけでは証明になりません。観測する時間も $1/\varepsilon$ 倍に長くなるからです。本章はまず直接積分できる模型から始め、周期関数の原始関数を使って**長い時間でも誤差が小さい**ことを証明し、最後に弱減衰振動子の振幅へ戻ります。

## 1. 速い振動と遅い変化は時間を分けて考える

$0<\varepsilon\le1$ とし、初期値 $x(0)=x_0\in\mathbb R$ の問題

$$
x'(t)=\varepsilon(-x(t)+\cos t)
$$

を考えます。$t$ の一周期は $2\pi$ ですが、$x$ の変化率には小さな係数 $\varepsilon$ が付きます。$\cos t$ の一周期平均が0であることから、まず

$$
y'(t)=-\varepsilon y(t),\qquad y(0)=x_0
$$

を近似式として試したくなります。その解は $y(t)=x_0e^{-\varepsilon t}$ です。

本当に近いか、積分因子を使って検算します。両辺へ $e^{\varepsilon t}$ を掛けると

$$
\frac{d}{dt}(e^{\varepsilon t}x(t))
=\varepsilon e^{\varepsilon t}\cos t.
$$

積分を実行するために

$$
\frac{d}{dt}\left\{
\frac{e^{\varepsilon t}(\varepsilon\cos t+\sin t)}{1+\varepsilon^2}
\right\}=e^{\varepsilon t}\cos t
$$

を確認します。時刻0から $t$ まで積分すると

$$
x(t)=x_0e^{-\varepsilon t}
+\frac{\varepsilon}{1+\varepsilon^2}
\left(\varepsilon\cos t+\sin t-\varepsilon e^{-\varepsilon t}\right).
$$

従って $t\ge0$ では $e^{-\varepsilon t}\le1$ と三角関数の絶対値が1以下であることから

$$
|x(t)-y(t)|
\le\frac{\varepsilon}{1+\varepsilon^2}(1+2\varepsilon)
\le3\varepsilon.
$$

この例では、誤差は $t\to\infty$ としても増大しません。ただし、これは線形で明示解が得られる特別な模型です。非線形な振幅方程式へ進むには、平均化の誤差を積分の形から抑える方法が必要です。

## 2. 周期平均と有界な周期原始関数

連続な周期関数 $q:\mathbb R\to\mathbb R$ が周期 $P>0$ を持つとします。周期ごとの平均が一定なら、長時間では同じ平均値が繰り返し現れます。

<a id="def-cdyn7-periodic-average"></a>

<!-- formal-statement-start -->
### 定義（周期平均と平均零の振動項）

連続で $P$ 周期的な関数 $q:\mathbb R\to\mathbb R$ の**周期平均**を

$$
\langle q\rangle=\frac1P\int_0^Pq(s)\,ds
$$

とする。$\langle q\rangle=0$ なら $q$ を**平均零の振動項**という。平均零の場合、原始関数を

$$
Q(t)=\int_0^tq(s)\,ds
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn7-periodic-average -->
**定義の確認**　$q(t)=\cos t$ は $P=2\pi$ 周期で、$\int_0^{2\pi}\cos s\,ds=\sin(2\pi)-\sin0=0$ です。従って $\langle q\rangle=0$ で、$Q(t)=\sin t$。実際に $Q'(t)=\cos t$ と $|Q(t)|\le1$ を確認できます。

一方 $q(t)=2+\cos t$ の平均は2であり、平均零ではありません。そのまま振動項として捨てることはできません。
<!-- definition-example-end -->

<a id="lem-cdyn7-periodic-primitive"></a>

<!-- formal-statement-start -->
### 補題（平均零と有界な周期原始関数）

$q$ が連続かつ $P$ 周期的で平均零なら、$Q(t)=\int_0^tq(s)\,ds$ は $P$ 周期的であり、有界である。特に、ある $K\ge0$ が存在して

$$
|Q(t)|\le K\qquad(t\in\mathbb R)
$$

となる。
<!-- formal-statement-end -->

**証明の見取り図**　任意の時刻から一周期の積分が0になることを使います。原始関数が毎周期同じ値に戻るため、誤差が周期数だけ単調に蓄積するとは限りません。

<!-- proof-start -->
### 証明

周期性により、変数変換 $s=u+P$ を行うと

$$
\int_0^{t+P}q(s)\,ds
=\int_0^Pq(s)\,ds+\int_P^{t+P}q(s)\,ds
=0+\int_0^tq(u+P)\,du.
$$

最後の積分で $q(u+P)=q(u)$ を代入すると $Q(t+P)=Q(t)$ です。この等式は $t<0$ に対しても定積分の加法性から成立します。$Q$ は連続で、コンパクト区間 $[0,P]$ 上の絶対値に最大値 $K$ が存在します。任意の $t$ を $t=nP+r$（$0\le r<P$）と書けば $Q(t)=Q(r)$ なので全実数上でも $|Q(t)|\le K$ です。$\square$
<!-- proof-end -->

周期平均が零でなければ、例えば $q\equiv1$ の原始関数は $Q(t)=t$ となり、有界性が失われます。これが次の誤差評価を支える仮定です。

## 3. 振動が状態に依存するときの積分評価

振動の大きさが $g(x(t))$ にも依存すると、一周期の間に $x$ 自身が少し動きます。従って $\int_0^Pq=0$ から、ただちに $\int_0^Pg(x(s))q(s)\,ds=0$ とは言えません。

<a id="lem-cdyn7-oscillatory-integral"></a>

<!-- formal-statement-start -->
### 補題（変化する係数を持つ振動積分の評価）

$q$ は連続で平均零の $P$ 周期関数、$Q(t)=\int_0^tq(s)\,ds$ は $|Q|\le K$ を満たすとする。$g\in C^1(\mathbb R)$ が

$$
|g(x)|\le G,\qquad |g'(x)|\le M
$$

を満たし、$x:[0,t]\to\mathbb R$ は $C^1$ 級で $|x'(s)|\le\varepsilon V$ とする。このとき $t\ge0$ に対し

$$
\left|\int_0^tg(x(s))q(s)\,ds\right|
\le KG+KM\varepsilon Vt
$$

が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　$q=Q'$ を使い、積の微分を展開してから振動の微分を $g(x)$ 側へ移します。$x'=\!O(\varepsilon)$ が一つ残ることが重要です。

<!-- proof-start -->
### 証明

連鎖律と積の微分法より

$$
\frac d{ds}\{g(x(s))Q(s)\}
=g'(x(s))x'(s)Q(s)+g(x(s))q(s).
$$

$Q(0)=0$ なので、両辺を $0$ から $t$ まで積分して

$$
\int_0^tg(x(s))q(s)\,ds
=g(x(t))Q(t)
-\int_0^tQ(s)g'(x(s))x'(s)\,ds.
$$

第一項の絶対値は $GK$ 以下。第二項は三つの上界を積分の各点で掛けて

$$
\left|\int_0^tQ(s)g'(x(s))x'(s)\,ds\right|
\le\int_0^tKM\varepsilon V\,ds
=KM\varepsilon Vt.
$$

三角不等式を適用して主張を得ます。$\square$
<!-- proof-end -->

この結果だけでも、$t$ が $T/\varepsilon$ 程度なら右辺は $K(G+MVT)$ で抑えられると分かります。元の微分方程式にはさらに係数 $\varepsilon$ があるので、振動項がもたらす変位の誤差は $O(\varepsilon)$ になる見込みです。

## 4. 長い時間で使える平均化の誤差評価

今度は状態依存を含む実際の模型を扱います。解 $x$ と近似解 $y$ は同じ初期値から出発し、速い周期 $P$ と遅い時刻 $\tau=\varepsilon t$ を区別します。

<a id="def-cdyn7-averaged-equation"></a>

<!-- formal-statement-start -->
### 定義（弱摂動方程式の平均系）

$0<\varepsilon\le1$、$f,g:\mathbb R\to\mathbb R$、周期 $P>0$ の平均零関数 $q$ に対して、元の初期値問題

$$
x'=\varepsilon\{f(x)+g(x)q(t)\},\qquad x(0)=x_0
$$

に対応する**平均系**を

$$
y'=\varepsilon f(y),\qquad y(0)=x_0
$$

と定める。遅い時刻 $\tau=\varepsilon t$ を用いれば、平均系は $dy/d\tau=f(y)$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn7-averaged-equation -->
**定義の確認**　$ f(x)=-\tanh x$、$g(x)=1/(1+x^2)$、$q(t)=\cos t$ では、すべての $x\in\mathbb R$ で関数は定義され、$\langle\cos\rangle=0$ です。従って元の式は

$$
x'=\varepsilon\left(-\tanh x+\frac{\cos t}{1+x^2}\right)
$$

であり、定義による平均系は $y'=-\varepsilon\tanh y$ です。$g(x)$ を単に定数として扱うわけではありません。
<!-- definition-example-end -->

<a id="thm-cdyn7-finite-slow-time"></a>

<!-- formal-statement-start -->
### 定理（有限の遅い時間区間における平均系の誤差）

$f,g\in C^1(\mathbb R)$ とし、すべての $z\in\mathbb R$ で

$$
|f(z)|\le F,\quad |f'(z)|\le L,\quad
|g(z)|\le G,\quad |g'(z)|\le M
$$

を満たす非負定数 $F,L,G,M$ があるとする。$q$ は連続な平均零の $P$ 周期関数で、$|q|\le R$ および $|Q|\le K$ とする。$0<\varepsilon\le1$、$x_0\in\mathbb R$、$T>0$ に対し、上の元の系と平均系はともに $t\ge0$ に一意な解を持ち、

$$
\sup_{0\le t\le T/\varepsilon}|x(t)-y(t)|
\le \varepsilon K\{G+MT(F+GR)\}e^{LT}
$$

を満たす。すなわち $T$ を固定すると、誤差は $\varepsilon\to0$ で一様に0へ収束する。
<!-- formal-statement-end -->

**証明の見取り図**　元の方程式と平均系を積分して引き算します。$f(x)-f(y)$ は Lipschitz 定数 $L$ で抑え、$g(x)q$ は[振動積分の補題](#lem-cdyn7-oscillatory-integral)で評価し、最後に[ODE8のGrönwallの不等式](../../ODE/ODE8/index.md#lem-ode8-gronwall)を適用します。時間の上限を $T/\varepsilon$ とする位置が核心です。

<!-- proof-start -->
### 証明

$f,g$ とその導関数は一様有界なので、方程式の右辺は各 $t$ で $x$ について一様 Lipschitz です。さらに

$$
|x'(t)|\le\varepsilon(F+GR),\qquad
|y'(t)|\le\varepsilon F
$$

が成立します。局所解の存在・一意性に加え、この有界な速度を時間積分すると任意の有限区間で状態は有界であり、[ODE8の最大解の延長判定](../../ODE/ODE8/index.md#thm-ode8-continuation)で解は正時刻へ延長されます。

初期値が一致するため、積分形の差を取ると

$$
x(t)-y(t)
=\varepsilon\int_0^t\{f(x(s))-f(y(s))\}\,ds
+\varepsilon\int_0^tg(x(s))q(s)\,ds.
$$

実数値関数の平均値の定理を $f$ に適用し、$|f'|\le L$ から

$$
|f(x(s))-f(y(s))|\le L|x(s)-y(s)|
$$

が従います。また、[振動積分の補題](#lem-cdyn7-oscillatory-integral)へ $V=F+GR$ を入れれば

$$
\left|\int_0^tg(x(s))q(s)\,ds\right|
\le KG+KM\varepsilon(F+GR)t.
$$

特に $0\le t\le T/\varepsilon$ では $\varepsilon t\le T$ なので、$u(t)=|x(t)-y(t)|$ は

$$
u(t)\le\varepsilon K\{G+MT(F+GR)\}
+\varepsilon L\int_0^tu(s)\,ds
$$

を満たします。[ODE8のGrönwallの不等式](../../ODE/ODE8/index.md#lem-ode8-gronwall)に $a=\varepsilon K\{G+MT(F+GR)\}$、$b=\varepsilon L$ を代入して

$$
u(t)\le\varepsilon K\{G+MT(F+GR)\}e^{\varepsilon Lt}
\le\varepsilon K\{G+MT(F+GR)\}e^{LT}.
$$

初期値 $x_0$ にも $\varepsilon$ にも依存しない右辺となり、主張が得られます。$\square$
<!-- proof-end -->

**具体的な誤差定数**　先ほどの $f=-\tanh x$、$g=1/(1+x^2)$、$q=\cos t$ を調べます。$|f|\le1$、$|f'|=\operatorname{sech}^2x\le1$、$|g|\le1$。さらに

$$
|g'(x)|=\frac{2|x|}{(1+x^2)^2}
\le\frac1{1+x^2}\le1
$$

です。ここで $2|x|\le1+x^2$ を使いました。$F=L=G=M=R=K=1$ と置けるので、あらゆる $x_0$ と $0\le t\le T/\varepsilon$ に対し

$$
|x(t)-y(t)|\le\varepsilon(1+2T)e^T.
$$

**適用範囲**　定理は $T$ 固定の遅い時間区間を保証します。$T$ 自身を $1/\varepsilon$ のように増やせば右辺も増え、同じ結論は出ません。また、$f(z)=-z$ のような非有界なドリフトは定理の仮定外です。ただし第1節の線形例は明示解で別途誤差を確認済みであり、「定理の仮定外」と「結論が偽」は別です。

## 5. 弱減衰振動子の振幅は平均的にどう減るか

次は本章の目的である振幅の問題へ進みます。[CDYN3の時間位相](../CDYN3/index.md#def-cdyn3-orbit-phase)は一周の進み具合を表しました。ここでは無摂動時に一定となる二つの係数を使い、実際の振動から速い回転を取り除きます。

$\gamma>0$ と $0<\varepsilon\le1$ を固定し、

$$
q''+q=-\varepsilon\gamma q',\qquad v=q'
$$

を考えます。無摂動 $\varepsilon=0$ では $q=a\cos t+b\sin t$、$v=-a\sin t+b\cos t$ です。そこで $\varepsilon>0$ でも

$$
a(t)=q(t)\cos t-v(t)\sin t,\qquad
b(t)=q(t)\sin t+v(t)\cos t
$$

と置きます。逆変換は

$$
q=a\cos t+b\sin t,\qquad
v=-a\sin t+b\cos t
$$

で、回転行列の逆変換なのでいつでも成立します。$R(t)=\sqrt{a(t)^2+b(t)^2}=\sqrt{q(t)^2+v(t)^2}$ を**回転座標で測った振幅**として調べます。零解では $R=0$ であり、正の振幅だけに限定する必要はありません。

$q'=v$、$v'=-q-\varepsilon\gamma v$ を積の微分法へ代入すると

$$
a'=-(q+v')\sin t=\varepsilon\gamma v\sin t,
$$

$$
b'=(q+v')\cos t=-\varepsilon\gamma v\cos t.
$$

上の逆変換 $v=-a\sin t+b\cos t$ を代入すれば

$$
\begin{pmatrix}a\\b\end{pmatrix}'
=\varepsilon M(t)\begin{pmatrix}a\\b\end{pmatrix},
\quad
M(t)=\gamma
\begin{pmatrix}
-\sin^2t&\sin t\cos t\\
\sin t\cos t&-\cos^2t
\end{pmatrix}.
$$

$\langle\sin^2t\rangle=\langle\cos^2t\rangle=1/2$、$\langle\sin t\cos t\rangle=0$ なので、平均行列は $-\gamma I/2$。形式的には $(a,b)$ の両成分は $e^{-\varepsilon\gamma t/2}$ 倍になるはずです。次でその誤差を証明します。

<a id="thm-cdyn7-damped-amplitude"></a>

<!-- formal-statement-start -->
### 定理（弱減衰振動子の平均振幅と誤差）

$\gamma,T>0$、$0<\varepsilon\le1$ とし、$q''+q=-\varepsilon\gamma q'$ の初期値を $(q(0),v(0))=(a_0,b_0)$ とする。$A(t)=(a(t),b(t))^{\mathsf T}$ を上の回転座標、$Y(t)=e^{-\varepsilon\gamma t/2}(a_0,b_0)^{\mathsf T}$ とする。このとき

$$
\|A(t)-Y(t)\|
\le \frac{\varepsilon\gamma}{2}(1+\gamma T)
e^{\gamma T/2}\sqrt{a_0^2+b_0^2}
$$

が $0\le t\le T/\varepsilon$ に対して成立する。従って振幅 $R(t)=\sqrt{q(t)^2+v(t)^2}$ も

$$
\left|R(t)-R(0)e^{-\varepsilon\gamma t/2}\right|
\le \frac{\varepsilon\gamma}{2}(1+\gamma T)
e^{\gamma T/2}R(0)
$$

を満たす。ノルムは $\mathbb R^2$ のEuclidノルムである。
<!-- formal-statement-end -->

**証明の見取り図**　回転座標の方程式を $A'=\varepsilon(-\gamma I/2+N(t))A$ に分けます。零平均行列 $N$ の原始行列 $P$ を明示し、[振動積分の補題](#lem-cdyn7-oscillatory-integral)と同じ部分積分を行います。ただし今回は $A$ に一様な有界性を確かめてから使うため、非有界な線形ベクトル場にも直接対応できます。

<!-- proof-start -->
### 証明

倍角公式を用いると

$$
N(t)=M(t)+\frac\gamma2I
=\frac\gamma2
\begin{pmatrix}
\cos2t&\sin2t\\
\sin2t&-\cos2t
\end{pmatrix}.
$$

$P(0)=0$ かつ $P'=N$ を満たす行列として

$$
P(t)=\frac\gamma4
\begin{pmatrix}
\sin2t&1-\cos2t\\
1-\cos2t&-\sin2t
\end{pmatrix}
$$

を取れます。$P$ の対称行列部分の平方を計算すると

$$
\begin{pmatrix}u&w\\w&-u\end{pmatrix}^2
=(u^2+w^2)I,\quad
u=\sin2t,\quad w=1-\cos2t,
$$

$$
u^2+w^2=2-2\cos2t=4\sin^2t.
$$

従って $P(t)$ の作用素ノルムは $\|P(t)\|_{\mathrm{op}}=(\gamma/2)|\sin t|\le\gamma/2$ です。

ここで $A=(a,b)^{\mathsf T}$ とし、$z(t)=-a(t)\sin t+b(t)\cos t=v(t)$ と置きます。行列の二次形式を直接計算すると

$$
\frac d{dt}\|A(t)\|^2
=2\varepsilon A^{\mathsf T}M(t)A
=-2\varepsilon\gamma z(t)^2\le0.
$$

従って $\|A(t)\|\le\|A(0)\|=R(0)$。また $M(t)=-\gamma u(t)u(t)^{\mathsf T}$、$u=(\sin t,-\cos t)^{\mathsf T}$ は単位ベクトルなので $\|M(t)\|_{\mathrm{op}}=\gamma$、従って $\|A'(t)\|\le\varepsilon\gamma R(0)$ です。

行列値関数の積の微分法と $P(0)=0$ により

$$
\int_0^tN(s)A(s)\,ds
=P(t)A(t)-\int_0^tP(s)A'(s)\,ds.
$$

各項へノルム評価を入れると

$$
\left\|\int_0^tN(s)A(s)\,ds\right\|
\le\frac\gamma2R(0)
+\int_0^t\frac\gamma2\varepsilon\gamma R(0)\,ds
\le\frac\gamma2(1+\gamma T)R(0)
$$

です。最後は $t\le T/\varepsilon$ を用いました。

平均解 $Y'=-\varepsilon\gamma Y/2$ と元の方程式を積分して引くと、$W=A-Y$ は

$$
W(t)=-\frac{\varepsilon\gamma}2\int_0^tW(s)\,ds
+\varepsilon\int_0^tN(s)A(s)\,ds.
$$

従って $\|W(t)\|\le c+\frac{\varepsilon\gamma}{2}\int_0^t\|W(s)\|ds$、ただし

$$
c=\frac{\varepsilon\gamma}2(1+\gamma T)R(0).
$$

ここへ[ODE8のGrönwallの不等式](../../ODE/ODE8/index.md#lem-ode8-gronwall)を $a=c$、$b=\varepsilon\gamma/2$ で適用すると

$$
\|W(t)\|\le ce^{\varepsilon\gamma t/2}
\le ce^{\gamma T/2}.
$$

最後に[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality) $|\|A\|-\|Y\||\le\|A-Y\|$ と $\|Y(t)\|=R(0)e^{-\varepsilon\gamma t/2}$ を使えば振幅の評価も得られます。$\square$
<!-- proof-end -->

ここでの $R$ は位置 $q$ の山の高さそのものではありません。$q$ と速度 $v$ の回転不変な大きさであり、$\varepsilon\gamma$ が小さいとき山の高さを追うための自然な量です。次章では非線形減衰が振幅の大小で符号を変える模型を扱うため、「平均減衰が常に負」という今の単純な結果から先へ進みます。

## 6. 平均化できない時間尺度を見抜く

原始関数が**$\varepsilon$ に依存しない定数**で有界であることは、単なる技術的条件ではありません。例えば

$$
x'(t)=\varepsilon\cos(\varepsilon t),\qquad x(0)=0
$$

では $\cos(\varepsilon t)$ の一周期の平均は0ですが、周期は $2\pi/\varepsilon$ まで伸びます。直接積分して

$$
x(t)=\varepsilon\int_0^t\cos(\varepsilon s)\,ds
=\sin(\varepsilon t)
$$

なので、$t=\pi/(2\varepsilon)$ では $x(t)=1$ です。平均値0に置き換えた解 $y\equiv0$ との誤差は1のままです。原始関数 $Q_\varepsilon(t)=\sin(\varepsilon t)/\varepsilon$ の上界が $1/\varepsilon$ となり、[平均系の誤差定理](#thm-cdyn7-finite-slow-time)の一定の $K$ としては使えません。

もう一つの失敗は、平均の零でない部分まで捨てることです。$q(t)=2+\cos t$ なら平均は2ですから、$x'=\varepsilon(f(x)+g(x)q(t))$ の平均系は $y'=\varepsilon(f(y)+2g(y))$ です。まず $q-2$ を平均零項として分離する必要があります。

## 7. 演習と詳細解答

Level Aでは周期原始関数、解の明示式、仮定と回転変換を練習します。Level Bでは変化する係数の部分積分、上界、非零平均と振幅評価を扱います。Level Cでは一つのモデルから平均近似の成立と失敗を比較します。

### A1. 周期平均と原始関数を計算する

$q(t)=\sin(2t)$ について、周期 $P=\pi$、平均、$Q(t)=\int_0^tq(s)\,ds$ と最小の非負上界 $K$ を求めよ。

- Level: A
- ID: CDYN7-A1

<!-- solution-start -->
**詳細解答**　$\sin(2(t+\pi))=\sin(2t)$ であり、周期は $\pi$ です。$\int_0^\pi\sin(2s)\,ds=[-\cos2s/2]_0^\pi=0$ なので平均は0。原始関数は

$$
Q(t)=\left[-\frac{\cos2s}{2}\right]_0^t
=\frac{1-\cos2t}{2}.
$$

$-1\le\cos2t\le1$ から $0\le Q(t)\le1$、$\cos2t=-1$ で $Q=1$ を取ります。従って最小上界は $K=1$ です。
<!-- solution-end -->

### A2. 積分因子で平均系と比べる

$0<\varepsilon\le1$、$x'=\varepsilon(-x+\sin t)$、$x(0)=0$ を解き、平均解 $y=0$ との差が一様に $3\varepsilon$ 以下であることを示せ。

- Level: A
- ID: CDYN7-A2

<!-- solution-start -->
**詳細解答**　平均零の $\sin t$ を捨てた式は $y'=-\varepsilon y$ で、初期値0から $y=0$ です。元の式に積分因子を掛ければ

$$
(e^{\varepsilon t}x)'=\varepsilon e^{\varepsilon t}\sin t.
$$

原始関数を微分で確かめると

$$
\int e^{\varepsilon t}\sin t\,dt
=\frac{e^{\varepsilon t}(\varepsilon\sin t-\cos t)}{1+\varepsilon^2}+C.
$$

初期値から

$$
x(t)=\frac{\varepsilon}{1+\varepsilon^2}
\left(\varepsilon\sin t-\cos t+e^{-\varepsilon t}\right).
$$

$t\ge0$ では括弧内の絶対値は $\varepsilon+1+1\le3$ なので $|x-y|\le3\varepsilon/(1+\varepsilon^2)\le3\varepsilon$ です。
<!-- solution-end -->

### A3. 非線形モデルの定数を検証する

$f(x)=-\tanh x$、$g(x)=1/(1+x^2)$、$q(t)=\cos t$ について、[有限遅い時間の誤差定理](#thm-cdyn7-finite-slow-time)の $F,L,G,M,R,K$ をすべて1に選べることを確認せよ。

- Level: A
- ID: CDYN7-A3

<!-- solution-start -->
**詳細解答**　$|\tanh x|\le1$ と $f'(x)=-\operatorname{sech}^2x$ より $F=L=1$。$1+x^2\ge1$ より $|g(x)|\le1$ で $G=1$。微分は $g'(x)=-2x/(1+x^2)^2$。$(|x|-1)^2\ge0$ から $2|x|\le1+x^2$ であり、

$$
|g'(x)|=\frac{2|x|}{(1+x^2)^2}
\le\frac{1}{1+x^2}\le1.
$$

従って $M=1$ です。$q$ の絶対値は1以下なので $R=1$。$Q(t)=\sin t$ から $K=1$。すべて $\varepsilon,x_0$ に依存しません。
<!-- solution-end -->

### A4. 回転変換を逆向きに計算する

$a=q\cos t-v\sin t$、$b=q\sin t+v\cos t$ から $q=a\cos t+b\sin t$、$v=-a\sin t+b\cos t$ を導き、$a^2+b^2=q^2+v^2$ を示せ。

- Level: A
- ID: CDYN7-A4

<!-- solution-start -->
**詳細解答**　最初の二式を $\cos t,\sin t$ 倍して加えると

$$
a\cos t+b\sin t
=q(\cos^2t+\sin^2t)+v(-\sin t\cos t+\cos t\sin t)=q.
$$

同様に $-a\sin t+b\cos t$ を展開すれば $v(\sin^2t+\cos^2t)=v$ です。二乗和は

$$
a^2+b^2
=q^2(\cos^2t+\sin^2t)
+v^2(\sin^2t+\cos^2t)
+2qv(-\cos t\sin t+\sin t\cos t)
=q^2+v^2.
$$

よって回転変換はEuclidノルムを保ちます。
<!-- solution-end -->

### A5. 遅い振動の反例を作る

$x'=\varepsilon\cos(\varepsilon t)$、$x(0)=0$ に対し、$t=\pi/(2\varepsilon)$ で零平均による近似誤差を求め、原始関数の上界を確かめよ。

- Level: A
- ID: CDYN7-A5

<!-- solution-start -->
**詳細解答**　積分すると $x(t)=\sin(\varepsilon t)$、平均0に置いた $y'=0$ の解は $y=0$ です。指定時刻で $|x-y|=|\sin(\pi/2)|=1$。振動項の原始関数は $Q_\varepsilon(t)=\sin(\varepsilon t)/\varepsilon$ で、最大絶対値は $1/\varepsilon$ です。[周期原始関数の補題](#lem-cdyn7-periodic-primitive)は各固定 $\varepsilon$ には使えますが、得られる $K$ が $\varepsilon$ に依存するため長時間の $O(\varepsilon)$ 評価にはなりません。
<!-- solution-end -->

### B1. 状態依存する振動を部分積分する

$x'=\varepsilon(f(x)+g(x)\cos t)$、$|f|\le2$、$|g|\le3$、$|g'|\le4$ であり $x$ は $C^1$ とする。$0\le t\le T/\varepsilon$ で $\int_0^tg(x(s))\cos s\,ds$ の明示上界を作れ。

- Level: B
- ID: CDYN7-B1

<!-- solution-start -->
**詳細解答**　$|\cos t|\le1$ より $|x'|\le\varepsilon(2+3)=5\varepsilon$。$Q(t)=\sin t$ は $Q(0)=0$、$|Q|\le1$。積の微分を $[g(x(s))\sin s]'=g'(x(s))x'(s)\sin s+g(x(s))\cos s$ として解き、

$$
\int_0^tg(x(s))\cos s\,ds
=g(x(t))\sin t-\int_0^tg'(x(s))x'(s)\sin s\,ds.
$$

第一項は3以下、第二項は $4\cdot5\varepsilon t$ 以下。従って $|\int_0^tg(x(s))\cos s\,ds|\le3+20\varepsilon t\le3+20T$ です。最後に元のODEではこの積分に $\varepsilon$ が掛かります。
<!-- solution-end -->

### B2. 線形ドリフトの正確な平均誤差

$\lambda>0$、$\omega>0$ とし、$x'=\varepsilon(-\lambda x+\cos\omega t)$、$x(0)=x_0$ とする。平均解と差の明示式を求め、$\omega$ を固定して $0<\varepsilon\le1$ の一様な $O(\varepsilon)$ 上界を作れ。

- Level: B
- ID: CDYN7-B2

<!-- solution-start -->
**詳細解答**　平均解は $y=x_0e^{-\varepsilon\lambda t}$。$\alpha=\varepsilon\lambda$ と置くと $(e^{\alpha t}x)'=\varepsilon e^{\alpha t}\cos\omega t$ です。積分公式を微分して確かめると

$$
\int e^{\alpha t}\cos\omega t\,dt
=\frac{e^{\alpha t}(\alpha\cos\omega t+\omega\sin\omega t)}
{\alpha^2+\omega^2}+C.
$$

よって

$$
x(t)-y(t)=\frac{\varepsilon}{\alpha^2+\omega^2}
\left(\alpha\cos\omega t+\omega\sin\omega t-\alpha e^{-\alpha t}\right).
$$

$t\ge0$ と $\varepsilon\le1$ から $\alpha\le\lambda$ であり、

$$
|x-y|\le\frac{\varepsilon(2\alpha+\omega)}{\alpha^2+\omega^2}
\le\varepsilon\frac{2\lambda+\omega}{\omega^2}.
$$

$\omega$ が0へ近づくにつれこの上界が悪化することも、速い周期を固定する意味を示しています。
<!-- solution-end -->

### B3. 弱減衰振動子の散逸と振幅

$q''+q=-\varepsilon\gamma q'$、$\gamma>0$ に対し、(1) $E=(q^2+v^2)/2$ の時間微分、(2) 回転座標 $A$ の平均行列、(3) $0\le t\le T/\varepsilon$ で $R(t)$ の平均振幅からの誤差上界を求めよ。

- Level: B
- ID: CDYN7-B3

<!-- solution-start -->
**詳細解答**　(1) $q'=v$、$v'=-q-\varepsilon\gamma v$ を代入すると

$$
E'=qq'+vv'=qv+v(-q-\varepsilon\gamma v)
=-\varepsilon\gamma v^2\le0.
$$

従って $R(t)=\sqrt{2E(t)}\le R(0)$ です。(2) [回転変換](#thm-cdyn7-damped-amplitude)に $v=-a\sin t+b\cos t$ を入れると

$$
A'=\varepsilon\gamma
\begin{pmatrix}
-\sin^2t&\sin t\cos t\\
\sin t\cos t&-\cos^2t
\end{pmatrix}A.
$$

一周期の平均は、$\sin^2t$ と $\cos^2t$ が各 $1/2$、$\sin t\cos t$ が0です。従って平均行列は

$$
\overline M=-\frac{\gamma}{2}I
$$

となります。

**(3)**　平均方程式を初期値 $Y(0)=A(0)$ で解くと

$$
Y(t)=e^{-\varepsilon\gamma t/2}A(0)
$$

です。[弱減衰振動子の誤差定理](#thm-cdyn7-damped-amplitude)へこの初期値と観測時間 $0\le t\le T/\varepsilon$ を代入すると

$$
\|A(t)-Y(t)\|
\le \frac{\varepsilon\gamma}{2}(1+\gamma T)e^{\gamma T/2}R(0)
$$

を得ます。ここで $\|A(t)\|=R(t)$ および $\|Y(t)\|=R(0)e^{-\varepsilon\gamma t/2}$ です。[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を二つのベクトル $A(t)$、$Y(t)$ に適用すると

$$
|R(t)-R(0)e^{-\varepsilon\gamma t/2}|
=|\|A(t)\|-\|Y(t)\||
\le\|A(t)-Y(t)\|.
$$

従って振幅差も同じ上界を持ちます。零初期値でも両辺は0です。
<!-- solution-end -->

### B4. 平均零でない外力を分離する

$q(t)=c+\sin t$、$f,g\in C^1(\mathbb R)$ とし、$x'=\varepsilon(f(x)+g(x)q(t))$ を考える。正しい平均系を書き、$f$ と $g$ が有界で導関数も有界なら有限遅い時間の誤差定理をどう適用するか述べよ。

- Level: B
- ID: CDYN7-B4

<!-- solution-start -->
**詳細解答**　一周期平均は $\langle q\rangle=(2\pi)^{-1}\int_0^{2\pi}(c+\sin t)\,dt=c$ です。従って正しい平均ドリフトは $\widetilde f(x)=f(x)+cg(x)$、振動部分は $\widetilde q(t)=\sin t$ です。

$$
x'=\varepsilon\{\widetilde f(x)+g(x)\widetilde q(t)\},
\qquad y'=\varepsilon\widetilde f(y),\quad y(0)=x(0).
$$

もし $|f|\le F$、$|f'|\le L$、$|g|\le G$、$|g'|\le M$ なら

$$
|\widetilde f|\le F+|c|G,\qquad
|\widetilde f'|\le L+|c|M.
$$

さらに $\widetilde q=\sin t$ の原始関数は $1-\cos t$ なので $R=1,K=2$ を選べます。これらを[平均系の誤差定理](#thm-cdyn7-finite-slow-time)へ代入すれば $t\le T/\varepsilon$ の誤差は $\varepsilon$ 倍の定数で抑えられます。$c$ を捨てて $y'=\varepsilon f(y)$ とすることは一般に誤りです。
<!-- solution-end -->

### C1. 平均化できるモデルとできないモデルを見分ける

$0<\varepsilon\le1$、$T>0$ について次を答えよ。

1. $x'=\varepsilon(-x+\cos2t)$、$x(0)=x_0$ の平均解 $y$ と差 $x-y$ の明示式を求め、$t\ge0$ で $|x-y|\le\varepsilon$ を証明せよ。
2. $z'=\varepsilon\{-\tanh z+(1+z^2)^{-1}\cos2t\}$ の平均系を記し、任意の同一初期値に対し $0\le t\le T/\varepsilon$ の誤差上界を定量化せよ。
3. 弱減衰系 $q''+q=-\varepsilon\gamma q'$ で、回転座標の平均系と振幅近似を記し、必要な初期条件・時間区間を明示せよ。
4. 外力 $\cos2t$ を $\cos(\varepsilon t)$ に置き換えた $w'=\varepsilon\cos(\varepsilon t)$、$w(0)=0$ に同じ評価を主張できない理由を、ある時刻での実際の誤差から説明せよ。

- Level: C
- ID: CDYN7-C1

<!-- solution-start -->
**詳細解答**

**(1)**　平均零の $\cos2t$ を落として $y'=-\varepsilon y$、$y=x_0e^{-\varepsilon t}$ です。積分因子で $(e^{\varepsilon t}x)'=\varepsilon e^{\varepsilon t}\cos2t$。右辺の原始関数は

$$
\int e^{\varepsilon t}\cos2t\,dt
=\frac{e^{\varepsilon t}(\varepsilon\cos2t+2\sin2t)}{\varepsilon^2+4}+C
$$

ですから、

$$
x-y=\frac{\varepsilon}{\varepsilon^2+4}
\left(\varepsilon\cos2t+2\sin2t-\varepsilon e^{-\varepsilon t}\right).
$$

$t\ge0$ で括弧内の絶対値は $2+2\varepsilon\le4$、分母 $\varepsilon^2+4\ge4$。従って $|x-y|\le\varepsilon$ です。

**(2)**　平均系は $z_{\mathrm{av}}'=-\varepsilon\tanh z_{\mathrm{av}}$、$z_{\mathrm{av}}(0)=z(0)$。[A3の導関数評価](#thm-cdyn7-finite-slow-time)を改めて用いると $F=L=G=M=1$。$q(t)=\cos2t$ は $|q|\le1$、原始関数 $Q(t)=\sin2t/2$ は $|Q|\le1/2$ です。したがって[有限遅い時間の誤差定理](#thm-cdyn7-finite-slow-time)の定数へ $R=1,K=1/2$ を代入して

$$
|z(t)-z_{\mathrm{av}}(t)|
\le\frac{\varepsilon}{2}(1+2T)e^T,
\quad 0\le t\le T/\varepsilon
$$

を得ます。初期値によらない上界です。

**(3)**　$A=(q\cos t-v\sin t,q\sin t+v\cos t)^{\mathsf T}$、$v=q'$ と置くと

$$
A'=\varepsilon M(t)A,\qquad
\langle M\rangle=-\frac\gamma2I.
$$

平均解は $Y(t)=e^{-\varepsilon\gamma t/2}A(0)$。初期値 $(q(0),v(0))=(a_0,b_0)\in\mathbb R^2$ は任意で、$\gamma>0$ 固定、$0\le t\le T/\varepsilon$ です。$R(0)=\sqrt{a_0^2+b_0^2}$ とおけば[弱減衰振動子の平均振幅と誤差](#thm-cdyn7-damped-amplitude)から

$$
|R(t)-R(0)e^{-\varepsilon\gamma t/2}|
\le\frac{\varepsilon\gamma}{2}(1+\gamma T)e^{\gamma T/2}R(0).
$$

これは $R=\sqrt{q^2+v^2}$ に対する評価であり、各瞬間の $|q(t)|$ を平均解へ直接置いた式ではありません。

**(4)**　$w(t)=\sin(\varepsilon t)$。$t=\pi/(2\varepsilon)$ において $w=1$、平均0の近似解は0で誤差が1です。周期 $2\pi/\varepsilon$ は $\varepsilon$ に依存し、$Q_\varepsilon(t)=\sin(\varepsilon t)/\varepsilon$ の上界も $1/\varepsilon$ になるため、定数 $K$ が固定されるという(2)の条件を満たしません。外力が遅すぎると、それは平均で消す対象ではなく遅い変数の一部です。
<!-- solution-end -->

本章で得たのは「振動項が一周期平均で消える」という形式操作だけではなく、**有限の遅い時間区間でその置換が正しいことを保証する積分評価**です。次章のvan der Pol振動子では、振幅に依存して正負が変わる平均エネルギー変化を計算し、振動が育つ条件と縮む条件を分けます。
