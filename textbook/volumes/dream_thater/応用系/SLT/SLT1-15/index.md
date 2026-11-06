# SLT1-15 PAC-Bayes不等式

<!-- definition-example-audit: strict -->

これまでの[有限仮説クラスの汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)では仮説の個数を、[一様安定性による期待汎化界](../SLT1-14/index.md#thm-slt1-14-expected-generalization)では算法の一点置換に対する感度を測った。別の選択肢は、学習結果を**一つの仮説ではなく、仮説上の確率分布**として出力することである。

例えば二つの予測器に訓練前は半分ずつ重みを置き、訓練後には良かった方へ $3/4$ の重みを置くとしよう。データを見て重みを変えたのに、固定仮説の集中不等式をそのまま適用してよいだろうか。この章では、訓練前に決める重みと訓練後に選ぶ重みのずれを相対エントロピーで課金することにより、どの事後分布にも同時に適用できる高確率界を導く。

学ぶ道筋は、二分布の意味と損失の平均 → KLを用いた分布変更 → 二値損失の指数モーメント → PAC-Bayes不等式 → 実際の重みの選択と仮定を外した反例、である。有限仮説クラスと $[0,1]$ の有界損失に限定するので、確率測度上の一般論に頼らず核心証明を最後まで追える。

## 1. 訓練後に「重み」を選ぶ

有限で空でない仮説クラスを $\mathcal H$、観測空間を $\mathcal Z$ とする。訓練標本 $S=(Z_1,\ldots,Z_n)$ は未知の分布 $P$ から独立同分布に得られ、$n\ge1$ とする。各仮説 $h$ の損失 $\ell(h,z)$ は $[0,1]$ に値を取る可測関数とする。[母集団リスクと経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)は

$$
R_P(h)=\mathbb E_{Z\sim P}\ell(h,Z),\qquad
\widehat R_S(h)=\frac1n\sum_{i=1}^n\ell(h,Z_i)
$$

である。以下では、訓練前に選んで固定する重みを $\pi$、訓練標本を見てから選んでよい重みを $\rho_S$ と記す。**事前分布（prior）と事後分布（posterior）**という呼び名はBayesの公式で更新したことを意味しない。$\rho_S$ は任意のデータ依存の確率分布でよい。

<a id="def-slt1-15-prior-posterior"></a>

<!-- formal-statement-start -->
> **定義（事前分布・事後分布と混合リスク）**  
> 有限集合 $\mathcal H$ 上の確率分布 $\pi$ を、$S\sim P^n$ に依存しない事前分布とする。事後分布 $\rho_S$ は標本 $S$ ごとに選ぶ $\mathcal H$ 上の確率分布とし、その各重みは $S$ の可測関数とする。任意の $\rho$ に対し、混合（Gibbs）予測器の母集団リスクと経験リスクを

$$
R_P(\rho)=\sum_{h\in\mathcal H}\rho(h)R_P(h),\qquad
\widehat R_S(\rho)=\sum_{h\in\mathcal H}\rho(h)\widehat R_S(h)
$$

> と定める。これは $h\sim\rho$ を無作為に選んだときの**損失の期待値**であり、多数決予測器のリスクとは一般に異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-15-prior-posterior -->
**定義の確認**：$\mathcal H=\{a,b\}$ とし、$\pi=(1/2,1/2)$、$\rho=(3/4,1/4)$ とする。各仮説の母集団リスクが $R_P(a)=1/5$、$R_P(b)=3/5$ なら

$$
R_P(\rho)=\frac34\cdot\frac15+\frac14\cdot\frac35=\frac3{10}.
$$

両重みは非負で和が1なので、確かに有限集合上の分布である。事後分布を標本によって変更するときも、実際の試験点 $Z\sim P$ は訓練標本および予測器の抽選から独立に取る。
<!-- definition-example-end -->

前章までの「仮説を一つ選ぶ」は、ある $h$ に重み1を置く分布 $\delta_h$ という特別な場合である。ただし一つを選ぶことがいつでも安く済むわけではない。事前重みが極端に小さかった仮説を後から選ぶほど情報量を多く使う。

## 2. KLは重みの変更料になる

[INFO2の相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)は底2の対数で定義された。本章の指数モーメントは自然指数 $e^x$ で扱うため、以下の $D_{\mathrm{KL}}$ は**自然対数** $\ln$ で計算する。したがって INFO2 のビット単位の値の $\ln2$ 倍になる。

<a id="def-slt1-15-kl"></a>

<!-- formal-statement-start -->
> **定義（事後分布の相対エントロピー）**  
> 有限集合 $\mathcal H$ 上の確率分布 $\rho,\pi$ に対し、$\rho(h)>0$ なら必ず $\pi(h)>0$ となるとき $\rho\ll\pi$ と書き、

$$
D_{\mathrm{KL}}(\rho\|\pi)
=\sum_{h:\rho(h)>0}\rho(h)\ln\frac{\rho(h)}{\pi(h)}
$$

> とする。$\rho\not\ll\pi$ なら $D_{\mathrm{KL}}(\rho\|\pi)=+\infty$ と定める。零重みの項は0とする。KLの向きは **事後 $\rho$ から事前 $\pi$** である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-15-kl -->
**定義の確認**：$\pi=(1/2,1/2)$、$\rho=(3/4,1/4)$ では

$$
D_{\mathrm{KL}}(\rho\|\pi)
=\frac34\ln\frac32+\frac14\ln\frac12
\simeq0.130812.
$$

これに対し、$\pi=(1,0)$ なのに $\rho=(1/2,1/2)$ を選べば $\rho\not\ll\pi$ であり、有限の保証は得られない。これは計算上の $\ln0$ の扱いにすぎないのではない。事前分布が可能性ゼロとした仮説を、あとから何の費用もなしに使用することを許さない条件である。相対エントロピーが非負であることは [Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)から従う。
<!-- definition-example-end -->

重み付きの平均へ移る鍵は、任意の実数値関数 $f$ の平均を、事前分布での**指数の平均**に変える次の補題である。

<a id="lem-slt1-15-change-measure"></a>

<!-- formal-statement-start -->
> **補題（有限仮説上の分布変更不等式）**  
> 有限で空でない集合 $\mathcal H$、その上の確率分布 $\pi,\rho$ で $\rho\ll\pi$ とし、$f:\mathcal H\to\mathbb R$ は任意の実数値関数とする。このとき

$$
\sum_h\rho(h)f(h)
\le D_{\mathrm{KL}}(\rho\|\pi)
  +\ln\sum_h\pi(h)e^{f(h)}.
$$

> 等号は $\rho(h)=\pi(h)e^{f(h)}/\sum_g\pi(g)e^{f(g)}$ が全ての $h$ で成り立つとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

事前重みに $e^{f(h)}$ を掛け、合計で割って新しい分布を作る。その分布と $\rho$ のKL非負性を展開すれば、不等式そのものが現れる。

<!-- proof-start -->
### 証明

$Z_f=\sum_g\pi(g)e^{f(g)}$ と置く。有限個の正の指数の加重和だから $0<Z_f<\infty$ である。$q_f(h)=\pi(h)e^{f(h)}/Z_f$ は非負で和1、$\rho\ll\pi$ から $\rho\ll q_f$ でもある。そこで[相対エントロピーの非負性](../../INFO/INFO2/index.md#thm-info2-gibbs)を自然対数へ換算して

$$
\begin{aligned}
0&\le D_{\mathrm{KL}}(\rho\|q_f)\\
&=\sum_{h:\rho(h)>0}\rho(h)
\ln\frac{\rho(h)Z_f}{\pi(h)e^{f(h)}}\\
&=D_{\mathrm{KL}}(\rho\|\pi)+\ln Z_f
-\sum_h\rho(h)f(h)
\end{aligned}
$$

を得る。移項して主張の不等式となる。Gibbs不等式の等号条件は $\rho=q_f$ であり、これが記載した指数重みである。
<!-- proof-end -->

これは訓練標本を固定した**決定論的な補題**であり、$f$ がデータによって変化していても、そのデータ上で全ての $\rho$ に同時に成り立つ。標本に関する高確率性は次に別途作る。

## 3. 有界損失から二値KLの指数モーメントへ

通常の偏差 $|\widehat R-R|$ に加え、二つの数 $q,p\in[0,1]$ をBernoulli分布の相対エントロピーとして比べると、平均が0または1に近い場合の情報も残せる。

<a id="def-slt1-15-binary-kl"></a>

<!-- formal-statement-start -->
> **定義（二値相対エントロピー）**  
> $p,q\in[0,1]$ に対し

$$
\operatorname{kl}(q\|p)
=q\ln\frac qp+(1-q)\ln\frac{1-q}{1-p}
$$

> と定める。$0\ln(0/a)=0$（$a>0$）とし、$q>0,p=0$ または $q<1,p=1$ なら値を $+\infty$ とする。$q=p\in\{0,1\}$ では値は0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-15-binary-kl -->
**定義の確認**：$q=1/4,p=1/2$ なら $\operatorname{kl}(q\|p)=\frac14\ln\frac12+\frac34\ln\frac32$ である。これは二点分布 $(q,1-q)$ と $(p,1-p)$ のKLそのもので、非負性は[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)から分かる。ここでも順序を交換してはいけない。
<!-- definition-example-end -->

特に重要なのは、$[0,1]$ にある独立標本の平均について、**二値分布でない損失にも**次の評価が使えることである。

<a id="lem-slt1-15-kl-moment"></a>

<!-- formal-statement-start -->
> **補題（有界標本平均の二値KL指数モーメント）**  
> $X_1,\ldots,X_n$ は独立同分布で $0\le X_i\le1$、$p=\mathbb E X_i$、$\overline X=n^{-1}\sum_iX_i$、$n\ge1$ とする。このとき

$$
\mathbb E\exp\{n\operatorname{kl}(\overline X\|p)\}
\le n+1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ平均 $p$ を持つ $[0,1]$ の変数は、凸関数の期待値を評価するとき、端点0と1だけを取るBernoulli変数に置き換えられる。Bernoulliの平均には二項分布の式がある。確率と指数の分母が相殺し、各項が高々1になる。

<!-- proof-start -->
### 証明

$p=0$ なら $X_i=0$ がほとんど確実、$p=1$ なら $X_i=1$ がほとんど確実である。どちらも指数の中は0で期待値は1なので成立する。以下 $0<p<1$ とする。

$\Phi(t)=\exp\{n\operatorname{kl}(t\|p)\}$ と置く。$0<t<1$ で

$$
\frac{d^2}{dt^2}\operatorname{kl}(t\|p)
=\frac1t+\frac1{1-t}>0.
$$

指数関数は単調増加かつ凸であるから $\Phi$ も凸で、端点まで連続に延長できる。任意の $u\in[0,1]$ と、他の座標を固定して得た定数 $c$ について、凸性から

$$
\Phi\!\left(\frac{c+u}{n}\right)
\le(1-u)\Phi\!\left(\frac cn\right)
+u\Phi\!\left(\frac{c+1}{n}\right).
$$

$X_i$ は他の座標と独立で平均が $p$ なので、両辺を $X_i$ について条件付き平均すると、右辺は $X_i$ の代わりに独立な $B_i\sim\operatorname{Bernoulli}(p)$ を入れた場合の条件付き期待値である。この操作を座標 $1,\ldots,n$ に順に施し、全て独立な $B_i$ に替えれば

$$
\mathbb E\Phi(\overline X)
\le\mathbb E\Phi\!\left(\frac1n\sum_iB_i\right).
$$

$K=\sum_iB_i\sim\operatorname{Binomial}(n,p)$ とする。$k=0,n$ でも $0^0=1$ と読むと、各 $k$ の寄与は

$$
\begin{aligned}
&\binom nk p^k(1-p)^{n-k}
\exp\!\left\{n\operatorname{kl}\!\left(\frac kn\middle\|p\right)\right\}\\
&\quad=\binom nk\left(\frac kn\right)^k
\left(1-\frac kn\right)^{n-k}\le1.
\end{aligned}
$$

最後の式は、成功確率 $k/n$ の二項分布が $K=k$ を取る確率であるから高々1。$k=0,\ldots,n$ の $n+1$ 項を足せば上界を得る。
<!-- proof-end -->

## 4. 標本から独立な事前分布なら、全ての事後分布へ同時保証

標本ごとに重みを選んでよい理由を明確にしよう。確率を評価するのは、**標本に依存しない事前重みで指数を平均した単一の確率変数**である。そこで作った一つの高確率事象の上では、[分布変更補題](#lem-slt1-15-change-measure)はどの事後分布にも使える。

<a id="thm-slt1-15-pac-bayes-kl"></a>

<!-- formal-statement-start -->
> **定理（有限仮説クラスのPAC-Bayes二値KL不等式）**  
> $\mathcal H$ は空でない有限集合、$S=(Z_1,\ldots,Z_n)\sim P^n$ は独立同分布標本で $n\ge1$、各損失 $\ell(h,z)$ は可測かつ $[0,1]$ に入るとする。$\pi$ は標本 $S$ と独立に固定された $\mathcal H$ 上の事前分布、$\delta\in(0,1)$ とする。標本の確率 $1-\delta$ 以上で、**同時に全ての** $\rho\ll\pi$ について

$$
\operatorname{kl}\!\left(
\widehat R_S(\rho)\middle\|R_P(\rho)\right)
\le\frac{D_{\mathrm{KL}}(\rho\|\pi)+\ln((n+1)/\delta)}n
$$

> が成立する。したがって標本から選んだ事後分布 $\rho_S$ にも同じ事象上で適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

各固定仮説について[指数モーメント補題](#lem-slt1-15-kl-moment)を適用し、事前重みで足してからMarkov不等式で一つの事象を作る。その事象上で分布変更補題を使い、さらに二値KLの凸性を使って、仮説ごとのKLの混合から混合リスク自体のKLへ移す。

<!-- proof-start -->
### 証明

固定した $h$ に対し $X_i=\ell(h,Z_i)$ と置く。定理の独立同分布性と有界性を満たし、$p=R_P(h)$、$\overline X=\widehat R_S(h)$ である。[有界標本平均の二値KL指数モーメント](#lem-slt1-15-kl-moment)から

$$
\mathbb E_S e^{n\operatorname{kl}(\widehat R_S(h)\|R_P(h))}
\le n+1.
$$

次の確率変数を作る。

$$
V(S)=\sum_h\pi(h)
e^{n\operatorname{kl}(\widehat R_S(h)\|R_P(h))}.
$$

$\pi$ が標本によらないので期待値と有限和を交換して $\mathbb E_SV(S)\le\sum_h\pi(h)(n+1)=n+1$ となる。[Markov不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を $V(S)$ と閾値 $(n+1)/\delta$ に適用すると

$$
\Pr_S\left\{V(S)>\frac{n+1}{\delta}\right\}\le\delta.
$$

よって少なくとも確率 $1-\delta$ の事象 $E$ 上で $\ln V(S)\le\ln((n+1)/\delta)$ である。$S\in E$ を一つ固定する。[分布変更補題](#lem-slt1-15-change-measure)へ

$$
f(h)=n\operatorname{kl}(\widehat R_S(h)\|R_P(h))
$$

を代入すると、任意の $\rho\ll\pi$ で

$$
n\sum_h\rho(h)\operatorname{kl}
(\widehat R_S(h)\|R_P(h))
\le D_{\mathrm{KL}}(\rho\|\pi)+\ln V(S).
$$

次に[対数和不等式](../../INFO/INFO2/index.md#lem-info2-log-sum)を自然対数に換算し、$a_h=\rho(h)\widehat R_S(h)$、$b_h=\rho(h)R_P(h)$ に適用する。同じ不等式を $a_h'=\rho(h)(1-\widehat R_S(h))$、$b_h'=\rho(h)(1-R_P(h))$ にも適用する。二つを足すと

$$
\begin{aligned}
&\operatorname{kl}\!\left(\sum_h\rho(h)\widehat R_S(h)
\middle\|\sum_h\rho(h)R_P(h)\right)\\
&\quad\le\sum_h\rho(h)
\operatorname{kl}(\widehat R_S(h)\|R_P(h)).
\end{aligned}
$$

端点で両者が0になる項は零項規約で扱う。そもそも $R_P(h)=0$ または1なら有界損失により $\widehat R_S(h)=R_P(h)$ が確率1であり、上の事象では無限値を生じない。両不等式を合わせ、$\ln V(S)$ の上界を代入して $n$ で割れば結論となる。事象 $E$ は $\rho$ を選ぶ前に決まっているので、**任意の事後分布への同時性**も証明された。
<!-- proof-end -->

二値KLの式は通常の絶対誤差にも直せる。そのための平方根への変換も、根拠を確認する。

<a id="lem-slt1-15-binary-pinsker"></a>

<!-- formal-statement-start -->
> **補題（二値KLから絶対差への評価）**  
> 任意の $q,p\in[0,1]$ に対し

$$
\operatorname{kl}(q\|p)\ge2(q-p)^2
$$

> が成立する。左辺は無限大となる場合も許す。
<!-- formal-statement-end -->

### 証明の見取り図

$q$ を固定して $p$ を動かすと、KLは $p=q$ で最小0となる。導関数に現れる $p(1-p)$ が高々 $1/4$ であることを使い、その最小点から積分する。

<!-- proof-start -->
### 証明

$0<p<1$ で $g(p)=\operatorname{kl}(q\|p)$ と置く。$q$ は固定して微分すると

$$
g'(p)=-\frac q p+\frac{1-q}{1-p}
=\frac{p-q}{p(1-p)}.
$$

$p(1-p)\le1/4$ なので、$p>q$ なら

$$
g(p)-g(q)=\int_q^p\frac{t-q}{t(1-t)}\,dt
\ge4\int_q^p(t-q)\,dt=2(p-q)^2.
$$

$p<q$ なら積分の向きを反転し、$g(p)-g(q)=\int_p^q(q-t)/(t(1-t))\,dt\ge2(q-p)^2$ となる。$q=0,1$ の境界は片側極限、$p=0,1$ は定義の無限大または零値で確認できる。
<!-- proof-end -->

<a id="cor-slt1-15-risk-gap"></a>

<!-- formal-statement-start -->
> **系（PAC-Bayesの二側リスク差界）**  
> [PAC-Bayes二値KL定理](#thm-slt1-15-pac-bayes-kl)と同じ有限仮説、独立同分布、可測な $[0,1]$ 損失、標本独立の事前分布 $\pi$、$\delta\in(0,1)$ の仮定の下で、確率 $1-\delta$ 以上で全ての $\rho\ll\pi$ に同時に

$$
|R_P(\rho)-\widehat R_S(\rho)|
\le\sqrt{\frac{D_{\mathrm{KL}}(\rho\|\pi)
+\ln((n+1)/\delta)}{2n}}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

二値KLの左辺を、絶対差の二乗で下から押さえる。

<!-- proof-start -->
### 証明

[二値KLの下界](#lem-slt1-15-binary-pinsker)へ $q=\widehat R_S(\rho)$、$p=R_P(\rho)$ を代入する。[PAC-Bayes二値KL定理](#thm-slt1-15-pac-bayes-kl)との間に挟んで

$$
2|\widehat R_S(\rho)-R_P(\rho)|^2
\le\frac{D_{\mathrm{KL}}(\rho\|\pi)+\ln((n+1)/\delta)}n
$$

を得る。両辺非負なので平方根を取れる。同一の高確率事象で全ての $\rho$ に成り立つ。
<!-- proof-end -->

### 数値で読む：事後重みを動かす

$n=100$ で二仮説 $a,b$ の経験損失がそれぞれ $1/5,3/5$、事前が $(1/2,1/2)$、事後を $(3/4,1/4)$ とする。経験混合損失は $3/10$、事前からのKLは約 $0.130812$ である。$\delta=0.05$ とすると [二側リスク差界](#cor-slt1-15-risk-gap)は

$$
R_P(\rho)\le\frac3{10}
+\sqrt{\frac{0.130812+\ln(101/0.05)}{200}}
\simeq0.497.
$$

これは個々の $h$ のリスクを別々に評価してから重み付けした結果ではない。標本を見て $\rho$ を選び直しても同じ事象で使える。一方、値が1を超える粗い上界になった場合は有効な数値保証とは言いにくく、その際には $R_P(\rho)\le1$ という自明な界の方が鋭い。

事後を一点 $\delta_h$ に集中させると、$\pi(h)>0$ なら $D_{\mathrm{KL}}(\delta_h\|\pi)=\ln(1/\pi(h))$ である。一様な事前 $\pi(h)=1/|\mathcal H|$ なら $\ln|\mathcal H|$ が現れ、[有限クラスの複雑度罰則](../SLT1-03/index.md#thm-slt1-03-finite-uniform)との対応が見える。ただし定数と導出方法は同じではない。

## 5. 指数傾斜と、もう一つのPAC-Bayes界

上で使った分布変更補題の等号条件は、経験損失に応じて重みを指数的に変える方法にもつながる。$\eta>0$ を訓練に先立ち指定したとき、$\pi(h)>0$ の候補に

$$
\rho_\eta(h)=\frac{\pi(h)e^{-\eta\widehat R_S(h)}}
{\sum_g\pi(g)e^{-\eta\widehat R_S(g)}}
$$

という重みを置く。これは確率分布である。分母は全重みの和を1に戻す正規化定数であり、$\eta$ を大きくすると訓練誤差の小さい候補へ寄る。

<a id="prop-slt1-15-gibbs-tilt"></a>

<!-- formal-statement-start -->
> **命題（経験リスクとKL罰則の最小化）**  
> 有限で空でない $\mathcal H$、確率分布 $\pi$、実数 $L_h$（$h\in\mathcal H$）、$\eta>0$ を固定する。$\rho\ll\pi$ の中で

$$
\sum_h\rho(h)L_h+\frac1\eta D_{\mathrm{KL}}(\rho\|\pi)
$$

> を最小にする分布は一意で、次のようになる。

$$
\rho_\eta(h)=\frac{\pi(h)e^{-\eta L_h}}{\sum_g\pi(g)e^{-\eta L_g}}.
$$

> 特に $L_h=\widehat R_S(h)$ とすれば指数傾斜した学習後の分布になる。
<!-- formal-statement-end -->

### 証明の見取り図

分布変更補題の等号条件を $f(h)=-\eta L_h$ に適用する。目的関数から残る定数は分母の対数である。

<!-- proof-start -->
### 証明

[分布変更補題](#lem-slt1-15-change-measure)の証明で用いた分布 $q_f$ に $f(h)=-\eta L_h$ を代入する。$Z_\eta=\sum_g\pi(g)e^{-\eta L_g}$ とすれば、同補題の計算を逆に読んで

$$
\begin{aligned}
&\eta\sum_h\rho(h)L_h+D_{\mathrm{KL}}(\rho\|\pi)\\
&\qquad=D_{\mathrm{KL}}(\rho\|\rho_\eta)-\ln Z_\eta
\ge-\ln Z_\eta.
\end{aligned}
$$

[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)の等号条件から、等号は $\rho=\rho_\eta$ に限る。$\eta$ で割れば結論となる。
<!-- proof-end -->

これは単に「経験誤差だけ最小にせよ」とは違う。事前重みから大きく移動することにも費用を払う。そして、この特定の重みを選んだこと自体は汎化保証ではない。[PAC-Bayes定理](#thm-slt1-15-pac-bayes-kl)の有界損失・独立性・事前固定の仮定を別に確認する必要がある。

平方根型とは別に、固定パラメータの一側界も覚えておこう。こちらは [Hoeffding補題](../../../解析系/HDP/HDP1/index.md#lem-hdp1-hoeffding)の指数モーメントを直接使う。

<a id="thm-slt1-15-fixed-lambda"></a>

<!-- formal-statement-start -->
> **定理（固定指数パラメータによるPAC-Bayes一側界）**  
> 有限で空でない $\mathcal H$、独立同分布標本 $S\sim P^n$（$n\ge1$）、可測な損失 $0\le\ell(h,z)\le1$、標本に依存しない事前分布 $\pi$、$\delta\in(0,1)$ を仮定する。**標本を観測する前に固定した** $\lambda>0$ について、確率 $1-\delta$ 以上で全ての $\rho\ll\pi$ に同時に

$$
R_P(\rho)\le\widehat R_S(\rho)
+\frac{D_{\mathrm{KL}}(\rho\|\pi)+\ln(1/\delta)}\lambda
+\frac{\lambda}{8n}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

固定仮説では独立な $n$ 個の有界損失にHoeffding補題を適用できる。事前で指数を平均しMarkov法で一つの事象を作った後、分布変更補題で任意の事後へ移す。

<!-- proof-start -->
### 証明

固定 $h$ について $Y_i=R_P(h)-\ell(h,Z_i)$ と置く。各 $Y_i$ は独立、平均0、区間幅1。$R_P(h)-\widehat R_S(h)=n^{-1}\sum_iY_i$ なので、[Hoeffding補題](../../../解析系/HDP/HDP1/index.md#lem-hdp1-hoeffding)を各 $Y_i$ へ指数パラメータ $\lambda/n$ で適用し

$$
\begin{aligned}
\mathbb E_S e^{\lambda(R_P(h)-\widehat R_S(h))}
&=\prod_{i=1}^n\mathbb E e^{(\lambda/n)Y_i}\\
&\le\prod_{i=1}^n e^{\lambda^2/(8n^2)}
=e^{\lambda^2/(8n)}.
\end{aligned}
$$

事前分布で重み付けして期待値を取ると

$$
\mathbb E_S\sum_h\pi(h)e^{\lambda(R_P(h)-\widehat R_S(h))}
\le e^{\lambda^2/(8n)}.
$$

[Markov不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)から確率 $1-\delta$ 以上で指数和は $e^{\lambda^2/(8n)}/\delta$ 以下である。その事象上で[分布変更補題](#lem-slt1-15-change-measure)に $f(h)=\lambda(R_P(h)-\widehat R_S(h))$ を代入する。

$$
\lambda(R_P(\rho)-\widehat R_S(\rho))
\le D_{\mathrm{KL}}(\rho\|\pi)
+\frac{\lambda^2}{8n}+\ln(1/\delta).
$$

$\lambda>0$ で割って結論を得る。標本についての事象は $\rho$ を選ぶ前に作られているので、同時性も成立する。
<!-- proof-end -->

ここでは $\lambda$ 自体を訓練後に最適化してはいけない。固定 $\lambda$ ごとに成功する事象が違うからである。複数の値を試すなら事前に有限個を決め、失敗確率を配分して和集合で制御する必要がある。対照的に[二値KL型の定理](#thm-slt1-15-pac-bayes-kl)は標本後に事後分布を選ぶ自由を、定理そのものが同時に保証している。

## 6. 何を外すと保証が崩れるか

事前分布を自由に学習後に選んでもよい、と誤解すると罰則を常に0にできてしまう。実際には、その方法で誤った予測が生じる。

<a id="prop-slt1-15-dependent-prior-counterexample"></a>

<!-- formal-statement-start -->
> **命題（標本依存の事前分布では保証できない）**  
> $n=100$、入力集合 $\mathcal X=\{1,\ldots,200\}$、$X\sim\operatorname{Uniform}(\mathcal X)$、ラベル $Y=0$、$0$–$1$ 損失、$\mathcal H=\{0,1\}^{\mathcal X}$ とする。$S=((X_1,0),\ldots,(X_n,0))$ は独立同分布標本とする。観測された入力では0、観測されなかった入力では1を返す $h_S\in\mathcal H$ を作り、$\rho_S=\pi_S=\delta_{h_S}$ と置く。このとき全標本で

$$
\widehat R_S(\rho_S)=0,\qquad
D_{\mathrm{KL}}(\rho_S\|\pi_S)=0,\qquad
R_P(\rho_S)\ge\frac12.
$$

> したがって $\pi_S$ を標本に依存してよいとすると、[PAC-Bayes二側リスク差界](#cor-slt1-15-risk-gap)の結論は一般に偽となる。
<!-- formal-statement-end -->

### 証明の見取り図

観測済みの入力は最大100種類なので、200種類のうち少なくとも100種類では逆のラベルを出す。経験損失は0なのに、真の損失は少なくとも半分となる。

<!-- proof-start -->
### 証明

$T(S)=\{X_1,\ldots,X_n\}\subset\mathcal X$ とする。$x\in T(S)$ なら $h_S(x)=0$、それ以外なら $h_S(x)=1$ と定めれば、観測点は全て正解するため $\widehat R_S(h_S)=0$ である。一方、$|T(S)|\le100$ なので

$$
R_P(h_S)=\Pr_{X\sim\operatorname{Uniform}(\mathcal X)}
\{X\notin T(S)\}
=\frac{200-|T(S)|}{200}\ge\frac12.
$$

同じ一点分布同士のKLは定義より0である。もしデータ依存の $\pi_S$ に対して[二側リスク差界](#cor-slt1-15-risk-gap)を誤用すると、$\delta=0.05$ で

$$
R_P(\rho_S)
\le\sqrt{\frac{\ln(101/0.05)}{200}}
\simeq0.195<\frac12
$$

を全標本で主張してしまう。これは矛盾である。証明の破綻箇所は[主定理の証明](#thm-slt1-15-pac-bayes-kl)における $\mathbb E_S\sum_h\pi(h)e^{f_S(h)}=\sum_h\pi(h)\mathbb E_Se^{f_S(h)}$ という事前重みの引き出しである。$\pi_S(h)$ が $S$ の関数ならこの等式は使えない。
<!-- proof-end -->

なお、同じ $\mathcal H$ 上で**訓練前に**一様事前を固定すれば、$\pi(h)=2^{-200}$ であり一点事後のKLは $200\ln2$ になる。主定理は破綻せず、代わりに複雑なクラスに見合う大きな罰則を請求する。データ依存の事前を扱う理論には、別の独立したデータや追加の情報量制御が必要になる。

もう二つの仮定にも注意する。訓練点が同じ乱数の複製なら独立標本としての指数モーメント評価が崩れ、対数損失や二乗損失が無制限なら $[0,1]$ からの凸比較とHoeffding補題を転用できない。いずれも結論が永久に不可能なのではなく、依存性・裾の大きさを別の仮定で評価する必要がある。

## 7. 演習

**問題 SLT1-15-A01（二仮説の混合リスクとKL）**
- Level: A

$\mathcal H=\{a,b\}$、$\pi=(1/2,1/2)$、$\rho=(3/4,1/4)$ とする。$R_P(a)=1/5$、$R_P(b)=3/5$ のとき、混合リスクと自然対数による $D_{\mathrm{KL}}(\rho\|\pi)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[事前分布・事後分布と混合リスク](#def-slt1-15-prior-posterior)の定義へ各重みとリスクを代入して

$$
R_P(\rho)=\frac34\cdot\frac15+\frac14\cdot\frac35=\frac3{10}.
$$

両事前重みは正なので $\rho\ll\pi$。従って[事後分布の相対エントロピー](#def-slt1-15-kl)の定義から

$$
D_{\mathrm{KL}}(\rho\|\pi)
=\frac34\ln\left(\frac{3/4}{1/2}\right)
+\frac14\ln\left(\frac{1/4}{1/2}\right)
=\frac34\ln\frac32+\frac14\ln\frac12
\simeq0.130812.
$$

重みの比を逆にすると別のKLになるので向きを保つ。
<!-- solution-end -->

**問題 SLT1-15-A02（事前の零重み）**
- Level: A

$\mathcal H=\{a,b\}$ で $\pi=(1,0)$、$\rho=(1/2,1/2)$ とする。$D_{\mathrm{KL}}(\rho\|\pi)$ と $D_{\mathrm{KL}}(\pi\|\rho)$ を計算し、PAC-Bayes界のどちらの向きが必要か述べよ。

<!-- solution-start -->
**詳細解答**。$\rho(b)=1/2>0$ だが $\pi(b)=0$ なので $\rho\not\ll\pi$ であり、[KLの零重み規約](#def-slt1-15-kl)から $D_{\mathrm{KL}}(\rho\|\pi)=+\infty$。逆に $\pi\ll\rho$ で、零重み項を除いて

$$
D_{\mathrm{KL}}(\pi\|\rho)
=1\cdot\ln\frac{1}{1/2}=\ln2.
$$

[PAC-Bayes定理](#thm-slt1-15-pac-bayes-kl)が使うのは前者である。後者が有限だからといって仮定を満たすことにはならない。
<!-- solution-end -->

**問題 SLT1-15-A03（高確率の数値界）**
- Level: A

$n=100$ の独立同分布標本、$[0,1]$ 損失、標本独立の $\pi=(1/2,1/2)$ を仮定する。訓練後に $\rho=(3/4,1/4)$ を選び、二仮説の経験リスクが $1/5,3/5$ だった。$\delta=0.05$ で[二側リスク差界](#cor-slt1-15-risk-gap)から $R_P(\rho)$ の上界を求めよ。

<!-- solution-start -->
**詳細解答**。混合経験リスクは

$$
\widehat R_S(\rho)=\frac34\cdot\frac15+\frac14\cdot\frac35=0.3.
$$

[事後分布の相対エントロピー](#def-slt1-15-kl)の定義から罰則は $D=\frac34\ln(3/2)+\frac14\ln(1/2)\simeq0.130812$。$n=100,\delta=0.05$ を代入し

$$
R_P(\rho)\le0.3+
\sqrt{\frac{0.130812+\ln2020}{200}}
\simeq0.3+0.1967=0.4967.
$$

これは事後をデータで選んだ後にも同一事象上で使える界である。
<!-- solution-end -->

**問題 SLT1-15-A04（分布変更補題の等号）**
- Level: A

$\mathcal H=\{a,b\}$、$\pi=(1/2,1/2)$、$f(a)=0$、$f(b)=\ln3$ とする。[分布変更補題](#lem-slt1-15-change-measure)の等号を達成する $\rho$ を求め、両辺を計算せよ。

<!-- solution-start -->
**詳細解答**。指数の事前平均は

$$
Z_f=\frac12e^0+\frac12e^{\ln3}=\frac12+\frac32=2.
$$

従って等号条件 $\rho(h)=\pi(h)e^{f(h)}/Z_f$ から $\rho=(1/4,3/4)$。左辺は $(3/4)\ln3$。右辺のKLは

$$
D_{\mathrm{KL}}(\rho\|\pi)
=\frac14\ln\frac12+\frac34\ln\frac32,
$$

これに $\ln Z_f=\ln2$ を足すと、対数をまとめて

$$
\frac14\ln\frac12+\frac34\ln\frac32+\ln2
=\frac34\ln3
$$

となり一致する。補題が単なる粗い上界ではなく、指数重みに対して等号を持つことを確認できた。
<!-- solution-end -->

**問題 SLT1-15-A05（二項指数モーメントを数える）**
- Level: A

$X_1,X_2$ は独立な $\operatorname{Bernoulli}(1/2)$、$\overline X=(X_1+X_2)/2$ とする。$\mathbb E e^{2\operatorname{kl}(\overline X\|1/2)}$ を直接求め、[指数モーメント補題](#lem-slt1-15-kl-moment)と比較せよ。

<!-- solution-start -->
**詳細解答**。$K=X_1+X_2$ は0,1,2を確率 $1/4,1/2,1/4$ で取る。$K=0,2$ では二値KLは $\ln2$、$K=1$ では0。よって

$$
\begin{aligned}
\mathbb E e^{2\operatorname{kl}(\overline X\|1/2)}
&=\frac14e^{2\ln2}+\frac12e^0+\frac14e^{2\ln2}\\
&=1+\frac12+1=\frac52\le3=n+1.
\end{aligned}
$$

ここでは上界3より厳密な値 $5/2$ を求められた。
<!-- solution-end -->

**問題 SLT1-15-B01（分布変更を出発点から証明）**
- Level: B

有限集合 $\mathcal H$ 上の $\rho\ll\pi$ と実数値 $f$ を考える。$q_f(h)=\pi(h)e^{f(h)}/Z_f$、$Z_f=\sum_h\pi(h)e^{f(h)}$ を用い、[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)から[分布変更不等式](#lem-slt1-15-change-measure)を証明せよ。等号条件も調べよ。

<!-- solution-start -->
**詳細解答**。$Z_f>0$ で有限、$q_f(h)\ge0$、$\sum_hq_f(h)=1$ だから $q_f$ は分布である。$\rho\ll\pi$ なら $\rho\ll q_f$。自然対数に換算した[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)を適用して

$$
\begin{aligned}
0&\le D_{\mathrm{KL}}(\rho\|q_f)
=\sum_{h:\rho(h)>0}\rho(h)
\ln\frac{\rho(h)}{\pi(h)e^{f(h)}/Z_f}\\
&=D_{\mathrm{KL}}(\rho\|\pi)-\sum_h\rho(h)f(h)+\ln Z_f.
\end{aligned}
$$

従って $\sum_h\rho(h)f(h)\le D_{\mathrm{KL}}(\rho\|\pi)+\ln Z_f$。Gibbs不等式の等号は $\rho=q_f$ のみであり、前提の零重みも保たれる。
<!-- solution-end -->

**問題 SLT1-15-B02（非Bernoulliの損失を二項分布で評価）**
- Level: B

$X_1,\ldots,X_n$ は独立同分布の $[0,1]$ 値変数で平均 $p\in(0,1)$ とする。$\Phi(t)=e^{n\operatorname{kl}(t\|p)}$ が凸であることを示し、各座標をBernoulli$(p)$ に置き換える操作から $\mathbb E\Phi(\overline X)\le n+1$ を導出せよ。

<!-- solution-start -->
**詳細解答**。二値KLの第2引数を固定したとき、$0<t<1$ で

$$
\frac{d^2}{dt^2}\operatorname{kl}(t\|p)
=\frac1t+\frac1{1-t}>0.
$$

指数は増加凸関数なので合成した $\Phi$ も凸であり、端点へ連続に延長できる。他の座標の和を $c$ と固定し、$u\in[0,1]$ に対する凸結合を使うと

$$
\Phi\!\left(\frac{c+u}{n}\right)
\le(1-u)\Phi(c/n)+u\Phi((c+1)/n).
$$

$u=X_i$ として他の座標に条件付ければ、$\mathbb E[X_i\mid\text{他座標}]=p$ であるから右辺の条件付き平均は $(1-p)\Phi(c/n)+p\Phi((c+1)/n)$。これは独立なBernoulli$(p)$ 変数 $B_i$ へ置換した場合と同じである。全座標を順次置換し $K=\sum_iB_i$ とすると

$$
\mathbb E\Phi(\overline X)
\le\sum_{k=0}^n\binom nk p^k(1-p)^{n-k}
e^{n\operatorname{kl}(k/n\|p)}.
$$

指数を展開して $p^k(1-p)^{n-k}$ を消すと各項は $\binom nk(k/n)^k(1-k/n)^{n-k}$。これは成功確率 $k/n$ の二項分布でちょうど $k$ 回成功する確率だから $\le1$。端点では $0^0=1$ とする。よって総和は $\le n+1$。
<!-- solution-end -->

**問題 SLT1-15-B03（KLの混合をリスクの混合に移す）**
- Level: B

$\rho$ は有限集合上の確率分布、$p_h,q_h\in[0,1]$ とする。[対数和不等式](../../INFO/INFO2/index.md#lem-info2-log-sum)を二度使い、

$$
\operatorname{kl}\!\left(\sum_h\rho(h)q_h\middle\|\sum_h\rho(h)p_h\right)
\le\sum_h\rho(h)\operatorname{kl}(q_h\|p_h)
$$

を証明せよ。

<!-- solution-start -->
**詳細解答**。右辺が無限大なら自明なので有限の場合を扱う。自然対数へ換算した[対数和不等式](../../INFO/INFO2/index.md#lem-info2-log-sum)を $a_h=\rho(h)q_h$、$b_h=\rho(h)p_h$ に適用する。$Q=\sum_h\rho(h)q_h$、$P=\sum_h\rho(h)p_h$ とすれば

$$
\sum_h\rho(h)q_h\ln\frac{q_h}{p_h}
\ge Q\ln\frac QP.
$$

同じ不等式を $a_h'=\rho(h)(1-q_h)$、$b_h'=\rho(h)(1-p_h)$ に適用して

$$
\sum_h\rho(h)(1-q_h)\ln\frac{1-q_h}{1-p_h}
\ge(1-Q)\ln\frac{1-Q}{1-P}.
$$

両辺を足し、零重み項は0として扱えば左辺は $\sum_h\rho(h)\operatorname{kl}(q_h\|p_h)$、右辺は $\operatorname{kl}(Q\|P)$ となる。
<!-- solution-end -->

**問題 SLT1-15-B04（固定 $\lambda$ の指数界）**
- Level: B

$S\sim P^n$ は独立同分布、$\ell(h,z)\in[0,1]$、$\pi$ は標本独立、$\lambda>0$ は標本観測前に固定とする。[Hoeffding補題](../../../解析系/HDP/HDP1/index.md#lem-hdp1-hoeffding)から、全事後に同時な一側PAC-Bayes界を導け。また $\lambda$ を標本後に自由に選ぶ際の論理上の問題を説明せよ。

<!-- solution-start -->
**詳細解答**。固定 $h$ に対して $Y_i=R_P(h)-\ell(h,Z_i)$ は独立で平均0、区間幅1。[Hoeffding補題](../../../解析系/HDP/HDP1/index.md#lem-hdp1-hoeffding)を各 $Y_i$ に $\lambda/n$ で適用する。

$$
\mathbb E_S e^{\lambda(R_P(h)-\widehat R_S(h))}
=\prod_i\mathbb E e^{(\lambda/n)Y_i}
\le e^{\lambda^2/(8n)}.
$$

$\pi$ が固定なので $\mathbb E_S\sum_h\pi(h)e^{\lambda(R_P(h)-\widehat R_S(h))}\le e^{\lambda^2/(8n)}$。この非負変数へ[Markov不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を閾値 $e^{\lambda^2/(8n)}/\delta$ で適用して、確率 $1-\delta$ の事象上で指数和の対数が $\lambda^2/(8n)+\ln(1/\delta)$ 以下となる。[分布変更補題](#lem-slt1-15-change-measure)に $f(h)=\lambda(R_P(h)-\widehat R_S(h))$ を代入し、$\lambda>0$ で割れば

$$
R_P(\rho)\le\widehat R_S(\rho)
+\frac{D_{\mathrm{KL}}(\rho\|\pi)+\ln(1/\delta)}\lambda
+\frac\lambda{8n}.
$$

この事象は**固定した** $\lambda$ に対するものである。観測後に別の $\lambda$ を採用した場合に同じ事象が保証されるとは言えない。有限グリッドを事前に用意して失敗確率を配分すれば複数パラメータへ拡張できる。
<!-- solution-end -->

**問題 SLT1-15-B05（事前分布を学習後に合わせてはいけない）**
- Level: B

$n=100$、$\mathcal X=\{1,\ldots,200\}$ は一様、ラベルは常に0、仮説は全ての二値関数、損失は0–1とする。標本で見た入力だけ0を返す $h_S$ を考える。事後と「事前」をともに $\delta_{h_S}$ とした場合の誤った界と、訓練前に全仮説へ一様事前を置いた場合のKLを比較せよ。

<!-- solution-start -->
**詳細解答**。観測済みの入力は高々100個なので、$h_S$ は標本上全て正解し $\widehat R_S(h_S)=0$ だが、少なくとも100個の未観測入力で誤るため $R_P(h_S)\ge100/200=1/2$。同じ一点分布同士ならKLは0で、誤って[二側リスク差界](#cor-slt1-15-risk-gap)へ代入すると $\delta=0.05$ の場合 $R_P(h_S)\le\sqrt{\ln2020/200}\simeq0.195$ という偽の結論を得る。

訓練前に一様事前を固定したなら仮説数は $2^{200}$ で、各重みは $2^{-200}$。[事後分布の相対エントロピー](#def-slt1-15-kl)の定義より一点事後の費用は

$$
D_{\mathrm{KL}}(\delta_{h_S}\|\pi)
=\ln\frac1{2^{-200}}=200\ln2.
$$

こちらは主定理の仮定を満たすが界は粗い。両者の相違は単にKLを小さく見積もったかではなく、**標本非依存の事前という仮定を壊したか**である。
<!-- solution-end -->

**問題 SLT1-15-C01（三仮説で事後選択と保証を比較する）**
- Level: C

$\mathcal H=\{a,b,c\}$、$n=200$、$S\sim P^{200}$ は独立同分布で、損失は可測かつ $[0,1]$。訓練前に固定した事前分布は $\pi=(1/2,1/4,1/4)$、観測した各仮説の経験リスクは $\widehat R_S(a)=0.1$、$\widehat R_S(b)=0.3$、$\widehat R_S(c)=0.8$ とする。

1. 事後 $\rho=(1/2,1/2,0)$ の経験混合リスクとKLを定義から計算せよ。
2. $\delta=0.05$ の[二側リスク差界](#cor-slt1-15-risk-gap)で $R_P(\rho)$ の上界を求めよ。
3. 一点事後 $\rho'=\delta_a$ について同様に求めて比較せよ。訓練後に有利な事後を比較したことが高確率保証を壊さない理由を、主定理の証明の事象の作り方に遡って説明せよ。

<!-- solution-start -->
**詳細解答**。**(1)** [事前分布・事後分布と混合リスク](#def-slt1-15-prior-posterior)の定義から

$$
\widehat R_S(\rho)
=\frac12\cdot0.1+\frac12\cdot0.3+0\cdot0.8=0.2.
$$

$\pi$ は全仮説へ正重みを置くので $\rho\ll\pi$。零重みの $c$ は和から除き、[事後分布の相対エントロピー](#def-slt1-15-kl)の定義を用いる。

$$
\begin{aligned}
D_{\mathrm{KL}}(\rho\|\pi)
&=\frac12\ln\frac{1/2}{1/2}
+\frac12\ln\frac{1/2}{1/4}\\
&=\frac12\ln2\simeq0.346574.
\end{aligned}
$$

**(2)** 独立同分布・損失有界・事前固定は問題で与えられている。[PAC-Bayesの二側リスク差界](#cor-slt1-15-risk-gap)へ $n=200,\delta=0.05$ と今求めたKLを入れる。

$$
\begin{aligned}
R_P(\rho)&\le0.2+
\sqrt{\frac{(\ln2)/2+\ln(201/0.05)}{400}}\\
&=0.2+\sqrt{\frac{0.346574+\ln4020}{400}}
\simeq0.3470.
\end{aligned}
$$

**(3)** 一点事後は $\widehat R_S(\rho')=0.1$。KLの唯一の非零項は $\ln(1/(1/2))=\ln2$ なので

$$
\begin{aligned}
R_P(\rho')&\le0.1+
\sqrt{\frac{\ln2+\ln4020}{400}}\\
&\simeq0.1+0.1499=0.2499.
\end{aligned}
$$

この標本では一点事後の上界の方が小さい。もっとも、ある事後が全ての分布・全ての標本で常に最良という主張ではない。[PAC-Bayes二値KL定理](#thm-slt1-15-pac-bayes-kl)の証明で高確率事象を決めるのは

$$
V(S)=\sum_h\pi(h)e^{200\operatorname{kl}(\widehat R_S(h)\|R_P(h))}
$$

という**事前分布だけで平均した**一つの確率変数である。$\rho$ を代入する前に $V(S)\le201/0.05$ という事象を作り、その上で分布変更補題を**全事後に同時適用**する。従って同じ観測標本で二つの事後を比較して一方を選んでも、追加の失敗確率を足す必要はない。標本を見て $\pi$ 自体を変えると、この議論は成立しない。
<!-- solution-end -->

## 8. まとめ

- 訓練後に選ぶ混合予測器の母集団リスクを、経験混合リスクと **$D_{\mathrm{KL}}(\rho\|\pi)$** で評価できる。事前は標本から独立、事後は標本依存でよい。
- [分布変更補題](#lem-slt1-15-change-measure)が任意の事後への移行を可能にし、[有界損失の指数モーメント](#lem-slt1-15-kl-moment)とMarkov法が高確率事象を作る。
- $[0,1]$ 有界、独立同分布、有限仮説という仮定を外した定理ではない。特に、訓練標本に合わせて事前まで選ぶと[具体的な反例](#prop-slt1-15-dependent-prior-counterexample)で失敗する。

次の SLT1-16 では、仮説検定と情報不等式を用い、こうした上界と対になる標本複雑度の下限を調べる。
