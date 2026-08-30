# Standard 19 層化抽出・Horvitz–Thompson推定量・Neyman配分

- 旧No.: 58
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## この問題の前提

層化抽出では「有限母集団から復元なしで抽出する」ため、通常の独立標本の分散 $S^2/n$ に **有限母集団補正** が付く。

同じ仕組みは [Standard 18 超幾何分布・有限母集団補正](56_hypergeometric_fpc.md) で指示変数から導出している。本問でも必要な式をもう一度短く導くので、公式の暗記だけを前提にはしない。

層 $h$ の有限母集団値を

$$
y_{h1},\ldots,y_{hN_h}
$$

とし、層平均と有限母集団分散を

$$
\bar Y_h=\frac1{N_h}\sum_{i=1}^{N_h}y_{hi},
$$

$$
S_h^2
=\frac1{N_h-1}
\sum_{i=1}^{N_h}(y_{hi}-\bar Y_h)^2
$$

と定める。

## 問題

母集団を $H$ 層に分け、層 $h$ の大きさを $N_h$、標本数を $n_h$、母標準偏差を $S_h$ とする。各層で復元なし単純無作為抽出を行い、異なる層の抽出は独立とする。

1. 母平均の層化推定量を書き、その分散を有限母集団補正から導け。
2. 母総計の Horvitz–Thompson 推定量を書き、不偏性も確認せよ。
3. 総標本数 $n$ 固定、抽出単価が同じとき Neyman 配分を導け。
4. $N_1=100,N_2=200,S_1=1,S_2=2,n=60$ の配分を求めよ。

## 詳細解答

### 1. 層化平均推定量と有限母集団補正付き分散

母集団全体の大きさを

$$
N=\sum_{h=1}^H N_h
$$

とし、層の母集団比率を

$$
W_h=\frac{N_h}{N}
$$

と置く。

母集団全体の平均は

$$
\bar Y
=\frac1N\sum_{h=1}^H\sum_{i=1}^{N_h}y_{hi}
=\sum_{h=1}^H\frac{N_h}{N}\bar Y_h
=\sum_{h=1}^H W_h\bar Y_h.
$$

層 $h$ の標本平均を $\bar y_h$ とすると、$E[\bar y_h]=\bar Y_h$ なので

$$
\boxed{
\bar y_{st}=\sum_{h=1}^H W_h\bar y_h
}
$$

は母平均 $\bar Y$ の不偏推定量である。

次に層内標本平均の分散を、公式として置かずに確認する。

層を一つ固定して添字 $h$ を一時的に省略し、母集団サイズを $N$、標本数を $n$ と書く。個体 $i$ が標本に含まれれば1となる包含指示変数を

$$
I_i=\boldsymbol{1}_{\{i\in s\}}
$$

とする。単純無作為抽出では

$$
E[I_i]=P(i\in s)=\frac nN=:f.
$$

また $i\ne j$ について

$$
P(I_i=1,I_j=1)
=\frac{n(n-1)}{N(N-1)}.
$$

したがって

$$
\operatorname{Var}(I_i)=f(1-f),
$$

$$
\begin{aligned}
\operatorname{Cov}(I_i,I_j)
&=\frac{n(n-1)}{N(N-1)}-\frac{n^2}{N^2}\\
&=-\frac{f(1-f)}{N-1}.
\end{aligned}
$$

ここで

$$
z_i=y_i-\bar Y
$$

と置くと $\sum_i z_i=0$ であり、

$$
\bar y-\bar Y
=\frac1n\sum_{i=1}^NI_i z_i.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(\bar y)
&=\frac1{n^2}
\left\{
\sum_i z_i^2\operatorname{Var}(I_i)
+2\sum_{i<j}z_i z_j\operatorname{Cov}(I_i,I_j)
\right\}.
\end{aligned}
$$

$\sum_i z_i=0$ から

$$
2\sum_{i<j}z_i z_j
=\left(\sum_i z_i\right)^2-\sum_i z_i^2
=-\sum_i z_i^2.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\bar y)
&=\frac{f(1-f)}{n^2}
\left(1+\frac1{N-1}\right)
\sum_i z_i^2\\
&=\frac{f(1-f)}{n^2}
\frac{N}{N-1}(N-1)S^2\\
&=\frac{1-f}{n}S^2.
\end{aligned}
$$

$f=n/N$ を戻せば

$$
\boxed{
\operatorname{Var}(\bar y_h)
=\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}
}.
$$

異なる層の標本抽出は独立だから

$$
\operatorname{Cov}(\bar y_h,\bar y_{h'})=0,
\qquad h\ne h'.
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

### 2. 母総計の Horvitz–Thompson 推定量と不偏性

母総計を

$$
Y=\sum_{h=1}^H\sum_{i=1}^{N_h}y_{hi}
$$

とする。

層 $h$ では $N_h$ 個から $n_h$ 個を単純無作為抽出するので、各個体の包含確率は

$$
\pi_{hi}=P(i\in s_h)=\frac{n_h}{N_h}.
$$

Horvitz–Thompson 推定量は、標本に入った各個体を包含確率の逆数で重み付けした

$$
\widehat Y_{HT}
=\sum_{h=1}^H\sum_{i\in s_h}\frac{y_{hi}}{\pi_{hi}}
$$

である。

包含指示変数 $I_{hi}$ を使えば

$$
\widehat Y_{HT}
=\sum_h\sum_i\frac{I_{hi}y_{hi}}{\pi_{hi}}.
$$

従って

$$
\begin{aligned}
E[\widehat Y_{HT}]
&=\sum_h\sum_i
\frac{E[I_{hi}]y_{hi}}{\pi_{hi}}\\
&=\sum_h\sum_i
\frac{\pi_{hi}y_{hi}}{\pi_{hi}}\\
&=Y.
\end{aligned}
$$

よって不偏である。

本問では $\pi_{hi}=n_h/N_h$ なので

$$
\begin{aligned}
\widehat Y_{HT}
&=\sum_h\frac{N_h}{n_h}
\sum_{i\in s_h}y_{hi}\\
&=\boxed{\sum_h N_h\bar y_h}.
\end{aligned}
$$

### 3. Neyman 配分の導出

総標本数

$$
\sum_{h=1}^H n_h=n
$$

を固定し、$n_h$ を連続量としてまず最適化する。

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

第2項は $n_h$ に依存しない。従って最小化すべき部分は

$$
Q(n_1,\ldots,n_H)
=\sum_h\frac{N_h^2S_h^2}{n_h}
$$

である。

Lagrange 関数を

$$
\mathcal L
=\sum_h\frac{N_h^2S_h^2}{n_h}
+\lambda\left(\sum_h n_h-n\right)
$$

と置く。

各 $n_h$ で偏微分すると

$$
\frac{\partial\mathcal L}{\partial n_h}
=-\frac{N_h^2S_h^2}{n_h^2}+\lambda.
$$

1次条件は

$$
-\frac{N_h^2S_h^2}{n_h^2}+\lambda=0,
$$

すなわち

$$
\lambda=\frac{N_h^2S_h^2}{n_h^2}.
$$

$n_h>0$ なので正の平方根を取り

$$
\sqrt\lambda=\frac{N_hS_h}{n_h}.
$$

従って全ての層で

$$
\frac{n_h}{N_hS_h}
$$

が同じ定数になり、

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

実際の $n_h$ は整数なので、最後は総和が $n$ になるよう丸めを調整する。

### 4. 数値例

各層の $N_hS_h$ は

$$
N_1S_1=100\cdot1=100,
$$

$$
N_2S_2=200\cdot2=400.
$$

従って配分比は

$$
100:400=1:4.
$$

総標本数60なので

$$
n_1=60\frac{100}{500}=12,
$$

$$
n_2=60\frac{400}{500}=48.
$$

よって

$$
\boxed{n_1=12,\qquad n_2=48}.
$$

## 本番答案

$$
\bar y_{st}=\sum_hW_h\bar y_h,
\qquad
W_h=\frac{N_h}{N}.
$$

層 $h$ の単純無作為抽出では包含指示変数の共分散から

$$
\operatorname{Var}(\bar y_h)
=\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}.
$$

異なる層は独立なので

$$
\operatorname{Var}(\bar y_{st})
=\sum_hW_h^2
\left(1-\frac{n_h}{N_h}\right)
\frac{S_h^2}{n_h}.
$$

包含確率は $\pi_{hi}=n_h/N_h$ だから

$$
\widehat Y_{HT}
=\sum_{h,i\in s_h}\frac{y_{hi}}{\pi_{hi}}
=\sum_hN_h\bar y_h,
$$

かつ $E[I_{hi}/\pi_{hi}]=1$ より不偏である。

配分では定数項を除いて

$$
\sum_h\frac{N_h^2S_h^2}{n_h}
$$

を $\sum_hn_h=n$ の下で最小化する。Lagrange 法より

$$
-\frac{N_h^2S_h^2}{n_h^2}+\lambda=0
$$

だから

$$
\boxed{
n_h
=n\frac{N_hS_h}{\sum_jN_jS_j}
}.
$$

数値例では $N_hS_h=100,400$ なので

$$
\boxed{(n_1,n_2)=(12,48)}.
$$

## 採点基準

- 層化平均の不偏性と有限母集団補正付き分散の導出: 6点
- 包含確率から Horvitz–Thompson 推定量を構成し不偏性を確認: 5点
- Lagrange 法による Neyman 配分導出: 6点
- 数値配分: 3点
