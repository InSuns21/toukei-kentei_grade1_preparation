# GMT29 Euclid等周不等式

<!-- definition-example-audit: strict -->

## 1. 体積を固定したとき、境界はどこまで小さくなるか

前講の[Gauss--Green境界積分](../GMT28/index.md#thm-gmt28-boundary-integration)は、滑らかとは限らない境界にも面積と法線を与えました。では、体積が同じ二つの集合のうち、境界の総面積が少ないのはどちらでしょう。球は自然な候補ですが、球を一例として計算しただけでは、すべての複雑な集合と比べたことにはなりません。

以下、整数 $d\ge2$ とします。$|E|=\mathcal L^d(E)$ は体積、$P(E)=|D\chi_E|(\mathbb R^d)$ は[全周長](../GMT24/index.md#def-gmt24-finite-perimeter)、$\omega_d=|B_1(0)|$ は単位球の体積です。境界の面積には [GMT27のDe Giorgi構造定理](../GMT27/index.md#thm-gmt27-de-giorgi-structure)に整合する正規化面積 $\mathcal A^{d-1}=c_{d-1}^{-1}\mathcal H^{d-1}$ を使います。非正規化の $\mathcal H^{d-1}$ をそのまま通常の曲面積と見なして係数を落としてはいけません。

最初に球を直接計算します。半径 $R>0$ の球では

$$
|B_R|=\omega_dR^d,\qquad P(B_R)=d\omega_dR^{d-1}.
$$

後者は滑らかな球面上で外向き法線が $\nu=x/R$ であることから、[境界積分公式](../GMT28/index.md#thm-gmt28-boundary-integration)を $x$（球の近傍で1になるcutoffを掛ける）に適用して

$$
R\,P(B_R)=\int_{\partial B_R}x\cdot\nu\,d\mathcal A^{d-1}
=\int_{B_R}\operatorname{div}x\,dx=d|B_R|
$$

と導きます。体積を $V$ に固定すると半径は $R=(V/\omega_d)^{1/d}$ です。したがって球の周長は

$$
P(B_R)=d\omega_d^{1/d}V^{(d-1)/d}.
$$

### 定数と尺度を比較するための言葉

等周不等式の左辺と右辺がどれだけ離れているかを、体積に依存しない量で記録します。また「ほとんど球」と「本当に球」を区別するため、体積が等しい球との対称差も測ります。ここで $E\triangle F=(E\setminus F)\cup(F\setminus E)$ です。

<a id="def-gmt29-isoperimetric-ratio"></a>

<!-- formal-statement-start -->
> **定義（等周比とFraenkel非対称度）**
> $E\subset\mathbb R^d$ をLebesgue可測で $0<|E|<\infty$、$P(E)<\infty$ とし、$r_E=(|E|/\omega_d)^{1/d}$ とする。**等周比** $I(E)$ と **Fraenkel非対称度** $\alpha(E)$ を

$$
I(E)=\frac{P(E)}{d\omega_d^{1/d}|E|^{(d-1)/d}},\qquad
\alpha(E)=\inf_{z\in\mathbb R^d}
\frac{|E\triangle B_{r_E}(z)|}{|E|}
$$

> で定める。$\alpha(E)$ は体積が等しい球とのずれを表し、$0\le\alpha(E)\le2$ である。零測度の違いは区別しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt29-isoperimetric-ratio -->
**定義の確認**。$E=B_R(z)$ は可測で正の有限体積と有限周長を持ち、$r_E=R$ です。上の球の計算を代入すると

$$
I(B_R(z))=\frac{d\omega_dR^{d-1}}{d\omega_d^{1/d}(\omega_dR^d)^{(d-1)/d}}=1,
\qquad\alpha(B_R(z))=0.
$$

最後の等式は、非対称度のinfimumで中心を $z$ と取れば対称差が空となり、非負性から0になるためです。逆に $\alpha(E)=0$ なら $E$ はある球とほとんど至る所（almost everywhere; a.e.）一致します。実際、半径が固定された球の中心が無限遠へ逃げると交わりの体積が0になるので、対称差が0へ近づく球の中心 $z_j$ を並べた列は有界です。収束部分列 $z_j\to z$ を取り、球の指示関数の $L^1$ 連続性を使えば $|E\triangle B_{r_E}(z)|=0$ です。
<!-- definition-example-end -->

並進や倍率 $\lambda>0$ については、変数変換と[周長測度の変換](../GMT24/index.md#prop-gmt24-set-operations)から

$$
|\lambda E+z|=\lambda^d|E|,\qquad
P(\lambda E+z)=\lambda^{d-1}P(E),\qquad
I(\lambda E+z)=I(E).
$$

境界は $d-1$ 次元、体積は $d$ 次元なので、指数 $(d-1)/d$ は尺度から強制されます。**尺度だけでは鋭い係数 $d\omega_d^{1/d}$ は出ません。**

## 2. まずBV--Sobolevから得られるもの

既に [GMT26の球上BV--Sobolev評価の証明](../GMT26/index.md#lem-gmt26-ball-sobolev)では、コンパクト台の $BV$ 関数を全空間へ延長した形で、$q=d/(d-1)$ に対する $L^1$ 型Sobolev評価を構成しました。これを特性関数に適用すると、体積と周長のべきが結ばれます。

<a id="lem-gmt29-nonsharp"></a>

<!-- formal-statement-start -->
> **補題（BV指示関数からの非鋭い等周評価）**
> $d\ge2$ なら、次元だけに依存する $C_d<\infty$ が存在し、任意のLebesgue可測集合 $E\subset\mathbb R^d$ で $|E|<\infty$、$P(E)<\infty$ に対して

$$
|E|^{(d-1)/d}\le C_dP(E)
$$

> が成り立つ。ここで $C_d$ が最良定数であるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[GMT26の全空間評価](../GMT26/index.md#lem-gmt26-ball-sobolev)で $u=\chi_E$ と置き、$\|\chi_E\|_q=|E|^{1/q}$ と、$|D\chi_E|(\mathbb R^d)=P(E)$ を代入します。

<!-- proof-start -->
### 証明

まず $E$ が有界なら、[GMT22の平滑化と全変動評価](../GMT22/index.md#prop-gmt22-local-convolution)で $u_\varepsilon=\rho_\varepsilon*\chi_E$ を取ります。$u_\varepsilon\to\chi_E$ は $L^1$ 収束し、

$$
\int_{\mathbb R^d}|\nabla u_\varepsilon|\,dx
\le |D\chi_E|(\mathbb R^d)=P(E).
$$

$u_\varepsilon$ はコンパクト台滑らかなので、[GMT26の証明中の全空間Sobolev評価](../GMT26/index.md#lem-gmt26-ball-sobolev)から

$$
\|u_\varepsilon\|_{L^q}\le C_d\int|\nabla u_\varepsilon|
\le C_dP(E).
$$

[MT1の測度収束からa.e.収束部分列を取る定理](../../MT/MT1/index.md#thm-mt1-measure-subsequence-ae)により部分列でa.e.収束させ、[Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)を使うと

$$
\|\chi_E\|_{L^q}=|E|^{1/q}\le C_dP(E).
$$

一般の有限体積集合では、半径の適切な列 $R_j\to\infty$ に対して $E_j=E\cap B_{R_j}$ とすれば、後の[切断・近似補題](#lem-gmt29-strict-approx)と同じ理由で $|E_j|\to|E|$、$P(E_j)\to P(E)$ を得ます。有限範囲の不等式を極限へ渡せばよいです。
<!-- proof-end -->

この証明の定数 $C_d$ から、最良定数 $1/(d\omega_d^{1/d})$ を導く根拠はありません。次節では、非鋭い評価とは**別の構成**によって鋭い係数を出します。

## 3. 滑らかな領域で鋭い定数を作る：下接触集合

ここではまず、有界・連結で境界が $C^{2,\beta}$（$0<\beta<1$）の開集合 $\Omega$ を考えます。正則な境界なら体積 $|\Omega|$ と周長 $P(\Omega)$ は通常の体積と曲面積に一致します。

証明では、関数 $u$ のグラフの下から接する接平面に注目します。点 $x$ で接平面が領域全体のグラフより上へ出ない、すなわち

$$
u(y)\ge u(x)+\nabla u(x)\cdot(y-x)\quad
(\forall y\in\overline\Omega)
$$

という条件を満たす点を集めます。そこで次の集合を定義します。

<a id="def-gmt29-lower-contact"></a>

<!-- formal-statement-start -->
> **定義（下接触集合）**
> $\Omega\subset\mathbb R^d$ を有界開集合、$u\in C^2(\overline\Omega)$ とする。$u$ の**下接触集合** $\Gamma_u$ は

$$
\Gamma_u=\bigl\{x\in\Omega:
u(y)\ge u(x)+\nabla u(x)\cdot(y-x)
\quad(\forall y\in\overline\Omega)\bigr\}
$$

> である。$\Gamma_u$ は接平面が全域でグラフの下側にある内点の集合である。
<!-- formal-statement-end -->

接平面を局所的に下から当てているので、$x\in\Gamma_u$ では $\nabla^2u(x)$ は半正定値です。実際、任意の方向 $v$ で $y=x+tv$ として二階Taylor展開し、$t^2v^{\mathsf T}\nabla^2u(x)v/2+o(t^2)\ge0$ とすれば分かります。

<!-- definition-example-start: def-gmt29-lower-contact -->
### 放物面の直接例

**定義の確認**。有界開集合 $\Omega$ 上で $u(x)=\tfrac a2|x|^2+b\cdot x$、$a>0$ と置きます。

すべての $x,y$ について

$$
u(y)-u(x)-\nabla u(x)\cdot(y-x)=\frac a2|y-x|^2\ge0.
$$

したがって[下接触集合の定義](#def-gmt29-lower-contact)の全条件を満たし、$\Gamma_u=\Omega$、$\nabla^2u=aI_d$、$\det\nabla^2u=a^d$ です。後の等号条件は、この放物面へ戻ることを意味します。
<!-- definition-example-end -->

<a id="thm-gmt29-smooth-sharp"></a>

<!-- formal-statement-start -->
> **定理（滑らかな領域の鋭い等周不等式と等号剛性）**
> $d\ge2$、$\Omega\subset\mathbb R^d$ を空でない有界・連結な $C^{2,\beta}$ 領域とする。このとき

$$
P(\Omega)\ge d\omega_d^{1/d}|\Omega|^{(d-1)/d}.
$$

> 等号が成り立つのは、$\Omega$ がある開球である場合、かつその場合に限る。有限個の連結成分からなる滑らかな領域でも同じ不等式が成り立ち、等号はただ一つの球状成分の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

[GPDE8のNeumann弱解](../../GPDE/GPDE8/index.md#thm-gpde8-neumann)を使って、$\Delta u=P(\Omega)/|\Omega|$、$\partial_\nu u=1$ を解きます。任意の勾配 $p$ で $|p|<1$ は下接触点の勾配となるので、$\nabla u(\Gamma_u)$ は単位球を覆います。そこで [GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)と、半正定値行列の行列式・跡の相加相乗平均を組み合わせます。等号ならHessianが定数倍の単位行列となり、Neumann境界条件が球を強制します。

<!-- proof-start -->
### 証明

**(1) Neumann問題と適合条件。** $V=|\Omega|$、$S=P(\Omega)>0$、$c=S/V$ と置きます。求める問題は

$$
\Delta u=c\quad\text{in }\Omega,\qquad
\partial_\nu u=1\quad\text{on }\partial\Omega.
$$

定数1で試験すると、必要な積分条件は $cV=S$ です。これは $c$ の選び方で正確に満たされます。[Neumann弱解定理](../../GPDE/GPDE8/index.md#thm-gpde8-neumann)で、符号を

$$
F(v)=\int_{\partial\Omega}v\,d\mathcal A^{d-1}
-c\int_\Omega v\,dx
$$

と取れば $F(1)=S-cV=0$ です。同定理を $A=I_d$ に適用して $u\in H^1(\Omega)$ を得ます。ここでは、滑らかな境界・定数内部データ・滑らかな境界データに対する**古典的Neumann正則性**（境界のSchauder正則性）を追加で用い、$u\in C^{2,\beta}(\overline\Omega)$ まで高めます。この正則性の一般証明は楕円型境界値問題の理論であり、本講の幾何的証明とは区別して採用します。Greenの公式の符号は

$$
\int_\Omega\nabla u\cdot\nabla v
=-\int_\Omega v\,\Delta u+\int_{\partial\Omega}v\,\partial_\nu u
=F(v)
$$

で一致します。

**(2) すべての $|p|<1$ が接触勾配となる。** $p\in B_1(0)$ を固定し、$w_p(y)=u(y)-p\cdot y$ を $\overline\Omega$ 上で最小にする点 $x_p$ を取ります。もし $x_p\in\partial\Omega$ なら、境界から内側へ進むときの片側導関数が非負でなければなりません。すなわち $\partial_\nu w_p(x_p)\le0$ が必要です。しかし

$$
\partial_\nu w_p(x_p)=1-p\cdot\nu(x_p)
\ge1-|p|>0
$$

となって矛盾します。よって $x_p\in\Omega$ で、内点最小の条件から $\nabla u(x_p)=p$。さらに最小性そのものが

$$
u(y)-p\cdot y\ge u(x_p)-p\cdot x_p
\quad(\forall y\in\overline\Omega)
$$

を与えるので $x_p\in\Gamma_u$ です。したがって

$$
B_1(0)\subset\nabla u(\Gamma_u).
$$

**(3) 面積公式と行列式。** $\Gamma_u$ は可測です。$u\in C^{2,\beta}(\overline\Omega)$ と境界の滑らかさにより、$\nabla u$ は境界近傍へ $C^1$ に延長でき、コンパクトな $\overline\Omega$ 上でLipschitzです。[area formula](../GMT11/index.md#thm-gmt11-area-formula)により、勾配像の多重度を数えると

$$
\omega_d=|B_1|\le|\nabla u(\Gamma_u)|
\le\int_{\Gamma_u}|\det\nabla^2u(x)|\,dx.
$$

接触点では $\nabla^2u$ の固有値 $\lambda_1,\dots,\lambda_d$ がすべて非負です。その和は $\Delta u=c$ なので、相加相乗平均から

$$
\det\nabla^2u=\prod_{i=1}^d\lambda_i
\le\left(\frac1d\sum_{i=1}^d\lambda_i\right)^d
=\left(\frac cd\right)^d.
$$

従って

$$
\omega_d\le|\Gamma_u|\left(\frac cd\right)^d
\le V\left(\frac{S}{dV}\right)^d
=\frac{S^d}{d^dV^{d-1}}.
$$

正の数の $d$ 乗根を取ると

$$
S\ge d\omega_d^{1/d}V^{(d-1)/d}.
$$

**(4) 等号のとき接触集合から放物面へ。** 等号なら上のすべての不等式が等号です。特に $|\Gamma_u|=V$ であり、相加相乗平均もa.e.接触点で等号となるため

$$
\lambda_1=\cdots=\lambda_d=\frac cd=:a>0,\qquad
\nabla^2u(x)=aI_d\quad\text{for a.e. }x\in\Omega.
$$

Hessianは連続なので、任意の内点で同じ等式が成立します。$\Omega$ の連結性と $\nabla(\nabla u-ax)=0$ から、ある $x_0\in\mathbb R^d$、$b\in\mathbb R$ について

$$
u(x)=\frac a2|x-x_0|^2+b\quad(x\in\Omega).
$$

Neumann条件は、全境界点で

$$
(x-x_0)\cdot\nu(x)=\frac1a=:R>0
$$

となります。$x_0$ が $\overline\Omega$ の外なら $x_0$ に最も近い境界点で外向き法線は $x_0-x$ の方向になり、左辺が負になるので矛盾します。$x_0\in\partial\Omega$ でもその点で左辺は0なので矛盾。よって $x_0\in\Omega$ です。

境界上で $|x-x_0|$ が最大となる点では、領域はその球の内側に接するため $\nu=(x-x_0)/|x-x_0|$ となり、最大距離は $R$。最小距離の点でも、$x_0$ を中心とする開球がその点まで領域内に含まれるため同じ向きの法線となり、最小距離も $R$。従って $\partial\Omega$ の全点が半径 $R$ の球面上にあります。連結な有界領域の境界がそこに含まれる以上、$\Omega=B_R(x_0)$ です。逆向きは第1節で球を直接計算済みです。

**(5) 複数成分。** 各成分の体積 $V_i>0$、周長 $S_i$ について上の結果を適用します。$q=(d-1)/d\in(0,1)$ に対し

$$
\sum_iS_i\ge d\omega_d^{1/d}\sum_iV_i^q
\ge d\omega_d^{1/d}\left(\sum_iV_i\right)^q.
$$

二番目は $q<1$ による凹べきの劣加法性です。正の体積の成分が二つ以上あれば、$a^q+b^q>(a+b)^q$ なので等号は不可能です。
<!-- proof-end -->

### 証明がどこまで閉じたか

鋭い係数は**接触勾配の単位球**の体積 $\omega_d$ と、Hessianの **$d$ 個の固有値**の相加相乗平均から得られました。球が等号となるのは全Hessianが等しい固有値を持つためです。

この節では [Neumann弱解の存在](../../GPDE/GPDE8/index.md#thm-gpde8-neumann)を既習として使用し、滑らかなNeumann問題の境界正則性だけを楕円型PDEの古典的な外部結果として採用しました。次節で、境界が滑らかでない集合にも**不等式そのもの**を拡張します。

## 4. 一般の有限周長集合へ：近似と極限

滑らかな領域に対する不等式を、ギザギザや穴のある集合へそのまま適用してはいけません。$E$ の特性関数を平滑化したとき、体積だけでなく周長も適切に近似する必要があります。

<a id="lem-gmt29-strict-approx"></a>

<!-- formal-statement-start -->
> **補題（有限周長集合の滑らかなstrict近似）**
> $E\subset\mathbb R^d$ をLebesgue可測、$|E|<\infty$、$P(E)<\infty$ とする。このとき有界で滑らかな境界を持つ集合 $E_j$ を取って

$$
|\chi_{E_j}-\chi_E|_{L^1(\mathbb R^d)}\longrightarrow0,
\qquad
P(E_j)\longrightarrow P(E)
$$

> とできる。ここで「滑らか」は、各 $E_j$ が正則値による開集合として $C^\infty$ 境界を持つことを意味し、連結とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

まず大球で切り、遠方に逃げる体積と新しく生じる球面上の境界量を0へ近づけます。次に特性関数の畳み込みのレベル集合を選びます。[GMT22のstrict近似](../GMT22/index.md#thm-gmt22-smooth-approx)と[GMT23のBV coarea](../GMT23/index.md#thm-gmt23-bv-coarea)を、ここでは実際の集合の選択に使います。

<!-- proof-start -->
### 証明

**(1) 有界集合への切断。** 半径関数 $|x|$ の通常のcoareaと $|E|<\infty$ より

$$
\int_0^\infty \mathcal A^{d-1}(E\cap\partial B_r)\,dr=|E|<\infty.
$$

従って $R_j\to\infty$ を、$E$ の球面切断が定義でき、$\mathcal A^{d-1}(E\cap\partial B_{R_j})\to0$ となるように選べます。$F_j=E\cap B_{R_j}$ と置くと、$|F_j\triangle E|=|E\setminus B_{R_j}|\to0$ です。[GMT28の半空間切断の証明](../GMT28/index.md#prop-gmt28-halfspace-cut)と同じcutoffの積の微分を、半径 $|x|$ に適用すると

$$
P(F_j)\le P(E;B_{R_j})
+\mathcal A^{d-1}(E\cap\partial B_{R_j})
\le P(E)+o(1).
$$

反対向きは [全変動の下半連続性](../GMT22/index.md#thm-gmt22-lsc)から $P(E)\le\liminf_j P(F_j)$ です。よって $P(F_j)\to P(E)$。

**(2) 有界集合の滑らかなレベル集合。** $F$ を一つ固定し、$f_\varepsilon=\rho_\varepsilon*\chi_F$ とします。非負の平滑化核を使えば $0\le f_\varepsilon\le1$、台は有界、$f_\varepsilon\to\chi_F$ は $L^1$ 収束です。分布微分の畳み込みから

$$
\int_{\mathbb R^d}|\nabla f_\varepsilon|\,dx\le P(F).
$$

各 $t\in(0,1)$ の超レベル集合 $F_{\varepsilon,t}=\{f_\varepsilon>t\}$ について、層ケーキ表示を使い、さらに[滑らかな関数の周長coarea](../GMT23/index.md#prop-gmt23-smooth-coarea)から

$$
\int_0^1|F_{\varepsilon,t}\triangle F|\,dt
=\|f_\varepsilon-\chi_F\|_1\longrightarrow0,
$$

$$
\int_0^1P(F_{\varepsilon,t})\,dt
=\int_{\mathbb R^d}|\nabla f_\varepsilon|\,dx
\le P(F).
$$

厳密な選択を確認します。$\varepsilon_k\downarrow0$ を、第一式の右辺が $2^{-k}$ 以下となるように取れば、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)と[Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)からa.e. $t$ で $F_{\varepsilon_k,t}\to F$ が $L^1$ 収束します。このような $t$ で下半連続性により

$$
P(F)\le\liminf_k P(F_{\varepsilon_k,t}).
$$

一方、周長の $t$ 積分は常に $P(F)$ 以下です。$q_k(t)=P(F_{\varepsilon_k,t})$ と書くと、上の下半連続性は $\liminf_k q_k(t)\ge P(F)$ がa.e. $t$ で成り立つことを意味します。[Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)を $q_k$ に適用して

$$
P(F)\le\int_0^1\liminf_kq_k(t)\,dt
\le\liminf_k\int_0^1q_k(t)\,dt
\le P(F)
$$

を得ます。さらに $(P(F)-q_k)_+\to0$ はa.e.かつ $0\le(P(F)-q_k)_+\le P(F)$ なので、[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)からその積分は0へ向かいます。このことと $\int q_k\to P(F)$ を合わせると

$$
\int_0^1(q_k(t)-P(F))_+\,dt
=\int_0^1q_k(t)\,dt-P(F)
+\int_0^1(P(F)-q_k(t))_+\,dt\longrightarrow0.
$$

両符号の部分の積分が0へ向かるので $q_k\to P(F)$ は $L^1(0,1)$ 収束し、もう一度部分列を取ればa.e. $t$ でも収束します。[GEO3の正則値の定義](../../../幾何系/GEO/GEO3/index.md#def-geo3-regular-critical)でいう正則でない値 $t$ の集合は、滑らかな実数値関数の臨界値が零測度となる古典的な事実（Sard）により、各 $k$ で零測度です。この一般的な微分位相の事実は外部結果として採用し、ここではその証明を追加しません。可算和を除いて同じ $t$ を正則値に取れ、その超レベル集合の境界は滑らかです。

**(3) 対角化。** 各 $F_j$ について、周長・体積の誤差を $1/j$ 未満にする滑らかな集合を選びます。(1)の極限と合わせれば、主張の $E_j$ が得られます。
<!-- proof-end -->

<a id="thm-gmt29-general-sharp"></a>

<!-- formal-statement-start -->
> **定理（有限周長集合のEuclid等周不等式）**
> $d\ge2$ とする。Lebesgue可測集合 $E\subset\mathbb R^d$ が $|E|<\infty$、$P(E)<\infty$ を満たすなら

$$
\boxed{\displaystyle P(E)\ge d\omega_d^{1/d}|E|^{(d-1)/d}.}
$$

> $|E|=0$ の場合は両辺0である。$0<|E|<\infty$ では $I(E)\ge1$ と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

[有限周長集合の滑らかなstrict近似](#lem-gmt29-strict-approx)で滑らかな集合へ移し、[滑らかな等周不等式](#thm-gmt29-smooth-sharp)を各近似集合へ適用します。体積と周長の両方を極限へ渡します。

<!-- proof-start -->
### 証明

$|E|=0$ なら $\chi_E=0$ a.e.なので分布微分も0、$P(E)=0$ です。$|E|>0$ のとき、[strict近似](#lem-gmt29-strict-approx)の $E_j$ について

$$
P(E_j)\ge d\omega_d^{1/d}|E_j|^{(d-1)/d}
$$

が成り立ちます。滑らかな $E_j$ に成分が複数ある場合は、[滑らかな領域の定理](#thm-gmt29-smooth-sharp)の成分ごとの和で同じ不等式が得られます。$|E_j\triangle E|\to0$ から

$$
\bigl||E_j|-|E|\bigr|\le|E_j\triangle E|\to0.
$$

さらに $P(E_j)\to P(E)$ なので、両辺を極限に送って主張を得ます。
<!-- proof-end -->

## 5. 等号と「ほとんど球」の間に必要な一手

前節の極限は**不等式**を保ちます。しかし、近似集合で「不等式の差が0へ向かう」だけでは、それらがどんな形に近づくかは分かりません。従って、滑らかな集合で等号が球に限ることを示しただけで、一般の有限周長集合での等号の形まで証明できた、としてはなりません。

ここではその不足を正確に埋めるため、次の定量的安定性定理を**外部の高度な結果として明示的に使用**します。これは本講のABP証明から自動的には従わず、完全な証明は長い幾何学的測度論を要します。

**追加で採用する定量的安定性定理**（Fusco--Maggi--Pratelli, 2008）。整数 $d\ge2$ ごとに $k_d>0$ が存在し、$0<|E|<\infty$、$P(E)<\infty$ を満たす任意のLebesgue可測集合に対して、[等周比と非対称度](#def-gmt29-isoperimetric-ratio)は

$$
I(E)-1\ge k_d\alpha(E)^2
$$

を満たします。参考：N. Fusco, F. Maggi, A. Pratelli, [*The sharp quantitative isoperimetric inequality*](https://annals.math.princeton.edu/2008/168-3/p06), *Annals of Mathematics* **168** (2008), 941--980。これは**一般集合の等号の剛性にだけ**追加する結果であり、前節の鋭い定数の証明に循環して使いません。定量定理の証明はこの講義には収録していないことを明示します。

<a id="cor-gmt29-equality"></a>

<!-- formal-statement-start -->
> **系（有限周長集合の等号分類）**
> $d\ge2$、$E\subset\mathbb R^d$ はLebesgue可測、$0<|E|<\infty$、$P(E)<\infty$ とする。[Euclid等周不等式](#thm-gmt29-general-sharp)の等号

$$
P(E)=d\omega_d^{1/d}|E|^{(d-1)/d}
$$

> が成り立つことと、ある $z\in\mathbb R^d$、$R>0$ に対して $|E\triangle B_R(z)|=0$ となることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

等号なら $I(E)-1=0$。追加した安定性定理で $\alpha(E)=0$ となります。定義例で確認した、非対称度0なら球にa.e.一致するという事実へ戻します。

<!-- proof-start -->
### 証明

等号の仮定を [等周比](#def-gmt29-isoperimetric-ratio)へ代入すると $I(E)-1=0$ です。定量的安定性定理で

$$
0\ge k_d\alpha(E)^2\ge0
$$

だから $\alpha(E)=0$。$k_d>0$ なのでこれは厳密な結論です。[定義の直接確認](#def-gmt29-isoperimetric-ratio)で示した球の中心を並べた列の有界性と球の $L^1$ 連続性により、ある中心 $z$ で $E=B_{r_E}(z)$ がLebesgue a.e.成り立ちます。逆に球とa.e.一致すれば体積も分布周長も同じで、第1節の球の計算から等号が成立します。
<!-- proof-end -->

**論理上の境界。** 一般の有限周長集合の等号分類には、上記の定量的安定性という外部結果が入っています。一方、鋭い不等式の証明自体は第3・4節で閉じています。滑らかな領域の等号剛性は第3節で直接証明しました。これらを同一の「すべて自力で証明した」という主張に混ぜません。

## 6. 三種類の集合を数値で比較する

### 球

$|B_R|=\omega_dR^d$ と $P(B_R)=d\omega_dR^{d-1}$ なので $I(B_R)=1$。半径を変えても不変です。

### 直方体

$Q=\prod_{i=1}^d(0,a_i)$、$a_i>0$ に対して、$d$ 軸のそれぞれに垂直な面が2枚ずつあり、

$$
|Q|=\prod_{i=1}^da_i,\qquad
P(Q)=2\sum_{i=1}^d\prod_{j\ne i}a_j
=2|Q|\sum_{i=1}^d\frac1{a_i}.
$$

相加相乗平均より $\sum_i a_i^{-1}\ge d/(\prod_i a_i)^{1/d}$ だから

$$
P(Q)\ge2d|Q|^{(d-1)/d}
>d\omega_d^{1/d}|Q|^{(d-1)/d}.
$$

最後の厳密不等号は、単位球が立方体 $(-1,1)^d$ に真に含まれ $\omega_d<2^d$ だからです。正方体でも球にはなれず、等号になりません。

### 離れた二球

閉包が交わらない $B_R(x)$ と $B_r(y)$ を取ると、[周長測度の局所性](../GMT24/index.md#prop-gmt24-set-operations)により

$$
|E|=\omega_d(R^d+r^d),\qquad
P(E)=d\omega_d(R^{d-1}+r^{d-1}).
$$

$q=(d-1)/d$ と $A=R^d$、$B=r^d$ を置けば

$$
R^{d-1}+r^{d-1}=A^q+B^q>(A+B)^q.
$$

分離した二つの球は、それぞれが最適形でも、全体としては最適になりません。これは**成分を一つに集めると周長を節約できる**ことの正確な数式です。

## 7. 演習

### Level A：定数・スケール・直接例

<a id="ex-gmt29-a01"></a>
### GMT29-A01 半径と等周比

- Level: A

$d=3$、$E=B_R(0)$、$R>0$ に対し、$|E|$、$P(E)$、$I(E)$ を計算せよ。$\omega_3=4\pi/3$ を用いてよい。

<!-- solution-start -->
#### 詳細解答

球の体積は $|E|=(4\pi/3)R^3$ です。[Gauss--Green](../GMT28/index.md#thm-gmt28-boundary-integration)を $\Phi=x$ に適用すると $RP(E)=3|E|$ なので $P(E)=4\pi R^2$。従って

$$
I(E)=\frac{4\pi R^2}{3(4\pi/3)^{1/3}((4\pi/3)R^3)^{2/3}}
=\frac{4\pi R^2}{3(4\pi/3)R^2}=1.
$$

$R$ が分子と分母の双方で2乗になって消えます。
<!-- solution-end -->

<a id="ex-gmt29-a02"></a>
### GMT29-A02 長方形の周長と係数

- Level: A

$d=2$、$Q=(0,a)\times(0,b)$、$a,b>0$ とする。$P(Q)^2\ge16|Q|$ を示し、$P(Q)^2\ge4\pi|Q|$ と比較せよ。

<!-- solution-start -->
#### 詳細解答

$|Q|=ab$、$P(Q)=2(a+b)$ です。$(a-b)^2\ge0$ を移項すると $(a+b)^2\ge4ab$ なので

$$
P(Q)^2=4(a+b)^2\ge16ab=16|Q|.
$$

$16>4\pi$（$\pi<4$）だから $P(Q)^2\ge16|Q|>4\pi|Q|$ です。$a=b$ なら最初の不等式は等号ですが、**Euclid等周不等式**では依然として厳密です。
<!-- solution-end -->

<a id="ex-gmt29-a03"></a>
### GMT29-A03 零測度の穴

- Level: A

$E=B_1(0)\setminus\{0\}\subset\mathbb R^d$ とする。体積、周長、等周比を求め、位相的境界だけでは答えが決まらない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$\{0\}$ はLebesgue零集合なので $\chi_E=\chi_{B_1}$ がa.e.成立します。[有限周長の定義](../GMT24/index.md#def-gmt24-finite-perimeter)では任意のテスト場について発散積分が同じであるため、

$$
|E|=\omega_d,\qquad P(E)=d\omega_d,\qquad I(E)=1.
$$

位相的境界には新たに点0が入りますが、分布微分は変化しません。したがって位相的境界を単純に「全部数える」説明では、周長がa.e.同値な集合の量であることが表現できません。
<!-- solution-end -->

<a id="ex-gmt29-a04"></a>
### GMT29-A04 離れた二円盤

- Level: A

$\mathbb R^2$ の半径 $R>0$ の円盤二個を、閉包が交わらない位置に置き、その和集合 $E$ の $I(E)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

面積は $|E|=2\pi R^2$、周長は $P(E)=4\pi R$ です。$d=2$ の定数は $2\sqrt\pi$ なので

$$
I(E)=\frac{4\pi R}{2\sqrt\pi\sqrt{2\pi R^2}}
=\frac{4}{2\sqrt2}=\sqrt2>1.
$$

各円盤の等周比は1ですが、二つを離すと体積は2倍、周長は2倍となり、体積の平方根が $\sqrt2$ 倍にしかならないため比が増えます。
<!-- solution-end -->

### Level B：証明の機構と落とし穴

<a id="ex-gmt29-b01"></a>
### GMT29-B01 Neumannの適合条件

- Level: B

滑らかな有界連結領域 $\Omega$ に $\Delta u=c$、$\partial_\nu u=1$ を課す。$c$ が $P(\Omega)/|\Omega|$ でなければならない理由と、弱形式の符号を示せ。

<!-- solution-start -->
#### 詳細解答

[Gauss--Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)から

$$
c|\Omega|=\int_\Omega\Delta u\,dx
=\int_{\partial\Omega}\partial_\nu u\,d\mathcal A^{d-1}
=P(\Omega).
$$

従って $c=P(\Omega)/|\Omega|$ が必要です。[Neumann弱解](../../GPDE/GPDE8/index.md#thm-gpde8-neumann)の規約 $\int\nabla u\cdot\nabla v=F(v)$ に合わせると、部分積分は

$$
\int_\Omega\nabla u\cdot\nabla v
=\int_{\partial\Omega}v\,d\mathcal A^{d-1}
-c\int_\Omega v\,dx.
$$

従って $F(1)=P(\Omega)-c|\Omega|=0$。符号を逆転させると、この講義の $\Delta u=+c$ と矛盾します。
<!-- solution-end -->

<a id="ex-gmt29-b02"></a>
### GMT29-B02 接触集合とHessian

- Level: B

$\Omega=B_R(0)$、$u(x)=|x|^2/(2R)$ を考える。Neumann条件、$\Gamma_u$、勾配像、$\Delta u$ と $\det\nabla^2u$ を求め、[滑らかな領域の定理](#thm-gmt29-smooth-sharp)の二つの主要不等式がともに等号になることを確認せよ。

<!-- solution-start -->
#### 詳細解答

$\nabla u=x/R$、$\nabla^2u=I_d/R$ なので、球面上で $\nu=x/R$ を用いると $\partial_\nu u=(x/R)\cdot(x/R)=1$ です。

$$
\Delta u=\frac dR=\frac{P(B_R)}{|B_R|},\qquad
\det\nabla^2u=R^{-d}.
$$

また任意の $x,y$ に対し $u(y)-u(x)-\nabla u(x)\cdot(y-x)=|y-x|^2/(2R)\ge0$ なので $\Gamma_u=\Omega$。その勾配像は $\nabla u(\Omega)=B_1(0)$ です。従って

$$
|B_1|=\int_{\Gamma_u}\det\nabla^2u\,dx
=|B_R|R^{-d}=\omega_d,
$$

かつ $\det\nabla^2u=(\Delta u/d)^d=R^{-d}$ で相加相乗平均も等号です。
<!-- solution-end -->

<a id="ex-gmt29-b03"></a>
### GMT29-B03 平滑化レベル集合の二つの積分

- Level: B

有界な有限周長集合 $F$ の平滑化 $f_\varepsilon=\rho_\varepsilon*\chi_F$ について、$0<t<1$ の超レベル集合 $F_{\varepsilon,t}$ を考える。[近似補題](#lem-gmt29-strict-approx)で使う体積誤差と周長の $t$ 積分を導き、**どちらか片方だけ**では証明が閉じない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$0\le f_\varepsilon\le1$ なので、各点 $x$ で

$$
\int_0^1|\mathbf1_{\{f_\varepsilon(x)>t\}}-\chi_F(x)|\,dt
=|f_\varepsilon(x)-\chi_F(x)|.
$$

これを $x$ で積分し、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用すると

$$
\int_0^1|F_{\varepsilon,t}\triangle F|\,dt
=\|f_\varepsilon-\chi_F\|_1\to0.
$$

また[coarea公式](../GMT14/index.md#thm-gmt14-coarea)と[畳み込み全変動評価](../GMT22/index.md#prop-gmt22-local-convolution)から

$$
\int_0^1P(F_{\varepsilon,t})\,dt
=\int|\nabla f_\varepsilon|\,dx\le P(F).
$$

最初だけでは近似集合の周長が爆発する可能性を排除できず、二番目だけでは元の集合に体積で近づくとは限りません。同じレベル集合列で二つの条件を同時に実現するのが核心です。
<!-- solution-end -->

<a id="ex-gmt29-b04"></a>
### GMT29-B04 成分を足すと等号を失う

- Level: B

体積 $V_1,V_2>0$ の二つの滑らかで互いに離れた成分 $\Omega_1,\Omega_2$ がそれぞれ球だとする。$d\ge2$ で和集合の鋭い等周不等式が厳密になることを、凹べきの不等式から証明せよ。

<!-- solution-start -->
#### 詳細解答

$q=(d-1)/d\in(0,1)$、$K=d\omega_d^{1/d}$ と置くと、球の等号から $P(\Omega_i)=KV_i^q$。境界が離れているので、和集合の周長は $K(V_1^q+V_2^q)$ です。

$$
(V_1+V_2)^q
=V_1^q\left(1+\frac{V_2}{V_1}\right)^q
<V_1^q+V_2^q.
$$

最後の厳密不等号は $s>0$、$0<q<1$ に対する $(1+s)^q<1+s^q$ から従います。実際 $g(s)=1+s^q-(1+s)^q$ は $g(0)=0$ で、

$$
g'(s)=q\bigl(s^{q-1}-(1+s)^{q-1}\bigr)>0
$$

です。よって $P(\Omega_1\cup\Omega_2)>K(V_1+V_2)^q$。
<!-- solution-end -->

### Level C：鋭い定数と一般化を一本の証明にする

<a id="ex-gmt29-c01"></a>
### GMT29-C01 ABPから有限周長まで

- Level: C

$d\ge2$ とする。有界連結 $C^{2,\beta}$ 領域 $\Omega$ に対して $\Delta u=P(\Omega)/|\Omega|$、$\partial_\nu u=1$ を解けると仮定する。

1. $|p|<1$ の任意の $p$ に下接触点が存在することを証明せよ。
2. 接触集合でのHessianの条件、面積公式、相加相乗平均をつなぎ、鋭い係数 $d\omega_d^{1/d}$ を導け。
3. 等号時のHessianと境界条件から $\Omega$ が球と分かる理由を示せ。
4. 一般の有限周長集合に不等式を拡張するのに必要な収束を記し、**一般集合の等号分類**はこの極限操作だけでは得られない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 接触勾配。** $V=|\Omega|$、$S=P(\Omega)$、$c=S/V$ とします。$w_p(y)=u(y)-p\cdot y$ の最小点が境界にあるなら、内向きの微分が非負だから $\partial_\nu w_p\le0$。しかし

$$
\partial_\nu w_p=1-p\cdot\nu\ge1-|p|>0,
$$

矛盾です。従って最小点 $x_p$ は内点で $\nabla u(x_p)=p$。大域最小性から $u(y)\ge u(x_p)+p\cdot(y-x_p)$ が全 $y$ で成立し、$x_p\in\Gamma_u$ です。

**2. 体積と行列式。** 下接触条件を $x_p+tv$ に代入し二階微分すると $v^{\mathsf T}\nabla^2u(x_p)v\ge0$。一般の接触点でも同様で、固有値 $\lambda_i\ge0$、$\sum_i\lambda_i=c$。そのため

$$
B_1\subset\nabla u(\Gamma_u),\qquad
\det\nabla^2u=\prod_i\lambda_i
\le(c/d)^d.
$$

[area formula](../GMT11/index.md#thm-gmt11-area-formula)に代入して

$$
\omega_d\le|\nabla u(\Gamma_u)|
\le\int_{\Gamma_u}\det\nabla^2u
\le V\left(\frac{S}{dV}\right)^d.
$$

両辺を $d$ 乗根にし、$V^{(d-1)/d}$ を移項すると

$$
S\ge d\omega_d^{1/d}V^{(d-1)/d}.
$$

**3. 等号の剛性。** 等号なら $\Gamma_u$ は$\Omega$ でほとんど全点を占め、相加相乗平均の等号から $\nabla^2u=(c/d)I$ a.e.です。連続性と連結性より $\nabla u=a(x-x_0)$、$a=c/d>0$。境界条件は $(x-x_0)\cdot\nu=1/a$。$x_0$ は領域内であり、境界点の中心からの最小距離と最大距離はいずれも $1/a$ だから、領域は球です。

**4. 有限周長への移行。** [有限周長集合の滑らかなstrict近似](#lem-gmt29-strict-approx)を使い、滑らかな $E_j$ について

$$
|E_j\triangle E|\to0,\qquad P(E_j)\to P(E)
$$

とします。まず $|E_j|\to|E|$、次に滑らかな集合での不等式を極限に送れば一般の不等式が従います。しかし「近似において等周差が0へ向かう」から「各 $E_j$ 自体が球である」は従いません。一般の等号分類には、本文第5節のような**近等号の形を制御する追加結果**が必要であり、それを使った場合は証明の外部入力を明示しなければなりません。
<!-- solution-end -->
