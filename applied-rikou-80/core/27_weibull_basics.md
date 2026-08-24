# Core 27 Weibull分布・中央値・最頻値・ハザード

- 安定ID: `RIKOU-CORE-27`
- 80大問 No.: 01
- 演習価値: S
- 難度: B
- 目安時間: 25分

## 問題

Weibull$(k,\eta)$ の分布関数を

$$
F(t)=1-\exp\left\{-\left(\frac t\eta\right)^k\right\},
\qquad t>0,\ k,\eta>0
$$

とする。

1. 密度、信頼度関数、ハザード関数を求めよ。
2. 中央値を求めよ。
3. $k>1$ のとき最頻値を求めよ。
4. 平均を Gamma 関数を用いて表せ。
5. $k<1,k=1,k>1$ でハザードの形がどう変わるか。

## 詳細解答

### 1. 基本量

$$
S(t)=1-F(t)=e^{-(t/\eta)^k}.
$$

微分して

$$
f(t)=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}e^{-(t/\eta)^k}.
$$

したがって

$$
\boxed{h(t)=\frac{f(t)}{S(t)}=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}}.
$$

### 2. 中央値

$F(m)=1/2$ より

$$
e^{-(m/\eta)^k}=1/2.
$$

したがって

$$
\boxed{m=\eta(\log2)^{1/k}}.
$$

### 3. 最頻値

対数密度の微分を0とすると

$$
\frac{k-1}{t}-\frac{k t^{k-1}}{\eta^k}=0.
$$

よって

$$
t^k=\eta^k\frac{k-1}{k},
$$

$$
\boxed{t_{\mathrm{mode}}=\eta\left(\frac{k-1}{k}\right)^{1/k}}.
$$

### 4. 平均

$U=(T/\eta)^k\sim\operatorname{Exp}(1)$ を使うと

$$
E[T]=\eta E[U^{1/k}]
=\boxed{\eta\Gamma(1+1/k)}.
$$

### 5. ハザード形状

$h(t)\propto t^{k-1}$ なので、$k<1$ で減少、$k=1$ で一定、$k>1$ で増加する。初期故障・偶発故障・摩耗故障の基本モデルとして解釈できる。

## 本番答案

$$
S(t)=e^{-(t/\eta)^k},
$$

$$
f(t)=\frac{k}{\eta}(t/\eta)^{k-1}e^{-(t/\eta)^k},
$$

$$
h(t)=\frac{k}{\eta}(t/\eta)^{k-1}.
$$

中央値、最頻値、平均は

$$
m=\eta(\log2)^{1/k},
$$

$$
t_{\mathrm{mode}}=\eta\left(\frac{k-1}{k}\right)^{1/k}\ (k>1),
$$

$$
E[T]=\eta\Gamma(1+1/k).
$$

$k<1,=1,>1$ でハザードはそれぞれ減少、一定、増加。

## 採点基準

- 密度・生存・ハザード: 7点
- 中央値: 3点
- 最頻値: 4点
- 平均: 3点
- ハザード解釈: 3点

25分経過時は最頻値の微分を簡潔にし、ハザード形状まで答える。
