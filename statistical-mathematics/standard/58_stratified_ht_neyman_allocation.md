# Standard 19 層化抽出・Horvitz–Thompson・Neyman配分

- 旧No.: 58
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ○

## 問題

母集団を $H$ 層に分け、層 $h$ の大きさを $N_h$、標本数を $n_h$、母標準偏差を $S_h$ とする。各層で単純無作為抽出する。

1. 母平均の層化推定量と分散を書け。
2. 母総計のHorvitz–Thompson推定量を書け。
3. 総標本数 $n$ 固定、抽出単価が同じときNeyman配分を導け。
4. $N_1=100,N_2=200,S_1=1,S_2=2,n=60$ の配分を求めよ。

## 詳細解答

$W_h=N_h/N$ とすると

$$
\bar y_{st}=\sum_hW_h\bar y_h,
$$

$$
\operatorname{Var}(\bar y_{st})
=\sum_hW_h^2\left(1-\frac{n_h}{N_h}\right)\frac{S_h^2}{n_h}.
$$

各層内の包含確率は $\pi_{hi}=n_h/N_h$。従って総計のHT推定量は

$$
\widehat Y_{HT}
=\sum_h\sum_{i\in s_h}\frac{y_{hi}}{\pi_{hi}}
=\sum_h\frac{N_h}{n_h}\sum_{i\in s_h}y_{hi}.
$$

有限母集団補正を配分最適化で定数項として整理すると、主要項は $\sum_hN_h^2S_h^2/n_h$。Lagrange法より

$$
\boxed{n_h=n\frac{N_hS_h}{\sum_jN_jS_j}}.
$$

例では重みが $100:400=1:4$ なので

$$
n_1=12,
\qquad
n_2=48.
$$

## 本番答案

$$
\bar y_{st}=\sum_hW_h\bar y_h,
\quad
Var(\bar y_{st})=\sum_hW_h^2(1-f_h)S_h^2/n_h.
$$

HT総計は $\sum_{h,i\in s_h}y_{hi}/\pi_{hi}$。等単価なら Neyman配分 $n_h\propto N_hS_h$。例では $12,48$。

## 採点基準

- 層化平均・分散: 6点
- HT推定量: 5点
- Neyman配分導出: 6点
- 数値配分: 3点
