# Core 24 右打ち切り寿命データ・尤度とMLE

- 安定ID: `RIKOU-CORE-24`
- 80大問 No.: 08
- 演習価値: S
- 難度: A
- 目安時間: 30分

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
4. 打ち切り個体が「何も情報を与えない」わけではない理由を説明せよ。

## 詳細解答

### 1. 個体尤度

故障が観測されたときは密度 $f(t_i)$、右打ち切りなら少なくとも $t_i$ まで生存した確率 $S(t_i)$ が寄与する。したがって

$$
L_i(\lambda)=f(t_i;\lambda)^{\delta_i}S(t_i;\lambda)^{1-\delta_i}.
$$

指数分布では $S(t)=e^{-\lambda t}$ なので

$$
L_i=\lambda^{\delta_i}e^{-\lambda t_i}.
$$

### 2. 全尤度とMLE

$d=\sum\delta_i$, $T_\bullet=\sum t_i$ とおくと

$$
L(\lambda)=\lambda^d e^{-\lambda T_\bullet}.
$$

対数尤度は

$$
\ell(\lambda)=d\log\lambda-\lambda T_\bullet.
$$

したがって

$$
\ell'(\lambda)=\frac d\lambda-T_\bullet=0
$$

から

$$
\boxed{\hat\lambda=\frac d{T_\bullet}}.
$$

### 3. 数値

$d=3$, $T_\bullet=22$ なので

$$
\boxed{\hat\lambda=3/22\approx0.1364}.
$$

### 4. 打ち切り情報

打ち切り個体は故障時刻そのものは不明だが「少なくとも $t_i$ までは生存した」という情報を持つ。そのため尤度に $S(t_i)=e^{-\lambda t_i}$ として入り、総曝露時間 $T_\bullet$ を増やす。打ち切りを削除すると故障率を上方に偏らせやすい。

## 本番答案

1個体の寄与は

$$
f(t_i)^{\delta_i}S(t_i)^{1-\delta_i}.
$$

指数分布では

$$
L(\lambda)=\prod_i\lambda^{\delta_i}e^{-\lambda t_i}
=\lambda^d e^{-\lambda\sum t_i}.
$$

したがって

$$
\hat\lambda=d/\sum t_i.
$$

本データでは $d=3$, $\sum t_i=22$ なので $\hat\lambda=3/22$。打ち切り個体も生存関数を通じて総曝露時間の情報を与える。

## 採点基準

- 個体尤度: 5点
- 全尤度整理: 5点
- MLE導出・数値: 6点
- 打ち切りの意味: 4点

25分経過時は $f^\delta S^{1-\delta}$ を必ず書き、そこから指数分布を代入する。
