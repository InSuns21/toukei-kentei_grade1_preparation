# RBD10 Poinsotの構成と物体系／空間系の軌跡

<!-- definition-example-audit: strict -->

[RBD9の無トルク剛体の二不変量](../RBD9/index.md#prop-rbd9-free-invariants)から、物体系の角運動量は球面とエネルギー二次曲面の交線に拘束されることが分かりました。しかし実験室では、物体自身が回転しています。物体に固定した座標で描いた曲線をそのまま実験室の軌跡と呼ぶわけにはいきません。

本講では、**回転する楕円体が固定された平面へ常に接する**という Poinsot の幾何を、接平面の計算から導きます。物体系の接触点の軌跡（polhode）と、空間系の接触点の軌跡（herpolhode）を区別し、姿勢 $R(t)$ を通して対応させます。慣性楕円体の「転がり」は角速度空間の幾何学的表現であり、床に置いた実物体の接触運動とは異なることにも注意します。

## 1. 無トルクの自由回転から出発する

重心まわりの外トルクが零である三次元剛体を考えます。物体に固定した正向き直交主軸基底を選び、主慣性値が $I_i>0$ の場合を扱います。[MECH8の主軸の定義](../../MECH/MECH8/index.md#def-mech8-principal-axis)と[RBD6の慣性テンソルの正定値性](../RBD6/index.md#prop-rbd6-positivity)により、質量分布の正則な三次元剛体では次の正定値な行列で表せます。

$$
J_b=\operatorname{diag}(I_1,I_2,I_3),\qquad
\omega_b(t)\in\mathbb R^3,\qquad
L_b(t)=J_b\omega_b(t).
$$

$R(t)\in SO(3)$ は物体系の成分を空間系に移す能動回転であり、$R(0)=R_0$ とします。[RBD3の角速度と回転の関係](../RBD3/index.md#prop-rbd3-angular-conjugacy)および[RBD7のNewton–Euler方程式](../RBD7/index.md#thm-rbd7-newton-euler)から、無トルクでは

$$
\dot R=R\widehat{\omega}_b,\qquad
J_b\dot\omega_b+\omega_b\times J_b\omega_b=0,\qquad
L_s=R L_b=L_0
$$

です。帽子記号は $\widehat u\,v=u\times v$ を表します。$L_0$ は空間系の時間一定ベクトルです。[RBD9の不変量](../RBD9/index.md#prop-rbd9-free-invariants)を再掲すると

$$
2E=\omega_b^{\mathsf T}J_b\omega_b
=\omega_s^{\mathsf T}J_s\omega_s>0,\qquad
\ell^2=|L_b|^2=|L_0|^2>0,
$$

$$
\omega_s=R\omega_b,\qquad J_s=RJ_bR^{\mathsf T}.
$$

ここでは非静止解 $\omega_b\ne0$ を仮定するので $E,\ell>0$ です。$\omega_b=0$ なら両者とも零で、後の「不変平面」の方程式は非自明な平面を定めません。

## 2. 接触点の候補となる慣性楕円体

エネルギーが同じ角速度を全て集めると、正定値な二次曲面ができます。物体に固定した座標で角速度の端点を描けば、楕円体の上を動きます。この曲面をそのまま空間に持ち出すには、時刻ごとに $R(t)$ を掛ける必要があります。

<a id="def-rbd10-energy-ellipsoid"></a>

<!-- formal-statement-start -->
### 定義（エネルギー楕円体と空間表示）

正定値対称行列 $J_b$ と定数 $E>0$ に対し、物体系の**エネルギー楕円体**を

$$
\mathcal E_b(E)=\{u\in\mathbb R^3:u^{\mathsf T}J_bu=2E\}
$$

とする。姿勢 $R\in SO(3)$ における空間系の楕円体は

$$
\mathcal E_s(t)=R(t)\mathcal E_b(E)
=\{x\in\mathbb R^3:x^{\mathsf T}J_s(t)x=2E\}
$$

である。楕円体の中心は両座標系で原点とし、剛体の重心を原点へ平行移動して考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd10-energy-ellipsoid -->
### 直接例：主慣性値 $(2,3,4)$ の場合

**定義の確認**：三つの係数が正であること、初期角速度が実際に曲面上にあること、姿勢による変換が同じ方程式を与えることを確認します。

$I_1=2,I_2=3,I_3=4$ とし、$\omega_b(0)=(1,1,1)$、$R_0=\mathrm{Id}_3$（$3$ 次単位行列）とします。この慣性値は[RBD6の主慣性値の三角不等式](../RBD6/index.md#prop-rbd6-inertia-triangle) $4\le2+3$ を満たします。

$$
2E=2+3+4=9,\qquad
\mathcal E_b(9/2)=\{u:2u_1^2+3u_2^2+4u_3^2=9\}.
$$

係数が全て正なので各座標の切片は $\sqrt{9/2},\sqrt3,3/2$ で、集合は有界な楕円体です。$(1,1,1)$ を代入すると左辺が $9$ となり、角速度は曲面上にあります。

一般の直交回転 $R$ に対し $x=Ru$、$u=R^{\mathsf T}x$ なので

$$
u^{\mathsf T}J_bu
=x^{\mathsf T}(RJ_bR^{\mathsf T})x.
$$

したがって空間系では同じ楕円体が回転するのであって、固定された三本の空間座標軸にいつまでも $2,3,4$ を掛けるわけではありません。
<!-- definition-example-end -->

エネルギー一定だけでは、楕円体の**どの点**が接触点となるか、どの平面に接するかは分かりません。もう一つの時間不変な量である、空間で固定された角運動量を使います。

## 3. 接平面はなぜ動かないのか

楕円体 $F(u)=u^{\mathsf T}J_bu-2E=0$ の点 $u$ における接平面は、微小変位 $h$ が一次で $F$ を変えない条件から決まります。実際に展開すると

$$
F(u+\varepsilon h)-F(u)
=2\varepsilon (J_bu)\cdot h
+\varepsilon^2 h^{\mathsf T}J_bh.
$$

従って接平面の法線は $J_bu$ です。とくに $u=\omega_b(t)$ では、法線がその時刻の物体系角運動量 $L_b(t)$ と一致します。

<a id="thm-rbd10-invariable-plane"></a>

<!-- formal-statement-start -->
### 定理（Poinsotの不変平面と接点）

$J_b$ を正定値対称、$R(t)\in SO(3)$ と $\omega_b(t)$ を重心まわりの無トルク剛体の解とし、$E>0$、$\ell=|L_0|>0$ とする。このとき空間楕円体 $\mathcal E_s(t)$ は、全時刻にわたり、時間によらない平面

$$
\Pi=\{x\in\mathbb R^3:L_0\cdot x=2E\}
$$

に点

$$
P_s(t)=R(t)\omega_b(t)=\omega_s(t)
$$

で接する。$\Pi$ の原点からの距離は $d=2E/\ell$、単位法線は $k=L_0/\ell$ である。楕円体の全点は $L_0\cdot x\le2E$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[エネルギー楕円体の定義](#def-rbd10-energy-ellipsoid)に角速度を入れると、現在の点が曲面上にあります。その点の法線 $J_s\omega_s$ は、[無トルクの角運動量保存](../RBD9/index.md#prop-rbd9-free-invariants)により空間の同じ $L_0$ です。さらに法線と接点の内積は $2E$ で一定です。これが平面の固定性の理由です。

<!-- proof-start -->
### 証明

$J_s(t)=RJ_bR^{\mathsf T}$ は正定値対称です。また $P_s=R\omega_b$ なので

$$
P_s^{\mathsf T}J_sP_s
=\omega_b^{\mathsf T}R^{\mathsf T}RJ_bR^{\mathsf T}R\omega_b
=\omega_b^{\mathsf T}J_b\omega_b=2E.
$$

従って $P_s\in\mathcal E_s(t)$ です。空間二次曲面の関数 $F_s(x)=x^{\mathsf T}J_sx-2E$ を時刻 $t$ を固定して微分すると

$$
D F_s(P_s)[h]
=P_s^{\mathsf T}J_sh+h^{\mathsf T}J_sP_s
=2(J_sP_s)\cdot h.
$$

ここで $J_sP_s=RJ_bR^{\mathsf T}R\omega_b=RL_b=L_0$。したがって接平面は

$$
L_0\cdot(x-P_s)=0
\quad\Longleftrightarrow\quad
L_0\cdot x=L_0\cdot P_s
=(RL_b)\cdot(R\omega_b)=2E.
$$

$L_0,E$ は一定だから $\Pi$ は時刻に依存しません。原点から平面への垂線の足は

$$
H=\frac{2E}{|L_0|^2}L_0,\qquad
|H|=\frac{2E}{\ell},\qquad k=\frac{L_0}{\ell}.
$$

最後に楕円体内外の向きを確認します。$x=Ru$、$u^{\mathsf T}J_bu=2E$ とし、正定値行列 $J_b$ による内積のCauchy–Schwarz不等式を、$\omega_b$ と $u$ に適用します。

$$
\begin{aligned}
L_0\cdot x
&=(RJ_b\omega_b)\cdot(Ru)
=\omega_b^{\mathsf T}J_bu\\
&\le
\sqrt{\omega_b^{\mathsf T}J_b\omega_b}\,
\sqrt{u^{\mathsf T}J_bu}
=\sqrt{2E}\sqrt{2E}=2E.
\end{aligned}
$$

等号は正定値内積で $u$ が $\omega_b$ と正の比例関係にあるときだけ成立し、両者の $J_b$-長が等しいため $u=\omega_b$ です。従って接点は一意で、楕円体は平面の片側にあります。
<!-- proof-end -->

**数値で接平面を確認**しましょう。前節の $I=(2,3,4)$、$\omega_b(0)=(1,1,1)$、$R_0=\mathrm{Id}_3$ の例では

$$
L_0=(2,3,4),\quad \ell=\sqrt{29},\quad
\Pi:\ 2x_1+3x_2+4x_3=9,\quad d=\frac9{\sqrt{29}}.
$$

$P_s(0)=(1,1,1)$ は平面上にあり、法線 $(2,3,4)$ は楕円体 $2x_1^2+3x_2^2+4x_3^2=9$ の接点で一次変化を与えるベクトル $(4,6,8)$ に平行です。これは二次式を各座標で微分して求められます。法線を角速度 $(1,1,1)$ と取り違えると、接平面は誤ります。楕円体が球でない限り、角速度と角運動量は通常平行ではありません。

## 4. 二つの軌跡：polhode と herpolhode

曲面と平面が毎時刻一点で接するなら、接点を時間に沿って追跡できます。ただし**どの座標系で点を記録するか**によって二種類の曲線ができます。

<a id="def-rbd10-polhode-herpolhode"></a>

<!-- formal-statement-start -->
### 定義（polhode と herpolhode）

[Poinsotの不変平面](#thm-rbd10-invariable-plane)の仮定の下、物体系での接点の軌跡

$$
\mathcal P=\{\omega_b(t):t\in\mathbb R\}\subset\mathcal E_b(E)
$$

を **polhode（ポルホード）**、空間系での接点の軌跡

$$
\mathcal H=\{R(t)\omega_b(t):t\in\mathbb R\}\subset\Pi
$$

を **herpolhode（ヘルポルホード）** と呼ぶ。特定の時間区間だけを描くときは、その区間の像を軌跡の一部とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd10-polhode-herpolhode -->
### 直接例：主軸だけの自由回転

**定義の確認**：曲線がどの空間に属し、どちらの不変集合上にあるかを座標変換で確かめます。

$I=(2,3,4)$、$\omega_b(t)=(0,0,3/2)$ を考えます。[RBD9の主軸定常回転](../RBD9/index.md#def-rbd9-triaxial-principal-spin)なのでEuler方程式は右辺零で、$\omega_b$ は一定です。$R_0=\mathrm{Id}_3$ とすれば $R(t)$ は第三軸まわりに回転し、$R(t)e_3=e_3$ です。したがって

$$
E=\tfrac12\cdot4\cdot(3/2)^2=\frac92,\quad
L_0=(0,0,6),\quad
\Pi=\{x:x_3=3/2\},
$$

$$
P_b(t)=(0,0,3/2),\qquad P_s(t)=R(t)P_b(t)=(0,0,3/2).
$$

物体は回っていても、両方の軌跡は**一点**です。polhode は物体系のエネルギー楕円体上に、herpolhode は空間の不変平面上にあるという定義を直接満たします。この退化例では、動いている剛体と「動いている接点」を同一視してはいけません。
<!-- definition-example-end -->

一般には、[RBD9の二不変量](../RBD9/index.md#prop-rbd9-free-invariants)から polhode は物体系の二つの二次曲面

$$
\sum_{i=1}^3 I_i\omega_i^2=2E,\qquad
\sum_{i=1}^3 I_i^2\omega_i^2=\ell^2
$$

の交線です。この交線を $L_b=J_b\omega_b$ に移して描けば、[RBD9の角運動量球面と分離曲線](../RBD9/index.md#def-rbd9-separatrix)に戻ります。しかし、herpolhode を同じ交線で描くことはできません。$R(t)$ 自身が動くからです。

<a id="prop-rbd10-contact-kinematics"></a>

<!-- formal-statement-start -->
### 命題（接点の運動と無滑り条件）

[Poinsotの不変平面](#thm-rbd10-invariable-plane)の仮定の下で、楕円体の瞬間的な接点を物体系 $P_b=\omega_b$、空間系 $P_s=RP_b$ とする。このとき

$$
\frac{dP_s}{dt}=R\dot\omega_b,\qquad
L_0\cdot\frac{dP_s}{dt}=0.
$$

一方、時刻 $t$ に $P_b(t)$ の物体固定座標を持つ楕円体の**物質点**の瞬間速度は零である。従って回転する楕円体は不変平面上を瞬間的に滑らずに接する。
<!-- formal-statement-end -->

### 証明の見取り図

接点の**軌跡の速度**は、時刻ごとにどの物質点が接点に選ばれるかを含みます。これに対し楕円体に描いた特定の標識点の速度は、標識点の物体系座標を固定して微分します。この二つを分けて計算することが核心です。

<!-- proof-start -->
### 証明

[RBD3の角速度の運動学](../RBD3/index.md#prop-rbd3-angular-conjugacy)より $\dot R=R\widehat\omega_b$ です。積の微分をとると

$$
\begin{aligned}
\dot P_s
&=\dot R\,\omega_b+R\dot\omega_b\\
&=R(\omega_b\times\omega_b)+R\dot\omega_b
=R\dot\omega_b.
\end{aligned}
$$

[$L_0$ の保存](../RBD9/index.md#prop-rbd9-free-invariants)と $L_0\cdot P_s=2E$ の時間微分から、$L_0\cdot\dot P_s=0$。また物体系のEuler方程式で直接確かめても

$$
L_0\cdot\dot P_s=L_b\cdot\dot\omega_b
=-\omega_b\cdot(\omega_b\times L_b)=0
$$

です。最後に、ある時刻 $t_*$ の物体固定点 $u=P_b(t_*)$ を**固定したラベル**として、その空間位置 $R(t)u$ の $t=t_*$ における速度を求めると

$$
\left.\frac{d}{dt}R(t)u\right|_{t=t_*}
=R(t_*)\bigl(\omega_b(t_*)\times u\bigr)=0.
$$

従ってその瞬間の接触物質点は静止しています。ただし通常 $u=P_b(t)$ は時刻とともに変わるので、接触**位置**の速度 $\dot P_s$ は零とは限りません。
<!-- proof-end -->

これは「瞬間的に滑らない」という接触速度の主張であり、herpolhode の点が静止するという意味ではありません。実際の球が床を転がる際にも、床に触れている物質点は瞬間的に静止しながら、接触位置は次々に移ります。ただしここでは楕円体の座標は**角速度の座標**であって、現実の床・摩擦力・重力トルクは導入していません。

### 空間軌跡の中心線からの距離

不変平面への原点からの垂線の足 $H=(2E/\ell^2)L_0$ を使うと、$\mathcal H$ は $H$ からどれほど離れているかで調べられます。

<a id="prop-rbd10-herpolhode-radius"></a>

<!-- formal-statement-start -->
### 命題（herpolhode の半径式）

[Poinsotの不変平面](#thm-rbd10-invariable-plane)の仮定の下、$H=(2E/\ell^2)L_0$ とおく。このとき

$$
|P_s(t)-H|^2
=|\omega_b(t)|^2-\frac{(2E)^2}{\ell^2}
\ge0.
$$

従って空間軌跡の $H$ からの距離が一定であるための必要十分条件は $|\omega_b(t)|$ が一定であることである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$L_0\cdot P_s=2E$ および $|R\omega_b|=|\omega_b|$ から

$$
\begin{aligned}
|P_s-H|^2
&=|P_s|^2-2P_s\cdot H+|H|^2\\
&=|\omega_b|^2
-2\frac{2E}{\ell^2}(L_0\cdot P_s)
+\left(\frac{2E}{\ell^2}\right)^2\ell^2\\
&=|\omega_b|^2-\frac{(2E)^2}{\ell^2}.
\end{aligned}
$$

左辺は平方ノルムなので非負です。$E,\ell$ は一定だから右辺が一定であることと $|\omega_b|^2$ が一定であることは同値です。
<!-- proof-end -->

この式を使うと、「herpolhode は常に円」という誤解を具体的に排除できます。非対称剛体では三つの $\omega_i$ の配分が変わると通常 $|\omega_b|$ も変わります。逆に対称剛体では [RBD8の明示解](../RBD8/index.md#thm-rbd8-euler-solution)から $\omega_1^2+\omega_2^2$ と $\omega_3$ が一定なので、半径は一定です。ただし半径が一定というだけでは向きの時間発展まで確定しません。

## 5. 対称剛体では両軌跡を円として求められる

$J_b=\operatorname{diag}(I,I,J)$、$I,J>0$、$I\ne J$、初期角速度 $\omega_b(0)=(a,b,w)$ とします。横の大きさ $\rho=\sqrt{a^2+b^2}$ と $\ell=\sqrt{I^2\rho^2+J^2w^2}$ を用います。

[RBD8の明示解](../RBD8/index.md#thm-rbd8-euler-solution)で横角速度は角 $\alpha t$、$\alpha=(J-I)w/I$ だけ回り、第三成分は $w$ に固定されます。従って polhode は物体系の平面 $u_3=w$ とエネルギー楕円体の交円で、半径は $\rho$ です。$\rho=0$ なら点に退化します。

herpolhode を調べるには、空間の対称軸 $n(t)=R(t)e_3$ を用います。[RBD8の角運動量と円錐角](../RBD8/index.md#prop-rbd8-conserved-quantities)から、$n$ は固定した $k=L_0/\ell$ のまわりに一定の角度 $\theta$ を保ち、

$$
\cos\theta=\frac{Jw}{\ell},\qquad
\sin\theta=\frac{I\rho}{\ell}.
$$

さらに $L_0=I\omega_s+(J-I)w\,n$ なので

$$
P_s=\omega_s
=\frac{L_0}{I}-\frac{J-I}{I}w\,n.
$$

したがって $n$ が $k$ のまわりで円を描くと、$P_s$ も不変平面上で円を描き、その半径は

$$
r_h=\frac{|J-I|\,|w|}{I}\sin\theta
=\frac{|J-I|\,|w|\,\rho}{\ell}.
$$

円の中心は、$n$ の平均方向 $\cos\theta\,k$ を代入して

$$
\frac{\ell}{I}k-\frac{J-I}{I}w\cos\theta\,k
=\frac{\ell^2-J(J-I)w^2}{I\ell}\,k
=\frac{I\rho^2+Jw^2}{\ell}\,k
=\frac{2E}{\ell}k=H.
$$

ここで $n(t)$ が軸のまわりに回ることは、[RBD8の姿勢再構成](../RBD8/index.md#thm-rbd8-attitude-reconstruction)で従います。$w=0$ または $\rho=0$ では $r_h=0$ で、軌跡は点です。

**数値例**：$I=2,J=3,(a,b,w)=(1,0,1)$ なら $2E=5$、$\ell=\sqrt{13}$。polhode の半径は $1$、herpolhode の半径は $1/\sqrt{13}$ です。二つの円の半径が違うのは矛盾ではありません。前者は物体系、後者は空間系で描いているからです。

## 6. 非対称剛体の軌跡と分離曲線

$0<I_1<I_2<I_3$ とします。[自由剛体の角運動量球面と分離曲線](../RBD9/index.md#def-rbd9-separatrix)から、角運動量の長さ $\ell$ を固定した場合の中間軸のエネルギーは

$$
E_{\mathrm{sep}}=\frac{\ell^2}{2I_2}.
$$

エネルギーの取り得る範囲は $\ell^2/(2I_3)\le E\le\ell^2/(2I_1)$ です。これを自分で確かめるには

$$
\frac{\ell^2}{I_3}
\le \sum_{i=1}^3\frac{L_i^2}{I_i}
=2E
\le\frac{\ell^2}{I_1}
$$

と、$1/I_3\le1/I_i\le1/I_1$ を各 $L_i^2\ge0$ に掛けて足せばよいのです。

$E<E_{\mathrm{sep}}$ の polhode は最大慣性主軸の周囲、$E>E_{\mathrm{sep}}$ では最小慣性主軸の周囲に対応します。$E=E_{\mathrm{sep}}$ では[分離曲線の二平面](../RBD9/index.md#def-rbd9-separatrix)の交線に乗り、近くの軌道は中間軸の定常回転点付近で長く滞留します。これらの分類は**物体系**での幾何です。空間系では同じ解から $R(t)$ を積分して herpolhode を作らなければ、その形を決められません。

### Euler方程式から二つの軌跡を同期して描く

[無トルクEuler方程式](../RBD7/index.md#thm-rbd7-newton-euler)と[RBD5の四元数による姿勢更新](../RBD5/index.md#thm-rbd5-attitude-ode)を同一初期値問題として数値積分する、章固有の[polhode／herpolhode 同期プレイヤー](assets/poinsot-player.html)を用意しました。左は物体固定座標の $(\omega_1,\omega_2,\omega_3)$、右は空間固定座標の $\omega_s=R\omega_b$ を描きます。右の軌跡は常に $L_0\cdot x=2E$ 上にあります。

操作では開始・停止、1ステップ更新、初期条件、刻み幅変更ができます。[前章の二不変量](../RBD9/index.md#prop-rbd9-free-invariants) $E,\ell$ と空間角運動量 $L_s$ の誤差を同時に表示します。数値軌跡の図形だけで定理を証明したことにはならないため、まず接面条件 $J_sP_s=L_0$ と、$\dot P_s=R\dot\omega_b$ を紙上で検算してください。

## 7. なぜこの構成はトルク下では使えないか

外トルクが零でなければ [RBD7の角運動量収支](../RBD7/index.md#thm-rbd7-newton-euler)で $\dot L_s=\tau_s$ となり、一般に $L_s$ の方向が固定しません。外力の仕事率が零でないなら $E$ も変わります。したがって接平面の法線 $L_s$ と切片 $2E$ が両方一定という本講の結論は失われます。例えば固定点を持つ重いこまでは重力トルクが働き、次のRBD11では重力トルクの下でも時間一定となる量を改めて導きます。

また、[RBD6の正定値性](../RBD6/index.md#prop-rbd6-positivity)を失い $J_b$ に零固有値があると、$u^{\mathsf T}J_bu=2E$ は有界楕円体にならず、接点の一意性を示した正定値内積の等号条件が使えません。**「楕円体の接面」「固定平面」「滑らない」**は、それぞれ正定値性、[無トルクで一定となる二不変量](../RBD9/index.md#prop-rbd9-free-invariants)、$\dot R=R\widehat\omega_b$ から導かれる別の主張です。

---

# 演習

## Level A

### 問題 A1：エネルギー楕円体の軸

$I=(2,3,4)$、$2E=12$ とする。物体系エネルギー楕円体の方程式と三つの座標軸との交点を求め、正定値であることを確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[エネルギー楕円体の定義](#def-rbd10-energy-ellipsoid)に代入して $2u_1^2+3u_2^2+4u_3^2=12$。$u_2=u_3=0$ なら $u_1^2=6$ だから交点は $(\pm\sqrt6,0,0)$ です。残りも順に $u_2^2=4$、$u_3^2=3$ を得るので、$(0,\pm2,0)$、$(0,0,\pm\sqrt3)$ です。任意の $u\ne0$ に対し $u^{\mathsf T}J_bu=2u_1^2+3u_2^2+4u_3^2>0$ で正定値、全ての半軸長が有限です。
<!-- solution-end -->

### 問題 A2：接平面の法線

$I=(2,3,4)$、$\omega_b=(1,1,1)$、$R=\mathrm{Id}_3$ の時点で接平面と原点からの距離を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$2E=\omega_b^{\mathsf T}J_b\omega_b=9$、$L_b=J_b\omega_b=(2,3,4)$ です。[不変平面定理](#thm-rbd10-invariable-plane)で $L_0=L_b$ より $2x_1+3x_2+4x_3=9$。法線の長さは $\sqrt{4+9+16}=\sqrt{29}$ なので $d=9/\sqrt{29}$。接点 $(1,1,1)$ を代入すると $2+3+4=9$ で平面上にあります。
<!-- solution-end -->

### 問題 A3：角運動量の向き

$I=(2,3,4)$、$\omega_b=(1,1,0)$ とする。楕円体の接平面の法線が角速度方向に平行でないことを、三次元ベクトルの積 $\omega_b\times L_b$ の成分を計算して示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$L_b=J_b\omega_b=(2,3,0)$ です。$\omega_b\times L_b$ の各成分は

$$
\omega_b\times L_b
=(1,1,0)\times(2,3,0)=(0,0,1)\ne0.
$$

したがって両者は平行ではありません。接平面の法線は [定理](#thm-rbd10-invariable-plane)により $L_b$（空間系なら $RL_b$）であり、$\omega_b$ ではありません。
<!-- solution-end -->

### 問題 A4：接触する物質点と軌跡の点

$R=\mathrm{Id}_3$、$I=(2,3,4)$、$\omega_b=(1,1,1)$ の瞬間について、接点の物質速度と、軌跡の点の時間微分をそれぞれ計算せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

時刻を固定した物質点の座標は $u=\omega_b=(1,1,1)$。その瞬間速度は [接触運動学の命題](#prop-rbd10-contact-kinematics)により $\dot R\,u=R(\omega_b\times u)=0$ です。

一方、[Euler方程式](../RBD7/index.md#thm-rbd7-newton-euler)で

$$
\dot\omega_1=\frac{3-4}{2}=-\frac12,\quad
\dot\omega_2=\frac{4-2}{3}=\frac23,\quad
\dot\omega_3=\frac{2-3}{4}=-\frac14.
$$

したがって $\dot P_s=R\dot\omega_b=(-1/2,2/3,-1/4)\ne0$。法線との内積は $2(-1/2)+3(2/3)+4(-1/4)=-1+2-1=0$ で、平面上の接点が移動していることを確認できます。
<!-- solution-end -->

### 問題 A5：一つの主軸の退化軌跡

$I=(2,3,4)$、$\omega_b=(0,0,2)$、$R_0=\mathrm{Id}_3$。二つの軌跡と不変平面を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

主軸解だから $\dot\omega_b=0$。$2E=4\cdot2^2=16$、$L_0=(0,0,8)$ なので [不変平面定理](#thm-rbd10-invariable-plane)から $\Pi=\{x:x_3=2\}$。回転は第三軸まわりなので $R(t)e_3=e_3$ が全時刻で成立します。従って polhode と herpolhode はともに一点 $(0,0,2)$ です。これは回転が停止したことを意味しません。
<!-- solution-end -->

## Level B

### 問題 B1：非対称剛体の接触点と接平面

$I=(2,3,4)$、$\omega_b(0)=(1,2,0)$、$R_0=\mathrm{Id}_3$ とする。$E,\ell,\Pi,H$ を求め、初期接点から $H$ までの距離を二通りで計算せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$L_0=(2,6,0)$、$2E=2\cdot1^2+3\cdot2^2=14$、$\ell^2=2^2+6^2=40$ です。[不変平面定理](#thm-rbd10-invariable-plane)から

$$
\Pi=\{x:2x_1+6x_2=14\},\qquad
H=\frac{14}{40}(2,6,0)=\left(\frac7{10},\frac{21}{10},0\right).
$$

初期接点 $P_s(0)=(1,2,0)$ との距離の二乗は $(3/10)^2+(-1/10)^2=1/10$。一方、[半径式](#prop-rbd10-herpolhode-radius)から

$$
|P_s(0)-H|^2
=|\omega_b(0)|^2-\frac{(2E)^2}{\ell^2}
=5-\frac{196}{40}
=5-\frac{49}{10}=\frac1{10}.
$$

二通りが一致します。$\Pi$ は固定でも $P_s(t)$ の位置は一般に変わります。
<!-- solution-end -->

### 問題 B2：エネルギー範囲と分離エネルギー

$0<I_1<I_2<I_3$、$\ell>0$ を固定する。$E$ の範囲を証明し、$I=(2,3,4)$、$\ell=6$ で三つの基準エネルギーを求め、$E=5$ がどちらの軸群に対応するか説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[RBD9の二不変量](../RBD9/index.md#prop-rbd9-free-invariants)は $2E=\sum L_i^2/I_i$、$\sum L_i^2=\ell^2$ です。各 $i$ で $1/I_3\le1/I_i\le1/I_1$ に $L_i^2\ge0$ を掛け、三つ足すと

$$
\frac{\ell^2}{I_3}\le 2E\le\frac{\ell^2}{I_1}.
$$

$I=(2,3,4)$、$\ell=6$ では下限 $E_{\min}=36/8=9/2$、[分離エネルギー](../RBD9/index.md#def-rbd9-separatrix) $E_{\mathrm{sep}}=36/6=6$、上限 $E_{\max}=36/4=9$。$9/2<5<6$ なので polhode は最大慣性軸（第三主軸）の周囲の群です。これは空間系の herpolhode が第三空間軸の周囲にあるという意味ではありません。
<!-- solution-end -->

### 問題 B3：対称剛体の二つの円

$J_b=\operatorname{diag}(2,2,3)$、$\omega_b(0)=(1,0,1)$、$R_0=\mathrm{Id}_3$。polhode と herpolhode の半径を求め、$H$ からの距離式でも後者を検算せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[RBD8の明示解](../RBD8/index.md#thm-rbd8-euler-solution)において $\rho=1$、$w=1$、$I=2,J=3$ なので polhode は第三座標 $u_3=1$ 上で半径 $1$ の円です。

$2E=2+3=5$、$\ell^2=2^2+3^2=13$ です。本章§5で導いた $r_h=|J-I||w|\rho/\ell$ を使うと $r_h=1/\sqrt{13}$。

[半径式](#prop-rbd10-herpolhode-radius)でも

$$
|P_s-H|^2=|\omega_b|^2-\frac{(2E)^2}{\ell^2}
=(1^2+0^2+1^2)-\frac{25}{13}
=2-\frac{25}{13}=\frac1{13}.
$$

よって半径の二乗が一致します。二つの円は異なる座標系にあります。
<!-- solution-end -->

### 問題 B4：分離曲線の物体系への移し替え

$0<I_1<I_2<I_3$ とし、$E=\ell^2/(2I_2)$ の軌道について、polhode を含む二つの平面を $\omega_i$ で求めよ。$I=(2,3,4)$ のとき係数を具体化せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[角運動量球面と分離曲線の定義](../RBD9/index.md#def-rbd9-separatrix)で $L_i=I_i\omega_i$ と代入します。二不変量を差し引くと

$$
\left(\frac1{I_1}-\frac1{I_2}\right)L_1^2
=\left(\frac1{I_2}-\frac1{I_3}\right)L_3^2.
$$

両辺が非負で $I_1,I_3>0$ なので平方根をとり、

$$
\omega_3
=\pm\frac{I_1}{I_3}
\sqrt{\frac{1/I_1-1/I_2}{1/I_2-1/I_3}}\,
\omega_1.
$$

$I=(2,3,4)$ なら根号の中は $(1/2-1/3)/(1/3-1/4)=(1/6)/(1/12)=2$。係数は $(2/4)\sqrt2=1/\sqrt2$ なので $\omega_3=\pm\omega_1/\sqrt2$ です。各平面とエネルギー楕円体の交わりが物体系の分離曲線で、空間の herpolhode の方程式ではありません。
<!-- solution-end -->

## Level C

### 問題 C1：Poinsotの幾何を一式で構成する

正定値 $J_b=\operatorname{diag}(I_1,I_2,I_3)$ と無トルクEuler方程式、$R(0)=R_0$、$\dot R=R\widehat\omega_b$ を仮定し、初期角速度 $\omega_b(0)\ne0$ とする。

- **(1) 二不変量**：$E$ と $L_0$ が時間一定であることを導け。
- **(2) 接面**：回転楕円体の接平面と接点を求め、一意性も証明せよ。
- **(3) 速度**：polhode と herpolhode の定義上の違いを示し、接点の軌跡速度と接触物質点速度を区別せよ。
- **(4) 数値例**：$I=(2,3,4)$、$\omega_b(0)=(1,1,1)$、$R_0=\mathrm{Id}_3$ の初期値で接平面と接点速度を検算せよ.

- Level: C

<!-- solution-start -->
### 詳細解答

**(1) 二不変量。** [RBD7のEuler方程式](../RBD7/index.md#thm-rbd7-newton-euler)の無トルク形は $J_b\dot\omega_b=-\omega_b\times(J_b\omega_b)$ です。$J_b$ が時間一定で対称なので

$$
\dot E=\omega_b^{\mathsf T}J_b\dot\omega_b
=-\omega_b\cdot(\omega_b\times L_b)=0.
$$

さらに $L_b=J_b\omega_b$ より $\dot L_b=-\omega_b\times L_b$、[RBD3の回転運動学](../RBD3/index.md#prop-rbd3-angular-conjugacy)から

$$
\frac{d}{dt}(RL_b)
=\dot R L_b+R\dot L_b
=R(\omega_b\times L_b-\omega_b\times L_b)=0.
$$

よって $L_s=L_0$ は一定、$\ell=|L_0|>0$ も一定です。

**(2) 接面と一意性。** 空間系のエネルギー楕円体は $F_s(x)=x^{\mathsf T}J_sx-2E=0$、$J_s=RJ_bR^{\mathsf T}$ です。$P_s=R\omega_b$ で $F_s(P_s)=0$。$F_s(P_s+h)-F_s(P_s)$ の $h$ に関する一次項は $2(J_sP_s)\cdot h=2L_0\cdot h$ です。従って接平面の法線は $2J_sP_s=2RJ_b\omega_b=2L_0$ となり、接平面は

$$
L_0\cdot(x-P_s)=0,\qquad
L_0\cdot P_s=(RL_b)\cdot(R\omega_b)=2E.
$$

つまり $\Pi=\{x:L_0\cdot x=2E\}$ は時間一定で、距離は $2E/\ell$。同じ平面に別の接点 $Ru$ があるなら $u^{\mathsf T}J_bu=2E$ および $\omega_b^{\mathsf T}J_bu=2E$。正定値内積での Cauchy–Schwarz の等号条件より $u=c\omega_b$（$c>0$）、同じ二次長さから $c=1$ です。従って接点は一意です。

**(3) 座標と速度。** [polhode と herpolhode の定義](#def-rbd10-polhode-herpolhode)により、前者は物体系の $\{\omega_b(t)\}$、後者は空間系の $\{R(t)\omega_b(t)\}$ です。[接触運動学](#prop-rbd10-contact-kinematics)で積の微分を取ると

$$
\dot P_s=\dot R\omega_b+R\dot\omega_b
=R(\omega_b\times\omega_b)+R\dot\omega_b=R\dot\omega_b.
$$

しかし時刻 $t_*$ に接していた物質点の物体系ラベル $u=\omega_b(t_*)$ を固定して微分すると、その瞬間の速度は $R(t_*)(\omega_b(t_*)\times u)=0$ です。

**(4) 初期値。** $J_b=\operatorname{diag}(2,3,4)$、$\omega_b(0)=(1,1,1)$ から $2E=9$、$L_0=(2,3,4)$、$\ell=\sqrt{29}$。従って $\Pi:\,2x_1+3x_2+4x_3=9$ と $P_s(0)=(1,1,1)$ です。Euler方程式の三成分は

$$
\dot\omega_b(0)
=\left(-\frac12,\frac23,-\frac14\right).
$$

$R_0=\mathrm{Id}_3$ より $\dot P_s(0)=\dot\omega_b(0)$。内積は $L_0\cdot\dot P_s=-1+2-1=0$ なので軌跡速度が不変平面に接し、接点の物質速度だけは零です。これで平面、座標変換、二種類の速度が整合します。
<!-- solution-end -->
