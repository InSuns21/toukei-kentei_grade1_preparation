# Standard 16 パレート 最尤推定量・有限標本バイアス・効率

- 旧No.: 52
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

既知の $x_m>0$ に対し

$$
f(x;\alpha)=\alpha x_m^\alpha x^{-(\alpha+1)},
\qquad x\ge x_m,
$$

$\alpha>0$ とする。$X_1,\ldots,X_n$ は独立同分布とする。

1. $\alpha$ の最尤推定量を求めよ。
2. $Y_i=\log(X_i/x_m)$ の分布を求めよ。
3. 最尤推定量の期待値と不偏化を求めよ。
4. 最尤推定量の漸近分散を求め、Fisher情報量と比較せよ。

## 詳細解答

### 1. 尤度から最尤推定量を求める

観測値 $x_1,\ldots,x_n$ はすべて $x_i\ge x_m$ とする。独立性より尤度は

$$
\begin{aligned}
L(\alpha)
&=\prod_{i=1}^n
\alpha x_m^\alpha x_i^{-(\alpha+1)}\\
&=\alpha^n x_m^{n\alpha}
\prod_{i=1}^n x_i^{-(\alpha+1)}.
\end{aligned}
$$

対数尤度は

$$
\ell(\alpha)
=n\log\alpha+n\alpha\log x_m
-(\alpha+1)\sum_{i=1}^n\log X_i.
$$

微分すると

$$
\begin{aligned}
\ell'(\alpha)
&=\frac n\alpha+n\log x_m-
\sum_{i=1}^n\log X_i\\
&=\frac n\alpha-
\sum_{i=1}^n\log\frac{X_i}{x_m}.
\end{aligned}
$$

$\ell'(\alpha)=0$ より

$$
\boxed{
\widehat\alpha
=\frac{n}{\displaystyle\sum_{i=1}^n
\log(X_i/x_m)}
}.
$$

さらに

$$
\ell''(\alpha)=-\frac n{\alpha^2}<0
$$

なので、この停留点は最大点である。

### 2. $Y_i=\log(X_i/x_m)$ の分布

$Y_i\ge0$ である。$y\ge0$ に対して

$$
\begin{aligned}
P(Y_i>y)
&=P\left(\log\frac{X_i}{x_m}>y\right)\\
&=P(X_i>x_me^y).
\end{aligned}
$$

パレート分布の上側確率は

$$
P(X_i>x)=\left(\frac{x_m}{x}\right)^\alpha,
\qquad x\ge x_m.
$$

したがって

$$
P(Y_i>y)
=\left(\frac{x_m}{x_me^y}\right)^\alpha
=e^{-\alpha y}.
$$

これは率母数 $\alpha$ の指数分布の上側確率なので

$$
\boxed{Y_i\sim\operatorname{Exp}(\alpha)}.
$$

よって

$$
S=\sum_{i=1}^nY_i
\sim\operatorname{Gamma}(n,\text{rate }\alpha).
$$

### 3. 有限標本バイアスと不偏化

第1問の最尤推定量は

$$
\widehat\alpha=\frac nS.
$$

$S\sim\operatorname{Gamma}(n,\text{rate }\alpha)$ の密度は

$$
f_S(s)=\frac{\alpha^n}{\Gamma(n)}s^{n-1}e^{-\alpha s},
\qquad s>0.
$$

$n>1$ のとき

$$
\begin{aligned}
E\left[\frac1S\right]
&=\frac{\alpha^n}{\Gamma(n)}
\int_0^\infty s^{n-2}e^{-\alpha s}\,ds\\
&=\frac{\alpha^n}{\Gamma(n)}
\frac{\Gamma(n-1)}{\alpha^{n-1}}\\
&=\frac{\alpha}{n-1},
\end{aligned}
$$

ここで $\Gamma(n)=(n-1)\Gamma(n-1)$ を用いた。

したがって

$$
E[\widehat\alpha]
=nE\left[\frac1S\right]
=\boxed{\frac n{n-1}\alpha}.
$$

最尤推定量は有限標本では上方に偏っている。係数 $(n-1)/n$ を掛ければ

$$
\boxed{
\widetilde\alpha
=\frac{n-1}{S}
}
$$

となり

$$
E[\widetilde\alpha]=\alpha
$$

で不偏である。

### 4. Fisher情報量と漸近分散

1標本の対数尤度は

$$
\ell_1(\alpha)
=\log\alpha+\alpha\log x_m-(\alpha+1)\log X.
$$

2階微分は

$$
\ell_1''(\alpha)=-\frac1{\alpha^2}.
$$

よって1標本当たりの Fisher 情報量は

$$
I_1(\alpha)
=-E[\ell_1''(\alpha)]
=\boxed{\frac1{\alpha^2}}.
$$

$n$ 標本では

$$
I_n(\alpha)=\frac n{\alpha^2}.
$$

このモデルは $x_m$ が既知で支持集合が $\alpha$ に依存せず、$\alpha>0$ の内部点では通常の正則条件を満たす。したがって最尤推定量の漸近正規性から

$$
\sqrt n(\widehat\alpha-\alpha)
\xrightarrow{d}N(0,\alpha^2).
$$

従って

$$
\boxed{
\operatorname{Avar}(\widehat\alpha)
=\frac{\alpha^2}{n}
=I_n(\alpha)^{-1}
}.
$$

有限標本ではバイアスがあるが、そのバイアスは

$$
E[\widehat\alpha]-\alpha
=\frac{\alpha}{n-1}
=O(n^{-1})
$$

であり、標準誤差の $O(n^{-1/2})$ より小さい。このため漸近的にはFisher情報量の逆数に到達する。

## 本番答案

$$
\ell(\alpha)
=n\log\alpha+n\alpha\log x_m-(\alpha+1)\sum_i\log X_i.
$$

$$
\ell'(\alpha)
=\frac n\alpha-
\sum_i\log(X_i/x_m)=0
$$

より

$$
\widehat\alpha
=\frac n{\sum_i\log(X_i/x_m)}.
$$

$Y_i=\log(X_i/x_m)$ について

$$
P(Y_i>y)=P(X_i>x_me^y)=e^{-\alpha y},
$$

したがって $Y_i\sim\operatorname{Exp}(\alpha)$、$S=\sum Y_i\sim\operatorname{Gamma}(n,\text{rate }\alpha)$。

$$
E[S^{-1}]=\frac{\alpha}{n-1}
$$

より

$$
E[\widehat\alpha]=\frac n{n-1}\alpha,
\qquad
\widetilde\alpha=\frac{n-1}{S}
$$

は不偏。

また

$$
I_1(\alpha)=-E[\ell_1''(\alpha)]=\frac1{\alpha^2},
$$

よって

$$
\operatorname{Avar}(\widehat\alpha)=\frac{\alpha^2}{n}=I_n(\alpha)^{-1}.
$$

## 採点基準

- 尤度・微分・最尤推定量: 5点
- 指数分布への変換を上側確率から導出: 4点
- $E[1/S]$ のGamma積分・不偏化: 6点
- Fisher情報量・漸近分散: 5点
