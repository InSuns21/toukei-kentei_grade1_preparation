# OTR20 Otto計算の接ベクトルとは

[OTR19のBenamou–Brenier公式](../OTR19/index.md#thm-otr19-benamou-brenier)は、測度を動かす速度場の二乗積分を最小化して $W_2$ 距離を回復しました。しかし、同じ確率測度の時間変化を生む速度場は一つとは限りません。例えば円形に対称な密度を回転させても、写真に写る密度は変わりません。それなのに各粒子は動いており、運動作用は正です。

今回は「測度から見える速度の成分だけを残す」方法を構成します。これは[多様体の接ベクトル](../../../幾何系/GEO/GEO2/index.md#def-geo2-tangent-derivation)とは定義の異なる、Otto 計算でいう**接ベクトル**への入口です。まず任意の確率測度に適用できる Hilbert 空間で厳密に射影し、次に密度関数が微分可能な場合に、有限次元の[Riemann計量](../../../幾何系/GEO/GEO12/index.md#def-geo12-riemannian-metric)に似た式でエネルギーの勾配を計算します。すべての確率測度が滑らかな無限次元多様体になるとは仮定しません。

以下、$d\ge1$、$\mu\in\mathcal P_2(\mathbb R^d)$ とします。有限二次モーメントと[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義を使います。$L^2(\mu;\mathbb R^d)$ は測度 $\mu$ に関して二乗可積分な速度場の同値類からなる実 Hilbert 空間で、内積とノルムは

$$
\langle v,w\rangle_\mu=\int_{\mathbb R^d}v(x)\cdot w(x)\,d\mu(x),
\qquad \|v\|_\mu^2=\int|v|^2d\mu
$$

とします。同値類なので、$\mu$ が見ない場所での速度場の値は区別しません。

## 1. 回転しても密度が変わらない

まず $d=2$ の標準 Gaussian 測度 $d\mu(x)=\rho(x)dx$、$\rho(x)=(2\pi)^{-1}e^{-|x|^2/2}$ と、$90$ 度回転の行列

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad w(x)=Jx=(-x_2,x_1)
$$

を取ります。この流れは各円周上で質量を回転させます。ところが $\nabla\rho=-x\rho$ と $\nabla\cdot(Jx)=\operatorname{tr}J=0$ なので、積の微分から

$$
\nabla\cdot(\rho w)
=\nabla\rho\cdot Jx+\rho\nabla\cdot(Jx)
=-\rho x\cdot Jx+0=0.
$$

[連続の方程式](../OTR17/index.md#def-otr17-measure-weak)は $\partial_t\rho+\nabla\cdot(\rho w)=0$ ですから、$\rho$ は時間に依存しなくても保存則を満たします。一方で $E|X|^2=2$（各標準正規座標の二乗平均が $1$）より

$$
\|w\|_\mu^2=\int|Jx|^2d\mu=\int|x|^2d\mu=2>0.
$$

静止を表す速度場 $0$ と回転速度場 $Jx$ は、同じ測度変化 $0$ を生みます。最小作用を表すには、この「密度からは見えない回転」を除く必要があります。

## 2. 勾配場の閉包を接空間にする

測度の変化を検出するのは試験関数 $\phi$ に対する $\int\nabla\phi\cdot v\,d\mu$ です。したがって**滑らかな関数の勾配**が、測度変化を読むための基本方向になります。ただし滑らかな勾配だけでは極限を取った最小速度を含められないので、二乗平均で閉包を取ります。$C_c^\infty(\mathbb R^d)$ はコンパクトな台を持つ無限回微分可能な実関数の集合です。

<a id="def-otr20-tangent"></a>

<!-- formal-statement-start -->
> **定義（L2勾配の接空間）**
> $d\ge1$、$\mu\in\mathcal P_2(\mathbb R^d)$ に対し、$H_\mu=L^2(\mu;\mathbb R^d)$ と置く。$H_\mu$ における勾配場のノルム閉包

$$
T_\mu\mathcal P_2
=\overline{\{\nabla\phi:\phi\in C_c^\infty(\mathbb R^d)\}}^{\,L^2(\mu)}
\subset H_\mu
$$

> を**接空間**と呼ぶ。ここでの接ベクトルとは $T_\mu\mathcal P_2$ の速度場の同値類である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr20-tangent -->
**定義の確認**（一つの原子）。$\mu=\delta_a$ のとき、$H_\mu$ の場は点 $a$ での値 $v(a)\in\mathbb R^d$ だけで決まります。任意の $b\in\mathbb R^d$ に対して、$a$ の近傍で $1$ になる滑らかなコンパクト支持関数 $\chi$ を選び、$\phi(x)=\chi(x)b\cdot(x-a)$ と置けば

$$
\nabla\phi(a)=\chi(a)b+(b\cdot(a-a))\nabla\chi(a)=b.
$$

すべての値 $b$ が滑らかな勾配で表せるので、$T_{\delta_a}\mathcal P_2=H_{\delta_a}\simeq\mathbb R^d$ です。密度を持たない測度でも、この定義は意味を持ちます。
<!-- definition-example-end -->

ここで「接方向」には二種類の表し方があります。速度場 $v$ は $H_\mu$ の元ですが、その速度場がどんな質量変化を作るかは試験関数への作用で決まります。[OTR17の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)の空間部分を取り出し、時間を固定して書きます。

<a id="def-otr20-direction"></a>

<!-- formal-statement-start -->
> **定義（分布的接方向と不可視速度）**
> $\mu\in\mathcal P_2(\mathbb R^d)$、$v\in H_\mu$ に対し、試験関数 $\phi\in C_c^\infty(\mathbb R^d)$ 上の線形汎関数 $\sigma_v$ を

$$
\langle\sigma_v,\phi\rangle
=\int\nabla\phi\cdot v\,d\mu
$$

> で定める。これを $v$ が表す**分布的接方向**と呼び、記号 $\sigma_v=-\nabla\cdot(\mu v)$ で表す。すべての試験関数で $\langle\sigma_w,\phi\rangle=0$ となる速度場 $w\in H_\mu$ を**不可視速度**といい、その集合を $N_\mu$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr20-direction -->
**定義の確認**（Gaussianの回転）。第1節の $w=Jx$ は $\|w\|_\mu^2=2$ で二乗可積分です。各 $\phi\in C_c^\infty$ について部分積分すると

$$
\langle\sigma_w,\phi\rangle
=\int\nabla\phi\cdot\rho Jx\,dx
=-\int\phi\,\nabla\cdot(\rho Jx)dx=0.
$$

したがって $Jx\in N_\mu$ です。正の二乗作用を持っていても、分布的接方向は厳密に $0$ です。なお $\mu=\delta_a$ では $\langle\sigma_v,\phi\rangle=\nabla\phi(a)\cdot v(a)$ であり、先ほどの $\phi$ を選べば $\sigma_v=0$ は $v(a)=0$ を強制します。
<!-- definition-example-end -->

不可視速度の条件は、重み付きの**発散ゼロ**を意味します。任意の $\phi$ についてこの弱い積分がゼロであることが定義であり、$\mu$ に密度がない場合に $\nabla\cdot(\rho w)$ の古典微分を要求しません。

<a id="prop-otr20-splitting"></a>

<!-- formal-statement-start -->
> **命題（接空間と不可視速度の直交分解）**
> 任意の $\mu\in\mathcal P_2(\mathbb R^d)$ に対し、$T_\mu\mathcal P_2$ は $H_\mu$ の閉線形部分空間であり、

$$
N_\mu=(T_\mu\mathcal P_2)^\perp,
\qquad H_\mu=T_\mu\mathcal P_2\oplus N_\mu.
$$

> 従って各 $v\in H_\mu$ は一意に $v=P_\mu v+n$（$P_\mu v\in T_\mu\mathcal P_2$、$n\in N_\mu$）と書け、$\sigma_{P_\mu v}=\sigma_v$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

試験関数の勾配すべてに直交することと、その閉包全体に直交することは同じです。[Hilbert空間の直交分解](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)を閉部分空間 $T_\mu\mathcal P_2$ へ適用します。

<!-- proof-start -->
### 証明

$G=\{\nabla\phi:\phi\in C_c^\infty\}$ は、勾配の線形性により $H_\mu$ の線形部分空間です。定義から $T_\mu\mathcal P_2=\overline G$ は閉線形部分空間です。$w\in H_\mu$ について

$$
\begin{aligned}
w\in N_\mu
&\iff\langle w,\nabla\phi\rangle_\mu=0\quad(\forall\phi\in C_c^\infty)\\
&\iff w\perp G
\iff w\perp\overline G.
\end{aligned}
$$

最後の同値は内積の連続性から従います。よって $N_\mu=(T_\mu\mathcal P_2)^\perp$。[閉部分空間の直交分解定理](../../F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)では、$H=H_\mu$、$M=T_\mu\mathcal P_2$ とすると $v=P_\mu v+n$ が一意に存在します。さらに任意の試験関数で

$$
\langle\sigma_v-\sigma_{P_\mu v},\phi\rangle
=\int\nabla\phi\cdot n\,d\mu=0.
$$

従って二つの分布的接方向は等しいです。$\square$
<!-- proof-end -->

## 3. 最小速度場は一意に決まる

同じ分布的接方向を実現する速度場は $v+N_\mu$ という集合を作ります。そこから最もノルムの小さいものを選ぶと、観測されない回転成分が消えます。これは単に「勾配であることを仮定する」のではなく、射影から導く結論です。

<a id="thm-otr20-minimal"></a>

<!-- formal-statement-start -->
> **定理（接方向の最小ノルム代表）**
> $\mu\in\mathcal P_2(\mathbb R^d)$、$v\in H_\mu$ とする。制約 $\sigma_u=\sigma_v$ を満たす $u\in H_\mu$ 全体のうち、ノルム $\|u\|_\mu$ が最小となるものは一意に存在し、$u_*=P_\mu v\in T_\mu\mathcal P_2$ である。任意の許容速度 $u$ について

$$
\|u\|_\mu^2=\|u_*\|_\mu^2+\|u-u_*\|_\mu^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ方向を表すという条件は差が不可視速度であることです。勾配成分と不可視成分の直交性で、二乗ノルムが Pythagoras の和になります。

<!-- proof-start -->
### 証明

$\sigma_u=\sigma_v$ なら任意の $\phi$ で $\int\nabla\phi\cdot(u-v)d\mu=0$ なので、[分布的接方向と不可視速度](#def-otr20-direction)の定義から $u-v\in N_\mu$ です。[接空間と不可視速度の直交分解](#prop-otr20-splitting)で $v=u_*+n_0$（$u_*\in T_\mu\mathcal P_2$、$n_0\in N_\mu$）とすると、$u=u_*+n$、$n=n_0+(u-v)\in N_\mu$ です。従って

$$
\begin{aligned}
\|u\|_\mu^2
&=\langle u_*+n,u_*+n\rangle_\mu\\
&=\|u_*\|_\mu^2+2\langle u_*,n\rangle_\mu+\|n\|_\mu^2\\
&=\|u_*\|_\mu^2+\|u-u_*\|_\mu^2.
\end{aligned}
$$

等号 $\|u\|_\mu=\|u_*\|_\mu$ が成り立つのは $\|u-u_*\|_\mu=0$、すなわち $u=u_*$ が $H_\mu$ の同値類として一致するときだけです。射影は存在するので最小値は達成され、一意です。$\square$
<!-- proof-end -->

**重要な区別**：任意の分布的汎関数 $\sigma$ が有限ノルム速度場で表せるわけではありません。この定理の対象は、少なくとも一つの $v\in H_\mu$ で表せる $\sigma_v$ です。そこでは $T_\mu\mathcal P_2$ の元と表現可能な分布的接方向が一対一に対応しますが、一般の分布全体との同一視はしません。

### 具体例：膨張と回転を分ける

第1節の標準 Gaussian で $v(x)=x+Jx$ とします。二次関数 $|x|^2/2$ の勾配は $x$ です。コンパクト支持の cutoff $\chi_R(x)=\chi(x/R)$ を使うと

$$
\nabla\!\left(\chi_R\frac{|x|^2}{2}\right)
=\chi_Rx+\frac{|x|^2}{2}\nabla\chi_R.
$$

$|\nabla\chi_R|\le C/R$、その支持が $R\le|x|\le2R$ にあるので、右辺と $x$ の差の二乗は $C'|x|^2\boldsymbol1_{\{|x|\ge R\}}$ で支配されます。二次モーメントが有限だから積分は $R\to\infty$ でゼロに近づき、$x\in T_\mu\mathcal P_2$ です。一方 $Jx\in N_\mu$ を既に証明しました。従って射影は $P_\mu v=x$ です。

$$
\|x\|_\mu^2=2,\qquad
\|Jx\|_\mu^2=2,\qquad
\|x+Jx\|_\mu^2=4.
$$

同じ密度変化を作るのに、余分な回転を重ねると作用密度は $2$ から $4$ に増えます。

## 4. 測度曲線の速さと接ベクトル

固定時刻の射影だけでは「各時刻の最小速度場」を確保したことになりません。時刻ごとに射影して得る場の可測性と、もとの連続の方程式の保存が必要です。ここで [OTR18のAC2曲線の速度場と最小作用](../OTR18/index.md#thm-otr18-converse)が役立ちます。

<a id="thm-otr20-canonical"></a>

<!-- formal-statement-start -->
> **定理（AC2曲線の正準速度と距離微分）**
> $T>0$、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ を $W_2$ に関する $AC^2$ 曲線とする。このとき[連続の方程式の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)を満たす二乗可積分な速度場が存在する。さらに、そのような速度場のうち、ほとんどすべての時刻で

$$
v_t^*\in T_{\mu_t}\mathcal P_2,
\qquad\|v_t^*\|_{L^2(\mu_t)}=|\mu'|(t)
$$

> を満たす $v^*$ が存在し、$dt\,d\mu_t$ に関する同値類として一意である。任意の他の許容速度場 $v$ について $v_t^*=P_{\mu_t}v_t$ がほとんどすべての時刻で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

OTR18が最小作用の場を与えます。その場を各時刻で勾配閉包へ射影しても弱い保存則は不変です。射影はノルムを増やさない一方、距離微分はどんな速度場のノルム以下なので、両者が一致します。

<!-- proof-start -->
### 証明

**第1段階：時刻ごとの射影を可測にする。** $C_c^\infty(\mathbb R^d)$ から、勾配が任意の $\mu_t$ の $L^2$ 閉包で稠密となる可算族 $(\phi_k)$ を固定できます。例えばコンパクト集合上の一階導関数までの一様近似で稠密な滑らかな関数族を取り、台を増やしていきます。$\nabla\phi_k$ を各 $L^2(\mu_t)$ で Gram–Schmidt 直交化すると、その係数は $t\mapsto\int\nabla\phi_i\cdot\nabla\phi_j\,d\mu_t$ という可測関数から四則演算と平方根で得られます。ノルム $0$ の項を飛ばします。

最初の $n$ 個の正規直交化された場への有限次元射影は $(t,x)$ に関して可測です。有限次元射影を $p_t^{(n)}$ と書きます。各時刻でその部分空間は増大し、勾配閉包に稠密なので $p_t^{(n)}\to P_{\mu_t}v_t$ が $L^2(\mu_t)$ で成り立ちます。$m>n$ について入れ子の直交射影の Pythagoras の等式から

$
\|p_t^{(m)}-p_t^{(n)}\|_{\mu_t}^2
=\|p_t^{(m)}\|_{\mu_t}^2-\|p_t^{(n)}\|_{\mu_t}^2
\le\|v_t\|_{\mu_t}^2.
$

右辺は時刻について可積分であり、左辺は各時刻で $m,n\to\infty$ のとき $0$ に近づきます。優収束定理により有限次元射影列は $L^2(dt\,d\mu_t)$ で Cauchy です。従って可測な部分列極限を取れ、ほとんどすべての時刻でその極限は $P_{\mu_t}v_t$ と一致します。

**第2段階：弱い保存則を保つ。** 各時刻で[接空間と不可視速度の直交分解](#prop-otr20-splitting)を使うと、任意の $\phi\in C_c^\infty$ について

$$
\int\nabla\phi\cdot(v_t-P_{\mu_t}v_t)\,d\mu_t=0.
$$

これに時刻だけに依存する滑らかな関数を掛けて積分すれば、時間・空間の積の試験関数について弱形式が一致します。一般の時空試験関数はコンパクト集合上でこのような有限和によって一階微分まで近似できます。速度の $L^1(dt\,d\mu_t)$ 有界性（確率測度と Cauchy–Schwarz）により極限を通せるので、射影後も同じ測度曲線を運びます。

**第3段階：距離微分を回復する。** [AC2曲線の速度場と最小作用](../OTR18/index.md#thm-otr18-converse)から、速度場 $v^0$ が存在し

$$
\int_0^T\|v_t^0\|_{\mu_t}^2dt
=\int_0^T|\mu'|(t)^2dt.
$$

これを射影して $v^*=P_{\mu_t}v_t^0$ とします。射影の Pythagoras の等式から $\|v_t^*\|\le\|v_t^0\|$ です。一方、射影後も弱形式を満たすので[OTR18の速度場による距離評価](../OTR18/index.md#thm-otr18-velocity-bound)から $|\mu'|(t)\le\|v_t^*\|$ がほとんど至る所で成り立ちます。従って

$$
\int_0^T|\mu'|^2dt
\le\int_0^T\|v_t^*\|^2dt
\le\int_0^T\|v_t^0\|^2dt
=\int_0^T|\mu'|^2dt.
$$

非負関数 $\|v_t^*\|^2-|\mu'|^2$ の積分がゼロなので、それはほとんど至る所でゼロです。

**第4段階：一意性。** 別の速度場 $v$ と $v^*$ が同じ曲線を運ぶなら、両者の弱形式を引き、空間の可算稠密試験関数と時間の試験関数を使うことで $\sigma_{v_t}=\sigma_{v_t^*}$ がほとんどすべての時刻で従います。固定時刻の[最小ノルム代表の一意性](#thm-otr20-minimal)より $P_{\mu_t}v_t=v_t^*$ です。$v^*$ 自身は接空間に属するので、指定した条件で一意です。$\square$
<!-- proof-end -->

この定理は $W_2$ の厳密な距離微分と二乗可積分速度の関係です。ただし曲線の時刻微分 $\partial_t\mu_t$ が、測度の線形空間の通常の微分として存在すると主張していません。分布的な意味で接方向を表している点が重要です。

### Gaussianの時間発展

$\mu_t=\mathcal N_2(0,e^{2t}I_2)$（$0\le t\le1$）なら、初期点 $X$ に対して $X_t=e^tX$ と置けます。速度は $\dot X_t=X_t$ です。[Gaussian間の最適写像](../OTR14/index.md#thm-otr14-gaussian-w2-spd)によれば、$s<t$ の最適写像は正の倍率 $e^{t-s}$ であり、

$$
W_2(\mu_s,\mu_t)^2
=E|e^tX-e^sX|^2=2(e^t-e^s)^2.
$$

従って $|\mu'|(t)^2=2e^{2t}$ です。速度 $v_t(x)=x$ も $\|v_t\|_{\mu_t}^2=2e^{2t}$ で等号を達成します。さらに $w_t(x)=Jx$ は各時刻の等方 Gaussian に関して発散ゼロなので、$x+Jx$ でも同じ $\mu_t$ を運べますが、

$$
\|x+Jx\|_{\mu_t}^2=4e^{2t}>2e^{2t}=|\mu'|(t)^2.
$$

質量分布の速さと粒子の余計な回転を区別できました。

## 5. 滑らかな場合の重み付きPoisson方程式

射影 $P_\mu v$ は抽象的には存在します。密度 $\rho$ が滑らかな場合には、$P_\mu v=\nabla\psi$ を求める条件が重み付き Poisson 方程式に見えます。ただし、一般に滑らかな $ψ$ が古典解として存在するとは限りません。まず閉包の中での弱い解から出発します。

<a id="prop-otr20-poisson"></a>

<!-- formal-statement-start -->
> **命題（滑らかな重み付きPoisson射影）**
> $\mu=\rho\,dx\in\mathcal P_2(\mathbb R^d)$、$\rho\ge0$ は滑らかとし、$v\in L^2(\rho dx;\mathbb R^d)$ とする。接空間への射影 $p=P_\mu v$ は次の弱い等式で一意に特徴付けられる。

$$
\int\rho\,p\cdot\nabla\phi\,dx
=\int\rho\,v\cdot\nabla\phi\,dx
\qquad(\forall\phi\in C_c^\infty(\mathbb R^d)).
$$

> もし $p=\nabla\psi$ と書け、必要な微分・部分積分が正当化されるなら、この等式は分布の意味で $-\nabla\cdot(\rho\nabla\psi)=-\nabla\cdot(\rho v)$ に等しい。$\psi$ には少なくとも加法定数の不定性があり、$\rho$ の零点や支持の非連結性によりそれ以上の不定性もあり得る。一般には $p$ の $L^2(\mu)$ 同値類だけが一意である。
<!-- formal-statement-end -->

### 証明の見取り図

勾配と速度場の差が試験関数の勾配すべてに直交すれば、差は不可視速度です。この弱条件が Poisson 方程式の自然な意味です。

<!-- proof-start -->
### 証明

[接空間と不可視速度の直交分解](#prop-otr20-splitting)から $v-p\in N_\mu$ です。[分布的接方向と不可視速度](#def-otr20-direction)の定義を密度表示で書くと、任意の $\phi$ について

$$
0=\int\nabla\phi\cdot(v-p)d\mu
=\int\rho(v-p)\cdot\nabla\phi\,dx.
$$

逆に $p\in T_\mu\mathcal P_2$ がこの等式を満たせば $v-p\in N_\mu$ なので、直交分解の一意性から $p=P_\mu v$ です。$p=\nabla\psi$ なら分布の発散の定義を双方に使い、$-\nabla\cdot(\rho\nabla\psi)=-\nabla\cdot(\rho v)$ を得ます。$\nabla\psi$ だけが式に現れるため、定数を加えても変わりません。$\square$
<!-- proof-end -->

密度関数 $\rho>0$ で楕円型方程式の十分な正則性があるときは、$\psi$ を通常の関数として解く方法が役立ちます。しかし $\rho$ のゼロ点や Dirac 測度を許す一般設定では、射影の存在から古典的 Poisson 方程式の解の存在を推論してはいけません。

## 6. 第一変分と形式的なW2勾配

接ベクトルが分かったので、「確率分布を少し動かしたときエネルギーがどう変わるか」を問えます。有限次元では関数の方向微分を内積で表すベクトルを勾配と呼びます。ここでも同様に考えますが、まず密度を持つ場合の計算から始めます。

質量 $1$ で、全空間で滑らかかつ正の密度関数 $\rho$ を考えます。[AMECH3の第一変分](../../../物理系/AMECH/AMECH3/index.md#def-amech3-first-variation)では軌道を端点固定で変分しましたが、ここでは確率密度を全質量固定で変分します。$\eta\in C_c^\infty(\mathbb R^d)$ が $\int\eta dx=0$ を満たすなら、十分小さい $|\varepsilon|$ について $\rho+\varepsilon\eta$ も非負かつ質量 $1$ です。実際、$\eta\ne0$ のときコンパクト集合 $K=\operatorname{supp}\eta$ 上で $m=\min_K\rho>0$、$M=\|\eta\|_\infty>0$ と置けば、$|\varepsilon|<m/M$ に対して $K$ 上で $\rho+\varepsilon\eta\ge m-|\varepsilon|M>0$ です。$K$ の外では $\eta=0$ であり、全質量も $\int(\rho+\varepsilon\eta)dx=1$ のままです（$\eta=0$ なら任意の $\varepsilon$ で不変）。これは密度を保った微小変形です。

<a id="def-otr20-first-variation"></a>

<!-- formal-statement-start -->
> **定義（質量保存制約下の第一変分）**
> 滑らかな正の確率密度 $\rho$ の近傍で定義される汎関数 $\mathcal F$ に対し、ある局所可積分関数 $U_\rho$ が存在して、任意の $\eta\in C_c^\infty(\mathbb R^d)$、$\int\eta dx=0$ について

$$
\left.\frac{d}{d\varepsilon}\mathcal F(\rho+\varepsilon\eta)\right|_{\varepsilon=0}
=\int U_\rho(x)\eta(x)\,dx
$$

> が成り立つとき、$U_\rho$ を $\mathcal F$ の**第一変分**と呼び、$\delta\mathcal F/\delta\rho$ と書く。全質量を固定した変分しか試さないため、第一変分は加法定数の違いを区別しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr20-first-variation -->
**定義の確認**（位置エネルギー）。$V\in C_c^\infty(\mathbb R^d)$ に対し $\mathcal F_V(\rho)=\int V\rho\,dx$ と置きます。$\rho+\varepsilon\eta$ を代入すると

$$
\mathcal F_V(\rho+\varepsilon\eta)
=\int V\rho dx+\varepsilon\int V\eta dx.
$$

微分係数は $\int V\eta$ で、$U_\rho=V$ が第一変分です。$V+c$ を使っても $\int c\eta dx=c\int\eta dx=0$ なので同じ値になります。
<!-- definition-example-end -->

ここで $\varepsilon$ は密度を仮に変形するパラメータ、次の $t$ は実際の時間です。$\delta\mathcal F/\delta\rho$ は密度に関する変分を表す記号であり、$\partial_t\rho_t$ は時刻 $t$ に関する偏微分、$\nabla U_\rho$ は位置 $x$ に関する勾配です。これらは微分する変数が異なります。以下の保存則の $\rho,v$ は、時刻依存が明らかな場合の $\rho_t,v_t$ の添字省略です。

次に $\rho_t$ が滑らかな正密度で、$\partial_t\rho+\nabla\cdot(\rho v)=0$ を満たすとします。$U_\rho$ の選択について必要な可積分性、時間微分と積分の交換、空間の部分積分、境界項の消失が成立すれば

$$
\begin{aligned}
\frac{d}{dt}\mathcal F(\rho_t)
&=\int U_{\rho_t}\,\partial_t\rho_t\,dx\\
&=-\int U_{\rho_t}\,\nabla\cdot(\rho_t v_t)dx\\
&=\int\rho_t\nabla U_{\rho_t}\cdot v_tdx.
\end{aligned}
$$

ここで最終行が有限であること、例えば $\nabla U_\rho\in L^2(\rho dx)$ を仮定します。[接空間への射影](#prop-otr20-splitting)によって不可視速度との内積は消えるので、$\nabla U_\rho$ 自体が接空間に入らなくても接成分 $P_\rho\nabla U_\rho$ が方向微分を表します。

<a id="def-otr20-formal-gradient"></a>

<!-- formal-statement-start -->
> **定義（形式的W2勾配）**
> 滑らかな正密度 $\rho$ における汎関数 $\mathcal F$ の第一変分 $U_\rho=\delta\mathcal F/\delta\rho$ が空間微分可能で、$\nabla U_\rho\in L^2(\rho dx;\mathbb R^d)$ とする。$\rho dx$ における[接空間](#def-otr20-tangent)への射影を使い、**形式的な $W_2$ 勾配速度場**を

$$
\operatorname{grad}_{W_2}^{\rm formal}\mathcal F(\rho)
=P_{\rho dx}\nabla\frac{\delta\mathcal F}{\delta\rho}
\in T_{\rho dx}\mathcal P_2
$$

> とする。対応する分布的方向は $-\nabla\cdot(\rho\operatorname{grad}_{W_2}^{\rm formal}\mathcal F)$ である。上の連鎖律・部分積分が成立する曲線に限り、速度場 $v_t$ に対するエネルギーの方向微分はこの勾配と $P_{\rho_tdx}v_t$ の $L^2(\rho_tdx)$ 内積で表される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr20-formal-gradient -->
**定義の確認**（滑らかな位置エネルギー）。先ほどの $V\in C_c^\infty$ では $U_\rho=V$、$\nabla V$ は定義から接空間の元です。従って $P_\rho\nabla V=\nabla V$ です。例えば $\rho$ が第1節の Gaussian で、速度場が $v=\nabla V+Jx$ なら

$$
\langle\nabla V,v\rangle_\rho
=\int|\nabla V|^2\rho dx
+\underbrace{\int\nabla V\cdot Jx\,\rho dx}_{=0}
=\|\nabla V\|_\rho^2.
$$

回転速度が正の作用を持っていても、エネルギーの方向微分への寄与はゼロです。
<!-- definition-example-end -->

形式計算を、連続の方程式の弱解でも厳密に言える特別な場合と比較します。

<a id="prop-otr20-potential"></a>

<!-- formal-statement-start -->
> **命題（位置エネルギーの第一変分と接勾配）**
> $V\in C_c^\infty(\mathbb R^d)$、$\mathcal F_V(\mu)=\int Vd\mu$ とし、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ が $AC^2$ 曲線で、二乗可積分速度場 $v$ とともに[連続の方程式の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)を満たすとする。このとき $t\mapsto\mathcal F_V(\mu_t)$ は絶対連続で、ほとんどすべての時刻で

$$
\frac{d}{dt}\mathcal F_V(\mu_t)
=\int\nabla V\cdot v_t\,d\mu_t
=\langle\nabla V,P_{\mu_t}v_t\rangle_{\mu_t}.
$$

> 従って位置エネルギーの接勾配速度は $\nabla V$ である。この主張に密度の存在は必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

時間だけの試験関数を掛けた $V$ を弱式へ代入すると時間微分が得られます。$\nabla V$ は最初から滑らかなコンパクト支持の勾配なので射影で変わりません。

<!-- proof-start -->
### 証明

$V,\nabla V$ は有界です。$g(t)=\int Vd\mu_t$ は $W_2$-連続性から連続です。$\zeta\in C_c^1((0,T))$ に対して、[弱い連続の方程式](../OTR17/index.md#def-otr17-measure-weak)の試験関数に $\varphi(t,x)=\zeta(t)V(x)$ を代入すると

$$
\int_0^T\zeta'(t)g(t)dt
+\int_0^T\zeta(t)\left[\int\nabla V\cdot v_t\,d\mu_t\right]dt=0.
$$

$h(t)=\int\nabla V\cdot v_t\,d\mu_t$ は Cauchy–Schwarz により

$$
\int_0^T|h(t)|dt
\le\|\nabla V\|_\infty\sqrt T
\left(\int_0^T\|v_t\|_{\mu_t}^2dt\right)^{1/2}<\infty.
$$

従って $g$ の分布微分は $h\in L^1$ で、$g(t)-g(0)=\int_0^t h(s)ds$ です。最後に $\nabla V\in T_{\mu_t}\mathcal P_2$ と[接空間と不可視速度の直交分解](#prop-otr20-splitting)を使って $\langle\nabla V,v_t\rangle=\langle\nabla V,P_{\mu_t}v_t\rangle$ を得ます。$\square$
<!-- proof-end -->

### 下り坂の符号を決める

密度が十分に滑らかで、必要な正則性・境界条件がそろい、$\nabla U_\rho\in T_{\rho dx}\mathcal P_2$ のとき、エネルギーを最も急に減らす**負の勾配速度**を $v=-\nabla U_\rho$ と選びます。保存則へ入れると

$$
\partial_t\rho+\nabla\cdot(\rho(-\nabla U_\rho))=0
\quad\Longleftrightarrow\quad
\partial_t\rho=\nabla\cdot(\rho\nabla U_\rho).
$$

同じ連鎖律から

$$
\frac{d}{dt}\mathcal F(\rho_t)
=\int\rho_t\nabla U_{\rho_t}\cdot(-\nabla U_{\rho_t})dx
=-\int\rho_t|\nabla U_{\rho_t}|^2dx\le0.
$$

もし勾配の射影が必要なら速度は $-P_\rho\nabla U_\rho$ と読み替え、散逸は $-\|P_\rho\nabla U_\rho\|_\rho^2$ です。正符号の速度 $+\nabla U$ を選ぶとエネルギーは増加するので、符号は飾りではありません。

これは**形式的計算**です。一般のエントロピー、熱方程式、Fokker–Planck方程式について解の存在・正則性・境界項の消失をここで証明したことにはなりません。それらは後の講義で仮定を固定して扱います。

## 7. Riemann計量に似ているが同一ではない

有限次元 Riemann 多様体では接ベクトル同士の内積が距離の局所的な速さを与えます。ここでも[接方向の最小ノルム代表](#thm-otr20-minimal)が保証する一意な速度場 $u_1,u_2\in T_\mu\mathcal P_2$ を分布的接方向 $\sigma_1,\sigma_2$ に対応させると、候補となる内積は

$$
g_\mu^{\rm Otto}(\sigma_1,\sigma_2)
=\int u_1\cdot u_2\,d\mu.
$$

一意性は[接方向の最小ノルム代表](#thm-otr20-minimal)の定理により保証されます。この式は、表現可能な方向に限って正定値な内積です。$\mu=\delta_a$ の場合も $g_{\delta_a}(\sigma_b,\sigma_c)=b\cdot c$ と計算できます。

厳密に成立するのは、任意の $\mu\in\mathcal P_2$ での Hilbert射影・分布的方向・[AC2曲線の距離微分](#thm-otr20-canonical)です。これに対し「$\mathcal P_2$ 全体が通常の滑らかなRiemann多様体」「すべてのエネルギーが微分可能」「任意の方向が有限ノルムで実現可能」という一般論はここからは従いません。滑らかな正密度の周りでの Otto の微分計算は、有用な**形式的な幾何**です。

## 8. 演習：射影、速度、第一変分を再構成する

### OTR20-A01 Dirac測度の接方向
- Level: A

$\mu=\delta_a$（$a\in\mathbb R^d$）、$v(a)=b\in\mathbb R^d$ とする。$T_\mu\mathcal P_2$、$N_\mu$、$\langle\sigma_v,\phi\rangle$ を求め、最小ノルム代表を示せ。

<!-- solution-start -->
**詳細解答**。[接空間の定義例](#def-otr20-tangent)で、$a$ の近傍で $1$ となる cutoff $\chi$ と $\phi_c(x)=\chi(x)c\cdot(x-a)$ を用いると $\nabla\phi_c(a)=c$ です。任意の $c$ が実現するので $T_\mu\mathcal P_2=H_\mu\simeq\mathbb R^d$、その直交補空間は $N_\mu=\{0\}$ です。

$$
\langle\sigma_v,\phi\rangle=\nabla\phi(a)\cdot b,
\qquad \|v\|_\mu^2=|b|^2.
$$

同じ分布的方向を作る $u$ では $\nabla\phi_c(a)\cdot(u(a)-b)=c\cdot(u(a)-b)=0$ がすべての $c$ で成立します。$c=u(a)-b$ とすれば $u(a)=b$ です。従って代表は $v$ のみで、最小ノルムも $|b|$ です。
<!-- solution-end -->

### OTR20-A02 Gaussianの回転は不可視か
- Level: A

$d\mu=(2\pi)^{-1}e^{-|x|^2/2}dx$、$w=(-x_2,x_1)$ とする。$w\in L^2(\mu)$、$\nabla\cdot(\rho w)=0$、$w\in N_\mu$ を順に検算せよ。

<!-- solution-start -->
**詳細解答**。$|w|^2=x_1^2+x_2^2$ なので $\|w\|_\mu^2=E[X_1^2]+E[X_2^2]=2<\infty$ です。次に $\partial_1w_1+\partial_2w_2=0$、$\nabla\rho=-x\rho$ から

$$
\nabla\cdot(\rho w)=(-x\rho)\cdot(-x_2,x_1)+\rho\cdot0
=\rho(x_1x_2-x_2x_1)=0.
$$

任意の $\phi\in C_c^\infty$ に対し、コンパクト支持により境界項なしで $\int\nabla\phi\cdot w\rho dx=-\int\phi\nabla\cdot(\rho w)dx=0$。[分布的接方向と不可視速度](#def-otr20-direction)の定義から $w\in N_\mu$ です。
<!-- solution-end -->

### OTR20-A03 射影で作用はどう変わるか
- Level: A

前問の Gaussian で $v(x)=3x+2Jx$ とする。$P_\mu v$ と $\|v\|_\mu^2$、$\|P_\mu v\|_\mu^2$、差の二乗ノルムを求めよ。

<!-- solution-start -->
**詳細解答**。$x$ は二次モーメント有限の cutoff 近似により[接空間](#def-otr20-tangent)に属し、[前問の回転場](#def-otr20-direction) $Jx$ は $N_\mu$ に属します。[接空間と不可視速度の直交分解](#prop-otr20-splitting)から $P_\mu v=3x$ です。$E|X|^2=2$、$|Jx|=|x|$、$x\cdot Jx=0$ より

$$
\|3x\|_\mu^2=9\cdot2=18,
\quad\|2Jx\|_\mu^2=4\cdot2=8,
\quad\|v\|_\mu^2=18+8=26.
$$

余分な二乗作用 $26-18=8$ は不可視成分 $v-P_\mu v=2Jx$ の二乗ノルムと一致します。
<!-- solution-end -->

### OTR20-A04 第一変分はなぜ定数までか
- Level: A

$V\in C_c^\infty(\mathbb R^d)$、$\mathcal F(\rho)=\int V\rho dx$ とし、$\int\eta dx=0$ を満たすコンパクト支持の滑らかな $\eta$ を考える。$U=V+c$ が任意の $c\in\mathbb R$ に対し同じ第一変分を表すことを示せ。

<!-- solution-start -->
**詳細解答**。$\mathcal F(\rho+\varepsilon\eta)=\int V\rho dx+\varepsilon\int V\eta dx$ なので

$$
\left.\frac{d}{d\varepsilon}\mathcal F(\rho+\varepsilon\eta)\right|_0
=\int V\eta dx.
$$

一方、$\int(V+c)\eta dx=\int V\eta dx+c\int\eta dx=\int V\eta dx$ です。従って $V$ と $V+c$ は同じ質量保存変分への応答を与えます。これが[第一変分の定義](#def-otr20-first-variation)で定数が区別されない理由です。
<!-- solution-end -->

### OTR20-A05 負の勾配流の符号
- Level: A

滑らかな正密度 $\rho_t$ と滑らかな $U_{\rho_t}$ が、$v_t=-\nabla U_{\rho_t}$、$\partial_t\rho+\nabla\cdot(\rho v)=0$ を満たし、部分積分と第一変分の連鎖律が許されるとする。PDEと $d\mathcal F/dt$ の符号を求めよ。

<!-- solution-start -->
**詳細解答**。速度を保存則へ代入して

$$
\partial_t\rho+\nabla\cdot(-\rho\nabla U_\rho)=0
\quad\Longrightarrow\quad\partial_t\rho=\nabla\cdot(\rho\nabla U_\rho).
$$

[第一変分の連鎖計算](#def-otr20-formal-gradient)の適用条件が仮定されているので

$$
\frac{d\mathcal F}{dt}
=\int\nabla U_\rho\cdot v\,\rho dx
=-\int|\nabla U_\rho|^2\rho dx\le0.
$$

右辺を非負にしてしまう誤りは、負の勾配速度 $v=-\nabla U$ の負号を落とすことから起きます。
<!-- solution-end -->

### OTR20-B01 固定した分布的方向の最小化
- Level: B

$\mu\in\mathcal P_2(\mathbb R^d)$、$v\in H_\mu$ とする。$u$ が $\sigma_u=\sigma_v$ を満たす条件を $N_\mu$ で書き直し、その制約下で $\|u\|_\mu^2$ を最小にする $u$ を求めよ。等号成立条件まで導け。

<!-- solution-start -->
**詳細解答**。$\sigma_u=\sigma_v$ の意味は、すべての $\phi$ で $\int\nabla\phi\cdot(u-v)d\mu=0$ となることです。[分布的接方向と不可視速度](#def-otr20-direction)の定義より $u-v\in N_\mu$。[接空間と不可視速度の直交分解](#prop-otr20-splitting)で $v=P_\mu v+n_0$ とすれば、$u=P_\mu v+(n_0+u-v)$ と表され、括弧内は $N_\mu$ に属します。

$$
\|u\|_\mu^2
=\|P_\mu v\|_\mu^2+\|n_0+u-v\|_\mu^2
\ge\|P_\mu v\|_\mu^2.
$$

$u=P_\mu v$ は差が $-n_0\in N_\mu$ なので許容されます。等号は $n_0+u-v=0$、すなわち $u=P_\mu v$ のときに限ります。これは単なる作用の下界でなく、最小速度の一意性も示します。
<!-- solution-end -->

### OTR20-B02 線形速度場を勾配と回転へ分解する
- Level: B

$\mu=\mathcal N_2(0,I_2)$ とし、$v(x)=(0,x_1)$ を考える。$v=p+n$ を $p=\nabla\psi\in T_\mu\mathcal P_2$、$n\in N_\mu$ に分け、射影後の二乗作用を計算せよ。

<!-- solution-start -->
**詳細解答**。行列を対称部分と反対称部分へ分けると

$$
\begin{pmatrix}0&0\\1&0\end{pmatrix}
=\frac12\begin{pmatrix}0&1\\1&0\end{pmatrix}
+\frac12\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$

従って $p(x)=(x_2/2,x_1/2)=\nabla(x_1x_2/2)$、$n(x)=(-x_2/2,x_1/2)=Jx/2$ です。$p$ は二次多項式の cutoff によって $L^2(\mu)$ の勾配閉包に属します。$n$ は[Gaussianの回転場の検算](#def-otr20-direction)から不可視です。[接空間と不可視速度の直交分解](#prop-otr20-splitting)の一意性により $P_\mu v=p$。

$$
\|p\|_\mu^2=\frac14(E[X_1^2]+E[X_2^2])=\frac12,
\quad\|n\|_\mu^2=\frac12,
\quad\|v\|_\mu^2=E[X_1^2]=1.
$$

二乗作用は $1$ から $1/2$ に減ります。
<!-- solution-end -->

### OTR20-B03 Gaussianの膨張曲線と余分な回転
- Level: B

$0\le t\le1$、$\mu_t=\mathcal N_2(0,(1+t)^2I_2)$ とし、$v_t(x)=x/(1+t)$ を考える。$v_t$ が連続の方程式を満たすことを説明し、$|\mu'|(t)$ と $\|v_t\|_{\mu_t}$ を計算せよ。さらに $w_t(x)=Jx$ を加えた速度場の作用がどれだけ増えるか求めよ。

<!-- solution-start -->
**詳細解答**。$X\sim\mathcal N_2(0,I_2)$、$X_t=(1+t)X$ とすれば $X_t$ の法則が $\mu_t$ で、$\dot X_t=X=X_t/(1+t)=v_t(X_t)$ です。任意の試験関数 $\varphi(t,x)$ に連鎖律を適用し期待値を取ると、[流れによる弱形式](../OTR17/index.md#thm-otr17-flow)と同じ計算で保存則が成立します。

[Gaussianの最適輸送公式](../OTR14/index.md#thm-otr14-gaussian-w2-spd)で $W_2(\mu_s,\mu_t)^2=2(t-s)^2$ なので $|\mu'|(t)=\sqrt2$。一方

$$
\|v_t\|_{\mu_t}^2
=\frac{E|X_t|^2}{(1+t)^2}
=\frac{2(1+t)^2}{(1+t)^2}=2.
$$

$\rho_t$ は半径だけで決まるので $\nabla\cdot(\rho_tJx)=0$、従って $v_t+Jx$ も保存則を満たします。$x\cdot Jx=0$ なので時刻 $t$ での追加作用は

$$
\|v_t+Jx\|_{\mu_t}^2-\|v_t\|_{\mu_t}^2
=E|JX_t|^2=2(1+t)^2.
$$

全区間での作用差は $\int_0^12(1+t)^2dt=2[(1+t)^3/3]_0^1=14/3$ です。
<!-- solution-end -->

### OTR20-B04 重み付きPoisson式を直接確かめる
- Level: B

$\rho(x)=(2\pi)^{-1}e^{-|x|^2/2}$、$v(x)=x+2Jx$ とする。$\psi(x)=|x|^2/2$ が $-\nabla\cdot(\rho\nabla\psi)=-\nabla\cdot(\rho v)$ を満たすことを各項の発散計算で示し、接成分を答えよ。

<!-- solution-start -->
**詳細解答**。$\nabla\psi=x$ です。積の微分と $\nabla\rho=-x\rho$ から

$$
\nabla\cdot(\rho\nabla\psi)
=\nabla\rho\cdot x+\rho\nabla\cdot x
=(-|x|^2+2)\rho.
$$

回転部分では $\nabla\cdot(\rho Jx)=(-x\rho)\cdot Jx+\rho\operatorname{tr}J=0$ です。よって

$$
\nabla\cdot(\rho v)
=\nabla\cdot(\rho x)+2\nabla\cdot(\rho Jx)
=(2-|x|^2)\rho.
$$

二つの発散は一致します。$x$ は二次モーメントの cutoff 近似により $T_\mu\mathcal P_2$ の元で、差 $2Jx$ は $N_\mu$ に属します。[重み付きPoisson射影の特徴付け](#prop-otr20-poisson)により $P_\mu v=x$ です。
<!-- solution-end -->

### OTR20-C01 Gaussian上の一般線形速度場の射影
- Level: C

$\mu=\mathcal N_d(0,I_d)$、$A\in\mathbb R^{d\times d}$、$v(x)=Ax$ とする。$S=(A+A^{\mathsf T})/2$、$K=(A-A^{\mathsf T})/2$ と置き、次を示せ。

1. $Sx$ は接空間の元で、$Kx$ は不可視速度である。
2. $P_\mu v$ と最小二乗作用を $S,K$ の成分で求めよ。
3. $d=2$、$A=\begin{pmatrix}1&-2\\2&3\end{pmatrix}$ の数値を計算せよ。

<!-- solution-start -->
**詳細解答**。対称行列 $S$ に対して $q(x)=\tfrac12x^{\mathsf T}Sx$ と置くと、成分微分により

$$
\partial_iq=\frac12\sum_j(S_{ij}+S_{ji})x_j
=\sum_j S_{ij}x_j,
\qquad\nabla q=Sx.
$$

二次関数の cutoff $q\chi_R$ の勾配は $\chi_RSx+q\nabla\chi_R$ です。$|q(x)|\le C|x|^2$、$|\nabla\chi_R|\le C/R$、環帯では $|x|/R\le2$ より、$Sx$ との差は $C'|x|\boldsymbol1_{|x|\ge R}$ で支配されます。Gaussian の二次モーメントが有限なので $L^2(\mu)$ 極限は $Sx$、従って接空間に属します。

$K^{\mathsf T}=-K$ なので $x\cdot Kx=0$、また $\operatorname{tr}K=0$ です。$\nabla\rho=-x\rho$ により

$$
\nabla\cdot(\rho Kx)
=-\rho x\cdot Kx+\rho\operatorname{tr}K=0.
$$

第1節と同様に部分積分し、$Kx\in N_\mu$ を得ます。[接空間と不可視速度の直交分解](#prop-otr20-splitting)で $P_\mu v=Sx$ です。

標準 Gaussian の共分散 $E[XX^{\mathsf T}]=I_d$ を成分ごとに使うと

$$
\begin{aligned}
\|Sx\|_\mu^2
&=E\sum_i\left(\sum_j S_{ij}X_j\right)^2\\
&=\sum_{i,j,k}S_{ij}S_{ik}E[X_jX_k]\\
&=\sum_{i,j}S_{ij}^2=\operatorname{tr}(S^{\mathsf T}S),
\end{aligned}
$$

同様に $\|Kx\|_\mu^2=\operatorname{tr}(K^{\mathsf T}K)$ で、直交性から元の作用は両者の和です。

指定行列では

$$
S=\begin{pmatrix}1&0\\0&3\end{pmatrix},
\qquad K=\begin{pmatrix}0&-2\\2&0\end{pmatrix}.
$$

従って最小速度は $(x_1,3x_2)$、最小作用は $1^2+3^2=10$、不可視部分の作用は $(-2)^2+2^2=8$、元の作用は $18$ です。$\sigma_v$ を変えずに $8$ を除けます。
<!-- solution-end -->

### OTR20-C02 二次位置エネルギーの下降流
- Level: C

$\mu_0\in\mathcal P_2(\mathbb R^d)$ とし、$X_t(x)=e^{-t}x$、$\mu_t=(X_t)_\#\mu_0$（$t\ge0$）と置く。$\mathcal F(\mu)=\tfrac12\int|x|^2d\mu$ について、次を示せ。

1. $v_t(z)=-z$ が測度弱形式の連続の方程式を満たす。
2. $|\mu'|(t)$ と $\|v_t\|_{\mu_t}$ は一致する。
3. $\mathcal F(\mu_t)$ を微分し、$d\mathcal F/dt=-\|v_t\|_{\mu_t}^2$ を確かめよ。
4. $\mu_0=\delta_a$ のときにもすべての計算が成立することを説明せよ。

<!-- solution-start -->
**詳細解答**。$\mu_t$ は $e^{-t}$ による押し出しなので、$Z_t=e^{-t}X$（$X\sim\mu_0$）は $\dot Z_t=-Z_t$ を満たします。$\varphi\in C_c^1([0,T]\times\mathbb R^d)$ に対して

$$
\frac{d}{dt}\varphi(t,Z_t)
=\partial_t\varphi(t,Z_t)-\nabla\varphi(t,Z_t)\cdot Z_t.
$$

これを $t=0$ から $T$ まで積分して期待値を取ると

$$
\int\varphi(T,z)d\mu_T-\int\varphi(0,z)d\mu_0
=\int_0^T\int(\partial_t\varphi+\nabla\varphi\cdot v_t)d\mu_tdt.
$$

有限時間では $E|Z_t|^2=e^{-2t}E|X|^2$ が一様に有限で、$v_t$ は二乗可積分です。次の距離公式から $W_2$ についての連続性を確認します。$s<t$ の写像 $z\mapsto e^{-(t-s)}z$ は正の倍率で、凸二次関数の勾配です。ただし、出発測度が原子を持つ場合に[Brenierの定理](../OTR13/index.md#thm-otr13-brenier)の絶対連続性仮定を使うことはできません。ここでは任意の結合の二乗費用を展開し、Cauchy–Schwarz から直接最適性を示します。

$$
\begin{aligned}
E|Y-Z|^2
&=E|Y|^2+E|Z|^2-2E(Y\cdot Z)\\
&\ge E|Y|^2+E|Z|^2-2\sqrt{E|Y|^2E|Z|^2}\\
&=(e^{-s}-e^{-t})^2M_2,
\end{aligned}
$$

ただし $M_2=\int|x|^2d\mu_0(x)$ としました。$Y=e^{-s}X,Z=e^{-t}X$ の同一点結合は $Y,Z$ が正の比例関係にあるので等号を達成します。従って

$$
W_2(\mu_s,\mu_t)^2=(e^{-s}-e^{-t})^2M_2,
\qquad |\mu'|(t)=e^{-t}\sqrt{M_2}.
$$

速度場 $v_t(z)=-z$ について $\|v_t\|_{\mu_t}^2=E|Z_t|^2=e^{-2t}M_2=|\mu'|(t)^2$ です。$-z$ は $-\nabla(|z|^2/2)$ であり、二次モーメントの cutoff 近似から接空間に属します。従って[正準速度の定理](#thm-otr20-canonical)とも一致します。

エネルギーは

$$
\mathcal F(\mu_t)=\frac12E|e^{-t}X|^2
=\frac12e^{-2t}M_2,
\qquad\frac{d}{dt}\mathcal F(\mu_t)=-e^{-2t}M_2
=-\|v_t\|_{\mu_t}^2.
$$

ここでは $\nabla(|x|^2/2)=x$ が形式的な下降方向の候補で、選んだ速度はその負です。本問で厳密に確認したのは、この押し出し曲線上での連続の方程式、距離微分、散逸等式です。特に原子測度を含む任意の $\mu_0$ でエネルギーの全方向微分や滑らかな $W_2$-Riemann構造が存在すると主張してはいません。$\mu_0=\delta_a$ なら $M_2=|a|^2$、$\mu_t=\delta_{e^{-t}a}$、$W_2(\delta_{e^{-s}a},\delta_{e^{-t}a})=|e^{-s}-e^{-t}|\,|a|$ です。密度は存在しませんが、押し出しと速度・エネルギーの計算はそのまま正当です。
<!-- solution-end -->

## 9. 今回の結論と次の問い

- 測度の変化を作る速度場は一意とは限りません。不可視な速度を取り除いた**勾配場の $L^2$ 閉包への射影**が、一意の最小作用速度を与えます。
- この構成は Dirac測度を含む一般の $\mathcal P_2(\mathbb R^d)$ で厳密です。[OTR18の距離微分](../OTR18/index.md#thm-otr18-metric-speed)とも一致します。
- 滑らかな正密度では重み付き Poisson 方程式と第一変分によって、形式的な $W_2$ 勾配を計算できます。ただし形式的 Riemann 計算だけで一般の勾配流の解の存在が出るわけではありません。

次の OTR21 では、位置エネルギーに加え、エントロピー・相互作用エネルギーの第一変分を具体的に計算します。どのエネルギーが熱方程式・Fokker–Planck 方程式を生むかを、境界項と符号を確かめながら調べます。
