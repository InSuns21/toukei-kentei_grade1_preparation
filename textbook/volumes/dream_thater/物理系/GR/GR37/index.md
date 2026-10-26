# GR37 特異点定理と測地不完備性

<!-- definition-example-audit: strict -->

[GR34の光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)は、負の膨張率を持つ光線束がRicci集束条件の下で有限のアフィン長以内に集まると教えてくれました。しかしMinkowski時空でも、球面から内向きに放った光は中心で交差します。平坦な時空に特異点ができたのでしょうか。

**光線束の交差**と、**光線そのものがその先へ延ばせないこと**は異なります。後者を導くには、捕獲面からの両方向の光線に加え、因果境界・Cauchy面・位相の論証が必要です。本章は局所集束からPenrose型特異点定理までの橋を一つずつ構築します。

以下、$(M,g)$ は滑らかで連結、境界なし、時間向き付き四次元Lorentz時空です。符号は $(-,+,+,+)$、$G=c=1$、Ricciの符号は[GR6の規約](../GR6/index.md#prop-gr6-coordinate-curvature)とします。光的測地線の未来向き接ベクトルは $k$、アフィンパラメータは $\lambda$ です。

## 1. 測地線が途中で終わるとは

[GR26の正則なEddington–Finkelstein座標](../GR26/index.md#prop-gr26-ef-metric-domain)では、Schwarzschildの $r=2M$ を横切れます。座標の端だけを「時空の終端」と呼んではなりません。

測地線 $\gamma:I\to M$ が**極大**とは、同じ時空 $M$ 内で測地線方程式を満たしたまま、パラメータ区間 $I$ を真に広げられないことです。光的測地線は $\nabla_{\dot\gamma}\dot\gamma=0$ を満たすアフィンパラメータで測り、時間的測地線では固有時を使えます。アフィン変換 $\lambda\mapsto a\lambda+b$（$a>0$）は有限端点と無限端点を区別したままです。

<a id="def-gr37-geodesic-incompleteness"></a>

<!-- formal-statement-start -->
> **定義（測地線のアフィン不完備性）**
> 時間向き付きLorentz時空 $(M,g)$ の未来向き光的または時間的な極大アフィン媒介測地線 $\gamma:(a,b)\to M$ で、未来端 $b$ が有限なら、この測地線は**未来不完備**という。すべての極大未来向き光的測地線が未来へ無限のアフィンパラメータを取れるとき、時空を**未来光的測地完備**という。時間的・過去向きも同様に定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr37-geodesic-incompleteness -->
**定義の確認**：平坦でも不完備。Minkowski時空の開部分 $M_+=\{t>0\}$ に計量

$$
ds^2=-dt^2+dx^2+dy^2+dz^2
$$

を入れます。時間的曲線 $\gamma(\tau)=(\tau,0,0,0)$（$\tau>0$）は次を満たします。

$$
g(\dot\gamma,\dot\gamma)=-1,\qquad
\ddot\gamma=0.
$$

接続係数が零なので固有時測地線ですが、$\tau=0$ は $M_+$ の外であり、過去へ延長できません。極大区間 $(0,\infty)$ の下端は有限です。一方、曲率は全点で零。全Minkowskiへ延長できるので、**不完備性・曲率発散・時空自体の延長不能性は別の性質**です。光線 $\ell(\lambda)=(\lambda,\lambda,0,0)$（$\lambda>0$）も同じ理由で過去光的不完備です。
<!-- definition-example-end -->

特異点定理で得られる結論は、通常、極大測地線が有限の固有時・アフィン長で終わることです。曲率不変量の発散や、欠けた「点」の座標を定理が直接与えるのではありません。

## 2. 二方向の未来光がともに縮む面

空間的二次元曲面 $S$ の法空間は符号 $(-,+)$ の二次元Lorentz平面です。時間向きから未来向き単位時間的法線 $n$ を選び、その直交補空間に沿う単位空間的法線 $s$ を選びます。**二側性**とは、この空間的法線の向きを $S$ 全体で連続的（滑らかに）選べることです。$n,s$ はいずれも $S$ の接ベクトルに直交し、$n$ は未来向き、$g(n,n)=-1$、$g(s,s)=1$、$g(n,s)=0$ とします。二つの未来光的法線は

$$
k_+=n+s,\qquad k_-=n-s.
$$

$g(n,n)=-1$、$g(s,s)=1$、$g(n,s)=0$ なので $g(k_\pm,k_\pm)=0$、$g(k_+,k_-)=-2$ です。[GR29の零法線膨張率](../GR29/index.md#def-gr29-null-expansion)はそれぞれの法線光線束の面積密度 $a$ について $\theta_\pm=a_\pm'/a_\pm$ と書けます。法線を正倍しても膨張率の符号は変わりません。

<a id="def-gr37-trapped-surface"></a>

<!-- formal-statement-start -->
> **定義（閉じた未来捕獲面）**
> 時間向き付き四次元Lorentz時空内の、コンパクト・境界なし・滑らかで埋め込まれた空間的二次元曲面 $S$ が二側性を持ち、二つの滑らかな未来光的法線場 $k_+,k_-$ を選べるとする。双方の横断スクリーン膨張率がすべての $p\in S$ で

$$
\theta_+(p)<0,\qquad\theta_-(p)<0
$$

> を満たすとき、$S$ を**閉じた未来捕獲面**という。ここで「閉じた」はコンパクトかつ境界なしという意味であり、球面と同相である必要はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr37-trapped-surface -->
**定義の確認**：Minkowski球面は捕獲されない。$t=0$ の半径 $R>0$ の球面はコンパクト・境界なし・二側的です。$n=\partial_t$、$s=\partial_r$ を選ぶと $k_\pm=\partial_t\pm\partial_r$、その光線の半径は $r_\pm(\lambda)=R\pm\lambda$ です。横断計量は $q_{AB}=r_\pm^2\operatorname{diag}(1,\sin^2\vartheta)$、面積密度は $a_\pm=r_\pm^2\sin\vartheta$ だから

$$
\theta_\pm(0)=\left.\frac{a_\pm'}{a_\pm}\right|_{\lambda=0}
=\pm\frac2R.
$$

したがって入射側は負でも出射側は正です。全非自明条件のうち膨張率の片方が失敗するため、捕獲面ではありません。
<!-- definition-example-end -->

**曲率のある時空ではどう判定するか。** 球対称時空の面積半径を $r$ とすると、球面積は $4\pi r^2$ です。[GR36の面積輸送命題](../GR36/index.md#prop-gr36-area-transport)を零法線 $k_\pm$ の流れに使い、

$$
\theta_\pm=\frac{k_\pm(4\pi r^2)}{4\pi r^2}=\frac{2k_\pm(r)}r.
$$

この橋渡しにより、二つの未来零方向で $r$ がともに減少すれば捕獲面と判定できます。[GR27のSchwarzschild内部の因果半径単調性](../GR27/index.md#prop-gr27-causal-radius)から $0<r<2M$ の未来ブラックホール内部では、両方の径方向未来零法線で $k_\pm(r)<0$。正則な内部の丸い球面は実際に閉じた未来捕獲面です。地平線上の片側膨張率が零となる場合と区別します。

## 3. 局所集束を共通の時間上限へ

捕獲面が非コンパクトなら初期膨張率が $0$ に近づく点を排除できません。コンパクト性はこの障害を取り除きます。

<a id="prop-gr37-uniform-focusing"></a>

<!-- formal-statement-start -->
> **命題（捕獲面からの一様集束上限）**
> 時間向き付き四次元Lorentz時空に、滑らかなコンパクトな閉じた未来捕獲面 $S$ があるとする。二つの未来零法線は次の条件で滑らかに規格化する。

$$
g(k_+,k_-)=-2.
$$

> 法線から出るアフィン媒介光的測地線に沿って、Ricci集束条件 $R_{ab}k^ak^b\ge0$ が成立するとする。するとある $\delta>0$ が存在して、両方向の初期膨張率は次を満たす。

$$
\theta_\pm|_S\le-\delta.
$$

> 各法線測地線がアフィン長 $B=2/\delta$ まで存在すると仮定すれば、その長さ以内に $S$ に対する焦点が現れる。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクト面上で負の初期膨張率に一様な上界を置きます。[GR34の光的Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)を回転零の法線合同へ適用し、負の膨張率の逆数を積分します。

<!-- proof-start -->
### 証明

$S$ の二つの初期膨張率は連続かつ全点で負です。コンパクト性から両者の最大値は負なので、十分小さい $\delta>0$ に対し $\theta_\pm(p)\le-\delta$（全 $p\in S$）です。法線零合同は超曲面直交なので回転 $\omega=0$ です。せん断の二乗 $\sigma_{ab}\sigma^{ab}\ge0$ とRicci条件をRaychaudhuri式に代入して

$$
\theta'=-\frac12\theta^2-\sigma_{ab}\sigma^{ab}-R_{ab}k^ak^b
\le-\frac12\theta^2.
$$

焦点以前には $\theta<0$ が持続します。$\theta^2>0$ なので両辺を割り、

$$
\left(\frac1\theta\right)'=-\frac{\theta'}{\theta^2}\ge\frac12,\qquad
\frac1{\theta(\lambda)}\ge\frac1{\theta(0)}+\frac\lambda2
\ge-\frac1\delta+\frac\lambda2.
$$

もし $B=2/\delta$ まで焦点がなく、滑らかな横断Jacobi写像が非退化なら、左辺は負で右辺は非負となって矛盾します。従って $B$ 以下で横断Jacobi写像が退化し、初期曲面 $S$ に対する焦点が生じます。[GR36の有限アフィン長集束補題](../GR36/index.md#lem-gr36-negative-expansion)と同じ評価です。$\square$
<!-- proof-end -->

焦点は光線束の横断偏差が退化することです。光的測地線がそこで終わると結論するには、さらに大域的な議論が必要です。

## 4. 因果境界の生成光線が持つ制約

$I^+(S)$ を $S$ の時間的未来、$J^+(S)$ を因果的未来とします。大域双曲的時空では[LORG16の因果到達関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)と $S$ のコンパクト性から $J^+(S)$ が閉じ、

$$
E^+(S):=J^+(S)\setminus I^+(S)=\partial I^+(S)
$$

です。後者は[LORG12のachronal境界定理](../../../幾何系/LORG/LORG12/index.md#thm-lorg12-boundary-achronal)により閉かつachronal（異なる二点を時間的に結べない）です。

<a id="lem-gr37-boundary-generators"></a>

<!-- formal-statement-start -->
> **補題（未来光的境界生成線の長さ制限）**
> $(M,g)$ を滑らかな大域双曲的四次元Lorentz時空、$S$ をコンパクトで滑らかな空間的二次元曲面とする。$q\in E^+(S)\setminus S$ なら、$S$ から $q$ に達する未来光的測地線があり、始点で $S$ に直交し、$q$ より前に $S$ に対する焦点を持たない。さらに $S$ が閉じた未来捕獲面で光的Ricci集束条件を満たし、未来光的測地線がすべて完備なら、$E^+(S)$ の各点は二つの規格化零法線からアフィン長 $B=2/\delta$ 以下で到達する。
<!-- formal-statement-end -->

### 証明の見取り図

境界上の点へ時間的曲線が届けば、その点は $I^+(S)$ に入ってしまいます。そこで境界を結ぶ最大化因果曲線は光的であり、始点を曲面内で動かす第一変分は法線条件を与えます。焦点の後には変分で時間的経路が作れるため、境界生成は続けられません。

<!-- proof-start -->
### 証明

$q\in E^+(S)\setminus S$ を固定します。$q\in J^+(S)$ より、ある $p\in S$ から $q$ へ因果曲線が存在します。$q\notin I^+(S)$ なので $p\not\ll q$。[LORG18のAvez–Seifert定理](../../../幾何系/LORG/LORG18/index.md#thm-lorg18-avez-seifert)を $p\le q$ に使うと長さ零の最大化曲線があり、[その測地線規則性](../../../幾何系/LORG/LORG18/index.md#prop-lorg18-local-geodesic)から非定数光的測地線を得ます。

始点の接ベクトルを $k(0)$ とします。$S$ 内で始点を速度 $v\in T_pS$ で動かし、終点 $q$ を固定した曲線変分の変分場を $V$ とします。$L$ を元の光線のアフィン長、$\mathcal E=\frac12\int_0^L g(\dot\gamma,\dot\gamma)\,d\lambda$ を、曲線から実数を作るエネルギー積分と定めると、測地線方程式と $V(L)=0$ を使った第一変分は

$$
\begin{aligned}
\delta\mathcal E
&=[g(V,k)]_0^L-\int_0^L g(V,\nabla_k k)\,d\lambda\\
&=-g(v,k(0)).
\end{aligned}
$$

もし $g(v,k(0))\ne0$ なら、$v$ の符号を選んで零光線の端点を時間的に到達できる側へ変形できます（凸正規近傍ごとに時間的な小変形をつなぐ）。すると $q\in I^+(S)$ となって境界性に反します。従って $g(v,k(0))=0$ がすべての $v\in T_pS$ で必要であり、光線は $S$ に直交します。

焦点後の主張では、**点からの共役点**と**曲面からの焦点**を区別します。後者では、始点を $S$ に沿って動かす法線測地線変分に非零の横断Jacobi場 $J$ が存在し、ある焦点時刻 $\lambda_f$ で零になります。さらに先にある終点までのアフィン長を $L$ と書けば、

$$
J(\lambda_f)=0,\qquad 0<\lambda_f<L.
$$

$J$ を $[\lambda_f,L]$ で零に延長します。始点を $S$ に、終点を $q$ に固定する二変数の曲線変分 $\gamma_{\varepsilon,\eta}$ を考え、そのエネルギー積分の混合二次変分を、次の記号で表します。

$$
I_S(V,W):=\left.
\partial_\varepsilon\partial_\eta
\mathcal E(\gamma_{\varepsilon,\eta})\right|_{(0,0)}.
$$

先ほど確かめた $k(0)\perp T_pS$ により元の光線はこの変分で停留します。Jacobi方程式をこの二次変分に代入し部分積分すると、$\lambda_f$ 近くに支持を持つ横断変分 $W$ に対して交差項は

$$
I_S(J,W)=g(D_\lambda J(\lambda_f),W(\lambda_f)).
$$

非零Jacobi場は $J(\lambda_f)=D_\lambda J(\lambda_f)=0$ を同時には満たせません。従って $W$ の符号を選べば $I_S(J,W)<0$ とでき、十分小さい $\varepsilon>0$ に対し

$$
I_S(J+\varepsilon W,J+\varepsilon W)
=2\varepsilon I_S(J,W)+\varepsilon^2 I_S(W,W)<0.
$$

これは焦点を越えた零曲線に時間的な端点固定変形があるという光的第二変分の判定です。したがって $q\in I^+(S)$ となり境界性に反します。焦点**ちょうどの点**は境界に残り得ますが、それより先は残れません。回転零・曲面始点のJacobi条件を使うので、[LORG18の点に対する共役点](../../../幾何系/LORG/LORG18/index.md#def-lorg18-conjugate)をそのまま代用してはいません。

未来光的完備性を仮定すると、[一様集束上限](#prop-gr37-uniform-focusing)によりすべての正規化法線測地線は $B$ までに焦点を持ちます。従って境界点は $0\le\lambda\le B$ の像に限られます。$\square$
<!-- proof-end -->

この局所変分の仕組みは[LORG18の共役点の定義](../../../幾何系/LORG/LORG18/index.md#def-lorg18-conjugate)と関連しますが、ここで重要なのは始点が曲面 $S$ 全体を動けることです。

## 5. 局所集束から大域的不完備へ

完備な光的測地線に沿う焦点の出現を確かめても、それだけでは不完備とは言えません。ここで[LORG15のCauchy面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)の**非コンパクト性**と正面から衝突させます。

<a id="thm-gr37-penrose"></a>

<!-- formal-statement-start -->
> **定理（Penrose型光的測地不完備定理）**
> $(M,g)$ を滑らかで連結、境界なし、時間向き付きの四次元**大域双曲的**Lorentz時空とする。次を仮定する。
>
> 1. 非コンパクトなCauchy面 $\Sigma$ が存在する。
> 2. 任意の非零光的ベクトル $k$ に対し $R_{ab}k^ak^b\ge0$ が成り立つ。
> 3. $\Sigma$ 内に、滑らかでコンパクト・境界なし・二側的な**閉じた未来捕獲面** $S$ が存在する。
>
> このとき $(M,g)$ は**未来光的測地不完備**である。すなわち、未来へ有限のアフィンパラメータ端点を持つ極大光的測地線が少なくとも一本存在する。
<!-- formal-statement-end -->

### 証明の見取り図

背理法で未来光的完備性を仮定します。捕獲面からの一様集束で、未来光的境界 $E^+(S)$ をコンパクトにします。一方、achronal境界には局所的な「端」がなく、時間的流線を通して非コンパクトCauchy面へ射影すると、像は開かつ閉になります。空でなければその像はCauchy面全体になり、コンパクト性に矛盾します。

<!-- proof-start -->
### 証明

すべての未来光的測地線が未来完備と仮定します。[捕獲面からの一様集束上限](#prop-gr37-uniform-focusing)から $\delta>0$ と $B=2/\delta$ を取ります。二つの未来向き規格化法線 $k_\pm$ により、

$$
F_\pm:S\times[0,B]\longrightarrow M,\qquad
F_\pm(p,\lambda)=\exp_p(\lambda k_\pm(p))
$$

を定義します。完備性の仮定から写像はすべての $(p,\lambda)$ で定義され連続です。$S\times[0,B]$ はコンパクトなので各 $F_\pm$ の像もコンパクト。両像の合併を $K$ とします。

[未来光的境界生成線の長さ制限](#lem-gr37-boundary-generators)により $E^+(S)\subset K$。一方 $E^+(S)=\partial I^+(S)$ は[LORG12の境界定理](../../../幾何系/LORG/LORG12/index.md#thm-lorg12-boundary-achronal)から閉です。従って $K$ の閉部分集合であり、$E^+(S)$ はコンパクトです。

次に、[LORG19の位相的分割の証明で構成した完全な時間的ベクトル場](../../../幾何系/LORG/LORG19/index.md#thm-lorg19-topological-splitting) $X$ の流れ $\Phi_s$ を使います。各流線は両側非延長の時間的曲線なので、[Cauchy面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)により、仮定した**この** $\Sigma$ と一度だけ交わります。$\Sigma$ をLORG19の時間関数の零レベル集合と仮定する必要はありません。$\pi(\Phi_s(p))=p$（$p\in\Sigma$）で定まる写像

$$
\pi:M\longrightarrow\Sigma
$$

は連続です。実際、時間的流線を縦軸にした局所流れ箱では、Cauchy面は流線と一回交わる連続な局所グラフです。交点の流れパラメータが初期点に連続に依存することから $\pi$ の局所連続性が従います。$E^+(S)$ はachronalなので、同じ時間的流線が $E^+(S)$ と二度交わることはなく、$\pi|_{E^+(S)}$ は単射です。[LORG12の境界の局所グラフ表示](../../../幾何系/LORG/LORG12/index.md#lem-lorg12-boundary-graph)を流線方向の局所座標で使うと、$\pi|_{E^+(S)}$ は局所同相で、像 $\pi(E^+(S))$ は $\Sigma$ の**開集合**です。ここでは「単射だから開」と飛ばさず、境界が三次元の端のない局所グラフであることを使っています。

一方、境界 $E^+(S)$ はコンパクトで射影 $\pi$ は連続なので、その像もコンパクトです。Cauchy面 $\Sigma$ はHausdorffだから、この像は**閉集合**でもあります。

[Cauchy面のacausal性](../../../幾何系/LORG/LORG15/index.md#prop-lorg15-acausal)と $S\subset\Sigma$ から、$S$ の相異なる二点を時間的に結ぶ曲線はありません。各点自身は $J^+(S)$ に含まれるので、$S\subset E^+(S)$ が従い、射影像は非空です。

連結な時空のCauchy面も連結です。したがって非空で開かつ閉の射影像は面全体に等しく、

$$
\pi(E^+(S))=\Sigma.
$$

左辺はコンパクト、右辺は仮定により非コンパクト。矛盾です。未来光的完備性の仮定は偽で、少なくとも一本の未来不完備な光的測地線が存在します。$\square$
<!-- proof-end -->

**各仮定の担当場所**：光的Ricci条件はRaychaudhuri不等式に、捕獲面の二方向の負の膨張率とコンパクト性は一様上限 $B$ に、大域双曲性は因果境界と曲線の抽出・流線分割に、非コンパクトCauchy面は最後の位相矛盾に使いました。どれも「曲率不変量が発散する」という仮定ではありません。

## 6. 代表時空で有限のパラメータを直接積分する

### 6.1 膨張模型の共動時間と光のアフィン長

後の宇宙論の結論を前提にしない模型計算として、$t>0$ 上で

$$
ds^2=-dt^2+t^{2p}(dx^2+dy^2+dz^2),\qquad p>0
$$

を考えます。共動曲線 $x,y,z=\text{const.}$ では $ds^2=-dt^2$ で固有時 $\tau=t+$定数です。さらに $g_{tt}=-1$、$g_{ti}=0$ が定数なので $\Gamma^\mu_{tt}=0$、すなわち $\nabla_{\partial_t}\partial_t=0$。$t_1>0$ から $t\downarrow0$ に至る固有時は $t_1$ で、過去時間的不完備です。

次に $x$ 方向の光線で、[GR14のKilling場の保存量](../GR14/index.md#thm-gr14-killing-charge)を $x$ 並進に適用します。アフィン媒介の保存量を $P=t^{2p}dx/d\lambda\ne0$ とします。零条件から

$$
0=-\left(\frac{dt}{d\lambda}\right)^2
+t^{2p}\left(\frac{dx}{d\lambda}\right)^2,\qquad
\frac{dt}{d\lambda}=\frac{|P|}{t^p}
$$

（未来向き）です。従って

$$
\lambda(t_1)-\lambda(0+)
=\frac1{|P|}\int_0^{t_1}t^p\,dt
=\frac{t_1^{p+1}}{(p+1)|P|}<\infty.
$$

光線も過去不完備ですが、光のアフィン長と共動観測者の固有時は違います。これは指定した模型の直接計算で、後続章のFriedmann方程式を援用していません。

### 6.2 Schwarzschild内部で未来の有限固有時を求める

<a id="prop-gr37-schwarzschild-proper-time"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschild内部の有限固有時）**
> 質量 $M>0$ のSchwarzschild未来ブラックホール内部 $0<r<2M$ で、径方向の未来向き時間的測地線が保存エネルギー $E=1$ を持ち、半径が減少するとする。半径 $r_0\in(0,2M)$ から $r\downarrow0$ に至る固有時は

$$
\Delta\tau=\frac{2r_0^{3/2}}{3\sqrt{2M}}
$$

> で有限である。
<!-- formal-statement-end -->

### 証明の見取り図

時間並進のKilling保存量と四元速度の規格化から、径方向速度の一階式を作ります。地平線の座標発散は積分の発散とは関係しません。

<!-- proof-start -->
### 証明

[GR16のSchwarzschild計量](../GR16/index.md#thm-gr16-schwarzschild)で $f(r)=1-2M/r$ と置きます。$r\ne2M$ の領域では時間的四元速度 $u=\dot t\,\partial_t+\dot r\,\partial_r$ の規格化と、[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)から

$$
-1=-f\dot t^2+f^{-1}\dot r^2,\qquad E=f\dot t=1.
$$

$\dot t=E/f$ を代入して両辺に $f$ を掛けると

$$
-f=-E^2+\dot r^2,\qquad
\dot r^2=E^2-f=\frac{2M}{r}.
$$

未来の減少枝は $\dot r=-\sqrt{2M/r}$ です。よって

$$
\Delta\tau
=\int_{r_0}^{0}\frac{dr}{-\sqrt{2M/r}}
=\frac1{\sqrt{2M}}\int_0^{r_0}\sqrt r\,dr
=\frac{2r_0^{3/2}}{3\sqrt{2M}}.
$$

地平線を横断できることは[GR26の正則なEF表示](../GR26/index.md#prop-gr26-ef-metric-domain)で確認されます。[GR25のKretschmann公式](../GR25/index.md#thm-gr25-kretschmann-schwarzschild)の定理文は外部 $r>2M$ について述べていますが、ここで内部への適用根拠も確かめます。EF計量

$$
ds^2=-\left(1-\frac{2M}{r}\right)dv^2+2\,dv\,dr+r^2d\Omega^2
$$

は $r>0$ の連結領域で実解析的かつ非退化です。曲率の完全縮約 $\mathcal K$ は計量・逆計量と一、二階微分の有理式であり、この領域で実解析的です。外部で得た $\mathcal K=48M^2/r^6$ は実解析関数の一致性により $0<r<2M$ でも成り立ちます。従って

$$
\mathcal K(r)=\frac{48M^2}{r^6}\longrightarrow+\infty
\qquad(r\downarrow0).
$$

この模型では有限固有時と曲率発散の**両方を別々に**確かめました。$\square$
<!-- proof-end -->

## 7. 仮定を外したとき・定理が言わないこと

- **曲率発散は定理の結論ではありません。** 第1節の平坦半時空は測地不完備ですが曲率零です。
- **光的Ricci条件がなければ集束不等式が使えません。** [GR35のRicci縮約](../GR35/index.md#prop-gr35-ricci-convergence)では、Einstein方程式が成立すると $R_{ab}k^ak^b=8\pi T_{ab}k^ak^b$。宇宙項の寄与は $g_{ab}k^ak^b=0$ なので消えます。
- **コンパクトCauchy面では最後の矛盾が作れません。** 仮に $\pi(E^+(S))=\Sigma$ でも $\Sigma$ のコンパクト性と矛盾しないからです。完備性を肯定したことにはなりません。
- **大域双曲性がなければ生成線の抽出・Cauchy面への流線射影が使えません。** 集束の局所計算が成立しても大域の結論は自動では出ません。
- **捕獲面がなければ二方向の有限上限が出ません。** Minkowski球面の出射側膨張は正でした。

特異点定理は、局所の集束条件・捕獲面・大域因果性が同時にある時空を、光的測地線が全部完備なものとしては構成できない、という**非存在型の結論**です。

## 8. 演習：集束から不完備性へ

### Level A：定義と局所計算

<a id="ex-gr37-a01"></a>
#### GR37-A01 平坦半時空の光線
- Level: A

$M_+=\{(t,x,y,z):t>0\}$ にMinkowski計量を入れる。$\gamma(\lambda)=(\lambda,2+\lambda,0,0)$、$\lambda>0$ が過去光的不完備であることと曲率を判定せよ。

<!-- solution-start -->
**詳細解答**。速度は $(1,1,0,0)$ で、計量による規格化は

$$
g(\dot\gamma,\dot\gamma)=-1+1=0.
$$

時間成分が正なので未来向きです。Christoffel係数は全零、$\ddot\gamma=0$ なので $\lambda$ はアフィンパラメータです。過去へ $\lambda\downarrow0$ とすると $(0,2,0,0)$ に近づきますが、この点は $M_+$ にありません。極大区間 $(0,\infty)$ の下端が有限なので[測地不完備の定義](#def-gr37-geodesic-incompleteness)より過去光的不完備です。定数計量の接続係数が零だからRiemann曲率も零です。
<!-- solution-end -->

<a id="ex-gr37-a02"></a>
#### GR37-A02 二つの光的法線
- Level: A

$g(n,n)=-1$、$g(s,s)=1$、$g(n,s)=0$、$n$ は未来向き、$s$ は空間的として、$k_\pm=n\pm s$ が未来光的で $g(k_+,k_-)=-2$ を満たすことを示せ。

<!-- solution-start -->
**詳細解答**。双線形性から $g(n\pm s,n\pm s)=g(n,n)+g(s,s)\pm2g(n,s)=-1+1=0$、また $g(n+s,n-s)=g(n,n)-g(s,s)=-2$ です。$n$ に適合する局所直交枠で $s$ の時間成分は零なので $n\pm s$ はどちらも未来向きです。これは捕獲面の法線規格化がどの内積から来るかを示します。
<!-- solution-end -->

<a id="ex-gr37-a03"></a>
#### GR37-A03 集束のアフィン長
- Level: A

四次元の回転零な未来光的法線合同で $R_{ab}k^ak^b\ge0$、$\theta(0)=-1/4$ とする。焦点のアフィン長上限を求めよ。

<!-- solution-start -->
**詳細解答**。[Raychaudhuri不等式](../GR34/index.md#thm-gr34-null-raychaudhuri)は $\theta'\le-\theta^2/2$。$\theta(0)<0$ なので $(1/\theta)'\ge1/2$ を積分して $1/\theta(\lambda)\ge-4+\lambda/2$ です。焦点以前の左辺は負なので $\lambda=8$ で矛盾し、焦点は $\lambda\le8$ にあります。これは測地線自身が $8$ で終わる意味ではありません。
<!-- solution-end -->

<a id="ex-gr37-a04"></a>
#### GR37-A04 曲率と不完備性
- Level: A

「測地不完備なら曲率不変量が発散」「曲率が全零なら測地完備」「Penrose型定理は仮定の下で未来光的不完備を結論」の真偽を判定せよ。

<!-- solution-start -->
**詳細解答**。$M_+$ は過去時間的・光的不完備で曲率全零なので、最初の二命題はともに偽です。三番目は[Penrose型定理](#thm-gr37-penrose)の結論そのものなので真。ただし条件の一部を省略して一般の時空に適用することはできません。
<!-- solution-end -->

<a id="ex-gr37-a05"></a>
#### GR37-A05 球面の両膨張率
- Level: A

Minkowski時空の $t=0$ の半径 $R=3$ の球面から $r=3\pm\lambda$ と進む出射・入射光線について、$\lambda=0$ の膨張率を計算し、閉じた未来捕獲面か判定せよ。

<!-- solution-start -->
**詳細解答**。球面の面積密度は $a=r^2\sin\vartheta$ です。[GR36の面積輸送](../GR36/index.md#prop-gr36-area-transport)で $\theta=a'/a=2r'/r$。出射 $r'=1$ は $\theta_+=2/3$、入射 $r'=-1$ は $\theta_-=-2/3$ です。球面はコンパクト・境界なしですが、[捕獲面の定義](#def-gr37-trapped-surface)の二つの不等式の片方が失敗します。
<!-- solution-end -->

### Level B：局所と大域をつなぐ

<a id="ex-gr37-b01"></a>
#### GR37-B01 コンパクト性と共通上限
- Level: B

コンパクト捕獲面 $S$ で両零法線の膨張率に $\theta_+(p)\le-1/5$、$\theta_-(p)\le-1/8$（全 $p$）があり、各法線でRicci集束条件が成立するとする。焦点の一様上限を求めよ。また非コンパクトな初期点集合では、負値だけでは一様上限にならないことを数列で説明せよ。

<!-- solution-start -->
**詳細解答**。両方に使える $\delta$ は $\min(1/5,1/8)=1/8$ です。[一様集束上限](#prop-gr37-uniform-focusing)により $B=2/\delta=16$ です。一方、非コンパクトな初期点列で $\theta(0,p_n)=-1/n$（$n\ge1$）なら全点で負でも集束評価は $2n$ となり一様上限を持ちません。これはコンパクト性の論理的役割を示す数列模型で、任意の合同の存在を追加仮定なしに主張していません。
<!-- solution-end -->

<a id="ex-gr37-b02"></a>
#### GR37-B02 光的境界のコンパクト性
- Level: B

大域双曲的時空の閉じた未来捕獲面 $S$ に対し、未来完備性から $F_\pm:S\times[0,B]\to M$ が連続で全定義とする。$E^+(S)$ が閉で $F_+(S\times[0,B])\cup F_-(S\times[0,B])$ に含まれると仮定して、$E^+(S)$ がコンパクトと示せ。

<!-- solution-start -->
**詳細解答**。$S$ と $[0,B]$ はともにコンパクト、積 $S\times[0,B]$ もコンパクトです。連続写像 $F_\pm$ の像はコンパクト、有限和 $K$ もコンパクトです。$E^+(S)$ は閉で $K$ に含まれるので、コンパクトな $K$ の閉部分集合としてコンパクトです。単に「$K$ に含まれるから」と言うだけでは、閉性が抜ける点に注意します。
<!-- solution-end -->

<a id="ex-gr37-b03"></a>
#### GR37-B03 Cauchy面への流線射影
- Level: B

連結で非コンパクトなCauchy面 $\Sigma$ を持つ大域双曲的時空に、空でないコンパクト・achronal境界 $A$ があると仮定する。時間的流線射影 $\pi:M\to\Sigma$ の $A$ 上の制限は単射かつ局所同相であるとして矛盾を導け。

<!-- solution-start -->
**詳細解答**。局所同相から $\pi(A)$ は $\Sigma$ で開です。$A$ のコンパクト性と $\pi$ の連続性から $\pi(A)$ はコンパクト、Hausdorffな $\Sigma$ の閉集合です。非空・開・閉であり $\Sigma$ が連結なので $\pi(A)=\Sigma$。左辺はコンパクト、右辺は非コンパクトなので矛盾します。開性は単射だけではなく、局所グラフ表示から得る条件です。
<!-- solution-end -->

<a id="ex-gr37-b04"></a>
#### GR37-B04 膨張模型の二種類の長さ
- Level: B

$p>0$、$t>0$ の二次元模型 $ds^2=-dt^2+t^{2p}dx^2$ について、共動測地線が $t=t_1$ から $t\downarrow0$ までに進む固有時と、保存量 $P=t^{2p}dx/d\lambda\ne0$ を持つ光線のアフィン長を求めよ。

<!-- solution-start -->
**詳細解答**。共動では $dx=0$ で $d\tau=dt$。固有時は $\int_0^{t_1}dt=t_1$。光では零条件に保存量を代入して

$$
\left(\frac{dt}{d\lambda}\right)^2
=t^{2p}\left(\frac{P}{t^{2p}}\right)^2
=\frac{P^2}{t^{2p}}.
$$

未来向き枝を選ぶと $dt/d\lambda=|P|/t^p$ なので

$$
\Delta\lambda
=\int_0^{t_1}\frac{t^p}{|P|}\,dt
=\frac{t_1^{p+1}}{(p+1)|P|}.
$$

両方とも有限ですが数値は異なります。光のアフィンパラメータを固有時と同一視できません。
<!-- solution-end -->

### Level C：定理の論理を再構成する

<a id="ex-gr37-c01"></a>
#### GR37-C01 捕獲面から光的不完備へ
- Level: C

滑らかで連結・時間向き付き・大域双曲的な四次元時空に、非コンパクトCauchy面 $\Sigma$ とその中の閉じた未来捕獲面 $S$ があり、全光的方向で $R_{ab}k^ak^b\ge0$ が成り立つ。$S$ 上で $\theta_\pm\le-\delta$（$\delta>0$）とする。

1. 未来光的完備性を仮定し、境界 $E^+(S)$ がコンパクトであることを示せ。
2. 時間的流線への射影を使って非コンパクト $\Sigma$ との矛盾を導け。
3. $\Sigma$ の非コンパクト性を外したときの証明の破綻点を記せ。
4. この論証はKretschmann不変量の発散まで証明するか判定せよ。

<!-- solution-start -->
**詳細解答**。

1. [Raychaudhuri方程式](../GR34/index.md#thm-gr34-null-raychaudhuri)へ回転零とRicci条件を代入して $\theta'\le-\theta^2/2$ を得ます。焦点以前の $\theta<0$ について

   $$
   (1/\theta)'\ge1/2,\qquad
   1/\theta(\lambda)\ge1/\theta(0)+\lambda/2
   \ge-1/\delta+\lambda/2.
   $$

   $B=2/\delta$ では右辺が零なので、それ以前に焦点が生じます。[未来光的境界生成線の長さ制限](#lem-gr37-boundary-generators)から $E^+(S)\subset K=F_+(S\times[0,B])\cup F_-(S\times[0,B])$。未来完備性から両 $F_\pm$ は全定義で連続、$K$ はコンパクトです。[LORG12の境界閉性](../../../幾何系/LORG/LORG12/index.md#thm-lorg12-boundary-achronal)から $E^+(S)$ は閉なので、$K$ の閉部分集合としてコンパクトです。
2. [LORG19の流線分割](../../../幾何系/LORG/LORG19/index.md#thm-lorg19-topological-splitting)で射影 $\pi:M\to\Sigma$ を作ります。$E^+(S)$ はachronalなので $\pi$ の制限は単射、[局所グラフ表示](../../../幾何系/LORG/LORG12/index.md#lem-lorg12-boundary-graph)から像は開です。連続像のコンパクト性から像は閉でもあります。$S\subset E^+(S)$ により非空なので、連結な $\Sigma$ では $\pi(E^+(S))=\Sigma$。これは非コンパクトな $\Sigma$ に矛盾します。
3. $\Sigma$ がコンパクトなら全射 $\pi(E^+(S))=\Sigma$ と像のコンパクト性は矛盾しません。集束の評価が失敗するのではなく、**最後の位相矛盾**が消えます。完備性の逆方向を示したことにもなりません。
4. いいえ。得られるのは未来に有限アフィン長の極大光的測地線の存在です。曲率の大きさを制御する式は証明に出てこず、第1節の平坦半時空が不完備性から曲率発散への含意の反例です。
<!-- solution-end -->

## 9. 次に何を問うか

不完備な測地線が存在することと、その不完備な領域を遠方の観測者が見られることは別問題です。次のGR38では、宇宙検閲仮説の弱い形・強い形と、既知の定理が保証する範囲を区別します。
