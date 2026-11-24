# AFR10 Tateの学位論文：`GL_1`のゼータ積分

AFR8 では非零有理数による乗法商を、AFR9 では加法上の Fourier 変換と Poisson 和を調べました。今回は二つの群構造を同じ積分で結び付けます。加法上で選んだ試験関数を乗法上で積分すると、各素数で等比級数が現れます。さらに加法の Poisson 和を使うと、当初は異なる収束域にある二つの積分を一つの関数等式で結べます。

以下は有理数体 $\mathbb Q$ の場合です。$GL_1$ は可逆な $1$ 次正方行列の群、すなわち非零元の乗法群です。一般の数体での異なる測度規格化はここでは扱いません。

## 1. 乗法に適した測度

$\mathbb A$ を[アデール環](../../ANF/ANF19/index.md#def-anf19-adele)、$\mathbb I=\mathbb A^\times$ を[イデール群](../../ANF/ANF19/index.md#def-anf19-idele)とします。

素点を $v$ と書き、$v=\infty$ は実素点、$v=p$ は素数 $p$ の有限素点とします。$\mathbb Q_p$ は $p$ 進数体、$\mathbb Z_p$ はその整数環、$\mathbb Z_p^\times$ は絶対値が $1$ の単数群です。$v_p(x)$ は付値で、非零元では $|x|_p=p^{-v_p(x)}$ です。

有限素点 $p$ では加法測度 $dx_p$ を [AFR9 の規格化](../AFR9/index.md#prop-afr9-local-measure)に従って $\mu_p(\mathbb Z_p)=1$ とし、実素点では Lebesgue 測度 $dx_\infty$ を使います。

掛け算で点を動かすと加法測度は絶対値の分だけ変わります。

その変化を分母で相殺し、さらに単数群の体積を $1$ にそろえます。

<a id="def-afr10-multiplicative-measure"></a>

<!-- formal-statement-start -->
> **定義（局所乗法測度）**  
> 非零実数および非零 $p$ 進数上の測度を次式で規格化する。

$$
d^\times x_\infty=\frac{dx_\infty}{|x_\infty|},\qquad
d^\times x_p=\frac{1}{1-p^{-1}}\frac{dx_p}{|x_p|_p}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr10-multiplicative-measure -->
**定義の確認**

$p=3$ では $\mathbb Z_3^\times=\mathbb Z_3\setminus3\mathbb Z_3$ の加法体積は $1-1/3$ です。単数上で絶対値は $1$ だから乗法体積は $(1-1/3)^{-1}(1-1/3)=1$ になります。$3^2\mathbb Z_3^\times$ の加法体積は $(1-1/3)/9$、絶対値は $1/9$ です。分母と体積の変化が相殺され、乗法体積は再び $1$ です。
<!-- definition-example-end -->

一般に $a\ne0$ のとき $x=ay$ と置けば [加法測度の尺度変換](../AFR9/index.md#prop-afr9-local-measure)と絶対値の乗法性から

$$
\frac{dx_p}{|x|_p}=\frac{|a|_p\,dy_p}{|a|_p|y|_p}
=\frac{dy_p}{|y|_p}.
$$

実素点でも実変数の置換により同じ不変性があります。従って各乗法測度は掛け算による平行移動で不変です。特に各殻 $p^k\mathbb Z_p^\times$ の乗法体積は $1$ です。

$U=\prod_p\mathbb Z_p^\times$ とおきます。

各単数群の確率測度の積を $du$ とします。

有限個の成分を指定する円柱集合への質量の積から、[AFR9 の有限アデール測度の構成](../AFR9/index.md#prop-afr9-local-measure)と同じコンパクトな開閉集合の分割によって積確率測度が得られます。

掛け算で各成分の測度が保存されるため $du$ も不変です。

逆元写像についても、局所単数群の剰余類を置換することから $du$ を保存します。

[有理数体のイデール類群の標準代表元](../AFR8/index.md#thm-afr8-idele-normal-form)により、任意の $x\in\mathbb I$ は一意的に $q(t,u)$ と表せます。

ここで $q$ は対角に埋め込む有理数、$(t,u)$ は実成分 $t$ と有限成分 $u=(u_p)_p$ を持つイデールです。各成分は次の範囲を動きます。

$$
q\in\mathbb Q^\times,\qquad t>0,\qquad u\in U.
$$

正の実成分と有限単数からなる部分群は開です。

その各対角有理数倍へ $dt/t\,du$ を移し、可算和を取った測度を $d^\times x$ とします。

これは局所乗法測度の制限付き積です。

実際、各有限殻と実符号を指定すると $q$ が一意に決まり、実測度は正の半直線上の $dt/t$ に移り、有限側は乗法体積 $1$ の各殻の積となります。

商 $\mathbb Q^\times\backslash\mathbb I$ には $dt/t\,du$ を使います。

## 2. 指標とゼータ積分

絶対値だけでなく単数成分の情報も残したいので、乗法の位相を重みにします。

$\mathbb T$ は絶対値 $1$ の複素数の群とします。

ここでは $U$ の連続指標 $\eta:U\to\mathbb T$ を選びます。指標とは連続な群準同型であり、有限位数とはある正整数 $m$ が存在してすべての入力で値の $m$ 乗が $1$ になることです。以下の構成で有限位数になる理由も確認します。

正の実成分は複素変数 $s$ によって重み付けするので、指標側では無視します。

<a id="def-afr10-hecke-character"></a>

<!-- formal-statement-start -->
> **定義（有限位数Hecke指標）**  
> $x=q(t,u)\in\mathbb I$ を上記の一意な分解とする。連続準同型 $\eta:U\to\mathbb T$ から次の指標を作る。

$$
\chi(x)=\eta(u).
$$

> これは有限位数の連続乗法指標であり、対角の非零有理数上および正の実成分上で自明（値が $1$）である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr10-hecke-character -->
**定義の確認**

$5$ 進単数の還元が $1,4$ なら $1$、$2,3$ なら $-1$ とする写像を $\eta$ とします。

$U$ から $5$ 進単数の法 $5$ の剰余類を取り出す写像は積を保ちます。非零剰余類の積で平方剰余の集合 $\{1,4\}$ は指数 $2$ の部分群なので、その商群を $\{1,-1\}$ に対応させる写像も積を保ちます。従って合成した $\eta$ は準同型で、すべての値の二乗は $1$ です。

剰余類は開であるため連続です。

[標準代表元の定理](../AFR8/index.md#thm-afr8-idele-normal-form)による群同型は位相も保つので、商への射影と $U$ への射影を $\eta$ と合成した $\chi$ は連続です。標準代表元の積は標準代表元同士の積なので

$$
\chi(xy)=\chi(x)\chi(y)
$$

が成立します。

対角有理数 $q$ の代表元は $(1,1)$ だから $\chi(q)=1$ です。

正の実成分だけを動かしても $\eta$ は変化しません。
<!-- definition-example-end -->

任意の連続な $\eta$ が有限位数になる理由も確認します。

単位元の近くでは像が $\Re z>0$ に含まれるような開近傍が取れます。

その近傍に含まれる開部分群として、有限個の素数で $1+p^n\mathbb Z_p$、他では単数群全体を取れます。

$\mathbb T$ の非自明な部分群は $\Re z>0$ に含まれません。

実際、単位元でない元の偏角の絶対値を $\theta\in(0,\pi]$ とします。$\theta\ge\pi/2$ ならその元自体が右半平面の外です。そうでなければ初めて $k\theta\ge\pi/2$ となる正整数 $k$ を選びます。

$$
\pi/2\le k\theta<\pi/2+\theta<\pi.
$$

この冪も右半平面の外にあります。

従ってこの開部分群は核に入り、$\eta$ は有限個の有限剰余群の積を経由します。

一つの素点だけ成分を動かしたときの $\chi$ を $\chi_v$ と記します。

有限素点で $\chi_p$ が単数群上で自明なら不分岐、そうでなければ分岐とします。

分岐は有限個の素数だけです。

分岐素点では $\chi_p$ が $1+p^n\mathbb Z_p$ 上で自明となる最小の正整数 $n$ を導手指数とし、不分岐では $n=0$ とします。

実素点では $\chi_\infty(x)=\operatorname{sgn}(x)^a$ となり、$a$ は $0$ または $1$ です。

$\chi(x)=\prod_v\chi_v(x_v)$ が成り立ちます。実際、有限個の非単数成分と、$\eta$ が非自明な有限個の単数成分だけを残せば、残りの単数成分からなる元は $\chi$ の核に入ります。各成分の積に対し準同型性を適用できます。

[Schwartz–Bruhat関数](../AFR9/index.md#def-afr9-schwartz-bruhat)は、実素点ではすべての階数の導関数が急減少する滑らかな関数、有限素点では局所定数でコンパクト台を持つ関数です。大域の試験関数の空間を $\mathcal S(\mathbb A)$ と書きます。集合 $E$ の指示関数を $1_E$ と書き、$E$ 上で $1$、外で $0$ とします。

[イデール絶対値](../../ANF/ANF19/index.md#def-anf19-idele-modulus)は $|x|_{\mathbb A}=\prod_v|x_v|_v$ で、標準代表元 $(t,u)$ では $t$ です。正の実数 $r$ の複素冪は $r^s=\exp(s\log r)$ と約束します。従って $|r^s|=r^{\Re s}$ です。非零元だけを積分し、指標と絶対値の冪を掛けることで乗法側の情報を取り出します。

<a id="def-afr10-zeta-integral"></a>

<!-- formal-statement-start -->
> **定義（Tateゼータ積分）**  
> $\chi$ を上で定めた有限位数Hecke指標、$f_v$ を局所の Schwartz–Bruhat 関数、$f\in\mathcal S(\mathbb A)$ とする。局所積分と大域積分を、それぞれ絶対収束する $s\in\mathbb C$ に対して

$$
Z_v(f_v,\chi_v,s)=
\int_{\mathbb Q_v^\times} f_v(x)\chi_v(x)|x|_v^s\,d^\times x,
$$

$$
Z(f,\chi,s)=
\int_{\mathbb I} f(x)\chi(x)|x|_{\mathbb A}^s\,d^\times x
$$

> とする。実素点では $\mathbb Q_\infty=\mathbb R$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr10-zeta-integral -->
**定義の確認**

$p=2$、$f_2=1_{\mathbb Z_2^\times}$、$\chi_2=1$ とすれば、積分の台は単数群に限られ、絶対値も指標も $1$ です。

台は開かつコンパクトなので局所試験関数の条件を満たします。

従って任意の $s$ で絶対積分値も積分値も $1$ です。

$f_2$ を $1_{2\mathbb Z_2^\times}$ に変えると絶対値が $1/2$ となり、乗法体積は変わらないため積分値は $2^{-s}$ です。

大域積分の例として $\chi=1$、$s=2$、$f(x)=e^{-\pi x_\infty^2}1_{\widehat{\mathbb Z}}(x_f)$ を取ります。ここで $\widehat{\mathbb Z}=\prod_p\mathbb Z_p$ です。実関数は微分しても多項式と Gaussian の積となり、有限側はコンパクトな開部分群の指示関数なので、大域の試験関数の条件を満たします。$x=q(t,u)$ とすると有限側が非零となる条件はすべての $p$ で $qu_p\in\mathbb Z_p$、すなわち $q$ が非零整数であることです。$|x|_{\mathbb A}=t$ で $du$ の全体積は $1$ なので、非負関数に [Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli) を使うと

$$
Z(f,1,2)=2\sum_{m=1}^{\infty}\int_0^\infty e^{-\pi m^2t^2}t\,dt.
$$

$w=\pi m^2t^2$ と置くと $dw/dt=2\pi m^2t>0$（$t>0$）であり、置換積分で

$$
2\int_0^\infty e^{-\pi m^2t^2}t\,dt
=\frac{1}{\pi m^2}\int_0^\infty e^{-w}dw
=\frac{1}{\pi m^2}.
$$

従って $Z(f,1,2)=\pi^{-1}\sum_{m\ge1}m^{-2}<\infty$ であり、絶対収束の条件も確認できました。
<!-- definition-example-end -->

局所では $\Re s>0$ なら絶対収束します。実素点の原点近くでは試験関数が有界なので $r^{\Re s-1}$ が可積分であり、無限遠では急減少性が任意の冪を抑えます。有限素点では台のコンパクト性により付値に下限があり、各殻の体積は $1$、試験関数は有界です。従って絶対積分は下限から始まる収束等比級数で抑えられます。

## 3. 局所因子を計算する

### 3.1 不分岐素点

標準試験関数 $1_{\mathbb Z_p}$ の台から零を除くと、付値 $k\ge0$ の殻が残ります。各殻上の指標が一定になることが等比級数を生みます。

<a id="thm-afr10-unramified-factor"></a>

<!-- formal-statement-start -->
> **定理（不分岐局所ゼータ因子）**  
> $\chi_p$ を単数群上で自明で、絶対値が常に $1$ となる乗法指標とし、$\alpha_p=\chi_p(p)$ とする。$\Re s>0$ で

$$
Z_p(1_{\mathbb Z_p},\chi_p,s)=
\frac{1}{1-\alpha_p p^{-s}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

台を殻へ分割し、各殻で絶対値と指標を計算します。乗法測度では殻の体積が同じなので、余分な $p^{-k}$ は現れません。

<!-- proof-start -->
### 証明

$x=p^ku$（$u\in\mathbb Z_p^\times$）と書けば、$\chi_p(x)=\alpha_p^k$、$|x|_p=p^{-k}$ です。[局所乗法測度](#def-afr10-multiplicative-measure)によって殻の体積は $1$ です。

$$
Z_p=\sum_{k=0}^\infty\alpha_p^k p^{-ks}.
$$

各項の絶対値の和は $\sum_{k\ge0}p^{-k\Re s}<\infty$ です。従って分割による積分と級数は一致し、等比級数の公式から結論を得ます。
<!-- proof-end -->

例えば $\alpha_3=-1,s=1$ なら $1-1/3+1/9-\cdots=3/4$ です。加法測度を誤って使うと殻の体積が $(1-1/p)p^{-k}$ になり、別の因子を得てしまいます。

### 3.2 分岐素点

分岐した指標は単数を積分するだけで打ち消し合います。実際、$I=\int_{\mathbb Z_p^\times}\chi_p(u)d^\times u$ として、$\chi_p(v)\ne1$ となる単数 $v$ による置換をすると $I=\chi_p(v)I$、従って $I=0$ です。よって標準球の代わりに指標を打ち消す試験関数を使います。

<a id="prop-afr10-ramified-test"></a>

<!-- formal-statement-start -->
> **命題（分岐指標に適合する試験関数）**  
> $\chi_p$ が分岐した有限位数指標であるとする。単数群上で $\chi_p(x)^{-1}$、それ以外で $0$ となる関数を $h_p$ とすると、$h_p$ は局所 Schwartz–Bruhat 関数であり、任意の複素数 $s$ に対して

$$
Z_p(h_p,\chi_p,s)=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

導手指数までの剰余類で関数は一定です。指標の逆数を掛けたため、積分では振動が消えます。

<!-- proof-start -->
### 証明

導手指数を $n\ge1$ とします。

単数群上の指標は $p^n$ を法とする剰余類上で一定であり、単数群は開かつ閉、コンパクトです。

従って零拡張は局所定数でコンパクト台を持ち、[試験関数の条件](../AFR9/index.md#def-afr9-schwartz-bruhat)を満たします。

単数群では $h_p(x)\chi_p(x)=1$、$|x|_p^s=1$ であり、外では被積分関数は零です。

乗法体積が $1$ なので絶対収束して結論を得ます。
<!-- proof-end -->

### 3.3 実素点

指標の偶奇に応じて $g_a(x)=x^a e^{-\pi x^2}$ を使います。微分するたびに多項式と Gaussian の積となるので急減少の条件を満たします。実測度を正負に分けて計算します。

<a id="prop-afr10-real-factor"></a>

<!-- formal-statement-start -->
> **命題（実局所ゼータ因子）**  
> $a\in\{0,1\}$、$\chi_\infty(x)=\operatorname{sgn}(x)^a$、$g_a(x)=x^a e^{-\pi x^2}$ とする。$\Re s>0$ なら

$$
Z_\infty(g_a,\chi_\infty,s)=
\pi^{-(s+a)/2}\Gamma((s+a)/2).
$$
<!-- formal-statement-end -->

### 証明の見取り図

負の半直線で生じる二つの符号は相殺されます。正の半直線上の積分を平方の置換で Gamma 積分へ変えます。

<!-- proof-start -->
### 証明

$x^a\operatorname{sgn}(x)^a=|x|^a$ なので

$$
Z_\infty=2\int_0^\infty e^{-\pi r^2}r^{s+a-1}\,dr.
$$

$w=\pi r^2$ は $r>0$ で $dw/dr=2\pi r>0$ の一対一の変数変換です。逆関数 $r=\sqrt{w/\pi}$ の導関数が $dr/dw=(2\sqrt{\pi w})^{-1}$ なので、置換積分における測度の変換を $dr=(2\sqrt{\pi w})^{-1}dw$ と書きます。従って

$$
2r^{s+a-1}\,dr
=\pi^{-(s+a)/2}w^{(s+a)/2-1}\,dw.
$$

$\Re(s+a)>0$ なので [Gamma関数の積分表示](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)を適用して結論を得ます。
<!-- proof-end -->

## 4. 大域積分からEuler積へ

有限個の素点だけ試験関数を変更し、それ以外で $1_{\mathbb Z_p}$ とする積の関数を考えます。分岐素点では前節の $h_p$、実素点では $g_a$ を取ると、各局所因子を一つの積にまとめられます。

<a id="def-afr10-hecke-l"></a>

<!-- formal-statement-start -->
> **定義（有限位数Hecke L関数）**  
> $\chi$ を有理数体の有限位数Hecke指標とする。$\Re s>1$ で、不分岐素点の積を

$$
L(s,\chi)=\prod_{p:\,n_p=0}(1-\chi_p(p)p^{-s})^{-1}
$$

> とする。ここで $n_p$ は導手指数である。分岐素点の因子は $1$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr10-hecke-l -->
**定義の確認**

$\chi=1$ では全素点が不分岐で $\chi_p(p)=1$ です。

[絶対収束域における Euler 積](../../NT/NT8/index.md#thm-nt8-euler-product)と同じく、有限集合の素数について積を展開すると、その素数だけを素因数に持つ正整数の $m^{-s}$ の和になります。

$\Re s>1$ では $\sum_{m\ge1}m^{-\Re s}$ が収束するので、素数集合を全体に増やすと $L(s,1)=\sum_{m\ge1}m^{-s}$、すなわち Riemann ゼータ関数になります。

一般の指標でも各係数の絶対値は $1$ 以下であり、同じ絶対収束域が得られます。
<!-- definition-example-end -->

<a id="thm-afr10-euler-factorization"></a>

<!-- formal-statement-start -->
> **定理（大域ゼータ積分のEuler分解）**  
> $f=\prod_v f_v$ を積の Schwartz–Bruhat 関数とし、ほとんど全ての有限素点で $f_p=1_{\mathbb Z_p}$ とする。有限位数Hecke指標 $\chi$ と $\Re s>1$ に対して大域積分は絶対収束し、

$$
Z(f,\chi,s)=\prod_v Z_v(f_v,\chi_v,s).
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず有限集合の外側を単数に制限すると、積分は有限個の局所積分に分離します。制限を解除するときの絶対積分は収束する正の Euler 積で抑えられます。

<!-- proof-start -->
### 証明

試験関数が標準球と異なる素点および指標の全分岐素点を含む有限集合 $S$ を取り、$p\notin S$ では $x_p\in\mathbb Z_p^\times$ に制限します。

その集合上では外側の被積分関数の因子は $1$、外側の測度の総量も $1$ です。

制限した領域での積分は前節の局所絶対収束性により [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を実部と虚部に適用して分離できます。

絶対積分を考えると、例外素点以外の積分は [不分岐局所ゼータ因子の計算](#thm-afr10-unramified-factor)で $\alpha_p=1,s=\sigma=\Re s$ としたものです。有限個の正のEuler因子の積は

$$
\prod_{p\in S}(1-p^{-\sigma})^{-1}
\le\sum_{m\ge1}m^{-\sigma}<\infty
$$

で一様に抑えられます。例外素点と実素点の絶対積分は有限です。$S$ を増やすと制限集合は $\mathbb I$ 全体を覆うので、[単調収束定理](../../../解析系/F0/F0-00D2B/index.md#ref-limit-integral-exchange)によって絶対積分も有限となります。元の複素積分には[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を実部と虚部に適用でき、局所因子の積の極限が結論です。
<!-- proof-end -->

従って標準的な選択 $f_\chi$ を、[実局所ゼータ因子](#prop-afr10-real-factor)、[不分岐局所ゼータ因子](#thm-afr10-unramified-factor)、[分岐指標に適合する試験関数](#prop-afr10-ramified-test) に対応させて

$$
f_\chi=g_a\prod_{n_p=0}1_{\mathbb Z_p}\prod_{n_p>0}h_p
$$

とすると

$$
Z(f_\chi,\chi,s)
=\pi^{-(s+a)/2}\Gamma((s+a)/2)L(s,\chi).
$$

一般の Schwartz–Bruhat 関数も、[有限剰余類分解](../AFR9/index.md#lem-afr9-finite-cosets)によって有限個の例外素点を持つ積の有限線形結合になります。従って絶対収束域は同じです。ただし積に分離できない関数のゼータ積分は Euler 積の有限和であり、一つの Euler 積とは限りません。

## 5. Poisson和から関数等式を得る

大域積分では $s$ の実部が $1$ より大きいことを要求しました。

一方、Fourier 変換側で $1-s$ を使うと二つの絶対収束域は重なりません。

そこでイデールの絶対値 $t$ が $1$ 以上の領域と未満の領域を分け、後者を Poisson 和で反転します。

$f\in\mathcal S(\mathbb A)$ に対して非零有理数に沿った和を

$$
\Theta_f(x)=\sum_{q\in\mathbb Q^\times} f(qx)
$$

と書きます。対角有理数倍で添字が置換されるため商上の関数になります。$x=(t,u)$ を標準代表元とします。次の評価が積分の解析接続を支えます。

<a id="lem-afr10-theta-decay"></a>

<!-- formal-statement-start -->
> **補題（非零有理数和の一様減衰）**  
> $f\in\mathcal S(\mathbb A)$ とし、$t\ge1,u\in U$ とする。任意の整数 $N\ge2$ に対し $u,t$ に依存しない定数 $C_N$ が存在して

$$
|\Theta_f(t,u)|\le C_N t^{-N}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限成分の台が有理数の分母を制限します。残る離散格子上では非零の最小絶対値があり、実成分の急減少性を使えます。

<!-- proof-start -->
### 証明

線形性により $f=g\,h$ の積で考えます。

有限成分のコンパクト台はある正の有理数 $d$ に対して $d\widehat{\mathbb Z}$ に含まれます。

これは [有限剰余類分解](../AFR9/index.md#lem-afr9-finite-cosets)で得られる有限個の剰余類について、中心と幅の分母を一つの整数で払えば確認できます。

$qu\in d\widehat{\mathbb Z}$ なら各 $u_p$ は単数なので $q/d$ は全有限素点で整、従って整数です。

$h$ はコンパクト台上で有界であり、$g$ の急減少性から $|g(y)|\le M_N(1+|y|)^{-N}$ となります。従って

$$
\begin{aligned}
|\Theta_f(t,u)|
&\le \|h\|_\infty M_N
\sum_{m\in\mathbb Z\setminus\{0\}}(1+td|m|)^{-N}\\
&\le 2\|h\|_\infty M_N d^{-N}t^{-N}
\sum_{m=1}^\infty m^{-N}.
\end{aligned}
$$

最後の和は収束します。同じ評価は絶対値を取った各項の和に対しても成立します。有限線形結合には定数の和を使います。
<!-- proof-end -->

$\widehat f$ は [アデールFourier変換](../AFR9/index.md#def-afr9-adelic-fourier)を標準指標・自己双対加法測度で取ったものです。$\widehat f$ も同じ試験関数空間に属し、[Fourier反転](../AFR9/index.md#thm-afr9-inversion)から $\widehat{\widehat f}(x)=f(-x)$ です。

<a id="thm-afr10-global-functional-equation"></a>

<!-- formal-statement-start -->
> **定理（Tateの大域関数等式）**  
> 有理数体上の有限位数Hecke指標 $\chi$ と任意の $f\in\mathcal S(\mathbb A)$ に対し、大域ゼータ積分は全複素平面に有理型に解析接続し、

$$
Z(f,\chi,s)=Z(\widehat f,\chi^{-1},1-s)
$$

> が成立する。$\chi\ne1$ なら整関数である。$\chi=1$ の場合の極は高々 $s=0,1$ の単純極で、留数はそれぞれ $-f(0),\widehat f(0)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず乗法積分を商上の非零有理数和へ展開します。$t<1$ で加法の Poisson 和を使うと、変換側の $t^{-1}>1$ の積分に移ります。零の有理数を除いたことによる二つの補正項だけが極を生みます。

<!-- proof-start -->
### 証明

$\Re s>1$ では大域積分の絶対収束が既に確かめられています。測度の構成と [イデール絶対値の冪による指標](../AFR8/index.md#prop-afr8-norm-character)の対角有理数上の自明性、および $\chi(q)=1$ により

$$
Z(f,\chi,s)=
\int_U\int_0^\infty\Theta_f(t,u)\eta(u)t^s\frac{dt}{t}\,du.
$$

この展開は絶対積分に [Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli)を適用してから複素積分に [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用するので正当です。

$x=(t,u)$ と固定し $f_x(y)=f(xy)$ と置きます。

これは試験関数です。

有限成分の掛け算は同相写像なので局所定数性とコンパクト台を保ち、実成分の非零定数倍は Schwartz 条件を保ちます。

加法測度の尺度変換を各素点で適用すると大域の係数は $|x|_{\mathbb A}=t$ です。

[アデールFourier変換の定義](../AFR9/index.md#def-afr9-adelic-fourier)で、$x$ は固定し、$y$ を積分変数、$w$ を周波数とします。変数 $z=xy$ は $x\in\mathbb I$ なので可逆であり、加法測度は $dy=t^{-1}dz$ と変換されます。従って

$$
\begin{aligned}
\widehat{f_x}(w)
&=\int_{\mathbb A}f(xy)\psi(yw)\,dy\\
&=t^{-1}\int_{\mathbb A}f(z)\psi(zx^{-1}w)\,dz\\
&=t^{-1}\widehat f(x^{-1}w).
\end{aligned}
$$

[有理数体のアデールPoisson和公式](../AFR9/index.md#thm-afr9-poisson)を $f_x$ に適用して零の項を分けます。

$$
\Theta_f(x)+f(0)=
t^{-1}\bigl(\Theta_{\widehat f}(x^{-1})+\widehat f(0)\bigr).
$$

よって

$$
\Theta_f(x)=t^{-1}\Theta_{\widehat f}(x^{-1})
+t^{-1}\widehat f(0)-f(0).
$$

$t\ge1$ の積分を

$$
J(f,\chi,s)=
\int_U\int_1^\infty
\Theta_f(t,u)\eta(u)t^s\frac{dt}{t}\,du
$$

とおきます。

[一様減衰の補題](#lem-afr10-theta-decay)で、任意のコンパクトな $s$ の集合における実部の上限を $B$ とし、$N>B+2$ を選べば $t^{B-N-1}$ が積分を支配します。

複素微分の際の $(\log t)^k$ を掛けても可積分なので、積分の下で複素微分でき、$J$ は整関数です。

$t<1$ の部分の変換項で $r=1/t,v=u^{-1}$ と置きます。$t=1/r$ の導関数は $dt/dr=-r^{-2}$ なので、置換積分では $dt/t=-dr/r$ となり、積分区間 $(0,1)$ は向きを反転して $(1,\infty)$ になります。また $\eta(u)=\eta(v)^{-1}$、$t^{s-1}=r^{1-s}$ です。$du$ は逆元写像で保存されるため変換項の積分は $J(\widehat f,\chi^{-1},1-s)$ になります。

残る定数項では $c_\eta=\int_U\eta(u)du$ とおくと、$\eta=1$ なら $c_\eta=1$ です。そうでなければ $\eta(v)\ne1$ となる元の乗法平行移動から $c_\eta=\eta(v)c_\eta$、従って $c_\eta=0$ です。$\Re s>1$ で積分すると

$$
\int_0^1t^{s-1}\frac{dt}{t}=\frac{1}{s-1},
\qquad
\int_0^1t^s\frac{dt}{t}=\frac{1}{s}.
$$

以上から

$$
\begin{aligned}
Z(f,\chi,s)
={}&J(f,\chi,s)+J(\widehat f,\chi^{-1},1-s)\\
&+c_\eta\left(\frac{\widehat f(0)}{s-1}-\frac{f(0)}s\right).
\end{aligned}
$$

右辺は指定された極以外で正則な関数を定め、元の収束域と一致するので解析接続です。

同じ式に $(\widehat f,\chi^{-1},1-s)$ を代入します。二重変換は $f(-x)$ であり、非零有理数の添字を $q\mapsto-q$ とすれば $\Theta_{f(-\cdot)}=\Theta_f$ となります。零での値は $f(0)$ です。定数項は

$$
c_\eta\left(\frac{f(0)}{-s}
-\frac{\widehat f(0)}{1-s}\right)
=c_\eta\left(\frac{\widehat f(0)}{s-1}-\frac{f(0)}s\right).
$$

二つの $J$ も順序が入れ替わるだけなので、解析接続した関数が一致します。留数は表示された有理式から読み取れます。
<!-- proof-end -->

実素点の Fourier 変換には [AFR9 の規格化](../AFR9/index.md#def-afr9-adelic-fourier)を使います。[FOU3 の Fourier 変換](../../../解析系/FOU/FOU3/index.md#def-fou3-fourier-transform)の周波数 $\xi$ と本章の周波数 $y$ は $\xi=2\pi y$ で対応します。そこで [GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)の減衰係数を $\pi$ として代入すると

$$
\widehat g_0(y)=\sqrt{\frac{\pi}{\pi}}
\exp\!\left(-\frac{(2\pi y)^2}{4\pi}\right)
=e^{-\pi y^2}.
$$

特に $\chi=1$ で $f=e^{-\pi x_\infty^2}1_{\widehat{\mathbb Z}}(x_f)$ を選ぶと、有限側も [局所球のFourier変換](../AFR9/index.md#thm-afr9-ball-transform)の $k=0$、中心 $0$ の場合で自己双対です。従って $\widehat f=f$ であり、[大域関数等式](#thm-afr10-global-functional-equation)と[大域ゼータ積分のEuler分解](#thm-afr10-euler-factorization)から

$$
\pi^{-s/2}\Gamma(s/2)\zeta(s)
=\pi^{-(1-s)/2}\Gamma((1-s)/2)\zeta(1-s).
$$

これは収束級数同士を直接比較したのではなく、二つの整関数と有理式へ分解した上での等式です。零の項を捨てたまま Poisson 和を適用すると極の補正が失われます。

## 6. 導手と関数等式の定数

分岐した素点では試験関数の Fourier 変換が単数群に留まらず、導手に対応する殻へ移動します。その係数が関数等式に現れます。[標準局所加法指標](../AFR9/index.md#def-afr9-additive-character)は有限素点で $\psi_p(z)=e^{2\pi i\{z\}_p}$、実素点で $\psi_\infty(z)=e^{-2\pi iz}$ です。有限素点の和で正符号を使うことに注意します。

<a id="thm-afr10-ramified-transform"></a>

<!-- formal-statement-start -->
> **定理（分岐試験関数のFourier変換）**  
> $\chi_p$ は導手指数 $n\ge1$ の有限位数指標とし、$h_p$ は単数群上の $\chi_p^{-1}$ を零拡張した関数とする。標準加法指標と加法測度を使う。$v\in\mathbb Z_p^\times$ に対し

$$
\widehat h_p(p^{-n}v)=G_p\chi_p(v),
\qquad
G_p=p^{-n}\sum_{b\in(\mathbb Z/p^n\mathbb Z)^\times}
\chi_p(b)^{-1}e^{2\pi i b/p^n}.
$$

> 変換は殻 $p^{-n}\mathbb Z_p^\times$ の外では零であり、$|G_p|=p^{-n/2}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

剰余類を法 $p^n$ で分割すると有限 Fourier 和が現れます。より深い振動は剰余類内部で相殺し、より浅い振動は指標の最小導手の条件によって相殺します。残る殻で有限和の二乗平均を取ります。

<!-- proof-start -->
### 証明

法 $p^n$ の各単数剰余類の代表整数を $b$ とすると、その剰余類の元 $x$ は $x=b+p^nz$、$z\in\mathbb Z_p$ と書けます。導手指数の定義によりその上で $h_p(x)=\chi_p(b)^{-1}$ です。従って指示関数の有限線形結合に [局所球のFourier変換](../AFR9/index.md#thm-afr9-ball-transform)を使うと

$$
\widehat h_p(y)=p^{-n}1_{p^{-n}\mathbb Z_p}(y)
\sum_{b\in(\mathbb Z/p^n\mathbb Z)^\times}
\chi_p(b)^{-1}\psi_p(by).
$$

従って $y\notin p^{-n}\mathbb Z_p$ なら零です。

$y\in p^{-n+1}\mathbb Z_p$ のとき、$n\ge2$ なら導手の最小性から $w\in1+p^{n-1}\mathbb Z_p$ で $\chi_p(w)\ne1$ となるものがあります。

$n=1$ なら単数群から $\chi_p(w)\ne1$ を選びます。

どちらの場合も $(w-1)y\in\mathbb Z_p$ なので $\psi_p(bwy)=\psi_p(by)$ です。

和の添字を $b\mapsto bw$ と取り替えると、和は $\chi_p(w)^{-1}$ 倍の自分自身に一致するので零です。

残る $y=p^{-n}v$ では $\psi_p(by)=e^{2\pi i bv/p^n}$ です（剰余類の代表整数で指数を評価します）。添字 $c=bv\bmod p^n$ を用いれば $\chi_p(b)^{-1}=\chi_p(c)^{-1}\chi_p(v)$ となり、表示式が得られます。

絶対値の計算のため $M=p^n$ と置き、$b\bmod M$ に対し $A_b=\chi_p(b)^{-1}$（単数以外は零）とします。$D_j=\sum_b A_b e^{2\pi i bj/M}$ と書けば

$$
\begin{aligned}
\sum_{j=0}^{M-1}|D_j|^2
&=\sum_{b,c}A_b\overline{A_c}
  \sum_{j=0}^{M-1}e^{2\pi i(b-c)j/M}\\
&=M\sum_b|A_b|^2.
\end{aligned}
$$

内側の和は $b=c$ なら $M$、異なる場合は $z=e^{2\pi i(b-c)/M}$ とおけば $z\ne1,z^M=1$ です。

和は $(1-z^M)/(1-z)=0$ になります。

単数の個数を $m=M-M/p>0$ とすると右辺は $Mm$ です。

一方、台の計算から単数 $j$ のみが寄与し、全ての絶対値は $M|G_p|$ なので左辺は $mM^2|G_p|^2$ です。

従って $|G_p|=M^{-1/2}$ です。
<!-- proof-end -->

$G_p$ は有限個の複素指数の重み付き和（[Gauss和](../../ANT/ANT3/index.md#def-ant3-gauss-sum)を加法体積で規格化したもの）です。変換後のゼータ積分では $x=p^{-n}v$ と置きます。乗法体積は $1$ で、指標の単数部分は打ち消し合うので

$$
Z_p(\widehat h_p,\chi_p^{-1},1-s)
=G_p\chi_p(p)^n p^{n(1-s)}.
$$

実素点では第5節で求めた [GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)（$\xi=2\pi y$ と置換済み）から $\widehat g_0=g_0$ です。ここで $x$ は積分変数、$y$ は実周波数です。$d/dy$ は $y$ に関する通常の微分で、積分核を微分するときは $x$ を固定します。微分の絶対値は $2\pi|x|e^{-\pi x^2}$ に抑えられ、この関数の可積分性と [優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) により積分の下で微分でき、

$$
\begin{aligned}
\frac{d}{dy}\widehat g_0(y)
&=\int_{\mathbb R}(-2\pi ix)e^{-\pi x^2}e^{-2\pi ixy}\,dx\\
&=-2\pi i\widehat g_1(y)\\
&=\frac{d}{dy}e^{-\pi y^2}
=-2\pi y e^{-\pi y^2}.
\end{aligned}
$$

両辺を $-2\pi i$ で割ると $\widehat g_1(y)=-iy e^{-\pi y^2}$ です。よって $a=0,1$ の両方について $\widehat g_a=(-i)^a g_a$ です。符号は実指標を $e^{-2\pi ixy}$ と選んだことに由来します。

<a id="thm-afr10-completed-l"></a>

<!-- formal-statement-start -->
> **定理（完成Hecke L関数の関数等式）**  
> 有理数体上の有限位数Hecke指標 $\chi$ の導手を $N=\prod_p p^{n_p}$、実素点の偶奇を $a\in\{0,1\}$ とする。完成関数を当初 $\Re s>1$ で

$$
\Lambda(s,\chi)=
N^{s/2}\pi^{-(s+a)/2}\Gamma((s+a)/2)L(s,\chi)
$$

> とする。全複素平面へ有理型に解析接続し、

$$
\Lambda(s,\chi)=\varepsilon(\chi)\Lambda(1-s,\chi^{-1}),
$$

$$
\varepsilon(\chi)=(-i)^a
\prod_{p:n_p>0}p^{n_p/2}G_p\chi_p(p)^{n_p},
\qquad|\varepsilon(\chi)|=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

不分岐素点では球が自己双対です。分岐素点では移動した殻の積分が $N^{1-s}$ を生みます。これを両側の導手の半冪で均等化します。

<!-- proof-start -->
### 証明

第4節の標準試験関数 $f_\chi$ を選び、$D(s,\chi)=Z(f_\chi,\chi,s)$ とします。[大域ゼータ積分のEuler分解](#thm-afr10-euler-factorization)と各局所計算によって

$$
D(s,\chi)=\pi^{-(s+a)/2}\Gamma((s+a)/2)L(s,\chi).
$$

[Tateの大域関数等式](#thm-afr10-global-functional-equation)で右辺の試験関数を Fourier 変換へ移します。$\chi^{-1}$ の導手指数と偶奇は $\chi$ と同じです。[局所球のFourier変換](../AFR9/index.md#thm-afr9-ball-transform)により不分岐素点の変換は元の球の指示関数、分岐素点では [分岐試験関数のFourier変換](#thm-afr10-ramified-transform)で求めた殻と係数です。実素点の係数は $(-i)^a$ です。

従って $\Re s<0$ では変換側が絶対収束し、局所積分の積を計算すると

$$
Z(\widehat f_\chi,\chi^{-1},1-s)
=(-i)^a\prod_{n_p>0}
\bigl(G_p\chi_p(p)^{n_p}p^{n_p(1-s)}\bigr)
D(1-s,\chi^{-1}).
$$

両辺は大域関数等式と解析接続により有理型関数として一致します。$N^{s/2}$ を掛けると、導手の指数は

$$
N^{s/2}N^{1-s}
=N^{1/2}N^{(1-s)/2}
$$

となるので、所望の $\varepsilon(\chi)$ が残ります。各分岐素点で $p^{n_p/2}|G_p|=1$ であり、他の係数も絶対値 $1$ なので結論を得ます。
<!-- proof-end -->

例えば法 $3$ の非自明な二次指標を $\eta$ とすると $a=1$、$\chi_3(3)=1$ です。後者は $3$ の有限成分だけを $3$ としたイデールの標準代表元で $3$ 進単数が $1$ になることから分かります。

$$
G_3=\frac13(e^{2\pi i/3}-e^{4\pi i/3})
=\frac{i}{\sqrt3}.
$$

従って $\varepsilon=(-i)\sqrt3\,i/\sqrt3=1$ です。不分岐素点 $\ell\ne3$ では $\chi_\ell(\ell)=\eta(\ell^{-1}\bmod3)=\eta(\ell\bmod3)$ で、Euler 因子はこの Dirichlet 指標のものになります。

一般にも $N>1$ なら $\eta^{-1}$ を法 $N$ の[原始Dirichlet文字](../../ANT/ANT3/index.md#def-ant3-primitive)（単数剰余群の指標を非単数では零としたもの、原始とはより小さい法を経由しないこと）として読むと、不分岐素点では次が成立します。

$$
\chi_p(p)=\eta^{-1}(p\bmod N),\qquad p\nmid N.
$$

標準代表元にするには対角 $p$ で割るためです。$p\nmid N$ なら導手に関係する各素点でその有限単数は $p^{-1}$ です。また $\eta$ が法 $N$ を経由するのは、各分岐局所指標が $1+p^{n_p}\mathbb Z_p$ 上で自明であり、不分岐局所指標は単数群全体で自明だからです。[中国剰余定理](../../NT/NT1/index.md#thm-nt1-crt-constructive)によって法 $N$ の単数群は各素数冪の単数群の直積です。法 $p^{n_p}$ を $p^{n_p-1}$ へ縮約する写像の核には、導手指数の最小性から $\chi_p$ の値が $1$ でない単数が存在します（$n_p=1$ では法 $1$ への縮約なので単数群全体が核）。その元と他の素点の単位元を組み合わせれば、法 $N/p$ では同じ剰余類なのに $\eta^{-1}$ の値が異なる二元を得ます。従ってどの真の約数も経由せず、原始性が確認できます。$N>1$ なら [Dirichlet L関数のEuler積](../../ANT/ANT3/index.md#thm-ant3-l-euler)と一致します。$N=1$ の場合は自明指標です。

このように古典的な $L$ 関数の導手、Gamma 因子、関数等式の定数が一つの大域積分から現れます。

また完成関数から元の関数を取り出すことにより解析接続できます。

$$
L(s,\chi)=
\frac{N^{-s/2}\pi^{(s+a)/2}}{\Gamma((s+a)/2)}
\Lambda(s,\chi).
$$

[逆Gamma関数のWeierstrass積](../../../解析系/CA/CA11/index.md#thm-ca11-reciprocal-product)より逆Gamma関数は整関数なので、非自明指標の $L$ 関数も整関数です。

自明指標の場合は $s=0$ の極が逆Gamma関数の零点で相殺され、$s=1$ の極だけが残ります。

次講では非可換群 $GL_2(\mathbb A)$ 上での不変性を調べます。

## 7. 演習

<a id="ex-afr10-a1"></a>

### A1. 乗法測度と加法測度

$p=5$ の殻 $5^{-2}\mathbb Z_5^\times$ の加法体積、絶対値、乗法体積を求めよ。

- Level: A
- ID: AFR10-A1

<!-- solution-start -->
**詳細解答。** [加法Haar測度の規格化](../AFR9/index.md#prop-afr9-local-measure)で単数群の体積は $1-1/5=4/5$ です。

$5^{-2}$ 倍の尺度係数は $25$ なので加法体積は $20$、殻上の絶対値は $25$ です。

[局所乗法測度](#def-afr10-multiplicative-measure)に代入して

$$
\frac{1}{1-1/5}\frac{20}{25}=1.
$$
<!-- solution-end -->

<a id="ex-afr10-a2"></a>

### A2. 不分岐積分の台を移す

$\chi_2(2)=-1$ で単数群上自明とする。$\Re s>0$ のもとで $Z_2(1_{4\mathbb Z_2},\chi_2,s)$ を求めよ。

- Level: A
- ID: AFR10-A2

<!-- solution-start -->
**詳細解答。** 台から零を除くと $k\ge2$ の殻 $2^k\mathbb Z_2^\times$ が残ります。各殻の乗法体積は $1$ であり、[不分岐局所ゼータ因子](#thm-afr10-unramified-factor)と同じ分割を用いて

$$
\begin{aligned}
Z_2&=\sum_{k=2}^\infty(-1)^k2^{-ks}\\
&=2^{-2s}\sum_{j=0}^\infty(-2^{-s})^j\\
&=\frac{2^{-2s}}{1+2^{-s}}.
\end{aligned}
$$

$|2^{-s}|<1$ なので絶対収束します。
<!-- solution-end -->

<a id="ex-afr10-a3"></a>

### A3. 実素点での偶奇

$\chi_\infty=\operatorname{sgn}$ とする。$Z_\infty(g_0,\chi_\infty,2)$ および $Z_\infty(g_1,\chi_\infty,1)$ を求めよ。

- Level: A
- ID: AFR10-A3

<!-- solution-start -->
**詳細解答。** 最初の被積分関数は加法測度に関して奇関数 $\operatorname{sgn}(x)|x|e^{-\pi x^2}$ です。絶対可積分なので正負の積分が相殺して零です。二つ目では $x\operatorname{sgn}(x)=|x|$ なので

$$
2\int_0^\infty re^{-\pi r^2}dr=\frac1\pi.
$$

置換 $w=\pi r^2$ で $2rdr=dw/\pi$ を用いました。[実局所ゼータ因子](#prop-afr10-real-factor)の $a=s=1$ に一致します。
<!-- solution-end -->

<a id="ex-afr10-a4"></a>

### A4. 分岐指標を打ち消す

法 $5$ の二次指標を単数上に持つ $\chi_5$ に対し、$Z_5(1_{\mathbb Z_5^\times},\chi_5,s)$ と $Z_5(h_5,\chi_5,s)$ を求めよ。

- Level: A
- ID: AFR10-A4

<!-- solution-start -->
**詳細解答。** 乗法測度は非零剰余類の四つを同じ体積 $1/4$ にします。台上の絶対値は $1$ なので最初の積分は

$$
(1-1-1+1)/4=0.
$$

二つ目では各剰余類で $h_5\chi_5=1$ です。従って $4/4=1$ となり、[分岐指標に適合する試験関数](#prop-afr10-ramified-test)の式に一致します。どちらも台が単数群に限られるため全ての $s$ で絶対収束します。
<!-- solution-end -->

<a id="ex-afr10-b1"></a>

### B1. 単数から大域指標を組み立てる

法 $5$ の二次指標を $\eta$ とし、$x_\infty=-2,x_2=4,x_5=1/5$、他の有限成分は $1$ とする。$\chi(x)$、$\chi_\infty(-1)$、$\chi_2(2)$ を求めよ。

- Level: B
- ID: AFR10-B1

<!-- solution-start -->
**詳細解答。** [有理数体のイデール類群の標準代表元](../AFR8/index.md#thm-afr8-idele-normal-form)で対角有理数は $q=-2^2/5=-4/5$ です。

正の実成分と $5$ 進単数を計算すると

$$
t=\frac{-2}{-4/5}=\frac52,\qquad
u_5=\frac{1/5}{-4/5}=-\frac14.
$$

法 $5$ で $4^{-1}=4$ なので

$$
u_5\equiv-4\equiv1\pmod5.
$$

従って $\chi(x)=1$ です。

実符号 $-1$ だけのイデールの標準代表元は対角 $-1$ で割って得られ、$5$ 進成分は $-1\equiv4$ です。よって $\chi_\infty(-1)=1$ です。

$2$ 進成分だけが $2$ なら対角 $2$ で割るので $5$ 進成分は $1/2\equiv3$ です。これは非平方剰余なので $\chi_2(2)=-1$ です。
<!-- solution-end -->

<a id="ex-afr10-b2"></a>

### B2. 分岐素点で変換と積分を検算する

法 $3$ の非自明二次指標から作った $\chi$ に対し、$\widehat h_3(1/3)$、$\widehat h_3(2/3)$、$\widehat h_3(1)$ を求めよ。さらに $Z_3(\widehat h_3,\chi_3^{-1},1-s)$ を計算せよ。

- Level: B
- ID: AFR10-B2

<!-- solution-start -->
**詳細解答。** 導手指数は $1$ です。[分岐試験関数のFourier変換](#thm-afr10-ramified-transform)を適用すると

$$
\widehat h_3(1/3)=
\frac{e^{2\pi i/3}-e^{4\pi i/3}}3
=\frac{i}{\sqrt3}.
$$

$2/3$ では $\chi_3(2)=-1$ により $-i/\sqrt3$ です。$1$ では整数上の指標が自明で和は $(1-1)/3=0$ です。

台は $3^{-1}\mathbb Z_3^\times$ であり、$x=3^{-1}v$ とすると $|x|_3=3$、$\chi_3(3)=1$ です。変換の単数指標と積分の逆指標が相殺され、乗法体積は $1$ なので

$$
Z_3(\widehat h_3,\chi_3^{-1},1-s)
=\frac{i}{\sqrt3}3^{1-s}.
$$
<!-- solution-end -->

<a id="ex-afr10-b3"></a>

### B3. 零の項が生む極

$\chi=1$、$f(x)=e^{-4\pi x_\infty^2}1_{\widehat{\mathbb Z}}(x_f)$ とする。$Z(f,1,s)$ の $s=0,1$ での留数を求め、零の項を除いたまま Poisson 和を使うと何が失われるか説明せよ。

- Level: B
- ID: AFR10-B3

<!-- solution-start -->
**詳細解答。** $f(0)=1$ です。

[GaussianのFourier変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform)の減衰係数を $4\pi$ とし、周波数 $\xi=2\pi y=0$ を代入すると、実変換の零での値は $\sqrt{\pi/(4\pi)}=1/2$ です。

有限側の加法体積は $1$ なので $\widehat f(0)=1/2$ です。

[Tateの大域関数等式の証明](#thm-afr10-global-functional-equation)で、整関数二つを除いた項は

$$
\frac{1}{2(s-1)}-\frac1s.
$$

従って $s=0$ の留数は $-1$、$s=1$ の留数は $1/2$ です。零を除いた和には $t^{-1}\widehat f(0)-f(0)$ が必要です。これを落とすと整関数二つだけになり、実際に存在する二つの極を誤って消してしまいます。
<!-- solution-end -->

<a id="ex-afr10-c1"></a>

### C1. 導手つき関数等式を再構成する

法 $4$ の非自明な指標 $\eta$（$1$ で $1$、$3$ で $-1$）から $\chi$ を作る。

1. 実素点の偶奇と分岐素点の導手指数を求めよ。
2. $G_2$ を計算し、$Z_2(\widehat h_2,\chi_2^{-1},1-s)$ を求めよ。
3. $L(s,\chi)$ の [Dirichlet 級数](../../ANT/ANT3/index.md#def-ant3-l-function)を明示せよ。
4. 完成関数の関数等式を導き、定数を確かめよ。

- Level: C
- ID: AFR10-C1

<!-- solution-start -->
**詳細解答。** 実符号 $-1$ だけのイデールを対角 $-1$ で割ると、有限単数の $2$ 成分は次を満たします。

$$
u_2=-1\equiv3\pmod4.
$$

よって $\chi_\infty(-1)=-1$、$a=1$ です。

$2$ 進単数は全て法 $2$ では $1$ ですが、法 $4$ の二つの単数で値が異なります。

従って導手指数は $2$、他の素数は不分岐です。

$2$ 進成分のみ $2$ のイデールを対角 $2$ で割ると $2$ 成分が $1$ になるので $\chi_2(2)=1$ です。

[分岐試験関数のFourier変換](#thm-afr10-ramified-transform)に $p=2,n=2$ を入れます。

$$
G_2=\frac{e^{2\pi i/4}-e^{6\pi i/4}}4
=\frac{i-(-i)}4=\frac i2.
$$

変換の台は $2^{-2}\mathbb Z_2^\times$、乗法体積は $1$ です。台上で $|x|_2=4$、単数指標は相殺されるので

$$
Z_2(\widehat h_2,\chi_2^{-1},1-s)=\frac i2\,4^{1-s}.
$$

奇素数 $\ell$ では対角 $\ell$ で割るため $\chi_\ell(\ell)=\eta(\ell^{-1}\bmod4)=\eta(\ell\bmod4)$ です。[Dirichlet L関数のEuler積](../../ANT/ANT3/index.md#thm-ant3-l-euler)を用い、法 $4$ の単数の値が $(-1)^m$（整数 $2m+1$ に対して）で偶数では零になることから

$$
L(s,\chi)=\sum_{m=0}^\infty\frac{(-1)^m}{(2m+1)^s}.
$$

逆指標は元の指標に等しいので、[完成Hecke L関数の関数等式](#thm-afr10-completed-l)で $N=4,a=1$ として

$$
\Lambda(s,\chi)=4^{s/2}\pi^{-(s+1)/2}
\Gamma((s+1)/2)L(s,\chi).
$$

定数は $(-i)\cdot 2\cdot(i/2)\cdot1^2=1$ です。よって $\Lambda(s,\chi)=\Lambda(1-s,\chi)$ となります。非自明指標では [大域関数等式](#thm-afr10-global-functional-equation)の定数項は消えるので、完成関数は整関数です。
<!-- solution-end -->

## 参考文献

- J. Tate, Fourier analysis in number fields and Hecke's zeta-functions, in Algebraic Number Theory, edited by J. W. S. Cassels and A. Fröhlich.
- D. Bump, Automorphic Forms and Representations, Cambridge University Press.
