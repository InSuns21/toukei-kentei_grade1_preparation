# Advanced 02 切断正規・平均・分散

- 旧No.: 23
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$Z\sim N(0,1)$ とし、$Z>a$ で条件付ける。標準正規密度・CDFを $\phi,\Phi$ とし

$$
\lambda(a)=\frac{\phi(a)}{1-\Phi(a)}
$$

と置く。

1. $Z\mid Z>a$ の密度を求めよ。
2. $E[Z\mid Z>a]$ を求めよ。
3. $E[Z^2\mid Z>a]$ と分散を求めよ。
4. $X\sim N(\mu,\sigma^2)$ の $X>c$ への一般化を書け。

## 詳細解答

条件付き密度は

$$
f(z\mid Z>a)=\frac{\phi(z)}{1-\Phi(a)},
\qquad z>a.
$$

$\phi'(z)=-z\phi(z)$ より部分積分して

$$
\int_a^\infty z\phi(z)dz=\phi(a),
$$

従って

$$
E[Z\mid Z>a]=\lambda(a).
$$

さらに

$$
\int_a^\infty z^2\phi(z)dz
=a\phi(a)+1-\Phi(a),
$$

よって

$$
E[Z^2\mid Z>a]=1+a\lambda(a),
$$

$$
\boxed{\operatorname{Var}(Z\mid Z>a)=1+a\lambda(a)-\lambda(a)^2}.
$$

一般に $\alpha=(c-\mu)/\sigma$ とすれば

$$
E[X\mid X>c]=\mu+\sigma\lambda(\alpha),
$$

$$
\operatorname{Var}(X\mid X>c)
=\sigma^2\{1+\alpha\lambda(\alpha)-\lambda(\alpha)^2\}.
$$

## 本番答案

切断密度は $\phi(z)/(1-\Phi(a))$。$\phi'=-z\phi$ を使うと

$$
E[Z\mid Z>a]=\lambda(a),
$$

$$
E[Z^2\mid Z>a]=1+a\lambda(a),
$$

従って分散は $1+a\lambda(a)-\lambda(a)^2$。一般正規は標準化して戻す。

## 採点基準

- 条件付き密度: 4点
- 平均: 6点
- 二次モーメント・分散: 7点
- 一般化: 3点
