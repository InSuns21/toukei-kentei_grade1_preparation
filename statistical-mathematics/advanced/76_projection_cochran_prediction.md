# Advanced 15 射影・Cochran・予測誤差

- 旧No.: 76
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

線形モデル

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I),
$$

$\operatorname{rank}(X)=p$ とする。$H=X(X^TX)^{-1}X^T$。

1. $Hy$ と $(I-H)y$ が独立であることを示せ。
2. $SSE=y^T(I-H)y$ の分布を求めよ。
3. 新しい説明変数 $x_0$ に対する独立な将来観測 $Y_0=x_0^T\beta+\varepsilon_0$ を考える。予測誤差 $Y_0-x_0^T\hat\beta$ の分散を求めよ。
4. $\sigma^2$ を $S^2=SSE/(n-p)$ で推定したときのStudent化を述べよ。

## 詳細解答

$H$ は $\mathcal C(X)$ への直交射影なので

$$
H^T=H,
\qquad H^2=H,
\qquad (I-H)X=0.
$$

### 1. 適合値と残差の独立

$(Hy,(I-H)y)$ は正規ベクトル $y$ の線形変換なので同時正規。共分散は

$$
Cov(Hy,(I-H)y)
=H(\sigma^2I)(I-H)
=\sigma^2(H-H^2)=0.
$$

従って

$$
\boxed{Hy\perp(I-H)y}.
$$

### 2. 誤差平方和の分布

$(I-H)X\beta=0$ なので

$$
SSE=y^T(I-H)y
=\varepsilon^T(I-H)\varepsilon.
$$

$Z=\varepsilon/\sigma\sim N_n(0,I)$ と置けば

$$
\frac{SSE}{\sigma^2}=Z^T(I-H)Z.
$$

$I-H$ は対称冪等でランク $n-p$。直交行列 $U$ で

$$
U^T(I-H)U=\operatorname{diag}(I_{n-p},0_p)
$$

と対角化できる。$W=U^TZ\sim N_n(0,I)$ だから

$$
\frac{SSE}{\sigma^2}
=\sum_{j=1}^{n-p}W_j^2
\sim\boxed{\chi^2_{n-p}}.
$$

### 3. 予測誤差分散

$$
\hat\beta=(X^TX)^{-1}X^Ty
$$

より

$$
\hat\beta-\beta=(X^TX)^{-1}X^T\varepsilon.
$$

したがって

$$
Y_0-x_0^T\hat\beta
=\varepsilon_0-x_0^T(\hat\beta-\beta).
$$

$\varepsilon_0$ は学習標本と独立なので交差共分散は0。さらに

$$
Var(\hat\beta-\beta)=\sigma^2(X^TX)^{-1}.
$$

従って

$$
\boxed{
Var(Y_0-x_0^T\hat\beta)
=\sigma^2\{1+x_0^T(X^TX)^{-1}x_0\}
}.
$$

### 4. Student化

予測誤差は平均0の正規分布で、上の分散を持つ。$SSE$ は $(I-H)\varepsilon$ のみの関数。一方 $\hat\beta-\beta$ は $H\varepsilon$ と同じ射影成分から作られ、$H\varepsilon\perp(I-H)\varepsilon$。さらに $\varepsilon_0$ も独立なので、予測誤差と $SSE$ は独立である。

したがって

$$
\frac{SSE}{\sigma^2}\sim\chi^2_{n-p}
$$

と合わせて

$$
\boxed{
\frac{Y_0-x_0^T\hat\beta}
{S\sqrt{1+x_0^T(X^TX)^{-1}x_0}}
\sim t_{n-p}
}.
$$

## 本番答案

$H(I-H)=0$ なので

$$
Cov(Hy,(I-H)y)=\sigma^2H(I-H)=0.
$$

同時正規より独立。さらに

$$
SSE=\varepsilon^T(I-H)\varepsilon.
$$

$I-H$ を直交対角化するとランク $n-p$ 個の独立標準正規の平方和になるので $SSE/\sigma^2\sim\chi^2_{n-p}$。

また

$$
Y_0-x_0^T\hat\beta
=\varepsilon_0-x_0^T(X^TX)^{-1}X^T\varepsilon
$$

より分散は

$$
\sigma^2\{1+x_0^T(X^TX)^{-1}x_0\}.
$$

この正規な予測誤差は誤差平方和と独立なので、$S^2=SSE/(n-p)$ で割れば $t_{n-p}$。

## 採点基準

- 射影独立性: 5点
- 誤差平方和分布（対角化を含む）: 5点
- 予測誤差分散: 6点
- Student化と独立性: 4点
