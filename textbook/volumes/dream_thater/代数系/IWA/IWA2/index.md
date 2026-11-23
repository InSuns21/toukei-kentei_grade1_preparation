# IWA2 円分Z_p拡大とGalois群

[IWA1の有限層と逆極限](../IWA1/index.md#thm-iwa1-galois-inverse-limit)では、無限Galois群が $\mathbb Z_p$ なら有限層の群は $\mathbb Z/p^n\mathbb Z$ になると分かりました。[ANF22の円分的な塔](../../ANF/ANF22/index.md#thm-anf22-cyclotomic-zp-tower)は、その条件を満たす実例です。しかし、円分体そのもののGalois群は一般に $\mathbb Z/p^n\mathbb Z$ ではありません。余分な有限群をどう取り除くか、そして取り除いた後の各層をどう一貫した座標で計算するかが本講の問いです。

本講では素数 $p$ を固定します。奇素数と $p=2$ を区別し、最後に両者を統一します。円分体の根は $\zeta_m=\exp(2\pi i/m)$ と表し、$r\ge1$ で
$$
E_r=\mathbb Q(\zeta_{p^r}),\qquad G_r=\operatorname{Gal}(E_r/\mathbb Q)
$$
と書きます。[素数冪円分体の次数](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)により $\lvert G_r\rvert=\varphi(p^r)=p^{r-1}(p-1)$ です。Galois自己同型は根への作用だけで決まり、
$$
\sigma_a(\zeta_{p^r})=\zeta_{p^r}^{a},\qquad
a\in(\mathbb Z/p^r\mathbb Z)^\times
$$
によって $G_r\simeq(\mathbb Z/p^r\mathbb Z)^\times$ となります。以下で「群の元 $a$」と書くときはこの対応を使います。

## 1. 有限円分体をつなぐ制限写像

有限円分体を単に並べるのでなく、$E_r\subset E_{r+1}$ のもとで自己同型を制限する操作を調べます。根の間には $\zeta_{p^{r+1}}^p=\zeta_{p^r}$ があるため、
$$
\sigma_a(\zeta_{p^r})=\sigma_a(\zeta_{p^{r+1}}^p)
=(\zeta_{p^{r+1}}^a)^p=\zeta_{p^r}^{a\bmod p^r}.
$$
つまり制限写像は単元の剰余還元そのものです。

<a id="prop-iwa2-cyclotomic-restriction"></a>

<!-- formal-statement-start -->
> **命題（円分Galois群の制限列）**  
> 素数 $p$ と整数 $r\ge1$ に対し、$E_r=\mathbb Q(\zeta_{p^r})$ とする。制限準同型
> $\operatorname{res}_{r+1,r}:G_{r+1}\to G_r$ は単元群の還元に対応する全射であり、核は
$$
\ker(\operatorname{res}_{r+1,r})
=\{1+tp^r\bmod p^{r+1}:0\le t<p\}\simeq\mathbb Z/p\mathbb Z.
$$
> 特に $[E_{r+1}:E_r]=p$ である。
<!-- formal-statement-end -->

### 証明の見取り図

根の冪の関係から制限を還元に翻訳し、還元の各剰余類の持ち上げを数えます。

<!-- proof-start -->
### 証明

上の計算から制限は $a\bmod p^{r+1}\mapsto a\bmod p^r$ です。$a$ が $p$ と互いに素なら、$a,a+p^r,\ldots,a+(p-1)p^r$ はすべて $p$ と互いに素で、互いに異なる法 $p^{r+1}$ の元です。したがって還元は全射です。単位元へ写るものは $a\equiv1\pmod{p^r}$ なので表示した $p$ 個に尽きます。核の位数は $p$ ですから巡回群であり、Galois対応から $[E_{r+1}:E_r]=p$ となります。
<!-- proof-end -->

**直接計算。** $p=3$ のとき $G_2=(\mathbb Z/9\mathbb Z)^\times=\{1,2,4,5,7,8\}$ です。$G_1=(\mathbb Z/3\mathbb Z)^\times=\{1,2\}$ へ還元すると、核は $\{1,4,7\}$。位数3の部分群がすでに現れています。しかし $G_2$ 自体は位数6なので、$G_2$ をそのまま「第1層のGalois群」と呼んではいけません。

## 2. 奇素数：有限部分とp冪部分を分ける

ここから $p$ を奇素数とします。$G_{n+1}$ から法 $p$ への還元
$$
\rho_n:(\mathbb Z/p^{n+1}\mathbb Z)^\times
\longrightarrow(\mathbb Z/p\mathbb Z)^\times
$$
には、核 $U_n=\{a:a\equiv1\pmod p\}$ があり、位数は $p^n$ です。残る位数 $p-1$ の部分を持ち上げれば、群は二つに分かれます。

持ち上げるべき元は $a^{p-1}=1$ を満たすものです。法 $p$ では全ての非零剰余類がこの等式を満たします。次の一意性により、有限段でもそれぞれちょうど一つの根が得られます。

<a id="def-iwa2-teichmueller-lifts"></a>

<!-- formal-statement-start -->
> **定義（有限段のTeichmüller持ち上げ）**  
> 奇素数 $p$ と $n\ge0$ に対して
$$
\Delta_n=\{d\in(\mathbb Z/p^{n+1}\mathbb Z)^\times:d^{p-1}=1\}
$$
> とする。$a\in(\mathbb Z/p\mathbb Z)^\times$ に対し、$d\equiv a\pmod p$ となる $\Delta_n$ の元を $\omega_n(a)$ と呼ぶ。
<!-- formal-statement-end -->

<a id="prop-iwa2-teichmueller-lifting"></a>

<!-- formal-statement-start -->
> **命題（有限段Teichmüller持ち上げの存在・一意性）**  
> 奇素数 $p$ と $n\ge0$ について、各 $a\in(\mathbb Z/p\mathbb Z)^\times$ に対し $\omega_n(a)$ がただ一つ存在する。$\Delta_n$ は位数 $p-1$ の部分群であり、還元 $\Delta_n\to(\mathbb Z/p\mathbb Z)^\times$ は同型である。また $\omega_{n+1}(a)\equiv\omega_n(a)\pmod{p^{n+1}}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

多項式 $f(X)=X^{p-1}-1$ を法 $p$ の根から一桁ずつ持ち上げます。各桁で現れる一次式の係数が単元なので、次の桁が一意に決まります。

<!-- proof-start -->
### 証明

法 $p$ の非零元 $a$ はFermatの小定理から $f(a)\equiv0\pmod p$ です。導関数は $f'(a)=(p-1)a^{p-2}\not\equiv0\pmod p$。これは[Henselの単純根の持ち上げ](../../ANF/ANF10/index.md#thm-anf10-hensel-simple)の仮定です。実際、$f(d)\equiv0\pmod{p^k}$ を満たす $d$ から $d+tp^k$ へ進むと、
$$
f(d+tp^k)\equiv f(d)+tp^kf'(d)\pmod{p^{k+1}}.
$$
$p^k$ で割って法 $p$ で考えると $f'(d)t\equiv-f(d)/p^k\pmod p$ です。$f'(d)$ は法 $p$ で可逆なので $t\bmod p$ は一意に決まります。帰納して法 $p^{n+1}$ の根が一意に存在します。根同士の積・逆元も $p-1$ 乗が1なので根の集合は部分群です。還元が一対一かつ全射であることから位数は $p-1$ です。持ち上げの一意性は階層間の両立性も与えます。
<!-- proof-end -->

<!-- definition-example-start: def-iwa2-teichmueller-lifts -->
**定義を実際に判定する例。** $p=5,n=1$、法5で $a=2$ とします。$d=2+5t$ と置くと
$$
(2+5t)^4\equiv16+4\cdot8\cdot5t
\equiv16+10t\pmod{25}.
$$
したがって $d^4\equiv1\pmod{25}$ は $10t\equiv10\pmod{25}$、すなわち $t\equiv1\pmod5$ と同値です。よって $\omega_1(2)=7$。確認すると $7^2\equiv-1\pmod{25}$ なので $7^4\equiv1$ であり、$7\equiv2\pmod5$ も満たします。根の条件と還元の条件の両方を確認しました。
<!-- definition-example-end -->

## 3. 分解とその座標

$\Delta_n$ が有限部分、$U_n$ が $p$ 冪部分です。どちらも乗法群の部分群ですが、$\Delta_n$ の元と $U_n$ の元が同じものを二重に表してはいけません。この問題は交わりが単位元だけであることを示せば解決します。

<a id="thm-iwa2-odd-splitting"></a>

<!-- formal-statement-start -->
> **定理（奇素数の $\Delta_n\times U_n$ 分解）**  
> 奇素数 $p$、整数 $n\ge0$ に対し、$\Delta_n$ と $U_n=1+p\mathbb Z/p^{n+1}\mathbb Z$ を上のように定める（右辺は法 $p^{n+1}$ の単元のうち $1\bmod p$ の元を意味する）。積写像
$$
\Delta_n\times U_n\longrightarrow
(\mathbb Z/p^{n+1}\mathbb Z)^\times,\qquad(d,u)\longmapsto du
$$
> は群同型である。従って全ての単元 $a$ は一意に
$$
a=\omega_n(\bar a)\,u,\qquad
u=\omega_n(\bar a)^{-1}a\in U_n
$$
> と書ける。ここで $\bar a=a\bmod p$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Delta_n$ の各剰余類にはただ一つの代表があり、その代表で割れば $1\bmod p$ が残ります。

<!-- proof-start -->
### 証明

$\Delta_n\cap U_n$ の元 $x$ は $x^{p-1}=1$ かつ $x\equiv1\pmod p$ です。[持ち上げの一意性](#prop-iwa2-teichmueller-lifting)から $x=1$。任意の $a$ に対して $d=\omega_n(\bar a)$ を取ると、$u=d^{-1}a$ の還元は $\bar a^{-1}\bar a=1$ であり、$u\in U_n$。これで全射です。$du=d'u'$ なら $d^{-1}d'=uu'^{-1}\in\Delta_n\cap U_n$ なので $d=d',u=u'$。群は可換なので積写像は準同型であり、同型となります。
<!-- proof-end -->

$p$ 冪部分を数値で扱うため、$g=1+p$ の冪で座標を付けます。[ANF22の奇素数円分塔の証明](../../ANF/ANF22/index.md#thm-anf22-cyclotomic-zp-tower)では
$$
v_p((1+p)^{p^k}-1)=k+1\qquad(k\ge0)
$$
を二項定理から導きました。従って $g$ の法 $p^{n+1}$ での位数は $p^n$ であり、$\lvert U_n\rvert=p^n$ なので $U_n=\langle g\rangle$ です。

<a id="prop-iwa2-odd-exponent-coordinates"></a>

<!-- formal-statement-start -->
> **命題（生成元による指数座標）**  
> 奇素数 $p$、$n\ge0$ に対し $g=1+p$ とする。各 $u\in U_n$ にはただ一つの $k\bmod p^n$ が存在して $u=g^k\bmod p^{n+1}$ と書ける。また制限 $U_{n+1}\to U_n$ は、この指数座標で $k\bmod p^{n+1}\mapsto k\bmod p^n$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

位数 $p^n$ の巡回群の生成元の冪を座標とし、還元が同じ整数 $g$ を保つことを使います。

<!-- proof-start -->
### 証明

上の付値公式から $g^{p^n}\equiv1\pmod{p^{n+1}}$ で、$n\ge1$ なら $g^{p^{n-1}}\not\equiv1\pmod{p^{n+1}}$ です。従って位数は $p^n$。$U_n$ の位数も $p^n$ なので $g^k$（$0\le k<p^n$）が各元を一度ずつ表します。法 $p^{n+1}$ への還元は $g^k$ を $g^k$ に送るので、指数の合同類を還元する写像です。$n=0$ では $U_0$ が自明群であり、同じ主張が成り立ちます。
<!-- proof-end -->

**数値例。** $p=5,n=1$ では $\omega_1(2)=7$、$g=6$。$2\equiv7\cdot11\pmod{25}$ であり、$11\equiv6^2\pmod{25}$。すなわち $2=\omega_1(2)g^2$ です。元の単元 $2$ に「有限部分 $7$」と「指数座標 $2$」が対応しました。

## 4. 固定体の塔と無限群

$p$ 奇素数として $n\ge0$ に対し
$$
K_n=E_{n+1}^{\Delta_n},\qquad
K_\infty=\bigcup_{n\ge0}K_n
$$
とします。$\Delta_n$ はGalois群の部分群なので、その固定体は対応する中間体です。$\Delta_n$ は可換群 $G_{n+1}$ の正規部分群ですから、$K_n/\mathbb Q$ はGalois拡大です。

<a id="thm-iwa2-compatible-tower"></a>

<!-- formal-statement-start -->
> **定理（分解から得る円分 $\mathbb Z_p$ 塔の両立性）**  
> 奇素数 $p$ について上記の $K_n$ を取ると
$$
K_0=\mathbb Q\subset K_1\subset\cdots,\qquad
\operatorname{Gal}(K_n/\mathbb Q)\simeq U_n
\simeq\mathbb Z/p^n\mathbb Z.
$$
> $K_{n+1}\to K_n$ のGalois群の制限は右端の剰余還元に対応し、
$$
\operatorname{Gal}(K_\infty/\mathbb Q)\simeq
\varprojlim_n U_n\simeq\mathbb Z_p
$$
> は位相群同型である。この位相群の生成元 $\gamma$ は各段で $g=1+p$ の作用として表せる。
<!-- formal-statement-end -->

### 証明の見取り図

$\Delta$ の持ち上げの両立性で固定体の包含を出し、商群の制限を指数座標の還元に翻訳します。

<!-- proof-start -->
### 証明

[有限段の持ち上げ](#prop-iwa2-teichmueller-lifting)は $\Delta_{n+1}$ を $\Delta_n$ に還元します。従って $\Delta_{n+1}$ の元は $E_{n+1}$ の部分体 $E_{n+1}$ の中の $K_n$ を固定し、$K_n\subseteq K_{n+1}$ です。$K_0=E_1^{G_1}=\mathbb Q$。Galois対応と[積分解](#thm-iwa2-odd-splitting)により
$$
\operatorname{Gal}(K_n/\mathbb Q)
\simeq G_{n+1}/\Delta_n\simeq U_n.
$$
さらに[指数座標](#prop-iwa2-odd-exponent-coordinates)は全ての制限と両立します。[IWA1の逆極限定理](../IWA1/index.md#thm-iwa1-galois-inverse-limit)をこのGalois塔に適用すると
$$
\operatorname{Gal}(K_\infty/\mathbb Q)
\simeq\varprojlim_n\mathbb Z/p^n\mathbb Z
\simeq\mathbb Z_p.
$$
位相は左辺のKrull位相と右辺の逆極限位相です。各段の生成元 $g$ は還元で一致するため互換な自己同型列 $\gamma$ を定めます。その指数座標は $(1\bmod p^n)_n$、すなわち $\mathbb Z_p$ の元 $1$ です。[IWA1の位相的生成元判定](../IWA1/index.md#prop-iwa1-generator-criterion)から $\gamma$ の冪は群全体に稠密です。
<!-- proof-end -->

**三次層の具体例。** $p=3$ では $\Delta_1=\{\pm1\}\subset(\mathbb Z/9\mathbb Z)^\times$、$U_1=\{1,4,7\}$。固定体 $K_1$ は $\mathbb Q(\zeta_9+\zeta_9^{-1})$ です。$\alpha=\zeta_9+\zeta_9^{-1}$ は
$$
\alpha^3-3\alpha+1=0
$$
を満たし、この多項式は有理根 $\pm1$ を持たないため $\deg_{\mathbb Q}\alpha=3$。[IWA1の円分第一層の計算](../IWA1/index.md#thm-iwa1-layer-tower)で扱った次数3の層が、ここでは $g=4$ の作用 $\alpha\mapsto\zeta_9^4+\zeta_9^{-4}$ を持つGalois拡大として見えます。

## 5. 素数2では何が変わるか

$p=2$ では $(\mathbb Z/2^r\mathbb Z)^\times$ に $-1$ と $5$ が現れます。$1+2=3$ をそのまま使うと、$3\not\equiv1\pmod4$ なので分解に適した主単元の生成元になりません。位数の異なる二つの因子を区別するため、法を $2^{n+2}$ から始めます。

$n\ge0$ について
$$
H_n=(\mathbb Z/2^{n+2}\mathbb Z)^\times,\quad
\Delta_n^{(2)}=\{1,-1\},\quad
V_n=\{u\in H_n:u\equiv1\pmod4\}
$$
と定めます。$V_n$ は $H_n$ の部分群であり、$n=0$ のときは自明群です。

<a id="thm-iwa2-two-adic-splitting"></a>

<!-- formal-statement-start -->
> **定理（2進単元の符号部分と主単元部分）**  
> 整数 $n\ge0$ に対して積写像
$$
\Delta_n^{(2)}\times V_n\xrightarrow{\ \sim\ }
(\mathbb Z/2^{n+2}\mathbb Z)^\times
$$
> は同型である。$V_n$ は $5\bmod2^{n+2}$ が生成する位数 $2^n$ の巡回群である。従って
$$
\mathbb Q(\zeta_{2^{n+2}})^{\Delta_n^{(2)}}
=\mathbb Q(\zeta_{2^{n+2}}+\zeta_{2^{n+2}}^{-1})
$$
> は次数 $2^n$ のGalois拡大であり、その制限写像は $5$ の指数座標で法 $2^n$ の還元である。
<!-- formal-statement-end -->

### 証明の見取り図

単元は法4で $1$ または $-1$ なので符号部分と分離できます。$5$ の位数は二乗差から正確に計算します。

<!-- proof-start -->
### 証明

$H_n$ の各元 $a$ は奇数であり、$a\equiv1$ または $-1\pmod4$ です。従って $a=\varepsilon u$（$\varepsilon\in\{\pm1\},u\in V_n$）と書けます。$\Delta_n^{(2)}\cap V_n=\{1\}$ なので一意です。$|H_n|=2^{n+1}$、$|\Delta_n^{(2)}|=2$ より $|V_n|=2^n$。

$5^{2^k}$ を $x_k$ と置くと $x_k\equiv1\pmod4$ なので $x_k+1\equiv2\pmod4$ です。$x_0-1=4$ から帰納的に
$$
v_2(x_{k+1}-1)=v_2(x_k^2-1)
=v_2(x_k-1)+v_2(x_k+1)=k+3.
$$
従って $v_2(5^{2^k}-1)=k+2$ であり、$5$ の法 $2^{n+2}$ での位数はちょうど $2^n$ です。よって $V_n=\langle5\rangle$。$\Delta_n^{(2)}$ は複素共役に対応し、固定体は $\zeta+\zeta^{-1}$ で生成されます。$5$ は還元しても $5$ なので、指数座標での制限写像は還元です。
<!-- proof-end -->

<!-- definition-example-start: thm-iwa2-two-adic-splitting -->
**2進の直接例。** $n=1$ では法8の単元は $\{1,3,5,7\}$、符号部分 $\{1,7\}$、$V_1=\{1,5\}$ です。積で4元全てを一意に表せます。固定体 $K_1^{(2)}=\mathbb Q(\zeta_8+\zeta_8^{-1})=\mathbb Q(\sqrt2)$。$5$ の作用は $\sqrt2\mapsto-\sqrt2$ であり、確かに2次拡大の非自明なGalois元です。
<!-- definition-example-end -->

この定理を各 $n$ に適用して制限を取れば、[ANF22の2進円分塔](../../ANF/ANF22/index.md#prop-anf22-two-adic-tower)が $\mathbb Z_2$ 拡大になることを指数座標から再確認できます。ここで $\Delta_n^{(2)}$ と $V_n$ は奇素数の $\Delta_n,U_n$ に対応しますが、$p=2$ では指数を2段ずらすことを忘れないでください。

## 6. Frobeniusで分解を読む

円分塔の群が計算できると、素数 $\ell\ne p$ の振る舞いも分かります。この場合の $\ell$ は[素数冪円分体の非分岐性](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)により非分岐です。非分岐な素数のFrobenius元は剰余体の $x\mapsto x^\ell$ という写像に対応し、円分体では $\zeta_{p^{n+1}}\mapsto\zeta_{p^{n+1}}^\ell$ となります。

<a id="prop-iwa2-frobenius-projection"></a>

<!-- formal-statement-start -->
> **命題（奇素数の円分層におけるFrobenius判定）**  
> 奇素数 $p$、整数 $n\ge0$ と素数 $\ell\ne p$ に対し、$K_n= \mathbb Q(\zeta_{p^{n+1}})^{\Delta_n}$ とする。$\ell$ のFrobenius元は $G_{n+1}/\Delta_n\simeq U_n$ において
$$
[\ell]\longmapsto\omega_n(\ell\bmod p)^{-1}\ell\bmod p^{n+1}
$$
> である。特に $\ell$ が $K_n/\mathbb Q$ で完全分解する必要十分条件は
$$
\ell^{p-1}\equiv1\pmod{p^{n+1}}
$$
> である。
<!-- formal-statement-end -->

### 証明の見取り図

円分体でのFrobeniusを固定体へ制限し、$\Delta_n$ 成分を除いた元の位数を調べます。

<!-- proof-start -->
### 証明

$\ell\ne p$ なのでFrobenius元は $G_{n+1}$ で単元 $\ell$ に対応します。[Galois群の制限とFrobeniusの両立性](../../ANF/ANF21/index.md#prop-anf21-restriction)から $K_n$ でのFrobeniusはその $\Delta_n$ による商の像です。[積分解](#thm-iwa2-odd-splitting)より、その像は $\omega_n(\ell\bmod p)^{-1}\ell\in U_n$ となります。[非分岐素数の分解とFrobenius位数](../../ANF/ANF21/index.md#prop-anf21-frobenius-order)から完全分解はこの像が単位元であることと同値です。これは $\ell\bmod p^{n+1}\in\Delta_n$ と同値であり、[持ち上げの一意性](#prop-iwa2-teichmueller-lifting)により $\ell^{p-1}\equiv1\pmod{p^{n+1}}$ と同値です。
<!-- proof-end -->

**計算例。** $p=5,n=1$ とすると $K_1/\mathbb Q$ は5次巡回拡大です。$\ell=2$ では前節の計算から $2=7\cdot6^2$（法25）なのでFrobeniusは生成元 $6$ の2乗、位数5です。従って2はこの5次層で惰性（剰余次数5）。$\ell=101$ では $101\equiv1\pmod{25}$ なので完全分解します。異なる素数で分解型が変わることを、一つの指数座標で見られます。

## 7. 無限円分群と有限ねじれの切り分け

$p$ 奇素数なら各段の積分解は還元と両立し、
$$
\operatorname{Gal}\bigl(\mathbb Q(\zeta_{p^\infty})/\mathbb Q\bigr)
\simeq \varprojlim_n(\mathbb Z/p^{n+1}\mathbb Z)^\times
\simeq \Delta\times\Gamma,
$$
ここで $\Delta\simeq(\mathbb Z/p\mathbb Z)^\times$、$\Gamma\simeq\mathbb Z_p$ です。$\Delta$ の元は各段の $\omega_n(a)$ を並べたもの、$\Gamma$ の元は各段の $(1+p)^k$ の指数を並べたものです。$p=2$ なら
$$
\operatorname{Gal}\bigl(\mathbb Q(\zeta_{2^\infty})/\mathbb Q\bigr)
\simeq\{\pm1\}\times\Gamma,\qquad \Gamma\simeq\mathbb Z_2,
$$
であり、$\Gamma$ の生成元には $5$ を使います。いずれも $\Gamma$ は $\mathbb Z_p$ という加法位相群に対応する、乗法記法のGalois群です。

**何が一意なのか。** 有限位数で $p$ と互いに素な元は $\mathbb Z_p$ へ準同型で送ると必ず単位元になります。$p=2$ の符号元 $-1$ も、加法群 $\mathbb Z_2$ に位数2の非零元がないので消えます。従って全円分群から $\mathbb Z_p$ への連続全射は $\Delta$ を核に含み、その固定体はこの円分的 $\mathbb Z_p$ 塔の中に収まります。[IWA1の閉部分群分類](../IWA1/index.md#thm-iwa1-closed-subgroups)により $\mathbb Z_p$ への全射の核は自明なので、この塔が **$p$ 冪円分拡大全体に含まれる $\mathbb Z_p$ 拡大として一意** です。ここから一般の数体のすべての $\mathbb Z_p$ 拡大が一意だとは結論できません。

有限層の数論的な性質もはっきりします。[ANF22の完全分岐の証明](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)から $p$ は $E_r/\mathbb Q$ で完全分岐するので、塔の中間体 $K_n/\mathbb Q$ でも完全分岐し、$p$ 以外の有限素数は非分岐です。これは全有限素点で非分岐なHilbert類体とは別の構成です。次講ではこの $\Gamma$ の有限商を一つの環へまとめ、群の作用を代数的に扱います。

## 8. 演習：有限段・分解・Frobeniusを手で確かめる

### A1. 制限の核

$p=5,r=2$ とする。$G_3\to G_2$ の核を列挙し、その位数と拡大次数を求めよ。

- Level: A
- ID: IWA2-A1

<!-- solution-start -->
**詳細解答**。[制限列の命題](#prop-iwa2-cyclotomic-restriction)で核は $1+25t\bmod125$（$0\le t<5$）。従って $\{1,26,51,76,101\}$ で位数5です。還元は全射なので、Galois対応から $[\mathbb Q(\zeta_{125}):\mathbb Q(\zeta_{25})]=5$ です。
<!-- solution-end -->

### A2. $\Delta_1$ の小さな計算

$p=3,n=1$ で $\Delta_1$ と $U_1$ を列挙し、それらの積が全単元となることを確認せよ。

- Level: A
- ID: IWA2-A2

<!-- solution-start -->
**詳細解答**。法9の単元群は $\{1,2,4,5,7,8\}$。$d^2\equiv1\pmod9$ の解は $1,8$ なので $\Delta_1=\{1,8\}$。$1\bmod3$ の元は $U_1=\{1,4,7\}$。$8U_1=\{8,5,2\}$ なので $\Delta_1U_1=\{1,4,7,8,5,2\}$ が全単元で、両集合の交わりは $\{1\}$ です。
<!-- solution-end -->

### A3. 生成元の位数

$p=3$ のとき $g=4$ の法 $9$、法 $27$ での位数を計算せよ。

- Level: A
- ID: IWA2-A3

<!-- solution-start -->
**詳細解答**。法9では $4^2\equiv7$、$4^3=64\equiv1$、かつ $4\not\equiv1$ なので位数3。法27では $4^3=64\equiv10$、$4^9=(4^3)^3\equiv10^3=1000\equiv1$。$4^3\not\equiv1\pmod{27}$ なので位数は9です。これは[指数座標の命題](#prop-iwa2-odd-exponent-coordinates)の $n=1,2$ に一致します。
<!-- solution-end -->

### A4. 2進の直積

法16の単元を $\{\pm1\}\times\langle5\rangle$ に分解し、$5$ の位数を求めよ。

- Level: A
- ID: IWA2-A4

<!-- solution-start -->
**詳細解答**。法16の単元は $\{1,3,5,7,9,11,13,15\}$ です。$5^2\equiv9$、$5^3\equiv13$、$5^4\equiv1$ なので $\langle5\rangle=\{1,5,9,13\}$ で位数4。$-\langle5\rangle=\{15,11,7,3\}$ で、前者と交わらず全8元を覆います。よって二因子の積は直積です。
<!-- solution-end -->

### A5. $\Delta$ と生成元の座標

$p=5,n=1$ とする。単元 $2\bmod25$ を $\Delta_1$ 成分と $6$ の冪に分けよ。さらに $2$ の $K_1$ 上のFrobeniusの位数を求めよ。

- Level: A
- ID: IWA2-A5

<!-- solution-start -->
**詳細解答**。[持ち上げの計算](#prop-iwa2-teichmueller-lifting)より $\omega_1(2)=7$。$7^{-1}\equiv18\pmod{25}$ なので $7^{-1}2\equiv36\equiv11\pmod{25}$。$6^2=36\equiv11$ より $2\equiv7\cdot6^2$。$6$ の位数は5なので $6^2$ も位数5で、[Frobenius判定](#prop-iwa2-frobenius-projection)により剰余次数5です。
<!-- solution-end -->

### B1. 有限段の持ち上げを自力で作る

$p=5$ で法5の元 $a=3$ を $\Delta_1$ に持ち上げよ。得られた $d$ が $d^4\equiv1\pmod{25}$ を満たすことを確かめよ。

- Level: B
- ID: IWA2-B1

<!-- solution-start -->
**詳細解答**。$d=3+5t$ と置き、二項展開すると
$$
(3+5t)^4\equiv3^4+4\cdot3^3\cdot5t
\equiv81+15t\equiv6+15t\pmod{25}.
$$
従って $6+15t\equiv1\pmod{25}$、$15t\equiv20\pmod{25}$、法5に割って $3t\equiv4\pmod5$。$3^{-1}\equiv2$ だから $t\equiv3\pmod5$。よって $d=18$。$18\equiv3\pmod5$ で、$18^2=324\equiv-1\pmod{25}$、従って $18^4\equiv1$ です。両条件と[持ち上げの一意性](#prop-iwa2-teichmueller-lifting)から $\omega_1(3)=18$ です。
<!-- solution-end -->

### B2. 層間の核

$p=3$ とし $K_1\subset K_2$ を考える。$U_2\to U_1$ の核を求め、$[K_2:K_1]$ を確認せよ。

- Level: B
- ID: IWA2-B2

<!-- solution-start -->
**詳細解答**。$U_2=\{u\bmod27:u\equiv1\pmod3\}$ は位数9、$U_1=\{1,4,7\}\bmod9$ は位数3です。還元の核は $1\bmod9$ の元 $\{1,10,19\}\bmod27$ で、$10^2=100\equiv19\pmod{27}$、$10^3\equiv1$ なので巡回位数3です。[塔の両立性](#thm-iwa2-compatible-tower)から $\operatorname{Gal}(K_2/K_1)$ はこの核に対応し、次数は $3$ です。
<!-- solution-end -->

### B3. 完全分解の合同条件

$p=5,n=1$ において、素数 $101$ と $11$ の $K_1/\mathbb Q$ での分解を判定せよ。

- Level: B
- ID: IWA2-B3

<!-- solution-start -->
**詳細解答**。両素数は $5$ と異なり非分岐です。$101\equiv1\pmod{25}$ より $101^4\equiv1\pmod{25}$ なので[完全分解判定](#prop-iwa2-frobenius-projection)で完全分解し、次数5の場に次数1の素点を5個与えます。$11\equiv1\pmod5$ なので $\omega_1(11\bmod5)=1$、Frobeniusは $11\bmod25$ です。$11^2=121\equiv21$、$11^3\equiv6$、$11^4\equiv16$、$11^5\equiv1\pmod{25}$。$11\not\equiv1$ なので位数5となり、11は惰性で剰余次数5の素点を1個与えます。
<!-- solution-end -->

### B4. 2進で3が不適切な理由

法16では $3$ 自身も位数4である。それでも $\langle3\rangle$ は $V_2=1+4\mathbb Z/16\mathbb Z$ と一致しないことを示し、何が壊れるか説明せよ。

- Level: B
- ID: IWA2-B4

<!-- solution-start -->
**詳細解答**。$3^2\equiv9$、$3^3\equiv11$、$3^4\equiv1\pmod{16}$ より $\langle3\rangle=\{1,3,9,11\}$。一方 $V_2=\{1,5,9,13\}$ であり、$3\notin V_2$ なので一致しません。さらに $-1\equiv15$ は $\langle3\rangle$ に属さないので、法16だけなら符号との直積を作れます。しかし法8へ還元すると $3$ の位数は2で、$V_1=\{1,5\}$ に還元される像は $3\bmod8$ となり $1\bmod4$ の条件を破ります。従って階層を通じて主単元を統一する座標としては使えません。反対に $5$ はすべての段で $1\bmod4$ です。
<!-- solution-end -->

### C1. 第二層までの統合計算

$p=5$ の奇素数円分塔で、(i) $K_2/\mathbb Q$ の次数とGalois群、(ii) $K_2/K_1$ の次数、(iii) 素数2の $K_2$ での剰余次数、(iv) $5$ での分岐指数を求めよ。計算には $2^4=16$ を使ってよい。

- Level: C
- ID: IWA2-C1

<!-- solution-start -->
**詳細解答**。(i) $E_3=\mathbb Q(\zeta_{125})$ の次数は $\varphi(125)=100$。[持ち上げの命題](#prop-iwa2-teichmueller-lifting)から $|\Delta_2|=4$ なので $[K_2:\mathbb Q]=100/4=25$。[塔の両立性](#thm-iwa2-compatible-tower)からそのGalois群は $U_2\simeq\mathbb Z/25\mathbb Z$。

(ii) 同じ議論で $[K_1:\mathbb Q]=5$。従って $[K_2:K_1]=25/5=5$。Galois群の還元核の位数も $25/5=5$ で整合します。

(iii) $\ell=2$ は5と異なるので非分岐です。$2^4=16=1+15$ は $v_5(16-1)=1$。奇素数の二項展開と同じ評価で
$$
v_5(16^{5^k}-1)=k+1,\qquad k\ge0.
$$
特に $16^5\not\equiv1\pmod{125}$（付値2）、$16^{25}\equiv1\pmod{125}$（付値3）。$2$ の法125での像の25乗は単位元であり、5乗は単位元でないことを示すには、商の中で $[2]^5=1$ なら $2^5\in\Delta_2$ となり、$(2^5)^4=16^5\equiv1\pmod{125}$ のはずですが、これに反します。一方 $[2]^{25}=1$ は $(2^{25})^4=16^{25}\equiv1\pmod{125}$ から従います。従って $[2]\in G_3/\Delta_2$ の位数は25で、[Frobeniusと剰余次数](../../ANF/ANF21/index.md#prop-anf21-frobenius-order)から2の剰余次数は25です。つまり2は $K_2$ でも惰性です。

(iv) [素数冪円分体での完全分岐](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)により5は $E_3/\mathbb Q$ で完全分岐します。その中間体 $K_2$ においても唯一の上の素点があり、剰余次数は1、分岐指数は $[K_2:\mathbb Q]=25$ です。
<!-- solution-end -->

## 9. 次講への問い

有限段の群 $\operatorname{Gal}(K_n/\mathbb Q)$ は指数座標で $\mathbb Z/p^n\mathbb Z$、無限群は $\Gamma\simeq\mathbb Z_p$ と分かりました。ところが数論で必要なのは、群の元を一つ選んで作用させる操作だけではありません。全ての有限段に整合する形式的な和や、加群に対する群の作用をまとめて扱いたくなります。**IWA3では $\mathbb Z_p[[\Gamma]]$ を構成し、位相的生成元 $\gamma$ に対して $T=\gamma-1$ と置く理由を説明します。**
