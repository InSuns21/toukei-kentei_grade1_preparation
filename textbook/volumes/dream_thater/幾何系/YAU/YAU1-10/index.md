# YAU1-10 Calabi型三階評価

## 1. 一様楕円性から、変動の速さを抑える

[前章の大域二階評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)により、複素Monge–Ampère方程式の解計量 $h$ は、固定Kähler計量 $g$ と一様に同程度の大きさになった。しかし成分の上下界だけでは、その微分が速く振動することを防げない。例えば $1+\tfrac14\sin(kx)$ は正の上下界を持つが、導関数は $k$ に比例して増大する。

必要なのは、**二つのKähler計量の接続がどれだけ違うか**を測る三階量である。接続は計量の一階微分を含むため、この差を抑えればポテンシャルの混合三階微分を制御できる。

以下、$(X,\omega)$ は複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体とし、$F\in C^\infty(X,\mathbb R)$ は

$$
\int_Xe^F\omega^n=\int_X\omega^n
$$

を満たすとする。[連続性のパス](../YAU1-05/index.md#def-yau1-05-path)の解が存在する時刻 $t\in[0,1]$ に対して

$$
\rho_t=1-t+te^F,\qquad H_t=\log\rho_t,\qquad
\omega_{\varphi_t}=\omega+i\partial\bar\partial\varphi_t>0,\qquad
\omega_{\varphi_t}^n=\rho_t\omega^n
$$

と置く。$\varphi_t$ は平均零で滑らかとする。$g=(g_{i\bar j})$、$h=(h_{i\bar j})=(g_{i\bar j}+\partial_i\partial_{\bar j}\varphi_t)$ はそれぞれ両計量のHermite係数で、$L_hf=h^{i\bar j}\partial_i\partial_{\bar j}f$ は[線形化の複素Laplacian](../YAU1-03/index.md#prop-yau1-03-linearization)である。

以下の $\partial_i=\partial/\partial z^i$、$\partial_{\bar j}=\partial/\partial\bar z^j$ および $\nabla_i^g$ は、**時刻 $t$ を固定して $X$ の座標方向に**作用する。実座標 $z^i=x^i+iy^i$ では $\partial_i=\tfrac12(\partial_{x^i}-i\partial_{y^i})$ であり、後のトーラスの計算でもこの係数 $1/2$ を用いる。

[前章の二側計量評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)から、固定した $0<c\le C$ により

$$
cg\le h\le Cg
$$

が全点・全解時刻で成立する。また $B_t:=\operatorname{Ric}(g)-i\partial\bar\partial H_t$ のHermite係数を $B_{t,i\bar j}$ と書く。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)を二計量に適用すると

$$
\operatorname{Ric}(h)_{i\bar j}=B_{t,i\bar j}.
$$

$\rho_t\ge \min\{1,\min_Xe^F\}>0$ と $\rho_t\le\max\{1,\max_Xe^F\}$ より、$H_t$ の三階までの背景共変微分、$B_t$ と $\nabla^g B_t$ は $t$ に依存せず有界である。実際、$\partial_i\rho_t=t\partial_i e^F$ と $\partial_i\rho_t^{-1}=-\rho_t^{-2}\partial_i\rho_t$ を繰り返し用い、分母を密度の下界で抑えられる。

## 2. 接続差とCalabi型三階量

[Kähler接続とChern接続の一致](../../KAH/KAH1-03/index.md#thm-kah1-03-main-equivalence)と[接束Chern接続の係数式](../../KAH/KAH1-03/index.md#prop-kah1-03-chern-coefficients)により、Kähler計量の正則接続係数は正則座標で $\Gamma(g)_{ij}^{k}=g^{k\bar q}\partial_i g_{j\bar q}$ と書ける。接続係数自体は座標依存だが、二つの接続を引けば座標に依存しないテンソルが残る。

<a id="def-yau1-10-connection-difference"></a>

<!-- formal-statement-start -->
> **定義（Kähler接続差）**
> 同一複素多様体上の滑らかなKähler計量 $g,h$ に対し、両者の正則方向の接続係数の差

$$
\Psi_{ij}^{k}:=\Gamma(h)_{ij}^{k}-\Gamma(g)_{ij}^{k}
=h^{k\bar q}\nabla^g_i h_{j\bar q}
$$

> を **Kähler接続差** とする。$\Psi$ は $(T^{1,0}X)^*\otimes(T^{1,0}X)^*\otimes T^{1,0}X$ の切断であり、Kähler性により $\Psi_{ij}^k=\Psi_{ji}^k$ である。
<!-- formal-statement-end -->

この等式の右側は、$h^{k\bar q}(\partial_i h_{j\bar q}-\Gamma(g)_{ij}^{p}h_{p\bar q})$ を展開すれば $\Gamma(h)-\Gamma(g)$ そのものになる。テンソル性が分かると、点ごとに便利な座標を選んで計算しても大域的な量を定義できる。

<!-- definition-example-start: def-yau1-10-connection-difference -->
**定義の確認**。複素一次元の座標円板で $g_{1\bar1}=1$、$h_{1\bar1}=1+\varepsilon|z|^2$（$\varepsilon>0$）とする。両者は正値で、一次元の実 $(1,1)$ 形式は自動的に閉じるからKählerである。$g$ の接続は零で、

$$
\Gamma(h)_{11}^1=\frac{\partial_z(1+\varepsilon|z|^2)}{1+\varepsilon|z|^2}
=\frac{\varepsilon\bar z}{1+\varepsilon|z|^2},
\qquad
\Psi_{11}^1=\frac{\varepsilon\bar z}{1+\varepsilon|z|^2}.
$$

他方、$\nabla^g_1h_{1\bar1}=\varepsilon\bar z$、$h^{1\bar1}=(1+\varepsilon|z|^2)^{-1}$ を代入しても同じになる。一次元では二つの下添字の対称性も自動的に成立する。
<!-- definition-example-end -->

次に、この差を解計量 $h$ 自身で測る。$h$ の逆行列で二つの共変添字を縮約し、残る反変添字を $h$ で縮約するので、各項が非負になる。

<a id="def-yau1-10-calabi-energy"></a>

<!-- formal-statement-start -->
> **定義（Calabi型三階量）**
> 滑らかなKähler計量 $g,h$ の接続差 $\Psi$ に対して

$$
\mathcal C:=|\Psi|_h^2
=h^{i\bar a}h^{j\bar b}h_{k\bar c}
\Psi_{ij}^k\overline{\Psi_{ab}^c}\ge0
$$

> と定める。$h=g+\partial\bar\partial\varphi>0$ のとき、$\mathcal C$ をポテンシャル $\varphi$ の **Calabi型三階量** とする。
<!-- formal-statement-end -->

この量が「三階」である理由を確かめよう。点 $p$ で[背景Kähler正規座標](../../KAH/KAH1-08/index.md#thm-kah1-08-normal-existence)を取ると

$$
g(p)=I,\qquad \partial g(p)=0
$$

である。さらに $h(p)$ は正値Hermite行列なので、[相対跡の導入で使った同時対角化](../YAU1-08/index.md#def-yau1-08-relative-traces)と同様、定数unitary座標変換で

$$
h(p)=\operatorname{diag}(\lambda_i),\qquad \lambda_i>0
$$

とできる。この定数変換は背景計量の正規座標条件を保つ。従って $p$ で

$$
\Psi_{ij}^{k}=\frac{\partial_i h_{j\bar k}}{\lambda_k}
=\frac{\partial_i\partial_j\partial_{\bar k}\varphi}{\lambda_k}.
$$

三つの計量因子をこの座標表示に入れると

$$
\begin{aligned}
\mathcal C
&=\sum_{i,j,k}\lambda_i^{-1}\lambda_j^{-1}\lambda_k|\Psi_{ij}^{k}|^2\\
&=\sum_{i,j,k}\frac{|\partial_i h_{j\bar k}|^2}{\lambda_i\lambda_j\lambda_k}.
\end{aligned}
$$

ここで最後の等式は各添字の計量による縮約を実際に代入したものであり、背景計量の一階微分を近傍全体で零と仮定していない。三階微分の一部である $(2,1)$ 型を測り、その共役が $(1,2)$ 型を測る。純粋な $(3,0)$ 型まで抑えたという主張ではない。

<!-- definition-example-start: def-yau1-10-calabi-energy -->
**定義の確認**。前節の一次元の計量では、定義の三つの計量因子が $h^{-1}h^{-1}h$ になる。よって

$$
\mathcal C=h^{-1}|\Psi_{11}^1|^2
=\frac{\varepsilon^2|z|^2}{(1+\varepsilon|z|^2)^3}\ge0.
$$

同じ点で $\nabla^g_1h_{1\bar1}=\varepsilon\bar z$ を三つの $h^{-1}$ で縮約しても同式になる。特に $\varepsilon=0$（$h=g$）なら $\Psi=0$、$\mathcal C=0$ であり、三階量が単なる行列の大きさではなく**接続の変動**を測っていると分かる。
<!-- definition-example-end -->

## 3. 曲率の交換子から三階量のLaplacian下界へ

$\mathcal C$ を最大値原理で抑えるには $L_h\mathcal C$ の下界が必要である。見かけ上は四階・五階微分が出るが、方程式のRicci形式が既知であることと、Kähler曲率の交換子によって低階の入力へ戻せる。

背景曲率を $R^g_{i\bar b j}{}^k$、解計量の曲率を $R^h_{i\bar b j}{}^k$ と書く。[Kähler曲率の局所成分公式](../../KAH/KAH1-09/index.md#prop-kah1-09-local-curvature)の規約は

$$
R^h_{i\bar b j}{}^k=-\partial_{\bar b}\Gamma(h)_{ij}^k
$$

とする。$\widetilde\nabla$ は $h$ の接続、$\nabla^g$ は背景の接続を表す。$\bar\partial$ 方向では正則添字だけのテンソルへの接続項がないため、

$$
\widetilde\nabla_{\bar b}\Psi_{ij}^k
=\partial_{\bar b}\Psi_{ij}^k
=-R^h_{i\bar b j}{}^k+R^g_{i\bar b j}{}^k.
$$

<a id="lem-yau1-10-curvature-difference"></a>

<!-- formal-statement-start -->
> **補題（接続差の曲率恒等式と微分評価）**
> $(X,g)$ を固定コンパクトKähler多様体、$h$ を滑らかなKähler計量とし、$cg\le h\le Cg$、$\operatorname{Ric}(h)=B$ を仮定する。固定背景の $R^g,\nabla^gR^g$ と $B,\nabla^gB$ が一様有界なら、接続差 $\Psi$ について

$$
\widetilde\nabla_{\bar b}\Psi_{ij}^k
=R^g_{i\bar b j}{}^k-R^h_{i\bar b j}{}^k,\qquad
\left|h^{a\bar b}\widetilde\nabla_a
\widetilde\nabla_{\bar b}\Psi\right|_h
\le K_0(1+|\Psi|_h)
$$

> が成り立つ。$K_0$ は上記の一様データのみに依存する。
<!-- formal-statement-end -->

### 証明の見取り図

第一式は曲率の定義そのものである。第二式では $\bar b$ に関する曲率を $a$ で微分し、**Kähler第二Bianchi恒等式**で $a$ を $i$ へ移す。重要なのは $R^h$ の全成分を先に評価しないことだ。$h^{a\bar b}$ で縮約してRicci曲率 $B$ に変えてから、背景の微分と接続差で評価する。

<!-- proof-start -->
### 証明

正則座標での $\Gamma(h)_{ij}^k=h^{k\bar q}\partial_i h_{j\bar q}$ を先ほどの[Kähler曲率の局所成分公式](../../KAH/KAH1-09/index.md#prop-kah1-09-local-curvature)に代入すると、$\partial_{\bar b}(\Gamma(h)-\Gamma(g))=-R^h+R^g$ である。接続差は正則添字だけを持つため、$\widetilde\nabla_{\bar b}\Psi=\partial_{\bar b}\Psi$ となり第一式を得る。

これを $h^{a\bar b}\widetilde\nabla_a$ で縮約する。ここで必要な **Kähler第二Bianchi恒等式** は

$$
\widetilde\nabla_aR^h_{i\bar b j}{}^k
=\widetilde\nabla_iR^h_{a\bar b j}{}^k
$$

である。これは未知の定理を黒箱にせず、その点で[計量 $h$ のKähler正規座標](../../KAH/KAH1-08/index.md#thm-kah1-08-normal-existence)を取れば検証できる。そこで $h=I$、$\partial h=0$、$\Gamma(h)=0$ であるから

$$
\begin{aligned}
\widetilde\nabla_aR^h_{i\bar b j}{}^k
&=-\partial_a\partial_{\bar b}\Gamma(h)_{ij}^k,\\
\widetilde\nabla_iR^h_{a\bar b j}{}^k
&=-\partial_i\partial_{\bar b}\Gamma(h)_{aj}^k,\\
\partial_a\Gamma(h)_{ij}^k
&=\partial_a\partial_i h_{j\bar k}
=\partial_i\partial_a h_{j\bar k}
=\partial_i\Gamma(h)_{aj}^k.
\end{aligned}
$$

最後の行の等式を $\partial_{\bar b}$ でさらに微分する際は、**点 $p$ だけで零となる一次微分を近傍全体で零としてはいけない**。接続行列の行を反変添字 $k$、列を共変添字 $j$ とし、計量の係数行列は転置して使う。[接束の接続係数式](../../KAH/KAH1-03/index.md#prop-kah1-03-chern-coefficients)から

$$
M=(h_{j\bar q})^{\mathsf T},\qquad
\Gamma_i=(\Gamma(h)_{ij}^k)_{k,j}=M^{-1}\partial_iM
$$

となる。$M$ の行は反正則添字、列は正則添字を表す。$\partial_aM^{-1}=-M^{-1}(\partial_aM)M^{-1}$ を積の微分に代入すると

$$
\partial_a\Gamma_i=-\Gamma_a\Gamma_i+M^{-1}\partial_a\partial_iM
$$

となる。$a,i$ を交換した式を引き、混合偏微分の可換性を使えば、近傍全体で

$$
\partial_a\Gamma_i-\partial_i\Gamma_a
=-\Gamma_a\Gamma_i+\Gamma_i\Gamma_a
=-[\Gamma_a,\Gamma_i]
$$

を得る。右辺を $\partial_{\bar b}$ で微分した各項には $\Gamma_a$ または $\Gamma_i$ が一因子残るため、両者が零の点 $p$ では消える。従って $\partial_{\bar b}\partial_a\Gamma_i=\partial_{\bar b}\partial_i\Gamma_a$ が $p$ で成立し、Kähler第二Bianchi恒等式を得る。これと $\widetilde\nabla h^{-1}=0$ から

$$
\begin{aligned}
h^{a\bar b}\widetilde\nabla_a\widetilde\nabla_{\bar b}\Psi_{ij}^k
&=-h^{a\bar b}\widetilde\nabla_i R^h_{a\bar b j}{}^k
+h^{a\bar b}\widetilde\nabla_aR^g_{i\bar b j}{}^k\\
&=-\widetilde\nabla_i B_j{}^k
+h^{a\bar b}\widetilde\nabla_aR^g_{i\bar b j}{}^k,
\qquad B_j{}^k=h^{k\bar q}B_{j\bar q}.
\end{aligned}
$$

第一項で添字を上げるのは $h$ であり、背景 $g$ ではない。$B_{j\bar q}$ は $(1,1)$ 型なので、正則微分では二つの接続の差が共変正則添字 $j$ に作用して

$$
\widetilde\nabla_iB_{j\bar q}
=\nabla^g_iB_{j\bar q}-\Psi_{ij}^p B_{p\bar q}.
$$

したがって

$$
|\widetilde\nabla B|_h
\le K_1\bigl(|\nabla^gB|_g+|B|_g|\Psi|_h\bigr).
$$

背景曲率の項も同じく、$\widetilde\nabla_a R^g$ と $\nabla_a^gR^g$ の差は曲率の**正則添字それぞれ**への $\Psi$ の作用の和である。例えば反変添字 $k$ から $\Psi_{ap}^kR^g_{i\bar b j}{}^p$、共変添字 $i$ から $-\Psi_{ai}^pR^g_{p\bar b j}{}^k$ が生じ、$j$ にも同じ型の項がある。ゆえに

$$
\left|h^{a\bar b}\widetilde\nabla_aR^g_{i\bar b j}{}^k\right|_h
\le K_2\bigl(|\nabla^gR^g|_g+|R^g|_g|\Psi|_h\bigr).
$$

$cg\le h\le Cg$ により固定テンソルの $g$-ノルムと $h$-ノルムは一様に比較できる。両式を先の縮約恒等式へ入れ、固定データの上界を $K_0$ に吸収して結論を得る。$\square$
<!-- proof-end -->

ここではRicci曲率の微分が必要だが、**解計量の全曲率の事前上界は仮定していない**。先に全曲率を抑えようとすると未知の四階微分を仮定してしまい、循環する。

<a id="lem-yau1-10-calabi-laplacian"></a>

<!-- formal-statement-start -->
> **補題（Calabi型三階量のLaplacian下界）**
> 前補題の仮定の下で $\mathcal C=|\Psi|_h^2$ と置くと、正定数 $a,b$ が固定データのみに依存して存在し、

$$
L_h\mathcal C\ge-a\mathcal C-b
$$

> が全点で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

ノルム平方を二回微分すると、$\widetilde\nabla\Psi$ と $\widetilde{\bar\nabla}\Psi$ の非負平方和、$\Psi$ とその二階共変微分の内積、共変微分の交換子が現れる。交換子は縮約後のRicci $B$ で抑え、二階微分は前補題で $O(1+|\Psi|)$ に抑える。最後に一次項を平方項へ吸収する。

<!-- proof-start -->
### 証明

各点で $h$-正規直交枠を選び、ノルムを定める三つの $h$ 因子の共変微分は零とする。$\mathcal C=\langle\Psi,\Psi\rangle_h$ の混合二階微分を積の微分公式で展開し、実部を取ると

$$
\begin{aligned}
L_h\mathcal C
={}&|\widetilde\nabla^{1,0}\Psi|_h^2
+|\widetilde\nabla^{0,1}\Psi|_h^2\\
&+\operatorname{Re}\left\langle
h^{a\bar b}(\widetilde\nabla_a\widetilde\nabla_{\bar b}
+\widetilde\nabla_{\bar b}\widetilde\nabla_a)\Psi,\Psi
\right\rangle_h.
\end{aligned}
$$

交換子に現れる符号を確認する。$T^{1,0}X$ の反変添字 $k$ には曲率が正号、二つの共変添字 $i,j$ には負号で作用するので、規約 $R^h=-\bar\partial\Gamma(h)$ の下で

$$
\begin{aligned}
[\widetilde\nabla_a,\widetilde\nabla_{\bar b}]\Psi_{ij}^k
={}&R^h_{a\bar b p}{}^k\Psi_{ij}^p
-R^h_{a\bar b i}{}^p\Psi_{pj}^k\\
&-R^h_{a\bar b j}{}^p\Psi_{ip}^k.
\end{aligned}
$$

これを $h^{a\bar b}$ で**先に縮約**すると、各曲率因子は $\operatorname{Ric}(h)$ の添字を上げたものになる。$B=\operatorname{Ric}(h)$ の一様上界とCauchy–Schwarzにより、交換子と $\Psi$ の内積の絶対値は $K_3|\Psi|_h^2=K_3\mathcal C$ 以下である。従って、非負平方和を残して

$$
L_h\mathcal C
\ge 2\operatorname{Re}\left\langle
h^{a\bar b}\widetilde\nabla_a\widetilde\nabla_{\bar b}\Psi,
\Psi\right\rangle_h-K_3\mathcal C.
$$

[曲率差の補題](#lem-yau1-10-curvature-difference)をこの二階微分へ入力すると

$$
\begin{aligned}
L_h\mathcal C
&\ge-2K_0(1+\sqrt{\mathcal C})\sqrt{\mathcal C}
-K_3\mathcal C\\
&=-(2K_0+K_3)\mathcal C-2K_0\sqrt{\mathcal C}\\
&\ge-(3K_0+K_3)\mathcal C-K_0.
\end{aligned}
$$

最後は $2\sqrt{\mathcal C}\le1+\mathcal C$ を使った。$a=3K_0+K_3$、$b=K_0$（必要なら正定数へ増やす）とすればよい。$\square$
<!-- proof-end -->

## 4. 相対跡の正項で三階量を吸収する

$L_h\mathcal C\ge-a\mathcal C-b$ だけでは、$\mathcal C$ の最大点で新しい上界が出ない。そこで、すでに**一様に有界**な相対跡 $u=\operatorname{tr}_g h$ を加える。前章では $\log u-A\varphi$ が二階評価の補助関数だったが、今回は $u$ 自体のLaplacianが三階微分の正平方和を持つことを利用する。

<a id="lem-yau1-10-trace-coercivity"></a>

<!-- formal-statement-start -->
> **補題（相対跡の三階量支配）**
> $(X,g)$ を固定コンパクトKähler多様体、$h=g+\partial\bar\partial\varphi>0$ を滑らかなKähler計量とする。$\det h=e^H\det g$、$cg\le h\le Cg$ を仮定し、$\|L_gH\|_\infty$ と背景曲率が固定上界を持つとする。$u=\operatorname{tr}_g h$、$\mathcal C=|\Psi|_h^2$ に対し、固定データのみに依存する $d\ge0$ が存在して

$$
L_hu\ge c\mathcal C-d
$$

> が全点で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[相対跡の局所Laplacian恒等式](../YAU1-08/index.md#thm-yau1-08-trace-laplacian)の非負平方和は、$\mathcal C$ の式から一つだけ逆固有値の因子が抜けたものである。固有値が $c$ 以上であることを使い、正項を $c\mathcal C$ で下から評価する。

<!-- proof-start -->
### 証明

任意の点 $p$ で $g$-Kähler正規座標を取り、$h(p)=\operatorname{diag}(\lambda_i)$ とする。[YAU1-08の恒等式](../YAU1-08/index.md#thm-yau1-08-trace-laplacian)を $H$ へ適用すると

$$
L_hu=L_gH+\mathcal Q
+\sum_{i,k}R^g_{i\bar i k\bar k}
\left(\frac{\lambda_k}{\lambda_i}-1\right),
\qquad
\mathcal Q=\sum_{i,j,k}\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}.
$$

$c\le\lambda_i\le C$、固定背景の曲率上界、$|L_gH|\le E$ より、曲率項と $L_gH$ の和は $-d$ 以上に抑えられる。一方、定義の三階量を添字の名前を入れ替えて書けば

$$
\mathcal C=\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j\lambda_k},
\qquad
\mathcal Q=\sum_{i,j,k}\lambda_k
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j\lambda_k}
\ge c\mathcal C.
$$

従って $L_hu\ge c\mathcal C-d$ である。座標の取り方によらない式なので全点で成立する。$\square$
<!-- proof-end -->

## 5. 最大値原理で三階評価を閉じる

<a id="thm-yau1-10-global-third-order"></a>

<!-- formal-statement-start -->
> **定理（連続性のパス上のCalabi型三階評価）**
> $(X,\omega)$ を複素次元 $n\ge1$ の境界のないコンパクト連結Kähler多様体とし、$F\in C^\infty(X,\mathbb R)$ は $\int_Xe^F\omega^n=\int_X\omega^n$ を満たすとする。$t\in[0,1]$ で滑らかな平均零の解 $\varphi_t$ が存在し、

$$
\omega_{\varphi_t}>0,\qquad
\omega_{\varphi_t}^n=(1-t+te^F)\omega^n
$$

> を満たすとき、$X,\omega,F$ のみに依存し $t$ と解に依存しない $K>0$ が存在して

$$
\mathcal C_t=|\Gamma(g+\partial\bar\partial\varphi_t)-\Gamma(g)|_{g+\partial\bar\partial\varphi_t}^{\,2}\le K
$$

> が全点で成立する。従って $\nabla^g(g+\partial\bar\partial\varphi_t)$ の背景計量で測ったノルムも一様に有界である。
<!-- formal-statement-end -->

### 証明の見取り図

[二階評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)で $c,C$ が一様であり、$H_t$ の固定三階微分が有界なので、前二補題の定数を時刻から独立に選べる。$\mathcal C+A\operatorname{tr}_g h$ の最大点へ $L_h$ を適用し、$A$ を十分大きく取れば $\mathcal C$ の正係数が残る。最大点の上界を、相対跡の既知上界を利用して全点へ運ぶ。

<!-- proof-start -->
### 証明

$h=h_t$ と略記する。[大域二階評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)により $cg\le h\le Cg$ が成り立ち、$u=\operatorname{tr}_g h$ は $0<u\le nC$ である。$H_t=\log(1-t+te^F)$ と $B_t=\operatorname{Ric}(g)-i\partial\bar\partial H_t$ の固定三階微分・背景共変微分は第1節の計算により $t$ に一様である。

[Calabi型三階量のLaplacian下界](#lem-yau1-10-calabi-laplacian)と[相対跡の三階量支配](#lem-yau1-10-trace-coercivity)を適用し、時刻に依存しない $a,b,d\ge0$ を選んで

$$
L_h\mathcal C\ge-a\mathcal C-b,\qquad
L_hu\ge c\mathcal C-d
$$

とできる。$A=(a+1)/c>0$ とし、$P=\mathcal C+Au$ を定める。各点で

$$
\begin{aligned}
L_hP&=L_h\mathcal C+A L_hu\\
&\ge(Ac-a)\mathcal C-(b+Ad)\\
&=\mathcal C-(b+Ad).
\end{aligned}
$$

$X$ はコンパクトなので $P$ は最大点 $p$ を持つ。[最大点での複素Hessianの符号](../YAU1-09/index.md#thm-yau1-09-maximum-inverse-trace)から $L_hP(p)\le0$ であるから

$$
0\ge L_hP(p)\ge\mathcal C(p)-(b+Ad),
\qquad \mathcal C(p)\le b+Ad.
$$

任意の $x\in X$ では $\mathcal C(x)\le P(x)\le P(p)$、$u(p)\le nC$ より

$$
\mathcal C(x)\le b+Ad+AnC=:K.
$$

最後に、$\nabla_i^g h_{j\bar q}=h_{k\bar q}\Psi_{ij}^k$ を使うと、$h$-ノルムで測る三つの共変添字の縮約は $\mathcal C$ に等しい。$cg\le h\le Cg$ なので、各逆計量因子を $g^{-1}\le C h^{-1}$ で置き換えて

$$
|\nabla^g h|_g^2\le C^3|\nabla^g h|_h^2=C^3\mathcal C\le C^3K.
$$

これで固定背景で測った混合三階微分も一様に抑えられる。$\square$
<!-- proof-end -->

この評価は、解が存在するすべてのパス時刻に**共通の定数**を与える。未解決の時刻について解の存在を宣言するものではない。また $\mathcal C$ は混合三階微分の評価であり、$\varphi$ の純粋な実三階微分をすべて直接評価したわけでもない。

## 6. 手計算できる例と、入力が失われる場合

**複素一次元。** 正則座標で二つの係数を $g>0,h>0$ とすると、接続差は

$$
\Psi_{11}^1=\partial_z\log(h/g),\qquad
\mathcal C=\frac{|\partial_z\log(h/g)|^2}{h}.
$$

一次元のMonge–Ampère方程式は $h=\rho_t g$ なので $\Psi_{11}^1=\partial_z H_t$、すなわち

$$
\mathcal C=\frac{|\partial_zH_t|^2}{h}
\le c^{-1}|\partial H_t|_g^2.
$$

ここでは三階量を密度の一階微分から直接評価できる。高次元では行列式が接続差の全成分を決めないため、第3〜5節の微分不等式が必要となる。

**平坦トーラスの検算。** $(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ で $g=I$、$\varphi=\varepsilon\cos(2\pi x_1)$ とし、$a=\pi^2\varepsilon\in(0,1)$ と置くと

$$
h=\operatorname{diag}(1-a\cos(2\pi x_1),1),\quad
\partial_{z_1}h_{1\bar1}=a\pi\sin(2\pi x_1).
$$

零でない接続差は $\Psi_{11}^1=a\pi\sin(2\pi x_1)/(1-a\cos(2\pi x_1))$ だけであり、

$$
\mathcal C=\frac{a^2\pi^2\sin^2(2\pi x_1)}
{(1-a\cos(2\pi x_1))^3}
\le \frac{a^2\pi^2}{(1-a)^3}.
$$

指定密度を $e^F=1-a\cos(2\pi x_1)$ とすれば積分条件も満たし、これは $t=1$ の解の例となる。$a$ が $1$ に近づくと下界 $c=1-a$ が退化し、式の上界が発散する。したがって二階評価での**一様正値下界を抜きにして三階評価を論じることはできない**。

**どの仮定がどこで必要か。**

- $X$ のコンパクト性がなければ、$P=\mathcal C+Au$ の最大点が存在するとは限らない。
- $h\ge cg$ の一様下界が失われると、$\mathcal Q\ge c\mathcal C$ の正項が消え、最大値原理で吸収できない。
- $H_t$ の三階微分の上界が失われると、$\nabla^g B_t$ を固定定数で抑えられず、接続差の曲率補題が閉じない。
- Kähler性を失うと接続の対称性・曲率の第二Bianchi恒等式・[相対跡の局所恒等式](../YAU1-08/index.md#thm-yau1-08-trace-laplacian)に追加のねじれ項が現れ、この証明のままでは成立しない。

## 7. 演習：三階量を作り、正項を使って閉じる

### Level A

#### YAU1-10-A01 一次元の接続差
- Level: A

複素平面上の正則座標 $z$ で $g_{1\bar1}=1$、$h_{1\bar1}=2+|z|^2$ とする。正値Kähler性を確かめ、接続差 $\Psi_{11}^1$ とCalabi型三階量 $\mathcal C$ を求めよ。

<!-- solution-start -->
**詳細解答。** $2+|z|^2>0$、$g=1>0$ であり、複素一次元では任意の実 $(1,1)$ 形式は閉じるので双方はKähler計量である。$\Gamma(g)=0$ であり、[接続差の定義](#def-yau1-10-connection-difference)から

$$
\partial_z h_{1\bar1}=\bar z,\qquad
\Psi_{11}^1=h^{1\bar1}\partial_z h_{1\bar1}
=\frac{\bar z}{2+|z|^2}.
$$

[三階量の定義](#def-yau1-10-calabi-energy)の縮約では $h^{-1}h^{-1}h=h^{-1}$ だから

$$
\mathcal C=\frac1{2+|z|^2}
\left|\frac{\bar z}{2+|z|^2}\right|^2
=\frac{|z|^2}{(2+|z|^2)^3}.
$$

$z=0$ では接続差も三階量も零である。
<!-- solution-end -->

#### YAU1-10-A02 Kähler性と下添字対称性
- Level: A

滑らかな実関数 $\varphi$ に対し、Kähler計量 $h_{i\bar j}=g_{i\bar j}+\partial_i\partial_{\bar j}\varphi$ が正値であるとする。背景接続に関して $\nabla_i^g h_{j\bar k}=\nabla_j^g h_{i\bar k}$ を示し、$\Psi_{ij}^k=\Psi_{ji}^k$ を導け。

<!-- solution-start -->
**詳細解答。** 背景のKähler接続はねじれを持たないので、正則添字に対し $\Gamma(g)_{ij}^p=\Gamma(g)_{ji}^p$。$h$ の微分の差を取ると

$$
\begin{aligned}
\nabla_i^g h_{j\bar k}-\nabla_j^g h_{i\bar k}
&=\partial_i h_{j\bar k}-\partial_j h_{i\bar k}
-(\Gamma(g)_{ij}^p-\Gamma(g)_{ji}^p)h_{p\bar k}\\
&=\partial_i g_{j\bar k}-\partial_j g_{i\bar k}
+\partial_i\partial_j\partial_{\bar k}\varphi
-\partial_j\partial_i\partial_{\bar k}\varphi=0.
\end{aligned}
$$

第二行では[背景のKähler閉性](../../KAH/KAH1-02/index.md#thm-kah1-02-local-closedness)と滑らかな $\varphi$ の偏微分交換を使った。最後の反正則添字を $\bar q$ と書き換えて両辺に $h^{k\bar q}$ を掛け、$\bar q$ について和を取る。[接続差の定義](#def-yau1-10-connection-difference)により $\Psi_{ij}^k=\Psi_{ji}^k$ を得る。
<!-- solution-end -->

#### YAU1-10-A03 三階量と相対跡の正項
- Level: A

一点の背景Kähler正規座標で $h=\operatorname{diag}(2,1)$ とし、$\partial_1h_{1\bar1}=3$ だけが非零の一階微分成分であるとする。[相対跡の正項](../YAU1-08/index.md#thm-yau1-08-trace-laplacian) $\mathcal Q$ と三階量 $\mathcal C$ の値を求め、$\mathcal Q\ge c\mathcal C$ が $c=1$ で成立することを確かめよ。

<!-- solution-start -->
**詳細解答。** 固有値は $(\lambda_1,\lambda_2)=(2,1)$、正値なので $c=1$ を取れる。非零の微分には $i=j=k=1$ が対応する。従って

$$
\mathcal Q=\frac{|3|^2}{2\cdot2}=\frac94,\qquad
\mathcal C=\frac{|3|^2}{2\cdot2\cdot2}=\frac98.
$$

$\mathcal Q=2\mathcal C\ge\mathcal C$。三つ目の逆固有値の因子を補う際、$\mathcal Q$ の各項へ $\lambda_k$ を掛けるのが正しい関係である。
<!-- solution-end -->

#### YAU1-10-A04 Ricci差の微分次数
- Level: A

平坦な複素一次元の座標で $g=1$、指定関数 $H(x)=\cos(2\pi x)$（$z=x+iy$）とする。$\operatorname{Ric}(h)_{1\bar1}=-\partial_z\partial_{\bar z}H=:B_{1\bar1}$ の値と $\partial_zB_{1\bar1}$ を計算せよ。なぜ三階評価に $H$ の三階微分が入力されるか述べよ。

<!-- solution-start -->
**詳細解答。** $H$ は $y$ に依存しないので $\partial_z=\tfrac12\partial_x$、$\partial_z\partial_{\bar z}=\tfrac14\partial_x^2$ を使う。$\partial_x^2H=-4\pi^2\cos(2\pi x)$ だから

$$
B_{1\bar1}=\pi^2\cos(2\pi x),\qquad
\partial_zB_{1\bar1}
=\tfrac12(-2\pi^3\sin(2\pi x))
=-\pi^3\sin(2\pi x).
$$

$B$ 自体は $H$ の二階微分、$\nabla B$ は $H$ の三階微分を含む。[曲率差の補題](#lem-yau1-10-curvature-difference)では $\nabla B$ を一様に抑えるため三階微分の上界が必要となる。
<!-- solution-end -->

#### YAU1-10-A05 最大値原理の数値定数
- Level: A

境界のないコンパクトKähler多様体で非負関数 $\mathcal C$ と $0<u\le6$ が $L_h\mathcal C\ge-4\mathcal C-3$、$L_hu\ge\tfrac12\mathcal C-2$ を満たすとする。$P=\mathcal C+Au$ に $A=10$ を選んで $\sup_X\mathcal C$ の上界を具体的に求めよ。

<!-- solution-start -->
**詳細解答。** 二式から

$$
L_hP\ge(-4+10/2)\mathcal C-(3+10\cdot2)
=\mathcal C-23.
$$

$P$ はコンパクト性によって最大点 $p$ を持つ。$L_hP(p)\le0$ なので $\mathcal C(p)\le23$。任意の点 $x$ では

$$
\mathcal C(x)\le P(x)\le P(p)
=\mathcal C(p)+10u(p)
\le23+10\cdot6=83.
$$

最大点での $\mathcal C(p)$ の上界と全点の上界を区別するのが要点である。
<!-- solution-end -->

### Level B

#### YAU1-10-B01 接続の変更でRicci微分を制御する
- Level: B

同じ複素多様体上のKähler計量 $g,h$ の接続差を $\Psi_{ij}^k$ とする。滑らかな $(1,1)$ テンソル $B_{j\bar q}$ に対し

$$
\widetilde\nabla_i B_{j\bar q}
=\nabla_i^g B_{j\bar q}-\Psi_{ij}^p B_{p\bar q}
$$

を成分で示せ。$cg\le h\le Cg$ と $|B|_g+|\nabla^gB|_g\le M$ があるとき、$|\widetilde\nabla B|_h\le K(1+|\Psi|_h)$ を導け。

<!-- solution-start -->
**詳細解答。** 正則微分では、$(1,1)$ テンソルの反正則添字に接続係数が現れない。従って

$$
\widetilde\nabla_iB_{j\bar q}
=\partial_iB_{j\bar q}-\Gamma(h)_{ij}^{p}B_{p\bar q},
\quad
\nabla_i^gB_{j\bar q}
=\partial_iB_{j\bar q}-\Gamma(g)_{ij}^{p}B_{p\bar q}.
$$

後者を前者から引くと、接続差の定義により $\widetilde\nabla_iB_{j\bar q}-\nabla_i^gB_{j\bar q}=-\Psi_{ij}^pB_{p\bar q}$。$h$-ノルムで三角不等式とテンソルのCauchy–Schwarzを使い

$$
|\widetilde\nabla B|_h
\le|\nabla^gB|_h+|\Psi|_h|B|_h.
$$

計量の二側評価から各テンソル型のノルムは固定倍で比較でき、右辺は $K_1M+K_2M|\Psi|_h$ 以下である。$K=\max\{K_1M,K_2M\}$ とすれば結論を得る。
<!-- solution-end -->

#### YAU1-10-B02 曲率交換子の添字を追う
- Level: B

Kähler計量 $h$ の接続に関し、$(2,1)$ 型の正則テンソル $T_{ij}^k$ を考える。曲率規約を $R^h_{a\bar b p}{}^k=-\partial_{\bar b}\Gamma(h)_{ap}^k$ とする。$[\widetilde\nabla_a,\widetilde\nabla_{\bar b}]T_{ij}^k$ に曲率が三項現れる理由と符号を示し、$h^{a\bar b}$ で縮約した交換子のノルムが $K|\operatorname{Ric}(h)|_h|T|_h$ 以下になることを説明せよ。

<!-- solution-start -->
**詳細解答。** 反変添字 $k$ に作用する接続は $+\Gamma(h)_{ap}^kT_{ij}^p$、共変添字 $i,j$ への作用はそれぞれ $-\Gamma(h)_{ai}^pT_{pj}^k$、$-\Gamma(h)_{aj}^pT_{ip}^k$ である。例えば反変添字の項について、$\widetilde\nabla_a\widetilde\nabla_{\bar b}-\widetilde\nabla_{\bar b}\widetilde\nabla_a$ を展開すると $-\partial_{\bar b}\Gamma(h)_{ap}^kT_{ij}^p=R^h_{a\bar b p}{}^kT_{ij}^p$ が残る。共変添字では符号が反転する。従って

$$
\begin{aligned}
[\widetilde\nabla_a,\widetilde\nabla_{\bar b}]T_{ij}^k
={}&R^h_{a\bar b p}{}^kT_{ij}^p
-R^h_{a\bar b i}{}^pT_{pj}^k
-R^h_{a\bar b j}{}^pT_{ip}^k.
\end{aligned}
$$

Kähler曲率の縮約は $h^{a\bar b}R^h_{a\bar b i}{}^p=\operatorname{Ric}(h)_i{}^p$ であるから、**縮約後**にはRicciを因子に持つ三項だけが残る。各項を $h$-正規直交枠でCauchy–Schwarz評価すれば $3|\operatorname{Ric}(h)|_h|T|_h$ 以下となる。先に全曲率を抑える必要はない。
<!-- solution-end -->

#### YAU1-10-B03 トーラスの三階量を直接計算する
- Level: B

平坦複素二次元トーラスで $g=I$、$\varphi=\varepsilon\cos(2\pi x_1)$、$a=\pi^2\varepsilon\in(0,1)$ とする。$\Psi$ の非零成分、$\mathcal C(x_1)$、$x_1=1/4$ の値を求め、$a\downarrow0$ と $a\uparrow1$ の違いを考察せよ。

<!-- solution-start -->
**詳細解答。** $h_{1\bar1}=1-a\cos(2\pi x_1)$、$h_{2\bar2}=1$、他の成分は零だから正値性には $0<a<1$ が十分である。$z_1=x_1+iy_1$ より $\partial_{z_1}=\tfrac12\partial_{x_1}$ なので

$$
\partial_{z_1}h_{1\bar1}
=a\pi\sin(2\pi x_1),\qquad
\Psi_{11}^1
=\frac{a\pi\sin(2\pi x_1)}{1-a\cos(2\pi x_1)}.
$$

他の $\Psi_{ij}^k$ はすべて零。接続差の三つの添字を $h$ で縮約して

$$
\mathcal C(x_1)=\frac{a^2\pi^2\sin^2(2\pi x_1)}
{(1-a\cos(2\pi x_1))^3},\qquad
\mathcal C(1/4)=a^2\pi^2.
$$

$a\downarrow0$ なら分母は一様に $1$ へ近づき、$\mathcal C\to0$。一方 $a\uparrow1$ で三階量そのものが発散することを確かめる。$x_1(a)=\arccos(a)/(2\pi)$ を選ぶと、$\cos(2\pi x_1(a))=a$、$\sin^2(2\pi x_1(a))=1-a^2$ なので

$$
\mathcal C(x_1(a))
=\frac{a^2\pi^2(1-a^2)}{(1-a^2)^3}
=\frac{a^2\pi^2}{(1-a^2)^2}\longrightarrow\infty.
$$

これは計量の下界 $1-a$ が零へ近づくことと対応する。[三階評価の定理](#thm-yau1-10-global-third-order)では入力 $F=\log(1-a\cos(2\pi x_1))$ も固定するので、$a$ を変えた列に共通の定数を要求していない。各 $a<1$ を固定すれば三階量は有界である。
<!-- solution-end -->

#### YAU1-10-B04 二階評価だけでは三階評価にならない
- Level: B

平坦複素一次元トーラスで、整数 $k\ge1$ と定数 $0<a<1$ に対して

$$
\varphi_k(x)=-\frac{a}{\pi^2k^2}\sin(2\pi kx),\qquad z=x+iy
$$

とする。$h_k=1+\partial_z\partial_{\bar z}\varphi_k$ の一様な正値上下界、$x=0$ での三階量を求めよ。これは固定された右辺 $F$ に対する[本章の定理](#thm-yau1-10-global-third-order)の反例にならない理由も示せ。

<!-- solution-start -->
**詳細解答。** $\partial_z\partial_{\bar z}=\tfrac14\partial_x^2$、$\partial_x^2\sin(2\pi kx)=-4\pi^2k^2\sin(2\pi kx)$ なので

$$
h_k=1+a\sin(2\pi kx),\qquad
1-a\le h_k\le1+a.
$$

密度は $h_k/g=h_k$ であり、平均が $1$ だから体積整合条件を満たす。$\partial_z h_k=a\pi k\cos(2\pi kx)$、$h_k(0)=1$ から

$$
\Psi_{11}^1(0)=a\pi k,\qquad
\mathcal C_k(0)=a^2\pi^2k^2\longrightarrow\infty.
$$

一方、対応する指定関数 $H_k=\log(1+a\sin(2\pi kx))$ は $k$ に応じて変わり、三階微分の一様上界を持たない。定理は**固定された $F$** のパス解に対する一様性を述べるので、この例と矛盾しない。二階の上下界だけから三階量を抑えられないことを示す例である。
<!-- solution-end -->

### Level C

#### YAU1-10-C01 Calabi型三階評価を白紙から閉じる
- Level: C

境界のないコンパクトKähler多様体 $(X,g)$ 上で、滑らかなKähler計量 $h=g+\partial\bar\partial\varphi$ が $cg\le h\le Cg$ と $\det h=e^H\det g$ を満たす。$H$ の背景三階微分までが固定上界を持つとする。$\Psi=\Gamma(h)-\Gamma(g)$、$\mathcal C=|\Psi|_h^2$、$u=\operatorname{tr}_g h$ と定める。以下を一続きで証明せよ。

1. $\operatorname{Ric}(h)=\operatorname{Ric}(g)-i\partial\bar\partial H$ の係数 $B$ とその背景微分が有界である。
2. 曲率交換子を縮約した評価から $L_h\mathcal C\ge-a\mathcal C-b$ を得る理由を示す。
3. [相対跡の局所恒等式](../YAU1-08/index.md#thm-yau1-08-trace-laplacian)から $L_hu\ge c\mathcal C-d$ を導く。
4. $P=\mathcal C+Au$ の係数 $A$ を選び、$\sup_X\mathcal C$ と $|\nabla^gh|_g$ の上界を明示せよ。

<!-- solution-start -->
**詳細解答。** まず[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)を適用し、

$$
B_{i\bar j}=\operatorname{Ric}(g)_{i\bar j}
-\partial_i\partial_{\bar j}H.
$$

背景の $\operatorname{Ric}(g)$ とその微分はコンパクト性で有界、$H$ の三階微分も入力として有界だから $|B|_g+|\nabla^gB|_g\le M$。計量比較により $h$-ノルムでも一様有界である。

次に[曲率差の補題](#lem-yau1-10-curvature-difference)では

$$
\widetilde\nabla_{\bar b}\Psi_{ij}^k=R^g_{i\bar b j}{}^k-R^h_{i\bar b j}{}^k,
$$

$$
h^{a\bar b}\widetilde\nabla_a\widetilde\nabla_{\bar b}\Psi_{ij}^k
=-\widetilde\nabla_i B_j{}^k
+h^{a\bar b}\widetilde\nabla_aR^g_{i\bar b j}{}^k.
$$

$\widetilde\nabla B=\nabla^gB-\Psi*B$、$\widetilde\nabla R^g=\nabla^gR^g+\Psi*R^g$ より二階微分のノルムは $K_0(1+|\Psi|_h)$ 以下。ノルム平方の二回微分では、非負の $|\widetilde\nabla\Psi|_h^2+|\widetilde{\bar\nabla}\Psi|_h^2$ が出る。交換子を $h$ で縮約してRicci $B$ に直せば、それ以外の項は

$$
L_h\mathcal C\ge-2K_0(\sqrt{\mathcal C}+\mathcal C)-K_3\mathcal C
\ge-(3K_0+K_3)\mathcal C-K_0.
$$

従って $a=3K_0+K_3$、$b=K_0$ と選べる。[相対跡の局所恒等式](../YAU1-08/index.md#thm-yau1-08-trace-laplacian)では

$$
L_hu=L_gH+\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j}
+\sum_{i,k}R^g_{i\bar i k\bar k}(\lambda_k/\lambda_i-1).
$$

背景項は $-d$ 以上であり、$\lambda_k\ge c$ だから正項は

$$
\sum_{i,j,k}\lambda_k
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j\lambda_k}
\ge c\mathcal C.
$$

ゆえに $L_hu\ge c\mathcal C-d$。$A=(a+1)/c$ として

$$
L_hP\ge(Ac-a)\mathcal C-(b+Ad)
=\mathcal C-(b+Ad).
$$

最大点 $p$ で $L_hP(p)\le0$ より $\mathcal C(p)\le b+Ad$。任意の $x$ で $0<u(x)\le nC$、$P(x)\le P(p)$ なので

$$
\mathcal C(x)\le b+Ad+AnC=:K,\qquad
|\nabla^g h|_g^2\le C^3\mathcal C\le C^3K.
$$

ここで $a,b,d,c,C$ は指定された固定データのみで選べる。最大点の $\mathcal C(p)$ と全点の $\mathcal C(x)$ の定数を混同していない。
<!-- solution-end -->

#### YAU1-10-C02 仮定の失敗と代替正則性経路
- Level: C

複素Monge–Ampère方程式のパス上の滑らかな解を考える。$h=g+\partial\bar\partial\varphi>0$ とし、二階評価の $cg\le h\le Cg$ を既知とする。次を論じよ。

1. $H=\log(\det h/\det g)$ について $C^2$ 上界しか与えない場合、本章の証明のどこで停止するか。
2. 相対跡恒等式の三階正項 $\mathcal Q$ から $\mathcal C$ を抑える際に $c>0$ が必要な理由を固有値で示せ。
3. 古典的三階評価とEvans–Krylov型の $C^{2,\alpha}$ 経路は、何を直接制御するかという点でどう違うか。いずれも二階の値の上界だけで済むと主張してよいか。

<!-- solution-start -->
**詳細解答。** $B=\operatorname{Ric}(g)-i\partial\bar\partial H$ と置くと、$C^2$ の上界で $B$ 自身は抑えられる。しかし[曲率差の補題](#lem-yau1-10-curvature-difference)の

$$
h^{a\bar b}\widetilde\nabla_a\widetilde\nabla_{\bar b}\Psi_{ij}^k
=-\widetilde\nabla_iB_j{}^k
+h^{a\bar b}\widetilde\nabla_aR^g_{i\bar b j}{}^k
$$

は $\nabla B$ を含み、$\nabla^g\partial\bar\partial H$ という三階微分を抑えられない。従って $L_h\mathcal C\ge-a\mathcal C-b$ の固定定数をこの証明からは確保できない。

次に背景正規座標で $h=\operatorname{diag}(\lambda_i)$ とすると

$$
\mathcal Q=\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j},\qquad
\mathcal C=\sum_{i,j,k}
\frac{|\partial_kh_{i\bar j}|^2}{\lambda_i\lambda_j\lambda_k}.
$$

各 $\lambda_k\ge c$ のときだけ、項ごとに $\lambda_k/\lambda_k\ge c/\lambda_k$ として $\mathcal Q\ge c\mathcal C$ を得られる。例えば一方向の $\lambda_k\downarrow0$ では、同じ分子に対して $\mathcal C$ の項が $\mathcal Q$ の項より $1/\lambda_k$ 倍大きくなるため、固定正定数で比較できない。

古典的経路は $|\nabla^g h|_h^2$、すなわち混合三階微分の平方を直接抑え、次章で係数 $h^{-1}$ のHölder制御へつなぐ。一方、Evans–Krylov型の経路は凹な完全非線形方程式の内部評価から、混合二階微分のHölder連続性を直接得てSchauder法へ進む（その適用条件・幾何的局所化は別途要る）。後者の経路も二階評価だけを無条件に代入できるわけではない。両者を同一の評価とみなしてはならない。
<!-- solution-end -->

## 8. 次章への橋

本章で $\Psi=\Gamma(h)-\Gamma(g)$ が一様に有界になり、[二階評価](../YAU1-09/index.md#thm-yau1-09-global-second-order)と合わせて $h$ の背景共変一階微分を制御できた。次章YAU1-11では、この情報から解計量と線形化係数のHölder制御を得て、Schauder評価を反復するための仮定を揃える。古典的三階評価の代わりにEvans–Krylov型の $C^{2,\alpha}$ 評価を使う道もあるが、本系列では前者を主経路とする。

### 参考文献

- V. V. Datar, [*Lecture Notes on Calabi's Conjectures and Kähler–Einstein Metrics*](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf), §4.2・Appendix A（接続差のBochner計算）。
- Z. Błocki, [*The Complex Monge–Ampère Equation on Compact Kähler Manifolds*](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf), §5（Evans–Krylov型経路との比較）。
- T. Collins, [*Geometry of the Complex Monge–Ampère Equation*](https://people.math.harvard.edu/~tcollins/Math262.html), Yauの定理と $C^2/C^3$ 評価の講義案内。
