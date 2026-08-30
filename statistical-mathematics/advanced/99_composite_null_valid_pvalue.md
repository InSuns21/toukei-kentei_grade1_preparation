# Advanced 19 複合帰無・妥当なP値

- 旧No.: 99
- 層: Advanced
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

帰無仮説が複合仮説

$$
H_0:\theta\in\Theta_0
$$

で、統計量 $T$ は大きいほど対立仮説寄りとする。

この問題では、確率変数 $p(X)\in[0,1]$ が帰無仮説の下で **妥当なP値**であるとは、任意の $u\in[0,1]$ に対して

$$
\boxed{
\sup_{\theta\in\Theta_0}
P_\theta\{p(X)\le u\}
\le u
}
$$

を満たすことと定義する。つまり、どの帰無母数が真でも「$p\le\alpha$ なら棄却」という規則の第一種過誤確率が $\alpha$ を超えないことを意味する。

また、確率変数 $U\in[0,1]$ が

$$
P(U\le u)\le u
\qquad(0\le u\le1)
$$

を満たすとき、$U$ は一様分布より0側に偏りにくいという意味で **super-uniform** であるという。

1. 固定した帰無母数 $\theta$ に対する上側tail P値から、複合帰無に対する妥当なP値の基本形を与えよ。
2. そのP値が帰無仮説の全ての $\theta$ で有意水準を制御する理由を、連続・離散の場合を区別して説明せよ。
3. $X\sim N(\theta,1)$, $H_0:\theta\le0$, $H_1:\theta>0$, $T=X$ のP値を求めよ。
4. 帰無母数をデータ依存の推定値で置き換える方法が一般に危険な理由を述べよ。

## 詳細解答

### 1. 固定母数のP値から複合帰無のP値を作る

まず $\theta\in\Theta_0$ を1つ固定する。

観測データを $x$ とし、それと独立に同じ $P_\theta$ に従う仮想的な標本を $X'$ とする。$T$ は大きいほど対立仮説寄りなので、固定した $\theta$ に対する上側tail P値を

$$
\boxed{
p_\theta(x)
=P_\theta\{T(X')\ge T(x)\}
}
$$

と定める。

複合帰無では、真の $\theta$ が $\Theta_0$ のどこにあるか分からない。そこで帰無集合内で最も大きいtail確率を採用する。

$$
\boxed{
p(x)
=\sup_{\theta\in\Theta_0}p_\theta(x)
=\sup_{\theta\in\Theta_0}
P_\theta\{T(X')\ge T(x)\}
}.
$$

これは「観測結果を最も帰無仮説寄りに評価する帰無母数」を採用する保守的な構成である。

### 2. なぜこれで全ての帰無母数に対して有意水準を制御できるのか

任意の真の帰無母数

$$
\theta_0\in\Theta_0
$$

を1つ固定する。

supremum の定義から各標本 $x$ について

$$
\boxed{p(x)\ge p_{\theta_0}(x)}.
$$

従って

$$
\{p(X)\le u\}
\subseteq
\{p_{\theta_0}(X)\le u\}.
$$

よって

$$
P_{\theta_0}\{p(X)\le u\}
\le
P_{\theta_0}\{p_{\theta_0}(X)\le u\}.
$$

残る仕事は、固定した $\theta_0$ に対する通常のtail P値 $p_{\theta_0}(X)$ が一様分布、または少なくともsuper-uniformになることを確認することである。

#### 連続分布の場合

$T$ の $\theta_0$ 下の累積分布関数を

$$
F_{\theta_0}(t)
=P_{\theta_0}\{T\le t\}
$$

とする。$T$ の分布が連続なら

$$
P_{\theta_0}(T'\ge t)
=1-F_{\theta_0}(t),
$$

したがって

$$
p_{\theta_0}(X)
=1-F_{\theta_0}\{T(X)\}.
$$

確率積分変換により

$$
F_{\theta_0}\{T(X)\}
\sim U(0,1),
$$

従って

$$
\boxed{
p_{\theta_0}(X)\sim U(0,1)}.
$$

よって

$$
P_{\theta_0}\{p(X)\le u\}
\le u.
$$

#### 離散分布の場合

離散分布ではtail確率が飛び飛びの値しか取らないため、$p_{\theta_0}(X)$ は一般に一様分布にはならない。しかし通常のtail P値はsuper-uniformになる。

直感を有限個の値を取る $T$ で確認する。$T$ の取り得る値を

$$
t_1<t_2<\cdots<t_m
$$

とし、上側tail確率を

$$
q_j=P_{\theta_0}(T\ge t_j)
$$

と置く。$j$ が大きいほど $q_j$ は小さくなる。

ある $u$ に対して $q_j\le u$ となる最初の添字を $j_*$ とすれば、

$$
\{p_{\theta_0}(X)\le u\}
=\{T\ge t_{j_*}\}.
$$

従って

$$
P_{\theta_0}\{p_{\theta_0}(X)\le u\}
=P_{\theta_0}(T\ge t_{j_*})
=q_{j_*}
\le u.
$$

つまり

$$
\boxed{
p_{\theta_0}(X)\text{ はsuper-uniform}}
$$

である。

連続・離散のどちらでも

$$
P_{\theta_0}\{p_{\theta_0}(X)\le u\}
\le u
$$

なので、先ほどの包含関係と合わせて

$$
\boxed{
P_{\theta_0}\{p(X)\le u\}
\le u
}.
$$

これは任意の $\theta_0\in\Theta_0$ に対して成り立つ。従って問題文の定義どおり、$p(X)$ は複合帰無全体に対して妥当なP値である。

### 3. 正規分布の片側複合帰無

$$
X\sim N(\theta,1),
\qquad
H_0:\theta\le0,
\qquad
H_1:\theta>0
$$

とする。

固定した観測値 $x$ に対して

$$
\begin{aligned}
p_\theta(x)
&=P_\theta(X'\ge x)\\
&=P\{X'-\theta\ge x-\theta\}\\
&=1-\Phi(x-\theta).
\end{aligned}
$$

$\Phi$ は単調増加なので、$1-\Phi(x-\theta)$ は $\theta$ が大きいほど大きい。

帰無集合は $\theta\le0$ だから supremum は境界 $\theta=0$ で達成される。

$$
\boxed{
p(x)=1-\Phi(x)}.
$$

境界 $\theta=0$ では $X$ は連続分布なので

$$
p(X)=1-\Phi(X)\sim U(0,1).
$$

一方 $\theta<0$ ではこのP値はより大きくなりやすく、保守的になる。

### 4. データ依存の母数代入が危険な理由

例えばデータから帰無集合内の推定値 $\widehat\theta_0(X)$ を選び

$$
p_{\mathrm{plug}}(x)
=P_{\widehat\theta_0(x)}\{T(X')\ge T(x)\}
$$

とする方法を考える。

各固定標本 $x$ について

$$
p_{\mathrm{plug}}(x)
\le
\sup_{\theta\in\Theta_0}
p_\theta(x)
=p(x)
$$

ではある。しかし、**小さいP値になること自体は妥当性の保証ではない**。

妥当性を示すには、真の任意の $\theta_0$ について

$$
P_{\theta_0}\{p_{\mathrm{plug}}(X)\le u\}
\le u
$$

を証明する必要がある。ところが $\widehat\theta_0(X)$ は同じデータ $X$ から選ばれているため、固定した $\theta$ に対するtail P値のsuper-uniform性をそのまま適用できない。

supremum を取る構成では

$$
p(X)\ge p_{\theta_0}(X)
$$

が真の $\theta_0$ に対して必ず成立したが、一般のデータ依存代入ではこの大小関係が保証されない。従って第一種過誤確率が $\alpha$ を超える可能性があり、別途理論的な正当化が必要である。

## 本番答案

固定した $\theta\in\Theta_0$ に対して

$$
p_\theta(x)
=P_\theta\{T(X')\ge T(x)\}
$$

と置き、

$$
\boxed{
p(x)=\sup_{\theta\in\Theta_0}p_\theta(x)
}
$$

とする。

真の任意の $\theta_0\in\Theta_0$ について

$$
p(x)\ge p_{\theta_0}(x)
$$

だから

$$
\{p(X)\le u\}
\subseteq
\{p_{\theta_0}(X)\le u\}.
$$

連続分布なら確率積分変換から $p_{\theta_0}(X)\sim U(0,1)$、離散分布ならtail P値はsuper-uniformなので

$$
P_{\theta_0}\{p(X)\le u\}
\le u.
$$

従って $p$ は複合帰無全体で妥当である。

$X\sim N(\theta,1)$, $\theta\le0$ では

$$
p_\theta(x)=1-\Phi(x-\theta)
$$

が $\theta$ とともに増えるため supremum は $\theta=0$ で達成され、

$$
\boxed{p(x)=1-\Phi(x)}.
$$

一方、データ依存の推定値を代入したP値では、真の $\theta_0$ に対するtail P値以上になる保証がなく、super-uniform性を別途証明しない限り有意水準は保証されない。

## 採点基準

- 妥当なP値・super-uniformの定義: 4点
- supremum P値の構成: 4点
- 連続・離散の場合の妥当性証明: 6点
- 正規例: 4点
- データ依存代入の危険性: 2点
