# SLT2-13 粒子測度による二層網

[前章の幅・時間極限](../SLT2-12/index.md#def-slt2-12-limit-orders)では、$1/\sqrt m$ 正規化の二層網で、ニューロンがほとんど動かない条件を調べた。しかし「多数のニューロンの**分布そのもの**が訓練で動く」状況を記述するには、別の幅の取り方が要る。多数の座標を一つずつ追わず、どのパラメータの位置にニューロンがどれだけいるかを追うのが本章の狙いである。

この章で達成することは次の五つである。

1. 二層網を粒子の経験確率測度の積分として正確に書く。
2. $1/m$ と $1/\sqrt m$ の初期出力の大きさを確率計算で比べる。
3. 粒子の速度が幅とともに消えない時間尺度を勾配から導く。
4. 有限幅の粒子運動から、測度の弱形式と損失減少を厳密に導く。
5. 動くGram行列と、無限幅の連続性方程式へ進むための停止線を理解する。

本章の計算は、**固定有限幅の常微分方程式**については厳密である。一方、極限測度の勾配流が実在するか、有限粒子がそれへ収束するかは、追加の仮定と証明を要する。この区別を最後まで保つ。

## 1. ニューロンを点の集まりとして見る

固定した入力 $x\in\mathbb R^d$ の切片を含めるため、$\xi(x)=(x^{\mathsf T},1)^{\mathsf T}\in\mathbb R^{d+1}$ とする。活性化関数を $\sigma:\mathbb R\to\mathbb R$ とし、一つのニューロンの出力係数 $a\in\mathbb R$、重み $w\in\mathbb R^{d+1}$ を組にしたパラメータ $\theta=(a,w)$ を考える。各粒子の予測寄与を

$$
\psi_x(\theta)=a\,\sigma(w^{\mathsf T}\xi(x))
$$

と書く。[以前の二層網](../SLT2-10/index.md#def-slt2-10-infinite-width-ntk)の $1/\sqrt m$ とは異なり、今は $m$ 個の寄与の**平均**

$$
f_m(x)=\frac1m\sum_{r=1}^m\psi_x(\theta_r)
$$

を学ぶ。この平均は、ニューロンのラベル $r$ を取り替えても不変である。そこでラベルの付いた点列を、位置と重みの情報だけを残した測度へ直す。

一つの点へ全質量を集中させる操作から始める。この点を含む集合には質量1、それ以外には質量0を与える。ここで粒子パラメータ空間 $\Theta=\mathbb R\times\mathbb R^{d+1}$ の可測集合は、開集合から補集合・可算和を使って生成されるBorel集合を指す。点そのものの値を取り出す積分が得られるので、離散的な粒子を測度で扱える。

<a id="def-slt2-13-dirac-measure"></a>

<!-- formal-statement-start -->
> **定義（Dirac確率測度）**
> $\Theta=\mathbb R\times\mathbb R^{d+1}$（$d\ge1$）の一点 $\theta\in\Theta$ に対して、可測集合 $A\subseteq\Theta$ へ

$$
\delta_\theta(A)=
\begin{cases}
1&(\theta\in A),\\
0&(\theta\notin A)
\end{cases}
$$

> を対応させる確率測度を、点 $\theta$ に集中するDirac確率測度とする。可積分な $g:\Theta\to\mathbb R$ について $\int g\,d\delta_\theta=g(\theta)$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-13-dirac-measure -->
**定義の確認**。$\theta=(2,(0,1))$、$\Theta=\mathbb R^3$ とし、$A=\{(a,w):a>0\}$、$B=\{(a,w):a<0\}$ と置く。$\theta\in A$、$\theta\notin B$ なので $\delta_\theta(A)=1$、$\delta_\theta(B)=0$。全空間は $\theta$ を含み質量1である。互いに素な可測集合列 $A_1,A_2,\ldots$ について $\theta$ が入る集合は高々一つだから、

$$
\delta_\theta\left(\bigcup_k A_k\right)=\sum_k\delta_\theta(A_k)
$$

となり、確率測度に必要な可算加法性も満たす。また、$g(a,w)=a^2$ なら積分は $g(\theta)=4$ であり、積分を複数の点について足す必要はない。
<!-- definition-example-end -->

これを各ニューロンに質量 $1/m$ ずつ配る。各[Dirac確率測度](#def-slt2-13-dirac-measure)の可算加法性は非負の有限和でも保たれ、係数の和が1なので全質量も1となる。積分は有限個の原子について具体的な有限和として計算できる。

<a id="def-slt2-13-empirical-measure"></a>

<!-- formal-statement-start -->
> **定義（経験粒子測度と二層網の積分表示）**
> $d,m\ge1$、パラメータ空間 $\Theta=\mathbb R\times\mathbb R^{d+1}$、粒子 $\theta_1,\ldots,\theta_m\in\Theta$ とする。経験粒子測度は、$\Theta$ 上の確率測度

$$
\mu_m=\frac1m\sum_{r=1}^m\delta_{\theta_r}
$$

> である。入力 $x\in\mathbb R^d$ に対し、$\psi_x(a,w)=a\sigma(w^{\mathsf T}\xi(x))$ とする。一般の確率測度 $\mu$ で $\int_\Theta|\psi_x|\,d\mu<\infty$ が成り立つとき、測度による二層網出力を

$$
f_\mu(x)=\int_\Theta\psi_x(\theta)\,\mu(d\theta)
$$

> と定める。有限個の粒子に対しては、$f_{\mu_m}(x)=m^{-1}\sum_{r=1}^m\psi_x(\theta_r)$ が恒等的に成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-13-empirical-measure -->
**定義の確認**。$d=1$、入力 $x=0$ で $\xi(0)=(0,1)^{\mathsf T}$、$\sigma(z)=z$ とする。二粒子を $\theta_1=(a=2,w=(0,1))$、$\theta_2=(a=-1,w=(0,3))$ と置く。経験測度は $(\delta_{\theta_1}+\delta_{\theta_2})/2$ で、任意の集合 $A$ の質量は $[\boldsymbol1_A(\theta_1)+\boldsymbol1_A(\theta_2)]/2\ge0$、全空間の質量は $2/2=1$ である。二つの特徴値は $2\cdot1=2$ と $(-1)\cdot3=-3$ で有限だから可積分であり、

$$
f_{\mu_2}(0)=\frac12\int\psi_0\,d\delta_{\theta_1}
+\frac12\int\psi_0\,d\delta_{\theta_2}
=\frac12(2-3)=-\frac12.
$$

負の出力になっても、測度の質量は負にならない。**符号は $a$ が担い、確率測度の質量は常に非負**だからである。
<!-- definition-example-end -->

$\theta_1=\theta_2$ の場合も、$\mu_2=\delta_{\theta_1}$ となり質量が2になったりはしない。幅が変わっても総質量1という正規化があるため、測度を比較する土台ができる。

## 2. なぜ幅で割るか：二つのスケーリング

初期化時に、同じ入力 $x$ における寄与 $U_r=\psi_x(\theta_r(0))$ が独立同分布だとし、平均 $\nu$ と有限分散 $v$ を持つとする。平均で作る網は、大数の法則に沿って出力が安定する。一方、前章までの $1/\sqrt m$ は、中心化された和の**揺らぎ**を残すための規格化である。

<a id="thm-slt2-13-width-scalings"></a>

<!-- formal-statement-start -->
> **定理（二つの幅スケーリングの初期出力）**
> 実確率変数 $U_1,U_2,\ldots$ は独立同分布で、$\mathbb EU_r=\nu$、$\operatorname{Var}(U_r)=v<\infty$ とする。$M_m=m^{-1}\sum_{r=1}^m U_r$ と $N_m=m^{-1/2}\sum_{r=1}^m(U_r-\nu)$ に対し

$$
\mathbb E M_m=\nu,\qquad
\operatorname{Var}(M_m)=\frac vm,\qquad
\mathbb E N_m=0,\qquad
\operatorname{Var}(N_m)=v.
$$

> よって $\mathbb E|M_m-\nu|^2\to0$ であり、さらに $v>0$ なら $N_m$ は平均0・分散 $v$ の正規分布へ分布収束する。後者は中心極限定理を使用する結論であり、定数への確率収束ではない。
<!-- formal-statement-end -->

### 証明の見取り図

独立性から共分散の交差項が零となり、和の分散は $mv$。平均と中心化和は分母がそれぞれ $m^2$、$m$ になる。極限分布については[前章までに使った独立和のGaussian極限](../SLT2-11/index.md#thm-slt2-11-initial-gp)と同じ中心極限定理を一入力へ適用する。

<!-- proof-start -->
### 証明

線形性により $\mathbb E\sum_rU_r=m\nu$。また独立性より $r\ne s$ で $\operatorname{Cov}(U_r,U_s)=0$ であり、

$$
\operatorname{Var}\left(\sum_{r=1}^mU_r\right)
=\sum_{r=1}^m\operatorname{Var}(U_r)
+2\sum_{r<s}\operatorname{Cov}(U_r,U_s)=mv.
$$

従って各分母で割ればステートメントの4式を得る。さらに

$$
\mathbb E|M_m-\nu|^2
=\operatorname{Var}(M_m)=v/m\longrightarrow0
$$

なので平均二乗誤差は零へ向かう。$v>0$ なら、$V_r=(U_r-\nu)/\sqrt v$ は独立同分布で平均0、分散1。独立同分布の中心極限定理を $m^{-1/2}\sum_rV_r$ に適用すると標準正規分布へ収束し、$\sqrt v$ 倍すれば $N_m$ の結論となる。$v=0$ なら $U_r=\nu$ がほとんど確実なので両方とも確定的である。$\square$
<!-- proof-end -->

例えば $U_r=1,-1$ が各確率 $1/2$ なら、$\nu=0,v=1$。幅4でも $M_4$ の標準偏差は $1/2$ だが、$N_4$ は1である。[NNGPとNTKの区別](../SLT2-11/index.md#def-slt2-11-contrast)を思い出そう。$1/\sqrt m$ 網を中心化せず $\nu\ne0$ とすると、期待出力は $\sqrt m\nu$ となって発散しうる。**両スケーリングは単なる書式の違いではない。**

なお、この定理は**初期時刻の固定入力での**結果である。粒子が学習中に相関を持つ場合、そのまま独立性を再適用できない。

## 3. 粒子が動く時間尺度を計算する

$n\ge1$ 個の固定訓練入力 $x_i\in\mathbb R^d$ と教師 $y_i\in\mathbb R$ を取り、$F_i(\theta_1,\ldots,\theta_m)=f_{\mu_m}(x_i)$、残差 $e_i=F_i-y_i$ とする。二乗損失は

$$
\mathcal L_m(\theta_1,\ldots,\theta_m)
=\frac1{2n}\sum_{i=1}^n e_i^2.
$$

ここで $1/n$ を消さない。[以前のNTK勾配流](../SLT2-10/index.md#thm-slt2-10-finite-time-flow)とは損失の規格化も明示して比べる。

以下、$\nabla_{\theta_r}\mathcal L_m$ は他の粒子を固定して第 $r$ 粒子の $d+2$ 座標で取る勾配とする。一方、$\nabla_\theta V(\theta;\mu)$ は測度 $\mu$ を固定して仮の引数 $\theta$ だけで取る勾配である。時間微分の点記法 $\dot\theta_r=d\theta_r/dt$ は、これらの粒子座標に関する勾配とは区別する。

粒子にかかる力を一つの関数で書くため、**粒子ポテンシャル** $V(\theta;\mu)$ を、測度 $\mu$ による各訓練点の残差と、仮の粒子 $\theta$ の寄与の内積平均として作る。$\mu$ はここでは微分の間固定する。

<a id="def-slt2-13-particle-potential"></a>

<!-- formal-statement-start -->
> **定義（粒子ポテンシャルと加速勾配流）**
> $d,m,n\ge1$、固定訓練集合 $(x_i,y_i)_{i=1}^n$（$x_i\in\mathbb R^d$）、$\sigma\in C^1(\mathbb R)$ を取る。$\Theta=\mathbb R\times\mathbb R^{d+1}$ の粒子を $\theta_r=(a_r,w_r)$ とし、経験測度を $\mu_m=m^{-1}\sum_r\delta_{\theta_r}$ とする。
> $\xi(x)=(x^{\mathsf T},1)^{\mathsf T}$、$\psi_{x_i}(a,w)=a\sigma(w^{\mathsf T}\xi(x_i))$、残差 $e_i(\mu)=f_\mu(x_i)-y_i$ を使い、

$$
V(\theta;\mu)=\frac1n\sum_{i=1}^n e_i(\mu)\psi_{x_i}(\theta)
$$

> と置く（$\theta$ に関する微分では $\mu$ を固定する）。時刻 $t$ における**加速粒子勾配流**は、有限幅損失 $\mathcal L_m=(2n)^{-1}\sum_i e_i(\mu_m)^2$ の勾配を用いた常微分方程式

$$
\frac{d\theta_r}{dt}
=-m\nabla_{\theta_r}\mathcal L_m
=-\nabla_\theta V(\theta_r;\mu_m),
\qquad 1\le r\le m
$$

> である。$t$ は未加速Euclid勾配流の時間を $m$ 倍進めた時間であり、この方程式での粒子速度は幅 $m$ による自明な $1/m$ 減衰を持たない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-13-particle-potential -->
**定義の確認**。$d=1$、訓練入力 $x=0$、$y=1$、$\sigma(z)=z$ とする。$\xi(0)=(0,1)^{\mathsf T}$ だから、重みを $(0,w)$ に固定した部分模型では $\psi(a,w)=aw$ となる（入力重みの勾配は $x=0$ のため零で、流れはこの部分空間を保つ）。二粒子を $(a_1,w_1)=(1,1)$、$(a_2,w_2)=(0,2)$ とすると $F=(1+0)/2=1/2$、$e=-1/2$ である。したがって

$$
V(a,w;\mu_2)=-\frac12aw,\qquad
-\nabla V(a,w;\mu_2)=\left(\frac w2,\frac a2\right).
$$

粒子の速度はそれぞれ $(1/2,1/2)$、$(1,0)$。この例で微分の対象は仮の座標 $(a,w)$ だけであり、$e$ を再び微分してはならない。$e$ の粒子依存性は、**全損失**を粒子座標で微分するときにすでに計上される。
<!-- definition-example-end -->

一般の粒子座標で、$\sigma'(z)$ は活性化関数の導関数である。積・連鎖律により

$$
\nabla_\theta\psi_{x_i}(a,w)
=\begin{pmatrix}
\sigma(w^{\mathsf T}\xi_i)\\
a\,\sigma'(w^{\mathsf T}\xi_i)\xi_i
\end{pmatrix},
\qquad \xi_i=\xi(x_i).
$$

この一行の下段には $\nabla_w(w^{\mathsf T}\xi_i)=\xi_i$ を使っている。粒子が $m$ 個あっても、この局所式に $m$ は登場しない。

<a id="thm-slt2-13-particle-risk"></a>

<!-- formal-statement-start -->
> **定理（加速粒子勾配流の厳密な変分式と損失減少）**
> $m,n,d\ge1$、$\sigma\in C^2(\mathbb R)$、固定訓練集合 $(x_i,y_i)_{i=1}^n$（$x_i\in\mathbb R^d$）、$\Theta=\mathbb R\times\mathbb R^{d+1}$ の粒子 $\theta_r=(a_r,w_r)$ を取る。
> $\xi_i=(x_i^{\mathsf T},1)^{\mathsf T}$、$\mu_m=m^{-1}\sum_r\delta_{\theta_r}$ とする。各訓練点の寄与は $\psi_{x_i}(a,w)=a\sigma(w^{\mathsf T}\xi_i)$、残差は $e_i=f_{\mu_m}(x_i)-y_i$ である。損失と粒子ポテンシャルを

$$
\mathcal L_m=\frac1{2n}\sum_{i=1}^n e_i^2,
\qquad V(\theta;\mu_m)=\frac1n\sum_{i=1}^n e_i\psi_{x_i}(\theta)
$$

> とする。この損失を粒子座標で微分すると

$$
\nabla_{\theta_r}\mathcal L_m
=\frac1m\nabla_\theta V(\theta_r;\mu_m)
=\frac1{nm}\sum_{i=1}^n e_i
\begin{pmatrix}\sigma(w_r^{\mathsf T}\xi_i)\\
a_r\sigma'(w_r^{\mathsf T}\xi_i)\xi_i\end{pmatrix}.
$$

> 加速流 $\dot\theta_r=-m\nabla_{\theta_r}\mathcal L_m$ の任意の局所解上で、時刻について

$$
\frac{d\mathcal L_m}{dt}
=-\frac1m\sum_{r=1}^m
\left\|\nabla_\theta V(\theta_r;\mu_m)\right\|_2^2
=-m\sum_{r=1}^m\left\|\nabla_{\theta_r}\mathcal L_m\right\|_2^2
\le0
$$

> が成立する。ここから全時間の解の存在、最小値への収束、または大域最適性までは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

一粒子の変更は予測平均の $1/m$ だけを変える。その寄与に二乗損失の残差微分 $e_i/n$ を掛け合わせる。続いて全粒子について連鎖律を用い、速度の定義を代入すると負の平方和が出る。

<!-- proof-start -->
### 証明

$F_i=m^{-1}\sum_s\psi_{x_i}(\theta_s)$ なので、$\theta_r$ で偏微分したとき $s\ne r$ の寄与は定数となり、

$$
\nabla_{\theta_r}F_i=\frac1m\nabla_\theta\psi_{x_i}(\theta_r).
$$

$\mathcal L_m=(2n)^{-1}\sum_i(F_i-y_i)^2$ に連鎖律を適用すると

$$
\begin{aligned}
\nabla_{\theta_r}\mathcal L_m
&=\frac1{2n}\sum_i2(F_i-y_i)\nabla_{\theta_r}F_i\\
&=\frac1{nm}\sum_i e_i\nabla_\theta\psi_{x_i}(\theta_r)\\
&=\frac1m\nabla_\theta V(\theta_r;\mu_m).
\end{aligned}
$$

最後の等号では $V$ の第一引数 $\theta$ のみを微分し、残差係数は固定した。同じ時刻の実際の $e_i$ を代入するので等号は有限幅で厳密である。

$\sigma\in C^2$ なら有限次元の勾配場は局所Lipschitzであり、初期粒子から少なくとも局所解が存在する。その局所解の存在区間で

$$
\begin{aligned}
\frac{d\mathcal L_m}{dt}
&=\sum_{r=1}^m
\nabla_{\theta_r}\mathcal L_m\cdot\dot\theta_r\\
&=-m\sum_{r=1}^m\|\nabla_{\theta_r}\mathcal L_m\|_2^2\\
&=-\frac1m\sum_{r=1}^m\|\nabla_\theta V(\theta_r;\mu_m)\|_2^2.
\end{aligned}
$$

右辺は各平方ノルムの負の和なので非正である。$\square$
<!-- proof-end -->

$1/m$ 正規化の網を**未加速**のEuclid勾配流で学習すれば $\dot\theta_r=-\nabla V/m$ で、有限時間の粒子移動は一般に幅が大きいほど遅い。加速流は単位時間当たりの学習を合わせるための選択で、確率測度の任意の勾配流を自動的に与えるという意味ではない。

## 4. 粒子の運動を測度の運動へ翻訳する

分布の形を一つの数で観測するには、粒子座標を入力とする滑らかな実数値関数 $\varphi$ を選び、その平均 $\int\varphi\,d\mu_m$ を計算すればよい。たとえば $\varphi(a,w)=a$ は出力係数の平均、$\varphi(a,w)=a^2$ は二乗平均を観測する。本章では滑らかなものに限定して考える。

<a id="def-slt2-13-test-function"></a>

<!-- formal-statement-start -->
> **定義（有限粒子の試験関数）**
> パラメータ空間 $\Theta=\mathbb R\times\mathbb R^{d+1}$ と、その上の有限粒子の $C^1$ 軌道 $\theta_r:I\to\Theta$ を固定する。本章では $\varphi\in C^1(\Theta;\mathbb R)$ を、経験測度 $\mu_m(t)=m^{-1}\sum_r\delta_{\theta_r(t)}$ の運動を観測する試験関数とする。観測量は

$$
\langle\varphi,\mu_m(t)\rangle
=\int_\Theta\varphi(\theta)\,\mu_m(t,d\theta)
=\frac1m\sum_{r=1}^m\varphi(\theta_r(t))
$$

> と定める。ここでは有限和なので、$\varphi$ とその勾配が各粒子位置で有限なら積分が定まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-13-test-function -->
**定義の確認**。$\varphi(a,w)=a^2$ は多項式ゆえ全空間で $C^1$ であり、勾配は $(2a,0,\ldots,0)$。二粒子の出力係数が $a_1=1,a_2=3$ なら、観測量は $(1^2+3^2)/2=5$ で有限となる。有限和で値を求めたので、無限測度に対する余分な積分条件は不要である。
<!-- definition-example-end -->

時間とともに動く経験測度 $\mu_m(t)=m^{-1}\sum_r\delta_{\theta_r(t)}$ を、粒子の有限和を微分することによって追う。弱形式とは、測度自体を点ごとに微分する代わりに、**あらゆる試験関数との積分を微分した等式**で運動を表す方法である。

<a id="prop-slt2-13-weak-form"></a>

<!-- formal-statement-start -->
> **命題（経験粒子測度の弱形式）**
> $\sigma\in C^2(\mathbb R)$、有限訓練集合と $m\ge1$ 個の粒子について、[加速粒子勾配流](#thm-slt2-13-particle-risk)の $C^1$ 解がある時間区間 $I$ に存在するとする。$\mu_m(t)=m^{-1}\sum_r\delta_{\theta_r(t)}$ と置けば、[試験関数](#def-slt2-13-test-function) $\varphi\in C^1(\Theta;\mathbb R)$ の任意のものについて $t\in I$ で

$$
\frac d{dt}\int_\Theta\varphi(\theta)\,\mu_m(t,d\theta)
=-\int_\Theta\nabla\varphi(\theta)\cdot
\nabla_\theta V(\theta;\mu_m(t))\,\mu_m(t,d\theta).
$$

> 特に $\varphi\equiv1$ では総質量1が保たれる。この等式は、有限粒子系の**厳密な恒等式**である。
<!-- formal-statement-end -->

### 証明の見取り図

測度の積分は有限和に戻る。各項を連鎖律で微分し、粒子速度を代入し、最後に再び積分記号へ戻す。

<!-- proof-start -->
### 証明

[Dirac確率測度](#def-slt2-13-dirac-measure)を用いると、各時刻で

$$
\int_\Theta\varphi(\theta)\,\mu_m(t,d\theta)
=\frac1m\sum_{r=1}^m\varphi(\theta_r(t)).
$$

和は有限で、各 $\theta_r$ と $\varphi$ は $C^1$ なので、項別微分と多変数の連鎖律が使える。従って

$$
\begin{aligned}
\frac d{dt}\frac1m\sum_{r=1}^m\varphi(\theta_r(t))
&=\frac1m\sum_{r=1}^m
\nabla\varphi(\theta_r(t))\cdot\dot\theta_r(t)\\
&=-\frac1m\sum_{r=1}^m
\nabla\varphi(\theta_r(t))\cdot
\nabla_\theta V(\theta_r(t);\mu_m(t))\\
&=-\int_\Theta\nabla\varphi\cdot\nabla_\theta V\,d\mu_m(t).
\end{aligned}
$$

$\varphi=1$ のとき $\nabla\varphi=0$ なので時間微分は零。初期質量は1である。$\square$
<!-- proof-end -->

**有限二粒子で検算する。** 前節の $\psi(a,w)=aw$、二粒子 $(1,1),(0,2)$、$y=1$ の模型では $\varphi(a,w)=a$ とすると左辺は $(\dot a_1+\dot a_2)/2=(1/2+1)/2=3/4$。右辺も $-\frac12[(1,0)\cdot(-1/2,-1/2)+(1,0)\cdot(-1,0)]=3/4$。測度の式は「高級な近似」ではなく、現時点では有限個の粒子運動を別の言葉に書き直しただけである。

粒子速度を $v(\theta,\mu)=-\nabla_\theta V(\theta;\mu)$ と記せば、弱形式の右辺は $\int\nabla\varphi\cdot v\,d\mu_m$ となる。形式的な部分積分を行うと $\partial_t\mu+\nabla_\theta\cdot(\mu v)=0$ という**連続性方程式**が候補になる。ただし非有界な $\Theta$ で境界項を消せるか、測度の極限を交換できるか、解が存在・一意かは本命題だけでは証明されない。これらは次章で扱う。

## 5. 予測の動くGram行列

粒子測度で表した予測値も、粒子の速度を通じて変化する。固定訓練入力における特徴勾配の内積を平均して、$n\times n$ 行列を作る。これは粒子の各方向への小さな移動が、予測値をどう動かすかを表す。

<a id="prop-slt2-13-moving-gram"></a>

<!-- formal-statement-start -->
> **命題（動く粒子Gram行列の残差方程式）**
> $\sigma\in C^2(\mathbb R)$ と有限訓練集合 $(x_i,y_i)_{i=1}^n$ を固定し、$m$ 粒子の加速勾配流 $\dot\theta_r=-\nabla_\theta V(\theta_r;\mu_m)$ がある時間区間で存在するとする。$e_i(t)=f_{\mu_m(t)}(x_i)-y_i$ とし、行列 $G_m(t)$ の成分を

$$
(G_m(t))_{ij}
=\frac1m\sum_{r=1}^m
\nabla_\theta\psi_{x_i}(\theta_r(t))
\cdot\nabla_\theta\psi_{x_j}(\theta_r(t))
$$

> と定めると、$G_m(t)$ は対称正半定値で、残差ベクトル $e=(e_1,\ldots,e_n)^{\mathsf T}$ は

$$
\dot e(t)=-\frac1n G_m(t)e(t),\qquad
\frac{d\mathcal L_m}{dt}
=-\frac1{n^2}e(t)^{\mathsf T}G_m(t)e(t)
$$

> を満たす。$G_m(t)$ が学習中に一定であるとは主張していない。
<!-- formal-statement-end -->

### 証明の見取り図

予測の時間微分に連鎖律を使い、粒子速度へ残差の線形結合を代入する。二つの特徴勾配の内積が現れる。正半定値性はベクトルの二乗和から分かる。

<!-- proof-start -->
### 証明

$y_i$ は固定なので $\dot e_i=\dot F_i$。有限和の時間微分から

$$
\begin{aligned}
\dot F_i
&=\frac1m\sum_r\nabla_\theta\psi_{x_i}(\theta_r)\cdot\dot\theta_r\\
&=-\frac1m\sum_r\nabla_\theta\psi_{x_i}(\theta_r)
\cdot\left[\frac1n\sum_{j=1}^n e_j\nabla_\theta\psi_{x_j}(\theta_r)\right]\\
&=-\frac1n\sum_{j=1}^n(G_m)_{ij}e_j.
\end{aligned}
$$

内積は対称だから $G_m^{\mathsf T}=G_m$。任意の $c\in\mathbb R^n$ について、和の順序を有限和として交換すれば

$$
\begin{aligned}
c^{\mathsf T}G_mc
&=\frac1m\sum_r\sum_{i,j}c_ic_j
\nabla\psi_{x_i}(\theta_r)\cdot\nabla\psi_{x_j}(\theta_r)\\
&=\frac1m\sum_r\left\|\sum_{i=1}^n c_i
\nabla\psi_{x_i}(\theta_r)\right\|_2^2\ge0.
\end{aligned}
$$

最後に $\mathcal L_m=\|e\|_2^2/(2n)$ を微分すると、

$$
\frac{d\mathcal L_m}{dt}
=\frac1n e^{\mathsf T}\dot e
=-\frac1{n^2}e^{\mathsf T}G_me.
$$

この値が[粒子速度の平方和](#thm-slt2-13-particle-risk)と一致するのは、$G_m$ の定義を展開すれば $n^{-2}e^{\mathsf T}G_me=m^{-1}\sum_r\|\nabla V(\theta_r;\mu_m)\|^2$ となるためである。$\square$
<!-- proof-end -->

同じ粒子配置での[NTK Gramの定義](../SLT2-08/index.md#def-slt2-08-ntk)と形が似るのは当然である。ただし $1/m$ 網の元のJacobianを $J_{ir}=m^{-1}\nabla\psi_{x_i}(\theta_r)$ とブロック表示すると、$JJ^{\mathsf T}=G_m/m$。一方、$1/\sqrt m$ 網なら $JJ^{\mathsf T}=G_m$。したがって**加速時間**と**出力正規化**を合わせず、両方の動力学を同じ固定核模型と呼ぶのは誤りである。

### 二粒子計算で三つの式を照合する

$n=1$、$\psi(a,w)=aw$、$y=1$、粒子 $(1,1),(0,2)$ で $F=1/2$、$e=-1/2$ であった。特徴勾配は順に $(w,a)=(1,1),(2,0)$ だから

$$
G_2=\frac12[(1^2+1^2)+(2^2+0^2)]=3.
$$

残差速度は $-G_2e=3/2$。直接微分しても、

$$
\dot F=\frac12(\dot a_1w_1+a_1\dot w_1
+\dot a_2w_2+a_2\dot w_2)
=\frac12\left(\frac12+\frac12+2+0\right)=\frac32.
$$

さらに損失の時間微分は $e\dot e=(-1/2)(3/2)=-3/4$。粒子速度の平方和からも

$$
-\frac12\left[\left(\frac12\right)^2
+\left(\frac12\right)^2+1^2+0^2\right]=-\frac34
$$

と一致する。幅2の時点で、残差方程式、測度の弱形式、損失減少が互いに矛盾しないことを確認できた。

## 6. 極限をとるときの落とし穴

粒子測度が「弱く収束する」とは、有界連続な試験関数 $\varphi$ に対する積分 $\int\varphi\,d\mu_m$ が極限測度に対する積分へ収束することをいう。これは便利だが、$\psi_x(a,w)=a\sigma(w^{\mathsf T}\xi(x))$ は一般に**非有界**であり、弱収束の定義だけでは予測の積分を通せない。

反例は一点入力、$\psi(a,w)=aw$ で作れる。$m-1$ 粒子を $(0,0)$、残る1粒子を $(m,1)$ に置くと

$$
\mu_m=\left(1-\frac1m\right)\delta_{(0,0)}
+\frac1m\delta_{(m,1)}.
$$

有界連続 $\varphi$ について

$$
\left|\int\varphi\,d\mu_m-\varphi(0,0)\right|
=\frac1m|\varphi(m,1)-\varphi(0,0)|
\le\frac{2\|\varphi\|_\infty}{m}\to0,
$$

ゆえに $\mu_m$ は $\delta_{(0,0)}$ へ弱収束する。しかし

$$
\int aw\,d\mu_m=\frac1m(m\cdot1)=1,
\qquad
\int aw\,d\delta_{(0,0)}=0.
$$

小さい質量が遠くへ逃げると、その非常に大きな特徴値が積分に残る。**失った仮定**は、弱収束の定義には含まれない、非有界な特徴値の裾に対する一様な積分制御である。核の式にはさらに導関数の積が現れるため、その収束には別の制御も要る。

次章で連続性方程式を真の極限として使うには、少なくとも対象時間窓での粒子の存在、測度列の適切なコンパクト性、特徴と速度の積分の極限交換、極限方程式の解の意味を確認しなければならない。ここから非凸の学習損失が必ず大域最小値へ到達するという結論も出ない。

**本章のまとめ。** $1/m$ の二層網は「粒子分布の平均」を予測に使う。粒子速度が消えないよう勾配流を $m$ 倍すると、経験測度の弱形式と動くGram方程式が有限幅で厳密に成立する。その形式を無限幅の方程式へ移すには、数式の見た目だけでなく、収束・可積分性・時間尺度の証明が要る。

---

## 演習

### SLT2-13-A01 経験測度と総質量
- Level: A
- 目安時間: 12分

$\Theta=\mathbb R$ に3粒子 $\theta_1=0,\theta_2=2,\theta_3=2$ を置く。$\mu_3$ の集合 $\{2\}$ と全空間への質量を求め、試験関数 $\varphi(\theta)=\theta^2$ の積分を計算せよ。重複粒子をどう扱うかも説明せよ。

<!-- solution-start -->
#### 詳細解答

[経験粒子測度と二層網の積分表示](#def-slt2-13-empirical-measure)を使うと $\mu_3=(\delta_0+\delta_2+\delta_2)/3=(\delta_0+2\delta_2)/3$。したがって

$$
\mu_3(\{2\})=\frac23,\qquad
\mu_3(\Theta)=\frac13+\frac23=1.
$$

積分は各Dirac測度での評価値の平均なので

$$
\int\theta^2\,d\mu_3
=\frac{0^2+2^2+2^2}{3}=\frac83.
$$

同じ位置の粒子はその位置の質量として合算する。質量は3にならず1を保つ。
<!-- solution-end -->

### SLT2-13-A02 初期出力の分散
- Level: A
- 目安時間: 13分

独立同分布な $U_r\in\{-2,2\}$ がそれぞれ確率 $1/2$ を取る。$m=16$ で $M_m=m^{-1}\sum_rU_r$ と $N_m=m^{-1/2}\sum_rU_r$ の平均・分散・標準偏差を求めよ。

<!-- solution-start -->
#### 詳細解答

$\mathbb EU_r=(-2+2)/2=0$、$\mathbb EU_r^2=(4+4)/2=4$ だから分散も4。独立性から和の分散は $16\cdot4=64$。ゆえに

$$
\mathbb EM_{16}=0,\quad
\operatorname{Var}(M_{16})=\frac{64}{16^2}=\frac14,\quad
\operatorname{sd}(M_{16})=\frac12,
$$

$$
\mathbb EN_{16}=0,\quad
\operatorname{Var}(N_{16})=\frac{64}{16}=4,\quad
\operatorname{sd}(N_{16})=2.
$$

同じ標本和でも規格化を変えると幅16で揺らぎの尺度が4倍違う。
<!-- solution-end -->

### SLT2-13-A03 一粒子の座標勾配
- Level: A
- 目安時間: 12分

$d=1$、$\xi(x)=(x,1)^{\mathsf T}$、$\sigma(z)=z^2$、$\theta=(a,w_1,w_0)$ とする。$\psi_x(\theta)$ とその三座標に関する勾配を求め、$x=1,a=2,w_1=1,w_0=-1$ で評価せよ。

<!-- solution-start -->
#### 詳細解答

$z=w_1x+w_0$ と置くと $\psi_x=a z^2$。積・連鎖律で

$$
\nabla_\theta\psi_x
=\left(z^2,\,2azx,\,2az\right).
$$

指定値では $z=1-1=0$、よって $\psi_1=0$、$\nabla_\theta\psi_1=(0,0,0)$。ただし $z=0$ の一点で勾配が零でも、他の入力や粒子で同じとは限らない。
<!-- solution-end -->

### SLT2-13-A04 未加速と加速の時間
- Level: A
- 目安時間: 12分

粒子勾配が $\nabla_{\theta_r}\mathcal L_m=q_r/m$ と表されるとする（$q_r$ は現在の粒子配置の関数）。未加速勾配流と[加速粒子勾配流](#def-slt2-13-particle-potential)の速度を書き、両者が同じ初期値から始まるとき、時刻をどう対応させれば同じ粒子軌道になるかを示せ。

<!-- solution-start -->
#### 詳細解答

未加速時刻を $s$ として $d\theta_r/ds=-q_r/m$、加速時刻を $t$ として $d\theta_r/dt=-q_r$ である。未加速解を $\theta^{\mathrm{slow}}(s)$ とすると、$\theta^{\mathrm{fast}}(t)=\theta^{\mathrm{slow}}(mt)$ について連鎖律から

$$
\frac d{dt}\theta^{\mathrm{slow}}(mt)
=m\left[-\frac1m q_r(\theta^{\mathrm{slow}}(mt))\right]
=-q_r(\theta^{\mathrm{fast}}(t)).
$$

したがって同じ初期値・局所一意性の範囲ではこの時間変換で軌道が一致する。加速時刻 $t$ は未加速時刻 $s=mt$ に対応する。
<!-- solution-end -->

### SLT2-13-A05 粒子Gramの正半定値性
- Level: A
- 目安時間: 14分

$n=2,m=1$ とし、ある粒子で二訓練点の特徴勾配が $u_1=(1,2)$、$u_2=(2,4)$ である。[粒子Gram行列](#prop-slt2-13-moving-gram) $G=(u_i\cdot u_j)_{i,j=1}^2$ を計算し、任意の $c=(c_1,c_2)$ に対する $c^{\mathsf T}Gc$ と零固有値方向を求めよ。

<!-- solution-start -->
#### 詳細解答

内積を取ると

$$
G=\begin{pmatrix}5&10\\10&20\end{pmatrix}.
$$

$u_2=2u_1$ なので $c_1u_1+c_2u_2=(c_1+2c_2)u_1$。従って

$$
c^{\mathsf T}Gc=\|c_1u_1+c_2u_2\|^2
=5(c_1+2c_2)^2\ge0.
$$

$(c_1,c_2)=(-2,1)$ 方向では値が零で、実際に $G(-2,1)^{\mathsf T}=0$。正半定値でも正定値とは限らない。
<!-- solution-end -->

### SLT2-13-B01 予測速度を二通りで求める
- Level: B
- 目安時間: 20分

入力1点、教師 $y=1$、$\psi(a,w)=aw$ とする。二粒子を $(1,1)$ と $(0,2)$ で初期化し、加速粒子勾配流の初期速度、予測値の初期速度、損失の初期時間微分を、(a) 粒子の連鎖律、(b) [粒子Gram行列の残差方程式](#prop-slt2-13-moving-gram)で独立に求めて照合せよ。

<!-- solution-start -->
#### 詳細解答

予測は $F=(1\cdot1+0\cdot2)/2=1/2$、残差は $e=-1/2$。$V(a,w)=eaw=-aw/2$ なので粒子速度は

$$
(\dot a_1,\dot w_1)=\left(\frac12,\frac12\right),
\qquad(\dot a_2,\dot w_2)=(1,0).
$$

(a) 積の微分を各粒子に適用すると

$$
\dot F=\frac12[(\dot a_1w_1+a_1\dot w_1)
+(\dot a_2w_2+a_2\dot w_2)]
=\frac12\left(\frac12+\frac12+2+0\right)=\frac32.
$$

$\mathcal L=e^2/2$ より $d\mathcal L/dt=e\dot F=-3/4$。

(b) 特徴勾配は $(1,1),(2,0)$。したがって $G=(2+4)/2=3$、$\dot e=-Ge=3/2$、$d\mathcal L/dt=-e^2G=-3/4$。二つの経路が一致する。
<!-- solution-end -->

### SLT2-13-B02 弱形式で二つの観測量を追う
- Level: B
- 目安時間: 20分

前問と同じ二粒子模型において、試験関数 $\varphi_1(a,w)=a$ と $\varphi_2(a,w)=a^2+w^2$ を使う。初期時刻の $\frac d{dt}\int\varphi_j\,d\mu_2$ を[経験測度の弱形式](#prop-slt2-13-weak-form)と粒子速度の直接代入で求めよ。

<!-- solution-start -->
#### 詳細解答

$-\nabla V(a,w)=(w/2,a/2)$。$\varphi_1$ の勾配は $(1,0)$ なので

$$
\frac d{dt}\int a\,d\mu_2
=\frac12\left(\frac{w_1}{2}+\frac{w_2}{2}\right)
=\frac12\left(\frac12+1\right)=\frac34.
$$

直接計算は $(\dot a_1+\dot a_2)/2=(1/2+1)/2=3/4$。

$\nabla\varphi_2=(2a,2w)$ だから、各粒子での内積は $(2a,2w)\cdot(w/2,a/2)=2aw$。よって

$$
\frac d{dt}\int(a^2+w^2)\,d\mu_2
=\frac12(2a_1w_1+2a_2w_2)=1.
$$

直接計算でも $(1/2)\sum_r(2a_r\dot a_r+2w_r\dot w_r)$ は $(1/2)[(1+1)+(0+0)]=1$。どちらの試験関数でも一致する。
<!-- solution-end -->

### SLT2-13-B03 弱収束しても出力が収束しない
- Level: B
- 目安時間: 20分

$\Theta=\mathbb R^2$、$\psi(a,w)=aw$ とし、$m-1$ 粒子を $(0,0)$、1粒子を $(m^\alpha,1)$ に置く（$\alpha>0$）。経験測度の弱極限と予測 $f_{\mu_m}$ の極限を $\alpha<1,\alpha=1,\alpha>1$ に分けて求めよ。弱収束の定義を満たすのに予測が収束しない場合の原因を説明せよ。

<!-- solution-start -->
#### 詳細解答

経験測度は $(1-1/m)\delta_{(0,0)}+(1/m)\delta_{(m^\alpha,1)}$。有界連続な $\varphi$ について差の絶対値は常に $2\|\varphi\|_\infty/m$ 以下だから、$\alpha$ の値によらず $\delta_{(0,0)}$ へ弱収束する。

しかし予測は

$$
f_{\mu_m}=\left(1-\frac1m\right)0
+\frac1m(m^\alpha\cdot1)=m^{\alpha-1}.
$$

従って $\alpha<1$ なら0、$\alpha=1$ なら1、$\alpha>1$ なら正の無限大へ向かう。極限測度の予測は0であるから、$\alpha\ge1$ で積分の極限交換が失敗する。弱収束は有界連続試験関数の積分だけを支配し、非有界な $aw$ の積分を支配しないためである。
<!-- solution-end -->

### SLT2-13-B04 中心化しない幅正規化の罠
- Level: B
- 目安時間: 18分

独立同分布な出力寄与 $U_r$ が平均 $\nu=2$、分散 $v=9$ を持つ。$m^{-1}\sum_rU_r$ と $m^{-1/2}\sum_rU_r$ の期待値・分散を計算し、後者の初期出力が確定的な有限極限へ確率収束するとはいえない理由を述べよ。中心化した場合も比較せよ。

<!-- solution-start -->
#### 詳細解答

独立性により和の期待値は $2m$、分散は $9m$。よって

$$
\begin{array}{c|cc}
&\text{期待値}&\text{分散}\\\hline
m^{-1}\sum_rU_r&2&9/m\\
m^{-1/2}\sum_rU_r&2\sqrt m&9
\end{array}
$$

後者は平均が $2\sqrt m$ と増大し、平均からの偏差は分散9のままである。実際、Chebyshevの不等式を用い固定 $C>0$ について十分大きな $m$ で $2\sqrt m-C>0$ とすれば、

$$
\mathbb P\left(m^{-1/2}\sum_rU_r\le C\right)
\le\mathbb P\left(\left|m^{-1/2}\sum_rU_r-2\sqrt m\right|
\ge2\sqrt m-C\right)
\le\frac9{(2\sqrt m-C)^2}\to0.
$$

したがって $+\infty$ へ確率的に逃げ、有限の確定値へは収束しない。中心化した $m^{-1/2}\sum_r(U_r-2)$ は平均0・分散9となり、中心極限定理で $N(0,9)$ へ分布収束するが、なお定数へ確率収束するわけではない。
<!-- solution-end -->

### SLT2-13-C01 複数入力の粒子流と固定核近似の破綻
- Level: C
- 目安時間: 30分

二つの訓練入力 $x_1=1,x_2=-1$、教師 $y=(1,0)^{\mathsf T}$、切片のない部分模型 $\psi_x(a,w)=awx$、粒子数 $m\ge1$ を考える。$b=m^{-1}\sum_ra_rw_r$ と置き、$f(x)=bx$ とする。

1. 加速勾配流の $\dot a_r,\dot w_r$ を $b$ と各粒子で表せ。
2. $b$ の微分と粒子Gram行列を計算し、[残差方程式](#prop-slt2-13-moving-gram)を検証せよ。
3. 全粒子が初期に $(a_r,w_r)=(1,0)$ の場合、$b(0),\dot b(0),\ddot b(0)$ を求め、粒子Gramが全時刻で初期値に固定されるという推論が正しくないことを示せ。

<!-- solution-start -->
#### 詳細解答

出力は $F=(b,-b)^{\mathsf T}$、残差は $e=(b-1,-b)^{\mathsf T}$。二乗損失の規格化は $1/(2n)=1/4$。仮の粒子の寄与は $\psi_{x_i}(a,w)=awx_i$ なのでポテンシャルは

$$
V(a,w)=\frac12[(b-1)aw+(-b)(-aw)]
=\frac{2b-1}{2}aw.
$$

従って（第1問）

$$
\dot a_r=-\frac{2b-1}{2}w_r,\qquad
\dot w_r=-\frac{2b-1}{2}a_r.
$$

（第2問）$b$ を積の微分で計算し、$q=m^{-1}\sum_r(a_r^2+w_r^2)\ge0$ と置くと

$$
\begin{aligned}
\dot b
&=\frac1m\sum_r(\dot a_rw_r+a_r\dot w_r)\\
&=-\frac{2b-1}{2m}\sum_r(w_r^2+a_r^2)
=-\frac{2b-1}{2}q.
\end{aligned}
$$

特徴勾配は $\nabla\psi_{x_1}=(w_r,a_r)$、$\nabla\psi_{x_2}=(-w_r,-a_r)$ だから

$$
G_m=q\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

残差方程式の右辺は

$$
-\frac12G_me
=-\frac q2\begin{pmatrix}(b-1)+b\\-(b-1)-b\end{pmatrix}
=\begin{pmatrix}-(2b-1)q/2\\(2b-1)q/2\end{pmatrix},
$$

すなわち $(\dot b,-\dot b)^{\mathsf T}$ と一致する。

（第3問）初期値から $b(0)=0$、$q(0)=1$。したがって $\dot b(0)=-(-1)/2=1/2$。さらに

$$
\begin{aligned}
\dot q
&=\frac2m\sum_r(a_r\dot a_r+w_r\dot w_r)\\
&=-\frac{2(2b-1)}m\sum_ra_rw_r=-2(2b-1)b.
\end{aligned}
$$

よって $\dot q(0)=0$、積の微分で

$$
\ddot b(0)
=-\dot b(0)q(0)-\frac{2b(0)-1}{2}\dot q(0)
=-\frac12.
$$

初期時刻に $\dot q(0)=0$ であっても核が一定とは限らない。実際 $q=1$ が一定なら $\dot q=-2(2b-1)b$ は、$b(t)>0$ かつ $b(t)\ne1/2$ の小さな正時刻で零ではない。$b(0)=0,\dot b(0)=1/2$ と連続性からそのような時刻が存在する。**核固定**は特別な仮定・近似であって、$G_m\succeq0$ だけからは出ない。
<!-- solution-end -->
