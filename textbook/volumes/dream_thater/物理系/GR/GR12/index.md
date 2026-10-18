# GR12 Einstein場の方程式と保存則

<!-- definition-example-audit: strict -->

[GR7のEinsteinテンソル](../GR7/index.md#def-gr7-einstein-tensor)は、どんな滑らかなLorentz計量から作っても共変発散が零になります。一方、[GR9のHilbert応力テンソル](../GR9/index.md#def-gr9-hilbert-stress)は物質作用を計量で変分して得られます。幾何と物質は、それぞれ用意できました。しかし両者を等号で結ぶには、**作用全体を一緒に変分する**という力学上の選択が必要です。等価原理だけから結合係数も宇宙項も決まるわけではありません。

[GR10の重力作用の変分](../GR10/index.md#thm-gr10-eh-variation)は内部の計量変化に対する係数を与え、[GR11のGHY項](../GR11/index.md#thm-gr11-dirichlet-variation)は適切な非光的境界で法線微分の変分を相殺しました。今度は物質作用を加え、**幾何と物質を結ぶ計量の方程式**を導きます。続いて、右辺の共変発散が零になるのはなぜか、物質自身の運動方程式とはどう関係するか、局所と大域の「保存」がどこで異なるかを確かめます。

以下、$(M,g)$ は滑らかで向き・時間向きのある4次元Lorentz多様体です。符号は $(-,+,+,+)$、接続 $\nabla$ は[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)とします。座標には $x^0=ct$ を用い、添字は $0,1,2,3$ を走ります。

$G>0$ はNewtonの重力定数、$c>0$ は光速、$\Lambda\in\mathbb R$ は時空座標に依存しない定数です。重力作用に現れる $\mathcal R$ は[スカラー曲率](../GR6/index.md#def-gr6-ricci-scalar)、$G_{\mu\nu}$ は[Einsteinテンソル](../GR7/index.md#def-gr7-einstein-tensor)を指します。テンソル $G_{\mu\nu}$ と重力定数 $G$ は別の量です。

計量と物質場は必要な次数だけ滑らかとし、応力テンソルは少なくとも $C^1$ 級とします。領域内部にコンパクトな台を持つ変分で方程式を導出します。境界付き作用を扱う際は、GR11と同じく滑らかで角のない非光的境界を持ち、境界の誘導計量を固定する場合に限ります。

## 1. 二つの作用を何について変分するか

場の方程式の未知量は計量 $g$ と物質場 $\psi$ です。この二種類を同時に無秩序に動かすと、どちらの運動方程式を調べているのか分からなくなります。まず物質変数 $\psi$ を固定して**逆計量** $g^{\mu\nu}$ だけを変分し、続いて物質場を変分します。

[GR9の局所物質作用](../GR9/index.md#def-gr9-matter-action)では、$\mathcal L_m$ はエネルギー密度の次元を持ち、$d^4x$ に $dx^0=c\,dt$ を含めるため係数 $1/c$ が付いていました。[GR10のEinstein–Hilbert作用](../GR10/index.md#def-gr10-eh-action)では係数が $c^3/(16\pi G)$ です。この違いが結合係数の $c^4$ を生みます。

<a id="def-gr12-coupled-action"></a>

<!-- formal-statement-start -->
> **定義（重力と物質の全作用）**  
> 滑らかな4次元Lorentz領域 $U$、定数 $G>0,c>0,\Lambda\in\mathbb R$、計量 $g$ と物質場 $\psi$ に対し、非光的で角のない境界 $\Sigma$ では[GR11のGHY作用](../GR11/index.md#def-gr11-ghy-action)を採用して、全作用を次で定める。境界がない場合は $S_{\mathrm{GHY}}=0$ と読む。

$$
\begin{aligned}
S_{\mathrm{tot}}[g,\psi]
&=S_{\mathrm{EH}}[g]+S_{\mathrm{GHY}}[g]+S_m[g,\psi],\\
S_{\mathrm{EH}}[g]
&=\frac{c^3}{16\pi G}\int_U(\mathcal R-2\Lambda)\sqrt{-g}\,d^4x,\\
S_m[g,\psi]
&=\frac1c\int_U\mathcal L_m(g,\psi,\nabla\psi)\sqrt{-g}\,d^4x.
\end{aligned}
$$

> $S_{\mathrm{GHY}}$ にはGR11の外向き法線と誘導計量を用いる。計量変分では選んだ物質場の独立変数を固定し、物質変分では計量を固定する。境界を含む変分原理では、誘導計量と物質場の適切な境界データを固定するものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr12-coupled-action -->
**定義の確認**：領域 $U=[0,L]\times\mathbb T^3$ と平坦計量を用い、宇宙項と物質作用を零に設定します。

$$
ds^2=-(dx^0)^2+\sum_{i=1}^{3}(dx^i)^2,\qquad
\Lambda=0,\qquad S_m=0.
$$

座標基底 $\partial_\mu$ で $g_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ と表されます。各時刻面 $x^0=0,L$ の接基底は $\partial_1,\partial_2,\partial_3$ で、[GR11の境界の定義](../GR11/index.md#def-gr11-boundary-geometry)を直接確認すると、

$$
g(\pm\partial_0,\pm\partial_0)=-1,\qquad
\gamma_{ij}=g(\partial_i,\partial_j)=\delta_{ij},\qquad
\varepsilon=-1.
$$

つまり両面は非光的で、外向き単位法線はそれぞれ $-\partial_0,+\partial_0$ です。計量成分が定数なので、[Levi-Civita接続の座標式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の全偏微分が零となり $\Gamma^\rho_{\mu\nu}=0$ です。[曲率の座標式](../GR6/index.md#prop-gr6-coordinate-curvature)でも曲率は零です。さらに、各面で $n_\nu$ は定数だから、[第二基本形式の定義](../GR11/index.md#def-gr11-extrinsic-curvature)に代入して

$$
K_{ij}=e_i^\mu e_j^\nu\nabla_\mu n_\nu
=e_i^\mu e_j^\nu(\partial_\mu n_\nu-\Gamma^\rho_{\mu\nu}n_\rho)=0,
\qquad K=\gamma^{ij}K_{ij}=0
$$

と分かります。境界成分はこの二面だけで、トーラスの周期方向に新たな境界はありません。従って各作用を別々に計算すると、

$$
S_{\mathrm{EH}}=0,\qquad
S_{\mathrm{GHY}}=0,\qquad
S_{\mathrm{tot}}=0.
$$

ただし作用の値が零であることだけでは停留性を意味しません。以下では任意の変分に対する一次変化を計算します。
<!-- definition-example-end -->

物質変分で用いる[計量変分によるHilbert応力テンソル](../GR9/index.md#def-gr9-hilbert-stress)は、$\psi$ を固定した $h^{\mu\nu}:=\delta g^{\mu\nu}$ に対して

$$
\left.\delta_g S_m\right|_\psi
=-\frac1{2c}\int_U\sqrt{-g}\,T_{\mu\nu}h^{\mu\nu}\,d^4x
$$

です。重力作用の変分の符号は正、物質作用の係数は負です。$h^{\mu\nu}$ は対称成分10個について、十分小さい範囲で任意に選べます。

## 2. 作用の停留条件から場の方程式へ

$S_{\mathrm{tot}}$ の一次変化を零にするとき、物質場についての独立な運動方程式も課しますが、**計量方程式の導出そのもの**では物質変数を固定します。境界がある場合は[GR11のDirichlet型変分定理](../GR11/index.md#thm-gr11-dirichlet-variation)により法線微分の境界項が消え、内部では[GR10の変分公式](../GR10/index.md#thm-gr10-eh-variation)が適用できます。

<a id="thm-gr12-einstein-equation"></a>

<!-- formal-statement-start -->
> **定理（Einstein場の方程式）**  
> 上記の全作用で $\Lambda$ を定数とし、滑らかな計量と物質場の変分を考える。計量の内部コンパクト台変分を任意に許し、物質変数を固定した $\delta_gS_{\mathrm{tot}}=0$ が成り立つなら、各点で

$$
\boxed{G_{\mu\nu}+\Lambda g_{\mu\nu}
=\kappa T_{\mu\nu},\qquad
\kappa:=\frac{8\pi G}{c^4}}
$$

> が成り立つ。逆に同式が成り立てば、すべての内部コンパクト台の計量変分に対して $\delta_gS_{\mathrm{tot}}=0$ である。非光的で角のない境界では、GR11の仮定に加え誘導計量を固定すれば同じ結論を境界付き変分へ拡張できる。物質場自身のEuler–Lagrange方程式は、別途 $\delta_\psi S_{\mathrm{tot}}=0$ から得る。
<!-- formal-statement-end -->

### 証明の見取り図

重力と物質の変分を同じ $h^{\mu\nu}$ の係数として並べ、定数因子を比較します。任意の対称変分に対して積分が零なら、係数テンソルの各成分が零になるという局所的な論法を最後に使います。

<!-- proof-start -->
### 証明

$C=c^3/(16\pi G)$ と書きます。境界のない場合、または内部に台を持つ場合は発散項の積分が消えます。境界の誘導計量を固定して扱う場合も、[GHY項を加えたDirichlet型計量変分](../GR11/index.md#thm-gr11-dirichlet-variation)から境界寄与は消えます。よって

$$
\begin{aligned}
\delta_g S_{\mathrm{tot}}
&=\delta_g(S_{\mathrm{EH}}+S_{\mathrm{GHY}})+\delta_g S_m\\
&=C\int_U\sqrt{-g}\,(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}\,d^4x\\
&\quad-\frac1{2c}\int_U\sqrt{-g}\,T_{\mu\nu}h^{\mu\nu}\,d^4x\\
&=C\int_U\sqrt{-g}
\left(G_{\mu\nu}+\Lambda g_{\mu\nu}
-\frac1{2cC}T_{\mu\nu}\right)h^{\mu\nu}\,d^4x.
\end{aligned}
$$

係数を省略せず計算すると

$$
\frac1{2cC}
=\frac1{2c}\frac{16\pi G}{c^3}
=\frac{8\pi G}{c^4}=\kappa.
$$

括弧内を $E_{\mu\nu}$ とします。$E_{\mu\nu}$ は対称で連続です。もし点 $p$ で $E_{\alpha\beta}(p)\ne0$ なら、そこで一つの対称成分に符号を合わせた非負の滑らかなコンパクト台関数を掛けて $h^{\mu\nu}$ に選べます。十分小さな座標近傍では積分の符号が変わらず、$\int\sqrt{-g}E_{\mu\nu}h^{\mu\nu}\ne0$ となって停留性と矛盾します。従って全成分が零です。

逆向きは $E_{\mu\nu}=0$ を変分積分へ代入すれば零です。これは内部の計量変分に関する主張であり、独立の物質変分の方程式まで自動的に証明したものではありません。$\square$
<!-- proof-end -->

**結合係数の次元の確認。** $T_{\mu\nu}$ は直交枠ではエネルギー密度 $\mathrm{J}/\mathrm{m}^3$ の次元を持ちます。$[G]=\mathrm{m}^3/(\mathrm{kg\,s}^2)$、$[c]=\mathrm{m}/\mathrm{s}$、$\mathrm{J}=\mathrm{kg\,m}^2/\mathrm{s}^2$ なので、

$$
[\kappa]
=\frac{\mathrm{m}^3/(\mathrm{kg\,s}^2)}
{\mathrm{m}^4/\mathrm{s}^4}
=\frac{\mathrm{s}^2}{\mathrm{kg\,m}}
=\frac{\mathrm{m}}{\mathrm J},
\qquad
[\kappa T]=\mathrm{m}^{-2}.
$$

$[\mathcal R]=[\Lambda]=\mathrm{m}^{-2}$ と一致します。この次元検査は係数の形を確認できますが、数値 $8\pi$ は作用の変分によって初めて定まります。さらにこの理論が経験的な重力定数と一致することは、次のGR13で扱うNewton極限の照合が必要です。

## 3. 共変発散が零になる理由を分けて考える

[GR7の縮約Bianchi恒等式](../GR7/index.md#thm-gr7-einstein-divergence-free)は、計量の曲率だけで成立する**幾何学的恒等式**です。一方、$\nabla^\mu T_{\mu\nu}=0$ はどんな対称テンソルにも成り立つ恒等式ではありません。場の方程式の解に対する整合条件、または微分同相不変な物質作用と物質運動方程式の帰結として得られます。

<a id="prop-gr12-conservation-consistency"></a>

<!-- formal-statement-start -->
> **命題（場の方程式と共変保存の整合条件）**  
> 滑らかな4次元Lorentz計量 $g$、定数 $\Lambda$、$\kappa=8\pi G/c^4\ne0$ および $C^1$ 級の対称応力テンソル $T$ がEinstein場の方程式を満たすなら、

$$
\boxed{\nabla^\mu T_{\mu\nu}=0}
$$

> が成り立つ。これは時空の各点での局所的な共変保存則であって、任意の時空に時間並進に対応する大域的な保存エネルギーがあることを主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

方程式の両辺を共変微分して一つの添字を縮約します。消える項は二つあり、それぞれ別の理由を持ちます。

<!-- proof-start -->
### 証明

方程式の両辺の $\nabla^\mu$ を取ると、

$$
\kappa\nabla^\mu T_{\mu\nu}
=\nabla^\mu G_{\mu\nu}+\nabla^\mu(\Lambda g_{\mu\nu}).
$$

第一項は[GR7の共変発散零定理](../GR7/index.md#thm-gr7-einstein-divergence-free)で零です。第二項は、$\Lambda$ が**定数**であることと、[Levi-Civita接続の計量両立性](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)により

$$
\begin{aligned}
\nabla^\mu(\Lambda g_{\mu\nu})
&=g^{\mu\alpha}(\partial_\alpha\Lambda)g_{\mu\nu}
+\Lambda g^{\mu\alpha}\nabla_\alpha g_{\mu\nu}\\
&=0+0=0.
\end{aligned}
$$

$\kappa>0$ なので割れば主張を得ます。$\square$
<!-- proof-end -->

**仮定を落としたらどうなるか。** 同じテンソル方程式へ $\Lambda(x)$ を形式的に代入しただけなら、[GR7の宇宙項の発散](../GR7/index.md#prop-gr7-cosmological-divergence)から

$$
\kappa\nabla^\mu T_{\mu\nu}=\partial_\nu\Lambda
$$

となります。従って非定数の $\Lambda(x)$ のまま物質が個別に保存すると無条件には言えません。ただしこの式は、**定数 $\Lambda$ を仮定した前節の変分原理の帰結ではありません**。$\Lambda$ を動的場にする理論なら、その場の作用とエネルギー交換を新たに定める必要があります。

### 3.1 物質側からの独立な説明

一般座標変換に対して物質作用が不変であることにも、局所保存則の起源があります。ただし物質場が**自身の運動方程式を満たす**ことが必要です。場を単に固定して計量だけを変分する計算と混同しません。

<a id="prop-gr12-matter-diffeomorphism"></a>

<!-- formal-statement-start -->
> **命題（物質作用の微分同相不変性と局所保存）**  
> 4次元Lorentz領域上の物質作用 $S_m[g,\psi]$ が境界に台を持たない滑らかな微小微分同相の作用で不変で、計量変分に対するHilbert応力テンソル $T_{\mu\nu}$ が定義できるとする。物質場 $\psi$ がそのEuler–Lagrange方程式を満たし、計量以外に固定された非共変な外部背景を含まなければ、

$$
\nabla^\mu T_{\mu\nu}=0
$$

> が成り立つ。この結論の導出にはEinstein場の方程式を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

局所的に座標を少し動かすベクトル場を $\xi$ とし、計量も物質場も同時に動かします。物質場の方程式を使うと場自身の変分寄与が消え、計量の変分だけから発散が現れます。

<!-- proof-start -->
### 証明

$\xi^\mu$ を領域内部にコンパクトな台を持つ任意の滑らかなベクトル場とします。その流れで全場を引き戻す微小変換について、まず計量の座標成分を一次まで展開します。引き戻しの変分は

$$
\delta_\xi g_{\mu\nu}
=\xi^\rho\partial_\rho g_{\mu\nu}
+g_{\rho\nu}\partial_\mu\xi^\rho
+g_{\mu\rho}\partial_\nu\xi^\rho
$$

です。[Levi-Civita接続の座標式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)により
$2g_{\lambda\rho}\Gamma^\lambda_{\mu\nu}
=\partial_\mu g_{\nu\rho}+\partial_\nu g_{\mu\rho}-\partial_\rho g_{\mu\nu}$
なので、

$$
\begin{aligned}
\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu
={}&g_{\nu\rho}\partial_\mu\xi^\rho
+g_{\mu\rho}\partial_\nu\xi^\rho\\
&+\xi^\rho(\partial_\mu g_{\nu\rho}
+\partial_\nu g_{\mu\rho}
-2g_{\lambda\rho}\Gamma^\lambda_{\mu\nu})\\
={}&\delta_\xi g_{\mu\nu}.
\end{aligned}
$$

このように $\delta_\xi g_{\mu\nu}=\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu$ を導けます。これは逆計量の変分とは**逆符号**で、

$$
\delta_\xi g^{\mu\nu}
=-g^{\mu\alpha}g^{\nu\beta}\delta_\xi g_{\alpha\beta}
=-(\nabla^\mu\xi^\nu+\nabla^\nu\xi^\mu)
$$

です。この等号は[計量と逆計量の変分](../GR10/index.md#prop-gr10-inverse-identity)を計量の両添字に適用して得ました。

物質作用の一般変分には計量寄与と物質場のEuler–Lagrange寄与が含まれます。物質場がその方程式を満たし、$\xi$ が内部に台を持つため境界項がなければ、[計量変分によるHilbert応力テンソル](../GR9/index.md#def-gr9-hilbert-stress)から

$$
\begin{aligned}
0=\delta_\xi S_m
&=-\frac1{2c}\int_U\sqrt{-g}\,T_{\mu\nu}\delta_\xi g^{\mu\nu}\,d^4x\\
&=\frac1c\int_U\sqrt{-g}\,T_{\mu\nu}\nabla^\mu\xi^\nu\,d^4x\\
&=\frac1c\int_U\sqrt{-g}\,
\left[\nabla^\mu(T_{\mu\nu}\xi^\nu)
-(\nabla^\mu T_{\mu\nu})\xi^\nu\right]d^4x.
\end{aligned}
$$

$T_{\mu\nu}=T_{\nu\mu}$ を二行目で用いました。第一項は発散の積分で、$\xi$ の台が内部にあるため零です。よって

$$
\int_U\sqrt{-g}\,(\nabla^\mu T_{\mu\nu})\xi^\nu\,d^4x=0.
$$

$\xi^\nu$ の各成分は局所的に独立に選べるので、場の方程式の証明と同じ局所化により $\nabla^\mu T_{\mu\nu}=0$ です。$\square$
<!-- proof-end -->

ここには二つの異なる含意があります。重力方程式を**仮定した解**はBianchi恒等式によって保存則を満たします。さらに微分同相不変な物質作用で**物質方程式を満たす解**なら、重力方程式を使わずに同じ保存則が出ます。この二つは整合的ですが、「保存則だけから物質の運動方程式のすべてが逆に従う」とは言えません。

## 4. トレースと真空解の見分け方

場の方程式は対称な2階テンソルの10成分からなります。すべてを独立のスカラー方程式として扱うより、まず計量で縮約した**跡（トレース）**を見ると、スカラー曲率の制約が得られます。

<a id="prop-gr12-trace-reverse"></a>

<!-- formal-statement-start -->
> **命題（4次元場の方程式の跡とRicci表示）**  
> 4次元Lorentz時空で $G_{\mu\nu}+\Lambda g_{\mu\nu}=\kappa T_{\mu\nu}$ とし、$T:=g^{\mu\nu}T_{\mu\nu}$ と置く。このとき

$$
\boxed{\mathcal R=4\Lambda-\kappa T},
\qquad
\boxed{R_{\mu\nu}
=\kappa\left(T_{\mu\nu}-\frac12Tg_{\mu\nu}\right)+\Lambda g_{\mu\nu}}.
$$

> 特に $\Lambda=0,T_{\mu\nu}=0$ なら $R_{\mu\nu}=0$ である。ただし曲率テンソル $R^\rho{}_{\sigma\mu\nu}$ の全成分が零であることまでは意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

4次元で $g^{\mu\nu}g_{\mu\nu}=4$ を使い、Einsteinテンソルの定義へ縮約を代入します。

<!-- proof-start -->
### 証明

[GR7のEinsteinテンソルの定義](../GR7/index.md#def-gr7-einstein-tensor)から、

$$
\begin{aligned}
g^{\mu\nu}G_{\mu\nu}
&=g^{\mu\nu}R_{\mu\nu}
-\frac12\mathcal R\,g^{\mu\nu}g_{\mu\nu}\\
&=\mathcal R-\frac12(4)\mathcal R=-\mathcal R.
\end{aligned}
$$

従って場の方程式を縮約すると $-\mathcal R+4\Lambda=\kappa T$、すなわち $\mathcal R=4\Lambda-\kappa T$。元の方程式を $R_{\mu\nu}$ について解くと、

$$
\begin{aligned}
R_{\mu\nu}
&=\kappa T_{\mu\nu}
+\left(\frac12\mathcal R-\Lambda\right)g_{\mu\nu}\\
&=\kappa T_{\mu\nu}
+\left(2\Lambda-\frac12\kappa T-\Lambda\right)g_{\mu\nu}\\
&=\kappa\left(T_{\mu\nu}-\frac12Tg_{\mu\nu}\right)+\Lambda g_{\mu\nu}.
\end{aligned}
$$

真空・宇宙項零ならRicciテンソルが零となります。Riemannテンソルは縮約で失われる成分を持つため、Ricci零からRiemann零への逆推論はできません。$\square$
<!-- proof-end -->

### 4.1 二つの真空の検算

**Minkowski時空。** 直交座標で計量を

$$
g_{\mu\nu}=\operatorname{diag}(-1,1,1,1)
$$

とすると、すべての成分が定数です。[曲率作用素の成分表示](../GR6/index.md#prop-gr6-coordinate-curvature)ではChristoffel係数が零だから、次が成り立ちます。

$$
R_{\mu\nu}=0,\qquad \mathcal R=0,\qquad G_{\mu\nu}=0.
$$

従って $T_{\mu\nu}=0$ のとき、場の方程式が成立するのは $\Lambda=0$ の場合に限ります。もし $\Lambda\ne0$ なら $\Lambda g_{\mu\nu}=0$ が必要となり、非退化計量に反します。すなわち宇宙項が零でない理論で、平坦な真空Minkowski時空は解になりません。

**一定曲率の真空模型。** 全断面の曲率が同じ定数 $K$ を持つという仮定は[GR7の一定曲率の命題](../GR7/index.md#prop-gr7-constant-curvature)で定式化されています。4次元なら

$$
R_{\mu\nu}=3Kg_{\mu\nu},\qquad
\mathcal R=12K,\qquad
G_{\mu\nu}=-3Kg_{\mu\nu}.
$$

$T_{\mu\nu}=0$ の場の方程式は

$$
(\Lambda-3K)g_{\mu\nu}=0
\quad\Longleftrightarrow\quad K=\frac{\Lambda}{3}.
$$

$g$ が非退化なので括弧内の係数を零にしました。これは**一定曲率という仮定の下での代数的な必要十分条件**であり、任意の真空時空が一定曲率であるという主張ではありません。また $\Lambda>0$・$\Lambda<0$ の場合に対応する局所定曲率模型はありますが、ここで大域構造や境界条件までは分類しません。

## 5. 保存則を座標で読んでみる

曲がった時空で $\nabla_\mu T^{\mu\nu}=0$ を「各成分の偏微分が零」と読んではいけません。[GR7の共変発散の定義](../GR7/index.md#def-gr7-covariant-divergence)と添字を上げた表示を使うと、

$$
\nabla_\mu T^{\mu\nu}
=\partial_\mu T^{\mu\nu}
+\Gamma^\mu_{\mu\lambda}T^{\lambda\nu}
+\Gamma^\nu_{\mu\lambda}T^{\mu\lambda}.
$$

右辺第二項と第三項は基底の変化を表し、一般には消えません。これを具体的な物質模型で見ます。

**静的な背景での流体の圧力勾配。** $N(x)>0$ として

$$
ds^2=-N(x)^2(dx^0)^2+dx^2+dy^2+dz^2
$$

を固定された背景計量として考えます。流体を各点で静止させ、$u^0=c/N,u^i=0$ とすると $g(u,u)=-c^2$ です。[GR8の完全流体テンソル](../GR8/index.md#def-gr8-perfect-fluid-stress)から、エネルギー密度 $\varepsilon(x)$、圧力 $p(x)$ の静止座標成分は

$$
T^{00}=\frac{\varepsilon}{N^2},\qquad
T^{xx}=T^{yy}=T^{zz}=p,\qquad
T^{0x}=0.
$$

成分表示は座標基底の内積 $g_{\mu\nu}=g(\partial_\mu,\partial_\nu)$ から作ったもので、その逆行列と非零の計量微分は

$$
g^{00}=-\frac1{N^2},\qquad
g^{xx}=1,\qquad
\partial_xg_{00}=-2NN'
$$

です。[Levi-Civita接続の座標式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)にこの三式を代入すると、

$$
\begin{aligned}
\Gamma^0_{0x}
&=\frac12g^{00}\partial_xg_{00}
=\frac{N'}N,\\
\Gamma^x_{00}
&=-\frac12g^{xx}\partial_xg_{00}
=NN',\\
\Gamma^\mu_{\mu x}
&=\Gamma^0_{0x}
=\frac{N'}N.
\end{aligned}
$$

最後の等式では、空間成分の $\Gamma^i_{ix}$ がすべて零であることを用いました。

従って空間 $x$ 成分の発散は

$$
\begin{aligned}
\nabla_\mu T^{\mu x}
&=\partial_xT^{xx}
+\Gamma^\mu_{\mu x}T^{xx}
+\Gamma^x_{00}T^{00}\\
&=p'+\frac{N'}N p
+NN'\frac{\varepsilon}{N^2}\\
&=\boxed{p'+(\varepsilon+p)\frac{N'}N}.
\end{aligned}
$$

この値が零になる条件は[GR8の静的流体のつり合い](../GR8/index.md#prop-gr8-hydrostatic-lapse)と一致します。特に $N'>0$、$\varepsilon+p>0$ なら $p'<0$ です。この例は**与えられた背景上の物質収支式**の検証であり、この任意の $N,\varepsilon,p$ がEinstein場の方程式を同時に解くと示したものではありません。

### 局所の収支と大域の保存量

Minkowski直交座標では接続係数が消え、$\partial_\mu T^{\mu\nu}=0$ となります。例えば $\nu=0$ について $x^0=ct$ を使えば

$$
\frac1c\partial_tT^{00}+\partial_iT^{i0}=0,
\quad\Longleftrightarrow\quad
\partial_tT^{00}+\partial_i(cT^{i0})=0.
$$

空間領域 $V$ に積分すると、境界を横切るエネルギー流束が体積内のエネルギーの時間変化に等しいという通常の収支式になります。曲がった時空では一般に接続項があるため、この形を任意の座標・任意の時空へそのまま移してはなりません。対称性がある場合に特別な保存量が得られる仕組みはGR14で調べます。

## 6. 演習：変分、縮約、整合条件を自力でつなぐ

### Level A

<a id="ex-gr12-a01"></a>
#### GR12-A01 変分の係数と符号
- Level: A

$C=c^3/(16\pi G)$、$\delta_g S_{\mathrm{grav}}=C\int\sqrt{-g}E_{\mu\nu}h^{\mu\nu}d^4x$、$\delta_gS_m=-(2c)^{-1}\int\sqrt{-g}T_{\mu\nu}h^{\mu\nu}d^4x$ とする。$E_{\mu\nu}=G_{\mu\nu}+\Lambda g_{\mu\nu}$ のとき、停留条件から $E_{\mu\nu}$ と $T_{\mu\nu}$ の関係を求めよ。

<!-- solution-start -->
**詳細解答。** 両積分は同じ任意の対称変分 $h^{\mu\nu}$ を含むから、係数は $CE_{\mu\nu}-(2c)^{-1}T_{\mu\nu}=0$ です。$C\ne0$ で割ると

$$
E_{\mu\nu}=\frac{1}{2cC}T_{\mu\nu}
=\frac{16\pi G}{2c^4}T_{\mu\nu}
=\frac{8\pi G}{c^4}T_{\mu\nu}.
$$

物質の変分にある負号を見落とすと右辺の符号が逆になるので、[Hilbert応力の定義](../GR9/index.md#def-gr9-hilbert-stress)に戻って検査します。
<!-- solution-end -->

<a id="ex-gr12-a02"></a>
#### GR12-A02 トレースの符号
- Level: A

4次元で $G_{\mu\nu}=R_{\mu\nu}-\frac12\mathcal Rg_{\mu\nu}$ とする。$g^{\mu\nu}G_{\mu\nu}$ を計算し、場の方程式の跡から $\mathcal R$ を求めよ。

<!-- solution-start -->
**詳細解答。** $g^{\mu\nu}g_{\mu\nu}=\delta^\mu_\mu=4$ だから

$$
g^{\mu\nu}G_{\mu\nu}
=\mathcal R-\frac12\mathcal R(4)=-\mathcal R.
$$

また [Einstein場の方程式](#thm-gr12-einstein-equation)で $\Lambda g_{\mu\nu}$ の跡は $4\Lambda$、右辺は $\kappa T$ なので、$-\mathcal R+4\Lambda=\kappa T$、すなわち $\mathcal R=4\Lambda-\kappa T$ です。
<!-- solution-end -->

<a id="ex-gr12-a03"></a>
#### GR12-A03 Minkowskiが真空解となる条件
- Level: A

$T_{\mu\nu}=0$、$g_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ とする。この計量がEinstein場の方程式を満たす $\Lambda$ を決定せよ。

<!-- solution-start -->
**詳細解答。** 成分が一定であるので $\Gamma^\rho_{\mu\nu}=0$ です。[曲率作用素の成分と計量による添字下げ](../GR6/index.md#prop-gr6-coordinate-curvature)から $R_{\mu\nu}=0$、$\mathcal R=0$、従って $G_{\mu\nu}=0$ です。[Einstein場の方程式](#thm-gr12-einstein-equation)は $\Lambda g_{\mu\nu}=0$ となります。$g_{11}=1$ の成分を取れば $\Lambda=0$ が必要で、これを代入すればすべての成分が成立するので十分でもあります。
<!-- solution-end -->

<a id="ex-gr12-a04"></a>
#### GR12-A04 結合係数の単位
- Level: A

SI単位系で $[G]=\mathrm{m}^3/(\mathrm{kg\,s}^2)$、$[c]=\mathrm{m}/\mathrm{s}$ を用い、$[\kappa]$ と $[\kappa T_{\mu\nu}]$ を求めよ。直交枠で $[T_{\mu\nu}]=\mathrm{J}/\mathrm{m}^3$ とする。

<!-- solution-start -->
**詳細解答。** $\kappa=8\pi G/c^4$ の $8\pi$ は無次元なので、

$$
[\kappa]=\frac{\mathrm{m}^3/(\mathrm{kg\,s}^2)}
{\mathrm{m}^4/\mathrm{s}^4}
=\frac{\mathrm{s}^2}{\mathrm{kg\,m}}.
$$

$\mathrm J=\mathrm{kg\,m}^2/\mathrm{s}^2$ から $[\kappa]=\mathrm m/\mathrm J$ です。従って $[\kappa T]=(\mathrm m/\mathrm J)(\mathrm J/\mathrm m^3)=\mathrm m^{-2}$ となり、スカラー曲率・宇宙項と同次元です。
<!-- solution-end -->

<a id="ex-gr12-a05"></a>
#### GR12-A05 座標依存する宇宙項の落とし穴
- Level: A

仮に $G_{\mu\nu}+\Lambda(x)g_{\mu\nu}=\kappa T_{\mu\nu}$ という方程式を書いたとする。$\nabla^\mu T_{\mu\nu}$ を求め、定数宇宙項の理論と何が違うか説明せよ。

<!-- solution-start -->
**詳細解答。** [GR7の共変発散零](../GR7/index.md#thm-gr7-einstein-divergence-free)と $\nabla g=0$ を使い、

$$
\kappa\nabla^\mu T_{\mu\nu}
=\nabla^\mu(\Lambda(x)g_{\mu\nu})
=g^{\mu\alpha}(\partial_\alpha\Lambda)g_{\mu\nu}
=\partial_\nu\Lambda.
$$

従って $\nabla^\mu T_{\mu\nu}=\kappa^{-1}\partial_\nu\Lambda$ です。定数なら零ですが、非定数なら一般には零ではありません。なおこれは形式的に置き換えた方程式の帰結で、元の「定数 $\Lambda$」を用いた全作用の変分では導出されていません。
<!-- solution-end -->

### Level B

<a id="ex-gr12-b01"></a>
#### GR12-B01 一定曲率の真空と宇宙項
- Level: B

4次元で $R_{\mu\nu}=3Kg_{\mu\nu}$、$\mathcal R=12K$、$T_{\mu\nu}=0$ を仮定する。$G_{\mu\nu}$ と場の方程式を計算し、$K$ を $\Lambda$ で表せ。また $\Lambda=0$ の場合を検算せよ。

<!-- solution-start -->
**詳細解答。** [Einsteinテンソルの定義](../GR7/index.md#def-gr7-einstein-tensor)に数値を代入すると

$$
G_{\mu\nu}
=3Kg_{\mu\nu}-\frac12(12K)g_{\mu\nu}
=-3Kg_{\mu\nu}.
$$

真空の[Einstein場の方程式](#thm-gr12-einstein-equation)は $(\Lambda-3K)g_{\mu\nu}=0$。逆計量で縮約すれば座標に依らず

$$
0=(\Lambda-3K)g^{\mu\nu}g_{\mu\nu}
=4(\Lambda-3K)
$$

だから、$\Lambda-3K=0$、従って $K=\Lambda/3$ です。非退化な計量でも座標によって対角成分がすべて零になる場合があるため、対角成分の非零性を仮定しません。$\Lambda=0$ なら $K=0$、$\mathcal R=12K=0$、$G_{\mu\nu}=0$ となります。**ただし計算したのは一定曲率という強い仮定の下だけ**で、一般のRicci平坦時空の分類ではありません。
<!-- solution-end -->

<a id="ex-gr12-b02"></a>
#### GR12-B02 微小微分同相から保存則へ
- Level: B

内部コンパクト台のベクトル場 $\xi$ に対して $\delta_\xi g_{\mu\nu}=\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu$ とする。微分同相不変な物質作用で物質場の方程式が成立するとき、Hilbert応力の変分から $\nabla^\mu T_{\mu\nu}=0$ を導け。

<!-- solution-start -->
**詳細解答。** [計量と逆計量の変分](../GR10/index.md#prop-gr10-inverse-identity)より $\delta_\xi g^{\mu\nu}=-(\nabla^\mu\xi^\nu+\nabla^\nu\xi^\mu)$。物質場のEuler–Lagrange寄与はその運動方程式で消えるので、[Hilbert応力の変分](../GR9/index.md#def-gr9-hilbert-stress)を代入すると

$$
0=\delta_\xi S_m
=-\frac1{2c}\int\sqrt{-g}\,T_{\mu\nu}\delta_\xi g^{\mu\nu}\,d^4x
=\frac1c\int\sqrt{-g}\,T_{\mu\nu}\nabla^\mu\xi^\nu\,d^4x.
$$

積の微分 $T_{\mu\nu}\nabla^\mu\xi^\nu=\nabla^\mu(T_{\mu\nu}\xi^\nu)-(\nabla^\mu T_{\mu\nu})\xi^\nu$ を使います。第一項は $\xi$ のコンパクト台によって積分が零です。各 $\xi^\nu$ を任意に選べるため、$\nabla^\mu T_{\mu\nu}=0$ が全点で成立します。物質方程式を満たすという仮定を外すと、場自身の変分寄与が残り、この証明は閉じません。
<!-- solution-end -->

<a id="ex-gr12-b03"></a>
#### GR12-B03 静的な流体の局所収支
- Level: B

$ds^2=-N(x)^2(dx^0)^2+dx^2+dy^2+dz^2$、$N>0$ とする。静止する完全流体が $T^{00}=\varepsilon/N^2$、$T^{xx}=T^{yy}=T^{zz}=p$、その他零を満たすとき、$\nabla_\mu T^{\mu x}=0$ の条件を求めよ。$N=e^{ax}$、$\varepsilon+p=w>0$ が定数なら $p(x)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $g_{00}=-N^2$ だけが $x$ に依存するので、[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の座標式から $\Gamma^0_{0x}=N'/N$、$\Gamma^x_{00}=NN'$、$\Gamma^\mu_{\mu x}=N'/N$ です。従って

$$
\begin{aligned}
\nabla_\mu T^{\mu x}
&=\partial_xT^{xx}+\Gamma^\mu_{\mu x}T^{xx}
+\Gamma^x_{00}T^{00}\\
&=p'+\frac{N'}N p+NN'\frac{\varepsilon}{N^2}
=p'+(\varepsilon+p)\frac{N'}N.
\end{aligned}
$$

零と置くと $p'=-wN'/N$ です。$N=e^{ax}$ なら $N'/N=a$ なので $p'=-aw$、積分して $p(x)=p(0)-awx$ です。これは与えられた背景での保存則の計算です。$\varepsilon=w-p$ も同時に変わるため、$\varepsilon$ と $p$ を両方定数と見なしていません。Einstein方程式をこの計量が満たすという結論も出していません。
<!-- solution-end -->

### Level C

<a id="ex-gr12-c01"></a>
#### GR12-C01 真空エネルギー・宇宙項・曲率を統合する
- Level: C

一定の $\varepsilon_v>0$ を用い、物質ラグランジアンを $\mathcal L_m=-\varepsilon_v$ とする。$\psi$ を含まない物質作用を採用する。(i) Hilbert応力 $T_{\mu\nu}$ とその跡 $T$ を求めよ。(ii) Einstein場の方程式を $G_{\mu\nu}+\Lambda_{\mathrm{eff}}g_{\mu\nu}=0$ の形に直せ。(iii) 一定曲率形 $R_{\mu\nu}=3Kg_{\mu\nu}$ を仮定し、$K$ と $\mathcal R$ を求めよ。(iv) 共変保存の条件を検算し、$\varepsilon_v$ を任意の関数に置き換えた場合になぜ同じ議論ができないか説明せよ。

<!-- solution-start -->
**詳細解答。** (i) [計量変分によるHilbert応力テンソル](../GR9/index.md#def-gr9-hilbert-stress)を使います。$\mathcal L_m$ は計量の成分に直接依存せず、[GR10の体積要素の変分](../GR10/index.md#prop-gr10-volume-variation)より

$$
\begin{aligned}
\delta S_m
&=\frac1c\int(-\varepsilon_v)\delta\sqrt{-g}\,d^4x\\
&=\frac1{2c}\int\sqrt{-g}\,\varepsilon_v g_{\mu\nu}h^{\mu\nu}\,d^4x.
\end{aligned}
$$

従って $T_{\mu\nu}=-\varepsilon_vg_{\mu\nu}$。4次元なので $T=g^{\mu\nu}T_{\mu\nu}=-4\varepsilon_v$ です。静止直交枠では $T^{00}=\varepsilon_v>0$、空間圧力は $-\varepsilon_v$ です。

(ii) 場の方程式の右辺を移項すると

$$
G_{\mu\nu}+\Lambda g_{\mu\nu}
=-\kappa\varepsilon_vg_{\mu\nu}
\quad\Longleftrightarrow\quad
G_{\mu\nu}+(\Lambda+\kappa\varepsilon_v)g_{\mu\nu}=0.
$$

従って $\Lambda_{\mathrm{eff}}=\Lambda+\kappa\varepsilon_v$ です。符号が加算になることは、エネルギー密度が正でも $T_{\mu\nu}=-\varepsilon_vg_{\mu\nu}$ という負号を持つためです。

(iii) 一定曲率の式を代入すると $G_{\mu\nu}=-3Kg_{\mu\nu}$ なので、

$$
(-3K+\Lambda_{\mathrm{eff}})g_{\mu\nu}=0
\quad\Longrightarrow\quad
K=\frac{\Lambda+\kappa\varepsilon_v}{3},\qquad
\mathcal R=12K=4(\Lambda+\kappa\varepsilon_v).
$$

跡の式から独立に確かめると

$$
\mathcal R=4\Lambda-\kappa T
=4\Lambda-\kappa(-4\varepsilon_v)
=4(\Lambda+\kappa\varepsilon_v),
$$

となって一致します。

(iv) $\nabla^\mu T_{\mu\nu}=-\nabla^\mu(\varepsilon_vg_{\mu\nu})=-\partial_\nu\varepsilon_v=0$ です。$\varepsilon_v$ が定数なので[計量両立性](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)により消えます。これを非定数関数へ置き換えると $-\partial_\nu\varepsilon_v$ が残り、物質方程式を持たないこの単純な模型のまま保存則と場の方程式を両立させることは一般にはできません。変化する真空成分を扱うには別の動的な場とその作用が必要です。
<!-- solution-end -->
