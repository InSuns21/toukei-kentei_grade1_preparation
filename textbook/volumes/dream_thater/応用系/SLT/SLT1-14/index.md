# SLT1-14 算法安定性と期待汎化

<!-- definition-example-audit: strict -->

## 1. 仮説を全部数えなくても汎化を測れるか

[有限クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)は、学習算法が標本を見た後に選ぶ候補まで保証するために、候補集合全体を評価した。[正則化ERM](../SLT1-13/index.md#def-slt1-13-penalized-erm)では、その比較に罰則を加えた。

別の視点もある。学習器が一つの観測値を別の値へ置き換えられても、**どの試験点で測った損失もほとんど変わらない**なら、訓練点を特別扱いして過適合する度合いは小さいのではないか。この「学習の出力の変わりにくさ」を使えば、仮説集合が無限でも期待汎化を直接評価できる。

まず、学習算法を標本 $S$ を受け取って予測器 $A_n(S)$ を返す規則とし、標本数 $n$ を下付き添字で表す。初めは算法を決定的とする。確率的な結果では、観測空間 $\mathcal Z$ 上の確率分布 $P$ から独立同分布に

$$
S=(Z_1,\ldots,Z_n)\sim P^n,\qquad n\ge1
$$

を得る。[母集団リスクと経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)は

$$
R_P(h)=\mathbb E_{Z\sim P}\ell(h,Z),
\qquad
\widehat R_S(h)=\frac1n\sum_{i=1}^n\ell(h,Z_i)
$$

である。ここで $Z$ は訓練標本とは独立な試験点を表し、$\ell(h,z)$ は可測な損失である。以下の期待値定理では $0\le\ell(h,z)\le1$ を課して可積分性を確保する。

## 2. 一点置換と一点削除は別操作

訓練標本の第 $i$ 番目に元の $Z_i$ とは独立な観測 $Z_i'$ を入れれば、標本数は $n$ のままである。一方、第 $i$ 番目を除けば標本数は $n-1$ になる。この違いが、あとで使う学習器の違いになる。

<a id="def-slt1-14-replace-one"></a>

<!-- formal-statement-start -->
> **定義（一点置換標本と一点削除標本）**
> $n\ge1$、$S=(z_1,\ldots,z_n)\in\mathcal Z^n$、$i\in\{1,\ldots,n\}$ とする。任意の $z_i'\in\mathcal Z$ に対し、一点置換標本を

$$
S^{(i)}=(z_1,\ldots,z_{i-1},z_i',z_{i+1},\ldots,z_n)
$$

> と定める。$n\ge2$ の場合、一点削除標本を

$$
S_{-i}=(z_1,\ldots,z_{i-1},z_{i+1},\ldots,z_n)\in\mathcal Z^{n-1}
$$

> と定める。同じ長さの標本 $S,T\in\mathcal Z^n$ が高々一つの座標で異なるとき、両者を**隣接標本**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-14-replace-one -->
**定義の確認**。$S=(a,b,c)$ の2番目を $d$ に取り替えると $S^{(2)}=(a,d,c)$ で、長さ3のままである。2番目を削除すると $S_{-2}=(a,c)$ で、長さ2になる。$S$ と $S^{(2)}$ は隣接するが、$S$ と $S_{-2}$ は標本長が違うので、この定義での隣接標本ではない。
<!-- definition-example-end -->

学習算法の安定性では、ある標本だけの変化でなく、**全ての置換と全ての試験点**で損失差を抑える。

<a id="def-slt1-14-uniform-stability"></a>

<!-- formal-statement-start -->
> **定義（一様算法安定性）**
> $n\ge1$、非空な標本空間 $\mathcal Z$、予測器集合 $\mathcal H$、実数値損失 $\ell:\mathcal H\times\mathcal Z\to\mathbb R$ と決定的算法 $A_n:\mathcal Z^n\to\mathcal H$ を与える。$\beta_n\ge0$ に対し、任意の隣接標本 $S,T\in\mathcal Z^n$ と任意の試験点 $z\in\mathcal Z$ で

$$
|\ell(A_n(S),z)-\ell(A_n(T),z)|\le\beta_n
$$

> が成立するとき、$A_n$ は係数 $\beta_n$ の**一様算法安定性**を持つという。$\beta_n$ は分布 $P$ や観測標本の実現値に依存しない上界である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-14-uniform-stability -->
**定義の確認**。$\mathcal Z=[0,1]$、$\mathcal H=[0,1]$、$A_n(S)=\bar z=n^{-1}\sum_i z_i$、$\ell(w,z)=(w-z)^2$ とする。一点置換した標本の平均を $\bar z'$ と書くと

$$
|\bar z-\bar z'|=\frac{|z_i-z_i'|}{n}\le\frac1n.
$$

さらに両平均と試験点は $[0,1]$ にあるから

$$
\begin{aligned}
|(\bar z-z)^2-(\bar z'-z)^2|
&=|\bar z-\bar z'|\,|\bar z+\bar z'-2z|\\
&\le\frac1n\cdot2=\frac2n.
\end{aligned}
$$

これは全ての標本・置換位置・試験点で成り立ち、$\beta_n=2/n$ が使える。例えば $n=2$、$S=(0,0)$、$T=(1,0)$、試験点 $z=1$ なら損失差は $|1-1/4|=3/4\le1$ である。**一つの例で小さかったこと**ではなく、その直前の一様不等式が定義の全称条件を検証している。
<!-- definition-example-end -->

定数予測器だけを返す算法なら標本がどう変わっても出力は同じなので $\beta_n=0$ である。しかし、これだけでその予測器のリスクが小さいとはいえない。安定性が直接測るのは**訓練による楽観的な偏り**であり、予測の良さそのものではない。

## 3. 訓練後に選んだ予測器のリスク差

[固定予測器の経験リスクの不偏性](../../ML/ML1-01/index.md#thm-ml1-01-unbiased-risk)は、標本を見てから予測器を選ぶ場合にはそのまま使えない。そこで、学習後の予測器について母集団と訓練上の値の差を記録する。

<a id="def-slt1-14-generalization-gap"></a>

<!-- formal-statement-start -->
> **定義（汎化ギャップ）**
> $n\ge1$、$S\sim P^n$、可測な決定的算法 $A_n$、可積分な損失 $\ell$ を与える。学習後の予測器 $A_n(S)$ の**汎化ギャップ**を

$$
G_n(S)=R_P(A_n(S))-\widehat R_S(A_n(S))
$$

> と定める。$\mathbb E_SG_n(S)$ を**期待汎化ギャップ**と呼ぶ。ただし期待値が有限であるとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-14-generalization-gap -->
**定義の確認**。$\mathcal Z=\{0,1\}$、$P(Z=1)=1/2$、$n=1$、算法 $A_1((z_1))=z_1$、損失 $(w-z)^2$ とする。訓練点では常に損失0である。一方、試験点は確率 $1/2$ で訓練点と異なるため $R_P(A_1(S))=1/2$。従って $G_1(S)=1/2$ は、標本の実現値にかかわらず正になる。
<!-- definition-example-end -->

次の等式こそ、なぜ標本を置換するのかの理由である。独立な「見ていない試験点」を、訓練標本に入れた別の世界と交換する。

<a id="lem-slt1-14-ghost-swap"></a>

<!-- formal-statement-start -->
> **補題（ghost観測の交換等式）**
> $n\ge1$、$S=(Z_1,\ldots,Z_n)\sim P^n$ とし、$Z_i'\sim P$ は $S$ と独立とする。$S^{(i)}$ は $Z_i$ を $Z_i'$ で置換した標本である。可測な決定的算法 $A_n$ と、期待値の存在する可測損失 $\ell$ に対し、各 $i\in\{1,\ldots,n\}$ で

$$
\mathbb E_{S,Z_i'}\ell(A_n(S),Z_i')
=\mathbb E_{S,Z_i'}\ell(A_n(S^{(i)}),Z_i)
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$Z_i$ と $Z_i'$ は独立で同じ分布に従うから、二つの値を交換しても**標本とghost観測の同時分布**は変わらない。右辺では学習器の入力だけが交換後の標本になり、試験点は交換前の $Z_i$ となる。

<!-- proof-start -->
### 証明

他の座標を $W=(Z_1,\ldots,Z_{i-1},Z_{i+1},\ldots,Z_n)$ とまとめる。独立同分布性により、$(W,Z_i,Z_i')$ と $(W,Z_i',Z_i)$ の同時分布は同じである。従って、これらを可測関数

$$
f(w,a,b)=\ell(A_n(w_1,\ldots,w_{i-1},a,w_i,\ldots,w_{n-1}),b)
$$

へ入力した期待値は等しい。左の入力は $\ell(A_n(S),Z_i')$ であり、交換した入力は $\ell(A_n(S^{(i)}),Z_i)$ である。可積分性の仮定でどちらも期待値を定義できるため、等式を得る。$n=1$ では $W$ を空の組と読めば同じ議論が成り立つ。
<!-- proof-end -->

<a id="thm-slt1-14-expected-generalization"></a>

<!-- formal-statement-start -->
> **定理（一様安定性による期待汎化界）**
> $n\ge1$、$S=(Z_1,\ldots,Z_n)\sim P^n$、独立な試験点 $Z\sim P$ とする。可測な決定的算法 $A_n:\mathcal Z^n\to\mathcal H$、可測損失 $0\le\ell(h,z)\le1$ を仮定し、$A_n$ は[一様算法安定性](#def-slt1-14-uniform-stability)の係数 $\beta_n$ を持つとする。このとき

$$
\left|\mathbb E_S\left[
R_P(A_n(S))-\widehat R_S(A_n(S))
\right]\right|\le\beta_n.
$$

> この結論は期待値についてのものであり、各標本 $S$ で $|G_n(S)|\le\beta_n$ を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

未知の母集団リスクを、独立なghost観測で書く。[交換等式](#lem-slt1-14-ghost-swap)で訓練点を置換先へ動かし、同じ**試験点** $Z_i$ での二算法の損失差に直してから安定性を使う。全候補に対する一様集中や合併評価は要らない。

<!-- proof-start -->
### 証明

$Z_i'\sim P$ を $S$ と独立に取り、期待値の線形性と試験点の独立性により

$$
\begin{aligned}
\mathbb E_SR_P(A_n(S))
&=\mathbb E_S\mathbb E_{Z\sim P}\ell(A_n(S),Z)\\
&=\frac1n\sum_{i=1}^n
\mathbb E_{S,Z_i'}\ell(A_n(S),Z_i').
\end{aligned}
$$

第2行は同じ母集団期待値を $n$ 個の独立なghost観測で表しただけである。一方、

$$
\mathbb E_S\widehat R_S(A_n(S))
=\frac1n\sum_{i=1}^n\mathbb E_S\ell(A_n(S),Z_i).
$$

前者の各項へ[ghost観測の交換等式](#lem-slt1-14-ghost-swap)を適用する。両式を差し引くと、求める期待汎化ギャップは

$$
\mathbb E_SG_n(S)
=\frac1n\sum_{i=1}^n
\mathbb E_{S,Z_i'}
\left[
\ell(A_n(S^{(i)}),Z_i)-\ell(A_n(S),Z_i)
\right].
$$

$S$ と $S^{(i)}$ は長さ $n$ の隣接標本であり、試験点として $Z_i\in\mathcal Z$ を選べる。従って[一様算法安定性](#def-slt1-14-uniform-stability)から各角括弧の絶対値は $\beta_n$ 以下である。三角不等式と期待値の単調性より

$$
\begin{aligned}
|\mathbb E_SG_n(S)|
&\le\frac1n\sum_{i=1}^n
\mathbb E_{S,Z_i'}
\left|\ell(A_n(S^{(i)}),Z_i)-\ell(A_n(S),Z_i)\right|\\
&\le\frac1n\sum_{i=1}^n\beta_n=\beta_n.
\end{aligned}
$$

損失の有界性で全ての期待値は有限であり、交換と差し引きが正当化される。
<!-- proof-end -->

**Bernoulli模型での検算**。先の標本平均算法を、$Z_i$ が確率 $p\in[0,1]$ で1を取るBernoulli分布に適用する。$v=p(1-p)$ と置くと、平均の期待値は $p$、分散は $v/n$。独立な試験点 $Z$ について

$$
\begin{aligned}
\mathbb E_{S,Z}(\bar Z-Z)^2
&=\mathbb E_S(\bar Z-p)^2+\mathbb E_Z(Z-p)^2\\
&=\frac vn+v,
\end{aligned}
$$

であり、交差項は $\bar Z$ と $Z$ の独立性により0になる。訓練上では

$$
\begin{aligned}
\widehat R_S(\bar Z)
&=\frac1n\sum_i(Z_i-\bar Z)^2\\
&=\frac1n\sum_i Z_i^2-\bar Z^2,
\end{aligned}
$$

なので、$Z_i^2=Z_i$、$\mathbb E\bar Z^2=p^2+v/n$ を使い

$$
\mathbb E_S\widehat R_S(\bar Z)
=p-p^2-\frac vn=\frac{n-1}{n}v.
$$

したがって

$$
\mathbb E_SG_n(S)=\frac{2v}{n}
=\frac{2p(1-p)}n\le\frac1{2n}\le\frac2n.
$$

具体的な期待値は安定性の一般上界 $2/n$ より小さい。上界が実際の偏りと一致する必要はない。

## 4. leave-one-outは何を推定しているか

一点削除した標本で算法を学習し、**削除した点**で試験する方法を leave-one-out 評価と呼ぶ。ここでは算法を標本長ごとに区別して $A_n,A_{n-1}$ と書く。$n\ge2$ のとき

$$
\operatorname{LOO}_n(S)
=\frac1n\sum_{i=1}^n\ell(A_{n-1}(S_{-i}),Z_i)
$$

と計算する。[一点削除標本](#def-slt1-14-replace-one)は $n-1$ 個しかないので、$A_n$ をそのまま入力するのではない。

<a id="prop-slt1-14-loo-expectation"></a>

<!-- formal-statement-start -->
> **命題（leave-one-outの期待値）**
> $n\ge2$、$S\sim P^n$、可測な決定的算法 $A_{n-1}:\mathcal Z^{n-1}\to\mathcal H$、可測損失 $0\le\ell\le1$ とする。$T\sim P^{n-1}$ とすると

$$
\mathbb E_S\operatorname{LOO}_n(S)
=\mathbb E_T R_P(A_{n-1}(T)).
$$

> 右辺は **$n-1$ 個で訓練した算法の期待リスク**であり、$A_n$ の期待リスクとは一般に異なる。
<!-- formal-statement-end -->

### 証明の見取り図

第 $i$ 点を外した $S_{-i}$ と $Z_i$ は独立である。従って各項は「$n-1$ 個で学習して、新しい試験点で測るリスク」と同じ期待値を持つ。

<!-- proof-start -->
### 証明

各 $i$ で $S_{-i}\sim P^{n-1}$ であり、$Z_i\sim P$ は $S_{-i}$ と独立である。従って[母集団リスクの定義](../../ML/ML1-01/index.md#def-ml1-01-risks)をこの算法へ適用して

$$
\begin{aligned}
\mathbb E_S\ell(A_{n-1}(S_{-i}),Z_i)
&=\mathbb E_{S_{-i}}\mathbb E_{Z_i}
  \ell(A_{n-1}(S_{-i}),Z_i)\\
&=\mathbb E_{S_{-i}}R_P(A_{n-1}(S_{-i}))\\
&=\mathbb E_T R_P(A_{n-1}(T)).
\end{aligned}
$$

を得る。これは $i$ に依存しないので、$n$ 項を足して $n$ で割れば主張となる。損失が $[0,1]$ にあるため期待値の線形操作が許される。
<!-- proof-end -->

では $A_n$ と $A_{n-1}$ のリスクを比較するには何が要るか。同じ長さの標本の置換だけを扱う[一様算法安定性](#def-slt1-14-uniform-stability)とは別に、削除に伴う損失の変化を抑える条件を置く。

<a id="def-slt1-14-deletion-stability"></a>

<!-- formal-statement-start -->
> **定義（削除安定性）**
> $n\ge2$、可測な算法 $A_n:\mathcal Z^n\to\mathcal H$ と $A_{n-1}:\mathcal Z^{n-1}\to\mathcal H$、実数値損失 $\ell$ を与える。$\gamma_n\ge0$ に対し、全ての $S\in\mathcal Z^n$、$i\in\{1,\ldots,n\}$、$z\in\mathcal Z$ について

$$
|\ell(A_n(S),z)-\ell(A_{n-1}(S_{-i}),z)|\le\gamma_n
$$

> が成立するとき、算法列は標本長 $n$ において**削除安定性**の係数 $\gamma_n$ を持つという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-14-deletion-stability -->
**定義の確認**。先の標本平均算法を $n\ge2$ で使う。全標本平均を $m$、$i$ 番目を削除した平均を $m_{-i}$ と置くと

$$
m-m_{-i}
=\frac{z_i-m_{-i}}n,\qquad |m-m_{-i}|\le\frac1n.
$$

ここでも両平均と試験点は $[0,1]$ にあるから、二乗差の因数分解によって

$$
|(m-z)^2-(m_{-i}-z)^2|
\le2|m-m_{-i}|\le\frac2n.
$$

従って全標本・全削除位置・全試験点で $\gamma_n=2/n$ が使える。置換と削除の係数が偶然同じ上界でも、比較している算法は $A_n$ と $A_{n-1}$ であり別の条件を確かめたことに注意する。
<!-- definition-example-end -->

<a id="prop-slt1-14-deletion-gap"></a>

<!-- formal-statement-start -->
> **命題（削除安定性からの期待評価）**
> $n\ge2$、$S\sim P^n$、可測な決定的算法 $A_n,A_{n-1}$、可測損失 $0\le\ell\le1$ を仮定する。算法列が[削除安定性](#def-slt1-14-deletion-stability)の係数 $\gamma_n$ を持つなら、各標本で

$$
|\operatorname{LOO}_n(S)-\widehat R_S(A_n(S))|\le\gamma_n
$$

> が成り立ち、期待値については

$$
\left|\mathbb E_S\operatorname{LOO}_n(S)
-\mathbb E_SR_P(A_n(S))\right|\le\gamma_n,
\qquad
|\mathbb E_SG_n(S)|\le2\gamma_n.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ試験点 $Z_i$ における二つの算法の損失差を各項で抑える。母集団リスク同士の比較も、試験点で積分した後の絶対値が同じ上界を超えないことから得られる。

<!-- proof-start -->
### 証明

[削除安定性](#def-slt1-14-deletion-stability)を $z=Z_i$ に適用し各項を平均すると

$$
\begin{aligned}
|\operatorname{LOO}_n(S)-\widehat R_S(A_n(S))|
&\le\frac1n\sum_{i=1}^n
|\ell(A_{n-1}(S_{-i}),Z_i)-\ell(A_n(S),Z_i)|\\
&\le\gamma_n.
\end{aligned}
$$

同じ条件を $z\sim P$ に関して期待すると、全ての $S,i$ で

$$
|R_P(A_{n-1}(S_{-i}))-R_P(A_n(S))|\le\gamma_n.
$$

これを $S$ について平均し、[leave-one-outの期待値](#prop-slt1-14-loo-expectation)を使えば第2式の最初の不等式が出る。最後は

$$
\begin{aligned}
\mathbb E_SG_n(S)
&=\bigl[\mathbb E_SR_P(A_n(S))-\mathbb E_S\operatorname{LOO}_n(S)\bigr]\\
&\quad+\bigl[\mathbb E_S\operatorname{LOO}_n(S)
  -\mathbb E_S\widehat R_S(A_n(S))\bigr]
\end{aligned}
$$

と足し引きし、それぞれを $\gamma_n$ で抑える三角不等式から従う。
<!-- proof-end -->

**replace-oneだけでは不十分な例**。$\mathcal H=\{h_0,h_1\}$ とし、算法は標本の値ではなく、長さ $m$ の偶奇だけで出力を決める。

$$
A_m(S)=\begin{cases}h_0,&m\text{ が偶数},\\h_1,&m\text{ が奇数},\end{cases}
\qquad
\ell(h_0,z)=0,\quad\ell(h_1,z)=1\quad(z\in\mathcal Z).
$$

同じ長さの標本での置換では出力が変わらず、全ての $\beta_m=0$ である。しかし $n$ が偶数なら、削除後の算法は $h_1$ を返すため

$$
\operatorname{LOO}_n(S)=1,\qquad
\widehat R_S(A_n(S))=0
$$

となる。失われているのは削除安定性であり、$A_m$ と $A_{m-1}$ を比較する理由が replace-one の定義にはない。

## 5. 正則化によって安定性が生まれる仕組み

学習器の安定性は仮定するだけでなく、最適化問題の構造から示せる。とくに[罰則付きERM](../SLT1-13/index.md#def-slt1-13-penalized-erm)の二次罰則が目的関数に曲率の下界を与え、各観測の損失がパラメータを大きく動かせないなら、最適化解自体が近くなる。

ここでは予測器を有限次元のパラメータ $w\in W\subset\mathbb R^d$ と同一視し、$W$ を凸集合、$\|w-v\|$ をユークリッド距離とする。各 $z$ に対する $w\mapsto\ell(w,z)$ を凸とし、損失差が $L\|w-v\|$ 以下となる定数 $L\ge0$ を仮定する。損失の変化がパラメータの距離に比例して抑えられる、という条件である。母集団・経験リスクはこのパラメータ表示で定義する。

[OPT7で導入した強凸性](../../OPT/OPT7/index.md#def-opt7-strong-convexity)は微分可能な関数について勾配で定義されている。しかし、ここでの損失は $|w-z|$ のように微分不可能でもよい。

標本 $S=(z_1,\ldots,z_n)$ に対する目的関数を、経験損失と二次罰則の和

$$
F_S(w)=\frac1n\sum_{j=1}^n\ell(w,z_j)
+\frac\lambda2\|w\|^2,\qquad\lambda>0
$$

とする。そこで勾配を使う定理を直接適用せず、凸結合 $u_t=(1-t)u+tv$ に対する次の**二次補正項を持つ不等式**を証明する。

$$
F_S(u_t)\le(1-t)F_S(u)+tF_S(v)
-\frac{\lambda t(1-t)}2\|u-v\|^2
\qquad(u,v\in W,\ 0<t<1).
$$

これは微分可能性を仮定せずに使える強凸性の凸結合形であり、最小化解の一意性と二次成長評価への橋渡しになる。実際の成立は、各損失の凸性と二次罰則の恒等式を下の証明で足し合わせて確認する。

<a id="thm-slt1-14-regularized-erm-stability"></a>

<!-- formal-statement-start -->
> **定理（強凸正則化ERMの一様安定性）**
> $n\ge1$、$d\ge1$、$W\subset\mathbb R^d$ は非空コンパクト凸集合、$\lambda>0$、$L\ge0$ とする。任意の $z\in\mathcal Z$ で $w\mapsto\ell(w,z)$ が $W$ 上凸かつ

$$
|\ell(w,z)-\ell(v,z)|\le L\|w-v\|
\quad(w,v\in W)
$$

> を満たすとする。各 $S=(z_1,\ldots,z_n)\in\mathcal Z^n$ について、二次罰則付き目的関数

$$
F_S(w)=\frac1n\sum_{j=1}^n\ell(w,z_j)
+\frac\lambda2\|w\|^2
$$

> の最小化解 $A_n(S)=\arg\min_{w\in W}F_S(w)$ を出力する。すると最小化解は一意であり、$A_n$ は係数

$$
\beta_n=\frac{2L^2}{\lambda n}
$$

> の[一様算法安定性](#def-slt1-14-uniform-stability)を持つ。さらに損失が可測で $0\le\ell\le1$、算法が可測なら、独立同分布標本について

$$
|\mathbb E_SG_n(S)|\le\frac{2L^2}{\lambda n}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

標本を一件だけ変えた二つの目的関数を同じ二点 $w,w'$ で評価する。二次罰則の強凸性から、両最適化解が距離 $r$ だけ離れるには、目的値に少なくとも $\lambda r^2$ の代価が要る。他方、異なる観測は一件だけなので、損失のLipschitz条件で代価は高々 $2Lr/n$。この二つを比較する。

<!-- proof-start -->
### 証明

$W$ はコンパクトで各損失はLipschitz連続なので $F_S$ は連続であり、最小値を達成する。二次関数 $(\lambda/2)\|w\|^2$ は、任意の $u,v\in W$ と $t\in(0,1)$ に対して

$$
\begin{aligned}
\frac\lambda2\|(1-t)u+tv\|^2
&=(1-t)\frac\lambda2\|u\|^2
+t\frac\lambda2\|v\|^2\\
&\quad-\frac{\lambda t(1-t)}2\|u-v\|^2.
\end{aligned}
$$

各損失の凸性を足すと、上で示した $F_S$ の凸結合不等式が成立する。$\lambda>0$ だから異なる二点がともに最小点なら、その中点で目的値がさらに小さくなって矛盾する。従って最小化解は一意である。さらに最小化解を $w$ とすると、$F_S(w)\le F_S((1-t)w+tv)$ をこの不等式と合わせて

$$
F_S(v)-F_S(w)\ge\frac{\lambda(1-t)}2\|v-w\|^2
$$

を得る。$t\downarrow0$ とすると、任意の $v\in W$ に対して目的値の増分を距離の二乗で下から抑える次の式が出る。

$$
F_S(v)-F_S(w)\ge\frac\lambda2\|v-w\|^2
$$

この下界を、置換前後の二つの目的関数に別々に使う。

次に隣接する $S,S'$ が第 $i$ 点 $z_i,z_i'$ だけで異なるとし、$w=A_n(S)$、$w'=A_n(S')$、$\Delta=w'-w$ と置く。上で得た二次成長の式で $(S,w,v)=(S,w,w')$ と $(S',w',w)$ をそれぞれ代入し、二式を加えると

$$
\lambda\|\Delta\|^2
\le [F_S(w')-F_S(w)]
+[F_{S'}(w)-F_{S'}(w')].
$$

右辺では共通する $n-1$ 個の観測と二次罰則が全て打ち消され、

$$
\begin{aligned}
&[F_S(w')-F_S(w)]+[F_{S'}(w)-F_{S'}(w')]\\
&=\frac1n\{
\ell(w',z_i)-\ell(w,z_i)
+\ell(w,z_i')-\ell(w',z_i')\}\\
&\le\frac{2L}{n}\|\Delta\|.
\end{aligned}
$$

$\Delta=0$ なら結論は直ちに成り立つ。$\|\Delta\|>0$ なら両辺を $\lambda\|\Delta\|$ で割り

$$
\|A_n(S')-A_n(S)\|\le\frac{2L}{\lambda n}.
$$

任意の試験点 $z$ で再びLipschitz条件を使って

$$
|\ell(A_n(S'),z)-\ell(A_n(S),z)|
\le L\|A_n(S')-A_n(S)\|
\le\frac{2L^2}{\lambda n}.
$$

これは全ての隣接標本と全ての $z$ で成立するので一様安定性である。最後に、有界性と可測性の追加仮定の下で[期待汎化定理](#thm-slt1-14-expected-generalization)へ $\beta_n=2L^2/(\lambda n)$ を代入する。
<!-- proof-end -->

**定理の適用例**。$W=[0,1]$、$\mathcal Z=[0,1]$、$\ell(w,z)=|w-z|$ とすると、絶対値関数の凸性と[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から

$$
|\ell(w,z)-\ell(v,z)|
=\big||w-z|-|v-z|\big|\le|w-v|
$$

なので $L=1$、損失は $[0,1]$ 内である。$\lambda=2$、$n=100$ なら $\beta_n\le1/100$、期待汎化ギャップの絶対値も $1/100$ 以下となる。この結論は真のリスクをゼロにする保証ではなく、訓練上のリスクとの**期待差**の保証である。

## 6. 期待値と高確率、独立同分布の境界

期待汎化定理は $\mathbb E_SG_n(S)$ を評価する。個々の標本の値 $G_n(S)$ は、この期待値の上下で揺れ得る。

<a id="prop-slt1-14-high-prob-counterexample"></a>

<!-- formal-statement-start -->
> **命題（期待保証から標本ごとの保証は従わない）**
> $\mathcal Z=\{0,1\}$、$P(Z=1)=1/2$、$n=1$、固定予測器 $h_0$ だけを返す決定的算法 $A_1$ と損失 $\ell(h_0,z)=z$ を考える。$A_1$ は $\beta_1=0$ の一様算法安定性を持ち、$\mathbb E_SG_1(S)=0$ である。しかし

$$
\Pr\{|G_1(S)|=1/2\}=1.
$$

> 従って一様安定性と期待汎化界だけを根拠に、標本ごとの $|G_n(S)|\le\beta_n$ は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

算法が訓練標本を無視するため、入れ替えに対して完全に安定である。一方、経験リスクは観測した1回のBernoulli値なので、真の期待値から上下に動く。

<!-- proof-start -->
### 証明

$A_1$ はどの入力でも $h_0$ を返すので、隣接標本での損失差は0である。母集団リスクと経験リスクはそれぞれ

$$
R_P(h_0)=\mathbb E Z=\frac12,\qquad
\widehat R_{(Z_1)}(h_0)=Z_1
$$

となる。$Z_1=0$ と $Z_1=1$ はいずれも確率 $1/2$ であり、

$$
G_1(S)=\begin{cases}
\frac12,&Z_1=0,\\
-\frac12,&Z_1=1.
\end{cases}
$$

二つの値の期待値は0だが、絶対値は常に $1/2$ である。
<!-- proof-end -->

この例は「高確率保証が不可能」という反例ではない。[固定予測器のHoeffding型評価](../SLT1-03/index.md#thm-slt1-03-fixed-risk)など、**偏差の集中を別途証明すれば**確率つきの界を作れる。しかし $\beta_n$ だけをそのまま個別標本の誤差限界と読んではならない。

独立同分布性も飾りではない。例えば、$V$ が0と1を確率 $1/2$ ずつ取り、訓練標本を全て同じ値の繰り返し

$$
S=(V,\ldots,V)
$$

とする。各座標の周辺分布はBernoulli$(1/2)$ だが、互いに独立ではない。

標本平均算法では訓練損失は常に0で、独立な試験点に対するリスクは常に $1/2$。従って

$$
G_n(S)=\frac12,\qquad n>4\ \Longrightarrow\ \beta_n=\frac2n<\frac12
$$

となり、期待汎化定理の結論を満たさない。先の[ghost観測の交換等式](#lem-slt1-14-ghost-swap)で、他の訓練座標を固定したまま $Z_i$ だけ独立なghost観測と交換できる、という前提が失われている。

**この章で区別した量**を確認しておこう。

| 評価するもの | 使う操作・条件 | 結論の意味 |
| --- | --- | --- |
| $\mathbb E_SG_n(S)$ | 一点置換と一様安定性、独立同分布 | 訓練後のリスク差の**期待値** |
| $\mathbb E_S\operatorname{LOO}_n(S)$ | 一点削除と独立同分布 | $n-1$ 個で学習したリスクの期待値 |
| $\mathbb E_SR_P(A_n(S))$ とLOOの比較 | 別途、削除安定性 | 異なる標本長の算法の期待値の差 |
| 個々の標本の $G_n(S)$ | 追加の集中評価が必要 | 高確率・標本ごとの偏差は期待値とは別 |

学習算法に独立な乱数 $U$ を渡す場合も考えられる。共通の乱数値 $u$ に固定した $A_n(S;u)$ が全標本・全試験点で係数 $\beta_n(u)$ の一様安定性を持ち、$\mathbb E_U\beta_n(U)<\infty$ なら、上の証明を $U=u$ で条件付けしてから平均することで、乱数と標本についての期待汎化ギャップの絶対値は $\mathbb E_U\beta_n(U)$ 以下になる。異なる乱数を使った二回の実行を無条件に同一視する主張ではない。

## 7. 演習

**問題 SLT1-14-A01（置換と削除を見分ける）**
- Level: A

$S=(2,4,6)$ の第2点を9に置換した標本 $S^{(2)}$ と、第2点を削除した標本 $S_{-2}$ を書け。どちらが $S$ と長さ3の隣接標本になるか、[定義](#def-slt1-14-replace-one)から判定せよ。

<!-- solution-start -->
**詳細解答**。第2座標だけを9に換えると $S^{(2)}=(2,9,6)\in\mathbb R^3$ となる。第2座標を取り除くと $S_{-2}=(2,6)\in\mathbb R^2$ である。[一点置換と一点削除の定義](#def-slt1-14-replace-one)で、隣接する二標本は同じ $\mathcal Z^n$ に属し、高々1座標だけが異なる必要がある。前者は長さ3で相違箇所が第2座標だけだから隣接し、後者は長さ2であるためこの意味では隣接しない。
<!-- solution-end -->

**問題 SLT1-14-A02（標本平均の一点置換）**
- Level: A

$n=4$、$S=(0,0,0,0)$、$T=(1,0,0,0)$、$A_4(S)=\bar z$、$\ell(w,z)=(w-z)^2$、試験点 $z=1$ とする。損失差を計算し、[標本平均算法の一様安定係数](#def-slt1-14-uniform-stability)として $\beta_4=2/4$ が許されることとの整合を確認せよ。

<!-- solution-start -->
**詳細解答**。$S,T$ の標本平均はそれぞれ $0,1/4$。試験点1に対する損失は

$$
\ell(0,1)=1,\qquad
\ell(1/4,1)=(1/4-1)^2=9/16.
$$

従って差は $1-9/16=7/16\le1/2=\beta_4$ である。この二標本での検算は定義の必要条件の一例であり、**全標本で成立すること**は本文の因数分解

$$
|(\bar z-z)^2-(\bar z'-z)^2|
\le|\bar z-\bar z'|\cdot2\le2/n
$$

によって保証されている。
<!-- solution-end -->

**問題 SLT1-14-A03（1標本のBernoulli学習）**
- Level: A

$Z_1\in\{0,1\}$ は $P(Z_1=1)=1/3$ のBernoulli変数、$n=1$、$A_1((Z_1))=Z_1$、$\ell(w,z)=(w-z)^2$ とする。$Z_1=0$ と1の各場合の母集団リスク・経験リスク・汎化ギャップを求め、期待汎化ギャップを算出せよ。

<!-- solution-start -->
**詳細解答**。標本値を完全に記憶するので経験リスクは常に0である。$Z_1=0$ なら試験点が1の確率 $1/3$ で損失1、従って $R_P(0)=1/3$、$G_1=1/3$。$Z_1=1$ なら試験点が0の確率 $2/3$ で損失1、従って $R_P(1)=2/3$、$G_1=2/3$。重み付き平均は

$$
\mathbb E_SG_1(S)
=\frac23\cdot\frac13+\frac13\cdot\frac23
=\frac49.
$$

本文のBernoulli式 $2p(1-p)/n$ に $p=1/3,n=1$ を入れても $4/9$ となる。[期待汎化定理](#thm-slt1-14-expected-generalization)は一般の安定上界であり、ここでは $2/n=2$ よりこの直接計算の方が鋭い。
<!-- solution-end -->

**問題 SLT1-14-A04（期待値0と標本偏差）**
- Level: A

$Z_1\sim\operatorname{Bernoulli}(1/2)$、算法は常に $h_0$ を出力し $\ell(h_0,z)=z$ とする。$n=1$ での $\beta_1$、$\mathbb E_SG_1(S)$、$\Pr(|G_1(S)|>1/4)$ を求めよ。

<!-- solution-start -->
**詳細解答**。算法は入力で変化しないため、[一様安定性](#def-slt1-14-uniform-stability)の左辺は常に0で $\beta_1=0$ とできる。母集団リスクは $1/2$、経験リスクは $Z_1$ なので

$$
G_1(S)=\frac12-Z_1
=\begin{cases}
\frac12,&Z_1=0,\\
-\frac12,&Z_1=1.
\end{cases}
$$

それぞれ確率 $1/2$ であるから $\mathbb E G_1=0$、しかも $|G_1|=1/2>1/4$ は確率1で成立する。期待値が0でも標本ごとの誤差が0とは限らない。
<!-- solution-end -->

**問題 SLT1-14-A05（標本長依存の算法）**
- Level: A

算法 $A_m$ は $m$ が偶数なら常に $h_0$、奇数なら常に $h_1$ を出し、全ての試験点で $\ell(h_0,z)=0$、$\ell(h_1,z)=1$ とする。$m=4$ に対し replace-one の $\beta_4$、$\widehat R_S(A_4(S))$、$\operatorname{LOO}_4(S)$ を求め、二種類の安定性の違いを述べよ。

<!-- solution-start -->
**詳細解答**。長さ4の全標本で出力は $h_0$ なので置換しても損失は変わらず、$\beta_4=0$。訓練損失は0だから $\widehat R_S(A_4(S))=0$。一方、各 $S_{-i}$ は長さ3で、$A_3(S_{-i})=h_1$ から

$$
\operatorname{LOO}_4(S)=\frac14\sum_{i=1}^4 1=1.
$$

従って差は1であり、[削除安定性](#def-slt1-14-deletion-stability)の係数を0とはできない。同じ長さの標本を比較する replace-one は、長さを変える leave-one-out の安定性を含意しない。
<!-- solution-end -->

**問題 SLT1-14-A06（正則化係数と保証）**
- Level: A

ある $W\subset\mathbb R^d$ 上の二次罰則付きERMが[強凸正則化ERMの一様安定性](#thm-slt1-14-regularized-erm-stability)の全仮定を満たすとする。$L=1/2$、$\lambda=2$、$n=8$ のとき一様安定係数の上界と期待汎化ギャップの絶対値の上界を計算せよ。

<!-- solution-start -->
**詳細解答**。$L^2=1/4$、$\lambda n=2\cdot8=16$ である。[強凸正則化ERMの一様安定性](#thm-slt1-14-regularized-erm-stability)により

$$
\beta_8=\frac{2L^2}{\lambda n}
=\frac{2(1/4)}{16}=\frac1{32}.
$$

損失の $[0,1]$ 有界性・独立同分布性・可測性も問題で仮定されているから、[期待汎化定理](#thm-slt1-14-expected-generalization)を適用して $|\mathbb E_SG_8(S)|\le1/32$ となる。各標本で $|G_8(S)|\le1/32$ とまでは言えない。
<!-- solution-end -->

**問題 SLT1-14-B01（ghost観測による期待値恒等式）**
- Level: B

$S=(Z_1,Z_2,Z_3)\sim P^3$、各 $Z_i'\sim P$ は $S$ と独立とし、$A_3$ は決定的・可測、損失は $[0,1]$ とする。第2点の置換に注目して、次を示せ。

1. $\mathbb E_{S,Z_2'}\ell(A_3(S),Z_2')=\mathbb E_{S,Z_2'}\ell(A_3(S^{(2)}),Z_2)$。
2. 同じ操作を第1・第3点にも行い、$\mathbb E_SG_3(S)$ を3個の隣接算法の損失差の平均として表せ。

<!-- solution-start -->
**詳細解答**。第2点では $(Z_1,Z_3)$ を固定したとき $Z_2$ と $Z_2'$ が独立で同分布なので、二変数の同時分布 $P\otimes P$ は交換に対称である。[ghost観測の交換等式](#lem-slt1-14-ghost-swap)の証明に沿って

$$
\begin{aligned}
\mathbb E\ell(A_3(Z_1,Z_2,Z_3),Z_2')
&=\mathbb E\ell(A_3(Z_1,Z_2',Z_3),Z_2)\\
&=\mathbb E\ell(A_3(S^{(2)}),Z_2)
\end{aligned}
$$

となる。第1・第3点にも同じ同時分布の交換を行う。まず独立な試験点を3項で表して

$$
\mathbb E_SR_P(A_3(S))
=\frac13\sum_{i=1}^3\mathbb E_{S,Z_i'}\ell(A_3(S),Z_i'),
$$

これを各交換等式で置き換える。経験リスクの期待値

$$
\mathbb E_S\widehat R_S(A_3(S))
=\frac13\sum_{i=1}^3\mathbb E_S\ell(A_3(S),Z_i)
$$

を引けば

$$
\mathbb E_SG_3(S)
=\frac13\sum_{i=1}^3\mathbb E_{S,Z_i'}
\bigl[\ell(A_3(S^{(i)}),Z_i)-\ell(A_3(S),Z_i)\bigr].
$$

重要なのは、右辺の二損失が**同じ $Z_i$** を試験点とすることである。これによって[一様安定性](#def-slt1-14-uniform-stability)を直接適用できる。
<!-- solution-end -->

**問題 SLT1-14-B02（削除安定性からの二つの界）**
- Level: B

$n\ge2$、$S\sim P^n$、算法 $A_n,A_{n-1}$ と損失 $0\le\ell\le1$ は可測とし、任意の $S,i,z$ で削除損失差が $\gamma_n$ 以下と仮定する。$\operatorname{LOO}_n(S)$ が $n-1$ 個で訓練したリスクの不偏な評価であることを示したうえで、各標本での $|\operatorname{LOO}_n-\widehat R_S(A_n)|$ と、期待汎化ギャップの絶対値をそれぞれ上から抑えよ。

<!-- solution-start -->
**詳細解答**。[leave-one-outの期待値](#prop-slt1-14-loo-expectation)は、各 $i$ で $Z_i$ が $S_{-i}$ と独立という事実から

$$
\mathbb E_S\ell(A_{n-1}(S_{-i}),Z_i)
=\mathbb E_{T\sim P^{n-1}}R_P(A_{n-1}(T))
$$

と導かれ、$n$ 項の平均も同じ期待値になる。次に[削除安定性](#def-slt1-14-deletion-stability)を試験点 $Z_i$ に適用し、

$$
\begin{aligned}
|\operatorname{LOO}_n(S)-\widehat R_S(A_n(S))|
&\le\frac1n\sum_i
|\ell(A_{n-1}(S_{-i}),Z_i)-\ell(A_n(S),Z_i)|\\
&\le\gamma_n.
\end{aligned}
$$

また試験点 $Z\sim P$ について同じ不等式を積分すると

$$
|R_P(A_{n-1}(S_{-i}))-R_P(A_n(S))|\le\gamma_n.
$$

これを $S,i$ で平均し、上で示したLOOの期待値等式を使えば

$$
|\mathbb E_S\operatorname{LOO}_n(S)-\mathbb E_SR_P(A_n(S))|
\le\gamma_n.
$$

最後に $R_P(A_n)-\widehat R_S(A_n)$ の間へ $\operatorname{LOO}_n$ を足し引きする。各差の絶対値を三角不等式で評価すると

$$
|\mathbb E_SG_n(S)|\le\gamma_n+\gamma_n=2\gamma_n.
$$

ここで同時に得たのは**期待値の差**の評価であり、母集団リスクとLOOの標本ごとの差を点ごとに抑えたわけではない。
<!-- solution-end -->

**問題 SLT1-14-B03（強凸性からの安定性を作り直す）**
- Level: B

$n,d\ge1$、$W\subset\mathbb R^d$ は非空コンパクト凸集合、各 $z\in\mathcal Z$ で $\ell(\cdot,z)$ は $W$ 上凸かつ $L$-Lipschitz、$\lambda>0$ とする。二次罰則付き目的関数 $F_S$ の最小化子 $w$ と、一点置換後の $F_{S'}$ の最小化子 $w'$ について、それぞれの最小化子での二次成長評価を出発点として $\|w-w'\|\le2L/(\lambda n)$ を導出せよ。さらに任意の試験点での損失差を評価せよ。

<!-- solution-start -->
**詳細解答**。損失の凸性と二次罰則による強凸性から、各最小化子に対して

$$
F_S(w')-F_S(w)\ge\frac\lambda2\|w'-w\|^2,\qquad
F_{S'}(w)-F_{S'}(w')\ge\frac\lambda2\|w'-w\|^2.
$$

二次成長は[強凸正則化ERMの定理](#thm-slt1-14-regularized-erm-stability)の証明で用いた凸結合不等式と最小性から得る。例えば $0<t<1$ として

$$
\begin{aligned}
F_S(w)&\le F_S((1-t)w+tw')\\
&\le(1-t)F_S(w)+tF_S(w')
-\frac{\lambda t(1-t)}2\|w'-w\|^2
\end{aligned}
$$

を得る。両辺から $F_S(w)$ を引いて $t>0$ で割ると

$$
F_S(w')-F_S(w)\ge\frac{\lambda(1-t)}2\|w'-w\|^2.
$$

$t\downarrow0$ とすると、最初の二次成長評価になる。$F_{S'}$ についても最小点を $w'$ に替えれば同じ評価を得る。二式を足すと左辺の二次項の合計は $\lambda\|w'-w\|^2$ になる。両標本で異なる点を $z_i,z_i'$ とすると、右辺の共通観測と二次罰則が相殺され

$$
\begin{aligned}
\lambda\|w'-w\|^2
&\le\frac1n[
\ell(w',z_i)-\ell(w,z_i)
+\ell(w,z_i')-\ell(w',z_i')]\\
&\le\frac{2L}{n}\|w'-w\|.
\end{aligned}
$$

$w=w'$ なら所望の上界は0として成立する。異なる場合には距離で割り

$$
\|w-w'\|\le\frac{2L}{\lambda n}.
$$

再び $L$-Lipschitz性により任意の試験点 $z$ で

$$
|\ell(w,z)-\ell(w',z)|\le L\|w-w'\|
\le\frac{2L^2}{\lambda n}.
$$

全ての隣接標本で示したから一様安定係数の候補になる。期待汎化へ進むには、これに加えて独立同分布・可測性・損失の可積分性を確認する。
<!-- solution-end -->

**問題 SLT1-14-B04（独立性を捨てたときの交換破綻）**
- Level: B

$n=8$、$V\sim\operatorname{Bernoulli}(1/2)$、$S=(V,\ldots,V)$ を訓練標本とし、試験点 $Z\sim\operatorname{Bernoulli}(1/2)$ は $V$ と独立とする。$A_n$ は標本平均、$\ell(w,z)=(w-z)^2$ とする。

1. 訓練損失と母集団リスク、期待汎化ギャップを求め、$\beta_n=2/n$ との大小を調べよ。
2. $Z_i'\sim\operatorname{Bernoulli}(1/2)$ を $V$ と独立に取り、[ghost観測の交換等式](#lem-slt1-14-ghost-swap)の左辺と右辺を直接計算して、なぜ定理の証明を転用できないか説明せよ。

<!-- solution-start -->
**詳細解答**。標本の全座標が $V$ なので平均は $V$、訓練損失は $n^{-1}\sum_i(V-V)^2=0$。独立な試験点では $P(Z\ne V)=1/2$ であり、平方損失は異なるとき1だから

$$
R_P(A_n(S))=\frac12,\qquad
G_n(S)=\frac12.
$$

従って期待ギャップは $1/2$。一様安定性の性質自体は $\beta_n=2/n=1/4$ で正しいが、期待ギャップはそれより大きい。

次に置換していない算法は $A_n(S)=V$ なので独立なghost点への損失期待値は

$$
\mathbb E_{S,Z_i'}(V-Z_i')^2
=P(V\ne Z_i')=\frac12.
$$

置換後の平均は $A_n(S^{(i)})=((n-1)V+Z_i')/n$。元の $Z_i=V$ を試験点として測れば

$$
\begin{aligned}
\mathbb E_{S,Z_i'}\ell(A_n(S^{(i)}),Z_i)
&=\mathbb E\left(\frac{Z_i'-V}{n}\right)^2\\
&=\frac1{n^2}P(Z_i'\ne V)
=\frac1{2n^2}=\frac1{128}.
\end{aligned}
$$

両期待値は $1/2$ と $1/128$ で一致しない。訓練点 $Z_i=V$ は他の座標を知ると確定してしまい、ghost点と**条件付きで交換可能ではない**。失った仮定は訓練座標間の独立性であり、[交換補題](#lem-slt1-14-ghost-swap)の核心が壊れる。
<!-- solution-end -->

**問題 SLT1-14-C01（標本平均の安定性・期待値・LOOを統合する）**
- Level: C

$n\ge2$、$Z_1,\ldots,Z_n$ は独立同分布で $P(Z_i=1)=p\in[0,1]$、$P(Z_i=0)=1-p$ とする。$A_m$ は標本長 $m$ の平均を出力し、損失は $\ell(w,z)=(w-z)^2$、$w,z\in[0,1]$ とする。$v=p(1-p)$ とおき、次を示せ。

1. 一点置換安定性と一点削除安定性について、どちらも $2/n$ を係数に使えることを確認せよ。
2. $A_n$ の期待母集団リスク、期待経験リスク、期待汎化ギャップをそれぞれ $v,n$ で求めよ。
3. $\mathbb E_S\operatorname{LOO}_n(S)$ を求め、$A_n$ の期待母集団リスクとの差を計算せよ。
4. $p=1/2,n=4$ で数値を求め、LOOが何を不偏に推定し、何を直接には不偏に推定しないかを説明せよ。

<!-- solution-start -->
**詳細解答**。まず一点置換では平均差が $|z_i-z_i'|/n\le1/n$ であり、一点削除では

$$
\bar z_n-\bar z_{-i}
=\frac{z_i-\bar z_{-i}}n,\qquad
|\bar z_n-\bar z_{-i}|\le\frac1n.
$$

両方とも平均値は $[0,1]$ 内にある。平方差の因数分解

$$
|(a-z)^2-(b-z)^2|
=|a-b|\,|a+b-2z|\le2|a-b|
$$

から、全試験点で置換安定性 $\beta_n=2/n$、削除安定性 $\gamma_n=2/n$ の条件をそれぞれ満たす。

次に $\mathbb E\bar Z_n=p$、$\operatorname{Var}(\bar Z_n)=v/n$ である。訓練と独立な $Z$ に対して

$$
\begin{aligned}
\mathbb E_{S,Z}(\bar Z_n-Z)^2
&=\mathbb E(\bar Z_n-p)^2+\mathbb E(Z-p)^2\\
&=\frac vn+v=\left(1+\frac1n\right)v,
\end{aligned}
$$

である。交差項は独立性と二変数の中心化によって消える。一方、$Z_i^2=Z_i$ なので

$$
\begin{aligned}
\mathbb E_S\widehat R_S(A_n(S))
&=\mathbb E\left(\frac1n\sum_i Z_i^2-\bar Z_n^2\right)\\
&=p-\left(p^2+\frac vn\right)
=\left(1-\frac1n\right)v.
\end{aligned}
$$

二式の差を取れば

$$
\mathbb E_SG_n(S)
=\left(1+\frac1n-1+\frac1n\right)v=\frac{2v}{n}.
$$

今度は一点削除後の平均 $\bar Z_{-i}$ を使う。$S_{-i}$ の標本数は $n-1$ で、$Z_i$ と独立であるから

$$
\begin{aligned}
\mathbb E_S(\bar Z_{-i}-Z_i)^2
&=\operatorname{Var}(\bar Z_{-i})
  +\operatorname{Var}(Z_i)\\
&=\frac{v}{n-1}+v.
\end{aligned}
$$

これを $n$ 個平均すると[leave-one-outの期待値の命題](#prop-slt1-14-loo-expectation)とも一致して

$$
\mathbb E_S\operatorname{LOO}_n(S)
=\left(1+\frac1{n-1}\right)v
=\frac{n}{n-1}v.
$$

従って

$$
\begin{aligned}
\mathbb E_S\operatorname{LOO}_n(S)
-\mathbb E_SR_P(A_n(S))
&=\left(\frac{n}{n-1}-\frac{n+1}n\right)v\\
&=\frac{n^2-(n^2-1)}{n(n-1)}v
=\frac{v}{n(n-1)}.
\end{aligned}
$$

最後に $p=1/2$ より $v=1/4$、$n=4$。上の式から

$$
\begin{aligned}
\mathbb E_SR_P(A_4(S))&=\frac54\cdot\frac14=\frac5{16},\\
\mathbb E_S\widehat R_S(A_4(S))&=\frac34\cdot\frac14=\frac3{16},\\
\mathbb E_SG_4(S)&=\frac18,\\
\mathbb E_S\operatorname{LOO}_4(S)&=\frac43\cdot\frac14=\frac13.
\end{aligned}
$$

LOOと $A_4$ の母集団リスクの期待値との差は $1/3-5/16=1/48$。LOOは3個で学習した $A_3$ の母集団リスクについて不偏だが、4個で学習した $A_4$ の母集団リスクについてはこの例で不偏ではない。二種類の安定性による一般上界 $2/n$ は、ここで直接算出した期待値の差より粗いが矛盾しない。
<!-- solution-end -->
