# VAR6 最短測地線と存在

[VAR4 の Euler–Lagrange 方程式](../VAR4/index.md#prop-var4-metric-el-connection)で曲線が測地線であることを判定でき、[VAR5 の第二変分](../VAR5/index.md#prop-var5-constant-curvature-threshold)では停留曲線の局所的な最小性を調べました。しかしどちらも、「与えられた二点を結ぶ曲線の中に**そもそも最短の一本が存在するか**」には直接答えません。実際、穴あき平面では二点間の長さの下限に近づく曲線を作れても、下限を達成する曲線がないことがあります。

今回は二つの道筋を区別します。一方は、各点の近くでは短い測地線が確実に最短となるという局所理論です。他方は、空間の完備性を仮定して最短測地線が**全域で存在**するという大域理論です。そして、存在した最短測地線がいつ一意でなくなるかを、球面と平坦トーラスで具体的に計算します。

一般の測地線延長と Hopf–Rinow の完全証明は [GEO15](../../../幾何系/GEO/GEO15/index.md#thm-geo15-hopf-rinow) にあります。本章の仕事は、その仮定を使いこなし、変分問題の「下限が達成されるか」という視点で定量化することです。

---

## 1. 長さを最小にする問題とエネルギーを最小にする問題

$(M,g)$ を連結な有限次元 Riemann 多様体とし、二点 $p,q\in M$ を固定します。まず区分的 $C^1$ 曲線 $\gamma:[0,1]\to M$ について、長さとエネルギーを

$$
L(\gamma)=\int_0^1|\dot\gamma(t)|_g\,dt,
\qquad
E(\gamma)=\frac12\int_0^1|\dot\gamma(t)|_g^2\,dt
$$

と置きます。$L$ は進み方を変えても同じですが、$E$ は時間配分にも依存します。例えば Euclid 平面で $(0,0)$ と $(1,0)$ を結ぶ線分を $\gamma(t)=(t,0)$ と進めば $E=1/2$、同じ線分を $\eta(t)=(t^2,0)$ と進めば

$$
L(\gamma)=L(\eta)=1,
\qquad
E(\eta)=\frac12\int_0^1 4t^2\,dt=\frac23
$$

です。したがって「測地線のエネルギー停留」と「距離を達成する」は同一の主張ではありません。

<a id="prop-var6-energy-distance"></a>
<!-- formal-statement-start -->
> **命題（単位時間エネルギーと距離の下限）**  
> 連結な有限次元 Riemann 多様体 $(M,g)$ の点 $p,q$ を取る。端点を $\gamma(0)=p,\ \gamma(1)=q$ とする区分的 $C^1$ 曲線について

$$
2E(\gamma)\ge L(\gamma)^2\ge d(p,q)^2
$$

> が成り立つ。最初の等号は $|\dot\gamma|_g$ がほとんど至る所一定のとき、かつそのときに限り成立する。さらに、端点を結ぶ絶対連続曲線で速度が二乗可積分なものまで許容すると、

$$
\inf_{\gamma(0)=p,\ \gamma(1)=q}E(\gamma)=\frac12d(p,q)^2
$$

> である。したがってエネルギー最小曲線が存在すれば、それは一定速で距離を達成する曲線である。非定数の場合、その曲線は最短測地線となる。
<!-- formal-statement-end -->

**証明の見取り図。** 最初の不等式は区間 $[0,1]$ 上の Cauchy–Schwarz 不等式です。距離は全ての接続曲線の長さの下限なので二つ目が従います。逆向きの下限評価には「任意の接続曲線を長さを変えず一定速に進み直せる」という弧長再パラメータ化を使います。最後に長さ最小曲線の角が消える局所理論を適用します。

<!-- proof-start -->
### 証明

Cauchy–Schwarz 不等式を関数 $1$ と $|\dot\gamma|_g$ に適用すると

$$
\left(\int_0^1|\dot\gamma|_g\,dt\right)^2
\le
\left(\int_0^1 1^2\,dt\right)
\left(\int_0^1|\dot\gamma|_g^2\,dt\right)
=2E(\gamma).
$$

Cauchy–Schwarz の等号条件は二関数が比例することなので、速さがほとんど至る所一定という条件になります。一方で [GEO15 の最短測地線の定義](../../../幾何系/GEO/GEO15/index.md#def-geo15-minimizing-geodesic)に使う距離は長さの下限だから $L(\gamma)\ge d(p,q)$ です。

下限が等しいことも示します。$p=q$ のときは定数曲線が $E=0=d(p,q)^2/2$ を達成するので、以下では $p\ne q$ とします。距離の定義から、任意の $\varepsilon>0$ について区分的 $C^1$ 曲線 $\alpha$ で

$$
L(\alpha)<d(p,q)+\varepsilon
$$

となるものが取れます。$\alpha$ の弧長関数 $s(t)=\int_0^t|\dot\alpha(u)|_g,du$ を定め、全長 $L(\alpha)>0$ で割って新しい時刻 $s/L(\alpha)$ とします。停止している区間は一点へ縮めて進み直すと、一定速の絶対連続曲線 $\widetilde\alpha$ が得られます。このとき端点と長さは不変で、速度の大きさがほとんど至る所 $L(\alpha)$ となるので

$$
E(\widetilde\alpha)=\frac12L(\alpha)^2
<
\frac12\bigl(d(p,q)+\varepsilon\bigr)^2.
$$

すべての許容曲線に対する下界 $E\ge d^2/2$ と合わせ、$\varepsilon\downarrow0$ で下限の式が従います。エネルギー最小曲線なら二つの不等式がともに等号となり、一定速かつ $L=d$ です。距離を達成する曲線の各短い部分弧も距離を達成します。任意の通過点 $x$ を含む十分小さい [凸正規近傍](../../../幾何系/GEO/GEO14/index.md#thm-geo14-convex-normal-existence)内で部分弧の両端 $a,b$ を取ると、[放射測地線の最短性](../../../幾何系/GEO/GEO14/index.md#thm-geo14-radial-minimizing)により $a,b$ 間の一意な局所最短測地線片があります。もとの部分弧は大域的に最短なのでこの測地線片と同じ長さであり、三角不等式が途中点ごとに等号になることから同じ軌跡を進みます。さらにエネルギーの等号条件で速度が一定なので、局所的にはこの測地線をアフィンパラメータでたどります。これを全ての通過点に適用すれば、非定数の最小曲線は滑らかな測地線です。$\square$
<!-- proof-end -->

この命題は**下限の値**を保証しますが、下限が達成されることまでは保証しません。ここが次の論点です。また、停止点のある曲線の一定速化を扱えるよう、下限に関する許容クラスは絶対連続曲線へ拡げています。固定端点の滑らかな変分を導入する [VAR1](../VAR1/index.md) と、ここで使う許容クラスを混同しないでください。

---

## 2. 正規球では半径方向が最短、凸正規近傍では二点間が一意

点 $p$ の近くで [GEO14 の指数写像](../../../幾何系/GEO/GEO14/index.md#def-geo14-exponential-map)を考えます。原点付近の接ベクトルを測地線の時刻1での点に写す道具です。小さい半径ではこれは座標になります。ただし「$p$ からの放射線が最短」と「その球内の**任意の二点**の最短経路が球内に一意にある」は異なる性質です。

<a id="prop-var6-normal-convex"></a>
<!-- formal-statement-start -->
> **命題（正規球と凸正規近傍での最短性）**  
> 連結な有限次元 Riemann 多様体 $(M,g)$ の点 $p$ について、十分小さい $\rho>0$ を取る。$\exp_p$ が $B_\rho(0)\subset T_pM$ から正規近傍 $U$ への微分同相写像となるなら、$|v|<\rho$ に対し、放射測地線 $t\mapsto\exp_p(tv)$（$0\le t\le1$）は $p$ から $\exp_p(v)$ までの距離を実現し、

$$
d(p,\exp_p(v))=|v|
$$

> である。さらに、$p$ を含む十分小さい凸正規近傍 $V$ を選べば、$x,y\in V$ を結ぶ $V$ 内の測地線片は一意であり、$x,y$ の間の距離を実現する。
<!-- formal-statement-end -->

**直接例。** $\mathbb R^2$ の標準計量で $\exp_p(v)=p+v$ です。$p=(0,0)$、$v=(3/5,4/5)$ なら放射線の速さは $|v|=1$、長さも $1$ です。また Euclid 円板は凸集合なので、その内部の二点を結ぶ線分は円板から出ず、線分の長さは $|y-x|$ です。正規近傍と凸正規近傍の各条件が具体的に確認できます。

**証明の見取り図。** 前半は Gauss の補題から得た放射測地線の最短性を $v$ に適用します。後半は任意の二点ごとに正規座標が取れるように近傍を縮め、測地線の一意性と最短性を合わせます。

<!-- proof-start -->
### 証明

前半は [GEO14 の正規球での基点からの距離公式](../../../幾何系/GEO/GEO14/index.md#cor-geo14-normal-distance)を点 $p$、接ベクトル $v$ にそのまま適用したものです。実際、この放射線は初速度 $v$ の測地線なので [測地線の速さ一定](../../../幾何系/GEO/GEO14/index.md#prop-geo14-constant-speed)より長さは

$$
\int_0^1|\dot\gamma(t)|_g\,dt=\int_0^1|v|\,dt=|v|.
$$

[GEO14 の放射測地線の最短性](../../../幾何系/GEO/GEO14/index.md#thm-geo14-radial-minimizing)が他の接続曲線の長さをこれ以上とするので等号が成立します。

後半の近傍 $V$ の存在と二点間の一意な測地線の構成は [凸正規近傍の存在定理](../../../幾何系/GEO/GEO14/index.md#thm-geo14-convex-normal-existence)に従います。その測地線は各端点に関する十分小さな正規球での放射測地線なので、前半の最短性を適用できます。$\square$
<!-- proof-end -->

「正規球」だけでは二点間の全組に対する一意性を主張しません。また正規座標が存在する半径と、後述する切断時刻は別物です。小さい場所での一意性を大域的な一意性へ延長することはできません。

---

## 3. 大域の存在には何が必要か：完備性と穴あき平面

局所最短性だけから全域の存在を導こうとすると、下限へ近づく曲線が空間の欠けた点へ逃げるおそれがあります。これを防ぐ一つの十分条件が Riemann 距離についての完備性です。

<a id="prop-var6-complete-energy-minimizer"></a>
<!-- formal-statement-start -->
> **命題（完備な有限次元 Riemann 多様体でのエネルギー最小曲線の存在）**  
> $(M,g)$ を連結、有限次元で Riemann 距離に関して完備な Riemann 多様体とする。任意の $p,q\in M$ に対し、一定速の最短測地線 $\gamma:[0,1]\to M$ が存在する。この曲線は端点を固定した絶対連続・有限エネルギー曲線の中で

$$
E(\gamma)=\frac12d(p,q)^2
$$

> を達成する。$p=q$ なら定数曲線を取れる。存在は保証されるが、一意性は一般に保証されない。
<!-- formal-statement-end -->

**証明の見取り図。** 完備性から一般の [Hopf–Rinow の定理](../../../幾何系/GEO/GEO15/index.md#thm-geo15-hopf-rinow)によって長さを最小化する測地線を得ます。最後は本章第1節の長さとエネルギーの比較です。ここに「曲線空間のコンパクト性」を勝手に仮定する必要はありません。

<!-- proof-start -->
### 証明

$(M,g)$ は連結・有限次元・距離完備だから、[GEO15 の Hopf–Rinow の定理](../../../幾何系/GEO/GEO15/index.md#thm-geo15-hopf-rinow)の条件1を満たします。同定理の結論より $p,q$ を結ぶ最短測地線 $\sigma$ が存在します。$p\ne q$ のとき一定速で $[0,1]$ に再パラメータ化し、

$$
|\dot\gamma|_g=d(p,q)
$$

とします。すると

$$
L(\gamma)=\int_0^1d(p,q)\,dt=d(p,q),
$$

$$
E(\gamma)=\frac12\int_0^1d(p,q)^2\,dt=\frac12d(p,q)^2.
$$

任意の競争曲線 $\alpha$ に対して [本章のエネルギー下界](#prop-var6-energy-distance)を適用すると $E(\alpha)\ge d(p,q)^2/2$ なので $\gamma$ はエネルギー最小です。$p=q$ の場合、定数曲線のエネルギーは0で、エネルギーは常に非負です。$\square$
<!-- proof-end -->

**完備性を落としたとき。** 穴あき平面 $M=\mathbb R^2\setminus\{(0,0)\}$ に標準 Euclid 計量を入れ、$p=(-1,0)$、$q=(1,0)$ を取ります。任意の接続曲線の長さは Euclid 距離 $2$ 以上です。半径 $\varepsilon\in(0,1)$ の上半円に迂回する曲線を、水平線分と半円でつなぐと

$$
L_\varepsilon=(1-\varepsilon)+\pi\varepsilon+(1-\varepsilon)
=2+(\pi-2)\varepsilon\longrightarrow2.
$$

よって $d_M(p,q)=2$ ですが、長さ2を達成する曲線はありません。なぜなら Euclid 空間で二点間の距離に等しい長さの曲線は線分上を単調に進むしかなく、その線分は削除された原点を通るからです。従って [本章のエネルギー下限](#prop-var6-energy-distance)の値は $2$ でも、それを達成する曲線は存在しません。**定理の完備性を失うと、最小化列の極限が空間の外へ出てしまう**という機構が明示されました。

他方、開 Euclid 球は完備でなくても任意の二点間に最短線分があります。したがって「完備なら最短が存在」は十分条件ですが、「最短があれば完備」は一般には偽です。

---

## 4. 球面：最短測地線は存在しても一意とは限らない

半径 $R>0$ の球面 $S^2_R$ で、$p,q$ がなす中心角を $\theta\in[0,\pi]$ とします。大円は測地線ですが、大円をどの方向へどこまでたどっても最短とは限りません。北極から南極へは無数の半大円があり、それぞれ長さ $\pi R$ です。

<a id="prop-var6-sphere-distance"></a>
<!-- formal-statement-start -->
> **命題（球面の距離と切断時刻）**  
> 標準計量を入れた半径 $R$ の球面 $S^2_R$ 上の $p,q$ について、$\theta=\arccos(\langle p,q\rangle/R^2)\in[0,\pi]$ とする。このとき

$$
d_{S^2_R}(p,q)=R\theta.
$$

> $0<\theta<\pi$ では短い大円弧が唯一の最短測地線である。$\theta=\pi$ では異なる無数の半大円弧が最短測地線になる。任意の $p$ からの各単位方向の切断時刻は $\pi R$ で、切断点集合は対蹠点一個からなる。
<!-- formal-statement-end -->

**証明の見取り図。** 大円弧を構成すれば距離の上界 $R\theta$ が出ます。逆の下界には、任意の競争曲線に沿って中心角が増える速さは弧長速度を $R$ で割ったもの以下、という微分不等式を使います。一意性は不等式の等号条件から出ます。

<!-- proof-start -->
### 証明

$p$ を北極に回転してよいので、$u=p/R$ と置きます。$q\ne\pm p$ なら $u$ と直交する単位ベクトル $w$ が一意に取れ、

$$
q=R(\cos\theta\,u+\sin\theta\,w)
$$

となります。大円弧

$$
\sigma(s)=R(\cos s\,u+\sin s\,w),
\qquad 0\le s\le\theta
$$

を考えると

$$
\sigma'(s)=R(-\sin s\,u+\cos s\,w),
\qquad |\sigma'(s)|=R,
$$

なので $L(\sigma)=R\theta$、したがって $d(p,q)\le R\theta$ です。$q=p$ なら定数曲線が長さ0を達成します。$q=-p$ なら $u$ に直交する任意の単位ベクトル $w$ を選び、同じ式の $0\le s\le\pi$ を使えば長さ $\pi R$ の半大円が得られます。従って $\theta=0,\pi$ の場合も距離の上界 $d(p,q)\le R\theta$ が成立します。

逆向きを任意の区分的 $C^1$ 曲線 $x(t)$ に対して示します。$x(t)\ne\pm p$ の部分で $\varphi(t)=\arccos(u\cdot x(t)/R)$ と置きます。$\cos\varphi=(u\cdot x)/R$ を微分すると

$$
-\sin\varphi\,\varphi'
=\frac{u\cdot x'}{R}.
$$

接ベクトル $x'$ は $x$ と直交するので、右辺の内積の $u$ は接空間への射影 $u-\cos\varphi\,x/R$ に置き換えられます。この射影のノルムは

$$
|u-\cos\varphi\,x/R|^2
=1-2\cos^2\varphi+\cos^2\varphi
=\sin^2\varphi.
$$

Cauchy–Schwarz より $|u\cdot x'|\le\sin\varphi\,|x'|$、従って

$$
|\varphi'(t)|\le\frac{|x'(t)|}{R}.
$$

ただし $x(t)=p$ または $x(t)=-p$ では $\sin\varphi=0$ なので、この微分の式を直接使えません。北極や南極を繰り返し通る曲線も一度に扱うため、$\varepsilon>0$ に対して

$$
\psi_\varepsilon(t)
=
\arccos\left(\frac{u\cdot x(t)}{R(1+\varepsilon)}\right)
$$

を考えます。$\arccos$ の引数の絶対値は $1/(1+\varepsilon)<1$ 以下なので、$\psi_\varepsilon$ は極であっても区分的 $C^1$ です。先ほどの接空間への射影の評価 $|u\cdot x'|\le\sin\varphi\,|x'|$ を使うと、

$$
|\psi_\varepsilon'|
=
\frac{|u\cdot x'|}
{R\sqrt{(1+\varepsilon)^2-\cos^2\varphi}}
\le
\frac{\sin\varphi\,|x'|}
{R\sqrt{\sin^2\varphi+2\varepsilon+\varepsilon^2}}
\le\frac{|x'|}{R}.
$$

ここでは $\sin\varphi\ge0$ であり、分母が正なので、$x(t)=\pm p$ の場合も不等式が成り立ちます。区分的 $C^1$ 関数に積分の基本定理を適用すると、任意の $0\le s<t\le1$ に対し

$$
|\psi_\varepsilon(t)-\psi_\varepsilon(s)|
\le\int_s^t|\psi_\varepsilon'(r)|\,dr
\le\frac1R\int_s^t|x'(r)|\,dr.
$$

$\varepsilon\downarrow0$ とすれば $\psi_\varepsilon(r)\to\varphi(r)$ なので

$$
|\varphi(t)-\varphi(s)|
\le\frac1R L(x|_{[s,t]}).
$$

特に $s=0,\ t=1$ では $\varphi(0)=0,\ \varphi(1)=\theta$ より $L(x)\ge R\theta$、すなわち距離公式が従います。

$0<\theta<\pi$ で最短曲線 $x$ の長さが $R\theta$ に等しい場合、任意の $t\in[0,1]$ に対し、上の部分区間の評価を両側で使うと

$$
R\theta=L(x|_{[0,t]})+L(x|_{[t,1]})
\ge R\varphi(t)+R|\theta-\varphi(t)|
\ge R\theta
$$

となります。全て等号なので $\varphi(t)\le\theta$ かつ $L(x|_{[0,t]})=R\varphi(t)$ です。従って $\varphi$ は減少せず、部分弧長の積分を微分して

$$
\varphi'(t)=\frac{|x'(t)|}{R}
\quad\text{（ほとんど至る所）}
$$

を得ます。

$0<\varphi<\pi$ の区間では

$$
x(t)=R\bigl(\cos\varphi(t)\,u+\sin\varphi(t)\,w(t)\bigr),
\quad |w(t)|=1,\quad u\cdot w(t)=0
$$

と書けます。$w\cdot w'=0$ と $u\cdot w'=0$ を用いて微分し、直交する項の二乗ノルムを足すと

$$
|x'|^2
=R^2\bigl(\varphi'^2+\sin^2\varphi\,|w'|^2\bigr).
$$

$|x'|=R\varphi'$ だから $\sin\varphi\,|w'|=0$、つまり内部では $w'=0$ です。また $\varphi$ は減少しないので、いったん北極を離れてから戻ることはありません。従って $w$ は端点 $q$ で決まる一定方向となり、最短曲線の軌跡は先に構成した短い大円弧に限られます。$\theta=\pi$ のときは終点 $q=-p$ が $w$ によらないので、$u$ に直交するどの単位ベクトル $w$ でも長さ $\pi R$ の最短半大円が得られます。

一方向の単位速大円 $\gamma(t)=R(\cos(t/R)\,u+\sin(t/R)\,w)$ で $0\le t\le\pi R$ は距離を達成します。しかし $\pi R<t<2\pi R$ なら、距離公式から

$$
d(p,\gamma(t))=R\bigl(2\pi-t/R\bigr)=2\pi R-t<t.
$$

[GEO15 の切断時刻の定義](../../../幾何系/GEO/GEO15/index.md#def-geo15-cut-time)より切断時刻は $\pi R$、切断点集合は $\{-p\}$ です。$\square$
<!-- proof-end -->

この $\pi R$ は [VAR5 の球面 Jacobi 場](../VAR5/index.md#prop-var5-sphere-variation)が再び零になる時刻でもあります。ただし「切断点」と「共役点」が常に一致するのではありません。次の平坦トーラスが、**曲率がゼロでも複数経路の競合によって切断が生じる**例になります。

---

## 5. 平坦トーラス：格子の最短代表が答えを決める

一辺が $2\pi$ の正方形の対辺を同一視して得る平坦トーラス

$$
T^2=\mathbb R^2/(2\pi\mathbb Z)^2
$$

を考えます。点は実数ベクトルの同値類 $[x]$、計量は平面の標準計量から誘導したものです。被覆平面上の直線はトーラスへ下ろしても測地線ですが、終点へ行く直線の候補は格子だけ無数にあります。

<a id="prop-var6-flat-torus-distance"></a>
<!-- formal-statement-start -->
> **命題（平坦トーラスの距離と切断点集合）**  
> $T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ に標準平坦計量を入れ、$p=[0]$、$q=[(a,b)]$ とする。距離は

$$
d_{T^2}(p,q)
=
\min_{(m,n)\in\mathbb Z^2}
\sqrt{(a+2\pi m)^2+(b+2\pi n)^2}.
$$

> 最小を達成する格子対 $(m,n)$ の数が、定数速最短測地線の本数に等しい。$p$ の切断点集合は、基本領域 $[-\pi,\pi]^2$ の辺の同一視像、すなわち $a=\pi\pmod{2\pi}$ または $b=\pi\pmod{2\pi}$ の点全体である。
<!-- formal-statement-end -->

**直接例。** $q=[(\pi/2,\pi/3)]$ は格子最短代表がただ一つなので最短測地線も一本です。一方 $q=[(\pi,0)]$ では $(\pi,0)$ と $(-\pi,0)$ の二本の同じ長さの線分が異なる最短測地線を与えます。頂点 $[(\pi,\pi)]$ では $(\pm\pi,\pm\pi)$ の四本が同じ最短長 $\pi\sqrt2$ を与えます。

**証明の見取り図。** トーラス上の接続曲線を平面へ持ち上げると、終点は必ず格子分だけ平行移動した代表になります。Euclid 平面での最短経路は線分なので、格子点までの距離の最小値を取ればよいのです。

<!-- proof-start -->
### 証明

トーラス上の区分的 $C^1$ 曲線 $\gamma$ を、初点が $0$ となるように平面へ持ち上げて $\widetilde\gamma$ とします。持ち上げは同一視写像が局所的に等長な座標写像であることから、小区間で逆座標を連続して選ぶことで構成できます。終点はある $(m,n)\in\mathbb Z^2$ に対して

$$
\widetilde\gamma(1)=(a+2\pi m,b+2\pi n)
$$

です。局所等長性から曲線の速さは持ち上げで保たれ、従って長さも保たれます。平面で速度を積分して得る終点間の距離が曲線の長さ以下であることから

$$
L(\gamma)=L(\widetilde\gamma)
\ge|\widetilde\gamma(1)-\widetilde\gamma(0)|
=\sqrt{(a+2\pi m)^2+(b+2\pi n)^2}.
$$

逆に各 $(m,n)$ について、原点から $(a+2\pi m,b+2\pi n)$ への線分

$$
\widetilde\gamma_{m,n}(t)
=t(a+2\pi m,b+2\pi n)
$$

をトーラスへ下ろすと、長さが右辺に等しい一定速測地線です。従って全ての格子対について最小を取った式が距離になります。ノルムは $|m|+|n|\to\infty$ で発散するので最小値は必ず達成されます。

固定した $a$ に対する $|a+2\pi m|$ の最小代表は $(-\pi,\pi)$ の内部では一意で、剰余が $\pi$ の場合だけ $\pi$ と $-\pi$ の二つが同率です。$b$ も独立に同じ判定を持ちます。よって両座標が内部なら一本、辺上なら二本、頂点なら四本です。

この最小代表を放射方向へ進めると、基本領域の内部では長さと距離が一致します。一度最初の辺を越えると、該当座標を $2\pi$ ずらした方が短くなり、放射測地線は最短性を失います。[切断時刻と切断点集合の定義](../../../幾何系/GEO/GEO15/index.md#def-geo15-cut-point-locus)から結論の集合が得られます。$\square$
<!-- proof-end -->

平坦トーラスの断面曲率は0なので、[GEO17 の非正曲率では共役点がないという命題](../../../幾何系/GEO/GEO17/index.md#prop-geo17-nonpositive-no-conjugate)が適用できます。それにもかかわらず切断点は存在します。つまり**Jacobi 場の退化がなくても、異なる最短経路の競合によって一意性と大域最短性は壊れる**のです。

---

## 6. 曲線の極小化は「点の極小化」より一段難しい

[Hopf–Rinow](../../../幾何系/GEO/GEO15/index.md#thm-geo15-hopf-rinow)で完備性から閉有界な**点集合**のコンパクト性が従うとしても、そこからただちに**曲線の集合**の強い微分可能性まで従うわけではありません。例えば Euclid 平面の曲線

$$
\gamma_n(t)=\left(t,\frac{\sin(2\pi nt)}{2\pi n}\right),
\qquad 0\le t\le1
$$

は全て $(0,0)$ から $(1,0)$ を結び、位置としては一様に $\gamma(t)=(t,0)$ に近づきます。しかし

$$
\dot\gamma_n(t)=(1,\cos(2\pi nt)),
$$

$$
E(\gamma_n)
=\frac12\int_0^1(1+\cos^2(2\pi nt))\,dt
=\frac34
$$

であり、導関数は $\dot\gamma=(1,0)$ に一様収束しません。したがって $C^0$ での収束と $C^1$ での収束を同一視できません。またこの列はエネルギー最小化列ではありません。**有界なエネルギーから直ちに強い導関数収束を推論できない**ことを示す反例です。

今後の直接法では、適切な曲線空間で有界な最小化列を作り、弱収束・弱下半連続性・端点条件の保存を別々に検証する必要があります。そこは後続の VAR9〜10 で証明します。本章では有限次元 Riemann 幾何の Hopf–Rinow から存在を得ており、弱収束定理を無断で代入してはいません。

---

## 7. 演習：存在・一意性・切断を別々に判定する

### Level A

<a id="ex-var6-a01"></a>
#### VAR6-A01 同じ線分でエネルギーだけ変わる
- Level: A

Euclid 直線で $\gamma(t)=t$ と $\eta(t)=t^3$（$0\le t\le1$）について、長さとエネルギーを求めよ。各曲線は距離最小か、エネルギー最小か判定せよ。

<!-- solution-start -->
### 詳細解答

両曲線とも単調増加し、始点0・終点1なので

$$
L(\gamma)=\int_0^1 1\,dt=1,
\qquad
L(\eta)=\int_0^1 3t^2\,dt=[t^3]_0^1=1.
$$

一方

$$
E(\gamma)=\frac12\int_0^1 1^2\,dt=\frac12,
$$

$$
E(\eta)=\frac12\int_0^1 9t^4\,dt
=\frac92\left[\frac{t^5}{5}\right]_0^1
=\frac9{10}.
$$

二点間距離は1なので両曲線は長さ最小ですが、[本章のエネルギー下界](#prop-var6-energy-distance)は $E\ge1/2$ であり、等号は一定速に限ります。従ってエネルギー最小なのは $\gamma$ だけです。
<!-- solution-end -->

<a id="ex-var6-a02"></a>
#### VAR6-A02 正規球の放射線の長さ
- Level: A

$\mathbb R^2$ の $p=(1,2)$ と $v=(3,4)$ を取り、$\sigma(t)=\exp_p(tv)$（$0\le t\le1$）について終点と長さ・エネルギーを計算し、距離との一致を確認せよ。

<!-- solution-start -->
### 詳細解答

Euclid 計量の指数写像は $\exp_p(w)=p+w$ なので

$$
\sigma(t)=(1+3t,2+4t),
\qquad \sigma(1)=(4,6).
$$

速度は $\dot\sigma=(3,4)$、ノルムは $\sqrt{3^2+4^2}=5$ です。よって

$$
L(\sigma)=\int_0^1 5\,dt=5,
\qquad
E(\sigma)=\frac12\int_0^1 25\,dt=\frac{25}{2}.
$$

端点距離は $\sqrt{(4-1)^2+(6-2)^2}=5$ なので、[正規球での放射線の最短性](#prop-var6-normal-convex)の式 $d(p,\exp_p(v))=|v|=5$ を確認できます。
<!-- solution-end -->

<a id="ex-var6-a03"></a>
#### VAR6-A03 穴あき平面に最短曲線がない
- Level: A

$\mathbb R^2\setminus\{0\}$ の $p=(-1,0)$ と $q=(1,0)$ について、半径 $\varepsilon$ の上半円を通る迂回路の長さを求め、距離の下限と最小曲線の存在を判定せよ。

<!-- solution-start -->
### 詳細解答

左から $(-\varepsilon,0)$ までと、$(\varepsilon,0)$ から右端までの二線分の長さはそれぞれ $1-\varepsilon$ です。半円弧の長さは $\pi\varepsilon$ なので

$$
L_\varepsilon=2(1-\varepsilon)+\pi\varepsilon
=2+(\pi-2)\varepsilon.
$$

全ての曲線は Euclid 距離2以上なので $d_M(p,q)\ge2$。上の曲線から $d_M(p,q)\le \lim_{\varepsilon\downarrow0}L_\varepsilon=2$ です。従って $d_M=2$。

もし長さ2を達成する曲線があれば、Euclid 空間での三角不等式の等号条件から線分 $[p,q]$ を単調に通る必要があります。しかしその線分は削除点0を通ります。したがって最短曲線は存在しません。これは [完備性を使う本章の存在命題](#prop-var6-complete-energy-minimizer)の仮定を失った例です。
<!-- solution-end -->

<a id="ex-var6-a04"></a>
#### VAR6-A04 球面での距離と最短曲線の本数
- Level: A

単位球面上の北極 $p=(0,0,1)$ から $q=(1,0,0)$、および南極 $r=(0,0,-1)$ までの距離と最短測地線の本数を答えよ。

<!-- solution-start -->
### 詳細解答

内積は $\langle p,q\rangle=0$ なので中心角は $\arccos 0=\pi/2$ です。[球面の距離と切断時刻](#prop-var6-sphere-distance)より

$$
d(p,q)=\frac\pi2.
$$

中心角が $\pi$ 未満なので、$p$ から $q$ への短い子午線弧が唯一の最短測地線です。一方 $\langle p,r\rangle=-1$ だから中心角は $\pi$、よって

$$
d(p,r)=\pi.
$$

任意の水平単位ベクトル $w=(\cos\alpha,\sin\alpha,0)$ について

$$
\sigma_\alpha(s)=(\sin s\cos\alpha,\sin s\sin\alpha,\cos s),
\quad 0\le s\le\pi
$$

は長さ $\pi$ の半大円なので、南極までの最短測地線は無数にあります。
<!-- solution-end -->

### Level B

<a id="ex-var6-b01"></a>
#### VAR6-B01 球面で切断時刻を越えると距離は短くなる
- Level: B

半径 $R$ の球面で単位速大円 $\gamma(t)$ を $p$ から出発させる。$0\le t\le2\pi R$ について $d(p,\gamma(t))$ を場合分けして求め、切断時刻を確認せよ。

<!-- solution-start -->
### 詳細解答

単位速の大円では初点 $p$ との中心角の余弦は $\cos(t/R)$ です。[球面距離公式](#prop-var6-sphere-distance)から

$$
d(p,\gamma(t))
=R\arccos(\cos(t/R)).
$$

$0\le t/R\le\pi$ なら $\arccos(\cos(t/R))=t/R$、$\pi\le t/R\le2\pi$ なら $2\pi-t/R$ です。よって

$$
d(p,\gamma(t))=
\begin{cases}
t,&0\le t\le\pi R,\\
2\pi R-t,&\pi R\le t\le2\pi R.
\end{cases}
$$

区間 $[0,\pi R]$ では距離と進んだ長さが等しく、直後では距離 $2\pi R-t<t$ となります。[切断時刻の定義](../../../幾何系/GEO/GEO15/index.md#def-geo15-cut-time)より $\pi R$ が切断時刻です。切断点そのものでは依然として最短である点にも注意します。
<!-- solution-end -->

<a id="ex-var6-b02"></a>
#### VAR6-B02 トーラスの二経路・四経路を格子で計算する
- Level: B

$T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ の原点から $q=[(\pi,\pi/3)]$、$r=[(\pi,\pi)]$ への距離、最短線分の持ち上げ、および本数を計算せよ。

<!-- solution-start -->
### 詳細解答

[トーラスの格子最短代表公式](#prop-var6-flat-torus-distance)を用います。$q$ の第一座標の最短代表は $\pi$ と $-\pi$、第二座標は $\pi/3$ の一つだけです。よって代表は $(\pi,\pi/3)$ と $(-\pi,\pi/3)$ の二つで、

$$
d(p,q)=\sqrt{\pi^2+\frac{\pi^2}{9}}
=\frac{\pi\sqrt{10}}3.
$$

対応する持ち上げ線分は $t(\pi,\pi/3)$ と $t(-\pi,\pi/3)$（$0\le t\le1$）です。$r$ の二座標は各々 $\pm\pi$ が同率なので代表は $(\pi,\pi)$、$(\pi,-\pi)$、$(-\pi,\pi)$、$(-\pi,-\pi)$ の四つです。いずれもノルムは $\pi\sqrt2$ なので

$$
d(p,r)=\pi\sqrt2,
$$

最短測地線は四本です。どちらも基本領域の境界に対応し、切断点集合に属します。
<!-- solution-end -->

<a id="ex-var6-b03"></a>
#### VAR6-B03 エネルギー有界でも導関数が一様収束しない
- Level: B

$\gamma_n(t)=(t,\sin(2\pi nt)/(2\pi n))$ について、端点、位置の一様収束、エネルギー、および導関数の一様収束の成否を調べよ。$n$ は正整数とする。

<!-- solution-start -->
### 詳細解答

$t=0$ と $t=1$ で $\sin(2\pi nt)=0$ なので、端点は全て $(0,0)$ と $(1,0)$ です。

$$
|\gamma_n(t)-(t,0)|
=\frac{|\sin(2\pi nt)|}{2\pi n}
\le\frac1{2\pi n}
$$

から $\gamma_n\to\gamma=(t,0)$ は一様です。導関数は

$$
\dot\gamma_n=(1,\cos(2\pi nt)),
\qquad \dot\gamma=(1,0).
$$

$n$ が整数なので

$$
\int_0^1\cos^2(2\pi nt)\,dt
=\int_0^1\frac{1+\cos(4\pi nt)}2\,dt
=\frac12.
$$

従って

$$
E(\gamma_n)=\frac12(1+\tfrac12)=\frac34,
\qquad E(\gamma)=\frac12.
$$

しかし $t=0$ では $\dot\gamma_n(0)=(1,1)$、$\dot\gamma(0)=(1,0)$ なので

$$
\sup_{t\in[0,1]}|\dot\gamma_n(t)-\dot\gamma(t)|\ge1.
$$

よって導関数は一様収束しません。エネルギーが一様有界でも $C^1$ コンパクト性は出ないのであり、この列が最小化列であると主張しているわけではありません。
<!-- solution-end -->

### Level C

<a id="ex-var6-c01"></a>
#### VAR6-C01 曲率ゼロでも切断点は現れる
- Level: C

平坦トーラス $T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ で $p=[0]$ とする。

1. $q=[(3\pi/4,\pi/2)]$ と $r=[(\pi,\pi/2)]$ について最短測地線の数・距離を格子最短代表から求めよ。
2. $p$ から $r$ へ向かう最短線分を少し先へ延長すると最短性を失うことを、格子代表を変更して示せ。
3. この例で共役点が現れない理由を [Jacobi 方程式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-geodesic-variation-jacobi)から説明し、切断点と共役点の違いを述べよ。

<!-- solution-start -->
### 詳細解答

**1.** $q$ の最短代表は $(3\pi/4,\pi/2)$ の一つです。各座標が $(-\pi,\pi)$ の内部にあるからです。[平坦トーラスの距離と切断点集合](#prop-var6-flat-torus-distance)より

$$
d(p,q)=\sqrt{\frac{9\pi^2}{16}+\frac{\pi^2}{4}}
=\frac{\pi\sqrt{13}}4
$$

で、最短測地線は一本です。$r$ では第一座標 $\pi$ と $-\pi$ が同率、第二座標 $\pi/2$ は一意です。従って最短代表は $(\pi,\pi/2)$、$(-\pi,\pi/2)$ の二つで、

$$
d(p,r)=\sqrt{\pi^2+\frac{\pi^2}{4}}
=\frac{\pi\sqrt5}{2}.
$$

二本の最短測地線があります。

**2.** 原点から $(\pi,\pi/2)$ へ進む直線を $t\mapsto[t(\pi,\pi/2)]$（$t\ge0$）とします。$t=1+\delta$（$0<\delta<1$）ではこのまま進んだ長さは

$$
L_{\mathrm{forward}}=(1+\delta)\frac{\pi\sqrt5}{2}.
$$

しかし同じ終点の別代表は、第一座標から $2\pi$ を引いた

$$
((\delta-1)\pi,(1+\delta)\pi/2)
$$

です。その二乗ノルムと元の代表の二乗ノルムの差は

$$
\left((1+\delta)^2-(\delta-1)^2\right)\pi^2
=4\delta\pi^2>0.
$$

第二座標は両代表で同じなので、別代表へ向かう線分の方が厳密に短くなります。従って $r$ はこの方向の切断点です。

**3.** トーラスは平坦なので曲率テンソルは0です。[GEO17 の Jacobi 方程式の導入](../../../幾何系/GEO/GEO17/index.md#def-geo17-jacobi)に従い、測地線上の平行な座標枠で Jacobi 場の成分を $J(t)=A+tB$ と書けます。実際、方程式

$$
D_t^2J+R(J,\dot\gamma)\dot\gamma=0
$$

は $R=0$ により $J''=0$ となるからです。$J(0)=J(T)=0$、$T>0$ なら $A=0$、$TB=0$ より $B=0$、従って非自明な両端零の Jacobi 場はありません。共役点はないのに、複数の格子代表が同じ長さを実現するため $r$ は切断点です。これは共役点と切断点を同一視してはいけない具体例です。
<!-- solution-end -->

---

## 8. 章末チェックと次の講義への接続

本章で区別したのは、**停留**（第一変分が0）、**局所最短**（小さな変分や近傍で短い）、**大域最短**（全ての接続曲線より短い）、**存在**（長さの下限が達成される）、**一意性**（達成曲線が一本しかない）の五つです。球面では全ての二点間に最短曲線が存在しても対蹠点で一意性が失われ、トーラスでは曲率0でも切断点が現れます。穴あき平面では下限値そのものが達成されません。

ここまでは**一次元の曲線の長さ**を最小化しました。次の VAR7 では**二次元の曲面の面積**を変分し、平均曲率が停留条件として現れることを計算します。その先の VAR9 では弱収束・下半連続性を使う直接法へ戻り、Hopf–Rinow とは異なる論法で存在を保証します。
