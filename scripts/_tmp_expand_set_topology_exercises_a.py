from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parents[1]
MARK = "<!-- exercise-density-supplement-20260912 -->"

SUPPLEMENTS = {
"textbook/volumes/00_foundations/F0_00A_集合_写像_上限下限/index.md": ("## 10. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A-A02 像と逆像の違いを計算する

- Level: A
- 目安時間: 8分

$f:\mathbb R\to\mathbb R$, $f(x)=x^2$、$A=[-2,1]$、$B=[1,4]$ とする。$f(A)$ と $f^{-1}(B)$ を求め、像と逆像で出発する集合がどちら側にあるか説明せよ。

<!-- solution-start -->
#### 詳細解答
$A$ は定義域側の集合なので、その各点を $f$ で送ると
$$
f(A)=[0,4].
$$
一方 $B$ は終域側の集合であり、逆像は $1\le x^2\le4$ を満たす入力全体だから
$$
f^{-1}(B)=[-2,-1]\cup[1,2].
$$
像は「入力側の集合を前へ送る」、逆像は「出力側の条件を満たす入力を集める」操作である。

#### 本番答案
$$
\boxed{f(A)=[0,4]},\qquad
\boxed{f^{-1}(B)=[-2,-1]\cup[1,2]}.
$$
像は定義域側から、逆像は終域側から出発する。
<!-- solution-end -->

### F0-00A-A03 量化記号の否定

- Level: A
- 目安時間: 8分

命題
$$
\forall x\in\mathbb R\ \exists y\in\mathbb R:\ y>x
$$
を日本語で読み、その否定を量化記号で書け。

<!-- solution-start -->
#### 詳細解答
元の命題は「任意の実数 $x$ に対して、それより大きい実数 $y$ が存在する」である。否定では $\forall$ と $\exists$ が入れ替わり、最後の条件も否定されるので
$$
\exists x\in\mathbb R\ \forall y\in\mathbb R:\ y\le x.
$$
これは「最大の実数が存在する」という主張であり、元の命題の否定になっている。

#### 本番答案
$$
\boxed{\exists x\in\mathbb R\ \forall y\in\mathbb R:\ y\le x}.
$$
<!-- solution-end -->

### F0-00A-B02 逆像は集合演算を保つ

- Level: B
- 目安時間: 12分

写像 $f:X\to Y$ と $B,C\subseteq Y$ に対して
$$
f^{-1}(B\cap C)=f^{-1}(B)\cap f^{-1}(C)
$$
を、両包含を示して証明せよ。

<!-- solution-start -->
#### 詳細解答
$x\in f^{-1}(B\cap C)$ とする。逆像の定義から $f(x)\in B\cap C$、すなわち $f(x)\in B$ かつ $f(x)\in C$ である。よって $x\in f^{-1}(B)$ かつ $x\in f^{-1}(C)$ なので
$$
f^{-1}(B\cap C)\subseteq f^{-1}(B)\cap f^{-1}(C).
$$
逆に $x\in f^{-1}(B)\cap f^{-1}(C)$ なら $f(x)\in B$ かつ $f(x)\in C$ だから $f(x)\in B\cap C$。従って $x\in f^{-1}(B\cap C)$ である。

#### 本番答案
任意の $x\in X$ について
$$
x\in f^{-1}(B\cap C)
\iff f(x)\in B\cap C
\iff x\in f^{-1}(B)\cap f^{-1}(C).
$$
よって両集合は等しい。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00A1_上界_下界_supremum_infimum/index.md": ("## 5. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A1-A02 開区間の上限・下限

- Level: A
- 目安時間: 7分

$A=(-3,5)$ について $\sup A,\inf A,\max A,\min A$ を求めよ。

<!-- solution-start -->
#### 詳細解答
5は $A$ の上界であり、5より小さい数 $M<5$ は $M$ と5の間の点を $A$ に持つので上界ではない。従って $\sup A=5$。同様に $\inf A=-3$。ただし端点 $-3,5$ は $A$ に含まれないので最大元・最小元は存在しない。

#### 本番答案
$$
\boxed{\sup A=5,\quad \inf A=-3},
$$
$\max A,\min A$ はともに存在しない。
<!-- solution-end -->

### F0-00A1-A03 値域の上限を求める

- Level: A
- 目安時間: 8分

$A=[-2,3]$ とし $B=\{2x+1:x\in A\}$ とする。$\sup B,\inf B$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$x\in[-2,3]$ なら
$$
-3\le2x+1\le7.
$$
端点 $x=-2,3$ が集合に含まれるので両端値は実際に達成される。従って
$$
\inf B=-3,\qquad \sup B=7.
$$

#### 本番答案
$$
\boxed{\inf B=-3,\quad\sup B=7}.
$$
<!-- solution-end -->

### F0-00A1-B02 平行移動とsupremum

- Level: B
- 目安時間: 12分

空でなく上に有界な $A\subseteq\mathbb R$ と $c\in\mathbb R$ に対し
$$
A+c:=\{a+c:a\in A\}
$$
と置く。$\sup(A+c)=\sup A+c$ を上限の定義から示せ。

<!-- solution-start -->
#### 詳細解答
$s=\sup A$ とする。任意の $a\in A$ について $a\le s$ だから $a+c\le s+c$。従って $s+c$ は $A+c$ の上界である。

次に $u<s+c$ とする。すると $u-c<s$。$s$ は最小上界なので $u-c$ は $A$ の上界ではない。従ってある $a\in A$ が存在して
$$
u-c<a,
$$
すなわち $u<a+c$。よって $u$ は $A+c$ の上界ではない。従って $s+c$ が最小上界である。

#### 本番答案
$s=\sup A$ と置く。$a\le s$ より $a+c\le s+c$ なので $s+c$ は上界。さらに $u<s+c$ なら $u-c<s$ だから、ある $a\in A$ で $u-c<a$、従って $u<a+c$。よって $u$ は上界でない。ゆえに
$$
\boxed{\sup(A+c)=\sup A+c}.
$$
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00A1B_実数の上限性質_Archimedes性/index.md": ("## 6. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A1B-A02 $n\varepsilon$ を任意に大きくする

- Level: A
- 目安時間: 7分

$\varepsilon>0$、$M>0$ とする。Archimedes性を用いて、ある $N\in\mathbb N$ が存在し
$$
N\varepsilon>M
$$
となることを示せ。

<!-- solution-start -->
#### 詳細解答
$M/\varepsilon$ は実数である。Archimedes性から
$$
N>\frac{M}{\varepsilon}
$$
となる自然数 $N$ が存在する。$\varepsilon>0$ を掛ければ $N\varepsilon>M$ となる。

#### 本番答案
Archimedes性を $M/\varepsilon$ に適用して $N>M/\varepsilon$ を取ればよい。
<!-- solution-end -->

### F0-00A1B-A03 $1/n$ の尾部を誤差内に入れる

- Level: A
- 目安時間: 7分

任意の $\varepsilon>0$ に対して、十分大きい全ての $n$ で
$$
\frac1n<\varepsilon
$$
となることを量化記号を省略せず示せ。

<!-- solution-start -->
#### 詳細解答
Archimedes性から $N>1/\varepsilon$ となる自然数 $N$ を取れる。$n\ge N$ なら
$$
n\ge N>\frac1\varepsilon.
$$
正数の逆数を取ると
$$
0<\frac1n\le\frac1N<\varepsilon.
$$
従って
$$
\forall\varepsilon>0\ \exists N\in\mathbb N\ \forall n\ge N:\ \frac1n<\varepsilon.
$$

#### 本番答案
$N>1/\varepsilon$ を取る。$n\ge N$ なら $1/n\le1/N<\varepsilon$。
<!-- solution-end -->

### F0-00A1B-B01 自然数全体は上に有界でない

- Level: B
- 目安時間: 10分

実数の上限性質を仮定し、$\mathbb N$ が上に有界であると仮定すると矛盾することを、$s=\sup\mathbb N$ を使って再構成せよ。

<!-- solution-start -->
#### 詳細解答
$\mathbb N$ が上に有界なら上限性質により $s=\sup\mathbb N$ が存在する。$s-1<s$ なので $s-1$ は最小上界 $s$ より小さく、上界ではない。従ってある $n\in\mathbb N$ が $n>s-1$ を満たす。すると $n+1>s$ だが $n+1\in\mathbb N$ であり、$s$ が上界であることに反する。

#### 本番答案
$s=\sup\mathbb N$ とすると $s-1$ は上界でないため $n>s-1$ となる $n\in\mathbb N$ がある。よって $n+1>s$。しかし $n+1\in\mathbb N$ なので矛盾。
<!-- solution-end -->

### F0-00A1B-B02 下限版の存在保証

- Level: B
- 目安時間: 12分

実数の上限性質を用いて、空でなく下に有界な $A\subseteq\mathbb R$ には $\inf A$ が存在することを示せ。$-A:=\{-a:a\in A\}$ を使ってよい。

<!-- solution-start -->
#### 詳細解答
$A$ が下に有界なら、ある $m$ が全ての $a\in A$ に対して $m\le a$ を満たす。従って $-a\le-m$ なので $-A$ は上に有界であり、空でもない。上限性質から
$$
s=\sup(-A)
$$
が存在する。

$-s$ は $A$ の下界である。実際 $-a\le s$ から $a\ge-s$。さらに $\ell>-s$ なら $-\ell<s$ なので $-\ell$ は $-A$ の上界ではない。よってある $a\in A$ で $-a>-\ell$、すなわち $a<\ell$。従って $\ell$ は下界ではない。よって $-s$ が最大の下界である。

#### 本番答案
$-A$ は空でなく上に有界なので $s=\sup(-A)$ が存在する。すると $-s$ は $A$ の下界で、これより大きい数は下界になれない。従って
$$
\boxed{\inf A=-\sup(-A)}.
$$
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00A1C_集合族_添字集合_べき集合/index.md": ("## 7. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A1C-A02 同じ集合が複数の添字を持つ

- Level: A
- 目安時間: 6分

$I=\{1,2,3\}$、$A_1=A_3=\{0\}$、$A_2=\{1\}$ とする。添字付き集合族としては何個の場所を持つか。また $\{A_i:i\in I\}$ を通常の集合族として重複を除いて書け。

<!-- solution-start -->
#### 詳細解答
添字付き集合族は $1,2,3$ の三つの添字を持つので三つの場所を持つ。一方、値として現れる集合だけを通常の集合として集めると重複は消え
$$
\{A_i:i\in I\}=\bigl\{\{0\},\{1\}\bigr\}.
$$

#### 本番答案
添字は3個。通常の集合族としては
$$
\boxed{\{\{0\},\{1\}\}}.
$$
<!-- solution-end -->

### F0-00A1C-A03 任意和・任意交差を量化記号で読む

- Level: A
- 目安時間: 7分

添字付き集合族 $\{A_i\}_{i\in I}$ について、
$$
x\in\bigcup_{i\in I}A_i,
\qquad
x\in\bigcap_{i\in I}A_i
$$
をそれぞれ $\exists,\forall$ を使って書き換えよ。

<!-- solution-start -->
#### 詳細解答
任意和は「少なくとも一つの集合に入る」、任意交差は「全ての集合に入る」なので
$$
x\in\bigcup_{i\in I}A_i
\iff
\exists i\in I:\ x\in A_i,
$$
$$
x\in\bigcap_{i\in I}A_i
\iff
\forall i\in I:\ x\in A_i.
$$

#### 本番答案
上式の通り。任意和は $\exists$、任意交差は $\forall$ に対応する。
<!-- solution-end -->

### F0-00A1C-B01 任意和と共通部分の分配法則

- Level: B
- 目安時間: 12分

集合 $B$ と添字付き集合族 $\{A_i\}_{i\in I}$ に対して
$$
B\cap\left(\bigcup_{i\in I}A_i\right)
=
\bigcup_{i\in I}(B\cap A_i)
$$
を要素による同値変形で証明せよ。

<!-- solution-start -->
#### 詳細解答
任意の $x$ について
$$
\begin{aligned}
x\in B\cap\bigcup_iA_i
&\iff x\in B\ \text{かつ}\ \exists i:\ x\in A_i\\
&\iff \exists i:\ (x\in B\ \text{かつ}\ x\in A_i)\\
&\iff \exists i:\ x\in B\cap A_i\\
&\iff x\in\bigcup_i(B\cap A_i).
\end{aligned}
$$
従って両集合は等しい。

#### 本番答案
任意の $x$ に対して上の所属条件が同値なので等しい。
<!-- solution-end -->

### F0-00A1C-B02 任意族のDe Morgan則

- Level: B
- 目安時間: 12分

全体集合 $X$ の部分集合族 $\{A_i\}_{i\in I}$ に対して
$$
X\setminus\bigcup_{i\in I}A_i
=
\bigcap_{i\in I}(X\setminus A_i)
$$
を証明せよ。

<!-- solution-start -->
#### 詳細解答
任意の $x\in X$ について
$$
\begin{aligned}
x\notin\bigcup_iA_i
&\iff \neg(\exists i:\ x\in A_i)\\
&\iff \forall i:\ x\notin A_i\\
&\iff x\in\bigcap_i(X\setminus A_i).
\end{aligned}
$$
量化記号の否定 $\neg\exists=\forall\neg$ が核心である。

#### 本番答案
所属条件を量化記号に直すと
$$
x\notin\bigcup_iA_i
\iff \forall i,\ x\notin A_i,
$$
よって主張が従う。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00A1D_順序_全順序_最小最大_整列/index.md": ("## 9. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A1D-A02 包含関係は全順序か

- Level: A
- 目安時間: 7分

$X=\{1,2\}$ とし $\mathcal P(X)$ を包含関係 $\subseteq$ で順序付ける。これは半順序か、全順序かを判定せよ。

<!-- solution-start -->
#### 詳細解答
包含関係は反射律・反対称律・推移律を満たすので半順序である。しかし $\{1\}$ と $\{2\}$ は
$$
\{1\}\nsubseteq\{2\},\qquad \{2\}\nsubseteq\{1\}
$$
で比較不能なので全順序ではない。

#### 本番答案
半順序だが全順序ではない。反例は $\{1\},\{2\}$。
<!-- solution-end -->

### F0-00A1D-A03 整列の部分集合

- Level: A
- 目安時間: 7分

$\mathbb N$ の通常順序を考える。$A=\{2,4,6,\ldots\}$ と $B=\{n\in\mathbb N:n\ge100\}$ の最小元を求めよ。また、この例が整列の定義とどう対応するか述べよ。

<!-- solution-start -->
#### 詳細解答
$A$ の最小元は2、$B$ の最小元は100である。整列とは、特定の部分集合だけでなく **任意の非空部分集合** が最小元を持つことを要求する。これらはその具体例である。

#### 本番答案
$$
\min A=2,\qquad \min B=100.
$$
整列では任意の非空部分集合について同様の最小元の存在を要求する。
<!-- solution-end -->

### F0-00A1D-B01 整列を部分集合へ制限する

- Level: B
- 目安時間: 10分

$(X,\preceq)$ が整列集合で、$A\subseteq X$ とする。$\preceq$ を $A$ に制限した順序も $A$ の整列になることを示せ。

<!-- solution-start -->
#### 詳細解答
整列順序の制限は反射律・反対称律・推移律・比較可能性をそのまま保つので $A$ 上の全順序である。次に任意の非空部分集合 $B\subseteq A$ を取る。$B$ は同時に $X$ の非空部分集合でもあるから、$X$ の整列性により $B$ は最小元 $b_0$ を持つ。$b_0\in B\subseteq A$ であり、制限順序でも全ての $b\in B$ に $b_0\preceq b$。従って $A$ は整列される。

#### 本番答案
任意の非空 $B\subseteq A$ は $X$ の非空部分集合でもあるので、$X$ の整列性から最小元を持つ。よって制限順序は $A$ の整列である。
<!-- solution-end -->

### F0-00A1D-B02 $\mathbb Z$ を具体的に整列する

- Level: B
- 目安時間: 12分

$\mathbb Z$ を
$$
0\prec1\prec-1\prec2\prec-2\prec3\prec-3\prec\cdots
$$
の順に並べる。この順序が整列になる理由を、$\mathbb N$ への順位写像を使って説明せよ。

<!-- solution-start -->
#### 詳細解答
各整数に順位
$$
r(0)=0,\qquad r(n)=2n-1\ (n>0),\qquad r(-n)=2n\ (n>0)
$$
を割り当てる。これは $\mathbb Z$ から $\mathbb N\cup\{0\}$ への全単射であり、$a\prec b$ を $r(a)<r(b)$ で定めたものが上の順序である。

任意の非空 $A\subseteq\mathbb Z$ に対し $r(A)$ は自然数の非空部分集合なので最小元 $m$ を持つ。$r(a_0)=m$ となる $a_0\in A$ が $A$ の最小元である。従ってこの順序は整列である。

#### 本番答案
上の順位写像 $r$ で通常の自然数順序を $\mathbb Z$ へ移す。非空部分集合の順位集合 $r(A)$ は最小元を持つので、対応する整数が $A$ の最小元となる。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00A2_選択公理_Zorn_極大原理/index.md": ("## 10. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A2-A02 明示できる選択関数

- Level: A
- 目安時間: 7分

$A_n=[n,n+1]\subset\mathbb R$ $(n\in\mathbb N)$ に対して選択関数を一つ明示し、この構成では選択公理に頼る必要がない理由を述べよ。

<!-- solution-start -->
#### 詳細解答
例えば
$$
f(n)=n
$$
と置けば $n\in[n,n+1]=A_n$ なので選択関数である。全ての添字に対して同じ明示的規則で選択できているため、単なる非空性から存在を保証する選択公理を持ち出す必要はない。

#### 本番答案
$$
\boxed{f(n)=n}.
$$
明示的な規則があるためACによる存在保証は不要。
<!-- solution-end -->

### F0-00A2-A03 有限選択と可算選択

- Level: A
- 目安時間: 8分

非空集合 $A_1,\ldots,A_m$ から各1点を選ぶ主張と、非空集合列 $(A_n)_{n\in\mathbb N}$ から各1点を選ぶ主張の違いを説明せよ。

<!-- solution-start -->
#### 詳細解答
有限個の場合は、一つの非空集合から一点を取る操作を有限回繰り返せばよく、完全な選択公理を仮定する必要はない。一方、可算無限個の集合から一斉に選択関数を得る主張は可算選択公理であり、有限選択より強い存在主張である。

#### 本番答案
有限族では有限回の選択で足りる。可算無限族に対する一斉選択は可算選択公理という別の原理である。
<!-- solution-end -->

### F0-00A2-B02 「選び方がある」と「存在だけ分かる」を区別する

- Level: B
- 目安時間: 10分

各 $i\in I$ について $A_i\ne\varnothing$ とだけ分かっている場合と、各 $i$ に対して具体的な元 $a_i\in A_i$ を与える規則 $i\mapsto a_i$ が既に定義されている場合を比較し、どちらで選択公理が問題になるか説明せよ。

<!-- solution-start -->
#### 詳細解答
規則 $i\mapsto a_i$ が既に定義されていれば、それ自身が選択関数であり、存在を追加の公理で保証する必要はない。問題になるのは、全ての $A_i$ が非空だという局所的存在しかなく、それらを同時に選ぶ一つの関数が明示されていない場合である。選択公理はこの局所的非空性から全体の選択関数の存在を保証する。

#### 本番答案
具体的規則があればその規則が選択関数。ACが必要になるのは「各集合は非空」という情報だけから、全添字で同時に選ぶ関数の存在を主張するときである。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md": ("## 10. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00A3-A02 chainかどうかを判定する

- Level: A
- 目安時間: 7分

$P=\mathcal P(\{1,2,3\})$ を包含関係で順序付ける。次の部分集合族がchainか判定せよ。

1. $\{\varnothing,\{1\},\{1,2\},\{1,2,3\}\}$
2. $\{\{1\},\{2\},\{1,2\}\}$

<!-- solution-start -->
#### 詳細解答
1では任意の二集合が包含関係で比較できるのでchainである。2では $\{1\}$ と $\{2\}$ が比較不能なのでchainではない。

#### 本番答案
1はchain、2はchainでない。2の反例は $\{1\},\{2\}$。
<!-- solution-end -->

### F0-00A3-A03 上界はchainの要素でなくてもよい

- Level: A
- 目安時間: 7分

$P=\mathcal P(\{1,2,3\})$、$C=\{\varnothing,\{1\}\}$ とする。$C$ の上界を全て挙げよ。また、そのうち $C$ 自身に属さないものを示せ。

<!-- solution-start -->
#### 詳細解答
上界 $U$ は $\varnothing\subseteq U$ かつ $\{1\}\subseteq U$ を満たせばよい。従って
$$
\{1\},\ \{1,2\},\ \{1,3\},\ \{1,2,3\}
$$
が全ての上界である。このうち $C$ に属するのは $\{1\}$ だけで、残り三つは $C$ の外にある。

#### 本番答案
上界は上の4集合。上界は $C$ の要素である必要はない。
<!-- solution-end -->

### F0-00A3-B02 部分写像の極大延長

- Level: B
- 目安時間: 15分

集合 $X,Y$ と部分集合 $D_0\subseteq X$、写像 $f_0:D_0\to Y$ を固定する。$f_0$ を延長する部分写像 $(D,f)$ 全体を、定義域と値が一致する延長関係で順序付ける。chainの合併が上界になることを示せ。

<!-- solution-start -->
#### 詳細解答
chain $\mathcal C$ に対し
$$
D_*:=\bigcup_{(D,f)\in\mathcal C}D,
\qquad
f_*:=\bigcup_{(D,f)\in\mathcal C}f
$$
と置く。問題は $f_*$ が一価な写像になることだけである。同じ $x\in D_*$ を含む二つの候補 $(D_1,f_1),(D_2,f_2)$ を取ると、chain性から一方が他方を延長する。従って共通定義域で値は一致し $f_1(x)=f_2(x)$。よって $f_*$ はwell-definedで、各chain要素を延長するため上界である。

#### 本番答案
定義域とグラフを合併する。chain内の任意の二候補は比較可能なので共通定義域で値が一致し、合併は写像になる。したがってchainの上界である。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00B0_点列_部分列_十分大きい添字/index.md": ("## 8. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00B0-A02 eventually と infinitely often

- Level: A
- 目安時間: 7分

$x_n=(-1)^n$ とする。命題 $P(n): x_n=1$ は「十分大きい $n$ で成り立つ」か、「無限回起こる」かを判定せよ。

<!-- solution-start -->
#### 詳細解答
$x_n=1$ は偶数 $n$ で起こるので、どの $N$ より後にも偶数があり、無限回起こる。一方、任意の $N$ より後にも奇数があり、そのとき $x_n=-1$ なので、ある番号以降ずっと $x_n=1$ になることはない。従ってeventuallyではない。

#### 本番答案
「無限回起こる」は真、「十分大きい $n$ で成り立つ」は偽。
<!-- solution-end -->

### F0-00B0-A03 無限回起こる値から部分列を作る

- Level: A
- 目安時間: 8分

点列 $(x_n)$ で値 $a$ が無限回現れるとする。$x_{n_k}=a$ となる部分列を構成できることを示せ。

<!-- solution-start -->
#### 詳細解答
$a$ が現れる添字集合
$$
I=\{n\in\mathbb N:x_n=a\}
$$
は無限である。$n_1$ を $I$ の最小元とし、$n_k$ まで取ったら、$I$ は無限なので $n_k$ より大きい元が存在し、その最小のものを $n_{k+1}$ とする。こうして
$$
n_1<n_2<\cdots,
\qquad x_{n_k}=a
$$
を得る。

#### 本番答案
$a$ が現れる添字を小さい順に $n_1<n_2<\cdots$ と並べれば $x_{n_k}=a$ の定数部分列になる。
<!-- solution-end -->

### F0-00B0-B01 eventuallyな性質は部分列にも残る

- Level: B
- 目安時間: 10分

命題 $P(n)$ が十分大きい $n$ で成り立つとする。任意の部分列添字 $n_1<n_2<\cdots$ に対して、$P(n_k)$ が十分大きい $k$ で成り立つことを示せ。

<!-- solution-start -->
#### 詳細解答
ある $N$ が存在して $n\ge N$ なら $P(n)$ が成り立つ。部分列添字は狭義増加なので $n_k\ge k$。従って $k\ge N$ なら $n_k\ge k\ge N$ であり、$P(n_k)$ が成り立つ。

#### 本番答案
$P(n)$ が $n\ge N$ で成り立つとする。$n_k\ge k$ なので $k\ge N$ なら $n_k\ge N$。よって $P(n_k)$ が成り立つ。
<!-- solution-end -->

### F0-00B0-B02 有限値点列は定数部分列を持つ

- Level: B
- 目安時間: 12分

点列 $(x_n)$ の値が有限集合 $\{a_1,\ldots,a_m\}$ にしか入らないとする。少なくとも一つの値が無限回現れ、定数部分列を持つことを証明せよ。

<!-- solution-start -->
#### 詳細解答
全ての $a_j$ が有限回しか現れないと仮定する。各出現回数は有限で、値の種類も有限個なので、点列全体で現れる項数は有限個の有限和となり有限になってしまう。しかし点列は自然数全体で添字付けられ無限個の項を持つ。矛盾である。

従ってある $a_j$ は無限回現れる。前問のようにその出現添字を増加順に選べば $x_{n_k}=a_j$ の定数部分列を得る。

#### 本番答案
有限個の値が全て有限回しか現れないなら総項数も有限になり矛盾。従ってある値が無限回現れ、その出現添字を取れば定数部分列になる。
<!-- solution-end -->

---
'''),
}

for rel, (before, block) in SUPPLEMENTS.items():
    path = ROOT / rel
    text = path.read_text(encoding="utf-8")
    if MARK in text:
        print(f"skip already patched: {rel}")
        continue
    if before not in text:
        raise RuntimeError(f"anchor not found in {rel}: {before}")
    text = text.replace(before, dedent(block).strip() + "\n\n" + before, 1)
    path.write_text(text, encoding="utf-8")
    print(f"patched {rel}")
