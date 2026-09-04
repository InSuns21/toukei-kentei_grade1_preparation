# Core 07 指数寿命モデルでワルド・尤度比・スコア検定を比較する

- 安定ID: `RIKOU-CORE-07`
- 80大問 No.: 74
- 演習価値: S
- 難度: S
- 目安時間: 30分

## 問題

ある部品の寿命 $X_1,\dots,X_n$ は独立に、平均寿命を $\theta>0$ とする指数分布

$$
f_\theta(x)
=\frac1\theta\exp\left(-\frac{x}{\theta}\right),
\qquad x\ge 0
$$

に従うとする。既知の基準値 $\theta_0>0$ に対して

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta\ne\theta_0
$$

を考える。

1. 確率密度関数から尤度・対数尤度を作り、$\theta$ の最尤推定量 $\widehat\theta$ と1標本当たりのフィッシャー情報量 $I_1(\theta)$ を求めよ。
2. 最尤推定量の漸近正規性からワルド統計量を構成し、$H_0$ の下での漸近分布を示せ。
3. スコア関数からスコア統計量を導け。また尤度比から尤度比統計量を導き、Wilks の定理を適用するために本問で確認すべき条件を述べよ。
4. $n=100$, $\sum_{i=1}^{100}X_i=120$, $\theta_0=1$ のとき、ワルド・スコア・尤度比の3統計量を求めよ。対数の小数化は不要とする。また、自由度1のカイ二乗分布の上側5%点を $3.84$ として、それぞれの判定を述べよ。
5. 有限標本では3統計量が一致しない一方、$H_0$ の下では漸近的に一致することを、$\widehat\theta-\theta_0=O_p(n^{-1/2})$ と Taylor 展開を用いて示せ。

## 詳細解答

### 1. 尤度・最尤推定量・フィッシャー情報量

観測値を $x_1,\ldots,x_n$ とし、

$$
T=\sum_{i=1}^n x_i
$$

と置く。独立性から尤度は各標本の確率密度関数の積である。

$$
\begin{aligned}
L(\theta)
&=\prod_{i=1}^n
\frac1\theta\exp\left(-\frac{x_i}{\theta}\right)\\
&=\theta^{-n}
\exp\left(-\frac1\theta\sum_{i=1}^n x_i\right)\\
&=\boxed{
\theta^{-n}\exp\left(-\frac{T}{\theta}\right)
}.
\end{aligned}
$$

対数を取ると

$$
\boxed{
\ell(\theta)
=-n\log\theta-\frac{T}{\theta}
}.
$$

$\theta$ で微分する。

$$
\begin{aligned}
\ell'(\theta)
&=-\frac{n}{\theta}+\frac{T}{\theta^2}\\
&=\frac{T-n\theta}{\theta^2}.
\end{aligned}
$$

内部の停留点では $\ell'(\theta)=0$ だから

$$
T-n\theta=0.
$$

したがって

$$
\boxed{
\widehat\theta=\frac{T}{n}=\overline X
}.
$$

指数分布では $P(T=0)=0$ なので、確率1で $T>0$ である。さらに

$$
\ell''(\theta)
=\frac{n}{\theta^2}-\frac{2T}{\theta^3}.
$$

$\theta=\widehat\theta=T/n$ を代入すると

$$
\begin{aligned}
\ell''(\widehat\theta)
&=\frac{n}{\widehat\theta^2}
-\frac{2n\widehat\theta}{\widehat\theta^3}\\
&=-\frac{n}{\widehat\theta^2}<0,
\end{aligned}
$$

よって $\widehat\theta$ は最大点である。

次に1標本 $X$ の対数尤度を

$$
\ell_1(\theta)
=-\log\theta-\frac{X}{\theta}
$$

とする。スコアは

$$
\begin{aligned}
U_1(\theta)
&=\frac{\partial\ell_1(\theta)}{\partial\theta}\\
&=-\frac1\theta+\frac{X}{\theta^2}\\
&=\boxed{
\frac{X-\theta}{\theta^2}
}.
\end{aligned}
$$

指数分布では

$$
E_\theta[X]=\theta,
\qquad
\operatorname{Var}_\theta(X)=\theta^2.
$$

したがって

$$
\begin{aligned}
I_1(\theta)
&=E_\theta[U_1(\theta)^2]\\
&=E_\theta\left[
\frac{(X-\theta)^2}{\theta^4}
\right]\\
&=\frac{\operatorname{Var}_\theta(X)}{\theta^4}\\
&=\boxed{
\frac1{\theta^2}
}.
\end{aligned}
$$

独立な $n$ 標本では

$$
\boxed{
I_n(\theta)=\frac{n}{\theta^2}
}.
$$

### 2. ワルド統計量

$H_0$ の下では

$$
E[X_i]=\theta_0,
\qquad
\operatorname{Var}(X_i)=\theta_0^2<\infty.
$$

また

$$
\widehat\theta=\overline X.
$$

したがって独立同分布標本に対する中心極限定理から

$$
\frac{\sqrt n(\widehat\theta-\theta_0)}{\theta_0}
\xrightarrow{d}N(0,1).
$$

一方、大数の法則から

$$
\widehat\theta\xrightarrow{p}\theta_0.
$$

$\theta_0>0$ なので Slutsky の定理により、分母の $\theta_0$ を一致推定量 $\widehat\theta$ で置き換えても

$$
\frac{\sqrt n(\widehat\theta-\theta_0)}{\widehat\theta}
\xrightarrow{d}N(0,1).
$$

よってワルド統計量は

$$
\boxed{
W
=\frac{n(\widehat\theta-\theta_0)^2}{\widehat\theta^2}
\xrightarrow{d}\chi^2_1
}.
$$

ここで分母に $\widehat\theta^2$ が現れるのは、最尤推定量の漸近分散

$$
\operatorname{Avar}(\widehat\theta)
=\frac1{I_n(\theta)}
=\frac{\theta^2}{n}
$$

の未知な $\theta$ を $\widehat\theta$ で置き換えているためである。

### 3. スコア統計量と尤度比統計量

#### スコア統計量

$n$ 標本のスコアは

$$
\begin{aligned}
U_n(\theta)
&=\ell'(\theta)\\
&=-\frac{n}{\theta}+\frac{T}{\theta^2}\\
&=\frac{T-n\theta}{\theta^2}.
\end{aligned}
$$

帰無値 $\theta_0$ で評価すると

$$
U_n(\theta_0)
=\frac{T-n\theta_0}{\theta_0^2}.
$$

スコア統計量は

$$
S_c
=\frac{U_n(\theta_0)^2}{I_n(\theta_0)}
$$

だから

$$
\begin{aligned}
S_c
&=\frac{(T-n\theta_0)^2/\theta_0^4}
{n/\theta_0^2}\\
&=\boxed{
\frac{(T-n\theta_0)^2}{n\theta_0^2}
}.
\end{aligned}
$$

$T=n\widehat\theta$ を用いれば

$$
\boxed{
S_c
=\frac{n(\widehat\theta-\theta_0)^2}{\theta_0^2}
}.
$$

これは

$$
\frac{\sqrt n(\widehat\theta-\theta_0)}{\theta_0}
$$

の二乗なので、中心極限定理から

$$
S_c\xrightarrow{d}\chi^2_1.
$$

ワルド検定との違いは分母を見ればよい。

$$
W:
\widehat\theta^2
\quad\text{を使う},
\qquad
S_c:
\theta_0^2
\quad\text{を使う}.
$$

有限標本では $\widehat\theta\ne\theta_0$ が普通なので、この違いが数値差になる。

#### 尤度比統計量

帰無仮説の下では $\theta=\theta_0$ に固定され、制約なしでは $\widehat\theta=T/n$ である。尤度比を

$$
\Lambda
=\frac{L(\theta_0)}{L(\widehat\theta)}
$$

とすると

$$
G^2
=-2\log\Lambda
=2\{\ell(\widehat\theta)-\ell(\theta_0)\}.
$$

対数尤度を代入する。

$$
\begin{aligned}
\ell(\widehat\theta)-\ell(\theta_0)
&=\left(-n\log\widehat\theta-\frac{T}{\widehat\theta}\right)
-\left(-n\log\theta_0-\frac{T}{\theta_0}\right)\\
&=n\log\frac{\theta_0}{\widehat\theta}
-\frac{T}{\widehat\theta}
+\frac{T}{\theta_0}.
\end{aligned}
$$

$T=n\widehat\theta$ なので

$$
\frac{T}{\widehat\theta}=n,
\qquad
\frac{T}{\theta_0}=n\frac{\widehat\theta}{\theta_0}.
$$

したがって

$$
\boxed{
G^2
=2n\left[
\log\frac{\theta_0}{\widehat\theta}
-1
+\frac{\widehat\theta}{\theta_0}
\right]
}.
$$

同値な形として

$$
\boxed{
G^2
=2n\left[
\frac{\widehat\theta}{\theta_0}
-1
-\log\frac{\widehat\theta}{\theta_0}
\right]
}
$$

としてもよい。

Wilks の定理を使うため、本問では少なくとも次を確認する。

- 真値 $\theta_0$ は母数空間 $(0,\infty)$ の内部点である。
- 支持 $[0,\infty)$ は $\theta$ に依存しない。
- 対数尤度は $\theta_0$ の近くで十分滑らかである。
- 指数分布族は $\theta$ について識別可能である。
- フィッシャー情報量 $I_1(\theta_0)=1/\theta_0^2$ は有限かつ正である。
- 非制約モデルの次元は1、帰無仮説は1点なので次元差は1である。

したがって

$$
\boxed{
G^2\xrightarrow{d}\chi^2_1
}.
$$

### 4. 数値例

与えられた値から

$$
\widehat\theta
=\frac{T}{n}
=\frac{120}{100}
=1.2
=\frac65.
$$

#### ワルド統計量

$$
\begin{aligned}
W
&=\frac{100(1.2-1)^2}{1.2^2}\\
&=\frac{100\cdot0.2^2}{1.44}\\
&=\frac4{1.44}\\
&=\boxed{\frac{25}{9}}.
\end{aligned}
$$

したがって

$$
W\approx2.78<3.84
$$

なので、ワルド検定では有意水準5%で $H_0$ を棄却しない。

#### スコア統計量

$$
\begin{aligned}
S_c
&=\frac{100(1.2-1)^2}{1^2}\\
&=\boxed{4}.
\end{aligned}
$$

したがって

$$
S_c=4>3.84
$$

なので、スコア検定では有意水準5%で $H_0$ を棄却する。

#### 尤度比統計量

$$
\begin{aligned}
G^2
&=2\cdot100\left[
1.2-1-\log1.2
\right]\\
&=\boxed{
200\left(\frac15-\log\frac65\right)
}.
\end{aligned}
$$

必要なら

$$
G^2\approx3.54<3.84
$$

なので、尤度比検定では有意水準5%で $H_0$ を棄却しない。

この例では

$$
W\approx2.78,
\qquad
G^2\approx3.54,
\qquad
S_c=4.00
$$

となり、有限標本では3統計量が一致しないだけでなく、5%水準で判定まで分かれる。これが「漸近的に同値」と「有限標本で同じ」が別物であることの具体例である。

### 5. 3統計量の漸近同値

中心極限定理から

$$
\sqrt n(\widehat\theta-\theta_0)=O_p(1).
$$

したがって

$$
\delta_n
=\widehat\theta-\theta_0
$$

と置けば

$$
\boxed{
\delta_n=O_p(n^{-1/2})
}.
$$

#### ワルド統計量とスコア統計量

スコア統計量は

$$
S_c
=\frac{n\delta_n^2}{\theta_0^2}.
$$

一方、ワルド統計量は

$$
W
=\frac{n\delta_n^2}{(\theta_0+\delta_n)^2}.
$$

$\delta_n=o_p(1)$ なので

$$
\frac1{(\theta_0+\delta_n)^2}
=\frac1{\theta_0^2}+O_p(\delta_n).
$$

よって

$$
\begin{aligned}
W
&=n\delta_n^2
\left[
\frac1{\theta_0^2}+O_p(\delta_n)
\right]\\
&=\frac{n\delta_n^2}{\theta_0^2}
+O_p(n\delta_n^3).
\end{aligned}
$$

ここで

$$
n\delta_n^3
=O_p(n^{-1/2})
=o_p(1)
$$

だから

$$
\boxed{
W=S_c+o_p(1)
}.
$$

#### 尤度比統計量とスコア統計量

尤度比統計量を

$$
G^2
=2n\left[
\frac{\widehat\theta}{\theta_0}
-1
-\log\frac{\widehat\theta}{\theta_0}
\right]
$$

と書く。

$$
u_n
=\frac{\widehat\theta-\theta_0}{\theta_0}
=\frac{\delta_n}{\theta_0}
$$

と置けば

$$
\frac{\widehat\theta}{\theta_0}=1+u_n.
$$

したがって

$$
G^2
=2n\{u_n-\log(1+u_n)\}.
$$

$u=0$ のまわりで

$$
\log(1+u)
=u-\frac{u^2}{2}+O(u^3)
$$

だから

$$
u-\log(1+u)
=\frac{u^2}{2}+O(u^3).
$$

よって

$$
\begin{aligned}
G^2
&=2n\left[
\frac{u_n^2}{2}+O_p(u_n^3)
\right]\\
&=nu_n^2+O_p(nu_n^3)\\
&=\frac{n\delta_n^2}{\theta_0^2}+o_p(1).
\end{aligned}
$$

したがって

$$
\boxed{
G^2=S_c+o_p(1)
}.
$$

以上から

$$
\boxed{
W-S_c=o_p(1),
\qquad
G^2-S_c=o_p(1),
\qquad
G^2-W=o_p(1)
}.
$$

つまり3検定は有限標本では異なる統計量を使うが、$H_0$ の近くではいずれも主要項

$$
\boxed{
\frac{n(\widehat\theta-\theta_0)^2}{\theta_0^2}
}
$$

へ帰着する。

## 本番答案

$$
L(\theta)
=\theta^{-n}\exp\left(-\frac{T}{\theta}\right),
\qquad
\ell(\theta)
=-n\log\theta-\frac{T}{\theta},
\qquad
T=\sum_{i=1}^nX_i.
$$

$$
\ell'(\theta)
=-\frac n\theta+\frac{T}{\theta^2}=0
$$

より

$$
\boxed{\widehat\theta=T/n=\overline X}.
$$

1標本のスコアは

$$
U_1(\theta)
=\frac{X-\theta}{\theta^2}
$$

であり、$\operatorname{Var}(X)=\theta^2$ より

$$
\boxed{I_1(\theta)=1/\theta^2}.
$$

中心極限定理、大数の法則、Slutsky の定理から

$$
\boxed{
W
=\frac{n(\widehat\theta-\theta_0)^2}{\widehat\theta^2}
\xrightarrow{d}\chi_1^2
}.
$$

また

$$
U_n(\theta_0)
=\frac{T-n\theta_0}{\theta_0^2},
\qquad
I_n(\theta_0)=\frac n{\theta_0^2}
$$

より

$$
\boxed{
S_c
=\frac{n(\widehat\theta-\theta_0)^2}{\theta_0^2}
\xrightarrow{d}\chi_1^2
}.
$$

尤度比統計量は

$$
\boxed{
G^2
=2n\left[
\frac{\widehat\theta}{\theta_0}
-1
-\log\frac{\widehat\theta}{\theta_0}
\right]
}.
$$

$\theta_0$ は内部点、支持は母数に依存せず、モデルは滑らか・識別可能、情報量は有限正なので Wilks の定理から

$$
G^2\xrightarrow{d}\chi_1^2.
$$

数値例では

$$
\widehat\theta=1.2,
$$

$$
\boxed{
W=\frac{25}{9},
\qquad
S_c=4,
\qquad
G^2=200\left(\frac15-\log\frac65\right)
}.
$$

したがって5%水準では、ワルドと尤度比は棄却せず、スコア検定だけが棄却する。

さらに

$$
\delta_n=\widehat\theta-\theta_0=O_p(n^{-1/2})
$$

と置くと、Taylor 展開から

$$
W
=\frac{n\delta_n^2}{\theta_0^2}+o_p(1),
$$

$$
S_c
=\frac{n\delta_n^2}{\theta_0^2},
$$

$$
G^2
=\frac{n\delta_n^2}{\theta_0^2}+o_p(1).
$$

ゆえに3統計量は $H_0$ の下で漸近同値である。

## 採点基準

- (1) 確率密度関数から尤度・対数尤度・最尤推定量・フィッシャー情報量を導く: 4点
- (2) ワルド統計量と中心極限定理・Slutsky の定理による漸近分布: 4点
- (3) スコア統計量・尤度比統計量の導出と Wilks の条件: 6点
- (4) 3統計量の数値計算と5%水準での判定: 4点
- (5) $\theta_0$ まわりの Taylor 展開による漸近同値: 2点

25分経過時も、尤度・スコア・Taylor 展開の出発点を結果だけ置かず、採点対象の導出核を残す。
