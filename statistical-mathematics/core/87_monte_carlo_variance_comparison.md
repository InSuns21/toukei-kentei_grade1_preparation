# Core 31 Monte Carlo推定量の分散比較

- 旧No.: 87
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ○・修正済（必要な数値定数を供給）

## 問題

標準正規分布に従う確率変数を $Z\sim N(0,1)$、その密度を $\phi$ とし、

$$
\theta=P(0\le Z\le1)=\int_0^1\phi(z)\,dz=0.3413447
$$

を Monte Carlo 法で推定する。

以下では、各方法で用いる標本は互いに独立で同一分布（i.i.d.）とする。また、$\boldsymbol{1}_{\{A\}}$ は事象 $A$ が起これば1、起こらなければ0をとる指示関数を表す。

### 方法1：事象をそのまま数える

$Z_1,\dots,Z_n\overset{\mathrm{i.i.d.}}{\sim}N(0,1)$ として

$$
\widehat\theta_1=\frac1n\sum_{i=1}^n\boldsymbol{1}_{\{0\le Z_i\le1\}}.
$$

### 方法2：標準正規分布の対称性を利用する

方法1と同様に $Z_1,\dots,Z_n\overset{\mathrm{i.i.d.}}{\sim}N(0,1)$ とし、

$$
\widehat\theta_2=\frac1{2n}\sum_{i=1}^n\boldsymbol{1}_{\{|Z_i|\le1\}}.
$$

標準正規分布は0について対称なので、$P(|Z|\le1)=2\theta$ であることを利用している。

### 方法3：確率を積分として直接 Monte Carlo 評価する

$U_1,\dots,U_n\overset{\mathrm{i.i.d.}}{\sim}U(0,1)$ として

$$
\widehat\theta_3=\frac1n\sum_{i=1}^n\phi(U_i).
$$

ここで $U(0,1)$ は区間 $(0,1)$ 上の一様分布を表す。$U\sim U(0,1)$ なら密度は $(0,1)$ 上で1なので、

$$
E[\phi(U)]=\int_0^1\phi(u)\,du=\theta
$$

となり、確率 $\theta$ を「指示関数の平均」ではなく「積分の Monte Carlo 評価」として推定している。

なお

$$
\int_0^1\phi(u)^2du=0.118861
$$

を用いてよい。

1. 3推定量が不偏であることを示せ。
2. それぞれの分散を求めよ。
3. 各推定量の分散を $c/n$ と書いたときの係数 $c$ を比較し、1標本あたりの計算コストを同一とみなした場合にどの方法が最も効率的か答えよ。

## 詳細解答

### 0. 準備：この問題で使う2つの基本事実

#### 指示関数は Bernoulli 分布になる

事象 $A$ の確率を $p=P(A)$ とする。このとき

$$
I=\boldsymbol{1}_{\{A\}}
$$

は

$$
P(I=1)=p,\qquad P(I=0)=1-p
$$

を満たすので、

$$
I\sim\operatorname{Bernoulli}(p).
$$

したがって

$$
E[I]=p,\qquad \operatorname{Var}(I)=p(1-p).
$$

方法1・2で Bernoulli 分布が現れるのはこのためである。

#### i.i.d. 標本平均の分散

$X_1,\dots,X_n$ が独立同分布で $\operatorname{Var}(X_i)=\sigma^2$ なら、独立性より

$$
\begin{aligned}
\operatorname{Var}\left(\frac1n\sum_{i=1}^nX_i\right)
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)\\
&=\frac{\sigma^2}{n}.
\end{aligned}
$$

この $1/n$ が Monte Carlo 推定量の分散に繰り返し現れる。

### 1. 3推定量の不偏性

#### 方法1

$$
I_i=\boldsymbol{1}_{\{0\le Z_i\le1\}}
$$

とおくと

$$
P(I_i=1)=P(0\le Z_i\le1)=\theta.
$$

したがって $I_i\sim\operatorname{Bernoulli}(\theta)$ であり、

$$
E[I_i]=\theta.
$$

よって

$$
E[\widehat\theta_1]
=\frac1n\sum_{i=1}^nE[I_i]
=\theta.
$$

#### 方法2

$$
J_i=\boldsymbol{1}_{\{|Z_i|\le1\}}
$$

とおく。標準正規分布は0について対称だから

$$
\begin{aligned}
P(J_i=1)
&=P(-1\le Z_i\le1)\\
&=P(-1\le Z_i\le0)+P(0\le Z_i\le1)\\
&=2\theta.
\end{aligned}
$$

したがって $J_i\sim\operatorname{Bernoulli}(2\theta)$ であり、

$$
E[\widehat\theta_2]
=\frac1{2n}\sum_{i=1}^nE[J_i]
=\frac12(2\theta)
=\theta.
$$

方法1では負の標本の多くを単に0として捨てていたのに対し、方法2では分布の対称性という既知の情報を利用している。

#### 方法3

$U_i\sim U(0,1)$ の密度を $f_U(u)$ とすると、

$$
f_U(u)=1\qquad(0<u<1).
$$

したがって期待値の定義から

$$
\begin{aligned}
E[\phi(U_i)]
&=\int_{-\infty}^{\infty}\phi(u)f_U(u)\,du\\
&=\int_0^1\phi(u)\,du\\
&=\theta.
\end{aligned}
$$

よって

$$
E[\widehat\theta_3]
=\frac1n\sum_{i=1}^nE[\phi(U_i)]
=\theta.
$$

したがって3推定量はすべて不偏である。

### 2. それぞれの分散

#### 方法1

$I_i\sim\operatorname{Bernoulli}(\theta)$ なので

$$
\operatorname{Var}(I_i)=\theta(1-\theta).
$$

$I_1,\dots,I_n$ は独立だから

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_1)
&=\operatorname{Var}\left(\frac1n\sum_{i=1}^nI_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(I_i)\\
&=\frac{\theta(1-\theta)}n\\
&\approx\boxed{\frac{0.22483}{n}}.
\end{aligned}
$$

#### 方法2

$J_i\sim\operatorname{Bernoulli}(2\theta)$ なので

$$
\operatorname{Var}(J_i)=(2\theta)(1-2\theta).
$$

ここで推定量にはさらに係数 $1/2$ が掛かっていることに注意する。したがって

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_2)
&=\operatorname{Var}\left(\frac1{2n}\sum_{i=1}^nJ_i\right)\\
&=\frac1{4n^2}\sum_{i=1}^n\operatorname{Var}(J_i)\\
&=\frac{(2\theta)(1-2\theta)}{4n}\\
&=\frac{\theta(1-2\theta)}{2n}\\
&\approx\boxed{\frac{0.05416}{n}}.
\end{aligned}
$$

方法1に比べ、分散係数は約 $0.22483/0.05416\approx4.15$ 倍改善している。

#### 方法3

$X_i=\phi(U_i)$ とおく。まず1標本あたりの分散を求めると、

$$
\begin{aligned}
\operatorname{Var}(X_i)
&=E[X_i^2]-E[X_i]^2\\
&=E[\phi(U_i)^2]-E[\phi(U_i)]^2.
\end{aligned}
$$

一様分布の密度が $(0,1)$ 上で1であることから

$$
E[\phi(U_i)^2]
=\int_0^1\phi(u)^2\,du
=0.118861,
$$

また $E[\phi(U_i)]=\theta$ なので

$$
\operatorname{Var}(X_i)=0.118861-\theta^2.
$$

$X_1,\dots,X_n$ は独立だから

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_3)
&=\operatorname{Var}\left(\frac1n\sum_{i=1}^nX_i\right)\\
&=\frac{\operatorname{Var}(X_i)}n\\
&=\frac{0.118861-\theta^2}{n}\\
&\approx\boxed{\frac{0.002345}{n}}.
\end{aligned}
$$

方法3の分散が非常に小さいのは、$\boldsymbol{1}_{\{0\le Z\le1\}}$ のような0か1かの粗い変数ではなく、区間 $(0,1)$ 上で滑らかに変化する $\phi(U)$ を平均して積分を評価しているためである。

### 3. 分散係数の比較

各分散を

$$
\operatorname{Var}(\widehat\theta_k)=\frac{c_k}{n}
$$

と書くと、

$$
c_1\approx0.22483,\qquad
c_2\approx0.05416,\qquad
c_3\approx0.002345.
$$

したがって

$$
\boxed{\operatorname{Var}(\widehat\theta_3)
<\operatorname{Var}(\widehat\theta_2)
<\operatorname{Var}(\widehat\theta_1)}.
$$

方法3は方法1に比べて分散係数が約

$$
\frac{0.22483}{0.002345}\approx95.9
$$

分の1であり、同じ $n$ なら大幅に精度が高い。

よって、**1標本あたりの計算コストを同一とみなす限り**、方法3が最も効率的である。

> **注意：** ここで比較している「効率」は純粋に分散だけによる比較である。実際の計算時間まで含めた効率を比較するなら、乱数生成や $\phi$ の評価に要する計算コストも考慮する必要がある。

### この問題のポイント

同じ量 $\theta$ を推定する場合でも、推定量の作り方によって Monte Carlo 誤差は大きく変わる。

- 方法1：確率を指示関数の平均としてそのまま推定する。
- 方法2：標準正規分布の対称性という既知の情報を利用して分散を減らす。
- 方法3：確率を積分として書き換え、一様乱数による Monte Carlo 積分にする。

したがって Monte Carlo 法では、単に標本数 $n$ を増やすだけでなく、**同じ期待値をもつ、より分散の小さい確率変数へ表現を変える**ことが重要になる。

## 本番答案

$I_i=\boldsymbol{1}_{\{0\le Z_i\le1\}}$ とおけば $I_i\sim\operatorname{Bernoulli}(\theta)$、$J_i=\boldsymbol{1}_{\{|Z_i|\le1\}}$ とおけば標準正規分布の対称性より $J_i\sim\operatorname{Bernoulli}(2\theta)$ である。また $U_i\sim U(0,1)$ より

$$
E[\phi(U_i)]=\int_0^1\phi(u)\,du=\theta.
$$

したがって3推定量はいずれも不偏である。i.i.d. 標本平均の分散は1標本の分散の $1/n$ だから、

$$
\operatorname{Var}(\widehat\theta_1)=\frac{\theta(1-\theta)}n,
$$

$$
\operatorname{Var}(\widehat\theta_2)=\frac{(2\theta)(1-2\theta)}{4n},
$$

$$
\operatorname{Var}(\widehat\theta_3)=\frac{0.118861-\theta^2}{n}.
$$

分散係数は順に約 $0.22483,0.05416,0.002345$ なので、1標本あたりの計算コストを同一とみなせば方法3が最も効率的である。

## 採点基準

- 3方法の不偏性: 6点
- 方法1・2の分散導出: 6点
- 方法3の分散導出: 5点
- 効率比較: 3点
