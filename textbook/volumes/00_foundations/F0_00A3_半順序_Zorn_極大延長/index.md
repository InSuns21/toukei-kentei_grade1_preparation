# F0-00A3 補講：半順序・Zornの補題・極大延長

F0-00A2で選択公理を導入しました。この講義では、その同値な道具であるZornの補題を、**「これ以上延長できない候補を得る」ための証明テンプレート**として使える形にします。

---

## 1. 半順序集合

<a id="def-partial-order"></a>

<!-- formal-statement-start -->
> **定義（半順序集合）**  
> 集合 $P$ 上の関係 $\preceq$ が、任意の $x,y,z\in P$ に対して次を満たすとする。
> 1. 反射律：$x\preceq x$。
> 2. 反対称律：$x\preceq y$ かつ $y\preceq x$ なら $x=y$。
> 3. 推移律：$x\preceq y$ かつ $y\preceq z$ なら $x\preceq z$。
> このとき $(P,\preceq)$ を **半順序集合** という。
<!-- formal-statement-end -->

典型例は集合の包含関係です。

$$
A\preceq B
\quad\Longleftrightarrow\quad
A\subseteq B.
$$

---

## 2. 最大元と極大元を区別する

<a id="def-maximum-maximal"></a>

<!-- formal-statement-start -->
> **定義（最大元・極大元）**  
> 半順序集合 $(P,\preceq)$ と $x\in P$ を考える。$x$ が **最大元** であるとは
$$
y\preceq x
\qquad(\forall y\in P)
$$
> が成り立つことをいう。一方、$x$ が **極大元** であるとは、$y\in P$ が $x\preceq y$ を満たすなら必ず $y=x$ となることをいう。
<!-- formal-statement-end -->

つまり極大元は

> これ以上上へ進めない

というだけで、全員より大きい必要はありません。

### 2.1 例

$$
P=\{\{1\},\{2\}\}
$$

を包含関係で順序付けると、$\{1\}$ と $\{2\}$ は両方とも極大ですが、最大元はありません。

この違いはZornの補題で非常に重要です。

---

## 3. chain

<a id="def-chain"></a>

<!-- formal-statement-start -->
> **定義（chain）**  
> 半順序集合 $(P,\preceq)$ の部分集合 $C\subset P$ が **chain（鎖）** であるとは、任意の $x,y\in C$ が比較可能、すなわち
$$
x\preceq y
\quad\text{または}\quad
y\preceq x
$$
> が成り立つことをいう。
<!-- formal-statement-end -->

包含関係なら

$$
A_1\subseteq A_2\subseteq A_3\subseteq\cdots
$$

のような「一方向に並ぶ族」が典型例です。

---

## 4. 上界

<a id="def-upper-bound-poset"></a>

<!-- formal-statement-start -->
> **定義（半順序集合における上界）**  
> 半順序集合 $(P,\preceq)$、部分集合 $C\subset P$、点 $u\in P$ に対して
$$
x\preceq u
\qquad(\forall x\in C)
$$
> が成り立つとき、$u$ を $C$ の **上界** という。
<!-- formal-statement-end -->

ここで $u$ 自身が $C$ に属する必要はありません。

集合の包含関係の場合、chain $\{A_i\}$ の上界候補として

$$
\bigcup_i A_i
$$

が自然に現れます。

Hahn--Banachの証明でも、chainになった延長たちを合併して上界を作ります。

---

<a id="thm-zorn"></a>

## 5. Zornの補題

<!-- formal-statement-start -->
> **補題（Zornの補題）**  
> 半順序集合 $(P,\preceq)$ のすべてのchainが $P$ 内に上界を持つなら、$P$ は少なくとも一つ極大元を持つ。
<!-- formal-statement-end -->

記号的には

$$
\boxed{
\text{every chain has an upper bound}
\quad\Longrightarrow\quad
\text{a maximal element exists}
}
$$

です。

これは「最大値を取る」という有限次元解析の議論とは別物です。

コンパクト性から最大値を取るのではなく、**延長可能性を順序構造で整理して極大なものを得る**定理です。

---

## 6. Zornの補題を使う典型テンプレート

[Zorn](#thm-zorn)を使う証明は、ほぼ次の4段階です。

### Step 1：候補全体を集める

たとえば「部分空間上の線形汎関数の延長」全体を $P$ とします。

### Step 2：延長関係で半順序を入れる

$$
(M_1,f_1)\preceq(M_2,f_2)
$$

を

$$
M_1\subseteq M_2,
\qquad
f_2|_{M_1}=f_1
$$

で定義します。

### Step 3：chainの上界を作る

chain $\{(M_i,f_i)\}$ に対して

$$
M=\bigcup_i M_i
$$

とし、各 $x\in M$ に対して、それを含む $M_i$ 上の値を使って

$$
f(x)=f_i(x)
$$

と定めます。

chainなので定義は矛盾しません。

### Step 4：Zornで極大元を取る

極大な延長 $(M_*,f_*)$ を得ます。

もし $M_*\ne X$ なら、一次元延長ができてしまい、極大性に反します。

したがって

$$
M_*=X.
$$

これがHahn--Banach証明の最後の論理です。

---

## 7. ベクトル空間の基底にも選択公理が潜んでいる

有限次元ベクトル空間ではGaussian eliminationやGram--Schmidtで基底を構成できます。

しかし一般の無限次元ベクトル空間 $X$ がHamel基底を持つことを示す標準証明は[Zornの補題](#thm-zorn)を使います。

一次独立集合全体を包含関係で順序付け、chainの合併が再び一次独立であることを示すと、[Zorn](#thm-zorn)から極大一次独立集合 $B$ を得ます。

もし

$$
\operatorname{span}B\ne X
$$

なら、$x\notin\operatorname{span}B$ を1つ加えても一次独立なので極大性に反します。

従って

$$
\boxed{
\operatorname{span}B=X
}
$$

であり、$B$ は基底です。

「すべてのベクトル空間には基底がある」という日常的な定理にも、無限次元では選択公理が隠れています。

---

## 8. Hahn--Banachへの接続

F0-02C6では、一次元延長を構成した後に

> これ以上延長できないところまで進める

という一文が出てきます。

その一文を厳密に書けば、まさにこの章のZornテンプレートです。

したがって完全通読ルートでは

$$
\boxed{
\text{選択公理}
\to
\text{Zorn}
\to
\text{極大延長}
\to
\text{Hahn--Banach}
}
$$

と読めます。

---

## 9. 演習

### F0-00A3-A01 最大元と極大元

- Level: A
- 目安時間: 8分

$P=\{\{1\},\{2\}\}$ を包含関係で順序付ける。極大元と最大元を求めよ。

<!-- solution-start -->
#### 詳細解答
$\{1\}$ と $\{2\}$ は互いに比較不能で、どちらにも真に大きい要素が $P$ 内にないため両方が極大元。全要素を含む一つの要素は存在しないので最大元はない。

#### 本番答案
極大元は $\{1\},\{2\}$ の2つ。最大元は存在しない。

#### 採点基準（20点）
- 極大元2つ: 10点
- 最大元不存在: 6点
- 理由: 4点
<!-- solution-end -->

### F0-00A3-B01 Zornテンプレートのchain上界

- Level: B
- 目安時間: 15分

ベクトル空間 $X$ の一次独立集合全体を包含関係で順序付ける。chain $\mathcal C$ に対して $U=\bigcup_{A\in\mathcal C}A$ が一次独立であることを示せ。

<!-- solution-start -->
#### 詳細解答
$U$ から有限個 $x_1,\ldots,x_m$ を取り
$$
\sum_{j=1}^m c_jx_j=0
$$
とする。各 $x_j$ はある $A_j\in\mathcal C$ に属する。$\mathcal C$ はchainで有限個の $A_j$ は包含関係で比較可能なので、その中の最大の集合 $A_*$ が全ての $x_j$ を含む。$A_*$ は一次独立だから $c_1=\cdots=c_m=0$。従って $U$ は一次独立。

#### 本番答案
任意の有限個 $x_1,\ldots,x_m\in U$ はchain中の一つの集合 $A_*$ に同時に含まれる。$A_*$ が一次独立なので、それらの有限線形関係は自明。よって $U$ も一次独立。

#### 採点基準（20点）
- 有限個を取る: 4点
- chainから共通の上位集合を取る: 8点
- 一次独立性適用: 6点
- 結論: 2点
<!-- solution-end -->

---

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

---

## 10. 次に進む

Zornの補題は後のF0-02C6 Hahn--Banachで再登場します。標準通読では次に距離空間へ進みます。

**次：[F0-00B 距離空間・開集合・閉集合・収束](../F0_00B_距離空間_開集合_閉集合_収束/index.md)**

---

## 定義の確認：包含関係で4概念を区別する

<!-- definition-example-start: def-partial-order, def-maximum-maximal, def-chain, def-upper-bound-poset -->
**定義の確認**

$P=\mathcal P(\{1,2\})$ に包含関係 $\subseteq$ を入れます。包含関係は反射律・反対称律・推移律を満たすので $(P,\subseteq)$ は半順序集合です。

$$
C=\{\varnothing,\{1\},\{1,2\}\}
$$

では任意の2要素が包含関係で比較できるので $C$ はchainです。また $\{1,2\}$ は $C$ の全要素を含むので上界です。

一方、$Q=\{\{1\},\{2\}\}$ だけを包含関係で順序付けると、$\{1\}$ と $\{2\}$ はどちらもこれ以上大きい要素を $Q$ 内に持たないので極大元ですが、両方を上から支配する要素は $Q$ にないため最大元は存在しません。これで「極大」と「最大」が別概念であることも定義から確認できます。
<!-- definition-example-end -->
