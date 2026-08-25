# Core 07 最尤推定量の漸近正規性・Wald検定・尤度比検定・スコア検定

- 安定ID: `RIKOU-CORE-07`
- 80大問 No.: 74
- 演習価値: S
- 難度: S
- 目安時間: 30分

## 問題

$X_1,\dots,X_n$ は独立に Bernoulli 分布に従い、

$$
P_p(X_i=x)=p^x(1-p)^{1-x},
\qquad x\in\{0,1\},
\qquad 0<p<1
$$

とする。$0<p_0<1$ とし、

$$
H_0:p=p_0
$$

を両側検定する。

1. 上の確率質量関数から尤度・対数尤度を作り、最尤推定量 $\widehat p$ と1標本当たりの Fisher 情報量 $I_1(p)$ を求めよ。
2. 最尤推定量の漸近正規性から Wald 統計量を構成せよ。
3. スコア統計量と尤度比統計量を、対数尤度とスコアから導け。$H_0$ の下での漸近分布を、使う定理の条件とともに述べよ。
4. $n=100$, $\sum X_i=50$, $p_0=0.4$ のとき3統計量を計算せよ。対数を含む尤度比統計量は正しい厳密式までで満点とし、小数化は任意とする。
5. なぜ有限標本では3統計量が一致せず、漸近的には一致するのか、$p_0$ のまわりの展開を示して説明せよ。

## 詳細解答

### 1. 確率質量関数から最尤推定量と Fisher 情報量を求める

観測値を $x_1,\ldots,x_n$ とし、

$$
s=\sum_{i=1}^n x_i
$$

と置く。独立性から尤度は各観測の確率質量関数の積である。

$$
\begin{aligned}
L(p;x_1,\ldots,x_n)
&=\prod_{i=1}^n p^{x_i}(1-p)^{1-x_i}\\
&=p^{\sum_i x_i}(1-p)^{\sum_i(1-x_i)}\\
&=p^s(1-p)^{n-s}.
\end{aligned}
$$

対数を取ると

$$
\boxed{
\ell(p)=s\log p+(n-s)\log(1-p)
}.
$$

$p$ で微分する。

$$
\begin{aligned}
\ell'(p)
&=\frac{s}{p}+(n-s)\frac{-1}{1-p}\\
&=\frac{s}{p}-\frac{n-s}{1-p}.
\end{aligned}
$$

内部の停留点では $\ell'(p)=0$ だから

$$
\frac{s}{p}=\frac{n-s}{1-p}.
$$

交差して

$$
s(1-p)=p(n-s).
$$

展開すると

$$
s-sp=np-sp,
$$

したがって

$$
\boxed{\widehat p=\frac{s}{n}=\bar X}.
$$

$0<s<n$ なら

$$
\ell''(p)
=-\frac{s}{p^2}-\frac{n-s}{(1-p)^2}<0
$$

なので、この停留点は最大点である。$s=0$ または $s=n$ では最尤推定量は境界 $0$ または $1$ になるが、以下の通常の漸近論では真値 $p_0$ を $(0,1)$ の内部点に置く。

次に1標本 $X$ の対数尤度を

$$
\ell_1(p)=X\log p+(1-X)\log(1-p)
$$

とする。微分すると

$$
\begin{aligned}
U_1(p)
&=\frac{\partial\ell_1(p)}{\partial p}\\
&=\frac{X}{p}-\frac{1-X}{1-p}\\
&=\frac{X(1-p)-p(1-X)}{p(1-p)}\\
&=\boxed{\frac{X-p}{p(1-p)}}.
\end{aligned}
$$

Fisher 情報量の定義から

$$
I_1(p)=E_p[U_1(p)^2].
$$

Bernoulli 分布では $E[X]=p$, $\operatorname{Var}(X)=p(1-p)$ なので

$$
E[(X-p)^2]=p(1-p).
$$

したがって

$$
\begin{aligned}
I_1(p)
&=E\left[
\frac{(X-p)^2}{p^2(1-p)^2}
\right]\\
&=\frac{p(1-p)}{p^2(1-p)^2}\\
&=\boxed{\frac1{p(1-p)}}.
\end{aligned}
$$

独立な $n$ 標本では

$$
I_n(p)=nI_1(p)=\frac{n}{p(1-p)}.
$$

### 2. Wald 統計量

$H_0$ の下では

$$
E[X_i]=p_0,
\qquad
\operatorname{Var}(X_i)=p_0(1-p_0)\in(0,\infty).
$$

$X_i$ は独立同分布で分散が有限なので、Lindeberg–Lévy の中心極限定理から

$$
\frac{\sqrt n(\widehat p-p_0)}
{\sqrt{p_0(1-p_0)}}
\xrightarrow{d}N(0,1).
$$

また大数の法則から

$$
\widehat p\xrightarrow{p}p_0.
$$

関数 $p(1-p)$ は $0<p_0<1$ の近くで連続かつ正なので

$$
\widehat p(1-\widehat p)
\xrightarrow{p}p_0(1-p_0).
$$

したがって Slutsky の定理により分母の未知量を $\widehat p$ で置き換えて

$$
\frac{\sqrt n(\widehat p-p_0)}
{\sqrt{\widehat p(1-\widehat p)}}
\xrightarrow{d}N(0,1).
$$

これを二乗した Wald 統計量は

$$
\boxed{
W=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)}
\xrightarrow{d}\chi^2_1
}.
$$

### 3. スコア統計量と尤度比統計量

#### スコア統計量

$n$ 標本のスコアは

$$
\begin{aligned}
U_n(p)
&=\ell'(p)\\
&=\frac{S}{p}-\frac{n-S}{1-p}\\
&=\frac{S-np}{p(1-p)}.
\end{aligned}
$$

帰無仮説の値 $p_0$ で評価すると

$$
U_n(p_0)=\frac{S-np_0}{p_0(1-p_0)}.
$$

スコア統計量は

$$
\frac{U_n(p_0)^2}{I_n(p_0)}
$$

なので

$$
\begin{aligned}
S_c
&=\frac{
(S-np_0)^2/[p_0^2(1-p_0)^2]
}{n/[p_0(1-p_0)]}\\
&=\boxed{
\frac{(S-np_0)^2}{np_0(1-p_0)}
}.
\end{aligned}
$$

これは

$$
\frac{S-np_0}{\sqrt{np_0(1-p_0)}}
$$

の二乗であり、中心極限定理から

$$
S_c\xrightarrow{d}\chi^2_1.
$$

#### 尤度比統計量

帰無仮説の下では $p=p_0$ に固定され、制約なしでは $\widehat p=S/n$ である。尤度比を

$$
\Lambda=\frac{L(p_0)}{L(\widehat p)}
$$

とすると

$$
G^2=-2\log\Lambda
=2\{\ell(\widehat p)-\ell(p_0)\}.
$$

対数尤度を代入すると

$$
\begin{aligned}
G^2
&=2\left[
S\log\widehat p+(n-S)\log(1-\widehat p)
-S\log p_0-(n-S)\log(1-p_0)
\right]\\
&=\boxed{
2\left[
S\log\frac{\widehat p}{p_0}
+(n-S)\log\frac{1-\widehat p}{1-p_0}
\right]
}.
\end{aligned}
$$

この漸近分布には Wilks の定理を使う。本問では

- 真値 $p_0$ は開区間 $(0,1)$ の内部点である。
- Bernoulli 分布の支持 $\{0,1\}$ は $p$ に依存しない。
- 対数尤度は $p_0$ の近くで十分滑らかである。
- モデルは識別可能である。
- $I_1(p_0)=1/[p_0(1-p_0)]$ は有限かつ正である。
- 非制約モデルの次元は1、帰無仮説は点仮説なので次元は0であり、次元差は1である。

したがって

$$
\boxed{G^2\xrightarrow{d}\chi^2_1}.
$$

### 4. 数値例

$$
\widehat p=\frac{50}{100}=0.5.
$$

Wald 統計量は

$$
\begin{aligned}
W
&=\frac{100(0.5-0.4)^2}{0.5(1-0.5)}\\
&=\frac{100(0.1)^2}{0.25}\\
&=\boxed{4}.
\end{aligned}
$$

スコア統計量は

$$
\begin{aligned}
S_c
&=\frac{(50-100\cdot0.4)^2}{100\cdot0.4\cdot0.6}\\
&=\frac{10^2}{24}\\
&=\boxed{\frac{25}{6}}.
\end{aligned}
$$

尤度比統計量は

$$
\begin{aligned}
G^2
&=2\left[
50\log\frac{0.5}{0.4}
+50\log\frac{0.5}{0.6}
\right]\\
&=100\left[
\log\frac54+\log\frac56
\right]\\
&=\boxed{100\log\frac{25}{24}}.
\end{aligned}
$$

対数の小数化は不要である。

### 5. 有限標本で異なり、漸近的に一致する理由

有限標本では、Wald 検定は情報量を $\widehat p$ で評価し、スコア検定は $p_0$ で評価し、尤度比検定は $p_0$ と $\widehat p$ の対数尤度差を見る。そのため数値は一般に一致しない。

漸近的な一致を、対数尤度の展開から確認する。最尤推定量は内部では

$$
U_n(\widehat p)=\ell'(\widehat p)=0
$$

を満たす。$U_n(p)$ を $p_0$ のまわりで1次まで Taylor 展開すると、$p_0$ と $\widehat p$ の間の点 $p^*$ を用いて

$$
0
=U_n(\widehat p)
=U_n(p_0)+U_n'(p^*)(\widehat p-p_0).
$$

したがって

$$
\widehat p-p_0
=-\frac{U_n(p_0)}{U_n'(p^*)}.
$$

一方、

$$
-U_n'(p)
=-\ell''(p)
$$

は標本情報量であり、$p^*\xrightarrow{p}p_0$ の下では

$$
-\frac1nU_n'(p^*)
\xrightarrow{p}I_1(p_0).
$$

よって1次の主要項は

$$
\widehat p-p_0
=\frac{U_n(p_0)}{I_n(p_0)}+o_p(n^{-1/2}).
$$

次に $\ell(\widehat p)$ を $p_0$ のまわりで2次まで展開すると

$$
\ell(\widehat p)
=\ell(p_0)
+U_n(p_0)(\widehat p-p_0)
+\frac12\ell''(p^{**})(\widehat p-p_0)^2
$$

となる。上の1次関係を使うと主要項は

$$
2\{\ell(\widehat p)-\ell(p_0)\}
=I_n(p_0)(\widehat p-p_0)^2+o_p(1).
$$

スコア統計量も

$$
\frac{U_n(p_0)^2}{I_n(p_0)}
=I_n(p_0)(\widehat p-p_0)^2+o_p(1),
$$

Wald 統計量も $\widehat p\xrightarrow{p}p_0$ により

$$
I_n(\widehat p)(\widehat p-p_0)^2
=I_n(p_0)(\widehat p-p_0)^2+o_p(1)
$$

となる。したがって3統計量は有限標本では異なっても、同じ局所的な二次形式へ近づく。

## 本番答案

問題文の確率質量関数と独立性から

$$
L(p)=p^S(1-p)^{n-S},
$$

$$
\ell(p)=S\log p+(n-S)\log(1-p).
$$

$$
\ell'(p)=\frac{S}{p}-\frac{n-S}{1-p}=0
$$

より

$$
\widehat p=S/n.
$$

1標本のスコアは

$$
U_1(p)=\frac{X-p}{p(1-p)},
$$

したがって

$$
I_1(p)=\frac1{p(1-p)}.
$$

中心極限定理、大数の法則、Slutsky の定理から

$$
W=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)}
\xrightarrow{d}\chi^2_1.
$$

また

$$
S_c
=\frac{U_n(p_0)^2}{I_n(p_0)}
=\frac{(S-np_0)^2}{np_0(1-p_0)}
\xrightarrow{d}\chi^2_1.
$$

尤度比統計量は

$$
G^2
=2\left[
S\log\frac{\widehat p}{p_0}
+(n-S)\log\frac{1-\widehat p}{1-p_0}
\right].
$$

$p_0$ は内部点、支持は母数非依存、モデルは滑らか・識別可能、情報量は有限正なので Wilks の定理から

$$
G^2\xrightarrow{d}\chi^2_1.
$$

数値例では

$$
W=4,
\qquad
S_c=\frac{25}{6},
\qquad
G^2=100\log\frac{25}{24}.
$$

$p_0$ のまわりの Taylor 展開により3統計量はいずれも

$$
I_n(p_0)(\widehat p-p_0)^2+o_p(1)
$$

へ帰着するので、漸近的には一致する。

## 採点基準

- (1) 確率質量関数から尤度・対数尤度・最尤推定量・Fisher情報量を導く: 4点
- (2) Wald 統計量と中心極限定理・Slutsky の条件: 4点
- (3) スコア統計量・尤度比統計量・Wilks の条件: 6点
- (4) 3統計量の正しい厳密式: 4点
- (5) $p_0$ まわりの展開と局所二次近似: 2点

25分経過時も、尤度・スコア・Taylor 展開の出発点を結果だけ置かず、採点対象の導出核を残す。
