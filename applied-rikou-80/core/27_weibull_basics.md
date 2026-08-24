# Core 27 Weibull分布・中央値・最頻値・ハザード

- 安定ID: `RIKOU-CORE-27`
- 80大問 No.: 01
- 演習価値: S
- 難度: B
- 目安時間: 20〜25分
- 電卓: 特殊関数の数値化は不要。$\log,\Gamma$ は記号のままでよい

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
4. $U=(T/\eta)^k$ の分布を求め、その変換を使って平均を Gamma 関数で表せ。
5. $k<1,k=1,k>1$ でハザードの形がどう変わるか。
6. $0<p<1$ に対する $p$ 分位点 $q_p$ を求めよ。また、分位点の比 $q_{p_2}/q_{p_1}$ が尺度母数 $\eta$ に依存しないことを示せ。

## 詳細解答

### 1. 基本量

$$
S(t)=e^{-(t/\eta)^k},
$$

$$
f(t)=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}e^{-(t/\eta)^k},
$$

$$
\boxed{h(t)=\frac{k}{\eta}\left(\frac t\eta\right)^{k-1}}.
$$

### 2. 中央値

$F(m)=1/2$ より

$$
\boxed{m=\eta(\log2)^{1/k}}.
$$

$\log2$ の数値化は不要。

### 3. 最頻値

対数密度を微分すると

$$
\frac{d}{dt}\log f(t)
=\frac{k-1}{t}-\frac{k t^{k-1}}{\eta^k}.
$$

これを0とおき

$$
\boxed{t_{\mathrm{mode}}=\eta\left(\frac{k-1}{k}\right)^{1/k}}.
$$

### 4. 指数分布への変換と平均

$$
P(U\le u)
=P\left(T\le\eta u^{1/k}\right)
=1-e^{-u},
$$

したがって

$$
\boxed{U\sim\operatorname{Exp}(1)}.
$$

$T=\eta U^{1/k}$ だから

$$
E[T]
=\eta E[U^{1/k}]
=\eta\int_0^\infty u^{1/k}e^{-u}\,du
=\boxed{\eta\Gamma(1+1/k)}.
$$

Gamma関数は記号のままでよい。

### 5. ハザード形状

$h(t)\propto t^{k-1}$ なので、$k<1$ で減少、$k=1$ で一定、$k>1$ で増加する。

### 6. 分位点

$F(q_p)=p$ から

$$
\exp\left[-(q_p/\eta)^k\right]=1-p.
$$

したがって

$$
\boxed{q_p=\eta\{-\log(1-p)\}^{1/k}}.
$$

よって

$$
\boxed{\frac{q_{p_2}}{q_{p_1}}
=\left\{\frac{-\log(1-p_2)}{-\log(1-p_1)}\right\}^{1/k}}
$$

となり、尺度母数 $\eta$ は消える。分位点比は形状母数 $k$ の情報を持つ。

## 本番答案

$$
S=e^{-(t/\eta)^k},
\quad
f=\frac{k}{\eta}(t/\eta)^{k-1}e^{-(t/\eta)^k},
\quad
h=\frac{k}{\eta}(t/\eta)^{k-1}.
$$

$$
m=\eta(\log2)^{1/k},
\qquad
t_{\rm mode}=\eta((k-1)/k)^{1/k}.
$$

$U=(T/\eta)^k\sim\operatorname{Exp}(1)$ より

$$
E[T]=\eta\Gamma(1+1/k).
$$

ハザードは $k<1,=1,>1$ で減少、一定、増加。さらに

$$
q_p=\eta\{-\log(1-p)\}^{1/k},
$$

なので分位点比は $\eta$ に依存しない。

## 採点基準

- (1) 密度・生存・ハザード: 5点
- (2) 中央値: 2点
- (3) 最頻値: 3点
- (4) 変換と平均: 4点
- (5) ハザード解釈: 2点
- (6) 分位点と比: 4点

20分経過時は特殊関数を数値化せず、変換 $U=(T/\eta)^k$ と分位点式を優先する。
