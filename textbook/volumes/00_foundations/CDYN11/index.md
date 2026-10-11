# CDYN11 二振動子の位相同期と引込み域

[CDYN10の平均位相差方程式](../CDYN10/index.md#thm-cdyn10-phase-difference)は、弱く結ばれた二つの振動子の時計のずれを、ゆっくりした時間の一変数方程式で記述しました。しかし、式が一つになっただけでは、二つの時計が同じペースに落ち着くかどうかは分かりません。異なる固有周波数を、結合はどこまで補えるのでしょうか。また、同期できる条件を満たしていても、初期位相によって結末が変わるのでしょうか。

本章では、まず**平均系そのもの**の同期閾値、安定位相差、そこへ近づく初期位相の範囲を証明します。閾値ちょうどの退化点と、閾値を超えて位相差が回転し続ける領域も調べます。最後に、平均系の無限時間の結論を元の振動子へ移してよい範囲を確認します。

## 1. 周波数差と結合が競争する

[CDYN10の水平結合模型の平均系](../CDYN10/index.md#thm-cdyn10-phase-difference)で、二つの結合強度を同じ正数 $\kappa_1=\kappa_2=\kappa>0$、方向ずれを $\alpha_1=\alpha_2=0$ とします。固有周波数の遅い時間スケールでの差を

$$
\Delta=\nu_2-\nu_1\in\mathbb R
$$

と書きます。二つの平均位相を $u_1,u_2$ とすると、

$$
\begin{aligned}
u_1'&=\nu_1+\frac{\kappa}{2}\sin(u_2-u_1),\\
u_2'&=\nu_2+\frac{\kappa}{2}\sin(u_1-u_2).
\end{aligned}
$$

ここから $D=u_2-u_1$ を引き算で求めると、

$$
\begin{aligned}
D'&=\nu_2-\nu_1
+\frac{\kappa}{2}\sin(-D)
-\frac{\kappa}{2}\sin D\\
&=\Delta-\kappa\sin D.
\end{aligned}
$$

以後、プライムは**遅い時間** $\tau$ による微分とし、$D$ は実数への連続的な持ち上げとして追います。位相差そのものは $2\pi$ を法として同一視できますが、回転した回数を数えるときは持ち上げを失ってはいけません。

この方程式では、周波数差 $\Delta$ は一定方向へのドリフト、結合項 $-\kappa\sin D$ は位相差を押し戻す作用です。$\Delta=0$、$D$ が小さいときには、$D'\simeq-\kappa D$ です。しかし押し戻す力の大きさは最大でも $\kappa$ なので、$\Delta$ が大きい場合には競争に勝てません。

円周上の平衡位相差を持つことと、その平衡へ近づくことは別の性質です。次の定義で区別します。

<a id="def-cdyn11-phase-locking"></a>

<!-- formal-statement-start -->
### 定義（平均位相同期と引込み域）

定数 $\kappa>0,\Delta\in\mathbb R$ を固定し、平均位相差の方程式

$$
D'=\Delta-\kappa\sin D
$$

を考える。実数 $D_*$ が右辺を0にするなら、その剰余類 $[D_*]_{2\pi}$ を**同期位相差**という。解の位相差がある同期位相差へ円周上で収束するとき、その解は**平均位相同期する**という。指定した同期位相差へ収束する初期値の集合を、その同期位相差の**引込み域**という。

円周上での収束とは、ある整数 $n(\tau)$ を選んだ距離

$$
\min_{n\in\mathbb Z}|D(\tau)-D_*-2\pi n|
\longrightarrow0
$$

が成立することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn11-phase-locking -->
**定義の確認**　$\Delta=0$ なら $D_*=0$ と $D_*=\pi$ はいずれも同期位相差です。ただし $D(0)=0$ の解が前者にとどまることと、$D(0)=\pi/2$ の解が前者へ収束することは区別します。後者は[第3節の引込み域の定理](#thm-cdyn11-capture-basin)で証明し、演習B2では解を明示して再確認します。
<!-- definition-example-end -->

## 2. 同期閾値と二つの平衡位相差

正弦関数の値域は $[-1,1]$ です。したがって平衡方程式 $\sin D=\Delta/\kappa$ が解を持つには周波数差の大きさが結合の強さを超えてはいけません。等号では二つの平衡点が重なり、安定性の判定にも変化が生じます。

<a id="prop-cdyn11-locking-threshold"></a>

<!-- formal-statement-start -->
### 命題（同期閾値と平衡位相差の分類）

$\kappa>0$、$\Delta\in\mathbb R$ に対する平均位相差方程式

$$
D'=\Delta-\kappa\sin D
$$

の右辺を $f(D)=\Delta-\kappa\sin D$ とおく。円周上の平衡位相差が存在する必要十分条件は

$$
|\Delta|\le\kappa
$$

である。$|\Delta|<\kappa$ の場合は

$$
a=\arcsin(\Delta/\kappa)\in(-\pi/2,\pi/2)
$$

とおくと、一周期内の異なる二平衡位相差は

$$
D_{\mathrm s}=a,\qquad
D_{\mathrm u}=\pi-a
\quad(\bmod\,2\pi)
$$

である。二平衡点での線形化係数はそれぞれ

$$
f'(D_{\mathrm s})=-\sqrt{\kappa^2-\Delta^2}<0,
\qquad
f'(D_{\mathrm u})=+\sqrt{\kappa^2-\Delta^2}>0
$$

である。$|\Delta|=\kappa$ の場合、円周上の平衡位相差は一つで、線形化係数は0となる。
<!-- formal-statement-end -->

**証明の見取り図**　平衡方程式を正弦の値域で判定し、二つの逆像について余弦の符号を調べます。平方根の符号は、$a$ を $(-\pi/2,\pi/2)$ の主値として選ぶことで確定します。

<!-- proof-start -->
### 証明

右辺を $f(D)=\Delta-\kappa\sin D$ とおきます。$f(D)=0$ と $\sin D=\Delta/\kappa$ は同値で、$\kappa>0$ です。よって $|\Delta/\kappa|\le1$ が平衡点の存在条件です。

狭義不等式の場合、$a$ を表示の範囲に選べば、正弦の一般解から

$$
D=a+2\pi n,\qquad
D=\pi-a+2\pi n,\qquad n\in\mathbb Z
$$

を得ます。$a\in(-\pi/2,\pi/2)$ なので二つは $2\pi$ を法として異なります。微分すると

$$
f'(D)=-\kappa\cos D.
$$

また $\sin a=\Delta/\kappa$、$\cos a>0$ より

$$
\begin{aligned}
\kappa\cos a
&=\kappa\sqrt{1-\sin^2 a}\\
&=\kappa\sqrt{1-\Delta^2/\kappa^2}\\
&=\sqrt{\kappa^2-\Delta^2}.
\end{aligned}
$$

従って $f'(a)=-\sqrt{\kappa^2-\Delta^2}$ です。他方、

$$
\begin{aligned}
f'(\pi-a)&=-\kappa\cos(\pi-a)\\
&=+\kappa\cos a
=+\sqrt{\kappa^2-\Delta^2}.
\end{aligned}
$$

等号 $\Delta=\kappa$ では $\sin D=1$ の解は $D=\pi/2+2\pi n$ に限られます。$\Delta=-\kappa$ では $D=-\pi/2+2\pi n$ だけです。いずれも余弦が0となるので $f'(D_*)=0$ です。$\square$
<!-- proof-end -->

例えば $\Delta=\kappa/2$ なら安定側の候補は $\pi/6$、不安定側の候補は $5\pi/6$ です。二点の間にある $\pi/2$ と、安定候補の左側にある0とで右辺の向きを調べると、

$$
f(0)=\frac\kappa2>0,\qquad
f(\pi/2)=\frac\kappa2-\kappa=-\frac\kappa2<0
$$

となり、どちらも $\pi/6$ へ向かう方向を示します。ただし、この二点での符号だけから**全ての初期値**の結末を宣言せず、次に一次元の流れを追います。

## 3. 円周のほぼ全てから同期する引込み域

一変数自律方程式の解は、右辺が滑らかな場合、平衡点を有限時間で通過できません。平衡解との交差が起きれば、その点で同じ初期値を持つ二つの解が得られ、[ODE1の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)に反するためです。この順序保存を用いると、安定点の近くだけでなく円周全体の引込み域を決められます。

<a id="thm-cdyn11-capture-basin"></a>

<!-- formal-statement-start -->
### 定理（狭義閾値内の安定性と引込み域）

$\kappa>0$、$|\Delta|<\kappa$ とする。平均位相差方程式 $D'=\Delta-\kappa\sin D$ の平衡点を記述するため、

$$
a=\arcsin(\Delta/\kappa)\in(-\pi/2,\pi/2)
$$

とおく。任意の整数 $n$ に対して、持ち上げた平衡点

$$
s_n=a+2\pi n,\qquad
u_n=\pi-a+2\pi n
$$

をおく。このとき $u_{n-1}<s_n<u_n$ であり、初期値が

$$
u_{n-1}<D(0)<u_n
$$

を満たせば、その解は全ての $\tau\ge0$ で存在し、

$$
\lim_{\tau\to\infty}D(\tau)=s_n
$$

となる。$D(0)=u_n$ なら解は不安定平衡点 $u_n$ にとどまる。したがって円周上での $[a]_{2\pi}$ の引込み域は、もう一つの平衡位相差 $[\pi-a]_{2\pi}$ を除く全円周である。

さらに $s_n$ の十分近くでは、収束誤差が指数的に減少し、線形化の減衰率は

$$
\lambda=\sqrt{\kappa^2-\Delta^2}>0
$$

である。一方 $u_n$ は不安定である。
<!-- formal-statement-end -->

**証明の見取り図**　隣り合う不安定点の間には安定点が一つあり、その左側の流れは右へ、右側の流れは左へ向きます。単調有界な解の極限が平衡点でなければならないことを、導関数の符号から確かめます。

<!-- proof-start -->
### 証明

まず

$$
u_{n-1}=-\pi-a+2\pi n,\qquad
s_n=a+2\pi n
$$

なので、その差は

$$
s_n-u_{n-1}=\pi+2a>0.
$$

もう一方の差も

$$
u_n-s_n=(\pi-a)-a=\pi-2a>0
$$

となります。どちらも $-\pi/2<a<\pi/2$ を用いました。平衡点の位置をこの順に固定します。

平衡点はこの三点以外、区間 $(u_{n-1},u_n)$ の内部にはありません。$s_n$ では $f'(s_n)<0$ なので、その直前では $f>0$、直後では $f<0$ です。$f$ は連続で内部に他の零点を持たないため、符号はそれぞれの区間全体で変わりません。従って

$$
\begin{array}{c|cc}
D\text{ の区間}&(u_{n-1},s_n)&(s_n,u_n)\\ \hline
f(D)&>0&<0
\end{array}
$$

です。例えば $D(0)\in(u_{n-1},s_n)$ の解は、平衡解との一意性によって $s_n$ を通過せず、その間は $D'>0$ です。よって単調増加かつ $D(\tau)\le s_n$ です。$f$ は有界かつ滑らかなので解は全時間へ延長でき、単調有界性から極限 $\ell\le s_n$ が存在します。

もし $\ell<s_n$ なら、区間の内部にある $\ell$ では $f(\ell)>0$ です。連続性により十分大きい $\tau$ で $f(D(\tau))\ge f(\ell)/2>0$ となり、

$$
D(\tau)-D(\tau_0)
=\int_{\tau_0}^{\tau}f(D(v))\,dv
\ge\frac{f(\ell)}2(\tau-\tau_0)
$$

が無限に増えます。これは $D(\tau)\le s_n$ と矛盾します。したがって $\ell=s_n$ です。

右の区間 $(s_n,u_n)$ では、解は単調減少かつ $D(\tau)\ge s_n$ です。極限を $\ell\ge s_n$ とすると、もし $\ell>s_n$ なら

$$
s_n<\ell<D(0)<u_n,\qquad f(\ell)<0
$$

です。連続性によって十分大きい $\tau_0$ 以後、

$$
D'(\tau)\le\frac{f(\ell)}2<0,\qquad
D(\tau)\le D(\tau_0)+\frac{f(\ell)}2(\tau-\tau_0)
$$

となって下界 $s_n$ に矛盾します。従ってこの側からの極限も $s_n$ です。初期値が $s_n$ なら平衡解です。$u_n$ からの解も[ODE1の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)によって定数解です。

局所的な減衰を評価します。$f'(s_n)=-\lambda$、$f'$ は連続なので $\eta>0$ を小さく選べば、$|D-s_n|\le\eta$ で

$$
f'(D)\le-\lambda/2.
$$

[RA3の平均値の定理](../RA3/index.md#thm-ra3-mvt)を、区間 $[s_n,D]$（$D<s_n$ なら $[D,s_n]$）上の滑らかな関数 $f$ に適用すると、$s_n$ と $D$ の間のある $\xi$ について

$$
f(D)-f(s_n)=f'(\xi)(D-s_n).
$$

誤差 $e=D-s_n$ に対し、$e\ne0$ では

$$
\frac d{d\tau}|e|
=\operatorname{sgn}(e)f'(\xi)e
=f'(\xi)|e|
\le-\frac{\lambda}{2}|e|.
$$

誤差が0なら以後ずっと平衡解です。$e\ne0$ のときは上の微分不等式に $e^{\lambda\tau/2}$ を掛けて積の微分を取ると、

$$
\frac d{d\tau}
\left(e^{\lambda\tau/2}|e(\tau)|\right)
=e^{\lambda\tau/2}
\left(\frac{\lambda}{2}|e|+\frac d{d\tau}|e|\right)
\le0
$$

です。区間内へ入った時刻 $\tau_0$ から積分すると、

$$
|D(\tau)-s_n|
\le|D(\tau_0)-s_n|
e^{-\lambda(\tau-\tau_0)/2}.
$$

一方 $f'(u_n)=+\lambda$ なので、$u_n$ の左側では $f<0$、右側では $f>0$ となり、両側の十分近い初期値は $u_n$ から離れます。以上で主張が示されました。$\square$
<!-- proof-end -->

**引込み域の読み方**　実数上では各区間 $(u_{n-1},u_n)$ が対応する $s_n$ へ引き込まれます。円周上では各 $s_n$ は同じ位相差であり、各 $u_n$ も同じ例外位相差です。「ほぼ全て」とは、ここでは測度論を仮定した表現ではなく、**例外が一つの円周上の点だけ**という意味です。例外を削っても、閉じた一つの区間全体に一律の指数減衰定数を適用できるわけではありません。不安定点に非常に近い初期値は、そこから離れるまで長くかかるからです。

## 4. 閾値ちょうどでは片側からしか引き込まれない

$|\Delta|=\kappa$ では二平衡点が合流します。ここで前節の減衰率 $\lambda$ は0ですから、線形化で指数減衰を証明する仕組みが失われます。具体的な非線形項を確認します。

<a id="prop-cdyn11-threshold-semistability"></a>

<!-- formal-statement-start -->
### 命題（閾値等号の片側安定性）

$\kappa>0$、$D'=\Delta-\kappa\sin D$ とする。$\Delta=\kappa$ なら持ち上げた平衡点は

$$
q_n=\pi/2+2\pi n
$$

で、$D'\ge0$ が全実数で成立する。各区間 $(q_{n-1},q_n)$ の初期値から出た解は $q_n$ へ単調増加で近づくが、$q_n$ の直後から出た解は $q_n$ から離れて $q_{n+1}$ へ向かう。$\Delta=-\kappa$ の場合は進行方向を反転した同様の結論が成立する。

$\Delta=\kappa$ で $q_n$ の十分近い左側の誤差 $w=q_n-D>0$ は指数関数ではなく、定数倍を除いて $1/\tau$ の速さで減少する。
<!-- formal-statement-end -->

**証明の見取り図**　正弦が1になる点以外では、右辺は常に正です。平衡点の近くでは $1-\cos e$ が二次の大きさであることを、不等式により定量化します。

<!-- proof-start -->
### 証明

$\Delta=\kappa$ のとき

$$
f(D)=\kappa(1-\sin D)\ge0.
$$

等号は $q_n$ のみで生じ、各区間 $(q_{n-1},q_n)$ で $f>0$ です。[ODE1の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)により、区間内の解は上端の平衡点を有限時間で通過しません。従って

$$
D(0)\in(q_{n-1},q_n)
\quad\Longrightarrow\quad
D'(t)>0,\qquad D(t)<q_n
$$

です。この解は単調増加で上に有界です。その極限を $\ell\le q_n$ とすると、もし $\ell<q_n$ なら $f(\ell)>0$ です。連続性から十分大きい時刻 $t_0$ 以後に $D'(t)\ge f(\ell)/2>0$ となり、

$$
D(t)\ge D(t_0)+\frac{f(\ell)}2(t-t_0)\longrightarrow+\infty
$$

を得て上界と矛盾します。従って $\ell=q_n$ です。一方、$D(0)\in(q_n,q_{n+1})$ なら同じ議論で次の平衡点 $q_{n+1}$ へ向かうため、$q_n$ は右側から安定ではありません。

左側の初期値を $0<w(0)\le1$ とし、$D=q_n-w$ と書きます。$\sin(q_n-w)=\cos w$ なので

$$
D'=\kappa(1-\cos w),\qquad
w'=-\kappa(1-\cos w).
$$

$0\le w\le1$ で

$$
\frac{w^2}{4}\le1-\cos w\le\frac{w^2}{2}
$$

が成立します。上界は $\sin t\le t$ と $1-\cos w=2\sin^2(w/2)$ から得ます。下界も出発点を明示します。$0\le t\le1$ について

$$
\sin t-t\cos t
=\int_0^t s\sin s\,ds\ge0,
\qquad
\cos t=1-\int_0^t\sin s\,ds
\ge1-\frac{t^2}{2}\ge\frac12
$$

なので、$\sin t\ge t\cos t\ge t/2$ です。これを積分すると

$$
1-\cos w=\int_0^w\sin t\,dt
\ge\int_0^w\frac t2\,dt
=\frac{w^2}{4}.
$$

従って

$$
-\frac{\kappa}{2}w^2
\le w'\le
-\frac{\kappa}{4}w^2.
$$

$w>0$ なので $-w'/w^2=(1/w)'$ を使い、

$$
\frac{\kappa}{4}
\le\left(\frac1w\right)'
\le\frac{\kappa}{2}.
$$

$0$ から $\tau$ まで積分して逆数を取ると、

$$
\frac1{w(0)^{-1}+\kappa\tau/2}
\le w(\tau)\le
\frac1{w(0)^{-1}+\kappa\tau/4}.
$$

この評価は $w(\tau)>0$ である各有限時刻に成立し、平衡点へ有限時間で到達しない一意性とも整合します。従って減衰は代数的であり、正の指数減衰率は得られません。$\Delta=-\kappa$ では $f(D)=-\kappa(1+\sin D)\le0$ です。$Q=-D$ と置けば

$$
Q'=-D'=\kappa(1+\sin D)
=\kappa(1-\sin Q),
$$

となって、これは今証明した $\Delta=\kappa$ の方程式そのものです。$D$ の平衡点 $q_n=-\pi/2+2\pi n$ は $Q$ では $\pi/2-2\pi n$ に対応します。従って $D$ は各 $q_n$ の右側から単調減少で近づき、左側からは離れます。$\square$
<!-- proof-end -->

ここでは円周上で最終的に同じ平衡位相差へ近づく解でも、**初期値から小さな近傍内にとどまる安定性**は保証されません。片側から出た解が円をほぼ一周して戻ってくることがあるからです。

## 5. 閾値を超えると位相差は回転する

次に $|\Delta|>\kappa$ とします。この場合、同期位相差は存在せず、右辺は一度も0になりません。単に単調というだけでなく、円周を一周するのに要する時間が有限であること、周波数差が閾値に近づくと非常に遅くなることも計算できます。

<a id="thm-cdyn11-phase-slipping"></a>

<!-- formal-statement-start -->
### 定理（位相すべりの周期と平均速度）

$\kappa>0$、$|\Delta|>\kappa$ の平均位相差方程式 $D'=\Delta-\kappa\sin D$ について、任意の解は実数上で符号 $\operatorname{sgn}(\Delta)$ の方向へ単調に進み、円周上の平衡点を持たない。位相差が一周分 $2\pi$ だけ変化するのに要する遅い時間は

$$
T_{\mathrm{slip}}
=\frac{2\pi}{\sqrt{\Delta^2-\kappa^2}}.
$$

したがって持ち上げた位相差の長時間平均速度は

$$
\lim_{\tau\to\infty}\frac{D(\tau)-D(0)}{\tau}
=\operatorname{sgn}(\Delta)\sqrt{\Delta^2-\kappa^2}.
$$

ここで「一周」は増加方向または減少方向に応じた符号付きの変位を意味し、元の四次元の振動子の周期については主張しない。
<!-- formal-statement-end -->

**証明の見取り図**　$\Delta>\kappa$ なら $D'$ は正で上下から正の定数で挟めます。変数分離による一周時間の積分を、半角置換で有理関数へ変換します。

<!-- proof-start -->
### 証明

まず $\Delta>\kappa$ とします。正弦の値域から

$$
0<\Delta-\kappa\le D'\le\Delta+\kappa
$$

なので、位相差は単調に増加し、有限時間で任意の一周を終えます。解が $D(0)=d_0$ から $d_0+2\pi$ まで進む時間は変数分離により $\int_{d_0}^{d_0+2\pi}(\Delta-\kappa\sin D)^{-1}\,dD$ です。被積分関数が $2\pi$ 周期なので積分値は $d_0$ に依存せず、

$$
T_{\mathrm{slip}}=\int_0^{2\pi}
\frac{dD}{\Delta-\kappa\sin D}
$$

です。積分区間を一周期平行移動して $z=D-\pi/2$ と置くと、分母は $\Delta-\kappa\cos z$ です。区間を $[-\pi,\pi]$ としてよいのは被積分関数が $2\pi$ 周期だからです。さらに $t=\tan(z/2)$ とすれば、

$$
\cos z=\frac{1-t^2}{1+t^2},\qquad
dz=\frac{2\,dt}{1+t^2}.
$$

従って

$$
\begin{aligned}
T_{\mathrm{slip}}
&=\int_{-\pi}^{\pi}
\frac{dz}{\Delta-\kappa\cos z}\\
&=2\int_{-\infty}^{\infty}
\frac{dt}{(\Delta-\kappa)+(\Delta+\kappa)t^2}.
\end{aligned}
$$

ここで $A=\Delta-\kappa>0$、$B=\Delta+\kappa>0$ とすると、

$$
\begin{aligned}
T_{\mathrm{slip}}
&=\frac{2}{\sqrt{AB}}
\int_{-\infty}^{\infty}
\frac{d(\sqrt{B/A}\,t)}
{1+(\sqrt{B/A}\,t)^2}\\
&=\frac{2}{\sqrt{AB}}
\left[\arctan(\sqrt{B/A}\,t)\right]_{-\infty}^{\infty}\\
&=\frac{2\pi}{\sqrt{\Delta^2-\kappa^2}}.
\end{aligned}
$$

$\Delta<-\kappa$ では $D'<0$ です。変数 $Q=-D$ を導入すると

$$
Q'=(-\Delta)-\kappa\sin Q,
$$

なぜなら $\sin(-Q)=-\sin Q$ だからです。ここで $-\Delta>\kappa$ なので、$Q$ の正方向の一周時間に今の計算を適用できます。従って $D$ の負方向の一周時間にも同じ正の公式が成立します。

最後に、各一周に同じ時間を要するため、$\tau=nT_{\mathrm{slip}}+r$、$0\le r<T_{\mathrm{slip}}$ と分けると、符号付き変位は $2\pi n\operatorname{sgn}(\Delta)$ に余り一周未満の変位を加えたものです。両辺を $\tau$ で割り、$n\to\infty$ とすると余りの寄与が0になり、表示した平均速度を得ます。$\square$
<!-- proof-end -->

閾値へ外側から近づくと $T_{\mathrm{slip}}\to\infty$ です。これは**位相すべりの直前に長く足踏みする**現象を表します。閾値の内側の同期と同一視してはいけません。閾値の外では一周に長時間を要しても、最終的には一周し続けます。

## 6. 元の振動子について何が保証されるか

CDYN10の元の模型で $\kappa_1=\kappa_2=\kappa>0$、$\alpha_1=\alpha_2=0$ と選び、初期半径をどちらも1とします。そこで証明された[有限遅い時間平均化](../CDYN10/index.md#thm-cdyn10-averaging)と[正確な位相差との比較](../CDYN10/index.md#thm-cdyn10-phase-difference)を合わせると、任意の**固定された** $L>0$ について、十分小さい $\varepsilon>0$ なら

$$
\sup_{0\le t\le L/\varepsilon}
|\delta(t)-D(\varepsilon t)|
\le2C_L\varepsilon
$$

が成り立ちます。この $D$ が本章で分析した平均方程式の解です。例えば $|\Delta|<\kappa$ で $D(0)$ が不安定平衡点と異なれば、[本章の引込み域の定理](#thm-cdyn11-capture-basin)から平均系の $D(\tau)$ は同期位相差へ収束します。任意の有限 $L$ で正確な差 $\delta(t)$ は平均解に近いですが、**$C_L$ が $L\to\infty$ で一様に有界とは証明していません**。

<a id="prop-cdyn11-finite-time-scope"></a>

<!-- formal-statement-start -->
### 命題（有限遅い時間の比較が保証すること）

[CDYN10の水平結合模型](../CDYN10/index.md#def-cdyn10-exact-coupled-phase)において、基本角速度 $\Omega>0$、同じ結合強度 $\kappa_1=\kappa_2=\kappa>0$、方向ずれ $\alpha_1=\alpha_2=0$、初期半径 $r_1(0)=r_2(0)=1$、周波数ずれ $\nu_1,\nu_2\in\mathbb R$ とする。正確な位相差を $\delta(t)$、遅い時間の平均位相差方程式

$$
D'=\nu_2-\nu_1-\kappa\sin D,
\qquad D(0)=\delta(0)
$$

の解を $D(\tau)$ とする。任意の固定 $L>0$、$\eta>0$ に対し、十分小さな $\varepsilon>0$ を選べば、$0\le t\le L/\varepsilon$ で、正確な位相差と平均位相差との円周距離は $\eta$ 未満となる。

一方、この有限時間の評価だけから、$\delta(t)$ の $t\to\infty$ における極限、元の四次元系の周期解の存在・安定性、または無限時間の位相固定を結論することはできない。
<!-- formal-statement-end -->

**証明の見取り図**　距離の上界は平均化定理へ $\varepsilon$ の制約を入れれば得られます。「得られない」とする後半は、量化順序の相違を具体的な関数で確認します。

<!-- proof-start -->
### 証明

[平均位相差方程式と正確な位相差との比較](../CDYN10/index.md#thm-cdyn10-phase-difference)より、与えた固定 $L$ に対応する定数 $C_L$ が存在します。$C_L>0$ として $\varepsilon<\eta/(2C_L)$ を満たし、同定理の小ささの条件も満たすように選べば

$$
|\delta(t)-D(\varepsilon t)|
\le2C_L\varepsilon<\eta
$$

が指定区間で成立します。円周距離は実数上の差の絶対値以下です。

一方、量化順序は「各 $L$ に対して、十分小さい $\varepsilon$ が存在する」です。例えば数学的な比較用の関数

$$
z_\varepsilon(t)=\varepsilon^2t
$$

は、任意の固定 $L$ で

$$
\sup_{0\le t\le L/\varepsilon}|z_\varepsilon(t)|
=L\varepsilon
$$

となり、確かに各有限遅い時間区間では $O(\varepsilon)$ です。しかし固定した $\varepsilon>0$ のまま $t\to\infty$ とすると $z_\varepsilon(t)$ は無限に増加します。この関数を元の振動子の実際の誤差と主張しているのではありません。**有限時間の上界の論理形式だけでは**無限時間の結論を強制しないことを示す反例です。$\square$
<!-- proof-end -->

元の系の無限時間同期を厳密に扱うなら、周期解の持続や横方向の安定性など、追加の論証が必要です。平均方程式の平衡点を見つけただけで、その仕事が自動的に済むわけではありません。

## 7. 演習と詳細解答

### A1. 閾値内の二つの固定位相差

$\kappa>0$、$\Delta=\kappa/2$ とする。円周上の平衡位相差と各線形化係数を求めよ。

- Level: A
- ID: CDYN11-A1

<!-- solution-start -->
**詳細解答**　[同期閾値の命題](#prop-cdyn11-locking-threshold)の条件 $|\Delta|<\kappa$ を確認します。$\sin D=\Delta/\kappa=1/2$ なので、円周上の解は $D=\pi/6$ と $D=5\pi/6$ です。$f'(D)=-\kappa\cos D$ に代入すると、

$$
\begin{aligned}
f'(\pi/6)&=-\kappa\frac{\sqrt3}{2},\\
f'(5\pi/6)&=+\kappa\frac{\sqrt3}{2}.
\end{aligned}
$$

従って $\pi/6$ が安定側、$5\pi/6$ が不安定側です。
<!-- solution-end -->

### A2. 周波数差が0の場合の向き

$\Delta=0$、$\kappa>0$ とする。$D\in(-\pi,0)$ と $D\in(0,\pi)$ における $D'$ の符号を求め、どの平衡点に近づくか述べよ。

- Level: A
- ID: CDYN11-A2

<!-- solution-start -->
**詳細解答**　$D'=-\kappa\sin D$ です。正弦の符号から

$$
\begin{array}{c|cc}
D\text{ の範囲}&(-\pi,0)&(0,\pi)\\ \hline
\sin D&<0&>0\\
D'=-\kappa\sin D&>0&<0
\end{array}
$$

です。[引込み域の定理](#thm-cdyn11-capture-basin)を $a=0$、$u_{-1}=-\pi$、$u_0=\pi$ に適用すると、どちらの区間からも0へ収束します。[ODE1の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)により0を有限時間に通過することはありません。端点 $D(0)=\pm\pi$ は円周上で同じ不安定平衡点にとどまります。
<!-- solution-end -->

### A3. 閾値ちょうどの速度

$\kappa>0,\Delta=\kappa$ とする。$D=\pi/2$、$D=0$、$D=\pi$ での $D'$ を求め、平衡点の右側からの挙動を説明せよ。

- Level: A
- ID: CDYN11-A3

<!-- solution-start -->
**詳細解答**　右辺は $\kappa(1-\sin D)$ ですから、

$$
f(\pi/2)=0,\qquad
f(0)=\kappa,\qquad
f(\pi)=\kappa.
$$

[閾値等号の片側安定性](#prop-cdyn11-threshold-semistability)の条件 $\Delta=\kappa$ のもと、$\pi/2<D<5\pi/2$ では $f(D)>0$ です。従って $\pi/2$ の右側の初期値は、直近の右の平衡点 $5\pi/2$ に向かって増加します。円周では同じ点へ戻るものの、出発直後は $\pi/2$ の近傍から離れます。
<!-- solution-end -->

### A4. 閾値の外の一周時間

$\Delta=2\kappa$、$\kappa>0$ とする。$D'$ の符号を求め、一周時間と平均速度を求めよ。

- Level: A
- ID: CDYN11-A4

<!-- solution-start -->
**詳細解答**　$D'=\kappa(2-\sin D)\ge\kappa>0$ なので正方向へ回転します。[位相すべりの周期と平均速度](#thm-cdyn11-phase-slipping)へ $\Delta=2\kappa$ を代入し、

$$
\begin{aligned}
\sqrt{\Delta^2-\kappa^2}
&=\sqrt{4\kappa^2-\kappa^2}\\
&=\sqrt3\,\kappa.
\end{aligned}
$$

従って一周時間は $2\pi/(\sqrt3\,\kappa)$、平均速度は $\sqrt3\,\kappa$ です。
<!-- solution-end -->

### A5. 負の周波数差の引込み区間

$\kappa=2$、$\Delta=-1$ とする。安定・不安定平衡点の実数代表元を一つずつ選び、その安定平衡点の引込み区間を求めよ。

- Level: A
- ID: CDYN11-A5

<!-- solution-start -->
**詳細解答**　$\Delta/\kappa=-1/2$ より $a=-\pi/6$ です。従って

$$
D_{\mathrm s}=-\pi/6,\qquad
D_{\mathrm u}=\pi+\pi/6=7\pi/6.
$$

安定点 $s_0=-\pi/6$ を含み、両端が不安定点になる区間は

$$
(D_{\mathrm u}-2\pi,D_{\mathrm u})
=(-5\pi/6,7\pi/6).
$$

[引込み域の定理](#thm-cdyn11-capture-basin)により、この区間内の全ての初期値は $-\pi/6$ へ収束します。線形化の減衰率は $\sqrt{\kappa^2-\Delta^2}=\sqrt3$ です。
<!-- solution-end -->

### B1. 全域の符号表を作る

$\kappa>0$、$-\kappa<\Delta<\kappa$ とし、$a=\arcsin(\Delta/\kappa)$ とする。$(-\pi-a,\pi-a)$ 内で右辺の符号表を導き、両側から $a$ に向かうことを証明せよ。

- Level: B
- ID: CDYN11-B1

<!-- solution-start -->
**詳細解答**　[同期閾値の命題](#prop-cdyn11-locking-threshold)から平衡点は

$$
-\pi-a<a<\pi-a
$$

の順で並びます。$f'(a)=-\kappa\cos a<0$ なので $a$ のすぐ左では $f>0$、すぐ右では $f<0$ です。

平衡方程式 $\sin D=\sin a$ の実数解は $a+2\pi n$ と $\pi-a+2\pi n$ だけで、対象の二区間には他の零点がありません。連続な $f$ の符号は零点を通らない限り変わらないため、

$$
f(D)>0\quad(-\pi-a<D<a),
$$

$$
f(D)<0\quad(a<D<\pi-a)
$$

です。左側の解は増加して $a$ を超えず、右側の解は減少して $a$ を下回りません。単調有界性から両側に極限が存在します。左から出た解の極限を $\ell<a$ と仮定すると、$f(\ell)>0$ です。連続性により十分大きい時刻 $t_0$ 以後、

$$
D'(t)\ge f(\ell)/2>0,\qquad
D(t)\ge D(t_0)+\frac{f(\ell)}2(t-t_0)
$$

となり、上界 $a$ に矛盾します。右から出た解が $\ell>a$ に近づくと仮定しても、$f(\ell)<0$ です。十分大きな $t_0$ 以後に

$$
D'(t)\le f(\ell)/2<0,\qquad
D(t)\le D(t_0)+\frac{f(\ell)}2(t-t_0)
$$

となり、下界 $a$ に矛盾します。従って双方とも $a$ へ収束します。
<!-- solution-end -->

### B2. 同一周波数の位相差を陽に解く

$\Delta=0$、$\kappa>0$、$D(0)=\pi/2$ とする。半角変数 $v=\tan(D/2)$ を用いて解を求め、$D=\pi/3$ に達する遅い時間を計算せよ。

- Level: B
- ID: CDYN11-B2

<!-- solution-start -->
**詳細解答**　初期値から $0<D(\tau)\le\pi/2$ が保たれるため、$v=\tan(D/2)>0$ は全時間で定義できます。半角公式を用いると、

$$
\sin D=\frac{2v}{1+v^2},\qquad
D'=\frac{2v'}{1+v^2}.
$$

$D'=-\kappa\sin D$ に代入すると

$$
\frac{2v'}{1+v^2}
=-\kappa\frac{2v}{1+v^2},
\qquad v'=-\kappa v.
$$

初期値は $v(0)=\tan(\pi/4)=1$ なので

$$
v(\tau)=e^{-\kappa\tau},\qquad
D(\tau)=2\arctan(e^{-\kappa\tau}).
$$

$D=\pi/3$ は $v=\tan(\pi/6)=1/\sqrt3$ に対応します。従って $e^{-\kappa\tau}=1/\sqrt3$ の両辺の対数を取り、

$$
\tau=\frac{\log3}{2\kappa}
$$

となります。$\tau\to\infty$ で $D(\tau)\to0$ も直接確かめられます。
<!-- solution-end -->

### B3. 退化点への近づき方を定量化する

$\Delta=\kappa>0$、$D(0)=\pi/2-w_0$、$0<w_0\le1$ とする。$w(\tau)=\pi/2-D(\tau)$ に対し、$w(\tau)$ を挟む二つの有理式を導き、指数減衰との違いを述べよ。

- Level: B
- ID: CDYN11-B3

<!-- solution-start -->
**詳細解答**　$D'=\kappa(1-\sin D)$、$\sin(\pi/2-w)=\cos w$ から

$$
w'=-\kappa(1-\cos w).
$$

$w$ は正のまま減少し、$w\le w_0\le1$ を保ちます。[閾値等号の片側安定性](#prop-cdyn11-threshold-semistability)の証明で示した不等式 $w^2/4\le1-\cos w\le w^2/2$ を代入して

$$
-\frac{\kappa}{2}w^2\le w'\le-\frac{\kappa}{4}w^2.
$$

$w>0$ を用いて逆数を微分すると、

$$
\frac{\kappa}{4}\le\left(\frac1w\right)'
\le\frac{\kappa}{2}.
$$

積分してから逆数を取れば

$$
\frac{1}{w_0^{-1}+\kappa\tau/2}
\le w(\tau)\le
\frac{1}{w_0^{-1}+\kappa\tau/4}.
$$

従って $w$ は $1/\tau$ と同じ程度の減少で、正定数 $c$ に対する $Ce^{-c\tau}$ の上界を全ての大きな $\tau$ で満たすとは限りません。ここでは実際に上の下界が指数上界との両立を妨げます。
<!-- solution-end -->

### B4. 平均速度と瞬間速度を混同しない

CDYN10の水平結合模型で、両半径1、$\kappa_1=\kappa_2=\kappa>0$、$\alpha_1=\alpha_2=0$、初期角度 $\theta_1(0)=\pi/4$、$\theta_2(0)=-\pi/4$ とする。$\Delta=\nu_2-\nu_1$ と置き、正確な位相差の初期速度と平均位相差方程式が与える初期速度を比べよ。

- Level: B
- ID: CDYN11-B4

<!-- solution-start -->
**詳細解答**　初期水平成分はどちらも $x_i(0)=\cos(\pi/4)=1/\sqrt2$ です。従ってCDYN10の[正確な極座標方程式](../CDYN10/index.md#def-cdyn10-exact-coupled-phase)で水平結合入力 $a_i=\kappa(x_j-x_i)$ は両方0です。角速度は

$$
\theta_1'(0)=\Omega+\varepsilon\nu_1,\qquad
\theta_2'(0)=\Omega+\varepsilon\nu_2
$$

なので、

$$
\delta'(0)=\varepsilon\Delta.
$$

一方 $D(0)=-\pi/2$ であり、平均系は $D'=\Delta-\kappa\sin D$ ですから

$$
D'(0)=\Delta+\kappa.
$$

元の時間に戻して比較する平均速度は $\varepsilon D'(0)=\varepsilon(\Delta+\kappa)$ で、瞬間速度との差は $\varepsilon\kappa$ です。これは $O(\varepsilon)$ の差であり、解の有限遅い時間での $O(\varepsilon)$ 近似と矛盾しません。平均前の振動項は瞬間ごとには消えないからです。
<!-- solution-end -->

### C1. 同期・退化・すべりを一つの族で比較する

$\kappa=2$ とし、平均位相差方程式 $D'=\Delta-2\sin D$ を考える。

1. $\Delta=1$ の安定平衡点・不安定平衡点・実数上の引込み区間・局所減衰率を求めよ。初期値 $D(0)=\pi/2$ はどちらへ向かうか。
2. $\Delta=2$ の平衡点とその左右の流れを決め、左からの収束が指数的でない理由を式で示せ。
3. $\Delta=5/2$ と $\Delta=-5/2$ の回転方向・一周時間・長時間平均速度を求めよ。
4. $\Delta=1$ で、元の弱結合振動子の初期半径がともに1であり、CDYN10の有限時間平均化の他の仮定も満たされるとする。元の系も必ず全時間で同期すると主張できるか。CDYN10から実際に与えられる誤差評価の時間区間を明示して判定せよ。

- Level: C
- ID: CDYN11-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$\Delta/\kappa=1/2$ なので $a=\pi/6$ です。[同期閾値命題](#prop-cdyn11-locking-threshold)から

$$
s_0=\pi/6,\qquad u_0=5\pi/6,
\qquad u_{-1}=5\pi/6-2\pi=-7\pi/6.
$$

[引込み域の定理](#thm-cdyn11-capture-basin)により、$s_0$ への引込み区間は

$$
(-7\pi/6,5\pi/6)
$$

です。局所減衰率は

$$
\lambda=\sqrt{2^2-1^2}=\sqrt3.
$$

初期値 $\pi/2$ は $\pi/6<\pi/2<5\pi/6$ にあるため、$D'<0$ で単調減少し $\pi/6$ に近づきます。

**(2)**　$\Delta=\kappa=2$ では $q_n=\pi/2+2\pi n$ が平衡点で、

$$
D'=2(1-\sin D)\ge0.
$$

[閾値等号の片側安定性](#prop-cdyn11-threshold-semistability)より、左側からは単調増加で $q_n$ へ近づき、右側からは $q_n$ を離れて次の $q_{n+1}$ へ向かいます。$w=q_n-D>0$ とすると、

$$
w'=-2(1-\cos w).
$$

左側の初期値について $0<w_0=w(0)\le1$ を選びます。$w$ は正のまま減少するので $0<w(t)\le1$ を保ち、この範囲で $w^2/4\le1-\cos w\le w^2/2$ が成り立ち、

$$
-w^2\le w'\le-\frac12w^2.
$$

従って

$$
\frac1{w_0^{-1}+\tau}
\le w(\tau)\le
\frac1{w_0^{-1}+\tau/2}
$$

です。$w$ は $1/\tau$ の大きさで減少し、正の指数減衰率を持つ平衡点と異なります。

**(3)**　$|\Delta|=5/2>2$ なので平衡点はありません。正方向の $\Delta=5/2$ と負方向の $\Delta=-5/2$ の双方について

$$
\begin{aligned}
\sqrt{\Delta^2-\kappa^2}
&=\sqrt{\frac{25}{4}-4}\\
&=\sqrt{\frac94}=\frac32,
\end{aligned}
$$

です。[位相すべりの周期と平均速度](#thm-cdyn11-phase-slipping)より一周時間はどちらも $2\pi/(3/2)=4\pi/3$ です。長時間平均速度はそれぞれ $+3/2$ と $-3/2$ になります。

**(4)**　主張できません。$\Delta=1$ での $\pi/6$ への収束は、あくまで平均系の遅い時間 $\tau\to\infty$ での結論です。[平均位相差方程式と正確な位相差との比較](../CDYN10/index.md#thm-cdyn10-phase-difference)から得られるのは、各固定 $L>0$ に対して十分小さい $\varepsilon$ で

$$
\sup_{0\le t\le L/\varepsilon}
|\delta(t)-D(\varepsilon t)|
\le2C_L\varepsilon
$$

という評価です。$L$ を無限大へ送ったときの一様性も、元の四次元系の周期軌道の持続も、この式だけでは証明されません。ゆえに元の系の無限時間同期や引込み域を、そのまま平均系の結論として移すことはできません。
<!-- solution-end -->

本章で分かったのは、平均位相差方程式では、周波数差が結合の強さより小さいときに安定な同期位相差が生じ、等号で代数的な片側引込みに変わり、超過すると位相すべりが続くということです。次のCDYN12では、振動子を二つから有限個へ増やし、位相をまとめて表す秩序変数と、多体系におけるエネルギー減少の構造を調べます。
