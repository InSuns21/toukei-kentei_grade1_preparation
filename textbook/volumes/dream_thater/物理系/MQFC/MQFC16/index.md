# MQFC16 P(φ)₂のUV除去を支える評価

[MQFC15](../MQFC15/index.md) では、有限の正則化幅で相互作用測度を作った。しかし幅を0に近づけると、Wick順序化した多項式の最小値は負の方向へ発散し得る。二乗平均で相互作用が収束しても、まれに非常に負の値を取れば指数重みの平均は発散し得る。今回は、そのまれな事象の確率を評価し、有限領域の相互作用測度を正則化幅0で構成する。

直接の前提は [MQFC14](../MQFC14/index.md)、[MQFC15](../MQFC15/index.md)。全Euclid次元は2、質量 $m>0$。自由場測度を $\mu_0$、その期待値を $E$ とする。以下の $\|Y\|_p=(E|Y|^p)^{1/p}$ は確率変数のノルムで、位置変数のノルムには $L^p(\mathbb R^2)$ と記す。正則化幅は $0<\epsilon\le1$ とする。

## 1. 二乗平均の収束に速度を付ける

[Wick積の二乗平均極限](../MQFC14/index.md#thm-mqfc14-smeared-limit) は極限の存在を保証した。指数重みを制御するには、幅 $\epsilon$ とそれより粗い幅 $\delta$ の差がどれほど小さいかを数値で押さえたい。

前講と同じ [正則化したWick積の試験関数測定](../MQFC14/index.md#def-mqfc14-smeared-wick) を用いる。平均核 $\rho$ は非負、滑らか、単位球に支持を持ち、偶関数で積分1。$\rho_\epsilon(z)=\epsilon^{-2}\rho(z/\epsilon)$ とし、$X_\epsilon(z)=\Phi(\rho_\epsilon(z-\cdot))$、$a_\epsilon=E[X_\epsilon(z)^2]$ とする。混合共分散は

$$
C_{\epsilon,\eta}=C*\rho_\epsilon*\rho_\eta
$$

である。$C$ は自由共分散核。例えば $\eta=\epsilon$ の原点でこの式を評価した値が $a_\epsilon$ である。

<a id="lem-mqfc16-rate"></a>

<!-- formal-statement-start -->
> **補題（Wick測定の切断収束速度）**
> 二次元の質量付き自由場と、単位球に支持を持つ非負・偶・滑らかな積分1の平均核を用いる。実 $g\in C_c^\infty(\mathbb R^2)$、整数 $n\ge1$ に対して

$$
V_{\epsilon,n}(g)=\int g(z)W_n(X_\epsilon(z);a_\epsilon)\,dz
$$

> と置く。$0<\epsilon,\eta\le\delta\le1$ なら、幅に依存しない有限定数 $K_n$ が存在して

$$
\|V_{\epsilon,n}(g)-V_{\eta,n}(g)\|_2
\le K_n\delta^{1/8}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

共分散核の平行移動の差を空間積分で評価する。Wick積の混合二次モーメントは共分散の冪なので、その差へ評価を移せば確率変数の差の二乗平均が得られる。指数 $1/8$ は最良である必要はなく、正であることが重要である。

<!-- proof-start -->
### 証明

[質量付き逆核の熱核積分表示](../MQFC5/index.md#thm-mqfc5-heat-resolvent) を

$$
C(z)=\int_0^\infty e^{-m^2t}h_t(z)\,dt,\qquad
h_t(z)=\frac{e^{-|z|^2/(4t)}}{4\pi t}
$$

と書く。$\nabla h_t(z)=-zh_t(z)/(2t)$ だから、$z=\sqrt t\,w$ と変数変換して

$$
\int|\nabla h_t(z)|\,dz
=t^{-1/2}\int\frac{|w|}{2}h_1(w)\,dw
=B t^{-1/2}.
$$

$B$ はGaussian積分により有限。線分上で積分して

$$
h_t(z-v)-h_t(z)=-\int_0^1 v\cdot\nabla h_t(z-sv)\,ds.
$$

絶対値を取り、[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)（非負部分にはTonelli）で積分を交換すると

$$
\|C(\cdot-v)-C\|_{L^1}
\le B|v|\int_0^\infty e^{-m^2t}t^{-1/2}\,dt
=D|v|.
$$

最後の積分は0近くで $t^{-1/2}$、無限遠で指数減衰するため有限。$\rho_\epsilon*\rho_\eta$ は積分1で半径 $\epsilon+\eta$ に支持を持つので

$$
\|C_{\epsilon,\eta}-C\|_{L^1}\le2D\delta.
$$

[自由共分散核の短距離評価](../MQFC14/index.md#prop-mqfc14-singularity) から原点付近で $C^q$ は任意の有限 $q\ge1$ について可積分である。原点から離れると熱核表示の各被積分関数が動径について減少するので $C$ は有界で、$\int C=m^{-2}$ から遠方でも $C^q$ は可積分である。

平均核は確率密度 $\nu$ を定める。$q>1$ のとき [Hölderの不等式](../../../解析系/F0/F0-00D2D/index.md#thm-f0-00d2d-01) を $|f|$ と $1$ に指数 $q,q/(q-1)$ で適用すると $|\int f\,d\nu|\le(\int|f|^q d\nu)^{1/q}$。$q=1$ では積分の三角不等式で成立する。これを各位置の平均に適用し、位置について積分すると $\|C_{\epsilon,\eta}\|_{L^q}\le\|C\|_{L^q}$ を得る。$D_0=C_{\epsilon,\eta}-C$ に対して Cauchy–Schwarz を $|D_0|^{1/2}$ と $|D_0|^{3/2}$ に適用する。

$$
\int |D_0|^2\le
\left(\int|D_0|\right)^{1/2}
\left(\int|D_0|^3\right)^{1/2}.
$$

従って $\|D_0\|_{L^2}\le (2D\delta)^{1/4}(2\|C\|_{L^3})^{3/4}$。$n\ge2$ なら冪の差を因数分解して

$$
|C_{\epsilon,\eta}^n-C^n|
\le |D_0|\sum_{j=0}^{n-1}C_{\epsilon,\eta}^{j}C^{n-1-j}.
$$

各積の $L^2$ ノルムは Hölder の不等式（$j=0,n-1$ では一方の因子が1）で $\|C\|_{L^{2(n-1)}}^{n-1}$ 以下。再度 Cauchy–Schwarz により冪の差の $L^1$ ノルムは定数倍の $\delta^{1/4}$ 以下。$n=1$ では最初の $L^1$ 評価が直接使え、$\delta\le1$ より同じ上界を取れる。

[Wick多項式の混合二次モーメント](../MQFC14/index.md#thm-mqfc14-wick-covariance) を点 $z,w$ の測定に適用すると

$$
E[V_{\epsilon,n}V_{\eta,n}]
=n!\int g(z)g(w)C_{\epsilon,\eta}(z-w)^n\,dz\,dw.
$$

右辺と切断なしの核 $C^n$ を使う積分との差の絶対値は

$$
n!\|g\|_{L^1}\|g\|_\infty
\|C_{\epsilon,\eta}^n-C^n\|_{L^1}
\le A_n\delta^{1/4}.
$$

差の二乗平均を二つの平方項と混合項に展開する。三つの期待値を同じ切断なしの積分からの誤差に置き換えると、共通の積分は係数 $1+1-2=0$ で消える。従って差の二乗平均は $4A_n\delta^{1/4}$ 以下であり、平方根を取れば主張を得る。
<!-- proof-end -->

## 2. Gaussian多項式の高次モーメント

二乗平均が小さくても、通常の確率変数では高次モーメントは大きくなり得る。ここでは自由場のWick積が固定次数のGaussian多項式から作られることを使う。

独立な標準正規変数 $Z_1,\ldots,Z_N$ を用意する。$H_j(u)=W_j(u;1)$ と書くと、[混合二次モーメント](../MQFC14/index.md#thm-mqfc14-wick-covariance) と独立性から、積 $\prod_i H_{\alpha_i}(Z_i)$ は異なる多重添字 $\alpha$ の間で直交する。$\alpha_i$ は非負整数で、$|\alpha|=\sum_i\alpha_i$ は全次数である。この全次数を固定した空間を考える。

<a id="def-mqfc16-chaos"></a>

<!-- formal-statement-start -->
> **定義（有限次Gaussian chaos）**
> 共通の中心化実Gaussian測定族の有限部分族から作った独立標準正規座標 $Z_i$ を用いる。整数 $n\ge0$ に対し、全次数 $|\alpha|=n$ の積 $\prod_i H_{\alpha_i}(Z_i)$ の有限線形結合全体を $L^2(\mu_0)$ で閉じた線形空間を第 $n$ Gaussian chaos とする。次数 $0$ は定数の空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc16-chaos -->
### 直接例

独立標準正規 $Z_1,Z_2$ に対し $Y=Z_1^2-1+2Z_1Z_2$ は第2 chaos に属する。実際、$H_2(Z_1)H_0(Z_2)+2H_1(Z_1)H_1(Z_2)$ と書け、両項の全次数が2。有限線形結合はその閉包に含まれる。直交性と $E[H_2(Z_1)^2]=2$、$E[Z_1^2 Z_2^2]=1$ から $\|Y\|_2^2=2+4=6$。また平均0で、定数項とは直交する。
<!-- definition-example-end -->

以下では最良定数を求めず、次数 $n$ に対してモーメントのノルムが $p^{n/2}$ 程度で増えることを証明する。

<a id="thm-mqfc16-chaos-moment"></a>

<!-- formal-statement-start -->
> **定理（固定次数chaosのモーメント評価）**
> 共通のGaussian測定族に対する第 $n$ Gaussian chaos の実確率変数 $Y$ を取る。$n\ge1$、整数 $r\ge1$ なら

$$
\|Y\|_{2r}\le
\frac{(2rn)^{n/2}}{\sqrt{n!}}\,\|Y\|_2.
$$

> 定数の空間では全てのノルムが一致する。
<!-- formal-statement-end -->

### 証明の見取り図

一つのWick積の内部の自己収縮は既に除かれている。$2r$ 個の積を平均すると、異なる積の間を結ぶ対だけが残る。各対分割の寄与を二乗平均で抑え、対分割の総数を数え上げる。

<!-- proof-start -->
### 証明

まず有限個の独立標準正規座標を使う。対称な実配列 $T_{i_1\ldots i_n}$（各添字は1から $N$）を用い、

$$
Y=\sum_{i_1,\ldots,i_n}T_{i_1\ldots i_n}
\prod_{j=1}^N H_{\alpha_j}(Z_j)
$$

と表す。ここで $\alpha_j$ は列 $(i_1,\ldots,i_n)$ に $j$ が出現する回数。各多重添字 $\alpha$ に対する列は $n!/\prod_j\alpha_j!$ 個なので、任意の係数をこの個数で割って同じ配列要素へ割り当てれば任意の有限次chaosを表せる。積の直交性と $E[H_j(Z)^2]=j!$ により

$$
E[Y^2]=n!\sum_{i_1,\ldots,i_n}T_{i_1\ldots i_n}^2
=n!\|T\|_{\ell^2}^2.
$$

$2r$ 個のWick積の期待値を計算するため、それぞれに補助ベクトル $u_a\in\mathbb R^N$ を割り当てる。Gaussian指数モーメントを計算すると

$$
E\prod_{a=1}^{2r}e^{u_a\cdot Z-|u_a|^2/2}
=\exp\left(\sum_{a<b}u_a\cdot u_b\right).
$$

各ブロック $a$ に $n$ 個の区別された微分位置を取って原点で微分する。左辺ではHermite積が現れ、右辺では $u_a\cdot u_b$ の因子一つが二つの微分位置を結ぶ。全 $2rn$ 個の微分を消費するには $rn$ 個の因子が必要で、因子の並べ替え $(rn)!$ は指数展開の分母と相殺する。よって異なるブロック間の対分割の和となり、対の座標添字が一致するとき1、それ以外は0を寄与する。微分と期待値の交換は有限次元Gaussianの指数モーメントと多項式モーメントの有限性で正当化できる。

固定した対分割では一つの対に一つの添字を割り当てる。配列 $T$ の積の絶対値を全ての対の添字について和にする。各添字はちょうど二つの異なる配列に現れる。この添字について Cauchy–Schwarz を適用し、二つの配列の絶対値をそれぞれその添字に関する二乗和の平方根に置き換える。他の配列はその添字に依存しない。残りの対について繰り返すと各配列には全添字の二乗和の平方根だけが残る。従って各寄与は $\|T\|_{\ell^2}^{2r}$ 以下である。

全対分割は $(2rn-1)(2rn-3)\cdots1$ 個（最初の位置の相手を選んで再帰）であり、許される対分割の個数はこれ以下。従って

$$
E|Y|^{2r}\le(2rn)^{rn}\|T\|_{\ell^2}^{2r}.
$$

$2r$ 乗根を取り、先の二乗平均の式を代入すれば有限次元の場合を得る。

閉包の元は有限線形結合の $L^2$ 極限である。二つの近似が異なる座標を使う場合も、測定の有限和空間の共分散内積について直交座標を選べば一つの独立標準正規座標系にまとめられる。零分散の方向は0として捨てる。座標の直交変更で全次数が保存されることは母関数 $e^{u\cdot Z-|u|^2/2}$ の次数 $n$ の係数から分かる。差にも有限次元評価が適用できるので近似列は $L^{2r}$ でCauchy列となり、[$L^p$ の完備性](../../../解析系/F0/F0-00D2E/index.md#thm-f0-00d2e-01) から極限を持つ。確率収束の極限の一意性により $L^2$ 極限と一致し、不等式も極限へ移る。
<!-- proof-end -->

[Gaussian Wick多項式](../MQFC14/index.md#def-mqfc14-wick) の母関数に $X=\sum_i b_i Z_i$、$a=\sum_i b_i^2$ を代入すると、$e^{sX-as^2/2}=\prod_i e^{sb_i Z_i-s^2b_i^2/2}$。$s^n$ の係数は全次数 $n$ のHermite積だけからなる。従って各点のWick多項式は第 $n$ chaos に属する。積分 $V_{\epsilon,n}(g)$ はその有限和の $L^2$ 極限でもある。実際、固定幅では混合共分散が連続なので、[Wick多項式の混合二次モーメント](../MQFC14/index.md#thm-mqfc14-wick-covariance) で二点の差の二乗平均を展開すると $z\mapsto W_n(X_\epsilon(z);a_\epsilon)$ は $L^2$ 連続。コンパクト支持上では一様連続となり、Riemann 和との差の $L^2$ ノルムはセル内の $L^2$ 振動の最大値と支持を含む長方形の面積の積で抑えられる。よって積分は閉包に属する。

## 3. 粗い切断の安定性

実多項式 $P(u)=\sum_{j=0}^{2k}p_j u^j$、$k\ge1$、$p_{2k}>0$、非負 $g\in C_c^\infty(\mathbb R^2)$ とする。[有限切断Wick相互作用](../MQFC15/index.md#def-mqfc15-interaction) を $V_\epsilon$ と略記する。紫外（UV）除去とはここではこの幅を0へ近づける操作である。粗い切断での負の下界を、幅の対数の冪で評価する。

<a id="lem-mqfc16-stability"></a>

<!-- formal-statement-start -->
> **補題（対数的な切断安定性）**
> 質量付き二次元自由場、非負の滑らかなコンパクト支持関数 $g$、正の偶数最高次数 $2k$ と正の最高次係数を持つ実多項式 $P$ を用いる。単位球に支持を持つ非負・偶・滑らかな積分1の平均核によるWick相互作用 $V_\epsilon$ に対し、幅に依存しない $D\ge1$ が存在して、全 $0<\epsilon\le1$ で

$$
V_\epsilon\ge -D(1+\log(1/\epsilon))^k
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

点分散は対数でしか増えない。Wick多項式を点分散の平方根で変数変換すると、最高次係数を固定したまま他の係数を一様有界にできる。

<!-- proof-start -->
### 証明

$\rho*\rho=\sigma$ と置けば $\sigma$ は有界な確率密度で半径2の球に支持を持つ。点分散は $a_\epsilon=\int \sigma(w)C(\epsilon w)\,dw$。[自由共分散核の短距離評価](../MQFC14/index.md#prop-mqfc14-singularity) と遠方での有界性から、$0<|\epsilon w|\le2$ で

$$
C(\epsilon w)\le A(1+\log(1/\epsilon)+|\log |w||).
$$

$\sigma$ は有界で、原点付近の $|\log |w||$ は二次元で可積分だから $a_\epsilon\le B(1+\log(1/\epsilon))$。

$s=\sqrt{1+a}$、$u=sv$、$a\ge0$ とする。[Wick多項式の係数式](../MQFC14/index.md#def-mqfc14-wick) に代入して

$$
\frac{W_j(sv;a)}{s^{2k}}
=j!\sum_{\ell=0}^{\lfloor j/2\rfloor}
\frac{(-a/(2s^2))^\ell s^{j-2k}v^{j-2\ell}}
{\ell!(j-2\ell)!}.
$$

$a/s^2\le1$、$s^{j-2k}\le1$ なので係数は一様有界である。$s^{-2k}P_a(sv)$ の最高次係数は $p_{2k}>0$。残りを絶対値で抑えた係数和を $M$ とすれば、$|v|\ge1$ で

$$
s^{-2k}P_a(sv)\ge p_{2k}|v|^{2k}-M|v|^{2k-1}.
$$

$R=\max(1,2M/p_{2k})$ とすれば $|v|\ge R$ で右辺は非負。$|v|\le R$ では下位項の絶対値の和が $M R^{2k-1}$ 以下なので、全 $u$ で $P_a(u)\ge-M R^{2k-1}(1+a)^k$ を得る。$g\ge0$ を掛けて積分し、先の点分散評価を代入すれば結論となる。
<!-- proof-end -->

例えば $P(u)=u^4$ では $P_a=(u^2-3a)^2-6a^2$。点分散が対数で増えるため、負の下界は対数の二乗で悪化する。次はこの粗い切断での下界と細かい切断との差の確率を組み合わせる。

## 4. 負の尾を制御して有限領域の測度を構成する

<a id="thm-mqfc16-negative-tail"></a>

<!-- formal-statement-start -->
> **定理（Wick相互作用の負の尾の一様評価）**
> 質量付き二次元自由場、非負の滑らかなコンパクト支持関数 $g$、正の偶数最高次数と正の最高次係数を持つ実多項式 $P$ を用いる。単位球に支持を持つ非負・偶・滑らかな積分1の平均核によるWick相互作用 $V_\epsilon$ に対して、任意の $q>0$ で

$$
\sup_{0<\epsilon\le1} E[e^{-qV_\epsilon}]<\infty
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

評価したい負の大きさ $t$ に合わせて粗い幅 $\delta$ を選ぶ。粗い幅以上では安定性から $V_\epsilon<-t$ は起こらない。それより細かい幅では粗い切断からの差が $t/2$ を超えなければならない。高次モーメントとMarkovの不等式で、この差の確率が任意の指数減衰より速く小さくなることを示す。

<!-- proof-start -->
### 証明

[切断収束速度](#lem-mqfc16-rate) と [固定次数chaosのモーメント評価](#thm-mqfc16-chaos-moment) を各 $V_{\epsilon,j}(g)-V_{\delta,j}(g)$ に適用する。定数項は差で消え、$j\le2k$ だから $r^{j/2}\le r^k$。三角不等式から、幅と整数 $r\ge1$ に独立な $L>0$ で

$$
\|V_\epsilon-V_\delta\|_{2r}
\le Lr^k\delta^{1/8}\qquad(0<\epsilon\le\delta\le1).
$$

[対数的な切断安定性](#lem-mqfc16-stability) の定数を $D$ とする。$t\ge2D$ に対し

$$
\delta=\exp(1-(t/(2D))^{1/k})
$$

と取る。$\delta\le1$ であり $D(1+\log(1/\delta))^k=t/2$。$\epsilon\ge\delta$ なら $V_\epsilon\ge-t/2$。$\epsilon<\delta$ でも $V_\delta\ge-t/2$ なので、$V_\epsilon<-t$ は $|V_\epsilon-V_\delta|>t/2$ を含意する。Markov の不等式を差の $2r$ 乗に使うと

$$
\mu_0(V_\epsilon<-t)
\le \left(\frac{2L r^k\delta^{1/8}}{t}\right)^{2r}.
$$

$r=\lceil t\rceil$（$t\ge1$）とすれば $t\le r\le2t$。括弧内の対数は

$$
\log(2L)+k\log r-\log t+
\frac18-\frac18(t/(2D))^{1/k}.
$$

$\log t/t^{1/k}\to0$ なので十分大きい $t$ ではこの値は $-c t^{1/k}$ 以下（例えば $c=(2D)^{-1/k}/16$）。従って全ての幅で

$$
\mu_0(V_\epsilon<-t)\le e^{-2c t^{1+1/k}}
$$

となる。ここで $t$ の下限は幅に依存しない。

$U_\epsilon=\max(0,-V_\epsilon)$ と置く。各標本で $e^{qU_\epsilon}=1+\int_0^{U_\epsilon}qe^{qt}dt$。非負積分の交換により

$$
E[e^{qU_\epsilon}]
=1+\int_0^\infty qe^{qt}\mu_0(U_\epsilon>t)\,dt.
$$

有限区間では確率を1で抑え、十分大きい区間では $qt-2ct^{1+1/k}\le-ct^{1+1/k}$ と評価できる。その指数は可積分であり、$e^{-qV_\epsilon}\le e^{qU_\epsilon}$ から主張が従う。
<!-- proof-end -->

負の尾だけを抑える理由は、正の方向へ大きいエネルギーは $e^{-V_\epsilon}$ を小さくするためである。四次多項式では $k=2$ なので上の評価は十分大きい $t$ について $e^{-c' t^{3/2}}$ 型になる。定数は質量・相互作用・支持などに依存してよい。

<a id="thm-mqfc16-finite-volume"></a>

<!-- formal-statement-start -->
> **定理（P(φ)₂の有限領域相互作用測度）**
> 質量 $m>0$ の二次元Euclid自由場、非負 $g\in C_c^\infty(\mathbb R^2)$、正の偶数最高次数と正の最高次係数を持つ実多項式 $P$ を用いる。Wick相互作用の $L^2$ 極限を $V_g$ とすると

$$
Z_g=E[e^{-V_g}]\in(0,\infty),\qquad
d\mu_g=Z_g^{-1}e^{-V_g}\,d\mu_0
$$

> が確率測度を定める。許容平均核による正規化密度は全ての有限 $p\ge1$ で $L^p(\mu_0)$ 収束する。従って有限個の実試験関数測定の任意の多項式の期待値も収束する。
<!-- formal-statement-end -->

### 証明の見取り図

[MQFC15の密度極限定理](../MQFC15/index.md#thm-mqfc15-density-limit) の不足していた仮定を直前の尾評価が満たす。高次モーメントまで制御できるので非有界な多項式観測量にも極限を移せる。

<!-- proof-start -->
### 証明

[Wick積の二乗平均極限](../MQFC14/index.md#thm-mqfc14-smeared-limit) を各次数に適用すると $V_\epsilon\to V_g$ が $L^2$ で成立し、極限は平均核に依存しない。従って確率収束する。任意の幅の列 $\epsilon_n\downarrow0$ に対し [負の尾の一様評価](#thm-mqfc16-negative-tail) を $q=2$ に適用すれば [指数重みの一様評価と密度の極限](../MQFC15/index.md#thm-mqfc15-density-limit) により $Z_{\epsilon_n}\to Z_g>0$ および $L^1$ 密度収束が成立する。

$Y_n=e^{-V_{\epsilon_n}}$、$Y=e^{-V_g}$ とする。任意の $p\ge1$ で $Y_n\to Y$ が確率収束し、直前の評価を $q=2p$ に使えば $E[Y_n^{2p}]\le M_p$。確率収束からほとんど確実に収束する部分列を取りFatouの補題を適用すると $E[Y^{2p}]\le M_p$。従って

$$
E|Y_n-Y|^{2p}\le 2^{2p}M_p.
$$

任意の $\gamma>0$ について、小さい差と大きい差の事象に分け、後者で Cauchy–Schwarz を適用すると

$$
E|Y_n-Y|^p\le
\gamma^p+(2^{2p}M_p)^{1/2}
\mu_0(|Y_n-Y|>\gamma)^{1/2}.
$$

$n\to\infty$ の後に $\gamma\downarrow0$ とすれば $L^p$ 収束を得る。正規化については

$$
\left\|\frac{Y_n}{Z_n}-\frac{Y}{Z_g}\right\|_p
\le\frac{\|Y_n-Y\|_p}{Z_n}
+\left|\frac1{Z_n}-\frac1{Z_g}\right|\|Y\|_p
$$

であり、右辺は0へ収束する。これは任意の0へ向かう幅の列（単調でない列も同じ証明）で成立するから幅の極限で成立する。

有限個の測定の多項式 $F$ は自由場のGaussianモーメントにより $L^2(\mu_0)$ に属する。$p=2$ の密度収束に Cauchy–Schwarz を使えば

$$
|E_{\mu_{\epsilon,g}}F-E_{\mu_g}F|
\le \|F\|_2
\left\|Y_\epsilon/Z_\epsilon-Y/Z_g\right\|_2\to0.
$$

両期待値の絶対可積分性も同じ不等式で確認できる。
<!-- proof-end -->

この測度は有限領域での相互作用を記述する。例えば平均核 $\rho$ が時間反転に不変で、$g=g_++g_+\circ\theta$ かつ $g_+$ の支持が正時間の内部にコンパクトに含まれるなら、十分小さい幅で [分離された切断での反射陽性の保存](../MQFC15/index.md#thm-mqfc15-rp) が成立する。反射形式の観測量 $\overline{F(\theta\Phi)}F(\Phi)$ は有限測定の多項式なので、今の定理で非負性が極限へ移る。この十分条件と一般の時間対称な $g$ は区別する。また有限領域の構成は無限体積での存在や質量ギャップの証明ではない。領域の大きさに対しても一様な評価が次に必要になる。

## 5. 演習

### 演習 MQFC16-A1：共分散の平行移動

- Level: A

$\|C(\cdot-v)-C\|_{L^1}\le D|v|$ とする。積分1の非負核 $\kappa$ が半径 $3\delta$ に支持を持つとき、$\|C*\kappa-C\|_{L^1}\le3D\delta$ を示せ。

<!-- solution-start -->
**詳細解答**

積分1から $(C*\kappa-C)(z)=\int [C(z-v)-C(z)]\kappa(v)dv$。絶対値を取り位置で積分し、非負積分を交換すると

$$
\|C*\kappa-C\|_{L^1}\le
\int D|v|\kappa(v)dv\le3D\delta.
$$

最後に支持条件と積分1を使った。
<!-- solution-end -->

### 演習 MQFC16-A2：chaosの次数と分散

- Level: A

独立標準正規 $Z_1,Z_2$ に対して $Y=(Z_1^2-1)Z_2$ のchaosの次数、平均、分散、四次モーメントを求めよ。

<!-- solution-start -->
**詳細解答**

$Y=H_2(Z_1)H_1(Z_2)$ なので [有限次Gaussian chaos](#def-mqfc16-chaos) の第3空間に属する。独立性から平均0、分散は $E[(Z_1^2-1)^2]E[Z_2^2]=(3-2+1)\cdot1=2$。[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) を同じ標準正規変数の繰り返しに適用する。対の個数が2,3,4のとき、対分割数はそれぞれ3,15,105なので $E[Z^4]=3,E[Z^6]=15,E[Z^8]=105$。従って

$$
E[Y^4]=(105-4\cdot15+6\cdot3-4+1)\cdot3=180.
$$
<!-- solution-end -->

### 演習 MQFC16-A3：四次の安定性

- Level: A

$P(u)=2u^4+bu^2$、$b\ge0$、$a\ge0$ とする。Wick順序化した $P_a(u)$ が $-12a^2-ba$ 以上であることを示せ。

<!-- solution-start -->
**詳細解答**

[Gaussian Wick多項式](../MQFC14/index.md#def-mqfc14-wick) の二次・四次を代入する。

$$
P_a(u)=2(u^2-3a)^2-12a^2+b u^2-ba.
$$

平方と $bu^2$ はともに非負なので除けば所望の下界。$a=0$ でも成立する。
<!-- solution-end -->

### 演習 MQFC16-A4：負の尾から指数モーメントへ

- Level: A

実確率変数 $V$ が $\Pr(V<-t)\le e^{-t^2}$ ($t\ge1$) を満たすとする。$E[e^{-3V}]<\infty$ を示せ。

<!-- solution-start -->
**詳細解答**

$U=\max(0,-V)$ に対して $e^{-3V}\le e^{3U}$。積分表示 $e^{3U}=1+\int_0^U3e^{3t}dt$ から

$$
E[e^{3U}]\le1+\int_0^1 3e^{3t}dt+
\int_1^\infty 3e^{3t-t^2}dt.
$$

$t\ge6$ なら $3t\le t^2/2$ だから最後の尾部は $3e^{-t^2/2}$ で抑えられる。有限区間の積分も有限なので結論が従う。
<!-- solution-end -->

### 演習 MQFC16-B1：二乗平均の速度

- Level: B

$0<\delta\le1$ とし、二つの核 $A,B$ が $\|A-B\|_{L^1}\le\delta$、$\|A\|_{L^3},\|B\|_{L^3}\le2$、$\|A\|_{L^2},\|B\|_{L^2}\le3$ を満たす。$\|A^2-B^2\|_{L^1}$ を $\delta^{1/4}$ の定数倍で評価せよ。

<!-- solution-start -->
**詳細解答**

$D_0=A-B$ とすると $\|D_0\|_{L^3}\le4$。Cauchy–Schwarz により $\int|D_0|^2\le(\int|D_0|)^{1/2}(\int|D_0|^3)^{1/2}$、従って $\|D_0\|_{L^2}\le \delta^{1/4}4^{3/4}$。冪の差を $D_0(A+B)$ と因数分解し、再び Cauchy–Schwarz を使うと

$$
\|A^2-B^2\|_{L^1}\le
\|D_0\|_{L^2}\|A+B\|_{L^2}
\le6\cdot4^{3/4}\delta^{1/4}.
$$
<!-- solution-end -->

### 演習 MQFC16-B2：粗い幅の選択

- Level: B

$V_\epsilon\ge-2(1+\log(1/\epsilon))^2$、$0<\epsilon\le1$ とする。$t\ge4$ に対し $\delta$ を選んで $\epsilon\ge\delta$ なら $V_\epsilon\ge-t/2$ とせよ。$\epsilon<\delta$ のとき $\{V_\epsilon<-t\}$ が差の大きい事象に含まれることも示せ。

<!-- solution-start -->
**詳細解答**

$2(1+\log(1/\delta))^2=t/2$ を解く。$1+\log(1/\delta)>0$ なので正の平方根を取り $\delta=\exp(1-\sqrt t/2)\le1$。$\epsilon\ge\delta$ なら対数が減るので負の下界は $-t/2$ 以上。$\epsilon<\delta$ の場合 $V_\delta\ge-t/2$ であり、$V_\epsilon<-t$ なら $V_\epsilon-V_\delta<-t+t/2=-t/2$。従って $|V_\epsilon-V_\delta|>t/2$ となる。
<!-- solution-end -->

### 演習 MQFC16-B3：二乗平均だけでは足りない理由

- Level: B

一様確率空間 $(0,1)$ で $V_n=-n$ ($0<x<n^{-4}$)、それ以外では0とする（$n\ge2$）。二乗平均収束と指数重みの平均を調べ、[負の尾の一様評価](#thm-mqfc16-negative-tail) との違いを説明せよ。

<!-- solution-start -->
**詳細解答**

$E[V_n^2]=n^2 n^{-4}=n^{-2}\to0$ なので $L^2$ で0へ収束する。一方

$$
E[e^{-V_n}]=1-n^{-4}+n^{-4}e^n\to\infty.
$$

$t=n/2$ とすると $\Pr(V_n<-t)=n^{-4}$。これは任意の $c>0$ で十分大きい $n$ について $e^{-ct^{3/2}}$ より大きい。固定次数chaosの高次モーメント制御と粗い切断の安定性に相当する仮定がないため、まれな負の事象を指数重みに耐える速さで排除できない。
<!-- solution-end -->

### 演習 MQFC16-B4：異なる切断の差の高次ノルム

- Level: B

$Y_2,Y_4$ がそれぞれ第2、第4 chaos に属し、$\|Y_2\|_2,\|Y_4\|_2\le K\delta^{1/8}$ とする。$\|Y_2+Y_4\|_{2r}\le BKr^2\delta^{1/8}$ となる幅・$r$ に独立な $B$ を求めよ。

<!-- solution-start -->
**詳細解答**

[固定次数chaosのモーメント評価](#thm-mqfc16-chaos-moment) を $n=2,4$ に適用する。

$$
\|Y_2\|_{2r}\le\frac{4r}{\sqrt2}K\delta^{1/8},
\quad
\|Y_4\|_{2r}\le\frac{64r^2}{\sqrt{24}}K\delta^{1/8}.
$$

$r\ge1$ なので $r\le r^2$。三角不等式から $B=4/\sqrt2+64/\sqrt{24}$ が取れる。
<!-- solution-end -->

### 演習 MQFC16-C1：有限領域の反射陽性

- Level: C

第4節の有限領域測度の仮定に加え、$\rho$ は時間反転に不変とし、$g=g_++g_+\circ\theta$、非負 $g_+\in C_c^\infty$ の支持は $t\ge h>0$ に含まれるとする。正時間の有限測定の多項式 $F$ について $\mu_g$ の反射形式が非負であることを示せ。またこの証明が無限体積での質量ギャップを保証しない理由を述べよ。

<!-- solution-start -->
**詳細解答**

$0<\epsilon<h$ なら平均核の支持半径は $\epsilon$ なので、$g_+(z)>0$ となる点 $z$ の測定関数は正時間に支持を持つ。反転不変性と $g$ の分離条件もあるため [分離された切断での反射陽性の保存](../MQFC15/index.md#thm-mqfc15-rp) から

$$
E_{\mu_{\epsilon,g}}[\overline{F(\theta\Phi)}F(\Phi)]\ge0.
$$

$A=\overline{F(\theta\Phi)}F(\Phi)$ は有限個のGaussian測定の多項式であり $E|A|^2<\infty$。$D_\epsilon=e^{-V_\epsilon}/Z_\epsilon$、$D=e^{-V_g}/Z_g$ と置く。[有限領域相互作用測度](#thm-mqfc16-finite-volume) の $p=2$ の結論により

$$
|E_{\mu_{\epsilon,g}}A-E_{\mu_g}A|
\le\|A\|_2\|D_\epsilon-D\|_2\to0.
$$

非負実数の極限は非負なので所望の反射形式が得られる。時間反転不変性も有界指示関数の期待値収束で移る。

この議論で固定した $g$ の支持を拡大した場合、安定性定数は $\int g$ に、二乗平均評価の定数は $\|g\|_{L^1}\|g\|_\infty$ に依存する。従って領域を拡大したときの一様な収束や相関の指数減衰はこの評価だけからは従わない。反射陽性そのものはギャップの正の下界ではなく、無限体積の構成と相関評価が別途必要になる。
<!-- solution-end -->

## 6. 次の講義

有限領域の相互作用では紫外切断を外すことができた。次は領域の大きさを無限へ向けるとき、離れた観測量の相関をどのように抑えるかを調べる。

<!-- DT-REVIEW: MQFC16 -->
