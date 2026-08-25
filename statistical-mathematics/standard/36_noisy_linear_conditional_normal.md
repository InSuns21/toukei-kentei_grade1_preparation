# Standard 13 ノイズ付き線形観測の条件付き正規

- 旧No.: 36
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X\sim N_p(\mu,\Sigma)$、$\varepsilon\sim N(0,\tau^2)$ は独立で、

$$
Y=a^TX+\varepsilon
$$

を観測する。

1. $(X,Y)$ の平均と共分散を求めよ。
2. $X\mid Y=y$ の分布を求めよ。
3. $\tau^2\to0$ と $\tau^2\to\infty$ の極限を解釈せよ。

## 詳細解答

### 1. $(X,Y)$ の平均と共分散

まず

$$
E[Y]=E[a^TX+\varepsilon]=a^T\mu.
$$

独立性から $\operatorname{Cov}(X,\varepsilon)=0$ なので

$$
\operatorname{Cov}(X,Y)=\operatorname{Cov}(X,a^TX+\varepsilon)=\Sigma a.
$$

また

$$
\operatorname{Var}(Y)=\operatorname{Var}(a^TX)+\operatorname{Var}(\varepsilon)=a^T\Sigma a+\tau^2.
$$

従って

$$
\boxed{E\begin{pmatrix}X\\Y\end{pmatrix}=\begin{pmatrix}\mu\\a^T\mu\end{pmatrix}}
$$

で、共分散行列は

$$
\boxed{
\operatorname{Cov}\begin{pmatrix}X\\Y\end{pmatrix}
=
\begin{pmatrix}
\Sigma&\Sigma a\\
a^T\Sigma&a^T\Sigma a+\tau^2
\end{pmatrix}}.
$$

$X$ と $\varepsilon$ は独立な正規変数なので $(X,\varepsilon)$ は同時正規であり、その線形変換である $(X,Y)$ も同時正規である。

### 2. 条件付き分布

多変量正規の条件付き分布公式を使う。第1問で同時正規性を確認し、条件付ける変数の分散は $a^T\Sigma a+\tau^2>0$ であるから公式を適用できる。

条件付き平均は

$$
E[X\mid Y=y]=\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu).
$$

条件付き共分散は

$$
\operatorname{Cov}(X\mid Y)=\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}.
$$

したがって

$$
\boxed{
X\mid Y=y
\sim N_p\left(
\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}
\right)}.
$$

### 3. 観測雑音の極限

$\tau^2\to0$ では

$$
\frac{\Sigma a}{a^T\Sigma a+\tau^2}\to\frac{\Sigma a}{a^T\Sigma a},
$$

となり、$a^TX=y$ という線形結合をほぼ誤差なく観測した条件付き分布へ近づく。

一方 $\tau^2\to\infty$ では

$$
\frac{\Sigma a}{a^T\Sigma a+\tau^2}\to0,
\qquad
\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}\to0.
$$

したがって

$$
E[X\mid Y=y]\to\mu,
\qquad
\operatorname{Cov}(X\mid Y)\to\Sigma,
$$

で、観測 $Y$ がほとんど情報を持たず元の分布へ戻る。

## 本番答案

独立性から

$$
E[Y]=a^T\mu,
\quad
\operatorname{Cov}(X,Y)=\Sigma a,
\quad
\operatorname{Var}(Y)=a^T\Sigma a+\tau^2.
$$

$(X,Y)$ は同時正規なので

$$
E[X\mid Y=y]=\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
$$

$$
\operatorname{Cov}(X\mid Y)=\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}.
$$

$\tau^2\to0$ ではほぼ正確な線形観測、$\tau^2\to\infty$ では元の $N_p(\mu,\Sigma)$ へ戻る。

## 採点基準

- 同時モーメントの導出: 6点
- 条件付き平均: 6点
- 条件付き共分散: 5点
- 極限解釈: 3点
