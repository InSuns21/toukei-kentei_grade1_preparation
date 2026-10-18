# ML1-03 経験リスク最小化と正則化

<!-- definition-example-audit: strict -->

## 1. 真のリスクが分からないとき、何を最小化するか

[ML1-02のBayes最適性](../ML1-02/index.md#thm-ml1-02-pointwise-optimality)では、真の同時分布を知っていることを前提に、各入力で損失を最小にする行動を選んだ。しかし、現実には真の分布を知らず、手元にあるのは有限個の観測である。[母集団リスクと経験リスク](../ML1-01/index.md#def-ml1-01-risks)のうち、手元の標本だけで直接計算できるのは後者だ。

例えば、入力 $a,b$ に対して真のラベルが常に0である世界を考える。$a$ でラベル0の観測を一回見ただけでは、$b$ で1と答える規則も、どこでも0と答える規則も、訓練標本には完全に一致する。**訓練の得点が同じでも、まだ見ていない入力での性能は同じではない。**

そこで最初に、経験リスクを最小にする学習法を定義する。それから、標本に合わせすぎる場合を検討し、経験リスクとは別の「複雑さの代価」を加える。正則化は未知の分布を自動的に推定する魔法ではない。どの予測器を選びやすくするかという**選択上の仮定**を、目的関数の中に明示する仕組みである。

この章では、まず[仮説クラス](../ML1-01/index.md#def-ml1-01-predictor)を有限非空、[損失関数](../ML1-01/index.md#def-ml1-01-loss)を非負有限値とする。標本は $S=((x_1,y_1),\ldots,(x_n,y_n))$、$n\ge1$ とし、$\mathcal H$ は入力から予測への写像の非空有限集合とする。母集団分布 $P$ は比較のための理論上の対象で、算法への入力には渡さない。

## 2. 経験リスク最小化（ERM）

手元のデータに対する平均損失は、各候補 $h$ の損失を $n$ 個足し $n$ で割ったものである。有限な $\mathcal H$ なら、各候補を列挙して最小値を求められる。ただし同点の候補が複数ある場合もあるので、学習算法には同点での選択規則も必要だ。

<a id="def-ml1-03-erm"></a>

<!-- formal-statement-start -->
> **定義（経験リスク最小化）**  
> 有限非空の仮説クラス $\mathcal H$、有限値非負損失 $\ell$、標本 $S=((x_i,y_i))_{i=1}^n$（$n\ge1$）に対して、経験リスクを

$$
\widehat R_S(h)=\frac1n\sum_{i=1}^n\ell(h(x_i),y_i)
$$

> とする。経験リスク最小化（empirical risk minimization、ERM）とは、候補

$$
\widehat h_S\in\operatorname*{argmin}_{h\in\mathcal H}\widehat R_S(h)
$$

> を選ぶことである。同点の場合はあらかじめ決めた規則で一つを選んでもよい。$\mathcal H$ が有限非空なので最小値を達成する候補は存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-03-erm -->
**定義の確認**。[0–1損失](../ML1-01/index.md#def-ml1-01-loss)を用いる。$\mathcal X=\{a,b\}$、$\mathcal Y=\{0,1\}$ とし、$h_{\mathrm{flat}}(a)=h_{\mathrm{flat}}(b)=0$、$h_{\mathrm{split}}(a)=0,h_{\mathrm{split}}(b)=1$ の二つだけを候補とする。訓練標本 $S=((a,0))$ では

$$
\widehat R_S(h_{\mathrm{flat}})=0,\qquad
\widehat R_S(h_{\mathrm{split}})=0.
$$

したがって $\operatorname{argmin}\widehat R_S=\{h_{\mathrm{flat}},h_{\mathrm{split}}\}$ であり、どちらもERM解である。真の分布が $P(X=a)=P(X=b)=1/2$、$Y=0$ なら、[母集団リスク](../ML1-01/index.md#def-ml1-01-risks)はそれぞれ0と $1/2$。候補は両方とも学習可能な写像で、経験リスクの計算も正しい。それでも、標本が観測していない $b$ における挙動が違うため、母集団リスクは異なる。
<!-- definition-example-end -->

ERMは「真のBayes決定則を見つけた」という主張ではない。[Bayes決定則の定義](../ML1-02/index.md#def-ml1-02-bayes-rule)は全ての決定則の最適性を問題にしたが、ERMは**選んだ仮説クラス内で**標本に対して最良な候補を返すだけである。また、仮説クラス自体がBayes決定則を含まない場合、無限個のデータを見てもそのクラスの外の予測器は選べない。

## 3. 標本上の最適性と、母集団上の最適性の間

仮説クラス内で母集団リスクを最小にする候補を $h_{\mathcal H}^*$ と書く。以下では各候補の母集団リスクが有限と仮定する。有限クラスなら、これも存在する。ただし母集団分布を知らない学習者は通常これを計算できない。

経験リスクと母集団リスクのずれを各候補について測れば、ERMの不利さを**標本ごとに成り立つ不等式**で表せる。ここでは確率的な汎化上界を証明するのではなく、その前段階で必要になる三項の差の分解を扱う。

<a id="prop-ml1-03-erm-comparison"></a>

<!-- formal-statement-start -->
> **命題（ERMの母集団リスク比較）**  
> 有限非空の仮説クラス $\mathcal H$、同じ有限値非負損失で計算した母集団リスク $R_P$ と経験リスク $\widehat R_S$ を考え、すべての $h\in\mathcal H$ に対し $R_P(h)<\infty$ と仮定する。$\widehat h_S$ をERM解、$h_{\mathcal H}^*$ を $\mathcal H$ 内の母集団リスク最小解とする。次の最大偏差を定める。

$$
\Delta_S=\max_{h\in\mathcal H}\bigl|\widehat R_S(h)-R_P(h)\bigr|.
$$

> このとき任意の標本 $S$ について

$$
0\le R_P(\widehat h_S)-R_P(h_{\mathcal H}^*)\le2\Delta_S
$$

> が成り立つ。標本の独立性はこの不等式自体には不要である。
<!-- formal-statement-end -->

### 証明の見取り図

差の途中に二つの経験リスクを足して引く。真ん中の差はERMの最小性で非正となり、両端の差だけが残る。**固定した一つの予測器ではなく、クラス全体の偏差を同時に小さくする必要がある**ことが核心だ。

<!-- proof-start -->
### 証明

$R_P(h_{\mathcal H}^*)\le R_P(\widehat h_S)$ は $h_{\mathcal H}^*$ の最小性から従う。上界には、同じ候補について加減する。

$$
\begin{aligned}
R_P(\widehat h_S)-R_P(h_{\mathcal H}^*)
={}&\bigl[R_P(\widehat h_S)-\widehat R_S(\widehat h_S)\bigr]\\
&+\bigl[\widehat R_S(\widehat h_S)-\widehat R_S(h_{\mathcal H}^*)\bigr]\\
&+\bigl[\widehat R_S(h_{\mathcal H}^*)-R_P(h_{\mathcal H}^*)\bigr].
\end{aligned}
$$

ERMの[定義](#def-ml1-03-erm)から中央の角括弧は0以下である。最初と最後の角括弧は、$\widehat h_S,h_{\mathcal H}^*\in\mathcal H$ だから、それぞれ $\Delta_S$ 以下である。よって全体は $2\Delta_S$ 以下になる。標本の確率法則は使用していない。$\square$
<!-- proof-end -->

**式の確認**。前節の二候補と $S=((a,0))$ に対して、どちらも経験リスク0、母集団リスクは0と $1/2$ なので $\Delta_S=1/2$。同点規則で $h_{\mathrm{split}}$ を選べば左辺の過剰リスクは $1/2$ となり、$2\Delta_S=1$ 以下である。上界は成立するが、標本一つだけでは鋭くない。


[固定予測器の経験リスク不偏性](../ML1-01/index.md#thm-ml1-01-unbiased-risk)だけでは、この $\Delta_S$ が小さいことを保証できない。その定理で固定している $h$ と、標本を見て選ぶ $\widehat h_S$ は違うからだ。有限なクラスでも候補を増やせば、偶然よく当たる予測器を選ぶ機会が増える。クラス全体の同時偏差を制御する理論は、後に学ぶ統計的学習理論の主題となる。

## 4. 損失だけでなく、予測器の複雑さにも代価を付ける

観測していない領域で極端に振る舞う候補を無条件に優遇したくないとき、予測器の複雑さを数値化する関数を別に用意できる。これは「複雑だから必ず悪い」という定理ではなく、どの模型を優先するかという設計上の選択である。例えば分岐の多い規則に大きな値を与えたり、数値パラメータが大きい模型に大きな値を与えたりする。

<a id="def-ml1-03-regularized-erm"></a>

<!-- formal-statement-start -->
> **定義（正則化付き経験リスク最小化）**  
> 有限非空の仮説クラス $\mathcal H$、標本 $S$、非負有限値損失 $\ell$、非負のペナルティ $\Omega:\mathcal H\to[0,\infty)$、正則化係数 $\lambda\ge0$ を固定する。正則化目的を

$$
F_{\lambda,S}(h)=\widehat R_S(h)+\lambda\Omega(h)
$$

> と定め、この最小値を達成する

$$
\widehat h_{\lambda,S}\in\operatorname*{argmin}_{h\in\mathcal H}F_{\lambda,S}(h)
$$

> を正則化付きERM解とする。有限非空の $\mathcal H$ では最小解が存在する。$\lambda=0$ なら通常のERMである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-03-regularized-erm -->
**定義の確認**。入力集合 $\mathcal X=\{a,b\}$、ラベル集合 $\mathcal Y=\{0,1\}$ で、次の4観測からなる標本と0–1損失を用いる。

$$
S=((a,0),(a,0),(a,0),(b,1)).
$$

候補となる二つの予測器とペナルティを、次のように定める。

$$
\begin{gathered}
h_0(a)=h_0(b)=0,\qquad h_1(a)=0,\quad h_1(b)=1,\\
\Omega(h_0)=0,\qquad\Omega(h_1)=1.
\end{gathered}
$$

両者は入力集合上で定義された予測器で、ペナルティも有限非負である。$h_0$ の損失列は $(0,0,0,1)$、$h_1$ の損失列は $(0,0,0,0)$。損失が全て非負であり、その平均を取ると次の表になる。

| 候補 | $\widehat R_S$ | $\Omega$ | $F_{\lambda,S}$ |
|---|---:|---:|---:|
| $h_0$ | $1/4$ | 0 | $1/4$ |
| $h_1$ | 0 | 1 | $\lambda$ |

どちらの損失も有限非負で、ペナルティも非負である。$0\le\lambda<1/4$ なら $h_1$、$\lambda>1/4$ なら $h_0$、$\lambda=1/4$ なら両方が最小解である。正則化係数を上げると、訓練誤差が少し増えても単純な候補を選べる。ただし、この表は母集団リスクを示していないので、汎化改善を証明したわけではない。
<!-- definition-example-end -->

有限クラスに付ける複雑さの値は様々に設計できる。数値パラメータ $\theta\in\mathbb R^d$ の模型なら、後で使う $\|\theta\|_2^2=\sum_j\theta_j^2$ のようなペナルティもある。ただし、パラメータの単位や特徴量の尺度が変われば値も変わる。**同じ数値 $\lambda$ でも、損失とペナルティの正規化が違えば同じ学習問題ではない。**

## 5. 係数を増やすと何が単調になるのか

$\lambda$ を大きくしたとき、解がどの候補へ移るかは模型に依存する。しかし、達成したペナルティ値と訓練誤差については一般的に言えることがある。

<a id="thm-ml1-03-penalty-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（正則化係数に対する単調性）**  
> 非空の候補集合 $\mathcal H$ 上で $\widehat R_S$ と $\Omega$ が実数値であり、$\lambda_1,\lambda_2$ が $0\le\lambda_1<\lambda_2$ を満たすとする。それぞれの正則化目的が最小解 $h_1,h_2$ を持つなら、

$$
\Omega(h_2)\le\Omega(h_1),\qquad
\widehat R_S(h_1)\le\widehat R_S(h_2)
$$

> が成り立つ。最小解が複数ある場合も、任意の組合せで成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$h_1$ は係数 $\lambda_1$ で、$h_2$ は係数 $\lambda_2$ で最適なので、二つの最小性不等式を作って足す。共通の経験リスクが消えるとペナルティの大小が分かる。次に、その大小を最初の不等式へ戻す。

<!-- proof-start -->
### 証明

$L_i=\widehat R_S(h_i)$、$W_i=\Omega(h_i)$ と略記する。[正則化付きERMの定義](#def-ml1-03-regularized-erm)に基づくそれぞれの解の最小性より

$$
L_1+\lambda_1W_1\le L_2+\lambda_1W_2,\qquad
L_2+\lambda_2W_2\le L_1+\lambda_2W_1.
$$

二式の左右を加え、$L_1+L_2$ を消すと

$$
\lambda_1W_1+\lambda_2W_2
\le\lambda_1W_2+\lambda_2W_1.
$$

項を移せば

$$
(\lambda_2-\lambda_1)(W_2-W_1)\le0.
$$

$\lambda_2-\lambda_1>0$ なので $W_2\le W_1$ である。さらに最初の不等式を $L_1-L_2\le\lambda_1(W_2-W_1)$ と書けば、$\lambda_1\ge0$、$W_2-W_1\le0$ より $L_1-L_2\le0$。$\square$
<!-- proof-end -->

**数値で確認**。前節の表で $\lambda_1=0$ と $\lambda_2=1/2$ を選ぶと、最小解はそれぞれ $h_1$ と $h_0$。ペナルティは $1\to0$ に下がる一方、訓練誤差は $0\to1/4$ に上がる。母集団リスクが単調になるとは定理は述べていない。


## 6. 複雑さに上限を設ける方法との関係

正則化係数 $\lambda$ で代価を付ける代わりに、「複雑さは $\rho$ 以下」という制約を先に決める方法もある。まずこの二つを混同せず、正確に成り立つ向きを示そう。

<a id="def-ml1-03-constrained-erm"></a>

<!-- formal-statement-start -->
> **定義（複雑さ制約付き経験リスク最小化）**  
> 有限非空の仮説クラス $\mathcal H$、標本 $S=((x_i,y_i))_{i=1}^n$（$n\ge1$）、有限値非負損失 $\ell$、非負有限値ペナルティ $\Omega:\mathcal H\to[0,\infty)$、上限 $\rho\ge0$ に対して、許される候補の集合を

$$
\mathcal H_\rho=\{h\in\mathcal H:\Omega(h)\le\rho\}
$$

> とする。$\mathcal H_\rho$ が非空であるとき、その中で $\widehat R_S(h)$ を最小にすることを複雑さ制約付きERMと呼ぶ。有限非空の可行集合上では最小値を達成する候補が存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-03-constrained-erm -->
**定義の確認**。第4節の二候補では $\rho=0$ なら $\mathcal H_\rho=\{h_0\}$、$\rho=1$ なら $\mathcal H_\rho=\{h_0,h_1\}$。前者の最小訓練誤差は $1/4$、後者は0である。制約を厳しくすると候補数が減り、訓練誤差を最小化できる範囲も狭くなる。
<!-- definition-example-end -->

<a id="prop-ml1-03-penalty-constrained"></a>

<!-- formal-statement-start -->
> **命題（正則化解は対応する制約問題の解）**  
> 非空の仮説クラス $\mathcal H$ 上に、実数値の経験リスク $\widehat R_S$ と非負のペナルティ $\Omega$ が定義されているとする。$\lambda\ge0$ に対し、$\widehat h_{\lambda,S}\in\mathcal H$ が $\widehat R_S(h)+\lambda\Omega(h)$ の最小解であるとする。上限を

$$
\rho=\Omega(\widehat h_{\lambda,S})
$$

> と取れば、$\widehat h_{\lambda,S}$ は $\Omega(h)\le\rho$ の下で経験リスクを最小化する。
<!-- formal-statement-end -->

### 証明の見取り図

仮に制約を満たす別の候補の経験リスクがもっと小さければ、ペナルティも正則化解より大きくないので、正則化目的そのものが小さくなり矛盾する。

<!-- proof-start -->
### 証明

$h_\lambda=\widehat h_{\lambda,S}$ と書く。もし $\Omega(g)\le\Omega(h_\lambda)$ で、しかも $\widehat R_S(g)<\widehat R_S(h_\lambda)$ を満たす $g$ があるなら、$\lambda\ge0$ より

$$
\lambda\Omega(g)\le\lambda\Omega(h_\lambda).
$$

これを厳密な経験リスク不等式に加えると

$$
\widehat R_S(g)+\lambda\Omega(g)
<\widehat R_S(h_\lambda)+\lambda\Omega(h_\lambda),
$$

となり $h_\lambda$ の最小性に矛盾する。よって $h_\lambda$ は制約付き最小解である。$\square$
<!-- proof-end -->

逆向き、すなわち**任意の制約付き最適解が、何らかの $\lambda$ の正則化解になる**、という結論は一般には成り立たない。

例えば三つの候補 $u,v,w$ で $(\Omega,\widehat R_S)$ をそれぞれ $(2,0),(1,1.1),(0,2)$ とする。上限 $\rho=1$ なら $v$ は $w$ より小さい経験リスクを持ち、制約付き最小解である。ところが $v$ が正則化解になるには

$$
1.1+\lambda\le 2\lambda,\qquad 1.1+\lambda\le2
$$

が同時に必要で、前者は $\lambda\ge1.1$、後者は $\lambda\le0.9$ を意味して矛盾する。この逆向きを一般に論じるには追加の凸性・双対性条件などが必要であり、単に「同じもの」と呼ぶことはできない。

## 7. 二次模型で、正則化が解をどう変えるか

有限候補の表から連続的なパラメータへ進む。予測が一つの実数 $\theta$ で決まる模型を使えば、正則化の効果を厳密に求められる。

入力によらず $h_\theta(x)=\theta$ を返す定数予測器と、平方損失を考える。

$$
\ell(\widehat y,y)=(\widehat y-y)^2.
$$

観測値 $y_1=2$ の標本一つでは、[経験リスクの定義](../ML1-01/index.md#def-ml1-01-risks)に $n=1$ と $h_\theta(x_1)=\theta$ を代入すると

$$
\widehat R(\theta)=\frac{1}{1}\ell(h_\theta(x_1),2)=(\theta-2)^2
$$

となる。$\theta$ の絶対値を大きくしすぎないという好みを $\Omega(\theta)=\theta^2$ で表そう。平方損失もペナルティも非負である。

<a id="thm-ml1-03-quadratic-shrinkage"></a>

<!-- formal-statement-start -->
> **定理（一変数二次模型の正則化解）**  
> パラメータ空間 $\mathbb R$、経験リスク $\widehat R(\theta)=(\theta-2)^2$、ペナルティ $\Omega(\theta)=\theta^2$、係数 $\lambda\ge0$ とする。このとき正則化目的はただ一つの最小点を持ち、

$$
\widehat\theta_\lambda=\frac{2}{1+\lambda}.
$$

> 最小点での経験リスクとペナルティはそれぞれ

$$
\widehat R(\widehat\theta_\lambda)
=\frac{4\lambda^2}{(1+\lambda)^2},\qquad
\Omega(\widehat\theta_\lambda)=\frac4{(1+\lambda)^2}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$\theta^2$ と線形項をまとめ、平方完成する。係数 $1+\lambda$ は常に正なので、完成した二乗が0になる点が一意の最小点となる。これは[凸関数と狭義凸性](../../OPT/OPT1/index.md#def-opt1-strictly-convex)で学んだ一意性の具体例でもある。

<!-- proof-start -->
### 証明

目的関数を展開すると

$$
\begin{aligned}
F_\lambda(\theta)
&=(\theta-2)^2+\lambda\theta^2\\
&=\theta^2-4\theta+4+\lambda\theta^2\\
&=(1+\lambda)\theta^2-4\theta+4.
\end{aligned}
$$

$1+\lambda>0$ だから平方完成でき、

$$
F_\lambda(\theta)
=(1+\lambda)\left(\theta-\frac2{1+\lambda}\right)^2
+4-\frac4{1+\lambda}.
$$

右辺の最後の二項は $\theta$ に依存しない。二乗項は非負で、0になるのは $\theta=2/(1+\lambda)$ のときだけである。これが一意の最小点。そこでは

$$
\widehat\theta_\lambda-2
=\frac{2-2(1+\lambda)}{1+\lambda}
=-\frac{2\lambda}{1+\lambda}.
$$

両辺を二乗して経験リスクの式を得る。さらに $\widehat\theta_\lambda^2=4/(1+\lambda)^2$ がペナルティである。$\square$
<!-- proof-end -->

**数値で確認**。$\lambda=0,1,3$ について次が得られる。

| $\lambda$ | $\widehat\theta_\lambda$ | 経験リスク | ペナルティ | 目的値 |
|---|---:|---:|---:|---:|
| 0 | 2 | 0 | 4 | 0 |
| 1 | 1 | 1 | 1 | 2 |
| 3 | $1/2$ | $9/4$ | $1/4$ | 3 |

例えば $\lambda=3$ では、目的値は $9/4+3(1/4)=3$ であり、訓練誤差だけを見て最小だと言っているわけではない。係数を増やすと $\theta$ は0へ近づくが、訓練誤差は増える。この現象を**縮小**と呼ぶ。多変数の最小二乗・Ridge回帰では行列の階数や方向ごとの縮小も問題になるので、後続章で扱う。


ただし、この模型は全ての実数を候補に取っているので、第2節の「有限クラスだから最小解がある」という理由は使っていない。ここでは**平方完成を実際に行ったから**最小点の存在を保証できた。一般の無限クラスでは、目的の下限があっても達成されるとは限らない。例えば $\theta>0$ のみを許して $\widehat R(\theta)=\theta^2$ を最小化すると、下限0は $\theta\downarrow0$ で近づけるが、許された範囲では達成されない。存在と一意性は別々に確認しなければならない。

## 8. 計算ラボ：目的関数を本当に再計算する

ここまでの有限候補と二次模型は、同じ「訓練損失＋係数×ペナルティ」だが、最小点の動き方が異なる。有限候補では係数の境界で解が飛び、二次模型では連続的に縮小する。次の計算ラボでは、[正則化目的の定義](#def-ml1-03-regularized-erm)と[二次模型の正則化解](#thm-ml1-03-quadratic-shrinkage)を用いて $\lambda$ を変更し、候補ごとの目的値と二次模型の最小点を再計算する。乱数を用いない決定的な実験なので、実行ごとに一致しなければ計算を疑える。

~~~python-lab
# lab-id: ml1-03-regularization
# lab-title: ERMと正則化の数値比較
# lab-mode: exercise
# timeout-ms: 10000
lambdas = [0.0, 0.10, 0.25, 0.50, 1.0, 3.0]
for lam in lambdas:
    # 有限候補: (経験リスク, ペナルティ)
    models = {"simple": (0.25, 0.0), "flexible": (0.0, 1.0)}
    # ヒント: 目的値は「経験リスク + lam × ペナルティ」。
    objectives = {name: ___ for name, (risk, penalty) in models.items()}
    winners = [name for name, val in objectives.items()
               if abs(val - min(objectives.values())) < 1e-12]
    # ヒント: (theta - 2)^2 + lam * theta^2 の平方完成。
    theta = ___
    train_risk = (theta - 2.0)**2
    penalty = theta**2
    print(lam, winners, round(theta, 6),
          round(train_risk, 6), round(penalty, 6))
~~~

~~~python-solution
lambdas = [0.0, 0.10, 0.25, 0.50, 1.0, 3.0]
for lam in lambdas:
    models = {"simple": (0.25, 0.0), "flexible": (0.0, 1.0)}
    objectives = {name: risk + lam * penalty
                  for name, (risk, penalty) in models.items()}
    winners = [name for name, val in objectives.items()
               if abs(val - min(objectives.values())) < 1e-12]
    theta = 2.0 / (1.0 + lam)
    train_risk = (theta - 2.0)**2
    penalty = theta**2
    print(lam, winners, round(theta, 6),
          round(train_risk, 6), round(penalty, 6))
~~~

~~~python-test
for lam in lambdas:
    values = {name: risk + lam * penalty
              for name, (risk, penalty) in models.items()}
    chosen = [name for name, val in values.items()
              if abs(val - min(values.values())) < 1e-12]
    assert chosen == (["flexible"] if lam < 0.25
                      else ["simple", "flexible"] if lam == 0.25
                      else ["simple"])
    t = 2.0 / (1.0 + lam)
    assert abs((t - 2.0)**2 - 4 * lam**2 / (1 + lam)**2) < 1e-12
    assert abs(t**2 - 4 / (1 + lam)**2) < 1e-12
~~~

数値実験では、訓練損失・ペナルティ・正則化目的の三つを区別して記録する。正則化目的が減ったという事実から、未知の分布についての母集団リスクが減ったとは推論できない。分割データを使って係数を選ぶ方法は、後の検証・モデル選択の講義で扱う。

## 演習

### ML1-03-A01 有限候補のERMと同点
- Level: A
- 目安時間: 10分

0–1損失で4観測に対する候補 $f,g,k$ の損失列がそれぞれ $(0,1,0,1)$、$(0,0,0,1)$、$(1,0,0,0)$ である。経験リスクとERM解全体を求めよ。

<!-- solution-start -->
#### 詳細解答

[ERMの定義](#def-ml1-03-erm)により各損失列の和を4で割るので、

$$
\widehat R(f)=\frac{0+1+0+1}{4}=\frac12,\quad
\widehat R(g)=\frac{0+0+0+1}{4}=\frac14,\quad
\widehat R(k)=\frac{1+0+0+0}{4}=\frac14.
$$

最小経験リスクは $1/4$、最小化候補の集合は $\{g,k\}$ である。候補を一意に返すには別の同点規則を指定する必要がある。
<!-- solution-end -->

### ML1-03-A02 有限候補の切替点
- Level: A
- 目安時間: 10分

$\widehat R(f)=0.3,\Omega(f)=0$、$\widehat R(g)=0.1,\Omega(g)=2$ とする。$\lambda\ge0$ の正則化解がどちらになるか全ての係数で分類せよ。

<!-- solution-start -->
#### 詳細解答

[正則化目的](#def-ml1-03-regularized-erm)は $F_\lambda(f)=0.3$、$F_\lambda(g)=0.1+2\lambda$。差の符号を見るため

$$
F_\lambda(g)-F_\lambda(f)=2\lambda-0.2.
$$

$\lambda<0.1$ なら負で $g$、$\lambda>0.1$ なら正で $f$、$\lambda=0.1$ なら両者が解になる。$\lambda=0$ では経験リスクの小さい $g$ を選ぶ。
<!-- solution-end -->

### ML1-03-A03 二次目的の手計算
- Level: A
- 目安時間: 10分

$(\theta-3)^2+2\theta^2$ を最小にする実数 $\theta$ と、そこでの経験リスク・ペナルティ・目的値を求めよ。

<!-- solution-start -->
#### 詳細解答

展開すると $\theta^2-6\theta+9+2\theta^2=3\theta^2-6\theta+9$ となる。平方完成により

$$
3\theta^2-6\theta+9=3(\theta-1)^2+6.
$$

係数3は正だから最小点は $\theta=1$ で一意である。経験リスクは $(1-3)^2=4$、ペナルティ $\theta^2=1$、目的値は $4+2\cdot1=6$ で、平方完成の定数と一致する。
<!-- solution-end -->

### ML1-03-A04 複雑さ制約の候補集合
- Level: A
- 目安時間: 10分

候補 $u,v,w$ がそれぞれ $(\Omega,\widehat R)=(0,0.6),(1,0.3),(3,0.1)$ を持つ。$\rho=0,1,3$ の各場合に制約付きERMの最小解と最小経験リスクを求めよ。

<!-- solution-start -->
#### 詳細解答

[複雑さ制約付き経験リスク最小化の定義](#def-ml1-03-constrained-erm)から $\rho=0$ の可行候補は $\{u\}$ だけなので解 $u$、経験リスク0.6。$\rho=1$ なら $\{u,v\}$ から $\min(0.6,0.3)=0.3$ を達成する $v$。$\rho=3$ なら三候補から $\min(0.6,0.3,0.1)=0.1$ を達成する $w$。可行集合を広げたので最小経験リスクは増えない。
<!-- solution-end -->

### ML1-03-A05 固定された予測器と学習後の予測器
- Level: A
- 目安時間: 10分

標本 $S$ によって選んだ $\widehat h_S$ に対して、[固定予測器の経験リスク不偏性](../ML1-01/index.md#thm-ml1-01-unbiased-risk)をそのまま適用できるか。第2節の一観測の例を使って説明せよ。

<!-- solution-start -->
#### 詳細解答

そのままでは適用できない。[固定予測器の経験リスク不偏性](../ML1-01/index.md#thm-ml1-01-unbiased-risk)は標本を観測する前に $h$ を固定する定理だからである。

第2節の母集団から1観測を無作為に得て、ERMで同点なら $h_{\mathrm{split}}$ を選ぶ規則を固定する。$S=((a,0))$ なら $h_{\mathrm{split}}$、$S=((b,0))$ なら経験リスク0の $h_{\mathrm{flat}}$ が選ばれる。いずれも学習後の経験リスクは0だが、母集団リスクは順に $1/2,0$ である。各標本は確率 $1/2$ で出るから、

$$
E_S[\widehat R_S(\widehat h_S)]=0,\qquad
E_S[R_P(\widehat h_S)]=\frac12\cdot\frac12+\frac12\cdot0=\frac14.
$$

選択後の $\widehat h_S$ は標本の関数だから、固定予測器の定理を無条件に適用できないことが、この期待値の不一致によって確認できた。
<!-- solution-end -->

### ML1-03-B01 ERM比較不等式を導き直す
- Level: B
- 目安時間: 20分

有限仮説クラスで $\max_h|\widehat R_S(h)-R_P(h)|\le\varepsilon$ が成り立つとする。ERM解の母集団リスクが $\mathcal H$ 内の最小母集団リスクより高くても、差は $2\varepsilon$ 以下であることを中間式付きで示せ。

<!-- solution-start -->
#### 詳細解答

$h^*\in\operatorname*{argmin}_{h\in\mathcal H}R_P(h)$ とする。全候補に同じ偏差上界が適用できるので、まず $h=\widehat h_S$ に用い、

$$
R_P(\widehat h_S)\le\widehat R_S(\widehat h_S)+\varepsilon.
$$

次にERMの[最小性](#def-ml1-03-erm)から $\widehat R_S(\widehat h_S)\le\widehat R_S(h^*)$。最後に同じ偏差上界を $h=h^*$ へ使って $\widehat R_S(h^*)\le R_P(h^*)+\varepsilon$ とする。三式を順に結べば

$$
R_P(\widehat h_S)
\le\widehat R_S(\widehat h_S)+\varepsilon
\le\widehat R_S(h^*)+\varepsilon
\le R_P(h^*)+2\varepsilon.
$$

$h^*$ の最小性から差は非負。標本に依存する $\widehat h_S$ に一様偏差を適用した点が、固定候補の不偏性だけでは得られない重要な段階である。
<!-- solution-end -->

### ML1-03-B02 正則化係数の単調性を復元する
- Level: B
- 目安時間: 20分

二つの係数 $0\le\alpha<\beta$ の正則化解を $f,g$ とする。それぞれの最小性不等式から、$\Omega(g)\le\Omega(f)$ および $\widehat R(f)\le\widehat R(g)$ を証明せよ。

<!-- solution-start -->
#### 詳細解答

係数 $\alpha$ では $f$、係数 $\beta$ では $g$ が最小なので

$$
\widehat R(f)+\alpha\Omega(f)\le\widehat R(g)+\alpha\Omega(g),
$$

$$
\widehat R(g)+\beta\Omega(g)\le\widehat R(f)+\beta\Omega(f).
$$

加えて経験リスクの項を消すと

$$
(\beta-\alpha)(\Omega(g)-\Omega(f))\le0.
$$

$\beta-\alpha>0$ より $\Omega(g)\le\Omega(f)$。第一式に戻せば

$$
\widehat R(f)-\widehat R(g)
\le\alpha(\Omega(g)-\Omega(f))\le0,
$$

だから $\widehat R(f)\le\widehat R(g)$。使ったのは最小解の存在と二つの係数の大小だけで、母集団リスクの大小ではない。
<!-- solution-end -->

### ML1-03-B03 制約から係数へ戻れない例
- Level: B
- 目安時間: 20分

三候補 $(\Omega,\widehat R)=(2,0),(1,1.1),(0,2)$ を用いて、$\rho=1$ の制約付き最適解が、$\lambda\ge0$ のどんな正則化問題の最小解にもならないことを示せ。

<!-- solution-start -->
#### 詳細解答

$\rho=1$ で可行な候補は $(1,1.1),(0,2)$。経験リスクを比べれば $1.1<2$ で、前者だけが解。正則化目的で前者が $(2,0)$ に勝つ条件は

$$
1.1+\lambda\le0+2\lambda
\quad\Longleftrightarrow\quad\lambda\ge1.1.
$$

同時に $(0,2)$ に勝つ条件は

$$
1.1+\lambda\le2+0\lambda
\quad\Longleftrightarrow\quad\lambda\le0.9.
$$

両方満たす $\lambda$ は存在しない。[正則化解から制約解への命題](#prop-ml1-03-penalty-constrained)の逆は、一般の有限候補では成立しない。
<!-- solution-end -->

### ML1-03-B04 無限クラスに移る際の存在の確認
- Level: B
- 目安時間: 20分

$\theta>0$ 上の $L(\theta)=\theta^2$、および $\theta\in\mathbb R$ 上の $F_\lambda(\theta)=(\theta-2)^2+\lambda\theta^2$（$\lambda\ge0$）を比較する。下限が達成されるか、それぞれ証明せよ。

<!-- solution-start -->
#### 詳細解答

前者では任意の許容 $\theta>0$ に対して $L(\theta)>0$。一方 $\theta_m=1/m$（$m\ge1$）は許容され、

$$
L(\theta_m)=\frac1{m^2}\longrightarrow0.
$$

したがって下限は0だが、$\theta=0$ は定義域に入らず達成されない。後者は[二次模型の定理](#thm-ml1-03-quadratic-shrinkage)の平方完成より

$$
F_\lambda(\theta)
=(1+\lambda)\left(\theta-\frac2{1+\lambda}\right)^2
+4-\frac4{1+\lambda}.
$$

$1+\lambda>0$ で $\theta=2/(1+\lambda)\in\mathbb R$ が許されるので、そこで下限を達成し、二乗が0になる点は他にないため一意である。候補が無限個のときは「有限クラスだから存在」という論法を流用できない。
<!-- solution-end -->

### ML1-03-C01 標本適合・正則化・母集団リスクをまとめる
- Level: C
- 目安時間: 30分

$\mathcal X=\{a,b\}$、真の分布は $P(X=a)=P(X=b)=1/2$、$Y=0$ が確率1で成り立つとする。0–1損失と仮説クラス $\mathcal H=\{h_0,h_1\}$ を用い、$h_0(a)=h_0(b)=0$、$h_1(a)=0,h_1(b)=1$、$\Omega(h_0)=0,\Omega(h_1)=1$ とする。独立同分布標本を一つ $S=((X_1,Y_1))$ 観測する。

1. $X_1=a$、$X_1=b$ のそれぞれの場合について、二候補の経験リスクを求め、ERM解全体を述べよ。
2. 正則化係数 $\lambda>0$ の解をそれぞれの標本について求めよ。
3. 二候補の母集団リスクを求めよ。$\lambda=0$ のERMで同点なら $h_1$ を選ぶ規則と、$\lambda>0$ の解とを比較せよ。
4. この一例を根拠に、正則化が常に汎化リスクを改善すると主張できるか。根拠を付して述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $X_1=a$ なら両候補とも予測0で、真値も0だから、経験リスクは $(0,0)$、ERM解全体は $\{h_0,h_1\}$。$X_1=b$ なら $h_0$ の予測は0、$h_1$ は1なので、経験リスクは $(0,1)$、ERM解は $\{h_0\}$。母集団の分布に基づく標本では両事象が確率 $1/2$ で起こる。

**2.** $\lambda>0$ では $X_1=a$ の正則化目的がそれぞれ $0,\lambda$、$X_1=b$ では $0,1+\lambda$ である。どちらの標本でも $h_0$ が唯一の正則化解となる。

**3.** [母集団リスク](../ML1-01/index.md#def-ml1-01-risks)を二入力で計算すると

$$
R_P(h_0)=\frac12\cdot0+\frac12\cdot0=0,\qquad
R_P(h_1)=\frac12\cdot0+\frac12\cdot1=\frac12.
$$

$\lambda=0$ で同点を $h_1$ にする規則は、$X_1=a$ のとき母集団リスク $1/2$、$X_1=b$ のとき0を返すので、学習後リスクの期待値は

$$
E_S[R_P(\widehat h_{0,S})]
=\frac12\cdot\frac12+\frac12\cdot0=\frac14.
$$

一方 $\lambda>0$ では常に $h_0$ が選ばれ、期待母集団リスクは0である。これは同点規則とこの分布において正則化が有利な例となる。

**4.** 一般には主張できない。反例として真のラベルを $Y=\boldsymbol{1}_{\{X=b\}}$ に変更する。このとき $h_1$ の母集団リスクは0、$h_0$ は $1/2$ である。

$X_1=a$ では両候補の経験リスクが0なので、$\lambda>0$ の正則化は $h_0$ を選ぶ。一方、$0<\lambda<1$ を固定すると、$X_1=b$ では $h_1$ の目的値 $\lambda$ が $h_0$ の目的値1より小さく、$h_1$ を選ぶ。したがって

$$
E_S[R_P(\widehat h_{\lambda,S})]=\frac12\cdot\frac12+\frac12\cdot0=\frac14.
$$

対して、同点なら $h_1$ を選ぶ無正則化ERMは両標本で $h_1$ を返し、期待母集団リスクは0である。正則化の有利不利は分布とペナルティの対応による。
<!-- solution-end -->

---

## 次に進む

ERMと正則化は、標本から候補を選ぶための一般的な枠組みである。ここでは有限クラスと一変数二次模型で存在・同点・切替・縮小まで確認した。次のML1-04では、予測器を線形結合で表すときの平方損失を多変数へ拡張し、正規方程式と、解が一意でない場合を調べる。
