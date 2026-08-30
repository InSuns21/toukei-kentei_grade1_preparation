# Advanced 20 検定の一致性・局所対立・漸近検出力

- 旧No.: 100
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: 表

## 問題

$X_1,\ldots,X_n$ は独立同分布で

$$
X_i\sim N(\mu,\sigma^2)
$$

に従い、$\sigma>0$ は既知とする。

$$
H_0:\mu=\mu_0,
\qquad
H_1:\mu>\mu_0
$$

を有意水準 $\alpha$ の標準正規検定で検定する。

ここで、標本サイズ $n$ ごとの検定を並べた検定列が **一致性を持つ**とは、任意の固定した対立母数 $\mu>\mu_0$ に対して、その検出力が

$$
\boxed{
\pi_n(\mu)\longrightarrow1
\qquad(n\to\infty)
}
$$

となることをいう。

また、

$$
\mu_n=\mu_0+\frac h{\sqrt n}
$$

のように標本サイズとともに帰無値へ近づく対立仮説を **局所対立**と呼ぶ。本問では、この $1/\sqrt n$ という速さがなぜ自然なのかも標準誤差と比較して説明する。

1. 検定統計量と棄却域を構成し、一般の真値 $\mu$ における検出力関数を導け。
2. 固定対立 $\mu=\mu_0+\delta$、$\delta>0$ の下で一致性を示せ。
3. 局所対立
   $$
   \mu_n=\mu_0+\frac h{\sqrt n},
   \qquad h>0
   $$
   の下で検出力極限を求めよ。
4. 固定対立と局所対立で極限が異なる理由を、標本平均の標準誤差と比較して説明せよ。

## 詳細解答

### 0. 「一致性」と「同等性検定」は別概念

本問で扱う **検定の一致性**は、標本サイズが増えると固定対立を検出する確率が1へ近づく、という漸近的性質である。

これは「2つの母数差があらかじめ定めた許容幅の中にあることを示す」**同等性検定**とは別の概念である。本問では同等性検定は扱わない。

### 1. 検定統計量・棄却域・検出力関数

正規分布の独立標本なので標本平均は有限標本で正確に

$$
\overline X
\sim
N\left(\mu,\frac{\sigma^2}{n}\right).
$$

帰無仮説 $H_0:\mu=\mu_0$ の下では

$$
\frac{\overline X-\mu_0}{\sigma/\sqrt n}
\sim N(0,1).
$$

そこで

$$
\boxed{
Z_n
=\frac{\sqrt n(\overline X-\mu_0)}{\sigma}
}
$$

と置く。

対立仮説は $\mu>\mu_0$ なので、$Z_n$ が大きいほど対立仮説を支持する。標準正規分布の $1-\alpha$ 分位点を $z_{1-\alpha}$ とすれば

$$
P_{\mu_0}(Z_n>z_{1-\alpha})=\alpha.
$$

従って棄却域は

$$
\boxed{Z_n>z_{1-\alpha}}.
$$

次に一般の真値 $\mu$ の下での $Z_n$ の分布を求める。

$$
\begin{aligned}
Z_n
&=\frac{\sqrt n(\overline X-\mu)}{\sigma}
+\frac{\sqrt n(\mu-\mu_0)}{\sigma}.
\end{aligned}
$$

第1項は $N(0,1)$ に従うので

$$
Z_n
\sim
N\left(
\frac{\sqrt n(\mu-\mu_0)}{\sigma},
1
\right).
$$

標準化された平均シフトを

$$
\Delta_n(\mu)
=\frac{\sqrt n(\mu-\mu_0)}{\sigma}
$$

と置く。

検出力関数は「真値が $\mu$ のときに帰無仮説を棄却する確率」だから

$$
\pi_n(\mu)
=P_\mu(Z_n>z_{1-\alpha}).
$$

$Z_n-\Delta_n(\mu)\sim N(0,1)$ より

$$
\begin{aligned}
\pi_n(\mu)
&=P_\mu\left(
Z_n-\Delta_n(\mu)
>z_{1-\alpha}-\Delta_n(\mu)
\right)\\
&=1-\Phi\left(
z_{1-\alpha}
-\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right).
\end{aligned}
$$

従って

$$
\boxed{
\pi_n(\mu)
=1-\Phi\left(
z_{1-\alpha}
-\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right)
}.
$$

### 2. 固定対立の下での一致性

固定対立

$$
\mu=\mu_0+\delta,
\qquad
\delta>0
$$

を考える。「固定」とは、$n$ が増えても $\delta$ 自体は変わらないという意味である。

検出力関数へ代入すると

$$
\pi_n(\mu_0+\delta)
=1-\Phi\left(
z_{1-\alpha}-\frac{\sqrt n\delta}{\sigma}
\right).
$$

$n\to\infty$ では

$$
\frac{\sqrt n\delta}{\sigma}\to\infty,
$$

従って

$$
z_{1-\alpha}-\frac{\sqrt n\delta}{\sigma}
\to-\infty.
$$

標準正規分布の累積分布関数は $x\to-\infty$ で0へ収束するので

$$
\boxed{
\pi_n(\mu_0+\delta)\to1
}.
$$

これは任意の固定した $\delta>0$ について成立する。従って問題文の定義から、本検定列は

$$
H_1:\mu>\mu_0
$$

に対して一致性を持つ。

### 3. 局所対立の下での検出力

今度は対立母数そのものを $n$ に依存させ、

$$
\mu_n
=\mu_0+\frac h{\sqrt n},
\qquad h>0
$$

とする。

これは $n$ が増えるほど

$$
\mu_n\to\mu_0
$$

となり、帰無仮説と対立仮説が接近していく設定である。

このとき標準化された平均シフトは

$$
\begin{aligned}
\Delta_n(\mu_n)
&=\frac{\sqrt n(\mu_n-\mu_0)}{\sigma}\\
&=\frac{\sqrt n}{\sigma}\frac h{\sqrt n}\\
&=\frac h\sigma.
\end{aligned}
$$

したがって各 $n$ について

$$
Z_n\sim N\left(\frac h\sigma,1\right)
$$

であり、検出力は

$$
\pi_n(\mu_n)
=1-\Phi\left(
z_{1-\alpha}-\frac h\sigma
\right).
$$

右辺は $n$ に依存しないので

$$
\boxed{
\lim_{n\to\infty}\pi_n(\mu_n)
=1-\Phi\left(
z_{1-\alpha}-\frac h\sigma
\right)
}.
$$

$h$ が有限なら、この値は一般に1未満である。

### 4. なぜ $1/\sqrt n$ スケールが自然なのか

標本平均の標準誤差は

$$
\operatorname{SE}(\overline X)
=\frac{\sigma}{\sqrt n}.
$$

#### 固定対立

固定対立では帰無値との差は

$$
\mu-\mu_0=\delta
$$

で一定である。一方、標準誤差だけが $1/\sqrt n$ の速さで小さくなる。

したがって「信号を標準誤差で割った量」は

$$
\frac{\delta}{\sigma/\sqrt n}
=\frac{\sqrt n\delta}{\sigma}
\to\infty.
$$

標本数が増えるほど信号が標準誤差に対して無限に大きくなるため、検出力は1へ近づく。

#### 局所対立

局所対立では

$$
\mu_n-\mu_0
=\frac h{\sqrt n}
$$

であり、帰無値との差そのものも標準誤差と同じ $1/\sqrt n$ の速さで縮む。

従って

$$
\frac{h/\sqrt n}{\sigma/\sqrt n}
=\frac h\sigma
$$

という有限な定数が残る。

つまり $1/\sqrt n$ は、

- これより遅く帰無値へ近づく対立なら、標準化された信号が大きくなり検出しやすくなる。
- これより速く帰無値へ近づく対立なら、標準化された信号が0へ近づき帰無仮説と区別しにくくなる。
- ちょうど $1/\sqrt n$ なら、標準化された信号が有限な非零定数に保たれる。

という境界的なスケールである。

このため漸近検出力を調べるとき、$1/\sqrt n$ スケールの局所対立が自然に現れる。

## 本番答案

帰無仮説の下で

$$
Z_n
=\frac{\sqrt n(\overline X-\mu_0)}{\sigma}
\sim N(0,1),
$$

だから

$$
Z_n>z_{1-\alpha}
$$

で棄却する。

一般の $\mu$ では

$$
Z_n
\sim
N\left(
\frac{\sqrt n(\mu-\mu_0)}{\sigma},1
\right),
$$

従って

$$
\pi_n(\mu)
=1-\Phi\left(
z_{1-\alpha}
-\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right).
$$

固定対立 $\mu=\mu_0+\delta$、$\delta>0$ では

$$
\frac{\sqrt n\delta}{\sigma}\to\infty
$$

なので

$$
\pi_n(\mu_0+\delta)\to1.
$$

従って本検定列は一致性を持つ。

局所対立

$$
\mu_n=\mu_0+\frac h{\sqrt n}
$$

では

$$
\frac{\sqrt n(\mu_n-\mu_0)}{\sigma}
=\frac h\sigma,
$$

従って

$$
\pi_n(\mu_n)
=1-\Phi\left(z_{1-\alpha}-\frac h\sigma\right).
$$

$1/\sqrt n$ は標本平均の標準誤差と同じ次数なので、局所対立では標準化された信号 $h/\sigma$ が有限に残り、固定対立のように検出力が1へは行かない。

## 採点基準

- 帰無分布・棄却域・一般の検出力関数: 6点
- 一致性の定義と固定対立での極限: 5点
- 局所対立での標準化と検出力極限: 5点
- $1/\sqrt n$ スケールを標準誤差から説明: 4点
