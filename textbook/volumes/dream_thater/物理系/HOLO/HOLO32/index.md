# HOLO32 エンタングルメントと重力の線形応答

<!-- definition-example-audit: strict -->

[HOLO28のエンタングルメント第一法則](../HOLO28/index.md#prop-holo28-first-law)は、参照状態から少し動かしたとき、エントロピーの変化とモジュラーHamiltonianの期待値の変化が一致することを示しました。[HOLO18のRT処方](../HOLO18/index.md#thm-holo18-interval-coefficient)は、特定の半古典的状態の境界エントロピーをバルク極値面の面積へ結びました。

この二つを組み合わせると、**「量子状態の微小な変化を、重力場の方程式に対する条件として読めるか」**という問いが生まれます。ただし一つの球領域の第一法則だけで、Einstein方程式の全成分が直ちに導かれるわけではありません。必要なのは、真空球の局所的なモジュラー流、面積の一次変分、重力のNoether恒等式、**すべての球・Lorentz変換した球**に対する拘束を局所化する議論です。

## 0. 対象と、どの等号を使うのか

境界は $d$ 次元Minkowski時空（$d\ge2$）、バルクは $AdS_{d+1}$ のPoincaré patchです。バルク添字 $a,b=0,\ldots,d$ と境界添字 $\mu,\nu=0,\ldots,d-1$ を区別し、空間方向は $i=1,\ldots,d-1$ とします。Lorentz計量は $(-,+,\ldots,+)$、自然単位 $\hbar=c=1$、AdS半径 $L>0$、Newton定数 $G_N>0$、$\Lambda=-d(d-1)/(2L^2)$ とします。背景計量は

$$
\bar g_{ab}dX^adX^b
=\frac{L^2}{z^2}(-dt^2+dz^2+\delta_{ij}dx^idx^j),
\qquad z>0.
$$

$\lambda$ に滑らかに依存する境界状態とバルク計量の族を考えます。$\lambda=0$ が双方とも真空・純AdSで、$h_{ab}=\left.\partial_\lambda g_{ab}(\lambda)\right|_0$ とします。記号 $\delta F$ は一貫して $\left.\partial_\lambda F\right|_0$ を意味し、有限差 $\Delta F$ と区別します。境界源・境界の平坦計量・UV規制を固定します。必要な変分は共通の正則化の下で微分・積分交換ができるものに限ります。

| 用いる入力 | この講義での扱い |
| --- | --- |
| 真空球のモジュラーHamiltonian | CFT真空の双曲空間への共形写像を**既存のQFT結果として入力**し、重みと係数を計算する |
| 第一法則 | [HOLO28の有限次元命題](../HOLO28/index.md#prop-holo28-first-law)の導出を復習し、局所QFTへの適用には共通の正則化を仮定する |
| 面積とエントロピーの対応 | 静的真空球とその滑らかな一次摂動に対する古典RTを仮定する |
| Einstein方程式 | Noether恒等式の構造を導出し、積分拘束から点ごとの方程式への一般的な反転は**必要条件を明示した既存の幾何学的結果**として扱う |

場の量子補正が $O(G_N^0)$ で残る場合は、[HOLO23のFLM補正](../HOLO23/index.md#def-holo23-flm)を無視できません。本講で「真空Einstein方程式」を得るのは、古典面積が主項となり、一次変分で独立なバルク物質源を入れない領域です。

## 1. 球領域のモジュラーHamiltonian

平坦境界の $t=0$ 上で、中心 $\mathbf x_0\in\mathbb R^{d-1}$、半径 $R>0$ の球

$$
B(\mathbf x_0,R)
=\{\mathbf x:|\mathbf x-\mathbf x_0|<R\}
$$

を選びます。その因果的な発展領域は $|\mathbf x-\mathbf x_0|+|t|<R$ です。真空の部分系状態 $\rho_{B,0}$ のモジュラーHamiltonianは、UV規制を入れて密度行列が定義できる場合には $K_{B,0}=-\log\rho_{B,0}$ です。一般の局所QFTではこの有限行列表示そのものを無条件に仮定せず、状態差の相対的な量として読みます。

ここで重要なのは、一般形 $-\log\rho$ が与えるのは抽象作用素だけだという点です。**真空・球・CFT**という条件では、局所的な応力テンソル $T_{tt}$ の積分として具体化できます。熱的な双曲空間への共形写像がその理由です。

<a id="def-holo32-vacuum-ball-generator"></a>

<!-- formal-statement-start -->
> **定義（真空球の幾何学的モジュラー生成子）**  
> 平坦な $d$ 次元CFT（$d\ge2$）の真空を、時刻 $t=0$ の球 $B(\mathbf x_0,R)$ に制限する。共通のUV正則化と自然対数を用い、真空のモジュラー生成子を加法定数まで次の局所式で表す。

$$
K_{B,0}
=2\pi\int_{|\mathbf x-\mathbf x_0|<R}
\frac{R^2-|\mathbf x-\mathbf x_0|^2}{2R}
\,T_{tt}(0,\mathbf x)\,d^{d-1}x
+\text{定数}.
$$

> この式は球の真空に固有のCFT結果であり、任意の形状・励起状態のモジュラーHamiltonianの一般公式ではない。
<!-- formal-statement-end -->

**重みを座標から確かめる。** 中心を原点に移し $r=|\mathbf x|$ とします。球の因果菱形を双曲空間の時間 $\tau$ と半径 $u\ge0$ で表す変換を

$$
t=\frac{R\sinh(\tau/R)}
{\cosh u+\cosh(\tau/R)},\qquad
r=\frac{R\sinh u}
{\cosh u+\cosh(\tau/R)}
$$

と置きます。$\tau=0$ で $t=0$ かつ

$$
\frac rR=\frac{\sinh u}{1+\cosh u}
=\tanh\frac u2.
$$

この点では $\partial_\tau r=0$ なので、$\partial_\tau$ の境界時刻方向の成分を求めれば足ります。分母を $D$ とすると、$\tau=0$ で $D=1+\cosh u$、$\partial_\tau D=0$ です。したがって

$$
\left.\frac{\partial t}{\partial\tau}\right|_{\tau=0}
=\frac{1}{1+\cosh u}
=\frac{1-\tanh^2(u/2)}2
=\frac{R^2-r^2}{2R^2}.
$$

真空を双曲空間の温度 $1/(2\pi R)$ の熱状態へ送るCFTの共形写像の結果を用いると、モジュラー生成子は双曲時間並進の生成子の $2\pi R$ 倍です。ゆえに $t=0$ 上でその時間流は

$$
2\pi R\left.\partial_\tau\right|_{\tau=0}
=2\pi\frac{R^2-r^2}{2R}\,\partial_t.
$$

空間体積要素 $d^{d-1}x$ と時間並進の電荷密度 $T_{tt}$ を組み合わせると、[上の定義](#def-holo32-vacuum-ball-generator)の係数と重みが得られます。**双曲空間で真空が熱状態に写ること**は共形場理論側の非自明な入力であって、座標変換だけから熱性を証明したわけではありません。

<!-- definition-example-start: def-holo32-vacuum-ball-generator -->
**直接例**。$d=2$、$R=2$、中心 $x_0=0$ では $B=(-2,2)$、重みは $w(x)=(4-x^2)/4$ です。$w(0)=1$、$w(1)=3/4$、$w(\pm2)=0$ で、内部で非負、端点で零です。したがって

$$
K_{B,0}=2\pi\int_{-2}^{2}\frac{4-x^2}{4}T_{tt}(0,x)\,dx+\text{定数}.
$$

端点で重みが消えることは、境界で流れが止まるという幾何と一致します。
<!-- definition-example-end -->

### 第一法則は「有限差の等号」ではない

<a id="prop-holo32-ball-first-variation"></a>

<!-- formal-statement-start -->
> **命題（真空球のエントロピー第一変分）**  
> 共通の正則化の下で、$\rho_B(\lambda)$ は微分可能、参照状態 $\rho_{B,0}$ は正でその台上で可逆とする。$K_{B,0}=-\log\rho_{B,0}$ を参照状態に固定し、$\operatorname{Tr}\rho_B(\lambda)=1$ とする。このとき

$$
\delta S_B=\delta\langle K_{B,0}\rangle.
$$

> 境界の真空球を考え、[真空球の局所モジュラー生成子](#def-holo32-vacuum-ball-generator)が適用できるなら、さらに

$$
\delta S_B
=2\pi\int_{B(\mathbf x_0,R)}
\frac{R^2-|\mathbf x-\mathbf x_0|^2}{2R}
\,\delta\langle T_{tt}(0,\mathbf x)\rangle
\,d^{d-1}x.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\rho$ の固有値だけでなく固有ベクトルも動いてよいことが重要です。エントロピーの微分は行列のトレース微分を使い、正規化で定数部分を消します。これは[HOLO28の第一法則](../HOLO28/index.md#prop-holo28-first-law)の今回の入力への適用です。

<!-- proof-start -->
### 証明

$\rho_{B,0}$ が正定値であれば $\lambda=0$ のエントロピーの微分は

$$
\delta S_B
=-\operatorname{Tr}\bigl[(\delta\rho_B)(\log\rho_{B,0}+I)\bigr].
$$

正規化を微分すると $\operatorname{Tr}\delta\rho_B=0$。一方、固定した $K_{B,0}$ について

$$
\delta\langle K_{B,0}\rangle
=\operatorname{Tr}[(\delta\rho_B)K_{B,0}]
=-\operatorname{Tr}[(\delta\rho_B)\log\rho_{B,0}].
$$

二式が一致します。球の局所表示に代入し、$\lambda$ に依存しない加法定数を微分すると零になること、固定領域上で微分と積分を交換できることを用いると第二式が出ます。規制を除く極限では、有限差を取った後の微分が存在するという追加条件を課してから同じ関係を読みます。
<!-- proof-end -->

## 2. 対応するバルクの流れと極値面

真空球に対応する $t=0$ のバルク極値面は半球 $z^2+|\mathbf x-\mathbf x_0|^2=R^2$ です。$z>0$ の領域を取り、$z=\epsilon$ の共通cutoffで面の発散を正則化します。[HOLO18の半円計算](../HOLO18/index.md#prop-holo18-regulated-length)は $d=2$ の場合であり、ここでは同じ幾何を一般の $d$ 次元球へ延長します。

<a id="def-holo32-ads-ball-flow"></a>

<!-- formal-statement-start -->
> **定義（真空球に対応するAdSの流れと面）**  
> 純 $AdS_{d+1}$ のPoincaré計量で、中心 $\mathbf x_0$ と半径 $R>0$ に対し $y^i=x^i-x_0^i$、$r^2=\delta_{ij}y^iy^j$ と置く。ベクトル場 $\xi_B$、時刻零の面 $\gamma_B$、その内側のバルク領域 $\Sigma_B$ を

$$
\xi_B
=\frac{\pi}{R}\left[
(R^2-z^2-t^2-r^2)\partial_t
-2t\bigl(z\partial_z+y^i\partial_{x^i}\bigr)
\right],
$$

$$
\gamma_B=\{t=0,\ z^2+r^2=R^2,\ z>0\},
\qquad
\Sigma_B=\{t=0,\ z>0,\ z^2+r^2<R^2\}
$$

> と定める。$\Sigma_B$ の境界は規制極限で境界球 $B$ と半球 $\gamma_B$ からなる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo32-ads-ball-flow -->
**定義の確認**。$t=0$ とすると $z$・$x^i$ 方向成分は $t$ の因子で零になり、

$$
\xi_B\big|_{t=0}
=\frac{\pi}{R}(R^2-z^2-r^2)\partial_t.
$$

したがって $\gamma_B$ 上ではベクトル場全体が零です。$z\to0$ では $\xi_B^t=\pi(R^2-r^2)/R=2\pi w(r)$ となり、[境界の球重み](#def-holo32-vacuum-ball-generator)と一致します。例えば $R=2,t=0,r=1,z=\sqrt3$ では $\xi_B=0$、同じ $r=1,z=1$ では $\xi_B^t=\pi$ で、半球の内側に流れが存在します。
<!-- definition-example-end -->

ベクトル場が背景の**Killing場**（計量を保存する流れ）であることは $\mathcal L_{\xi_B}\bar g=0$ によって検査できます。例えば $t=0$ では $\xi^z=0$ でも $\partial_t\xi^z=-2\pi z/R$ です。この項を捨てると混合成分の検査が失敗します。実際、$\bar g_{tt}=-L^2/z^2$、$\bar g_{zz}=L^2/z^2$ として

$$
(\mathcal L_\xi\bar g)_{tz}
=\bar g_{zz}\partial_t\xi^z+
\bar g_{tt}\partial_z\xi^t
=\frac{L^2}{z^2}\left(-\frac{2\pi z}{R}\right)
-\frac{L^2}{z^2}\left(-\frac{2\pi z}{R}\right)=0.
$$

$tt$ と $zz$ 成分は、計量の $z^{-2}$ 依存と $\partial_t\xi^t=-2\pi t/R$、$\partial_z\xi^z=-2\pi t/R$ の項が互いに相殺して零です。例えば

$$
(\mathcal L_\xi\bar g)_{tt}
=\xi^z\partial_z(-L^2/z^2)
+2\bar g_{tt}\partial_t\xi^t
=-\frac{4\pi tL^2}{Rz^2}+\frac{4\pi tL^2}{Rz^2}=0.
$$

空間方向の $ij$ 成分でも $\partial_i\xi^j=-2\pi t\delta_i^j/R$ と $\xi^z\partial_z\bar g_{ij}$ が相殺します。$ti$ 成分は上記の $tz$ 成分と同じ二項の打ち消し、$zi$ 成分はそれぞれの偏微分が零です。面 $\gamma_B$ での流れの規格化は表面重力 $2\pi$ に対応します。この正規化を $2\pi$ でなく $1$ にしてしまうと、境界のモジュラー重みとの係数が一致しません。

### 面を動かしても一次では余分な「位置項」はない

<a id="prop-holo32-area-variation"></a>

<!-- formal-statement-start -->
> **命題（真空球の停留面の一次面積変分）**  
> 背景 $\bar g$ の滑らかな余次元2極値面 $\gamma_B$ について、同じ境界アンカー・cutoffで計量を $g(\lambda)=\bar g+\lambda h+O(\lambda^2)$ と変え、対応する停留面を滑らかに $\gamma(\lambda)$ と動かす。背景面の誘導計量を $\bar q_{AB}$、その逆行列を $\bar q^{AB}$、接ベクトルを $e_A^a$ とすると

$$
\delta\operatorname{Area}(\gamma)
=\frac12\int_{\gamma_B}
\sqrt{\bar q}\,\bar q^{AB}h_{ab}e_A^ae_B^b\,
d^{d-1}\sigma.
$$

> 古典RTがこの状態族で成立するなら、$\delta S_B=\delta\operatorname{Area}(\gamma)/(4G_N)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

面の埋め込みの変化と計量の変化を**別の微分**に分けます。面は背景で停留しているので、境界アンカーを固定した位置変化の一次項は零です。残るのは固定面上の誘導計量の変化です。

<!-- proof-start -->
### 証明

面上の局所座標を $\sigma^A$、埋め込みを $X^a(\sigma,\lambda)$ とします。誘導計量は $q_{AB}=g_{ab}(X,\lambda)\partial_AX^a\partial_BX^b$ です。$\eta^a=\delta X^a$ を置くと、その微分は

$$
\delta q_{AB}
=h_{ab}e_A^ae_B^b
+\bar g_{ab}(\partial_A\eta^a)e_B^b
+\bar g_{ab}e_A^a(\partial_B\eta^b)
+\eta^c(\partial_c\bar g_{ab})e_A^ae_B^b.
$$

行列式の微分 $\delta\sqrt q=(\sqrt{\bar q}/2)\bar q^{AB}\delta q_{AB}$ を代入します。後ろ三項を積分したものは、固定背景計量における面の形状変分です。[HOLO23の古典極値面の停留性](../HOLO23/index.md#prop-holo23-surface-shift)と同じく、背景が停留面であるため内部の一次変分が零になります。境界で $\eta^a=0$（アンカー固定）なので端点項も零です。したがって初項だけが残り、表示した公式になります。RTの等式はその適用条件を満たす場合にのみ代入します。
<!-- proof-end -->

**面積変分の手計算**。誘導計量を固定座標上で $q_{AB}(\lambda)=(1+2\lambda\alpha)\bar q_{AB}$ と変える仮想的な摂動では $\delta q_{AB}=2\alpha\bar q_{AB}$、$\bar q^{AB}\bar q_{AB}=d-1$ なので

$$
\delta\operatorname{Area}
=\frac12\int_{\gamma_B}\sqrt{\bar q}\,2\alpha(d-1)
=(d-1)\alpha\operatorname{Area}(\gamma_B).
$$

これは面積の**運動学的検算**で、任意の $\alpha$ がEinstein方程式を満たすと主張するものではありません。

## 3. 第一法則から「重力の積分拘束」へ

ここまでの二つの入力を並べると、球ごとに

$$
\delta\langle K_{B,0}\rangle
-\frac{\delta\operatorname{Area}(\gamma_B)}{4G_N}=0
$$

が成立します。ただし左辺の第一項は境界上、第二項はバルクの異なる積分です。この差を同じ断面の積分として比較する道具が、重力の**Noether電荷**です。

作用の微分から体積項（場の方程式に比例）と全微分（境界項）を分ける考え方は、[HOLO13のEinstein–Hilbert作用の境界変分](../HOLO13/index.md#def-holo13-dirichlet-action)と同じです。ここではその変分を微分形式で書きます。体積形式を $\boldsymbol\epsilon$ とし、

$$
\boldsymbol L
=\frac{\bar R-2\Lambda}{16\pi G_N}\boldsymbol\epsilon
$$

は背景上でのEinstein–Hilbert作用の密度形式です。任意の計量に対しては $\bar R$ を $R(g)$ に置き換えます。変分では

$$
\delta\boldsymbol L
=-\frac1{16\pi G_N}(G^{ab}+\Lambda g^{ab})h_{ab}\boldsymbol\epsilon
+d\boldsymbol\theta(g;h)
$$

と分解します。$\boldsymbol\theta$ は境界を通る変分の $(d)$-形式です。背景で $G_{ab}+\Lambda\bar g_{ab}=0$ とし、$\xi$ は背景Killing場に固定します。

<a id="def-holo32-linearized-einstein-residual"></a>

<!-- formal-statement-start -->
> **定義（真空Einstein方程式の線形化残差）**  
> $d\ge2$、$\Lambda=-d(d-1)/(2L^2)$、$G_{ab}(\bar g)+\Lambda\bar g_{ab}=0$ を満たす純AdS背景 $\bar g$ と、滑らかな対称摂動 $h_{ab}$ を取る。残差 $e_{ab}[h]$ を

$$
e_{ab}[h]
=\left.\frac d{d\lambda}
\bigl(G_{ab}(\bar g+\lambda h)
+\Lambda(\bar g_{ab}+\lambda h_{ab})\bigr)
\right|_{\lambda=0}
$$

> と定める。$e_{ab}[h]=0$ が、真空Einstein方程式の**線形化方程式**である。
<!-- formal-statement-end -->

実際にこの条件が何を検査するか、計算可能な形にします。$h=\bar g^{ab}h_{ab}$、$\bar\nabla$ を背景のLevi-Civita接続として、

$$
\delta R_{ab}
=\frac12\left(
\bar\nabla^c\bar\nabla_a h_{bc}
+\bar\nabla^c\bar\nabla_b h_{ac}
-\bar\nabla^c\bar\nabla_c h_{ab}
-\bar\nabla_a\bar\nabla_b h
\right),
$$

$$
\delta R=\bar g^{ab}\delta R_{ab}
+\frac d{L^2}h,\qquad
e_{ab}[h]=\delta R_{ab}
-\frac12\bar g_{ab}\delta R
+\frac d{L^2}h_{ab}.
$$

最後の係数は、$\bar R=-d(d+1)/L^2$ と $\Lambda=-d(d-1)/(2L^2)$ から

$$
-\frac12\bar R+\Lambda
=\frac{d(d+1)-d(d-1)}{2L^2}
=\frac d{L^2}
$$

と得られます。添字の上げ下げは背景計量で行います。

<!-- definition-example-start: def-holo32-linearized-einstein-residual -->
**定義の確認**。滑らかなベクトル場 $v^a$ による座標の微小な取り直しを $h_{ab}=\mathcal L_v\bar g_{ab}=\bar\nabla_av_b+\bar\nabla_bv_a$ とします。Einsteinテンソルと計量の組は座標変換に共変なので

$$
e_{ab}[\mathcal L_v\bar g]
=\mathcal L_v(G_{ab}(\bar g)+\Lambda\bar g_{ab})=0.
$$

これは背景が方程式を満たすこととテンソルの変換則を実際に使った検査です。**ゲージによる摂動は物理的な曲率変化と同一視できません。**
<!-- definition-example-end -->

### Noetherの形を、どこまで導けるか

微分形式で $\iota_\xi$ をベクトル $\xi$ による内部積、$\mathcal L_\xi$ をLie微分とします。Noether流とNoether電荷を、それぞれ $d$-形式と $(d-1)$-形式として

$$
\boldsymbol J_\xi
=\boldsymbol\theta(g;\mathcal L_\xi g)
-\iota_\xi\boldsymbol L,
\qquad
\boldsymbol J_\xi=d\boldsymbol Q_\xi+\boldsymbol C_\xi
$$

とします。$\boldsymbol C_\xi$ は場の方程式に比例する拘束項です。この電荷分解は、局所的な微分同相不変の重力作用について成り立つIyer–Wald構成の入力です。さらに

$$
\boldsymbol\chi_\xi
=\delta\boldsymbol Q_\xi-\iota_\xi\boldsymbol\theta(g;h)
$$

と置きます。$\xi$ が背景Killing場なら、シンプレクティック流の $\mathcal L_\xi\bar g$ に比例する項は零です。Noether流を線形化し、背景の方程式を用いると

$$
d\boldsymbol\chi_\xi=-\delta\boldsymbol C_\xi
=-\frac1{8\pi G_N}\xi^a e_{ab}[h]\boldsymbol\epsilon^{\,b}.
$$

ここで $\boldsymbol\epsilon^{\,b}$ は体積形式から $b$ 成分の法線収縮で得る断面上の形式、向きは「境界球を正、バルク面を負」とします。最後の係数は $\boldsymbol C_\xi$ がEinstein残差に **2倍**で結合し、作用が $1/(16\pi G_N)$ で規格化されることから生じます。

この式は**積分した第一法則だけからの恒等式ではなく、微分同相不変作用の変分に基づくNoether恒等式**です。任意の摂動が場の方程式を満たしていると先取りしてはいません。Iyer–Wald電荷を一般のLagrangianから構成する理論全体の証明は本講では再構築せず、ここでは上記の変分・拘束の対応を使用します。

<a id="thm-holo32-integrated-gravity-constraint"></a>

<!-- formal-statement-start -->
> **定理（真空球の第一法則が与える積分Einstein拘束：条件付き）**  
> 純 $AdS_{d+1}$ の滑らかな一次計量摂動 $h_{ab}$ を取る。固定された境界計量・共通cutoff・適切な漸近減衰と反項のもとで、すべての対象球 $B(\mathbf x_0,R)$ に対して次を仮定する。
>
> 1. [真空球の第一法則](#prop-holo32-ball-first-variation)が適用できる。
> 2. 古典RTが一次まで成立し、対応する半球は背景で停留している。
> 3. Einstein–Hilbert作用のNoether電荷が、境界で繰り込み済みモジュラーエネルギーの変分、半球で面積の変分を与える。

$$
\int_B\boldsymbol\chi_{\xi_B}
=\delta\langle K_{B,0}\rangle,\qquad
\int_{\gamma_B}\boldsymbol\chi_{\xi_B}
=\frac{\delta\operatorname{Area}(\gamma_B)}{4G_N}.
$$

> このとき、背景Killing場 $\xi_B$ と[線形化残差](#def-holo32-linearized-einstein-residual)に対し

$$
\int_{\Sigma_B}
\xi_B^a e_{ab}[h]\boldsymbol\epsilon^{\,b}=0
$$

> が成り立つ。**この段階で得られるのは積分拘束であり、特定の一球だけから $e_{ab}=0$ は従わない。**
<!-- formal-statement-end -->

### 証明の見取り図

境界の積分と半球の積分を、同じ $\boldsymbol\chi$ で表します。Stokesの定理で差を体積へ移し、Noether恒等式を代入します。後半で点ごとの方程式へ進むには別の議論が必要です。

<!-- proof-start -->
### 証明

cutoff付き $\Sigma_B$ でStokesの定理を適用します。境界の向きを球側が正になるよう選ぶと

$$
\int_{\partial\Sigma_B}\boldsymbol\chi_{\xi_B}
=\int_B\boldsymbol\chi_{\xi_B}
-\int_{\gamma_B}\boldsymbol\chi_{\xi_B}
=\int_{\Sigma_B}d\boldsymbol\chi_{\xi_B}.
$$

最初の二項に定理の辞書とRTを代入すると

$$
\int_B\boldsymbol\chi_{\xi_B}
-\int_{\gamma_B}\boldsymbol\chi_{\xi_B}
=\delta\langle K_{B,0}\rangle-\delta S_B=0
$$

です。右辺の最後の等号は[真空球の第一法則](#prop-holo32-ball-first-variation)です。他方、Noether恒等式を代入すると

$$
0=-\frac1{8\pi G_N}
\int_{\Sigma_B}\xi_B^a e_{ab}[h]\boldsymbol\epsilon^{\,b}.
$$

$G_N>0$ なので積分が零です。境界cutoffに伴う端面と反項は、定理の第3仮定で同じ規約に合わせてから極限を取ります。**端面を単に捨てるのではなく、繰り込み済みの等式を入力しています。**
<!-- proof-end -->

### Noether電荷と面積が一致する理由

Einstein重力では電荷の核を $\boldsymbol Q_\xi=-(16\pi G_N)^{-1}\boldsymbol\epsilon_{ab}\bar\nabla^a\xi^b$ と表せます（$\boldsymbol\epsilon_{ab}$ は面の余法線に伴う形式）。$\gamma_B$ では $\xi_B=0$ のため $\iota_\xi\boldsymbol\theta$ は消え、$\bar\nabla\xi$ の法線2平面成分は表面重力 $2\pi$ で規格化されます。従って面積に比例する電荷は

$$
\int_{\gamma_B}\boldsymbol Q_{\xi_B}
=\frac{2\pi}{8\pi G_N}\operatorname{Area}(\gamma_B)
=\frac{\operatorname{Area}(\gamma_B)}{4G_N}
$$

です。[面の一次停留性](#prop-holo32-area-variation)により、面を動かす寄与は一次で消えます。境界での $\boldsymbol\chi$ と繰り込み応力テンソルの一致には、[HOLO13の境界応力テンソルの変分構成](../HOLO13/index.md#def-holo13-brown-york)と固定境界源の条件が使われます。一般の高階微分重力では面積の代わりにWald型汎関数が必要となるので、この係数のまま拡張はできません。

## 4. 積分から局所方程式へ：何を追加で示す必要があるか

$t=0$ 断面で[AdSの流れ](#def-holo32-ads-ball-flow)を代入すると

$$
\xi_B^t=\frac{\pi}{R}(R^2-z^2-r^2)>0
\quad(z^2+r^2<R^2)
$$

です。この重みの正性は重要ですが、$e_{tt}$ は符号を変え得るため、**一つの積分が零でも被積分関数が零とは限りません**。必要なのは、すべての中心・半径の球の積分拘束から残差を復元する反転です。

<a id="prop-holo32-all-balls-linearized-einstein"></a>

<!-- formal-statement-start -->
> **命題（全真空球の拘束からの局所Einstein方程式：反転仮定付き）**  
> [積分Einstein拘束](#thm-holo32-integrated-gravity-constraint)の仮定に加え、摂動が滑らかで十分な境界減衰を持ち、各空間的超平面の**すべての中心・半径の球**に対する重み付き半球変換が対象の残差関数のクラスで単射であるとする。さらに境界のLorentz変換で得た全時間的な法線方向について同じ拘束が成立するとする。このとき

$$
e_{ab}[h]=0
$$

> がバルク領域で成立する。単射性と全方向への拡張は別に必要な幾何学的ステップであり、一つの球で積分が零になっただけで局所方程式は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

積分拘束の核は半球内の正の重みです。**球の半径と中心をすべて動かす**と、半球変換が残差の時刻成分を識別します。その後、Lorentz変換した時間方向の二次形式がすべて零なら、テンソルの各成分が零になります。

<!-- proof-start -->
### 証明（単射性を入力した後の部分）

$t=0$ に対応する断面では $\xi_B$ は時間方向なので、[積分拘束](#thm-holo32-integrated-gravity-constraint)は、非零の幾何学的体積因子を含む $e_{tt}$ の重み付き半球積分がすべての $(\mathbf x_0,R)$ で零、という条件になります。仮定した積分変換の単射性から各点で $e_{tt}=0$ を得ます。

任意の時間的な単位方向 $u$ を時間法線とするLorentz変換した断面について同じ反転を適用すると、その方向で $e_{ab}u^au^b=0$ です。ある点の局所直交基底を $(e_0,e_1,\ldots,e_d)$ とし、時間的ベクトル $u=e_0+s e_i$（$|s|<1$）を考えます。二次形式は

$$
0=e_{ab}u^au^b=e_{00}+2s e_{0i}+s^2e_{ii}.
$$

すべての $s$ で零なので、三つの係数 $e_{00},e_{0i},e_{ii}$ は零です。次に $u=e_0+s e_i+t e_j$（$s^2+t^2<1$）を取ると、既に零と分かった項以外は $2st e_{ij}$ だけなので $e_{ij}=0$ です。すべての添字で $e_{ab}=0$ が従います。

最初の**半球変換の単射性**は一般の滑らかな関数に対して自明ではなく、幾何学的積分変換の理論を用いる箇所です。ここではその一般証明を省略する代わりに、**仮定として明示**しています。実際のAdS/CFTでの反転の条件と証明は [Faulkner–Guica–Hartman–Myers–Van Raamsdonk (2014)](https://arxiv.org/abs/1312.7856) で検討されています。
<!-- proof-end -->

### 有効な積分を、まず自分の手で求める

境界のエネルギー密度の一次変化が球の中で一定、$\delta\langle T_{tt}\rangle=\varepsilon$（単位体積当たりのエネルギー）なら、[球の第一法則](#prop-holo32-ball-first-variation)で

$$
\delta S_B
=2\pi\varepsilon\int_{|\mathbf x|<R}
\frac{R^2-r^2}{2R}\,d^{d-1}x.
$$

空間次元は $d-1$ なので、球面 $S^{d-2}$ の面積を $\Omega_{d-2}$ と書けば $d^{d-1}x=\Omega_{d-2}r^{d-2}dr$ です。$R$ で積分すると

$$
\begin{aligned}
\int_B\frac{R^2-r^2}{2R}\,d^{d-1}x
&=\frac{\Omega_{d-2}}{2R}
\int_0^R(R^2-r^2)r^{d-2}\,dr\\
&=\frac{\Omega_{d-2}}{2R}
\left(\frac{R^{d+1}}{d-1}-\frac{R^{d+1}}{d+1}\right)\\
&=\frac{\Omega_{d-2}R^d}{(d-1)(d+1)}.
\end{aligned}
$$

したがって

$$
\boxed{\displaystyle
\delta S_B
=\frac{2\pi\Omega_{d-2}}{(d-1)(d+1)}\,
\varepsilon R^d}.
$$

$d=2$ では $\Omega_0=2$ なので $4\pi\varepsilon R^2/3$、$d=3$ では $\Omega_1=2\pi$ なので $\pi^2\varepsilon R^3/2$ です。これは第一法則と局所モジュラー生成子だけから出る**境界での線形応答**であり、バルク方程式そのものの証明ではありません。

### 反例：一球の積分零から点ごとの零は出ない

$d=2$、$B=(-R,R)$ で $\delta\langle T_{tt}(x)\rangle=\varepsilon x/R$ とすると、重み $(R^2-x^2)/(2R)$ は偶関数で、エネルギー密度は奇関数です。したがって

$$
\delta\langle K_{B,0}\rangle
=2\pi\frac{\varepsilon}{2R^2}
\int_{-R}^R (R^2-x^2)x\,dx=0
$$

ですが、密度は $x\ne0$ で零ではありません。失われた仮定は「すべての球を動かして調べる」ことであり、**単一の正の重みとの積が積分零でも、符号のある関数は相殺する**のが失敗機構です。

## 5. 量子補正・非線形性・適用できない場面

この講義で得られた論理の射程を、次の表で整理します。

| 問い | どこまで言えるか |
| --- | --- |
| 有限次元・正則化された状態の第一法則 | 正で微分可能な参照状態に対して一次で成立。有限差 $\Delta S=\Delta\langle K\rangle$ ではない |
| 真空球の局所モジュラーHamiltonian | 平坦境界CFT真空の球で成立。任意の形状や一般の励起状態へは移せない |
| 面積の変分 | 停留面と固定アンカーに対する運動学的公式。任意の面や変動する境界源では端点項が残り得る |
| エントロピー変分を古典重力の拘束へ接続する条件 | RT・繰り込み辞書・Noether恒等式を必要とする |
| 局所的線形化Einstein方程式 | 全球・全方向の条件と積分変換の単射性を要する。非線形の全解空間は導いていない |
| バルク量子物質の影響 | [FLMのバルクエントロピー項](../HOLO23/index.md#def-holo23-flm)を含める必要があり、真空残差 $e_{ab}=0$ のまま一般化できない |

例えば $\rho_B(\lambda)=\rho_{B,0}+\lambda\delta\rho_B+O(\lambda^2)$ において、[相対エントロピーのモジュラー表示](../HOLO28/index.md#prop-holo28-relative-modular)より

$$
S(\rho_B(\lambda)\Vert\rho_{B,0})
=\Delta\langle K_{B,0}\rangle-\Delta S_B
$$

です。第一変分が消えることは $O(\lambda)$ の情報であり、相対エントロピーの $O(\lambda^2)$ の非負性や重力側の二次拘束を**同じ等号のまま証明したことにはなりません**。また[HOLO31の離散テンソル網模型](../HOLO31/index.md#thm-holo31-two-vertex-recovery)の再構成・cut恒等式だけから、連続時空の微分方程式は出ません。

## 6. 演習と詳細解答

以下では特記しない限り自然対数を用い、微分は $\lambda=0$ で評価します。すべての積分は指定した固定領域上で行い、必要な微分交換ができるとします。

### Level A：一次変分と球の係数を確認する

<a id="ex-holo32-a01"></a>

### 演習 HOLO32-A01：二準位のエントロピー第一法則

$0<p<1$、$\rho(\lambda)=\operatorname{diag}(p+\lambda a,1-p-\lambda a)$ とし、$|\lambda|$ を小さく取る。参照状態 $\rho(0)$ のモジュラーHamiltonianを求め、$\delta S$ と $\delta\langle K_0\rangle$ を独立に計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**。参照状態の固有値はともに正なので $\log$ が定義でき、

$$
K_0=\operatorname{diag}(-\log p,-\log(1-p)).
$$

エントロピーは

$$
S(\lambda)
=-(p+\lambda a)\log(p+\lambda a)
-(1-p-\lambda a)\log(1-p-\lambda a).
$$

$x\log x$ の微分が $\log x+1$ であることを使うと

$$
\delta S=-a(\log p+1)+a(\log(1-p)+1)
=a\log\frac{1-p}{p}.
$$

一方、$K_0$ は参照状態に固定するので

$$
\delta\langle K_0\rangle
=\operatorname{Tr}[\operatorname{diag}(a,-a)K_0]
=-a\log p+a\log(1-p)
=a\log\frac{1-p}{p}.
$$

二つは一致します。$K(\lambda)$ を微分してしまう計算はこの設問の右辺ではありません。
<!-- solution-end -->

<a id="ex-holo32-a02"></a>

### 演習 HOLO32-A02：共形時間と球の重み

$R=2$、$r=1$ の境界点に対して $r/R=\tanh(u/2)$ から $\cosh u$ を求め、$dt/d\tau|_0$ とモジュラー流の時刻係数を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答**。$\tanh(u/2)=1/2$ なので、倍角公式から

$$
\cosh u=\frac{1+\tanh^2(u/2)}{1-\tanh^2(u/2)}
=\frac{1+1/4}{1-1/4}=\frac53.
$$

よって

$$
\left.\frac{dt}{d\tau}\right|_0
=\frac1{1+\cosh u}=\frac{3}{8}.
$$

モジュラー流は $2\pi R\partial_\tau$ ですから、時刻係数は $2\pi R(3/8)=3\pi/2$。直接、$2\pi(R^2-r^2)/(2R)=2\pi(3/4)=3\pi/2$ と一致します。
<!-- solution-end -->

<a id="ex-holo32-a03"></a>

### 演習 HOLO32-A03：二次元境界の一様なエネルギー変化

$d=2$、$B=(-R,R)$、$\delta\langle T_{tt}\rangle=\varepsilon$ を仮定し、球の第一法則から $\delta S_B$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**。積分の上端・下端は固定し、

$$
\begin{aligned}
\delta S_B
&=2\pi\varepsilon\int_{-R}^{R}\frac{R^2-x^2}{2R}\,dx\\
&=\frac{\pi\varepsilon}{R}
\left[R^2x-\frac{x^3}{3}\right]_{-R}^{R}\\
&=\frac{\pi\varepsilon}{R}\left(2R^3-\frac{2R^3}{3}\right)
=\frac{4\pi}{3}\varepsilon R^2.
\end{aligned}
$$

半径依存は $R^2$ であり、面積則の一般的な有限差を求めたのではありません。
<!-- solution-end -->

<a id="ex-holo32-a04"></a>

### 演習 HOLO32-A04：半球上での流れの消失

$\mathbf x_0=0$ の $\xi_B$ について、$t=0,z^2+r^2=R^2$ で全成分が消えることと、$z\to0$ の境界値を検査せよ。

- Level: A

<!-- solution-start -->
**詳細解答**。定義より $\xi^z=-2\pi tz/R$、$\xi^i=-2\pi t x^i/R$ なので、$t=0$ でいずれも零。残る

$$
\xi^t=\frac{\pi}{R}(R^2-z^2-r^2)
$$

も半球上では零です。境界で $z\to0$ とすれば $\xi^t=\pi(R^2-r^2)/R$、したがって $2\pi(R^2-r^2)/(2R)$ に等しく、[球のモジュラー重み](#def-holo32-vacuum-ball-generator)の2π倍になっています。
<!-- solution-end -->

<a id="ex-holo32-a05"></a>

### 演習 HOLO32-A05：誘導計量と面積変分

余次元2の面の次元を $d-1$ とする。固定埋め込み上の誘導計量が $q_{AB}(\lambda)=(1+2\lambda\alpha)\bar q_{AB}$ のとき、面積の一次変分を求めよ。またこの結果だけで場の方程式を判定できない理由を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答**。行列式は $d-1$ 次元なので

$$
\det q(\lambda)=(1+2\lambda\alpha)^{d-1}\det\bar q.
$$

平方根を微分し、

$$
\left.\partial_\lambda\sqrt{\det q(\lambda)}\right|_0
=\frac{d-1}{2}(2\alpha)\sqrt{\det\bar q}
=(d-1)\alpha\sqrt{\det\bar q}.
$$

積分すれば $\delta\operatorname{Area}=(d-1)\alpha\operatorname{Area}(\bar q)$ です。これは行列式の微分のみを使う関係です。$h_{ab}$ が[線形化残差の方程式](#def-holo32-linearized-einstein-residual)を満たすかは別途、共変微分を含む $e_{ab}[h]$ で検査する必要があります。
<!-- solution-end -->

### Level B：局所核・相対エントロピー・拘束の論理をつなぐ

<a id="ex-holo32-b01"></a>

### 演習 HOLO32-B01：非一様な境界エネルギーと球核

$d=2$、$B=(-R,R)$ で、$\delta\langle T_{tt}(0,x)\rangle=\varepsilon_0+\varepsilon_2 x^2/R^2$ とする。$\delta S_B$ を計算し、$\varepsilon_2$ の項が一様部分と異なる係数になることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答**。[球の局所モジュラー生成子](#def-holo32-vacuum-ball-generator)を使用します。まず一様部分の重み積分は

$$
I_0=\int_{-R}^R\frac{R^2-x^2}{2R}\,dx=\frac{2R^2}{3}.
$$

$x^2/R^2$ 部分は

$$
\begin{aligned}
I_2
&=\int_{-R}^R\frac{(R^2-x^2)x^2}{2R^3}\,dx\\
&=\frac1{2R^3}\left(
R^2\frac{2R^3}{3}-\frac{2R^5}{5}\right)
=R^2\left(\frac13-\frac15\right)
=\frac{2R^2}{15}.
\end{aligned}
$$

よって

$$
\delta S_B=2\pi(\varepsilon_0 I_0+\varepsilon_2 I_2)
=4\pi R^2\left(\frac{\varepsilon_0}{3}+\frac{\varepsilon_2}{15}\right).
$$

中心に近い値と端点付近の値は同じ重みで平均されません。この違いが局所核に含まれる情報です。
<!-- solution-end -->

<a id="ex-holo32-b02"></a>

### 演習 HOLO32-B02：相対エントロピーは二次から始まる

演習A01の $\rho(\lambda)$ を用い、相対エントロピー $D(\rho(\lambda)\Vert\rho(0))$ を $\lambda$ の二次まで展開せよ。第一法則の適用範囲と比較せよ。

- Level: B

<!-- solution-start -->
**詳細解答**。対角行列なので定義から

$$
D(\lambda)
=(p+\lambda a)\log\frac{p+\lambda a}{p}
+(1-p-\lambda a)\log\frac{1-p-\lambda a}{1-p}.
$$

$\log(1+y)=y-y^2/2+O(y^3)$ を $y=\lambda a/p$ と $y=-\lambda a/(1-p)$ に用います。第一項は

$$
(p+\lambda a)\left(\frac{\lambda a}{p}
-\frac{\lambda^2a^2}{2p^2}\right)
=\lambda a+\frac{\lambda^2a^2}{2p}+O(\lambda^3).
$$

第二項は

$$
(1-p-\lambda a)\left(-\frac{\lambda a}{1-p}
-\frac{\lambda^2a^2}{2(1-p)^2}\right)
=-\lambda a+\frac{\lambda^2a^2}{2(1-p)}+O(\lambda^3).
$$

一次が相殺され、

$$
D(\lambda)
=\frac{\lambda^2a^2}{2}
\left(\frac1p+\frac1{1-p}\right)+O(\lambda^3).
$$

$0<p<1$ なら二次係数は非負です。[第一法則](#prop-holo32-ball-first-variation)は一次係数の消失を述べるだけで、この正の二次係数を零にはしません。
<!-- solution-end -->

<a id="ex-holo32-b03"></a>

### 演習 HOLO32-B03：Lorentz方向から対称テンソルを復元する

局所Lorentz直交基底の対称二階テンソル $e_{ab}$ に対して、すべての $|s|<1$ で $e(e_0+s e_i,e_0+s e_i)=0$ が成立し、さらに $s^2+t^2<1$ のすべての $s,t$ と $i\ne j$ で $e(e_0+s e_i+t e_j,e_0+s e_i+t e_j)=0$ が成立するとする。$e_{ab}=0$ を示せ。

- Level: B

<!-- solution-start -->
**詳細解答**。まず $e(e_0+s e_i,e_0+s e_i)$ を双線形性で展開すると

$$
e_{00}+s e_{0i}+s e_{i0}+s^2e_{ii}
=e_{00}+2s e_{0i}+s^2e_{ii}.
$$

開区間上ですべて零の多項式なので係数が零です。ゆえに $e_{00}=e_{0i}=e_{ii}=0$ が各 $i$ について成立します。次に二方向を入れると

$$
\begin{aligned}
0&=e_{00}+2s e_{0i}+2t e_{0j}
+s^2e_{ii}+t^2e_{jj}+2st e_{ij}\\
&=2st e_{ij}.
\end{aligned}
$$

例えば $s=t=1/4$ は $s^2+t^2<1$ を満たし積 $st\ne0$ なので $e_{ij}=0$ です。すべての成分が消えます。ただしこれを積分拘束から使うには、先に**各法線方向の点ごとの二次形式の零**を積分変換の反転で得ている必要があります。
<!-- solution-end -->

<a id="ex-holo32-b04"></a>

### 演習 HOLO32-B04：Stokesの等式と、その限界

バルク断面 $\Sigma_B$ の向きが $\partial\Sigma_B=B-\gamma_B$ で、$d\boldsymbol\chi_\xi=-(8\pi G_N)^{-1}\xi^ae_{ab}\boldsymbol\epsilon^{\,b}$ とする。両境界の積分に対応する境界理論の量を示し、第一法則から何が従うか導け。さらに、なぜ一球だけでは $e_{ab}=0$ と言えないか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**。[積分拘束の定理](#thm-holo32-integrated-gravity-constraint)の仮定の下で、境界球の積分は $\delta\langle K_{B,0}\rangle$、半球の積分は $\delta\operatorname{Area}/(4G_N)=\delta S_B$ です。Stokesの定理とNoether恒等式を続けて用いると

$$
\begin{aligned}
\delta\langle K_{B,0}\rangle-\delta S_B
&=\int_B\boldsymbol\chi-\int_{\gamma_B}\boldsymbol\chi\\
&=\int_{\Sigma_B}d\boldsymbol\chi\\
&=-\frac1{8\pi G_N}
\int_{\Sigma_B}\xi^ae_{ab}\boldsymbol\epsilon^{\,b}.
\end{aligned}
$$

[第一法則](#prop-holo32-ball-first-variation)により左辺は零です。$G_N>0$ なので最後の積分が零と分かります。一球の積分では、残差に正負の領域があれば相殺するため点ごとの零は導けません。全中心・半径と反転可能な関数クラスという条件が追加で要ります。
<!-- solution-end -->

### Level C：情報量、幾何、方程式の段階を統合する

<a id="ex-holo32-c01"></a>

### 演習 HOLO32-C01：球領域の線形応答から何が結論できるか

$d=2$ の平坦境界CFTの真空からの滑らかな微小摂動を考える。球は区間 $B=(-R,R)$（$R>0$）で、$\delta\langle T_{tt}\rangle=\varepsilon$ は区間内で一定とする。重力双対は古典 $AdS_3$ の一次摂動であると仮定する。

1. モジュラー生成子の重みから $\delta\langle K_{B,0}\rangle$ を積分して求めよ。
2. $AdS_3$ の $t=0$ の半円と対応する $\xi_B$ を書き、面上で $\xi_B=0$ を確かめよ。
3. 固定アンカーの停留面にRTが成り立つとき、$\delta\operatorname{Length}(\gamma_B)$ と $\varepsilon$ の関係を求めよ。
4. Einstein–HilbertのNoether辞書を追加仮定し、線形化残差の積分拘束を導け。
5. この一球で $e_{ab}=0$ が証明できたか、またバルク物質の $O(G_N^0)$ 寄与を入れた場合にどの入力を変える必要があるか、理由を記せ。

- Level: C

<!-- solution-start -->
**詳細解答**。

**1. 境界での積分。** $d=2$ では空間変数は $x$ 一つであり、[真空球の公式](#def-holo32-vacuum-ball-generator)を使うと

$$
\begin{aligned}
\delta\langle K_{B,0}\rangle
&=2\pi\varepsilon\int_{-R}^R\frac{R^2-x^2}{2R}\,dx\\
&=\frac{\pi\varepsilon}{R}
\left(2R^3-\frac{2R^3}{3}\right)
=\frac{4\pi}{3}\varepsilon R^2.
\end{aligned}
$$

**2. 半円と流れ。** 境界の端点は $x=\pm R$ で、純AdSの対応する半円は

$$
\gamma_B:\quad t=0,\quad z^2+x^2=R^2,\quad z>0.
$$

[AdSの球流れ](#def-holo32-ads-ball-flow)を $d=2$ に書き直すと

$$
\xi_B=\frac{\pi}{R}
\left[(R^2-z^2-t^2-x^2)\partial_t
-2t(z\partial_z+x\partial_x)\right].
$$

$t=0$ で後半は消え、半円上で前半の係数も $R^2-z^2-x^2=0$ なので $\xi_B=0$ です。

**3. 幾何学的応答。** [第一法則](#prop-holo32-ball-first-variation)と古典RTを同じ固定cutoffで適用すれば、

$$
\frac{\delta\operatorname{Length}(\gamma_B)}{4G_N}
=\delta S_B
=\delta\langle K_{B,0}\rangle
=\frac{4\pi}{3}\varepsilon R^2.
$$

両辺に $4G_N$ を掛けて

$$
\boxed{\delta\operatorname{Length}(\gamma_B)
=\frac{16\pi G_N}{3}\varepsilon R^2}
$$

です。これは実際の計量摂動 $h$ を解かずに、RTを**入力して**得た必要条件です。計量の一次変分によりこの長さが実現されるかは別問題です。

**4. Noether拘束。** [積分拘束の定理](#thm-holo32-integrated-gravity-constraint)の辞書とStokesの定理から

$$
0=\delta\langle K_{B,0}\rangle
-\frac{\delta\operatorname{Length}(\gamma_B)}{4G_N}
=-\frac1{8\pi G_N}
\int_{\Sigma_B}\xi_B^a e_{ab}[h]\boldsymbol\epsilon^{\,b}.
$$

従って $\int_{\Sigma_B}\xi_B^a e_{ab}[h]\boldsymbol\epsilon^{\,b}=0$ です。ここで $\Sigma_B$ は $t=0,z>0,z^2+x^2<R^2$ の半円板です。

**5. 射程。** この球一つの積分が零でも残差の正負の相殺は可能なので $e_{ab}=0$ は結論できません。[全真空球の命題](#prop-holo32-all-balls-linearized-einstein)には中心・半径を動かした族と適切な単射性、Lorentz方向の情報が必要です。また[HOLO23のFLM補正](../HOLO23/index.md#def-holo23-flm)が同次数で寄与すれば $\delta S_B$ にバルク領域のエントロピー変分等が加わります。面積だけを右辺とする手順3をそのまま使えず、物質源つきの線形化方程式には追加の辞書が必要です。
<!-- solution-end -->

## 7. まとめ：第一法則から「線形」重力まで

出発点は[真空球の局所モジュラー生成子](#def-holo32-vacuum-ball-generator)と[第一変分](#prop-holo32-ball-first-variation)です。真空球の幾何が決める重みをバルクのKilling場へ延長し、[RT面の面積変分](#prop-holo32-area-variation)とNoether電荷をつなぐと、[積分Einstein拘束](#thm-holo32-integrated-gravity-constraint)を得ます。さらにすべての球と方向、積分変換の単射性を使ったときだけ、[線形化Einstein方程式](#prop-holo32-all-balls-linearized-einstein)へ進めます。

この導出はAdS/CFTの真空近傍という限定された舞台で、境界の量子情報とバルクの重力応答を結ぶ強い整合性条件を与えます。ただし**一般の非線形重力、任意のCFT、ブラックホール内部、有限 $N$ のすべての状態について成立を証明したわけではありません**。次講HOLO33では、何が計算・導出され、何が物理的に提案され、どこに未解決問題が残るかを横断して整理します。

**文献**：T. Faulkner, M. Guica, T. Hartman, R. C. Myers, M. Van Raamsdonk, [*Gravitation from Entanglement in Holographic CFTs*](https://arxiv.org/abs/1312.7856) (2014)。真空球の共形写像については H. Casini, M. Huerta, R. C. Myers, [*Towards a derivation of holographic entanglement entropy*](https://arxiv.org/abs/1102.0440) (2011)。
