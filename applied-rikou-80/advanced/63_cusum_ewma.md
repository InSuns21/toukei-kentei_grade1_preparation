# Advanced 63 累積和・指数加重移動平均管理図

- 安定ID: `RIKOU-ADVANCED-63`
- 80大問 No.: 63
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分

## 問題

標準化観測 $Z_t$ を監視する。

1. 上側累積和

$$
C_t^+=\max\{0,C_{t-1}^++Z_t-k\}
$$

の $k$ の役割を説明せよ。
2. $k=0.5$, $C_0^+=0$, $Z=(0.2,1.0,1.4)$ の $C_t^+$ を計算せよ。
3. 指数加重移動平均

$$
W_t=\lambda Z_t+(1-\lambda)W_{t-1}
$$

の重みの意味を説明せよ。
4. 独立な $Z_t$ が分散 $\sigma_Z^2$ を持つとき、定常時の分散が

$$
\operatorname{Var}(W_t)\to
\sigma_Z^2\frac{\lambda}{2-\lambda}
$$

となることを示せ。
5. Shewhart管理図との検出特性の違いを説明せよ。

## 詳細解答

### 1. 累積和における参照値 $k$

上側累積和は

$$
C_t^+=\max\{0,C_{t-1}^++Z_t-k\}
$$

で更新する。

$Z_t-k$ が正なら前までの累積値へ加算され、負なら累積値を減らす。0を下回った場合は0へ戻す。

したがって $k$ は「どの程度の正方向シフトを持続的な異常として拾いたいか」を決める参照値である。

標準偏差単位で平均が $\delta$ だけ上昇した変化を狙う場合、典型的には

$$
\boxed{k\approx\frac\delta2}
$$

と置く。

例えば $k=0.5$ なら、平均が約1標準偏差上昇する持続変化を効率よく検出する代表設定である。

単発で $Z_t$ が少し大きいだけなら次の観測で打ち消され得るが、$Z_t>k$ が連続すると $C_t^+$ が少しずつ蓄積する。これが小さな持続シフトを検出できる理由である。

### 2. 数値更新

$C_0^+=0$, $k=0.5$ から順番に代入する。

第1時点は

$$
\begin{aligned}
C_1^+
&=\max\{0,0+0.2-0.5\}\\
&=\max\{0,-0.3\}\\
&=\boxed{0}.
\end{aligned}
$$

第2時点は

$$
\begin{aligned}
C_2^+
&=\max\{0,0+1.0-0.5\}\\
&=\boxed{0.5}.
\end{aligned}
$$

第3時点は

$$
\begin{aligned}
C_3^+
&=\max\{0,0.5+1.4-0.5\}\\
&=\boxed{1.4}.
\end{aligned}
$$

従って

$$
\boxed{(C_1^+,C_2^+,C_3^+)=(0,0.5,1.4)}.
$$

### 3. 指数加重移動平均の重み

再帰式

$$
W_t=\lambda Z_t+(1-\lambda)W_{t-1}
$$

へ $W_{t-1}$ を代入すると

$$
W_t
=\lambda Z_t
+\lambda(1-\lambda)Z_{t-1}
+(1-\lambda)^2W_{t-2}.
$$

これを繰り返せば

$$
\boxed{
W_t
=\lambda\sum_{j=0}^{t-1}(1-\lambda)^jZ_{t-j}
+(1-\lambda)^tW_0
}.
$$

したがって最新観測 $Z_t$ の重みは $\lambda$、1期前は $\lambda(1-\lambda)$、2期前は $\lambda(1-\lambda)^2$ であり、過去へ行くほど幾何級数的に小さくなる。

$\lambda$ が小さいほど減衰が遅く、多くの過去観測を平均するので「長い記憶」を持つ。逆に $\lambda$ が1に近いと

$$
W_t\approx Z_t
$$

となり、最新観測を強く反映する。

### 4. 指数加重移動平均の分散

$Z_t$ は独立で

$$
\operatorname{Var}(Z_t)=\sigma_Z^2
$$

とし、$W_0$ は固定値とする。

第3問の展開から

$$
W_t
=\lambda\sum_{j=0}^{t-1}(1-\lambda)^jZ_{t-j}
+(1-\lambda)^tW_0.
$$

固定値 $W_0$ は分散へ寄与せず、独立性から交差共分散も0なので

$$
\begin{aligned}
\operatorname{Var}(W_t)
&=\lambda^2\sigma_Z^2
\sum_{j=0}^{t-1}(1-\lambda)^{2j}.
\end{aligned}
$$

等比級数

$$
\sum_{j=0}^{t-1}r^j=\frac{1-r^t}{1-r}
$$

に

$$
r=(1-\lambda)^2
$$

を代入すると

$$
\begin{aligned}
\operatorname{Var}(W_t)
&=\lambda^2\sigma_Z^2
\frac{1-(1-\lambda)^{2t}}
{1-(1-\lambda)^2}\\
&=\lambda^2\sigma_Z^2
\frac{1-(1-\lambda)^{2t}}
{2\lambda-\lambda^2}\\
&=\boxed{
\sigma_Z^2\frac{\lambda}{2-\lambda}
\left\{1-(1-\lambda)^{2t}\right\}
}.
\end{aligned}
$$

$0<\lambda\le1$ なら $|1-\lambda|<1$ なので

$$
(1-\lambda)^{2t}\to0.
$$

従って

$$
\boxed{
\operatorname{Var}(W_t)
\to\sigma_Z^2\frac{\lambda}{2-\lambda}
}.
$$

### 5. Shewhart管理図との違い

Shewhart管理図は基本的に各時点の観測値を単独で管理限界と比較する。そのため1回だけ大きく外れる変化には強い。

一方、累積和管理図は

$$
Z_t-k
$$

を蓄積し、指数加重移動平均管理図は過去観測を平滑化して記憶する。したがって1回ごとの差は小さくても、同方向のずれが長く続くと統計量が徐々に変化する。

よって一般に

- 大きな単発シフト: Shewhart管理図が検出しやすい。
- 小さな持続シフト: 累積和・指数加重移動平均管理図が検出しやすい。

という使い分けになる。

## 本番答案

上側累積和

$$
C_t^+=\max\{0,C_{t-1}^++Z_t-k\}
$$

で $k$ は検出したい標準化平均シフトのおおよそ半分を置く参照値である。

数値例では

$$
C_1^+=\max(0,-0.3)=0,
$$

$$
C_2^+=\max(0,0.5)=0.5,
$$

$$
C_3^+=\max(0,1.4)=1.4.
$$

指数加重移動平均は

$$
W_t
=\lambda\sum_{j=0}^{t-1}(1-\lambda)^jZ_{t-j}
+(1-\lambda)^tW_0
$$

なので過去観測へ指数減衰重みを与える。

独立性から

$$
\operatorname{Var}(W_t)
=\lambda^2\sigma_Z^2
\sum_{j=0}^{t-1}(1-\lambda)^{2j}
=\sigma_Z^2\frac{\lambda}{2-\lambda}
\{1-(1-\lambda)^{2t}\},
$$

従って定常極限は

$$
\sigma_Z^2\frac{\lambda}{2-\lambda}.
$$

Shewhart管理図は大きな単発変化、累積和・指数加重移動平均管理図は小さな持続変化の検出に強い。

## 採点基準

- $k$ の参照値としての意味: 4点
- 累積和の再帰計算: 4点
- 指数加重移動平均の幾何級数重み展開: 4点
- 独立性と等比級数による分散導出: 5点
- Shewhart管理図との検出特性比較: 3点

25分経過時は、再帰式を1段ずつ代入し、指数加重移動平均の重みを展開する。
