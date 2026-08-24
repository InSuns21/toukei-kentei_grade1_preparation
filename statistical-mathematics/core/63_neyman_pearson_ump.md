# Core 03 Neyman–Pearson・単調尤度比・UMP

- 旧No.: 63
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Exp}(\lambda)$ とする。

$$
H_0:\lambda=\lambda_0,
\qquad H_1:\lambda<\lambda_0
$$

を有意水準$\alpha$で検定したい。$T=\sum_{i=1}^nX_i$ とする。

1. 単純対立 $\lambda=\lambda_1<\lambda_0$ に対するNeyman–Pearson検定の棄却域を求めよ。
2. 尤度比が$T$について単調であることを示せ。
3. $H_1:\lambda<\lambda_0$ 全体に対するUMP検定を構成せよ。
4. $H_0$下で$2\lambda_0T\sim\chi^2_{2n}$を用いて臨界値を表せ。

## 詳細解答

尤度は

$$
L(\lambda)=\lambda^n e^{-\lambda T}.
$$

$\lambda_1<\lambda_0$ に対する尤度比は

$$
\frac{L(\lambda_1)}{L(\lambda_0)}
=\left(\frac{\lambda_1}{\lambda_0}\right)^n
\exp\{(\lambda_0-\lambda_1)T\}.
$$

$\lambda_0-\lambda_1>0$ なので、これは$T$の増加関数。Neyman–Pearson補題より、$T$が大きいときに棄却する。

しかも任意の$\lambda_1<\lambda_0$について同じ向きの棄却域が最強力になるので、単調尤度比の議論から

$$
\boxed{T\ge c_\alpha}
$$

が片側対立全体に対するUMP検定となる。

指数分布の和はGamma分布で

$$
T\sim\operatorname{Gamma}(n,\lambda_0),
$$

したがって

$$
2\lambda_0T\sim\chi^2_{2n}.
$$

よって

$$
\boxed{
2\lambda_0T\ge\chi^2_{2n,1-\alpha}
}
$$

が棄却域。

## 本番答案

$$
L(\lambda)=\lambda^ne^{-\lambda T}.
$$

$\lambda_1<\lambda_0$なら

$$
\frac{L(\lambda_1)}{L(\lambda_0)}
=C\exp\{(\lambda_0-\lambda_1)T\}
$$

は$T$の増加関数。よってNP補題から$T$が大きい側を棄却する。この向きはすべての$\lambda_1<\lambda_0$で共通なのでUMP。

$H_0$下で$2\lambda_0T\sim\chi^2_{2n}$だから

$$
2\lambda_0T\ge\chi^2_{2n,1-\alpha}
$$

を棄却域とする。

## 採点基準

- 尤度: 3点
- NP比と単調性: 6点
- UMPの説明: 6点
- 臨界値: 5点
