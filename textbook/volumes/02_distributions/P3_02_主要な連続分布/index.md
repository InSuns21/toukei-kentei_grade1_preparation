# P3-02 主要な連続分布

この章では、主要な連続分布を**密度や特性値の暗記表**としてではなく、どの生成機構から現れるか、台と母数は何か、正規化・平均・分散・中央値・分位点をどこから計算するかまで一つにつなげて学びます。

特に、指数分布・ガンマ分布・ワイブル分布はすべて正の半直線を台に持ちますが、待ち時間・待ち時間の和・時間とともに変化する故障率という役割が異なります。また、コーシー分布では対称性があっても期待値が存在せず、対数正規分布では全ての実数次モーメントが有限でも正の側のモーメント母関数が発散します。**公式を使う前に、その式が問題文で与えられたものか、既に導出した結果か、いま導出すべき量かを区別する**ことが本章の重要なテーマです。

共通表記は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[公式出題範囲との対応](../../../../references/official-scope.md) に従います。本章ではガンマ分布を**形状・率**、ワイブル分布を**形状・尺度**で表します。

> **導出粒度の基準**
>
> 公式出題範囲に「中央値」「分位点」「期待値」「分散」「モーメント母関数」などの概念名が載っていても、それぞれの閉形式を無条件に暗記公式として使ってよいという意味ではありません。本章で「求めよ」と問う量は、問題文で式が与えられていない限り、確率密度関数・累積分布関数・期待値の定義・変数変換・本章ですでに導出した結果のいずれかから、採点できる途中式を残します。粒度は統計数理100題の代表基準と同様に、**出発点・条件・主要な途中計算・結論が第三者に再現できること**を目標とします。

## この章で解けるようになる問題

- 区間上の一様性から一様分布を選び、累積分布関数・平均・分散を積分から求める。
- 正規分布を標準化して標準正規分布へ戻す。
- 指数分布の生存関数・無記憶性・一定ハザードを導く。
- ガンマ積分からガンマ分布の正規化・モーメント・平均・分散・再生性を導く。
- ベータ積分からベータ分布の正規化・モーメント・平均・分散・最頻値を導く。
- コーシー分布で期待値が存在しないことを積分で確認する。
- 正規分布の指数変換から対数正規分布の密度・モーメント・平均・分散・中央値・分位点を導く。
- ワイブル分布の生存関数・ハザード・分位点・モーメントを導く。
- ロジスティック分布の累積分布関数を反転して中央値・四分位点を求める。
- モーメント母関数の式だけでなく、有限となる $t$ の範囲を判定する。

## 前提知識

1. P2-01: 確率密度関数を積分して確率と累積分布関数を求める。
2. P2-02: 期待値、分散、モーメント母関数を定義から扱う。
3. F0-01: 置換積分、広義積分、二項展開、指数関数の基本計算。
4. P1-02: 条件付き確率を使って無記憶性を表す。
5. P3-01: 分布を生成機構から選ぶ考え方。

---

## 1. 最初に見るべき「生成機構」と台

分布名を当てる前に、まず次を確認します。

1. 値は有限区間、正の半直線、実数全体のどこを動くか。
2. 値そのものが一様なのか、正規誤差なのか、待ち時間なのか、割合なのか、寿命なのか。
3. 位置・尺度・率・形状のどの母数が与えられているか。
4. 尾確率やハザードが問題の中心か、モーメントや変数変換が中心か。

| 生成機構・特徴 | 主な分布 | 台 |
|---|---|---|
| 区間から一様に選ぶ | 一様分布 | 有界区間 |
| 多数の小さな誤差の和 | 正規分布 | $\mathbb R$ |
| 一定率で起こる事象の次の到着まで | 指数分布 | $(0,\infty)$ |
| 同一率の指数待ち時間の和 | ガンマ分布 | $(0,\infty)$ |
| 0から1の割合・確率 | ベータ分布 | $(0,1)$ |
| 独立な標準正規変数の比 | コーシー分布 | $\mathbb R$ |
| 対数を取ると正規分布 | 対数正規分布 | $(0,\infty)$ |
| ハザードがべき関数で変化する寿命 | ワイブル分布 | $(0,\infty)$ |
| 累積分布関数がロジスティック曲線 | ロジスティック分布 | $\mathbb R$ |

台だけでは一意に決まりません。正の半直線だけでも指数・ガンマ・対数正規・ワイブルが候補に残るため、生成機構や確率密度関数・生存関数の形まで見ます。

---

## 2. ガンマ関数・ベータ関数と9分布の定義

ガンマ関数とベータ関数を

$$
\Gamma(a)=\int_0^\infty x^{a-1}e^{-x}\,dx,
\qquad a>0,
$$

$$
B(a,b)=\int_0^1x^{a-1}(1-x)^{b-1}\,dx
=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)},
\qquad a,b>0
$$

とします。

### 2.1 一様分布

$a<b$ とします。$X\sim\operatorname{Unif}(a,b)$ とは

$$
f(x)=\frac{1}{b-a}\boldsymbol{1}_{(a,b)}(x)
$$

となる分布です。連続分布なので有限個の端点を台に含めるかどうかは確率を変えません。

$a<x<b$ では、累積分布関数の定義から

$$
\begin{aligned}
F(x)
&=P(X\le x)\\
&=\int_a^x\frac{1}{b-a}\,dt\\
&=\frac{x-a}{b-a}.
\end{aligned}
$$

したがって

$$
F(x)=
\begin{cases}
0,&x\le a,\\
\dfrac{x-a}{b-a},&a<x<b,\\
1,&x\ge b.
\end{cases}
$$

### 2.2 正規分布

$\mu\in\mathbb R$, $\sigma>0$ とします。$X\sim N(\mu,\sigma^2)$ とは

$$
f(x)=\frac{1}{\sqrt{2\pi}\sigma}
\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\},
\qquad x\in\mathbb R
$$

となる分布です。**第2引数は標準偏差ではなく分散**です。

標準正規分布の確率密度関数を $\phi$、累積分布関数を $\Phi$ と書きます。

### 2.3 指数分布

$\lambda>0$ とします。$X\sim\operatorname{Exp}(\lambda)$ は率 $\lambda$ の指数分布で

$$
f(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x).
$$

$x\ge0$ では

$$
\begin{aligned}
F(x)
&=\int_0^x\lambda e^{-\lambda t}\,dt\\
&=\left[-e^{-\lambda t}\right]_{0}^{x}\\
&=1-e^{-\lambda x}.
\end{aligned}
$$

したがって生存関数は

$$
S(x)=1-F(x)=e^{-\lambda x},
\qquad x\ge0.
$$

### 2.4 ガンマ分布

$\alpha>0$, $\beta>0$ とします。本章では $\beta$ を率とし、

$$
X\sim\operatorname{Gamma}(\alpha,\beta)
$$

を

$$
f(x)=
\frac{\beta^\alpha}{\Gamma(\alpha)}
 x^{\alpha-1}e^{-\beta x}
\boldsymbol{1}_{(0,\infty)}(x)
$$

で定義します。$u=\beta x$、$dx=du/\beta$ と置くと

$$
\begin{aligned}
\int_0^\infty f(x)\,dx
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\int_0^\infty x^{\alpha-1}e^{-\beta x}\,dx\\
&=\frac1{\Gamma(\alpha)}
\int_0^\infty u^{\alpha-1}e^{-u}\,du\\
&=1.
\end{aligned}
$$

指数分布は $\operatorname{Gamma}(1,\lambda)$ です。

### 2.5 ベータ分布

$\alpha>0$, $\beta>0$ とします。$X\sim\operatorname{Beta}(\alpha,\beta)$ とは

$$
f(x)=
\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}
\boldsymbol{1}_{(0,1)}(x)
$$

となる分布です。ベータ関数の定義から

$$
\int_0^1 f(x)\,dx
=\frac{B(\alpha,\beta)}{B(\alpha,\beta)}
=1.
$$

### 2.6 コーシー分布

$x_0\in\mathbb R$, $\gamma>0$ とします。$X\sim\operatorname{Cauchy}(x_0,\gamma)$ とは

$$
f(x)=\frac{1}{\pi\gamma}
\frac{1}{1+\{(x-x_0)/\gamma\}^2},
\qquad x\in\mathbb R
$$

となる分布です。$u=(x-x_0)/\gamma$ と置くと

$$
\int_{-\infty}^{\infty}f(x)\,dx
=\frac1\pi[\arctan u]_{-\infty}^{\infty}=1.
$$

累積分布関数も同じ置換から

$$
F(x)
=\frac12+\frac1\pi
\arctan\left(\frac{x-x_0}{\gamma}\right).
$$

したがって

$$
F(x_0)=\frac12,
$$

なので $x_0$ は中央値です。ただし、後で示すように通常の意味で期待値は存在しません。

### 2.7 対数正規分布

$\mu\in\mathbb R$, $\sigma>0$ とし、

$$
Y=\log X\sim N(\mu,\sigma^2)
$$

のとき $X\sim\operatorname{Lognormal}(\mu,\sigma^2)$ といいます。$x=e^y$ は単調増加で、逆変換は $y=\log x$、

$$
\frac{dy}{dx}=\frac1x
$$

です。したがって $x>0$ で

$$
f_X(x)
=f_Y(\log x)\frac1x
=\frac{1}{x\sigma\sqrt{2\pi}}
\exp\left\{-\frac{(\log x-\mu)^2}{2\sigma^2}\right\}.
$$

$x\le0$ では確率密度関数は0です。

### 2.8 ワイブル分布

形状 $c>0$、尺度 $\eta>0$ とします。$X\sim\operatorname{Weibull}(c,\eta)$ とは

$$
f(x)=\frac{c}{\eta}
\left(\frac{x}{\eta}\right)^{c-1}
\exp\left\{-\left(\frac{x}{\eta}\right)^c\right\}
\boldsymbol{1}_{(0,\infty)}(x)
$$

となる分布です。

$$
u=\left(\frac{x}{\eta}\right)^c
$$

と置くと

$$
du=\frac c\eta\left(\frac x\eta\right)^{c-1}dx,
$$

したがって $f(x)dx=e^{-u}du$ となり、確率密度関数の積分は1です。$c=1$ では $\operatorname{Exp}(1/\eta)$ です。

### 2.9 ロジスティック分布

$\mu\in\mathbb R$, $s>0$ とします。$X\sim\operatorname{Logistic}(\mu,s)$ は累積分布関数

$$
F(x)=\frac{1}{1+e^{-(x-\mu)/s}}
$$

を持つ分布です。$z=(x-\mu)/s$ と置けば

$$
\frac{d}{dx}e^{-z}
=-\frac1s e^{-z}.
$$

したがって

$$
\begin{aligned}
f(x)
=F'(x)
&=-\{1+e^{-z}\}^{-2}
\left(-\frac1s e^{-z}\right)\\
&=\frac{e^{-(x-\mu)/s}}
{s\{1+e^{-(x-\mu)/s}\}^2},
\qquad x\in\mathbb R.
\end{aligned}
$$

---

## 3. 平均・分散・モーメント母関数

まず結論を一覧にします。ただし、この表は**計算結果を探す索引**であって、本番で無条件に使える公式集ではありません。導出を問う設問では、下の計算を再現します。

| 分布 | 平均 | 分散 | モーメント母関数と有限となる範囲 |
|---|---:|---:|---|
| $\operatorname{Unif}(a,b)$ | $(a+b)/2$ | $(b-a)^2/12$ | $(e^{tb}-e^{ta})/\{t(b-a)\}$、全 $t$。$t=0$ では1 |
| $N(\mu,\sigma^2)$ | $\mu$ | $\sigma^2$ | $e^{\mu t+\sigma^2t^2/2}$、全 $t$ |
| $\operatorname{Exp}(\lambda)$ | $1/\lambda$ | $1/\lambda^2$ | $\lambda/(\lambda-t)$、$t<\lambda$ |
| $\operatorname{Gamma}(\alpha,\beta)$ | $\alpha/\beta$ | $\alpha/\beta^2$ | $\{\beta/(\beta-t)\}^\alpha$、$t<\beta$ |
| $\operatorname{Beta}(\alpha,\beta)$ | $\alpha/(\alpha+\beta)$ | $\alpha\beta/\{(\alpha+\beta)^2(\alpha+\beta+1)\}$ | 全 $t$ で有限 |
| $\operatorname{Cauchy}(x_0,\gamma)$ | 存在しない | 存在しない | $t\ne0$ で発散 |
| $\operatorname{Lognormal}(\mu,\sigma^2)$ | $e^{\mu+\sigma^2/2}$ | $e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$ | $t\le0$ で有限、$t>0$ で発散。0の開近傍では存在しない |
| $\operatorname{Weibull}(c,\eta)$ | $\eta\Gamma(1+1/c)$ | $\eta^2[\Gamma(1+2/c)-\Gamma(1+1/c)^2]$ | $c>1$: 全 $t$、$c=1$: $t<1/\eta$、$0<c<1$: $t\le0$ |
| $\operatorname{Logistic}(\mu,s)$ | $\mu$ | $\pi^2s^2/3$ | $e^{\mu t}\pi st/\sin(\pi st)$、$|t|<1/s$ |

### 3.1 一様分布：直接積分

期待値は

$$
\begin{aligned}
E[X]
&=\frac1{b-a}\int_a^b x\,dx\\
&=\frac1{b-a}
\left[\frac{x^2}{2}\right]_a^b\\
&=\frac{b^2-a^2}{2(b-a)}\\
&=\frac{a+b}{2}.
\end{aligned}
$$

第2モーメントは

$$
\begin{aligned}
E[X^2]
&=\frac1{b-a}\int_a^b x^2\,dx\\
&=\frac{b^3-a^3}{3(b-a)}\\
&=\frac{a^2+ab+b^2}{3}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-E[X]^2\\
&=\frac{a^2+ab+b^2}{3}
-\frac{(a+b)^2}{4}\\
&=\frac{4a^2+4ab+4b^2-3a^2-6ab-3b^2}{12}\\
&=\frac{(b-a)^2}{12}.
\end{aligned}
$$

$t\ne0$ ではモーメント母関数も定義から

$$
\begin{aligned}
M_X(t)
&=\frac1{b-a}\int_a^b e^{tx}\,dx\\
&=\frac{e^{tb}-e^{ta}}{t(b-a)}.
\end{aligned}
$$

$t=0$ では定義から $M_X(0)=1$ です。

### 3.2 正規分布：標準化と平方完成

標準正規密度の正規化は、

$$
I=\int_{-\infty}^{\infty}e^{-x^2/2}\,dx
$$

と置き、二重積分を極座標へ移すと

$$
I^2
=\int_{\mathbb R^2}e^{-(x^2+y^2)/2}\,dx\,dy
=\int_0^{2\pi}\int_0^\infty e^{-r^2/2}r\,dr\,d\theta
=2\pi.
$$

$I>0$ より $I=\sqrt{2\pi}$ です。

$X\sim N(\mu,\sigma^2)$ なら

$$
Z=\frac{X-\mu}{\sigma}\sim N(0,1),
$$

したがって

$$
P(X\le x)=\Phi\left(\frac{x-\mu}{\sigma}\right).
$$

モーメント母関数は平方完成により

$$
\begin{aligned}
M_X(t)
&=\int_{-\infty}^{\infty}e^{tx}
\frac{e^{-(x-\mu)^2/(2\sigma^2)}}{\sqrt{2\pi}\sigma}\,dx\\
&=e^{\mu t+\sigma^2t^2/2}
\int_{-\infty}^{\infty}
\frac1{\sqrt{2\pi}\sigma}
\exp\left[-\frac{\{x-(\mu+\sigma^2t)\}^2}{2\sigma^2}\right]dx\\
&=e^{\mu t+\sigma^2t^2/2}.
\end{aligned}
$$

微分すると

$$
M_X'(t)
=(\mu+\sigma^2t)e^{\mu t+\sigma^2t^2/2},
$$

よって

$$
E[X]=M_X'(0)=\mu.
$$

さらに

$$
M_X''(0)=\mu^2+\sigma^2=E[X^2].
$$

したがって

$$
\operatorname{Var}(X)
=E[X^2]-E[X]^2
=(\mu^2+\sigma^2)-\mu^2
=\sigma^2.
$$

### 3.3 指数分布とガンマ分布：指数をずらしてガンマ積分へ戻す

まず $X\sim\operatorname{Exp}(\lambda)$ なら

$$
\begin{aligned}
E[X]
&=\lambda\int_0^\infty xe^{-\lambda x}\,dx\\
&=\lambda\frac{\Gamma(2)}{\lambda^2}\\
&=\frac1\lambda.
\end{aligned}
$$

また

$$
\begin{aligned}
E[X^2]
&=\lambda\int_0^\infty x^2e^{-\lambda x}\,dx\\
&=\lambda\frac{\Gamma(3)}{\lambda^3}\\
&=\frac2{\lambda^2}.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)
=\frac2{\lambda^2}-\frac1{\lambda^2}
=\frac1{\lambda^2}.
$$

$t<\lambda$ では

$$
\begin{aligned}
M_X(t)
&=\lambda\int_0^\infty e^{-(\lambda-t)x}\,dx\\
&=\frac{\lambda}{\lambda-t}.
\end{aligned}
$$

次に $X\sim\operatorname{Gamma}(\alpha,\beta)$ とします。$r>-\alpha$ に対し、$u=\beta x$ を用いると

$$
\begin{aligned}
E[X^r]
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\int_0^\infty x^{\alpha+r-1}e^{-\beta x}\,dx\\
&=\frac{\Gamma(\alpha+r)}{\Gamma(\alpha)\beta^r}.
\end{aligned}
$$

$r=1$ では

$$
\begin{aligned}
E[X]
&=\frac{\Gamma(\alpha+1)}{\Gamma(\alpha)\beta}\\
&=\frac{\alpha\Gamma(\alpha)}{\Gamma(\alpha)\beta}\\
&=\frac\alpha\beta.
\end{aligned}
$$

$r=2$ では

$$
\begin{aligned}
E[X^2]
&=\frac{\Gamma(\alpha+2)}{\Gamma(\alpha)\beta^2}\\
&=\frac{\alpha(\alpha+1)}{\beta^2}.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-E[X]^2\\
&=\frac{\alpha(\alpha+1)}{\beta^2}
-\frac{\alpha^2}{\beta^2}\\
&=\frac\alpha{\beta^2}.
\end{aligned}
$$

さらに $t<\beta$ なら

$$
\begin{aligned}
M_X(t)
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\int_0^\infty x^{\alpha-1}e^{-(\beta-t)x}\,dx\\
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\frac{\Gamma(\alpha)}{(\beta-t)^\alpha}\\
&=\left(\frac\beta{\beta-t}\right)^\alpha.
\end{aligned}
$$

共通の率 $\beta$ を持つ独立な $X_i\sim\operatorname{Gamma}(\alpha_i,\beta)$ では、独立性から和のモーメント母関数は各モーメント母関数の積になるため

$$
\sum_iX_i
\sim\operatorname{Gamma}\left(\sum_i\alpha_i,\beta\right).
$$

**率が異なる場合にはこの再生性をそのまま使えません。**

### 3.4 ベータ分布：ベータ関数の比を作る

$X\sim\operatorname{Beta}(\alpha,\beta)$ なら $r>-\alpha$ に対し

$$
\begin{aligned}
E[X^r]
&=\frac1{B(\alpha,\beta)}
\int_0^1x^{\alpha+r-1}(1-x)^{\beta-1}\,dx\\
&=\frac{B(\alpha+r,\beta)}{B(\alpha,\beta)}\\
&=\frac{\Gamma(\alpha+r)\Gamma(\alpha+\beta)}
{\Gamma(\alpha)\Gamma(\alpha+\beta+r)}.
\end{aligned}
$$

$r=1$ とすれば

$$
E[X]
=\frac{\alpha}{\alpha+\beta}.
$$

$r=2$ とすれば

$$
E[X^2]
=\frac{\alpha(\alpha+1)}
{(\alpha+\beta)(\alpha+\beta+1)}.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}
-\frac{\alpha^2}{(\alpha+\beta)^2}\\
&=\frac{\alpha\{(\alpha+1)(\alpha+\beta)-\alpha(\alpha+\beta+1)\}}
{(\alpha+\beta)^2(\alpha+\beta+1)}\\
&=\frac{\alpha\beta}
{(\alpha+\beta)^2(\alpha+\beta+1)}.
\end{aligned}
$$

また $0<X<1$ なので任意の実数 $t$ で

$$
0<e^{tX}\le e^{|t|},
$$

したがって $E[e^{tX}]$ は全実数 $t$ で有限です。

### 3.5 コーシー分布：対称でも平均は存在しない

標準コーシー分布では、正側の一次モーメントを $R$ で打ち切ると

$$
\begin{aligned}
\int_0^R x\frac{dx}{\pi(1+x^2)}
&=\frac1{2\pi}
\left[\log(1+x^2)\right]_0^R\\
&=\frac1{2\pi}\log(1+R^2)\\
&\longrightarrow\infty.
\end{aligned}
$$

正部分と負部分の期待値がそれぞれ無限大になるため、左右対称な主値が0でも通常の期待値は存在しません。

### 3.6 対数正規分布：モーメントは有限でもモーメント母関数は別問題

$Y\sim N(\mu,\sigma^2)$、$X=e^Y$ とします。任意の $r\in\mathbb R$ に対し

$$
X^r=e^{rY}
$$

なので、3.2で導出した正規分布のモーメント母関数に $t=r$ を代入して

$$
\begin{aligned}
E[X^r]
&=E[e^{rY}]\\
&=\exp\left(r\mu+\frac{r^2\sigma^2}{2}\right).
\end{aligned}
$$

ここから平均と分散を一段ずつ求めます。$r=1$ では

$$
E[X]
=\exp\left(\mu+\frac{\sigma^2}{2}\right).
$$

$r=2$ では

$$
\begin{aligned}
E[X^2]
&=\exp\left(2\mu+\frac{2^2\sigma^2}{2}\right)\\
&=e^{2\mu+2\sigma^2}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-\{E[X]\}^2\\
&=e^{2\mu+2\sigma^2}
-e^{2\mu+\sigma^2}\\
&=e^{2\mu+\sigma^2}(e^{\sigma^2}-1).
\end{aligned}
$$

次に中央値と分位点を累積分布関数から求めます。$x>0$ では $e^y$ が単調増加なので

$$
\begin{aligned}
F_X(x)
&=P(X\le x)\\
&=P(e^Y\le x)\\
&=P(Y\le\log x)\\
&=\Phi\left(\frac{\log x-\mu}{\sigma}\right).
\end{aligned}
$$

中央値を $m$ とすると $F_X(m)=1/2$ です。標準正規分布の対称性から $\Phi(0)=1/2$ なので

$$
\frac{\log m-\mu}{\sigma}=0.
$$

したがって

$$
\log m=\mu,
\qquad
\boxed{m=e^\mu}.
$$

さらに $0<u<1$ に対する $u$ 分位点を $q_u$ とすると

$$
\Phi\left(\frac{\log q_u-\mu}{\sigma}\right)=u.
$$

両辺に $\Phi^{-1}$ を作用させて

$$
\frac{\log q_u-\mu}{\sigma}=\Phi^{-1}(u),
$$

したがって

$$
\boxed{
q_u=\exp\{\mu+\sigma\Phi^{-1}(u)\}
}.
$$

ここまでの $E[X^r]$ が全実数 $r$ で有限であることと、$X$ 自身のモーメント母関数が存在することは別問題です。$t>0$ では

$$
\begin{aligned}
E[e^{tX}]
&=E[e^{te^Y}]\\
&=\frac1{\sigma\sqrt{2\pi}}
\int_{-\infty}^{\infty}
\exp\left\{te^y-\frac{(y-\mu)^2}{2\sigma^2}\right\}dy.
\end{aligned}
$$

$e^y$ は $y^2$ より速く増えるので

$$
te^y-\frac{(y-\mu)^2}{2\sigma^2}\longrightarrow+\infty.
$$

したがって被積分関数は大きな $y$ で0へ近づかず、積分は発散します。一方 $t<0$ なら $0<e^{tX}\le1$、$t=0$ なら $e^{tX}=1$ なので $E[e^{tX}]$ は $t\le0$ で有限です。しかし0を含む開区間で有限ではないため、通常の意味でモーメント母関数は存在しません。

---

## 4. 生存関数・ハザード・変数変換

非負連続変数について

$$
S(x)=P(X>x)=1-F(x),
\qquad
h(x)=\frac{f(x)}{S(x)}
$$

とします。

### 4.1 指数分布の無記憶性

$X\sim\operatorname{Exp}(\lambda)$ なら $x\ge0$ で

$$
S(x)=e^{-\lambda x}.
$$

したがって $x>0$ で

$$
h(x)
=\frac{\lambda e^{-\lambda x}}{e^{-\lambda x}}
=\lambda.
$$

$s,t\ge0$ に対し

$$
\begin{aligned}
P(X>s+t\mid X>s)
&=\frac{P(X>s+t)}{P(X>s)}\\
&=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}\\
&=e^{-\lambda t}\\
&=P(X>t).
\end{aligned}
$$

これが無記憶性です。

### 4.2 ワイブル分布の生存関数・ハザード・モーメント

$X\sim\operatorname{Weibull}(c,\eta)$ とします。$x\ge0$ で

$$
\begin{aligned}
S(x)
&=\int_x^\infty
\frac c\eta\left(\frac t\eta\right)^{c-1}
 e^{-(t/\eta)^c}\,dt.
\end{aligned}
$$

$u=(t/\eta)^c$ と置けば

$$
du=\frac c\eta\left(\frac t\eta\right)^{c-1}dt,
$$

積分の下端は $u=(x/\eta)^c$ なので

$$
\begin{aligned}
S(x)
&=\int_{(x/\eta)^c}^{\infty}e^{-u}\,du\\
&=e^{-(x/\eta)^c}.
\end{aligned}
$$

したがって

$$
F(x)=1-e^{-(x/\eta)^c},
\qquad x\ge0.
$$

$x>0$ では

$$
\begin{aligned}
h(x)
&=\frac{f(x)}{S(x)}\\
&=\frac c\eta\left(\frac x\eta\right)^{c-1}.
\end{aligned}
$$

よって

- $c>1$: $c-1>0$ なのでハザードは増加。
- $c=1$: ハザードは $1/\eta$ で一定。
- $0<c<1$: $c-1<0$ なのでハザードは減少。

また

$$
Y=\left(\frac X\eta\right)^c
$$

と置くと、$y\ge0$ で

$$
\begin{aligned}
P(Y\le y)
&=P\left(X\le\eta y^{1/c}\right)\\
&=1-e^{-y}.
\end{aligned}
$$

したがって

$$
Y\sim\operatorname{Exp}(1).
$$

$X=\eta Y^{1/c}$ なので、$r>-c$ に対し

$$
\begin{aligned}
E[X^r]
&=\eta^rE[Y^{r/c}]\\
&=\eta^r\int_0^\infty y^{r/c}e^{-y}\,dy\\
&=\eta^r\Gamma\left(1+\frac rc\right).
\end{aligned}
$$

$r=1$ から

$$
E[X]=\eta\Gamma\left(1+\frac1c\right).
$$

$r=2$ から

$$
E[X^2]=\eta^2\Gamma\left(1+\frac2c\right).
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-E[X]^2\\
&=\eta^2\left[
\Gamma\left(1+\frac2c\right)
-\Gamma\left(1+\frac1c\right)^2
\right].
\end{aligned}
$$

### 4.3 ワイブル分布のモーメント母関数の存在範囲

$Y=(X/\eta)^c$ とすると、$X=\eta Y^{1/c}$ なので

$$
E[e^{tX}]
=\int_0^\infty
\exp\{t\eta y^{1/c}-y\}\,dy.
$$

大きな $y$ で指数部

$$
t\eta y^{1/c}-y
$$

のどちらの項が優勢かを見ます。

- $c>1$ なら $1/c<1$ なので $-y$ が優勢。全実数 $t$ で有限。
- $c=1$ なら $(t\eta-1)y$ となり、$t<1/\eta$ で有限。
- $0<c<1$ なら $1/c>1$ なので任意の $t>0$ で正の項が優勢となり発散。
- $t\le0$ では $e^{tX}\le1$ なので常に有限。

### 4.4 ロジスティック分布の分位点

$0<u<1$ とし、$u$ 分位点を $q_u$ とします。定義から

$$
u=F(q_u)
=\frac1{1+e^{-(q_u-\mu)/s}}.
$$

逆数を取ると

$$
\frac1u=1+e^{-(q_u-\mu)/s},
$$

したがって

$$
\frac{1-u}{u}=e^{-(q_u-\mu)/s}.
$$

両辺の対数を取って

$$
\log\frac{1-u}{u}
=-\frac{q_u-\mu}{s}.
$$

よって

$$
\boxed{
q_u
=\mu+s\log\frac{u}{1-u}
}.
$$

中央値は $u=1/2$ を代入して

$$
q_{1/2}
=\mu+s\log1
=\mu.
$$

第1四分位点は $u=1/4$ なので

$$
q_{1/4}
=\mu+s\log\frac{1/4}{3/4}
=\mu-s\log3.
$$

第3四分位点は $u=3/4$ なので

$$
q_{3/4}
=\mu+s\log\frac{3/4}{1/4}
=\mu+s\log3.
$$

---

## 5. 典型例

### 例1：正規標準化

$X\sim N(10,2^2)$ なら

$$
P(8<X\le13)
=P\left(-1<\frac{X-10}{2}\le1.5\right)
=\Phi(1.5)-\Phi(-1).
$$

第2引数の $2^2=4$ は分散であり、標準化では標準偏差 $2$ で割ります。

### 例2：ガンマ分布の率と尺度

$X\sim\operatorname{Gamma}(3,2)$ を本章の率表示で解釈します。3.3で導出した式に $\alpha=3$, $\beta=2$ を入れると

$$
E[X]=\frac32,
$$

$$
\operatorname{Var}(X)=\frac3{2^2}=\frac34.
$$

別の教科書で第2母数を尺度としている場合は値が変わります。答案では指数部 $e^{-2x}$ まで書けば規約の取り違えを防げます。

### 例3：ベータ積分

$X\sim\operatorname{Beta}(2,3)$ では

$$
B(2,3)
=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}
=\frac{1!2!}{4!}
=\frac1{12}.
$$

よって

$$
f(x)=12x(1-x)^2\boldsymbol{1}_{(0,1)}(x).
$$

また3.4で導出した式に $\alpha=2$, $\beta=3$ を代入すると

$$
E[X]=\frac25,
$$

$$
\operatorname{Var}(X)
=\frac{2\cdot3}{5^2\cdot6}
=\frac1{25}.
$$

### 例4：コーシー分布の重い裾

標準コーシー分布では

$$
\begin{aligned}
P(|X|\le a)
&=F(a)-F(-a)\\
&=\frac2\pi\arctan a,
\end{aligned}
$$

したがって

$$
P(|X|>a)
=1-\frac2\pi\arctan a.
$$

尾確率は正規分布より遅く減少し、$E[|X|]$ は発散します。

### 例5：ワイブル分布のハザード

$X\sim\operatorname{Weibull}(2,10)$ なら4.2の式に $c=2$, $\eta=10$ を代入して

$$
S(x)=e^{-(x/10)^2},
$$

$$
h(x)
=\frac2{10}\left(\frac{x}{10}\right)
=\frac{x}{50},
\qquad x>0.
$$

ハザードが時間とともに増えるため、摩耗故障のような寿命モデルに対応します。

---

## 6. 問題解決パターン

### SUPPORT-1：最初に台を見る

有界区間なら一様分布・ベータ分布、正の半直線なら指数分布・ガンマ分布・ワイブル分布・対数正規分布、実数全体なら正規分布・コーシー分布・ロジスティック分布を候補にします。

### STANDARDIZE-1：位置と尺度を外す

正規分布では $(X-\mu)/\sigma$ を使います。コーシー分布やロジスティック分布も位置・尺度変換が中心ですが、第2母数の意味は分布ごとに確認します。

### GAMMA-1・BETA-1：既知積分へ戻す

正の半直線の

$$
x^{a-1}e^{-bx}
$$

はガンマ積分、$(0,1)$ の

$$
x^{a-1}(1-x)^{b-1}
$$

はベータ積分です。モーメントでは $x^r$ を掛けて指数をずらします。

### SURVIVAL-1：寿命は生存関数から解く

条件付き尾確率は

$$
\frac{S(s+t)}{S(s)},
$$

ハザードは $f/S$ です。$u$ 分位点は、まず

$$
F(q_u)=u
$$

または

$$
S(q_u)=1-u
$$

と置き、そこから未知数 $q_u$ を解きます。分位点の閉形式を直接置かないことが重要です。

### TRANSFORM-1：単調変換を逆にたどる

対数正規分布なら $\log X$、ワイブル分布なら $(X/\eta)^c$ へ戻します。累積分布関数を使う方法では、変換の単調性と像の範囲を先に確認します。

### HEAVYTAIL-1：対称性と積分可能性を分ける

コーシー分布では「対称だから平均0」は誤りです。対数正規分布では全実数次モーメントが有限でも、正の側のモーメント母関数は発散します。

### 本番での選択判断

3分で台・分布名・母数化を決めます。15分で正規化または主要な変数変換と平均・分散まで進めれば継続します。25分では収束条件、生存関数、モデル理由を一文ずつ残して答案を閉じます。

---

# 7. 演習：問題の直後に解答

GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

## Level A：基礎

### P3C-A01 一様分布

- level: A
- minutes: 7
- topics: 一様分布
- techniques: SUPPORT-1
- calculation_load: low

$X\sim\operatorname{Unif}(2,6)$ の累積分布関数、$P(3<X\le5)$、平均、分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$2<x<6$ では

$$
F(x)
=\int_2^x\frac14\,dt
=\frac{x-2}{4}.
$$

したがって

$$
F(x)=
\begin{cases}
0,&x\le2,\\
(x-2)/4,&2<x<6,\\
1,&x\ge6.
\end{cases}
$$

よって

$$
P(3<X\le5)
=F(5)-F(3)
=\frac34-\frac14
=\frac12.
$$

平均は

$$
\begin{aligned}
E[X]
&=\frac14\int_2^6x\,dx\\
&=\frac14\left[\frac{x^2}{2}\right]_2^6\\
&=4.
\end{aligned}
$$

第2モーメントは

$$
\begin{aligned}
E[X^2]
&=\frac14\int_2^6x^2\,dx\\
&=\frac14\left[\frac{x^3}{3}\right]_2^6\\
&=\frac{52}{3}.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)
=\frac{52}{3}-4^2
=\frac43.
$$

##### 本番答案

$2<x<6$ で $F(x)=\int_2^xdt/4=(x-2)/4$ より

$$
F(x)=
\begin{cases}
0,&x\le2,\\
(x-2)/4,&2<x<6,\\
1,&x\ge6.
\end{cases}
$$

従って $P(3<X\le5)=1/2$。また

$$
E[X]=\frac14\int_2^6x\,dx=4,
$$

$$
E[X^2]=\frac14\int_2^6x^2\,dx=\frac{52}{3},
$$

より $\operatorname{Var}(X)=4/3$。

##### 採点基準

- 累積分布関数: 4点
- 確率: 2点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3C-A02 指数分布

- level: A
- minutes: 7
- topics: 指数分布
- techniques: SURVIVAL-1
- calculation_load: low

$X\sim\operatorname{Exp}(0.5)$ の $P(X>4)$、$P(X>6\mid X>2)$、平均、分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$x\ge0$ で

$$
\begin{aligned}
S(x)
&=\int_x^\infty0.5e^{-0.5t}\,dt\\
&=e^{-0.5x}.
\end{aligned}
$$

従って

$$
P(X>4)=S(4)=e^{-2},
$$

$$
\begin{aligned}
P(X>6\mid X>2)
&=\frac{S(6)}{S(2)}\\
&=\frac{e^{-3}}{e^{-1}}\\
&=e^{-2}.
\end{aligned}
$$

平均はガンマ積分を使って

$$
\begin{aligned}
E[X]
&=0.5\int_0^\infty xe^{-0.5x}\,dx\\
&=0.5\frac{\Gamma(2)}{0.5^2}\\
&=2.
\end{aligned}
$$

第2モーメントは

$$
\begin{aligned}
E[X^2]
&=0.5\int_0^\infty x^2e^{-0.5x}\,dx\\
&=0.5\frac{\Gamma(3)}{0.5^3}\\
&=8.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)
=8-2^2
=4.
$$

##### 本番答案

$S(x)=e^{-x/2}$ より $P(X>4)=e^{-2}$、$P(X>6\mid X>2)=S(6)/S(2)=e^{-2}$。また

$$
E[X]=0.5\frac{\Gamma(2)}{0.5^2}=2,
\quad
E[X^2]=0.5\frac{\Gamma(3)}{0.5^3}=8,
$$

より $\operatorname{Var}(X)=4$。

##### 採点基準

- 生存関数: 2点
- 各確率: 2点ずつ
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3C-A03 正規標準化

- level: A
- minutes: 7
- topics: 正規分布
- techniques: STANDARDIZE-1
- calculation_load: low

$X\sim N(10,2^2)$ の $P(8<X\le13)$ を標準正規分布の累積分布関数 $\Phi$ で表し、平均と分散を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

正規分布 $N(10,2^2)$ の第1母数は平均、第2母数は分散です。標準偏差は $\sqrt{2^2}=2$ なので

$$
Z=\frac{X-10}{2}\sim N(0,1).
$$

したがって

$$
\begin{aligned}
P(8<X\le13)
&=P\left(\frac{8-10}{2}<Z\le\frac{13-10}{2}\right)\\
&=P(-1<Z\le1.5)\\
&=\Phi(1.5)-\Phi(-1).
\end{aligned}
$$

また定義された母数から

$$
E[X]=10,
\qquad
\operatorname{Var}(X)=2^2=4.
$$

##### 本番答案

$Z=(X-10)/2\sim N(0,1)$ より

$$
P(8<X\le13)=\Phi(1.5)-\Phi(-1).
$$

$E[X]=10$、$\operatorname{Var}(X)=4$。

##### 採点基準

- 標準化: 4点
- 確率: 2点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3C-A04 コーシー分布

- level: A
- minutes: 8
- topics: コーシー分布
- techniques: HEAVYTAIL-1
- calculation_load: low

$X\sim\operatorname{Cauchy}(0,1)$ の累積分布関数、$P(|X|\le1)$ を求め、期待値が存在しない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

標準コーシー分布の確率密度関数は

$$
f(x)=\frac1{\pi(1+x^2)}.
$$

したがって

$$
\begin{aligned}
F(x)
&=\int_{-\infty}^{x}\frac{dt}{\pi(1+t^2)}\\
&=\frac1\pi
\left[\arctan t\right]_{-\infty}^{x}\\
&=\frac12+\frac1\pi\arctan x.
\end{aligned}
$$

よって

$$
\begin{aligned}
P(|X|\le1)
&=F(1)-F(-1)\\
&=\frac2\pi\arctan1\\
&=\frac12.
\end{aligned}
$$

一方、正部分の一次モーメントは

$$
\begin{aligned}
\int_0^R\frac{x}{\pi(1+x^2)}\,dx
&=\frac1{2\pi}\log(1+R^2)\\
&\longrightarrow\infty.
\end{aligned}
$$

負部分も絶対値で発散するので、対称性にかかわらず期待値は存在しません。

##### 本番答案

$$
F(x)
=\int_{-\infty}^{x}\frac{dt}{\pi(1+t^2)}
=\frac12+\frac1\pi\arctan x.
$$

よって $P(|X|\le1)=1/2$。また

$$
\int_0^R\frac{x}{\pi(1+x^2)}dx
=\frac1{2\pi}\log(1+R^2)\to\infty
$$

なので期待値は存在しない。

##### 採点基準

- 累積分布関数: 3点
- 確率: 2点
- 発散積分: 4点
- 結論: 1点

<!-- solution-end -->

## Level B：小問セット

### P3C-B01 ガンマ分布

- level: B
- minutes: 15
- topics: ガンマ分布
- techniques: GAMMA-1
- calculation_load: medium

$$
f(x)=c x^2e^{-2x}\boldsymbol{1}_{(0,\infty)}(x)
$$

が確率密度関数となる $c$ を求め、分布名と母数、平均、分散、モーメント母関数が有限となる範囲を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

まず正規化条件から

$$
1=c\int_0^\infty x^2e^{-2x}\,dx.
$$

ガンマ積分より

$$
\int_0^\infty x^2e^{-2x}\,dx
=\frac{\Gamma(3)}{2^3}
=\frac{2}{8}
=\frac14.
$$

したがって

$$
c=4.
$$

よって

$$
f(x)=4x^2e^{-2x}
=\frac{2^3}{\Gamma(3)}x^{3-1}e^{-2x},
$$

なので

$$
X\sim\operatorname{Gamma}(3,2)
$$

（形状3、率2）です。

平均は密度から

$$
\begin{aligned}
E[X]
&=4\int_0^\infty x^3e^{-2x}\,dx\\
&=4\frac{\Gamma(4)}{2^4}\\
&=4\frac{6}{16}\\
&=\frac32.
\end{aligned}
$$

第2モーメントは

$$
\begin{aligned}
E[X^2]
&=4\int_0^\infty x^4e^{-2x}\,dx\\
&=4\frac{\Gamma(5)}{2^5}\\
&=4\frac{24}{32}\\
&=3.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)
=3-\left(\frac32\right)^2
=\frac34.
$$

モーメント母関数は

$$
\begin{aligned}
M_X(t)
&=4\int_0^\infty x^2e^{-(2-t)x}\,dx\\
&=4\frac{\Gamma(3)}{(2-t)^3}\\
&=\left(\frac2{2-t}\right)^3.
\end{aligned}
$$

この積分が有限になるには $2-t>0$ が必要なので

$$
t<2.
$$

##### 本番答案

正規化条件とガンマ積分から

$$
1=c\frac{\Gamma(3)}{2^3}=\frac c4
$$

なので $c=4$。従って $X\sim\operatorname{Gamma}(3,2)$（形状3、率2）。さらに

$$
E[X]=4\frac{\Gamma(4)}{2^4}=\frac32,
\quad
E[X^2]=4\frac{\Gamma(5)}{2^5}=3,
$$

より $\operatorname{Var}(X)=3/4$。また

$$
M_X(t)=4\frac{\Gamma(3)}{(2-t)^3}
=\left(\frac2{2-t}\right)^3,
\qquad t<2.
$$

##### 採点基準

- 正規化: 3点
- 分布同定: 2点
- 平均: 1点
- 分散: 1点
- モーメント母関数と存在範囲: 3点

<!-- solution-end -->

### P3C-B02 ベータ分布

- level: B
- minutes: 15
- topics: ベータ分布
- techniques: BETA-1
- calculation_load: medium

$$
f(x)=c x(1-x)^2\boldsymbol{1}_{(0,1)}(x)
$$

が確率密度関数となる $c$ を求め、分布名と母数、平均、分散を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

正規化条件から

$$
1=c\int_0^1x(1-x)^2dx
=cB(2,3).
$$

$$
B(2,3)
=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}
=\frac{1!2!}{4!}
=\frac1{12},
$$

したがって

$$
c=12.
$$

よって

$$
X\sim\operatorname{Beta}(2,3).
$$

平均は

$$
\begin{aligned}
E[X]
&=12\int_0^1x^2(1-x)^2dx\\
&=12B(3,3)\\
&=12\frac{2!2!}{5!}\\
&=\frac25.
\end{aligned}
$$

第2モーメントは

$$
\begin{aligned}
E[X^2]
&=12\int_0^1x^3(1-x)^2dx\\
&=12B(4,3)\\
&=12\frac{3!2!}{6!}\\
&=\frac15.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)
=\frac15-\left(\frac25\right)^2
=\frac1{25}.
$$

##### 本番答案

$$
1=cB(2,3)=\frac c{12}
$$

より $c=12$、$X\sim\operatorname{Beta}(2,3)$。また

$$
E[X]=12B(3,3)=\frac25,
\quad
E[X^2]=12B(4,3)=\frac15,
$$

より $\operatorname{Var}(X)=1/25$。

##### 採点基準

- 正規化: 4点
- 分布同定: 2点
- 平均: 2点
- 分散: 2点

<!-- solution-end -->

### P3C-B03 ワイブル分布

- level: B
- minutes: 15
- topics: ワイブル分布
- techniques: SURVIVAL-1, TRANSFORM-1
- calculation_load: medium

$X\sim\operatorname{Weibull}(2,3)$ とする。生存関数、ハザード、中央値を求め、$Y=(X/3)^2$ の分布を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

4.2の導出に $c=2$, $\eta=3$ を代入すると、$x\ge0$ で

$$
S(x)=e^{-(x/3)^2}.
$$

また $x>0$ で

$$
\begin{aligned}
h(x)
&=\frac2{3}\left(\frac x3\right)\\
&=\frac{2x}{9}.
\end{aligned}
$$

中央値を $m$ とします。中央値の定義から

$$
P(X\le m)=\frac12,
$$

すなわち

$$
S(m)=\frac12.
$$

したがって

$$
e^{-(m/3)^2}=\frac12.
$$

両辺の対数を取ると

$$
-\left(\frac m3\right)^2=-\log2,
$$

よって $m>0$ なので

$$
\left(\frac m3\right)^2=\log2,
\qquad
\boxed{m=3\sqrt{\log2}}.
$$

さらに $y\ge0$ で

$$
\begin{aligned}
P(Y\le y)
&=P\left((X/3)^2\le y\right)\\
&=P(X\le3\sqrt y)\\
&=1-e^{-y}.
\end{aligned}
$$

よって

$$
Y\sim\operatorname{Exp}(1).
$$

##### 本番答案

$S(x)=e^{-(x/3)^2}$、$h(x)=2x/9$。中央値 $m$ は

$$
e^{-(m/3)^2}=1/2
$$

を満たすので $(m/3)^2=\log2$、従って $m=3\sqrt{\log2}$。また

$$
P(Y\le y)=P(X\le3\sqrt y)=1-e^{-y}
$$

より $Y\sim\operatorname{Exp}(1)$。

##### 採点基準

- 生存関数: 2点
- ハザード: 3点
- 中央値: 2点
- 変換後の分布: 3点

<!-- solution-end -->

### P3C-B04 対数正規分布とロジスティック分布

- level: B
- minutes: 15
- topics: 対数正規分布, ロジスティック分布
- techniques: TRANSFORM-1, STANDARDIZE-1
- calculation_load: medium

1. $X\sim\operatorname{Lognormal}(0,1)$ の中央値、平均、分散を求めよ。
2. $Y\sim\operatorname{Logistic}(\mu,s)$ の中央値と第1・第3四分位点を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

**(1) 対数正規分布**

$Z=\log X\sim N(0,1)$ です。$x>0$ で

$$
F_X(x)=P(Z\le\log x)=\Phi(\log x).
$$

中央値を $m$ とすると

$$
F_X(m)=\frac12,
$$

したがって

$$
\Phi(\log m)=\frac12=\Phi(0).
$$

$\Phi$ は狭義増加なので

$$
\log m=0,
\qquad
\boxed{m=1}.
$$

平均は3.6で導出した一般モーメントに $\mu=0$, $\sigma=1$, $r=1$ を入れて

$$
E[X]=e^{1/2}.
$$

第2モーメントは $r=2$ を入れて

$$
E[X^2]=e^{2}.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-E[X]^2\\
&=e^2-e\\
&=e(e-1).
\end{aligned}
$$

**(2) ロジスティック分布**

$u$ 分位点を $q_u$ とすると

$$
u=\frac1{1+e^{-(q_u-\mu)/s}}.
$$

従って

$$
\frac{1-u}{u}=e^{-(q_u-\mu)/s},
$$

$$
\log\frac{1-u}{u}
=-\frac{q_u-\mu}{s},
$$

よって

$$
q_u=\mu+s\log\frac{u}{1-u}.
$$

$u=1/2$ なら

$$
q_{1/2}=\mu.
$$

$u=1/4$ なら

$$
q_{1/4}
=\mu+s\log\frac13
=\mu-s\log3.
$$

$u=3/4$ なら

$$
q_{3/4}
=\mu+s\log3.
$$

##### 本番答案

(1) $F_X(x)=\Phi(\log x)$ なので、中央値 $m$ は $\Phi(\log m)=1/2=\Phi(0)$ から $m=1$。また3.6のモーメント式より

$$
E[X]=e^{1/2},
\quad E[X^2]=e^2,
$$

従って $\operatorname{Var}(X)=e^2-e=e(e-1)$。

(2) $u=F(q_u)$ を解くと

$$
q_u=\mu+s\log\frac{u}{1-u}.
$$

従って中央値は $\mu$、第1・第3四分位点は $\mu-s\log3$, $\mu+s\log3$。

##### 採点基準

- 対数正規分布の中央値の導出: 2点
- 対数正規分布の平均・分散: 3点
- ロジスティック分布の分位点式の導出: 3点
- 中央値・四分位点への代入: 2点

<!-- solution-end -->

## Level C：統計検定1級型

### P3C-C01 指数分布の和とガンマ分布

- level: C
- minutes: 27
- topics: 指数分布, ガンマ分布
- techniques: GAMMA-1
- calculation_load: high

独立な $X_1,X_2\sim\operatorname{Exp}(\lambda)$ とし、$S=X_1+X_2$ とする。

1. 畳込みで $S$ の確率密度関数を求めよ。
2. 分布名と母数を示せ。
3. $E[S]$, $\operatorname{Var}(S)$ を求めよ。
4. $P(S>x)$ を求めよ。
5. $S$ が指数分布でない理由をハザードまたは無記憶性から述べよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)7分、(2)(3)各3分、(4)5分、(5)3分、見直し3分。

##### 詳細解答

$s>0$ で畳込みを取ると

$$
\begin{aligned}
f_S(s)
&=\int_0^s\lambda e^{-\lambda x}
\lambda e^{-\lambda(s-x)}dx\\
&=\lambda^2e^{-\lambda s}\int_0^s dx\\
&=\lambda^2s e^{-\lambda s}.
\end{aligned}
$$

$s\le0$ では $f_S(s)=0$ です。ガンマ分布の確率密度関数

$$
\frac{\lambda^2}{\Gamma(2)}s^{2-1}e^{-\lambda s}
=\lambda^2s e^{-\lambda s}
$$

と一致するので

$$
S\sim\operatorname{Gamma}(2,\lambda).
$$

3.3で導出したガンマ分布のモーメント式に $\alpha=2$, $\beta=\lambda$ を入れると

$$
E[S]=\frac2\lambda.
$$

また

$$
E[S^2]
=\frac{2(2+1)}{\lambda^2}
=\frac6{\lambda^2},
$$

したがって

$$
\operatorname{Var}(S)
=\frac6{\lambda^2}-\frac4{\lambda^2}
=\frac2{\lambda^2}.
$$

$x\ge0$ では部分積分により

$$
\begin{aligned}
P(S>x)
&=\int_x^\infty\lambda^2s e^{-\lambda s}ds\\
&=\left[-(\lambda s+1)e^{-\lambda s}\right]_{s=x}^{\infty}\\
&=e^{-\lambda x}(1+\lambda x).
\end{aligned}
$$

$x<0$ では $P(S>x)=1$ です。従って $x>0$ で

$$
\begin{aligned}
h(x)
&=\frac{\lambda^2xe^{-\lambda x}}
{e^{-\lambda x}(1+\lambda x)}\\
&=\frac{\lambda^2x}{1+\lambda x}.
\end{aligned}
$$

これは一定でないため指数分布ではなく、無記憶性も持ちません。

##### 本番答案

$s>0$ で

$$
f_S(s)=\int_0^s\lambda^2e^{-\lambda s}dx
=\lambda^2s e^{-\lambda s},
$$

$s\le0$ では0。従って $S\sim\operatorname{Gamma}(2,\lambda)$。3.3のモーメント式から

$$
E[S]=2/\lambda,
\quad E[S^2]=6/\lambda^2,
$$

よって $\operatorname{Var}(S)=2/\lambda^2$。また

$$
P(S>x)=
\begin{cases}
1,&x<0,\\
e^{-\lambda x}(1+\lambda x),&x\ge0.
\end{cases}
$$

$x>0$ で $h(x)=\lambda^2x/(1+\lambda x)$ は一定でないので指数分布ではない。

##### 採点基準と選択判断

- 畳込み: 8点
- 分布同定: 4点
- 平均・分散: 4点
- 生存関数: 5点
- 非指数性: 4点

3分で積分区間 $0<x<s$ が見えれば選択し、15分で確率密度関数と分布同定まで進めば継続します。

<!-- solution-end -->

### P3C-C02 ベータ分布の形とモーメント

- level: C
- minutes: 25
- topics: ベータ分布
- techniques: BETA-1
- calculation_load: high

$X\sim\operatorname{Beta}(\alpha,\beta)$、$\alpha>1$, $\beta>1$ とする。

1. 確率密度関数の正規化を示せ。
2. $E[X]$ と $E[X^2]$ を導け。
3. 分散を求めよ。
4. 確率密度関数の最頻値を求めよ。
5. $1-X$ の分布を示せ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)3分、(2)6分、(3)5分、(4)5分、(5)3分。

##### 詳細解答

ベータ関数の定義から

$$
\int_0^1
\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}dx
=1.
$$

一般に

$$
E[X^r]
=\frac{B(\alpha+r,\beta)}{B(\alpha,\beta)}.
$$

$r=1$ では

$$
\begin{aligned}
E[X]
&=\frac{\Gamma(\alpha+1)\Gamma(\alpha+\beta)}
{\Gamma(\alpha)\Gamma(\alpha+\beta+1)}\\
&=\frac\alpha{\alpha+\beta}.
\end{aligned}
$$

$r=2$ では

$$
\begin{aligned}
E[X^2]
&=\frac{\Gamma(\alpha+2)\Gamma(\alpha+\beta)}
{\Gamma(\alpha)\Gamma(\alpha+\beta+2)}\\
&=\frac{\alpha(\alpha+1)}
{(\alpha+\beta)(\alpha+\beta+1)}.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}
-\frac{\alpha^2}{(\alpha+\beta)^2}\\
&=\frac{\alpha\beta}
{(\alpha+\beta)^2(\alpha+\beta+1)}.
\end{aligned}
$$

最頻値は確率密度関数を最大化します。正の定数を除いて

$$
f(x)\propto x^{\alpha-1}(1-x)^{\beta-1}
$$

なので、$0<x<1$ で対数を取って

$$
\log f(x)=C+(\alpha-1)\log x+(\beta-1)\log(1-x).
$$

微分すると

$$
\frac d{dx}\log f(x)
=\frac{\alpha-1}{x}-\frac{\beta-1}{1-x}.
$$

これを0と置くと

$$
(\alpha-1)(1-x)=(\beta-1)x,
$$

$$
\alpha-1=(\alpha+\beta-2)x,
$$

したがって

$$
x=\frac{\alpha-1}{\alpha+\beta-2}.
$$

また

$$
\frac{d^2}{dx^2}\log f(x)
=-\frac{\alpha-1}{x^2}
-\frac{\beta-1}{(1-x)^2}<0
$$

なので、この点が最頻値です。

最後に $Y=1-X$ とします。$0<y<1$ で $x=1-y$、$|dx/dy|=1$ なので

$$
\begin{aligned}
f_Y(y)
&=f_X(1-y)\\
&=\frac{(1-y)^{\alpha-1}y^{\beta-1}}
{B(\alpha,\beta)}.
\end{aligned}
$$

$B(\alpha,\beta)=B(\beta,\alpha)$ より

$$
1-X\sim\operatorname{Beta}(\beta,\alpha).
$$

##### 本番答案

ベータ関数の定義で正規化され、

$$
E[X^r]=\frac{B(\alpha+r,\beta)}{B(\alpha,\beta)}.
$$

従って

$$
E[X]=\frac\alpha{\alpha+\beta},
\quad
E[X^2]=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)},
$$

$$
\operatorname{Var}(X)
=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.
$$

最頻値は

$$
\frac{\alpha-1}{x}-\frac{\beta-1}{1-x}=0
$$

を解いて $x=(\alpha-1)/(\alpha+\beta-2)$。二階微分は負。変数変換 $y=1-x$ から $1-X\sim\operatorname{Beta}(\beta,\alpha)$。

##### 採点基準と選択判断

- 正規化: 3点
- 二つのモーメント: 7点
- 分散: 5点
- 最頻値: 6点
- 変換: 4点

15分で分散まで得られれば継続します。

<!-- solution-end -->

### P3C-C03 対数正規分布

- level: C
- minutes: 28
- topics: 対数正規分布, 正規分布
- techniques: TRANSFORM-1, HEAVYTAIL-1
- calculation_load: high

$Y\sim N(\mu,\sigma^2)$、$X=e^Y$、$\sigma>0$ とする。

1. $X$ の台と確率密度関数を求めよ。
2. $E[X^r]$ を実数 $r$ について求めよ。
3. 平均と分散を求めよ。
4. 中央値を求めよ。
5. $t>0$ で $E[e^{tX}]=\infty$ となる理由を述べよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)6分、(2)5分、(3)5分、(4)2分、(5)5分、見直し2分。

##### 詳細解答

**(1) 台と確率密度関数**

$x=e^y$ は単調増加で、$X>0$ です。逆変換は

$$
y=\log x,
\qquad
\left|\frac{dy}{dx}\right|=\frac1x.
$$

したがって $x>0$ で

$$
\begin{aligned}
f_X(x)
&=f_Y(\log x)\frac1x\\
&=\frac1{x\sigma\sqrt{2\pi}}
\exp\left\{-\frac{(\log x-\mu)^2}{2\sigma^2}\right\}.
\end{aligned}
$$

$x\le0$ では0です。

**(2) 一般のモーメント**

$X^r=e^{rY}$ なので、3.2で導出した正規分布のモーメント母関数を用いて

$$
\begin{aligned}
E[X^r]
&=E[e^{rY}]\\
&=\exp\left(r\mu+\frac{r^2\sigma^2}{2}\right).
\end{aligned}
$$

正規分布のモーメント母関数は全実数で有限なので、この式は任意の実数 $r$ に対して有限です。

**(3) 平均と分散**

$r=1$ を代入して

$$
E[X]=e^{\mu+\sigma^2/2}.
$$

$r=2$ を代入して

$$
E[X^2]
=e^{2\mu+2\sigma^2}.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-E[X]^2\\
&=e^{2\mu+2\sigma^2}-e^{2\mu+\sigma^2}\\
&=e^{2\mu+\sigma^2}(e^{\sigma^2}-1).
\end{aligned}
$$

**(4) 中央値**

中央値を $m$ とすると

$$
P(X\le m)=\frac12.
$$

$e^y$ は単調増加なので

$$
P(Y\le\log m)=\frac12.
$$

標準化すると

$$
\Phi\left(\frac{\log m-\mu}{\sigma}\right)=\frac12=\Phi(0).
$$

したがって

$$
\log m=\mu,
\qquad
\boxed{m=e^\mu}.
$$

**(5) 正の側のモーメント母関数**

$t>0$ では

$$
E[e^{tX}]
=\frac1{\sigma\sqrt{2\pi}}
\int_{-\infty}^{\infty}
\exp\left\{te^y-\frac{(y-\mu)^2}{2\sigma^2}\right\}dy.
$$

$$
\frac{te^y}{(y-\mu)^2}\longrightarrow\infty
$$

なので、十分大きな $y$ では指数部

$$
te^y-\frac{(y-\mu)^2}{2\sigma^2}
$$

が $+\infty$ へ向かいます。被積分関数は0へ収束せず、積分は発散します。

##### 本番答案

$x=e^y$ の逆変換は $y=\log x$、$|dy/dx|=1/x$ なので $x>0$ で

$$
f_X(x)=\frac1{x\sigma\sqrt{2\pi}}
e^{-(\log x-\mu)^2/(2\sigma^2)}.
$$

また

$$
E[X^r]=E[e^{rY}]
=e^{r\mu+r^2\sigma^2/2}.
$$

従って

$$
E[X]=e^{\mu+\sigma^2/2},
\quad
E[X^2]=e^{2\mu+2\sigma^2},
$$

$$
\operatorname{Var}(X)
=e^{2\mu+\sigma^2}(e^{\sigma^2}-1).
$$

中央値 $m$ は

$$
\Phi\left(\frac{\log m-\mu}{\sigma}\right)=1/2=\Phi(0)
$$

より $m=e^\mu$。$t>0$ では指数部 $te^y-(y-\mu)^2/(2\sigma^2)\to\infty$ となるため $E[e^{tX}]$ は発散する。

##### 採点基準と選択判断

- 確率密度関数: 7点
- 一般モーメント: 5点
- 平均・分散: 5点
- 中央値: 3点
- 発散: 5点

25分では発散積分と指数部の比較を必ず残します。

<!-- solution-end -->

### P3C-C04 ワイブル寿命

- level: C
- minutes: 25
- topics: ワイブル分布, 信頼性
- techniques: SURVIVAL-1, TRANSFORM-1
- calculation_load: medium

$X\sim\operatorname{Weibull}(c,\eta)$、$c,\eta>0$ とする。

1. 累積分布関数と生存関数を求めよ。
2. ハザードを求めよ。
3. ハザードの増減を $c$ で分類せよ。
4. $u$ 分位点（$0<u<1$）を求めよ。
5. $E[X^r]$ を求め、その存在条件を示せ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)4分、(2)4分、(3)4分、(4)4分、(5)6分。

##### 詳細解答

**(1) 累積分布関数と生存関数**

$x<0$ では $F(x)=0$, $S(x)=1$ です。$x\ge0$ では4.2と同じ置換から

$$
S(x)=e^{-(x/\eta)^c},
$$

したがって

$$
F(x)=1-e^{-(x/\eta)^c}.
$$

**(2) ハザード**

$x>0$ で

$$
\begin{aligned}
h(x)
&=\frac{f(x)}{S(x)}\\
&=\frac c\eta\left(\frac x\eta\right)^{c-1}.
\end{aligned}
$$

**(3) 増減**

$x^{c-1}$ の指数を見ると、$c>1$ で増加、$c=1$ で一定、$0<c<1$ で減少です。

**(4) $u$ 分位点**

$u$ 分位点を $q_u$ とすると

$$
F(q_u)=u.
$$

したがって

$$
1-e^{-(q_u/\eta)^c}=u,
$$

$$
e^{-(q_u/\eta)^c}=1-u.
$$

両辺の対数を取ると

$$
-\left(\frac{q_u}{\eta}\right)^c
=\log(1-u),
$$

したがって

$$
\left(\frac{q_u}{\eta}\right)^c
=-\log(1-u).
$$

$q_u>0$ なので

$$
\boxed{
q_u=\eta\{-\log(1-u)\}^{1/c}
}.
$$

**(5) 一般のモーメント**

$$
z=\left(\frac x\eta\right)^c
$$

と置くと

$$
f_X(x)dx=e^{-z}dz,
\qquad
x=\eta z^{1/c}.
$$

よって

$$
\begin{aligned}
E[X^r]
&=\int_0^\infty
\eta^rz^{r/c}e^{-z}dz\\
&=\eta^r\Gamma\left(1+\frac rc\right).
\end{aligned}
$$

原点近傍で $z^{r/c}$ が積分可能である必要があり、

$$
\int_0^1z^{r/c}dz<\infty
\Longleftrightarrow
\frac rc>-1
\Longleftrightarrow
r>-c.
$$

##### 本番答案

$x<0$ では $F(x)=0$, $S(x)=1$。$x\ge0$ では

$$
F(x)=1-e^{-(x/\eta)^c},
\qquad
S(x)=e^{-(x/\eta)^c}.
$$

$x>0$ で $h(x)=(c/\eta)(x/\eta)^{c-1}$。従って $c>1$ で増加、$c=1$ で一定、$0<c<1$ で減少。

分位点は

$$
1-e^{-(q_u/\eta)^c}=u
$$

から

$$
q_u=\eta\{-\log(1-u)\}^{1/c}.
$$

また $z=(x/\eta)^c$ と置けば

$$
E[X^r]=\eta^r\int_0^\infty z^{r/c}e^{-z}dz
=\eta^r\Gamma(1+r/c),
$$

存在条件は $r>-c$。

##### 採点基準と選択判断

- 累積分布関数・生存関数: 5点
- ハザード: 5点
- 増減: 4点
- 分位点: 4点
- モーメントと存在条件: 7点

<!-- solution-end -->

### P3C-C05 分布選択総合

- level: C
- minutes: 27
- topics: 主要な連続分布
- techniques: SUPPORT-1, ANSWER-1
- calculation_load: medium

次の生成機構に対応する分布名と母数を示し、台と、平均が存在する場合は平均も書け。本問では、本章3節・4節ですでに導出した平均の結果を引用してよい。ただし母数の対応を明記すること。

1. 区間 $(a,b)$ から一様に選ぶ値。
2. 平均 $\mu$、分散 $\sigma^2$ の対称な正規誤差。
3. 率 $\lambda$ のポアソン過程の次の到着までの時間。
4. 同じ率 $\lambda$ の独立な指数待ち時間 $r$ 個の和。
5. 区間 $(0,1)$ 上で確率密度関数が $x^{\alpha-1}(1-x)^{\beta-1}$ に比例する割合。
6. 独立な標準正規変数 $Z_1,Z_2$ の比 $Z_1/Z_2$。
7. 対数が $N(\mu,\sigma^2)$ となる正値量。
8. 生存関数が $\exp\{-(x/\eta)^c\}$ の寿命。
9. 累積分布関数が $[1+e^{-(x-\mu)/s}]^{-1}$ の実数値変数。

<!-- solution-start -->

#### 解答

##### 詳細解答

本問は分布の生成機構を識別し、すでに導出済みの平均へ母数を対応させる問題です。

1. 一様分布 $\operatorname{Unif}(a,b)$。台 $(a,b)$。3.1より平均 $(a+b)/2$。
2. 正規分布 $N(\mu,\sigma^2)$。台 $\mathbb R$。第1母数が平均なので $\mu$。
3. 指数分布 $\operatorname{Exp}(\lambda)$。台 $(0,\infty)$。3.3より平均 $1/\lambda$。
4. 共通率のガンマ再生性から $\operatorname{Gamma}(r,\lambda)$（形状 $r$、率 $\lambda$）。台 $(0,\infty)$。3.3で $\alpha=r$, $\beta=\lambda$ として平均 $r/\lambda$。
5. ベータ分布 $\operatorname{Beta}(\alpha,\beta)$。台 $(0,1)$。3.4より平均 $\alpha/(\alpha+\beta)$。
6. 標準コーシー分布 $\operatorname{Cauchy}(0,1)$。台 $\mathbb R$。3.5より平均は存在しない。
7. 対数正規分布 $\operatorname{Lognormal}(\mu,\sigma^2)$。台 $(0,\infty)$。3.6より平均 $e^{\mu+\sigma^2/2}$。
8. ワイブル分布 $\operatorname{Weibull}(c,\eta)$。台 $(0,\infty)$。4.2で $r=1$ として平均 $\eta\Gamma(1+1/c)$。
9. ロジスティック分布 $\operatorname{Logistic}(\mu,s)$。台 $\mathbb R$。Level Dの導出または対称性と積分から平均 $\mu$。

##### 本番答案

1. $\operatorname{Unif}(a,b)$、$(a,b)$、3.1より平均 $(a+b)/2$。
2. $N(\mu,\sigma^2)$、$\mathbb R$、平均 $\mu$。
3. $\operatorname{Exp}(\lambda)$、$(0,\infty)$、3.3より平均 $1/\lambda$。
4. $\operatorname{Gamma}(r,\lambda)$、$(0,\infty)$、3.3に $\alpha=r$, $\beta=\lambda$ を入れて平均 $r/\lambda$。
5. $\operatorname{Beta}(\alpha,\beta)$、$(0,1)$、3.4より平均 $\alpha/(\alpha+\beta)$。
6. $\operatorname{Cauchy}(0,1)$、$\mathbb R$、平均なし。
7. $\operatorname{Lognormal}(\mu,\sigma^2)$、$(0,\infty)$、3.6より平均 $e^{\mu+\sigma^2/2}$。
8. $\operatorname{Weibull}(c,\eta)$、$(0,\infty)$、4.2より平均 $\eta\Gamma(1+1/c)$。
9. $\operatorname{Logistic}(\mu,s)$、$\mathbb R$、平均 $\mu$。

##### 採点基準と選択判断

各項の分布名1点・母数1点で18点、台と平均の全体整合に7点。コーシー分布の平均不存在とガンマ分布の率表示を優先して確認します。

<!-- solution-end -->

## Level D：発展

### P3C-D01 ロジスティック分布のモーメント母関数

- level: D
- minutes: 40
- topics: ロジスティック分布, ベータ関数, モーメント母関数
- techniques: BETA-1, TRANSFORM-1
- calculation_load: high

$X\sim\operatorname{Logistic}(\mu,s)$ とする。

1. $U=F(X)$ が $\operatorname{Unif}(0,1)$ に従うことを示せ。
2. $X=\mu+s\log\{U/(1-U)\}$ を示せ。
3. $|t|<1/s$ でモーメント母関数をベータ積分として求めよ。
4. $\Gamma(1+z)\Gamma(1-z)=\pi z/\sin(\pi z)$ を用いて整理せよ。
5. 対称性と $t=0$ 周りの展開から平均・分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$F$ は連続かつ狭義増加なので、$0<u<1$ に対し

$$
\begin{aligned}
P(F(X)\le u)
&=P(X\le F^{-1}(u))\\
&=F(F^{-1}(u))\\
&=u.
\end{aligned}
$$

従って

$$
U=F(X)\sim\operatorname{Unif}(0,1).
$$

$u=F(x)$ を解くと、4.4と同様に

$$
x=F^{-1}(u)
=\mu+s\log\frac{u}{1-u}.
$$

よって

$$
X=\mu+s\log\frac U{1-U}.
$$

したがって

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=e^{\mu t}
\int_0^1\left(\frac u{1-u}\right)^{st}du\\
&=e^{\mu t}\int_0^1u^{st}(1-u)^{-st}du\\
&=e^{\mu t}B(1+st,1-st).
\end{aligned}
$$

ベータ積分が両端で収束する条件は

$$
1+st>0,
\qquad
1-st>0,
$$

すなわち

$$
|t|<\frac1s.
$$

ガンマ関数の恒等式を使うと

$$
\begin{aligned}
M_X(t)
&=e^{\mu t}\Gamma(1+st)\Gamma(1-st)\\
&=e^{\mu t}\frac{\pi st}{\sin(\pi st)}.
\end{aligned}
$$

さらに

$$
\frac z{\sin z}
=1+\frac{z^2}{6}+O(z^4)
$$

より

$$
\frac{\pi st}{\sin(\pi st)}
=1+\frac{\pi^2s^2t^2}{6}+O(t^4),
$$

また

$$
e^{\mu t}
=1+\mu t+\frac{\mu^2t^2}{2}+O(t^3).
$$

両者を掛けて2次まで取ると

$$
M_X(t)
=1+\mu t
+\left(\frac{\mu^2}{2}+\frac{\pi^2s^2}{6}\right)t^2
+O(t^3).
$$

モーメント母関数の展開

$$
M_X(t)
=1+E[X]t+\frac{E[X^2]}2t^2+\cdots
$$

と係数比較して

$$
E[X]=\mu,
$$

$$
E[X^2]
=\mu^2+\frac{\pi^2s^2}{3}.
$$

したがって

$$
\operatorname{Var}(X)
=E[X^2]-E[X]^2
=\frac{\pi^2s^2}{3}.
$$

##### 本番答案

$F$ の連続狭義単調性から $U=F(X)\sim\operatorname{Unif}(0,1)$。逆関数は

$$
X=\mu+s\log\frac U{1-U}.
$$

従って $|t|<1/s$ で

$$
\begin{aligned}
M_X(t)
&=e^{\mu t}\int_0^1u^{st}(1-u)^{-st}du\\
&=e^{\mu t}B(1+st,1-st)\\
&=e^{\mu t}\frac{\pi st}{\sin(\pi st)}.
\end{aligned}
$$

$e^{\mu t}=1+\mu t+\mu^2t^2/2+O(t^3)$、$\pi st/\sin(\pi st)=1+\pi^2s^2t^2/6+O(t^4)$ より

$$
E[X]=\mu,
\quad
E[X^2]=\mu^2+\pi^2s^2/3,
$$

したがって $\operatorname{Var}(X)=\pi^2s^2/3$。

##### 採点基準と選択判断

- 一様化: 6点
- 逆変換: 5点
- モーメント母関数の積分: 8点
- 収束条件: 5点
- ガンマ関数の恒等式: 5点
- 展開と平均・分散: 6点

3分で確率積分変換が見えなければ後回しにします。

<!-- solution-end -->

---

# 8. 30分ドリル

## P3C-DRILL-01 ワイブル寿命・変換・最尤推定

- 制限時間: 30分
- level: C

部品寿命 $X$ は、形状2、未知尺度 $\eta>0$ のワイブル分布に従う。すなわち

$$
P(X>x)=\exp\{-(x/\eta)^2\},
\qquad x\ge0,
$$

であり、$x<0$ では $P(X>x)=1$ である。独立同分布標本を $X_1,\ldots,X_n$ とする。

観測値の同時確率密度関数を $\eta$ の関数とみたものを尤度といい、尤度を $\eta>0$ で最大にする値を最尤推定値という。推定量 $T$ が $E[T]=\eta^2$ を満たすとき $\eta^2$ の不偏推定量という。また任意の $\varepsilon>0$ について

$$
P(|T_n-\eta^2|\ge\varepsilon)\to0
$$

となることを、$T_n$ が $\eta^2$ へ確率収束するという。

任意の有限分散な確率変数 $T$ と $\varepsilon>0$ に対するチェビシェフの不等式

$$
P(|T-E[T]|\ge\varepsilon)
\le\frac{\operatorname{Var}(T)}{\varepsilon^2}
$$

を用いてよい。

1. $X$ の確率密度関数、生存関数、ハザードを求めよ。（20点）
2. $P(X>\eta)$ と $P(X>\eta\mid X>\eta/2)$ を求めよ。（15点）
3. $Y=(X/\eta)^2$ の分布を求め、$E[X^2]$ と $\operatorname{Var}(X^2)$ を求めよ。（20点）
4. $\eta$ の尤度を台の条件とともに書き、$\widehat{\eta^2}=n^{-1}\sum_iX_i^2$ が $\eta^2$ の最尤推定量であることを示せ。（25点）
5. $\widehat{\eta^2}$ の不偏性と分散を求め、チェビシェフの不等式で $\eta^2$ へ確率収束することを示せ。（20点）

<!-- solution-start -->

### 解答

#### 詳細解答

**(1) 確率密度関数・生存関数・ハザード**

$x>0$ では生存関数

$$
S_\eta(x)=e^{-(x/\eta)^2}
$$

を微分して

$$
\begin{aligned}
f_\eta(x)
&=-\frac d{dx}S_\eta(x)\\
&=-e^{-(x/\eta)^2}
\left(-\frac{2x}{\eta^2}\right)\\
&=\frac{2x}{\eta^2}e^{-(x/\eta)^2}.
\end{aligned}
$$

$x\le0$ では確率密度関数は0です。生存関数は全実数上で

$$
S_\eta(x)=
\begin{cases}
1,&x\le0,\\
e^{-(x/\eta)^2},&x>0.
\end{cases}
$$

したがって $x>0$ で

$$
\begin{aligned}
h_\eta(x)
&=\frac{f_\eta(x)}{S_\eta(x)}\\
&=\frac{2x}{\eta^2}.
\end{aligned}
$$

**(2) 尾確率**

$$
P(X>\eta)=S_\eta(\eta)=e^{-1}.
$$

また

$$
\begin{aligned}
P(X>\eta\mid X>\eta/2)
&=\frac{S_\eta(\eta)}{S_\eta(\eta/2)}\\
&=\frac{e^{-1}}{e^{-1/4}}\\
&=e^{-3/4}.
\end{aligned}
$$

**(3) 変換とモーメント**

$y\ge0$ で

$$
\begin{aligned}
P(Y\le y)
&=P\left((X/\eta)^2\le y\right)\\
&=P(X\le\eta\sqrt y)\\
&=1-e^{-y}.
\end{aligned}
$$

よって

$$
Y\sim\operatorname{Exp}(1).
$$

指数分布の密度 $e^{-y}$ から

$$
E[Y]
=\int_0^\infty ye^{-y}dy
=\Gamma(2)
=1,
$$

$$
E[Y^2]
=\int_0^\infty y^2e^{-y}dy
=\Gamma(3)
=2.
$$

したがって

$$
\operatorname{Var}(Y)
=2-1^2
=1.
$$

$X^2=\eta^2Y$ なので

$$
E[X^2]
=\eta^2E[Y]
=\eta^2,
$$

$$
\operatorname{Var}(X^2)
=\eta^4\operatorname{Var}(Y)
=\eta^4.
$$

**(4) 最尤推定**

観測値 $x_i>0$ に対する尤度は

$$
L(\eta)
=\prod_{i=1}^n
\frac{2x_i}{\eta^2}
\exp\left(-\frac{x_i^2}{\eta^2}\right),
\qquad \eta>0.
$$

$Q=\sum_i x_i^2$ と置くと

$$
\begin{aligned}
\ell(\eta)
&=\log L(\eta)\\
&=\sum_i\log(2x_i)-2n\log\eta-\frac Q{\eta^2}.
\end{aligned}
$$

$\eta$ に依存しない第1項を $C$ と書けば

$$
\ell(\eta)
=C-2n\log\eta-\frac Q{\eta^2}.
$$

微分すると

$$
\begin{aligned}
\ell'(\eta)
&=-\frac{2n}{\eta}+\frac{2Q}{\eta^3}\\
&=\frac{2(Q-n\eta^2)}{\eta^3}.
\end{aligned}
$$

$\eta^2<Q/n$ で正、$\eta^2>Q/n$ で負なので一意な最大点は

$$
\widehat{\eta^2}
=\frac Qn
=\frac1n\sum_{i=1}^nX_i^2.
$$

**(5) 不偏性・分散・一致性**

(3)より $E[X_i^2]=\eta^2$, $\operatorname{Var}(X_i^2)=\eta^4$ です。したがって

$$
\begin{aligned}
E[\widehat{\eta^2}]
&=\frac1n\sum_{i=1}^nE[X_i^2]\\
&=\eta^2.
\end{aligned}
$$

独立性から

$$
\begin{aligned}
\operatorname{Var}(\widehat{\eta^2})
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i^2)\\
&=\frac1{n^2}\cdot n\eta^4\\
&=\frac{\eta^4}{n}.
\end{aligned}
$$

従って任意の $\varepsilon>0$ でチェビシェフの不等式から

$$
\begin{aligned}
P(|\widehat{\eta^2}-\eta^2|\ge\varepsilon)
&\le\frac{\operatorname{Var}(\widehat{\eta^2})}{\varepsilon^2}\\
&=\frac{\eta^4}{n\varepsilon^2}\\
&\longrightarrow0.
\end{aligned}
$$

#### 本番答案

$x>0$ で

$$
f_\eta(x)
=-\frac d{dx}e^{-(x/\eta)^2}
=\frac{2x}{\eta^2}e^{-(x/\eta)^2},
$$

$$
S_\eta(x)=
\begin{cases}
1,&x\le0,\\
e^{-(x/\eta)^2},&x>0,
\end{cases}
\quad
h_\eta(x)=2x/\eta^2.
$$

従って尾確率は $e^{-1}$ と $e^{-3/4}$。$Y=(X/\eta)^2\sim\operatorname{Exp}(1)$ で

$$
E[Y]=1,
\quad E[Y^2]=2,
\quad \operatorname{Var}(Y)=1,
$$

より $E[X^2]=\eta^2$、$\operatorname{Var}(X^2)=\eta^4$。

$Q=\sum x_i^2$ とすると

$$
\ell(\eta)=C-2n\log\eta-Q/\eta^2,
$$

$$
\ell'(\eta)=2(Q-n\eta^2)/\eta^3.
$$

符号変化から $\widehat{\eta^2}=Q/n$ が一意な最尤推定量である。さらに

$$
E[\widehat{\eta^2}]=\eta^2,
\quad
\operatorname{Var}(\widehat{\eta^2})=\eta^4/n,
$$

なので不偏で、チェビシェフの不等式から $\eta^2$ へ確率収束する。

#### 採点基準・時間配分・選択判断

- 確率密度関数・生存関数・ハザード: 20点
- 尾確率: 15点
- 指数変換とモーメント: 20点
- 尤度と最尤推定: 25点
- 不偏性・一致性: 20点

初動3分、(1)4分、(2)3分、(3)5分、(4)8分、(5)4分、見直し3分。15分で $Y\sim\operatorname{Exp}(1)$ まで進めば継続し、25分では対数尤度と $Q/n$、分散 $\eta^4/n$ を優先します。

<!-- solution-end -->

---

# 9. 実過去問演習

問題文は転載せず、公式問題集の年度・科目・大問番号で参照します。

### PAST-P3C-01: MATH-2023-Q3

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 30分
- 現在解く範囲: 指数分布の確率密度関数、モーメント母関数、モーメント、重み付き分布
- 後続章で再挑戦: 尤度と母数推定
- 答案確認: 台、正規化、モーメント母関数が有限となる範囲、微分で得る次数を明記する。

### PAST-P3C-02: MATH-2014-Q2

- 入手先: 統計検定公式問題集［2014〜2015年］
- 制限時間: 30分
- 現在解く範囲: ガンマ分布・ベータ分布の正規化、変数変換、独立性
- 後続章で再挑戦: 標本分布への応用
- 答案確認: ガンマ分布の形状・率規約、逆変換のヤコビアン、像領域を先に固定する。

### PAST-P3C-03: SCI-2019-Q1

- 入手先: 2019年を収録する統計検定1級公式問題集
- 制限時間: 現在20分、E4-02修了後30分
- 現在解く範囲: 生存関数、ハザード、ワイブル変換に関する部分
- 後続章で再挑戦: 平均残存寿命、故障率が増加する分布・減少する分布の信頼性解釈に関する部分
- 答案確認: 確率密度関数・生存関数・ハザードの定義域を分け、変換の像と逆変換のヤコビアンを省略しない。

---

## 10. 復習チェック

1. ガンマ分布の第2母数が率か尺度かを確率密度関数から確認できる。
2. 正規分布の第2引数が分散であることを確認してから標準化できる。
3. コーシー分布で「対称だから平均0」と書かない。
4. 対数正規分布で $E[X^r]$ から $E[X]$, $E[X^2]$, $\operatorname{Var}(X)$ を途中式付きで再現できる。
5. 対数正規分布の中央値・分位点を $F_X(x)=\Phi((\log x-\mu)/\sigma)$ から解ける。
6. ワイブル分布の中央値・一般分位点を $F(q)=u$ または $S(q)=1-u$ から解ける。
7. ロジスティック分布の中央値・四分位点を累積分布関数の逆算から求められる。
8. ガンマ積分・ベータ積分では指数を読み替えて既知積分へ戻せる。
9. モーメント母関数は式だけでなく有限となる $t$ の範囲を書ける。
10. 変数変換では台、単調性、変換の係数を省略しない。
11. 「シラバスに載っている概念」と「閉形式を無導出で公式使用できること」を区別できる。
