# Core 24 右打ち切り寿命データ・尤度とMLE

- 安定ID: `RIKOU-CORE-24`
- 80大問 No.: 08
- 演習価値: S
- 難度: A
- 目安時間: 20〜25分
- 電卓: 四則演算・平方根までで完結

## 問題

寿命 $T_i$ は独立に指数分布

$$
f(t;\lambda)=\lambda e^{-\lambda t},\qquad t>0
$$

に従う。各個体について観測時間 $t_i=\min(T_i,C_i)$ と故障指標 $\delta_i=I(T_i\le C_i)$ を観測する。打ち切り機構は寿命と独立とする。

1. 1個体の尤度寄与を $f,S$ を使って書け。
2. 全尤度を整理し、$\lambda$ のMLEを求めよ。
3. データ

$$
t=(2,3,5,5,7),\qquad \delta=(1,1,0,1,0)
$$

に対するMLEを求めよ。
4. 観測情報量 $J(\lambda)=-\ell''(\lambda)$ を求め、MLEへ代入して $\hat\lambda$ の近似標準誤差を求めよ。
5. 打ち切り個体が「何も情報を与えない」わけではない理由を説明せよ。

## 詳細解答

### 1. 個体尤度

故障観測なら密度 $f(t_i)$、右打ち切りなら少なくとも $t_i$ まで生存した確率 $S(t_i)$ が寄与するので

$$
L_i(\lambda)=f(t_i;\lambda)^{\delta_i}S(t_i;\lambda)^{1-\delta_i}.
$$

指数分布では $S(t)=e^{-\lambda t}$ だから

$$
L_i=\lambda^{\delta_i}e^{-\lambda t_i}.
$$

### 2. 全尤度とMLE

$d=\sum\delta_i$, $T_\bullet=\sum t_i$ とおけば

$$
L(\lambda)=\lambda^d e^{-\lambda T_\bullet},
\qquad
\ell(\lambda)=d\log\lambda-\lambda T_\bullet.
$$

微分して

$$
\ell'(\lambda)=\frac d\lambda-T_\bullet,
$$

したがって

$$
\boxed{\hat\lambda=\frac d{T_\bullet}}.
$$

ここで $\log$ は微分のための記号であり、数値評価は不要。

### 3. 数値

$d=3$, $T_\bullet=22$ なので

$$
\boxed{\hat\lambda=3/22}.
$$

### 4. 観測情報量と近似標準誤差

$$
\ell''(\lambda)=-\frac d{\lambda^2}
$$

だから

$$
J(\lambda)=\frac d{\lambda^2}.
$$

MLEの近似分散は $J(\hat\lambda)^{-1}$ なので

$$
\widehat{\operatorname{Var}}(\hat\lambda)
=\frac{\hat\lambda^2}{d},
$$

$$
\boxed{SE(\hat\lambda)\approx\frac{\hat\lambda}{\sqrt d}
=\frac{3/22}{\sqrt3}}.
$$

平方根までの一般電卓で評価可能だが、この式までで十分である。

### 5. 打ち切り情報

打ち切り個体は故障時刻そのものは不明でも「少なくとも $t_i$ までは生存した」という情報を持つ。そのため尤度に $S(t_i)$ として入り、総曝露時間 $T_\bullet$ を増やす。削除すると故障率を上方に偏らせやすい。

## 本番答案

$$
L_i=f(t_i)^{\delta_i}S(t_i)^{1-\delta_i}
=\lambda^{\delta_i}e^{-\lambda t_i}.
$$

したがって

$$
L(\lambda)=\lambda^d e^{-\lambda\sum t_i},
\qquad
\hat\lambda=d/\sum t_i.
$$

本データでは $\hat\lambda=3/22$。また

$$
J(\lambda)=d/\lambda^2,
\qquad
SE(\hat\lambda)\approx\hat\lambda/\sqrt d.
$$

打ち切り個体も生存関数を通じて総曝露時間の情報を与える。

## 採点基準

- (1) 個体尤度: 4点
- (2) 全尤度とMLE: 5点
- (3) 数値: 2点
- (4) 観測情報量・標準誤差: 5点
- (5) 打ち切りの意味: 4点

20分経過時は $f^\delta S^{1-\delta}$ と $SE\approx\hat\lambda/\sqrt d$ を確保する。
