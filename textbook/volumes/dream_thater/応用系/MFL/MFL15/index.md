# MFL15 密度補正・極限generator

<!-- definition-example-audit: strict -->

## 1. 行で割っても、標本密度の影響は残る

[MFL13の行正規化の計算](../MFL13/index.md#prop-mfl13-row)では、標本密度 $p$ の近くで核平均を作り、重みの総和で割っても、極限に $2\langle\nabla_g\log p,\nabla_gf\rangle_g$ が残った。局所的に標本が多い方向へ平均が偏るからである。[MFL14の有限標本の集中](../MFL14/index.md#thm-mfl14-ratio)は、標本数を増やせばその**密度依存の連続平均**を近似できると保証するが、密度依存そのものを除くわけではない。

例えば円周上で右側ほど観測が多いのなら、左右対称な幾何を学びたいのに、行正規化だけでは右側の値が強く効く。そこで、観測密度を核の重みから差し引く強さを調節する。本章の問いは、**どの補正なら幾何のLaplace–Beltrami作用素が現れ、補正後には何が残るか**である。

全節で $(M,g)$ は境界のない滑らかなコンパクト $d$ 次元Riemann多様体（$d\ge1$）、$dV_g$ は体積測度、$\Delta_g=\operatorname{div}_g\nabla_g$ は非正スペクトルの符号とする。$p\in C^3(M)$ は $\int_Mp\,dV_g=1$、$p\ge p_{\min}>0$ を満たす確率密度、$f\in C^3(M)$ は実数値関数とする。$\varepsilon>0$ は長さの二乗の次元をもつ核幅で、[内在Gaussian核](../MFL13/index.md#def-mfl13-kernel)を

$$
k_\varepsilon(x,y)=(4\pi\varepsilon)^{-d/2}
\exp\!\left(-\frac{d_g(x,y)^2}{4\varepsilon}\right)
$$

と書く。ここでの積分は有限標本の和ではない。$d_g$ は測地距離である。

## 2. 両端の密度を補正し、そのあと行で正規化する

観測点の近傍重みの総量を調べる量は、[MFL13の核積分作用素](../MFL13/index.md#def-mfl13-kernel)による $q_\varepsilon(x)=G_\varepsilon p(x)$ である。

内在Gaussian核は非負で、各点の対角付近では正である。密度も $p>0$ だから、近傍の積分から $q_\varepsilon(x)>0$ が従う。多様体が非連結なら、異なる連結成分間の測地距離を無限大、核値を $0$ と約束する。同じ点の近傍からの正の積分は失われない。

点 $x,y$ のそれぞれの重みに $q_\varepsilon^{-\alpha}$ を掛けると、密度の高い場所から来る重みを下げられる。指数 $\alpha\in\mathbb R$ は補正の強さを決める（代表値は $0,\tfrac12,1$）。

<a id="def-mfl15-alpha"></a>

<!-- formal-statement-start -->
> **定義（alpha密度補正と連続Markov作用素）**  
> 境界なしコンパクトRiemann多様体 $(M,g)$ 上の正の確率密度 $p$、内在Gaussian核 $k_\varepsilon$、$\varepsilon>0$、$\alpha\in\mathbb R$ に対し、$q_\varepsilon=G_\varepsilon p$ と置く。補正核、補正後の行和、行正規化作用素をそれぞれ
>
$$
k_\varepsilon^{(\alpha)}(x,y)=
\frac{k_\varepsilon(x,y)}
{q_\varepsilon(x)^\alpha q_\varepsilon(y)^\alpha},
\qquad
d_\varepsilon^{(\alpha)}(x)=
\int_M k_\varepsilon^{(\alpha)}(x,y)p(y)\,dV_g(y),
$$

$$
P_\varepsilon^{(\alpha)}f(x)=
\frac{\int_M k_\varepsilon^{(\alpha)}(x,y)f(y)p(y)\,dV_g(y)}
{d_\varepsilon^{(\alpha)}(x)}
$$
>
> と定める。$d_\varepsilon^{(\alpha)}(x)>0$ であり、$P_\varepsilon^{(\alpha)}1=1$。この作用素は非負関数を非負関数へ写し、定数 $1$ を保つ線形作用素である。
<!-- formal-statement-end -->

**二段の正規化を混ぜない。** 最初の $q_\varepsilon$ は観測密度の推定に相当し、両端を補正する。最後の $d_\varepsilon^{(\alpha)}$ は**各行を確率重みへ直す**ためのものである。$q_\varepsilon(x)^{-\alpha}$ は同じ行の全項に共通なので、分子と分母で消えて

$$
P_\varepsilon^{(\alpha)}f(x)=
\frac{G_\varepsilon(f\,p\,q_\varepsilon^{-\alpha})(x)}
{G_\varepsilon(p\,q_\varepsilon^{-\alpha})(x)}.
$$

この等式が計算の入り口である。両端補正した対称核と、行正規化後の非対称な遷移作用素は別物である。

<!-- definition-example-start: def-mfl15-alpha -->
**直接例（一様円周では全ての $\alpha$ が一致）。** **定義の確認**：半径 $R$ の円周で $p=1/(2\pi R)$ とし、弧長差 $s\in[-\pi R,\pi R]$ を使う。核は差 $s$ だけで決まるので

$$
q_\varepsilon(x)=\frac1{2\pi R}
\int_{-\pi R}^{\pi R}\frac{e^{-s^2/(4\varepsilon)}}{\sqrt{4\pi\varepsilon}}\,ds
=q_0>0
$$

は $x$ に依存しない。ゆえに $k_\varepsilon^{(\alpha)}=q_0^{-2\alpha}k_\varepsilon$ は正で対称、$d_\varepsilon^{(\alpha)}=q_0^{1-2\alpha}>0$。分子と分母の共通因子を約分すると、全ての $\alpha$ で

$$
P_\varepsilon^{(\alpha)}f(x)=
\frac{\int_Mk_\varepsilon(x,y)f(y)p(y)\,dV_g(y)}{q_0}.
$$

また非負関数の積分は非負であり、$f=1$ の分子は分母そのものなので、定義にあるMarkov性の両条件を直接確認できる。
<!-- definition-example-end -->

## 3. $\alpha$ は極限の密度driftを連続的に調節する

核幅を縮めると、核平均は恒等作用素に近づく。その**一次の変化率**をgeneratorと呼び、$L_\alpha f=\lim_{\varepsilon\downarrow0}(P_\varepsilon^{(\alpha)}f-f)/\varepsilon$ が存在するならその値を考える。一般に有限の $\varepsilon$ に対して $P_\varepsilon^{(\alpha)}=I+\varepsilon L_\alpha$ と厳密に等しいわけではない。

<a id="thm-mfl15-generator"></a>

<!-- formal-statement-start -->
> **定理（alpha補正の極限generator）**  
> $(M,g)$ は境界のない滑らかなコンパクト $d$ 次元Riemann多様体、$p,f\in C^3(M)$ は実数値で、$p$ は確率密度、$p\ge p_{\min}>0$ とする。$\alpha\in\mathbb R$ を固定し、[alpha補正した連続作用素](#def-mfl15-alpha) $P_\varepsilon^{(\alpha)}$ を用いると、$\varepsilon\downarrow0$ で $x\in M$ に一様に
>
$$
\boxed{
P_\varepsilon^{(\alpha)}f
=f+\varepsilon\left[
\Delta_gf+2(1-\alpha)
\langle\nabla_g\log p,\nabla_gf\rangle_g
\right]+O(\varepsilon^{3/2}).}
$$
>
> 従って極限generatorは
>
$$
\boxed{L_\alpha f=\Delta_gf+
2(1-\alpha)\langle\nabla_g\log p,\nabla_gf\rangle_g.}
$$
>
> 剰余の定数は固定した $M,g,p,f,\alpha$ に依存する。これは滑らかな固定関数の連続作用素に関する極限であり、有限標本の固有空間収束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[MFL13のGaussian積分のbias展開](../MFL13/index.md#thm-mfl13-bias)を、分子と分母にそれぞれ使う。ただし補正係数 $q_\varepsilon^{-\alpha}$ 自体が $\varepsilon$ に依存するため、先に一次展開してから核を作用させる。曲率項と補正係数に由来する共通項は比の中で消える。最後に積のLaplace作用素を展開する。

<!-- proof-start -->
### 証明

$c=\operatorname{Scal}/3$、$A=\Delta_gp-cp$ とおく。[核bias定理](../MFL13/index.md#thm-mfl13-bias)に $u=p$ を代入すると

$$
q_\varepsilon=G_\varepsilon p=p+\varepsilon A+O(\varepsilon^{3/2})
$$

で一様である。$p\ge p_{\min}$ なので十分小さい $\varepsilon$ では $q_\varepsilon\ge p_{\min}/2$。正の数の関数 $t\mapsto t^{-\alpha}$ を $t=p(x)$ の周りで一次Taylor展開する。$\delta=q_\varepsilon-p=\varepsilon A+O(\varepsilon^{3/2})$ は一様に $O(\varepsilon)$ なので

$$
q_\varepsilon^{-\alpha}
=p^{-\alpha}\left(1-\alpha\varepsilon\frac Ap\right)
+O(\varepsilon^{3/2}).
$$

$r=p^{1-\alpha}$、$b=A/p$ と置けば $p\,q_\varepsilon^{-\alpha}=r-\alpha\varepsilon rb+O(\varepsilon^{3/2})$。この剰余は一様で、$G_\varepsilon$ の積分核の総量 $G_\varepsilon1$ は[MFL13の展開](../MFL13/index.md#thm-mfl13-bias)で $1+O(\varepsilon)$ だから、$G_\varepsilon$ を作用させても $O(\varepsilon^{3/2})$ のままである。

$p\in C^3$、$c$ は滑らかなので $r\in C^3$、$b\in C^1$ である。$rb$ と $frb$ は $C^1$。コンパクト多様体上のこの二関数は有界な一次微分を持つため、測地距離に関してLipschitzである。Gaussian核の一次絶対モーメントが $O(\sqrt\varepsilon)$ であることは[Gaussianモーメント](../MFL13/index.md#lem-mfl13-moments)と局所正規座標・指数尾部から従う。従って

$$
G_\varepsilon(rb)=rb+O(\sqrt\varepsilon),\qquad
G_\varepsilon(frb)=frb+O(\sqrt\varepsilon).
$$

ここで $G_\varepsilon1=1+O(\varepsilon)$ の寄与は上の $O(\sqrt\varepsilon)$ に吸収される。$G_\varepsilon(fr)$ と $G_\varepsilon r$ にはもう一度[核bias定理](../MFL13/index.md#thm-mfl13-bias)をそれぞれ適用して

$$
\begin{aligned}
N_\varepsilon
&:=G_\varepsilon(fpq_\varepsilon^{-\alpha})
=fr+\varepsilon\{\Delta_g(fr)-cfr-\alpha frb\}
+O(\varepsilon^{3/2}),\\
D_\varepsilon
&:=G_\varepsilon(pq_\varepsilon^{-\alpha})
=r+\varepsilon\{\Delta_gr-cr-\alpha rb\}
+O(\varepsilon^{3/2}).
\end{aligned}
$$

$r=p^{1-\alpha}$ は正でコンパクト性から正の下界を持つ。$N_\varepsilon/D_\varepsilon$ を一次まで通分すると

$$
\begin{aligned}
\frac{N_\varepsilon}{D_\varepsilon}
&=f+\varepsilon
\frac{\Delta_g(fr)-cfr-\alpha frb
-f(\Delta_gr-cr-\alpha rb)}r
+O(\varepsilon^{3/2})\\
&=f+\varepsilon\frac{\Delta_g(fr)-f\Delta_gr}{r}
+O(\varepsilon^{3/2}).
\end{aligned}
$$

曲率 $c$ と、$q_\varepsilon$ を補正したことによる $\alpha b$ はそれぞれ正確に相殺した。[Laplace–Beltramiの積の微分公式](../MFL13/index.md#prop-mfl13-row)を $r,f$ に用いると

$$
\Delta_g(fr)=r\Delta_gf+f\Delta_gr+
2\langle\nabla_gr,\nabla_gf\rangle_g.
$$

さらに $r=p^{1-\alpha}$ だから $\nabla_gr/r=(1-\alpha)\nabla_g\log p$。代入して所望の係数 $2(1-\alpha)$ を得る。一様な剰余を $\varepsilon$ で割ると $O(\sqrt\varepsilon)\to0$ となり、極限が存在する。$\square$
<!-- proof-end -->

**三つの補正の読み方。**

| 指数 | 極限generator | 密度の影響 |
|---|---|---|
| $\alpha=0$ | $\Delta_gf+2\langle\nabla_g\log p,\nabla_gf\rangle_g$ | 行正規化だけ。driftが2倍で残る |
| $\alpha=\tfrac12$ | $\Delta_gf+\langle\nabla_g\log p,\nabla_gf\rangle_g$ | driftが半分になる |
| $\alpha=1$ | $\Delta_gf$ | 一次極限のdriftが消える |

これは[MFL13の無補正結果](../MFL13/index.md#prop-mfl13-row)と $\alpha=0$ で一致する。$\alpha=1$ に関しても**この極限で**密度driftが消えるのであって、有限核幅で $p$ に依らないという等式ではない。

**円周で係数を手で見る。** 単位円周の角度を $\theta$ とする。角度だけの関数 $u(\theta)$ に対し、導関数と偏微分記法の対応は

$$
u'(\theta)=\frac{du}{d\theta}=\partial_\theta u,\qquad
u''(\theta)=\partial_{\theta\theta}u=\Delta_gu.
$$

さらに[円周でのLaplace–Beltrami作用素](../MFL12/index.md#prop-mfl12-circle)と同じ単位円周の計量では

$$
\langle\nabla_gu,\nabla_gv\rangle_g=u'v'.
$$

これらはすべて角度 $\theta$ に関する微分であり、核幅 $\varepsilon$ に関する微分ではない。

以下、$|a|<1$、$p(\theta)=(1+a\cos\theta)/(2\pi)$、$f(\theta)=\cos\theta$ を取る。$p$ は正で積分1、$f$ は滑らか。この記法で $\partial_\theta\log p=-a\sin\theta/(1+a\cos\theta)$ なので

$$
L_\alpha f(\theta)=-\cos\theta+
2(1-\alpha)\frac{a\sin^2\theta}{1+a\cos\theta},
\qquad
L_\alpha f(\pi/2)=2(1-\alpha)a.
$$

$a=0.5$ なら評価点 $\pi/2$ で $\alpha=0,1/2,1$ の値はそれぞれ $1,0.5,0$。一方密度が一様な $a=0$ なら、どの $\alpha$ でも $-\cos\theta$ だけになる。

## 4. 消えるdriftと、残る重み付き幾何

極限generatorを別の形へ書き直すと、どの重みのもとで平均が対称なのか見える。正の関数 $w_\alpha=p^{2(1-\alpha)}$ を重みと呼ぶ。一般に重み付き発散とは $w^{-1}\operatorname{div}_g(w\nabla_gf)$ のことである。これは $w$ が定数なら通常のLaplace–Beltrami作用素に戻る。

<a id="prop-mfl15-weighted"></a>

<!-- formal-statement-start -->
> **命題（重み付き発散形とエネルギー）**  
> 境界なし滑らかなコンパクトRiemann多様体 $(M,g)$、正の $p\in C^3(M)$、固定した $\alpha\in\mathbb R$ に対し、$w_\alpha=p^{2(1-\alpha)}$ とする。[極限generator](#thm-mfl15-generator)は任意の実数値 $f\in C^3(M)$ に対して
>
$$
L_\alpha f=w_\alpha^{-1}\operatorname{div}_g
(w_\alpha\nabla_gf)
$$
>
> と書ける。また任意の実数値 $u,v\in C^3(M)$ について
>
$$
\int_M uL_\alpha v\,w_\alpha\,dV_g
=-\int_M\langle\nabla_gu,\nabla_gv\rangle_gw_\alpha\,dV_g.
$$
>
> 特に $u=v$ では右辺は非正であり、$L_\alpha1=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

重みの微分で $2(1-\alpha)\nabla\log p$ が現れるかを確かめる。エネルギーは境界項のない発散定理に帰着する。有限核の定常分布と、この極限の重みを混同しない。

<!-- proof-start -->
### 証明

積の発散公式を適用すると

$$
\operatorname{div}_g(w_\alpha\nabla_gf)
=w_\alpha\Delta_gf+
\langle\nabla_gw_\alpha,\nabla_gf\rangle_g.
$$

$w_\alpha=p^{2(1-\alpha)}$ の連鎖律から $\nabla_gw_\alpha/w_\alpha=2(1-\alpha)\nabla_g\log p$ となるので、$w_\alpha$ で割ると[極限定理](#thm-mfl15-generator)の式と一致する。

$uL_\alpha v\,w_\alpha=u\,\operatorname{div}_g(w_\alpha\nabla_gv)$ であり、積の発散公式から

$$
u\operatorname{div}_g(w_\alpha\nabla_gv)
=\operatorname{div}_g(uw_\alpha\nabla_gv)
-w_\alpha\langle\nabla_gu,\nabla_gv\rangle_g.
$$

境界のないコンパクト多様体では[GA1のRiemann多様体の発散定理](../../../幾何系/GA/GA1/index.md#thm-ga1-divergence)により第一項の積分は0である。よって積分恒等式を得る。$u=v$ と置けば $-w_\alpha|\nabla_gu|_g^2\le0$ が点ごとに成立する。定数関数の勾配は0なので $L_\alpha1=0$。$\square$
<!-- proof-end -->

従って $\alpha=0$ の自然な重みは $p^2dV_g$、$\alpha=\tfrac12$ は $p\,dV_g$、$\alpha=1$ は $dV_g$ である。ここでの「自然」とは**極限の対称性を与える体積の重み**であり、有限核幅の定常分布と等しいという意味ではない。例えば $\alpha=1/2$ は観測密度 $p$ を対称重みに持つ一方、$\alpha=1$ は体積測度を対称重みに持つ。

## 5. 有限点群では対称重みと行確率を分ける

現実の点群には連続密度 $p$ をそのまま入力できない。そこで[MFL14のkernel標本平均](../MFL14/index.md#def-mfl14-empirical)のように、観測点 $X_1,\ldots,X_n$ の重みの平均で $q_\varepsilon$ を置き換える。$\alpha$ 補正を有限行列に行うなら、**先に両端補正し、最後に行を割る**という順序は変わらない。

<a id="def-mfl15-discrete"></a>

<!-- formal-statement-start -->
> **定義（alpha補正した有限Markov行列）**  
> 境界なしコンパクトRiemann多様体 $(M,g)$ の点 $x_1,\ldots,x_n$（$n\ge1$）、$\varepsilon>0$、$\alpha\in\mathbb R$ に対し、非負・対称のGaussian核 $K_{ij}=k_\varepsilon(x_i,x_j)$（特に $K_{ii}>0$）を用い、
>
$$
\widehat q_i=\frac1n\sum_{\ell=1}^nK_{i\ell},\qquad
W_{ij}=\frac{K_{ij}}{\widehat q_i^\alpha\widehat q_j^\alpha},
\qquad D_i=\sum_{j=1}^nW_{ij},\qquad
\widehat P_{ij}=\frac{W_{ij}}{D_i}
$$
>
> と定める。対角項 $K_{ii}>0$ から全ての $\widehat q_i,D_i$ は正で、$\widehat P_{ij}\ge0$、$\sum_j\widehat P_{ij}=1$。$n$ 次元の関数ベクトル $f=(f(x_1),\ldots,f(x_n))$ に対する差分generatorを $(\widehat P-I)f/\varepsilon$ と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl15-discrete -->
**直接例（二点の実際の核行列）。** **定義の確認**：同じ連結成分上の異なる二点 $x_1,x_2$ を選び、共通の対角核値を $c=k_\varepsilon(x_i,x_i)>0$、非対角を $cr$ とする。異なる二点の測地距離を $\delta>0$ とすれば $r=e^{-\delta^2/(4\varepsilon)}$ なので $0<r<1$ である。$\widehat q_1=\widehat q_2=c(1+r)/2>0$。従って

$$
W=\frac c{\{c(1+r)/2\}^{2\alpha}}
\begin{pmatrix}1&r\\r&1\end{pmatrix},\qquad
\widehat P=\frac1{1+r}\begin{pmatrix}1&r\\r&1\end{pmatrix}.
$$

各 $D_i$ は $c(1+r)/\{c(1+r)/2\}^{2\alpha}>0$。両行の和は $1$、全成分は非負で、定義の各条件を確認した。二点が対称だから $\alpha$ による差が消えるのであって、一般の非一様点群に通用する結論ではない。
<!-- definition-example-end -->

<a id="prop-mfl15-balance"></a>

<!-- formal-statement-start -->
> **命題（有限alpha補正行列の詳細釣合い）**  
> [有限Markov行列の定義](#def-mfl15-discrete)に従い、$S=\sum_{i=1}^nD_i$、$\pi_i=D_i/S$ とする。任意の $i,j$ について
>
$$
\pi_i\widehat P_{ij}=\pi_j\widehat P_{ji}=\frac{W_{ij}}S,
\qquad
\sum_i\pi_i\widehat P_{ij}=\pi_j
$$
>
> が成り立つ。さらに任意の実ベクトル $v$ について
>
$$
\sum_i\pi_i v_i\,\frac{((\widehat P-I)v)_i}{\varepsilon}
=-\frac1{2\varepsilon S}\sum_{i,j}W_{ij}(v_i-v_j)^2\le0.
$$
>
> これは有限行列の恒等式であって、任意の点群で $\pi_i\propto p(x_i)^{2(1-\alpha)}$ が厳密に成り立つという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$W$ は対称だが $\widehat P$ は行で割るため普通は対称でない。対称性を取り戻す重みが $D_i$ であり、対称な二重和を組にすると差の二乗になる。

<!-- proof-start -->
### 証明

$K_{ij}=K_{ji}\ge0$ と $\widehat q_i,\widehat q_j>0$ より $W_{ij}=W_{ji}\ge0$。さらに $W_{ii}>0$ なので $D_i>0$。そこで

$$
\pi_i\widehat P_{ij}
=\frac{D_i}{S}\frac{W_{ij}}{D_i}
=\frac{W_{ij}}S
=\frac{W_{ji}}S
=\pi_j\widehat P_{ji}.
$$

列和については $\sum_i\pi_i\widehat P_{ij}=S^{-1}\sum_iW_{ij}=D_j/S=\pi_j$。最後の左辺へ定義を代入すると

$$
\frac1{\varepsilon S}\sum_{i,j}W_{ij}v_i(v_j-v_i).
$$

$i,j$ を交換した同じ式と平均して

$$
\frac1{2\varepsilon S}\sum_{i,j}W_{ij}
\{v_i(v_j-v_i)+v_j(v_i-v_j)\}
=-\frac1{2\varepsilon S}\sum_{i,j}W_{ij}(v_i-v_j)^2
$$

を得る。$W_{ij}\ge0$ と $\varepsilon S>0$ より非正。$\square$
<!-- proof-end -->

有限模型で成立するこの恒等式は[連続の重み付きエネルギー](#prop-mfl15-weighted)に似ているが、有限点群を密にする際には標本誤差、重みの収束、関数の補間などが必要になる。**作用素の各固定関数への整合性と固有ベクトルの収束は別の主張**である。

## 6. $\alpha=1$ でも有限核幅では密度の情報が残る

一次の極限で $\alpha=1$ のdriftが消えるからといって、有限の $\varepsilon$ の値まで一様密度の値と同じだろうか。円周なら、密度のFourierモードで明示的に否定できる。

<a id="prop-mfl15-finite"></a>

<!-- formal-statement-start -->
> **命題（alpha=1の有限bandwidthの残差）**  
> 単位円周 $S^1$ 上で弧長測度 $d\theta$、密度 $p_a(\theta)=(1+a\cos\theta)/(2\pi)$（$0<a<1$）、関数 $f(\theta)=\cos\theta$、内在Gaussian核 $k_\varepsilon$ を取る。任意の有限な $\varepsilon>0$ について[alpha補正作用素](#def-mfl15-alpha)の $\alpha=1$ は
>
$$
P_\varepsilon^{(1)}f(\pi/2)>0,
$$
>
> 一方、一様密度 $p_0=1/(2\pi)$ のもとでは同じ点の値は $0$ である。しかし両者のgeneratorの極限値は $L_1f(\pi/2)=0$ で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

核の畳み込みは円周上で定数モードと $\cos\theta$ モードをそれぞれ定数倍する。補正後にも僅かに非一様な重みが残り、正負の $\cos\theta$ の寄与が打ち消されなくなる。

<!-- proof-start -->
### 証明

円周上の角度差の短い弧を $s\in[-\pi,\pi]$ とする。正の定数

$$
C_0=\int_{-\pi}^{\pi}k_\varepsilon(0,s)\,ds,\qquad
C_1=\int_{-\pi}^{\pi}k_\varepsilon(0,s)\cos s\,ds
$$

を考える。$k_\varepsilon(0,s)>0$、$\cos s\le1$ で等号は測度零の点のみなので $C_1<C_0$。また $C_1>0$ は、積分を $[0,\pi]$ で半分ずつ対にし、$0\le s\le\pi/2$ の正の $\cos s$ に掛かる $k_\varepsilon(0,s)-k_\varepsilon(0,\pi-s)>0$ から従う。従って $0<C_1<C_0$。

角度差の畳み込みと $\cos(\theta+s)=\cos\theta\cos s-\sin\theta\sin s$、偶核に対する奇関数積分の消失から

$$
q_\varepsilon(\theta)=G_\varepsilon p_a(\theta)
=\frac{C_0+aC_1\cos\theta}{2\pi}.
$$

定義の行比では $q_\varepsilon(x)^{-1}$ が消えるので、実効密度は

$$
h(\theta)=\frac{p_a(\theta)}{q_\varepsilon(\theta)}
=\frac{1+a\cos\theta}{C_0+aC_1\cos\theta}.
$$

$z=\cos\theta$ の関数として $dh/dz=a(C_0-C_1)/(C_0+aC_1z)^2>0$。評価点 $x=\pi/2$ に対し、核の重みは $\theta=\pi/2\pm t$ で等しく、その二点の $\cos\theta$ はそれぞれ $\mp\sin t$。$0<t<\pi$ では $\sin t>0$ であり、正の値の方に大きい $h$ が掛かるので二点の分子の和が正になる。これらの対が円周全体を（端点を除き）覆うため、分子 $G_\varepsilon(fh)(\pi/2)>0$。分母 $G_\varepsilon h(\pi/2)>0$ より結論。

$a=0$ なら $h$ は定数であり、偶核と $\cos(\pi/2+t)=-\sin t$ の奇性から分子は0。[極限定理](#thm-mfl15-generator)では $\alpha=1$ のdrift係数が0、また $\Delta_g\cos(\pi/2)=0$ なので、両者のgeneratorは0に収束する。$\square$
<!-- proof-end -->

この結果は「有限幅で密度補正が無意味」を示すものでもない。$\alpha=1$ は **一次の密度driftを打ち消す**。残る有限幅のずれには高次biasや標本誤差があり、$\varepsilon$ と $n$ をどう選ぶかが重要である。[MFL14の同時極限の十分条件](../MFL14/index.md#cor-mfl14-generator)は無補正の推定量についての保証なので、それを証明なしで補正後の統計量へ流用しない。

## 7. Python再現実験：円周で理論と有限点群を並べる

[density_generator_lab.py](density_generator_lab.py) はPython標準ライブラリだけで動く。単位円周で $p_a(\theta)=(1+a\cos\theta)/(2\pi)$ に従う標本を拒否法で発生させる。連続核の密度平均は前節の二つの係数を決定論的な中点積分で求め、連続作用素も別の中点積分で計算する。

標本作用素は実際に $\widehat q_i$ と両端補正 $W_{ij}$ を構成する。関数は $f(\theta)=\cos\theta$、評価角は $\pi/2$ なので、[極限定理](#thm-mfl15-generator)の正解は

$$
L_\alpha f(\pi/2)=2(1-\alpha)a
$$

である。実験値からの差を、この値と比べる。

- $\alpha$ 比較：同じ密度、同じ核幅で $0,1/2,1$ のgeneratorを並べる。
- 幅比較：$\varepsilon$ を減らして理論極限へのbiasを調べる。点数を固定すると有限標本誤差は増えることがある。
- 標本比較：同じ乱数の初期値で $n$ を変え、連続の数値積分と標本値の差を確かめる。
- $a=0$：一様密度では $\alpha$ の違いが母積分で消えることを検査する。

```python-file-lab
# lab-id: MFL15-DENSITY-GENERATOR-FILE
# lab-title: 密度補正・円周kernel generator
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL15/density_generator_lab.py
# timeout-ms: 30000
# lab-preset: alpha比較・非一様密度 | --mode alpha --amplitude 0.6 --epsilon 0.06 --n 240 --seed 2026
# lab-preset: alpha比較・一様密度 | --mode alpha --amplitude 0 --epsilon 0.06 --n 240 --seed 2026
# lab-preset: 帯域幅の比較 | --mode bandwidth --amplitude 0.6 --alpha 1 --epsilon 0.06 --n 300 --seed 2026
# lab-preset: 標本数の比較 | --mode sample --amplitude 0.6 --alpha 0.5 --epsilon 0.06 --n 160 --seed 2026
```

出力の数値積分には離散化誤差が、標本計算には標本誤差がある。$n$ を固定して $\varepsilon$ を非常に小さくすると、自己点が強い重みを持つなど不安定になり得る。数値曲線は一般多様体や全固有空間の収束証明ではない。ローカルでも `python density_generator_lab.py --self-test` で定数保存・一様密度・有限Markov詳細釣合い・二重和のエネルギー恒等式を検算できる。

## 8. 演習：補正の意味・極限・有限模型を結ぶ

<a id="ex-mfl15-a01"></a>

### MFL15-A01 一様密度での相殺

- Level: A
- 問題: コンパクト多様体で $p$ が一定かつ $q_\varepsilon=G_\varepsilon p$ が一定であるとする。[alpha密度補正と連続Markov作用素](#def-mfl15-alpha)の定義から $P_\varepsilon^{(\alpha)}$ が $\alpha$ に依らないことを示せ。$G_\varepsilon1$ が一定という仮定が必要な理由も述べよ。

**詳細解答**。$q_\varepsilon=q_0>0$ が一定なら $k_\varepsilon^{(\alpha)}=q_0^{-2\alpha}k_\varepsilon$、$d_\varepsilon^{(\alpha)}=q_0^{-2\alpha}\int k_\varepsilon p=q_0^{1-2\alpha}$ である。従って分子と分母の共通因子が相殺して $P_\varepsilon^{(\alpha)}f=G_\varepsilon(pf)/q_0$。$p$ が一定でも $G_\varepsilon1$ が位置で変わる一般の多様体では $q_\varepsilon=pG_\varepsilon1$ が一定とは限らず、同じ約分は使えない。円周では回転対称性が一定性を保証する。

<a id="ex-mfl15-a02"></a>

### MFL15-A02 補正係数の一次展開

- Level: A
- 問題: 本章のコンパクト多様体 $M$ 上で $p\in C^3(M)$、$p\ge c>0$、$A\in C(M)$ とし、$q_\varepsilon=p+\varepsilon A+O(\varepsilon^{3/2})$ が一様に成立するとする。固定した $\alpha$ について $q_\varepsilon^{-\alpha}$ を一次まで展開し、必要な分母下界を示せ。

**詳細解答**。$|q_\varepsilon-p|\le C\varepsilon$ だから十分小さい $\varepsilon$ では $q_\varepsilon\ge p-C\varepsilon\ge c/2$。$t^{-\alpha}$ は $[c/2,\max p+1]$ 上で二階微分が有界なので[RA3のTaylorの定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)を展開点 $t=p(x)$、次数1、評価点 $t=q_\varepsilon(x)$ に適用する。すると $q_\varepsilon^{-\alpha}=p^{-\alpha}-\alpha p^{-\alpha-1}(q_\varepsilon-p)+O((q_\varepsilon-p)^2)$。$q_\varepsilon-p$ を代入し、$\varepsilon^2=O(\varepsilon^{3/2})$（$0<\varepsilon\le1$）を使えば $p^{-\alpha}[1-\alpha\varepsilon A/p]+O(\varepsilon^{3/2})$。

<a id="ex-mfl15-a03"></a>

### MFL15-A03 円周の三つのdrift

- Level: A
- 問題: 単位円周で $p=(1+a\cos\theta)/(2\pi)$、$|a|<1$、$f=\cos\theta$ とする。$\theta=\pi/2$ における $L_0f,L_{1/2}f,L_1f$ を求め、$a=0$ の場合と比べよ。

**詳細解答**。$f'=-\sin\theta$、$f''=-\cos\theta$、$(\log p)'=-a\sin\theta/(1+a\cos\theta)$。[$L_\alpha$ の式](#thm-mfl15-generator)へ代入すると $L_\alpha f=-\cos\theta+2(1-\alpha)a\sin^2\theta/(1+a\cos\theta)$。$\theta=\pi/2$ で $\cos\theta=0$、$\sin^2\theta=1$ だから、それぞれ $2a,a,0$。$a=0$ は全て0で、非一様密度に由来するdriftがない。

<a id="ex-mfl15-a04"></a>

### MFL15-A04 二頂点の定常分布

- Level: A
- 問題: [有限補正の定義](#def-mfl15-discrete)で $K=c\begin{pmatrix}1&r\\r&1\end{pmatrix}$（$c>0,0<r<1$）を使う。任意の $\alpha$ で $\widehat P$ と $\pi$ を求めよ。

**詳細解答**。各行の平均は $\widehat q_i=c(1+r)/2$ なので $W=c^{1-2\alpha}((1+r)/2)^{-2\alpha}\begin{pmatrix}1&r\\r&1\end{pmatrix}$。$D_1=D_2=c^{1-2\alpha}((1+r)/2)^{-2\alpha}(1+r)$。従って $\widehat P=(1+r)^{-1}\begin{pmatrix}1&r\\r&1\end{pmatrix}$、[$\pi_i=D_i/\sum D$](#prop-mfl15-balance)から $\pi=(1/2,1/2)$。

<a id="ex-mfl15-b01"></a>

### MFL15-B01 ratioで何が消えるか

- Level: B
- 問題: 本章の境界なしコンパクト多様体 $M$ で $p,f\in C^3(M)$、$p\ge p_{\min}>0$ とする。$c=\operatorname{Scal}/3$、$A=\Delta_gp-cp$ とし、$u\in C^3(M)$ に対して $G_\varepsilon u=u+\varepsilon(\Delta_gu-cu)+O(\varepsilon^{3/2})$、$q_\varepsilon=p+\varepsilon A+O(\varepsilon^{3/2})$ が一様に成り立つとする。[MFL13のkernel bias定理](../MFL13/index.md#thm-mfl13-bias)と[補正作用素](#def-mfl15-alpha)において $r=p^{1-\alpha}$、$b=A/p$ を使い、$c$ と $b$ が消えるまでの分子・分母の一次展開を示せ。

**詳細解答**。[A02のTaylor展開](#ex-mfl15-a02)により $pq_\varepsilon^{-\alpha}=r-\alpha\varepsilon rb+O(\varepsilon^{3/2})$。$G_\varepsilon$ の核の総量は有界、$rb,frb$ は $C^1$ なので $G_\varepsilon(rb)=rb+O(\sqrt\varepsilon)$ とし、$N=fr+\varepsilon[\Delta_g(fr)-cfr-\alpha frb]+O(\varepsilon^{3/2})$、$D=r+\varepsilon[\Delta_gr-cr-\alpha rb]+O(\varepsilon^{3/2})$。$r>0$ の下界により $N/D=f+\varepsilon\{[\Delta_g(fr)-f\Delta_gr]/r\}+O(\varepsilon^{3/2})$。$\{-cfr-f(-cr)\}=0$ と $\{-\alpha frb-f(-\alpha rb)\}=0$ が別々に成立する。[積の公式](../MFL13/index.md#prop-mfl13-row)から括弧は $\Delta_gf+2\nabla_g\log r\cdot\nabla_gf=\Delta_gf+2(1-\alpha)\nabla_g\log p\cdot\nabla_gf$。

<a id="ex-mfl15-b02"></a>

### MFL15-B02 重み付き対称性を検証する

- Level: B
- 問題: 境界なしコンパクトRiemann多様体 $M$ 上で $p\in C^3(M)$ は正、$u,v\in C^3(M)$ は実数値、$\alpha\in\mathbb R$ は固定とし、$w=p^{2(1-\alpha)}$ とする。$\int_M uL_\alpha v\,w\,dV_g=\int_M vL_\alpha u\,w\,dV_g$ と $\int_MuL_\alpha u\,w\,dV_g\le0$ を示せ。$w$ の指数が一つ違うとどこで困るかも述べよ。

**詳細解答**。[重み付き発散形](#prop-mfl15-weighted)に $v$ を代入すると、$wL_\alpha v=\operatorname{div}(w\nabla v)$ となる。積の発散公式と[GA1のRiemann多様体の発散定理](../../../幾何系/GA/GA1/index.md#thm-ga1-divergence)を適用する。境界が空だから

$$
\int_MuL_\alpha v\,w\,dV_g
=-\int_Mw\langle\nabla_gu,\nabla_gv\rangle_g\,dV_g.
$$

内積の対称性から $u,v$ を交換しても等しく、$u=v$ なら積分は $-\int_Mw|\nabla_gu|_g^2\,dV_g\le0$。指数を $1-\alpha$ に変えると

$$
\nabla_g\log(p^{1-\alpha})=(1-\alpha)\nabla_g\log p
$$

となり、[極限定理](#thm-mfl15-generator)の係数 $2(1-\alpha)$ を再現できない。

<a id="ex-mfl15-b03"></a>

### MFL15-B03 finite bandwidthでの残留

- Level: B
- 問題: 単位円周の $p_a=(1+a\cos\theta)/(2\pi)$（$0<a<1$）に対して $q_\varepsilon=(C_0+aC_1\cos\theta)/(2\pi)$、$0<C_1<C_0$ とする。$h=p_a/q_\varepsilon$ が $\cos\theta$ の増加関数であることを示し、$\alpha=1$ が有限 $\varepsilon$ で密度を完全には取り除かない理由を述べよ。

**詳細解答**。$z=\cos\theta$ として $h(z)=(1+az)/(C_0+aC_1z)$。分母は $q_\varepsilon>0$ なので商の微分ができ、$h'(z)=a(C_0-C_1)/(C_0+aC_1z)^2>0$。従って $h$ は定数でなく、補正後の核平均の重み $k_\varepsilon(x,y)h(y)$ は一様密度の重みと同じでない。特に[$\pi/2$ での正の平均](#prop-mfl15-finite)は、同じ点で一様密度なら0となるので直接の反例である。

<a id="ex-mfl15-b04"></a>

### MFL15-B04 有限行列のエネルギー

- Level: B
- 問題: 成分が非負の対称行列 $W=(W_{ij})$ で $D_i=\sum_jW_{ij}>0$ とし、$S=\sum_iD_i$、$P_{ij}=W_{ij}/D_i$、$\pi_i=D_i/S$ とする。$v_i$ の差の二乗で $\sum_i\pi_i v_i(Pv-v)_i$ を表せ。

**詳細解答**。代入すると $\sum_i\pi_i v_i(Pv-v)_i=S^{-1}\sum_{i,j}W_{ij}v_i(v_j-v_i)$。対称性 $W_{ij}=W_{ji}$ で同じ和を添字交換して $S^{-1}\sum_{i,j}W_{ij}v_j(v_i-v_j)$ とも書ける。二式を足して2で割ると $-(2S)^{-1}\sum_{i,j}W_{ij}(v_i-v_j)^2$。各項が非負で $S>0$ だから値は非正。generatorの式ならさらに $\varepsilon$ で割る。

<a id="ex-mfl15-c01"></a>

### MFL15-C01 非一様円周から有限点群まで

- Level: C
- 問題: 単位円周で $p_a=(1+a\cos\theta)/(2\pi)$（$0<a<1$）、$f(\theta)=\cos\theta$ とする。次の三つを順に証明せよ。

  1. $\alpha=0,1/2,1$ の極限generatorを導け。
  2. $\alpha=1$ でも有限 $\varepsilon$ の $\pi/2$ で一様密度と同じ値になるとは限らないことを、$q_\varepsilon$ の二つの係数から示せ。
  3. 独立標本から作る $\widehat P$ の行和と定常分布を示し、1の結果だけでは固有ベクトル収束を結論できない理由を述べよ。

**詳細解答**。(1) $f'=-\sin\theta$、$f''=-\cos\theta$、$(\log p_a)'=-a\sin\theta/(1+a\cos\theta)$ を確認する。[$L_\alpha$ の定理](#thm-mfl15-generator)へ代入して

$$
L_\alpha f=-\cos\theta+
\frac{2(1-\alpha)a\sin^2\theta}{1+a\cos\theta}.
$$

従って順に係数は $2,1,0$、$\theta=\pi/2$ で値は $2a,a,0$ である。(2) $k_\varepsilon$ は円周の角度差だけで決まる偶核なので、畳み込みで定数と余弦の成分を分けると $q_\varepsilon=(C_0+aC_1\cos\theta)/(2\pi)$。$C_0-C_1=\int k_\varepsilon(0,s)(1-\cos s)\,ds>0$、また正の核の単調性から $C_1>0$。すると $h=p_a/q_\varepsilon$ の $\cos\theta$ に関する微分は $a(C_0-C_1)/(C_0+aC_1\cos\theta)^2>0$。[$\pi/2$ の対称な二点の比較](#prop-mfl15-finite)から $P_\varepsilon^{(1)}f(\pi/2)>0$、一様密度なら対称性で0。一方 $\varepsilon\downarrow0$ のgeneratorは(1)の0へ収束するので矛盾しない。

(3) 任意の有限標本では $\widehat q_i>0$、$W_{ij}=W_{ji}>0$、$D_i=\sum_jW_{ij}>0$。よって $\sum_j\widehat P_{ij}=D_i/D_i=1$、[$\pi_i=D_i/\sum_\ell D_\ell$](#prop-mfl15-balance) に対して $\sum_i\pi_i\widehat P_{ij}=(\sum_iW_{ij})/\sum_\ell D_\ell=D_j/\sum_\ell D_\ell=\pi_j$。ただし(1)は固定した滑らかな関数の**母積分の一次極限**であり、ランダムな行列の固有空間を共通の関数空間に写す方法、固有値ギャップ、作用素・エネルギーの一様制御を与えない。有限標本の誤差には[MFL14の分散・集中](../MFL14/index.md#cor-mfl14-generator)のような別の証明が必要となる。

## 9. まとめ

- 行正規化だけの $\alpha=0$ では密度driftが残り、$\alpha=1$ の**極限**では消える。間の値も係数 $2(1-\alpha)$ で確かめられる。
- 極限の対称重みは $p^{2(1-\alpha)}dV_g$。有限行列の正確な定常分布は $D_i/\sum_jD_j$ であり、両者を同じ式と呼ばない。
- $\alpha=1$ でも有限の核幅には密度依存が残り、有限標本にはさらに確率誤差がある。

次章MFL16では、有限Markov作用素を繰り返した時間、固有分解、diffusion distanceと熱の幾何を区別して組み立てる。
