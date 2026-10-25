# ML2-10 Monte Carlo・重要度サンプリング

[有限状態の ELBO 恒等式と等号条件](../ML2-08/index.md#thm-ml2-08-elbo-identity)から、正規化定数（周辺尤度）を計算せずとも、近似した事後分布の下界を評価できるようになった。しかし事後分布に関する期待値を計算しようとすると、真の事後分布から直接標本を引くこと自体が難しい。そこで、**標本を引ける別の分布**を使い、重み付き平均で元の期待値を求めたい。

既習の[Monte Carlo推定量](../../../計算系/MC/MC1/index.md#def-mc1-monte-carlo-estimator)と[重点サンプリング](../../../計算系/MC/MC3/index.md#def-mc3-importance-sampling)を出発点とする。本講の新しい問題は、元の分布の正規化定数が未知の場合である。分子と分母を同じ標本で推定して割ると、未知の定数は消えるが、有限標本の不偏性も失う。この違いを定理と二状態の反例で確かめ、重みの有効標本サイズという診断値の限界まで検討する。

## 1. 正規化できない事後分布

有限状態集合 $\mathcal Z$ と観測値 $x$、固定した母数 $\theta$ を考える。非負の同時重み $f(z)=p_\theta(x,z)$、その総和 $Z$、事後分布 $\pi$、求めたい期待値 $I$ を

$$
Z=\sum_{z\in\mathcal Z}f(z)\in(0,\infty),\qquad
\pi(z)=\frac{f(z)}Z,\qquad
I=\sum_{z\in\mathcal Z}h(z)\pi(z)
$$

と置く。$h$ は有限実数値関数である。二状態 $\mathcal Z=\{0,1\}$ で $f(0)=3$、$f(1)=1$、$h(z)=z$ なら $Z=4$、$\pi=(3/4,1/4)$、$I=1/4$。小さな集合では列挙できるが、巨大な状態空間ではこの総和は直接求めにくい。

別の確率質量関数 $q$ から独立同分布標本 $X_1,\ldots,X_N$ を生成する。ただし **$f(z)>0$ なら $q(z)>0$** を要求する。提案分布 $q$ の観測頻度を元の重みに補正する非正規化重みは

$$
w(z)=\frac{f(z)}{q(z)}\quad(q(z)>0)
$$

である。$q$ の下で重みを平均すると、$q$ が約分されて

$$
E_q[w(X)]=\sum_{q(z)>0}q(z)\frac{f(z)}{q(z)}=Z,
\qquad
E_q[w(X)h(X)]=\sum_{q(z)>0}f(z)h(z)=ZI.
$$

これは[重点サンプリングの不偏性・分散公式](../../../計算系/MC/MC3/index.md#thm-mc3-importance-sampling)の基本操作である。未知の $Z$ が二つの期待値の**比**で消えることに注目する。

## 2. 同じ標本で分子と分母を作る

重みの合計で各重みを割れば、非負で総和1の係数になる。これを $h(X_i)$ に掛けて足すことにする。

<a id="def-ml2-10-snis"></a>

<!-- formal-statement-start -->
> **定義（自己正規化重点サンプリング推定量）**
> 有限集合 $\mathcal Z$ 上で $f:\mathcal Z\to[0,\infty)$、$0<Z=\sum_zf(z)<\infty$ とし、$h:\mathcal Z\to\mathbb R$ を評価関数とする。提案確率質量関数 $q$ は $f(z)>0\Rightarrow q(z)>0$ を満たす。$N\ge1$、$X_1,\ldots,X_N$ は $q$ からの独立同分布標本とし、$q(z)>0$ で $w(z)=f(z)/q(z)$ と定める。
>
> $S_N=\sum_{i=1}^Nw(X_i)>0$ の事象上で、**自己正規化重点サンプリング推定量**を次で定義する。

$$
\widehat I_N^{\mathrm{SN}}
=\frac{\sum_{i=1}^Nw(X_i)h(X_i)}{S_N}
=\sum_{i=1}^N\widetilde w_i h(X_i),
\qquad \widetilde w_i=\frac{w(X_i)}{S_N}.
$$

> $S_N=0$ の場合、この比は定義しない。特に $q(z)>0$ の全状態で $f(z)>0$ なら分母は確実に正となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-10-snis -->
**定義の確認**。上の二状態で $q=(1/2,1/2)$ とする。目標の二状態はいずれも正で、提案も正だから台条件を満たす。重みを計算すると

$$
w(0)=\frac3{1/2}=6,\qquad w(1)=\frac1{1/2}=2.
$$

いずれも正である。二標本が $(0,1)$ なら $S_2=6+2=8>0$ となり、正規化係数は $(\widetilde w_1,\widetilde w_2)=(3/4,1/4)$ で、非負かつ総和1となる。よって

$$
\widehat I_2^{\mathrm{SN}}=\frac{6\cdot0+2\cdot1}{6+2}=\frac14.
$$

この標本では偶然真値と一致するが、他の標本でも一致するとは限らない。
<!-- definition-example-end -->

連続型では、共通の基準測度について和を積分に置き換える。$f$ を非負可測関数、$q$ を積分1の提案密度とし、$0<Z=\int f<\infty$、$f>0\Rightarrow q>0$ がほとんど至るところで成立するとする。$\int |h|f<\infty$ なら同じ式で $E_qw=Z$、$E_q(wh)=ZI$ が成り立つ。

以下の $f^2/q$、$h^2f^2/q$ などの積分では、$q=0$ の点で被積分関数を0と定める。台条件によってその点では $f=0$ がほとんど至るところ成立し、$0/0$ を計算する必要はない。

台条件は「確率の小さい状態なら無視してよい」という意味ではない。$f>0$ なのに $q=0$ の領域があると、その領域は何回標本を引いても現れない。また $f=0$ の状態を提案が引く場合、**全標本の重みが0**になれば比は未定義となる。実装ではその事象を例外として扱う。

## 3. 分子と分母の分散、比の偏り

非正規化分子と分母の標本平均を

$$
\widehat A_N=\frac1N\sum_{i=1}^Nw(X_i)h(X_i),\qquad
\widehat Z_N=\frac1N\sum_{i=1}^Nw(X_i)
$$

とする。$\widehat I_N^{\mathrm{SN}}=\widehat A_N/\widehat Z_N$ である。

<a id="prop-ml2-10-unnormalized-moments"></a>

<!-- formal-statement-start -->
> **命題（非正規化分子・分母推定の期待値と分散）**
> 共通の基準測度上の非負可測関数 $f$ と提案確率密度（有限状態では確率質量関数）$q$ は、$0<Z=\int f<\infty$ および $f>0\Rightarrow q>0$ をほとんど至るところ満たすとする。
>
> 実数値可測関数 $h$ について $A=\int hf$ とし、$\int h^2f^2/q<\infty$、$\int f^2/q<\infty$ を仮定する。これらの積分の被積分関数は $q=0$ で0と定める。
>
> $X_i$ は $q$ から独立同分布に従い、$q>0$ で $w=f/q$ とすると、

$$
E_q\widehat A_N=A,\quad E_q\widehat Z_N=Z,
$$

$$
\operatorname{Var}_q(\widehat A_N)
=\frac1N\left(\int\frac{h^2f^2}{q}-A^2\right),\qquad
\operatorname{Var}_q(\widehat Z_N)
=\frac1N\left(\int\frac{f^2}{q}-Z^2\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

密度比で元の積分を復元する。二次モーメントでは分母に $q$ が一つ残り、そこが有限分散の条件になる。

<!-- proof-start -->
### 証明

二乗可積分性と [Cauchy–Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz) を、$q$ の下で $wh$ および $w$ と定数1の積に適用すると、$E_q|wh|$、$E_qw$ は有限である。台条件から $q=0$ の領域では $f=0$ がほとんど至るところ成立する。ゆえに

$$
\begin{aligned}
E_q[wh]&=\int_{\{q>0\}}\frac{fh}{q}q=\int fh=A,\\
E_q[w]&=\int_{\{q>0\}}\frac fq q=\int f=Z,\\
E_q[(wh)^2]&=\int_{\{q>0\}}\frac{f^2h^2}{q},\\
E_q[w^2]&=\int_{\{q>0\}}\frac{f^2}{q}.
\end{aligned}
$$

独立性より異なる標本番号の共分散は0である。そこで $\operatorname{Var}(N^{-1}\sum_iY_i)=N^{-2}\sum_i\operatorname{Var}(Y_i)=\operatorname{Var}(Y_1)/N$ を $Y_i=w(X_i)h(X_i)$ と $Y_i=w(X_i)$ に適用すれば結論を得る。$\square$
<!-- proof-end -->

この命題からは $E(\widehat A_N/\widehat Z_N)=A/Z$ とは結論できない。**期待値と割り算は交換できない**からである。二状態の $f=(3,1)$、$q=(1/2,1/2)$、$h(z)=z$ で $N=2$ の全標本を列挙する。

| $(X_1,X_2)$ | 重み | $\widehat I_2^{\mathrm{SN}}$ | 確率 |
| --- | --- | ---: | ---: |
| $(0,0)$ | $(6,6)$ | $0$ | $1/4$ |
| $(0,1)$ | $(6,2)$ | $1/4$ | $1/4$ |
| $(1,0)$ | $(2,6)$ | $1/4$ | $1/4$ |
| $(1,1)$ | $(2,2)$ | $1$ | $1/4$ |

$$
E_q[\widehat I_2^{\mathrm{SN}}]
=\frac14\left(0+\frac14+\frac14+1\right)
=\frac38,\qquad
E_q[\widehat I_2^{\mathrm{SN}}]-I=\frac18.
$$

一標本では $\widehat I_1^{\mathrm{SN}}=h(X_1)$ なので、その期待値は $1/2$ となる。分子と分母がそれぞれ不偏であっても、自己正規化した比は有限標本で一般に偏る。

## 4. 標本数を増やすと何が保証されるか

有限標本の偏りと、標本数を増やしたときの正しさは異なる問題である。次の結果で、必要な可積分性を区別する。

<a id="thm-ml2-10-snis-limit"></a>

<!-- formal-statement-start -->
> **定理（自己正規化推定の一致性と漸近分布）**
> 共通の基準測度上の非負可測関数 $f$ と提案確率密度 $q$ は、$0<Z=\int f<\infty$、$f>0\Rightarrow q>0$ をほとんど至るところ満たすものとする。実数値可測関数 $h$ は $\int|h|f<\infty$ を満たすとし、以下の積分では $q=0$ で被積分関数を0と定める。

$$
I=\frac{\int hf}{Z},\qquad w(z)=\frac{f(z)}{q(z)}\quad(q(z)>0)
$$

> と定める。$X_1,X_2,\ldots$ は $q$ からの独立同分布標本とする。自己正規化推定量を次で定め、分母が正の場合に考える。

$$
\widehat I_N^{\mathrm{SN}}
=\frac{\sum_iw(X_i)h(X_i)}{\sum_iw(X_i)}.
$$
>
> (i) ほとんど確実に、ある番号以降すべての分母が正であり、$\widehat I_N^{\mathrm{SN}}\to I$ となる。
>
> (ii) さらに次の二次モーメント条件が成立するなら、

$$
\int\frac{f(z)^2(h(z)-I)^2}{q(z)}\,dz<\infty,
$$

> 以下の分布収束が成立する。

$$
\sqrt N(\widehat I_N^{\mathrm{SN}}-I)
\ \xrightarrow{\ d\ }\ N(0,\tau^2),\qquad
\tau^2=\frac1{Z^2}\int\frac{f(z)^2(h(z)-I)^2}{q(z)}\,dz.
$$

> $\tau^2=0$ の右辺は0に集中する退化分布として解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

一致性を示すには、分子と分母に[可積分な独立同分布変数の強大数則](../../../解析系/F0/F0-00P5A/index.md#thm-iid-integrable-slln)を個別に適用する。漸近分布は分子だけを見ず、**分子から真値 $I$ 倍の分母を引く**と平均0の標本平均が現れることを使う。

<!-- proof-start -->
### 証明

台条件と可積分性から $E_qw=Z$、$E_q|wh|=\int|h|f<\infty$ が成立する。[可積分な独立同分布変数の強大数則](../../../解析系/F0/F0-00P5A/index.md#thm-iid-integrable-slln)をそれぞれに適用すると、

$$
\widehat Z_N=\frac1N\sum_{i=1}^Nw(X_i)\longrightarrow Z>0,\qquad
\widehat A_N=\frac1N\sum_{i=1}^Nw(X_i)h(X_i)\longrightarrow ZI
$$

がほとんど確実に成立する。このような標本列では、ある番号以降 $\widehat Z_N>Z/2>0$ となるので比が定義できる。従って

$$
\widehat I_N^{\mathrm{SN}}-I
=\frac{\widehat A_N-I\widehat Z_N}{\widehat Z_N}
\longrightarrow\frac{ZI-IZ}{Z}=0.
$$

(ii) について $Y_i=w(X_i)(h(X_i)-I)$ と置く。期待値と分散は

$$
E_qY_i=ZI-IZ=0,\qquad
\operatorname{Var}_q(Y_i)
=E_qY_i^2
=\int\frac{f(z)^2(h(z)-I)^2}{q(z)}\,dz<\infty.
$$

ここで $\sigma_Y^2=E_qY_1^2$ と置く。$\sigma_Y^2>0$ なら、$Y_i$ が独立同分布で平均0、有限で正の分散 $\sigma_Y^2$ を持つことから、[Monte Carlo中心極限定理](../../../計算系/MC/MC1/index.md#thm-mc1-clt)を適用できる。

$\sigma_Y^2=0$ なら、任意の $\varepsilon>0$ に対して非負性より

$$
0=E_qY_i^2\ge\varepsilon^2P_q(|Y_i|\ge\varepsilon)
$$

である。特に $\varepsilon=1/m$（$m=1,2,\ldots$）を使うと、$P_q(Y_i\ne0)=0$ が従う。可算個の標本番号について同時に $Y_i=0$ がほとんど確実に成立するため、次の標本和は各 $N$ で0となる。従って退化正規分布を含め、いずれの場合も

$$
\frac1{\sqrt N}\sum_{i=1}^NY_i
\ \xrightarrow{\ d\ }\ N(0,E_qY_1^2)
$$

を得る。他方、比の差を厳密に書き直せば

$$
\sqrt N(\widehat I_N^{\mathrm{SN}}-I)
=\frac1{\widehat Z_N}\frac1{\sqrt N}\sum_{i=1}^NY_i.
$$

既に $\widehat Z_N\to Z>0$ がほとんど確実に成立するので、[Slutsky の定理](../../../解析系/F0/F0-00P7A/index.md#thm-f0-00p7a-slutsky)の積・商の形を、収束先の定数が $Z\ne0$ であることを確認して適用する。右辺は分散 $E_qY_1^2/Z^2$ の正規分布へ収束する。$\square$
<!-- proof-end -->

二状態の例では $I=1/4$、$Z=4$、$w=(6,2)$ なので

$$
Y(0)=6(0-1/4)=-\frac32,\qquad
Y(1)=2(1-1/4)=\frac32.
$$

$E_qY^2=(1/2)(9/4)+(1/2)(9/4)=9/4$、従って $\tau^2=(9/4)/16=9/64$ となる。大きな標本数での分散はおよそ $9/(64N)$ だが、有限標本で厳密に等しいとは主張していない。

## 5. 重みの集中を測る

$N$ 個の標本があっても、一つの重みが他の重みの合計よりはるかに大きければ、自己正規化推定量はほぼ一標本の $h(X_i)$ となる。重みの二乗和から、この集中を測る数を構成する。

<a id="def-ml2-10-ess"></a>

<!-- formal-statement-start -->
> **定義（重みの経験的有効標本サイズ）**
> $N\ge1$、非負重み $w_1,\ldots,w_N$ の和 $S=\sum_iw_i$ が正とする。正規化係数 $\widetilde w_i=w_i/S$ から、重みの**経験的有効標本サイズ**（weight ESS）を次で定義する。

$$
N_{\mathrm{eff}}^{(w)}
=\frac1{\sum_{i=1}^N\widetilde w_i^2}
=\frac{(\sum_{i=1}^Nw_i)^2}{\sum_{i=1}^Nw_i^2}.
$$

> これは重みの集中を表す標本診断値であり、任意の $h$ の推定誤差や分散を直接与えるものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-10-ess -->
**定義の確認**。重み $(6,2)$ では和 $S=8>0$、二乗和 $36+4=40>0$、正規化係数は $(3/4,1/4)$。両係数は非負で和1なので

$$
N_{\mathrm{eff}}^{(w)}
=\frac1{(3/4)^2+(1/4)^2}
=\frac{64}{40}=\frac85=1.6.
$$

重み $(2,2)$ なら正規化後 $(1/2,1/2)$ となり、$N_{\mathrm{eff}}^{(w)}=2$ である。
<!-- definition-example-end -->

<a id="prop-ml2-10-ess-bounds"></a>

<!-- formal-statement-start -->
> **命題（経験的有効標本サイズの範囲と極限）**
> $N\ge1$、$w_i\ge0$ かつ $\sum_iw_i>0$ なら

$$
1\le N_{\mathrm{eff}}^{(w)}\le N.
$$

> 上限の等号は全重みが等しい場合に限り、下限の等号は正の重みがちょうど一つの場合に限る。さらに $X_i$ が提案分布 $q$ から独立同分布、$w(X_i)\ge0$、$E_qw=Z>0$、$E_qw^2<\infty$ なら、

$$
\frac{N_{\mathrm{eff}}^{(w)}}N
\longrightarrow\frac{Z^2}{E_q[w(X)^2]}
\quad\text{ほとんど確実に}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

下限には和を二乗したときの交差項の非負性、上限には [Cauchy–Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz) を使う。極限は重みと重みの二乗への大数の法則で求める。

<!-- proof-start -->
### 証明

$S=\sum_iw_i>0$ とすると、

$$
S^2=\sum_iw_i^2+2\sum_{i<j}w_iw_j\ge\sum_iw_i^2>0
$$

なので $N_{\mathrm{eff}}^{(w)}\ge1$。等号はすべての $i<j$ について $w_iw_j=0$、すなわち正の重みが一つだけのときである。一方、Cauchy–Schwarz により

$$
\left(\sum_iw_i\cdot1\right)^2
\le\left(\sum_iw_i^2\right)\left(\sum_i1^2\right)
=N\sum_iw_i^2.
$$

これで上限と、等号条件である「重み列が定数列」が得られる。極限では [可積分な独立同分布変数の強大数則](../../../解析系/F0/F0-00P5A/index.md#thm-iid-integrable-slln)を、有限な期待値 $E_qw=Z$ を持つ $w$ と、$E_qw^2<\infty$ を満たす $w^2$ にそれぞれ適用する。

$$
\frac{N_{\mathrm{eff}}^{(w)}}N
=\frac{(N^{-1}\sum_iw(X_i))^2}{N^{-1}\sum_iw(X_i)^2}
\longrightarrow\frac{Z^2}{E_qw^2}.
$$

$E_qw^2\ge(E_qw)^2=Z^2>0$ なので極限分母は正である。$\square$
<!-- proof-end -->

**ESSが高くても誤差が小さいとは限らない。** 目標が $\pi(0)=\pi(1)=1/2$、提案が $q(0)=0.99$、$q(1)=0.01$、$h(z)=z$ の二状態模型を考える。台条件は両状態で成り立つ。ところが $N=10$ 標本のすべてが0である確率は

$$
P_q(X_1=\cdots=X_{10}=0)=0.99^{10}\approx0.9044.
$$

この場合は観測した重みが全部等しく $N_{\mathrm{eff}}^{(w)}=10$ と最大なのに、$\widehat I_{10}^{\mathrm{SN}}=0$、真値 $I=1/2$ との差は $-1/2$ である。観測された標本の中で重みが均等でも、未観測の重要な状態がないとは言えない。逆に $h$ が定数なら、ESSが低くても正規化後の推定量は真値と厳密に一致する。

## 6. 台漏れと重い裾は別の失敗

連続目標が $(0,1)$ 上の一様密度 $f(x)=1$、提案が $q(x)=2x$ の場合を考える。$x>0$ では $q>0$ なので台条件は満たすが、$w(x)=1/(2x)$ が左端近くで巨大になる。

$$
E_qw=\int_0^1\frac1{2x}2x\,dx=1,\qquad
E_qw^2=\int_0^1\frac1{4x^2}2x\,dx
=\frac12\int_0^1\frac{dx}{x}=\infty.
$$

$h(x)=x$、$I=1/2$ なら、自己正規化推定量の漸近分散条件も

$$
E_q[w^2(h-I)^2]
=\frac12\int_0^1\frac{(x-1/2)^2}{x}\,dx=\infty
$$

となる。$x\downarrow0$ で $(x-1/2)^2\to1/4$ のため、発散を相殺できない。ただし $E_q|wh|<\infty$ と $E_qw<\infty$ は成立するので、[一致性の定理](#thm-ml2-10-snis-limit)の (i) は使える。(ii) の有限分散の正規極限は適用できない。

これに対し、$q(x)=2$ を $(0,1/2)$ にのみ置き、$(1/2,1)$ では0にする提案は、$f>0$ の正の長さの領域で $q=0$ となる。何回生成しても後半区間を見られず、密度比ではその積分寄与を復元できない。台漏れと重い裾は原因も対処も異なる。

## 7. 標本数・提案確率・乱数seedの計算実験

真値が既知の $f=(3,1)$、$h(z)=z$ を用い、提案の $q(1)=r$ と $N$ を変える。次のPythonコードは標準ライブラリだけで動き、毎回実際に標本を引いて推定値・ESS・状態1の未観測率を集計する。乱数seedを固定した再現実験を初期値とし、別seedでも比較できる。二標本の厳密な期待値 $3/8$ は標本生成とは別に検算する。

~~~python
import random
import statistics

F = (3.0, 1.0)
TRUTH = F[1] / sum(F)

def one_trial(r, n, rng):
    assert 0 < r < 1 and n >= 1
    weights = []
    numerator = 0.0
    seen_one = False
    for _ in range(n):
        x = int(rng.random() < r)
        seen_one |= bool(x)
        qx = r if x else 1.0 - r
        w = F[x] / qx
        weights.append(w)
        numerator += w * x
    total = sum(weights)
    assert total > 0
    estimate = numerator / total
    ess = total * total / sum(w * w for w in weights)
    return estimate, ess, seen_one

def experiment(r=0.5, n=20, repetitions=10000, seed=20261026):
    rng = random.Random(seed)
    rows = [one_trial(r, n, rng) for _ in range(repetitions)]
    mean_est = statistics.mean(row[0] for row in rows)
    mean_ess = statistics.mean(row[1] for row in rows)
    miss = sum(not row[2] for row in rows) / repetitions
    return mean_est, mean_est - TRUTH, mean_ess, miss

# 順序付き標本4通りを厳密に列挙した値
assert (0.0 + 0.25 + 0.25 + 1.0) / 4 == 0.375
assert TRUTH == 0.25
for r in (0.5, 0.1, 0.01):
    for n in (10, 100, 1000):
        mean_est, bias, mean_ess, miss = experiment(r=r, n=n)
        print(f"r={r:.2f}, N={n:4d}, Ehat={mean_est:.4f}, "
              f"bias={bias:+.4f}, meanESS={mean_ess:.2f}, missOne={miss:.3f}")
~~~

特に $r=0.01$、$N=10$ では状態1の未観測確率 $(1-r)^{10}$ が約0.9044になる。出力の未観測率と比較し、未観測の反復でESSが最大でも推定値は0という理論の限界を確認する。実験は1反復あたり時間 $O(N)$、重み保持に空間 $O(N)$ を用いる。実応用では極端な重みで桁あふれが起きるので対数重みでの安定化や複数seedの検査も必要である。

## 8. 演習

### ML2-10-A01 事後分布と提案分布が一致する場合

- Level: A

状態 $\mathcal Z=\{0,1\}$ の非正規化重みを $f(0)=3,f(1)=1$、評価関数を $h(z)=z$ とする。提案分布 $q(0)=3/4,q(1)=1/4$ のもとで、両状態の $w=f/q$ を求めよ。標本が $(0,1,0,0)$ なら自己正規化推定値と重みの経験的有効標本サイズを計算せよ。

<!-- solution-start -->
#### 詳細解答

$f$ の総和は $Z=4$ なので、真の事後分布は $\pi=(3/4,1/4)$、真の期待値は $I=1/4$。提案の両確率は正である。各状態の重みは

$$
w(0)=\frac3{3/4}=4,\qquad w(1)=\frac1{1/4}=4.
$$

標本4個の総重みは $4+4+4+4=16$。したがって[自己正規化推定量](#def-ml2-10-snis)は

$$
\widehat I_4^{\mathrm{SN}}
=\frac{4\cdot0+4\cdot1+4\cdot0+4\cdot0}{16}
=\frac14.
$$

正規化重みは各 $1/4$ だから[ESSの定義](#def-ml2-10-ess)より

$$
N_{\mathrm{eff}}^{(w)}
=\frac1{4(1/4)^2}=4.
$$

今回の標本は真値と一致するが、例えば4個とも0なら推定値は0となる。重みが等しいことと推定値の厳密さは別である。
<!-- solution-end -->

### ML2-10-A02 重み付き平均を直接計算する

- Level: A

$f(0)=3,f(1)=1$、$h(z)=z$、$q(0)=q(1)=1/2$ とする。順序付き標本 $(X_1,X_2,X_3)=(0,1,1)$ の重み、分子平均 $\widehat A_3$、分母平均 $\widehat Z_3$、自己正規化推定値およびESSを求めよ。

<!-- solution-start -->
#### 詳細解答

$w(0)=3/(1/2)=6$、$w(1)=1/(1/2)=2$ なので重み列は $(6,2,2)$。$h(0)=0$、$h(1)=1$ より

$$
\widehat A_3=\frac{6\cdot0+2\cdot1+2\cdot1}{3}=\frac43,\qquad
\widehat Z_3=\frac{6+2+2}{3}=\frac{10}{3}.
$$

従って[定義](#def-ml2-10-snis)の比は

$$
\widehat I_3^{\mathrm{SN}}=\frac{4/3}{10/3}=\frac25.
$$

重みの和は10、二乗和は $36+4+4=44$ なので、[重みの経験的有効標本サイズ](#def-ml2-10-ess)の定義から

$$
N_{\mathrm{eff}}^{(w)}=\frac{10^2}{44}=\frac{25}{11}\approx2.273.
$$

分母平均と重みの合計を混同しない。比の計算では双方の $1/3$ が相殺される。
<!-- solution-end -->

### ML2-10-A03 一標本での有限標本バイアス

- Level: A

$f(0)=3,f(1)=1$、$h(z)=z$ とする。$q(1)=r\in(0,1)$ で一標本 $X_1$ を引いたとき、自己正規化推定量とその期待値・偏りを求めよ。$r=1/2$ と $r=1/4$ を比較せよ。

<!-- solution-start -->
#### 詳細解答

$f,q$ は両状態で正なので、重み $w(X_1)>0$。[自己正規化重点サンプリング推定量](#def-ml2-10-snis)の定義で $N=1$ とすると、分子と分母の同じ重みが約分され

$$
\widehat I_1^{\mathrm{SN}}=\frac{w(X_1)h(X_1)}{w(X_1)}=h(X_1)=X_1.
$$

$X_1=1$ の確率は $r$ なので、期待値と偏りはそれぞれ

$$
E_q\widehat I_1^{\mathrm{SN}}=0(1-r)+1\cdot r=r,
\qquad E_q\widehat I_1^{\mathrm{SN}}-I=r-\frac14
$$

となる。ここで真値は $I=1/(3+1)=1/4$ である。$r=1/2$ では $1/4$ だけ上方に偏り、$r=1/4$ では偏り0となる。後者は $q=\pi$ なので重みが常に4となり、事後分布から直接標本を引いたのと同じである。
<!-- solution-end -->

### ML2-10-A04 分子・分母それぞれの分散

- Level: A

$f=(3,1)$、$q=(1/2,1/2)$、$h(z)=z$ とし、$N$ 個の独立提案標本を使う。$\widehat A_N=N^{-1}\sum_iw(X_i)h(X_i)$ と $\widehat Z_N=N^{-1}\sum_iw(X_i)$ の期待値と分散を求めよ。

<!-- solution-start -->
#### 詳細解答

$w=(6,2)$、$wh=(0,2)$。提案は各状態の確率が $1/2$ なので

$$
E_q(wh)=\frac12(0+2)=1=A,\quad
E_q((wh)^2)=\frac12(0^2+2^2)=2,
$$

$$
E_qw=\frac12(6+2)=4=Z,\quad
E_qw^2=\frac12(6^2+2^2)=20.
$$

[分子・分母の分散命題](#prop-ml2-10-unnormalized-moments)で使う一標本分散は $2-1^2=1$ と $20-4^2=4$。独立な $N$ 標本の平均だから

$$
E_q\widehat A_N=1,\quad \operatorname{Var}(\widehat A_N)=\frac1N,
\qquad
E_q\widehat Z_N=4,\quad \operatorname{Var}(\widehat Z_N)=\frac4N.
$$

ここから比の分散が $1/(4N)$ と結論することはできない。分母自体も変動し、分子と分母は同じ標本に由来して相関する。
<!-- solution-end -->

### ML2-10-B01 二標本の偏り・分散・二乗平均誤差

- Level: B

$f(0)=3,f(1)=1$、$q(0)=q(1)=1/2$、$h(z)=z$ とし、二標本の自己正規化推定量を $T$ とする。4通りの順序付き標本を列挙し、$E_qT$、$\operatorname{Var}_q(T)$、真値 $I=1/4$ に対する $E_q[(T-I)^2]$ を求め、偏りと分散の分解を検算せよ。

<!-- solution-start -->
#### 詳細解答

[自己正規化重点サンプリング推定量](#def-ml2-10-snis)の定義から、標本 $(0,0)$ では $T=0$、$(0,1)$ または $(1,0)$ では $T=2/(6+2)=1/4$、$(1,1)$ では $T=1$。いずれの順序付き標本も確率 $1/4$ だから

$$
E_qT=\frac14\left(0+\frac14+\frac14+1\right)=\frac38,
$$

$$
E_qT^2=\frac14\left(0+\frac1{16}+\frac1{16}+1\right)=\frac9{32}.
$$

従って偏りは $3/8-1/4=1/8$、分散は

$$
\operatorname{Var}_q(T)=\frac9{32}-\left(\frac38\right)^2
=\frac{18-9}{64}=\frac9{64}.
$$

真値からの二乗誤差を各標本で直接計算すると

$$
E_q[(T-I)^2]
=\frac14\left(\frac1{16}+0+0+\frac9{16}\right)=\frac5{32}.
$$

一方、偏りと分散の分解は

$$
\operatorname{Var}_q(T)+(E_qT-I)^2
=\frac9{64}+\frac1{64}=\frac{10}{64}=\frac5{32},
$$

となって直接列挙と一致する。
<!-- solution-end -->

### ML2-10-B02 提案分布で変わる漸近分散

- Level: B

$f(0)=3,f(1)=1$、$h(z)=z$ の事後期待値 $I=1/4$ を求める。(a) $q=(1/2,1/2)$、(b) $q=(3/4,1/4)$ のそれぞれについて[漸近分散の定理](#thm-ml2-10-snis-limit)の $\tau^2$ を直接計算し、二つを比較せよ。

<!-- solution-start -->
#### 詳細解答

$Z=4$、$I=1/4$ であり、いずれも有限状態かつ $f,q>0$ なので[漸近分散の定理](#thm-ml2-10-snis-limit)の二次モーメント条件は成立する。中心化重み $Y=w(X)(h(X)-I)$ を使う。

(a) $w=(6,2)$ から

$$
Y(0)=6(-1/4)=-3/2,\qquad Y(1)=2(3/4)=3/2.
$$

従って $E_qY^2=(1/2)(9/4)+(1/2)(9/4)=9/4$、$\tau_a^2=(9/4)/4^2=9/64$。

(b) $q=(3/4,1/4)$ は真の $\pi$ と等しいため $w=(4,4)$ である。

$$
Y(0)=4(-1/4)=-1,\qquad Y(1)=4(3/4)=3.
$$

従って $E_qY^2=(3/4)\cdot1+(1/4)\cdot9=3$、$\tau_b^2=3/4^2=3/16$。

比較すると $9/64<3/16=12/64$ である。この $h$ の期待値に対しては、重みが一定になる提案よりも (a) の方が漸近分散が小さい。ESSだけを最大化することが個別の期待値推定で最適とは限らない。
<!-- solution-end -->

### ML2-10-B03 一致性はあるが正規近似を保証できない

- Level: B

目標密度 $f(x)=1$、提案密度 $q(x)=2x$ を $0<x<1$ に置き、$h(x)=x$ とする。$Z$、$I$、$E_qw$、$E_q|wh|$ を求め、自己正規化推定量の一致性と中心極限定理の条件を別々に判定せよ。

<!-- solution-start -->
#### 詳細解答

まず $\int_0^1 f(x)\,dx=1$ なので $Z=1$、$\pi=f=1$ であり $I=\int_0^1x\,dx=1/2$。$x>0$ では $q(x)>0$ なので台条件を満たす。重み $w(x)=1/(2x)$ について

$$
E_qw=\int_0^1\frac1{2x}\,2x\,dx=1,\qquad
E_q|wh|=\int_0^1\frac{x}{2x}\,2x\,dx=\int_0^1x\,dx=\frac12.
$$

いずれも有限なので[一致性の定理](#thm-ml2-10-snis-limit)の (i) が成立する。一方、中心化重みの二次モーメントは

$$
E_q[w^2(h-I)^2]=\frac12\int_0^1\frac{(x-1/2)^2}{x}\,dx.
$$

$0<x<1/4$ で $|x-1/2|\ge1/4$ だから

$$
E_q[w^2(h-I)^2]
\ge\frac1{32}\int_0^{1/4}\frac{dx}{x}=\infty.
$$

従って定理 (ii) の有限分散条件は満たさず、その正規分布への漸近収束をこの定理からは主張できない。一致性の成立と正規近似の正当化は別である。
<!-- solution-end -->

### ML2-10-B04 ESSが高いのに誤る標本

- Level: B

$\mathcal Z=\{0,1\}$、$f(0)=f(1)=1$、$q(0)=0.99,q(1)=0.01$、$h(z)=z$ とする。$N=10$ の標本がすべて0になる確率と、そのときの自己正規化推定値・ESSを求めよ。さらに $h(z)=2$ に変更したときの推定値を比較せよ。

<!-- solution-start -->
#### 詳細解答

$Z=2$、$\pi=(1/2,1/2)$、元の $h(z)=z$ の真値は $I=1/2$。独立な標本がすべて0となる確率は

$$
P_q(X_1=\cdots=X_{10}=0)=(0.99)^{10}\approx0.9044.
$$

全標本の重みは $w(0)=1/0.99$ で等しいから、[自己正規化重点サンプリング推定量](#def-ml2-10-snis)と[重みの経験的有効標本サイズ](#def-ml2-10-ess)の定義に代入して

$$
\widehat I_{10}^{\mathrm{SN}}
=\frac{\sum_iw(0)\cdot0}{10w(0)}=0,\qquad
N_{\mathrm{eff}}^{(w)}
=\frac{(10w(0))^2}{10w(0)^2}=10.
$$

真値からの誤差は $-1/2$ にもかかわらずESSは最大である。$h(z)=2$ に変更すれば、どの標本でも分子が分母の2倍となるため $\widehat I_{10}^{\mathrm{SN}}=2=I$。重み・ESSは変わらず、目的関数の違いが誤差を変える。未観測状態の存在と $h$ の変動をESSだけでは診断できない。
<!-- solution-end -->

### ML2-10-C01 不偏な重み付き和と偏りのある比をつなぐ

- Level: C

状態 $\mathcal Z=\{0,1\}$ の非正規化重みを $f(0)=3,f(1)=1$、評価関数を $h(z)=z$ とする。独立な提案標本 $X_1,X_2$ は $q=(1/2,1/2)$ に従う。

1. $Z$、真値 $I$、二状態の重み $w=f/q$ と、二標本の非正規化分子 $\widehat A_2$・分母 $\widehat Z_2$ の期待値を求めよ。
2. 順序付き標本をすべて列挙し、自己正規化推定量の期待値、偏り、二乗平均誤差を求めよ。
3. $N$ を増やしたときの一致性・漸近分散 $\tau^2$ を仮定と共に示せ。
4. 二標本が $(0,1)$ の場合と $(0,0)$ の場合のESSを計算し、ESSの大小だけでは誤差を比較できない理由を説明せよ。
5. $q=(3/4,1/4)$ に変えた場合のESSと二標本推定量の期待値を求め、この提案が必ず小さい誤差を与えるか考察せよ。

<!-- solution-start -->
#### 詳細解答

**（1）** $Z=3+1=4$、$\pi=(3/4,1/4)$ だから $I=1/4$。$q$ は両状態で正で、$w=(6,2)$、$wh=(0,2)$。よって

$$
E_q\widehat A_2=E_q(wh)=\frac12(0+2)=1=ZI,\qquad
E_q\widehat Z_2=E_qw=\frac12(6+2)=4=Z.
$$

**（2）** $(0,0)$、$(0,1)$、$(1,0)$、$(1,1)$ は各確率 $1/4$。推定値は順に $0,1/4,1/4,1$ だから

$$
E_q\widehat I_2^{\mathrm{SN}}=\frac14(0+1/4+1/4+1)=\frac38.
$$

偏りは $3/8-1/4=1/8$。真値に対する二乗誤差は、各標本で $1/16,0,0,9/16$ となるため

$$
E_q[(\widehat I_2^{\mathrm{SN}}-I)^2]
=\frac14(1/16+0+0+9/16)=\frac5{32}.
$$

**（3）** $f,q$ は二状態で正、$h$ は有限値なので、台条件・一次と二次の可積分性がすべて成り立つ。[一致性・漸近分布の定理](#thm-ml2-10-snis-limit)を使える。中心化重みは

$$
w(0)(h(0)-I)=-3/2,\qquad
w(1)(h(1)-I)=3/2.
$$

その二乗期待値は $9/4$、$Z=4$ なので $\tau^2=(9/4)/16=9/64$。従って $\widehat I_N^{\mathrm{SN}}\to1/4$ がほとんど確実に成立し、$\sqrt N(\widehat I_N^{\mathrm{SN}}-1/4)$ は分散 $9/64$ の正規分布へ分布収束する。

**（4）** $(0,1)$ の重み $(6,2)$ について

$$
N_{\mathrm{eff}}^{(w)}=\frac{(6+2)^2}{6^2+2^2}=\frac85,
$$

であり推定値は $1/4$ で誤差0。一方、$(0,0)$ は重み $(6,6)$ なのでESSは2で前者より大きいが、推定値0で誤差は $-1/4$。同じ模型でESSの大小と誤差の大小が逆転している。

**（5）** 新提案は $\pi$ と一致し、重みは $(4,4)$ なので全標本でESSは2。比の推定量は $h(X_1)$ と $h(X_2)$ の算術平均で、その期待値は

$$
E_q\widehat I_2^{\mathrm{SN}}
=\frac12(E_qX_1+E_qX_2)
=\frac12\left(\frac14+\frac14\right)=\frac14.
$$

この提案では有限標本バイアスが消える。しかし各 $X_i$ は $\operatorname{Bernoulli}(1/4)$ なので、二標本の標本平均の分散（偏り0なので二乗平均誤差でもある）は

$$
\frac{\operatorname{Var}_q(X_1)}2
=\frac{(1/4)(3/4)}2=\frac3{32}<\frac5{32}
$$

となり、旧提案より小さい。一方、[漸近分散の定理](#thm-ml2-10-snis-limit)で比較すると

$$
\tau_{\mathrm{old}}^2=\frac9{64}
<\frac3{16}=\tau_{\mathrm{new}}^2
$$

と逆順になる。有限標本での偏り、分散、標本サイズ、評価関数によって比較結果は変わる。
<!-- solution-end -->

## 9. まとめと次の問い

提案分布からの重み付き和は、台と二次モーメントの条件の下で不偏な分子・分母推定量を与える。両者の比で未知の正規化定数を消せるが、比は有限標本で一般に偏る。一方、必要な一次モーメントが有限なら自己正規化比は一致し、中心化重みの二次モーメントが有限なら正規近似が導ける。経験的ESSは重みの偏在を見る指標で、未観測状態や目的関数の変動まで保証しない。

次講のMCMCでは、各標本を独立に提案分布から引く代わりに、前の状態から次の状態を生成する。標本間に依存が生じるため、そこでは別の不変分布・収束・混合の検討が必要になる。
