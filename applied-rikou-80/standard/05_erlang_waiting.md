# Standard 05 指数寿命の和・Gamma/Erlang

- 安定ID: `RIKOU-STANDARD-05`
- 80大問 No.: 05
- 演習価値: A
- 難度: B
- 目安時間: 20〜25分
- 電卓: $e^{-x}$ の数値化は不要

## 問題

$T_1,T_2,T_3$ は独立に率 $\lambda$ の指数分布に従い、$S_3=T_1+T_2+T_3$ とする。

1. $S_3$ の密度を求めよ。
2. $P(S_3>t)$ を求めよ。
3. $E[S_3]$ と $\operatorname{Var}(S_3)$ を求めよ。
4. 率 $\lambda$ のPoisson過程の第3到着時刻との関係を説明せよ。
5. $\lambda=2,t=1$ で $P(S_3\le1)$ をPoisson確率で表せ。

## 詳細解答

独立指数の3個和はGamma分布で

$$
f_{S_3}(s)=\frac{\lambda^3s^2}{2}e^{-\lambda s},\qquad s>0.
$$

第3到着が時刻 $t$ より後とは $t$ までの到着数が2以下であることなので

$$
P(S_3>t)=e^{-\lambda t}\left(1+\lambda t+\frac{(\lambda t)^2}{2}\right).
$$

また

$$
E[S_3]=\frac3\lambda,\qquad \operatorname{Var}(S_3)=\frac3{\lambda^2}.
$$

$\lambda=2,t=1$ では

$$
P(S_3\le1)=P\{N(1)\ge3\}=1-5e^{-2}.
$$

## 本番答案

$S_3\sim\operatorname{Gamma}(3,\text{rate }\lambda)$。したがって密度は $\lambda^3s^2e^{-\lambda s}/2$、生存関数は $e^{-\lambda t}\{1+\lambda t+(\lambda t)^2/2\}$、平均 $3/\lambda$、分散 $3/\lambda^2$。第3到着時刻と同分布で、$\lambda=2$ なら $P(S_3\le1)=1-5e^{-2}$。

## 採点基準

- 密度: 5点
- 生存関数: 5点
- 平均・分散: 4点
- Poisson過程との対応: 3点
- 数値設定の式: 3点

20分経過時は積分せず、Poisson到着数との事象同値を使う。
