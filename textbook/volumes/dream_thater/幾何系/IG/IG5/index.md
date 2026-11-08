# IG5 Legendre 双対と Hessian 構造

<!-- definition-example-audit: strict -->

[IG4 の Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)によって、指数型分布族の自然母数 $\theta$ では Fisher 計量が対数分配関数 $\psi$ の二階微分になると分かりました。しかし $\theta$ は「指数の係数」であり、分布の平均を直接表示してはいません。たとえば Bernoulli 族の自然母数は対数オッズですが、観測値 $X$ の期待値は成功確率そのものです。両者を一対一に行き来できるなら、同じ分布を二つの視点から計算できます。

本講では自然母数 $\theta$ に対し期待値母数 $\eta=E_\theta F$ を作り、その逆変換を Legendre 双対で記述します。目標は、$\theta$ 側の計量 $\nabla^2\psi$ と $\eta$ 側の計量 $\nabla^2\varphi$ が互いに逆行列になることを、仮定を落とさずに証明することです。ここでの「アファイン」は座標どうしの関係を指し、曲線のまっすぐさを記述する接続の理論は後の講義で導入します。

## 1. 指数の係数から統計量の平均へ

[IG4 の局所自然座標](../IG4/index.md#def-ig4-natural-chart)を持つ $d$ 次元の正則指数型分布族を考えます。自然母数の領域 $\Theta\subset\mathbb R^d$ は非空の開凸集合で、固定された正の台上に

$$
p_\theta(x)=h(x)\exp\{\theta\cdot F(x)-\psi(\theta)\},
\qquad \psi(\theta)=\log\int h(x)e^{\theta\cdot F(x)}\,d\mu(x)
$$

と書けるものです。$F=(F_1,\ldots,F_d)$ は十分統計量としても働き、$\theta^i$ は $F_i$ の係数です。たとえば Bernoulli では $F(X)=X$、$\theta=a$、$\psi(a)=\log(1+e^a)$ でした。

平均 $E_\theta F_i$ を集める理由は、[Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)の導出で $E_\theta F_i=\partial_i\psi$ が示されているためです。この式は期待値座標を作るための具体的な計算法でもあります。

<a id="def-ig5-expectation-coordinate"></a>

<!-- formal-statement-start -->
> **定義（期待値母数と期待値座標）**
> 非空の開自然母数領域 $\Theta\subset\mathbb R^d$ における固定台の正則指数型分布族 $p_\theta=h\exp(\theta\cdot F-\psi(\theta))$ に対し、**期待値母数**を

$$
\eta_i(\theta)=E_\theta[F_i(X)]=\frac{\partial\psi}{\partial\theta^i}(\theta),
\qquad i=1,\ldots,d
$$

> と定める。写像 $\theta\mapsto\eta(\theta)$ がある開領域で滑らかな逆写像を持つとき、その領域上の $\eta=(\eta_1,\ldots,\eta_d)$ を**期待値座標**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig5-expectation-coordinate -->
**定義の確認**（Bernoulli）。$\psi'(a)=e^a/(1+e^a)=p$ なので $\eta=E_a X=p$ です。また $d\eta/da=p(1-p)>0$ であり、任意の $p\in(0,1)$ から $a=\log\{p/(1-p)\}$ と一意に戻せます。したがって $a\in\mathbb R$ 上の期待値母数は開区間 $(0,1)$ の期待値座標です。ここでは単に平均を計算しただけでなく、定義が要求する逆写像とその滑らかさも確かめました。
<!-- definition-example-end -->

一般には $E_\theta F$ を計算できても、$\theta$ が復元できるとは限りません。対応の微分行列（第 $i$ 行・第 $j$ 列が $\partial\eta_i/\partial\theta^j$）は

$$
\frac{\partial\eta_i}{\partial\theta^j}=\partial_{ij}\psi(\theta)=g_{ij}(\theta).
$$

従って Fisher 行列 $G=(g_{ij})$ の可逆性が、期待値母数を座標にできるかを判定する鍵になります。これは [IG4 の最小性命題](../IG4/index.md#prop-ig4-minimality)によって、統計量 $F$ の非冗長性と結び付きます。

## 2. 厳密凸性から逆座標を作る

ここで必要な論理は二段階です。逆関数定理は各点の**近く**で逆座標を作ります。一方で、領域全体で一対一と結論するには、$\Theta$ が凸で $\psi$ の Hessian が正定値であることを使います。行列の正定値性は二次形式 $v^{\mathsf T}Gv>0$（$v\ne0$）で確かめます。

<a id="thm-ig5-mean-diffeomorphism"></a>

<!-- formal-statement-start -->
> **定理（自然座標と期待値座標の可逆対応）**
> $\Theta\subset\mathbb R^d$ を非空の開凸集合とし、$\psi\in C^3(\Theta)$ の Hessian $G(\theta)=\nabla^2\psi(\theta)$ がすべての $\theta\in\Theta$ で正定値とする。このとき $\psi$ は厳密凸で、$\eta=\nabla\psi$ は $\Theta$ から開集合 $H=\nabla\psi(\Theta)$ への一対一の $C^2$ 級の座標対応を与え、逆写像も $C^2$ 級である。さらに

$$
\frac{\partial\eta}{\partial\theta}=G(\theta),
\qquad
\frac{\partial\theta}{\partial\eta}=G(\theta(\eta))^{-1}.
$$

> 特に [IG4 の最小な正則指数型分布族](../IG4/index.md#prop-ig4-minimality)ではこれらの仮定が満たされる。
<!-- formal-statement-end -->

**証明の見取り図**：局所的には $\det G>0$ に逆関数定理を適用します。大域的には二点 $\theta,\xi$ を結ぶ線分上で $G$ の正定値性を積分し、$\nabla\psi(\theta)=\nabla\psi(\xi)$ なら $\theta=\xi$ を示します。

<!-- proof-start -->
### 証明

$\theta\ne\xi$ とし、$v=\theta-\xi\ne0$ と置きます。$\Theta$ は凸なので線分 $\gamma(t)=\xi+tv$（$0\le t\le1$）が $\Theta$ に含まれます。$q(t)=\psi(\gamma(t))$ とすると連鎖律により

$$
q'(t)=\nabla\psi(\gamma(t))\cdot v,
\qquad q''(t)=v^{\mathsf T}G(\gamma(t))v>0.
$$

任意の異なる二点を結ぶ線分で二階微分が正だから、$\psi$ は厳密凸です。また微積分の基本定理を各成分に用いて

$$
\begin{aligned}
v\cdot\{\nabla\psi(\theta)-\nabla\psi(\xi)\}
&=q'(1)-q'(0)\\
&=\int_0^1v^{\mathsf T}G(\gamma(t))v\,dt>0.
\end{aligned}
$$

従って $\nabla\psi(\theta)=\nabla\psi(\xi)$ は不可能で、$\nabla\psi$ は単射です。さらに $\psi\in C^3$ なので $\nabla\psi$ は $C^2$ 級、Jacobian は $G$ です。正定値行列の行列式は非零ですから、各 $\theta$ で逆関数定理を適用でき、像の各点に開近傍と $C^2$ 級の局所逆写像があります。単射性によりそれらの局所逆は重なり上で一致し、像 $H$ は開集合、逆写像 $\theta:H\to\Theta$ は $C^2$ 級です。恒等式 $\eta(\theta(\eta))=\eta$ を微分すると $G(\theta(\eta))\,(\partial\theta/\partial\eta)=I_d$ なので、逆 Jacobian は $G^{-1}$ です。

最小な正則指数型分布族では、[Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)が成り立ちます。さらに[最小性・識別可能性と正定値 Fisher 行列](../IG4/index.md#prop-ig4-minimality)から各点で $G>0$ です。対数分配関数は開自然母数領域内で必要な階数だけ滑らかで、領域も凸なので上の議論が適用できます。
<!-- proof-end -->

**射程の注意**：$H$ は逆関数定理によって開集合ですが、ここで $H=\mathbb R^d$ とも、任意の指定した平均ベクトルが実現すると主張しているわけでもありません。最小正則族の**実際の平均の像**を $H$ と書くのが安全です。

## 3. Legendre 双対ポテンシャル

期待値座標 $\eta$ では自然母数を $\theta(\eta)$ として復元できるようになりました。ここで $\theta\cdot\eta-\psi(\theta)$ を考えます。$\psi$ のグラフに $\theta$ で引いた接超平面の切片に対応する量で、$\eta$ を固定した最適化からも得られます。ここではこの式がなぜ最大値になるかまで確認します。

<a id="def-ig5-legendre-dual"></a>

<!-- formal-statement-start -->
> **定義（Legendre 双対ポテンシャル）**
> 非空の開凸集合 $\Theta\subset\mathbb R^d$ 上の $C^3$ 級関数 $\psi$ の Hessian が各点で正定値とし、$H=\nabla\psi(\Theta)$、$\theta:H\to\Theta$ をその逆写像とする。$\eta\in H$ に対する **Legendre 双対ポテンシャル**を

$$
\varphi(\eta)=\theta(\eta)\cdot\eta-\psi(\theta(\eta))
$$

> と定める。これはこの範囲での凸共役の値 $\sup_{\xi\in\Theta}\{\xi\cdot\eta-\psi(\xi)\}$ と一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig5-legendre-dual -->
**定義の確認**（Bernoulli）。$\eta=p\in(0,1)$ とすると $a=\log\{p/(1-p)\}$、$\psi(a)=-\log(1-p)$ です。したがって

$$
\begin{aligned}
\varphi(p)&=pa-\psi(a)\\
&=p\log\frac{p}{1-p}+\log(1-p)\\
&=p\log p+(1-p)\log(1-p).
\end{aligned}
$$

この値は Bernoulli の Shannon エントロピーの**負**です。実際 $\varphi'(p)=\log\{p/(1-p)\}=a$、$\varphi''(p)=1/[p(1-p)]>0$ なので、逆座標と凸性の両方を具体的に確かめられます。$p=0,1$ はこの定義の開領域には含めません。
<!-- definition-example-end -->

<a id="thm-ig5-legendre-hessian"></a>

<!-- formal-statement-start -->
> **定理（Legendre 双対と逆 Hessian）**
> $\Theta,\psi,H,\theta(\eta),\varphi$ は[可逆対応の定理](#thm-ig5-mean-diffeomorphism)と[双対ポテンシャルの定義](#def-ig5-legendre-dual)の仮定を満たすとする。各 $\eta\in H$ で次が成り立つ。

$$
\begin{gathered}
\varphi(\eta)=\sup_{\xi\in\Theta}\{\xi\cdot\eta-\psi(\xi)\},
\qquad \eta=\nabla\psi(\theta),\\
\nabla\varphi(\eta)=\theta(\eta),
\qquad \nabla^2\varphi(\eta)=\{\nabla^2\psi(\theta(\eta))\}^{-1}.
\end{gathered}
$$

> 特に $\varphi$ は $H$ の各点の近傍で厳密凸であり、$\psi(\theta)+\varphi(\eta)=\theta\cdot\eta$ は $\eta=\nabla\psi(\theta)$ のとき成立する。
<!-- formal-statement-end -->

**証明の見取り図**：凸性から $\psi(\xi)$ は $\theta$ での接平面より上にあります。$\eta=\nabla\psi(\theta)$ を固定すると、その不等式を並べ替えたものが最大値の主張です。双対式の微分では $\partial\theta/\partial\eta$ の項が打ち消し合い、もう一度微分すると逆 Jacobian が現れます。

<!-- proof-start -->
### 証明

$\eta\in H$ を固定し、$\theta=\theta(\eta)$ とします。任意の $\xi\in\Theta$ に対し $v=\xi-\theta$、$r(t)=\psi(\theta+tv)$ と置きます。凸性と線分の存在から $r'(t)$ は非減少であり、

$$
\psi(\xi)-\psi(\theta)
=\int_0^1r'(t)\,dt
\ge r'(0)=\nabla\psi(\theta)\cdot(\xi-\theta).
$$

$\eta=\nabla\psi(\theta)$ を代入して移項すると

$$
\xi\cdot\eta-\psi(\xi)
\le\theta\cdot\eta-\psi(\theta)=\varphi(\eta).
$$

$\xi=\theta$ で等号が成立するので上限は達成されます。$\xi\ne\theta$ なら線分方向の二階微分が正で接平面不等式は厳密になり、最大点は一意です。

次に $\varphi(\eta)=\sum_i\theta^i(\eta)\eta_i-\psi(\theta(\eta))$ を $\eta_j$ で微分します。連鎖律と $\partial_i\psi(\theta)=\eta_i$ により

$$
\begin{aligned}
\frac{\partial\varphi}{\partial\eta_j}
&=\theta^j+\sum_i\eta_i\frac{\partial\theta^i}{\partial\eta_j}
-\sum_i\frac{\partial\psi}{\partial\theta^i}
\frac{\partial\theta^i}{\partial\eta_j}\\
&=\theta^j.
\end{aligned}
$$

さらに微分すると $\partial^2\varphi/\partial\eta_i\partial\eta_j=\partial\theta^j/\partial\eta_i$ です。[可逆対応の定理](#thm-ig5-mean-diffeomorphism)で導いた逆 Jacobian を代入すれば、対称な正定値行列 $G^{-1}$ に等しくなります。従って $\varphi$ は各点の近傍で厳密凸です。最後の双対等式は定義式を移項したものです。
<!-- proof-end -->

ここで $\varphi$ の Hessian を $G^{-1}$ と書くのは、**$\eta$ 座標での成分**についてです。$\theta$ 座標の行列と $\eta$ 座標の行列を同じ基底のものとして足し引きすることはしません。

## 4. Fisher 計量は両座標でどう見えるか

自然座標の接速度 $d\theta$ に対し、同じ分布族の変化を期待値座標で表すと $d\eta=G\,d\theta$ です。この等式は小変化を比較した Jacobian の式であり、$\eta$ の成分が $\theta$ と同じ数であるという意味ではありません。

<a id="thm-ig5-dual-metric"></a>

<!-- formal-statement-start -->
> **定理（二つの座標における Fisher 計量）**
> $\Theta\subset\mathbb R^d$ を開凸集合とし、固定台の最小正則指数型分布族の対数分配関数を $\psi$、自然座標を $\theta$、期待値座標を $\eta=\nabla\psi(\theta)$ とする。このとき Fisher 計量の自然座標成分 $G_\theta$ と期待値座標成分 $G_\eta$ は

$$
G_\theta(\theta)=\nabla_\theta^2\psi(\theta),
\qquad
G_\eta(\eta)=\nabla_\eta^2\varphi(\eta)=G_\theta(\theta(\eta))^{-1}
$$

> を満たす。従って同じ接ベクトルの長さは

$$
ds^2=d\theta^{\mathsf T}G_\theta\,d\theta
=d\eta^{\mathsf T}G_\eta\,d\eta
$$

> と二通りに表せる。
<!-- formal-statement-end -->

**証明の見取り図**：[IG2 のテンソル変換則](../IG2/index.md#thm-ig2-coordinate-invariance)に、期待値座標から自然座標へ戻す Jacobian $\partial\theta/\partial\eta=G_\theta^{-1}$ を代入します。$G_\eta$ が逆行列になるのは、自然座標と期待値座標が互いに非線形でも可逆だからです。

<!-- proof-start -->
### 証明

[IG4 の Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)から $G_\theta=\nabla^2\psi$ です。最小性によって $G_\theta$ は正定値であり、[可逆対応の定理](#thm-ig5-mean-diffeomorphism)から $J=\partial\theta/\partial\eta=G_\theta^{-1}$ が定義できます。

[IG2 の計量変換則](../IG2/index.md#thm-ig2-coordinate-invariance)をこの $J$ に適用します。$G_\theta$ は対称なので $J^{\mathsf T}=J$ であり、

$$
G_\eta=J^{\mathsf T}G_\theta J
=G_\theta^{-1}G_\theta G_\theta^{-1}=G_\theta^{-1}.
$$

[Legendre 双対と逆 Hessian の定理](#thm-ig5-legendre-hessian)から右辺は $\nabla^2\varphi$ と一致します。また $d\theta=J\,d\eta$ を $ds^2=d\theta^{\mathsf T}G_\theta d\theta$ に代入すれば表示された長さの等式になります。
<!-- proof-end -->

### 三値カテゴリカル族で二種類の行列を照合する

[IG4 の三値全指数型分布族](../IG4/index.md#thm-ig4-fisher-hessian)を $a,b\in\mathbb R$、$Z=1+e^a+e^b$ で表すと

$$
p=(p_1,p_2,p_3)=\left(\frac{e^a}{Z},\frac{e^b}{Z},\frac1Z\right),
\quad \psi(a,b)=\log Z.
$$

このモデルの期待値母数は、指示関数 $F_1=\mathbf1_{\{X=1\}}$、$F_2=\mathbf1_{\{X=2\}}$ の平均なので $\eta_1=p_1$、$\eta_2=p_2$ です。従って $H=\{(\eta_1,\eta_2):\eta_1>0,\eta_2>0,\eta_1+\eta_2<1\}$ で、$p_3=1-\eta_1-\eta_2>0$ を使って

$$
a=\log\frac{\eta_1}{p_3},\qquad
b=\log\frac{\eta_2}{p_3}
$$

と戻せます。これは[IG4 の混合座標](../IG4/index.md#def-ig4-mixture-coordinate)とも数値が一致します。ただしここでは、全指数型族の期待値から導いた座標であることが重要です。$\psi=\log(1/p_3)=-\log p_3$ と $a\eta_1+b\eta_2-\psi$ を代入すると

$$
\varphi(\eta)=\eta_1\log\eta_1+\eta_2\log\eta_2+p_3\log p_3.
$$

期待値方向で微分すると $\partial_i p_3=-1$ なので

$$
\nabla_\eta\varphi=
\begin{pmatrix}\log(\eta_1/p_3)\\\log(\eta_2/p_3)\end{pmatrix},
\qquad
\nabla_\eta^2\varphi=
\begin{pmatrix}1/p_1+1/p_3&1/p_3\\1/p_3&1/p_2+1/p_3\end{pmatrix}.
$$

一方、自然座標での Fisher 行列は $G_\theta=\left(\begin{smallmatrix}p_1(1-p_1)&-p_1p_2\\-p_1p_2&p_2(1-p_2)\end{smallmatrix}\right)$、その行列式は $p_1p_2p_3>0$ です。$2\times2$ 逆行列の公式に $1-p_1=p_2+p_3$、$1-p_2=p_1+p_3$ を代入すると上の $\nabla^2\varphi$ が得られます。

この例では $\varphi=\sum_{i=1}^3p_i\log p_i$ が負エントロピーであることも分かりました。有限正単体上の期待値座標は混合座標であり、計量は期待値側では逆 Hessian になります。

## 5. 「Hessian 構造」はどの座標でも成り立つか

計量は座標を替えても同じ幾何を表しますが、関数の普通の二階微分は一般には計量のような変換をしません。自然座標 $\theta$ で $g_{ij}=\partial_{ij}\psi$ と書ける事実には、**その座標の特別な選び方**が含まれています。

<a id="def-ig5-hessian-chart"></a>

<!-- formal-statement-start -->
> **定義（Hessian 表示とアファイン座標）**
> 開集合 $U\subset\mathbb R^d$ 上の座標 $x=(x^1,\ldots,x^d)$ で表した正定値対称計量 $g$ に対し、$C^2$ 級の関数 $\Phi:U\to\mathbb R$ が存在して

$$
g_{ij}(x)=\frac{\partial^2\Phi}{\partial x^i\partial x^j}
$$

> が成立するとき、$(x,\Phi)$ をこの計量の**Hessian 表示**と呼ぶ。座標 $x$ と $y$ が定数可逆行列 $A$ と定数ベクトル $b$ により

$$
y=Ax+b
$$

> で関係するとき、両座標を互いに**アファインな座標**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig5-hessian-chart -->
**定義の確認**（一次元の定数計量）。$U=\mathbb R$、$g_{xx}=2$、$\Phi(x)=x^2$ なら $\Phi''(x)=2=g_{xx}>0$ なので Hessian 表示です。$y=3x+1$ への変更は $A=3\ne0$ のアファイン変換です。$x=(y-1)/3$ と置くと $\widetilde\Phi(y)=((y-1)/3)^2$ で、$\partial_y^2\widetilde\Phi=2/9$。これは計量変換 $g_{yy}=(\partial x/\partial y)^2g_{xx}=2/9$ と一致します。$b$ は微分で消えるものの、座標の対応には必要です。
<!-- definition-example-end -->

<a id="prop-ig5-affine-hessian"></a>

<!-- formal-statement-start -->
> **命題（Hessian 表示のアファイン変換と非線形変換）**
> 開集合 $U\subset\mathbb R^d$ 上の $C^2$ 級ポテンシャル $\Phi$ に対し $g=\nabla_x^2\Phi$ とする。定数可逆行列 $A$ と定数ベクトル $b$ による座標変更

$$
y=Ax+b,\qquad\widetilde\Phi(y)=\Phi(A^{-1}(y-b))
$$

> では $\widetilde\Phi$ が $g$ の Hessian 表示を与える。一方、一般の非線形な $C^2$ 級座標変更 $x=x(y)$ では、$\nabla_y^2(\Phi\circ x)$ が計量の $y$ 座標成分と一致するとは限らない。
<!-- formal-statement-end -->

**証明の見取り図**：連鎖律の二階微分には、計量に必要な Jacobian を二つ掛けた項に加え、座標写像の二階微分を含む項が出ます。アファイン変換では後者が零になります。

<!-- proof-start -->
### 証明

一般の $x=x(y)$ について、まず $\partial_a(\Phi\circ x)=\sum_i(\partial_i\Phi)(\partial_a x^i)$ です。さらに $y^b$ で微分すると

$$
\frac{\partial^2(\Phi\circ x)}{\partial y^a\partial y^b}
=\sum_{i,j}\frac{\partial^2\Phi}{\partial x^i\partial x^j}
\frac{\partial x^i}{\partial y^a}\frac{\partial x^j}{\partial y^b}
+\sum_i\frac{\partial\Phi}{\partial x^i}
\frac{\partial^2x^i}{\partial y^a\partial y^b}.
$$

第一項は[IG2 の計量変換則](../IG2/index.md#thm-ig2-coordinate-invariance)による $g_{ab}(y)$ です。$x=A^{-1}(y-b)$ ならすべての $\partial^2x^i/\partial y^a\partial y^b=0$ なので、第二項は消えます。一方、一次元で $x=e^y$、$\Phi(x)=x^2/2$（$x>0$）を取ると、計量の成分は $(dx/dy)^2=e^{2y}$ ですが、合成関数 $\Phi(e^y)=e^{2y}/2$ の二階微分は $2e^{2y}$ です。二つは一致せず、非線形変換には一般の保証がありません。
<!-- proof-end -->

指数型分布族の自然母数座標 $\theta$ と、その正則な逆座標 $\eta$ にはそれぞれ $\psi$ と $\varphi$ という Hessian 表示があることを示しました。しかし **$\eta=\nabla\psi(\theta)$ が一般にアファイン変換だからではありません**。それぞれのポテンシャルが別々に計量を表すという Legendre 双対の特別な事実です。どのアファイン接続に関してこの二つを平坦座標と呼べるかは、接続を定義した後で判定します。

### どの仮定が破れるか：冗長性と境界

**冗長な指数表示**。Bernoulli の統計量を $F=(X,2X)$、自然母数を $(a,b)\in\mathbb R^2$ とすると $\psi(a,b)=\log(1+e^{a+2b})$ です。$q=e^{a+2b}/(1+e^{a+2b})$ と置けば

$$
\eta=(q,2q),\qquad
G=q(1-q)\begin{pmatrix}1&2\\2&4\end{pmatrix},\qquad G(2,-1)^{\mathsf T}=0.
$$

$G$ は逆行列を持たず、$\eta$ の像は平面内の一次元曲線（実際は線分）です。失われたのは [IG4 の最小性](../IG4/index.md#def-ig4-exponential-minimality)であり、可逆対応の証明で逆関数定理に必要な $\det G\ne0$ が破れました。$a+2b$ を新しい一変数の自然母数に取り直せば、最小な Bernoulli 族に戻せます。

**確率単体の境界**。最小な Bernoulli では $a\to-\infty$ で $p\to0$、$a\to+\infty$ で $p\to1$ です。開領域 $H=(0,1)$ に $p=0,1$ は含まれません。$\varphi(p)$ の値は $0\log0=0$ という連続延長で両端とも0にできますが、$\varphi'(p)=\log\{p/(1-p)\}$ は発散し、$\varphi''(p)=1/[p(1-p)]$ も発散します。境界では滑らかな逆座標を作った定理の**開集合上の可逆性**という仮定が失われます。値の連続延長と滑らかな座標の延長を混同してはいけません。

---

## 6. 演習：期待値・双対・計量を自分で結ぶ

### IG5-A01 Bernoulli の双対ポテンシャル

$\psi(a)=\log(1+e^a)$、$a\in\mathbb R$ とする。$\eta=\psi'(a)$ とその逆写像を求め、$\varphi(\eta)=a\eta-\psi(a)$、$\varphi'(\eta)$、$\varphi''(\eta)$ を計算せよ。$\psi''(a)\varphi''(\eta)=1$ を確認せよ。

- Level: A
- 狙い: 双対の定義と逆 Hessian を一次元で一度通す

<!-- solution-start -->
**詳細解答**

$\eta=e^a/(1+e^a)$ なので $0<\eta<1$ です。$\eta(1+e^a)=e^a$ を解くと $e^a=\eta/(1-\eta)$、$a=\log\{\eta/(1-\eta)\}$。$\psi(a)=\log(1/(1-\eta))=-\log(1-\eta)$ だから

$$
\varphi(\eta)=\eta\log\eta+(1-\eta)\log(1-\eta).
$$

微分すると $\varphi'=\log\eta+1-\log(1-\eta)-1=a$、$\varphi''=1/\eta+1/(1-\eta)=1/[\eta(1-\eta)]$。一方 $\psi''(a)=\eta(1-\eta)$ は[IG4 の Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)からも確認できるので積は1です。
<!-- solution-end -->

### IG5-A02 Poisson の期待値座標

$\psi(a)=e^a$（$a\in\mathbb R$）の Poisson 族について、期待値母数の像、逆写像、双対ポテンシャル、両座標の Fisher 計量を求めよ。

- Level: A
- 狙い: Bernoulli と異なる期待値領域を確認する

<!-- solution-start -->
**詳細解答**

$\eta=\psi'(a)=e^a$ なので像は $H=(0,\infty)$、逆写像は $a=\log\eta$ です。従って $\varphi(\eta)=\eta\log\eta-\eta$。一階微分は $\varphi'=\log\eta+1-1=\log\eta=a$、二階微分は $\varphi''=1/\eta$ です。自然座標の計量は $g_{aa}=\psi''(a)=e^a=\eta$、期待値座標では $g_{\eta\eta}=1/\eta$。実際 $da/d\eta=1/\eta$ なので[計量変換則](../IG2/index.md#thm-ig2-coordinate-invariance)により $(da/d\eta)^2g_{aa}=(1/\eta)^2\eta=1/\eta$ となります。
<!-- solution-end -->

### IG5-A03 三値分布の逆 Jacobian

$p=(1/3,1/3,1/3)$ となる三値全指数型分布族について、$G_\theta$ と $G_\eta$ を求め、積が単位行列となることを示せ。

- Level: A
- 狙い: 二次元の逆行列を直接照合する

<!-- solution-start -->
**詳細解答**

本文の $G_\theta$ に $p_i=1/3$ を代入すると

$$
G_\theta=\frac19\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

行列式は $(4-1)/81=1/27$ なので、逆行列の公式から

$$
G_\theta^{-1}=\frac{1}{1/27}\frac19
\begin{pmatrix}2&1\\1&2\end{pmatrix}
=\begin{pmatrix}6&3\\3&6\end{pmatrix}.
$$

また $\nabla^2\varphi$ の成分表示に $p_i=1/3$ を入れると対角は $3+3=6$、非対角は3で一致します。積は $\frac19\left(\begin{smallmatrix}2&-1\\-1&2\end{smallmatrix}\right)\left(\begin{smallmatrix}6&3\\3&6\end{smallmatrix}\right)=I_2$ です。
<!-- solution-end -->

### IG5-A04 非線形座標での二階微分

$x>0$ で $g_{xx}=1$、$\Phi(x)=x^2/2$ とする。$x=e^y$ へ変換し、計量 $g_{yy}$ と $d^2\Phi(e^y)/dy^2$ をそれぞれ求め、差が生じる項を説明せよ。

- Level: A
- 狙い: Hessian と計量の変換を混同しない

<!-- solution-start -->
**詳細解答**

$dx/dy=e^y$ なので[計量変換則](../IG2/index.md#thm-ig2-coordinate-invariance)から $g_{yy}=e^{2y}$ です。一方、$\Phi(e^y)=e^{2y}/2$ は一階微分が $e^{2y}$、二階微分が $2e^{2y}$ です。連鎖律の二階版は $d^2\Phi(x(y))/dy^2=\Phi''(x)(x')^2+\Phi'(x)x''$ で、第一項は $e^{2y}$、第二項は $e^y e^y=e^{2y}$ です。非線形変換では後者が消えません。
<!-- solution-end -->

### IG5-B01 大域的な一対一性を証明する

開凸集合 $\Theta\subset\mathbb R^d$ の $C^2$ 級関数 $\psi$ の Hessian が全点で正定値とする。$\nabla\psi(\theta)=\nabla\psi(\xi)$ なら $\theta=\xi$ を示せ。また $\Theta$ の凸性をどこで使ったか説明せよ。

- Level: B
- 狙い: 局所逆関数と大域的単射を区別する

<!-- solution-start -->
**詳細解答**

背理法で $\theta\ne\xi$ とし $v=\theta-\xi$ と置きます。凸性で $\gamma(t)=\xi+tv$ は $0\le t\le1$ の全域で $\Theta$ に属します。$q(t)=\psi(\gamma(t))$ は $q''(t)=v^{\mathsf T}\nabla^2\psi(\gamma(t))v>0$ です。従って

$$
0<v\cdot(\nabla\psi(\theta)-\nabla\psi(\xi))
=\int_0^1 q''(t)\,dt.
$$

二つの勾配が等しいという仮定では左辺が零となり矛盾します。凸性は線分上で $\psi$ を微分・積分するために使いました。各点の Hessian の正定値性だけから、任意の非凸領域の異なる二点を同じ線分で結べるとは言えません。
<!-- solution-end -->

### IG5-B02 非一様なカテゴリカル族

三値全指数型族で $(p_1,p_2,p_3)=(1/2,1/3,1/6)$ とする。自然母数 $(a,b)$、$G_\theta$、$\nabla^2_\eta\varphi$ を求め、後二者が逆行列であることを直接検算せよ。

- Level: B
- 狙い: 非対称な二次元例で行列・双対の向きを検算する

<!-- solution-start -->
**詳細解答**

$a=\log(p_1/p_3)=\log3$、$b=\log(p_2/p_3)=\log2$ です。[IG4 の Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)により

$$
G_\theta=\begin{pmatrix}p_1(1-p_1)&-p_1p_2\\-p_1p_2&p_2(1-p_2)\end{pmatrix}
=\begin{pmatrix}1/4&-1/6\\-1/6&2/9\end{pmatrix}.
$$

行列式は $1/4\cdot2/9-1/36=1/36>0$。一方 $p_3=1/6$ なので本文の負エントロピーの二階微分は

$$
\nabla^2_\eta\varphi
=\begin{pmatrix}1/p_1+1/p_3&1/p_3\\1/p_3&1/p_2+1/p_3\end{pmatrix}
=\begin{pmatrix}8&6\\6&9\end{pmatrix}.
$$

実際、$(1/36)^{-1}\left(\begin{smallmatrix}2/9&1/6\\1/6&1/4\end{smallmatrix}\right)=\left(\begin{smallmatrix}8&6\\6&9\end{smallmatrix}\right)$ です。特に $G_\eta$ の非対角成分が正であっても $G_\theta$ の非対角成分は負となり得ます。異なる座標の同じ計量を表しているため矛盾しません。
<!-- solution-end -->

### IG5-B03 非最小性と境界の違い

Bernoulli の二重統計量 $F=(X,2X)$ による表示と、最小表示 $F=X$ の $a\to+\infty$ を比較する。(i) 前者で $G$ の核を求め、(ii) 後者で $\eta$、$d\eta/da$、$da/d\eta$ の極限を求め、どの仮定がどこで失われるか説明せよ。

- Level: B
- 狙い: 内点での退化と座標領域の境界を峻別する

<!-- solution-start -->
**詳細解答**

(i) $q=P(X=1)$ とすると $G=q(1-q)\left(\begin{smallmatrix}1&2\\2&4\end{smallmatrix}\right)$ なので $G(2,-1)^{\mathsf T}=0$ です。$q\in(0,1)$ でも行列式が零で、非最小表示の下では内点で逆関数定理を適用できません。

(ii) 最小表示では $\eta=e^a/(1+e^a)\to1$、$d\eta/da=\eta(1-\eta)\to0$、$da/d\eta=1/[\eta(1-\eta)]\to+\infty$ です。しかし任意の有限 $a$ で $d\eta/da>0$ のため、内点では自然母数と期待値母数の対応は破れていません。$a=+\infty$ は $\Theta=\mathbb R$ の点ではなく、$\eta=1$ は $H=(0,1)$ の点ではありません。前者は冗長統計量による内点での非可逆性、後者は開座標領域の外での特異な極限です。
<!-- solution-end -->

### IG5-B04 固定分散の正規位置族

$s^2>0$ を固定し、$h(x)=(2\pi s^2)^{-1/2}\exp(-x^2/(2s^2))$、$F(x)=x$、自然母数 $a\in\mathbb R$ の指数型族を作る。$\psi(a)$、$\eta$、$\varphi(\eta)$、両座標の Fisher 計量を導き、これは平均 $\mu=s^2a$ の正規分布であることを確認せよ。

- Level: B
- 狙い: 平均が線形でも逆 Hessian の区別が必要な例

<!-- solution-start -->
**詳細解答**

指数を平方完成すると $-x^2/(2s^2)+ax=-(x-s^2a)^2/(2s^2)+s^2a^2/2$ です。$h$ の正規化から $Z(a)=e^{s^2a^2/2}$、$\psi(a)=s^2a^2/2$ となります。従って $p_a$ は $N(s^2a,s^2)$ の密度で、$\eta=\psi'(a)=s^2a=E_aX=\mu$、$a=\eta/s^2$ です。双対式に代入すると

$$
\varphi(\eta)=\frac{\eta^2}{s^2}-\frac{s^2}{2}\left(\frac{\eta}{s^2}\right)^2
=\frac{\eta^2}{2s^2}.
$$

自然座標では $g_{aa}=\psi''(a)=s^2$、期待値座標では $g_{\eta\eta}=\varphi''(\eta)=1/s^2$ です。$a=\eta/s^2$ の Jacobian で $g_{\eta\eta}=g_{aa}(da/d\eta)^2=s^2/s^4=1/s^2$ と再確認できます。$s^2>0$ が正定値性と正規分布の分散の両方に必要です。
<!-- solution-end -->

### IG5-C01 三値族の双対構成を通す

$S=\{1,2,3\}$、$F_1=\boldsymbol{1}_{\{X=1\}}$、$F_2=\boldsymbol{1}_{\{X=2\}}$、$h=1$ の全指数型族を考える。

1. 自然領域と期待値母数の像 $H$ を確定し、$\eta=\nabla\psi(a,b)$ が全域で一対一であることを、逆写像と Fisher 行列の正定値性の二通りで示せ。
2. $\varphi(\eta)$ の式を導き、任意の $\eta\in H$ で $\sup_{(u,v)\in\mathbb R^2}\{u\eta_1+v\eta_2-\psi(u,v)\}$ がその値に一意に達することを証明せよ。
3. $\eta=(1/2,1/3)$ で $\nabla^2\varphi$ と $G_\theta^{-1}$ を比較せよ。$\eta_1\to0+$ で $\varphi$ の値と一階・二階微分がどうなるかを、$\eta_2=1/3$ 固定で調べよ。

- Level: C
- 狙い: 大域可逆性・凸共役の最大化・逆計量・境界を一つのモデルで統合する

<!-- solution-start -->
**詳細解答**

1. $\psi(u,v)=\log(1+e^u+e^v)$ は全 $\mathbb R^2$ で有限です。$p_1=e^u/Z,p_2=e^v/Z,p_3=1/Z$ とすると、$\eta=\nabla\psi=(p_1,p_2)$、従って像は $H=\{\eta_1>0,\eta_2>0,\eta_1+\eta_2<1\}$ です。逆写像は $u=\log(\eta_1/p_3)$、$v=\log(\eta_2/p_3)$、$p_3=1-\eta_1-\eta_2$ で、一意です。また

   $$
   G_\theta=\begin{pmatrix}p_1(1-p_1)&-p_1p_2\\-p_1p_2&p_2(1-p_2)\end{pmatrix},
   \quad \det G_\theta=p_1p_2p_3>0.
   $$

   左上成分も $p_1(1-p_1)>0$ なので二次元の正定値判定から $G_\theta>0$。[可逆対応の定理](#thm-ig5-mean-diffeomorphism)も適用できます。

2. $\psi=\log(1/p_3)=-\log p_3$ と逆写像を使うと

   $$
   \begin{aligned}
   \varphi(\eta)&=\eta_1\log\frac{\eta_1}{p_3}
   +\eta_2\log\frac{\eta_2}{p_3}+\log p_3\\
   &=\eta_1\log\eta_1+\eta_2\log\eta_2+p_3\log p_3.
   \end{aligned}
   $$

   ここで $\eta_1+\eta_2+p_3=1$ を用いました。任意の $(u,v)$ と最大候補 $(a,b)$ について、正定値 Hessian による厳密凸性から

   $$
   \psi(u,v)>\psi(a,b)+\nabla\psi(a,b)\cdot((u,v)-(a,b))
   $$

   が $(u,v)\ne(a,b)$ で成り立ちます。$\nabla\psi(a,b)=\eta$ を代入・移項すると $u\eta_1+v\eta_2-\psi(u,v)<a\eta_1+b\eta_2-\psi(a,b)=\varphi(\eta)$ です。$(u,v)=(a,b)$ で等号なので、一意な最大値です。

3. $\eta=(1/2,1/3)$ では $p_3=1/6$。直接微分すると

   $$
   \nabla_\eta^2\varphi=\begin{pmatrix}8&6\\6&9\end{pmatrix},
   \qquad
   G_\theta=\begin{pmatrix}1/4&-1/6\\-1/6&2/9\end{pmatrix}.
   $$

   $\det G_\theta=1/36$ なので $G_\theta^{-1}=36\left(\begin{smallmatrix}2/9&1/6\\1/6&1/4\end{smallmatrix}\right)=\left(\begin{smallmatrix}8&6\\6&9\end{smallmatrix}\right)$ と一致します。$\eta_2=1/3$ を固定して $\eta_1\to0+$ とすると $p_3\to2/3$、$\eta_1\log\eta_1\to0$ により $\varphi$ は $\frac13\log\frac13+\frac23\log\frac23$ へ収束します。一方 $\partial_{\eta_1}\varphi=\log(\eta_1/p_3)\to-\infty$、$\partial^2_{\eta_1\eta_1}\varphi=1/\eta_1+1/p_3\to+\infty$。値は連続延長できても境界で滑らかな期待値座標は得られません。
<!-- solution-end -->

---

## 7. 何が分かったか

- 最小な正則指数型分布族では $G=\nabla^2\psi>0$ で、$\theta\mapsto\eta=\nabla\psi$ は自然母数領域から実際の期待値像への滑らかな一対一対応です。
- 双対ポテンシャル $\varphi=\theta\cdot\eta-\psi$ は $\nabla\varphi=\theta$ と $\nabla^2\varphi=G^{-1}$ を満たします。Bernoulli と三値カテゴリカル族では負エントロピーになります。
- $g$ の Hessian 表示は座標の選び方に依存します。自然座標と期待値座標は双方で Hessian 表示を持ちますが、一般の非線形な変数の取り替えでこの性質が自動保存されるわけではありません。
- 冗長な指数表示では Hessian は内点で退化します。境界では逆座標の微分が発散する場合があり、連続延長できる関数値とは区別が必要です。

次の IG6 では、計量とは別に「どの曲線をまっすぐと見るか」を記述するアファイン接続を導入します。その道具を得た後に、自然座標と期待値座標の幾何学的な双対性をさらに詳しく説明できます。
