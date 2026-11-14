# FLUID10 渦は移流・伸長・拡散でどう変わるか

[FLUID8 の非粘性渦度方程式](../FLUID8/index.md#thm-fluid8-vorticity-equation)では、既存の渦を流れが運び、三次元では渦の軸方向に伸長させることを学んだ。[FLUID9 の Kelvin の循環定理](../FLUID9/index.md#thm-fluid9-kelvin)は、条件を満たす物質閉曲線全体の循環保存を述べる。しかし実際の液体には粘性があり、渦の中心が弱まる場合がある。**渦が消えたのか、広がったのか、強められたのか**を、渦度の方程式と積分量で区別しよう。

この講義では一定密度・一定粘度の非圧縮 Newton 流体を扱う。渦度輸送式を Navier–Stokes 方程式から導き、二次元と三次元の違いを確認する。最後に Gaussian 渦を使い、渦の最大値が減る一方で全渦度が変わらないことを、解析式とブラウザ内 Python の両方で検算する。

## 0. 模型・記号・適用範囲

右手系直交座標をもつ開集合 $\mathcal D\subset\mathbb R^3$ と時間区間 $I$ を考える。流速 $u=(u_1,u_2,u_3)$ [m/s] と圧力 $p$ [Pa] はこの領域の場とする。

密度 $\rho_0>0$ [kg/m$^3$] と動的粘性係数 $\eta>0$ [Pa s] は、ともに**空間・時間にわたり一定**とする。[CTM15 の非圧縮 Newton 流体の応力](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)と同じ区別により、動粘度を

$$
\nu=\frac{\eta}{\rho_0}>0\qquad[\mathrm{m}^2/\mathrm s]
$$

と定める。

$u$ は空間で $C^3$ 級・時間で $C^1$ 級、必要な空間・時間の混合導関数は連続とし、$p$ と外力ポテンシャル $\Phi$ は空間 $C^2$ 級とする。以下では滑らかな古典解が与えられていると仮定し、存在・一意性をここから導くものではない。[CTM15 の一定粘性非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)で体積力を $-\nabla\Phi$ とすると

$$
\boxed{\partial_tu+(u\cdot\nabla)u
=-\frac{\nabla p}{\rho_0}+\nu\Delta u-\nabla\Phi,
\qquad \nabla\cdot u=0.}
$$

ここで $x_1=x,x_2=y,x_3=z$、$\partial_i=\partial/\partial x_i$、$\partial_t$ は位置 $(x,y,z)$ を固定した時間偏微分、$\nabla=(\partial_x,\partial_y,\partial_z)$ は時刻を固定した空間微分である。$\Delta=\partial_1^2+\partial_2^2+\partial_3^2$ は速度・渦度の各成分に作用する Laplace 演算子とする。$u\cdot\nabla=\sum_{i=1}^3u_i\partial_i$ は空間方向微分であり、$D_t=\partial_t+u\cdot\nabla$ は[VC9 の物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)である。$D_tf$ は粒子に沿った $d f(X(t),t)/dt$ に対応するが、固定位置での $\partial_tf$ とは一般に異なる。壁面では別途境界条件が必要になる。とくに**非圧縮**だけでなく**密度一定**を仮定しているので、変密度の圧力項や可変粘度の勾配項はここでは扱わない。

[VC9 の渦度](../../../幾何系/VC/VC9/index.md#def-vc9-vorticity)を $\omega=\nabla\times u$ と書く。例えば $\omega_3=\partial_1u_2-\partial_2u_1$ であり、単位は s$^{-1}$。右手系なので反時計回りの平面循環は正の $\omega_3$ に対応する。

## 1. 粘性を入れると渦度の式のどこが変わるか

速度の各成分は粘性項 $\nu\Delta u$ により周囲の値と均される。渦度を得るには、速度の式をただ微分するのではなく、**両辺の curl を取る**。粘度が一定だから $\nabla\times(\nu\Delta u)=\nu\Delta(\nabla\times u)$ と順序を交換できる。

<a id="thm-fluid10-vorticity-transport"></a>

<!-- formal-statement-start -->
### 定理（一定密度・一定粘度の渦度輸送方程式）

$\mathcal D\subset\mathbb R^3$、$I$、$\rho_0,\nu,u,p,\Phi$ は第0節の条件を満たし、$u$ が非圧縮 Navier–Stokes 方程式の古典解であるとする。$\omega=\nabla\times u$ に対して

$$
\boxed{\partial_t\omega+(u\cdot\nabla)\omega
=(\omega\cdot\nabla)u+\nu\Delta\omega}
$$

が $\mathcal D\times I$ の各点で成り立つ。右辺第1項が渦の伸長・傾斜、第2項が粘性拡散である。
<!-- formal-statement-end -->

### 証明の見取り図

[FLUID8 の非粘性渦度方程式の証明](../FLUID8/index.md#thm-fluid8-vorticity-equation)で、速度の移流項の curl は渦度の移流・伸長・膨張へ分解された。ここではそこへ粘性の curl を追加し、非圧縮性で膨張項が消えることを各成分で確認する。

<!-- proof-start -->
### 証明

[FLUID8 で導いた移流加速度の恒等式](../FLUID8/index.md#thm-fluid8-vorticity-equation)を速度式へ代入する：

$$
\partial_tu=u\times\omega-
\nabla\left(\frac{|u|^2}{2}+\frac p{\rho_0}+\Phi\right)
+\nu\Delta u.
$$

時間微分と curl を交換し、滑らかなスカラー場の勾配の curl が $0$ であることを用いると

$$
\partial_t\omega=\nabla\times(u\times\omega)
+\nu\nabla\times(\Delta u).
$$

添字 $i,j,k,\ell\in\{1,2,3\}$ と Levi-Civita 記号 $\varepsilon_{ijk}$ を用いる。$\varepsilon_{123}=1$、添字を2個交換すれば符号が逆、添字が重なれば零であり、以下の $\sum$ は表示した添字の $1,2,3$ にわたる和である。$u\in C^3$ だから各三階空間微分を交換でき、$\nu$ は定数なので

$$
\begin{aligned}
[\nabla\times(\nu\Delta u)]_i
&=\nu\sum_{j,k,\ell}\varepsilon_{ijk}\partial_j\partial_\ell^2u_k\\
&=\nu\sum_{\ell}\partial_\ell^2
\left(\sum_{j,k}\varepsilon_{ijk}\partial_ju_k\right)
=\nu(\Delta\omega)_i.
\end{aligned}
$$

また[FLUID8 の curl の積公式](../FLUID8/index.md#thm-fluid8-vorticity-equation)は

$$
\nabla\times(u\times\omega)
=(\omega\cdot\nabla)u-(u\cdot\nabla)\omega
+u(\nabla\cdot\omega)-\omega(\nabla\cdot u).
$$

$\omega=\nabla\times u$ から $\nabla\cdot\omega=0$、非圧縮性から $\nabla\cdot u=0$。従って右辺後半の二つが消え、$(u\cdot\nabla)\omega$ を左辺へ移して結論を得る。
<!-- proof-end -->

式の四つの部分を混同しないようにしよう。$\partial_t\omega$ は固定した点での時間変化、$(u\cdot\nabla)\omega$ は流れによる運搬、$(\omega\cdot\nabla)u$ は渦度方向に沿う速度の変化、$\nu\Delta\omega$ は渦度の空間的な凹凸を均す作用である。各項の単位は s$^{-2}$。とくに $\nu\Delta\omega$ は $\mathrm{m}^2/\mathrm{s}\times\mathrm{s}^{-1}/\mathrm{m}^2$ となる。

**適用条件の落とし穴**：粘度が空間で変わる場合、curl の外へ $\nu$ を出せない。また密度が一定でない場合、$-\nabla p/\rho$ の curl は[FLUID8 の傾圧生成項](../FLUID8/index.md#def-fluid8-baroclinic-source)を生む。上の簡潔な式を、可変密度・可変粘度の模型や、速度・圧力が不連続な流れへそのまま適用してはいけない。

## 2. 二次元では伸長がなくても拡散は残る

平面流 $u=(u_1(x,y,t),u_2(x,y,t),0)$ を三次元へ $z$ 方向に一様に延ばした場だと考える。鉛直成分の渦度 $\zeta=\partial_xu_2-\partial_yu_1$ が唯一の非零成分となり、$\omega=(0,0,\zeta)$ である。

<a id="prop-fluid10-planar-transport"></a>

<!-- formal-statement-start -->
### 命題（二次元非圧縮流の渦度移流拡散式）

$\rho_0>0$、$\nu>0$ を一定とする第0節の Navier–Stokes 古典解が $u=(u_1(x,y,t),u_2(x,y,t),0)$ で、$z$ に依存しないとする。このとき $\zeta=\partial_xu_2-\partial_yu_1$ は

$$
\boxed{\partial_t\zeta+u_1\partial_x\zeta+u_2\partial_y\zeta
=\nu(\partial_x^2+\partial_y^2)\zeta}
$$

を満たす。$\nu=0$ の非粘性模型では右辺は零となるが、$\nu>0$ では一般に流跡上で $\zeta$ は一定でない。
<!-- formal-statement-end -->

### 証明の見取り図

[渦度輸送定理](#thm-fluid10-vorticity-transport)の伸長項を成分で評価する。三次元の渦度は鉛直方向だけを向き、速度は鉛直方向に変化しない。

<!-- proof-start -->
### 証明

二次元性から $\partial_zu=0$ および $\omega=(0,0,\zeta)$。したがって

$$
(\omega\cdot\nabla)u
=(0,0,\zeta)\cdot(\partial_x,\partial_y,\partial_z)u
=\zeta\partial_zu=0.
$$

さらに $\Delta\omega=(0,0,\partial_x^2\zeta+\partial_y^2\zeta)$。ここで $\Delta_2=\partial_x^2+\partial_y^2$ を平面 Laplace 演算子と定める。これらを[渦度輸送定理](#thm-fluid10-vorticity-transport)へ代入し、第三成分を取れば表示式が得られる。[FLUID4 の流跡線](../FLUID4/index.md#def-fluid4-pathline) $X(t)=(X_1(t),X_2(t))$ で $\dot X=u(X,t)$ を満たすものに沿う連鎖律は

$$
\frac{d}{dt}\zeta(X(t),t)
=\partial_t\zeta(X,t)+\dot X_1\partial_x\zeta(X,t)+\dot X_2\partial_y\zeta(X,t)
=\nu\Delta_2\zeta(X,t),
$$

ここで点 $X=X(t)$ における空間偏微分を評価しており、$\dot X_i=dX_i/dt=u_i(X(t),t)$ である。左辺の全微分と右辺の偏微分の違いは、この連鎖律による。右辺は一般には零ではない。
<!-- proof-end -->

**直接例：時間とともに弱まる平面せん断流**。$U_0\in\mathbb R$ [m/s]、$k>0$ [m$^{-1}$] を定数として

$$
u=(U_0e^{-\nu k^2t}\sin(ky),0,0),\qquad p=p_0,\quad\Phi=0,\quad t\ge0
$$

を考える。$\nabla\cdot u=0$ かつ $(u\cdot\nabla)u=u_1\partial_xu=0$。また $\partial_tu=-\nu k^2u$、$\Delta u=\partial_y^2u=-k^2u$ なので Navier–Stokes 方程式を厳密に満たす。渦度は

$$
\zeta=-kU_0e^{-\nu k^2t}\cos(ky),\qquad
\partial_t\zeta=-\nu k^2\zeta,\qquad
\nu\Delta_2\zeta=-\nu k^2\zeta.
$$

流れの全域で渦度の振幅が減るが、これは無限平面で全渦度の可積分性を満たさない周期場である。「全渦度が保存される」という後の命題をこの場へ無条件に適用しない。

## 3. 二次元の全渦度はいつ保存されるか

渦度が各点で弱くなることと、渦度を面全体で足した量が減ることは別の問いである。[VC9 の Stokes の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)では、向き付き領域の渦度積分がその境界の循環になる。半径が十分大きい領域へ広げるときにも積分が収束する条件が必要になる。

<a id="def-fluid10-total-vorticity"></a>

まず、平面の渦度を十分遠くまで合計した量を考えたい。符号付きで足すので正と負の渦が相殺することもある。これは各粒子の渦度の大きさを足す操作ではない。

<!-- formal-statement-start -->
### 定義（平面の総渦度）

時刻 $t$ の二次元渦度 $\zeta(\cdot,t)$ が絶対可積分、すなわち $\int_{\mathbb R^2}|\zeta|\,dx\,dy<\infty$ なら、符号付きの**総渦度**を

$$
Q(t)=\int_{\mathbb R^2}\zeta(x,y,t)\,dx\,dy
$$

とする。単位は m$^2$/s である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid10-total-vorticity -->
### **定義の確認**：正負二つの山

$A>0$ [s$^{-1}$]、$b>0$ [m$^2$]、$d>0$ [m] として

$$
\zeta(x,y)=A e^{-(x^2+y^2)/b}
-A e^{-((x-d)^2+y^2)/b}.
$$

各項の絶対値の面積分は、極座標 $x=r\cos\theta,\ y=r\sin\theta$ と置き、$s=r^2/b$（$r\,dr=b\,ds/2$）に変数変換すると
$$
\int_{\mathbb R^2}Ae^{-(x^2+y^2)/b}\,dx\,dy
=2\pi A\int_0^\infty re^{-r^2/b}\,dr
=\pi Ab<\infty.
$$
第二項も $x'=x-d$ への平行移動（Jacobian は $1$）で同じ積分をもち、三角不等式から $|\zeta|$ の積分は高々 $2\pi Ab$ だから絶対可積分である。よって $Q=A\pi b-A\pi b=0$。渦度が各点で零ではなくても総渦度は零になる。これは**渦度分布の例**であり、特定の Navier–Stokes 時間解と主張してはいない。
<!-- definition-example-end -->

<a id="prop-fluid10-total-vorticity-conservation"></a>

<!-- formal-statement-start -->
### 命題（流束が消える場合の総渦度保存）

二次元非圧縮 Navier–Stokes の滑らかな解で、各 $t$ について $\zeta(\cdot,t)$ は[平面の総渦度の定義](#def-fluid10-total-vorticity)の意味で絶対可積分とし、$Q(t)$ を微分・積分の交換で計算できるとする。円板 $B_R$ の外向き単位法線を $n$ として、各有限時間区間で

$$
\lim_{R\to\infty}\int_{\partial B_R}\zeta(u\cdot n)\,ds=0,
\qquad
\lim_{R\to\infty}\int_{\partial B_R}\nabla\zeta\cdot n\,ds=0
$$

が成り立ち、極限を時間積分と交換できると仮定する。このとき任意の $t,t_0\in I$ に対して $Q(t)=Q(t_0)$ が成り立つ。有限領域でも同様に、境界の移流・拡散の合計流束が零なら総渦度は保存される。
<!-- formal-statement-end -->

### 証明の見取り図

[二次元輸送式](#prop-fluid10-planar-transport)の移流を発散形に直す。円板へ積分して[VC4 の Green の定理（流束形）](../../../幾何系/VC/VC4/index.md#cor-vc4-green-flux)を円板へ用い、指定した二種類の境界流束の極限を取る。

<!-- proof-start -->
### 証明

非圧縮性 $\nabla_2\cdot u=0$ より

$$
u\cdot\nabla_2\zeta=\nabla_2\cdot(u\zeta)-\zeta\nabla_2\cdot u
=\nabla_2\cdot(u\zeta).
$$

また $\Delta_2\zeta=\nabla_2\cdot(\nabla_2\zeta)$。従って[二次元輸送式](#prop-fluid10-planar-transport)は

$$
\partial_t\zeta+\nabla_2\cdot(u\zeta-\nu\nabla_2\zeta)=0
$$

となる。半径 $R$ の円板 $B_R$ について[Green の定理（流束形）](../../../幾何系/VC/VC4/index.md#cor-vc4-green-flux)を適用すると

$$
\frac{d}{dt}\int_{B_R}\zeta\,dA
=-\int_{\partial B_R}\zeta(u\cdot n)\,ds
+\nu\int_{\partial B_R}\nabla_2\zeta\cdot n\,ds.
$$

時間 $t_0$ から $t$ まで積分し、定理の仮定により $R\to\infty$ と時間積分の交換を行う。右辺両項が零に収束し、左辺は絶対可積分性で $Q(t)-Q(t_0)$ へ収束するので結論を得る。
<!-- proof-end -->

**境界の注意**：[無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip) $u=0$ は移流流束を消すが、一般には壁の各点で $\nabla\zeta\cdot n=0$ を意味しない。ただし**有界な固定領域 $D$ の全境界**で $u=0$ なら、[VC9 の渦度と循環の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)から各時刻に

$$
\int_D\zeta\,dA=\oint_{\partial D}u\cdot d\ell=0
$$

であり、総渦度は必ず零のまま保存される。従ってこの場合、積分した**正味の**渦度拡散流束も零になるが、法線勾配が壁の各点で零である必要はない。壁の一部分だけに無滑り条件を課す場合や、非貫通条件 $u\cdot n=0$ だけの場合には、この循環による結論は使えず、拡散流束の積分を検査する必要がある。

## 4. Gaussian渦：中心は弱まり、全量は変わらない

中心からの距離 $r=\sqrt{x^2+y^2}$ のみで渦度が変わる場合、中心を回る流速 $u_\theta$ を考えられる。$r>0$ の円上では $e_\theta=(-y/r,x/r)$ が反時計回りの単位接線である。速度を $u=u_\theta(r,t)e_\theta$ と置く。[VC9 の渦度の定義](../../../幾何系/VC/VC9/index.md#def-vc9-vorticity)は、直交座標で $\zeta=\partial_xu_2-\partial_yu_1$ である。$\partial_xr=x/r,\ \partial_yr=y/r$ を用いて $u_1=-u_\theta y/r$、$u_2=u_\theta x/r$ を微分すると

$$
\begin{aligned}
\partial_xu_2
&=\frac{x^2}{r^2}\partial_ru_\theta
 +u_\theta\left(\frac1r-\frac{x^2}{r^3}\right),\\
\partial_yu_1
&=-\frac{y^2}{r^2}\partial_ru_\theta
 -u_\theta\left(\frac1r-\frac{y^2}{r^3}\right).
\end{aligned}
$$

両式の差を取り $x^2+y^2=r^2$ を代入すれば

$$
\zeta=\partial_ru_\theta+\frac{u_\theta}{r}
=\frac1r\partial_r(ru_\theta).
$$

つまり、渦度が指定されたとき、原点で連続な円周速度は $\partial_r(ru_\theta)=r\zeta$ を $0$ から積分して復元できる。$r=0$ は滑らかな極限で扱う。

<a id="def-fluid10-gaussian-vortex"></a>

中心から離れるほど滑らかに小さくなる渦度の山を、幅を表す正の面積パラメータ $a(t)$ で表そう。時間とともに $a$ が大きくなると中心は低く、広がりは大きくなる。

<!-- formal-statement-start -->
### 定義（Gaussian 渦の初期値と拡散幅）

平面全体 $\mathbb R^2$ において、循環パラメータ $\Gamma\in\mathbb R$ [m$^2$/s]、初期幅 $a_0>0$ [m$^2$]、動粘度 $\nu>0$ [m$^2$/s] を与える。$t\ge0$ で

$$
a(t)=a_0+4\nu t,\qquad
\zeta_G(r,t)=\frac{\Gamma}{\pi a(t)}\exp\left(-\frac{r^2}{a(t)}\right)
$$

と置く。**Gaussian 渦**は、この渦度と、原点で連続な円周方向速度 $u=u_\theta e_\theta$ で構成する場とする。前の渦度と速度の関係から、その速度は $r>0$ で

$$
u_\theta(r,t)=\frac1r\int_0^r s\zeta_G(s,t)\,ds,\qquad u_\theta(0,t)=0
$$

と定まる。積分は $\partial_r(ru_\theta)=r\zeta_G$ を解いたものであり、原点での連続性が積分定数（$C/r$ の特異項）を除く。拡散幅（長さ）は $\ell(t)=\sqrt{a(t)}$ [m] とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid10-gaussian-vortex -->
### **定義の確認**：中心値と幅の両方を読む

$a_0=1$ m$^2$、$\nu=1/4$ m$^2$/s、$\Gamma=2\pi$ m$^2$/s とする。$t=0$ なら $a=1$ m$^2$、中心渦度は $2$ s$^{-1}$、幅は $1$ m。$t=1$ s なら $a=2$ m$^2$、中心渦度は $1$ s$^{-1}$、幅は $\sqrt2$ m になる。いずれも $a>0$ なので渦度は全点で滑らか。さらに $t=0,\ r=1$ m で上の積分を使い、$v=s^2/a$ と置くと

$$
u_\theta(1,0)=\frac{2\pi}{\pi}\int_0^1se^{-s^2}\,ds
=1-e^{-1}\quad[\mathrm{m}/\mathrm{s}].
$$

また $r\to0$ で $\int_0^r s\zeta_G(s,t)\,ds=\zeta_G(0,t)r^2/2+O(r^4)$ だから $u_\theta=O(r)$ で連続に延びる。これで定義の「指定した渦度・原点で正則な円周速度」を実際に確かめた。総渦度が本当に $\Gamma$ になることと、速度が方程式を満たすことは次の定理で個別に確かめる。
<!-- definition-example-end -->

<a id="thm-fluid10-gaussian-vortex"></a>

<!-- formal-statement-start -->
### 定理（Gaussian 渦の Navier–Stokes 厳密解）

平面全体で定数 $\rho_0,\nu>0$ とし、$a_0>0$、$\Gamma\in\mathbb R$ を与える。[Gaussian 渦の定義](#def-fluid10-gaussian-vortex)の $a,\zeta_G$ に対し、$r>0$ で

$$
u_\theta(r,t)=\frac{\Gamma}{2\pi r}
\left(1-e^{-r^2/a(t)}\right),\qquad
u(x,y,t)=u_\theta(r,t)(-y/r,x/r),
$$

$r=0$ では $u=0$ と連続的に延長する。この速度と、任意の滑らかな時刻関数 $p_\infty(t)$ に対する

$$
p(r,t)=p_\infty(t)-\rho_0\int_r^\infty
\frac{u_\theta(s,t)^2}{s}\,ds,\qquad \Phi=0
$$

は、平面全体の二次元非圧縮 Navier–Stokes 方程式を満たす滑らかな解である。また

$$
\int_{\mathbb R^2}\zeta_G\,dA=\Gamma,\quad
\zeta_G(0,t)=\frac{\Gamma}{\pi a(t)},\quad
\ell(t)=\sqrt{a_0+4\nu t}.
$$

したがって $\Gamma>0$ なら中心の渦度は減少し、拡散幅は増加するが総渦度は一定である。
<!-- formal-statement-end -->

### 証明の見取り図

まず円周速度の curl が Gaussian 渦度に一致することと、発散が零であることを確かめる。円周方向の加速度は粘性項で、半径方向の向心加速度は圧力勾配で釣り合わせる。最後に極座標の積分で総量を求める。

<!-- proof-start -->
### 証明

$r>0$ で $ru_\theta=\Gamma(1-e^{-r^2/a})/(2\pi)$ なので、前の座標微分式を用いると

$$
\frac1r\partial_r(ru_\theta)
=\frac1r\frac{\Gamma}{2\pi}e^{-r^2/a}\frac{2r}{a}
=\frac{\Gamma}{\pi a}e^{-r^2/a}=\zeta_G.
$$

$u=(-y f(r^2,t),x f(r^2,t))$ と書ける。ただし $f(q,t)=\Gamma(1-e^{-q/a})/(2\pi q)$、$f(0,t)=\Gamma/(2\pi a)$ である。$f$ は $q=0$ において Taylor 展開 $1-e^{-q/a}=q/a+O(q^2)$ から滑らかに延びる。よって $u$ は原点でも滑らかで、

$$
\partial_xu_1+\partial_yu_2
=-y(2x f_q)+x(2y f_q)=0.
$$

次に $a'=4\nu$ に注意して

$$
\partial_t\zeta_G=4\nu\left(\frac{r^2}{a^2}-\frac1a\right)\zeta_G,
\qquad
\partial_r\zeta_G=-\frac{2r}{a}\zeta_G.
$$

後者をもう一度微分すると

$$
\partial_r^2\zeta_G=
\left(-\frac2a+\frac{4r^2}{a^2}\right)\zeta_G,\qquad
\frac1r\partial_r\zeta_G=-\frac2a\zeta_G.
$$

従って $\partial_t\zeta_G=\nu(\partial_r^2+r^{-1}\partial_r)\zeta_G$。$u$ は接線方向、$\nabla\zeta_G$ は半径方向なので $u\cdot\nabla\zeta_G=0$。これで[二次元渦度移流拡散式](#prop-fluid10-planar-transport)を満たすことも分かった。

ただし渦度式だけでは速度の運動量式を確認したことにはならない。円周速度の時間微分は

$$
\partial_tu_\theta
=-\frac{\Gamma a'}{2\pi r}\frac{r^2}{a^2}e^{-r^2/a}
=-\frac{2\nu\Gamma r}{\pi a^2}e^{-r^2/a}
=\nu\partial_r\zeta_G.
$$

直前の関係 $\zeta_G=\partial_ru_\theta+u_\theta/r$ を微分して

$$
\partial_r\zeta_G
=\partial_r^2u_\theta+\frac1r\partial_ru_\theta-\frac{u_\theta}{r^2}
$$

を得る。これがベクトル Laplace 演算子の接線方向成分であることも確認する。$q=r^2$、$u=(-yf(q,t),xf(q,t))$ と書いたので、$f_q=\partial f/\partial q$、$f_{qq}=\partial^2f/\partial q^2$ とすれば $\partial_xf=2xf_q,\ \partial_yf=2yf_q$ である。直交座標で各成分を二階微分すると

$$
\begin{aligned}
\Delta(-yf)&=-y(8f_q+4qf_{qq}),\\
\Delta(xf)&=x(8f_q+4qf_{qq}),\\
\zeta_G&=\partial_x(xf)-\partial_y(-yf)
        =2f+2qf_q,\\
\partial_r\zeta_G&=r(8f_q+4qf_{qq}).
\end{aligned}
$$

従って $\Delta u=\partial_r\zeta_G\,e_\theta$ で半径方向の粘性成分は零である。また $u\cdot\nabla q=2xu_1+2yu_2=0$ だから、$f$ は流れに沿って変わらず、

$$
(u\cdot\nabla)u=f(u\cdot\nabla)(-y,x)
=f(-u_2,u_1)
=-f^2(x,y)=-\frac{u_\theta^2}{r}e_r,
\qquad e_r=(x/r,y/r).
$$

時間微分は $\partial_tu=(\partial_tu_\theta)e_\theta$ である。以上と $\partial_tu_\theta=\nu\partial_r\zeta_G$ から Navier–Stokes の**接線方向**の式が成り立つ。半径方向では圧力勾配で向心加速度を釣り合わせればよい。定義した圧力は

$$
\partial_rp=\rho_0\frac{u_\theta^2}{r}
$$

を満たす。これは $-u_\theta^2/r=-\partial_rp/\rho_0$ と等しい。積分は無限遠で $u_\theta=O(r^{-1})$ より収束し、原点では $u_\theta=O(r)$ より被積分関数 $O(r)$ だから有限である。さらに $u_\theta=r f(r^2,t)$ により、$r\ge0$ で

$$
p(r,t)-p(0,t)
=\rho_0\int_0^r s f(s^2,t)^2\,ds
=\frac{\rho_0}{2}\int_0^{r^2}f(q,t)^2\,dq.
$$

$f$ は $q=0$ を含めて滑らかなので $p$ も $(x,y)$ について滑らかに延びる。従って原点を含めて運動量式が成立する。

最後に極座標で $dA=r\,dr\,d\theta$ とし、$s=r^2/a$（$r\,dr=a\,ds/2$）と置くと

$$
\begin{aligned}
\int_{\mathbb R^2}\zeta_G\,dA
&=2\pi\int_0^\infty\frac{\Gamma}{\pi a}e^{-r^2/a}r\,dr\\
&=\frac{2\Gamma}{a}\frac a2\int_0^\infty e^{-s}\,ds
=\Gamma.
\end{aligned}
$$

中心値と幅は定義から直ちに得られる。すべての $t\ge0$ で $a>0$ だから原点での見かけの $1/r$ は実際には特異点ではない。
<!-- proof-end -->

半径 $R$ の円内に収まる渦度は

$$
Q_R(t)=\int_{r\le R}\zeta_G\,dA
=\Gamma\left(1-e^{-R^2/a(t)}\right).
$$

**同じ固定半径 $R>0$ の内側**では $a$ が増えると $1-e^{-R^2/a}$ は減少する。従って $\Gamma>0$ なら $Q_R$ は減少し、$\Gamma<0$ なら $Q_R$ は零へ向かって増加するが、どちらも $|Q_R|$ は減少する。無限平面全体の $Q=\Gamma$ は一定であり、符号付き渦度が固定円板の境界を越えて拡散するので矛盾しない。[FLUID9 の Kelvin の定理](../FLUID9/index.md#thm-fluid9-kelvin)を粘性渦へ直接適用するのも誤りである。こちらの総量保存は境界流束が消えることから得た別の結論だ。なお $\Gamma\ne0$ では $u_\theta(r,t)\sim\Gamma/(2\pi r)$ であり、速度は無限遠で零へ近づいても円周積分 $2\pi r u_\theta$ は $\Gamma$ へ近づく。したがってこの全平面の渦を、全境界で無滑り条件を課した有界容器内の渦へ同一視できない。平面全体の運動エネルギー積分も $\int^\infty u_\theta^2\,r\,dr$ が対数的に発散する。

## 5. 三次元の伸長は本当に渦を強めるか

二次元で渦伸長項が消えた理由は、渦度が向く $z$ 方向に速度が変化しないことだった。三次元ではこの制約がなく、渦度方向の伸びが増幅を生む。渦の長さだけが伸びているのかを、圧力を含む**厳密な流体解**で確かめる。

<a id="prop-fluid10-stretching-solution"></a>

<!-- formal-statement-start -->
### 命題（三次元伸長・回転流の厳密解）

$\rho_0,\nu>0$、$\alpha>0$ [s$^{-1}$]、$\Omega_0\in\mathbb R$ [s$^{-1}$] とし、$\Omega(t)=\Omega_0e^{\alpha t}$ と置く。$\mathbb R^3$ 上で

$$
u=\left(-\frac{\alpha x}{2}-\Omega(t)y,\
\Omega(t)x-\frac{\alpha y}{2},\ \alpha z\right)
$$

および

$$
p=p_0(t)+\frac{\rho_0}{2}
\left[\left(\Omega(t)^2-\frac{\alpha^2}{4}\right)(x^2+y^2)
-\alpha^2z^2\right],\qquad \Phi=0
$$

とする。この場は空間で一様な動粘度 $\nu$ の Navier–Stokes 方程式の滑らかな解であり、

$$
\omega=(0,0,2\Omega(t)),\qquad
D_t\omega=(\omega\cdot\nabla)u=\alpha\omega,\qquad
\Delta\omega=0.
$$

従って三次元では粘性が正であっても、粘性拡散が零の場で渦度が伸長により指数増幅することがある。
<!-- formal-statement-end -->

### 証明の見取り図

速度勾配が空間一定の行列なので、発散・curl・Laplace 演算子を直接計算できる。時間微分に含まれる $\Omega'=\alpha\Omega$ は移流加速度の回転成分と打ち消し合い、残った対角成分が圧力で釣り合う。

<!-- proof-start -->
### 証明

[CTM4 の速度勾配](../../CTM/CTM4/index.md#def-ctm4-velocity-gradient)の定義に従い、固定した直交基底で $A_{ij}=\partial u_i/\partial x_j$ と表す。この行列の対角成分の和が発散である。速度勾配とそのトレースは

$$
\nabla u=
\begin{pmatrix}
-\alpha/2&-\Omega&0\\
\Omega&-\alpha/2&0\\
0&0&\alpha
\end{pmatrix},\qquad
\nabla\cdot u=-\alpha/2-\alpha/2+\alpha=0.
$$

空間一次の速度なので $\Delta u=0$。$A(t)=\nabla u$、$X=(x,y,z)^\mathsf T$ と書けば $u=A(t)X$ である。$A'=dA/dt$ は各行列成分の時間微分であり、位置 $X$ を固定した $\partial_tu=A'X$ と、空間微分から得る $(u\cdot\nabla)u=A(A X)=A^2X$ を足して加速度 $(A'+A^2)X$ を得る。$A'$ の上左 $2\times2$ 部分は $\alpha\Omega\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$A^2$ の同部分は

$$
\left(\frac{\alpha^2}{4}-\Omega^2\right)I_2
-\alpha\Omega\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

両者の回転行列項は相殺され、残りは

$$
D_tu=
\left(\left(\frac{\alpha^2}{4}-\Omega^2\right)x,\
\left(\frac{\alpha^2}{4}-\Omega^2\right)y,\
\alpha^2z\right)=-\frac{\nabla p}{\rho_0}.
$$

これで Navier–Stokes の速度式も検査できた。渦度は $\partial_xu_2-\partial_yu_1=2\Omega$ だけが非零であり、$\partial_t\omega=\alpha\omega$。$\omega$ は空間一定なので移流項と Laplace 項は零、$\partial_zu=(0,0,\alpha)$ だから

$$
(\omega\cdot\nabla)u=2\Omega\partial_zu
=(0,0,2\alpha\Omega)=\alpha\omega.
$$

従って[渦度輸送定理](#thm-fluid10-vorticity-transport)の左右が一致する。
<!-- proof-end -->

この場は無限遠で速度が増大し、有限エネルギーの局在した渦を表すものではない。**三次元伸長項の符号と作用を検算する局所的な厳密模型**として使う。境界や有限エネルギー解の一般論へ無条件に外挿しない。

## 6. ブラウザ内 Python で Gaussian 渦を独立検算する

[gaussian_vortex_lab.py](gaussian_vortex_lab.py) は Python 標準ライブラリだけで動く。二次元 Gaussian 渦の解析値、円板内の放射方向台形積分、有限差分による Laplace 演算子を別々に計算する。時間積分をして任意の Navier–Stokes 解を近似するプログラムではなく、**この厳密解に対する離散検算**である。

```python-file-lab
# lab-id: FLUID10-GAUSSIAN-FILE
# lab-title: Gaussian 渦の総量と拡散残差
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID10/gaussian_vortex_lab.py
# timeout-ms: 10000
# lab-preset: 初期の渦 | --gamma 6.283185307179586 --a0 1 --nu 0.25 --t 0 --r 1 --h 0.1 --n 200
# lab-preset: 1秒後 | --gamma 6.283185307179586 --a0 1 --nu 0.25 --t 1 --r 1 --h 0.1 --n 200
# lab-preset: 格子を半分に | --gamma 6.283185307179586 --a0 1 --nu 0.25 --t 1 --r 1 --h 0.05 --n 400
```

出力の total_circulation は平面全域の解析値 $\Gamma$、disk_circulation_exact は有限円板の正確な値、disk_circulation_trapezoid は同じ円板の台形積分である。数値誤差と円板外へ残した尾部は別の量であり、**後者を格子を細かくして消したと見なしてはいけない**。また厳密式を微分した $\partial_t\zeta_G$ と中央差分 $\nu\Delta_{2,h}\zeta_G$ の差は通常 $O(h^2)$ で小さくなるが、これは偏微分方程式の全解に対する数値安定性を保証しない。中心付近でも値を検算できるよう、Cartesian 格子の4近傍差分を用いている。

## 7. 演習

解答前に、流体が二次元か三次元か、$\nu$ が定数か、領域が有界か、全渦度の積分が収束するかを宣言しよう。

### Level A

### A1. 拡散と渦伸長の次元

渦度の単位を s$^{-1}$ とし、$\nu$ の単位が m$^2$/s のとき、$\nu\Delta\omega$ と $(\omega\cdot\nabla)u$ の単位を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

Laplace 演算子は空間2階微分なので $[\Delta\omega]=\mathrm{s}^{-1}\mathrm m^{-2}$。したがって $[\nu\Delta\omega]=(\mathrm m^2/\mathrm s)(\mathrm{s}^{-1}\mathrm m^{-2})=\mathrm{s}^{-2}$。一方 $[\omega\cdot\nabla]=\mathrm{s}^{-1}\mathrm m^{-1}$、$[u]=\mathrm m/\mathrm s$ より $[(\omega\cdot\nabla)u]=\mathrm{s}^{-2}$。どちらも $\partial_t\omega$ と同じである。
<!-- solution-end -->

### A2. 平面流で伸長項が零になる理由

$u=(f(y,t),0,0)$、$f$ は十分滑らかとする。$\omega$ と $(\omega\cdot\nabla)u$ を求め、伸長項が消える理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[渦度の定義](../../../幾何系/VC/VC9/index.md#def-vc9-vorticity)より、$\omega=(0,0,\partial_xu_2-\partial_yu_1)=(0,0,-\partial_y f)$。従って $(\omega\cdot\nabla)u=-(\partial_y f)\partial_z u=0$。この等号は $z$ 方向に速度が変化しないことに依存する。$\omega\ne0$ であっても成立し、渦度が零であるから伸長しないわけではない。
<!-- solution-end -->

### A3. Gaussian 渦の中心と幅

$a_0=1$ m$^2$、$\nu=0.25$ m$^2$/s、$\Gamma=2\pi$ m$^2$/s に対し、$t=0$ と $t=3$ s の $a,\ell,\zeta_G(0,t)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Gaussian 渦の定義](#def-fluid10-gaussian-vortex)で $a(t)=1+4(0.25)t=1+t$ m$^2$。$t=0$ では $a=1$ m$^2$、$\ell=1$ m、$\zeta_G(0,0)=2\pi/(\pi\cdot1)=2$ s$^{-1}$。$t=3$ s では $a=4$ m$^2$、$\ell=2$ m、$\zeta_G(0,3)=2\pi/(4\pi)=1/2$ s$^{-1}$。幅が2倍になると中心の高さは4分の1である。
<!-- solution-end -->

### A4. 符号付き総渦度

$\zeta=A e^{-r^2/b}$、$A\in\mathbb R$ [s$^{-1}$]、$b>0$ [m$^2$] とする。[総渦度の定義](#def-fluid10-total-vorticity)が使えることを示し、$Q$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|\zeta|=|A|e^{-r^2/b}$ の面積分は極座標で $2\pi|A|\int_0^\infty e^{-r^2/b}r\,dr=\pi b|A|<\infty$。従って絶対可積分である。同じ置換 $s=r^2/b$ より

$$
Q=2\pi A\int_0^\infty re^{-r^2/b}\,dr
=2\pi A\frac b2\int_0^\infty e^{-s}\,ds=\pi Ab.
$$

$A<0$ の場合は $Q<0$ になり、渦度の大きさの積分と区別できる。
<!-- solution-end -->

### Level B

### B1. 粘性で減衰する厳密なせん断流

$u=(U_0e^{-\nu k^2t}\sin(ky),0,0)$ について $\nabla\cdot u$、移流加速度、$\partial_tu$、$\nu\Delta u$ を直接計算し、一定圧力で粘性 Navier–Stokes 方程式を満たすことを示せ。$\zeta$ も求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$u_1$ は $x$ に依存しないので $\partial_xu_1=0$、他の速度成分も零で $\nabla\cdot u=0$。$(u\cdot\nabla)u=u_1\partial_xu=0$ である。一方

$$
\partial_tu=(-\nu k^2U_0e^{-\nu k^2t}\sin ky,0,0),
\quad
\Delta u=(-k^2U_0e^{-\nu k^2t}\sin ky,0,0).
$$

したがって $\partial_tu=\nu\Delta u$ となり、$p$ 一定、$\Phi=0$ で[CTM15 の Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)を満たす。渦度は $\zeta=-\partial_yu_1=-kU_0e^{-\nu k^2t}\cos ky$。$\partial_t\zeta=\nu\partial_y^2\zeta$ も直接確かめられ、長波長（$k$ 小）ほどゆっくり減衰する。
<!-- solution-end -->

### B2. 三次元伸長を速度行列で検算する

$\alpha>0$、$\Omega(t)=\Omega_0e^{\alpha t}$ とし、第5節の速度場を与える。$\nabla\cdot u$、$\omega$、$(\omega\cdot\nabla)u$、$\Delta\omega$ を求め、渦度式を確認せよ。二次元の命題を適用できない理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[三次元伸長模型](#prop-fluid10-stretching-solution)の速度は $u_1=-\alpha x/2-\Omega y$、$u_2=\Omega x-\alpha y/2$、$u_3=\alpha z$。よって

$$
\nabla\cdot u=-\alpha/2-\alpha/2+\alpha=0,\quad
\omega=(0,0,\partial_xu_2-\partial_yu_1)=(0,0,2\Omega).
$$

$\omega$ は空間一定なので $(u\cdot\nabla)\omega=0$、$\Delta\omega=0$。$\partial_zu=(0,0,\alpha)$ だから $(\omega\cdot\nabla)u=2\Omega\partial_zu=(0,0,2\alpha\Omega)$。$\partial_t\omega=(0,0,2\Omega')=(0,0,2\alpha\Omega)$ で[渦度輸送式](#thm-fluid10-vorticity-transport)が成立する。$u_3=\alpha z$ が $z$ に依存するため、[二次元輸送命題](#prop-fluid10-planar-transport)の $\partial_zu=0$ という仮定は満たさない。
<!-- solution-end -->

### B3. Gaussian 渦の PDE を自力で再現する

$a=a_0+4\nu t$、$\zeta_G=\Gamma(\pi a)^{-1}e^{-r^2/a}$ とする。$\partial_t\zeta_G$ と $\Delta_2\zeta_G$ を求め、$\partial_t\zeta_G=\nu\Delta_2\zeta_G$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$a'=4\nu$ を用いて積の微分を行うと

$$
\partial_t\zeta_G
=\zeta_G\left(-\frac{a'}a+\frac{r^2a'}{a^2}\right)
=4\nu\zeta_G\left(\frac{r^2}{a^2}-\frac1a\right).
$$

放射方向には $\partial_r\zeta_G=-2r\zeta_G/a$、さらに $\partial_r^2\zeta_G=(-2/a+4r^2/a^2)\zeta_G$。よって $r>0$ で

$$
\Delta_2\zeta_G=\partial_r^2\zeta_G+\frac1r\partial_r\zeta_G
=4\left(\frac{r^2}{a^2}-\frac1a\right)\zeta_G.
$$

$r=0$ でも両辺は滑らかな関数の極限で一致し、$\partial_t\zeta_G=\nu\Delta_2\zeta_G$ となる。ただし流体の速度式全体の検査には、第4節で示した圧力と接線速度の計算も必要である。
<!-- solution-end -->

### B4. 壁で何を失うか

有界で滑らかな境界をもつ固定平面領域 $D$ に対し、二次元輸送式を面積分して $d(\int_D\zeta)/dt$ の境界流束式を示せ。**全境界**で無滑り条件 $u=0$ を課したとき、総渦度の値と正味の拡散流束を求めよ。各境界点で $\nabla\zeta\cdot n=0$ と言えるかも判定し、壁の一部分だけが無滑りの場合との違いを述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[二次元輸送命題](#prop-fluid10-planar-transport)を $\partial_t\zeta+\nabla_2\cdot(u\zeta-\nu\nabla_2\zeta)=0$ と書き直す。静止した $D$ に面積積分し[Green の定理（流束形）](../../../幾何系/VC/VC4/index.md#cor-vc4-green-flux)を使えば

$$
\frac{d}{dt}\int_D\zeta\,dA
=-\int_{\partial D}\zeta\,u\cdot n\,ds
+\nu\int_{\partial D}\nabla_2\zeta\cdot n\,ds.
$$

[CTM15 の壁面無滑り条件](../../CTM/CTM15/index.md#def-ctm15-no-slip) $u=0$ が**全境界**で成立するなら、第1の積分は零である。それだけでは第2の積分を零とは断定できないが、ここではさらに[VC9 の渦度と循環の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)を適用できる。境界が滑らかで $u$ も滑らかだから

$$
Q_D(t)=\int_D(\partial_xu_2-\partial_yu_1)\,dA
=\oint_{\partial D}(u_1\,dx+u_2\,dy)=0
$$

が**各時刻**に成立する。従って $dQ_D/dt=0$ であり、前の流束式と $\nu>0$ から $\int_{\partial D}\nabla_2\zeta\cdot n\,ds=0$ とも分かる。これは法線勾配の**境界積分**の結論であり、各点の $\nabla_2\zeta\cdot n=0$ を意味しない。壁の一部分にしか $u=0$ を課さない場合は $\oint_{\partial D}u\cdot d\ell=0$ を導けないので、正味の渦度拡散流束を別途調べなければ保存を断定できない。
<!-- solution-end -->

### Level C

### C1. 局所値・循環・粘性と三次元の違いを統合する

$\Gamma=2\pi$ m$^2$/s、$a_0=1$ m$^2$、$\nu=1/4$ m$^2$/s、$\rho_0>0$ とする Gaussian 渦について以下を求めよ。

1. $t=1$ s の $\zeta_G(0,t)$、$\ell(t)$ と、半径 $R=1$ m 内の渦度 $Q_R(t)$。
2. $t=1$ s、$r=1$ m の $u_\theta$ を求め、円周積分 $2\pi r u_\theta$ が $Q_R$ に一致することを確かめよ。
3. 圧力の半径方向微分の符号と、$\nu>0$ でも総渦度が保存される理由を示せ。
4. 三次元では $\nu>0$ であっても伸長による渦度増幅が可能なことを第5節の厳密解で説明し、「Gaussian 渦の減衰から全ての三次元渦が減衰する」はなぜ誤りか述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1.** [Gaussian 渦の定義](#def-fluid10-gaussian-vortex)から $a(1)=1+4(1/4)\cdot1=2$ m$^2$。よって $\zeta_G(0,1)=2\pi/(\pi\cdot2)=1$ s$^{-1}$、$\ell(1)=\sqrt2$ m。半径1mの円板に対して[Gaussian 渦の積分式](#thm-fluid10-gaussian-vortex)へ $R^2/a=1/2$ を代入すれば

$$
Q_1(1)=2\pi(1-e^{-1/2})\ \mathrm{m}^2/\mathrm{s}
\simeq2.4722\ \mathrm{m}^2/\mathrm{s}.
$$

**2.** 同じ時刻・半径で円周速度は

$$
u_\theta(1,1)=\frac{2\pi}{2\pi\cdot1}(1-e^{-1/2})
\simeq0.393469\ \mathrm{m}/\mathrm{s}.
$$

[FLUID9 の循環の定義](../FLUID9/index.md#def-fluid9-material-circulation)に従い反時計回りの円を一周すると、接線速度は円周上で一定なので $\oint u\cdot d\ell=2\pi R u_\theta=2\pi(1-e^{-1/2})$ m$^2$/s。第1問の $Q_1(1)$ と一致する。ただしこの固定円を物質閉曲線とみなす必要はない。

**3.** 第4節の[Gaussian 渦の圧力](#thm-fluid10-gaussian-vortex)について $\partial_rp=\rho_0u_\theta^2/r\ge0$。半径外側ほど圧力が高く、内向き圧力力が向心加速度を支える。全渦度 $\int_{\mathbb R^2}\zeta_G\,dA=\Gamma$ については、$u\cdot e_r=0$ で移流流束が零であり、半径 $R$ の境界の拡散流束も

$$
\int_{\partial B_R}\nabla\zeta_G\cdot n\,ds
=2\pi R\,\partial_r\zeta_G(R,t)
=-\frac{4\pi R^2}{a(t)}\zeta_G(R,t)
\xrightarrow[R\to\infty]{}0
$$

となる。したがって[総渦度保存命題](#prop-fluid10-total-vorticity-conservation)の境界条件を満たし、$Q=\Gamma$ は粘性があっても一定である。有限円板の $Q_R$ は外側への拡散で減少し得る。

**4.** [三次元伸長模型](#prop-fluid10-stretching-solution)では $\omega=(0,0,2\Omega_0e^{\alpha t})$、$\Delta\omega=0$ である。それでも $(\omega\cdot\nabla)u=\alpha\omega$ だから $\alpha>0$ なら渦度が増加する。二次元 Gaussian 渦で伸長項が零だったという条件を三次元へ移せない。またこの模型は無限遠で増大するので、有限エネルギー流体全般についての結論でもない。
<!-- solution-end -->

## 8. まとめ：観測する量を固定する

- **渦度の局所値**は移流・伸長・拡散の全てから影響を受ける。二次元では伸長が消えるが拡散は残る。
- **固定円板内の渦度積分**は拡散流束によって変わる。**平面全域の総渦度**は、可積分性と境界流束条件の下では粘性があっても保存される。
- **三次元の渦度増幅**は伸長項を持つことと整合する。局在性、壁、境界流束、滑らかさの制約を忘れずに模型を選ぶ。

次の FLUID11 では、二次元非圧縮流と無渦流をそれぞれ流れ関数・速度ポテンシャルで表示するための条件を調べる。