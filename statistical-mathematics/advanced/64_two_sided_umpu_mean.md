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

$\mu>\mu_0$ に対する最強力検定は大きい $\bar X$ を棄却側へ置き、$\mu<\mu_0$ では小さい $\bar X$ を棄却側へ置く。左右で望ましい棄却方向が逆なので、全ての対立に同時に最強となる単一のUMP検定は一般には作れない。

### 2. 両側z検定

$$
Z=\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
$$

とすれば $H_0$ 下で $Z\sim N(0,1)$。$c=z_{1-\alpha/2}$ と置き

$$
\boxed{|Z|>c}
$$

で棄却すれば、対称性から

$$
P_0(|Z|>c)=2\{1-\Phi(c)\}=\alpha.
$$

### 3. 不偏性を検出力から確認する

真の平均が $\mu$ のとき

$$
Z\sim N(\delta,1),
\qquad
\delta=\frac{\sqrt n(\mu-\mu_0)}{\sigma}.
$$

検出力を

$$
\beta(\delta)=P_\delta(|Z|>c)
=1-\Phi(c-\delta)+\Phi(-c-\delta)
$$

と書く。微分すると

$$
\beta'(\delta)=\phi(c-\delta)-\phi(c+\delta).
$$

$\delta>0$ では $(c-\delta)^2<(c+\delta)^2$ なので $\phi(c-\delta)>\phi(c+\delta)$、従って $\beta'(\delta)>0$。$\beta$ は $\delta$ の偶関数だから $\delta<0$ 側では0へ近づくほど減少する。従って最小値は $\delta=0$ で

$$
\min_\delta\beta(\delta)=\beta(0)=\alpha.
$$

したがって全ての $\mu\ne\mu_0$ で検出力がサイズ以上となり、この検定は不偏である。

### 4. UMPU性

既知分散正規族の密度は

$$
f_\mu(x)
=h(x)\exp\left\{\frac{\mu}{\sigma^2}\sum_i x_i-\frac{n\mu^2}{2\sigma^2}\right\}
$$

と書ける1母数指数型分布族で、$T=\sum_iX_i$ が自然十分統計量である。1母数指数型分布族の両側検定では、レベル条件に加えて不偏性条件を課した検定の中で、$T$ の両端を棄却する検定がUMPUになる。正規分布では帰無分布が $\mu_0$ を中心に対称なので、その両端条件がちょうど

$$
|Z|>z_{1-\alpha/2}
$$

になる。

ここでUMPU性は指数型分布族の定理を適用しているが、不偏性そのものは上で検出力を直接計算して確認している。

## 本番答案

左右の対立で最強棄却方向が逆なので両側UMPは一般にない。既知分散正規では

$$
Z=\sqrt n(\bar X-\mu_0)/\sigma,
\qquad |Z|>c,\quad c=z_{1-\alpha/2}.
$$

対立下で $Z\sim N(\delta,1)$。検出力

$$
\beta(\delta)=1-\Phi(c-\delta)+\Phi(-c-\delta)
$$

は

$$
\beta'(\delta)=\phi(c-\delta)-\phi(c+\delta)
$$

より $\delta=0$ で最小となり $\beta(0)=\alpha$。従って不偏。さらに正規既知分散族は $\sum X_i$ を自然十分統計量とする1母数指数型分布族であり、両端棄却の不偏検定に関する定理からUMPUとなる。

## 採点基準

- UMPが難しい理由: 4点
- z検定: 5点
- 不偏性（検出力の最小性を確認）: 6点
- UMPU性の説明: 5点
