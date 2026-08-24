# Core 31 Monte Carlo推定量の分散比較

- 旧No.: 87
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ○・修正済（必要な数値定数を供給）

## 問題

標準正規密度を$\phi$とし

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

方法1の指示変数はBernoulli$(\theta)$なので

$$
\boxed{
Var(\widehat\theta_1)
=\frac{\theta(1-\theta)}n
\approx\frac{0.22483}{n}
}.
$$

方法2では$P(|Z|\le1)=2\theta$。従って

$$
E[\widehat\theta_2]=\frac12(2\theta)=\theta,
$$

$$
\boxed{
Var(\widehat\theta_2)
=\frac{1}{4n}(2\theta)(1-2\theta)
=\frac{\theta(1-2\theta)}{2n}
\approx\frac{0.05416}{n}
}.
$$

方法3は

$$
E[\phi(U)]=\int_0^1\phi(u)du=\theta
$$

なので不偏。また

$$
Var(\phi(U))
=\int_0^1\phi(u)^2du-\theta^2
$$

より

$$
\boxed{
Var(\widehat\theta_3)
=\frac{0.118861-\theta^2}{n}
\approx\frac{0.002345}{n}
}.
$$

従って方法3が圧倒的に小分散。重要なのは「同じ期待値表示でも、指示変数より滑らかな被積分関数を平均した方が分散を下げられる」点である。

## 本番答案

方法1はBernoulli$(\theta)$より

$$
Var(\hat\theta_1)=\theta(1-\theta)/n\approx0.22483/n.
$$

方法2は$P(|Z|\le1)=2\theta$より

$$
Var(\hat\theta_2)=\theta(1-2\theta)/(2n)\approx0.05416/n.
$$

方法3は$E[\phi(U)]=\theta$で

$$
Var(\hat\theta_3)=\{0.118861-\theta^2\}/n\approx0.002345/n.
$$

したがって方法3が最小分散。

## 採点基準

- 不偏性: 6点
- 方法1・2の分散: 6点
- 方法3の分散: 5点
- 効率比較: 3点
