# IG2 Fisher--Rao 計量と座標不変性

前章では分布の一次変化を[接速度と方向スコア](../IG1/index.md#def-ig1-directional-score)で表しました。しかし、二つの方向がどれだけ大きく、どれだけ似ているかは、まだ測っていません。たとえば Bernoulli 族では、確率 $p$ を $0.01$ だけ動かすことの意味は、$p=1/2$ と $p=0.001$ では同じでしょうか。

その答えを得るには、分布が自身の確率で重み付けする内積を使います。スコアの積の期待値を並べると方向の大きさを測る行列が生まれ、パラメータの名前を替えても変わらない長さを定められます。

本章では、まずスコアの二乗平均から半正定値性を証明し、正定値になるためには分布の方向が失われないことが必要だと確認します。次に有限確率単体上の計量、パラメータの取り替え、正規分布の二次元例を計算し、最後に経路の長さと距離を求めます。KL divergence から計量を導く議論は IG3、正規位置尺度族の曲率計算は IG13 で扱います。

<!-- definition-example-audit: strict -->

---

## 1. スコアの大きさをどう測るか

[IG1 の正則支配モデル](../IG1/index.md#def-ig1-geometric-regularity)では、共通の正の台、密度の $L^1$ 微分可能性、スコアの二乗可積分性を仮定しました。[正則支配モデルのスコア平均0](../IG1/index.md#thm-ig1-regular-score-mean)により各座標スコア $S_i$ は平均0です。

そのため、二つのスコア $S_i,S_j$ の積の期待値は共分散に一致します。確率変数の二乗平均は、確率が低い結果での大きな相対変化も反映します。まずこの期待値を、モデルのパラメータ方向同士を比較する行列として定義します。

<a id="def-ig2-fisher-information"></a>
<!-- formal-statement-start -->
> **定義（Fisher 情報行列）**
> $\Theta\subseteq\mathbb R^d$ を開集合とし、$\{P_\theta:\theta\in\Theta\}$ を IG1 の幾何学的正則支配モデルとする。座標スコアを $S_i(X;\theta)=\partial_i\log p_\theta(X)$ と書く。**Fisher 情報行列** $G(\theta)=(g_{ij}(\theta))_{i,j=1}^d$ を

$$
g_{ij}(\theta)=E_\theta[S_i(X;\theta)S_j(X;\theta)]
$$

> によって定義する。方向 $u,v\in\mathbb R^d$ に対して

$$
I_\theta(u,v)=u^{\mathsf T}G(\theta)v
=E_\theta[S_u(X;\theta)S_v(X;\theta)]
$$

> と置く。有限正パラメータ表示 $P(\theta)=(p_1(\theta),\ldots,p_m(\theta))$ では同じ行列は

$$
g_{ij}(\theta)
=\sum_{x=1}^m
\frac{\partial_i p_x(\theta)\,\partial_j p_x(\theta)}{p_x(\theta)}
$$

> で与えられる。
<!-- formal-statement-end -->

最後の等式は、[スコアと接速度の対応](../IG1/index.md#thm-ig1-finite-score-velocity)から $\partial_i\log p_x=(\partial_i p_x)/p_x$ を代入して得られます。分母が確率であるため、$p_x>0$ の仮定が効いています。

<!-- definition-example-start: def-ig2-fisher-information -->
**定義の確認**

Bernoulli 族で調べます。

$X\in\{0,1\}$、$P_p(X=1)=p$、$0<p<1$ とします。対数確率を微分すると

$$
S_p(1)=\frac1p,\qquad
S_p(0)=-\frac1{1-p}.
$$

確率による重みを掛けて二乗平均を求めれば

$$
g_{pp}
=p\frac1{p^2}+(1-p)\frac1{(1-p)^2}
=\frac1p+\frac1{1-p}
=\frac1{p(1-p)}.
$$

これは正の有限値です。$p=1/2$ では $g_{pp}=4$、$p=1/100$ では $g_{pp}=10000/99$ であり、同じ微小な $dp$ でも境界に近いほど長さの重みが大きくなります。
<!-- definition-example-end -->

### 二乗平均がいつ内積になるか

Fisher 行列を「計量」と直ちに呼ぶには注意が要ります。ある方向へパラメータを動かしても分布が一次では変化しないなら、その方向の二乗平均は $0$ になり、長さとして使えません。

<a id="thm-ig2-positive-definiteness"></a>
<!-- formal-statement-start -->
> **定理（Fisher 行列の半正定値性と非退化条件）**
> 上の正則支配モデルの各 $\theta\in\Theta$ において、$G(\theta)$ は実対称・半正定値である。さらに次は同値である。
>
> 1. $G(\theta)$ が正定値である。
> 2. $S_1(\cdot;\theta),\ldots,S_d(\cdot;\theta)$ が $L^2(P_\theta)$ で一次独立である。
> 3. $S_u=0$ が $P_\theta$ ほとんど確実に成立する方向 $u$ は $u=0$ に限る。
>
> 有限正パラメータ表示の場合は、これらは $dP_\theta$ の単射性とも同値である。
<!-- formal-statement-end -->

**証明の見取り図**：行列の二次形式を「方向スコアの二乗の期待値」へ戻します。有限モデルでは全結果の確率が正なので、「ほとんど確実に $0$」は「全結果で $0$」と同じです。

<!-- proof-start -->
### 証明

$L^2$ における [Cauchy--Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により $E_\theta[|S_iS_j|]<\infty$ です。実数の積の交換から $g_{ij}=g_{ji}$。任意の $u\in\mathbb R^d$ に対し有限和を展開すると

$$
u^{\mathsf T}Gu
=\sum_{i,j}u^iu^jE_\theta[S_iS_j]
=E_\theta\!\left[\left(\sum_i u^iS_i\right)^2\right]
=E_\theta[S_u^2]\ge0.
$$

非負な確率変数の期待値が $0$ であることと、その確率変数がほとんど確実に $0$ であることは同値です。従って

$$
u^{\mathsf T}Gu=0
\quad\Longleftrightarrow\quad
S_u=0\quad(P_\theta\text{ ほとんど確実}).
$$

任意の非零 $u$ で二次形式が正になる条件は、スコアの線形結合が $L^2$ で零元になるのが自明な場合だけという条件なので、1--3が同値です。

有限正モデルでは全ての $p_x(\theta)>0$ だから、$S_u=0$ がほとんど確実であることは各 $x$ で $S_u(x)=0$ であることと同値です。[IG1 の浸入性判定](../IG1/index.md#prop-ig1-immersion-criterion)により、これは $dP_\theta$ が単射である条件です。
<!-- proof-end -->

正則性の仮定は Fisher 行列の各成分が有限であることを保証しますが、$G(\theta)$ が $\theta$ の滑らかな関数になることまで自動保証するものではありません。連続モデルで Riemann 計量として用いるときには、**行列成分の滑らかさと正定値性**を別途確かめます。有限正モデルなら $p_x(\theta)$ が滑らかなので行列成分の滑らかさは分数表示から従います。

---

## 2. 確率単体に内積を入れる

Fisher 行列は座標で表したものです。これがどんな幾何を表すかを先に有限正確率単体上で見ます。[単体の接空間の定理](../IG1/index.md#thm-ig1-simplex-tangent)によると、点 $p$ の接方向 $v$ は $\sum_xv_x=0$ を満たします。その二方向の大きさを、各確率 $p_x$ で割って重み付けします。

[Riemann 計量の定義](../../GEO/GEO12/index.md#def-geo12-riemannian-metric)では、各接空間に滑らかに変化する正定値内積を入れます。また [滑らかな写像の微分](../../GEO/GEO2/index.md#def-geo2-differential) $dP_\theta$ は、パラメータ方向 $u$ を分布の接方向 $dP_\theta u$ へ移します。分布側の内積をこの二方向で評価してパラメータ側へ移す操作を**計量の引き戻し**といい、$(P^*g)_\theta(u,z)=g_{P(\theta)}(dP_\theta u,dP_\theta z)$ と書きます。

<a id="def-ig2-fisher-rao-metric"></a>
<!-- formal-statement-start -->
> **定義（有限正確率単体の Fisher--Rao 計量）**
> $m\ge2$、$p\in\Delta_{m-1}^{\circ}$ とし、$v,w\in T_p\Delta_{m-1}^{\circ}$ とする。**Fisher--Rao 計量**を

$$
g_p^{\mathrm{FR}}(v,w)
=\sum_{x=1}^m\frac{v_xw_x}{p_x}
$$

> によって定義する。$P:\Theta\to\Delta_{m-1}^{\circ}$ が滑らかな有限正パラメータ表示なら、方向 $u,z\in\mathbb R^d$ に対する引き戻しは

$$
(P^*g^{\mathrm{FR}})_\theta(u,z)
=g_{P(\theta)}^{\mathrm{FR}}(dP_\theta u,dP_\theta z)
$$

> である。
<!-- formal-statement-end -->

この定義はまず接方向同士の内積を与えます。行列表示は、パラメータの座標基底を $dP_\theta$ で写してから各組の内積を取ることで得られます。

<!-- definition-example-start: def-ig2-fisher-rao-metric -->
**定義の確認**

3値分布で調べます。

$$
p=(1/2,1/3,1/6),\quad
v=(1,-1,0),\quad
w=(0,1,-1)
$$

とします。$p$ の各成分は正で和は1、また $v,w$ は成分和0なので、いずれも定義の対象です。式に代入すると

$$
g_p^{\mathrm{FR}}(v,v)=2+3=5,
\qquad
g_p^{\mathrm{FR}}(w,w)=3+6=9,
$$

$$
g_p^{\mathrm{FR}}(v,w)=0-3+0=-3.
$$

$v,w$ の内積は負にもなりますが、それぞれの非零方向の二乗長は正です。二乗長が正であることと、二方向の内積が正であることは別の条件です。
<!-- definition-example-end -->

<a id="thm-ig2-simplex-pullback"></a>
<!-- formal-statement-start -->
> **定理（単体の計量と Fisher 情報行列）**
> $\Delta_{m-1}^{\circ}$ 上の $g^{\mathrm{FR}}$ は滑らかな Riemann 計量である。有限正パラメータ表示 $P:\Theta\subseteq\mathbb R^d\to\Delta_{m-1}^{\circ}$ について、その引き戻しの座標行列は Fisher 情報行列 $G$ に等しい。引き戻しが $\theta$ で正定値であることと $dP_\theta$ の単射性は同値である。
<!-- formal-statement-end -->

**証明の見取り図**：各接方向に対して $\sum_x v_x^2/p_x$ を評価します。これが [Riemann 計量の定義](../../GEO/GEO12/index.md#def-geo12-riemannian-metric)の内積条件を満たすことを確かめたうえで、接速度 $dP_\theta u$ を代入します。

<!-- proof-start -->
### 証明

$g_p^{\mathrm{FR}}$ は実双線形で対称です。$p_x>0$ なので、任意の $v$ について

$$
g_p^{\mathrm{FR}}(v,v)=\sum_x\frac{v_x^2}{p_x}\ge0.
$$

等号が成り立つと、各非負項が0だから全ての $v_x=0$ です。従って接空間上で正定値です。$p_x$ は単体の局所座標の滑らかな関数であり、各 $1/p_x$ も滑らかなので、接ベクトルの滑らかな局所基底に関する係数も滑らかです。よって [Riemann 計量の定義](../../GEO/GEO12/index.md#def-geo12-riemannian-metric)を満たします。

$dP_\theta u$ の第 $x$ 成分は $\sum_i u^i\partial_i p_x$ だから、$g^{\mathrm{FR}}$ に代入して

$$
\begin{aligned}
g_{P(\theta)}^{\mathrm{FR}}(dP_\theta u,dP_\theta z)
&=\sum_x\frac{
(\sum_i u^i\partial_i p_x)(\sum_jz^j\partial_jp_x)}{p_x}\\
&=\sum_{i,j}u^iz^j\sum_x\frac{\partial_i p_x\partial_jp_x}{p_x}\\
&=u^{\mathsf T}G(\theta)z.
\end{aligned}
$$

最後に、引き戻しの二乗長が0であることは $dP_\theta u=0$ と同値です。従って引き戻しが正定値であることは $dP_\theta$ の核が $\{0\}$ であることと同値です。
<!-- proof-end -->

有限正モデルがはめ込みなら、パラメータ空間にはこの引き戻しにより Riemann 計量が入ります。ただし **分布の像そのもの** に大域的な多様体構造を与えるには、[IG1で区別した埋め込み性](../IG1/index.md#prop-ig1-immersion-criterion)なども確認します。単なるはめ込みは異なるパラメータが同じ分布を表す可能性を残します。

### カテゴリカル分布の行列を一列ずつ作る

3値分布を

$$
P(a,b)=(a,b,c),\qquad c=1-a-b,\qquad a,b,c>0
$$

とします。座標基底方向は分布の接方向

$$
dP(\partial_a)=(1,0,-1),\qquad
dP(\partial_b)=(0,1,-1)
$$

に写ります。よって定義から

$$
G(a,b)=
\begin{pmatrix}
1/a+1/c & 1/c\\
1/c & 1/b+1/c
\end{pmatrix}.
$$

主対角成分と行列式を調べると

$$
\det G
=\frac1{ab}+\frac1{ac}+\frac1{bc}
=\frac{a+b+c}{abc}
=\frac1{abc}>0.
$$

なぜこの行列で正定値性を判定できるのでしょうか。任意のパラメータ方向 $u\partial_a+v\partial_b$ の像は

$$
dP_{(a,b)}(u\partial_a+v\partial_b)
=(u,v,-u-v)
$$

で、これが零なら $u=v=0$ です。従って $dP$ は単射であり、[引き戻しの正定値性の定理](#thm-ig2-simplex-pullback)によって $G$ は正定値です。行列式の計算もこれと整合しますが、行列式が正という条件だけを一般の行列に適用して正定値性を結論したわけではありません。

---

## 3. 座標を替えても方向の長さは変わらない

Bernoulli 族を確率 $p$ で表すか、対数オッズ $\eta=\log(p/(1-p))$ で表すかで、行列の数値は変わります。しかし同じ分布の変化の二乗長は一致するはずです。ここで座標ごとの行列と、幾何学的な内積を区別します。

<a id="thm-ig2-coordinate-invariance"></a>
<!-- formal-statement-start -->
> **定理（Fisher 行列の座標変換則）**
> $\Theta,H\subseteq\mathbb R^d$ を開集合、$h:H\to\Theta$ を滑らかな局所微分同相写像とする。$\{P_\theta\}$ を幾何学的正則支配モデルとし、$\theta=h(\eta)$、$J_{ia}(\eta)=\partial\theta^i/\partial\eta^a$ と置く。新座標 $\eta$ による Fisher 行列 $\widetilde G$ は

$$
\widetilde G(\eta)=J(\eta)^{\mathsf T}G(h(\eta))J(\eta)
$$

> を満たす。従って新座標での方向 $w,z$ と、それに対応する旧座標での方向 $u=Jw,v=Jz$ について

$$
w^{\mathsf T}\widetilde Gz
=u^{\mathsf T}Gv.
$$

> 特に $G$ の正定値性は、滑らかな局所微分同相によるパラメータの取り替えで保たれる。
<!-- formal-statement-end -->

**証明の見取り図**：新しいスコアは古いスコアの $J$ による線形結合です。これは [IG1のスコア座標変換則](../IG1/index.md#thm-ig1-coordinate-change)そのものです。期待値を取る確率分布は同じなので、二つの線形結合を掛けて行列積へ整理できます。

<!-- proof-start -->
### 証明

$\theta=h(\eta)$ であり、各 $x$ において連鎖律から

$$
\widetilde S_a(x;\eta)
=\partial_{\eta^a}\log p_{h(\eta)}(x)
=\sum_iJ_{ia}(\eta)S_i(x;\theta)
$$

です。$J_{ia}$ は $x$ に依存せず、スコアは二乗可積分なので有限和と期待値を交換できます。新座標の分布は $P_{h(\eta)}$ と同じですから、

$$
\begin{aligned}
\widetilde g_{ab}(\eta)
&=E_{h(\eta)}[\widetilde S_a\widetilde S_b]\\
&=\sum_{i,j}J_{ia}J_{jb}E_{h(\eta)}[S_iS_j]\\
&=\sum_{i,j}J_{ia}g_{ij}(h(\eta))J_{jb}.
\end{aligned}
$$

これを行列でまとめると所望の変換則を得ます。また

$$
w^{\mathsf T}\widetilde Gz
=w^{\mathsf T}J^{\mathsf T}GJz
=(Jw)^{\mathsf T}G(Jz).
$$

$J$ は局所微分同相の Jacobian なので可逆です。従って $w\ne0$ なら $Jw\ne0$ であり、$G$ が正定値なら右辺は $z=w$ のとき正です。逆向きも $J^{-1}$ を使って従います。
<!-- proof-end -->

**Bernoulli の直接検算**

$$
p=\frac{e^\eta}{1+e^\eta},\qquad
\frac{dp}{d\eta}=p(1-p)>0.
$$

この Jacobian は零でなく、逆写像も滑らかなパラメータの取り替えです。前節で得た $G_p=1/[p(1-p)]$ から

$$
G_\eta
=\left(\frac{dp}{d\eta}\right)^2G_p
=p^2(1-p)^2\frac1{p(1-p)}
=p(1-p).
$$

スコアからも確認できます。$\widetilde S_\eta(X)=X-p$ なので

$$
E[(X-p)^2]=p(1-p)=G_\eta.
$$

つまり $G_p$ と $G_\eta$ の数字が異なることは座標不変性への反例ではありません。ここで $dp,d\eta$ は同じ接方向に沿った座標の微分を表します。実際、任意の滑らかな曲線 $\eta(t)$ に沿って連鎖律を使うと

$$
\frac{dp}{dt}
=\frac{dp}{d\eta}\frac{d\eta}{dt}
=p(1-p)\frac{d\eta}{dt}
$$

となるので、$dp=p(1-p)d\eta$ はこの微分の対応を略記したものです。従って

$$
G_p(dp)^2=G_\eta(d\eta)^2
$$

となり、同じ方向の二乗長が一致します。

---

## 4. 正規位置尺度族では二つの方向をどう測るか

有限分布だけでなく、連続モデルでも Fisher 行列は直接計算できます。分散を固定した正規位置族のスコアは IG1 で求めました。今度は平均 $\mu$ と標準偏差 $\sigma$ を両方動かします。$\sigma>0$ を使うのは分布の正則なパラメータ領域を指定するためです。

<a id="prop-ig2-normal-information"></a>
<!-- formal-statement-start -->
> **命題（正規位置尺度族の Fisher 計量）**
> $\Theta=\mathbb R\times(0,\infty)$ とし、Lebesgue 密度

$$
p_{\mu,\sigma}(x)
=\frac{1}{\sqrt{2\pi}\sigma}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

> をもつ $N(\mu,\sigma^2)$ 族を考える。この族の Fisher 行列は、座標 $(\mu,\sigma)$ で

$$
G(\mu,\sigma)=
\begin{pmatrix}
\sigma^{-2}&0\\
0&2\sigma^{-2}
\end{pmatrix}
$$

> であり、全 $\Theta$ 上で滑らかかつ正定値である。
<!-- formal-statement-end -->

**証明の見取り図**：標準化した変数 $Z=(X-\mu)/\sigma$ を導入すると $Z\sim N(0,1)$ です。二つのスコアは $Z$ と $Z^2-1$ で書けます。奇数次の積は対称性で消え、四次の積は正規密度への部分積分で求めます。

<!-- proof-start -->
### 証明

対数密度を先に書くと

$$
\ell(\mu,\sigma;x)
=-\frac12\log(2\pi)-\log\sigma-\frac{(x-\mu)^2}{2\sigma^2}.
$$

各座標で偏微分し、$Z=(x-\mu)/\sigma$ と置けば

$$
S_\mu=\frac{x-\mu}{\sigma^2}=\frac Z\sigma,\qquad
S_\sigma=-\frac1\sigma+\frac{(x-\mu)^2}{\sigma^3}
=\frac{Z^2-1}{\sigma}.
$$

$Z$ の標準正規密度を $\varphi(z)=(2\pi)^{-1/2}e^{-z^2/2}$ とします。$\varphi'(z)=-z\varphi(z)$ で、各多項式と $\varphi(z)$ の積は両端で0に収束するため、部分積分により

$$
E[Z^2]=-\int_{\mathbb R}z\varphi'(z)\,dz
=\int_{\mathbb R}\varphi(z)\,dz=1,
$$

$$
E[Z^4]=-\int_{\mathbb R}z^3\varphi'(z)\,dz
=3\int_{\mathbb R}z^2\varphi(z)\,dz=3.
$$

対称性で $E[Z]=E[Z^3]=0$ です。従って

$$
g_{\mu\mu}=\frac{E[Z^2]}{\sigma^2}=\frac1{\sigma^2},
$$

$$
g_{\mu\sigma}
=\frac{E[Z(Z^2-1)]}{\sigma^2}
=\frac{E[Z^3]-E[Z]}{\sigma^2}=0,
$$

$$
g_{\sigma\sigma}
=\frac{E[(Z^2-1)^2]}{\sigma^2}
=\frac{3-2+1}{\sigma^2}=\frac2{\sigma^2}.
$$

最後に任意の非零 $(u,v)$ に対し $(u^2+2v^2)/\sigma^2>0$ なので正定値です。$\sigma>0$ 上で各係数は滑らかです。正規密度は共通台 $\mathbb R$ に正で、パラメータの各コンパクト近傍では密度と偏微分を可積分な Gaussian 型の関数で支配できます。従って IG1 と同じ差商・優収束の議論により $L^1$ 微分可能であり、上の二乗モーメントが有限だからスコアも $L^2$ に属します。
<!-- proof-end -->

座標を $(\mu,\tau)$、$\tau=\log\sigma$ に替えると、$\sigma=e^\tau$ で Jacobian は $\operatorname{diag}(1,\sigma)$ です。[座標変換定理](#thm-ig2-coordinate-invariance)を使うと

$$
G(\mu,\tau)=
\begin{pmatrix}
e^{-2\tau}&0\\
0&2
\end{pmatrix}.
$$

標準偏差の対数を1だけ動かす方向の二乗長が常に $2$ であるのは、元の座標での $d\sigma=\sigma\,d\tau$ を反映します。ここでは計量だけを求め、曲率はまだ主張しません。

---

## 5. Fisher--Rao の長さと距離

計量があると、各瞬間の速度の二乗長を積分して曲線の長さを作れます。一般の [Riemann 長の定義](../../GEO/GEO12/index.md#def-geo12-length-energy)と [Riemann 距離の定義](../../GEO/GEO12/index.md#def-geo12-distance)を、Fisher 計量に適用します。

<a id="def-ig2-fisher-rao-distance"></a>
<!-- formal-statement-start -->
> **定義（Fisher--Rao 長と距離）**
> $\Theta\subseteq\mathbb R^d$ を連結な開集合とし、各点で滑らかで正定値な Fisher 行列 $G(\theta)$ を持つモデルを考える。区分的 $C^1$ 曲線 $\gamma:[a,b]\to\Theta$ の **Fisher--Rao 長**を

$$
L_{\mathrm{FR}}(\gamma)
=\int_a^b
\sqrt{\dot\gamma(t)^{\mathsf T}
G(\gamma(t))\dot\gamma(t)}\,dt
$$

> とし、二点 $\theta_0,\theta_1\in\Theta$ の **Fisher--Rao 距離**を

$$
d_{\mathrm{FR}}(\theta_0,\theta_1)
=\inf_{\substack{\gamma(a)=\theta_0\\\gamma(b)=\theta_1}}
L_{\mathrm{FR}}(\gamma)
$$

> と定義する。ただし下限は $\Theta$ 内の区分的 $C^1$ 曲線全体にわたる。分布の像の距離と同一視する場合は、モデルがその像を正しく表す埋め込みであること等を別に確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig2-fisher-rao-distance -->
**定義の確認**

Bernoulli 族の経路で調べます。

$\Theta=(0,1)$、$G_p=1/[p(1-p)]$ とし、$0<p_0<p_1<1$ を直線的に結ぶ

$$
\gamma(t)=(1-t)p_0+tp_1,\qquad 0\le t\le1
$$

を考えます。曲線は常に $(0,1)$ 内にあり、$\dot\gamma=p_1-p_0$ です。定義に代入し、$r=\gamma(t)$ と変数変換すると

$$
L_{\mathrm{FR}}(\gamma)
=\int_0^1\frac{p_1-p_0}{\sqrt{\gamma(t)(1-\gamma(t))}}\,dt
=\int_{p_0}^{p_1}\frac{dr}{\sqrt{r(1-r)}}.
$$

正の速度を仮定したので絶対値が外れます。値は次の定理で積分します。
<!-- definition-example-end -->

<a id="thm-ig2-bernoulli-distance"></a>
<!-- formal-statement-start -->
> **定理（Bernoulli 族の Fisher--Rao 距離）**
> Bernoulli 族 $\{P_p:0<p<1\}$ に Fisher--Rao 計量 $g_{pp}=1/[p(1-p)]$ を入れる。この正則な1次元モデルの二点 $p,q\in(0,1)$ の距離は

$$
d_{\mathrm{FR}}(p,q)
=2\left|\arcsin\sqrt q-\arcsin\sqrt p\right|.
$$

> 同じ分布を対数オッズ座標で表してもこの距離は変わらない。
<!-- formal-statement-end -->

**証明の見取り図**：$r=2\arcsin\sqrt p$ と座標を替えると、計量が $dr^2$ になります。新しい座標では経路の長さは速度の絶対値の積分であり、その下限は二点の座標差です。

<!-- proof-start -->
### 証明

$r(p)=2\arcsin\sqrt p$ は $(0,1)$ から $(0,\pi)$ への滑らかな狭義増加の微分同相写像です。微分すると

$$
\frac{dr}{dp}
=2\frac1{\sqrt{1-p}}\frac1{2\sqrt p}
=\frac1{\sqrt{p(1-p)}}.
$$

従って任意の区分的 $C^1$ 曲線 $p(t)$ に対して

$$
\sqrt{G_p}\,|\dot p(t)|
=\left|\frac{dr}{dp}\dot p(t)\right|
=\left|\frac{d}{dt}r(p(t))\right|.
$$

この等式を区間で積分します。各時刻で $-|\dot r|\le\dot r\le|\dot r|$ が成立し、両辺を積分して絶対値を取ると

$$
L_{\mathrm{FR}}(p(\cdot))
=\int_a^b|\dot r(t)|\,dt
\ge\left|\int_a^b\dot r(t)\,dt\right|
=|r(q)-r(p)|.
$$

逆に $r(t)=(1-t)r(p)+tr(q)$、$0\le t\le1$ と取れば、$r(t)\in(0,\pi)$ で逆写像 $p(t)=\sin^2(r(t)/2)$ は正則な経路です。この経路で $L_{\mathrm{FR}}=|r(q)-r(p)|$ が成立するため、下限は達成され、距離公式を得ます。

対数オッズ $\eta$ に取り替えた場合も、[Fisher 行列の座標変換則](#thm-ig2-coordinate-invariance)により各経路の被積分関数は同一で、経路の対応は双方向に一対一です。従って下限も一致します。
<!-- proof-end -->

**境界までの長さは有限です。** たとえば $p\downarrow0$ のとき $r(p)\downarrow0$ なので、固定した $q>0$ から境界へ近づく長さは $2\arcsin\sqrt q<\infty$ です。ただし $p=0$ 自体はこの正則モデルに含まれません。正定値な計量を持つことは、距離空間として完備であることと同じではありません。

### 確率の平方根による幾何の見方

有限単体の点 $p$ を $\Phi(p)=(2\sqrt{p_1},\ldots,2\sqrt{p_m})$ に写すと

$$
\sum_x\Phi_x(p)^2=4\sum_xp_x=4
$$

なので、半径2の球面の正の部分に入ります。$p_x(t)>0$ の曲線を微分すると

$$
\frac{d}{dt}\Phi_x(p(t))
=\frac{\dot p_x(t)}{\sqrt{p_x(t)}},
\qquad
\left\|\frac{d}{dt}\Phi(p(t))\right\|^2
=\sum_x\frac{\dot p_x(t)^2}{p_x(t)}.
$$

右辺は Fisher--Rao 速度の二乗そのものです。従ってこの平方根の写像は曲線の長さを保ちます。確率の平方根が情報幾何で現れる理由が、計算から見えてきます。

### 退化したパラメータ表示では何が壊れるか

IG1で扱った

$$
P(t)=\left(\frac12-\frac{t^3}{4},\frac12+\frac{t^3}{4}\right),
\qquad -1<t<1
$$

は分布としては正ですが、$P'(0)=0$ です。Fisher 行列は

$$
G(t)
=\frac{(3t^2/4)^2}{(1/2-t^3/4)(1/2+t^3/4)}
=\frac{9t^4}{4-t^6}
$$

であり、$G(0)=0$ です。元の Bernoulli 確率 $p=1/2+t^3/4$ では内積は正ですが、$t\mapsto p$ は $0$ で Jacobian が0のため、局所微分同相ではありません。[Fisher 行列の座標変換則](#thm-ig2-coordinate-invariance)の可逆性を落とすと正定値性が保存されない実例です。

---

## 6. 演習：二乗平均から距離まで

### IG2-A01 有限単体の内積を直接調べる

$p=(1/4,1/4,1/2)$、$v=(1,-1,0)$、$w=(1,1,-2)$ とする。

1. $p$ が正の確率単体、$v,w$ がその接空間に属することを確認せよ。
2. $g_p^{\mathrm{FR}}(v,v)$、$g_p^{\mathrm{FR}}(w,w)$、$g_p^{\mathrm{FR}}(v,w)$ を求め、直交性を判定せよ。

- Level: A
- 狙い: 計量の定義域と二方向の内積を別々に確認する

<!-- solution-start -->
**詳細解答**

1. $p$ の成分は全て正で和は $1/4+1/4+1/2=1$ です。$v$ の和は $1-1+0=0$、$w$ の和は $1+1-2=0$ なので、[単体の接空間の定理](../IG1/index.md#thm-ig1-simplex-tangent)によって両方が $T_p\Delta_2^\circ$ に属します。
2. [Fisher--Rao 計量の定義](#def-ig2-fisher-rao-metric)に各成分を代入すると

   $$
   g_p^{\mathrm{FR}}(v,v)
   =\frac{1^2}{1/4}+\frac{(-1)^2}{1/4}+\frac{0^2}{1/2}
   =8,
   $$

   $$
   g_p^{\mathrm{FR}}(w,w)
   =\frac{1^2}{1/4}+\frac{1^2}{1/4}+\frac{(-2)^2}{1/2}
   =4+4+8=16,
   $$

   $$
   g_p^{\mathrm{FR}}(v,w)
   =\frac{1\cdot1}{1/4}+\frac{(-1)\cdot1}{1/4}
   +\frac{0\cdot(-2)}{1/2}=4-4=0.
   $$

   両方向は非零で長さが正ですが、内積は0なので直交します。
<!-- solution-end -->

### IG2-A02 Bernoulli 族を対数オッズで測る

$P_p(X=1)=p$、$0<p<1$ とする。$\eta=\log(p/(1-p))$ を新しいパラメータとする。

1. $S_p(0),S_p(1)$ から $G_p$ を求めよ。
2. $dp/d\eta$、$S_\eta(0),S_\eta(1)$ を計算し、$G_\eta$ が変換則に一致することを確認せよ。

- Level: A
- 狙い: 同じ分布のスコアと Jacobian を両経路から照合する

<!-- solution-start -->
**詳細解答**

1. 対数確率 $\ell(1;p)=\log p$、$\ell(0;p)=\log(1-p)$ を微分すると $S_p(1)=1/p$、$S_p(0)=-1/(1-p)$ です。従って

   $$
   G_p=p(1/p)^2+(1-p)(-1/(1-p))^2
   =\frac1{p(1-p)}.
   $$

2. $p=e^\eta/(1+e^\eta)$ なので $dp/d\eta=e^\eta/(1+e^\eta)^2=p(1-p)>0$ です。連鎖律により

   $$
   S_\eta(1)=\frac{dp}{d\eta}\frac1p=1-p,
   \qquad
   S_\eta(0)=\frac{dp}{d\eta}\frac{-1}{1-p}=-p.
   $$

   よって二乗平均を直接取ると

   $$
   G_\eta=p(1-p)^2+(1-p)p^2
   =p(1-p)((1-p)+p)=p(1-p).
   $$

   他方、[Fisher 行列の座標変換則](#thm-ig2-coordinate-invariance)へ $J=p(1-p)$ を代入すると $J^2G_p=p(1-p)$ であり、両者は一致します。
<!-- solution-end -->

### IG2-A03 3値カテゴリカルモデルの正定値性

$P(a,b)=(a,b,1-a-b)$、$a>0,b>0,a+b<1$ とする。

1. 二つの座標スコアを各結果で求め、Fisher 行列の一般形を導け。
2. $(a,b)=(1/2,1/4)$ における行列と行列式を計算し、正定値性を確認せよ。

- Level: A
- 狙い: 接速度の二列から計量行列を作る

<!-- solution-start -->
**詳細解答**

1. $c=1-a-b$ と置きます。$\partial_aP=(1,0,-1)$、$\partial_bP=(0,1,-1)$ であるから、各確率で割ったスコアは

   $$
   S_a=(1/a,0,-1/c),\qquad
   S_b=(0,1/b,-1/c).
   $$

   各結果で確率 $(a,b,c)$ を掛けて積の期待値を取ると

   $$
   E[S_a^2]=1/a+1/c,\quad
   E[S_aS_b]=1/c,\quad
   E[S_b^2]=1/b+1/c.
   $$

   よって $G=\begin{pmatrix}1/a+1/c&1/c\\1/c&1/b+1/c\end{pmatrix}$ です。
2. 指定点では $c=1/4$、従って

   $$
   G=\begin{pmatrix}6&4\\4&8\end{pmatrix},
   \qquad \det G=6\cdot8-4^2=32>0.
   $$

   正定値性は任意の非零方向 $(u,v)$ の二次形式で直接確かめられます。

   $$
   \begin{aligned}
   (u,v)G(u,v)^{\mathsf T}
   &=6u^2+8uv+8v^2\\
   &=6\left(u+\frac23v\right)^2+\frac{16}{3}v^2>0
   \end{aligned}
   $$

   です。また二方向 $(1,0,-1)$ と $(0,1,-1)$ は一次独立であり、[正定値性の定理](#thm-ig2-positive-definiteness)とも一致します。行列式 $32>0$ はこの判定と整合する追加の検算です。
<!-- solution-end -->

### IG2-A04 分散を固定した正規位置族

$X\sim N(\mu,4)$、$\mu\in\mathbb R$ とし、Lebesgue 密度を用いる。スコア $S_\mu$、その期待値、Fisher 情報量を求め、正定値性を判定せよ。

- Level: A
- 狙い: 正規モデルの平均方向を一変数で検算する

<!-- solution-start -->
**詳細解答**

対数密度は $\ell(\mu;x)=-\frac12\log(8\pi)-(x-\mu)^2/8$ です。従って

$$
S_\mu=\partial_\mu\ell=\frac{x-\mu}{4}.
$$

$E[X-\mu]=0$、$E[(X-\mu)^2]=4$ を使えば

$$
E[S_\mu]=\frac{E[X-\mu]}4=0,\qquad
G_{\mu\mu}=E[S_\mu^2]=\frac{E[(X-\mu)^2]}{16}=\frac14.
$$

Fisher 行列は1次元で $1/4>0$ なので正定値です。密度は全実数上で正、パラメータ近傍の微分は Gaussian 型の可積分関数で支配され、スコア二乗平均も有限なので [IG1の正則性](../IG1/index.md#def-ig1-geometric-regularity)を満たします。
<!-- solution-end -->

### IG2-B01 2パラメータ正規族と対数標準偏差

$X\sim N(\mu,\sigma^2)$、$\mu\in\mathbb R,\sigma>0$ とする。

1. $S_\mu,S_\sigma$ を直接微分から求め、$Z=(X-\mu)/\sigma$ の四次までのモーメントを用いて $G(\mu,\sigma)$ を計算せよ。
2. $\tau=\log\sigma$ に移ったとき $G(\mu,\tau)$ を導き、正定値性を確認せよ。

- Level: B
- 狙い: 連続モデルの期待値計算と2次元 Jacobian を接続する

<!-- solution-start -->
**詳細解答**

1. $\ell=-\frac12\log(2\pi)-\log\sigma-(x-\mu)^2/(2\sigma^2)$ から

   $$
   S_\mu=(x-\mu)/\sigma^2=Z/\sigma,\qquad
   S_\sigma=-1/\sigma+(x-\mu)^2/\sigma^3=(Z^2-1)/\sigma.
   $$

   $Z$ は標準正規で、密度の対称性と $\varphi'=-z\varphi$ の部分積分から $E[Z]=E[Z^3]=0$、$E[Z^2]=1$、$E[Z^4]=3$ です。それぞれの積の期待値を計算すると

   $$
   g_{\mu\mu}=E[Z^2]/\sigma^2=1/\sigma^2,\quad
   g_{\mu\sigma}=E[Z^3-Z]/\sigma^2=0,
   $$

   $$
   g_{\sigma\sigma}=E[Z^4-2Z^2+1]/\sigma^2
   =(3-2+1)/\sigma^2=2/\sigma^2.
   $$

2. 旧座標 $(\mu,\sigma)$ を新座標 $(\mu,\tau)$ で微分すると $J=\operatorname{diag}(1,\sigma)$ です。[座標変換則](#thm-ig2-coordinate-invariance)の行列積を順に計算し

   $$
   J^{\mathsf T}GJ
   =\begin{pmatrix}1&0\\0&\sigma\end{pmatrix}
   \begin{pmatrix}\sigma^{-2}&0\\0&2\sigma^{-2}\end{pmatrix}
   \begin{pmatrix}1&0\\0&\sigma\end{pmatrix}
   =\begin{pmatrix}e^{-2\tau}&0\\0&2\end{pmatrix}.
   $$

   $\sigma=e^\tau>0$ なので両対角成分は正です。方向 $(u,v)\ne(0,0)$ の二乗長 $e^{-2\tau}u^2+2v^2$ が正になることから正定値です。
<!-- solution-end -->

### IG2-B02 単射でも計量が退化するモデル

$-1<t<1$ に対し $P(t)=(1/2-t^3/4,1/2+t^3/4)$ を考える。

1. 正の確率分布を与えること、パラメータ表示が単射であることを確認せよ。
2. Fisher 情報量を求め、$t=0$ で退化する理由を接速度から説明せよ。
3. Bernoulli 確率 $p=1/2+t^3/4$ との関係が、滑らかな局所微分同相による座標の取り替えとは異なる理由を述べよ。

- Level: B
- 狙い: 識別可能性・浸入性・Jacobian 可逆性の違いを反例で検証する

<!-- solution-start -->
**詳細解答**

1. $|t|<1$ なら $|t^3/4|<1/4$ なので両成分は $1/4$ より大きく、和は1です。$t\mapsto t^3$ は狭義増加であり、第二成分の値から $t$ が一意に決まるので $P$ は単射です。
2. 微分すれば $P'(t)=(-3t^2/4,3t^2/4)$。[Fisher 情報行列](#def-ig2-fisher-information)を有限モデルの成分式で求めると

   $$
   \begin{aligned}
   G(t)
   &=\frac{9t^4/16}{1/2-t^3/4}
   +\frac{9t^4/16}{1/2+t^3/4}\\
   &=\frac{9t^4}{16}
   \frac{1}{(1/2-t^3/4)(1/2+t^3/4)}\\
   &=\frac{9t^4}{4-t^6}.
   \end{aligned}
   $$

   $t=0$ では $P'(0)=(0,0)$、従って全ての結果で方向スコアが0です。[Fisher 行列の半正定値性と非退化条件](#thm-ig2-positive-definiteness)により $G(0)=0$ となります。
3. $dp/dt=3t^2/4$ が $t=0$ で0になります。もし $t$ が $p$ の滑らかな局所座標なら逆写像の導関数と掛けて1にならねばなりませんが、零の導関数では不可能です。従って[Fisher 行列の座標変換則](#thm-ig2-coordinate-invariance)で要求した局所微分同相の仮定を満たしません。単射性だけでは Riemann 計量を引き戻した正定値性は保証されません。
<!-- solution-end -->

### IG2-B03 対称なカテゴリカル部分モデルの長さ

$P(t)=(t,(1-t)/2,(1-t)/2)$、$0<t<1$ を3値分布の曲線とする。

1. この表示が正の確率単体へのはめ込みであることを確認し、引き戻し Fisher 情報量 $G(t)$ を求めよ。
2. $t=1/4$ と $t=3/4$ を結ぶ、この1次元モデル内の Fisher--Rao 距離を計算せよ。

- Level: B
- 狙い: 高次元単体の引き戻しと1次元の距離を結ぶ

<!-- solution-start -->
**詳細解答**

1. $0<t<1$ なら三成分は正、和は $t+(1-t)/2+(1-t)/2=1$ です。接速度は

   $$
   P'(t)=(1,-1/2,-1/2)
   $$

   であり常に非零なので、[IG1の浸入性判定](../IG1/index.md#prop-ig1-immersion-criterion)によりはめ込みです。[引き戻し定理](#thm-ig2-simplex-pullback)の成分式を使うと

   $$
   \begin{aligned}
   G(t)&=\frac{1^2}{t}
   +\frac{(1/2)^2}{(1-t)/2}
   +\frac{(1/2)^2}{(1-t)/2}\\
   &=\frac1t+\frac1{1-t}
   =\frac1{t(1-t)}.
   \end{aligned}
   $$

2. この1次元モデルは $t$ を一意に分布へ写すので、その距離は $G(t)$ による経路の長さの下限です。[Bernoulli 距離の定理](#thm-ig2-bernoulli-distance)の計算と同じ置換 $r(t)=2\arcsin\sqrt t$ を適用できます。$r(1/4)=2(\pi/6)=\pi/3$、$r(3/4)=2(\pi/3)=2\pi/3$ なので

   $$
   d_{\mathrm{FR}}(1/4,3/4)
   =|2\pi/3-\pi/3|=\frac{\pi}{3}.
   $$

   これは指定された部分モデルの内部距離です。一般に部分モデル上の距離と、全単体内の任意の経路を許す距離は、定義上区別する必要があります。
<!-- solution-end -->

### IG2-C01 正の有限単体の距離を平方根で求める

$m\ge2$、$p,q\in\Delta_{m-1}^{\circ}$ とする。$\Phi(p)=2(\sqrt{p_1},\ldots,\sqrt{p_m})$ を用い、単体上の全ての区分的 $C^1$ 曲線に関する Fisher--Rao 距離を考える。

1. $\Phi$ が正の単体を半径2の球面の正の部分へ滑らかに一対一に写し、各曲線の Fisher--Rao 長とその像の球面上の長さが一致することを示せ。
2. $\alpha=\arccos(\sum_i\sqrt{p_iq_i})$ と置く。$\alpha\in[0,\pi/2)$ を確かめ、$p\ne q$ のとき球面の正の部分の経路で長さ $2\alpha$ のものを構成せよ。
3. 任意の単体内の経路の長さは $2\alpha$ 以上と示し、距離公式を結論せよ。

- Level: C
- 狙い: Fisher 計量・幾何的埋め込み・最短経路を一つの証明に統合する

<!-- solution-start -->
**詳細解答**

1. 全ての $p_i>0$ なので平方根は滑らかで、$\sum_i\Phi_i(p)^2=4\sum_i p_i=4$ です。像の座標は全て正です。逆写像は $p_i=y_i^2/4$ であり、正の球面部分で各 $p_i>0$、$\sum_i p_i=1$ となるので一対一です。曲線 $p(t)$ を微分すると

   $$
   \dot y_i(t)=\frac{\dot p_i(t)}{\sqrt{p_i(t)}},
   \qquad
   \|\dot y(t)\|^2
   =\sum_i\frac{\dot p_i(t)^2}{p_i(t)}
   =g_{p(t)}^{\mathrm{FR}}(\dot p(t),\dot p(t)).
   $$

   両辺の平方根を同じ時刻区間で積分すれば、二つの長さは一致します。

2. 二つの平方根ベクトルを

   $$
   u=(\sqrt{p_i})_i,\qquad v=(\sqrt{q_i})_i
   $$

   と置きます。確率の総和が1なので $\|u\|=\|v\|=1$ であり、全成分が正なので内積

   $$
   c=u\cdot v=\sum_i\sqrt{p_iq_i}>0
   $$

   も正です。[Cauchy--Schwarz 不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により $c\le1$、等号は正の単位ベクトル $u=v$、つまり $p=q$ の場合だけです。従って $p\ne q$ なら $0<\alpha<\pi/2$ です。このとき

   $$
   s(t)=
   \frac{\sin((1-t)\alpha)}{\sin\alpha}u
   +\frac{\sin(t\alpha)}{\sin\alpha}v,
   \qquad 0\le t\le1
   $$

   と置きます。係数は非負、端点以外では正なので各成分は正です。また $s(0)=u$、$s(1)=v$ です。ここで $\cos\alpha=c$、$\sin\alpha>0$ を使い、

   $$
   e=\frac{v-\cos\alpha\,u}{\sin\alpha}
   $$

   と置くと

   $$
   u\cdot e=\frac{c-\cos\alpha}{\sin\alpha}=0,
   \qquad
   \|e\|^2=\frac{1-2c^2+c^2}{1-c^2}=1.
   $$

   $\sin((1-t)\alpha)=\sin\alpha\cos(t\alpha)-\cos\alpha\sin(t\alpha)$ を代入すると

   $$
   s(t)=\cos(t\alpha)u+\sin(t\alpha)e.
   $$

   よって $\|s(t)\|=1$、$\|s'(t)\|=\alpha$ です。$y(t)=2s(t)$ は半径2の球面の正の部分を通り、長さは $\int_0^1 2\alpha\,dt=2\alpha$ です。逆写像 $p_i(t)=s_i(t)^2$ によって、これは単体内の経路になります。

3. 任意の単位球面上の区分的 $C^1$ 経路 $z(t)$ が $u$ から $v$ へ向かうとします。$\|z\|=1$ を微分すると $z\cdot z'=0$ です。始点からの角度 $\beta(t)=\arccos(u\cdot z(t))$ を、$0<\beta(t)<\pi$ の時刻で微分すると

   $$
   |\beta'(t)|
   =\frac{|u\cdot z'(t)|}{\sqrt{1-(u\cdot z(t))^2}}.
   $$

   $z'\perp z$ を使って $u\cdot z'=(u-(u\cdot z)z)\cdot z'$ と書けば、[Cauchy--Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)によって

   $$
   |u\cdot z'|
   \le\|u-(u\cdot z)z\|\,\|z'\|
   =\sqrt{1-(u\cdot z)^2}\,\|z'\|.
   $$

   従って $0<\beta<\pi$ では $|\beta'|\le\|z'\|$ です。ただし始点では $\beta(0)=0$ なので、この微分式をそのまま使えません。そこで $0<\varepsilon<1$ に対して

   $$
   \beta_\varepsilon(t)
   =\arccos\bigl((1-\varepsilon)u\cdot z(t)\bigr)
   $$

   と置きます。$c(t)=u\cdot z(t)$ とすれば、分母が零にならず、先ほどの直交性と Cauchy--Schwarz の評価により

   $$
   \begin{aligned}
   |\beta_\varepsilon'(t)|
   &\le\frac{(1-\varepsilon)\sqrt{1-c(t)^2}}{
     \sqrt{1-(1-\varepsilon)^2c(t)^2}}\,\|z'(t)\|\\
   &\le\|z'(t)\|.
   \end{aligned}
   $$

   最後の不等式は $(1-\varepsilon)^2\le1$ から従います。区分的 $C^1$ の各区間で積分してから $\varepsilon\downarrow0$ とすると、両端の値は $\beta_\varepsilon(0)\to0$、$\beta_\varepsilon(1)\to\alpha$ なので

   $$
   \alpha=|\beta(1)-\beta(0)|
   \le\int_0^1\|z'(t)\|\,dt
   $$

   を得ます。半径2の球面では長さはその2倍なので全ての経路の長さは $2\alpha$ 以上です。2で正の部分に留まる長さ $2\alpha$ の経路を構成したので、

   $$
   \boxed{
   d_{\mathrm{FR}}(p,q)
   =2\arccos\left(\sum_{i=1}^m\sqrt{p_iq_i}\right)
   }.
   $$

   $p=q$ なら定数経路の長さは0で、公式も $\arccos1=0$ なので成立します。正の単体という定義域が、構成した球面の最短弧を内部に保つことも確認できました。
<!-- solution-end -->

---

## 次の講義へ

Fisher--Rao 計量はスコアの二乗平均から作られ、滑らかな局所微分同相によるパラメータ変更では二乗長を保ちます。また、正定値性のためには単にモデルが識別可能であるだけでなく、一次の接方向が潰れないことが必要でした。

次の IG3 では、今度は二分布の間の KL divergence を展開し、その二次項から同じ Fisher 計量が現れることを確かめます。
