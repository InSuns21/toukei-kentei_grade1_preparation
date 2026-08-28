# Standard 20 右打切り指数寿命・観測尤度

- 旧No.: 60
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

寿命 $T_1,\ldots,T_n$ は独立に、率母数 $\lambda>0$ の指数分布

$$
f_T(t;\lambda)=
\begin{cases}
\lambda e^{-\lambda t},&t>0,\\
0,&t\le0
\end{cases}
$$

に従う。したがって生存関数は

$$
S_T(t;\lambda)=P(T_i>t)=e^{-\lambda t},
\qquad t\ge0.
$$

各個体には打切り時刻 $C_i$ があり、観測されるのは

$$
Y_i=\min(T_i,C_i),
\qquad
\delta_i=\boldsymbol1_{\{T_i\le C_i\}}
$$

である。$C_i$ は $T_i$ と独立であり、打切り機構の分布は $\lambda$ を含まないものとする。

1. $\lambda$ に関する観測尤度を書け。
2. $D=\sum_{i=1}^n\delta_i$, $R=\sum_{i=1}^nY_i$ を使って最尤推定量を求めよ。
3. $D=0$ の場合を説明せよ。

## 詳細解答

### 1. 観測尤度

右打切りでは、$\delta_i$ の値によって観測から得られる情報が異なる。

- $\delta_i=1$ のときは $T_i=Y_i$ とイベント時刻そのものを観測している。従って $\lambda$ に関する寄与は密度
  $$
  f_T(Y_i;\lambda)=\lambda e^{-\lambda Y_i}
  $$
  である。
- $\delta_i=0$ のときは $T_i>Y_i$ としか分からない。従って寄与は生存確率
  $$
  S_T(Y_i;\lambda)=e^{-\lambda Y_i}
  $$
  である。

この2つをまとめると第 $i$ 観測の寄与は

$$
\{f_T(Y_i;\lambda)\}^{\delta_i}
\{S_T(Y_i;\lambda)\}^{1-\delta_i}.
$$

指数分布の式を代入すれば

$$
\begin{aligned}
&\{\lambda e^{-\lambda Y_i}\}^{\delta_i}
\{e^{-\lambda Y_i}\}^{1-\delta_i}\\
&\qquad=\lambda^{\delta_i}e^{-\lambda Y_i}.
\end{aligned}
$$

打切り時刻 $C_i$ の分布にも本来は尤度因子があるが、独立打切りかつその分布が $\lambda$ を含まないので、$\lambda$ の最尤推定では定数因子として落とせる。

従って

$$
\begin{aligned}
L(\lambda)
&\propto\prod_{i=1}^n
\lambda^{\delta_i}e^{-\lambda Y_i}\\
&=\lambda^{\sum_i\delta_i}
 e^{-\lambda\sum_iY_i}\\
&=\boxed{\lambda^D e^{-\lambda R}}.
\end{aligned}
$$

### 2. 最尤推定量

対数尤度は

$$
\ell(\lambda)=D\log\lambda-\lambda R.
$$

$D>0$ のとき

$$
\ell'(\lambda)=\frac D\lambda-R.
$$

停留条件

$$
\ell'(\lambda)=0
$$

から

$$
\widehat\lambda=\frac DR.
$$

さらに

$$
\ell''(\lambda)=-\frac D{\lambda^2}<0
$$

なので、この停留点は一意な最大点である。従って

$$
\boxed{\widehat\lambda=\frac DR},
\qquad D>0.
$$

この式は

$$
\frac{\text{観測されたイベント数}}
{\text{総観測時間}}
$$

という形であり、指数分布の一定ハザード率を自然に推定している。

### 3. $D=0$ の場合

イベントが1件も観測されないと

$$
L(\lambda)=e^{-\lambda R}.
$$

$R>0$ なら

$$
\frac{d}{d\lambda}L(\lambda)
=-R e^{-\lambda R}<0
$$

なので、尤度は $\lambda>0$ で単調減少する。

したがって母数空間を

$$
\lambda>0
$$

とするなら、有限の正の内部最尤推定量は存在しない。尤度の上限は

$$
\lambda\downarrow0
$$

で近づく。

一方、母数空間を閉じて

$$
\lambda\ge0
$$

まで許せば境界点

$$
\boxed{\widehat\lambda=0}
$$

で最大になる。

「イベントが一度も起きていないため、観測データは故障率をできるだけ小さくする方向にしか情報を与えない」と解釈できる。

## 本番答案

右打切り観測 $(Y_i,\delta_i)$ の $\lambda$ に関する寄与は

$$
[f_T(Y_i)]^{\delta_i}
[S_T(Y_i)]^{1-\delta_i}
$$

である。指数分布では

$$
f_T(y)=\lambda e^{-\lambda y},
\qquad
S_T(y)=e^{-\lambda y}
$$

だから

$$
L(\lambda)
\propto\prod_{i=1}^n
\lambda^{\delta_i}e^{-\lambda Y_i}
=\lambda^D e^{-\lambda R}.
$$

従って

$$
\ell(\lambda)=D\log\lambda-\lambda R.
$$

$D>0$ なら

$$
\ell'(\lambda)=D/\lambda-R=0
$$

より

$$
\boxed{\widehat\lambda=D/R},
$$

かつ $\ell''(\lambda)<0$。$D=0$ では尤度は $\lambda$ に単調減少し、$\lambda>0$ では内部最尤推定量は存在しない。

## 採点基準

- 打切り観測が密度・生存関数へ分かれる理由: 6点
- 観測尤度の構成: 5点
- 最尤推定量（微分・最大性）: 6点
- $D=0$ の境界解釈: 3点
