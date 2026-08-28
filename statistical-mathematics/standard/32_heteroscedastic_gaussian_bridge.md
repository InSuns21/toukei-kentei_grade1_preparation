# Standard 12 独立正規変数の総和を固定する条件付き分布（Gaussian bridge 型）

- 旧No.: 32
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## この問題でいう「Gaussian bridge」とは

この問題で使う **Gaussian bridge** という語は、新しい確率分布の名前として覚える必要はない。
本質は、**同時正規なベクトルに線形条件を課したときの条件付き分布**である。

たとえば独立な正規変数

$$
X_1,\ldots,X_n
$$

について、総和

$$
T=X_1+\cdots+X_n
$$

を観測して $T=t$ と固定すると、各 $X_i$ はもはや独立ではない。総和が決まっているので、ある成分が大きくなれば他の成分がその分だけ小さくなる必要があり、条件付きでは負の相関が生じる。

このように、**Gaussian な対象を端点や線形制約で条件付けする構成**を bridge 型と呼ぶことがある。代表例は Brownian motion を終点で条件付けて得られる Brownian bridge である。

ただし、本問で必要なのは「Gaussian bridge の公式」を暗記することではない。以下ではすべて

1. 正規分布の線形変換は再び正規分布になる
2. 多変量正規分布の条件付き分布公式

の2点から導出する。

> **用語上の注意**  
> 「Gaussian bridge」はこの有限次元の設定に対する統計検定1級の標準用語とは限らない。本問では「独立正規変数の総和を固定した条件付き分布」と読めばよい。

## 問題

独立に

$$
X_i\sim N(\mu_i,\sigma_i^2),\qquad i=1,\ldots,n
$$

とし、

$$
T=\sum_{i=1}^nX_i
$$

とする。また

$$
M=\sum_{i=1}^n\mu_i,
\qquad
V=\sum_{i=1}^n\sigma_i^2
$$

と置く。

1. $X_i\mid T=t$ の平均と分散を求めよ。
2. $i\ne j$ の条件付き共分散 $\operatorname{Cov}(X_i,X_j\mid T)$ を求めよ。
3. すべて $\sigma_i^2=\sigma^2$ の場合に、

   $$
   E[X_i\mid T=t]=\mu_i+\frac{t-M}{n},
   $$

   $$
   \operatorname{Var}(X_i\mid T)
   =\sigma^2\left(1-\frac1n\right),
   $$

   $$
   \operatorname{Cov}(X_i,X_j\mid T)
   =-\frac{\sigma^2}{n}
   \qquad(i\ne j)
   $$

   となることを確認せよ。

この等分散の場合が、有限次元で最も基本的な Gaussian bridge 型の構造である。

## 詳細解答

### 0. なぜ条件付き正規分布の公式が使えるのか

まずここを飛ばさない。

$X_1,\ldots,X_n$ は独立な正規変数なので、ベクトル

$$
\mathbf X=(X_1,\ldots,X_n)^T
$$

は多変量正規分布に従う。

さらに

$$
T=\mathbf 1^T\mathbf X
$$

は $\mathbf X$ の線形結合である。多変量正規ベクトルの任意の線形変換は再び多変量正規だから、

$$
(X_i,T)
$$

も2変量正規であり、

$$
(X_i,X_j,T)
$$

も3変量正規である。

したがって、以下では多変量正規分布の条件付き平均・条件付き共分散の公式を使える。

### 1. $X_i\mid T=t$ の平均と分散

独立性から $r\ne i$ では

$$
\operatorname{Cov}(X_i,X_r)=0.
$$

従って

$$
\begin{aligned}
\operatorname{Cov}(X_i,T)
&=\operatorname{Cov}\left(X_i,\sum_{r=1}^nX_r\right)\\
&=\operatorname{Var}(X_i)+\sum_{r\ne i}\operatorname{Cov}(X_i,X_r)\\
&=\sigma_i^2.
\end{aligned}
$$

また独立性から和の分散は加法的なので

$$
\operatorname{Var}(T)
=\sum_{r=1}^n\sigma_r^2
=V.
$$

さらに

$$
E[T]=\sum_{r=1}^n\mu_r=M.
$$

$V>0$ とする。

2変量正規分布の条件付き平均公式

$$
E[X\mid Y=y]
=E[X]
+\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)}
\{y-E[Y]\}
$$

を使うと、

$$
\begin{aligned}
E[X_i\mid T=t]
&=\mu_i
+\frac{\operatorname{Cov}(X_i,T)}{\operatorname{Var}(T)}(t-M)\\
&=\boxed{
\mu_i+\frac{\sigma_i^2}{V}(t-M)
}.
\end{aligned}
$$

ここで

$$
\frac{\sigma_i^2}{V}
$$

は、総和 $T$ が平均 $M$ からずれた量 $t-M$ を各成分へ配分する重みである。分散の大きい成分ほど、総和のずれを多く引き受ける。

次に条件付き分散公式

$$
\operatorname{Var}(X\mid Y)
=\operatorname{Var}(X)
-\frac{\operatorname{Cov}(X,Y)^2}{\operatorname{Var}(Y)}
$$

より

$$
\begin{aligned}
\operatorname{Var}(X_i\mid T)
&=\operatorname{Var}(X_i)
-\frac{\operatorname{Cov}(X_i,T)^2}{\operatorname{Var}(T)}\\
&=\boxed{
\sigma_i^2-\frac{\sigma_i^4}{V}
}.
\end{aligned}
$$

総和 $T$ を知る前よりも不確実性が減るので、条件付き分散は元の $\sigma_i^2$ より小さくなる。

### 2. $i\ne j$ の条件付き共分散

$(X_i,X_j,T)$ は同時正規である。

多変量正規分布の条件付き共分散公式から

$$
\begin{aligned}
\operatorname{Cov}(X_i,X_j\mid T)
&=\operatorname{Cov}(X_i,X_j)\\
&\quad-
\operatorname{Cov}(X_i,T)
\operatorname{Var}(T)^{-1}
\operatorname{Cov}(T,X_j).
\end{aligned}
$$

$i\ne j$ では独立性から

$$
\operatorname{Cov}(X_i,X_j)=0,
$$

また

$$
\operatorname{Cov}(X_i,T)=\sigma_i^2,
\qquad
\operatorname{Cov}(T,X_j)=\sigma_j^2.
$$

従って

$$
\boxed{
\operatorname{Cov}(X_i,X_j\mid T)
=-\frac{\sigma_i^2\sigma_j^2}{V}
}.
$$

条件を付ける前には $X_i$ と $X_j$ は独立だったが、$T=t$ と総和を固定すると独立ではなくなる。

直感的には、$X_i$ が条件付き平均より上に出れば、総和を $t$ に保つために $X_j$ を含む他の成分は全体として下がらなければならない。そのため条件付き共分散は負になる。

### 3. 等分散の場合

すべて

$$
\sigma_i^2=\sigma^2
$$

なら

$$
V=n\sigma^2,
\qquad
\frac{\sigma_i^2}{V}=\frac1n.
$$

したがって条件付き平均は

$$
\boxed{
E[X_i\mid T=t]
=\mu_i+\frac{t-M}{n}
}.
$$

条件付き分散は

$$
\begin{aligned}
\operatorname{Var}(X_i\mid T)
&=\sigma^2-\frac{\sigma^4}{n\sigma^2}\\
&=\boxed{
\sigma^2\left(1-\frac1n\right)
}.
\end{aligned}
$$

$i\ne j$ の条件付き共分散は

$$
\begin{aligned}
\operatorname{Cov}(X_i,X_j\mid T)
&=-\frac{\sigma^4}{n\sigma^2}\\
&=\boxed{-\frac{\sigma^2}{n}}.
\end{aligned}
$$

特に全ての平均も等しく

$$
\mu_i=\mu
$$

なら $M=n\mu$ なので

$$
E[X_i\mid T=t]
=\mu+\frac{t-n\mu}{n}
=\frac tn.
$$

つまり、総和を $t$ に固定したとき、対称性から各成分の条件付き平均は $t/n$ になる。

これがこの問題で「Gaussian bridge 型」と呼んでいる構造である。重要なのは名称ではなく、**正規ベクトルを線形条件で条件付けすると、平均が線形補正され、共分散から制約方向の成分が差し引かれる**という点である。

## もう一段一般化すると

本問は多変量正規分布

$$
\mathbf X\sim N(\boldsymbol\mu,\Sigma)
$$

に対し、1本の線形制約

$$
a^T\mathbf X=t
$$

を課す場合の特殊例である。

このとき

$$
E[\mathbf X\mid a^T\mathbf X=t]
=
\boldsymbol\mu
+
\Sigma a(a^T\Sigma a)^{-1}
(t-a^T\boldsymbol\mu),
$$

$$
\operatorname{Cov}(\mathbf X\mid a^T\mathbf X=t)
=
\Sigma
-
\Sigma a(a^T\Sigma a)^{-1}a^T\Sigma.
$$

本問では

$$
a=\mathbf 1,
\qquad
\Sigma=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)
$$

と置けば、上で求めた式がそのまま得られる。

統計検定1級では「Gaussian bridge」という名称そのものより、この**多変量正規分布の条件付き分布公式を線形制約へ適用できるか**が本筋である。

## 本番答案

独立正規ベクトルの線形変換なので $(X_i,T)$ は同時正規である。独立性から

$$
E[T]=M,
\qquad
\operatorname{Cov}(X_i,T)=\sigma_i^2,
\qquad
\operatorname{Var}(T)=V.
$$

従って条件付き正規分布の公式から

$$
E[X_i\mid T=t]
=\mu_i+\frac{\sigma_i^2}{V}(t-M),
$$

$$
\operatorname{Var}(X_i\mid T)
=\sigma_i^2-\frac{\sigma_i^4}{V}.
$$

また $i\ne j$ では

$$
\operatorname{Cov}(X_i,X_j\mid T)
=0-\frac{\sigma_i^2\sigma_j^2}{V}.
$$

等分散なら $V=n\sigma^2$ より

$$
E[X_i\mid T=t]
=\mu_i+\frac{t-M}{n},
$$

$$
\operatorname{Var}(X_i\mid T)
=\sigma^2\left(1-\frac1n\right),
$$

$$
\operatorname{Cov}(X_i,X_j\mid T)
=-\frac{\sigma^2}{n}.
$$

## 採点基準

- 同時正規性と $E[T],\operatorname{Var}(T),\operatorname{Cov}(X_i,T)$ の確認: 5点
- 条件付き平均・分散: 7点
- 条件付き共分散: 5点
- 等分散への帰着と意味の説明: 3点
