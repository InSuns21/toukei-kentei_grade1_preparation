# Advanced 18 層化Monte Carlo法

- 旧No.: 95
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$$
I=\int_0^1x^2dx=\frac13
$$

を推定する。総試行数 $n$ は偶数とする。

1. $U\sim U(0,1)$ の単純Monte Carlo推定量の分散を求めよ。
2. 区間 $[0,1/2]$, $[1/2,1]$ に分け、各層で $n/2$ 個ずつ一様乱数を生成する層化推定量を書け。
3. 各層での $X^2$ の分散がそれぞれ $1/180$, $17/360$ であることを用い、層化推定量の分散を求めよ。
4. 分散削減率を比較せよ。

## 詳細解答

### 1. 単純Monte Carlo推定量

$U_1,\ldots,U_n$ を独立な $U(0,1)$ とし

$$
\widehat I_{\mathrm{simple}}
=\frac1n\sum_{i=1}^nU_i^2
$$

とする。

期待値は

$$
E[U^2]=\int_0^1u^2du=\frac13=I
$$

なので不偏である。

また

$$
E[U^4]=\int_0^1u^4du=\frac15.
$$

従って

$$
\operatorname{Var}(U^2)
=\frac15-\frac19
=\frac4{45}.
$$

独立な標本平均なので

$$
\boxed{
\operatorname{Var}(\widehat I_{\mathrm{simple}})
=\frac4{45n}
=\frac{64}{720n}
}.
$$

### 2. 層化推定量

区間を

$$
A_1=[0,1/2],
\qquad
A_2=[1/2,1]
$$

に分ける。元の一様分布では各層の確率は

$$
W_1=W_2=\frac12.
$$

各層から独立に $n/2$ 個ずつ生成し、層 $h$ での $X^2$ の標本平均を $\bar W_h$ とする。

条件付き期待値の分解

$$
E[X^2]
=\sum_{h=1}^2P(X\in A_h)E[X^2\mid X\in A_h]
$$

をそのまま標本平均に置き換えると

$$
\boxed{
\widehat I_{\mathrm{str}}
=\frac12\bar W_1+\frac12\bar W_2
}.
$$

各 $\bar W_h$ は対応する条件付き期待値の不偏推定量なので、層化推定量も $I$ の不偏推定量である。

### 3. 層化推定量の分散

層ごとの標本は独立だから

$$
\operatorname{Cov}(\bar W_1,\bar W_2)=0.
$$

したがって

$$
\operatorname{Var}(\widehat I_{\mathrm{str}})
=\frac14\operatorname{Var}(\bar W_1)
+\frac14\operatorname{Var}(\bar W_2).
$$

各層で標本数は $n/2$ なので

$$
\operatorname{Var}(\bar W_1)
=\frac{1/180}{n/2}
=\frac{2}{180n},
$$

$$
\operatorname{Var}(\bar W_2)
=\frac{17/360}{n/2}
=\frac{34}{360n}.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(\widehat I_{\mathrm{str}})
&=\frac14\frac{2}{180n}
+\frac14\frac{34}{360n}\\
&=\frac{1}{360n}+\frac{17}{720n}\\
&=\boxed{\frac{19}{720n}}.
\end{aligned}
$$

### 4. 分散削減率

単純法は

$$
\operatorname{Var}(\widehat I_{\mathrm{simple}})
=\frac{64}{720n}
$$

だったので、層化法と単純法の分散比は

$$
\boxed{
\frac{\operatorname{Var}(\widehat I_{\mathrm{str}})}
{\operatorname{Var}(\widehat I_{\mathrm{simple}})}
=\frac{19}{64}
\approx0.297
}.
$$

つまり分散は単純法の約30%まで下がる。削減率で書けば

$$
1-\frac{19}{64}
=\frac{45}{64}
\approx0.703
$$

で、約70%の分散削減である。

層化の効果は、$x^2$ が区間全体では大きく変動する一方、各半区間の中では変動幅が小さくなることから生じる。各層内で似た値同士に分けた後に平均することで、層内分散を下げている。

## 本番答案

単純法は

$$
\widehat I_{\mathrm{simple}}
=\frac1n\sum U_i^2,
$$

$$
\operatorname{Var}(U^2)
=E[U^4]-E[U^2]^2
=\frac15-\frac19
=\frac4{45},
$$

よって

$$
\operatorname{Var}(\widehat I_{\mathrm{simple}})
=\frac4{45n}
=\frac{64}{720n}.
$$

層重みは各 $1/2$、各層標本数は $n/2$ なので

$$
\widehat I_{\mathrm{str}}
=\frac12\bar W_1+\frac12\bar W_2,
$$

$$
\begin{aligned}
\operatorname{Var}(\widehat I_{\mathrm{str}})
&=\frac14\frac{1/180}{n/2}
+\frac14\frac{17/360}{n/2}\\
&=\frac{19}{720n}.
\end{aligned}
$$

したがって分散比は

$$
\frac{19}{64}
$$

であり、約70%の分散削減となる。

## 採点基準

- 単純法の不偏性・分散: 5点
- 層化推定量を条件付き期待値分解から構成: 5点
- 層ごとの標本数を含めた分散計算: 6点
- 分散比・削減率・解釈: 4点
