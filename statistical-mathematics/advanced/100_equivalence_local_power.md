# Advanced 20 一致検定・局所対立・漸近検出力

- 旧No.: 100
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: 表

## 問題

$X_1,\ldots,X_n\overset{iid}\sim N(\mu,\sigma^2)$、$\sigma$ は既知とする。

$$
H_0:\mu=\mu_0,
\qquad
H_1:\mu>\mu_0
$$

を有意水準 $\alpha$ のz検定で検定する。

1. 検定と検出力関数を書け。
2. 固定対立 $\mu=\mu_0+\delta$, $\delta>0$ の下で一致性を示せ。
3. 局所対立 $\mu_n=\mu_0+h/\sqrt n$, $h>0$ の下で検出力極限を求めよ。
4. 固定対立と局所対立の違いを説明せよ。

## 詳細解答

$$
Z_n=\frac{\sqrt n(\bar X-\mu_0)}\sigma
$$

とし

$$
Z_n>z_{1-\alpha}
$$

で棄却する。

真の平均が $\mu$ なら

$$
Z_n\sim N\left(\frac{\sqrt n(\mu-\mu_0)}\sigma,1\right).
$$

従って検出力は

$$
\pi_n(\mu)
=1-\Phi\left(
z_{1-\alpha}-\frac{\sqrt n(\mu-\mu_0)}\sigma
\right).
$$

固定対立 $\mu=\mu_0+\delta$ では平均シフトが $\sqrt n\delta/\sigma\to\infty$ なので

$$
\boxed{\pi_n(\mu_0+\delta)\to1}.
$$

従ってこの検定列は固定対立に対して一致。

一方 $\mu_n=\mu_0+h/\sqrt n$ では

$$
\frac{\sqrt n(\mu_n-\mu_0)}\sigma=\frac h\sigma
$$

が定数なので

$$
\boxed{
\pi_n(\mu_n)
\to1-\Phi\left(z_{1-\alpha}-\frac h\sigma\right)
}.
$$

これは一般に1未満。局所対立は標本サイズ増加と同時に帰無へ近づくため、非自明な漸近検出力が残る。

## 本番答案

棄却域は $Z_n>z_{1-\alpha}$。検出力は

$$
1-\Phi\left(z_{1-\alpha}-\sqrt n(\mu-\mu_0)/\sigma\right).
$$

固定 $\delta>0$ では右辺は1へ。局所対立 $h/\sqrt n$ では

$$
1-\Phi(z_{1-\alpha}-h/\sigma)
$$

へ収束し1とは限らない。

## 採点基準

- 検定・検出力: 6点
- 固定対立の一致性: 5点
- 局所対立極限: 6点
- 両者の解釈: 3点
