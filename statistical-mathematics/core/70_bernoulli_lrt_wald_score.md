# Core 02 BernoulliモデルでLRT・Wald・Scoreを比較する

- 旧No.: 70
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Bernoulli}(p)$ とし、$\widehat p=\bar X$ とする。

$$
H_0:p=p_0,
\qquad H_1:p\ne p_0
$$

を考える。

1. MLEを求めよ。
2. 尤度比統計量 $G^2=-2\log\Lambda$ を $\widehat p,p_0$ で表せ。
3. Wald統計量

$$
W=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)}
$$

が漸近的に$\chi_1^2$に従うことを示せ。
4. Score統計量を導出せよ。
5. $G^2,W,S$ が$H_0$の下で漸近同値であることを示せ。

**注**: $G^2$ の対数は数値化しなくてよい。

## 詳細解答

$T=\sum X_i$ とすると

$$
\ell(p)=T\log p+(n-T)\log(1-p).
$$

微分して

$$
\widehat p=T/n=\bar X.
$$

よって

$$
\boxed{
G^2=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)\log\frac{1-\widehat p}{1-p_0}
\right]
}.
$$

$H_0$の下で

$$
\sqrt n(\widehat p-p_0)
\Rightarrow N(0,p_0(1-p_0)).
$$

かつ $\widehat p\to_p p_0$ だからSlutskyより $W\Rightarrow\chi_1^2$。

スコアは

$$
U(p)=\frac{T-np}{p(1-p)},
$$

Fisher情報は

$$
I_n(p)=\frac n{p(1-p)}.
$$

したがって

$$
\boxed{
S=\frac{U(p_0)^2}{I_n(p_0)}
=\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}
}.
$$

$\delta_n=\widehat p-p_0=O_p(n^{-1/2})$ とおく。KL型関数

$$
h(p)=p\log\frac p{p_0}+(1-p)\log\frac{1-p}{1-p_0}
$$

について

$$
h(p_0)=h'(p_0)=0,
\qquad
h''(p_0)=\frac1{p_0(1-p_0)}.
$$

よってTaylor展開から

$$
G^2
=\frac{n\delta_n^2}{p_0(1-p_0)}+o_p(1)
=S+o_p(1).
$$

また $\widehat p(1-\widehat p)=p_0(1-p_0)+o_p(1)$ なので

$$
W=S+o_p(1).
$$

従って三者は同じ二次近似を見ている。

## 本番答案

$$
\widehat p=\bar X,
$$

$$
G^2=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)\log\frac{1-\widehat p}{1-p_0}
\right].
$$

$$
W=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)},
\qquad
S=\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}.
$$

$\widehat p-p_0=O_p(n^{-1/2})$ とTaylor展開より

$$
G^2=S+o_p(1),\qquad W=S+o_p(1),
$$

したがって三者とも$\chi_1^2$へ収束する。

## 採点基準

- MLE: 2点
- LRT: 4点
- Wald: 4点
- Score: 4点
- 漸近同値のTaylor展開: 6点
