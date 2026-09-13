# RA1A 標準実解析 I-A：数値級数の収束論

[RA1](../RA1/index.md) では、級数を部分和列として定義し、Cauchy判定と絶対収束の基礎まで確認しました。本章では、その基礎から **実際に級数の収束・発散を判定する理論** を組み立てます。

判定法を暗記するのではなく、どの仕組みに還元しているかを意識します。

- 非負項級数：部分和が単調増加するので「上に有界か」を見る。
- 比較・比・根判定：既知の幾何級数や既知級数へ押し込む。
- 交代級数：偶数部分和と奇数部分和を挟む。
- Dirichlet・Abel：部分和の振動を有界に保ち、重みの減衰でtailを消す。
- 条件収束：絶対値でtailを抑えられないため、再配列で和が変わり得る。

---

## 1. 最初に見るべき必要条件

<a id="thm-ra1a-term-zero"></a>
<!-- formal-statement-start -->
> **定理（級数収束の一般項必要条件）**  
> 実数級数 $\sum_{n=1}^{\infty}a_n$ が収束するなら
$$
a_n\to0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

部分和を
$$
S_n=\sum_{k=1}^{n}a_k
$$
と置きます。級数が収束するとは、ある $S\in\mathbb R$ が存在して $S_n\to S$ ということでした。

ところが
$$
a_n=S_n-S_{n-1}.
$$
$n\to\infty$ とすると、$S_n\to S$ かつ $S_{n-1}\to S$ なので
$$
a_n\to S-S=0.
$$
したがって一般項は0へ行きます。$\square$
<!-- proof-end -->

逆は成り立ちません。典型例は調和級数
$$
\sum_{n=1}^{\infty}\frac1n
$$
です。一般項 $1/n$ は0へ行きますが、級数は発散します。

> **実戦上の順序**：まず $a_n\to0$ を確認する。0へ行かなければ即発散。0へ行っても、それだけでは何も保証しない。

---

## 2. 非負項級数は「部分和が上に有界か」に帰着する

<a id="def-ra1a-nonnegative"></a>
<!-- formal-statement-start -->
> **定義（非負項級数）**  
> 各 $n$ について $a_n\ge0$ である級数
$$
\sum_{n=1}^{\infty}a_n
$$
> を非負項級数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra1a-nonnegative -->
**定義の確認**：$\sum 2^{-n}$、$\sum 1/n^2$ は非負項級数です。一方 $\sum(-1)^{n-1}/n$ は符号が変わるため非負項級数ではありません。
<!-- definition-example-end -->

<a id="thm-ra1a-nonnegative-bounded"></a>
<!-- formal-statement-start -->
> **定理（非負項級数の部分和有界性判定）**  
> $a_n\ge0$ とし、
$$
S_N=\sum_{n=1}^{N}a_n
$$
> と置く。このとき $\sum a_n$ が収束することと、部分和列 $(S_N)$ が上に有界であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a_n\ge0$ なので
$$
S_{N+1}-S_N=a_{N+1}\ge0.
$$
したがって $(S_N)$ は単調増加列です。

部分和列が上に有界なら、[有界単調数列の収束定理](../RA1/index.md#thm-ra1-monotone) により $(S_N)$ は収束します。よって級数は収束します。

逆に級数が収束するなら $(S_N)$ は収束列なので有界です。特に上に有界です。$\square$
<!-- proof-end -->

この定理が比較判定の土台です。非負項級数では「部分和が単調」という構造があるため、Cauchy条件を毎回直接調べる必要がありません。

---

## 3. 比較判定と極限比較判定

<a id="thm-ra1a-comparison"></a>
<!-- formal-statement-start -->
> **定理（級数の比較判定）**  
> 十分大きい $n$ で
$$
0\le a_n\le b_n
$$
> とする。
>
> 1. $\sum b_n$ が収束すれば $\sum a_n$ も収束する。
> 2. $\sum a_n$ が発散すれば $\sum b_n$ も発散する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限個の初項は収束性を変えないので、すべての $n$ で $0\le a_n\le b_n$ としてよいです。

部分和を
$$
A_N=\sum_{n=1}^{N}a_n,
\qquad
B_N=\sum_{n=1}^{N}b_n
$$
とします。各 $N$ で
$$
0\le A_N\le B_N.
$$

$\sum b_n$ が収束するなら $(B_N)$ は上に有界です。したがって $(A_N)$ も上に有界です。前節の非負項級数の判定から $\sum a_n$ は収束します。

第2項は第1項の対偶です。$\square$
<!-- proof-end -->

<a id="thm-ra1a-limit-comparison"></a>
<!-- formal-statement-start -->
> **定理（級数の極限比較判定）**  
> $a_n>0$, $b_n>0$ とし、
$$
\frac{a_n}{b_n}\to L,
\qquad 0<L<\infty
$$
> とする。このとき $\sum a_n$ と $\sum b_n$ は同時に収束し、同時に発散する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0<L<\infty$ なので、例えば $\varepsilon=L/2$ を取れます。十分大きい $n$ では
$$
\left|\frac{a_n}{b_n}-L\right|<\frac L2.
$$
したがって
$$
\frac L2<\frac{a_n}{b_n}<\frac{3L}{2},
$$
すなわち
$$
\frac L2 b_n<a_n<\frac{3L}{2}b_n.
$$

よって $\sum b_n$ が収束すれば右側の比較から $\sum a_n$ が収束し、$\sum a_n$ が収束すれば左側の比較を
$$
b_n<\frac2L a_n
$$
と読み替えて $\sum b_n$ が収束します。したがって収束性は一致します。$\square$
<!-- proof-end -->

### 例：有理式は最高次数を見る

$$
a_n=\frac{3n^2+1}{n^4+7}
$$
では
$$
\frac{a_n}{1/n^2}
=\frac{3n^4+n^2}{n^4+7}\to3.
$$
したがって $\sum a_n$ は $\sum1/n^2$ と同じ収束性を持ちます。

---

## 4. 比判定：隣接項が幾何級数型に縮むか

<a id="thm-ra1a-ratio"></a>
<!-- formal-statement-start -->
> **定理（級数の比判定）**  
> $a_n\ne0$ が十分大きい $n$ で成り立ち、
$$
\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|=L
$$
> とする。
>
> - $L<1$ なら $\sum a_n$ は絶対収束する。
> - $L>1$ なら $\sum a_n$ は発散する。
> - $L=1$ からは一般には何も判定できない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $L<1$ とします。$L<q<1$ を一つ取ります。比の極限が $L$ なので、ある $N$ が存在して $n\ge N$ なら
$$
\left|\frac{a_{n+1}}{a_n}\right|\le q.
$$
よって帰納的に
$$
|a_{N+k}|\le |a_N|q^k.
$$
したがってtailは収束する幾何級数で支配され、
$$
\sum_{n=N}^{\infty}|a_n|
\le |a_N|\sum_{k=0}^{\infty}q^k<\infty.
$$
有限個の初項を戻しても絶対収束します。

次に $L>1$ とします。$1<q<L$ を取れば、十分大きい $n$ で
$$
\left|\frac{a_{n+1}}{a_n}\right|\ge q>1.
$$
したがって $|a_n|$ はその後少なくとも幾何級数的に増加し、特に $a_n\to0$ ではありません。よって[級数収束の一般項必要条件](#thm-ra1a-term-zero)から級数は発散します。

$L=1$ の場合、$\sum1/n$ は発散し、$\sum1/n^2$ は収束しますが、どちらも
$$
\frac{a_{n+1}}{a_n}\to1.
$$
したがって $L=1$ は判定不能です。$\square$
<!-- proof-end -->

階乗や指数関数が混ざる級数では特に強力です。

---

## 5. 根判定：一項だけ見て幾何級数型か調べる

<a id="thm-ra1a-root"></a>
<!-- formal-statement-start -->
> **定理（級数の根判定）**  
> 
$$
\rho=\limsup_{n\to\infty}|a_n|^{1/n}
$$
> とする。
>
> - $\rho<1$ なら $\sum a_n$ は絶対収束する。
> - $\rho>1$ なら $\sum a_n$ は発散する。
> - $\rho=1$ からは一般には何も判定できない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\rho<1$ とします。$\rho<q<1$ を取ります。limsupの定義から十分大きい $n$ では
$$
|a_n|^{1/n}\le q,
$$
したがって
$$
|a_n|\le q^n.
$$
よって $\sum|a_n|$ は幾何級数で上から抑えられ、絶対収束します。

$\rho>1$ とします。$1<q<\rho$ を取ります。limsupが $\rho$ であることから
$$
|a_n|^{1/n}>q
$$
となる $n$ が無限に存在します。そのような $n$ では
$$
|a_n|>q^n>1.
$$
したがって $a_n\to0$ ではなく、級数は発散します。

$\rho=1$ では $1/n$ と $1/n^2$ がともに $n$ 乗根極限1を持つので判定できません。$\square$
<!-- proof-end -->

比判定が隣接項の比を要求するのに対し、根判定は $n$ 乗根だけを見ます。$a_n=(c_n)^n$ のような項では根判定が自然です。

---

## 6. Cauchy凝縮判定と $p$ 級数

<a id="thm-ra1a-condensation"></a>
<!-- formal-statement-start -->
> **定理（Cauchy凝縮判定）**  
> $(a_n)$ が非負で単調減少するとする。このとき
$$
\sum_{n=1}^{\infty}a_n
$$
> が収束することと
$$
\sum_{k=0}^{\infty}2^k a_{2^k}
$$
> が収束することは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

添字を
$$
2^k\le n<2^{k+1}
$$
という2進ブロックに分けます。このブロックには $2^k$ 個の項があります。

$a_n$ は単調減少なので、ブロック内では
$$
a_{2^{k+1}}\le a_n\le a_{2^k}.
$$
したがってブロック和 $B_k$ は
$$
2^k a_{2^{k+1}}
\le
B_k:=\sum_{n=2^k}^{2^{k+1}-1}a_n
\le
2^k a_{2^k}.
$$

右側の評価から、凝縮級数 $\sum2^k a_{2^k}$ が収束すれば、元の級数をブロックごとに足した級数も比較判定により収束します。

逆に元の級数が収束するとします。左側の評価を書き換えると
$$
2^{k+1}a_{2^{k+1}}\le2B_k.
$$
よって
$$
\sum_{k=0}^{\infty}2^{k+1}a_{2^{k+1}}
$$
は $2\sum B_k$ で上から抑えられ、収束します。最初の有限個の項は収束性を変えないので、凝縮級数全体も収束します。$\square$
<!-- proof-end -->

### $p$ 級数の完全分類

$$
\sum_{n=1}^{\infty}\frac1{n^p}
$$
を考えます。

$p\le0$ なら一般項が0へ行かないので発散です。$p>0$ では $n^{-p}$ は非負単調減少なので凝縮判定を使えます。

凝縮級数は
$$
\sum_{k=0}^{\infty}2^k(2^k)^{-p}
=\sum_{k=0}^{\infty}2^{k(1-p)}.
$$
これは幾何級数であり、公比 $2^{1-p}$ が1未満であることと $p>1$ は同値です。したがって
$$
\sum_{n=1}^{\infty}\frac1{n^p}
\begin{cases}
\text{収束},&p>1,\\
\text{発散},&p\le1.
\end{cases}
$$

### 対数補正級数

$n\ge2$ で
$$
a_n=\frac1{n(\log n)^q}
$$
とします。十分大きい $n$ では単調減少です。凝縮すると
$$
2^k a_{2^k}
=
\frac{1}{(k\log2)^q}.
$$
よって $p$ 級数との比較から
$$
\sum_{n=2}^{\infty}\frac1{n(\log n)^q}
$$
は $q>1$ のとき、かつそのときに限り収束します。

---

## 7. 交代級数：符号の相殺を定理にする

<a id="def-ra1a-alternating"></a>
<!-- formal-statement-start -->
> **定義（交代級数）**  
> $b_n\ge0$ を用いて
$$
\sum_{n=1}^{\infty}(-1)^{n-1}b_n
$$
> の形に書ける級数を交代級数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra1a-alternating -->
**定義の確認**：交代調和級数
$$
1-\frac12+\frac13-\frac14+\cdots
$$
は $b_n=1/n$ とした交代級数です。
<!-- definition-example-end -->

<a id="thm-ra1a-leibniz"></a>
<!-- formal-statement-start -->
> **定理（Leibnizの交代級数判定）**  
> $b_n\ge0$ が単調減少し $b_n\to0$ とする。このとき
$$
\sum_{n=1}^{\infty}(-1)^{n-1}b_n
$$
> は収束する。
>
> さらに和を $S$、第 $N$ 部分和を $S_N$ とすると
$$
|S-S_N|\le b_{N+1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

部分和を $S_N$ とします。偶数部分和について
$$
S_{2m+2}-S_{2m}
=b_{2m+1}-b_{2m+2}\ge0
$$
なので $(S_{2m})$ は単調増加です。

一方、奇数部分和は
$$
S_{2m+3}-S_{2m+1}
=-b_{2m+2}+b_{2m+3}\le0
$$
なので $(S_{2m+1})$ は単調減少です。

また
$$
S_{2m+1}-S_{2m}=b_{2m+1}\ge0,
$$
したがってすべての $m$ で
$$
S_{2m}\le S_{2m+1}.
$$
偶数部分和列は上から奇数部分和で抑えられ、奇数部分和列は下から偶数部分和で抑えられるため、両者は有界単調列としてそれぞれ収束します。

極限を
$$
S_{2m}\to L_-,\qquad S_{2m+1}\to L_+
$$
とすると
$$
L_+-L_-
=\lim_{m\to\infty}(S_{2m+1}-S_{2m})
=\lim_{m\to\infty}b_{2m+1}=0.
$$
よって $L_-=L_+=S$ で、部分和列全体が $S$ に収束します。

剰余評価を示します。$S$ は $S_N$ と $S_{N+1}$ の間にあります。したがって
$$
|S-S_N|
\le |S_{N+1}-S_N|
=b_{N+1}.
$$
これで剰余評価も得られました。$\square$
<!-- proof-end -->

交代調和級数はこの定理で収束します。一方
$$
\sum\left|\frac{(-1)^{n-1}}n\right|
=\sum\frac1n
$$
は発散するので、交代調和級数は条件収束です。

---

## 8. Abelの部分和変換：離散版の部分積分

<a id="thm-ra1a-abel-summation"></a>
<!-- formal-statement-start -->
> **定理（Abelの部分和変換）**  
> $m\le n$ とし、
$$
A_k=\sum_{j=m}^{k}a_j
$$
> と置く。このとき
$$
\sum_{k=m}^{n}a_kb_k
=A_nb_n+
\sum_{k=m}^{n-1}A_k(b_k-b_{k+1}).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A_m=a_m$、また $k>m$ では
$$
a_k=A_k-A_{k-1}
$$
です。したがって
$$
\sum_{k=m}^{n}a_kb_k
=A_mb_m+
\sum_{k=m+1}^{n}(A_k-A_{k-1})b_k.
$$
右辺を展開すると
$$
A_mb_m+\sum_{k=m+1}^{n}A_kb_k
-\sum_{k=m+1}^{n}A_{k-1}b_k.
$$
最後の和で添字を一つ戻すと
$$
A_nb_n+\sum_{k=m}^{n-1}A_kb_k
-\sum_{k=m}^{n-1}A_kb_{k+1},
$$
よって
$$
A_nb_n+\sum_{k=m}^{n-1}A_k(b_k-b_{k+1})
$$
となります。$\square$
<!-- proof-end -->

連続版の部分積分
$$
\int u\,dv=uv-\int v\,du
$$
に対応する公式です。次のDirichlet判定・Abel判定の核心になります。

---

## 9. Dirichlet判定：振動する部分和を減衰重みで消す

<a id="thm-ra1a-dirichlet"></a>
<!-- formal-statement-start -->
> **定理（級数のDirichlet判定）**  
> 部分和
$$
A_N=\sum_{n=1}^{N}a_n
$$
> が有界であり、$b_n\ge0$ が単調減少して $b_n\to0$ とする。このとき
$$
\sum_{n=1}^{\infty}a_nb_n
$$
> は収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|A_N|\le M$ とします。級数のCauchy条件を示します。

$m\le n$ とし、tail側の部分和
$$
B_k=\sum_{j=m}^{k}a_j=A_k-A_{m-1}
$$
を置きます。すると
$$
|B_k|\le |A_k|+|A_{m-1}|\le2M.
$$

Abelの部分和変換をtail $m,\dots,n$ に適用すると
$$
\sum_{k=m}^{n}a_kb_k
=B_nb_n+\sum_{k=m}^{n-1}B_k(b_k-b_{k+1}).
$$
$b_k$ は単調減少なので $b_k-b_{k+1}\ge0$ です。したがって
$$
\left|\sum_{k=m}^{n}a_kb_k\right|
\le2Mb_n+2M\sum_{k=m}^{n-1}(b_k-b_{k+1}).
$$
差分和は望遠和になり、
$$
\sum_{k=m}^{n-1}(b_k-b_{k+1})=b_m-b_n.
$$
よって
$$
\left|\sum_{k=m}^{n}a_kb_k\right|
\le2Mb_n+2M(b_m-b_n)
=2Mb_m.
$$
$b_m\to0$ なので、任意の $\varepsilon>0$ に対し十分大きい $m$ では右辺が $\varepsilon$ 未満になります。したがって[級数のCauchy判定](../RA1/index.md#thm-ra1-series-cauchy)を満たし、級数は収束します。$\square$
<!-- proof-end -->

Leibniz判定は $a_n=(-1)^{n-1}$ としたDirichlet判定の特別な場合でもあります。実際、$a_n$ の部分和は0と1の間にあり有界です。

---

## 10. Abel判定：収束級数に単調有界な重みを掛ける

<a id="thm-ra1a-abel-test"></a>
<!-- formal-statement-start -->
> **定理（級数のAbel判定）**  
> $\sum a_n$ が収束し、$(b_n)$ が単調かつ有界であるとする。このとき
$$
\sum_{n=1}^{\infty}a_nb_n
$$
> は収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(b_n)$ は単調かつ有界なので、[有界単調数列の収束定理](../RA1/index.md#thm-ra1-monotone)により
$$
b_n\to b
$$
となる $b\in\mathbb R$ が存在します。

そこで
$$
c_n=b_n-b
$$
と置きます。$c_n\to0$ であり、$c_n$ は単調です。必要なら全体に $-1$ を掛ければ、十分後ろでは $c_n\ge0$ の単調減少列として扱えます。

$\sum a_n$ が収束するので、その部分和は有界です。したがってDirichlet判定から
$$
\sum a_nc_n
$$
は収束します。一方
$$
\sum a_nb
=b\sum a_n
$$
も収束します。

最後に
$$
a_nb_n=a_n(c_n+b)
$$
なので
$$
\sum a_nb_n
=\sum a_nc_n+b\sum a_n
$$
は収束します。$\square$
<!-- proof-end -->

---

## 11. 条件収束と再配列

<a id="def-ra1a-rearrangement"></a>
<!-- formal-statement-start -->
> **定義（級数の再配列）**  
> $\pi:\mathbb N\to\mathbb N$ を全単射とする。級数 $\sum a_n$ に対し
$$
\sum_{n=1}^{\infty}a_{\pi(n)}
$$
> を元の級数の再配列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ra1a-rearrangement -->
**定義の確認**：$a_1+a_2+a_3+a_4+\cdots$ を $a_2+a_1+a_4+a_3+\cdots$ と並べるのは再配列です。項を落としたり同じ項を二度使ったりしたものは再配列ではありません。
<!-- definition-example-end -->

RA1で示したように、絶対収束級数は再配列しても和が変わりません。条件収束では事情が逆転します。

<a id="thm-ra1a-riemann-rearrangement"></a>
<!-- formal-statement-start -->
> **定理（Riemann再配列定理（有限値版））**  
> 実数級数 $\sum a_n$ が条件収束するとする。このとき任意の $L\in\mathbb R$ に対して、$L$ に収束する再配列が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正側・負側の非負列を
$$
p_n=\max(a_n,0),
\qquad
q_n=\max(-a_n,0)
$$
と置きます。すると
$$
a_n=p_n-q_n,
\qquad
|a_n|=p_n+q_n.
$$

まず
$$
\sum p_n=+\infty,
\qquad
\sum q_n=+\infty
$$
を示します。もし $\sum p_n$ が有限なら、$\sum a_n$ が収束することから
$$
\sum q_n=\sum p_n-\sum a_n
$$
も有限になります。すると
$$
\sum|a_n|=\sum p_n+\sum q_n<\infty
$$
となり、条件収束という仮定に反します。$\sum q_n$ が有限と仮定した場合も同様です。

次に、正の項を元の順序のまま足し、部分和が初めて $L$ を上回るところまで進めます。正項の総和が $+\infty$ なので必ず上回れます。

そこから負の項を元の順序のまま足し、部分和が初めて $L$ を下回るところまで進めます。負項の絶対値の総和も $+\infty$ なので必ず下回れます。

この「上へ越える」「下へ越える」を交互に繰り返します。各段階ではまだ使っていない次の正項または負項から順に取ります。正項・負項はどちらも無限に必要になるので、それぞれ元の順序で有限番目の項まで必ず消費されます。$a_n=0$ となる項があれば、正負の各ブロックの末尾などに元の順序で挿入しても部分和を変えません。したがって正・負・0のすべての元の項をちょうど一度ずつ使う全単射 $\pi:\mathbb N\to\mathbb N$ が得られ、構成した級数は本当に再配列です。

上へ越えた直後の超過量は、そのとき最後に加えた正項以下です。下へ越えた直後の不足量の絶対値は、最後に加えた負項の絶対値以下です。

元の級数が収束するので必要条件から $a_n\to0$ です。したがって使われる正項・負項の大きさも0へ行きます。よって $L$ の上下への越え幅は0へ行きます。

各ブロックの内部も確認します。正項を加えるブロックは $L$ より下の直前端点から単調に増え、最終端点で初めて $L$ を上回ります。したがってそのブロック内の任意の部分和 $T$ は、直前端点を $U<L$、最終端点を $V>L$ とすれば
$$
U\le T\le V,
$$
よって
$$
|T-L|\le\max\{L-U,\,V-L\}.
$$
負項を加えるブロックでも不等号を逆にした同じ挟み撃ちが成り立ちます。直前端点と最終端点の $L$ からの距離は、上で示した上下の越え幅なのでともに0へ行きます。したがってブロック端点だけでなく、ブロック内部を含む再配列後の部分和全体が $L$ に収束します。$\square$
<!-- proof-end -->

絶対収束と条件収束の違いは「収束するかどうか」だけではありません。**無限個の項を並べ替える操作に対して値が安定かどうか**という構造上の差です。

---

## 12. 判定法の選び方

級数を見たら、次の順序で考えると無駄が少なくなります。

1. 一般項が0へ行くか。行かなければ発散。
2. 非負項か。既知の $p$ 級数・幾何級数と比較できないか。
3. 階乗・指数があれば比判定。
4. $n$ 乗された形なら根判定。
5. 単調非負で $1/n$ 周辺の遅い減衰ならCauchy凝縮。
6. 符号が交互ならLeibniz。
7. 振動する係数の部分和が有界ならDirichlet。
8. 既に収束する級数へ単調有界な重みを掛けているならAbel。

比判定・根判定で値が1になったときは「失敗した」のではなく、**その判定法が境界を識別できない**という意味です。その場合は比較・凝縮・交代・Dirichletなど別の構造を見る必要があります。

---

## 13. 演習

### Level A

<a id="ex-ra1a-a01"></a>
#### RA1A-A01 一般項必要条件
- Level: A

次の級数のうち、一般項必要条件だけで発散と判定できるものを選べ。

1. $\sum n/(n+1)$
2. $\sum 1/\sqrt n$
3. $\sum (-1)^n$
4. $\sum 1/n^2$

<!-- solution-start -->
**解答**：一般項が0へ行かなければ発散です。

1. $n/(n+1)\to1$ なので発散。
2. $1/\sqrt n\to0$ なので必要条件だけでは判定不能。
3. $(-1)^n$ は0へ行かないので発散。
4. $1/n^2\to0$ なので必要条件だけでは判定不能。

したがって必要条件だけで落とせるのは1と3です。2が実際には発散、4が収束することからも「一般項が0」は十分条件ではないと分かります。
<!-- solution-end -->

<a id="ex-ra1a-a02"></a>
#### RA1A-A02 比較判定
- Level: A

$$
\sum_{n=1}^{\infty}\frac1{n^2+3n}
$$
の収束を示せ。

<!-- solution-start -->
**解答**：$n\ge1$ で
$$
n^2+3n\ge n^2
$$
だから
$$
0<\frac1{n^2+3n}\le\frac1{n^2}.
$$
$p=2>1$ の $p$ 級数 $\sum1/n^2$ は収束するので、[級数の比較判定](#thm-ra1a-comparison)から元の級数も収束します。
<!-- solution-end -->

<a id="ex-ra1a-a03"></a>
#### RA1A-A03 極限比較
- Level: A

$$
\sum_{n=1}^{\infty}\frac{2n+5}{n^3+1}
$$
を判定せよ。

<!-- solution-start -->
**解答**：$b_n=1/n^2$ と比較します。
$$
\frac{(2n+5)/(n^3+1)}{1/n^2}
=\frac{2n^3+5n^2}{n^3+1}\to2.
$$
極限は正の有限値です。したがって極限比較判定により $\sum1/n^2$ と同じ収束性を持ち、収束します。
<!-- solution-end -->

<a id="ex-ra1a-a04"></a>
#### RA1A-A04 比判定
- Level: A

$$
\sum_{n=1}^{\infty}\frac{n}{2^n}
$$
の収束を示せ。

<!-- solution-start -->
**解答**：$a_n=n/2^n$ と置くと
$$
\frac{a_{n+1}}{a_n}
=\frac{n+1}{2n}\to\frac12<1.
$$
したがって比判定により絶対収束、ここでは正項なのでそのまま収束します。
<!-- solution-end -->

<a id="ex-ra1a-a05"></a>
#### RA1A-A05 根判定
- Level: A

$$
\sum_{n=1}^{\infty}\left(\frac{2n+1}{3n+4}\right)^n
$$
を判定せよ。

<!-- solution-start -->
**解答**：
$$
|a_n|^{1/n}=\frac{2n+1}{3n+4}\to\frac23<1.
$$
したがって根判定により絶対収束します。
<!-- solution-end -->

<a id="ex-ra1a-a06"></a>
#### RA1A-A06 交代級数と誤差
- Level: A

$$
\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}n
$$
について、収束を示し、第10部分和 $S_{10}$ と真の和 $S$ の誤差を評価せよ。

<!-- solution-start -->
**解答**：$b_n=1/n$ は非負、単調減少、かつ0へ収束します。したがって[Leibnizの交代級数判定](#thm-ra1a-leibniz)から級数は収束します。

剰余評価より
$$
|S-S_{10}|\le b_{11}=\frac1{11}.
$$
和そのものを知らなくても誤差を評価できる点が重要です。
<!-- solution-end -->

<a id="ex-ra1a-a07"></a>
#### RA1A-A07 $p$ 級数
- Level: A

$$
\sum_{n=1}^{\infty}\frac1{n^{3/4}},
\qquad
\sum_{n=1}^{\infty}\frac1{n^{5/4}}
$$
を判定せよ。

<!-- solution-start -->
**解答**：$p$ 級数は $p>1$ のとき、かつそのときに限り収束します。

したがって $p=3/4\le1$ の前者は発散、$p=5/4>1$ の後者は収束です。
<!-- solution-end -->

### Level B

<a id="ex-ra1a-b01"></a>
#### RA1A-B01 対数補正級数
- Level: B

実数 $q$ に対して
$$
\sum_{n=2}^{\infty}\frac1{n(\log n)^q}
$$
を分類せよ。

<!-- solution-start -->
**解答**：十分大きい $n$ では項は非負単調減少です。[Cauchy凝縮判定](#thm-ra1a-condensation)を使うと
$$
2^k\frac1{2^k(\log2^k)^q}
=\frac1{(k\log2)^q}
=\frac1{(\log2)^q}\frac1{k^q}.
$$
定数倍は収束性を変えません。よって凝縮級数は $p$ 級数 $\sum1/k^q$ と同じ収束性を持ちます。

したがって
$$
q>1
$$
のとき、かつそのときに限り収束します。
<!-- solution-end -->

<a id="ex-ra1a-b02"></a>
#### RA1A-B02 比判定・根判定の境界
- Level: B

$\sum1/n$ と $\sum1/n^2$ について、比判定と根判定がどちらも境界値1を返すことを示し、それでも収束性が異なる理由を説明せよ。

<!-- solution-start -->
**解答**：$a_n=1/n^p$ とすると
$$
\frac{a_{n+1}}{a_n}
=\left(\frac n{n+1}\right)^p\to1.
$$
したがって $p=1,2$ のどちらでも比判定の極限は1です。

また
$$
(a_n)^{1/n}=n^{-p/n}
=\exp\left(-\frac{p\log n}{n}\right)\to1
$$
なので根判定の値も1です。

しかし $p$ 級数の完全分類により $p=1$ は発散、$p=2$ は収束です。つまり比・根判定の値1は「収束性が同じ」という意味ではなく、その判定法では一次的な幾何減衰の差を検出できないという意味です。
<!-- solution-end -->

<a id="ex-ra1a-b03"></a>
#### RA1A-B03 Dirichlet判定の基本例
- Level: B

$b_n$ が非負単調減少で $b_n\to0$ とする。このとき
$$
\sum_{n=1}^{\infty}(-1)^{n-1}b_n
$$
がDirichlet判定からも収束することを示せ。

<!-- solution-start -->
**解答**：
$$
a_n=(-1)^{n-1}
$$
と置きます。その部分和は
$$
A_N=1,0,1,0,\dots
$$
なので
$$
|A_N|\le1.
$$
すなわち部分和は有界です。

一方 $b_n$ は仮定により非負単調減少で0へ収束します。したがって[級数のDirichlet判定](#thm-ra1a-dirichlet)から
$$
\sum a_nb_n
=\sum(-1)^{n-1}b_n
$$
は収束します。これはLeibniz判定がDirichlet判定の特別な場合であることを示しています。
<!-- solution-end -->

<a id="ex-ra1a-b04"></a>
#### RA1A-B04 Abel判定の使い方
- Level: B

$\sum a_n$ が収束するとする。
$$
\sum_{n=1}^{\infty}\frac{n}{n+1}a_n
$$
が収束することを示せ。

<!-- solution-start -->
**解答**：
$$
b_n=\frac n{n+1}=1-\frac1{n+1}
$$
と置きます。$(b_n)$ は単調増加し、$0<b_n<1$ なので有界です。

よってAbel判定の仮定を満たし、
$$
\sum a_nb_n
$$
は収束します。

直接見るなら
$$
\frac n{n+1}a_n=a_n-\frac{a_n}{n+1}
$$
であり、第2項側はDirichlet判定で収束します。Abel判定はこの構造を一般化したものです。
<!-- solution-end -->

<a id="ex-ra1a-b05"></a>
#### RA1A-B05 条件収束の分類
- Level: B

実数 $p$ に対して
$$
\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n^p}
$$
を「絶対収束・条件収束・発散」に分類せよ。

<!-- solution-start -->
**解答**：

$p\le0$ では $1/n^p$ が0へ行かないので、一般項も0へ行かず発散します。

$0<p\le1$ では $n^{-p}$ は非負単調減少で0へ行くのでLeibniz判定により元の交代級数は収束します。しかし絶対値級数
$$
\sum\frac1{n^p}
$$
は $p\le1$ なので発散します。したがって条件収束です。

$p>1$ では絶対値級数が $p$ 級数として収束するため絶対収束です。

よって
$$
\begin{cases}
p>1 &: \text{絶対収束},\\
0<p\le1 &: \text{条件収束},\\
p\le0 &: \text{発散}.
\end{cases}
$$
<!-- solution-end -->

<a id="ex-ra1a-b06"></a>
#### RA1A-B06 再配列アルゴリズム
- Level: B

交代調和級数を、任意に与えた $L\in\mathbb R$ へ収束するよう再配列する手順を説明し、その手順が途中で停止しない理由を示せ。

<!-- solution-start -->
**解答**：交代調和級数の正項は
$$
1+\frac13+\frac15+\cdots
$$
で、
$$
\frac1{2k-1}\ge\frac1{2k}
$$
だから調和級数の半分以上となり $+\infty$ へ発散します。

負項の絶対値の和は
$$
\frac12+\frac14+\frac16+\cdots
=\frac12\sum_{k=1}^{\infty}\frac1k
$$
なので、これも $+\infty$ へ発散します。

そこで未使用の正項を順に足し、部分和が初めて $L$ を上回るまで進めます。正項和が $+\infty$ なので必ず上回れます。次に未使用の負項を順に足し、初めて $L$ を下回るまで進めます。負項の絶対値和が $+\infty$ なので必ず下回れます。

これを交互に続けます。越え幅は各段階の最後の項以下で、その大きさは0へ行くため、部分和は $L$ に収束します。また各符号の項を元の順に消費するので全項を一度ずつ使い、真の再配列になります。
<!-- solution-end -->

### Level C

<a id="ex-ra1a-c01"></a>
#### RA1A-C01 二重対数まで含む境界級数
- Level: C

$n\ge3$ とし、実数 $p,q$ に対して
$$
\sum_{n=3}^{\infty}
\frac1{n(\log n)^p(\log\log n)^q}
$$
の収束域を求めよ。

<!-- solution-start -->
**解答**：まず十分大きい $n$ では項は非負単調減少です。

ここで一度、対数対数因子の大きさを定量化します。任意の $r\in\mathbb R$ と $\delta>0$ に対して、十分大きい $n$ では
$$
(\log\log n)^r\le (\log n)^\delta
$$
が成り立ちます。$r\le0$ なら左辺は十分大きい $n$ で1以下なので明らかです。$r>0$ なら両辺の対数を取り、
$$
r\log\log\log n\le\delta\log\log n
$$
を示せばよいです。$t=\log\log n\to\infty$ と置けば、これは
$$
\frac{\log t}{t}\le\frac{\delta}{r}
$$
に等しく、$\log t/t\to0$ から十分大きい $t$ で成立します。

$p>1$ とし $\delta=(p-1)/2>0$ と置きます。上の評価を $r=-q$ に適用すると、十分大きい $n$ で
$$
(\log\log n)^{-q}\le (\log n)^\delta.
$$
したがって
$$
\frac1{n(\log n)^p(\log\log n)^q}
\le
\frac1{n(\log n)^{p-\delta}}
=
\frac1{n(\log n)^{(p+1)/2}}.
$$
$(p+1)/2>1$ なのでB01の分類から右辺の級数は収束し、比較判定により元も収束します。

$p<1$ とし $\delta=(1-p)/2>0$ と置きます。上の評価を $r=q$ に適用すると、十分大きい $n$ で
$$
(\log\log n)^q\le(\log n)^\delta.
$$
したがって
$$
\frac1{n(\log n)^p(\log\log n)^q}
\ge
\frac1{n(\log n)^{p+\delta}}
=
\frac1{n(\log n)^{(p+1)/2}}.
$$
ここで $(p+1)/2<1$ なのでB01の分類から右辺は発散し、比較判定により元も発散します。

残る境界 $p=1$ を調べます。このときCauchy凝縮すると、定数倍を除いて
$$
\sum_{k}
\frac1{k(\log k)^q}
$$
になります。これはB01で扱った対数補正級数と同型なので $q>1$ のとき、かつそのときに限り収束します。

したがって収束条件は
$$
\boxed{p>1\quad\text{または}\quad p=1,\ q>1}.
$$
<!-- solution-end -->

<a id="ex-ra1a-c02"></a>
#### RA1A-C02 根判定が失敗する収束級数
- Level: C

$$
a_n=\frac{2+(-1)^n}{n^2}
$$
とする。$\sum a_n$ が収束することを示し、一方で根判定が境界値1しか返さないことを示せ。

<!-- solution-start -->
**解答**：$2+(-1)^n$ は1または3なので
$$
0<a_n\le\frac3{n^2}.
$$
$\sum3/n^2$ は収束するため比較判定から $\sum a_n$ は収束します。

一方
$$
(a_n)^{1/n}
=\frac{(2+(-1)^n)^{1/n}}{n^{2/n}}.
$$
分子は1へ、分母も1へ収束するので
$$
(a_n)^{1/n}\to1.
$$
したがって根判定は境界値1を返し、単独では判定できません。

この例は「高度そうな判定を使えば必ず決まる」のではなく、級数の形に合った判定を選ぶ必要があることを示します。
<!-- solution-end -->

<a id="ex-ra1a-c03"></a>
#### RA1A-C03 Riemann再配列定理の核心
- Level: C

条件収束級数 $\sum a_n$ について、正側の非負列 $p_n=\max(a_n,0)$ と負側の非負列 $q_n=\max(-a_n,0)$ の和が両方とも $+\infty$ でなければならないことを、絶対収束との関係から証明せよ。その事実が再配列構成のどこで使われるか説明せよ。

<!-- solution-start -->
**解答**：
$$
a_n=p_n-q_n,
\qquad
|a_n|=p_n+q_n
$$
です。

もし $\sum p_n<\infty$ なら、元の級数 $\sum a_n$ は有限値へ収束するので
$$
\sum q_n
=\sum p_n-\sum a_n
$$
も有限になります。すると
$$
\sum|a_n|
=\sum p_n+\sum q_n<\infty,
$$
つまり元の級数は絶対収束してしまい、条件収束に反します。

同様に $\sum q_n<\infty$ と仮定しても矛盾します。したがって
$$
\sum p_n=\sum q_n=+\infty.
$$

再配列構成では、正項を足して任意の目標値 $L$ を必ず上回れることに $\sum p_n=+\infty$ を使い、負項を足して必ず $L$ を下回れることに $\sum q_n=+\infty$ を使います。この二つがあるから「上へ越える／下へ越える」という操作を無限に継続できます。

さらに元の級数が収束するため $a_n\to0$ であり、これが上下の越え幅を0へ縮め、最終的な収束を保証します。
<!-- solution-end -->

---

## 14. 次に進む

- 連続関数の理論へ進むなら **[RA2 極限・連続・一様連続](../RA2/index.md)**。
- 数値級数と積分の対応を見たいなら **[RA4A 広義積分・収束判定](../RA4A/index.md)**。
- 関数を項とする級数へ進むなら **[RA5 関数列・関数級数・一様収束](../RA5/index.md)**。
