# FA4 標準関数解析 IV：Banach–Alaoglu・Goldstine・反射性

<!-- definition-example-audit: strict -->

FA3 では弱位相・弱*位相を「有限個の観測量で作る位相」として構成しました。本章では、その有限個しか見ない位相が無限次元でなぜ強いコンパクト性を生むのかを追います。

流れは次の通りです。

```text
filter
  ↓ Zornの補題
ultrafilterへ極大延長
  ↓ compactnessの有限交差性
compact ⇔ 全ultrafilterが収束
  ↓ 座標ごとの収束
compact Hausdorff空間族の積はcompact
  ↓ 双対単位球を座標値 (f(x))_x で埋め込む
Banach–Alaoglu

有限個の f_1,...,f_n だけを見る
  ↓ finite-dimensional separation
Goldstine: J(B_X) は B_{X**} に弱*稠密
  ↓
反射的 ⇔ B_X が弱コンパクト
```

本章で特に区別するのは三つです。

- **選択原理**：任意積のコンパクト性へ進む直前、filterをultrafilterへ極大延長するときに使う。
- **完備性**：Banach–Alaogluそのものには不要である。反射性はここではBanach空間について定義する。
- **Hahn–Banach**：FA3の標準埋め込みの等長性で既に使った。本章後半では閉凸集合を弱閉にする段階でも、分離汎関数を作るために使う。Goldstineの有限次元分離は、定理名を呼ぶ代わりに核心計算を直接展開する。

既知とするのは [TOP5 のコンパクト性](../TOP5/index.md#def-top5-compact)、[TOP6 の filter](../TOP6/index.md#def-top6-filter)、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)、[FA3 の弱*位相](../FA3/index.md#def-fa3-weak-star-topology) と [標準埋め込み](../FA3/index.md#def-fa3-bidual-embedding) です。

スカラー体は $\mathbb K=\mathbb R$ または $\mathbb C$ とします。

---

## 1. 極大filter：選択原理が入る場所を隠さない

<a id="def-fa4-ultrafilter"></a>
<!-- formal-statement-start -->
### 定義（ultrafilter）

集合 $S$ 上のfilter $\mathcal U$ が **ultrafilter（ウルトラフィルター）** であるとは、$\mathcal U$ を真に含む $S$ 上のfilterが存在しないことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa4-ultrafilter -->
**定義の確認**：一点filter

$s\in S$ に対して

$$
\mathcal U_s=\{A\subseteq S:s\in A\}
$$

と置きます。これはTOP6で見た一点filterです。$A\subseteq S$ について

$$
s\in A\quad\text{または}\quad s\in S\setminus A
$$

のどちらか一方が必ず成り立つので、

$$
A\in\mathcal U_s
\quad\text{または}\quad
S\setminus A\in\mathcal U_s
$$

です。この性質から、$\mathcal U_s$ をさらにproper filterとして大きくする余地がなく、ultrafilterです。
<!-- definition-example-end -->

### 1.1 極大性を「二者択一」に変える

ultrafilter $\mathcal U$ と任意の $A\subseteq S$ について

$$
\boxed{
A\in\mathcal U
\quad\text{または}\quad
S\setminus A\in\mathcal U
}
$$

が成り立ちます。

実際 $A\notin\mathcal U$ とします。もし全ての $U\in\mathcal U$ について $U\cap A\ne\varnothing$ なら、

$$
\{B\subseteq S:\exists U\in\mathcal U,\ U\cap A\subseteq B\}
$$

は $\mathcal U$ と $A$ を含むproper filterになり、極大性に反します。従ってある $U_0\in\mathcal U$ が存在して

$$
U_0\cap A=\varnothing.
$$

すなわち $U_0\subseteq S\setminus A$ なのでfilterの上方閉性から

$$
S\setminus A\in\mathcal U.
$$

両方が入ればその交叉 $\varnothing$ までfilterに入ってしまうため、実際にはちょうど一方だけが入ります。

<a id="lem-fa4-ultrafilter-extension"></a>
<!-- formal-statement-start -->
### 補題（ultrafilter拡張補題）

集合 $S$ 上の任意のfilter $\mathcal F$ は、あるultrafilter $\mathcal U$ に含まれる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal F$ を含むproper filter全体を

$$
\mathscr P
=
\{\mathcal G:\mathcal G\text{ は }S\text{ 上のfilter},\ \mathcal F\subseteq\mathcal G\}
$$

とし、包含関係で半順序を入れます。$\mathcal F\in\mathscr P$ なので非空です。

$\mathscr C\subseteq\mathscr P$ をchainとし

$$
\mathcal H=\bigcup_{\mathcal G\in\mathscr C}\mathcal G
$$

と置きます。$\mathcal H$ がfilterであることを確認します。

まず各 $\mathcal G$ はproperなので $\varnothing$ を含まず、従って $\varnothing\notin\mathcal H$ です。また $S$ は各filterに属するので $S\in\mathcal H$ です。

$A,B\in\mathcal H$ なら、ある $\mathcal G_1,\mathcal G_2\in\mathscr C$ があって

$$
A\in\mathcal G_1,\qquad B\in\mathcal G_2.
$$

chainなので $\mathcal G_1\subseteq\mathcal G_2$ または逆です。大きい方を $\mathcal G_2$ としてよければ $A,B\in\mathcal G_2$ だから

$$
A\cap B\in\mathcal G_2\subseteq\mathcal H.
$$

上方閉性も、$A\in\mathcal H$ を含む一つのfilterの中で従います。よって $\mathcal H$ は $\mathscr C$ の上界です。

したがって [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) により $\mathscr P$ は極大元 $\mathcal U$ を持ちます。定義から $\mathcal U$ はultrafilterで、$\mathcal F\subseteq\mathcal U$ です。$\square$
<!-- proof-end -->

**選択原理を使ったのはこのZorn適用です。** 本教材はZFCを採るためZornを使えます。ただし、この証明に必要なultrafilter拡張原理は完全な選択公理より弱い選択原理としても知られています。したがって「Banach–Alaogluは何となくACを使う」のではなく、本章の証明では **filterの極大延長** が具体的な入口です。

---

## 2. コンパクト性をultrafilterの収束へ翻訳する

<a id="thm-fa4-compact-ultrafilter"></a>
<!-- formal-statement-start -->
### 定理（コンパクト性のultrafilter特徴付け）

位相空間 $S$ について次は同値である。

1. $S$ はコンパクトである。
2. $S$ 上の任意のultrafilterは少なくとも一つの点へ収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### コンパクトならultrafilterは収束する

$S$ をコンパクト、$\mathcal U$ をultrafilterとします。閉集合族

$$
\{\overline A:A\in\mathcal U\}
$$

を考えます。

$A_1,\dots,A_m\in\mathcal U$ ならfilter公理から

$$
A_1\cap\cdots\cap A_m\in\mathcal U.
$$

proper filterなのでこの交叉は空でありません。しかも

$$
\overline{A_1\cap\cdots\cap A_m}
\subseteq
\overline{A_1}\cap\cdots\cap\overline{A_m},
$$

よって右辺も非空です。従って閉集合族 $\{\overline A\}$ は有限交差性を持ちます。

[TOP5 の有限交差性による特徴付け](../TOP5/index.md#thm-top5-fip) から

$$
\bigcap_{A\in\mathcal U}\overline A\ne\varnothing.
$$

$x$ をこの共通部分から一つ取ります。

$V$ を $x$ の任意の開近傍とします。もし $V\notin\mathcal U$ ならultrafilterの二者択一から

$$
S\setminus V\in\mathcal U.
$$

$x$ は全ての $A\in\mathcal U$ の閉包に入るので

$$
x\in\overline{S\setminus V}.
$$

しかし $V$ は $x$ を含む開集合で $V\cap(S\setminus V)=\varnothing$ だから、これは閉包の定義に反します。従って全ての近傍 $V$ が $\mathcal U$ に入り、

$$
\mathcal U\to x.
$$

#### 全ultrafilterが収束するならコンパクト

逆に $S$ がコンパクトでないとします。すると有限部分被覆を持たない開被覆 $\{V_i\}_{i\in I}$ が存在します。閉集合

$$
F_i=S\setminus V_i
$$

を考えると、有限部分被覆がないことから $\{F_i\}$ は有限交差性を持ちます。

有限交叉を全て含むfilter baseから生成されるproper filter $\mathcal F$ を取り、ultrafilter拡張補題で

$$
\mathcal F\subseteq\mathcal U
$$

となるultrafilterを取ります。仮定により $\mathcal U\to x$ となる $x\in S$ が存在します。

被覆だからある $i_0$ について $x\in V_{i_0}$ です。$V_{i_0}$ は $x$ の近傍なので収束から

$$
V_{i_0}\in\mathcal U.
$$

一方 $F_{i_0}$ は生成filter、従って $\mathcal U$ に属します。すると

$$
\varnothing=V_{i_0}\cap F_{i_0}\in\mathcal U,
$$

proper filterに反します。よって $S$ はコンパクトです。$\square$
<!-- proof-end -->

ここで完備性・距離・Hausdorff性は使っていません。Hausdorff性は次節で「各座標の極限が一意なので、一斉選択を追加しなくても極限点の組が定まる」ところに現れます。

---

## 3. FA4で必要な積コンパクト性を証明する

<a id="thm-fa4-compact-hausdorff-product"></a>
<!-- formal-statement-start -->
### 定理（compact Hausdorff空間族の積コンパクト性）

添字集合 $I$ と compact Hausdorff 空間族 $(K_i)_{i\in I}$ に対し、積位相を入れた

$$
K=\prod_{i\in I}K_i
$$

はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$K=\varnothing$ なら空間は自明にコンパクトです。以下 $K\ne\varnothing$ とし、$K$ 上の任意のultrafilter $\mathcal U$ を取ります。

座標射影を

$$
\pi_i:K\to K_i
$$

とし

$$
\mathcal U_i
=
\{A\subseteq K_i:\pi_i^{-1}(A)\in\mathcal U\}
$$

と置きます。逆像が有限交叉と包含を保つので $\mathcal U_i$ はfilterです。また任意の $A\subseteq K_i$ について

$$
\pi_i^{-1}(K_i\setminus A)
=K\setminus\pi_i^{-1}(A)
$$

であり、$\mathcal U$ の二者択一から $A$ または $K_i\setminus A$ のどちらか一方が $\mathcal U_i$ に入ります。従って $\mathcal U_i$ はultrafilterです。

$K_i$ はコンパクトなので前節の定理から $\mathcal U_i$ は少なくとも一つの点へ収束します。さらに $K_i$ はHausdorffなのでfilterの極限は一意です。実際 $x_i\ne y_i$ がともに極限なら、互いに素な近傍 $V\ni x_i$, $W\ni y_i$ があり、$V,W\in\mathcal U_i$ から

$$
\varnothing=V\cap W\in\mathcal U_i
$$

となって矛盾します。

よって各 $i$ に対する極限点 $x_i$ は一意に定まり、

$$
x=(x_i)_{i\in I}
$$

という点が定まります。ここで「各座標からどれか一つの極限を選ぶ」という新たな選択はしていません。Hausdorff性による一意性が座標を指定しています。

$x$ の積位相の基本近傍を取ります。これは有限個 $i_1,\dots,i_m$ と各近傍 $V_j\ni x_{i_j}$ を使って

$$
W=igcap_{j=1}^m\pi_{i_j}^{-1}(V_j)
$$

と書けます。$\mathcal U_{i_j}\to x_{i_j}$ だから

$$
V_j\in\mathcal U_{i_j},
$$

従って定義から

$$
\pi_{i_j}^{-1}(V_j)\in\mathcal U.
$$

filterは有限交叉で閉じるので $W\in\mathcal U$ です。任意の基本近傍が $\mathcal U$ に入るため

$$
\mathcal U\to x.
$$

任意のultrafilterが収束したので、前節の特徴付けから $K$ はコンパクトです。$\square$
<!-- proof-end -->

これはTychonoff型の積コンパクト性のうち、本章で使う compact Hausdorff 版です。TOP6ではultrafilterを先取りしませんでした。本章では必要になった地点で、ultrafilter拡張まで遡って証明を閉じています。

---

## 4. Banach–Alaoglu：双対単位球を座標の積へ入れる

$X$ をノルム空間とし

$$
B_{X^*}=\{f\in X^*:\|f\|\le1\}
$$

とします。ここで **$X$ の完備性は仮定しません。**

各 $x\in X$ に対して

$$
D_x=\{z\in\mathbb K:|z|\le\|x\|\}
$$

と置きます。$\mathbb R$ または $\mathbb C\cong\mathbb R^2$ の閉有界集合なのでHeine–Borelによりcompact Hausdorffです。積

$$
K=\prod_{x\in X}D_x
$$

を考えます。全座標0の点があるので $K\ne\varnothing$ です。前節から $K$ はコンパクトです。

写像

$$
\Phi:B_{X^*}\to K,
\qquad
\Phi(f)=(f(x))_{x\in X}
$$

を定めます。$\|f\|\le1$ なら

$$
|f(x)|\le\|x\|
$$

なので確かに $\Phi(f)\in K$ です。

### 4.1 弱*位相は積の部分空間位相そのもの

$K$ の座標射影を $p_x$ とすると

$$
p_x(\Phi(f))=f(x).
$$

積位相の基本近傍は有限個の座標しか制限しません。従って $\Phi(B_{X^*})$ 上の部分空間位相で $\Phi(f_0)$ の基本近傍を戻すと

$$
\{f\in B_{X^*}:|f(x_j)-f_0(x_j)|<\varepsilon_j,\ j=1,\dots,m\},
$$

となります。これはFA3で直接構成した弱*基本近傍です。

したがって

$$
\boxed{
\Phi:(B_{X^*},\sigma(X^*,X))
\longrightarrow \Phi(B_{X^*})\subseteq K
}
$$

は同相写像です。

### 4.2 像が閉であることを「線形性の方程式」として示す

$a=(a_x)_{x\in X}\in K$ が $\Phi(B_{X^*})$ に属するための条件は、全ての $x,y\in X$ と $\alpha,\beta\in\mathbb K$ について

$$
a_{\alpha x+\beta y}=\alpha a_x+\beta a_y
$$

が成り立つことです。

実際、$a=\Phi(f)$ なら線形性から当然成り立ちます。逆にこの等式が全て成り立てば

$$
f_a(x)=a_x
$$

は線形です。さらに $a\in K$ なので

$$
|f_a(x)|=|a_x|\le\|x\|
$$

であり、$f_a$ は連続で $\|f_a\|\le1$ です。従って $a=\Phi(f_a)$ です。

固定した $x,y,\alpha,\beta$ について

$$
F_{x,y,\alpha,\beta}(a)
=a_{\alpha x+\beta y}-\alpha a_x-\beta a_y
$$

は有限個の座標射影とスカラー演算からなる連続写像 $K\to\mathbb K$ です。$\{0\}$ は閉なので

$$
F_{x,y,\alpha,\beta}^{-1}(\{0\})
$$

は閉です。よって

$$
\Phi(B_{X^*})
=
\bigcap_{x,y,\alpha,\beta}
F_{x,y,\alpha,\beta}^{-1}(\{0\})
$$

は任意個の閉集合の交叉として閉です。

<a id="thm-fa4-banach-alaoglu"></a>
<!-- formal-statement-start -->
### 定理（Banach–Alaoglu）

任意のノルム空間 $X$ に対し、双対空間の閉単位球

$$
B_{X^*}
$$

は弱*位相 $\sigma(X^*,X)$ でコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で $B_{X^*}$ はcompact空間 $K$ の閉部分集合 $\Phi(B_{X^*})$ と同相であることを示しました。compact空間の閉部分集合はcompactなので $B_{X^*}$ は弱*compactです。$\square$
<!-- proof-end -->

証明を監査すると、役割は明確です。

1. 各座標円板のcompactness：有限次元のHeine–Borel。
2. 任意積のcompactness：ultrafilter拡張、そこでZorn。
3. 弱*位相：有限個の点評価だけを見るため積位相と一致。
4. 双対であること：線形方程式の閉条件。
5. **$X$ のBanach性：一度も使わない。**

---

## 5. Goldstine：有限個の観測量なら単位球から同時近似できる

FA3の標準埋め込み

$$
J:X\to X^{**},
\qquad
Jx(f)=f(x)
$$

を使います。Hahn–Banachにより $J$ は等長でした。

<a id="thm-fa4-goldstine"></a>
<!-- formal-statement-start -->
### 定理（Goldstine）

ノルム空間 $X$ に対して

$$
\boxed{
\overline{J(B_X)}^{\,\sigma(X^{**},X^*)}
=B_{X^{**}}
}
$$

である。すなわち $J(B_X)$ は $B_{X^{**}}$ に弱*稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x^{**}\in B_{X^{**}}$ を固定します。弱*位相の任意の基本近傍は、ある

$$
f_1,\dots,f_n\in X^*,\qquad \varepsilon>0
$$

により

$$
N=
\left\{y^{**}:|y^{**}(f_i)-x^{**}(f_i)|<\varepsilon,\ i=1,\dots,n\right\}
$$

と書けます。$N\cap J(B_X)\ne\varnothing$ を示せば十分です。

有限次元写像

$$
T:X\to\mathbb K^n,
\qquad
T(x)=(f_1(x),\dots,f_n(x))
$$

と

$$
a=(x^{**}(f_1),\dots,x^{**}(f_n))
$$

を置きます。示すべきことは

$$
a\in\overline{T(B_X)}
$$

です。

$C=T(B_X)$ と置きます。$B_X$ は凸かつbalanced（複素の場合は $|\lambda|\le1$ に対し $\lambda B_X\subseteq B_X$）なので、$C$ と $\overline C$ も凸かつbalancedです。また

$$
|f_i(x)|\le\|f_i\|\qquad(x\in B_X)
$$

だから $C$ は有界です。有限次元では $\overline C$ は閉有界、従ってコンパクトです。

反対に $a\notin\overline C$ と仮定します。$\mathbb K^n$ を実Euclidean空間とみなし、$a$ から $\overline C$ への距離を最小にする

$$
c_0\in\overline C
$$

を取れます。$u=a-c_0\ne0$ とします。

任意の $c\in\overline C$ と $0\le t\le1$ に対し凸性から

$$
c_0+t(c-c_0)\in\overline C.
$$

$c_0$ が最近点なので

$$
\|u\|_2^2
\le
\|u-t(c-c_0)\|_2^2.
$$

右辺を展開すると

$$
0
\le
-2t\operatorname{Re}\langle u,c-c_0\rangle
+t^2\|c-c_0\|_2^2.
$$

$t>0$ で割って $t\downarrow0$ とすれば

$$
\operatorname{Re}\langle u,c-c_0\rangle\le0.
$$

従って実線形汎関数

$$
L(z)=\operatorname{Re}\langle u,z\rangle
$$

は

$$
L(c)\le L(c_0)<L(a)
\qquad(c\in\overline C)
$$

を満たします。最後の不等式は

$$
L(a)-L(c_0)=\|u\|_2^2>0
$$

から従います。

ある $\lambda_1,\dots,\lambda_n\in\mathbb K$ を使って

$$
L(z)=\operatorname{Re}\sum_{i=1}^n\lambda_i z_i
$$

と書けます。そこで

$$
g=\sum_{i=1}^n\lambda_i f_i\in X^*
$$

と置きます。

$C=T(B_X)$ はbalancedなので

$$
\sup_{c\in C}L(c)
=
\sup_{\|x\|\le1}\operatorname{Re}g(x)
=
\sup_{\|x\|\le1}|g(x)|
=
\|g\|.
$$

実数の場合は符号 $\pm1$ を、複素の場合は絶対値1の位相因子を $x$ に掛ければ、実部の上限と絶対値の上限が一致します。連続性から $\sup_{\overline C}L=\sup_C L$ です。

一方

$$
L(a)
=
\operatorname{Re}\sum_{i=1}^n\lambda_i x^{**}(f_i)
=
\operatorname{Re}x^{**}(g)
\le
|x^{**}(g)|
\le
\|x^{**}\|\,\|g\|
\le
\|g\|.
$$

しかし分離不等式は

$$
L(a)>\sup_{c\in\overline C}L(c)=\|g\|
$$

を与えるので矛盾です。従って

$$
a\in\overline C.
$$

ゆえに、与えた $\varepsilon$ に対しある $x\in B_X$ が存在して

$$
|f_i(x)-x^{**}(f_i)|<\varepsilon
\qquad(i=1,\dots,n)
$$

となります。これは

$$
Jx\in N\cap J(B_X)
$$

を意味します。任意の弱*基本近傍が $J(B_X)$ と交わるので $x^{**}$ はその弱*閉包に属します。$x^{**}\in B_{X^{**}}$ は任意でした。逆包含は $J$ が等長で $B_{X^{**}}$ が弱*閉であることから従います。$\square$
<!-- proof-end -->

### 5.1 Hahn–Banachとの関係

Goldstineの教科書的証明では、上の「$a\notin\overline C$ なら有限次元の線形汎関数で強分離できる」という部分をHahn–Banachの分離定理として一行で呼ぶことがよくあります。本章ではそこを最近点 $c_0$ と二次式の展開まで戻して証明したため、**Goldstineのこの有限座標近似そのものには未展開の分離定理を残していません。**

一方、$J$ が等長で

$$
J(B_X)\subseteq B_{X^{**}}
$$

をノルムを保ったまま扱えることには、FA3でHahn–Banachのノルム保存拡張を使っています。後の閉凸集合の弱閉性ではHahn–Banachによる分離を再び明示的に使います。

---

## 6. 反射性：第二双対に「新しい点」があるか

<a id="def-fa4-reflexive"></a>
<!-- formal-statement-start -->
### 定義（反射的Banach空間）

Banach空間 $X$ が **反射的（reflexive）** であるとは、標準埋め込み

$$
J:X\to X^{**}
$$

が全射であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa4-reflexive -->
**定義の確認**：有限次元Banach空間

$\dim X=n<\infty$ とします。有限次元では

$$
\dim X^*=n,
\qquad
\dim X^{**}=n.
$$

FA3で $J$ は等長、特に単射であることを示しました。有限次元の同じ次元の空間への単射線形写像は全射なので

$$
J(X)=X^{**}.
$$

従って任意の有限次元Banach空間は反射的です。
<!-- definition-example-end -->

反射性は「$X$ と $X^{**}$ が抽象的に同型」というだけではありません。**標準埋め込み $J$ 自身が全射**であることを要求します。

### 6.1 弱位相と標準埋め込み上の弱*位相

$x_0\in X$ の弱基本近傍

$$
\{x:|f_j(x-x_0)|<\varepsilon,\ j=1,\dots,m\}
$$

を $J$ で送ると

$$
\{Jx:|(Jx-Jx_0)(f_j)|<\varepsilon,\ j=1,\dots,m\}
$$

です。これは $J(X)$ 上の弱*部分空間位相の基本近傍です。したがって

$$
J:(X,\sigma(X,X^*))
\to
(J(X),\sigma(X^{**},X^*)|_{J(X)})
$$

は同相写像です。

ここでは「収束するnetが同じだから」とだけ言わず、基本近傍が $Jx(f)=f(x)$ によって一致することを直接確認しました。

<a id="thm-fa4-reflexive-weak-compact-ball"></a>
<!-- formal-statement-start -->
### 定理（反射性と閉単位球の弱コンパクト性）

Banach空間 $X$ について次は同値である。

1. $X$ は反射的である。
2. 閉単位球 $B_X$ は弱位相 $\sigma(X,X^*)$ でコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 反射的なら $B_X$ は弱コンパクト

$X$ が反射的なら $J$ は全射です。さらに等長なので

$$
J(B_X)=B_{X^{**}}.
$$

Banach–Alaogluをノルム空間 $X^*$ に適用すると

$$
B_{X^{**}}
$$

は $\sigma(X^{**},X^*)$ でコンパクトです。前節で $J$ は弱位相から像上の弱*位相への同相写像なので、$B_X$ は弱コンパクトです。

#### $B_X$ が弱コンパクトなら反射的

逆に $B_X$ が弱コンパクトとします。同相写像 $J$ により

$$
J(B_X)
$$

は $X^{**}$ の弱*位相でコンパクトです。

弱*位相 $\sigma(X^{**},X^*)$ はHausdorffです。実際 $x^{**}\ne y^{**}$ なら、線形汎関数として異なるのである $f\in X^*$ が存在して

$$
x^{**}(f)\ne y^{**}(f).
$$

この一点評価で二点を互いに素な弱*近傍に分けられます。

従って [Hausdorff空間のコンパクト部分集合は閉](../TOP5/index.md) であることから $J(B_X)$ は弱*閉です。

一方 Goldstine の定理から

$$
\overline{J(B_X)}^{\,w^*}=B_{X^{**}}.
$$

閉であることと合わせれば

$$
J(B_X)=B_{X^{**}}.
$$

任意の $z^{**}\in X^{**}$ を取ります。$z^{**}=0$ なら $J0=0$ です。$z^{**}\ne0$ なら

$$
\frac{z^{**}}{\|z^{**}\|}\in B_{X^{**}}
$$

なのである $x\in B_X$ が存在して

$$
Jx=\frac{z^{**}}{\|z^{**}\|}.
$$

線形性から

$$
z^{**}=J(\|z^{**}\|x).
$$

従って $J$ は全射、つまり $X$ は反射的です。$\square$
<!-- proof-end -->

この逆向きで Goldstine が果たす役割は明確です。

$$
\text{弱コンパクト}
\Longrightarrow
J(B_X)\text{ が弱* compact}
\Longrightarrow
J(B_X)\text{ が弱* closed}
$$

まででは、$B_{X^{**}}$ の全点を覆ったとは言えません。Goldstineが

$$
J(B_X)\text{ が }B_{X^{**}}\text{ に弱* dense}
$$

を与え、closed + dense から初めて等号になります。

---

## 7. Hahn–Banachが再び働く：閉凸集合は弱閉

反射的空間では単位球だけでなく、閉有界凸集合も弱コンパクトになります。その前に「ノルム閉凸集合は弱閉」を確認します。

$C\subset X$ をノルム閉凸集合、$x_0\notin C$ とします。$C$ が閉なので、ある $r>0$ が存在して

$$
(x_0+rB_X)\cap C=\varnothing.
$$

従って

$$
G=C+rB_X
$$

は開凸集合で $x_0\notin G$ です。

ここでHahn–Banachから得られる開凸集合と外点の分離を使うと、ある $f\in X^*\setminus\{0\}$ が存在して

$$
\sup_{y\in G}\operatorname{Re}f(y)
\le
\operatorname{Re}f(x_0)
$$

となるようにできます。分離の仕組みを隠さないため、何が起きているかを一段戻して書きます。$c_1\in G$ を一つ固定し、

$$
V=G-c_1
$$

と置けば $V$ は原点を含む開凸集合です。Minkowski functional

$$
p_V(x)=\inf\{t>0:x\in tV\}
$$

はsublinearで、$y=x_0-c_1\notin V$ だから $p_V(y)\ge1$ です。$\operatorname{span}\{y\}$ 上で $f_0(ty)=t$ と置けば

$$
f_0(ty)\le p_V(ty)
$$

が成り立ちます。Hahn–Banachで $f_0$ を $p_V$ に支配される線形汎関数へ延長すると、$v\in V$ で $f(v)<1=f(y)$ が得られます。複素の場合は実部で同じ分離を読む形にします。これが上の分離汎関数の生成源です。

さらに $G$ が $C+rB_X$ を含むため、$c\in C$ と $\|h\|<r$ に対して

$$
\operatorname{Re}f(c+h)<\operatorname{Re}f(x_0).
$$

$h$ を $f$ のノルムをほぼ達成する方向へ動かすと

$$
\operatorname{Re}f(c)+r\|f\|
\le
\operatorname{Re}f(x_0).
$$

したがって

$$
\alpha=\operatorname{Re}f(x_0)-\frac{r\|f\|}{2}
$$

と置けば

$$
\operatorname{Re}f(c)<\alpha<\operatorname{Re}f(x_0)
\qquad(c\in C).
$$

集合

$$
U=\{x\in X:\operatorname{Re}f(x)>\alpha\}
$$

は弱位相で開です。$x_0\in U$ かつ $U\cap C=\varnothing$ なので、$X\setminus C$ は弱開、従って $C$ は弱閉です。

<a id="cor-fa4-reflexive-closed-bounded-convex"></a>
<!-- formal-statement-start -->
### 系（反射的Banach空間の閉有界凸集合は弱コンパクト）

反射的Banach空間 $X$ の任意のノルム閉・有界・凸集合 $C$ は弱コンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有界性からある $R>0$ が存在して

$$
C\subseteq RB_X.
$$

反射性と前節の定理により $B_X$ は弱コンパクトです。スカラー倍写像 $x\mapsto Rx$ は弱位相の同相写像なので $RB_X$ も弱コンパクトです。

上でHahn–Banach分離から $C$ が弱閉であることを示しました。従って $C$ は弱コンパクト空間 $RB_X$ の閉部分集合であり、弱コンパクトです。$\square$
<!-- proof-end -->

ここで **凸性は弱閉性を得るためのHahn–Banach分離に使い、有界性は一つの弱コンパクト球へ押し込むために使いました。** 閉性・凸性・有界性の役割は別です。

---

## 8. 何を使い、何を使っていないか

| 結果 | 選択原理 | 完備性 | Hahn–Banach | 核心 |
|---|---|---|---|---|
| ultrafilter拡張 | Zornを使用 | 不要 | 不要 | chainのfilterの合併 |
| compact Hausdorff積 | 上の拡張を使用 | 不要 | 不要 | 座標ultrafilterと有限座標近傍 |
| Banach–Alaoglu | 積compactness経由 | $X$ には不要 | 不要 | 双対球を座標積の閉集合として実現 |
| Goldstine | 新たな選択不要 | 不要 | $J$ の等長性はFA3で使用 | 有限座標像の分離矛盾 |
| 反射的⇒弱compact球 | Alaoglu経由 | 反射性をBanachで定義 | $J$ の等長性経由 | $J(B_X)=B_{X^{**}}$ |
| 弱compact球⇒反射的 | Alaoglu不要 | Banachを仮定 | Goldstine側の既存$J$ | compact⇒closed と Goldstine density |
| 閉有界凸集合の弱compactness | Alaoglu経由 | Banach | **分離で使用** | weak closed subset of weak compact ball |

### Eberlein–Šmulianについて

本章では

> 弱コンパクト性 ⇔ 任意の点列から弱収束部分列を取れる

というEberlein–Šmulian型の結果は使いません。一般位相のコンパクト性、filter、閉集合だけで反射性まで閉じます。したがって「弱コンパクトだから点列を取る」という未証明の飛躍はありません。

---

## 9. 演習

### Level A

<a id="ex-fa4-a01"></a>
#### FA4-A01 ultrafilterの二者択一
- Level: A

ultrafilter $\mathcal U$ と $A\subseteq S$ に対し、$A\in\mathcal U$ または $S\setminus A\in\mathcal U$ のちょうど一方が成り立つことを証明せよ。

<!-- solution-start -->
**解答・解説**：$A\notin\mathcal U$ とする。全ての $U\in\mathcal U$ で $U\cap A\ne\varnothing$ なら、$U\cap A$ をbaseとするproper filterが $\mathcal U$ と $A$ を含み、$\mathcal U$ の極大性に反する。従ってある $U_0\in\mathcal U$ で $U_0\cap A=\varnothing$。よって $U_0\subseteq S\setminus A$ から $S\setminus A\in\mathcal U$。両方が属すれば交叉 $\varnothing$ がfilterに入り矛盾するので、ちょうど一方である。
<!-- solution-end -->

<a id="ex-fa4-a02"></a>
#### FA4-A02 Banach–Alaogluの像の閉性
- Level: A

$K=\prod_{x\in X}D_x$ の点 $a=(a_x)$ が双対単位球の像に属する条件を線形方程式で書き、その解集合が閉であることを示せ。

<!-- solution-start -->
**解答・解説**：条件は全ての $x,y,\alpha,\beta$ について $a_{\alpha x+\beta y}=\alpha a_x+\beta a_y$。各左辺との差を取る写像は有限個の座標射影と連続な四則演算からなる連続写像で、その0逆像は閉。全条件の共通部分は閉。逆に条件を満たす $a$ から $f(x)=a_x$ と置けば線形で、$a\in K$ より $|f(x)|\le\|x\|$、従って $\|f\|\le1$。よって像と一致する。
<!-- solution-end -->

<a id="ex-fa4-a03"></a>
#### FA4-A03 Banach性はどこに要るか
- Level: A

Banach–Alaogluの証明を監査し、$X$ の完備性を使った箇所がないことを説明せよ。

<!-- solution-start -->
**解答・解説**：使ったのは各 $D_x$ の有限次元compactness、ultrafilterによる積compactness、弱*位相と座標位相の一致、線形方程式で像が閉になることだけである。$X$ 内のCauchy列や極限を一度も取らない。従って定理はBanach空間に限らず任意のノルム空間で成り立つ。
<!-- solution-end -->

<a id="ex-fa4-a04"></a>
#### FA4-A04 有限次元空間の反射性
- Level: A

有限次元Banach空間 $X$ が反射的であることを、標準埋め込みの等長性と次元から示せ。

<!-- solution-start -->
**解答・解説**：$\dim X=n$ なら $\dim X^*=\dim X^{**}=n$。標準埋め込み $J$ はFA3で等長、従って単射。$n$ 次元空間から $n$ 次元空間への単射線形写像は全射だから $J(X)=X^{**}$。従って $X$ は反射的。
<!-- solution-end -->

### Level B

<a id="ex-fa4-b01"></a>
#### FA4-B01 Goldstineの有限同時近似
- Level: B

$x^{**}\in B_{X^{**}}$、$f_1,\dots,f_n\in X^*$、$\varepsilon>0$ に対して、ある $x\in B_X$ が

$$
|f_i(x)-x^{**}(f_i)|<\varepsilon
$$

を全ての $i$ で満たすことを、本章の有限次元写像 $T$ を用いて説明せよ。

<!-- solution-start -->
**解答・解説**：$T(x)=(f_1(x),\dots,f_n(x))$、$a=(x^{**}(f_1),\dots,x^{**}(f_n))$ と置く。Goldstineの証明は $a\in\overline{T(B_X)}$ を示している。従って $a$ の積近傍 $\{z:|z_i-a_i|<\varepsilon\ \forall i\}$ は $T(B_X)$ と交わる。その交点を $T(x)$ と書けば $x\in B_X$ で所望の全不等式が同時に成り立つ。重要なのは各 $f_i$ ごとに別の $x_i$ を選ぶのではなく、一つの $x$ が有限族全部を近似する点である。
<!-- solution-end -->

<a id="ex-fa4-b02"></a>
#### FA4-B02 反射的なら単位球は弱コンパクト
- Level: B

Banach–Alaogluをどの空間へ適用するかを明示して、反射的Banach空間 $X$ の $B_X$ が弱コンパクトであることを証明せよ。

<!-- solution-start -->
**解答・解説**：Alaogluを $X^*$ に適用すると $B_{X^{**}}$ が $\sigma(X^{**},X^*)$ でcompact。反射性と $J$ の等長性から $J(B_X)=B_{X^{**}}$。さらに $Jx(f)=f(x)$ なので $J$ は $X$ の弱位相と $J(X)$ の弱*部分空間位相の同相写像。従って $B_X$ は弱compact。
<!-- solution-end -->

<a id="ex-fa4-b03"></a>
#### FA4-B03 弱コンパクト単位球から反射性
- Level: B

$B_X$ が弱コンパクトなら $X$ が反射的であることを、Goldstineを使う位置が分かるように証明せよ。

<!-- solution-start -->
**解答・解説**：$J(B_X)$ は弱*compact。弱*位相はHausdorffなのでTOP5より $J(B_X)$ は弱*closed。一方Goldstineより $J(B_X)$ は $B_{X^{**}}$ に弱*dense。従って $J(B_X)=B_{X^{**}}$。任意の非零 $z^{**}$ をノルムで割って単位球へ入れ、等号から $z^{**}/\|z^{**}\|=Jx$ と書けば $z^{**}=J(\|z^{**}\|x)$。よって $J$ は全射。
<!-- solution-end -->

### Level C

<a id="ex-fa4-c01"></a>
#### FA4-C01 閉有界凸集合の弱コンパクト性
- Level: C

$X$ を反射的Banach空間、$C\subset X$ をノルム閉・有界・凸とする。Hahn–Banachを使う箇所と反射性を使う箇所を分離して、$C$ が弱コンパクトであることを証明せよ。

<!-- solution-start -->
**解答・解説**：まず $x_0\notin C$ を取る。閉性から $x_0+rB_X$ と $C$ が交わらない $r>0$ を取り、開凸集合 $C+rB_X$ と $x_0$ をHahn–BanachのMinkowski functionalによる分離で分ける。すると $f\in X^*$ と $\alpha$ があり $\operatorname{Re}f(c)<\alpha<\operatorname{Re}f(x_0)$ $(c\in C)$。従って $\{x:\operatorname{Re}f(x)>\alpha\}$ は $x_0$ を含み $C$ と交わらない弱開集合で、$C$ は弱閉。

次に有界性から $C\subset RB_X$。反射性から前定理により $B_X$、従って $RB_X$ は弱compact。$C$ はその弱閉部分集合だからTOP5より弱compact。Hahn–Banachは「norm closed convex ⇒ weak closed」、反射性は「ball ⇒ weak compact」に使われ、役割は異なる。
<!-- solution-end -->

---

## 10. まとめ

本章の中心は「双対球は弱*compact」という一文ではありません。

- 任意積のcompactnessを使う前に、Zornによるultrafilter拡張まで遡った。
- Banach–Alaogluでは双対球を積の中の **閉じた線形方程式の解集合** として実現した。
- Goldstineでは弱*近傍が有限個の汎関数しか見ないことを $\mathbb K^n$ の同時近似へ落とし、分離の核心計算を展開した。
- 反射性の逆向きでは **compact ⇒ closed** と **Goldstine ⇒ dense** が噛み合う地点を明示した。
- Hahn–Banachは何でも生む黒箱にせず、標準埋め込みの等長性と閉凸集合の弱閉性という使用箇所を分離した。
- Eberlein–Šmulianや点列コンパクト性は使わず、一般位相のcompactnessで閉じた。

次のFA5では、コンパクト性からいったん離れ、bounded operatorの spectrum・resolvent へ進みます。
