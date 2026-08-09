# 30分ドリル

- 制限時間: 30分
- 目標: 論述答案の完答

## F0-DRILL-01 問題

### 第I部：変換と最尤推定（60点）

$\theta>0$ とし、確率変数 $X$ の密度を

$$
f_\theta(x)=\theta x^{\theta-1}\boldsymbol{1}_{(0,1)}(x)
$$

とする。

1. この密度が1へ積分されることを確認せよ。（10点）
2. $Y=-\log X$ の密度を、変数変換によって求めよ。（15点）
3. $X_1,\ldots,X_n$ を独立同分布標本とする。尤度と対数尤度を書き、$\theta$ の最尤推定量を求めよ。（20点）
4. 得られた停留点が一意な最大点であることを示せ。（15点）

### 第II部：固有値と線形結合（40点）

平均 $\boldsymbol{0}$、共分散行列

$$
\boldsymbol{\Sigma}=
\begin{pmatrix}
5&3\\
3&5
\end{pmatrix}
$$

をもつ確率ベクトル $\boldsymbol{Z}=(Z_1,Z_2)^{\mathsf T}$ を考える。

5. $\boldsymbol{\Sigma}$ の固有値と正規直交固有ベクトルを求め、

   $$
   W_1=\frac{Z_1+Z_2}{\sqrt2},
   \qquad
   W_2=\frac{Z_1-Z_2}{\sqrt2}
   $$

   の分散と共分散を求めよ。（40点）

## 詳細解答

### (1)

$\theta>0$ なので $x^{\theta-1}$ は0の近くで可積分です。したがって

$$
\int_{-\infty}^{\infty}f_\theta(x)\,dx
=\theta\int_0^1x^{\theta-1}\,dx
=\theta\left[\frac{x^\theta}{\theta}\right]_0^1
=1.
$$

### (2)

$y=-\log x$ の逆変換は $x=e^{-y}$ です。$0<x<1$ は $y>0$ と対応します。また

$$
\left|\frac{dx}{dy}\right|=e^{-y}.
$$

したがって

$$
\begin{aligned}
f_Y(y)
&=\theta(e^{-y})^{\theta-1}e^{-y}
\boldsymbol{1}_{(0,\infty)}(y)\\
&=\theta e^{-\theta y}
\boldsymbol{1}_{(0,\infty)}(y).
\end{aligned}
$$

よって $Y$ は率 $\theta$ の指数分布に従います。

### (3)

観測値が全て $(0,1)$ にあるとき、

$$
L(\theta)
=\prod_{i=1}^n\theta x_i^{\theta-1}
=\theta^n\prod_{i=1}^nx_i^{\theta-1}.
$$

対数尤度は

$$
\ell(\theta)
=n\log\theta+(\theta-1)\sum_{i=1}^n\log x_i.
$$

各 $0<x_i<1$ から $\log x_i<0$ です。微分すると

$$
\ell'(\theta)
=\frac{n}{\theta}+\sum_{i=1}^n\log x_i.
$$

従って停留点は

$$
\widehat\theta
=-\frac{n}{\sum_{i=1}^n\log x_i}.
$$

分母は負なので $\widehat\theta>0$ であり、パラメータ空間の内部にあります。

### (4)

二階微分は

$$
\ell''(\theta)=-\frac{n}{\theta^2}<0
$$

です。よって対数尤度は $(0,\infty)$ 上で狭義凹であり、停留点 $\widehat\theta$ は一意な大域的最大点です。

### (5)

特性多項式は

$$
(5-\lambda)^2-9=(\lambda-8)(\lambda-2)
$$

です。固有値8に対応する単位固有ベクトルは $\boldsymbol{q}_1=2^{-1/2}(1,1)^{\mathsf T}$、固有値2に対応するものは $\boldsymbol{q}_2=2^{-1/2}(1,-1)^{\mathsf T}$ です。

$W_i=\boldsymbol{q}_i^{\mathsf T}\boldsymbol{Z}$ なので、

$$
\operatorname{Var}(W_i)
=\boldsymbol{q}_i^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{q}_i.
$$

固有ベクトルの関係から

$$
\operatorname{Var}(W_1)=8,
\qquad
\operatorname{Var}(W_2)=2.
$$

また

$$
\begin{aligned}
\operatorname{Cov}(W_1,W_2)
&=\boldsymbol{q}_1^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{q}_2\\
&=\boldsymbol{q}_1^{\mathsf T}(2\boldsymbol{q}_2)\\
&=2\boldsymbol{q}_1^{\mathsf T}\boldsymbol{q}_2\\
&=0.
\end{aligned}
$$

最後の等号では、異なる正規直交固有ベクトルの直交性を使いました。

## 本番答案の骨格

- (1) 台と $\theta>0$ を書いて積分する。
- (2) $x=e^{-y}$、$y>0$、Jacobian $e^{-y}$ の三点を示す。
- (3) 対数尤度を微分し、分母が負なので推定量が正であることまで書く。
- (4) $\ell''(\theta)<0$ により狭義凹性と一意性を結論する。
- (5) 固有値・単位固有ベクトルを示し、$\boldsymbol{q}_i^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{q}_j$ で分散・共分散をまとめる。

## 完成形の本番答案

(1) $\theta>0$ より $x^{\theta-1}$ は0の近くで可積分であり、

$$
\int_{\mathbb{R}}f_\theta(x)\,dx
=\theta\int_0^1x^{\theta-1}\,dx=1.
$$

(2) $y=-\log x$ の逆変換は $x=e^{-y}$、像は $y>0$、Jacobian絶対値は $e^{-y}$ である。従って

$$
f_Y(y)=\theta e^{-\theta y}\boldsymbol{1}_{(0,\infty)}(y).
$$

(3) 全観測値が $(0,1)$ にあるとき

$$
\ell(\theta)=n\log\theta+(\theta-1)\sum_{i=1}^n\log x_i.
$$

従って

$$
\ell'(\theta)=\frac n\theta+\sum_{i=1}^n\log x_i=0
$$

から

$$
\widehat\theta=-\frac{n}{\sum_{i=1}^n\log x_i}>0.
$$

(4) $\ell''(\theta)=-n/\theta^2<0$ なので $\ell$ は $(0,\infty)$ 上で狭義凹であり、$\widehat\theta$ は一意な大域的最大点である。

(5)

$$
\det(\boldsymbol{\Sigma}-\lambda\boldsymbol{I}_2)
=(\lambda-8)(\lambda-2)
$$

より、固有値と対応する単位固有ベクトルは

$$
8,\quad \boldsymbol{q}_1=\frac{1}{\sqrt2}(1,1)^{\mathsf T},
\qquad
2,\quad \boldsymbol{q}_2=\frac{1}{\sqrt2}(1,-1)^{\mathsf T}.
$$

$W_i=\boldsymbol{q}_i^{\mathsf T}\boldsymbol Z$ なので

$$
\operatorname{Var}(W_1)=8,\qquad
\operatorname{Var}(W_2)=2,\qquad
\operatorname{Cov}(W_1,W_2)
=\boldsymbol{q}_1^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{q}_2=0.
$$

詳細解答からは、部分積分を要しない反復説明と行列積の説明文を圧縮しました。一方、台、逆変換、Jacobian、推定量の正値性、最大性の根拠、固有ベクトルの正規化は残しています。

## 時間配分と撤退基準

| 作業 | 目安 |
|---|---:|
| 問題把握 | 2分 |
| (1) | 3分 |
| (2) | 5分 |
| (3) | 7分 |
| (4) | 4分 |
| (5) | 7分 |
| 見直し | 2分 |

20分時点で第I部が完了していれば継続します。(2)の変換後の台が決まらない、または(3)の対数尤度が立たない場合は、第II部を先に完答して部分点を確保します。

## 問題選択の判断材料

最初の2分で、変換が一対一、対数尤度が一変数、共分散行列が対称な $2\times2$ 行列であることが見えます。`JAC-1`、`CALC-1`、`QUAD-1` が直ちに起動するため、これらを得意とする受験者には選択価値の高い問題です。

## 復習カード

1. 密度は非負で全体積分が1。
2. 台とパラメータ空間を分ける。
3. $E[g(X)]$ の存在は絶対可積分性で確認する。
4. 対数は正の尤度上で最大点を保つ。
5. スコア方程式は最大化の十分条件ではない。
6. 境界解は微分だけでは見つからない。
7. 変数変換は逆変換、領域、Jacobianの順。
8. 密度にはJacobianの絶対値を掛ける。
9. 非単射変換では全ての逆像の寄与を足す。
10. 勾配は列ベクトル、Hessianは二階偏微分行列。
11. 実対称行列は正規直交固有基底をもつ。
12. 正定値性は全固有値が正であることと同値。
13. 共分散行列は半正定値。
14. 線形結合の分散は $\boldsymbol{a}^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{a}$。
15. 射影行列は対称かつ冪等。
16. 最小二乗残差は計画行列の列空間と直交する。
17. 逆行列表示の前にrankを確認する。
18. $A\Longrightarrow B$ では $A$ が十分条件。
19. 同値記号は各操作が可逆なときだけ使う。
20. 本番答案でも台、主要な根拠、結論は削らない。
