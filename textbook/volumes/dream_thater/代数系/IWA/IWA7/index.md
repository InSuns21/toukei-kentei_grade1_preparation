# IWA7 類数成長公式とμ不変量の役割

[IWA6の特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic)は、無限塔で現れる加群に二つの整数 $\mu,\lambda$ を付けました。今回はこれを**有限層の類数がどれほど速く増えるか**という実際に数えられる量へ結び付けます。

出発点は次の二つの問いです。

1. 岩澤代数の加群を有限層へ落とすと、位数の $p$ 進指数に $\mu p^n+\lambda n$ が現れるのはなぜでしょうか。
2. その代数的計算を数体の類群に適用するには、何を別に証明しなければならないでしょうか。

本講ではまず**代数側の成長機構を証明**し、その後に数体の類数成長を述べます。Ferrero–Washingtonの $\mu=0$ 定理についても、成り立つ拡大の範囲を固定します。

## 1. 数体の層と加群の層

素数 $p$ と、数体 $F$ の $\mathbb Z_p$ 拡大 $F_\infty/F$ を固定します。これは $F_n\subset F_{n+1}$、$[F_n:F]=p^n$、$F_\infty=\bigcup_{n\ge0}F_n$、$\operatorname{Gal}(F_\infty/F)\simeq\mathbb Z_p$ という塔です。[IWA2の円分塔](../IWA2/index.md#thm-iwa2-compatible-tower)は代表例ですが、今回の類数成長定理そのものは円分塔に限りません。

$F_n$ のイデアル類群 $\operatorname{Cl}(F_n)$ は有限アーベル群です。$p$ の冪の位数を持つ元全体を $A_n=\operatorname{Cl}(F_n)[p^\infty]$ と書きます。その位数を $|A_n|=p^{e_n}$ と書くと、$e_n=v_p(h(F_n))$ です。ここで $h(F_n)$ は類数、$v_p$ は素因数 $p$ の指数を数える関数です。

[IWA4の類群逆極限への作用](../IWA4/index.md#thm-iwa4-iwasawa-action)に従い、層間のノルム $N_{F_{n+1}/F_n}:A_{n+1}\to A_n$ を使って $X=\varprojlim A_n$ を作ります。位相的生成元 $\gamma$ を一つ固定し、[IWA3の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)で $\Lambda=\mathbb Z_p[[\gamma-1]]\simeq\mathbb Z_p[[T]]$ と同一視します。

<a id="def-iwa7-layer-quotient"></a>

<!-- formal-statement-start -->
> **定義（有限層作用素とcoinvariants）**  
> 素数 $p$、$\Lambda=\mathbb Z_p[[T]]$、整数 $n\ge0$ を固定し、
>
$$
\omega_n(T)=(1+T)^{p^n}-1
$$
>
> と定める。$\Lambda$ 加群 $M$ の第 $n$ 層 **coinvariants** は $M_{\Gamma_n}=M/\omega_n M$ である。$\Gamma_n=\overline{\langle\gamma^{p^n}\rangle}$ は $\Gamma$ の指数 $p^n$ の閉部分群である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa7-layer-quotient -->
**定義の確認。** $p=3$、$n=1$ では $\omega_1=(1+T)^3-1=T^3+3T^2+3T$ です。$M=\Lambda/(T+3)$ の場合、$T$ は $-3$ として作用するので、$M/\omega_1M\simeq\mathbb Z_3/((-2)^3-1)\simeq\mathbb Z_3/(9)$、位数は $9$ です。群作用による定義と多項式の代入が一致しています。
<!-- definition-example-end -->

$A_n$ と $X/\omega_nX$ は**定義だけでは同型になりません**。ノルムの逆極限を作ることと、有限層の類群をそのままcoinvariantsで取り戻すことは別の主張です。分岐素点やノルム写像を制御する算術的議論が後に必要になります。

## 2. $\mu p^n$ が生じる場所

$\omega_n$ は次数 $p^n$ のモニック多項式で、最高次以外の係数はすべて $p$ の倍数です（法 $p$ では $(1+T)^{p^n}-1=T^{p^n}$）。ゆえに [IWA6のWeierstrass除法](../IWA6/index.md#thm-iwa6-division)を $\omega_n$ に使うと、$\Lambda/(\omega_n)$ の $\mathbb Z_p$ 基底は $1,T,\ldots,T^{p^n-1}$ です。

<a id="prop-iwa7-p-power-growth"></a>

<!-- formal-statement-start -->
> **命題（p冪因子の位数成長）**  
> 素数 $p$、整数 $a\ge1,n\ge0$ と $\Lambda=\mathbb Z_p[[T]]$ に対し、
>
$$
\left|\Lambda/(p^a,\omega_n)\right|=p^{a p^n}.
$$
>
> 特に $\Lambda/(p^a)$ の第 $n$ 層coinvariantsの $p$ 進指数は $a p^n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

モニックな $\omega_n$ で割った余りは次数 $p^n$ 未満です。その係数をさらに法 $p^a$ で取ります。

<!-- proof-start -->
### 証明

[Weierstrass除法](../IWA6/index.md#thm-iwa6-division)から

$$
\Lambda/(\omega_n)\simeq
\bigoplus_{j=0}^{p^n-1}\mathbb Z_p T^j
$$

が $\mathbb Z_p$ 加群として成立します。この同型で $p^a$ 倍部分加群を割ると

$$
\Lambda/(p^a,\omega_n)\simeq
\bigoplus_{j=0}^{p^n-1}(\mathbb Z_p/p^a\mathbb Z_p)T^j.
$$

各直和因子の位数は $p^a$ で、因子数は $p^n$。積を取ると $p^{a p^n}$ です。
<!-- proof-end -->

この計算は、[IWA6の構造定理による $\mu$](../IWA6/index.md#def-iwa6-characteristic)が $p^a$ 型の因子の指数の和であることを、有限層の成長速度として読み替えたものです。

## 3. $\lambda n$ が生じる場所

次は $\Lambda/(W)$ を調べます。$W$ を次数 $d\ge1$ のdistinguished多項式とします。[IWA6の有限階数表示](../IWA6/index.md#thm-iwa6-division)によって $\Lambda/(W)$ は $\mathbb Z_p$ 上、基底 $1,T,\ldots,T^{d-1}$ を持つ自由加群です。

有限自由加群の自己準同型が正則な行列 $B$ で表されれば、像の指数は $p^{v_p(\det B)}$ です。これは $\mathbb Z_p$ 上の行列を基本変形で対角化し、対角元 $p^{a_i}$ の指数を掛け合わせれば分かります。したがって $\omega_n$ 倍写像の行列式を求めれば位数を測れます。

$W$ の根を、重複度を含めて代数閉包 $\overline{\mathbb Q}_p$ 内の $\alpha_1,\ldots,\alpha_d$ とします。**終結式**とは二つの多項式が共通根を持つか判定する量で、モニックな $W$ については

$$
\operatorname{Res}(W,g)=\prod_{i=1}^{d}g(\alpha_i)
$$

と計算できます。これは $\mathbb Q_p[T]/(W)$ 上の $g$ 倍写像の行列式です。なぜなら代数閉包へ係数拡大すると、$T$ 倍写像の固有値が重複度を含めて $\alpha_1,\ldots,\alpha_d$ であり、行列式 $\det g(T)$ は各固有値 $g(\alpha_i)$ の積になるからです。重根の場合も重複度を込めます。

<a id="lem-iwa7-valuation-growth"></a>

<!-- formal-statement-start -->
> **補題（p冪乗の付値安定化）**  
> $K/\mathbb Q_p$ を有限拡大とし、付値を $v_p(p)=1$ に正規化する。$u\in K$ が $v_p(u-1)>0$ を満たし、$p$ 冪位数の1の根ではないとする。このとき、ある整数 $N\ge0$ と有理数 $c$ が存在し、すべての $n\ge N$ で
>
$$
v_p(u^{p^n}-1)=n+c
$$
>
> が成り立つ。
<!-- formal-statement-end -->

ここで「$p$ 冪位数の1の根」とは、ある $m\ge0$ について $u^{p^m}=1$ となる元です（$u=1$ も含みます）。

### 証明の見取り図

$u$ を繰り返し $p$ 乗すると $1$ に近づきます。十分近くなってからは、二項展開の先頭項だけが最小付値になります。

<!-- proof-start -->
### 証明

$\delta_n=u^{p^n}-1$、$s_n=v_p(\delta_n)$ と置きます。仮定より $\delta_n\ne0$ かつ $s_0>0$ です。二項定理から

$$
\delta_{n+1}=p\delta_n+
\binom p2\delta_n^2+\cdots+\delta_n^p.
$$

$p$ が素数なので、$1\le j<p$ なら $v_p(\binom pj)=1$ です。各項の付値は $1+j s_n$（$1\le j<p$）または $p s_n$。よって

$$
s_{n+1}\ge\min(1+s_n,p s_n)>s_n.
$$

有限拡大 $K$ の付値の正の値は離散集合に属します。増加列 $(s_n)$ が有界なら離散性に反するので、$s_n\to\infty$ です。$s_N>1/(p-1)$ となる $N$ を取ります。

$n\ge N$ では $p s_n>1+s_n$、また $2\le j<p$ なら $1+j s_n>1+s_n$ です。したがって上の展開で $p\delta_n$ だけが最小付値を持ち、打消しがありません。従って $s_{n+1}=1+s_n$、帰納法で

$$
s_n=s_N+n-N=n+(s_N-N)
$$

となります。$c=s_N-N$ と置けば完了です。
<!-- proof-end -->

<a id="prop-iwa7-distinguished-growth"></a>

<!-- formal-statement-start -->
> **命題（distinguished因子の成長）**  
> $\Lambda=\mathbb Z_p[[T]]$ とし、$W\in\mathbb Z_p[T]$ を次数 $d\ge1$ のdistinguished多項式とする。$W$ がどの $\omega_m$（$m\ge0$）とも $\mathbb Q_p[T]$ で共通因子を持たないと仮定する。このとき $\Lambda/(W,\omega_n)$ はすべての $n$ で有限であり、ある整数 $N$ と整数 $\nu_W$ が存在して、$n\ge N$ なら
>
$$
v_p\left(\left|\Lambda/(W,\omega_n)\right|\right)=dn+\nu_W
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\omega_n$ 倍写像の行列式を終結式に読み替えます。$W$ の各根に先ほどの補題を適用し、その付値を足します。

<!-- proof-start -->
### 証明

$W=T^d+c_{d-1}T^{d-1}+\cdots+c_0$、$c_i\in p\mathbb Z_p$ とします。根 $\alpha$ で $v_p(\alpha)\le0$ なら、$\alpha^d$ の付値 $d v_p(\alpha)$ は、各低次項 $c_i\alpha^i$ の付値 $1+i v_p(\alpha)$ より小さく、これらが打ち消せません。したがって全根で $v_p(\alpha)>0$ です。

各 $u_i=1+\alpha_i$ は $v_p(u_i-1)>0$ を満たします。$u_i^{p^m}=1$ となることは $\omega_m(\alpha_i)=0$ と同値なので、共通因子を持たないという仮定により補題が適用できます。ゆえに各 $i$ について、十分大きな $n$ で

$$
v_p(\omega_n(\alpha_i))
=v_p(u_i^{p^n}-1)=n+c_i.
$$

一方、$\Lambda/(W)$ は自由 $\mathbb Z_p$ 加群なので、$\omega_n$ 倍写像は $d$ 次正方行列で表せます。行列式は

$$
\det(\omega_n\mid\Lambda/(W))
=\operatorname{Res}(W,\omega_n)
=\prod_{i=1}^d\omega_n(\alpha_i)
\ne0
$$

です。非零の行列式を持つ整数行列の余核は有限で、その位数の付値は行列式の付値に等しいため、

$$
v_p\left(\left|\Lambda/(W,\omega_n)\right|\right)
=\sum_{i=1}^d(n+c_i)
=dn+\sum_{i=1}^dc_i.
$$

左辺は整数です。従って十分大きな一つの $n$ を取れば $\sum_i c_i$ も整数で、これを $\nu_W$ と置けます。
<!-- proof-end -->

**直接計算。** $p=3$、$W=T+3$ なら商 $\Lambda/(W)\simeq\mathbb Z_3$ では $T=-3$ です。$u=1-3=-2$ と置くと $v_3(u-1)=1>1/(3-1)$。上の証明の安定領域に初めから入るため

$$
v_3\left(\left|\Lambda/(T+3,\omega_n)\right|\right)
=v_3((-2)^{3^n}-1)=n+1
$$

が **すべての $n\ge0$** で成り立ちます。一方 $W=T$ なら $\omega_n(0)=0$ なので商は $\mathbb Z_3$ となり、有限ではありません。[IWA6の例](../IWA6/index.md#def-iwa6-characteristic)で $\mu=0,\lambda=1$ と分かっていても、有限性を忘れてはいけません。

## 4. 二種類の項を合成する

<a id="prop-iwa7-elementary-growth"></a>

<!-- formal-statement-start -->
> **命題（初等加群の成長公式）**  
> $M$ が有限個の $\Lambda/(p^{a_i})$ と $\Lambda/(W_j)$ の直和であり、各 $W_j$ は正次数のdistinguished多項式で、どの $\omega_m$ とも共通因子を持たないとする。このとき十分大きな $n$ について
>
$$
v_p(|M/\omega_nM|)
=\mu(M)p^n+\lambda(M)n+\nu_M,
$$
>
> ただし $\nu_M\in\mathbb Z$ は定数である。$\mu(M),\lambda(M)$ は [IWA6の特徴イデアル](../IWA6/index.md#def-iwa6-characteristic)で定義した整数に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

直和のcoinvariantsは各因子のcoinvariantsの直和です。それぞれの位数を掛けると指数は足し算になります。

<!-- proof-start -->
### 証明

分配法則から

$$
M/\omega_nM\simeq
\bigoplus_i\Lambda/(p^{a_i},\omega_n)
\oplus\bigoplus_j\Lambda/(W_j,\omega_n).
$$

[$p$ 冪因子の成長](#prop-iwa7-p-power-growth)を第一群、[distinguished因子の成長](#prop-iwa7-distinguished-growth)を第二群へ適用すると、指数の和は

$$
\sum_i a_i p^n
+\sum_j\bigl((\deg W_j)n+\nu_{W_j}\bigr)
$$

です。[IWA6の特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic)によって $\sum_i a_i=\mu(M)$、$\sum_j\deg W_j=\lambda(M)$。残りの $\sum_j\nu_{W_j}$ を $\nu_M$ とすれば証明されます。
<!-- proof-end -->

**総合例。** $p=3$、$M=\Lambda/(9)\oplus\Lambda/(T+3)^2\oplus \mathbb Z/27\mathbb Z$ とします。最後の有限群には $\gamma$ が恒等作用するとします。$(T+3)^2$ は単一のdistinguished多項式なので上の命題を適用できます。$\Lambda/(9)$ の指数は $2\cdot3^n$、$(T+3)^2$ の指数は $2(n+1)$、有限群のcoinvariantsの指数は $3$ です（$\omega_n$ が零作用するため）。従って

$$
v_3(|M/\omega_nM|)=2\cdot3^n+2n+5.
$$

有限群は [IWA5の擬零性](../IWA5/index.md#prop-iwa5-pseudonull-finite)により特徴イデアルに影響しませんが、定数項には影響します。この例で $\mu(M)=2,\lambda(M)=2,\nu_M=5$ です。

**なぜ「擬同型」だけで議論を終えられないか。** [IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure)は一般の有限生成torsion加群を初等加群に**擬同型**で結びます。有限な核・余核は $\mu,\lambda$ を変えませんが、そのことだけで各 $n$ のcoinvariantsの位数が等しいとは言えません。また初等因子に $\omega_m$ の因子が含まれればcoinvariants自体が無限です。一般の代数的成長定理へ進むには、有限誤差の安定化と有限性の条件を追加して扱います。

## 5. 類数成長公式は数体に何を言うか

$\operatorname{Cl}(F_n)$ の位数が $h(F_n)$ であることは有限数体の算術事実です。しかし加群の証明だけでは $A_n\simeq X/\omega_n X$ は得られません。ここで類体論と分岐の情報を使うIwasawaの算術定理を入力します。

<a id="thm-iwa7-class-number-growth"></a>

<!-- formal-statement-start -->
> **定理（Iwasawaの類数成長公式：算術的定理）**  
> $F$ を数体、$p$ を素数、$F_\infty/F$ をGalois群が $\mathbb Z_p$ に同型な拡大とする。$F_n/F$ を次数 $p^n$ の中間拡大、$h_n=h(F_n)$ と置く。このとき非負整数 $\mu,\lambda$ と整数 $\nu$、整数 $N\ge0$ が存在して、すべての $n\ge N$ について
>
$$
v_p(h_n)=\mu p^n+\lambda n+\nu
$$
>
> が成り立つ。$\mu,\lambda$ はこの塔の岩澤不変量であり、$\nu$ は有限層の定数補正である。
<!-- formal-statement-end -->

**算術定理の証明について。** これは[Greenberg, *Iwasawa Theory—Past and Present* による教科書](https://sites.math.washington.edu/~greenber/book.pdf)第2章で証明される古典的定理を正確な仮定で引用しています。ここで全証明をしたと主張しません。前節までに**なぜ二種類の成長次数が現れるか**は実際に証明しました。算術定理そのものにはさらに、$X=\varprojlim A_n$ の有限生成torsion性、有限層と極限を比較する写像、分岐素点の寄与、有限誤差の安定化の吟味が必要です。これらの入口を後続の IWA9（分岐）、IWA11（単数の完全列）、IWA12（control）で扱います。一般の有限層の類群を、説明なしに $X/\omega_nX$ と置く議論は使えません。

この定理が述べる「十分大きい $n$」は、ひとつの固定した塔に対して $N$ が存在するという意味です。$n=0$ や $n=1$ にまで同じ $\nu$ を当てはめてはいけません。また $\nu$ は負でも構わず、$\mu,\lambda$ が非負であることとは別です。

<a id="prop-iwa7-growth-difference"></a>

<!-- formal-statement-start -->
> **命題（成長差からμとλを読む）**  
> 整数列 $(e_n)$ がある $N$ 以降 $e_n=\mu p^n+\lambda n+\nu$ に従うとする。このとき $n\ge N$ に対して
>
$$
e_{n+1}-e_n=\mu(p-1)p^n+\lambda
$$
>
> が成立する。従って $\mu=0$ と、差 $e_{n+1}-e_n$ が十分大きな $n$ で一定になることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの層の式を引くと

$$
(\mu p^{n+1}+\lambda(n+1)+\nu)
-(\mu p^n+\lambda n+\nu)
=\mu(p-1)p^n+\lambda
$$

です。$\mu=0$ なら差は $\lambda$ に一定です。逆に差が一定なら二つの連続する差の差を取ると $\mu(p-1)^2p^n=0$ です。$p\ge2$ なので $\mu=0$ です。
<!-- proof-end -->

$\mu>0$ なら指数が $p^n$ に比例する部分が残ります。$\mu=0$ なら指数は最終的に $n$ の一次式、すなわち $|A_n|=p^{\lambda n+\nu}$ となります。**類数そのもの $h_n$ の全素因子がこの式に従うという意味ではありません**。式は $p$ 部分だけを数えています。

## 6. Ferrero–Washingtonの $\mu=0$ はどこまで成り立つか

円分 $\mathbb Z_p$ 拡大とは、$\mathbb Q$ の円分 $\mathbb Z_p$ 拡大 $\mathbb Q_\infty$ を使って $F_\infty=F\mathbb Q_\infty$ と定めるものです。$\mathbb Q_\infty$ は $\mathbb Q(\mu_{p^\infty})$ の中の $\mathbb Z_p$ 拡大部分に当たります。$p=2$ でも存在しますが、有限次のGalois群の分解は奇素数の場合と同じ記号で機械的に扱いません。

<a id="thm-iwa7-ferrero-washington"></a>

<!-- formal-statement-start -->
> **定理（Ferrero–Washingtonのμ=0定理）**  
> $F/\mathbb Q$ を有限次**Abel拡大**、$p$ を任意の素数とする。$F_\infty=F\mathbb Q_\infty$ を $F$ の**円分 $\mathbb Z_p$ 拡大**とし、その有限層の類群の $p$ 部分から作る岩澤加群 $X$ を考える。このとき
>
$$
\mu(X)=0.
$$
>
> 従ってこの塔の類数成長は十分大きな $n$ で $v_p(h(F_n))=\lambda n+\nu$ となる。
<!-- formal-statement-end -->

この深い定理は本講では**証明を引用**します。[Sharifi, *Iwasawa Theory*, Chapter 6, Theorem 6.2.1](https://math.ucla.edu/~sharifi/notes/iwasawa-ch06.html) に対象と結論が示されています。「Abel拡大」という**基礎体**の条件と、「円分」という**塔の種類**の条件の両方が重要です。一般の数体の任意の $\mathbb Z_p$ 拡大すべてで $\mu=0$ と断言することはできません。実際、非円分 $\mathbb Z_p$ 拡大では正の $\mu$ を持つ例が知られています。

**定理の帰結と限界。** $F=\mathbb Q$ は Abel 数体なので、その円分塔で $\mu=0$ です。ここから $\lambda=0$ まで自動的には出ません。また、[Ferrero–Washingtonのμ=0定理](#thm-iwa7-ferrero-washington)は円分岩澤主予想そのものではありません。主予想が主張する**特定の特徴イデアルと $p$ 進L関数の関係**は、IWA15〜17で別に定式化します。

## 7. 演習：有限層を紙上で数える

### Level A

<a id="ex-iwa7-a1"></a>

**A1. 有限層の多項式**
- Level: A
- ID: IWA7-A1

$p=3$ として $\omega_0,\omega_1,\omega_2\bmod3$ を求め、$\deg\omega_2$ を述べよ。

<!-- solution-start -->
**詳細解答。** $\omega_0=(1+T)-1=T$、$\omega_1=(1+T)^3-1=3T+3T^2+T^3$ です。標数 $3$ では $(a+b)^3=a^3+b^3$ なので

$$
\omega_2\bmod3=((1+T)^3)^3-1
=(1+T^3)^3-1=T^9.
$$

従って $\omega_0\bmod3=T$、$\omega_1\bmod3=T^3$、$\omega_2\bmod3=T^9$、$\deg\omega_2=9$ です。
<!-- solution-end -->

<a id="ex-iwa7-a2"></a>

**A2. $p$ 冪因子**
- Level: A
- ID: IWA7-A2

$p=5$、$M=\Lambda/(25)$、$n=2$ とする。$M/\omega_2M$ の位数を求めよ。

<!-- solution-start -->
**詳細解答。** $25=5^2$、$\deg\omega_2=5^2=25$ です。[$p$ 冪因子の命題](#prop-iwa7-p-power-growth)を $a=2,n=2$ に適用すると

$$
|M/\omega_2M|=5^{2\cdot5^2}=5^{50}.
$$

指数を $\lambda n=2n$ と誤読してはいけません。
<!-- solution-end -->

<a id="ex-iwa7-a3"></a>

**A3. 一次因子の直接計算**
- Level: A
- ID: IWA7-A3

$p=3$、$M=\Lambda/(T+3)$ について、第0層と第1層のcoinvariantsの位数を個別に計算せよ。

<!-- solution-start -->
**詳細解答。** 商では $T=-3$ なので、$\omega_0(-3)=-3$、$\omega_1(-3)=(-2)^3-1=-9$ です。従って

$$
M/\omega_0M\simeq\mathbb Z_3/(3),\quad
M/\omega_1M\simeq\mathbb Z_3/(9).
$$

位数はそれぞれ $3,9$。指数 $1,2$ は $n+1$ と一致します。
<!-- solution-end -->

<a id="ex-iwa7-a4"></a>

**A4. 有限部分の寄与**
- Level: A
- ID: IWA7-A4

$M=\mathbb Z/9\mathbb Z$ を $\gamma=1$ で作用させる有限 $\Lambda$ 加群とする。すべての $n$ について $M/\omega_nM$ の位数を求め、$\mu(M),\lambda(M)$ と比較せよ。

<!-- solution-start -->
**詳細解答。** $T=\gamma-1$ は零作用します。従って $\omega_n=(1+T)^{p^n}-1$ も零作用し、$M/\omega_nM=M$、位数は $9=3^2$ です。[有限加群の擬零性](../IWA5/index.md#prop-iwa5-pseudonull-finite)と[特徴イデアル](../IWA6/index.md#def-iwa6-characteristic)により $\mu(M)=\lambda(M)=0$。指数 $2$ は定数 $\nu$ に対応します。
<!-- solution-end -->

<a id="ex-iwa7-a5"></a>

**A5. 成長差の計算**
- Level: A
- ID: IWA7-A5

$p=3$、$e_n=2\cdot3^n+4n+7$ とする。$e_{n+1}-e_n$ を求め、$\mu,\lambda$ を読め。

<!-- solution-start -->
**詳細解答。** 式に $n+1$ を代入して引くと

$$
e_{n+1}-e_n
=2(3^{n+1}-3^n)+4
=4\cdot3^n+4.
$$

[$\mu,\lambda$ の差分命題](#prop-iwa7-growth-difference)と照合し、$\mu=2,\lambda=4$ です。$7$ は差分で消えます。
<!-- solution-end -->

### Level B

<a id="ex-iwa7-b1"></a>

**B1. 平方因子と有限群**
- Level: B
- ID: IWA7-B1

$p=3$、$M=\Lambda/(T+3)^2\oplus\mathbb Z/9\mathbb Z$ とし、有限群には自明な $\Gamma$ 作用を入れる。$|M/\omega_nM|$ と三つの不変量を求めよ。

<!-- solution-start -->
**詳細解答。** [一次因子の付値計算](#prop-iwa7-distinguished-growth)から $\omega_n(-3)$ の付値は $n+1$。$\mathbb Z_3[T]/((T+3)^2)$ での $\omega_n$ 倍行列の行列式は、根 $-3$ を二重に数えた $\omega_n(-3)^2$ です。ゆえにこの因子の指数は $2(n+1)$。有限群では $\omega_n=0$ なので指数は $2$。従って

$$
|M/\omega_nM|=3^{2n+4},\qquad
\mu(M)=0,\quad\lambda(M)=2,\quad\nu=4.
$$

二重根であることを「二つの層」と混同しないことが要点です。
<!-- solution-end -->

<a id="ex-iwa7-b2"></a>

**B2. 有限性の反例**
- Level: B
- ID: IWA7-B2

$p=3$、$M=\Lambda/(T)$ と $M'=\Lambda/(T+3)$ を比較する。どちらも $\mu=0,\lambda=1$ であることを示したうえで、なぜ $M/\omega_nM$ は有限にならないのか説明せよ。

<!-- solution-start -->
**詳細解答。** $T$ と $T+3$ は次数1のdistinguished多項式なので、[IWA6の特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic)により両者の $\mu=0,\lambda=1$ です。$M$ では $T=0$、従って $\omega_n(0)=0$ なので

$$
M/\omega_nM=M\simeq\mathbb Z_3
$$

となり無限です。対して $M'$ では $\omega_n(-3)=(-2)^{3^n}-1\ne0$、従って指数 $n+1$ の有限群です。前者では $T$ が $\omega_n$ の共通因子であるため、[distinguished因子の成長命題](#prop-iwa7-distinguished-growth)の共通因子なし条件が失われています。
<!-- solution-end -->

<a id="ex-iwa7-b3"></a>

**B3. $p=2$ の安全な一次例**
- Level: B
- ID: IWA7-B3

$p=2$、$M=\Lambda/(T+4)$ とする。各 $n$ で $v_2(|M/\omega_nM|)=n+2$ を証明せよ。また $T+2$ では同じ主張ができない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $M\simeq\mathbb Z_2$ では $T=-4$、$u=1-4=-3$ です。$v_2(u-1)=v_2(-4)=2>1$ なので、[付値安定化の補題](#lem-iwa7-valuation-growth)の二項展開の最小付値項は最初から $2\delta$ だけです。$v_2(u^{2^0}-1)=2$ より帰納的に $v_2(u^{2^n}-1)=n+2$。一方 $T+2$ では $u=-1$ となり、$n\ge1$ で $u^{2^n}=1$、すなわち $\omega_n(-2)=0$。coinvariantsは無限で、補題の根の非torsion条件を満たしません。
<!-- solution-end -->

<a id="ex-iwa7-b4"></a>

**B4. 算術への適用条件**
- Level: B
- ID: IWA7-B4

有限数体 $F$ のある $\mathbb Z_p$ 拡大について $X=\varprojlim A_n$ を作った。$X$ の $\mu,\lambda$ を求めたことだけを理由に、すべての $n$ で $|A_n|=|X/\omega_nX|$ と書く解答の問題点を二つ挙げよ。

<!-- solution-start -->
**詳細解答。** 第一に、[類群の逆極限への作用](../IWA4/index.md#thm-iwa4-iwasawa-action)で定義される $X$ と各 $A_n$ の間には、ノルムや分岐を考慮した比較が必要です。同型が自動的に存在するわけではありません。第二に、[IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure)が与えるのは擬同型であり、有限誤差や $\omega_n$ との共通因子を無視できません。正しい結論は算術定理を適用して「十分大きな $n$ で指数が $\mu p^n+\lambda n+\nu$ に等しい」と述べることです。
<!-- solution-end -->

### Level C

<a id="ex-iwa7-c1"></a>

**C1. 成長する塔の模型と定理の射程**
- Level: C
- ID: IWA7-C1

$p=3$、$M=\Lambda/(9)\oplus\Lambda/(T+3)^2\oplus\mathbb Z/27\mathbb Z$（最後の群には自明な作用）を考える。

1. 各 $n\ge0$ で $|M/\omega_nM|$ を求め、その結果を $\mu p^n+\lambda n+\nu$ の形にせよ。
2. $e_{n+1}-e_n$ を求め、$\mu=0$ の模型との違いを説明せよ。
3. この $M$ の計算から任意の数体の類群について直接結論してはいけない理由と、[Ferrero–Washingtonのμ=0定理](#thm-iwa7-ferrero-washington)を適用するための基礎体と塔の条件を述べよ。

<!-- solution-start -->
**詳細解答。**

**第1問。** [$p$ 冪因子の命題](#prop-iwa7-p-power-growth)より $\Lambda/(9)$ のcoinvariantsの位数は $3^{2\cdot3^n}$。また $\Lambda/(T+3)^2$ の商は $\mathbb Z_3$ 自由階数2で、$\omega_n$ 倍写像の行列式は $\omega_n(-3)^2$ です。[$p=3$ の一次例](#prop-iwa7-distinguished-growth)よりその付値は $2(n+1)$。有限群では $\omega_n$ が零作用して $3^3$ のままです。従って

$$
|M/\omega_nM|=3^{2\cdot3^n+2(n+1)+3}
=3^{2\cdot3^n+2n+5}.
$$

よって $\mu=2,\lambda=2,\nu=5$。有限群が $\nu$ に寄与する点も確かめました。

**第2問。** $e_n=2\cdot3^n+2n+5$ なので

$$
e_{n+1}-e_n=2(3^{n+1}-3^n)+2
=4\cdot3^n+2.
$$

差は一定ではなく $n$ とともに増えます。対して $\mu=0$ なら [成長差の命題](#prop-iwa7-growth-difference)により差は十分大きな層で一定の $\lambda$ です。

**第3問。** 計算したのは抽象的な $\Lambda$ 加群のcoinvariantsです。数体の類群 $A_n$ との比較を証明していない以上、この模型の指数を $v_p(h(F_n))$ と同一視できません。[算術的な類数成長定理](#thm-iwa7-class-number-growth)は任意の数体の $\mathbb Z_p$ 拡大に対して十分大きい $n$ の式を保証しますが、この模型の数値を保証しません。[Ferrero–Washingtonのμ=0定理](#thm-iwa7-ferrero-washington)を適用するには、$F/\mathbb Q$ が有限Abel拡大で、$F_\infty/F$ がその円分 $\mathbb Z_p$ 拡大であることが必要です。模型では $\mu=2$ なので、同定可能な円分Abel数体の類群模型だと断定することは定理と両立しません。
<!-- solution-end -->

## 参考資料と次講への道筋

- Ralph Greenberg, [*Iwasawa Theory—Past and Present*（講義ノート）](https://sites.math.washington.edu/~greenber/book.pdf), 第2章：類数成長の算術的定理と有限層比較。
- Romyar Sharifi, [*Iwasawa Theory*, Chapter 6](https://math.ucla.edu/~sharifi/notes/iwasawa-ch06.html), §6.2：μ消失の範囲。
- Lawrence C. Washington, *Introduction to Cyclotomic Fields*, 2nd ed.：円分塔と類群の標準的整理。

次講 IWA8 では、同じ類群を円分体の指標成分へ分けて調べます。ここでの $\mu=0$ は**全体の成長の形**を制限しますが、各指標成分の $\lambda$ を決定するものではありません。
