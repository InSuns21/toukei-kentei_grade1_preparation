# LORG20 滑らかな時空分割

<!-- definition-example-audit: strict -->

## 1. 連続な時計で切れた時空を、なぜもう一度切るのか

[LORG19の位相的分割定理](../LORG19/index.md#thm-lorg19-topological-splitting)では、[Cauchy時間関数の各レベル](../LORG19/index.md#prop-lorg19-level-cauchy)を使って、時空を位相空間として $\mathbb R\times\Sigma$ と表しました。しかし連続なレベル集合に接ベクトルが定義できるとは限りません。例えば、面に垂直なベクトルで時間変化を測り、面上の長さと分離するには、少なくとも面と時計の滑らかさが必要です。

今回ほしいのは、**すべての非延長因果曲線を一度だけ横切り、どの点でも空間的な滑らかな面を作る時計**です。これが存在すれば、面の正定値計量と時間に沿う単位法線を分け、後続の初期値問題で何を「時刻一定」と呼ぶかを明確にできます。

以下、$(M,g)$ は境界のない連結Hausdorff・第二可算の滑らかな時間向き付きLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ です。[未来因果曲線](../LORG3/index.md#def-lorg3-causal-curve)は停留片を除いた局所Lipschitz曲線を許し、[両側非延長性](../LORG13/index.md#def-lorg13-inextendible)は時空内で因果曲線として継ぎ足せないことを意味します。$g$ による勾配 $\nabla^g f$ は $g(\nabla^g f,V)=df(V)$ で定義します。$g$ は非退化なのでこのベクトルは一意です。

## 2. 滑らかなCauchy temporal functionとは

[LORG10のtemporal function](../LORG10/index.md#def-lorg10-time-function)は、滑らかな実関数で、勾配が各点で**過去向き時間的**であるものです。これは未来因果曲線に沿う厳密増加を保証します。一方、[LORG19のCauchy時間関数](../LORG19/index.md#def-lorg19-cauchy-time)は、各非延長因果曲線の上で値域が $\mathbb R$ 全体となることまで要求します。これらを同時に満たすものを調べます。

<a id="def-lorg20-cauchy-temporal"></a>

<!-- formal-statement-start -->
> **定義（Cauchy temporal function）**  
> 時間向き付き滑らかなLorentz時空 $(M,g)$ 上の滑らかな関数 $T:M\to\mathbb R$ を **Cauchy temporal function**（滑らかなCauchy時間関数）と呼ぶのは、次をともに満たすときである。
>
> 1. すべての $p\in M$ で $\nabla^gT(p)$ が過去向き時間的である。
> 2. 任意の両側非延長未来因果曲線 $\gamma:I\to M$ について、$(T\circ\gamma)(I)=\mathbb R$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg20-cauchy-temporal -->
**定義の確認**。Minkowski平面 $(\mathbb R^{1,1},g=-dt^2+dx^2)$ の $T(t,x)=t$ を取ります。$dT=dt$ なので、勾配の定義に $g^{tt}=-1$ を代入して $\nabla^gT=-\partial_t$ です。そのLorentzノルムは $g(\nabla^gT,\nabla^gT)=-1<0$、時刻成分は負なので過去時間的です。条件1を確認しました。

次に未来因果速度は $t'\ge|x'|$ を満たします。よって曲線上の $T$ は厳密増加し、時刻で表示した二点について

$$
|x(t_2)-x(t_1)|\le t_2-t_1
$$

です。仮に未来非延長曲線の時刻が有限値 $b$ に近づけば $x(t)$ はCauchy列の条件を満たし、有限極限 $a$ を持ちます。曲線は時空内の $(b,a)$ から延長できて矛盾します。過去端も同じ評価で扱え、時刻の値域は全実数です。[全時刻通過補題](../LORG15/index.md#lem-lorg15-full-time)と同じ機構により条件2も確認できました。
<!-- definition-example-end -->

単にtemporalな例として[LORG19の反例](../LORG19/index.md#prop-lorg19-temporal-not-cauchy)の $T=t-\sqrt{1+x^2}$ があります。勾配は時間的でも、未来光線上で有限値に収束します。局所的な勾配条件と大域的な全射条件は混同できません。

## 3. 勾配が時間的なら、時刻面はなぜ空間的か

まず滑らかな時計を**すでに得た場合**に何が自力で証明できるかを整理します。$T$ の値 $c$ が正則値であれば、レベル $\Sigma_c=T^{-1}(c)$ の接空間は $\ker dT$ です。これは「時刻を変えない接ベクトル」の集合で、$g(\nabla^gT,V)=dT(V)$ から勾配への直交補空間です。

<a id="prop-lorg20-spacelike-levels"></a>

<!-- formal-statement-start -->
> **命題（Cauchy temporal functionのレベル）**  
> 滑らかな時間向き付きLorentz時空 $(M,g)$ にCauchy temporal function $T:M\to\mathbb R$ があるとする。任意の $c\in\mathbb R$ に対し、レベル集合

$
\Sigma_c=T^{-1}(c)
$

> は非空で閉な滑らかな埋め込み超曲面である。その接空間への誘導計量は正定値であり、$\Sigma_c$ はCauchy面である。
<!-- formal-statement-end -->

### 証明の見取り図

時間的勾配は零になりません。従って[正則値定理](../../GEO/GEO3/index.md#thm-geo3-regular-value)で滑らかな面を作り、その接空間を時間的勾配の直交補空間と同定します。Lorentz空間で時間的方向に直交する部分空間が正定値になることと、非延長曲線上の全射・単調性を別々に使います。

<!-- proof-start -->
### 証明

$g(\nabla^gT,\nabla^gT)<0$ なので $\nabla^gT\neq0$ です。非退化な $g$ により、もし $dT_p=0$ なら $\nabla^gT(p)=0$ となるので、$dT_p\neq0$ です。したがってすべての $c$ は正則値であり、[正則値定理](../../GEO/GEO3/index.md#thm-geo3-regular-value)から $\Sigma_c$ は滑らかな余次元1の埋め込み部分多様体で、

$$
T_p\Sigma_c=\ker dT_p
=\{V\in T_pM:g_p(\nabla^gT,V)=0\}
$$

となります。[時間的ベクトルの直交補空間が正定値になる補題](../LORG1/index.md#lem-lorg1-timelike-orthogonal)を適用します。時間的ベクトル $\nabla^gT(p)$ を第一基底ベクトルに取るLorentz直交基底では $g_p$ の符号は $(-,+,\ldots,+)$ であり、第一成分が零の非零ベクトルは $g_p(V,V)>0$ を満たします。従って $g|_{T\Sigma_c}$ は正定値です。

また、$T$ は連続なので $\Sigma_c$ は閉です。[Cauchy時間関数のレベル命題](../LORG19/index.md#prop-lorg19-level-cauchy)を、今回の定義の第二条件とtemporalな関数の単調性に適用すると、すべての非延長未来因果曲線が各 $\Sigma_c$ とちょうど一度交差し、特に $\Sigma_c$ は非空です。従って[Cauchy面の定義](../LORG15/index.md#def-lorg15-cauchy)を満たします。$\square$
<!-- proof-end -->

この命題は**時計が存在すれば**言えることです。次の存在定理の証明と混ぜて、滑らかさを連続性から当然に得たことにはしません。

## 4. 大域双曲性から滑らかな時計を得る

連続Cauchy時計を得た[LORG19の存在定理](../LORG19/index.md#thm-lorg19-existence)では、滑らかな勾配はまだ使えませんでした。大域双曲性があれば、そのギャップを実際に埋められるというのが重要な存在定理です。

<a id="thm-lorg20-bernal-sanchez"></a>

<!-- formal-statement-start -->
> **定理（Bernal–SánchezのCauchy temporal function存在定理）**  
> 境界のない連結Hausdorff・第二可算の滑らかな時間向き付きLorentz時空 $(M,g)$ が大域双曲的なら、$M$ 上にCauchy temporal function $T:M\to\mathbb R$ が存在する。従って全実数 $c$ に対するレベル $T^{-1}(c)$ は滑らかな空間的Cauchy超曲面である。
<!-- formal-statement-end -->

**証明範囲**。ここは Bernal–Sánchez（2005）の存在定理を使用します。一般時空に対する時間的勾配を持つ滑らかな関数の構成には、非コンパクトなCauchy面を覆う局所関数の組立てと、その導関数・台の制御が必要です。本講ではこの局所構成の完全証明を再掲しません。原論文は [Bernal–Sánchez, *Smoothness of time functions and the metric splitting of globally hyperbolic spacetimes*](https://arxiv.org/abs/gr-qc/0401112) の第2・3節です。以下で、原論文の**temporal step function**がなぜ使えるかと、そこからの大域組立て・分割公式を示します。この外部定理が保証するのは単なる滑らかな時間関数ではなく、各レベルがCauchyである時計の存在です。

### 局所構成が必要になる場所

[LORG19の連続Cauchy時計](../LORG19/index.md#thm-lorg19-existence)を $\tau_0$ と記し、時刻帯 $\tau_0^{-1}([k,k+1])$ を考えます。局所的に作った滑らかな関数を足す際、勾配の時間向きが不揃いだと打ち消し合い、空間的または零の勾配になり得ます。そこで、原論文は勾配が**過去時間的か零**で、帯全体では時間的になるように設計した段差関数を組み立てます。

その構成で得る $s_k:M\to[-1,1]$（$k\in\mathbb Z$）は、例えば次の性質を同時に満たすように取れます。

1. $\tau_0\le k-1$ で $s_k=-1$、$\tau_0\ge k+2$ で $s_k=1$ である。
2. $\nabla^g s_k$ は各点で零または過去時間的であり、帯 $\tau_0^{-1}([k,k+1])$ では必ず過去時間的である。

一見すると単なる「なめらかな段差」ですが、**過去時間的勾配を非コンパクトな帯の全点で保証する**部分が難所です。普通の平滑化や任意の分割関数による重み付けでは、$\nabla(\chi s)=\chi\nabla s+s\nabla\chi$ の第二項が錐から外れるので不十分です。ここを原論文の外部構成として明示します。

<a id="prop-lorg20-step-sum"></a>

<!-- formal-statement-start -->
> **命題（temporal stepの大域合成）**  
> 連続Cauchy時間関数 $\tau_0$ と上記二条件を満たす滑らかな関数族 $(s_k)_{k\in\mathbb Z}$ が与えられたとする。基準点 $p_0\in M$ を固定したとき、
>
$
T(p)=\sum_{k\in\mathbb Z}\bigl(s_k(p)-s_k(p_0)\bigr)
$

> は滑らかなCauchy temporal functionである。
<!-- formal-statement-end -->

### 証明の見取り図

各コンパクト集合で時刻 $\tau_0$ が有界なので、基準点との差を引いた無限和は局所有限です。勾配の和は過去時間的錐にとどまります。さらに、無限に続く段差を越えるたびに関数値が増えるため、非延長因果曲線に沿って全実数を走ります。

<!-- proof-start -->
### 証明

$p\in M$ の小さな相対コンパクト近傍 $U$ を選びます。$\tau_0(\overline U)$ と $\tau_0(p_0)$ は有限区間 $[a,b]$ に含まれるように取れます。$k>b+1$ ではすべての $q\in U\cup\{p_0\}$ が $\tau_0(q)\le k-1$ を満たすので $s_k(q)=-1$ です。$k<a-2$ では逆に $s_k(q)=1$ です。従って差の和で零でないのは有限個の $k$ だけであり、$T$ は滑らかで項別微分できます。

任意の $p$ について整数 $k$ を $\tau_0(p)\in[k,k+1]$ となるよう選ぶと、少なくとも $\nabla^g s_k(p)$ は過去時間的です。それ以外の各 $\nabla^g s_j(p)$ は零または過去時間的です。過去時間的錐の凸性は[LORG1の未来錐の凸性](../LORG1/index.md#prop-lorg1-cone-convex)を時間反転したものなので、有限和

$$
\nabla^gT(p)=\sum_j\nabla^g s_j(p)
$$

も過去時間的です。よってtemporal functionです。

最後に値域を調べます。$p_0$ の $\tau_0$ 値を $r$ とし、$N>r+3$ を大きな正整数とします。$\tau_0(q)\ge N+2$ なら、$r+2<k\le N$ の各整数に対して

$$
s_k(q)-s_k(p_0)=1-(-1)=2
$$

です。$k\le r-2$ では両方が $1$、$k>r+2$ では $s_k(p_0)=-1$ なのでそれらの差は非負です。残る $r-2<k\le r+2$ は有限個で、各差は $-2$ 以上です。従って $T(q)$ は $N$ に比例して下から発散します。同様に $\tau_0(q)\le-N-2$ とすれば $k$ を負の方向へ数えて $T(q)\to-\infty$ が従います。

[Cauchy時間関数の定義](../LORG19/index.md#def-lorg19-cauchy-time)により、任意の両側非延長未来因果曲線上で $\tau_0$ は過去から未来へ $-\infty$ から $+\infty$ まで増加します。よって上の発散はその曲線上でも成り立ち、連続性と厳密単調性により $T\circ\gamma$ の値域は $\mathbb R$ です。$\square$
<!-- proof-end -->

ここで一般存在定理を仮定したのは**各 $s_k$ を因果的勾配を保ったまま作れることだけ**です。その後の局所有限和、錐の凸性、Cauchy性はこの命題で再現できます。

## 5. 全時刻を横切る流れから滑らかな直交分割へ

いまCauchy temporal function $T$ を固定します。各 $\Sigma_c$ は[レベル命題](#prop-lorg20-spacelike-levels)により滑らかな空間的Cauchy面です。しかし単に $\mathbb R\times\Sigma_0$ を微分同相で表せるだけでは、計量の時間空間交差項が消えるとは限りません。**勾配に平行な流れ**を使って交差項を零にします。

最初に

$$
X=\frac{\nabla^gT}{g(\nabla^gT,\nabla^gT)}
$$

と置きます。分母は負なので $X$ は未来時間的で、

$$
dT(X)=g(\nabla^gT,X)=1
$$

です。従って $X$ は時計を単位の速さで進め、$\ker dT$ に直交します。ただし任意の非コンパクト多様体上のベクトル場が全実数の流れを持つとは限らないので、ここで完備性を確認する必要があります。

[LORG14の補助Riemann計量](../LORG14/index.md#def-lorg14-h-arclength)として完備な $h$ を選び、$X$ を正の関数倍で縮めて

$$
Y=\frac{X}{1+|X|_h},\qquad |Y|_h<1
$$

とします。$Y$ は $X$ と同じ未来向きで、$dT(Y)>0$ です。有限の流れパラメータ長の間の $h$-移動距離はその長さ以下だから、[Hopf–Rinow定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)によるコンパクト閉球内で局所解を延長でき、$Y$ の流れ $\Phi_s$ は全実数 $s$ で存在します。流線は未来時間的かつ両側非延長です。非延長性は[LORG19の流れの議論](../LORG19/index.md#thm-lorg19-topological-splitting)と同じく、非零な滑らかな場の流線が無限パラメータ端で時空内の一点に収束できないことから従います。

<a id="thm-lorg20-orthogonal-splitting"></a>

<!-- formal-statement-start -->
> **定理（滑らかな直交時空分割）**  
> 境界のない連結Hausdorff・第二可算の滑らかな時間向き付き大域双曲Lorentz時空 $(M,g)$ には、滑らかな空間的Cauchy超曲面 $\Sigma$ と微分同相
>
$
> F:\mathbb R\times\Sigma\longrightarrow M
$
>
> が存在し、$T(F(c,x))=c$ を満たすCauchy temporal function $T$ に対し、引戻し計量が
>
$
> F^*g=-\beta(c,x)\,dc^2+h_c
$
>
> と書ける。$\beta>0$ は滑らかな関数、$h_c$ は各 $\{c\}\times\Sigma$ 上の正定値な滑らかな計量で、時間方向と空間方向の交差項は零である。
<!-- formal-statement-end -->

### 証明の見取り図

[存在定理](#thm-lorg20-bernal-sanchez)から時計を取り、完全な $Y$ の流線を各レベルと一意交差させます。$Y$ のパラメータを $T=c$ へ取り替えると、得られる時間方向ベクトルは $X$ になり、$g(X,V)=0$ が交差項を消します。

<!-- proof-start -->
### 証明

[存在定理](#thm-lorg20-bernal-sanchez)により $T$ を選び、$\Sigma=T^{-1}(0)$ とします。上で構成した $Y$ の各流線は両側非延長未来時間的曲線なので、[Cauchy temporal functionの定義](#def-lorg20-cauchy-temporal)によりすべてのレベルと一回ずつ交わります。$p\in\Sigma$ からの流線上で $T(\Phi_s(p))=c$ となる唯一の $s=s(c,p)$ を定め、

$$
F(c,p)=\Phi_{s(c,p)}(p)
$$

と置きます。$H(s,p)=T(\Phi_s(p))$ は滑らかで、

$$
\partial_sH(s,p)=dT_{\Phi_s(p)}(Y)
=\frac{dT(X)}{1+|X|_h}
=\frac1{1+|X|_h}>0
$$

です。従って[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)により $s(c,p)$ は局所的に滑らかで、唯一性によって全域で貼り合わされます。各流線は $\Sigma$ と一度だけ交わるため $F$ は全単射です。逆写像も $T$ と、流線を $\Sigma$ に戻す滑らかなパラメータから作れるので微分同相です。

$T(F(c,p))=c$ を $c$ で微分して、$F_*(\partial_c)$ は $Y$ と同方向で $dT(F_*\partial_c)=1$ を満たすことから

$$
F_*(\partial_c)
=\frac{Y}{dT(Y)}
=\frac{\nabla^gT}{g(\nabla^gT,\nabla^gT)}
=X
$$

となります。一方、$V\in T_p\Sigma$ に対して $T(F(c,p))=c$ を $p$ で微分すると $dT(F_*V)=0$ です。ゆえに

$$
g(F_*\partial_c,F_*V)
=g(X,F_*V)
=\frac{dT(F_*V)}{g(\nabla^gT,\nabla^gT)}
=0
$$

で、時間空間交差項は零です。さらに

$$
g(X,X)=\frac1{g(\nabla^gT,\nabla^gT)}<0
$$

なので

$$
\beta=-\frac1{g(\nabla^gT,\nabla^gT)}>0
$$

です。$h_c$ は空間的レベル $\Sigma_c$ の誘導計量を $F$ で引き戻したもので、[レベル命題](#prop-lorg20-spacelike-levels)により正定値です。全構成が滑らかなため、$\beta$ と $h_c$ の係数も滑らかです。$\square$
<!-- proof-end -->

ここで $-\beta\,dc^2+h_c$ は、計量を「時間的な一方向」と「各面上の空間的な $n$ 方向」に**直交分解**した表示です。空間方向の計量 $h_c$ は $c$ とともに変化して構いません。一定の空間計量へ固定できるとは主張していません。

## 6. lapseと未来向き単位法線

上式の $\beta$ は時間方向 $X=\partial_c$ の長さを決める関数です。法線を長さの絶対値1へ正規化すると、面から見た「単位の未来方向」が得られます。

<a id="prop-lorg20-unit-normal"></a>

<!-- formal-statement-start -->
> **命題（lapseと単位法線）**  
> 滑らかなCauchy temporal function $T$ が与える直交分割において、各時刻面の未来向き単位法線ベクトル場 $N$ は
>
$
> N=-\frac{\nabla^gT}{\sqrt{-g(\nabla^gT,\nabla^gT)}}
$
>
> である。正のlapse関数を $\alpha=\sqrt\beta$ とすると、
>
$
> \partial_c=X=\alpha N,\qquad
> g(N,N)=-1,\qquad dT(N)=\frac1\alpha
$
>
> が成り立つ。ここで $\beta=-1/g(\nabla^gT,\nabla^gT)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

分母は時間的勾配の負のノルムから定まり、勾配が過去向きなので負号で未来向きになります。時間方向と単位法線の関係は分母を揃えるだけですが、$dT(N)$ と $g(N,N)$ を別々に検算します。

<!-- proof-start -->
### 証明

$Q=-g(\nabla^gT,\nabla^gT)>0$ と置きます。すると

$$
N=-Q^{-1/2}\nabla^gT,\qquad
g(N,N)=Q^{-1}(-Q)=-1
$$

です。$\nabla^gT$ は過去向きなので $N$ は未来向きです。また

$$
dT(N)=g(\nabla^gT,-Q^{-1/2}\nabla^gT)
=Q^{1/2}>0
$$

です。他方、$\beta=Q^{-1}$、$\alpha=Q^{-1/2}$ だから $dT(N)=1/\alpha$ となります。最後に

$$
\alpha N=Q^{-1/2}(-Q^{-1/2}\nabla^gT)
=-Q^{-1}\nabla^gT
=\frac{\nabla^gT}{g(\nabla^gT,\nabla^gT)}
=X=\partial_c
$$

を得ます。$\square$
<!-- proof-end -->

時間座標を別の滑らかな厳密増加全単射 $f:\mathbb R\to\mathbb R$ で $u=f(c)$ と付け直すと、$du=f'(c)\,dc$ なので、$f'(c)>0$ の範囲では計量は

$$
g=-\frac{\beta(c,x)}{f'(c)^2}\,du^2+h_c.
$$

です。正規化法線 $N$ は変わらず、lapseだけが時間目盛りに応じて変わります。なお単なる滑らかな厳密増加全単射で $f'=0$ となる点を許すと、$f\circ T$ の勾配が零になってtemporal性を失います。**再目盛りも微分同相であること**が必要です。

## 7. 座標で分割を再現し、壊れる例も確認する

### 例1：時間だけで変化する積計量

$M=\mathbb R^2$ に

$$
g=-(1+t^2)^2dt^2+(2+\sin t)^2dx^2
$$

を入れ、$T=t$ とします。係数が正なので符号数は $(-,+)$、滑らかなLorentz計量です。逆計量から

$$
\nabla^gT=-\frac{1}{(1+t^2)^2}\partial_t,\qquad
g(\nabla^gT,\nabla^gT)=-\frac1{(1+t^2)^2}<0
$$

となり、過去時間的勾配を直接確認しました。未来因果速度の条件を計量へ代入すると

$$
(2+\sin t)^2(x')^2\le(1+t^2)^2(t')^2,
\qquad
\left|\frac{dx}{dt}\right|\le\frac{1+t^2}{2+\sin t}
$$

です。任意の有限時刻区間では右辺は有界であるため、時刻の有限端点で $x$ は極限を持ち、因果曲線を延長できます。従って両側非延長曲線の $t$ は全実数を動き、$T$ はCauchy temporal functionです。

この座標は既に直交していて、$\beta=(1+t^2)^2$、$h_t=(2+\sin t)^2dx^2$、未来単位法線は

$$
N=\frac{1}{1+t^2}\partial_t
$$

です。$\partial_t$ 自体は単位法線ではありません。

### 例2：斜めの時計を直交座標に戻す

Minkowski平面で $|a|<1$ を固定し、$T=t+ax$ とします。[因果速度条件](../LORG3/index.md#def-lorg3-causal-curve)で $|dx/dt|\le1$、したがって

$$
\frac{dT}{dt}=1+a\frac{dx}{dt}\ge1-|a|>0.
$$

さらに任意の基準時刻 $t_0$ に対して $|x(t)-x(t_0)|\le|t-t_0|$ なので、非延長曲線上で $t\to\pm\infty$ なら $T\to\pm\infty$ です。[Minkowskiの全時刻通過](../LORG15/index.md#lem-lorg15-full-time)から $T$ はCauchyです。

勾配と時間方向は

$$
\nabla^gT=-\partial_t+a\partial_x,\qquad
X=\frac{\partial_t-a\partial_x}{1-a^2}.
$$

時刻零面 $\Sigma=\{(-ay,y):y\in\mathbb R\}$ を基準にすると、$X$ に沿う写像は

$$
F(c,y)=\left(-ay+\frac{c}{1-a^2},\ y-\frac{ac}{1-a^2}\right).
$$

$T(F(c,y))=c$、$F_c=(1,-a)/(1-a^2)$、$F_y=(-a,1)$ です。元の $g$ にこれらを代入すると

$$
g(F_c,F_c)=-\frac1{1-a^2},\quad
g(F_c,F_y)=0,\quad
g(F_y,F_y)=1-a^2.
$$

よって

$$
F^*g=-\frac{dc^2}{1-a^2}+(1-a^2)dy^2.
$$

斜めの切片でも、時刻面に直交する流れを選べば交差項は消えます。$\lvert a\rvert=1$ では勾配が光的となり、レベルが空間的でなくなるのでこの構成は使えません。

### 例3：なめらかな時計だけでは足りない

原点を除いたMinkowski平面 $M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$ では $T=t$ の勾配は依然過去時間的です。しかし曲線 $\gamma(s)=(s,0)$（$s<0$）は、取り除かれた点に向かって未来非延長となり、$T(\gamma)=(-\infty,0)$ しか通りません。この例はtemporal性からCauchy性への含意が偽であることを示します。$t=0$ のレベルには $x\ne0$ の点だけが残り、曲線を全て横切る面にはなりません。失われたのは非延長曲線の逃げ道をふさぐ大域双曲性であり、[コンパクトダイヤモンドの反例](../LORG16/index.md#def-lorg16-global-hyperbolicity)と整合します。

## 8. 演習と詳細解答

演習では、勾配の符号、非延長曲線上の値域、直交性、法線の規格化を**それぞれ**検算します。

<a id="ex-lorg20-a01"></a>
### LORG20-A01 Cauchy temporalの二条件
- Level: A

$\mathbb R^{1,1}$ の標準計量で $T=t$ と $\sigma=\arctan t$ を考える。どちらがtemporalで、どちらがCauchy temporalか、二条件を区別して示せ。

<!-- solution-start -->
**詳細解答**。$dT=dt$、$d\sigma=(1+t^2)^{-1}dt$ より

$$
\nabla^gT=-\partial_t,\quad
\nabla^g\sigma=-\frac1{1+t^2}\partial_t,\quad
g(\nabla^g\sigma,\nabla^g\sigma)=-\frac1{(1+t^2)^2}<0.
$$

どちらも過去時間的勾配を持つのでtemporalです。[Minkowskiの非延長因果曲線の全時刻通過](../LORG15/index.md#lem-lorg15-full-time)により両側非延長因果曲線上で $t$ の値域は $\mathbb R$、一方 $\arctan t$ の値域は $(-\pi/2,\pi/2)$ です。従って[定義](#def-lorg20-cauchy-temporal)の第二条件を満たすのは $T$ だけです。$\sigma$ はCauchy temporalではありません。
<!-- solution-end -->

<a id="ex-lorg20-a02"></a>
### LORG20-A02 lapseと法線を一つずつ計算する
- Level: A

$g=-9dt^2+4dx^2$、$T=t$ とする。$\nabla^gT$、$\beta$、$N$、$g(N,N)$、$dT(N)$ を求めよ。

<!-- solution-start -->
**詳細解答**。逆計量の時刻成分は $g^{tt}=-1/9$ なので

$$
\nabla^gT=-\frac19\partial_t,\qquad
g(\nabla^gT,\nabla^gT)=-\frac19.
$$

したがって[単位法線命題](#prop-lorg20-unit-normal)の $Q=1/9$、$\beta=Q^{-1}=9$、$\alpha=3$ であり、

$$
N=-\frac{\nabla^gT}{\sqrt Q}
=\frac13\partial_t.
$$

直接代入すると $g(N,N)=-9(1/3)^2=-1$、$dT(N)=1/3=1/\alpha$ です。$\partial_t$ を単位法線と取り違えないことが要点です。
<!-- solution-end -->

<a id="ex-lorg20-a03"></a>
### LORG20-A03 正定値性を接ベクトルで検証する
- Level: A

$g=-dt^2+dx^2+dy^2$、$T=t+\frac12x$ のレベル $T=0$ で、$(x,y)$ を局所座標に取る。面上の誘導計量とその正定値性を求めよ。

<!-- solution-start -->
**詳細解答**。面の埋め込みは $\iota(x,y)=(-x/2,x,y)$ です。$d\iota(\partial_x)=(-1/2,1,0)$ と $d\iota(\partial_y)=(0,0,1)$ は $dT=dt+\frac12dx$ を零にするため接ベクトルです。各内積を計算すると

$$
g(d\iota\partial_x,d\iota\partial_x)=1-\frac14=\frac34,\quad
g(d\iota\partial_y,d\iota\partial_y)=1,\quad
g(d\iota\partial_x,d\iota\partial_y)=0.
$$

よって誘導計量は $h=\frac34dx^2+dy^2$ です。非零の接ベクトル $u\partial_x+v\partial_y$ に対して $h(u,v)=\frac34u^2+v^2>0$ なので正定値です。[空間的レベル命題](#prop-lorg20-spacelike-levels)の抽象条件を成分ごとに確認しました。
<!-- solution-end -->

<a id="ex-lorg20-a04"></a>
### LORG20-A04 閾値で壊れる時刻面
- Level: A

Minkowski平面の $T=t+ax$ に対し、$a=1$ と $a=2$ ではどの条件が破れるかを計量と接ベクトルから確かめよ。

<!-- solution-start -->
**詳細解答**。勾配は $\nabla^gT=-\partial_t+a\partial_x$ で、その長さは

$$
g(\nabla^gT,\nabla^gT)=-1+a^2.
$$

$a=1$ の場合は零（光的）で、$\{T=0\}$ の接ベクトル $(-1,1)$ の長さも $-1+1=0$ です。勾配は時間的でなく、面は空間的でありません。$a=2$ では勾配の長さは $3>0$（空間的）となり、面の接ベクトル $(-2,1)$ は $g=-4+1=-3<0$（時間的）です。どちらも[定義](#def-lorg20-cauchy-temporal)の第一条件を満たしません。$a=2$ の面には時間的曲線に沿う複数の点が入るためCauchy面にもなりません。
<!-- solution-end -->

<a id="ex-lorg20-a05"></a>
### LORG20-A05 時間の付け直し
- Level: A

$g=-dt^2+dx^2$ で $T=t$ とし、$u=f(T)$ を $f(s)=s+s^3$ で定める。temporal性、Cauchy性と新しい $\beta_u$ を求めよ。

<!-- solution-start -->
**詳細解答**。$f'(t)=1+3t^2>0$、$f(\pm\infty)=\pm\infty$ なので $f$ は $\mathbb R$ の滑らかな増加微分同相です。[時間目盛りの変更](../LORG19/index.md#prop-lorg19-reparam)からCauchy性は保たれます。勾配は

$$
\nabla^g u=f'(t)\nabla^gT=-(1+3t^2)\partial_t
$$

なので過去時間的です。$du=(1+3t^2)\,dt$ より計量を $u$ で書くと

$$
g=-\frac{du^2}{(1+3t(u)^2)^2}+dx^2,\qquad
\beta_u(u)=\frac{1}{(1+3t(u)^2)^2}.
$$

$t(u)$ は $f$ の滑らかな逆関数です。時刻面は変わらず、正規化法線は $\partial_t$ のままです。
<!-- solution-end -->

<a id="ex-lorg20-b01"></a>
### LORG20-B01 無限和が定義される理由
- Level: B

連続Cauchy時計 $\tau_0$ と第4節の段差関数族 $(s_k)$ があるとする。基準点 $p_0$ との差を引いた級数が各点近傍で有限和となること、差を引かずに $\sum_k s_k(p)$ とすると一般に収束しないことを説明せよ。

<!-- solution-start -->
**詳細解答**。$p$ の相対コンパクト近傍 $U$ と $p_0$ について $\tau_0(\overline U)\cup\{\tau_0(p_0)\}$ を含む有限区間 $[a,b]$ を選びます。$k>b+1$ なら $s_k(q)=s_k(p_0)=-1$、$k<a-2$ なら両方が $1$ です。従って $q\in U$ に依らず、差が非零の $k$ は有限集合に含まれます。各項は滑らかなので和は $U$ 上で滑らかです。

一方、$k\to+\infty$ では固定した $p$ に対して $s_k(p)=-1$、$k\to-\infty$ では $s_k(p)=1$ が続きます。よって通常の両側和は絶対収束せず、順序の取り方にも依存します。差の正規化は単なる便利な表示ではなく、大域関数の定義そのものに必要です。[大域合成命題](#prop-lorg20-step-sum)の最初の手順を確認しました。
<!-- solution-end -->

<a id="ex-lorg20-b02"></a>
### LORG20-B02 直交する流れを選ぶ
- Level: B

Minkowski平面で $T=t+ax$、$|a|<1$ とする。$\Sigma_0=\{T=0\}$ を $y=x$ で表し、$dT(X)=1$ かつ $X\perp T\Sigma_c$ となる未来時間的 $X$ を求め、引戻し計量を導け。

<!-- solution-start -->
**詳細解答**。$dT=dt+a\,dx$、$\nabla^gT=-\partial_t+a\partial_x$ とその長さ $-(1-a^2)$ から

$$
X=\frac{\partial_t-a\partial_x}{1-a^2},\qquad
dT(X)=\frac{1-a^2}{1-a^2}=1
$$

です。面の接ベクトルは $(-a,1)$ で、内積は $-(-a)/(1-a^2)-a/(1-a^2)=0$ となります。初期点 $(-ay,y)$ から $X$ を時間 $c$ だけ流すと

$$
F(c,y)=\left(-ay+\frac{c}{1-a^2},\ y-\frac{ac}{1-a^2}\right).
$$

偏微分 $F_c=(1,-a)/(1-a^2)$、$F_y=(-a,1)$ を代入し、時間成分の負号に注意して

$$
g(F_c,F_c)=-\frac1{1-a^2},\quad
g(F_c,F_y)=0,\quad
g(F_y,F_y)=1-a^2.
$$

従って $F^*g=-(1-a^2)^{-1}dc^2+(1-a^2)dy^2$ です。[直交分割定理](#thm-lorg20-orthogonal-splitting)の構成を具体的に再現しました。
<!-- solution-end -->

<a id="ex-lorg20-b03"></a>
### LORG20-B03 単なるtemporalからCauchyを推論しない
- Level: B

$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$ に $g=-dt^2+dx^2$ を制限する。$t$ がtemporalでもCauchy temporalではないことを示し、$t=0$ の面に関する失敗を述べよ。

<!-- solution-start -->
**詳細解答**。開部分多様体でも $\nabla^g t=-\partial_t$、長さは $-1$ で過去時間的です。しかし

$$
\gamma:(-\infty,0)\to M_*,\qquad \gamma(s)=(s,0)
$$

は未来時間的曲線で、未来端 $s\to0$ の極限 $(0,0)$ が $M_*$ にないので、その端で $M_*$ 内の連続因果曲線として延長できません。過去端も非延長であり、$t(\gamma(s))=s$ の値域は $(-\infty,0)$ です。[Cauchy temporalの定義](#def-lorg20-cauchy-temporal)の第二条件が失敗します。$t=0$ で $x\ne0$ の点は残りますが、この曲線はそこに一度も交わりません。点除去により[大域双曲性のコンパクトダイヤモンド条件](../LORG16/index.md#def-lorg16-global-hyperbolicity)が壊れ、すべての流線とレベルを交差させる論証を失うのです。
<!-- solution-end -->

<a id="ex-lorg20-b04"></a>
### LORG20-B04 時間再目盛りで失うもの
- Level: B

$T$ をCauchy temporal functionとし、$f(s)=s^3$、$q(s)=\arctan s$ をそれぞれ合成する。滑らかさ、時間的勾配、非延長曲線上の値域を調べ、「単調全射」と「temporalを保つ」の違いを示せ。

<!-- solution-start -->
**詳細解答**。$f$ は滑らかで厳密増加かつ全射です。[時間目盛りの変更](../LORG19/index.md#prop-lorg19-reparam)により $f\circ T$ はCauchy時間関数ですが、

$$
\nabla^g(f\circ T)=3T^2\nabla^gT
$$

なのでレベル $T=0$ 上では勾配が零です。従ってそこではtemporalでありません。$T^{-1}(0)$ は[レベル命題](#prop-lorg20-spacelike-levels)により非空なので、実際に破綻点があります。

$q'(s)=(1+s^2)^{-1}>0$ なので $\nabla^g(q\circ T)=q'(T)\nabla^gT$ はどの点でも過去時間的です。一方、各非延長曲線で $q\circ T$ の値域は $(-\pi/2,\pi/2)$ に限られ、Cauchy性を失います。よって**temporal性**には正の導関数、**全実数Cauchy性**には全射がそれぞれ必要です。
<!-- solution-end -->

<a id="ex-lorg20-c01"></a>
### LORG20-C01 時刻依存の幾何を初期面まで検証する
- Level: C

$M=\mathbb R^{1,1}$、$g=-(1+t^2)^2dt^2+(2+\sin t)^2dx^2$ とする。$T=t$ がCauchy temporal functionであることを証明し、$\beta$、未来単位法線 $N$、$\Sigma_0$ の誘導計量、$N$ に沿う時間変化率 $dT(N)$ を求めよ。さらに $u=\arctan T$ を時計として使ったとき、どのCauchy条件が失われるか確認せよ。

<!-- solution-start -->
**詳細解答**。まず両係数は全実数で正であり、$g$ は滑らかなLorentz計量です。逆計量から

$$
\nabla^gT=-(1+t^2)^{-2}\partial_t,\qquad
g(\nabla^gT,\nabla^gT)=-(1+t^2)^{-2}<0
$$

を得ます。時間成分は負なので勾配は過去時間的です。

未来因果曲線では $t'\ge0$、$g(\dot\gamma,\dot\gamma)\le0$ より

$$
\left|\frac{dx}{dt}\right|\le\frac{1+t^2}{2+\sin t}\le1+t^2.
$$

仮に未来端で時刻が有限値 $b$ に近づくと、$t$ がある有限区間に入るので右辺は一定の $C$ 以下です。二時刻 $s<t<b$ について $|x(t)-x(s)|\le C(t-s)$、したがって $x$ も有限極限を持ちます。時空内の極限点から因果曲線を継げるので未来非延長性に矛盾します。過去端も同じ積分評価で $-\infty$ まで続くため、時刻の値域は全実数です。よって[定義](#def-lorg20-cauchy-temporal)の両条件を満たします。

[直交分割定理](#thm-lorg20-orthogonal-splitting)に現れる係数はこの座標では直接

$$
\beta=(1+t^2)^2,\qquad h_t=(2+\sin t)^2dx^2
$$

です。$\Sigma_0=\{t=0\}$ の接ベクトルは $\partial_x$ であり、$g(\partial_x,\partial_x)=4>0$ なので誘導計量は $h_0=4dx^2$ です。[単位法線の公式](#prop-lorg20-unit-normal)により

$$
N=(1+t^2)^{-1}\partial_t,\qquad
g(N,N)=-1,\qquad dT(N)=(1+t^2)^{-1}.
$$

最後に $u=\arctan t$ は $\nabla^gu=(1+t^2)^{-1}\nabla^gT$ なので過去時間的勾配を保ちます。しかし値域は $(-\pi/2,\pi/2)$ であり、任意の非延長曲線上でも全射 $\mathbb R$ とならず、Cauchy temporalではありません。これにより局所の空間的分割と、**全実数のCauchy時計**を使う大域的分割との差が確認できます。
<!-- solution-end -->

## 9. 後続の初期値問題への橋

本講で得た構造は、各時刻 $c$ に沿う正定値計量 $h_c$、未来単位法線 $N$、lapse $\alpha$ と、全曲線が一度通る初期面 $\Sigma_c$ です。これは後続の双曲型方程式に必要な幾何学的入力です。ただし波動作用素のエネルギー評価、解の存在一意性、Green作用素はここでは証明していません。次のLORG21では具体時空の因果構造と本講の分割を横断的に検算します。

主要参照：Antonio N. Bernal and Miguel Sánchez, *Smoothness of time functions and the metric splitting of globally hyperbolic spacetimes*, Communications in Mathematical Physics **257** (2005), 43–50（[原論文](https://arxiv.org/abs/gr-qc/0401112)）。