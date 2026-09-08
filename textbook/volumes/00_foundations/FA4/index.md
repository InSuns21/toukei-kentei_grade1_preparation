# FA4 標準関数解析 IV：Banach–Alaoglu・Goldstine・反射性

<!-- definition-example-audit: strict -->

FA3 では弱位相・弱*位相を「有限個の観測量で作る位相」として構成しました。本章では、その有限個しか見ない位相が無限次元でなぜ強いコンパクト性を生むのかを追います。

本章の流れは

```text
filter
  ↓ Zornの補題
ultrafilterへの極大延長
  ↓ compactnessの有限交差性
compact ⇔ 全ultrafilterが収束
  ↓ 座標ごとの収束
compact Hausdorff空間族の積はcompact
  ↓ 双対単位球を座標値で埋め込む
Banach–Alaoglu

有限個の f_1,...,f_n だけを見る
  ↓ finite-dimensional separation
Goldstine
  ↓
反射的 ⇔ 閉単位球が弱compact
```

です。

特に次の三点を混同しません。

- **選択原理**は、filter を ultrafilter へ極大延長するときに使います。
- **完備性**は Banach–Alaoglu 自体には不要です。定理は任意のノルム空間で成り立ちます。
- **Hahn–Banach**は FA3 の標準埋め込みの等長性と、本章後半の「ノルム閉凸集合は弱閉」で使います。Goldstine の有限次元分離部分は直接計算します。

既知とするのは [TOP5 のコンパクト性](../TOP5/index.md#def-top5-compact)、[TOP6 の filter](../TOP6/index.md#def-top6-filter)、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)、[FA3 の弱*位相](../FA3/index.md#def-fa3-weak-star-topology) と [標準埋め込み](../FA3/index.md#def-fa3-canonical-bidual-embedding) です。スカラー体は $\mathbb K=\mathbb R$ または $\mathbb C$ とします。

---

## 1. ultrafilter：選択原理が入る場所

<a id="def-fa4-ultrafilter"></a>
<!-- formal-statement-start -->
### 定義（ultrafilter）

集合 $S$ 上の filter $\mathcal U$ が **ultrafilter（ウルトラフィルター）** であるとは、$\mathcal U$ を真に含む $S$ 上の proper filter が存在しないことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa4-ultrafilter -->
**定義の確認**：一点 filter

$s\in S$ に対して

$$
\mathcal U_s=\{A\subseteq S:s\in A\}
$$

と置きます。任意の $A\subseteq S$ について $s\in A$ または $s\in S\setminus A$ のどちらか一方が成り立つので、$A$ またはその補集合のどちらか一方が $\mathcal U_s$ に入ります。この性質から $\mathcal U_s$ をさらに proper filter として大きくできず、ultrafilter です。
<!-- definition-example-end -->

### 1.1 極大性から二者択一を出す

ultrafilter $\mathcal U$ と任意の $A\subseteq S$ について

$$
A\in\mathcal U
\quad\text{または}\quad
S\setminus A\in\mathcal U
$$

のちょうど一方が成り立ちます。

$A\notin\mathcal U$ とします。もし全ての $U\in\mathcal U$ で $U\cap A\ne\varnothing$ なら、集合族

$$
\{U\cap A:U\in\mathcal U\}
$$

は空集合を含まず有限交叉で閉じた filter base です。そこから生成される proper filter は $\mathcal U$ と $A$ の両方を含み、$\mathcal U$ の極大性に反します。したがってある $U_0\in\mathcal U$ が

$$
U_0\cap A=\varnothing
$$

を満たします。よって $U_0\subseteq S\setminus A$ であり、filter の上方閉性から $S\setminus A\in\mathcal U$ です。両方が入ればその交叉 $\varnothing$ も入ってしまうので、ちょうど一方です。

<a id="lem-fa4-ultrafilter-extension"></a>
<!-- formal-statement-start -->
### 補題（ultrafilter拡張補題）

集合 $S$ 上の任意の filter $\mathcal F$ は、ある ultrafilter $\mathcal U$ に含まれる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mathcal F$ を含む proper filter 全体を

$$
\mathscr P=\{\mathcal G:\mathcal G\text{ は }S\text{ 上の filter},\ \mathcal F\subseteq\mathcal G\}
$$

とし、包含関係で半順序を入れます。$\mathcal F\in\mathscr P$ なので非空です。

$\mathscr C\subseteq\mathscr P$ を chain とし

$$
\mathcal H=\bigcup_{\mathcal G\in\mathscr C}\mathcal G
$$

と置きます。各 $\mathcal G$ は proper なので $\varnothing\notin\mathcal H$、また $S\in\mathcal H$ です。

$A,B\in\mathcal H$ なら、ある $\mathcal G_1,\mathcal G_2\in\mathscr C$ があって $A\in\mathcal G_1$, $B\in\mathcal G_2$ です。chain なので一方が他方を含みます。大きい方には $A,B$ がともに属するため $A\cap B$ も属し、従って $A\cap B\in\mathcal H$ です。上方閉性も $A$ を含む一つの filter の中で従います。よって $\mathcal H$ は filter で、$\mathscr C$ の上界です。

したがって [Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) により $\mathscr P$ は極大元 $\mathcal U$ を持ちます。これは定義どおり ultrafilter で、$\mathcal F\subseteq\mathcal U$ です。$\square$
<!-- proof-end -->

**選択原理を使ったのはこの Zorn 適用です。** 本教材では ZFC を採用するのでこの形で進めます。なお ultrafilter 拡張原理は完全な選択公理より弱い原理でも得られるため、「Banach–AlaogluでACを丸ごと使う」とだけ言うより、極大延長が実際の入口だと見る方が正確です。

---

## 2. compactness と ultrafilter の収束

<a id="thm-fa4-compact-ultrafilter"></a>
<!-- formal-statement-start -->
### 定理（コンパクト性のultrafilter特徴付け）

位相空間 $S$ について次は同値である。

1. $S$ はコンパクトである。
2. $S$ 上の任意の ultrafilter は少なくとも一つの点へ収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $S$ をコンパクト、$\mathcal U$ を ultrafilter とします。閉集合族

$$
\{\overline A:A\in\mathcal U\}
$$

を考えます。有限個 $A_1,\dots,A_m\in\mathcal U$ を取ると $A_1\cap\cdots\cap A_m\in\mathcal U$ です。proper filter なのでこの交叉は非空で、

$$
\overline{A_1\cap\cdots\cap A_m}
\subseteq
\overline{A_1}\cap\cdots\cap\overline{A_m}
$$

です。従って閉集合族は有限交差性を持ちます。[TOP5 の有限交差性による特徴付け](../TOP5/index.md#thm-top5-fip) から

$$
x\in\bigcap_{A\in\mathcal U}\overline A
$$

となる $x\in S$ が存在します。

$V$ を $x$ の開近傍とします。もし $V\notin\mathcal U$ なら ultrafilter の二者択一から $S\setminus V\in\mathcal U$ です。すると $x\in\overline{S\setminus V}$ ですが、$V$ は $x$ を含み $S\setminus V$ と交わらない開集合なので閉包の定義に反します。従って全ての近傍 $V$ が $\mathcal U$ に入り、$\mathcal U\to x$ です。

逆に $S$ がコンパクトでないとします。有限部分被覆を持たない開被覆 $\{V_i\}_{i\in I}$ を取り、$F_i=S\setminus V_i$ と置きます。有限部分被覆がないことから $\{F_i\}$ は有限交差性を持ちます。その有限交叉全体を base とする proper filter $\mathcal F$ を作り、前節の補題で $\mathcal F\subseteq\mathcal U$ となる ultrafilter を取ります。

仮定2から $\mathcal U\to x$ となる $x$ が存在します。開被覆なので $x\in V_{i_0}$ となる $i_0$ があり、収束から $V_{i_0}\in\mathcal U$ です。一方 $F_{i_0}\in\mathcal F\subseteq\mathcal U$ なので

$$
\varnothing=V_{i_0}\cap F_{i_0}\in\mathcal U,
$$

となり proper filter に反します。従って $S$ はコンパクトです。$\square$
<!-- proof-end -->

ここでは距離・完備性・Hausdorff 性を使っていません。

---

## 3. FA4で必要な積コンパクト性

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

$K=\varnothing$ なら自明です。以下 $K\ne\varnothing$ とし、$K$ 上の任意の ultrafilter $\mathcal U$ を取ります。座標射影を $\pi_i:K\to K_i$ とし

$$
\mathcal U_i
=
\{A\subseteq K_i:\pi_i^{-1}(A)\in\mathcal U\}
$$

と置きます。逆像は包含と有限交叉を保つので $\mathcal U_i$ は filter です。また

$$
\pi_i^{-1}(K_i\setminus A)=K\setminus\pi_i^{-1}(A)
$$

だから $\mathcal U$ の二者択一により $\mathcal U_i$ も ultrafilter です。

$K_i$ はコンパクトなので[前節の定理](#thm-fa4-compact-ultrafilter)から $\mathcal U_i$ はある点へ収束します。しかも $K_i$ は Hausdorff なので極限は一意です。実際 $x_i\ne y_i$ がともに極限なら、互いに素な近傍 $V\ni x_i$, $W\ni y_i$ があり、$V,W\in\mathcal U_i$ から $\varnothing=V\cap W\in\mathcal U_i$ となって矛盾します。

よって各 $i$ に対する唯一の極限点 $x_i$ が定まり、$x=(x_i)_{i\in I}\in K$ が定まります。ここでは各座標で「どれか一つ」を新たに選んでいません。Hausdorff 性が極限を一意に指定しています。

$x$ の積位相の基本近傍は、有限個の添字 $i_1,\dots,i_m$ と各 $x_{i_j}$ の近傍 $V_j$ を用いて

$$
W=\bigcap_{j=1}^{m}\pi_{i_j}^{-1}(V_j)
$$

と書けます。$\mathcal U_{i_j}\to x_{i_j}$ だから $V_j\in\mathcal U_{i_j}$、従って $\pi_{i_j}^{-1}(V_j)\in\mathcal U$ です。filter は有限交叉で閉じるので $W\in\mathcal U$。任意の基本近傍が $\mathcal U$ に入るため $\mathcal U\to x$ です。

任意の ultrafilter が収束したので、前節の特徴付けから $K$ はコンパクトです。$\square$
<!-- proof-end -->

TOP6 は net/filter の一般論で止め、ultrafilter を先取りしていません。本章では Banach–Alaoglu に必要になった地点で、Zorn まで遡って compact Hausdorff 版の積コンパクト性を閉じました。

---

## 4. Banach–Alaoglu

$X$ をノルム空間とし

$$
B_{X^*}=\{f\in X^*:\|f\|\le1\}
$$

とします。**$X$ の完備性は仮定しません。** 各 $x\in X$ に対し

$$
D_x=\{z\in\mathbb K:|z|\le\|x\|\}
$$

と置きます。$D_x$ は有限次元 Euclidean 空間の閉有界集合なので compact Hausdorff です。従って前節から

$$
K=\prod_{x\in X}D_x
$$

はコンパクトです。全座標0の点があるのでこの積は非空です。

写像

$$
\Phi:B_{X^*}\to K,
\qquad
\Phi(f)=(f(x))_{x\in X}
$$

を定めます。$\|f\|\le1$ なら $|f(x)|\le\|x\|$ なので well-defined です。

### 4.1 弱*位相は積の部分空間位相

$K$ の座標射影を $p_x$ とすると

$$
p_x(\Phi(f))=f(x).
$$

積位相の基本近傍は有限個の座標だけを制限します。その逆像は

$$
\{f\in B_{X^*}:|f(x_j)-f_0(x_j)|<\varepsilon_j,\ j=1,\dots,m\},
$$

であり、FA3 の弱*基本近傍そのものです。従って

$$
\Phi:(B_{X^*},\sigma(X^*,X))
\longrightarrow
\Phi(B_{X^*})\subseteq K
$$

は同相写像です。

### 4.2 像は閉集合

$a=(a_x)_{x\in X}\in K$ が像に属するための条件は、全ての $x,y\in X$ と $\alpha,\beta\in\mathbb K$ について

$$
a_{\alpha x+\beta y}=\alpha a_x+\beta a_y
$$

が成り立つことです。像の点なら線形性から必要です。逆にこの条件を満たす $a$ に対し $f_a(x)=a_x$ と置けば $f_a$ は線形で、$a\in K$ より

$$
|f_a(x)|=|a_x|\le\|x\|.
$$

従って $f_a\in X^*$ かつ $\|f_a\|\le1$ で、$a=\Phi(f_a)$ です。

固定した $x,y,\alpha,\beta$ について

$$
F_{x,y,\alpha,\beta}(a)
=a_{\alpha x+\beta y}-\alpha a_x-\beta a_y
$$

は有限個の座標射影からなる連続写像です。よって $F_{x,y,\alpha,\beta}^{-1}(\{0\})$ は閉で、

$$
\Phi(B_{X^*})
=
\bigcap_{x,y,\alpha,\beta}F_{x,y,\alpha,\beta}^{-1}(\{0\})
$$

も閉です。

<a id="thm-fa4-banach-alaoglu"></a>
<!-- formal-statement-start -->
### 定理（Banach–Alaoglu）

任意のノルム空間 $X$ に対し、双対空間の閉単位球 $B_{X^*}$ は弱*位相 $\sigma(X^*,X)$ でコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$B_{X^*}$ は compact 空間 $K$ の閉部分集合 $\Phi(B_{X^*})$ と同相です。コンパクト空間の閉部分集合はコンパクトなので $B_{X^*}$ は弱*コンパクトです。$\square$
<!-- proof-end -->

証明で使ったのは、各 $D_x$ の有限次元 compactness、ultrafilter 経由の積 compactness、弱*位相と有限座標位相の一致、そして線形性が閉条件であることです。$X$ 内の Cauchy 列や極限は一度も取りません。**Banach 性は不要です。**

---

## 5. Goldstine：有限個の汎関数を同時に近似する

FA3 の標準埋め込み

$$
J:X\to X^{**},
\qquad
Jx(f)=f(x)
$$

を用います。FA3 では Hahn–Banach のノルム保存拡張により $J$ が等長であることまで証明しました。

<a id="thm-fa4-goldstine"></a>
<!-- formal-statement-start -->
### 定理（Goldstine）

ノルム空間 $X$ に対して

$$
\overline{J(B_X)}^{\,\sigma(X^{**},X^*)}=B_{X^{**}}
$$

である。すなわち $J(B_X)$ は $B_{X^{**}}$ に弱*稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x^{**}\in B_{X^{**}}$ を固定します。$x^{**}$ の弱*基本近傍は、ある $f_1,\dots,f_n\in X^*$ と $\varepsilon>0$ により

$$
N=
\{y^{**}:|y^{**}(f_i)-x^{**}(f_i)|<\varepsilon,\ i=1,\dots,n\}
$$

と書けます。$N\cap J(B_X)\ne\varnothing$ を示します。

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

を置きます。示すべきことは $a\in\overline{T(B_X)}$ です。

$C=T(B_X)$ と置きます。$B_X$ は凸かつ balanced なので $C$ と $\overline C$ も凸かつ balanced です。また各座標が $|f_i(x)|\le\|f_i\|$ で抑えられるため $C$ は有界です。有限次元では $\overline C$ は閉有界、従ってコンパクトです。

反対に $a\notin\overline C$ とします。$\mathbb K^n$ を実 Euclidean 空間とみなし、$a$ から $\overline C$ への距離を最小にする $c_0\in\overline C$ を取ります。$u=a-c_0\ne0$ と置きます。

任意の $c\in\overline C$ と $0\le t\le1$ に対し凸性から $c_0+t(c-c_0)\in\overline C$ です。最近点性より

$$
\|u\|_2^2
\le
\|u-t(c-c_0)\|_2^2.
$$

右辺を展開し、$t>0$ で割って $t\downarrow0$ とすると

$$
\operatorname{Re}\langle u,c-c_0\rangle\le0.
$$

そこで

$$
L(z)=\operatorname{Re}\langle u,z\rangle
$$

と置けば

$$
L(c)\le L(c_0)<L(a)
\qquad(c\in\overline C),
$$

です。最後の厳密不等号は $L(a)-L(c_0)=\|u\|_2^2>0$ から出ます。

ある $\lambda_1,\dots,\lambda_n\in\mathbb K$ を用いて

$$
L(z)=\operatorname{Re}\sum_{i=1}^n\lambda_i z_i
$$

と書き、$g=\sum_{i=1}^n\lambda_i f_i\in X^*$ と置きます。$C=T(B_X)$ は balanced なので、実数体では符号を、複素数体では絶対値1の位相因子を $x$ に掛けることで

$$
\sup_{c\in C}L(c)
=
\sup_{\|x\|\le1}\operatorname{Re}g(x)
=
\sup_{\|x\|\le1}|g(x)|
=
\|g\|.
$$

連続性から $\sup_{\overline C}L=\|g\|$ です。一方

$$
L(a)
=
\operatorname{Re}x^{**}(g)
\le
|x^{**}(g)|
\le
\|x^{**}\|\,\|g\|
\le
\|g\|.
$$

しかし分離不等式は $L(a)>\sup_{c\in\overline C}L(c)=\|g\|$ を与えるので矛盾です。よって $a\in\overline C$ です。

したがって与えた $\varepsilon$ に対してある $x\in B_X$ が存在し

$$
|f_i(x)-x^{**}(f_i)|<\varepsilon
\qquad(i=1,\dots,n)
$$

を同時に満たします。つまり $Jx\in N\cap J(B_X)$ です。任意の弱*基本近傍が $J(B_X)$ と交わるので

$$
B_{X^{**}}
\subseteq
\overline{J(B_X)}^{\,w^*}.
$$

逆包含も確認します。$J$ は等長なので $J(B_X)\subseteq B_{X^{**}}$ です。また

$$
B_{X^{**}}
=
\bigcap_{f\in X^*}
\{z^{**}:|z^{**}(f)|\le\|f\|\}.
$$

各点評価 $z^{**}\mapsto z^{**}(f)$ は弱*連続なので右辺の各集合は弱*閉です。従って $B_{X^{**}}$ 自身が弱*閉であり、$J(B_X)$ の弱*閉包もその中に入ります。両包含から定理が従います。$\square$
<!-- proof-end -->

教科書的には「$a\notin\overline C$ を有限次元分離定理で分離する」と一行で済ませることがあります。本章では最近点と二次式の展開まで戻し、その有限次元分離を直接証明しました。したがって Goldstine の有限同時近似部分に未展開の分離定理は残していません。ただし $J$ の等長性には FA3 で Hahn–Banach を使っています。

---

## 6. 反射性

<a id="def-fa4-reflexive"></a>
<!-- formal-statement-start -->
### 定義（反射的Banach空間）

Banach 空間 $X$ が **反射的（reflexive）** であるとは、標準埋め込み

$$
J:X\to X^{**}
$$

が全射であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa4-reflexive -->
**定義の確認**：有限次元 Banach 空間

$\dim X=n<\infty$ とします。有限次元では $\dim X^*=\dim X^{**}=n$ です。FA3 で $J$ は等長、特に単射であることを示しました。同じ有限次元の空間への単射線形写像は全射なので $J(X)=X^{**}$。従って任意の有限次元 Banach 空間は反射的です。
<!-- definition-example-end -->

反射性は「$X$ と $X^{**}$ がどこかの同型で結ばれる」という意味ではありません。**標準埋め込み $J$ 自身が全射**であることを要求します。

### 6.1 $J$ は弱位相を弱*位相へ移す

$x_0\in X$ の弱基本近傍

$$
\{x:|f_j(x-x_0)|<\varepsilon,\ j=1,\dots,m\}
$$

を $J$ で送ると

$$
\{Jx:|(Jx-Jx_0)(f_j)|<\varepsilon,\ j=1,\dots,m\}
$$

です。$Jx(f)=f(x)$ なので、これは $J(X)$ 上の弱*部分空間位相の基本近傍です。従って

$$
J:(X,\sigma(X,X^*))
\to
(J(X),\sigma(X^{**},X^*)|_{J(X)})
$$

は同相写像です。

<a id="thm-fa4-reflexive-weak-compact-ball"></a>
<!-- formal-statement-start -->
### 定理（反射性と閉単位球の弱コンパクト性）

Banach 空間 $X$ について次は同値である。

1. $X$ は反射的である。
2. 閉単位球 $B_X$ は弱位相 $\sigma(X,X^*)$ でコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $X$ を反射的とします。$J$ は全射かつ等長なので

$$
J(B_X)=B_{X^{**}}.
$$

Banach–Alaoglu をノルム空間 $X^*$ に適用すると $B_{X^{**}}$ は $\sigma(X^{**},X^*)$ でコンパクトです。上で $J$ は弱位相から像上の弱*位相への同相写像だと示したので、$B_X$ は弱コンパクトです。

逆に $B_X$ が弱コンパクトとします。$J$ によって $J(B_X)$ は $X^{**}$ の弱*位相でコンパクトです。弱*位相は Hausdorff です。実際 $x^{**}\ne y^{**}$ なら、写像として異なるのである $f\in X^*$ が存在して $x^{**}(f)\ne y^{**}(f)$。この一点評価で互いに素な弱*近傍に分けられます。

従って Hausdorff 空間のコンパクト部分集合は閉であることから $J(B_X)$ は弱*閉です。一方 Goldstine から

$$
\overline{J(B_X)}^{\,w^*}=B_{X^{**}}.
$$

closed と dense を合わせれば $J(B_X)=B_{X^{**}}$ です。任意の $z^{**}\ne0$ に対し $z^{**}/\|z^{**}\|\in B_{X^{**}}$ なのである $x\in B_X$ が存在して

$$
Jx=\frac{z^{**}}{\|z^{**}\|}.
$$

線形性から $z^{**}=J(\|z^{**}\|x)$。$z^{**}=0$ は $J0=0$ です。従って $J$ は全射、すなわち $X$ は反射的です。$\square$
<!-- proof-end -->

逆向きで Goldstine が必要なのは

$$
J(B_X)\text{ が weak* compact}
\Longrightarrow
J(B_X)\text{ が weak* closed}
$$

だけでは $B_{X^{**}}$ の全点を覆えないからです。Goldstine が weak* dense を与え、closed + dense で初めて等号になります。

---

## 7. Hahn–Banachが再び働く：閉凸集合は弱閉

$C\subseteq X$ をノルム閉凸集合、$x_0\notin C$ とします。閉性からある $r>0$ が存在して

$$
(x_0+rB_X)\cap C=\varnothing.
$$

そこで $G=C+rB_X$ と置けば、$G$ は開凸集合で $x_0\notin G$ です。

この状況で Hahn–Banach による開凸集合と外点の分離を使います。その生成機構を一段戻すと、$c_1\in G$ を固定して $V=G-c_1$ と置き、原点を含む開凸集合 $V$ の Minkowski functional

$$
p_V(x)=\inf\{t>0:x\in tV\}
$$

を作ります。$y=x_0-c_1\notin V$ だから $p_V(y)\ge1$。$\operatorname{span}\{y\}$ 上の線形汎関数を $f_0(ty)=t$ と置くと $f_0\le p_V$ です。Hahn–Banach で $f_0$ を $p_V$ に支配される線形汎関数へ延長すると、$V$ と $y$ を実部で分離する連続線形汎関数が得られます。

従ってある $f\in X^*\setminus\{0\}$ が存在し、適切な向きに取り直せば

$$
\sup_{y\in G}\operatorname{Re}f(y)
\le
\operatorname{Re}f(x_0)
$$

となります。$c\in C$ と $\|h\|<r$ に対して $c+h\in G$ なので

$$
\operatorname{Re}f(c+h)
\le
\operatorname{Re}f(x_0).
$$

$h$ を $f$ のノルムをほぼ達成する方向へ動かすと

$$
\operatorname{Re}f(c)+r\|f\|
\le
\operatorname{Re}f(x_0).
$$

そこで

$$
\alpha=\operatorname{Re}f(x_0)-\frac{r\|f\|}{2}
$$

と置けば

$$
\operatorname{Re}f(c)<\alpha<\operatorname{Re}f(x_0)
\qquad(c\in C).
$$

集合 $\{x:\operatorname{Re}f(x)>\alpha\}$ は $x_0$ を含み $C$ と交わらない弱開集合です。従って $X\setminus C$ は弱開、つまり $C$ は弱閉です。

<a id="cor-fa4-reflexive-closed-bounded-convex"></a>
<!-- formal-statement-start -->
### 系（反射的Banach空間の閉有界凸集合は弱コンパクト）

反射的 Banach 空間 $X$ の任意のノルム閉・有界・凸集合 $C$ は弱コンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有界性からある $R>0$ が存在して $C\subseteq RB_X$。反射性と[前節の定理](#thm-fa4-reflexive-weak-compact-ball)により $B_X$ は弱コンパクトで、スカラー倍写像 $x\mapsto Rx$ は弱位相の同相写像なので $RB_X$ も弱コンパクトです。

上で Hahn–Banach 分離から $C$ が弱閉であることを示しました。従って $C$ は弱コンパクト空間 $RB_X$ の閉部分集合であり、弱コンパクトです。$\square$
<!-- proof-end -->

ここで凸性は Hahn–Banach 分離を通じて弱閉性を得るため、有界性は一つの弱コンパクト球へ押し込むために使われています。

---

## 8. 仮定の使用箇所

| 結果 | 選択原理 | 完備性 | Hahn–Banach |
|---|---|---|---|
| ultrafilter拡張 | Zornを使用 | 不要 | 不要 |
| compact Hausdorff積 | 上の拡張を使用 | 不要 | 不要 |
| Banach–Alaoglu | 積compactness経由 | $X$には不要 | 不要 |
| Goldstine | 新たな選択不要 | 不要 | $J$の等長性はFA3で使用 |
| 反射的⇒弱compact球 | Alaoglu経由 | 反射性をBanachで定義 | $J$の等長性経由 |
| 弱compact球⇒反射的 | 新たな選択不要 | Banachを仮定 | Goldstine側の既存$J$ |
| 閉有界凸集合の弱compactness | Alaoglu経由 | Banach | 分離で使用 |

本章では Eberlein–Šmulian を使いません。「弱コンパクトだから任意の点列から弱収束部分列を取れる」という未証明の置換を避け、一般位相の compactness・filter・閉集合だけで反射性まで閉じています。

---

## 9. 演習

### Level A

<a id="ex-fa4-a01"></a>
#### FA4-A01 ultrafilterの二者択一
- Level: A

ultrafilter $\mathcal U$ と $A\subseteq S$ に対し、$A\in\mathcal U$ または $S\setminus A\in\mathcal U$ のちょうど一方が成り立つことを証明せよ。

<!-- solution-start -->
**解答・解説**：$A\notin\mathcal U$ とする。全ての $U\in\mathcal U$ で $U\cap A\ne\varnothing$ なら、$\{U\cap A:U\in\mathcal U\}$ が生成する proper filter は $\mathcal U$ と $A$ を含み、極大性に反する。従ってある $U_0\in\mathcal U$ で $U_0\cap A=\varnothing$。よって $U_0\subseteq S\setminus A$ から $S\setminus A\in\mathcal U$。両方が属すれば $\varnothing$ が filter に入るので、ちょうど一方である。
<!-- solution-end -->

<a id="ex-fa4-a02"></a>
#### FA4-A02 Banach–Alaogluの像の閉性
- Level: A

$K=\prod_{x\in X}D_x$ の点 $a=(a_x)$ が双対単位球の像に属する条件を線形方程式で書き、その解集合が閉であることを示せ。

<!-- solution-start -->
**解答・解説**：条件は全ての $x,y,\alpha,\beta$ について $a_{\alpha x+\beta y}=\alpha a_x+\beta a_y$。各条件の左辺との差を取る写像は有限個の座標射影からなる連続写像で、その0逆像は閉。全条件の共通部分も閉。逆に条件を満たす $a$ から $f(x)=a_x$ と置けば線形で、$a\in K$ より $|f(x)|\le\|x\|$、従って $\|f\|\le1$ である。
<!-- solution-end -->

<a id="ex-fa4-a03"></a>
#### FA4-A03 Banach性はどこに要るか
- Level: A

Banach–Alaoglu の証明を監査し、$X$ の完備性を使っていないことを説明せよ。

<!-- solution-start -->
**解答・解説**：使ったのは各 $D_x$ の有限次元 compactness、ultrafilter による積 compactness、弱*位相と座標位相の一致、線形方程式で像が閉になることだけである。$X$ 内の Cauchy 列やその極限を取る操作はない。従って定理は任意のノルム空間で成り立つ。
<!-- solution-end -->

<a id="ex-fa4-a04"></a>
#### FA4-A04 有限次元空間の反射性
- Level: A

有限次元 Banach 空間 $X$ が反射的であることを、標準埋め込みの等長性と次元から示せ。

<!-- solution-start -->
**解答・解説**：$\dim X=n$ なら $\dim X^*=\dim X^{**}=n$。標準埋め込み $J$ はFA3で等長、従って単射。同じ $n$ 次元空間への単射線形写像は全射なので $J(X)=X^{**}$。よって $X$ は反射的。
<!-- solution-end -->

### Level B

<a id="ex-fa4-b01"></a>
#### FA4-B01 Goldstineの有限同時近似
- Level: B

$x^{**}\in B_{X^{**}}$、$f_1,\dots,f_n\in X^*$、$\varepsilon>0$ に対し、一つの $x\in B_X$ が

$$
|f_i(x)-x^{**}(f_i)|<\varepsilon
$$

を全ての $i$ で満たす理由を説明せよ。

<!-- solution-start -->
**解答・解説**：$T(x)=(f_1(x),\dots,f_n(x))$、$a=(x^{**}(f_1),\dots,x^{**}(f_n))$ と置く。Goldstine の証明で $a\in\overline{T(B_X)}$ を示した。従って $a$ の座標近傍 $\{z:|z_i-a_i|<\varepsilon\ \forall i\}$ は $T(B_X)$ と交わる。その交点を $T(x)$ と書けば一つの $x\in B_X$ が全不等式を同時に満たす。各 $f_i$ ごとに別の点を取るのではないことが核心である。
<!-- solution-end -->

<a id="ex-fa4-b02"></a>
#### FA4-B02 反射的なら単位球は弱コンパクト
- Level: B

Banach–Alaoglu をどの空間へ適用するか明示して証明せよ。

<!-- solution-start -->
**解答・解説**：Alaoglu を $X^*$ に適用すると $B_{X^{**}}$ が $\sigma(X^{**},X^*)$ でコンパクト。反射性と $J$ の等長性から $J(B_X)=B_{X^{**}}$。また $Jx(f)=f(x)$ により $J$ は $X$ の弱位相と $J(X)$ の弱*部分空間位相の同相写像。従って $B_X$ は弱コンパクト。
<!-- solution-end -->

<a id="ex-fa4-b03"></a>
#### FA4-B03 弱コンパクト単位球から反射性
- Level: B

Goldstine を使う位置が分かるように証明せよ。

<!-- solution-start -->
**解答・解説**：$J(B_X)$ は弱*コンパクト。弱*位相は Hausdorff なので $J(B_X)$ は弱*閉。一方 Goldstine より $J(B_X)$ は $B_{X^{**}}$ に弱*稠密。従って $J(B_X)=B_{X^{**}}$。任意の非零 $z^{**}$ をノルムで割って単位球へ入れ、等号から $z^{**}/\|z^{**}\|=Jx$ と書けば $z^{**}=J(\|z^{**}\|x)$。従って $J$ は全射。
<!-- solution-end -->

### Level C

<a id="ex-fa4-c01"></a>
#### FA4-C01 閉有界凸集合の弱コンパクト性
- Level: C

$X$ を反射的 Banach 空間、$C\subset X$ をノルム閉・有界・凸とする。Hahn–Banach を使う箇所と反射性を使う箇所を分けて、$C$ が弱コンパクトであることを証明せよ。

<!-- solution-start -->
**解答・解説**：まず $x_0\notin C$ を取る。閉性から $x_0+rB_X$ と $C$ が交わらない $r>0$ を取り、開凸集合 $C+rB_X$ と $x_0$ を Minkowski functional と Hahn–Banach で分離する。すると $f\in X^*$ と $\alpha$ があり $\operatorname{Re}f(c)<\alpha<\operatorname{Re}f(x_0)$ $(c\in C)$。従って $\{x:\operatorname{Re}f(x)>\alpha\}$ は $x_0$ を含み $C$ と交わらない弱開集合で、$C$ は弱閉。

次に有界性から $C\subset RB_X$。反射性から $RB_X$ は弱コンパクト。$C$ はその弱閉部分集合だから弱コンパクトである。Hahn–Banach は「norm closed convex ⇒ weak closed」、反射性は「ball ⇒ weak compact」に使われる。
<!-- solution-end -->

---

## 10. まとめ

本章で重要なのは定理名の列挙ではなく、次の接続です。

- 任意積の compactness を使う直前まで遡り、Zorn による ultrafilter 拡張を実装した。
- Banach–Alaoglu では双対球を座標積の中の閉じた線形方程式の解集合として実現した。
- Goldstine では弱*近傍を有限個の汎関数による $\mathbb K^n$ の同時近似へ落とし、有限次元分離を最近点から直接証明した。
- 反射性の逆向きでは weak* compact ⇒ closed と Goldstine ⇒ dense が噛み合う地点を明示した。
- Hahn–Banach は標準埋め込みの等長性と閉凸集合の弱閉性に局所化した。
- Eberlein–Šmulian は使わず、一般位相の compactness で閉じた。

次の FA5 では bounded operator の spectrum・resolvent へ進みます。
