# Standard 30 稀事象・相対Monte Carlo誤差

- 旧No.: 89
- 層: Standard
- 演習価値: A
- 難度: B
- 目安時間: 15分
- 手計算監査: ○

## 問題

稀事象 $A$ の確率を $p$ とし、独立反復で

$$
\hat p=\frac1n\sum_{i=1}^n\boldsymbol{1}_{\{A_i\}}
$$

と推定する。

1. $\hat p$ の標準誤差を求めよ。
2. 相対標準誤差を求めよ。
3. $p=10^{-4}$ のとき相対標準誤差を約10%以下にするために必要な $n$ のオーダーを求めよ。
4. 稀事象で単純Monte Carloが非効率な理由を述べよ。

## 詳細解答

$I_i=\boldsymbol{1}_{\{A_i\}}$ とおく。各反復で事象が起きる確率は $p$ なので $I_i$ は成功確率 $p$ のBernoulli変数で

$$
E[I_i]=p,
\qquad
\operatorname{Var}(I_i)=p(1-p).
$$

また $\hat p=n^{-1}\sum I_i$ である。

### 1. 標準誤差

独立反復だから共分散項は0で

$$
\begin{aligned}
\operatorname{Var}(\hat p)
&=\operatorname{Var}\left(\frac1n\sum_{i=1}^nI_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(I_i)\\
&=\frac{p(1-p)}n.
\end{aligned}
$$

従って標準誤差は

$$
\boxed{\sqrt{\frac{p(1-p)}n}}.
$$

### 2. 相対標準誤差

標準誤差を推定対象 $p$ で割ると

$$
\frac{\sqrt{p(1-p)/n}}{p}=\boxed{\sqrt{\frac{1-p}{np}}}.
$$

$p$ が非常に小さいとき $1-p\approx1$ なので

$$
\text{相対標準誤差}\approx\frac1{\sqrt{np}}.
$$

### 3. 相対標準誤差を10%以下にする標本数

$$
\sqrt{\frac{1-p}{np}}\le0.1
$$

を2乗すると

$$
\frac{1-p}{np}\le0.01,
$$

したがって

$$
n\ge\frac{100(1-p)}p.
$$

$p=10^{-4}$ なら

$$
n\ge100\frac{1-10^{-4}}{10^{-4}}\approx10^6.
$$

よって

$$
\boxed{n\asymp10^6}.
$$

### 4. なぜ稀事象で非効率か

単純Monte Carloでは大部分の $I_i$ が0である。期待される成功回数は

$$
E\left[\sum I_i\right]=np.
$$

$p$ が小さいと、$n$ をかなり大きくしない限り成功回数 $np$ が小さく、相対標準誤差 $1/\sqrt{np}$ が下がらない。絶対誤差ではなく相対精度が問題になるのが稀事象推定の難しさである。

## 本番答案

$I_i=\boldsymbol{1}_{\{A_i\}}\sim\operatorname{Bernoulli}(p)$ なので

$$
\operatorname{Var}(\hat p)=\frac{p(1-p)}n.
$$

相対標準誤差は

$$
\sqrt{\frac{1-p}{np}}\approx\frac1{\sqrt{np}}.
$$

10%以下には $n\ge100(1-p)/p$ が必要で、$p=10^{-4}$ なら $n$ は約 $10^6$ のオーダー。稀事象では期待成功回数 $np$ が小さいため相対精度の確保に多くの反復が必要になる。

## 採点基準

- 指示変数の分散から標準誤差を導出: 5点
- 相対標準誤差: 5点
- 必要試行数: 6点
- 非効率性の説明: 4点
