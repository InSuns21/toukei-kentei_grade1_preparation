# Core 02 Bernoulliモデルで尤度比検定・Wald・Scoreを比較する

- 旧No.: 70
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X_1,\ldots,X_n$ は独立同分布で Bernoulli 分布に従い、

$$
P_p(X_i=x)=p^x(1-p)^{1-x},
\qquad x\in\{0,1\},\quad 0<p<1
$$

とする。$T=\sum_{i=1}^nX_i$ とおき、$0<p_0<1$ として

$$
H_0:p=p_0,
\qquad H_1:p\ne p_0
$$

を考える。

1. $p$ の最尤推定量 $\widehat p$ を求めよ。
2. 尤度比

$$
\Lambda
=\frac{L(p_0)}{L(\widehat p)}
$$

から、尤度比統計量 $G^2=-2\log\Lambda$ を $\widehat p,p_0$ で表せ。
3. Wald統計量

$$
W=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)}
$$

が $H_0$ の下で漸近的に $\chi_1^2$ に従うことを示せ。
4. スコア関数とフィッシャー情報量を対数尤度から導き、Score統計量を求めよ。
5. $G^2,W,S$ が $H_0$ の下で漸近同値、すなわち互いの差が確率収束で0になることを示せ。

**注**: $G^2$ の対数は数値化しなくてよい。

## 詳細解答

### 1. 最尤推定量

観測値 $x_1,\ldots,x_n$ を固定して $p$ の関数として見ると、独立性より尤度は

$$
\begin{aligned}
L(p)
&=\prod_{i=1}^n p^{x_i}(1-p)^{1-x_i}\\
&=p^{\sum x_i}(1-p)^{\sum(1-x_i)}\\
&=p^T(1-p)^{n-T}.
\end{aligned}
$$

したがって対数尤度は

$$
\ell(p)=T\log p+(n-T)\log(1-p).
$$

$0<T<n$ では

$$
\ell'(p)
=\frac{T}{p}-\frac{n-T}{1-p}
=\frac{T-np}{p(1-p)}.
$$

よって $\ell'(p)=0$ は

$$
T-np=0
$$

と同値であり、

$$
\widehat p=\frac{T}{n}=\overline X.
$$

さらに

$$
\ell''(p)
=-\frac{T}{p^2}-\frac{n-T}{(1-p)^2}<0
$$

なので内部解は最大点である。$T=0$ または $T=n$ では最大値は境界 $0$ または $1$ で取られるから、閉じた母数空間 $[0,1]$ では常に

$$
\boxed{\widehat p=T/n=\overline X}.
$$

### 2. 尤度比統計量

尤度比は「帰無仮説で許される最大尤度」と「制約なしの最大尤度」の比である。本問の帰無仮説は $p=p_0$ という1点なので

$$
\Lambda
=\frac{L(p_0)}{L(\widehat p)}.
$$

上で求めた尤度を代入すると

$$
L(p_0)=p_0^T(1-p_0)^{n-T},
$$

$$
L(\widehat p)=\widehat p^T(1-\widehat p)^{n-T}.
$$

したがって

$$
\log\Lambda
=T\log\frac{p_0}{\widehat p}
+(n-T)\log\frac{1-p_0}{1-\widehat p}.
$$

ここで $T=n\widehat p$、$n-T=n(1-\widehat p)$ を使うと

$$
\log\Lambda
=n\widehat p\log\frac{p_0}{\widehat p}
+n(1-\widehat p)\log\frac{1-p_0}{1-\widehat p}.
$$

両辺に $-2$ を掛けて

$$
\boxed{
G^2
=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)\log\frac{1-\widehat p}{1-p_0}
\right]
}.
$$

$\widehat p=0$ または $1$ の場合は、$0\log0=0$ とする連続延長で解釈する。

### 3. Wald統計量

Wald統計量は、推定量の「帰無値からのずれ」を推定標準誤差で標準化して二乗したものである。

$H_0$ の下では

$$
E[X_i]=p_0,
\qquad
\operatorname{Var}(X_i)=p_0(1-p_0).
$$

$0<p_0<1$ なので分散は有限かつ正である。独立同分布でもあるから **Lindeberg–Lévy の中心極限定理**を適用でき、

$$
\frac{\sqrt n(\widehat p-p_0)}{\sqrt{p_0(1-p_0)}}
\xrightarrow{d}N(0,1).
$$

一方、弱大数の法則より

$$
\widehat p\xrightarrow{p}p_0.
$$

関数 $g(p)=p(1-p)$ は $p_0$ で連続なので、連続写像定理から

$$
\widehat p(1-\widehat p)
\xrightarrow{p}p_0(1-p_0)>0.
$$

よって Slutsky の定理により、分母の $p_0(1-p_0)$ をその一致推定量 $\widehat p(1-\widehat p)$ に置き換えても極限分布は変わらず、

$$
\frac{\sqrt n(\widehat p-p_0)}{\sqrt{\widehat p(1-\widehat p)}}
\xrightarrow{d}N(0,1).
$$

標準正規変数の二乗は自由度1のカイ二乗分布に従うので

$$
\boxed{W\xrightarrow{d}\chi_1^2}.
$$

有限標本で $\widehat p=0$ または $1$ なら Wald 式の分母が0になる。ただし $H_0$ でその確率は

$$
P(\widehat p=0)+P(\widehat p=1)
=(1-p_0)^n+p_0^n\to0
$$

なので、この境界事象は上の漸近結果には影響しない。

### 4. Score統計量

Score統計量では、分散を制約なし推定値 $\widehat p$ で評価せず、**帰無値 $p_0$ で評価したスコア**を使う。

対数尤度を微分すると

$$
U(p)
=\ell'(p)
=\frac{T}{p}-\frac{n-T}{1-p}.
$$

通分すれば

$$
U(p)
=\frac{T(1-p)-(n-T)p}{p(1-p)}
=\frac{T-np}{p(1-p)}.
$$

次に2階微分は

$$
\ell''(p)
=-\frac{T}{p^2}-\frac{n-T}{(1-p)^2}.
$$

$T=\sum X_i$ なので $E_p[T]=np$。したがってフィッシャー情報量は

$$
\begin{aligned}
I_n(p)
&=-E_p[\ell''(p)]\\
&=\frac{np}{p^2}
+\frac{n-np}{(1-p)^2}\\
&=\frac{n}{p}+\frac{n}{1-p}\\
&=\boxed{\frac{n}{p(1-p)}}.
\end{aligned}
$$

帰無値では

$$
U(p_0)
=\frac{T-np_0}{p_0(1-p_0)}
=\frac{n(\widehat p-p_0)}{p_0(1-p_0)}.
$$

したがって Score統計量は

$$
\begin{aligned}
S
&=\frac{U(p_0)^2}{I_n(p_0)}\\
&=\frac{n^2(\widehat p-p_0)^2}{p_0^2(1-p_0)^2}
\frac{p_0(1-p_0)}{n}\\
&=\boxed{\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}}.
\end{aligned}
$$

第3問の中心極限定理で既に

$$
\frac{\sqrt n(\widehat p-p_0)}{\sqrt{p_0(1-p_0)}}
\xrightarrow{d}N(0,1)
$$

を得ているので、これを二乗して

$$
S\xrightarrow{d}\chi_1^2.
$$

### 5. 三者の漸近同値

まず中心極限定理から

$$
\sqrt n(\widehat p-p_0)=O_p(1)
$$

である。したがって

$$
\delta_n=\widehat p-p_0
$$

と置けば

$$
\delta_n=O_p(n^{-1/2}).
$$

#### 尤度比統計量とScore統計量

第2問の角括弧を

$$
h(p)
=p\log\frac p{p_0}
+(1-p)\log\frac{1-p}{1-p_0}
$$

と置く。微分すると

$$
h'(p)
=\log\frac p{p_0}
-\log\frac{1-p}{1-p_0},
$$

したがって

$$
h(p_0)=0,
\qquad
h'(p_0)=0.
$$

さらに

$$
h''(p)
=\frac1p+\frac1{1-p}
=\frac1{p(1-p)},
$$

よって

$$
h''(p_0)=\frac1{p_0(1-p_0)}.
$$

$p_0$ は $(0,1)$ の内部点なので、その近傍では3階微分も有限である。$p_0$ のまわりで Taylor 展開すると

$$
h(p_0+\delta_n)
=\frac{\delta_n^2}{2p_0(1-p_0)}
+O_p(\delta_n^3).
$$

$G^2=2nh(\widehat p)$ だから

$$
G^2
=\frac{n\delta_n^2}{p_0(1-p_0)}
+O_p(n\delta_n^3).
$$

ここで $\delta_n=O_p(n^{-1/2})$ より

$$
n\delta_n^3=O_p(n^{-1/2})=o_p(1).
$$

したがって

$$
\boxed{G^2=S+o_p(1)}.
$$

#### Wald統計量とScore統計量

分母を直接展開すると

$$
\begin{aligned}
\widehat p(1-\widehat p)
&=(p_0+\delta_n)(1-p_0-\delta_n)\\
&=p_0(1-p_0)+(1-2p_0)\delta_n-\delta_n^2.
\end{aligned}
$$

$\delta_n=o_p(1)$ なので

$$
\widehat p(1-\widehat p)
=p_0(1-p_0)+o_p(1).
$$

また

$$
S
=\frac{n\delta_n^2}{p_0(1-p_0)}
=O_p(1).
$$

そこで

$$
\begin{aligned}
W-S
&=n\delta_n^2
\left[
\frac1{\widehat p(1-\widehat p)}
-\frac1{p_0(1-p_0)}
\right].
\end{aligned}
$$

角括弧は $o_p(1)$、その前の $n\delta_n^2$ は $O_p(1)$ だから

$$
\boxed{W=S+o_p(1)}.
$$

以上より

$$
G^2-W=o_p(1),
\qquad
G^2-S=o_p(1),
\qquad
W-S=o_p(1).
$$

なお尤度比統計量については **Wilksの定理**からも極限分布を確認できる。必要な条件のうち本問で重要なのは、真値 $p_0$ が母数空間の内部点であること、モデルが識別可能で滑らかであること、支持 $\{0,1\}$ が $p$ に依存しないこと、情報量

$$
I_1(p_0)=\frac1{p_0(1-p_0)}
$$

が有限かつ正であることであり、$0<p_0<1$ の下ですべて満たされる。したがって

$$
G^2\xrightarrow{d}\chi_1^2.
$$

三者が漸近的に同じになる一方、有限標本では分母をどこで評価するかなどが異なるため、数値は一般に一致しない。

## 本番答案

$T=\sum X_i$ とすると

$$
L(p)=p^T(1-p)^{n-T},
\qquad
\ell'(p)=\frac{T-np}{p(1-p)},
$$

より

$$
\widehat p=T/n.
$$

したがって

$$
G^2
=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)\log\frac{1-\widehat p}{1-p_0}
\right].
$$

$H_0$ の下で中心極限定理と大数の法則を用いると

$$
\frac{\sqrt n(\widehat p-p_0)}{\sqrt{p_0(1-p_0)}}
\xrightarrow{d}N(0,1),
\qquad
\widehat p\xrightarrow{p}p_0.
$$

よって Slutsky の定理から

$$
W
=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)}
\xrightarrow{d}\chi_1^2.
$$

また

$$
U(p)=\frac{T-np}{p(1-p)},
\qquad
I_n(p)=\frac{n}{p(1-p)},
$$

なので

$$
S
=\frac{U(p_0)^2}{I_n(p_0)}
=\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}
\xrightarrow{d}\chi_1^2.
$$

$\delta_n=\widehat p-p_0=O_p(n^{-1/2})$ とおくと、尤度比統計量の Taylor 展開から

$$
G^2=S+o_p(1),
$$

また

$$
\widehat p(1-\widehat p)
=p_0(1-p_0)+o_p(1)
$$

より

$$
W=S+o_p(1).
$$

したがって三者は $H_0$ の下で漸近同値である。

## 採点基準

- 最尤推定量（尤度・微分・最大点の確認）: 3点
- 尤度比統計量（尤度比の定義から導出）: 4点
- Wald（中心極限定理・大数の法則・Slutskyの条件確認）: 4点
- Score（スコア関数・フィッシャー情報量から導出）: 4点
- 漸近同値（Taylor展開の次数と $O_p/o_p$ を含む）: 5点
