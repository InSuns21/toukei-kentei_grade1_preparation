# Advanced 69 線形判別分析

- 安定ID: `RIKOU-ADVANCED-69`
- 80大問 No.: 69
- 演習価値: B
- 難度: A
- 目安時間: 25〜30分

## 問題

2群 $g=1,2$ について、$X\mid(G=g)$ は平均 $\mu_g$、共通分散共分散行列 $\Sigma$ の2変量正規分布に従うとする。群 $g$ の確率密度関数を

$$
f_g(x)
=\frac{1}{2\pi|\Sigma|^{1/2}}
\exp\left\{-\frac12(x-\mu_g)^\top\Sigma^{-1}(x-\mu_g)\right\}
$$

とする。本問では

$$
\Sigma=I_2,
\qquad
\mu_1=(0,0)^\top,
\qquad
\mu_2=(2,1)^\top
$$

であり、まず事前確率は $\pi_1=\pi_2=1/2$ とする。

1. 上の確率密度関数と Bayes 則から線形判別分析の判別境界を導け。
2. 点 $x=(1.5,0.2)^\top$ を分類せよ。
3. 等事前確率のとき、境界が両平均への Mahalanobis 距離が等しい集合になることを示せ。
4. 事前確率が等しくないと境界がどう変わるか。
5. 群ごとに分散共分散行列が異なると二次判別分析になる理由を述べよ。

## 詳細解答

### 1. 正規密度から判別境界を導く

観測値 $x$ が与えられたとき、Bayes 則から群 $g$ の事後確率は

$$
P(G=g\mid X=x)
=\frac{\pi_g f_g(x)}
{\pi_1f_1(x)+\pi_2f_2(x)}.
$$

分母は $g=1,2$ で共通なので、どちらの事後確率が大きいかを比較するには

$$
\pi_g f_g(x)
$$

を比較すればよい。対数は単調増加なので、さらに

$$
\log\{\pi_gf_g(x)\}
$$

を比較してよい。

問題文の正規密度を代入すると

$$
\begin{aligned}
\log\{\pi_gf_g(x)\}
&=\log\pi_g
-\log(2\pi)
-\frac12\log|\Sigma|\\
&\quad-\frac12(x-\mu_g)^\top\Sigma^{-1}(x-\mu_g).
\end{aligned}
$$

ここで $-\log(2\pi)-\frac12\log|\Sigma|$ は両群に共通なので、群間比較では相殺される。したがって判別関数を

$$
\delta_g(x)
=-\frac12(x-\mu_g)^\top\Sigma^{-1}(x-\mu_g)
+\log\pi_g
$$

としてよい。

群2を選ぶ条件は $\delta_2(x)>\delta_1(x)$ であり、判別境界は

$$
\delta_2(x)-\delta_1(x)=0
$$

である。差を取ると

$$
\begin{aligned}
\delta_2(x)-\delta_1(x)
&=-\frac12\left[
(x-\mu_2)^\top\Sigma^{-1}(x-\mu_2)
-(x-\mu_1)^\top\Sigma^{-1}(x-\mu_1)
\right]\\
&\quad+\log\frac{\pi_2}{\pi_1}.
\end{aligned}
$$

ここで二次形式を1つずつ展開する。$\Sigma^{-1}$ は対称なので

$$
\begin{aligned}
(x-\mu_g)^\top\Sigma^{-1}(x-\mu_g)
&=x^\top\Sigma^{-1}x
-x^\top\Sigma^{-1}\mu_g
-\mu_g^\top\Sigma^{-1}x
+\mu_g^\top\Sigma^{-1}\mu_g\\
&=x^\top\Sigma^{-1}x
-2\mu_g^\top\Sigma^{-1}x
+\mu_g^\top\Sigma^{-1}\mu_g.
\end{aligned}
$$

群2と群1の差を取ると、共通の $x^\top\Sigma^{-1}x$ が消える。したがって

$$
\begin{aligned}
\delta_2(x)-\delta_1(x)
&=(\mu_2-\mu_1)^\top\Sigma^{-1}x\\
&\quad-\frac12
\left(
\mu_2^\top\Sigma^{-1}\mu_2
-\mu_1^\top\Sigma^{-1}\mu_1
\right)
+\log\frac{\pi_2}{\pi_1}.
\end{aligned}
$$

ここまで展開したことで、$x$ の二次項が消え、$x$ に関して1次式だけが残ることが分かる。これが「線形」判別分析と呼ばれる理由である。

本問では等事前確率なので

$$
\log\frac{\pi_2}{\pi_1}=0.
$$

また $\Sigma^{-1}=I_2$, $\mu_1=(0,0)^\top$, $\mu_2=(2,1)^\top$ だから

$$
(\mu_2-\mu_1)^\top\Sigma^{-1}x
=2x_1+x_2,
$$

$$
\mu_2^\top\Sigma^{-1}\mu_2
=2^2+1^2=5,
\qquad
\mu_1^\top\Sigma^{-1}\mu_1=0.
$$

したがって境界は

$$
2x_1+x_2-\frac52=0,
$$

すなわち

$$
\boxed{2x_1+x_2=\frac52}.
$$

### 2. 点の分類

$x=(1.5,0.2)^\top$ では

$$
2x_1+x_2
=2(1.5)+0.2
=3.2.
$$

境界値 $2.5$ より大きいので

$$
\delta_2(x)-\delta_1(x)=3.2-2.5=0.7>0.
$$

したがって

$$
\boxed{\text{群2に分類する}}.
$$

### 3. Mahalanobis 距離との関係

等事前確率では

$$
\delta_g(x)
=-\frac12(x-\mu_g)^\top\Sigma^{-1}(x-\mu_g)+\text{群共通定数}
$$

である。よって $\delta_1(x)=\delta_2(x)$ は

$$
(x-\mu_1)^\top\Sigma^{-1}(x-\mu_1)
=(x-\mu_2)^\top\Sigma^{-1}(x-\mu_2)
$$

と同値である。左辺・右辺はそれぞれ各群平均への Mahalanobis 距離の二乗なので、判別境界は両距離が等しい点の集合である。

### 4. 事前確率が異なる場合

一般の境界は

$$
(\mu_2-\mu_1)^\top\Sigma^{-1}x
=\frac12
\left(
\mu_2^\top\Sigma^{-1}\mu_2
-\mu_1^\top\Sigma^{-1}\mu_1
\right)
-\log\frac{\pi_2}{\pi_1}.
$$

法線ベクトル $(\mu_2-\mu_1)^\top\Sigma^{-1}$ は変わらず、右辺の定数だけが変わるので、境界は平行移動する。$\pi_2$ が大きいほど $\log(\pi_2/\pi_1)$ が大きくなり、群2を選ぶ領域が広がる。

### 5. 分散共分散行列が群ごとに異なる場合

群ごとに $\Sigma_g$ が異なると、正規密度の対数には

$$
-\frac12(x-\mu_g)^\top\Sigma_g^{-1}(x-\mu_g)
$$

が現れる。展開すると

$$
-\frac12x^\top\Sigma_g^{-1}x
+\mu_g^\top\Sigma_g^{-1}x
-\frac12\mu_g^\top\Sigma_g^{-1}\mu_g.
$$

群1と群2で $\Sigma_g^{-1}$ が異なるため、差を取っても

$$
x^\top(\Sigma_2^{-1}-\Sigma_1^{-1})x
$$

という二次項が一般には残る。したがって判別境界は二次曲線となり、二次判別分析になる。

## 本番答案

Bayes則より、群 $g$ の比較には $\pi_gf_g(x)$ を比較すればよい。問題文の正規密度を対数化すると、群共通項を除いた判別関数は

$$
\delta_g(x)
=-\frac12(x-\mu_g)^\top\Sigma^{-1}(x-\mu_g)+\log\pi_g.
$$

二次形式を展開して群2と群1の差を取ると、共通の $x^\top\Sigma^{-1}x$ が消え、

$$
\delta_2-\delta_1
=(\mu_2-\mu_1)^\top\Sigma^{-1}x
-\frac12
(\mu_2^\top\Sigma^{-1}\mu_2-\mu_1^\top\Sigma^{-1}\mu_1)
+\log\frac{\pi_2}{\pi_1}.
$$

等事前・本問の値では

$$
2x_1+x_2=\frac52
$$

が境界。点 $(1.5,0.2)$ では $3.2>2.5$ なので群2。等事前では境界は両平均への Mahalanobis 距離が等しい集合である。事前確率の差は境界を平行移動し、群ごとに共分散が異なると二次項が相殺されず二次判別分析になる。

## 採点基準

- Bayes則・正規密度から判別関数を作る: 4点
- 二次形式を展開して線形境界を導く: 4点
- 点の分類: 3点
- Mahalanobis距離の解釈: 3点
- 事前確率の効果: 3点
- 異共分散で二次項が残ることの説明: 3点

25分経過時も、判別関数を暗記公式として置かず、正規密度の対数から群間で共通項が消えるところを残す。
