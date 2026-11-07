# SLT2-18 分布シフト下の不可能性

<!-- definition-example-audit: strict -->

今までの[有限仮説クラスの同時汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)や[情報量による期待汎化界](../SLT2-17/index.md#thm-slt2-17-information-bound)は、学習標本も評価に使う未知データも**共通の $P$** から生じる場面を扱ってきた。現実には、別の地域へ予測器を導入する、新しい年代へ適用する、収集方法が変わる、といった事情で入力やラベルの分布が変わる。

このとき「訓練誤りが小さい」「標本数が大きい」「ニューラルネットの学習力学を正確に解いた」という事実だけでは、**別分布での誤り**は分からない。何を追加すれば分かるのかを、まず二点入力の計算から調べる。

本章では入力集合 $\mathcal X$ を有限、ラベル集合を $\mathcal Y=\{0,1\}$ とし、予測器 $h:\mathcal X\to\{0,1\}$ の損失は $\ell(h,(x,y))=\boldsymbol1\{h(x)\ne y\}$ とする。有限集合なので確率・条件付き確率は和で計算できる。確率的算法の乱数がある場合、その期待値も明示して扱う。

前提講座：[ML1-21 共変量シフトの定義](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)、[SLT1-03 固定仮説のリスク偏差](../SLT1-03/index.md#thm-slt1-03-fixed-risk)、[SLT1-04 ERMの決定論的比較](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)、[SLT1-18 汎化保証の適用条件](../SLT1-18/index.md#thm-slt1-18-fixed-menu)、[SLT2-17 情報量による期待保証](../SLT2-17/index.md#thm-slt2-17-information-bound)。

## 1. 同じ分類器でも、どの分布で試すかでリスクが変わる

入力とラベルの組 $(X,Y)$ を観測する学習側の結合確率分布を $P$、実運用で評価したい運用側の結合確率分布を $Q$ と書く。$P_X(x)=P(X=x)$ と $Q_X(x)=Q(X=x)$ は入力だけを取り出した周辺分布であり、正の確率を持つ入力では $P(Y=1\mid X=x)$ と $Q(Y=1\mid X=x)$ がラベルの条件付き確率になる。$P$ からの標本を増やすだけで $Q$ の性質まで分かるかどうかは、この二種類の確率の関係による。

有限集合 $\mathcal X\times\{0,1\}$ 上の分布 $P,Q$ に対して訓練リスクと評価リスクは、それぞれ

$$
R_P(h)=\sum_{x,y}P(X=x,Y=y)\boldsymbol1\{h(x)\ne y\},
\qquad
R_Q(h)=\sum_{x,y}Q(X=x,Y=y)\boldsymbol1\{h(x)\ne y\}
$$

と区別する。既習の[共変量シフトの定義](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)は、まず $Q_X(x)>0$ の入力なら $P_X(x)>0$ であること（評価supportの訓練supportへの包含）を要求し、その各入力で

$$
P(Y=y\mid X=x)=Q(Y=y\mid X=x)
\quad(y=0,1)
$$

を要求する。したがって「入力割合だけが変わる」は単なる言葉の説明ではなく、**support包含と条件付きラベル不変性の二条件**を意味する。$P_X(x)=0$ の点では $P(Y\mid X=x)$ 自体を観測分布から決定できないので、共通supportに限った等式だけでは不十分である。

入力の周辺分布が変化し、ラベルの条件付き法則は共通の入力で変わらない、という二つを分けて読む。ラベルの周辺分布 $P_Y,Q_Y$ はこの条件の下でも一般には変わる。例えば、ラベル1が多い入力の頻度だけを増やしても、全体のラベル1の割合は増える。

### 直接例：二つの地域の入力割合が逆転する

$\mathcal X=\{a,b\}$ とし、訓練と評価の入力確率を

| 入力 | $P_X$ | $Q_X$ | $P(Y=1\mid X)$ | $Q(Y=1\mid X)$ |
| --- | ---: | ---: | ---: | ---: |
| $a$ | $3/4$ | $1/4$ | $0$ | $0$ |
| $b$ | $1/4$ | $3/4$ | $1$ | $1$ |

とする。各列の入力確率は足して1、ラベルはどちらの分布でも $a\mapsto0,b\mapsto1$ と決まる。どちらの入力も $P_X>0$ でsupport包含が成立し、条件付き確率も一致するので、[共変量シフトの二条件](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)を満たす。常に0を予測する $h_0$ は $b$ のときだけ間違えるので、

$$
R_P(h_0)=P_X(b)=\frac14,
\qquad
R_Q(h_0)=Q_X(b)=\frac34.
$$

同じ予測器に対してリスクが三倍になった。しかし $h_*(a)=0,h_*(b)=1$ なら、両分布でリスクは0である。**入力割合だけからリスクは変わるが、条件付きラベルが不変なら同じ最良分類器が存在することもある**。この例では両入力の確率が正なので、未観測領域での条件付き確率の曖昧さもない。

## 2. 追加仮定の下で評価リスクを計算する

有限入力で分布 $D_X$ の **support（台）** とは、$D_X(x)>0$ となる入力全体の集合 $\operatorname{supp}(D_X)$ である。[既習の共変量シフト](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)は、評価入力のsupportが訓練入力のsupportへ含まれることを要求する。このとき評価時の各入力について訓練時の条件付きラベル確率が定義される。

このとき、訓練で観測されやすいか評価で重要かの違いを、入力ごとの比で補正したい。比はラベルではなく**入力の確率**に対して作る。

<a id="def-slt2-18-importance"></a>

<!-- formal-statement-start -->
> **定義（既知で有界な重要度重み）**  
> 有限入力集合 $\mathcal X$ 上の分布 $P,Q$ が[共変量シフト](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)を満たすとする。既習の重要度重み $w(x)=Q_X(x)/P_X(x)$（$P_X(x)>0$）が標本を観測する前から既知の確定関数であり、ある既知の有限定数 $B$ について

$$
0\le w(x)\le B\quad(P_X(x)>0)
$$

> が成り立つとき、この分布対は**既知で有界な重要度重み**を持つという。$P_X(x)=0$ の点は評価側でも確率0であり、重みの値を0と定める。この取り決めにより、$w$ は全入力で有限な非負関数となる。
<!-- formal-statement-end -->

重みの比は $P_X(x)>0$ に限定したので零除算がなく、共変量シフトのsupport条件により $Q$ 側の正の確率をすべて重みで表現できる。和の順を一度書くと、

$$
\mathbb E_{X\sim P_X}w(X)
=\sum_{x:P_X(x)>0}P_X(x)\frac{Q_X(x)}{P_X(x)}
=\sum_xQ_X(x)=1.
$$

従って重みの $P_X$ 平均は1であり、$B\ge1$ が必要である。これは大きな重みの存在を禁止するものではない。

<!-- definition-example-start: def-slt2-18-importance -->
### 直接例：重みを掛けると二地域の比率が入れ替わる

第1節の例では両入力が共通supportにあり、

$$
w(a)=\frac{1/4}{3/4}=\frac13,
\qquad
w(b)=\frac{3/4}{1/4}=3,
\qquad B=3.
$$

**定義の確認**：両入力の比は正で有限、support包含と条件付きラベル一致は第1節で確認済みである。標本を観測する前に周辺分布が既知なら $w$ も確定し、最大値は3なので $B=3$ を選べる。さらに

$$
\frac34\cdot\frac13+\frac14\cdot3
=\frac14+\frac34=1.
$$

訓練で多すぎる $a$ の寄与を $1/3$ に、訓練で少ない $b$ の寄与を3に変更できる。常に0を予測する $h_0$ は $b$ で損失1、$a$ で損失0なので、

$$
\mathbb E_P[w(X)\ell(h_0,(X,Y))]
=\frac34\cdot\frac13\cdot0+\frac14\cdot3\cdot1
=\frac34=R_Q(h_0).
$$

このように、重み付き訓練分布のリスクが評価リスクに一致する。
<!-- definition-example-end -->

### 既習の重み付け恒等式を導出し直す

[共変量シフトのリスク重み付け](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)により、有限集合上の共変量シフトとsupport包含の下では、任意の固定予測器 $h$ について

$$
R_Q(h)=\mathbb E_{(X,Y)\sim P}
\left[w(X)\boldsymbol1\{h(X)\ne Y\}\right].
$$

となる。以下で、元の命題を本章の記法で展開する。評価リスクを $Q_X$ と $Q(Y\mid X)$ に分解し、support包含の下で条件付きラベル確率を $P$ のものへ置き換え、$Q_X(x)=P_X(x)w(x)$ を代入する。この順序が重要である。

$P_X(x)>0$ に対して $L_P(h,x)=\sum_{y=0}^1P(Y=y\mid X=x)\ell(h,(x,y))$ と置く。$Q_X(x)>0$ のとき、support包含とcovariate shiftにより、対応する $Q$ の条件付き平均 $L_Q(h,x)$ は $L_P(h,x)$ に一致する。従って

$$
\begin{aligned}
R_Q(h)
&=\sum_{x:Q_X(x)>0}Q_X(x)L_Q(h,x)\\
&=\sum_{x:Q_X(x)>0}Q_X(x)L_P(h,x)\\
&=\sum_{x:P_X(x)>0}P_X(x)w(x)L_P(h,x).
\end{aligned}
$$

最後の等式では $Q_X(x)=0$ の点の重みは零なので和へ加えても値は変わらない。さらに条件付き平均の定義を戻すと

$$
\begin{aligned}
R_Q(h)
&=\sum_{x:P_X(x)>0}\sum_{y=0}^1
P_X(x)P(Y=y\mid X=x)w(x)\ell(h,(x,y))\\
&=\sum_{x,y}P(X=x,Y=y)w(x)\ell(h,(x,y))\\
&=\mathbb E_P[w(X)\ell(h,(X,Y))].
\end{aligned}
$$

すべて有限和なので積分交換の追加条件は要らない。$\ell$ を0–1損失に取れば上の等式となり、任意の有界損失についても同じ導出である。

この等式は**期待値の同一性**であり、訓練標本だけで評価リスクを誤差ゼロで知れるという意味ではない。$w$ 自体が未知で訓練標本から推定される場合も、推定誤差と依存性を別途扱う必要がある。以下の保証では、$w$ は学習標本より前に既知の確定関数であると仮定する。

<a id="thm-slt2-18-weighted-uniform"></a>

<!-- formal-statement-start -->
> **定理（有界な既知重要度重みによる有限クラス保証）**  
> 有限入力・二値ラベル上の分布 $P,Q$ が[共変量シフト](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)を満たし、[既知で有界な重要度重み](#def-slt2-18-importance) $w$ が $0\le w(x)\le B<\infty$（$P_X(x)>0$）を満たすとする。$S=((X_i,Y_i))_{i=1}^n\sim P^n$、$n\ge1$、$\mathcal H$ は標本を見る前に固定された非空有限予測器集合、$M=|\mathcal H|$、$\delta\in(0,1)$ とする。重み付き経験リスクを

$$
\widehat R_{S,w}(h)=\frac1n\sum_{i=1}^n
w(X_i)\boldsymbol1\{h(X_i)\ne Y_i\}
$$

> と置けば、確率少なくとも $1-\delta$ で全 $h\in\mathcal H$ に同時に

$$
\left|R_Q(h)-\widehat R_{S,w}(h)\right|
\le B\sqrt{\frac{\ln(2M/\delta)}{2n}}
=:r_n.
$$

> さらに $\widehat h\in\mathcal H$ が $\widehat R_{S,w}(\widehat h)\le\min_{h\in\mathcal H}\widehat R_{S,w}(h)+\eta$（$\eta\ge0$）を満たすなら、同じ事象上で

$$
R_Q(\widehat h)-\min_{h\in\mathcal H}R_Q(h)
\le2r_n+\eta.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定した $h$ に対しては損失に重みを掛けても $[0,B]$ に収まる。従って[固定仮説のHoeffding型偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)を、上限を $B$ に伸縮して使い、$M$ 候補を合併評価する。後半は[一様偏差からERMへ渡す比較](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)を重み付きリスクで書き直す。

<!-- proof-start -->
### 証明

$h$ を標本の前に固定し、$U_i(h)=w(X_i)\boldsymbol1\{h(X_i)\ne Y_i\}$ とする。$S\sim P^n$ なので $U_1(h),\ldots,U_n(h)$ は独立同分布で、$0\le U_i(h)\le B$。そして[共変量シフトのリスク重み付け](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)により $\mathbb E_PU_i(h)=R_Q(h)$。$B>0$ なので $U_i(h)/B\in[0,1]$ に[固定仮説の偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)を適用すれば、$t>0$ に対し

$$
\begin{aligned}
P^n\!\left(\left|\widehat R_{S,w}(h)-R_Q(h)\right|>t\right)
&=P^n\!\left(\left|\frac1n\sum_i\frac{U_i(h)}B
-\frac{R_Q(h)}B\right|>\frac tB\right)\\
&\le2\exp\left(-\frac{2nt^2}{B^2}\right).
\end{aligned}
$$

$\mathcal H$ は固定有限集合なので失敗事象の合併確率は高々 $2M\exp(-2nt^2/B^2)$。$t=B\sqrt{\ln(2M/\delta)/(2n)}$ と選ぶと、指数は $-\ln(2M/\delta)$ になり、上界はちょうど $\delta$。従って同時偏差事象の確率は少なくとも $1-\delta$ である。

この同時偏差事象上で、有限非空 $\mathcal H$ の評価リスク最小元を $h_Q^*$ と置くと、

$$
\begin{aligned}
R_Q(\widehat h)
&\le\widehat R_{S,w}(\widehat h)+r_n\\
&\le\widehat R_{S,w}(h_Q^*)+\eta+r_n\\
&\le R_Q(h_Q^*)+2r_n+\eta.
\end{aligned}
$$

第1・3行は同時偏差、第2行は近似ERMの仮定である。$\widehat h$ が標本依存でも、全候補への同時事象を先に作ったので適用できる。$\square$
<!-- proof-end -->

例えば $M=4,B=3,n=400,\delta=0.05$ なら $r_n=3\sqrt{\ln160/800}\approx0.239$ となる。一方、同じ $M,n$ の通常のリスク偏差半径は $\sqrt{\ln160/800}\approx0.080$ である。重みの上限が大きいほど、評価分布のために使える有限標本保証は弱くなる。二倍の $r_n$ が1を超える場合は、0–1リスクの自明な上限より有益でないこともある。

## 3. 評価時だけ現れる入力のラベルは分からない

ここからは、追加条件が欠けるときの不可能性を考える。アルゴリズムは訓練側のラベル付き標本を受け取るほか、評価側の**ラベルなし入力**をいくら受け取ってもよいとする。二つの世界でアルゴリズムへ渡る観測の確率法則が同じなら、その観測だけから二世界のどちらかを識別する方法はない。

<a id="prop-slt2-18-support-impossible"></a>

<!-- formal-statement-start -->
> **命題（訓練support外のラベル識別不能）**  
> $\mathcal X=\{a,b\}$ とし、訓練分布 $P$ は $(X,Y)=(a,0)$ に確率1を置く。評価分布は二通りあり、$Q_0$ は $(b,0)$ に確率1、$Q_1$ は $(b,1)$ に確率1を置く。任意の算法 $A$ が $P$ からの任意個のラベル付き標本と、評価分布からの任意個のラベルなし入力を使い、確率的な二値予測器 $\widehat h$ を返すとしても、

$$
\max_{j\in\{0,1\}}\mathbb E_A[R_{Q_j}(\widehat h)]
\ge\frac12.
$$

> $\mathcal H$ が定数分類器 $h_0,h_1$ を含めば両世界で $\min_{h\in\mathcal H}R_{Q_j}(h)=0$ なので、同じ下限は最悪世界の期待クラス内超過リスクにも成立する。
<!-- formal-statement-end -->

### 証明の見取り図

どちらの世界でも訓練では $(a,0)$、評価のラベルなし入力では $b$ しか見ない。同じ観測と同じ内部乱数に対して算法は同じ $\widehat h(b)$ を出す。しかしその予測は $Q_0$ と $Q_1$ の片方で必ず誤る。

<!-- proof-start -->
### 証明

$P$ は固定されているので訓練標本はどちらの世界でも $(a,0)$ の列である。また $Q_{0,X}(b)=Q_{1,X}(b)=1$ なので、評価側のラベルなし入力も $b$ の列である。従って内部乱数を含めて算法の出力の分布は両世界で同じになる。

$p=\Pr_A(\widehat h(b)=1)$ と置くと $0\le p\le1$。$Q_0$ では $b$ の正しいラベルは0、$Q_1$ では1だから

$$
\mathbb E_A R_{Q_0}(\widehat h)=p,
\qquad
\mathbb E_A R_{Q_1}(\widehat h)=1-p.
$$

二つの平均は $(p+1-p)/2=1/2$ なので、最大値は少なくとも $1/2$。定数分類器のうち $h_j(x)=j$ は $Q_j$ でリスク0を達成するから、二世界それぞれで最良リスク0である。$\square$
<!-- proof-end -->

この反例では $\operatorname{supp}(Q_X)=\{b\}$ が $\operatorname{supp}(P_X)=\{a\}$ に含まれない。共通supportにおける条件付きラベルの等式だけなら空集合上の条件にすぎず、$b$ での訓練条件付きラベルはそもそも定義されない。[ML1-21の共変量シフト](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)はsupport包含も要求するので、この分布対は共変量シフトに該当しない。**未観測入力のラベルが一意に決まると考えてはならない。**

## 4. supportが同じでも、まれな領域では有限標本が足りない

support包含は等式の成立に必要だが、それだけでは標本数に依らない一律の精度を与えない。訓練時には確率 $\varepsilon$ しかない入力を、評価時には確率 $1/2$ で使う模型を作る。いずれの世界でも条件付きラベルは訓練と評価で一致させるので、第3節とは違って**covariate shiftを完全に満たす**。

<a id="prop-slt2-18-rare-region"></a>

<!-- formal-statement-start -->
> **命題（support一致でも共通の比上限なしでは一様保証がない）**
> $n\ge1$、$0<\varepsilon<1/2$ とし、$\mathcal X=\{a,b\}$ で $P_X(b)=\varepsilon$、$Q_X(b)=1/2$ とする。二世界 $j=0,1$ のそれぞれで、訓練・評価の条件付きラベルを共通に $Y(a)=0,Y(b)=j$ とする。算法 $A$ は $n$ 個の独立な訓練ラベル付き標本と、評価側の任意個のラベルなし入力を見て予測器 $\widehat h$ を返す。期待値を訓練標本・評価側のラベルなし入力・算法内部の全乱数について取ると、二世界のいずれかでは

$$
\mathbb E[R_{Q_j}(\widehat h)]
\ge\frac{(1-\varepsilon)^n}{4}.
$$

> 各世界の最良二値予測器の評価リスクは0である。特に $\varepsilon=1/(2n)$ と選べば、どの $n$ についても二世界のうち少なくとも一つで期待超過リスクが $1/8$ 以上になる。
<!-- formal-statement-end -->

### 証明の見取り図

$b$ が訓練に一度も出ない事象では、どちらの世界でも観測は $a$ とラベル0だけで、評価入力の分布も同じである。この事象の確率は $(1-\varepsilon)^n$。その上で、$b$ で二世界の誤りを平均すると少なくとも $1/4$ の評価リスクが残る。

<!-- proof-start -->
### 証明

$E=\{X_1=\cdots=X_n=a\}$ と置く。訓練入力は独立、$P_X(a)=1-\varepsilon$ だから、両世界で $\Pr(E)=(1-\varepsilon)^n$。$E$ 上では全訓練ラベルが0であり、入力・ラベル列の条件付き分布が同じである。ラベルなし評価入力の分布もどちらも $Q_X(a)=Q_X(b)=1/2$ なので、算法の出力分布は $E$ で条件付けたとき二世界で同じである。

この共通条件付き出力分布に対して $p=\Pr(\widehat h(b)=1\mid E)$ とする。ここでは $E$ で条件付けた訓練標本、評価側のラベルなし入力、算法内部の乱数をすべて平均する。世界0の $b$ での条件付き期待誤りは $p$、世界1では $1-p$。入力 $b$ の評価確率は $1/2$ だから、$a$ での非負の誤りを捨てても

$$
\begin{aligned}
\mathbb E[R_{Q_0}(\widehat h)\mid E]&\ge\frac p2,\\
\mathbb E[R_{Q_1}(\widehat h)\mid E]&\ge\frac{1-p}{2}.
\end{aligned}
$$

二世界の右辺を加えると $1/2$ となり、どちらか一方では条件付き期待リスクが少なくとも $1/4$。無条件期待リスクは $E$ での寄与より小さくならず、さらに二世界の和を取れば

$$
\mathbb E R_{Q_0}(\widehat h)
+\mathbb E R_{Q_1}(\widehat h)
\ge\Pr(E)\left(\frac p2+\frac{1-p}{2}\right)
=\frac{(1-\varepsilon)^n}{2}.
$$

従って最大値はその半分以上である。どちらの世界でも $a$ では0、$b$ では $j$ と予測する関数が評価リスク0を達成する。

$\varepsilon=1/(2n)$ の場合、$b$ が少なくとも一度現れる確率は合併上界により高々 $n\varepsilon=1/2$ だから $\Pr(E)\ge1/2$。よって最大期待リスクは $(1/2)/4=1/8$ 以上となる。$\square$
<!-- proof-end -->

この二世界では入力 $a,b$ とも訓練・評価で正の確率を持ち、条件付きラベルも一致する。しかし重要度重みは

$$
w(a)=\frac{1/2}{1-\varepsilon},
\qquad
w(b)=\frac{1/2}{\varepsilon}=\frac1{2\varepsilon}.
$$

$\varepsilon=1/(2n)$ では $w(b)=n$ であり、前節の[有界重要度比の同時界](#thm-slt2-18-weighted-uniform)を標本数に無関係な共通 $B$ で適用できない。各固定 $\varepsilon>0$ なら重みは有限で、$n\to\infty$ とともに評価精度を改善できる。反例が否定したのは、**$\varepsilon$ を制限せずあらゆる分布対で同じ標本数保証を与えること**であり、すべての固定分布で学習が不可能という主張ではない。

## 5. 入力分布が全く同じでもラベルが変わり得る

入力の分布だけを観測しても、$Q(Y\mid X)$ を知ったことにはならない。ラベルの条件付き法則が変化すれば、第2節の[重要度表示](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)の置換が失敗する。

<a id="prop-slt2-18-label-mismatch"></a>

<!-- formal-statement-start -->
> **命題（入力周辺一致だけでは評価ラベルを識別できない）**  
> $\mathcal X=\{a\}$ とし、訓練分布は $P(X=a,Y=0)=1$ とする。評価分布 $Q_0,Q_1$ はそれぞれ $Q_j(X=a,Y=j)=1$ とする。任意個の $P$ のラベル付き標本と、任意個の評価側のラベルなし入力を使う確率的算法 $A$ に対し、

$$
\max_{j\in\{0,1\}}\mathbb E_A[R_{Q_j}(\widehat h)]
\ge\frac12,
$$

> ただし各世界で最良分類器はリスク0を達成する。$P_X=Q_{0,X}=Q_{1,X}$ でsupportも一致するが、$Q_1$ はcovariate shiftの条件を満たさない。
<!-- formal-statement-end -->

### 証明の見取り図

訓練のラベルは常に0、評価入力は常に $a$ であり、世界0と1から算法が受ける情報は同じである。世界を変えると評価時の正解だけが反転する。

<!-- proof-start -->
### 証明

算法の出力は両世界で同じ分布になるので、$p=\Pr_A(\widehat h(a)=1)$ と置ける。世界0の期待リスクは $p$、世界1では $1-p$。従って $\max\{p,1-p\}\ge1/2$。各世界の定数分類器 $h_j(a)=j$ はリスク0を達成する。

一方、$P_X(a)=Q_{j,X}(a)=1$ より重みは $w(a)=1$ だが、世界1の $h_0$ について

$$
\mathbb E_P[w(X)\ell(h_0,(X,Y))]=0,
\qquad R_{Q_1}(h_0)=1.
$$

等式が破綻したのは重みの計算ではなく $P(Y=0\mid a)=1\ne0=Q_1(Y=0\mid a)$ のためである。$\square$
<!-- proof-end -->

[ML1-21のラベルシフト](../../ML/ML1-21/index.md#def-ml1-21-label-shift)は、$P_Y\ne Q_Y$ に加えて入力の条件付き分布 $P(X\mid Y)=Q(X\mid Y)$ を保つモデルを指す。本節の反例はラベルの条件付き法則 $P(Y\mid X)$ が変わる例であって、任意の分布変更を無条件にラベルシフトと同一視しない。必要な仮定を条件付き確率の**向き**まで指定することが大切である。

## 6. どの理論が何を保証するのか

統計的学習理論IとIIで得た結果を、評価対象の違いで整理する。どれも有用な定理だが、結論の確率量・模型・評価分布を区別しなければ、分布外性能を示す証拠にはならない。

| 既習の結果 | 数学的に保証するもの | 評価分布を変えたとき必要な確認 |
| --- | --- | --- |
| [有限仮説クラスの同時界](../SLT1-03/index.md#thm-slt1-03-finite-uniform) | 独立同分布（independent and identically distributed; iid）・有界損失の同一 $P$ で全候補の $R_P-\widehat R_P$ を高確率制御 | $R_Q$ にはそのまま代入できず、分布関係が必要 |
| [近似ERMの超過リスク比較](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle) | 評価した同じリスクについて一様偏差から超過リスクを導く | $Q$ での偏差事象が別途必要。第2節の重み付き版なら可 |
| [独立検証標本の保証](../SLT1-18/index.md#thm-slt1-18-independent-validation) | 検証標本と候補構築が独立なら、その検証分布のリスクを制御 | 検証標本が $P$ なら $Q$ の保証にはならない |
| [相互情報量の期待汎化界](../SLT2-17/index.md#thm-slt2-17-information-bound) | 同一 $P$ の平均ギャップ $\lvert\mathbb E(R_P-\widehat R_P)\rvert$ | $Q$ との関係を別に示す。高確率保証へ読み替えない |
| [固定kernelの勾配力学](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum) | 指定した訓練Gram行列上の時間発展 | 未観測入力でのラベルや $R_Q$ は決定しない |
| [無限幅NTKの有限時間評価](../SLT2-10/index.md#thm-slt2-10-finite-time-drift) | 特定の幅・初期化・時間区間での近似と核変化 | 入力・時間・分布の対象を勝手に拡張しない |
| [mean-field粒子極限](../SLT2-14/index.md#thm-slt2-14-particle-limit) | 条件を満たす有限時間・粒子模型の収束 | 訓練力学が分かっても任意の評価分布の低リスクは従わない |
| [有界重要度重みの同時界](#thm-slt2-18-weighted-uniform) | $P^n$ から $Q$ の全固定有限候補を高確率評価 | support包含・条件付き法則一致・既知の有界重みが必要 |

例えば、訓練側で損失を0にするパラメータを正確に選べても、第3節のように評価入力が訓練support外へ出れば、そのラベルは識別できない。計算アルゴリズムやモデルの表現力の改善とは別に、**何を観測したか**に由来する情報上の限界がある。

本章の有限模型は、Ben-David, Lu, Luu, Pál (2010), [*Impossibility Theorems for Domain Adaptation*](https://proceedings.mlr.press/v9/david10a.html) が指摘した「入力分布の類似性・共通に良い分類器の存在・covariate shiftの各条件を区別する」という問題意識を、手計算できる形で示している。ここで証明した命題は有限二点模型の主張であり、同論文の一般定理を証明済みとして引用しているわけではない。

### 判断の順序

未知の評価分布に対して性能保証を考えるときは、次を順に確認する。

1. **何を評価するか**：訓練リスク $R_P$ か評価リスク $R_Q$ か。期待・高確率・最悪分布のどれか。
2. **どのデータがあるか**：訓練側のラベル、評価側の入力、評価側のラベルの有無。評価ラベルを直接得られるなら、独立評価標本として検証できる。
3. **何が変わらないか**：条件付きラベル、support包含、密度比の有界性・既知性。入力分布の近さだけでラベル不変性を推論しない。
4. **どの定理に渡すか**：仮定を満たすなら重み付き同時界などを使う。満たさないなら反例が示す識別不能性を先に認識する。

これは「分布が変わると必ず失敗する」という主張ではない。**保証が要るなら、分布間の何らかの構造とそれを確かめる情報が必要である**、という結論である。

## 演習

### SLT2-18-A01 二点入力の重要度リスク
- Level: A
- 目安時間: 15分

$\mathcal X=\{a,b\}$ で、$P_X(a)=3/4,P_X(b)=1/4,Q_X(a)=1/4,Q_X(b)=3/4$ とする。両分布で $Y(a)=0,Y(b)=1$ が確率1で成り立つ。常に0を予測する $h_0$ について、$R_P(h_0),R_Q(h_0),w(a),w(b),\mathbb E_P[w(X)\ell(h_0,(X,Y))]$ を求め、各仮定を確認せよ。

<!-- solution-start -->
#### 詳細解答

各入力で $P_X,Q_X$ は正なので support包含が成り立つ。ラベルは両分布で同じ確定関数だから[共変量シフトの定義](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)を満たす。$h_0$ は $b$ でだけ誤り、[同じ定義の重要度比](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)は入力の周辺確率の比だから、

$$
R_P(h_0)=\frac14,\qquad R_Q(h_0)=\frac34,\qquad
w(a)=\frac{1/4}{3/4}=\frac13,\qquad
w(b)=\frac{3/4}{1/4}=3.
$$

これらを $P$ の期待値に代入すると

$$
\mathbb E_P[w(X)\ell(h_0,(X,Y))]
=\frac34\cdot\frac13\cdot0
+\frac14\cdot3\cdot1
=\frac34=R_Q(h_0).
$$

重みは標本に依存しない確定関数で $0\le w\le3$ だから、既知の上限 $B=3$ も指定できる。
<!-- solution-end -->

### SLT2-18-A02 評価側だけの入力
- Level: A
- 目安時間: 12分

$\mathcal X=\{a,b,c\}$、$P_X(a)=P_X(b)=1/2,P_X(c)=0$、$Q_X(a)=1/4,Q_X(b)=1/4,Q_X(c)=1/2$ とする。supportを求め、$P_X(c)$ との比を使った重要度重みがなぜ評価リスク全体を表さないか、$h(c)$ を変える具体例で示せ。$a,b$ のラベルは常に0、$c$ の評価ラベルは常に1とする。

<!-- solution-start -->
#### 詳細解答

$\operatorname{supp}(P_X)=\{a,b\}$、$\operatorname{supp}(Q_X)=\{a,b,c\}$ なので[共変量シフトのsupport包含条件](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)は破れる。$a,b$ での比は $(1/4)/(1/2)=1/2$ だが、$c$ では $(1/2)/0$ となり有限な重みを定義できない。

$h_0$ を全入力で0、$h_1$ を $a,b$ で0、$c$ で1とすると、両方とも $P$ の下で損失0であり、どの $P$ 期待値の重みでも区別できない。一方、評価側では

$$
R_Q(h_0)=Q_X(c)=\frac12,\qquad R_Q(h_1)=0.
$$

評価側の $c$ の寄与が訓練期待値から欠落することが、等式を使えない直接の理由である。
<!-- solution-end -->

### SLT2-18-A03 有界重みの保証半径
- Level: A
- 目安時間: 12分

$n=400$、標本前固定の仮説数 $M=4$、既知の重み上限 $B=3$、$\delta=0.05$ とする。[重み付き同時界](#thm-slt2-18-weighted-uniform)の半径を求めよ。また半径を $1/4$ 以下にする $n$ の整数下限を、同じ $M,B,\delta$ で求めよ。

<!-- solution-start -->
#### 詳細解答

定理の半径 $r_n=B\sqrt{\ln(2M/\delta)/(2n)}$ に代入すると、$2M/\delta=8/0.05=160$ で

$$
r_{400}=3\sqrt{\frac{\ln160}{800}}
\approx3\sqrt{0.006344}\approx0.239.
$$

$r_n\le1/4$ は両辺非負なので二乗してよく、

$$
9\frac{\ln160}{2n}\le\frac1{16}
\iff n\ge72\ln160\approx365.41.
$$

よって必要な整数下限は $n=366$。これは同時偏差の半径であり、近似ERMの超過リスク上限にはさらに係数2と最適化誤差 $\eta$ が付く。
<!-- solution-end -->

### SLT2-18-A04 入力周辺は同じでもラベルは反転
- Level: A
- 目安時間: 13分

入力は $a$ の一点、訓練ラベルは0、評価ラベルは1とそれぞれ確定している。$P_X=Q_X$、$w(a)$、常に0を予測する $h_0$ の訓練・評価リスクを求め、[重要度表示](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)のどの仮定が破れているか説明せよ。

<!-- solution-start -->
#### 詳細解答

どちらの入力分布も $a$ に確率1なので、$P_X=Q_X$、$w(a)=1/1=1$ でsupportも一致する。しかし条件付きラベルの確率は

$$
P(Y=1\mid a)=0\ne1=Q(Y=1\mid a)
$$

であり、[共変量シフトの定義](../../ML/ML1-21/index.md#def-ml1-21-covariate-shift)は満たさない。$h_0(a)=0$ は訓練ラベル0に対して正しく、評価ラベル1に対して常に誤るので

$$
R_P(h_0)=0,\qquad R_Q(h_0)=1.
$$

重みを掛けても $\mathbb E_P[w\ell]=1\cdot0=0$ であり、評価リスク1とは一致しない。分布間の条件付きラベルの一致を欠いたまま、入力の比だけで補正することはできない。
<!-- solution-end -->

### SLT2-18-A05 まれな入力の重みの分散
- Level: A
- 目安時間: 15分

$0<\varepsilon<1/2$、$P_X(b)=\varepsilon,Q_X(b)=1/2$、$P_X(a)=1-\varepsilon,Q_X(a)=1/2$ とする。$Y(a)=0,Y(b)=1$ は両分布で確定し、$h_0$ は常に0を予測する。確率変数 $U=w(X)\ell(h_0,(X,Y))$ の $P$ の下での平均、二乗平均、分散を求め、$\varepsilon\downarrow0$ の挙動を説明せよ。

<!-- solution-start -->
#### 詳細解答

[重みの定義](#def-slt2-18-importance)より $w(b)=1/(2\varepsilon)$。$a$ で損失0、$b$ で1なので、$U$ は確率 $1-\varepsilon$ で0、確率 $\varepsilon$ で $1/(2\varepsilon)$ をとる。従って

$$
\begin{aligned}
\mathbb E_PU&=(1-\varepsilon)0+\varepsilon\frac1{2\varepsilon}=\frac12,\\
\mathbb E_PU^2&=(1-\varepsilon)0^2+\varepsilon\frac1{4\varepsilon^2}
=\frac1{4\varepsilon},\\
\operatorname{Var}_P(U)&=\mathbb E_PU^2-(\mathbb E_PU)^2
=\frac1{4\varepsilon}-\frac14.
\end{aligned}
$$

平均は評価リスク $R_Q(h_0)=1/2$ に一致するが、$\varepsilon\downarrow0$ では分散は発散する。稀な大きな重みが標本平均を不安定にする機構が分かる。
<!-- solution-end -->

### SLT2-18-B01 重み付き近似ERMを最初から証明する
- Level: B
- 目安時間: 25分

有限 $\mathcal X$ の二値分類で、訓練分布 $P$ と評価分布 $Q$ はcovariate shiftとsupport包含を満たす。既知の確定重みは $0\le w\le B$、$S\sim P^n$、標本前固定の $M$ 個の非空仮説集合 $\mathcal H$ とする。$\widehat h$ が重み付き経験リスクを最小値から $\eta\ge0$ 以内で達成するとき、確率少なくとも $1-\delta$ で

$$
R_Q(\widehat h)-\min_{h\in\mathcal H}R_Q(h)
\le2B\sqrt{\frac{\ln(2M/\delta)}{2n}}+\eta
$$

を、固定候補への偏差評価から導け。$\widehat h$ に直接固定仮説の集中評価を使ってはいけない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

まず固定 $h$ では $U_i=w(X_i)\ell(h,(X_i,Y_i))$ が $[0,B]$ 値の独立同分布確率変数で、[重要度表示](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)により平均は $R_Q(h)$。$U_i/B$ へ[Hoeffding型偏差評価](../SLT1-03/index.md#thm-slt1-03-fixed-risk)を適用すると

$$
P^n\left(\left|\widehat R_{S,w}(h)-R_Q(h)\right|>t\right)
\le2e^{-2nt^2/B^2}.
$$

固定された $M$ 個の失敗事象を合併して $2Me^{-2nt^2/B^2}\le\delta$ と置き、$t=B\sqrt{\ln(2M/\delta)/(2n)}=:r$ を得る。同時事象上で $h_Q^*$ を評価リスク最小候補として選ぶと

$$
\begin{aligned}
R_Q(\widehat h)-R_Q(h_Q^*)
&\le\widehat R_{S,w}(\widehat h)+r-R_Q(h_Q^*)\\
&\le\widehat R_{S,w}(h_Q^*)+\eta+r-R_Q(h_Q^*)\\
&\le2r+\eta.
\end{aligned}
$$

$\widehat h$ は $S$ を見て選ばれるので固定 $h$ の独立変数として扱えない。先に固定クラス全体の**同時**事象を作り、その事象内でランダムな $\widehat h$ を代入する順序が必要である。
<!-- solution-end -->

### SLT2-18-B02 一度も見ない入力の二世界
- Level: B
- 目安時間: 22分

$P(X=a,Y=0)=1$、$Q_0(X=b,Y=0)=1$、$Q_1(X=b,Y=1)=1$ とする。$P$ のラベル付き標本と $Q_j$ のラベルなし入力を使う任意の確率的算法に対し、二世界の期待評価リスクの和を計算し、最悪世界の超過リスク下限を示せ。$\operatorname{supp}(Q_X)\subseteq\operatorname{supp}(P_X)$ の成否も判定せよ。

<!-- solution-start -->
#### 詳細解答

観測される訓練標本は常に $(a,0)$、評価入力は常に $b$ なので、算法出力の分布は両世界で同じである。$p=\Pr(\widehat h(b)=1)$ とすれば、世界0のリスク期待値は $p$、世界1では $1-p$ であり、和は1である。最大値は平均以上なので $\max\{p,1-p\}\ge1/2$。$h_0(b)=0$ と $h_1(b)=1$ を含む仮説集合では、各世界にリスク0の予測器が存在するため最悪世界の期待超過リスクも $1/2$ 以上となる。

一方、$\operatorname{supp}(P_X)=\{a\}$、$\operatorname{supp}(Q_X)=\{b\}$ で包含しない。$w(b)=Q_X(b)/P_X(b)=1/0$ は定義できず、[重要度表示](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)を適用する仮定が失われている。
<!-- solution-end -->

### SLT2-18-B03 supportが一致する有限標本下限
- Level: B
- 目安時間: 27分

$n\ge2$、$\varepsilon=1/(2n)$、$P_X(b)=\varepsilon,Q_X(b)=1/2$ とし、両世界で $Y(a)=0$、世界 $j$ では訓練・評価とも $Y(b)=j$ とする。$n$ 個の独立な訓練標本を使う算法について、$b$ が一度も出ない確率、二世界の最悪期待評価リスク下限、重要度重み $w(b)$ を順に求め、固定分布での一致性を否定しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

(1) 各入力が $a$ となる確率は $1-1/(2n)$ で独立なので、全て $a$ の事象 $E$ は

$$
\Pr(E)=\left(1-\frac1{2n}\right)^n.
$$

$b$ が少なくとも一度出る確率は合併上界で $n\varepsilon=1/2$ 以下だから $\Pr(E)\ge1/2$。

(2) $E$ 上では二世界の訓練ラベルも評価側のラベルなし入力分布も一致する。$p=\Pr(\widehat h(b)=1\mid E)$ と置くと、世界0で $b$ に対する評価リスク寄与は $p/2$、世界1で $(1-p)/2$。二世界の平均は $(p/2+(1-p)/2)/2=1/4$ だから、無条件の二世界平均も $\Pr(E)/4$ 以上。従って最悪世界で

$$
\mathbb E R_{Q_j}(\widehat h)\ge\frac{\Pr(E)}4
\ge\frac18
$$

となる。各世界には零誤りの真の分類器が存在し、これは超過リスク下限でもある。

(3) $w(b)=(1/2)/(1/(2n))=n$。重み上限は $n$ とともに増えるので、すべての分布に共通の有限 $B$ を仮定した保証を流用できない。各固定 $\varepsilon>0$ では $\Pr(E)=(1-\varepsilon)^n\to0$ なので、固定分布で十分な標本を取れば学習可能という結論と矛盾しない。
<!-- solution-end -->

### SLT2-18-B04 条件付きラベルが異なるときの補正式の破綻
- Level: B
- 目安時間: 25分

$\mathcal X=\{a,b\}$、$P_X(a)=P_X(b)=1/2$、$Q_X(a)=1/4,Q_X(b)=3/4$ とする。訓練ラベルの条件付き確率は $P(Y=1\mid a)=1/4,P(Y=1\mid b)=3/4$、評価側は $Q(Y=1\mid a)=Q(Y=1\mid b)=1/4$ とする。常に0を予測する $h_0$ について、重要度比、重み付き訓練リスク、真の評価リスクを順に計算し、差の発生箇所を条件付き確率の式で示せ。

<!-- solution-start -->
#### 詳細解答

(1) 両入力とも訓練確率が正なので重みは $w(a)=(1/4)/(1/2)=1/2,w(b)=(3/4)/(1/2)=3/2$ である。support包含と有限な比の条件は成立する。

(2) $h_0$ の条件付き誤り確率は訓練側で $a$ が $1/4$、$b$ が $3/4$。従って

$$
\mathbb E_P[w(X)\ell(h_0,(X,Y))]
=\frac12\cdot\frac12\cdot\frac14
+\frac12\cdot\frac32\cdot\frac34
=\frac1{16}+\frac9{16}=\frac58.
$$

(3) 評価側のラベル1確率は各入力で $1/4$ なので

$$
R_Q(h_0)=\frac14\cdot\frac14+\frac34\cdot\frac14
=\frac1{16}+\frac3{16}=\frac14.
$$

差は $5/8-1/4=3/8$。$a$ では条件付き確率が一致するが、$b$ では $P(Y=1\mid b)=3/4\ne1/4=Q(Y=1\mid b)$。重みは入力分布だけを補正するため、$Q_X(b)(3/4-1/4)=(3/4)(1/2)=3/8$ のラベル条件付き差が残る。[重要度表示](../../ML/ML1-21/index.md#prop-ml1-21-covariate-weight)のcovariate shift仮定を満たさないことが原因である。
<!-- solution-end -->

### SLT2-18-C01 有限標本の情報限界と保証上限を照合する
- Level: C
- 目安時間: 45分

$n\ge2$ とし、二値入力 $\mathcal X=\{a,b\}$、訓練入力確率 $P_X(b)=1/(2n)$、評価入力確率 $Q_X(b)=1/2$ とする。二世界 $j\in\{0,1\}$ で、訓練・評価とも $Y(a)=0,Y(b)=j$ とする。算法は訓練側の独立なラベル付き $n$ 標本と、評価側のラベルなし入力を任意個利用できる。予測器集合は $h_0(a)=h_1(a)=0$、$h_j(b)=j$ の二つだけとする。

1. 各世界がcovariate shiftとsupport包含を満たすこと、重み上限 $B$ と $\mathbb E_Pw(X)$ を計算せよ。
2. どんな確率的算法でも、二世界のどちらかで期待評価超過リスクが $1/8$ 以上になることを出発点から証明せよ。
3. $M=2,\delta=0.05$ を[重み付き同時界](#thm-slt2-18-weighted-uniform)に代入し、半径 $r_n$ の式を得て、このモデルで有益な精度保証にならない理由を述べよ。
4. この下限が、[通常の有限クラス汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)や[SLT2の固定kernel勾配力学](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)に矛盾しない理由をそれぞれ述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $n\ge2$ なので $0<P_X(b)=1/(2n)<1$、$P_X(a)=1-1/(2n)>0$。$Q_X(a)=Q_X(b)=1/2$ も正なので双方のsupportは $\{a,b\}$ で一致する。各世界で $Y(a)=0,Y(b)=j$ は訓練・評価に共通なのでcovariate shift条件を満たす。[重み](#def-slt2-18-importance)は

$$
w(a)=\frac{1/2}{1-1/(2n)}=\frac{n}{2n-1},
\qquad w(b)=\frac{1/2}{1/(2n)}=n.
$$

$n\ge2$ だから $n/(2n-1)<1<n$ で、最大値 $B=n$。平均は

$$
\mathbb E_Pw(X)
=\left(1-\frac1{2n}\right)\frac{n}{2n-1}
+\frac1{2n}\cdot n
=\frac12+\frac12=1.
$$

**2.** 全訓練入力が $a$ の事象 $E$ の確率は $(1-1/(2n))^n$。$b$ が現れる事象を各標本に分解して合併上界を取ると

$$
\Pr(E^c)\le\sum_{i=1}^n\Pr(X_i=b)
=n\frac1{2n}=\frac12,
\qquad\Pr(E)\ge\frac12.
$$

$E$ 上で標本は両世界とも $(a,0)$ の列であり、評価側の入力はどちらも公平な $\{a,b\}$ 分布なので、算法には世界を見分ける情報がない。内部乱数によって $h_1$ を選ぶ共通条件付き確率を $p$ とする。世界0で $h_1$ を選ぶと評価誤りは $Q_X(b)=1/2$、世界1で $h_0$ を選ぶと同じく $1/2$。従って二世界の条件付き期待リスクは $p/2$ と $(1-p)/2$ で、二世界の平均は $1/4$。$E^c$ のリスクは非負なので、無条件の二世界平均は少なくとも

$$
\Pr(E)\frac14\ge\frac18.
$$

よって二世界の最大期待リスクも $1/8$ 以上。各世界で $h_j$ は訓練・評価とも全点で正しいので、最良リスクは0であり超過リスク下限も同じである。

**3.** $M=2,\delta=0.05$ では $2M/\delta=4/0.05=80$。重み上限 $B=n$ を代入して

$$
r_n=n\sqrt{\frac{\ln80}{2n}}
=\sqrt{\frac{n\ln80}{2}}.
$$

$n\ge2$ では $r_n\ge\sqrt{\ln80}>1$。0–1リスクはそもそも $[0,1]$ に入るので、偏差半径として有益ではない。ここで $B$ が $n$ に依存することを無視して、固定 $B$ の $n^{-1/2}$ の減衰だけを読むのは誤りである。

**4.** [有限クラスの同時界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)は $P^n$ に対する $R_P(h)$ と通常の経験リスクの比較である。例えば世界1で誤る $h_0$ の訓練リスクは $P_X(b)=1/(2n)$ と小さいが、評価リスクは $Q_X(b)=1/2$。$P$ での保証と両立する。また[固定kernelの勾配力学](../SLT2-09/index.md#thm-slt2-09-continuous-spectrum)は指定した訓練入力・Gram行列上での予測時間発展を評価するものであり、ラベルを一度も見ない評価上重要な $b$ の正解を区別するための情報を付け足さない。従って両定理の仮定と結論を保持したまま、本問の評価下限は成立する。
<!-- solution-end -->
