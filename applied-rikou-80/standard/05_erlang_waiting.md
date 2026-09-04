# Standard 05 指数寿命の和・ガンマ/Erlang

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

### 1. $S_3$ の密度

「独立な指数分布の和はGamma分布」とだけ置くと、この設問で求められている密度導出を飛ばしてしまう。ここでは畳み込みから確認する。

各 $T_i$ の密度は

$$
f_T(t)=\lambda e^{-\lambda t},\qquad t>0.
$$

まず $S_2=T_1+T_2$ とする。$s>0$ で

$$
\begin{aligned}
f_{S_2}(s)
&=\int_0^s f_T(u)f_T(s-u)\,du\\
&=\int_0^s \lambda e^{-\lambda u}
\lambda e^{-\lambda(s-u)}\,du\\
&=\lambda^2e^{-\lambda s}\int_0^sdu\\
&=\lambda^2s e^{-\lambda s}.
\end{aligned}
$$

次に $S_3=S_2+T_3$ だから、再び畳み込む。

$$
\begin{aligned}
f_{S_3}(s)
&=\int_0^s f_{S_2}(u)f_T(s-u)\,du\\
&=\int_0^s
\lambda^2u e^{-\lambda u}
\lambda e^{-\lambda(s-u)}\,du\\
&=\lambda^3e^{-\lambda s}\int_0^s u\,du\\
&=\lambda^3e^{-\lambda s}\frac{s^2}{2}.
\end{aligned}
$$

従って

$$
\boxed{
f_{S_3}(s)=\frac{\lambda^3s^2}{2}e^{-\lambda s},
\qquad s>0
}.
$$

これは形状母数3、率母数 $\lambda$ のGamma分布、整数形状なのでErlang分布の密度である。

### 2. 生存確率 $P(S_3>t)$

第4問のPoisson過程との対応を使うと計算が短い。率 $\lambda$ のPoisson過程で到着間隔が独立な率 $\lambda$ の指数分布なら、

$$
S_3=T_1+T_2+T_3
$$

は第3到着時刻である。

第3到着が時刻 $t$ より後であることは、時刻 $t$ までの到着数が0,1,2のいずれかであることと同値である。

$$
\{S_3>t\}=\{N(t)\le2\}.
$$

$N(t)\sim\operatorname{Poisson}(\lambda t)$ なので

$$
\begin{aligned}
P(S_3>t)
&=\sum_{j=0}^2
 e^{-\lambda t}\frac{(\lambda t)^j}{j!}\\
&=e^{-\lambda t}
\left(
1+\lambda t+\frac{(\lambda t)^2}{2}
\right).
\end{aligned}
$$

従って

$$
\boxed{
P(S_3>t)=e^{-\lambda t}
\left(1+\lambda t+\frac{(\lambda t)^2}{2}\right)
}.
$$

### 3. 平均と分散

和の期待値は常に期待値の和であるから

$$
\begin{aligned}
E[S_3]
&=E[T_1]+E[T_2]+E[T_3]\\
&=\frac1\lambda+\frac1\lambda+\frac1\lambda\\
&=\boxed{\frac3\lambda}.
\end{aligned}
$$

分散については独立性を使う。独立なら共分散項が0なので

$$
\begin{aligned}
\operatorname{Var}(S_3)
&=\sum_{i=1}^3\operatorname{Var}(T_i)\\
&=3\cdot\frac1{\lambda^2}\\
&=\boxed{\frac3{\lambda^2}}.
\end{aligned}
$$

指数分布の平均 $1/\lambda$、分散 $1/\lambda^2$ を使っている。

### 4. Poisson過程の第3到着時刻との関係

率 $\lambda$ のPoisson過程では、連続する到着間隔

$$
W_1,W_2,\ldots
$$

は独立同分布で

$$
W_i\sim\operatorname{Exponential}(\lambda)
$$

に従う。

第3到着時刻は

$$
A_3=W_1+W_2+W_3.
$$

本問の $T_1,T_2,T_3$ と同じ独立指数分布を足しているため

$$
\boxed{S_3\overset d=A_3}.
$$

この対応から一般に

$$
P(S_r>t)=P\{N(t)\le r-1\}
$$

が得られる。

### 5. $\lambda=2,t=1$

第3到着が時刻1以内に起こることは、1までに少なくとも3回到着することと同値である。

$$
\{S_3\le1\}=\{N(1)\ge3\}.
$$

$\lambda=2$ なので

$$
N(1)\sim\operatorname{Poisson}(2).
$$

従って

$$
\begin{aligned}
P(S_3\le1)
&=1-P\{N(1)\le2\}\\
&=1-e^{-2}\left(1+2+\frac{2^2}{2}\right)\\
&=\boxed{1-5e^{-2}}.
\end{aligned}
$$

## 本番答案

指数密度 $f(t)=\lambda e^{-\lambda t}$ を2回畳み込むと

$$
f_{T_1+T_2}(s)=\lambda^2se^{-\lambda s},
$$

さらに

$$
f_{S_3}(s)
=\int_0^s\lambda^2u e^{-\lambda u}
\lambda e^{-\lambda(s-u)}du
=\frac{\lambda^3s^2}{2}e^{-\lambda s}.
$$

また $S_3$ は率 $\lambda$ のPoisson過程の第3到着時刻と同分布なので

$$
P(S_3>t)=P\{N(t)\le2\}
=e^{-\lambda t}\left(1+\lambda t+\frac{(\lambda t)^2}{2}\right).
$$

独立性より

$$
E[S_3]=3/\lambda,
\qquad
\operatorname{Var}(S_3)=3/\lambda^2.
$$

$\lambda=2,t=1$ なら

$$
P(S_3\le1)=P\{N(1)\ge3\}=1-5e^{-2}.
$$

## 採点基準

- 指数密度から2段階の畳み込みで密度を導出: 6点
- 第3到着時刻との事象同値から生存関数を導く: 5点
- 独立和の平均・分散: 3点
- Poisson過程の到着間隔との対応: 3点
- $\lambda=2,t=1$ の事象とPoisson確率: 3点

20分経過時は畳み込みを1段でも書き、$\{S_3>t\}=\{N(t)\le2\}$ を確保する。
