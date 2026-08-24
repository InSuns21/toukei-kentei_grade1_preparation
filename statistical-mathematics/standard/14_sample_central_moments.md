# Standard 04 標本中心モーメント・不偏補正

- 旧No.: 14
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$i.i.d.$ 標本 $X_1,\ldots,X_n$ の母平均を $\mu$、母分散を $\sigma^2$、三次中心モーメントを $\mu_3$ とする。

$$
m_2=\frac1n\sum_{i=1}^n(X_i-\bar X)^2,
\qquad
m_3=\frac1n\sum_{i=1}^n(X_i-\bar X)^3
$$

とする。

1. $E[m_2]$ を求めよ。
2. $E[m_3]$ を求めよ。
3. $\sigma^2,\mu_3$ の不偏推定量を作れ。

## 詳細解答

既知の分解

$$
\sum(X_i-\bar X)^2
=\sum(X_i-\mu)^2-n(\bar X-\mu)^2
$$

より

$$
E[m_2]=\frac{n-1}{n}\sigma^2.
$$

三次について $Y_i=X_i-\mu$, $\bar Y=\bar X-\mu$ と置き

$$
\sum(Y_i-\bar Y)^3
=\sum Y_i^3-3\bar Y\sum Y_i^2+2n\bar Y^3.
$$

独立性を用いて期待値を取ると

$$
E[m_3]=\frac{(n-1)(n-2)}{n^2}\mu_3.
$$

従って

$$
\boxed{S^2=\frac{n}{n-1}m_2},
\qquad
\boxed{\widehat\mu_3=\frac{n^2}{(n-1)(n-2)}m_3}
$$

が不偏。ただし三次は $n\ge3$。

## 本番答案

$$
E[m_2]=\frac{n-1}{n}\sigma^2,
\qquad
E[m_3]=\frac{(n-1)(n-2)}{n^2}\mu_3.
$$

従って不偏化は

$$
\frac{n}{n-1}m_2,
\qquad
\frac{n^2}{(n-1)(n-2)}m_3.
$$

## 採点基準

- 二次中心モーメント: 5点
- 三次の展開: 6点
- 三次の期待値: 5点
- 不偏化: 4点
