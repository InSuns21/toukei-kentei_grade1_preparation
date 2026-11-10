# BHT20 高階曲率とWald公式の適用限界

[前講のWaldエントロピー](../BHT19/index.md#def-bht19-wald-entropy)は、Einstein重力では面積の4分の1になりました。しかし重力作用に曲率の二乗を加えたら、同じ面積の地平線でもエントロピーは同じでしょうか。また、その補正値が時間とともに増えると結論してよいのでしょうか。

まず一つの曲率スカラー $R$ から作用を作る $f(R)$ 重力を手計算し、**作用の曲率微分**と**実際に許される解**を別々に調べます。その後、Noether電荷の曖昧さ、動的地平線、曲率の導関数を含む作用、量子補正を切り分けます。「エントロピー公式が計算できること」と「第二法則が証明されたこと」の差を見失わないための講義です。

4次元の向き付きLorentz時空、計量符号 $(-,+,+,+)$、$c=\hbar=k_B=1$ を用い、$G>0$ は残します。曲率の符号は[GR6の規約](../../GR/GR6/index.md#prop-gr6-coordinate-curvature)に合わせます。[前講のWaldエントロピーの定義](../BHT19/index.md#def-bht19-wald-entropy)を用いる際は、正則な**非極限・定常の分岐Killing地平線**とコンパクトな分岐面 $B$ を仮定します。動的な比較では、これを成立条件として勝手に引き継ぎません。

## 1. 面積だけでは決まらなくなる最小模型

Einstein–Hilbert作用のスカラー $L=R/(16\pi G)$ を、滑らかな実関数 $f$ により $L=f(R)/(16\pi G)$ に置き換えてみます。$f$ はある曲率の値を入力して作用のスカラー部分を定め、$f'(R)$ はその値を変えたときの傾きを表します。

ここで $f'(R)=df/dR$ は実変数 $R$ に関する一変数微分です。Wald公式の曲率微分では計量 $g_{ab}$ を固定し、$R_{abcd}$ をその添字対称性を満たす形式的な曲率変数として動かします。一方、第2節の場の方程式では計量そのものを動かすため、両者の変分を区別します。

<a id="def-bht20-fr-model"></a>

<!-- formal-statement-start -->
> **定義（計量形式のf(R)重力）**
> 向き付き4次元Lorentz時空の計量 $g_{ab}$ とそのスカラー曲率 $R$ に対し、$f$ が必要な階数だけ微分可能な実関数であるとする。重力作用を

$$
I_f[g]=\frac{1}{16\pi G}\int_M f(R)\,\boldsymbol\epsilon
$$

> と置く模型を、計量形式の $f(R)$ 重力とする。$\boldsymbol\epsilon=\sqrt{-g}\,d^4x$ は向きを選んだ体積形式である。変分では境界計量等を固定し、必要な境界項を追加または境界変分を零にする条件を置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht20-fr-model -->
**定義の確認**：実定数 $\alpha,\Lambda$ に対し $f(R)=R+\alpha R^2-2\Lambda$ を選びます。これは実数 $R$ の多項式なので必要な階数の微分が存在します。$\alpha$ は長さの二乗、$\Lambda$ は長さの逆二乗の次元を持ち、三項とも $R$ と同じ次元です。

滑らかなLorentz計量から曲率を $R=g^{ac}g^{bd}R_{abcd}$ と縮約し、この多項式を代入すると、定義どおり

$$
I_f[g]=\frac{1}{16\pi G}\int_M
(R+\alpha R^2-2\Lambda)\sqrt{-g}\,d^4x
$$

を得ます。非コンパクトな領域では作用の積分や境界項について別途条件を課し、内部にコンパクト台を持つ計量変分なら境界寄与は零になります。

曲率値について $f(0)=-2\Lambda$、$f'(R)=1+2\alpha R$、$f''(R)=2\alpha$ は通常の一変数微分で得られます。$\alpha=0$ なら宇宙項付きEinstein作用に戻ります。$R=0$ では二乗項は作用の値だけでなく一次曲率微分への寄与も零です。これらは定義の作用と微分可能性の検査であり、選んだ計量が場の方程式を満たすかは第2節で別に確認します。
<!-- definition-example-end -->

作用には体積形式が掛かっていますが、[Wald公式](../BHT19/index.md#def-bht19-wald-entropy)が微分するのはスカラー $L$ であり、$\sqrt{-g}L$ ではありません。以下の $\delta_R$ は計量を固定して曲率変数だけを微小に動かす操作で、第2節の $h^{ab}=\delta g^{ab}$ とは異なります。

<a id="prop-bht20-fr-wald"></a>

<!-- formal-statement-start -->
> **命題（f(R)模型の定常Waldエントロピー）**
> 4次元の計量形式の $f(R)$ 作用 $L=f(R)/(16\pi G)$ で、$f$ は分岐面近傍で微分可能とする。この理論の正則な定常解が、コンパクトな分岐面 $B$ を持つ非極限Killing地平線を持つならば、

$$
E_R^{abcd}
=\frac{f'(R)}{32\pi G}(g^{ac}g^{bd}-g^{ad}g^{bc}),
\qquad
S_W=\frac{1}{4G}\int_B f'(R)\,dA.
$$

> 特に $R|_B=R_0$ が定数なら $S_W=f'(R_0)A_B/(4G)$ となる。$f'(R)$ の符号についてこの代数公式だけから正値性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$R=g^{ac}g^{bd}R_{abcd}$ を計量固定で変分し、Riemannテンソルの反対称性による $1/2$ を入れます。残った $f'(R)$ を、[双法線の正規化](../BHT19/index.md#def-bht19-bifurcation-data)で縮約すれば補正係数が出ます。

<!-- proof-start -->
### 証明

$g^{ab}$ を固定すると $\delta R=g^{ac}g^{bd}\delta R_{abcd}$。曲率の $c,d$ に関する反対称性から、同じ変分を

$$
\delta R=
\frac12(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}
$$

と書けます。連鎖律を $f(R)$ に適用して

$$
\delta_RL
=\frac{f'(R)}{16\pi G}\delta R
=\frac{f'(R)}{32\pi G}
(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}.
$$

したがって曲率変分の係数は命題の $E_R^{abcd}$ です。[分岐面の双法線の正規化](../BHT19/index.md#def-bht19-bifurcation-data)は $\hat\epsilon_{ab}\hat\epsilon^{ab}=-2$ を満たし、

$$
\begin{aligned}
g^{ac}g^{bd}\hat\epsilon_{ab}\hat\epsilon_{cd}&=-2,\\
g^{ad}g^{bc}\hat\epsilon_{ab}\hat\epsilon_{cd}&=+2.
\end{aligned}
$$

二つの差は $-4$ です。ゆえに

$$
E_R^{abcd}\hat\epsilon_{ab}\hat\epsilon_{cd}
=-\frac{f'(R)}{8\pi G},
\qquad
S_W=-2\pi\int_B\left(-\frac{f'(R)}{8\pi G}\right)dA.
$$

ここで[前講のWald公式](../BHT19/index.md#def-bht19-wald-entropy)は定常分岐面という仮定で使用しました。$f'(R)$ が面内で変わり得る場合は積分の外に出さず、$R|_B=R_0$ が一定の場合だけ面積を掛けます。
<!-- proof-end -->

**具体例**：$f(R)=R+\alpha R^2-2\Lambda$ では

$$
S_W=\frac{1}{4G}\int_B(1+2\alpha R)\,dA.
$$

もし $R|_B=R_0$ なら補正は $(1+2\alpha R_0)A_B/(4G)$ です。ただし**任意の $R_0$ でそのような定常ブラックホール解が存在する**とは、まだ示していません。この飛躍を次に止めます。

## 2. その計量は本当に模型の解か

作用を選ぶと場の方程式も変わります。たとえばEinstein重力のSchwarzschild計量を、新しい作用にも無条件で解として流用するのは誤りです。曲率が一定の解なら、$f(R)$ 方程式の微分項は消えるので手計算で存在条件を検査できます。

<a id="thm-bht20-fr-field-equation"></a>

<!-- formal-statement-start -->
> **定理（真空f(R)の場の方程式と定曲率条件）**
> 4次元Lorentz計量 $g$ の作用 $I_f=(16\pi G)^{-1}\int_M f(R)\boldsymbol\epsilon$ を、境界項が消えるようなコンパクト台の逆計量変分で停留させる。$g$ は少なくとも4回、$f$ は少なくとも3回連続微分可能で、以下の微分と部分積分が許されるとする。ここで $f'(R)=df/dR$、$\Box=g^{ab}\nabla_a\nabla_b$ はスカラーに作用する時空の波動演算子とする。真空の計量方程式は

$$
f'(R)R_{ab}-\frac12f(R)g_{ab}
+(g_{ab}\Box-\nabla_a\nabla_b)f'(R)=0
$$

> である。$R=R_0$ が時空全体で一定なら必要条件は

$$
f'(R_0)R_0-2f(R_0)=0.
$$

> さらに $f'(R_0)\ne0$ の場合、この条件の下では定曲率解の方程式は $R_{ab}=R_0g_{ab}/4$ に帰着する。条件を満たす $R_0$ だけでブラックホールの存在や境界条件が保証されるわけではない。
<!-- formal-statement-end -->

### 証明の見取り図

計量変分で体積の変化と曲率の変化を別々に数えます。$\delta R$ に含まれる二階微分を、境界項が消える仮定の下で二回部分積分すると、$f'(R)$ の二階微分が現れます。最後に4次元の跡を取ります。

<!-- proof-start -->
### 証明

逆計量の摂動を $h^{ab}=\delta g^{ab}$ と書き、その跡を $h=g_{ab}h^{ab}$ とします。これは座標微分ではなく計量族の変分パラメータに関する微分です。[GR10の体積密度の変分](../../GR/GR10/index.md#prop-gr10-volume-variation)と[GR10の作用変分](../../GR/GR10/index.md#thm-gr10-eh-variation)を、[GR6の曲率規約](../../GR/GR6/index.md#prop-gr6-coordinate-curvature)のもとで使用します。

$$
\delta\sqrt{-g}=-\frac12\sqrt{-g}\,h,\qquad
\delta R=R_{ab}h^{ab}+g^{ab}\delta R_{ab}.
$$

なぜ後者が発散になるかを添字で追うと、[Palatini恒等式](../../GR/GR10/index.md#lem-gr10-palatini)と $\nabla g=0$ により

$$
\begin{aligned}
g^{ab}\delta R_{ab}
&=g^{ab}(\nabla_c\delta\Gamma^c{}_{ab}
-\nabla_b\delta\Gamma^c{}_{ac})\\
&=\nabla_cV^c,\qquad
V^c=\nabla^c h-\nabla_bh^{cb}.
\end{aligned}
$$

従って $\nabla_cV^c=\Box h-\nabla_c\nabla_bh^{cb}$、すなわち $\delta R=R_{ab}h^{ab}+g_{ab}\Box h^{ab}-\nabla_a\nabla_bh^{ab}$ です。ここで $\Box h=\Box(g_{ab}h^{ab})=g_{ab}\Box h^{ab}$ は計量両立性によります。変分を代入すると

$$
16\pi G\,\delta I_f
=\int_M\sqrt{-g}\left[
\left(f'R_{ab}-\frac12fg_{ab}\right)h^{ab}
+f'\nabla_cV^c\right]d^4x.
$$

$f'$ は $R$ の関数であり定数とは限りません。コンパクト台を用いて部分積分を二回行えば

$$
\begin{aligned}
\int\sqrt{-g}\,f'g_{ab}\Box h^{ab}
&=\int\sqrt{-g}\,g_{ab}(\Box f')h^{ab},\\
-\int\sqrt{-g}\,f'\nabla_a\nabla_bh^{ab}
&=-\int\sqrt{-g}\,(\nabla_a\nabla_bf')h^{ab}.
\end{aligned}
$$

任意の対称 $h^{ab}$ の係数を零とすれば場の方程式を得ます。$g^{ab}$ を掛けて跡を取ると、4次元では $g^{ab}g_{ab}=4$ と $g^{ab}\nabla_a\nabla_b=\Box$ より

$$
f'R-2f+(4\Box-\Box)f'=f'R-2f+3\Box f'=0.
$$

$R=R_0$ が一定なら $\nabla_af'(R_0)=0$、$\Box f'(R_0)=0$。よって代数条件 $f'(R_0)R_0-2f(R_0)=0$ が必要です。$f'(R_0)\ne0$ なら元のテンソル方程式は

$$
R_{ab}=\frac{f(R_0)}{2f'(R_0)}g_{ab}
=\frac{R_0}{4}g_{ab},
$$

となります。最後の等号に跡の条件を使用しました。
<!-- proof-end -->

### Einstein解を使える場合と使えない場合

二乗補正を持つ模型 $f(R)=R+\alpha R^2-2\Lambda$ を代入すると、定曲率条件は

$$
\begin{aligned}
0&=(1+2\alpha R_0)R_0
-2(R_0+\alpha R_0^2-2\Lambda)\\
&=-R_0+4\Lambda.
\end{aligned}
$$

従って $R_0=4\Lambda$、$f'(R_0)=1+8\alpha\Lambda$ です。$1+8\alpha\Lambda\ne0$ なら、$R_{ab}=\Lambda g_{ab}$ を満たすSchwarzschild–(A)dS型の定常解はこの模型の真空方程式も満たします。ただし漸近条件・地平線の存在・非極限性はその解で別に検査します。

正則な分岐面が存在する場合のWaldエントロピーは

$$
S_W=\frac{1+8\alpha\Lambda}{4G}A_B.
$$

特に $\Lambda=0$ のRicci-flat Schwarzschildでは $R_0=0$ なので、**$\alpha R^2$ を加えてもこの解のWaldエントロピー補正は零**です。$\alpha\ne0$ なら必ず面積則からずれる、という主張は偽です。一方 $f'(R_0)=0$ の退化点では、上のEinstein方程式への割り算はできません。$f'(R_0)>0$ は有効な重力結合を正に保つ際に重要な別条件ですが、定曲率の代数解の存在条件そのものではありません。

## 3. 曲率に微分が入ると何が変わるか

ここまでは $L=L(g,R_{abcd})$ で、Riemann曲率の**共変微分が作用にない**場合でした。たとえば $\nabla_aR\nabla^aR$ を加えると、$R_{abcd}$ をそのまま形式的に偏微分するだけでは見落としが生じます。変分した $\nabla R$ からさらに部分積分するためです。

曲率の共変微分まで含む一般作用のNoether電荷を導くには、さらに共変位相空間の高階微分変分を整理する必要があります。ここではその一般構成を [Iyer–Wald (1994)](https://arxiv.org/abs/gr-qc/9403028) の正則・共変なNoether電荷の結果として用い、具体模型について**曲率Euler微分の導出を自分で行う**ことに集中します。この一般構成の全証明を、次の部分積分だけで置き換えたとはみなしません。

<a id="prop-bht20-curvature-derivative"></a>

<!-- formal-statement-start -->
> **命題（曲率微分を含む模型の有効曲率微分）**
> 4次元の微分同相不変作用のスカラーを

$$
L=\frac{1}{16\pi G}\{R+\eta\nabla_aR\nabla^aR\}
$$

> とし、$\eta$ は定数、計量と曲率を形式的に独立変数として変分するとする。分岐面近傍で曲率・計量は必要な階数だけ滑らかで、境界項の扱いが定まっているとする。曲率変分に対するEuler–Lagrange型の有効係数は

$$
\mathcal E_R^{abcd}
=\frac{1-2\eta\Box R}{32\pi G}
(g^{ac}g^{bd}-g^{ad}g^{bc}).
$$

> この理論の正則な非極限定常分岐面 $B$ に適用されるNoether型エントロピーは、対応する共変な電荷代表を採ったとき

$$
S_W=\frac{1}{4G}\int_B(1-2\eta\Box R)\,dA
$$

> となる。ここで $\Box R$ は時空内の量であり、面上の2次元Laplace作用素と混同しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta_R(\nabla R)$ を $R$ の変分で表し、$2\eta\nabla R\cdot\nabla(\delta R)$ を一回部分積分します。これが裸の係数 $1$ を $1-2\eta\Box R$ に変えます。

<!-- proof-start -->
### 証明

まず計量を固定し、スカラー $R$ の変分だけを取り出すと $\delta_R(\nabla_aR)=\nabla_a(\delta R)$ です。従って

$$
\begin{aligned}
16\pi G\,\delta_RL
&=\delta R+2\eta\nabla^aR\,\nabla_a(\delta R)\\
&=(1-2\eta\Box R)\delta R
+2\eta\nabla_a(\nabla^aR\,\delta R).
\end{aligned}
$$

最後の全発散は境界ポテンシャルに入るので、作用の局所的な曲率Euler微分は $(1-2\eta\Box R)/(16\pi G)$ を係数に持ちます。[前節の反対称曲率変分](#prop-bht20-fr-wald)を再利用して

$$
\delta R=
\frac12(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}
$$

を代入すれば $\mathcal E_R^{abcd}$ が得られます。双法線縮約は同じ $-4$ なので、定常分岐面に対する曲率の一般化Euler微分を用いたNoetherエントロピーの積分は命題の形です。なお $\eta\nabla R\cdot\nabla R$ の計量変分や境界項は場の方程式・電荷の構築では別に必要であり、この計算だけで任意の計量が解だとは主張していません。
<!-- proof-end -->

この模型で $R$ が**時空全体で一定**なら $\Box R=0$ であり、補正が消えます。$R$ が分岐面上で一定なだけでは、法線方向の二階微分を含む $\Box R$ が零とは限りません。ここが $f'(R_0)$ を単純に外へ出す場合との違いです。

## 4. Noether電荷の曖昧さをいつ無視できるか

[BHT18のNoether流](../BHT18/index.md#def-bht18-noether)は、作用へ完全微分を足しても場の方程式が変わらないという自由度を持ちます。さらにシンプレクティックポテンシャルの選び方にも境界の自由度があります。**平衡のエントロピーがよく定義できることと、非平衡での局所エントロピー密度が一意であることは別**です。

最初に、計算できる完全微分の例を調べます。$\boldsymbol\mu$ を計量から共変に構成した滑らかな3形式、$\xi$ を場の変分中固定するベクトル場とします。作用4形式の変更 $\mathbf L\mapsto\mathbf L+d\boldsymbol\mu$ は、境界の取扱いが整合していれば場の方程式を変えません。

<a id="prop-bht20-exact-shift"></a>

<!-- formal-statement-start -->
> **命題（完全微分の追加と分岐面電荷）**
> 4次元の共変Lagrangian4形式 $\mathbf L$、共変3形式 $\boldsymbol\mu$、固定生成場 $\xi$ に対し $\mathbf L'=\mathbf L+d\boldsymbol\mu$ とする。ポテンシャルとNoether電荷の代表を整合的に選べば

$$
\boldsymbol\theta'=\boldsymbol\theta+\delta\boldsymbol\mu,
\qquad
\mathbf Q'_\xi=\mathbf Q_\xi+\iota_\xi\boldsymbol\mu
$$

> とできる（電荷にはさらに完全微分の自由度がある）。固定した $\xi$ に対する表面変分 $\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta$ は不変である。$\xi|_B=0$ の正則なコンパクト分岐面 $B$ では、$\int_B\mathbf Q_\xi$ も不変である。
<!-- formal-statement-end -->

### 証明の見取り図

微分同相による $\boldsymbol\mu$ の変化に[Cartanの公式](../../../幾何系/GEO/GEO7/index.md#thm-geo7-cartan-formula)を使い、Noether流の差が $d(\iota_\xi\boldsymbol\mu)$ となることを確かめます。表面変分では、固定 $\xi$ の収縮と変分が交換するため差が相殺されます。

<!-- proof-start -->
### 証明

もとの変分を $\delta\mathbf L=\mathbf E\cdot\delta g+d\boldsymbol\theta$ とします。$\mathbf L'$ の変分は

$$
\delta\mathbf L'
=\mathbf E\cdot\delta g+
d(\boldsymbol\theta+\delta\boldsymbol\mu)
$$

なので $\boldsymbol\theta'=\boldsymbol\theta+\delta\boldsymbol\mu$ と選べます。Noether流は $\mathbf J_\xi=\boldsymbol\theta(g;\mathcal L_\xi g)-\iota_\xi\mathbf L$ です。共変な $\boldsymbol\mu$ に対し $\delta_\xi\boldsymbol\mu=\mathcal L_\xi\boldsymbol\mu$、また[Cartanの公式](../../../幾何系/GEO/GEO7/index.md#thm-geo7-cartan-formula) $\mathcal L_\xi\boldsymbol\mu=d\iota_\xi\boldsymbol\mu+\iota_\xi d\boldsymbol\mu$ より

$$
\begin{aligned}
\mathbf J'_\xi-\mathbf J_\xi
&=\mathcal L_\xi\boldsymbol\mu-\iota_\xi d\boldsymbol\mu\\
&=d(\iota_\xi\boldsymbol\mu).
\end{aligned}
$$

よって $\mathbf Q'_\xi=\mathbf Q_\xi+\iota_\xi\boldsymbol\mu$ と選べます。$\delta\xi=0$ なので

$$
\begin{aligned}
\delta\mathbf Q'_\xi-\iota_\xi\boldsymbol\theta'
&=\delta\mathbf Q_\xi+\delta(\iota_\xi\boldsymbol\mu)
-\iota_\xi\boldsymbol\theta-\iota_\xi\delta\boldsymbol\mu\\
&=\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta.
\end{aligned}
$$

最後に $B$ で $\xi=0$ なら $\iota_\xi\boldsymbol\mu|_B=0$。加えて $\mathbf Q_\xi\mapsto\mathbf Q_\xi+d\mathbf Z_\xi$ の自由度は、閉じた $B$ 上の[Stokesの定理](../../../幾何系/VC/VC5/index.md#thm-vc5-stokes)によって $\int_Bd\mathbf Z_\xi=\int_{\partial B}\mathbf Z_\xi=0$ となり、電荷積分に寄与しません。
<!-- proof-end -->

もう一つの自由度は $\boldsymbol\theta\mapsto\boldsymbol\theta+d\mathbf Y(g;\delta g)$ です。共変な $\mathbf Y$ は場の変分に線形で、Noether電荷の対応する変更には $\mathbf Y(g;\mathcal L_\xi g)$ が現れます。**定常Killing背景では $\mathcal L_\chi g=0$** なので、この項は消えます。しかし動的背景の $\mathcal L_\xi g\ne0$ では一般に消えず、異なる非平衡エントロピー候補が生じます。これをJacobson–Kang–Myers（JKM）型の曖昧さと呼びます。

分岐面での平衡公式に対して、この曖昧さを口実に無条件の不確定性を主張するのは行き過ぎです。逆に、定常で消えた項が任意の動的切片でも消えるとみなすのも誤りです。ここでの正則・共変な変更という仮定を外し、特異な境界項を持ち込む場合には、上の不変性証明を流用できません。

## 5. 面積が増えてもWald積分が増えるとは限らない

動的な地平線では、そもそも分岐Killing面の前提が失われます。仮に $f(R)$ 公式と同じ積分をある時間依存切片へ**候補として**延長しても、古典的な[面積非減少則](../../GR/GR36/index.md#thm-gr36-smooth-area)だけからその候補の非減少は出ません。

滑らかな生成線をラベル $y=(y^1,y^2)$ で固定し、それに沿うパラメータを $\lambda$、接ベクトルを $k=\partial/\partial\lambda$ とします。切片の誘導計量を $q_{AB}(\lambda,y)$ と書くと、面積要素は $dA(\lambda,y)=\sqrt{\det q_{AB}(\lambda,y)}\,d^2y$ です。

ここで $d/d\lambda$ は **$y$ を固定した生成線方向の微分**を表し、[GR36の面積密度輸送](../../GR/GR36/index.md#prop-gr36-area-transport)に従って $\theta=(d/d\lambda)\log\sqrt{\det q_{AB}}$ と置きます。

$f'(R)>0$ の場所では連鎖律によって

$$
\frac{d}{d\lambda}f'(R(\lambda,y))
=f''(R)k^a\nabla_aR
$$

です。面積要素の輸送 $\frac{d}{d\lambda}(dA)=\theta\,dA$ と合わせ、積の微分を展開すると

$$
\begin{aligned}
\frac{d}{d\lambda}\{f'(R)dA\}
&=\left[f''(R)k^a\nabla_aR+f'(R)\theta\right]dA\\
&=f'(R)dA\left[
\theta+\frac{d}{d\lambda}\log f'(R)\right].
\end{aligned}
$$

面積定理が $\theta\ge0$ を与えるとしても、括弧の第2項の符号は指定しません。例えば純粋に運動学的な比較用の関数として $dA=e^\lambda dA_0$、$f'(R)=e^{-2\lambda}$ を置けば、面積は増えるのに重み付き面積は $e^{-\lambda}dA_0$ へ減ります。**これは場の方程式を満たすブラックホールを構成した反例ではありません**。面積定理だけを根拠にした推論が成り立たないことを示す検査です。

実際の第二法則を論じるには、追加の場の方程式、物質のエネルギー条件、結合の正値性、摂動の次数、地平線の選択等が必要になります。適切な条件の $f(R)$ 模型では古典的な増大結果を得られる場合がありますが、ここで任意の高階曲率作用の一般定理としては述べません。極限地平線では分岐面がなく、$\kappa$ で割る[定常Noether式](../BHT19/index.md#thm-bht19-wald-charge)を直接使えません。

最後に、**量子補正は古典作用の高階曲率補正と同一ではありません**。上で扱った $f'(R)$ は選んだ局所的な古典作用の係数です。量子場の外部エントロピーや紫外発散、重力結合の繰り込みを含む一般化エントロピーには、状態・切片・正則化の指定が必要です。これは次講 BHT21 で独立に扱います。

| 問い | この講義で正当化した範囲 | 追加で必要なもの |
| --- | --- | --- |
| $f(R)$ のWald積分 | 定常・正則・非極限分岐面と局所作用 | 対象の計量が模型の解である検査 |
| 曲率微分の補正 | $\nabla R\cdot\nabla R$ 模型の曲率Euler微分 | 境界項を含む共変Noether構成 |
| 完全微分の曖昧さ | 正則・共変変更、固定生成場、閉じた分岐面 | 動的切片での電荷代表の指定 |
| 古典的第二法則 | 面積則だけでは重み付き面積を制御しない | 模型ごとの方程式・エネルギー条件 |
| 量子一般化エントロピー | 古典的Wald積分とは別の対象 | 量子状態・繰り込み・外部エントロピー |

## 6. 演習――係数、解、限界を自分で検査する

### Level A：曲率微分と条件の基本

<a id="ex-bht20-a01"></a>

#### BHT20-A01 曲率変数の反対称射影

- Level: A
- 問題: 4次元計量を固定し、$R=g^{ac}g^{bd}R_{abcd}$ の曲率変分 $\delta R_{abcd}=-\delta R_{abdc}$ を考える。$\delta R$ を反対称な係数で表し、$L=R/(16\pi G)$ の $E_R^{abcd}$ を求めよ。

<!-- solution-start -->
**詳細解答**：$c,d$ の交換で $\delta R_{abdc}=-\delta R_{abcd}$ だから

$$
\begin{aligned}
g^{ac}g^{bd}\delta R_{abcd}
&=\frac12\{g^{ac}g^{bd}\delta R_{abcd}
-g^{ad}g^{bc}\delta R_{abcd}\}\\
&=\frac12(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}.
\end{aligned}
$$

従って $\delta L=(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}/(32\pi G)$。係数は $E_R^{abcd}=(g^{ac}g^{bd}-g^{ad}g^{bc})/(32\pi G)$ です。
<!-- solution-end -->

<a id="ex-bht20-a02"></a>

#### BHT20-A02 双法線縮約から面積則

- Level: A
- 問題: 定常分岐面 $B$ の双法線 $\hat\epsilon_{ab}\hat\epsilon^{ab}=-2$ と、$E_R^{abcd}=c(g^{ac}g^{bd}-g^{ad}g^{bc})$（$c$ は面上のスカラー）を仮定する。Wald積分を計算せよ。$c=f'(R)/(32\pi G)$ の場合を明示せよ。

<!-- solution-start -->
**詳細解答**：$g^{ac}g^{bd}\hat\epsilon_{ab}\hat\epsilon_{cd}=-2$、交差した方は $+2$ なので

$$
E_R^{abcd}\hat\epsilon_{ab}\hat\epsilon_{cd}
=c(-2-2)=-4c.
$$

[Wald公式](../BHT19/index.md#def-bht19-wald-entropy)で $S_W=-2\pi\int_B(-4c)dA=8\pi\int_Bc\,dA$。$c=f'(R)/(32\pi G)$ を代入して $S_W=\int_Bf'(R)dA/(4G)$。$c$ を一定と仮定していないので、面内で変われば積分の中に残します。
<!-- solution-end -->

<a id="ex-bht20-a03"></a>

#### BHT20-A03 場の方程式の跡

- Level: A
- 問題: 真空 $f(R)$ 方程式 $f'R_{ab}-fg_{ab}/2+(g_{ab}\Box-\nabla_a\nabla_b)f'=0$ を4次元計量で縮約し、定曲率 $R=R_0$ での必要条件を求めよ。

<!-- solution-start -->
**詳細解答**：$g^{ab}R_{ab}=R$、$g^{ab}g_{ab}=4$、$g^{ab}\nabla_a\nabla_bf'=\Box f'$ により

$$
0=f'R-\frac12f\cdot4+4\Box f'-\Box f'
=f'R-2f+3\Box f'.
$$

$R_0$ が時空全体で一定なら $f'(R_0)$ も定数、よって $\Box f'(R_0)=0$。必要条件は $f'(R_0)R_0-2f(R_0)=0$ です。
<!-- solution-end -->

<a id="ex-bht20-a04"></a>

#### BHT20-A04 Ricci-flat解では補正が消える

- Level: A
- 問題: $f(R)=R+\alpha R^2$ とする。Ricci-flatで $R=0$ のSchwarzschild解がこの真空方程式も満たすかを検査し、非極限分岐面のWaldエントロピーを求めよ。

<!-- solution-start -->
**詳細解答**：$f(0)=0$、$f'(0)=1$ は定数です。$R_{ab}=0$ なら[場の方程式](#thm-bht20-fr-field-equation)の三項はそれぞれ $1\cdot0$、$-0\cdot g_{ab}/2$、$(g_{ab}\Box-\nabla_a\nabla_b)1=0$ なので解です。[定常f(R)のWald積分](#prop-bht20-fr-wald)から

$$
S_W=\frac1{4G}\int_B f'(0)\,dA=\frac{A_B}{4G}.
$$

$\alpha$ が零でなくてもこの解では補正が消えます。地平線の正則性と非極限性はSchwarzschildの質量 $M>0$ から別に満たされます。
<!-- solution-end -->

<a id="ex-bht20-a05"></a>

#### BHT20-A05 時空一定と面上一定を区別する

- Level: A
- 問題: $L=(R+\eta\nabla R\cdot\nabla R)/(16\pi G)$ に対する $\mathcal E_R^{abcd}$ の係数は $1-2\eta\Box R$ である。$R$ が時空全体で一定の場合と、$B$ 上だけ一定の場合を比べ、$\Box R=0$ が従うのはどちらか述べよ。

<!-- solution-start -->
**詳細解答**：時空全体の $R=R_0$ は $\nabla_aR=0$ を意味し、続いて $\Box R=\nabla^a\nabla_aR=0$ です。一方、$B$ 上で接方向の微分が零でも法線方向には変化でき、$\Box R$ には法線方向二階微分が入ります。

たとえば平坦時空の $B=\{T=X=0\}$ の近傍で、形式的な比較用スカラーを

$$
R_{\rm test}(T,X,Y,Z)=R_0+\gamma T^2
$$

と置くと、$B$ 上で一定なのに

$$
\left.\Box R_{\rm test}\right|_B
=\left.(-\partial_T^2+\partial_X^2+\partial_Y^2+\partial_Z^2)R_{\rm test}\right|_B
=-2\gamma
$$

です。これは実際の計量のRicciスカラーを構成した例ではなく、**面上一定だけでは法線微分を制御しない**という微分幾何学的な確認です。
<!-- solution-end -->

### Level B：場の方程式とNoetherの自由度

<a id="ex-bht20-b01"></a>

#### BHT20-B01 二乗模型の定曲率条件

- Level: B
- 問題: 4次元の $f(R)=R+\alpha R^2-2\Lambda$ 真空理論で、時空全体の $R=R_0$ と $f'(R_0)\ne0$ を仮定する。許容 $R_0$ と $R_{ab}$ を求め、分岐面が存在する場合の $S_W$ を求めよ。

<!-- solution-start -->
**詳細解答**：$f'(R_0)=1+2\alpha R_0$。[跡の条件](#thm-bht20-fr-field-equation)に代入すると

$$
\begin{aligned}
0&=(1+2\alpha R_0)R_0-2(R_0+\alpha R_0^2-2\Lambda)\\
&=R_0+2\alpha R_0^2-2R_0-2\alpha R_0^2+4\Lambda\\
&=-R_0+4\Lambda.
\end{aligned}
$$

よって $R_0=4\Lambda$。$f'(R_0)=1+8\alpha\Lambda\ne0$ のとき[テンソル方程式](#thm-bht20-fr-field-equation)より $R_{ab}=R_0g_{ab}/4=\Lambda g_{ab}$。正則な定常分岐面上では

$$
S_W=\frac{f'(4\Lambda)}{4G}A_B
=\frac{1+8\alpha\Lambda}{4G}A_B.
$$

これらは必要な局所方程式の整合であり、所望の漸近境界や非極限地平線の存在は別途検査します。
<!-- solution-end -->

<a id="ex-bht20-b02"></a>

#### BHT20-B02 曲率勾配の部分積分

- Level: B
- 問題: $L=[R+\eta\nabla_aR\nabla^aR]/(16\pi G)$ で、計量を固定して曲率だけを変分する。$\eta$ を定数とし、境界項を別に記録して有効曲率係数 $1-2\eta\Box R$ を導け。$R$ が時空一定のときも述べよ。

<!-- solution-start -->
**詳細解答**：スカラーには $\delta_R(\nabla_aR)=\nabla_a\delta R$ が成立するから

$$
16\pi G\,\delta_RL
=\delta R+\eta(2\nabla^aR\nabla_a\delta R).
$$

積の微分 $\nabla_a(\nabla^aR\,\delta R)=(\Box R)\delta R+\nabla^aR\nabla_a\delta R$ を代入し、

$$
16\pi G\,\delta_RL
=(1-2\eta\Box R)\delta R
+2\eta\nabla_a(\nabla^aR\,\delta R)
$$

を得ます。最後は全発散で境界へ移し、前者が曲率のEuler微分です。[反対称射影](#prop-bht20-fr-wald)を代入すると $\mathcal E_R^{abcd}=(1-2\eta\Box R)(g^{ac}g^{bd}-g^{ad}g^{bc})/(32\pi G)$。$R$ が時空一定なら $\nabla R=0$、$\Box R=0$、係数は $1$ に戻ります。
<!-- solution-end -->

<a id="ex-bht20-b03"></a>

#### BHT20-B03 完全微分を加えても第一法則は変わらない

- Level: B
- 問題: $\mathbf L'=\mathbf L+d\boldsymbol\mu$、$\boldsymbol\theta'=\boldsymbol\theta+\delta\boldsymbol\mu$、$\mathbf Q'_\xi=\mathbf Q_\xi+\iota_\xi\boldsymbol\mu$ とする。$\delta\xi=0$ とし、表面Hamiltonian変分の被積分2形式と、$\xi|_B=0$ の閉じた分岐面での電荷積分の変化をそれぞれ調べよ。

<!-- solution-start -->
**詳細解答**：固定した $\xi$ では $\delta(\iota_\xi\boldsymbol\mu)=\iota_\xi\delta\boldsymbol\mu$。従って

$$
\begin{aligned}
(\delta\mathbf Q'_\xi-\iota_\xi\boldsymbol\theta')
-(\delta\mathbf Q_\xi-\iota_\xi\boldsymbol\theta)
&=\delta(\iota_\xi\boldsymbol\mu)-\iota_\xi\delta\boldsymbol\mu\\
&=0.
\end{aligned}
$$

さらに $\xi|_B=0$ なら $\iota_\xi\boldsymbol\mu|_B=0$ なので $\int_B\mathbf Q'_\xi=\int_B\mathbf Q_\xi$。[BHT18の完全微分の自由度](../BHT18/index.md#prop-bht18-shift)とも一致し、解族の各点で $\xi$ まで変化させる計算ではないことが条件です。
<!-- solution-end -->

<a id="ex-bht20-b04"></a>

#### BHT20-B04 面積だけでは不十分

- Level: B
- 問題: 地平線の切片に対して候補量 $S(\lambda)=f'(\lambda)A(\lambda)/(4G)$ を考える。$A(\lambda)=A_0e^\lambda$、$f'(\lambda)=e^{-2\lambda}>0$、$A_0,G>0$ とする。$dA/d\lambda$ と $dS/d\lambda$ を計算し、この例が高階曲率理論の物理的第二法則に対する反例かどうか論じよ。

<!-- solution-start -->
**詳細解答**：積の微分から $dA/d\lambda=A_0e^\lambda>0$ です。一方

$$
S(\lambda)=\frac{A_0}{4G}e^{-2\lambda}e^\lambda
=\frac{A_0}{4G}e^{-\lambda},
\qquad
\frac{dS}{d\lambda}=-\frac{A_0}{4G}e^{-\lambda}<0.
$$

面積は増えても重み付き面積は減ります。しかし問題に与えた $A,f'$ は運動学的な関数であり、$f(R)$ 場の方程式、地平線生成線やエネルギー条件を満たすブラックホール解とは確認していません。従ってこれは「面積非減少だけでは $S$ の非減少を証明できない」という推論への反例であり、完成した物理理論の第二法則を否定する反例ではありません。
<!-- solution-end -->

<a id="ex-bht20-b05"></a>

#### BHT20-B05 作用と境界と量子を混同しない

- Level: B
- 問題: 次の主張を、それぞれ「定常Wald公式だけで支持できる」「追加仮定を要する」「別の量を定義する必要がある」のいずれかに分類し、理由を述べよ。
  1. 正則な非極限定常分岐面で $f(R)$ の $S_W$ を評価する。
  2. 同じ積分を任意の非定常切片で評価すれば必ず増大する。
  3. $f'(R)$ の補正を量子場の外部エントロピーと同一視する。
  4. 分岐面の生成場が零のとき、正則・共変な完全微分 $d\boldsymbol\mu$ による電荷の増分が零になる。

<!-- solution-start -->
**詳細解答**：

1. [定常 $f(R)$ 積分](#prop-bht20-fr-wald)の条件を満たし、対象が実際の解なら支持できます。積分中の $f'$ は面上一定でなくても構いません。
2. 追加仮定を要します。分岐Killing面という前提が失われ、仮に候補量を延長しても $d\log f'/d\lambda$ の符号を面積定理は拘束しません。
3. 別の量を定義する必要があります。$f'$ は局所古典作用の係数であり、量子外部エントロピーは状態・切片・正則化に依存します。
4. [完全微分の不変性](#prop-bht20-exact-shift)で支持できます。$\Delta Q_\chi=\iota_\chi\boldsymbol\mu$ が $\chi|_B=0$ で消えるためです。ただし任意の非共変・特異な境界変更まで含みません。
<!-- solution-end -->

### Level C：二乗模型を入口から出口まで

<a id="ex-bht20-c01"></a>

#### BHT20-C01 場の方程式、Wald積分、第二法則の射程

- Level: C
- 問題: 4次元真空作用 $I_f=(16\pi G)^{-1}\int(R+\alpha R^2-2\Lambda)\boldsymbol\epsilon$ を考え、$G>0$、$\alpha,\Lambda$ は定数、$1+8\alpha\Lambda>0$ とする。
  1. 計量固定の $E_R^{abcd}$ を導出する。
  2. 場の方程式の跡から定曲率 $R_0$ を決め、テンソル方程式が $R_{ab}=\Lambda g_{ab}$ へ帰着することを示す。
  3. この理論の正則・非極限定常分岐面 $B$ を持つ $R_{ab}=\Lambda g_{ab}$ 解があるとして、$S_W$ を求める。$\Lambda=0$ を比較する。
  4. $\Lambda\ne0$ のときにも、結論だけから任意の動的切片での非減少や量子一般化第二法則が従わない理由を、必要な仮定と区別して説明する。

<!-- solution-start -->
**詳細解答**：

1. $f'(R)=1+2\alpha R$ であり、$R=g^{ac}g^{bd}R_{abcd}$ の反対称変分は $\delta R=\tfrac12(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}$。従って

$$
E_R^{abcd}
=\frac{1+2\alpha R}{32\pi G}
(g^{ac}g^{bd}-g^{ad}g^{bc}).
$$

2. [真空場の方程式](#thm-bht20-fr-field-equation)を縮約し、$R=R_0$ が時空一定だから $\Box f'(R_0)=0$ とします。よって

$$
\begin{aligned}
0&=f'(R_0)R_0-2f(R_0)\\
&=(1+2\alpha R_0)R_0-2(R_0+\alpha R_0^2-2\Lambda)\\
&=-R_0+4\Lambda,
\end{aligned}
$$

従って $R_0=4\Lambda$。条件 $1+8\alpha\Lambda>0$ は特に $f'(R_0)\ne0$ を保証します。時空一定なので微分項が消え、

$$
R_{ab}=\frac{f(R_0)}{2f'(R_0)}g_{ab}
=\frac{R_0}{4}g_{ab}=\Lambda g_{ab}.
$$

3. 正則な定常分岐面で [Wald積分](#prop-bht20-fr-wald)を使います。双法線の縮約 $-4$ によって

$$
\begin{aligned}
S_W
&=-2\pi\int_B
\frac{1+2\alpha R_0}{32\pi G}(-4)\,dA\\
&=\frac{1+8\alpha\Lambda}{4G}A_B.
\end{aligned}
$$

$\Lambda=0$ の場合は $R_0=0$、$S_W=A_B/(4G)$ で、$\alpha R^2$ の作用を含んでもこの解での補正は消えます。

4. (3) は一つの定常分岐面上の積分であり、時間微分の符号を述べていません。動的な場合にはKilling性や分岐面を欠き、場の方程式、エネルギー条件、安定性、JKM型の代表選択等が必要です。さらに外部量子場のエントロピーは $f'(R_0)$ の古典作用係数と同一ではなく、量子状態と繰り込みの指定が必要です。正の $1+8\alpha\Lambda$ だけで、これらの不足条件を補うことはできません。
<!-- solution-end -->

## 7. 何が分かったか

- $f(R)$ 作用のWald積分は $S_W=(4G)^{-1}\int_Bf'(R)dA$。この値を得るには曲率の反対称射影と双法線の $-2$ が必要です。
- $R+\alpha R^2-2\Lambda$ 模型で定曲率解を使うなら、跡の方程式から $R_0=4\Lambda$ を先に検査します。Ricci-flat解ではこの二乗項による補正が消えます。
- 曲率の導関数を含む作用では、単純な偏微分を部分積分後の**曲率Euler微分**へ置き換えなければなりません。
- 正則な分岐面では完全微分・正則共変な電荷代表による平衡積分の不変性を確かめられます。しかし非定常切片の候補、古典的な第二法則、量子一般化エントロピーはそれぞれ追加の問いです。

**次講 BHT21** では、量子場の外部エントロピーを加えると何を繰り込み、何を固定しなければならないかを調べます。

参考文献（証明・演習は本章で独自に構成）：[Wald (1993)](https://arxiv.org/abs/gr-qc/9307038)、[Iyer–Wald (1994)](https://arxiv.org/abs/gr-qc/9403028)、[Jacobson–Kang–Myers (1994)](https://arxiv.org/abs/gr-qc/9312023)。
