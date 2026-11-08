# OTR18 測度曲線の速さを定義できるか

[OTR17の測度弱解](../OTR17/index.md#def-otr17-measure-weak)は、質量がどのように保存されるかを述べます。しかし同じ分布の時間発展を表す速度場は複数あり得ます。一方、[OTR15の定速測地線](../OTR15/index.md#def-otr15-constant-geodesic)は、分布間の距離だけで速さを測れそうです。この二つはどうつながるのでしょうか。

例えば $\mu_t=\delta_{t^2}$（$0\le t\le1$）なら、[Wasserstein 距離](../OTR8/index.md#def-otr8-wasserstein)は $W_2(\mu_s,\mu_t)=|t^2-s^2|$ です。粒子の速度は $2t$ であり、分布の距離から測っても同じ値になるはずです。この一致を、密度を持たない測度にも通用する形で証明します。

## 1. 距離で測る曲線の速さ

以下では $T>0$、$d\ge1$ とし、$\mathcal P_2(\mathbb R^d)$ を有限二次モーメントの確率測度の空間とします。[OTR8の距離](../OTR8/index.md#def-otr8-wasserstein) $W_2$ を用い、$t\mapsto\mu_t$ をこの空間の曲線とします。ここで $L^2(0,T)$ は二乗が時間積分可能な関数の空間です。

まず、時刻 $s$ と $t$ の距離が、ある可積分な「速さの上界」の時間積分で抑えられる、という条件を考えます。通常の微分可能な曲線より広く、折れ曲がりも許すためです。

<a id="def-otr18-ac2"></a>

<!-- formal-statement-start -->
> **定義（W2-絶対連続曲線）**  
> $T>0$ とし、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ とする。ある非負関数 $m\in L^2(0,T)$ が存在し、すべての $0\le s\le t\le T$ で

$$
W_2(\mu_s,\mu_t)\le\int_s^t m(r)\,dr
$$

> を満たすとき、$\mu$ を **$W_2$-絶対連続曲線（$AC^2$ 曲線）**という。$m$ は速さの上界であり、この段階では一意ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr18-ac2 -->
**定義の確認**。$\mu_t=\delta_{t^2}$ では $W_2(\mu_s,\mu_t)=t^2-s^2=\int_s^t2r\,dr$ なので $m(r)=2r$ を取れます。$\int_0^1m^2dr=4/3<\infty$ であり、二乗可積分性も満たします。対照的に $\mu_t=\delta_{\sqrt t}$ では候補の速さ $1/(2\sqrt t)$ が $L^1$ には属しても $L^2$ には属しません。この違いは後で厳密に確かめます。
<!-- definition-example-end -->

次に、短い時間で進む距離を時間幅で割ります。$t$ を固定したときの $h$ は、$t+h\in[0,T]$ を満たす両符号の実数です。極限が存在しない時刻があっても、ほとんどすべての時刻で定義できることを示します。

<a id="def-otr18-metric-derivative"></a>

<!-- formal-statement-start -->
> **定義（距離微分・metric derivative）**  
> $\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ とする。$t\in(0,T)$ で次の極限が存在する場合、その非負の値を曲線の **距離微分** $|\mu'|(t)$ とする。

$$
|\mu'|(t)=\lim_{h\to0}\frac{W_2(\mu_{t+h},\mu_t)}{|h|}.
$$

> 時間端点での片側極限は必要としない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr18-metric-derivative -->
**定義の確認**。$\mu_t=\delta_{t^2}$ では $W_2(\mu_{t+h},\mu_t)=|2th+h^2|$ です。$t\in(0,1)$ を固定すると

$$
\frac{|2th+h^2|}{|h|}=|2t+h|\longrightarrow2t.
$$

よって $|\mu'|(t)=2t$。定義に必要な極限の両側一致を直接確かめました。
<!-- definition-example-end -->

この極限がほとんど至る所で存在する理由を、距離空間で使える実変数の議論から導きます。ここで[Wasserstein空間の可分性](../OTR9/index.md#thm-otr9-separable)により $W_2$ 空間に可算稠密集合があることを使います。

<a id="thm-otr18-metric-speed"></a>

<!-- formal-statement-start -->
> **定理（AC2曲線の距離微分と最小上界）**  
> $T>0$ とし、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ が[絶対連続曲線](#def-otr18-ac2)であるとする。このとき[距離微分](#def-otr18-metric-derivative)はほとんどすべての $t\in(0,T)$ で存在して $|\mu'|\in L^2(0,T)$ であり、全時刻 $0\le s\le t\le T$ について

$$
W_2(\mu_s,\mu_t)\le\int_s^t|\mu'|(r)\,dr.
$$

> さらに上の絶対連続性の不等式を満たす任意の $m\in L^2(0,T)$ に対し、$|\mu'|(t)\le m(t)$ がほとんど至る所で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

距離そのものを微分する代わりに、稠密な参照測度 $\nu_k$ までの距離を実数値関数 $f_k(t)$ として微分します。すべての $f_k$ の微分の大きさの上限が、曲線の最小の速さになります。ここで $f_k'(t)=\frac{df_k}{dt}(t)$ は実数値関数の時刻についての通常の導関数で、$|\mu'|(t)$ は測度曲線を距離から測った極限であり、記号のプライムを同一の演算とみなしているわけではありません。

<!-- proof-start -->
### 証明

[可分性定理](../OTR9/index.md#thm-otr9-separable)により、$W_2$ に関する可算稠密集合 $\{\nu_k\}_{k\ge1}$ を取れます。$f_k(t)=W_2(\mu_t,\nu_k)$ と置きます。[三角不等式](../OTR8/index.md#thm-otr8-metric)から

$$
|f_k(t)-f_k(s)|\le W_2(\mu_t,\mu_s)\le\int_s^t m(r)\,dr.
$$

従って各 $f_k$ は実数値絶対連続関数で、ほとんど至る所で $|f_k'|\le m$ です。可算個の例外集合を除き

$$
g(t)=\sup_{k\ge1}|f_k'(t)|\le m(t)
$$

と置けます（例外集合では $g=0$ と定めます）。距離の逆三角不等式と $\nu_k\to\mu_s$ となる部分列から

$$
W_2(\mu_s,\mu_t)
=\sup_{k\ge1}|W_2(\mu_t,\nu_k)-W_2(\mu_s,\nu_k)|
=\sup_k|f_k(t)-f_k(s)|.
$$

各 $f_k$ の微積分公式に $|f_k'|\le g$ を代入すると、任意の $s\le t$ について

$$
W_2(\mu_s,\mu_t)\le\int_s^t g(r)\,dr.
$$

$g\in L^2(0,T)\subset L^1_{\mathrm{loc}}(0,T)$ なので、[Lebesgue 微分定理](../../MT/MT4/index.md#thm-mt4-lebesgue-differentiation-local)を時刻変数 $t$ に適用すると、ほとんどすべての $t$ は $g$ の Lebesgue 点です。そのような $t$ で両符号の $h$ について

$$
\frac{W_2(\mu_{t+h},\mu_t)}{|h|}
\le\frac1{|h|}\int_{\min(t,t+h)}^{\max(t,t+h)}g(r)\,dr
\longrightarrow g(t)
$$

が成り立ちます。一方、各 $f_k$ が微分可能な時刻では

$$
|f_k'(t)|
=\lim_{h\to0}\frac{|f_k(t+h)-f_k(t)|}{|h|}
\le\liminf_{h\to0}\frac{W_2(\mu_{t+h},\mu_t)}{|h|}.
$$

$k$ について上限を取ると $g(t)$ が右辺以下です。上からの評価と合わせて極限が存在し、$|\mu'|(t)=g(t)$ です。最後に $g\le m$ と上の時間積分評価を用いればすべての結論が従います。$\square$
<!-- proof-end -->

距離微分は「選んだ速度上界のうち最小のもの」であり、測度曲線自身が決める量です。絶対連続性から $W_2$-連続性も従うため、ここでは時刻ごとのジャンプを許しません。

## 2. 速度場の二乗積分は何を測るか

[OTR17の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)では $v(t,x)$ は時刻 $t$、位置 $x$ にある質量が持つ速度でした。以下では $v_t(x):=v(t,x)$ と略記します。また $dt\,d\mu_t(x)$ は、時刻を Lebesgue 測度 $dt$ で積分し、各時刻の位置を $\mu_t$ で積分することを表し、任意の非負可測関数 $F$ に対して

$$
\int F(t,x)\,dt\,d\mu_t(x)
:=\int_0^T\left(\int_{\mathbb R^d}F(t,x)\,d\mu_t(x)\right)dt
$$

と読みます。確率測度 $\mu_t$ について、速度の二乗をこの方法で位置・時間にわたって平均します。

<a id="def-otr18-kinetic-speed"></a>

<!-- formal-statement-start -->
> **定義（L2速度と運動作用）**  
> $T>0$ とし、$\mu_t\in\mathcal P_2(\mathbb R^d)$、$v:[0,T]\times\mathbb R^d\to\mathbb R^d$ を Borel 可測とする。$dt\,d\mu_t(x)$ について二乗可積分である場合、時刻 $t$ の **$L^2(\mu_t)$ 速度**を

$$
\|v_t\|_{L^2(\mu_t)}
=\left(\int_{\mathbb R^d}|v(t,x)|^2\,d\mu_t(x)\right)^{1/2}
$$

> とし、区間全体の **運動作用**を

$$
\mathcal A(\mu,v)
=\int_0^T\int_{\mathbb R^d}|v(t,x)|^2\,d\mu_t(x)\,dt
$$

> とする。$\mu_t$ が密度 $\rho_t$ を持つ場合は $d\mu_t=\rho_t(x)\,dx$ と読み替える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr18-kinetic-speed -->
**定義の確認**。$\mu_t=\delta_{t^2}$、$v(t,x)=2t$ と置くと、各 $t$ で $\int|v|^2d\mu_t=(2t)^2$ です。従って $\|v_t\|_{L^2(\mu_t)}=2t$、$\mathcal A=\int_0^1 4t^2dt=4/3$。Borel 性、有限作用、質量 $1$ の条件を満たし、前節で求めた $|\mu'|$ と一致します。
<!-- definition-example-end -->

ただし、位置ごとの速度を平均するには、微視的な粒子の軌道を測度曲線へつなぐ道具が必要です。以下の証明では、まず粒子の軌道を確率的に束ね、その結果を再び連続の方程式に戻します。

## 3. 一本の軌道ではなく、軌道の集まりを考える

$C([0,T];\mathbb R^d)$ は連続軌道 $\gamma:t\mapsto\gamma_t$ の空間です。各時刻に位置を取り出す写像を $e_t(\gamma)=\gamma_t$ と書きます。$\eta$ が軌道空間上の確率測度なら、$(e_t)_\#\eta$ はその時刻に見える位置分布です。ここで軌道の絶対連続性は $\mathbb R^d$ 値関数としての通常の意味であり、測度曲線の $AC^2$ 条件とは別です。$\dot\gamma_t=d\gamma_t/dt$ は位置 $\gamma_t$ の時間 $t$ に関する通常の導関数で、絶対連続軌道ではほとんどすべての時刻に存在します。

<a id="def-otr18-dynamic-plan"></a>

<!-- formal-statement-start -->
> **定義（動的計画・軌道表現）**  
> $T>0$、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ とする。軌道空間 $C([0,T];\mathbb R^d)$ 上の確率測度 $\eta$ が

$$
(e_t)_\#\eta=\mu_t\qquad(0\le t\le T)
$$

> を満たすとき、$\eta$ を $\mu$ の**動的計画**という。さらに $\eta$-ほとんどすべての軌道が絶対連続で

$$
\int\!\int_0^T|\dot\gamma_t|^2\,dt\,d\eta(\gamma)<\infty
$$

> なら、$\eta$ を**有限エネルギーの軌道表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr18-dynamic-plan -->
**定義の確認**。$\gamma_t=t^2$ という一本の軌道に質量 $1$ を置く $\eta=\delta_\gamma$ を考えます。評価写像の押し出しは $(e_t)_\#\eta=\delta_{t^2}=\mu_t$ です。$\dot\gamma_t=2t$ なのでエネルギーは $4/3$。軌道の連続性・絶対連続性・二乗可積分性・周辺条件をすべて検証しました。
<!-- definition-example-end -->

動的計画が有限エネルギーなら、各時刻の位置だけを見た測度曲線にも速さの上界があります。各軌道の二点 $\gamma_s,\gamma_t$ の同時分布は $\mu_s,\mu_t$ の[結合](../OTR2/index.md#def-otr2-coupling)だからです。

<a id="lem-otr18-path-estimate"></a>

<!-- formal-statement-start -->
> **補題（軌道作用による距離評価）**  
> $T>0$ とし、$\mu_t\in\mathcal P_2(\mathbb R^d)$ が有限エネルギーの[軌道表現](#def-otr18-dynamic-plan) $\eta$ を持つとする。$h(t)^2=\int|\dot\gamma_t|^2d\eta(\gamma)$ と置くと、$h\in L^2(0,T)$ であり、任意の $s\le t$ について

$$
W_2(\mu_s,\mu_t)\le\int_s^t h(r)\,dr.
$$
<!-- formal-statement-end -->

### 証明の見取り図

軌道ごとに $\gamma_t-\gamma_s=\int_s^t\dot\gamma_rdr$ とし、まず二点の結合で $W_2$ を上から抑えます。その後 $L^2(\eta)$ における積分の三角不等式を使います。

<!-- proof-start -->
### 証明

$\pi_{s,t}=(e_s,e_t)_\#\eta$ は周辺が $\mu_s,\mu_t$ の結合です。[Wasserstein 距離](../OTR8/index.md#def-otr8-wasserstein)の評価を使います。各軌道の変位を速度の時間積分に置き換えて

$$
\begin{aligned}
W_2(\mu_s,\mu_t)
&\le\left(\int|y-x|^2\,d\pi_{s,t}(x,y)\right)^{1/2}\\
&=\left(\int\left|\int_s^t\dot\gamma_r\,dr\right|^2d\eta(\gamma)\right)^{1/2}\\
&\le\int_s^t\left(\int|\dot\gamma_r|^2d\eta(\gamma)\right)^{1/2}dr.
\end{aligned}
$$

最後は [Minkowskiの不等式](../OTR8/index.md#lem-otr8-minkowski)を有限個の時間和に適用し、刻み幅を細かくして得られる積分版の評価です。積分するベクトル値関数 $r\mapsto\dot\gamma_r$ は $L^2(\eta)$ に属し、有限エネルギーと Cauchy--Schwarz により時間についても積分可能です。[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)から $\int_0^T h(r)^2dr$ は軌道の総エネルギーに等しく有限です。$\square$
<!-- proof-end -->

## 4. 連続の方程式から粒子の軌道を回復する

弱い保存則の解が滑らかな粒子流として与えられていなくても、有限作用があれば軌道の確率的な集まりを作れます。これが有限二乗作用の軌道分解（superposition principle）の主張です。証明に必要な近似を先に示します。

ここで $q_\varepsilon(x)=(2\pi\varepsilon^2)^{-d/2}\exp(-|x|^2/(2\varepsilon^2))$ は標準的な滑らかな確率密度で、$*$ は空間変数に関する畳み込みを表します。時刻は畳み込みません。以下の $\partial_t$ は空間変数 $x$ を固定した時間方向の（必要に応じて弱い意味の）偏微分、$\nabla\cdot$ は空間方向の発散です。軌道に沿う全微分 $d\gamma_t/dt$ とは作用対象を区別します。

<a id="lem-otr18-smoothing"></a>

<!-- formal-statement-start -->
> **補題（質量と流束の同時平滑化）**  
> $T>0$ とし、$t\mapsto\mu_t\in\mathcal P_2(\mathbb R^d)$ は狭義連続な確率測度曲線、$v$ は Borel 速度場とする。[OTR17の弱い連続の方程式](../OTR17/index.md#def-otr17-measure-weak)が成り立ち、

$$
E=\int_0^T\int|v(t,x)|^2\,d\mu_t(x)\,dt<\infty
$$

> と仮定する。$\rho_t^\varepsilon=q_\varepsilon*\mu_t$、$j_t^\varepsilon=q_\varepsilon*(v_t\mu_t)$、$b_t^\varepsilon=j_t^\varepsilon/\rho_t^\varepsilon$ と置く。すると $\rho_t^\varepsilon>0$、$\partial_t\rho^\varepsilon+\nabla\cdot(\rho^\varepsilon b^\varepsilon)=0$ が弱い意味で成り立ち、

$$
\int_0^T\int|b_t^\varepsilon(x)|^2\rho_t^\varepsilon(x)\,dxdt\le E.
$$

> さらに $\mu_t^\varepsilon=\rho_t^\varepsilon dx$ はすべての $t$ で $W_2(\mu_t^\varepsilon,\mu_t)\le\sqrt d\,\varepsilon$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

流束 $v_t\mu_t$ と質量 $\mu_t$ の両方を同じ核でならします。速度場だけを畳み込むと保存則が壊れるので、両者の比を新しい速度場にします。

<!-- proof-start -->
### 証明

$\rho_t^\varepsilon(x)=\int q_\varepsilon(x-y)d\mu_t(y)>0$ です。また

$$
b_t^\varepsilon(x)=
\frac{\int v(t,y)q_\varepsilon(x-y)d\mu_t(y)}
{\int q_\varepsilon(x-y)d\mu_t(y)}
$$

は位置 $x$ 付近にいた速度の重み付き平均です。Cauchy--Schwarz（または Jensen）の不等式から

$$
|b_t^\varepsilon(x)|^2\rho_t^\varepsilon(x)
\le\int|v(t,y)|^2q_\varepsilon(x-y)\,d\mu_t(y).
$$

$x$ と $t$ で積分し、$\int q_\varepsilon(x-y)dx=1$ を使うと作用評価を得ます。元の弱式へ試験関数の空間畳み込みを代入すると、導関数と畳み込みが交換し、$\partial_t\rho^\varepsilon+\nabla\cdot j^\varepsilon=0$ を得ます。非コンパクトな Gaussian 核への代入は空間 cutoff を掛けて行い、$\int|v|d\mu dt\le\sqrt{TE}$ を使って cutoff を除けます。

最後に $X\sim\mu_t$ と独立な $Z\sim N(0,\varepsilon^2I_d)$ を組にします。ここで $I_d$ は $d$ 次単位行列なので、$Z$ の各座標の分散は $\varepsilon^2$、従って $\mathbb E|Z|^2=\sum_{j=1}^d\mathbb E Z_j^2=d\varepsilon^2$ です。すると$(X,X+Z)$ は $\mu_t$ と $\mu_t^\varepsilon$ の結合です。従って

$$
W_2(\mu_t,\mu_t^\varepsilon)^2\le\mathbb E|Z|^2=d\varepsilon^2.
$$

$\square$
<!-- proof-end -->

平滑化した測度は滑らかな速度場で動くので、その粒子軌道を追えます。ただし $b^\varepsilon$ は空間全体で有界とは限りません。次の証明では局所的な常微分方程式の流れを大きな球で停止し、有限作用から無限遠への逸走確率を抑えます。

<a id="thm-otr18-superposition"></a>

<!-- formal-statement-start -->
> **定理（有限二乗作用の重ね合わせ原理）**  
> $T>0$ とし、$t\mapsto\mu_t\in\mathcal P_2(\mathbb R^d)$ は狭義連続で、$\sup_{t\in[0,T]}\int|x|^2d\mu_t(x)<\infty$ とする。Borel 速度場 $v$ が[OTR17の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)を満たし、

$$
\int_0^T\int|v_t(x)|^2d\mu_t(x)\,dt<\infty
$$

> であるとする。このとき有限エネルギーの[動的計画](#def-otr18-dynamic-plan) $\eta$ が存在し、$\eta$-ほとんどすべての軌道で

$$
\dot\gamma_t=v(t,\gamma_t)\quad\text{ほとんどすべての }t,
$$

> および次の作用等式が成立する。

$$
\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta
=\int_0^T\int|v_t|^2d\mu_tdt.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず[質量と流束の同時平滑化](#lem-otr18-smoothing)を使います。滑らかな場の軌道分布を作り、軌道エネルギーが一様に有限であることから曲線空間で部分列を取ります。極限の軌道が元の Borel 速度場に従うことは、連続関数で速度場を近似して確かめます。

<!-- proof-start -->
### 証明

**第1段階：近似した軌道。** [平滑化補題](#lem-otr18-smoothing)で $(\mu_t^\varepsilon,b_t^\varepsilon)$ を作ります。$b^\varepsilon$ は $t$ について可測です。空間方向の局所 Lipschitz 性と時間可積分な定数も確認します。狭義連続な測度曲線はコンパクトな時間区間上で一様に緊密なので、ある $R>0$ を選べば $\mu_t(B_R)\ge1/2$ が全時刻で成立します。固定した $\varepsilon>0$ と空間球 $B_K$ について、Gaussian 核の正値性から

$$
\rho_t^\varepsilon(x)\ge\frac12\min_{|z|\le K+R}q_\varepsilon(z)>0
\qquad(x\in B_K)
$$

です。$q_\varepsilon$ とその空間導関数は有界なので、分子 $j^\varepsilon$ とその空間導関数は $C_\varepsilon\int|v_t|d\mu_t$ で抑えられます。商の微分公式に上の分母下界を入れると、$b_t^\varepsilon$ の $B_K$ 上の Lipschitz 定数も $C_{\varepsilon,K}\int|v_t|d\mu_t$ 以下です。この時間積分は Cauchy--Schwarz により $\sqrt{TE}$ 以下となります。従って局所的な Carathéodory の常微分方程式 $\dot\gamma=b_t^\varepsilon(\gamma)$ を解けます。

球 $B_R$ で軌道を停止し、滑らかな場の局所輸送方程式の一意性（流れに沿う連鎖律を逆向きの試験関数に適用する）で、退出前の軌道分布が $\mu_t^\varepsilon$ に支配されることを確かめます。初期点が $B_{R/2}$ にある軌道が $B_R$ を退出するには走行距離が $R/2$ 以上必要なので、停止までの速度積分に [Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると、退出確率は

$$
\mathbb P(\text{退出 }B_R)
\le\mu_0^\varepsilon(B_{R/2}^c)
+\frac2R\int_0^T\int|b_t^\varepsilon|\,d\mu_t^\varepsilon dt.
$$

右辺の第二項は Cauchy--Schwarz と[平滑化補題](#lem-otr18-smoothing)により $2\sqrt{TE}/R$ 以下です。$R\to\infty$ とすれば退出確率は $0$ となり、ほとんどすべての初期点で全区間の流れが存在します。質量 $1$ と局所一意性から、その時刻 $t$ の押し出しは $\mu_t^\varepsilon$ です。よって軌道分布 $\eta^\varepsilon$ は

$$
(e_t)_\#\eta^\varepsilon=\mu_t^\varepsilon,
\qquad
\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta^\varepsilon\le E
$$

を満たします。

**第2段階：曲線空間での極限。** 任意の絶対連続軌道について

$$
|\gamma_t-\gamma_s|
\le\left(\int_s^t|\dot\gamma_r|^2dr\right)^{1/2}|t-s|^{1/2}.
$$

初期点の分布 $\mu_0^\varepsilon$ は二次モーメントが一様に有界です。従って初期点の大きさと軌道エネルギーをそれぞれ大きな値で打ち切った集合は、[Arzela-Ascoli定理](../../../基礎科目/RA/RA8/index.md#thm-ra8-arzela-ascoli)により $C([0,T];\mathbb R^d)$ で相対コンパクトです。[Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)とエネルギー評価から $\{\eta^\varepsilon\}$ は緊密です。曲線空間は一様距離で Polish です（完備性は [RA8の一様ノルム完備性](../../../基礎科目/RA/RA8/index.md#thm-ra8-ck-complete)、可分性は有理時刻・有理値の折れ線近似による）。したがって [Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)により部分列は狭義に $\eta$ へ収束します。

任意の絶対連続軌道のエネルギー $A(\gamma)=\int_0^T|\dot\gamma_t|^2dt$ は、時刻分割 $0=t_0<\cdots<t_N=T$ について次の等式を満たします。

$$
A(\gamma)=\sup_{\{t_i\}}\sum_{i=0}^{N-1}\frac{|\gamma_{t_{i+1}}-\gamma_{t_i}|^2}{t_{i+1}-t_i}.
$$

左辺が各和以上であることは区間ごとの Cauchy--Schwarz から従います。逆向きは、区間で平均した $\dot\gamma$ の階段関数が分割を細かくすると $\dot\gamma$ に $L^2$ で収束することから従います。

任意の連続軌道について右辺の上限を $S(\gamma)\in[0,\infty]$ と置きます。$S(\gamma)<\infty$ なら、交わらない有限個の区間 $[a_j,b_j]$ の全端点を含む分割を取れます。分割量は非負なので Cauchy--Schwarz により

$$
\sum_j|\gamma_{b_j}-\gamma_{a_j}|
\le\left(\sum_j\frac{|\gamma_{b_j}-\gamma_{a_j}|^2}{b_j-a_j}\right)^{1/2}
\left(\sum_j(b_j-a_j)\right)^{1/2}
\le\sqrt{S(\gamma)}\left(\sum_j(b_j-a_j)\right)^{1/2}.
$$

全区間長が十分小さければ左辺も任意に小さくなるので、$\gamma$ は絶対連続です。さらに $0<h<T$ について、開始位置 $\theta\in[0,h)$ を固定し、$[\theta+kh,\theta+(k+1)h]$ を並べた分割のエネルギー和は $S(\gamma)$ 以下です。$\theta$ で積分して並べ替えると

$$
\int_0^{T-h}\left|\frac{\gamma_{t+h}-\gamma_t}{h}\right|^2dt\le S(\gamma).
$$

絶対連続性から $\dot\gamma_t$ はほとんど至る所で存在し、$h\downarrow0$ で差商がそれへ収束します。Fatou の不等式により $\int_0^T|\dot\gamma_t|^2dt\le S(\gamma)$ です。既に示した逆向きの評価と合わせて等号となります。従って、分割量の上限は有限なら通常の軌道エネルギーに一致し、それ以外の連続軌道では $+\infty$ です。各有限和は軌道の一様収束に関して連続ですから、その上限であるエネルギーは下半連続です。[下半連続費用のliminf不等式](../OTR3/index.md#lem-otr3-lsc-integral)を軌道空間で適用し、極限の $\eta$ も有限エネルギーを持つことが分かります。

評価写像 $e_t$ は連続で、$W_2(\mu_t^\varepsilon,\mu_t)\le\sqrt d\varepsilon$ だから、任意の $t$ で $(e_t)_\#\eta=\mu_t$ です。

**第3段階：極限の速度場を同定。** $dt\,d\mu_t$ は有限測度なので、$v$ をその $L^1$ ノルムで近似する有界な連続関数 $w(t,x)$ を取れます。Jensen と畳み込みの定義から

$$
\begin{aligned}
&\int_0^T\int|b_t^\varepsilon(x)-w(t,x)|\,d\mu_t^\varepsilon(x)dt\\
&\le\int_0^T\int|v(t,y)-w(t,y)|\,d\mu_t(y)dt\\
&\quad+\int_0^T\iint q_\varepsilon(x-y)|w(t,y)-w(t,x)|\,dx\,d\mu_t(y)dt.
\end{aligned}
$$

$w$ をコンパクト支持の連続関数で選べば、最後の項は一様連続性と Gaussian 核の集中から $0$ へ収束します。一方、任意の $s,t$ について近似軌道は

$$
\gamma_t-\gamma_s=\int_s^t b_r^\varepsilon(\gamma_r)dr
$$

を満たします。右辺の $b^\varepsilon$ を $w$ に置き換えた誤差の $\eta^\varepsilon$-平均は上の評価で抑えられ、$\gamma\mapsto\int_s^t w(r,\gamma_r)dr$ は連続です。$\varepsilon\downarrow0$ の後に $w\to v$ を $L^1(dt\,d\mu_t)$ で取ると、極限の $\eta$ について $\gamma_t-\gamma_s=\int_s^t v(r,\gamma_r)dr$ が有理数 $s,t$ の組で確率 $1$ で成り立ちます。$\int|v(r,\gamma_r)|dr<\infty$ が $\eta$-ほとんど至る所で成り立つので、連続性から全 $s,t$ へ延長でき、$\dot\gamma=v(t,\gamma)$ がほとんど至る所で従います。

最後に周辺条件を使い、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)で

$$
\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta
=\int_0^T\int|v(t,x)|^2d\mu_t(x)dt
$$

を得ます。$\square$
<!-- proof-end -->

この定理では、滑らかな流れの一意性を元の粗い $v$ には要求していません。異なる軌道が同じ位置へ集まる可能性を、確率測度 $\eta$ の中で保持します。

## 5. 保存則の速度は距離微分を上から抑える

<a id="thm-otr18-velocity-bound"></a>

<!-- formal-statement-start -->
> **定理（速度場による距離微分の評価）**  
> $T>0$、$t\mapsto\mu_t\in\mathcal P_2(\mathbb R^d)$ は狭義連続で二次モーメントが時刻について一様に有界とする。Borel 速度場 $v$ は[OTR17の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)を満たし、$\mathcal A(\mu,v)<\infty$ とする。このとき $\mu$ は[絶対連続曲線](#def-otr18-ac2)であり、ほとんどすべての $t$ で

$$
|\mu'|(t)\le\|v_t\|_{L^2(\mu_t)}.
$$

> 特に $\int_0^T|\mu'|^2dt\le\mathcal A(\mu,v)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[有限二乗作用の重ね合わせ原理](#thm-otr18-superposition)によって $(e_s,e_t)_\#\eta$ を実際の結合として作り、[軌道作用の補題](#lem-otr18-path-estimate)を適用します。

<!-- proof-start -->
### 証明

仮定は[有限二乗作用の重ね合わせ原理](#thm-otr18-superposition)のすべての条件を満たします。得られた $\eta$ について $\dot\gamma_t=v(t,\gamma_t)$ なので、[軌道作用の補題](#lem-otr18-path-estimate)の関数 $h$ は

$$
h(t)^2=\int|\dot\gamma_t|^2d\eta
=\int|v(t,x)|^2d\mu_t(x).
$$

従って $W_2(\mu_s,\mu_t)\le\int_s^t h(r)dr$ です。$h\in L^2$ なので $\mu$ は $AC^2$ 曲線です。[AC2曲線の距離微分と最小上界](#thm-otr18-metric-speed)により $|\mu'|\le h$ がほとんど至る所で成り立ちます。両辺を二乗積分すれば最後の不等式です。$\square$
<!-- proof-end -->

重要なのは **不等式の向き**です。速度場が分布の変化に必要な以上の運動を含んでいれば、$L^2$ 速度の方が大きくなります。例えば単位円周上の一様確率測度を、各点が時計回りと反時計回りに同じ割合で回る軌道の集まりとして表せます。どの時刻でも位置分布は一様で距離微分は $0$ ですが、軌道の速さは $1$ です。軌道の平均速度が位置ごとに相殺される場合もあるので、軌道の運動と測度の変化を同一視してはいけません。

## 6. 距離から測った速さを、逆に速度場で実現する

これまでの向きとは逆に、$AC^2$ 曲線から連続の方程式の速度場を作ります。任意の細かい時間分割で隣り合う測度を最適に結合し、その間を[OTR15の変位補間](../OTR15/index.md#def-otr15-displacement-interpolation)で結べば、各小区間で実際の粒子の直線運動ができます。

<a id="lem-otr18-polygonal"></a>

<!-- formal-statement-start -->
> **補題（最適結合による折れ線近似）**  
> $T>0$、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ を[絶対連続曲線](#def-otr18-ac2)とし、$m\in L^2(0,T)$ をその速さの上界とする。等間隔分割 $t_i=iT/n$ の各隣接時刻について $W_2$-最適結合を選び、粒子を小区間内で直線補間して連結すると、有限エネルギーの軌道分布 $\eta^n$ と周辺曲線 $\mu_t^n=(e_t)_\#\eta^n$ が作れ、

$$
\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta^n
=\sum_{i=0}^{n-1}\frac{W_2(\mu_{t_i},\mu_{t_{i+1}})^2}{t_{i+1}-t_i}
\le\int_0^T m(r)^2dr.
$$

> さらに $\sup_{t\in[0,T]}W_2(\mu_t^n,\mu_t)\to0$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最適結合を中間時刻の共通周辺で貼り合わせ、全時刻の折れ線軌道の法則を作ります。エネルギーには Cauchy--Schwarz を、元の測度への近さは[Wasserstein距離の距離公理](../OTR8/index.md#thm-otr8-metric)の距離の性質で評価します。

<!-- proof-start -->
### 証明

各 $i$ で[OTR3の最適結合の存在](../OTR3/index.md#thm-otr3-polish)から $\pi_i\in\Pi(\mu_{t_i},\mu_{t_{i+1}})$ を選びます。隣り合う $\pi_i$ は共通周辺 $\mu_{t_i}$ を持つので、[OTR8の貼り合わせ補題](../OTR8/index.md#lem-otr8-gluing)を反復して $x_0,\ldots,x_n$ の同時分布を作れます。各 $[t_i,t_{i+1}]$ で

$$
\gamma_t=x_i+\frac{t-t_i}{t_{i+1}-t_i}(x_{i+1}-x_i)
$$

と置きます。端点で一致するので軌道は連続です。速度はこの区間で $(x_{i+1}-x_i)/(t_{i+1}-t_i)$ ですから、積分すると補題の左側の等式になります。[絶対連続性の上界](#def-otr18-ac2)を使って

$$
\frac{W_2(\mu_{t_i},\mu_{t_{i+1}})^2}{t_{i+1}-t_i}
\le\frac{(\int_{t_i}^{t_{i+1}}m(r)dr)^2}{t_{i+1}-t_i}
\le\int_{t_i}^{t_{i+1}}m(r)^2dr.
$$

これを足せばエネルギー上界です。$t\in[t_i,t_{i+1}]$ では[変位補間の定速測地線](../OTR15/index.md#thm-otr15-displacement-geodesic)の距離評価が成立します。この評価に[Wasserstein距離の距離公理](../OTR8/index.md#thm-otr8-metric)を合わせると

$$
\begin{aligned}
W_2(\mu_t^n,\mu_t)
&\le W_2(\mu_t^n,\mu_{t_i})+W_2(\mu_{t_i},\mu_t)\\
&\le 2\int_{t_i}^{t_{i+1}}m(r)dr.
\end{aligned}
$$

$m\in L^1(0,T)$ の積分は区間長に関して一様絶対連続なので、右辺は $n\to\infty$ で $t$ に一様に $0$ へ収束します。$\square$
<!-- proof-end -->

次は、折れ線の速度を時刻・位置だけに依存する場へまとめる最後の段階です。同じ点を違う速度で通る複数の軌道があれば、その位置に条件付けた平均速度を選びます。この平均操作で二乗作用は増えません。

<a id="thm-otr18-converse"></a>

<!-- formal-statement-start -->
> **定理（AC2曲線の速度場と最小作用）**  
> $T>0$ とし、$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ を[絶対連続曲線](#def-otr18-ac2)とする。このとき Borel 速度場 $v$ が存在し、$(\mu,v)$ は[OTR17の測度弱形式](../OTR17/index.md#def-otr17-measure-weak)を満たし、

$$
\int_0^T\int|v_t|^2d\mu_tdt
\le\int_0^T|\mu'|(t)^2dt.
$$

> とくにこの速度場では $\|v_t\|_{L^2(\mu_t)}=|\mu'|(t)$ がほとんど至る所で成り立つ。すなわち、連続の方程式を満たす有限作用の速度場全体にわたる最小作用は $\int_0^T|\mu'|^2dt$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[最適結合による折れ線近似の補題](#lem-otr18-polygonal)へ最小上界 $m=|\mu'|$ を入れます。軌道分布を極限へ移し、軌道速度の条件付き平均を $v$ とします。[速度場による評価](#thm-otr18-velocity-bound)と挟み撃ちして等号を得ます。

<!-- proof-start -->
### 証明

[距離微分の定理](#thm-otr18-metric-speed)により $m=|\mu'|\in L^2$ は絶対連続性の上界です。[最適結合による折れ線近似の補題](#lem-otr18-polygonal)から $\eta^n$ を作り、各 $n$ で

$$
\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta^n
\le\int_0^T|\mu'|(t)^2dt=:E_0.
$$

初期周辺は常に $\mu_0$、軌道エネルギーは一様に $E_0$ 以下です。[軌道表現の構成](#thm-otr18-superposition)の第2段階と同じ [Arzela-Ascoli定理](../../../基礎科目/RA/RA8/index.md#thm-ra8-arzela-ascoli)・[Prokhorovの定理](../OTR3/index.md#thm-otr3-prokhorov)・エネルギーの下半連続性をこの $\eta^n$ に適用すると、部分列は有限エネルギーの $\eta$ に狭義収束し、そのエネルギーは $E_0$ 以下です。[最適結合による折れ線近似の補題](#lem-otr18-polygonal)の一様な周辺収束から $(e_t)_\#\eta=\mu_t$ です。

時間と位置の上にベクトル値測度 $J$ を次の作用で定めます。$\Phi$ は有界な Borel ベクトル値試験関数です。

$$
\int\Phi(t,x)\cdot dJ(t,x)
=\int\!\int_0^T\Phi(t,\gamma_t)\cdot\dot\gamma_t\,dt\,d\eta(\gamma).
$$

$\lambda(dt,dx)=dt\,d\mu_t(x)$ と置きます。この測度は軌道上の $(t,\gamma_t)$ の時間・軌道積分を位置に押し出したものです。実際、任意の Borel 集合 $A\subset[0,T]\times\mathbb R^d$ に対し

$$
\lambda(A)=\int\!\int_0^T\boldsymbol{1}_A(t,\gamma_t)\,dt\,d\eta(\gamma).
$$

したがって $\lambda(A)=0$ なら $J(A)=0$ であり、$J\ll\lambda$ です。また $|J|$ の総変動は Cauchy--Schwarz と有限軌道エネルギーから有限です。ベクトル値測度 $J$ の各成分に[符号付き測度の Radon--Nikodym 定理](../../MT/MT3/index.md#thm-mt3-rn-signed)を適用すると、$dJ=v\,d\lambda$ となる（Borel 版を取れる）場が存在します。これは、時刻・位置 $(t,x)$ が指定された下での軌道速度 $\dot\gamma_t$ の条件付き平均です。二乗ノルムの凸性（条件付き Jensen 不等式）により

$$
\int_0^T\int|v(t,x)|^2d\mu_t(x)dt
\le\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta\le E_0.
$$

任意の[OTR17の試験関数](../OTR17/index.md#def-otr17-test-function) $\varphi$ について[曲線に沿う連鎖律](../../PDE/PDE1/index.md#prop-pde1-curve-composition)を使います。空間変数を軌道 $x=\gamma_t$ に置き換えてから時刻で全微分すると

$$
\varphi(T,\gamma_T)-\varphi(0,\gamma_0)
=\int_0^T(\partial_t\varphi(t,\gamma_t)+\nabla\varphi(t,\gamma_t)\cdot\dot\gamma_t)dt.
$$

両辺を $\eta$ で積分します。時間端点と $\partial_t\varphi$ の積分は周辺条件で $\mu_t$ の積分に変わり、最後の項は $J=v\lambda$ の定義で $\int\nabla\varphi\cdot v\,d\mu_tdt$ となります。従って測度弱形式が成立します。

さらに $\mu$ は $W_2$-連続なので狭義連続であり、$\sup_t\int|x|^2d\mu_t<\infty$ が従います（$W_2(\mu_t,\delta_0)$ の連続性と $W_2^2(\mu_t,\delta_0)=\int|x|^2d\mu_t$ を使います）。よって[速度場による距離微分評価](#thm-otr18-velocity-bound)を適用でき、$|\mu'|(t)\le\|v_t\|_{L^2(\mu_t)}$ がほとんど至る所で成り立ちます。二乗積分の上界が $E_0=\int|\mu'|^2$ なので差の非負性から等号がほとんど至る所で成り立ちます。$\square$
<!-- proof-end -->

この定理は **最小作用を持つ速度場が存在する**ことを示します。速度場の一意性や、勾配場としての特徴付けはまだ主張しません。それらは後の OTR20 で調べます。OTR19 では、ここで得た等号を用いて、端点間の静的輸送費用と全時間の流体作用を比較します。

## 7. 例と失敗例で不等式を読む

### 速さが一定でない平行移動

平均 $0$、分散 $1/3$ の一様分布 $\mu_0=\tfrac12\boldsymbol1_{[-1,1]}dx$ を $X_t(a)=e^ta$ で押し出します。$\mu_t=(X_t)_\#\mu_0$ です。一次元の[単調結合・分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)を $X_s(a),X_t(a)$ に適用すると

$$
W_2(\mu_s,\mu_t)^2
=\int_{-1}^1|e^sa-e^ta|^2\frac{da}{2}
=\frac{(e^t-e^s)^2}{3}.
$$

従って $|\mu'|(t)=e^t/\sqrt3$ です。速度場は $v(t,x)=x$ で、[OTR17の流れによる弱解](../OTR17/index.md#thm-otr17-flow)が使えます。直接計算でも

$$
\|v_t\|_{L^2(\mu_t)}^2
=\int_{-1}^1|e^ta|^2\frac{da}{2}=\frac{e^{2t}}3
=|\mu'|(t)^2.
$$

時間変化は非定速でも、最小速度場は距離微分と一致します。

### 狭義連続だけでは速さを持てない

$\mu_t=(1-t)\delta_0+t\delta_1$（$0\le t\le1$）は狭義連続で二次モーメントも有界ですが、二点間で移動する質量 $|t-s|$ の距離が $1$ なので

$$
W_2(\mu_s,\mu_t)^2=|t-s|.
$$

長さを等間隔 $n$ 分割で評価すると $n\cdot n^{-1/2}=\sqrt n\to\infty$。従ってこの曲線は $AC^2$ どころか[有限長の曲線](../OTR15/index.md#def-otr15-metric-length)にもなりません。混合係数を滑らかに変えることと、有限速度で質量を実際に運ぶことは違います。

## 8. 演習：距離・運動・保存則を再構成する

### OTR18-A01 動く一原子
- Level: A

$t\in[0,1]$、$\mu_t=\delta_{t^2}$ とする。$AC^2$ 条件を直接確認し、距離微分とその二乗積分を求めよ。

<!-- solution-start -->
**詳細解答**。$s\le t$ では $W_2(\mu_s,\mu_t)=|t^2-s^2|=\int_s^t2rdr$ なので $m(r)=2r$ が速度上界です。$\int_0^1m^2dr=4/3$ より $m\in L^2$。$t\in(0,1)$ で

$$
\frac{W_2(\mu_{t+h},\mu_t)}{|h|}=|2t+h|\to2t,
$$

したがって $|\mu'|(t)=2t$、$\int_0^1|\mu'|^2dt=\int_0^14t^2dt=4/3$ です。
<!-- solution-end -->

### OTR18-A02 再パラメータ化と作用
- Level: A

$t\in[0,1]$、$\mu_t=\delta_{3t^2}$ とする。$W_2(\mu_0,\mu_1)^2$、$|\mu'|(t)$、$\int_0^1|\mu'|^2dt$ を比較せよ。

<!-- solution-start -->
**詳細解答**。端点は $\delta_0,\delta_3$ なので $W_2^2=|3-0|^2=9$。短時間の距離は $|3(t+h)^2-3t^2|=|6th+3h^2|$ であり、$|\mu'|(t)=6t$。積分すると

$$
\int_0^1|\mu'|^2dt=\int_0^136t^2dt=12>9.
$$

端点間を $\delta_{3t}$ と定速で動かす場合は速度 $3$、作用 $9$ です。非定速な時間の使い方が余分な作用を生みます。
<!-- solution-end -->

### OTR18-A03 任意の分布の平行移動
- Level: A

$\mu_0\in\mathcal P_2(\mathbb R^d)$、$a\in\mathbb R^d$、$\mu_t=(x\mapsto x+ta)_\#\mu_0$（$0\le t\le1$）とする。$W_2(\mu_s,\mu_t)=|t-s||a|$ を示し、$v(t,x)=a$ の速度ノルムと照合せよ。

<!-- solution-start -->
**詳細解答**。同じ初期点 $X\sim\mu_0$ に対して $X+sa,X+ta$ を組にすれば結合ができ、その費用は $(t-s)^2|a|^2$ なので $W_2^2\le(t-s)^2|a|^2$。逆に任意の結合 $(Y,Z)$ について Jensen から

$$
\mathbb E|Z-Y|^2\ge|\mathbb E(Z-Y)|^2=|(t-s)a|^2,
$$

なぜなら有限二次モーメントにより平均が存在し、平均の差は $(t-s)a$ だからです。二つの評価を合わせて距離公式を得ます。従って $|\mu'|=|a|$。一方、$\|v_t\|_{L^2(\mu_t)}^2=\int|a|^2d\mu_t=|a|^2$ で一致します。
<!-- solution-end -->

### OTR18-A04 二つの原子が離れる
- Level: A

$t\in[0,1]$、$\mu_t=\tfrac12\delta_{-t}+\tfrac12\delta_t$ とする。$W_2(\mu_s,\mu_t)$ と距離微分を求め、$t>0$ で $v(t,-t)=-1$、$v(t,t)=1$ が最小速度を実現することを確かめよ。

<!-- solution-start -->
**詳細解答**。両測度の質量 $1/2$ ずつを左同士・右同士に結ぶ対応は一次元の[単調結合](../OTR11/index.md#thm-otr11-quantile-formula)で最適です。$s,t\ge0$ だから各移動距離は $|t-s|$ で

$$
W_2^2=\tfrac12(t-s)^2+\tfrac12(t-s)^2=(t-s)^2.
$$

従って $|\mu'|=1$（内部の全時刻）。$t>0$ の速度場では $\|v_t\|^2=\tfrac12(-1)^2+\tfrac12(1)^2=1$。$t=0$ では原子が一致して場の値を一意に指定できませんが、単一時刻は時間積分に寄与せず、弱形式にも影響しません。
<!-- solution-end -->

### OTR18-A05 有限長と $AC^2$ の違い
- Level: A

$t\in[0,1]$、$\mu_t=\delta_{\sqrt t}$ とする。曲線は時間に関して有限長か。$AC^2$ 曲線にはなれないことを説明せよ。

<!-- solution-start -->
**詳細解答**。$s\le t$ で $W_2(\mu_s,\mu_t)=\sqrt t-\sqrt s=\int_s^t(2\sqrt r)^{-1}dr$ です。速度関数 $(2\sqrt r)^{-1}$ は $L^1(0,1)$ に属し、単調な Dirac 軌道なので長さは $1$ です。しかし $t>0$ の距離微分は $|\mu'|(t)=1/(2\sqrt t)$ で

$$
\int_0^1|\mu'|(t)^2dt=\frac14\int_0^1\frac{dt}{t}=\infty.
$$

もし $AC^2$ の上界 $m\in L^2$ が存在したら[距離微分の最小性](#thm-otr18-metric-speed)から $|\mu'|\le m$ となり矛盾します。
<!-- solution-end -->

### OTR18-B01 混合の質量移転は有限長か
- Level: B

$\mu_t=(1-t)\delta_0+t\delta_1$（$0\le t\le1$）について、狭義連続性と二次モーメントの有界性を確かめ、長さが無限大になることを示せ。

<!-- solution-start -->
**詳細解答**。任意の有界連続 $f$ について $\int f\,d\mu_t=(1-t)f(0)+tf(1)$ は連続です。また $\int x^2d\mu_t=t\le1$。$s<t$ では $t-s$ の質量を位置 $0$ から $1$ に運ぶ必要があり、残余は動かさない結合を取れるので $W_2^2(\mu_s,\mu_t)=t-s$ です。分割 $t_i=i/n$ に沿う距離の和は

$$
\sum_{i=0}^{n-1}W_2(\mu_{t_i},\mu_{t_{i+1}})
=n\sqrt{1/n}=\sqrt n\to\infty.
$$

[距離空間における曲線の長さの定義](../OTR15/index.md#def-otr15-metric-length)はすべての分割についての上限なので無限大です。速度を $L^1$ で抑える絶対連続曲線なら長さは有限であるため、この曲線は $AC^2$ ではありません。
<!-- solution-end -->

### OTR18-B02 拡大流で二種類の速さを計算する
- Level: B

$\mu_0=\tfrac12\boldsymbol1_{[-1,1]}dx$、$\mu_t=(a\mapsto e^ta)_\#\mu_0$（$0\le t\le T$）とする。距離微分と $v(t,x)=x$ の $L^2(\mu_t)$ 速度を別々に計算し、弱形式を満たす理由を述べよ。

<!-- solution-start -->
**詳細解答**。$a\mapsto e^ta$ は増加写像です。[一次元Wasserstein距離の分位点公式](../OTR11/index.md#thm-otr11-quantile-formula)を適用すると

$$
W_2^2(\mu_s,\mu_t)=(e^t-e^s)^2\int_{-1}^1a^2\frac{da}{2}
=\frac{(e^t-e^s)^2}{3}.
$$

従って $|\mu'|(t)=e^t/\sqrt3$。押し出しの積分公式で

$$
\int|v(t,x)|^2d\mu_t(x)
=\int_{-1}^1|e^ta|^2\frac{da}{2}=e^{2t}/3.
$$

よって $\|v_t\|=e^t/\sqrt3$ で一致します。$X_t(a)=e^ta$ は $\partial_tX_t(a)=e^ta=v(t,X_t(a))$ を満たし、初期測度はコンパクト支持なので[流れの押し出しの定理](../OTR17/index.md#thm-otr17-flow)により弱形式を満たします。
<!-- solution-end -->

### OTR18-B03 軌道の運動が測度の速さを超える例
- Level: B

単位円周上の一様確率測度 $\sigma$ を $\mathbb R^2$ 上の測度とみなす。$\theta$ を $[0,2\pi)$ の一様角度とし、確率 $1/2$ ずつで次の二軌道を選ぶ動的計画 $\eta$ を考える。時間範囲は $0\le t\le T$ とする。

$$
\gamma_t^+=(\cos(\theta+t),\sin(\theta+t)),\qquad
\gamma_t^-=(\cos(\theta-t),\sin(\theta-t)).
$$

周辺、軌道作用、距離微分、位置に条件付けた平均速度を求めよ。

<!-- solution-start -->
**詳細解答**。各符号について角度 $\theta\pm t$ は $2\pi$ を法として一様なので、どの時刻の周辺も

$$
(e_t)_\#\eta=\sigma
$$

です。各軌道の微分は互いに逆向きの接線方向単位ベクトルなので、$|\dot\gamma_t|=1$ です。よって軌道作用は

$$
\int\!\int_0^T|\dot\gamma_t|^2dt\,d\eta=T.
$$

周辺が一定なので $W_2(\sigma,\sigma)=0$、従って $|\mu'|=0$ です。同じ位置で二つの向きが等確率で存在し、平均速度は $v(t,x)=0$。この場は連続の方程式を満たし、作用も $0$ です。二つの逆向き運動を条件付き平均すると二乗作用が小さくなることが分かります。
<!-- solution-end -->

### OTR18-B04 最適結合の折れ線作用
- Level: B

$t\in[0,1]$、$\mu_t=\delta_{t^2}$ とし、等分割 $t_i=i/n$ で最適結合を直線補間する。折れ線の作用 $E_n$ を和として求め、$n\to\infty$ で距離微分の作用へ収束することを示せ。

<!-- solution-start -->
**詳細解答**。隣接する Dirac の最適結合はただ一つで、移動距離は

$$
t_{i+1}^2-t_i^2=\frac{(i+1)^2-i^2}{n^2}=\frac{2i+1}{n^2}.
$$

区間長は $1/n$ なので、速度の二乗を時間積分した寄与は $(2i+1)^2/n^3$。従って

$$
\begin{aligned}
E_n&=\frac1{n^3}\sum_{i=0}^{n-1}(2i+1)^2\\
&=\frac1{n^3}\left(4\frac{(n-1)n(2n-1)}6+4\frac{n(n-1)}2+n\right)\\
&=\frac{4n^2-1}{3n^2}\longrightarrow\frac43.
\end{aligned}
$$

一方 $|\mu'|(t)=2t$ で $\int_0^1|\mu'|^2dt=4/3$。有限分割での作用は連続曲線の作用以下となり、極限で一致することが確認できました。
<!-- solution-end -->

### OTR18-C01 合流点を含む二原子の最小速度
- Level: C

$\mu_t=\tfrac12\delta_{-t^2}+\tfrac12\delta_{t^2}$（$0\le t\le1$）とする。次の4点を示せ。

1. $AC^2$ と距離微分を検証する。
2. 動的計画を具体的に構成する。
3. 最小作用の速度場 $v$ とその作用を求める。
4. 他の有限作用の速度場がより小さい作用を持てない理由を説明する。

<!-- solution-start -->
**詳細解答**。(1) 一次元の[単調結合](../OTR11/index.md#thm-otr11-quantile-formula)は左原子と左原子、右原子と右原子を対応させます。$s\le t$ で

$$
W_2^2=\tfrac12(t^2-s^2)^2+\tfrac12(t^2-s^2)^2=(t^2-s^2)^2.
$$

よって $m(t)=2t\in L^2$ が上界で、距離微分は $2t$ です。

(2) 軌道 $\gamma_t^-=-t^2$ と $\gamma_t^+=t^2$ にそれぞれ質量 $1/2$ を置きます。いずれも連続かつ絶対連続で、時刻ごとの押し出しは $\mu_t$。微分は $\dot\gamma_t^-=-2t$、$\dot\gamma_t^+=2t$ で、その作用は

$$
\frac12\int_0^14t^2dt+\frac12\int_0^14t^2dt=\frac43.
$$

(3) $t>0$ で $v(t,-t^2)=-2t$、$v(t,t^2)=2t$ と置き、その他の位置と $t=0$ では $0$ とします。移動する原子について[OTR17の弱形式](../OTR17/index.md#def-otr17-measure-weak)を連鎖律でそれぞれ検算し、半分ずつ加えれば $(\mu,v)$ の弱形式になります。$\|v_t\|^2=\tfrac12(2t)^2+\tfrac12(2t)^2=4t^2$ で作用は $4/3$ です。

(4) 任意の有限作用の弱解速度場 $w$ について[速度場による距離微分評価](#thm-otr18-velocity-bound)から $\|w_t\|\ge|\mu'|(t)=2t$ がほとんど至る所で成立します。二乗積分して $\mathcal A(\mu,w)\ge\int_0^14t^2dt=4/3$。上で作った $v$ が等号を実現します。$t=0$ の合流点で二つの速度が衝突しても、その単独時刻は作用を変えません。
<!-- solution-end -->

### OTR18-C02 折れ線の極限から弱い保存則を作る
- Level: C

$\mu:[0,T]\to\mathcal P_2(\mathbb R^d)$ が $AC^2$ 曲線で、距離微分が $|\mu'|\in L^2(0,T)$ とする。[最適結合による折れ線近似の補題](#lem-otr18-polygonal)の $\eta^n$ から極限の軌道分布 $\eta$ を取れる理由を、(i) 軌道の一様連続性、(ii) 初期位置の緊密性、(iii) エネルギーの下半連続性で説明し、位置ごとの平均速度が弱い連続の方程式を満たすことを示せ。

<!-- solution-start -->
**詳細解答**。(i) 各軌道 $\gamma$ について Cauchy--Schwarz より $|\gamma_t-\gamma_s|\le\sqrt{A(\gamma)}|t-s|^{1/2}$、ただし $A(\gamma)=\int_0^T|\dot\gamma|^2$ です。$A(\gamma)\le R$ の部分では一様な $1/2$-Hölder 評価があります。

(ii) $(e_0)_\#\eta^n=\mu_0$ だから $|\gamma_0|\le R$ の外の確率は $\mu_0(B_R^c)\to0$ です。一方、$\mathbb E_{\eta^n}A\le\int|\mu'|^2=:E_0$ から $\eta^n(A>R)\le E_0/R$。両制約の交わりでは $\sup_t|\gamma_t|\le R+\sqrt{RT}$ かつ (i) の評価があり、[Arzela-Ascoli定理](../../../基礎科目/RA/RA8/index.md#thm-ra8-arzela-ascoli)により相対コンパクト。よって $\eta^n$ は tight です。曲線空間は一様距離で Polish なので [Prokhorovの定理](../OTR3/index.md#thm-otr3-prokhorov)から狭義収束部分列を取れます。

(iii) 任意の分割 $0=t_0<\cdots<t_k=T$ について $\sum_i|\gamma_{t_{i+1}}-\gamma_{t_i}|^2/(t_{i+1}-t_i)$ は一様収束に関して連続です。軌道作用 $A(\gamma)$ はこれらの分割量の上限であり下半連続です。狭義極限 $\eta$ に対し、[下半連続費用のliminf不等式](../OTR3/index.md#lem-otr3-lsc-integral)を適用して $\int A\,d\eta\le E_0$ です。さらに各時刻の周辺は[折れ線の一様収束](#lem-otr18-polygonal)により $\mu_t$ です。

最後に $J$ を $\int\Phi\cdot dJ=\int\int_0^T\Phi(t,\gamma_t)\cdot\dot\gamma_tdt\,d\eta$ で定めます。$\lambda=dt\,d\mu_t$ に対して、$\lambda(A)=\int\int_0^T\boldsymbol{1}_A(t,\gamma_t)dt\,d\eta=0$ なら $J(A)=0$ なので $J\ll\lambda$ です。各成分への[Radon--Nikodym 定理](../../MT/MT3/index.md#thm-mt3-rn-signed)により $J=v\,d\lambda$ と書け、$v$ は位置・時刻に条件付けた軌道速度の平均です。Jensen により $\int|v|^2d\mu dt\le E_0$。軌道に沿う試験関数の連鎖律を $\eta$ で積分すると

$$
\int\varphi(T,x)d\mu_T-\int\varphi(0,x)d\mu_0
=\int_0^T\int(\partial_t\varphi+v\cdot\nabla\varphi)d\mu_tdt,
$$

となり、求める弱い連続の方程式が得られます。
<!-- solution-end -->

## 9. ここで得た橋渡し

- 分布の速さ $|\mu'|$ は $W_2$ 距離だけから定まり、$AC^2$ 曲線ではほとんど至る所に存在します。
- 弱い連続の方程式の有限作用速度場は、[有限二乗作用の重ね合わせ原理](#thm-otr18-superposition)により粒子軌道へ分解でき、$|\mu'|\le\|v_t\|_{L^2(\mu_t)}$ を満たします。
- 逆に、最適結合の折れ線近似から最小作用の速度場が存在します。最小値は $\int|\mu'|^2dt$ です。ただし任意の微視的な軌道分解が最小とは限りません。

次の OTR19 では、この結果を端点固定のすべての測度曲線へ適用し、静的な $W_2^2$ と流体の最小作用を比較します。
