# GW1-05 泡立ちの機構

<!-- definition-example-audit: strict -->

## 1. エネルギーが一定でも写像列は滑らかには収束しない

[擬正則写像のエネルギーと面積の一致](../GW1-02/index.md#cor-gw1-02-energy-area)から、閉曲面の同じ曲線類を表す $J$-正則写像には一定のエネルギーがある。しかし、この式が抑えるのは微分の **二乗積分** であり、微分の各点での最大値ではない。前講では[単純曲線の横断性](../GW1-04/index.md#thm-gw1-04-universal-surjective)を調べたが、横断的な解の列でも、微分が小さな円盤へ集中して極限から消えてしまうことがある。

この章では、滑らかな閉Riemann面 $(\Sigma,j)$ と、コンパクトで境界のないシンプレクティック多様体 $(X,\omega)$、滑らかな $\omega$-適合概複素構造 $J$（[SYM8での多様体上の定義](../../SYM/SYM8/index.md#def-sym8-almost-complex)）を固定する。写像は滑らかで、常に $J$-正則とする。

微分のノルムと距離には、[適合性から得られる正定値計量](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)を各接空間で使う。その定義式は

$$
g_J(v,w)=\omega(v,Jw)
$$

である。局所座標 $z=s+it$ では $u_s=\partial u/\partial s$、$u_t=\partial u/\partial t$ と書き、前講と同じ[擬正則方程式](../GW1-02/index.md#def-gw1-02-j-holomorphic)を次の形で用いる。

$$
u_t=J(u)u_s.
$$

二次元では共形計量の選び方にエネルギーが依存しないので、円盤上はユークリッド計量で計算する。

円盤 $B_r(z_0)$ 上のエネルギーは

$$
E(u;B_r(z_0))=\frac12\int_{B_r(z_0)}|du|^2\,ds\,dt
=\int_{B_r(z_0)}u^*\omega.
$$

この等式は方程式と適合性から得られる点ごとの恒等式で、領域に境界があっても正しい。曲線類に依存する不変性は閉じた定義域に限る。

最初の問いは「エネルギーが集中する点を拡大すると何が残るか」である。その答えが **球面の泡** である。ここでは局所的な発生機構を証明し、泡が複数連なる場合の収束の定義と完全なエネルギー分裂は次講で扱う。

## 2. 射影直線の写像で集中を計算する

$\mathbb{CP}^1=\mathbb C\cup\{\infty\}$ に標準複素構造を入れ、シンプレクティック形式を

$$
\omega_{\mathrm{FS}}=\frac{i\,dw\wedge d\bar w}{(1+|w|^2)^2}
=\frac{2\,dx\wedge dy}{(1+|w|^2)^2}
$$

と規格化する。このとき全体の面積は $2\pi$ である。これは極座標で $2\int_0^{2\pi}\int_0^\infty r(1+r^2)^{-2}\,dr\,d\theta=2\pi$ と計算できる。

<a id="calc-gw1-05-rational-area"></a>

**一般の有理写像でも次数が面積を決める理由。** 以下の次数2・3の例では、べき写像に限らない正則有理写像の面積を計算する。まず、[射影写像の定義](../../../代数系/AG/AG2-03/index.md#def-ag2-03-projective-polynomial-map)を使う。共通射影零点を持たない同次数の斉次多項式の組によって、射影直線から射影直線への写像は

$$
f([Z:W])=[P(Z,W):Q(Z,W)],\qquad \deg P=\deg Q=d\ge1
$$

と表せる。ここで両多項式の共通零点がないことは、写像が定義域全体で定義される条件である。

次に、標的の正則値を一つ固定して、その逆像を数える。標的の点に同次座標を選べば、逆像の条件は

$$
[a:b]\in\mathbb{CP}^1,\qquad bP(Z,W)-aQ(Z,W)=0
$$

である。非定数であることから右の斉次多項式は恒等的に零にはならず、次数はちょうど $d$ である。

有限チャートで $p(z)=P(z,1)$、$q(z)=Q(z,1)$ とおく。商の微分は

$$
f'(z)=\frac{p'(z)q(z)-p(z)q'(z)}{q(z)^2}
$$

となる。非定数写像では分子は恒等的に零でなく、導関数が零となる定義域の点は有限個であり、それらの点の標的への像も有限個である。これらの例外値を除いた標的点では、上の次数 $d$ の斉次方程式の根はすべて単純であり、射影直線上にちょうど $d$ 個の逆像を持つ。無限遠の根も数え落とさない。

各正則な逆像の近くでは、複素座標表示 $w=f(z)$ が局所正則微分同相を与える。このとき、複素導関数 $f'(z)=df/dz$ に対する実Jacobianは

$$
\det_{\mathbb R}Df(z)=|f'(z)|^2>0
$$

である。従って正則値の近傍で局所逆写像ごとに向きを保つ変数変換を行える。上で述べた例外値の集合とその逆像は有限なので面積積分への寄与はなく、各正則値の逆像がちょうど $d$ 点であることから、

$$
\int_{\mathbb{CP}^1}f^*\omega_{\mathrm{FS}}
=d\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=2\pi d.
$$

つまり、この式はべき写像だけの公式ではなく、**共通零点がなく、非定数で正則な次数 $d$ の射影直線自己写像**に対して成り立つ。[擬正則写像のエネルギー・面積の一致](../GW1-02/index.md#cor-gw1-02-energy-area)と組み合わせると $E(f)=2\pi d$ となる。以後、具体的な多項式の組については共通零点と次数を確認してから適用する。

$\varepsilon>0$ とし、球面から球面への正則な一次写像

$$
u_\varepsilon(z)=\frac{\varepsilon}{z}
$$

を考える。$z=0$ は標的の $w=\infty$ の座標で滑らか、$z=\infty$ では値が0である。$z\ne0$ を固定すると $u_\varepsilon(z)\to0$ だが、$z=0$ では常に $u_\varepsilon(0)=\infty$ なので、球面全体での一様収束は成立しない。

正則写像のエネルギー密度はシンプレクティック面積密度に等しい。[エネルギー恒等式](../GW1-02/index.md#thm-gw1-02-energy-identity)を $w=\varepsilon/z$ に適用する。ここで $u_\varepsilon'(z)=dw/dz=-\varepsilon/z^2$ のプライムは複素座標 $z$ による導関数を表す。これを代入すると

$$
\frac12|du_\varepsilon|^2\,ds\,dt
=\frac{2|u_\varepsilon'(z)|^2}{(1+|u_\varepsilon(z)|^2)^2}\,ds\,dt
=\frac{2\varepsilon^2}{(|z|^2+\varepsilon^2)^2}\,ds\,dt.
$$

したがって、$R>0$ を固定して

$$
\begin{aligned}
E(u_\varepsilon;B_R(0))
&=4\pi\varepsilon^2\int_0^R
\frac{r}{(r^2+\varepsilon^2)^2}\,dr\\
&=2\pi\left(1-\frac{\varepsilon^2}{R^2+\varepsilon^2}\right)
\longrightarrow2\pi.
\end{aligned}
$$

すなわちエネルギーは点 $z=0$ に集まり、残りの領域では密度が0へ収束する。一方、標的の $\infty$ 近傍の正則座標 $\eta=1/w$ を使うと、$u_\varepsilon$ の座標表示は $\eta=z/\varepsilon$。従って $z=0$ での微分ノルムは $1/\varepsilon$ の定数倍になり、無限大へ発散する。

### 拡大した座標では何が見えるか

$z=\varepsilon\zeta$ と置いて新しい写像 $v_\varepsilon(\zeta)=u_\varepsilon(\varepsilon\zeta)$ を見ると、

$$
v_\varepsilon(\zeta)=\frac1\zeta
$$

であり、$\varepsilon$ に依存しない。$\zeta=\infty$ を加えると、非定数の球面写像が見つかった。元の球面で消えたエネルギー $2\pi$ が、拡大後には次数1の球面全体の面積になっている。

ただし、この例は**真に二つの安定した非定数成分が生じた例ではない**。元の写像は各 $\varepsilon$ で[射影線形写像に由来するMöbius変換](../../CM/CM1-10/index.md#thm-cm1-10-projective-automorphisms)であり、定義域の再パラメータ化を許すと一つの非定数成分で表せる。固定座標での集中と、安定写像の境界成分を区別することが重要である。

## 3. 集中点と拡大写像を定義する

一般の写像列で、ある点のどんな小円盤にも正のエネルギーが残るとき、その点は滑らかな収束を妨げる候補となる。極限と円盤半径の順序を明示しておく。

<a id="def-gw1-05-concentration"></a>

<!-- formal-statement-start -->
> **定義（エネルギー集中点）**  
> $J$-正則写像の列 $u_n:\Sigma\to X$ の全エネルギーが一様有界であるとする。点 $p\in\Sigma$ がエネルギー集中点であるとは、局所正則座標で測ったエネルギーについて

$$
\lim_{r\downarrow0}\liminf_{n\to\infty}
E(u_n;B_r(p))>0
$$

> が成り立つことをいう。半径を小さくすると積分領域も小さくなるので、左辺の極限は存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-05-concentration -->
**定義の確認**。先ほどの $u_{\varepsilon_n}$（$\varepsilon_n\to0$）では、各 $r>0$ について内側の極限は $2\pi$ なので $p=0$ は集中点である。一方 $p\ne0$ に閉円盤を選び、その円盤が0を含まないようにすると密度は一様に0へ収束する。無限遠点 $p=\infty$ の近傍でも、座標 $\xi=1/z$ で $u_{\varepsilon_n}=\varepsilon_n\xi$ となり同じ結論である。従って $p\ne0$ は集中点ではない。定義の二重極限は、この二つを区別する。
<!-- definition-example-end -->

どの程度まで拡大するかは微分の大きさで決める。局所座標 $z$ で $z_n\to p$ を選び、$R_n=|du_n(z_n)|\to\infty$ なら縮尺 $\rho_n=R_n^{-1}$ を取りたい。このとき中心での拡大写像の微分が1になる。

<a id="def-gw1-05-rescaling"></a>

<!-- formal-statement-start -->
> **定義（再スケーリングと球面の泡）**  
> 局所正則座標で $z_n\to p$、$\rho_n>0$、$\rho_n\to0$ を選び、拡大された円盤上で

$$
v_n(\zeta)=u_n(z_n+\rho_n\zeta)
$$

> とする。任意のコンパクト集合上で $v_n$ が滑らかに非定数 $J$-正則写像 $v:\mathbb C\to X$ へ収束し、$E(v;\mathbb C)<\infty$ なら、[後の第5節で証明する除去可能特異点定理](#thm-gw1-05-removal)によって $v$ に $\infty$ の値を加えて得る $J$-正則球面を、抽出された球面の泡という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-05-rescaling -->
**定義の確認**。$u_{\varepsilon_n}(z)=\varepsilon_n/z$ では $z_n=0$、$\rho_n=\varepsilon_n$ と取る。$v_n(\zeta)=1/\zeta$ は標的の無限遠座標も使えば $\mathbb C$ 全体で滑らかで、非定数、エネルギー $2\pi$ は有限である。$\zeta=\infty$ に0を対応させれば球面写像となる。ここでは「有限エネルギー」「非定数」「滑らかな収束」をすべて直接確認できる。
<!-- definition-example-end -->

一般の列に対しては、単に微分が最大の点を選ぶだけでは足りない。拡大した円盤の半径が無限に広がり、かつその中の微分を局所一様に制御できる点の選び方が必要となる。

## 4. 小エネルギーなら勾配は大きくならない

本節は泡の抽出を支える局所解析である。条件を小エネルギーに限定する理由は、縮尺を変えても二次元のエネルギーが変わらないためである。

<a id="lem-gw1-05-small-energy"></a>

<!-- formal-statement-start -->
> **補題（小エネルギー勾配評価）**  
> コンパクトな $(X,\omega,J)$ を固定する。正則座標円盤 $B_{2r}\subset\Sigma$ 上の滑らかな $J$-正則写像 $u$ に対し、標的と座標の有界幾何にのみ依存する定数 $\epsilon_0>0$、$C>0$ が存在する。$0<r\le r_0$ かつ

$$
E(u;B_{2r})<\epsilon_0
$$

> なら、内側の円盤で

$$
\sup_{B_r}|du|^2\le\frac{C}{r^2}E(u;B_{2r})
$$

> が成り立つ。ノルムは座標計量で取り、定数はコンパクトな座標族上で一様に選べる。
<!-- formal-statement-end -->

### 証明の見取り図

[楕円型正則性](../GW1-03/index.md#thm-gw1-03-elliptic-estimate)は微分を制御する道具だが、非線形方程式の二次項があるので、先に小エネルギーを用いて二次項を吸収する必要がある。実際の核心は次の微分不等式と、最大点を拡大する議論である。

<!-- proof-start -->
### 証明

局所座標で $u_t=J(u)u_s$ を $s,t$ について微分する。ここで $u_{st}=\partial_s\partial_tu$、$dJ(u)\,u_s$ は $u_s$ 方向への $J$ の微分、$\Delta=\partial_s^2+\partial_t^2$ は定義域の平面Laplacianである。連鎖律から

$$
\begin{aligned}
u_{st}&=(dJ(u)\,u_s)u_s+J(u)u_{ss},\\
u_{tt}&=(dJ(u)\,u_t)u_s+J(u)u_{st}.
\end{aligned}
$$

$J^2=-I$、$u_t=Ju_s$ を代入して

$$
\Delta u=(dJ(u)\,Ju_s)u_s+J(u)(dJ(u)\,u_s)u_s
$$

を得る。右辺は一階微分の二次式である。標的の有限個の座標と共変微分を使い、$e=\tfrac12|du|^2$ に対してBochner計算を行うと

$$
\Delta e\ge-C_1(e+e^2)
$$

が得られる。具体的には $\Delta|du|^2=2|\nabla du|^2+2\langle du,\nabla\Delta u\rangle$ の最後の項で、上の二次式を微分して現れる $|du|^2|\nabla du|$ をYoungの不等式で正の $|\nabla du|^2$ に吸収する。残る $|du|^4$ と曲率の $|du|^2$ が右辺に相当する。コンパクト性によって係数は一様である。

以下、半径を1に規格化する。もし重み付き最大値

$$
M=\max_{\overline B_1}(1-|z|)^2e(z)
$$

が大きいなら、最大点 $a$ の $\delta=(1-|a|)/2$ 以内では $1-|z|\ge(1-|a|)/2$ だから、最大性により $e(z)\le4e(a)$ となる。$\lambda=\sqrt{e(a)}$ で $\zeta=\lambda(z-a)$ と拡大し、$q(\zeta)=e(a+\zeta/\lambda)/\lambda^2$ とすると $q(0)=1$、$0\le q\le4$ である。$M$ が大きいと $\lambda\delta$ も大きくなるので固定半径の拡大円盤を取れる。$\zeta$ に関するLaplacianでは、

$$
\Delta_\zeta q
=\lambda^{-4}(\Delta_z e)(a+\zeta/\lambda)
\ge-C_1\left(\lambda^{-2}q+q^2\right)\ge-C_2.
$$

最後の不等式は $q\le4$ と、十分大きい $\lambda$ を使った。非負関数に対する円盤の平均値評価を使えば、十分小さい固定半径 $s$ で

$$
1=q(0)\le C_3s^{-2}\int_{B_s}q+C_2s^2
\le C_3s^{-2}E(u;B_2)+\frac12.
$$

このため $E(u;B_2)<s^2/(2C_3)$ なら、そのような大きな $M$ は存在できない。$M$ は一様に有界となり、内側の円盤で $e$ も有界となる。ここで $\Delta e\ge-C_4e$ へ戻り、同じ平均値評価を $B_1$ 内の小円盤へ適用して $\sup_{B_{1/2}}e\le C_5\int_{B_1}e$ を得る。半径 $r$ へ戻すと、導関数は $r^{-1}$ 倍、二乗エネルギーは共形不変であるから、主張の $r^{-2}$ が現れる。

用いた平均値評価は $\Delta f\ge-af-b$、$f\ge0$ の円盤上の局所評価であり、[楕円型局所評価](../GW1-03/index.md#thm-gw1-03-elliptic-estimate)と円盤の平均値公式（Poisson方程式の比較）から得られる。定数の具体値ではなく、小エネルギーなら二次項を制御できる点が鍵である。
<!-- proof-end -->

この補題の反対向きの使い方が泡の検出である。固定点の近傍で勾配が無限に増大するなら、その点のどんな小円盤にも少なくとも $\epsilon_0$ 程度のエネルギーが残らなければならない。

<a id="cor-gw1-05-finite-points"></a>

<!-- formal-statement-start -->
> **系（集中点は有限個）**  
> 閉Riemann面上の $J$-正則写像列 $u_n$ が $\sup_nE(u_n)\le E_0$ を満たすとする。部分列を取ると、勾配が一様に有界でなくなり得る点の集合は有限個で、その個数は $E_0/\epsilon_0$ 以下である。これら以外のコンパクト集合上ではさらに部分列を取って滑らかに収束する。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギー密度を測度として弱収束させ、一定以上の質量を持つ原子の個数を数える。非原子点では小円盤のエネルギーが $\epsilon_0$ 未満となり勾配評価が働く。

<!-- proof-start -->
### 証明

コンパクトな $\Sigma$ 上のエネルギー密度を非負測度として考える。

$$
\mu_n=\tfrac12|du_n|^2d\operatorname{vol}_\Sigma,
\qquad
\mu_n(\Sigma)\le E_0.
$$

有界な測度の弱コンパクト性により、部分列で $\mu_n\rightharpoonup\mu$ とできる。$\mu(\{p\})\ge\epsilon_0$ の点は、全質量が $E_0$ 以下であるから高々 $E_0/\epsilon_0$ 個である。

それ以外の点 $p$ については、十分小さい $r>0$ を選んで $\mu(\overline{B_{2r}(p)})<\epsilon_0$ とできる。閉集合に対する弱収束の上半連続評価から、十分大きな $n$ で

$$
E(u_n;B_{2r}(p))
\le\mu_n(\overline{B_{2r}(p)})<\epsilon_0
$$

となる。よって[小エネルギー勾配評価](#lem-gw1-05-small-energy)から $B_r(p)$ での微分が一様有界である。

この微分制御と[楕円型正則性](../GW1-03/index.md#thm-gw1-03-elliptic-estimate)を反復し、Arzelà–Ascoli と対角部分列により、これらの点を避けたコンパクト集合上で局所 $C^\infty$ 収束を得る。従って勾配が発散する点はすべて $\mu$ の質量が $\epsilon_0$ 以上の原子に含まれる。
<!-- proof-end -->

$\epsilon_0$ は小エネルギー評価の閾値であり、非定数球面が持つ最小エネルギーの議論にも使用する。

## 5. 有限エネルギーの穿孔は埋められるか

拡大後の極限が $\mathbb C$ 上に得られても、まだ定義域は球面ではない。無限遠点に値を延長する必要がある。反転座標 $w=1/\zeta$ で、これは穿孔円盤 $0<|w|<1$ の点 $w=0$ を埋める問題に変わる。

<a id="thm-gw1-05-removal"></a>

<!-- formal-statement-start -->
> **定理（有限エネルギーの除去可能特異点）**  
> $(X,\omega,J)$ がコンパクトで $J$ が滑らかかつ $\omega$-適合とする。$v:B_1(0)\setminus\{0\}\to X$ が滑らかな $J$-正則写像で

$$
E(v;B_1\setminus\{0\})<\infty
$$

> を満たすなら、$v$ は $0$ まで連続に延長され、その延長は滑らかな $J$-正則写像である。
<!-- formal-statement-end -->

### 証明の見取り図

小円盤のエネルギーが0へ近づくので、その周辺の勾配は小エネルギー評価で制御できる。小円周の像が短いことと、局所的な面積の等周評価から、中心へ向かうエネルギーが冪乗で減少する。すると像は一点へ収束し、方程式の楕円型正則性で滑らかになる。

<!-- proof-start -->
### 証明

$A(r)=E(v;0<|w|<r)$ と置く。有限エネルギーなので $A(r)\to0$。十分小さな $r$ に対し、環帯 $r/2<|w|<2r$ を半径が $r$ に比例する円盤で覆うと、[小エネルギー勾配評価](#lem-gw1-05-small-energy)から

$$
\sup_{|w|=r}|dv(w)|\le\frac{C}{r}\sqrt{A(4r)}.
$$

従って円周像の長さ $\ell(r)$ は $C\sqrt{A(4r)}\to0$。十分短い閉曲線に対し、標的の正規座標球内の円錐で張った局所的なシンプレクティック作用は $C\ell(r)^2$ 以下となる。実際、円周像を $\gamma$、中心を $q$ とし、$F(t,\theta)=\exp_q(t\exp_q^{-1}\gamma(\theta))$ で張ると、$\omega$ の有界性、$|\partial_tF|\le C\ell$、$|\partial_\theta F|\le Ct|\gamma'|$ から

$$
\left|\int F^*\omega\right|\le C\ell(r)\int|\gamma'|\,d\theta=C\ell(r)^2.
$$

小さい円周 $\gamma_r(\theta)=v(re^{i\theta})$ は長さが零へ近づくので、一つの凸な正規座標球で張れる。円錐の積分を $a(r)=\int F_r^*\omega$ と書けば、上の評価で $|a(r)|\le C\ell(r)^2\to0$ である。

**局所作用と内側のエネルギーの対応。** 固定した十分小さい $r>0$ の近傍で半径 $s$ を少しだけ変えると、$\gamma_r$、$\gamma_s$、その間の薄い環帯の像は同じ凸な正規座標球に入る。そこで $\omega=d\lambda$ と書けるからStokesの定理より

$$
a(s)-a(r)=\int_{\{r<|w|<s\}}v^*\omega=A(s)-A(r)
\qquad (r<s\ \text{が十分近いとき}).
$$

これは各 $r$ で局所的に成り立ち、$a(r)-A(r)$ は連結した小半径の区間で一定である。$r\downarrow0$ では $a(r)\to0$ と $A(r)\to0$ だから定数は零で、$A(r)=a(r)$ を得る。異なる半径の円錐を無条件に同じ座標球へ置く必要はない。

円周のエネルギーを $A'(r)=\frac12\int_{|w|=r}|dv|^2\,ds$ と書けば、Cauchy–Schwarzにより

$$
\ell(r)^2\le(2\pi r)\int_{|w|=r}|dv|^2\,ds
=4\pi r A'(r).
$$

従って $A(r)\le C r A'(r)$。$A(r)>0$ の場合に両辺を割って積分すると

$$
\frac{A'(r)}{A(r)}\ge\frac1{Cr},
\qquad
A(r)\le A(r_0)\left(\frac r{r_0}\right)^{1/C}
$$

を得る。$A(r)=0$ がある場合はその内側では定数写像である。この冪減衰を上の勾配評価に代入すると $|dv(w)|\le C|w|^{-1+\alpha}$（ある $\alpha>0$）。半径を半減するごとの像の移動量は $O(r^\alpha)$ で可算和が収束するため、$v(w)$ は $w\to0$ で一点へ収束し、ある正の指数 $\alpha$ に対して $d(v(w),v(0))\le C|w|^\alpha$ を満たす形で連続に延長される。

最後にこの延長は弱い意味で $\bar\partial_Jv=0$ を満たす。穿孔円盤で方程式が成立し、中心に半径 $r$ の切除を施した弱形式の境界項は $O(r\sup_{|w|=r}|v|)$ で0へ収束するからである。連続解に対して[一階楕円型正則性](../GW1-03/index.md#thm-gw1-03-elliptic-estimate)と局所座標での非線形方程式のブートストラップを適用すると滑らかな解を得る。
<!-- proof-end -->

この結論を使うと、有限エネルギーの $\mathbb C$ 上の $J$-正則写像は $\mathbb C\cup\{\infty\}\simeq\mathbb{CP}^1$ へ延長される。なお、有限エネルギーを外すと主張は一般に成り立たない。例えば複素平面への $v(z)=1/z$ は穿孔円盤で正則だが、標的が非コンパクトな $\mathbb C$ であり、そこでの通常のエネルギーは無限大である。仮定を落としたときに壊れるのは、小円盤のエネルギーを0へ送る工程である。

## 6. 非定数球面を実際に抽出する

ここでは有限個の特異点を除く滑らかな収束から、特異点の一つを拡大して非定数球面を得る。複数のスケールの貼り合わせはまだ行わない。

<a id="thm-gw1-05-bubble"></a>

<!-- formal-statement-start -->
> **定理（勾配爆発点からの球面の泡の抽出）**  
> $(X,\omega,J)$ を上記のコンパクトな適合標的とし、固定した閉Riemann面 $\Sigma$ 上の $J$-正則写像 $u_n$ が $\sup_nE(u_n)\le E_0$ を満たすとする。ある座標円盤内の点 $p$ の任意の近傍で $\sup|du_n|$ が部分列に沿って非有界なら、さらに部分列と $z_n\to p$、$\rho_n\to0$ を選んで

$$
v_n(\zeta)=u_n(z_n+\rho_n\zeta)
\longrightarrow v(\zeta)
$$

> が $\mathbb C$ の各コンパクト集合上で滑らかに成立し、$|dv(0)|=1$、$E(v;\mathbb C)\le E_0$ を満たす。従って $v$ は非定数の滑らかな $J$-正則球面へ延長される。
<!-- formal-statement-end -->

### 証明の見取り図

勾配が大きい点のうち、境界までの距離との積を最大にする点を選ぶ。この選び方なら、拡大後の中心の勾配を1へ規格化しても、任意の固定半径の円盤上で勾配は2程度に抑えられる。局所楕円型正則性で収束させ、無限遠の穿孔を埋める。

<!-- proof-start -->
### 証明

点選択で中心が確かに $p$ へ近づくことを先に保証する。$p$ を中心とする座標円盤 $D_k=B_{r_k}(p)$ を $r_k\downarrow0$ で取り、その内側 $D'_k=B_{r_k/2}(p)$ を考える。仮定により、添字 $n_k$ を単調増加かつ十分大きく選んで $\sup_{D'_k}|du_{n_k}|>2k/r_k$ とできる。以下はこの対角部分列を再び $u_n$ と書き、対応する円盤と半径も $D_n$、$D'_n$、$r_n$ と書き直す。各 $D_n$ 上で

$$
f_n(z)=\operatorname{dist}(z,\partial D_n)|du_n(z)|
$$

を最大化する $z_n$ を取る。$D'_n$ では境界距離が $r_n/2$ 以上なので、最大値 $M_n=f_n(z_n)>n\to\infty$ となる。しかも $z_n\in D_n$ だから $z_n\to p$ である。$R_n=|du_n(z_n)|$、$\rho_n=R_n^{-1}$、$d_n=\operatorname{dist}(z_n,\partial D_n)$ と置けば $R_n\ge M_n/r_n\to\infty$、従って $\rho_n\to0$ であり、

$$
\frac{d_n}{\rho_n}=d_nR_n=M_n\to\infty.
$$

拡大写像 $v_n(\zeta)=u_n(z_n+\rho_n\zeta)$ は任意の固定円盤 $B_L(0)$ 上で大きな $n$ に対して定義される。また $|\zeta|\le L$ なら $d_n-\rho_nL\ge d_n/2$ なので、最大性から

$$
|du_n(z_n+\rho_n\zeta)|
\le\frac{M_n}{d_n-\rho_nL}\le 2R_n.
$$

連鎖律より $|dv_n(\zeta)|=\rho_n|du_n(z_n+\rho_n\zeta)|\le2$、かつ $|dv_n(0)|=1$。$X$ はコンパクトなので像の零階の値も有界であり、固定円盤上の勾配評価と[楕円型正則性](../GW1-03/index.md#thm-gw1-03-elliptic-estimate)から高階導関数を制御できる。対角部分列を取り、$v_n\to v$ が局所 $C^\infty$ で成り立つ。方程式は極限で保存され、中心の微分ノルムは1だから $v$ は非定数である。

任意の $L>0$ について、二次元エネルギーの共形不変性と変数変換から

$$
E(v;B_L)=\lim_{n\to\infty}E(v_n;B_L)
=\lim_{n\to\infty}E(u_n;B_{\rho_nL}(z_n))\le E_0.
$$

$L\uparrow\infty$ として $E(v;\mathbb C)\le E_0$ を得る。[有限エネルギーの除去可能特異点定理](#thm-gw1-05-removal)を $\zeta=\infty$ の反転座標へ適用すると、$v$ は球面上へ延長される。

特異点が複数ある場合でも、[集中点の有限性](#cor-gw1-05-finite-points)により各集中点を局所的に扱える。上の対角的な点選択では初めから $z_n\in B_{r_n}(p)$ としたため、中心が別の集中点へ逸れることはない。これが「泡の存在」を導く局所的な論証である。
<!-- proof-end -->

この定理は**一つの非定数球面の出現**を示す。元の写像の「残り」と泡をつなぐ節点条件、別の縮尺で現れる追加の泡、残留する環帯のエネルギーが0になることは、これだけではまだ証明されていない。

## 7. 一個の泡は正のエネルギーを消費する

非定数球面がいくらでも小さなエネルギーを持てるなら、泡を無限個取り出す事態を排除できない。コンパクトな適合標的ではそれは起こらない。

<a id="thm-gw1-05-quantization"></a>

<!-- formal-statement-start -->
> **定理（球面エネルギー量子化）**  
> コンパクトな $(X,\omega,J)$ について $\hbar>0$ が存在し、任意の非定数の滑らかな $J$-正則写像 $v:\mathbb{CP}^1\to X$ に対して

$$
E(v)=\int_{\mathbb{CP}^1}v^*\omega\ge\hbar
$$

> が成り立つ。この $\hbar$ は固定した標的の幾何に依存し、球面写像の選択には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

全エネルギーが極めて小さければ、[小エネルギー勾配評価](#lem-gw1-05-small-energy)によって球面全体で微分が小さくなる。像が標的の一つの正規座標球に収まれば、そこで $\omega$ は完全形式なので面積はStokesの定理で0となる。正のエネルギーを持つ非定数球面と矛盾する。

<!-- proof-start -->
### 証明

球面を有限個の正則座標円盤 $B_{2r_i}$ で覆い、それらの内側 $B_{r_i}$ でなお球面を覆うように取る。$E(v)<\epsilon_0$ なら各円盤で[小エネルギー勾配評価](#lem-gw1-05-small-energy)が適用できるため、コンパクト性と有限被覆により

$$
\sup_{\mathbb{CP}^1}|dv|\le C\sqrt{E(v)}.
$$

球面上の任意の二点を長さが球面の直径以下の測地線で結べば、その像の距離は上の上界と測地線長の積以下である。従って $\operatorname{diam}(v(\mathbb{CP}^1))\le C'\sqrt{E(v)}$。$E(v)$ が十分小さい場合、像は $X$ の一つの可縮な正規座標球 $U$ に含まれる。閉2形式 $\omega$ は $U$ 上で $\omega=d\lambda$ と書ける（局所Poincaré補題）。球面に境界がないから

$$
E(v)=\int_{\mathbb{CP}^1}v^*\omega
=\int_{\mathbb{CP}^1}d(v^*\lambda)=0.
$$

[適合計量によるエネルギー恒等式](../GW1-02/index.md#cor-gw1-02-energy-area)によって $dv=0$、すなわち $v$ は定数となる。これに矛盾しないための小ささの閾値を $\hbar$ とすれば主張が従う。
<!-- proof-end -->

例えば上の標準 $\mathbb{CP}^1$ を標的とする正則球面では、非定数正則写像の次数は正整数 $d$ で、エネルギーは $2\pi d$ である。[上で確かめた有理写像の次数と面積の対応](#calc-gw1-05-rational-area)によって、この特定の標的では $\hbar=2\pi$ を取れる。一般の標的で同じ数値を使ってよいわけではない。

## 8. 二つの非定数成分が現れる実例とエネルギー分裂

もう少し本格的な例として、$\varepsilon>0$ に対して

$$
f_\varepsilon(z)=z+\frac{\varepsilon}{z}
=\frac{z^2+\varepsilon}{z}
$$

を $\mathbb{CP}^1$ から自身への正則写像とする。分子と分母には共通因子がないので、これは次数2であり、[有理写像の次数と面積の対応](#calc-gw1-05-rational-area)から総エネルギーは $4\pi$ である。$z\ne0$ を固定すると $f_\varepsilon(z)\to f_0(z)=z$、すなわち次数1の基底写像が残る。一方、$z=\varepsilon\zeta$ と拡大すると

$$
f_\varepsilon(\varepsilon\zeta)
=\varepsilon\zeta+\frac1\zeta\longrightarrow\frac1\zeta=:v(\zeta).
$$

泡も次数1である。接続条件は、基底側の付着点 $z=0$ における $f_0(0)=0$ と泡側の無限遠 $v(\infty)=0$ が一致することである。両成分は非定数なので、この二成分は定数成分の場合と違って安定写像として残せる。

<a id="prop-gw1-05-explicit-splitting"></a>

<!-- formal-statement-start -->
> **命題（射影直線の次数2の泡立ちとエネルギー分裂）**  
> 標準の $\mathbb{CP}^1$ に対し $f_\varepsilon(z)=z+\varepsilon/z$（$\varepsilon\downarrow0$）を考える。基底極限 $f_0(z)=z$ と拡大極限 $v(\zeta)=1/\zeta$ は、ともに次数1である。特に総エネルギーと二成分のエネルギーは

$$
4\pi=2\pi+2\pi
$$

> を満たし、これら二成分の間の環帯に残るエネルギーは0へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

外側の固定領域では基底への滑らかな収束、内側の拡大領域では泡への滑らかな収束がある。それぞれの領域で得られるエネルギーの下界の和が総量 $4\pi$ に一致するため、間の環帯には正の残量を置けない。

<!-- proof-start -->
### 証明

次数2の正則写像であることは、斉次座標で

$$
[Z:W]\longmapsto[Z^2+\varepsilon W^2:ZW]
$$

と書けば分かる。$Z,W$ が同時に0でないとき、分子と分母は同時に0にならない（$\varepsilon>0$）。よって次数は2で、[§2で示した面積の変数変換](#calc-gw1-05-rational-area)から $E(f_\varepsilon)=4\pi$。

任意の $\delta>0$ について外側 $\{|z|\ge\delta\}$ で $f_\varepsilon\to f_0$ は滑らかであり、

$$
\lim_{\varepsilon\to0}E(f_\varepsilon;\{|z|\ge\delta\})
=E(f_0;\{|z|\ge\delta\}).
$$

この右辺は $\delta\downarrow0$ で $E(f_0)=2\pi$ に近づく。他方、任意の $L>0$ に対し、変数変換 $z=\varepsilon\zeta$ と拡大極限の滑らかな収束により

$$
\lim_{\varepsilon\to0}E(f_\varepsilon;\{|z|\le L\varepsilon\})
=E(v;\{|\zeta|\le L\}).
$$

$L\uparrow\infty$ で右辺は $E(v)=2\pi$ になる。$\varepsilon L<\delta$ なら内側、環帯、外側は互いに重ならない。エネルギーの非負性から、環帯のエネルギーの上極限は

$$
\limsup_{\varepsilon\to0}E(f_\varepsilon;\{L\varepsilon<|z|<\delta\})
\le 4\pi-E(f_0;\{|z|\ge\delta\})-E(v;\{|\zeta|\le L\}).
$$

先に $\varepsilon\to0$、次に $\delta\downarrow0$ と $L\uparrow\infty$ を行うと右辺は0となる。従って環帯に残留エネルギーはない。
<!-- proof-end -->

**一般論との境界**。この証明で環帯のエネルギーが0と分かったのは、正則写像の次数という**既知の総量**と、二つの成分がその全量を使い切ることを独立に計算したためである。任意の標的の写像列に対して弱測度収束や一個の泡の抽出だけから同じ結論を出すことはできない。一般の「首にエネルギーが残らない」評価、泡の木、節点での一致を扱うのは次講のGromov収束である。

## 9. 演習：どのエネルギーが、どこへ移るか

### Level A

<a id="ex-gw1-05-a01"></a>
#### GW1-05-A01 円盤の集中エネルギー
- Level: A

$u_\varepsilon(z)=\varepsilon/z$、$\omega_{\mathrm{FS}}=2\,dx\wedge dy/(1+|w|^2)^2$ とする。$E(u_\varepsilon;B_R)$ を積分し、$R=\varepsilon$ の値および固定 $R>0$ での極限を計算せよ。

<!-- solution-start -->
**詳細解答**。正則写像の引戻し面積は $2|u_\varepsilon'|^2/(1+|u_\varepsilon|^2)^2=2\varepsilon^2/(r^2+\varepsilon^2)^2$。極座標で

$$
E=4\pi\varepsilon^2\int_0^R\frac{r}{(r^2+\varepsilon^2)^2}\,dr
=2\pi\frac{R^2}{R^2+\varepsilon^2}.
$$

$R=\varepsilon$ では $\pi$、固定 $R>0$ では $\varepsilon\to0$ で $2\pi$。縮尺と同じ半径には全エネルギーの半分があり、固定半径には最終的に全量が入る。
<!-- solution-end -->

<a id="ex-gw1-05-a02"></a>
#### GW1-05-A02 再スケーリングでの微分とエネルギー
- Level: A

$u:B_{2r}\to X$、$z_0\in B_{2r}$、$\rho,L>0$ とし、$B_{\rho L}(z_0)\subset B_{2r}$ と仮定する。$v(\zeta)=u(z_0+\rho\zeta)$ について、$dv$ と $E(v;B_L)$ を元の写像で表せ。

<!-- solution-start -->
**詳細解答**。連鎖律で $dv_\zeta=\rho\,du_{z_0+\rho\zeta}$。従って二乗ノルムは $\rho^2$ 倍である。変数変換 $z=z_0+\rho\zeta$ による面積要素は $ds\,dt=\rho^2d\xi\,d\eta$ なので

$$
E(v;B_L)=\frac12\int_{B_L}\rho^2|du(z_0+\rho\zeta)|^2\,d\xi\,d\eta
=E(u;B_{\rho L}(z_0)).
$$

二次元で係数が相殺されるのが核心である。
<!-- solution-end -->

<a id="ex-gw1-05-a03"></a>
#### GW1-05-A03 次数とエネルギーの保存
- Level: A

$f_\varepsilon(z)=(z^2+\varepsilon)/z$（$\varepsilon>0$）の次数と総エネルギーを求め、$z\ne0$ での極限の次数と比較せよ。

<!-- solution-start -->
**詳細解答**。斉次表示は $[Z^2+\varepsilon W^2:ZW]$。分子と分母に共通零点はなく斉次次数2だから次数2である。[§2で示した面積の変数変換](#calc-gw1-05-rational-area)より総エネルギー $4\pi$。$z\ne0$ では $f_\varepsilon(z)\to z$ なので極限の次数は1、エネルギーは $2\pi$。差の $2\pi$ を、固定領域での極限だけから消えたと判断してはいけない。
<!-- solution-end -->

<a id="ex-gw1-05-a04"></a>
#### GW1-05-A04 勾配爆発の座標判定
- Level: A

$u_\varepsilon(z)=\varepsilon/z$ の $z=0$ における勾配を、標的の有限座標 $w$ ではなく $\eta=1/w$ で計算し、極限を述べよ。

<!-- solution-start -->
**詳細解答**。$u_\varepsilon(0)=\infty$ なので有限座標 $w$ の式の微分を0へ代入することはできない。標的の $\infty$ 近くの座標では $\eta=1/u_\varepsilon=z/\varepsilon$。従って $d\eta/dz=1/\varepsilon$。Fubini–Study計量の座標係数は $\eta=0$ で正の定数なので、$|du_\varepsilon(0)|$ は $C/\varepsilon$ となり発散する。座標の取り違えが見かけの極を生むのではなく、幾何学的な微分も本当に発散する。
<!-- solution-end -->

<a id="ex-gw1-05-a05"></a>
#### GW1-05-A05 小エネルギー評価の対偶
- Level: A

ある局所正則座標の点 $p$ と固定した $0<r\le r_0$ について、$B_{2r}(p)$ がこの座標域に含まれ、$E(u_n;B_{2r}(p))<\epsilon_0/2$ が全ての十分大きな $n$ で成り立つとする。$B_r(p)$ 内で勾配爆発があり得るか。理由を示せ。

<!-- solution-start -->
**詳細解答**。[小エネルギー勾配評価](#lem-gw1-05-small-energy)の仮定を満たすので

$$
\sup_{B_r(p)}|du_n|^2\le Cr^{-2}E(u_n;B_{2r}(p))
\le C\epsilon_0/(2r^2).
$$

右辺は $n$ に依存しない有限値。従ってこの円盤内の勾配爆発は起こらない。ただし $r\to0$ と同時に $n\to\infty$ を送ると $r^{-2}$ が発散するので、固定半径での議論と混同しない。
<!-- solution-end -->

### Level B

<a id="ex-gw1-05-b01"></a>
#### GW1-05-B01 一次写像の集中はなぜ安定した二成分を作らないか
- Level: B

$u_\varepsilon(z)=\varepsilon/z$ の基底極限と泡を求め、再パラメータ化によって非定数成分を一つに戻せることを説明せよ。

<!-- solution-start -->
**詳細解答**。固定した $z\ne0$ では基底極限は定数0となる。拡大座標では

$$
z=\varepsilon\zeta,\qquad
v_\varepsilon(\zeta)=u_\varepsilon(\varepsilon\zeta)=\frac1\zeta.
$$

基底の付着点 $z=0$ と泡側の $\zeta=\infty$ では像がともに0なので、値の接続条件は満たす。

しかし各 $u_\varepsilon$ は[射影線形なMöbius変換](../../CM/CM1-10/index.md#thm-cm1-10-projective-automorphisms)であり、上の座標変換を施すと、全ての $\varepsilon$ について同じ非定数写像 $1/\zeta$ が残る。基底の定数球面は標点を持たず節点が一つだけなので、定数成分としての安定性を満たさず、保持されない。

従って固定座標での集中から、モジュライ空間に必ず二つの成分を持つ境界点が現れると結論してはいけない。
<!-- solution-end -->

<a id="ex-gw1-05-b02"></a>
#### GW1-05-B02 最大点選択と一様勾配制御
- Level: B

円盤 $D$ 上の $f_n(z)=\operatorname{dist}(z,\partial D)|du_n(z)|$ が $z_n$ で最大になり、$M_n=f_n(z_n)\to\infty$ とする。$\rho_n=|du_n(z_n)|^{-1}$ とおく。任意の固定 $L$ に対し、拡大写像の $B_L$ 上の勾配が高々2になることを示せ。

<!-- solution-start -->
**詳細解答**。$d_n=\operatorname{dist}(z_n,\partial D)$、$R_n=|du_n(z_n)|$ とすると $d_n/\rho_n=d_nR_n=M_n\to\infty$。よって十分大きい $n$ で $\rho_nL\le d_n/2$。$|\zeta|\le L$ に対して

$$
\operatorname{dist}(z_n+\rho_n\zeta,\partial D)
\ge d_n-\rho_nL\ge d_n/2.
$$

最大性により $|du_n(z_n+\rho_n\zeta)|\le M_n/(d_n/2)=2R_n$。連鎖律で $|dv_n(\zeta)|=\rho_n|du_n(z_n+\rho_n\zeta)|\le2$。中心では等号規格化 $|dv_n(0)|=1$ が成立し、極限が定数になることも防ぐ。
<!-- solution-end -->

<a id="ex-gw1-05-b03"></a>
#### GW1-05-B03 除去可能特異点の冪減衰
- Level: B

小半径でのエネルギー $A(r)>0$ が $A(r)\le C r A'(r)$、$A(r_0)=A_0$ を満たすとする。$r<r_0$ での上界を導き、その意味を述べよ。

<!-- solution-start -->
**詳細解答**。両辺を $CrA(r)$ で割ると $A'(r)/A(r)\ge1/(Cr)$。$r$ から $r_0$ まで積分すると

$$
\log A(r_0)-\log A(r)
=\int_r^{r_0}\frac{A'(t)}{A(t)}\,dt
\ge\frac1C\log\frac{r_0}{r}.
$$

従って $A(r)\le A_0(r/r_0)^{1/C}$。単なる $A(r)\to0$ より強い冪速度なので、[除去可能特異点の証明](#thm-gw1-05-removal)の勾配評価へ代入すると、中心へ近づく像の移動距離を半径の冪で総和できる。
<!-- solution-end -->

<a id="ex-gw1-05-b04"></a>
#### GW1-05-B04 弱収束だけでは首のエネルギーが消えない
- Level: B

総エネルギーが $10$ の非負エネルギー測度の列について、基底極限で $4$、抽出した一つの泡で $3$ を確認したとする。「残り $3$ は0になる」とはなぜ言えないか。また、残りが0と証明できるための情報を一つ挙げよ。

<!-- solution-start -->
**詳細解答**。基底と泡の観測領域は互いに異なる縮尺であり、そこから分かるのは $4+3\le10$ という下界だけである。未観測の環帯やさらに小さな縮尺に最大 $3$ のエネルギーがあり得る。消失を結論するには、例えば抽出した基底と全ての泡のエネルギーの和が総量 $10$ に達すること、または別途の環帯の小エネルギー評価を示す必要がある。[次数2の例の分裂証明](#prop-gw1-05-explicit-splitting)では前者を総次数から確認した。これは一般の列では自動的には使えない。
<!-- solution-end -->

### Level C

<a id="ex-gw1-05-c01"></a>
#### GW1-05-C01 次数3の列から基底と泡を抽出する
- Level: C

$\varepsilon>0$ に対し $\mathbb{CP}^1$ の正則写像

$$
h_\varepsilon(z)=z^2+\frac{\varepsilon}{z}
=\frac{z^3+\varepsilon}{z}
$$

を考える。標準形式の全面積は $2\pi$ とする。

1. 各 $\varepsilon>0$ での次数と総エネルギーを求めよ。
2. $z\ne0$ の固定領域での極限と $z=\varepsilon\zeta$ の拡大極限を求め、両方の次数を確認せよ。
3. 二成分の付着点における像の一致を確認せよ。
4. 基底・泡のエネルギーの和が総エネルギーに一致することを使い、中間環帯のエネルギーが消えることを論証せよ。
5. この例の計算から、一般の $J$-正則写像列のGromovコンパクト性まで証明できるか。

<!-- solution-start -->
**詳細解答**。

**（1）** 斉次座標では $[Z^3+\varepsilon W^3:ZW^2]$ である。$Z=0$ なら分子は $\varepsilon W^3\ne0$、$W=0$ なら分子は $Z^3\ne0$。よって共通零点がなく次数3である。[§2で示した面積の変数変換](#calc-gw1-05-rational-area)から $E(h_\varepsilon)=3\cdot2\pi=6\pi$。

**（2）** $z\ne0$ では $h_\varepsilon(z)\to h_0(z)=z^2$ で、球面写像として次数2、エネルギー $4\pi$。拡大すると

$$
h_\varepsilon(\varepsilon\zeta)
=\varepsilon^2\zeta^2+\frac1\zeta
\longrightarrow b(\zeta)=\frac1\zeta.
$$

$b$ は球面へ延長され次数1、エネルギー $2\pi$。

**（3）** 元の基底における付着点は $z=0$ で $h_0(0)=0$。泡の付着点は $\zeta=\infty$ で $b(\infty)=0$。従って二つの像は一致する。基底も泡も非定数なので、この二成分だけについては定数成分の安定性条件を持ち込む必要はない。

**（4）** 任意の固定 $\delta>0$ と $L>0$ で、外側 $\{|z|\ge\delta\}$ は基底へ、内側 $\{|z|\le L\varepsilon\}$ は泡へそれぞれ滑らかに収束する。エネルギーは非負の密度の積分なので、互いに重ならない両領域の積分を全体から差し引くと、

$$
\begin{aligned}
\limsup_{\varepsilon\to0}
E(h_\varepsilon;\{L\varepsilon<|z|<\delta\})
&\le6\pi-E(h_0;\{|z|\ge\delta\})\\
&\quad-E(b;\{|\zeta|\le L\}).
\end{aligned}
$$

まず $\varepsilon\to0$、次に $\delta\downarrow0$、$L\uparrow\infty$ とすると右辺は $6\pi-4\pi-2\pi=0$。従って首に正のエネルギーは残らない。この順序を逆にして固定領域での滑らかな収束を無条件に使うのは誤りである。

**（5）** できない。これは射影直線の正則写像の次数でエネルギーの全量を先に計算できる特別な列である。一般の $J$-正則写像列では、複数のスケールでの追加泡、全ての環帯のエネルギー消失、節点の連結と再パラメータ化を別に証明しなければならない。今回の[泡の抽出定理](#thm-gw1-05-bubble)は、まず少なくとも一つの非定数球面が現れることを保証するに留まる。
<!-- solution-end -->

## 10. 次講への橋

今まで、固定曲線類の全エネルギーが一定であることだけでは勾配の上界は得られなかった。ここでは小エネルギー勾配評価と適切な点選択を組み合わせ、勾配爆発から非定数 $J$-正則球面を取り出し、除去可能特異点で球面に閉じた。量子化によって各泡は一定量以上のエネルギーを消費する。射影直線の明示的な二成分・三次数の例では、基底と泡のエネルギー分裂を総次数から検証した。

次講 **GW1-06「Gromov収束とコンパクト性」** では、複数の泡が別のスケールで繰り返し生じるとき、再パラメータ化・首の消失・接続された泡の木をまとめてどう収束概念にするかを扱う。