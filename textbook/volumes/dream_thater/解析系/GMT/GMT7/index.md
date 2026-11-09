# GMT7 高次元・Grassmann射影

<!-- definition-example-audit: strict -->

[GMT5の平面射影次元定理](../GMT5/index.md#thm-gmt5-marstrand-dimension)と[GMT6の正測度定理](../GMT6/index.md#thm-gmt6-marstrand-positive-measure)では、平面から直線へ影を落としました。今回は $d$ 次元空間から $m$ 次元の部分空間へ射影します（$d\ge2$、$1\le m<d$）。

例えば $\mathbb R^3$ の立方体を平面に射影すれば通常は面積を持ちますが、直線分を平面に射影しても面積は生じません。影が持つ**次元**と**面積に相当する測度**を区別する必要があります。

平面では方向角 $\theta$ を平均しました。高次元では全ての $m$ 次元線形部分空間の集合 $G(d,m)$ を平均します。必要な道具を順に作ります。

1. 部分空間と直交射影を行列で確認し、回転に依存しない確率測度を定める。
2. 射影された距離の負べきの平均をBeta積分で計算する。
3. energyの有限性から、ほとんど全ての射影のHausdorff次元を決める。
4. 部分空間上のFourier積分を全空間の重み付き積分に直し、影の正の $m$ 次元測度を示す。

以下 $\mathcal H^t$、$\dim_H$ は[MT8のHausdorff測度・次元](../../MT/MT8/index.md#def-mt8-hausdorff-dimension)、$I_t$ は[GMT3のRiesz energy](../GMT3/index.md#def-gmt3-riesz-energy)です。$\mathcal L^m_V$ は、$V$ の任意の正規直交基底で $V\cong\mathbb R^m$ と同一視したときの$m$次元Lebesgue測度であり、基底の選択に依存しません。

## 1. 方向の代わりに部分空間を動かす

線形部分空間 $V$ の**正規直交基底** $v_1,\ldots,v_m$ を列に並べた $d\times m$ 行列を $A$ とします。$A^{\mathsf T}A=I_m$ であり、$P_V=AA^{\mathsf T}$ は $\mathbb R^d$ から $V$ への直交射影を表します。実際、

$$
P_Vx=\sum_{j=1}^m(x\cdot v_j)v_j,\qquad
x-P_Vx\perp v_j\quad(1\le j\le m).
$$

基底を別の正規直交基底 $AQ$（$Q^{\mathsf T}Q=I_m$）へ替えても $(AQ)(AQ)^{\mathsf T}=AA^{\mathsf T}$ です。したがって射影は基底によらず $V$ だけで決まります。射影距離は直交分解から

$$
|x-y|^2=|P_V(x-y)|^2+|(I-P_V)(x-y)|^2
$$

を満たすので、$|P_Vx-P_Vy|\le|x-y|$、すなわち $1$-Lipschitzです。

回転とは $R^{\mathsf T}R=I_d$ を満たす直交行列 $R\in O(d)$ による変換で、長さと角度を保存します。$G(d,m)$ は全ての $m$ 次元線形部分空間の集合であり、$V\mapsto P_V$ と同一視すると、対称・冪等・跡$m$の行列全体というコンパクト集合になります。

全方向を「等しい重み」で扱うため、回転 $R$ により $V$ を $RV$ へ移しても変わらない確率測度を使います。この性質を以下の定義で**回転不変**と呼びます。

<a id="def-gmt7-grassmann-projection"></a>

<!-- formal-statement-start -->
> **定義（Grassmann空間・直交射影・回転不変確率）**  
> 整数 $d\ge2$、$1\le m<d$ とする。$G(d,m)$ は $\mathbb R^d$ の全ての $m$ 次元線形部分空間の集合である。$V\in G(d,m)$ に対する直交射影は

$$
\pi_V=P_V:\mathbb R^d\longrightarrow V
$$

> である。$G(d,m)$ 上のBorel確率測度 $\gamma_{d,m}$ が**回転不変**であるとは、任意の $R\in O(d)$ とBorel集合 $B\subset G(d,m)$ に対して

$$
\gamma_{d,m}(RB)=\gamma_{d,m}(B)
$$

> が成り立つことをいう。一意の回転不変Borel確率を $\gamma_{d,m}$ と書く。$\mathbb R^d$ 上の有限非負Borel測度 $\mu$ の射影測度は

$$
\nu_V=(\pi_V)_\#\mu
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt7-grassmann-projection -->
**定義の確認**

$\mathbb R^3$ の平面で確かめます。

$d=3,m=2$、$V=\operatorname{span}(e_1,e_2)$ とします。列行列 $A=(e_1,e_2)$ は $A^{\mathsf T}A=I_2$ を満たし、

$$
P_V=AA^{\mathsf T}=
\begin{pmatrix}1&0&0\\0&1&0\\0&0&0\end{pmatrix},
\qquad \pi_V(x_1,x_2,x_3)=(x_1,x_2,0).
$$

正規直交基底を回しても $P_V$ は同じです。また $R\in O(3)$ に対して $P_{RV}=RP_VR^{\mathsf T}$ なので、回転した立方体と観測平面を同時に回せば射影距離・面積が変わりません。

確率測度の実際の作り方も確認します。独立な標準正規分布の $d$ 次元列ベクトル $Z_1,\ldots,Z_m$ を取り、$V=\operatorname{span}(Z_1,\ldots,Z_m)$ とします。連続密度を持つため列は確率1で一次独立です。$RZ_j$ も同じ同時分布を持つので、$V$ と $RV$ の分布は等しく、Borel確率かつ回転不変の条件を満たします。ここでの正規分布は方向を作る補助乱数であり、射影する測度 $\mu$ に正規性を仮定していません。
<!-- definition-example-end -->

回転不変確率の一意性は、コンパクト直交群 $O(d)$ の正規化Haar確率を $R\mapsto RV_0$ で押し出す構成から従います。具体的にはHaar確率による平均は $V_0$ に依存せず、他の回転不変確率でさらに平均しても値が変わりません。存在は上のGaussian構成でも直接確認できました。以降の積分に必要なのは回転不変性と全質量1だけです。

## 2. 射影距離の特異核を平均する

[GMT5の方向平均核](../GMT5/index.md#lem-gmt5-angular-kernel)に相当するのは、$z=x-y\ne0$ に対する $|\pi_Vz|^{-t}$ の $G(d,m)$ 平均です。$\pi_Vz=0$ となる部分空間では被積分関数を $+\infty$ と定めます。

回転不変性から、平均値は $|z|^{-t}$ の定数倍です。定数を計算するため、$z/|z|$ を $e_1$ へ回します。ランダムな部分空間に固定ベクトルを射影する長さの分布は、単位球面上の一様なベクトル $U=(U_1,\ldots,U_d)$ の最初の $m$ 成分の二乗和と一致します。

Gamma関数を $\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}\,du$（$a>0$）とし、Beta積分を

$$
B(a,b)=\int_0^1u^{a-1}(1-u)^{b-1}\,du
=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
\quad(a,b>0)
$$

と書きます。最後の等式は二変数のGamma積分で $r=u+v$、$w=u/(u+v)$ と置き、Jacobian $r$ を使うと導けます。

<a id="lem-gmt7-grassmann-kernel"></a>

<!-- formal-statement-start -->
> **補題（Grassmann射影の特異核平均）**  
> $d\ge2$、$1\le m<d$、$z\in\mathbb R^d\setminus\{0\}$ とする。$0<t<m$ なら

$$
\int_{G(d,m)}|\pi_Vz|^{-t}\,d\gamma_{d,m}(V)
=C_{d,m,t}|z|^{-t},\qquad
C_{d,m,t}=
\frac{\Gamma(d/2)\Gamma((m-t)/2)}
{\Gamma(m/2)\Gamma((d-t)/2)}.
$$

> $t\ge m$ では左辺は $+\infty$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

方向の一様分布をGaussianベクトルの長さで正規化して作ります。独立な二つの二乗長さの比がBeta分布になることを、密度の変数変換から導きます。$t<m$ の条件はBeta積分の原点における収束条件です。

<!-- proof-start -->
### 証明

回転不変性と $\pi_V(az)=a\pi_Vz$ から $|z|=1$ の場合だけ示せば十分です。直交変換で $z=e_1$ とします。

$g_1,\ldots,g_d$ を独立な標準正規確率変数とし、$U=g/|g|$ とします。$g=0$ の確率は0です。密度が $e^{-|g|^2/2}$ の定数倍なので、極座標を使うと $U$ は球面の回転不変な一様確率分布です。したがって

$$
X=|\pi_Ve_1|^2\quad\text{の分布}
=\frac{A}{A+B}\quad\text{の分布},
\quad A=\sum_{j=1}^{m}g_j^2,\quad
B=\sum_{j=m+1}^{d}g_j^2.
$$

ここでの右辺は、ランダム回転した $m$ 平面への $e_1$ の射影を、固定した座標平面へのランダム単位ベクトルの射影へ移したものです。$A,B$ は独立であり、Gauss積分を極座標に直すとそれぞれ密度

$$
p_A(a)=\frac{a^{m/2-1}e^{-a/2}}{2^{m/2}\Gamma(m/2)},\qquad
p_B(b)=\frac{b^{(d-m)/2-1}e^{-b/2}}
{2^{(d-m)/2}\Gamma((d-m)/2)}
\quad(a,b>0)
$$

を持ちます。変数を $u=a/(a+b)$、$r=a+b$ とすると

$$
a=ru,\quad b=r(1-u),\quad
\left|\frac{\partial(a,b)}{\partial(r,u)}\right|=r.
$$

積密度にJacobianを掛け、$r$ を積分すると

$$
\begin{aligned}
p_X(u)
&=\frac{u^{m/2-1}(1-u)^{(d-m)/2-1}}
{2^{d/2}\Gamma(m/2)\Gamma((d-m)/2)}
\int_0^\infty r^{d/2-1}e^{-r/2}\,dr\\
&=\frac{\Gamma(d/2)}
{\Gamma(m/2)\Gamma((d-m)/2)}
u^{m/2-1}(1-u)^{(d-m)/2-1},
\quad 0<u<1.
\end{aligned}
$$

最後の積分で $v=r/2$ と置けば $2^{d/2}\Gamma(d/2)$ となります。よって

$$
\begin{aligned}
\mathbb E|\pi_Ve_1|^{-t}
&=\mathbb E X^{-t/2}\\
&=\frac{B((m-t)/2,(d-m)/2)}
{B(m/2,(d-m)/2)}\\
&=\frac{\Gamma(d/2)\Gamma((m-t)/2)}
{\Gamma(m/2)\Gamma((d-t)/2)}.
\end{aligned}
$$

$u=0$ 付近の被積分関数は $u^{(m-t)/2-1}$ に比例するため、収束条件は $(m-t)/2>0$、すなわち $t<m$ です。$t\ge m$ では発散します。一般の $z$ へ斉次性で戻して証明を終えます。$\square$
<!-- proof-end -->

この核公式を、射影測度 $\nu_V=(\pi_V)_\#\mu$ に使います。押し出し測度では $\iint F(u,v)\,d\nu_V(u)d\nu_V(v)=\iint F(\pi_Vx,\pi_Vy)\,d\mu(x)d\mu(y)$ です。

<a id="cor-gmt7-projection-energy"></a>

<!-- formal-statement-start -->
> **系（射影energyのGrassmann平均）**  
> $d\ge2$、$1\le m<d$、$0<t<m$ とし、$\mu$ を $\mathbb R^d$ 上の有限非負Borel測度とする。$\nu_V=(\pi_V)_\#\mu$ に対し、無限大を許す等式

$$
\int_{G(d,m)} I_t(\nu_V)\,d\gamma_{d,m}(V)
=C_{d,m,t}I_t(\mu)
$$

> が成り立つ。対角 $x=y$ および射影差が零の点では核を $+\infty$ と読む。
<!-- formal-statement-end -->

### 証明の見取り図

二重積分と方向平均を交換する前に、被積分関数が非負可測であることを確認します。

<!-- proof-start -->
### 証明

$(V,x,y)\mapsto|\pi_V(x-y)|^{-t}$ は、$V\mapsto P_V$ の連続性により拡張非負Borel可測です。[押し出し測度の積分公式](../GMT5/index.md#lem-gmt5-projection-energy)と[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で

$$
\begin{aligned}
\int_GI_t(\nu_V)\,d\gamma(V)
&=\int_G\iint|\pi_V(x-y)|^{-t}\,d\mu(x)d\mu(y)d\gamma(V)\\
&=\iint\left(\int_G|\pi_V(x-y)|^{-t}d\gamma(V)\right)d\mu(x)d\mu(y)\\
&=C_{d,m,t}\iint|x-y|^{-t}\,d\mu(x)d\mu(y).
\end{aligned}
$$

$x=y$ でも両方の核が $+\infty$ なので、Tonelliによる拡張実数値の等式は有効です。$\square$
<!-- proof-end -->

## 3. ほとんど全ての $m$ 平面への射影次元

<a id="thm-gmt7-grassmann-dimension"></a>

<!-- formal-statement-start -->
> **定理（高次元Marstrand射影次元定理：コンパクト版）**  
> $d\ge2$、$1\le m<d$ とし、$K\subset\mathbb R^d$ を非空コンパクト集合とする。このとき $\gamma_{d,m}$ に関するほとんど全ての $V\in G(d,m)$ に対し

$$
\dim_H\pi_VK=\min\{\dim_HK,m\}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

上界は射影の $1$-Lipschitz性から全方向で成立します。下界は目標より小さい有理数 $t$ を選び、[Frostman測度](../GMT2/index.md#thm-gmt2-frostman)のenergyを射影平均へ移します。有理数を可算個だけ扱えば、例外集合も測度零にできます。

<!-- proof-start -->
### 証明

$D=\dim_HK$ とします。[MT8のLipschitz次元評価](../../MT/MT8/index.md#thm-mt8-lipschitz)と $\pi_VK\subset V\cong\mathbb R^m$ より、全ての $V$ で $\dim_H\pi_VK\le\min\{D,m\}$。$D=0$ ならこれで等号です。

$0<t<\min\{D,m\}$ を有理数として固定し、$t<s<D$ を選びます。[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)により $K$ 上に確率測度 $\mu_t$ があり、$\mu_t(B(x,r))\le Ar^s$ が全ての $x,r$ で成立します。[GMT3の球成長から有限energyへの定理](../GMT3/index.md#thm-gmt3-frostman-energy)を $t<s$ に適用して $I_t(\mu_t)<\infty$ です。

[射影energyの平均公式](#cor-gmt7-projection-energy)をこの測度へ適用すると

$$
\int_{G(d,m)}I_t((\pi_V)_\#\mu_t)d\gamma(V)
=C_{d,m,t}I_t(\mu_t)<\infty.
$$

非負積分が有限なので、例外零集合 $N_t$ の外では射影測度の $t$-energyが有限です。この射影測度は質量1を保ち、コンパクト集合 $\pi_VK$ に支えられます。[GMT3の有限energy次元下界](../GMT3/index.md#thm-gmt3-energy-dimension)を $V\cong\mathbb R^m$ 上で使えば $\dim_H\pi_VK\ge t$ です。

$N=\bigcup_{t\in\mathbb Q\cap(0,\min\{D,m\})}N_t$ は可算個の零集合の和で零測度。$V\notin N$ で全ての該当する有理数 $t$ の下界が成立し、$\dim_H\pi_VK\ge\min\{D,m\}$ を得ます。$\square$
<!-- proof-end -->

この結果は $\dim_HK=m$ の場合にも「ほとんど全ての影の次元が $m$」といいます。ただし、次元 $m$ の集合の $m$ 次元Lebesgue測度が正とは限りません。その違いを次節で調べます。

## 4. 部分空間上のFourier積分を全空間で評価する

ここで $m$ 次元球面の面積を $\sigma_{m-1}=2\pi^{m/2}/\Gamma(m/2)$ と書きます（$\sigma_0=2$）。これは極座標でGaussian積分を比較して得られる値です。

$V$ に正規直交座標を入れて $m$ 次元Lebesgue積分を考えます。全ての $V$ について球面方向を平均すると、回転不変性から全空間の単位球面の一様平均になります。これにより、$m$ 次元部分空間の極座標に現れる $r^{m-1}$ と、全空間の $r^{d-1}$ の差が $r^{m-d}$ という重みを生みます。

<a id="lem-gmt7-fourier-slice-average"></a>

<!-- formal-statement-start -->
> **補題（Grassmann平均と極座標）**  
> $d\ge2$、$1\le m<d$ とし、$F:\mathbb R^d\to[0,\infty]$ をBorel可測関数とする。$V$ 上のLebesgue測度を $d\mathcal L^m_V$ とすれば、無限大を許す恒等式

$$
\int_{G(d,m)}\int_VF(\xi)\,d\mathcal L^m_V(\xi)d\gamma_{d,m}(V)
=\frac{\sigma_{m-1}}{\sigma_{d-1}}
\int_{\mathbb R^d}F(\xi)|\xi|^{m-d}\,d\xi
$$

> が成り立つ。$\xi=0$ の重みの値は積分に影響しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $V$ の極座標で半径と単位方向に分け、方向の平均を回転不変性で全単位球面上の平均に置き換えます。最後に $\mathbb R^d$ の極座標へ戻します。

<!-- proof-start -->
### 証明

$S(V)=\{\omega\in V:|\omega|=1\}$ とします。各 $V$ での極座標は、非負関数について

$$
\int_VF(\xi)\,d\mathcal L^m_V(\xi)
=\int_0^\infty r^{m-1}\int_{S(V)}F(r\omega)\,d\sigma_V(\omega)\,dr.
$$

$m=1$ では $S(V)$ は二点で、球面積分は両点の値の和と解釈します。$V$ と $\omega$ を同時に回した結合分布は回転不変なので、各 $r>0$ に対し

$$
\int_G\int_{S(V)}F(r\omega)\,d\sigma_V(\omega)d\gamma(V)
=\frac{\sigma_{m-1}}{\sigma_{d-1}}
\int_{S^{d-1}}F(r\omega)\,d\sigma(\omega).
$$

係数は $F\equiv1$ を代入すれば左辺が $\sigma_{m-1}$、右辺の球面積分が $\sigma_{d-1}$ となるので確定します。この球面上の平均の一意性は回転不変な球面確率が一意であることによります。

非負性でTonelliを使い上式を半径積分へ戻すと

$$
\begin{aligned}
\int_G\int_VF\,d\mathcal L^m_Vd\gamma
&=\frac{\sigma_{m-1}}{\sigma_{d-1}}
\int_0^\infty r^{m-1}\int_{S^{d-1}}F(r\omega)d\sigma(\omega)\,dr\\
&=\frac{\sigma_{m-1}}{\sigma_{d-1}}
\int_{\mathbb R^d}F(\xi)|\xi|^{m-d}\,d\xi,
\end{aligned}
$$

です。最後の等式は $d\xi=r^{d-1}dr\,d\sigma(\omega)$ を使います。$\square$
<!-- proof-end -->

次に測度 $\nu$ が $V\cong\mathbb R^m$ 上の $L^2$ 密度を持つかを判定します。$m=1$ は[GMT6のFourier $L^2$ 判定](../GMT6/index.md#lem-gmt6-fourier-l2-density)です。多変数でも、Gaussianによる同じ論法が成り立つことを省略せず確認します。

<a id="lem-gmt7-multidimensional-l2"></a>

<!-- formal-statement-start -->
> **補題（部分空間上の有限測度のFourier L2判定）**  
> $V$ を $m$ 次元Euclid部分空間とし、$\nu$ を $V$ 上の有限非負Borel測度とする。$\widehat\nu(\xi)=\int_Ve^{-ix\cdot\xi}\,d\nu(x)$（$\xi\in V$）と定める。このとき $\widehat\nu\in L^2(V)$ であることと、$\nu=f\,d\mathcal L^m_V$ となる非負関数 $f\in L^1(V)\cap L^2(V)$ が存在することは同値であり、

$$
\|f\|_{L^2(V)}^2=(2\pi)^{-m}
\int_V|\widehat\nu(\xi)|^2\,d\mathcal L^m_V(\xi).
$$
<!-- formal-statement-end -->

### 証明の見取り図

正規直交座標で $V=\mathbb R^m$ とみなします。各座標のGaussianを掛け、Fourier側で優収束を使って $L^2$ 極限を作ります。関数の極限と測度の同一性は、コンパクト台を持つ連続関数との積分で決めます。

<!-- proof-start -->
### 証明

密度がある方向は、[FOU4のPlancherel定理](../../FOU/FOU4/index.md#thm-fou4-l1-l2-compatibility)を各座標に反復適用して直ちに得ます。逆向きに $\widehat\nu\in L^2(V)$ とし、$\varepsilon>0$ について

$$
\rho_\varepsilon(x)=(4\pi\varepsilon)^{-m/2}
e^{-|x|^2/(4\varepsilon)},\qquad
g_\varepsilon(x)=\int_V\rho_\varepsilon(x-y)\,d\nu(y)
$$

と置きます。[GMT4のGaussian正則化](../GMT4/index.md#lem-gmt4-heat-fourier)を次元 $m$ に適用すると $g_\varepsilon\ge0$、$\|g_\varepsilon\|_1=M=\nu(V)$、$\|g_\varepsilon\|_\infty\le M(4\pi\varepsilon)^{-m/2}$ なので $L^1\cap L^2$ に入り、$\widehat g_\varepsilon(\xi)=e^{-\varepsilon|\xi|^2}\widehat\nu(\xi)$ です。

Plancherelと[優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)により

$$
\|g_\varepsilon-g_\delta\|_2^2
=(2\pi)^{-m}\int_V
|e^{-\varepsilon|\xi|^2}-e^{-\delta|\xi|^2}|^2
|\widehat\nu(\xi)|^2\,d\xi\longrightarrow0
$$

です。差の二乗は $4|\widehat\nu|^2$ 以下で積分可能です。よって $g_\varepsilon\to f$ in $L^2(V)$。非負関数の $L^2$ 極限だから $f\ge0$ がほとんど至る所で成立します。

$\varphi\in C_c(V)$ を固定すると、$\varphi\in L^2$ なので $\int\varphi g_\varepsilon\to\int\varphi f$。他方、絶対可積分なFubiniを使って

$$
\int_V\varphi(x)g_\varepsilon(x)\,dx
=\int_V\left(\int_V\varphi(y+z)\rho_\varepsilon(z)\,dz\right)d\nu(y).
$$

$\varphi$ の一様連続性により、内側は $\varphi(y)$ へ一様収束します。実際 $|z|<\eta$ で一様連続性を、$|z|\ge\eta$ でGaussian尾確率 $\int_{|z|\ge\eta}\rho_\varepsilon(z)dz\to0$ を使えばよいのです。測度 $\nu$ は有限なので右辺は $\int\varphi\,d\nu$ へ収束します。従って全ての $\varphi\in C_c(V)$ で $\int\varphi f\,dx=\int\varphi\,d\nu$。

非負Radon測度の一致から $\nu=f\,dx$ となり、全質量が有限なので $\int f\,dx=M$ です。最後にPlancherelと優収束で

$$
\|f\|_2^2
=\lim_{\varepsilon\downarrow0}\|g_\varepsilon\|_2^2
=(2\pi)^{-m}\int_V|\widehat\nu(\xi)|^2\,d\xi.
$$

逆方向と合わせて証明しました。$\square$
<!-- proof-end -->

## 5. 次元が $m$ を超えると影に正の体積が残る

角周波数規約の[GMT4のRiesz energyのFourier表示](../GMT4/index.md#thm-gmt4-fourier-energy)は

$$
I_s(\mu)=c_{d,s}\int_{\mathbb R^d}
|\widehat\mu(\xi)|^2|\xi|^{s-d}\,d\xi,\qquad
c_{d,s}=\frac{\Gamma((d-s)/2)}
{2^s\pi^{d/2}\Gamma(s/2)}
$$

です。$m<s<d$ なら、$|\xi|>1$ で $|\xi|^{m-d}\le|\xi|^{s-d}$。低周波は $|\widehat\mu|\le M$ で抑えられます。

<a id="prop-gmt7-energy-to-l2"></a>

<!-- formal-statement-start -->
> **命題（高指数energyによる射影密度の平均評価）**  
> $d\ge2$、$1\le m<d$、$m<s<d$ とする。$\mu$ を $\mathbb R^d$ 上の有限非負Borel測度、$M=\mu(\mathbb R^d)$ とし、$I_s(\mu)<\infty$ と仮定する。このとき $\gamma_{d,m}$ ほとんど全ての $V$ で $\nu_V=(\pi_V)_\#\mu$ は $L^2(V)$ 密度 $f_V$ を持ち、

$$
\int_G\|f_V\|_{L^2(V)}^2\,d\gamma(V)
\le Q_{d,m,s}(\mu)
:=\frac{\sigma_{m-1}}{(2\pi)^m\sigma_{d-1}}
\left(\frac{\sigma_{d-1}}{m}M^2+
\frac{I_s(\mu)}{c_{d,s}}\right)<\infty.
$$

> 左辺は、$\int_V|\widehat{\nu_V}|^2$ から定義される可測関数のほとんど至る所の値である。
<!-- formal-statement-end -->

### 証明の見取り図

射影のFourier変換は全空間のFourier変換の切片です。[Grassmann平均公式](#lem-gmt7-fourier-slice-average)で全空間の重み $|\xi|^{m-d}$ に直し、低周波と高周波を分けます。

<!-- proof-start -->
### 証明

$\xi\in V$ に対して $\xi\cdot\pi_Vx=\xi\cdot x$ です。押し出し測度の定義から

$$
\widehat{\nu_V}(\xi)
=\int_Ve^{-iu\cdot\xi}\,d\nu_V(u)
=\int_{\mathbb R^d}e^{-i\pi_Vx\cdot\xi}\,d\mu(x)
=\widehat\mu(\xi).
$$

$\widehat\mu$ は[GMT4の有界性補題](../GMT4/index.md#lem-gmt4-measure-fourier-bounds)により連続かつ $|\widehat\mu|\le M$ です。したがって[Grassmann平均公式](#lem-gmt7-fourier-slice-average)は非負可測関数 $F=|\widehat\mu|^2$ に適用でき、

$$
\int_G\int_V|\widehat{\nu_V}(\xi)|^2d\xi\,d\gamma(V)
=\frac{\sigma_{m-1}}{\sigma_{d-1}}
\int_{\mathbb R^d}|\widehat\mu(\xi)|^2|\xi|^{m-d}d\xi.
$$

右辺の低周波部分は $\int_{|\xi|\le1}M^2|\xi|^{m-d}d\xi=\sigma_{d-1}M^2/m$。$|\xi|>1$ では $m<s$ より $|\xi|^{m-d}\le|\xi|^{s-d}$ で、[GMT4のRiesz energyのFourier表示](../GMT4/index.md#thm-gmt4-fourier-energy)から

$$
\int_{|\xi|>1}|\widehat\mu(\xi)|^2|\xi|^{m-d}d\xi
\le c_{d,s}^{-1}I_s(\mu).
$$

よってGrassmann平均は有限です。非負関数の積分が有限だから、ほとんど全ての $V$ で $\widehat{\nu_V}\in L^2(V)$。[部分空間上のFourier $L^2$ 判定](#lem-gmt7-multidimensional-l2)で密度を得て、Plancherel係数 $(2\pi)^{-m}$ を掛けると主張の定数 $Q_{d,m,s}(\mu)$ になります。$\square$
<!-- proof-end -->

<a id="thm-gmt7-grassmann-positive-volume"></a>

<!-- formal-statement-start -->
> **定理（高次元Marstrand射影正測度定理：コンパクト版）**  
> $d\ge2$、$1\le m<d$ とし、$K\subset\mathbb R^d$ を非空コンパクト集合とする。$\dim_HK>m$ なら $\gamma_{d,m}$ に関するほとんど全ての $V\in G(d,m)$ について

$$
\mathcal L^m_V(\pi_VK)>0
$$

> が成り立つ。加えて、適切な $K$ 上の確率測度の射影はほとんど全ての $V$ で $L^2(V)$ 密度を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$m<s<t<\dim_HK$ を選んでFrostman測度を構成し、命題から密度を得ます。質量1の測度がコンパクトな影に支えられることをCauchy--Schwarzに入れれば、影の測度が正でなければなりません。

<!-- proof-start -->
### 証明

$D=\dim_HK>m$ とします。$D\le d$ なので $m<s<t<D$ を選べます。[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)により、$K$ 上に確率測度 $\mu$ が存在し $\mu(B(x,r))\le Ar^t$ を満たします。[GMT3の有限energy評価](../GMT3/index.md#thm-gmt3-frostman-energy)から $I_s(\mu)<\infty$ です。

[高指数energyによる射影密度評価](#prop-gmt7-energy-to-l2)から、例外零集合を除く $V$ で $\nu_V=f_V\,d\mathcal L^m_V$、$f_V\in L^2(V)$ です。射影で質量は保存されるため

$$
1=\nu_V(V)=\int_{\pi_VK}f_V(u)\,d\mathcal L^m_V(u).
$$

$K$ はコンパクトで射影は連続だから、$\pi_VK$ はコンパクト、従って可測です。[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)をこの積分へ使うと

$$
1\le\bigl(\mathcal L^m_V(\pi_VK)\bigr)^{1/2}\|f_V\|_2.
$$

$\|f_V\|_2$ は有限かつ質量1より正なので、$\mathcal L^m_V(\pi_VK)\ge\|f_V\|_2^{-2}>0$ です。$\square$
<!-- proof-end -->

コンパクト集合の可算和 $E=\bigcup_nK_n$ に対しても、$\dim_HE=\sup_n\dim_HK_n$ と[GMT5の可算和の扱い](../GMT5/index.md#cor-gmt5-sigma-compact)から、射影次元定理は成立します。$\dim_HE>m$ ならどれかの $K_n$ が $\dim_HK_n>m$ なので、正測度の結論も成立します。一般Borel集合への拡張には、Hausdorff次元を保つコンパクト部分集合の取り出し（capacitability）が別途必要です。[GMT6で述べた一般Borel集合への注意](../GMT6/index.md#cor-gmt6-sigma-compact)と同じであり、この講義の証明に集合論的補題を暗黙に混ぜません。

## 6. 具体例と臨界次元

### 例1：一方向で面積を失うが、一般の方向で残る

$d=m+1$、$K=[0,1]^m\times\{0\}$ とします。$V_0=\operatorname{span}(e_1,\ldots,e_m)$ では $\pi_{V_0}K=K$、$\mathcal L^m_{V_0}(\pi_{V_0}K)=1$ です。一方、$W=\operatorname{span}(e_1,\ldots,e_{m-1},e_{m+1})$ では $\pi_WK$ は $m-1$ 次元の面に収まり、$m$ 次元測度は0です。

$0\le\theta<\pi/2$、$V_\theta=\operatorname{span}(e_1,\ldots,e_{m-1},\cos\theta\,e_m+\sin\theta\,e_{m+1})$ とすると、最後の座標は $u_m=x_m\cos\theta$ です。従って影は $[0,1]^{m-1}\times[0,\cos\theta]$ となり、$m$ 次元測度は $\cos\theta$。単位質量の一様体積測度を押し出すと密度は $1/\cos\theta$、二乗ノルムは $1/\cos\theta$ となります。$\theta\uparrow\pi/2$ で密度が発散するのは、影が潰れるためです。

### 例2：臨界 $\dim_HK=m$ でも全ての影の体積が0

[GMT5の演習B4](../GMT5/index.md#ex-gmt5-b4)で構成したコンパクト $D\subset[0,1]$ は $\dim_HD=1$、$\mathcal L^1(D)=0$ です。$d>m$ で

$$
K=D\times[0,1]^{m-1}\times\{0\}^{d-m}
$$

を取ります（$m=1$ では中央の積を一点とみなす）。$K$ は $m$ 次元座標平面内にあり、Fubiniにより $\mathcal H^m(K)=\mathcal L^m(D\times[0,1]^{m-1})=0$。射影は $1$-Lipschitzなので[MT8のHausdorff測度評価](../../MT/MT8/index.md#thm-mt8-lipschitz)から全ての $V$ について $\mathcal H^m(\pi_VK)=0$、従って $\mathcal L^m_V(\pi_VK)=0$ です。

それでも $\dim_HK=m$ です。上界は $m$ 平面に含まれることから従います。下界には任意の $0<a<1$ を取り、$\dim_HD=1>a$ から[GMT2のFrostman補題](../GMT2/index.md#thm-gmt2-frostman)で $D$ 上の $a$-成長確率測度 $\lambda_a$ を取ります。$\lambda_a$ と $[0,1]^{m-1}$ 上の一様確率測度の積を $\eta_a$ とすると、半径 $r\le1$ の球は各座標で半径 $r$ の範囲に収まるので

$$
\eta_a(B(x,r))\le C_ar^a(2r)^{m-1}
=C_a2^{m-1}r^{a+m-1}.
$$

[GMT2の質量分布原理](../GMT2/index.md#thm-gmt2-frostman)から $\dim_HK\ge a+m-1$。$a\uparrow1$ として $\dim_HK\ge m$ です。したがって射影次元が $m$ なのに全ての射影体積が0となる例が得られました。

ここで破れたのは、正測度定理の $m<s<t<\dim_HK$ を選ぶ余裕です。次元定理の $t<m$ の核積分は成立しますが、$t=m$ で核平均が発散し、高指数energyによる $L^2$ 評価にも進めません。

## 7. 演習

### Level A：定義・定数・射影密度

<a id="ex-gmt7-a1"></a>

**A1. 射影行列とLipschitz性**

- Level: A
- 問題: $\mathbb R^3$ の $V=\operatorname{span}(v)$、$v=(1,1,0)/\sqrt2$ について $P_V$ を求める。$P_V^2=P_V$、$P_V^{\mathsf T}=P_V$、$|P_Vz|\le|z|$ を定義から検算せよ。

<!-- solution-start -->
**詳細解答**

$v$ は単位ベクトルなので、係数 $z\cdot v$ を $v$ 倍したものが射影です。従って

$$
P_V=vv^{\mathsf T}=
\frac12\begin{pmatrix}1&1&0\\1&1&0\\0&0&0\end{pmatrix}.
$$

$v^{\mathsf T}v=1$ なので $P_V^2=v(v^{\mathsf T}v)v^{\mathsf T}=P_V$。転置は $(vv^{\mathsf T})^{\mathsf T}=vv^{\mathsf T}$。また $z=(z\cdot v)v+(z-(z\cdot v)v)$ は直交分解だから $|z|^2=|P_Vz|^2+|(I-P_V)z|^2\ge|P_Vz|^2$。平方根を取って結論します。
<!-- solution-end -->

<a id="ex-gmt7-a2"></a>

**A2. $\mathbb R^3$ から直線への負べき平均**

- Level: A
- 問題: $d=3,m=1$ で、$0<t<1$ に対する $C_{3,1,t}=1/(1-t)$ を、Gamma公式を用いず球面方向から計算せよ。$t=1$ の発散理由も述べよ。

<!-- solution-start -->
**詳細解答**

無作為な直線の単位方向を $u$ とします。$u$ と $-u$ は同じ直線ですが $|u\cdot e_1|$ はどちらでも同じです。球面の緯度帯の面積から $w=u\cdot e_1\in[-1,1]$ の密度は $1/2$ です。従って

$$
\mathbb E|u\cdot e_1|^{-t}
=\frac12\int_{-1}^1|w|^{-t}dw
=\int_0^1w^{-t}dw=\frac1{1-t}.
$$

$t=1$ なら $\int_0^1dw/w=\infty$。$w=0$ は射影が消える方向に当たり、その近傍の特異性が積分を発散させます。
<!-- solution-end -->

<a id="ex-gmt7-a3"></a>

**A3. $\mathbb R^3$ から平面への核平均**

- Level: A
- 問題: $d=3,m=2,t=1$ で $C_{3,2,1}=\pi/2$ を直接積分で導け。平面の法線の第一成分を一様変数として使ってよい。

<!-- solution-start -->
**詳細解答**

法線を単位ベクトル $n$ とすると $|\pi_Ve_1|^2=1-(e_1\cdot n)^2$。法線の第一成分 $w=e_1\cdot n$ は $[-1,1]$ の一様分布なので、

$$
C_{3,2,1}
=\frac12\int_{-1}^1(1-w^2)^{-1/2}dw
=\int_0^1\frac{dw}{\sqrt{1-w^2}}
=[\arcsin w]_0^1=\frac\pi2.
$$

端点の特異性は $1/\sqrt{1-w}$ 程度で積分可能です。
<!-- solution-end -->

<a id="ex-gmt7-a4"></a>

**A4. Fourier平均の係数をGaussianで検算**

- Level: A
- 問題: $d=3,m=2$、$F(\xi)=e^{-|\xi|^2}$ とする。[Grassmann平均公式](#lem-gmt7-fourier-slice-average)の左右がともに $\pi$ となることを確かめよ。

<!-- solution-start -->
**詳細解答**

任意の平面 $V\cong\mathbb R^2$ で極座標により

$$
\int_Ve^{-|\xi|^2}d\xi
=2\pi\int_0^\infty e^{-r^2}r\,dr
=\pi[-e^{-r^2}]_0^\infty=\pi.
$$

$\gamma_{3,2}$ は確率なので左辺も $\pi$。右辺は $\sigma_1/\sigma_2=(2\pi)/(4\pi)=1/2$ だから

$$
\frac12\int_{\mathbb R^3}e^{-|\xi|^2}|\xi|^{-1}d\xi
=\frac12(4\pi)\int_0^\infty e^{-r^2}r\,dr
=\frac12(4\pi)\frac12=\pi.
$$

$r^{2}$ の体積要素と $r^{-1}$ の重みを掛けた結果は $r$ となります。
<!-- solution-end -->

<a id="ex-gmt7-a5"></a>

**A5. 傾いた平面への押し出し密度**

- Level: A
- 問題: 例1の $K=[0,1]^m\times\{0\}$ 上の一様確率測度について、$0\le\theta<\pi/2$ の $\pi_{V_\theta}$ が持つ $L^2$ 密度と $\|f_\theta\|_2^2$ を求めよ。

<!-- solution-start -->
**詳細解答**

$V_\theta$ の正規直交座標では $\pi_{V_\theta}(x_1,\ldots,x_m,0)=(x_1,\ldots,x_{m-1},x_m\cos\theta)$。$c=\cos\theta>0$ とすると、任意のBorel集合 $A\subset V_\theta$ について最後の変数を $u_m=cx_m$ と置き、

$$
\nu_\theta(A)=\int_{[0,1]^m}\boldsymbol1_A(x_1,\ldots,cx_m)dx
=\int_Ac^{-1}\boldsymbol1_{[0,1]^{m-1}\times[0,c]}(u)du.
$$

密度は $f_\theta=c^{-1}\boldsymbol1_{\text{上記直方体}}$。非負可測で、全質量は $c^{-1}\cdot c=1$、二乗ノルムは $c^{-2}\cdot c=1/c<\infty$。定義の全条件を確認できました。
<!-- solution-end -->

### Level B：平均・次元・反例を接続する

<a id="ex-gmt7-b1"></a>

**B1. Beta密度から端点条件を再導出**

- Level: B
- 問題: $A,B$ がそれぞれ独立なGamma形密度 $a^{\alpha-1}e^{-a/2}/(2^\alpha\Gamma(\alpha))$、$b^{\beta-1}e^{-b/2}/(2^\beta\Gamma(\beta))$ を持つとする。$X=A/(A+B)$ の密度を導き、$\mathbb E X^{-q}<\infty$ の必要十分条件を示せ。

<!-- solution-start -->
**詳細解答**

$r=a+b>0$、$u=a/(a+b)\in(0,1)$ とすれば $a=ru$、$b=r(1-u)$、Jacobianは $r$。積密度は

$$
\frac{r^{\alpha+\beta-1}e^{-r/2}}{2^{\alpha+\beta}\Gamma(\alpha)\Gamma(\beta)}
u^{\alpha-1}(1-u)^{\beta-1}.
$$

$r$ を $0$ から $\infty$ まで積分すると $2^{\alpha+\beta}\Gamma(\alpha+\beta)$ を得るので

$$
p_X(u)=\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}
u^{\alpha-1}(1-u)^{\beta-1}.
$$

従って $\mathbb E X^{-q}$ の原点側は $\int_0u^{\alpha-q-1}du$ と比較でき、有限の条件は $\alpha-q>0$。$u=1$ 側は $\beta>0$ により積分可能です。有限の場合

$$
\mathbb EX^{-q}=\frac{\Gamma(\alpha+\beta)\Gamma(\alpha-q)}
{\Gamma(\alpha)\Gamma(\alpha+\beta-q)}.
$$

Grassmann核では $\alpha=m/2$、$\beta=(d-m)/2$、$q=t/2$ と対応します。
<!-- solution-end -->

<a id="ex-gmt7-b2"></a>

**B2. 可算コンパクト和の射影次元**

- Level: B
- 問題: $E=\bigcup_{n\ge1}K_n\subset\mathbb R^d$ をコンパクト集合の可算和とする。[高次元射影次元定理](#thm-gmt7-grassmann-dimension)だけを各 $K_n$ に用いて、$\gamma_{d,m}$ ほとんど全ての $V$ で $\dim_H\pi_VE=\min\{\dim_HE,m\}$ を導け。

<!-- solution-start -->
**詳細解答**

各 $K_n$ に対し例外零集合 $N_n$ を取り、$N=\bigcup_nN_n$ とします。可算劣加法性で $\gamma(N)=0$。$V\notin N$ では同時に

$$
\dim_H\pi_VK_n=\min\{\dim_HK_n,m\}
$$

が全 $n$ で成立します。Hausdorff次元の可算和則を元の集合と射影集合に使うと

$$
\begin{aligned}
\dim_H\pi_VE
&=\dim_H\bigcup_n\pi_VK_n
=\sup_n\dim_H\pi_VK_n\\
&=\sup_n\min\{\dim_HK_n,m\}
=\min\{\sup_n\dim_HK_n,m\}
=\min\{\dim_HE,m\}.
\end{aligned}
$$

空の $K_n$ は省いてよく、例外集合が可算和であることが重要です。
<!-- solution-end -->

<a id="ex-gmt7-b3"></a>

**B3. 直線分が平面に正の面積を作れない理由**

- Level: B
- 問題: $d=3,m=2$、$K=[0,1]e_1$ とする。任意の $V$ について $\dim_H\pi_VK$ と $\mathcal L^2_V(\pi_VK)$ を求めよ。また正測度定理の証明をこの $K$ に適用できない段階を明示せよ。

<!-- solution-start -->
**詳細解答**

$\pi_V(te_1)=tP_Ve_1$。$P_Ve_1=0$ のとき影は一点なので次元0、そうでなければ長さ $|P_Ve_1|$ の線分なので次元1です。いずれも平面内の一次元集合だから $\mathcal L^2_V(\pi_VK)=0$ です。

$K$ 自身の次元は1です。[正測度定理](#thm-gmt7-grassmann-positive-volume)の証明では $m=2<s<t<\dim_HK=1$ を要求しますが、そのような実数は存在しません。投影操作に誤りがあるのではなく、二次元密度を生むだけの高指数energyが用意できないのです。
<!-- solution-end -->

<a id="ex-gmt7-b4"></a>

**B4. $d=3,m=2$ の密度評価を定数まで計算**

- Level: B
- 問題: $\mu$ を $\mathbb R^3$ の確率測度、$5/2$-energyを $E<\infty$ とする。[平均密度評価](#prop-gmt7-energy-to-l2)を $\sigma_1=2\pi,\sigma_2=4\pi$ に代入して、$\int_G\|f_V\|_2^2d\gamma(V)\le(2\pi+E/c_{3,5/2})/(8\pi^2)$ を導け。

<!-- solution-start -->
**詳細解答**

$M=1$、$m=2$、$d=3$ なので球面積比は $\sigma_1/\sigma_2=1/2$、Plancherel係数は $(2\pi)^{-2}=1/(4\pi^2)$ です。低周波積分は

$$
\int_{|\xi|\le1}|\xi|^{2-3}d\xi
=4\pi\int_0^1r^{1}dr=2\pi.
$$

高周波は $|\xi|^{-1}\le|\xi|^{(5/2)-3}=|\xi|^{-1/2}$ なので[Fourier energy表示](../GMT4/index.md#thm-gmt4-fourier-energy)で $E/c_{3,5/2}$ 以下です。従って

$$
\int_G\|f_V\|_2^2d\gamma(V)
\le\frac1{4\pi^2}\cdot\frac12
\left(2\pi+\frac E{c_{3,5/2}}\right)
=\frac{2\pi+E/c_{3,5/2}}{8\pi^2}.
$$

球面積比とFourierの規格化を別々に掛けたので係数を取り違えていません。
<!-- solution-end -->

### Level C：定量的な射影評価

<a id="ex-gmt7-c1"></a>

**C1. 体積が小さい射影方向の確率**

- Level: C
- 問題: $d\ge2$、$1\le m<d$、$m<s<d$ とする。非空コンパクト集合 $K\subset\mathbb R^d$ 上に確率測度 $\mu$ があり $I_s(\mu)=E<\infty$ と仮定する。$Q=Q_{d,m,s}(\mu)$ を[高指数energyによる平均密度上界](#prop-gmt7-energy-to-l2)で定義する。任意の $a>0$ に対し

$$
\gamma_{d,m}\{V:\mathcal L^m_V(\pi_VK)\le a\}\le aQ
$$

を導け。特に体積が零となる方向の確率を求め、これが例外方向集合のHausdorff次元の上界ではない理由を述べよ。

<!-- solution-start -->
**詳細解答**

$\mu$ は確率測度なので射影後の質量は1です。[射影密度の平均評価](#prop-gmt7-energy-to-l2)により、零集合の外では $\nu_V=f_Vd\mathcal L^m_V$、$\int_G\|f_V\|_2^2d\gamma\le Q$。影はコンパクトで可測だから[Cauchy--Schwarz](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)で

$$
1=\int_{\pi_VK}f_V\,du
\le\mathcal L^m_V(\pi_VK)^{1/2}\|f_V\|_2.
$$

$A_a=\{V:\mathcal L^m_V(\pi_VK)\le a\}$ と置きます。$V\in A_a$ で密度が存在する場合は $1\le a\|f_V\|_2^2$。従って非負関数を $A_a$ 上で積分すると

$$
\frac1a\gamma(A_a)
\le\int_{A_a}\|f_V\|_2^2d\gamma(V)
\le\int_G\|f_V\|_2^2d\gamma(V)
\le Q.
$$

この $A_a$ が可測であることも確認できます。各 $V_0$ の近くで $V$ に連続に依存する正規直交基底を選び、$\pi_VK$ を固定した $\mathbb R^m$ のコンパクト集合へ座標表示します。$V_n\to V_0$ なら射影行列と基底は連続に変化し、$K$ は有界なので各 $x\in K$ の像の座標変化は $x$ に関して一様に0へ近づきます。従って新しい像は、十分大きい $n$ で元の像の任意の $\delta$-近傍に入ります。外側の近傍のLebesgue測度は $\delta\downarrow0$ で元のコンパクト像の測度へ減少するので、体積は上から半連続であり、特にBorel可測です。式を掛け直して $\gamma(A_a)\le aQ$。

体積零の方向集合は全 $a>0$ の $A_a$ に含まれます。例えば $a=1/n$ として $\gamma\{\text{体積0}\}\le Q/n\to0$ です。しかし、$\gamma$ の測度が零であることは、その集合のHausdorff次元を制限しません。零測度でも大きな次元を持つ方向集合はあり得ます。次章の定量的な例外方向次元評価には別のFrostman測度が必要です。
<!-- solution-end -->

## 8. この講義で得たこと

- $G(d,m)$ には回転不変な確率があり、$0<t<m$ の射影特異核平均は $C_{d,m,t}|x-y|^{-t}$ と正確に計算できます。
- コンパクト $K$ のほとんど全ての $m$ 次元射影は $\dim_H\pi_VK=\min\{\dim_HK,m\}$ を満たします。
- $\dim_HK>m$ なら、Fourierの切片と $L^2$ 密度によりほとんど全ての影の $m$ 次元体積は正です。
- 臨界次元 $m$ では次元結論と正測度結論は異なります。さらに例外方向が測度零であることと、その方向集合の次元が小さいことも異なります。後者がGMT8の問題です。
