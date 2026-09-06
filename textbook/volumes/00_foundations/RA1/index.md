# RA1 標準実解析 I：数列・級数

この章は、既存の [実数の上限性質](../F0_00A1B_実数の上限性質_Archimedes性/index.md)、[点列・部分列](../F0_00B0_点列_部分列_十分大きい添字/index.md)、[Cauchy列と完備性](../F0_00D_Cauchy列_完備性_無限次元/index.md) を土台に、実解析の最初の定理列を組み立てます。

計算上「収束しそう」ではなく、**何が存在を保証し、どの判定がどこまで言っているか**を分離するのが狙いです。

---

## 1. 単調列はなぜ収束するのか

<a id="thm-ra1-monotone"></a>
<!-- formal-statement-start -->
> **定理（単調収束定理）**  
> 上に有界な単調増加実数列 $(a_n)$ は収束し、
> $$
> \lim_{n\to\infty}a_n=\sup\{a_n:n\in\mathbb N\}.
> $$
> 下に有界な単調減少列についても同様である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A=\{a_n:n\in\mathbb N\}$ と置き、$L=\sup A$ とします。任意の $\varepsilon>0$ に対して $L-\varepsilon$ は上界ではないので、ある $N$ が存在して
$$
L-\varepsilon<a_N\le L.
$$
単調増加性より $n\ge N$ なら $a_N\le a_n\le L$ だから
$$
|a_n-L|<\varepsilon.
$$
したがって $a_n\to L$ です。$\square$
<!-- proof-end -->

ここで本質的に使ったのは「有界だから」ではなく、**有界集合が上限を実数として持つ**ことです。

---

## 2. limsup / liminf

<a id="def-ra1-limsup"></a>
<!-- formal-statement-start -->
> **定義（上極限・下極限）**  
> 実数列 $(a_n)$ に対し
> $$
> s_n=\sup_{k\ge n}a_k,\qquad i_n=\inf_{k\ge n}a_k
> $$
> と置く。拡張実数を許して
> $$
> \limsup_{n\to\infty}a_n=\lim_{n\to\infty}s_n,\qquad
> \liminf_{n\to\infty}a_n=\lim_{n\to\infty}i_n
> $$
> と定める。
<!-- formal-statement-end -->

$s_n$ は単調減少、$i_n$ は単調増加です。「後ろを全部見た最大側・最小側」が徐々に絞られる、と読むとよいです。

<a id="thm-ra1-limsup-criterion"></a>
<!-- formal-statement-start -->
> **定理（limsup・liminfによる収束判定）**  
> $(a_n)$ が有限値 $L$ に収束することと
> $$
> \liminf a_n=\limsup a_n=L
> $$
> は同値である。
<!-- formal-statement-end -->

例えば $a_n=(-1)^n$ では $\limsup a_n=1$, $\liminf a_n=-1$ なので収束しません。

---

## 3. 級数は部分和の点列

<a id="def-ra1-series"></a>
<!-- formal-statement-start -->
> **定義（級数の収束）**  
> 級数 $\sum_{n=1}^\infty a_n$ が収束するとは、部分和
> $$
> S_N=\sum_{n=1}^N a_n
> $$
> が有限値へ収束することをいう。
<!-- formal-statement-end -->

したがって級数の問題は点列 $(S_N)$ の問題です。

<a id="thm-ra1-series-cauchy"></a>
<!-- formal-statement-start -->
> **定理（級数のCauchy判定）**  
> 実数級数 $\sum a_n$ が収束することと、任意の $\varepsilon>0$ に対し、ある $N$ が存在して $m>n\ge N$ なら
> $$
> \left|\sum_{k=n+1}^{m}a_k\right|<\varepsilon
> $$
> となることは同値である。
<!-- formal-statement-end -->

これは部分和列がCauchy列であることそのものです。

### よく使う判定

- 比較判定：$0\le a_n\le b_n$ で $\sum b_n$ が収束なら $\sum a_n$ も収束。
- 比判定：$|a_{n+1}/a_n|\to q<1$ なら絶対収束。
- 根判定：$\limsup |a_n|^{1/n}<1$ なら絶対収束。
- 交代級数判定：$b_n\downarrow0$ なら $\sum(-1)^{n-1}b_n$ は収束。

<a id="thm-ra1-absolute"></a>
<!-- formal-statement-start -->
> **定理（絶対収束なら収束）**  
> $\sum |a_n|<\infty$ なら $\sum a_n$ は収束する。
<!-- formal-statement-end -->

証明はCauchy判定と
$$
\left|\sum_{k=n+1}^{m}a_k\right|\le\sum_{k=n+1}^{m}|a_k|
$$
だけです。逆は偽で、交代調和級数が典型例です。

---

## 4. Cauchy積と再配列

絶対収束級数では項の順序を変えても和は変わりません。また $\sum a_n$, $\sum b_n$ が絶対収束するとき、Cauchy積
$$
c_n=\sum_{k=0}^{n}a_kb_{n-k}
$$
は絶対収束し
$$
\sum_{n=0}^\infty c_n=\left(\sum_{n=0}^\infty a_n\right)\left(\sum_{n=0}^\infty b_n\right)
$$
となります。

一方、条件収束では再配列で和が変わり得ます。これが「絶対収束は強い」という意味です。

---

## 5. 冪級数と収束半径

<a id="def-ra1-power-series"></a>
<!-- formal-statement-start -->
> **定義（冪級数・収束半径）**  
> 中心 $x_0$ の冪級数は
> $$
> \sum_{n=0}^{\infty}c_n(x-x_0)^n
> $$
> の形の級数である。ある $R\in[0,\infty]$ が存在し、$|x-x_0|<R$ で絶対収束し、$|x-x_0|>R$ で発散する。この $R$ を収束半径という。
<!-- formal-statement-end -->

<a id="thm-ra1-cauchy-hadamard"></a>
<!-- formal-statement-start -->
> **定理（Cauchy–Hadamardの公式）**  
> $$
> \frac1R=\limsup_{n\to\infty}|c_n|^{1/n}
> $$
> と解釈すれば冪級数の収束半径が与えられる。
<!-- formal-statement-end -->

重要なのは **端点 $|x-x_0|=R$ は別判定** だということです。

---

## 6. 演習

### Level A

<a id="ex-ra1-a01"></a>
#### RA1-A01 単調収束
- Level: A
- 目安時間: 8分

$a_n=1-1/n$ が収束することを単調性と有界性から示し、極限を求めよ。

<!-- solution-start -->
**解答**：$a_{n+1}-a_n=1/(n(n+1))>0$ なので単調増加、かつ $a_n<1$。単調収束定理より収束し、直接 $1/n\to0$ から極限は $1$。
<!-- solution-end -->

<a id="ex-ra1-a02"></a>
#### RA1-A02 limsup
- Level: A
- 目安時間: 5分

$a_n=(-1)^n+1/n$ の $\limsup$ と $\liminf$ を求めよ。

<!-- solution-start -->
**解答**：偶数部分列は $1+1/(2k)\to1$、奇数部分列は $-1+1/(2k-1)\to-1$。したがって $\limsup a_n=1$, $\liminf a_n=-1$。
<!-- solution-end -->

<a id="ex-ra1-a03"></a>
#### RA1-A03 幾何級数
- Level: A
- 目安時間: 5分

$|r|<1$ のとき $\sum_{n=0}^\infty r^n$ を求めよ。

<!-- solution-start -->
**解答**：$S_N=(1-r^{N+1})/(1-r)$。$r^{N+1}\to0$ より $S_N\to1/(1-r)$。
<!-- solution-end -->

<a id="ex-ra1-a04"></a>
#### RA1-A04 端点判定
- Level: A
- 目安時間: 8分

$\sum_{n=1}^\infty x^n/n$ の収束半径を求め、$x=1,-1$ を個別に判定せよ。

<!-- solution-start -->
**解答**：$|c_n|^{1/n}=n^{-1/n}\to1$ なので $R=1$。$x=1$ は調和級数で発散、$x=-1$ は交代級数判定により収束する。
<!-- solution-end -->

### Level B

<a id="ex-ra1-b01"></a>
#### RA1-B01 絶対収束
- Level: B
- 目安時間: 10分

$\sum (-1)^n/(n+1)^2$ が絶対収束することを示せ。

<!-- solution-start -->
**解答**：絶対値級数は $\sum 1/(n+1)^2$ で、$p=2>1$ の $p$ 級数だから収束する。よって元の級数は絶対収束する。
<!-- solution-end -->

<a id="ex-ra1-b02"></a>
#### RA1-B02 Cauchy判定で調和級数を落とす
- Level: B
- 目安時間: 12分

$\sum_{n=1}^\infty1/n$ がCauchy判定を満たさないことを示せ。

<!-- solution-start -->
**解答**：$m=2n$ と取ると
$$
\sum_{k=n+1}^{2n}\frac1k\ge n\frac1{2n}=\frac12.
$$
したがって $\varepsilon=1/3$ などに対してtailを一様に小さくできず、発散する。
<!-- solution-end -->

<a id="ex-ra1-b03"></a>
#### RA1-B03 Cauchy積
- Level: B
- 目安時間: 15分

$\sum_{n\ge0}x^n$ と自身のCauchy積の係数を求め、$|x|<1$ で $1/(1-x)^2$ の級数表示を得よ。

<!-- solution-start -->
**解答**：$x^n$ の係数は $n+1$ 通りの積 $x^kx^{n-k}$ から出るので Cauchy積は $\sum_{n\ge0}(n+1)x^n$。絶対収束域で積を取れるため $1/(1-x)^2=\sum_{n\ge0}(n+1)x^n$。
<!-- solution-end -->

### Level C

<a id="ex-ra1-c01"></a>
#### RA1-C01 条件収束と再配列
- Level: C
- 目安時間: 25分

交代調和級数の正項だけの和と負項の絶対値の和がともに発散することを示し、「正項を目標値より上まで足し、次に負項を目標値より下まで足す」操作を繰り返すと任意の実数 $L$ へ収束する再配列を作れる理由を説明せよ。

<!-- solution-start -->
**解答**：正項は奇数逆数、負項の絶対値は偶数逆数で、どちらも調和級数との比較で発散する。したがって任意の段階で目標 $L$ を上からも下からも越えられる。一方、使う項の絶対値は $1/n\to0$ なので、越え幅は段階とともに0へ行く。よって上下から $L$ を挟む部分和列が得られ、再配列後の部分和は $L$ に収束する。
<!-- solution-end -->

---

## 7. 次に進む

次は、数列の収束を関数へ持ち上げ、極限・連続・一様連続を整理します。

**次：[RA2 極限・連続・一様連続](../RA2_極限_連続_一様連続/index.md)**
