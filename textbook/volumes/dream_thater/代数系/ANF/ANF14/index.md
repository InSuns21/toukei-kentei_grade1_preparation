# ANF14 Hilbert の定理90・群コホモロジー

[ANF12 の局所ノルムの計算](../ANF12/index.md#thm-anf12-unramified-norm)から、非分岐二次拡大では単元がすべてノルムになっても、基礎体の一様化元はノルムとは限らないことが分かりました。[ANF13 の惰性群と剰余体の完全列](../ANF13/index.md#thm-anf13-inertia-exact)は、一方で拡大の自己同型がどのように動くかを表します。

では、自己同型に応じて変わる数 $c_\sigma$ が矛盾なく結び付いているとき、**ただ一つの元 $b$ を各自己同型で動かした比**として一斉に書けるでしょうか。これを調べる道具が群コホモロジーの第1群であり、有限 Galois 拡大について答えるのが Hilbert の定理90です。次講の相互法則では、**ノルムの像**と**自己同型による比の像**を混同しないことが重要になります。

まず体に限らない群作用の言葉を作り、その後に数体・局所体の例で検算します。以下の一般論では $G$ を有限群、$M$ を可換群とし、$G$ の各元 $\sigma$ が $M$ の群自己同型として作用するとします。作用とは $1(m)=m$、$(\sigma\tau)(m)=\sigma(\tau(m))$ が成り立つことで、積は $\sigma\tau$ の順に右から作用させます。$M$ の演算は原則として乗法表記にします。体 $L$ の場合は $M=L^\times$、$\sigma(m)$ は体の自己同型による像です。

## 1. 二つの自己同型に対する整合条件

例えば $b\in L^\times$ を一つ選び、各 $\sigma\in G$ に比 $\sigma(b)/b$ を対応させます。$\sigma,\tau$ を続けて作用させると

$$
\frac{(\sigma\tau)(b)}{b}
=\frac{\sigma(b)}{b}\,
 \sigma\left(\frac{\tau(b)}{b}\right).
$$

左辺の比と右辺の積が一致することが、整合条件の原型です。これを $b$ が先に与えられていない場合へ拡張します。

<a id="def-anf14-cocycle"></a>

<!-- formal-statement-start -->
> **定義（第1余サイクル）**  
> 有限群 $G$ が可換群 $M$ に自己同型として作用するとする。写像 $c:G\to M$ が、すべての $\sigma,\tau\in G$ について

$$
c_{\sigma\tau}=c_\sigma\,\sigma(c_\tau)
$$

> を満たすとき、$c$ を **第1余サイクル（1-cocycle）** という。全体を $Z^1(G,M)$ と書く。$M$ の積を点ごとに取ることで $Z^1(G,M)$ は可換群になる。
<!-- formal-statement-end -->

まず $\tau=1$ を代入すると、$c_\sigma=c_\sigma\sigma(c_1)$ であり、群の元は消去できるので $c_1=1_M$ です。また $\tau=\sigma^{-1}$ とすると

$$
1_M=c_1=c_\sigma\,\sigma(c_{\sigma^{-1}}).
$$

これにより逆元側の値も勝手には選べません。逆に、作用と値が決まれば他の値は整合条件で拘束されます。

余サイクル $c,d$ の点ごとの積を $(cd)_\sigma=c_\sigma d_\sigma$ と定めると、$M$ が可換で作用が群自己同型であることから

$$
\begin{aligned}
(cd)_{\sigma\tau}
&=c_\sigma\sigma(c_\tau)d_\sigma\sigma(d_\tau)\\
&=(c_\sigma d_\sigma)\sigma(c_\tau d_\tau)
=(cd)_\sigma\,\sigma((cd)_\tau).
\end{aligned}
$$

単位元は定数写像 $c_\sigma=1_M$、逆元は点ごとの $c_\sigma^{-1}$ で、いずれも同じ条件を満たします。これが $Z^1(G,M)$ を群として扱える理由です。

<!-- definition-example-start: def-anf14-cocycle -->
**定義の確認**：$L=\mathbb Q_3(i)$、$i^2=-1$、$\sigma(i)=-i$ とします。$G=\{1,\sigma\}$ に対して $c_1=1$、$c_\sigma=i$ と置くと、非自明な組 $(\sigma,\sigma)$ における条件は

$$
c_{\sigma^2}=1,\qquad
c_\sigma\,\sigma(c_\sigma)=i(-i)=1.
$$

残る組 $(1,1),(1,\sigma),(\sigma,1)$ では $c_1=1$ なので等式が成立します。これで全組を検証できました。$\sigma(i)=-i$ の作用を無視して単に $i^2$ を掛けるのは誤りです。
<!-- definition-example-end -->

次に、最初の比から得られる特別な余サイクルを取り出します。元 $b\in M$ を写像 $\sigma\mapsto b^{-1}\sigma(b)$ に送る操作を $\delta$ と書き、そのような写像だけを集めた部分群で余サイクル全体を割った商を $H^1$ とします。

<a id="def-anf14-coboundary"></a>

<!-- formal-statement-start -->
> **定義（第1余境界と第1コホモロジー群）**  
> 有限群 $G$ が可換群 $M$ に自己同型として作用するとする。$b\in M$ の定める写像を

$$
(\delta b)_\sigma=b^{-1}\sigma(b)
$$

> と書き、これらを **第1余境界（1-coboundary）** という。余境界全体を $B^1(G,M)$ とし、第1コホモロジー群を

$$
H^1(G,M)=Z^1(G,M)/B^1(G,M)
$$

> と定義する。ここでは $M$ が可換なので、点ごとの積で作った商は可換群である。
<!-- formal-statement-end -->

余境界が本当に余サイクルか、商を取ってよいかを先に確かめます。任意の $b$ と $\sigma,\tau$ について

$$
(\delta b)_{\sigma\tau}
=b^{-1}\sigma\tau(b)
=\bigl(b^{-1}\sigma(b)\bigr)
 \sigma\bigl(b^{-1}\tau(b)\bigr).
$$

したがって $\delta b\in Z^1(G,M)$ です。さらに $M$ が可換だから $\delta(bd)_\sigma=(\delta b)_\sigma(\delta d)_\sigma$、$\delta1=1$、$\delta(b^{-1})=(\delta b)^{-1}$。ゆえに $B^1(G,M)$ は $Z^1(G,M)$ の部分群です。

<!-- definition-example-start: def-anf14-coboundary -->
**定義の確認**：先の $L=\mathbb Q_3(i)$ で $b=1-i$ を選ぶと

$$
\frac{\sigma(b)}b
=\frac{1+i}{1-i}
=\frac{(1+i)^2}{(1-i)(1+i)}
=\frac{2i}{2}=i.
$$

したがって $c_1=1,c_\sigma=i$ は余境界です。この余サイクルが表す $H^1(G,L^\times)$ の元は単位元になります。$c$ 自体が値 $1$ の写像であることと、商において単位元になることは別です。
<!-- definition-example-end -->

## 2. Hilbert の定理90：比の形へ戻せる

一般の作用では余サイクルが余境界とは限りません。しかし有限 Galois 拡大の乗法群には特別な性質があります。

<a id="thm-anf14-hilbert90"></a>

<!-- formal-statement-start -->
> **定理（乗法的 Hilbert の定理90）**  
> $L/K$ を任意の有限 Galois 体拡大、$G=\operatorname{Gal}(L/K)$ とし、$G$ は $L^\times$ に自然に作用するとする。すべての第1余サイクル $c:G\to L^\times$ には、$b\in L^\times$ が存在して

$$
c_\sigma=\frac{\sigma(b)}{b}
\qquad(\sigma\in G)
$$

> が成り立つ。従って

$$
H^1(G,L^\times)=0.
$$
<!-- formal-statement-end -->

ここでの $0$ は商群が自明であるという意味です。証明に必要なのは、自己同型を足し合わせた写像が恒等的には消えないという事実です。

### 証明の見取り図

$c$ から $L$ 上の加法写像 $T(x)=\sum_{\tau\in G}c_\tau\tau(x)$ を作ります。[Artin の独立性](../../FLD/FLD4/index.md#lem-fld4-artin-independence)により $T$ は零写像でないので、$T(a)\ne0$ となる $a$ を選べます。余サイクル条件から各 $\sigma$ によって $T(a)$ が $c_\sigma^{-1}$ 倍になることを示し、逆数を $b$ にします。

<!-- proof-start -->
### 証明

**(1) 消えない和を選ぶ。** 有限 Galois 拡大の相異なる自己同型 $\tau:L\to L$ は、[Artin の独立性](../../FLD/FLD4/index.md#lem-fld4-artin-independence)により $L$ 値関数として $L$ 上線形独立です。$c_\tau\ne0$ はすべての $\tau$ について成立するので、写像

$$
T:L\longrightarrow L,\qquad
T(x)=\sum_{\tau\in G}c_\tau\tau(x)
$$

は零写像ではありません。よって $a\in L$ を $B=T(a)\ne0$ となるよう選べます。ここで任意の $a$ で非零と主張する必要はありません。

**(2) 余サイクル条件を代入する。** 任意の $\sigma,\tau$ に対して

$$
c_{\sigma\tau}=c_\sigma\,\sigma(c_\tau)
\quad\Longrightarrow\quad
\sigma(c_\tau)=c_\sigma^{-1}c_{\sigma\tau}.
$$

これを $\sigma(B)$ の各項に入れると

$$
\begin{aligned}
\sigma(B)
&=\sum_{\tau\in G}\sigma(c_\tau)\,(\sigma\tau)(a)\\
&=c_\sigma^{-1}\sum_{\tau\in G}c_{\sigma\tau}(\sigma\tau)(a)\\
&=c_\sigma^{-1}\sum_{\rho\in G}c_\rho\rho(a)
=c_\sigma^{-1}B.
\end{aligned}
$$

三行目では $\tau\mapsto\rho=\sigma\tau$ が有限集合 $G$ の置換であることだけを使いました。$G$ が可換である必要はありません。

**(3) 一つの元を構成する。** $B\ne0$ なので $b=B^{-1}\in L^\times$ と置けます。そのとき

$$
\frac{\sigma(b)}b
=\frac{\sigma(B)^{-1}}{B^{-1}}
=\frac{B}{\sigma(B)}
=c_\sigma.
$$

すべての $\sigma$ に対して同じ $b$ が機能し、余サイクルは余境界になります。従って $Z^1(G,L^\times)=B^1(G,L^\times)$、商群は自明です。
<!-- proof-end -->

証明は局所体に固有の付値を一度も使っていません。したがって $\mathbb Q_p$ の有限 Galois 拡大だけでなく、数体の有限 Galois 拡大にもそのまま適用できます。

### 具体例：分岐二次拡大

$L=\mathbb Q_5(\pi)$、$\pi^2=5$ とし、$\sigma(\pi)=-\pi$ とします。$b=2-\pi$ は非零で、

$$
u=\frac{\sigma(b)}b=\frac{2+\pi}{2-\pi}.
$$

この $u$ には

$$
u\,\sigma(u)
=\frac{2+\pi}{2-\pi}\frac{2-\pi}{2+\pi}=1
$$

が成り立ちます。$c_1=1,c_\sigma=u$ が余サイクルとなり、具体的に同じ $b$ が余境界を与えます。ここでは分岐の有無は定理90の成立を左右しません。

## 3. 巡回拡大ではノルム1が整合条件になる

$L/K$ が巡回 Galois 拡大で、$G=\langle\sigma\rangle$、$|G|=n$ とします。$u=c_\sigma$ を与えると、余サイクル条件の反復から

$$
c_{\sigma^j}=u\,\sigma(u)\cdots\sigma^{j-1}(u)
\qquad(1\le j\le n)
$$

です。$\sigma^n=1$、$c_1=1$ なので、右辺で $j=n$ と置いた積は $1$ でなければなりません。有限 Galois 拡大では体ノルムを $N_{L/K}(u)=\prod_{\tau\in G}\tau(u)$ と書きます。従って上の積は $N_{L/K}(u)$ です。

<a id="thm-anf14-cyclic90"></a>

<!-- formal-statement-start -->
> **系（巡回型 Hilbert の定理90）**  
> $L/K$ を次数 $n$ の巡回 Galois 拡大、$G=\langle\sigma\rangle$ とする。$u\in L^\times$ について次は同値である。
>
> 1. $N_{L/K}(u)=1$。
> 2. ある $b\in L^\times$ が存在して $u=\sigma(b)/b$。

<!-- formal-statement-end -->

### 証明の見取り図

比 $\sigma(b)/b$ の共役をすべて掛けると、分子と分母が打ち消し合います。逆向きには $u$ から $\sigma$ のすべての冪に対する余サイクルを作り、定理90を適用します。

<!-- proof-start -->
### 証明

**(2) から (1)。** 体ノルムがすべての自己同型による共役の積であることから

$$
\begin{aligned}
N_{L/K}\left(\frac{\sigma(b)}b\right)
&=\prod_{j=0}^{n-1}\frac{\sigma^{j+1}(b)}{\sigma^j(b)}\\
&=\frac{\sigma^n(b)}b=1.
\end{aligned}
$$

**(1) から (2)。** $N(u)=1$ と仮定し、$c_1=1$ および $1\le j<n$ に対して

$$
c_{\sigma^j}=\prod_{h=0}^{j-1}\sigma^h(u)
$$

と置きます。指数が一巡する場合も含めて確かめます。任意の整数 $m\ge0$ に対して

$$
P_m=\prod_{h=0}^{m-1}\sigma^h(u),\qquad P_0=1
$$

と書けば、積を前半の $j$ 因子と後半の $k$ 因子に分けることで、$0\le j,k<n$ に対し

$$
P_{j+k}
=\left(\prod_{h=0}^{j-1}\sigma^h(u)\right)
 \sigma^j\left(\prod_{h=0}^{k-1}\sigma^h(u)\right)
=P_j\,\sigma^j(P_k)
$$

を得ます。さらに $P_n=N_{L/K}(u)=1$、$\sigma^n=1$ より、$0\le r<n$ について

$$
P_{n+r}=P_n\,\sigma^n(P_r)=P_r.
$$

従って $j+k<n$ なら $c_{\sigma^{j+k}}=P_{j+k}$、$j+k\ge n$ なら $c_{\sigma^{j+k}}=P_{j+k-n}=P_{j+k}$ です。いずれの場合も $c_{\sigma^{j+k}}=c_{\sigma^j}\,\sigma^j(c_{\sigma^k})$ となり、$c$ は第1余サイクルです。[乗法的 Hilbert の定理90](#thm-anf14-hilbert90)から $c_\tau=\tau(b)/b$ と表せ、特に $\tau=\sigma$ として $u=\sigma(b)/b$ を得ます。
<!-- proof-end -->

この系は一般の $G$ の作用についても「$N$ の核を比の像と比較する」という考え方の手本になります。ただし、巡回群の生成元を一つ選んだ式なので、非巡回拡大にそのまま転記しません。

<a id="prop-anf14-cyclic-exact"></a>

<!-- formal-statement-start -->
> **命題（巡回拡大の比とノルムの完全性）**  
> $L/K$ を巡回 Galois 拡大、$G=\langle\sigma\rangle$ とする。$D:L^\times\to L^\times$ を $D(b)=\sigma(b)/b$ とする。このとき、次の列は表示した各中間位置で完全である。

$$
1\longrightarrow K^\times
\longrightarrow L^\times
\xrightarrow{\,D\,}L^\times
\xrightarrow{\,N_{L/K}\,}K^\times.
$$

> 右端のノルムが全射であるとは主張しない。特に

$$
\ker D=K^\times,\qquad
\operatorname{im}D=\ker N_{L/K}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$D(b)=1$ は $\sigma(b)=b$ と同値で、生成元 $\sigma$ に固定される元は $G$ 全体に固定されます。二つ目の等式が巡回型定理90の内容です。

<!-- proof-start -->
### 証明

まず非零元 $b\in L^\times$ に対し、比の定義を代入すると

$$
D(b)=1\quad\Longleftrightarrow\quad \sigma(b)=b.
$$

$\sigma$ は $G$ を生成するので、この等式が成り立てばすべての整数 $j$ について $\sigma^j(b)=b$ です。[有限 Galois 理論の基本定理](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)によれば、$G$ 全体の固定体は $L^G=K$。従って $b\in K^\times$ です。逆に基礎体の元はすべて $\sigma$ に固定されるため

$$
\ker D=K^\times.
$$

次に[巡回型定理90](#thm-anf14-cyclic90)を $L/K$ と生成元 $\sigma$ に適用します。ノルムが $1$ なら比で表せ、比ならノルムが $1$ なので

$$
\operatorname{im}D
=\{u\in L^\times:N_{L/K}(u)=1\}
=\ker N_{L/K}.
$$
<!-- proof-end -->

例えば[非分岐二次拡大のノルム群](../ANF12/index.md#thm-anf12-unramified-norm)は

$$
N_{\mathbb Q_3(i)/\mathbb Q_3}
\bigl(\mathbb Q_3(i)^\times\bigr)
=3^{2\mathbb Z}\mathbb Z_3^\times.
$$

従って $3$ はノルムではありません。それでも $H^1(G,\mathbb Q_3(i)^\times)=0$ です。前者は $K^\times/N(L^\times)$ の情報、後者は $\ker N/\operatorname{im}D$ の情報で、**異なる商**を測っています。

## 4. 加法版：跡が0なら差で表せる

乗法の比 $b^{-1}\sigma(b)$ に対応して、加法群 $(L,+)$ では差 $\sigma(b)-b$ が余境界になります。ここでは同じ条件を加法で書き、乗法版と混ぜないようにします。

<a id="def-anf14-additive-cocycle"></a>

<!-- formal-statement-start -->
> **定義（加法的第1余サイクルと余境界）**  
> 有限群 $G$ が加法可換群 $A$ に作用するとする。写像 $c:G\to A$ が

$$
c_{\sigma\tau}=c_\sigma+\sigma(c_\tau)
$$

> を満たすとき加法的第1余サイクルという。ある $b\in A$ について

$$
c_\sigma=\sigma(b)-b
$$

> と表せるものを加法的第1余境界という。これらの商を $H^1(G,A)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf14-additive-cocycle -->
**定義の確認**：$L=\mathbb Q_5(\pi)$、$\pi^2=5$ で $c_1=0$、$c_\sigma=-2\pi$ とします。$\sigma(c_\sigma)=2\pi$ なので $c_\sigma+\sigma(c_\sigma)=0=c_{\sigma^2}$。ほかの三組は $c_1=0$ により条件を満たします。さらに $b=\pi$ について $\sigma(b)-b=-2\pi$ なので余境界です。
<!-- definition-example-end -->

<a id="thm-anf14-additive90"></a>

<!-- formal-statement-start -->
> **定理（加法的 Hilbert の定理90）**  
> $L/K$ を有限 Galois 拡大、$G=\operatorname{Gal}(L/K)$ とすると、加法群 $L$ の任意の第1余サイクル $c$ はある $b\in L$ により $c_\sigma=\sigma(b)-b$ と表される。従って

$$
H^1(G,(L,+))=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

乗法版で使った自己同型の独立性から、跡が非零になる元を選べます。跡を $1$ に規格化した元 $t$ を用いて、$S=\sum_\tau c_\tau\tau(t)$ を作ると $\sigma(S)=S-c_\sigma$ になります。

<!-- proof-start -->
### 証明

**(1) 跡が $1$ の元。** [Artin の独立性](../../FLD/FLD4/index.md#lem-fld4-artin-independence)より、相異なる自己同型の和 $\operatorname{Tr}_{L/K}(x)=\sum_{\tau\in G}\tau(x)$ は零写像ではありません（各係数が $1\ne0$）。ある $a\in L$ について $d=\operatorname{Tr}(a)\ne0$ です。任意の $\sigma\in G$ に対して $\sigma(d)=d$ なので、[有限 Galois 理論の基本定理](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)の固定体の結論 $L^G=K$ から $d\in K^\times$。よって $t=a/d$ と置けば

$$
\operatorname{Tr}(t)
=\operatorname{Tr}(a)/d=1
$$

です。ここでは体上の跡の全射性を使用し、整数環の跡が全射であるとは主張していません。

**(2) 元を作る。** 加法的余サイクル条件より $\sigma(c_\tau)=c_{\sigma\tau}-c_\sigma$ です。$S=\sum_{\tau\in G}c_\tau\tau(t)$ と置くと

$$
\begin{aligned}
\sigma(S)
&=\sum_{\tau\in G}\sigma(c_\tau)(\sigma\tau)(t)\\
&=\sum_{\tau\in G}(c_{\sigma\tau}-c_\sigma)(\sigma\tau)(t)\\
&=\sum_{\rho\in G}c_\rho\rho(t)
 -c_\sigma\sum_{\rho\in G}\rho(t)\\
&=S-c_\sigma\operatorname{Tr}(t)=S-c_\sigma.
\end{aligned}
$$

従って $b=-S$ と置けば $\sigma(b)-b=-\sigma(S)+S=c_\sigma$ となり、すべての余サイクルが余境界です。
<!-- proof-end -->

<a id="cor-anf14-additive-trace"></a>

<!-- formal-statement-start -->
> **系（巡回拡大の跡0と差）**  
> $L/K$ を巡回 Galois 拡大、$G=\langle\sigma\rangle$、$|G|=n$ とする。任意の $u\in L$ について次は同値である。
>
> 1. $\operatorname{Tr}_{L/K}(u)=0$。
> 2. ある $b\in L$ が存在して $u=\sigma(b)-b$。

<!-- formal-statement-end -->

### 証明の見取り図

差を共役について足し合わせれば望遠鏡和になります。逆に跡0から生成元に対応する加法的余サイクルを作ります。

<!-- proof-start -->
### 証明

(2) なら

$$
\operatorname{Tr}(\sigma(b)-b)
=\sum_{j=0}^{n-1}\bigl(\sigma^{j+1}(b)-\sigma^j(b)\bigr)
=\sigma^n(b)-b=0.
$$

(1) なら $c_1=0$、$c_{\sigma^j}=\sum_{h=0}^{j-1}\sigma^h(u)$（$1\le j<n$）と置きます。乗法版と同様に $m\ge0$ について $Q_m=\sum_{h=0}^{m-1}\sigma^h(u)$、$Q_0=0$ と定めると、$0\le j,k<n$ に対し

$$
Q_{j+k}=Q_j+\sigma^j(Q_k).
$$

一方、$\operatorname{Tr}_{L/K}(u)=Q_n=0$ と $\sigma^n=1$ を使えば

$$
Q_{n+r}=Q_n+\sigma^n(Q_r)=Q_r\qquad(0\le r<n)
$$

です。従って $j+k\ge n$ で指数を $n$ だけ戻しても同じ等式が成り立ち、$c_{\sigma^{j+k}}=c_{\sigma^j}+\sigma^j(c_{\sigma^k})$ が全組で成立します。[加法的定理90](#thm-anf14-additive90)で $c_\tau=\tau(b)-b$ と書き、$\tau=\sigma$ とすれば結論です。
<!-- proof-end -->

## 5. Hilbert 90 が語っていないこと

コホモロジー $H^1(G,L^\times)$ の消滅は、「**整合条件を満たした自己同型の値**が一つの元の比で書ける」ことを意味します。ノルム写像 $N:L^\times\to K^\times$ が全射という意味ではありません。実際、非分岐拡大でもノルムの付値には剰余次数による制限があります。

また $H^1$ がつねに消えるわけでもありません。$G=C_2=\{1,s\}$ が $M=\{1,-1\}$ に**自明に作用する**（$s(m)=m$）とします。余サイクル条件は $c_s^2=1$ ですから、$c_s=1,-1$ の二通りが存在します。しかし余境界は $b^{-1}s(b)=1$ しかありません。従って

$$
H^1(C_2,\{1,-1\})\cong C_2.
$$

この $M$ は Galois 拡大の乗法群全体ではなく、その二元部分群です。大きな群 $L^\times$ における消滅を、その部分群のコホモロジーにそのまま移すことはできません。

次講 ANF15 では、$\ker N/\operatorname{im}D=0$ という Hilbert 90 の結論と、一般に非自明な $K^\times/N(L^\times)$ を区別したうえで、局所 Artin 写像を導入します。

## 6. 演習：整合条件・構成・ノルム障害

### A1. 二次拡大で全組の余サイクル条件を確認

$L=\mathbb Q_3(i)$、$i^2=-1$、$\sigma(i)=-i$ とする。$c_1=1,c_\sigma=i$ が第1余サイクルであることをすべての組で示し、$c=\delta b$ となる $b$ を求めよ。

- Level: A
- ID: ANF14-A1

<!-- solution-start -->
**詳細解答。** $G=\{1,\sigma\}$ で、$(1,1)$ は $c_1=1\cdot1=1$、$(1,\sigma)$ は $c_\sigma=c_1\,1(c_\sigma)=i$、$(\sigma,1)$ は $c_\sigma=c_\sigma\sigma(c_1)=i$ です。残る $(\sigma,\sigma)$ では $c_{\sigma^2}=1$、$c_\sigma\sigma(c_\sigma)=i(-i)=1$。よって[第1余サイクルの定義](#def-anf14-cocycle)を満たします。$b=1-i$ とすれば $b\ne0$ で、

$$
\frac{\sigma(b)}b
=\frac{1+i}{1-i}
=\frac{(1+i)^2}{2}
=i=c_\sigma.
$$

$\tau=1$ のときも $\tau(b)/b=1=c_1$ ですから、$c=\delta b$ です。
<!-- solution-end -->

### A2. 積の整合条件を二段階で使う

$L/K$ を次数 $3$ の巡回 Galois 拡大、$G=\langle\sigma\rangle$ とする。第1余サイクル $c$ の $u=c_\sigma$ を使って $c_{\sigma^2},c_{\sigma^3}$ を表し、$u$ に必要な条件を求めよ。

- Level: A
- ID: ANF14-A2

<!-- solution-start -->
**詳細解答。** まず[余サイクル条件](#def-anf14-cocycle)に $(\sigma,\sigma)$ を代入すると

$$
c_{\sigma^2}=c_\sigma\sigma(c_\sigma)=u\sigma(u).
$$

さらに $(\sigma^2,\sigma)$ で

$$
c_{\sigma^3}
=c_{\sigma^2}\sigma^2(c_\sigma)
=u\sigma(u)\sigma^2(u).
$$

$\sigma^3=1$ なので $c_{\sigma^3}=c_1=1$、従って $u\sigma(u)\sigma^2(u)=1$ です。これは $N_{L/K}(u)=1$ に相当し、単に $u^3=1$ としてはいけません。
<!-- solution-end -->

### A3. 加法的余サイクルの確認

$L=\mathbb Q_5(\pi)$、$\pi^2=5$、$\sigma(\pi)=-\pi$ とする。$c_1=0,c_\sigma=-2\pi$ が加法的余サイクルであることを確かめ、具体的な余境界の元を示せ。

- Level: A
- ID: ANF14-A3

<!-- solution-start -->
**詳細解答。** $c_\sigma+\sigma(c_\sigma)=-2\pi+2\pi=0=c_1$ であり、これが $(\sigma,\sigma)$ の条件です。単位元を含む組では $c_1=0$ なので残り三組の条件も成立します。[加法的余境界の定義](#def-anf14-additive-cocycle)に従い $b=\pi$ を取ると $\sigma(b)-b=-\pi-\pi=-2\pi=c_\sigma$ で、$c_1=0$ も成立します。
<!-- solution-end -->

### A4. 余サイクルが余境界でない例

$G=C_2=\{1,s\}$ が $M=\{1,-1\}$ に自明に作用するとする。$Z^1(G,M)$ と $B^1(G,M)$ の要素数を求めよ。

- Level: A
- ID: ANF14-A4

<!-- solution-start -->
**詳細解答。** $c_1=1$ で、$(s,s)$ における条件は $1=c_s\,s(c_s)=c_s^2$。$M$ の二元はどちらも平方が $1$ なので $c_s=1$ または $-1$ が許されます。その他の組の条件は自動的に成立し、$|Z^1|=2$ です。自明作用では $b^{-1}s(b)=b^{-1}b=1$ がすべての $b\in M$ について成立するため $|B^1|=1$。従って $H^1$ の要素数は $2$ で、定理90が任意の $G$-加群に成り立つわけではありません。
<!-- solution-end -->

### A5. 比のノルムはなぜ1か

$L/K$ を次数 $4$ の巡回 Galois 拡大、生成元を $\sigma$ とする。$b\in L^\times$ に対して $u=\sigma(b)/b$ と置き、$N_{L/K}(u)$ を4個の因子で計算せよ。

- Level: A
- ID: ANF14-A5

<!-- solution-start -->
**詳細解答。** [巡回型 Hilbert 90](#thm-anf14-cyclic90)の必要性を直接検算します。

$$
\begin{aligned}
N(u)
&=u\,\sigma(u)\,\sigma^2(u)\,\sigma^3(u)\\
&=\frac{\sigma(b)}b
  \frac{\sigma^2(b)}{\sigma(b)}
  \frac{\sigma^3(b)}{\sigma^2(b)}
  \frac{\sigma^4(b)}{\sigma^3(b)}\\
&=\frac{\sigma^4(b)}b=1.
\end{aligned}
$$

$\sigma^4=1$ を最後に使いました。各因子は $0$ でないので約分は正当です。
<!-- solution-end -->

### B1. 二次拡大の Hilbert 90 を具体的に構成

$L/K$ を標数 $0$ の二次 Galois 拡大、$\sigma$ を非自明自己同型とする。$u\sigma(u)=1$ かつ $u\ne-1$ のとき、$b=1+u^{-1}$ が $u=\sigma(b)/b$ を満たすことを示せ。さらに $u=-1$ の場合にも、$b$ が存在することを独立に示せ。

- Level: B
- ID: ANF14-B1

<!-- solution-start -->
**詳細解答。** $u\sigma(u)=1$ から $\sigma(u)=u^{-1}$、さらに $\sigma(u^{-1})=u$。$u\ne-1$ なので $b=1+u^{-1}\ne0$ です。従って

$$
\sigma(b)=1+\sigma(u^{-1})=1+u
=u(1+u^{-1})=ub,
$$

よって $\sigma(b)/b=u$。$u=-1$ では $1+u^{-1}=0$ となり、この構成が使えません。ただし非自明な $\sigma$ に対して $\sigma(a)\ne a$ となる $a\in L$ が存在します。$b=a-\sigma(a)\ne0$ と選ぶと、$\sigma^2=1$ から

$$
\sigma(b)=\sigma(a)-a=-b,
\qquad \frac{\sigma(b)}b=-1=u.
$$

したがって例外の場合も構成でき、[巡回型定理90](#thm-anf14-cyclic90)と一致します。
<!-- solution-end -->

### B2. 跡が1の元から加法的余境界を復元

$L=\mathbb Q_5(\pi)$、$\pi^2=5$、$G=\{1,\sigma\}$、$\sigma(\pi)=-\pi$。$c_1=0,c_\sigma=-2\pi$、$t=1/2$ とする。$\operatorname{Tr}(t)=1$ を確かめ、加法的定理90の証明にある $S=\sum_{\tau\in G}c_\tau\tau(t)$ から $b=-S$ を再構成せよ。

- Level: B
- ID: ANF14-B2

<!-- solution-start -->
**詳細解答。** $t=1/2$ は基礎体 $\mathbb Q_5$ の元なので $\sigma(t)=t$ です。従って

$$
\operatorname{Tr}_{L/K}(t)=t+\sigma(t)=1/2+1/2=1.
$$

また $c_1=0$、$c_\sigma=-2\pi$ から

$$
S=c_1\cdot t+c_\sigma\sigma(t)
=0+(-2\pi)(1/2)=-\pi.
$$

$b=-S=\pi$ となり、$\sigma(b)-b=-\pi-\pi=-2\pi=c_\sigma$ です。[加法的定理90の構成](#thm-anf14-additive90)がこの例で実際に働くことを確認しました。
<!-- solution-end -->

### B3. 第1コホモロジーとノルムの剰余を区別

$L=\mathbb Q_3(i)$、$i^2=-1$、$K=\mathbb Q_3$ とする。$H^1(G,L^\times)$ を求め、$K^\times/N(L^\times)$ の要素数を別途計算せよ。両者が異なる理由を述べよ。

- Level: B
- ID: ANF14-B3

<!-- solution-start -->
**詳細解答。** $X^2+1$ は法 $3$ で既約かつ分離的なので $L/K$ は次数 $2$ の非分岐 Galois 拡大です。[乗法的 Hilbert の定理90](#thm-anf14-hilbert90)から $H^1(G,L^\times)=0$ です。

一方、[非分岐局所拡大のノルム群](../ANF12/index.md#thm-anf12-unramified-norm)より

$$
N(L^\times)=3^{2\mathbb Z}\mathbb Z_3^\times.
$$

任意の $x\in K^\times$ は $x=3^m v$（$m\in\mathbb Z$、$v\in\mathbb Z_3^\times$）と一意に書け、ノルム群に入る条件は $m$ が偶数であることです。従って剰余類は偶数指数と奇数指数の二つで、

$$
K^\times/N(L^\times)\cong\mathbb Z/2\mathbb Z.
$$

$H^1$ は余サイクルを余境界で割った商、こちらは基礎体の元をノルムの像で割った商です。全く異なる位置の商なので同時に $0$ と位数 $2$ になっても矛盾しません。
<!-- solution-end -->

### B4. 二次拡大での加法的「跡0」判定

$L/K$ を標数 $0$ の二次 Galois 拡大、$\sigma$ を非自明自己同型とする。$u\in L$ について $\operatorname{Tr}_{L/K}(u)=0$ と仮定し、$b=-u/2$ が $u=\sigma(b)-b$ を満たすことを示せ。標数の仮定がこの構成のどこで必要か述べよ。

- Level: B
- ID: ANF14-B4

<!-- solution-start -->
**詳細解答。** 二次 Galois 拡大では跡は $u+\sigma(u)$ だから、仮定より $\sigma(u)=-u$ です。標数 $0$ なので $2$ は可逆であり、$b=-u/2\in L$ が定義できます。従って

$$
\sigma(b)-b
=-\frac{\sigma(u)}2+\frac u2
=\frac u2+\frac u2=u.
$$

この構成は $2$ で割るところに標数 $0$ を使いました。標数 $2$ では $-u/2$ は定義できませんが、[加法的定理90](#thm-anf14-additive90)そのものは有限 Galois 拡大に対して有効です。
<!-- solution-end -->

### C1. 三種類の障害を一本の議論で整理

以下の問いに順に答えよ。

1. $L/K$ が次数 $n$ の巡回 Galois 拡大であるとき、$D(b)=\sigma(b)/b$ の核と像を求め、対応する完全列の中間部分を導け。
2. $L=\mathbb Q_3(i)$ について $u=i$ が $\ker N$ に入り、実際に $\operatorname{im}D$ に入ることを具体的に示せ。一方で $3$ は $N(L^\times)$ に入らないことを証明せよ。
3. $G=C_2$ が $M=\{1,-1\}$ に自明に作用する場合の非自明な $H^1(G,M)$ と比較し、Hilbert 90 の正確な対象を説明せよ。

- Level: C
- ID: ANF14-C1

<!-- solution-start -->
**詳細解答。**

**(1) 核と像。** $D(b)=1$ は $\sigma(b)=b$ と同値です。$\sigma$ は $G$ を生成するため、[有限 Galois 理論の基本定理](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)の $L^G=K$ を使うと

$$
\ker D=K^\times.
$$

他方、任意の $b\in L^\times$ について

$$
N(D(b))
=\prod_{j=0}^{n-1}\frac{\sigma^{j+1}(b)}{\sigma^j(b)}
=1
$$

なので $\operatorname{im}D\subseteq\ker N$ です。逆に $N(u)=1$ を満たす $u$ からは[巡回型 Hilbert 90](#thm-anf14-cyclic90)で $u=D(b)$ となる $b$ が得られます。従って

$$
1\longrightarrow K^\times\longrightarrow L^\times
\xrightarrow{D}L^\times\xrightarrow{N}K^\times
$$

は各中間位置で完全です。

**(2) 乗法の二つの問い。** $\sigma(i)=-i$ なので

$$
N(i)=i(-i)=1.
$$

$b=1-i$ に対して

$$
D(b)=\frac{1+i}{1-i}
=\frac{(1+i)^2}{2}=i,
$$

従って $i\in\operatorname{im}D$ です。一方 $L/K$ は非分岐二次なので[非分岐拡大のノルム付値条件](../ANF12/index.md#thm-anf12-unramified-norm)により、任意の $x\in L^\times$ には

$$
v_3(N(x))=2v_L(x)\in2\mathbb Z
$$

が成立します。$v_3(3)=1$ は奇数ですから $3$ はノルムではありません。$N$ が非全射でも $\ker N=\operatorname{im}D$ は成立します。

**(3) 係数群の違い。** $M=\{1,-1\}$ に自明な $G$ 作用を与えると、余サイクルは $c_1=1,c_s=\pm1$ の二通り、余境界は $b^{-1}s(b)=1$ だけです。よって

$$
H^1(C_2,M)\cong C_2\ne0.
$$

対して乗法的 Hilbert 90 の係数群は有限 Galois 拡大の**乗法群全体** $L^\times$ で、作用は体の自己同型から来るものです。この場合は[定理90](#thm-anf14-hilbert90)によって $H^1(G,L^\times)=0$ となります。係数群を小さくしても結論が保たれるとは限りません。
<!-- solution-end -->

次講 ANF15「局所相互法則への導入」では、ノルム群の商と Frobenius の対応を学びます。
