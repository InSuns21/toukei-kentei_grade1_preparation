# SLT1-02 PAC学習可能性とNo-Free-Lunch

<!-- definition-example-audit: strict -->

## 1. 訓練誤差ではなく「どの分布でも学べるか」を問う

[前章のBayes超過リスク](../SLT1-01/index.md#def-slt1-01-bayes-excess)は、真の分布 $P$ を固定すれば予測器の良し悪しを定量化できた。しかし、学習者が実際に持つのは未知の $P$ からの標本だけである。[経験リスク最小化](../../ML/ML1-03/index.md#def-ml1-03-erm)で訓練誤差が0でも、観測していない点で間違う場合があった。

では、学習前に「真のリスクをこの値以下に、これ以上の確率で抑えてほしい」と注文したら、**分布を知らない一つの学習算法**はその注文に応えられるだろうか。この問いに対する保証がPAC（probably approximately correct、確率的近似正解）である。「高確率」は標本の抽選について、「近似正解」は母集団リスクについて述べる。二つを混ぜないことが出発点となる。

本章は二値分類に限定する。空でない入力集合 $mathcal X$ に対し、ラベル集合は $mathcal Y=\{0,1\}$、候補は非空の[仮説クラス](../../ML/ML1-01/index.md#def-ml1-01-predictor) $\mathcal H\subseteq\{h:\mathcal X\to\{0,1\}\}$ とする。観測対 $(X,Y)$ の未知の同時分布を $P$、長さ $n\ge1$ の独立同分布標本を $S=((X_i,Y_i))_{i=1}^n\sim P^n$ とする。[0–1損失と母集団リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)は

$$
R_P(h)=P(h(X)\ne Y),\qquad 0\le R_P(h)\le1.
$$

学習算法 $A_n$ は標本 $S$ を受け取り、$\widehat h=A_n(S)\in\mathcal H$ を返す規則である。乱択する算法なら、その乱数を $U$ と書き、$\widehat h=A_n(S,U)$ とする。$U$ は標本・真のラベル規則と独立である。確率 $P_{S,U}$ は標本と算法の乱数の両方について取る（決定的算法では $U$ は不要）。以下の有限支持の反例・可算入力集合では、すべての事象を通常の有限和または可算和で計算できる。

最も簡単な比較を先に見よう。入力が $a$ しかなく、常に $Y=0$ の世界では「0と予測する」規則のリスクは0である。一方、同じ入力に対し $P(Y=1)=0.3$ の世界では、0と予測してもリスクは0.3で、どの決定的二値予測器にもリスク0は不可能である。この違いを区別せずに「正解に近い」を定義すると、そもそも達成不可能な0リスクを要求してしまう。

## 2. realizable：クラス内に完全な正解が存在する場合

まず「理想的な正解が候補にある」という条件を定める。これは学習算法が正解を**知っている**という意味ではない。真の分布に対して、もし正解を知っていれば0–1リスク0となる候補が少なくとも一つ存在する、というモデル側の仮定である。

<a id="def-slt1-02-realizable"></a>

<!-- formal-statement-start -->
> **定義（realizableな分類分布）**  
> 非空集合 $\mathcal X$、二値ラベル $\{0,1\}$、非空仮説クラス $\mathcal H\subseteq\{h:\mathcal X\to\{0,1\}\}$、同時分布 $P$ を固定する。ある $h^*\in\mathcal H$ が存在して

$$
R_P(h^*)=P(h^*(X)\ne Y)=0
$$

> となるとき、$P$ は $\mathcal H$ に関して **realizable（実現可能）** であるという。これは $Y=h^*(X)$ が $P$-確率1で成り立つことと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-02-realizable -->
**定義の確認**。$\mathcal X=\{a,b\}$、$\mathcal H=\{h_0,h_1\}$ で、$h_0\equiv0$、$h_1\equiv1$ とする。$P(X=a)=P(X=b)=1/2$ かつ $Y=0$ が常に成り立つなら $h_0\in\mathcal H$ で $R_P(h_0)=0$、したがってrealizableである。

一方、$P(X=a)=1$、$P(Y=1\mid X=a)=0.3$ なら、$R_P(h_0)=0.3$、$R_P(h_1)=0.7$。候補はこの二つだけなのでリスク0を達成する元がなく、realizableではない。$\inf_{h\in\mathcal H}R_P(h)=0.3$ という正の値を、学習算法の失敗と混同しない。
<!-- definition-example-end -->

realizableな世界では、学習算法が返した予測器のリスク自体が小さいことを要求できる。許容誤差 $\varepsilon$ と失敗確率 $\delta$ は、未知の分布を選ぶ**前に**指定する。

<a id="def-slt1-02-realizable-pac"></a>

<!-- formal-statement-start -->
> **定義（realizable PAC学習可能性）**  
> 二値0–1分類、非空クラス $\mathcal H$ を考える。標本サイズ $n$ ごとに標本から $\mathcal H$ への学習算法 $A_n$ があり、標本に依存しない同じ算法族 $A=(A_n)_{n\ge1}$ を用いるとする。$\mathcal H$ が **realizable PAC学習可能** とは、ある標本数関数 $m:(0,1)^2\to\mathbb N$ が存在し、任意の $\varepsilon,\delta\in(0,1)$、任意の $n\ge m(\varepsilon,\delta)$、任意の $\mathcal H$-realizableな分布 $P$ に対し、$S\sim P^n$ のとき

$$
P_{S,U}\!\left(R_P(A_n(S,U))\le\varepsilon\right)
\ge 1-\delta
$$

> が成り立つことである。乱択しない場合は $U$ を省く。$m$ と $A$ は未知の $P$ に依存してはならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-02-realizable-pac -->
**定義の確認**。上の定数クラス $\mathcal H=\{h_0,h_1\}$ について、realizableな $P$ はラベルが確率1で0か、確率1で1かのどちらかである。算法 $A_n$ を「最初の標本のラベルを全入力で返す定数関数」とする。$n\ge1$ の各realizable分布で、最初のラベルは正しい定数に確率1で一致する。よって $R_P(A_n(S))=0$ が確率1であり、任意の $\varepsilon,\delta$ に対して $m(\varepsilon,\delta)=1$ を選べる。入力 $X$ の分布は未知でもよい。
<!-- definition-example-end -->

## 3. agnostic：候補に完全な正解がなくても比較する

realizableでない分布を含む場合は、出力のリスクを0へ近づけることは要求できない。そこで[クラス内最良リスク](../SLT1-01/index.md#def-slt1-01-approximation)を基準にして、学習が原因で上乗せされた差だけを小さくしたい。これをagnostic（実現可能性を仮定しない）PAC保証という。

<a id="def-slt1-02-agnostic-pac"></a>

<!-- formal-statement-start -->
> **定義（agnostic PAC学習可能性）**  
> 二値0–1分類、非空仮説クラス $\mathcal H$、未知の同時分布 $P$ に対し、$R_{P,\mathcal H}^*=\inf_{h\in\mathcal H}R_P(h)$ とする。$\mathcal H$ が **agnostic PAC学習可能** とは、分布に依存しない算法族 $A=(A_n)_{n\ge1}$ と標本数関数 $m:(0,1)^2\to\mathbb N$ が存在して、任意の $\varepsilon,\delta\in(0,1)$、任意の $n\ge m(\varepsilon,\delta)$、任意の同時分布 $P$ に対して

$$
P_{S,U}\!\left(
R_P(A_n(S,U))-R_{P,\mathcal H}^*\le\varepsilon
\right)\ge1-\delta,
\qquad S\sim P^n
$$

> が成立することである。$P$ はrealizableである必要がなく、$\inf$ が $\mathcal H$ 内で達成されることも要求しない。算法の出力は常に $\mathcal H$ に属する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-02-agnostic-pac -->
**定義の確認**。$\mathcal X=\{a\}$、$\mathcal H=\{h_0,h_1\}$、$P(Y=1)=0.3$ とする。$R_{P,\mathcal H}^*=0.3$ なので、$h_0$ を返す算法はこの $P$ では超過リスク $0.3-0.3=0$、$h_1$ を返す算法は $0.7-0.3=0.4$ である。$\varepsilon=0.1$ なら後者の出力は失敗事象に入る。これは**一つの分布での判定例**であり、前者の算法が全分布に対してagnostic PACであることを証明したわけではない。
<!-- definition-example-end -->

realizable/agnosticの差は「確率の取り方」ではない。どちらも標本と算法の乱数に関する高確率保証であり、対象分布の範囲とリスクの比較基準が異なる。

<a id="prop-slt1-02-agnostic-implies-realizable"></a>

<!-- formal-statement-start -->
> **命題（agnostic PAC保証からrealizable PAC保証への帰着）**  
> 二値0–1損失、非空クラス $\mathcal H$ に対し、ある算法族 $A$ と標本数関数 $m$ がagnostic PACの定義を満たすなら、同じ $A,m$ がrealizable PACの定義も満たす。
<!-- formal-statement-end -->

### 証明の見取り図

realizableならクラス内の最良リスクが0である。agnosticの差からこの0を引くだけでrealizableの式になる。逆向きは、この議論だけからは従わない。

<!-- proof-start -->
### 証明

任意の $\varepsilon,\delta\in(0,1)$、$n\ge m(\varepsilon,\delta)$ とrealizableな $P$ を固定する。[realizableな分類分布](#def-slt1-02-realizable)の条件により $h^*\in\mathcal H$ で $R_P(h^*)=0$ である。0–1損失は非負だから

$$
0\le R_{P,\mathcal H}^*\le R_P(h^*)=0,
\qquad R_{P,\mathcal H}^*=0.
$$

この等式を[agnostic PAC保証](#def-slt1-02-agnostic-pac)の事象に代入すると、同じ確率空間で

$$
\{R_P(A_n(S,U))-R_{P,\mathcal H}^*\le\varepsilon\}
=\{R_P(A_n(S,U))\le\varepsilon\}
$$

である。元の下界 $1-\delta$ がそのまま適用できる。
<!-- proof-end -->

PACの式に現れる $m$ は、どれだけ標本を集めればよいかを表す。表面上似た保証でも、ここへ未知の $P$ を入れてよいかで意味が大きく変わる。保証する全ての分布に共通の標本数が必要である。

<a id="def-slt1-02-sample-complexity"></a>

<!-- formal-statement-start -->
> **定義（PAC標本複雑度）**  
> 二値0–1分類の非空クラス $\mathcal H$ と、realizableまたはagnosticのいずれかのPAC保証を固定する。対応する保証を全ての $\varepsilon,\delta\in(0,1)$、$n\ge m(\varepsilon,\delta)$ で達成する算法族の標本数関数 $m$ を、**PAC標本複雑度の上界**という。保証できる最小の標本数を考えるときも、$\varepsilon,\delta$ とクラス $\mathcal H$ には依存してよいが、未知の分布 $P$ には依存させない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-02-sample-complexity -->
**定義の確認**。定数ラベルのrealizable模型では、前節の算法で $m(\varepsilon,\delta)=1$ が全ての $\varepsilon,\delta\in(0,1)$ に使える。例えば $\varepsilon=0.05,\delta=0.01$ でも1標本でリスク0が確率1で成立する。一方「各 $P$ を知ってから、その $P$ ごとに必要標本数を選ぶ」だけでは分布自由の保証にはならない。
<!-- definition-example-end -->

量化順序を言葉で書き直すと、**一つの算法族と標本数上界を先に用意し、任意の精度・信頼度、十分大きな標本数、任意の許容分布に対して保証する**、という順序である。$P$ を見て算法を選ぶのは反対の順序であり、未知分布からの学習問題を解いていない。

## 4. 有限入力集合なら、全ての二値関数も学べる

「候補が多いと学べない」という直感を、まず反証しておこう。入力点が $M$ 個と固定されていれば、候補が $2^M$ 個あっても、何度も標本を得るうちに確率の大きい入力は観測される。すでに見た点のラベルを保存し、見ていない点だけ仮の値を返せばよい。

記憶型算法は、$S$ に現れた各入力 $x$ ではその観測ラベルを返し、一度も現れていない $x$ では0を返す。realizable条件の下では同じ入力の観測ラベルは確率1で一致するので、この規則は標本から一つの関数を定める（確率0の矛盾標本では任意に同点処理する）。

<a id="thm-slt1-02-finite-domain"></a>

<!-- formal-statement-start -->
> **定理（有限入力集合の記憶型PAC上界）**  
> $M\ge1$ とし、$|\mathcal X|=M$、$\mathcal H=\{0,1\}^{\mathcal X}$ を全二値予測器のクラスとする。$P$ は $\mathcal H$-realizableな任意の同時分布で、$S\sim P^n$ は独立同分布の長さ $n\ge1$ の標本とする。上記の記憶型算法 $A_n$ について、任意の $\varepsilon,\delta\in(0,1)$ で

$$
n\ge\frac{M}{\varepsilon}\log\frac{M}{\delta}
\quad\Longrightarrow\quad
P_S(R_P(A_n(S))>\varepsilon)\le\delta.
$$

> 従ってこのクラスはrealizable PAC学習可能であり、右辺の標本数を切り上げた値が標本複雑度の一つの上界である。
<!-- formal-statement-end -->

### 証明の見取り図

すべての点を観測する必要はない。入力確率 $p_x=P(X=x)$ が $\varepsilon/M$ 以上の**重い点**だけを全て観測できれば、未観測の軽い点の確率の総和は $\varepsilon$ 未満となる。重い点を一つでも見逃す確率を合併上界で抑える。

<!-- proof-start -->
### 証明

realizable条件から $f\in\mathcal H$ があり、$Y=f(X)$ が確率1で成立する。入力点 $x$ の確率を $p_x=P(X=x)$ とする。標本で現れた点では記憶型算法と $f$ が一致するため、出力が誤るのは未観測点に限られる。従って標本 $S$ を固定して

$$
R_P(A_n(S))\le\sum_{x\in\mathcal X}p_x
\boldsymbol{1}_{\{x\text{ が }S\text{ に現れない}\}}.
$$

重い点の集合を $H_\varepsilon=\{x:p_x\ge\varepsilon/M\}$ とする。$H_\varepsilon$ がすべて一度は観測されていれば、上の右辺に残るのは $x\notin H_\varepsilon$ だけであり、各点の重みは $\varepsilon/M$ 未満である。点は高々 $M$ 個だから

$$
R_P(A_n(S))\le\sum_{x\notin H_\varepsilon}p_x
<\frac{M\varepsilon}{M}=\varepsilon
$$

となる（軽い点が空ならリスクは0である）。よって $R_P(A_n(S))>\varepsilon$ の事象では、少なくとも一つの重い点が未観測でなければならない。

固定した重い点 $x$ が $n$ 回の独立な抽選で現れない確率は、各回に現れない確率を掛けて

$$
P_S(x\text{ が未観測})=(1-p_x)^n
\le e^{-np_x}\le e^{-n\varepsilon/M}.
$$

ここで $1-t\le e^{-t}$ を $t=p_x\in[0,1]$ に適用した。重い点は高々 $M$ 個なので、確率の合併上界 $P(\bigcup_x E_x)\le\sum_xP(E_x)$ を使うと

$$
P_S(R_P(A_n(S))>\varepsilon)
\le\sum_{x\in H_\varepsilon}(1-p_x)^n
\le M e^{-n\varepsilon/M}.
$$

$n\ge(M/\varepsilon)\log(M/\delta)$ なら $-n\varepsilon/M\le-\log(M/\delta)$ であるから、最右辺は $M(\delta/M)=\delta$ 以下となる。
<!-- proof-end -->

例えば $M=2$、$\varepsilon=0.1$、$\delta=0.05$ なら、この定理から十分な標本数は $n\ge20\log40$、すなわち $n\ge74$ と分かる。これは保守的な**上界**であり、74回を要しなければ絶対に学べないという下界ではない。重要なのは、$p_a,p_b$ の個々の値を知らなくても同じ数が使える点である。

## 5. 未観測点のラベルは、標本から識別できない

一方、入力点を標本数に応じて増やせるなら何が起こるだろう。$2n$ 個の等確率の入力点に対し、ラベルは各点ごとに0か1を独立かつ公平に割り振る。学習器が何を記憶しても、**標本に現れなかった入力点のラベル**は公平なままである。

ここで使うランダムなラベル割当て $F$ は、失敗する固定分布を見つけるための**証明上の平均化**である。PAC保証の確率に「真の分布をランダムに選ぶ確率」を追加するわけではない。最後に一つの固定ラベル関数 $f$ を選び直すことが核心となる。

<a id="thm-slt1-02-no-free-lunch"></a>

<!-- formal-statement-start -->
> **定理（No-Free-Lunch有限模型）**  
> 整数 $n\ge1$ と $2n$ 個以上の点を持つ入力集合 $\mathcal X$ を固定し、$\mathcal H=\{0,1\}^{\mathcal X}$ とする。任意の学習算法 $A_n$（算法の独立乱数 $U$ を使う場合を含む）に対し、$2n$ 点の集合 $V\subseteq\mathcal X$ とラベル関数 $f:V\to\{0,1\}$ が存在する。$P_f$ を $X$ が $V$ 上一様で $Y=f(X)$ となる分布とすれば、この分布はrealizableであり、$S\sim P_f^n$ に対して

$$
\mathbb E_{S,U}R_{P_f}(A_n(S,U))\ge\frac14,
\qquad
P_{S,U}\!\left(R_{P_f}(A_n(S,U))>\frac18\right)
\ge\frac17.
$$

> 特に、算法が標本に依存した同点規則や乱択を用いても、この存在主張は回避できない。$f$ と $P_f$ は算法と $n$ を固定した後に選ばれる。
<!-- formal-statement-end -->

### 証明の見取り図

標本と無関係に各点のラベルを公平な硬貨で決める。テスト点が一度も標本に現れなかったとき、その正解ラベルは算法の出力と独立なので条件付き誤り確率は $1/2$ である。未観測となる確率は $(1-1/(2n))^n$。全ラベル割当てについて平均した期待リスクの下界から、少なくとも一つの固定割当てが同じ下界を持つ。最後にリスクが0から1の範囲にあることを使い、期待値から失敗確率の下界へ変換する。

<!-- proof-start -->
### 証明

$V=\{x_1,\ldots,x_{2n}\}$ を固定し、各 $j=1,\ldots,2n$ に対し互いに独立な公平ビット $F_j\in\{0,1\}$ を選ぶ。$F=(F_1,\ldots,F_{2n})$ は $2^{2n}$ 通りのラベル割当てを等確率で取る。$F=f$ と固定した世界では、訓練入力 $X_1,\ldots,X_n$ と独立なテスト入力 $X'$ を、いずれも $V$ 上一様に抽選する。対応する訓練ラベルは $Y_i=f(X_i)$、テストラベルは $f(X')$ である。算法の乱数 $U$ も $F,X_i,X'$ と独立にする。

テスト入力が訓練入力のどれにも現れない事象を $E=\{X'\notin\{X_1,\ldots,X_n\}\}$ と置く。$X'=x_j$ と条件付けても、$X_i$ は各回確率 $1/(2n)$ で $x_j$ になる。独立性から

$$
P(E\mid X'=x_j)=\left(1-\frac1{2n}\right)^n,
\qquad
P(E)=\left(1-\frac1{2n}\right)^n.
$$

$E$ と標本中の入力・ラベル、$U$ を固定し、$X'=x_j$ とする。標本の入力は $x_j$ を含まないため、観測ラベルは $F_k$（$k\ne j$）にしか依存しない。独立な $F_j$ は依然として0または1を各確率 $1/2$ で取り、算法の予測 $A_n(S,U)(x_j)$ はこの $F_j$ に依存できない。よって

$$
P_F\bigl(A_n(S,U)(X')\ne F_j\mid E,X',S,U\bigr)=\frac12.
$$

リスクは独立なテスト点で誤る確率なので、$F$、標本、算法乱数、テスト点の順に期待値を取ると

$$
\begin{aligned}
\mathbb E_F\mathbb E_{S,U}R_{P_F}(A_n(S,U))
&=P_{F,S,U,X'}(A_n(S,U)(X')\ne F(X'))\\
&\ge P(E)\,\frac12
=\frac12\left(1-\frac1{2n}\right)^n.
\end{aligned}
$$

$0\le1/(2n)\le1$ に対するBernoulliの不等式 $(1-t)^n\ge1-nt$ を $t=1/(2n)$ に代入すれば

$$
\frac12\left(1-\frac1{2n}\right)^n
\ge\frac12\left(1-\frac{n}{2n}\right)=\frac14.
$$

左辺は有限個の固定関数 $f$ に関する期待リスク $\mathbb E_{S,U}R_{P_f}(A_n(S,U))$ の算術平均である。全てが $1/4$ 未満なら平均も $1/4$ 未満となるため、少なくとも一つの $f$ は期待リスクが $1/4$ 以上となる。その $f$ をここから固定する。$\mathcal H$ は全関数クラスだから、$f$ を $V$ の外で任意に拡張した予測器がリスク0を持ち、$P_f$ はrealizableである。

この固定した $P_f$ について $Z=R_{P_f}(A_n(S,U))\in[0,1]$、$q=P(Z>1/8)$ と置く。$Z\le1/8$ の事象では $Z\le1/8$、残りでも $Z\le1$ だから

$$
\frac14\le\mathbb E Z
\le\frac18(1-q)+1\cdot q
=\frac18+\frac78q.
$$

両辺から $1/8$ を引き $7/8$ で割れば $q\ge(1/8)/(7/8)=1/7$ となる。期待リスクだけでなくPACの失敗確率についても下界が得られた。
<!-- proof-end -->

例えば $n=1$ なら $|V|=2$ で、独立なテスト点が訓練点と異なる確率は $1/2$。そのとき未知ラベルを外す条件付き確率は $1/2$ だから、平均したテスト誤り確率は少なくとも $1/4$ である。「未観測では推測しかできない」という直感を、確率の積 $\frac12\cdot\frac12$ で検算できる。

この定理が否定するのは、**制約のない全関数クラスを、入力集合の大きさに依存しない標本数で、全ての分布に対して学ぶ保証**である。学習器がある特定の分布で優秀に働く可能性を否定していない。

<a id="cor-slt1-02-infinite-domain"></a>

<!-- formal-statement-start -->
> **系（無限入力集合の全二値関数クラスはPAC学習不能）**  
> $\mathcal X$ を可算無限集合、$\mathcal H=\{0,1\}^{\mathcal X}$ とし、有限支持を含む全ての二値分類分布を対象とする。このクラスはrealizable PAC学習可能でない。従ってagnostic PAC学習可能でもない。
<!-- formal-statement-end -->

### 証明の見取り図

もしPAC学習可能なら、$\varepsilon=\delta=1/8$ に対する有限の標本数が一つ存在するはずだ。その標本数 $n$ に対し $2n$ 個の異なる入力を取り、[No-Free-Lunch有限模型](#thm-slt1-02-no-free-lunch)を適用する。

<!-- proof-start -->
### 証明

realizable PAC学習可能と仮定する。[realizable PAC学習可能性](#def-slt1-02-realizable-pac)により、$\varepsilon=\delta=1/8$ である有限の $m(1/8,1/8)$ と算法族が存在する。$n=\max\{1,m(1/8,1/8)\}$ を固定する。$\mathcal X$ は無限なので $2n$ 個の異なる点を選べる。[No-Free-Lunch有限模型](#thm-slt1-02-no-free-lunch)により、あるrealizableな $P_f$ で

$$
P_{S,U}\bigl(R_{P_f}(A_n(S,U))>1/8\bigr)
\ge1/7>1/8=\delta
$$

が成り立つ。これは全てのrealizable分布で失敗確率が $\delta$ 以下という仮定に反する。従ってrealizable PAC学習可能ではない。[agnosticからrealizableへの帰着](#prop-slt1-02-agnostic-implies-realizable)によりagnostic PACでもない。
<!-- proof-end -->

第4節の[有限入力集合のPAC上界](#thm-slt1-02-finite-domain)とは矛盾しない。有限集合の大きさ $M$ を先に固定すれば、標本数は $M$ に依存してよい。無限集合ではどの有限の標本数を先に提案しても、あとから $2n$ 個の入力だけに質量を置いた分布を選べる。保証の量化順序が違うのである。

## 6. どの仮定を外すと、何が壊れるか

ここまでの結論を整理しよう。

| 問い | 得られる結論 | 必要な条件 |
|---|---|---|
| 完全な正解を学べるか | realizable PACはリスクそのものを制御 | クラスにリスク0の候補が存在する分布のみ |
| 完全な正解がなくても学べるか | agnostic PACはクラス内最良との差を制御 | 任意の分布に対して同一算法・標本数上界 |
| 全二値関数を学べるか | 固定有限入力集合では可能 | $M$ を固定し、標本が独立同分布 |
| 制約のない全二値関数を普遍的に学べるか | 可算無限入力集合では不可能 | 有限支持の分布さえ全て許すなら下界が成立 |

有限入力での証明は、重い点を観測できる確率を独立抽選から計算した。標本を同じ一点から複製するなど独立性を失えば、$(1-p_x)^n$ という式が壊れる。一方、No-Free-Lunchは「未観測点のラベルに制約がない」ことを使った。予測器の構造に制約を置き、未観測点のラベルも既観測点から推論できるなら、独立公平ビットという構成はもはや仮説クラスの中に収まらないかもしれない。

次章では、仮説クラスを**有限個に制限**した場合、[固定予測器の経験リスク](../../ML/ML1-01/index.md#thm-ml1-01-unbiased-risk)を一つずつ評価するだけではなく、全ての候補を同時に制御して、具体的なPAC標本数へ進む。

## 演習

### SLT1-02-A01 PAC保証の量化順序
- Level: A
- 目安時間: 10分

二値0–1分類のクラス $\mathcal H$ と学習算法族 $A_n$ を考える。次の二つの文のうちrealizable PACを表すのはどちらか。理由を述べよ。

1. 任意のrealizable分布 $P$ ごとに、$P$ を知った上で算法 $A^{(P)}$ を選べる。
2. 分布に依存しない算法族 $A$ と標本数関数 $m(\varepsilon,\delta)$ が存在し、全てのrealizable分布へ同じ保証を適用できる。

<!-- solution-start -->
#### 詳細解答

正しいのは2である。[realizable PACの定義](#def-slt1-02-realizable-pac)では算法族と標本数関数を分布 $P$ の指定より前に選び、任意の $P$ について $P_{S,U}(R_P(A_n(S,U))\le\varepsilon)\ge1-\delta$ を要求する。1では $P$ のラベル規則を知ってそのまま返すこともできるため、未知分布からの学習を保証していない。
<!-- solution-end -->

### SLT1-02-A02 realizableの判定
- Level: A
- 目安時間: 10分

$\mathcal X=\{a\}$、$\mathcal H=\{h_0,h_1\}$、$h_j(a)=j$ とする。$P(Y=1)=q\in[0,1]$ について、realizableとなる $q$ を全て求め、そうでない場合のクラス内最良リスクを求めよ。

<!-- solution-start -->
#### 詳細解答

$h_0$ が誤るのは $Y=1$ のとき、$h_1$ が誤るのは $Y=0$ のときなので、$R_P(h_0)=q$、$R_P(h_1)=1-q$。[realizableな分類分布](#def-slt1-02-realizable)の条件から、どちらかが0になる必要十分条件は $q=0$ または $q=1$。$0<q<1$ では二つのリスクがともに正で、$R_{P,\mathcal H}^*=\min\{q,1-q\}>0$ である。
<!-- solution-end -->

### SLT1-02-A03 定数ラベルの学習
- Level: A
- 目安時間: 10分

任意の非空入力集合 $\mathcal X$ 上の定数関数クラス $\mathcal H=\{h_0\equiv0,h_1\equiv1\}$ とrealizable分布 $P$ を考える。最初の一標本のラベルを全入力で返す算法について、$m(0.01,0.001)$ の上界と失敗確率を答えよ。

<!-- solution-start -->
#### 詳細解答

realizableなら $P(Y=j)=1$ となる $j\in\{0,1\}$ があり、最初の標本ラベルはその $j$ に確率1で一致する。従って算法が返す $h_j$ はどの入力でも真のラベルと一致し、$R_P(h_j)=0$。1標本以降は失敗事象 $\{R_P(A_n(S))>0.01\}$ の確率が0なので、[標本複雑度の上界](#def-slt1-02-sample-complexity)は $m(0.01,0.001)=1$ とできる。
<!-- solution-end -->

### SLT1-02-A04 未観測点の確率
- Level: A
- 目安時間: 10分

$M=4$ 個の入力が等確率で出る分布から、独立に $n=2$ 回入力を抽選する。一つの固定点 $x$ が二回とも現れない確率と、独立なテスト入力 $X'$ が二つの訓練入力のどちらとも異なる確率を計算せよ。

<!-- solution-start -->
#### 詳細解答

固定点 $x$ は1回の抽選で確率 $1-1/4=3/4$ で現れない。二回の独立性から $P(x\text{ が未観測})=(3/4)^2=9/16$ である。テスト入力 $X'$ は4点のどれにも等確率である。$X'=x$ と条件付けた未観測確率がどの $x$ にも $9/16$ なので、全確率も $\sum_x(1/4)(9/16)=9/16$ となる。
<!-- solution-end -->

### SLT1-02-A05 期待値と高確率の違い
- Level: A
- 目安時間: 10分

確率変数 $Z$ が確率 $1/5$ で1、確率 $4/5$ で0を取るとする。$\mathbb EZ$ と $P(Z>1/8)$ を求め、「期待値が $1/8$ より小さい」という条件と「失敗確率が $1/8$ 以下」という条件が同じか判定せよ。

<!-- solution-start -->
#### 詳細解答

期待値は $1\cdot(1/5)+0\cdot(4/5)=1/5$、失敗確率は $P(Z>1/8)=1/5$ である。この例では両方とも $1/8$ を超えるが、二つの条件は一般には同じではない。例えば確率 $1/2$ で $Z=1/5$、それ以外で0なら $\mathbb EZ=1/10<1/8$ なのに、$P(Z>1/8)=1/2>1/8$ である。逆に確率 $1/10$ で $Z=1$、それ以外で $Z=1/8$ なら $\mathbb EZ=1/10+(9/10)(1/8)=17/80>1/8$ だが、$P(Z>1/8)=1/10<1/8$ である。期待値は値の大きさを重み付けした平均、失敗確率は閾値を超えた頻度である。
<!-- solution-end -->

### SLT1-02-B01 有限入力のPAC上界を導く
- Level: B
- 目安時間: 20分

$|\mathcal X|=M\ge1$、全二値関数クラス、realizableな分布、独立同分布の長さ $n$ の標本を考える。記憶型算法が観測点で真のラベル、未観測点で0を返す。重い点を $p_x\ge\varepsilon/M$ と定め、$P(R_P(A_n(S))>\varepsilon)\le M e^{-n\varepsilon/M}$ を証明せよ。$M=5,\varepsilon=0.2,\delta=0.1$ の十分な整数標本数も求めよ。

<!-- solution-start -->
#### 詳細解答

realizableなので、観測点での予測は正しい。重い点が全て観測済みなら、誤りが起こり得る未観測点は各確率が $\varepsilon/M$ 未満の軽い点だけで、合計は $\varepsilon$ 未満となる。従って $R_P(A_n(S))>\varepsilon$ なら少なくとも一つの重い点が未観測である。

重い点 $x$ が未観測である確率は独立性から $(1-p_x)^n\le e^{-np_x}\le e^{-n\varepsilon/M}$。重い点は高々 $M$ 個なので合併上界を取って $P(R_P(A_n(S))>\varepsilon)\le M e^{-n\varepsilon/M}$。これを $\delta$ 以下にするには

$$
n\ge\frac{M}{\varepsilon}\log\frac{M}{\delta}
=25\log50\approx97.8006
$$

だから $n=98$ で十分である。[有限入力集合のPAC上界](#thm-slt1-02-finite-domain)を別の値で再構成した。
<!-- solution-end -->

### SLT1-02-B02 No-Free-Lunchの期待リスクを検算
- Level: B
- 目安時間: 20分

$V$ は4点、$X$ は $V$ 上一様、訓練標本は独立な2個とする。各点の正解ラベルを独立な公平ビットで決める。任意の学習算法について、全ラベル割当てにわたる平均テストリスクの下界を計算し、少なくとも一つの固定ラベル関数がそれ以上の期待リスクを持つ理由を示せ。

<!-- solution-start -->
#### 詳細解答

独立なテスト入力 $X'$ を固定したとき、一つの訓練入力がそれと異なる確率は $3/4$。2個とも異なる確率は $(3/4)^2=9/16$ である。未観測の $X'$ のラベルは他点のラベル・訓練標本・算法乱数と独立な公平ビットなので、条件付き誤り確率は $1/2$。従って全割当てにわたる平均リスクは

$$
\mathbb E_F\mathbb E_{S,U}R_{P_F}(A_2(S,U))
\ge\frac12\frac9{16}=\frac9{32}.
$$

16通りの $f:V\to\{0,1\}$ に関する期待リスクの算術平均が $9/32$ 以上なので、少なくとも一つの固定 $f$ は期待リスクが $9/32$ 以上である。**ラベル関数を固定する前の平均**と、PAC保証で評価する**固定した分布での標本確率**を区別した。
<!-- solution-end -->

### SLT1-02-B03 期待リスクから失敗確率へ
- Level: B
- 目安時間: 20分

$0\le Z\le1$ がほとんど確実に成り立ち、$\mathbb EZ\ge a$ とする。$0<b<a<1$ を固定し、$P(Z>b)$ の下界を示せ。$a=1/4,b=1/8$ を代入せよ。

<!-- solution-start -->
#### 詳細解答

$q=P(Z>b)$ と置く。事象 $Z\le b$ では $Z\le b$、事象 $Z>b$ では $Z\le1$ なので、期待値を二事象に分ければ

$$
\begin{aligned}
\mathbb EZ
&=\mathbb E[Z\boldsymbol{1}_{\{Z\le b\}}]
 +\mathbb E[Z\boldsymbol{1}_{\{Z>b\}}]\\
&\le bP(Z\le b)+P(Z>b)
=b+(1-b)q.
\end{aligned}
$$

仮定 $a\le\mathbb EZ$ と合わせて $(1-b)q\ge a-b$ となる。$1-b>0$ で割り

$$
P(Z>b)\ge\frac{a-b}{1-b}.
$$

$a=1/4,b=1/8$ なら $(1/4-1/8)/(1-1/8)=(1/8)/(7/8)=1/7$。これは[No-Free-Lunch有限模型](#thm-slt1-02-no-free-lunch)の高確率下界に使った変換である。
<!-- solution-end -->

### SLT1-02-B04 有限集合と無限集合を取り違えない
- Level: B
- 目安時間: 20分

固定した5点の入力集合と全二値関数クラスについて、realizable PAC学習可能か答えよ。次に可算無限入力集合へ置き換えた場合、同じ結論が成立するか答えよ。いずれも標本数 $n$ と入力点数 $M$ の量化順序で説明せよ。

<!-- solution-start -->
#### 詳細解答

5点の場合は[有限入力集合のPAC上界](#thm-slt1-02-finite-domain)に $M=5$ を固定して代入でき、任意の $\varepsilon,\delta$ に対して有限の $m(\varepsilon,\delta)=\lceil(5/\varepsilon)\log(5/\delta)\rceil$ を先に選べる。分布をその後に任意に選んでも保証されるのでrealizable PAC学習可能である。

可算無限の場合は、どんな有限 $n$ を先に選んでも $2n$ 個の異なる点を取れる。[No-Free-Lunch有限模型](#thm-slt1-02-no-free-lunch)はその点だけに質量を持つrealizable分布を与え、$\varepsilon=\delta=1/8$ の保証に反する。有限の場合は $M$ が先に固定され、無限の場合は算法と $n$ の後に難しい有限支持分布を選べることが違いである。
<!-- solution-end -->

### SLT1-02-C01 一般の点数でNo-Free-Lunchを再構成
- Level: C
- 目安時間: 35分

整数 $M\ge2$、$n\ge1$ と $M$ 点の入力集合 $V$ を固定する。$X$ は $V$ 上一様、ラベル関数 $F:V\to\{0,1\}$ は各点で独立な公平ビットで生成する。任意の決定的または乱択学習算法 $A_n$ に対し、次を示せ。

1. 全 $2^M$ 通りのラベル関数にわたる平均期待リスクは、$\frac12(1-1/M)^n$ 以上である。
2. 少なくとも一つの固定ラベル関数 $f$ について同じ期待リスク下界が成立する。
3. $a=\frac12(1-1/M)^n$、$0<b<a$ のとき、この $f$ について $P_{S,U}(R_{P_f}(A_n(S,U))>b)\ge(a-b)/(1-b)$ を示せ。
4. $M=2n$、$b=1/8$ の場合に、失敗確率が少なくとも $1/7$ となる理由を説明し、固定した有限 $M$ でのPAC可能性とは矛盾しない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** 独立なテスト点 $X'$ は一様で、訓練入力 $X_i$ もそれぞれ一様だから、$X'$ を固定すると各回にそれが現れない確率は $1-1/M$。独立な $n$ 回の全てで現れない確率は

$$
P(X'\notin\{X_1,\ldots,X_n\})=(1-1/M)^n.
$$

この事象では $F(X')$ は訓練で観測されたラベルとも算法の独立乱数とも独立で、0と1が等確率である。算法がどちらを予測しても条件付き誤り確率は $1/2$。未観測以外の事象での誤り確率は非負なので

$$
\mathbb E_F\mathbb E_{S,U}R_{P_F}(A_n(S,U))
\ge\frac12(1-1/M)^n=a.
$$

**2.** 左辺は有限個 $2^M$ の $f$ に関する $\mathbb E_{S,U}R_{P_f}(A_n(S,U))$ の平均である。全てが $a$ 未満なら平均も $a$ 未満となり矛盾する。よって少なくとも一つの $f$ が下界を達成する。以後その関数を固定する。

**3.** $Z=R_{P_f}(A_n(S,U))$ と $q=P(Z>b)$ を置くと $0\le Z\le1$ であり、$\mathbb EZ\ge a$。二事象で分割して

$$
a\le\mathbb EZ\le b(1-q)+q=b+(1-b)q.
$$

$1-b>0$ なので、$q\ge(a-b)/(1-b)$ が従う。

**4.** $M=2n$ ならBernoulliの不等式から $(1-1/(2n))^n\ge1-n/(2n)=1/2$。従って $a\ge1/4$、$b=1/8<a$ で

$$
q\ge\frac{a-1/8}{1-1/8}
\ge\frac{1/4-1/8}{7/8}=\frac17.
$$

固定有限の $M$ なら、標本数を十分増やせば $(1-1/M)^n$ 自体が0へ収束する。この下界は固定 $M$ での学習可能性を否定しない。PAC学習不能を示すときは、どの有限の $n$ を提示されても、それに合わせて**少なくとも $2n$ 点を持つ共通の無限入力集合から分布を選ぶ**という量化順序が必要である。
<!-- solution-end -->

---

## 次に進む

PAC学習可能性は「どんな分布でも」という強い約束であり、No-Free-Lunchは制約のないラベル関数にはその約束ができないことを示した。次のSLT1-03では、仮説の個数を有限の $N$ に制限し、一つの固定候補に対する集中不等式を全候補へ同時に広げる。そこで初めて、未知分布に依存しない有用な標本数上界が得られる。
