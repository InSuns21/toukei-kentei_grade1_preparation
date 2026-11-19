# PML1-04 エネルギーベース学習は統計力学とどこまで共通か

<!-- definition-example-audit: strict -->

## 1. Gibbs分布を「選ぶ」ことから、パラメータを「学ぶ」ことへ

前講では、[有限候補の自由エネルギーとKL余剰](../PML1-03/index.md#prop-pml1-03-kl-gap)から、**エネルギー関数を固定したとき**のGibbs分布が最適になる理由を学んだ。しかし実際の学習では、そのエネルギー関数自体が未知である。観測した状態をよく説明するように、エネルギーの係数を変えたい。

例えば状態が二つあり、観測した状態を毎回同じ低エネルギーに置くと、その状態の確率は増える。ただし全状態の指数重みの総和も変わる。**観測した状態のエネルギーを下げる操作だけでは、確率の増加を正しく計算できない。** この総和の微分が、エネルギーベース学習の核心となる。

本講の到達目標は次の通りである。

1. 有限状態のエネルギーベースモデルを定義し、観測データに割り当てる確率の積と規格化を検証する。
2. モデルの学習目的を微分して、**観測側の平均（正相）とモデル側の平均（負相）**の差を符号まで導出する。
3. 二つのスピンのBoltzmann型模型で分配関数・勾配・相関を手計算する。
4. 分布の一致とパラメータの一意性、自由エネルギーの最小化と最尤学習、物理平衡と学習アルゴリズムを区別する。

### 前提と本講の記号

[有限状態Gibbs分布の規格化](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)、[自由エネルギーとKL余剰](../PML1-03/index.md#prop-pml1-03-kl-gap)、[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)を利用する。以下の対数は自然対数とし、状態集合は空でない**有限**集合とする。

物理系でいうエネルギーと学習系でいう損失は、同じ実数値の関数として扱えても、単位や生成機構は一致しない。[損失と物理エネルギーの区別](../PML1-01/index.md#def-pml1-01-finite-energy)を保ち、正の尺度 $\tau$ をエネルギー値と同じ単位で固定する。物理的な温度を主張しない場合、$\tau$ は設計上の尺度である。

## 2. 有限エネルギーベースモデルを定義する

状態を $x\in\Omega$、学習するパラメータを $w=(w_1,\ldots,w_d)\in W$ と書く。$\Omega$ は空でない有限集合、$W\subset\mathbb R^d$ は開集合とする。各 $x$ でエネルギー $E_w(x)$ は有限実数であり、各 $w_i$ について微分可能と仮定する。

エネルギーが小さい状態ほど確率を大きくしたいので、[有限候補のGibbs選択則](../PML1-02/index.md#def-pml1-02-finite-loss-gibbs)で損失 $L$ を $E_w$ に置き換える。ただし今度は**確率分布がパラメータ $w$ によって変わる**。

<a id="def-pml1-04-ebm"></a>

<!-- formal-statement-start -->
> **定義（有限エネルギーベースモデル）**  
> 空でない有限状態集合 $\Omega$、開パラメータ集合 $W\subset\mathbb R^d$、$\tau>0$、有限実数値で各パラメータについて微分可能な $E_w:\Omega\to\mathbb R$ を固定する。分配関数とモデル分布を

$$
Z(w)=\sum_{x\in\Omega}\exp\left(-\frac{E_w(x)}{\tau}\right),
\qquad
p_w(x)=\frac{\exp(-E_w(x)/\tau)}{Z(w)}
$$

> と定める。$p_w$ を有限エネルギーベースモデル（EBM）という。$\tau$ は $E_w$ と同じ単位を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-04-ebm -->
**定義の確認**：1スピン。 $\Omega=\{-1,+1\}$、$W=\mathbb R$、$E_w(x)=-wx$、$\tau>0$ とする。$W$ は開いており、エネルギーは各状態で有限・微分可能で、$\partial E_w(x)/\partial w=-x$ である。以下では指数関数の和と差を短く表すため、実数 $u$ に対して双曲線関数を

$
\cosh u=\frac{e^u+e^{-u}}2,\qquad
\sinh u=\frac{e^u-e^{-u}}2,\qquad
\tanh u=\frac{\sinh u}{\cosh u}
$

と定める。$\cosh u>0$ なので $\tanh u$ の分母は零にならない。二状態の重みを足すと

$$
Z(w)=e^{w/\tau}+e^{-w/\tau}=2\cosh(w/\tau)>0.
$$

従って

$$
p_w(+1)=\frac{e^{w/\tau}}{2\cosh(w/\tau)},\qquad
p_w(-1)=\frac{e^{-w/\tau}}{2\cosh(w/\tau)}.
$$

両成分は正で、和は $Z(w)/Z(w)=1$。これが定義の**全条件**を満たす最小例である。$w=0$ では両状態が $1/2$、$w>0$ では $+1$ がより選ばれやすい。
<!-- definition-example-end -->

状態が有限でエネルギーも有限だから、$Z(w)$ は正の有限個の項の和であり、必ず $0<Z(w)<\infty$ になる。無限状態空間ではこの結論は自動ではない。本講の勾配計算で和と微分を交換できるのも、**状態数が有限**だからである。

## 3. 観測データにモデルが割り当てる確率を評価する

観測データ $D=(x^{(1)},\ldots,x^{(n)})$ は $\Omega$ の要素からなる長さ $n\ge1$ の固定列とする。同じ状態が何度現れてもよい。$\mathbf1\{A\}$ は条件 $A$ が成り立てば1、そうでなければ0となる指示関数とする。観測における状態 $x$ の出現比率を

$$
\widehat q(x)=\frac1n\sum_{k=1}^n \mathbf 1\{x^{(k)}=x\}
$$

とする。$\widehat q(x)\ge0$ であり、各観測は一つの状態にだけ数えられるので $\sum_x\widehat q(x)=1$。未観測状態には確率0を置く。

観測がモデルの下で独立に生成される、という**モデル化の仮定**をした場合、データ列に割り当てる同時確率は $\prod_{k=1}^n p_w(x^{(k)})$ となる。本講ではこの正の数の自然対数を $n$ で割った平均を学習目的とする。観測列を固定した後の代数計算には、真の生成分布がモデルに含まれるとの仮定までは必要ない。

<a id="def-pml1-04-loglik"></a>

<!-- formal-statement-start -->
> **定義（有限EBMの平均対数尤度）**  
> [有限エネルギーベースモデル](#def-pml1-04-ebm)の $p_w$ と、$n\ge1$ 個の観測から作った $\widehat q$ に対し、

$$
\ell_D(w)
=\frac1n\sum_{k=1}^n\log p_w(x^{(k)})
=\sum_{x\in\Omega}\widehat q(x)\log p_w(x)
$$

> を平均対数尤度という。最尤学習とは $w\in W$ で $\ell_D(w)$ を最大化する問題であり、最大化解が常に存在するという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-04-loglik -->
**定義の確認**：1スピンの観測。 前節のモデルで $D=(+1,+1,-1)$ とする。$n=3$、$\widehat q(+1)=2/3$、$\widehat q(-1)=1/3$ だから、出現比率は非負で和が1。各 $p_w(x)$ は正なので対数は有限であり、

$$
\begin{aligned}
\ell_D(w)
&=\frac23\left(\frac w\tau-\log Z(w)\right)
 +\frac13\left(-\frac w\tau-\log Z(w)\right)\\
&=\frac{w}{3\tau}-\log\left(2\cosh\frac w\tau\right).
\end{aligned}
$$

ここで観測側の平均状態は $2/3-1/3=1/3$ である。単に $+1$ のエネルギーを下げればよいのでなく、$\log Z(w)$ も減算されることが見える。
<!-- definition-example-end -->

### 自由エネルギーと同じ式でも、動かす対象が違う

$E_w$ を固定し、**分布 $q$ を変える**[前講の自由エネルギー最小化](../PML1-03/index.md#prop-pml1-03-kl-gap)と、**観測分布 $\widehat q$ を固定し $w$ を変える**本講の最尤学習は異なる最適化問題である。後者の負の平均対数尤度は

$$
-\ell_D(w)
=\frac1\tau\sum_x\widehat q(x)E_w(x)+\log Z(w).
$$

$Z$ は状態すべてを足した規格化定数であり、観測されなかった状態も影響する。

## 4. なぜ正相と負相が現れるか

一般のパラメータ $w_i$ を一つ動かそう。有限分布 $r$ による期待値は $\mathbb E_r[g(X)]=\sum_{x\in\Omega}r(x)g(x)$ と表す。また勾配 $\nabla_w\ell_D=(\partial\ell_D/\partial w_1,\ldots,\partial\ell_D/\partial w_d)$ は各パラメータによる偏微分を順に並べたベクトルである。定義式の指数を微分すると、微分する変数は $w_i$、$x$ と $\tau$ は固定なので

$$
\frac{\partial}{\partial w_i}
e^{-E_w(x)/\tau}
=-\frac1\tau\frac{\partial E_w(x)}{\partial w_i}
e^{-E_w(x)/\tau}.
$$

有限和を各項微分し、$Z(w)>0$ で割ると

$$
\begin{aligned}
\frac{\partial\log Z(w)}{\partial w_i}
&=\frac1{Z(w)}\frac{\partial Z(w)}{\partial w_i}\\
&=-\frac1\tau\sum_{x\in\Omega}
\frac{e^{-E_w(x)/\tau}}{Z(w)}
\frac{\partial E_w(x)}{\partial w_i}\\
&=-\frac1\tau\,\mathbb E_{p_w}
\left[\frac{\partial E_w(X)}{\partial w_i}\right].
\end{aligned}
$$

この有限和こそ、モデルが全状態へ割り当てる確率を考慮する項である。

<a id="prop-pml1-04-score"></a>

<!-- formal-statement-start -->
> **命題（有限EBMの対数尤度勾配）**  
> [有限EBM](#def-pml1-04-ebm)と[平均対数尤度](#def-pml1-04-loglik)の仮定の下で、任意の $i=1,\ldots,d$ と $w\in W$ について、

$$
\frac{\partial\ell_D(w)}{\partial w_i}
=-\frac1\tau\,\mathbb E_{\widehat q}
 \left[\frac{\partial E_w(X)}{\partial w_i}\right]
+\frac1\tau\,\mathbb E_{p_w}
 \left[\frac{\partial E_w(X)}{\partial w_i}\right].
$$

> 特に $w$ と独立な特徴量 $f:\Omega\to\mathbb R^d$ と基準エネルギー $b:\Omega\to\mathbb R$ を使い

$$
E_w(x)=b(x)-\sum_{i=1}^d w_i f_i(x)
$$

> と書ける場合には、

$$
\nabla_w\ell_D(w)
=\frac1\tau\left(
\mathbb E_{\widehat q}[f(X)]-\mathbb E_{p_w}[f(X)]
\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

観測状態の $\log p_w(x)$ には直接のエネルギー項と $\log Z(w)$ がある。前者を観測比率で平均し、後者には直前の有限和の微分を代入する。線形エネルギーなら $\partial E_w/\partial w_i=-f_i$ となる。

<!-- proof-start -->
### 証明

確率は全状態で正だから

$$
\log p_w(x)=-\frac{E_w(x)}\tau-\log Z(w).
$$

定義に代入し、$\sum_x\widehat q(x)=1$ を使うと

$$
\ell_D(w)
=-\frac1\tau\sum_x\widehat q(x)E_w(x)-\log Z(w).
$$

$\widehat q$ は観測から計算して固定した分布であり、$w$ で微分しない。$\Omega$ は有限、$E_w(x)$ は微分可能なので

$$
\frac{\partial\ell_D}{\partial w_i}
=-\frac1\tau\sum_x\widehat q(x)\frac{\partial E_w(x)}{\partial w_i}
-\frac{\partial\log Z(w)}{\partial w_i}.
$$

先に導出した $\partial_i\log Z=-(1/\tau)\mathbb E_{p_w}[\partial_iE_w]$ を右辺に代入する。マイナスが二回現れることに注意すると第一式を得る。

さらに線形エネルギーでは、$b,f_i$ は $w$ に依存しないので $\partial_i E_w(x)=-f_i(x)$。この値を観測平均とモデル平均のそれぞれに代入して

$$
\frac{\partial\ell_D}{\partial w_i}
=\frac1\tau\sum_x\widehat q(x)f_i(x)
-\frac1\tau\sum_xp_w(x)f_i(x)
$$

を得る。全成分を並べれば第二式となる。
<!-- proof-end -->

ここで言葉を固定しよう。**正相（positive phase）**は観測分布 $\widehat q$ による特徴量の平均、**負相（negative phase）**はモデル分布 $p_w$ による特徴量の平均を指す。負相は「負のデータ」や「エネルギーを負にする操作」ではない。以下の内積記法 $w\cdot f(x)$ は直前の和 $\sum_{i=1}^d w_if_i(x)$ のことである。

<a id="def-pml1-04-phases"></a>

<!-- formal-statement-start -->
> **定義（線形EBMの正相・負相）**  
> 非空有限 $\Omega$、$\tau>0$、観測分布 $\widehat q$、特徴量 $f:\Omega\to\mathbb R^d$ を固定する。$b,f$ がパラメータ $w$ に依存しない線形エネルギー

$$
E_w(x)=b(x)-w\cdot f(x)
$$

> に対し、正相平均と負相平均をそれぞれ

$$
m^+=\mathbb E_{\widehat q}[f(X)],\qquad
m^-(w)=\mathbb E_{p_w}[f(X)]
$$

> と呼ぶ。[有限EBMの対数尤度勾配](#prop-pml1-04-score)は

$$
\nabla_w\ell_D(w)=\frac{m^+-m^-(w)}{\tau}
$$

> と表される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-04-phases -->
**定義の確認**：1スピン。 $f(x)=x$、$\Omega=\{-1,+1\}$、$\widehat q(+1)=2/3$、$\widehat q(-1)=1/3$、$w=0$ とする。特徴量は $w$ に依存せず、モデルは一様分布なので、

$$
m^+=\frac23(+1)+\frac13(-1)=\frac13,\qquad
m^-(0)=\frac12(+1)+\frac12(-1)=0.
$$

ここではパラメータが $w$ 一つなので、プライム $\ell_D'(w)$ は $d\ell_D(w)/dw$ を表し、多変数で使った $\partial\ell_D/\partial w_i$ の1変数版である。定義の二つの分布による平均を別々に求めたので、

$
\ell_D'(0)=\frac{1/3-0}{\tau}=\frac1{3\tau}.
$

これは前節の直接式を $w$ で微分しても一致する。
<!-- definition-example-end -->

**勾配上昇の意味。** 観測側に多い特徴がモデル側では少なければ、その特徴の係数を増やす方向へ進む。反対に、モデルが観測より過剰にその特徴を作るなら、係数を下げる。モデル平均を求めるために状態を列挙できない大規模模型では、負相の近似が計算上の難所となる。ただし近似標本の誤差を無視して、厳密勾配と呼んではならない。

## 5. 二スピンBoltzmann型模型をすべて数える

各スピン $x_1,x_2$ は $+1$ または $-1$ をとる。**スピン**とはここでは二値の状態変数であって、実際の磁性体の存在を仮定しない。$h,J\in\mathbb R$ を二つのパラメータとし、

$$
\Omega=\{(+,+),(+,-),(-,+),(-,-)\},
\qquad E_{h,J}(x_1,x_2)=-h(x_1+x_2)-Jx_1x_2.
$$

$h$ は各スピンの向き、$J$ は二つが同じ符号かどうかを重み付けする。特に $J>0$ なら同符号を好む。特徴量は $f_1=x_1+x_2$、$f_2=x_1x_2$ であり、先の線形EBMの定義へそのまま当てはまる。

| 状態 | $f_1=x_1+x_2$ | $f_2=x_1x_2$ | $-E_{h,J}$ |
|---|---:|---:|---:|
| $(+,+)$ | $2$ | $1$ | $2h+J$ |
| $(+,-)$ | $0$ | $-1$ | $-J$ |
| $(-,+)$ | $0$ | $-1$ | $-J$ |
| $(-,-)$ | $-2$ | $1$ | $-2h+J$ |

この四行の指数重みを足せば

$$
\begin{aligned}
Z(h,J)
&=e^{(2h+J)/\tau}+2e^{-J/\tau}
  +e^{(-2h+J)/\tau}\\
&=2e^{J/\tau}\cosh(2h/\tau)+2e^{-J/\tau}.
\end{aligned}
$$

模型が予測する平均は、各状態の特徴量に確率を掛けて足すことで求まる。

<a id="prop-pml1-04-two-spin"></a>

<!-- formal-statement-start -->
> **命題（二スピン模型の分配関数とモデル平均）**  
> 上の四状態と $E_{h,J}=-h(x_1+x_2)-Jx_1x_2$、$\tau>0$ に対し、

$$
\mathbb E_{p_{h,J}}[x_1+x_2]
=\frac{4e^{J/\tau}\sinh(2h/\tau)}{Z(h,J)},
$$

$$
\mathbb E_{p_{h,J}}[x_1x_2]
=\frac{2e^{J/\tau}\cosh(2h/\tau)-2e^{-J/\tau}}{Z(h,J)}.
$$

> 特に $h=0$ では第一の平均は0、第二の平均は $\tanh(J/\tau)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

表で $f_1$ が0でないのは $(+,+),(-,-)$ だけである。$f_2$ は同符号の二状態では $+1$、異符号の二状態では $-1$ である。これらを分配関数で割った有限和を整理する。

<!-- proof-start -->
### 証明

定義より $Z(h,J)$ は先に求めた正の四項和である。$f_1$ の分子は

$$
2e^{(2h+J)/\tau}-2e^{(-2h+J)/\tau}
=2e^{J/\tau}\left(e^{2h/\tau}-e^{-2h/\tau}\right)
=4e^{J/\tau}\sinh(2h/\tau).
$$

$f_2$ の分子は

$$
e^{(2h+J)/\tau}+e^{(-2h+J)/\tau}
-e^{-J/\tau}-e^{-J/\tau}
=2e^{J/\tau}\cosh(2h/\tau)-2e^{-J/\tau}.
$$

各分子を $Z(h,J)$ で割って所望の式を得る。$h=0$ なら $\sinh0=0$、$\cosh0=1$ だから

$$
\frac{2e^{J/\tau}-2e^{-J/\tau}}
{2e^{J/\tau}+2e^{-J/\tau}}
=\frac{e^{J/\tau}-e^{-J/\tau}}
{e^{J/\tau}+e^{-J/\tau}}
=\tanh(J/\tau).
$$
<!-- proof-end -->

**数値をすべて確認する。** $h=0$、$J=(\tau/2)\log3$ とすると、同符号状態の重みは $\sqrt3$、異符号状態は $1/\sqrt3$ なので

$$
Z=2\sqrt3+\frac2{\sqrt3}=\frac8{\sqrt3},
$$

$$
p(+,+)=p(-,-)=\frac38,\qquad
p(+,-)=p(-,+)=\frac18.
$$

四確率の和は $2(3/8)+2(1/8)=1$。モデル平均は

$$
m^-_1=2\cdot\frac38-2\cdot\frac38=0,
\quad
m^-_2=2\cdot\frac38-2\cdot\frac18=\frac12.
$$

観測列を $(+,+),(+,+),(-,-),(-,-)$ とすれば、$\widehat q(+,+)=\widehat q(-,-)=1/2$ で

$$
m^+_1=0,\qquad m^+_2=1.
$$

まず[線形EBMの正相・負相](#def-pml1-04-phases)を計算した。これらの平均を[有限EBMの対数尤度勾配](#prop-pml1-04-score)へ代入すると

$$
\frac{\partial\ell_D}{\partial h}=0,\qquad
\frac{\partial\ell_D}{\partial J}=\frac{1-1/2}{\tau}=\frac1{2\tau}.
$$

観測では同符号が100%なのにモデルでは75%しかないため、$J$ を増やす方向が選ばれる。$h$ を動かす理由はこのデータにはない。

## 6. 何を一致させれば最尤なのか

[相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)とエントロピーを使うと、負の平均対数尤度の意味を整理できる。INFO2 の相対エントロピー $D_2$ は底2だが、ここで使う $D_{\mathrm e}$ は[前講で換算した自然対数版KL](../PML1-03/index.md#prop-pml1-03-kl-gap)であり、$D_{\mathrm e}(q\|p)=(\log2)D_2(q\|p)$ である。自然対数の分布エントロピーを $H_{\mathrm e}(\widehat q)=-\sum_{x:\widehat q(x)>0}\widehat q(x)\log\widehat q(x)$ とする。未観測状態の $\widehat q(x)=0$ は和から除外する。

<a id="prop-pml1-04-kl-fit"></a>

<!-- formal-statement-start -->
> **命題（最尤学習とデータからモデルへのKL）**  
> 空でない有限 $\Omega$ 上の観測分布 $\widehat q$ と、全状態で正の有限EBM $p_w$ に対し、

$$
-\ell_D(w)
=H_{\mathrm e}(\widehat q)
+D_{\mathrm e}(\widehat q\|p_w).
$$

> 従って $\ell_D$ の最大化は $D_{\mathrm e}(\widehat q\|p_w)$ の最小化と同値である。さらにモデル族が $\widehat q$ を含む場合には最大値は $-H_{\mathrm e}(\widehat q)$ で、確率分布 $p_w=\widehat q$ のとき、かつそのときに限り達成される。ただし、その $w$ の一意性は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

KLを $q\log q-q\log p$ に分ける。[Gibbs不等式と等号条件](../../INFO/INFO2/index.md#thm-info2-gibbs)を使うにはモデルが全状態で正であることを確認すればよい。

<!-- proof-start -->
### 証明

$\widehat q(x)>0$ の状態について $p_w(x)>0$ だから対数比は定義され、

$$
\begin{aligned}
D_{\mathrm e}(\widehat q\|p_w)
&=\sum_{\widehat q(x)>0}\widehat q(x)
  \log\frac{\widehat q(x)}{p_w(x)}\\
&=\sum_{\widehat q(x)>0}\widehat q(x)\log\widehat q(x)
  -\sum_{\widehat q(x)>0}\widehat q(x)\log p_w(x)\\
&=-H_{\mathrm e}(\widehat q)-\ell_D(w).
\end{aligned}
$$

第二の和には零確率状態を加えても値が変わらないため、[平均対数尤度の定義](#def-pml1-04-loglik)と一致する。よって恒等式を得る。$H_{\mathrm e}(\widehat q)$ は固定データだけで決まり $w$ に依存しないので、二つの最適化は同値である。

[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)を、第一引数 $\widehat q$、第二引数 $p_w$ に適用する。$p_w$ の台は $\Omega$ 全体だから仮定が成立し、KLは非負、0になるのは $p_w=\widehat q$ に限る。モデル族がその分布を表現できるならKLの最小値0が達成される。複数の $w$ が同じ $p_w$ を作り得るためパラメータの一意性は従わない。
<!-- proof-end -->

**混同しやすい向き：** ここでは $D_{\mathrm e}(\widehat q\|p_w)$ であって $D_{\mathrm e}(p_w\|\widehat q)$ ではない。未観測状態に $\widehat q(x)=0$ があっても、前者は $p_w(x)>0$ の下で有限になる。後者は一般に無限大である。[前講のKL余剰](../PML1-03/index.md#prop-pml1-03-kl-gap)は**動かす分布が別**なので、KLの向きも機械的に同一視してはならない。

### 最尤解が存在しない例

1スピンで観測がすべて $+1$ の場合、$\widehat q(+1)=1$、$\widehat q(-1)=0$。$E_w(x)=-wx$ なら

$$
\ell_D(w)=\frac w\tau-\log\bigl(e^{w/\tau}+e^{-w/\tau}\bigr)
=-\log\left(1+e^{-2w/\tau}\right).
$$

有限 $w$ では $0<p_w(+1)<1$ なので $\ell_D(w)<0$。一方 $w\to+\infty$ なら $\ell_D(w)\to0$。したがって **上限は0だが、それを達成する有限 $w$ はない**。失われた仮定は「モデル族が観測分布 $\widehat q=(1,0)$ を表現できる」という条件である。すべての有限パラメータでは分布の各成分が正で、境界上の観測分布には到達できない。有限状態であることは最尤解の存在を保証しない。

## 7. 同じ分布を作るエネルギーは一つか

エネルギーの値そのものは観測確率から一意には決まらない。各状態で共通の値を加えても、指数重みの分子・分母に同じ係数が掛かって消える。以下の $E'_w,Z'(w),p'_w,\ell'_D$ のプライムは**変更後の模型**を表し、$w$ による微分を表さない。第4節の偏微分や1変数の $\ell_D'(w)$ とは使い分ける。

<a id="prop-pml1-04-gauge"></a>

<!-- formal-statement-start -->
> **命題（状態に依存しないエネルギー移動）**  
> 有限EBMのエネルギー $E_w$ と尺度 $\tau>0$ を固定する。状態に依存しない有限実数値関数 $c:W\to\mathbb R$ を選び、

$$
E'_w(x)=E_w(x)+c(w)
$$

> とすると、すべての状態とパラメータで

$$
p'_w(x)=p_w(x),\qquad
\ell'_D(w)=\ell_D(w)
$$

> が成立する。$c$ が微分可能なら、両模型の平均対数尤度の勾配も一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$e^{-c(w)/\tau}$ をすべての項からくくり出す。勾配については同一の関数の微分でもよいが、正相と負相に現れる $\partial_i c$ が相殺することも確かめる。

<!-- proof-start -->
### 証明

$c(w)$ は状態 $x$ に依存しないので

$$
\begin{aligned}
Z'(w)
&=\sum_xe^{-(E_w(x)+c(w))/\tau}\\
&=e^{-c(w)/\tau}\sum_xe^{-E_w(x)/\tau}
=e^{-c(w)/\tau}Z(w).
\end{aligned}
$$

これを分布の分子と分母へ代入すると

$$
p'_w(x)=\frac{e^{-c(w)/\tau}e^{-E_w(x)/\tau}}
{e^{-c(w)/\tau}Z(w)}=p_w(x).
$$

各 $\log p'_w(x)=\log p_w(x)$ より平均対数尤度も等しい。$c$ が微分可能なら、[勾配公式](#prop-pml1-04-score)の第一項へ $-\partial_i c/\tau$、第二項へ $+\partial_i c/\tau$ が追加される。どちらの分布でも定数 $\partial_i c$ の平均は同じなので追加分は0となる。
<!-- proof-end -->

例えば $E_{h,J}$ に第三のパラメータ $a$ を加えて $E_{h,J,a}=E_{h,J}+a$ としても、$a$ はどんな観測データからも推定できない。**確率分布が一意に定まること**と**エネルギーの各係数が一意に定まること**は別の問いである。物理学で基準エネルギーの原点をずらすのと似た計算だが、この自由さだけでは物理的な保存則は導かれない。

## 8. 負相の変化と勾配の曲率

有限模型のモデル平均は $w$ に依存する。線形エネルギー $E_w(x)=b(x)-w\cdot f(x)$ の場合、$p_w$ を一度微分すれば、その変化が特徴量の**共分散**であると分かる。

二つの有限実数値特徴量 $f_i,f_j$ の共分散は

$$
\operatorname{Cov}_{p_w}(f_i,f_j)
=\mathbb E_{p_w}[f_if_j]
-\mathbb E_{p_w}[f_i]\mathbb E_{p_w}[f_j]
$$

である。これは[前講までに用いた分散の計算](../PML1-02/index.md#prop-pml1-02-two-state-response)を二つの特徴量へ拡張した定義であり、各和は有限である。成分 $\operatorname{Cov}_{p_w}(f_i,f_j)$ を行 $i$・列 $j$ に配置したものが特徴量ベクトル $f$ の共分散行列である。

<a id="prop-pml1-04-curvature"></a>

<!-- formal-statement-start -->
> **命題（線形EBMの対数尤度は凹関数）**  
> 非空有限 $\Omega$、開集合 $W\subset\mathbb R^d$、$\tau>0$、$w$ に依存しない有限特徴量 $f:\Omega\to\mathbb R^d$ と $b:\Omega\to\mathbb R$ に対し $E_w(x)=b(x)-w\cdot f(x)$ とする。$W$ が凸集合であれば、$\ell_D$ は $W$ 上の凹関数であり、そのHessian（2階偏導関数を並べた行列）は

$$
\frac{\partial^2\ell_D}{\partial w_i\partial w_j}
=-\frac1{\tau^2}\operatorname{Cov}_{p_w}(f_i,f_j).
$$

> この事実だけでは、最大化解の存在やパラメータの一意性は保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $p_w(x)$ の微分を計算し、それをモデル平均 $\sum_xp_w(x)f_i(x)$ に代入する。共分散行列の二次形式は分散だから非負であり、Hessianは半負定値になる。

<!-- proof-start -->
### 証明

以下、$\partial_{w_j}$ は $\partial/\partial w_j$ の省略記法とし、他の成分 $w_i$ と状態 $x$ を固定して微分する。線形エネルギーに[分配関数の微分式](#prop-pml1-04-score)の計算を適用すると

$$
\partial_{w_j}\log Z(w)=\frac1\tau\mathbb E_{p_w}[f_j].
$$

ここで $\log p_w(x)=(-b(x)+w\cdot f(x))/\tau-\log Z(w)$ を微分するので

$$
\partial_{w_j}p_w(x)
=p_w(x)\,\partial_{w_j}\log p_w(x)
=\frac{p_w(x)}\tau\left(f_j(x)-\mathbb E_{p_w}[f_j]\right).
$$

$f_i$ は $w$ に依存しないから、有限和を微分して

$$
\begin{aligned}
\partial_{w_j}\mathbb E_{p_w}[f_i]
&=\sum_x f_i(x)\partial_{w_j}p_w(x)\\
&=\frac1\tau\sum_xp_w(x)f_i(x)f_j(x)
-\frac1\tau\mathbb E_{p_w}[f_i]\mathbb E_{p_w}[f_j]\\
&=\frac1\tau\operatorname{Cov}_{p_w}(f_i,f_j).
\end{aligned}
$$

[正相・負相の勾配](#prop-pml1-04-score)を微分すると、正相は固定データゆえ微分が0なので、Hessianの成分は表示した式になる。

任意の $v\in\mathbb R^d$ について $Y=v\cdot f(X)$ とおけば

$$
\begin{aligned}
v^{\mathsf T}\bigl[\operatorname{Cov}_{p_w}(f_i,f_j)\bigr]v
&=\mathbb E_{p_w}[(Y-\mathbb E_{p_w}[Y])^2]\ge0.
\end{aligned}
$$

従って $v^{\mathsf T}(\nabla^2\ell_D)v\le0$。凸集合 $W$ 内の任意の線分 $w(t)=u+t(v-u)$ に沿う2階微分は

$$
\frac{d^2}{dt^2}\ell_D(w(t))
=(v-u)^{\mathsf T}\nabla^2\ell_D(w(t))(v-u)\le0.
$$

ゆえに線分上の関数は凹で、$W$ 上でも凹である。半負定値は厳密な負定値を含意せず、開集合上の最大値の達成も意味しない。
<!-- proof-end -->

**確認：二スピンの一地点。** 第5節の $h=0$、$J=(\tau/2)\log3$ では $m^-=(0,1/2)$。確率表より

$$
\mathbb E[f_1^2]=4\left(\frac38+\frac38\right)=3,
\quad
\mathbb E[f_2^2]=1,
\quad
\mathbb E[f_1f_2]=0.
$$

$x_1,x_2\in\{-1,+1\}$ より $x_1^2=x_2^2=1$ であり、$f_1f_2=(x_1+x_2)x_1x_2=x_1^2x_2+x_1x_2^2=x_2+x_1=f_1$ を用いた。行・列は特徴量 $(f_1,f_2)$、すなわちパラメータ $(h,J)$ の順である。従って共分散行列とHessianは

$$
\operatorname{Cov}_{p}(f)=
\begin{pmatrix}3&0\\0&3/4\end{pmatrix},
\qquad
\nabla^2\ell_D=
-\frac1{\tau^2}\begin{pmatrix}3&0\\0&3/4\end{pmatrix}.
$$

この地点では両方向の曲率が負であるが、これだけで全パラメータ空間での最大化解の存在は決まらない。

## 9. 統計力学と共通な部分・共通でない部分

**共通なのは**、有限状態の指数重み、分配関数、Gibbs型の確率、分配関数の微分によるモデル平均・共分散である。[SM3の正準アンサンブル](../../../物理系/SM/SM3/index.md#def-sm3-canonical)でも同じ代数が使われる。

**まだ言えないのは**、$\tau$ が実在の熱浴温度であること、データが熱平衡状態から得られたこと、学習の更新則が平衡への物理的緩和であること、有限個のデータで一般化誤差が小さいこと、近似サンプリングで厳密勾配が得られることである。実際、最尤解が有限パラメータに存在しない例や、状態共通のエネルギー移動による非識別性を見た。

本講は**有限状態を全列挙できる**ため負相が厳密に計算できた。次のPML1-05では、制約を満たせる記憶容量の問題へ進む。有限系の計算から高次元・熱力学極限へ移る際には、別途どの極限と仮定を使うかを確認しなければならない。

## 演習

### PML1-04-A01 1スピンの規格化
- Level: A
- 目安時間: 10分

$\Omega=\{-1,+1\}$、$E_w(x)=-wx$、$\tau>0$ とする。$Z(w)$、$p_w(+1)$、$p_w(-1)$ を求め、和が1であることを示せ。$w=0$ の値も求めよ。

<!-- solution-start -->
#### 詳細解答

重みは $e^{w/\tau}$ と $e^{-w/\tau}$ なので

$$
Z(w)=e^{w/\tau}+e^{-w/\tau}>0,\quad
p_w(+1)=\frac{e^{w/\tau}}{Z(w)},\quad
p_w(-1)=\frac{e^{-w/\tau}}{Z(w)}.
$$

確率はどちらも正で、和は $(e^{w/\tau}+e^{-w/\tau})/Z(w)=1$。$w=0$ なら分子が両方1、分母が2なので各確率は $1/2$ となる。[有限EBMの定義](#def-pml1-04-ebm)の正規化を直接確認した。
<!-- solution-end -->

### PML1-04-A02 観測度数から平均対数尤度へ
- Level: A
- 目安時間: 12分

1スピン模型に観測列 $D=(+1,-1,+1,+1)$ が与えられた。$\widehat q$ と $\ell_D(w)$ を求めよ。$w=0$ における平均対数尤度を求めよ。

<!-- solution-start -->
#### 詳細解答

$n=4$ で $+1$ が3個、$-1$ が1個なので $\widehat q(+1)=3/4$、$\widehat q(-1)=1/4$。$\sum\widehat q=1$ を確認する。定義から

$$
\begin{aligned}
\ell_D(w)
&=\frac34\left(\frac w\tau-\log Z(w)\right)
+\frac14\left(-\frac w\tau-\log Z(w)\right)\\
&=\frac{w}{2\tau}-\log\left(e^{w/\tau}+e^{-w/\tau}\right).
\end{aligned}
$$

$w=0$ では $\ell_D(0)=-\log2$。観測比率が一様でなくても、$w=0$ でのモデル確率は両状態 $1/2$ なので各観測の対数確率は $-\log2$ である。
<!-- solution-end -->

### PML1-04-A03 正相・負相の符号
- Level: A
- 目安時間: 12分

1スピン模型で $\widehat q(+1)=3/4$、$\widehat q(-1)=1/4$、$w=0$ とする。$f(x)=x$ の正相・負相と $\ell_D'(0)$ を求め、$w$ を増減させるべき方向を答えよ。

<!-- solution-start -->
#### 詳細解答

観測側の平均は

$$
m^+=\frac34(+1)+\frac14(-1)=\frac12.
$$

$w=0$ なら $p_0(+1)=p_0(-1)=1/2$ なので

$$
m^-(0)=\frac12(+1)+\frac12(-1)=0.
$$

[線形EBMの正相・負相](#def-pml1-04-phases)より

$$
\ell_D'(0)=\frac{m^+-m^-(0)}\tau=\frac1{2\tau}>0.
$$

従って十分小さい正の変化 $\delta w>0$ は平均対数尤度を増やす。負相はモデル平均を**引く**項であり、加える項と取り違えない。
<!-- solution-end -->

### PML1-04-A04 エネルギーの共通移動
- Level: A
- 目安時間: 12分

1スピンの $E_w(x)=-wx$ を $E'_w(x)=-wx+3w^2$ に置き換える。$Z'(w)$ と $p'_w(x)$ を元の $Z(w)$、$p_w(x)$ で表せ。また両者の平均対数尤度を比較せよ。

<!-- solution-start -->
#### 詳細解答

追加した $c(w)=3w^2$ は状態 $x$ に依存しない。従って

$$
\begin{aligned}
Z'(w)
&=\sum_{x=\pm1}e^{-(-wx+3w^2)/\tau}
=e^{-3w^2/\tau}\sum_{x=\pm1}e^{wx/\tau}\\
&=e^{-3w^2/\tau}Z(w).
\end{aligned}
$$

分子と分母の $e^{-3w^2/\tau}$ が相殺するので $p'_w(x)=p_w(x)$。各観測の対数確率も同じだから $\ell'_D(w)=\ell_D(w)$。これは[状態共通エネルギー移動の命題](#prop-pml1-04-gauge)の適用である。
<!-- solution-end -->

### PML1-04-A05 二スピンの状態表
- Level: A
- 目安時間: 14分

$E_{h,J}(x_1,x_2)=-h(x_1+x_2)-Jx_1x_2$、各 $x_i\in\{-1,+1\}$ とする。$h=J=0$ で四状態の確率、$\mathbb E[x_1+x_2]$、$\mathbb E[x_1x_2]$ を求めよ。

<!-- solution-start -->
#### 詳細解答

どの状態でも $E=0$ なので指数重みは1。従って $Z=1+1+1+1=4$、各状態の確率は $1/4$。$f_1$ の値は順に $2,0,0,-2$ なので

$$
\mathbb E[f_1]=\frac14(2+0+0-2)=0.
$$

$f_2$ は $1,-1,-1,1$ だから

$$
\mathbb E[f_2]=\frac14(1-1-1+1)=0.
$$

[二スピン模型の命題](#prop-pml1-04-two-spin)に $h=J=0$ を代入しても両方0になる。
<!-- solution-end -->

### PML1-04-B01 1スピンの最尤パラメータと境界
- Level: B
- 目安時間: 22分

$\Omega=\{-1,+1\}$、$E_w(x)=-wx$、$\tau>0$ とする。観測比率が $\widehat q(+1)=r$、$\widehat q(-1)=1-r$ で $0<r<1$ のとき最尤解 $w_*$ を求めよ。$r=1$ なら何が変わるか説明せよ。

<!-- solution-start -->
#### 詳細解答

$p_w(+1)=e^{w/\tau}/(e^{w/\tau}+e^{-w/\tau})$ だから

$$
\frac{p_w(+1)}{p_w(-1)}=e^{2w/\tau}.
$$

また[勾配公式](#prop-pml1-04-score)で $m^+=r-(1-r)=2r-1$、$m^-(w)=p_w(+1)-p_w(-1)=2p_w(+1)-1$ なので

$$
\ell_D'(w)=\frac2\tau\bigl(r-p_w(+1)\bigr).
$$

$0<r<1$ なら $p_w(+1)=r$ を満たす有限のパラメータがあり、

$$
e^{2w_*/\tau}=\frac{r}{1-r},
\qquad
w_*=\frac\tau2\log\frac{r}{1-r}.
$$

[KL表示](#prop-pml1-04-kl-fit)より、この値では $p_{w_*}=\widehat q$ となり最大値を達成する。$p_w(+1)$ は $w$ に対して厳密増加なので $w_*$ は一意である。

$r=1$ では対数比 $r/(1-r)$ が有限でなくなる。有限 $w$ では $p_w(+1)<1$ であり、$\ell_D(w)=-\log(1+e^{-2w/\tau})$ は $w\to+\infty$ で0に近づくが達成しない。モデルが境界分布を含まないため有限の最尤解が存在しない。
<!-- solution-end -->

### PML1-04-B02 二スピンの結合強度を勾配で判定
- Level: B
- 目安時間: 20分

第5節の二スピン模型で $h=0$、$J=(\tau/2)\log3$ とする。観測がすべて異符号状態、すなわち $\widehat q(+,-)=\widehat q(-,+)=1/2$ のとき、正相・負相と二成分の平均対数尤度の勾配を求めよ。

<!-- solution-start -->
#### 詳細解答

観測側では $f_1=0$ が両状態で成立し、$f_2=-1$ が両状態で成立するので

$$
m^+=(0,-1).
$$

[二スピンの有限和計算](#prop-pml1-04-two-spin)により、指定した $h,J$ では同符号が各 $3/8$、異符号が各 $1/8$、従って

$$
m^-=(0,(3/8+3/8)-(1/8+1/8))=(0,1/2).
$$

[勾配公式](#prop-pml1-04-score)に代入すると

$$
\nabla_{(h,J)}\ell_D
=\frac1\tau\bigl((0,-1)-(0,1/2)\bigr)
=\left(0,-\frac3{2\tau}\right).
$$

観測は異符号100%なのにモデルは異符号25%なので、$J$ を**下げて**異符号の相対確率を増やす向きである。
<!-- solution-end -->

### PML1-04-B03 KLの向きと未観測状態
- Level: B
- 目安時間: 20分

二状態 $\Omega=\{a,b\}$、$\widehat q=(1,0)$、$p_w=(3/4,1/4)$ とする。平均対数尤度、$H_{\mathrm e}(\widehat q)$、$D_{\mathrm e}(\widehat q\|p_w)$ を計算し、KL恒等式を検算せよ。逆向き $D_{\mathrm e}(p_w\|\widehat q)$ はどうなるか。

<!-- solution-start -->
#### 詳細解答

観測分布の非零成分は $a$ のみなので

$$
\ell_D(w)=\log(3/4),\qquad
H_{\mathrm e}(\widehat q)=-1\log1=0.
$$

[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)によると

$$
D_{\mathrm e}(\widehat q\|p_w)
=1\log\frac{1}{3/4}=\log\frac43.
$$

従って[最尤学習とKLの命題](#prop-pml1-04-kl-fit)の右辺は $0+\log(4/3)=-\log(3/4)=-\ell_D(w)$。逆向きでは $p_w(b)=1/4>0$ なのに $\widehat q(b)=0$ で台の包含が成り立たないため、KLは $+\infty$ である。
<!-- solution-end -->

### PML1-04-B04 二スピンの共分散とHessian
- Level: B
- 目安時間: 25分

二スピンの $\tau>0$、$h=0$、$J=0$ において $f_1=x_1+x_2$、$f_2=x_1x_2$ の共分散行列と $\ell_D$ のHessianを求めよ。データの分布には依存するか。

<!-- solution-start -->
#### 詳細解答

この地点で各状態のモデル確率は $1/4$。先の表より $f_1=(2,0,0,-2)$、$f_2=(1,-1,-1,1)$。平均は双方0なので

$$
\operatorname{Var}(f_1)=\frac{2^2+0^2+0^2+(-2)^2}{4}=2,
$$

$$
\operatorname{Var}(f_2)=\frac{1+1+1+1}{4}=1.
$$

積は $f_1f_2=(2,0,0,-2)$ なので $\mathbb E[f_1f_2]=0$、従って共分散も0。よって

$$
\operatorname{Cov}_{p_{0,0}}(f)=
\begin{pmatrix}2&0\\0&1\end{pmatrix}.
$$

[曲率の命題](#prop-pml1-04-curvature)より

$$
\nabla^2\ell_D(0,0)
=-\frac1{\tau^2}
\begin{pmatrix}2&0\\0&1\end{pmatrix}.
$$

線形エネルギーのHessianはモデル平均の微分から生じるため、**この固定地点・固定モデルでは**観測分布に依存しない。勾配の正相は観測分布に依存するので、勾配まで同じとは限らない。
<!-- solution-end -->

### PML1-04-C01 観測平均、厳密負相、曲率を一つの模型で結ぶ
- Level: C
- 目安時間: 35分

二スピン模型 $E_{h,J}(x_1,x_2)=-h(x_1+x_2)-Jx_1x_2$、$\tau>0$ を考える。観測分布は $\widehat q(+,+)=1/2$、$\widehat q(-,-)=1/4$、$\widehat q(+,-)=1/4$、$\widehat q(-,+)=0$ とする。点 $h=0$、$J=(\tau/2)\log3$ で以下を求めよ。

1. モデルの四状態確率、正相平均 $m^+$、負相平均 $m^-$。
2. $(h,J)$ に関する平均対数尤度の勾配。
3. 共分散行列とHessian。$h$ 方向に十分小さな正の変化を与えると、平均対数尤度は増えるか。
4. この点で $\nabla\ell_D\ne0$ であることから、モデルが物理的な非平衡状態であると結論できるか。

<!-- solution-start -->
#### 詳細解答

**(1) モデルと二つの平均。** $h=0$、$J/\tau=(\log3)/2$ なので $e^{J/\tau}=\sqrt3$、$e^{-J/\tau}=1/\sqrt3$。分配関数は

$$
Z=2\sqrt3+\frac2{\sqrt3}=\frac8{\sqrt3}.
$$

従って同符号の $(+,+),(-,-)$ は各 $3/8$、異符号の $(+,-),(-,+)$ は各 $1/8$。総和は $2(3/8)+2(1/8)=1$ である。

特徴量 $f_1=x_1+x_2$、$f_2=x_1x_2$ の四状態の値は、順に $f_1=(2,0,0,-2)$、$f_2=(1,-1,-1,1)$（順序 $(+,+),(+,-),(-,+),(-,-)$）。観測分布を同じ順に並べると $(1/2,1/4,0,1/4)$ だから

$$
m^+_1=2\cdot\frac12+0\cdot\frac14+0\cdot0-2\cdot\frac14
=\frac12,
$$

$$
m^+_2=1\cdot\frac12-1\cdot\frac14-1\cdot0+1\cdot\frac14
=\frac12.
$$

モデル平均は

$$
m^-_1=2\cdot\frac38-2\cdot\frac38=0,
\qquad
m^-_2=\frac38-\frac18-\frac18+\frac38=\frac12.
$$

従って $m^+=(1/2,1/2)$、$m^-=(0,1/2)$。

**(2) 勾配。** [正相・負相の勾配公式](#prop-pml1-04-score)を、$E=-hf_1-Jf_2$ に適用する。$h,J$ に関する偏微分はそれぞれ $-f_1,-f_2$ なので

$$
\nabla_{(h,J)}\ell_D
=\frac1\tau(m^+-m^-)
=\frac1\tau\left(\left(\frac12,\frac12\right)
-\left(0,\frac12\right)\right)
=\left(\frac1{2\tau},0\right).
$$

**(3) 曲率と増加方向。** モデルで $f_1^2=4$ となるのは同符号の二状態、$f_2^2=1$ は全状態である。従って

$$
\mathbb E_p[f_1^2]=4\left(\frac38+\frac38\right)=3,\qquad
\mathbb E_p[f_2^2]=1.
$$

また $f_1f_2=f_1$ なので $\mathbb E_p[f_1f_2]=0$。平均 $(0,1/2)$ を引くと

$$
\operatorname{Cov}_{p}(f_1,f_2)
=\begin{pmatrix}3-0^2&0-0\cdot(1/2)\\
0-0\cdot(1/2)&1-(1/2)^2\end{pmatrix}
=\begin{pmatrix}3&0\\0&3/4\end{pmatrix}.
$$

[曲率の命題](#prop-pml1-04-curvature)によりHessianはこの行列の $-1/\tau^2$ 倍。$g(t)=\ell_D(t,J)$ とおくと $g'(0)=1/(2\tau)>0$ なので、微分の定義から十分小さい $t>0$ について $g(t)>g(0)$。**任意の大きさの更新で増加する**とは言っていない。

**(4) 物理的な解釈。** 結論できない。この勾配は固定した観測分布への適合の改善方向であり、分配関数と確率を定義しただけでは物理的な時間発展、熱浴、熱平衡への緩和は指定されていない。非零の学習勾配と物理的な非平衡は別の性質である。
<!-- solution-end -->
