# Advanced 20 一致検定・局所対立・漸近検出力

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

1. 検定統計量と棄却域を構成し、一般の真値 $\mu$ における検出力関数を導け。
2. 固定対立 $\mu=\mu_0+\delta$、$\delta>0$ の下で一致性を示せ。
3. 局所対立

$$
\mu_n=\mu_0+\frac h{\sqrt n},
\qquad h>0
$$

の下で検出力極限を求めよ。
4. 固定対立と局所対立で極限が異なる理由を、標準誤差の大きさと比較して説明せよ。

## 詳細解答

### 1. 検定統計量と検出力関数

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
Z_n
=\frac{\sqrt n(\overline X-\mu_0)}{\sigma}
$$

と置く。

$H_1:\mu>\mu_0$ では平均が大きいほど $Z_n$ も大きくなりやすいので、上側を棄却域に取る。標準正規分布の上側確率が $\alpha$ となる点を $z_{1-\alpha}$ とすれば

$$
P_0(Z_n>z_{1-\alpha})=\alpha.
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

平均シフトを

$$
\Delta_n(\mu)
=\frac{\sqrt n(\mu-\mu_0)}{\sigma}
$$

と置くと、検出力は棄却確率

$$
\pi_n(\mu)
=P_\mu(Z_n>z_{1-\alpha})
$$

である。$Z_n-\Delta_n(\mu)\sim N(0,1)$ だから

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
\qquad \delta>0
$$

を考える。この $\delta$ は $n$ が増えても変わらない。

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

したがって

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

検定列が一致であるとは、任意の固定した対立母数に対して検出力が1へ収束することである。したがって本検定は各固定対立 $\mu_0+\delta$、$\delta>0$ に対して一致する。

### 3. 局所対立の下での検出力

今度は

$$
\mu_n
=\mu_0+\frac h{\sqrt n}
$$

とする。この対立は $n$ が増えるほど帰無値 $\mu_0$ に近づく。

平均シフトは

$$
\begin{aligned}
\Delta_n(\mu_n)
&=\frac{\sqrt n(\mu_n-\mu_0)}{\sigma}\\
&=\frac{\sqrt n}{\sigma}\frac h{\sqrt n}\\
&=\frac h\sigma.
\end{aligned}
$$

したがって本問の正規モデルでは各 $n$ について既に

$$
\pi_n(\mu_n)
=1-\Phi\left(
z_{1-\alpha}-\frac h\sigma
\right).
$$

右辺は $n$ に依存しないので、その極限も同じである。

$$
\boxed{
\lim_{n\to\infty}\pi_n(\mu_n)
=1-\Phi\left(
z_{1-\alpha}-\frac h\sigma
\right)
}.
$$

これは $h$ が有限なら一般に1未満である。

### 4. 固定対立と局所対立の違い

標本平均の標準誤差は

$$
\frac{\sigma}{\sqrt n}.
$$

固定対立では帰無値との差は

$$
\mu-\mu_0=\delta
$$

で一定なのに、標準誤差だけが $1/\sqrt n$ の速さで小さくなる。そのため標準化された信号の大きさ

$$
\frac{\delta}{\sigma/\sqrt n}
=\frac{\sqrt n\delta}{\sigma}
$$

は無限大へ発散し、やがてほぼ確実に区別できる。

一方、局所対立では

$$
\mu_n-\mu_0
=\frac h{\sqrt n}
$$

であり、帰無値との差そのものが標準誤差と同じ $1/\sqrt n$ の速さで縮む。その比は

$$
\frac{h/\sqrt n}{\sigma/\sqrt n}
=\frac h\sigma
$$

という有限な定数にとどまる。

したがって、固定対立では検出力が1へ行く一方、$1/\sqrt n$ スケールの局所対立では0と1の間の非自明な検出力が残る。

## 本番答案

$H_0$ の下で

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

従って検出力は

$$
\pi_n(\mu)
=1-\Phi\left(
z_{1-\alpha}
-\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right).
$$

固定対立 $\mu=\mu_0+\delta$、$\delta>0$ では

$$
\sqrt n\delta/\sigma\to\infty
$$

なので

$$
\pi_n(\mu_0+\delta)\to1.
$$

局所対立 $\mu_n=\mu_0+h/\sqrt n$ では

$$
\sqrt n(\mu_n-\mu_0)/\sigma=h/\sigma,
$$

従って

$$
\pi_n(\mu_n)
=1-\Phi(z_{1-\alpha}-h/\sigma).
$$

固定対立は帰無値との差が標準誤差より相対的に大きくなり続けるが、局所対立は差と標準誤差が同じ $1/\sqrt n$ の次数なので非自明な検出力が残る。

## 採点基準

- 帰無分布・棄却域・一般の検出力関数の導出: 6点
- 固定対立での一致性（極限まで明示）: 5点
- 局所対立での標準化と検出力極限: 6点
- 標準誤差との次数比較による解釈: 3点
