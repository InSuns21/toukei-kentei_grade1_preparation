# Core 25 Weibull寿命モデル・最尤推定量・デルタ法

- 安定ID: `RIKOU-CORE-25`
- 80大問 No.: 03
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

形状母数 $k>0$ が既知の Weibull 分布

$$
F(t)=1-\exp\left\{-\left(\frac{t}{\eta}\right)^k\right\},\qquad t>0
$$

から完全データ $T_1,\dots,T_n$ を得る。$\theta=\eta^k$ とおく。

1. $Y_i=T_i^k$ の分布を求めよ。
2. $\theta$ の最尤推定量を尤度から導き、それから $\eta$ の最尤推定量を求めよ。
3. $\hat\theta$ の漸近分布を求め、デルタ法により $\hat\eta$ の漸近分散を求めよ。
4. 時刻 $t_0$ における信頼度 $R(t_0)$ の推定量と、その漸近分散をデルタ法で求めよ。

## 詳細解答

### 1. $Y_i=T_i^k$ の分布

$Y_i$ は単調増加変換なので、$y>0$ に対して

$$
\begin{aligned}
P(Y_i\le y)
&=P(T_i^k\le y)\\
&=P(T_i\le y^{1/k})\\
&=F(y^{1/k}).
\end{aligned}
$$

Weibull分布の分布関数を代入すると

$$
\begin{aligned}
P(Y_i\le y)
&=1-\exp\left\{-\left(\frac{y^{1/k}}{\eta}\right)^k\right\}\\
&=1-\exp\left(-\frac{y}{\eta^k}\right)\\
&=1-e^{-y/\theta}.
\end{aligned}
$$

これは平均母数 $\theta$ の指数分布の分布関数である。従って

$$
\boxed{Y_i\sim\operatorname{Exponential}(\text{mean }\theta)}.
$$

密度は

$$
\boxed{
f_Y(y;\theta)=\frac{1}{\theta}e^{-y/\theta},\qquad y>0
}.
$$

第2問ではこの密度から最尤推定量を導く。

### 2. $\theta$ と $\eta$ の最尤推定量

$Y_1,\ldots,Y_n$ は独立だから、観測値 $y_i=t_i^k$ に対する尤度は

$$
\begin{aligned}
L(\theta)
&=\prod_{i=1}^n\frac{1}{\theta}e^{-y_i/\theta}\\
&=\theta^{-n}\exp\left(-\frac{1}{\theta}\sum_{i=1}^ny_i\right),
\qquad \theta>0.
\end{aligned}
$$

対数尤度は

$$
\ell(\theta)
=-n\log\theta-\frac{1}{\theta}\sum_{i=1}^ny_i.
$$

$S=\sum_{i=1}^ny_i$ とおくと

$$
\frac{d\ell}{d\theta}
=-\frac{n}{\theta}+\frac{S}{\theta^2}
=\frac{S-n\theta}{\theta^2}.
$$

停留条件 $d\ell/d\theta=0$ から

$$
S-n\theta=0,
$$

従って

$$
\hat\theta=\frac{S}{n}
=\frac{1}{n}\sum_{i=1}^ny_i.
$$

これが最大であることも確認する。2階微分は

$$
\frac{d^2\ell}{d\theta^2}
=\frac{n}{\theta^2}-\frac{2S}{\theta^3}.
$$

$S=n\hat\theta$ を代入すると

$$
\left.\frac{d^2\ell}{d\theta^2}\right|_{\theta=\hat\theta}
=\frac{n}{\hat\theta^2}-\frac{2n\hat\theta}{\hat\theta^3}
=-\frac{n}{\hat\theta^2}<0.
$$

したがって

$$
\boxed{
\hat\theta=\frac{1}{n}\sum_{i=1}^nT_i^k
}.
$$

ここで「指数分布の最尤推定量は標本平均」と既知結果を置くだけではなく、尤度から導出したことが採点上重要である。

次に

$$
\eta=\theta^{1/k}
$$

であり、$k>0$ なのでこれは $\theta>0$ 上で1対1の単調変換である。最尤推定量の不変性から

$$
\boxed{
\hat\eta=\hat\theta^{1/k}
=\left(\frac{1}{n}\sum_{i=1}^nT_i^k\right)^{1/k}
}.
$$

### 3. $\hat\theta$ の漸近分布と $\hat\eta$ へのデルタ法

第1問から $Y_i$ は独立同分布で

$$
E[Y_i]=\theta,
\qquad
\operatorname{Var}(Y_i)=\theta^2<\infty.
$$

従って独立同分布かつ有限分散という中心極限定理の条件を満たす。

$$
\hat\theta=\bar Y
$$

だから

$$
\boxed{
\sqrt n(\hat\theta-\theta)
\xrightarrow{d}N(0,\theta^2)
}.
$$

同値に、大標本では

$$
\hat\theta\approx N\left(\theta,\frac{\theta^2}{n}\right).
$$

次に

$$
g(\theta)=\theta^{1/k}
$$

とおく。$\theta>0$ で微分可能で

$$
g'(\theta)
=\frac{1}{k}\theta^{1/k-1}.
$$

デルタ法より

$$
\sqrt n\{g(\hat\theta)-g(\theta)\}
\xrightarrow{d}
N\left(0,\{g'(\theta)\}^2\theta^2\right).
$$

$g(\theta)=\eta$ なので

$$
\begin{aligned}
\{g'(\theta)\}^2\theta^2
&=\frac{1}{k^2}\theta^{2/k-2}\theta^2\\
&=\frac{1}{k^2}\theta^{2/k}\\
&=\frac{\eta^2}{k^2}.
\end{aligned}
$$

したがって

$$
\boxed{
\sqrt n(\hat\eta-\eta)
\xrightarrow{d}
N\left(0,\frac{\eta^2}{k^2}\right)
},
$$

従って $\hat\eta$ の漸近分散は

$$
\boxed{
\operatorname{Avar}(\hat\eta)
=\frac{\eta^2}{k^2n}
}.
$$

### 4. 信頼度推定量とその漸近分散

Weibull分布の信頼度は

$$
R(t_0)=P(T>t_0)
=\exp\left\{-\left(\frac{t_0}{\eta}\right)^k\right\}.
$$

$\theta=\eta^k$ を使うと

$$
R(t_0)=\exp\left(-\frac{t_0^k}{\theta}\right).
$$

最尤推定量の不変性により、plug-in推定量は

$$
\boxed{
\hat R(t_0)
=\exp\left(-\frac{t_0^k}{\hat\theta}\right)
}.
$$

ここで

$$
h(\theta)=\exp\left(-\frac{t_0^k}{\theta}\right)
$$

とおく。微分すると

$$
\begin{aligned}
h'(\theta)
&=\exp\left(-\frac{t_0^k}{\theta}\right)
\frac{t_0^k}{\theta^2}\\
&=R(t_0)\frac{t_0^k}{\theta^2}.
\end{aligned}
$$

第3問で

$$
\sqrt n(\hat\theta-\theta)
\xrightarrow{d}N(0,\theta^2)
$$

を得ているので、デルタ法から

$$
\sqrt n\{\hat R(t_0)-R(t_0)\}
\xrightarrow{d}
N\left(
0,
\left\{R(t_0)\frac{t_0^k}{\theta^2}\right\}^2\theta^2
\right).
$$

従って

$$
\boxed{
\operatorname{Avar}\{\hat R(t_0)\}
=\frac{R(t_0)^2t_0^{2k}}{n\theta^2}
}.
$$

実際に標準誤差を推定するときは未知の $\theta,R(t_0)$ を $\hat\theta,\hat R(t_0)$ で置き換える。

## 本番答案

$Y_i=T_i^k$ とおくと

$$
P(Y_i\le y)
=1-e^{-y/\theta},
\qquad \theta=\eta^k,
$$

よって

$$
f_Y(y;\theta)=\theta^{-1}e^{-y/\theta}.
$$

独立性から

$$
L(\theta)
=\theta^{-n}\exp\left(-\frac{\sum y_i}{\theta}\right),
$$

$$
\ell(\theta)
=-n\log\theta-\frac{\sum y_i}{\theta}.
$$

したがって

$$
\ell'(\theta)
=-\frac{n}{\theta}+\frac{\sum y_i}{\theta^2}=0
$$

より

$$
\hat\theta=\frac{1}{n}\sum T_i^k,
\qquad
\hat\eta=\hat\theta^{1/k}.
$$

$Y_i$ は独立同分布で平均 $\theta$、分散 $\theta^2$ だから中心極限定理により

$$
\sqrt n(\hat\theta-\theta)\to N(0,\theta^2).
$$

$g(\theta)=\theta^{1/k}$ にデルタ法を使って

$$
\operatorname{Avar}(\hat\eta)=\frac{\eta^2}{k^2n}.
$$

また

$$
R(t_0)=e^{-t_0^k/\theta},
\qquad
\hat R(t_0)=e^{-t_0^k/\hat\theta},
$$

$$
R'(\theta)=R(t_0)t_0^k/\theta^2
$$

より

$$
\operatorname{Avar}\{\hat R(t_0)\}
=\frac{R(t_0)^2t_0^{2k}}{n\theta^2}.
$$

## 採点基準

- (1) 分布関数を変換して指数分布を同定: 4点
- (2) 指数分布の尤度・対数尤度を作り、微分から $\hat\theta$ を導出: 6点
- (2) 最尤推定量の不変性から $\hat\eta$ を得る: 2点
- (3) 中心極限定理の条件確認と $\hat\theta$ の漸近分布: 3点
- (3) $g'(\theta)$ を明示して $\hat\eta$ へデルタ法: 2点
- (4) 信頼度を $\theta$ の関数として微分しデルタ法: 3点

25分経過時は「指数分布だから標本平均」と書かず、少なくとも

$$
\ell(\theta)=-n\log\theta-\frac{\sum y_i}{\theta}
$$

からスコア方程式を1段残す。