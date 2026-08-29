# Standard 32 Weibull・生存関数・ハザード

- 旧No.: 96
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

Weibull分布の累積分布関数を

$$
F(t)=1-\exp\left[-\left(\frac t\lambda\right)^k\right],
\qquad t\ge0,
$$

$k,\lambda>0$ とする。

1. 生存関数 $S(t)$ を求めよ。
2. 密度 $f(t)$、ハザード $h(t)$、累積ハザード $H(t)$ を求めよ。
3. $k<1,k=1,k>1$ でハザード形状を分類せよ。
4. $\lambda$ の解釈を述べよ。

## 詳細解答

### 1. 生存関数

生存関数の定義は $S(t)=P(T>t)=1-F(t)$ なので

$$
\boxed{S(t)=\exp\left[-\left(\frac t\lambda\right)^k\right]}.
$$

### 2. 密度・ハザード・累積ハザード

密度は累積分布関数の微分である。$g(t)=(t/\lambda)^k$ とおけば

$$
g'(t)=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1}.
$$

したがって連鎖律から

$$
\boxed{f(t)=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1}
\exp\left[-\left(\frac t\lambda\right)^k\right]}.
$$

ハザードは $h(t)=f(t)/S(t)$ なので指数因子が約分され

$$
\boxed{h(t)=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1}}.
$$

累積ハザードは

$$
\begin{aligned}
H(t)
&=\int_0^th(u)du\\
&=\int_0^t\frac{k}{\lambda}\left(\frac u\lambda\right)^{k-1}du\\
&=\left[\left(\frac u\lambda\right)^k\right]_0^t\\
&=\boxed{\left(\frac t\lambda\right)^k}.
\end{aligned}
$$

### 3. 形状母数 $k$ とハザードの増減

$$
h(t)=\frac{k}{\lambda^k}t^{k-1}
$$

と書いて微分すると

$$
h'(t)=\frac{k(k-1)}{\lambda^k}t^{k-2}.
$$

$t>0$ では符号を決めるのは $k-1$ なので

$$
\boxed{
\begin{cases}
0<k<1 &: \text{減少ハザード},\\
k=1 &: \text{一定ハザード},\\
k>1 &: \text{増加ハザード}.
\end{cases}}
$$

$k=1$ では $S(t)=e^{-t/\lambda}$、$h(t)=1/\lambda$ となり指数分布である。

### 4. 尺度母数 $\lambda$ の解釈

$t=\lambda$ を代入すると

$$
S(\lambda)=e^{-1}.
$$

従って $\lambda$ は生存率が $e^{-1}$ まで低下する時間であり、分布全体の時間尺度を決める母数である。

## 本番答案

$$
S(t)=e^{-(t/\lambda)^k}.
$$

連鎖律から

$$
f(t)=\frac{k}{\lambda}(t/\lambda)^{k-1}e^{-(t/\lambda)^k},
$$

従って

$$
h(t)=\frac{k}{\lambda}(t/\lambda)^{k-1}.
$$

さらに

$$
H(t)=\int_0^th(u)du=(t/\lambda)^k.
$$

$$
h'(t)=\frac{k(k-1)}{\lambda^k}t^{k-2}
$$

なので $k<1$ で減少、$k=1$ で一定、$k>1$ で増加。$S(\lambda)=e^{-1}$ だから $\lambda$ は寿命の時間尺度を表す。

## 採点基準

- 生存関数・密度の導出: 6点
- ハザード: 5点
- 累積ハザードの積分: 3点
- 形状母数・尺度母数の解釈: 6点
