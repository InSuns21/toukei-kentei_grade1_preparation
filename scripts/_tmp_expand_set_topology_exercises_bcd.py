from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parents[1]
MARK = "<!-- exercise-density-supplement-20260912 -->"

SUPPLEMENTS = {
"textbook/volumes/00_foundations/F0_00B1_位相空間_近傍_部分空間_収束/index.md": ("## 10. 章末チェック", r'''
<!-- exercise-density-supplement-20260912 -->

## 10. 演習

### F0-00B1-A01 有限集合上の位相を判定する

- Level: A
- 目安時間: 8分

$X=\{a,b\}$ とする。次の集合族が $X$ 上の位相か判定せよ。

1. $\tau_1=\{\varnothing,X\}$
2. $\tau_2=\{\varnothing,\{a\},X\}$
3. $\tau_3=\{\varnothing,\{a\},\{b\}\}$

<!-- solution-start -->
#### 詳細解答
$\tau_1$ は密着位相であり位相である。$\tau_2$ も $\varnothing,X$ を含み、任意和・有限交差を取っても三つの集合のどれかに戻るので位相である。

$\tau_3$ は $X$ 自身を含まないため、位相の第1公理を満たさない。従って位相ではない。

#### 本番答案
$$
\boxed{\tau_1,\tau_2\text{ は位相},\qquad \tau_3\text{ は位相でない}}.
$$
$\tau_3$ は $X\notin\tau_3$ が理由。
<!-- solution-end -->

### F0-00B1-A02 部分空間で開になる集合

- Level: A
- 目安時間: 8分

$A=[0,2]\subset\mathbb R$ に通常位相から部分空間位相を入れる。次の集合が $A$ で開か判定し、開なら $A\cap U$ の形に書け。

1. $[0,1)$
2. $(0,1)$
3. $[0,1]$

<!-- solution-start -->
#### 詳細解答
1は
$$
[0,1)=A\cap(-1,1)
$$
なので $A$ で開。2は $\mathbb R$ でも開なので
$$
(0,1)=A\cap(0,1)
$$
で開。3は0を含むが、0の $A$ におけるどの十分小さな近傍も1以下に収まるとしても、点1の周囲では1より大きい点が $A$ 内に現れるため $[0,1]$ は $A$ で開ではない。

#### 本番答案
1,2は開、3は開でない。
<!-- solution-end -->

### F0-00B1-A03 離散位相と密着位相の収束

- Level: A
- 目安時間: 10分

集合 $X$ 上の点列 $(x_n)$ を考える。

1. 離散位相では、$x_n\to x$ なら十分大きい $n$ で $x_n=x$ となることを示せ。
2. 密着位相 $\{\varnothing,X\}$ では、任意の点列が任意の点 $x\in X$ に収束することを示せ。

<!-- solution-start -->
#### 詳細解答
離散位相では $\{x\}$ 自身が $x$ の開近傍である。収束の定義をこの近傍に適用すると、ある $N$ 以降で $x_n\in\{x\}$、すなわち $x_n=x$ となる。

密着位相では任意の点 $x$ の近傍は $X$ しかない。全ての $n$ で $x_n\in X$ なので、収束条件は自動的に満たされる。

#### 本番答案
離散位相では収束列は最終的に定数。密着位相では全ての点列が全ての点へ収束する。
<!-- solution-end -->

### F0-00B1-A04 Hausdorff性が極限を一意にする

- Level: A
- 目安時間: 9分

Hausdorff空間 $X$ で点列 $(x_n)$ が $x$ と $y$ の両方へ収束するとする。$x\ne y$ と仮定して矛盾を導け。

<!-- solution-start -->
#### 詳細解答
$x\ne y$ ならHausdorff性から互いに素な開集合 $U,V$ を
$$
x\in U,\qquad y\in V,\qquad U\cap V=\varnothing
$$
となるように取れる。$x_n\to x$ より十分大きい $n$ で $x_n\in U$、$x_n\to y$ より十分大きい $n$ で $x_n\in V$。両方の「十分大きい」を同時に満たす $n$ では $x_n\in U\cap V$ となり矛盾する。

#### 本番答案
互いに素な近傍 $U,V$ を取り、十分後の $x_n$ が両方に入る矛盾を得る。従って $x=y$。
<!-- solution-end -->

### F0-00B1-B01 二つの位相と収束のしやすさ

- Level: B
- 目安時間: 12分

同じ集合 $X$ 上の二つの位相 $\tau_1\subseteq\tau_2$ を考える。$\tau_2$ で $x_n\to x$ なら $\tau_1$ でも $x_n\to x$ であることを示せ。逆が一般に成り立たない例も挙げよ。

<!-- solution-start -->
#### 詳細解答
$\tau_1$ の任意の $x$ の近傍 $N$ を取る。ある $U\in\tau_1$ が $x\in U\subseteq N$ を満たす。$\tau_1\subseteq\tau_2$ なので $U$ は $\tau_2$ でも開である。$\tau_2$ での収束から十分大きい $n$ で $x_n\in U\subseteq N$。従って $\tau_1$ でも収束する。

逆の反例は、$X$ に密着位相 $\tau_1$ と離散位相 $\tau_2$ を入れればよい。密着位相では任意の点列が任意点へ収束するが、離散位相では最終的にその点と一致しなければ収束しない。

#### 本番答案
細かい位相での収束は粗い位相での収束を含意する。逆は密着位相と離散位相で失敗する。
<!-- solution-end -->

### F0-00B1-B02 連続性を開集合の逆像から確認する

- Level: B
- 目安時間: 12分

$X$ を任意の位相空間、$Y$ を離散位相空間とする。写像 $f:X\to Y$ が連続であるための必要十分条件が、各 $y\in Y$ についてファイバー $f^{-1}(\{y\})$ が $X$ で開であることだと示せ。

<!-- solution-start -->
#### 詳細解答
$Y$ は離散位相なので一点集合 $\{y\}$ は全て開である。$f$ が連続なら、その逆像 $f^{-1}(\{y\})$ は開になる。

逆に全てのファイバーが開だとする。任意の開集合 $V\subseteq Y$ は離散位相では単なる部分集合であり
$$
V=\bigcup_{y\in V}\{y\}.
$$
従って
$$
f^{-1}(V)
=\bigcup_{y\in V}f^{-1}(\{y\}),
$$
右辺は開集合の任意和なので開。よって $f$ は連続である。

#### 本番答案
離散位相では任意の開集合が一点集合の和。したがって一点ファイバーが全て開であることと、全ての開集合の逆像が開であることが同値。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md": ("## 4. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00C-A02 $\varepsilon$--$\delta$ で一次関数の連続性を示す

- Level: A
- 目安時間: 8分

$f:\mathbb R\to\mathbb R$, $f(x)=3x+1$ が任意の $x_0\in\mathbb R$ で連続であることを $\varepsilon$--$\delta$ 定義から示せ。

<!-- solution-start -->
#### 詳細解答
任意の $\varepsilon>0$ に対し $\delta=\varepsilon/3$ と取る。$|x-x_0|<\delta$ なら
$$
|f(x)-f(x_0)|
=|3x+1-(3x_0+1)|
=3|x-x_0|
<3\delta
=\varepsilon.
$$
従って $f$ は $x_0$ で連続である。$x_0$ は任意なので全域で連続。

#### 本番答案
$\delta=\varepsilon/3$ と取れば
$$
|f(x)-f(x_0)|=3|x-x_0|<\varepsilon.
$$
<!-- solution-end -->

### F0-00C-A03 点列で不連続性を検出する

- Level: A
- 目安時間: 8分

$$
f(x)=\begin{cases}
0,&x<0,\\
1,&x\ge0
\end{cases}
$$
が $x=0$ で連続でないことを、適切な点列を一つ作って示せ。

<!-- solution-start -->
#### 詳細解答
$x_n=-1/n$ と置けば $x_n\to0$ である。しかし全ての $n$ で $x_n<0$ なので
$$
f(x_n)=0,
$$
一方 $f(0)=1$。従って $f(x_n)$ は $f(0)$ に収束しない。距離空間における連続性の点列特徴付けから $f$ は0で不連続である。

#### 本番答案
$x_n=-1/n\to0$ だが $f(x_n)=0\not\to1=f(0)$。よって不連続。
<!-- solution-end -->

### F0-00C-B02 連続写像の合成

- Level: B
- 目安時間: 12分

位相空間 $X,Y,Z$ と連続写像 $f:X\to Y$, $g:Y\to Z$ に対し、$g\circ f:X\to Z$ が連続であることを開集合の逆像から示せ。

<!-- solution-start -->
#### 詳細解答
$U\subseteq Z$ を任意の開集合とする。$g$ の連続性から $g^{-1}(U)$ は $Y$ で開。さらに $f$ の連続性から
$$
f^{-1}(g^{-1}(U))
$$
は $X$ で開である。一方
$$
(g\circ f)^{-1}(U)=f^{-1}(g^{-1}(U)).
$$
従って任意の開集合の逆像が開であり、$g\circ f$ は連続。

#### 本番答案
$$
(g\circ f)^{-1}(U)=f^{-1}(g^{-1}(U))
$$
で、右辺は連続性を二回使えば開。従って合成も連続。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md": ("## 7. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00C1-A02 開被覆で非コンパクト性を示す

- Level: A
- 目安時間: 9分

通常の位相を入れた $[0,\infty)$ がコンパクトでないことを、有限部分被覆を持たない開被覆を一つ構成して示せ。

<!-- solution-start -->
#### 詳細解答
$$
U_n=(-1,n)\qquad(n\in\mathbb N)
$$
と置く。任意の $x\ge0$ に対して $n>x$ を取れば $x\in U_n$ なので $\{U_n\}$ は $[0,\infty)$ の開被覆である。

有限個 $U_{n_1},\ldots,U_{n_k}$ を選び $N=\max n_j$ とすると、その合併は $(-1,N)$ に含まれ、点 $N+1$ を覆わない。従って有限部分被覆を持たず、$[0,\infty)$ はコンパクトでない。

#### 本番答案
$U_n=(-1,n)$ を使う。全体は覆うが、有限個の合併は最大添字より右を覆えない。
<!-- solution-end -->

### F0-00C1-A03 有限集合はコンパクト

- Level: A
- 目安時間: 8分

位相空間 $X$ の有限部分集合 $K=\{x_1,\ldots,x_m\}$ がコンパクトであることを、開被覆の定義から示せ。

<!-- solution-start -->
#### 詳細解答
$\{U_\alpha\}_{\alpha\in A}$ を $K$ の任意の開被覆とする。各 $x_j$ について、それを含む被覆要素 $U_{\alpha_j}$ を一つ選ぶ。点は有限個しかないので
$$
K\subseteq U_{\alpha_1}\cup\cdots\cup U_{\alpha_m}.
$$
従って有限部分被覆が存在し、$K$ はコンパクト。

#### 本番答案
各点を覆う被覆要素を一つずつ選べば、高々 $m$ 個で $K$ を覆える。
<!-- solution-end -->

### F0-00C1-B02 距離空間のコンパクト集合は閉

- Level: B
- 目安時間: 15分

距離空間 $(X,d)$ のコンパクト部分集合 $K\subseteq X$ が閉であることを示せ。$x\notin K$ を固定し、$K$ と $x$ を正の距離で分離する方法を使ってよい。

<!-- solution-start -->
#### 詳細解答
$x\in X\setminus K$ を固定する。各 $y\in K$ について $d(x,y)>0$ なので
$$
r_y=\frac13d(x,y)>0
$$
と置く。$\{B(y,r_y):y\in K\}$ は $K$ の開被覆だから、コンパクト性により有限個 $y_1,\ldots,y_m$ で覆える。

$$
r=\min_{1\le j\le m}r_{y_j}>0
$$
とする。もし $z\in B(x,r)\cap B(y_j,r_{y_j})$ なら
$$
d(x,y_j)\le d(x,z)+d(z,y_j)<r+r_{y_j}\le2r_{y_j}
=\frac23d(x,y_j),
$$
矛盾。従って $B(x,r)$ は各 $B(y_j,r_{y_j})$ と交わらず、したがって $K$ と交わらない。よって $X\setminus K$ は開で、$K$ は閉。

#### 本番答案
各 $y\in K$ を $x$ から互いに素な小球で分離し、$K$ 側をコンパクト性で有限個にする。有限個の $x$ 側半径の最小値を取れば $x$ の開近傍が $K$ と交わらない。従って $K$ は閉。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md": ("## 6. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00C2-A01 Weierstrassが保証するもの

- Level: A
- 目安時間: 8分

$f(x)=x^3-3x$ を $[-2,2]$ 上で考える。最大値・最小値を実際に計算せず、両方が必ず存在する理由だけを述べよ。また、定義域を $(-2,2)$ に変えたとき同じ理由が使えない理由を述べよ。

<!-- solution-start -->
#### 詳細解答
$f$ は多項式なので連続であり、$[-2,2]$ は $\mathbb R$ の閉有界集合だからHeine--Borelによりコンパクトである。従ってWeierstrassの最大最小定理から最大値・最小値はともに達成される。

一方 $(-2,2)$ は閉でなくコンパクトではないため、Weierstrassの仮定を満たさない。最大・最小が実際に存在するかどうかは別途調べる必要がある。

#### 本番答案
連続関数＋コンパクトな定義域なのでWeierstrassを適用できる。$(-2,2)$ は非コンパクトなので同定理だけでは存在を保証できない。
<!-- solution-end -->

### F0-00C2-A02 コンパクト集合への最近点

- Level: A
- 目安時間: 10分

距離空間 $(X,d)$、空でないコンパクト集合 $K\subseteq X$、点 $z\in X$ に対し、関数
$$
f(x)=d(z,x)
$$
が $K$ 上で最小値を取ることを示せ。

<!-- solution-start -->
#### 詳細解答
距離の三角不等式から
$$
|d(z,x)-d(z,y)|\le d(x,y)
$$
なので $f$ は連続である。$K$ は空でないコンパクト集合だからWeierstrassの定理を適用でき、ある $x_*\in K$ が存在して
$$
f(x_*)=\min_{x\in K}f(x).
$$
すなわち
$$
d(z,x_*)=\min_{x\in K}d(z,x).
$$

#### 本番答案
距離関数は1-Lipschitzなので連続。コンパクト集合 $K$ 上でWeierstrassを使えば最近点が存在する。
<!-- solution-end -->

---
'''),

"textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md": ("## 9. 次に進む", r'''
<!-- exercise-density-supplement-20260912 -->

### F0-00D-A03 Cauchy列は有界

- Level: A
- 目安時間: 10分

距離空間 $(X,d)$ のCauchy列 $(x_n)$ が有界、すなわちある $x_0\in X$ と $R>0$ が存在して全ての $n$ で
$$
d(x_n,x_0)\le R
$$
となることを示せ。

<!-- solution-start -->
#### 詳細解答
Cauchy条件を $\varepsilon=1$ に適用し、ある $N$ を取って
$$
m,n\ge N\Longrightarrow d(x_m,x_n)<1
$$
とする。基準点を $x_N$ に取れば $n\ge N$ で
$$
d(x_n,x_N)<1.
$$
残る $x_1,\ldots,x_{N-1}$ は有限個なので
$$
R=1+\max\{d(x_1,x_N),\ldots,d(x_{N-1},x_N)\}
$$
とすれば全ての項が $B(x_N,R)$ に入る。

#### 本番答案
Cauchy条件の $\varepsilon=1$ で尾部を $x_N$ の1球に入れ、有限個の初項を有限半径で吸収する。
<!-- solution-end -->

### F0-00D-B02 完備な部分空間は閉

- Level: B
- 目安時間: 15分

距離空間 $(X,d)$ の部分集合 $F\subseteq X$ が、制限距離に関して完備であるとする。$F$ が $X$ で閉であることを示せ。

<!-- solution-start -->
#### 詳細解答
$x\in\overline F$ を取る。距離空間では閉包点から $F$ の点列を作れ、各 $n$ について
$$
x_n\in F\cap B(x,1/n)
$$
を取れる。すると $x_n\to x$ なので $(x_n)$ は $X$ でCauchyであり、距離は同じだから $F$ 内でもCauchyである。

$F$ は完備なので、ある $y\in F$ に $x_n\to y$。一方 $X$ では既に $x_n\to x$ である。距離空間では極限は一意だから $x=y\in F$。従って $\overline F\subseteq F$、よって $F$ は閉。

#### 本番答案
$x\in\overline F$ から $x_n\in F$, $x_n\to x$ を取る。この列はCauchyなので完備性から $F$ 内の $y$ に収束する。極限一意性より $x=y\in F$。従って $F$ は閉。
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
    if rel.endswith("F0_00B1_位相空間_近傍_部分空間_収束/index.md"):
        text = text.replace("## 10. 章末チェック", "## 11. 章末チェック", 1)
        text = text.replace("## 11. 次に進む", "## 12. 次に進む", 1)
    path.write_text(text, encoding="utf-8")
    print(f"patched {rel}")
