# IG12 自然勾配・KL trust region・mirror descent

<!-- definition-example-audit: strict -->

前講までで、[Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)が分布の微小な変化の大きさを測り、[KL divergence の二次近似](../IG3/index.md#thm-ig3-kl-fisher-hessian)がその計量を回復することを学びました。[情報射影](../IG10/index.md#def-ig10-information-projections)は、二つの分布の間の隔たりを直接最小化する方法でした。

今度は「損失関数を小さくするために**分布を少しだけ動かす**」問題を考えます。普通の偏微分を並べた勾配は座標の尺度で変わります。Bernoulli の成功確率 $p$ を使うか、その logit を使うかで数値が大きく違い、同じ一定歩幅を引くと別の分布へ進んでしまいます。

本講では、まず接空間上の**自然勾配**を定義し、次に KL を小さく保つ制約からその方向を導きます。さらに [Bregman divergence](../IG9/index.md#def-ig9-bregman) を用いる **mirror descent（鏡映降下法）**を考え、微小歩幅では自然勾配と一致する一方、有限歩幅では更新法と座標の選び方に依存することを区別します。

## 0. 本講のモデルと微小変化

$\Theta\subset\mathbb R^d$ を開集合とし、$\theta\in\Theta$ に対応する正則な確率分布を $p_\theta$ と書きます。正則性には、共通台、必要な微分と積分の交換、有限二次モーメント、および局所的に分布を識別できることが含まれます。実際にこれらから計量が得られる条件は[IG2 の非退化条件](../IG2/index.md#thm-ig2-positive-definiteness)を参照してください。

$L:\Theta\to\mathbb R$ は小さくしたい $C^1$ 損失関数、$a=\nabla_\theta L(\theta)$ はその**座標上の偏微分を縦に並べた列ベクトル**です。$G(\theta)=(g_{ij}(\theta))$ を正定値 Fisher 情報行列とし、以下では特に断らない限り現在点 $\theta$ で評価します。

接ベクトル $v=(v^i)$ は曲線 $\theta(t)$ の初速度 $v^i=\dot\theta^i(0)$ を表します。損失の一次変化と、その接ベクトルの Fisher 長さの二乗は

$$
dL_\theta(v)=\sum_i\partial_iL(\theta)v^i=a^{\mathsf T}v,
\qquad
g_\theta(v,v)=\sum_{i,j}g_{ij}v^iv^j=v^{\mathsf T}Gv.
$$

$a$ は接ベクトルではなく微分 $dL_\theta$ の座標成分です。計量を指定して初めて、微分を接ベクトルに対応させられます。これが本講の出発点です。

## 1. 計量から自然勾配が生まれる

普通の Euclid 空間では $\nabla L$ と $v$ の内積で一次変化を書けます。しかし統計モデルでは同じ $v$ でも、分布がどれだけ動いたかを測る長さは Fisher 計量で決まります。そこで「すべての方向 $v$ との Fisher 内積が一次変化に一致するベクトル」を求めます。

<a id="def-ig12-natural-gradient"></a>

<!-- formal-statement-start -->
> **定義（Riemann 勾配と自然勾配）**
> $d$ 次元の滑らかな Riemann 多様体 $(M,g)$ と $C^1$ 関数 $L:M\to\mathbb R$ を取る。点 $\theta\in M$ における **Riemann 勾配** $\operatorname{grad}_gL(\theta)\in T_\theta M$ は、すべての $v\in T_\theta M$ に対して

$$
g_\theta(\operatorname{grad}_gL(\theta),v)=dL_\theta(v)
$$

> を満たす唯一の接ベクトルである。$g$ が正定値の Fisher--Rao 計量のとき、これを **自然勾配**（natural gradient）とも呼ぶ。座標で $G=(g_{ij})$、$a=(\partial_iL)$ と書くなら

$$
\widetilde\nabla_\theta L
:=\operatorname{grad}_gL
=G^{-1}a.
$$
<!-- formal-statement-end -->

逆行列がなぜ必要かを確認します。接空間の座標基底で $u=\operatorname{grad}_gL$ を列ベクトルとすると、任意の $v$ に対する条件は

$$
u^{\mathsf T}Gv=a^{\mathsf T}v
\quad\Longleftrightarrow\quad
Gu=a.
$$

$G$ は対称正定値なので可逆であり、解 $u=G^{-1}a$ は存在して一意です。単に任意の行列で勾配を割るのではなく、**微分を計量で接ベクトルへ変換した結果**です。

<!-- definition-example-start: def-ig12-natural-gradient -->
**定義の確認**。Bernoulli 族では $0<p<1$ で $P_p(X=1)=p$、$P_p(X=0)=1-p$ とします。[Bernoulli の Fisher 計量](../IG2/index.md#def-ig2-fisher-rao-metric)を score の二乗平均から計算すると

$$
\begin{aligned}
\partial_p\log P_p(X)
&=\frac{X}{p}-\frac{1-X}{1-p},\\
G(p)&=p\frac1{p^2}+(1-p)\frac1{(1-p)^2}
=\frac1{p(1-p)}>0.
\end{aligned}
$$

$L(p)=p$ なら $dL_p(v)=v$ です。したがって $u=p(1-p)$ は

$$
g_p(u,v)=\frac{p(1-p)v}{p(1-p)}=v=dL_p(v)
$$

を**任意の実数 $v$** について満たします。これで対象が接ベクトルであること、内積の一致、唯一性（$G>0$）の三条件を実際に確認しました。
<!-- definition-example-end -->

### 1.1 最急降下の意味

一次変化を $g_\theta(v,v)=1$ という長さ制約で最小化します。正定値行列 $G$ による内積で[Cauchy--Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使えば

$$
\begin{aligned}
a^{\mathsf T}v
&=g_\theta(G^{-1}a,v)\\
&\ge-\sqrt{a^{\mathsf T}G^{-1}a}\,
\sqrt{v^{\mathsf T}Gv}.
\end{aligned}
$$

$a\ne0$ なら等号を与える単位方向は $-G^{-1}a/\sqrt{a^{\mathsf T}G^{-1}a}$ です。つまり自然勾配の**負方向**は Fisher 長さを固定したときの一次損失の最急降下方向です。$a=0$ なら一次変化はすべての方向で0であり、特定の降下方向を選べません。

### 1.2 座標を変えると何が変わるか

同じ分布族を新しい局所座標 $\xi$ で記述し、$\theta=f(\xi)$ とします。$f$ は $C^1$ 局所微分同相、$J=\partial\theta/\partial\xi$ は可逆と仮定します。[Fisher 行列の座標変換則](../IG2/index.md#thm-ig2-coordinate-invariance)より $G_\xi=J^{\mathsf T}G_\theta J$ です。

<a id="thm-ig12-coordinate-invariance"></a>

<!-- formal-statement-start -->
> **定理（自然勾配の座標変換則）**
> 正定値 Fisher 計量 $G_\theta$ を持つ $d$ 次元正則統計モデルで、$L$ を $C^1$ とする。$C^1$ 局所微分同相 $\theta=f(\xi)$ の Jacobian を可逆行列 $J=\partial\theta/\partial\xi$ とすると

$$
\widetilde\nabla_\xi L
=J^{-1}\widetilde\nabla_\theta L,
\qquad
J\widetilde\nabla_\xi L
=\widetilde\nabla_\theta L.
$$

> 従って自然勾配は同一接ベクトルの座標表示を与える。一方、座標ごとに成分を引く**有限歩幅の Euler 更新が同一の到達分布を与えるとは限らない**。
<!-- formal-statement-end -->

### 証明の見取り図

損失の微分は $J^{\mathsf T}$、計量は $J^{\mathsf T}GJ$ に従って変わります。逆行列を取ると Jacobian が一つ残り、それは接ベクトルの変換則になります。

<!-- proof-start -->
### 証明

連鎖律から、$k$ 番目の新しい座標に関して

$$
\partial_{\xi^k}(L\circ f)
=\sum_i\frac{\partial\theta^i}{\partial\xi^k}
\partial_{\theta^i}L,
\quad\text{従って}\quad a_\xi=J^{\mathsf T}a_\theta.
$$

[IG2 の座標変換則](../IG2/index.md#thm-ig2-coordinate-invariance)が適用できるのは $J$ が可逆で $G_\theta$ が正定値だからです。逆行列の積の順序に注意して

$$
\begin{aligned}
\widetilde\nabla_\xi L
&=(J^{\mathsf T}G_\theta J)^{-1}J^{\mathsf T}a_\theta\\
&=J^{-1}G_\theta^{-1}(J^{\mathsf T})^{-1}J^{\mathsf T}a_\theta\\
&=J^{-1}\widetilde\nabla_\theta L.
\end{aligned}
$$

一方、曲線の速度は連鎖律から $\dot\theta=J\dot\xi$ です。よって二つは同じ接ベクトルを表します。有限更新については $f(\xi-\tau u_\xi)$ と $f(\xi)-\tau Ju_\xi$ が一般に一致しません。ここで $u_\xi$ を現在点で固定すると、$f$ が $C^1$ という本定理の仮定から言えるのは

$$
f(\xi-\tau u_\xi)=f(\xi)-\tau Ju_\xi+o(\tau)
\qquad(\tau\downarrow0)
$$

までです。$f$ がさらに $C^2$ なら剰余を $O(\tau^2)$ と評価できます。いずれの場合も、$f$ が非線形なら有限歩幅では差が残り得ます。
<!-- proof-end -->

**logit 座標での確認**。上の Bernoulli 族で $\xi=\log(p/(1-p))$ とすると

$$
p=\frac{e^\xi}{1+e^\xi},\qquad
J=\frac{dp}{d\xi}=p(1-p)\ne0.
$$

$L(p)=p$ に対し $a_\xi=J$、$G_\xi=J^2G_p=p(1-p)$ なので

$$
\widetilde\nabla_\xi L=1,\qquad
J\widetilde\nabla_\xi L=p(1-p)=\widetilde\nabla_pL.
$$

特に $p=1/2$、歩幅 $\tau=1$ のとき、$p$ 座標での Euler 更新は $p^+=1/4$、$\xi=0$ からの Euler 更新を確率へ戻すと $p^+=1/(1+e)\simeq0.269$ です。**方向の座標不変性は、有限更新の不変性ではありません。** 小さな歩幅で初めて両者は一次まで一致します。

## 2. KL で「動いてよい範囲」を測る

Fisher 長さの単位球は分布の変化を測れますが、統計モデルでは分布間の KL divergence を直接評価することもできます。ただし KL は非対称で、二点間の**有限距離**について計量と完全には同じではありません。

基準点 $\theta$ を固定し、候補の座標 $\eta$ だけを変える関数を

$$
F_\theta(\eta):=D_{\mathrm{KL}}(p_\theta\Vert p_\eta)
$$

と置きます。正則性に加え、この関数が $\eta=\theta$ の近傍で $C^3$（連続モデルなら三階までの必要な微分・積分交換を含む）なら、$\theta+v\in\Theta$ かつ $v\to0$ の範囲で、[KL の局所 Fisher 展開](../IG3/index.md#thm-ig3-kl-fisher-hessian)の二次項に三次の剰余評価を加えられます。

$$
D_{\mathrm{KL}}(p_\theta\Vert p_{\theta+v})
=\frac12v^{\mathsf T}G(\theta)v+O(\|v\|^3).
$$

この式の右辺は $v=0$ の二次 Taylor 項であり、有限の $v$ の KL と等号で結んではいません。逆向き KL も二次項は同じですが三次以上の項が一般に異なります。

<a id="def-ig12-kl-trust-region"></a>

<!-- formal-statement-start -->
> **定義（局所 KL trust region）**
> $d$ 次元正則統計モデルの点 $\theta$ で Fisher 情報行列 $G(\theta)$ が正定値、$L$ が $C^1$ とする。$a=\nabla_\theta L(\theta)$ と半径パラメータ $\varepsilon>0$ に対し、一次損失 $a^{\mathsf T}v$ を二次近似 KL で制限する問題

$$
\min_{v\in\mathbb R^d} a^{\mathsf T}v
\quad\text{subject to}\quad
\frac12v^{\mathsf T}G(\theta)v\le\varepsilon
$$

> を **局所 KL trust region 問題**と呼ぶ。得られる $v$ は接空間の微小変化を表す。これは $D_{\mathrm{KL}}(p_\theta\Vert p_{\theta+v})\le\varepsilon$ という厳密な KL 制約を一般には意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig12-kl-trust-region -->
**定義の確認**。Bernoulli 族の $p=1/2$ では上で計算した Fisher 情報量は $G=4>0$ です。接ベクトル $v$ を定義の二次形式へ代入すると

$$
\frac12Gv^2=2v^2\le\varepsilon
\quad\Longleftrightarrow\quad
|v|\le\sqrt{\varepsilon/2}.
$$

$L(p)=p$ の微分は $a=1$ なので、一次損失はこの区間で $v$ に等しく、最小点は左端

$$
v_*=-\sqrt{\varepsilon/2}
$$

です。$G>0$、$\varepsilon>0$、制約の成立と最小性を直接確認しました。
<!-- definition-example-end -->

<a id="thm-ig12-trust-direction"></a>

<!-- formal-statement-start -->
> **定理（局所 KL trust region の最適方向）**
> $G\in\mathbb R^{d\times d}$ を対称正定値行列、$a\in\mathbb R^d\setminus\{0\}$、$\varepsilon>0$ とする。局所 KL trust region 問題

$$
\min_v a^{\mathsf T}v
\quad\text{subject to}\quad
\frac12v^{\mathsf T}Gv\le\varepsilon
$$

> の唯一の解は

$$
v_*=-\sqrt{\frac{2\varepsilon}{a^{\mathsf T}G^{-1}a}}\,
G^{-1}a,
\qquad
\min_v a^{\mathsf T}v
=-\sqrt{2\varepsilon\,a^{\mathsf T}G^{-1}a}.
$$

> $a=0$ の場合はすべての実行可能 $v$ が最小点である。
<!-- formal-statement-end -->

### 証明の見取り図

$G$ を内積として[Cauchy--Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を適用します。自然勾配方向でのみ等号が成り立つことと、半径まで進むことを別々に確かめます。

<!-- proof-start -->
### 証明

$G$ は正定値なので $\langle x,y\rangle_G=x^{\mathsf T}Gy$ は内積です。また $G^{-1}a\ne0$ です。任意の実行可能 $v$ について

$$
\begin{aligned}
a^{\mathsf T}v
&=\langle G^{-1}a,v\rangle_G\\
&\ge-\|G^{-1}a\|_G\|v\|_G\\
&\ge-\sqrt{a^{\mathsf T}G^{-1}a}\sqrt{2\varepsilon}.
\end{aligned}
$$

最初の不等式が等号となるには $v$ が $G^{-1}a$ の負の実数倍である必要があり、二つ目が等号となるには $v^{\mathsf T}Gv=2\varepsilon$ が必要です。$v=-tG^{-1}a$（$t>0$）と置くと

$$
t^2a^{\mathsf T}G^{-1}a=2\varepsilon,
\qquad
t=\sqrt{\frac{2\varepsilon}{a^{\mathsf T}G^{-1}a}}.
$$

よって定理の $v_*$ が両方の等号を満たし、一意です。$a=0$ なら目的関数は恒等的に0です。
<!-- proof-end -->

**なぜ正定値性が必要か**。例えば $G=\operatorname{diag}(1,0)$、$a=(0,1)^{\mathsf T}$ では第2成分 $v_2$ は制約に現れず、$v_2\to-\infty$ で一次損失は下に有界ですらありません。$G^{-1}$ が存在しない問題を単純に同じ公式へ代入できません。擬似逆行列を使うには追加の可解性・商空間の仮定が必要です。

### 2.1 厳密な KL 制約との違いを Bernoulli で見る

$p_0=1/2$ から成功確率 $p\in(0,1)$ を動かし、$L(p)=p$ を最小化するとします。基準分布から候補分布への厳密な KL は

$$
\begin{aligned}
D_{\mathrm{KL}}\bigl(\operatorname{Bern}(1/2)\Vert\operatorname{Bern}(p)\bigr)
&=\frac12\log\frac{1/2}{p}
+\frac12\log\frac{1/2}{1-p}\\
&=-\frac12\log\{4p(1-p)\}.
\end{aligned}
$$

半径 $\varepsilon>0$ の厳密な KL 制約を指数関数で変形すると

$$
4p(1-p)\ge e^{-2\varepsilon},
\qquad
\left(p-\frac12\right)^2
\le\frac14(1-e^{-2\varepsilon}).
$$

最小の成功確率は

$$
p_{\mathrm{exact}}=\frac12-\frac12\sqrt{1-e^{-2\varepsilon}},
$$

二次近似の trust region で求めた候補は

$$
p_{\mathrm{quad}}=\frac12-\sqrt{\frac{\varepsilon}{2}}.
$$

$1-e^{-2\varepsilon}=2\varepsilon+O(\varepsilon^2)$ なので両者は $\varepsilon\downarrow0$ で最初の $\sqrt{\varepsilon}$ 項まで一致します。一方、例えば $\varepsilon=1/2$ では二次近似の候補は $p_{\mathrm{quad}}=0$ となり正の Bernoulli モデルの**外**です。厳密解は常に $0<p_{\mathrm{exact}}<1/2$ です。この違いが、二次近似・モデルの定義域・有限歩幅を混同してはならない理由です。

## 3. もう一つの更新法：mirror descent

局所二次近似の trust region は現在点での計量だけを使います。一方、[IG9 で定義した Bregman divergence](../IG9/index.md#def-ig9-bregman) は、凸ポテンシャルの値を使って**離れた二点**の隔たりを測れます。これを、現在点 $x$ から候補 $z$ へ動く際の罰則にします。

座標を $\theta$ ではなく $x$ と書くのは、統計モデルの自然母数と期待値母数のいずれも更新変数になり得るからです。$U\subset\mathbb R^d$ を開凸集合、$\psi:U\to\mathbb R$ を $C^3$ で Hessian が各点で正定値な凸関数とします。$C\subset U$ を非空の凸な実行可能集合、$\tau>0$ を歩幅とし、$a=\nabla L(x)$ は**現在点で評価して固定する**通常の微分列です。

<a id="def-ig12-mirror-descent"></a>

<!-- formal-statement-start -->
> **定義（Bregman 鏡映更新）**
> 開凸集合 $U\subset\mathbb R^d$ 上の $C^3$ 関数 $\psi$ は Hessian $\nabla^2\psi(x)$ がすべての $x\in U$ で正定値とする。$C\subset U$ を非空凸集合、$x\in C$、$a\in\mathbb R^d$、$\tau>0$ とする。$z,x\in U$ に対する Bregman divergence

$$
D_\psi(z,x)=\psi(z)-\psi(x)-\nabla\psi(x)^{\mathsf T}(z-x)
$$

> を用いて

$$
x^+\in\underset{z\in C}{\operatorname{argmin}}\;
\bigl\{\tau a^{\mathsf T}z+D_\psi(z,x)\bigr\}
$$

> と定める更新を **mirror descent（鏡映降下法）の一歩**と呼ぶ。最小点の存在は別途必要である。滑らかな損失 $L$ を最小化する場合は $a=\nabla L(x)$ と置く。
<!-- formal-statement-end -->

**向きの確認**。動かす候補 $z$ は $D_\psi$ の**第1引数**です。[IG9 の指数型分布族での KL 対応](../IG9/index.md#thm-ig9-exponential-kl)を使うなら、自然母数座標の対数分配関数 $\psi$ に対し

$$
D_\psi(\theta_{\mathrm{new}},\theta_{\mathrm{old}})
=D_{\mathrm{KL}}(p_{\theta_{\mathrm{old}}}\Vert p_{\theta_{\mathrm{new}}}).
$$

同じ名前の「KL を使う更新」でも、分布のどちらを第1引数に置いたかは座標・ポテンシャルと一緒に確定させます。

<!-- definition-example-start: def-ig12-mirror-descent -->
**定義の確認**。二次ポテンシャルの例として $U=\mathbb R^2$、$C=\mathbb R^2$、$\psi(x)=\tfrac12(x_1^2+4x_2^2)$ とします。座標ごとの二階偏微分から $H=\nabla^2\psi=\operatorname{diag}(1,4)$ であり、任意の $w\ne0$ に対して

$$
w^{\mathsf T}Hw=w_1^2+4w_2^2>0
$$

です。これが定義で必要な Hessian の正定値性であり、開凸集合 $U$ 上の厳密凸性を保証します。さらに $\nabla\psi(x)=Hx$ を Bregman の定義へ代入すると $D_\psi(z,x)=\tfrac12(z-x)^{\mathsf T}H(z-x)$ となるので、

$$
D_\psi(z,x)=\frac12\{(z_1-x_1)^2+4(z_2-x_2)^2\}\ge0.
$$

$a=(1,2)^{\mathsf T}$、$\tau=1$ なら、目的関数の $z_1,z_2$ 微分を0にする条件は

$$
1+(z_1-x_1)=0,\qquad 2+4(z_2-x_2)=0.
$$

したがって $x^+=(x_1-1,x_2-1/2)$ です。Hessian が正定値なのでこの点は実際に存在する唯一の最小点です。候補が $C$ に属すること、微分の零点、厳密最小性を確認できました。
<!-- definition-example-end -->

### 3.1 双対変数では引き算になる

鏡映更新では凸ポテンシャルの勾配 $y=\nabla\psi(x)$ を使って座標を切り替えます。これは[IG5 で導入した期待値座標](../IG5/index.md#def-ig5-expectation-coordinate)を一般化した双対変数です。[IG5 の Legendre 双対](../IG5/index.md#thm-ig5-legendre-hessian)のもとで、正定値 Hessian は局所的に可逆な変数の切り替えを与えます。鏡映更新は、この双対変数のほうでは一次損失の微分を引くだけになることが重要です。

<a id="thm-ig12-mirror-natural"></a>

<!-- formal-statement-start -->
> **定理（鏡映更新の最適性と自然勾配への局所極限）**
> $U\subset\mathbb R^d$ を開凸集合、$\psi\in C^3(U)$ は各点で $H(x)=\nabla^2\psi(x)$ が正定値とする。$C\subset U$ を非空凸集合、$x\in C$、$a\in\mathbb R^d$、$\tau>0$ とする。関数

$$
F_\tau(z)=\tau a^{\mathsf T}z+D_\psi(z,x)
$$

> が $C$ 上で最小点 $x^+$ を持つなら、その点は一意であり、任意の $z\in C$ に対して

$$
\bigl(\tau a+\nabla\psi(x^+)-\nabla\psi(x)\bigr)^{\mathsf T}
(z-x^+)\ge0
$$

> が成り立つ。逆にこの不等式を満たす $x^+\in C$ は最小点である。さらに $C=U$ とし、$\tau\downarrow0$ で $x$ の近傍に最小点が存在するなら

$$
\nabla\psi(x^+)=\nabla\psi(x)-\tau a,\qquad
x^+=x-\tau H(x)^{-1}a+O(\tau^2).
$$

> $L\in C^1(U)$、$a=\nabla L(x)$ と置き、$\tau\to0$ の連続時間極限を考えると、形式的な時間発展は

$$
\frac{d}{dt}\nabla\psi(x(t))=-\nabla L(x(t)),
\qquad
\dot x(t)=-H(x(t))^{-1}\nabla L(x(t))
$$

> である。特に $H$ が統計モデルの Fisher 計量なら右辺は**負の自然勾配**である。有限歩幅の更新とこの微分方程式を等号で同一視してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

Bregman 項の $z$ 微分は $\nabla\psi(z)-\nabla\psi(x)$ です。制約があれば凸集合の線分に沿って片側微分を調べ、制約がなければ双対変数における引き算になります。最後は Hessian による一次 Taylor 展開で自然勾配を回収します。

<!-- proof-start -->
### 証明

まず $z$ について微分すると

$$
\nabla F_\tau(z)=\tau a+\nabla\psi(z)-\nabla\psi(x),
\qquad
\nabla^2F_\tau(z)=H(z)>0.
$$

$F_\tau$ は厳密凸です。$x^+\in C$ が最小点なら任意の $z\in C$ と $t\in[0,1]$ に対して $x^++t(z-x^+)\in C$ です。$t=0$ から右微分すると

$$
0\le\left.\frac{d}{dt}F_\tau(x^++t(z-x^+))\right|_{t=0+}
=\nabla F_\tau(x^+)^{\mathsf T}(z-x^+).
$$

逆にこの不等式が成り立つなら、凸性の接平面不等式

$$
F_\tau(z)\ge F_\tau(x^+)
+\nabla F_\tau(x^+)^{\mathsf T}(z-x^+)\ge F_\tau(x^+)
$$

から最小点だと分かります。厳密凸性により二つの異なる最小点は存在しません。

$C=U$ なら最小点は開集合の内点なので $\nabla F_\tau(x^+)=0$、すなわち双対変数の等式が従います。$H(x)$ が可逆なので、逆関数定理によって $\nabla\psi$ の局所逆写像が存在します。$x^+\to x$ として $\delta=x^+-x$ と置くと

$$
\nabla\psi(x+\delta)
=\nabla\psi(x)+H(x)\delta+O(\|\delta\|^2).
$$

双対変数の等式に代入して $H(x)\delta+O(\|\delta\|^2)=-\tau a$ です。局所逆写像は微分可能なので $\delta=O(\tau)$、従って

$$
\delta=-\tau H(x)^{-1}a+O(\tau^2).
$$

最後に、歩幅 $\tau$ の離散時刻を連続時間 $t$ と読み、双対変数の変化を歩幅で割ると

$$
\frac{\nabla\psi(x(t+\tau))-\nabla\psi(x(t))}{\tau}
=-\nabla L(x(t)).
$$

滑らかな極限曲線が存在する場合は連鎖律で左辺が $H(x(t))\dot x(t)$ に収束し、$H$ の可逆性から示した微分方程式を得ます。ここでの「連続時間極限」は微分方程式の導出であり、任意の歩幅列の数値収束を証明したものではありません。
<!-- proof-end -->

**存在条件は別問題**です。$C$ がコンパクトかつ $C\subset U$ なら連続な $F_\tau$ は最小値を達成します。$C=U$ が開集合のとき、$\nabla\psi(x)-\tau a$ が $\nabla\psi(U)$ に入れば、局所逆の範囲内に限らず $\nabla\psi(z)$ がその値を取る点で唯一の最小値を達成できます。一般の開集合で大きい $\tau$ を選んだ場合、最小点は境界へ逃げることもあります。

### 3.2 指数型分布族と Bregman の向き

[指数型分布族の Fisher--Hessian 恒等式](../IG4/index.md#thm-ig4-fisher-hessian)と[IG5 の双対計量](../IG5/index.md#thm-ig5-dual-metric)から、自然母数 $\theta$ の領域で $H(\theta)=\nabla^2\psi(\theta)=G_\theta$ です。よって自然母数に対する mirror descent

$$
\theta^+=\underset{\vartheta}{\operatorname{argmin}}\;
\bigl\{\tau\nabla_\theta L(\theta)^{\mathsf T}\vartheta
+D_\psi(\vartheta,\theta)\bigr\}
$$

は、最小点が内点にあるとき、[鏡映更新の最適性と自然勾配への局所極限](#thm-ig12-mirror-natural)から

$$
\underbrace{\nabla\psi(\theta^+)}_{\eta^+}
=\underbrace{\nabla\psi(\theta)}_{\eta}
-\tau\nabla_\theta L(\theta)
$$

を満たします。ここで $\eta=\nabla\psi(\theta)$ は期待値座標です。**自然母数を直接引く更新ではなく、期待値座標を引く更新**になる点に注意してください。

二次ポテンシャル $\psi(x)=\tfrac12x^{\mathsf T}Hx$（$H>0$ が定数）では高次項がないため、鏡映更新は任意の歩幅で $x^+=x-\tau H^{-1}a$ と**厳密に一致**します。非二次ポテンシャルで一般に成り立つのは、上で証明した局所一致です。

## 4. 正の確率単体で自然勾配と指数重み更新を計算する

$m\ge2$ 個の結果 $i=1,\ldots,m$ の確率を $p_i>0$、$\sum_i p_i=1$ とします。[正の有限確率単体の接空間の定理](../IG1/index.md#thm-ig1-simplex-tangent)より接ベクトル $v$ は $\sum_i v_i=0$ を満たすため、[単体の Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)は

$$
g_p(v,w)=\sum_{i=1}^m\frac{v_iw_i}{p_i},
\qquad
\sum_i v_i=\sum_i w_i=0
$$

と書けます。ここでは損失を各結果の費用 $c_i\in\mathbb R$ の平均

$$
L(p)=\sum_{i=1}^m p_ic_i,\qquad
\bar c=\sum_{i=1}^m p_ic_i
$$

とします。元の確率を保ちながら費用の高い結果を減らすには、成分ごとに単純に $c_i$ を引くだけでは総和1の条件が崩れます。

<a id="thm-ig12-simplex-mirror"></a>

<!-- formal-statement-start -->
> **定理（正の確率単体の自然勾配と負エントロピー鏡映更新）**
> $m\ge2$、$p=(p_1,\ldots,p_m)$ は $p_i>0$、$\sum_i p_i=1$ を満たす。単体の Fisher 計量を $g_p(v,w)=\sum_i v_iw_i/p_i$（接ベクトルは成分和0）とし、$c=(c_i)\in\mathbb R^m$、$L(p)=\sum_i p_ic_i$、$\bar c=\sum_i p_ic_i$ とする。このとき自然勾配の接成分は

$$
(\operatorname{grad}_g L)_i=p_i(c_i-\bar c)
$$

> である。さらに $p(t)$ を、正の単体における負の自然勾配流 $\dot p(t)=-\operatorname{grad}_gL(p(t))$ とすると、$\bar c(t)=\sum_i p_i(t)c_i$ として

$$
\frac{d}{dt}L(p(t))
=-\sum_i p_i(t)(c_i-\bar c(t))^2
$$

> となる。また、負エントロピーポテンシャル $h(q)=\sum_iq_i\log q_i$ を正の確率単体上で用いた鏡映更新

$$
p^+=\underset{q_i>0,\;\sum_iq_i=1}{\operatorname{argmin}}\;
\left\{\tau\sum_ic_iq_i+D_h(q,p)\right\}
$$

> は、任意の有限歩幅 $\tau>0$ で存在して一意であり、

$$
p_i^+=\frac{p_i e^{-\tau c_i}}
{\sum_jp_j e^{-\tau c_j}},
\qquad
\left.\frac{d}{d\tau}p_i^+\right|_{\tau=0}
=-p_i(c_i-\bar c)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

自然勾配は任意の総和0の接方向への内積で確認します。鏡映更新は $D_h(q,p)=\sum_iq_i\log(q_i/p_i)$ として、総和1の乗数を入れると指数重みの式が出ます。最後に $\tau=0$ で微分して一致を確認します。

<!-- proof-start -->
### 証明

候補ベクトル $u_i=p_i(c_i-\bar c)$ は

$$
\sum_i u_i=\sum_ip_ic_i-\bar c\sum_ip_i=0
$$

なので接空間に属します。任意の接ベクトル $w$ について

$$
\begin{aligned}
g_p(u,w)
&=\sum_i\frac{p_i(c_i-\bar c)w_i}{p_i}
=\sum_i c_iw_i-\bar c\sum_iw_i\\
&=\sum_i c_iw_i=dL_p(w).
\end{aligned}
$$

計量は接空間上正定値なので、[自然勾配の定義](#def-ig12-natural-gradient)により $u$ が唯一の勾配です。負の勾配に沿う曲線では

$$
\begin{aligned}
\frac{dL}{dt}
&=\sum_ic_i\dot p_i
=-\sum_ic_ip_i(c_i-\bar c)\\
&=-\sum_ip_i\bigl[(c_i-\bar c)+\bar c\bigr](c_i-\bar c)\\
&=-\sum_ip_i(c_i-\bar c)^2,
\end{aligned}
$$

最後の行では $\sum_ip_i(c_i-\bar c)=0$ を用いました。

次に $q_i>0$、$\sum_iq_i=1$ では

$$
D_h(q,p)=\sum_iq_i\log\frac{q_i}{p_i},
$$

なぜなら $\partial_i h(p)=1+\log p_i$ で、$\sum_i(q_i-p_i)=0$ だからです。正規化の Lagrange 乗数を $\lambda$ として、$q_i$ について偏微分すると

$$
\tau c_i+\log\frac{q_i}{p_i}+1+\lambda=0,
\quad\text{従って}\quad
q_i=p_i e^{-1-\lambda}e^{-\tau c_i}.
$$

総和1から $e^{-1-\lambda}=1/Z$、$Z=\sum_jp_je^{-\tau c_j}>0$ が一意に決まり、すべての $q_i$ が正です。制約集合の内部で最小値を達成する解が存在し、$h$ は正の単体上で厳密凸なのでこれが唯一の最小点です。

最後に $Z(0)=1$、$Z'(0)=-\sum_jp_jc_j=-\bar c$ です。商の微分を $\tau=0$ で評価すると

$$
\left.\frac{d}{d\tau}\frac{p_ie^{-\tau c_i}}{Z(\tau)}\right|_0
=\frac{-p_ic_i Z(0)-p_i Z'(0)}{Z(0)^2}
=-p_i(c_i-\bar c).
$$
<!-- proof-end -->

**具体例**。3状態の分布 $p=(1/2,1/3,1/6)$、費用 $c=(0,1,2)$ では $\bar c=2/3$ です。負の自然勾配方向は

$$
-\operatorname{grad}_g L
=\left(\frac13,-\frac19,-\frac29\right),
\qquad
\sum_i\dot p_i=0.
$$

$\tau=\log2$ の有限鏡映更新では重み $e^{-\tau c}=(1,1/2,1/4)$ なので、非正規化重みは $(1/2,1/6,1/24)$、その和は $17/24$ です。従って

$$
p^+=\left(\frac{12}{17},\frac4{17},\frac1{17}\right).
$$

各成分は正で総和1を保ちます。$L(p)=2/3$ から $L(p^+)=6/17$ へ下がります。この計算では有限歩幅の指数更新を**線形化した Euler 更新と同一視していません**。

### 4.1 ポテンシャルと KL の向きをもう一度

負エントロピー $h(p)=\sum_i p_i\log p_i$ については

$$
D_h(q,p)=D_{\mathrm{KL}}(q\Vert p).
$$

ここでは新しい確率 $q$ が KL の**第1引数**です。第3節の対数分配関数を自然母数で使う場合は反対に $D_\psi(\theta_{\mathrm{new}},\theta_{\mathrm{old}})=D_{\mathrm{KL}}(p_{\mathrm{old}}\Vert p_{\mathrm{new}})$ でした。両者は[Legendre 双対](../IG5/index.md#thm-ig5-legendre-hessian)で結ばれますが、同じ有限更新式にはなりません。共通するのは接空間の Fisher 二次形式と**微小歩幅での自然勾配方向**です。

## 5. 何が保証され、何が保証されないか

1. **正定値計量の範囲**：Fisher 行列が特異なら $G^{-1}\nabla L$ は未定義です。有限単体の境界 $p_i=0$ では、正の単体の座標と $1/p_i$ を使った計量式をそのまま適用できません。境界での mirror descent の延長にも、支持集合の扱いが必要です。
2. **局所と有限半径**：[KL の二次近似](../IG3/index.md#thm-ig3-kl-fisher-hessian)は $v\to0$ での主張です。有限の trust region では KL の高次項や定義域が効きます。局所式だけで単調減少や制約の厳密充足を保証しません。
3. **接ベクトルと離散更新**：[自然勾配の座標変換則](#thm-ig12-coordinate-invariance)は自然勾配が同じ幾何学的な方向を定めることを証明します。$p$ 座標と logit 座標で固定歩幅の Euler 更新をすると、到達点は一般に違います。
4. **mirror descent の存在**：凸集合上で厳密凸な目的関数なら最小点が**存在すれば**一意です。開集合の境界へ逃げる場合まで無条件に存在を保証しません。制約付きなら双対変数の単純な引き算ではなく、[最適性不等式](#thm-ig12-mirror-natural)を確認します。
5. **一般の大域収束**：自然勾配流での微分恒等式や一歩の鏡映最適性だけから、任意の非凸損失、任意の歩幅、反復回数での収束は結論できません。収束には損失の凸性・滑らかさ、適切な歩幅などの追加仮定が必要です。

## 6. 演習：方向・制約・有限更新を自分で確かめる

### IG12-A01 Bernoulli の自然勾配

成功確率 $0<p<1$ の Bernoulli 分布 $P_p(X=1)=p$ を考える。損失を $L(p)=\tfrac12(p-3/4)^2$ とする。score から Fisher 情報量を求め、$p=1/2$ での自然勾配と負の自然勾配方向を計算せよ。

- Level: A
- 狙い: 微分と計量の逆行列を混同しない

<!-- solution-start -->
**詳細解答**

score は $X=1$ で $1/p$、$X=0$ で $-1/(1-p)$ です。従って

$$
G(p)=p\frac1{p^2}+(1-p)\frac1{(1-p)^2}
=\frac1{p(1-p)}.
$$

一方 $L'(p)=p-3/4$ なので[自然勾配の定義](#def-ig12-natural-gradient)から

$$
\widetilde\nabla_p L
=G(p)^{-1}L'(p)
=p(1-p)(p-3/4).
$$

$p=1/2$ では $G=4$、$L'=-1/4$ なので自然勾配は $-1/16$、負の自然勾配方向は $+1/16$ です。現在の $p=1/2$ は目標 $3/4$ より小さいため、成功確率を増やす方向という符号にも整合します。
<!-- solution-end -->

### IG12-A02 logit 変換と有限歩幅

Bernoulli($p$)、$0<p<1$ で $L(p)=p$ とし、$\xi=\log(p/(1-p))$ を新しい座標とする。$p=1/2$ における自然勾配の両座標表示を求めよ。歩幅 $\tau=2/5$ の Euler 更新が異なる確率を返すことを示せ。

- Level: A
- 狙い: 接ベクトルの不変性と有限更新の差を切り分ける

<!-- solution-start -->
**詳細解答**

$p=e^\xi/(1+e^\xi)$ を微分すると $J=dp/d\xi=p(1-p)$ です。確率座標の $G_p=1/[p(1-p)]$、$a_p=1$ から

$$
\widetilde\nabla_pL=p(1-p).
$$

連鎖律と[座標変換則](#thm-ig12-coordinate-invariance)より

$$
G_\xi=J^2G_p=p(1-p),\qquad
a_\xi=J,\qquad
\widetilde\nabla_\xi L=\frac{J}{G_\xi}=1.
$$

$p=1/2$ では $(\widetilde\nabla_pL,\widetilde\nabla_\xi L)=(1/4,1)$、かつ $J(1)=1/4$ なので接ベクトルとして一致しています。一方、確率座標の Euler 更新は

$$
p_{\mathrm{Euler}}^+=\frac12-\frac25\frac14=\frac25.
$$

logit 座標では $\xi=0$ から $\xi^+=-2/5$ となり

$$
p_{\mathrm{logit}}^+=\frac1{1+e^{2/5}}\ne\frac25.
$$

どちらも $(0,1)$ にありますが、一致しません。$J$ の一次近似で初速度が一致することは、非線形変換後の有限到達点が等しいことを意味しません。
<!-- solution-end -->

### IG12-A03 Bernoulli KL の二次係数

基準分布を Bernoulli($p_0$) とし、$p_0=1/4$ とする。$p=p_0+\delta\in(0,1)$ に対する $D_{\mathrm{KL}}(p_0\Vert p)$ を $\delta=0$ のまわりで二次まで展開し、Fisher 情報量と比較せよ。

- Level: A
- 狙い: KL の二次近似で $1/2$ の係数を落とさない

<!-- solution-start -->
**詳細解答**

展開する一変数関数を

$$
F(\delta)
=p_0\log\frac{p_0}{p_0+\delta}
+(1-p_0)\log\frac{1-p_0}{1-p_0-\delta}
$$

とおきます。$F(0)=0$ です。$\delta$ で微分すると

$$
\begin{aligned}
F'(\delta)&=-\frac{p_0}{p_0+\delta}
+\frac{1-p_0}{1-p_0-\delta},\\
F''(\delta)&=\frac{p_0}{(p_0+\delta)^2}
+\frac{1-p_0}{(1-p_0-\delta)^2}.
\end{aligned}
$$

従って $F'(0)=0$、$F''(0)=1/p_0+1/(1-p_0)=1/[p_0(1-p_0)]=16/3$ です。$p_0=1/4$ の近くでは分母が0にならず三階微分も連続なので、[Taylor の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)を展開点 $\delta=0$、次数2、評価点 $\delta$ に適用すると

$$
F(\delta)=\frac12\frac{16}{3}\delta^2+O(|\delta|^3)
=\frac83\delta^2+O(|\delta|^3).
$$

[Fisher 情報量](../IG2/index.md#def-ig2-fisher-information)は $G(p_0)=16/3$ であり、二次係数は確かに $G(p_0)/2$ です。
<!-- solution-end -->

### IG12-A04 二次元 trust region

$G=\operatorname{diag}(1,4)$、$a=(2,2)^{\mathsf T}$、$\varepsilon=1/2$ に対し、$\min a^{\mathsf T}v$、制約 $\tfrac12v^{\mathsf T}Gv\le\varepsilon$ の唯一解と最小値を求めよ。解が制約境界にあることも検算せよ。

- Level: A
- 狙い: 自然勾配方向と trust region の半径調整を分ける

<!-- solution-start -->
**詳細解答**

$G$ は正定値で、逆行列は $\operatorname{diag}(1,1/4)$ です。従って

$$
G^{-1}a=(2,1/2)^{\mathsf T},\qquad
a^{\mathsf T}G^{-1}a=4+1=5.
$$

[局所 trust region の定理](#thm-ig12-trust-direction)で $2\varepsilon=1$ を代入すると

$$
v_*=-\frac1{\sqrt5}(2,1/2)^{\mathsf T},\qquad
a^{\mathsf T}v_*=-\sqrt5.
$$

制約の左辺は

$$
\frac12v_*^{\mathsf T}Gv_*
=\frac12\left(\frac45+4\frac1{20}\right)
=\frac12=\varepsilon.
$$

等号条件も満たし、最小値は $-\sqrt5$ です。
<!-- solution-end -->

### IG12-A05 三状態の負の自然勾配

3状態の正の分布 $p=(1/4,1/4,1/2)$、各状態の費用 $c=(0,2,3)$ とする。単体の Fisher 計量 $g_p(v,w)=\sum_i v_iw_i/p_i$ と損失 $L(p)=\sum_i p_ic_i$ について、負の自然勾配 $\dot p$ と損失の瞬間的な変化率 $\dot L$ を求めよ。

- Level: A
- 狙い: 確率の総和を保つ方向と損失の減少を同時に検証する

<!-- solution-start -->
**詳細解答**

平均費用は $\bar c=(1/4)0+(1/4)2+(1/2)3=2$ です。[正の確率単体の自然勾配と負エントロピー鏡映更新](#thm-ig12-simplex-mirror)により

$$
\dot p_i=-p_i(c_i-\bar c),
\qquad
\dot p=(1/2,0,-1/2).
$$

確かに成分和は $1/2+0-1/2=0$ です。損失の微分は

$$
\dot L=\sum_i c_i\dot p_i
=0(1/2)+2(0)+3(-1/2)=-\frac32.
$$

また分散の式からも

$$
-\sum_i p_i(c_i-\bar c)^2
=-\left\{\frac14(0-2)^2+\frac14(2-2)^2+\frac12(3-2)^2\right\}
=-\frac32
$$

となり一致します。
<!-- solution-end -->

### IG12-B01 厳密 KL 制約は近似より狭いか

Bernoulli($p$)、$0<p<1$ で現在点 $p_0=1/2$ とし、$L(p)=p$ を小さくしたい。厳密な制約

$$
D_{\mathrm{KL}}(\operatorname{Bern}(1/2)\Vert\operatorname{Bern}(p))
\le\frac18
$$

の最適点を求めよ。二次近似に基づく trust region の候補 $p_{\mathrm{quad}}$ がこの厳密制約を満たすかも判定せよ。

- Level: B
- 狙い: 二次 Taylor 近似から厳密な可行性を誤って結論しない

<!-- solution-start -->
**詳細解答**

KL を直接計算すると

$$
D_{\mathrm{KL}}(1/2\Vert p)
=\frac12\log\frac{1/2}{p}
+\frac12\log\frac{1/2}{1-p}
=-\frac12\log(4p(1-p)).
$$

従って制約は $4p(1-p)\ge e^{-1/4}$ です。$4p(1-p)=1-4(p-1/2)^2$ を使うと

$$
\left|p-\frac12\right|
\le\frac12\sqrt{1-e^{-1/4}}.
$$

$L(p)=p$ は単調増加なので最適点は左端

$$
p_{\mathrm{exact}}=\frac12-\frac12\sqrt{1-e^{-1/4}}
$$

です。これは正の開区間内にあります。一方、$p_0=1/2$ の Fisher 情報量は4なので、二次近似制約 $2(p-1/2)^2\le1/8$ の左端は $p_{\mathrm{quad}}=1/4$ です。候補を厳密 KL へ代入すると

$$
D_{\mathrm{KL}}(1/2\Vert1/4)
=-\frac12\log(3/4)
=\frac12\log(4/3)>\frac18.
$$

最後の不等式は $\log(4/3)>1/4$（例えば $\log(1+t)>t/(1+t)$ を $t=1/3$ に適用して $1/4$ を得る）から従います。よって二次近似候補は厳密制約を**満たしません**。
<!-- solution-end -->

### IG12-B02 区間制約つき鏡映更新

$0<p<1$ 上の負エントロピー $h(p)=p\log p+(1-p)\log(1-p)$ を用いる。現在点 $p_0=1/2$、実行可能集合 $C=[1/4,3/4]$、一次損失の係数 $a=\log3$、歩幅 $\tau=2$ とする。

$$
\min_{p\in C}\bigl\{\tau a p+D_h(p,p_0)\bigr\}
$$

の唯一の解を求めよ。制約がなければどうなるか、また制約付きの最適性不等式を確認せよ。

- Level: B
- 狙い: 双対変数の引き算と制約付き最適性を区別する

<!-- solution-start -->
**詳細解答**

一変数の Bregman divergence は $D_h(p,p_0)=p\log(p/p_0)+(1-p)\log((1-p)/(1-p_0))$ です。微分を計算すると

$$
\frac{d}{dp}\{\tau ap+D_h(p,p_0)\}
=2\log3+\log\frac{p}{1-p}-\log\frac{p_0}{1-p_0}.
$$

$p_0=1/2$ なので最後の項は0です。制約がないときの零点は

$$
\log\frac{p}{1-p}=-2\log3
\quad\Longrightarrow\quad
\frac{p}{1-p}=\frac19
\quad\Longrightarrow\quad p=\frac1{10},
$$

となり $C$ の外です。一方、目的関数の二階微分は $1/[p(1-p)]>0$ で、一次微分は単調増加です。左端 $p=1/4$ では

$$
F_\tau'(1/4)=2\log3+\log(1/3)=\log3>0.
$$

従って $C$ 上では $p$ が増えると目的関数も増え、唯一の最小点は $p^+=1/4$ です。[制約付き最適性不等式](#thm-ig12-mirror-natural)は任意の $z\in[1/4,3/4]$ について

$$
F_\tau'(p^+)(z-p^+)=\log3\,(z-1/4)\ge0
$$

となり直接確認できました。
<!-- solution-end -->

### IG12-B03 交差項を持つ Hessian 計量

$U=\mathbb R^2$、$\psi(x)=x_1^2+x_1x_2+x_2^2$、損失 $L(x)=3x_1$、現在点 $x=(0,0)$、歩幅 $\tau=1/3$ とする。Hessian が正定値であることを示し、制約なし mirror descent の一歩と Hessian 計量に関する Riemann 勾配方向を求めよ。通常の Euclid 勾配での一歩と比較せよ。

- Level: B
- 狙い: 非対角 Hessian の逆行列を実際に使い、局所一致が二次関数では厳密一致になることを確認する

<!-- solution-start -->
**詳細解答**

二階偏微分により

$$
H=\nabla^2\psi
=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

任意の非零ベクトル $w=(w_1,w_2)^{\mathsf T}$ に対して

$$
w^{\mathsf T}Hw=2w_1^2+2w_1w_2+2w_2^2
=(w_1+w_2)^2+w_1^2+w_2^2>0
$$

なので正定値です。行列式 $\det H=4-1=3$ は非零で、逆行列は

$$
H^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

$a=\nabla L=(3,0)^{\mathsf T}$ を掛けると Hessian 計量に関する Riemann 勾配は

$$
H^{-1}a=\frac13(6,-3)^{\mathsf T}=(2,-1)^{\mathsf T}.
$$

$\nabla\psi(x)=Hx$ であるため、[鏡映更新の最適性](#thm-ig12-mirror-natural)は $Hx^+=Hx-\tau a$ です。$x=0$、$\tau=1/3$ を代入すると

$$
x^+=-\frac13H^{-1}a=(-2/3,1/3)^{\mathsf T}.
$$

二次ポテンシャルなので Taylor の二次以降の剰余はなく、負の Riemann 勾配による Euler 更新と厳密一致します。一方、Euclid 勾配更新は $x-\tau a=(-1,0)^{\mathsf T}$ です。損失の同じ微分でも、長さを測る計量の違いが更新方向の第2成分に現れています。この $H$ は統計モデルの Fisher 計量としては指定していないため、自然勾配とは呼びません。
<!-- solution-end -->

### IG12-B04 同じ Fisher 計量、違う有限鏡映更新

Bernoulli($p$)、$0<p<1$ で $L(p)=p$、初期値 $p_0=1/2$、歩幅 $\tau=1/2$ とする。

1. 成功確率 $p$ を変数とし、負エントロピー $h(p)=p\log p+(1-p)\log(1-p)$ による mirror descent の一歩を求めよ。
2. logit $\theta=\log(p/(1-p))$ を変数とし、対数分配関数 $\psi(\theta)=\log(1+e^\theta)$ による mirror descent の一歩を確率表示へ戻せ。
3. 有限更新が異なっても微小方向が一致することを説明せよ。

- Level: B
- 狙い: Bregman のポテンシャルと KL の向きは座標選択と不可分であると理解する

<!-- solution-start -->
**詳細解答**

第1の更新では $h'(p)=\log(p/(1-p))$、$L'(p)=1$ です。[鏡映更新の双対変数条件](#thm-ig12-mirror-natural)から

$$
\log\frac{p_1}{1-p_1}
=\log\frac{p_0}{1-p_0}-\frac12
=-\frac12,
$$

従って

$$
p_1=\frac1{1+e^{1/2}}.
$$

第2では $\psi'(\theta)=p(\theta)$、$\partial_\theta L= (dp/d\theta)L'(p)=p(1-p)$ です。初期値 $\theta_0=0$ で微分は $1/4$ なので、鏡映条件は

$$
\psi'(\theta_1)=\psi'(\theta_0)-\frac12\frac14
=\frac12-\frac18=\frac38.
$$

$3/8\in(0,1)$ なので開区間の内部で $\theta_1=\log((3/8)/(5/8))=\log(3/5)$ を得られ、確率表示は $p_1'=3/8$ です。一般に $1/(1+e^{1/2})\ne3/8$ です。

ただし両ポテンシャルの Hessian は対応する座標で同じ Fisher 計量を表します。[自然勾配の座標変換則](#thm-ig12-coordinate-invariance)より、初期確率 $1/2$ での負の自然勾配は $-p(1-p)=-1/4$ です。第1の更新は Taylor 展開で $p_1=1/2-\tau/4+O(\tau^2)$、第2は $p_1'=1/2-\tau/4$（この点では厳密）です。有限の差は二次以降に現れます。
<!-- solution-end -->

### IG12-C01 三状態モデルで局所・有限・境界を総合する

結果集合 $\{1,2,3\}$ に対する正のカテゴリカル分布 $p=(p_1,p_2,p_3)$、$p_i>0$、$\sum_ip_i=1$ を考え、初期値 $p=(1/3,1/3,1/3)$、費用 $c=(0,1,3)$、損失 $L(p)=\sum_ip_ic_i$ とする。

1. 独立座標 $x=(p_1,p_2)$（$p_3=1-p_1-p_2$）で Fisher 行列 $G$ と損失の微分 $a$ を計算し、負の自然勾配を三成分で示せ。
2. この点での局所 KL trust region において $\varepsilon=7/144$ の最適接ベクトルを求め、その座標更新が正の単体に入ることを検算せよ。さらに $\varepsilon=7/9$ まで半径を拡大すると何が起こるか説明せよ。
3. 正の単体で負エントロピー $h(q)=\sum_iq_i\log q_i$ を用いる mirror descent を歩幅 $\tau=\log2$ で実行せよ。更新後の損失と、$\tau=0$ での初速度を求め、上の自然勾配と比較せよ。

- Level: C
- 狙い: 計量の導出、trust region の半径、負エントロピー更新、有限制約の限界を一つのモデルで接続する

<!-- solution-start -->
**詳細解答**

まず接ベクトルを $v=(v_1,v_2,v_3)$、$v_3=-v_1-v_2$ と表します。Fisher 長さを定義から展開すると

$$
\begin{aligned}
g_p(v,v)
&=\frac{v_1^2}{p_1}+\frac{v_2^2}{p_2}
+\frac{(v_1+v_2)^2}{p_3}\\
&=\left(\frac1{p_1}+\frac1{p_3}\right)v_1^2
+2\frac{v_1v_2}{p_3}
+\left(\frac1{p_2}+\frac1{p_3}\right)v_2^2.
\end{aligned}
$$

従って独立座標での行列は

$$
G=\begin{pmatrix}
1/p_1+1/p_3&1/p_3\\
1/p_3&1/p_2+1/p_3
\end{pmatrix}
=\begin{pmatrix}6&3\\3&6\end{pmatrix}
$$

です。行列式は $36-9=27>0$、第1主座小行列式は6なので正定値です。損失を $L(x)=c_3+(c_1-c_3)p_1+(c_2-c_3)p_2$ と書き直すと

$$
a=(c_1-c_3,c_2-c_3)^{\mathsf T}=(-3,-2)^{\mathsf T}.
$$

よって

$$
\begin{aligned}
G^{-1}&=\frac1{27}\begin{pmatrix}6&-3\\-3&6\end{pmatrix},\\
G^{-1}a&=(-4/9,-1/9)^{\mathsf T},\\
-\operatorname{grad}_g L
&=(4/9,1/9,-5/9).
\end{aligned}
$$

最後の第3成分は成分和0から決まり、[単体定理](#thm-ig12-simplex-mirror)の $-p_i(c_i-\bar c)$ と一致します。ここで $\bar c=(0+1+3)/3=4/3$ で、瞬間的な損失減少率は

$$
-\sum_i p_i(c_i-\bar c)^2
=-\left(\frac{16}{27}+\frac1{27}+\frac{25}{27}\right)
=-\frac{14}{9}.
$$

第2問では

$$
a^{\mathsf T}G^{-1}a
=(-3)(-4/9)+(-2)(-1/9)=\frac{14}{9}.
$$

[trust region 定理](#thm-ig12-trust-direction)の係数は、$\varepsilon=7/144$ で

$$
\sqrt{\frac{2\varepsilon}{a^{\mathsf T}G^{-1}a}}
=\sqrt{\frac{7/72}{14/9}}=\frac14.
$$

従って二つの独立成分の最適接ベクトルは $v_*=(1/9,1/36)$、第3成分は $-5/36$ です。三成分の和は0で、候補

$$
p+v_*=\left(\frac49,\frac{13}{36},\frac7{36}\right)
$$

はすべて正で総和1です。二次制約も

$$
\frac12v_*^{\mathsf T}Gv_*
=\frac12\left(\frac14\right)^2
a^{\mathsf T}G^{-1}a
=\frac12\frac1{16}\frac{14}{9}
=\frac7{144}
$$

と直接一致します。ただし、この検算は厳密な KL 制約の充足を保証しません。

$\varepsilon=7/9$ では係数が1となり、接ベクトルは $(4/9,1/9,-5/9)$ です。候補の第3成分は $1/3-5/9=-2/9<0$ です。**接空間の二次問題の解は、有限歩幅で確率単体を出てしまう**ことがあります。

第3問では[単体鏡映更新の定理](#thm-ig12-simplex-mirror)により $\tau=\log2$ で

$$
e^{-\tau c}=(1,1/2,1/8).
$$

初期成分がすべて $1/3$ なので、正規化前の比は $1:1/2:1/8=8:4:1$ です。従って

$$
p^+=\left(\frac8{13},\frac4{13},\frac1{13}\right),
\qquad
L(p^+)=\frac4{13}+\frac3{13}=\frac7{13}<\frac43=L(p).
$$

すべての成分は正で総和1を保ちます。$\tau=0$ での初速度は

$$
\left.\frac{dp_i^+}{d\tau}\right|_0
=-p_i(c_i-\bar c)
=\left(\frac49,\frac19,-\frac59\right),
$$

であり第1問の負の自然勾配に一致します。有限の指数重み更新は常に正の確率を返しますが、線形化した trust region の大きな接ベクトルは単体を出る。この差こそ、本章で区別した局所幾何と有限更新の差です。
<!-- solution-end -->

## この講のまとめ

- Fisher 計量が正定値なら $g(\operatorname{grad}_gL,v)=dL(v)$ により、自然勾配は一意に定まります。座標式は $G^{-1}\nabla L$ ですが、意味は接ベクトルです。
- 局所 KL の二次項は $\tfrac12v^{\mathsf T}Gv$ であり、その楕円体で一次損失を最小化すると負の自然勾配方向を得ます。半径と歩幅を決めるには別の条件が必要です。
- mirror descent は Bregman divergence を罰則にした有限更新です。正定値 Hessian の下では局所的に自然勾配へ一致しますが、制約・KL の向き・座標・有限歩幅には注意が必要です。
- 正の確率単体では負エントロピーによる指数重み更新が全成分を正に保ち、その初速度は Fisher 計量の自然勾配です。大域的な収束や境界での正則性は、これらの局所公式だけからは従いません。
