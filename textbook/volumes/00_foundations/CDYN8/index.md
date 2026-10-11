# CDYN8 van der Pol振動子と振幅方程式

[CDYN7の弱減衰振動子の平均振幅と誤差](../CDYN7/index.md#thm-cdyn7-damped-amplitude)では、正の線形減衰を加えた振動の振幅が、遅い時刻で指数的に小さくなることを証明しました。しかし、振幅が小さいときには振動を**増幅**し、大きいときには**減衰**する仕組みもあります。そのとき、どの大きさの振動が選ばれるのでしょうか。

van der Pol振動子は、その問いを一つの二階微分方程式で表す模型です。ここでは小さい正の係数 $\mu$ に注目し、**正確なエネルギー変化 → 回転座標 → 周期平均 → 誤差証明 → 安定振幅**の順に調べます。「振幅2へ近づく」という平均系の結論と、元の系が実際に周期解を持つという結論は、最後まで区別します。

## 1. 減衰の符号が位置によって変わる

$\mu>0$ とし、位置 $q(t)$ に対して

$$
q''-\mu(1-q^2)q'+q=0
$$

を考えます。速度 $v=q'$ を加えれば一階系は

$$
q'=v,\qquad
v'=-q+\mu(1-q^2)v
$$

です。$\mu=0$ では単振動 $q''+q=0$ に戻ります。

線形の減衰項とは違って、速度に掛かる $\mu(1-q^2)$ の符号は位置で変わります。実際、[CDYN2の保存エネルギー](../CDYN2/index.md#thm-cdyn2-closed-orbit)で使った二次の形を直接微分すると、次の厳密な等式が得られます。

<a id="prop-cdyn8-energy-balance"></a>

<!-- formal-statement-start -->
### 命題（van der Pol振動子のエネルギー収支と大域存在）

$\mu>0$、$(q(0),v(0))\in\mathbb R^2$ とする。上の一階系の解はすべての $t\ge0$ に存在し、エネルギー

$$
E(t)=\frac{q(t)^2+v(t)^2}{2}
$$

は

$$
E'(t)=\mu(1-q(t)^2)v(t)^2
$$

を満たす。また $E(t)\le E(0)e^{2\mu t}$ が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　保存系では消えていた二つの交差項が今回も消え、非線形減衰だけが残ります。エネルギーの微分が常に非正とは限りませんが、上側の評価だけで有限時間の発散を排除できます。

<!-- proof-start -->
### 証明

積の微分法と一階系を用いると

$$
E'=qq'+vv'
=qv+v\{-q+\mu(1-q^2)v\}
=\mu(1-q^2)v^2.
$$

ここで $1-q^2\le1$ と $v^2\le q^2+v^2=2E$ より

$$
E'(t)\le \mu v(t)^2\le2\mu E(t).
$$

積分因子によって

$$
\frac d{dt}\{e^{-2\mu t}E(t)\}
=e^{-2\mu t}\{E'(t)-2\mu E(t)\}\le0
$$

となるので、$E(t)\le E(0)e^{2\mu t}$ です。多項式ベクトル場は局所Lipschitzで局所一意解を持ちます。任意の有限時刻区間 $[0,S]$ で $\|(q,v)\|^2=2E\le2E(0)e^{2\mu S}$ と有界だから、[ODE8の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)により正の有限時刻で解が途切れません。初期値が零なら恒等零解です。$\square$
<!-- proof-end -->

例えば $q=0$、$v\ne0$ の瞬間には $E'=\mu v^2>0$。$|q|>1$、$v\ne0$ の瞬間には $E'<0$ です。ただし**位置ごとの符号だけでは一周期を通じた増減は判定できません**。小振幅でも転回点では $v=0$ ですし、大振幅の軌道は $|q|<1$ の領域も通過するからです。次に一周期平均を計算します。

## 2. 速い単振動を取り除く

$\mu=0$ での解は $q=a_0\cos t+b_0\sin t$、$v=-a_0\sin t+b_0\cos t$ です。非線形項を加えても、この速い回転そのものは取り除けます。

<a id="def-cdyn8-rotating-amplitude"></a>

<!-- formal-statement-start -->
### 定義（回転座標と瞬時振幅）

van der Polの一階系の解 $(q(t),v(t))$ に対し

$$
a=q\cos t-v\sin t,\qquad
b=q\sin t+v\cos t
$$

を**回転座標**とし、$A=(a,b)^{\mathsf T}$ と書く。**瞬時振幅**を

$$
r(t)=\|A(t)\|=\sqrt{q(t)^2+v(t)^2}
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn8-rotating-amplitude -->
**定義の確認**　$\mu=0$ で $q(t)=3\cos t$、$v(t)=-3\sin t$ と置くと、$a=3(\cos^2t+\sin^2t)=3$、$b=3(\cos t\sin t-\sin t\cos t)=0$ です。従って $r\equiv3$。回転を引き去ると定数になるという目的を直接確認できました。逆に $q=a\cos t+b\sin t$、$v=-a\sin t+b\cos t$ が成立し、二乗和も保存されます。
<!-- definition-example-end -->

<a id="lem-cdyn8-rotating-system"></a>

<!-- formal-statement-start -->
### 補題（回転座標における正確な弱非線形系）

$\mu>0$ のvan der Pol系の回転座標 $A=(a,b)^{\mathsf T}$ は

$$
A'=\mu F(t,A)
$$

を満たす。ただし、$c=\cos t$、$s=\sin t$ と書いたとき

$$
F(t,A)=
(1-(ac+bs)^2)(-as+bc)
\begin{pmatrix}-s\\c\end{pmatrix}
$$

である。$F$ は $t$ について $2\pi$ 周期的で、$A$ について滑らかである。
<!-- formal-statement-end -->

**証明の見取り図**　変換の微分では、無摂動の $q'=v$ と $v'=-q$ に相当する項が打ち消し合います。残る項を三次多項式として明示すれば、平均化の対象がはっきりします。

<!-- proof-start -->
### 証明

$a=q\cos t-v\sin t$ を微分し、$q'=v$ を代入すると

$$
a'=v\cos t-q\sin t-v'\sin t-v\cos t
=-(q+v')\sin t.
$$

同様に $b=q\sin t+v\cos t$ から

$$
b'=v\sin t+q\cos t+v'\cos t-v\sin t
=(q+v')\cos t.
$$

元の式では $q+v'=\mu(1-q^2)v$。逆変換

$$
q=a\cos t+b\sin t,\qquad
v=-a\sin t+b\cos t
$$

を両式へ代入すれば補題の式を得ます。三角関数は $2\pi$ 周期的、$F$ は $a,b$ の三次以下の多項式です。$\square$
<!-- proof-end -->

この段階の $r$ は**解から測った実際の大きさ**です。次に導入する $\rho$ は平均方程式の未知数であり、両者が近いかどうかは後で証明します。

## 3. 三角関数を平均して振幅方程式を作る

[CDYN7の周期平均](../CDYN7/index.md#def-cdyn7-periodic-average)を成分ごとに適用します。計算に必要な値は、$\sin^2t=(1-\cos2t)/2$ と $\cos^2t=(1+\cos2t)/2$、さらに二乗の倍角公式から

$$
\langle s^2\rangle=\langle c^2\rangle=\frac12,
\qquad \langle sc\rangle=0,
$$

$$
\langle s^2c^2\rangle=\frac18,\qquad
\langle s^4\rangle=\langle c^4\rangle=\frac38.
$$

例えば $s^2c^2=\sin^2(2t)/4=(1-\cos4t)/8$ です。また $s^3c$ や $sc^3$ の一周期積分は、それぞれ $s^4/4$、$-c^4/4$ の端点差を用いて0になります。

<a id="def-cdyn8-averaged-vector-field"></a>

<!-- formal-statement-start -->
### 定義（van der Polの平均ベクトル場）

前節で定めた $2\pi$ 周期関数 $F(t,A)$ に対して、各 $A\in\mathbb R^2$ で

$$
\overline F(A)=\frac1{2\pi}\int_0^{2\pi}F(t,A)\,dt
$$

と置く。対応する平均系を

$$
Y'(t)=\mu\overline F(Y(t)),\qquad Y(0)=A(0)
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn8-averaged-vector-field -->
**定義の確認**　$A=(r,0)$ を固定して平均すると、$q=r\cos t$、$v=-r\sin t$ より第一成分は $r(1-r^2c^2)s^2$。従って平均は $r/2-r^3/8$ です。第二成分は $-r(1-r^2c^2)sc$ で、奇数積の周期平均が0です。ここでは積分中の $A$ は固定しており、実際に変化する $A(t)$ を積分中に定数扱いしてはいません。
<!-- definition-example-end -->

<a id="prop-cdyn8-mean-vector-field"></a>

<!-- formal-statement-start -->
### 命題（van der Pol平均場の明示式）

上で定めた $\overline F$ は、すべての $A=(a,b)^{\mathsf T}\in\mathbb R^2$ に対し

$$
\overline F(A)
=\frac12\left(1-\frac{a^2+b^2}{4}\right)
\begin{pmatrix}a\\b\end{pmatrix}
$$

を満たす。
<!-- formal-statement-end -->

**証明の見取り図**　$F$ の一次部分と三次部分を分けて積分します。三次部分で $a^3$ と $ab^2$ の係数を別々に確かめると、半径だけに依存する形が現れます。

<!-- proof-start -->
### 証明

第一成分を $F_1=(as^2-bsc)\{1-(ac+bs)^2\}$ と書きます。一次部分の平均は $a/2$。三次部分を展開すると

$$
(as^2-bsc)(ac+bs)^2
=a^3s^2c^2+2a^2bs^3c+ab^2s^4
-a^2bsc^3-2ab^2s^2c^2-b^3s^3c.
$$

奇数積の平均が0、$\langle s^2c^2\rangle=1/8$、$\langle s^4\rangle=3/8$ だから

$$
\left\langle(as^2-bsc)(ac+bs)^2\right\rangle
=\frac{a^3}{8}+\frac{3ab^2}{8}-\frac{2ab^2}{8}
=\frac{a(a^2+b^2)}8.
$$

従って $\overline F_1=a/2-a(a^2+b^2)/8$ です。第二成分は $F_2=(-asc+bc^2)\{1-(ac+bs)^2\}$。一次部分の平均は $b/2$、三次部分は

$$
(-asc+bc^2)(ac+bs)^2
=-a^3sc^3-2a^2bs^2c^2-ab^2s^3c
+a^2bc^4+2ab^2sc^3+b^3s^2c^2.
$$

その平均は $-2a^2b/8+3a^2b/8+b^3/8=b(a^2+b^2)/8$。従って第二成分も $b/2-b(a^2+b^2)/8$ であり、指定されたベクトル式が得られます。$\square$
<!-- proof-end -->

この平均場はベクトル $Y$ と常に平行です。したがって、回転座標では平均的な方向は動かず、半径だけが変化します。

<a id="thm-cdyn8-amplitude-equation"></a>

<!-- formal-statement-start -->
### 定理（平均振幅方程式とその明示解）

$\mu>0$ とし、$Y'=\mu\overline F(Y)$ に初期値 $Y(0)=A_0\in\mathbb R^2$ を与える。遅い時刻 $\tau=\mu t$ と $\rho(\tau)=\|Y(\tau/\mu)\|$ を用いると

$$
\frac{d\rho}{d\tau}
=\frac{\rho}{2}\left(1-\frac{\rho^2}{4}\right),
\qquad \rho(0)=r_0=\|A_0\|.
$$

$r_0=0$ なら $\rho\equiv0$。$r_0>0$ なら

$$
\rho(\tau)^2
=\frac4{1+(4/r_0^2-1)e^{-\tau}}
\qquad(\tau\ge0)
$$

である。正の振幅 $\rho=2$ は漸近安定、$\rho=0$ は非負半直線上で不安定である。
<!-- formal-statement-end -->

**証明の見取り図**　平均ベクトル場は $Y$ のスカラー倍なので、半径の二乗 $u=\|Y\|^2$ を微分すると一次のlogistic型方程式になります。零初期値は分けて扱い、正の初期値だけ逆数を使います。

<!-- proof-start -->
### 証明

[平均場の明示式](#prop-cdyn8-mean-vector-field)より、遅い時刻で

$$
\frac{dY}{d\tau}
=\frac12\left(1-\frac{\|Y\|^2}{4}\right)Y.
$$

$u=\|Y\|^2$ とおくと、内積の積の微分から

$$
\frac{du}{d\tau}
=2Y\cdot\frac{dY}{d\tau}
=u\left(1-\frac u4\right).
$$

$u(0)=0$ なら局所一意性から $u\equiv0$。$u(0)=u_0>0$ なら $u$ は正であり、$w=4/u-1$ の微分は

$$
w'=-\frac{4u'}{u^2}
=-\frac4u\left(1-\frac u4\right)
=-\left(\frac4u-1\right)=-w.
$$

従って $w(\tau)=(4/u_0-1)e^{-\tau}$。分母は $u_0>0$ なら全 $\tau\ge0$ で正なので、明示式が成立します。

正の半径では $u'=2\rho\rho'$ から $\rho'=\rho(1-\rho^2/4)/2$。$0<\rho<2$ で増加、$\rho>2$ で減少し、明示式から両者とも2へ収束します。また $f(\rho)=\rho/2-\rho^3/8$ とおけば $f'(0)=1/2>0$、$f'(2)=1/2-3\cdot4/8=-1<0$ です。原点に任意に近い正の初期値は2へ離れるため0は不安定、2は漸近安定です。$\square$
<!-- proof-end -->

例えば初期振幅 $r_0=1$ の平均解は $\rho^2=4/(1+3e^{-\tau})$、$r_0=4$ なら $\rho^2=4/(1-3e^{-\tau}/4)$。両者が2へ向かう速さは遅い時刻 $\tau$ で測っています。「振幅2」は**平均系の平衡半径**です。元の系の振幅が各瞬間に厳密に2であるとは言っていません。

## 4. 平均化を本当に適用できるか

ここまでの平均は、動いている状態を一周期の積分中だけ固定した形式計算です。非線形な $F(t,A)$ は $\mathbb R^2$ 上で有界ではないため、[CDYN7の有界係数を仮定した平均化定理](../CDYN7/index.md#thm-cdyn7-finite-slow-time)を、そのまま全空間へ当てはめることもできません。そこで今回は、**平均解が有界であることを先に確かめ、その近くでだけ評価する**方法で誤差を閉じます。

<a id="thm-cdyn8-finite-time-averaging"></a>

<!-- formal-statement-start -->
### 定理（van der Pol回転座標の有限遅い時間平均化）

任意の $A_0\in\mathbb R^2$ と $T>0$ を固定する。$A_\mu$ を

$$
A_\mu'=\mu F(t,A_\mu),\qquad A_\mu(0)=A_0
$$

の解、$Y_\mu$ を $Y_\mu'=\mu\overline F(Y_\mu)$、$Y_\mu(0)=A_0$ の解とする。このとき、$A_0,T$ にだけ依存する有限定数 $C>0$ および $\mu_0>0$ が存在して、$0<\mu\le\mu_0$ なら

$$
\sup_{0\le t\le T/\mu}
\|A_\mu(t)-Y_\mu(t)\|\le C\mu
$$

が成り立つ。とくに、元の振幅 $r(t)=\|A_\mu(t)\|$ と平均振幅 $\rho(\mu t)=\|Y_\mu(t)\|$ についても、同じ上界が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　回転座標の三次ベクトル場は有界な球内でだけ有界・Lipschitzです。平均解が半径 $\max(r_0,2)$ 以内と分かっているので、一回り大きい球内で平均零部分の周期原始関数を作ります。[CDYN7の振動積分の部分積分](../CDYN7/index.md#lem-cdyn7-oscillatory-integral)をベクトルへ拡張し、最後に[ODE8のGrönwallの不等式](../ODE8/index.md#lem-ode8-gronwall)を適用します。誤差が球までの余裕より小さければ、その球から解が出ないという循環を断ち切れます。

<!-- proof-start -->
### 証明

$r_0=\|A_0\|$、$B=\max(r_0,2)$、$M=B+1$ とする。[平均振幅の明示解](#thm-cdyn8-amplitude-equation)から $\|Y_\mu(t)\|\le B$ がすべての $t\ge0$ で成立します。

$A=(a,b)$ に対して $q=ac+bs$、$v=-as+bc$ と書くと、回転行列の長さ保存から $|q|,|v|\le\|A\|$ です。$F(t,A)=(1-q^2)v(-s,c)^{\mathsf T}$ なので、$\|A\|\le M$ の球内では

$$
\|F(t,A)\|\le M(1+M^2)=:U,
$$

$$
\|D_AF(t,A)\|_{\mathrm{op}}
\le |1-q^2|\|D_Av\|+2|qv|\|D_Aq\|
\le1+3M^2=:L.
$$

ここで $D_Aq=(c,s)$、$D_Av=(-s,c)$ はともに長さ1です。同じ球は凸なので、平均値積分によって $F(t,\cdot)$ とその平均 $\overline F$ は球内で Lipschitz 定数 $L$ を持ちます。また $\|\overline F\|\le U$ です。

$H(t,A)=F(t,A)-\overline F(A)$ とおくと、その $2\pi$ 周期平均は0。そこで

$$
P(t,A)=\int_0^t H(s,A)\,ds
$$

を作ります。積分を一周期ずつ分ければ $P(t+2\pi,A)=P(t,A)$ であり、$P(0,A)=0$。したがって全実数 $t$ と球内の $A$ に対し

$$
\|P(t,A)\|\le4\pi U,\qquad
\|D_AP(t,A)\|_{\mathrm{op}}\le4\pi L
$$

です。後者は $D_AH=D_AF-D_A\overline F$ のノルムが $2L$ 以下で、有限積分を微分できることから従います。

まず実解が半径 $M$ の球に留まる区間を考えます。その間 $\|A_\mu'\|=\mu\|F(t,A_\mu)\|\le\mu U$。連鎖律を $P(t,A_\mu(t))$ に適用すると

$$
\frac d{dt}P(t,A_\mu(t))
=H(t,A_\mu(t))
+D_AP(t,A_\mu(t))A_\mu'(t).
$$

$P(0,A_0)=0$ なので積分して

$$
\int_0^t H(s,A_\mu(s))\,ds
=P(t,A_\mu(t))
-\int_0^tD_AP(s,A_\mu(s))A_\mu'(s)\,ds.
$$

従って $0\le t\le T/\mu$ では

$$
\left\|\int_0^t H(s,A_\mu(s))\,ds\right\|
\le4\pi U+4\pi L\mu Ut
\le4\pi U(1+LT).
$$

両方の初期値が等しいことを用い、二つの積分方程式を引くと

$$
A_\mu(t)-Y_\mu(t)
=\mu\int_0^t
\{\overline F(A_\mu(s))-\overline F(Y_\mu(s))\}\,ds
+\mu\int_0^tH(s,A_\mu(s))\,ds.
$$

$e(t)=\|A_\mu(t)-Y_\mu(t)\|$ に対して

$$
e(t)\le 4\pi\mu U(1+LT)+\mu L\int_0^te(s)\,ds.
$$

[Grönwallの不等式](../ODE8/index.md#lem-ode8-gronwall)へ $a=4\pi\mu U(1+LT)$、$b=\mu L$ を代入し、

$$
e(t)\le4\pi\mu U(1+LT)e^{\mu Lt}
\le\mu C,\qquad C=4\pi U(1+LT)e^{LT}.
$$

と得ます。最後にこの評価が球内で自己整合することを確認します。$\mu_0=\min(1,1/(2C))$ と取り、$0<\mu\le\mu_0$ とします。初期時刻では $\|A_0\|\le B<M$。もし $T/\mu$ 以前に初めて $\|A_\mu\|=M$ に達したなら、それ以前の評価を極限で適用して

$$
\|A_\mu\|\le\|Y_\mu\|+\|A_\mu-Y_\mu\|
\le B+\mu C\le B+\frac12<M
$$

となり矛盾します。有限区間で有界な解は[ODE8の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)により延長可能なので、実解は $[0,T/\mu]$ 全体で球内に留まります。

最後に逆三角不等式

$$
\left|\|A_\mu(t)\|-\|Y_\mu(t)\|\right|
\le\|A_\mu(t)-Y_\mu(t)\|
$$

を適用して振幅の誤差を得ます。$\square$
<!-- proof-end -->

この証明で $C$ は初期振幅と固定した $T$ に依存します。$\mu\to0$ のとき $T$ まで固定する点が肝心です。**全時刻 $t\ge0$ の一様近似でも、$\mu$ を固定したときの周期軌道の存在証明でもありません。**

初期振幅が正なら、明示式から固定区間 $0\le\tau\le T$ で平均振幅の最小値は正です。上の誤差がその最小値より十分小さい場合、実解の振幅も零になりません。このとき平均ベクトル $Y_\mu(t)$ の方向は一定で、実際の回転座標 $A_\mu(t)$ の方向は $O(\mu)$ だけ異なります。したがって元の振動は、この時間区間では基本角速度1で進む位相に $O(\mu)$ のずれを持ちます。ただし $r_0=0$ では角度そのものが定義できません。

## 5. 位相と振幅を直接微分して確かめる

角度の符号を明示するため、$r>0$ の間だけ

$$
q=r\cos\theta,\qquad v=-r\sin\theta
$$

と表します。これは $(q,-v)$ の極座標で、無摂動では $\theta'=1$ です。$E=r^2/2$ と[エネルギー収支](#prop-cdyn8-energy-balance)から

$$
rr'=\mu(1-r^2\cos^2\theta)r^2\sin^2\theta,
$$

$$
r'=\mu r(1-r^2\cos^2\theta)\sin^2\theta.
$$

もう一方は $\theta=\arg(q,-v)$ の角速度公式を導くため、

$$
\theta'=\frac{q(-v)'-(-v)q'}{q^2+v^2}
=\frac{-qv'+vq'}{r^2}
$$

を使います。ここに $q'=v$、$v'=-q+\mu(1-q^2)v$ を代入し、

$$
\theta'=1-\mu\frac{q(1-q^2)v}{r^2}
=1+\mu(1-r^2\cos^2\theta)\sin\theta\cos\theta.
$$

を得ます。半径の式で $\theta$ を一周期固定角として平均すると

$$
\left\langle r(1-r^2\cos^2\theta)\sin^2\theta\right\rangle
=\frac r2-\frac{r^3}{8}
$$

です。角度の摂動項は $\langle sc\rangle=\langle s^3c\rangle=0$ により平均0。ただし**$\theta$ 自身は元の系では変化する**ので、これらの平均を厳密な近似と結び付ける根拠は第4節の回転座標における誤差定理です。極座標の特異点 $r=0$ を避けたうえでの確認と理解してください。

## 6. 振幅2という予測で何を言えるか

$\rho=2$ は平均場の正の平衡半径であり、そこへ平均振幅が近づく理由は $0<\rho<2$ では成長、$\rho>2$ では減少という符号にあります。一方、元の方程式では瞬時の $r'$ は角度にも依存します。例えば $r=2$、$\theta=\pi/2$ の瞬間には $r'=2\mu>0$ です。「元の系でも半径2の円が不変軌道だ」と主張することはできません。

元の方程式に非自明な周期軌道が実在すること、その軌道が一意であること、すべての非零初期値がそこへ引き込まれることは、平均振幅の平衡点の存在だけでは証明できません。それらには周期写像や別の存在・一意性の論証が必要です。[CDYN4の周期変分と乗数](../CDYN4/index.md#thm-cdyn4-tangent-unit)は、**既に存在する**周期軌道の変分を調べる道具であって、周期軌道の存在をこの平均計算から補うものではありません。

また $\mu$ が小さくないと、速い単振動と遅い振幅を分ける根拠が弱まります。正の $\mu$ に対する長時間の実挙動を、第4節の有限区間評価だけで保証したことにはなりません。

## 7. 演習と詳細解答

### A1. 一階系とエネルギーの増減

$\mu>0$ のvan der Pol方程式を一階系に書き直せ。(1) $E=(q^2+v^2)/2$ の微分を求め、(2) $(q,v)=(0,1)$ と $(2,1)$ の瞬間で $E'$ の符号を判定せよ。

- Level: A
- ID: CDYN8-A1

<!-- solution-start -->
**詳細解答**　$v=q'$ と置けば $q'=v$、$v'=-q+\mu(1-q^2)v$。(1) $E'=qq'+vv'=qv+v[-q+\mu(1-q^2)v]=\mu(1-q^2)v^2$。(2) $(0,1)$ では $E'=\mu>0$、$(2,1)$ では $E'=\mu(1-4)=-3\mu<0$。したがってエネルギーは各時刻で一方的に減少するわけではありません。
<!-- solution-end -->

### A2. 回転座標の逆変換

$a=q\cos t-v\sin t$、$b=q\sin t+v\cos t$ から $q$、$v$ を解き、$a^2+b^2=q^2+v^2$ を示せ。

- Level: A
- ID: CDYN8-A2

<!-- solution-start -->
**詳細解答**　$c=\cos t$、$s=\sin t$ と書くと $ac+bs=q(c^2+s^2)+v(-sc+cs)=q$、$-as+bc=v(s^2+c^2)+q(-sc+cs)=v$。従って $q=ac+bs$、$v=-as+bc$ です。二乗和を展開すれば $a^2+b^2=q^2(c^2+s^2)+v^2(s^2+c^2)+2qv(-cs+sc)=q^2+v^2$ です。
<!-- solution-end -->

### A3. 三角平均を導く

周期 $2\pi$ について $\langle \sin^2t\cos^2t\rangle=1/8$、$\langle\sin^4t\rangle=3/8$、$\langle\sin^3t\cos t\rangle=0$ をそれぞれ積分で示せ。

- Level: A
- ID: CDYN8-A3

<!-- solution-start -->
**詳細解答**　倍角公式で $\sin^2t\cos^2t=(1-\cos4t)/8$、従って平均は $1/8$。次に $\sin^4t=((1-\cos2t)/2)^2=(1-2\cos2t+\cos^22t)/4$ で、$\langle\cos^22t\rangle=1/2$ を代入すると $(1+1/2)/4=3/8$。最後は $\frac d{dt}(\sin^4t/4)=\sin^3t\cos t$ だから一周期積分は $(\sin^4(2\pi)-\sin^40)/4=0$ です。
<!-- solution-end -->

### A4. 平均振幅の符号と線形化

$f(\rho)=\rho(1-\rho^2/4)/2$ を $\rho\ge0$ で調べ、平衡値、増減符号、$f'(0)$ と $f'(2)$ を求めよ。

- Level: A
- ID: CDYN8-A4

<!-- solution-start -->
**詳細解答**　$f(\rho)=\rho/2-\rho^3/8$。零点は $\rho=0,2$ です。$\rho>0$ では $1-\rho^2/4$ の符号が $\rho<2$ で正、$\rho>2$ で負です。微分 $f'(\rho)=1/2-3\rho^2/8$ から $f'(0)=1/2$、$f'(2)=-1$。平均系では0は不安定、2は漸近安定です。
<!-- solution-end -->

### A5. 正の初期振幅の明示解

平均振幅方程式で $\rho(0)=2\sqrt2$ の解を求め、$\rho(\tau)>2$ および $\rho(\tau)\to2$ を確認せよ。

- Level: A
- ID: CDYN8-A5

<!-- solution-start -->
**詳細解答**　$u_0=\rho(0)^2=8$ なので[平均振幅の明示解](#thm-cdyn8-amplitude-equation)に $4/u_0-1=-1/2$ を入れると

$$
\rho(\tau)=\frac2{\sqrt{1-e^{-\tau}/2}}.
$$

$\tau\ge0$ では $0<e^{-\tau}\le1$ より分母は1より小さい正数、ゆえに $\rho>2$。$\tau\to\infty$ で $e^{-\tau}\to0$ なので $\rho\to2$ です。
<!-- solution-end -->

### B1. 二成分の平均場を導出する

$F(t,A)$ の定義から、$A=(a,b)$ を固定したときの $\overline F_1$ と $\overline F_2$ を一周期積分し、$\overline F(A)=\frac12(1-\|A\|^2/4)A$ を確かめよ。

- Level: B
- ID: CDYN8-B1

<!-- solution-start -->
**詳細解答**　$c=\cos t$、$s=\sin t$ とし $q=ac+bs$、$v=-as+bc$ とします。$F_1=(as^2-bsc)(1-q^2)$ の一次部分は $a/2$。三次部分は $a^3s^2c^2+2a^2bs^3c+ab^2s^4-a^2bsc^3-2ab^2s^2c^2-b^3s^3c$ です。[平均場の計算](#prop-cdyn8-mean-vector-field)で使った三角平均をそれぞれ代入すると $a^3/8+3ab^2/8-2ab^2/8=a(a^2+b^2)/8$。従って $\overline F_1=a/2-a(a^2+b^2)/8$。同様に $F_2=(-asc+bc^2)(1-q^2)$ は一次平均 $b/2$ で、三次平均が $-2a^2b/8+3a^2b/8+b^3/8=b(a^2+b^2)/8$ です。以上を縦に並べて結論を得ます。
<!-- solution-end -->

### B2. 原始関数と誤差定数の設計

$M>0$ とし $F,\overline F$ を前節のものとする。球 $\|A\|\le M$ 上で $U=M(1+M^2)$、$L=1+3M^2$ としたとき、$H=F-\overline F$ の周期原始関数 $P(t,A)=\int_0^tH(s,A)\,ds$ に $\|P\|\le4\pi U$、$\|D_AP\|_{\mathrm{op}}\le4\pi L$ が成立することを証明せよ。

- Level: B
- ID: CDYN8-B2

<!-- solution-start -->
**詳細解答**　回転変換が直交的なので $\|Dq\|=\|Dv\|=1$、$|q|,|v|\le M$。積の微分を使うと $\|D[(1-q^2)v]\|\le|1-q^2|+2|qv|\le1+3M^2=L$、かつ $|(1-q^2)v|\le M(1+M^2)=U$。よって $\|F\|\le U$、$\|D_AF\|\le L$ です。$\overline F$ は $F$ の積分平均なので同じ上界を満たし、$H$ には $\|H\|\le2U$、$\|D_AH\|\le2L$ が成立します。$\int_0^{2\pi}H(s,A)\,ds=0$ なので、$P$ は周期的。任意の $t$ を $t=2\pi n+u$、$0\le u<2\pi$ と書けば $P(t,A)=\int_0^uH(s,A)\,ds$ です。従って積分区間の長さは最大 $2\pi$ で、$\|P\|\le2\pi(2U)=4\pi U$。積分内微分を施して同じ議論を $D_AH$ に適用すると $\|D_AP\|\le4\pi L$ です。
<!-- solution-end -->

### B3. 位相の式と原点の例外

$r>0$ のvan der Pol解を $q=r\cos\theta$、$v=-r\sin\theta$ と表したとき、$r'$、$\theta'$ を導け。また $r=0$ で角度を定義できない理由を説明せよ。

- Level: B
- ID: CDYN8-B3

<!-- solution-start -->
**詳細解答**　$E=r^2/2$ であるから[エネルギー収支](#prop-cdyn8-energy-balance)より $rr'=\mu(1-r^2\cos^2\theta)r^2\sin^2\theta$、$r>0$ で割ると

$$
r'=\mu r(1-r^2\cos^2\theta)\sin^2\theta.
$$

角度の微分は $(q,-v)$ に対する $\theta'=(-qv'+vq')/r^2$。分子へ方程式を代入すると $-q[-q+\mu(1-q^2)v]+v^2=r^2-\mu q(1-q^2)v$。ゆえに $\theta'=1+\mu(1-r^2\cos^2\theta)\sin\theta\cos\theta$。$r=0$ なら $q=v=0$ で全角度が同じ点を表し、角速度公式の分母 $r^2$ も零です。従って原点解を極座標で追ってはいけません。
<!-- solution-end -->

### B4. 振幅だけを見た近似の限界

(1) $\mu>0$ の元の系で $r=2,\theta=\pi/2$ の瞬間の $r'$ を求めよ。(2) 平均系で $\rho(0)=1$ の明示解を求めよ。(3) (1)(2)から「元の軌道が半径2の円である」とは言えない理由を述べよ。

- Level: B
- ID: CDYN8-B4

<!-- solution-start -->
**詳細解答**　(1) $\cos(\pi/2)=0$、$\sin^2(\pi/2)=1$ を[正確な半径微分式](#prop-cdyn8-energy-balance)から第5節で導いた式へ代入すると $r'=\mu\cdot2\cdot1\cdot1=2\mu$。(2) $u_0=1$ なので[平均振幅の明示解](#thm-cdyn8-amplitude-equation)から $\rho(\tau)=2/\sqrt{1+3e^{-\tau}}$。(3) 平均系は $\rho\to2$ でも、元の系では $r=2$ の点で外向きの速度が生じ得ます。第4節の誤差評価も固定した $0\le\mu t\le T$ に限られます。したがって平均平衡半径を元の系の不変円や周期軌道そのものと同一視できません。
<!-- solution-end -->

### C1. 導出・安定性・定量誤差を一つにつなぐ

$\mu>0$、$q(0)=1$、$v(0)=0$ とする。

1. 無摂動の回転座標 $(a,b)$ の初期値を求め、非線形系の正確な $A'$ を記せ。
2. 平均ベクトル場を計算して、遅い時刻での平均振幅 $\rho(\tau)$ を明示せよ。
3. 任意に固定した $T>0$ に対し、$0\le t\le T/\mu$ で $|r(t)-\rho(\mu t)|\le C\mu$ を保証する具体的な $M,U,L,C$ と $\mu$ の上限を作れ。
4. この評価で元の系の周期軌道の存在・一意性が証明されるか説明せよ。

- Level: C
- ID: CDYN8-C1

<!-- solution-start -->
**詳細解答**

**(1)**　時刻0では $\cos0=1$、$\sin0=0$ なので $a(0)=q(0)=1$、$b(0)=v(0)=0$ です。$q=ac+bs$、$v=-as+bc$ を入れると

$$
A'=\mu(1-(ac+bs)^2)(-as+bc)
\begin{pmatrix}-s\\c\end{pmatrix}.
$$

元の回転と非線形速度項の積が残るので、この式は近似でなく正確です。

**(2)**　一周期の $\langle s^2\rangle=1/2$、$\langle s^2c^2\rangle=1/8$、$\langle s^4\rangle=3/8$ と奇数積平均0を使い、

$$
\overline F(A)=\left(\frac12-\frac{a^2+b^2}{8}\right)A.
$$

$\rho(0)=\sqrt{1^2+0^2}=1$ なので、$u=\rho^2$ の式 $u'=u(1-u/4)$ で $w=4/u-1$ と置けば $w'=-w$、$w(0)=3$。従って

$$
\rho(\tau)=\frac2{\sqrt{1+3e^{-\tau}}}.
$$

**(3)**　初期振幅 $r_0=1$ で平均振幅は1から2へ増えるので $B=\max(1,2)=2$、一回り大きい球の半径を $M=3$ とできます。この球で

$$
U=M(1+M^2)=30,\qquad
L=1+3M^2=28.
$$

[有限時間の平均化定理](#thm-cdyn8-finite-time-averaging)の証明の定数は

$$
C=4\pi U(1+LT)e^{LT}
=120\pi(1+28T)e^{28T}.
$$

$0<\mu\le\mu_0=\min(1,1/(2C))$ とすれば、実解の球からの脱出を仮定すると $\|A\|\le2+\mu C\le5/2<3$ という矛盾が生じます。球内の部分積分では平均零原始関数の上界 $4\pi U$、導関数上界 $4\pi L$、$\|A'\|\le\mu U$ を使い、積分誤差 $4\pi\mu U(1+LT)$ にGrönwallの因子 $e^{LT}$ を掛けます。最後は逆三角不等式より

$$
|r(t)-\rho(\mu t)|\le\|A(t)-Y(t)\|\le C\mu
$$

です。上界は粗くても $\mu$ から独立した明示定数になっています。

**(4)**　この証明の時間上限はあくまで $T/\mu$ で、$T$ を無限大へ動かすと $C$ が変わります。平均系の安定値2だけでは実解の戻り写像の固定点、周期解の一意性、無限時間での引込みは得られません。その種の結論には別の周期解の存在論証が必要です。
<!-- solution-end -->

本章で導いた振幅方程式は、非線形減衰が小振幅を育て、大振幅を抑えることを**定量的に近似する**道具です。次章では、振幅の近くにある軌道の「進行位相」をどのように表すかを考えます。