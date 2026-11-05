# SLT1-08 VC次元の必要性と無限VC反例

<!-- definition-example-audit: strict -->

## 1. 上界があることと、下界が避けられないこと

[前章のVC汎化界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)は、二値0–1分類でVC次元 $d$ が有限なら、独立同分布標本からの一様偏差を分布によらず制御できると述べた。しかし、**VC次元が無限なら、もっと工夫した学習算法で回避できないだろうか。**

二つの問いを分けよう。

1. 全ての仮説の真のリスクと経験リスクが同時に近づく「[分布自由一様収束](../SLT1-04/index.md#def-slt1-04-distribution-free-uniform)」は必要か。
2. 全候補の同時偏差制御が失敗しても、賢い算法が一つの良い仮説を選べば「[realizable PAC学習](../SLT1-02/index.md#def-slt1-02-realizable-pac)」はできるのではないか。

前者は**標本を見た後に、誤差を大きくする仮説を選ぶ**構成で反証できる。後者には、**どんな算法を先に固定しても、失敗させるラベル分布がある**という別の論証が必要だ。この二つを混同しない。

ここでは入力 $\mathcal X$、ラベル $\{0,1\}$、$S=((X_i,Y_i))_{i=1}^n\sim P^n$、標本前に固定した非空の二値仮説クラス $\mathcal H$、0–1損失を使う。[リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)を $R_P(h)$、経験リスクを $\widehat R_S(h)$、[一様偏差](../SLT1-04/index.md#def-slt1-04-uniform-deviation)を

$$
D_{P,n}(S)=\sup_{h\in\mathcal H}
|R_P(h)-\widehat R_S(h)|
$$

と書く。まずは有限または可算な可測クラスを考えるので、この上限と関連事象は可測である。無限VC次元とは、[VC次元の定義](../SLT1-05/index.md#def-slt1-05-vc)により、任意の正整数 $m$ に対し $m$ 個の異なる点からなる集合を [shatter](../SLT1-05/index.md#def-slt1-05-shattering) できるという意味である。

## 2. 未観測点だけで誤る仮説

まず $n=2$ とし、$V=\{a,b,c,d\}$ が shatter されているとする。$P$ の入力分布をこの四点上一様、正解を $f(a)=0,f(b)=1,f(c)=0,f(d)=1$ と固定する。shattering により、この四点で $f$ と同じ予測をする $h_\star\in\mathcal H$ が存在し、$R_P(h_\star)=0$ である。

たまたま訓練入力が $(a,c)$ だったら、四点上で $g(a)=0,g(b)=0,g(c)=0,g(d)=0$ となる $g\in\mathcal H$ も存在する。$g$ は観測済みの $a,c$ を正しく予測するから $\widehat R_S(g)=0$ だが、未知の $b,d$ では必ず誤り、$R_P(g)=2/4$ となる。訓練入力が重複しても、観測点数は増えない。

この構成を一般の $2n$ 点へ移す。正解 $f$ は**標本より先に固定**し、誤差を生む $g_S$ は一様上限の中で**標本に応じて選ぶ**。その順序を区別する。

<a id="thm-slt1-08-uniform-obstruction"></a>

<!-- formal-statement-start -->
> **定理（無限VC次元と分布自由一様収束の障害）**
> $\mathcal H$ を非空の有限または可算な可測二値分類クラスとし、VC次元が無限とする。任意の整数 $n\ge1$ に対し、ある $\mathcal H$-realizable な同時分布 $P_n$ が存在し、$S\sim P_n^n$ について

$$
\Pr_S\left\{D_{P_n,n}(S)\ge\frac12\right\}=1.
$$

> 特に $\mathcal H$ は全てのrealizable分布の族についてすら分布自由一様収束性を持たない。ここで $P_n$ は $n$ に依存してよい。
<!-- formal-statement-end -->

### 証明の見取り図

$2n$ 点の shattering を使い、標本未出現の点では正解と逆、観測点では正解と同じ仮説を選ぶ。未出現点は少なくとも $n$ 個なので、経験リスク0でも真のリスクは $1/2$ 以上になる。

<!-- proof-start -->
### 証明

[VC次元の定義](../SLT1-05/index.md#def-slt1-05-vc)から、$V=\{x_1,\ldots,x_{2n}\}$ で shatter される集合を取れる。任意の固定ラベル付け $f:V\to\{0,1\}$ を一つ選び、$X$ が $V$ 上一様、$Y=f(X)$ とする $P_n$ を定める。shattering から $f$ と $V$ 上で一致する $h_\star\in\mathcal H$ が存在するので $R_{P_n}(h_\star)=0$ である。

任意の標本入力列 $X_1,\ldots,X_n\in V$ を固定し、観測された異なる点の集合を $T=\{X_1,\ldots,X_n\}$ とする。$|T|\le n$。$V$ 上の別のラベル付け

$$
g_T(x)=
\begin{cases}
f(x),&x\in T,\\
1-f(x),&x\in V\setminus T
\end{cases}
$$

を作る。$V$ が shatter されるため、$g_T$ と $V$ 上で一致する $h_T\in\mathcal H$ が存在する。全ての訓練点は $T$ に属するから

$$
\widehat R_S(h_T)=\frac1n\sum_{i=1}^n
\boldsymbol1_{\{h_T(X_i)\ne f(X_i)\}}=0.
$$

一方、未観測点でのみ誤るので

$$
R_{P_n}(h_T)
=\frac1{2n}\sum_{x\in V}
\boldsymbol1_{\{h_T(x)\ne f(x)\}}
=\frac{2n-|T|}{2n}\ge\frac12.
$$

したがって上限の定義から $D_{P_n,n}(S)\ge R_{P_n}(h_T)-\widehat R_S(h_T)\ge1/2$。これは全ての標本入力列で成立するため確率1である。例えば $\varepsilon=1/4,\delta=1/4$ とすれば、いかなる共通標本数 $N$ に対しても $n\ge N$ で上の $P_n$ が保証に反する。ゆえに[分布自由一様収束の定義](../SLT1-04/index.md#def-slt1-04-distribution-free-uniform)を満たさない。
<!-- proof-end -->

この証明では正解分布を一つ選んだ後に、上限を実現する悪い仮説を標本ごとに変えている。**この結果だけでは、学習算法がその悪い仮説を出力するとは限らない。** 例えば観測点で一致する候補が多数あっても、算法が偶然 $h_\star$ を選べばリスク0である。次の下界ではこの抜け道を塞ぐ。

## 3. どんな学習算法にも未観測ラベルは分からない

先に学習算法 $A_n$ と標本数 $n$ を固定する。$2n$ 個の shatter される点 $V$ を選び、各点の正解ラベル $F(x)$ を独立な公平硬貨で決める。これは**反例となる固定分布を探すための平均化**であって、PAC確率の中で真の分布を動かすという意味ではない。

標本と学習算法の独立乱数 $U$ を固定しても、訓練標本に現れなかったテスト点 $x$ のラベル $F(x)$ は公平なまま。算法の予測は観測ラベルと $U$ に依存してよいが、その未知ビットには依存できない。ゆえに未知点での条件付き誤り確率は厳密に $1/2$ である。

<a id="thm-slt1-08-pac-lower-bound"></a>

<!-- formal-statement-start -->
> **定理（無限VC次元のPAC下界）**
> $\mathcal H$ を任意の非空な可測二値分類クラスで、VC次元が無限とする。各 $n\ge1$ に対し、標本と独立な乱数 $U$ を使用してもよい任意の可測学習算法 $A_n$（出力は二値予測器で、必ずしも $\mathcal H$ 内でなくてよい）について、ある $\mathcal H$-realizable 分布 $P_n$ が存在し、

$$
\mathbb E_{S,U}R_{P_n}(A_n(S,U))\ge\frac14,
$$

$$
\Pr_{S,U}\left\{R_{P_n}(A_n(S,U))>\frac18\right\}
\ge\frac17,
\qquad S\sim P_n^n.
$$

> したがって $\mathcal H$ は分布自由realizable PAC学習可能でなく、分布自由agnostic PAC学習可能でもない。
<!-- formal-statement-end -->

### 証明の見取り図

[有限模型のNo-Free-Lunch定理](../SLT1-02/index.md#thm-slt1-02-no-free-lunch)の「未知ラベルに関する平均化」を、shatter された有限集合へ移す。同定理との違いは、全ての二値関数を $\mathcal X$ 上で許す必要がなく、**有限支持上の任意のラベル付けが $\mathcal H$ 内で実現できれば十分**な点である。

<!-- proof-start -->
### 証明

$V=\{x_1,\ldots,x_{2n}\}$ を shatter される集合として固定し、各 $F_j=F(x_j)$ を独立な公平ビットとする。$F=f$ の下では入力を $V$ 上一様、ラベルを $Y=f(X)$ とする $P_f$ を使う。訓練入力 $X_1,\ldots,X_n$、独立なテスト入力 $X'$、算法乱数 $U$ は $F$ と独立に抽選する。

$E=\{X'\notin\{X_1,\ldots,X_n\}\}$ とすると、テスト入力 $X'=x_j$ を固定した際、各訓練入力がその点を避ける確率は $1-1/(2n)$ であり、独立性から

$$
\Pr(E)=\left(1-\frac1{2n}\right)^n\ge1-\frac{n}{2n}=\frac12.
$$

最後の不等式は $0\le t\le1$ での $(1-t)^n\ge1-nt$（[有限模型の証明](../SLT1-02/index.md#thm-slt1-02-no-free-lunch)で帰納的に導出済み）を $t=1/(2n)$ に適用した。

$E,X',S,U$ を固定すると、$X'=x_j$ に対応する $F_j$ は訓練ラベルのどこにも出現しない。従って出力の予測ビットと独立であり、出力が乱択であっても

$$
\Pr_F\{A_n(S,U)(X')\ne F(X')\mid E,X',S,U\}=\frac12.
$$

独立なテスト点での誤り確率がリスクであることから

$$
\begin{aligned}
\mathbb E_F\mathbb E_{S,U}R_{P_F}(A_n(S,U))
&=\Pr_{F,S,U,X'}\{A_n(S,U)(X')\ne F(X')\}\\
&\ge\frac12\Pr(E)\ge\frac14.
\end{aligned}
$$

$F$ は有限個 $2^{2n}$ のラベル付けをどれも確率 $2^{-2n}$ で取るので、その算術平均が $1/4$ 以上なら、少なくとも一つの固定 $f$ について $\mathbb E_{S,U}R_{P_f}(A_n(S,U))\ge1/4$。ここからはその $f$ を固定する。shattering によって $V$ 上で $f$ を実現する $h_f\in\mathcal H$ があり $R_{P_f}(h_f)=0$、従って $P_f$ は $\mathcal H$-realizable である。

$Z=R_{P_f}(A_n(S,U))\in[0,1]$、$q=\Pr(Z>1/8)$ と置く。事象 $Z\le1/8$ とその補集合に分けると

$$
\frac14\le\mathbb EZ\le\frac18(1-q)+q
=\frac18+\frac78q,
\qquad q\ge\frac17.
$$

最後に、もし[realizable PAC学習可能](../SLT1-02/index.md#def-slt1-02-realizable-pac)なら $\varepsilon=\delta=1/8$ に対し、ある算法族と有限の $N$ が全ての $n\ge N$ と全てのrealizable分布に通用するはずである。$n=\max(1,N)$ で上の反例 $P_n$ を選ぶと失敗確率は $1/7>1/8$ となり矛盾する。さらに[agnosticならrealizableでもある命題](../SLT1-02/index.md#prop-slt1-02-agnostic-implies-realizable)により、agnostic PACも成立しない。
<!-- proof-end -->

**二点での検算**。$n=1$、$V=\{a,b\}$ のとき、訓練点とテスト点が異なる確率は $1/2$。その条件の下で未知ラベルは0と1が半々なので誤り確率は $1/2$。したがってラベル付け全体の平均リスクは少なくとも $(1/2)(1/2)=1/4$。学習算法が「未観測点には0を返す」と決めても、独立な公平ラベルの下ではこの値は変わらない。

この定理は **$\forall n\,\forall A_n\,\exists P_n$** を示す。PACの量化順序は **$\exists A\,\exists m\,\forall P\,\forall n\ge m$** なので、前者が後者を打ち消す。固定した一つの $P$ について全ての算法が永久に失敗する、とまでは主張していない。

## 4. 有限VC次元はどこまで必要十分か

必要性だけなら任意の可測学習算法を相手にした。ただし十分性の[前章の一様汎化界](../SLT1-07/index.md#thm-slt1-07-vc-uniform)は、上限の可測性を保証するため有限または可算な可測クラスで証明した。ここでは両側の仮定を揃えて同値を述べる。

<a id="thm-slt1-08-vc-pac-equivalence"></a>

<!-- formal-statement-start -->
> **定理（可算二値クラスのVC・PAC同値）**
> $\mathcal X$ を可測空間、$\mathcal H$ を標本抽選前に固定した非空の有限または可算な可測二値関数クラスとする。全ての $\mathcal X\times\{0,1\}$ 上の同時分布を対象に、独立同分布標本と0–1損失で学習する。このとき次の四条件は同値である。
>
> 1. $\operatorname{VCdim}(\mathcal H)<\infty$。
> 2. $\mathcal H$ が分布自由一様収束性を持つ。
> 3. $\mathcal H$ がrealizable PAC学習可能である。
> 4. $\mathcal H$ がagnostic PAC学習可能である。
>
> ここで算法は可測な $\mathcal H$ 値出力を持ち、独立乱数を用いてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

有限VCなら前章の偏差界が0へ向かい、可算クラスでは近似ERMを可測に構成できる。agnostic PACからrealizable PACは既習の帰着。realizable PACから有限VCは前節の反例の対偶である。

<!-- proof-start -->
### 証明

$(1)\Rightarrow(2)$：$d=\operatorname{VCdim}(\mathcal H)<\infty$ とする。[有限VC次元の高確率界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)で、任意の $\delta\in(0,1)$ に対し

$$
B_{n,d,\delta}^2=\frac8n\log\left[
\frac4\delta\sum_{j=0}^{\min(d,2n)}\binom{2n}{j}
\right]
$$

とおけば、$\Pr(D_{P,n}>B_{n,d,\delta})\le\delta$ が全分布 $P$ で成立する。$d=0$ では和は1。$d\ge1$ では十分大きい $n$ で $d\le2n$ となり、[Sauer–Shelahの多項式界](../SLT1-06/index.md#cor-slt1-06-polynomial)から

$$
B_{n,d,\delta}^2\le\frac8n
\left[d\log\frac{2en}{d}+\log\frac4\delta\right]\longrightarrow0.
$$

従って任意の $\varepsilon>0$ についてある $N(\varepsilon,\delta)$ 以降 $B_{n,d,\delta}\le\varepsilon$ とできる。上界は $P$ に依存しないので、[分布自由一様収束](../SLT1-04/index.md#def-slt1-04-distribution-free-uniform)の条件が成立する。

$(2)\Rightarrow(4)$：$\mathcal H=\{h_1,h_2,\ldots\}$ と列挙する（有限なら繰り返し列挙してよい）。各標本で可測な数値

$$
r_*(S)=\inf_j\widehat R_S(h_j)
$$

を計算する。次に次の不等式を満たす最初の添字 $j$ を選ぶ。

$$
\widehat R_S(h_j)<r_*(S)+\frac1n.
$$

下限の定義により該当する $j$ は必ず存在する。各不等式は可測な事象なので、最初に該当する添字の選択も可測である。これは[近似ERMの定義](../SLT1-04/index.md#def-slt1-04-approximate-erm)で $\eta=1/n$ を満たす。

さらに[分布自由一様収束からagnostic PAC保証](../SLT1-04/index.md#thm-slt1-04-uniform-to-pac)を適用する。任意の $\alpha,\delta$ について次の標本数条件を課す。

$$
n\ge N(\alpha/4,\delta),\qquad \frac1n\le\frac\alpha2.
$$

すると全ての $P$ で超過リスクが $\alpha$ 以下となる確率は少なくとも $1-\delta$ である。

$(4)\Rightarrow(3)$：[agnosticからrealizableへの帰着](../SLT1-02/index.md#prop-slt1-02-agnostic-implies-realizable)を、realizable分布ではクラス内最良リスクが0であることにより適用する。

$(3)\Rightarrow(1)$：もしVC次元が無限なら、[無限VC次元のPAC下界](#thm-slt1-08-pac-lower-bound)が任意の算法の失敗確率を固定した $\varepsilon=\delta=1/8$ で $1/7$ 以上とするから、realizable PACに反する。従って有限VCである。
<!-- proof-end -->

この同値は**二値0–1損失、独立同分布、全分布を対象、有限または可算な可測クラス**で閉じた主張である。非可算クラスでは、上限・選択の可測性などを別途扱う必要がある。有界でない二乗損失、分布シフト、算法の計算時間について同じ主張を無条件に移さない。

## 5. 固定分布では無限VCでも収束し得る

分布自由の保証は全分布に同じ $N$ を要求する。ひとつの分布 $P$ を固定してよいなら、その分布の質量が乗る場所を有限個で近似するという別の方法がある。

<a id="def-slt1-08-fixed-p-uniform"></a>

<!-- formal-statement-start -->
> **定義（固定分布での一様収束）**
> 非空な有限または可算の可測二値クラス $\mathcal H$、0–1損失、同時分布 $P$ を固定する。$S\sim P^n$ に対し、任意の $\varepsilon>0,\delta\in(0,1)$ について $P$ に依存してよい整数 $N_P(\varepsilon,\delta)$ が存在し、全ての $n\ge N_P(\varepsilon,\delta)$ で

$$
\Pr_S\{D_{P,n}(S)>\varepsilon\}\le\delta
$$

> を満たすとき、$\mathcal H$ は $P$ に関して**固定分布での一様収束**を満たすという。これは $\sup_h$ を取った後で一つの $P$ を固定する条件であり、全分布に共通な $N$ を要求する[分布自由一様収束](../SLT1-04/index.md#def-slt1-04-distribution-free-uniform)とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-08-fixed-p-uniform -->
**定義の確認**。$P(X=1,Y=0)=1$ とし、$\mathcal H$ を自然数上の有限部分集合の指示関数全体とする。各 $h$ の経験損失は全ての標本で $\boldsymbol1_{\{h(1)\ne0\}}$、真のリスクも同じ値なので $D_{P,n}(S)=0$ が確率1で成立する。任意の $\varepsilon,\delta$ に $N_P=1$ を選べる。ここでは仮説が無限個あっても、一点上の損失しか見えない。
<!-- definition-example-end -->

もっと強く、自然数上の任意の同時分布 $P$ でも固定分布での一様収束は成立する。ここで $\mathcal H_{\rm fin}=\{\boldsymbol1_B:B\subseteq\mathbb N\text{ は有限}\}$ とする。このクラスは[無限VC次元である命題](../SLT1-05/index.md#prop-slt1-05-infinite-vc)で既に証明済みである。

<a id="prop-slt1-08-fixed-p-finite-sets"></a>

<!-- formal-statement-start -->
> **命題（無限VCでも固定分布で一様収束する例）**
> $\mathcal X=\mathbb N$ に離散可測構造を入れ、$\mathcal H_{\rm fin}$ を有限部分集合の指示関数全体とする。任意の $\mathbb N\times\{0,1\}$ 上の固定同時分布 $P$ に対し、$\mathcal H_{\rm fin}$ は0–1損失について固定分布での一様収束性を持つ。一方、全ての $P$ に共通する標本数では分布自由一様収束性を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

$P_X$ の質量の大部分を有限集合 $K$ に収める。$K$ 内の有限個のセル $(x,y)$ ではHoeffding不等式で経験頻度を同時制御する。$K$ の外は、真の質量と経験質量を合わせても小さくできる。必要な $K$ は $P$ に依存するため分布自由とは言えない。

<!-- proof-start -->
### 証明

$\varepsilon>0,\delta\in(0,1)$ を固定する。$\mathbb N$ の確率分布の級数和は1なので、十分大きい有限非空集合 $K$ を選んで

$$
p_{\rm tail}=P(X\notin K)<\frac{\varepsilon\delta}{8}
$$

とできる。$k=|K|$ とする。各セル $(x,y)\in K\times\{0,1\}$ の真の質量を $p_{xy}$、標本での相対頻度を $\widehat p_{xy}$ とする。任意の $h$ について損失はセルごとに0か1なので、$K$ 内でのリスクの差の絶対値は

$$
\left|\sum_{x\in K}\sum_{y=0}^1
\boldsymbol1_{\{h(x)\ne y\}}(\widehat p_{xy}-p_{xy})\right|
\le\sum_{x\in K}\sum_{y=0}^1|\widehat p_{xy}-p_{xy}|.
$$

一方、$K$ 外での差は、真の質量 $p_{\rm tail}$ と経験質量 $\widehat p_{\rm tail}=n^{-1}\sum_i\boldsymbol1_{\{X_i\notin K\}}$ の和以下である。従って**全ての $h$ に同時に**

$$
D_{P,n}(S)\le\sum_{x\in K}\sum_{y=0}^1|\widehat p_{xy}-p_{xy}|
+p_{\rm tail}+\widehat p_{\rm tail}.
$$

各セル指示変数は独立な0–1変数なので、[Hoeffding不等式](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)と有限和の確率の上界を使い、$2k$ セルのそれぞれが $|\widehat p_{xy}-p_{xy}|\le\varepsilon/(4k)$ である確率は少なくとも

$$
1-4k\exp\left(-2n\left(\frac{\varepsilon}{4k}\right)^2\right)
=1-4k e^{-n\varepsilon^2/(8k^2)}
$$

である。この事象ではセルの絶対差の総和は $\varepsilon/2$ 以下。また $\mathbb E\widehat p_{\rm tail}=p_{\rm tail}$ なので、非負量への[Markov不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)から

$$
\Pr\{\widehat p_{\rm tail}\ge\varepsilon/4\}
\le\frac{4p_{\rm tail}}{\varepsilon}<\frac\delta2.
$$

$k$ と $\varepsilon,\delta$ を固定したので、十分大きい $n$ では $4ke^{-n\varepsilon^2/(8k^2)}\le\delta/2$。二つの成功事象がともに起きる確率は少なくとも $1-\delta$。そのとき

$$
D_{P,n}(S)<\frac\varepsilon2+\frac{\varepsilon\delta}{8}
+\frac\varepsilon4<\varepsilon
$$

であり、[固定分布の定義](#def-slt1-08-fixed-p-uniform)を満たす。最後に、$\mathcal H_{\rm fin}$ は[有限部分集合の指示関数は無限VC次元である命題](../SLT1-05/index.md#prop-slt1-05-infinite-vc)のクラスなので、[無限VC次元と分布自由一様収束の障害](#thm-slt1-08-uniform-obstruction)から全分布に共通な偏差制御は不可能である。
<!-- proof-end -->

**失った仮定は何か。** 前節の必要性は各 $n$ ごとに悪い $P_n$ を選べることに依存していた。この命題では最初に $P$ を固定するため、質量のほとんどを有限集合へ集められる。ただし選んだ有限集合 $K$ の大きさは分布に依存し、同じ $K$ を全分布へ一律に選ぶことはできない。この違いが「固定分布では成功、分布自由では失敗」を両立させる。

## 演習

**問題 SLT1-08-A01（四点の未観測反転）**
- Level: A

四点 $V=\{a,b,c,d\}$ を shatter するクラス、均等入力分布、正解 $f=(0,1,0,1)$ を取る。訓練入力が $(a,c)$ のとき、経験リスク0で真のリスク $1/2$ の予測列を構成し、二つのリスクを直接計算せよ。

<!-- solution-start -->
**詳細解答**。観測点 $a,c$ の正解はともに0。未観測点 $b,d$ の正解1を反転した $g=(0,0,0,0)$ を取る。shattering により $V$ 上でこの列を実現する仮説がある。訓練側の損失は $(0,0)$ だから $\widehat R_S(g)=(0+0)/2=0$。分布側の損失は $(0,1,0,1)$ で、各点に重み $1/4$ をかけると $R_P(g)=(0+1+0+1)/4=1/2$。
<!-- solution-end -->

**問題 SLT1-08-A02（標本数と支持点数）**
- Level: A

$m>n$ 個の shatter された点上の均等realizable分布を考える。標本入力列から未観測点反転の仮説を作ったとき、一様偏差の下界を $m,n$ で表せ。$m=3n$ ならいくつか。

<!-- solution-start -->
**詳細解答**。観測された異なる入力の集合を $T$ とすれば $|T|\le n$。観測点では正解、未観測点では反転する仮説は shattering により存在する。この仮説の経験リスクは0、母集団リスクは $(m-|T|)/m$。従って $D_{P,n}\ge1-|T|/m\ge1-n/m$。$m=3n$ なら $D_{P,n}\ge2/3$。標本の重複は $|T|$ を減らすので下界を弱めない。
<!-- solution-end -->

**問題 SLT1-08-A03（二点の未知ラベル）**
- Level: A

$n=1$、入力が $\{a,b\}$ 上均等、両点の正解ラベルが独立な公平ビットである。訓練点に現れなかったテスト点で、任意の予測算法の条件付き誤り確率はいくつか。またその事象の確率と合わせて期待リスクの下界を求めよ。

<!-- solution-start -->
**詳細解答**。訓練点と独立なテスト点が異なる確率は $2(1/2)(1/2)=1/2$。この事象ではテスト点のラベルビットは訓練ラベルにも算法の独立乱数にも現れない。予測が0ならラベル1で誤り、予測が1ならラベル0で誤るので、いずれも条件付き誤り確率は $1/2$。観測済み点での誤り確率は非負だから、全体の平均リスクは少なくとも $(1/2)(1/2)=1/4$。
<!-- solution-end -->

**問題 SLT1-08-A04（期待値を失敗確率へ）**
- Level: A

$Z\in[0,1]$ かつ $\mathbb EZ\ge1/4$ とする。$q=\Pr(Z>1/8)$ と置き、$q\ge1/7$ を直接導け。

<!-- solution-start -->
**詳細解答**。$Z\le1/8$ では $Z\le1/8$、$Z>1/8$ では $Z\le1$ だから $\mathbb EZ\le(1-q)/8+q=1/8+7q/8$。$1/4\le1/8+7q/8$ より $q\ge(1/8)/(7/8)=1/7$。$Z$ をリスクとすれば、この $q$ は算法・標本の乱数に関する失敗確率であって、事前にランダム化した分布の確率ではない。
<!-- solution-end -->

**問題 SLT1-08-A05（有限部分集合のVC次元）**
- Level: A

$\mathcal H_{\rm fin}=\{\boldsymbol1_B:B\subseteq\mathbb N\text{ は有限}\}$ が可算でありながら無限VC次元を持つことを示せ。有限集合 $V$ の任意のラベル付けを実現する $B$ を明記せよ。

<!-- solution-start -->
**詳細解答**。有限部分集合の族は、各要素数 $k$ の部分集合全体が $\mathbb N^k$ の像で可算であり、その $k\ge0$ にわたる可算和なので可算。任意の有限 $V=\{x_1,\ldots,x_m\}$ とラベル $(y_i)$ について $B=\{x_i\in V:y_i=1\}$ は有限である。$\boldsymbol1_B(x_i)=y_i$ が全ての $i$ で成立するから $V$ を shatter する。任意の $m$ でこの構成が可能なのでVC次元は無限である。
<!-- solution-end -->

**問題 SLT1-08-B01（未観測質量の厳密な期待値）**
- Level: B

$m\ge n+1$ 点の均等入力、独立な公平ラベルの模型で、任意の学習算法のラベル付け全体にわたる平均期待リスクが $\frac12(1-1/m)^n$ 以上であることを導け。$m=2n$ に代入して $1/4$ 下界を回復せよ。

<!-- solution-start -->
**詳細解答**。独立なテスト入力 $X'$ を取る。$X'=x_j$ を固定すると、各訓練入力が $x_j$ と異なる確率は $1-1/m$。訓練入力は独立なので未出現確率は $(1-1/m)^n$、$X'$ を平均しても同じ。未出現の場合、$F(x_j)$ は訓練標本・算法乱数から独立な公平ビットなので誤り確率は $1/2$。従って平均期待リスクは少なくとも $\frac12(1-1/m)^n$。$m=2n$ なら $(1-1/(2n))^n\ge1-n/(2n)=1/2$ なので $1/4$ 以上である。
<!-- solution-end -->

**問題 SLT1-08-B02（量化順序による矛盾）**
- Level: B

無限VC次元クラスがrealizable PACだと仮定し、$\varepsilon=\delta=1/8$ に対する標本数 $m$ と算法族を用いて矛盾を完成せよ。「各 $n$ で異なる悪い分布を選ぶ」ことが許される理由も述べよ。

<!-- solution-start -->
**詳細解答**。[PACの定義](../SLT1-02/index.md#def-slt1-02-realizable-pac)では、先に算法族と標本数関数 $m$ が固定される。任意の $n\ge m(1/8,1/8)$ と全てのrealizable分布に対し、失敗確率は $1/8$ 以下でなければならない。

そこで次の標本数を固定する。

$$
n=\max\{1,m(1/8,1/8)\}.
$$

この $n$ と算法に[無限VC次元のPAC下界](#thm-slt1-08-pac-lower-bound)を適用すると、あるrealizable分布 $P_n$ で

$$
\Pr_{S,U}\{R_{P_n}(A_n(S,U))>1/8\}\ge1/7>1/8
$$

となる。これは保証の「全ての分布」に反する。反例分布が $n$ に依存しても、保証は**各 $n$ で全分布**を対象とするため矛盾は消えない。
<!-- solution-end -->

**問題 SLT1-08-B03（乱択を使っても逃げられない理由）**
- Level: B

未知ラベル $F_j\sim\operatorname{Bernoulli}(1/2)$ と独立な乱択予測 $\widehat Y\in\{0,1\}$ が、条件付きで $\Pr(\widehat Y=1)=q$ を満たすとする。$\Pr(\widehat Y\ne F_j)=1/2$ を計算せよ。独立性を失うとどうなるか。

<!-- solution-start -->
**詳細解答**。独立性により $\Pr(\widehat Y=1,F_j=0)=q/2$、$\Pr(\widehat Y=0,F_j=1)=(1-q)/2$。二事象は互いに排反だから誤り確率は $q/2+(1-q)/2=1/2$。$q$ の値を調整しても改善しない。一方 $\widehat Y=F_j$ のように予測が未知ラベルを事前に知れば誤り0になるが、それは算法が未観測の正解へアクセスできないという独立性を壊し、下界の設定外である。
<!-- solution-end -->

**問題 SLT1-08-B04（可算クラスでの近似ERM構成）**
- Level: B

可算クラス $\mathcal H=\{h_j\}_{j\ge1}$ で各経験リスクが可測とする。$\eta_n=1/n$ の近似ERMを可測に選び、VC次元 $d<\infty$ のときagnostic PACとなる論理を説明せよ。

<!-- solution-start -->
**詳細解答**。可算個の可測関数の下限

$$
r_*(S)=\inf_j\widehat R_S(h_j)
$$

も可測である。$j(S)$ を次の条件を満たす最初の添字とする。

$$
\widehat R_S(h_j)<r_*(S)+\frac1n.
$$

下限の性質により少なくとも一つ存在する。事象 $\{j(S)=j\}$ は $j$ 番目の不等式とそれ以前の有限個の否定の共通部分だから可測である。従って出力 $h_{j(S)}$ は可測な $1/n$-近似ERMとなる。

有限VC次元なら[前章の高確率界](../SLT1-07/index.md#cor-slt1-07-vc-high-prob)の $B_{n,d,\delta}\to0$ が分布に一様である。[近似ERMの過剰リスク界](../SLT1-07/index.md#cor-slt1-07-agnostic-erm)より、確率 $1-\delta$ 以上で

$$
R_P(h_{j(S)})-\inf_{h\in\mathcal H}R_P(h)
\le2B_{n,d,\delta}+\frac1n.
$$

任意の $\varepsilon>0$ について十分大きい $n$ で右辺は $\varepsilon$ 以下となる。この標本数は分布に依存しない。
<!-- solution-end -->

**問題 SLT1-08-C01（固定分布と分布自由を一つの模型で比較）**
- Level: C

$\mathcal H_{\rm fin}$ を自然数の有限部分集合の指示関数クラス、$P_X(\{j\})=2^{-j}$、$Y$ を $X$ に依存してよい任意の二値ラベルとする。(i) 任意の $\varepsilon,\delta\in(0,1)$ に対して有限切断 $K=\{1,\ldots,k\}$ と標本数の十分条件を具体的に作り、[固定分布での一様収束](#def-slt1-08-fixed-p-uniform)を証明せよ。(ii) 全分布に共通な標本数が存在しないことを、(i) と矛盾せずに説明せよ。

<!-- solution-start -->
**詳細解答**。(i) 尾部確率は等比級数から $P(X>k)=\sum_{j=k+1}^\infty2^{-j}=2^{-k}$。まず $2^{-k}<\varepsilon\delta/8$ を満たす整数 $k$ を選ぶ。例えば $k>\log_2(8/(\varepsilon\delta))$ ならよい。$2k$ 個のセル $(j,y)$（$1\le j\le k$、$y=0,1$）の各経験頻度と母集団確率の差を $\varepsilon/(4k)$ 以下に抑える。[Hoeffdingの両側版](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)と和事象の確率上界から失敗確率は

$$
4k\exp\left(-\frac{n\varepsilon^2}{8k^2}\right).
$$

従って

$$
n\ge\frac{8k^2}{\varepsilon^2}\log\frac{8k}{\delta}
$$

ならこの失敗確率は $\delta/2$ 以下。尾部の経験頻度 $\widehat p_{\rm tail}$ は期待値 $2^{-k}$ なので、[Markov不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)から $\Pr(\widehat p_{\rm tail}\ge\varepsilon/4)\le4\cdot2^{-k}/\varepsilon<\delta/2$。両事象が成功すれば、任意の仮説について

$$
|R_P(h)-\widehat R_S(h)|
\le\sum_{j\le k,y}|\widehat p_{jy}-p_{jy}|+2^{-k}+\widehat p_{\rm tail}
<\frac\varepsilon2+\frac{\varepsilon\delta}{8}+\frac\varepsilon4
<\varepsilon.
$$

従って上で選んだ $k$ と標本数の十分条件で[固定分布での一様収束](#def-slt1-08-fixed-p-uniform)が成り立つ。ラベル $Y$ の条件付き分布には制約を加えていない。

(ii) [有限部分集合の指示関数は無限VC次元である命題](../SLT1-05/index.md#prop-slt1-05-infinite-vc)により、任意の $n$ で $2n$ 点を shatter できる。入力をその $2n$ 点上**均等**に置き、正解ラベルを固定した分布 $P_n$ を取れば、[無限VC次元と分布自由一様収束の障害](#thm-slt1-08-uniform-obstruction)から $D_{P_n,n}\ge1/2$ が確率1で成立する。(i) は最初から質量 $2^{-j}$ の一つの分布を固定した話であり、(ii) は標本数ごとに分布を変更した話なので矛盾しない。
<!-- solution-end -->

## まとめ

- 無限VC次元なら、任意の標本数 $n$ で shatter される $2n$ 点を使い、分布自由一様偏差を確率1で $1/2$ 以上にできる。
- 全候補の同時偏差制御が失敗するだけではPAC学習不能は言えない。任意の算法に対するランダムラベル平均化から、realizable分布での期待リスク $1/4$、失敗確率 $1/7$ の下界を得た。
- 有限または可算な可測二値クラス、独立同分布、0–1損失、全分布という条件の下で、有限VC次元・[分布自由一様収束](../SLT1-04/index.md#def-slt1-04-distribution-free-uniform)・realizable/agnostic PAC学習可能性は同値となる。
- 無限VC次元でも、**固定した**自然数上の分布に対しては[固定分布での一様収束](#def-slt1-08-fixed-p-uniform)が成り立ち得る。分布自由性と固定分布での収束を区別する。

次章では、二値予測パターンではなく実数値の関数クラスを近似するための被覆数とpackingへ進む。
