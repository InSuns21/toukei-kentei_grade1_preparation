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
3. $\operatorname{Var}(\hat\beta_R)$ を求め、通常最小二乗法より分散が減少することを示せ。
4. 特に $X^\top X=nI_2$, 制約 $\beta_2=0$、真値 $\beta_2=\delta$ とする。$\beta$ 全体の二乗誤差損失に対する通常最小二乗法と制約推定量の平均二乗誤差を比較し、制約推定量が有利となる条件を求めよ。

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

行列計算を「整理すると」で省略しない。まず

$$
K=(X^\top X)^{-1},
\qquad
G=KR^\top C^{-1}R
$$

とおく。制約付き推定量は

$$
\hat\beta_R=(I-G)\hat\beta+KR^\top C^{-1}r
$$

だから、定数項は分散に寄与せず

$$
\operatorname{Var}(\hat\beta_R)
=(I-G)\operatorname{Var}(\hat\beta)(I-G)^\top.
$$

$\operatorname{Var}(\hat\beta)=\sigma^2K$ より

$$
\operatorname{Var}(\hat\beta_R)
=\sigma^2(I-G)K(I-G)^\top.
$$

ここで

$$
D=KR^\top C^{-1}RK
$$

とおくと

$$
GK=D,
\qquad
KG^\top=D.
$$

さらに $C=RKR^\top$ なので

$$
\begin{aligned}
GKG^\top
&=KR^\top C^{-1}RKR^\top C^{-1}RK\\
&=KR^\top C^{-1}CC^{-1}RK\\
&=D.
\end{aligned}
$$

したがって

$$
\begin{aligned}
(I-G)K(I-G)^\top
&=K-GK-KG^\top+GKG^\top\\
&=K-D-D+D\\
&=K-D.
\end{aligned}
$$

よって

$$
\boxed{\operatorname{Var}(\hat\beta_R)
=\sigma^2\left[(X^\top X)^{-1}
-(X^\top X)^{-1}R^\top C^{-1}R(X^\top X)^{-1}\right]}.
$$

通常最小二乗法との差は

$$
\operatorname{Var}(\hat\beta)-\operatorname{Var}(\hat\beta_R)
=\sigma^2KR^\top C^{-1}RK.
$$

任意のベクトル $a$ に対して

$$
a^\top KR^\top C^{-1}RKa
=(RKa)^\top C^{-1}(RKa)\ge0
$$

だから、この差は半正定値である。

### 4. 直交設計の例

$X^\top X=nI_2$ なので通常最小二乗法の各成分分散は $\sigma^2/n$。したがって

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

制約が少し間違っていても、分散減少がバイアス二乗を上回れば平均二乗誤差は改善する。

## 本番答案

$$
\hat\beta_R=\hat\beta-(X^\top X)^{-1}R^\top C^{-1}(R\hat\beta-r),
\quad C=R(X^\top X)^{-1}R^\top.
$$

バイアスは

$$
-(X^\top X)^{-1}R^\top C^{-1}(R\beta-r).
$$

$K=(X^\top X)^{-1}$ とおけば

$$
\operatorname{Var}(\hat\beta_R)
=\sigma^2\{K-KR^\top C^{-1}RK\},
$$

したがって通常最小二乗法との差は $\sigma^2KR^\top C^{-1}RK\succeq0$。直交設計の例では

$$
\operatorname{MSE}_{U}=2\sigma^2/n,\qquad
\operatorname{MSE}_{R}=\sigma^2/n+\delta^2,
$$

したがって $\delta^2<\sigma^2/n$ なら制約推定が有利。

## 採点基準

- (1) 制約推定量: 4点
- (2) バイアス: 5点
- (3) 分散展開と半正定値性: 6点
- (4) 平均二乗誤差比較と条件: 5点

25分経過時は一般式の代数を切り上げ、最後の平均二乗誤差比較まで到達する。本番答案では詳細解答の中間行列積まで再現する必要はない。
