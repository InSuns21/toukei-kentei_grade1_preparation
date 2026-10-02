# P7 統計モデル・尤度・正則性

確率論で扱ってきたのは「一つの分布を与えたとき、その分布の下で何が起こるか」でした。統計では向きが逆になります。観測値は手元にあり、どの分布がその観測を生んだのかを、パラメータを通して比較したいからです。

この比較を始めるには、まず「候補となる分布の族」を数学的対象として固定し、その族を同じ物差しで比較できるように密度を置きます。その後、観測データに対する適合度を数値化し、その量を微分したとき何が読み取れるかを順に組み立てます。

この章の中心は公式の暗記ではありません。特に

$$
E_\theta[s_\theta(X)]=0,
\qquad
I(\theta)
=
-E_\theta[\partial_\theta^2\log p_\theta(X)]
$$

を使うとき、どの微分と積分の交換を正当化しているかを追えるようにします。次章 P7A では、この確認が最尤推定量の一致性・漸近正規性の前提になります。

---

## 1. 観測から候補分布を比較するには何が必要か

標本空間を $(\mathcal X,\mathcal A)$ とします。未知なのは「真の確率測度そのもの」ではなく、あらかじめ候補として用意した分布族のどれが観測に適合するかです。

例えばベルヌーイ分布なら、$0<p<1$ を動かして

$$
P_p(X=1)=p,
\qquad
P_p(X=0)=1-p
$$

という分布族を考えます。ここで $p$ は観測前には未知ですが、各 $p$ を固定すれば $P_p$ は一つの確率測度です。

<a id="def-f0-00p7-statistical-model"></a>

<!-- formal-statement-start -->
> **定義（統計モデル）**  
> パラメータ集合 $\Theta$ と、各 $\theta\in\Theta$ に対応する確率測度 $P_\theta$ の族
>
$$
\mathcal P=\{P_\theta:\theta\in\Theta\}
$$
>
> を統計モデルといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p7-statistical-model -->
**定義の確認**  
**直接例：ベルヌーイモデル**  
$\mathcal X=\{0,1\}$、$\Theta=(0,1)$ とし

$$
P_p(\{1\})=p,
\qquad
P_p(\{0\})=1-p
$$

と置けば、$\{P_p:0<p<1\}$ は統計モデルです。ここで「モデル」は一つの密度ではなく、$p$ を動かして得られる確率測度の族全体を指します。
<!-- definition-example-end -->

---

## 2. 分布族を同じ物差しで比較する

確率測度 $P_\theta$ はそのままでも定義できますが、観測値 $x$ を固定して $\theta$ を比較するには、各 $P_\theta$ を共通の基準測度に対する密度として書けると便利です。

連続分布族なら Lebesgue 測度、離散分布族なら数え上げ測度が典型です。重要なのは、$\theta$ ごとに別々の基準を使うのではなく、同じ測度 $\mu$ で全ての $P_\theta$ を測ることです。

<a id="def-f0-00p7-dominated-model"></a>

<!-- formal-statement-start -->
> **定義（共通の支配測度をもつ統計モデル）**  
> $\sigma$-有限測度 $\mu$ が存在して、全ての $\theta\in\Theta$ について
>
$$
P_\theta\ll\mu
$$
>
> が成り立つとき、この統計モデルは共通の支配測度をもつといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p7-dominated-model -->
**定義の確認**  

ベルヌーイ族 $\{P_p:0<p<1\}$ では、$\{0,1\}$ 上の数え上げ測度 $\mu$ を取れば、$\mu(A)=0$ となるのは $A=\varnothing$ だけです。したがって全ての $p$ について $P_p\ll\mu$ であり、この族は共通の支配測度をもちます。
<!-- definition-example-end -->

[Radon--Nikodym の定理](../F0_00P2_密度_期待値_Radon_Nikodym/index.md#thm-f0-00p2-radon-nikodym)から

$$
p_\theta
=
\frac{dP_\theta}{d\mu}
$$

が存在します。以後、この密度を使って分布族を比較します。

---

## 3. 観測値を固定すると尤度になる

密度 $p_\theta(x)$ は、通常は $\theta$ を固定して $x$ の関数として読みます。統計では逆に、実際に得られた観測値 $x$ を固定し、$\theta$ を動かして「どの候補がこの観測に相対的に適合するか」を比較します。

<a id="def-f0-00p7-likelihood"></a>

<!-- formal-statement-start -->
> **定義（尤度関数）**  
> 共通の支配測度 $\mu$ に関する密度 $p_\theta=dP_\theta/d\mu$ があるとします。観測値 $x$ を固定したとき
>
$$
L(\theta;x):=p_\theta(x)
$$
>
> を $\theta$ の関数とみなしたものを尤度関数といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p7-likelihood -->
**定義の確認**  

ベルヌーイモデルで観測値を $x=1$ に固定すると密度は $p_p(1)=p$ なので、
$$
L(p;1)=p,\qquad 0<p<1.
$$
ここでは $x$ を動かさず、候補パラメータ $p$ を動かして比較しているので、定義どおり尤度はパラメータの関数になっています。
<!-- definition-example-end -->

尤度は「観測値 $x$ が起こる確率」ではありません。連続分布では $P_\theta(X=x)=0$ でも $p_\theta(x)$ は正になりえます。

また支配測度を変えて密度が $\theta$ に依存しない正の因子を受けても、$\theta$ 間の比較や最大化点は変わりません。このため尤度は絶対的な確率ではなく、候補パラメータ間の比較に使う量だと読むのが安全です。

---

## 4. 独立標本では、なぜ尤度が積になるのか

$X_1,\ldots,X_n$ が $P_\theta$ から独立同分布であるとします。各1標本の密度が $p_\theta$ なら、同時分布は $P_\theta^{\otimes n}$、支配測度は $\mu^{\otimes n}$ です。したがって「1標本の密度を $n$ 個掛ける」という形は、単なる計算規則ではなく積測度の密度から出ます。

<a id="prop-f0-00p7-iid-likelihood-factorization"></a>

<!-- formal-statement-start -->
> **命題（独立標本の尤度因数分解）**  
> $X_1,\ldots,X_n$ が $P_\theta$ から独立同分布で、$p_\theta=dP_\theta/d\mu$ とします。このとき $P_\theta^{\otimes n}$ の $\mu^{\otimes n}$ に関する密度は

$$
\frac{dP_\theta^{\otimes n}}{d\mu^{\otimes n}}
(x_1,\ldots,x_n)
=
\prod_{i=1}^{n}p_\theta(x_i),
$$

> したがって標本全体の尤度は

$$
L_n(\theta)
=
\prod_{i=1}^{n}p_\theta(X_i)
$$

> です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：長方形集合で積を確認する

可測長方形 $A_1\times\cdots\times A_n$ に対して

$$
\begin{aligned}
P_\theta^{\otimes n}(A_1\times\cdots\times A_n)
&=
\prod_{i=1}^{n}P_\theta(A_i)\\
&=
\prod_{i=1}^{n}
\int_{A_i}p_\theta(x_i)\,d\mu(x_i).
\end{aligned}
$$

Tonelli の定理で積分をまとめると

$$
P_\theta^{\otimes n}(A_1\times\cdots\times A_n)
=
\int_{A_1\times\cdots\times A_n}
\prod_{i=1}^{n}p_\theta(x_i)
\,d\mu^{\otimes n}.
$$

長方形集合が積 $\sigma$-加法族を生成するので、この密度表示は全ての可測集合へ拡張されます。観測値を固定して $\theta$ の関数として読めば、尤度の積表示が得られます。
<!-- proof-end -->

「独立だから尤度を掛ける」という規則は、独立標本の同時分布が積測度になり、その Radon--Nikodym 密度が積になることの結果です。

積は微分しにくいので、最大化点を変えない対数を取って

$$
\ell_n(\theta)
:=
\log L_n(\theta)
=
\sum_{i=1}^{n}\log p_\theta(X_i)
$$

とします。これが対数尤度関数です。

---

## 5. パラメータを少し動かしたときの傾きを測る

最尤法では、対数尤度がどちらへ増えるかを知りたいので、パラメータ微分が主役になります。1標本で見た対数密度の傾きを先に定義すると、独立標本ではそれを足し合わせるだけになります。

<a id="def-f0-00p7-score"></a>

<!-- formal-statement-start -->
> **定義（スコア関数）**  
> 1次元パラメータ $\theta$ について $\log p_\theta(x)$ が微分可能であるとき
>
$$
s_\theta(x)
:=
\frac{\partial}{\partial\theta}\log p_\theta(x)
$$
>
> を1標本のスコア関数といいます。
<!-- formal-statement-end -->

独立標本の全スコアは

$$
U_n(\theta)
:=
\ell_n'(\theta)
=
\sum_{i=1}^{n}s_\theta(X_i)
$$

です。ここで、再び「独立同分布変数の和」という確率論の形が現れます。

<!-- definition-example-start: def-f0-00p7-score -->
**定義の確認**  
**直接例：ベルヌーイモデル**  
$X\sim\operatorname{Bernoulli}(p)$ とすると

$$
\log p_p(X)
=
X\log p+(1-X)\log(1-p),
$$

したがって

$$
s_p(X)
=
\frac{X}{p}
-
\frac{1-X}{1-p}
=
\frac{X-p}{p(1-p)}.
$$

$p$ を少し増やしたとき、$X=1$ なら対数尤度を押し上げ、$X=0$ なら押し下げる向きがこの式に現れています。
<!-- definition-example-end -->

---

## 6. スコアの平均が0になるのは、正規化を微分できるときだけ

密度は各 $\theta$ で

$$
\int p_\theta(x)\,d\mu(x)=1
$$

を満たします。この等式を $\theta$ で微分できれば、スコアの平均0が出ます。しかし、積分記号の外の微分をそのまま中へ入れることは自動ではありません。

<a id="thm-f0-00p7-score-identity"></a>

<!-- formal-statement-start -->
> **定理（スコア恒等式）**  
> $\theta_0$ の近傍で $p_\theta(x)$ がほとんど至る所 $\theta$ 微分可能であり、ある可積分関数 $g$ が存在して
>
$$
\left|\partial_\theta p_\theta(x)\right|
\le g(x)
$$
>
> がその近傍の全ての $\theta$ で成り立つとします。さらに、スコア関数が $P_{\theta_0}$-可積分であるとします。このとき
>
$$
E_{\theta_0}[s_{\theta_0}(X)]=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：どこで微分と積分を交換するか

微分を定義する商
$$
\frac{p_{\theta_0+h}(x)-p_{\theta_0}(x)}{h}
$$

は $h\to0$ で $\partial_\theta p_{\theta_0}(x)$ へ収束します。仮定した支配条件により優収束定理を微分を定義する商へ適用できるので

$$
\frac{d}{d\theta}
\int p_\theta\,d\mu
\bigg|_{\theta=\theta_0}
=
\int
\partial_\theta p_{\theta_0}\,d\mu.
$$

左辺は $\frac{d}{d\theta}1=0$ です。一方、$p_{\theta_0}>0$ の点では

$$
\partial_\theta p_{\theta_0}
=
p_{\theta_0}
\partial_\theta\log p_{\theta_0}
=
p_{\theta_0}s_{\theta_0}.
$$

したがって

$$
0
=
\int s_{\theta_0}(x)p_{\theta_0}(x)\,d\mu(x)
=
E_{\theta_0}[s_{\theta_0}(X)].
$$
<!-- proof-end -->

この証明で必要なのは「スコア関数の式」だけではなく、**正規化条件を微分してよいこと**です。

---

## 7. ばらつきの大きさを情報量として読む

スコアの平均が0なら、スコアの二乗平均はその分散です。パラメータを少し動かしたとき対数密度が大きく反応するモデルほど、観測からパラメータの違いを見分けやすいと考えられます。

<a id="def-f0-00p7-fisher-information"></a>

<!-- formal-statement-start -->
> **定義（フィッシャー情報量）**  
> スコア関数 $s_\theta$ が二乗可積分であるとき
>
$$
I(\theta)
:=
E_\theta[s_\theta(X)^2]
$$
>
> を1標本あたりのフィッシャー情報量といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p7-fisher-information -->
**定義の確認**  

ベルヌーイモデルでは
$$
s_p(X)=\frac{X-p}{p(1-p)}
$$
で、$0<p<1$ なら二乗可積分です。したがって定義を直接使うと
$$
I(p)
=
E_p[s_p(X)^2]
=
\frac{p(1-p)}{p^2(1-p)^2}
=
\frac1{p(1-p)}.
$$
<!-- definition-example-end -->

ベルヌーイモデルでは

$$
I(p)
=
E_p\left[
\frac{(X-p)^2}{p^2(1-p)^2}
\right]
=
\frac{p(1-p)}{p^2(1-p)^2}
=
\frac1{p(1-p)}.
$$

---

## 8. 「正則性条件」は一つの魔法の仮定ではない

ここまでの証明では、必要な条件が局所的に違いました。そこで「正則モデル」を固定の万能定義だと思うのではなく、後で使う操作が成立するためのチェックリストとして扱います。

<a id="def-f0-00p7-regularity"></a>

<!-- formal-statement-start -->
> **定義（この系列で用いる正則性条件）**  
> 本系列では、対象となる定理に応じて少なくとも次を確認します。
>
> - 真値がパラメータ空間の内点にある。
> - 共通の支配測度がある。
> - 支持集合が真値近傍でパラメータに依存して動かない。
> - 対数密度が必要な次数まで微分可能である。
> - 必要な微分と積分・期待値の交換を支配条件などで正当化できる。
> - フィッシャー情報量が有限で、必要なら正である。
>
> 一致性や漸近正規性では、これに加えて識別可能性、一様大数の法則、スコアへの中心極限定理など、その定理固有の条件を確認します。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p7-regularity -->
**定義の確認**  

ベルヌーイモデルで真値 $p_0\in(0,1)$ を固定します。$p_0$ の十分小さい閉近傍を $(0,1)$ の内部に取れば、支持は常に $\{0,1\}$ で動かず、数え上げ測度が共通支配測度になります。対数密度はその近傍で必要な次数まで微分でき、標本空間が有限なので微分と有限和の交換も正当化できます。また
$$
I(p_0)=\frac1{p_0(1-p_0)}\in(0,\infty).
$$
したがって、この章で列挙した正則性条件をこのモデルでは局所的に一つずつ確認できます。
<!-- definition-example-end -->

---

## 9. 二階微分表示には、もう一度正則性が必要

フィッシャー情報量はしばしば

$$
-I(\theta)
=
E_\theta[\partial_\theta^2\log p_\theta(X)]
$$

という形でも書かれます。しかし、これも微分積分交換を含む恒等式です。

<a id="thm-f0-00p7-information-identity"></a>

<!-- formal-statement-start -->
> **定理（情報恒等式）**  
> スコア恒等式の仮定に加え、$p_\theta$ が2回微分可能で、2階微分についても積分との交換を正当化できるとします。このとき
>
$$
I(\theta)
=
-E_\theta\!\left[
\frac{\partial^2}{\partial\theta^2}
\log p_\theta(X)
\right].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：二階微分を二項に分ける

$p_\theta>0$ の点で

$$
\partial_\theta\log p_\theta
=
\frac{p_\theta'}{p_\theta}
$$

なので、もう一度微分すると

$$
\partial_\theta^2\log p_\theta
=
\frac{p_\theta''}{p_\theta}
-
\left(\frac{p_\theta'}{p_\theta}\right)^2.
$$

両辺を $P_\theta$ で平均すると

$$
E_\theta[\partial_\theta^2\log p_\theta(X)]
=
\int p_\theta''\,d\mu
-
E_\theta[s_\theta(X)^2].
$$

正規化条件 $\int p_\theta\,d\mu=1$ を2回微分できるので

$$
\int p_\theta''\,d\mu
=
\frac{d^2}{d\theta^2}1
=
0.
$$

よって

$$
E_\theta[\partial_\theta^2\log p_\theta(X)]
=
-I(\theta).
$$
<!-- proof-end -->

---

## 10. 支持集合が動くと何が壊れるか

$X\sim\operatorname{Unif}(0,\theta)$、$\theta>0$ とします。密度は

$$
p_\theta(x)
=
\frac1\theta 1_{(0,\theta)}(x).
$$

支持集合 $(0,\theta)$ 自体が $\theta$ とともに動きます。

支持内部だけを見れば

$$
\partial_\theta\log p_\theta(x)
=
-\frac1\theta
$$

なので

$$
E_\theta[s_\theta(X)]
=
-\frac1\theta
\ne0.
$$

一方、密度の正規化は確かに

$$
\int_0^\theta\frac1\theta\,dx=1
$$

です。矛盾ではありません。Leibniz の積分則を使えば

$$
\frac{d}{d\theta}
\int_0^\theta\frac1\theta\,dx
=
\int_0^\theta
\left(-\frac1{\theta^2}\right)\,dx
+
\frac1\theta
=
-\frac1\theta+\frac1\theta
=
0.
$$

支持内部の微分だけで計算すると、最後の境界項 $1/\theta$ を落としてしまいます。失われた仮定は「支持集合が固定され、積分領域を動かさずに微分を中へ入れられること」です。

---

## 演習

### F0-00P7-A01 ベルヌーイモデルの尤度・スコア・情報量

- Level: A

$X\sim\operatorname{Bernoulli}(p)$、$0<p<1$ とする。1観測の尤度、対数尤度、スコア関数、フィッシャー情報量を順に求めよ。

<!-- solution-start -->
#### 詳細解答

観測値を $x\in\{0,1\}$ とすると

$$
L(p;x)=p^x(1-p)^{1-x}.
$$

したがって

$$
\ell(p;x)
=
x\log p+(1-x)\log(1-p).
$$

$p$ で微分して

$$
s_p(x)
=
\frac{x}{p}
-
\frac{1-x}{1-p}
=
\frac{x-p}{p(1-p)}.
$$

$E_p[X]=p$、$\operatorname{Var}_p(X)=p(1-p)$ なので

$$
E_p[s_p(X)]=0
$$

かつ

$$
I(p)
=
E_p[s_p(X)^2]
=
\frac{\operatorname{Var}_p(X)}{p^2(1-p)^2}
=
\frac1{p(1-p)}.
$$
<!-- solution-end -->

### F0-00P7-A02 独立標本の尤度を積から導く

- Level: A

$X_1,\ldots,X_n$ が密度 $p_\theta$ をもつ分布から独立同分布であるとする。同時密度、尤度、対数尤度を順に書き、全スコアが1標本スコアの和になることを示せ。

<!-- solution-start -->
#### 詳細解答

独立性から同時密度は

$$
\prod_{i=1}^{n}p_\theta(x_i).
$$

観測値 $(x_1,\ldots,x_n)$ を固定して $\theta$ の関数として読むと

$$
L_n(\theta)
=
\prod_{i=1}^{n}p_\theta(x_i).
$$

対数を取れば

$$
\ell_n(\theta)
=
\sum_{i=1}^{n}\log p_\theta(x_i).
$$

有限和なので項別微分でき

$$
U_n(\theta)
=
\ell_n'(\theta)
=
\sum_{i=1}^{n}
\partial_\theta\log p_\theta(x_i)
=
\sum_{i=1}^{n}s_\theta(x_i).
$$
<!-- solution-end -->

### F0-00P7-A03 スコア恒等式で交換している操作

- Level: A

$\int p_\theta\,d\mu=1$ から $E_\theta[s_\theta(X)]=0$ を導くとき、どの等式が自動ではないかを書き、その交換を支える典型的な条件を一つ述べよ。

<!-- solution-start -->
#### 詳細解答

自動ではないのは

$$
\frac{d}{d\theta}\int p_\theta\,d\mu
=
\int \partial_\theta p_\theta\,d\mu
$$

という微分と積分の交換です。例えば $\theta_0$ の近傍で $p_\theta(x)$ がほとんど至る所微分可能で、ある可積分関数 $g$ が存在して

$$
|\partial_\theta p_\theta(x)|\le g(x)
$$

と一様に支配されれば、微分を定義する商へ [Lebesgue の優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) を使って交換を正当化できます。その上で

$$
\partial_\theta p_\theta=p_\theta s_\theta
$$

を代入すれば平均0が出ます。
<!-- solution-end -->

### F0-00P7-A04 情報恒等式の二つの項

- Level: A

$$
\partial_\theta^2\log p_\theta
=
\frac{p_\theta''}{p_\theta}
-
\left(\frac{p_\theta'}{p_\theta}\right)^2
$$

を $P_\theta$ で平均し、情報恒等式を導け。

<!-- solution-start -->
#### 詳細解答

$P_\theta$ で平均すると

$$
E_\theta[\partial_\theta^2\log p_\theta(X)]
=
\int
\frac{p_\theta''}{p_\theta}
p_\theta\,d\mu
-
E_\theta\left[
\left(\frac{p_\theta'}{p_\theta}\right)^2
\right].
$$

よって

$$
E_\theta[\partial_\theta^2\log p_\theta(X)]
=
\int p_\theta''\,d\mu-I(\theta).
$$

正規化条件を2回微分して

$$
\int p_\theta''\,d\mu=0
$$

を使えば

$$
I(\theta)
=
-E_\theta[\partial_\theta^2\log p_\theta(X)].
$$
<!-- solution-end -->

### F0-00P7-B01 動く支持で境界項を回収する

- Level: B

$X\sim\operatorname{Unif}(0,\theta)$ について、支持内部のスコアは $-1/\theta$ である。それでも $\frac{d}{d\theta}\int p_\theta\,dx=0$ となる理由を、境界項まで書いて説明せよ。

<!-- solution-start -->
#### 詳細解答

密度は $p_\theta(x)=\theta^{-1}1_{(0,\theta)}(x)$ です。正規化積分を直接書けば

$$
\int_0^\theta\frac1\theta\,dx=1.
$$

Leibniz の積分則により

$$
\frac{d}{d\theta}
\int_0^\theta\frac1\theta\,dx
=
\int_0^\theta
\left(-\frac1{\theta^2}\right)\,dx
+
\frac1\theta.
$$

第1項は $-1/\theta$、動く上端から出る第2項は $1/\theta$ なので和は0です。支持内部だけを微分すると第2項を失い、誤って $E_\theta[s_\theta(X)]=-1/\theta$ だけを見ることになります。
<!-- solution-end -->

### F0-00P7-B02 離散モデルの情報量を二通りで求める

- Level: B

$X\sim\operatorname{Poisson}(\lambda)$、$\lambda>0$ とする。フィッシャー情報量を (i) スコアの二乗平均、(ii) 対数密度の2階微分の平均、の二通りで求めよ。

<!-- solution-start -->
#### 詳細解答

定数項を除く対数密度は

$$
\log p_\lambda(X)
=
X\log\lambda-\lambda-\log(X!).
$$

したがって

$$
s_\lambda(X)
=
\frac{X}{\lambda}-1
=
\frac{X-\lambda}{\lambda}.
$$

よって

$$
I(\lambda)
=
\frac{\operatorname{Var}(X)}{\lambda^2}
=
\frac{\lambda}{\lambda^2}
=
\frac1\lambda.
$$

一方

$$
\partial_\lambda^2\log p_\lambda(X)
=
-\frac{X}{\lambda^2}
$$

なので

$$
-E_\lambda[\partial_\lambda^2\log p_\lambda(X)]
=
\frac{E_\lambda[X]}{\lambda^2}
=
\frac1\lambda.
$$

二つの表示が一致します。
<!-- solution-end -->

### F0-00P7-B03 4つの仮定を証明の操作へ対応させる

- Level: B

次の条件が、それぞれ何を可能にするか説明せよ。

1. 真値がパラメータ空間の内点である。
2. スコアが二乗可積分である。
3. 密度の微分が可積分関数で局所一様に支配される。
4. 支持集合が真値近傍で固定される。

<!-- solution-start -->
#### 詳細解答

1. 内点性は、真値の両側へ局所的にパラメータを動かし、通常の微分や Taylor 展開を使うために必要です。
2. 二乗可積分性によりフィッシャー情報量 $E[s_\theta^2]$ が有限になり、後続ではスコア和へ中心極限定理を適用できます。
3. 局所一様な可積分支配は、微分を定義する商や密度の微分に優収束定理を適用し、微分と積分・期待値を交換するために使います。
4. 支持集合が固定されれば、積分領域の移動による境界項を避けられます。一様分布の例は、この条件を失うとスコア恒等式の通常の証明が壊れることを示します。
<!-- solution-end -->

### F0-00P7-C01 正規位置モデルで章全体を再構成する

- Level: C

$X\sim N(\theta,\sigma^2)$ とし、$\sigma^2>0$ は既知、$\theta\in\mathbb R$ とする。Lebesgue 測度を支配測度として、次を示せ。

1. 尤度と対数尤度を書く。
2. スコア関数を求め、平均0を確認する。
3. フィッシャー情報量を求める。
4. 情報恒等式でも同じ値が出ることを確認する。
5. このモデルで支持集合が固定されることが、どの証明機構を守っているか説明する。

<!-- solution-start -->
#### 詳細解答

密度は

$$
p_\theta(x)
=
\frac1{\sqrt{2\pi\sigma^2}}
\exp\left(
-\frac{(x-\theta)^2}{2\sigma^2}
\right).
$$

したがって観測値 $x$ に対する尤度はこの式を $\theta$ の関数として読んだものです。対数尤度は

$$
\ell(\theta;x)
=
-\frac12\log(2\pi\sigma^2)
-\frac{(x-\theta)^2}{2\sigma^2}.
$$

微分すると

$$
s_\theta(x)
=
\frac{x-\theta}{\sigma^2}.
$$

$E_\theta[X]=\theta$ なので

$$
E_\theta[s_\theta(X)]
=
\frac{E_\theta[X]-\theta}{\sigma^2}
=
0.
$$

また

$$
I(\theta)
=
E_\theta[s_\theta(X)^2]
=
\frac{\operatorname{Var}_\theta(X)}{\sigma^4}
=
\frac1{\sigma^2}.
$$

2階微分は

$$
\partial_\theta^2\ell(\theta;X)
=
-\frac1{\sigma^2}
$$

なので

$$
-E_\theta[\partial_\theta^2\ell(\theta;X)]
=
\frac1{\sigma^2}
=
I(\theta).
$$

最後に、正規位置モデルの支持集合は全ての $\theta$ で $\mathbb R$ です。したがって一様分布のように積分領域の端点が動くことはなく、適切な可積分支配を確認すれば微分と積分の交換を固定領域上で行えます。
<!-- solution-end -->

---

## 次に進む

この章で、尤度の微分を確率変数の和として扱う準備ができました。次の [F0-00P7A](../F0_00P7A_MLE_一致性_漸近正規性/index.md) では、まず「尤度を最大にする点が真値へ近づく」ことを一様大数の法則で確保し、その後でスコア和の中心極限定理と2階微分の大数則を組み合わせます。
