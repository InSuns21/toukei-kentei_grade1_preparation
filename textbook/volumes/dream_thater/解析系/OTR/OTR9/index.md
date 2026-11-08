# OTR9 Wasserstein収束は何を意味するか

<!-- definition-example-audit: strict -->

## 1. 分布が近づいても、遠くの少量の質量は見えるか

[OTR8の距離公理](../OTR8/index.md#thm-otr8-metric)によって、非空のPolish空間（完備可分距離空間）$(X,d)$ と$p\ge1$ に対し、有限$p$次モーメントを持つ確率測度の集合 $\mathcal P_p(X)$ は距離 $W_p$ を持ちます。しかし、この距離で収束するとは何が近づくことなのでしょうか。

[OTR3の狭義収束](../OTR3/index.md#def-otr3-narrow)は、すべての有界連続関数での積分が収束することを要求します。これは遠方に逃げるごく小さい質量を見逃すことがあります。例えば $X=\mathbb R$ で

$$
\mu_n=\left(1-\frac1n\right)\delta_0+\frac1n\delta_{n^{1/p}},
\qquad \mu=\delta_0
$$

とします（$n\ge1$）。有界連続関数 $h$ に対し

$$
\left|\int h\,d\mu_n-\int h\,d\mu\right|
=\frac1n|h(n^{1/p})-h(0)|\le\frac{2\|h\|_\infty}{n}\to0.
$$

一方、$\delta_0$ へ運ぶ結合は一意なので、[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義式から

$$
W_p(\mu_n,\delta_0)^p=\int|x|^p\,d\mu_n=\frac1n\,n=1.
$$

**狭義収束だけでは $W_p$ 収束になりません。** 必要なのは遠方にある質量の$p$次の寄与も消えることです。この章ではその条件を定理として証明し、さらに測度の距離空間が完備・可分であることまで確認します。

## 2. 距離による収束とモーメントによる検査

$W_p$ が距離である以上、「$W_p$ 収束」は距離がゼロに近づくという意味です。その定義を明示してから、直接判定できる例を作ります。

<a id="def-otr9-wp-convergence"></a>

<!-- formal-statement-start -->
> **定義（Wasserstein収束）**
> $(X,d)$ を非空のPolish空間、$p\ge1$ とし、$\mu_n,\mu\in\mathcal P_p(X)$ とする。$\mu_n$ が $\mu$ に **$p$-Wasserstein収束**するとは、次を満たすことをいう。

$$
\lim_{n\to\infty}W_p(\mu_n,\mu)=0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr9-wp-convergence -->
### 定義の確認：固定距離を動く微小質量

**定義の確認**：両測度が $\mathcal P_p$ に属すること、結合が一意であること、距離が0へ近づくことを順に調べます。

$\nu_n=(1-1/n)\delta_0+(1/n)\delta_1$、$\nu=\delta_0$ とします。質量は非負で和は1、台は有限なので双方とも $\mathcal P_p(\mathbb R)$ に属します。第二周辺が $\delta_0$ なら結合は $y=0$ のものに限られ、

$$
W_p(\nu_n,\nu)^p=\frac1n\,|1-0|^p=\frac1n,
\qquad W_p(\nu_n,\nu)=n^{-1/p}\to0.
$$

ここでは遠方の位置を固定したため、消える質量の費用も消えました。第1節の例と比較すると、**質量だけでなく移動距離の$p$乗との積**が効いていると分かります。
<!-- definition-example-end -->

基準点 $o\in X$ を一つ固定し、モーメントを

$$
M_p(\rho;o)=\int_X d(x,o)^p\,d\rho(x)
$$

と記します。[有限$p$次モーメント](../OTR8/index.md#def-otr8-p-moment)を持つ測度では有限値です。$M_p(\rho;o)$ は基準点で値が変わりますが、有限性は[基準点不変性](../OTR8/index.md#prop-otr8-basepoint)により変わりません。

<a id="prop-otr9-necessary"></a>

<!-- formal-statement-start -->
> **命題（Wasserstein収束の必要条件）**
> $(X,d)$ を非空のPolish空間、$p\ge1$ とし、$\mu_n,\mu\in\mathcal P_p(X)$ とする。$W_p(\mu_n,\mu)\to0$ なら、$\mu_n$ は $\mu$ に狭義収束する。また、任意の基準点 $o\in X$ について次が成り立つ。

$$
\int_X d(x,o)^p\,d\mu_n(x)
\longrightarrow\int_X d(x,o)^p\,d\mu(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

最適結合の下で二点間の距離が大きい確率を $W_p^p$ で抑えると、連続関数の積分が近づきます。モーメントについては、一点測度 $\delta_o$ までの距離がモーメントの $p$ 乗根であることと、[距離の逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を使います。

<!-- proof-start -->
### 証明

$\pi_n\in\Pi(\mu_n,\mu)$ を $d^p$ の最適結合とします。[OTR3の最適結合存在定理](../OTR3/index.md#thm-otr3-polish)は、非負連続費用 $d^p$ とPolish空間に適用でき、有限費用は両測度のモーメントから保証されます。任意の $r>0$ に対し

$$
\pi_n\{d(x,y)\ge r\}
\le\frac1{r^p}\int d(x,y)^p\,d\pi_n
=\frac{W_p(\mu_n,\mu)^p}{r^p}\to0.
$$

有界連続関数 $h:X\to\mathbb R$ と $\varepsilon>0$ を取ります。[Polish空間の確率測度の緊密性](../OTR3/index.md#lem-otr3-polish-tight)から、コンパクト集合 $K$ を選びます。その質量は $\mu(K)>1-\varepsilon$ とできます。

連続性とコンパクト性から $r>0$ を十分小さくすると、次の含意が成立します。

$$
y\in K,\quad d(x,y)<r\quad\Longrightarrow\quad
|h(x)-h(y)|<\varepsilon.
$$

実際、各点の連続性近傍から有限部分被覆を選べば、一様な距離 $r$ が得られます。ここでは第二周辺の $y$ が $\mu$ に従います。従って

$$
\begin{aligned}
\left|\int h\,d\mu_n-\int h\,d\mu\right|
&\le\int|h(x)-h(y)|\,d\pi_n\\
&\le\varepsilon+2\|h\|_\infty
\bigl(\mu(K^c)+\pi_n\{d(x,y)\ge r\}\bigr).
\end{aligned}
$$

$n\to\infty$ の後に $\varepsilon\downarrow0$ とすれば積分差が0となり、狭義収束です。

次に $\delta_o$ を一方の周辺とする結合は一意だから

$$
W_p(\rho,\delta_o)=M_p(\rho;o)^{1/p}
\quad(\rho\in\mathcal P_p(X)).
$$

[Wasserstein距離の三角不等式](../OTR8/index.md#thm-otr8-metric)の逆向きの形を $\mu_n,\mu,\delta_o$ に適用して

$$
\bigl|M_p(\mu_n;o)^{1/p}-M_p(\mu;o)^{1/p}\bigr|
\le W_p(\mu_n,\mu)\to0.
$$

$t\mapsto t^p$ は非負実数上で連続ですから、$p$ 乗してモーメント収束を得ます。$\square$
<!-- proof-end -->

逆向きは、確率測度が狭義収束するだけでなく、費用を大きくする尾部が抑えられることを示す必要があります。ここがこの章の核心です。

## 3. 狭義収束から「近い点を組にする」結合を作る

狭義収束そのものは、二つの分布の上にある点 $x,y$ を対応付けません。一方、$W_p$ は結合を使って距離を測ります。そこで、まず費用の$p$次平均は考えず、**点間距離が大きい組の確率を小さくする結合**を作ります。

<a id="lem-otr9-near-diagonal"></a>

<!-- formal-statement-start -->
> **補題（狭義収束から近接結合を構成する）**
> $(X,d)$ を非空のPolish空間、$\mu_n,\mu$ をその上のBorel確率測度とする。$\mu_n$ が $\mu$ に狭義収束するなら、各 $n$ に対し $\gamma_n\in\Pi(\mu_n,\mu)$ を選んで、すべての $r>0$ について次を満たすようにできる。

$$
\gamma_n\{(x,y):d(x,y)\ge r\}\longrightarrow0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

極限測度の質量のほとんどを、直径の小さな有限個のBorel集合に分けます。同じセルにある部分を結合し、余った質量だけ自由に結合します。セルの境界で質量が飛ばないように選べば、狭義収束によって余剰質量が消えます。

<!-- proof-start -->
### 証明

**（1）小さいセルを作る。** $r>0$ と $\delta>0$ を固定します。[緊密性](../OTR3/index.md#lem-otr3-polish-tight)から、$\mu(K)>1-\delta$ であるコンパクト $K$ を取ります。任意の中心 $z\in K$ で、$r/4<s_z<r/3$ の半径を選び、球 $U_z=B(z,s_z)$ の境界の $\mu$ 質量が0になるようにできます。理由は、異なる半径の球面は互いに交わらず、正の質量を持つ互いに素な集合は高々可算個だからです。

$U_z$ は $K$ を覆い、有限部分被覆 $U_1,\ldots,U_m$ が取れます。

$$
B_1=U_1,\quad B_i=U_i\setminus\bigcup_{j<i}U_j\ (2\le i\le m),
\quad B_0=X\setminus\bigcup_{i=1}^mU_i
$$

を作るとBorel分割で、$i\ge1$ のセルは直径が $2r/3<r$ です。各 $B_i$ の境界は有限個の $\partial U_j$ の合併に含まれ、$\mu(\partial B_i)=0$ です。また $\mu(B_0)<\delta$ です。

**（2）セルの質量が近づく。** $a_{n,i}=\mu_n(B_i)$、$b_i=\mu(B_i)$ とします。狭義収束から、開集合への下界と閉集合への上界が成り立ちます（[OTR3の狭義収束](../OTR3/index.md#def-otr3-narrow)から有界連続近似で導けます）。$B_i^\circ\subset B_i\subset\overline{B_i}$ で境界の $\mu$ 質量が0なので、

$$
b_i=\mu(B_i^\circ)\le\liminf_na_{n,i}
\le\limsup_na_{n,i}\le\mu(\overline{B_i})=b_i.
$$

従って各 $i$ で $a_{n,i}\to b_i$ です。

**（3）共通質量をセル内で結ぶ。** $m_{n,i}=\min(a_{n,i},b_i)$ とします。$a_{n,i}b_i>0$ なら

$$
\gamma_{n,i}=\frac{m_{n,i}}{a_{n,i}b_i}
\bigl(\mu_n|_{B_i}\otimes\mu|_{B_i}\bigr)
$$

と置き、いずれかが0なら零測度とします。各セルの第一・第二周辺は、それぞれ $m_{n,i}\mu_n|_{B_i}/a_{n,i}$ と $m_{n,i}\mu|_{B_i}/b_i$ です。$\sum_i\gamma_{n,i}$ の周辺を元の周辺から引いた非負測度を $\alpha_n,\beta_n$ とすると、両者の全質量は同じ

$$
R_n=1-\sum_{i=0}^m m_{n,i}
=\frac12\sum_{i=0}^m|a_{n,i}-b_i|\longrightarrow0
$$

です。$R_n>0$ なら $\alpha_n\otimes\beta_n/R_n$ を残りの結合とし、$R_n=0$ なら加えません。これで

$$
\gamma_n=\sum_{i=0}^m\gamma_{n,i}
+\begin{cases}\alpha_n\otimes\beta_n/R_n,&R_n>0,\\0,&R_n=0\end{cases}
$$

は確率測度で、両周辺は $\mu_n,\mu$ です。同じ $B_i$（$i\ge1$）内で結んだ点間距離は $r$ 未満なので、

$$
\gamma_n\{d(x,y)\ge r\}
\le m_{n,0}+R_n\le\mu(B_0)+R_n<\delta+R_n.
$$

$n\to\infty$ で上極限は高々 $\delta$、$\delta>0$ は任意です。ここまでの構成は $r,\delta$ に依存しますが、補題の「全 $r$ で同時に成立する一列」を得るには、$r=1/j,\delta=1/j$（$j\ge1$）に対する構成を $\gamma_n^{(j)}$ として持ち、$n$ が十分大きいほど $j=j(n)\uparrow\infty$ を遅く増やす対角選択を行います。具体的に各 $j$ で $n\ge N_j$ なら上の確率が $2/j$ 以下となる $N_j$ を選び、$N_j$ を厳密増加にして $j(n)=\max\{j:N_j\le n\}$ とすればよいのです。$r>0$ に対して $1/j(n)<r$ となるので、求める性質が従います。$\square$
<!-- proof-end -->

この補題は「大きくずれる確率」を消すだけで、まだ「距離の$p$乗の平均」を消していません。遠方のごく小さい質量はその違いを作ります。

## 4. モーメント収束が尾部の費用を抑える

非負関数 $f$ に対して $f\,\boldsymbol{1}_{\{f>M\}}$ は、値が $M$ を超える部分だけの寄与です。これが $M\to\infty$ で測度列について**一様に**小さければ、大きな値のまれな出現に平均が支配されません。

<a id="lem-otr9-tail"></a>

<!-- formal-statement-start -->
> **補題（狭義収束と積分収束からの一様な尾部評価）**
> $(X,d)$ をPolish空間、$\mu_n,\mu$ をBorel確率測度、$f:X\to[0,\infty)$ を連続関数とする。$\mu_n$ が $\mu$ に狭義収束し、$\int f\,d\mu_n\to\int f\,d\mu<\infty$ なら、次が成り立つ。

$$
\lim_{M\to\infty}\sup_{n\ge1}
\int f\,\boldsymbol{1}_{\{f>M\}}\,d\mu_n=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$f$ は非有界かもしれませんが、$\min(f,M)$ は有界連続です。全積分から切り詰めた積分を引けば、尾部にある「超過分」の積分が得られます。

<!-- proof-start -->
### 証明

$g_M=\min(f,M)$ は有界連続なので、狭義収束から $\int g_M\,d\mu_n\to\int g_M\,d\mu$ です。仮定の全積分の収束を引くと

$$
\int(f-M)_+\,d\mu_n
=\int f\,d\mu_n-\int g_M\,d\mu_n
\longrightarrow\int(f-M)_+\,d\mu.
$$

右辺は $M\uparrow\infty$ で0へ減少します（$0\le(f-M)_+\le f$ と $\int f\,d\mu<\infty$）。任意の $\varepsilon>0$ に対して、まず $M_0$ を選んで極限の積分を $\varepsilon/2$ 未満にすれば、十分大きい $n$ では $\int(f-M_0)_+\,d\mu_n<\varepsilon$ です。残る有限個の $n$ については各 $\int f\,d\mu_n$ が有限なので、$M$ をさらに増やせば超過分がそれぞれ0へ近づきます。$M\ge M_0$ で単調減少することと合わせ、

$$
\lim_{M\to\infty}\sup_n\int(f-M)_+\,d\mu_n=0.
$$

$f>2M$ では $f\le2(f-M)$ だから

$$
\int f\,\boldsymbol{1}_{\{f>2M\}}\,d\mu_n
\le2\int(f-M)_+\,d\mu_n.
$$

両辺で上限を取れば結論です。$\square$
<!-- proof-end -->

ここで $f(x)=d(x,o)^p$ とすれば、ちょうど欲しかった尾部制御になります。連続性は距離の連続性から、積分の有限性は $\mathcal P_p(X)$ から得られます。

## 5. Wasserstein収束の判定定理

<a id="thm-otr9-convergence"></a>

<!-- formal-statement-start -->
> **定理（Wasserstein収束の特徴付け）**
> $(X,d)$ を非空のPolish空間、$p\ge1$ とし、$\mu_n,\mu\in\mathcal P_p(X)$ とする。このとき以下の二条件は同値である。
>
> 1. $W_p(\mu_n,\mu)\to0$。
> 2. $\mu_n$ は $\mu$ に狭義収束し、ある（従って任意の）$o\in X$ で$p$次モーメントが収束する。

$$
\int_X d(x,o)^p\,d\mu_n(x)
\longrightarrow\int_X d(x,o)^p\,d\mu(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

必要性は[前節までの必要条件命題](#prop-otr9-necessary)です。十分性では、[近接結合の補題](#lem-otr9-near-diagonal)で輸送距離が大きい確率を0へ近づけ、[尾部補題](#lem-otr9-tail)でその少数の長距離輸送の費用を小さくします。

<!-- proof-start -->
### 証明

**必要性。** [必要条件命題](#prop-otr9-necessary)から従います。

**十分性。** 基準点 $o\in X$ を固定します。$\mu_n\Rightarrow\mu$ と$p$次モーメント収束を仮定します。[近接結合の補題](#lem-otr9-near-diagonal)で $\gamma_n\in\Pi(\mu_n,\mu)$ を取り、任意の $r>0$ について $\gamma_n\{d(x,y)\ge r\}\to0$ とします。

$a(x)=d(x,o)^p$、$b(y)=d(y,o)^p$、$c=2^{p-1}$ と置きます。点の三角不等式と[OTR8の$p$乗評価](../OTR8/index.md#prop-otr8-basepoint)の証明により

$$
0\le d(x,y)^p\le c(a(x)+b(y)).
$$

[尾部補題](#lem-otr9-tail)を $f=a$ と $\mu_n$ に、さらに $f=b$ と定値列 $\mu$ に適用します。いずれも積分の尾部を一様に小さくできます。非負数 $u,v$ に対し $u+v\le2\max(u,v)$ なので

$$
(u+v-L)_+\le(2u-L)_++(2v-L)_+.
$$

この式を $u=a(x),v=b(y),L=M/c$ に用いると

$$
\begin{aligned}
\int(d(x,y)^p-M)_+\,d\gamma_n
&\le c\int(a+b-M/c)_+\,d\gamma_n\\
&\le c\int(2a-M/c)_+\,d\mu_n
+c\int(2b-M/c)_+\,d\mu.
\end{aligned}
$$

右辺は $M\to\infty$ で $n$ に一様に0へ近づきます。さらに $t>2M$ なら $t\le2(t-M)$ なので

$$
\lim_{M\to\infty}\sup_n
\int d(x,y)^p\,\boldsymbol{1}_{\{d(x,y)^p>2M\}}\,d\gamma_n=0.
$$

任意の $r>0$ と $L>0$ で積分を $d\le r$、$d>r$ かつ $d^p\le L$、$d^p>L$ に分けると

$$
\int d(x,y)^p\,d\gamma_n
\le r^p+L\gamma_n\{d(x,y)>r\}
+\int d(x,y)^p\boldsymbol{1}_{\{d(x,y)^p>L\}}\,d\gamma_n.
$$

まず $L$ を大きく取って最後の項を一様に小さくし、次に $n\to\infty$ として中央の項を消し、最後に $r\downarrow0$ とします。従って $\int d^p\,d\gamma_n\to0$ です。[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)は許容結合上の費用の下限であるため、

$$
0\le W_p(\mu_n,\mu)^p
\le\int d(x,y)^p\,d\gamma_n\longrightarrow0.
$$

これで十分性が示されました。基準点を変えたモーメント収束も、得られた $W_p$ 収束を[必要条件命題](#prop-otr9-necessary)へ適用すれば従います。$\square$
<!-- proof-end -->

### 直ちに分かる二つの帰結

1. $X$ の距離 $d$ が有界なら、$x\mapsto d(x,o)^p$ は有界連続です。従って **狭義収束と $W_p$ 収束は同値**です。
2. $1\le p<q$ とし、両測度が $\mathcal P_q(X)$ にあるなら、[OTR8の次数比較](../OTR8/index.md#prop-otr8-order)から $W_p\le W_q$ です。従って $W_q$ 収束は $W_p$ 収束を含意しますが、逆は一般に成り立ちません。

特に $\rho_n=(1-n^{-q})\delta_0+n^{-q}\delta_n$（$n\ge1$、$q>p$）では $W_p(\rho_n,\delta_0)^p=n^{p-q}\to0$、しかし $W_q(\rho_n,\delta_0)^q=1$ です。

## 6. 完備性：Cauchy列の極限は空間の内側に残るか

距離が定まっても、距離についてCauchyである測度列の極限が存在するとは限りません。元の点空間 $X$ が完備であることを、確率測度の側へ持ち上げます。

最初に、隣り合う分布の結合を無限個つないだ確率実験を作ります。有限個の結合をつなぐ[貼り合わせ補題](../OTR8/index.md#lem-otr8-gluing)だけから構成できます。

<a id="lem-otr9-countable-gluing"></a>

<!-- formal-statement-start -->
> **補題（可算列の結合）**
> $(X,d)$ を非空のPolish空間とする。Borel確率測度の列 $(\rho_k)_{k\ge1}$ と、各隣接する二測度の結合 $(\pi_k)_{k\ge1}$ が与えられ、次を満たすとする。

$$
\pi_k\in\Pi(\rho_k,\rho_{k+1})\qquad(k\ge1).
$$

> このとき $X^{\mathbb N}$ 上のBorel確率測度 $P$ が存在する。座標写像 $Z_k(x_1,x_2,\ldots)=x_k$ の分布は $\rho_k$、$(Z_k,Z_{k+1})$ の分布は $\pi_k$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の隣接結合をつなぎ、残りの座標を基準点で埋めて無限直積上の測度にします。各座標の周辺が固定されているので、積空間で緊密性が成立し、極限で各隣接周辺が保たれます。

<!-- proof-start -->
### 証明

[貼り合わせ補題](../OTR8/index.md#lem-otr8-gluing)を帰納的に適用し、最初の $m$ 座標上の確率測度で、隣接周辺が $\pi_1,\ldots,\pi_{m-1}$ であるものを作ります。点 $o\in X$ を固定し、$m$ より後の座標をすべて $o$ として $X^{\mathbb N}$ 上の測度 $P_m$ へ延長します。

座標 $k$ の周辺は $m\ge k$ なら $\rho_k$、$m<k$ なら $\delta_o$ です。任意の $\varepsilon>0$ に対し、[Polish空間上の緊密性](../OTR3/index.md#lem-otr3-polish-tight)から、$o$ を含むコンパクト集合 $K_k$ で $\rho_k(K_k)>1-\varepsilon2^{-k}$ となるものを選べます。すると

$$
P_m\left(\prod_{k=1}^\infty K_k\right)
\ge1-\sum_{k=1}^\infty\varepsilon2^{-k}=1-\varepsilon
$$

がすべての $m$ で成立します。ここで直積空間に距離

$$
D(x,y)=\sum_{k=1}^\infty 2^{-k}\min\{1,d(x_k,y_k)\}
$$

を入れます。この距離のCauchy列は各座標でCauchyなので、$X$ の完備性から座標ごとに収束します。有限個の座標と級数の尾部を分けて評価すれば、直積の距離 $D$ でも収束します。

各座標の可算稠密集合から点を選び、最初の有限個の座標だけ動かして残りを $o$ とした点全体は可算稠密です。従って直積は完備可分、すなわちPolish空間です。

また、$\prod K_k$ 内の点列からは、$K_1$、$K_2$、…の順に収束部分列を抜き出して対角列を取れます。その対角列は $D$ に関して収束するので、直積集合はコンパクトです。

ゆえに $\{P_m\}$ は一様緊密です。[Prokhorovのコンパクト性定理](../OTR3/index.md#thm-otr3-prokhorov)により部分列が狭義収束します。その極限を $P$ とします。

任意の固定 $k$ に対し、十分大きい $m$ で $(k,k+1)$ 周辺は常に $\pi_k$ です。座標射影は連続なので狭義極限でもこの周辺は $\pi_k$ のままです。各一座標周辺も $\rho_k$ のままです。$\square$
<!-- proof-end -->

<a id="thm-otr9-complete"></a>

<!-- formal-statement-start -->
> **定理（Wasserstein空間の完備性）**
> $(X,d)$ を非空の完備可分距離空間、$p\ge1$ とする。このとき $(\mathcal P_p(X),W_p)$ は完備距離空間である。
<!-- formal-statement-end -->

### 証明の見取り図

$W_p$-Cauchy列から距離の和が収束するほど速い部分列を取ります。隣接する最適結合を[可算貼り合わせ](#lem-otr9-countable-gluing)で一つの確率空間へ載せると、点列の移動距離の和がほとんど確実に有限になり、$X$ の完備性から極限点が生まれます。

<!-- proof-start -->
### 証明

$(\mu_n)$ を $W_p$-Cauchy列とします。増加する添字 $n_k$ を帰納的に選び、

$$
W_p(\mu_{n_k},\mu_{n_{k+1}})\le2^{-k}
\qquad(k\ge1)
$$

とできます。実際、Cauchy条件から各 $k$ について $n,m\ge N_k$ なら距離が $2^{-k}$ 以下となる $N_k$ が取れます。$n_k\ge N_k$ かつ $n_{k+1}>n_k$ となるように選べば、隣接対でもこの上界が成立します。各隣接対の最適結合 $\pi_k$ を取り、[可算列の結合](#lem-otr9-countable-gluing)で座標確率変数 $Z_k$ を同じ確率空間上に置きます。すると

$$
\left(\int d(Z_k,Z_{k+1})^p\,dP\right)^{1/p}
=W_p(\mu_{n_k},\mu_{n_{k+1}})\le2^{-k}.
$$

$P$ は確率測度なので、[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)を指数 $p$ と $p/(p-1)$（$p=1$ は直接積分）で適用し、$\int d(Z_k,Z_{k+1})\,dP\le2^{-k}$ を得ます。非負項の和と積分の交換により

$$
\int\sum_{k=1}^\infty d(Z_k,Z_{k+1})\,dP
=\sum_{k=1}^\infty\int d(Z_k,Z_{k+1})\,dP
\le\sum_{k=1}^\infty2^{-k}<\infty.
$$

従ってこの距離の級数はほとんど確実に有限で、$Z_k$ はほとんど確実にCauchyです。$X$ が完備なので極限 $Z$ が存在し、距離空間値の可測写像の点ごとの極限として可測です。例外集合では $Z=o$ と定めます。

有限の三角不等式と[積分のMinkowski不等式](../OTR8/index.md#lem-otr8-minkowski)から、$m>k$ に対し

$$
\left(\int d(Z_k,Z_m)^p\,dP\right)^{1/p}
\le\sum_{j=k}^{m-1}2^{-j}\le2^{1-k}.
$$

$m\to\infty$ として[Fatouの補題](../../F0/F0-00D2B/index.md#lem-f0-00d2b-01)を非負関数 $d(Z_k,Z_m)^p$ に使うと

$$
\left(\int d(Z_k,Z)^p\,dP\right)^{1/p}\le2^{1-k}.
$$

$Z_1$ の分布は $\mu_{n_1}\in\mathcal P_p(X)$ です。また $d(o,Z)\le d(o,Z_1)+d(Z_1,Z)$ なので、[Minkowskiの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-02)から $\int d(o,Z)^p\,dP<\infty$。従って $\mu=\operatorname{Law}(Z)\in\mathcal P_p(X)$ です。$(Z_k,Z)$ の分布は $\mu_{n_k}$ と $\mu$ の許容結合だから

$$
W_p(\mu_{n_k},\mu)\le
\left(\int d(Z_k,Z)^p\,dP\right)^{1/p}
\le2^{1-k}\to0.
$$

最後にCauchy性から任意の $\varepsilon>0$ に対して $N$ があり、$n,m\ge N$ なら $W_p(\mu_n,\mu_m)<\varepsilon/2$ です。$n_k\ge N$ で $W_p(\mu_{n_k},\mu)<\varepsilon/2$ となる $k$ を選べば、$n\ge N$ について三角不等式から $W_p(\mu_n,\mu)<\varepsilon$ です。全列が収束しました。$\square$
<!-- proof-end -->

## 7. 可分性：有限個の有理重みの分布で近似できるか

元の空間に稠密な可算集合があれば、確率分布もそこにある有限個の点と有理数の重みだけで近似できます。完備性と合わせると、Wasserstein空間自身がPolishになります。

<a id="thm-otr9-separable"></a>

<!-- formal-statement-start -->
> **定理（Wasserstein空間の可分性）**
> $(X,d)$ を非空の可分距離空間、$p\ge1$ とし、$\mathcal P_p(X)$ 上で $W_p$ が距離であるとする。$X$ の可算稠密集合 $D$ に有限個の原子を持ち、重みが非負有理数で和1となる確率測度全体は、$W_p$ について可算稠密である。特に $X$ がPolishなら $(\mathcal P_p(X),W_p)$ は可分である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の点を可算稠密集合の最初の $m$ 点のうち最も近い点に写します。写した後は有限原子測度であり、その重みを少しずつ有理数へ変えます。

<!-- proof-start -->
### 証明

$D=\{z_1,z_2,\ldots\}$ を可算稠密集合とします（$D$ が有限の場合はその要素を繰り返して列挙します）。$T_m(x)$ を $z_1,\ldots,z_m$ のうち距離 $d(x,z_i)$ が最小の点とし、同距離なら番号が最小の点を選ぶものとします。有限個の連続距離関数の比較で定まるので $T_m$ はBorel可測です。

$D$ の稠密性から $d(x,T_m(x))\to0$ が全 $x$ で成り立ちます。また $z_1$ も候補なので

$$
0\le d(x,T_m(x))^p\le d(x,z_1)^p.
$$

任意の $\mu\in\mathcal P_p(X)$ に対して右辺は可積分であり、[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から $\int d(x,T_m(x))^p\,d\mu\to0$ です。$\nu_m=(T_m)_\#\mu$ と置くと、グラフ結合 $({\rm id},T_m)_\#\mu$ により

$$
W_p(\mu,\nu_m)^p\le\int d(x,T_m(x))^p\,d\mu\to0.
$$

$\nu_m=\sum_{i=1}^ma_i\delta_{z_i}$ と書けます（$a_i\ge0$、$\sum_ia_i=1$）。非負有理数 $q_i$ を $\sum_iq_i=1$ を保ちながら $\sum_i|a_i-q_i|$ が任意に小さくなるように選べます。例えば最初の $m-1$ 個を十分近い有理数へ下から近似し、最後に残りを割り当てます。

$\eta_m=\sum_iq_i\delta_{z_i}$ とし、同じ点に質量 $\min(a_i,q_i)$ を置きます。余剰質量の総量は $r=\frac12\sum_i|a_i-q_i|$ で、余った二つの周辺を有限点集合内で結べます。$L_m=\max_{i,j\le m}d(z_i,z_j)$ とすると

$$
W_p(\nu_m,\eta_m)^p\le L_m^p r.
$$

固定した $m$ で有理近似を十分細かくすれば右辺は任意に小さくできます。最初に $m$ を大きくして $W_p(\mu,\nu_m)$ を小さくし、次に重みを有理化すれば、三角不等式で $W_p(\mu,\eta_m)$ を任意に小さくできます。有限個の $D$ の点と有理重みの組は可算個なので結論です。$\square$
<!-- proof-end -->

[完備性](#thm-otr9-complete)と可分性を合わせると、**$X$ が非空のPolish空間なら $(\mathcal P_p(X),W_p)$ もPolish空間**です。これは後で最適化の極限や測度曲線を考えるときの足場になります。

## 8. 演習：弱収束だけでは足りない理由を自分で検算する

### OTR9-A01 逃げる質量と狭義収束
- Level: A

$p\ge1$ とし、$\mu_n=(1-1/n)\delta_0+(1/n)\delta_{n^{1/p}}$（$n\ge1$）を $\mathbb R$ 上で考える。$\mu_n\Rightarrow\delta_0$ を有界連続関数の定義から示し、$W_p(\mu_n,\delta_0)$ を求めよ。

<!-- solution-start -->
**詳細解答**

任意の有界連続 $h$ について、積分差は

$$
\int h\,d\mu_n-h(0)=\frac{h(n^{1/p})-h(0)}n
$$

なので、その絶対値は $2\|h\|_\infty/n\to0$ です。よって狭義収束します。一方、第二周辺が $\delta_0$ の結合は $\mu_n(dx)\delta_0(dy)$ に限られます。その費用は

$$
\int|x-y|^p\,d\pi=\frac1n(n^{1/p})^p=1.
$$

従って $W_p=1$ です。両測度は各 $n$ で有限原子だから $\mathcal P_p$ に属しますが、モーメントは $1\not\to0$ であり、[収束判定定理](#thm-otr9-convergence)とも一致します。
<!-- solution-end -->

### OTR9-A02 固定距離へ運ぶ微小質量
- Level: A

$p\ge1$、$a\in\mathbb R$ を固定し、$\nu_n=(1-1/n)\delta_0+(1/n)\delta_a$ とする。$W_p(\nu_n,\delta_0)$ の公式を導き、$a=0$ の場合も確認せよ。

<!-- solution-start -->
**詳細解答**

$\nu_n$ の質量は1で有限原子です。第二周辺が $\delta_0$ である結合は $y=0$ に限られ、$p$次費用は $a$ にある質量だけが寄与して

$$
W_p(\nu_n,\delta_0)^p=(1-1/n)0^p+(1/n)|a|^p=|a|^p/n.
$$

よって $W_p=|a|n^{-1/p}\to0$ です。$a=0$ ならそもそも $\nu_n=\delta_0$ なので $W_p=0$ で、同じ式が成立します。
<!-- solution-end -->

### OTR9-A03 モーメントと一点測度までの距離
- Level: A

$(X,d)$ を非空のPolish空間、$p\ge1$、$o\in X$ とし、$\mu,\nu\in\mathcal P_p(X)$ とする。次を示せ。

$$
\left|\left(\int d(x,o)^p\,d\mu\right)^{1/p}
-\left(\int d(x,o)^p\,d\nu\right)^{1/p}\right|
\le W_p(\mu,\nu).
$$

<!-- solution-start -->
**詳細解答**

$\delta_o$ を第二周辺とする結合は、第一周辺の点 $x$ をすべて $o$ に送る唯一のものです。従って $W_p(\mu,\delta_o)^p=\int d(x,o)^p\,d\mu$、$\nu$ についても同じです。[距離公理](../OTR8/index.md#thm-otr8-metric)から

$$
W_p(\mu,\delta_o)\le W_p(\mu,\nu)+W_p(\nu,\delta_o)
$$

と、$\mu,\nu$ を交換した不等式の両方が得られます。移項して二つを合わせた逆三角不等式に一点測度の公式を代入すれば、要求された式になります。
<!-- solution-end -->

### OTR9-A04 二点空間の狭義収束
- Level: A

$X=\{0,1\}$、$d(0,1)=1$、$\mu_t=t\delta_0+(1-t)\delta_1$（$0\le t\le1$）、$p\ge1$ とする。$t_n\to t$ と $\mu_{t_n}\Rightarrow\mu_t$ が同値であることを示し、$W_p$ 収束との関係を説明せよ。

<!-- solution-start -->
**詳細解答**

$t_n\to t$ なら任意の関数 $h:X\to\mathbb R$（有限空間では有界連続）について

$$
\int h\,d\mu_{t_n}-\int h\,d\mu_t
=(t_n-t)(h(0)-h(1))\to0.
$$

逆に $h(0)=1,h(1)=0$ という有界連続関数を選べば積分は $t_n$ と $t$ なので、狭義収束から $t_n\to t$ が従います。[p-Wasserstein距離](../OTR8/index.md#def-otr8-wasserstein)の定義式から、食い違う質量 $|t_n-t|$ だけを距離1運ぶのが最適で、

$$
W_p(\mu_{t_n},\mu_t)^p=|t_n-t|.
$$

従って $W_p$ 収束とも同値です。有限距離空間では距離が有界であり、[収束判定定理](#thm-otr9-convergence)のモーメント条件は有界連続関数の収束に含まれます。
<!-- solution-end -->

### OTR9-A05 $W_p$ と $W_q$ は異なる
- Level: A

$1\le p<q$、$n\ge1$ とし、$\rho_n=(1-n^{-q})\delta_0+n^{-q}\delta_n$ を実数直線上で考える。$W_p(\rho_n,\delta_0)$ と $W_q(\rho_n,\delta_0)$ を求め、どちらが収束するか判定せよ。

<!-- solution-start -->
**詳細解答**

$n^{-q}\in(0,1]$ なので確率測度で、有限原子ゆえ $\rho_n\in\mathcal P_q\subset\mathcal P_p$ です。$\delta_0$ への結合は一意なので、任意の指数 $s\ge1$ に対して

$$
W_s(\rho_n,\delta_0)^s=n^{-q}\,n^s=n^{s-q}.
$$

$s=p$ なら $W_p=n^{1-q/p}\to0$（$q/p>1$）、$s=q$ なら $W_q=1$ です。[次数比較](../OTR8/index.md#prop-otr8-order)と矛盾せず、強い $W_q$ 収束から弱い $W_p$ 収束への逆向きは一般に成り立たないと分かります。
<!-- solution-end -->

### OTR9-B01 尾部を切り詰めて評価する
- Level: B

$(X,d)$ をPolish空間、$\mu_n\Rightarrow\mu$ とし、連続関数 $f:X\to[0,\infty)$ について $\int f\,d\mu_n\to\int f\,d\mu<\infty$ とする。$f_M=\min(f,M)$ を用いて $\sup_n\int(f-M)_+\,d\mu_n\to0$ を示せ。さらに $f>2M$ での評価から[尾部補題](#lem-otr9-tail)を再導出せよ。

<!-- solution-start -->
**詳細解答**

$f_M$ は有界連続なので $\int f_M\,d\mu_n\to\int f_M\,d\mu$ です。$f-f_M=(f-M)_+$ を積分して

$$
\lim_n\int(f-M)_+\,d\mu_n=\int(f-M)_+\,d\mu.
$$

右辺は $M\to\infty$ で0です。$\varepsilon>0$ を固定し、右辺が $\varepsilon/2$ 未満の $M_0$ を選ぶと、ある $N$ 以降では超過分が $\varepsilon$ 未満です。$n<N$ は有限個なので、各 $\int f\,d\mu_n<\infty$ から $M$ を増やし、残りも $\varepsilon$ 未満にできます。$M$ に関する単調性から上限も0へ向かいます。

$f>2M$ なら $f-M>f/2$ だから $f\boldsymbol{1}_{\{f>2M\}}\le2(f-M)_+$ です。積分と上限を取り、左辺も一様に0へ向かいます。
<!-- solution-end -->

### OTR9-B02 余剰質量を手で結合する
- Level: B

$X=\{0,1,2\}$ に通常の距離を入れ、$n\ge2$ に対し $\mu_n=(1/2+1/n)\delta_0+(1/2-1/n)\delta_2$、$\mu=(\delta_0+\delta_2)/2$ とする。対応する点を優先して結ぶ結合を明示し、$W_p(\mu_n,\mu)$ を計算せよ（$p\ge1$）。

<!-- solution-start -->
**詳細解答**

共通する質量は点0で $1/2$、点2で $1/2-1/n$ です。第一周辺には点0に $1/n$ の余剰、第二周辺には点2に $1/n$ の余剰があります。従って

$$
\gamma_n=\frac12\delta_{(0,0)}+
\left(\frac12-\frac1n\right)\delta_{(2,2)}
+\frac1n\delta_{(0,2)}
$$

は両周辺を満たし、総質量1です。費用は $2^p/n$ です。これが最小である理由は、第二周辺の点2の質量が第一周辺より $1/n$ 多いため、少なくとも $1/n$ を点0から点2へ移す必要があり、その距離が2だからです。従って

$$
W_p(\mu_n,\mu)=2n^{-1/p}\to0.
$$

この例では大きく動く組の確率 $1/n$ が0へ向かい、費用も0へ向かいます。
<!-- solution-end -->

### OTR9-B03 完備性の証明を数字で追う
- Level: B

$(X,d)$ を非空のPolish空間、$p\ge1$ とする。確率空間上の $X$ 値変数 $Z_k$ のうち $Z_1$ の分布が $\mathcal P_p(X)$ に属し、$\bigl(\int d(Z_k,Z_{k+1})^p\,dP\bigr)^{1/p}\le3^{-k}$ を満たすと仮定する。$Z_k$ の極限 $Z$ の存在と、$\operatorname{Law}(Z_k)$ から $\operatorname{Law}(Z)$ への $W_p$ の上界を導け。

<!-- solution-start -->
**詳細解答**

確率測度のもとで[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)（$p=1$ は直接評価）から $\int d(Z_k,Z_{k+1})\,dP\le3^{-k}$ です。非負級数の積分は和と交換できて

$$
\int\sum_{k=1}^\infty d(Z_k,Z_{k+1})\,dP
\le\sum_{k=1}^\infty3^{-k}=\frac12<\infty.
$$

よって距離の和はほとんど確実に有限で、$Z_k$ はCauchy、$X$ の完備性から $Z_k\to Z$ です。有限和への[積分のMinkowski不等式](../OTR8/index.md#lem-otr8-minkowski)とFatouの補題で

$$
\left(\int d(Z_k,Z)^p\,dP\right)^{1/p}
\le\sum_{j=k}^\infty3^{-j}=\frac{3^{1-k}}2.
$$

仮定より最初の分布は $\mathcal P_p$ に属します。$d(o,Z)\le d(o,Z_1)+d(Z_1,Z)$ と上の $L^p$ 評価から極限の分布も $\mathcal P_p$ に属します。$(Z_k,Z)$ は両分布の結合なので

$$
W_p(\operatorname{Law}(Z_k),\operatorname{Law}(Z))
\le\frac{3^{1-k}}2\to0.
$$
<!-- solution-end -->

### OTR9-B04 有理重み近似の費用
- Level: B

$(X,d)$ を非空のPolish空間とし、異なる点 $z_1,\ldots,z_m$ を固定する。$a_i,b_i\ge0$、$\sum_i a_i=\sum_i b_i=1$ とし、$\alpha=\sum_i a_i\delta_{z_i}$、$\beta=\sum_i b_i\delta_{z_i}$ とする。$L=\max_{i,j}d(z_i,z_j)$ として $W_p(\alpha,\beta)^p\le(L^p/2)\sum_i|a_i-b_i|$ を構成から証明せよ。

<!-- solution-start -->
**詳細解答**

点 $z_i$ で両方にある質量 $c_i=\min(a_i,b_i)$ を対角 $(z_i,z_i)$ に置きます。残る第一・第二周辺はそれぞれ $\alpha'=\sum_i(a_i-c_i)\delta_{z_i}$、$\beta'=\sum_i(b_i-c_i)\delta_{z_i}$ で、共通の総質量は

$$
r=1-\sum_ic_i=\frac12\sum_i|a_i-b_i|.
$$

$r>0$ なら余剰部分を $\alpha'\otimes\beta'/r$ で結び、$r=0$ なら対角結合だけとします。各周辺が正しい結合です。対角部分の費用は0、余剰部分の総質量は $r$、どの点間距離も $L$ 以下なので費用は高々 $L^pr$ です。最小費用はその値以下だから主張が得られます。
<!-- solution-end -->

### OTR9-C01 収束判定の両方向を組み立てる
- Level: C

$(X,d)$ を非空のPolish空間、$p\ge1$、$\mu_n,\mu\in\mathcal P_p(X)$ とする。次をすべて、仮定を確認しながら導け。

1. $W_p(\mu_n,\mu)\to0$ なら $\mu_n\Rightarrow\mu$ かつ $p$次モーメントが収束する。
2. $\mu_n\Rightarrow\mu$ なら、任意の $r>0$ に対して $d(x,y)\ge r$ の確率が0へ向かうような結合が作れることを、境界に質量のない有限分割から説明する。
3. さらに $p$次モーメントが収束するとき、その結合で $\int d(x,y)^p\,d\gamma_n\to0$ を示せ。
4. 上の論証でモーメント収束を落とすと失敗する具体例を一つ作り、どの段階が壊れるか指摘せよ。

<!-- solution-start -->
**詳細解答**

**（1）必要性。** 最適結合 $\pi_n$ を選ぶと、$r>0$ について $\pi_n\{d\ge r\}\le W_p^p/r^p\to0$ です。$\mu$ の質量をほぼ含むコンパクト $K$ 上では有界連続関数 $h$ の連続性が近傍で一様になるので、$\int|h(x)-h(y)|\,d\pi_n\to0$ と評価でき、狭義収束を得ます。また $\delta_o$ への距離は $M_p(\cdot;o)^{1/p}$ だから、逆三角不等式でその差を $W_p(\mu_n,\mu)$ で抑えてモーメント収束を得ます。

**（2）近接結合。** $\mu(K)>1-\delta$ のコンパクト $K$ を直径 $r$ 未満で境界の $\mu$ 質量が0の有限個のBorelセル $B_1,\ldots,B_m$ で覆い、残余を $B_0$ とします。$a_{n,i}=\mu_n(B_i)\to b_i=\mu(B_i)$ は狭義収束の開閉集合評価から従います。$m_{n,i}=\min(a_{n,i},b_i)$ だけは両測度を同じセル内で積結合し、残余 $R_n=\frac12\sum_i|a_{n,i}-b_i|\to0$ を別の積結合にします。従って $\gamma_n\{d\ge r\}\le\mu(B_0)+R_n<\delta+R_n$ です。$\delta\downarrow0$ と半径を $1/j$ にする対角選択で、すべての固定 $r$ に対して確率が0へ向かう一列が取れます。

**（3）$p$次費用。** $f(x)=d(x,o)^p$ は非負連続です。全積分と切詰め関数の積分の両方が収束するため、$\int(f-M)_+\,d\mu_n\to\int(f-M)_+\,d\mu$。さらに有限個の初期項を処理すれば尾部は $n$ に一様に小さくなります。三角不等式で $d(x,y)^p\le2^{p-1}(f(x)+f(y))$ なので、$d^p$ の尾部も $\gamma_n$ に関して一様に小さくなります。任意の $r,L>0$ に対し

$$
\int d^p\,d\gamma_n\le r^p+L\gamma_n\{d>r\}
+\int d^p\boldsymbol{1}_{\{d^p>L\}}\,d\gamma_n.
$$

まず $L$ を大きくして最後を抑え、$n\to\infty$ で中央を消し、$r\downarrow0$ とすれば積分が0へ向かいます。従って $W_p^p\le\int d^p\,d\gamma_n\to0$ です。

**（4）失敗機構。** $\mu_n=(1-1/n)\delta_0+(1/n)\delta_{n^{1/p}}$、$\mu=\delta_0$ は狭義収束しますが、$\int|x|^p\,d\mu_n=1\not\to0$ です。遠方の原子で $|x|^p=n$、確率が $1/n$ なので、どんな結合でも費用は1です。（3）の尾部一様性が成り立たず、確率の小ささだけから費用を消せないのが破綻箇所です。
<!-- solution-end -->

## 9. この章で得たもの

- [Wasserstein収束の判定定理](#thm-otr9-convergence)：$W_p$ 収束は狭義収束に加え、$p$次モーメントの収束を要求します。
- [完備性](#thm-otr9-complete)と[可分性](#thm-otr9-separable)：元の空間がPolishなら $\mathcal P_p(X)$ も $W_p$ についてPolishです。
- 少量の遠距離輸送は狭義収束を保っても $W_p$ 収束を妨げます。$q>p$ では $W_p$ 収束が $W_q$ 収束を意味するとは限りません。

次の OTR10 では、$p=1$ の距離をLipschitz関数の積分差だけで測れるかを考えます。
