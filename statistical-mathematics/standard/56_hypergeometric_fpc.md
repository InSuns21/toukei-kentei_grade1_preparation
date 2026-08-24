# Standard 18 超幾何分布・有限母集団補正

- 旧No.: 56
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

大きさ $N$ の有限母集団に成功個体が $K$ 個ある。復元なしに $n$ 個抽出し、成功数を $X$ とする。

1. $E[X]$, $\operatorname{Var}(X)$ を求めよ。
2. 母集団成功数 $K$ の不偏推定量を作れ。
3. 復元抽出の二項分布と比べ、有限母集団補正の意味を説明せよ。

## 詳細解答

$X\sim Hypergeometric(N,K,n)$ で

$$
E[X]=n\frac KN,
$$

$$
\operatorname{Var}(X)
=n\frac KN\left(1-\frac KN\right)\frac{N-n}{N-1}.
$$

従って

$$
\widehat K=\frac NnX
$$

は $E[\widehat K]=K$ で不偏。

分散中の

$$
\frac{N-n}{N-1}
$$

が有限母集団補正で、復元なし抽出では同じ個体を再度引けないため二項分布より変動が小さい。$n/N$ が無視できるほど小さいと補正はほぼ1。

## 本番答案

$$
E[X]=nK/N,
$$

$$
\operatorname{Var}(X)=n(K/N)(1-K/N)\frac{N-n}{N-1}.
$$

従って $\widehat K=(N/n)X$ は不偏。最後の因子が復元なし抽出による有限母集団補正。

## 採点基準

- 平均: 4点
- 分散: 6点
- 不偏推定量: 5点
- 有限母集団補正の解釈: 5点
