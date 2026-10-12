# INFO2 相対エントロピー・Gibbs不等式・データ処理不等式

[INFO1のShannonエントロピー](../INFO1/index.md#def-info1-entropy)は、一つの分布の不確実性を測りました。しかし「本当は分布 $P$ なのに、別の分布 $Q$ で予測したときにどれだけ損をするか」は、単一分布のエントロピーだけでは答えられません。例えば、表と裏が半々のコインを、表が四分の三のコインだと思い込むと、まれな方の事象を過小評価します。

この損失を、二つの分布の対数比を平均する新しい量で表します。その平均的な損失が決して負にならないことを証明し、さらに、観測結果をまとめたり雑音を加えたりしても二分布の区別が増えないことを導きます。最後に[INFO1の相互情報量](../INFO1/index.md#def-info1-mutual-information)へ戻り、非負性、独立性との関係、Markov連鎖におけるデータ処理不等式を証明します。

本章では集合・確率変数はすべて**有限集合上**にあり、対数の底は $2$、情報の単位はビットです。連続分布や密度についてはここでは仮定しません。零確率を単に除算してはいけない箇所を最初に区別します。

## 1. 分布を取り違えたときの平均的な余分さ

有限集合 $\mathcal X$ 上の二つの確率質量関数を $p(x)$、$q(x)$ とします。$P$ の下で実際に $x$ が現れたとき、$-\log_2 p(x)$ の代わりに $-\log_2 q(x)$ を使うと、その差は $\log_2(p(x)/q(x))$ です。その差を本当の分布 $P$ で平均します。

ただし $p(x)>0$ なのに $q(x)=0$ なら、$Q$ は現実に起こり得る記号へ確率零を割り当てています。その記号で対数損失が無限大になるため、平均も無限大と扱います。そこで台 $\operatorname{supp}P:=\{x:p(x)>0\}$ を明示します。

<a id="def-info2-relative-entropy"></a>

<!-- formal-statement-start -->
> **定義（相対エントロピー）**  
> 有限集合 $\mathcal X$ 上の確率分布 $P=(p(x))_{x\in\mathcal X}$、$Q=(q(x))_{x\in\mathcal X}$ に対し、$\operatorname{supp}P\subseteq\operatorname{supp}Q$ のとき

$$
D(P\|Q):=\sum_{x:p(x)>0}p(x)\log_2\frac{p(x)}{q(x)}
$$

> と定める。$\operatorname{supp}P\not\subseteq\operatorname{supp}Q$ のときは $D(P\|Q):=+\infty$ とする。$p(x)=0$ の項は $q(x)$ の値によらず零とする。有限集合における $P\ll Q$ とは、$q(x)=0$ なら $p(x)=0$ となることであり、台の包含と同値である。
<!-- formal-statement-end -->

正確率の項ごとには負の値もあり得ます。例えば $p(x)<q(x)$ なら対数は負です。**和全体の非負性**は定義からは出ず、次節で証明する必要があります。また引数を交換すると重みも対数の比も変わるため、相対エントロピーは一般に対称ではありません。

<!-- definition-example-start: def-info2-relative-entropy -->
### 例：公平なコインを偏ったコインだと思う

**定義の確認**：$P=(1/2,1/2)$ と $Q=(3/4,1/4)$ はいずれも非負で成分の和が $1$、双方の台は二点全体です。したがって分母が零にならず定義の有限和を計算できます。

$$
\begin{aligned}
D(P\|Q)
&=\frac12\log_2\frac{1/2}{3/4}
 +\frac12\log_2\frac{1/2}{1/4}\\
&=\frac12\log_2\frac23+\frac12\log_2 2\\
&=\frac12\log_2\frac43\ \simeq 0.2075.
\end{aligned}
$$

一方、向きを逆にすると

$$
D(Q\|P)=\frac34\log_2\frac32+\frac14\log_2\frac12
$$

であり、同じ値にはなりません。
<!-- definition-example-end -->

### 例：零確率の予測

$P=(1/2,1/2)$、$Q=(1,0)$ では二番目の記号について $p(2)>0$、$q(2)=0$ です。したがって $D(P\|Q)=+\infty$ であり、$\log_2 0$ を有限値として計算しません。一方 $D(Q\|P)=1$ ビットです。$P$ と $Q$ を入れ替えただけで、有限性すら変わります。

## 2. 相対エントロピーはなぜ負にならないのか

先ほどの例で正の値が得られても、あらゆる分布について成り立つとは限りません。その証明には、[INFO1で使った対数不等式](../INFO1/index.md#thm-info1-entropy-bounds)の核心である

$$
\ln u\le u-1\qquad(u>0)
$$

を使います。この不等式は $u=1$ のときに限り等号で、差の平均の符号と等号条件の両方を決めます。

<a id="thm-info2-gibbs"></a>

<!-- formal-statement-start -->
> **定理（Gibbs不等式）**  
> 同じ有限集合上の任意の確率分布 $P,Q$ に対し

$$
D(P\|Q)\ge0
$$

> が成り立つ。等号 $D(P\|Q)=0$ が成立するのは、すべての記号で $p(x)=q(x)$、すなわち $P=Q$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

台が含まれていなければ左辺は無限大です。有限の場合、$p(x)>0$ の記号に $u=q(x)/p(x)$ を代入し、対数不等式を $p(x)$ 倍して足します。$Q$ が $P$ の台の外に持つ確率質量も追うことで、等号成立条件に漏れがないようにします。

<!-- proof-start -->
### 証明

まず $P\not\ll Q$ の場合は定義上 $D(P\|Q)=+\infty$ であり、零にはなりません。以下 $P\ll Q$ とし、$S=\operatorname{supp}P$ とします。$x\in S$ では $p(x)>0$ かつ $q(x)>0$ ですから、正の実数 $u_x=q(x)/p(x)$ に対数不等式を適用できます。

$$
\ln\frac{q(x)}{p(x)}
\le\frac{q(x)}{p(x)}-1.
$$

両辺に $p(x)>0$ を掛けて $S$ 上で和を取ると

$$
\begin{aligned}
-(\ln2)D(P\|Q)
&=\sum_{x\in S}p(x)\ln\frac{q(x)}{p(x)}\\
&\le\sum_{x\in S}(q(x)-p(x))\\
&=\sum_{x\in S}q(x)-1\\
&\le0.
\end{aligned}
$$

最後の不等号には、$q$ が非負で全体の和が $1$ であることを使いました。$\ln2>0$ なので $D(P\|Q)\ge0$ です。

等号なら、まず最後の行の等号から $\sum_{x\notin S}q(x)=0$ であり、台の外の各 $q(x)$ は零です。また $p(x)>0$ の各項で対数不等式の差は非負なので、その重み付き和が零なら各 $u_x=1$、すなわち $q(x)=p(x)$ が全 $x\in S$ で成り立ちます。台の外では $p=q=0$ であり $P=Q$ です。逆に $P=Q$ なら正確率のすべての項が $p(x)\log_2 1=0$ となります。
<!-- proof-end -->

例えば $Q$ を台上の一様分布とすると、相対エントロピーを展開して[エントロピーの上限](../INFO1/index.md#thm-info1-entropy-bounds)を再び得ます。$P$ の台が $m$ 点なら

$$
D(P\|U)=\sum_{x\in S}p(x)\log_2(mp(x))
=\log_2m-H(P)\ge0.
$$

ここで $U(x)=1/m$ は $S$ 上一様、台外零の確率分布です。等号は $P=U$ の場合だけです。新しい非負性は、既習のエントロピーの最大値にもつながっています。

## 3. 一つの出力に複数の記号をまとめる：対数和不等式

「晴れ・曇り・雨」の三記号を「雨かどうか」の二記号にまとめると、元の三種類の差は一部観測できなくなります。この直感を定理へ進めるには、正の数列の和の比の対数と、各項の比の対数を比較する必要があります。

<a id="lem-info2-log-sum"></a>

<!-- formal-statement-start -->
> **補題（対数和不等式）**  
> 有限個の非負実数 $a_1,\ldots,a_n$、$b_1,\ldots,b_n$ に対し $A=\sum_i a_i$、$B=\sum_i b_i$ とする。$a_i>0,b_i=0$ の項は $+\infty$ と解釈し、$a_i=0$ の項は零とする。$A=0$ の場合は両辺を零とする。$A>0,B>0$ の場合には

$$
\sum_{i=1}^n a_i\log_2\frac{a_i}{b_i}
\ \ge\
A\log_2\frac AB
$$

> が成立する。$A>0,B=0$ の場合は左辺と右辺をともに $+\infty$ と解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

$A,B>0$ で有限値の場合、$a_i/A$ と $b_i/B$ は二つの確率分布です。[Gibbs不等式](#thm-info2-gibbs)をこれらに適用し、$A$ 倍して分母・分子の定数を分離すればよいのです。

<!-- proof-start -->
### 証明

$A=0$ なら各 $a_i=0$ なので両辺零とします。$A>0,B=0$ なら $b_i=0$ がすべての $i$ で成り立ち、いずれかの $a_i>0$ によって両辺無限大です。

以下 $A,B>0$ とします。ある $i$ で $a_i>0,b_i=0$ なら左辺が無限大、右辺は有限なので不等式は成立します。それ以外の場合には、$\alpha_i=a_i/A$、$\beta_i=b_i/B$ と置くと、$\alpha,\beta$ は確率分布、$\alpha\ll\beta$ です。[Gibbs不等式](#thm-info2-gibbs)より

$$
0\le D(\alpha\|\beta)
=\sum_{i:a_i>0}\frac{a_i}{A}
\log_2\frac{a_iB}{b_iA}.
$$

両辺に $A>0$ を掛け、対数の積の法則で展開すると

$$
\begin{aligned}
0
&\le\sum_{i:a_i>0}a_i
\left(\log_2\frac{a_i}{b_i}+\log_2\frac BA\right)\\
&=\sum_i a_i\log_2\frac{a_i}{b_i}
+A\log_2\frac BA.
\end{aligned}
$$

最後の項を右辺へ移せば求める不等式です。有限の場合の等号は $\alpha=\beta$、すなわち各 $i$ について $a_i/A=b_i/B$ のときだけです。
<!-- proof-end -->

## 4. 雑音や集約で分布の差は増やせない

確率的な観測装置を、入力 $x$ に対して出力 $z$ を出す条件付き確率 $W(z|x)$ で表します。各入力 $x$ について $W(z|x)\ge0$、$\sum_zW(z|x)=1$ です。同じ装置へ $P,Q$ のいずれかを入力したときの出力分布を比較します。

<a id="def-info2-channel"></a>

<!-- formal-statement-start -->
> **定義（有限確率通信路・出力分布）**  
> 有限入力集合 $\mathcal X$、有限出力集合 $\mathcal Z$ に対して $W(z|x)\ge0$ と $\sum_{z\in\mathcal Z}W(z|x)=1$ をすべての $x$ で満たす配列を確率通信路という。入力分布 $P$ に対する出力分布 $PW$ は

$$
(PW)(z)=\sum_{x\in\mathcal X}p(x)W(z|x)
$$

> で定める。通信路は、入力ごとの出力条件付き確率が指定されていることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info2-channel -->
### 例：三記号を二記号にまとめる

**定義の確認**：$\mathcal X=\{a,b,c\}$、$\mathcal Z=\{0,1\}$ とし、$W(0|a)=W(0|b)=1$、$W(1|c)=1$、残りを零とします。各入力行の非負性と行和 $1$ が成立するので確率通信路です。

例えば $P=(1/2,1/4,1/4)$ なら、$z=0$ の出力確率は $1/2+1/4=3/4$、$z=1$ は $1/4$ です。$Q=(1/4,1/2,1/4)$ でも出力は $(3/4,1/4)$ になります。入力では違う二分布を、この装置だけでは区別できません。
<!-- definition-example-end -->

<a id="thm-info2-relative-dpi"></a>

<!-- formal-statement-start -->
> **定理（相対エントロピーのデータ処理不等式）**  
> 有限入力集合上の任意の確率分布 $P,Q$ と、両方に共通して適用する有限確率通信路 $W$ について

$$
D(PW\|QW)\le D(P\|Q)
$$

> が拡張実数の不等式として成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$D(P\|Q)=+\infty$ なら主張は直ちに成立します。有限の場合に限って、各出力 $z$ を固定し、入力 $x$ ごとの寄与 $p(x)W(z|x)$、$q(x)W(z|x)$ に[対数和不等式](#lem-info2-log-sum)を適用します。出力 $z$ について足すと、通信路の行和 $1$ が残ります。

<!-- proof-start -->
### 証明

まず $D(P\|Q)=+\infty$ なら左辺は $[0,+\infty]$ の値であるため不等式を満たします。以下 $P\ll Q$ とします。このとき $(PW)(z)>0$ なら、ある $x$ で $p(x)W(z|x)>0$ です。その $x$ は $q(x)>0$ でもあるため $(QW)(z)\ge q(x)W(z|x)>0$、従って $PW\ll QW$ です。

出力 $z$ を固定し、$a_x=p(x)W(z|x)$、$b_x=q(x)W(z|x)$ と置きます。これらは非負で、和はそれぞれ $(PW)(z)$、$(QW)(z)$ です。[対数和不等式](#lem-info2-log-sum)より

$$
(PW)(z)\log_2\frac{(PW)(z)}{(QW)(z)}
\le\sum_x p(x)W(z|x)\log_2\frac{p(x)W(z|x)}{q(x)W(z|x)}.
$$

確率零の項は規約どおり零とします。$p(x)W(z|x)>0$ の項では三つの因子 $p(x),q(x),W(z|x)$ は正なので、比の $W(z|x)$ を約分できます。これをすべての出力 $z$ で足すと

$$
\begin{aligned}
D(PW\|QW)
&\le\sum_z\sum_{x:p(x)W(z|x)>0}
p(x)W(z|x)\log_2\frac{p(x)}{q(x)}\\
&=\sum_{x:p(x)>0}p(x)\log_2\frac{p(x)}{q(x)}
\sum_z W(z|x)\\
&=\sum_{x:p(x)>0}p(x)\log_2\frac{p(x)}{q(x)}\\
&=D(P\|Q).
\end{aligned}
$$

二行目では有限和の順序を交換しました。$W(z|x)=0$ の項は零なので、$z$ 全体へ和を戻せます。三行目では各 $x$ に対する行和が $1$ であることを使っています。
<!-- proof-end -->

対数を取る前に確率零のセルをどう処理するかが重要です。また $P,Q$ に**異なる**通信路を適用する場合には、比較する操作自体が変わるため、この不等式はそのまま使えません。

### 例：入力で異なるのに出力では同じ

先ほどの三記号の $P,Q$ はどちらも全成分が正なので、[Gibbs不等式](#thm-info2-gibbs)から $P\ne Q$ に対して $D(P\|Q)>0$ です。一方で $PW=QW=(3/4,1/4)$ なので

$$
D(PW\|QW)=0<D(P\|Q).
$$

違いが装置の中で失われたため、厳密な不等号となります。可逆な単なる記号の付け替えなら、二分布の比はそのまま移るので等号です。

## 5. 相互情報量の非負性と独立性

[INFO1で定義した相互情報量](../INFO1/index.md#def-info1-mutual-information)を、二つの分布の相対エントロピーとして読み直します。比較するのは $(X,Y)$ の実際の結合分布 $P_{XY}$ と、周辺分布の積 $P_XP_Y$ です。周辺分布の積は「観測された各変数の偏りは保ち、変数間の関係だけ捨てた分布」に対応します。

<a id="thm-info2-mutual-kl"></a>

<!-- formal-statement-start -->
> **定理（相互情報量の相対エントロピー表示）**  
> 有限集合に値を取る任意の確率変数 $X,Y$ について

$$
I(X;Y)=D(P_{XY}\|P_XP_Y)\ge0.
$$

> また $I(X;Y)=0$ と $X,Y$ の独立性は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$p_{XY}(x,y)>0$ なら必ず両方の周辺確率が正なので、相対エントロピーは有限です。比の対数を三つに分けて和を取り、[INFO1の結合エントロピー](../INFO1/index.md#def-info1-joint-entropy)へ戻します。非負性と等号条件は[Gibbs不等式](#thm-info2-gibbs)が与えます。

<!-- proof-start -->
### 証明

$p_{XY}(x,y)>0$ なら $p_X(x)\ge p_{XY}(x,y)>0$、$p_Y(y)\ge p_{XY}(x,y)>0$ なので $P_{XY}\ll P_XP_Y$ です。よって次のすべての対数は正確率セル上で定義されています。

$$
\begin{aligned}
D(P_{XY}\|P_XP_Y)
&=\sum_{x,y:p_{XY}(x,y)>0}p_{XY}(x,y)
\log_2\frac{p_{XY}(x,y)}{p_X(x)p_Y(y)}\\
&=\sum_{x,y}p_{XY}(x,y)\log_2p_{XY}(x,y)\\
&\quad-\sum_{x,y}p_{XY}(x,y)\log_2p_X(x)
-\sum_{x,y}p_{XY}(x,y)\log_2p_Y(y)\\
&=-H(X,Y)+H(X)+H(Y)\\
&=I(X;Y).
\end{aligned}
$$

二行目以降、零確率項はそれぞれ零と解釈しています。三行目では $\sum_y p_{XY}(x,y)=p_X(x)$ と $\sum_x p_{XY}(x,y)=p_Y(y)$ を使いました。これに[Gibbs不等式](#thm-info2-gibbs)を適用すると $I(X;Y)\ge0$ であり、等号は $P_{XY}=P_XP_Y$ の場合だけです。これは有限確率変数の[独立性と積測度の同値](../F0_00P3_独立_積測度_条件付き期待値/index.md#thm-f0-00p3-independence-product-law)と一致します。
<!-- proof-end -->

したがって「観測による不確実性の減少は平均的に負にならない」という[INFO1の関係式](../INFO1/index.md#def-info1-mutual-information)から、$H(Y|X)\le H(Y)$ も証明できました。**特定の観測 $X=x$ を条件とした場合**まで不確実性が必ず減るとは主張していません。減少するのは $X$ の値について平均したときです。

## 6. Markov連鎖：後から処理して情報が増えるか

二つの観測が続くとき、$Z$ が $Y$ だけを使って作られ、$X$ を直接参照しない状況を考えます。例えば $X$ を記録して $Y$ を得た後、その $Y$ を丸めて $Z$ を作るなら、$Z$ を使った方が $X$ について多くの情報を持つことはありません。

<a id="def-info2-markov"></a>

<!-- formal-statement-start -->
> **定義（有限Markov連鎖）**  
> 有限確率変数 $X,Y,Z$ が $X\to Y\to Z$ を成すとは、ある有限確率通信路 $W(z|y)$ が存在して、すべての $x,y,z$ について

$$
p_{XYZ}(x,y,z)=p_{XY}(x,y)W(z|y)
$$

> と表されることをいう。特に $p_Y(y)>0$ のとき、この条件は $P(Z=z\mid X=x,Y=y)=P(Z=z\mid Y=y)$ を $p_{XY}(x,y)>0$ の組で要求する。確率零の組では条件付き確率を定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info2-markov -->
### 例：一度観測したビットをさらに潰す

**定義の確認**：公平な $X\in\{0,1\}$ と独立な雑音 $N$（$P(N=1)=1/4$）から $Y=X\oplus N$ とし、$Z=0$ を常に出力するとします。$W(0|y)=1$、$W(1|y)=0$ は $y=0,1$ のそれぞれで非負、和 $1$ です。

$$
p_{XYZ}(x,y,z)=p_{XY}(x,y)\mathbf1_{\{z=0\}}
=p_{XY}(x,y)W(z|y)
$$

が全組で成立します。$X$ を知らず $Y$ だけから $Z$ を作っているので、定義の条件を満たします。
<!-- definition-example-end -->

<a id="thm-info2-mutual-dpi"></a>

<!-- formal-statement-start -->
> **定理（相互情報量のデータ処理不等式）**  
> 有限確率変数 $X,Y,Z$ が上記のMarkov連鎖 $X\to Y\to Z$ を成すなら

$$
I(X;Z)\le I(X;Y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[相互情報量の相対エントロピー表示](#thm-info2-mutual-kl)を使って、$P_{XY}$ と $P_XP_Y$ の二分布を考えます。いずれにも同じ操作「$x$ は保持し、$y$ から $W$ に従って $z$ を生成する」を適用します。その出力はそれぞれ $P_{XZ}$ と $P_XP_Z$ になるので、[相対エントロピーのデータ処理不等式](#thm-info2-relative-dpi)を適用できます。

<!-- proof-start -->
### 証明

入力を組 $(x,y)$、出力を組 $(x',z)$ とする通信路を

$$
T(x',z|x,y):=\mathbf1_{\{x'=x\}}W(z|y)
$$

で定義します。$T\ge0$ であり、各 $(x,y)$ について

$$
\sum_{x',z}T(x',z|x,y)
=\sum_z W(z|y)=1
$$

なので、これは有限確率通信路です。

まず $P_{XY}$ を通した出力は、Markov条件から

$$
\begin{aligned}
(P_{XY}T)(x',z)
&=\sum_{x,y}p_{XY}(x,y)\mathbf1_{\{x'=x\}}W(z|y)\\
&=\sum_y p_{XY}(x',y)W(z|y)\\
&=\sum_y p_{XYZ}(x',y,z)=p_{XZ}(x',z)
\end{aligned}
$$

です。一方 $P_XP_Y$ を通した出力は

$$
\begin{aligned}
((P_XP_Y)T)(x',z)
&=\sum_{x,y}p_X(x)p_Y(y)\mathbf1_{\{x'=x\}}W(z|y)\\
&=p_X(x')\sum_y p_Y(y)W(z|y)\\
&=p_X(x')p_Z(z).
\end{aligned}
$$

したがって[相対エントロピーのデータ処理不等式](#thm-info2-relative-dpi)に、入力分布 $P_{XY}$ と $P_XP_Y$、共通通信路 $T$ をそのまま代入して

$$
\begin{aligned}
I(X;Z)
&=D(P_{XZ}\|P_XP_Z)\\
&=D(P_{XY}T\|(P_XP_Y)T)\\
&\le D(P_{XY}\|P_XP_Y)=I(X;Y)
\end{aligned}
$$

を得ます。最初と最後の等式では[相互情報量の相対エントロピー表示](#thm-info2-mutual-kl)を使いました。
<!-- proof-end -->

例えば $Z=Y$ の単なるコピーなら等号です。一方 $Z$ が常に一定なら $I(X;Z)=0$ です。Markov条件を外して $Z$ が $X$ を直接見られるようにすると、同じ証明に必要な $p_{XYZ}=p_{XY}W$ が使えず、この主張は成立しません。反例として独立な公平な $X,Y$ に $Z=X$ を追加すれば、$I(X;Y)=0$ なのに $I(X;Z)=1$ です。

## 7. 演習：台・不等式・通信路を紙上で再現する

### Level A：定義と等号条件

#### A1. 相対エントロピーの実計算

$P=(1/2,1/2)$、$Q=(3/4,1/4)$ とする。台を確認し、$D(P\|Q)$ と $D(Q\|P)$ をそれぞれ厳密な対数式で求めよ。

- Level: A
- ID: INFO2-A1

<!-- solution-start -->
**詳細解答**　両分布とも成分が正なので台は二点全体であり、両方向とも有限です。[相対エントロピーの定義](#def-info2-relative-entropy)を使うと

$$
\begin{aligned}
D(P\|Q)
&=\frac12\log_2(2/3)+\frac12\log_2 2
=\frac12\log_2(4/3),\\
D(Q\|P)
&=\frac34\log_2(3/2)+\frac14\log_2(1/2)\\
&=\frac34\log_2(3/2)-\frac14.
\end{aligned}
$$

重みが異なるので、この二つの式は一致しません。
<!-- solution-end -->

#### A2. 片方向だけ無限大

$P=(1/2,1/2)$、$Q=(1,0)$ とする。二方向の相対エントロピーを求め、なぜ有限性が異なるか説明せよ。

- Level: A
- ID: INFO2-A2

<!-- solution-start -->
**詳細解答**　$P$ は二番目の記号に確率 $1/2$ を与えますが $Q$ は零なので、[相対エントロピーの定義](#def-info2-relative-entropy)より $D(P\|Q)=+\infty$ です。逆向きでは $Q$ の台は第一記号だけで、$P$ はそこに正の確率を与えるので

$$
D(Q\|P)=1\log_2\frac1{1/2}=1.
$$

零確率の項に $0/0$ を代入したわけではなく、最初から台の包含で場合分けしています。
<!-- solution-end -->

#### A3. エントロピー上界を回復する

$P=(t,1-t)$（$0\le t\le1$）と $U=(1/2,1/2)$ とする。$D(P\|U)$ を[INFO1の二値エントロピー](../INFO1/index.md#def-info1-entropy)を用いて表し、等号条件を示せ。

- Level: A
- ID: INFO2-A3

<!-- solution-start -->
**詳細解答**　$U$ は二点とも正なので、両端の $t=0,1$ を含めて $P\ll U$ です。$0\log_2 0=0$ の規約で

$$
\begin{aligned}
D(P\|U)
&=t\log_2(2t)+(1-t)\log_2(2(1-t))\\
&=t\log_2t+(1-t)\log_2(1-t)+1\\
&=1-h_2(t).
\end{aligned}
$$

[Gibbs不等式](#thm-info2-gibbs)から $h_2(t)\le1$ であり、等号は $P=U$、つまり $t=1/2$ のときだけです。
<!-- solution-end -->

#### A4. 相互情報量と独立性

公平なビット $X$ と $Y=X$ に対し $I(X;Y)$ を求めよ。次に $X,Y$ が独立な公平なビットならどうなるか求めよ。

- Level: A
- ID: INFO2-A4

<!-- solution-start -->
**詳細解答**　$Y=X$ なら結合分布の非零セルは $(0,0),(1,1)$ の各 $1/2$ です。積分布は四セルすべて $1/4$ なので、[相互情報量の相対エントロピー表示](#thm-info2-mutual-kl)より

$$
I(X;Y)=2\cdot\frac12\log_2\frac{1/2}{1/4}=1.
$$

独立な場合は全四セルで $p_{XY}=p_Xp_Y=1/4$ であり、各確率比は $1$、その対数は $0$、従って $I(X;Y)=0 です。非負性だけでなく等号が独立性と一致することを具体的に確認できます。
<!-- solution-end -->

### Level B：不等式の機構と失われる区別

#### B1. 集約すると消える分布の差

$\mathcal X=\{a,b,c\}$ で $P=(1/2,1/4,1/4)$、$Q=(1/4,1/2,1/4)$ とする。$a,b$ を $0$、$c$ を $1$ に移す決定的通信路 $W$ について $PW,QW,D(P\|Q),D(PW\|QW)$ を求めよ。

- Level: B
- ID: INFO2-B1

<!-- solution-start -->
**詳細解答**　通信路の行和は各入力で $1$ です。[出力分布の定義](#def-info2-channel)によって

$$
PW=(1/2+1/4,1/4)=(3/4,1/4),
$$

$$
QW=(1/4+1/2,1/4)=(3/4,1/4).
$$

入力の相対エントロピーは

$$
\begin{aligned}
D(P\|Q)
&=\frac12\log_2 2+\frac14\log_2(1/2)
+\frac14\log_2 1\\
&=\frac12-\frac14=\frac14.
\end{aligned}
$$

出力分布は等しいため $D(PW\|QW)=0$ です。$0<1/4$ なので、[データ処理不等式](#thm-info2-relative-dpi)の厳密な不等号を確認できます。
<!-- solution-end -->

#### B2. 無限大が雑音によって有限になる

$P=(1,0)$、$Q=(0,1)$ とする。二値通信路 $W$ は確率 $3/4$ で入力をそのまま、$1/4$ で反転する。入力と出力の相対エントロピーを比較せよ。

- Level: B
- ID: INFO2-B2

<!-- solution-start -->
**詳細解答**　入力では $P\not\ll Q$ なので $D(P\|Q)=+\infty$ です。二値通信路の遷移確率をかけると

$$
PW=(3/4,1/4),\qquad QW=(1/4,3/4)
$$

となり、出力では両成分が正です。したがって

$$
\begin{aligned}
D(PW\|QW)
&=\frac34\log_2 3+\frac14\log_2(1/3)\\
&=\left(\frac34-\frac14\right)\log_2 3\\
&=\frac12\log_2 3<+\infty.
\end{aligned}
$$

ここで[データ処理不等式](#thm-info2-relative-dpi)は、右辺が無限大の場合にも成立します。出力に雑音が混じり、入力では確実に見分けられた二分布が出力では重なったからです。
<!-- solution-end -->

#### B3. 出力を一定値に潰すMarkov連鎖

公平な $X\in\{0,1\}$、独立な $N$（$P(N=1)=1/4$）に対し $Y=X\oplus N$ とする。$Z=0$ を確実に出力するとき、Markov条件を確認し、$I(X;Y)$ と $I(X;Z)$ を求めよ。

- Level: B
- ID: INFO2-B3

<!-- solution-start -->
**詳細解答**　$W(0|y)=1$ と置けば $p_{XYZ}(x,y,z)=p_{XY}(x,y)W(z|y)$ なので、[Markov連鎖の定義](#def-info2-markov)を満たします。$X$ は一様で独立雑音を加えても $Y$ は一様です。$X=x$ での $Y$ の分布は確率 $(3/4,1/4)$（並びは $x$ により変わる）なので

$$
H(Y)=1,\quad H(Y|X)=h_2(1/4).
$$

[INFO1の相互情報量の定義](../INFO1/index.md#def-info1-mutual-information)から

$$
I(X;Y)=1-h_2(1/4)=\frac12-\frac34\log_2(4/3)>0.
$$

一方 $Z$ は一定なので $H(Z)=0$、$H(Z|X)=0$、従って $I(X;Z)=0$ です。[相互情報量のデータ処理不等式](#thm-info2-mutual-dpi)の具体例になっています。
<!-- solution-end -->

#### B4. 独立な二組の相対エントロピー

有限分布 $P\ll Q$、$R\ll S$ について $D(P\otimes R\|Q\otimes S)=D(P\|Q)+D(R\|S)$ を示せ。

- Level: B
- ID: INFO2-B4

<!-- solution-start -->
**詳細解答**　正確率の直積セル $(x,y)$ では $p(x)r(y)>0$ であり、仮定より $q(x)s(y)>0$ です。[相対エントロピーの定義](#def-info2-relative-entropy)に積分布を代入すると

$$
\begin{aligned}
&D(P\otimes R\|Q\otimes S)\\
&=\sum_{x:p(x)>0}\sum_{y:r(y)>0}
p(x)r(y)\log_2\frac{p(x)r(y)}{q(x)s(y)}\\
&=\sum_{x,y}p(x)r(y)\log_2\frac{p(x)}{q(x)}
+\sum_{x,y}p(x)r(y)\log_2\frac{r(y)}{s(y)}\\
&=\left(\sum_y r(y)\right)\sum_xp(x)\log_2\frac{p(x)}{q(x)}\\
&\quad+\left(\sum_x p(x)\right)\sum_yr(y)\log_2\frac{r(y)}{s(y)}\\
&=D(P\|Q)+D(R\|S).
\end{aligned}
$$

和は正確率の台に限って書き、各分布の確率の和が $1$ になることを使用しました。一般に依存する結合分布を勝手に積へ分解することはできません。
<!-- solution-end -->

### Level C：二段階の通信を統合する

#### C1. 二つの二値雑音と情報の減少

相互独立な三つの二値確率変数 $X,N_1,N_2\in\{0,1\}$ を考え、$X$ は公平とする、$P(N_1=1)=q$、$P(N_2=1)=r$（$0\le q,r\le1$）とする。$Y=X\oplus N_1$、$Z=Y\oplus N_2$ と定める。

1. $X\to Y\to Z$ のMarkov条件を確かめよ。
2. $X$ から $Z$ への反転確率 $s$ を求めよ。
3. $I(X;Y)$、$I(X;Z)$ を求め、データ処理不等式でどちらが大きいか説明せよ。
4. $q=0,r=1/2$ および $q=1/2$ の二つの境界例を解釈せよ。

- Level: C
- ID: INFO2-C1

<!-- solution-start -->
**詳細解答**

**(1)** $N_2$ は $(X,N_1)$ と独立なので、$Y$ が確定した後の $Z$ は $N_2$ のみで決まり、$X$ には依存しません。具体的に

$$
W(z|y)=
\begin{cases}
1-r,&z=y,\\
r,&z\ne y
\end{cases}
$$

と置くと、$W\ge0$ で各 $y$ の出力和は $(1-r)+r=1$ です。独立性により

$$
p_{XYZ}(x,y,z)=p_{XY}(x,y)W(z|y)
$$

ですから、[Markov連鎖の定義](#def-info2-markov)に合致します。

**(2)** $Z=X$ と異なるのは、$N_1,N_2$ のうちちょうど一方だけが1の場合です。独立性を使って

$$
\begin{aligned}
s&=P(N_1=0,N_2=1)+P(N_1=1,N_2=0)\\
&=(1-q)r+q(1-r)\\
&=q+r-2qr.
\end{aligned}
$$

二つの事象は互いに排反なので確率を足せます。$0\le s\le1$ です。

**(3)** 公平な $X$ に独立な反転雑音を加えると、$Y$ と $Z$ はいずれも公平です。$X=x$ を与えたときの条件付き確率は $Y$ では $(1-q,q)$、$Z$ では $(1-s,s)$（順序は $x$ に依存）です。従って[INFO1の相互情報量の定義](../INFO1/index.md#def-info1-mutual-information)から

$$
\begin{aligned}
I(X;Y)&=H(Y)-H(Y|X)=1-h_2(q),\\
I(X;Z)&=H(Z)-H(Z|X)=1-h_2(s).
\end{aligned}
$$

(1)でMarkov条件を証明したので[相互情報量のデータ処理不等式](#thm-info2-mutual-dpi)が適用でき、

$$
1-h_2(s)\le1-h_2(q)
$$

です。従ってこの模型では $h_2(s)\ge h_2(q)$ も分かります。

**(4)** $q=0$ なら $Y=X$ で $I(X;Y)=1$ です。さらに $r=1/2$ なら $s=1/2$ となり、$Z$ は $X$ と独立、$I(X;Z)=0$ です。反対に $q=1/2$ なら $Y$ は初めから $X$ と独立です。このとき $s=1/2+r-r=1/2$ なので、どんな $r$ でも $I(X;Y)=I(X;Z)=0$ です。元々失われた情報を後段で復活させることはできません。
<!-- solution-end -->

---

この章の結果は、相対エントロピーが対称な距離ではなくても、**同じ観測操作をした後の区別可能性は増えない**という意味を持つことを示しました。次は多くの記号を長い列として観測し、符号長と確率を結び付ける問題へ進みます。
