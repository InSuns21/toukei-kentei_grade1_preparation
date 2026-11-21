# BHI19 JT重力の作用と場の方程式

<!-- definition-example-audit: strict -->

## 1. 浴のエントロピーに、重力側の何を足すのか

[BHI17の接合模型](../BHI17/index.md#def-bhi17-regulated-coupling)では重力領域 $G$ と非重力浴 $B$ を区別し、[BHI18のCFTエントロピー台帳](../BHI18/index.md#def-bhi18-cft-ledger)では浴の物質エントロピーを求めました。しかし、浴のエントロピー公式だけから「重力領域内に置いた候補端点の寄与」は計算できません。四次元の地平線面積の代わりに、二次元の各点に**面積に相当する量**を持たせるのが今回の目的です。

二次元では空間断面上の境界は**点**です。点そのものには通常の面積がないので、時空の計量 $g_{\mu\nu}$ とともに、点ごとに値を取る実スカラー場 $\Phi$ を導入します。この場を **dilaton（ディラトン）** と呼びます。後のBHI20では、解の $\Phi$ の値が重力エントロピーの幾何学的部分を与えることを確かめます。本講ではその前に、$\Phi$ と $g_{\mu\nu}$ が満たす方程式を**作用の変分**から決めます。

ここでいう作用とは、場とその導関数から積分で作る汎関数 $I$ であり、境界で指定したデータを保つ微小な変化に対して $\delta I=0$ を要求します。計量の各成分と $\Phi$ は、変分の段階では独立な変数です。

本講の約束は次のとおりです。

- 時空 $M$ は向きと時間向きを固定した二次元Lorentz多様体で、計量符号は $(-,+)$、曲率規約は $R^\rho{}_{\sigma\mu\nu}v^\sigma=(\nabla_\mu\nabla_\nu-\nabla_\nu\nabla_\mu)v^\rho$ とします。
- $\ell>0$ は反de Sitter（AdS）曲率半径、$G_2>0$ は二次元Newton結合定数、$\Phi_0$ は一定の無次元パラメータ、$\Phi$ は無次元の実スカラー場です。$\hbar=1$ とし、$\ell$ は長さ、$G_2$ と $\Phi,\Phi_0$ は無次元とします。
- まず滑らかな**時間的cutoff境界** $\partial M$ と、そこに固定する誘導計量 $h$ と $\Phi$ の境界値を考えます。境界を持つ領域に角があれば追加の角項が必要なので、ここでは滑らかな境界か、角項を別途補った設定を用います。
- 物質場を $\psi$、その作用を $I_{\rm m}[g,\psi]$ とし、**物質作用は $\Phi$ に明示的に依存しない**と仮定します。物質がなければ $I_{\rm m}=0$ です。

時間的境界上で、外向きの単位空間的法線を $n^\mu$（$n_\mu n^\mu=1$）とし、$K=\nabla_\mu n^\mu$ を外部曲率のトレースとします。$\sqrt{-g}\,d^2x$ はbulkの体積要素、$\sqrt{-h}\,ds$ は時間的境界の長さ要素です。$R$ は計量のスカラー曲率です。これらは幾何を測る量で、まだ新しい運動方程式ではありません。

## 2. bulk・境界・位相項を一つの作用に入れる

### 曲率を指定するために dilaton を掛ける

bulkに $\Phi(R+2/\ell^2)$ を入れると、$\Phi$ の変分が曲率を指定します。ただし曲率 $R$ は計量の二階微分を含むため、bulkの積分だけでは計量の境界変分に法線微分が残ります。そこで、境界の外部曲率を掛けた項を同時に用います。

もう一つの成分 $\Phi_0 R$ は、二次元で内部の局所場の方程式を変えず、Euclid化したときには位相（Euler標数）を数える項です。これらを明確に分けた模型を定義します。

<a id="def-bhi19-jt-action"></a>

<!-- formal-statement-start -->
> **定義（境界を持つJT重力の作用）**
>
> 上記の二次元Lorentz領域 $M$、滑らかな時間的cutoff境界、$(-,+)$ 計量 $g$、実スカラー $\Phi$、定数 $G_2,\ell>0$、$\Phi_0\in\mathbb R$ を固定する。境界の外向き法線に対し $K=\nabla_\mu n^\mu$ とし、JT作用を
>
$$
\begin{aligned}
I_{\rm JT}[g,\Phi,\psi]
&=I_{\rm top}[g]+I_{\rm dyn}[g,\Phi]+I_{\rm m}[g,\psi]+I_{\rm ct},\\
I_{\rm top}[g]
&=\frac{\Phi_0}{16\pi G_2}
\left[\int_M\!d^2x\sqrt{-g}\,R
+2\int_{\partial M}\!ds\sqrt{-h}\,K\right],\\
I_{\rm dyn}[g,\Phi]
&=\frac{1}{16\pi G_2}
\left[\int_M\!d^2x\sqrt{-g}\,
\Phi\left(R+\frac{2}{\ell^2}\right)
+2\int_{\partial M}\!ds\sqrt{-h}\,\Phi K\right]
\end{aligned}
$$
>
> と定める。$I_{\rm ct}$ は必要に応じて付ける、境界上で指定した場と誘導計量だけから作る局所反項である。AdS漸近境界に対しては、ここでは
>
$$
I_{\rm ct}=-\frac{1}{8\pi G_2\ell}
\int_{\partial M}\!ds\sqrt{-h}\,\Phi
$$
>
> を標準の選択とする。境界データを固定した変分でこの反項はbulk方程式に寄与しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi19-jt-action -->
**定義の確認（変数と各項を実際に指定）。** $G_2=1$、$\ell=2$、$\Phi_0=3$ を選び、滑らかな時間的境界を持つ二次元Lorentz領域の計量と $C^2$ の実スカラー場 $\Phi$ を用意します。境界では $h,\Phi$ を固定し、物質作用を $I_{\rm m}=0$ とします。このとき正の結合定数と曲率半径、スカラー場の定義域、境界で固定するデータはすべて指定されています。bulkのdilaton係数は $1/(16\pi)$、曲率を拘束する因子は $R+1/2$ です。境界項の係数は $2/(16\pi)$、標準反項は $-1/(16\pi)\int_{\partial M}\sqrt{-h}\,\Phi$ です。後の第6節では、実際の計量と場を入れた**方程式の解**も確認します。
<!-- definition-example-end -->

境界データを固定するとは、$\delta h=0$、$\delta\Phi|_{\partial M}=0$ として変分することです。境界の $\Phi K$ 項は、固定するのが計量の値であって**法線方向の一階微分までではない**という点で重要です。外部曲率の変分が、bulkの $\Phi R$ からの法線微分項を相殺します。境界を動かす自由度を調べるのはBHI21の役目です。

### 位相項が運ぶ定数

Euler標数 $\chi(M_E)$ は、滑らかなコンパクトEuclid二次元曲面 $M_E$ の位相的不変量です。円板なら $1$、円環なら $0$ です。Lorentzの変分で使う作用と、Euclidでの位相計算を区別しましょう。

<a id="prop-bhi19-topology"></a>

<!-- formal-statement-start -->
> **命題（Euclid化した位相項と定数 $S_0$）**
>
> $M_E$ を滑らかなコンパクトな向き付け可能二次元Riemann曲面で、境界は滑らかとする。Euclid作用で $I_{\rm top}^E=-\Phi_0(16\pi G_2)^{-1}[\int_{M_E}\sqrt g R+2\int_{\partial M_E}\sqrt h K]$ を採用すると、
>
$$
I_{\rm top}^E=-S_0\chi(M_E),\qquad
S_0:=\frac{\Phi_0}{4G_2}.
$$
>
> したがって位相型を固定した滑らかな内部変分では位相項はbulkの場の方程式を変えない。
<!-- formal-statement-end -->

### 証明の見取り図

[GEO19の境界付きGauss–Bonnetの定理](../../../幾何系/GEO/GEO19/index.md#thm-geo19-gauss-bonnet-boundary)を使い、GEO19でのGauss曲率 $K_{\rm G}$ と本講での境界外部曲率 $K$ を区別します。二次元では $R=2K_{\rm G}$、境界向きと外向き法線を揃えると測地曲率 $k_g=K$ なので、二倍した等式を使い、角のない場合の $\int R+2\int K=4\pi\chi$ を係数に代入します。ここでは定数項がどこから来るかを独立に検算します。

<!-- proof-start -->
### 証明

二次元のGauss–Bonnet公式は、上の正規化と外向き法線の規約に整合する境界曲率を使うと

$$
\int_{M_E}d^2x\sqrt g\,R+
2\int_{\partial M_E}ds\sqrt h\,K=4\pi\chi(M_E)
$$

です。従って作用に代入して

$$
I_{\rm top}^E
=-\frac{\Phi_0}{16\pi G_2}(4\pi\chi)
=-\frac{\Phi_0}{4G_2}\chi=-S_0\chi.
$$

固定した曲面の滑らかな連続変形では $\chi$ は変わらないので $\delta I_{\rm top}^E=0$ です。これは**位相の異なる幾何を足し合わせる重力の経路積分で全寄与が同じ**という主張ではありません。$\square$
<!-- proof-end -->

例えば $\Phi_0=4G_2\ln 2$ なら $S_0=\ln2$ で、円板は $I_{\rm top}^E=-\ln2$、円環は $0$ です。$S_0$ は後のブラックホールエントロピーの定数部分として現れますが、この節だけで地平線の位置や温度を求めたわけではありません。

## 3. dilaton を変分すると曲率が固定される

新しい場 $\Phi$ を導入した第一の効果を計算します。境界の値は固定し、内部にのみ支持を持つ任意の滑らかな $\delta\Phi$ を考えると、$\Phi$ を含むbulk項のみが残ります。物質は $\Phi$ に明示的に依存しないので $\delta_\Phi I_{\rm m}=0$ です。

<a id="prop-bhi19-curvature-eom"></a>

<!-- formal-statement-start -->
> **命題（dilaton方程式と一定負曲率）**
>
> [JT作用](#def-bhi19-jt-action)の $G_2,\ell>0$ を固定し、$I_{\rm m}$ は $\Phi$ に依存しないとする。内部で任意のコンパクト台を持つ $\delta\Phi$ に対して作用が停留するための必要十分条件は
>
$$
R=-\frac{2}{\ell^2}.
$$
>
> この条件は物質を含む場合にも、明示した $\Phi$ 非依存の仮定の下で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi$ を計量と独立に動かすので、$\sqrt{-g}$ と $R$ は変分せず、積分内の $\Phi$ だけが $\delta\Phi$ に置き換わります。

<!-- proof-start -->
### 証明

$\delta g^{\mu\nu}=0$、$\delta\psi=0$ とすると、内部の任意の試験変分に対し

$$
\delta_\Phi I_{\rm JT}
=\frac{1}{16\pi G_2}\int_M d^2x\sqrt{-g}\,
\left(R+\frac{2}{\ell^2}\right)\delta\Phi.
$$

境界では $\delta\Phi=0$ なので $\Phi K$ 項は寄与せず、標準反項も寄与しません。$G_2>0$、非退化Lorentz計量で $\sqrt{-g}>0$ です。任意のコンパクト台を持つ $\delta\Phi$ に対して積分が0になる基本補題を使うと、括弧内は各内部点で0です。従って $R+2/\ell^2=0$。逆にこの式が成立すれば全ての内部 $\delta\Phi$ に対する変分は0です。$\square$
<!-- proof-end -->

注意すべきは、**曲率を固定することと dilaton の形を固定することは別**だという点です。$R$ は $g$ のみによって定まるので、この方程式だけでは $\Phi$ はまだ未定です。どの $\Phi$ が許されるかは次に計量を変分して求めます。

## 4. 計量を変分して dilaton の方程式を導く

計量変分では $\Phi$ を固定し、逆計量の変分 $q^{\mu\nu}:=\delta g^{\mu\nu}$ を使います。変分の基礎式は

$$
\delta\sqrt{-g}=-\frac12\sqrt{-g}\,g_{\mu\nu}q^{\mu\nu}.
$$

曲率の変分には、二次元の特別な事情があります。二次元では $R_{\mu\nu}=\tfrac12g_{\mu\nu}R$ なので、計量変分におけるEinsteinテンソル $R_{\mu\nu}-\tfrac12g_{\mu\nu}R$ は恒等的に0です。それでも **$\Phi R$ の変分は0ではありません**。曲率が持つ二階微分を二度部分積分すると、$\Phi$ の二階微分が残るためです。

コンパクト台の内部変分で境界の積分を一旦除くと、一般のスカラー $F$ に対する恒等式は

$$
\delta_g\!\int_M\sqrt{-g}\,F R
=\int_M\sqrt{-g}\left[
F\left(R_{\mu\nu}-\frac12g_{\mu\nu}R\right)
+g_{\mu\nu}\Box F-\nabla_\mu\nabla_\nu F
\right]q^{\mu\nu},
$$

ここで $\Box F=g^{\mu\nu}\nabla_\mu\nabla_\nu F$ です。由来を追うと、$q_{\mu\nu}=g_{\mu\alpha}g_{\nu\beta}q^{\alpha\beta}$ に対して

$$
\delta\Gamma^\rho_{\mu\nu}
=-\frac12g^{\rho\sigma}
\left(\nabla_\mu q_{\nu\sigma}
+\nabla_\nu q_{\mu\sigma}
-\nabla_\sigma q_{\mu\nu}\right),
$$

$$
\delta R_{\mu\nu}
=\nabla_\rho\delta\Gamma^\rho_{\mu\nu}
-\nabla_\nu\delta\Gamma^\rho_{\mu\rho}
$$

です。第二式を $F g^{\mu\nu}$ と収縮し、$\nabla g=0$ を使って二度部分積分すると、$\nabla_\mu\nabla_\nu F$ と $g_{\mu\nu}\Box F$ が現れます。境界まで変分を許す際は $2\int\Phi K$ の項が計量変分の法線微分を相殺します。

### 物質が計量を動かすときの符号

物質の**応力エネルギーテンソル** $T_{\mu\nu}$ は、物質場を固定した逆計量の変分によって定義します。これは場が時空へ与えるエネルギー・運動量の源です。

<a id="def-bhi19-stress-source"></a>

<!-- formal-statement-start -->
> **定義（JT模型の物質応力テンソル）**
>
> 物質作用 $I_{\rm m}[g,\psi]$ が逆計量に関して変分可能で、物質場を固定し、内部変分の境界項が消えるとき、
>
$$
T_{\mu\nu}:=-\frac{2}{\sqrt{-g}}
\frac{\delta I_{\rm m}}{\delta g^{\mu\nu}}
$$
>
> と定める。すなわち
>
$$
\delta_g I_{\rm m}
=-\frac12\int_Md^2x\sqrt{-g}\,
T_{\mu\nu}\,\delta g^{\mu\nu}
$$
>
> を満たす対称テンソルを用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi19-stress-source -->
**定義の確認（質量零実スカラー）。** $I_{\rm m}=-\frac12\int\sqrt{-g}\,g^{\mu\nu}\partial_\mu\psi\partial_\nu\psi$ とすると、計量のみを変分した積分内は

$$
\delta_g I_{\rm m}
=-\frac12\int\sqrt{-g}\left[
\partial_\mu\psi\partial_\nu\psi
-\frac12g_{\mu\nu}g^{\alpha\beta}
\partial_\alpha\psi\partial_\beta\psi
\right]q^{\mu\nu}.
$$

したがって $T_{\mu\nu}=\partial_\mu\psi\partial_\nu\psi-\frac12g_{\mu\nu}(\nabla\psi)^2$ です。二次元の縮約では $T=(1-2/2)(\nabla\psi)^2=0$。物質作用のdilaton非依存性、$T_{\mu\nu}$ の対称性、および係数 $-1/2$ を直接確認しました。**跡 $T=0$ でも $T_{\mu\nu}$ 自身が0とは限りません。**
<!-- definition-example-end -->

<a id="prop-bhi19-metric-eom"></a>

<!-- formal-statement-start -->
> **命題（物質を含むJT計量方程式）**
>
> [JT作用](#def-bhi19-jt-action)において内部計量変分を任意とし、[上記の応力テンソル](#def-bhi19-stress-source)を用いる。$\Phi$ を計量変分では固定し、位相項と境界項・反項は固定境界データで内部方程式へ寄与しないものとする。停留条件は
>
$$
g_{\mu\nu}\Box\Phi-\nabla_\mu\nabla_\nu\Phi
-\frac{1}{\ell^2}g_{\mu\nu}\Phi
=8\pi G_2\,T_{\mu\nu}.
$$
>
> 特に真空 $T_{\mu\nu}=0$ でも、$\Phi$ には非自明な二階方程式が残る。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi R$ から「二階微分の差」、$\frac{2\Phi}{\ell^2}$ から「計量に比例する項」、物質から「$-T_{\mu\nu}/2$」を得ます。各項を同じ $\delta g^{\mu\nu}$ の係数として並べてから解きます。

<!-- proof-start -->
### 証明

まず上の一般変分恒等式に $F=\Phi$ を代入します。二次元恒等式 $R_{\mu\nu}-\tfrac12g_{\mu\nu}R=0$ によって

$$
\delta_g\int\sqrt{-g}\,\Phi R
=\int\sqrt{-g}\,
(g_{\mu\nu}\Box\Phi-\nabla_\mu\nabla_\nu\Phi)
q^{\mu\nu}
$$

を得ます。一方、$\Phi$ を固定したポテンシャル項は

$$
\delta_g\int\sqrt{-g}\,\frac{2\Phi}{\ell^2}
=-\int\sqrt{-g}\,\frac{g_{\mu\nu}\Phi}{\ell^2}q^{\mu\nu}.
$$

最後に物質作用の変分は[応力テンソルの定義](#def-bhi19-stress-source)より $-\tfrac12\int\sqrt{-g}T_{\mu\nu}q^{\mu\nu}$ です。以上を $I_{\rm JT}$ に代入すると

$$
\delta_g I_{\rm JT}
=\int_M\sqrt{-g}\left\{
\frac{g_{\mu\nu}\Box\Phi-\nabla_\mu\nabla_\nu\Phi-g_{\mu\nu}\Phi/\ell^2}{16\pi G_2}
-\frac12T_{\mu\nu}\right\}q^{\mu\nu}.
$$

任意の内部変分 $q^{\mu\nu}=q^{\nu\mu}$ に対して消える条件を取り、$16\pi G_2$ を掛けると結論の右辺は $8\pi G_2T_{\mu\nu}$ になります。$\square$
<!-- proof-end -->

文献によって作用全体と $T_{\mu\nu}$ の定義の符号が違います。本講の式は**書かれた作用と書かれた $T_{\mu\nu}$ から導いた組**です。片方の符号だけを他の文献から持ってこないようにします。

## 5. トレースと真空方程式：どの成分を解けばよいか

計量方程式は対称二階テンソルの等式で、二次元では独立な成分が最大3個あります。まず $g^{\mu\nu}$ で縮約してスカラー方程式を得ます。次にそれを元の式へ戻すと、各成分の意味が見えます。

<a id="prop-bhi19-trace-hessian"></a>

<!-- formal-statement-start -->
> **命題（トレース方程式と真空のHessian形）**
>
> [計量方程式](#prop-bhi19-metric-eom)を満たす二次元JT模型において $T=g^{\mu\nu}T_{\mu\nu}$ とおけば、
>
$$
\Box\Phi-\frac{2\Phi}{\ell^2}=8\pi G_2T,
$$
>
> および
>
$$
\nabla_\mu\nabla_\nu\Phi
=\frac{\Phi}{\ell^2}g_{\mu\nu}
+8\pi G_2(g_{\mu\nu}T-T_{\mu\nu})
$$
>
> が成り立つ。特に真空 $T_{\mu\nu}=0$ では
>
$$
\Box\Phi=\frac{2\Phi}{\ell^2},\qquad
\nabla_\mu\nabla_\nu\Phi=\frac{\Phi}{\ell^2}g_{\mu\nu}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二次元だから $g^{\mu\nu}g_{\mu\nu}=2$ です。右辺の $T_{\mu\nu}$ の縮約は $T$ です。係数2を落とさないことが鍵になります。

<!-- proof-start -->
### 証明

[計量方程式](#prop-bhi19-metric-eom)の左辺を $g^{\mu\nu}$ で縮約すると、順に

$$
g^{\mu\nu}g_{\mu\nu}\Box\Phi=2\Box\Phi,\quad
g^{\mu\nu}\nabla_\mu\nabla_\nu\Phi=\Box\Phi,\quad
g^{\mu\nu}g_{\mu\nu}\Phi/\ell^2=2\Phi/\ell^2.
$$

従って $(2-1)\Box\Phi-2\Phi/\ell^2=8\pi G_2T$、すなわち第一式です。元の式を $\nabla_\mu\nabla_\nu\Phi$ について解くと

$$
\nabla_\mu\nabla_\nu\Phi
=g_{\mu\nu}\Box\Phi-\frac{\Phi}{\ell^2}g_{\mu\nu}
-8\pi G_2T_{\mu\nu}.
$$

ここへ $\Box\Phi=2\Phi/\ell^2+8\pi G_2T$ を代入し、$g_{\mu\nu}$ の係数を整理すると第二式になります。$T_{\mu\nu}=0$ を代入すると真空の二式が得られます。$\square$
<!-- proof-end -->

真空の定数dilaton $\Phi=C$ を試すと、$\nabla_\mu\nabla_\nu C=0$ に対して右辺は $Cg_{\mu\nu}/\ell^2$ です。非退化計量・有限 $\ell$ では $C=0$ しか許されません。一方、曲率方程式 $R=-2/\ell^2$ は $\Phi$ の値を制限しません。**曲率方程式だけを解いてJT解が完成したとする誤り**がここで見えます。

## 6. AdS$_2$ の具体例を両方の方程式へ代入する

次の例では、地平線や浴との接合を導入する前に、二つの独立した方程式が**本当に同時に成立する解**を作ります。

正の座標 $z>0$ と $t\in\mathbb R$ を使い、

$$
ds^2=\frac{\ell^2}{z^2}(-dt^2+dz^2),\qquad
\Phi(t,z)=\frac{\alpha}{z},\qquad \ell>0,\ \alpha>0
$$

と置きます。$z\to0$ はこの座標の漸近境界に向かう極限で、$\Phi$ はそこで大きくなります。$\alpha$ は長さの次元を持ちます（$\Phi$ は無次元）。

### まず曲率を確かめる

共形因子を $e^{2\omega}=\ell^2/z^2$ とすると、$\omega=\ln\ell-\ln z$ です。平坦計量 $\eta=\operatorname{diag}(-1,1)$ に対する二次元の共形曲率式

$$
R=-2e^{-2\omega}(-\partial_t^2+\partial_z^2)\omega
$$

を使います。$\partial_t^2\omega=0$、$\partial_z\omega=-1/z$、$\partial_z^2\omega=1/z^2$、$e^{-2\omega}=z^2/\ell^2$ を順に代入すると

$$
R=-2\frac{z^2}{\ell^2}\frac1{z^2}
=-\frac2{\ell^2}.
$$

[曲率方程式](#prop-bhi19-curvature-eom)が確かめられました。

### 次に dilaton の二階共変微分を確かめる

Christoffel記号は、$\nabla_\mu\nabla_\nu\Phi=\partial_\mu\partial_\nu\Phi-\Gamma^\rho_{\mu\nu}\partial_\rho\Phi$ で偏微分と共変微分をつなぐ係数です。この計量の非零成分は

$$
\Gamma^z_{tt}=-\frac1z,\quad
\Gamma^z_{zz}=-\frac1z,\quad
\Gamma^t_{tz}=\Gamma^t_{zt}=-\frac1z.
$$

$\partial_t\Phi=0$、$\partial_z\Phi=-\alpha/z^2$、$\partial_z^2\Phi=2\alpha/z^3$ を使うと

$$
\begin{aligned}
\nabla_t\nabla_t\Phi
&=0-\Gamma^z_{tt}\partial_z\Phi
=-\frac{\alpha}{z^3},\\
\nabla_z\nabla_z\Phi
&=\frac{2\alpha}{z^3}
-\Gamma^z_{zz}\partial_z\Phi
=\frac{\alpha}{z^3},\\
\nabla_t\nabla_z\Phi&=0.
\end{aligned}
$$

右辺 $\Phi g_{\mu\nu}/\ell^2$ の成分は $(-\alpha/z^3,\alpha/z^3,0)$ と一致します。従って[真空のHessian方程式](#prop-bhi19-trace-hessian)が各成分で成立します。さらに

$$
\Box\Phi
=g^{tt}\nabla_t\nabla_t\Phi
+g^{zz}\nabla_z\nabla_z\Phi
=\frac{\alpha}{\ell^2z}+\frac{\alpha}{\ell^2z}
=\frac{2\Phi}{\ell^2}.
$$

これはトレース式の独立な検算です。$\Phi$ を単に定数と置く場合と違い、**同じ負曲率計量の上でも dilaton の形が方程式で選ばれる**ことが分かります。

## 7. cutoff境界で $K$ と反項を確かめる

上のパッチで $z=\varepsilon>0$ を固定した時間的境界を取り、領域を $z\ge\varepsilon$ とします。外向きは $z$ の減少方向なので

$$
n^z=-\frac{\varepsilon}{\ell},\qquad
n^t=0,\qquad
g_{zz}(n^z)^2=\frac{\ell^2}{\varepsilon^2}
\frac{\varepsilon^2}{\ell^2}=1.
$$

$d^2x$ の体積密度は $\sqrt{-g}=\ell^2/z^2$ です。法線を付近で $n^z=-z/\ell$ と延長して $K=\nabla_\mu n^\mu=(\sqrt{-g})^{-1}\partial_\mu(\sqrt{-g}\,n^\mu)$ を計算すると

$$
K=\frac{z^2}{\ell^2}
\partial_z\left(-\frac{\ell}{z}\right)
=\frac{1}{\ell}.
$$

誘導計量は $h_{tt}=-\ell^2/\varepsilon^2$、従って $\sqrt{-h}=\ell/\varepsilon$ です。境界上の $\Phi=\alpha/\varepsilon$ なので、任意の有限時間区間 $\Delta t$ について

$$
\frac{1}{8\pi G_2}\int_{\partial M}\sqrt{-h}\,\Phi K\,dt
=\frac{\alpha\,\Delta t}{8\pi G_2\varepsilon^2},
$$

$$
I_{\rm ct}=-\frac{1}{8\pi G_2\ell}
\int_{\partial M}\sqrt{-h}\,\Phi\,dt
=-\frac{\alpha\,\Delta t}{8\pi G_2\varepsilon^2}.
$$

したがって **この特別なPoincaré境界では両者がちょうど相殺**します。一般の曲がった境界では $K$ が $1/\ell$ からずれるので、$I_{\rm ct}$ は単純に $-\!I_{\rm GHY}$ と同一ではありません。また時間区間の端点に生じる角項や他の境界成分は、この比較には含めていません。

## 8. 方程式とエントロピーへの接続

| 計算の入口 | 決まること | まだ入力すべきこと |
|---|---|---|
| $\delta_\Phi I=0$ | $R=-2/\ell^2$ | dilatonの分布 |
| $\delta_g I=0$ | $\nabla_\mu\nabla_\nu\Phi$ と物質源の関係 | 境界条件・状態・具体解 |
| Euclidの位相項 | $S_0=\Phi_0/(4G_2)$ | 位相型、エントロピーを評価する幾何 |
| 境界項・反項 | 境界データ固定の変分問題と漸近正則化 | 境界の運動や浴との結合 |
| [BHI18の物質エントロピー](../BHI18/index.md#prop-bhi18-conformal-bath) | 指定した浴の区間エントロピー | 重力側の解と候補端点 |

二次元の「面積に相当する項」は、後のBHI20で**dilatonを実際の解の地平線に評価**して初めて明示的な重力エントロピーになります。ここでは $S_0$ と $\Phi$ の役割を分け、さらにisland・一般化エントロピーを使うには放射領域・量子状態・重力端点が必要であることを確認しました。

参考となる原論文：[Maldacena–Stanford–Yang (2016)](https://doi.org/10.1093/ptep/ptw124)、JT重力レビュー：[Mertens–Turiaci (2023)](https://doi.org/10.1007/s41114-023-00046-1)。作用全体の符号、境界の向き、Euclid作用とLorentz作用の変換は文献間で異なるので、本文の宣言と式の組で比較してください。

## 9. 演習：変分・縮約・境界を自力で再現する

本節では $G_2,\ell>0$、曲率規約・符号は本講のものとし、指定がなければ物質作用は $\Phi$ に依存しません。全ての導出では、変分する場と固定する場を明示します。

### Level A：変数と係数を見失わない

<a id="ex-bhi19-a01"></a>

#### BHI19-A01 位相項の係数とEuler標数

- Level: A
- 問題: $\Phi_0=8G_2$ とする。Euclid化した滑らかな円板（$\chi=1$）と円環（$\chi=0$）について $S_0$ と $I_{\rm top}^E$ をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答。** [位相項の命題](#prop-bhi19-topology)で $S_0=\Phi_0/(4G_2)=8G_2/(4G_2)=2$ です。円板は $I_{\rm top}^E=-2\cdot1=-2$、円環は $I_{\rm top}^E=-2\cdot0=0$ です。これは $\chi$ が違う二つの**Euclid幾何**の比較であり、Lorentzの内部方程式 $R=-2/\ell^2$ に $S_0$ が現れるという意味ではありません。
<!-- solution-end -->

<a id="ex-bhi19-a02"></a>

#### BHI19-A02 dilaton変分の支配係数

- Level: A
- 問題: $\ell=3$、$G_2=2$ とする。$\delta g=0$、内部に支持を持つ任意の $\delta\Phi$ について $\delta_\Phi I_{\rm JT}$ を書き、停留条件から $R$ を求めよ。

<!-- solution-start -->
**詳細解答。** [dilaton変分](#prop-bhi19-curvature-eom)に $\ell^2=9$、$16\pi G_2=32\pi$ を代入すると

$$
\delta_\Phi I_{\rm JT}
=\frac1{32\pi}\int\sqrt{-g}\left(R+\frac29\right)\delta\Phi.
$$

任意の内部 $\delta\Phi$ と正の体積密度から括弧が0、よって $R=-2/9$ です。$\Phi$ の境界値は固定され、物質作用は $\Phi$ に依存しないため、他の項から追加の源はありません。
<!-- solution-end -->

<a id="ex-bhi19-a03"></a>

#### BHI19-A03 二次元でのトレース

- Level: A
- 問題: $T_{\mu\nu}=0$ の[計量方程式](#prop-bhi19-metric-eom)を $g^{\mu\nu}$ で縮約し、$\Box\Phi$ を求めよ。縮約で現れる三つの係数を明示せよ。

<!-- solution-start -->
**詳細解答。** $g^{\mu\nu}g_{\mu\nu}=2$、$g^{\mu\nu}\nabla_\mu\nabla_\nu\Phi=\Box\Phi$ なので、左辺は $2\Box\Phi-\Box\Phi-2\Phi/\ell^2$ です。右辺は0。従って $\Box\Phi=2\Phi/\ell^2$ です。[トレース命題](#prop-bhi19-trace-hessian)と一致し、ポテンシャルの $2/\ell^2$ と縮約の次元2を混同しません。
<!-- solution-end -->

<a id="ex-bhi19-a04"></a>

#### BHI19-A04 共形計量の負曲率

- Level: A
- 問題: $ds^2=(\ell^2/z^2)(-dt^2+dz^2)$、$z>0$ について $\omega=\ln\ell-\ln z$ を使い、二次元共形曲率式から $R$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_t^2\omega=0$、$\partial_z\omega=-z^{-1}$、$\partial_z^2\omega=z^{-2}$ です。$e^{-2\omega}=z^2/\ell^2$ なので

$$
R=-2e^{-2\omega}(-\partial_t^2+\partial_z^2)\omega
=-2\frac{z^2}{\ell^2}\frac1{z^2}=-\frac2{\ell^2}.
$$

[曲率方程式](#prop-bhi19-curvature-eom)を満たします。$z=0$ は座標の境界なので微分した領域には含めていません。
<!-- solution-end -->

<a id="ex-bhi19-a05"></a>

#### BHI19-A05 定数dilatonの可否

- Level: A
- 問題: 真空で $\Phi=C$（定数）とするとき、負曲率条件 $R=-2/\ell^2$ のほかに必要な方程式を使い、$C\ne0$ が許されるか判定せよ。

<!-- solution-start -->
**詳細解答。** 定数なので $\nabla_\mu\nabla_\nu\Phi=0$ です。[真空Hessian方程式](#prop-bhi19-trace-hessian)の右辺は $(C/\ell^2)g_{\mu\nu}$。非退化計量では $g_{\mu\nu}$ が零テンソルではなく、$\ell>0$ なので $C=0$ でなければ一致しません。曲率方程式だけなら定数 $C$ を禁止しないため、両方を確かめる必要があります。
<!-- solution-end -->

### Level B：変分を一つずつ再構成する

<a id="ex-bhi19-b01"></a>

#### BHI19-B01 計量変分を三項に分ける

- Level: B
- 問題: $I_{\rm dyn}$ のbulk密度を $\Phi R$ と $2\Phi/\ell^2$ に分け、二次元恒等式 $R_{\mu\nu}=\tfrac12g_{\mu\nu}R$ を使って計量変分を求めよ。さらに[応力テンソルの定義](#def-bhi19-stress-source)を加え、右辺の $8\pi G_2$ を導け。

<!-- solution-start -->
**詳細解答。** $q^{\mu\nu}=\delta g^{\mu\nu}$ とし、$\Phi$ を固定します。二階微分を二度部分積分した $\Phi R$ の変分は

$$
\int\sqrt{-g}(g_{\mu\nu}\Box\Phi-\nabla_\mu\nabla_\nu\Phi)q^{\mu\nu}.
$$

$2\Phi/\ell^2$ の変分では $\delta\sqrt{-g}=-(1/2)\sqrt{-g}\,g_{\mu\nu}q^{\mu\nu}$ なので係数は $-g_{\mu\nu}\Phi/\ell^2$ です。従って重力部分は $(16\pi G_2)^{-1}(g_{\mu\nu}\Box\Phi-\nabla_\mu\nabla_\nu\Phi-g_{\mu\nu}\Phi/\ell^2)$。物質部分の係数は $-T_{\mu\nu}/2$。両者の和を0として $16\pi G_2$ を掛けると $8\pi G_2T_{\mu\nu}$ が右辺へ移ります。境界データは固定したのでbulkの係数比較が許されます。
<!-- solution-end -->

<a id="ex-bhi19-b02"></a>

#### BHI19-B02 計量に比例する物質源

- Level: B
- 問題: $T_{\mu\nu}=qg_{\mu\nu}$、$q\in\mathbb R$ を仮定する。(i) 跡 $T$、(ii) Hessian方程式、(iii) 定数dilaton解がある場合の $\Phi$ を求めよ。$\ell,G_2>0$ とする。

<!-- solution-start -->
**詳細解答。** 二次元なので $T=g^{\mu\nu}qg_{\mu\nu}=2q$ です。[Hessian形](#prop-bhi19-trace-hessian)へ代入して

$$
\nabla_\mu\nabla_\nu\Phi
=\frac{\Phi}{\ell^2}g_{\mu\nu}
+8\pi G_2(2qg_{\mu\nu}-qg_{\mu\nu})
=\left(\frac{\Phi}{\ell^2}+8\pi G_2q\right)g_{\mu\nu}.
$$

$\Phi=C$ なら左辺は0なので $C=-8\pi G_2q\ell^2$。さらにトレース式は $\Box C-2C/\ell^2=8\pi G_2(2q)$、すなわち $-2C/\ell^2=16\pi G_2q$ であり同じ解を与えます。この代数的な源が実際の物質作用・状態から実現されるかは別に確かめる必要があります。
<!-- solution-end -->

<a id="ex-bhi19-b03"></a>

#### BHI19-B03 cutoff境界の外部曲率と相殺

- Level: B
- 問題: $z\ge\varepsilon$ のPoincaréパッチ、$\Phi=\alpha/z$、時間幅 $\Delta t$ について、外向き単位法線、$K$、$\sqrt{-h}$ を求め、$\Phi K$ の境界項と標準反項を比較せよ。

<!-- solution-start -->
**詳細解答。** 外向きは $z$ 減少方向、$n^z=-\varepsilon/\ell$、$g_{zz}(n^z)^2=1$ です。近傍の延長 $n^z=-z/\ell$ を用いると $\sqrt{-g}n^z=-\ell/z$ だから $K=(z^2/\ell^2)\partial_z(-\ell/z)=1/\ell$。固定境界の $h_{tt}=-\ell^2/\varepsilon^2$ から $\sqrt{-h}=\ell/\varepsilon$。境界の $\Phi=\alpha/\varepsilon$ を代入し

$$
I_{\Phi K}=\frac{1}{8\pi G_2}\frac{\ell}{\varepsilon}
\frac{\alpha}{\varepsilon}\frac1\ell\Delta t
=\frac{\alpha\Delta t}{8\pi G_2\varepsilon^2},
$$

$$
I_{\rm ct}=-\frac{1}{8\pi G_2\ell}
\frac{\ell}{\varepsilon}\frac{\alpha}{\varepsilon}\Delta t
=-\frac{\alpha\Delta t}{8\pi G_2\varepsilon^2}.
$$

和は0。この結論は明示した境界と反項の比較であり、全てのJT解の全作用が0という主張ではありません。
<!-- solution-end -->

<a id="ex-bhi19-b04"></a>

#### BHI19-B04 トレース零でも物質源が残る例

- Level: B
- 問題: 平坦な局所座標 $(t,x)$ で質量零実スカラー $\psi=f(t-x)$（$f$ は $C^2$）を取る。$I_{\rm m}=-\frac12\int\sqrt{-g}(\nabla\psi)^2$ の応力テンソルについて $T$ と $T_{tt}$ を計算し、$T=0$ から $T_{\mu\nu}=0$ と結論できるか述べよ。

<!-- solution-start -->
**詳細解答。** $u=t-x$ と置くと $\partial_t\psi=f'(u)$、$\partial_x\psi=-f'(u)$。平坦計量 $\operatorname{diag}(-1,1)$ に対して $(\nabla\psi)^2=-(f')^2+(f')^2=0$ です。[応力テンソルの直接例](#def-bhi19-stress-source)より $T_{tt}=(\partial_t\psi)^2-\tfrac12g_{tt}(\nabla\psi)^2=(f')^2$、$T_{xx}=(f')^2$、$T_{tx}=-(f')^2$ です。一方 $T=-T_{tt}+T_{xx}=0$。$f'$ が非零の点では $T_{\mu\nu}\ne0$ です。よってトレース式が真空と同じ形でも、[計量方程式](#prop-bhi19-metric-eom)の各成分には物質源が残ります。これは局所の応力テンソルの検算であり、全体が平坦計量のJT解になるという主張ではありません。
<!-- solution-end -->

### Level C：曲率・dilaton・境界の一貫性

<a id="ex-bhi19-c01"></a>

#### BHI19-C01 Poincaréパッチの作用変分を総合検査する

- Level: C
- 問題: 真空JT模型で $\ell>0,\alpha>0$、$z\ge\varepsilon>0$ とし、$ds^2=(\ell^2/z^2)(-dt^2+dz^2)$、$\Phi=\alpha/z$ と置く。(i) $\Phi$ 変分が要求する曲率、(ii) $\Phi$ のHessianの $tt,zz,tz$ 成分とトレース、(iii) $z=\varepsilon$ における $K$ と $\Phi K$ 境界項・標準反項の相殺、(iv) $\Phi=C\ne0$ に置き換える場合の失敗、(v) [BHI18の浴区間式](../BHI18/index.md#prop-bhi18-vacuum-bath)だけからisland端点のエントロピーを決定できるか、を順に検算せよ。時間境界の角項は含めず時間幅 $\Delta t$ で比較してよい。

<!-- solution-start -->
**詳細解答。** (i) $\omega=\ln\ell-\ln z$、$\partial_z^2\omega=z^{-2}$ を使うと $R=-2(z^2/\ell^2)(z^{-2})=-2/\ell^2$。これは[曲率方程式](#prop-bhi19-curvature-eom)です。

(ii) $\partial_z\Phi=-\alpha/z^2$、$\partial_z^2\Phi=2\alpha/z^3$、$\partial_t\Phi=0$ です。$\Gamma^z_{tt}=\Gamma^z_{zz}=-1/z$、$\Gamma^t_{tz}=-1/z$ により

$$
\nabla_t\nabla_t\Phi=-\frac{\alpha}{z^3},\quad
\nabla_z\nabla_z\Phi=\frac{\alpha}{z^3},\quad
\nabla_t\nabla_z\Phi=0.
$$

これらはそれぞれ $g_{tt}\Phi/\ell^2=-\alpha/z^3$、$g_{zz}\Phi/\ell^2=\alpha/z^3$、$g_{tz}\Phi/\ell^2=0$ と一致します。$g^{tt}=-z^2/\ell^2$、$g^{zz}=z^2/\ell^2$ なので

$$
\Box\Phi
=\left(-\frac{z^2}{\ell^2}\right)\left(-\frac{\alpha}{z^3}\right)
+\left(\frac{z^2}{\ell^2}\right)\left(\frac{\alpha}{z^3}\right)
=\frac{2\alpha}{\ell^2z}=\frac{2\Phi}{\ell^2}.
$$

(iii) 境界の外向き単位法線は $n^z=-\varepsilon/\ell$。$\sqrt{-g}=\ell^2/z^2$ を使うと $K=\nabla_\mu n^\mu=1/\ell$ です。$\sqrt{-h}=\ell/\varepsilon$、$\Phi|_{\partial M}=\alpha/\varepsilon$ から

$$
I_{\Phi K}=\frac{\alpha\Delta t}{8\pi G_2\varepsilon^2},
\qquad
I_{\rm ct}=-\frac{\alpha\Delta t}{8\pi G_2\varepsilon^2},
$$

よってこの境界での和は0です。

(iv) 定数 $\Phi=C$ のHessianは0ですが、真空で必要な $g_{\mu\nu}C/\ell^2$ は $C\ne0$ なら0ではありません。負曲率条件は変わらなくても[計量方程式](#prop-bhi19-metric-eom)に失敗します。

(v) [BHI18の真空区間公式](../BHI18/index.md#prop-bhi18-vacuum-bath)は物質状態と浴の二端点を固定した公式です。重力側で評価すべき $\Phi$ の値にはここで求めた**具体解と評価点**が必要であり、さらにisland候補の端点位置・量子状態・適切なエントロピーの正則化を追加して初めて比較できます。従って浴の式のみから端点のエントロピーは決まりません。
<!-- solution-end -->
