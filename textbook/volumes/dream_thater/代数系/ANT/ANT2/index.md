# ANT2 Dirichlet級数・Euler積の一般論

[ANT1のAbelの部分和公式](../ANT1/index.md#thm-ant1-abel)では、算術関数の総和を重み付き和に変換しました。重みを $n^{-s}$ にして $n$ を無限まで動かすと、整数の約数構造を複素関数として調べられます。しかし無限級数では、有限和で許された項の並べ替えや積の展開が無条件には通用しません。この章の問いは「**どの半平面なら、整数の畳み込みを解析的な積に変えてよいか**」です。

[NT4で学んだDirichlet畳み込み](../../NT/NT4/index.md#def-nt4-dirichlet)と[乗法的算術関数](../../NT/NT4/index.md#def-nt4-multiplicative)を用意して、まず絶対収束の範囲を確保します。そのうえで局所一様収束、Euler積、逆元の順に進みます。[CA12で扱ったRiemann ζ関数のEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)は、得られた一般論の具体例になります。

以下、$n\ge1$、$s=\sigma+it\in\mathbb C$、$\sigma=\operatorname{Re}s$ とし、$n^{-s}=\exp(-s\log n)$（$\log n$ は実数の自然対数）です。すべての無限和・無限積は、特記しない限り収束を確認した領域で扱います。

## 1. 算術関数を複素変数の関数へ移す

[NT8の実変数Dirichlet級数](../../NT/NT8/index.md#def-nt8-dirichlet-series)を複素変数へ広げます。収束する実数だけを扱う段階から、半平面上の正則関数を考える段階への拡張です。

[算術関数](../../NT/NT4/index.md#def-nt4-arithmetic-function) $a:\mathbb N\to\mathbb C$ の値を、整数の大きさに応じて弱めて足すことを考えます。固定された $n$ に対して $n^{-s}$ は正則ですが、項別に正則でも無限和が正則になるとは限りません。そこで収束域を定義します。

<a id="def-ant2-complex-dirichlet-series"></a>

<!-- formal-statement-start -->
> **定義（複素変数のDirichlet級数）**  
> 算術関数 $a:\mathbb N\to\mathbb C$ に対し、複素数 $s$ で級数が収束する場合、

$$
F_a(s)=\sum_{n=1}^{\infty}\frac{a(n)}{n^s}
$$

> を $a$ のDirichlet級数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant2-complex-dirichlet-series -->
### 例：二つの項しかない級数

**定義の確認**：収束領域を直接計算し、Dirichlet級数としての条件を検査します。

$a(1)=1$、$a(2)=3$、$n\ge3$ で $a(n)=0$ とします。このとき $F_a(s)=1+3\cdot2^{-s}$ はすべての $s\in\mathbb C$ で定義されます。係数を無限個指定していても、収束の難しさが現れない場合があると分かります。
<!-- definition-example-end -->

絶対収束の境界は、虚部ではなく実部だけで決まります。$\lvert n^{-s}\rvert=n^{-\sigma}$ だからです。

<a id="def-ant2-absolute-abscissa"></a>

<!-- formal-statement-start -->
> **定義（絶対収束横座標）**  
> 算術関数 $a:\mathbb N\to\mathbb C$ について

$$
A_a(u)=\sum_{n\ge1}\frac{|a(n)|}{n^u}
\quad (u\in\mathbb R),\qquad
\sigma_a=\inf\{u\in\mathbb R:A_a(u)<\infty\}
$$

> とする。$\sigma_a$ を絶対収束横座標という。集合が空なら $\sigma_a=+\infty$、すべての実数なら $\sigma_a=-\infty$ とする。$\sigma_a$ が有限のとき $\operatorname{Re}s>\sigma_a$ を絶対収束半平面という。境界線上の収束は定義からは決まらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant2-absolute-abscissa -->
### 例：係数が $n^2$ なら境界は $3$

**定義の確認**：絶対値級数の収束する実部と、その下限を求めます。

$a(n)=n^2$ とすると $A_a(u)=\sum n^{2-u}$ です。積分比較で $\sum n^{-v}$ は $v>1$ のときだけ収束するので、$A_a(u)<\infty$ と $u>3$ は同値です。従って $\sigma_a=3$、境界 $u=3$ では調和級数が発散します。
<!-- definition-example-end -->

<a id="thm-ant2-holomorphic-halfplane"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet級数の絶対収束半平面での正則性）**  
> $a:\mathbb N\to\mathbb C$ の絶対収束横座標 $\sigma_a$ が有限とする。このとき $F_a(s)$ は $\operatorname{Re}s>\sigma_a$ で絶対収束し、各コンパクト集合上一様に収束する正則関数である。任意の整数 $k\ge0$ について

$$
F_a^{(k)}(s)
=\sum_{n\ge1}\frac{a(n)(-\log n)^k}{n^s}
\qquad(\operatorname{Re}s>\sigma_a)
$$

> が成立し、右辺も局所一様絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクト集合の実部の最小値より少し左でも絶対収束する点を選びます。$\log n$ の冪は $n$ の任意の正の冪より遅く増えるため、微分に伴う因子もこの余裕で吸収できます。

<!-- proof-start -->
### 証明

$K$ を $\operatorname{Re}s>\sigma_a$ の任意のコンパクト集合とし、$m=\min_{s\in K}\operatorname{Re}s>\sigma_a$ とします。$\sigma_a<u<m$ を選べば、定義と絶対収束集合が右へ閉じていることから $A_a(u)<\infty$ です。$s\in K$ では

$$
\left|\frac{a(n)}{n^s}\right|
\le\frac{|a(n)|}{n^m}
\le\frac{|a(n)|}{n^u}.
$$

最後の級数は収束するのでWeierstrassの優級数判定法で一様絶対収束します。

さらに $0<\delta<m-u$ を固定します。$k\ge1$ に対して $\log^k n/n^\delta$ は $n\ge1$ で有界です（$y=\log n\ge0$ とすると $y^k e^{-\delta y}$ は最大値を持ちます）。従って定数 $C_{k,\delta}$ が存在して

$$
\left|\frac{a(n)(\log n)^k}{n^s}\right|
\le C_{k,\delta}\frac{|a(n)|}{n^{m-\delta}}
\le C_{k,\delta}\frac{|a(n)|}{n^u}.
$$

微分級数も $K$ 上一様絶対収束します。各項 $\exp(-s\log n)$ は全平面で正則で、微分は $(-\log n)^k n^{-s}$ です。[正則関数列の局所一様極限定理](../../../解析系/CA/CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)を部分和とその導関数列へ適用して、正則性と項別微分の式を得ます。$K$ は任意なので半平面全体で成立します。
<!-- proof-end -->

この結果が保証するのは**絶対収束半平面内**での計算です。例えば $a(n)=(-1)^{n-1}$ の級数は、後述のように $0<\operatorname{Re}s\le1$ でも条件収束しますが、上の定理の絶対収束による保証とは別です。

## 2. 畳み込みを級数の積に翻訳する

有限の多項式を掛けると係数が集められます。Dirichlet級数の場合は、$mk=n$ の積を同じ $n^{-s}$ にまとめると[Dirichlet畳み込み](../../NT/NT4/index.md#def-nt4-dirichlet)が出ます。ただし二重和の並べ替えには絶対収束が必要です。

<a id="thm-ant2-convolution-product"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet級数の積と畳み込み）**  
> $a,b:\mathbb N\to\mathbb C$、$\sigma=\operatorname{Re}s$ とし、

$$
\sum_{n\ge1}|a(n)|n^{-\sigma}<\infty,\qquad
\sum_{n\ge1}|b(n)|n^{-\sigma}<\infty
$$

> を仮定する。$c=a*b$ をDirichlet畳み込みとすると、$c$ の級数も $s$ で絶対収束し、

$$
F_a(s)F_b(s)=F_{a*b}(s)
=\sum_{n\ge1}\frac1{n^s}\sum_{d\mid n}a(d)b(n/d)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

「$m$ を先に足す」か「$mk=n$ を先に固定する」かは、絶対値の二重和が有限なら入れ替えられます。先にその数値を計算します。

<!-- proof-start -->
### 証明

非負項の二重級数について順序を変えると

$$
\begin{aligned}
\sum_{m,k\ge1}\left|\frac{a(m)b(k)}{(mk)^s}\right|
&=\sum_{m,k\ge1}\frac{|a(m)|}{m^\sigma}
                         \frac{|b(k)|}{k^\sigma}\\
&=\left(\sum_{m\ge1}\frac{|a(m)|}{m^\sigma}\right)
  \left(\sum_{k\ge1}\frac{|b(k)|}{k^\sigma}\right)<\infty.
\end{aligned}
$$

したがって複素数項の二重級数も絶対収束し、$mk=n$ と括り直せます。このとき $m$ はちょうど $n$ の正の約数を走り、$k=n/m$ です。ゆえに

$$
\begin{aligned}
F_a(s)F_b(s)
&=\sum_{m,k\ge1}\frac{a(m)b(k)}{(mk)^s}\\
&=\sum_{n\ge1}\frac1{n^s}\sum_{m\mid n}a(m)b(n/m).
\end{aligned}
$$

さらに三角不等式で

$$
\sum_{n\ge1}\frac{|(a*b)(n)|}{n^\sigma}
\le\sum_{m,k\ge1}\frac{|a(m)b(k)|}{(mk)^\sigma}<\infty
$$

だから、結論の級数自体も絶対収束します。
<!-- proof-end -->

例えば[約数個数関数の畳み込み表示](../../NT/NT4/index.md#prop-nt4-divisor-convolutions) $\tau=\mathbf1*\mathbf1$ を使うと、$\sigma>1$ で

$$
\sum_{n\ge1}\frac{\tau(n)}{n^s}
=\left(\sum_{n\ge1}\frac1{n^s}\right)^2
=\zeta(s)^2.
$$

この等号は形式的な記号遊びではありません。左右を結ぶ二重級数の絶対収束を、上の定理が保証しています。

## 3. 乗法性からEuler積へ

整数は素数冪の積に一意分解できます。[乗法的関数](../../NT/NT4/index.md#def-nt4-multiplicative)の係数であれば、その分解とともに値も積へ分かれます。素数ごとの局所級数を作って、有限個の素数から無限個へ進む道筋を確かめます。

<a id="thm-ant2-euler-product"></a>

<!-- formal-statement-start -->
> **定理（乗法的係数のEuler積）**  
> $a:\mathbb N\to\mathbb C$ は $a(1)=1$ を満たす乗法的関数とし、$\sigma=\operatorname{Re}s$ で $\sum_{n\ge1}|a(n)|n^{-\sigma}<\infty$ とする。各素数 $p$ に対して局所級数を

$$
E_p(s)=\sum_{j=0}^{\infty}\frac{a(p^j)}{p^{js}}
$$

> と置く。このとき各局所級数は絶対収束し、素数を小さい順に有限個ずつ増やす極限として

$$
F_a(s)=\prod_p E_p(s).
$$

> 有限素数集合を増やす任意の順序でも同じ極限を得る。なお一般の乗法的係数では、この等式だけから $F_a(s)\ne0$ は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

有限積の各項を展開すると、素因数が指定した有限集合に限られる整数の和になります。残りの整数の寄与は、絶対収束する級数の尾部で抑えます。

<!-- proof-start -->
### 証明

$P$ を有限な素数集合とします。$a(1)=1$ と乗法性より、互いに異なる $p\in P$ について

$$
\prod_{p\in P}\left(\sum_{j\ge0}\frac{a(p^j)}{p^{js}}\right)
=\sum_{\substack{n\ge1\\p\mid n\Rightarrow p\in P}}
\frac{a(n)}{n^s}.
$$

右辺の整数 $n$ は有限集合 $P$ の素数冪だけから一意に作られます。有限個の絶対収束級数の積は展開できるので、この式は正当です。$P_y=\{p:p\le y\}$ とします。$n\le y$ のすべての素因数は $P_y$ に含まれるため

$$
\left|F_a(s)-\prod_{p\le y}E_p(s)\right|
\le\sum_{n>y}\frac{|a(n)|}{n^\sigma}\longrightarrow0.
$$

収束は仮定した絶対収束級数の尾部によります。一般の有限集合 $P$ についても、任意の固定した整数の素因数がいずれすべて $P$ に入るよう増やせば、同じ尾部評価で結論を得ます。
<!-- proof-end -->

### 例：有限Euler積を直接展開する

$a(n)=1$ とし、素数集合を $\{2,3\}$ に絞ると

$$
\left(\sum_{j\ge0}2^{-js}\right)
\left(\sum_{k\ge0}3^{-ks}\right)
=\sum_{j,k\ge0}(2^j3^k)^{-s}.
$$

$\sigma>1$ なら幾何級数は絶対収束します。右辺は $1,2,3,4,6,8,9,\ldots$ のうち素因数が $2,3$ に限られるものだけを数えます。$5^{-s}$ はまだ入らず、素数集合を広げると初めて現れます。
### Euler積があっても零点はあり得る

$a(1)=1$、$a(2)=-2$、$n\ge3$ では $a(n)=0$ と置きます。この関数は乗法的です。実際、互いに素な $m,n>1$ の両方で非零になることはなく、片方が $1$ なら積の条件は自動的に成立します。級数は有限和で

$$
F_a(s)=1-2^{1-s}=E_2(s)
$$

となります。$s=1$ で $F_a(1)=0$ です。他の素数の局所因子は $1$ です。従って「Euler積が存在する」という条件だけで「非零」と結論するのは誤りです。

ただし完全乗法的な係数なら事情がよくなります。$a(p^j)=a(p)^j$ なので、絶対収束域では $|a(p)|p^{-\sigma}<1$ が必要で、

$$
E_p(s)=\frac1{1-a(p)p^{-s}},\qquad
F_a(s)=\prod_p(1-a(p)p^{-s})^{-1}.
$$

分母は零でなく、また $\sum_p |a(p)|p^{-\sigma}<\infty$ です。この総和は絶対収束する全整数の和の部分和で抑えられます。[無限積の局所一様収束判定](../../../解析系/CA/CA10/index.md#thm-ca10-infinite-product-criterion)の非零性条件（各因子が非零で、ずれの和が収束）により、完全乗法的係数の場合は絶対収束域で $F_a(s)\ne0$ となります。

とくに $a(n)=1$ から[ζのEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)を回収します。

## 4. Dirichlet逆元はいつ解析的に割り算できるか

[NT4のDirichlet逆元の存在条件](../../NT/NT4/index.md#thm-nt4-inverse)は係数列の代数的な逆を与えます。しかし係数列の逆が存在しても、そのDirichlet級数が同じ点で収束するとは限りません。少なくとも**十分右側の半平面**なら、逆級数も絶対収束することを示します。

<a id="thm-ant2-inverse-series"></a>

<!-- formal-statement-start -->
> **定理（逆Dirichlet級数の絶対収束）**  
> 算術関数 $a$ が $a(1)\ne0$ を満たし、ある実数 $u_0$ で

$$
\sum_{n\ge1}|a(n)|n^{-u_0}<\infty
$$

> とする。[Dirichlet逆元](../../NT/NT4/index.md#thm-nt4-inverse)を $b=a^{*-1}$ と書く。このときある実数 $u_1\ge u_0$ が存在し、$\operatorname{Re}s\ge u_1$ で $\sum |b(n)|n^{-\operatorname{Re}s}<\infty$ かつ

$$
F_b(s)=\frac1{F_a(s)},\qquad F_a(s)\ne0
$$

> が成り立つ。最初に $F_a$ が絶対収束した半平面全域で逆級数が収束する、とは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$a$ を「定数項と残り」に分けます。残りの係数の重み付き絶対値和は、実部を十分大きくすると $1$ より小さくできます。そこで畳み込み版の等比級数を作ります。

<!-- proof-start -->
### 証明

[畳み込み単位元](../../NT/NT4/index.md#def-nt4-epsilon)を $\varepsilon$ として

$$
c=\frac{a}{a(1)}-\varepsilon,\qquad
c(1)=0,\qquad a=a(1)(\varepsilon+c)
$$

とします。$u\ge u_0$ に対して

$$
q(u)=\sum_{n\ge2}\frac{|a(n)|}{|a(1)|n^u}
$$

は有限です。$u\to\infty$ では各 $n\ge2$ の項が零へ収束し、$u_0$ での収束級数が全項を上から抑えるので、尾部を固定してから有限個の項を小さくすれば $q(u)\to0$ と分かります。従って $q(u_1)<1$ となる $u_1\ge u_0$ を選べます。

重み付き絶対和のノルムを $\|f\|_u=\sum_{n\ge1}|f(n)|n^{-u}$ と書きます。[畳み込みと級数積](#thm-ant2-convolution-product)の絶対値評価を係数へ適用すると

$$
\|f*g\|_u\le\|f\|_u\|g\|_u,\qquad
\|c^{*k}\|_{u_1}\le q(u_1)^k.
$$

$k=0$ では $c^{*0}=\varepsilon$ とします。ここで

$$
b=\frac1{a(1)}\sum_{k=0}^{\infty}(-c)^{*k}
$$

を係数ごとに定めます。$c(1)=0$ なので、$c^{*k}(n)$ は $k>\lfloor\log_2n\rfloor$ で零です。実際、非零の積の各因子は $2$ 以上だから $2^k\le n$ が必要です。従って各係数の和は有限です。一方、重み付き絶対和は

$$
\|b\|_{u_1}
\le\frac1{|a(1)|}\sum_{k\ge0}\|c^{*k}\|_{u_1}
\le\frac1{|a(1)|(1-q(u_1))}<\infty.
$$

畳み込みを有限部分和に施すと

$$
(\varepsilon+c)*\sum_{k=0}^{M}(-c)^{*k}
=\varepsilon-(-c)^{*(M+1)}.
$$

右辺の残差のノルムは $q(u_1)^{M+1}\to0$ です。よって $a*b=\varepsilon$ となり、[逆元の一意性](../../NT/NT4/index.md#thm-nt4-inverse)からこれは $a^{*-1}$ に一致します。最後に $u\ge u_1$ では両級数が絶対収束し、[畳み込みと級数の積](#thm-ant2-convolution-product)により

$$
F_a(s)F_b(s)=F_{\varepsilon}(s)=1.
$$

したがって $F_a(s)\ne0$、$F_b(s)=1/F_a(s)$ です。
<!-- proof-end -->

### 例：形式的逆元と収束半平面は異なる

$a(1)=1$、$a(2)=-2$、それ以外零の先ほどの関数では

$$
F_a(s)=1-2^{1-s}.
$$

畳み込み逆元 $b$ は $b(2^j)=2^j$（$j\ge0$）、それ以外零です。実際 $a*b(2^j)=b(2^j)-2b(2^{j-1})=0$（$j\ge1$）で、$n=1$ では $1$ です。$n$ が $2$ の冪でなければ $b(n)=0$ で、$n$ の約数 $d=1,2$ に対する二項とも零になります。従って $a*b=\varepsilon$ の等式はすべての正整数で確認できます。その級数は

$
F_b(s)=\sum_{j\ge0}2^{j(1-s)}
=\frac1{1-2^{1-s}}
\qquad(\operatorname{Re}s>1).
$$

元の $F_a$ は全平面で絶対収束するのに、逆級数は $\operatorname{Re}s>1$ でしか絶対収束しません。$s=1$ は元の関数の零点です。**代数的逆元の存在**と**ある点で解析的に逆数を取れること**を区別できました。

## 5. ζを一般論の特例として読む

[CA12のζ関数の定義](../../../解析系/CA/CA12/index.md#def-ca12-riemann-zeta)では $\zeta(s)=\sum_{n\ge1}n^{-s}$（$\sigma>1$）でした。$\mathbf1(n)=1$ と置くと、[約数関数の畳み込み表示](../../NT/NT4/index.md#prop-nt4-divisor-convolutions)と[NT5のMöbius反転](../../NT/NT5/index.md#thm-nt5-mobius-unit)によって

$$
\begin{aligned}
F_{\mathbf1}(s)&=\zeta(s),\\
F_{\tau}(s)&=\zeta(s)^2,\\
F_{\mu}(s)&=\frac1{\zeta(s)}
=\prod_p(1-p^{-s})\qquad(\sigma>1).
\end{aligned}
$$

最後の式では $\mu*\mathbf1=\varepsilon$ かつ $|\mu(n)|\le1$ を使いました。両級数が $\sigma>1$ で絶対収束するため、積が $1$ であると確認できます。

また $a(n)=n$ の級数は $\zeta(s-1)$ です。$a(n)=n$ の絶対収束条件は $\sigma>2$ なので、[Euler関数のMöbius反転](../../NT/NT5/index.md#prop-nt5-totient-divisor-sum) $\varphi=\operatorname{id}*\mu$ から

$$
\sum_{n\ge1}\frac{\varphi(n)}{n^s}
=\frac{\zeta(s-1)}{\zeta(s)}
\qquad(\sigma>2)
$$

を導けます。左辺は乗法的な係数の級数なのでEuler積も持ちます。$\sigma>2$ はこの導出を絶対収束で正当化した領域であり、それ以外の領域について勝手に同じ級数表示を拡張してはいけません。

### 条件収束は別の証明を要する

$a(n)=(-1)^{n-1}$ とすれば部分和 $A(x)=\sum_{n\le x}a(n)$ は $0$ または $1$ です。[Abelの部分和公式](../ANT1/index.md#thm-ant1-abel)を区間 $(N,M]$ に適用し、$b(t)=t^{-s}$、$b'(t)=-st^{-s-1}$ とすると、$\sigma>0$ で

$$
\left|\sum_{N<n\le M}(-1)^{n-1}n^{-s}\right|
\le N^{-\sigma}+\frac{|s|}{\sigma}N^{-\sigma}.
$$

理由は尾部の部分和 $B(t)=\sum_{N<n\le t}(-1)^{n-1}$ が $|B(t)|\le1$ であり、境界項は $M^{-\sigma}$ 以下、積分は $|s|\int_N^Mt^{-\sigma-1}dt\le|s|N^{-\sigma}/\sigma$ だからです（境界項を $M^{-\sigma}\le N^{-\sigma}$ で抑えました）。従ってCauchy条件により級数は $\sigma>0$ で収束します。一方、絶対値を取ると $\sum n^{-\sigma}$ なので絶対収束は $\sigma>1$ に限ります。「収束」と「絶対収束」の半平面を混同しない例です。

## 6. 演習と詳細解答

すべての級数では $n\ge1$、$s\in\mathbb C$、$\sigma=\operatorname{Re}s$ とします。最初に収束範囲を確認し、その後に並べ替えや積の展開を行ってください。

### Level A：定義と有限計算

#### A1. 絶対収束横座標

$a(n)=n$ に対応するDirichlet級数を求め、絶対収束横座標を判定せよ。

- Level: A
- ID: ANT2-A1

<!-- solution-start -->
**詳細解答**：$a(n)n^{-s}=n^{1-s}$ なので $F_a(s)=\sum n^{-(s-1)}$ です。絶対値は $n^{1-\sigma}$ となり、$\sum n^{-v}$ が $v>1$ のときだけ収束することに $v=\sigma-1$ を代入すれば $\sigma>2$ です。従って絶対収束横座標は $2$、その領域で $F_a(s)=\zeta(s-1)$ です。
<!-- solution-end -->

#### A2. 畳み込みを $n=12$ で確認する

$a(n)=b(n)=1$ とし、$(a*b)(12)$ を約数から計算せよ。

- Level: A
- ID: ANT2-A2

<!-- solution-start -->
**詳細解答**：$12$ の正の約数は $1,2,3,4,6,12$ です。[Dirichlet畳み込みの定義](../../NT/NT4/index.md#def-nt4-dirichlet)より

$$
(a*b)(12)=\sum_{d\mid12}1\cdot1=1+1+1+1+1+1=6.
$$

[約数個数関数と約数和関数](../../NT/NT4/index.md#def-nt4-divisor-functions)から $\tau(12)=6$ と一致します。
<!-- solution-end -->

#### A3. 二つの素数だけの局所計算

$a(n)=1$、$s=2$ とする。素数 $\{2,3\}$ に対する有限Euler積を求めよ。

- Level: A
- ID: ANT2-A3

<!-- solution-start -->
**詳細解答**：幾何級数の公比はそれぞれ $2^{-2}=1/4$、$3^{-2}=1/9$ です。両方とも絶対値が $1$ 未満なので

$$
\left(\sum_{j\ge0}4^{-j}\right)
\left(\sum_{k\ge0}9^{-k}\right)
=\frac1{1-1/4}\frac1{1-1/9}
=\frac43\cdot\frac98=\frac32.
$$

この値は素因数が $2,3$ の整数だけの $n^{-2}$ の和であり、全整数の $\zeta(2)$ とは異なります。
<!-- solution-end -->

#### A4. 逆元の最初の係数

$a(1)=1$、$a(2)=-2$、それ以外は $0$ とする。$a*b=\varepsilon$ を満たす $b(1),b(2),b(4),b(8)$ を求めよ。

- Level: A
- ID: ANT2-A4

<!-- solution-start -->
**詳細解答**：$n=1$ で $a(1)b(1)=1$ なので $b(1)=1$ です。$n=2^j$（$j\ge1$）では非零の $a(d)$ は $d=1,2$ のみなので

$$
0=(a*b)(2^j)=b(2^j)-2b(2^{j-1}).
$$

これを順に用いて $b(2)=2$、$b(4)=4$、$b(8)=8$ です。$s=1$ では $b(2^j)2^{-j}=1$ が続き、逆級数は発散します。
<!-- solution-end -->

### Level B：級数操作の根拠を説明する

#### B1. 約数和関数のDirichlet級数

$\sigma(n)=\sum_{d\mid n}d$ とする。絶対収束を正当化したうえで

$$
\sum_{n\ge1}\frac{\sigma(n)}{n^s}
=\zeta(s)\zeta(s-1)\qquad(\sigma>2)
$$

を証明せよ。

- Level: B
- ID: ANT2-B1

<!-- solution-start -->
**詳細解答**：[約数和の畳み込み表示](../../NT/NT4/index.md#prop-nt4-divisor-convolutions)より $\sigma=\mathbf1*\operatorname{id}$ です。$\sum n^{-\sigma}$ は $\sigma>1$、$\sum n^{1-\sigma}$ は $\sigma>2$ で絶対収束します。従って共通域 $\sigma>2$ で[畳み込みと級数の積](#thm-ant2-convolution-product)が適用でき、

$$
\sum_{n\ge1}\frac{\sigma(n)}{n^s}
=\left(\sum_{d\ge1}d^{-s}\right)
 \left(\sum_{k\ge1}k^{1-s}\right)
=\zeta(s)\zeta(s-1).
$$

ここでは $n=dk$ の二重級数の絶対値和が $\zeta(\sigma)\zeta(\sigma-1)<\infty$ なので、和の括り直しに問題はありません。
<!-- solution-end -->

#### B2. 項別二階微分の条件

$a(n)=1$ とする。$\sigma>1$ で

$$
\zeta''(s)=\sum_{n\ge1}\frac{(\log n)^2}{n^s}
$$

を示し、実部が $1$ に近づくコンパクト集合でも一様収束を述べられる理由を説明せよ。

- Level: B
- ID: ANT2-B2

<!-- solution-start -->
**詳細解答**：$K\subset\{\operatorname{Re}s>1\}$ をコンパクトとして $m=\min_{s\in K}\operatorname{Re}s>1$ と置きます。$1<u<m$、$0<\delta<m-u$ を選びます。$n\ge1$ で $(\log n)^2/n^\delta\le C$ だから

$$
\left|\frac{(\log n)^2}{n^s}\right|
\le C n^{-(m-\delta)}\le Cn^{-u}.
$$

右辺の和は $u>1$ により収束します。[正則性と項別微分の定理](#thm-ant2-holomorphic-halfplane)を $k=2$ に適用し、$(-\log n)^2=(\log n)^2$ として等式を得ます。$K$ ごとに $u,\delta$ を選べることが局所一様収束の意味であり、実部 $1$ まで一様だとは主張していません。
<!-- solution-end -->

#### B3. 非零性の誤推論を破る

$a(1)=1$、$a(2)=-2$、$a(n)=0$（$n\ge3$）が乗法的であることを確認し、$F_a(s)$ の零点を一つ求めよ。完全乗法的でないことも示せ。

- Level: B
- ID: ANT2-B3

<!-- solution-start -->
**詳細解答**：互いに素な $m,n$ のうち両方が $1$ より大きければ、$a(m)a(n)=0$ であり、$mn\ge6$ なので $a(mn)=0$ です。片方が $1$ なら $a(1)=1$ により乗法性が成立します。従って乗法的です。級数は $F_a(s)=1-2\cdot2^{-s}=1-2^{1-s}$ です。$s=1$ を入れると $1-2^{0}=0$ となります。他方、$a(4)=0$ ですが $a(2)^2=4$ なので完全乗法的ではありません。したがって完全乗法的係数に対する局所幾何級数の非零性議論を適用できません。
<!-- solution-end -->

#### B4. 条件収束するDirichlet級数

$a(n)=(-1)^{n-1}$ とする。$\sigma>0$ で級数 $\sum a(n)n^{-s}$ が収束することを部分和評価で示し、絶対収束する領域を求めよ。

- Level: B
- ID: ANT2-B4

<!-- solution-start -->
**詳細解答**：$N<M$ に対し $B(t)=\sum_{N<n\le t}a(n)$ と置くと $|B(t)|\le1$ です。[Abelの部分和公式](../ANT1/index.md#thm-ant1-abel)を $[N,M]$ 上の有限和に適用します。$b(t)=t^{-s}$ の導関数は $-st^{-s-1}$ なので

$$
\begin{aligned}
\left|\sum_{N<n\le M}a(n)n^{-s}\right|
&\le |B(M)|M^{-\sigma}
+|s|\int_N^M|B(t)|t^{-\sigma-1}\,dt\\
&\le M^{-\sigma}+\frac{|s|}{\sigma}
(N^{-\sigma}-M^{-\sigma})\\
&\le\left(1+\frac{|s|}{\sigma}\right)N^{-\sigma}.
\end{aligned}
$$

$\sigma>0$ なら右辺は $N\to\infty$ で零へ収束するのでCauchy条件を満たします。一方、絶対値は $\sum n^{-\sigma}$ であり、絶対収束するのは $\sigma>1$ だけです。
<!-- solution-end -->

### Level C：畳み込み・Euler積・逆数を接続する

#### C1. Euler関数のDirichlet級数

[NT5のEuler関数のMöbius反転](../../NT/NT5/index.md#prop-nt5-totient-divisor-sum)を出発点として、$\sigma>2$ で

$$
\sum_{n\ge1}\frac{\varphi(n)}{n^s}
=\frac{\zeta(s-1)}{\zeta(s)}
=\prod_p\frac{1-p^{-s}}{1-p^{1-s}}
$$

を証明せよ。等号を正当化する収束条件と、$s=2$ で同じ絶対収束論法が使えない理由を述べよ。

- Level: C
- ID: ANT2-C1

<!-- solution-start -->
**詳細解答**：[Euler関数の約数和と反転](../../NT/NT5/index.md#prop-nt5-totient-divisor-sum)より $\varphi=\operatorname{id}*\mu$ です。$\sigma>2$ なら $\sum n^{1-\sigma}<\infty$ であり、また $|\mu(n)|\le1$ から $\sum|\mu(n)|n^{-\sigma}\le\sum n^{-\sigma}<\infty$ です。よって[畳み込みと級数の積](#thm-ant2-convolution-product)を適用できます。

$$
\begin{aligned}
\sum_{n\ge1}\frac{\varphi(n)}{n^s}
&=\left(\sum_{m\ge1}m^{1-s}\right)
  \left(\sum_{k\ge1}\mu(k)k^{-s}\right)\\
&=\zeta(s-1)\frac1{\zeta(s)}.
\end{aligned}
$$

第二の因子は $\mu*\mathbf1=\varepsilon$ と両級数の絶対収束により $1/\zeta(s)$ となります。[ζのEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)を $s$ と $s-1$ の両方に適用します。$\sigma>2$ なら $\operatorname{Re}(s-1)>1$ なので

$$
\zeta(s-1)=\prod_p(1-p^{1-s})^{-1},
\qquad
\frac1{\zeta(s)}=\prod_p(1-p^{-s}).
$$

各積の収束・非零性はその右半平面で保証され、有限積を先に掛けてから極限を取ると指定の局所因子の積を得ます。$s=2$ では $\sum n^{1-s}=\sum 1/n$ が発散するため、最初の絶対収束と $\zeta(s-1)$ のEuler積の仮定を満たさず、同じ導出を使えません。
<!-- solution-end -->

## 7. 次章への橋

Dirichlet級数は係数の畳み込みを解析関数の積へ変換し、乗法的係数は素数ごとのEuler積へ変換します。逆元の級数も十分右側で実際の逆数になります。一方、ここで証明したのは絶対収束域の議論です。

ANT3では係数をDirichlet文字にして、剰余類を識別する $L(s,\chi)$ を構成します。$\operatorname{Re}s=1$ に近づくときは、絶対収束半平面の中で成立した等式と、そこからさらに進むための新たな論証を区別する必要があります。
