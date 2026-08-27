# P3-01 主要な離散分布

この章では、主要な離散分布を**名前と公式の暗記表**としてではなく、どの確率実験から現れるかを見分け、確率質量関数を組合せ・独立性・級数から作り、平均・分散・共分散まで再現できるようにします。

特に、二項分布と超幾何分布、幾何分布と負の二項分布は問題文が似て見えます。そこで「何が固定され、何を数えているか」を最初に確認します。また、確率母関数を使う場合も完成形を暗記して置くのではなく、**確率質量関数を代入して確率母関数を作るところから**計算します。

共通表記は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md) と [分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 1回の成否をベルヌーイ分布で表す。
- 独立な固定回数試行の成功数を二項分布で表す。
- 有限母集団からの非復元抽出を超幾何分布で表す。
- 初成功までの試行回数を幾何分布で表し、無記憶性を示す。
- 第 $r$ 回目の成功までの試行回数を負の二項分布で表す。
- 一定区間内の発生件数をポアソン分布で表す。
- 多カテゴリの度数ベクトルを多項分布で表す。
- 二項分布・幾何分布・負の二項分布・ポアソン分布の確率母関数を確率質量関数から導く。
- 超幾何分布の有限母集団補正を指示変数の共分散から導く。
- 多項分布の周辺分布と負の共分散を指示変数から導く。
- 独立なポアソン変数の和、総数を条件とした二項分布、ポアソン分布の間引きを導く。

## 前提知識

1. P1-02: 独立試行の積、条件付き確率。
2. P2-01: 確率質量関数、台、正規化、同時分布・周辺分布。
3. P2-02: 期待値、分散、共分散、確率母関数、独立和。
4. F0-01: 二項定理、多項定理、等比級数、指数級数。

---

## 1. 最初に見るべき「試行構造」

分布名を当てるより先に、次の4点を読みます。

1. **試行回数が固定か**、成功回数が固定で終了時刻を数えるか。
2. 抽出が**復元あり・独立**か、**非復元**か。
3. 1回の結果が2カテゴリか、多カテゴリか。
4. 個々の試行を数えるのか、時間・面積など一定区間の**発生件数**を数えるのか。

| 試行構造 | 数える量 | 主な分布 |
|---|---|---|
| 1回の成否 | 成功指示変数 | ベルヌーイ分布 |
| 独立な $n$ 回の成否 | 成功回数 | 二項分布 |
| 有限母集団から非復元で $n$ 個抽出 | 成功個数 | 超幾何分布 |
| 成功確率 $p$ の独立試行を成功まで続ける | 初成功までの試行回数 | 幾何分布 |
| 成功確率 $p$ の独立試行を $r$ 回成功まで続ける | $r$ 回目成功までの試行回数 | 負の二項分布 |
| 一定区間で独立に発生する稀な件数 | 件数 | ポアソン分布 |
| 独立な $n$ 回を $m$ カテゴリへ分類 | 各カテゴリの度数 | 多項分布 |

二項分布と超幾何分布の違いは、**成功確率が各回で一定か**です。非復元抽出では、1個取るたびに母集団の構成が変わります。

幾何分布と負の二項分布の違いは、**何回目の成功で止めるか**です。本章では幾何分布を「初成功までの試行回数」$1,2,\ldots$ とする規約を使います。

---

## 2. 定義と確率質量関数を作る

以下では $q=1-p$ とします。

### 2.1 ベルヌーイ分布

$X\sim\operatorname{Bernoulli}(p)$、$0\leq p\leq1$ とは、台 $\{0,1\}$ で

$$
P(X=1)=p,\qquad P(X=0)=q
$$

となる分布です。1回の試行で成功なら1、失敗なら0と置いた指示変数そのものです。

正規化は

$$
P(X=0)+P(X=1)=q+p=1
$$

です。

### 2.2 二項分布

成功確率 $p$ の独立なベルヌーイ試行を $n$ 回行い、成功回数を $X$ とします。

$X=k$ となるには、$n$ 個の位置から成功する $k$ 個の位置を選びます。位置の選び方は

$$
\binom nk
$$

通りです。特定の成功・失敗配置の確率は独立性から

$$
p^kq^{n-k}
$$

なので

$$
\boxed{
P(X=k)=\binom nkp^kq^{n-k}
},\qquad k=0,1,\ldots,n.
$$

これを $X\sim\operatorname{Bin}(n,p)$ と書きます。二項定理により

$$
\sum_{k=0}^n\binom nkp^kq^{n-k}
=(p+q)^n=1
$$

なので正規化されています。

### 2.3 超幾何分布

$N$ 個中 $K$ 個が成功である有限母集団から、非復元で $n$ 個を選びます。成功数を $X$ とします。

全ての $n$ 個の標本の選び方は $\binom Nn$ 通りです。成功数が $k$ なら、成功 $K$ 個から $k$ 個、失敗 $N-K$ 個から $n-k$ 個を選ぶので

$$
\boxed{
P(X=k)
=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}
}.
$$

これを $X\sim\operatorname{Hypergeom}(N,K,n)$ と書きます。

台は「成功側から $k$ 個選べる」「失敗側から $n-k$ 個選べる」という両条件から

$$
\boxed{
\max(0,n-N+K)
\leq k\leq
\min(n,K)
}.
$$

Vandermondeの恒等式

$$
\sum_k\binom Kk\binom{N-K}{n-k}=\binom Nn
$$

により確率の総和は1です。

### 2.4 幾何分布

成功確率 $p$ の独立試行を、初めて成功するまで続けます。初成功までの試行回数を $X$ とします。

$X=k$ とは、最初の $k-1$ 回が失敗し、第 $k$ 回が成功することなので

$$
\boxed{
P(X=k)=q^{k-1}p
},\qquad k=1,2,\ldots.
$$

これを $X\sim\operatorname{Geom}(p)$ と書きます。正規化は等比級数から

$$
\sum_{k=1}^{\infty}q^{k-1}p
=p\sum_{j=0}^{\infty}q^j
=\frac{p}{1-q}=1
$$

です。

### 2.5 負の二項分布

成功確率 $p$ の独立試行を、第 $r$ 回目の成功まで続けます。そこまでの試行回数を $T$ とします。

$T=k$ なら第 $k$ 回は成功で固定です。最初の $k-1$ 回のうち成功はちょうど $r-1$ 回なので、その配置は

$$
\binom{k-1}{r-1}
$$

通りです。したがって

$$
\boxed{
P(T=k)=\binom{k-1}{r-1}p^rq^{k-r}
},\qquad k=r,r+1,\ldots.
$$

これを $T\sim\operatorname{NegBin}(r,p)$ と書きます。

$j=k-r$ と置くと

$$
\begin{aligned}
\sum_{k=r}^{\infty}
\binom{k-1}{r-1}p^rq^{k-r}
&=p^r\sum_{j=0}^{\infty}\binom{j+r-1}{r-1}q^j\\
&=p^r(1-q)^{-r}\\
&=1,
\end{aligned}
$$

なので正規化されています。

### 2.6 ポアソン分布

$X\sim\operatorname{Poisson}(\lambda)$、$\lambda>0$ とは、台 $\mathbb N_0=\{0,1,2,\ldots\}$ で

$$
\boxed{
P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!}
},\qquad k=0,1,2,\ldots
$$

となる分布です。

指数級数

$$
e^\lambda
=\sum_{k=0}^{\infty}\frac{\lambda^k}{k!}
$$

から

$$
\sum_{k=0}^{\infty}e^{-\lambda}\frac{\lambda^k}{k!}=1
$$

です。

### 2.7 多項分布

1回の試行が $m$ カテゴリのいずれかに入り、カテゴリ $i$ の確率が $p_i$、

$$
p_i\geq0,\qquad \sum_{i=1}^m p_i=1
$$

とします。この試行を独立に $n$ 回行い、カテゴリ $i$ の度数を $X_i$ とします。

$\boldsymbol X=(X_1,\ldots,X_m)$ の台は

$$
x_i\in\mathbb N_0,
\qquad
x_1+\cdots+x_m=n.
$$

カテゴリ列の並べ方は

$$
\frac{n!}{x_1!\cdots x_m!}
$$

通りで、各特定列の確率は $\prod_i p_i^{x_i}$ なので

$$
\boxed{
P(\boldsymbol X=\boldsymbol x)
=\frac{n!}{\prod_{i=1}^m x_i!}
\prod_{i=1}^m p_i^{x_i}
}.
$$

これを

$$
\boldsymbol X\sim\operatorname{Multinomial}(n;p_1,\ldots,p_m)
$$

と書きます。多項定理から確率の総和は1です。

---

## 3. 平均・分散を定義から再現する

### 3.1 ベルヌーイ分布

$X\in\{0,1\}$ なので $X^2=X$ です。したがって

$$
E[X]=0\cdot q+1\cdot p=p,
$$

$$
E[X^2]=E[X]=p.
$$

よって

$$
\boxed{
\operatorname{Var}(X)
=E[X^2]-\{E[X]\}^2
=p-p^2=pq
}.
$$

### 3.2 二項分布：指示変数から

$n$ 回の各試行について

$$
I_j=
\begin{cases}
1,&j\text{回目が成功},\\
0,&j\text{回目が失敗}
\end{cases}
$$

と置けば

$$
X=I_1+\cdots+I_n.
$$

各 $I_j$ はベルヌーイ分布に従うため

$$
E[I_j]=p,
\qquad
\operatorname{Var}(I_j)=pq.
$$

したがって期待値の線形性から

$$
\boxed{E[X]=np}.
$$

また試行間は独立なので $\operatorname{Cov}(I_i,I_j)=0$、$i\ne j$ です。よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=\sum_{j=1}^n\operatorname{Var}(I_j)
+2\sum_{i<j}\operatorname{Cov}(I_i,I_j)\\
&=npq.
\end{aligned}
$$

したがって

$$
\boxed{\operatorname{Var}(X)=npq}.
$$

### 3.3 二項分布：確率母関数を確率質量関数から作る

確率母関数の定義に二項分布の確率質量関数を代入します。

$$
\begin{aligned}
G_X(s)
&=E[s^X]\\
&=\sum_{k=0}^n s^k\binom nkp^kq^{n-k}\\
&=\sum_{k=0}^n\binom nk(ps)^kq^{n-k}\\
&=(q+ps)^n.
\end{aligned}
$$

最後の行は二項定理です。

したがって

$$
G_X'(s)=np(q+ps)^{n-1},
$$

$$
G_X''(s)=n(n-1)p^2(q+ps)^{n-2}.
$$

$s=1$ では $p+q=1$ なので

$$
E[X]=G_X'(1)=np,
$$

$$
E[X(X-1)]=G_X''(1)=n(n-1)p^2.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=G_X''(1)+G_X'(1)-\{G_X'(1)\}^2\\
&=n(n-1)p^2+np-n^2p^2\\
&=np(1-p)\\
&=npq.
\end{aligned}
$$

確率母関数を「$(q+ps)^n$ と暗記」するのではなく、最初の和から再現できることが重要です。

### 3.4 超幾何分布：有限母集団補正

$N$ 個中成功が $K$ 個で

$$
p=\frac KN
$$

とします。非復元で選ぶ第 $j$ 個目が成功なら $I_j=1$ と置くと

$$
X=\sum_{j=1}^n I_j.
$$

抽出順の各位置では成功確率は $K/N$ なので

$$
E[I_j]=p,
$$

したがって

$$
\boxed{E[X]=np}.
$$

一方、$i\ne j$ では非復元なので独立ではありません。

$$
P(I_i=1,I_j=1)
=\frac KN\frac{K-1}{N-1}
=\frac{K(K-1)}{N(N-1)}.
$$

よって

$$
\begin{aligned}
\operatorname{Cov}(I_i,I_j)
&=E[I_iI_j]-E[I_i]E[I_j]\\
&=\frac{K(K-1)}{N(N-1)}-\left(\frac KN\right)^2\\
&=-\frac{p(1-p)}{N-1}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(X)
&=np(1-p)
+n(n-1)\left\{-\frac{p(1-p)}{N-1}\right\}\\
&=np(1-p)
\left(1-\frac{n-1}{N-1}\right)\\
&=\boxed{
np(1-p)\frac{N-n}{N-1}
}.
\end{aligned}
$$

二項分布の分散 $np(1-p)$ に

$$
\frac{N-n}{N-1}<1
$$

が掛かります。これが有限母集団補正です。非復元では、一度成功を引くと次の成功確率が下がるため共分散が負になり、分散が小さくなります。

### 3.5 幾何分布：確率母関数から平均・分散

$X\sim\operatorname{Geom}(p)$ とします。確率質量関数から

$$
\begin{aligned}
G_X(s)
&=\sum_{k=1}^{\infty}s^k q^{k-1}p\\
&=ps\sum_{j=0}^{\infty}(qs)^j\\
&=\frac{ps}{1-qs},
\qquad |qs|<1.
\end{aligned}
$$

微分すると

$$
G_X'(s)=\frac{p}{(1-qs)^2},
$$

$$
G_X''(s)=\frac{2pq}{(1-qs)^3}.
$$

$s=1$ で $1-q=p$ なので

$$
E[X]=G_X'(1)=\frac{p}{p^2}=\boxed{\frac1p}.
$$

また

$$
G_X''(1)=\frac{2q}{p^2}.
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(X)
&=G_X''(1)+G_X'(1)-\{G_X'(1)\}^2\\
&=\frac{2q}{p^2}+\frac1p-\frac1{p^2}\\
&=\boxed{\frac q{p^2}}.
\end{aligned}
$$

### 3.6 幾何分布の無記憶性

$m,n\in\mathbb N_0$ とします。$X>m$ は最初の $m$ 回が全て失敗することなので

$$
P(X>m)=q^m.
$$

よって

$$
\begin{aligned}
P(X>m+n\mid X>m)
&=\frac{P(X>m+n)}{P(X>m)}\\
&=\frac{q^{m+n}}{q^m}\\
&=q^n\\
&=P(X>n).
\end{aligned}
$$

これが無記憶性です。すでに $m$ 回失敗したという情報は、その後さらに $n$ 回待つ確率を変えません。

### 3.7 負の二項分布：確率母関数から平均・分散

$T\sim\operatorname{NegBin}(r,p)$ とします。確率質量関数から

$$
\begin{aligned}
G_T(s)
&=\sum_{k=r}^{\infty}s^k
\binom{k-1}{r-1}p^rq^{k-r}.
\end{aligned}
$$

$j=k-r$ と置くと

$$
\begin{aligned}
G_T(s)
&=(ps)^r
\sum_{j=0}^{\infty}
\binom{j+r-1}{r-1}(qs)^j\\
&=(ps)^r(1-qs)^{-r}\\
&=\left(\frac{ps}{1-qs}\right)^r.
\end{aligned}
$$

これは「第1成功まで」「第2成功までの追加待ち時間」…という独立な $r$ 個の幾何待ち時間の和とも解釈できます。各待ち時間の平均・分散は $1/p$, $q/p^2$ なので

$$
\boxed{E[T]=\frac rp},
\qquad
\boxed{\operatorname{Var}(T)=\frac{rq}{p^2}}.
$$

### 3.8 ポアソン分布：確率母関数から平均・分散

$X\sim\operatorname{Poisson}(\lambda)$ とします。定義から

$$
\begin{aligned}
G_X(s)
&=\sum_{k=0}^{\infty}s^k e^{-\lambda}\frac{\lambda^k}{k!}\\
&=e^{-\lambda}\sum_{k=0}^{\infty}\frac{(\lambda s)^k}{k!}\\
&=e^{-\lambda}e^{\lambda s}\\
&=e^{\lambda(s-1)}.
\end{aligned}
$$

したがって

$$
G_X'(s)=\lambda e^{\lambda(s-1)},
\qquad
G_X''(s)=\lambda^2e^{\lambda(s-1)}.
$$

$s=1$ を代入して

$$
E[X]=\lambda,
$$

$$
\begin{aligned}
\operatorname{Var}(X)
&=\lambda^2+\lambda-\lambda^2\\
&=\boxed{\lambda}.
\end{aligned}
$$

ポアソン分布では平均と分散が等しいことが重要な特徴です。ただし「平均=分散だから必ずポアソン分布」という逆向きの推論は一般にはできません。

### 3.9 多項分布の周辺分布と共分散

第 $t$ 試行がカテゴリ $i$ に入るとき

$$
I_{ti}=1
$$

と置き、それ以外では0とします。すると

$$
X_i=\sum_{t=1}^n I_{ti}.
$$

各 $I_{ti}$ は成功確率 $p_i$ のベルヌーイ分布なので

$$
\boxed{X_i\sim\operatorname{Bin}(n,p_i)}.
$$

したがって

$$
E[X_i]=np_i,
\qquad
\operatorname{Var}(X_i)=np_i(1-p_i).
$$

$i\ne j$ とすると、同一試行でカテゴリ $i$ と $j$ に同時に入ることはできないので

$$
I_{ti}I_{tj}=0.
$$

よって

$$
\operatorname{Cov}(I_{ti},I_{tj})
=0-p_ip_j
=-p_ip_j.
$$

異なる試行間は独立なので

$$
\boxed{
\operatorname{Cov}(X_i,X_j)=-np_ip_j
},\qquad i\ne j.
$$

負になる理由は、総度数 $n$ が固定されているからです。あるカテゴリが1増えると、他カテゴリに使える回数が1減ります。

---

## 4. 分布どうしの関係

### 4.1 独立な二項分布の和

独立に

$$
X_1\sim\operatorname{Bin}(n_1,p),
\qquad
X_2\sim\operatorname{Bin}(n_2,p)
$$

とします。確率母関数は

$$
G_{X_1}(s)=(q+ps)^{n_1},
\qquad
G_{X_2}(s)=(q+ps)^{n_2}.
$$

独立和では積になるので

$$
G_{X_1+X_2}(s)
=(q+ps)^{n_1+n_2}.
$$

したがって

$$
\boxed{
X_1+X_2\sim\operatorname{Bin}(n_1+n_2,p)
}.
$$

成功確率が同じことが必要です。

### 4.2 独立なポアソン分布の和

独立に

$$
X\sim\operatorname{Poisson}(\lambda),
\qquad
Y\sim\operatorname{Poisson}(\mu)
$$

とします。

$$
G_X(s)=e^{\lambda(s-1)},
\qquad
G_Y(s)=e^{\mu(s-1)}
$$

なので

$$
G_{X+Y}(s)
=e^{(\lambda+\mu)(s-1)}.
$$

よって

$$
\boxed{
X+Y\sim\operatorname{Poisson}(\lambda+\mu)
}.
$$

### 4.3 ポアソン和を固定すると二項分布

上と同じ $X,Y$ について $S=X+Y$ とします。$S=n$ を条件とし、$0\leq k\leq n$ とすると

$$
\begin{aligned}
P(X=k,S=n)
&=P(X=k,Y=n-k)\\
&=e^{-(\lambda+\mu)}
\frac{\lambda^k}{k!}
\frac{\mu^{n-k}}{(n-k)!}.
\end{aligned}
$$

また

$$
P(S=n)
=e^{-(\lambda+\mu)}
\frac{(\lambda+\mu)^n}{n!}.
$$

したがって

$$
\begin{aligned}
P(X=k\mid S=n)
&=\frac{P(X=k,S=n)}{P(S=n)}\\
&=\binom nk
\left(\frac{\lambda}{\lambda+\mu}\right)^k
\left(\frac{\mu}{\lambda+\mu}\right)^{n-k}.
\end{aligned}
$$

よって

$$
\boxed{
X\mid(S=n)
\sim\operatorname{Bin}
\left(n,\frac{\lambda}{\lambda+\mu}\right)
}.
$$

「全件数 $n$ が分かった後、そのうち何件が $X$ 側だったか」を数えるため二項分布になります。

### 4.4 ポアソン分布の間引き

$N\sim\operatorname{Poisson}(\lambda)$ とし、各件を独立に確率 $p$ でA、確率 $q$ でBへ分類します。A件数を $X$、B件数を $Y$ とします。

$N=x+y$ の条件下では

$$
X\mid(N=x+y)\sim\operatorname{Bin}(x+y,p).
$$

したがって

$$
\begin{aligned}
P(X=x,Y=y)
&=P(N=x+y)P(X=x\mid N=x+y)\\
&=e^{-\lambda}\frac{\lambda^{x+y}}{(x+y)!}
\binom{x+y}{x}p^xq^y\\
&=e^{-\lambda p}\frac{(\lambda p)^x}{x!}
  e^{-\lambda q}\frac{(\lambda q)^y}{y!}.
\end{aligned}
$$

右辺が2つの確率質量関数の積に分かれたので

$$
\boxed{
X\sim\operatorname{Poisson}(\lambda p),
\qquad
Y\sim\operatorname{Poisson}(\lambda q)
}
$$

かつ $X,Y$ は独立です。

### 4.5 多項分布のカテゴリ集約

$$
(X_1,X_2,X_3)
\sim\operatorname{Multinomial}(n;p_1,p_2,p_3)
$$

とします。カテゴリ1と2をまとめて「成功」とみなせば、各試行がまとめたカテゴリへ入る確率は $p_1+p_2$ です。したがって

$$
\boxed{
X_1+X_2\sim\operatorname{Bin}(n,p_1+p_2)
}.
$$

共分散公式でも

$$
\begin{aligned}
\operatorname{Var}(X_1+X_2)
&=np_1(1-p_1)+np_2(1-p_2)-2np_1p_2\\
&=n(p_1+p_2)\{1-(p_1+p_2)\},
\end{aligned}
$$

となり、二項分布の分散と一致します。

---

## 5. 典型例

### 例1：二項分布か超幾何分布か

不良率0.1の工程から独立に10個得るとします。各個体の不良確率を0.1とみなすので、不良数 $X$ は

$$
X\sim\operatorname{Bin}(10,0.1).
$$

一方、不良10個を含む100個の箱から非復元で10個を選ぶなら、不良数 $Y$ は

$$
Y\sim\operatorname{Hypergeom}(100,10,10).
$$

両者の平均はともに1ですが、分散は

$$
\operatorname{Var}(X)=10(0.1)(0.9)=0.9,
$$

$$
\operatorname{Var}(Y)
=0.9\frac{90}{99}<0.9.
$$

非復元側では抽出同士が負に依存するためです。

### 例2：3回目の成功が第5試行

成功確率 $p$ の独立試行で、第3成功が第5試行に起きる確率を求めます。

第5試行は成功で固定です。最初の4回のうち成功が2回である必要があるので

$$
P(T=5)=\binom42p^2q^2\cdot p
=\boxed{\binom42p^3q^2}.
$$

### 例3：ポアソン分布の和

独立に

$$
X\sim\operatorname{Poisson}(2),
\qquad
Y\sim\operatorname{Poisson}(3)
$$

なら

$$
X+Y\sim\operatorname{Poisson}(5).
$$

したがって平均・分散はいずれも5です。

### 例4：多項度数

各試行でA,B,Cとなる確率が $0.2,0.3,0.5$、試行回数が10なら

$$
(X_A,X_B,X_C)
\sim\operatorname{Multinomial}(10;0.2,0.3,0.5).
$$

例えば

$$
\operatorname{Cov}(X_A,X_B)
=-10(0.2)(0.3)
=-0.6.
$$

---

## 6. 問題解決の型

### 型1：何が固定されているかを書く

- 固定回数の独立試行の成功数 → 二項分布。
- 有限母集団から非復元抽出 → 超幾何分布。
- 初成功までの試行回数 → 幾何分布。
- 第 $r$ 成功までの試行回数 → 負の二項分布。
- 一定区間の発生件数 → ポアソン分布。
- 多カテゴリ度数 → 多項分布。

### 型2：確率質量関数は「配置数 × 1配置の確率」

二項分布なら

$$
\binom nk\times p^kq^{n-k}.
$$

負の二項分布なら、最後を成功に固定したうえで

$$
\binom{k-1}{r-1}\times p^rq^{k-r}.
$$

### 型3：超幾何分布は「都合のよい標本数 / 全標本数」

$$
P(X=k)
=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}.
$$

台の下限・上限も忘れません。

### 型4：確率母関数は「定義 → 級数整理 → 微分」

完成式を書き始めず

$$
G_X(s)=\sum_k s^kP(X=k)
$$

へ確率質量関数を代入します。二項定理、等比級数、指数級数などへ変形し、そこから微分します。

### 型5：条件付き分布は分子と分母を一度書く

例えばポアソン和では

$$
P(X=k\mid X+Y=n)
=\frac{P(X=k,Y=n-k)}{P(X+Y=n)}.
$$

いきなり「二項分布になる」と書くより、この比を一度作ると途中点を失いにくくなります。

---

# 7. 演習：問題の直後に解答

GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

## Level A：基礎

### P3-A01 二項確率

- level: A
- minutes: 7
- topics: 二項分布
- calculation_load: low

成功確率 $p=0.2$ の独立なベルヌーイ試行を5回行い、成功回数を $X$ とする。このとき $X\sim\operatorname{Bin}(5,0.2)$ である。$P(X=2)$、$E[X]$、$\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

二項分布の確率質量関数から

$$
\begin{aligned}
P(X=2)
&=\binom52(0.2)^2(0.8)^3\\
&=10\cdot0.04\cdot0.512\\
&=0.2048.
\end{aligned}
$$

平均・分散は指示変数 $X=I_1+\cdots+I_5$ とみれば

$$
E[X]=5(0.2)=1,
$$

$$
\operatorname{Var}(X)=5(0.2)(0.8)=0.8.
$$

##### 本番答案

$$
P(X=2)=\binom52(0.2)^2(0.8)^3=0.2048,
$$

$$
E[X]=1,\qquad \operatorname{Var}(X)=0.8.
$$

##### 採点基準

- 二項確率: 6点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3-A02 幾何待ち時間

- level: A
- minutes: 7
- topics: 幾何分布
- calculation_load: low

成功確率 $p=0.25$ の独立なベルヌーイ試行を、初めて成功するまで繰り返す。初成功が出る試行番号を $X$ とする。本章の規約では $X\in\{1,2,\ldots\}$ で $X\sim\operatorname{Geom}(0.25)$ である。$P(X=4)$、$E[X]$、$\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

第4回に初成功するためには、最初の3回が失敗し、第4回が成功します。

$$
P(X=4)=(0.75)^3(0.25)=\frac{27}{256}.
$$

$p=1/4$, $q=3/4$ なので

$$
E[X]=\frac1p=4,
$$

$$
\operatorname{Var}(X)
=\frac q{p^2}
=\frac{3/4}{(1/4)^2}
=12.
$$

##### 本番答案

$$
P(X=4)=\left(\frac34\right)^3\frac14=\frac{27}{256},
\quad
E[X]=4,
\quad
\operatorname{Var}(X)=12.
$$

##### 採点基準

- 待ち時間の確率: 6点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3-A03 ポアソン確率

- level: A
- minutes: 7
- topics: ポアソン分布
- calculation_load: low

非負整数値確率変数 $X$ は母数2のポアソン分布に従い、確率質量関数が

$$
P(X=k)=e^{-2}\frac{2^k}{k!},
\qquad k=0,1,2,\ldots
$$

で与えられるとする。$P(X\leq1)$、$E[X]$、$\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
P(X\leq1)=P(X=0)+P(X=1).
$$

したがって

$$
\begin{aligned}
P(X\leq1)
&=e^{-2}\frac{2^0}{0!}+e^{-2}\frac{2^1}{1!}\\
&=3e^{-2}.
\end{aligned}
$$

ポアソン分布では確率母関数を定義から作ると

$$
G_X(s)=e^{2(s-1)}
$$

となり、$G_X'(1)=2$、分散も2です。

##### 本番答案

$$
P(X\leq1)=e^{-2}(1+2)=3e^{-2},
$$

$$
E[X]=2,\qquad \operatorname{Var}(X)=2.
$$

##### 採点基準

- 確率: 6点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3-A04 ベルヌーイ分布

- level: A
- minutes: 6
- topics: ベルヌーイ分布
- calculation_load: low

成功確率0.3の1回の試行について、成功なら $I=1$、失敗なら $I=0$ とする成功指示変数 $I$ を定義する。$I$ の確率質量関数、$E[I]$、$\operatorname{Var}(I)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

成功なら1、失敗なら0なので

$$
P(I=1)=0.3,
\qquad
P(I=0)=0.7.
$$

また $I^2=I$ なので

$$
E[I]=0.3,
$$

$$
\begin{aligned}
\operatorname{Var}(I)
&=E[I^2]-\{E[I]\}^2\\
&=0.3-0.3^2\\
&=0.21.
\end{aligned}
$$

##### 本番答案

$$
P(I=1)=0.3,\quad P(I=0)=0.7,
$$

$$
E[I]=0.3,\qquad \operatorname{Var}(I)=0.21.
$$

##### 採点基準

- 確率質量関数: 4点
- 平均: 2点
- $I^2=I$ を用いた分散: 4点

<!-- solution-end -->

## Level B：分布選択と基本導出

### P3-B01 非復元抽出

- level: B
- minutes: 14
- topics: 超幾何分布
- calculation_load: medium

20個中6個が不良、14個が正常である有限母集団から、非復元で5個を無作為抽出する。抽出された5個に含まれる不良品数を $X$ とする。$X$ の台、$P(X=2)$、$E[X]$、$\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

有限母集団から非復元で抽出するので

$$
X\sim\operatorname{Hypergeom}(20,6,5).
$$

台は

$$
\max(0,5-20+6)=0,
\qquad
\min(5,6)=5
$$

より $0,1,\ldots,5$ です。

全標本数は $\binom{20}5$、不良2個・正常3個を選ぶ標本数は $\binom62\binom{14}3$ なので

$$
P(X=2)
=\frac{\binom62\binom{14}3}{\binom{20}5}.
$$

$p=6/20=0.3$ と置けば

$$
E[X]=5(0.3)=1.5.
$$

有限母集団補正を含む分散は

$$
\begin{aligned}
\operatorname{Var}(X)
&=5(0.3)(0.7)\frac{20-5}{20-1}\\
&=\frac{63}{76}.
\end{aligned}
$$

##### 本番答案

$$
X\sim\operatorname{Hypergeom}(20,6,5),
\qquad X=0,1,\ldots,5.
$$

$$
P(X=2)=\frac{\binom62\binom{14}3}{\binom{20}5},
$$

$$
E[X]=1.5,
\qquad
\operatorname{Var}(X)=\frac{63}{76}.
$$

##### 採点基準

- 分布と台: 3点
- 確率: 3点
- 平均: 2点
- 分散と有限母集団補正: 2点

<!-- solution-end -->

### P3-B02 3回目の成功

- level: B
- minutes: 13
- topics: 負の二項分布
- calculation_load: medium

各回の成功確率が $p=0.4$ で互いに独立なベルヌーイ試行を繰り返す。3回目の成功が出る試行番号を $T$ とする。$P(T=5)$、$E[T]$、$\operatorname{Var}(T)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$T=5$ では第5回は成功です。最初の4回のうち成功が2回であればよいので

$$
\begin{aligned}
P(T=5)
&=\binom42(0.4)^2(0.6)^2\cdot0.4\\
&=\binom42(0.4)^3(0.6)^2\\
&=0.13824.
\end{aligned}
$$

$T\sim\operatorname{NegBin}(3,0.4)$ なので

$$
E[T]=\frac3{0.4}=7.5,
$$

$$
\operatorname{Var}(T)
=\frac{3(0.6)}{(0.4)^2}
=11.25.
$$

##### 本番答案

$$
P(T=5)=\binom42(0.4)^3(0.6)^2=0.13824,
$$

$$
E[T]=7.5,\qquad \operatorname{Var}(T)=11.25.
$$

##### 採点基準

- 「最後は成功」の固定: 2点
- 確率: 4点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3-B03 三カテゴリ

- level: B
- minutes: 15
- topics: 多項分布
- calculation_load: medium

1回の試行がカテゴリ1,2,3に入る確率をそれぞれ $0.2,0.3,0.5$ とし、この試行を独立に6回行う。カテゴリ $i$ の度数を $X_i$ とし、$\boldsymbol X=(X_1,X_2,X_3)$ とおく。このとき $\boldsymbol X\sim\operatorname{Multinomial}(6;0.2,0.3,0.5)$ である。$P(X_1=1,X_2=2,X_3=3)$、$E[X_1]$、$\operatorname{Cov}(X_1,X_2)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

多項分布の確率質量関数から

$$
\begin{aligned}
P(X_1=1,X_2=2,X_3=3)
&=\frac{6!}{1!2!3!}(0.2)(0.3)^2(0.5)^3\\
&=0.135.
\end{aligned}
$$

周辺的には $X_1\sim\operatorname{Bin}(6,0.2)$ なので

$$
E[X_1]=6(0.2)=1.2.
$$

同一試行でカテゴリ1と2は同時に起こらないため

$$
\operatorname{Cov}(X_1,X_2)
=-6(0.2)(0.3)
=-0.36.
$$

##### 本番答案

$$
P(1,2,3)=\frac{6!}{1!2!3!}(0.2)(0.3)^2(0.5)^3=0.135,
$$

$$
E[X_1]=1.2,
\qquad
\operatorname{Cov}(X_1,X_2)=-0.36.
$$

##### 採点基準

- 多項確率: 6点
- 平均: 2点
- 共分散: 2点

<!-- solution-end -->

## Level C：統計検定1級型

### P3-C01 復元・非復元の比較

- level: C
- minutes: 25
- topics: 二項分布、超幾何分布
- calculation_load: medium

100個中20個が「成功」、80個が「失敗」である有限母集団を考える。復元して10回抽出したときの成功数を $X$、非復元で10個抽出したときの成功数を $Y$ とする。

1. 復元して10回抽出する成功数の分布を示せ。
2. 非復元で10個抽出する成功数の分布と台を示せ。
3. 両平均を求めよ。
4. 両分散を求めよ。
5. 非復元側の分散が小さい理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

復元抽出では毎回成功確率は

$$
p=\frac{20}{100}=0.2
$$

で一定で、10回の試行は独立です。したがって成功数を $X$ とすると

$$
X\sim\operatorname{Bin}(10,0.2).
$$

非復元抽出の成功数を $Y$ とすると

$$
Y\sim\operatorname{Hypergeom}(100,20,10).
$$

台は

$$
\max(0,10-100+20)=0,
\qquad
\min(10,20)=10
$$

より $0,1,\ldots,10$ です。

平均はどちらも

$$
10(0.2)=2.
$$

二項分布側は

$$
\operatorname{Var}(X)=10(0.2)(0.8)=1.6.
$$

超幾何分布側は有限母集団補正が掛かり

$$
\begin{aligned}
\operatorname{Var}(Y)
&=10(0.2)(0.8)\frac{100-10}{100-1}\\
&=1.6\frac{90}{99}\\
&=\frac{16}{11}.
\end{aligned}
$$

非復元では一度成功を引くと残りの成功割合が低下するため、異なる抽出位置の成功指示変数の共分散が負です。そのため独立抽出の二項分布より分散が小さくなります。

##### 本番答案

$$
X\sim\operatorname{Bin}(10,0.2),
$$

$$
Y\sim\operatorname{Hypergeom}(100,20,10),
\qquad Y=0,1,\ldots,10.
$$

両平均は2、分散は

$$
\operatorname{Var}(X)=1.6,
\qquad
\operatorname{Var}(Y)=\frac{16}{11}.
$$

非復元では抽出間に負の依存があり、有限母集団補正 $90/99<1$ が掛かる。

##### 採点基準

- 復元側の分布: 5点
- 非復元側の分布と台: 5点
- 平均: 3点
- 分散: 7点
- 負の依存の説明: 5点

<!-- solution-end -->

### P3-C02 待ち時間と無記憶性

- level: C
- minutes: 24
- topics: 幾何分布、負の二項分布
- calculation_load: medium

成功確率 $0<p<1$ の独立なベルヌーイ試行を繰り返し、$q=1-p$ とする。初成功が出る試行番号を $X$ とするので、本章の規約では $X\sim\operatorname{Geom}(p)$、$X\in\{1,2,\ldots\}$ である。また $m,n\in\mathbb N_0$ とする。

1. $P(X>m)$ を求めよ。
2. $P(X>m+n\mid X>m)=P(X>n)$ を示せ。
3. 2回目の成功までの試行回数 $T$ の確率質量関数を求めよ。
4. $E[T]$, $\operatorname{Var}(T)$ を求めよ。
5. $T$ が幾何分布でない理由を台と無記憶性から述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) $X>m$ は最初の $m$ 回が全て失敗することなので

$$
P(X>m)=q^m.
$$

(2)

$$
\begin{aligned}
P(X>m+n\mid X>m)
&=\frac{q^{m+n}}{q^m}\\
&=q^n\\
&=P(X>n).
\end{aligned}
$$

(3) $T=k$ では第 $k$ 回が2回目の成功です。したがって第 $k$ 回は成功、最初の $k-1$ 回には成功が1回だけあります。

$$
P(T=k)
=\binom{k-1}{1}p^2q^{k-2}
=(k-1)p^2q^{k-2},
\qquad k=2,3,\ldots.
$$

(4) $T\sim\operatorname{NegBin}(2,p)$ なので

$$
E[T]=\frac2p,
\qquad
\operatorname{Var}(T)=\frac{2q}{p^2}.
$$

(5) 幾何分布の台は $1,2,\ldots$ ですが $T$ の台は $2,3,\ldots$ です。また

$$
P(T>1)=1
$$

である一方

$$
P(T>2\mid T>1)=P(T>2)=1-p^2<1=P(T>1).
$$

したがって幾何分布の無記憶性も満たしません。

##### 本番答案

$$
P(X>m)=q^m,
$$

$$
P(X>m+n\mid X>m)=q^n=P(X>n).
$$

また

$$
P(T=k)=(k-1)p^2q^{k-2},\quad k\geq2,
$$

$$
E[T]=\frac2p,
\qquad
\operatorname{Var}(T)=\frac{2q}{p^2}.
$$

$T$ は台が2から始まり、無記憶性も持たないので幾何分布ではない。

##### 採点基準

- 尾確率: 4点
- 無記憶性: 5点
- 負の二項型確率質量関数: 7点
- 平均・分散: 4点
- 幾何分布との区別: 5点

<!-- solution-end -->

### P3-C03 ポアソン和と条件付き分布

- level: C
- minutes: 28
- topics: ポアソン分布、二項分布
- calculation_load: high

$\lambda>0$, $\mu>0$ とする。独立な非負整数値確率変数 $X,Y$ の確率質量関数が

$$
P(X=x)=e^{-\lambda}\frac{\lambda^x}{x!},
\qquad
P(Y=y)=e^{-\mu}\frac{\mu^y}{y!},
\qquad x,y\in\mathbb N_0
$$

で与えられている。すなわち $X\sim\operatorname{Poisson}(\lambda)$, $Y\sim\operatorname{Poisson}(\mu)$ である。$S=X+Y$ とし、$n\in\mathbb N_0$、$k=0,\ldots,n$ とする。

1. $S$ の分布を求めよ。
2. $P(X=k,S=n)$ を求めよ。
3. $P(X=k\mid S=n)$ を求めよ。
4. 条件付き分布名とパラメータを示せ。
5. 条件付き平均を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) 独立和の確率母関数は積になるので

$$
\begin{aligned}
G_S(s)
&=e^{\lambda(s-1)}e^{\mu(s-1)}\\
&=e^{(\lambda+\mu)(s-1)}.
\end{aligned}
$$

したがって

$$
S\sim\operatorname{Poisson}(\lambda+\mu).
$$

(2) $S=n$ かつ $X=k$ なら $Y=n-k$ です。独立性から

$$
P(X=k,S=n)
=e^{-(\lambda+\mu)}
\frac{\lambda^k\mu^{n-k}}{k!(n-k)!}.
$$

(3) 条件付き確率の定義を使います。

$$
P(X=k\mid S=n)
=\frac{P(X=k,S=n)}{P(S=n)}.
$$

ここで

$$
P(S=n)
=e^{-(\lambda+\mu)}
\frac{(\lambda+\mu)^n}{n!}.
$$

したがって

$$
\begin{aligned}
P(X=k\mid S=n)
&=\frac{n!}{k!(n-k)!}
\frac{\lambda^k\mu^{n-k}}{(\lambda+\mu)^n}\\
&=\binom nk
\left(\frac\lambda{\lambda+\mu}\right)^k
\left(\frac\mu{\lambda+\mu}\right)^{n-k}.
\end{aligned}
$$

(4) よって

$$
X\mid(S=n)
\sim\operatorname{Bin}
\left(n,\frac\lambda{\lambda+\mu}\right).
$$

(5) 二項分布の平均から

$$
E[X\mid S=n]
=n\frac\lambda{\lambda+\mu}.
$$

##### 本番答案

$$
S\sim\operatorname{Poisson}(\lambda+\mu).
$$

また

$$
P(X=k,S=n)
=e^{-(\lambda+\mu)}
\frac{\lambda^k\mu^{n-k}}{k!(n-k)!}.
$$

したがって

$$
P(X=k\mid S=n)
=\binom nk
\left(\frac\lambda{\lambda+\mu}\right)^k
\left(\frac\mu{\lambda+\mu}\right)^{n-k},
$$

よって

$$
X\mid(S=n)
\sim\operatorname{Bin}
\left(n,\frac\lambda{\lambda+\mu}\right),
$$

$$
E[X\mid S=n]=n\frac\lambda{\lambda+\mu}.
$$

##### 採点基準

- ポアソン再生性: 4点
- 同時確率: 5点
- 条件付き確率の分子・分母: 8点
- 二項分布の同定: 4点
- 条件付き平均: 4点

<!-- solution-end -->

### P3-C04 多項分布の集約

- level: C
- minutes: 25
- topics: 多項分布、共分散
- calculation_load: medium

$n\in\mathbb N$ とし、$p_1>0$, $p_2>0$, $p_3\geq0$, $p_1+p_2+p_3=1$ とする。1回の試行がカテゴリ $i$ に入る確率を $p_i$ とし、この試行を独立に $n$ 回行う。カテゴリ $i$ の度数を $X_i$、$\boldsymbol X=(X_1,X_2,X_3)$ とする。このとき

$$
\boldsymbol X\sim\operatorname{Multinomial}(n;p_1,p_2,p_3).
$$

1. 各周辺分布を示せ。
2. $X_1+X_2$ の分布を示せ。
3. $\operatorname{Var}(X_1+X_2)$ を共分散公式で求めよ。
4. 二項分布の公式と一致することを確認せよ。
5. $\operatorname{Cov}(X_1,X_2)<0$ の直観を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) カテゴリ $i$ に入るか否かだけを見れば、各試行は成功確率 $p_i$ のベルヌーイ試行です。したがって

$$
X_i\sim\operatorname{Bin}(n,p_i).
$$

(2) カテゴリ1または2に入る確率は $p_1+p_2$ なので

$$
X_1+X_2\sim\operatorname{Bin}(n,p_1+p_2).
$$

(3) 多項分布の分散・共分散から

$$
\begin{aligned}
\operatorname{Var}(X_1+X_2)
&=\operatorname{Var}(X_1)+\operatorname{Var}(X_2)
+2\operatorname{Cov}(X_1,X_2)\\
&=np_1(1-p_1)+np_2(1-p_2)-2np_1p_2\\
&=n\{p_1+p_2-(p_1+p_2)^2\}\\
&=n(p_1+p_2)\{1-(p_1+p_2)\}.
\end{aligned}
$$

(4) これは二項分布 $\operatorname{Bin}(n,p_1+p_2)$ の分散と一致します。

(5) 1回の試行がカテゴリ1に入れば、その同じ試行はカテゴリ2には入れません。総試行回数も $n$ に固定されているため、一方の度数が増えると他方に使える回数が減り、共分散は負になります。

##### 本番答案

$$
X_i\sim\operatorname{Bin}(n,p_i),
\qquad
X_1+X_2\sim\operatorname{Bin}(n,p_1+p_2).
$$

また

$$
\begin{aligned}
\operatorname{Var}(X_1+X_2)
&=np_1(1-p_1)+np_2(1-p_2)-2np_1p_2\\
&=n(p_1+p_2)\{1-(p_1+p_2)\}.
\end{aligned}
$$

これは集約後の二項分布の分散と一致する。同一試行でカテゴリ1と2は排他的なので $\operatorname{Cov}(X_1,X_2)=-np_1p_2<0$。

##### 採点基準

- 周辺分布: 4点
- 集約分布: 5点
- 共分散を含む分散展開: 8点
- 二項分布との一致: 3点
- 負の共分散の説明: 5点

<!-- solution-end -->

### P3-C05 分布選択総合

- level: C
- minutes: 25
- topics: 離散分布の選択
- calculation_load: medium

次の各変数について分布名・パラメータ・台・平均を示せ。

1. 成功確率0.1の独立試行20回の成功数。
2. 50個中成功10個から非復元で8個選ぶ成功数。
3. 成功確率0.2で初成功までの回数。
4. 長さ $t$ の区間の発生件数が $\operatorname{Poisson}(\lambda t)$ に従うポアソン過程について、平均3件となる指定区間内の発生件数。
5. 10回の独立試行を確率 $(0.2,0.3,0.5)$ の三分類へ分けた度数。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 固定20回の独立試行の成功数なので
   $$
   X\sim\operatorname{Bin}(20,0.1),
   \quad X=0,1,\ldots,20,
   \quad E[X]=2.
   $$
2. 有限母集団から非復元で8個抽出するので
   $$
   X\sim\operatorname{Hypergeom}(50,10,8).
   $$
   台は
   $$
   \max(0,8-50+10)=0,
   \qquad \min(8,10)=8
   $$
   より $0,1,\ldots,8$、平均は
   $$
   E[X]=8\frac{10}{50}=1.6.
   $$
3. 初成功までの試行回数なので
   $$
   X\sim\operatorname{Geom}(0.2),
   \quad X=1,2,\ldots,
   \quad E[X]=5.
   $$
4. 指定区間の平均件数が3なので
   $$
   X\sim\operatorname{Poisson}(3),
   \quad X\in\mathbb N_0,
   \quad E[X]=3.
   $$
5. 10回を三カテゴリへ分類するので
   $$
   (X_1,X_2,X_3)
   \sim\operatorname{Multinomial}(10;0.2,0.3,0.5).
   $$
   台は $x_i\in\mathbb N_0$, $x_1+x_2+x_3=10$、平均ベクトルは
   $$
   E[\boldsymbol X]=(2,3,5).
   $$

##### 本番答案

1. $\operatorname{Bin}(20,0.1)$、台 $0,\ldots,20$、平均2。
2. $\operatorname{Hypergeom}(50,10,8)$、台 $0,\ldots,8$、平均1.6。
3. $\operatorname{Geom}(0.2)$、台 $1,2,\ldots$、平均5。
4. $\operatorname{Poisson}(3)$、台 $\mathbb N_0$、平均3。
5. $\operatorname{Multinomial}(10;0.2,0.3,0.5)$、台 $x_i\geq0$, $\sum_i x_i=10$、平均ベクトル $(2,3,5)$。

##### 採点基準

各小問5点。分布名だけでなく、パラメータ・台・平均までを1組として採点する。

<!-- solution-end -->

## Level D：発展

### P3-D01 ポアソン分布の間引き

- level: D
- minutes: 40
- topics: ポアソン分布、二項分布、独立
- calculation_load: high

$\lambda>0$, $0<p<1$ とする。$N\sim\operatorname{Poisson}(\lambda)$ とし、各件を独立に確率 $p$ でA、確率 $q=1-p$ でBへ分類する。A,Bの件数を $X,Y$ とする。$X\sim\operatorname{Poisson}(\lambda p)$、$Y\sim\operatorname{Poisson}(\lambda q)$、かつ $X,Y$ が独立であることを同時確率質量関数から証明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$X=x,Y=y$ なら総件数は $N=x+y$ です。総件数が $x+y$ と分かった後は、その各件が確率 $p$ でAへ入るので

$$
X\mid(N=x+y)\sim\operatorname{Bin}(x+y,p).
$$

したがって $x,y\in\mathbb N_0$ について

$$
\begin{aligned}
P(X=x,Y=y)
&=P(N=x+y)P(X=x\mid N=x+y)\\
&=e^{-\lambda}\frac{\lambda^{x+y}}{(x+y)!}
\binom{x+y}{x}p^xq^y.
\end{aligned}
$$

ここで

$$
\binom{x+y}{x}
=\frac{(x+y)!}{x!y!}
$$

を代入すると

$$
\begin{aligned}
P(X=x,Y=y)
&=e^{-\lambda}\frac{\lambda^{x+y}p^xq^y}{x!y!}\\
&=e^{-\lambda}\frac{(\lambda p)^x(\lambda q)^y}{x!y!}.
\end{aligned}
$$

さらに $p+q=1$ なので

$$
e^{-\lambda}=e^{-\lambda(p+q)}=e^{-\lambda p}e^{-\lambda q}.
$$

よって

$$
P(X=x,Y=y)
=\left\{e^{-\lambda p}\frac{(\lambda p)^x}{x!}\right\}
\left\{e^{-\lambda q}\frac{(\lambda q)^y}{y!}\right\}.
$$

第1括弧はポアソン分布 $\operatorname{Poisson}(\lambda p)$ の確率質量関数、第2括弧は $\operatorname{Poisson}(\lambda q)$ の確率質量関数です。したがって

$$
X\sim\operatorname{Poisson}(\lambda p),
\qquad
Y\sim\operatorname{Poisson}(\lambda q),
$$

かつ同時確率質量関数が周辺確率質量関数の積に分解されるため $X,Y$ は独立です。

##### 本番答案

$N=x+y$ の下で

$$
X\mid(N=x+y)\sim\operatorname{Bin}(x+y,p).
$$

よって

$$
\begin{aligned}
P(X=x,Y=y)
&=e^{-\lambda}\frac{\lambda^{x+y}}{(x+y)!}
\binom{x+y}{x}p^xq^y\\
&=e^{-\lambda p}\frac{(\lambda p)^x}{x!}
  e^{-\lambda q}\frac{(\lambda q)^y}{y!}.
\end{aligned}
$$

したがって $X\sim\operatorname{Poisson}(\lambda p)$、$Y\sim\operatorname{Poisson}(\lambda q)$ であり、同時確率質量関数が周辺の積なので独立である。

##### 採点基準

- 条件付き二項分布: 8点
- 同時確率の立式: 8点
- 組合せ係数の約分: 8点
- 2つのポアソン確率質量関数への因数分解: 7点
- 独立性の結論: 4点

<!-- solution-end -->

---

# 8. 30分ドリル

## P3-DRILL-01 ポアソン過程・分類・推定

- 制限時間: 30分
- level: C

到着は1時間当たり未知の率 $\lambda>0$ の斉時ポアソン過程に従う。長さ $t$ の区間の到着数 $N(t)$ は

$$
P\{N(t)=k\}
=e^{-\lambda t}\frac{(\lambda t)^k}{k!},
\qquad k=0,1,2,\ldots
$$

に従い、重ならない時間区間の到着数は独立である。各到着は、他の到着と独立に確率 $1/4$ で緊急、$3/4$ で通常へ分類される。2時間の総件数を $N$、緊急件数を $U$、通常件数を $V$ とする。

推定量 $T$ が $E[T]=\lambda$ を満たすとき $\lambda$ の不偏推定量という。また任意の $\varepsilon>0$ について $P(|T_m-\lambda|\geq\varepsilon)\to0$ となることを、$T_m$ が $\lambda$ へ確率収束するという。

任意の有限分散な確率変数 $T$ と $\varepsilon>0$ に対するチェビシェフの不等式

$$
P(|T-E[T]|\geq\varepsilon)
\leq\frac{\operatorname{Var}(T)}{\varepsilon^2}
$$

を用いてよい。

1. $N$ の分布、平均、分散と $P(N=3)$ を求めよ。（20点）
2. $N=3$ の下での $U$ の分布と $P(U=1\mid N=3)$ を求めよ。（20点）
3. $U,V$ の周辺分布を求め、独立性と共分散を示せ。（25点）
4. $\widehat\lambda=N/2$ が $\lambda$ の不偏推定量であることを示し、分散を求めよ。（20点）
5. 独立な $m$ 個の2時間区間で得た件数を $N_1,\ldots,N_m$ とし、$\widetilde\lambda=(2m)^{-1}\sum_jN_j$ とする。チェビシェフの不等式を用いて $\widetilde\lambda$ が $\lambda$ へ確率収束することを示せ。（15点）

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) 1時間当たりの平均が $\lambda$ なので、2時間の総件数は

$$
N\sim\operatorname{Poisson}(2\lambda).
$$

したがって

$$
E[N]=2\lambda,
\qquad
\operatorname{Var}(N)=2\lambda,
$$

$$
P(N=3)
=e^{-2\lambda}\frac{(2\lambda)^3}{3!}.
$$

(2) $N=3$ と分かった後は3件それぞれを独立に確率 $1/4$ で緊急へ分類するので

$$
U\mid(N=3)\sim\operatorname{Bin}(3,1/4).
$$

したがって

$$
P(U=1\mid N=3)
=\binom31\frac14\left(\frac34\right)^2
=\frac{27}{64}.
$$

(3) $u,v\in\mathbb N_0$ とすると

$$
\begin{aligned}
P(U=u,V=v)
&=P(N=u+v)P(U=u\mid N=u+v)\\
&=e^{-2\lambda}\frac{(2\lambda)^{u+v}}{(u+v)!}
\binom{u+v}{u}\left(\frac14\right)^u\left(\frac34\right)^v\\
&=e^{-\lambda/2}\frac{(\lambda/2)^u}{u!}
  e^{-3\lambda/2}\frac{(3\lambda/2)^v}{v!}.
\end{aligned}
$$

したがって

$$
U\sim\operatorname{Poisson}(\lambda/2),
\qquad
V\sim\operatorname{Poisson}(3\lambda/2)
$$

で、同時確率質量関数が周辺の積なので独立です。よって

$$
\operatorname{Cov}(U,V)=0.
$$

(4)

$$
E[\widehat\lambda]
=E\left[\frac N2\right]
=\frac12E[N]
=\lambda
$$

なので不偏です。また

$$
\operatorname{Var}(\widehat\lambda)
=\frac14\operatorname{Var}(N)
=\frac\lambda2.
$$

(5)

$$
E[\widetilde\lambda]
=\frac1{2m}\sum_{j=1}^mE[N_j]
=\lambda.
$$

独立性から

$$
\begin{aligned}
\operatorname{Var}(\widetilde\lambda)
&=\frac1{4m^2}
\sum_{j=1}^m\operatorname{Var}(N_j)\\
&=\frac1{4m^2}\cdot m\cdot2\lambda\\
&=\frac\lambda{2m}.
\end{aligned}
$$

チェビシェフの不等式より

$$
P(|\widetilde\lambda-\lambda|\geq\varepsilon)
\leq
\frac{\lambda}{2m\varepsilon^2}
\longrightarrow0.
$$

したがって $\widetilde\lambda$ は $\lambda$ へ確率収束します。

##### 本番答案

$$
N\sim\operatorname{Poisson}(2\lambda),
\quad
E[N]=\operatorname{Var}(N)=2\lambda,
$$

$$
P(N=3)=e^{-2\lambda}\frac{(2\lambda)^3}{3!}.
$$

また

$$
U\mid(N=3)\sim\operatorname{Bin}(3,1/4),
\quad
P(U=1\mid N=3)=\frac{27}{64}.
$$

同時確率質量関数の因数分解から

$$
U\sim\operatorname{Poisson}(\lambda/2),
\qquad
V\sim\operatorname{Poisson}(3\lambda/2)
$$

で独立、したがって共分散0。

さらに

$$
E[N/2]=\lambda,
\qquad
\operatorname{Var}(N/2)=\lambda/2.
$$

$m$ 区間の推定量は平均 $\lambda$、分散 $\lambda/(2m)$ なので

$$
P(|\widetilde\lambda-\lambda|\geq\varepsilon)
\leq\frac{\lambda}{2m\varepsilon^2}\to0.
$$

##### 採点基準

- 総件数: 20点
- 条件付き二項分布: 20点
- 間引き・独立性: 25点
- 不偏性と分散: 20点
- チェビシェフの不等式による確率収束: 15点

<!-- solution-end -->

---

# 9. 実過去問演習との接続

問題文は転載せず、公式問題集の年度・科目・大問番号で参照します。

### MATH-2023-Q1

- 入手先: 統計検定公式問題集［2022〜2024年］
- 現在解く範囲: ポアソン分布の確率質量関数、平均・分散、独立和。
- 後続章で再挑戦: 不偏性、一致性。
- 答案確認: 分布同定で終えず、統計量の期待値と分散を推定対象へ結び付ける。

### MATH-2022-Q3

- 入手先: 統計検定公式問題集［2022〜2024年］
- 現在解く範囲: 条件付きポアソン分布のモーメント、周辺化。
- 後続章で再挑戦: ポアソン・ガンマ混合から負の二項分布、事後ガンマ分布。
- 答案確認: 条件付き期待値と全分散で平均・過分散を別経路から検算する。

---

# 10. 最終チェック

次を説明なしで公式だけ書くのではなく、1〜3行の導出付きで再現できるか確認します。

- 二項分布の $\binom nkp^kq^{n-k}$ はなぜ出るか。
- 超幾何分布の分母が $\binom Nn$ なのはなぜか。
- 超幾何分布の分散に $(N-n)/(N-1)$ が付くのはなぜか。
- 幾何分布の $q^{k-1}p$ はどの事象を表すか。
- 負の二項分布で $\binom{k-1}{r-1}$ になるのはなぜか。
- ポアソン分布の確率母関数を指数級数から導けるか。
- 多項分布で異なるカテゴリの共分散が負になるのはなぜか。
- 独立ポアソン和を固定すると条件付き二項分布になることを、条件付き確率の比から導けるか。
- ポアソン分布の間引きで独立性まで同時確率質量関数から示せるか。
