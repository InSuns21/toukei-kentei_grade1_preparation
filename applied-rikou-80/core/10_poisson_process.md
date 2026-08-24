# Core 10 Poisson過程・到着回数・指数待ち時間

- 安定ID: `RIKOU-CORE-10`
- 80大問 No.: 13
- 演習価値: S
- 難度: B
- 目安時間: 25分

## 問題

$\{N(t):t\ge0\}$ を率 $\lambda=2$ の Poisson 過程とする。時間単位は時間とする。

1. $N(2)$ の分布を求め、$P(N(2)=3)$ を計算せよ。
2. 第1到着時間 $T_1$ が指数分布に従うことを Poisson 過程から導け。
3. 第3到着時間 $T_3$ の分布を答え、$P(T_3\le1)$ を求めよ。
4. $N(1)$ と $N(3)-N(2)$ が独立である理由を述べ、それぞれの分布を答えよ。

## 詳細解答

### 1. 到着回数

Poisson 過程の定義から

$$
N(t)\sim\operatorname{Poisson}(\lambda t).
$$

よって $N(2)\sim\operatorname{Poisson}(4)$ で

$$
P(N(2)=3)=e^{-4}\frac{4^3}{3!}=\frac{32}{3}e^{-4}.
$$

### 2. 第1到着時間

$T_1>t$ は時刻 $t$ まで到着がないことと同値だから

$$
P(T_1>t)=P(N(t)=0)=e^{-2t}.
$$

したがって

$$
F_{T_1}(t)=1-e^{-2t},\qquad t\ge0,
$$

つまり $T_1\sim\operatorname{Exponential}(2)$。

### 3. 第3到着

独立な指数待ち時間の和なので

$$
T_3\sim\operatorname{Gamma}(3,\text{rate }2).
$$

また事象の同値

$$
\{T_3\le1\}=\{N(1)\ge3\}
$$

を使えば

$$
P(T_3\le1)
=1-P(N(1)\le2)
=1-e^{-2}\left(1+2+\frac{2^2}{2}\right)
=1-5e^{-2}.
$$

### 4. 独立増分

区間 $[0,1]$ と $(2,3]$ は互いに素なので、独立増分性により $N(1)$ と $N(3)-N(2)$ は独立。どちらも長さ1の区間の到着数だから

$$
N(1)\sim\operatorname{Poisson}(2),\qquad N(3)-N(2)\sim\operatorname{Poisson}(2).
$$

## 本番答案

$N(2)\sim\operatorname{Poisson}(4)$ だから

$$
P(N(2)=3)=e^{-4}\frac{4^3}{3!}.
$$

また

$$
P(T_1>t)=P(N(t)=0)=e^{-2t},
$$

ゆえに $T_1\sim\operatorname{Exp}(2)$。第3到着は $T_3\sim\operatorname{Gamma}(3,\text{rate }2)$ で

$$
P(T_3\le1)=P(N(1)\ge3)=1-5e^{-2}.
$$

$[0,1]$ と $(2,3]$ は互いに素な区間なので独立増分性から $N(1)$ と $N(3)-N(2)$ は独立で、いずれも Poisson$(2)$。

## 採点基準

- (1) Poisson分布と確率: 5点
- (2) 指数待ち時間の導出: 5点
- (3) Gamma分布と事象変換: 6点
- (4) 独立増分: 4点

25分経過時は $\{T_3\le1\}=\{N(1)\ge3\}$ の変換を必ず書き、積分計算を避ける。
