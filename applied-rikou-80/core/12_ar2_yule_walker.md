# Core 12 自己回帰過程 AR(2)：Yule–Walker方程式・定常条件

- 安定ID: `RIKOU-CORE-12`
- 80大問 No.: 23
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 前提・記号

自己回帰過程、Yule–Walker方程式、定常条件は [E2-03 自己回帰過程・移動平均過程・ARIMA過程](../../textbook/volumes/05_engineering/E2_03_ar_ma_arima時系列/index.md) を前提とする。

本問では

$$
X_t=\phi_1X_{t-1}+\phi_2X_{t-2}+\varepsilon_t
$$

に対し、AR特性多項式を

$$
\phi(z)=1-\phi_1z-\phi_2z^2
$$

とする。また

$$
\gamma(h)=\operatorname{Cov}(X_t,X_{t-h}),
\qquad
\rho(h)=\frac{\gamma(h)}{\gamma(0)}
$$

と書く。

## 問題

ある振動センサーの中心化済み系列 $X_t$ が

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t,
\qquad
E[\varepsilon_t]=0,
\quad
\operatorname{Var}(\varepsilon_t)=1
$$

に従うとする。$\varepsilon_t$ は過去の $X$ と無相関である。

1. 本問のAR特性多項式を作り、その根を求めて弱定常な因果解の条件を満たすことを確認せよ。
2. 弱定常性を仮定し、自己共分散関数 $\gamma(h)$ について、モデル式からYule–Walker方程式を導け。さらに $\rho(1)$ を求めよ。
3. $\rho(2)$ を求めよ。
4. $\gamma(0)$ を求めよ。
5. 得られた $\rho(1),\rho(2)$ から、この系列では1期前だけでなく2期前の影響も残ることを説明せよ。

## 詳細解答

### 1. 特性多項式と定常性

本問では

$$
\phi_1=0.5,
\qquad
\phi_2=0.2
$$

なので

$$
\phi(z)=1-0.5z-0.2z^2.
$$

根は

$$
1-0.5z-0.2z^2=0
$$

を解けばよい。符号を変えて

$$
0.2z^2+0.5z-1=0.
$$

2次方程式の解の公式から

$$
\begin{aligned}
z
&=\frac{-0.5\pm\sqrt{0.5^2-4(0.2)(-1)}}{2(0.2)}\\
&=\frac{-0.5\pm\sqrt{1.05}}{0.4}.
\end{aligned}
$$

したがって

$$
z_1\approx1.312,
\qquad
z_2\approx-3.812.
$$

いずれも

$$
|z_1|>1,
\qquad
|z_2|>1
$$

なので、AR特性多項式の根はすべて単位円の外側にある。

よって

$$
\boxed{
\text{本問のAR(2)には因果的な弱定常解が存在する}
}.
$$

### 2. Yule–Walker方程式と $\rho(1)$

モデル式

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$

の両辺と $X_{t-h}$ の共分散を取る。$h\ge1$ とする。

$$
\begin{aligned}
\gamma(h)
&=\operatorname{Cov}(X_t,X_{t-h})\\
&=0.5\operatorname{Cov}(X_{t-1},X_{t-h})\\
&\quad+0.2\operatorname{Cov}(X_{t-2},X_{t-h})\\
&\quad+\operatorname{Cov}(\varepsilon_t,X_{t-h}).
\end{aligned}
$$

$h\ge1$ なら $X_{t-h}$ は時点 $t-1$ 以前の変数なので、仮定から

$$
\operatorname{Cov}(\varepsilon_t,X_{t-h})=0.
$$

弱定常性より

$$
\operatorname{Cov}(X_{t-1},X_{t-h})=\gamma(h-1),
$$

$$
\operatorname{Cov}(X_{t-2},X_{t-h})=\gamma(h-2).
$$

したがって

$$
\boxed{
\gamma(h)
=0.5\gamma(h-1)+0.2\gamma(h-2),
\qquad h\ge1
}.
$$

$h=1$ とすると

$$
\gamma(1)
=0.5\gamma(0)+0.2\gamma(-1).
$$

自己共分散の対称性 $\gamma(-1)=\gamma(1)$ を使って

$$
\gamma(1)=0.5\gamma(0)+0.2\gamma(1).
$$

したがって

$$
0.8\gamma(1)=0.5\gamma(0),
$$

よって

$$
\boxed{\rho(1)=0.625}.
$$

### 3. $\rho(2)$

$h=2$ のYule–Walker方程式は

$$
\gamma(2)
=0.5\gamma(1)+0.2\gamma(0).
$$

両辺を $\gamma(0)$ で割ると

$$
\rho(2)=0.5\rho(1)+0.2.
$$

したがって

$$
\boxed{
\rho(2)=0.5(0.625)+0.2=0.5125
}.
$$

### 4. $\gamma(0)$

$h=0$ では $\varepsilon_t$ と $X_t$ 自身は無相関ではないので、$h\ge1$ の式をそのまま使わない。

モデル式と $X_t$ の共分散を取る。

$$
\begin{aligned}
\gamma(0)
&=0.5\gamma(1)+0.2\gamma(2)
+\operatorname{Cov}(\varepsilon_t,X_t).
\end{aligned}
$$

一方、$\varepsilon_t$ は過去の $X$ と無相関だから

$$
\operatorname{Cov}(\varepsilon_t,X_t)
=\operatorname{Var}(\varepsilon_t)=1.
$$

したがって

$$
\gamma(0)=0.5\gamma(1)+0.2\gamma(2)+1.
$$

すでに

$$
\gamma(1)=0.625\gamma(0),
\qquad
\gamma(2)=0.5125\gamma(0)
$$

だから

$$
\begin{aligned}
\gamma(0)
&=0.5(0.625\gamma(0))
+0.2(0.5125\gamma(0))+1\\
&=0.415\gamma(0)+1.
\end{aligned}
$$

よって

$$
\boxed{
\gamma(0)=\frac{1}{0.585}
=\frac{200}{117}
\approx1.709
}.
$$

### 5. 自己相関の解釈

$$
\rho(1)=0.625,
\qquad
\rho(2)=0.5125
$$

なので、1期前との相関だけでなく2期離れても比較的大きな正の相関が残っている。

AR(1) では自己相関が単純な1本の幾何級数 $\phi^{|h|}$ になるが、AR(2) では2つの過去ラグが自己共分散の漸化式へ入るため、減衰の形はより複雑になる。

## 本番答案

本問のAR特性多項式は

$$
1-0.5z-0.2z^2.
$$

根は

$$
z=\frac{-0.5\pm\sqrt{1.05}}{0.4}
\approx1.312,-3.812
$$

で、両方とも絶対値が1より大きいから因果的弱定常条件を満たす。

モデル式と $X_{t-h}$ の共分散を取り、$h\ge1$ で $\operatorname{Cov}(\varepsilon_t,X_{t-h})=0$ を使うと

$$
\gamma(h)=0.5\gamma(h-1)+0.2\gamma(h-2).
$$

$h=1$ より

$$
\rho(1)=0.625,
$$

$h=2$ より

$$
\rho(2)=0.5125.
$$

また

$$
\gamma(0)=0.5\gamma(1)+0.2\gamma(2)+1
$$

なので

$$
\gamma(0)=\frac{200}{117}\approx1.709.
$$

## 採点基準

- 特性多項式と定常性確認: 4点
- Yule–Walker方程式の導出: 6点
- $\rho(1),\rho(2)$: 4点
- $\gamma(0)$: 4点
- 自己相関の解釈: 2点

30分経過時は、問題文で定義された特性多項式を使い、Yule–Walker方程式をモデルから導く部分を優先する。