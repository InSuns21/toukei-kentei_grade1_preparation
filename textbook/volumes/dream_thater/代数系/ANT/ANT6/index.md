# ANT6 Re s=1の零点不存在と素数定理

[ANT5の対数微分公式](../ANT5/index.md#thm-ant5-logarithmic-derivative)は、素数冪に関する情報をRiemann ζ関数へ移しました。一方、[NT8の素数定理](../../NT/NT8/index.md#thm-nt8-prime-number-theorem)は、素数の個数が $x/\log x$ に漸近するという主張でした。二つの結果を結ぶには、単に $\zeta(s)$ が $s=1$ に極を持つだけでは足りません。境界直線上のほかの特異性を調べ、そこから実変数の総和の漸近式を引き出す必要があります。

この章では二つの新しい手段を一緒に構築します。前半ではEuler積の正値性から $\operatorname{Re}s=1$ 上に零点がないことを証明します。後半では、複素解析による積分収束の補題（Newman型のTauber補題）を**証明して**適用し、$\psi(x)\sim x$、最後に $\pi(x)\sim x/\log x$ を得ます。Wiener–Ikeharaの定理を外部の未証明結果として仮定するわけではありません。

以下、$s=\sigma+it$、$\log$ は自然対数、$x\ge2$ とします。

[Chebyshev の $\psi$](../../NT/NT8/index.md#def-nt8-chebyshev-psi)は右連続の非減少関数です。$\Lambda(n)\ge0$ なので、その総和は減少しません。

$\zeta$ の有理型接続と、$s=1$ における留数 $1$ の単純極については[CA12の定理](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)を使います。

## 1. 正値性から境界の零点を排除する

$\sigma>1$ なら[Euler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)は零になりません。しかし $\sigma$ を $1$ に近付けるだけでは、$\zeta(1+it)$ が零かどうかは分かりません。正の実数でのEuler積の対数を、三つの縦方向の値を組み合わせて非負にするのが突破口です。

具体的に $u=\cos\theta$ とすると

$$
3+4\cos\theta+\cos(2\theta)
=3+4u+(2u^2-1)=2(1+u)^2\ge0.
$$

これは各素数、各冪指数に適用できる**項ごとの非負性**です。

<a id="lem-ant6-positive-zeta"></a>

<!-- formal-statement-start -->
> **補題（ζの三項正値不等式）**  
> 実数 $\sigma>1$、$t\in\mathbb R$ に対し、

$$
\zeta(\sigma)^3\,|\zeta(\sigma+it)|^4\,
|\zeta(\sigma+2it)|\ge1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

絶対収束域で対数を取り、$p^{-k\sigma}$ の係数を上の三角恒等式に変換します。指数関数を戻せば不等式が得られます。

<!-- proof-start -->
### 証明

$\sigma>1$ では $\zeta(\sigma)>0$ です。[CA12のEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)から、$\operatorname{Re}z>1$ では

$$
\mathcal L(z)=\sum_p\sum_{k\ge1}\frac{p^{-kz}}k,\qquad
e^{\mathcal L(z)}=\zeta(z).
$$

この級数は $\sum_p\sum_{k\ge1}p^{-k\sigma}/k<\infty$ により絶対収束します。$|\exp w|=\exp(\operatorname{Re}w)$ を用いて

$$
\begin{aligned}
&\log\!\left(\zeta(\sigma)^3|\zeta(\sigma+it)|^4
|\zeta(\sigma+2it)|\right)\\
&\quad=3\mathcal L(\sigma)+4\operatorname{Re}\mathcal L(\sigma+it)
+\operatorname{Re}\mathcal L(\sigma+2it)\\
&\quad=\sum_p\sum_{k\ge1}\frac{
3+4\cos(kt\log p)+\cos(2kt\log p)}{kp^{k\sigma}}.
\end{aligned}
$$

分子を $\theta=kt\log p$ として書くと $2(1+\cos\theta)^2\ge0$ です。分母も正なので対数は非負です。指数関数を取ると左辺は $1$ 以上になります。
<!-- proof-end -->

$t=0$ ならこの補題は単に $\zeta(\sigma)^8\ge1$ を述べます。興味深いのは $t\ne0$ で、三つの点が異なることです。

<a id="thm-ant6-zeta-line-one"></a>

<!-- formal-statement-start -->
> **定理（Re s=1上のζの零点不存在）**  
> Riemann ζ関数の[有理型接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)は、すべての実数 $t\ne0$ について

$$
\zeta(1+it)\ne0
$$

> を満たす。$s=1$ は零点ではなく留数 $1$ の単純極である。
<!-- formal-statement-end -->

### 証明の見取り図

零点があったと仮定し、三項不等式の $\sigma\downarrow1$ を考えます。$\zeta(\sigma)$ の三乗による発散は、$\zeta(\sigma+it)$ の四乗による消失には勝てません。残る $\zeta(\sigma+2it)$ は極を持たないため有界です。

<!-- proof-start -->
### 証明

$t_0\ne0$ で $\zeta(1+it_0)=0$ と仮定します。[CA12の有理型接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)により $1+it_0$ で正則なので、零点の位数を $m\ge1$ として

$$
\zeta(s)=(s-(1+it_0))^m h(s),
\qquad h(1+it_0)\ne0
$$

と局所的に書けます。$\delta=\sigma-1\downarrow0$ とすると

$$
|\zeta(\sigma+it_0)|=O(\delta^m),
\qquad
\zeta(\sigma)=\frac1\delta+O(1)=O(\delta^{-1}).
$$

また $t_0\ne0$ より $1+2it_0\ne1$ なので、$\zeta$ はその近傍で正則です。従って

$$
|\zeta(\sigma+2it_0)|=O(1).
$$

[三項正値不等式](#lem-ant6-positive-zeta)へこれらを代入すると

$$
1\le\zeta(\sigma)^3
|\zeta(\sigma+it_0)|^4|\zeta(\sigma+2it_0)|
=O(\delta^{-3+4m}).
$$

$m\ge1$ なので指数 $4m-3\ge1$、右辺は $0$ に収束します。これは $1\le0$ となる矛盾です。$s=1$ が単純極であることは既出の[CA12の定理](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)から従います。
<!-- proof-end -->

この議論は境界線 $\sigma=1$ の零点を排除しました。しかし $\sigma<1$ のある幅を一斉に零点なしとする評価はまだ得ていません。次に必要なのは「境界まで解析接続できる」という情報を、素数側の平均に移す仕組みです。[ODE5で定義したLaplace変換](../../../解析系/ODE/ODE5/index.md#def-ode5-laplace-transform)を実変数の総和へ応用しますが、必要な収束定理はこの章で証明します。

## 2. Laplace変換が境界を越えたら何が言えるか

$\psi(x)$ 自体は段差のある関数なので、積分の中では扱えても、解析的な関数ではありません。$x=e^u$ と置き、$e^{-u}\psi(e^u)$ を考えると、[NT8のChebyshev上界](../../NT/NT8/index.md#thm-nt8-chebyshev-upper)と[素数冪分解](../../NT/NT8/index.md#prop-nt8-psi-prime-powers)からこれは有界になります。後で必要になるのは、この有界関数と定数 $1$ の差の積分が収束することです。

ここでは通常の絶対収束を要求しません。境界を越えたLaplace変換の正則延長があれば、符号の打ち消しを含む積分が収束する、という補題を証明します。これはTauber型の追加論理に相当します。

<a id="lem-ant6-newman"></a>

<!-- formal-statement-start -->
> **補題（Newman型の複素Tauber補題）**  
> $f:[0,\infty)\to\mathbb C$ を各有界区間で区分的連続な有界関数とし、$M=\sup_{u\ge0}|f(u)|<\infty$ とする。$\operatorname{Re}z>0$ で定義されるLaplace変換

$$
F(z)=\int_0^\infty f(u)e^{-zu}\,du
$$

> が虚軸の各点の近傍へ正則に延長できると仮定する。このとき広義積分 $\int_0^\infty f(u)\,du$ は（絶対値を付けた積分の有限性までは要求しない）有限値へ収束し、

$$
\int_0^\infty f(u)\,du=F(0)
$$

> が成立する。右辺は正則延長の $z=0$ での値である。
<!-- formal-statement-end -->

### 証明の見取り図

有限積分 $F_T(z)=\int_0^T f(u)e^{-zu}du$ は整関数です。Cauchyの積分公式へ $e^{Tz}(1+z^2/R^2)/z$ を掛けます。円の右半分では $F_T-F$ が小さく、左半分では $F_T$ 自身の増加を相殺できます。$1+z^2/R^2$ は円と虚軸の交点 $\pm iR$ で零になり、境界の分母 $|\operatorname{Re}z|$ を打ち消す役目です。最後に円の半径 $R$ を大きくします。

<!-- proof-start -->
### 証明

**(i) 積分と解析性の準備。** $\operatorname{Re}z=\sigma>0$ なら

$$
|F(z)|\le M\int_0^\infty e^{-\sigma u}\,du=\frac M\sigma.
$$

ここで正則性を積分の評価から確認します。$\sigma_0>0$ を固定すると、$\operatorname{Re}z\ge\sigma_0$ で $j=0,1$ について

$$
|u^j f(u)e^{-zu}|\le Mu^j e^{-\sigma_0u},
\qquad
\int_0^\infty u^j e^{-\sigma_0u}\,du
=\frac{j!}{\sigma_0^{j+1}}<\infty.
$$

$j=1$ の積分は部分積分で具体的に

$$
\begin{aligned}
\int_0^\infty u e^{-\sigma_0u}\,du
&=\left[-\frac{u}{\sigma_0}e^{-\sigma_0u}\right]_{0}^{\infty}
+\frac1{\sigma_0}\int_0^\infty e^{-\sigma_0u}\,du\\
&=\frac1{\sigma_0^2}
\end{aligned}
$$

と確かめられます。これらの優関数は $z$ に依存しないため、積分の差商に優収束を適用でき、

$$
F'(z)=-\int_0^\infty uf(u)e^{-zu}\,du
\qquad(\operatorname{Re}z>0)
$$

となるので、$F$ は右半平面で正則です。有限区間の $F_T$ では、任意の $B>0$ と $|z|\le B$ に対して $|uf(u)e^{-zu}|\le MT e^{BT}$（$0\le u\le T$）です。同じ差商の議論をすべての $z$ で行えるため、$F_T$ は整関数です。$\sigma>0$ では

$$
\begin{aligned}
e^{Tz}(F(z)-F_T(z))
&=\int_T^\infty f(u)e^{-(u-T)z}\,du,\\
|e^{Tz}(F(z)-F_T(z))|
&\le\frac M\sigma.
\end{aligned}
$$

$\sigma<0$ の場合は別の有限積分を使い、

$$
\begin{aligned}
e^{Tz}F_T(z)
&=\int_0^T f(u)e^{(T-u)z}\,du,\\
|e^{Tz}F_T(z)|
&\le M\int_0^T e^{(T-u)\sigma}\,du
\le\frac M{-\sigma}.
\end{aligned}
$$

**(ii) 積分路を作る。** $R>0$ を固定します。虚軸の閉線分 $[-iR,iR]$ の各点における正則延長は、重なりで恒等定理によって一致し、この線分の開近傍で一つの正則関数を与えます。したがって右半円周

$$
C_R^+=\{Re^{i\theta}:-\pi/2\le\theta\le\pi/2\}
$$

を下端から上端にたどります。虚軸の閉線分はコンパクトなので、その正則延長領域には線分の十分細い近傍が含まれます。そこで小さい $\varepsilon_R>0$ を取り、

$$
L_R:\quad z(y)=-\varepsilon_R\left(1-\frac{y^2}{R^2}\right)+iy,
\qquad y:R\longrightarrow -R
$$

と選びます。$|y|<R$ では $\operatorname{Re}z(y)<0$ で、端点は $\pm iR$ です。

$\varepsilon_R<R$ と十分小さく取れば、曲線は円板 $|z|\le R$ 内の正則延長領域に収まり、原点からも離れます。従って $C_R^+$ と $L_R$ をつないだ正向きの閉曲線は原点を一回囲み、その内部で $F$ は正則です。

原点を中心とする十分小さい円周へこの曲線を縮めても、$F(z)e^{Tz}(1+z^2/R^2)$ は囲まれた領域で正則です。[積分路のホモトピー不変性](../../../解析系/CA/CA2/index.md#thm-ca2-homotopy-invariance)により積分値は変わらず、その小円周に[Cauchyの積分公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-integral-formula)を適用できます。

$K_R(z)=(1+z^2/R^2)/z$ と置くと、$z=0$ における留数は $1$ です。ゆえに

$$
F(0)=\frac1{2\pi i}\left(
\int_{C_R^+}+\int_{L_R}\right)
F(z)e^{Tz}K_R(z)\,dz.
$$

一方 $F_T$ は整関数なので、円の左半円周 $C_R^-$（上端から下端へ反時計回り）を使って

$$
F_T(0)=\frac1{2\pi i}\left(
\int_{C_R^+}+\int_{C_R^-}\right)
F_T(z)e^{Tz}K_R(z)\,dz.
$$

ここで $e^{T\cdot0}=1$ です。また $F_T(z)e^{Tz}K_R(z)$ は $z=0$ 以外で正則です。$C_R^-$ と $L_R$ に挟まれる領域は原点より左にあり、積分の途中で極を横切りません。従って[積分路のホモトピー不変性](../../../解析系/CA/CA2/index.md#thm-ca2-homotopy-invariance)により $C_R^-$ を $L_R$ へ変形しても積分は変わりません。

**(iii) 二つの半円周を評価する。** $z=Re^{i\theta}$ とすると $|dz|=R\,d\theta$、$|z|=R$ であり、

$$
\left|1+\frac{z^2}{R^2}\right|
=|1+e^{2i\theta}|=2|\cos\theta|.
$$

右半円周では $\sigma=R\cos\theta>0$ です。(i)の第一評価を代入すると

$$
\begin{aligned}
\left|\frac1{2\pi i}\int_{C_R^+}
(F_T-F)e^{Tz}K_R(z)\,dz\right|
&\le\frac1{2\pi}\int_{-\pi/2}^{\pi/2}
\frac{M}{R\cos\theta}\,2\cos\theta\,d\theta\\
&=\frac MR.
\end{aligned}
$$

左半円周でも $\sigma=R\cos\theta<0$ として(i)の第二評価を代入すると、同様に

$$
\left|\frac1{2\pi i}\int_{C_R^-}
F_T(z)e^{Tz}K_R(z)\,dz\right|\le\frac MR.
$$

端点 $\pm iR$ は測度 $0$ であり、$K_R$ の分子が端点で零になるため上記の評価を損ないません。

**(iv) 左側の正則延長を消す。** 固定した $R$ に対して、$L_R$ 上では端点以外で $\operatorname{Re}z<0$ なので $e^{Tz}\to0$ です。$F(z)K_R(z)$ はこの固定曲線上で有界であり、$|e^{Tz}|\le1$ なので曲線の区分的滑らかなパラメータ表示についての優収束から

$$
\int_{L_R}F(z)e^{Tz}K_R(z)\,dz\longrightarrow0
\qquad(T\to\infty).
$$

(ii)の二式を差し引き、(iii)とこの収束を使うと

$$
\limsup_{T\to\infty}|F_T(0)-F(0)|\le\frac{2M}{R}.
$$

$R>0$ は任意なので、$R\to\infty$ により右辺は $0$ です。$F_T(0)=\int_0^T f(u)\,du$ が $F(0)$ に収束することが証明できました。
<!-- proof-end -->

補題は**広義積分が有限値へ収束すること**を結論しますが、任意の有界関数 $f(u)$ 自身が零へ収束することではありません。たとえば狭い区間だけ高い山を持つ関数は、積分が収束しても点ごとの極限が存在しないことがあります。次節では $\psi$ の単調性が、この欠けた一段を補います。

## 3. ζの境界非零性からψ(x)~xへ

[ANT5のMellin型積分表示](../ANT5/index.md#thm-ant5-mellin-psi)に $x=e^u$ を代入します。$dx=e^u\,du$ なので、$\operatorname{Re}z>0$ に対して

$$
\begin{aligned}
\int_0^\infty e^{-u}\psi(e^u)e^{-zu}\,du
&=\int_1^\infty\psi(x)x^{-(z+1)-1}\,dx\\
&=-\frac1{z+1}\frac{\zeta'(1+z)}{\zeta(1+z)}.
\end{aligned}
$$

ここで $x^{-(z+1)-1}dx$ が $e^{-(z+1)u}du$ になる点を確認してください。$\psi(x)$ の主項は $x$ と予想されるので、$e^{-u}\psi(e^u)$ から $1$ を引いてLaplace変換を取ります。

<a id="prop-ant6-laplace-error"></a>

<!-- formal-statement-start -->
> **命題（ψの正規化誤差のLaplace変換）**  
> $u\ge0$ に対し

$$
f(u)=e^{-u}\psi(e^u)-1
$$

> と置く。$f$ は有界かつ各有界区間で区分的連続であり、$\operatorname{Re}z>0$ では

$$
F(z):=\int_0^\infty f(u)e^{-zu}\,du
=-\frac{\zeta'(1+z)}{(1+z)\zeta(1+z)}-\frac1z.
$$

> 右辺は虚軸のすべての点を含む開近傍へ正則に延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

有界性はChebyshev上界で、Laplace公式は変数変換で示します。$z=0$ では $s=1$ の単純極の主部が $1/z$ と正確に相殺されます。それ以外の虚軸点では先ほど証明した零点不存在を使います。

<!-- proof-start -->
### 証明

[NT8のChebyshev上界](../../NT/NT8/index.md#thm-nt8-chebyshev-upper)から $\theta(y)\le Cy$（$y\ge2$）です。[素数冪分解](../../NT/NT8/index.md#prop-nt8-psi-prime-powers)より $x\ge8$ で

$$
\begin{aligned}
\psi(x)
&=\theta(x)+\sum_{2\le k\le\lfloor\log_2x\rfloor}\theta(x^{1/k})\\
&\le Cx+C\sqrt x\log_2x
=O(x).
\end{aligned}
$$

最後の評価には $\log x/\sqrt x=O(1)$ を使いました。$1\le x<8$ でも $\psi(x)$ は有限であるため、すべての $u\ge0$ について $|f(u)|\le M$ となる定数 $M$ が存在します。有限区間には有限個の素数冪の段差しかないので $f$ は区分的連続です。

$\operatorname{Re}z>0$ では[ANT5の積分表示](../ANT5/index.md#thm-ant5-mellin-psi)と前掲の変数変換から

$$
\begin{aligned}
F(z)
&=\int_0^\infty e^{-u}\psi(e^u)e^{-zu}\,du
-\int_0^\infty e^{-zu}\,du\\
&=-\frac{\zeta'(1+z)}{(1+z)\zeta(1+z)}-\frac1z,
\end{aligned}
$$

となります。二つの積分は $\operatorname{Re}z>0$ で絶対収束します。

$z_0=it_0$、$t_0\ne0$ の場合、$1+z_0\ne1$ であり、[境界零点不存在](#thm-ant6-zeta-line-one)から $\zeta(1+z_0)\ne0$ です。さらに $1+z_0\ne0$、$z_0\ne0$ なので右辺は $z_0$ の近傍で正則です。

$z=0$ の場合、[CA12の留数1の単純極](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)から、$z=0$ の近傍で正則な $h$ が存在し

$$
\zeta(1+z)=\frac1z+h(z)
=\frac{1+zh(z)}z
$$

と書けます。$g(z)=1+zh(z)$ は $g(0)=1$ なので、近傍で非零です。対数微分すると

$$
\frac{\zeta'(1+z)}{\zeta(1+z)}
=\frac{g'(z)}{g(z)}-\frac1z.
$$

従って

$$
\begin{aligned}
F(z)
&=\frac1{z(1+z)}
-\frac{g'(z)}{(1+z)g(z)}-\frac1z\\
&=-\frac1{1+z}
-\frac{g'(z)}{(1+z)g(z)}.
\end{aligned}
$$

最後の式は $z=0$ で正則です。これで虚軸のすべての点について延長が確認できました。
<!-- proof-end -->

ここでは虚軸を越える**局所的な正則延長**しか使っていません。全虚軸を含む一定幅の零点なし帯域や、冪型の誤差評価は導出していません。

<a id="thm-ant6-psi-asymptotic"></a>

<!-- formal-statement-start -->
> **定理（Chebyshevのψ関数の素数定理）**  
> [Chebyshevのψ関数](../../NT/NT8/index.md#def-nt8-chebyshev-psi)は

$$
\lim_{x\to\infty}\frac{\psi(x)}x=1,
\qquad\text{すなわち }\psi(x)\sim x
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[Newman型補題](#lem-ant6-newman)を $f(u)=e^{-u}\psi(e^u)-1$ に適用すると、その積分が収束します。積分の収束から点ごとの極限へ進むには $\psi$ の非減少性を使い、短い前後区間で正負の偏りが持続してしまうことを排除します。

<!-- proof-start -->
### 証明

[正規化誤差の命題](#prop-ant6-laplace-error)は $f$ の有界性、区分的連続性、Laplace変換の虚軸全体での正則延長を示しました。従って[Newman型の複素Tauber補題](#lem-ant6-newman)の仮定がすべて満たされ、

$$
\int_0^\infty f(u)\,du
\quad\text{が有限値に収束します。}
$$

そのため任意の固定 $h>0$ について、Cauchyの収束判定から

$$
\int_v^{v+h}f(u)\,du\longrightarrow0,
\qquad
\int_{v-h}^{v}f(u)\,du\longrightarrow0
\quad(v\to\infty).
$$

$g(v)=e^{-v}\psi(e^v)=1+f(v)$ と置きます。$\Lambda(n)\ge0$ なので $\psi$ は非減少です。$0\le w\le h$ に対して

$$
g(v+w)=e^{-(v+w)}\psi(e^{v+w})
\ge e^{-w}g(v),
$$

および $v\ge h$ なら

$$
g(v-w)=e^{-(v-w)}\psi(e^{v-w})
\le e^w g(v).
$$

任意の $0<\varepsilon<1$ を固定し、$h>0$ を十分小さく選んで

$$
e^{-h}(1+\varepsilon)>1+\varepsilon/2,
\qquad e^h(1-\varepsilon)<1-\varepsilon/2
$$

を満たすようにします。もし任意に大きい $v$ で $g(v)\ge1+\varepsilon$ なら、その $v$ に対し $v\le u\le v+h$ で

$$
f(u)=g(u)-1\ge e^{-h}(1+\varepsilon)-1>\varepsilon/2,
$$

したがって

$$
\int_v^{v+h}f(u)\,du\ge h\varepsilon/2
$$

です。これは先に示した短区間積分の収束に反します。

同じく、任意に大きい $v$ で $g(v)\le1-\varepsilon$ なら、$v-h\le u\le v$ で

$$
f(u)\le e^h(1-\varepsilon)-1<-\varepsilon/2,
\qquad
\int_{v-h}^{v}f(u)\,du\le-h\varepsilon/2,
$$

となり矛盾します。よってすべての $\varepsilon\in(0,1)$ について十分大きい $v$ では

$$
1-\varepsilon<g(v)<1+\varepsilon.
$$

従って $g(v)\to1$、すなわち $x=e^v\to\infty$ と戻して $\psi(x)/x\to1$ です。
<!-- proof-end -->

$\psi$ の単調性を外すと最後の推論は成り立ちません。例えば幅が急速に減る山を足した有界関数は、全積分が収束しても山の頂点での値が零に近付くとは限りません。この章の論法は「境界の解析性」と「元の算術的総和の非減少性」の両方に支えられています。

## 4. ψからπへ：素数定理を完成させる

素数冪を含む $\psi$ の漸近式を素数だけの $\theta$ へ移す際に、前章の誤差評価を使います。その後は部分和公式で対数の重みを取り除きます。

<a id="thm-ant6-prime-number-theorem"></a>

<!-- formal-statement-start -->
> **定理（素数定理の解析的証明）**  
> 素数計数関数 $\pi(x)=\#\{p\le x:p\text{ は素数}\}$ について

$$
\pi(x)\sim\frac{x}{\log x}
\qquad(x\to\infty)
$$

> が成立する。同時に $\theta(x)\sim x$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\psi$ と $\theta$ は高次の素数冪だけが違い、その差は $O(\sqrt x)$ です。$\theta(x)$ と $\pi(x)$ の部分和恒等式では、積分項が $x/\log x$ より小さいことを区間分割して確認します。

<!-- proof-start -->
### 証明

[ψの漸近式](#thm-ant6-psi-asymptotic)より $\psi(x)=x+o(x)$ です。[ANT5の素数冪誤差](../ANT5/index.md#prop-ant5-prime-powers-error)を使うと

$$
\theta(x)=\psi(x)+O(\sqrt x)
=x+o(x)+O(\sqrt x)=x+o(x),
$$

ここで $\sqrt x/x\to0$ なので $\theta(x)\sim x$ です。

[素数計数関数の部分和恒等式](../ANT5/index.md#prop-ant5-prime-summation)より $x\ge2$ では

$$
\pi(x)=\frac{\theta(x)}{\log x}
+\int_2^x\frac{\theta(t)}{t(\log t)^2}\,dt.
$$

第一項は $x/\log x+o(x/\log x)$ です。第二項では[NT8のChebyshev上界](../../NT/NT8/index.md#thm-nt8-chebyshev-upper) $\theta(t)\le Ct$ を使います。$x\ge4$ とすると

$$
\begin{aligned}
0\le\int_2^{\sqrt x}\frac{\theta(t)}{t(\log t)^2}\,dt
&\le \frac{C\sqrt x}{(\log2)^2},\\
0\le\int_{\sqrt x}^x\frac{\theta(t)}{t(\log t)^2}\,dt
&\le\frac{4Cx}{(\log x)^2}.
\end{aligned}
$$

第一上界を $x/\log x$ で割ると $O(\log x/\sqrt x)\to0$、第二上界は $O(1/\log x)\to0$ です。ゆえに積分は $o(x/\log x)$ であり、

$$
\pi(x)=\frac{x}{\log x}
+o\!\left(\frac{x}{\log x}\right).
$$

これが素数定理です。
<!-- proof-end -->

この証明は素数定理の**主項**を得ますが、$\psi(x)-x=O(x^\alpha)$ のような冪型誤差や、$\zeta(s)$ の零点の精密な配置までは示しません。そうした課題がANT7以降の中心です。

## 5. 演習と詳細解答

以下の問題では $\zeta$ の零点不存在を単に名前で呼ぶだけでなく、どの評価がどの点に使われるか確認してください。

### Level A：三角恒等式・極・積分の基本

#### A1. 正値多項式の直接確認

$c=-1,-1/2,0,1$ に対して $3+4c+(2c^2-1)$ を計算し、任意の $c\in[-1,1]$ で非負であることを示せ。

- Level: A
- ID: ANT6-A1

<!-- solution-start -->
**詳細解答**：式を整理すると

$$
3+4c+(2c^2-1)=2+4c+2c^2=2(1+c)^2.
$$

$c=-1,-1/2,0,1$ の順に $0,1/2,2,8$ です。二乗は実数で非負なので、$c\in[-1,1]$ のすべてで成立します。特に $c=\cos(kt\log p)$ を代入でき、[三項正値不等式](#lem-ant6-positive-zeta)の各項の符号が保証されます。
<!-- solution-end -->

#### A2. 零点の位数と符号

$\delta>0$ と整数 $m\ge1$ に対して $\delta^{-3}(\delta^m)^4$ を整理し、$\delta\downarrow0$ での極限を答えよ。$m=1$ と $m=2$ を別々に計算せよ。

- Level: A
- ID: ANT6-A2

<!-- solution-start -->
**詳細解答**：

$$
\delta^{-3}(\delta^m)^4=\delta^{4m-3}.
$$

$m=1$ では $\delta^1\to0$、$m=2$ では $\delta^5\to0$ です。一般に $m\ge1$ なら $4m-3\ge1$ なので零に収束します。[境界零点不存在の証明](#thm-ant6-zeta-line-one)では $\zeta(\sigma+2it)$ が有界なので、この次数の比較だけで矛盾を得ます。
<!-- solution-end -->

#### A3. Laplace変換の変数変換

$\operatorname{Re}z>0$ において $\int_0^\infty e^{-zu}\,du=1/z$ を示し、$x=e^u$ としたときの $\int_0^\infty e^{-(1+z)u}\psi(e^u)\,du$ の積分区間と微分を計算せよ。

- Level: A
- ID: ANT6-A3

<!-- solution-start -->
**詳細解答**：$u\ge0$、$\operatorname{Re}z>0$ なので $e^{-zu}\to0$ です。原始関数 $-e^{-zu}/z$ を使って

$$
\int_0^\infty e^{-zu}\,du
=\left[-\frac{e^{-zu}}z\right]_{0}^{\infty}
=\frac1z.
$$

$x=e^u$ なら $u=\log x$、$du=dx/x$、$u=0$ は $x=1$、$u\to\infty$ は $x\to\infty$ です。従って

$$
\int_0^\infty e^{-(1+z)u}\psi(e^u)\,du
=\int_1^\infty x^{-(1+z)}\psi(x)\frac{dx}{x}
=\int_1^\infty\psi(x)x^{-z-2}\,dx.
$$

[ANT5のMellin型積分表示](../ANT5/index.md#thm-ant5-mellin-psi)に $s=1+z$ を代入できる形です。
<!-- solution-end -->

#### A4. 係数の打消し

$g(z)=1+az+bz^2+O(z^3)$（$z\to0$）とする。$-\frac{1}{1+z}-\frac{g'(z)}{(1+z)g(z)}$ の $z=0$ での値を求めよ。

- Level: A
- ID: ANT6-A4

<!-- solution-start -->
**詳細解答**：$g(0)=1$、$g'(0)=a$ であり、$z=0$ の近傍で $g(z)\ne0$ です。代入すれば

$$
-\frac1{1+0}-\frac{g'(0)}{(1+0)g(0)}
=-1-a.
$$

$z=0$ で特異性はありません。[Laplace変換の命題](#prop-ant6-laplace-error)で、$\zeta(1+z)=g(z)/z$ と書いたときに二つの $1/z$ が消える仕組みです。$b$ は値には影響しません。
<!-- solution-end -->

### Level B：複素Tauber補題と算術的単調性

#### B1. 円周上の正確な分母評価

$z=Re^{i\theta}$ に対し $|1+z^2/R^2|=2|\cos\theta|$ を証明し、右半円周で $\frac{M}{\operatorname{Re}z}|1+z^2/R^2|$ を簡約せよ。

- Level: B
- ID: ANT6-B1

<!-- solution-start -->
**詳細解答**：$1+e^{2i\theta}=e^{i\theta}(e^{-i\theta}+e^{i\theta})=2e^{i\theta}\cos\theta$ であり、$|e^{i\theta}|=1$ なので

$$
\left|1+\frac{z^2}{R^2}\right|=2|\cos\theta|.
$$

右半円周では $\operatorname{Re}z=R\cos\theta>0$ だから

$$
\frac{M}{\operatorname{Re}z}
\left|1+\frac{z^2}{R^2}\right|
=\frac{M}{R\cos\theta}\,2\cos\theta
=\frac{2M}{R}.
$$

さらに $|dz|/|z|=d\theta$ を掛けて積分すれば $M/R$ が得られます。端点に近い $\cos\theta$ を無視して評価すると発散を作ってしまいます。
<!-- solution-end -->

#### B2. 整関数の有限積分

$f(u)=e^{-u}$（$u\ge0$）について $F(z)$、$F_T(z)$ を求め、$\int_0^\infty f(u)\,du=F(0)$ を直接検算せよ。

- Level: B
- ID: ANT6-B2

<!-- solution-start -->
**詳細解答**：$\operatorname{Re}z>0$ では

$$
F(z)=\int_0^\infty e^{-(1+z)u}\,du=\frac1{1+z}.
$$

右辺は $z=-1$ 以外で正則なので、虚軸すべての点の近傍で正則です。有限積分は複素数 $z\ne-1$ について

$$
F_T(z)=\frac{1-e^{-(1+z)T}}{1+z},
$$

であり、$z=-1$ の値は積分の直接計算から $T$ です。つまりこの点は除去可能で、$F_T$ は整関数です。$z=0$ で

$$
F_T(0)=1-e^{-T}\to1,\qquad F(0)=1.
$$

[Newman型補題](#lem-ant6-newman)の結論を直接確認できました。
<!-- solution-end -->

#### B3. 短区間積分だけでは足りない反例

$f(u)$ を区間 $[n,n+1/n^2]$（$n=2,3,\dots$）で $1$、それ以外で $0$ とする。各有界区間で区分的連続であり、$\int_0^\infty f(u)du$ は収束するが $f(u)\not\to0$ であることを示せ。

- Level: B
- ID: ANT6-B3

<!-- solution-start -->
**詳細解答**：各有界区間に交わる指定区間は有限個なので区分的連続で、$0\le f\le1$ です。各区間の長さは $1/n^2$ なので

$$
0\le\int_0^\infty f(u)\,du
=\sum_{n=2}^\infty\frac1{n^2}<\infty.
$$

しかし各整数 $n\ge2$ で $f(n)=1$ です。一方、例えば $u=n+1/2$ では十分大きい $n$ に対して $f(u)=0$ です。従って極限はありません。この反例は、[ψの漸近式の証明](#thm-ant6-psi-asymptotic)で非減少性を別途使用した理由を示しています。
<!-- solution-end -->

#### B4. 単調性と前後比較

$A:[1,\infty)\to[0,\infty)$ を非減少関数とし、$g(v)=e^{-v}A(e^v)$ とする。$0\le w\le h$ に対して $e^{-w}g(v)\le g(v+w)$ と $g(v-w)\le e^w g(v)$（$v\ge h$）を導け。

- Level: B
- ID: ANT6-B4

<!-- solution-start -->
**詳細解答**：$e^{v+w}\ge e^v$ なので、$A$ の非減少性より $A(e^{v+w})\ge A(e^v)$ です。両辺へ $e^{-v-w}$ を掛けると

$$
g(v+w)=e^{-v-w}A(e^{v+w})
\ge e^{-w}e^{-v}A(e^v)=e^{-w}g(v).
$$

また $e^{v-w}\le e^v$ から $A(e^{v-w})\le A(e^v)$ であり、

$$
g(v-w)=e^{-v+w}A(e^{v-w})
\le e^w e^{-v}A(e^v)=e^w g(v).
$$

[ψの漸近式の定理](#thm-ant6-psi-asymptotic)では $A=\psi$ と置き、正負の偏りが短区間上で消えず残ることを導きます。
<!-- solution-end -->

### Level C：全体の論理を再構成する

#### C1. 境界零点を仮定して素数定理へ至る

次の三事実を仮定する。(i) $\zeta(s)$ は $s=1$ に留数 $1$ の単純極を持つ、(ii) $\zeta(1+it)\ne0$（$t\ne0$）、(iii) $\psi(x)=O(x)$ で $\psi$ は非減少。さらに[ψのMellin型積分表示](../ANT5/index.md#thm-ant5-mellin-psi)を出発点とし、[Newman型の複素Tauber補題](#lem-ant6-newman)を適用して、$\psi(x)\sim x$ を導け。

- Level: C
- ID: ANT6-C1

<!-- solution-start -->
**詳細解答**：$f(u)=e^{-u}\psi(e^u)-1$ とします。(iii)より $f$ は有界で、$\psi$ は階段関数なので有限区間で区分的連続です。(i)と積分表示により $\operatorname{Re}z>0$ で

$$
F(z)=-\frac{\zeta'(1+z)}{(1+z)\zeta(1+z)}-\frac1z.
$$

$z=0$ で $\zeta(1+z)=g(z)/z$、$g(0)=1$ と分解すると

$$
F(z)=-\frac1{1+z}-\frac{g'(z)}{(1+z)g(z)}
$$

となり正則です。$z=it\ne0$ では(ii)より分母のζが非零、$z$ と $1+z$ も非零なので正則です。従って[Newman型補題](#lem-ant6-newman)が適用でき、$\int_0^\infty f(u)du$ は収束します。

任意の固定 $h>0$ に対し

$$
\int_v^{v+h}f(u)du\to0,\qquad
\int_{v-h}^{v}f(u)du\to0
$$

です。$g_*(v)=1+f(v)$ と置き、(iii)の非減少性から $g_*(v+w)\ge e^{-w}g_*(v)$、$g_*(v-w)\le e^w g_*(v)$ を得ます。$\varepsilon\in(0,1)$ に対し $h$ を小さく選べば、$g_*(v)\ge1+\varepsilon$ は前向きの短区間積分を $h\varepsilon/2$ 以上にし、$g_*(v)\le1-\varepsilon$ は後向きの積分を $-h\varepsilon/2$ 以下にします。どちらも収束に反するので $g_*(v)\to1$ です。$x=e^v$ と戻せば $\psi(x)/x\to1$ となります。
<!-- solution-end -->

#### C2. ψ・θ・πの論理的距離

$\psi(x)=x+o(x)$、$\psi(x)-\theta(x)=O(\sqrt x)$、$\theta(x)\le Cx$ と、[ANT5の素数計数部分和恒等式](../ANT5/index.md#prop-ant5-prime-summation)を仮定する。積分を二分割して $\pi(x)\sim x/\log x$ を証明せよ。零点なし帯域や誤差冪評価を導いたかも答えよ。

- Level: C
- ID: ANT6-C2

<!-- solution-start -->
**詳細解答**：初めの二つの仮定を差し引くと

$$
\theta(x)=\psi(x)+O(\sqrt x)
=x+o(x)+O(\sqrt x)=x+o(x).
$$

次に[素数計数関数の部分和恒等式](../ANT5/index.md#prop-ant5-prime-summation)より

$$
\pi(x)=\frac{\theta(x)}{\log x}
+\int_2^x\frac{\theta(t)}{t(\log t)^2}\,dt.
$$

第一項は $x/\log x+o(x/\log x)$ です。$x\ge4$ で積分を $[2,\sqrt x]$ と $[\sqrt x,x]$ に分割し、$0\le\theta(t)\le Ct$ を代入すると

$$
\begin{aligned}
0\le\int_2^{\sqrt x}\frac{\theta(t)}{t(\log t)^2}dt
&\le\frac{C\sqrt x}{(\log2)^2},\\
0\le\int_{\sqrt x}^x\frac{\theta(t)}{t(\log t)^2}dt
&\le\frac{4Cx}{(\log x)^2}.
\end{aligned}
$$

両方とも $x/\log x$ に比べて小さいので、積分は $o(x/\log x)$ です。従って $\pi(x)\sim x/\log x$ が従います。この推論は主項の漸近式だけを与え、$\zeta$ の零点なし帯域や $\psi(x)-x$ の冪型誤差評価は導いていません。
<!-- solution-end -->

## 6. 次章への橋

本章の[ζの境界零点不存在](#thm-ant6-zeta-line-one)を示し、さらに[Newman型の複素Tauber補題](#lem-ant6-newman)を用いることで、[素数定理](#thm-ant6-prime-number-theorem)の主項までを証明できました。次のANT7では、境界以外の零点がどこにあるか、どう数えるか、そして各零点が素数計数の誤差や振動にどう現れるかを調べます。