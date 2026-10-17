# KAH1-10 曲率の具体計算

<!-- definition-example-audit: strict -->

## 1. 曲率の四階成分を数値に変える

[前章の曲率局所成分公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)は、計量の二階微分と一階微分の積から $R_{i\bar j k\bar\ell}$ を求める。しかし四つの添字を持つ値を全部並べるだけでは、平坦なトーラスと射影空間をどう比較できるか、まだ見通しが悪い。曲率を一つの方向で測る量と、一組の添字を足し合わせた量を用意してから、三つの模型を実際に計算する。

以下、$X$ は複素次元 $n\ge1$ の滑らかなKähler多様体、$g$ はその計量である。正則座標 $z^1,\ldots,z^n$ に対し、$g_{i\bar j}=g(\partial_i,\partial_{\bar j})$、逆行列成分は $g^{k\bar\ell}g_{m\bar\ell}=\delta^k_m$ とする。[曲率成分の定義](../KAH1-09/index.md#def-kah1-09-curvature-components)およびその符号は

$$
R(U,V)W=\nabla_U\nabla_VW-\nabla_V\nabla_UW-\nabla_{[U,V]}W,
\qquad
R_{i\bar j k\bar\ell}=g(R(\partial_i,\partial_{\bar j})\partial_k,\partial_{\bar\ell})
$$

で固定する。反復添字は総和する。この符号では、Fubini–Study計量の以下で求める曲率は**正**になる。

## 2. 二種類の曲率の測り方

まず、一点で任意の非零正則接ベクトル $v=v^i\partial_i$ を選び、その方向に四階曲率を四回代入する。結果は実数であり、ベクトルの長さに依存しないように計量の長さの四乗で割る。この比を、次の定義で方向の曲率を測る量として使う。一方、曲率の入力方向のうち一組を計量の逆行列で足し合わせれば、二階のRicci成分を得る。どちらも[前章の複素添字対称性](../KAH1-09/index.md#thm-kah1-09-kahler-symmetries)のあるKähler曲率から作る。

<a id="def-kah1-10-holomorphic-sectional"></a>

<!-- formal-statement-start -->
> **定義（正則断面曲率）**  
> 滑らかなKähler多様体 $(X,g)$ の点 $p$ と、零でない $v\in T_p^{1,0}X$ に対して、正則断面曲率を次で定める。

$$
H_p(v)=
\frac{R_{i\bar j k\bar\ell}(p)v^i\bar v^jv^k\bar v^\ell}
{\bigl(g_{i\bar j}(p)v^i\bar v^j\bigr)^2}.
$$

> 分母は正の実数であり、$H_p(cv)=H_p(v)$ が任意の $c\in\mathbb C\setminus\{0\}$ に対して成立する。
<!-- formal-statement-end -->

複素共役と添字の交換によって分子は実数になる。実際、$Q=R_{i\bar j k\bar\ell}v^i\bar v^jv^k\bar v^\ell$ を共役にすると、前章の対称性によって添字を付け替えて $\overline Q=Q$ を得る。$v$ を $cv$ に置き換えると分子も分母も $|c|^4$ 倍される。

<!-- definition-example-start: def-kah1-10-holomorphic-sectional -->
**定義の確認**。 $n=1$、$g_{z\bar z}=2$ の平坦な計量を取る。係数が一定だから[曲率成分公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)の二つの項は零であり、$R_{z\bar z z\bar z}=0$。$v=a\partial_z$ ($a\ne0$) に対して分子は $0\cdot|a|^4=0$、分母は $(2|a|^2)^2=4|a|^4>0$ だから $H(v)=0$。計量が非単位でも、定義の分母と分子を確かめれば零曲率である。
<!-- definition-example-end -->

Ricci成分の名前にある[縮約](../../VC/VC7/index.md#def-vc7-contraction)とは、一組の添字を和にまとめる操作である。ここでは同じ点の逆計量を使い、どの基底で計算しても同じ二階成分になるようにする。正規直交な正則座標基底では、単に $R_{i\bar j k\bar k}$ を $k$ について足したものになる。

<a id="def-kah1-10-ricci-contraction"></a>

<!-- formal-statement-start -->
> **定義（Kähler曲率のRicci縮約）**  
> 複素次元 $n\ge1$ の滑らかなKähler多様体 $(X,g)$ の四階曲率成分から、Ricci成分と対応する実 $(1,1)$ 形式を次で定める。

$$
\operatorname{Ric}_{i\bar j}
=g^{k\bar\ell}R_{i\bar j k\bar\ell},
\qquad
\rho=i\,\operatorname{Ric}_{i\bar j}\,dz^i\wedge d\bar z^j.
$$

> この定義では $R_{i\bar j k\bar\ell}$ の第3・第4添字を縮約する。$\rho$ の大域性および行列式との関係は次章で詳しく証明する。
<!-- formal-statement-end -->

基底の変換で逆計量を挿入する理由を確かめよう。ある点で正規直交基底に取り直したときは $g^{k\bar\ell}=\delta_{k\ell}$ なので縮約は対角成分の和である。一般の基底では、基底の伸縮による見かけの変化を逆計量が打ち消す。各項を変換則に代入しても同じ二階テンソルになる。

<!-- definition-example-start: def-kah1-10-ricci-contraction -->
**定義の確認**。 $g_{i\bar j}=\operatorname{diag}(2,3)$ とする $\mathbb C^2$ では、逆計量は $\operatorname{diag}(1/2,1/3)$。全ての一次・二次微分が零だから四階成分も零であり、

$$
\operatorname{Ric}_{i\bar j}
=\tfrac12R_{i\bar j1\bar1}+\tfrac13R_{i\bar j2\bar2}=0,\qquad \rho=0.
$$

逆計量を使うこと、全ての成分の消失、実形式の結論を順に確認した。
<!-- definition-example-end -->

## 3. 平坦複素トーラスには曲率が残らない

[格子商への計量の降下](../KAH1-05/index.md#prop-kah1-05-torus)によれば、$\mathbb C^n$ の一定の正値Hermite行列 $G=(G_{i\bar j})$ は、複素階数 $n$ の格子 $\Lambda\subset\mathbb C^n$ による商 $T=\mathbb C^n/\Lambda$ へ降りる。なぜなら平行移動 $z\mapsto z+\lambda$ の微分は恒等写像で、係数 $G$ を保存するからである。基本形式は一定係数なので閉じており、$T$ 上でKähler計量となる。

<a id="prop-kah1-10-flat-torus"></a>

<!-- formal-statement-start -->
> **命題（平坦トーラスの全曲率の消失）**  
> $\Lambda\subset\mathbb C^n$ を格子、$G$ を一定の正値Hermite行列とする。$T=\mathbb C^n/\Lambda$ 上の誘導Kähler計量は、四階曲率、Ricci成分および全ての正則断面曲率が零である。
<!-- formal-statement-end -->

### 証明の見取り図

商の各小座標近傍では、もとの一定係数がそのまま使える。[曲率局所公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)に一階・二階微分が零という事実を代入し、それぞれの定義で縮約する。

<!-- proof-start -->
### 証明

$\partial_i G_{k\bar\ell}=0$ かつ $\partial_i\partial_{\bar j}G_{k\bar\ell}=0$ である。よって全ての $i,j,k,\ell$ に対して

$$
R_{i\bar j k\bar\ell}
=-0+G^{m\bar q}\,0\cdot0=0.
$$

逆計量との縮約でも $\operatorname{Ric}_{i\bar j}=G^{k\bar\ell}\cdot0=0$。非零接ベクトル $v$ の長さの二乗は正であるから、定義の分母は零にならず $H(v)=0$。これらは局所計算だが、格子商の各点に同じ局所表示があるので $T$ 全体で成り立つ。$\square$
<!-- proof-end -->

重要なのは、**トーラスだから曲率零**ではなく、一定係数の計量を降ろしたから零ということである。同じトーラス上に与える別のKähler計量まで平坦になるわけではない。さらに、コンパクトなトーラスでもKähler形式は存在するが、大域的な単一ポテンシャルがあるとは限らない（[大域ポテンシャルの障害](../KAH1-07/index.md#prop-kah1-07-no-global-potential)）。

## 4. 複素次元1：共形係数の一つの微分へ

次は $U\subset\mathbb C$ を開集合とし、実数値の滑らかな関数 $f:U\to\mathbb R$ によって

$$
g_{z\bar z}=e^{f(z,\bar z)}>0,\qquad
\omega=i e^f\,dz\wedge d\bar z
$$

とする。実次元2では、この実2形式の外微分は次数3の形式で必ず零である。従って複素次元1では、この正値Hermite計量は自動的にKählerとなる。

<a id="prop-kah1-10-conformal-curvature"></a>

<!-- formal-statement-start -->
> **命題（複素一次元の共形曲率公式）**  
> $U\subset\mathbb C$ を開集合、$f\in C^\infty(U;\mathbb R)$ とし、$g_{z\bar z}=e^f$ をKähler計量とする。このとき

$$
\begin{aligned}
\Gamma^z_{zz}&=\partial_z f,\\
R_{z\bar z z\bar z}&=-e^f\partial_z\partial_{\bar z}f,\\
\operatorname{Ric}_{z\bar z}&=-\partial_z\partial_{\bar z}f,\\
H(\partial_z)&=-e^{-f}\partial_z\partial_{\bar z}f.
\end{aligned}
$$

> $g_{\mathbb R}=2e^f(dx^2+dy^2)$ とする実計量のGauss曲率 $K$ について、この規約では $K=H(\partial_z)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[前章で用いた接続係数式](../KAH1-09/index.md#def-kah1-09-curvature-components)を直接使うか、[曲率の局所公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)へ $g=e^f$ を代入する。$f$ の一階微分の積が打ち消し合い、二階混合微分だけが残る。Gauss曲率との比較では、実計量の係数が $e^f$ ではなく $2e^f$ である点が重要である。

<!-- proof-start -->
### 証明

一次元では逆計量 $g^{z\bar z}=e^{-f}$。$\partial_z g=e^f f_z$ から

$$
\Gamma^z_{zz}=g^{z\bar z}\partial_zg=e^{-f}e^ff_z=f_z.
$$

二階微分について積の微分則をもう一度適用すると

$$
\partial_z\partial_{\bar z}g
=\partial_{\bar z}(e^ff_z)
=e^ff_{\bar z}f_z+e^ff_{z\bar z}.
$$

一階微分の二次項は

$$
g^{-1}(\partial_zg)(\partial_{\bar z}g)
=e^{-f}(e^ff_z)(e^ff_{\bar z})
=e^ff_zf_{\bar z}.
$$

二つの式を[四階曲率公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)へ代入して $R=-e^ff_{z\bar z}$。その後、Ricci縮約は一次元なので $g^{-1}R=-f_{z\bar z}$、正則断面曲率も一次元なので $H=R/g^2=-e^{-f}f_{z\bar z}$ となる。

最後に $z=x+iy$ とし、$g_{\mathbb R}=e^{2u}(dx^2+dy^2)$ の形へ直す。$e^{2u}=2e^f$ なので $u=(\log 2+f)/2$ である。実座標でLevi–Civita接続を計算すると、$g_{ab}=e^{2u}\delta_{ab}$、$g^{ab}=e^{-2u}\delta^{ab}$ をChristoffelの公式に入れて

$$
\Gamma^a_{bc}=\delta^a_bu_c+\delta^a_cu_b-\delta_{bc}u_a
$$

となる。とくに $\Gamma^x_{yy}=-u_x$、$\Gamma^x_{xy}=u_y$、$\Gamma^x_{xx}=u_x$、$\Gamma^y_{yy}=u_y$、$\Gamma^y_{xy}=u_x$ であり、

$$
\begin{aligned}
(R(\partial_x,\partial_y)\partial_y)^x
&=\partial_x\Gamma^x_{yy}-\partial_y\Gamma^x_{xy}
 +\Gamma^x_{xa}\Gamma^a_{yy}-\Gamma^x_{ya}\Gamma^a_{xy}\\
&=-u_{xx}-u_{yy}
 +(-u_x^2+u_y^2)-(u_y^2-u_x^2)\\
&=-(u_{xx}+u_{yy}).
\end{aligned}
$$

従って $K=g_{\mathbb R}(R(\partial_x,\partial_y)\partial_y,\partial_x)/e^{4u}=-e^{-2u}(u_{xx}+u_{yy})$ であり、

$$
K=-\frac1{2e^f}\frac12(f_{xx}+f_{yy})
=-e^{-f}\partial_z\partial_{\bar z}f,
$$

となる。最後の等号には $\partial_z\partial_{\bar z}=\tfrac14(\partial_x^2+\partial_y^2)$ を用いた。$\square$
<!-- proof-end -->

**符号が入れ替わる具体例。** $f=\alpha|z|^2$ ($\alpha\in\mathbb R$) とする。$z\bar z$ の混合微分は $1$ だから

$$
H(z)=K(z)=-\alpha e^{-\alpha|z|^2},\qquad
R_{z\bar z z\bar z}(z)=-\alpha e^{\alpha|z|^2}.
$$

$\alpha>0$ なら負曲率、$\alpha<0$ なら正曲率、$\alpha=0$ なら零曲率となる。原点で $g=1$、$\partial g=0$ だが $\alpha\ne0$ のとき $R(0)=-\alpha$ が残る。[Kähler正規座標での曲率公式](../KAH1-09/index.md#prop-kah1-09-normal-curvature)の意味が具体的に見える。

## 5. Fubini–Study曲率を原点から全点へ運ぶ

射影空間 $\mathbb{CP}^n$ ($n\ge1$) の標準チャート $[1:z^1:\cdots:z^n]$ を用いる。[Fubini–Study計量の局所定義](../KAH1-06/index.md#def-kah1-06-local-fs)では

$$
A=1+\sum_{q=1}^n|z^q|^2,\qquad
\varphi=\log A,\qquad
g_{k\bar\ell}=\partial_k\partial_{\bar\ell}\varphi
=\frac{\delta_{k\ell}}A-\frac{\bar z^k z^\ell}{A^2}.
$$

最後の式は $\partial_k A=\bar z^k$ を使い、$\partial_{\bar\ell}(\bar z^k/A)=\delta_{k\ell}/A-\bar z^kz^\ell/A^2$ から得る。[正値性の定理](../KAH1-06/index.md#thm-kah1-06-fs-positive)と[大域貼り合わせ](../KAH1-07/index.md#thm-kah1-07-global-fs)により、これは大域的なKähler計量である。

**まず原点 $z=0$ に限る。** そこでは $A=1$、$g_{k\bar\ell}(0)=\delta_{k\ell}$ であり、$\partial_i g_{k\bar\ell}(0)=0$。従ってこのチャートは原点で[Kähler正規座標](../KAH1-08/index.md#def-kah1-08-normal-coordinates)になっている。二階微分を確かめるため $A^{-1}$ と $A^{-2}$ を別々に微分する。

$$
\begin{aligned}
\partial_i\partial_{\bar j}A^{-1}\big|_0&=-\delta_{ij},\\
\partial_i\partial_{\bar j}(\bar z^kz^\ell A^{-2})\big|_0
&=\delta_{jk}\delta_{i\ell}.
\end{aligned}
$$

二番目では、$z=0$ で消えないのは $\partial_{\bar j}\bar z^k$ と $\partial_i z^\ell$ の積だけである。従って

$$
\partial_i\partial_{\bar j}g_{k\bar\ell}(0)
=-\delta_{ij}\delta_{k\ell}-\delta_{i\ell}\delta_{kj}.
$$

<a id="thm-kah1-10-fs-curvature"></a>

<!-- formal-statement-start -->
> **定理（Fubini–Study曲率とRicci縮約）**  
> $\mathbb{CP}^n$ ($n\ge1$) に $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+\sum|z^q|^2)$ の規格化で与えたFubini–Study計量 $g$ を取る。第1節の曲率符号を用いると、全ての正則チャートで次が成り立つ。

$$
\boxed{
R_{i\bar j k\bar\ell}
=g_{i\bar j}g_{k\bar\ell}+g_{i\bar\ell}g_{k\bar j},
\qquad
\operatorname{Ric}_{i\bar j}=(n+1)g_{i\bar j}.
}
$$

> 従って全ての点 $p$ と $0\ne v\in T_p^{1,0}\mathbb{CP}^n$ に対して

$$
\boxed{H_p(v)=2,\qquad \rho=(n+1)\omega_{\mathrm{FS}}.}
$$

> ここで「$2$」は本章の $g_{i\bar j}$ と $\omega_{\mathrm{FS}}$ の規格化に対応する。他の正規化の「$4$」等と無条件に同一視しない。
<!-- formal-statement-end -->

### 証明の見取り図

原点では計量の一階微分が零なので、前章の[Kähler正規座標での曲率公式](../KAH1-09/index.md#prop-kah1-09-normal-curvature)を上の二階微分へ適用する。次に射影空間の任意の点を原点へ送るユニタリ変換がFubini–Study形式を保存することを確認し、テンソル等式を全点へ移す。最後に逆計量で縮約する。

<!-- proof-start -->
### 証明

原点での二階微分の計算と一階微分の消失から

$$
\begin{aligned}
R_{i\bar j k\bar\ell}(0)
&=-\partial_i\partial_{\bar j}g_{k\bar\ell}(0)\\
&=\delta_{ij}\delta_{k\ell}+\delta_{i\ell}\delta_{kj}\\
&=g_{i\bar j}(0)g_{k\bar\ell}(0)
  +g_{i\bar\ell}(0)g_{k\bar j}(0).
\end{aligned}
$$

ここから全点での等式に進む根拠を示す。非零同次座標 $Z\in\mathbb C^{n+1}$ に対し、$[Z]$ の近傍で $Z_a\ne0$ とすると

$$
\varphi_a([Z])=\log\|Z\|^2-\log|Z_a|^2.
$$

ユニタリ行列 $U\in U(n+1)$ は $\|UZ\|=\|Z\|$ を満たす。$[Z]$ と $[UZ]$ の双方で零にならない成分を選び、その局所表示のポテンシャルを比べると、

$$
\varphi_b([UZ])-\varphi_a([Z])
=\log|Z_a|^2-\log|(UZ)_b|^2.
$$

右辺は、両成分が零でない場所で零を持たない正則関数の絶対値の対数の差である。[多重調和差の消失](../KAH1-07/index.md#thm-kah1-07-global-fs)により $i\partial\bar\partial$ を作用させれば零になる。従って射影ユニタリ変換 $[Z]\mapsto[UZ]$ は $\omega_{\mathrm{FS}}$、ひいては $g$ を保存する。

任意の点 $p=[Z]$ について長さ1に正規化した $Z$ を標準基底ベクトル $e_0$ に写すユニタリ行列を、正規直交基底の延長によって構成できる。したがって、この等長かつ正則な変換が $p$ を $[1:0:\cdots:0]$ に写す。曲率と計量は等長写像で保存されるテンソルなので、原点で成り立つ等式が全点に移る。

縮約は各点の任意の座標で

$$
\begin{aligned}
\operatorname{Ric}_{i\bar j}
&=g^{k\bar\ell}
 (g_{i\bar j}g_{k\bar\ell}+g_{i\bar\ell}g_{k\bar j})\\
&=g_{i\bar j}\underbrace{g^{k\bar\ell}g_{k\bar\ell}}_{n}
 +\underbrace{g^{k\bar\ell}g_{k\bar j}g_{i\bar\ell}}_{g_{i\bar j}}\\
&=(n+1)g_{i\bar j}.
\end{aligned}
$$

また、$s=g_{i\bar j}v^i\bar v^j>0$ と置けば、四階成分の二項はいずれも $s^2$ へ縮約される。従って $H(v)=(s^2+s^2)/s^2=2$。Ricci形式も $\rho=i(n+1)g_{i\bar j}dz^i\wedge d\bar z^j=(n+1)\omega_{\mathrm{FS}}$ である。$\square$
<!-- proof-end -->

**座標の数値検算。** $n=2$、$z=(1,0)$ なら $A=2$ で、

$$
(g_{i\bar j})=\begin{pmatrix}1/4&0\\0&1/2\end{pmatrix},
\qquad
(g^{i\bar j})=\begin{pmatrix}4&0\\0&2\end{pmatrix}.
$$

定理から $R_{1\bar1 1\bar1}=2(1/4)^2=1/8$、$R_{1\bar1 2\bar2}=(1/4)(1/2)=1/8$。したがって

$$
\operatorname{Ric}_{1\bar1}
=4\cdot\tfrac18+2\cdot\tfrac18=\tfrac34
=3g_{1\bar1}.
$$

Kähler正規座標でない点における逆計量を省略すると誤った縮約になる。

## 6. 規格化を変えると何が変わるか

上の計算はFubini–Study計量を定数倍した際の取り違えも防いでくれる。$c>0$ を固定し $g'=cg$ とする。接続の局所係数は

$$
\Gamma'^m_{ik}
=(g')^{m\bar q}\partial_i g'_{k\bar q}
=c^{-1}g^{m\bar q}c\,\partial_i g_{k\bar q}
=\Gamma^m_{ik}.
$$

したがって、上添字を持つ曲率演算子は変わらないが、計量を掛けて下添字を作る四階成分は $R'=cR$。Ricci縮約では逆計量が $c^{-1}$ 倍になるため、$\operatorname{Ric}'=\operatorname{Ric}$。一方、正則断面曲率の分母は $c^2$ 倍される。

<a id="prop-kah1-10-scaling"></a>

<!-- formal-statement-start -->
> **命題（定数倍による曲率の変化）**  
> $(X,g)$ を滑らかなKähler多様体とし、$c>0$ を定数とする。$g'=cg$ と置けば

$$
R'_{i\bar j k\bar\ell}=cR_{i\bar j k\bar\ell},
\qquad
\operatorname{Ric}'_{i\bar j}=\operatorname{Ric}_{i\bar j},
\qquad
H'(v)=c^{-1}H(v).
$$

> 特に $g'=cg_{\mathrm{FS}}$ なら $\operatorname{Ric}'=((n+1)/c)g'$、$H'=2/c$。
<!-- formal-statement-end -->

### 証明の見取り図

接続係数では逆計量と一次微分が相殺する。曲率の一階微分は変わらないが、四階成分へ下げる際には計量を一度掛ける。縮約と方向の長さでそれぞれ別の定数倍が入る。

<!-- proof-start -->
### 証明

上記の接続係数の等式から $R'(\partial_i,\partial_{\bar j})\partial_k=R(\partial_i,\partial_{\bar j})\partial_k$。従って $R'_{i\bar j k\bar\ell}=cR_{i\bar j k\bar\ell}$。逆計量は $(g')^{k\bar\ell}=c^{-1}g^{k\bar\ell}$ なので

$$
\operatorname{Ric}'_{i\bar j}
=c^{-1}g^{k\bar\ell}\,cR_{i\bar j k\bar\ell}
=\operatorname{Ric}_{i\bar j}.
$$

$H'(v)$ の分子は $c$ 倍、分母は $(cg(v,\bar v))^2=c^2g(v,\bar v)^2$ だから $H'=c^{-1}H$。Fubini–Studyの式は直前の定理を代入すれば従う。$\square$
<!-- proof-end -->

**何を学んだか。** 平坦性、曲率の正負、Ricci縮約、正則断面曲率は異なる情報である。平坦トーラスは全部零、一次元共形計量は混合二階微分の符号で正負が変わり、Fubini–Studyは正則断面曲率が全点・全方向で正の値 $2$ となる。次章では、ここで成分として定義したRicci形式が、なぜ行列式の対数の微分から得られるのかを調べる。

## 7. 演習：三つの模型を自力でつなぐ

### Level A

<a id="ex-kah1-10-a01"></a>
#### KAH1-10-A01 定数計量と格子商
- Level: A

$\mathbb C^2$ に $g_{i\bar j}=\operatorname{diag}(2,3)$ を与え、任意の格子 $\Lambda$ による商へ降ろす。Kähler条件、四階曲率、$\operatorname{Ric}_{1\bar1}$、$H(\partial_2)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 固有値 $2,3$ は正である。成分が一定なので基本形式の微分は零。平行移動で計量は不変だから商に降りる。[曲率局所成分公式](../KAH1-09/index.md#prop-kah1-09-local-curvature)へ $\partial_i g_{k\bar\ell}=0$、$\partial_i\partial_{\bar j}g_{k\bar\ell}=0$ を入れ、$R_{i\bar j k\bar\ell}=0$。逆計量は $\operatorname{diag}(1/2,1/3)$ だから $\operatorname{Ric}_{1\bar1}=\frac12R_{1\bar1 1\bar1}+\frac13R_{1\bar1 2\bar2}=0$。$\partial_2$ の長さの二乗は $3>0$ であるから $H(\partial_2)=0/3^2=0$。
<!-- solution-end -->

<a id="ex-kah1-10-a02"></a>
#### KAH1-10-A02 指数型の曲率の符号
- Level: A

$g_{z\bar z}=\exp(3|z|^2)$ について、接続係数、四階曲率、Ricci成分、原点の正則断面曲率を求めよ。

<!-- solution-start -->
**詳細解答。** $f=3z\bar z$ だから $f_z=3\bar z$、$f_{z\bar z}=3$。従って[一次元共形曲率公式](#prop-kah1-10-conformal-curvature)で

$$
\Gamma^z_{zz}=3\bar z,\quad
R_{z\bar z z\bar z}=-3e^{3|z|^2},\quad
\operatorname{Ric}_{z\bar z}=-3.
$$

原点で $g=1$ なので $H(0)=-3/1=-3$。$g$ の正値性は指数関数から、Kähler閉性は実次元2で外微分の次数3が零であることから従う。
<!-- solution-end -->

<a id="ex-kah1-10-a03"></a>
#### KAH1-10-A03 射影直線の別の点
- Level: A

$\mathbb{CP}^1$ の標準チャートで $z=1$ とする。$g_{z\bar z}$、$R_{z\bar z z\bar z}$、$\operatorname{Ric}_{z\bar z}$ と $H(\partial_z)$ を求めよ。

<!-- solution-start -->
**詳細解答。** ポテンシャル $\log(1+|z|^2)$ を二度微分して $g=(1+|z|^2)^{-2}$、従って $g(1)=1/4$。$f=\log g=-2\log(1+|z|^2)$ と置くと

$$
f_{z\bar z}=-2\partial_z\partial_{\bar z}\log(1+|z|^2)
=-\frac{2}{(1+|z|^2)^2}.
$$

$z=1$ で $f_{z\bar z}=-1/2$、[共形曲率公式](#prop-kah1-10-conformal-curvature)により $R=-g f_{z\bar z}=1/8$、$\operatorname{Ric}=-f_{z\bar z}=1/2$。$H=R/g^2=(1/8)/(1/16)=2$。原点だけの結果を無断で代入せず、非原点で再計算した。
<!-- solution-end -->

<a id="ex-kah1-10-a04"></a>
#### KAH1-10-A04 Ricci縮約に逆計量が必要な理由
- Level: A

$\mathbb{CP}^2$ の $z=(1,0)$ について、計量と逆計量を求め、$\operatorname{Ric}_{1\bar1}$ を二つの四階成分から計算せよ。

<!-- solution-start -->
**詳細解答。** $A=2$ を代入すると $g=\operatorname{diag}(1/4,1/2)$ であり、逆行列は $g^{-1}=\operatorname{diag}(4,2)$。[Fubini–Study曲率定理](#thm-kah1-10-fs-curvature)によって

$$
R_{1\bar1 1\bar1}=2(1/4)^2=1/8,\qquad
R_{1\bar1 2\bar2}=(1/4)(1/2)=1/8.
$$

そこで $\operatorname{Ric}_{1\bar1}=4(1/8)+2(1/8)=3/4$。二項をただ足すと $1/4$ となり誤る。正規直交していない座標基底では逆計量を忘れない。
<!-- solution-end -->

### Level B

<a id="ex-kah1-10-b01"></a>
#### KAH1-10-B01 原点で平坦に見える非平坦計量
- Level: B

$g_{z\bar z}=\exp(\alpha|z|^2+\beta|z|^4)$ ($\alpha,\beta\in\mathbb R$) の $H(z)$ を求めよ。$\alpha=0$、$\beta\ne0$ のとき原点では曲率零なのに、どの原点近傍も全体として平坦ではないことを示せ。

<!-- solution-start -->
**詳細解答。** $r=z\bar z$ と置く。$\partial_z r=\bar z$、$\partial_{\bar z}r=z$ であり

$$
\partial_z\partial_{\bar z}r^2
=\partial_{\bar z}(2r\bar z)=2z\bar z+2r=4r.
$$

従って $f_{z\bar z}=\alpha+4\beta r$。[一次元公式](#prop-kah1-10-conformal-curvature)より

$$
H(z)=-(\alpha+4\beta|z|^2)
\exp(-\alpha|z|^2-\beta|z|^4).
$$

$\alpha=0$ なら $H(0)=0$ だが、任意の原点近傍に $z\ne0$ が存在し、その点では $\beta\ne0$ だから $H(z)=-4\beta|z|^2e^{-\beta|z|^4}\ne0$。一点の曲率零を近傍全体の平坦性と取り違えてはいけない。
<!-- solution-end -->

<a id="ex-kah1-10-b02"></a>
#### KAH1-10-B02 二次元射影空間の方向別の確認
- Level: B

$\mathbb{CP}^2$ の $z=0$ において $v=\partial_1+2\partial_2$ とし、分子 $R(v,\bar v,v,\bar v)$、長さの二乗、$H(v)$ を求めよ。$v$ を $3v$ に変えても値が同じことを直接示せ。

<!-- solution-start -->
**詳細解答。** 原点で $g_{i\bar j}=\delta_{ij}$、$v=(1,2)$ であるから $s=g(v,\bar v)=1^2+2^2=5$。[Fubini–Study曲率定理](#thm-kah1-10-fs-curvature)の二項それぞれを $v^i\bar v^jv^k\bar v^\ell$ と縮約すると、第一項は $s\cdot s=25$、第二項も $(\sum|v^i|^2)^2=25$。よって分子 $50$、分母 $s^2=25$、$H(v)=2$。$3v$ では $s'=9s=45$、分子は $3^4\cdot50=4050$、分母 $45^2=2025$ だから $H(3v)=2$。
<!-- solution-end -->

<a id="ex-kah1-10-b03"></a>
#### KAH1-10-B03 平坦因子と射影因子を混ぜる
- Level: B

平坦複素トーラス $T$ と $\mathbb{CP}^1$ の直積に積Kähler計量を与える。ベクトル $v=(u,w)\in T^{1,0}T\oplus T^{1,0}\mathbb{CP}^1$ で、$a=g_T(u,\bar u)\ge0$、$b=g_{\mathrm{FS}}(w,\bar w)\ge0$、$a+b>0$ とする。$H(v)$ を求め、零になる方向を説明せよ。

<!-- solution-start -->
**詳細解答。** [積Kähler計量の構成](../KAH1-05/index.md#thm-kah1-05-product)では計量行列はブロック対角で、一方の因子の座標による他方の計量の微分は零。したがって接続係数も同じブロックに分かれ、混合曲率は零となる。トーラス因子は曲率零、射影直線因子は[曲率定理](#thm-kah1-10-fs-curvature)より $R(w,\bar w,w,\bar w)=2b^2$。全長の二乗は $a+b$ なので

$$
H(v)=\frac{0+2b^2}{(a+b)^2}.
$$

$b=0$、すなわち $w=0$ の純トーラス方向で $H=0$。$b>0$ なら $H>0$ だが、$a>0$ を混ぜれば $H<2$。直積全体で正則断面曲率が一定になるわけではない。
<!-- solution-end -->

### Level C

<a id="ex-kah1-10-c01"></a>
#### KAH1-10-C01 計量の倍率と積の正則曲率
- Level: C

$T$ を平坦な複素一次元トーラス、$c>0$ とし、$X=T\times\mathbb{CP}^1$ に積計量 $g_c=g_T\oplus c\,g_{\mathrm{FS}}$ を入れる。次を求めよ。

1. $\mathbb{CP}^1$ 因子の四階曲率、Ricci成分、正則断面曲率を $c$ で表す。
2. $v=(u,w)$、$a=g_T(u,\bar u)$、$b=cg_{\mathrm{FS}}(w,\bar w)$、$a+b>0$ に対する $H_{g_c}(v)$ を求める。
3. $X$ のRicci成分が零でないのに、$H_{g_c}(v)=0$ となる非零方向がある理由を述べる。

<!-- solution-start -->
**詳細解答。** まず射影直線のもとの計量を $g$ と書くと、[曲率とRicciの公式](#thm-kah1-10-fs-curvature)は $R_{z\bar z z\bar z}=2g^2$、$\operatorname{Ric}_{z\bar z}=2g$ である。[定数倍の命題](#prop-kah1-10-scaling)を $g'=cg$ に適用する。すると

$$
R'_{z\bar z z\bar z}=2cg^2=\frac2c(g')^2,\qquad
\operatorname{Ric}'_{z\bar z}=2g=\frac2c g',\qquad
H'=2/c.
$$

次に積計量はブロック対角であり、平坦トーラスの四階成分は零、異なる因子を混ぜた成分も零である。射影因子で $b>0$ のときは $H(w)=R(w,\bar w,w,\bar w)/b^2=2/c$ だから $R(w,\bar w,w,\bar w)=(2/c)b^2$ となる。$b=0$ なら $w=0$ なので両辺とも零である。分母は全長の二乗 $(a+b)^2$ だから

$$
\boxed{H_{g_c}(u,w)=\frac{2b^2}{c(a+b)^2}.}
$$

最後に $u\ne0$、$w=0$ を選べば $a>0$、$b=0$ であり $H=0$。一方、射影因子のRicci成分は $2g=(2/c)g'$ で零でない。Ricciは全方向の縮約から得られるため、特定の方向で測った $H=0$ と矛盾しない。$\square$
<!-- solution-end -->
