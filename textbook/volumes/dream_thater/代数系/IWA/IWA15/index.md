# IWA15 Kubota–Leopoldt p進L関数

[IWA14のKummer合同](../IWA14/index.md#thm-iwa14-kummer)では、Bernoulli数から作った特殊値を、添字の剰余類を固定して補間できました。今回はこの補間を測度の積分から直接構成します。添字の有限部分と連続部分を分離すると、複数の関数が現れ、そのうち一つだけが極を持ちます。次講で特徴イデアルと比較する冪級数は、この分離から生まれます。

以下、$p$ は奇素数、$v_p(p)=1$ とします。まず円分 $\mathbb Z_p$ 拡大に必要な、導手が $1$ または $p$ の指標を扱います。一般のDirichlet文字については第6節で範囲を広げます。

## 1. 整数の指数を連続変数に変える

$IWA8$ の [Teichmüller指標](../IWA8/index.md#def-iwa8-teich-character) を単元 $x\in\mathbb Z_p^\times$ に対して $\omega(x)=\omega(x\bmod p)$ と書きます。これは $p-1$ 乗して $1$ になり、法 $p$ で $x$ と一致する根です。

[IWA2の単元群の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting) と [指数座標](../IWA2/index.md#prop-iwa2-odd-exponent-coordinates) を各有限層から逆極限へ移すと、$g=1+p$ に対し

$$
x=\omega(x)\langle x\rangle,\qquad
\langle x\rangle=g^{\ell(x)},\qquad \ell(x)\in\mathbb Z_p
$$

と一意に書けます。$\langle x\rangle=x/\omega(x)$ は $1+p\mathbb Z_p$ の元です。$\ell$ は積を和に移し、法 $p^{n+1}$ の単元の値から $\ell(x)\bmod p^n$ が決まるので連続です。

例えば $p=5,x=2$ なら法25で $\omega(2)=7$ です。実際 $7^4=2401\equiv1\pmod{25}$ かつ $7\equiv2\pmod5$。$7\cdot6^2=252\equiv2\pmod{25}$ なので $\ell(2)\equiv2\pmod5$ です。

$p$ 進指数 $u\in\mathbb Z_p$ に対し、$z\in p\mathbb Z_p$ なら

$$
(1+z)^u=\sum_{j\ge0}\binom uj z^j
$$

を使えます。[IWA13の二項式変換](../IWA13/index.md#def-iwa13-amice-transform) で確認したように、$\binom uj$ は連続な整数値関数です。各項の絶対値は $p^{-j}$ 以下なので一様収束し、通常の整数指数の法則も非負整数の稠密性によって全ての $p$ 進指数へ延びます。

例えば $\langle x\rangle^{-s}$ は $s\in\mathbb Z_p$ に対して定義できます。一方 $\omega(x)$ の指数は $p-1$ を法として決める必要があります。$p^n\to0$ ですが $p^n\equiv1\pmod{p-1}$ なので、$u\mapsto\omega(x)^u$ を整数から $p$ 進的に連続延長することは、$\omega(x)\ne1$ ならできません。有限指標の番号 $i$ と連続変数 $s$ は別々に固定する必要があります。

## 2. 指標を付けたBernoulli数

[Dirichlet文字](../../ANT/ANT3/index.md#def-ant3-character) は単元群の乗法的な指標を非単元上で零に延長したものです。ここでは $i=0,\ldots,p-2$ に対し、単元上の $\omega^i$ を使います。

整数上の値を使う際には最小の法を選びます。すなわち $i=0$ は導手（最小の法）1の定数文字で、すべての整数で1です。

$i\ne0$ は導手 $p$ の原始文字で、$p$ の倍数上では零です。この区別は [原始Dirichlet文字](../../ANT/ANT3/index.md#def-ant3-primitive) の定義に従います。

これらの値は代数的な根です。複素側の特殊値を比較する際は、$p-1$ 乗根の生成元を複素側の一つの原始根に対応させ、同じ代数的数を複素数と $p$ 進数として読み分けます。

[IWA14のBernoulli多項式](../IWA14/index.md#def-iwa14-bernoulli-polynomial) は剰余類を細分する公式を持っていました。指標で重みを付けた有限和を作ると、Dirichlet L関数の特殊値を表せます。

<a id="def-iwa15-generalized-bernoulli"></a>

<!-- formal-statement-start -->
> **定義（一般化Bernoulli数）**
> $\psi$ を導手 $f\ge1$ の原始Dirichlet文字とする。整数 $k\ge1$ に対し
>
$$
B_{k,\psi}=f^{k-1}\sum_{a=1}^f\psi(a)B_k(a/f)
$$
>
> と置く。ただし $B_k(x)$ はBernoulli多項式で、導手1の文字は全ての整数で値1を取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa15-generalized-bernoulli -->
**定義の確認**。 $p=3$ で非自明な文字 $\psi=\omega$ を選ぶと、値は法3の $1,2,0$ に対して $1,-1,0$。単元群の位数2の生成元2を $-1$ に送るので乗法性があり、導手は3です。$B_1(x)=x-1/2$ を代入すると

$$
B_{1,\psi}=B_1(1/3)-B_1(2/3)=-1/3.
$$

導手1で $k=2$ なら $B_{2,1}=B_2(1)=1/6$。この規約では $B_{1,1}=1/2$ となり、IWA14の $B_1=-1/2$ とは異なります。$k\ge2$ では両者の規約が一致します。実際、生成関数の差は $t$ だけなので $B_k(1)=B_k(0)$ です。
<!-- definition-example-end -->

複素変数の [Dirichlet L関数](../../ANT/ANT3/index.md#def-ant3-l-function) の負整数での値をこの和で表すことができます。

<a id="thm-iwa15-complex-values"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet L関数のBernoulli特殊値）**
> $\psi$ を導手 $f\ge1$ の原始Dirichlet文字とし、$k\ge1$ を整数とする。複素側のDirichlet L関数を解析接続した値は
>
$$
L(1-k,\psi)=-\frac{B_{k,\psi}}{k}
$$
>
> である。ここで一般化Bernoulli数は上の規約を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数を使って剰余類ごとの幾何級数を足すと、Bernoulli多項式の生成関数が現れます。その級数をMellin積分に入れ、原点付近の項を引き出すと、Gamma関数の極と相殺される係数が求まります。

<!-- proof-start -->
### 証明

複素変数を $z$ とします。$t>0$ に対し

$$
h_\psi(t)=\sum_{n\ge1}\psi(n)e^{-nt}
=\frac{\sum_{a=1}^f\psi(a)e^{-at}}{1-e^{-ft}}
$$

です。最後の式は $n=a+jf$（$1\le a\le f,j\ge0$）と分けて幾何級数を足したものです。

[Gamma関数の積分表示](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function) により、$\operatorname{Re}z>1$ で

$$
\Gamma(z)L(z,\psi)=\int_0^\infty t^{z-1}h_\psi(t)\,dt.
$$

[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) による和と積分の交換は、$\sigma=\operatorname{Re}z>1$ として絶対積分の和が $\Gamma(\sigma)\sum_{n\ge1}n^{-\sigma}<\infty$ であることから正当化できます。各項で $u=nt$ と置けば $\Gamma(z)n^{-z}$ が得られます。

$IWA14$ の [Bernoulli多項式の生成関数](../IWA14/index.md#def-iwa14-bernoulli-polynomial) に変数 $-ft$ を入れると

$$
t h_\psi(t)
=\frac1f\sum_{a=1}^f\psi(a)
\frac{(-ft)e^{(a/f)(-ft)}}{e^{-ft}-1}
=\sum_{j\ge0}\frac{(-1)^j B_{j,\psi}}{j!}t^j.
$$

ここで $j=0$ の係数は $B_{0,\psi}=f^{-1}\sum_a\psi(a)$ と置きます。この級数は原点の近傍で複素解析的に収束します。$e^{ft}-1$ は原点に単純零点を持ち、$t$ を掛けた関数は正則だからです。

$h_\psi(t)$ の原点側のLaurent展開を $j=0,\ldots,M$ まで切ると、$0<t\le1$ で

$$
h_\psi(t)=\sum_{j=0}^M\frac{(-1)^j B_{j,\psi}}{j!}t^{j-1}+R_M(t),
\qquad R_M(t)=O(t^M).
$$

この評価は $t$ が十分小さいところでのTaylor展開から従い、残りの閉区間でも定数を増やせば成立します。従ってMellin積分を $t=1$ で分けると

$$
\Gamma(z)L(z,\psi)
=\sum_{j=0}^M\frac{(-1)^j B_{j,\psi}}{j!(z+j-1)}
+\int_0^1 t^{z-1}R_M(t)\,dt
+\int_1^\infty t^{z-1}h_\psi(t)\,dt.
$$

最後の二積分は $\operatorname{Re}z>-M$ で正則です。第一の積分は任意のコンパクト部分で $C t^{\sigma_0+M-1}$（$\sigma_0>-M$）、第二は指数減衰で支配され、$z$ 微分で生じる $\log t$ を掛けても可積分です。$M$ は任意なのでこれで有理型解析接続が得られます。

$M\ge k$ とすれば $z=1-k$ で極を持ち得る項は $j=k$ のみで、留数は $(-1)^k B_{k,\psi}/k!$ です。[Gamma関数の有理型解析接続](../../../解析系/CA/CA11/index.md#thm-ca11-meromorphic-continuation) における留数は $(-1)^{k-1}/(k-1)!$。従って、両辺に $z-(1-k)$ を掛けて極限を取った比は

$$
L(1-k,\psi)
=\frac{(-1)^k B_{k,\psi}/k!}{(-1)^{k-1}/(k-1)!}
=-B_{k,\psi}/k.
$$

分子の留数が零ならこの比も零です。
<!-- proof-end -->

例えば導手1の $k=2$ で $L(-1,1)=-1/12$ を回収できます。ここから先はこの代数的な特殊値を $p$ 進数として扱います。

## 3. 指標を付けた測度の積分

[IWA14の正則化測度](../IWA14/index.md#def-iwa14-regularized-measure) を $\mu_c$ と書きます。$c>1$ は $p$ と互いに素な整数です。$N=p^n$、$0\le a,b<N$、$cb\equiv a\pmod N$ とすると

$$
\mu_{c,n}(a)=\frac{a-cb}{N}+\frac{c-1}{2}.
$$

この重みは整数値で細分と整合することを [正則化分布の有界性](../IWA14/index.md#thm-iwa14-measure) で証明しました。単元上の積分に $\psi$ を掛ければ、有限部分ごとの特殊値が得られます。

<a id="thm-iwa15-twisted-moments"></a>

<!-- formal-statement-start -->
> **定理（指標付き正則化測度の積分公式）**
> $p$ は奇素数、$c>1$ は $p$ と互いに素とする。$\psi=\omega^j$ を導手1または $p$ の原始文字として解釈し、$k\ge1$ を整数とする。このとき
>
$$
\int_{\mathbb Z_p^\times}\psi(x)x^{k-1}\,d\mu_c
=(1-\psi(c)c^k)(1-\psi(p)p^{k-1})\frac{B_{k,\psi}}{k}.
$$
>
> $\mu_c$ は上記の正則化測度であり、$\psi(p)=1$ は導手1の場合、$\psi(p)=0$ は導手 $p$ の場合である。
<!-- formal-statement-end -->

### 証明の見取り図

正則化前の重みを指標付きで足すとBernoulli数の有限和が現れます。$p$ の倍数を除く操作はEuler因子を生み、$c$ による置換はもう一つの因子を生みます。前講の一様誤差評価により、正則化後の有限和を積分に移せます。

<!-- proof-start -->
### 証明

まず $\psi=1$ なら [IWA14の正則化測度の積分公式](../IWA14/index.md#thm-iwa14-moments) が

$$
(1-c^k)(1-p^{k-1})B_k/k
$$

を与えます。$k\ge2$ では $B_k=B_{k,1}$、$k=1$ では $1-p^0=0$ なので $B_1$ の規約の違いに関わらず主張が成立します。

次に $\psi\ne1$ とします。$n\ge1$、$N=p^n$ とし、前講の重み

$$
D_{k,n}(a)=\frac{N^{k-1}}{k}B_k(a/N)
$$

を使います。法 $p$ の代表 $d=1,\ldots,p-1$ を固定し、$m=p^{n-1}$ と置くと $a=d+pj$（$0\le j<m$）です。[Bernoulli多項式の分布公式](../IWA14/index.md#thm-iwa14-multiplication) に $x=d/p$ を代入すれば

$$
\sum_{j=0}^{m-1}D_{k,n}(d+pj)
=\frac{N^{k-1}}k m^{1-k}B_k(d/p)
=\frac{p^{k-1}}k B_k(d/p).
$$

$\psi(d+pj)=\psi(d)$ を掛けて $d$ について足すと

$$
\sum_{\substack{0\le a<N\\p\nmid a}}\psi(a)D_{k,n}(a)
=B_{k,\psi}/k.
$$

$b=c^{-1}a\bmod N$ の代表は単元全体を置換します。また $\psi(a)=\psi(c)\psi(b)$ です。従って正則化した重みの和は

$$
\sum_{p\nmid a}\psi(a)\bigl(D_{k,n}(a)-c^kD_{k,n}(b)\bigr)
=(1-\psi(c)c^k)B_{k,\psi}/k.
$$

[IWA14の積分公式の証明](../IWA14/index.md#thm-iwa14-moments) で、$k$ を固定したとき

$$
D_{k,n}(a)-c^kD_{k,n}(b)-a^{k-1}\mu_{c,n}(a)
\in p^{n-M_k}\mathbb Z_p
$$

を代表によらない整数 $M_k$ で示しました。$\psi(a)$ は単元なので、この評価は $\psi(a)$ を掛けても保たれます。和を取っても同じイデアルに属し、$n\to\infty$ で差が零になります。[分布の積分への一意的延長](../IWA13/index.md#thm-iwa13-extension) を適用すれば有限和は積分へ収束します。$\psi(p)=0$ なのでEuler因子は1となり、結論に一致します。
<!-- proof-end -->

例えば $p=3,c=2,k=1,\psi=\omega$ のとき、$B_{1,\psi}=-1/3$ でした。$1-\psi(2)2=3$ なので積分値は $-1$ です。実際被積分関数 $\psi$ は法3で一定で、単元代表1,2の重みは $-1/2,1/2$。有限和は $-1/2-1/2=-1$ です。

## 4. 補助整数を除いてL関数を作る

$k$ を連続変数に変えるため、$s=1-k$ に注目します。整数 $k\ge1$ における単元の冪は

$$
\omega(x)^{i-1}\langle x\rangle^{k-1}
=\omega(x)^{i-k}x^{k-1}.
$$

従って、左辺の $k-1$ を $-s$ に置き換えれば、右辺に現れる文字を自動的に切り替えながら補間できます。

補助整数 $c$ は法 $p$ で位数 $p-1$ を持ち、$c^{p-1}\not\equiv1\pmod{p^2}$ となるものを選びます。[有限体の乗法群の巡回性](../../NT/NT2/index.md#thm-nt2-finite-subgroup-cyclic) から法 $p$ の生成元 $a$ が存在し、$c=a+tp$ に対して

$$
c^{p-1}\equiv a^{p-1}+(p-1)a^{p-2}tp\pmod{p^2}.
$$

$t\bmod p$ の係数は法 $p$ で非零なので、除くべき $t$ はちょうど一つです。$c>1$ も満たすよう選べます。この選択では $e=\ell(c)$ は単元です。実際 $\omega(c)^{p-1}=1$ で、$g^{(p-1)e}\equiv1+p(p-1)e\bmod p^2$ だからです。

<a id="def-iwa15-kl-function"></a>

<!-- formal-statement-start -->
> **定義（Kubota–Leopoldt p進L関数）**
> $p$ を奇素数、$i\in\{0,\ldots,p-2\}$ とする。
> 整数 $c>1$ は法 $p$ で位数 $p-1$ を持ち、
>
$$
c^{p-1}\not\equiv1\pmod{p^2}
$$
>
> を満たす。$\mu_c$ は [正則化測度](../IWA14/index.md#def-iwa14-regularized-measure)、$\langle x\rangle=x/\omega(x)$ とする。
> $s\in\mathbb Z_p$ に対し
>
$$
H_{i,c}(s)=\int_{\mathbb Z_p^\times}\omega(x)^{i-1}\langle x\rangle^{-s}\,d\mu_c(x),
$$
>
$$
L_p(s,\omega^i)=
-\frac{H_{i,c}(s)}{1-\omega(c)^i\langle c\rangle^{1-s}}
$$
>
> と置く。定義域は $i\ne0$ のとき $\mathbb Z_p$、$i=0$ のとき $\mathbb Z_p\setminus\{1\}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa15-kl-function -->
**定義の確認**。 $p=5,c=2,i=2,s=-1$ を取ります。$2$ の法5での位数は4、$2^4=16\not\equiv1\bmod25$。被積分関数は $\omega(x)\langle x\rangle=x$ なので連続であり、[IWA14の積分公式](../IWA14/index.md#thm-iwa14-moments) に $k=2$ を代入すると

$$
H_{2,2}(-1)=(1-4)(1-5)\frac{1/6}{2}=1.
$$

また $\omega(2)^2\langle2\rangle^2=2^2=4$。分母は $-3\ne0$ なので $L_5(-1,\omega^2)=1/3$ が得られます。被積分関数は全ての単元で整数値、測度は有界なので積分は存在します。
<!-- definition-example-end -->

定義中の積分は、二項級数の一様収束と [p進積分の連続性](../IWA13/index.md#thm-iwa13-extension) から $s$ の連続関数です。分母は $i\ne0$ なら法 $p$ で $1-\omega(c)^i\ne0$ なので単元です。$i=0$ なら分母が零になるのは $\ell(c)(1-s)=0$ のときだけです。指数座標は単射で $e$ は単元なので、これは $s=1$ に限ります。

<a id="thm-iwa15-interpolation"></a>

<!-- formal-statement-start -->
> **定理（Kubota–Leopoldt補間公式）**
> 上の定義で整数 $k\ge1$ を取り、$\psi_k=\omega^{i-k}$ を導手1または $p$ の原始文字とみなす。このとき
>
$$
L_p(1-k,\omega^i)
=(1-\psi_k(p)p^{k-1})L(1-k,\psi_k)
=- (1-\psi_k(p)p^{k-1})\frac{B_{k,\psi_k}}{k}.
$$
>
> 右辺の複素特殊値は同じ代数的数を $p$ 進側で評価するものとする。この連続関数は上記の定義域で一意であり、補助整数 $c$ の選択によらない。
<!-- formal-statement-end -->

### 証明の見取り図

$s=1-k$ において被積分関数を指標付きの整数冪に戻します。[指標付き正則化測度の積分公式](#thm-iwa15-twisted-moments) から現れる $c$ の因子は分母そのものなので消去できます。残った値は稠密な整数点での値となり、連続性で一意性も従います。

<!-- proof-start -->
### 証明

$s=1-k$ のとき

$$
\omega(x)^{i-1}\langle x\rangle^{-s}
=\omega(x)^{i-k}x^{k-1}=\psi_k(x)x^{k-1}.
$$

また分母は $1-\omega(c)^i\langle c\rangle^k=1-\psi_k(c)c^k$ です。[指標付き正則化測度の積分公式](#thm-iwa15-twisted-moments) に $\psi=\psi_k$ を代入すれば

$$
H_{i,c}(1-k)
=(1-\psi_k(c)c^k)(1-\psi_k(p)p^{k-1})B_{k,\psi_k}/k.
$$

$i\ne0$ なら分母は単元、$i=0$ でも $k\ne0$ なので分母は非零です。割り算して負号を掛け、[Dirichlet L関数のBernoulli特殊値](#thm-iwa15-complex-values) を適用すると結論を得ます。

非正整数 $1-k$（$k\ge1$）は $\mathbb Z_p$ で稠密です。任意の法 $p^n$ の代表から十分大きい $p^n$ の倍数を引けば非正整数にできます。任意の $s$ の近似列をこれらの点で選べるため、同じ補間値を持つ連続関数は定義域で一致します。特に条件を満たすどの $c$ を選んでも補間値は同じなので、同じ関数を与えます。
<!-- proof-end -->

例えば $p=5,i=2,k=2$ なら $\psi_2=1$、Euler因子は $1-5=-4$ で、$L_5(-1,\omega^2)=(-4)(-1/12)=1/3$。$k=1$ なら $\psi_1=\omega$、Euler因子は1であり、同じ関数が異なる複素L関数の値を補間します。この文字の切替えが重要です。

## 5. 岩澤代数に戻る：冪級数と極

ここまで得たのは連続関数です。実は [岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism) と同じ環 $\Lambda=\mathbb Z_p[[T]]$ で記述できます。変数は

$$
T=g^{1-s}-1,\qquad g=1+p
$$

に固定します。$1-s$ が走ると $T$ は $p\mathbb Z_p$ 全体を走ります。被積分関数の連続部分は

$$
\langle x\rangle^{-s}
=\langle x\rangle^{-1}(1+T)^{\ell(x)}.
$$

[IWA13の二項式変換](../IWA13/index.md#def-iwa13-amice-transform) と同じ係数積分を使えば、一つの冪級数が得られます。

<a id="thm-iwa15-iwasawa-series"></a>

<!-- formal-statement-start -->
> **定理（p進L関数の岩澤冪級数表示）**
> 奇素数 $p$、上記の補助整数 $c$、$g=1+p$、$e=\ell(c)$ を取る。次の冪級数を定める。
>
$$
A_{i,c}(T)=\sum_{j\ge0}
\left(\int_{\mathbb Z_p^\times}
\omega(x)^{i-1}\langle x\rangle^{-1}
\binom{\ell(x)}j\,d\mu_c(x)\right)T^j.
$$
>
> この級数は $\Lambda$ に属する。
>
$$
F_i(T)=\frac{-A_{i,c}(T)}{1-\omega(c)^i(1+T)^e}
$$
>
> と置くと $L_p(s,\omega^i)=F_i(g^{1-s}-1)$ であり、$F_i$ は $c$ によらない。$i\ne0$ なら $F_i\in\Lambda$。$i=0$ なら $TF_0\in\Lambda^\times$ で、$s=1$ に単純極を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

二項係数の積分は整数値なので、分子は整数係数です。非自明な有限指標では分母の定数項が単元。自明な指標の場合、分母は $T$ に単元を掛けたものです。そのとき分子の定数項が零でないことまで有限層で調べ、極が消えないことを確認します。

<!-- proof-start -->
### 証明

被積分関数は連続な $\mathbb Z_p$ 値関数なので、[p進積分の連続性](../IWA13/index.md#thm-iwa13-extension) により各係数は $\mathbb Z_p$ に入ります。$T\in p\mathbb Z_p$ では二項展開の $j$ 次項が絶対値 $p^{-j}$ 以下で一様収束するので、積分と級数和を交換して $A_{i,c}(T)=H_{i,c}(s)$ を得ます。また $\langle c\rangle^{1-s}=(1+T)^e$ なので分母も一致します。

$i\ne0$ では分母の定数項 $1-\omega(c)^i$ は単元です。一般に整数係数級数 $d_0+d_1T+\cdots$ で $d_0$ が単元なら、逆級数の定数項を $d_0^{-1}$、$n$ 次係数を $-d_0^{-1}\sum_{j=1}^n d_j b_{n-j}$ と順次定めれば逆元が得られます。従って $F_i\in\Lambda$。

$i=0$ では分母は

$$
1-(1+T)^e=-T U(T),\qquad
U(T)=e+\binom e2 T+\binom e3 T^2+\cdots.
$$

$e\in\mathbb Z_p^\times$ より $U\in\Lambda^\times$ です。残る確認は $A_{0,c}(0)\in\mathbb Z_p^\times$ です。

この定数項は $\int_{\mathbb Z_p^\times}x^{-1}\,d\mu_c$ です。法 $p$ での値は第1層で計算できます。$1\le a\le p-1$、$1\le b_a\le p-1$ を $cb_a\equiv a\bmod p$ の代表とし、$q_a=(a-cb_a)/p$ とすると

$$
A_{0,c}(0)\equiv
\sum_{a=1}^{p-1}\frac{q_a}{a}
+\frac{c-1}{2}\sum_{a=1}^{p-1}\frac1a\pmod p.
$$

逆元の集合は元の単元の集合と一致するので、第二の和は法 $p$ で $p(p-1)/2\equiv0$ です。第一の和は積の一次項として計算できます。

$$
\prod_{a=1}^{p-1}\frac{a}{cb_a}
=\prod_{a=1}^{p-1}\left(1+\frac{p q_a}{cb_a}\right)
\equiv1+p\sum_{a=1}^{p-1}\frac{q_a}{a}\pmod{p^2}.
$$

$b_a$ は $1,\ldots,p-1$ の置換なので左辺は $c^{-(p-1)}$。従って

$$
A_{0,c}(0)\equiv\frac{c^{-(p-1)}-1}{p}\not\equiv0\pmod p.
$$

最後の非零性は補助整数の選び方によります。これで $TF_0=A_{0,c}/U$ は単元であり、$T=0$ の極は単純です。

$s=1$ でも極が単純であることを確認します。$u=1-s$ とすると

$$
g^u-1=uV(u),\qquad
V(u)=\sum_{j\ge1}\frac{p^j}{j!}\prod_{h=1}^{j-1}(u-h).
$$

$j=1$ の空積は1です。多項式の各係数の付値は $j-v_p(j!)$ 以上。$j=\sum_{r=0}^{m}a_rp^r$ を $p$ 進法で表すと、階乗中の $p$ の因子を数えて
$$
v_p(j!)=\sum_{r\ge1}\lfloor j/p^r\rfloor
=\frac{j-\sum_{r=0}^m a_r}{p-1}
\le\frac{j-1}{p-1}
$$
となります。真ん中の等号は各桁 $a_r$ の寄与が $a_r(1+p+\cdots+p^{r-1})$ であることから得られます。従って $j-v_p(j!)$ は無限に増え、$j\ge2$ なら2以上です。従って係数ごとに収束する冪級数で、$V(0)\equiv p\bmod p^2$。$T$ は $u=0$ で単純零点を持ち、$TF_0$ の定数項は非零なので $s=1$ の極も単純です。

最後に $c$ の違いは関数の値に影響しないことを [補間公式](#thm-iwa15-interpolation) で示しました。冪級数の一意性も確認します。二つの級数の差を取り、自明成分の場合だけ $T$ を掛けると、整数係数級数 $Q(T)$ が得られます。

$T_n=g^{p^n}-1$ は零でないまま0に収束し、各点で $Q(T_n)=0$ です。もし $Q$ が非零で最低次の非零係数が $q_m$ なら

$$
\frac{Q(T_n)}{T_n^m}
=q_m+\sum_{j>m}q_jT_n^{j-m}\longrightarrow q_m\ne0.
$$

左辺は常に零なので矛盾です。従って $Q=0$ となり、冪級数の表示も一意です。
<!-- proof-end -->

$p=5,c=2,i=0$ の例では $a=1,2,3,4$ に対する $q_a$ は $-1,0,-1,0$ です。従って $A_{0,2}(0)\equiv-1-1/3\equiv2\bmod5$。$e\equiv2\bmod5$ なので $TF_0$ の定数項は法5で $2/2=1$ です。非自明な成分と違い、$F_0$ を整数係数冪級数そのものとみなすことはできません。

## 6. 偶奇とEuler因子による自明零点

指標が $-1$ を $1$ に送るとき偶指標、$-1$ に送るとき奇指標といいます。[Teichmüller指標の偶奇成分](../IWA8/index.md#prop-iwa8-parity-eigenspaces) に従えば $\omega^i(-1)=(-1)^i$ です。補間公式には、この偶奇からくる零とEuler因子による零という異なる仕組みがあります。

<a id="prop-iwa15-parity"></a>

<!-- formal-statement-start -->
> **命題（p進L関数の偶奇消失）**
> 奇素数 $p$ と $0\le i\le p-2$ に対し、$i$ が奇数なら $L_p(s,\omega^i)=0$ が全ての $s\in\mathbb Z_p$ で成立し、$F_i=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一般化Bernoulli数を $a\mapsto f-a$ で並べ替えると、指標と次数の符号が掛け合わされます。奇指標に対応する枝ではその符号が $-1$ になり、全補間点が零です。

<!-- proof-start -->
### 証明

[Bernoulli多項式の定義](../IWA14/index.md#def-iwa14-bernoulli-polynomial) で変数を $-t$ に置き換えると

$$
\frac{(-t)e^{-xt}}{e^{-t}-1}
=\frac{te^{(1-x)t}}{e^t-1}
$$

なので $B_k(1-x)=(-1)^kB_k(x)$ です。

$\psi_k\ne1$ なら導手 $p$ で、$a=p$ の項は零です。$a\mapsto p-a$ による置換で

$$
B_{k,\psi_k}
=\psi_k(-1)(-1)^k B_{k,\psi_k}
=(-1)^iB_{k,\psi_k}.
$$

$i$ が奇数なら $2B_{k,\psi_k}=0$、従って零です。$\psi_k=1$ の場合は $k\equiv i\bmod(p-1)$ なので $k$ は奇数。$k>1$ なら $B_k(1)=B_k(0)$ と反射式から $B_k=0$。$k=1$ ならEuler因子 $1-p^0=0$ なので積が零です。

[補間公式](#thm-iwa15-interpolation) により全ての補間点で値が零であり、稠密性と連続性から全域で零となります。[冪級数表示の一意性](#thm-iwa15-iwasawa-series) より $F_i=0$ です。
<!-- proof-end -->

例えば $p=5,i=1,k=3$ では $\psi_3=\omega^2$ は偶指標ですが $k$ は奇数なのでBernoulli特殊値が零です。$k=1$ では $\psi_1=1$、$L(0,1)=-1/2$ は非零でもEuler因子が零になります。いずれも奇数番号の枝は恒等的に零です。

一般のDirichlet文字 $\chi$ では、$\chi\omega^{-k}$ は導手が $p$ 以外の素因数を持つことがあります。この場合にも同じ正規化の補間公式

$$
L_p(1-k,\chi)
=(1-(\chi\omega^{-k})(p)p^{k-1})L(1-k,\chi\omega^{-k})
$$

が成立します。ここでは一般形を外部定理として用います（Sharifi, Iwasawa Theory, Proposition 5.3.15）。一般形では各積文字をその原始文字として取り、代数的値は固定した $p$ 進埋め込みで評価します。奇素数、有限位数のDirichlet文字、整数 $k\ge1$ が仮定です。非自明な偶指標では全域で正則、自明指標だけは $s=1$ の極を除きます。上で証明したのは導手1または $p$ の場合で、一般形には $p$ と互いに素な法を含む剰余類空間上で測度を構成する追加の議論が必要です。

例えば $p=7$ とし、導手3の奇指標 $\eta$ を $\eta(1)=1,\eta(2)=-1$ と取ります。$\chi=\eta\omega$ は導手21の偶指標です。$k=1$ で $\chi\omega^{-1}=\eta$ となり、$\eta(7)=1$ です。従って

$$
L_p(0,\chi)=(1-\eta(7))L(0,\eta)=0.
$$

[一般化Bernoulli数](#def-iwa15-generalized-bernoulli) に $f=3,k=1$ を代入すると $B_{1,\eta}=-1/3$、[特殊値公式](#thm-iwa15-complex-values) から複素側では $L(0,\eta)=1/3$ です。

複素側の値そのものではなくEuler因子が消える、このような現象を自明零点と呼びます。この例では $p$ が $\eta$ の導手を割らないことが重要です。

導手が1または $p$ の非自明偶成分ではこの機構による零点はありません。実際 $\psi_k(p)=0$ なら因子は1です。$\psi_k=1$ でも $k\ge2$ なら因子は非零です。

残る $k=1,\psi_k=1$ の場合は $i=1$ で奇成分となります。

## 7. 演習と詳細解答

### Level A

<a id="ex-iwa15-a1"></a>

**A1. 有限部分と指数座標**
- Level: A
- ID: IWA15-A1

$p=3,g=4$ とする。$x=2$ を法9で $\omega(x)g^{\ell(x)}$ の形に分解せよ。$\ell(x)\bmod3$ を求めよ。

<!-- solution-start -->
**詳細解答。** [単元群の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting) により有限部分は $p-1=2$ 乗根で、法3で2と一致するものです。$-1$ は条件を満たし、法9では8。よって $2/(-1)\equiv7\bmod9$。$4^0=1,4^1=4,4^2=16\equiv7$ なので [指数座標](../IWA2/index.md#prop-iwa2-odd-exponent-coordinates) は $\ell(2)\equiv2\bmod3$。積 $(-1)4^2=-16\equiv2\bmod9$ で確かめられます。
<!-- solution-end -->

<a id="ex-iwa15-a2"></a>

**A2. 一般化Bernoulli数と特殊値**
- Level: A
- ID: IWA15-A2

$p=3,\psi=\omega$ とする。$B_{2,\psi}$ を求め、$L(-1,\psi)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [一般化Bernoulli数](#def-iwa15-generalized-bernoulli) では $f=3$、$\psi(1)=1,\psi(2)=-1,\psi(3)=0$ です。$B_2(x)=x^2-x+1/6$ なので $B_2(1/3)=-1/18$、$B_2(2/3)=4/9-2/3+1/6=-1/18$。従って $B_{2,\psi}=3(-1/18+1/18)=0$。[特殊値公式](#thm-iwa15-complex-values) から $L(-1,\psi)=-B_{2,\psi}/2=0$。
<!-- solution-end -->

<a id="ex-iwa15-a3"></a>

**A3. 補間式の符号**
- Level: A
- ID: IWA15-A3

$p=5,i=2,k=6$ とする。$B_6=1/42$ を用いて $L_5(-5,\omega^2)$ を有理数として求めよ。

<!-- solution-start -->
**詳細解答。** $i-k=-4$ は $p-1=4$ の倍数なので $\psi_6=1$、$\psi_6(5)=1$。$s=1-6=-5$。[補間公式](#thm-iwa15-interpolation) に代入すると
$$
L_5(-5,\omega^2)=-(1-5^5)\frac{1}{42\cdot6}
=\frac{3124}{252}=\frac{781}{63}.
$$
分母は5と互いに素です。Euler因子が負で、特殊値にも負号があるため、通常の有理数表示では正の値になります。
<!-- solution-end -->

<a id="ex-iwa15-a4"></a>

**A4. どの文字が現れるか**
- Level: A
- ID: IWA15-A4

$p=7,i=4$ で $k=1,2,4,10$ に対応する $\psi_k$、導手、Euler因子を求めよ。

<!-- solution-start -->
**詳細解答。** [補間公式](#thm-iwa15-interpolation) では指数 $i-k$ を法6で読みます。$k=1$ なら3、$k=2$ なら2で、導手7の非自明文字なのでEuler因子はどちらも1。$k=4,10$ では指数はそれぞれ0と $-6$、従って導手1で $\psi_k(7)=1$。因子は $1-7^3=-342$ と $1-7^9$ です。法7の主文字を零拡張したものと導手1の文字を取り違えると後二者の因子を失います。
<!-- solution-end -->

### Level B

<a id="ex-iwa15-b1"></a>

**B1. 文字付き積分を有限和から計算する**
- Level: B
- ID: IWA15-B1

$p=5,c=2,\psi=\omega^2,k=1$ とする。第1層の有限和と [指標付き積分公式](#thm-iwa15-twisted-moments) の両方で積分を求めよ。

<!-- solution-start -->
**詳細解答。** $\psi(1),\psi(2),\psi(3),\psi(4)$ は $1,-1,-1,1$。重みは [正則化測度](../IWA14/index.md#def-iwa14-regularized-measure) から $-1/2,1/2,-1/2,1/2$ なので積分は $-1/2-1/2+1/2+1/2=0$。被積分関数が法5で一定なのでこの層で厳密です。一般化Bernoulli数の和は
$$
B_{1,\psi}=(1-2-3+4)/5-(1-1-1+1)/2=0.
$$
$\psi(5)=0$、$1-\psi(2)2=3$ なので積分公式でも $3\cdot1\cdot0=0$。偶指標と奇次数の組で零になることも確認できました。
<!-- solution-end -->

<a id="ex-iwa15-b2"></a>

**B2. 分母を冪級数として逆にする**
- Level: B
- ID: IWA15-B2

$p=5,c=2,i=2$ とし、$e=\ell(2)$ とする。$D(T)=1-\omega(2)^2(1+T)^e$ の逆級数の定数項と一次係数を求め、法5でも評価せよ。

<!-- solution-start -->
**詳細解答。** $\omega(2)$ の位数は4なので二乗は $-1$（二乗して1となる元のうち1ではない）。従って $D(T)=2+eT+\cdots$。逆級数との積が1であることから、定数項と一次係数を比較します。

$$
2b_0=1,\qquad 2b_1+eb_0=0.
$$

よって

$$
b_0=1/2,\qquad b_1=-e/4.
$$

第1節の [指数座標](../IWA2/index.md#prop-iwa2-odd-exponent-coordinates) の計算では $e\equiv2\bmod5$ なので

$$
b_0\equiv3,\qquad b_1\equiv-2\cdot4\equiv2\pmod5.
$$

定数項が単元だから [冪級数表示](#thm-iwa15-iwasawa-series) の除算が整数係数で可能です。
<!-- solution-end -->

<a id="ex-iwa15-b3"></a>

**B3. 極の分子が消えないことを直接確認する**
- Level: B
- ID: IWA15-B3

$p=3,c=2,i=0$ とする。$A_{0,2}(0)\bmod3$ と $TF_0$ の定数項の法3での値を求めよ。

<!-- solution-start -->
**詳細解答。** $2^2=4\not\equiv1\bmod9$ なので補助整数の条件を満たします。$A_{0,2}(0)$ は $x^{-1}$ の積分で、法3では単元代表1,2で計算できます。[正則化測度](../IWA14/index.md#def-iwa14-regularized-measure) の重みは $-1/2,1/2$ なので
$$
A_{0,2}(0)\equiv-1/2+(1/2)(1/2)=-1/4\equiv2\pmod3.
$$
A1で求めた $e=\ell(2)\equiv2\bmod3$ を使います。[冪級数表示](#thm-iwa15-iwasawa-series) の $TF_0=A_{0,2}/U$ では $U(0)=e$ なので定数項は $2/2=1\bmod3$。分母の $T$ は相殺されず、単純極となります。
<!-- solution-end -->

<a id="ex-iwa15-b4"></a>

**B4. Euler因子による零と指標の偶奇**
- Level: B
- ID: IWA15-B4

$p=13$、導手3の奇指標 $\eta$ を $\eta(1)=1,\eta(2)=-1$ とし、$\chi=\eta\omega$ とする。一般形のKubota–Leopoldt補間公式を用いて $L_p(0,\chi)$ を求めよ。$\chi$ の偶奇と、複素特殊値が零でないことも確認せよ。

<!-- solution-start -->
**詳細解答。** $\eta(-1)=-1$、$\omega(-1)=-1$ なので $\chi(-1)=1$。法3と法13の非自明な指標の積であり、導手は39です。

$k=1$ で $\chi\omega^{-1}=\eta$。$13\equiv1\bmod3$ から $\eta(13)=1$。第6節で引用した一般補間公式の因子は $1-\eta(13)13^0=0$ です。

[一般化Bernoulli数](#def-iwa15-generalized-bernoulli) の有限和を法3で計算すると $B_{1,\eta}=-1/3$ となります。[Dirichlet L関数のBernoulli特殊値](#thm-iwa15-complex-values) を $k=1$ に適用して次の値を得ます。
$$
B_{1,\eta}=(1/3-1/2)-(2/3-1/2)=-1/3,
\qquad L(0,\eta)=1/3.
$$
従って $L_p(0,\chi)=0$ ですが複素側の値は非零です。奇成分の恒等的な消失ではなくEuler因子による零です。
<!-- solution-end -->

### Level C

<a id="ex-iwa15-c1"></a>

**C1. 同じ枝の二つの特殊値と補助整数の独立性**
- Level: C
- ID: IWA15-C1

$p=5,i=2$ とする。

1. $c=2$ と $c=3$ がともに補助整数の条件を満たすことを確認せよ。
2. $k=2$ と $k=6$ の指標付き積分を、$c$ の因子を残した形で求め、両方の $c$ について消去後の値が同じことを確認せよ。
3. 得られた二つの補間値は法5で等しいことを有理数の計算と冪級数表示からそれぞれ説明せよ。
4. この二点で値が一致するだけでは $c$ の独立性を証明できない。全ての補間点から一意性を導く理由を述べよ。

<!-- solution-start -->
**詳細解答。** 1. $2^2=4\not\equiv1\bmod5$、$3^2=9\equiv4\bmod5$ でともに位数4。$2^4=16$、$3^4=81\equiv6\bmod25$ なので、どちらも25を法として1ではありません。

2. $i-k=0,-4$ なので $\psi_k=1$。$C_k=(1-5^{k-1})B_k/k$ とすると
$$
C_2=-1/3,\qquad C_6=(1-3125)/(42\cdot6)=-781/63.
$$
[指標付き正則化測度の積分公式](#thm-iwa15-twisted-moments) で $H_{2,c}(1-k)=(1-c^k)C_k$ です。$c=2$ の場合 $k=2$ では1、$k=6$ では $(-63)(-781/63)=781$。$c=3$ ではそれぞれ $8/3$、$728\cdot781/63$。分母は $1-c^2$ と $1-c^6$ でいずれも法5で非零です。[L関数の定義](#def-iwa15-kl-function) の負号を含めて割ると、どちらの $c$ でも $L_5(-1,\omega^2)=1/3$、$L_5(-5,\omega^2)=781/63$。

3. 差は
$$
781/63-1/3=(781-21)/63=760/63
$$
で5の倍数です（$v_5=1$）。一方 [岩澤冪級数表示](#thm-iwa15-iwasawa-series) で $F_2\in\mathbb Z_5[[T]]$。二つの点は $T=6^2-1=35$ と $T=6^6-1=46655$ でどちらも $5\mathbb Z_5$ に属します。定数項以外の全項が5の倍数なので二つの評価値は法5で等しくなります。

4. 二点だけなら、その二点を零点に持つ非零多項式を関数に加えても同じ値を取ります。[補間公式](#thm-iwa15-interpolation) は任意の整数 $k\ge1$ で成立し、$1-k$ の集合は $\mathbb Z_5$ で稠密です。二つの $c$ に対応する関数の差はこの集合で零、全域で連続なので任意の点を整数列で近似すれば差は零。これが補助整数の独立性を保証します。
<!-- solution-end -->

## 8. 到達点と次講

これまで類群から加群と特徴イデアルを作り、今講では測度から $L_p$ と岩澤冪級数を作りました。整数特殊値の合同、指標の切替え、補助因子の除去を経て、非自明偶成分には整数係数級数が現れました。

次講 IWA16「円分岩澤主予想：正確な定式化」では、類群側の指標成分とどの冪級数を比較するのか、双対・指標の捻り・変数規約に注意して定式化します。今講の正規化 $T=g^{1-s}-1$ を明示的に使い、形式的に似た式を無条件に等置しないことが大切です。

### 参考文献

- Romyar Sharifi, [Iwasawa Theory, Chapter 5](https://math.ucla.edu/~sharifi/notes/iwasawa-ch05.html), Definition 5.3.13, Proposition 5.3.15, §5.4（正規化・一般の導手・冪級数）。
- Lawrence C. Washington, [Introduction to Cyclotomic Fields](https://link.springer.com/book/10.1007/978-1-4612-1934-7), 2nd ed., Chapter 5（p進L関数）。
