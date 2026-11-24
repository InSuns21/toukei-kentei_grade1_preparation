# IWA14 Kummer合同とBernoulli数

[IWA13のp進積分](../IWA13/index.md#def-iwa13-integral)では、整合する整数値の重みから連続関数の積分を作りました。今回は逆向きに、算術で現れる有理数の列を積分として実現します。普通の有理数の大小では見えない、添字の合同と値の合同の対応が主題です。

異なる添字の有理数が、適切な正規化によって同じ5進剰余類に入る仕組みを、有限分割から証明します。

以下、$p$ は奇素数とします。[p進付値](../../ANF/ANF9/index.md#def-anf9-p-adic-valuation) $v_p$ は $v_p(p)=1$ と正規化します。

有理数を [p進数体への埋め込み](../../ANF/ANF9/index.md#thm-anf9-completion-field) によって $\mathbb Q_p$ の元とみなします。[p進整数環](../../ANF/ANF9/index.md#def-anf9-p-adic-integers) $\mathbb Z_p$ は付値が非負の元全体です。

整数 $r\ge1$ に対して $u\equiv v\pmod{p^r}$ は $u-v\in p^r\mathbb Z_p$ を意味します。特に分母が $p$ と互いに素なら法 $p^r$ で逆元を取って計算できます。

$p^r\mathbb Z_p$ は $|x|_p\le p^{-r}$ を満たす元全体です。絶対値の連続性により閉集合であり、$\mathbb Q_p$ の完備性から閉部分集合 $\mathbb Z_p$ も完備です。後で有限和の合同を極限へ移すときに、この閉性を使います。

## 1. べきの和を一つの級数で扱う

整数のべきの和を次数ごとに計算する代わりに、全次数の情報を形式的な変数 $t$ の係数にまとめます。有理係数の形式的冪級数 $\mathbb Q[[t]]$ では等号は各係数の一致を意味します。二つの級数の積は各次数について有限和で計算します。

$$
\left(\sum_{j\ge0}a_jt^j\right)
\left(\sum_{j\ge0}b_jt^j\right)
=\sum_{k\ge0}\left(\sum_{j=0}^k a_jb_{k-j}\right)t^k.
$$

$e^t=\sum_{j\ge0}t^j/j!$ と置きます。$e^t-1$ の先頭項は $t$ なので、$(e^t-1)/t$ の定数項は $1$ です。この逆数は有理係数の形式的冪級数として一意に求まります。ここでは $p$ 進指数関数の収束を仮定する必要はありません。

<a id="def-iwa14-bernoulli"></a>

<!-- formal-statement-start -->
> **定義（Bernoulli数）**
> 有理数列 $(B_k)_{k\ge0}$ を形式的冪級数の等式
>
$$
\frac{t}{e^t-1}=\sum_{k=0}^\infty B_k\frac{t^k}{k!}
$$
>
> によって定める。指数級数は $e^t=\sum_{j\ge0}t^j/j!$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa14-bernoulli -->
**定義の確認**。 両辺に $(e^t-1)/t$ を掛けて $1$ とします。定数項から $B_0=1$、一次の係数から $B_1+1/2=0$、二次の係数から

$$
\frac{B_2}{2}+\frac{B_1}{2}+\frac16=0
$$

なので $B_1=-1/2$、$B_2=1/6$ を得ます。これらの値で積の定数項は $1$、一次・二次の係数は $0$ です。
<!-- definition-example-end -->

一般に $k\ge1$ を固定し、$(e^t-1)\sum_{j\ge0}B_jt^j/j!=t$ の $t^{k+1}$ の係数を比較します。指数級数の定数項が差し引かれているので、

$$
0=\sum_{j=0}^{k}\frac{B_j}{j!(k+1-j)!}.
$$

両辺を $(k+1)!$ 倍すると

$$
\sum_{j=0}^{k}\binom{k+1}{j}B_j=0,
\qquad
B_k=-\frac1{k+1}\sum_{j=0}^{k-1}\binom{k+1}{j}B_j.
$$

この漸化式で一つずつ求められます。例えば $4B_3=-(1-2+1)=0$、$5B_4=-(1-5/2+10/6)=-1/6$ です。さらに $F(t)=t/(e^t-1)$ と置きます。分子・分母に $e^t$ を掛けると

$$
F(-t)=\frac{-te^t}{1-e^t}
=\frac{te^t}{e^t-1}=t+F(t).
$$

従って $F(-t)-t/2=F(t)+t/2$ となり、$F(t)+t/2$ は偶級数（奇数次の係数がすべて零）です。従って奇数 $k>1$ では $B_k=0$。例えば $7B_6=-(1-7/2+21/6-35/30)=1/6$ です。最初の数値は次の通りです。

| $k$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| $B_k$ | $1$ | $-1/2$ | $1/6$ | $0$ | $-1/30$ | $0$ | $1/42$ |

剰余類の代表にも依存する係数を得るには、生成関数に $e^{xt}$ を掛けます。$x$ は多項式の変数、$t$ は係数を取り出すための形式変数であり、$e^{xt}=\sum_{j\ge0}x^jt^j/j!$ とします。これにより平行移動と分割を同じ級数の計算に帰着できます。

<a id="def-iwa14-bernoulli-polynomial"></a>

<!-- formal-statement-start -->
> **定義（Bernoulli多項式）**
> $k\ge0$ に対する有理係数多項式 $B_k(x)$ を
>
$$
\frac{te^{xt}}{e^t-1}=\sum_{k\ge0} B_k(x)\frac{t^k}{k!}
$$
>
> により定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa14-bernoulli-polynomial -->
**定義の確認**。 $e^{xt}$ の係数と [Bernoulli数](#def-iwa14-bernoulli) の係数を掛けると

$$
B_k(x)=\sum_{j=0}^k\binom{k}{j}B_j x^{k-j}.
$$

従って $B_0(x)=1$、$B_1(x)=x-1/2$、$B_2(x)=x^2-x+1/6$。二次まで生成関数に代入すると $1+(x-1/2)t+(x^2/2-x/2+1/12)t^2$ となり定義を満たします。特に $B_k(0)=B_k$ です。
<!-- definition-example-end -->

## 2. 多項式を分割したときの恒等式

有限分割と整合する重みを作るためには、ある代表 $x$ における値を細分した代表の値の和に直す必要があります。Bernoulli多項式にはちょうどその性質があります。

<a id="thm-iwa14-multiplication"></a>

<!-- formal-statement-start -->
> **定理（Bernoulli多項式の分布公式）**
> 整数 $m\ge1$、$k\ge0$、変数 $x$ に対して多項式恒等式
>
$$
\sum_{j=0}^{m-1}B_k\left(\frac{x+j}{m}\right)
=m^{1-k}B_k(x)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

左辺を全次数の生成関数に戻すと、指数の有限等比級数が現れます。分母が相殺された後、右辺は元の生成関数の変数を $t/m$ に変えた形になります。

<!-- proof-start -->
### 証明

[多項式の定義](#def-iwa14-bernoulli-polynomial)から左辺の生成関数は

$$
\frac{te^{xt/m}}{e^t-1}\sum_{j=0}^{m-1}e^{jt/m}.
$$

左辺を展開して隣接する指数項を相殺すると、先頭と末尾だけが残ります。具体的には

$$
(e^{t/m}-1)\sum_{j=0}^{m-1}e^{jt/m}=e^t-1.
$$

これを用いて生成関数を書き換えると

$$
\frac{te^{xt/m}}{e^{t/m}-1}
=m\sum_{k\ge0} B_k(x)\frac{(t/m)^k}{k!}.
$$

各次数の係数を比較すれば結論を得ます。計算は $t$ に関する形式的冪級数として成立します。分母を相殺する操作は、$e^t-1$ と $e^{t/m}-1$ から共通の $t$ を取り除いた後、定数項が非零の級数の逆元を掛ける操作です。
<!-- proof-end -->

例えば $m=2,k=2$ の左辺は

$$
B_2(x/2)+B_2((x+1)/2)
=\frac{x^2}{2}-\frac x2+\frac1{12}
=\frac12 B_2(x).
$$

次はこの分割公式を $m=p$ に適用します。

## 3. 分母を相殺して整数値測度を作る

$N=p^n$、$0\le a<N$ とします。$n\ge0$ とし、第0層は $N=1$、$a=0$ です。整数 $k\ge1$ に対し、次の重みを使います。

$$
D_{k,n}(a)=\frac{N^{k-1}}{k} B_k(a/N).
$$

[分布公式](#thm-iwa14-multiplication)で $m=p$、$x=a/N$ と置くと

$$
\sum_{j=0}^{p-1}D_{k,n+1}(a+jN)
=\frac{(pN)^{k-1}}k p^{1-k}B_k(a/N)
=D_{k,n}(a).
$$

従って各 $k$ を固定した重みの族は [p進分布](../IWA13/index.md#def-iwa13-distribution) です。分布は親の重みが子の重みの和に等しいことを意味し、さらに全層の値が $\mathbb Z_p$ に属するとき $\mathbb Z_p$ 値測度と呼びます。しかし $k=1$ の場合 $D_{1,n}(a)=a/N-1/2$ なので、$a=1,n\ge1$ では $v_p(D_{1,n}(1))=-n$。このままでは有界な重みになりません。

そこで $p$ と互いに素な正整数 $c>1$ を固定し、$a$ に対応する代表 $b$ を $cb\equiv a\pmod N$ で選びます。

$n\ge1$ では $\gcd(c,N)=1$ なので [法の単数群](../../NT/NT2/index.md#def-nt2-unit-group) の逆元を使って一意に選べます。$n=0$ では代表は $a=b=0$ だけです。$c$ による剰余類の置換を使えば、分母 $N$ が相殺されます。

<a id="def-iwa14-regularized-measure"></a>

<!-- formal-statement-start -->
> **定義（Bernoulli分布の正則化）**
> 奇素数 $p$ と整数 $c>1$、$p\nmid c$ を固定する。整数 $n\ge0$ に対し $N=p^n$、$0\le a<N$ に対し、$0\le b<N$ を $cb\equiv a\pmod N$ の唯一の代表とする。正則化した重みを
>
$$
\mu_{c,n}(a)=D_{1,n}(a)-cD_{1,n}(b)
=\frac{a-cb}{N}+\frac{c-1}{2}
$$
>
> と置く。ただし $D_{1,n}(a)=a/N-1/2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa14-regularized-measure -->
**定義の確認**。 $p=5,c=2,N=5$ では、$a=0,1,2,3,4$ に対応する $b$ は順に $0,3,1,4,2$ です。$a-2b$ は $0,-5,0,-5,0$ となるので、重みは

$$
(1/2,-1/2,1/2,-1/2,1/2).
$$

各 $b$ は $0\le b<5$ かつ $2b-a$ が5の倍数なので代表の条件を満たします。重みの分母は2で5と互いに素なので、すべて $\mathbb Z_5$ の元です。

第0層の重みは $(c-1)/2=1/2$ です。5個の和も $1/2$ となり、最初の細分について分布関係まで確認できます。全層での整合性と整数性は次の定理で証明します。
<!-- definition-example-end -->

<a id="thm-iwa14-measure"></a>

<!-- formal-statement-start -->
> **定理（正則化分布の有界性）**
> 奇素数 $p$、$c>1$、$p\nmid c$ のもと、[正則化した重み](#def-iwa14-regularized-measure) は $\mathbb Z_p$ 値測度である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの分布の差は分布関係を保ちます。二番目の分布に $c^{-1}$ による剰余類の置換を施しても、子の集合が子の集合へ移るため整合性は壊れません。分母の相殺により各重みが整数値になります。

<!-- proof-start -->
### 証明

$a$ の子 $a+jN$ に対して $c b_j\equiv a+jN\pmod{pN}$ を満たす $0\le b_j<pN$ を取ります。法 $N$ に還元すると $b_j\equiv b$。異なる $j$ からは異なる $b_j$ が得られます（$c$ は法 $pN$ で可逆）。従って $b_j$ 全体は $b+\ell N$（$0\le\ell<p$）の全体に一致します。

$D_1$ は $k=1$ に固定した分布の族 $(D_{1,n})_{n\ge0}$ の略記です。第3節冒頭で [分布公式](#thm-iwa14-multiplication) から導いた分布関係を、$a$ の子と $b$ の子にそれぞれ使うと

$$
\sum_j\mu_{c,n+1}(a+jN)
=D_{1,n}(a)-cD_{1,n}(b)=\mu_{c,n}(a).
$$

また $a-cb$ は $N$ の整数倍で、$2$ は $\mathbb Z_p$ で可逆です。従って各重みは $\mathbb Z_p$ に入ります。[p進分布の定義](../IWA13/index.md#def-iwa13-distribution) の二条件を満たしました。
<!-- proof-end -->

ここで積分する範囲を単数に制限します。[p進整数環の単元の判定](../../ANF/ANF9/index.md#prop-anf9-dvr-structure) により $\mathbb Z_p^\times$ は法 $p$ の非零剰余類の合併です。

その指示関数 $\mathbf1_{\mathbb Z_p^\times}$ は単数で1、それ以外で0を取り、法 $p$ の剰余類上で一定なので連続です。単数上の積分は、$\mathbb Z_p$ 上でこの指示関数を掛けた積分として扱います。

$\mu_c$ は各層の重みの族 $(\mu_{c,n})_{n\ge0}$ を表し、$d\mu_c$ は [p進積分](../IWA13/index.md#def-iwa13-integral) の重みの指定であって微分ではありません。

整数 $k\ge1$ に対する関数 $x^{k-1}$（$k=1$ なら定数関数1）は全体で連続かつ $\mathbb Z_p$ 値であるため、[分布の積分への一意的延長](../IWA13/index.md#thm-iwa13-extension) により

$$
\int_{\mathbb Z_p^\times}x^{k-1}\,d\mu_c
=\lim_{n\to\infty}\sum_{\substack{0\le a<p^n\\p\nmid a}}a^{k-1}\mu_{c,n}(a)
$$

が存在し、$\mathbb Z_p$ に入ります。$n\ge1$ の層を使います。

## 4. 測度の積分にBernoulli数が現れる

欲しいのは $D_k$ の全質量ですが、有界なのは $\mu_c$ です。この二つをつなぐのが次の計算です。差を $E_{k,n}(a)=D_{k,n}(a)-c^kD_{k,n}(b)$ と書きます。これを展開すると、主要項は $a^{k-1}\mu_{c,n}(a)$ になります。残りは $n$ を増すと $p$ 進的に零へ近づきます。

<a id="thm-iwa14-moments"></a>

<!-- formal-statement-start -->
> **定理（正則化測度の積分公式）**
> 奇素数 $p$、整数 $c>1$、$p\nmid c$ に対し、[正則化分布の有界性](#thm-iwa14-measure) で得た測度 $\mu_c$ と任意の整数 $k\ge1$ について
>
$$
\int_{\mathbb Z_p}x^{k-1}\,d\mu_c=(1-c^k)\frac{B_k}{k},
$$
>
$$
\int_{\mathbb Z_p^\times}x^{k-1}\,d\mu_c
=(1-c^k)(1-p^{k-1})\frac{B_k}{k}.
$$
>
> $k=1$ のとき $x^0=1$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

まず $D_k$ の分布関係から全層の和を第0層の値に戻します。次に $p$ の倍数だけを集めると、下の層の和の $p^{k-1}$ 倍になります。最後に正則化した $D_k$ と測度の積分和との差を、次数を固定して一様に評価します。

<!-- proof-start -->
### 証明

第0層の値は $B_k/k$ なので、分布関係を繰り返して

$$
\sum_{0\le a<N}D_{k,n}(a)=\frac{B_k}{k}.
$$

$n\ge1$ では $a=pu$ と書ける代表について

$$
D_{k,n}(pu)
=p^{k-1}\frac{(N/p)^{k-1}}{k} B_k(u/(N/p))
=p^{k-1}D_{k,n-1}(u).
$$

$0\le u<N/p$ で和を取って全体から引くと

$$
\sum_{\substack{0\le a<N\\p\nmid a}}D_{k,n}(a)
=(1-p^{k-1})\frac{B_k}{k}.
$$

$c$ による置換は全代表の集合も単数代表の集合も保つため、$E_{k,n}(a)$ の各集合での和は上の値を $1-c^k$ 倍したものです。

次に [Bernoulli多項式](#def-iwa14-bernoulli-polynomial) を展開します。$k\ge2$ では

$$
D_{k,n}(a)=\frac{a^k}{kN}-\frac12a^{k-1}
+\sum_{j=2}^{k}\frac1k\binom{k}{j}B_j a^{k-j}N^{j-1}.
$$

$q=(a-cb)/N\in\mathbb Z$ と置くと $cb=a-qN$。二項定理によって

$$
a^k-(cb)^k=kqNa^{k-1}
+\sum_{i=2}^k(-1)^{i+1}\binom{k}{i}(qN)^i a^{k-i}.
$$

従って $[a^k-(cb)^k]/(kN)$ は $qa^{k-1}$ と、$N$ を因子に持つ有限個の有理係数項の和です。また

$$
-\frac12\{a^{k-1}-c(cb)^{k-1}\}
=\frac{c-1}{2}a^{k-1}
+\frac c2\{(cb)^{k-1}-a^{k-1}\}.
$$

最後の差は整数として $N$ の倍数です。$j\ge2$ の残りの項も $N^{j-1}$ を因子に持ちます。ここで $k$ を固定し、これら有限個の有理係数の $p$ 進付値がすべて $-M_k$ 以上となる非負整数 $M_k$ を取ります。$a,b,c,q$ は整数なので

$$
E_{k,n}(a)-a^{k-1}\mu_{c,n}(a)\in p^{n-M_k}\mathbb Z_p.
$$

$M_k$ は代表 $a$ や層 $n$ に依存しません。$k=1$ ならこの差は定義から厳密に零です。

$p^{n-M_k}\mathbb Z_p$ は加法について閉じているため、代表の個数が増えても誤差の和は同じ集合に入ります。よって全体・単数それぞれについて $n\to\infty$ で誤差の和は零へ収束します。[p進積分の極限表示](../IWA13/index.md#def-iwa13-integral) を使えば、先ほど計算した $E_{k,n}$ の和がそのまま積分値になります。
<!-- proof-end -->

**数値例。** $p=5,c=2,k=2$ では単数上の積分は

$$
(1-4)(1-5)\frac{1/6}{2}=1.
$$

第1層の和は $(-1+2-3+4)/2=1$ で、既にこの値と一致します。全体の積分は $-1/4$ なので、$p$ の倍数を除いた効果は実際に見えています。

## 5. 添字が近いと積分値も近い

整数 $r\ge1$ を固定します。[Eulerのφ関数](../../NT/NT2/index.md#def-nt2-euler-phi) $\varphi(p^r)$ は法 $p^r$ の単数の個数です。全 $p^r$ 個の代表のうち $p$ の倍数は $p^{r-1}$ 個なので、

$$
\varphi(p^r)=p^r-p^{r-1}=p^{r-1}(p-1).
$$

単数上では、指数をこの数の倍数だけ変えても法 $p^r$ の値が変わりません。[Eulerの定理](../../NT/NT2/index.md#thm-nt2-euler) を整数代表に適用した事実です。測度の値が整数なので、各項の合同は積分に移ります。

正規化した特殊値の候補を $C_k=(1-p^{k-1})B_k/k$ と書きます。積分に現れるのは $(1-c^k)C_k$ です。この補助因子を外せる条件に注意します。

<a id="thm-iwa14-kummer"></a>

<!-- formal-statement-start -->
> **定理（Kummer合同）**
> $p$ を奇素数、$r\ge1$、$k,l\ge2$ を整数とする。
>
$$
k\equiv l\pmod{p^{r-1}(p-1)},\qquad (p-1)\nmid k
$$
>
> ならば $C_j=(1-p^{j-1})B_j/j$ と置いたとき、$C_k,C_l\in\mathbb Z_p$ であり、
>
$$
(1-p^{k-1})\frac{B_k}{k}
\equiv (1-p^{l-1})\frac{B_l}{l}\pmod{p^r}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

法 $p$ の [原始根](../../NT/NT2/index.md#def-nt2-primitive-root)（乗法群で位数 $p-1$ を持つ元）を補助整数 $c$ として選べば、$1-c^k$ と $1-c^l$ は単数です。まず積分公式から正規化値の整性を得ます。次に被積分関数と補助因子の双方の合同を確認し、最後に単数で割ります。

<!-- proof-start -->
### 証明

[有限体の乗法群の巡回性](../../NT/NT2/index.md#thm-nt2-finite-subgroup-cyclic) により法 $p$ の位数が $p-1$ の代表 $c$ を $2\le c<p$ に選べます。$(p-1)\nmid k$ より $c^k\not\equiv1\pmod p$。$l\equiv k\pmod{p-1}$ なので $c^l$ も同様です。

[正則化測度の積分公式](#thm-iwa14-moments) により $(1-c^k)C_k$ と $(1-c^l)C_l$ は $\mathbb Z_p$ の元です。各補助因子が単数なので、$C_k,C_l$ 自身も $\mathbb Z_p$ に入ります。

$p\nmid a$ の代表について [Eulerの定理](../../NT/NT2/index.md#thm-nt2-euler) を法 $p^r$ に適用します。$k\ge l$ の場合、$k-l=d p^{r-1}(p-1)$（$d\ge0$）と書け、

$$
a^{k-1}-a^{l-1}=a^{l-1}(a^{k-l}-1)
\in p^r\mathbb Z_p.
$$

$k<l$ なら二つを交換すれば同じ包含が成立します。$\mu_{c,n}(a)\in\mathbb Z_p$ を掛けて有限和を取ると、差は $p^r\mathbb Z_p$ に留まります。この集合は閉なので極限にも合同が残り、積分公式から

$$
(1-c^k)C_k-(1-c^l)C_l\in p^r\mathbb Z_p.
$$

$c$ 自身にも [Eulerの定理](../../NT/NT2/index.md#thm-nt2-euler) を適用して $c^k\equiv c^l\pmod{p^r}$。したがって

$$
(1-c^k)(C_k-C_l)
=\{(1-c^k)C_k-(1-c^l)C_l\}
+(c^k-c^l)C_l
$$

の二項はともに $p^r\mathbb Z_p$ に属します。$1-c^k$ の逆元を掛けてもこの集合は保たれ、結論を得ます。
<!-- proof-end -->

例えば $p=5,k=2,l=6,r=1$ では

$$
C_2=-\frac13,\qquad C_6=-\frac{781}{63}.
$$

法5で $3^{-1}=2$、$63\equiv3$、$781\equiv1$ なので両者は $3$ に合同です。

**仮定を外すとどうなるか。** $p=5,k=4$ では $p-1$ が $k$ を割ります。このとき

$$
C_4=(1-125)\frac{-1}{120}=\frac{31}{30}.
$$

$v_5(C_4)=-1$ なので整数性から壊れます。どの単数 $c$ に対しても $c^4\equiv1\pmod5$ であり、証明の最後に補助因子を単数として割ることができません。

## 6. 補間とは何を要求しているのか

$k,l\ge2$ を同じ非零剰余類 $k_0\bmod(p-1)$ に固定すると、$k-l$ が $p^{r-1}$ の倍数であるだけで Kummer合同を使えます。したがって $k$ の $p$ 進的な近さに応じて $C_k$ も近づきます。

実際、$1\le k_0\le p-2$ を固定し、$k=k_0+(p-1)m\ge2$、$m\ge0$ とします。これらの $m$ は $\mathbb Z_p$ で稠密です（任意の法 $p^n$ の代表に大きな $p^n$ の倍数を足せばよい）。$z\in\mathbb Z_p$ を固定し、$m_i\to z$ となり $k_0+(p-1)m_i\ge2$ を満たす非負整数列を取ります。

任意の $r\ge1$ に対し十分大きな $i,j$ で $m_i\equiv m_j\pmod{p^{r-1}}$。[Kummer合同](#thm-iwa14-kummer) より対応する $C_{k_0+(p-1)m_i}$ の差は $p^r\mathbb Z_p$ に入ります。

$\mathbb Z_p$ の完備性から値の極限が存在します。別の近似列 $m'_i\to z$ に対しても、十分大きな $i$ で $m_i-m'_i\in p^{r-1}\mathbb Z_p$ なので、対応する値の差は $p^r\mathbb Z_p$ に入ります。閉性から極限の差もすべての $r\ge1$ について $p^r\mathbb Z_p$ に入り、従って零です。

この極限を $F_{k_0}(z)$ と置きます。$z\equiv w\pmod{p^{r-1}}$ のとき、$z,w$ への近似列の十分後ろの項も法 $p^{r-1}$ で合同です。再び [Kummer合同](#thm-iwa14-kummer) と閉性を使うと

$$
F_{k_0}(z)-F_{k_0}(w)\in p^r\mathbb Z_p.
$$

従って連続です。元の添字条件を満たす整数点 $m$ では定数列 $m_i=m$ を選べるので、$F_{k_0}(m)=C_{k_0+(p-1)m}$ です。この稠密な点集合で一致する二つの連続関数は、近似列の極限でも一致するため一意です。これは補間が実際に可能であることを示す構成です。

複素側の特殊値との接続も一つ確かめましょう。[Riemann ζ 関数の標準特殊値](../../../解析系/CA/CA12/index.md#cor-ca12-special-values) より $\zeta(-1)=-1/12=-B_2/2$ です。従って $C_2=-(1-p)\zeta(-1)$。一般の正の偶数 $k$ における $\zeta(1-k)$ と $-B_k/k$ の関係、指標による成分の区別、変数の正規化は次講の補間公式につなげます。ここでは算術側で $C_k$ の連続補間を構成しました。

## 7. 演習と詳細解答

### Level A

<a id="ex-iwa14-a1"></a>

**A1. Bernoulli数の漸化式**
- Level: A
- ID: IWA14-A1

生成関数から $B_0,B_1,B_2,B_3$ を順に求めよ。

<!-- solution-start -->
**詳細解答。** [Bernoulli数の定義](#def-iwa14-bernoulli) の両辺に $e^t-1$ を掛け、$t$ の係数を比較して $B_0=1$。$t^2,t^3,t^4$ の係数をそれぞれ $2!,3!,4!$ 倍すると
$$
1+2B_1=0,\quad 1+3B_1+3B_2=0,
$$
$$
1+4B_1+6B_2+4B_3=0.
$$
順に $B_1=-1/2$、$3B_2=1/2$、$4B_3=-1+2-1=0$。よって $B_2=1/6$、$B_3=0$。
<!-- solution-end -->

<a id="ex-iwa14-a2"></a>

**A2. 多項式の分割**
- Level: A
- ID: IWA14-A2

$B_2(x)=x^2-x+1/6$ を使い、$m=3$ の分布公式を $x=0$ で確かめよ。

<!-- solution-start -->
**詳細解答。** 三つの評価点は $0,1/3,2/3$。値は $1/6$、$1/9-1/3+1/6=-1/18$、$4/9-2/3+1/6=-1/18$。和は $3/18-1/18-1/18=1/18$ です。[分布公式](#thm-iwa14-multiplication) の右辺 $3^{-1}B_2(0)=1/18$ に一致します。
<!-- solution-end -->

<a id="ex-iwa14-a3"></a>

**A3. 正則化された重み**
- Level: A
- ID: IWA14-A3

$p=3,c=2,n=1$ で全代表の $b$ と $\mu_{c,1}(a)$ を求め、第0層との整合を確認せよ。

<!-- solution-start -->
**詳細解答。** $2b\equiv a\pmod3$ の代表は $a=0,1,2$ に対して $b=0,2,1$。[正則化の定義](#def-iwa14-regularized-measure) より
$$
\mu_{2,1}(0)=1/2,\quad
\mu_{2,1}(1)=-1/2,\quad
\mu_{2,1}(2)=1/2.
$$
各値は分母が2なので $\mathbb Z_3$ に属し、和は $1/2$。第0層は $a=b=0,N=1$ なので $\mu_{2,0}(0)=1/2$ となり、整合します。
<!-- solution-end -->

<a id="ex-iwa14-a4"></a>

**A4. 正規化値を法5で比較**
- Level: A
- ID: IWA14-A4

$B_2=1/6,B_6=1/42$ を用いて $p=5$ の $C_2,C_6$ の差を求め、付値を計算せよ。

<!-- solution-start -->
**詳細解答。** $C_2=-1/3$、$C_6=(1-3125)/252=-781/63$。したがって
$$
C_6-C_2=\frac{-781+21}{63}=-\frac{760}{63}.
$$
$760=5\cdot152$、$5\nmid152$、$5\nmid63$ より付値はちょうど1です。添字差4は $p-1$ の倍数ですが20の倍数ではなく、法25の合同までは要求されません。
<!-- solution-end -->

### Level B

<a id="ex-iwa14-b1"></a>

**B1. 分布と単数への制限**
- Level: B
- ID: IWA14-B1

$D_{2,n}(a)$ を $a,N$ の式で書き、$p=3,n=1$ で全質量と単数代表上の質量を直接計算せよ。

<!-- solution-start -->
**詳細解答。** [Bernoulli多項式の定義](#def-iwa14-bernoulli-polynomial) から
$$
D_{2,n}(a)=\frac{a^2}{2N}-\frac a2+\frac N{12}.
$$
$N=3$ では $a=0$ で $1/4$、$a=1$ で $1/6-1/2+1/4=-1/12$、$a=2$ で $4/6-1+1/4=-1/12$。全質量は $1/4-2/12=1/12$ で $B_2/2$ と一致します。単数代表 $1,2$ の和は $-1/6=(1-3)B_2/2$ です。倍数代表 $0$ を取り除くと $3B_2/2$ が引かれることを確認しました。
<!-- solution-end -->

<a id="ex-iwa14-b2"></a>

**B2. 積分公式の誤差を正確に計算**
- Level: B
- ID: IWA14-B2

$k=2$、$q=(a-cb)/N$ とするとき、$E_{2,n}(a)-a\mu_{c,n}(a)$ を $N,q,c$ で表せ。$p=3$ でも零へ近づくことを示せ。

<!-- solution-start -->
**詳細解答。** $cb=a-qN$ を使って
$$
E_{2,n}(a)=\frac{a^2-(a-qN)^2}{2N}
-\frac{a-c(a-qN)}2+\frac{(1-c^2)N}{12}.
$$
第一項は $qa-q^2N/2$、第二項は $(c-1)a/2-cqN/2$ です。$a\mu_{c,n}(a)=a(q+(c-1)/2)$ を引くと
$$
E_{2,n}(a)-a\mu_{c,n}(a)
=N\left(-\frac{q^2+cq}{2}+\frac{1-c^2}{12}\right).
$$
$p=3$ では括弧内は少なくとも $3^{-1}\mathbb Z_3$ に属するので、誤差は $3^{n-1}\mathbb Z_3$ に入ります。$q$ の選び方が層に依存してもこの評価は一様です。
<!-- solution-end -->

<a id="ex-iwa14-b3"></a>

**B3. 単数条件がない場合**
- Level: B
- ID: IWA14-B3

$p=5,k=4,c=2$ として $C_4$ と $(1-c^k)C_4$ を求め、整数性が異なる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $B_4=-1/30$ から
$$
C_4=(1-5^3)\frac{-1}{120}=\frac{31}{30},
\qquad
(1-2^4)C_4=-\frac{31}{2}.
$$
前者の付値は $-1$、後者は $0$ です。$1-2^4=-15$ は付値1なので分母の5を相殺します。[正則化測度の積分公式](#thm-iwa14-moments) の積分値は整数ですが、補助因子が単数でないと $C_4$ の整数性はそこから導けません。
<!-- solution-end -->

<a id="ex-iwa14-b4"></a>

**B4. 指数の合同を積分へ移す**
- Level: B
- ID: IWA14-B4

奇素数 $p$、整数 $r\ge1$ を固定する。任意の $\mathbb Z_p$ 値測度 $\nu$（第 $n$ 層の重みを $\nu_n(a)$ と書く）に対して、整数 $k,l\ge1$ が法 $p^{r-1}(p-1)$ で合同なら単数上の $x^{k-1},x^{l-1}$ の積分値は法 $p^r$ で合同であることを示せ。

<!-- solution-start -->
**詳細解答。** $p\nmid a$ の整数代表に対し [Eulerの定理](../../NT/NT2/index.md#thm-nt2-euler) より $a^{p^{r-1}(p-1)}\equiv1\pmod{p^r}$。大きい方の指数から小さい方を引くとこの指数の非負整数倍なので、$a^{k-1}-a^{l-1}\in p^r\mathbb Z_p$。有限和の各項に $\nu_n(a)\in\mathbb Z_p$ を掛けてもこの包含が保たれます。和を取った後、[積分への一意的延長](../IWA13/index.md#thm-iwa13-extension) により極限が存在し、$p^r\mathbb Z_p$ の閉性から差もそこに属します。
<!-- solution-end -->

### Level C

<a id="ex-iwa14-c1"></a>

**C1. 補助因子から合同と補間を組み立てる**
- Level: C
- ID: IWA14-C1

$p=5,c=2$、$k=2+4m$（$m\ge0$）とする。次を示せ。

1. 全ての $C_{2+4m}$ が $\mathbb Z_5$ に入る。
2. $m\equiv n\pmod{5^s}$（$s\ge0$）なら対応する値は法 $5^{s+1}$ で合同である。
3. $m_j=5^j-1$（$j\ge1$）の値の列が収束し、その極限は $C_2$ と法5で合同である。添字の極限も求めよ。

<!-- solution-start -->
**詳細解答。**

(1) $2^4\equiv1\pmod5$ なので $2^{2+4m}\equiv4\pmod5$。よって $1-2^{2+4m}\equiv2\pmod5$ は単数です。[正則化測度の積分公式](#thm-iwa14-moments) からこの因子と $C_{2+4m}$ の積が整数値となるので、逆元を掛けて結論を得ます。

(2) $k=2+4m,l=2+4n$ とすると $k-l=4(m-n)$ は $4\cdot5^s$ の倍数。さらに $4\nmid k$ です。[Kummer合同](#thm-iwa14-kummer) を $r=s+1$ で適用すると
$$
C_{2+4m}-C_{2+4n}\in 5^{s+1}\mathbb Z_5.
$$

(3) $i,j\ge s$ なら $m_i-m_j=5^i-5^j$ は $5^s$ の倍数です。(2) の評価より値の列はCauchy列であり $\mathbb Z_5$ の完備性から収束します。比較相手の添字パラメータを $n=0$ とし、$s=0$ で (2) を使うと各項は $C_2$ と法5で合同なので極限も合同です。

$m_j\to-1$ なので、添字についても

$$
2+4m_j=4\cdot5^j-2\longrightarrow-2
$$

が成り立ちます。値の極限を通常の負添字のBernoulli数とみなす必要はなく、第6節で作った連続補間の値です。
<!-- solution-end -->

## 8. 到達点と次講

Bernoulli数を形式的生成関数から計算し、多項式の分割公式で分布を作りました。補助整数によって分母を相殺した測度から特殊値の積分公式が得られ、指数の合同を値の合同へ移せました。

次講 IWA15「Kubota–Leopoldt p進L関数」では、この補間を指標ごとに整理し、Euler因子を含む特殊値の補間式へ進みます。

参考：Lawrence C. Washington, Introduction to Cyclotomic Fields, 2nd ed., Chapter 5; Romyar Sharifi, [Iwasawa Theory](https://www.math.ucla.edu/~sharifi/notes/iwasawa.html)。
