# Core 07 多変量正規の線形変換・独立・残差化

- 旧No.: 25
- 演習価値: S
- 難度: S
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_1,X_2,X_3$ は独立な $N(0,1)$ とし

$$
Y=X_1+X_2,
\qquad
Z=X_2+X_3
$$

とする。

1. $(Y,Z)$ の平均ベクトルと分散共分散行列を求めよ。
2. $Y$ と $Z$ は独立か。
3. $R=Y-aZ$ が $Z$ と独立となる $a$ を求めよ。
4. $Y\mid Z=z$ の条件付き分布を求めよ。

## 詳細解答

### 1. $(Y,Z)$ の平均と分散共分散行列

まず

$$
X=(X_1,X_2,X_3)^T
\sim N_3(0,I_3)
$$

である。

$$
\begin{pmatrix}Y\\Z\end{pmatrix}
=
\begin{pmatrix}
1&1&0\\
0&1&1
\end{pmatrix}X
$$

と書けるので、正規ベクトルの線形変換として $(Y,Z)$ も2変量正規分布に従う。

平均は

$$
E[Y]=E[X_1]+E[X_2]=0,
$$

$$
E[Z]=E[X_2]+E[X_3]=0.
$$

独立性から異なる $X_i,X_j$ の共分散は0なので

$$
\begin{aligned}
\operatorname{Var}(Y)
&=\operatorname{Var}(X_1)+\operatorname{Var}(X_2)\\
&=1+1=2,
\end{aligned}
$$

$$
\operatorname{Var}(Z)=2.
$$

共分散は

$$
\begin{aligned}
\operatorname{Cov}(Y,Z)
&=\operatorname{Cov}(X_1+X_2,X_2+X_3)\\
&=\operatorname{Cov}(X_1,X_2)
+\operatorname{Cov}(X_1,X_3)\\
&\quad+\operatorname{Var}(X_2)
+\operatorname{Cov}(X_2,X_3)\\
&=0+0+1+0\\
&=1.
\end{aligned}
$$

従って

$$
\boxed{
E\begin{pmatrix}Y\\Z\end{pmatrix}
=\begin{pmatrix}0\\0\end{pmatrix},
\qquad
\Sigma_{YZ}
=\begin{pmatrix}2&1\\1&2\end{pmatrix}
}.
$$

### 2. $Y$ と $Z$ の独立性

独立なら有限二次モーメントの下で共分散は0になる。しかし

$$
\operatorname{Cov}(Y,Z)=1\ne0.
$$

従って

$$
\boxed{Y\text{ と }Z\text{ は独立でない}}.
$$

なお $(Y,Z)$ は同時正規なので、この場合は逆に「共分散0なら独立」も成立する。

### 3. 残差 $R=Y-aZ$ を $Z$ と独立にする

まず共分散を計算する。

$$
\begin{aligned}
\operatorname{Cov}(R,Z)
&=\operatorname{Cov}(Y-aZ,Z)\\
&=\operatorname{Cov}(Y,Z)-a\operatorname{Var}(Z)\\
&=1-2a.
\end{aligned}
$$

これを0にするには

$$
1-2a=0
$$

だから

$$
\boxed{a=\frac12}.
$$

このとき

$$
R=Y-\frac12Z.
$$

$(R,Z)$ も $(Y,Z)$ の線形変換なので同時正規である。さらに共分散が0だから

$$
\boxed{R\perp Z}.
$$

単に「回帰係数が共分散/分散」と暗記するのではなく、$Z$ と相関しないように係数を決めた結果が $1/2$ である。

### 4. $Y\mid Z=z$ の条件付き分布

第3問から

$$
Y=\frac12Z+R,
\qquad R\perp Z.
$$

まず $R$ の平均は0。分散は

$$
\begin{aligned}
\operatorname{Var}(R)
&=\operatorname{Var}\left(Y-\frac12Z\right)\\
&=\operatorname{Var}(Y)
+\frac14\operatorname{Var}(Z)
-2\cdot\frac12\operatorname{Cov}(Y,Z)\\
&=2+\frac14\cdot2-1\\
&=\frac32.
\end{aligned}
$$

$R$ は正規ベクトルの線形結合なので

$$
R\sim N\left(0,\frac32\right).
$$

しかも $R$ は $Z$ と独立である。従って $Z=z$ と条件付けても $R$ の分布は変わらず

$$
Y\mid Z=z
=\frac z2+R.
$$

よって

$$
\boxed{
Y\mid Z=z
\sim N\left(\frac z2,\frac32\right)
}.
$$

条件付き正規分布の公式を直接使わず、残差化によって「条件付けても残差の分布が変わらない」ことから導いた。

## 本番答案

$(Y,Z)$ は正規ベクトルの線形変換なので2変量正規。

$$
E[Y]=E[Z]=0,
$$

$$
\operatorname{Var}(Y)=\operatorname{Var}(Z)=2,
$$

$$
\operatorname{Cov}(Y,Z)=1.
$$

従って

$$
\Sigma_{YZ}=\begin{pmatrix}2&1\\1&2\end{pmatrix},
$$

共分散が非零なので $Y,Z$ は独立でない。

$R=Y-aZ$ とすると

$$
\operatorname{Cov}(R,Z)=1-2a,
$$

より $a=1/2$。$(R,Z)$ は同時正規で無相関なので独立。

さらに

$$
\operatorname{Var}(R)
=2+\frac14\cdot2-1
=\frac32.
$$

従って $Y=Z/2+R$ かつ $R\perp Z$ より

$$
Y\mid Z=z\sim N(z/2,3/2).
$$

## 採点基準

- 線形変換による同時正規性・平均・分散共分散行列: 6点
- 独立性判定: 3点
- 残差化係数を共分散0から導出し独立性を確認: 5点
- 残差分散から条件付き分布を導出: 6点
