# Advanced 12 2成分ポアソン混合・期待値最大化法

- 旧No.: 61
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（収束までの反復計算不要）

## 問題

ポアソン分布の確率質量関数を

$$
p(x\mid\lambda)
=\frac{e^{-\lambda}\lambda^x}{x!},
\qquad x=0,1,2,\ldots,
\qquad \lambda>0
$$

とする。独立観測 $x_1,\ldots,x_n$ が2成分混合分布

$$
f(x)
=\pi p(x\mid\lambda_1)
+(1-\pi)p(x\mid\lambda_2),
\qquad0<\pi<1
$$

から得られた。潜在変数 $Z_i\in\{0,1\}$ を「観測 $i$ が成分1から生じたこと」の指標とする。

母数ベクトルを

$$
\theta=(\pi,\lambda_1,\lambda_2)
$$

と書く。期待値最大化法では、現在の反復値 $\theta^{(m)}$ を固定して潜在変数の条件付き期待値を計算し、その期待値を用いて次の反復値 $\theta^{(m+1)}$ を決める。

1. 完全データ $(x_i,Z_i)$ の尤度と対数尤度を書け。
2. 現在値 $\theta^{(m)}$ の下で、期待値計算ステップの責任度
   $$
   r_i^{(m)}=E_{\theta^{(m)}}[Z_i\mid x_i]
   $$
   をベイズ則から求めよ。
3. 
   $$
   Q(\theta\mid\theta^{(m)})
   =E_{\theta^{(m)}}[\ell_c(\theta;X,Z)\mid X=x]
   $$
   を書き、$r_i^{(m)}$ を固定したまま $\theta$ について最大化して、$\pi^{(m+1)},\lambda_1^{(m+1)},\lambda_2^{(m+1)}$ の更新式を導け。
4. 数値反復を手で最後まで行う必要がない理由と、ラベル交換を説明せよ。

## 詳細解答

### 0. 期待値最大化法で何をしているのか

観測データだけの尤度は

$$
L(\theta)
=\prod_{i=1}^n
\left\{
\pi p(x_i\mid\lambda_1)
+(1-\pi)p(x_i\mid\lambda_2)
\right\}
$$

である。対数を取ると

$$
\ell(\theta)
=\sum_{i=1}^n
\log\left\{
\pi p(x_i\mid\lambda_1)
+(1-\pi)p(x_i\mid\lambda_2)
\right\},
$$

となり、対数の中に和が残るため直接最大化しにくい。

そこで「各観測がどちらの成分から出たか」を表す $Z_i$ が観測できたと仮定すると、完全データ対数尤度は扱いやすい形になる。期待値最大化法は、

- 現在の母数で $Z_i$ の条件付き分布を計算する。
- その条件付き分布で完全データ対数尤度を平均する。
- その平均を新しい母数について最大化する。

という操作を繰り返す方法である。

重要なのは、第3問の最大化時には **$r_i^{(m)}$ は現在値 $\theta^{(m)}$ から既に計算済みの定数**として扱うことである。

### 1. 完全データ尤度と対数尤度

$Z_i=1$ なら観測 $x_i$ は成分1から生じ、$Z_i=0$ なら成分2から生じる。したがって、完全データ $(x_i,Z_i)$ の確率を1つの式で

$$
\{\pi p(x_i\mid\lambda_1)\}^{Z_i}
\{(1-\pi)p(x_i\mid\lambda_2)\}^{1-Z_i}
$$

と書ける。

独立性から完全データ尤度は

$$
L_c(\theta; x,z)
=\prod_{i=1}^n
\{\pi p(x_i\mid\lambda_1)\}^{Z_i}
\{(1-\pi)p(x_i\mid\lambda_2)\}^{1-Z_i}.
$$

ポアソン分布の確率質量関数を代入すると

$$
\begin{aligned}
L_c
&=\prod_{i=1}^n
\left\{
\pi\frac{e^{-\lambda_1}\lambda_1^{x_i}}{x_i!}
\right\}^{Z_i}
\left\{
(1-\pi)\frac{e^{-\lambda_2}\lambda_2^{x_i}}{x_i!}
\right\}^{1-Z_i}.
\end{aligned}
$$

対数を取ると

$$
\begin{aligned}
\ell_c(\theta;x,z)
&=\sum_{i=1}^n Z_i
\{\log\pi-\lambda_1+x_i\log\lambda_1-\log(x_i!)\}\\
&\quad+\sum_{i=1}^n(1-Z_i)
\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2-\log(x_i!)\}.
\end{aligned}
$$

$Z_i+(1-Z_i)=1$ なので、$-\log(x_i!)$ の部分は

$$
-\sum_{i=1}^n\log(x_i!)
$$

にまとまる。この項は $\theta$ に依存しない。従って

$$
\boxed{
\ell_c(\theta;x,z)
=\sum_{i=1}^n\left[
Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right]+C
}.
$$

### 2. 期待値計算ステップ：現在値で責任度を求める

現在の反復値を

$$
\theta^{(m)}
=\left(\pi^{(m)},\lambda_1^{(m)},\lambda_2^{(m)}\right)
$$

とする。

$Z_i$ は0-1変数なので

$$
r_i^{(m)}
=E_{\theta^{(m)}}[Z_i\mid x_i]
=P_{\theta^{(m)}}(Z_i=1\mid x_i).
$$

ベイズ則より

$$
\begin{aligned}
r_i^{(m)}
&=\frac{
P_{\theta^{(m)}}(Z_i=1)
P_{\theta^{(m)}}(x_i\mid Z_i=1)
}
{
\sum_{z=0}^1
P_{\theta^{(m)}}(Z_i=z)
P_{\theta^{(m)}}(x_i\mid Z_i=z)
}\\
&=\boxed{
\frac{
\pi^{(m)}p(x_i\mid\lambda_1^{(m)})
}
{
\pi^{(m)}p(x_i\mid\lambda_1^{(m)})
+\{1-\pi^{(m)}\}p(x_i\mid\lambda_2^{(m)})
}
}.
\end{aligned}
$$

この $r_i^{(m)}$ は「現在の母数の下で、観測 $x_i$ が成分1に属する条件付き確率」である。

### 3. 最大化ステップ：$Q(\theta\mid\theta^{(m)})$ を最大化する

完全データ対数尤度を、現在値 $\theta^{(m)}$ の下での $Z\mid X=x$ について平均する。

$$
Q(\theta\mid\theta^{(m)})
=E_{\theta^{(m)}}[
\ell_c(\theta;X,Z)\mid X=x
].
$$

ここでは期待値を取る分布を決める母数は $\theta^{(m)}$、最大化したい変数は新しい $\theta$ である。この2つを混同しないことが重要である。

$$
E_{\theta^{(m)}}[Z_i\mid x_i]=r_i^{(m)},
\qquad
E_{\theta^{(m)}}[1-Z_i\mid x_i]=1-r_i^{(m)}
$$

だから、母数に依存する部分は

$$
\begin{aligned}
Q(\theta\mid\theta^{(m)})
&=\sum_{i=1}^n\Bigl[
r_i^{(m)}\{\log\pi-\lambda_1+x_i\log\lambda_1\}\\
&\qquad+\{1-r_i^{(m)}\}
\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\Bigr]+C.
\end{aligned}
$$

以下、$r_i^{(m)}$ は固定された数として扱う。

#### $\pi$ の更新

$\pi$ を含む項は

$$
Q_\pi
=\sum_{i=1}^n
\left\{
r_i^{(m)}\log\pi
+\{1-r_i^{(m)}\}\log(1-\pi)
\right\}.
$$

偏微分すると

$$
\frac{\partial Q}{\partial\pi}
=\sum_{i=1}^n
\left\{
\frac{r_i^{(m)}}{\pi}
-\frac{1-r_i^{(m)}}{1-\pi}
\right\}.
$$

0と置いて分母を払うと

$$
\sum_i r_i^{(m)}(1-\pi)
-\pi\sum_i\{1-r_i^{(m)}\}=0.
$$

整理して

$$
\sum_i r_i^{(m)}-n\pi=0.
$$

したがって

$$
\boxed{
\pi^{(m+1)}
=\frac1n\sum_{i=1}^n r_i^{(m)}
}.
$$

#### $\lambda_1$ の更新

$$
Q_{\lambda_1}
=\sum_i r_i^{(m)}
(-\lambda_1+x_i\log\lambda_1).
$$

偏微分すると

$$
\frac{\partial Q}{\partial\lambda_1}
=-\sum_i r_i^{(m)}
+\frac1{\lambda_1}\sum_i r_i^{(m)}x_i.
$$

0と置いて整理すると

$$
\boxed{
\lambda_1^{(m+1)}
=\frac{\sum_i r_i^{(m)}x_i}
{\sum_i r_i^{(m)}}
}.
$$

#### $\lambda_2$ の更新

同様に

$$
Q_{\lambda_2}
=\sum_i\{1-r_i^{(m)}\}
(-\lambda_2+x_i\log\lambda_2)
$$

なので

$$
\boxed{
\lambda_2^{(m+1)}
=\frac{\sum_i\{1-r_i^{(m)}\}x_i}
{\sum_i\{1-r_i^{(m)}\}}
}.
$$

例えば $\lambda_1$ について

$$
\frac{\partial^2Q}{\partial\lambda_1^2}
=-\frac1{\lambda_1^2}
\sum_i r_i^{(m)}x_i
\le0,
$$

であり、通常の非退化な場合には上の停留点が最大点になる。$\pi$ と $\lambda_2$ についても同様に確認できる。

### 4. 反復とラベル交換

以上を

$$
\theta^{(m)}
\longrightarrow
r_1^{(m)},\ldots,r_n^{(m)}
\longrightarrow
\theta^{(m+1)}
$$

と反復する。

収束まで何十回も数値計算する作業は計算機向きであり、手計算試験で評価すべき主題は

- 潜在変数を導入して完全データ尤度を書けること。
- ベイズ則から責任度を導けること。
- 現在値で計算した責任度を固定して最大化し、更新式を導けること。

である。

また

$$
(\pi,\lambda_1,\lambda_2)
$$

と

$$
(1-\pi,\lambda_2,\lambda_1)
$$

は成分の名前を交換しただけで同じ混合分布を表す。これをラベル交換による非識別性という。

必要なら

$$
\lambda_1<\lambda_2
$$

などの規約を置いて成分ラベルを固定する。

## 本番答案

完全データ尤度は

$$
L_c
=\prod_i
\left\{\pi\frac{e^{-\lambda_1}\lambda_1^{x_i}}{x_i!}\right\}^{Z_i}
\left\{(1-\pi)\frac{e^{-\lambda_2}\lambda_2^{x_i}}{x_i!}\right\}^{1-Z_i}.
$$

現在値

$$
\theta^{(m)}
=(\pi^{(m)},\lambda_1^{(m)},\lambda_2^{(m)})
$$

に対しベイズ則から

$$
r_i^{(m)}
=\frac{
\pi^{(m)}p(x_i\mid\lambda_1^{(m)})
}
{
\pi^{(m)}p(x_i\mid\lambda_1^{(m)})
+\{1-\pi^{(m)}\}p(x_i\mid\lambda_2^{(m)})
}.
$$

$$
Q(\theta\mid\theta^{(m)})
=E_{\theta^{(m)}}[
\ell_c(\theta;X,Z)\mid X=x
]
$$

では $r_i^{(m)}$ を固定値として扱う。各母数で偏微分して0と置けば

$$
\pi^{(m+1)}
=\frac1n\sum_i r_i^{(m)},
$$

$$
\lambda_1^{(m+1)}
=\frac{\sum_i r_i^{(m)}x_i}{\sum_i r_i^{(m)}},
\qquad
\lambda_2^{(m+1)}
=\frac{\sum_i\{1-r_i^{(m)}\}x_i}
{\sum_i\{1-r_i^{(m)}\}}.
$$

成分ラベルを交換した

$$
(\pi,\lambda_1,\lambda_2)
\quad\text{と}\quad
(1-\pi,\lambda_2,\lambda_1)
$$

は同じ混合分布を表す。

## 採点基準

- 完全データ尤度・対数尤度: 4点
- 現在値を明示した責任度の導出: 5点
- $Q(\theta\mid\theta^{(m)})$ の意味と母数の役割分離: 3点
- 最大化ステップの更新式導出: 6点
- 反復とラベル交換の説明: 2点
