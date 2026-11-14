# FLUID9 循環はいつ保存されるか

[FLUID8 の渦度方程式](../FLUID8/index.md#thm-fluid8-vorticity-equation)は、ある場所の流体がどれほど回転するかを時間発展させた。しかし、同じ流体粒子を囲んで動く輪を考えたら、その輪に沿う速度の積分はどうなるだろうか。[VC9 の循環と渦度の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)は**固定した時刻**の積分を結ぶ。ここでは輪そのものが変形する場合の時間微分を求める。

本講の主張は「**滑らかな非粘性流で、体積力が保存力、圧力が密度だけの関数なら、流体粒子とともに動く向き付き閉曲線の循環は一定**」である。これは圧縮性や非定常性を禁止しない。曲線を空間に固定して同じ積分を測る話とも異なる。

## 0. 模型・記号と前提

$\mathcal D\subset\mathbb R^3$ を開集合、$I=[t_0,t_1]$ を時間区間とする。以下、場の引数の $x\in\mathcal D$ は三次元の位置を表し、$(x,y,z)$ と成分を並べたときの $x$ は第1座標を表す。流れは $u(x,t)$ [m/s]、密度 $\rho(x,t)>0$ [kg/m$^3$]、圧力 $p(x,t)$ [Pa] とし、時間微分と空間微分が以下の連鎖律と線積分の微分を許すよう、$u$ は空間 $C^2$ 級・時間 $C^1$ 級、$\rho,p$ は空間 $C^1$ 級かつ必要な時間連続性をもつとする。外力のポテンシャル $\Phi(x,t)$ [m$^2$/s$^2$] は各時刻に空間 $C^1$ 級で、$\nabla\Phi$ が連続とする。曲線全体の流跡は $\mathcal D$ の中に留まる。

[FLUID4 の流跡線](../FLUID4/index.md#def-fluid4-pathline)は、初期時刻 $t_0$ の各点 $a$ から $dX/dt=u(X,t)$、$X(t_0)=a$ を解く。この解が時刻 $t$ に返す位置を $F_t(a)$ と書く。ここで下付きの $t$ は**時刻 $t$ の写像**を表し、微分を表さない。同じ方程式を初期閉曲線の**全点**へ同時に適用するのが本講の出発点である。[VC9 の物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)を $D_t=\partial_t+u\cdot\nabla$ と書く。$\partial_tu$ は位置 $x$ を固定して微分し、$\partial_tX$ は粒子ラベル $s$ を固定して微分する。$\nabla$ は時刻を固定した空間微分で、後の $d\Gamma/dt$ は**動く輪全体の循環**の時間微分である。

[CTM7 の局所運動量式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)で、[FLUID6 の非粘性模型](../FLUID6/index.md#def-fluid6-ideal-potential-force)のように法線 $n$ に働く面力を $-pn$ とすると、応力は $\sigma=-pI_3$（$I_3$ は三次元単位行列）となる。成分で $(\nabla\cdot\sigma)_i=\sum_{j=1}^3\partial_j(-p\delta_{ij})=-\partial_i p$ だから、体積力を $-\nabla\Phi$ とした Euler 方程式は

$$
D_tu=-\frac1\rho\nabla p-\nabla\Phi.
$$

密度が一定の場合の導出は[FLUID6 の Euler 運動方程式](../FLUID6/index.md#thm-fluid6-euler-equation)、変密度への拡張は[FLUID8 の模型](../FLUID8/index.md#thm-fluid8-vorticity-equation)を参照する。ここでは $\rho$ を一定とは仮定しない。

## 1. 輪のどの部分を追うのか

瞬間ごとの任意の曲線ではなく、**初期に輪を作っていた同じ流体粒子**を追い続けたい。初期曲線の向きは始点と終点を同一視するパラメータ $s$ の増加方向で固定し、時刻が変わっても反転させない。[CTM1 の運動写像](../../CTM/CTM1/index.md#def-ctm1-motion-configuration)と同様に、異なる粒子が重ならず滑らかに元の位置へ戻せる対応を、逆写像も $C^1$ 級である**微分同相**として扱う。

<a id="def-fluid9-material-loop"></a>

<!-- formal-statement-start -->
### 定義（物質閉曲線）

$X_0:[0,1]\to\mathcal D$ を $X_0(0)=X_0(1)$ の区分的 $C^1$ 級の向き付き閉曲線とする。$u$ の流れ写像 $F_t$ が $X_0([0,1])$ を含む開近傍上で存在し一意で、各時刻にその開近傍から像への $C^1$ 級微分同相であり、$F_{t_0}(a)=a$ とする。各粒子を流れに従わせた曲線

$$
X(s,t)=F_t(X_0(s)),\qquad
\partial_tX(s,t)=u(X(s,t),t)
$$

の像 $C(t)$ を**物質閉曲線**とする。向きは $s$ の増加方向とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid9-material-loop -->
### **定義の確認**：せん断流が円や長方形を傾ける

二次元の定常場 $u(x,y)=(ay,0)$（$a$ の単位は s$^{-1}$）を考える。三次元模型ではこれを $u=(ay,0,0)$ として $z$ を固定すればよい。粒子 $X_0(s)=(x_0(s),y_0(s))$ から始めると

$
X(s,t)=(x_0(s)+a(t-t_0)y_0(s),\ y_0(s)).
$

確かに $\partial_tX=(ay_0,0)=u(X,t)$、かつ初期曲線が閉じていれば $X(0,t)=X(1,t)$ で閉じる。次に**なぜ微分同相と向きを判定できるか**を確かめる。$\tau=t-t_0$ を固定すると、流れ写像とその空間微分（初期位置を変えたときの一次変化）は

$
F_t(x_0,y_0)=(x_0+a\tau y_0,y_0),\qquad
DF_t=\begin{pmatrix}1&a\tau\\0&1\end{pmatrix},\qquad
\det DF_t=1>0.
$

これは初期座標の標準基底による表示である。さらに $(x,y)$ から初期位置への逆対応を**実際に**解くと $F_t^{-1}(x,y)=(x-a\tau y,y)$ で、これも $C^1$ 級である。従って任意の点を一意に戻せる微分同相であり、行列式の正符号から向きも保存される（行列式の正値だけでは一般に大域的単射性まではいえない）。初期の長方形は平行四辺形へ変形する。単に時刻 $t$ に選び直した長方形を積分することとは異なる。
<!-- definition-example-end -->

<a id="def-fluid9-material-circulation"></a>

速度の輪に沿った**接線成分**を足すと、進行方向に沿う回り込みを測れる。逆向きに一周すれば値の符号は反転する。

<!-- formal-statement-start -->
### 定義（物質閉曲線の循環）

上の物質閉曲線に対し、時刻 $t$ の**循環**を

$$
\Gamma(t)=\oint_{C(t)}u(x,t)\cdot d\ell
=\int_0^1u(X(s,t),t)\cdot\partial_sX(s,t)\,ds
$$

とする。速度と線素の積なので単位は m$^2$/s とする。閉曲線の向きを反転すれば $\Gamma$ も符号が反転する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid9-material-circulation -->
### **定義の確認**：剛体回転する円の符号と単位

一定の角速度 $\Omega$ [s$^{-1}$] で $u=(-\Omega y,\Omega x,0)$ とする。ここでの $\Omega$ は角速度であり、第0節の空間領域 $\mathcal D$ とは別の量である。半径 $R$ の円を反時計回り（$+z$ 側から見て）にたどる。先の $s\in[0,1]$ から角度 $\theta=2\pi s\in[0,2\pi]$ に変数を替え、初期時刻を $t_0$ とすると

$
X(\theta,t)=R(\cos(\theta+\Omega(t-t_0)),\sin(\theta+\Omega(t-t_0)),0).
$

$\partial_tX=\Omega\partial_\theta X=u(X,t)$ であり、$\theta=0,2\pi$ の位置は一致する。流れ写像は平面の回転で、逆写像は角度 $-\Omega(t-t_0)$ の回転だから物質閉曲線の条件を満たす。また

$
\partial_\theta X=R(-\sin(\theta+\Omega(t-t_0)),\cos(\theta+\Omega(t-t_0)),0),
\qquad u(X,t)=\Omega\partial_\theta X.
$

$d\ell=\partial_\theta X\,d\theta$ と置いて積分すると

$
\Gamma(t)=\int_0^{2\pi}u(X,t)\cdot\partial_\theta X\,d\theta
=\int_0^{2\pi}\Omega R^2\,d\theta=2\pi\Omega R^2.
$

$R^2\Omega$ の単位は m$^2$/s である。時計回りなら $-2\pi\Omega R^2$ となる。$\Omega>0$ なら反時計回りを正とする規約を以後固定する。
<!-- definition-example-end -->

## 2. 変形する輪の線積分を微分する

固定曲線の積分なら $\partial_tu$ だけを微分しそうになる。しかし物質閉曲線では、速度の評価点 $X$ も線素 $\partial_sX\,ds$ も変わる。その**両方**を微分しないと正しい式にはならない。

<a id="thm-fluid9-material-derivative"></a>

<!-- formal-statement-start -->
### 定理（物質閉曲線の循環の時間微分）

第0節の正則性のもとで、$X(s,t)$ は区分的に $C^1$ 級の $s$ 微分と必要な混合微分を持つ物質閉曲線とする。その循環について

$$
\boxed{\displaystyle\frac{d\Gamma}{dt}
=\oint_{C(t)}D_tu\cdot d\ell}
$$

が成立する。右辺の $D_tu$ は**粒子の加速度**である。
<!-- formal-statement-end -->

### 証明の見取り図

循環の積分式を $s$ を固定して時間微分する。速度の変化から $D_tu$、線素の変化から $\partial_s(|u|^2/2)$ が出る。最後の項は閉曲線の両端で打ち消し合う。

<!-- proof-start -->
### 証明

各 $s$ で物質粒子を追うので $\partial_tX=u(X,t)$ である。まず連鎖律より

$$
\partial_t[u_i(X(s,t),t)]
=\partial_tu_i(X,t)+\sum_{j=1}^3
\partial_ju_i(X,t)\,\partial_tX_j
=(D_tu_i)(X,t).
$$

他方、線素の $s$ 微分は、混合微分の交換を使い

$$
\partial_t(\partial_sX_i)
=\partial_s(\partial_tX_i)
=\partial_s[u_i(X,t)]
=\sum_{j=1}^3\partial_ju_i(X,t)\,\partial_sX_j.
$$

以上を $\Gamma=\int_0^1\sum_i u_i(X,t)\partial_sX_i\,ds$ に代入すると、

$$
\begin{aligned}
\frac{d\Gamma}{dt}
&=\int_0^1\sum_i\left\{
(D_tu_i)\partial_sX_i+u_i\partial_s[u_i(X,t)]
\right\}ds\\
&=\int_0^1(D_tu)\cdot\partial_sX\,ds
+\int_0^1\partial_s\left(\frac12\sum_i u_i(X,t)^2\right)ds\\
&=\oint_{C(t)}D_tu\cdot d\ell
+\frac12|u(X(1,t),t)|^2-\frac12|u(X(0,t),t)|^2.
\end{aligned}
$$

閉曲線なので $X(1,t)=X(0,t)$ であり、端点項は $0$。区分的に滑らかな場合も各区間を足せば内部端点項は相殺される。主張を得る。
<!-- proof-end -->

重要なのは「物質閉曲線」であることだ。空間に**固定した**閉曲線 $C$ なら一般に

$$
\frac{d}{dt}\oint_Cu\cdot d\ell
=\oint_C\partial_tu\cdot d\ell
$$

となる。両式は曲線が流れに従って動く場合にだけ一致するわけではない。

## 3. Kelvin の循環定理：どの力が積分で消えるか

第0節の[CTM7 の局所運動量式](../../CTM/CTM7/index.md#thm-ctm7-material-momentum)から得た Euler 方程式で加速度を置き換えると、圧力と外力が輪に沿って仕事をする。外力 $-\nabla\Phi$ は勾配なので閉曲線で積分すると消える。圧力項も勾配へ直せるには、追加の条件が必要である。

[FLUID8 の順圧条件](../FLUID8/index.md#def-fluid8-barotropic)は、同じ $C^1$ 級関数 $P$ で $p=P(\rho)$ と書けることだった。そこで[FLUID6 の順圧の圧力ポテンシャル](../FLUID6/index.md#def-fluid6-barotropic-enthalpy)に従い、密度の値域を含む正の区間で

$$
h(r)=\int_{\rho_*}^r\frac{P'(q)}q\,dq,\qquad
\nabla h(\rho)=h'(\rho)\nabla\rho
=\frac{P'(\rho)}{\rho}\nabla\rho=\frac{\nabla p}{\rho}
$$

と定める（$\rho_*>0$ は固定値）。$\rho>0$ が必要なのは分母のためである。$h$ の単位は m$^2$/s$^2$。これは任意の変密度流で $p/\rho$ と同じではない。

<a id="thm-fluid9-kelvin"></a>

<!-- formal-statement-start -->
### 定理（Kelvin の循環定理）

開集合 $\mathcal D\subset\mathbb R^3$ 内の時間区間 $I$ で、$\rho>0$ の滑らかな古典的 Euler 流 $(\rho,u,p)$ が

$$
D_tu=-\frac{\nabla p}{\rho}-\nabla\Phi
$$

を満たすとする。$\Phi$ は一価の滑らかなポテンシャル、$p=P(\rho)$ は時間・場所を通じて共通の $C^1$ 級順圧関係とし、$P'(r)/r$ が密度の正の値域を含む区間で積分可能とする。$C(t)$ は $I$ 中ずっと $\mathcal D$ 内にある向き付き物質閉曲線とする。このとき

$$
\boxed{\Gamma(t)=\Gamma(t_0)\quad(t\in I).}
$$

時間変化、圧縮、既存の非零渦度は禁じていない。
<!-- formal-statement-end -->

### 証明の見取り図

[循環微分の定理](#thm-fluid9-material-derivative)に Euler の加速度を代入する。[順圧の圧力ポテンシャル](../FLUID6/index.md#def-fluid6-barotropic-enthalpy)で圧力項が $\nabla h(\rho)$ となる。勾配の積分は閉曲線で零になる。

<!-- proof-start -->
### 証明

前節の定理で、流体粒子の加速度を Euler の式に置き換えると

$$
\begin{aligned}
\frac{d\Gamma}{dt}
&=\oint_{C(t)}D_tu\cdot d\ell\\
&=-\oint_{C(t)}\left(\frac{\nabla p}{\rho}+\nabla\Phi\right)\cdot d\ell\\
&=-\oint_{C(t)}\nabla\{h(\rho)+\Phi\}\cdot d\ell.
\end{aligned}
$$

一価の関数 $H=h(\rho)+\Phi$ に曲線 $s\mapsto X(s,t)$ を代入すると、連鎖律から

$$
\nabla H(X,t)\cdot\partial_sX=\partial_sH(X(s,t),t).
$$

従って

$$
\oint_{C(t)}\nabla H\cdot d\ell
=\int_0^1\partial_sH(X(s,t),t)\,ds
=H(X(1,t),t)-H(X(0,t),t)=0.
$$

よって $d\Gamma/dt=0$ である。時間区間で積分すれば $\Gamma(t)-\Gamma(t_0)=0$。
<!-- proof-end -->

**密度一定は必要ない。** 例えば $p=K\rho^2$（$K>0$）なら $h(\rho)=2K(\rho-\rho_*)$ とできる。$p$ が変化しても $\nabla p/\rho=\nabla(2K\rho)$ なので循環は保存される。一方、$\rho$ と $p$ が独立に変わると、圧力力を一般には一つのポテンシャルで表せない。

## 4. 保存しない場合：傾圧項の符号を突き合わせる

順圧を外したとき、循環がどのくらい変わるかも元の微分式から計算できる。閉曲線の向きと、面の法線は右ねじの関係で決める。

<a id="prop-fluid9-baroclinic-circulation"></a>

<!-- formal-statement-start -->
### 命題（非順圧での循環生成と渦度流束）

第0節の滑らかな Euler 流を考え、$\rho>0$、外力は $-\nabla\Phi$ とする。向き付き物質閉曲線 $C(t)$ に対し

$$
\frac{d\Gamma}{dt}=-\oint_{C(t)}\frac{\nabla p}{\rho}\cdot d\ell.
$$

さらに各時刻に $C(t)$ を境界とする滑らかな向き付き曲面 $\Sigma(t)\subset\mathcal D$ があり、曲線・面の向きが整合し、$p,\rho$ が空間 $C^2$ 級なら

$$
\boxed{\frac{d\Gamma}{dt}
=\int_{\Sigma(t)}\frac{\nabla\rho\times\nabla p}{\rho^2}
\cdot n\,dS.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

外力の勾配は閉曲線で消える。[VC9 の循環と渦度の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)で用いた Stokes の定理を圧力力のベクトル場へ使い、curl の積の規則を計算する。

<!-- proof-start -->
### 証明

[循環微分の定理](#thm-fluid9-material-derivative)に Euler の式を代入し、$\oint\nabla\Phi\cdot d\ell=0$ とすると第1式を得る。第2式のため

$$
\begin{aligned}
\nabla\times\left(-\frac1\rho\nabla p\right)
&=-\nabla(\rho^{-1})\times\nabla p
-\rho^{-1}(\nabla\times\nabla p)\\
&=-(-\rho^{-2}\nabla\rho)\times\nabla p\\
&=\frac{\nabla\rho\times\nabla p}{\rho^2}.
\end{aligned}
$$

$p$ が空間 $C^2$ 級なので、$\nabla\times\nabla p=0$ には混合偏微分の交換が使える。$C(t)=\partial\Sigma(t)$ で向きが整合しているので、[循環・渦度を結ぶ Stokes の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)を加速度の圧力部分へ適用すれば第2式を得る。この式では**面の時間微分をもう一度取ってはいない**。曲線の移動は第2節の微分で既に取り込まれている。
<!-- proof-end -->

$\omega=\nabla\times u$ と書けば、[VC9 の循環・渦度の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)から各時刻で

$$
\Gamma(t)=\int_{\Sigma(t)}\omega\cdot n\,dS.
$$

つまり、**渦度ベクトルの各成分が粒子ごとに不変**と言うのではなく、物質ループが囲む向き付き渦度流束が不変と言うのが Kelvin の定理である。[FLUID8 の渦度方程式](../FLUID8/index.md#thm-fluid8-vorticity-equation)では三次元の伸長項により $\omega$ は変化し得るが、面積・向きの変形と合わさって積分が保存される。

### **圧力の非順圧例**：二つの辺を引き算してみる

初期時刻 $t_0=0$ で、$0\le x\le L$、$0\le y\le H$ の長方形を $+z$ から見て反時計回りに囲む。$L,H>0$、$u(x,0)=0$、$\Phi=0$、$\rho=\rho_0(1+ax)$、$p=p_0+by$、$\rho_0,a,b>0$ とする。ここで述べるのはこの初期場を含む滑らかな Euler 解が存在する場合の**初期の瞬間変化率**である。

水平辺は $dp=b\,dy=0$。右の鉛直辺は上向きなので

$$
\oint_{C(0)}\frac{dp}{\rho}
=\frac{bH}{\rho_0(1+aL)}-\frac{bH}{\rho_0}.
$$

従って

$$
\left.\frac{d\Gamma}{dt}\right|_{t=0}
=\frac{bH}{\rho_0}\left(1-\frac1{1+aL}\right)>0.
$$

独立に[FLUID8 の傾圧項](../FLUID8/index.md#def-fluid8-baroclinic-source)は $S_{\mathrm{baro},z}=ab/[\rho_0(1+ax)^2]$。$+z$ 法線の面積分を行うと

$$
\begin{aligned}
\int_0^H\int_0^L S_{\mathrm{baro},z}\,dx\,dy
&=\frac{bH}{\rho_0}\int_0^L\frac{a}{(1+ax)^2}\,dx\\
&=\frac{bH}{\rho_0}\left[-\frac1{1+ax}\right]_0^L\\
&=\frac{bH}{\rho_0}\left(1-\frac1{1+aL}\right).
\end{aligned}
$$

二つの計算で**正の符号、分母、単位 m$^2$/s$^2$** が一致する。これは任意時刻に圧力場を静止させ続ける解だと主張していない。

### 失われた仮定がどこに効くか

- **非保存外力** $b_{\mathrm{ext}}$ の場合は $\oint b_{\mathrm{ext}}\cdot d\ell$ が残る。勾配でない力は閉曲線で相殺されるとは限らない。
- **粘性** があれば Euler の加速度以外に粘性応力の発散が入り、その循環が残り得る（次講 FLUID10）。
- **不連続な流れ・破れた滑らかさ**では、曲線微分や Stokes の定理をこの形で使えない。不連続面を跨ぐ流れまで本定理を無条件に延長しない。
- **曲線が物質曲線でない**と、第2節で $\partial_tX=u$ が使えず、線素の時間変化を落としてしまう。
- **単に $\nabla\rho\times\nabla p=0$ が曲線上で成り立つ**だけでは、囲む曲面内の生成項が零とは限らない。順圧は全域での十分条件であり、個々の曲線については線積分の相殺だけでも保存し得る。

## 5. 厳密に追える流れで確認する

### 5.1 せん断流の輪は変形しても循環が変わらない

$u=(ay,0)$、$\rho=\rho_0$、$p=p_0$、$\Phi=0$ は $D_tu=(u\cdot\nabla)u=0$ と $\nabla\cdot u=0$ を満たす一定密度 Euler 解である。初期長方形の幅 $L$、高さ $H$、反時計回りの循環は、下辺は $y=0$、上辺は $y=H$ で左へ進むので

$$
\Gamma(0)=0+0+\int_L^0 aH\,dx+0=-aLH.
$$

$t>0$ には上下辺は水平なまま、左右辺は斜めになる。右辺 $X=(L+aty,y)$ を $y:0\to H$ で進むと

$$
\int_{\mathrm{R}}u\cdot d\ell
=\int_0^H(ay,0)\cdot(at,1)\,dy
=\frac{a^2tH^2}{2}.
$$

左辺は上から下へ進むため $-a^2tH^2/2$、上辺の積分は $-aLH$、下辺は零。よって $\Gamma(t)=-aLH$。形が変わっても保存される。[VC9 の循環と渦度の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)でも、$\omega_z=-a$、面積 $LH$ のままなので同じ符号を得る。

### 5.2 回転円で流れ自体を検査する

第1節の $u=(-\Omega y,\Omega x,0)$、$\rho=\rho_0$、$\Omega$ は時間一定とする。粒子の加速度は

$$
D_tu=(-\Omega^2x,-\Omega^2y,0).
$$

$p=p_0+\rho_0\Omega^2(x^2+y^2)/2$ を選べば $-\nabla p/\rho_0=D_tu$ で Euler 方程式と一致し、$\nabla\cdot u=0$ なので質量保存も満たす。円周上の $\Gamma=2\pi\Omega R^2$ は一定である。この確認なしに「剛体回転だから Euler 解」と断定してはいけない。

### 5.3 手計算と表示の扱い

曲線の変形を理解するには、上のせん断流の厳密な流れ写像と各辺の積分が最短の検算方法である。数値追跡で閉じた線分を描くだけでは、$\Gamma$ の保存を検証したことにならない。今後の数値可視化でも、**粒子の追跡誤差**と**循環の積分誤差**を別々に報告する必要がある。

## 6. 演習

各問は、閉曲線の向き、使用する方程式、曲線が物質的に動くかを最初に確認してから解こう。

### Level A

### A1. 円周の循環と向き

$u=(-2y,2x,0)$ [m/s]（座標は m）で半径 $3$ m の円を反時計回りに積分し、時計回りとの符号・単位の違いを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[循環の定義](#def-fluid9-material-circulation)で $\Omega=2$ s$^{-1}$、$R=3$ m と置く。$X=(3\cos\theta,3\sin\theta,0)$、$dX=(-3\sin\theta,3\cos\theta,0)\,d\theta$、$u(X)=(-6\sin\theta,6\cos\theta,0)$ だから

$$
u\cdot dX=18(\sin^2\theta+\cos^2\theta)d\theta=18\,d\theta.
$$

従って $\Gamma=\int_0^{2\pi}18\,d\theta=36\pi$ m$^2$/s。向きを逆にすれば線素が反転するので $-36\pi$ m$^2$/s。
<!-- solution-end -->

### A2. 物質曲線の判定

$u=(ay,0)$ とする。$X(s,t)=(x_0(s)+aty_0(s),y_0(s))$ が物質閉曲線になる条件を確かめよ。一方 $Y(s,t)=(x_0(s),y_0(s))$ が一般には物質曲線でない理由を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$t_0=0$、$X_0(0)=X_0(1)$ とする。[物質閉曲線の定義](#def-fluid9-material-loop)から、$X(0,t)=X(1,t)$ と $\partial_tX=u(X,t)$ の両方が必要。端点は $x_0,y_0$ の値が同じなので一致し、

$$
\partial_tX=(ay_0,0)=u(x_0+aty_0,y_0)
$$

も成立する。$Y$ は端点では閉じているが $\partial_tY=(0,0)$ であり、$u(Y,t)=(ay_0,0)$。$ay_0\ne0$ の点では異なるため物質曲線ではない。
<!-- solution-end -->

### A3. 順圧圧力の積分

$\rho>0$、$p=K\rho^3$（$K>0$）とする。$\nabla p/\rho$ が勾配になることを $h$ の積分から示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[順圧圧力ポテンシャル](../FLUID6/index.md#def-fluid6-barotropic-enthalpy)の積分の被積分関数は $P'(r)/r=3Kr^2/r=3Kr$ なので

$$
h(\rho)=\int_{\rho_*}^{\rho}3Kr\,dr
=\frac{3K}{2}(\rho^2-\rho_*^2).
$$

連鎖律から $\nabla h=3K\rho\nabla\rho$、直接にも $\nabla p/\rho=(3K\rho^2\nabla\rho)/\rho=3K\rho\nabla\rho$。$\rho>0$ が除算条件である。
<!-- solution-end -->

### A4. 保存力の閉曲線積分

$\Phi(x,y,z,t)=g(t)z+\lambda(t)x^2/2$ とする。任意の閉曲線 $C(t)$ について $\oint_{C(t)}(-\nabla\Phi)\cdot d\ell$ を求め、$\Phi$ の時間依存が答えを変えるか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\nabla\Phi=(\lambda(t)x,0,g(t))$ であり、時刻 $t$ を固定して線積分する。曲線 $X(s,t)$ に沿えば

$$
\oint_{C(t)}\nabla\Phi\cdot d\ell
=\int_0^1\partial_s\Phi(X(s,t),t)\,ds
=\Phi(X(1,t),t)-\Phi(X(0,t),t)=0.
$$

従って負符号を付けても零。$t$ で微分する操作ではなく、**各時刻の空間勾配**の線積分なので $g,\lambda$ は時間依存してよい。
<!-- solution-end -->

### Level B

### B1. 曲線の伸びる項を省略すると何を失うか

一般の物質曲線 $X(s,t)$ について $\partial_t\partial_sX$ を成分で求め、$\partial_t\Gamma$ のうち $D_tu$ 以外の項が閉曲線で零になる理由を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[物質閉曲線](#def-fluid9-material-loop)の条件 $\partial_tX_i=u_i(X,t)$ を $s$ 微分し、

$$
\partial_t\partial_sX_i
=\sum_j(\partial_ju_i)(X,t)\partial_sX_j
=\partial_s[u_i(X,t)].
$$

線積分の積の微分による追加項は

$$
\int_0^1\sum_i u_i(X,t)\partial_t\partial_sX_i\,ds
=\int_0^1\sum_i u_i\partial_su_i\,ds
=\int_0^1\partial_s(|u|^2/2)\,ds=0.
$$

最初から線素を固定して微分してしまうと、これが**閉曲線で相殺されることの証明**を失う。開曲線なら端点の速度二乗差が残る。
<!-- solution-end -->

### B2. せん断長方形の循環を二通りで検算

$u=(ay,0)$、初期の CCW 長方形 $[0,L]\times[0,H]$ に対し、初期線積分を四辺で計算せよ。$t>0$ の左右斜辺の積分を計算して $\Gamma(t)$ を確かめ、渦度流束でも照合せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[物質閉曲線](#def-fluid9-material-loop)の流跡写像は $(x_0+aty_0,y_0)$。下辺では $y=0$ だから零。右辺は $x_0=L$、$y:0\to H$、$d\ell=(at,1)\,dy$ なので積分は

$$
\int_0^H(ay,0)\cdot(at,1)\,dy
=a^2t\int_0^H y\,dy=a^2tH^2/2.
$$

上辺では $y=H$、$x_0:L\to0$ で $d\ell=(dx_0,0)$、ゆえに $-aHL$。左辺は $x_0=0$、$y:H\to0$ で右辺と反対の $-a^2tH^2/2$。合計 $\Gamma(t)=-aLH$ となる。初期にも左右辺の寄与が $0$ なので同じ値。独立に $\omega_z=\partial_x0-\partial_y(ay)=-a$、写像の Jacobian $=1$ より面積 $LH$。よって[VC9 の循環・渦度の関係](../../../幾何系/VC/VC9/index.md#cor-vc9-circulation-vorticity)で $\int\omega_z\,dA=-aLH$ と一致する。
<!-- solution-end -->

### B3. 非順圧場の二つの独立な計算

$0\le x\le L$、$0\le y\le H$ の CCW 長方形で、$\rho=\rho_0(1+ax)$、$p=p_0+by$、$\rho_0,a,b>0$ とする。外力が保存力である滑らかな Euler 流の初期状態として、圧力線積分と傾圧項面積分の双方で $d\Gamma/dt$ を計算せよ。最後に $b$ だけを負の定数に変更すると符号はどうなるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

[非順圧での循環生成](#prop-fluid9-baroclinic-circulation)を用いる。鉛直辺だけ $\nabla p\cdot d\ell=b\,dy$ であり、右辺が上向き、左辺が下向きだから

$$
-\oint\frac{\nabla p}{\rho}\cdot d\ell
=-\left\{\frac{bH}{\rho_0(1+aL)}-\frac{bH}{\rho_0}\right\}
=\frac{abHL}{\rho_0(1+aL)}.
$$

一方 $\nabla\rho=(\rho_0a,0,0)$、$\nabla p=(0,b,0)$ なので

$$
\int_{\Sigma} \frac{\nabla\rho\times\nabla p}{\rho^2}\cdot e_z\,dA
=\frac{bH}{\rho_0}\int_0^L\frac{a}{(1+ax)^2}dx
=\frac{bH}{\rho_0}\left(1-\frac1{1+aL}\right)
=\frac{abHL}{\rho_0(1+aL)}.
$$

両方一致する。$b<0$ なら二式は負になる。ここで用いたのは**ある時刻の場の加速度**であり、この線形圧力場が全時刻に持続するとは仮定していない。
<!-- solution-end -->

### B4. 物質循環と固定輪を分ける

定常せん断流 $u=(ay,0)$ について物質長方形の循環は $-aLH$ である。一方、固定輪 $C$ の積分 $\oint_Cu\cdot d\ell$ の時間微分を求めよ。一般の非定常速度場に両者の時間微分の公式をそのまま置き換えてよいか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

固定輪では $\partial_tu=0$ のため

$$
\frac{d}{dt}\oint_Cu\cdot d\ell
=\oint_C\partial_tu\cdot d\ell=0.
$$

物質輪は[循環の時間微分](#thm-fluid9-material-derivative)により $\oint_{C(t)}D_tu\cdot d\ell=0$。この例では $(u\cdot\nabla)u=0$ なので一致しただけで、一般には $D_tu=\partial_tu+(u\cdot\nabla)u$ かつ積分する輪も異なる。固定された輪は[物質閉曲線](#def-fluid9-material-loop)とは限らないので、[Kelvin の循環定理](#thm-fluid9-kelvin)の結論を直接適用してはならない。
<!-- solution-end -->

### Level C

### C1. 三つの模型から Kelvin の定理の限界を判定する

時刻区間で滑らかに存在する物質閉曲線について、次の模型を比較せよ。

1. $\rho>0$、$p=K\rho^2$、$K>0$、非粘性、$b=-\nabla\Phi$。
2. $\rho=\rho_0(1+ax)$、$p=p_0+by$ の初期場（$a,b>0$）、$u(\cdot,0)=0$、外力零、CCW 長方形 $[0,L]\times[0,H]$。
3. 一定密度、$p$ は任意、外力 $b_{\mathrm{ext}}=(-\kappa y,\kappa x,0)$、$\kappa>0$。半径 $R$ の CCW 円がある時刻に物質曲線になっている。

各場合で $d\Gamma/dt$ の式・符号を求め、どの仮定が保存機構を壊すか説明せよ。3では圧力積分の寄与も確認すること。

- Level: C

<!-- solution-start -->
#### 詳細解答

出発点は[物質循環の微分](#thm-fluid9-material-derivative)と非粘性運動方程式で、

$$
\frac{d\Gamma}{dt}=-\oint\frac{\nabla p}{\rho}\cdot d\ell+\oint b_{\mathrm{ext}}\cdot d\ell.
$$

1. $P(r)=Kr^2$ は[順圧条件](../FLUID8/index.md#def-fluid8-barotropic)を満たし、$h(r)=2K(r-\rho_*)$ だから $\nabla p/\rho=\nabla h(\rho)$。$b=-\nabla\Phi$ も勾配である。両積分は閉曲線の端点差として零なので[Kelvin の循環定理](#thm-fluid9-kelvin)により $d\Gamma/dt=0$。密度が一様でなくてもよい。
2. $\nabla\rho=(\rho_0a,0,0)$、$\nabla p=(0,b,0)$ で、圧力力の curl は $ab/[\rho_0(1+ax)^2]e_z$。滑らかな初期場を満たす解が存在するなら、[循環生成の命題](#prop-fluid9-baroclinic-circulation)により

$$
\left.\frac{d\Gamma}{dt}\right|_0
=\frac{bH}{\rho_0}\left(1-\frac1{1+aL}\right)>0.
$$

非順圧なので $\nabla p/\rho$ を一つの勾配と見なす証明の段階が壊れる。初期速度ゼロだけでは循環の時間微分は零にならない。
3. $\rho=\rho_0$ なら圧力項は $-\rho_0^{-1}\oint\nabla p\cdot d\ell=0$。一方 $X=(R\cos\theta,R\sin\theta,0)$ とすれば

$$
b_{\mathrm{ext}}(X)=\kappa R(-\sin\theta,\cos\theta,0),\quad
\partial_\theta X=R(-\sin\theta,\cos\theta,0).
$$

よって $\oint b_{\mathrm{ext}}\cdot d\ell=\int_0^{2\pi}\kappa R^2\,d\theta=2\pi\kappa R^2>0$。非保存外力の閉曲線積分が零にならないことが保存破れの原因である。単位 $\kappa$ は s$^{-2}$、変化率は m$^2$/s$^2$。3で外力のある流れが当該時刻に滑らかに存在することを前提とし、円がずっと円形を保つとは主張していない。
<!-- solution-end -->

## 7. 自己点検と次の講義

- $d\Gamma/dt$ に $D_tu$ を使う前に $\partial_tX=u(X,t)$ を確かめたか。
- 輪の向きと法線を右ねじで合わせ、$\nabla\rho\times\nabla p$ の順序を守ったか。
- 順圧と一定密度を混同せず、$h'(\rho)=P'(\rho)/\rho$ を計算したか。
- 渦度の点wiseな値が変化しても、移動する面の渦度流束が保存され得る理由を説明できるか。
- 保存力、滑らかさ、物質閉曲線の各条件を外したとき、証明のどの行が使えなくなるか示せるか。

次講 FLUID10 では、粘性があると渦度がどのように拡散・移流・伸長されるかを調べる。
