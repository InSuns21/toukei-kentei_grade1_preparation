from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parents[1]
MARK2 = '<!-- exercise-density-standard-supplement-20260912 -->'

DATA = {
'F0_00A_集合_写像_上限下限': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A-A04 単射を定義から判定する

- Level: A
- 目安時間: 8分

$f:\mathbb R\to\mathbb R$, $f(x)=2x-3$ が単射であることを定義から示せ。

<!-- solution-start -->
#### 詳細解答
$f(x_1)=f(x_2)$ と仮定すると
$$
2x_1-3=2x_2-3
$$
なので $2x_1=2x_2$、従って $x_1=x_2$。これは単射の定義そのものである。

#### 本番答案
$f(x_1)=f(x_2)$ なら $2x_1-3=2x_2-3$ より $x_1=x_2$。従って単射。
<!-- solution-end -->

### F0-00A-B03 像は共通部分をどこまで保つか

- Level: B
- 目安時間: 12分

任意の写像 $f:X\to Y$ と $A,B\subseteq X$ に対して
$$
f(A\cap B)\subseteq f(A)\cap f(B)
$$
を示せ。また、等号が一般には成り立たない例を一つ作れ。

<!-- solution-start -->
#### 詳細解答
$y\in f(A\cap B)$ とすると、ある $x\in A\cap B$ が存在して $y=f(x)$。すると $x\in A$ かつ $x\in B$ だから $y\in f(A)$ かつ $y\in f(B)$。よって包含が成り立つ。

等号が壊れる例として $f:\mathbb R\to\mathbb R$, $f(x)=x^2$、$A=\{-1\}$、$B=\{1\}$ を取ると
$$
A\cap B=\varnothing,\qquad f(A)\cap f(B)=\{1\}.
$$
従って左辺は空集合、右辺は非空である。

#### 本番答案
包含は像の定義から従う。反例は $f(x)=x^2$, $A=\{-1\}$, $B=\{1\}$。
<!-- solution-end -->

### F0-00A-C01 単射を集合の逆像で特徴付ける

- Level: C
- 目安時間: 18分

写像 $f:X\to Y$ について、次が同値であることを示せ。

1. $f$ は単射である。
2. 任意の $A\subseteq X$ に対して $f^{-1}(f(A))=A$。

<!-- solution-start -->
#### 詳細解答
1を仮定する。常に $A\subseteq f^{-1}(f(A))$ である。逆に $x\in f^{-1}(f(A))$ なら $f(x)\in f(A)$ なので、ある $a\in A$ が存在して $f(x)=f(a)$。単射性から $x=a\in A$。従って等号。

2を仮定し、$f(x)=f(x')$ とする。$A=\{x\}$ と置けば $f(x')\in f(A)$ なので $x'\in f^{-1}(f(A))=A=\{x\}$。従って $x'=x$ であり、$f$ は単射。

#### 本番答案
単射なら $f(x)=f(a)$ から $x=a$ を使って逆包含が出る。逆に $A=\{x\}$ を用いれば $f(x')=f(x)$ から $x'\in f^{-1}(f(A))=A$、よって $x'=x$。
<!-- solution-end -->
''',

'F0_00A1_上界_下界_supremum_infimum': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1-A04 上限は集合に属するとは限らない

- Level: A
- 目安時間: 8分

$$
A=\left\{1-\frac1n:n\in\mathbb N\right\}
$$
について $\sup A$ を求め、それが $A$ に属するか判定せよ。

<!-- solution-start -->
#### 詳細解答
各 $n$ で $1-1/n<1$ なので1は上界である。一方 $u<1$ とすると $1-u>0$。十分大きい $n$ で $1/n<1-u$ とでき、そのとき
$$
u<1-\frac1n\in A.
$$
従って $u$ は上界でない。よって $\sup A=1$。しかし $1-1/n=1$ となる自然数 $n$ は存在しないので $1\notin A$。

#### 本番答案
$$
\boxed{\sup A=1},\qquad 1\notin A.
$$
<!-- solution-end -->

### F0-00A1-B03 二集合の和集合の上限

- Level: B
- 目安時間: 12分

空でなく上に有界な $A,B\subseteq\mathbb R$ に対して
$$
\sup(A\cup B)=\max\{\sup A,\sup B\}
$$
を示せ。

<!-- solution-start -->
#### 詳細解答
$s=\sup A$, $t=\sup B$, $M=\max\{s,t\}$ とする。$a\in A$ なら $a\le s\le M$、$b\in B$ なら $b\le t\le M$ なので $M$ は $A\cup B$ の上界。

一方 $u<M$ とする。$M=s$ なら $u<s$ なので $u$ は $A$ の上界でなく、ある $a\in A$ が $u<a$ を満たす。従って $u$ は $A\cup B$ の上界でもない。$M=t$ の場合も同様。よって $M$ が最小上界。

#### 本番答案
$M=\max\{\sup A,\sup B\}$ は両集合を上から抑える。$u<M$ なら $M$ を与えた側の集合で $u$ より大きい元があるので上界になれない。従って主張が従う。
<!-- solution-end -->

### F0-00A1-C01 Minkowski和の上限

- Level: C
- 目安時間: 18分

空でなく上に有界な $A,B\subseteq\mathbb R$ に対し
$$
A+B:=\{a+b:a\in A,\ b\in B\}
$$
と置く。次を証明せよ。
$$
\sup(A+B)=\sup A+\sup B.
$$

<!-- solution-start -->
#### 詳細解答
$s=\sup A$, $t=\sup B$ とする。任意の $a\in A,b\in B$ で $a\le s,b\le t$ だから $a+b\le s+t$。従って $s+t$ は上界。

任意の $\varepsilon>0$ を取る。$s-\varepsilon/2$ は $A$ の上界でないので、ある $a\in A$ が
$$
s-\frac\varepsilon2<a\le s
$$
を満たす。同様にある $b\in B$ が
$$
t-\frac\varepsilon2<b\le t
$$
を満たす。従って
$$
s+t-\varepsilon<a+b\in A+B.
$$
よって $s+t$ より小さい数は $A+B$ の上界になれない。従って $s+t$ が最小上界。

#### 本番答案
$s+t$ は上界。さらに任意の $\varepsilon>0$ に対し $a>s-\varepsilon/2$, $b>t-\varepsilon/2$ を取れば $a+b>s+t-\varepsilon$。よって
$$
\boxed{\sup(A+B)=s+t}.
$$
<!-- solution-end -->
''',

'F0_00A1B_実数の上限性質_Archimedes性': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1B-A04 $1/n^2$ を誤差内に入れる

- Level: A
- 目安時間: 8分

任意の $\varepsilon>0$ に対して、十分大きい $n$ で
$$
\frac1{n^2}<\varepsilon
$$
となることを [Archimedes性](#thm-f0-00a1b-archimedean) から示せ。

<!-- solution-start -->
#### 詳細解答
$1/\sqrt\varepsilon$ は正の実数なので、[Archimedes性](#thm-f0-00a1b-archimedean)から
$$
N>\frac1{\sqrt\varepsilon}
$$
となる自然数 $N$ を取れる。$n\ge N$ なら $n>1/\sqrt\varepsilon$ なので
$$
\frac1{n^2}<\varepsilon.
$$

#### 本番答案
$N>1/\sqrt\varepsilon$ を取れば $n\ge N$ で $1/n^2<\varepsilon$。
<!-- solution-end -->

### F0-00A1B-B03 二点の間に $a+1/N$ を入れる

- Level: B
- 目安時間: 10分

実数 $a<b$ に対し、ある $N\in\mathbb N$ が存在して
$$
a<a+\frac1N<b
$$
となることを示せ。

<!-- solution-start -->
#### 詳細解答
$b-a>0$ だから、[Archimedes性](#thm-f0-00a1b-archimedean)の系より
$$
\frac1N<b-a
$$
となる自然数 $N$ が存在する。$1/N>0$ なので $a<a+1/N$、また不等式へ $a$ を加えて $a+1/N<b$。従って主張が従う。

#### 本番答案
$1/N<b-a$ を満たす $N$ を取れば
$$
a<a+1/N<b.
$$
<!-- solution-end -->

### F0-00A1B-C01 正の無限小は実数には存在しない

- Level: C
- 目安時間: 15分

$r>0$ が
$$
nr\le1\qquad(\forall n\in\mathbb N)
$$
を満たす実数だと仮定すると矛盾することを示せ。

<!-- solution-start -->
#### 詳細解答
$r>0$ なので $1/r\in\mathbb R$。 [Archimedes性](#thm-f0-00a1b-archimedean) から
$$
n>\frac1r
$$
となる自然数 $n$ が存在する。両辺に $r>0$ を掛けると $nr>1$。これは全ての自然数について $nr\le1$ という仮定に矛盾する。

#### 本番答案
[Archimedes性](#thm-f0-00a1b-archimedean)で $n>1/r$ を取れば $nr>1$ となり矛盾。
<!-- solution-end -->
''',

'F0_00A1C_集合族_添字集合_べき集合': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1C-A04 縮小する区間族の和と交差

- Level: A
- 目安時間: 8分

$A_n=(-1/n,1/n)$ $(n\in\mathbb N)$ とする。次を求めよ。
$$
\bigcup_{n\in\mathbb N}A_n,\qquad
\bigcap_{n\in\mathbb N}A_n.
$$

<!-- solution-start -->
#### 詳細解答
$A_1=(-1,1)$ が全ての $A_n$ を含むので任意和は $(-1,1)$。0は全ての $A_n$ に入る。一方 $x\ne0$ なら十分大きい $n$ で $1/n<|x|$ となり $x\notin A_n$。従って任意交差は $\{0\}$。

#### 本番答案
$$
\boxed{\bigcup_nA_n=(-1,1),\qquad \bigcap_nA_n=\{0\}}.
$$
<!-- solution-end -->

### F0-00A1C-B03 和集合と任意交差の分配

- Level: B
- 目安時間: 12分

$I\ne\varnothing$ とし、$B\subseteq X$ と集合族 $\{A_i\}_{i\in I}$ に対して
$$
B\cup\left(\bigcap_{i\in I}A_i\right)
=
\bigcap_{i\in I}(B\cup A_i)
$$
を要素による論理式から証明せよ。

<!-- solution-start -->
#### 詳細解答
任意の $x\in X$ について
$$
\begin{aligned}
x\in B\cup\bigcap_iA_i
&\iff (x\in B)\ \text{または}\ (\forall i,\ x\in A_i)\\
&\iff \forall i,\ ((x\in B)\ \text{または}\ x\in A_i)\\
&\iff x\in\bigcap_i(B\cup A_i).
\end{aligned}
$$
第2の同値では「$x\in B$」が添字 $i$ に依存しないことを使っている。

#### 本番答案
所属条件を命題論理へ直せば
$$
P\lor(\forall i\,Q_i)\iff\forall i(P\lor Q_i)
$$
となるため等しい。
<!-- solution-end -->

### F0-00A1C-C01 「無限回」と「最終的に」を集合族で表す

- Level: C
- 目安時間: 18分

集合列 $(A_n)$ に対して
$$
L:=\bigcap_{N=1}^{\infty}\bigcup_{n\ge N}A_n,
\qquad
E:=\bigcup_{N=1}^{\infty}\bigcap_{n\ge N}A_n
$$
と置く。点 $x$ について、$x\in L$ と $x\in E$ がそれぞれ何を意味するか、量化記号で展開して説明せよ。

<!-- solution-start -->
#### 詳細解答
$x\in L$ は
$$
\forall N\ \exists n\ge N:\ x\in A_n
$$
と同値である。どこまで先へ進んでも再び $A_n$ に入る添字があるので、「$x$ が $A_n$ に無限回属する」という意味。

$x\in E$ は
$$
\exists N\ \forall n\ge N:\ x\in A_n
$$
と同値である。ある番号以降は常に $A_n$ に属するので、「最終的にずっと属する」という意味。

#### 本番答案
$$
x\in L\iff \forall N\exists n\ge N:x\in A_n,
$$
$$
x\in E\iff \exists N\forall n\ge N:x\in A_n.
$$
<!-- solution-end -->
''',

'F0_00A1D_順序_全順序_最小最大_整列': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1D-A04 最小元と「小さい元」を区別する

- Level: A
- 目安時間: 7分

通常順序を入れた $A=(0,1]$ について最小元が存在するか判定せよ。また、$\inf A$ との違いを述べよ。

<!-- solution-start -->
#### 詳細解答
$A$ の最小元は存在しない。実際、任意の $x\in(0,1]$ に対して $x/2\in(0,1]$ かつ $x/2<x$ だからである。一方 $0$ は $A$ の最大の下界なので $\inf A=0$。最小元は集合の要素でなければならないが、下限は集合外でもよい。

#### 本番答案
最小元なし。$\inf A=0$ だが $0\notin A$。
<!-- solution-end -->

### F0-00A1D-B03 半順序で最小元は一意

- Level: B
- 目安時間: 10分

半順序集合 $(P,\preceq)$ に最小元が存在するとき、それが一意であることを示せ。

<!-- solution-start -->
#### 詳細解答
$m,m'$ がともに最小元だとする。$m$ は最小元なので $m\preceq m'$。同様に $m'$ は最小元なので $m'\preceq m$。半順序の反対称律から $m=m'$。従って最小元は高々一つ。

#### 本番答案
二つの最小元 $m,m'$ があれば $m\preceq m'$ かつ $m'\preceq m$。反対称律より $m=m'$。
<!-- solution-end -->

### F0-00A1D-C01 辞書式順序で $\mathbb N^2$ を整列する

- Level: C
- 目安時間: 18分

$\mathbb N^2$ に辞書式順序
$$
(m,n)\prec(m',n')
\iff
m<m'\ \text{または}\ (m=m'\text{ かつ }n<n')
$$
を入れる。この順序が整列であることを示せ。

<!-- solution-start -->
#### 詳細解答
非空集合 $A\subseteq\mathbb N^2$ を任意に取る。第1座標の集合
$$
M=\{m\in\mathbb N:\exists n,(m,n)\in A\}
$$
は非空な自然数集合なので最小元 $m_0$ を持つ。次に
$$
N=\{n\in\mathbb N:(m_0,n)\in A\}
$$
も非空なので最小元 $n_0$ を持つ。

任意の $(m,n)\in A$ について、$m_0<m$ なら辞書式順序で $(m_0,n_0)\prec(m,n)$。$m=m_0$ なら $n_0\le n$。従って $(m_0,n_0)$ が $A$ の最小元である。

#### 本番答案
まず第1座標の最小値 $m_0$、次にその第1座標を持つ点の第2座標の最小値 $n_0$ を取る。$(m_0,n_0)$ が任意の非空部分集合の最小元になる。
<!-- solution-end -->
''',

'F0_00A2_選択公理_Zorn_極大原理': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A2-A04 最小元があれば選択関数は明示できる

- Level: A
- 目安時間: 8分

各 $n\in\mathbb N$ について $A_n\subseteq\mathbb N$ が非空とする。$A_n$ の最小元を使って選択関数を明示せよ。

<!-- solution-start -->
#### 詳細解答
自然数の非空部分集合は最小元を持つので
$$
f(n)=\min A_n
$$
と定められる。定義から $f(n)\in A_n$ であり、これが選択関数である。選択規則が具体的に与えられているため、この構成自体では [選択公理](#axiom-choice) による存在保証を追加する必要はない。

#### 本番答案
$$
\boxed{f(n)=\min A_n}.
$$
<!-- solution-end -->

### F0-00A2-B03 一意に指定できる元がある場合

- Level: B
- 目安時間: 10分

添字付き非空集合族 $\{A_i\}_{i\in I}$ に対し、各 $A_i$ に「条件 $P_i$ を満たす元がただ一つ存在する」と分かっているとする。この一意な元を $a_i$ と書けば $i\mapsto a_i$ が選択関数になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
各 $i$ について条件 $P_i$ を満たす元が存在し、しかも一意なので、その元を $a_i$ と定めることに曖昧さがない。各 $a_i$ は $A_i$ の元だから
$$
f(i)=a_i
$$
と置けば $f(i)\in A_i$ が全ての $i$ で成り立つ。従って $f$ は選択関数である。

#### 本番答案
一意性により各 $i$ の選択値 $a_i$ が定まり、$a_i\in A_i$ なので $f(i)=a_i$ が選択関数。
<!-- solution-end -->

### F0-00A2-C01 直積の非空性として選択公理を読む

- Level: C
- 目安時間: 18分

非空集合族 $\{A_i\}_{i\in I}$ の直積を
$$
\prod_{i\in I}A_i
:=
\{f:I\to\bigcup_{i\in I}A_i:\ f(i)\in A_i\ (\forall i)\}
$$
と定義する。このとき [選択公理](#axiom-choice) が
$$
(\forall i,\ A_i\ne\varnothing)
\Longrightarrow
\prod_{i\in I}A_i\ne\varnothing
$$
という主張そのものであることを説明せよ。

<!-- solution-start -->
#### 詳細解答
直積の元は、定義上、各添字 $i$ に $A_i$ の元 $f(i)$ を一つずつ対応させる写像である。これは選択関数の定義と完全に一致する。従って全ての $A_i$ が非空なとき直積が非空であるという主張は、「選択関数が少なくとも一つ存在する」という [選択公理](#axiom-choice) の言い換えである。

#### 本番答案
$\prod_iA_i$ の元 $f$ はまさに $f(i)\in A_i$ を満たす選択関数。従って「任意の非空集合族の直積が非空」は選択公理と同じ内容。
<!-- solution-end -->
''',

'F0_00A3_半順序_Zorn_極大延長': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A3-A04 最大元なら極大元

- Level: A
- 目安時間: 7分

半順序集合で最大元が存在すれば、それは極大元でもあることを示せ。逆が一般に成り立たない理由も例で述べよ。

<!-- solution-start -->
#### 詳細解答
最大元 $M$ は全ての $x\in P$ に対して $x\preceq M$ を満たす。もし $M\preceq y$ なら最大性から $y\preceq M$ でもあり、反対称律より $y=M$。従って $M$ は極大元。

逆は一般に偽で、例えば $P=\{\{1\},\{2\}\}$ を包含関係で順序付けると両方が極大元だが最大元はない。

#### 本番答案
$M\preceq y$ と最大性の $y\preceq M$ から反対称律で $y=M$。逆の反例は互いに比較不能な二要素。
<!-- solution-end -->

### F0-00A3-B03 chainになった部分空間の合併

- Level: B
- 目安時間: 12分

ベクトル空間 $X$ の部分空間からなるchain $\mathcal C$ を包含関係で考える。$U=\bigcup_{M\in\mathcal C}M$ が再び部分空間であることを示せ。

<!-- solution-start -->
#### 詳細解答
$0$ は全ての部分空間に属するので $0\in U$。$x,y\in U$ を取ると、ある $M,N\in\mathcal C$ が存在して $x\in M$, $y\in N$。chain性から $M\subseteq N$ または $N\subseteq M$。例えば $M\subseteq N$ なら $x,y\in N$ なので任意のスカラー $a,b$ に対して
$$
ax+by\in N\subseteq U.
$$
従って $U$ は線形結合に閉じた部分空間。

#### 本番答案
任意の二元 $x,y\in U$ はchain中の一つの部分空間に同時に入る。そこで線形結合を取れば再び $U$ に入る。
<!-- solution-end -->

### F0-00A3-C01 極大一次独立集合は基底になる

- Level: C
- 目安時間: 20分

ベクトル空間 $X$ の一次独立集合全体を包含関係で順序付ける。[Zornの補題](#thm-zorn)を用いて極大一次独立集合 $B$ を取り、$B$ が $X$ を張ることを示せ。

<!-- solution-start -->
#### 詳細解答
一次独立集合のchainの合併は、任意の有限個の元がchain中の一つの一次独立集合に同時に含まれるため一次独立である。従って各chainは上界を持ち、[Zornの補題](#thm-zorn)から極大一次独立集合 $B$ が存在する。

もし $\operatorname{span}B\ne X$ なら、ある $x\in X\setminus\operatorname{span}B$ を取れる。このとき $B\cup\{x\}$ は一次独立である。実際
$$
a x+\sum_{j=1}^m a_jb_j=0
$$
で $a\ne0$ なら $x$ が $B$ の線形結合となり矛盾するので $a=0$、残りも $B$ の一次独立性から全て0。これは $B$ の極大性に反する。よって $\operatorname{span}B=X$ であり $B$ は基底。

#### 本番答案
chainの合併が一次独立なのでZornを適用できる。極大一次独立集合 $B$ が張らないなら $x\notin\operatorname{span}B$ を一つ加えても一次独立となり極大性に矛盾。従って $B$ は基底。
<!-- solution-end -->
''',

'F0_00B0_点列_部分列_十分大きい添字': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00B0-A04 部分列添字は元の番号より遅れない

- Level: A
- 目安時間: 7分

$n_1<n_2<\cdots$ が自然数の狭義増加列なら
$$
n_k\ge k
$$
が全ての $k$ で成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答
$n_1\ge1$。また自然数で狭義増加なので $n_{k+1}\ge n_k+1$。帰納法で $n_k\ge k$ と仮定すれば
$$
n_{k+1}\ge n_k+1\ge k+1.
$$
従って全ての $k$ で $n_k\ge k$。

#### 本番答案
$n_1\ge1$ と $n_{k+1}\ge n_k+1$ から帰納法で従う。
<!-- solution-end -->

### F0-00B0-B03 無限回起こる命題だけを抜き出す

- Level: B
- 目安時間: 10分

命題 $P(n)$ が無限回起こるとする。$P(n_k)$ が全ての $k$ で成り立つような狭義増加添字列 $n_1<n_2<\cdots$ を構成せよ。

<!-- solution-start -->
#### 詳細解答
$P(n)$ が無限回起こるので、$N=1$ に対して $P(n_1)$ を満たす $n_1\ge1$ を取れる。$n_k$ まで取ったら $N=n_k+1$ とする。再び無限回性から $n_{k+1}\ge n_k+1$ で $P(n_{k+1})$ を満たすものが存在する。これを繰り返せば狭義増加列を得る。

#### 本番答案
$n_k$ の次は無限回性を $N=n_k+1$ に適用して選ぶ。これで $n_{k+1}>n_k$ かつ $P(n_{k+1})$。
<!-- solution-end -->

### F0-00B0-C01 eventually と infinitely often の量化双対

- Level: C
- 目安時間: 16分

命題 $P(n)$ について、次を示せ。

1. $P(n)$ が十分大きい $n$ で成り立つことと、$\neg P(n)$ が無限回は起こらないことは同値。
2. $P(n)$ が無限回起こることと、$\neg P(n)$ が「十分大きい $n$ で常に成り立つ」ことの否定は同値。

<!-- solution-start -->
#### 詳細解答
「$P$ がeventually」は
$$
\exists N\ \forall n\ge N:\ P(n).
$$
その否定は
$$
\forall N\ \exists n\ge N:\ \neg P(n),
$$
すなわち「$\neg P$ が無限回起こる」。従って1が従う。

同様に「$P$ が無限回」は
$$
\forall N\ \exists n\ge N:\ P(n),
$$
であり、これは
$$
\neg\bigl(\exists N\ \forall n\ge N:\ \neg P(n)\bigr)
$$
と同値。括弧内が「$\neg P$ がeventually」なので2も従う。

#### 本番答案
量化記号の否定
$$
\neg\exists N\forall n\ge N=\forall N\exists n\ge N\neg
$$
を使えば両方とも従う。
<!-- solution-end -->
''',

'F0_00B1_位相空間_近傍_部分空間_収束': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00B1-B03 恒等写像で位相の細かさを判定する

- Level: B
- 目安時間: 12分

同じ集合 $X$ 上の位相 $\tau_1,\tau_2$ を考える。恒等写像
$$
\operatorname{id}:(X,\tau_2)\to(X,\tau_1)
$$
が連続であることと $\tau_1\subseteq\tau_2$ が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答
恒等写像では任意の $U\subseteq X$ に対して
$$
\operatorname{id}^{-1}(U)=U.
$$
従って連続性は「任意の $U\in\tau_1$ が $\tau_2$ にも属する」という条件と同値であり、これはちょうど $\tau_1\subseteq\tau_2$。

#### 本番答案
恒等写像の逆像は集合自身なので
$$
\operatorname{id}\text{ continuous}
\iff U\in\tau_1\Rightarrow U\in\tau_2
\iff\tau_1\subseteq\tau_2.
$$
<!-- solution-end -->

### F0-00B1-C01 非Hausdorff空間で極限が二つになる

- Level: C
- 目安時間: 15分

$X=\{0,1\}$ に
$$
\tau=\{\varnothing,\{1\},X\}
$$
を入れる。定数列 $x_n=1$ が1だけでなく0にも収束することを示し、この空間がHausdorffでないことと結びつけて説明せよ。

<!-- solution-start -->
#### 詳細解答
1の近傍には $\{1\}$ があり、定数列は全ての項が1なので当然1へ収束する。

0を含む開集合は $X$ だけである。従って0の任意の近傍は $X$ を含み、全ての $n$ で $x_n=1\in X$。よって同じ列は0にも収束する。

さらに0と1を互いに素な開近傍で分離できない。0を含む唯一の非空開集合 $X$ は1も含むからである。従ってHausdorff性がないため、点列極限の一意性も失われている。

#### 本番答案
0の近傍は実質 $X$ だけなので $x_n=1$ は0にも収束する。0と1を互いに素な開集合で分離できず、非Hausdorff性が極限非一意性として現れている。
<!-- solution-end -->
''',

'F0_00C_連続写像_コンパクト性_最大最小': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00C-A04 絶対値関数の連続性

- Level: A
- 目安時間: 8分

$f(x)=|x|$ が $\mathbb R$ 上で連続であることを
$$
\bigl||x|-|y|\bigr|\le|x-y|
$$
を使って示せ。

<!-- solution-start -->
#### 詳細解答
$x_0\in\mathbb R$ と $\varepsilon>0$ を任意に取る。$\delta=\varepsilon$ とすれば、$|x-x_0|<\delta$ から
$$
\bigl|f(x)-f(x_0)\bigr|
=\bigl||x|-|x_0|\bigr|
\le|x-x_0|
<\varepsilon.
$$
従って $f$ は任意の $x_0$ で連続。

#### 本番答案
$\delta=\varepsilon$ と取れば逆三角不等式から直ちに従う。
<!-- solution-end -->

### F0-00C-B03 閉包と連続像

- Level: B
- 目安時間: 14分

距離空間 $X,Y$、連続写像 $f:X\to Y$、集合 $A\subseteq X$ に対して
$$
f(\overline A)\subseteq\overline{f(A)}
$$
を示せ。

<!-- solution-start -->
#### 詳細解答
$x\in\overline A$ を取る。距離空間では閉包の点列特徴付けにより、ある列 $a_n\in A$ が存在して $a_n\to x$。連続性から
$$
f(a_n)\to f(x).
$$
各 $f(a_n)\in f(A)$ なので、再び閉包の点列特徴付けから $f(x)\in\overline{f(A)}$。従って包含が成り立つ。

#### 本番答案
$x\in\overline A$ なら $a_n\in A$, $a_n\to x$ を取れる。連続性で $f(a_n)\to f(x)$ だから $f(x)\in\overline{f(A)}$。
<!-- solution-end -->

### F0-00C-C01 不連続なら反例列を作れる

- Level: C
- 目安時間: 18分

距離空間 $X,Y$ の写像 $f:X\to Y$ が点 $x\in X$ で連続でないとする。ある点列 $x_n\to x$ が存在して $f(x_n)\not\to f(x)$ となることを定義から構成せよ。

<!-- solution-start -->
#### 詳細解答
$f$ が $x$ で連続でないので、ある $\varepsilon_0>0$ が存在し、どの $\delta>0$ に対しても
$$
d_X(x,y)<\delta,\qquad d_Y(f(x),f(y))\ge\varepsilon_0
$$
を満たす $y$ が存在する。

各 $n$ で $\delta=1/n$ として、そのような点を $x_n$ と選ぶ。すると
$$
d_X(x_n,x)<1/n
$$
なので $x_n\to x$。しかし全ての $n$ で
$$
d_Y(f(x_n),f(x))\ge\varepsilon_0,
$$
従って $f(x_n)$ は $f(x)$ に収束しない。

#### 本番答案
不連続性の否定定義から固定 $\varepsilon_0>0$ を取り、$\delta=1/n$ ごとに反例 $x_n$ を選ぶ。すると $x_n\to x$ だが像は $\varepsilon_0$ 以上離れ続ける。
<!-- solution-end -->
''',

'F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00C1-A04 コンパクト集合の連続像

- Level: A
- 目安時間: 10分

$K$ をコンパクト空間、$f:K\to Y$ を連続写像とする。$f(K)$ がコンパクトであることを開被覆の定義から示せ。

<!-- solution-start -->
#### 詳細解答
$\{U_i\}_{i\in I}$ を $f(K)$ の開被覆とする。連続性から $\{f^{-1}(U_i)\}_{i\in I}$ は $K$ の開集合族であり、$U_i$ が $f(K)$ を覆うのでその逆像は $K$ を覆う。$K$ のコンパクト性から有限個 $i_1,\ldots,i_m$ で
$$
K\subseteq\bigcup_{j=1}^m f^{-1}(U_{i_j}).
$$
$f$ を適用すれば
$$
f(K)\subseteq\bigcup_{j=1}^mU_{i_j}.
$$
従って有限部分被覆を持つ。

#### 本番答案
像の開被覆を逆像で $K$ の開被覆へ戻し、コンパクト性で有限化してから像へ戻す。
<!-- solution-end -->

### F0-00C1-B03 コンパクト空間の閉部分集合

- Level: B
- 目安時間: 12分

コンパクト空間 $X$ の閉部分集合 $F\subseteq X$ がコンパクトであることを示せ。

<!-- solution-start -->
#### 詳細解答
$\{U_i\}$ を部分空間 $F$ の開被覆とする。各 $U_i=F\cap V_i$ と $X$ の開集合 $V_i$ を使って書ける。$F$ は閉なので $X\setminus F$ は開。従って
$$
\{V_i\}\cup\{X\setminus F\}
$$
は $X$ の開被覆である。コンパクト性で有限部分被覆を取り、最後に $F$ と交差すれば $X\setminus F$ は消え、有限個の $U_i$ が $F$ を覆う。

#### 本番答案
$F$ の被覆を $X\setminus F$ を加えて $X$ の開被覆へ拡張し、有限部分被覆を取って $F$ に戻す。
<!-- solution-end -->

### F0-00C1-C01 無限部分集合は集積点を持つ

- Level: C
- 目安時間: 20分

コンパクト距離空間 $K$ の無限部分集合 $A\subseteq K$ は、ある点 $x\in K$ を持ち、$x$ の任意の開球が $A\setminus\{x\}$ と交わることを示せ。

<!-- solution-start -->
#### 詳細解答
$A$ から互いに異なる点を選んで点列 $(a_n)$ を作る。$K$ のコンパクト性から収束部分列 $a_{n_k}\to x\in K$ を取れる。

任意の $r>0$ に対して十分大きい $k$ で $a_{n_k}\in B(x,r)$。元の列の点は互いに異なるので、$a_{n_k}=x$ となる項があっても高々1個である。従ってさらに大きい $k$ を取れば
$$
a_{n_k}\in B(x,r)\cap(A\setminus\{x\}).
$$
よって任意の開球が $A\setminus\{x\}$ と交わる。

#### 本番答案
$A$ の相異なる点列からコンパクト性で収束部分列を取る。その極限 $x$ の任意の球には部分列の十分後の、$x$ と異なる項が入る。
<!-- solution-end -->
''',

'F0_00C2_コンパクト性の応用_最大最小_最近点': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00C2-A03 閉集合だけでは正距離を保証できない

- Level: A
- 目安時間: 10分

$\mathbb R^2$ で
$$
A=\{(x,0):x\ge1\},
\qquad
B=\{(x,1/x):x\ge1\}
$$
とする。$A\cap B=\varnothing$ だが $d(A,B)=0$ であることを示せ。

<!-- solution-start -->
#### 詳細解答
同じ $x\ge1$ を使った二点 $(x,0)\in A$, $(x,1/x)\in B$ の距離は $1/x$。従って
$$
0\le d(A,B)\le\frac1x
$$
が任意の $x\ge1$ で成り立つ。$x\to\infty$ とすれば右辺はいくらでも0へ近づくので $d(A,B)=0$。一方 $1/x>0$ なので二集合に共通点はない。

#### 本番答案
同じ $x$ の二点間距離が $1/x\to0$。従ってinfimumは0だが交点はない。
<!-- solution-end -->

### F0-00C2-A04 半直線への最近点

- Level: A
- 目安時間: 10分

$C=[0,\infty)\subset\mathbb R$ とし、点 $z=-3$ から $C$ への距離と最近点を求めよ。

<!-- solution-start -->
#### 詳細解答
$x\in C$ なら $x\ge0$ なので
$$
|x-(-3)|=x+3\ge3.
$$
$x=0$ で等号を取る。従って距離は3、最近点は0。

#### 本番答案
$$
\boxed{d(-3,C)=3},\qquad\boxed{x_*=0}.
$$
<!-- solution-end -->

### F0-00C2-B03 一方がコンパクトなら閉集合と正距離で離れる

- Level: B
- 目安時間: 16分

距離空間 $(X,d)$ で $K\subseteq X$ を空でないコンパクト集合、$F\subseteq X$ を閉集合とし $K\cap F=\varnothing$ とする。$d(K,F)>0$ を示せ。

<!-- solution-start -->
#### 詳細解答
各 $x\in K$ について $x\notin F$。$F$ は閉なので $X\setminus F$ は開であり、ある $r_x>0$ が存在して
$$
B(x,2r_x)\cap F=\varnothing
$$
とできる。$\{B(x,r_x):x\in K\}$ は $K$ の開被覆なので、コンパクト性から有限個 $x_1,\ldots,x_m$ で覆える。

$$
r=\min_j r_{x_j}>0
$$
とする。任意の $x\in K$ はある $B(x_j,r_{x_j})$ に入る。任意の $y\in F$ について、もし $d(x,y)<r$ なら
$$
d(x_j,y)\le d(x_j,x)+d(x,y)<r_{x_j}+r\le2r_{x_j},
$$
となり $y\in B(x_j,2r_{x_j})\cap F$ で矛盾。従って全ての $x\in K,y\in F$ で $d(x,y)\ge r$。よって $d(K,F)\ge r>0$。

#### 本番答案
各 $x\in K$ を $F$ から離す球を取り、$K$ のコンパクト性で有限個にする。有限個の半径の最小値から一様な正距離を得る。
<!-- solution-end -->
''',

'F0_00D_Cauchy列_完備性_無限次元': r'''
<!-- exercise-density-standard-supplement-20260912 -->

### F0-00D-A04 収束列からCauchy評価を再構成する

- Level: A
- 目安時間: 8分

$x_n\to x$ なら $(x_n)$ がCauchy列であることを、任意の $\varepsilon>0$ に対して $\varepsilon/2$ を用いて示せ。

<!-- solution-start -->
#### 詳細解答
任意の $\varepsilon>0$ を取る。収束より、ある $N$ が存在して $n\ge N$ なら
$$
d(x_n,x)<\varepsilon/2.
$$
従って $m,n\ge N$ なら
$$
d(x_m,x_n)
\le d(x_m,x)+d(x,x_n)
<\varepsilon.
$$
よってCauchy列。

#### 本番答案
極限 $x$ を中継して三角不等式を使い、両側を $\varepsilon/2$ にする。
<!-- solution-end -->

### F0-00D-B03 有限直積の完備性

- Level: B
- 目安時間: 15分

完備距離空間 $(X,d_X)$、$(Y,d_Y)$ の直積 $X\times Y$ に
$$
d((x,y),(x',y'))=\max\{d_X(x,x'),d_Y(y,y')\}
$$
を入れる。この距離について $X\times Y$ が完備であることを示せ。

<!-- solution-start -->
#### 詳細解答
$((x_n,y_n))$ を $X\times Y$ のCauchy列とする。任意の $\varepsilon>0$ に対し十分大きい $m,n$ で
$$
\max\{d_X(x_m,x_n),d_Y(y_m,y_n)\}<\varepsilon.
$$
従って各座標列 $(x_n)$、$(y_n)$ はそれぞれCauchy。完備性からある $x\in X,y\in Y$ が存在して
$$
x_n\to x,\qquad y_n\to y.
$$
すると
$$
d((x_n,y_n),(x,y))
=\max\{d_X(x_n,x),d_Y(y_n,y)\}\to0.
$$
よって直積は完備。

#### 本番答案
直積のCauchy列は各座標でCauchy。各空間の完備性で座標極限を取り、max距離で組の収束を確認する。
<!-- solution-end -->

### F0-00D-C01 完備性からCantor型の交点を得る

- Level: C
- 目安時間: 22分

完備距離空間 $(X,d)$ で、非空閉集合列
$$
F_1\supseteq F_2\supseteq\cdots
$$
が
$$
\operatorname{diam}(F_n):=\sup\{d(x,y):x,y\in F_n\}\to0
$$
を満たすとする。次を示せ。

1. $\bigcap_{n=1}^{\infty}F_n$ は非空。
2. その共通部分は一点だけからなる。

<!-- solution-start -->
#### 詳細解答
各 $n$ から $x_n\in F_n$ を取る。$m\ge n$ なら入れ子性から $x_m\in F_m\subseteq F_n$ であり、$x_n,x_m\in F_n$。従って
$$
d(x_n,x_m)\le\operatorname{diam}(F_n).
$$
直径が0へ行くので $(x_n)$ はCauchy。$X$ の完備性から $x_n\to x\in X$。

固定した $N$ に対して $n\ge N$ なら $x_n\in F_n\subseteq F_N$。$F_N$ は閉なので極限 $x\in F_N$。$N$ は任意だから
$$
x\in\bigcap_NF_N.
$$
従って共通部分は非空。

次に $x,y$ がともに全ての $F_n$ に属するとする。すると全ての $n$ で
$$
d(x,y)\le\operatorname{diam}(F_n).
$$
右辺が0へ収束するため $d(x,y)=0$、従って $x=y$。よって共通部分は一点。

#### 本番答案
$x_n\in F_n$ を取り、入れ子性と直径→0からCauchy。完備性で極限 $x$ を得て、各 $F_N$ の閉性で $x\in F_N$。一意性は $d(x,y)\le\operatorname{diam}(F_n)\to0$。
<!-- solution-end -->
''',
}

# Insert the block just before the existing next-step heading in each file.
NEXT_HEADINGS = {
'F0_00A_集合_写像_上限下限': '## 10. 次に進む',
'F0_00A1_上界_下界_supremum_infimum': '## 5. 次に進む',
'F0_00A1B_実数の上限性質_Archimedes性': '## 6. 次に進む',
'F0_00A1C_集合族_添字集合_べき集合': '## 7. 次に進む',
'F0_00A1D_順序_全順序_最小最大_整列': '## 9. 次に進む',
'F0_00A2_選択公理_Zorn_極大原理': '## 10. 次に進む',
'F0_00A3_半順序_Zorn_極大延長': '## 10. 次に進む',
'F0_00B0_点列_部分列_十分大きい添字': '## 8. 次に進む',
'F0_00B1_位相空間_近傍_部分空間_収束': '## 11. 章末チェック',
'F0_00C_連続写像_コンパクト性_最大最小': '## 4. 次に進む',
'F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel': '## 7. 次に進む',
'F0_00C2_コンパクト性の応用_最大最小_最近点': '## 6. 次に進む',
'F0_00D_Cauchy列_完備性_無限次元': '## 9. 次に進む',
}

base = ROOT / 'textbook/volumes/00_foundations'
for dirname, block in DATA.items():
    p = base / dirname / 'index.md'
    text = p.read_text(encoding='utf-8')
    if MARK2 in text:
        print('skip', dirname)
        continue
    anchor = NEXT_HEADINGS[dirname]
    if anchor not in text:
        raise SystemExit(f'anchor missing: {dirname}: {anchor}')
    text = text.replace(anchor, dedent(block).strip() + '\n\n---\n\n' + anchor, 1)
    p.write_text(text, encoding='utf-8')
    print('patched', dirname)
