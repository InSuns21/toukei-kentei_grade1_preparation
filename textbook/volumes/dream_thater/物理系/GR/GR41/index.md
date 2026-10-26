# GR41 FLRW計量と対称性

<!-- definition-example-audit: strict -->

[GR40のHamiltonian・運動量制約](../GR40/index.md#def-gr40-constraints)は、どの空間計量と第二基本形式がEinstein方程式の初期データになり得るかを判定しました。しかし、一般の初期データは六個ずつのテンソル成分を持ち、時空全体を具体的に調べるには自由度が多すぎます。宇宙を大きな尺度で記述するとき、**ある時刻の空間には特別な場所も方向もない**という理想化を置けば、計量の自由度をどこまで減らせるでしょうか。

中心となるのは、物質が一様に見えるという観測上の近似と、**空間計量そのものの対称性**を区別することです。本章では後者を明示的な幾何学的仮定として置きます。対称性から空間の曲率を三種類に分類し、宇宙時間と尺度因子を持つFLRW計量を構成します。その後、共動する時計、距離、空間曲率、第二基本形式を検算します。

時空の計量は $(-,+,+,+)$、単位系は $c=G=1$ とし、時間向きは未来へ選びます。$I\subset\mathbb R$ は時間の開区間、$\Sigma$ は連結な3次元空間多様体とします。計量の各係数は必要な回数だけ滑らかで、尺度因子は正とします。空間添字 $i,j=1,2,3$、時空添字 $\mu,\nu=0,1,2,3$ です。

## 1. 空間のどこにも、どの向きにも特別扱いがない

球対称な恒星の周囲では、恒星の中心という特別な場所がありました。宇宙全体を表す対称性として欲しいのは、もっと強い条件です。時刻 $t$ を固定した空間 $\Sigma_t$ の点を自由に移せることを**均一性**（homogeneity）、一つの点を固定したまま方向を回転できることを**等方性**（isotropy）と呼びます。

「距離を保存する変換」は、任意の接ベクトル $X,Y$ について内積を保つ微分同相、すなわち[GEO12のRiemann等長写像](../../../幾何系/GEO/GEO12/index.md#def-geo12-isometry)に従う変換です。全ての回転が実現するという条件は、単に球座標で式が角度に依存しないという条件より強く、各点の周りで任意の方向を取り替えられることを意味します。

<a id="def-gr41-spatial-symmetry"></a>

<!-- formal-statement-start -->
> **定義（空間的均一性・等方性）**
> 連結な3次元Riemann多様体 $(\Sigma,h)$ の等長変換群 $\mathcal G$ について、任意の $p,q\in\Sigma$ を結ぶ $F\in\mathcal G$ が存在するとき**空間的均一**という。また各点 $p$ を固定する等長変換の微分が、$T_p\Sigma$ 上のすべての向き保存直交回転 $SO(3)$ を含むとき**空間的等方**という。本章でいう均一・等方な空間は両方を満たすものとする。
<!-- formal-statement-end -->

この定義を座標で判定するときは、各点の $h$ に関する正規直交基底 $e_1,e_2,e_3$ を選びます。この基底では $h(e_i,e_j)=\delta_{ij}$ なので、接ベクトルに作用する向き保存直交回転は

$$
R^{\mathsf T}R=I,\qquad\det R=1
$$

を満たす行列で表されます。等長写像 $F$ の微分 $dF_p$ がその回転を実現し、[Riemann等長写像の条件](../../../幾何系/GEO/GEO12/index.md#def-geo12-isometry)

$$
h_{F(p)}(dF_pX,dF_pY)=h_p(X,Y)
$$

を満たすかを確認すれば、抽象的な等長性と等方性を行列で検査できます。

<!-- definition-example-start: def-gr41-spatial-symmetry -->
**定義の確認**：Euclid空間。$h=dx^2+dy^2+dz^2$ とします。任意の二点 $p,q$ は平行移動 $x\mapsto x+(q-p)$ で結ばれ、この写像の微分は単位行列なので内積を保ちます。また任意の $R\in SO(3)$ に対する $F_R(x)=p+R(x-p)$ は $p$ を固定します。Cartesian正規直交基底で微分は $d(F_R)_x=R$ であり、任意の $X,Y$ に対して

$$
(RX)^{\mathsf T}(RY)=X^{\mathsf T}R^{\mathsf T}RY=X^{\mathsf T}Y.
$$

従って各 $F_R$ は等長写像で、その微分は定義が要求する全ての回転を実現します。二条件を個別に確認できました。
<!-- definition-example-end -->

対称性を曲率へ結び付けます。[GEO16の断面曲率の定義](../../../幾何系/GEO/GEO16/index.md#def-geo16-sectional-curvature)では、点 $p$ の2次元接平面 $\Pi$ ごとに曲率 $K_p(\Pi)$ が決まります。等方性の回転は任意の2平面を任意の別の2平面へ写せるため、同じ点では曲率が平面に依存しません。さらに均一性の等長変換が点を移すので、その値は点にも依存しません。

従って均一・等方な空間には、ある実定数 $\kappa$ が存在して

$$
K_p(\Pi)=\kappa\qquad(p\in\Sigma,\ \dim\Pi=2)
$$

となります。これは[GEO16の定断面曲率](../../../幾何系/GEO/GEO16/index.md#def-geo16-constant-sectional-curvature)です。逆に定断面曲率という局所的条件だけでは、空間の大域位相まで均一・等方になるとは限りません。この点は後で区別します。

この対称性にはテンソルを大幅に制限する効果があります。まず点 $p$ で回転に不変な共変ベクトル $v_i$ を考えます。任意の非零ベクトルを反対向きへ回す180度回転にも不変でなければならないので、

$$
v_i=0
$$

です。次に回転に不変な対称二階テンソル $S$ を考えます。点 $p$ の $h$-正規直交基底 $e_1,e_2,e_3$ で $S_{ij}=S(e_i,e_j)$ と成分を定めると、回転不変性は

$$
R^{\mathsf T}(S_{ij})R=(S_{ij})
$$

という行列等式です。座標軸まわりの180度回転で非対角成分 $S_{ij}=0$（$i\ne j$）、90度回転で対角成分 $S_{11}=S_{22}=S_{33}=s$ となります。この基底では $h_{ij}=\delta_{ij}$ だから、任意の基底でもテンソルとして

$$
S_{ij}=s h_{ij}
$$

となります。均一性は係数 $s$ が位置に依存しないことも強制します。

## 2. 時空計量を一つの関数へ減らす

各時刻面がたまたま均一・等方というだけでは、その対称性の中心や座標を時刻間で同定できません。本章ではさらに、$I\times\Sigma$ 上で**同じ空間等長変換群が全時刻面に作用し**、時刻 $t$ を変えずに時空計量を保つという仮定を置きます。空間点とともに動く座標を $x^i$、各時刻面のラベルを $t$ とします。

[GR39のlapse・shift付き計量](../GR39/index.md#prop-gr39-adm-metric)は一般に時間・空間の混合項を持ちます。しかし上で見たように、空間の回転に不変な共変ベクトルは零です。従って混合項 $g_{ti}$ は消えます。また $g_{tt}$ は空間等長変換で不変なスカラーだから、均一性により $t$ のみの関数です。空間計量は不変な対称二階テンソルなので、基準時刻の計量に正のスカラーを掛けたものになります。

基準の空間計量を $\gamma_{ij}(x)$ とし、尺度を表す正関数を $a(t)>0$、時計の速さを調整するlapseを $N(t)>0$ と書きます。すると

$$
ds^2=-N(t)^2dt^2+a(t)^2\gamma_{ij}(x)dx^i dx^j
$$

です。正の $N$ を時間積分すれば、時刻ラベルを観測者の固有時に取り直せます。以後その時刻を $\tau$ とします。

<a id="def-gr41-flrw"></a>

<!-- formal-statement-start -->
> **定義（FLRW計量と尺度因子）**
> $I\times\Sigma$ 上で $\gamma_k$ を連結な定断面曲率 $k\in\{-1,0,+1\}$ の正定値3次元空間計量、$a:I\to(0,\infty)$ を滑らかな関数とする。次のLorentz計量を **Friedmann–Lemaître–Robertson–Walker（FLRW）計量**という。

$$
\boxed{g=-d\tau^2+a(\tau)^2\gamma_k.}
$$

> $\tau$ を**宇宙時間**、$a(\tau)$ を**尺度因子**、$k$ を**規格化された空間曲率符号**と呼ぶ。$k$ は時刻に依存しない。$\gamma_k$ の断面曲率は $k$、時刻面の実際の断面曲率は $k/a(\tau)^2$ である。
<!-- formal-statement-end -->

正負の定曲率では曲率半径を $a$ に吸収して $k=\pm1$ と規格化できます。平坦なときは $k=0$ とします。$a$ の単位は、$\gamma_k$ を無次元に取れば長さです。別の基準長を持つ規約も可能なので、物理量は座標の規格化に依らない組合せで読む必要があります。

<!-- definition-example-start: def-gr41-flrw -->
**定義の確認**：平坦で尺度が変わる模型。$\Sigma=\mathbb R^3$、$\gamma_0=dx^2+dy^2+dz^2$、$a(\tau)=2+\tau^2$ とします。全 $\tau\in\mathbb R$ で $a>0$、$-d\tau^2$ は一つの負方向、空間係数は正定値で断面曲率0です。各時刻面の平行移動・任意回転は計量を保つので定義に必要な対称性を満たします。尺度は時刻とともに変わるため、時空の時間並進対称性は要求されません。
<!-- definition-example-end -->

<a id="prop-gr41-symmetry-metric"></a>

<!-- formal-statement-start -->
> **命題（空間対称性からのFLRW計量）**
> 時間向き付きLorentz計量 $g$ が $I\times\Sigma$ 上にあり、各 $\{t\}\times\Sigma$ が空間的で、全時刻に共通な空間等長変換群が時刻を固定して $g$ を保つとする。その群が各時刻面で推移的に作用し、各点の等方部分群が接空間の $SO(3)$ 全体を含むなら、局所的に時刻を再選択して次の形に書ける。

$$
g=-d\tau^2+a(\tau)^2\gamma_k.
$$

> 逆に定曲率の標準模型（Euclid3空間・丸い3球面・双曲3空間）にこの形を与えると、空間的均一・等方性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

回転不変な空間一形式は零、回転不変な対称二階形式は計量の定数倍です。まず成分の自由度を $N(t),a(t)$ に落とし、次に $d\tau=N(t)dt$ で時計を合わせます。曲率定数の規格化は空間座標の尺度選択で行います。

<!-- proof-start -->
### 証明

一般の座標成分を $g_{tt},g_{ti},g_{ij}$ とします。各点を固定する $SO(3)$ が作用するとき、$g_{ti}$ は空間一形式だから、任意のベクトル $v^i=h^{ij}g_{tj}$ が全回転で不変でなければなりません。$v\ne0$ と仮定すると $v$ に垂直な軸回りの180度回転で $v$ は $-v$ となり矛盾します。ゆえに $g_{ti}=0$ です。

$g_{tt}$ は群不変な関数です。作用が推移的なので $g_{tt}=-N(t)^2$ と書け、空間面が空間的かつ時空計量がLorentz型であることから $N(t)>0$ です。時刻 $t_0$ に $\gamma=h_{t_0}$ を固定すると、各時刻の $h_t$ は同じ群の不変な正定値対称テンソルです。点 $p$ の $\gamma$-正規直交基底では $[\gamma]=I$、$[h_t]=B_t$ であり、等方部分群の不変性は

$$
R^{\mathsf T}B_tR=B_t
$$

です。第1節と同じ180度・90度回転による成分判定から $B_t=b(t,p)^2I$、すなわち $h_t(p)=b(t,p)^2\gamma(p)$ です。群の推移性から $b(t,p)=b(t)>0$、すなわち

$$
g=-N(t)^2dt^2+b(t)^2\gamma.
$$

第1節の断面曲率の議論から $\gamma$ は定断面曲率 $\kappa$ を持ちます。計量を定数 $c>0$ 倍すると、接続と上添字一つの曲率テンソルは変わらず、[断面曲率の定義](../../../幾何系/GEO/GEO16/index.md#def-geo16-sectional-curvature)の分子は $c$ 倍、分母は $c^2$ 倍になるので曲率は $\kappa/c$ です。従って $\kappa\ne0$ なら

$$
\gamma_k=|\kappa|\gamma,\qquad
k=\frac\kappa{|\kappa|},\qquad
a=\frac b{\sqrt{|\kappa|}}
$$

と置けば $b^2\gamma=a^2\gamma_k$ です。$\kappa=0$ なら $\gamma_0=\gamma$、$a=b$ とします。

最後に $\tau(t)=\tau_0+\int_{t_0}^t N(s)\,ds$ と定めると、$N>0$ なので $d\tau/dt=N$ で局所的な逆関数があり、$-N^2dt^2=-d\tau^2$ です。逆向きは、標準的なEuclid空間・球面・双曲空間が移動と各点での回転に対応する等長変換を持ち、$a$ が空間点に依存しないことから従います。$\square$
<!-- proof-end -->

上の平坦な模型は、この命題の逆向きを直接確認する例にもなっています。

## 3. 三種類の空間模型を座標で確かめる

標準空間の**測地極座標** $\chi,\theta,\phi$ を考えます。原点からの測地線に沿う距離を $\chi$、測地線の初期方向を球面角 $\theta,\phi$ で表示する座標です。球面部分の単位計量を

$$
d\Omega^2=d\theta^2+\sin^2\theta\,d\phi^2
$$

と書きます。角度を少し変えた二本の測地線の分離はJacobi場として測れます。[GEO17のJacobi方程式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-geodesic-variation-jacobi)と[GEO16の定断面曲率テンソル](../../../幾何系/GEO/GEO16/index.md#prop-geo16-constant-curvature-tensor)によって、長さの係数 $S_k(\chi)$ は次の初期値問題を満たします。ここで $S_k'(\chi)=dS_k/d\chi$、$S_k''(\chi)=d^2S_k/d\chi^2$ は測地線に沿う距離 $\chi$ に関する通常の導関数です。

$$
S_k''(\chi)+kS_k(\chi)=0,\qquad
S_k(0)=0,\qquad S_k'(0)=1.
$$

$S_k(0)=0$ は測地線が同じ原点から出ること、$S_k'(0)=1$ は小さい距離ではEuclid空間の扇形と一致することを意味します。

<a id="prop-gr41-radial-metric"></a>

<!-- formal-statement-start -->
> **命題（定曲率空間の二つの動径座標表示）**
> $k\in\{-1,0,+1\}$ の標準的な3次元定断面曲率模型（Euclid空間・丸い3球面・双曲空間）の測地極座標で、極や共役点を避けた領域では次が成り立つ。

$$
\gamma_k=d\chi^2+S_k(\chi)^2d\Omega^2,
\qquad
S_k(\chi)=
\begin{cases}
\sin\chi,&k=+1,\\
\chi,&k=0,\\
\sinh\chi,&k=-1.
\end{cases}
$$

> $r=S_k(\chi)$ が一対一で微分可能な領域では、同じ計量を次の**曲率座標**で表せる。

$$
\boxed{\gamma_k=\frac{dr^2}{1-kr^2}+r^2d\Omega^2.}
$$

> とくに $k=+1$ の曲率座標 $0\le r<1$ は丸い3球面全体を覆わない。
<!-- formal-statement-end -->

### 証明の見取り図

測地極座標の径方向は長さ1で、異なる角度の測地線を微分したJacobi場が角方向の計量を決めます。定曲率では法方向のJacobi方程式が同じ二階常微分方程式になり、正・零・負の曲率で $\sin,\chi,\sinh$ が現れます。

<!-- proof-start -->
### 証明

原点 $p$ と $\gamma_k$ に関する単位方向 $v$ を固定し、$c(\chi)=\exp_p(\chi v)$ を単位速測地線とします。$v$ の角方向の単位変分 $w\perp v$ を取り、$v(s)$ を $v(0)=v$、$dv/ds|_{s=0}=w$ を満たす単位方向の曲線とします。角方向の変分場と測地線に沿う共変微分を

$$
J_w(\chi)=\left.\frac{\partial}{\partial s}\exp_p(\chi v(s))\right|_{s=0},
\qquad D_\chi=\nabla_{\dot c}
$$

と書きます。ここで点は $dc/d\chi$、$\partial/\partial s$ は $\chi$ を固定した $s$ の偏微分で、先ほどの $S_k'$ とは微分変数が異なります。これは[測地線変分からのJacobi方程式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-geodesic-variation-jacobi)の仮定を満たし、

$$
J_w(0)=0,\qquad D_\chi J_w(0)=w,\qquad
D_\chi^2J_w+R(J_w,\dot c)\dot c=0
$$

です。$w$ を測地線に沿って平行移動した単位場を $E_w$ とすれば、[定断面曲率の曲率テンソル](../../../幾何系/GEO/GEO16/index.md#prop-geo16-constant-curvature-tensor)から $R(E_w,\dot c)\dot c=kE_w$ です。$D_\chi E_w=0$ なので候補 $S_k E_w$ を代入すると

$$
D_\chi^2(S_kE_w)=S_k''E_w,
\qquad (S_k''+kS_k)E_w=0.
$$

この候補は $J_w$ と同じ初期値 $0,w$ を持ちます。Jacobi方程式の解の一意性から $J_w=S_kE_w$ となり、表示した三つの関数が得られます。

測地極座標の径方向 $\partial_\chi=\dot c$ は角方向のJacobi場と直交します。実際 $f(\chi)=\gamma_k(J_w,\dot c)$ と置くと、測地線方程式 $D_\chi\dot c=0$ と曲率作用素の直交性から

$$
f''=\gamma_k(D_\chi^2J_w,\dot c)=0,
\qquad f(0)=0,\quad f'(0)=\gamma_{k,p}(w,v)=0.
$$

従って $f=0$ です。異なる角方向 $w_1,w_2$ の内積も

$$
\gamma_k(J_{w_1},J_{w_2})=S_k^2\gamma_{k,p}(w_1,w_2)
$$

となります。そこで径方向係数が1、角方向が $S_k^2d\Omega^2$ と分かります。

最後に $r=S_k(\chi)$ と置きます。先ほどの常微分方程式の両辺へ $2S_k'$ を掛けると

$$
\frac{d}{d\chi}\bigl((S_k')^2+kS_k^2\bigr)
=2S_k'(S_k''+kS_k)=0.
$$

初期値 $S_k'(0)=1,S_k(0)=0$ から括弧内は恒等的に1です。従って

$$
(S_k')^2=1-kS_k^2=1-kr^2,
\qquad dr=S_k'(\chi)\,d\chi.
$$

$S_k'\ne0$ の局所領域で $d\chi^2=dr^2/(1-kr^2)$ となります。$k=+1$ では $S_1'(\pi/2)=\cos(\pi/2)=0$ で変換が可逆でなくなり、$\chi$ と $\pi-\chi$ が同じ $r$ を与えるので全球を一枚の曲率座標では覆えません。$\square$
<!-- proof-end -->

三種類の標準模型は次のように具体化できます。

| $k$ | 標準空間 | 測地極座標の角方向係数 | 空間の断面曲率 |
| --- | --- | --- | --- |
| $0$ | $\mathbb R^3$ | $\chi^2$ | $0$ |
| $+1$ | 単位3球面 $S^3\subset\mathbb R^4$ | $\sin^2\chi$ | $+1$ |
| $-1$ | 単位双曲3空間 $H^3$ | $\sinh^2\chi$ | $-1$ |

例えば単位3球面の点は $X=(\cos\chi,\sin\chi\,\omega)$、$\omega\in S^2$ と書けます。Euclid空間 $\mathbb R^4$ から誘導する内積で

$$
dX\cdot dX=d\chi^2+\sin^2\chi\,d\omega\cdot d\omega
=d\chi^2+\sin^2\chi\,d\Omega^2
$$

を直接確認できます。これが正曲率の例です。$\chi=0,\pi$ は極座標の極であり、$r=\sin\chi$ の折返し点 $\chi=\pi/2$ は**空間曲率の特異点ではありません**。

FLRW計量に戻せば、三種類を統一して

$$
ds^2=-d\tau^2+a(\tau)^2
\left(\frac{dr^2}{1-kr^2}+r^2d\Omega^2\right)
$$

と表示できます。ただし曲率座標の適用域は前述の条件に従います。

## 4. 共動する時計と膨張を幾何から読む

空間座標 $x^i$ を一定に保つ世界線は、各時刻面で共通の空間対称変換を使う座標に対して自然な観測者の族です。この族を以下で**共動観測者**として定義します。流体を考えるとき、[GR8の完全流体の速度](../GR8/index.md#def-gr8-perfect-fluid-stress)をこの族と一致させることが宇宙論的な物質模型の追加仮定になります。幾何学上の共動観測者の存在だけから、物質が完全流体であることは導けません。

<a id="def-gr41-comoving"></a>

<!-- formal-statement-start -->
> **定義（共動観測者と宇宙時間）**
> $g=-d\tau^2+a(\tau)^2\gamma_k$ のFLRW時空で、座標 $x^i$ を一定に保ち、未来向き接ベクトル $u=\partial_\tau$ を持つ世界線を**共動観測者の世界線**と呼ぶ。$g(u,u)=-1$ なので、その観測者の固有時は宇宙時間 $\tau$ と一致する。尺度因子の対数時間微分

$$
\boxed{H(\tau):=\frac{\dot a(\tau)}{a(\tau)}}
$$

> を**Hubble率**と呼ぶ。上の点は宇宙時間 $\tau$ による微分を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr41-comoving -->
**定義の確認**：$a(\tau)=e^{h\tau}$（定数 $h\in\mathbb R$）なら $a>0$ で、$u^\mu=(1,0,0,0)$、$g_{\tau\tau}=-1$ なので $g(u,u)=-1$ です。固定された空間点の間の長さは $e^{h\tau}$ 倍で、定義から $H=h$ となります。$h=0$ なら膨張しない例も含みます。
<!-- definition-example-end -->

<a id="prop-gr41-flrw-kinematics"></a>

<!-- formal-statement-start -->
> **命題（FLRW空間曲率・体積・第二基本形式）**
> $a\in C^2(I)$、$a>0$ とし、$g=-d\tau^2+a(\tau)^2\gamma_k$ をFLRW計量とする。時刻面の誘導計量を $h_{ij}=a^2\gamma_{k,ij}$、未来単位法線を $u=\partial_\tau$ とすると、次が成り立つ。

$$
\operatorname{Ric}^{(3)}_{ij}=\frac{2k}{a^2}h_{ij},
\qquad \mathcal R^{(3)}=\frac{6k}{a^2}.
$$

$$
K_{ij}=Hh_{ij},\qquad K=3H,\qquad
K_{ij}K^{ij}=3H^2.
$$

> $u$ の世界線は時間的測地線であり、空間の体積要素と膨張率は

$$
dV_h=a^3dV_{\gamma_k},\qquad
\nabla_\mu u^\mu=3H.
$$

> 従って同じ二つの共動点の空間測地距離は $a(\tau)$ に比例する。
<!-- formal-statement-end -->

### 証明の見取り図

空間断面で $a$ は定数なので、空間接続は $\gamma_k$ と同じです。曲率の縮約には3次元という次元が働きます。第二基本形式には[GR39の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)を適用し、最後に接続係数から測地線性と膨張を確認します。

<!-- proof-start -->
### 証明

$h_{ij}=a^2\gamma_{ij}$ は空間偏微分に対して $\partial_i a=0$ なので、空間Christoffel係数は

$$
{}^{(3)}\Gamma^i{}_{jk}(h)
=\frac12h^{i\ell}(\partial_jh_{\ell k}+\partial_kh_{\ell j}-\partial_\ell h_{jk})
=\Gamma^i{}_{jk}(\gamma).
$$

従って上添字一つのRiemann曲率は $\gamma$ と同じですが、断面曲率は分母の長さの二乗が $a^2$ 倍なので $k/a^2$ です。[GEO16の定曲率空間の縮約](../../../幾何系/GEO/GEO16/index.md#cor-geo16-constant-curvature-contractions)に次元 $n=3$、断面曲率 $k/a^2$ を代入すると

$$
\operatorname{Ric}^{(3)}_{ij}=(3-1)\frac{k}{a^2}h_{ij},
\qquad \mathcal R^{(3)}=3(3-1)\frac{k}{a^2}
$$

を得ます。

$g_{\tau i}=0$、$g_{\tau\tau}=-1$ より、[GR39の時間発展表示](../GR39/index.md#prop-gr39-k-evolution)の $N=1,\beta=0$ を適用できます。

$$
K_{ij}=\frac12\partial_\tau h_{ij}
=a\dot a\,\gamma_{ij}=\frac{\dot a}{a}h_{ij}.
$$

$h^{ij}h_{ij}=3$ と $h^{ik}h^{j\ell}h_{ij}h_{k\ell}=3$ をそれぞれ縮約して $K=3H$ と $K_{ij}K^{ij}=3H^2$ となります。

共動世界線で $u^\mu=\delta^\mu_\tau$ です。$\Gamma^\mu_{\tau\tau}=\tfrac12g^{\mu\nu}(2\partial_\tau g_{\nu\tau}-\partial_\nu g_{\tau\tau})=0$ なので、$u^\nu\nabla_\nu u^\mu=0$ です。計量の行列式を使うと

$$
\det h=a^6\det\gamma,\qquad
\sqrt{\det h}=a^3\sqrt{\det\gamma},
$$

および $\det g=-\det h$ です。ゆえに

$$
\nabla_\mu u^\mu
=\frac1{\sqrt{-\det g}}\partial_\tau(\sqrt{-\det g}\,u^\tau)
=\frac1{a^3\sqrt{\det\gamma}}\partial_\tau(a^3\sqrt{\det\gamma})
=3\frac{\dot a}{a}.
$$

最後に固定した共動点 $x,y$ を結ぶ空間曲線 $c$ の長さは $L_h(c)=aL_\gamma(c)$ です。$a$ は正で全ての曲線に共通の係数なので、曲線に関する下限を取れば $d_h(x,y)=a\,d_\gamma(x,y)$ です。$\square$
<!-- proof-end -->

時刻が変わると $\mathcal R^{(3)}$ は $a^{-2}$、体積は $a^3$ に従い、外在曲率は $\dot a/a$ に従います。**空間の曲がり方**と**時刻面が時空内で変化する速さ**は別の情報です。例えば $k=0$ で $a$ が変化する宇宙は空間断面が平坦でも $K_{ij}$ は非零です。

## 5. 座標の規格化と物理的な曲率

計量に現れる $k=0,\pm1$ は曲率の**符号を規格化した記号**であり、実際に空間の曲率を測ると $k/a^2$ が現れます。空間座標だけの単位を変えたとき、$a$ と曲率パラメータがどのように見え方を変えるかを確かめます。

<a id="prop-gr41-coordinate-scale"></a>

<!-- formal-statement-start -->
> **命題（曲率パラメータの座標再標準化）**
> $a(\tau)>0$、定数 $K_0\in\mathbb R$ を用い、ある曲率座標領域で

$$
g=-d\tau^2+a(\tau)^2
\left(\frac{dr^2}{1-K_0r^2}+r^2d\Omega^2\right)
$$

> と書けるとする。任意の定数 $\lambda>0$ で $\widetilde r=\lambda r$ と再標準化すると、同じ計量は

$$
\widetilde a=\frac a\lambda,
\qquad \widetilde K_0=\frac{K_0}{\lambda^2}
$$

> を用いて同形に書ける。従って $K_0/a^2=\widetilde K_0/\widetilde a^2$ と $H=\dot a/a=\dot{\widetilde a}/\widetilde a$ は不変である。
<!-- formal-statement-end -->

### 証明の見取り図

空間距離の単位を変えれば、座標で表した尺度因子と曲率の係数は個別に変わります。しかし物理的な曲率や相対膨張率は幾何学的に測る値なので変わりません。

<!-- proof-start -->
### 証明

$r=\widetilde r/\lambda$、$dr=d\widetilde r/\lambda$ を代入します。

$$
\begin{aligned}
a^2\left(\frac{dr^2}{1-K_0r^2}+r^2d\Omega^2\right)
&=\frac{a^2}{\lambda^2}
\left(\frac{d\widetilde r^2}{1-(K_0/\lambda^2)\widetilde r^2}
+\widetilde r^2d\Omega^2\right)\\
&=\widetilde a^2\left(\frac{d\widetilde r^2}{1-\widetilde K_0\widetilde r^2}
+\widetilde r^2d\Omega^2\right).
\end{aligned}
$$

そして

$$
\frac{\widetilde K_0}{\widetilde a^2}
=\frac{K_0/\lambda^2}{a^2/\lambda^2}=\frac{K_0}{a^2},
\qquad \frac{\dot{\widetilde a}}{\widetilde a}
=\frac{\dot a/\lambda}{a/\lambda}=\frac{\dot a}{a}.
$$

$\lambda$ は時間と無関係な正定数であることを使用しました。時間依存の空間座標変換では一般に混合項が生じ、共動座標の形をそのまま保つとは限りません。$\square$
<!-- proof-end -->

例えば $K_0=9$ なら $\lambda=3$ を取って $\widetilde K_0=+1$ にできます。この場合 $\widetilde a=a/3$ なので、曲率 $9/a^2=1/\widetilde a^2$ は変化しません。$K_0=0$ ではどんな $\lambda$ でも零のままで、平坦模型の尺度因子の絶対的な規格化には自由度が残ります。

### 局所的な曲率と大域的な空間形状

曲率符号が同じなら空間の大域形状も一意だ、と考えるのは誤りです。例えば $\mathbb R^3$ を三方向の整数平行移動で同一視した平坦3トーラスは、局所計量がEuclid空間と同じで断面曲率も零ですが、遠くまで進むと元の場所へ戻ります。こうした商空間は、局所的な曲率条件を保っても、**各点の任意回転が大域等長変換になる**という強い等方性を失う場合があります。第1節の強い大域的定義と、観測可能な局所FLRW計量を区別してください。

### MinkowskiのMilne座標という検算

[GR40のMilne葉での制約検算](../GR40/index.md#ex-gr40-c01)では、Minkowski時空の未来光円錐内部が

$$
ds^2=-d\tau^2+\tau^2(d\chi^2+\sinh^2\chi\,d\Omega^2)
$$

と書けました。これは $k=-1,a(\tau)=\tau$（$\tau>0$）というFLRW形です。時刻面は $\mathcal R^{(3)}=-6/\tau^2$、$H=1/\tau$、$K_{ij}=h_{ij}/\tau$ ですが、時空全体のRiemann曲率は零です。空間断面の負曲率を「重力場が必ず曲がっている証拠」と読んではいけません。FLRWの形は幾何学的な対称性の選択であって、特定の物質場やEinstein方程式の解を自動的に指定するものではありません。

実際、[GR40のEinstein方程式からの制約](../GR40/index.md#thm-gr40-einstein-constraints)へ先ほどの曲率と第二基本形式を代入した左辺は

$$
\mathcal R^{(3)}+K^2-K_{ij}K^{ij}
=\frac{6k}{a^2}+9H^2-3H^2
=6\left(H^2+\frac{k}{a^2}\right)
$$

となります。**ここまでの式は幾何の検算**で、右辺の物質エネルギー密度や宇宙項との関係を決めるには場の方程式が必要です。次章では[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)と[GR8の流体保存則](../GR8/index.md#thm-gr8-fluid-projections)をこの形へ適用し、尺度因子の時間発展を調べます。

## 6. 演習

### Level A：対称性・座標・共動量の基本操作

<a id="ex-gr41-a01"></a>

### GR41-A01 回転に不変なテンソル
- Level: A

Euclid3次元空間のある点で、対称二階テンソルを実対称行列 $S=(S_{ij})$ で表す。すべての $R\in SO(3)$ に対して $R^\mathsf{T}SR=S$ が成り立つとする。座標軸まわりの180度回転と、$x,y$ 軸を交換する90度回転などを用いて $S=sI$ を導け。

<!-- solution-start -->
**詳細解答。** $x$ 軸まわりの180度回転は $R_x=\operatorname{diag}(1,-1,-1)$ です。$(R_x^\mathsf{T}SR_x)_{12}=-S_{12}$、$(13)$ 成分も $-S_{13}$ となるため $S_{12}=S_{13}=0$。$y$ 軸まわりの180度回転 $R_y=\operatorname{diag}(-1,1,-1)$ も用いれば $S_{23}=0$ です。従って $S=\operatorname{diag}(s_1,s_2,s_3)$。

$z$ 軸まわりの90度回転は $e_x\mapsto e_y$、$e_y\mapsto-e_x$ なので、不変性の $(1,1)$ 成分から $s_1=s_2$。$x$ 軸まわりの90度回転でも $s_2=s_3$ です。ゆえに $s_1=s_2=s_3=s$、すなわち $S=sI$。これを正規直交基底以外で表すと $S_{ij}=s h_{ij}$ です。
<!-- solution-end -->

<a id="ex-gr41-a02"></a>

### GR41-A02 曲率関数の初期値
- Level: A

$S_1(\chi)=\sin\chi$、$S_0(\chi)=\chi$、$S_{-1}(\chi)=\sinh\chi$ を与える。各 $k$ について $S_k''+kS_k=0$ と $S_k(0)=0,S_k'(0)=1$ を確かめ、$(S_k')^2=1-kS_k^2$ を示せ。

<!-- solution-start -->
**詳細解答。** $k=1$ では $S_1'=\cos\chi,S_1''=-\sin\chi$ なので $S_1''+S_1=0$、初期値は $0,1$、また $\cos^2\chi=1-\sin^2\chi$ です。

$k=0$ では $S_0'=1,S_0''=0$、初期値は $0,1$、$(S_0')^2=1=1-0\cdot\chi^2$ です。

$k=-1$ では $S_{-1}'=\cosh\chi,S_{-1}''=\sinh\chi$、従って $S_{-1}''-S_{-1}=0$、初期値は $0,1$、$\cosh^2\chi=1+\sinh^2\chi=1-kS_{-1}^2$ です。三場合で全ての条件が直接確認できました。
<!-- solution-end -->

<a id="ex-gr41-a03"></a>

### GR41-A03 正曲率の曲率座標の限界
- Level: A

単位3球面の測地極座標で $0<\chi<\pi$ とし、$r=\sin\chi$ とする。$dr/d\chi$ を求め、曲率座標への変換が局所可逆でない位置を特定せよ。同じ $r\in(0,1)$ に対応する異なる $\chi$ を二つ与えよ。

<!-- solution-start -->
**詳細解答。** 微分すると $dr/d\chi=\cos\chi$。$\chi=\pi/2$ ではこれが零なので、逆関数定理の条件が破れます。任意の $0<r<1$ に対して

$$
\chi_1=\arcsin r,\qquad \chi_2=\pi-\arcsin r
$$

はともに $(0,\pi)$ に属し、$\sin\chi_1=\sin\chi_2=r$、$\chi_1\ne\chi_2$ です。従って $r$ だけでは3球面の赤道の両側を区別できません。$1-r^2$ が零になるのは座標の折返しであり、断面曲率 $+1$ は有限のままです。
<!-- solution-end -->

<a id="ex-gr41-a04"></a>

### GR41-A04 lapseと宇宙時間
- Level: A

$t>0$ において $g=-4t^2dt^2+(1+t^2)^2(dx^2+dy^2+dz^2)$ とする。宇宙時間 $\tau$ を $\tau(1)=1$ で定め、尺度因子 $a(\tau)$、Hubble率 $H(\tau)$ を求めよ。

<!-- solution-start -->
**詳細解答。** lapseは $N(t)=2t>0$ です。共動世界線で $d\tau=Ndt=2t\,dt$ です。これは $d\tau/dt=2t$ という導関数の関係を表し、$t>0$ で零にならないため宇宙時間への変換が可逆です。従って

$$
\tau(t)-\tau(1)=\int_1^t2s\,ds=t^2-1.
$$

$\tau(1)=1$ より $\tau=t^2$。$t>0$ なので $t=\sqrt\tau$ と逆変換でき、$-4t^2dt^2=-d\tau^2$ です。空間係数を比較して $a(\tau)=1+\tau$、従って

$$
H(\tau)=\frac{da/d\tau}{a}=\frac{1}{1+\tau}.
$$

$t$ に関する $da/dt=2t$ をそのまま $H$ の分子に使ってはいけません。連鎖律によれば

$$
\frac{da}{d\tau}=\frac{da/dt}{d\tau/dt}=\frac{2t}{2t}=1
$$

で、上の値に一致します。
<!-- solution-end -->

<a id="ex-gr41-a05"></a>

### GR41-A05 平坦断面と共動距離
- Level: A

$\tau>0$、$k=0$、$a(\tau)=\tau^2$ のFLRW時空を考える。共動座標が $(0,0,0)$、$(L,0,0)$（$L>0$）の二点について空間測地距離 $d(\tau)$ とその時間微分を求め、$H$ と $\mathcal R^{(3)}$ を求めよ。

<!-- solution-start -->
**詳細解答。** 時刻面は $h=\tau^4(dx^2+dy^2+dz^2)$ です。二点を結ぶEuclidの直線の基準長は $L$、同じ時刻面で倍率 $a=\tau^2$ が一定だから

$$
d(\tau)=aL=\tau^2L,\qquad \dot d=2\tau L.
$$

一方 $H=\dot a/a=2\tau/\tau^2=2/\tau$ なので $Hd=2\tau L=\dot d$。空間曲率は $\mathcal R^{(3)}=6k/a^2=0$ です。空間が平坦でも共動距離は変化し、$K_{ij}=Hh_{ij}$ は零ではありません。
<!-- solution-end -->

### Level B：定曲率と時刻面の幾何を組み合わせる

<a id="ex-gr41-b01"></a>

### GR41-B01 空間対称性と混合項
- Level: B

時空計量が共通の空間平行移動と回転をすべて等長変換として持ち、$t$ を固定して作用するとする。一般の座標表示を

$$
g=g_{tt}(t,x)dt^2+2g_{ti}(t,x)dt\,dx^i+g_{ij}(t,x)dx^i dx^j
$$

とする。平行移動、180度回転、90度回転の順に不変性を使い、$g_{ti}=0$、$g_{ij}=b(t)^2\delta_{ij}$、$g_{tt}=-N(t)^2$ を示せ。Lorentz符号と空間面が正定値であることを仮定してよい。

<!-- solution-start -->
**詳細解答。** 平行移動 $x\mapsto x+c$ は微分行列が単位行列です。したがって $g_{tt},g_{ti},g_{ij}$ は $x+c$ と $x$ で同じ値を持ち、任意の $c$ について成立するのでいずれも $t$ のみの関数です。

次に一形式 $g_{ti}dx^i$ の成分を $v=(v_x,v_y,v_z)$ とします。$x$ 軸の180度回転で $(v_x,v_y,v_z)=(v_x,-v_y,-v_z)$、$y$ 軸の180度回転で $(v_x,v_y,v_z)=(-v_x,v_y,-v_z)$ だから三成分とも零です。

$g_{ij}$ は正定値の対称行列です。[演習A01](#ex-gr41-a01)で回転不変な対称行列は $sI$ と導いたので $g_{ij}=s(t)\delta_{ij}$。正定値性から $s>0$、$b=\sqrt s$ と置けます。空間混合項が零になったのでLorentz符号から $g_{tt}<0$、$N=\sqrt{-g_{tt}}>0$ と表せます。
<!-- solution-end -->

<a id="ex-gr41-b02"></a>

### GR41-B02 空間計量の定数倍と曲率
- Level: B

定断面曲率 $k$ の3次元計量 $\gamma$ と正定数 $a$ に対し $h_{ij}=a^2\gamma_{ij}$ とする。接続係数、Ricciテンソル、スカラー曲率を順に求め、$a=2,k=+1$ の場合の数値を示せ。

<!-- solution-start -->
**詳細解答。** $a$ は空間に関して定数なので、$h^{ij}=a^{-2}\gamma^{ij}$ と $\partial_\ell h_{ij}=a^2\partial_\ell\gamma_{ij}$ を[Levi-Civita接続の座標公式](../../../幾何系/GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)へ代入すると $a^{-2}$ と $a^2$ が相殺し、$\Gamma(h)^i{}_{jk}=\Gamma(\gamma)^i{}_{jk}$ です。従って $R^i{}_{jkl}$ とその縮約 $\operatorname{Ric}_{jl}=R^i{}_{jil}$ は成分として変わりません。

[GEO16の定曲率縮約](../../../幾何系/GEO/GEO16/index.md#cor-geo16-constant-curvature-contractions)を $\gamma$ に適用すると $\operatorname{Ric}(\gamma)=2k\gamma$。ゆえに

$$
\operatorname{Ric}(h)_{ij}=2k\gamma_{ij}=\frac{2k}{a^2}h_{ij},
\quad \mathcal R(h)=h^{ij}\operatorname{Ric}(h)_{ij}
=a^{-2}\gamma^{ij}(2k\gamma_{ij})=\frac{6k}{a^2}.
$$

$a=2,k=1$ では $\operatorname{Ric}(h)=\frac12h$、$\mathcal R(h)=6/4=3/2$ です。
<!-- solution-end -->

<a id="ex-gr41-b03"></a>

### GR41-B03 Milneと平坦断面の制約を比較する
- Level: B

$\tau>0$、$a(\tau)=\tau$ とする二つのFLRW時空 (I) $k=-1$ と (II) $k=0$ で、$\mathcal R^{(3)},K,K_{ij}K^{ij}$ を求めよ。[GR40のHamiltonian制約](../GR40/index.md#def-gr40-constraints)の右辺が $0$（$\rho=\Lambda=0$）の場合、それぞれ制約を満たすか判断せよ。運動量密度を $j_i=0$ として運動量制約も確認せよ。

<!-- solution-start -->
**詳細解答。** $H=\dot a/a=1/\tau$ なので、両者に共通して

$$
K=3/\tau,\qquad K_{ij}K^{ij}=3/\tau^2,\qquad
K^j{}_i=\tau^{-1}\delta^j_i
$$

です。(I) の空間スカラー曲率は $-6/\tau^2$、(II) は $0$ です。従ってHamiltonian左辺はそれぞれ

$$
\begin{aligned}
(\mathrm I):\quad&-6/\tau^2+9/\tau^2-3/\tau^2=0,\\
(\mathrm{II}):\quad&0+9/\tau^2-3/\tau^2=6/\tau^2\ne0.
\end{aligned}
$$

ゆえに(I)は真空Hamiltonian制約を満たし、(II)は満たしません。運動量制約の左辺は両者とも

$$
D_j(K\delta^j_i-K^j{}_i)
=D_j\left(\frac2\tau\delta^j_i\right)=0
$$

で、$\tau$ が同じ時刻面で空間的に一定という条件を使っています。従って両者とも $j_i=0$ の運動量制約は満たします。この判定は初期値制約についてのもので、(II)のどの物質模型が時間発展を実現するかまでは述べていません。
<!-- solution-end -->

<a id="ex-gr41-b04"></a>

### GR41-B04 規格化された曲率と座標の単位
- Level: B

$a(\tau)=2+\tau^2$ と $K_0=-4$ の曲率座標FLRW計量を考える。$\widetilde r=2r$ と変換し、$\widetilde a,\widetilde K_0$、変換前後の空間スカラー曲率とHubble率を求めよ。$k=\pm1,0$ の規格化と、空間曲率そのものを区別して説明せよ。

<!-- solution-start -->
**詳細解答。** $\lambda=2$ なので[座標再標準化命題](#prop-gr41-coordinate-scale)から $\widetilde a=(2+\tau^2)/2$、$\widetilde K_0=-4/4=-1$ です。変換前の空間スカラー曲率は

$$
\mathcal R^{(3)}=\frac{6K_0}{a^2}
=-\frac{24}{(2+\tau^2)^2}.
$$

変換後も $6\widetilde K_0/\widetilde a^2=-6/((2+\tau^2)^2/4)=-24/(2+\tau^2)^2$ です。$\dot a=2\tau$ なので

$$
H=\frac{2\tau}{2+\tau^2}
=\frac{d((2+\tau^2)/2)/d\tau}{(2+\tau^2)/2}
=\widetilde H.
$$

$\widetilde K_0=-1$ は曲率の負符号を単位規格化した記号で、空間で測る断面曲率は $-1/\widetilde a^2=-4/a^2$ です。曲率の絶対値は尺度因子に依存し、規格化記号そのものを観測量と同一視できません。
<!-- solution-end -->

### Level C：対称性・座標・制約を一つの時空で結ぶ

<a id="ex-gr41-c01"></a>

### GR41-C01 Milne宇宙を二つの時刻と座標で再構成する
- Level: C

$t>0$、$\chi\ge0$、$0<\theta<\pi$、$0<\phi<2\pi$ の局所領域で、次の計量を考える。

$$
g=-4t^2dt^2+t^4\left(d\chi^2+\sinh^2\chi\,d\Omega^2\right).
$$

次を順に示せ。

1. 宇宙時間を $\tau(1)=1$ となるよう求め、$k,a,H$ と共動観測者を確定する。
2. $r=\sinh\chi$ による曲率座標形を導き、曲率座標の $r$ の範囲を述べる。
3. 時刻面の $\mathcal R^{(3)},K_{ij},K,K_{ij}K^{ij}$ を求め、$\rho=j_i=\Lambda=0$ の両制約を検算する。
4. $T=\tau\cosh\chi$、$R=\tau\sinh\chi$ と変換し、$(T,R,\theta,\phi)$ で時空計量がMinkowskiの球座標形になることを示す。
5. 時刻面の曲率が負でも、4次元の曲率が零で矛盾しない理由を説明する。

<!-- solution-start -->
**詳細解答。**

**（1）** lapseは $N=2t>0$ なので、$d\tau/dt=2t$ を $t=1$ の初期値 $\tau(1)=1$ で積分して $\tau=t^2$ です。$t>0$ だから $\tau>0$、$t^4=\tau^2$ であり、$k=-1$、$a(\tau)=\tau$、$H=1/\tau$ です。空間座標を固定した連鎖律から

$$
u=\partial_\tau=\frac{dt}{d\tau}\partial_t=\frac1{2t}\partial_t,
\qquad g(u,u)=\frac{-4t^2}{(2t)^2}=-1.
$$

これにより $\partial_\tau$ と $\partial_t$ は同じ方向のベクトルを異なる時刻で表したもので、共動観測者の固有時は $\tau$ です。

**（2）** $r=\sinh\chi$ より $dr=\cosh\chi\,d\chi$、$\cosh^2\chi=1+\sinh^2\chi=1+r^2$ なので

$$
d\chi^2=\frac{dr^2}{1+r^2},\qquad
g=-d\tau^2+\tau^2\left(\frac{dr^2}{1+r^2}+r^2d\Omega^2\right).
$$

$\chi\ge0$ で $r\in[0,\infty)$、$dr/d\chi=\cosh\chi>0$ だから折返しはありません。$r=0$ の角座標の退化は極座標の原点に由来します。

**（3）** [FLRWの幾何命題](#prop-gr41-flrw-kinematics)に $k=-1,a=\tau,H=1/\tau$ を代入すると

$$
\mathcal R^{(3)}=-\frac6{\tau^2},\quad
K_{ij}=\frac1\tau h_{ij},\quad K=\frac3\tau,\quad
K_{ij}K^{ij}=\frac3{\tau^2}.
$$

Hamiltonian左辺は $(-6+9-3)/\tau^2=0$ です。運動量左辺は $D_j(2\delta^j_i/\tau)=0$ です。いずれも [GR40の制約](../GR40/index.md#def-gr40-constraints) の真空・宇宙項零の右辺に一致します。

**（4）** 変換の微分は

$$
dT=\cosh\chi\,d\tau+\tau\sinh\chi\,d\chi,
\qquad dR=\sinh\chi\,d\tau+\tau\cosh\chi\,d\chi.
$$

平方して引くと交差項が相殺し、$\cosh^2\chi-\sinh^2\chi=1$ から

$$
-dT^2+dR^2=-d\tau^2+\tau^2d\chi^2,
\qquad R^2d\Omega^2=\tau^2\sinh^2\chi\,d\Omega^2.
$$

従って $g=-dT^2+dR^2+R^2d\Omega^2$、すなわちMinkowski時空です。座標域は $T>R\ge0$ の未来光円錐内部で、$T^2-R^2=\tau^2>0$ です。

**（5）** 時刻面は $\tau$ 一定の双曲面で、その内在曲率は $-1/\tau^2$ です。一方で $K_{ij}=h_{ij}/\tau$ と非零なので、[Gauss射影](../GR40/index.md#prop-gr40-gauss-codazzi)で内在曲率と外在曲率の二次項が相殺します。4次元計量は上の座標変換によってMinkowskiと等長で、時空Riemann曲率は零です。「空間曲率」と「時空曲率」は同じではありません。
<!-- solution-end -->
