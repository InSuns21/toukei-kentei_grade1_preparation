# GR36 地平線の面積非減少の仮定

<!-- definition-example-audit: strict -->

[GR29の未来事象地平線](../GR29/index.md#def-gr29-event-horizon)は、未来零無限遠へ信号を送れる領域の境界でした。[GR34の光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)と[GR35の零エネルギー条件](../GR35/index.md#def-gr35-nec)を組み合わせると、光線束には集束する向きの効果が働きます。それなのに、ブラックホールの地平線の面積は古典論では減らない、といわれます。**集束するのに面積が減らない**のは矛盾でしょうか。

鍵は、普通の入射光線束と、未来事象地平線の境界上に居続ける光線を区別することです。前者は焦点を作っても構いません。後者が未来に焦点を作ると、境界の非時間的性質と衝突します。ただし、その焦点へ届く前に生成光線が途切れるなら矛盾は生じません。この「途切れない」という大域的仮定を明示し、局所の微分方程式から断面積の比較まで橋を架けます。

以下、時空 $(M,g)$ は時間向き付きの滑らかな四次元Lorentz多様体、符号は $(-,+,+,+)$ とし、原則 $G=c=1$ を使います。$R_{ab}$ は[GR6のRicci符号](../GR6/index.md#prop-gr6-coordinate-curvature)、$\lambda$ は光的測地線のアフィンパラメータです。物質のエネルギー運動量テンソルを $T_{ab}$ と書き、宇宙項 $\Lambda$ はEinstein方程式の左辺に置きます。

## 1. 一枚の断面から、次の断面の面積を調べる

まず滑らかな零超曲面 $\mathcal H$ の小領域だけを考えます。零超曲面とは、誘導計量が退化し、その法線が同時に接方向でもある三次元の超曲面です。未来向き零接ベクトル場 $k$ をその生成方向に取り、$\nabla_k k=0$ となるよう局所的にアフィン規格化します。

光線束に横断する二つの座標 $y^1,y^2$ を付け、$y^A$ が一定の曲線を生成光線とします。$\lambda$ 一定の二次元切断 $S_\lambda$ の座標接ベクトル $e_A=\partial_{y^A}$ を取り、誘導計量の成分を $q_{AB}(\lambda,y)=g(e_A,e_B)$ と書きます。この正定値 $2\times2$ 行列が各座標方向の長さ・内積を表し、その面積密度を

$$
dA_\lambda=\sqrt{\det(q_{AB})}\,dy^1dy^2
$$

とします。正定値性は切断が空間的であることから従います。これを確認しないまま $\sqrt{\det q}$ を面積と呼ぶことはできません。

ここで[GR29の零法線の膨張率](../GR29/index.md#def-gr29-null-expansion)および[GR34の面積変化率](../GR34/index.md#prop-gr34-volume-area)を使うと、スクリーンの膨張 $\theta$ は各生成光線に沿った面積密度の対数微分です。ただし本章では、断面を実際に動かすときの中間計算を示しておきます。

<a id="prop-gr36-area-transport"></a>

<!-- formal-statement-start -->
> **命題（滑らかな生成光線に沿う面積密度）**
> 四次元Lorentz時空の滑らかな零超曲面の領域に、アフィンパラメータ $\lambda$ を持つ未来向き生成光線合同があり、$\lambda$ 一定の空間的二次元切断 $S_\lambda$ が滑らかに存在するとする。生成光線に沿って運ぶ座標 $y^1,y^2$ で切断の計量を $q_{AB}$ と書き、$\theta$ をこの合同の光的膨張率とすると、

$$
\frac{d}{d\lambda}\sqrt{\det q}
=\theta\sqrt{\det q},\qquad
\sqrt{\det q(\lambda,y)}
=\sqrt{\det q(\lambda_0,y)}
\exp\left(\int_{\lambda_0}^{\lambda}\theta(s,y)\,ds\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

面積密度は二次元計量の行列式の平方根です。行列式の微分からトレースを取り出し、トレースが膨張率に一致することを確認します。最後に各生成光線上で一階微分方程式を積分します。

<!-- proof-start -->
### 証明

生成光線とともに座標を運んでいるので $[k,\partial_{y^A}]=0$ です。計量両立性とねじれのない接続から

$$
\begin{aligned}
\partial_\lambda q_{AB}
&=k\bigl(g(\partial_{y^A},\partial_{y^B})\bigr)\\
&=g(\nabla_{\partial_{y^A}}k,\partial_{y^B})
+g(\partial_{y^A},\nabla_{\partial_{y^B}}k).
\end{aligned}
$$

零超曲面の生成方向には回転がないため、右辺はスクリーン上の対称変形 $2B_{(AB)}$ に等しく、そのトレースが $\theta=\frac12q^{AB}\partial_\lambda q_{AB}$ です。$q$ は正定値で可逆です。二行二列の対称行列では $\det q=q_{11}q_{22}-q_{12}^2$ を各成分で微分し、逆行列を代入すると

$$
\begin{aligned}
\frac{d}{d\lambda}\log\sqrt{\det q}
&=\frac{1}{2}\operatorname{tr}\!\left(q^{-1}\frac{dq}{d\lambda}\right)\\
&=\frac12q^{AB}\partial_\lambda q_{AB}
=\theta.
\end{aligned}
$$

各 $y$ で積分すると $\log(\sqrt{\det q(\lambda,y)}/\sqrt{\det q(\lambda_0,y)})=\int_{\lambda_0}^{\lambda}\theta(s,y)\,ds$ となります。指数を取って主張を得ます。
<!-- proof-end -->

**直接例：半径が変わる丸い球面。** 半径 $r(\lambda)>0$ の球面の角度方向の線素は $r^2(d\vartheta^2+\sin^2\vartheta\,d\varphi^2)$ です。従って座標基底 $(\partial_\vartheta,\partial_\varphi)$ に計量を制限すると $q_{AB}=r^2\operatorname{diag}(1,\sin^2\vartheta)$ になります。$0<\vartheta<\pi$ の座標域では両対角成分が正で、確かに空間的な切断です。$\sqrt{\det q}=r^2\sin\vartheta$、$\theta=2r'/r$ なので、

$$
\frac{d}{d\lambda}(r^2\sin\vartheta)
=2rr'\sin\vartheta
=\frac{2r'}r\,r^2\sin\vartheta.
$$

成分計算と面積の定義が一致します。$r'<0$ のときは面積が減ります。ここまでの命題は**任意の滑らかな零光線束**についての局所結果であって、まだ地平線の面積定理ではありません。

## 2. 集束だけでは面積非減少を証明できない

零超曲面に接する零生成光線の回転は零です。これは零超曲面が局所的に一つの関数の等位面として表され、生成方向がその法線に比例するためであり、一般の光的合同すべてに回転零を要求しているわけではありません。[GR34の光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)に $\omega_{ab}=0$ を代入すると、

$$
\frac{d\theta}{d\lambda}
=-\frac12\theta^2-\sigma_{ab}\sigma^{ab}-R_{ab}k^ak^b.
$$

ここで $\sigma_{ab}$ は二次元スクリーン上のせん断で、$\sigma_{ab}\sigma^{ab}\ge0$ です。また[GR35のRicci集束条件への換算](../GR35/index.md#prop-gr35-ricci-convergence)により、Einstein方程式が成立するとき

$$
R_{ab}k^ak^b=8\pi T_{ab}k^ak^b
$$

です。$\Lambda g_{ab}k^ak^b=0$ なので宇宙項の符号はこの縮約へ直接現れません。

<a id="def-gr36-null-convergence"></a>

<!-- formal-statement-start -->
> **定義（光的Ricci集束条件）**
> Lorentz時空 $(M,g)$ の指定した領域で、各点のすべての非零光的ベクトル $k$ に対して

$$
R_{ab}k^ak^b\ge0
$$

> が成立するとき、その領域は光的Ricci集束条件（null convergence condition, NCC）を満たすという。Einstein方程式が成り立つなら、[零エネルギー条件](../GR35/index.md#def-gr35-nec)はこの条件と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr36-null-convergence -->
**定義の確認**：Schwarzschild真空外部。[GR16のSchwarzschild真空解](../GR16/index.md#thm-gr16-schwarzschild)では $R_{ab}=0$ です。ゆえに任意の点・任意の非零光的 $k$ について $R_{ab}k^ak^b=0\ge0$。特定方向だけの代入ではなく、全光的方向について等号で成立することを確認しました。真空でも束のせん断や初期膨張が非零なら、Raychaudhuri式の右辺は負になり得ます。
<!-- definition-example-end -->

NCCの下ではせん断項も非負なので

$$
\frac{d\theta}{d\lambda}\le-\frac12\theta^2
$$

です。これは「膨張率は増えにくい」と言うだけであって、$\theta\ge0$ を直接意味しません。実際、初めから $\theta<0$ の入射光線束は、ますます縮みます。以下でいう焦点は、[GR34の光的偏差行列](../GR34/index.md#thm-gr34-null-raychaudhuri)で表した二本の横断Jacobi場が線形従属となり、横断面積が零になる位置です。

<a id="lem-gr36-negative-expansion"></a>

<!-- formal-statement-start -->
> **補題（負の膨張率と有限アフィン長の焦点）**
> 四次元Lorentz時空の滑らかな回転零のアフィン媒介光的測地線合同について、ある生成光線上で $R_{ab}k^ak^b\ge0$ とし、$\lambda_0$ で $\theta_0:=\theta(\lambda_0)<0$ とする。合同が滑らかで面積密度が正である状態を保てるのは、長くとも

$$
\lambda-\lambda_0<\frac{2}{|\theta_0|}
$$

> の範囲である。さらに、生成測地線と横断Jacobi場が滑らかな時空内でその上界まで延長できる場合、その時刻までに横断Jacobi写像が退化して焦点（caustic）に達する。延長可能性を仮定しない場合、この不等式だけで焦点への実際の到達や時空の測地完備性は結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

負の $\theta$ に対してその逆数を微分すると一定の下界が出ます。有限の時刻で逆数が零へ達するため、滑らかで正の面積密度を持つ合同をそこまで延ばせません。[GR34の有限集束評価](../GR34/index.md#prop-gr34-focusing)を、地平線へ適用するために光的な場合へ限定した形です。

<!-- proof-start -->
### 証明

[GR34の光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)と回転零・NCCより、$\theta<0$ の区間では $\theta'\le-\theta^2/2<0$ です。初期値 $\theta_0<0$ から始めると滑らかな解が続く間は負のままなので、その区間で

$$
\frac{d}{d\lambda}\frac1\theta
=-\frac{\theta'}{\theta^2}\ge\frac12.
$$

初期値から積分すると

$$
\frac1{\theta(\lambda)}
\ge\frac1{\theta_0}+\frac{\lambda-\lambda_0}{2}.
$$

もし $\lambda-\lambda_0=2/|\theta_0|$ まで $\theta$ が有限の負値であり続ければ、左辺は負、右辺は零となって矛盾します。したがってそれ以前に $\theta\to-\infty$、または合同の滑らかな正面積表示が破れます。

焦点への接続も計算しておきます。$T:=2/|\theta_0|$、$t:=\lambda-\lambda_0$ とすると、滑らかで $\theta<0$ の間は直前に得た $1/\theta$ の評価から $1/\theta\ge-(T-t)/2$。両辺が負なので逆数を取ると $\theta\le-2/(T-t)$ です。[面積密度の輸送式](#prop-gr36-area-transport) $a'/a=\theta$ を $0\le t<T$ で積分して

$$
\begin{aligned}
\log\frac{a(\lambda_0+t)}{a(\lambda_0)}
&\le\int_0^t\frac{-2}{T-s}\,ds
=2\log\left(1-\frac tT\right),\\
0<a(\lambda_0+t)&\le a(\lambda_0)\left(1-\frac tT\right)^2.
\end{aligned}
$$

従って測地線と横断Jacobi場が $t=T$ まで滑らかに延長できれば、面積密度はそれ以前に零になるか、$t\uparrow T$ で零へ収束します。横断Jacobi写像の行列式が零となるので焦点を生じます。途中で時空や測地線そのものが終わるなら、この推論で「実際に焦点へ到達した」とは言えません。焦点は個々の測地線の曲率特異性とも異なります。
<!-- proof-end -->

**直接例：平坦時空へ内向きに進む球面光線。** Minkowski時空の球面 $r(0)=R>0$ から $k=\partial_t-\partial_r$ で光を内向きに進めると、$\lambda=t$ をアフィンパラメータとして $r(\lambda)=R-\lambda$。すると

$$
\theta=\frac{2r'}r=-\frac{2}{R-\lambda},
\qquad
\theta_0=-\frac2R,
\qquad
\lambda_{\mathrm{focal}}=R=\frac2{|\theta_0|}.
$$

曲率は零でNCCを満たしますが、$\lambda=R$ で球面は一点へ潰れます。**有限長で焦点へ進む入射束は、未来まで地平線生成線として続く束ではない**のです。この反例によりNCCだけから任意の光束の面積非減少を主張できないことも分かります。

## 3. 地平線で使う大域的な二つの条件

[未来事象地平線の定義](../GR29/index.md#def-gr29-event-horizon)で $\mathcal H^+=\partial J^-(\mathscr I^+)$ としたとき、それは因果到達領域の境界です。未来事象地平線の滑らかな部分は零超曲面となり、生成光線に沿って並びます。ただし一般の地平線は生成線が途中から加わる合流点（crease）を持ち得て、全体が一枚の滑らかな超曲面とは限りません。

境界が**非時間的（achronal）**とは、その境界の相異なる二点を未来向き時間的曲線で結べないことです。これは[LORG9の因果条件](../../../幾何系/LORG/LORG9/index.md#def-lorg9-causal)や[LORG16の大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)と同じ条件ではありません。大域双曲性は強い因果制御を与えますが、どんな地平線にも自動的に完全性が従うと扱ってはいけません。

地平線の生成光線の「未来完備性」は、境界に沿って進めたアフィンパラメータが有限値で打ち切られず、未来方向に無限大まで延びることです。通常の座標時刻 $v$ が無限に取れるというだけではアフィン完備性の証明にはなりません。

<a id="def-gr36-generator-completeness"></a>

<!-- formal-statement-start -->
> **定義（地平線生成線の未来アフィン完備性）**
> 時間向き付きLorentz時空の未来事象地平線 $\mathcal H^+$ に含まれる未来向き光的測地線生成子 $\gamma:[\lambda_0,b)\to\mathcal H^+$ を考え、$\lambda$ をアフィンパラメータとする。未来向きに非延長な各生成子について $b=+\infty$ と取れるとき、$\mathcal H^+$ の生成線は未来アフィン完備であるという。これは時空全体の全測地線が完備であるという仮定より弱い。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr36-generator-completeness -->
**定義の確認**：定常Schwarzschildの未来地平線。[GR26の正則計量](../GR26/index.md#prop-gr26-ef-metric-domain)を入射Eddington–Finkelstein座標 $(v,r)$ で使います。地平線の半径は $r_s=2M$ です。$f(r)=1-r_s/r$ として $\Gamma^v_{vv}=f'/2$、$\Gamma^r_{vv}=ff'/2$ を計算し、$r=r_s$ へ代入します。生成方向を $\xi=\partial_v$ とすると、

$$
\nabla_\xi\xi=\kappa\xi,\qquad
\kappa=\frac1{2r_s}>0.
$$

よって $v$ はアフィンパラメータではありません。真のアフィンパラメータ $\lambda$ に対して $k=(dv/d\lambda)\xi$ と置き、$\nabla_k k=0$ を代入すると

$$
\frac{d^2v}{d\lambda^2}
+\kappa\left(\frac{dv}{d\lambda}\right)^2=0.
$$

これを積分して $dv/d\lambda=1/(\kappa\lambda)$（原点を選び直した場合）、さらに

$$
\lambda=C e^{\kappa v}
=C e^{v/(2r_s)},\qquad C>0
$$

を得ます。$v\to+\infty$ のとき $\lambda\to+\infty$ となるので、未来の定常地平線生成子は未来アフィン完備です。座標時刻が無限に延びるだけでなく、アフィン長自体の発散を確認しました。
<!-- definition-example-end -->

もう一つ必要なのは、滑らかな事象地平線上で初期切断に対する焦点（横断Jacobi写像の退化点）ができた後、同じ光線が非時間的境界の生成線のまま未来へ延びることはできない、という因果幾何の性質です。焦点以降は初期切断からの零曲線が時間的曲線で置き換えられるため、境界を生成し続ける性質と両立しません。この「焦点以降は境界生成線ではない」という因果幾何の補題そのものは、本章では必要な大域的入力として用います。大域双曲性の定義だけから機械的に導かれる一行の計算ではありません。

## 4. 面積が減らない核心機構

まず生成線が途中で合流・分岐せず、二つの空間的切断の間で滑らかに存在する区間について、証明を閉じます。各切断のコンパクト性を仮定するのは、全断面積の有限性と積分の交換を確保するためです。

<a id="thm-gr36-smooth-area"></a>

<!-- formal-statement-start -->
> **定理（滑らかな未来地平線の面積非減少）**
> 四次元の時間向き付き滑らかなLorentz時空 $(M,g)$ に、未来事象地平線の滑らかな零超曲面部分 $\mathcal H$ があるとする。次を仮定する。
>
> 1. $\mathcal H$ は非時間的境界の一部で、生成光線に焦点が生じた後はその光線が $\mathcal H$ の生成線であり続けられない。
> 2. 各未来向き光的生成線は、$\mathcal H$ 内で未来アフィン完備である。
> 3. $\mathcal H$ 上のすべての非零光的方向について $R_{ab}k^ak^b\ge0$ が成り立つ。
> 4. 比較する二つの切断 $S_0,S_1$ は滑らかでコンパクトな空間的二次元曲面で、各生成光線とそれぞれちょうど一度交わり、その間の生成線による対応は滑らかな微分同相である。
>
> $S_1$ が生成線の未来側にあるなら、面積は

$$
\boxed{\operatorname{Area}(S_1)\ge\operatorname{Area}(S_0)}
$$

> を満たす。各生成線上では膨張率 $\theta\ge0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

もし地平線のどこかで $\theta<0$ なら、[負の膨張率と有限アフィン長の焦点](#lem-gr36-negative-expansion)により有限の未来で焦点ができます。未来完備性により生成線はそこまで地平線上に存在するはずですが、非時間的境界は焦点以降の光線を生成線として保持できません。したがって $\theta\ge0$。あとは各生成線の[滑らかな生成光線に沿う面積密度](#prop-gr36-area-transport)を切断全体で積分します。

<!-- proof-start -->
### 証明

各点 $p\in\mathcal H$ の生成方向を未来アフィン接ベクトル $k$ とします。零超曲面に直交する光的生成線合同だから回転は零です。仮定3から[Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)は

$$
\theta'=-\frac12\theta^2-\sigma_{ab}\sigma^{ab}
-R_{ab}k^ak^b\le-\frac12\theta^2
$$

を満たします。仮に $p$ で $\theta(p)<0$ なら、[負の膨張率の補題](#lem-gr36-negative-expansion)を $\lambda_0=\lambda(p)$ として適用し、遅くとも $2/|\theta(p)|$ のアフィン長以内に焦点が生じます。仮定2により生成子は未来のその位置まで滑らかな $\mathcal H$ 上に延び、横断Jacobi場もそこで定義できます。従って補題の焦点到達に必要な延長可能性が満たされます。一方、仮定1により焦点以降には同じ非時間的境界の生成線でいられません。両者は矛盾するので、$\theta(p)\ge0$ です。$p$ は任意でした。

次に仮定4で生成線を局所的に $y=(y^1,y^2)$ とラベル付けし、両切断との交点のアフィン値を $\lambda_0(y)<\lambda_1(y)$ とします。切断のアフィン値は $y$ に依存して構いません。実際、各 $S_i$ の接ベクトルは $e_A^{(i)}=\partial_{y^A}+(\partial_A\lambda_i)k$ ですが、零超曲面では $g(k,\partial_{y^A})=g(k,k)=0$ なので

$$
g(e_A^{(i)},e_B^{(i)})=g(\partial_{y^A},\partial_{y^B})=q_{AB}(\lambda_i(y),y),\quad i=0,1.
$$

したがって切断上の面積密度は生成方向へ運んだ $q$ で計算できます。[滑らかな生成光線に沿う面積密度](#prop-gr36-area-transport)を各線に適用すると、その面積密度の比は

$$
J(y)=\exp\left(\int_{\lambda_0(y)}^{\lambda_1(y)}
\theta(\lambda,y)\,d\lambda\right)\ge1.
$$

生成線による対応が滑らかな微分同相なので、同じ $y$ を使う各座標域で面積を比較できます。コンパクトな切断全体は有限個の座標域と分割統一で覆い、各域の積分を足せばよいので、

$$
\begin{aligned}
\operatorname{Area}(S_1)
&=\int_{S_0}J(y)\,dA_0(y)\\
&\ge\int_{S_0}1\,dA_0(y)
=\operatorname{Area}(S_0).
\end{aligned}
$$

これは面積非減少の主張です。途中に生成線が新しく加わる非滑らかな部分をこの微分同相の証明へ黙って含めてはいません。
<!-- proof-end -->

この定理の構造は、**NCC → 負の膨張なら有限焦点 → 完備な非時間的境界には焦点を保持できない → 非負膨張 → 非減少面積**です。局所の不等式だけでは途中の二つの大域的な矢印が欠けます。

実際の形成地平線には、過去側から新しい生成線が入る非滑らかな集合があります。このとき単純な生成線同士の一対一対応は全域では存在しません。適切な因果的・漸近的予測可能性、正則な切断およびNCCの下で、その寄与も面積を減らさないことを示すのが、非滑らかな事象地平線への面積定理の拡張です。一般のLipschitz地平線の測度論的な面積公式と生成線の構造を扱う定理には、例えば [Chruściel–Delay–Galloway–Howard, *Regularity of Horizons and the Area Theorem*](https://arxiv.org/abs/gr-qc/0001003) があります。そこでは未来生成線完備性など、いくつかの十分な大域的条件が区別されています。本章の滑らかな定理を、その仮定抜きで非滑らかな全事象地平線の証明と取り違えないでください。

## 5. Schwarzschildと入射Vaidyaで直接検算する

### 5.1 Schwarzschildの未来地平線は面積一定

[GR29のSchwarzschild地平線判定](../GR29/index.md#prop-gr29-schwarzschild-coincidence)では、未来事象地平線は $r=r_s=2GM/c^2$ です。丸い切断の面積は

$$
A=4\pi r_s^2=\frac{16\pi G^2M^2}{c^4}.
$$

定常Schwarzschild解では $M$ が一定なので、各切断の面積も一定です。幾何単位 $G=c=1$ では $A=16\pi M^2$。生成線は $r'=0$ で、[球対称二球面の零膨張率](../GR29/index.md#prop-gr29-spherical-expansion)から $\theta=2k(r)/r=0$ となります。NCCは真空で等号です。

注意すべきは、異なる質量 $M_0,M_1$ の**別々の定常解**を並べた $A_1-A_0$ は、一つの時空内の時間変化の計算ではないことです。ブラックホールが形成・成長するなら、その途中の非定常時空を調べる必要があります。

### 5.2 入射Vaidyaでは形成過程を比較できる

[GR29のVaidya模型](../GR29/index.md#prop-gr29-vaidya-separation)を再利用します。入射零時刻 $v$ を長さ次元に取り、滑らかな非減少関数 $a(v)>0$ は $v\ge v_1$ で定数 $a_1$ になるとします。計量と出射零方向は

$$
\begin{aligned}
ds^2&=-f(v,r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,\\
f(v,r)&=1-\frac{a(v)}r,\\
\ell&=\partial_v+\frac f2\partial_r.
\end{aligned}
$$

この模型で物質の符号も確認します。[GR30の入射Vaidya計量の物質源](../GR30/index.md#prop-gr30-vaidya-source)より、$\Lambda=0$ のEinstein方程式に対応するテンソルは $T_{ab}=\frac{a'(v)}{8\pi r^2}(dv)_a(dv)_b$ です。任意の光的 $k$ に対して

$$
T_{ab}k^ak^b=\frac{a'(v)}{8\pi r^2}(k^v)^2\ge0
$$

となるので、$r>0$ と $a'\ge0$ の下では全光的方向にNEC、従ってNCCが成立します。

未来の定常地平線から過去へ辿った事象地平線を $r=r_E(v)$ とすると、$\ell$ が接することから

$$
\frac{dr_E}{dv}=\frac12\left(1-\frac{a(v)}{r_E(v)}\right),
\qquad r_E(v_1)=a_1
$$

です。[Vaidyaの限界面と未来事象地平線の分離](../GR29/index.md#prop-gr29-vaidya-separation)により、過去へ遡る検討区間で $r_E(v)\ge a(v)$ です。$v$ はここではアフィンパラメータとは限りませんが、面積の増減の符号は正のパラメータ変更で変わりません。球面積を微分すると

$$
\begin{aligned}
A_E(v)&=4\pi r_E(v)^2,\\
\frac{dA_E}{dv}
&=8\pi r_E\frac{dr_E}{dv}\\
&=4\pi r_E\left(1-\frac{a(v)}{r_E(v)}\right)
=4\pi(r_E-a)\ge0.
\end{aligned}
$$

同じ計算を膨張率で書けば

$$
\theta_{(\ell)}=\frac2{r_E}\ell(r_E)
=\frac{r_E-a}{r_E^2}\ge0,\qquad
\frac1{A_E}\frac{dA_E}{dv}=\theta_{(\ell)}.
$$

$a'(v)>0$ の流入域だけでなく、それより前の $a'=0$ の区間でも、将来流入が予告されているなら $r_E>a$ となり、事象地平線の面積は既に増え得ます。これが地平線の**大域的な未来依存性**です。逆に、$r=a(v)$ という限界外向き捕獲面の管と、真の未来事象地平線を同一視するとこの効果を見落とします。

## 6. 仮定を外したときの結論の限界

| 条件・構造 | 証明内での役割 | 外すと何が起こるか |
|---|---|---|
| 光的Ricci集束条件 | $\theta'\le-\theta^2/2$ を保証 | 負のRicci縮約があれば集束補題の上界を導けない。面積減少が必然という意味ではない |
| 地平線生成線の未来アフィン完備性 | 予測される焦点まで生成線を延ばす | 光線が先に終われば非時間的境界との矛盾が作れない |
| 非時間的境界の生成線 | 焦点の後に境界生成子ではいられない | 平坦時空の入射球面のように焦点まで収縮できる |
| 滑らかな切断と一対一の生成線対応 | 面積密度を同じラベルで積分 | 合流点では追加の測度論的・大域的議論が必要 |

この表の条件は「宇宙に存在する全ブラックホールが必ず満たす」と証明されたものではありません。量子場が局所的なNECを破る場合や、未来の特異な因果構造を認める場合などに、同じ古典論の証明をそのまま適用できません。また地平線の面積は温度・エントロピーと同一の概念ではありません。後者との関係はブラックホール熱力学の講座で改めて扱います。

## 7. 演習：局所集束から大域面積へ

### Level A：式と条件を一つずつ確かめる

<a id="ex-gr36-a01"></a>
#### GR36-A01 Schwarzschild断面積の単位
- Level: A

質量 $M>0$ のSchwarzschild未来地平線について、$r_s=2GM/c^2$ から面積を求め、$[G]=L^3M^{-1}T^{-2}$、$[c]=LT^{-1}$ を使って長さの二乗の次元になることを示せ。

<!-- solution-start -->
**詳細解答。** 半径 $r_s$ の丸い二球面の面積は $4\pi r_s^2$ なので

$$
A=4\pi\left(\frac{2GM}{c^2}\right)^2
=\frac{16\pi G^2M^2}{c^4}.
$$

次元を順に計算すると

$$
[G^2M^2/c^4]
=\frac{(L^3M^{-1}T^{-2})^2M^2}{(LT^{-1})^4}
=\frac{L^6T^{-4}}{L^4T^{-4}}=L^2.
$$

したがって面積の物理次元と一致します。定常解の同じ $M$ に沿う未来切断間では $A$ は一定です。
<!-- solution-end -->

<a id="ex-gr36-a02"></a>
#### GR36-A02 面積要素から膨張率へ
- Level: A

滑らかな光線束の空間的切断が $q_{AB}(\lambda)=\operatorname{diag}(e^{2u(\lambda)},e^{2w(\lambda)})$ を持つとする。面積密度と膨張率 $\theta$ を求めよ。

<!-- solution-start -->
**詳細解答。** $q$ は両対角成分が正なので正定値です。行列式は $e^{2u+2w}$ なので、面積密度 $a=e^{u+w}$。従って

$$
\frac{a'}a=\frac{e^{u+w}(u'+w')}{e^{u+w}}
=u'+w'.
$$

また $q^{AB}\partial_\lambda q_{AB}/2=(2u'+2w')/2=u'+w'$ です。[面積密度の命題](#prop-gr36-area-transport)の二つの表現が直接一致しました。
<!-- solution-end -->

<a id="ex-gr36-a03"></a>
#### GR36-A03 負の膨張率の焦点時刻
- Level: A

回転零のアフィン光的合同がNCCを満たし、$\theta(0)=-1/L$（$L>0$ は長さ）とする。滑らかな束が正の面積密度を保てるアフィン長の上界を求めよ。

<!-- solution-start -->
**詳細解答。** [負の膨張率の集束補題](#lem-gr36-negative-expansion)へ $\lambda_0=0,\theta_0=-1/L$ を代入します。

$$
T=\frac{2}{|-1/L|}=2L.
$$

従って滑らかな正面積密度の合同はアフィン長 $2L$ 以降まで維持できません。生成測地線と横断Jacobi場がその時刻まで延長できる場合は、$\lambda_{\rm focal}\le2L$ と結論できます。これは曲率特異点や測地不完備性への到達時刻ではありません。回転零・アフィン媒介・NCCのいずれかが欠けるならこの評価はそのまま適用できません。
<!-- solution-end -->

<a id="ex-gr36-a04"></a>
#### GR36-A04 宇宙項は光的縮約に寄与するか
- Level: A

$G_{ab}+\Lambda g_{ab}=8\pi T_{ab}$、$g(k,k)=0$ とする。$\Lambda$ が任意の定数でも、$R_{ab}k^ak^b=8\pi T_{ab}k^ak^b$ となることを示せ。

<!-- solution-start -->
**詳細解答。** $G_{ab}=R_{ab}-Rg_{ab}/2$ を代入して $k^ak^b$ で縮約すると

$$
R_{ab}k^ak^b
-\frac12R\,g_{ab}k^ak^b
+\Lambda g_{ab}k^ak^b
=8\pi T_{ab}k^ak^b.
$$

光的条件 $g_{ab}k^ak^b=0$ により、Ricciスカラー項も宇宙項も消えます。したがって所望の等式です。これは時間的 $v$ での縮約には一般に成立しません。
<!-- solution-end -->

<a id="ex-gr36-a05"></a>
#### GR36-A05 Vaidya地平線上の膨張
- Level: A

$f=1-a(v)/r$、$r_E'=f(v,r_E)/2$ とし、$r_E\ge a>0$ と仮定する。$A_E=4\pi r_E^2$ と $\theta_{(\ell)}=2r_E'/r_E$ の符号をそれぞれ計算せよ。

<!-- solution-start -->
**詳細解答。** 連鎖律と与えられた微分方程式により

$$
A_E'=8\pi r_E r_E'
=4\pi r_E f(v,r_E)
=4\pi(r_E-a)\ge0.
$$

膨張率も、$r_E'=f/2$ を代入すれば

$$
\theta_{(\ell)}=\frac{2r_E'}{r_E}
=\frac{f(v,r_E)}{r_E}
=\frac{r_E-a}{r_E^2}\ge0.
$$

$r_E>0$ なので分母の符号は正です。$r_E=a$ なら両者零、$r_E>a$ なら両者正です。
<!-- solution-end -->

### Level B：局所不等式と大域条件をつなぐ

<a id="ex-gr36-b01"></a>
#### GR36-B01 集束不等式を逆数で積分する
- Level: B

あるアフィン媒介光的合同で $\theta'<-\theta^2/2$ または $\theta'=-\theta^2/2$ が成立し、$\theta_0=-b<0$（$b>0$）とする。負の膨張率が有限のまま $\lambda_0+2/b$ を越えられないことを微分不等式の積分で示せ。

<!-- solution-start -->
**詳細解答。** 不等式を $\theta'\le-\theta^2/2$ とまとめます。$\theta(\lambda_0)=-b$ なので、有限の解が存在する間は $\theta$ は負のままです。そこで $h=1/\theta<0$ と置くと

$$
h'=-\frac{\theta'}{\theta^2}\ge\frac12.
$$

積分して $h(\lambda)\ge-1/b+(\lambda-\lambda_0)/2$。$\lambda=\lambda_0+2/b$ では右辺が零になり、有限の負値 $h$ と矛盾します。従ってそれ以前に負の膨張率が発散するか、滑らかな合同としての記述が失われます。単に「$\theta$ が減る」だけではこの有限時刻の結論は出ません。
<!-- solution-end -->

<a id="ex-gr36-b02"></a>
#### GR36-B02 複数生成線の面積を積分する
- Level: B

滑らかなコンパクト切断 $S_0$ から未来切断 $S_1$ への生成線対応が微分同相で、各線の輸送因子が $J(y)=\exp(\int_{\lambda_0(y)}^{\lambda_1(y)}\theta\,d\lambda)$ と表されるとする。$\theta\ge0$ から $A_1\ge A_0$ を示し、$\theta=0$ の場合を説明せよ。

<!-- solution-start -->
**詳細解答。** $\lambda_1(y)\ge\lambda_0(y)$ かつ $\theta\ge0$ なので積分は非負、指数関数の単調性から $J(y)\ge1$ です。対応が微分同相なので面積要素の変換を用いて

$$
A_1-A_0
=\int_{S_0}(J(y)-1)\,dA_0(y)\ge0.
$$

$\theta=0$ が全生成線の比較区間で成立すれば、$J(y)=e^0=1$ で $A_1=A_0$ です。逆に積分が有限で $A_1=A_0$、かつ連続な $J\ge1$ なら $J=1$ が全点で成立します。ここでは生成線が途中から加わる場合は仮定していません。
<!-- solution-end -->

<a id="ex-gr36-b03"></a>
#### GR36-B03 地平線でない入射束の反例
- Level: B

Minkowski時空で $r(0)=R>0$ の球面から出る未来向き入射光線を $r(\lambda)=R-\lambda$（$0\le\lambda<R$）とする。NCCと$\theta_0$を確認し、$\lambda=R$ の変化が滑らかな未来完備地平線に対する面積定理の反例にならない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 平坦時空なので $R_{ab}=0$ でNCC成立です。面積は $A(\lambda)=4\pi(R-\lambda)^2$、ゆえに

$$
\theta=\frac{A'}A
=\frac{-8\pi(R-\lambda)}{4\pi(R-\lambda)^2}
=-\frac2{R-\lambda}.
$$

従って $\theta_0=-2/R$。$\lambda\uparrow R$ で $A\to0$ となるものの、そこで全光線が中心へ達し横断Jacobi場が退化します。束はそのまま滑らかで一対一の零超曲面を構成し続けず、未来事象地平線の生成子として無限アフィン長まで境界上に留まる条件もありません。失われたのは未来完備な非時間的境界という大域的前提であって、NCCではありません。
<!-- solution-end -->

<a id="ex-gr36-b04"></a>
#### GR36-B04 流入前から増える事象地平線
- Level: B

入射Vaidya模型で $a'(v)=0$ が $v<v_0$ で成立し、$v_0<v<v_1$ の一部で $a'(v)>0$、$v\ge v_1$ では $a(v)=a_1$ とする。[GR29の終端値積分表示](../GR29/index.md#prop-gr29-vaidya-separation)を用いて、$v<v_0$ の十分近い時刻でも $r_E(v)>a(v)$ となる理由と、面積微分の符号を示せ。

<!-- solution-start -->
**詳細解答。** [GR29の終端値積分表示](../GR29/index.md#prop-gr29-vaidya-separation)を導き直します。$\delta(v)=r_E(v)-a(v)$ とすると、出射零光線の方程式より

$$
\delta'=\frac12\left(1-\frac{a}{r_E}\right)-a'
=\frac{\delta}{2r_E}-a'.
$$

従って $q(v)=1/(2r_E(v))$ とおいた線形方程式 $\delta'-q\delta=-a'$ を、終端条件 $\delta(v_1)=0$ から積分因子で解くと

$$
\delta(v)=\int_v^{v_1}a'(s)
\exp\left(-\int_v^s\frac{du}{2r_E(u)}\right)ds.
$$

指数因子は正、$a'(s)\ge0$ で、$[v_0,v_1]$ のある部分で厳密に正なので、$v<v_0$ でも右辺は厳密に正です。$a'(v)=0$ なのは**現在の局所的な流入がない**というだけで、未来の境界位置を固定しません。そこで

$$
\frac{dA_E}{dv}=4\pi(r_E-a)=4\pi\delta(v)>0.
$$

局所的に質量が一定であっても、未来の流入に依存する事象地平線の面積はこの区間で増えます。
<!-- solution-end -->

### Level C：仮定と計算を組み合わせる

<a id="ex-gr36-c01"></a>
#### GR36-C01 古典面積定理の条件を検証する
- Level: C

四次元時空の滑らかな未来事象地平線に、コンパクトな切断 $S_0,S_1$ と一対一の生成線対応がある。生成線は未来アフィン完備、地平線は非時間的境界、すべての生成線に沿い $R_{ab}k^ak^b\ge0$ とする。

1. $\theta(p)<0$ と仮定して焦点へのアフィン長を評価し、非時間的境界との矛盾までの論理を示せ。
2. 面積密度の輸送式を使い、$A_1\ge A_0$ を導け。
3. 一般の非滑らかな形成地平線へ同じ証明を無条件に適用できない理由を述べ、定常Schwarzschild地平線との比較を行え。

<!-- solution-start -->
**詳細解答。**

**（1）** 滑らかな零超曲面の生成線は回転零なので、[光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)とNCCから

$$
\theta'=-\frac12\theta^2-\sigma_{ab}\sigma^{ab}-R_{ab}k^ak^b
\le-\frac12\theta^2.
$$

$\theta(p)=\theta_0<0$ なら $h=1/\theta$ について $h'\ge1/2$。よって

$$
h(\lambda)\ge\frac1{\theta_0}
+\frac{\lambda-\lambda_0}{2},
$$

となり、$\lambda-\lambda_0\le2/|\theta_0|$ の有限長で焦点が生じます。未来完備性により生成線はその先まで地平線上にあるはずですが、焦点の後には非時間的境界の生成子であり続けられません。矛盾するため $\theta\ge0$ です。ここでは焦点と境界生成線の両立不能という因果的入力を使っています。

**（2）** 初期面積密度 $a_0(y)>0$ として、[輸送公式](#prop-gr36-area-transport)より

$$
a_1(y)=a_0(y)\exp\left(\int_{\lambda_0(y)}^{\lambda_1(y)}
\theta(\lambda,y)\,d\lambda\right)\ge a_0(y).
$$

切断間の一対一対応の下で積分し、

$$
A_1=\int_{S_0}a_1(y)\,d^2y
\ge\int_{S_0}a_0(y)\,d^2y=A_0.
$$

**（3）** 形成時の合流点では生成線が途中から増え、全切断間の微分同相や微分可能な $\theta$ を仮定できません。非滑らかな地平線の面積定理には生成線の測度論的制御と適切な大域的因果仮定を別途要します。一方、定常Schwarzschildでは $r=r_s=2GM/c^2$ が一定で、

$$
A_1=A_0=4\pi r_s^2=\frac{16\pi G^2M^2}{c^4}.
$$

生成方向は半径を変えず $\theta=0$ なので、非減少の等号例になります。
<!-- solution-end -->

## 8. 次の問い

この章で証明したのは、光の局所的な集束不等式と大域的な境界の性質を合わせたときに、未来事象地平線の断面積が減らないという古典的な機構です。同じ集束補題は、適切な捕獲面と大域因果仮定から測地線の不完備性を引き出す議論にも使われます。次章では「面積の非減少」と「特異点定理が言う不完備性」の論理を、必要な仮定ごとに比較します。
