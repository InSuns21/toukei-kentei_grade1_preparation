# ANT4 算術級数中の素数に関するDirichletの定理

[ANT3の文字の直交関係](../ANT3/index.md#thm-ant3-orthogonality)によって、整数を合同式で選り分けられるようになりました。また、[Dirichlet L関数のEuler積](../ANT3/index.md#thm-ant3-l-euler)を使うと、文字で重み付けした整数の和が素数の積になります。ところがEuler積が非零なのは、今のところ $\operatorname{Re}s>1$ だけです。「法 $q$ で $a$ と合同な素数が無限にある」と結論するには、境界 $s=1$ での非主文字の $L$ 関数を調べる必要があります。

この章の道筋は「$L(1,\chi)$ の非零性を証明する $\rightarrow$ Euler積の対数を素数和へ戻す $\rightarrow$ 文字の直交関係で合同類を抽出する」です。非零性の証明では、非実文字と実文字で道具を変えなければならない理由も明らかにします。

法は整数 $q\ge2$ とし、整数 $a$ は $\gcd(a,q)=1$ を満たすものとします。$h=\varphi(q)$、$\chi_0$ は法 $q$ の主文字です。$\sigma>1$ は実数、$\sum_p$ は全素数にわたる和とします。

$L(s,\chi)$ の定義・正則性は[ANT3のDirichlet L関数の定義](../ANT3/index.md#def-ant3-l-function)と[非主文字の正則延長・主文字の極](../ANT3/index.md#thm-ant3-l-continuation)を、$\zeta$ の有理型性は[CA12のζの解析接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)を参照します。

## 1. 合同類ごとの素数を取り出す準備

小さい例では、法 $4$ の $3$ と合同な正整数は $3,7,11,15,19,\ldots$ です。このうち $15$ は合成数ですが、$3,7,11,19$ は素数です。有限個の例だけでは、素数が無限に続くかは分かりません。また、互いに素という仮定を落とすと、例えば $n\equiv0\pmod4$ を満たす素数はありません。もし素数 $p$ が $a\pmod q$ に属し、$d=\gcd(a,q)>1$ なら $d\mid p$ だから $p\mid q$ となり、候補は有限個です。

<a id="lem-ant4-prime-log"></a>

<!-- formal-statement-start -->
> **補題（Euler積の対数と素数の一次項）**  
> $q\ge2$、$\chi$ を法 $q$ のDirichlet文字とする。実数 $\sigma>1$ について、右辺の級数は絶対収束し、
$$
\log L(\sigma,\chi)
=\sum_p\sum_{k\ge1}\frac{\chi(p)^k}{k p^{k\sigma}}
=\sum_p\frac{\chi(p)}{p^\sigma}+R_\chi(\sigma)
$$
> と表せる。ここで対数は $\sigma>1$ のEuler積から定まる連続な対数であり、
$$
|R_\chi(\sigma)|\le
\sum_p\sum_{k\ge2}\frac1{k p^{k\sigma}}
\le \sum_{n=2}^{\infty}\frac1{n(n-1)}=1.
$$
> 特に剰余類ごとの素数和を調べる際、$R_\chi(\sigma)$ は $\sigma\downarrow1$ でも一様有界である。
<!-- formal-statement-end -->

### 証明の見取り図

各素数のEuler因子に $-\log(1-z)=\sum_{k\ge1}z^k/k$ を適用し、$k=1$ を分離します。$k\ge2$ の部分が境界で発散しないことが重要です。

<!-- proof-start -->
### 証明

[ANT3のEuler積](../ANT3/index.md#thm-ant3-l-euler)を $\sigma>1$ で用いると、$z_p=\chi(p)p^{-\sigma}$ は $|z_p|\le2^{-\sigma}<1$ で、
$$
L(\sigma,\chi)=\prod_p(1-z_p)^{-1}.
$$
$-\log(1-z)=\sum_{k\ge1}z^k/k$ は $|z|<1$ で絶対収束するTaylor級数です。さらに
$$
\sum_p\sum_{k\ge1}\frac{|z_p|^k}{k}
\le\sum_p\frac{p^{-\sigma}}{1-p^{-\sigma}}
\le\frac1{1-2^{-\sigma}}\sum_{n\ge2}n^{-\sigma}<\infty.
$$
ゆえに素数和と $k$ の和を交換でき、対数級数を足して指数を取ればEuler積を再現します。ここでの $\log L$ はこの級数によって選ぶので、複素対数の枝の曖昧さはありません。

$k\ge2$ の項は $1/k\le1$ と $\sigma\ge1$ より
$$
\sum_{k\ge2}\frac1{k p^{k\sigma}}
\le\sum_{k\ge2}p^{-k}
=\frac1{p(p-1)}.
$$
全素数は $2$ 以上の整数の一部なので
$$
\sum_p\frac1{p(p-1)}
\le\sum_{n\ge2}\left(\frac1{n-1}-\frac1n\right)=1.
$$
これで一様評価が得られます。
<!-- proof-end -->

単に $L(\sigma,\chi)\ne0$ と知っていても $\log L(\sigma,\chi)$ が $\sigma\downarrow1$ で有界になるとは限りません。$L(1,\chi)\ne0$ が必要です。そこが次節の主役です。

## 2. 非主文字の $L(1,\chi)$ はなぜ零でないのか

非主文字について $L(1,\chi)$ が**存在する**ことは[ANT3の正則延長](../ANT3/index.md#thm-ant3-l-continuation)で証明しました。しかし例えば正則関数 $f(s)=s-1$ は $s=1$ で零です。正則性と非零性は別の命題です。

非実文字の場合は、Euler積の対数に現れる三角関数の非負性を使います。一方、実非主文字について同じ評価を試すと、$\chi^2=\chi_0$ の極が余分に現れ、零点の矛盾には至りません。そこで実文字では、$\zeta(s)L(s,\chi)$ のDirichlet係数が非負になることを利用します。

<a id="lem-ant4-real-coeff"></a>

<!-- formal-statement-start -->
> **補題（実文字と非負の畳み込み係数）**  
> $q\ge2$ とし、$\chi$ を値が $0,1,-1$ のいずれかである法 $q$ の実Dirichlet文字とする。整数 $n\ge1$ に
$$
a_\chi(n)=\sum_{d\mid n}\chi(d)
$$
> を定める。このとき $a_\chi(n)\ge0$ であり、任意の $m\ge1$ で $a_\chi(m^2)\ge1$ が成立する。
<!-- formal-statement-end -->

### 例：法 $4$ の非主実文字

$\chi_4(2)=0$、$\chi_4(3)=-1$、$\chi_4(5)=1$ です。素数冪で計算すると
$$
a_{\chi_4}(3)=1-1=0,\qquad
a_{\chi_4}(9)=1-1+1=1,\qquad
a_{\chi_4}(5)=1+1=2.
$$
負の文字値があっても畳み込み係数は負にならず、平方数では少なくとも $1$ になります。この差を後で使います。

### 証明の見取り図

完全乗法的な文字に対する約数和も乗法的です。素数冪で $1+\chi(p)+\cdots+\chi(p)^e$ を調べればすべて分かります。

<!-- proof-start -->
### 証明

$u,v$ が互いに素なら約数 $d\mid uv$ は一意に $d=d_1d_2$（$d_1\mid u,d_2\mid v$）と書けます。[文字の完全乗法性](../ANT3/index.md#def-ant3-character)から
$$
a_\chi(uv)
=\sum_{d_1\mid u}\sum_{d_2\mid v}\chi(d_1d_2)
=\left(\sum_{d_1\mid u}\chi(d_1)\right)
 \left(\sum_{d_2\mid v}\chi(d_2)\right).
$$
素数 $p$ と整数 $e\ge0$ に対して、$\chi(p)=1$ なら $a_\chi(p^e)=e+1$、$\chi(p)=0$ なら $a_\chi(p^e)=1$ です。$\chi(p)=-1$ なら
$$
a_\chi(p^e)=1-1+1-\cdots+(-1)^e
=\begin{cases}1,&e\text{ が偶数},\\0,&e\text{ が奇数}.\end{cases}
$$
よってすべての素数冪係数は非負です。さらに $e$ が偶数の場合は三つのケースのすべてで $a_\chi(p^e)\ge1$ です。素因数分解の各指数を用いた乗法性から $a_\chi(n)\ge0$、$a_\chi(m^2)\ge1$ となります。
<!-- proof-end -->

<a id="thm-ant4-l-one-nonzero"></a>

<!-- formal-statement-start -->
> **定理（非主Dirichlet L関数の境界非零性）**  
> 整数 $q\ge2$ と法 $q$ の非主Dirichlet文字 $\chi\ne\chi_0$ について、[ANT3の正則延長](../ANT3/index.md#thm-ant3-l-continuation)で定める有限値 $L(1,\chi)$ は
$$
L(1,\chi)\ne0
$$
> を満たす。原始性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

文字が非実なら $3+4\cos\theta+\cos2\theta=2(1+\cos\theta)^2\ge0$ を、Euler積に適用します。文字が実なら $\zeta L$ を係数非負のDirichlet級数として眺め、もし境界の極が消えたら、正則性によって級数が左側でも収束してしまい、平方数から矛盾が生じることを示します。

<!-- proof-start -->
### 証明

**第一段階：非実文字。** $\chi$ の値がすべて実数であるわけではないとします。文字の値は単数上の有限位数の複素数なので、もし $\chi^2=\chi_0$ なら単数上のすべての値が $\pm1$ となり実文字になってしまいます。従って $\chi^2$ も非主文字です。

$\sigma>1$ に対して正の実数
$$
F(\sigma)=\zeta(\sigma)^3
|L(\sigma,\chi)|^4\,|L(\sigma,\chi^2)|
$$
を考えます。[ζのEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)と[素数対数補題](#lem-ant4-prime-log)をそれぞれ用いれば、絶対収束する級数として
$$
\log F(\sigma)
=\sum_p\sum_{k\ge1}
\frac{3+4\operatorname{Re}(\chi(p)^k)
+\operatorname{Re}(\chi(p)^{2k})}{k p^{k\sigma}}.
$$
$p\nmid q$ なら $w=\chi(p)^k$ は $|w|=1$ です。$c=\operatorname{Re}w$ と置くと
$$
\operatorname{Re}(w^2)=2c^2-1,\qquad
3+4c+\operatorname{Re}(w^2)=2(1+c)^2\ge0.
$$
$p\mid q$ なら $\chi(p)=0$ なので分子は $3\ge0$ です。従って $\log F(\sigma)\ge0$、すなわち $F(\sigma)\ge1$ がすべての $\sigma>1$ で成立します。

仮に $L(1,\chi)=0$ とすると、正則性により $L(\sigma,\chi)=O(\sigma-1)$ です。[CA12のζの単純極](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)から $\zeta(\sigma)=O((\sigma-1)^{-1})$ であり、$\chi^2$ は非主なので $L(\sigma,\chi^2)=O(1)$ です。よって
$$
0\le F(\sigma)
=O\!\left((\sigma-1)^{-3+4}\right)
=O(\sigma-1)\longrightarrow0
\quad(\sigma\downarrow1).
$$
これは $F(\sigma)\ge1$ に矛盾します。

**第二段階：実非主文字。** この場合 $\chi(n)\in\{0,\pm1\}$ です。$\sigma>1$ では [ANT2のDirichlet級数の積](../ANT2/index.md#thm-ant2-convolution-product)を係数 $1$ と $\chi(n)$ に適用して
$$
H(s)=\zeta(s)L(s,\chi)
=\sum_{n\ge1}\frac{a_\chi(n)}{n^s},
\qquad a_\chi(n)=\sum_{d\mid n}\chi(d)
$$
を得ます。[非負係数の補題](#lem-ant4-real-coeff)から $a_\chi(n)\ge0$、$a_\chi(m^2)\ge1$ です。

仮に $L(1,\chi)=0$ とします。[ANT3の正則延長](../ANT3/index.md#thm-ant3-l-continuation)によって $L(s,\chi)$ は $\operatorname{Re}s>0$ で正則です。

一方、[CA12の有理型解析接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)によれば、$\zeta(s)$ はこの半平面で $s=1$ の単純極以外は正則です。$L(s,\chi)$ の $s=1$ での零点がこの単純極を相殺するため、積 $H(s)$ は $\operatorname{Re}s>0$ 全体で正則になります。

そこで $s=2$ のTaylor展開を考えます。開円板 $|s-2|<2$ は $\operatorname{Re}s>0$ に含まれるので、このTaylor級数は特に $s=1/2$ でも収束します。$s=2$ 近傍でDirichlet級数を項別微分でき、$k\ge0$ に対し
$$
(-1)^k H^{(k)}(2)
=\sum_{n\ge1}a_\chi(n)n^{-2}(\log n)^k\ge0.
$$
ここで収束は、$a_\chi(n)\le d(n)\le n$ という粗い評価だけを使うのではなく、$a_\chi(n)\le d(n)$ および $\sum_{n\ge1}d(n)n^{-\tau}=\zeta(\tau)^2<\infty$（$\tau>1$）から、$\tau=3/2$ などの範囲で対数の任意の冪を吸収できることにより正当化できます。

Taylor展開へ $s=2-t$、$t=3/2<2$ を代入すると
$$
H(1/2)
=\sum_{k\ge0}\frac{(-1)^k H^{(k)}(2)}{k!}
 \left(\frac32\right)^k<\infty.
$$
右辺の各項は非負なので、非負級数に対する和の交換を行い
$$
\begin{aligned}
H(1/2)
&=\sum_{k\ge0}\sum_{n\ge1}
\frac{a_\chi(n)}{n^2}\frac{((3/2)\log n)^k}{k!}\\
&=\sum_{n\ge1}\frac{a_\chi(n)}{n^2}
\exp((3/2)\log n)
=\sum_{n\ge1}\frac{a_\chi(n)}{\sqrt n}.
\end{aligned}
$$
しかし平方数だけを残すと
$$
\sum_{n\ge1}\frac{a_\chi(n)}{\sqrt n}
\ge\sum_{m\ge1}\frac{a_\chi(m^2)}m
\ge\sum_{m\ge1}\frac1m=\infty.
$$
矛盾です。従って実非主文字でも $L(1,\chi)\ne0$ です。

二つの場合で全Dirichlet文字を尽くすので証明が終わります。
<!-- proof-end -->

実文字に対するTaylor展開では、$s=1$ の値だけを使っているのではありません。「仮に $L(1,\chi)=0$ なら $\zeta L$ が半平面全体で正則」という強い帰結を使っています。実文字の非負係数と平方数への下界の組合せが決定打です。

## 3. 主文字の極と、非主文字の有限値を分離する

[ANT3の主文字のEuler積](../ANT3/index.md#thm-ant3-l-euler)によれば
$$
L(\sigma,\chi_0)=\zeta(\sigma)\prod_{p\mid q}(1-p^{-\sigma}).
$$
$\sigma\downarrow1$ で有限積は $\prod_{p\mid q}(1-p^{-1})>0$ に収束します。また[CA12のζの単純極](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)の留数は $1$ なので
$$
\zeta(\sigma)=\frac1{\sigma-1}+O(1),
\qquad
\log L(\sigma,\chi_0)
=\log\frac1{\sigma-1}+O(1).
$$
ここで主文字では $L(\sigma,\chi_0)>0$ だから実対数を用いています。一方、非主文字では前節の非零性と正則性により、$\sigma=1$ の近傍で $L(\sigma,\chi)$ は $0$ から離れています。従って
$$
\log L(\sigma,\chi)=O(1)
\qquad(\chi\ne\chi_0,\ \sigma\downarrow1).
$$
この対数は[素数対数補題](#lem-ant4-prime-log)で選んだもので、$\sigma>1$ 上では連続です。近傍で正則な対数との差は $2\pi i$ の整数倍で連続だから一定であり、$O(1)$ が従います。文字は有限個なので、この $O(1)$ を全文字にわたって足しても有界です。

<a id="thm-ant4-dirichlet"></a>

<!-- formal-statement-start -->
> **定理（算術級数中の素数に関するDirichletの定理）**  
> 整数 $q\ge2$ と $\gcd(a,q)=1$ を満たす整数 $a$ に対して
$$
\#\{p:\ p\text{ は素数},\ p\equiv a\pmod q\}=\infty.
$$
> さらに、実数 $\sigma\downarrow1$ について
$$
\sum_{\substack{p\text{ は素数}\\p\equiv a\pmod q}}
\frac1{p^\sigma}
=\frac1{\varphi(q)}
\log\frac1{\sigma-1}+O_q(1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[ANT3の剰余類指示関数](../ANT3/index.md#cor-ant3-residue-projector)を素数 $p$ に適用し、各文字で重み付けした $\sum_p\chi(p)p^{-\sigma}$ を取り出します。[素数対数補題](#lem-ant4-prime-log)によりこれは $\log L$ と有界な差しかありません。主文字一つだけが対数的に発散します。

<!-- proof-start -->
### 証明

[剰余類の指示関数公式](../ANT3/index.md#cor-ant3-residue-projector)は $\gcd(a,q)=1$ とすべての正整数 $n$ に対し
$$
\mathbf1_{\{n\equiv a\;(\mathrm{mod}\ q)\}}
=\frac1h\sum_{\chi\bmod q}\overline{\chi(a)}\chi(n)
$$
です。$n$ が $q$ と互いに素でない場合、左辺は $0$ で、右辺の各 $\chi(n)$ も $0$ なので同じ式が使えます。

$\sigma>1$ では $\sum_p p^{-\sigma}\le\sum_{n\ge2}n^{-\sigma}<\infty$ です。文字の個数 $h$ は有限なので、先ほどの式に $p^{-\sigma}$ を掛け、素数を足して順番を交換できます。
$$
\begin{aligned}
S_a(\sigma)
&:=\sum_{p\equiv a\;(\mathrm{mod}\ q)}p^{-\sigma}\\
&=\sum_p p^{-\sigma}
\frac1h\sum_{\chi\bmod q}\overline{\chi(a)}\chi(p)\\
&=\frac1h\sum_{\chi\bmod q}\overline{\chi(a)}
\sum_p\frac{\chi(p)}{p^\sigma}.
\end{aligned}
$$
[素数対数補題](#lem-ant4-prime-log)の $R_\chi$ を代入すると
$$
S_a(\sigma)
=\frac1h\sum_{\chi\bmod q}
\overline{\chi(a)}\log L(\sigma,\chi)
-\frac1h\sum_{\chi\bmod q}\overline{\chi(a)}R_\chi(\sigma).
$$
後者の和は $|\chi(a)|=1$、$|R_\chi(\sigma)|\le1$ により絶対値が高々 $1$ です。前者で $\chi_0(a)=1$ だから主文字の項は
$$
\frac1h\log L(\sigma,\chi_0)
=\frac1h\log\frac1{\sigma-1}+O_q(1).
$$
残る非主文字の項は[境界非零性](#thm-ant4-l-one-nonzero)によってそれぞれ $O(1)$ です。従って
$$
S_a(\sigma)
=\frac1h\log\frac1{\sigma-1}+O_q(1)
\longrightarrow\infty.
$$
もし指定された剰余類の素数が有限個なら、$S_a(\sigma)$ は有限個の関数 $p^{-\sigma}$ の和であり、$\sigma\downarrow1$ で有限値へ収束します。これは発散に反するので素数は無限個です。
<!-- proof-end -->

<a id="cor-ant4-reciprocal-divergence"></a>

<!-- formal-statement-start -->
> **系（既約剰余類に属する素数の逆数和の発散）**  
> 整数 $q\ge2$ と $\gcd(a,q)=1$ に対して
$$
\sum_{\substack{p\text{ は素数}\\p\equiv a\pmod q}}\frac1p=\infty.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\sigma>1$ で各項について $0<p^{-\sigma}\le p^{-1}$ です。もし右辺の逆数和が収束するなら、すべての $\sigma>1$ に対し
$$
0\le S_a(\sigma)
=\sum_{p\equiv a\;(\mathrm{mod}\ q)}p^{-\sigma}
\le\sum_{p\equiv a\;(\mathrm{mod}\ q)}p^{-1}<\infty
$$
と一様に抑えられます。しかし[Dirichletの定理の証明](#thm-ant4-dirichlet)で $S_a(\sigma)\to\infty$ を示したので矛盾します。
<!-- proof-end -->

主結果は単に「素数が無限」より強く、各既約剰余類で素数の逆数和が発散することまで言っています。ただし本章の式は $\sigma\downarrow1$ の発散速度であり、$\pi(x;q,a)\sim\operatorname{Li}(x)/\varphi(q)$ のような**個数の漸近公式はまだ証明していません**。

## 4. 演習と詳細解答

すべての演習で $q\ge2$ とし、必要な仮定・和の交換・境界極限を確認してください。記号 $O_q(1)$ は $q$ を固定したとき有界という意味です。

### Level A：文字、係数、剰余類の抽出

#### A1. 互いに素である仮定

$q=6$ の $a=1$ と $a=2$ を比べよ。後者と合同な素数がなぜ有限個に限られるか説明し、前者の素数を三つ挙げよ。

- Level: A
- ID: ANT4-A1

<!-- solution-start -->
**詳細解答**：$\gcd(1,6)=1$ なので[Dirichletの定理](#thm-ant4-dirichlet)の対象です。例えば $7,13,19$ は素数で、いずれも法 $6$ の剰余は $1$ です。

一方、$p\equiv2\pmod6$ なら $p$ は偶数です。素数なら $p=2$ に限られ、実際に $2\equiv2\pmod6$ なので、この剰余類に属する素数は一つだけです。$\gcd(2,6)>1$ では無限性を主張できません。
<!-- solution-end -->

#### A2. 法4の実文字の係数

法 $4$ の非主文字 $\chi_4$ について $a_{\chi_4}(3^e)$ を $e=0,1,2,3,4$ で計算せよ。

- Level: A
- ID: ANT4-A2

<!-- solution-start -->
**詳細解答**：[実文字の係数補題](#lem-ant4-real-coeff)の定義で $\chi_4(3)=-1$ を用います。
$$
a_{\chi_4}(3^e)=\sum_{j=0}^e\chi_4(3)^j
=\sum_{j=0}^e(-1)^j.
$$
$e=0,1,2,3,4$ の値は順に $1,0,1,0,1$ です。例えば $e=4$ なら $1-1+1-1+1=1$ です。奇数冪では打ち消され、偶数冪では $1$ が残ります。
<!-- solution-end -->

#### A3. 対数余項の数値的な上界

$p=2$ の二次以上の項 $\sum_{k\ge2}2^{-k\sigma}/k$ が $\sigma\ge1$ で $1/2$ 以下であることを示せ。

- Level: A
- ID: ANT4-A3

<!-- solution-start -->
**詳細解答**：$k\ge2$ に対して $1/k\le1$、$\sigma\ge1$ に対して $2^{-k\sigma}\le2^{-k}$ なので
$$
0\le\sum_{k\ge2}\frac{2^{-k\sigma}}k
\le\sum_{k\ge2}2^{-k}
=\frac{2^{-2}}{1-2^{-1}}=\frac12.
$$
これは[Euler積対数補題](#lem-ant4-prime-log)に現れる一素数ごとの幾何級数評価です。$\sigma>1$ なら実際は厳密に $1/2$ 未満になります。
<!-- solution-end -->

#### A4. 法3の文字で剰余類を抽出

法 $3$ の主文字 $\chi_0$ と非主文字 $\chi_1$（$n\equiv1$ で $1$、$n\equiv2$ で $-1$、$3\mid n$ で $0$）を使い、$p\equiv2\pmod3$ の指示関数を表せ。

- Level: A
- ID: ANT4-A4

<!-- solution-start -->
**詳細解答**：[ANT3の文字直交関係](../ANT3/index.md#cor-ant3-residue-projector)を $q=3,a=2$ に適用し、$\varphi(3)=2$、$\chi_0(2)=1$、$\chi_1(2)=-1$ から
$$
\mathbf1_{\{p\equiv2\pmod3\}}
=\frac12\left(\chi_0(p)-\chi_1(p)\right).
$$
$p\equiv1$ なら $(1-1)/2=0$、$p\equiv2$ なら $(1-(-1))/2=1$、$p=3$ なら $(0-0)/2=0$ です。非単数の素数についても一致します。
<!-- solution-end -->

### Level B：境界の非零性を再構成する

#### B1. 非実文字での二乗文字

法 $5$ で $\chi(2)=i$ とする文字について、$\chi^2$ が非主であることを確認し、非負式の $c$ に $-1$、$0$、$1$ を代入せよ。

- Level: B
- ID: ANT4-B1

<!-- solution-start -->
**詳細解答**：法 $5$ の単数群は $2$ が生成する位数 $4$ の群です。[Dirichlet文字](../ANT3/index.md#def-ant3-character)の定義により $\chi(2)=i$ から $\chi(2^j)=i^j$ と定まります。$\chi^2(2)=i^2=-1$ なので、$\chi^2$ は単数上ですべて $1$ を返す主文字ではありません。非実文字の証明に現れる式を直接計算すると
$$
3+4c+(2c^2-1)=2(1+c)^2.
$$
$c=-1,0,1$ では順に $0,2,8$ です。三角関数の項が負になっても、重み $3,4,1$ で組み合わせた総和は非負です。
<!-- solution-end -->

#### B2. 正則性だけでは非零性は出ない

$f(s)=s-1$ と $g(s)=1/(s-1)$ を考え、$\operatorname{Re}s>0$ で $g(s)f(s)$ に除去可能な特異点があることを示せ。さらに実文字の証明がここから先に必要とする二つの性質を答えよ。

- Level: B
- ID: ANT4-B2

<!-- solution-start -->
**詳細解答**：$f(1)=0$ ですが $f$ は全関数です。$s\ne1$ なら $g(s)f(s)=(s-1)/(s-1)=1$ なので、$s=1$ で値 $1$ を与えて正則に延長できます。「積が正則」という事実だけでは、零点を否定できません。

[実文字の係数補題](#lem-ant4-real-coeff)が与える追加の道具は二つあります。第一に、Dirichlet係数が $a_\chi(n)\ge0$ を満たします。第二に、平方数で $a_\chi(m^2)\ge1$ となります。非負性はTaylor展開で和を交換するために、平方数の下界は調和級数 $\sum_m1/m$ の発散と比較するために使います。
<!-- solution-end -->

#### B3. Taylor展開から平方数の矛盾を導く

非負数列 $a(n)$ が $\sum_n a(n)n^{-s}$ を $\operatorname{Re}s>1$ で定めるとし、この関数が $\operatorname{Re}s>0$ に正則に延長されたと仮定する。$a(m^2)\ge1$ が全 $m\ge1$ で成立しえないことを示せ。ただし $a(n)\le d(n)$ とする。

- Level: B
- ID: ANT4-B3

<!-- solution-start -->
**詳細解答**：$H(s)=\sum_n a(n)n^{-s}$ とします。$a(n)\le d(n)$ なので $\sum_n a(n)n^{-3/2}\le\zeta(3/2)^2<\infty$ であり、$s=2$ の近傍で項別微分できます。$k$ 階微分の係数は
$$
(-1)^kH^{(k)}(2)=\sum_n a(n)n^{-2}(\log n)^k\ge0.
$$
$H$ が $\operatorname{Re}s>0$ で正則なら $|s-2|<2$ でTaylor展開でき、$t=3/2$ を選ぶと
$$
H(1/2)=\sum_{k\ge0}\frac{(-1)^kH^{(k)}(2)}{k!}(3/2)^k<\infty.
$$
すべての項が非負なので和を交換し、
$$
H(1/2)=\sum_n a(n)n^{-2}\sum_{k\ge0}\frac{((3/2)\log n)^k}{k!}
=\sum_n\frac{a(n)}{\sqrt n}.
$$
平方数だけ残すと $\sum_n a(n)n^{-1/2}\ge\sum_m a(m^2)/m\ge\sum_m1/m=\infty$ となり矛盾します。これが実文字の非零性の核です。
<!-- solution-end -->

### Level C：Euler積から算術級数中の素数へ

#### C1. 法4の二つの剰余類

法 $4$ の主文字 $\chi_0$ と非主文字 $\chi_4$ に対し、$S_j(\sigma)=\sum_{p\equiv j\;(\mathrm{mod}\ 4)}p^{-\sigma}$（$j=1,3$）を文字の素数和で表せ。さらに $\sigma\downarrow1$ で両方が $\tfrac12\log(1/(\sigma-1))+O(1)$ になることを、必要な定理を明示して導け。

- Level: C
- ID: ANT4-C1

<!-- solution-start -->
**詳細解答**：[ANT3の剰余類指示関数](../ANT3/index.md#cor-ant3-residue-projector)を法 $4$ の二つの単数 $1,3$ に適用します。$\chi_4(1)=1$、$\chi_4(3)=-1$、$\varphi(4)=2$ なので
$$
\begin{aligned}
\mathbf1_{\{p\equiv1\pmod4\}}&=\tfrac12(\chi_0(p)+\chi_4(p)),\\
\mathbf1_{\{p\equiv3\pmod4\}}&=\tfrac12(\chi_0(p)-\chi_4(p)).
\end{aligned}
$$
$p=2$ では双方の文字が $0$ なので式は正しいままです。$\sigma>1$ では $\sum_pp^{-\sigma}<\infty$ より和を交換でき、
$$
S_1(\sigma)=\tfrac12\sum_p\frac{\chi_0(p)+\chi_4(p)}{p^\sigma},
\quad
S_3(\sigma)=\tfrac12\sum_p\frac{\chi_0(p)-\chi_4(p)}{p^\sigma}.
$$
[素数対数補題](#lem-ant4-prime-log)をそれぞれの文字に適用すると、各素数和は $\log L(\sigma,\chi)+O(1)$ です。[ANT3の主文字の極](../ANT3/index.md#thm-ant3-l-continuation)から
$$
\log L(\sigma,\chi_0)=\log\frac1{\sigma-1}+O(1).
$$
一方、$\chi_4$ は非主で、[ANT3の正則延長](../ANT3/index.md#thm-ant3-l-continuation)と[本章の境界非零性](#thm-ant4-l-one-nonzero)を合わせて $\log L(\sigma,\chi_4)=O(1)$ です。従って
$$
S_1(\sigma)=\frac12\log\frac1{\sigma-1}+O(1),
\qquad
S_3(\sigma)=\frac12\log\frac1{\sigma-1}+O(1).
$$
両者はともに発散するので、それぞれの剰余類に素数は無限個あります。また両方で素数の逆数和も発散しますが、それだけから素数個数の同じ漸近密度が証明されたわけではありません。
<!-- solution-end -->

## 5. 次章への橋

主文字の $L$ 関数は $s=1$ に極を持ち、非主文字はそこでは零にも極にもならない。この違いと文字直交関係から、各既約剰余類に無限個の素数があることを証明できました。次のANT5では素数を「ただ一回数える」代わりに、素数冪の重みを持つvon Mangoldt関数を導入し、$\zeta'(s)/\zeta(s)$ のDirichlet級数へ進みます。