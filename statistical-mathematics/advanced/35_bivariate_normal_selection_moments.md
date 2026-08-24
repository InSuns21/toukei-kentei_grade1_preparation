# Advanced 07 2変量正規・選択後モーメント

- 旧No.: 35
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$(X,Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布。$X>a$ の個体だけを選択する。$\lambda(a)=\phi(a)/(1-\Phi(a))$ とする。

1. $E[Y\mid X>a]$ を求めよ。
2. $\operatorname{Var}(Y\mid X>a)$ を求めよ。
3. $\operatorname{Cov}(X,Y\mid X>a)$ を求めよ。
4. 選択が相関構造を変える理由を説明せよ。

## 詳細解答

### 準備: 2変量正規を残差表示する

$|\rho|<1$ とし

$$
\varepsilon=\frac{Y-\rho X}{\sqrt{1-\rho^2}}
$$

と置く。$(X,\varepsilon)$ は $(X,Y)$ の線形変換なので同時正規で、

$$
Cov(X,\varepsilon)
=\frac{Cov(X,Y)-\rho Var(X)}{\sqrt{1-\rho^2}}=0.
$$

さらに $Var(\varepsilon)=1$。同時正規かつ無相関なので $\varepsilon\perp X$ であり

$$
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon,
\qquad \varepsilon\sim N(0,1),\quad\varepsilon\perp X.
$$

$\rho=\pm1$ は退化ケースとして同じ最終式を極限で読める。

切断正規の積分から

$$
E[X\mid X>a]=\lambda(a),
$$

$$
V_a=Var(X\mid X>a)=1+a\lambda(a)-\lambda(a)^2.
$$

事象 $\{X>a\}$ は $X$ だけで決まるため、$\varepsilon$ は条件付け後も $X$ と独立で

$$
E[\varepsilon\mid X>a]=0,
\qquad
Var(\varepsilon\mid X>a)=1.
$$

### 1. 条件付き平均

$$
\begin{aligned}
E[Y\mid X>a]
&=\rho E[X\mid X>a]
+\sqrt{1-\rho^2}E[\varepsilon\mid X>a]\\
&=\boxed{\rho\lambda(a)}.
\end{aligned}
$$

### 2. 条件付き分散

条件付け後も $X$ と $\varepsilon$ の共分散は0なので

$$
\begin{aligned}
Var(Y\mid X>a)
&=\rho^2Var(X\mid X>a)
+(1-\rho^2)Var(\varepsilon\mid X>a)\\
&=\boxed{\rho^2V_a+1-\rho^2}.
\end{aligned}
$$

### 3. 条件付き共分散

$$
\begin{aligned}
Cov(X,Y\mid X>a)
&=Cov\{X,\rho X+\sqrt{1-\rho^2}\varepsilon\mid X>a\}\\
&=\rho Var(X\mid X>a)\\
&=\boxed{\rho V_a}.
\end{aligned}
$$

### 4. 選択効果

選択前は $Var(X)=1$ だが、選択後は $V_a$ に変わる。そのため共分散は $\rho$ から $\rho V_a$ へ、$Y$ の分散も $\rho^2V_a+1-\rho^2$ へ変わる。従って相関係数も一般には元の $\rho$ と一致しない。

## 本番答案

$\varepsilon=(Y-\rho X)/\sqrt{1-\rho^2}$ と置くと $Cov(X,\varepsilon)=0$。同時正規だから $\varepsilon\perp X$ で

$$
Y=\rho X+\sqrt{1-\rho^2}\varepsilon.
$$

切断正規より $E[X\mid X>a]=\lambda(a)$, $V_a=1+a\lambda(a)-\lambda(a)^2$。事象は $X$ のみで決まるので条件付け後も $\varepsilon$ の平均0・分散1は変わらない。従って

$$
E[Y\mid X>a]=\rho\lambda(a),
$$

$$
Var(Y\mid X>a)=\rho^2V_a+1-\rho^2,
\quad
Cov(X,Y\mid X>a)=\rho V_a.
$$

## 採点基準

- 回帰表現の導出: 4点
- 条件付き平均: 5点
- 条件付き分散: 6点
- 共分散・選択効果: 5点
