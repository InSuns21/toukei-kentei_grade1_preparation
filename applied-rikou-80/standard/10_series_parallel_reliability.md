# Standard 10 直列・並列システム信頼度

- 安定ID: `RIKOU-STANDARD-10`
- 80大問 No.: 10
- 演習価値: B
- 難度: B
- 目安時間: 20〜25分
- 電卓: 指数関数の数値化不要

## 問題

独立な部品A,Bの寿命がそれぞれ率 $\lambda_A,\lambda_B$ の指数分布に従う。

1. A,Bの両方が動作して初めて機能する直列系の信頼度を求めよ。
2. 直列系寿命の分布と平均故障時間を求めよ。
3. 直列系が故障したとき、最初の故障原因がAである確率を求めよ。
4. どちらか一方が動けば機能する並列系の信頼度を求めよ。
5. $\lambda_A=\lambda_B=\lambda$ のとき並列系平均故障時間を求めよ。
6. 独立性が失われると上式をそのまま使えない理由を述べよ。

## 詳細解答

### 1. 直列系の信頼度

部品寿命を $T_A,T_B$ とする。直列系はAとBの**両方**が時刻 $t$ で生存しているときだけ動作する。

従って直列系寿命は

$$
T_s=\min(T_A,T_B)
$$

であり、信頼度は

$$
\begin{aligned}
R_s(t)
&=P(T_s>t)\\
&=P(T_A>t,T_B>t).
\end{aligned}
$$

独立性から同時確率を積へ分解できるので

$$
\begin{aligned}
R_s(t)
&=P(T_A>t)P(T_B>t)\\
&=e^{-\lambda_A t}e^{-\lambda_B t}\\
&=\boxed{e^{-(\lambda_A+\lambda_B)t}}.
\end{aligned}
$$

### 2. 直列系寿命の分布と平均故障時間

前問で

$$
P(T_s>t)=e^{-(\lambda_A+\lambda_B)t}
$$

を得た。これは率 $\lambda_A+\lambda_B$ の指数分布の生存関数である。

したがって

$$
\boxed{
T_s\sim\operatorname{Exponential}(\lambda_A+\lambda_B)
}.
$$

率 $r$ の指数分布の平均は $1/r$ なので

$$
\boxed{
E[T_s]=\frac1{\lambda_A+\lambda_B}
}.
$$

生存関数を積分して確認しても

$$
E[T_s]
=\int_0^\infty R_s(t)\,dt
=\int_0^\infty e^{-(\lambda_A+\lambda_B)t}dt
=\frac1{\lambda_A+\lambda_B}.
$$

### 3. 最初の故障原因がAである確率

Aが最初に故障する事象は

$$
\{T_A<T_B\}
$$

である。Aが時刻 $t$ 付近で故障し、その時点までBが生存している確率密度を積分する。

Aの密度は

$$
f_A(t)=\lambda_Ae^{-\lambda_A t},
$$

Bの生存関数は

$$
P(T_B>t)=e^{-\lambda_B t}.
$$

独立性より

$$
\begin{aligned}
P(T_A<T_B)
&=\int_0^\infty
f_A(t)P(T_B>t)\,dt\\
&=\int_0^\infty
\lambda_Ae^{-\lambda_A t}e^{-\lambda_B t}\,dt\\
&=\lambda_A
\int_0^\infty e^{-(\lambda_A+\lambda_B)t}dt\\
&=\boxed{
\frac{\lambda_A}{\lambda_A+\lambda_B}
}.
\end{aligned}
$$

「競合指数寿命の公式」として暗記するより、この密度×他方の生存確率の積分を再現できることが重要である。

### 4. 並列系の信頼度

並列系はA,Bの少なくとも一方が動けば機能する。したがって停止するのは両方が時刻 $t$ までに故障した場合だけである。

並列系寿命は

$$
T_p=\max(T_A,T_B)
$$

であり、

$$
\begin{aligned}
R_p(t)
&=P(T_p>t)\\
&=1-P(T_p\le t)\\
&=1-P(T_A\le t,T_B\le t).
\end{aligned}
$$

独立性から

$$
P(T_A\le t,T_B\le t)
=P(T_A\le t)P(T_B\le t).
$$

指数分布の累積確率は

$$
P(T_A\le t)=1-e^{-\lambda_A t},
\qquad
P(T_B\le t)=1-e^{-\lambda_B t}.
$$

よって

$$
\boxed{
R_p(t)=1-
(1-e^{-\lambda_A t})(1-e^{-\lambda_B t})
}.
$$

展開すると

$$
R_p(t)
=e^{-\lambda_A t}+e^{-\lambda_B t}
-e^{-(\lambda_A+\lambda_B)t}.
$$

### 5. 同率の場合の並列系平均故障時間

$\lambda_A=\lambda_B=\lambda$ なら

$$
R_p(t)
=2e^{-\lambda t}-e^{-2\lambda t}.
$$

非負寿命では平均は生存関数の積分で求められる。

$$
E[T_p]=\int_0^\infty R_p(t)dt.
$$

従って

$$
\begin{aligned}
E[T_p]
&=\int_0^\infty
\left(2e^{-\lambda t}-e^{-2\lambda t}\right)dt\\
&=2\cdot\frac1\lambda-\frac1{2\lambda}\\
&=\boxed{\frac3{2\lambda}}.
\end{aligned}
$$

直列系の同率の場合は平均 $1/(2\lambda)$ なので、構成の違いで平均寿命が大きく変わることも確認できる。

### 6. 独立性がない場合

直列系で使った

$$
P(T_A>t,T_B>t)
=P(T_A>t)P(T_B>t)
$$

も、並列系で使った

$$
P(T_A\le t,T_B\le t)
=P(T_A\le t)P(T_B\le t)
$$

も独立性があって初めて成り立つ。

共通電源、共通温度、振動、同一製造ロットなどの共通原因があると、AとBの故障は依存しうる。このとき周辺の寿命分布だけからシステム信頼度は決まらず、同時分布や依存構造が必要になる。

## 本番答案

直列系寿命は $T_s=\min(T_A,T_B)$ なので

$$
\begin{aligned}
R_s(t)
&=P(T_A>t,T_B>t)\\
&=e^{-\lambda_A t}e^{-\lambda_B t}\\
&=e^{-(\lambda_A+\lambda_B)t}.
\end{aligned}
$$

従って

$$
T_s\sim\operatorname{Exponential}(\lambda_A+\lambda_B),
\qquad
E[T_s]=\frac1{\lambda_A+\lambda_B}.
$$

原因Aの確率は

$$
\int_0^\infty
\lambda_Ae^{-\lambda_A t}e^{-\lambda_B t}dt
=\frac{\lambda_A}{\lambda_A+\lambda_B}.
$$

並列系は $T_p=\max(T_A,T_B)$ なので

$$
R_p(t)=1-(1-e^{-\lambda_A t})(1-e^{-\lambda_B t}).
$$

同率なら

$$
R_p(t)=2e^{-\lambda t}-e^{-2\lambda t},
$$

よって

$$
E[T_p]
=\int_0^\infty R_p(t)dt
=\frac3{2\lambda}.
$$

独立でなければ同時生存・同時故障確率を周辺確率の積へ分解できない。

## 採点基準

- 直列系を最小寿命として同時生存確率から導出: 4点
- 指数分布の同定と平均故障時間: 3点
- 原因A確率を密度×他方の生存確率で積分: 4点
- 並列系を最大寿命として補集合から導出: 4点
- 生存関数の積分から並列平均故障時間を計算: 3点
- 独立性を使った箇所と依存時の問題を説明: 2点

20分経過時は直列=min、並列=max、原因確率の積分を確保する。
