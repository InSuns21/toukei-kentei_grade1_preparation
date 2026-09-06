# RA1 標準実解析 I：数列・級数

この章は、既存の [実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md)、[点列・部分列](../F0_00B0_点列_部分列_十分大きい添字/index.md)、[Cauchy列と完備性](../F0_00D_Cauchy列_完備性_無限次元/index.md) を土台に、実解析の最初の定理列を組み立てます。

---

## 1. 単調列と実数の完備性

<a id="thm-ra1-monotone"></a>
<!-- formal-statement-start -->
> **定理（有界単調数列の収束定理）**  
> 上に有界な単調増加実数列 $(a_n)$ は収束し、
$$
\lim_{n\to\infty}a_n=\sup\{a_n:n\in\mathbb N\}.
$$
> 下に有界な単調減少列についても同様である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$L=\sup\{a_n:n\in\mathbb N\}$ とします。任意の $\varepsilon>0$ に対し $L-\varepsilon$ は上界ではないので、ある $N$ が存在して
$$
L-\varepsilon<a_N\le L.
$$
単調増加性より $n\ge N$ なら $a_N\le a_n\le L$。したがって $|a_n-L|<\varepsilon$ です。$\square$
<!-- proof-end -->

「有界だから収束」ではなく、**上限が実数として存在すること**が効いています。

---

## 2. limsup / liminf

<a id="def-ra1-limsup"></a>
<!-- formal-statement-start -->
> **定義（上極限・下極限）**  
> 実数列 $(a_n)$ に対し
$$
s_n=\sup_{k\ge n}a_k,\qquad i_n=\inf_{k\ge n}a_k
$$
> と置き、拡張実数を許して
$$
\limsup_{n\to\infty}a_n=\lim_{n\to\infty}s_n,\qquad
\liminf_{n\to\infty}a_n=\lim_{n\to\infty}i_n
$$
> と定める。
<!-- formal-statement-end -->

$s_n$ は単調減少、$i_n$ は単調増加です。「後ろを全部見た最大側・最小側」が絞られていく量だと読めます。

<a id="thm-ra1-limsup-criterion"></a>
<!-- formal-statement-start -->
> **定理（limsup・liminfによる収束判定）**  
> $(a_n)$ が有限値 $L$ に収束することと
$$
\liminf a_n=\limsup a_n=L
$$
> は同値である。
<!-- formal-statement-end -->

例えば $a_n=(-1)^n$ では上極限が $1$、下極限が $-1$ なので収束しません。

---

## 3. 級数は部分和列

<a id="def-ra1-series"></a>
<!-- formal-statement-start -->
> **定義（級数の収束）**  
> 級数 $\sum_{n=1}^{\infty}a_n$ が収束するとは、部分和
$$
S_N=\sum_{n=1}^{N}a_n
$$
> が有限値へ収束することをいう。
<!-- formal-statement-end -->

<a id="thm-ra1-series-cauchy"></a>
<!-- formal-statement-start -->
> **定理（級数のCauchy判定）**  
> 実数級数 $\sum a_n$ が収束することと、任意の $\varepsilon>0$ に対し、ある $N$ が存在して $m>n\ge N$ なら
$$
\left|\sum_{k=n+1}^{m}a_k\right|<\varepsilon
$$
> となることは同値である。
<!-- formal-statement-end -->

これは部分和列がCauchy列になることそのものです。

<a id="def-ra1-absolute"></a>
<!-- formal-statement-start -->
> **定義（絶対収束・条件収束）**  
> $\sum |a_n|$ が収束するとき $\sum a_n$ は**絶対収束**するという。$\sum a_n$ は収束するが $\sum |a_n|$ は発散するとき**条件収束**するという。
<!-- formal-statement-end -->

<a id="thm-ra1-absolute"></a>
<!-- formal-statement-start -->
> **定理（絶対収束なら収束）**  
> $\sum |a_n|<\infty$ なら $\sum a_n$ は収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

絶対値級数のtailが十分小さければ
$$
\left|\sum_{k=n+1}^{m}a_k\right|
\le \sum_{k=n+1}^{m}|a_k|
$$
も十分小さいので、部分和列はCauchy列です。実数の完備性から収束します。$\square$
<!-- proof-end -->

---

## 4. Cauchy積と再配列

絶対収束級数では項を並べ替えても和は変わりません。また $\sum a_n$, $\sum b_n$ が絶対収束するとき
$$
c_n=\sum_{k=0}^{n}a_kb_{n-k}
$$
で定めたCauchy積も絶対収束し、
$$
\sum_{n=0}^{\infty}c_n
=\left(\sum_{n=0}^{\infty}a_n\right)
 \left(\sum_{n=0}^{\infty}b_n\right)
$$
となります。条件収束では再配列で和が変わり得るため、絶対収束は単なる「少し強い収束」ではありません。

---

## 5. 冪級数

<a id="def-ra1-power-series"></a>
<!-- formal-statement-start -->
> **定義（冪級数・収束半径）**  
> 中心 $x_0$ の冪級数は
$$
\sum_{n=0}^{\infty}c_n(x-x_0)^n
$$
> の形の級数である。ある $R\in[0,\infty]$ が存在し、$|x-x_0|<R$ で絶対収束し、$|x-x_0|>R$ で発散する。この $R$ を収束半径という。
<!-- formal-statement-end -->

<a id="thm-ra1-cauchy-hadamard"></a>
<!-- formal-statement-start -->
> **定理（Cauchy–Hadamardの公式）**  
$$
\frac1R=\limsup_{n\to\infty}|c_n|^{1/n}
$$
> と解釈すれば冪級数の収束半径が与えられる。
<!-- formal-statement-end -->

**端点 $|x-x_0|=R$ は別判定**です。収束半径だけでは決まりません。

<!-- definition-example-start: def-ra1-limsup, def-ra1-series, def-ra1-absolute, def-ra1-power-series -->
**定義の確認**：まず $a_n=(-1)^n$ では、どのtailにも $1$ と $-1$ が現れるので $s_n=1$, $i_n=-1$、したがって $\limsup a_n=1$, $\liminf a_n=-1$ です。次に $\sum_{n=0}^{\infty}2^{-n}$ は部分和 $S_N=2-2^{-N}$ が $2$ に収束するので、級数の定義どおり収束します。また $\sum_{n=0}^{\infty}(-1)^n/(n+1)^2$ は絶対値を取ると収束する $p$ 級数になるため絶対収束です。最後に $\sum_{n=0}^{\infty}x^n$ は中心0の冪級数で、$|x|<1$ で絶対収束し $|x|>1$ では項が0へ行かないため発散するので、収束半径は $R=1$ です。
<!-- definition-example-end -->

---

## 6. 演習

### Level A

<a id="ex-ra1-a01"></a>
#### RA1-A01 単調収束
- Level: A

$a_n=1-1/n$ が収束することを示し、極限を求めよ。

<!-- solution-start -->
**解答**：$a_{n+1}-a_n=1/(n(n+1))>0$ なので単調増加、かつ $a_n<1$。したがって [有界単調数列の収束定理](#thm-ra1-monotone) より収束する。さらに $1/n\to0$ なので極限は $1$。
<!-- solution-end -->

<a id="ex-ra1-a02"></a>
#### RA1-A02 limsup
- Level: A

$a_n=(-1)^n+1/n$ の $\limsup$ と $\liminf$ を求めよ。

<!-- solution-start -->
**解答**：偶数部分列は $1+1/(2k)\to1$、奇数部分列は $-1+1/(2k-1)\to-1$。よって $\limsup a_n=1$, $\liminf a_n=-1$。
<!-- solution-end -->

<a id="ex-ra1-a03"></a>
#### RA1-A03 幾何級数
- Level: A

$|r|<1$ のとき $\sum_{n=0}^{\infty}r^n$ を求めよ。

<!-- solution-start -->
**解答**：$S_N=(1-r^{N+1})/(1-r)$ で、$r^{N+1}\to0$。したがって和は $1/(1-r)$。
<!-- solution-end -->

<a id="ex-ra1-a04"></a>
#### RA1-A04 冪級数の端点
- Level: A

$\sum_{n=1}^{\infty}x^n/n$ の収束半径を求め、$x=1,-1$ を判定せよ。

<!-- solution-start -->
**解答**：$n^{-1/n}\to1$ なので $R=1$。$x=1$ は調和級数で発散する。$x=-1$ では偶数部分和を組にすると
$$
S_{2m}=\sum_{k=1}^{m}\left(-\frac1{2k-1}+\frac1{2k}\right)
=-\sum_{k=1}^{m}\frac1{(2k-1)2k}.
$$
右辺は $\sum 1/k^2$ で上から抑えられて収束し、奇数部分和との差は $1/(2m+1)\to0$。よって全体も収束する。
<!-- solution-end -->

### Level B

<a id="ex-ra1-b01"></a>
#### RA1-B01 絶対収束
- Level: B

$\sum (-1)^n/(n+1)^2$ が絶対収束することを示せ。

<!-- solution-start -->
**解答**：絶対値級数は $\sum1/(n+1)^2$ で、$\int_1^\infty x^{-2}dx<\infty$ との比較から収束する。
<!-- solution-end -->

<a id="ex-ra1-b02"></a>
#### RA1-B02 Cauchy判定で調和級数を落とす
- Level: B

$\sum_{n=1}^{\infty}1/n$ がCauchy条件を満たさないことを示せ。

<!-- solution-start -->
**解答**：$m=2n$ と取ると
$$
\sum_{k=n+1}^{2n}\frac1k\ge n\frac1{2n}=\frac12.
$$
したがってtailを任意に小さくできない。
<!-- solution-end -->

<a id="ex-ra1-b03"></a>
#### RA1-B03 Cauchy積
- Level: B

$\sum_{n\ge0}x^n$ と自身のCauchy積を求めよ。

<!-- solution-start -->
**解答**：$x^n$ は $x^kx^{n-k}$ の $n+1$ 個から生じるので、$|x|<1$ で
$$
\frac1{(1-x)^2}=\sum_{n=0}^{\infty}(n+1)x^n.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra1-c01"></a>
#### RA1-C01 条件収束と再配列
- Level: C

交代調和級数について、正項だけの和と負項の絶対値の和がともに発散することを示し、正項と負項の取り方を変えると任意の実数 $L$ に近づく再配列を構成できる理由を説明せよ。

<!-- solution-start -->
**解答**：正項・負項の絶対値はいずれも調和級数の定数倍と比較でき発散する。したがって正項を足して $L$ を上回り、次に負項を足して $L$ を下回る操作を何度でも続けられる。使う各項の絶対値は0へ行くため、上下への越え幅も0へ行き、部分和は $L$ に収束する。
<!-- solution-end -->

---

## 7. 次に進む

**次：[RA2 極限・連続・一様連続](../RA2/index.md)**
