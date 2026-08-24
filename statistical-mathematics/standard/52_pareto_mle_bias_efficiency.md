# Standard 16 Pareto MLE・有限標本バイアス・効率

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

$\alpha>0$ とする。$X_1,\ldots,X_n$ はi.i.d.。

1. $\alpha$ のMLEを求めよ。
2. $Y_i=\log(X_i/x_m)$ の分布を求めよ。
3. MLEの期待値と不偏化を求めよ。
4. MLEの漸近分散を求め、Fisher情報量と比較せよ。

## 詳細解答

対数尤度は

$$
\ell(\alpha)=n\log\alpha+n\alpha\log x_m-(\alpha+1)\sum\log X_i.
$$

従って

$$
\widehat\alpha=\frac{n}{\sum_i\log(X_i/x_m)}.
$$

変換すると $Y_i\sim\operatorname{Exp}(\alpha)$。$S=\sum Y_i\sim\operatorname{Gamma}(n,\text{rate }\alpha)$ なので $n>1$ で

$$
E[1/S]=\frac{\alpha}{n-1},
$$

従って

$$
E[\widehat\alpha]=\frac{n}{n-1}\alpha.
$$

不偏推定量は

$$
\widetilde\alpha=\frac{n-1}{S}.
$$

1標本Fisher情報量は $1/\alpha^2$ なので、MLEの漸近分散は

$$
\frac{\alpha^2}{n},
$$

Cramér–Rao型の漸近下限に一致する。

## 本番答案

$Y_i=\log(X_i/x_m)\sim Exp(\alpha)$ とすれば

$$
\widehat\alpha=\frac n{\sum Y_i}.
$$

$\sum Y_i\sim Gamma(n,\text{rate }\alpha)$ より $E\widehat\alpha=n\alpha/(n-1)$、従って $(n-1)/\sum Y_i$ は不偏。Fisher情報は $n/\alpha^2$ なので MLEの漸近分散は $\alpha^2/n$。

## 採点基準

- MLE: 6点
- 指数分布への変換: 4点
- バイアス・不偏化: 6点
- Fisher情報・漸近効率: 4点
