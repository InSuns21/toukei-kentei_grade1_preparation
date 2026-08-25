# Core 26 生存関数・ハザード・累積ハザード

- 安定ID: `RIKOU-CORE-26`
- 80大問 No.: 06
- 演習価値: S
- 難度: B
- 目安時間: 20〜25分
- 電卓: 数値特殊関数は不要。Gaussian積分は既知結果として与える

## 問題

非負連続寿命 $T$ のハザード関数が

$$
h(t)=2t,\qquad t\ge0
$$

で与えられる。

1. 累積ハザード $H(t)$ を求めよ。
2. 生存関数 $S(t)$ と分布関数 $F(t)$ を求めよ。
3. 密度 $f(t)$ を求め、$h(t)=f(t)/S(t)$ を確認せよ。
4. $E[T]$ を生存関数の積分から求めよ。ただし

$$
\int_0^\infty e^{-t^2}\,dt=\frac{\sqrt\pi}{2}
$$

は既知としてよい。
5. $s,t>0$ に対して $P(T>s+t\mid T>s)$ を求め、指数分布のような無記憶性を持たないことを示せ。
6. 一般に $H,S,f,h$ の関係式を、定義から導いてまとめよ。

## 詳細解答

### 1. 累積ハザード

累積ハザードはハザードを0から時刻 $t$ まで積分した量である。

$$
H(t)=\int_0^t h(u)\,du.
$$

本問では $h(u)=2u$ だから

$$
\begin{aligned}
H(t)
&=\int_0^t2u\,du\\
&=[u^2]_0^t\\
&=t^2.
\end{aligned}
$$

したがって

$$
\boxed{H(t)=t^2}.
$$

### 2. ハザードから生存関数を導く

ここでは $S(t)=e^{-H(t)}$ を既知公式として置かず、ハザードの定義から導く。

生存関数は

$$
S(t)=P(T>t)
$$

であり、連続分布では

$$
f(t)=-S'(t).
$$

ハザードの定義

$$
h(t)=\frac{f(t)}{S(t)}
$$

へ $f(t)=-S'(t)$ を代入すると

$$
h(t)=-\frac{S'(t)}{S(t)}.
$$

左辺を積分できる形にすると

$$
\frac{d}{dt}\log S(t)=\frac{S'(t)}{S(t)}=-h(t).
$$

0から $t$ まで積分する。非負寿命について $S(0)=1$ だから

$$
\log S(t)-\log S(0)
=-\int_0^t h(u)\,du=-H(t).
$$

$\log S(0)=0$ より

$$
\log S(t)=-H(t),
$$

したがって

$$
S(t)=e^{-H(t)}.
$$

第1問の $H(t)=t^2$ を代入して

$$
\boxed{S(t)=e^{-t^2}}.
$$

分布関数は $F(t)=1-S(t)$ なので

$$
\boxed{F(t)=1-e^{-t^2}}.
$$

### 3. 密度とハザードの確認

連続分布では

$$
f(t)=F'(t)=-S'(t).
$$

$S(t)=e^{-t^2}$ を微分すると

$$
S'(t)=-2te^{-t^2},
$$

よって

$$
\boxed{f(t)=2te^{-t^2}}.
$$

これをハザードの定義へ戻すと

$$
\frac{f(t)}{S(t)}
=\frac{2te^{-t^2}}{e^{-t^2}}
=2t.
$$

したがって与えられた

$$
h(t)=2t
$$

と一致する。

### 4. 生存関数から平均寿命を求める

非負確率変数では

$$
E[T]=\int_0^\infty S(t)\,dt
$$

が成り立つ。この式も本問で使う理由を確認しておく。

各実現値 $T$ について

$$
T=\int_0^\infty I(T>t)\,dt
$$

だから、期待値を取ると

$$
\begin{aligned}
E[T]
&=E\left[\int_0^\infty I(T>t)\,dt\right]\\
&=\int_0^\infty E[I(T>t)]\,dt\\
&=\int_0^\infty P(T>t)\,dt\\
&=\int_0^\infty S(t)\,dt.
\end{aligned}
$$

本問では

$$
E[T]=\int_0^\infty e^{-t^2}\,dt.
$$

問題文で与えられた積分値を使って

$$
\boxed{E[T]=\frac{\sqrt\pi}{2}}.
$$

Gaussian積分そのものの導出は本問の採点対象ではない。

### 5. 条件付き生存確率と無記憶性

$s,t>0$ なら $\{T>s+t\}\subset\{T>s\}$ なので、条件付き確率の定義から

$$
\begin{aligned}
P(T>s+t\mid T>s)
&=\frac{P(T>s+t)}{P(T>s)}\\
&=\frac{S(s+t)}{S(s)}.
\end{aligned}
$$

$S(u)=e^{-u^2}$ を代入すると

$$
\begin{aligned}
P(T>s+t\mid T>s)
&=\frac{e^{-(s+t)^2}}{e^{-s^2}}\\
&=\exp\{-(s+t)^2+s^2\}\\
&=e^{-2st-t^2}.
\end{aligned}
$$

したがって

$$
\boxed{P(T>s+t\mid T>s)=e^{-2st-t^2}}.
$$

一方

$$
P(T>t)=e^{-t^2}.
$$

条件付き生存確率は $s$ に依存するので

$$
P(T>s+t\mid T>s)\ne P(T>t),
$$

すなわち無記憶性を持たない。ハザード $h(t)=2t$ が時間とともに増えることとも整合する。

### 6. 一般の $H,S,f,h$ の関係

出発点は

$$
S(t)=P(T>t),
\qquad
f(t)=-S'(t),
\qquad
h(t)=\frac{f(t)}{S(t)}.
$$

したがって

$$
h(t)=-\frac{S'(t)}{S(t)}
=-\frac{d}{dt}\log S(t).
$$

これを0から $t$ まで積分し $S(0)=1$ を使うと

$$
\boxed{H(t)=\int_0^t h(u)\,du=-\log S(t)}.
$$

従って

$$
\boxed{S(t)=e^{-H(t)}}.
$$

さらに

$$
f(t)=-S'(t)
$$

へ $S(t)=e^{-H(t)}$ を入れると

$$
\begin{aligned}
f(t)
&=H'(t)e^{-H(t)}\\
&=h(t)S(t).
\end{aligned}
$$

よって

$$
\boxed{f(t)=h(t)S(t)},
\qquad
\boxed{h(t)=\frac{f(t)}{S(t)}}.
$$

つまり4量の流れは

$$
h\xrightarrow{\int}H
\xrightarrow{e^{-\,\cdot}}S
\xrightarrow{-d/dt}f
$$

と整理できる。

## 本番答案

$$
H(t)=\int_0^t2u\,du=t^2.
$$

また

$$
h(t)=\frac{f(t)}{S(t)}=-\frac{S'(t)}{S(t)}
=-\frac{d}{dt}\log S(t)
$$

なので、$S(0)=1$ を使って

$$
H(t)=-\log S(t).
$$

従って

$$
S(t)=e^{-t^2},
\quad
F(t)=1-e^{-t^2},
\quad
f(t)=2te^{-t^2}.
$$

非負寿命の尾積分表示から

$$
E[T]=\int_0^\infty S(t)dt
=\frac{\sqrt\pi}{2}.
$$

さらに

$$
P(T>s+t\mid T>s)
=\frac{S(s+t)}{S(s)}
=e^{-2st-t^2},
$$

で $s$ に依存するため無記憶ではない。一般に

$$
H=-\log S,
\qquad
S=e^{-H},
\qquad
f=hS,
\qquad
h=f/S.
$$

## 採点基準

- (1) 累積ハザードを積分から計算: 3点
- (2) $h=-S'/S$ から $H=-\log S$ を導き $S,F$ を得る: 5点
- (3) 密度を微分し $f/S=h$ を確認: 3点
- (4) 尾積分表示から平均寿命を計算: 3点
- (5) 条件付き確率を生存関数の比から計算し無記憶性を判定: 3点
- (6) 一般の4量の関係を定義から整理: 3点

20分経過時は $h=-S'/S$ と $H=-\log S$ の導出を必ず残す。