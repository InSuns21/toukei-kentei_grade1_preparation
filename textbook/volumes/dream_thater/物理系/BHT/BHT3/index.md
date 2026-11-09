# BHT3 面積定理と第二法則の仮定

<!-- definition-example-audit: strict -->

[BHT2の零法則](../BHT2/index.md#thm-bht2-zeroth-law)は定常Killing地平線の表面重力を扱いました。しかし、物質が落下する途中のブラックホールは定常とは限りません。熱力学の「エントロピーは減らない」に似た法則を探すなら、まず非定常地平線の**どの量がどの条件で増えるか**を調べる必要があります。

[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)は、滑らかな未来事象地平線の適切な二切断について面積非減少を証明しました。ここではその証明を重複させず、局所方程式から大域的な面積増加までの仮定を一つずつ確認し、流入質量が変化する模型で増減の符号を計算します。**面積の古典的な単調性と、熱や物質を含む熱力学の第二法則が同じ命題でない**ことが本講の中心です。

以下、滑らかな四次元の時間向き付きLorentz時空、計量符号 $(-,+,+,+)$、幾何単位 $G=c=1$ とし、Einstein方程式の宇宙項は左辺に置きます。$R_{ab}$ はRicciテンソル、$T_{ab}$ は物質のエネルギー運動量テンソルです。未来向き光的接ベクトルを $k^a$、アフィンパラメータを $\lambda$、生成光線束の膨張率を $\theta$、せん断を $\sigma_{ab}$ とします。

## 1. 集束する光線束なのに、なぜ地平線の面積は減らないのか

一般の光線束の面積は減っても構いません。[GR34の光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)を、零超曲面に接する回転零のアフィン測地線合同へ適用すると、

$$
\frac{d\theta}{d\lambda}
=-\frac12\theta^2-\sigma_{ab}\sigma^{ab}-R_{ab}k^ak^b.
$$

[GR35の零エネルギー条件（NEC）](../../GR/GR35/index.md#def-gr35-nec)はすべての光的 $k$ に対して $T_{ab}k^ak^b\ge0$ を要求します。[Einstein方程式による縮約](../../GR/GR35/index.md#prop-gr35-ricci-convergence)では、$g_{ab}k^ak^b=0$ によって宇宙項も跡の項も消え、

$$
R_{ab}k^ak^b=8\pi T_{ab}k^ak^b\ge0.
$$

これは[GR36の光的Ricci集束条件（NCC）](../../GR/GR36/index.md#def-gr36-null-convergence)です。以下この節で $\theta'=d\theta/d\lambda$ と略記します。せん断の二乗も非負なので、上の微分方程式は $\theta'\le-\theta^2/2$ を与えます。ただし**微分が非正であることは、膨張率そのものが非負であることを意味しません**。

初期値 $\theta(\lambda_0)=\theta_0<0$ なら、負値のままの区間で $u=1/\theta$ を微分して

$$
\frac{du}{d\lambda}=-\frac{\theta'}{\theta^2}\ge\frac12,
\qquad
\frac1{\theta(\lambda)}
\ge\frac1{\theta_0}+\frac{\lambda-\lambda_0}{2}.
$$

右辺は $\lambda-\lambda_0=2/|\theta_0|$ で零になりますが、有限な負の $\theta$ の逆数は負です。従って、その長さまで滑らかで正の断面積を持つ光線束として延長できません。[GR36の有限焦点補題](../../GR/GR36/index.md#lem-gr36-negative-expansion)は、延長可能なJacobi場があれば焦点が生じるところまで示しています。

しかし、ここまでは地平線かどうかを使っていません。普通の入射光線束は焦点へ潰れてよいのです。未来事象地平線では、次の二つの大域的入力が加わります。

1. [未来アフィン完備性](../../GR/GR36/index.md#def-gr36-generator-completeness)：未来側へ延びる生成子は有限のアフィン長で突然終わらない。
2. [未来事象地平線](../../GR/GR29/index.md#def-gr29-event-horizon)の非時間的境界性：焦点を通過した光線は、その先も境界を生成し続けることができない。

両方があれば「負の膨張率なら有限未来に焦点」という帰結が矛盾となり、地平線上で $\theta\ge0$ と結論できます。この因果的な焦点の性質は局所Raychaudhuri方程式だけでは証明されず、大域因果幾何の入力です。

[GR36の面積密度輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)で、生成線に沿って運ぶ横断座標 $y=(y^1,y^2)$ を取ります。空間的切断の座標接ベクトル $e_A=\partial_{y^A}$（$A=1,2$）の内積を用いると、

$$
q_{AB}=g(e_A,e_B),\qquad
dA=\sqrt{\det q}\,dy^1dy^2.
$$

切断が空間的なので $q=(q_{AB})$ は正定値の $2\times2$ 行列であり、行列式の平方根がこの座標での正の面積密度です。GR36で導いた輸送式は

$$
\frac{d}{d\lambda}\log\sqrt{\det q}=\theta,\qquad
J(y)=\exp\left(\int_{\lambda_0(y)}^{\lambda_1(y)}\theta\,d\lambda\right)\ge1.
$$

最後に、二切断の間で生成線の対応が滑らかな一対一対応であり、切断がコンパクトなら、$J$ を初期切断の面積要素に掛けて積分できます。

$$
A_1=\int_{S_0}J(y)\,dA_0(y)\ge\int_{S_0}dA_0(y)=A_0.
$$

これが[滑らかな未来地平線の面積非減少定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の証明の結節点です。生成線が形成時に新しく加わる非滑らかな部分は、この一対一対応の証明だけでは扱えません。非滑らかな地平線への拡張には、さらに大域的・測度論的条件が必要です。

## 2. 「面積が増える」は時計の選び方に依存しない

前講では[Killingパラメータとアフィンパラメータ](../BHT2/index.md#prop-bht2-affine-parameter)を区別しました。非定常地平線ではKilling場がなくても、同じ未来向き生成線を正の速さで辿ることができます。膨張率はベクトル場の規格化で変わりますが、面積増加の符号は変わりません。

<a id="prop-bht3-reparametrization"></a>

<!-- formal-statement-start -->
> **命題（地平線面積の単調性と正の再媒介）**  
> 四次元Lorentz時空の滑らかな零超曲面の生成線上で、未来向き非零光的ベクトル場 $k=d/d\lambda$ と空間的横断切断の正の面積密度 $a=\sqrt{\det q}$ があるとする。$f>0$ を滑らかな関数、$\widetilde k=fk=d/ds$ とし、各生成線の横断座標をともに運ぶ。このとき

$$
\theta_{\widetilde k}=f\theta_k,\qquad
\theta_{\widetilde k}\,ds=\theta_k\,d\lambda.
$$

> 従って対応する切断間の面積密度比とその増減の符号は正の再媒介で不変である。さらに、[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の仮定を満たす二切断なら、どちらの未来向き媒介でも $A_1\ge A_0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

膨張率は面積密度の対数を生成方向へ微分したものです。生成方向を $f$ 倍すると微分も $f$ 倍されますが、同じ曲線のパラメータの微小幅は逆に変わります。

<!-- proof-start -->
### 証明

[面積密度の輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)から、生成線に沿う $a>0$ について

$$
\theta_k=\frac1a\frac{da}{d\lambda}.
$$

$\widetilde k=fk$ と $\widetilde k=d/ds$ から、連鎖律により $d\lambda/ds=f$ です。従って

$$
\begin{aligned}
\theta_{\widetilde k}
&=\frac1a\frac{da}{ds}
=\frac1a\frac{da}{d\lambda}\frac{d\lambda}{ds}
=f\theta_k,\\
\theta_{\widetilde k}\,ds
&=f\theta_k\frac{d\lambda}{f}
=\theta_k\,d\lambda.
\end{aligned}
$$

積分区間の向きも $f>0$ で保存されるため、$\int\theta_{\widetilde k}\,ds=\int\theta_k\,d\lambda$ です。その指数である面積密度比 $J$ は等しく、切断上の積分面積も同じです。最後の非減少性は明記された仮定下で[GR36の定理](../../GR/GR36/index.md#thm-gr36-smooth-area)を適用した結果です。
<!-- proof-end -->

**直接例：** 半径 $r(\lambda)>0$ の球面切断を球面座標 $(\vartheta,\varphi)$ の $0<\vartheta<\pi$ の領域で考えます。角度方向の計量は $r^2(d\vartheta^2+\sin^2\vartheta\,d\varphi^2)$ なので、座標基底での行列と正の面積密度は

$$
q_{AB}=r^2\operatorname{diag}(1,\sin^2\vartheta),\qquad
a=\sqrt{\det q}=r^2\sin\vartheta>0.
$$

球面座標の極では別の座標域を用います。角度を生成線に沿って固定し、$r'=dr/d\lambda$ とすれば、[面積密度輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)から $\theta_k=(1/a)\,da/d\lambda=2r'/r$ です。$d\lambda/ds=f$ より

$$
\theta_{\widetilde k}=\frac2r\frac{dr}{ds}
=f\frac{2r'}r,\qquad
\theta_{\widetilde k}ds=\frac{2}{r}\,dr.
$$

従って面積比は $r_1^2/r_0^2$ のままです。ただし $\widetilde k$ がアフィン媒介であるとは限らず、**アフィン媒介用のRaychaudhuri方程式へそのまま $\widetilde k$ を代入してはいけません**。非アフィンの場合は追加項が現れます。

定常Schwarzschild解の面積 $A=16\pi M^2$ は[BHT1の状態データ](../BHT1/index.md#prop-bht1-schwarzschild-data)です。同じ時空内で定常地平線の各切断を比べるなら $M$ は一定なので $A_1=A_0$ です。一方、**別々の定常解**で $M$ を $M+\Delta M$ に変えた計算は、面積定理の「一つの時空の二切断」を比較していません。質量を増やす過程に定理を適用するには、その過程を記述する非定常時空が必要です。

## 3. 流入Vaidya模型で仮定と面積変化を同時に検算する

[GR29の入射Vaidya事象地平線](../../GR/GR29/index.md#prop-gr29-vaidya-separation)では、球対称の物質流入を時間依存の質量関数で表しました。この節の $a(v)=2M(v)>0$ は§2の面積密度 $a$ とは別に、質量を長さに換算した関数です。$a$ を $C^1$ 級、有限の $v_1$ 以後は正の定数 $a_1$ とします。$r>0$ の領域で

$$
ds^2=-F(v,r)\,dv^2+2\,dv\,dr+r^2d\Omega^2,\qquad
F(v,r)=1-\frac{a(v)}r.
$$

ここで $\partial_v$ と $\partial_r$ は、他の座標を固定した座標基底ベクトルです。この計量の未来向き出射零方向は

$$
\ell=\partial_v+\frac F2\partial_r,\qquad
g(\ell,\ell)=-F+2\frac F2=0
$$

です。事象地平線の出射生成線を $r=r_E(v)>0$ とすると、その曲線の接方向は $\partial_v+(dr_E/dv)\partial_r$ です。これを $\ell$ と照合するので $dr_E/dv=F(v,r_E)/2$ となります。この節では $r_E'=dr_E/dv$、$a'=da/dv$ と記して

$$
r_E'=\frac12\left(1-\frac{a(v)}{r_E}\right),
\qquad r_E(v_1)=a_1.
$$

未来で定常となる事象地平線を過去へ追った境界値条件です。この $v$ は一般にはアフィンパラメータではありませんが、未来へ増える座標なので、面積変化の符号を調べるには使えます。

地平線と $F=0$ の球面管の半径差を $\delta(v)=r_E(v)-a(v)$ と置くと、単なる定義式の微分だけで未来の流束と現在の地平線変化を結び付けられます。

<a id="prop-bht3-vaidya-future-integral"></a>

<!-- formal-statement-start -->
> **命題（入射Vaidya地平線の未来積分式）**  
> 四次元入射Vaidya計量 $ds^2=-(1-a(v)/r)dv^2+2\,dv\,dr+r^2d\Omega^2$（$r>0$）を考える。$a\in C^1([v_0,v_1])$ は正、$v\ge v_1$ では $a=a_1=a(v_1)>0$ で一定とする。未来定常地平線から過去へ延長した正の解 $r_E(v)$ が

$$
\frac{dr_E}{dv}=\frac12\left(1-\frac{a(v)}{r_E(v)}\right),
\qquad r_E(v_1)=a_1
$$

> を満たすとし、$\delta(v)=r_E(v)-a(v)$ と置く。このとき

$$
\delta(v)=\int_v^{v_1}
\exp\left(-\int_v^s\frac{du}{2r_E(u)}\right)a'(s)\,ds,
\qquad
\frac{dA_E}{dv}=4\pi\delta(v),
\quad A_E=4\pi r_E^2.
$$

> 従って $a'\ge0$ が区間 $[v,v_1]$ で成立すれば $dA_E/dv\ge0$、逆に $a'\le0$ が同区間で成立すれば $dA_E/dv\le0$。将来の流束が途中で符号を変える場合、現在の符号は単一時刻の $a'(v)$ だけでは決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta$ の微分方程式は一次線形です。係数に未知の $r_E$ が残っていても、既に定まった正の解に沿えば積分因子を使えます。指数核が正なので将来の $a'$ の符号が、そのまま $\delta$ の符号を制御します。

<!-- proof-start -->
### 証明

地平線の常微分方程式に $r_E-a=\delta$ を代入すると

$$
r_E'=\frac{r_E-a}{2r_E}=\frac{\delta}{2r_E},
\qquad
\delta'=\frac{\delta}{2r_E}-a'.
$$

$c(v)=1/(2r_E(v))>0$ と置き、任意の $v\le s\le v_1$ に対して

$$
\mu(s)=\exp\left(-\int_v^s c(u)\,du\right)>0
$$

と定めます。$\mu'=-c\mu$ より、積の微分を展開すると

$$
\frac{d}{ds}\bigl(\mu(s)\delta(s)\bigr)
=\mu(s)(\delta'(s)-c(s)\delta(s))
=-\mu(s)a'(s).
$$

両辺を $s=v$ から $s=v_1$ まで積分します。$\mu(v)=1$ と未来境界値 $\delta(v_1)=a_1-a_1=0$ を代入して

$$
0-\delta(v)=-\int_v^{v_1}\mu(s)a'(s)\,ds
$$

となり、第一式を得ます。切断は半径 $r_E$ の球面なので $A_E=4\pi r_E^2$。微分して先ほどの $r_E'$ を代入すると

$$
\frac{dA_E}{dv}
=8\pi r_Er_E'
=8\pi r_E\frac{\delta}{2r_E}
=4\pi\delta.
$$

指数核は正です。従って各区間で $a'$ が非負または非正なら、積分と面積変化の符号もそれに従います。
<!-- proof-end -->

**直接例1：正の流入。** [GR30のVaidya物質源](../../GR/GR30/index.md#prop-gr30-vaidya-source)は

$$
T_{ab}=\frac{a'(v)}{8\pi r^2}(dv)_a(dv)_b,\qquad
T_{ab}k^ak^b=\frac{a'(v)}{8\pi r^2}(k^v)^2.
$$

従って将来の区間 $[v,v_1]$ 全体で $a'\ge0$ なら、任意の光的方向にNECが成り立ちます。[未来積分式](#prop-bht3-vaidya-future-integral)の核も正なので、次を得ます。

$$
\delta(v)\ge0,\qquad A_E'(v)=4\pi\delta(v)\ge0.
$$

流入がまだ始まっていない時刻に $a'(v)=0$ でも、その**将来**の一部で $a'(s)>0$ があれば、他の時刻の寄与も非負なので積分は厳密に正です。ここで $a'(s)$ は $da/dv$ を $v=s$ で評価したものです。従ってその時刻でも $A_E'(v)>0$ です。将来に負の流束も混ざる場合は正の寄与と相殺され得るため、この結論は無条件ではありません。事象地平線が将来の因果構造で決まるという特徴です。

**直接例2：負の流入。** $a'(v)<0$ の区間では、$k^v\ne0$ の光的ベクトルを取ると $T_{ab}k^ak^b<0$ なのでNECに違反します。将来の全区間で $a'\le0$ なら[未来積分式](#prop-bht3-vaidya-future-integral)から $\delta\le0$、$A_E'\le0$ となり、非自明な減少区間で面積が減ります。これは**負のエネルギー流束を入れた古典的な模型**の計算であって、Hawking放射の量子場理論的導出ではありません。GR36の面積定理との矛盾ではなく、そのNCC仮定が失われた例です。

## 4. 面積が一定なら何も地平線を横切らないのか

面積非減少だけでは、増加が物質によるのか、光線束のせん断によるのかまでは分かりません。一方、**面積が厳密に一定**なら、古典的な滑らかな定理の仮定下でより強い結論があります。

<a id="prop-bht3-area-rigidity"></a>

<!-- formal-statement-start -->
> **命題（古典的面積一定区間の剛性）**  
> [GR36の滑らかな未来地平線の面積非減少定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の仮定を満たし、二つのコンパクト切断 $S_0,S_1$ の間の生成線対応が滑らかな微分同相とする。さらに $A_1=A_0$ とする。このとき全生成線区間で

$$
\theta=0,\qquad \sigma_{ab}\sigma^{ab}=0,\qquad
R_{ab}k^ak^b=0.
$$

> Einstein方程式が成立すれば $T_{ab}k^ak^b=0$ でもある。ここから $T_{ab}=0$ 全体や時空全体の定常性までは従わない。
<!-- formal-statement-end -->

### 証明の見取り図

非減少の証明では各生成線のJacobian $J$ が1以上でした。全体積分が等号なら、連続な $J$ は全点で1です。すると各線の非負な膨張率の積分が零となり、Raychaudhuri方程式の二つの非負項もともに零になります。

<!-- proof-start -->
### 証明

[GR36の面積密度輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)により $J(y)=\exp(\int\theta\,d\lambda)$ です。[滑らかな未来地平線の面積非減少定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の仮定下で $J(y)\ge1$ かつ $A_1-A_0=\int_{S_0}(J-1)\,dA_0=0$ です。もしある $y$ で $J(y)>1$ なら、$J$ の連続性と初期切断の正の面積密度により、その近傍で積分が正となり矛盾します。従って全点で $J=1$ です。

$$
0=\log J(y)
=\int_{\lambda_0(y)}^{\lambda_1(y)}\theta(\lambda,y)\,d\lambda.
$$

$\theta\ge0$ は連続であり、もし途中の一点で正ならその近傍の積分が正となります。よって $\theta$ は全区間で零です。[光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)へ $\theta=\theta'=0$ を代入すると

$$
0=-\sigma_{ab}\sigma^{ab}-R_{ab}k^ak^b.
$$

仮定されたNCCとスクリーンの正定値性により右辺の二項はいずれも非正なので、それぞれ零です。[Einstein方程式の光的縮約](../../GR/GR35/index.md#prop-gr35-ricci-convergence)から最後の $T_{ab}k^ak^b=0$ も従います。
<!-- proof-end -->

これは「面積一定なら物質や重力波がどこにも存在しない」という意味ではありません。特定の地平線生成方向に沿う光的流束とせん断を制限するだけです。逆に $T_{ab}k^ak^b=0$ だけから面積一定も従いません。Raychaudhuri式には $\sigma_{ab}\sigma^{ab}$ と初期膨張率が残るからです。

## 5. 古典的第二法則と熱力学的第二法則の境界

ここまでで言えたのは、古典的なEinstein重力と必要な因果的・エネルギー的条件の下での**地平線面積の非減少**です。熱力学で扱うエントロピー $S$ の増大とは、対象も仮定も同じではありません。

| 比較する主張 | 対象 | 重要な入力 | 今回の到達点 |
| --- | --- | --- | --- |
| 光線束の集束 | 局所の光的測地線合同 | 回転零、アフィン性、NCC | 負の膨張は有限アフィン長で破綻 |
| 古典的面積定理 | 未来事象地平線の切断 | NCC、未来完備性、非時間的境界性、切断対応 | 適切な二切断で $A_1\ge A_0$ |
| 熱力学的第二法則 | 物質・熱を含む熱力学系 | 状態・エントロピー・過程の定義 | 面積定理だけからは導けない |
| 一般化第二法則（GSL） | 地平線と外部量子場 | 半古典状態、量子エントロピー、繰り込み等 | BHT21–22で定式化と射程を検討 |

特に次の区別が重要です。

1. **NECは零法則の条件と同一ではありません。** [BHT2の零法則](../BHT2/index.md#thm-bht2-zeroth-law)で用いた優越エネルギー条件（DEC）はNECより強い条件です。面積定理の集束に必要なのは、Einstein重力では通常NECに対応するNCCです。
2. **局所的な集束だけでは大域的な面積定理になりません。** 未来完備性を落とすと焦点前に生成線が途切れ得て、非時間的境界を落とすと普通の入射光線束のように面積が減ります。形成時の非滑らかな地平線を扱う際は、切断の一対一対応も補足が要ります。
3. **量子効果を無条件に古典定理へ代入できません。** 半古典的な負のエネルギー流束ではNECが破れることがあり、蒸発するブラックホールの面積が減っても古典定理の反例にはなりません。実際のHawking放射と温度の同定はBHT8、面積をエントロピーと同定する論証はBHT9、一般化エントロピーはBHT21–22で扱います。
4. **Killing面積と状態族の変分は非定常過程と別です。** [BHT1の幾何学的変分恒等式](../BHT1/index.md#prop-bht1-variation-identity)の $\delta A$ は定常解族上の変化であり、本講の $dA_E/dv$ と自動的に同一視できません。両者を結ぶ物理過程版の第一法則はBHT6で条件付きに調べます。

古典的面積法則を「第二法則」と呼ぶのは、**非減少量を持つという構造の類似**を指す限りで有益です。ただし現段階では、面積にどの係数を掛ければ熱力学的エントロピーになるかも、外部へ逃げるエネルギー・情報をどう数えるかも確定していません。

## 6. 演習：仮定を外す位置と面積変化の符号

### Level A：面積密度・流束・時計を検算する

<a id="ex-bht3-a01"></a>

#### BHT3-A01 正の再媒介

- Level: A

滑らかな生成線に沿って $d\lambda/ds=3$、面積密度 $a>0$、$\theta_k=(1/a)\,da/d\lambda$ とする。$s$ による膨張率と二切断間の積分を求め、増減の符号を比較せよ。

<!-- solution-start -->
**詳細解答。** 連鎖律から $da/ds=(da/d\lambda)(d\lambda/ds)=3\,da/d\lambda$ なので

$$
\theta_{\widetilde k}=\frac1a\frac{da}{ds}=3\theta_k.
$$

一方 $ds=d\lambda/3$ ですから

$$
\int_{s_0}^{s_1}\theta_{\widetilde k}\,ds
=\int_{\lambda_0}^{\lambda_1}3\theta_k\frac{d\lambda}{3}
=\int_{\lambda_0}^{\lambda_1}\theta_k\,d\lambda.
$$

[正の再媒介命題](#prop-bht3-reparametrization)と一致し、面積密度比を表す指数は等しくなります。正の3倍により未来の向きも保存されるので、増減の符号は変わりません。
<!-- solution-end -->

<a id="ex-bht3-a02"></a>

#### BHT3-A02 丸い切断の面積率

- Level: A

$r(\lambda)=R+b\lambda>0$、$R>0$、$b$ は定数とする。二球面切断の面積 $A(\lambda)$ と膨張率 $\theta(\lambda)$ を求め、$\theta A=A'$ を確認せよ。$b<0$ の場合は何が不足しているか。

<!-- solution-start -->
**詳細解答。** $A=4\pi r^2$ を微分すると

$$
A'=8\pi rb,\qquad
\frac{A'}A=\frac{8\pi rb}{4\pi r^2}=\frac{2b}{r}.
$$

[面積密度輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)による膨張率も $\theta=2r'/r=2b/r$ です。従って $\theta A=8\pi rb=A'$。$b<0$ では面積が減りますが、これは球面の運動だけを指定した計算です。未来事象地平線であること、NCC、未来アフィン完備性、非時間的境界性は確認しておらず、面積定理の反例とは言えません。
<!-- solution-end -->

<a id="ex-bht3-a03"></a>

#### BHT3-A03 Vaidya物質源のNEC

- Level: A

$r>0$、$F=1-a(v)/r$ の入射Vaidya計量で、$T_{ab}=a'(v)(dv)_a(dv)_b/(8\pi r^2)$ とする。NECが全光的方向で成り立つための $a'$ の必要十分条件を示せ。

<!-- solution-start -->
**詳細解答。** 任意の光的 $k$ に対して

$$
T_{ab}k^ak^b=\frac{a'(v)}{8\pi r^2}(k^v)^2.
$$

$r>0$ なので $a'\ge0$ なら全光的 $k$ に対して右辺は非負、十分です。逆に $a'<0$ の点では $\ell=\partial_v+(F/2)\partial_r$ を取れます。計量に代入すると $g(\ell,\ell)=-F+F=0$、かつ $\ell^v=1$ です。そこで

$$
T_{ab}\ell^a\ell^b=\frac{a'}{8\pi r^2}<0.
$$

よってNECに反し、$a'\ge0$ が必要でもあります。[GR30の物質源](../../GR/GR30/index.md#prop-gr30-vaidya-source)の符号を全光的方向について確認できました。
<!-- solution-end -->

<a id="ex-bht3-a04"></a>

#### BHT3-A04 異なる定常状態の面積差

- Level: A

幾何単位でSchwarzschild解の $A(M)=16\pi M^2$ とする。質量 $M>0$ の解と質量 $2M$ の**別の解**の面積比を求めよ。この計算だけで実際の形成過程に面積定理を適用したと言えるか。

<!-- solution-start -->
**詳細解答。** [BHT1の面積計算](../BHT1/index.md#prop-bht1-schwarzschild-data)を使うと

$$
\frac{A(2M)}{A(M)}
=\frac{16\pi(2M)^2}{16\pi M^2}=4.
$$

ここで二つの $M$ はそれぞれ異なる定常時空を指定します。[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の入力は一つの地平線上の二切断であり、計算した二解はその入力になっていません。実際の質量増加過程を表す非定常時空の因果的・エネルギー的仮定を別途確認する必要があります。
<!-- solution-end -->

<a id="ex-bht3-a05"></a>

#### BHT3-A05 平坦時空の入射光線束

- Level: A

Minkowski時空で $r=R-\lambda$、$0\le\lambda<R$、$R>0$ とする。零Ricci曲率にもかかわらず面積が減る理由を、焦点時刻と地平線の大域的条件に分けて説明せよ。

<!-- solution-start -->
**詳細解答。** 光的入射球面の面積と膨張率は

$$
A=4\pi(R-\lambda)^2,\qquad
\theta=\frac{A'}A=-\frac2{R-\lambda}.
$$

初期値 $\theta_0=-2/R$ なので[有限焦点補題](../../GR/GR36/index.md#lem-gr36-negative-expansion)の上限 $2/|\theta_0|=R$ と一致し、$\lambda=R$ で焦点へ潰れます。Ricciは零でNCCには違反しません。しかしこの束は未来事象地平線という非時間的境界の生成子ではなく、焦点の後も境界を生成し続ける必要はありません。失われたのは地平線の大域的な仮定であり、Raychaudhuri式ではありません。
<!-- solution-end -->

### Level B：微分方程式と大域条件を接続する

<a id="ex-bht3-b01"></a>

#### BHT3-B01 Vaidyaの未来積分式を再導出

- Level: B

$a(v)>0$、$r_E(v)>0$ は $C^1$ 級で $r_E'=(r_E-a)/(2r_E)$、$r_E(v_1)=a(v_1)$ とする。$\delta=r_E-a$ の一次線形方程式を積分因子で解き、$a'\le0$ の区間で面積変化が非正となることを示せ。

<!-- solution-start -->
**詳細解答。** $r_E'=\delta/(2r_E)$ から

$$
\delta'=\frac{\delta}{2r_E}-a',
\qquad
\delta'-c(v)\delta=-a',\quad c(v)=\frac1{2r_E(v)}>0.
$$

評価点 $v$ を固定し $\mu(s)=\exp(-\int_v^s c(u)du)$ と取ると、$\mu'=-c\mu$ より

$$
(\mu\delta)'=\mu(\delta'-c\delta)=-\mu a'.
$$

$v$ から $v_1$ まで積分し、$\delta(v_1)=0$、$\mu(v)=1$ を使うと

$$
\delta(v)=\int_v^{v_1}\exp\left(-\int_v^s\frac{du}{2r_E(u)}\right)a'(s)\,ds.
$$

指数核は正です。$a'\le0$ なら $\delta\le0$、さらに

$$
A_E'=8\pi r_Er_E'=4\pi\delta\le0.
$$

[本章の未来積分命題](#prop-bht3-vaidya-future-integral)の符号を、境界値と積分因子から独立に得られました。
<!-- solution-end -->

<a id="ex-bht3-b02"></a>

#### BHT3-B02 等号から光的流束を絞る

- Level: B

滑らかな未来事象地平線のコンパクト切断 $S_0,S_1$ が[GR36の面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の仮定を満たし、$A_1=A_0$ とする。各生成線の膨張率とせん断、$T_{ab}k^ak^b$ について何が言えるか。$T_{ab}=0$ まで言えるか。

<!-- solution-start -->
**詳細解答。** [面積密度輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)の $J=\exp(\int\theta\,d\lambda)\ge1$ に対して

$$
0=A_1-A_0=\int_{S_0}(J-1)dA_0.
$$

連続な非負関数 $J-1$ の積分が零なので $J=1$。従って $\int\theta\,d\lambda=0$ で、連続かつ非負な $\theta$ は各線で恒等的に零です。[Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)は

$$
0=\theta'=-\sigma_{ab}\sigma^{ab}-R_{ab}k^ak^b.
$$

NCCとせん断二乗の非負性から双方零、[Einstein方程式の縮約](../../GR/GR35/index.md#prop-gr35-ricci-convergence)で $T_{ab}k^ak^b=0$ となります。これは特定の零方向への縮約であり、物質テンソルの他の成分は制約しないので $T_{ab}=0$ は従いません。
<!-- solution-end -->

<a id="ex-bht3-b03"></a>

#### BHT3-B03 せん断もRicciも零でも面積は増える

- Level: B

アフィン媒介の回転零光線束で $\sigma_{ab}=0$、$R_{ab}k^ak^b=0$、初期膨張率 $\theta(0)=h>0$ とする。Raychaudhuri方程式を解き、面積密度比を求めよ。なぜ零流束だけから面積一定と結論できないか。

<!-- solution-start -->
**詳細解答。** [光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)は $\theta'=-\theta^2/2$ です。$\theta>0$ の区間で逆数を微分すると

$$
\left(\frac1\theta\right)'=\frac12,\qquad
\frac1{\theta(\lambda)}=\frac1h+\frac{\lambda}{2}.
$$

従って $\lambda\ge0$ で

$$
\theta(\lambda)=\frac{h}{1+h\lambda/2}.
$$

[面積輸送式](../../GR/GR36/index.md#prop-gr36-area-transport)より

$$
\begin{aligned}
\log\frac{a(\lambda)}{a(0)}
&=\int_0^\lambda\frac{h\,ds}{1+hs/2}
=2\log(1+h\lambda/2),\\
\frac{a(\lambda)}{a(0)}
&=(1+h\lambda/2)^2>1\quad(\lambda>0).
\end{aligned}
$$

Ricci縮約とせん断が零でも、初期膨張率 $h>0$ が残って面積は増大します。面積一定を結論するには初期膨張も含めた条件が必要です。
<!-- solution-end -->

<a id="ex-bht3-b04"></a>

#### BHT3-B04 流入前から増える地平線

- Level: B

入射Vaidya模型で、質量関数が次を満たすとする。

$$
a'(v)=0\quad(v\le v_0),\qquad
a'(s)\ge0\quad(v_0\le s\le v_1),\qquad
a(v)=a_1\quad(v\ge v_1).
$$

さらに $v_0<s<v_1$ のある開区間で $a'(s)>0$ とする。$v<v_0$ では $T_{vv}=0$ なのに地平線面積について $A_E'(v)>0$ と結論できる理由を、未来境界条件と積分の符号を使って述べよ。また、将来の $a'$ に負の部分も許すと何が変わるか。

<!-- solution-start -->
**詳細解答。** [Vaidyaの物質源](../../GR/GR30/index.md#prop-gr30-vaidya-source)から $T_{vv}=a'(v)/(8\pi r^2)=0$ です。しかし事象地平線は未来の最終定常半径 $r_E(v_1)=a_1$ から過去へ辿るので、[未来積分式](#prop-bht3-vaidya-future-integral)は

$$
\delta(v)=\int_v^{v_1}K(v,s)a'(s)ds,\qquad
K(v,s)=\exp\left(-\int_v^s\frac{du}{2r_E(u)}\right)>0.
$$

$[v,v_0]$ の積分は零です。$[v_0,v_1]$ では $K>0$ かつ $a'\ge0$ であり、ある開区間では $a'>0$ なので積分は厳密に正です。従って

$$
\delta(v)>0,\qquad A_E'(v)=4\pi\delta(v)>0.
$$

もし負の $a'$ も許せばその寄与が正の寄与を打ち消し得て、符号を確定できません。局所の $T_{vv}(v)=0$ と、将来の事象地平線位置の決定は別の問いです。
<!-- solution-end -->

### Level C：古典的「第二法則」を条件つきで運用する

<a id="ex-bht3-c01"></a>

#### BHT3-C01 流束・地平線・熱力学の横断判定

- Level: C

四次元の入射Vaidya計量 $ds^2=-(1-a(v)/r)dv^2+2dvdr+r^2d\Omega^2$、$a(v)>0$、$a(v)=a_1$（$v\ge v_1$）を考える。$r_E(v)>0$ は最終定常地平線から過去へ延長した出射零生成線である。

1. $a'(v)\ge0$ が $[v_0,v_1]$ で成り立つとき、物質のNECと $A_E'(v)\ge0$ をそれぞれ確認せよ。
2. 同じ区間で $a'(v)\le0$ としたとき、どの仮定が破れ、どの面積符号が生じ得るかを求めよ。
3. 一般の形成地平線でこの球対称計算から直ちに言えないこと、および $A_E'\ge0$ だけから熱力学的エントロピー第二法則を結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答。**

1. [GR30の物質源](../../GR/GR30/index.md#prop-gr30-vaidya-source)を任意の光的 $k$ に縮約すると

   $$
   T_{ab}k^ak^b=\frac{a'}{8\pi r^2}(k^v)^2\ge0
   $$

   なのでNECが成立します。境界条件 $\delta(v_1)=0$ と $\delta'= \delta/(2r_E)-a'$ から、[未来積分命題](#prop-bht3-vaidya-future-integral)により

   $$
   \delta(v)=\int_v^{v_1}e^{-\int_v^s du/(2r_E(u))}a'(s)\,ds\ge0.
   $$

   $A_E=4\pi r_E^2$、$r_E'=\delta/(2r_E)$ を代入すると $A_E'=4\pi\delta\ge0$ です。

2. $a'\le0$ で、ある区間で厳密に負なら、光的 $\ell=\partial_v+(F/2)\partial_r$ に対し $T_{ab}\ell^a\ell^b=a'/(8\pi r^2)<0$ となり、NECとEinstein方程式からのNCCを失います。積分核は正なので $\delta(v)\le0$、$A_E'\le0$ です。将来に負流束がある時点では積分が厳密に負になり得ます。古典面積定理の集束不等式を保証する仮定が破れたので矛盾はありません。

3. 一般の地平線は球対称な $r_E(v)$ だけでは表せず、形成の非滑らかな部分では生成線の追加があります。[GR36の滑らかな未来地平線の面積非減少定理](../../GR/GR36/index.md#thm-gr36-smooth-area)を使うなら、NCCだけでなく未来アフィン完備性、非時間的境界性、二切断の滑らかな対応も確認しなければなりません。また $A_E$ は幾何学的面積であり、熱力学的な温度とエントロピーの同定・外部量子場との収支はこの計算から出ません。量子蒸発ではNEC自体が破れ得るため、古典的 $A_E$ の単調性と一般化第二法則を同一視できません。
<!-- solution-end -->

## 7. 次の問い

面積は適切な古典条件下で減少しませんが、この時点でエントロピーの係数は決まっていません。次の **BHT4** では、まずSchwarzschildとReissner–Nordströmの定常解族について、質量・電荷・地平線面積・表面重力を実際に微分し、古典的な第一法則の形を検算します。
