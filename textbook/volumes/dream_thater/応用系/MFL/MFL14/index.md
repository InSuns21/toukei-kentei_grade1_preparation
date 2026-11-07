# MFL14 Kernel標本平均のvariance・集中

<!-- definition-example-audit: strict -->

## 1. 連続平均が分かっても、点群で同じ値になるとは限らない

[MFL13の内在Gaussian核と連続平均](../MFL13/index.md#def-mfl13-kernel)は、標本点が無限にある理想的な平均を記述した。その[核のbias定理](../MFL13/index.md#thm-mfl13-bias)は、核幅 $\varepsilon$ を小さくすると連続平均がどう変わるかを示す。しかし実際には有限個の独立標本から積分を近似する。近くの点が偶然少なければ、連続平均を正しく近似できない。

ここで調べたいのは三つである。

1. 核の近傍の**有効な標本数**は、$n$ 個すべてではなく、およそ $n\varepsilon^{d/2}$ 個なのはなぜか。
2. 重みの総和で割る推定量が安定するには、分母について何を確かめればよいか。
3. 評価点が別に選んだ test 点の場合と、標本 $X_i$ 自身の場合で、独立性をどう扱うか。

以下、$M$ は境界のない滑らかなコンパクト $d$ 次元Riemann多様体、$d\ge1$ とし、$dV_g$ は体積測度である。$X_1,\ldots,X_n$ は密度 $p$ に従う独立同分布の $M$ 値標本、$\int_M p\,dV_g=1$ とする。内在Gaussian核は

$$
k_\varepsilon(x,y)=(4\pi\varepsilon)^{-d/2}
\exp\!\left(-\frac{d_g(x,y)^2}{4\varepsilon}\right),\qquad \varepsilon>0.
$$

核幅 $\varepsilon$ は長さの二乗であり、主に半径 $\sqrt\varepsilon$ の近傍を見る。$f:M\to\mathbb R$ は観測する関数で、$F=\sup_{y\in M}|f(y)|<\infty$ とおく。確率は標本 $X_i$ の取り方に関して考える。以下の有限標本界では、定数の多くが固定した $M,p,f$ に依存する。

## 2. 独立した test 点における標本平均

まず $x\in M$ を固定し、$X_1,\ldots,X_n$ とは別に選ぶ。$x$ 自身が確率的な test 点でも、**標本と独立**なら、$x$ を条件として固定した後に以下の計算ができる。核の値に $f(X_j)$ を掛けたものを平均し、重みだけの平均で割ると、行正規化した推定量になる。

以下の $\mathbb E[\,\cdot\mid x]$ と $\operatorname{Var}(\,\cdot\mid x)$ は、評価点が $x$ と分かった条件の下で標本について取る期待値と分散を表す。$x$ が初めから固定されている場合には、通常の期待値・分散と同じである。

<a id="def-mfl14-empirical"></a>

<!-- formal-statement-start -->
> **定義（kernel標本平均と行正規化推定量）**  
> 境界なしコンパクト $d$ 次元Riemann多様体 $M$ 上で、$X_1,\ldots,X_n$ を密度 $p$ に従う独立同分布の標本、$x\in M$ を評価点、$\varepsilon>0$、$f:M\to\mathbb R$ を有界な可測関数とする。[内在Gaussian核](../MFL13/index.md#def-mfl13-kernel)を用い、
>
$$
\widehat T_{n,\varepsilon}f(x)=\frac1n\sum_{j=1}^n k_\varepsilon(x,X_j)f(X_j),\qquad
\widehat q_{n,\varepsilon}(x)=\frac1n\sum_{j=1}^n k_\varepsilon(x,X_j)
$$
>
> を定める。行正規化した有限標本推定量を
>
$$
\widehat P_{n,\varepsilon}f(x)=
\frac{\widehat T_{n,\varepsilon}f(x)}{\widehat q_{n,\varepsilon}(x)}
$$
>
> と呼ぶ。Gaussian核は全点で正なので、$n\ge1$ なら分母は各標本について正である。
<!-- formal-statement-end -->

この式は任意の評価点 $x$ で定義でき、標本自身の点 $x=X_i$ にも使える。ただし**定義できることと独立標本として集中界を適用できることは別**である。第3〜5節は $x$ が固定または標本から独立な場合に限り、標本点の場合は第6節で扱う。

対応する母平均は $T_\varepsilon^pf(x)=\int k_\varepsilon(x,y)f(y)p(y)\,dV_g(y)$、分母の母平均は $q_\varepsilon(x)=T_\varepsilon^p1(x)$ であり、連続の行正規化は $P_\varepsilon^pf=T_\varepsilon^pf/q_\varepsilon$ である。「標本平均の比」と「母平均の比」は別の対象だ。

<!-- definition-example-start: def-mfl14-empirical -->
**直接例（円周の二標本）。** **定義の確認**：半径 $R$ の円周に正の一様密度 $p=1/(2\pi R)$ を置き、独立標本の一つの実現値として $x$ を固定の角度0、$X_1$ を角度0、$X_2$ を角度 $\pi/2$ とする。二点の測地距離はそれぞれ $0,\pi R/2$。$a=(4\pi\varepsilon)^{-1/2}>0$、$b=a\exp(-\pi^2R^2/(16\varepsilon))>0$ と置くと、

$$
\widehat q_{2,\varepsilon}(x)=(a+b)/2>0,\qquad
\widehat P_{2,\varepsilon}f(x)=\frac{af(X_1)+bf(X_2)}{a+b}.
$$

従って $f\equiv1$ なら $\widehat P1=1$ が**標本の取り方によらず厳密に**成立する。分子と分母の変動には相関があり、両者の分散を単に足すだけでは比の精度を正確には表せない。
<!-- definition-example-end -->

## 3. 分散の尺度は核の二乗から出る

一つの標本から得る $Z_j=k_\varepsilon(x,X_j)f(X_j)$ は独立同分布である。[MFL13の核](../MFL13/index.md#def-mfl13-kernel)には、核の二乗を幅 $\varepsilon/2$ の核へ書き直せる便利な恒等式がある。

$$
k_\varepsilon(x,y)^2
=\frac{e^{-d_g(x,y)^2/(2\varepsilon)}}{(4\pi\varepsilon)^d}
=(8\pi\varepsilon)^{-d/2}k_{\varepsilon/2}(x,y).
$$

この係数が、分散の $\varepsilon^{-d/2}$ を生む。

<a id="prop-mfl14-variance"></a>

<!-- formal-statement-start -->
> **命題（kernel標本平均の二次モーメントと分散）**  
> $M$ を境界なし滑らかなコンパクト $d$ 次元Riemann多様体、$d\ge1$ とし、$X_1,\ldots,X_n$ は $p\in C^3(M)$ に従う独立同分布の標本とする。$f\in C^3(M)$ は実数値、$x\in M$ は固定または標本から独立、$\varepsilon>0$ とする。このとき $x$ を条件として
>
$$
\mathbb E[\widehat T_{n,\varepsilon}f(x)\mid x]=T_\varepsilon^pf(x),
$$
>
$$
\operatorname{Var}(\widehat T_{n,\varepsilon}f(x)\mid x)
=\frac1n\left[(8\pi\varepsilon)^{-d/2}
G_{\varepsilon/2}(pf^2)(x)-(T_\varepsilon^pf(x))^2\right].
$$
>
> 十分小さい $\varepsilon$ に対し一様な定数 $C<\infty$ が存在し、
>
$$
0\le\operatorname{Var}(\widehat T_{n,\varepsilon}f(x)\mid x)
\le\frac{C}{n\varepsilon^{d/2}}.
$$
>
> さらに $Z_1=k_\varepsilon(x,X_1)f(X_1)$ と記すと、各 $x$ に一様に $\varepsilon\downarrow0$ で、二次モーメントは
>
$$
\mathbb E[Z_1^2\mid x]=(8\pi)^{-d/2}\varepsilon^{-d/2}
\bigl(p(x)f(x)^2+O(\varepsilon)\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

独立変数の平均の分散は一つの変数の分散を $n$ で割ったもの。二乗核の恒等式を用いて二次モーメントを積分する。残る積分には[MFL13のbias展開](../MFL13/index.md#thm-mfl13-bias)を $pf^2$ として適用できる。

<!-- proof-start -->
### 証明

$x$ を固定して条件付き期待値を計算する。各 $Z_j$ は同じ分布を持ち、独立なので

$$
\mathbb E Z_j=\int_M k_\varepsilon(x,y)f(y)p(y)\,dV_g(y)=T_\varepsilon^pf(x),
$$

$$
\operatorname{Var}\!\left(\frac1n\sum_{j=1}^nZ_j\right)
=\frac1{n^2}\sum_{j=1}^n\operatorname{Var}(Z_j)
=\frac{\mathbb EZ_1^2-(\mathbb EZ_1)^2}{n},
$$

ここで異なる $j$ の共分散は独立性により0である。$k_\varepsilon^2=(8\pi\varepsilon)^{-d/2}k_{\varepsilon/2}$ を代入し、[核積分作用素の定義](../MFL13/index.md#def-mfl13-kernel)で $u=pf^2$ とすると

$$
\mathbb EZ_1^2=\int_M k_\varepsilon(x,y)^2f(y)^2p(y)\,dV_g(y)
=(8\pi\varepsilon)^{-d/2}G_{\varepsilon/2}(pf^2)(x).
$$

$pf^2\in C^3(M)$ だから[内在核のbias定理](../MFL13/index.md#thm-mfl13-bias)の $u=pf^2$、帯域 $\eta=\varepsilon/2$ を代入でき、$G_{\varepsilon/2}(pf^2)(x)=p(x)f(x)^2+O(\varepsilon)$ が $x$ に一様に成り立つ。$p,f$ はコンパクト $M$ 上有界なので、この積分は小さい $\varepsilon$ に対して $C_0$ 以下。分散は非負であり、$\operatorname{Var}(Z_1)\le\mathbb EZ_1^2$ を使えば $C_0(8\pi)^{-d/2}/(n\varepsilon^{d/2})$ を得る。$\square$
<!-- proof-end -->

**尺度を読む。** 核の高さは $\varepsilon^{-d/2}$、主な近傍の体積は $\varepsilon^{d/2}$。二乗すると高さの二乗が残るため、二次モーメントが $\varepsilon^{-d/2}$ となる。分散が小さいための基本条件は $n\varepsilon^{d/2}\to\infty$ で、$n\varepsilon^{d/2}$ を「有効標本数」の尺度と呼ぶ。ただしこれは実際にその整数個が必ず入るという意味ではない。

**一次元の検算。** 平坦な直線上で密度と $f$ を局所的に一定とみなす場合、二乗核恒等式と[Gaussianの零次モーメント](../MFL13/index.md#lem-mfl13-moments)から

$$
\int_\mathbb R k_\varepsilon(x,y)^2\,dy=(8\pi\varepsilon)^{-1/2},
\qquad\int_\mathbb R k_\varepsilon(x,y)\,dy=1.
$$

$\varepsilon$ を4分の1にすると、二乗積分は2倍になり、同じ $n$ でも分散が大きくなる。

## 4. 分散から「高確率で近い」へ

分散界だけでは同時に多数の標本点を調べる際に弱い。そこで、平均が母平均から $t$ 以上ずれる確率を指数関数で抑える。次の Bernstein 型不等式は、独立かつ有界な変数でこの上界を得るための道具であり、証明もここで再構成する。

<a id="lem-mfl14-bernstein"></a>

<!-- formal-statement-start -->
> **補題（有界独立変数のBernstein型不等式）**  
> 独立な実確率変数 $Y_1,\ldots,Y_n$ が $\mathbb EY_j=0$、$|Y_j|\le b$、$\mathbb EY_j^2\le v$ を全 $j$ について満たすとする（$b>0,v>0$）。任意の $t>0$ に対し
>
$$
\mathbb P\!\left(\left|\frac1n\sum_{j=1}^nY_j\right|\ge t\right)
\le2\exp\!\left(-\frac{nt^2}{2(v+bt/3)}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$e^{\lambda Y}$ をTaylor級数で平均し、二次以上の項を $v$ と $b$ で抑える。独立性で指数の期待値を積へ分解し、非負な指数変数に[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を使う。負方向は $-Y$ に適用する。

<!-- proof-start -->
### 証明

$0<\lambda<3/b$ とする。$m\ge2$ に対し $|\mathbb EY_j^m|\le\mathbb E Y_j^2 b^{m-2}\le v b^{m-2}$、また $m!\ge2\cdot3^{m-2}$ である。$Y_j$ は有界でTaylor級数の期待値と和を交換でき、一次項は平均0なので

$$
\begin{aligned}
\mathbb E e^{\lambda Y_j}
&\le1+\sum_{m=2}^\infty\frac{\lambda^m v b^{m-2}}{m!}\\
&\le1+\frac{v\lambda^2}{2}\sum_{r=0}^\infty(\lambda b/3)^r
=1+\frac{v\lambda^2}{2(1-\lambda b/3)}\\
&\le\exp\!\left(\frac{v\lambda^2}{2(1-\lambda b/3)}\right).
\end{aligned}
$$

独立性から $\mathbb E e^{\lambda\sum_jY_j}=\prod_j\mathbb E e^{\lambda Y_j}$。非負で期待値が有限な変数 $e^{\lambda\sum Y_j}$ に[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を、しきい値 $e^{\lambda nt}>0$ で適用すると

$$
\mathbb P\left(\sum_jY_j\ge nt\right)
\le\exp\!\left(-\lambda nt+\frac{nv\lambda^2}{2(1-\lambda b/3)}\right).
$$

$\lambda=t/(v+bt/3)$ を選ぶと $\lambda b/3<1$、$1-\lambda b/3=v/(v+bt/3)$。従って指数は $-nt^2/[2(v+bt/3)]$ になる。$-Y_j$ も同じ仮定を満たすので、下側偏差を同様に評価して二つを足す。$\square$
<!-- proof-end -->

この補題の $b$ は**中心化した変数** $Y_j=Z_j-\mathbb EZ_j$ の上界である。核そのものの上界と取り違えない。

## 5. 分母の下界を示してから比を評価する

Gaussian核は正だから有限標本の分母は非零だが、非常に小さな分母で割れば計算は不安定になる。確率的に $\widehat q$ を母平均 $q_\varepsilon$ の近くへ保つ必要がある。[MFL13のbias定理](../MFL13/index.md#thm-mfl13-bias)を $u=p$ に適用すると、$p\ge p_{\min}>0$ の下で $q_\varepsilon(x)=p(x)+O(\varepsilon)$、従って小さい $\varepsilon$ では $q_\varepsilon(x)\ge p_{\min}/2$ となる。

<a id="thm-mfl14-ratio"></a>

<!-- formal-statement-start -->
> **定理（kernel行正規化推定量の集中）**  
> $M$ は境界なし滑らかなコンパクト $d$ 次元Riemann多様体、$d\ge1$。$p\in C^3(M)$ は確率密度で $p\ge p_{\min}>0$、$f\in C^3(M)$ は実数値とする。$X_1,\ldots,X_n$ は $p$ に従う独立同分布標本、$x\in M$ は固定または標本から独立とする。十分小さい $\varepsilon\in(0,\varepsilon_0]$、$0<t\le t_0=\min(1,p_{\min}/4)$ に対して、$M,p,f$ のみに依存する $c>0$ が存在し、
>
$$
\mathbb P\left(\left|\widehat P_{n,\varepsilon}f(x)-P_\varepsilon^pf(x)\right|
>\frac{4(1+F)}{p_{\min}}t\ \middle|\ x\right)
\le4\exp(-cn\varepsilon^{d/2}t^2),\qquad F=\|f\|_\infty.
$$
>
> 同じ確率評価の例外集合の外で $\widehat q_{n,\varepsilon}(x)\ge p_{\min}/4$ も成り立つ。特に $n\varepsilon^{d/2}\to\infty$ なら、固定または独立な test 点について $\widehat P_{n,\varepsilon}f(x)-P_\varepsilon^pf(x)\to0$ が確率収束する。
<!-- formal-statement-end -->

### 証明の見取り図

核の最大値は $(4\pi\varepsilon)^{-d/2}$、[分散命題](#prop-mfl14-variance)は $C\varepsilon^{-d/2}$ という一標本分散の上界を与える。これらを[Bernstein補題](#lem-mfl14-bernstein)へ分子・分母それぞれについて代入する。二つの偏差がともに $t$ 以下なら分母は確実に正の定数以上となり、比の誤差を分解できる。

<!-- proof-start -->
### 証明

$K_\varepsilon=(4\pi\varepsilon)^{-d/2}$ と置く。一つの分子項 $Z_j=k_\varepsilon(x,X_j)f(X_j)$ は $|Z_j|\le FK_\varepsilon$ を満たすため、中心化すれば $|Z_j-\mathbb EZ_j|\le2FK_\varepsilon$。分母項 $W_j=k_\varepsilon(x,X_j)$ も $|W_j-\mathbb EW_j|\le2K_\varepsilon$。[$f$ に対する分散上界](#prop-mfl14-variance)と同じ命題を $f\equiv1$ に適用すれば、それぞれの一標本分散は $C\varepsilon^{-d/2}$ 以下である。

各項の中心化絶対値も $C\varepsilon^{-d/2}$ 以下であり、$t\le1$ なので、[Bernstein不等式](#lem-mfl14-bernstein)の指数の分母は

$$
2(v+bt/3)\le C_1\varepsilon^{-d/2}(1+t)
\le2C_1\varepsilon^{-d/2}.
$$

従って適切な共通の $c>0$ で、分子または分母が各母平均から $t$ 以上ずれる確率はいずれも $2e^{-cn\varepsilon^{d/2}t^2}$ 以下。二つの事象に和事象の上界を適用し、同時に

$$
|\widehat T_{n,\varepsilon}f-T_\varepsilon^pf|\le t,\qquad
|\widehat q_{n,\varepsilon}-q_\varepsilon|\le t
$$

が成り立つ確率は少なくとも $1-4e^{-cn\varepsilon^{d/2}t^2}$ である。ここで[核bias展開](../MFL13/index.md#thm-mfl13-bias)に $u=p$ を代入して $q_\varepsilon\ge p_{\min}/2$ を用いると、$t\le p_{\min}/4$ により

$$
\widehat q_{n,\varepsilon}\ge q_\varepsilon-t\ge p_{\min}/4.
$$

$\mu=T_\varepsilon^pf$、$q=q_\varepsilon$ と置く。以下の計算では $\widehat T=\widehat T_{n,\varepsilon}f(x)$、$\widehat q=\widehat q_{n,\varepsilon}(x)$ と添字・引数を省略する。母平均の比 $\mu/q=P_\varepsilon^pf$ は正の核重みを正規化した $f$ の加重平均なので $|\mu/q|\le F$。差を**同じ分母**へ揃えると

$$
\begin{aligned}
\left|\frac{\widehat T}{\widehat q}-\frac\mu q\right|
&=\left|\frac{\widehat T-\mu}{\widehat q}
+\frac\mu q\frac{q-\widehat q}{\widehat q}\right|\\
&\le\frac{t+Ft}{p_{\min}/4}
=\frac{4(1+F)}{p_{\min}}t.
\end{aligned}
$$

以上で確率界と分母の下界を得た。$n\varepsilon^{d/2}\to\infty$ のとき、任意の固定した $t\in(0,t_0]$ で右辺は0へ向かう。さらに任意の精度 $\delta>0$ に対し $t\le\delta p_{\min}/[4(1+F)]$ と選べるので確率収束する。$\square$
<!-- proof-end -->

**定数関数という検算。** $f\equiv1$ なら $\widehat P1=P_\varepsilon^p1=1$ であり、誤差は常に0。上の上界は一般の $f$ に使えるが、この完全な相殺を捉える鋭い上界ではない。

## 6. 標本点そのものではleave-one-outを使う

今度は $x=X_i$ とする。このままでは $k_\varepsilon(X_i,X_i)$ という項があり、$X_i$ を固定した条件の下で「$n$ 個すべてが独立な $p$ からの標本」とは言えない。評価する点を平均から除く **leave-one-out（一点除外）** を導入する。

独立同分布性から、$X_i=x$ と条件付けても残りの点 $X_j$（$j\ne i$）の同時密度は $\prod_{j\ne i}p(y_j)$ のままである。従って、除外後の $n-1$ 項については、評価点を固定した第2〜5節の議論を適用できる。

<a id="def-mfl14-loo"></a>

<!-- formal-statement-start -->
> **定義（標本点でのleave-one-out核平均）**  
> $n\ge2$ とし、$M$ 上の独立同分布標本 $X_1,\ldots,X_n$、$\varepsilon>0$、有界可測関数 $f$ に対し、各 $1\le i\le n$ で
>
$$
\widehat T_{-i,\varepsilon}f(X_i)
=\frac1{n-1}\sum_{j\ne i}k_\varepsilon(X_i,X_j)f(X_j),
$$
>
$$
\widehat q_{-i,\varepsilon}(X_i)
=\frac1{n-1}\sum_{j\ne i}k_\varepsilon(X_i,X_j),\qquad
\widehat P_{-i,\varepsilon}f(X_i)
=\frac{\widehat T_{-i,\varepsilon}f(X_i)}{\widehat q_{-i,\varepsilon}(X_i)}
$$
>
> と定める。Gaussian核は正なので分母は正である。$X_i$ を条件として固定すれば $\{X_j:j\ne i\}$ は依然として独立同分布 $p$ となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl14-loo -->
**直接例（三点の円周）。** **定義の確認**：正の一様密度の円周上で $n=3$、$i=1$ とすると $\widehat q_{-1}(X_1)=[k_\varepsilon(X_1,X_2)+k_\varepsilon(X_1,X_3)]/2>0$ である。$\widehat P_{-1}f(X_1)$ は $f(X_2),f(X_3)$ の正の加重平均となり、$f\equiv1$ で1になる。$X_1$ がどこにあっても、条件付けの後に残る二点の分布は独立で元の密度 $p$ のままである。一方 $\widehat P_{3,\varepsilon}f(X_1)$ には自己重み $k_\varepsilon(X_1,X_1)=K_\varepsilon$ が加わる。
<!-- definition-example-end -->

<a id="prop-mfl14-loo"></a>

<!-- formal-statement-start -->
> **命題（leave-one-out集中と対角項の差）**  
> [kernel行正規化推定量の集中定理](#thm-mfl14-ratio)の $M,p,f,\varepsilon,t$ の仮定を満たす独立同分布標本 $X_1,\ldots,X_n$ を取り、$n\ge2$ とする。各 $i$ について
>
$$
\mathbb P\left(\left|\widehat P_{-i,\varepsilon}f(X_i)
-P_\varepsilon^pf(X_i)\right|>\frac{4(1+F)}{p_{\min}}t\ \middle|\ X_i\right)
\le4e^{-c(n-1)\varepsilon^{d/2}t^2}.
$$
>
> $\widehat q_{-i,\varepsilon}(X_i)\ge p_{\min}/4$ が成り立つ事象では、自己点を含む[全標本の推定量](#def-mfl14-empirical)との差は
>
$$
\left|\widehat P_{n,\varepsilon}f(X_i)-\widehat P_{-i,\varepsilon}f(X_i)\right|
\le\frac{8F(4\pi)^{-d/2}}{p_{\min}(n-1)\varepsilon^{d/2}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$X_i$ を固定した条件下で他の $n-1$ 個だけに[集中定理](#thm-mfl14-ratio)を適用する。全標本と一点除外の違いは自己重みを一つ足すだけなので、二つの比の差を分数の計算で評価できる。

<!-- proof-start -->
### 証明

$X_i=x$ という条件の下では $\{X_j:j\ne i\}$ は独立で密度 $p$ に従う。従って[行正規化集中定理](#thm-mfl14-ratio)の標本数を $n-1$ として適用し、第一の確率界と分母下界事象を得る。

$S=\sum_{j\ne i}k_\varepsilon(X_i,X_j)=(n-1)\widehat q_{-i,\varepsilon}(X_i)>0$、$A=\sum_{j\ne i}k_\varepsilon(X_i,X_j)f(X_j)$、$K=k_\varepsilon(X_i,X_i)=(4\pi\varepsilon)^{-d/2}$ と書く。すると $\widehat P_{-i}f=A/S$、$\widehat P_nf=(A+Kf(X_i))/(S+K)$ なので、分子を通分して

$$
\widehat P_nf-\widehat P_{-i}f
=\frac{S(A+Kf(X_i))-A(S+K)}{S(S+K)}
=\frac{K(f(X_i)-A/S)}{S+K}.
$$

$A/S$ は $f(X_j)$ の正の加重平均なので $|A/S|\le F$。分母下界事象では $S\ge(n-1)p_{\min}/4$、$S+K\ge S$。よって差の絶対値は

$$
\frac{K(|f(X_i)|+|A/S|)}{S+K}
\le\frac{2FK}{(n-1)p_{\min}/4}
=\frac{8F(4\pi)^{-d/2}}{p_{\min}(n-1)\varepsilon^{d/2}}.
$$

$\square$
<!-- proof-end -->

ここには大事な尺度差がある。**確率変動の上界**はおよそ $(n\varepsilon^{d/2})^{-1/2}$、**自己点の補正の上界**はおよそ $(n\varepsilon^{d/2})^{-1}$。$n\varepsilon^{d/2}$ が増えれば両者とも小さいが、有限標本では対角項が見かけの精度に影響しうる。

## 7. 核幅を縮める速さとgeneratorの誤差

点群から微分作用素を作るには、$\widehat P f-f$ を $\varepsilon$ で割る。だから $\widehat P f$ 自身が収束する条件だけでは不十分で、**確率誤差も $\varepsilon$ より速く小さくなる**必要がある。

[MFL13の行正規化bias命題](../MFL13/index.md#prop-mfl13-row)の極限作用素を

$$
\mathcal L_p f=\Delta_gf+2\langle\nabla_g\log p,\nabla_g f\rangle_g
$$

と記す。これは滑らかな固定関数 $f$ への作用であり、$p$ が一定でなければ $\Delta_g$ だけにはならない。

<a id="cor-mfl14-generator"></a>

<!-- formal-statement-start -->
> **系（核generatorの同時極限の十分条件）**  
> $M$ を境界なし滑らかなコンパクト $d$ 次元Riemann多様体、$p,f\in C^3(M)$ を実数値、$p\ge p_{\min}>0$ を確率密度とする。$X_1,\ldots,X_n$ は独立同分布 $p$。$\varepsilon=\varepsilon_n\downarrow0$ とし、
>
$$
\frac{n\varepsilon_n^{d/2+2}}{\log n}\longrightarrow\infty
$$
>
> と仮定する。$\mathcal L_pf=\Delta_gf+2\langle\nabla_g\log p,\nabla_gf\rangle_g$ とする。このとき全標本点で同時に、
>
$$
\max_{1\le i\le n}\left|
\frac{\widehat P_{-i,\varepsilon_n}f(X_i)-f(X_i)}{\varepsilon_n}
-\mathcal L_pf(X_i)\right|\xrightarrow{\mathbb P}0,
$$
>
> さらに $\widehat P_{-i,\varepsilon_n}$ を自己点を含む $\widehat P_{n,\varepsilon_n}$ に置き換えても成り立つ。これは**固定した滑らかな $f$ の標本点上の作用素整合性**であり、固有値・固有空間の収束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

高確率の偏差をすべての $i$ に一斉に使うには和事象の上界で $n$ 倍する。そのため偏差 $t_n$ に $\sqrt{\log n/(n\varepsilon^{d/2})}$ を選ぶ。これを $\varepsilon$ で割った項と、連続biasの $O(\varepsilon^{1/2})$ を合わせる。

<!-- proof-start -->
### 証明

[$X_i$ 条件付きの集中界](#prop-mfl14-loo)は右辺が $X_i$ に依存しないので、条件付けを外しても同じ上界である。$A>0$ を $cA^2>3$ となるよう選び、

$$
t_n=A\sqrt{\frac{\log n}{(n-1)\varepsilon_n^{d/2}}}
$$

と置く。仮定より $n\varepsilon_n^{d/2}\to\infty$ で $t_n\to0$、従って十分大きい $n$ では $t_n\le t_0$。各 $i$ の分子・分母偏差が $t_n$ を超える確率は高々 $4\exp[-c(n-1)\varepsilon_n^{d/2}t_n^2]=4n^{-cA^2}$。$n$ 個の事象に和事象の上界を適用すると、少なくとも $1-4n^{1-cA^2}$ の確率で、すべての $i$ について

$$
|\widehat P_{-i,\varepsilon_n}f(X_i)-P_{\varepsilon_n}^pf(X_i)|
\le\frac{4(1+F)}{p_{\min}}t_n,
\quad\widehat q_{-i,\varepsilon_n}(X_i)\ge p_{\min}/4
$$

が成立する。[行正規化bias](../MFL13/index.md#prop-mfl13-row)は $x\in M$ に一様で、

$$
\left|\frac{P_\varepsilon^pf(x)-f(x)}{\varepsilon}-\mathcal L_pf(x)\right|
\le C\varepsilon^{1/2}.
$$

二つの差を足し、$\varepsilon_n$ で割れば、高確率事象上で最大誤差は

$$
C\varepsilon_n^{1/2}
+\frac{4(1+F)A}{p_{\min}}
\sqrt{\frac{\log n}{(n-1)\varepsilon_n^{d/2+2}}}\longrightarrow0.
$$

自己点を含む場合は[対角項の評価](#prop-mfl14-loo)を $\varepsilon_n$ で割った $C/[(n-1)\varepsilon_n^{d/2+1}]$ が加わる。仮定 $n\varepsilon_n^{d/2+2}/\log n\to\infty$ と $\varepsilon_n\to0$ から

$$
(n-1)\varepsilon_n^{d/2+1}
=\frac{(n-1)\varepsilon_n^{d/2+2}}{\log n}
\frac{\log n}{\varepsilon_n}\longrightarrow\infty.
$$

従ってこの項も0へ向かう。例外確率 $4n^{1-cA^2}\to0$ より確率収束が従う。$\square$
<!-- proof-end -->

**十分条件と必要条件は違う。** 上の不等式は扱いやすい一様な有界性と分子・分母の個別集中から導いた保守的な十分条件である。定数関数の厳密な相殺や滑らかな $f$ に固有の分散縮小まで利用した最適な帯域条件とは主張しない。さらに作用素の点ごとの一致だけで固有空間の収束を推論してはいけない。固有空間には関数空間間の対応、作用素/エネルギーの強い収束、スペクトルの分離など別の保証が必要になる。

**速すぎる帯域縮小。** 例えば $\varepsilon_n=n^{-a}$ なら $n\varepsilon_n^{d/2+2}/\log n=n^{1-a(d/2+2)}/\log n$。$0<a<2/(d+4)$ のときこの十分条件を満たすが、$a\ge2/(d+4)$ ではこの証明は成功しない。**証明が使えないことと推定量が必ず発散することは別**である。

### 再現実験：分散・行正規化・leave-one-out・帯域

単位円周 $S^1$ に角度一様な独立標本を置き、内在距離（短い方の円弧長）から Gaussian 核を作る。関数は $f(\theta)=\cos\theta$、独立な評価点は角度 $0$ とする。[円周のLaplace–Beltrami作用素](../MFL12/index.md#prop-mfl12-circle)の式に半径 $R=1$ を代入すると、角度 $\theta$ に関する二階微分 $\Delta_gf=f_{\theta\theta}=-\cos\theta$ なので $\Delta_gf(0)=-1$ である。以下の実験は、標本平均・正規化比・一点除外・generator の誤差を**毎回新しい標本で再計算**する。乱数生成の開始値を固定するのは結果を再現するためで、偶然の当たり外れを消すものではない。

1. **分散**：$n$ を固定して $\varepsilon$ を変える。標本平均の実測分散を、[二次モーメントの公式](#prop-mfl14-variance)で求めた理論分散（円周上で数値積分）と比べ、$n\sqrt\varepsilon$ を掛けた尺度も確かめる。
2. **行正規化**：$n$ を増減させ、$\widehat q$ の実測最小値と $\widehat P$ のRMSEを見る。実測の最小値は[確率的分母下界](#thm-mfl14-ratio)そのものではない。
3. **一点除外**：同じ点群の $\widehat P_{n,\varepsilon}f(X_i)$ と $\widehat P_{-i,\varepsilon}f(X_i)$ を比較し、自己重みが占める割合と[対角項の差の恒等式](#prop-mfl14-loo)の数値残差を確認する。
4. **同時極限**：$\varepsilon=n^{-a}$ で $a=0.25$ と $a=0.50$ を比較し、generator誤差と $n\varepsilon^{5/2}/\log n$ を観察する。後者が0へ向かうことは「必ず発散する」という結論ではない。

```python-file-lab
# lab-id: MFL14-KERNEL-SAMPLING-FILE
# lab-title: Kernel標本平均の分散・集中・一点除外
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL14/kernel_sampling_lab.py
# timeout-ms: 30000
# lab-preset: 分散の理論値と実測値 | --mode variance --n 160 --epsilon 0.06 --trials 140 --seed 2026
# lab-preset: 正規化比と分母 | --mode ratio --n 120 --epsilon 0.03 --trials 140 --seed 2026
# lab-preset: 自己点を含む／除く | --mode loo --n 70 --epsilon 0.008 --seed 2026
# lab-preset: 帯域縮小・a=0.25 | --mode bandwidth --n 100 --exponent 0.25 --trials 70 --seed 2026
# lab-preset: 帯域縮小・a=0.50 | --mode bandwidth --n 100 --exponent 0.50 --trials 70 --seed 2026
```

折れ線は少数の $n,\varepsilon$ の**実測点を結んだ参考表示**であり、連続パラメータ全域の証明ではない。円周上の一様密度と特定の滑らかな $f$ では誤差の相殺が起こり得るため、実測収束が[十分条件](#cor-mfl14-generator)の必要性を意味するわけでもない。元の [Pythonファイル](kernel_sampling_lab.py) はローカルでも実行可能で、`--self-test` で二乗核の積分値・比・一点除外の数値恒等式を検算できる。

## 8. 演習：分散から標本点上の極限まで

<a id="ex-mfl14-a01"></a>

### MFL14-A01 二乗Gaussian核の係数

- Level: A
- 問題: 一次元の $k_\varepsilon(x,y)=(4\pi\varepsilon)^{-1/2}e^{-(x-y)^2/(4\varepsilon)}$ について、$k_\varepsilon^2=(8\pi\varepsilon)^{-1/2}k_{\varepsilon/2}$ を代入して検算し、$\int_\mathbb R k_\varepsilon(x,y)^2dy$ を求めよ。

**詳細解答**。$k_{\varepsilon/2}(x,y)=(2\pi\varepsilon)^{-1/2}e^{-(x-y)^2/(2\varepsilon)}$ である。係数の積は $(8\pi\varepsilon)^{-1/2}(2\pi\varepsilon)^{-1/2}=(4\pi\varepsilon)^{-1}$、指数は $k_\varepsilon^2$ と一致する。$s=(y-x)/\sqrt\varepsilon$ と置けば $dy=\sqrt\varepsilon\,ds$、$(x-y)^2/(2\varepsilon)=s^2/2$ だから

$$
\int_\mathbb R k_{\varepsilon/2}(x,y)\,dy
=\frac1{\sqrt{2\pi}}\int_\mathbb R e^{-s^2/2}\,ds=1.
$$

最後の積分は[Gaussianの零次モーメント](../MFL13/index.md#lem-mfl13-moments)を次元 $d=1$、帯域 $\varepsilon/2$ に適用したものでもある。従って求める値は $(8\pi\varepsilon)^{-1/2}$。

<a id="ex-mfl14-a02"></a>

### MFL14-A02 平均の分散と独立性

- Level: A
- 問題: 固定した $x$ について $Z_j=k_\varepsilon(x,X_j)f(X_j)$ を独立同分布とする。$\operatorname{Var}(n^{-1}\sum_jZ_j)=\operatorname{Var}(Z_1)/n$ を展開して示せ。$x=X_1$ に置き換えた場合に同じ論証を直ちに使えない理由も説明せよ。

**詳細解答**。$\operatorname{Var}(\sum_jZ_j)=\sum_j\operatorname{Var}(Z_j)+2\sum_{j<k}\operatorname{Cov}(Z_j,Z_k)$ である。固定 $x$ で $X_j$ が独立なら共分散が0、各分散が同一なので $n$ 倍になり、$n^2$ で割って結論を得る。$x=X_1$ では全 $Z_j$ に共通のランダムな $X_1$ が入る。例えば $j=1$ の自己核は $k(X_1,X_1)$ であり、$X_1$ を固定した後でも $j=1$ の項だけは他項と同じ標本分布でない。独立同分布という前提を失うため、[一点除外の定義](#def-mfl14-loo)が必要になる。

<a id="ex-mfl14-a03"></a>

### MFL14-A03 分母の確率的下界

- Level: A
- 問題: $q_\varepsilon(x)\ge p_{\min}/2$、$|\widehat q-q_\varepsilon|\le p_{\min}/4$ とする。$\widehat q$ の下界を求め、比 $\widehat T/\widehat q$ が定義できる理由を説明せよ。

**詳細解答**。三角不等式から $\widehat q\ge q_\varepsilon-|\widehat q-q_\varepsilon|\ge p_{\min}/2-p_{\min}/4=p_{\min}/4>0$。よって逆数は $1/\widehat q\le4/p_{\min}$ で抑えられる。Gaussian核が常に正であることは分母の非零を保証するが、比の誤差を定量的に抑えるにはこのような**一定の下界**が有用である。

<a id="ex-mfl14-a04"></a>

### MFL14-A04 自己点の差の恒等式

- Level: A
- 問題: $S>0$、$A\in\mathbb R$、$K>0$、$z\in\mathbb R$ に対して $(A+Kz)/(S+K)-A/S=K(z-A/S)/(S+K)$ を導け。$|z|,|A/S|\le F$ の場合の上界も示せ。

**詳細解答**。通分すると $[S(A+Kz)-A(S+K)]/[S(S+K)]$ で、$SA$ が打ち消されて $K(Sz-A)/[S(S+K)]$ になる。$S$ で約分すれば求める恒等式である。分子の絶対値は $K|z-A/S|\le K(|z|+|A/S|)\le2KF$、分母は $S+K\ge S$ なので差の絶対値は $2KF/S$ 以下。

<a id="ex-mfl14-b01"></a>

### MFL14-B01 二次モーメントの正確な次数

- Level: B
- 問題: $p,f\in C^3(M)$、$x\in M$ 固定として $\mathbb E[k_\varepsilon(x,X)^2f(X)^2]$ の先頭項を求めよ。$f(x)=0$ のとき「分散は必ず $\varepsilon^{-d/2}/n$ に漸近同値」と結論できるか。

**詳細解答**。[二乗核恒等式](#prop-mfl14-variance)を使い、$u=pf^2\in C^3(M)$ なので[核bias展開](../MFL13/index.md#thm-mfl13-bias)に帯域 $\varepsilon/2$ で代入する。

$$
\mathbb E[k_\varepsilon(x,X)^2f(X)^2]
=(8\pi\varepsilon)^{-d/2}\left[p(x)f(x)^2
+\frac\varepsilon2\left(\Delta_g(pf^2)(x)-\frac13\operatorname{Scal}(x)p(x)f(x)^2\right)
+O(\varepsilon^{3/2})\right].
$$

$f(x)=0$ なら先頭の係数は0である。分散は二次モーメントから平均の二乗を引くので、非負性は保たれるが一律に正の定数倍 $\varepsilon^{-d/2}/n$ と漸近同値とは言えない。この章の $C/(n\varepsilon^{d/2})$ は全 $x$ に使える**上界**である。

<a id="ex-mfl14-b02"></a>

### MFL14-B02 Bernstein不等式への尺度の代入

- Level: B
- 問題: 独立な中心化変数 $Y_j$ が $|Y_j|\le B\varepsilon^{-d/2}$、$\mathbb EY_j^2\le V\varepsilon^{-d/2}$ を満たす（$B,V>0$ は固定）。$0<t\le1$ に対して平均の偏差確率が $2\exp(-cn\varepsilon^{d/2}t^2)$ 以下になる $c$ を一つ示せ。

**詳細解答**。[Bernstein補題](#lem-mfl14-bernstein)に $b=B\varepsilon^{-d/2}$、$v=V\varepsilon^{-d/2}$ を代入すると

$$
\mathbb P\left(\left|n^{-1}\sum_jY_j\right|\ge t\right)
\le2\exp\left[-\frac{n\varepsilon^{d/2}t^2}{2(V+Bt/3)}\right].
$$

$t\le1$ だから $V+Bt/3\le V+B/3$。従って $c=1/[2(V+B/3)]>0$ と取ればよい。核平均のとき $B,V$ が $n,\varepsilon,x$ に依存しないことが重要である。

<a id="ex-mfl14-b03"></a>

### MFL14-B03 分子と分母を同時に制御する

- Level: B
- 問題: $\mu/q$ を母平均の比、$\widehat T/\widehat q$ を標本比とし、$q\ge a>0$、$|\mu/q|\le F$、$|\widehat T-\mu|\le t$、$|\widehat q-q|\le t\le a/2$ とする。比の誤差の上界を導き、$F=0$ の場合を検算せよ。

**詳細解答**。まず $\widehat q\ge q-t\ge a/2$。通分して

$$
\frac{\widehat T}{\widehat q}-\frac\mu q
=\frac{\widehat T-\mu}{\widehat q}
+\frac\mu q\frac{q-\widehat q}{\widehat q}
$$

なので、絶対値は $t/(a/2)+Ft/(a/2)=2(1+F)t/a$ 以下。ここで問題の仮定 $|\mu/q|\le F$ **だけ**からは、$F=0$ でも $\mu=0$ と分かるにとどまり、$\widehat T=0$ は従わない。実際、$q=\widehat q=a$、$\mu=0$、$\widehat T=t$ とすれば誤差は $t/a$ で、上界 $2t/a$ と整合する。一方、追加で $F=\|f\|_\infty=0$ と仮定した場合には $f\equiv0$、$\mu=\widehat T=0$ となって誤差は厳密に0である。

<a id="ex-mfl14-b04"></a>

### MFL14-B04 全標本点への和事象の上界

- Level: B
- 問題: 各 $i$ の失敗確率が $4e^{-c(n-1)\varepsilon^{d/2}t^2}$ 以下である。$t=A\sqrt{\log n/((n-1)\varepsilon^{d/2})}$ としたとき、全点の失敗確率と $A$ の条件を求めよ。$t\le t_0$ を保証する帯域条件も示せ。

**詳細解答**。$n$ 個の失敗事象の和の確率は各確率の和以下だから

$$
4n\exp\left[-c(n-1)\varepsilon^{d/2}
\frac{A^2\log n}{(n-1)\varepsilon^{d/2}}\right]
=4n^{1-cA^2}.
$$

$cA^2>1$ なら0へ向かう。本文では余裕を持たせ $cA^2>3$ とした。固定した $t_0>0$ に対して $t\to0$ は $\log n/[(n-1)\varepsilon^{d/2}]\to0$ から従う。これが一斉評価に必要な有効標本数の対数条件である。

<a id="ex-mfl14-c01"></a>

### MFL14-C01 円周で帯域・bias・対角項を一括判定する

- Level: C
- 問題: 半径 $R>0$ の円周 $M=S_R^1$ に、正の滑らかな確率密度 $p$ に従う独立同分布標本を置く。固定した $f\in C^3(M)$ に対して $\varepsilon_n=n^{-a}$（$a>0$）とする。
  - (1) kernel平均の分散の一般上界を $n$ のべきで表せ。
  - (2) 全 leave-one-out 標本点のgeneratorが $\mathcal L_pf(X_i)$ に一斉に確率収束するための、本文で証明した $a$ の範囲を出せ。
  - (3) 自己点を含めた場合の差の上界を $\varepsilon_n$ で割って評価せよ。
  - (4) $a=1/2$ は本文の条件を満たさない。それでも一般の発散を断言できない理由を述べよ。

**詳細解答**。（1）$d=1$ だから[分散命題](#prop-mfl14-variance)の一般上界は $C/(n\varepsilon_n^{1/2})=Cn^{-1+a/2}$。

（2）[generatorの系](#cor-mfl14-generator)が要求するのは

$$
\frac{n\varepsilon_n^{1/2+2}}{\log n}
=\frac{n^{1-5a/2}}{\log n}\longrightarrow\infty.
$$

よって $1-5a/2>0$、すなわち $0<a<2/5$ で十分である。これにより有効標本数 $n\varepsilon_n^{1/2}=n^{1-a/2}$ も発散する。

（3）[対角項の差](#prop-mfl14-loo)を $\varepsilon_n$ で割った上界は

$$
\frac{C}{(n-1)\varepsilon_n^{1/2+1}}
=O(n^{-1+3a/2}).
$$

$a<2/5$ なら $-1+3a/2<-2/5<0$ でこの項も0になる。これは高確率の分母下界事象上の評価であり、無条件の決定論的評価ではない。

（4）$a=1/2$ では $n\varepsilon_n^{5/2}/\log n=n^{-1/4}/\log n\to0$ なので、（2）の証明に必要な条件を満たさない。しかしこの章の集中界は滑らかな $f$ による相殺を活用せず、収束を保証するために導いた保守的な条件である。例えば $f\equiv1$ なら $\widehat P f=f=1$ が各標本で厳密に成り立ち、どの $a$ でもgenerator誤差は0である。従って条件の不成立からすべての関数で発散とは結論できない。

## 9. 次に密度補正を考える

有限標本の確率変動を減らしても、[行正規化kernelのbias](../MFL13/index.md#prop-mfl13-row)には $2\langle\nabla\log p,\nabla f\rangle$ が残る。MFL15では、密度による偏りをどの重み補正で消せるか、そのとき有限標本の分母と尺度条件がどう変わるかを考える。
