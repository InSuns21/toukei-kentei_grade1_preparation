# Advanced 13 母平均の両側UMPU

- 旧No.: 64
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: 表

## 問題

$X_1,\ldots,X_n\overset{iid}\sim N(\mu,\sigma^2)$、$\sigma^2$ は既知とする。

$$
H_0:\mu=\mu_0,
\qquad
H_1:\mu\ne\mu_0
$$

を考える。

1. 一般に両側対立ではUMP検定が存在しにくい理由を述べよ。
2. 有意水準 $\alpha$ の両側z検定を書け。
3. この検定が不偏であることを説明せよ。
4. 正規1母数指数型分布族におけるUMPU性を説明せよ。

## 詳細解答

### 1. なぜ両側UMPが難しいか

$\mu>\mu_0$ に対する最強力検定は大きい $\bar X$ を棄却側へ置き、$\mu<\mu_0$ では小さい $\bar X$ を棄却側へ置く。左右で望ましい棄却方向が逆なので、全対立に同時に最強となる単一のUMP検定は一般には作れない。

### 2. 両側z検定

$$
Z=\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
$$

とすれば $H_0$ 下で $Z\sim N(0,1)$。$c=z_{1-\alpha/2}$ と置き

$$
\boxed{|Z|>c}
$$

で棄却すれば

$$
P_0(|Z|>c)=\alpha.
$$

### 3. 不偏性を直接確認

真の平均が $\mu$ のとき

$$
Z\sim N(\delta,1),
\qquad
\delta=\frac{\sqrt n(\mu-\mu_0)}{\sigma}.
$$

検出力は

$$
\beta(\delta)
=1-\Phi(c-\delta)+\Phi(-c-\delta).
$$

$$
\beta'(\delta)=\phi(c-\delta)-\phi(c+\delta).
$$

$\delta>0$ では $\beta'(\delta)>0$、$\beta$ は偶関数なので最小値は $\delta=0$。従って

$$
\beta(\delta)\ge\beta(0)=\alpha
$$

で、この検定は不偏。

### 4. 1母数指数型分布族のUMPU定理

ここで使うのは **1母数指数型分布族の両側UMPU検定定理（Neyman構造）**である。概略として、

$$
f_\eta(x)=h(x)\exp\{\eta T(x)-A(\eta)\}
$$

という正則な1母数指数型分布族で、自然母数空間が開区間、$T$ の分布が連続なら、点帰無 $\eta=\eta_0$ に対する不偏レベル $\alpha$ 検定の中で、$T$ の両端を棄却する形の検定がUMPUになる。臨界点はサイズ条件と不偏性条件で決まる。

本問でこの定理の条件を確認する。正規既知分散族は

$$
f_\mu(x)
=h(x)\exp\left\{\frac{\mu}{\sigma^2}\sum_i x_i-\frac{n\mu^2}{2\sigma^2}\right\}
$$

と書け、自然母数は

$$
\eta=\frac\mu{\sigma^2}\in\mathbb R.
$$

自然母数空間 $\mathbb R$ は開区間で、$T=\sum_iX_i$ は連続分布を持つ。さらに $T$ はこの1母数full exponential familyの完全十分統計量である。したがってUMPU定理を適用できる。

一般には左右の臨界点はサイズ条件・不偏性条件で決めるが、本問は $H_0$ 下の $T$ の分布が $n\mu_0$ を中心に対称なので、両条件を満たす臨界点は等確率の両側となり、

$$
\boxed{|Z|>z_{1-\alpha/2}}
$$

がUMPU検定になる。

不偏性そのものは定理に丸投げせず、3で検出力を直接確認済みである。

## 本番答案

既知分散正規では

$$
Z=\sqrt n(\bar X-\mu_0)/\sigma,
\qquad |Z|>z_{1-\alpha/2}
$$

で棄却。対立下 $Z\sim N(\delta,1)$ で、検出力

$$
\beta(\delta)=1-\Phi(c-\delta)+\Phi(-c-\delta)
$$

は $\delta=0$ で最小なので不偏。

UMPU性には **1母数指数型分布族の両側UMPU定理**を使う。本問は

$$
f_\mu(x)=h(x)\exp\{(\mu/\sigma^2)T-n\mu^2/(2\sigma^2)\},
\quad T=\sum X_i,
$$

自然母数空間は $\mathbb R$ で開、$T$ は連続、正規既知分散族は正則な1母数full exponential family。したがって定理を適用でき、対称性から等確率両側棄却がUMPU。

## 採点基準

- UMPが難しい理由: 4点
- z検定: 5点
- 不偏性（検出力の最小性）: 6点
- UMPU定理名・適用条件・条件確認: 5点
