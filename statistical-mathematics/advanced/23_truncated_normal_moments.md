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

$q_a=P(Z>a)=1-\Phi(a)$ と置く。

### 1. 条件付き密度

$z>a$ では、条件付き確率の定義から

$$
f_{Z\mid Z>a}(z)
=\frac{f_Z(z)}{P(Z>a)}
=\boxed{\frac{\phi(z)}{q_a}}.
$$

$z\le a$ では0である。

### 2. 条件付き平均

標準正規密度は

$$
\phi'(z)=-z\phi(z)
$$

を満たす。したがって

$$
\begin{aligned}
E[Z\mid Z>a]
&=\frac1{q_a}\int_a^\infty z\phi(z)dz\\
&=-\frac1{q_a}\int_a^\infty\phi'(z)dz\\
&=-\frac1{q_a}[\phi(z)]_a^\infty.
\end{aligned}
$$

$\phi(z)\to0$ なので

$$
E[Z\mid Z>a]
=\frac{\phi(a)}{q_a}
=\boxed{\lambda(a)}.
$$

### 3. 二次モーメントと分散

今度は $z\phi(z)=-\phi'(z)$ を用いて部分積分する。

$$
\begin{aligned}
\int_a^\infty z^2\phi(z)dz
&=-\int_a^\infty z\phi'(z)dz\\
&=-[z\phi(z)]_a^\infty+\int_a^\infty\phi(z)dz.
\end{aligned}
$$

$z\phi(z)\to0$ かつ $\int_a^\infty\phi(z)dz=q_a$ だから

$$
\int_a^\infty z^2\phi(z)dz
=a\phi(a)+q_a.
$$

よって

$$
\begin{aligned}
E[Z^2\mid Z>a]
&=\frac{a\phi(a)+q_a}{q_a}\\
&=\boxed{1+a\lambda(a)}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(Z\mid Z>a)
&=E[Z^2\mid Z>a]-E[Z\mid Z>a]^2\\
&=\boxed{1+a\lambda(a)-\lambda(a)^2}.
\end{aligned}
$$

### 4. 一般の正規分布

$$
W=\frac{X-\mu}{\sigma},
\qquad
\alpha=\frac{c-\mu}{\sigma}
$$

と置くと $W\sim N(0,1)$ で

$$
\{X>c\}=\{W>\alpha\},
\qquad
X=\mu+\sigma W.
$$

したがって

$$
\boxed{E[X\mid X>c]=\mu+\sigma\lambda(\alpha)},
$$

$$
\boxed{
\operatorname{Var}(X\mid X>c)
=\sigma^2\{1+\alpha\lambda(\alpha)-\lambda(\alpha)^2\}
}.
$$

## 本番答案

$q_a=1-\Phi(a)$ と置くと

$$
f(z\mid Z>a)=\frac{\phi(z)}{q_a},\qquad z>a.
$$

$\phi'=-z\phi$ より

$$
E[Z\mid Z>a]
=\frac{-\int_a^\infty\phi'(z)dz}{q_a}
=\frac{\phi(a)}{q_a}=\lambda(a).
$$

さらに

$$
\int_a^\infty z^2\phi(z)dz
=-[z\phi(z)]_a^\infty+\int_a^\infty\phi(z)dz
=a\phi(a)+q_a,
$$

したがって

$$
E[Z^2\mid Z>a]=1+a\lambda(a),
\quad
Var(Z\mid Z>a)=1+a\lambda(a)-\lambda(a)^2.
$$

一般正規は $W=(X-\mu)/\sigma$, $\alpha=(c-\mu)/\sigma$ と標準化して戻す。

## 採点基準

- 条件付き密度: 4点
- 平均（積分の評価まで）: 6点
- 二次モーメント・分散（部分積分まで）: 7点
- 一般化: 3点
