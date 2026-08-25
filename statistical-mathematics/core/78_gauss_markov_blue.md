# Core 10 Gauss–Markov・最良線形不偏推定量

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

を考える。$X$ は $n\times p$ 行列で列フルランクとする。

1. 通常最小二乗法推定量

$$
\widehat\beta=(X^TX)^{-1}X^Ty
$$

が不偏であることを示せ。
2. $\widehat\beta$ の分散共分散行列を求めよ。
3. 任意の線形不偏推定量 $Ay$ について $AX=I_p$ を示せ。
4. $A=(X^TX)^{-1}X^T+D$ と表し、$DX=0$ を用いて

$$
\operatorname{Var}(Ay)-\operatorname{Var}(\widehat\beta)
$$

が半正定値であることを示せ。

## 詳細解答

### 1. 通常最小二乗法推定量の不偏性

モデル式から

$$
E[y]
=E[X\beta+\varepsilon]
=X\beta+E[\varepsilon]
=X\beta.
$$

したがって

$$
\begin{aligned}
E[\widehat\beta]
&=E[(X^TX)^{-1}X^Ty]\\
&=(X^TX)^{-1}X^TE[y]\\
&=(X^TX)^{-1}X^TX\beta.
\end{aligned}
$$

$X$ は列フルランクなので $X^TX$ は可逆であり、

$$
(X^TX)^{-1}X^TX=I_p.
$$

よって

$$
\boxed{E[\widehat\beta]=\beta}.
$$

ここで使ったのは $E[\varepsilon]=0$ と $X$ の列フルランクであり、誤差の正規性は仮定していない。

### 2. 分散共分散行列

まず $X\beta$ は確率変数ではないので

$$
\operatorname{Var}(y)
=\operatorname{Var}(X\beta+\varepsilon)
=\operatorname{Var}(\varepsilon)
=\sigma^2I_n.
$$

定数行列 $B$ に対して

$$
\operatorname{Var}(By)=B\operatorname{Var}(y)B^T
$$

だから、$B=(X^TX)^{-1}X^T$ と置くと

$$
\begin{aligned}
\operatorname{Var}(\widehat\beta)
&=(X^TX)^{-1}X^T(\sigma^2I_n)X\{(X^TX)^{-1}X^T\}^T\\
&=\sigma^2(X^TX)^{-1}X^TX(X^TX)^{-1}\\
&=\boxed{\sigma^2(X^TX)^{-1}}.
\end{aligned}
$$

$(X^TX)^{-1}$ は対称行列なので転置しても変わらないことを使った。

### 3. 線形不偏推定量が満たす条件

$Ay$ が $\beta$ の線形不偏推定量であるとは、すべての $\beta$ に対して

$$
E[Ay]=\beta
$$

となることをいう。

一方

$$
E[Ay]
=AE[y]
=AX\beta.
$$

したがって

$$
AX\beta=\beta
$$

がすべての $\beta\in\mathbb R^p$ について成立する。よって

$$
(AX-I_p)\beta=0
$$

がすべての $\beta$ に対して成立するので、行列そのものが0でなければならない。したがって

$$
\boxed{AX=I_p}.
$$

### 4. 分散差が半正定値であること

通常最小二乗法の係数行列を

$$
A_0=(X^TX)^{-1}X^T
$$

と置く。$A_0X=I_p$ である。

任意の線形不偏推定量 $Ay$ について

$$
D=A-A_0
$$

と置けば

$$
DX
=(A-A_0)X
=AX-A_0X
=I_p-I_p
=0.
$$

つまり

$$
A=A_0+D,
\qquad DX=0.
$$

$Ay$ の分散は

$$
\begin{aligned}
\operatorname{Var}(Ay)
&=A\operatorname{Var}(y)A^T\\
&=\sigma^2(A_0+D)(A_0+D)^T\\
&=\sigma^2A_0A_0^T
+\sigma^2A_0D^T
+\sigma^2DA_0^T
+\sigma^2DD^T.
\end{aligned}
$$

交差項を確認する。まず

$$
\begin{aligned}
A_0D^T
&=(X^TX)^{-1}X^TD^T\\
&=(X^TX)^{-1}(DX)^T\\
&=0.
\end{aligned}
$$

したがって転置したもう一方も

$$
DA_0^T=(A_0D^T)^T=0.
$$

よって

$$
\operatorname{Var}(Ay)
=\sigma^2A_0A_0^T+\sigma^2DD^T.
$$

第2問から

$$
\sigma^2A_0A_0^T
=\operatorname{Var}(\widehat\beta)
$$

なので

$$
\boxed{
\operatorname{Var}(Ay)-\operatorname{Var}(\widehat\beta)
=\sigma^2DD^T
}.
$$

最後に任意の $c\in\mathbb R^p$ に対して

$$
\begin{aligned}
c^T(\sigma^2DD^T)c
&=\sigma^2(D^Tc)^T(D^Tc)\\
&=\sigma^2\|D^Tc\|^2\\
&\ge0.
\end{aligned}
$$

したがって $\sigma^2DD^T$ は半正定値である。

これは、任意の線形結合 $c^T\beta$ を推定したときにも通常最小二乗法の分散が他の線形不偏推定量より大きくならないことを意味する。以上がGauss–Markovの定理の核心である。

## 本番答案

$E[y]=X\beta$ より

$$
E[\widehat\beta]
=(X^TX)^{-1}X^TX\beta
=\beta.
$$

また

$$
\operatorname{Var}(y)=\sigma^2I_n
$$

なので

$$
\operatorname{Var}(\widehat\beta)
=\sigma^2(X^TX)^{-1}.
$$

線形不偏推定量 $Ay$ は

$$
AX\beta=\beta
$$

をすべての $\beta$ について満たすから $AX=I_p$。

$A_0=(X^TX)^{-1}X^T$、$D=A-A_0$ と置けば $DX=0$。したがって

$$
A_0D^T=(X^TX)^{-1}(DX)^T=0
$$

であり、

$$
\operatorname{Var}(Ay)
=\operatorname{Var}(\widehat\beta)+\sigma^2DD^T.
$$

任意の $c$ について

$$
c^TDD^Tc=\|D^Tc\|^2\ge0
$$

だから分散差は半正定値。よって通常最小二乗法は最良線形不偏推定量である。

## 採点基準

- 不偏性（$E[y]$ から導出）: 4点
- 分散共分散行列（行列の分散公式を適用）: 4点
- $AX=I_p$ の導出: 3点
- $D$ 分解と交差項が0になる理由: 6点
- 半正定値の確認と結論: 3点
