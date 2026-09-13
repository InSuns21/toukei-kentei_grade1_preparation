# RA1 標準実解析 I：数列・級数

この章は、既存の [実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub)、[点列・部分列](../F0_00B0_点列_部分列_十分大きい添字/index.md)、[Cauchy列と完備性](../F0_00D_Cauchy列_完備性_無限次元/index.md) を土台に、実解析の最初の定理列を組み立てます。

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

まず $(a_n)$ が上に有界な単調増加列だとします。集合
$$
A=\{a_n:n\in\mathbb N\}
$$
は空でなく上に有界なので、[実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub)から $L=\sup A\in\mathbb R$ が存在します。

任意の $\varepsilon>0$ を取ります。もし $L-\varepsilon$ も $A$ の上界なら $L$ が最小上界であることに反するので、ある $N$ が存在して
$$
L-\varepsilon<a_N\le L
$$
となります。単調増加性より $n\ge N$ なら
$$
L-\varepsilon<a_N\le a_n\le L<L+\varepsilon.
$$
したがって $|a_n-L|<\varepsilon$ であり、$a_n\to L$ です。

次に $(a_n)$ が下に有界な単調減少列だとします。$b_n=-a_n$ と置けば $(b_n)$ は上に有界な単調増加列です。前半から
$$
b_n\to \sup\{-a_n:n\in\mathbb N\}=-\inf\{a_n:n\in\mathbb N\}.
$$
よって符号を戻せば
$$
a_n\to \inf\{a_n:n\in\mathbb N\}.
$$
以上で両方の場合が示されました。$\square$
<!-- proof-end -->

「有界だから収束」ではなく、**上限・下限が実数として存在すること**が効いています。

---

## 2. 上極限と下極限

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

$n$ を増やすとtail集合 $\{a_k:k\ge n\}$ は小さくなるので、$s_n$ は単調減少、$i_n$ は単調増加です。「後ろを全部見た最大側・最小側」が絞られていく量だと読めます。

<a id="thm-ra1-limsup-criterion"></a>
<!-- formal-statement-start -->
> **定理（limsup・liminfによる収束判定）**  
> $(a_n)$ が有限値 $L$ に収束することと
$$
\liminf a_n=\limsup a_n=L
$$
> は同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $a_n\to L$ とします。任意の $\varepsilon>0$ に対し、ある $N$ が存在して $k\ge N$ なら
$$
L-\varepsilon<a_k<L+\varepsilon
$$
です。したがって $n\ge N$ ならtailのすべての項がこの区間に入るため
$$
L-\varepsilon\le i_n\le s_n\le L+\varepsilon.
$$
よって $i_n\to L$, $s_n\to L$、すなわち $\liminf a_n=\limsup a_n=L$ です。

逆に $i_n\to L$, $s_n\to L$ とします。定義から常に
$$
i_n\le a_n\le s_n.
$$
任意の $\varepsilon>0$ に対し、十分大きい $n$ では
$$
L-\varepsilon<i_n\le a_n\le s_n<L+\varepsilon.
$$
したがって $|a_n-L|<\varepsilon$ であり、$a_n\to L$ です。$\square$
<!-- proof-end -->

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

<!-- proof-start -->
### 証明

部分和 $S_n=\sum_{k=1}^n a_k$ を取ると、$m>n$ に対して
$$
S_m-S_n=\sum_{k=n+1}^{m}a_k.
$$
したがって定理のtail条件は
$$
|S_m-S_n|<\varepsilon
$$
という部分和列 $(S_n)$ のCauchy条件そのものです。実数では「収束列ならCauchy列」であり、逆にCauchy列は完備性により収束します。ゆえに級数の収束とtail条件は同値です。$\square$
<!-- proof-end -->

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

$\sum |a_n|$ が収束するとします。[級数のCauchy判定](#thm-ra1-series-cauchy)から、任意の $\varepsilon>0$ に対し、ある $N$ が存在して $m>n\ge N$ なら
$$
\sum_{k=n+1}^{m}|a_k|<\varepsilon
$$
です。三角不等式により
$$
\left|\sum_{k=n+1}^{m}a_k\right|
\le \sum_{k=n+1}^{m}|a_k|<\varepsilon.
$$
したがって $\sum a_n$ 自身もCauchy判定を満たし、収束します。$\square$
<!-- proof-end -->

---

## 4. Cauchy積と再配列

絶対収束が強い理由を、二つの操作について確認します。

### 絶対収束級数は並べ替えても和が変わらない

$\sum_{n=1}^{\infty}a_n=S$ が絶対収束し、$\pi:\mathbb N\to\mathbb N$ が全単射だとします。並べ替えた部分和を
$$
T_N=\sum_{j=1}^{N}a_{\pi(j)}
$$
と置きます。

任意の $\varepsilon>0$ に対し、絶対収束からある $M$ を選んで
$$
\sum_{k>M}|a_k|<\varepsilon
$$
とできます。$\pi$ は全単射なので、十分大きい $N$ では $1,2,\dots,M$ がすべて $\pi(1),\dots,\pi(N)$ の中に現れます。そのとき $S-T_N$ に残るのは添字が $M$ より大きい項だけなので
$$
|S-T_N|\le\sum_{k>M}|a_k|<\varepsilon.
$$
したがって $T_N\to S$ です。ここで「有限個の主要項を先に全部捕まえ、残りを絶対値tailで抑える」のが核心です。

### 絶対収束級数のCauchy積

$\sum_{n=0}^{\infty}a_n=A$, $\sum_{n=0}^{\infty}b_n=B$ が絶対収束し、
$$
c_n=\sum_{k=0}^{n}a_kb_{n-k}
$$
とします。非負の有限和について
$$
\sum_{j=0}^{N}\sum_{k=0}^{M}|a_jb_k|
=\left(\sum_{j=0}^{N}|a_j|\right)
 \left(\sum_{k=0}^{M}|b_k|\right)
$$
なので、$N,M\to\infty$ とすると
$$
\sum_{j,k\ge0}|a_jb_k|
=\left(\sum_{j\ge0}|a_j|\right)
 \left(\sum_{k\ge0}|b_k|\right)<\infty.
$$
したがって二重に並ぶ項 $a_jb_k$ は絶対収束しており、先ほどの再配列の議論により順番を変えても和は変わりません。対角線 $j+k=n$ ごとにまとめると
$$
\sum_{n=0}^{\infty}c_n
=\sum_{j,k\ge0}a_jb_k
=AB.
$$
また
$$
\sum_{n=0}^{\infty}|c_n|
\le\sum_{j,k\ge0}|a_jb_k|<\infty
$$
なのでCauchy積も絶対収束します。

条件収束ではこの「tailを絶対値でまとめて抑える」操作ができず、再配列で和が変わり得ます。

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

<!-- proof-start -->
### 証明

$$
\alpha=\limsup_{n\to\infty}|c_n|^{1/n}
$$
と置きます。まず $0<\alpha<\infty$ の場合を考え、$r=|x-x_0|$ とします。

もし $\alpha r<1$ なら、$\alpha r<q<1$ を満たす $q$ を一つ取れます。limsupの定義から十分大きい $n$ では
$$
|c_n|^{1/n}r<q,
$$
したがって
$$
|c_n(x-x_0)^n|<q^n.
$$
幾何級数 $\sum q^n$ が収束するので、比較により元の冪級数は絶対収束します。

逆に $\alpha r>1$ なら、$1<q<\alpha r$ を取れます。limsupが $\alpha$ であることから
$$
|c_n|^{1/n}r>q
$$
となる $n$ が無限に存在します。そのような $n$ では
$$
|c_n(x-x_0)^n|>q^n>1,
$$
よって一般項が0へ行きません。したがって級数は発散します。

以上から $r<1/\alpha$ で絶対収束し、$r>1/\alpha$ で発散するので $R=1/\alpha$ です。$\alpha=0$ なら任意の有限の $r$ で上の収束側の議論が使えて $R=\infty$、$\alpha=\infty$ なら任意の $r>0$ で発散側の議論が使えて $R=0$ です。$\square$
<!-- proof-end -->

**端点 $|x-x_0|=R$ は別判定**です。上の証明でも等号の場合だけは決まっていません。

<!-- definition-example-start: def-ra1-limsup, def-ra1-series, def-ra1-absolute, def-ra1-power-series -->
**定義の確認**：まず $a_n=(-1)^n$ では、どのtailにも $1$ と $-1$ が現れるので $s_n=1$, $i_n=-1$、したがって $\limsup a_n=1$, $\liminf a_n=-1$ です。次に $\sum_{n=0}^{\infty}2^{-n}$ は部分和 $S_N=2-2^{-N}$ が $2$ に収束するので、級数の定義どおり収束します。また $\sum_{n=0}^{\infty}(-1)^n/(n+1)^2$ は、絶対値級数を $n+1=2^j,\dots,2^{j+1}-1$ のブロックに分けると第 $j$ ブロックが高々 $2^{-j}$ なので収束し、したがって絶対収束です。最後に $\sum_{n=0}^{\infty}x^n$ は中心0の冪級数で、$|x|<1$ では幾何級数として絶対収束し、$|x|>1$ では一般項が0へ行かないため発散するので、収束半径は $R=1$ です。
<!-- definition-example-end -->

---

## 6. 演習

### Level A

<a id="ex-ra1-a01"></a>
#### RA1-A01 単調収束
- Level: A

$a_n=1-1/n$ が収束することを示し、極限を求めよ。

<!-- solution-start -->
**解答**：
$$
a_{n+1}-a_n
=\left(1-\frac1{n+1}\right)-\left(1-\frac1n\right)
=\frac1{n(n+1)}>0
$$
なので $(a_n)$ は単調増加です。また $a_n<1$ だから上に有界です。[有界単調数列の収束定理](#thm-ra1-monotone) により収束します。さらに $1/n\to0$ なので
$$
\lim_{n\to\infty}a_n=1.
$$
<!-- solution-end -->

<a id="ex-ra1-a02"></a>
#### RA1-A02 limsup
- Level: A

$a_n=(-1)^n+1/n$ の $\limsup$ と $\liminf$ を求めよ。

<!-- solution-start -->
**解答**：偶数番目では
$$
a_{2k}=1+\frac1{2k}\to1,
$$
奇数番目では
$$
a_{2k-1}=-1+\frac1{2k-1}\to-1.
$$
しかも十分後ろのtailでは偶数項が最大側、奇数項が最小側を支配し、そのずれ $1/n$ は0へ行きます。したがって
$$
\limsup a_n=1,\qquad \liminf a_n=-1.
$$
<!-- solution-end -->

<a id="ex-ra1-a03"></a>
#### RA1-A03 幾何級数
- Level: A

$|r|<1$ のとき $\sum_{n=0}^{\infty}r^n$ を求めよ。

<!-- solution-start -->
**解答**：$r\ne1$ なので有限部分和は
$$
S_N=1+r+\cdots+r^N=\frac{1-r^{N+1}}{1-r}.
$$
$|r|<1$ なら $r^{N+1}\to0$ だから
$$
\sum_{n=0}^{\infty}r^n=\lim_{N\to\infty}S_N=\frac1{1-r}.
$$
<!-- solution-end -->

<a id="ex-ra1-a04"></a>
#### RA1-A04 冪級数の端点
- Level: A

$\sum_{n=1}^{\infty}x^n/n$ の収束半径を求め、$x=1,-1$ を判定せよ。

<!-- solution-start -->
**解答**：係数 $c_n=1/n$ に対して
$$
|c_n|^{1/n}=n^{-1/n}\to1
$$
なので [Cauchy–Hadamardの公式](#thm-ra1-cauchy-hadamard) から $R=1$ です。

$x=1$ では調和級数になります。部分和を
$$
1+\frac12+\left(\frac13+\frac14\right)
+\left(\frac15+\cdots+\frac18\right)+\cdots
$$
と2の冪ごとにまとめると、各ブロックは少なくとも $1/2$ なので発散します。

$x=-1$ では偶数部分和を組にして
$$
S_{2m}
=\sum_{k=1}^{m}\left(-\frac1{2k-1}+\frac1{2k}\right)
=-\sum_{k=1}^{m}\frac1{(2k-1)2k}.
$$
ここで
$$
0<\frac1{(2k-1)2k}\le\frac1{k(k+1)}
=\frac1k-\frac1{k+1},
$$
なので右辺は収束します。また
$$
S_{2m+1}-S_{2m}=-\frac1{2m+1}\to0
$$
だから奇数部分和も同じ極限へ行き、級数全体が収束します。
<!-- solution-end -->

### Level B

<a id="ex-ra1-b01"></a>
#### RA1-B01 絶対収束
- Level: B

$\sum (-1)^n/(n+1)^2$ が絶対収束することを示せ。

<!-- solution-start -->
**解答**：絶対値を取ると $\sum 1/(n+1)^2$ です。$m\ge0$ とし、添字 $k=n+1$ を
$$
2^m\le k<2^{m+1}
$$
でブロック分けします。このブロックには高々 $2^m$ 個の項があり、各項は高々 $1/2^{2m}$ なので、ブロック和は高々
$$
2^m\frac1{2^{2m}}=\frac1{2^m}.
$$
したがって全体は収束する幾何級数 $\sum 2^{-m}$ で上から抑えられます。よって絶対収束です。
<!-- solution-end -->

<a id="ex-ra1-b02"></a>
#### RA1-B02 Cauchy判定で調和級数を落とす
- Level: B

$\sum_{n=1}^{\infty}1/n$ がCauchy条件を満たさないことを示せ。

<!-- solution-start -->
**解答**：どれだけ大きい $N$ を与えられても $n\ge N$ を取り、$m=2n$ とします。すると
$$
\sum_{k=n+1}^{2n}\frac1k
\ge n\frac1{2n}=\frac12.
$$
したがって $\varepsilon=1/2$ に対してtailを一様に小さくする $N$ は存在せず、[級数のCauchy判定](#thm-ra1-series-cauchy) を満たしません。
<!-- solution-end -->

<a id="ex-ra1-b03"></a>
#### RA1-B03 Cauchy積
- Level: B

$\sum_{n\ge0}x^n$ と自身のCauchy積を求めよ。

<!-- solution-start -->
**解答**：$|x|<1$ では両方の幾何級数が絶対収束するのでCauchy積を取れます。第 $n$ 係数は
$$
c_n=\sum_{k=0}^{n}x^kx^{n-k}
=\sum_{k=0}^{n}x^n
=(n+1)x^n.
$$
したがって
$$
\left(\sum_{n=0}^{\infty}x^n\right)^2
=\sum_{n=0}^{\infty}(n+1)x^n.
$$
左辺は $1/(1-x)^2$ なので
$$
\frac1{(1-x)^2}=\sum_{n=0}^{\infty}(n+1)x^n,
\qquad |x|<1.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra1-c01"></a>
#### RA1-C01 条件収束と再配列
- Level: C

交代調和級数について、正項だけの和と負項の絶対値の和がともに発散することを示し、正項と負項の取り方を変えると任意の実数 $L$ に近づく再配列を構成できる理由を説明せよ。

<!-- solution-start -->
**解答**：交代調和級数を
$$
1-\frac12+\frac13-\frac14+\cdots
$$
とします。正項の和は
$$
1+\frac13+\frac15+\cdots
$$
で、$1/(2k-1)\ge1/(2k)$ だから調和級数の半分より大きく発散します。負項の絶対値の和は
$$
\frac12+\frac14+\frac16+\cdots
=\frac12\sum_{k=1}^{\infty}\frac1k
$$
なので、これも発散します。

そこで正項は元の順番のまま足し続け、初めて部分和が $L$ を上回るところで止めます。正項の和が $+\infty$ へ発散するので必ず止まれます。次に、まだ使っていない負項を元の順番のまま足し、初めて $L$ を下回るところで止めます。負項の絶対値の和が $+\infty$ へ発散するので、これも必ず止まれます。この二操作を交互に繰り返します。

$L$ を上回ったときの超過量は、その段階で最後に加えた正項より大きくありません。同様に下回ったときの不足量の絶対値は、最後に加えた負項の絶対値以下です。使う項の大きさは $1/n\to0$ なので、上下の越え幅は0へ行きます。したがって各ブロック末端の部分和は $L$ に近づき、ブロック内部でも最後に加える項の大きさが0へ行くため、再配列した部分和全体が $L$ に収束します。

また各段階で「まだ使っていない次の正項・負項」から順に使うため、元の級数の各項は有限段階で必ず一度だけ現れます。よってこれは本当に再配列です。
<!-- solution-end -->

---

## 7. 次に進む

**数値級数の収束判定を固める：[RA1A 数値級数の収束論](../RA1A/index.md)**  

**連続関数へ進む：[RA2 極限・連続・一様連続](../RA2/index.md)**