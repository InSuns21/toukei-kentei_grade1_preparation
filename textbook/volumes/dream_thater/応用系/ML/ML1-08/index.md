# ML1-08 Logistic/softmax回帰・対数損失

<!-- definition-example-audit: strict -->

## 1. 分布を作る分類から、条件付き確率を直接学習する分類へ

前章では、[生成的分類模型](../ML1-07/index.md#def-ml1-07-generative)で事前確率とクラス条件付き密度を与え、[Bayes公式による事後確率](../ML1-07/index.md#thm-ml1-07-posterior)を求めた。しかし予測だけが目標なら、各クラスの特徴量の密度を推定する必要はない。入力 $x$ から直接 $P(Y=k\mid X=x)$ を出す方法を調べよう。

たとえば二値分類で「故障確率60%」と予測したとき、ラベル1が出たか0が出たかによって、予測確率自体を評価したい。[0–1損失のBayes分類則](../ML1-02/index.md#thm-ml1-02-zero-one-bayes)はラベルを選ぶには十分だが、「0.6」と「0.99」がともに正しい側の予測だった場合、その確率の質を区別できない。そこで **対数損失**を用い、観測ラベルに与えた確率が小さいほど強く罰する。

本章では訓練標本 $(x_i,y_i)$（$i=1,\ldots,n$）を固定し、$n\ge1$、$x_i\in\mathbb R^p$、$p\ge1$ とする。切片を係数に含めるため $d=p+1$ とおき、拡張特徴ベクトルを

$$
z_i=(1,x_i^{\mathsf T})^{\mathsf T}\in\mathbb R^d
$$

と定める。したがって係数 $\theta\in\mathbb R^d$ の線形得点 $a_i=\theta^{\mathsf T}z_i$ は切片を含む。標本が独立同分布であると仮定すれば尤度が積に分かれるが、以下の経験損失や微分計算は、観測済み標本を固定した有限和としても定義できる。

## 2. 二値の場合：logistic回帰と対数損失

二値ラベル $y_i\in\{0,1\}$ の条件付き確率がほしい。線形得点 $a\in\mathbb R$ を確率へ移すには、指数関数を使って値を常に0と1の間へ収める。

実数得点を確率に移す単調増加な写像を先に定義する。これを使うと、0と1の二つの事象の確率比が簡単な式になる。

<a id="def-ml1-08-sigmoid"></a>

<!-- formal-statement-start -->
> **定義（logistic関数）**  
> 実数 $a\in\mathbb R$ に対し、次の写像 $\sigma:\mathbb R\to(0,1)$ をlogistic関数という。

$$
\sigma(a)=\frac1{1+e^{-a}}.
$$

<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-08-sigmoid -->
**定義の確認**。$a=0$ で $\sigma(0)=1/2$。$a=\log3$ で $e^{-a}=1/3$ より $\sigma(\log3)=3/4$。分母 $1+e^{-a}>1$ なので任意の実数入力で $0<\sigma(a)<1$ も確認できる。
<!-- definition-example-end -->

この関数は $\sigma(-a)=1-\sigma(a)$、$\sigma(a)/(1-\sigma(a))=e^a$ を満たす。この最後の比を **オッズ**（事象1の確率を事象0の確率で割った比）と呼ぶ。logistic回帰はこのオッズの対数を線形得点にする模型である。

<a id="def-ml1-08-logistic"></a>

<!-- formal-statement-start -->
> **定義（logistic回帰模型）**  
> $d\ge2$、拡張入力 $z=(1,x^{\mathsf T})^{\mathsf T}\in\mathbb R^d$ と係数 $\theta\in\mathbb R^d$ に対し、$Y\in\{0,1\}$ の条件付き確率を[logistic関数](#def-ml1-08-sigmoid)で次のように定める模型をlogistic回帰模型という。

$$
q_\theta(1\mid z)=\sigma(\theta^{\mathsf T}z)
=\frac{e^{\theta^{\mathsf T}z}}{1+e^{\theta^{\mathsf T}z}},
\qquad
q_\theta(0\mid z)=1-q_\theta(1\mid z).
$$

> どの有限係数でも両確率は厳密に0と1の間にある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-08-logistic -->
**定義の確認**。$p=1$、$\theta=(0,\log3)^{\mathsf T}$、$x=1$ とすれば $z=(1,1)^{\mathsf T}$、得点は $\log3$。従って

$$
q_\theta(1\mid z)=\frac{3}{1+3}=\frac34,
\qquad
q_\theta(0\mid z)=\frac14.
$$

両値は非負で総和は1、オッズは $(3/4)/(1/4)=3=e^{\theta^{\mathsf T}z}$ である。$x=0$ なら得点0で両確率は $1/2$ になる。切片と特徴量のどちらが得点を変えるかもこの計算から分かる。
<!-- definition-example-end -->

各標本 $(z_i,y_i)$ に模型が割り当てる確率は $q_i^{y_i}(1-q_i)^{1-y_i}$（$q_i=\sigma(\theta^{\mathsf T}z_i)$）である。独立なラベルの条件付き尤度を最大化するなら、この積の負の対数を最小化する。[経験リスクの考え方](../ML1-03/index.md#def-ml1-03-erm)に合わせ、$n$ で割った平均を目的関数とする。

<a id="def-ml1-08-log-loss"></a>

<!-- formal-statement-start -->
> **定義（二値対数損失と経験負対数尤度）**  
> $y\in\{0,1\}$ と予測確率 $q\in(0,1)$ に対して、二値対数損失を

$$
\ell_{\log}(q,y)=-y\log q-(1-y)\log(1-q)
$$

> と定める。$n\ge1$ 個の二値標本 $(z_i,y_i)$ に対するlogistic回帰の経験負対数尤度は

$$
L_n(\theta)=\frac1n\sum_{i=1}^n
\ell_{\log}(\sigma(\theta^{\mathsf T}z_i),y_i)
$$

> である。独立標本の条件付き尤度の負の対数を $n$ で割ったものに一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-08-log-loss -->
**定義の確認**。直前の $q=3/4$ を使い、$y=1$ なら損失は $-\log(3/4)=\log(4/3)>0$、$y=0$ なら $-\log(1/4)=\log4$。これは誤ったラベルへ強い確信を置くほど損失が大きくなることを示す。一点標本 $n=1$ なら平均損失はそのまま一標本の負の対数尤度である。
<!-- definition-example-end -->

この損失は二値の真の条件付き確率を復元するという意味も持つ。真のラベル1の確率を $\eta$ とすれば、確率 $q$ を報告する場合の条件付き期待損失は $-\eta\log q-(1-\eta)\log(1-q)$ になる。

<a id="thm-ml1-08-log-proper"></a>

<!-- formal-statement-start -->
> **定理（二値対数損失の条件付き最適性）**  
> $0<\eta<1$ のBernoulliラベル $Y$ に対して、$q\in(0,1)$ 上の期待対数損失

$$
r_\eta(q)=-\eta\log q-(1-\eta)\log(1-q)
$$

> は $q=\eta$ を唯一の最小点とする。$\eta=0$ または $\eta=1$ の場合、$q\in(0,1)$ 上では最小値を達成せず、境界 $q\downarrow0$ または $q\uparrow1$ で下限0へ近付く。
<!-- formal-statement-end -->

### 証明の見取り図

確率そのものを変数にし、1階微分の符号が $q=\eta$ の前後で変わることを調べる。境界のラベルは別に扱わないと、存在しない最小点を作ってしまう。

<!-- proof-start -->
### 証明

$0<q<1$ で微分すると

$$
r_\eta'(q)=-\frac{\eta}{q}+\frac{1-\eta}{1-q}
=\frac{q-\eta}{q(1-q)}.
$$

分母は正であり、$0<\eta<1$ なら $q<\eta$ で負、$q>\eta$ で正である。従って $q=\eta$ が唯一の最小点になる。二階微分も

$$
r_\eta''(q)=\frac{\eta}{q^2}+\frac{1-\eta}{(1-q)^2}>0
$$

となり、厳密な凸性と整合する。$\eta=0$ では $r_0(q)=-\log(1-q)$ が $q\downarrow0$ で0へ近付くが有限の許容値 $q>0$ では正である。$\eta=1$ では $r_1(q)=-\log q$ が $q\uparrow1$ で同様になる。$\square$
<!-- proof-end -->

この定理は「任意のデータでlogistic模型が真の確率を出せる」という主張ではない。真の $\eta(x)$ がlogistic回帰の表現形に属するとは限らないためだ。**対数損失自体の最適性**と **有限次元模型による近似可能性**は分けて考える。

## 3. 二値負対数尤度の勾配・Hessian・凸性

最適化に入る前に、指数関数を含む損失を得点 $a$ の関数へ整理しよう。$q=e^a/(1+e^a)$ なので

$$
\begin{aligned}
-\log q&=\log(1+e^a)-a,\\
-\log(1-q)&=\log(1+e^a).
\end{aligned}
$$

したがって一標本の損失は $h_y(a)=\log(1+e^a)-ya$。この形なら $q$ の微分を経由しても、直接計算しても同じ結果になる。

<a id="thm-ml1-08-binary-derivatives"></a>

<!-- formal-statement-start -->
> **定理（二値logistic損失の勾配とHessian）**  
> $n\ge1$、$z_i\in\mathbb R^d$、$y_i\in\{0,1\}$ とし、$L_n$ を[二値経験負対数尤度](#def-ml1-08-log-loss)とする。$q_i=\sigma(\theta^{\mathsf T}z_i)$ と書けば、任意の $\theta\in\mathbb R^d$ で

$$
\nabla L_n(\theta)=\frac1n\sum_{i=1}^n(q_i-y_i)z_i,
$$

$$
\nabla^2L_n(\theta)
=\frac1n\sum_{i=1}^n q_i(1-q_i)z_iz_i^{\mathsf T}.
$$

> 特に $L_n$ は凸関数であり、設計行列 $Z$（第 $i$ 行が $z_i^{\mathsf T}$）の列階数が $d$ なら厳密凸である。ただし厳密凸性だけで最小点の存在は保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

一標本の得点を一回微分すると $q-y$、もう一回微分すると $q(1-q)$ が出る。これを線形得点へ連鎖律で戻すと、Hessianは非負の重みを付けた列ベクトルとその転置の積の和となる。

<!-- proof-start -->
### 証明

$h_y(a)=\log(1+e^a)-ya$ を微分すると

$$
h_y'(a)=\frac{e^a}{1+e^a}-y=\sigma(a)-y.
$$

さらに $\sigma(a)=e^a/(1+e^a)$ を商の微分法で計算する。

$$
\sigma'(a)=\frac{e^a(1+e^a)-e^a e^a}{(1+e^a)^2}
=\frac{e^a}{(1+e^a)^2}
=\sigma(a)(1-\sigma(a)).
$$

$a_i(\theta)=\theta^{\mathsf T}z_i$ について $\nabla_\theta a_i=z_i$、$z_i$ は固定なので $\nabla_\theta^2a_i=0$。連鎖律から

$$
\nabla_\theta h_{y_i}(a_i)=(q_i-y_i)z_i,
\quad
\nabla_\theta^2h_{y_i}(a_i)
=q_i(1-q_i)z_iz_i^{\mathsf T}.
$$

有限和を $n$ で割れば表示の勾配とHessianを得る。任意の $v\in\mathbb R^d$ について

$$
v^{\mathsf T}\nabla^2L_n(\theta)v
=\frac1n\sum_{i=1}^nq_i(1-q_i)(z_i^{\mathsf T}v)^2\ge0.
$$

ゆえに[Hessianによる凸性判定](../../OPT/OPT1/index.md#thm-opt1-hessian-convexity)を、開凸集合 $\mathbb R^d$ 上の二階連続微分可能関数 $L_n$ に適用できる。さらに $Z$ が列フルランクで $v\ne0$ なら少なくとも一つの $z_i^{\mathsf T}v\ne0$ があり、全 $q_i(1-q_i)>0$ なので二次形式は正である。各直線上の二階微分が正となり厳密凸である。$\square$
<!-- proof-end -->

たとえば $n=2$、$z_1=(1,-1)^{\mathsf T}$、$z_2=(1,1)^{\mathsf T}$、$\theta=0$ とすると $q_1=q_2=1/2$ なので

$$
\nabla^2L_2(0)
=\frac18(z_1z_1^{\mathsf T}+z_2z_2^{\mathsf T})
=\frac14 I_2.
$$

第1標本のラベル0、第2標本のラベル1なら、勾配は

$$
\nabla L_2(0)
=\frac12\left\{\frac12(1,-1)^{\mathsf T}
-\frac12(1,1)^{\mathsf T}\right\}
=(0,-1/2)^{\mathsf T}.
$$

傾き係数を増やす方向に損失が減ることを表している。**Hessianが正定値であっても最小点が存在しない**例を第6節で確かめる。

## 4. 生成的LDAとlogistic回帰の接点

二クラスの[共有共分散Gaussian判別](../ML1-07/index.md#thm-ml1-07-lda-affine)では、正定値 $\Sigma$、平均 $\mu_0,\mu_1\in\mathbb R^p$、事前確率 $\pi_0,\pi_1>0$ のもとで、対数事後オッズは判別得点差となる。前章の得点式を差し引くと

$$
\begin{aligned}
\log\frac{P(Y=1\mid X=x)}{P(Y=0\mid X=x)}
&=\delta_1(x)-\delta_0(x)\\
&=(\mu_1-\mu_0)^{\mathsf T}\Sigma^{-1}x
-\frac12\left(
\mu_1^{\mathsf T}\Sigma^{-1}\mu_1
-\mu_0^{\mathsf T}\Sigma^{-1}\mu_0\right)
+\log\frac{\pi_1}{\pi_0}.
\end{aligned}
$$

右辺を $b+w^{\mathsf T}x$ と書けば、オッズを解く操作で

$$
P(Y=1\mid X=x)
=\frac{e^{b+w^{\mathsf T}x}}{1+e^{b+w^{\mathsf T}x}}
$$

が得られる。すなわちLDAの**母集団での条件付き確率**はlogisticの形になる。ただしLDAは各クラスの平均・共分散・事前確率を推定し、logistic回帰はラベルの条件付き尤度を直接最大化する。模型が同じ形の条件付き確率を表せても、有限標本で両推定量が一致するわけではない。

## 5. 多クラスの場合：softmax回帰

$K\ge2$ 個のクラス $\mathcal Y=\{0,\ldots,K-1\}$ に進む。二値の場合はオッズを一つ決めればよかったが、多クラスでは $K$ 個の得点 $a_k$ を指数に移し、その総和で割ると非負で和1の確率が作れる。この正規化をsoftmaxという。

<a id="def-ml1-08-softmax"></a>

<!-- formal-statement-start -->
> **定義（softmax回帰模型）**  
> $K\ge2$、$d\ge2$ とし、各クラスの係数 $\theta_k\in\mathbb R^d$ と拡張入力 $z\in\mathbb R^d$ を取る。$a_k=\theta_k^{\mathsf T}z$ とおき、条件付きクラス確率を

$$
q_\Theta(k\mid z)
=\frac{\exp(a_k)}{\sum_{j=0}^{K-1}\exp(a_j)}
\quad(k=0,\ldots,K-1)
$$

> とする模型をsoftmax回帰模型という。$\Theta=(\theta_0,\ldots,\theta_{K-1})$ は係数の組である。各確率は正、総和は1となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-08-softmax -->
**定義の確認**。$K=3,p=1$、$z=(1,1)^{\mathsf T}$、$\theta_0=(0,0)^{\mathsf T}$、$\theta_1=(\log2,0)^{\mathsf T}$、$\theta_2=(0,\log3)^{\mathsf T}$ とする。基底 $\mathbb R^2$ の座標で内積を取ると得点は $(0,\log2,\log3)$。指数は $(1,2,3)$、分母は6なので

$$
(q_\Theta(0\mid z),q_\Theta(1\mid z),q_\Theta(2\mid z))
=\left(\frac16,\frac26,\frac36\right).
$$

各値は正で和は1。例えばクラス2と1の確率比は $(3/6)/(2/6)=3/2=e^{a_2-a_1}$ となる。どのクラスが分母へ寄与するかを確かめた。
<!-- definition-example-end -->

観測ラベルが $y_i\in\mathcal Y$ なら、そのラベルの予測確率に負の対数を取る。一標本で $-\log q_\Theta(y_i\mid z_i)$、平均を取って経験負対数尤度にする。クラスごとの指示関数 $\mathbf 1\{y_i=k\}$ は、該当するとき1、それ以外0である。

<a id="def-ml1-08-softmax-loss"></a>

<!-- formal-statement-start -->
> **定義（softmaxの経験対数損失）**  
> $n\ge1$、$(z_i,y_i)\in\mathbb R^d\times\{0,\ldots,K-1\}$ の標本と係数 $\Theta$ に対し、

$$
L_n^{(K)}(\Theta)
=-\frac1n\sum_{i=1}^n\log q_\Theta(y_i\mid z_i)
=\frac1n\sum_{i=1}^n
\left\{\log\sum_{k=0}^{K-1}e^{\theta_k^{\mathsf T}z_i}
-\theta_{y_i}^{\mathsf T}z_i\right\}
$$

> をsoftmaxの経験対数損失とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-08-softmax-loss -->
**定義の確認**。直前の三クラス模型でラベル $y=2$ の一標本なら、指定クラスの確率は $3/6=1/2$ であり、損失は $\log2$。得点表示からも $\log(1+2+3)-\log3=\log6-\log3=\log2$ で一致する。$y=0$ なら $\log6$ となり、確率が小さいラベルの損失ほど大きい。
<!-- definition-example-end -->

<a id="thm-ml1-08-softmax-derivatives"></a>

<!-- formal-statement-start -->
> **定理（softmax損失の勾配・Hessian・凸性）**  
> 上の $L_n^{(K)}$ と任意の有限係数 $\Theta$ に対し、$q_{ik}=q_\Theta(k\mid z_i)$ と書く。クラス $k,l\in\{0,\ldots,K-1\}$ に関する微分は

$$
\nabla_{\theta_k}L_n^{(K)}
=\frac1n\sum_{i=1}^n
\bigl(q_{ik}-\mathbf 1\{y_i=k\}\bigr)z_i,
$$

$$
\nabla_{\theta_l}\nabla_{\theta_k}L_n^{(K)}
=\frac1n\sum_{i=1}^n
q_{ik}(\mathbf1\{k=l\}-q_{il})z_iz_i^{\mathsf T}
$$

> である。このHessianは全係数に関して半正定値であり、$L_n^{(K)}$ は凸である。
<!-- formal-statement-end -->

### 証明の見取り図

指数の和の微分はsoftmax確率を生む。二回微分すると「カテゴリ確率の共分散行列」に相当する重みが現れる。任意の方向に沿う二次形式を分散として書き直すと、非負性が分かる。

<!-- proof-start -->
### 証明

各標本の得点 $a_{ik}=\theta_k^{\mathsf T}z_i$ を独立な中間変数として扱う。$S_i=\sum_j e^{a_{ij}}$ とおけば、$S_i>0$ で

$$
\frac{\partial\log S_i}{\partial a_{ik}}
=\frac{e^{a_{ik}}}{S_i}=q_{ik}.
$$

分母と分子をそれぞれ微分することで

$$
\frac{\partial q_{ik}}{\partial a_{il}}
=\frac{\mathbf1\{k=l\}e^{a_{ik}}S_i-e^{a_{ik}}e^{a_{il}}}{S_i^2}
=q_{ik}(\mathbf1\{k=l\}-q_{il})
$$

を得る。$\partial a_{ik}/\partial\theta_k=z_i$ と他クラスへの微分が0であることから、有限和への連鎖律で表示の勾配とHessianを得る。

半正定値性を調べるため各クラスの摂動ベクトル $v_k\in\mathbb R^d$ を任意に取り、$b_{ik}=v_k^{\mathsf T}z_i$ とする。Hessianの二次形式は

$$
\begin{aligned}
\sum_{k,l}v_k^{\mathsf T}
(\nabla_{\theta_l}\nabla_{\theta_k}L_n^{(K)})v_l
&=\frac1n\sum_i
\left\{\sum_kq_{ik}b_{ik}^2
-\left(\sum_kq_{ik}b_{ik}\right)^2\right\}\\
&=\frac1n\sum_i\sum_kq_{ik}
\left(b_{ik}-\sum_lq_{il}b_{il}\right)^2
\ge0.
\end{aligned}
$$

二行目は $\sum_kq_{ik}=1$ を用いて平方を展開すれば得られる。すべての係数について二階連続微分可能なので、[Hessianによる凸性判定](../../OPT/OPT1/index.md#thm-opt1-hessian-convexity)により凸である。$\square$
<!-- proof-end -->

たとえば上の三クラス例では $q=(1/6,1/3,1/2)$。一標本で $y=2$ のとき、得点に関する勾配成分は $(1/6,1/3,-1/2)$ で総和0となる。すべてのクラス得点を同じ量だけ上げても確率が変わらないことを、この勾配も反映している。

## 6. 係数の識別可能性と、完全分離で起きること

softmaxのすべてのクラスの得点に同じ値 $c^{\mathsf T}z$ を足すと、分子と分母の双方に $e^{c^{\mathsf T}z}$ が掛かり相殺される。したがって係数は確率だけからは一意に定まらない。この曖昧さを解くには、基準クラスの係数を0に固定するなどの制約を設ければよい。

<a id="prop-ml1-08-softmax-shift"></a>

<!-- formal-statement-start -->
> **命題（softmaxの共通シフト不変性と二値logisticへの還元）**  
> $K\ge2$ のsoftmax回帰で任意の $c\in\mathbb R^d$ について $\theta_k'=\theta_k+c$ とすると、全入力 $z$ と全クラス $k$ で $q_{\Theta'}(k\mid z)=q_\Theta(k\mid z)$ が成立する。$K=2$ で $\theta_0=0$ と固定すると

$$
q_\Theta(1\mid z)
=\sigma(\theta_1^{\mathsf T}z).
$$

<!-- formal-statement-end -->

### 証明の見取り図

共通因子を約分し、二クラスの場合は分母にある二項を整理する。

<!-- proof-start -->
### 証明

$\exp((\theta_k+c)^{\mathsf T}z)=e^{c^{\mathsf T}z}\exp(\theta_k^{\mathsf T}z)$ なので、softmaxの分子・分母に現れる正の共通因子は相殺される。特に $c=-\theta_0$ と選べば、全クラスの確率を変えずに $\theta_0'=0$ とできる。$K=2$ で $\theta_0=0$ なら

$$
q_\Theta(1\mid z)
=\frac{e^{\theta_1^{\mathsf T}z}}{1+e^{\theta_1^{\mathsf T}z}}
=\sigma(\theta_1^{\mathsf T}z).
$$

$\square$
<!-- proof-end -->

**係数の非一意性**と、**最適解の非存在**は別の現象である。後者を起こす典型例が完全分離である。有限標本の二値データが、ある方向に沿って全点を正しく、かつ厳密な正の余裕で分類できるとき、その方向へ係数を大きくするほど予測確率を0または1へ押し付けられる。

<a id="def-ml1-08-separation"></a>

<!-- formal-statement-start -->
> **定義（二値標本の完全分離）**  
> $n\ge1$ の二値標本 $(z_i,y_i)$（$y_i\in\{0,1\}$）が完全分離可能であるとは、ある $v\in\mathbb R^d$ が存在し、全 $i$ で

$$
(2y_i-1)v^{\mathsf T}z_i>0
$$

> が成立することをいう。すなわち $y_i=1$ の得点は正、$y_i=0$ の得点は負になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-08-separation -->
**定義の確認**。$x_1=-1,y_1=0$ と $x_2=1,y_2=1$ を取る。切片を含む $z_1=(1,-1)^{\mathsf T}$、$z_2=(1,1)^{\mathsf T}$ について $v=(0,1)^{\mathsf T}$ を選ぶと

$$
(2y_1-1)v^{\mathsf T}z_1=(-1)(-1)=1,\quad
(2y_2-1)v^{\mathsf T}z_2=(1)(1)=1.
$$

両方が厳密に正であり、分離条件を全標本で確かめた。$Z$ の二列は独立なので、これは列フルランクの例でもある。
<!-- definition-example-end -->

<a id="thm-ml1-08-separation-no-mle"></a>

<!-- formal-statement-start -->
> **定理（完全分離なら非正則化logistic最小点は存在しない）**  
> $n\ge1$ の有限二値標本が[完全分離可能](#def-ml1-08-separation)なら、[経験負対数尤度](#def-ml1-08-log-loss)は非負で下限が0であるが、任意の有限 $\theta\in\mathbb R^d$ で $L_n(\theta)>0$ となる。したがって有限の最小化係数は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

分離方向 $v$ を $t$ 倍し、$t\to\infty$ とする。正しいラベルの得点がすべて無限大の方向へ進み損失が0へ近付くが、有限得点では予測確率は0にも1にもならない。

<!-- proof-start -->
### 証明

分離する $v$ に対して $m_i=(2y_i-1)v^{\mathsf T}z_i>0$ とおく。$\theta=tv$（$t>0$）を代入すると、$y_i=1$ なら得点は $tm_i$、$y_i=0$ なら得点は $-tm_i$ である。両場合を一標本の損失へ代入して

$$
\ell_{\log}(\sigma(tv^{\mathsf T}z_i),y_i)
=\log(1+e^{-tm_i})
$$

となる。各 $m_i>0$ だから $t\to\infty$ で $e^{-tm_i}\to0$、従って有限個の平均として

$$
\lim_{t\to\infty}L_n(tv)
=\frac1n\sum_i\log(1+0)=0.
$$

各対数損失は非負なので下限は0である。一方、有限 $\theta$ なら $q_i=\sigma(\theta^{\mathsf T}z_i)$ は $0<q_i<1$。$y_i=1$ なら $-\log q_i>0$、$y_i=0$ なら $-\log(1-q_i)>0$。よって各項が正で $L_n(\theta)>0$、下限0をどこでも達成できない。$\square$
<!-- proof-end -->

先ほどの二点データで $\theta=(0,t)^{\mathsf T}$ を代入すると

$$
L_2(0,t)=\log(1+e^{-t}),\qquad
\frac{d}{dt}L_2(0,t)=-\frac1{1+e^t}<0.
$$

得点が離れるほど損失は単調減少し、$t$ がどれほど大きくても有限最適値にはならない。[前節のHessian](#thm-ml1-08-binary-derivatives)はこのデータで全有限係数に対して正定値であり、厳密凸でも最小点が存在し得ない事実を直接示す。

## 7. 正則化と数値的に安全な計算

完全分離のときの発散を防ぐ一つの方法は、係数の大きさに費用を付けることである。[正則化経験リスク](../ML1-03/index.md#def-ml1-03-regularized-erm)に従って、ここでは数学的に存在と一意性を明確にするため **切片を含む全係数**を罰する場合を扱う。

<a id="thm-ml1-08-ridge-existence"></a>

<!-- formal-statement-start -->
> **定理（二乗罰則付きlogistic目的の一意な最小点）**  
> $n\ge1$ の任意の有限二値標本と $\lambda>0$ に対し、

$$
F_\lambda(\theta)
=L_n(\theta)+\frac{\lambda}{2}\|\theta\|_2^2
$$

> は $\mathbb R^d$ 上で有限の最小点をちょうど一つ持つ。分離可能か否かは問わない。
<!-- formal-statement-end -->

### 証明の見取り図

対数損失は非負なので、二乗罰則が係数を無限遠へ逃がさない。存在はコンパクト集合上での連続性から、一意性は正の二次項の厳密凸性から得る。

<!-- proof-start -->
### 証明

$L_n$ は有限和の連続関数で $L_n(\theta)\ge0$。従って $F_\lambda(\theta)\ge(\lambda/2)\|\theta\|_2^2$ であり、$\|\theta\|\to\infty$ なら $F_\lambda(\theta)\to\infty$。$F_\lambda(0)$ は有限であるから、十分大きな $R$ を選べば $\|\theta\|>R$ の点は $F_\lambda(0)$ より大きい。閉球 $\{\|\theta\|\le R\}$ 上の連続関数は最小値を取るので、全空間でも最小点が存在する。

さらに[二値Hessianの式](#thm-ml1-08-binary-derivatives)から

$$
\nabla^2F_\lambda(\theta)
=\nabla^2L_n(\theta)+\lambda I_d
$$

となる。任意の非零 $v$ に対して $v^{\mathsf T}\nabla^2F_\lambda v\ge\lambda\|v\|^2>0$。従って厳密凸であり、二つの異なる最小点があればその中点で両者より小さい値を取るという矛盾が生じる。$\square$
<!-- proof-end -->

実務では切片を罰しない設計が多いが、その場合にこの定理を無条件に適用してはいけない。例えば訓練ラベルが全部1なら、切片を $+\infty$ へ送ることで罰則を増やさず対数損失を0へ近付けられる。**全係数への罰則**という仮定が存在証明の鍵である。

指数関数をそのまま計算すると $e^{1000}$ などが数値的に溢れる。安定な実装には $a\in\mathbb R$ に対し

$$
\log(1+e^a)=\max(0,a)+\log(1+e^{-|a|})
$$

を使えばよい。$a\ge0$ なら $1+e^a=e^a(1+e^{-a})$、$a<0$ なら右辺はそのまま $\log(1+e^a)$ だから両場合で等しい。

softmaxについても $m=\max_k a_k$ と置けば

$$
\log\sum_k e^{a_k}
=m+\log\sum_k e^{a_k-m}
$$

であり、最大の指数は $e^0=1$、他も $0<e^{a_k-m}\le1$ となる。**値の変わらない変形**を数値計算に用いるのであって、損失関数そのものを変えるわけではない。

## 8. 計算ラボ：有限差分と分離の数値確認

次のPythonラボは二値模型の解析勾配・Hessianと中心差分を照合し、同じ二点標本で分離方向を伸ばしたときの損失を確認する。softmaxでも安定な指数正規化を使う。まず空欄を埋め、$\lambda=0.1$ の場合の目的値も比較しよう。

~~~python-lab
# lab-id: ml1-08-logistic-gradient-separation
# lab-title: logisticの勾配検算と完全分離
# lab-mode: exercise
# timeout-ms: 15000
import numpy as np

Z = np.array([[1., -1.], [1., 1.]])
y = np.array([0., 1.])
theta = np.array([0.2, -0.3])

def binary_loss(w):
    a = Z @ w
    return np.mean(np.logaddexp(0., a) - y * a)

def probabilities(w):
    a = Z @ w
    return np.exp(-np.logaddexp(0., -a))

q = probabilities(theta)
# 課題: 導出した勾配とHessianの式を入力する
grad = ___
H = ___
h = 1e-5
fd = np.array([(binary_loss(theta + h * np.eye(2)[j])
                - binary_loss(theta - h * np.eye(2)[j])) / (2*h)
               for j in range(2)])
print("grad =", grad, "finite difference =", fd)
print("H eigenvalues =", np.linalg.eigvalsh(H))
for t in [0., 1., 3., 8., 20.]:
    w = np.array([0., t])
    print(t, binary_loss(w), binary_loss(w) + 0.05*np.dot(w, w))

scores = np.array([0., 1000., 999.])
shift = scores - scores.max()
softmax = np.exp(shift) / np.exp(shift).sum()
print("stable softmax =", softmax)
~~~

~~~python-solution
import numpy as np
Z = np.array([[1., -1.], [1., 1.]])
y = np.array([0., 1.])
theta = np.array([0.2, -0.3])
def binary_loss(w):
    a = Z @ w
    return np.mean(np.logaddexp(0., a) - y * a)
def probabilities(w):
    a = Z @ w
    return np.exp(-np.logaddexp(0., -a))
q = probabilities(theta)
grad = Z.T @ (q-y) / len(y)
H = Z.T @ ((q*(1-q))[:, None]*Z) / len(y)
h = 1e-5
fd = np.array([(binary_loss(theta+h*np.eye(2)[j])
                - binary_loss(theta-h*np.eye(2)[j]))/(2*h) for j in range(2)])
print("grad =", grad, "finite difference =", fd)
print("H eigenvalues =", np.linalg.eigvalsh(H))
for t in [0., 1., 3., 8., 20.]:
    w = np.array([0., t])
    print(t, binary_loss(w), binary_loss(w)+0.05*np.dot(w,w))
scores = np.array([0., 1000., 999.])
shift = scores-scores.max()
softmax = np.exp(shift)/np.exp(shift).sum()
print("stable softmax =", softmax)
~~~

~~~python-test
assert Z.shape == (2, 2) and q.shape == (2,)
assert np.allclose(grad, fd, atol=1e-7)
assert np.all(np.linalg.eigvalsh(H) > 0)
assert np.all((softmax > 0) & (softmax < 1))
assert np.isclose(softmax.sum(), 1)
assert binary_loss(np.array([0., 20.])) < binary_loss(np.array([0., 1.]))
~~~

$H$ の固有値が正でも、正則化なしでは最適解が存在しない。一方、罰則を含む目的関数は $t$ を非常に大きくすると二次項が支配する。数値的な最小点を見つけることと、理論的な存在・一意性を区別できる。

## 演習

### ML1-08-A01 logistic確率・オッズ・損失
- Level: A
- 目安時間: 10分

$d=2$、$z=(1,2)^{\mathsf T}$、$\theta=(0,\log2)^{\mathsf T}$ とする。$q_\theta(1\mid z)$、オッズ、$y=1$ と $y=0$ の各対数損失を求めよ。

<!-- solution-start -->
#### 詳細解答

得点は $a=\theta^{\mathsf T}z=2\log2=\log4$ である。従って $e^a=4$、[logistic模型](#def-ml1-08-logistic)により $q=4/(1+4)=4/5$、$1-q=1/5$。オッズは $(4/5)/(1/5)=4$ で得点の指数と一致する。[対数損失](#def-ml1-08-log-loss)に代入すると、$y=1$ で $-\log(4/5)=\log(5/4)$、$y=0$ で $-\log(1/5)=\log5$ となる。
<!-- solution-end -->

### ML1-08-A02 真の確率に対する対数損失
- Level: A
- 目安時間: 12分

真の $P(Y=1)=1/4$ とする。報告確率 $q\in(0,1)$ に対する期待対数損失を書き、最小点と $q=1/2$ での微分の符号を求めよ。

<!-- solution-start -->
#### 詳細解答

$r(q)=-(1/4)\log q-(3/4)\log(1-q)$。[条件付き最適性](#thm-ml1-08-log-proper)の証明で用いた微分を $\eta=1/4$ に適用すると

$$
r'(q)=\frac{q-1/4}{q(1-q)}.
$$

最小点は $q=1/4$ に限る。$q=1/2$ では $r'(1/2)=(1/4)/(1/4)=1>0$ だから、$q$ を小さくする方向で損失を減らせる。
<!-- solution-end -->

### ML1-08-A03 一標本の勾配とHessian
- Level: A
- 目安時間: 12分

$n=1$、$z=(1,2)^{\mathsf T}$、$y=1$、$\theta=0$ とする。logistic損失の勾配と二階微分行列を求め、その階数を答えよ。

<!-- solution-start -->
#### 詳細解答

$q=\sigma(0)=1/2$ である。[二値logistic損失の勾配とHessian](#thm-ml1-08-binary-derivatives)に $n=1$ を代入し、

$$
\nabla L_1(0)=(1/2-1)(1,2)^{\mathsf T}
=(-1/2,-1)^{\mathsf T},
$$

$$
\nabla^2L_1(0)=\frac14
\begin{pmatrix}1&2\\2&4\end{pmatrix}.
$$

行列は $\frac14zz^{\mathsf T}$ で、$z\ne0$ なので階数1である。非負の重み付き列ベクトルとその転置の積だから半正定値だが、2次元で正定値ではない。
<!-- solution-end -->

### ML1-08-A04 三クラスsoftmaxと共通シフト
- Level: A
- 目安時間: 12分

ある入力の三クラス得点が $(0,\log2,\log4)$ である。softmax確率と、全得点に $5$ を加えたあとの確率を求めよ。

<!-- solution-start -->
#### 詳細解答

元の指数は $(1,2,4)$ で和7、従って確率は $(1/7,2/7,4/7)$ である。各得点へ5を加えると指数は $(e^5,2e^5,4e^5)$、和 $7e^5$ になる。各分子・分母を $e^5$ で割れば同じ $(1/7,2/7,4/7)$ であり、[共通シフト不変性](#prop-ml1-08-softmax-shift)を具体的に確かめられる。
<!-- solution-end -->

### ML1-08-A05 安定なlog-sum-exp
- Level: A
- 目安時間: 12分

得点 $(1000,998)$ の対数指数和 $\log(e^{1000}+e^{998})$ を、巨大な指数を直接計算せずに表せ。softmax確率も求めよ。

<!-- solution-start -->
#### 詳細解答

最大得点は $m=1000$ なので、両指数から $e^{1000}$ をくくって

$$
\log(e^{1000}+e^{998})
=1000+\log(1+e^{-2}).
$$

softmaxは $(1/(1+e^{-2}),e^{-2}/(1+e^{-2}))$ である。二つとも有限で和1となる。直接 $e^{1000}$ を浮動小数点で計算する必要はない。
<!-- solution-end -->

### ML1-08-B01 多標本Hessianと階数条件
- Level: B
- 目安時間: 18分

$n=2$、$z_1=(1,0)^{\mathsf T}$、$z_2=(1,1)^{\mathsf T}$、任意のラベル $y_1,y_2\in\{0,1\}$ とする。$\theta=0$ におけるHessianを求め、任意の有限係数で正定値になる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\theta=0$ では各 $q_i=1/2$、重み $q_i(1-q_i)=1/4$。よって[二値logistic損失の勾配とHessian](#thm-ml1-08-binary-derivatives)から

$$
\nabla^2L_2(0)
=\frac18\left\{
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\begin{pmatrix}1&1\\1&1\end{pmatrix}\right\}
=\frac18\begin{pmatrix}2&1\\1&1\end{pmatrix}.
$$

対角先頭成分 $2/8>0$、行列式 $(2-1)/64=1/64>0$ なので正定値。任意の有限 $\theta$ でも $q_i(1-q_i)>0$ である。$z_1,z_2$ は線形独立だから非零 $v$ に対して $(z_1^{\mathsf T}v)^2$ と $(z_2^{\mathsf T}v)^2$ の少なくとも一方が正となり、Hessian二次形式は正である。ラベルはHessianには直接現れない。
<!-- solution-end -->

### ML1-08-B02 softmax勾配と二階微分の方向
- Level: B
- 目安時間: 20分

$K=3,n=1$、$z=(1,0)^{\mathsf T}$、$\theta_0=\theta_1=\theta_2=0$、観測ラベル $y=2$ とする。各係数についての勾配を求め、方向 $v_0=(1,0)^{\mathsf T},v_1=(-1,0)^{\mathsf T},v_2=(0,0)^{\mathsf T}$ における二階微分を求めよ。

<!-- solution-start -->
#### 詳細解答

得点はすべて0なので $q_0=q_1=q_2=1/3$。[softmax勾配](#thm-ml1-08-softmax-derivatives)から $\nabla_{\theta_0}L=(1/3,0)^{\mathsf T}$、$\nabla_{\theta_1}L=(1/3,0)^{\mathsf T}$、$\nabla_{\theta_2}L=(-2/3,0)^{\mathsf T}$ となる。

方向得点は $b=(1,-1,0)$。重み付き平均は $(1-1+0)/3=0$、二乗平均は $(1+1+0)/3=2/3$。[Hessianの分散表示](#thm-ml1-08-softmax-derivatives)より二階方向微分は $2/3-0^2=2/3>0$ である。もし全 $v_k$ が同じなら全 $b_k$ も同じとなり、分散は0になる。
<!-- solution-end -->

### ML1-08-B03 完全分離と罰則の効果
- Level: B
- 目安時間: 20分

$z_1=(1,-1)^{\mathsf T},y_1=0$、$z_2=(1,1)^{\mathsf T},y_2=1$ とする。$\theta=(0,t)^{\mathsf T}$ に沿う経験対数損失とその微分を求め、有限最小点が存在しないことを示せ。さらに二乗罰則 $\lambda t^2/2$（$\lambda>0$）を加えたこの直線上の目的が $t\to\infty$ でどうなるか説明せよ。

<!-- solution-start -->
#### 詳細解答

第1点の得点は $-t$ でラベル0、第2点の得点は $t$ でラベル1。両点の損失は $\log(1+e^{-t})$ となる。平均も

$$
L_2(0,t)=\log(1+e^{-t}),
\qquad
\frac{d}{dt}L_2(0,t)=-\frac{e^{-t}}{1+e^{-t}}<0.
$$

$t\to\infty$ で0に近付くが、有限 $t$ では正である。全空間での非存在は[完全分離の定理](#thm-ml1-08-separation-no-mle)からも従う。罰則を加えると $L_2(0,t)+\lambda t^2/2$ であり、第一項は非負・有界、第二項は無限大へ向かう。従ってこの直線上で無限遠へ逃げることはできず、全空間での存在は[二乗罰則付き定理](#thm-ml1-08-ridge-existence)が保証する。
<!-- solution-end -->

### ML1-08-B04 LDAの事後確率をlogisticで書く
- Level: B
- 目安時間: 20分

一次元・二クラスLDAで平均 $\mu_0=0,\mu_1=2$、共通分散1、事前確率 $\pi_0=3/4,\pi_1=1/4$ とする。logistic回帰の切片 $b$ と傾き $w$ で同じ条件付きクラス1確率を表し、$x=1$ における値を求めよ。

<!-- solution-start -->
#### 詳細解答

[共有共分散判別式](../ML1-07/index.md#thm-ml1-07-lda-affine)で事後対数オッズは

$$
(2-0)x-\frac12(2^2-0^2)+\log\frac{1/4}{3/4}
=2x-2-\log3.
$$

従って $w=2$、$b=-2-\log3$ である。$x=1$ では得点 $2-2-\log3=-\log3$、指数は $1/3$。[logistic模型](#def-ml1-08-logistic)に代入し $P(Y=1\mid X=1)=(1/3)/(1+1/3)=1/4$ を得る。これは母集団模型の等価表現であり、推定手順の同一性ではない。
<!-- solution-end -->

### ML1-08-C01 二値からsoftmax・分離・数値安定性へ
- Level: C
- 目安時間: 35分

以下の各問で $z=(1,x)^{\mathsf T}$ とする。

1. $K=2$ のsoftmaxで $\theta_0=(0,0)^{\mathsf T}$、$\theta_1=(b,w)^{\mathsf T}$ としたとき、クラス1の確率と一標本の損失が二値logisticと一致することを式で示せ。
2. 二点 $(x_1,y_1)=(-1,0)$、$(x_2,y_2)=(1,1)$ のデータについて、$\theta_1=(0,t)^{\mathsf T}$ としたときの損失を求め、最小点の存在とHessianの正定値性をそれぞれ判定せよ。
3. この標本に全係数を罰する $\lambda\|\theta_1\|^2/2$ を加えたときの一意性を証明上の仮定とともに述べよ。
4. クラス得点が $(1000,1001)$ のとき、オーバーフローを避けてクラス1のsoftmax確率を求めよ。

<!-- solution-start -->
#### 詳細解答

**（1）** [共通シフトと還元の命題](#prop-ml1-08-softmax-shift)の式へ直接代入すると、得点は $a_0=0,a_1=b+wx$ である。従って

$$
q_1=\frac{e^{b+wx}}{1+e^{b+wx}}=\sigma(b+wx),\qquad
q_0=\frac1{1+e^{b+wx}}.
$$

観測 $y\in\{0,1\}$ のsoftmax対数損失は $\log(1+e^{b+wx})-y(b+wx)$ で、[二値対数損失](#def-ml1-08-log-loss)を得点へ書き直した式と一致する。

**（2）** 得点は $(-t,t)$、観測クラスへ与えた確率は両点で $\sigma(t)$ となる。ゆえに

$$
L_2(0,t)=-\log\sigma(t)=\log(1+e^{-t}).
$$

この式は $t\to\infty$ で0へ収束し、有限 $t$ では正。[完全分離の定理](#thm-ml1-08-separation-no-mle)により、係数空間上の有限最小点は存在しない。一方、設計行列

$$
Z=\begin{pmatrix}1&-1\\1&1\end{pmatrix},
\qquad
\det Z=2\ne0
$$

は列フルランクである。任意の有限 $\theta_1$ では二つの重み $q_i(1-q_i)>0$。従って[二値logistic損失の勾配とHessian](#thm-ml1-08-binary-derivatives)の二次形式は非零方向に対して正となる。正定値と最小点存在は矛盾しない。

**（3）** $\lambda>0$、罰則は切片も含む $\lambda\|\theta_1\|^2/2$ で、損失は非負・連続、罰則は係数ノルムを無限大へ送ると発散する。したがって最小点が存在する。Hessianには $\lambda I_2$ が加わり全方向で正となるので厳密凸であり、最小点は一意である。[二乗罰則付き定理](#thm-ml1-08-ridge-existence)の仮定をすべて満たす。ここでは基準クラスの係数を固定し、softmaxの共通シフトの曖昧さも取り除いた。

**（4）** 最大得点 $m=1001$ を引いて指数を取ると $(e^{-1},1)$ になる。従って

$$
q_1=\frac1{1+e^{-1}}=\frac{e}{1+e},
$$

であり、$e^{1001}$ を計算する必要はない。
<!-- solution-end -->

## 9. この章で得たこと

生成的分類から、$P(Y\mid X)$ を直接与える判別的分類へ進んだ。二値logisticと多クラスsoftmaxの対数損失は、観測ラベルに与えた確率の負の対数である。勾配とHessianは有限和から導け、Hessianの半正定値性により経験損失の凸性が従う。一方で完全分離なら、損失の下限に近付いても有限の最小点が存在しない。正則化の仮定と数値的な安定化を区別して設計しよう。

次のML1-09では、こうした滑らかな凸損失を実際に最小化する勾配法について、下降量と歩幅の条件を調べる。
