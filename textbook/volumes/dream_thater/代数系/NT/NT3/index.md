# NT3 平方剰余・平方剰余の相互法則

前章の[素数法の乗法群の巡回性](../NT2/index.md#thm-nt2-finite-subgroup-cyclic)によって、素数 $p$ を法とする零でない剰余類は一つの原始根のべきとして表せます。では、合同式 $x^2\equiv a\pmod p$ は、実際に $x$ を総当たりしなくても解けるかどうか判定できるでしょうか。さらに、異なる素数 $p,q$ について「$q$ は法 $p$ で平方になるか」と「$p$ は法 $q$ で平方になるか」の間に関係はあるでしょうか。

この章では、平方となるかどうかを $1,-1,0$ の三値で表し、積の符号の数え上げから判定法を作ります。中心となる異なる素数間の平方性を結ぶ定理は、符号の数え上げによる補題を証明したうえで、長方形の格子点を二通りに数えて導きます。以後、特に断らなければ $p,q$ は奇素数、整数の合同式は指定された法での合同を意味します。

## 1. 平方となる余りを調べる

例えば法 $7$ で $1^2,2^2,3^2$ の余りはそれぞれ $1,4,2$ です。$4^2,5^2,6^2$ は $3^2,2^2,1^2$ と同じ余りになるため、零でない平方の余りはちょうど $1,2,4$ です。$3,5,6$ は零でない平方の形で表せません。

ここで「平方である」とは整数として平方数そのものになることではなく、**法 $p$ で平方と合同になること**です。

<a id="def-nt3-quadratic-residue"></a>

<!-- formal-statement-start -->
> **定義（平方剰余と平方非剰余）**  
> 奇素数 $p$ と $p\nmid a$ を満たす整数 $a$ に対し、$x^2\equiv a\pmod p$ を満たす整数 $x$ が存在するとき $a$ を法 $p$ の平方剰余、存在しないとき平方非剰余という。$p\mid a$ の場合は零剰余として区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt3-quadratic-residue -->
### 例：法 $7$ で定義の条件を確かめる

**定義の確認**：$x=1,2,3,4,5,6$ の平方を法 $7$ で順に計算すると $1,4,2,2,4,1$ です。したがって $2$ は $3^2\equiv2$ で平方剰余、$3$ は候補六つのどの平方にも一致しないので平方非剰余、$7$ は $p\mid a$ なのでどちらにも分類しません。
<!-- definition-example-end -->

平方剰余かどうかを毎回「解が存在するか」で書くのは煩雑です。次の記号に判定結果をまとめます。

<a id="def-nt3-legendre-symbol"></a>

<!-- formal-statement-start -->
> **定義（Legendre 記号）**  
> 奇素数 $p$ と整数 $a$ に対し、Legendre 記号を次で定める。
>
$$
\left(\frac ap\right)=
\begin{cases}
 0 & (p\mid a),\\
 1 & (p\nmid a,\ x^2\equiv a\pmod p\text{ が可解}),\\
-1 & (p\nmid a,\ x^2\equiv a\pmod p\text{ が不可解}).
\end{cases}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt3-legendre-symbol -->
### 例：三つの値はどう違うか

**定義の確認**：法 $7$ では $\left(\frac27\right)=1$、$\left(\frac37\right)=-1$、$\left(\frac77\right)=0$ です。最後の $0$ は「平方方程式が不可解」という意味ではありません。実際、$x^2\equiv0\pmod7$ には $x\equiv0$ という解があります。
<!-- definition-example-end -->

零でない剰余 $x$ と $-x$ の平方は等しく、奇素数では $x\not\equiv-x\pmod p$ です。もし $x^2\equiv y^2$ なら、$p\mid(x-y)(x+y)$ より $x\equiv y$ または $x\equiv-y$ となります。よって零でない $p-1$ 個の元は二つずつの組に分かれ、平方剰余は $(p-1)/2$ 個です。

## 2. べき乗による判定：Euler の規準

[原始根の存在](../NT2/index.md#thm-nt2-finite-subgroup-cyclic)によって、法 $p$ の零でない元を $g^j$ と表せます。平方であるための条件は、指数 $j$ が偶数であることです。なぜなら $g^{2t}$ は $(g^t)^2$ であり、逆に $g^j=(g^t)^2$ なら $g^{j-2t}=1$ なので $p-1\mid j-2t$、$p-1$ が偶数だから $j$ も偶数だからです。

<a id="thm-nt3-euler-criterion"></a>

<!-- formal-statement-start -->
> **定理（Euler の規準）**  
> 奇素数 $p$ と $p\nmid a$ を満たす整数 $a$ に対して、
>
$$
a^{(p-1)/2}\equiv\left(\frac ap\right)\pmod p.
$$
>
> 右辺は整数 $1$ または $-1$ と見なして合同式へ代入する。
<!-- formal-statement-end -->

### 証明の見取り図

原始根 $g$ を用い、$a\equiv g^j$ と置きます。$g^{(p-1)/2}$ は位数 $2$ の元、すなわち $-1$ です。指数 $j$ の偶奇と平方の可否が一致します。

<!-- proof-start -->
### 証明

[素数法の乗法群の巡回性](../NT2/index.md#thm-nt2-finite-subgroup-cyclic)から位数 $p-1$ の元 $g$ を取ります。$m=(p-1)/2$ とすると、$g^{2m}=1$ で $g^m\neq1$ です。また $(g^m)^2=1$ なので、体 $\mathbb Z/p\mathbb Z$ における因数分解 $(g^m-1)(g^m+1)=0$ から $g^m=-1$ が従います。

$a\equiv g^j$ と書くと
$$
a^m\equiv(g^m)^j=(-1)^j\pmod p.
$$
$j$ が偶数なら $a$ は $(g^{j/2})^2$ です。逆に $a\equiv x^2$ なら $x\not\equiv0$ で $x\equiv g^t$ と書け、$g^j=g^{2t}$ より $p-1\mid j-2t$、従って $j$ は偶数です。よって $(-1)^j$ は平方剰余で $1$、平方非剰余で $-1$ となり、[Legendre 記号の定義](#def-nt3-legendre-symbol)と一致します。
<!-- proof-end -->

<a id="prop-nt3-legendre-multiplicative"></a>

<!-- formal-statement-start -->
> **命題（Legendre 記号の乗法性）**  
> 奇素数 $p$ と任意の整数 $a,b$ に対して
>
$$
\left(\frac{ab}p\right)=
\left(\frac ap\right)\left(\frac bp\right).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\mid a$ または $p\mid b$ なら両辺は $0$ です。そうでなければ[Euler の規準](#thm-nt3-euler-criterion)を三つの整数 $a,b,ab$ に適用し、
$$
\left(\frac{ab}p\right)
\equiv (ab)^{(p-1)/2}
=a^{(p-1)/2}b^{(p-1)/2}
\equiv \left(\frac ap\right)\left(\frac bp\right)\pmod p
$$
を得ます。両辺は $1,-1$ のいずれかで、奇素数 $p\ge3$ では $1$ と $-1$ は異なる剰余類なので、整数としても等しいことが分かります。
<!-- proof-end -->

この乗法性により、複雑な分子を素因数ごとに分けて調べられます。ただし法は**素数**であることが今の証明の条件です。

## 3. Gauss の補題：符号が何回反転するか

Euler の規準は判定をべき乗へ変えました。しかし相互法則を導くには、べき乗の代わりに「小さな剰余が負側へ移る回数」を数えるほうが便利です。

$m=(p-1)/2$ とし、$a,2a,\ldots,ma$ を法 $p$ で $1,\ldots,p-1$ に取り直します。そのうち $p/2$ より大きい剰余の個数を $\nu_p(a)$ と書きます。

<a id="lem-nt3-gauss"></a>

<!-- formal-statement-start -->
> **補題（Gauss の補題）**  
> 奇素数 $p$、$p\nmid a$、$m=(p-1)/2$ に対し、$ak$（$1\le k\le m$）の最小正剰余のうち $p/2$ より大きいものの個数を $\nu_p(a)$ とすると、
>
$$
\left(\frac ap\right)=(-1)^{\nu_p(a)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正剰余が後半に入ったものを $r$ から $r-p$（負の代表元）へ取り替えます。その絶対値が $1,\ldots,m$ を重複なく一巡するので、積を比較すると符号だけが残ります。

<!-- proof-start -->
### 証明

$ak$ の最小正剰余を $r_k$ とし、
$$
s_k=\begin{cases}r_k&(1\le r_k\le m),\\r_k-p&(m<r_k<p)\end{cases}
$$
と置きます。$s_k\equiv ak\pmod p$、$|s_k|\in\{1,\ldots,m\}$ です。もし $|s_i|=|s_j|$ なら $ai\equiv\pm aj\pmod p$ なので、$p\nmid a$ を使って $i\equiv\pm j\pmod p$ です。$1\le i,j\le m$ では $0< i+j\le p-1$ なので $i\equiv-j$ は不可能、$i\equiv j$ なら $i=j$ です。

したがって $|s_1|,\ldots,|s_m|$ は $1,\ldots,m$ の並べ替えです。負の $s_k$ は $\nu_p(a)$ 個だから、法 $p$ で積を比較すると
$$
a^m m! \equiv\prod_{k=1}^m s_k
=(-1)^{\nu_p(a)}m! \pmod p.
$$
$m!$ の因子 $1,\ldots,m$ はいずれも $p$ で割れないため、[逆元の存在条件](../NT1/index.md#prop-nt1-inverse-criterion)から $m!$ を約分できます。よって $a^m\equiv(-1)^{\nu_p(a)}\pmod p$ です。[Euler の規準](#thm-nt3-euler-criterion)と比較し、両辺の符号が一致することを得ます。
<!-- proof-end -->

例えば $p=11,a=2$ とすると、$2,4,6,8,10$ のうち $11/2$ より大きいものは $6,8,10$ の三つです。したがって $\left(\frac2{11}\right)=(-1)^3=-1$ です。

## 4. 補充法則：$-1$ と $2$ を判定する

まず $a=-1$ なら[Euler の規準](#thm-nt3-euler-criterion)に代入するだけです。$a=2$ なら[Gauss の補題](#lem-nt3-gauss)の大きな剰余の個数を数えます。

<a id="thm-nt3-supplement-minus-one"></a>

<!-- formal-statement-start -->
> **定理（第一補充法則）**  
> 奇素数 $p$ について
>
$$
\left(\frac{-1}p\right)=(-1)^{(p-1)/2}
=\begin{cases}1&(p\equiv1\pmod4),\\-1&(p\equiv3\pmod4).\end{cases}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\nmid-1$ なので[Euler の規準](#thm-nt3-euler-criterion)を $a=-1$ に適用すると
$$
\left(\frac{-1}p\right)\equiv(-1)^{(p-1)/2}\pmod p
$$
です。左右とも $1$ または $-1$ なので整数として等しくなります。$(p-1)/2$ が偶数である条件は $p\equiv1\pmod4$、奇数である条件は $p\equiv3\pmod4$ です。
<!-- proof-end -->

<a id="thm-nt3-supplement-two"></a>

<!-- formal-statement-start -->
> **定理（第二補充法則）**  
> 奇素数 $p$ について
>
$$
\left(\frac2p\right)=(-1)^{(p^2-1)/8}
=\begin{cases}
1&(p\equiv1,7\pmod8),\\
-1&(p\equiv3,5\pmod8).
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$2k$ は $2\le2k\le p-1$ なので、折り返しを起こすのは $2k>p/2$、すなわち $k>p/4$ の場合だけです。その個数の偶奇を $p\bmod8$ で調べます。

<!-- proof-start -->
### 証明

$m=(p-1)/2$ とします。$2,4,\ldots,2m=p-1$ はすべて $p$ 未満なので、$p/2$ を越える項は $k>p/4$ を満たす $k=1,\ldots,m$ です。よって
$$
\nu_p(2)=m-\left\lfloor\frac p4\right\rfloor.
$$
$p=8t+r$（$r=1,3,5,7$）と書くと、この個数は順に $2t,2t+1,2t+1,2t+2$ です。[Gauss の補題](#lem-nt3-gauss)から符号は順に $1,-1,-1,1$ です。

また奇数 $p$ に対して $(p^2-1)/8$ は整数です。$p=8t+r$ のとき
$$
\frac{p^2-1}{8}=8t^2+2tr+\frac{r^2-1}{8}
$$
であり、最後の項の偶奇は $r=1,3,5,7$ の順に $0,1,1,0$ です。したがって式の二つの表現は一致します。
<!-- proof-end -->

この二法則だけで $\left(\frac{-2}p\right)$ も[乗法性](#prop-nt3-legendre-multiplicative)から求まります。例えば法 $13$ では $\left(\frac{-1}{13}\right)=1$、$\left(\frac2{13}\right)=-1$ だから $\left(\frac{-2}{13}\right)=-1$ です。

## 5. 平方剰余の相互法則を完全に証明する

ここまでの補題は法 $p$ の内部で完結していました。異なる二つの奇素数の関係を得るため、Gauss の補題の符号を床関数の和に書き換えます。

<a id="lem-nt3-eisenstein"></a>

<!-- formal-statement-start -->
> **補題（Gauss の補題の床関数表示）**  
> 異なる奇素数 $p,q$ と $m=(p-1)/2$ に対し、
>
$$
\left(\frac qp\right)
=(-1)^{\,\sum_{k=1}^{m}\lfloor kq/p\rfloor}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$qk=p h_k+r_k$（$1\le r_k\le p-1$）と割り算します。$r_k$ を正負の小さな代表元に直す際、負へ変える回数の偶奇と $\sum h_k$ の偶奇が一致することを、和の比較で確かめます。

<!-- proof-start -->
### 証明

各 $k=1,\ldots,m$ について
$$
qk=p h_k+r_k,\quad
h_k=\left\lfloor\frac{qk}{p}\right\rfloor,\quad
1\le r_k\le p-1
$$
と書きます。$p\neq q$ は素数なので $p\nmid qk$ であり、$r_k=0$ はありません。$r_k>p/2$ となる添字の集合を $U$、個数を $\nu$ とします。$b_k=\min(r_k,p-r_k)$ は[Gauss の補題の証明](#lem-nt3-gauss)と同じ理由で $1,\ldots,m$ の並べ替えです。

$r_k=b_k$（$k\notin U$）、$r_k=p-b_k$（$k\in U$）なので
$$
\sum_{k=1}^{m}r_k
=\sum_{k=1}^{m}b_k+\nu p-2\sum_{k\in U}b_k
=\sum_{k=1}^{m}k+\nu p-2\sum_{k\in U}b_k.
$$
一方、$qk=ph_k+r_k$ を全 $k$ について足すと
$$
q\sum_{k=1}^{m}k
=p\sum_{k=1}^{m}h_k+\sum_{k=1}^{m}r_k.
$$
二式を差し引けば
$$
(q-1)\sum_{k=1}^{m}k
=p\left(\sum_{k=1}^{m}h_k+\nu\right)
-2\sum_{k\in U}b_k.
$$
$q-1$ は偶数、$p$ は奇数なので両辺を法 $2$ で見ると $\sum h_k+\nu\equiv0\pmod2$、すなわち $\nu\equiv\sum h_k\pmod2$ です。[Gauss の補題](#lem-nt3-gauss)を $a=q$ に適用して結論を得ます。
<!-- proof-end -->

長方形の格子点を数える準備ができました。次の定理は素数の大小には依存しません。

<a id="thm-nt3-quadratic-reciprocity"></a>

<!-- formal-statement-start -->
> **定理（平方剰余の相互法則）**  
> $p,q$ を互いに異なる奇素数とする。このとき
>
$$
\left(\frac pq\right)\left(\frac qp\right)
=(-1)^{\frac{p-1}{2}\frac{q-1}{2}}.
$$
>
> したがって、少なくとも一方が $1\bmod4$ なら二つの Legendre 記号は等しく、両方が $3\bmod4$ なら符号が逆になる。
<!-- formal-statement-end -->

### 証明の見取り図

$m=(p-1)/2$、$n=(q-1)/2$ とします。$m\times n$ 個の格子点 $(k,j)$ を直線 $pj=qk$ の上側と下側に分けます。直線上に整数格子点がないため、各点は必ず片方だけに属します。それぞれの領域の個数が、直前の補題の二つの床関数和です。

<!-- proof-start -->
### 証明

$m=(p-1)/2$、$n=(q-1)/2$ とし、
$$
R=\{(k,j)\in\mathbb Z^2:1\le k\le m,\ 1\le j\le n\}
$$
と置きます。$|R|=mn$ です。$pj=qk$ なら互いに異なる素数 $p,q$ のうち $p$ は $k$ を割り切るはずですが、$1\le k<m+1<p$ に反します。したがって $R$ 上では $pj<qk$ と $pj>qk$ が排他的かつ網羅的です。

まず $k$ を固定すると、$qk/p<q/2$（$k<p/2$）です。$qk/p$ は整数ではないので
$$
\#\{j:1\le j\le n,\ pj<qk\}
=\left\lfloor\frac{qk}{p}\right\rfloor.
$$
同様に $j$ を固定すると $pj/q<p/2$ で整数でないので
$$
\#\{k:1\le k\le m,\ qk<pj\}
=\left\lfloor\frac{pj}{q}\right\rfloor.
$$
二種類の点数を合計すれば $R$ の全点数となり、
$$
\sum_{k=1}^{m}\left\lfloor\frac{qk}{p}\right\rfloor+
\sum_{j=1}^{n}\left\lfloor\frac{pj}{q}\right\rfloor=mn.
$$
[床関数表示の補題](#lem-nt3-eisenstein)をまず $(p,q)$、次に $(q,p)$ へ適用すると
$$
\left(\frac qp\right)\left(\frac pq\right)
=(-1)^{\sum_{k=1}^{m}\lfloor qk/p\rfloor}
 (-1)^{\sum_{j=1}^{n}\lfloor pj/q\rfloor}
=(-1)^{mn}
$$
を得ます。$m,n$ がともに奇数である条件が $p\equiv q\equiv3\pmod4$ なので、最後の言い換えも従います。
<!-- proof-end -->

例として $p=7,q=11$ はともに $3\bmod4$ です。$11\equiv4\pmod7$ は $2^2$ なので $\left(\frac{11}7\right)=1$ です。一方、$7$ は法 $11$ の平方剰余 $1,3,4,5,9$ に含まれず $\left(\frac7{11}\right)=-1$ です。積は $-1$ となります。素数同士の大小で符号を決めるのではなく、**それぞれの $4$ による余り**で決まります。

## 6. Jacobi 記号：合成数を分母にできるが、判定には注意

相互法則は素数を分母にしました。大きな奇数 $n$ を素因数分解したときには、各素数についての情報を掛け合わせられます。しかし、得られた積が $1$ でも必ずしも法 $n$ で平方になるわけではありません。

<a id="def-nt3-jacobi"></a>

<!-- formal-statement-start -->
> **定義（Jacobi 記号）**  
> $n\ge3$ を奇数とし、その素因数分解を $n=\prod_{i=1}^r p_i^{e_i}$ とする。任意の整数 $a$ に対して
>
$$
\left(\frac an\right)_{\!J}
=\prod_{i=1}^{r}\left(\frac a{p_i}\right)^{e_i}
$$
>
> と定義する。右辺は Legendre 記号であり、$p_i$ は異なる奇素数、$e_i\ge1$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt3-jacobi -->
### 例：Jacobi 記号が $1$ なのに平方にならない

**定義の確認**：$n=15=3\cdot5$、$a=2$ では
$$
\left(\frac2{15}\right)_{\!J}
=\left(\frac23\right)\left(\frac25\right)=(-1)(-1)=1
$$
です。しかし法 $3$ で $2$ は平方非剰余です。もし $x^2\equiv2\pmod{15}$ なら法 $3$ でも $x^2\equiv2$ となって矛盾します。この例は $J=1$ を可解性と同一視できないことを具体的に示しています。
<!-- definition-example-end -->

<a id="prop-nt3-jacobi-laws"></a>

<!-- formal-statement-start -->
> **命題（Jacobi 記号の乗法性・相互法則）**  
> $m,n\ge3$ を奇数とする。Jacobi 記号は分子について乗法的である。さらに $\gcd(m,n)=1$ なら
>
$$
\left(\frac mn\right)_{\!J}
\left(\frac nm\right)_{\!J}
=(-1)^{\frac{m-1}{2}\frac{n-1}{2}}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

分子の乗法性は、定義の各因子へ[Legendre 記号の乗法性](#prop-nt3-legendre-multiplicative)を適用して
$$
\left(\frac{ab}{n}\right)_{\!J}
=\prod_i\left(\frac{ab}{p_i}\right)^{e_i}
=\prod_i\left(\frac a{p_i}\right)^{e_i}
 \prod_i\left(\frac b{p_i}\right)^{e_i}
$$
とすれば従います。

相互法則では $m=\prod_i p_i^{e_i}$、$n=\prod_j q_j^{f_j}$ と書きます。互いに素なので $p_i\neq q_j$ です。各組へ[平方剰余の相互法則](#thm-nt3-quadratic-reciprocity)を使い、積を取ると
$$
\left(\frac mn\right)_{\!J}
\left(\frac nm\right)_{\!J}
=(-1)^E,\qquad
E=\sum_{i,j}e_i f_j\,\frac{p_i-1}{2}\frac{q_j-1}{2}.
$$
奇数 $u,v$ に対して
$$
\frac{uv-1}{2}
=\frac{u-1}{2}+\frac{v-1}{2}
+2\frac{u-1}{2}\frac{v-1}{2}
$$
なので $\frac{uv-1}{2}\equiv\frac{u-1}{2}+\frac{v-1}{2}\pmod2$ です。これを素因数分解の各積へ繰り返して適用すると
$$
\sum_i e_i\frac{p_i-1}{2}\equiv\frac{m-1}{2},\quad
\sum_j f_j\frac{q_j-1}{2}\equiv\frac{n-1}{2}\pmod2.
$$
$E$ は左辺二和の積ですから、求める指数へ置き換えられます。
<!-- proof-end -->

**判定の境界**：$\gcd(a,n)=1$ で $x^2\equiv a\pmod n$ が可解なら、各素因数 $p_i$ について平方剰余であり Jacobi 記号は $1$ です。逆は先ほどの $2\bmod15$ で失敗します。また $\gcd(a,n)>1$ なら、少なくとも一つの Legendre 因子が $0$ なので Jacobi 記号も $0$ です。

## 7. 二次合同方程式：素数冪から合成数へ

Legendre 記号は「法 $p$ での可解性」を示します。しかし合成数法 $n$ で具体的な解まで得るには、まず素数冪 $p^k$ へ解を持ち上げ、最後に[中国剰余定理](../NT1/index.md#thm-nt1-crt-constructive)で貼り合わせます。

<a id="thm-nt3-odd-prime-power-lift"></a>

<!-- formal-statement-start -->
> **定理（奇素数冪における単数の平方根）**  
> 奇素数 $p$、整数 $k\ge1$、$p\nmid a$ に対し、合同式 $x^2\equiv a\pmod{p^k}$ が可解であるための必要十分条件は $\left(\frac ap\right)=1$ である。可解なら法 $p^k$ で相異なる解はちょうど二つであり、法 $p$ の各解から一意に持ち上げられる。
<!-- formal-statement-end -->

### 証明の見取り図

$x_j^2\equiv a\pmod{p^j}$ を満たす $x_j$ があるなら、次の解は $x_{j+1}=x_j+p^jt$ と探します。二乗展開の一次項の係数 $2x_j$ が法 $p$ で逆元を持つことが、解の存在と一意性を決めます。

<!-- proof-start -->
### 証明

必要性は法 $p^k$ の解を法 $p$ に還元すれば従います。逆に $\left(\frac ap\right)=1$ なら法 $p$ に解 $x_1$ があり、$p\nmid a$ だから $p\nmid x_1$ です。$j\ge1$ において $x_j^2-a=p^j c$ と書けるとします。整数 $t$ を用いて $x_{j+1}=x_j+p^jt$ とすると
$$
x_{j+1}^2-a
=p^j(c+2x_jt)+p^{2j}t^2.
$$
$2j\ge j+1$ なので最後の項は法 $p^{j+1}$ で $0$ です。従って新たな合同式の条件は
$$
2x_jt\equiv-c\pmod p
$$
です。$p$ は奇数で $p\nmid x_j$ なので、[逆元の存在条件](../NT1/index.md#prop-nt1-inverse-criterion)によって $t\bmod p$ は一意に決まります。この操作を $j=1,\ldots,k-1$ と繰り返せば解が得られます。

法 $p$ での解が $r,-r$ の二つだけであることは、$(x-r)(x+r)\equiv0\pmod p$ と $r\not\equiv-r\pmod p$ から分かります。任意の法 $p^k$ の解はそのいずれかへ還元されます。上の一意な持ち上げを各段階で適用することで、法 $p^k$ でも解はちょうど二つです。
<!-- proof-end -->

**実計算**：$x^2\equiv10\pmod{169}$ を考えます。法 $13$ では $6^2=36\equiv10$ なので $x_1=6$ を取れます。$6^2-10=26=13\cdot2$ だから $c=2$、$2x_1=12\equiv-1\pmod{13}$ であり
$$
-t\equiv-2\pmod{13},\qquad t\equiv2\pmod{13}.
$$
したがって $x_2=6+13\cdot2=32$ です。実際 $32^2=1024=169\cdot6+10$ です。もう一つは $-32\equiv137\pmod{169}$ です。

法に $2$ の冪がある場合、$2x$ は偶数となり同じ逆元の議論が使えません。代わりに次を直接証明します。

<a id="prop-nt3-two-power"></a>

<!-- formal-statement-start -->
> **命題（2 の冪における奇数の平方根）**  
> 奇数 $a$ について、$x^2\equiv a\pmod2$ は常に可解、法 $4$ では $a\equiv1\pmod4$ のときかつそのときに限り可解、法 $2^k$（$k\ge3$）では $a\equiv1\pmod8$ のときかつそのときに限り可解である。$k\ge3$ で可解なら解は法 $2^k$ でちょうど四つある。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

奇数 $x=2t+1$ の二乗は $x^2=4t(t+1)+1$ です。$t(t+1)$ は偶数なので $x^2\equiv1\pmod8$ であり、必要条件が従います。法 $2$ と法 $4$ については $x=1$ を使えば十分性が分かります。法 $8$ では $1,3,5,7$ がすべて $1$ の平方根で、四解です。

$k\ge3$ で $x^2\equiv a\pmod{2^k}$、$x$ は奇数とします。$x^2-a=2^k c$ と書き、
$$
y=x+2^{k-1}t,\qquad t\in\{0,1\}
$$
と置きます。すると
$$
y^2-a=2^k(c+xt)+2^{2k-2}t^2.
$$
$2k-2\ge k+1$ なので最後の項は法 $2^{k+1}$ で $0$ です。$x$ が奇数ゆえ $t\equiv-c\pmod2$ を一意に選べば $y^2\equiv a\pmod{2^{k+1}}$ となります。法 $8$ からの帰納法で $a\equiv1\pmod8$ の十分性を得ます。

解の個数も確認します。奇数の二解 $x,y$ について $2^k\mid(x-y)(x+y)$ であり、$x-y$ と $x+y$ はどちらも偶数ですが、一方が $4$ の倍数、他方は $2$ の倍数で $4$ の倍数ではありません。したがって $2^{k-1}\mid x-y$ または $2^{k-1}\mid x+y$ です。ゆえに固定した根 $x$ に対して候補は法 $2^k$ で
$$
x,\quad -x,\quad x+2^{k-1},\quad -x+2^{k-1}
$$
の四つ以下です。この四つは $k\ge3$ で相異なり、二乗の差が $2^k$ の倍数なので実際すべて解です。
<!-- proof-end -->

<a id="thm-nt3-crt-solvability"></a>

<!-- formal-statement-start -->
> **定理（単数の二次合同方程式の可解条件）**  
> 整数 $n\ge2$、$\gcd(a,n)=1$ とし、
>
$$
n=2^t\prod_{i=1}^r p_i^{e_i}
$$
>
> を素因数分解とする。ただし $t\ge0$、$p_i$ は互いに異なる奇素数、$e_i\ge1$ とする。このとき $x^2\equiv a\pmod n$ が可解であるための必要十分条件は、すべての $i$ で $\left(\frac a{p_i}\right)=1$、かつ $t\ge2$ なら $a\equiv1\pmod4$、$t\ge3$ ならさらに $a\equiv1\pmod8$ が成り立つことである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[中国剰余定理](../NT1/index.md#thm-nt1-crt-constructive)によって、$x\bmod n$ は $x\bmod2^t$（$t=0$ ならこの成分を除く）と各 $x\bmod p_i^{e_i}$ の組に一対一に対応し、乗法を保ちます。そのため $x^2\equiv a\pmod n$ はすべての素数冪成分で $x^2\equiv a$ が成り立つことと同値です。奇素数成分には[奇素数冪への持ち上げ定理](#thm-nt3-odd-prime-power-lift)、$2$ の冪成分には[$2$ の冪の判定](#prop-nt3-two-power)を適用すれば、記載した条件を得ます。各成分で得た解の組は中国剰余定理により一つの解へ戻せるため、条件は十分でもあります。
<!-- proof-end -->

例えば法 $65=5\cdot13$ で $x^2\equiv-1$ を解くと、[第一補充法則](#thm-nt3-supplement-minus-one)より両素数で解があります。法 $5$ の解は $2,3$、法 $13$ の解は $5,8$ です。四通りの組を[中国剰余定理](../NT1/index.md#thm-nt1-crt-constructive)で戻すと法 $65$ で $8,18,47,57$ となり、いずれも二乗が $64\equiv-1\pmod{65}$ です。

非単数 $a$ に対しては上の定理を直接適用できません。例えば $x^2\equiv0\pmod{p^k}$ なら $p^k\mid x^2$ なので、$x$ が含む $p$ の因子数は少なくとも $\lceil k/2\rceil$ であり、逆も成立します。つまり $x\equiv0\pmod{p^{\lceil k/2\rceil}}$ が解の必要十分条件です。一般の非単数では $a$ の各素数に関する因子数を先に分けてから単数部分を判定します。

## 8. 演習と詳細解答

### Level A：定義と基本判定

#### A1. 平方剰余を実際に列挙する

法 $11$ の平方剰余をすべて求め、$\left(\frac5{11}\right)$ と $\left(\frac7{11}\right)$ を求めよ。

- Level: A
- ID: NT3-A1

<!-- solution-start -->
**詳細解答**　$1^2,2^2,3^2,4^2,5^2$ の法 $11$ の余りはそれぞれ $1,4,9,5,3$ です。残り $6,\ldots,10$ はこれらの負の代表元なので、平方の余りは同じです。よって平方剰余は $\{1,3,4,5,9\}$ で、$5$ は含まれ $7$ は含まれません。[Legendre 記号の定義](#def-nt3-legendre-symbol)から $\left(\frac5{11}\right)=1$、$\left(\frac7{11}\right)=-1$ です。
<!-- solution-end -->

#### A2. Euler の規準で符号を判定する

$p=7,a=3$ に対して、$3^{(p-1)/2}$ を計算し、平方剰余であるか判定せよ。

- Level: A
- ID: NT3-A2

<!-- solution-start -->
**詳細解答**　$(p-1)/2=3$ であり $3^3=27=7\cdot3+6\equiv-1\pmod7$ です。$7\nmid3$ なので[Euler の規準](#thm-nt3-euler-criterion)を使い、$\left(\frac37\right)=-1$ と分かります。したがって $x^2\equiv3\pmod7$ は解を持ちません。
<!-- solution-end -->

#### A3. $-1$ の平方根があるか

法 $17$ と法 $19$ について $x^2\equiv-1$ が可解かを判定し、可解な方で具体的な解を示せ。

- Level: A
- ID: NT3-A3

<!-- solution-start -->
**詳細解答**　$17\equiv1\pmod4$ なので[第一補充法則](#thm-nt3-supplement-minus-one)より $\left(\frac{-1}{17}\right)=1$ です。実際 $4^2=16\equiv-1\pmod{17}$ で、$4,-4\equiv13$ が解です。$19\equiv3\pmod4$ なので $\left(\frac{-1}{19}\right)=-1$、法 $19$ では解がありません。
<!-- solution-end -->

#### A4. $2$ の判定で余りを見る

$p=17,19,23,29$ について $\left(\frac2p\right)$ を計算せよ。

- Level: A
- ID: NT3-A4

<!-- solution-start -->
**詳細解答**　[第二補充法則](#thm-nt3-supplement-two)で $p\bmod8$ を見ます。$17\equiv1$、$19\equiv3$、$23\equiv7$、$29\equiv5\pmod8$ なので符号は順に $1,-1,1,-1$ です。例えば法 $23$ の平方根は $5$ で、$5^2=25\equiv2\pmod{23}$ となり符号 $1$ と一致します。
<!-- solution-end -->

#### A5. Jacobi 記号の値と意味

$\left(\frac2{15}\right)_{\!J}$ を求め、$x^2\equiv2\pmod{15}$ の可解性を判定せよ。

- Level: A
- ID: NT3-A5

<!-- solution-start -->
**詳細解答**　$15=3\cdot5$ で、法 $3$ の非零平方は $1$、法 $5$ の非零平方は $1,4$ です。したがって $\left(\frac23\right)=\left(\frac25\right)=-1$ なので[Jacobi 記号の定義](#def-nt3-jacobi)により積は $1$ です。しかし法 $15$ で解があれば法 $3$ でも解を持つはずで、$2$ は法 $3$ で非剰余です。従って法 $15$ の方程式は不可解です。Jacobi 記号 $1$ だけでは可解と判定できません。
<!-- solution-end -->

### Level B：証明の中間計算を再現する

#### B1. Gauss の補題を手で使う

$p=13,a=5$ とする。$5k$（$1\le k\le6$）の正剰余と符号付きの小さな代表元を列挙し、$\left(\frac5{13}\right)$ を求めよ。

- Level: B
- ID: NT3-B1

<!-- solution-start -->
**詳細解答**　$5k$ の正剰余は $5,10,2,7,12,4$ です。$13/2=6.5$ より大きいのは $10,7,12$ の三つなので $\nu_{13}(5)=3$ です。符号付き代表元は $5,-3,2,-6,-1,4$ で、絶対値は $1,2,3,4,5,6$ の並べ替えです。よって[Gauss の補題](#lem-nt3-gauss)から $\left(\frac5{13}\right)=(-1)^3=-1$ です。直接にも $1^2,\ldots,6^2$ の余りは $1,4,9,3,12,10$ で、$5$ はありません。
<!-- solution-end -->

#### B2. 相互法則で大きい法を小さくする

$\left(\frac{11}{19}\right)$ を相互法則で求め、床関数の和の偶奇でも照合せよ。

- Level: B
- ID: NT3-B2

<!-- solution-start -->
**詳細解答**　$11\equiv19\equiv3\pmod4$ なので[平方剰余の相互法則](#thm-nt3-quadratic-reciprocity)により $\left(\frac{11}{19}\right)=-\left(\frac{19}{11}\right)=-\left(\frac8{11}\right)$ です。[乗法性](#prop-nt3-legendre-multiplicative)で $\left(\frac8{11}\right)=\left(\frac2{11}\right)^3$、さらに $11\equiv3\pmod8$ なので[第二補充法則](#thm-nt3-supplement-two)から $\left(\frac2{11}\right)=-1$ です。従って $\left(\frac{11}{19}\right)=1$ です。

床関数の和でも $p=19,q=11,m=9$ として
$$
\sum_{k=1}^{9}\left\lfloor\frac{11k}{19}\right\rfloor
=0+1+1+2+2+3+4+4+5=22
$$
です。[床関数表示](#lem-nt3-eisenstein)より符号は $(-1)^{22}=1$ で一致します。
<!-- solution-end -->

#### B3. 平方根の持ち上げ

$x^2\equiv10\pmod{13^2}$ の解をすべて求め、持ち上げの一次合同式を示せ。

- Level: B
- ID: NT3-B3

<!-- solution-start -->
**詳細解答**　法 $13$ で $6^2=36\equiv10$、もう一つは $-6\equiv7$ です。[奇素数冪への持ち上げ定理](#thm-nt3-odd-prime-power-lift)に従い $x=6+13t$ と置きます。$x^2-10=26+156t+169t^2=13(2+12t)+169t^2$ なので $13^2\mid x^2-10$ の条件は $2+12t\equiv0\pmod{13}$ です。$12\equiv-1$ より $t\equiv2$ となり $x\equiv32\pmod{169}$ です。もう一方は負の根 $-32\equiv137$ です。$32^2=1024=169\cdot6+10$、$137\equiv-32$ なので両方を検算でき、奇素数冪では他に解はありません。
<!-- solution-end -->

#### B4. 相互法則の格子点を数え直す

$p=5,q=7$ とする。$1\le k\le2$、$1\le j\le3$ の六つの組を $5j<7k$ と $5j>7k$ に分け、二つの床関数和が $6$ になることを確認せよ。

- Level: B
- ID: NT3-B4

<!-- solution-start -->
**詳細解答**　$k=1$ のとき $5j<7$ は $j=1$ だけ、$k=2$ のとき $5j<14$ は $j=1,2$ です。従って前者は $1+2=3$ 点です。一方 $j=1$ のとき $7k<5$ はなく、$j=2$ のとき $7k<10$ は $k=1$、$j=3$ のとき $7k<15$ は $k=1,2$ で、後者は $0+1+2=3$ 点です。境界 $5j=7k$ はこの範囲で起きず、和は $3+3=6=2\cdot3$ です。これが[相互法則の証明](#thm-nt3-quadratic-reciprocity)の点数恒等式の具体例です。
<!-- solution-end -->

### Level C：複数の法と記号を接続する

#### C1. 合成数法の平方根を全部数える

$n=65$ について $x^2\equiv-1\pmod{65}$ のすべての解を求め、解が四つである理由を素数冪での個数と中国剰余定理から説明せよ。

- Level: C
- ID: NT3-C1

<!-- solution-start -->
**詳細解答**　$65=5\cdot13$ は互いに素な奇素数の積です。[第一補充法則](#thm-nt3-supplement-minus-one)でどちらも $1\bmod4$ なので平方根があります。法 $5$ では $x\equiv2,3$、法 $13$ では $x\equiv5,8$ です。$x=a+5t$（$a=2$ または $3$）とおいて法 $13$ で $5t\equiv b-a$（$b=5$ または $8$）を解きます。$5^{-1}\equiv8\pmod{13}$ なので、$(a,b)=(2,5),(2,8),(3,5),(3,8)$ に対して $t\equiv24\equiv11,\ 48\equiv9,\ 16\equiv3,\ 40\equiv1\pmod{13}$ です。従って対応する $x\bmod65$ は $57,47,18,8$ です。[中国剰余定理](../NT1/index.md#thm-nt1-crt-constructive)は組と解の一対一対応を与え、二解ずつの積で $2\cdot2=4$ 個です。$8^2\equiv18^2\equiv47^2\equiv57^2\equiv64\equiv-1\pmod{65}$ も確認できます。
<!-- solution-end -->

#### C2. Jacobi 記号が見逃す局所障害

$p,q$ を相異なる $3\bmod4$ の奇素数とし、$n=pq$ とする。$\left(\frac{-1}{n}\right)_{\!J}=1$ だが $x^2\equiv-1\pmod n$ は不可解であることを証明せよ。どの仮定を落とすと結論が変わるかも述べよ。

- Level: C
- ID: NT3-C2

<!-- solution-start -->
**詳細解答**　$p\equiv q\equiv3\pmod4$ なので[第一補充法則](#thm-nt3-supplement-minus-one)から $\left(\frac{-1}p\right)=\left(\frac{-1}q\right)=-1$ です。[Jacobi 記号の定義](#def-nt3-jacobi)では二因子を掛けるので $\left(\frac{-1}{pq}\right)_{\!J}=(-1)(-1)=1$ です。一方、仮に $x^2\equiv-1\pmod{pq}$ とすると $x^2\equiv-1\pmod p$ も成り立ちます。しかし Legendre 記号が $-1$ であることはこの合同式が不可解であることを意味し、矛盾します。例えば $p=3,q=7$ なら Jacobi 記号は $1$ でも法 $21$ に解はありません。二素数がともに $3\bmod4$ という仮定を外し、ともに $1\bmod4$ とすれば各素数で解が存在し、[中国剰余定理](../NT1/index.md#thm-nt1-crt-constructive)から法 $pq$ に解が存在します。問題の障害は各素数法での非剰余を掛け合わせると符号だけが相殺されてしまう点です。
<!-- solution-end -->

## 9. まとめと次章への橋

奇素数 $p$ を法とする平方剰余は、Legendre 記号、Euler の規準、Gauss の補題の三つの見方を持ちます。床関数に直すことで異なる素数同士の相互法則が導かれ、補充法則と組み合わせて複雑な Legendre 記号を小さい法へ還元できます。合成数法では Jacobi 記号だけに頼らず、各素数冪での可解性を検査して中国剰余定理で統合する必要があります。

次章では「素数ごとの乗法的な情報」をもう少し一般的に扱うため、約数上の和を取る算術関数と、二つの算術関数を約数和で組み合わせる演算を導入します。