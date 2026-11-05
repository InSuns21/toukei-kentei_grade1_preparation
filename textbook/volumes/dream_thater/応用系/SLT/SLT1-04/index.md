# SLT1-04 一様収束とERMの過剰リスク

<!-- definition-example-audit: strict -->

## 1. 訓練誤差の小ささを、最良候補との比較に変える

前章では、標本を見る前に固定した有限仮説クラスについて、[全候補の経験リスクと母集団リスクの同時偏差](../SLT1-03/index.md#thm-slt1-03-finite-uniform)を評価した。これで選択後の予測器のリスクを評価できる。しかし「ERMが返した予測器は、クラス内の最良候補にどこまで近いか」という問いには、もう一段の比較が要る。

例えば、二候補の母集団リスクがそれぞれ $0.10,0.30$ なのに、ある標本では両方の経験リスクが $0.20$ だったとする。[経験リスク最小化（ERM）](../../ML/ML1-03/index.md#def-ml1-03-erm)は同点の後者を選び得る。このとき訓練上の順位が同じでも、母集団での過剰リスクは $0.20$ である。各候補の経験値と真値のずれは $0.10$ にすぎない。**選んだ候補のずれと、比較相手のずれの両方**を勘定する必要がある。

以下では、観測空間 $\mathcal Z$ 上の分布 $P$ から $S=(Z_1,\ldots,Z_n)\sim P^n$（$n\ge1$）を独立同分布で得る。標本を見る前に固定した非空の仮説クラス $\mathcal H$、$[0,1]$ 値の損失 $\ell(h,z)$ を用い、各 $h$ について損失は可測とする。[母集団・経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)を

$$
R_P(h)=\mathbb E_{Z\sim P}\ell(h,Z),\qquad
\widehat R_S(h)=\frac1n\sum_{i=1}^{n}\ell(h,Z_i)
$$

と書く。$\mathcal H$ は有限または可算とし、和や上限を取った量が可測であることを確保する。より一般の非可算クラスでは、後述の上限の可測性などを別途確認する必要がある。

## 2. 全候補をまとめた「ずれ」を測る

前章の[同時偏差事象](../SLT1-03/index.md#def-slt1-03-simultaneous-event)は、ある幅以内に全ての候補が入るという条件だった。その幅を、標本ごとの**最大のずれ**として数値化しよう。

<a id="def-slt1-04-uniform-deviation"></a>

<!-- formal-statement-start -->
> **定義（一様リスク偏差）**
> 非空の有限または可算な、標本抽選前に固定された仮説クラス $\mathcal H$、分布 $P$、標本 $S\sim P^n$ と各 $h$ について可測な $[0,1]$ 値損失 $\ell$ に対し、一様リスク偏差を

$$
D_{P,n}(S)=\sup_{h\in\mathcal H}
\bigl|R_P(h)-\widehat R_S(h)\bigr|
$$

> と定める。常に $0\le D_{P,n}(S)\le1$ で、可算個の可測関数の上限だから $S$ に関して可測である。有限クラスでは $\sup$ を $\max$ に置き換えられる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-04-uniform-deviation -->
**定義の確認**。$\mathcal H=\{h_0,h_1\}$ とし、ある標本で

| 候補 | $R_P(h)$ | $\widehat R_S(h)$ | 絶対偏差 |
|---|---:|---:|---:|
| $h_0$ | $0.10$ | $0.20$ | $0.10$ |
| $h_1$ | $0.30$ | $0.20$ | $0.10$ |

とする。二候補は標本前に固定された非空有限集合で、損失の値域も $[0,1]$ に入る設定である。定義式の上限は有限個の最大値に等しいので、$D_{P,n}(S)=\max\{0.10,0.10\}=0.10$。この標本は前章の $E_{0.10}$ に属し、$E_{0.09}$ には属さない。一般に有限クラスについて

$$
\{S:D_{P,n}(S)\le\varepsilon\}=E_\varepsilon
$$

であり、無限可算クラスでも左辺が「全ての $h$ の偏差が $\varepsilon$ 以下」を意味することは同じである。
<!-- definition-example-end -->

「ある固定した $h$ について偏差が小さい」と「全 $h$ について**同じ標本上で**小さい」は異なる。後者の事象が起きた標本なら、後から選ばれた $h$ にも保証を適用できる。

## 3. 最小化を少し間違えても、過剰リスクを制御する

最適化算法は、正確なERM解を返さず、経験リスク最小値に少し届かない場合がある。そこで、ERMの条件を少し緩める。ここでの「近似」は最適化の数値誤差であり、[仮説クラスの近似誤差](../SLT1-01/index.md#def-slt1-01-approximation)とは別物である。

<a id="def-slt1-04-approximate-erm"></a>

<!-- formal-statement-start -->
> **定義（近似経験リスク最小化）**
> 非空仮説クラス $\mathcal H$、標本 $S$、有限値の経験リスク $\widehat R_S$、精度 $\eta\ge0$ に対し、$\widehat h\in\mathcal H$ が $\eta$-近似経験リスク最小解（$\eta$-近似ERM）であるとは

$$
\widehat R_S(\widehat h)
\le\inf_{h\in\mathcal H}\widehat R_S(h)+\eta
$$

> を満たすことをいう。$\eta=0$ で最小値が達成されれば、通常のERM解である。確率的な算法の場合は、各実現 $S$ と算法乱数の値について、この不等式が成り立つことを求める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-04-approximate-erm -->
**定義の確認**。二候補 $h_a,h_b$ の経験リスクが $0.18,0.20$ だったとする。$\inf_h\widehat R_S(h)=0.18$ であるから、$h_b$ は $\eta=0.02$ で条件 $0.20\le0.18+0.02$ を満たすが、$\eta=0.01$ では満たさない。$h_a$ は $\eta=0$ でも条件を満たす。有限クラスなのでどちらも経験リスクが有限で、最小値の達成も明確である。
<!-- definition-example-end -->

前章の一様偏差は標本のランダムさを制御する量であり、$\eta$ は算法が最小化をどれだけ達成したかという別の量だ。二つを結び付けよう。

<a id="thm-slt1-04-approximate-erm-oracle"></a>

<!-- formal-statement-start -->
> **定理（近似ERMの決定論的過剰リスク界）**
> 非空の有限または可算仮説クラス $\mathcal H$、分布 $P$、標本 $S$、各候補で $[0,1]$ 値の可測損失から定まる $R_P,\widehat R_S$ を考える。$\eta\ge0$ とし、$\widehat h\in\mathcal H$ がこの標本で $\eta$-近似ERMであるとする。このとき

$$
0\le R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)
\le2D_{P,n}(S)+\eta.
$$

> この決定論的不等式自体には標本の独立性は不要で、母集団リスクの最小値を達成する仮説の存在も不要である。
<!-- formal-statement-end -->

### 証明の見取り図

[ML1-03のERMの母集団リスク比較](../../ML/ML1-03/index.md#prop-ml1-03-erm-comparison)では有限クラスと正確なERMに対して係数2が現れた。今回は任意の比較候補 $g$ を先に固定し、正確な最小値でなく $\eta$ だけ余裕のある不等式を挟む。最後に $g$ の母集団リスクの下限を取れば、最小解が存在しなくてもよい。

<!-- proof-start -->
### 証明

$D=D_{P,n}(S)$ とおく。定義から、全ての $h\in\mathcal H$ に対して

$$
R_P(h)\le\widehat R_S(h)+D,
\qquad
\widehat R_S(h)\le R_P(h)+D
$$

が**同じ標本 $S$** の上で成り立つ。任意の $g\in\mathcal H$ を比較対象に選ぶ。最初の式を $\widehat h$ に、近似ERM条件を $\widehat h$ に、最後の式を $g$ に順に使うと、

$$
\begin{aligned}
R_P(\widehat h)
&\le\widehat R_S(\widehat h)+D\\
&\le\inf_{h\in\mathcal H}\widehat R_S(h)+\eta+D\\
&\le\widehat R_S(g)+\eta+D\\
&\le R_P(g)+2D+\eta.
\end{aligned}
$$

ここで $g$ は任意なので、右辺の $R_P(g)$ の部分だけ下限を取ると

$$
R_P(\widehat h)\le\inf_{g\in\mathcal H}R_P(g)+2D+\eta.
$$

$\widehat h\in\mathcal H$ だから $R_P(\widehat h)\ge\inf_gR_P(g)$ も成り立つ。二つを合わせて主張を得る。証明のどこにも $S\sim P^n$ は使用していない。
<!-- proof-end -->

なぜ係数2が自然に出るのか。最初の例は実際の損失模型でも実現する。$\mathcal Z=\{a,b\}$、$P(a)=P(b)=1/2$、標本 $S=(a)$、仮説は $h_0,h_1$ として、損失を

| 仮説 | $\ell(h,a)$ | $\ell(h,b)$ |
|---|---:|---:|
| $h_0$ | $0.2$ | $0$ |
| $h_1$ | $0.2$ | $0.4$ |

とする。損失は全て $[0,1]$ で、$R_P(h_0)=0.1,R_P(h_1)=0.3$、経験リスクは両方 $0.2$、一様偏差は $0.1$。同点規則で $\widehat h=h_1$ を選べば、過剰リスクは $0.3-0.1=0.2=2D$ になる。一般には係数2を一律に1へ置き換えられない。

## 4. 一様収束は「どの分布でも同じ標本数」で成り立つか

一様偏差 $D_{P,n}(S)$ が標本数とともに小さくなることを一様収束という。ここではPAC保証につなぐため、**標本数の閾値を未知分布 $P$ に依存させない**強い意味を採用する。仮説クラスと損失は標本前に固定し、許す分布の族を $\mathcal P$ と書く。例えば二値分類の全ての同時分布を $\mathcal P$ としてよい。

名前は[RA5の関数列の一様収束](../../../基礎科目/RA/RA5/index.md#def-ra5-uniform)に似ている。どちらも「一つの閾値で全ての対象を守る」量化順序が重要だが、ここではさらに標本の確率と未知分布 $P$ に対する一様性を要求する。RA5の定理をこの確率的な結論へ直接適用するわけではない。

<a id="def-slt1-04-distribution-free-uniform"></a>

<!-- formal-statement-start -->
> **定義（分布自由一様収束）**
> 非空の有限または可算仮説クラス $\mathcal H$、各仮説について可測な $[0,1]$ 値損失 $\ell$、観測空間上の分布族 $\mathcal P$ を固定する。この組が分布族 $\mathcal P$ に関して分布自由一様収束性を持つとは、任意の $\varepsilon>0$ と $\delta\in(0,1)$ に対し、$P$ に依存しない整数 $N(\varepsilon,\delta)$ が存在し、全ての $P\in\mathcal P$、全ての $n\ge N(\varepsilon,\delta)$ について、独立同分布標本 $S\sim P^n$ が

$$
P_S\bigl(D_{P,n}(S)>\varepsilon\bigr)\le\delta
$$

> を満たすことをいう。固定した一つの $P$ ごとに別々の $N_P(\varepsilon,\delta)$ を選べるだけでは、この定義を満たさない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-04-distribution-free-uniform -->
**定義の確認**。有限非空の $\mathcal H$ に $M$ 個の候補があり、分布族 $\mathcal P$ が全ての分布からなる場合を考える。[有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)は全ての $P$ に同じ

$$
N(\varepsilon,\delta)
=\max\left\{1,\left\lceil\frac{\log(2M/\delta)}{2\varepsilon^2}\right\rceil\right\}
$$

を与える。$\varepsilon>0$、$\delta\in(0,1)$ で右辺は有限の整数であり、$n\ge N$ なら $2Me^{-2n\varepsilon^2}\le\delta$ となる。ここに $P$ は現れず、定義の量化順序を全て満たしている。
<!-- definition-example-end -->

この強い条件があれば、未知分布に合わせて標本数を選び直さずに、学習算法の性能を保証できる。

<a id="thm-slt1-04-uniform-to-pac"></a>

<!-- formal-statement-start -->
> **定理（分布自由一様収束からagnostic PAC保証）**
> 二値0–1分類の非空有限または可算な仮説クラス $\mathcal H$ と同時分布族 $\mathcal P$ を固定し、$S\sim P^n$ を独立同分布標本とする。$\mathcal H$ は標本前に固定され、分布族 $\mathcal P$ に関して分布自由一様収束性を持つと仮定する。任意の $\alpha>0$、$\delta\in(0,1)$ に対し $n\ge N(\alpha/4,\delta)$ とし、各標本で $\eta$-近似ERMを返す可測な算法を用いる。ただし $0\le\eta\le\alpha/2$ とする。このとき全ての $P\in\mathcal P$ について

$$
P_{S,U}\left(
R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)\le\alpha
\right)\ge1-\delta.
$$

> $U$ は算法が使う場合の標本と独立な乱数である。特に、上の条件で近似ERM算法を構成できる場合、$\mathcal H$ は $\mathcal P$ に関するagnostic PAC保証を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

全候補に対して一様偏差が小さい事象をまず固定する。その事象では、算法の選択後も[近似ERMの決定論的過剰リスク界](#thm-slt1-04-approximate-erm-oracle)を使える。確率の評価はその後で行う。

<!-- proof-start -->
### 証明

一様収束性の定義に $\varepsilon=\alpha/4$、指定した $\delta$ を入れると、全ての $P\in\mathcal P$ と $n\ge N(\alpha/4,\delta)$ で

$$
P_S\left(D_{P,n}(S)\le\frac{\alpha}{4}\right)\ge1-\delta
$$

となる。この事象の上で、近似ERM算法の出力に[決定論的過剰リスク界](#thm-slt1-04-approximate-erm-oracle)を適用すると

$$
\begin{aligned}
R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)
&\le2D_{P,n}(S)+\eta\\
&\le2\cdot\frac{\alpha}{4}+\frac{\alpha}{2}
=\alpha.
\end{aligned}
$$

一様偏差の成功事象は $S$ だけで決まり、全候補について成立するので、算法乱数の任意の値にもこの結論が成り立つ。したがって $P_{S,U}$ でも成功確率は少なくとも $1-\delta$ である。

可算クラスでは近似ERMを実際に構成できる。$\mathcal H=\{h_1,h_2,\ldots\}$ と列挙し、$\eta>0$ を固定する。標本ごとの経験リスクの下限を $m_S=\inf_h\widehat R_S(h)$ と置き、次の条件を満たす最初の添字を選ぶ。

$$
j(S)=\min\{j\ge1:\widehat R_S(h_j)<m_S+\eta\}.
$$

この集合が空だと全ての $j$ で $\widehat R_S(h_j)\ge m_S+\eta$ となる。すると下限も $m_S+\eta$ 以上となり、$\eta>0$ に矛盾する。よって $j(S)$ は必ず存在する。

各損失は可測で、可算個の下限 $m_S$ も可測である。最初の添字はそれらの大小比較で決まるので選択算法も可測となる。$\eta=\alpha/2$ を選べば上の定理で必要な近似ERMが得られる。有限クラスなら $\eta=0$ の正確なERMも使える。
<!-- proof-end -->

ここでは「一様収束ならagnostic PAC」が証明できたのであって、逆向きの一般的な同値性をこの章だけで主張してはいない。特に失敗例で、ある悪いERMの同点規則を見つけたとしても、それだけで**全ての**学習算法が失敗すると結論することはできない。

## 5. 有限クラスなら標本数まで計算できる

一般の定理に前章の具体的な有限クラス界を入れると、高確率の数値保証になる。$\eta=0$ では一様偏差の幅がそのまま過剰リスクの半分になるので、前節の一般構成で用いた $\alpha/4$ より鋭い $\alpha/2$ を使える。

<a id="cor-slt1-04-finite-erm"></a>

<!-- formal-statement-start -->
> **系（有限クラスの近似ERM高確率界）**
> 非空有限仮説クラス $\mathcal H$ の大きさを $M\ge1$ とする。$\mathcal H$ と可測な $[0,1]$ 値損失を標本抽選前に固定し、$S\sim P^n$ を独立同分布（$n\ge1$）とする。標本と独立な乱数を使ってもよい可測な算法が、各実現に対して $\eta$-近似ERM（決定的な $\eta\ge0$）を返すと仮定する。任意の $\delta\in(0,1)$ について確率 $1-\delta$ 以上で

$$
R_P(\widehat h)-\min_{h\in\mathcal H}R_P(h)
\le2\sqrt{\frac{\log(2M/\delta)}{2n}}+\eta.
$$

> 特に目標過剰リスク $\alpha>\eta$ を保証するには

$$
n\ge\left\lceil\frac{2\log(2M/\delta)}{(\alpha-\eta)^2}\right\rceil
$$

> が十分である。これはあらゆる分布 $P$ に対して同じ標本数を与える。
<!-- formal-statement-end -->

### 証明の見取り図

[前章の有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)の確率事象へ[本章の決定論的比較](#thm-slt1-04-approximate-erm-oracle)を重ねる。標本数の導出では $\alpha-\eta>0$ を先に確認する。

<!-- proof-start -->
### 証明

$b=\sqrt{\log(2M/\delta)/(2n)}$ と置く。$M\ge1,\delta\in(0,1),n\ge1$ なので $b>0$ である。[有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)を $\varepsilon=b$ に適用すると

$$
P_S(D_{P,n}(S)\le b)\ge1-\delta.
$$

この事象上で[決定論的過剰リスク界](#thm-slt1-04-approximate-erm-oracle)を使えば

$$
R_P(\widehat h)-\min_{h\in\mathcal H}R_P(h)
\le2D_{P,n}(S)+\eta\le2b+\eta.
$$

任意の算法乱数について成立するので同じ成功確率が保たれる。さらに $\alpha>\eta$ のもとで $2b+\eta\le\alpha$ は、両辺が非負であることを確認して平方すると

$$
\begin{aligned}
2\sqrt{\frac{\log(2M/\delta)}{2n}}
&\le\alpha-\eta\\
\frac{2\log(2M/\delta)}{n}
&\le(\alpha-\eta)^2\\
n&\ge\frac{2\log(2M/\delta)}{(\alpha-\eta)^2}.
\end{aligned}
$$

$n$ は整数なので天井を取ればよい。
<!-- proof-end -->

例えば $M=32$、$\delta=0.05$、$\eta=0$、目標過剰リスク $\alpha=0.20$ なら

$$
n\ge\left\lceil\frac{2\log(64/0.05)}{0.20^2}\right\rceil
=\left\lceil50\log1280\right\rceil=358.
$$

一方、前章の[有限realizableクラスの整合学習界](../SLT1-03/index.md#thm-slt1-03-consistent-fast)を二値0–1分類のrealizable分布に適用するなら、同じ $\alpha=0.20$ に対して

$$
n\ge\left\lceil\frac{\log(32/0.05)}{0.20}\right\rceil
=\left\lceil5\log640\right\rceil=33
$$

で足りる。358と33の違いは計算精度の問題ではない。前者は雑音を許す $[0,1]$ 損失での**両側一様偏差**、後者はリスク0の仮説が存在し、経験誤差0の候補を返せるときの**整合失敗確率**を使う。後者の仮定を外して33だけを援用することはできない。

また、[SLT1-01の超過リスク分解](../SLT1-01/index.md#thm-slt1-01-decomposition)を二値0–1分類の有限入力空間に適用すると

$$
R_P(\widehat h)-R_P^*
=\bigl[\min_{h\in\mathcal H}R_P(h)-R_P^*\bigr]
+\bigl[R_P(\widehat h)-\min_{h\in\mathcal H}R_P(h)\bigr].
$$

前半はクラスの近似誤差で、標本数だけでは消えない。後半を本節の界で制御する。したがって、モデルを大きくする判断には「近似誤差が下がる利点」と「$\log M$ が大きくなる代価」がある。

## 6. 固定仮説の収束だけでは一様収束にならない

一つずつ決めた $h$ には[固定仮説の偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)が使える。しかし、候補が無限にあると「全ての $h$ に同時に成功」を有限個の合併上界では保証できない。数式の量化順序が本当に違うことを、可算クラスで確かめよう。

<a id="prop-slt1-04-pointwise-vs-uniform"></a>

<!-- formal-statement-start -->
> **命題（一様収束と固定仮説収束の非同値性）**
> 入力集合 $\mathcal X=\{1,2,\ldots\}$、ラベル $\{0,1\}$、0–1損失を用いる。有限集合 $A\subset\mathcal X$ ごとに $h_A(x)=\boldsymbol{1}_{\{x\in A\}}$ とし、$\mathcal H=\{h_A:A\subset\mathcal X,\ A\text{ は有限}\}$ とする。この $\mathcal H$ は可算で、各固定 $h_A$ については全ての独立同分布 $P$ に共通のHoeffding偏差界が成り立つ。それにもかかわらず、全ての二値分類分布からなる族に関する分布自由一様収束性は成り立たない。具体的に、全ての $n\ge1$ について、ある分布 $P_n$ が存在して

$$
P_{S\sim P_n^n}\left(D_{P_n,n}(S)\ge\frac12\right)=1
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

標本数 $n$ に合わせて $2n$ 個の入力に一様な分布を置き、全ラベルを0とする。標本に現れなかった入力に限って1を返す候補を、クラスの中から選べる。その候補は訓練標本に完全整合しても、未知分布では少なくとも半分誤る。

<!-- proof-start -->
### 証明

有限集合全体は、各要素数 $k$ ごとの昇順組の可算集合の和集合であるから可算である。各 $h_A$ の0–1損失は有界・可測で、固定した $h_A$ には[固定仮説のHoeffding偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)が $P$ によらず使える。

$n\ge1$ を任意に固定する。$P_n$ では $X$ が $\{1,\ldots,2n\}$ 上一様、$Y=0$ を確率1とする。$n$ 個の入力を観測したあと、$\{1,\ldots,2n\}$ のうち観測されなかった点を集めた有限集合を $A_S$ とする。重複を含めても観測された異なる点は高々 $n$ 個なので、

$$
|A_S|\ge2n-n=n.
$$

$h_{A_S}\in\mathcal H$ は全ての訓練点で0を返すから $\widehat R_S(h_{A_S})=0$。他方、真のラベルは常に0なので

$$
R_{P_n}(h_{A_S})
=P_n(X\in A_S)=\frac{|A_S|}{2n}\ge\frac12.
$$

したがって各標本 $S$ で

$$
D_{P_n,n}(S)
\ge|R_{P_n}(h_{A_S})-\widehat R_S(h_{A_S})|
\ge\frac12.
$$

一様偏差は可算クラス上の上限なので可測であり、確率1という記述は正当である。$\varepsilon=1/4,\delta=1/2$ を取れば、どの共通閾値 $N$ に対しても $n\ge N$ と $P_n$ を選ぶことで一様収束の定義に反する。
<!-- proof-end -->

この例で $h_\varnothing\equiv0$ はリスク0の候補であり、これを選ぶ学習算法は成功する。悪い同点規則が $h_{A_S}$ を選ぶと真のリスクが少なくとも $1/2$ になるが、**一様収束の失敗だけから全算法の学習不能性は出ない**。必要性や無限クラスの保証は、次のshatteringとVC次元の章で別の道具を用いて検討する。

## 演習

### SLT1-04-A01 最大偏差と同時事象
- Level: A
- 目安時間: 10分

標本前に固定した三候補の母集団リスクと、ある標本での経験リスクが順に $(0.15,0.25)$、$(0.35,0.40)$、$(0.50,0.40)$（各組は母集団、経験の順）である。$D_{P,n}(S)$ を求め、$S$ が $E_{0.10}$ と $E_{0.09}$ に属するか判定せよ。損失は $[0,1]$ 値とする。

<!-- solution-start -->
#### 詳細解答

[一様リスク偏差の定義](#def-slt1-04-uniform-deviation)に従い、各候補の差を計算する。

$$
|0.15-0.25|=0.10,\quad
|0.35-0.40|=0.05,\quad
|0.50-0.40|=0.10.
$$

三つの最大値は $D_{P,n}(S)=0.10$。$E_\varepsilon=\{D_{P,n}\le\varepsilon\}$ だから、$0.10\le0.10$ より $S\in E_{0.10}$、$0.10>0.09$ より $S\notin E_{0.09}$ である。
<!-- solution-end -->

### SLT1-04-A02 三つの差への分解
- Level: A
- 目安時間: 10分

有限クラスで母集団リスク最良の候補を $g$ とし、ERMの出力を $\widehat h$ とする。ある標本で $R_P(\widehat h)=0.32$、$\widehat R_S(\widehat h)=0.24$、$R_P(g)=0.18$、$\widehat R_S(g)=0.28$ である。過剰リスクの三項分解を数値で検算し、この二候補の偏差最大値だけから得る上界と比較せよ。

<!-- solution-start -->
#### 詳細解答

経験リスクは $0.24\le0.28$ なので、$\widehat h$ がERMの出力であることと矛盾しない。差を一つずつ計算すると

$$
\begin{aligned}
R_P(\widehat h)-\widehat R_S(\widehat h)&=0.32-0.24=0.08,\\
\widehat R_S(\widehat h)-\widehat R_S(g)&=0.24-0.28=-0.04,\\
\widehat R_S(g)-R_P(g)&=0.28-0.18=0.10.
\end{aligned}
$$

その和は $0.08-0.04+0.10=0.14$ であり、直接求めた $R_P(\widehat h)-R_P(g)=0.32-0.18=0.14$ と一致する。二候補の最大偏差は $0.10$ なので、[決定論的過剰リスク界](#thm-slt1-04-approximate-erm-oracle)では $0.14\le2(0.10)=0.20$ となる。他に候補があれば最大偏差はそれ以上にもなり得るので、この0.20は**二候補だけのクラス**の場合の上界である。
<!-- solution-end -->

### SLT1-04-A03 近似ERMの精度
- Level: A
- 目安時間: 10分

二候補 $h_0,h_1$ の経験リスクが $0.18,0.20$、母集団リスクが $0.22,0.29$ である。$h_1$ は最小でいくつの $\eta$ に対して近似ERMか。真の過剰リスクと $2D+\eta$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

経験最小値は $0.18$ なので、[近似ERMの定義](#def-slt1-04-approximate-erm)の条件は $0.20\le0.18+\eta$、すなわち $\eta\ge0.02$。母集団の最良候補は $h_0$ だから過剰リスクは $0.29-0.22=0.07$。偏差は

$$
|0.22-0.18|=0.04,\qquad |0.29-0.20|=0.09
$$

で、$D=0.09$。最小の $\eta=0.02$ を用いた上界は $2D+\eta=0.18+0.02=0.20$ となり、$0.07\le0.20$ を確認できる。
<!-- solution-end -->

### SLT1-04-A04 有限クラスの信頼半径
- Level: A
- 目安時間: 10分

$M=10$ の固定された有限クラス、$n=500$ の独立同分布標本、$[0,1]$ 値損失と $\delta=0.05$ を考える。正確なERMのクラス内超過リスクに対する両側一様偏差からの数値保証を求めよ。

<!-- solution-start -->
#### 詳細解答

[有限クラスの近似ERM高確率界](#cor-slt1-04-finite-erm)で $\eta=0$ とすると、確率 $0.95$ 以上で

$$
R_P(\widehat h)-\min_hR_P(h)
\le2\sqrt{\frac{\log(2\cdot10/0.05)}{2\cdot500}}
=2\sqrt{\frac{\log400}{1000}}
\approx0.1548.
$$

これは選ばれた仮説の**クラス内最良からの差**の上界であり、真のリスクが $0.1548$ 以下という意味ではない。
<!-- solution-end -->

### SLT1-04-A05 分布自由の量化順序
- Level: A
- 目安時間: 10分

一様偏差 $D_{P,n}$ を持つ仮説クラスについて、次の二つを比較せよ。

1. 任意の $\varepsilon,\delta$ に対し整数 $N$ が存在して、全ての $P$ と全ての $n\ge N$ で偏差失敗確率が $\delta$ 以下になる。
2. 任意の $\varepsilon,\delta$ と各 $P$ に対し整数 $N_P$ が存在して、全ての $n\ge N_P$ で偏差失敗確率が $\delta$ 以下になる。

どちらが分布自由一様収束の定義であり、他方から一方が直ちに従うか述べよ。

<!-- solution-start -->
#### 詳細解答

[分布自由一様収束の定義](#def-slt1-04-distribution-free-uniform)は1である。1の $N$ は $P$ に依存しないため、2では $N_P=N$ と選べる。2では $P$ に応じて大きさの異なる $N_P$ を許すので、どの分布にも通用する一つの有限な閾値が存在するとは限らない。したがって1から2は従うが、2から1は一般には従わない。
<!-- solution-end -->

### SLT1-04-B01 目標精度から標本数を逆算する
- Level: B
- 目安時間: 15分

有限非空 $\mathcal H$ は標本前に固定され、$|\mathcal H|=20$、損失は $[0,1]$ 値、標本は独立同分布である。任意の $\eta=0.02$-近似ERMについて、クラス内超過リスクを $\alpha=0.12$ 以下に確率 $0.95$ 以上で抑える十分標本数を、前章の有限一様偏差界から導け。

<!-- solution-start -->
#### 詳細解答

[有限クラスの一様偏差界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)より、確率 $1-\delta$ で $D\le\sqrt{\log(2M/\delta)/(2n)}$ である。ここへ[決定論的過剰リスク界](#thm-slt1-04-approximate-erm-oracle)を適用し、

$$
2\sqrt{\frac{\log(2M/\delta)}{2n}}+\eta\le\alpha
$$

を要求する。$\alpha-\eta=0.10>0$ を確認して移項・平方すると

$$
n\ge\frac{2\log(2M/\delta)}{(\alpha-\eta)^2}
=\frac{2\log(800)}{0.10^2}
=200\log800\approx1336.92.
$$

したがって整数 $n\ge1337$ で十分である。確率評価の対象は同じ $S$ の全候補の偏差なので、近似ERMが標本を見て選ばれてもこの計算を適用できる。
<!-- solution-end -->

### SLT1-04-B02 係数2は削れるか
- Level: B
- 目安時間: 15分

$Z\in\{a,b\}$ がそれぞれ確率 $1/2$ を取り、二候補の損失は $[0,1]$ 値で $\ell(h_0,a)=0.2,\ell(h_0,b)=0$、$\ell(h_1,a)=0.2,\ell(h_1,b)=0.4$ とする。標本数 $n=1$ で $S=(a)$ が実現し、ERMが同点なら $h_1$ を選ぶとする。$\eta=0$ の決定論的上界の係数2が、この設定では等号になることを示せ。

<!-- solution-start -->
#### 詳細解答

母集団リスクは損失の平均なので

$$
R_P(h_0)=\frac{0.2+0}{2}=0.1,\qquad
R_P(h_1)=\frac{0.2+0.4}{2}=0.3.
$$

標本が $a$ 一個なので $\widehat R_S(h_0)=\widehat R_S(h_1)=0.2$。両方ERM解であり、指定した規則では $\widehat h=h_1$。偏差は各々 $|0.1-0.2|=0.1$、$|0.3-0.2|=0.1$ なので $D=0.1$。ゆえに

$$
R_P(\widehat h)-\min_hR_P(h)=0.3-0.1=0.2=2D.
$$

この標本は確率 $1/2$ で実際に起きる。単なる架空の数値表ではなく、具体的な分布と損失で等号を達成したので、一般上界の係数を常に1へ下げることはできない。
<!-- solution-end -->

### SLT1-04-B03 両側偏差が必要な場所
- Level: B
- 目安時間: 15分

非空有限クラスのある標本で、全ての $h$ について $R_P(h)-\widehat R_S(h)\le a$ と $\widehat R_S(h)-R_P(h)\le b$ が成り立つとする。ただし $a,b\ge0$。$\eta$-近似ERM $\widehat h$ に対して、$R_P(\widehat h)-\min_hR_P(h)\le a+b+\eta$ を導け。また片側の条件しか分からないと、どの段階が不足するか答えよ。

<!-- solution-start -->
#### 詳細解答

母集団最小候補 $g^*$ が存在するのは有限非空クラスだからである。最初の片側条件を $\widehat h$ に、二番目の片側条件を $g^*$ に使い、

$$
\begin{aligned}
R_P(\widehat h)
&\le\widehat R_S(\widehat h)+a\\
&\le\widehat R_S(g^*)+\eta+a\\
&\le R_P(g^*)+b+\eta.
\end{aligned}
$$

両辺から $R_P(g^*)=\min_hR_P(h)$ を引けば結論。$R_P-\widehat R_S$ の片側だけなら最後の $\widehat R_S(g^*)\le R_P(g^*)+b$ を保証できない。逆の片側だけなら最初の $R_P(\widehat h)\le\widehat R_S(\widehat h)+a$ が保証できない。この二箇所が係数2の由来である。
<!-- solution-end -->

### SLT1-04-B04 無限クラスと未観測集合
- Level: B
- 目安時間: 20分

$\mathcal X=\mathbb N$、$\mathcal H=\{h_A:A\subset\mathbb N\text{ は有限}\}$、$h_A(x)=\boldsymbol{1}_{\{x\in A\}}$ とする。標本数 $n=4$、$X$ は $\{1,\ldots,8\}$ 一様、$Y=0$ とする。観測入力が $1,1,3,5$ だった場合、経験リスク0で母集団リスクが $1/2$ 以上になる候補を明示せよ。これが固定仮説ごとのHoeffding界と矛盾しない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

観測された異なる点は $\{1,3,5\}$。未観測集合は $A=\{2,4,6,7,8\}$ で有限だから $h_A\in\mathcal H$。訓練入力 $1,1,3,5$ はいずれも $A$ の外にあり、$h_A$ の予測は0で全ラベルに一致するから

$$
\widehat R_S(h_A)=\frac{0+0+0+0}{4}=0.
$$

未知分布では $A$ に属する五つの入力が誤分類されるので

$$
R_P(h_A)=\frac58=0.625,\qquad
D_{P,4}(S)\ge0.625.
$$

[固定仮説の偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)は、標本を見る前に指定した一つの $h_A$ に関する確率評価である。本問では標本を見てから $A$ を選んでおり、その確率評価を直接代入できない。固定クラス全体の上限を取ると、大きな偏差を持つ候補が後から見つかる。
<!-- solution-end -->

### SLT1-04-C01 Bayes近似誤差を含む学習保証
- Level: C
- 目安時間: 30分

有限入力集合上の二値0–1分類で、標本前に固定した $M=40$ 個の仮説クラス $\mathcal H$ を考える。独立同分布標本 $S\sim P^n$ を用いる $\eta=0.02$-近似ERMを採用する。真のBayesリスクを $R_P^*$、$\mathcal H$ 内の最小リスクとの差（近似誤差）を $A=0.05$ とする。目標は確率 $0.95$ 以上で、選択した仮説のBayes超過リスクを $\alpha=0.20$ 以下にすることである。

1. Bayes超過リスクの分解と一様偏差の界から、$D_{P,n}(S)$ に要求する最大の幅を導け。
2. 有限クラスのHoeffding界を使い、十分な整数標本数を求めよ。
3. 最適化誤差を0にしても近似誤差 $A$ が残る理由と、全ての分布で整合候補があると仮定せずにrealizable型の標本数へ置き換えられない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**（1）** [SLT1-01の超過リスク分解](../SLT1-01/index.md#thm-slt1-01-decomposition)を学習器の出力へ適用し、[本章の近似ERMの決定論的過剰リスク界](#thm-slt1-04-approximate-erm-oracle)で後半を抑えると

$$
\begin{aligned}
R_P(\widehat h)-R_P^*
&=\bigl[\min_{h\in\mathcal H}R_P(h)-R_P^*\bigr]
+\bigl[R_P(\widehat h)-\min_{h\in\mathcal H}R_P(h)\bigr]\\
&\le A+2D_{P,n}(S)+\eta.
\end{aligned}
$$

従って $A+2D+\eta\le\alpha$ を課す。$A=0.05,\eta=0.02,\alpha=0.20$ を代入すると

$$
2D\le0.20-0.05-0.02=0.13,\qquad D\le0.065.
$$

**（2）** [有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)から

$$
P_S(D_{P,n}(S)>0.065)
\le2\cdot40e^{-2n(0.065)^2}.
$$

これを $\delta=0.05$ 以下にすればよい。指数関数の単調性から

$$
\begin{aligned}
80e^{-2n(0.065)^2}&\le0.05\\
-2n(0.065)^2&\le\log(0.05/80)=-\log1600\\
n&\ge\frac{\log1600}{2(0.065)^2}
\approx873.11.
\end{aligned}
$$

従って $n\ge874$ で十分。$\mathcal H$ は標本前に固定され、損失は0–1値、標本は独立同分布なので、前章の上界の仮定を満たす。成功事象で（1）の条件が成立するため、$\widehat h$ が標本から選ばれてもBayes超過リスクは $0.20$ 以下になる。

**（3）** $\eta=0$ は経験リスクを最小値まで解いたという意味であり、$\mathcal H$ にBayes最適予測器を含めるわけではない。$A=0.05$ は最良のクラス内予測器にも残る。さらに[realizable整合学習界](../SLT1-03/index.md#thm-slt1-03-consistent-fast)は、クラス内に真のリスク0の候補があり、その結果訓練誤差0の候補を選べる場合の保証である。ここではBayesリスク自体が0とも、クラス内最良リスクが0とも与えられていないため、$\alpha^{-1}$ 型の整合界への置き換えは正当化できない。
<!-- solution-end -->

## まとめと次章への橋

- **一様偏差**は全仮説の経験・母集団リスクの最大の差であり、標本依存の選択へ代入できる。
- **決定論的な橋**は、近似ERMの過剰リスクを $2D+\eta$ で抑える。二つの偏差と最適化誤差がそれぞれどこから来るかを説明できる。
- **確率的な橋**は、分布自由一様収束の成功事象へ決定論的な橋を重ねること。有限クラスでは $\log M$ に依存した明示的標本数が出る。
- **Bayes超過リスク**にはクラスの近似誤差が残る。realizableの速い界とagnosticの一般界は前提が違う。
- **無限クラス**では、固定仮説ごとの収束だけでは足りない。次章では、標本上であらゆる二値ラベル付けを実現できるという性質を導入し、仮説クラスの複雑さを測る。
