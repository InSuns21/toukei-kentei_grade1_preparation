# NT1 整数環・合同式・剰余類

整数を割った余りだけで計算する場面は、曜日、周期的な時刻、暗号の基本操作などに現れます。しかし、通常の等式と同じように両辺を割ってよいとは限りません。例えば $2x\equiv2\pmod6$ は $x\equiv1\pmod6$ だけでなく $x\equiv4\pmod6$ も満たします。「割り算できる条件」を調べることが、合同式を安全に解く第一歩です。

これまでに、[商環](../../RNG/RNG1/index.md#def-rng1-quotient-ring)によって元を同一視する一般的な方法、[Euclidの互除法とBézout等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)、[有限個のイデアルに対する中国剰余定理](../../RNG/RNG2/index.md#thm-rng2-crt-finite)を学びました。本章では整数という具体的な舞台に戻し、数字を入れて計算できる形にします。特に、合同式の解が「ない・一つ・複数」のどれになるかを最大公約数だけから判断し、連立合同式の解を実際に構成することを目標にします。

すべての法 $n$ は **正整数** とします。整数の最大公約数 $\gcd(a,b)$ は、$a,b$ が同時に零でないとき正として扱います。

## 1. 整除から合同式へ

整数 $d\ne0$ が整数 $a$ を割り切るとは、ある整数 $k$ が存在して $a=dk$ と書けることです。$d\mid a$ と書きます。例えば $4\mid28$ ですが $4\nmid 30$ です。特に $d\mid(a-b)$ なら、$a$ と $b$ の差は $d$ の倍数であり、$d$ で割った余りが一致します。

<a id="def-nt1-congruence"></a>

<!-- formal-statement-start -->
> **定義（合同）**  
> 正整数 $n$ と整数 $a,b$ に対し、$n\mid(a-b)$ のとき、$a$ と $b$ は法 $n$ で合同といい、
>
> $$
> a\equiv b\pmod n
> $$
>
> と記す。$a$ と合同な整数全体を剰余類 $[a]_n=a+n\mathbb Z$ といい、剰余類全体を $\mathbb Z/n\mathbb Z$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nt1-congruence -->
### 定義の確認：負の数も同じ余りに収める

$-29-7=-36=12(-3)$ なので $-29\equiv7\pmod{12}$ です。一方、$-29-6=-35$ は $12$ の倍数でないため、$-29\not\equiv6\pmod{12}$ です。負の整数にも必ず $0,1,\ldots,n-1$ の中に一つだけ代表元があります。実際、整数の除法で $a=nq+r$、$0\le r<n$ と書けば $a\equiv r\pmod n$ であり、二つのそのような $r,s$ が合同なら $n\mid(r-s)$、かつ $|r-s|<n$ より $r=s$ です。
<!-- definition-example-end -->

合同は等式ではなく「差が $n$ の倍数」という関係です。例えば $a\equiv b\pmod n$、$c\equiv d\pmod n$ なら $a-b=nu$、$c-d=nv$ とおけます。和の差と積の差を計算すると

$$
(a+c)-(b+d)=n(u+v),
$$

$$
ac-bd=(a-b)c+b(c-d)=n(uc+bv)
$$

です。したがって $a+c\equiv b+d\pmod n$、$ac\equiv bd\pmod n$ が成り立ちます。この計算のおかげで代表元を取り替えても和・積が変わらず、$\mathbb Z/n\mathbb Z$ は[商環](../../RNG/RNG1/index.md#def-rng1-quotient-ring)になります。

## 2. Euclidの互除法とBézout等式を数字で動かす

合同式の割り算には、最大公約数が必要です。先に $252$ と $198$ の最大公約数を計算しましょう。

$$
\begin{aligned}
252&=198+54,\\
198&=3\cdot54+36,\\
54&=36+18,\\
36&=2\cdot18.
\end{aligned}
$$

[Euclidの互除法](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)の適用対象は整数環 $\mathbb Z$、対象元は $252,198$ で、絶対値が余りを小さくするEuclid関数です。最後の非零余りは $18$ なので $\gcd(252,198)=18$ です。さらに式を後ろから解くと

$$
\begin{aligned}
18&=54-36\\
&=54-(198-3\cdot54)\\
&=4\cdot54-198\\
&=4(252-198)-198\\
&=4\cdot252-5\cdot198.
\end{aligned}
$$

この表示は $18$ が二つの数の整数係数線形結合であることを示します。一般に $\gcd(a,b)=d>0$ であれば、[Bézout等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)により整数 $u,v$ が存在して

$$
au+bv=d
$$

と書けます。特に $d=1$ のとき、$au\equiv1\pmod b$ なので、$a$ は法 $b$ で掛け算の逆元を持ちます。

<a id="prop-nt1-inverse-criterion"></a>

<!-- formal-statement-start -->
> **命題（整数剰余類の逆元の存在条件）**  
> 正整数 $n$ と整数 $a$ について、剰余類 $[a]_n$ が $\mathbb Z/n\mathbb Z$ の乗法の逆元を持つための必要十分条件は $\gcd(a,n)=1$ である。ただし $n=1$ の場合は零環の唯一の元を単位元として扱う。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\gcd(a,n)=1$ なら[Bézout等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)を $a,n$ に適用して $au+nv=1$ となる整数 $u,v$ を取れます。すると $au\equiv1\pmod n$ なので $[u]_n$ は $[a]_n$ の逆元です。

逆に $[a]_n$ に逆元 $[u]_n$ があれば、$au\equiv1\pmod n$、したがって $au-1=nt$ となる整数 $t$ が存在します。$1=au-nt$ です。$d=\gcd(a,n)$ は $a,n$ をともに割るので右辺も割り、$d\mid1$ です。$d>0$ より $d=1$ が従います。
<!-- proof-end -->

例えば $7$ と $15$ は互いに素で、$7\cdot13=91=1+6\cdot15$ なので $13$ は法 $15$ における $7$ の逆元です。一方、$6$ は法 $15$ で逆元を持ちません。なぜなら $\gcd(6,15)=3>1$ だからです。この差が合同式の解の個数へ直結します。

## 3. 合同式で「約分」できる条件

$a x\equiv a y\pmod n$ から常に $x\equiv y\pmod n$ と結論するのは誤りです。実際、$2\cdot1\equiv2\cdot4\pmod6$ ですが $1\not\equiv4\pmod6$ です。$2$ を消すには法 $6$ と互いに素である必要があります。

<a id="prop-nt1-cancellation"></a>

<!-- formal-statement-start -->
> **命題（合同式の約分）**  
> $n$ を正整数、$a,x,y$ を整数、$d=\gcd(a,n)$ とする。このとき
>
> $$
> ax\equiv ay\pmod n
> \quad\Longleftrightarrow\quad
> x\equiv y\pmod{n/d}.
> $$
>
> 特に $\gcd(a,n)=1$ なら、$ax\equiv ay\pmod n$ から $x\equiv y\pmod n$ を導ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$d\mid a,n$ なので $a=da'$、$n=dn'$ と書きます。ここで $\gcd(a',n')=1$ です。左辺は $n\mid a(x-y)$、すなわち

$$
dn'\mid da'(x-y)
\quad\Longleftrightarrow\quad
n'\mid a'(x-y)
$$

という条件です。$\gcd(a',n')=1$ なので[Bézout等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)から $a'u+n'v=1$ を満たす整数 $u,v$ が存在します。$n'\mid a'(x-y)$ と $n'\mid n'v(x-y)$ を足すと

$$
n'\mid (a'u+n'v)(x-y)=x-y
$$

が従います。逆に $n'\mid x-y$ なら $x-y=n'k$ とおけるので $a(x-y)=da'n'k=na'k$ は $n$ の倍数です。よって同値です。
<!-- proof-end -->

## 4. 線形合同式の解の存在と個数

方程式 $ax\equiv b\pmod n$ を解くとは、差 $ax-b$ が $n$ の倍数となる整数 $x$ を求めることです。これはある整数 $y$ が存在して $ax-ny=b$ となることと同じで、一次不定方程式でもあります。

<a id="thm-nt1-linear-congruence"></a>

<!-- formal-statement-start -->
> **定理（線形合同式の可解条件と解の個数）**  
> $a,b\in\mathbb Z$、$n\ge1$、$d=\gcd(a,n)$ とする。ただし $a=0$、$n\ge1$ も許す。$ax\equiv b\pmod n$ に解が存在するための必要十分条件は $d\mid b$ である。可解なら、法 $n$ で相異なる解の剰余類はちょうど $d$ 個ある。
<!-- formal-statement-end -->

### 証明の見取り図

まず $ax-b$ が $n$ の倍数であることから $d\mid b$ が必要だと分かります。十分性はBézout等式で一つの解を作って示します。最後に、二つの解の差へ[合同式の約分](#prop-nt1-cancellation)を適用して解を全部列挙します。

<!-- proof-start -->
### 証明

解 $x$ が存在すれば $ax-b=nt$ となる整数 $t$ があるので、$b=ax-nt$ です。$d$ は $a,n$ の公約数だから $d\mid b$ が必要です。

逆に $b=dc$ と書けるとします。[Bézout等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)から $au+nv=d$ を満たす整数 $u,v$ を取ります。両辺に $c$ を掛けて

$$
a(uc)+n(vc)=dc=b
$$

です。したがって $x_0=uc$ は $ax_0\equiv b\pmod n$ を満たします。

任意の別の解 $x$ と $x_0$ について $ax\equiv ax_0\pmod n$ です。[合同式の約分](#prop-nt1-cancellation)を使えば

$$
x\equiv x_0\pmod{n/d}
$$

が必要十分です。つまり解の整数全体は $x=x_0+(n/d)k$、$k\in\mathbb Z$ です。法 $n$ では $k$ の剰余を法 $d$ で分類できるので

$$
x_0,\ x_0+n/d,\ \ldots,\ x_0+(d-1)n/d
$$

の $d$ 個が異なる解となり、これ以外にありません。実際、二つが法 $n$ で合同なら $n\mid(n/d)(i-j)$ より $d\mid i-j$ であり、$0\le i,j<d$ では $i=j$ です。$a=0$ の場合も $d=n$ なので、$n\mid b$ ならすべての $n$ 個の剰余類が解になります。
<!-- proof-end -->

### 例：$14x\equiv8\pmod{30}$

$\gcd(14,30)=2$ で $2\mid8$ なので解があります。$14=2\cdot7$、$8=2\cdot4$、$30=2\cdot15$ として

$$
7x\equiv4\pmod{15}
$$

を解けばよいです。$7\cdot13=91\equiv1\pmod{15}$ だから両辺に逆元 $13$ を掛けて $x\equiv52\equiv7\pmod{15}$ を得ます。元の法 $30$ では $x\equiv7,22\pmod{30}$ の二つが解です。検算すると

$$
14\cdot7=98=30\cdot3+8,\qquad
14\cdot22=308=30\cdot10+8
$$

です。法 $15$ の唯一の解を、法 $30$ の唯一の解と取り違えないことが重要です。

## 5. 複数の余りを同時に指定する

「法 $3$ では余り $2$、法 $5$ では余り $3$」という指定を一つの数へまとめたい場面があります。これを保証するのが中国剰余定理です。一般の環についての[有限個のイデアルに対する中国剰余定理](../../RNG/RNG2/index.md#thm-rng2-crt-finite)を、整数の法 $n_1,\ldots,n_r$ に適用します。整数のイデアル $n_i\mathbb Z$ が二つずつ互いに素であることは $\gcd(n_i,n_j)=1$ に対応します。

<a id="thm-nt1-crt-constructive"></a>

<!-- formal-statement-start -->
> **定理（整数の中国剰余定理の構成公式）**  
> $r\ge1$ とし、正整数 $n_1,\ldots,n_r$ が二つずつ互いに素、すなわち $i\ne j$ なら $\gcd(n_i,n_j)=1$ とする。任意の整数 $a_1,\ldots,a_r$ に対し
>
> $$
> x\equiv a_i\pmod{n_i}\quad(i=1,\ldots,r)
> $$
>
> を満たす整数が存在し、$M=n_1\cdots n_r$ を法としてただ一つの剰余類を定める。$M_i=M/n_i$ とし、$M_it_i\equiv1\pmod{n_i}$ となる整数 $t_i$ を取れば、一つの解は
>
> $$
> x=\sum_{i=1}^r a_iM_it_i
> $$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

一般の存在・一意性は[有限中国剰余定理](../../RNG/RNG2/index.md#thm-rng2-crt-finite)に帰着できます。ここでは具体的な解の式が、狙った余りだけを残すことと、一意性の法が積 $M$ であることを、整数として確かめます。

<!-- proof-start -->
### 証明

各 $i$ について $\gcd(M_i,n_i)=1$ です。なぜなら $n_i$ は各 $n_j$（$j\ne i$）と互いに素であり、互いに素な整数の積とも互いに素になるからです。この積に関する主張もBézout等式で確認できます。各 $j\ne i$ について $n_i u_j+n_j v_j=1$ を取ります。これらを掛け合わせて分配すると、すべての積で $n_i u_j$ を一度でも選んだ項は $n_i$ の倍数です。残るただ一つの項は

$
\prod_{j\ne i}(n_jv_j)=M_i\prod_{j\ne i}v_j
$

なので、ある整数 $K$ によって

$
1=n_iK+M_i\prod_{j\ne i}v_j
$

と書けます。$n_i,M_i$ の公約数は1を割るので $\gcd(M_i,n_i)=1$ です。

[逆元の存在条件](#prop-nt1-inverse-criterion)から $M_i t_i\equiv1\pmod{n_i}$ となる $t_i$ が取れます。$j\ne i$ なら $n_i$ は $M_j$ を割り切るので

$$
M_jt_j\equiv0\pmod{n_i},
\qquad
M_it_i\equiv1\pmod{n_i}.
$$

したがって提示した $x$ を法 $n_i$ で読むと、和のうち第 $i$ 項だけが残って $x\equiv a_i\pmod{n_i}$ です。

$x,y$ が同じ全合同式を満たせば、どの $n_i$ も $x-y$ を割り切ります。互いに素な正整数 $p,q$ がともに整数 $z$ を割るなら、$z=pu$ と書けて $q\mid pu$ です。[Bézout等式](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm) $pv+qw=1$ を $u$ に掛ければ $u=puv+quw$ となり、$q\mid u$ が従うので $pq\mid z$ です。この議論を、二つずつ互いに素な $n_1,\ldots,n_r$ に順に適用すると $M\mid(x-y)$ です。したがって解は法 $M$ で一意です。
<!-- proof-end -->

### 例：法 $3,5,7$ の同時指定

$x\equiv2\pmod3$、$x\equiv3\pmod5$、$x\equiv2\pmod7$ とします。$M=105$、$M_1=35$、$M_2=21$、$M_3=15$ です。各逆元は法 $3$ で $35\cdot2\equiv1$、法 $5$ で $21\cdot1\equiv1$、法 $7$ で $15\cdot1\equiv1$ です。よって

$$
x=2\cdot35\cdot2+3\cdot21\cdot1+2\cdot15\cdot1
=233\equiv23\pmod{105}.
$$

$23=3\cdot7+2=5\cdot4+3=7\cdot3+2$ なので、三条件を直接検算できます。

### 互いに素でない二つの法はどうなるか

二つの法が互いに素でないとき、任意の余りが両立するわけではありません。例えば $x\equiv1\pmod4$ と $x\equiv2\pmod6$ は不可能です。前者の整数は奇数、後者の整数は偶数だからです。一方、法が互いに素でなくても、余りが整合していれば解はあります。

<a id="prop-nt1-crt-compatible"></a>

<!-- formal-statement-start -->
> **命題（二つの法の連立合同式と整合条件）**  
> 正整数 $m,n$、整数 $a,b$ に対し、
>
> $$
> x\equiv a\pmod m,\qquad x\equiv b\pmod n
> $$
>
> が可解であるための必要十分条件は $\gcd(m,n)\mid(b-a)$ である。可解なら、解は $\operatorname{lcm}(m,n)=mn/\gcd(m,n)$ を法としてただ一つの剰余類となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第一式は $x=a+mk$ と書けるので、第二式へ代入すると $mk\equiv b-a\pmod n$ です。[線形合同式の可解条件](#thm-nt1-linear-congruence)から、これは $d=\gcd(m,n)$ が $b-a$ を割ることと同値です。

条件が成り立つとき、$mk\equiv b-a\pmod n$ のすべての解は一つの $k_0$ に対して $k\equiv k_0\pmod{n/d}$ と書けます。よって

$$
x=a+mk=a+mk_0+(mn/d)t,\qquad t\in\mathbb Z.
$$

逆にこの形の整数は第一式を満たし、差 $x-(a+mk_0)=(mn/d)t$ は $m,n$ の両方の倍数なので第二式も満たします。$mn/d$ が二つの正整数の最小公倍数であることは、$m=dm'$、$n=dn'$、$\gcd(m',n')=1$ を用いて共通倍数を割り切る条件を調べれば分かります。
<!-- proof-end -->

例えば $x\equiv5\pmod{12}$、$x\equiv11\pmod{18}$ では $\gcd(12,18)=6$ が差 $11-5=6$ を割るので可解です。$x=5+12k$ と置けば $12k\equiv6\pmod{18}$、すなわち $2k\equiv1\pmod3$ なので $k\equiv2\pmod3$ です。したがって $x\equiv29\pmod{36}$ となります。$29$ は $12$ で割れば余り $5$、$18$ で割れば余り $11$ です。

## 6. 演習と詳細解答

### Level A：定義と整数計算

#### A1. 互除法と係数の逆代入

$252$ と $198$ にEuclidの互除法を適用し、正の最大公約数を求め、$252u+198v=\gcd(252,198)$ を満たす整数 $u,v$ を一組求めよ。

- Level: A
- ID: NT1-A1

<!-- solution-start -->
**詳細解答**　$252=198+54$、$198=3\cdot54+36$、$54=36+18$、$36=2\cdot18$ なので最後の非零余りは $18$ です。[互除法の定理](../../RNG/RNG3/index.md#thm-rng3-euclidean-algorithm)が整数環に適用でき、$\gcd(252,198)=18$ です。後ろから

$$
18=54-36=54-(198-3\cdot54)=4\cdot54-198=4\cdot252-5\cdot198
$$

を得ます。従って $u=4,v=-5$ が一組です。両辺の数値は $1008-990=18$ と検算できます。
<!-- solution-end -->

#### A2. 剰余類の代表元と積

$-29$ の法 $12$ における $0$ 以上 $11$ 以下の代表元を求めよ。また $[-29]_{12}^2$ の同じ範囲の代表元を求めよ。

- Level: A
- ID: NT1-A2

<!-- solution-start -->
**詳細解答**　$-29=(-3)\cdot12+7$ より $[-29]_{12}=[7]_{12}$ です。合同式では積を取っても合同性が保たれるため

$$
[-29]_{12}^2=[7^2]_{12}=[49]_{12}=[1]_{12}.
$$

$49=4\cdot12+1$ なので答えは順に $7$ と $1$ です。通常の整数の等号 $-29=7$ と取り違えないよう、剰余類の等号として書きます。
<!-- solution-end -->

#### A3. 線形合同式を全部解く

$14x\equiv8\pmod{30}$ を満たす $0\le x<30$ の整数をすべて求めよ。

- Level: A
- ID: NT1-A3

<!-- solution-start -->
**詳細解答**　$\gcd(14,30)=2$ が右辺 $8$ を割るので、[可解条件](#thm-nt1-linear-congruence)により解が存在し、法 $30$ で $2$ 個あります。$2$ で割った後の式は $7x\equiv4\pmod{15}$ です。$7\cdot13=91\equiv1\pmod{15}$ から $x\equiv13\cdot4=52\equiv7\pmod{15}$ です。$0\le x<30$ では $x=7,22$ です。実際、$98-8=90$、$308-8=300$ はいずれも $30$ の倍数であり、解の個数も一致します。
<!-- solution-end -->

#### A4. 三つの互いに素な法

$x\equiv2\pmod3$、$x\equiv3\pmod5$、$x\equiv2\pmod7$ を満たす $0\le x<105$ の整数を求めよ。

- Level: A
- ID: NT1-A4

<!-- solution-start -->
**詳細解答**　$3,5,7$ は二つずつ互いに素です。[構成公式](#thm-nt1-crt-constructive)に $M=105$、$M_1=35$、$M_2=21$、$M_3=15$、$t_1=2,t_2=t_3=1$ を代入して

$$
x\equiv2\cdot35\cdot2+3\cdot21+2\cdot15=233\equiv23\pmod{105}
$$

です。$23$ をそれぞれの法で割ると余りは $2,3,2$ です。法 $105$ で一意なので指定範囲の答えは $23$ だけです。
<!-- solution-end -->

### Level B：可解性と構成の理由

#### B1. 一般定理を別の係数で使う

$18x\equiv12\pmod{30}$ の解を $0\le x<30$ ですべて求めよ。解の個数が $\gcd(18,30)$ と一致することを確かめよ。

- Level: B
- ID: NT1-B1

<!-- solution-start -->
**詳細解答**　$d=\gcd(18,30)=6$ で $6\mid12$ なので可解です。元の合同式を $6$ で割ると

$$
3x\equiv2\pmod5.
$$

$3\cdot2=6\equiv1\pmod5$ より逆元 $2$ を掛け、$x\equiv4\pmod5$ を得ます。従って $x=4+5k$ で、$0\le x<30$ とするには $k=0,1,2,3,4,5$ です。解は $4,9,14,19,24,29$ の6個です。どの解でも $18(4+5k)-12=60+90k=30(2+3k)$ なので元の式を満たします。[可解条件・個数定理](#thm-nt1-linear-congruence)の結論 $d=6$ と一致します。
<!-- solution-end -->

#### B2. 法が互いに素でない連立条件

$x\equiv5\pmod{12}$、$x\equiv11\pmod{18}$ を解け。また $x\equiv5\pmod{12}$、$x\equiv10\pmod{18}$ が解を持たない理由を説明せよ。

- Level: B
- ID: NT1-B2

<!-- solution-start -->
**詳細解答**　法の最大公約数は $d=\gcd(12,18)=6$ です。第一の組では余りの差 $11-5=6$ は $6$ で割り切れるので、[整合条件](#prop-nt1-crt-compatible)を満たします。$x=5+12k$ と置けば

$$
12k\equiv6\pmod{18}
\quad\Longleftrightarrow\quad
2k\equiv1\pmod3.
$$

$2$ は法 $3$ で自身の逆元なので $k\equiv2\pmod3$、$k=2+3t$ と書けます。したがって $x=5+12(2+3t)=29+36t$ です。解は $x\equiv29\pmod{36}$ です。

第二の組では差 $10-5=5$ は $6$ で割り切れません。もし $x=5+12k=10+18t$ と書ければ $12k-18t=5$ となり、左辺は $6$ の倍数なのに右辺は違うので矛盾します。従って解はありません。
<!-- solution-end -->

#### B3. 中国剰余定理の構成を自分で行う

$x\equiv1\pmod4$、$x\equiv2\pmod5$、$x\equiv3\pmod7$ を満たす $0\le x<140$ の整数を、$M_i$ と逆元を明記して求めよ。

- Level: B
- ID: NT1-B3

<!-- solution-start -->
**詳細解答**　法 $4,5,7$ は二つずつ互いに素で $M=4\cdot5\cdot7=140$ です。各 $M_i$ は $35,28,20$ です。法 $4$ で $35\equiv3$ の逆元は $3$、法 $5$ で $28\equiv3$ の逆元は $2$、法 $7$ で $20\equiv6$ の逆元は $6$ です。積を確認すると

$$
35\cdot3=105\equiv1\pmod4,\quad
28\cdot2=56\equiv1\pmod5,\quad
20\cdot6=120\equiv1\pmod7.
$$

[構成公式](#thm-nt1-crt-constructive)へ代入すると

$$
x\equiv1\cdot35\cdot3+2\cdot28\cdot2+3\cdot20\cdot6
=105+112+360=577\equiv17\pmod{140}.
$$

$17\equiv1\pmod4$、$17\equiv2\pmod5$、$17\equiv3\pmod7$ と検算でき、法 $140$ で一意なので答えは $17$ です。
<!-- solution-end -->

### Level C：一つの未知数に複数の種類の条件を課す

#### C1. 線形合同式から非互いに素な連立へ

次の三条件をすべて満たす整数 $x$ を求め、解集合を一つの合同式で表せ。

$$
14x\equiv8\pmod{30},\qquad
x\equiv3\pmod8,\qquad
x\equiv4\pmod9.
$$

可解性、法の扱い、最終的な解の一意性を説明せよ。

- Level: C
- ID: NT1-C1

<!-- solution-start -->
**詳細解答**　第一式では $\gcd(14,30)=2\mid8$ なので解が存在します。[線形合同式の可解条件と解の個数](#thm-nt1-linear-congruence)により、$7x\equiv4\pmod{15}$、逆元 $13$ を掛けて $x\equiv7\pmod{15}$ です。したがって第一式は法 $30$ で2個の解を持ちますが、**整数全体の解集合**としては $x=7+15k$ の一つの式にまとめられます。

第二式へ代入すると

$$
7+15k\equiv3\pmod8
\quad\Longleftrightarrow\quad
7k\equiv4\pmod8.
$$

$7\cdot7=49\equiv1\pmod8$ なので $k\equiv7\cdot4=28\equiv4\pmod8$ です。$k=4+8t$ と置き直すと

$$
x=7+15(4+8t)=67+120t.
$$

第三式へ代入して

$$
67+120t\equiv4\pmod9
\quad\Longleftrightarrow\quad
4+3t\equiv4\pmod9
\quad\Longleftrightarrow\quad
3t\equiv0\pmod9
$$

です。[合同式の約分](#prop-nt1-cancellation)により $t\equiv0\pmod3$、つまり $t=3s$ です。最終的な全解は

$$
\boxed{x=67+360s\quad(s\in\mathbb Z)}
$$

であり、法 $360$ でただ一つの剰余類です。検算では $14\cdot67=938=30\cdot31+8$、$67=8\cdot8+3=9\cdot7+4$ です。また増分 $360$ は $30,8,9$ のいずれを法としても零であり、逆方向の各同値変形からこれ以外の解はありません。
<!-- solution-end -->

## 7. この章から次へ

合同式の加減乗除は、余りの同値関係と最大公約数で制御されます。$\gcd(a,n)=1$ のときだけ逆元が存在し、一般の $ax\equiv b\pmod n$ の解の有無・個数は $\gcd(a,n)$ に支配されます。中国剰余定理は互いに素な法を一つの法へ合成する道具ですが、互いに素でないときにも余りの整合条件を調べれば解けます。

次章では、$\mathbb Z/n\mathbb Z$ のうち逆元を持つ元全体を乗法群として捉え、その元の位数から Fermatの小定理、Eulerの定理、原始根へ進みます。
