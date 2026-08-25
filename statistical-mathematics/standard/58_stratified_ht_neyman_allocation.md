# Standard 19 層化抽出・Horvitz–Thompson推定量・Neyman配分

- 旧No.: 58
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ○

## 問題

母集団を $H$ 層に分け、層 $h$ の大きさを $N_h$、標本数を $n_h$、母標準偏差を $S_h$ とする。各層で単純無作為抽出する。

1. 母平均の層化推定量と分散を書け。
2. 母総計の Horvitz–Thompson 推定量を書け。
3. 総標本数 $n$ 固定、抽出単価が同じとき Neyman 配分を導け。
4. $N_1=100,N_2=200,S_1=1,S_2=2,n=60$ の配分を求めよ。

## 詳細解答

### 1. 層化平均推定量と分散

母集団全体の大きさを

$$
N=\sum_{h=1}^H N_h
$$

とし、層の母集団比率を

$$
W_h=\frac{N_h}{N}
$$

と置く。

層 $h$ の標本平均を $\bar y_h$ とすると、母平均の層化推定量は

$$
\boxed{
\bar y_{st}=\sum_{h=1}^H W_h\bar y_h
}.
$$

各層は独立に抽出されるので

$$
\operatorname{Var}(\bar y_{st})
=\sum_{h=1}^H W_h^2\operatorname{Var}(\bar y_h).
$$

層内で復元なし単純無作為抽出をしているため

$$
\operatorname{Var}(\bar y_h)
=\left(1-\frac{n_h}{N_h}\right)\frac{S_h^2}{n_h}.
$$

従って

$$
\boxed{
\operatorname{Var}(\bar y_{st})
=\sum_{h=1}^H
W_h^2
\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}
}.
$$

### 2. 母総計の Horvitz–Thompson 推定量

層 $h$ では $N_h$ 個から $n_h$ 個を単純無作為抽出するので、各個体の包含確率は

$$
\pi_{hi}=\frac{n_h}{N_h}.
$$

Horvitz–Thompson 推定量は、観測された各個体を包含確率の逆数で重み付けする。

$$
\widehat Y_{HT}
=\sum_{h=1}^H\sum_{i\in s_h}\frac{y_{hi}}{\pi_{hi}}.
$$

$\pi_{hi}=n_h/N_h$ を代入すると

$$
\begin{aligned}
\widehat Y_{HT}
&=\sum_h\frac{N_h}{n_h}\sum_{i\in s_h}y_{hi}\\
&=\sum_h N_h\bar y_h.
\end{aligned}
$$

したがって

$$
\boxed{
\widehat Y_{HT}=\sum_h N_h\bar y_h
}.
$$

### 3. Neyman 配分の導出

総標本数

$$
\sum_{h=1}^H n_h=n
$$

を固定し、分散を最小化する。

第1問の分散を展開すると

$$
\begin{aligned}
\operatorname{Var}(\bar y_{st})
&=\sum_h\frac{N_h^2}{N^2}
\left(\frac{S_h^2}{n_h}-\frac{S_h^2}{N_h}\right)\\
&=\frac1{N^2}
\sum_h\frac{N_h^2S_h^2}{n_h}
-\frac1{N^2}\sum_hN_hS_h^2.
\end{aligned}
$$

第2項は $n_h$ に依存しない。したがって

$$
\sum_h\frac{N_h^2S_h^2}{n_h}
$$

を最小化すればよい。

Lagrange関数を

$$
\mathcal L
=\sum_h\frac{N_h^2S_h^2}{n_h}
+\lambda\left(\sum_h n_h-n\right)
$$

と置く。

$n_h$ で偏微分すると

$$
\frac{\partial\mathcal L}{\partial n_h}
=-\frac{N_h^2S_h^2}{n_h^2}+\lambda.
$$

最適点では0だから

$$
\lambda=\frac{N_h^2S_h^2}{n_h^2}.
$$

正の平方根を取ると

$$
\sqrt\lambda=\frac{N_hS_h}{n_h},
$$

すなわち

$$
n_h\propto N_hS_h.
$$

比例定数を総標本数条件から決めると

$$
\boxed{
n_h
=n\frac{N_hS_h}{\sum_{j=1}^H N_jS_j}
}.
$$

これが抽出単価が等しい場合の Neyman 配分である。大きな層、または層内変動の大きな層へ多く標本を割り当てる。

### 4. 数値例

各層の $N_hS_h$ は

$$
N_1S_1=100\cdot1=100,
$$

$$
N_2S_2=200\cdot2=400.
$$

したがって配分比は

$$
100:400=1:4.
$$

総標本数60なので

$$
\boxed{n_1=12,\qquad n_2=48}.
$$

## 本番答案

$$
\bar y_{st}=\sum_hW_h\bar y_h,
\qquad
W_h=\frac{N_h}{N},
$$

$$
\operatorname{Var}(\bar y_{st})
=\sum_hW_h^2
\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}.
$$

包含確率は $\pi_{hi}=n_h/N_h$ なので

$$
\widehat Y_{HT}
=\sum_{h,i\in s_h}\frac{y_{hi}}{\pi_{hi}}
=\sum_hN_h\bar y_h.
$$

配分では定数項を除いて

$$
\sum_h\frac{N_h^2S_h^2}{n_h}
$$

を $\sum_hn_h=n$ の下で最小化する。Lagrange法より

$$
-\frac{N_h^2S_h^2}{n_h^2}+\lambda=0
$$

だから

$$
n_h
=n\frac{N_hS_h}{\sum_jN_jS_j}.
$$

数値例では $N_hS_h=100,400$ なので

$$
(n_1,n_2)=(12,48).
$$

## 採点基準

- 層化平均推定量・有限母集団補正付き分散: 5点
- 包含確率から Horvitz–Thompson 推定量を構成: 5点
- Lagrange法による Neyman 配分導出: 7点
- 数値配分: 3点
