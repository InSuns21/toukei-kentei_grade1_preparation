# Core 06 制約モデルとバイアス・バリアンス分解

- 安定ID: `RIKOU-CORE-06`
- 80大問 No.: 40
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

正規線形モデル $y=X\beta+\varepsilon$, $\varepsilon\sim N(0,\sigma^2I)$ を考える。$R\beta=r$ という制約を課した制約付き最小二乗推定量を $\hat\beta_R$ とする。

1. $C=R(X^\top X)^{-1}R^\top$ として $\hat\beta_R$ を書け。
2. 真の $\beta$ が制約を満たさない場合の $\hat\beta_R$ のバイアスを求めよ。
3. $\operatorname{Var}(\hat\beta_R)$ を求め、OLSより分散が減少することを示せ。
4. 特に $X^\top X=nI_2$, 制約 $\beta_2=0$、真値 $\beta_2=\delta$ とする。$\beta$ 全体の二乗誤差損失に対する OLS と制約推定量の MSE を比較し、制約推定量が有利となる条件を求めよ。

## 詳細解答

### 1. 制約付き推定量

Core 02 より

$$
\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r).
$$

### 2. バイアス

$E[\hat\beta]=\beta$ だから

$$
E[\hat\beta_R]-\beta
=-(X^\top X)^{-1}R^\top C^{-1}(R\beta-r).
$$

真の制約違反 $R\beta-r$ がそのままバイアス源になる。

### 3. 分散

$A=(X^\top X)^{-1}R^\top C^{-1}R$ とおけば $\hat\beta_R=(I-A)\hat\beta+$ 定数。したがって整理すると

$$
\boxed{\operatorname{Var}(\hat\beta_R)
=\sigma^2\left[(X^\top X)^{-1}
-(X^\top X)^{-1}R^\top C^{-1}R(X^\top X)^{-1}\right]}.
$$

OLSとの差は

$$
\operatorname{Var}(\hat\beta)-\operatorname{Var}(\hat\beta_R)
=\sigma^2(X^\top X)^{-1}R^\top C^{-1}R(X^\top X)^{-1}\succeq0.
$$

### 4. 直交設計の例

$X^\top X=nI_2$ なので OLS の各成分分散は $\sigma^2/n$。したがって

$$
\operatorname{MSE}(\hat\beta)=E\|\hat\beta-\beta\|^2=\frac{2\sigma^2}{n}.
$$

制約推定量は第2成分を0に固定する。第1成分は不偏で分散 $\sigma^2/n$、第2成分の誤差は常に $-\delta$ だから

$$
\operatorname{MSE}(\hat\beta_R)=\frac{\sigma^2}{n}+\delta^2.
$$

したがって制約推定量が有利なのは

$$
\frac{\sigma^2}{n}+\delta^2<\frac{2\sigma^2}{n},
$$

すなわち

$$
\boxed{\delta^2<\frac{\sigma^2}{n}}.
$$

制約が少し間違っていても、分散減少がバイアス二乗を上回ればMSEは改善する。

## 本番答案

$$
\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r),
\quad C=R(X^\top X)^{-1}R^\top.
$$

バイアスは

$$
-(X^\top X)^{-1}R^\top C^{-1}(R\beta-r).
$$

分散は

$$
\sigma^2\left[(X^\top X)^{-1}-(X^\top X)^{-1}R^\top C^{-1}R(X^\top X)^{-1}\right],
$$

ゆえに OLS より半正定値の意味で小さい。直交設計の例では

$$
\operatorname{MSE}_{U}=2\sigma^2/n,\qquad
\operatorname{MSE}_{R}=\sigma^2/n+\delta^2,
$$

したがって $\delta^2<\sigma^2/n$ なら制約推定が有利。

## 採点基準

- (1) 制約推定量: 4点
- (2) バイアス: 5点
- (3) 分散減少: 6点
- (4) MSE比較と条件: 5点

25分経過時は一般式の代数を切り上げ、最後のMSE比較まで到達する。
