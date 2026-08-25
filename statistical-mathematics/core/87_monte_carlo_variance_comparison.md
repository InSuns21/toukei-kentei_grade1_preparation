# Core 31 Monte Carlo推定量の分散比較

- 旧No.: 87
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ○・修正済（必要な数値定数を供給）

## 問題

標準正規密度を $\phi$ とし

$$
\theta=P(0\le Z\le1)=0.3413447
$$

をMonte Carloで推定する。

### 方法1
$Z_i\sim N(0,1)$として

$$
\widehat\theta_1=\frac1n\sum1\{0\le Z_i\le1\}.
$$

### 方法2
同じ$Z_i$について

$$
\widehat\theta_2=\frac1{2n}\sum1\{|Z_i|\le1\}.
$$

### 方法3
$U_i\sim U(0,1)$として

$$
\widehat\theta_3=\frac1n\sum\phi(U_i).
$$

なお

$$
\int_0^1\phi(u)^2du=0.118861
$$

を用いてよい。

1. 3推定量が不偏であることを示せ。
2. それぞれの分散を求めよ。
3. 1回当たり分散係数を比較し、どの方法が最も効率的か答えよ。

## 詳細解答

### 1. 3推定量の不偏性

方法1で $I_i=1\{0\le Z_i\le1\}$ とおくと $P(I_i=1)=\theta$ なので

$$
E[\widehat\theta_1]=\frac1n\sum E[I_i]=\theta.
$$

方法2で $J_i=1\{|Z_i|\le1\}$ とおく。標準正規分布は0について対称だから

$$
P(J_i=1)=P(-1\le Z_i\le1)=2\theta.
$$

従って

$$
E[\widehat\theta_2]=\frac1{2n}\sum E[J_i]=\theta.
$$

方法3では一様分布の密度が $(0,1)$ で1なので

$$
E[\phi(U_i)]=\int_0^1\phi(u)du=\theta,
$$

よって $E[\widehat\theta_3]=\theta$。したがって3推定量はすべて不偏である。

### 2. それぞれの分散

#### 方法1

$I_i\sim\operatorname{Bernoulli}(\theta)$ なので

$$
\operatorname{Var}(I_i)=\theta(1-\theta).
$$

独立性から

$$
\operatorname{Var}(\widehat\theta_1)
=\frac{\theta(1-\theta)}n
\approx\boxed{\frac{0.22483}{n}}.
$$

#### 方法2

$J_i\sim\operatorname{Bernoulli}(2\theta)$ なので

$$
\operatorname{Var}(J_i)=(2\theta)(1-2\theta).
$$

従って

$$
\operatorname{Var}(\widehat\theta_2)
=\frac{(2\theta)(1-2\theta)}{4n}
=\frac{\theta(1-2\theta)}{2n}
\approx\boxed{\frac{0.05416}{n}}.
$$

#### 方法3

1回の分散は

$$
\begin{aligned}
\operatorname{Var}(\phi(U_i))
&=E[\phi(U_i)^2]-E[\phi(U_i)]^2\\
&=\int_0^1\phi(u)^2du-\theta^2\\
&=0.118861-\theta^2.
\end{aligned}
$$

独立性から

$$
\operatorname{Var}(\widehat\theta_3)
=\frac{0.118861-\theta^2}{n}
\approx\boxed{\frac{0.002345}{n}}.
$$

### 3. 分散係数の比較

各分散は $c/n$ の形なので係数

$$
0.22483,\qquad0.05416,\qquad0.002345
$$

を比較すればよい。従って

$$
\boxed{\operatorname{Var}(\widehat\theta_3)<\operatorname{Var}(\widehat\theta_2)<\operatorname{Var}(\widehat\theta_1)}
$$

で、方法3が最も効率的である。

## 本番答案

$E[I_i]=\theta$、$E[J_i]=2\theta$、$E[\phi(U_i)]=\int_0^1\phi(u)du=\theta$ より3推定量はすべて不偏。独立性から

$$
\operatorname{Var}(\widehat\theta_1)=\frac{\theta(1-\theta)}n,
$$

$$
\operatorname{Var}(\widehat\theta_2)=\frac{(2\theta)(1-2\theta)}{4n},
$$

$$
\operatorname{Var}(\widehat\theta_3)=\frac{0.118861-\theta^2}{n}.
$$

数値係数は順に約 $0.22483,0.05416,0.002345$ なので方法3が最小分散。

## 採点基準

- 3方法の不偏性: 6点
- 方法1・2の分散導出: 6点
- 方法3の分散導出: 5点
- 効率比較: 3点
