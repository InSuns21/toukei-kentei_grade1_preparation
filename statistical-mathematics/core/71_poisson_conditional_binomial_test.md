# Core 21 2標本Poisson率を条件付き二項検定へ

- 旧No.: 71
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（小さい尾確率）

## 問題

$\lambda>0,\mu>0$ とし、相互に独立に

$$
X_i\sim\operatorname{Poisson}(\lambda),\quad i=1,\ldots,n,
$$

$$
Y_j\sim\operatorname{Poisson}(\mu),\quad j=1,\ldots,m
$$

とする。$S=\sum X_i,T=\sum Y_j,K=S+T$とおく。

1. $S,T$の分布を求めよ。
2. $H_0:\lambda=\mu$の下で$S\mid K=k$の分布を求めよ。
3. $H_1:\lambda>\mu$に対する正確検定のP値を表せ。
4. $n=m$、$k=10$、観測$s=8$のときP値を手計算せよ。

## 詳細解答

### 1. Poissonの再生性

使うのは **独立Poisson変数の加法性**である。独立なPoisson$(\alpha_r)$ の和はポアソン$(\sum\alpha_r)$ に従う。この結果の条件は各変数がPoissonで相互に独立であること。本問は問題文で相互独立を仮定しているので

$$
\boxed{S\sim\operatorname{Poisson}(n\lambda)},
\qquad
\boxed{T\sim\operatorname{Poisson}(m\mu)}.
$$

また $S$ は $X$ 群だけ、$T$ は $Y$ 群だけの関数で、両群が独立なので $S\perp T$。

### 2. 条件付き二項分布は直接導出する

「独立Poissonを和で条件付けると二項」という結果を丸暗記で置かず、pmfから計算する。$\lambda,μ>0$ なので $n\lambda+m\mu>0$ であり、$P(K=k)>0$。$0\le s\le k$ について

$$
\begin{aligned}
P(S=s\mid K=k)
&=\frac{P(S=s,T=k-s)}{P(K=k)}\\
&=\frac{
 e^{-n\lambda}(n\lambda)^s/s!\,
 e^{-m\mu}(m\mu)^{k-s}/(k-s)!
}{
 e^{-(n\lambda+m\mu)}(n\lambda+m\mu)^k/k!
}\\
&={k\choose s}
\left(\frac{n\lambda}{n\lambda+m\mu}\right)^s
\left(\frac{m\mu}{n\lambda+m\mu}\right)^{k-s}.
\end{aligned}
$$

従って

$$
\boxed{
S\mid K=k
\sim\operatorname{Binomial}\left(
k,
\frac{n\lambda}{n\lambda+m\mu}
\right)
}.
$$

$H_0:\lambda=\mu$ では共通母数が消え

$$
\boxed{
S\mid K=k,H_0
\sim\operatorname{Binomial}\left(k,\frac{n}{n+m}\right)
}.
$$

### 3. 正確検定になる理由

条件付け後の帰無分布は共通Poisson率に依存しないため、未知の局外母数を含まない。また

$$
q(\lambda,\mu)=\frac{n\lambda}{n\lambda+m\mu}
$$

は $\lambda/\mu$ とともに増加するので、対立 $\lambda>\mu$ では大きい $S$ が対立寄りである。従って観測値 $s$ に対する片側P値は

$$
\boxed{
p=P_{H_0}(S\ge s\mid K=k)
}.
$$

これは漸近近似ではなく、上で導いた条件付き二項分布に基づく有限標本の正確P値である。

### 4. 数値例

$n=m,k=10,s=8$ なら帰無下成功確率は $1/2$。

$$
\begin{aligned}
p
&=\sum_{r=8}^{10}{10\choose r}2^{-10}\\
&=\frac{45+10+1}{1024}
=\boxed{\frac7{128}}.
\end{aligned}
$$

## 本番答案

$\lambda,μ>0$ で相互独立なのでPoissonの加法性を適用でき、

$$
S\sim Poi(n\lambda),\quad T\sim Poi(m\mu),\quad S\perp T.
$$

条件付き分布はpmfを割って

$$
P(S=s\mid K=k)
={k\choose s}
\left(\frac{n\lambda}{n\lambda+m\mu}\right)^s
\left(\frac{m\mu}{n\lambda+m\mu}\right)^{k-s}.
$$

したがって $H_0$ では

$$
S\mid K=k\sim Bin\left(k,\frac n{n+m}\right).
$$

共通率が消え、$\lambda>\mu$ では成功確率が増えるので大きい $S$ を棄却側とし、正確P値は $P(S\ge s\mid K=k)$。数値例は $7/128$。

## 採点基準

- $S,T$の分布（加法性の条件確認）: 4点
- 条件付き二項の直接導出: 7点
- 正確P値の根拠・方向: 4点
- 数値例: 5点
