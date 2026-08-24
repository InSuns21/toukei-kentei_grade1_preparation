# Core 10 Gauss–Markov・BLUE

- 旧No.: 78
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

線形モデル

$$
y=X\beta+\varepsilon,
\qquad
E[\varepsilon]=0,
\qquad
\operatorname{Var}(\varepsilon)=\sigma^2I_n
$$

を考える。$X$は列フルランクとする。

1. OLS推定量$\widehat\beta=(X^TX)^{-1}X^Ty$が不偏であることを示せ。
2. その分散共分散行列を求めよ。
3. 任意の線形不偏推定量$Ay$について$AX=I$を示せ。
4. $A=(X^TX)^{-1}X^T+D$と表し、$DX=0$を用いて

$$
\operatorname{Var}(Ay)-\operatorname{Var}(\widehat\beta)
$$

が半正定値であることを示せ。

## 詳細解答

$$
E[\widehat\beta]
=(X^TX)^{-1}X^TX\beta=\beta.
$$

また

$$
\operatorname{Var}(\widehat\beta)
=(X^TX)^{-1}X^T\sigma^2IX(X^TX)^{-1}
=\boxed{\sigma^2(X^TX)^{-1}}.
$$

$Ay$が全ての$\beta$について不偏なら

$$
E[Ay]=AX\beta=\beta
$$

だから$AX=I$。

OLSの係数行列を$A_0=(X^TX)^{-1}X^T$とし、$D=A-A_0$と置く。$A_0X=I$かつ$AX=I$より

$$
DX=0.
$$

分散は

$$
\operatorname{Var}(Ay)=\sigma^2(A_0+D)(A_0+D)^T.
$$

交差項は

$$
A_0D^T=(X^TX)^{-1}X^TD^T
=(X^TX)^{-1}(DX)^T=0.
$$

従って

$$
\operatorname{Var}(Ay)
=\operatorname{Var}(\widehat\beta)+\sigma^2DD^T.
$$

$DD^T$は半正定値なのでOLSはBLUE。

## 本番答案

$$
E[\hat\beta]=\beta,
\qquad
\operatorname{Var}(\hat\beta)=\sigma^2(X^TX)^{-1}.
$$

線形不偏推定量$Ay$は$AX=I$。$A=A_0+D$、$A_0=(X^TX)^{-1}X^T$と置けば$DX=0$。

したがって交差項が消え

$$
\operatorname{Var}(Ay)
=\operatorname{Var}(\hat\beta)+\sigma^2DD^T
\succeq\operatorname{Var}(\hat\beta).
$$

よってOLSはBLUE。

## 採点基準

- 不偏性: 4点
- OLS分散: 4点
- $AX=I$: 3点
- 分散差の展開: 6点
- BLUE結論: 3点
