# Core 27 ワイブル分布・中央値・最頻値・ハザード

- 安定ID: `RIKOU-CORE-27`
- 80大問 No.: 01
- 演習価値: S
- 難度: B
- 目安時間: 20〜25分
- 電卓: 特殊関数の数値化は不要。$\log,\Gamma$ は記号のままでよい

## 問題

ワイブル分布の累積分布関数を

$$
F(t)=1-\exp\left\{-\left(\frac t\eta\right)^k\right\},
\qquad t>0,
\qquad k,\eta>0
$$

とする。

1. 累積分布関数から確率密度関数、信頼度関数、ハザード関数を求めよ。
2. 中央値を求めよ。
3. $k>1$ のとき最頻値を求めよ。対数密度の微分過程も示せ。
4. $U=(T/\eta)^k$ の累積分布関数を求め、その変換を使って平均をガンマ関数で表せ。
5. $k<1,k=1,k>1$ でハザード関数の形がどう変わるか。
6. $0<p<1$ に対する $p$ 分位点 $q_p$ を求めよ。また、分位点の比 $q_{p_2}/q_{p_1}$ が尺度母数 $\eta$ に依存しないことを示せ。

## 詳細解答

### 1. 累積分布関数から確率密度関数・信頼度関数・ハザード関数を求める

信頼度関数は

$$
S(t)=P(T>t)=1-F(t)
$$

だから

$$
\boxed{
S(t)=\exp\left\{-\left(\frac t\eta\right)^k\right\}
}.
$$

確率密度関数は累積分布関数の微分である。

$$
f(t)=\frac{d}{dt}F(t).
$$

$F(t)=1-e^{-g(t)}$、$g(t)=(t/\eta)^k=t^k/\eta^k$ と置くと

$$
g'(t)=\frac{k t^{k-1}}{\eta^k}
=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}.
$$

連鎖律から

$$
\begin{aligned}
f(t)
&=\frac{d}{dt}\{1-e^{-g(t)}\}\\
&=e^{-g(t)}g'(t)\\
&=\boxed{
\frac{k}{\eta}
\left(\frac t\eta\right)^{k-1}
\exp\left\{-\left(\frac t\eta\right)^k\right\}
}.
\end{aligned}
$$

ハザード関数は

$$
h(t)=\frac{f(t)}{S(t)}
$$

なので、指数因子が約分されて

$$
\begin{aligned}
h(t)
&=\frac{
\frac{k}{\eta}(t/\eta)^{k-1}e^{-(t/\eta)^k}
}{e^{-(t/\eta)^k}}\\
&=\boxed{
\frac{k}{\eta}
\left(\frac t\eta\right)^{k-1}
}.
\end{aligned}
$$

### 2. 中央値

中央値 $m$ は

$$
F(m)=\frac12
$$

を満たす。したがって

$$
1-\exp\left\{-\left(\frac m\eta\right)^k\right\}
=\frac12.
$$

よって

$$
\exp\left\{-\left(\frac m\eta\right)^k\right\}
=\frac12.
$$

両辺の対数を取ると

$$
-\left(\frac m\eta\right)^k
=\log\frac12=-\log2.
$$

したがって

$$
\left(\frac m\eta\right)^k=\log2,
$$

$$
\boxed{m=\eta(\log2)^{1/k}}.
$$

$\log2$ の数値化は不要である。

### 3. 最頻値

$k>1$ のとき、確率密度関数は $t=0$ 付近で0から増加し、内部に最頻値を持つ。$f(t)>0$ なので、$f(t)$ を最大化する代わりに単調増加関数 $\log$ を使って $\log f(t)$ を最大化してよい。

確率密度関数から

$$
\begin{aligned}
\log f(t)
&=\log k-\log\eta
+(k-1)\log\left(\frac t\eta\right)
-\left(\frac t\eta\right)^k.
\end{aligned}
$$

$t$ で微分する。まず

$$
\frac{d}{dt}\log\left(\frac t\eta\right)=\frac1t,
$$

また

$$
\frac{d}{dt}\left(\frac t\eta\right)^k
=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}
=\frac{k t^{k-1}}{\eta^k}.
$$

したがって

$$
\frac{d}{dt}\log f(t)
=\frac{k-1}{t}
-\frac{k t^{k-1}}{\eta^k}.
$$

これを0と置くと

$$
\frac{k-1}{t}
=\frac{k t^{k-1}}{\eta^k}.
$$

両辺に $t\eta^k$ を掛けて

$$
(k-1)\eta^k=kt^k.
$$

よって

$$
t^k=\eta^k\frac{k-1}{k},
$$

したがって

$$
\boxed{
t_{\mathrm{mode}}
=\eta\left(\frac{k-1}{k}\right)^{1/k}
}.
$$

さらに

$$
\frac{d^2}{dt^2}\log f(t)
=-\frac{k-1}{t^2}
-\frac{k(k-1)t^{k-2}}{\eta^k}<0
$$

なので、この停留点は最大点である。

### 4. 指数分布への変換と平均

$$
U=\left(\frac T\eta\right)^k
$$

とする。$u\ge0$ について、$k,\eta>0$ なので変換は単調増加であり、

$$
\begin{aligned}
P(U\le u)
&=P\left\{\left(\frac T\eta\right)^k\le u\right\}\\
&=P(T\le\eta u^{1/k})\\
&=F(\eta u^{1/k}).
\end{aligned}
$$

累積分布関数へ代入すると

$$
\begin{aligned}
F(\eta u^{1/k})
&=1-\exp\left[-\left\{\frac{\eta u^{1/k}}{\eta}\right\}^k\right]\\
&=1-e^{-u}.
\end{aligned}
$$

したがって $U$ は率1の指数分布に従う。

$$
\boxed{U\sim\operatorname{Exp}(1)}.
$$

逆変換は

$$
T=\eta U^{1/k}.
$$

よって

$$
E[T]=\eta E[U^{1/k}].
$$

率1の指数分布の確率密度関数は $e^{-u}$ ($u>0$) だから

$$
E[U^{1/k}]
=\int_0^\infty u^{1/k}e^{-u}\,du.
$$

ガンマ関数の定義

$$
\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}\,du
$$

と比べると

$$
a-1=\frac1k
\quad\Longrightarrow\quad
a=1+\frac1k.
$$

したがって

$$
\boxed{
E[T]=\eta\Gamma\left(1+\frac1k\right)
}.
$$

ガンマ関数は記号のままでよい。

### 5. ハザード関数の形

$$
h(t)=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}
$$

であり、$k/\eta>0$ なので増減は $t^{k-1}$ で決まる。

- $k<1$ なら $k-1<0$ なので $t^{k-1}$ は減少し、ハザード関数は減少する。
- $k=1$ なら $t^{k-1}=1$ なので $h(t)=1/\eta$ で一定である。
- $k>1$ なら $k-1>0$ なので $t^{k-1}$ は増加し、ハザード関数は増加する。

### 6. 分位点

$p$ 分位点 $q_p$ は

$$
F(q_p)=p
$$

を満たす。したがって

$$
1-\exp\left[-(q_p/\eta)^k\right]=p,
$$

$$
\exp\left[-(q_p/\eta)^k\right]=1-p.
$$

両辺の対数を取ると

$$
-\left(\frac{q_p}{\eta}\right)^k
=\log(1-p),
$$

よって

$$
\left(\frac{q_p}{\eta}\right)^k
=-\log(1-p).
$$

したがって

$$
\boxed{
q_p=\eta\{-\log(1-p)\}^{1/k}
}.
$$

2つの分位点の比は

$$
\begin{aligned}
\frac{q_{p_2}}{q_{p_1}}
&=\frac{\eta\{-\log(1-p_2)\}^{1/k}}
{\eta\{-\log(1-p_1)\}^{1/k}}\\
&=\boxed{
\left\{
\frac{-\log(1-p_2)}{-\log(1-p_1)}
\right\}^{1/k}
}.
\end{aligned}
$$

尺度母数 $\eta$ が約分されるので、分位点比は $\eta$ に依存せず、形状母数 $k$ の情報を持つ。

## 本番答案

$$
S(t)=1-F(t)=e^{-(t/\eta)^k}.
$$

また

$$
\frac{d}{dt}(t/\eta)^k
=\frac{k}{\eta}(t/\eta)^{k-1}
$$

より

$$
f(t)=\frac{k}{\eta}(t/\eta)^{k-1}e^{-(t/\eta)^k},
\qquad
h(t)=\frac{f(t)}{S(t)}
=\frac{k}{\eta}(t/\eta)^{k-1}.
$$

$F(m)=1/2$ から

$$
m=\eta(\log2)^{1/k}.
$$

$k>1$ では

$$
\frac{d}{dt}\log f(t)
=\frac{k-1}{t}-\frac{k t^{k-1}}{\eta^k}=0
$$

より

$$
t_{\mathrm{mode}}
=\eta\left(\frac{k-1}{k}\right)^{1/k}.
$$

$U=(T/\eta)^k$ とすると

$$
P(U\le u)=F(\eta u^{1/k})=1-e^{-u},
$$

したがって $U\sim\operatorname{Exp}(1)$。よって

$$
E[T]
=\eta\int_0^\infty u^{1/k}e^{-u}\,du
=\eta\Gamma(1+1/k).
$$

ハザード関数は $k<1,=1,>1$ でそれぞれ減少、一定、増加する。また

$$
q_p=\eta\{-\log(1-p)\}^{1/k}
$$

なので、分位点比では $\eta$ が約分される。

## 採点基準

- (1) 累積分布関数から確率密度関数・信頼度関数・ハザード関数: 5点
- (2) 中央値の方程式と解: 2点
- (3) 対数密度の微分・停留条件・最頻値: 3点
- (4) 変換後の累積分布関数・ガンマ積分による平均: 4点
- (5) ハザード関数の増減: 2点
- (6) 分位点の導出と比: 4点

20分経過時は特殊関数を数値化せず、微分・変数変換・分位点方程式の核を残す。
