# Standard 15 二項2母数モーメント法・識別

- 旧No.: 50
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立同分布で

$$
X_i\sim\operatorname{Binomial}(m,p)
$$

に従う。すなわち

$$
P(X_i=x)=\binom mxp^x(1-p)^{m-x},
\qquad x=0,1,\ldots,m,
$$

であり、試行回数 $m\in\{1,2,\ldots\}$ と成功確率 $0<p<1$ をともに未知とする。標本平均を $\bar X$、分母 $n$ の標本分散を

$$
s_n^2=\frac1n\sum_{i=1}^n(X_i-\bar X)^2
$$

とする。

1. 二項分布の母平均・母分散を確認し、それらから $m,p$ を表せ。
2. モーメント推定量を求めよ。
3. 識別に必要な条件を述べよ。
4. $m$ が整数母数であることへの実務上の扱いを述べよ。

## 詳細解答

### 1. 母平均・母分散から $m,p$ を解く

まず二項分布の平均・分散を既知公式として置かず、Bernoulli 試行の和から確認する。1つの $X$ について

$$
X=Y_1+\cdots+Y_m,
$$

ただし $Y_j\overset{iid}\sim\operatorname{Bernoulli}(p)$ と書ける。

Bernoulli 変数では $Y_j^2=Y_j$ なので

$$
E[Y_j]=p,
$$

$$
\operatorname{Var}(Y_j)
=E[Y_j^2]-E[Y_j]^2
=p-p^2
=p(1-p).
$$

従って期待値の線形性と独立性から

$$
\boxed{E[X]=mp},
$$

$$
\boxed{\operatorname{Var}(X)=mp(1-p)}.
$$

ここで

$$
\mu=E[X],
\qquad
v=\operatorname{Var}(X)
$$

と置くと

$$
\mu=mp,
\qquad
v=mp(1-p).
$$

第2式へ $mp=\mu$ を代入して

$$
v=\mu(1-p).
$$

$\mu>0$ の下で

$$
\frac v\mu=1-p,
$$

従って

$$
\boxed{p=1-\frac v\mu}.
$$

さらに

$$
m=\frac\mu p
$$

へ代入して

$$
\boxed{m=\frac{\mu^2}{\mu-v}}.
$$

したがって、母平均と母分散が分かれば適切な範囲で2母数を逆算できる。

### 2. モーメント推定量

モーメント法では母モーメントを対応する標本モーメントで置き換える。本問では

$$
\mu\longrightarrow\bar X,
\qquad
v\longrightarrow s_n^2.
$$

第1問の逆変換へ代入して

$$
\boxed{
\widetilde p
=1-\frac{s_n^2}{\bar X}
},
$$

$$
\boxed{
\widetilde m
=\frac{\bar X^2}{\bar X-s_n^2}
}.
$$

ここで $s_n^2$ の分母が $n$ なのは、モーメント法では母二次モーメントに対応する経験モーメントを使うのが自然だからである。不偏標本分散を使うことが目的ではない。

### 3. 識別に必要な条件

真の母数が $m>0$, $0<p<1$ なら

$$
\mu=mp>0
$$

であり、

$$
v=\mu(1-p)
$$

だから

$$
0<v<\mu.
$$

従って必要な内部条件は

$$
\boxed{\mu>0,\qquad0<v<\mu}.
$$

逆にこの条件があれば

$$
0<1-\frac v\mu<1
$$

なので $0<p<1$ となり、

$$
m=\frac{\mu^2}{\mu-v}>0
$$

も一意に定まる。したがって実数母数として見れば、この範囲で2つの母モーメントから $(m,p)$ を識別できる。

標本版では

$$
\bar X>0,
\qquad
0<s_n^2<\bar X
$$

なら

$$
0<\widetilde p<1,
\qquad
\widetilde m>0
$$

となる。しかし有限標本ではこの条件を外れることがあり、そのとき単純なモーメント推定量は母数空間外へ出る。

### 4. 整数母数 $m$ の扱い

第2問の

$$
\widetilde m
=\frac{\bar X^2}{\bar X-s_n^2}
$$

はモーメント方程式を実数上で解いた値なので、一般には整数にならない。

しかし本来 $m$ は試行回数であり正整数である。整数制約を厳密に扱うなら、例えば $\widetilde m$ の近傍の正整数を候補にして、各候補 $m$ に対する $p$ の推定値と尤度を比較するなど、離散母数を考慮した推定を行う。

単純に $\widetilde m$ を四捨五入する方法は簡便だが、モーメント法から厳密に導かれた整数制約付き推定量ではない。

なお識別についても、実数上の逆変換が一意であることと「真の $m$ が整数であること」は区別して考える必要がある。

## 本番答案

$X=\sum_{j=1}^mY_j$, $Y_j\overset{iid}\sim\operatorname{Bernoulli}(p)$ と書けば

$$
E[X]=mp,
\qquad
\operatorname{Var}(X)=mp(1-p).
$$

従って

$$
\mu=mp,
\qquad
v=\mu(1-p),
$$

より

$$
p=1-\frac v\mu,
\qquad
m=\frac{\mu^2}{\mu-v}.
$$

母モーメントを標本モーメントで置換して

$$
\boxed{
\widetilde p=1-\frac{s_n^2}{\bar X}
},
\qquad
\boxed{
\widetilde m=\frac{\bar X^2}{\bar X-s_n^2}
}.
$$

識別には

$$
\mu>0,
\qquad
0<v<\mu
$$

が必要で、標本版では $\bar X>0$, $0<s_n^2<\bar X$ が自然な内部条件となる。$m$ は本来整数なので、厳密には近傍整数を候補として尤度比較などを行い、単純な丸めとは区別する。

## 採点基準

- Bernoulli 和から二項平均・分散を導出: 4点
- 母モーメント方程式から $p,m$ を逆算: 5点
- モーメント推定量: 4点
- 識別条件とその意味: 4点
- 整数制約の扱い: 3点
