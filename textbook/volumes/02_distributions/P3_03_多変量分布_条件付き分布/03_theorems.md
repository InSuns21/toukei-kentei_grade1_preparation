# 基本命題と主要定理

本章の定理では$p\in\mathbb N$、$\boldsymbol\mu\in\mathbb R^p$、$\boldsymbol\Sigma\in\mathbb R^{p\times p}$とする。$N_p(\boldsymbol\mu,\boldsymbol\Sigma)$は$p$変量正規分布である。$\boldsymbol\Sigma$が正定値なら、その密度は
$$
f(\boldsymbol x)=
\frac{\exp\{-\tfrac12(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\}}
{(2\pi)^{p/2}|\boldsymbol\Sigma|^{1/2}},
\qquad \boldsymbol x\in\mathbb R^p.
$$
特異な場合はこの密度式を使わず、「全ての線形結合が一変量正規」という`02_definitions.md`の定義を使う。

## P3M-THM-01 平均・共分散の定数項を含む線形変換

$A\in\mathbb R^{q\times p}$、$\boldsymbol b\in\mathbb R^q$とします。$\boldsymbol Y=A\boldsymbol X+\boldsymbol b$の形の変換を、定数項を含む線形変換（アフィン変換）といいます。このとき
$$
E[\boldsymbol Y]=A\boldsymbol\mu+\boldsymbol b,
\qquad
\operatorname{Cov}(\boldsymbol Y)=A\boldsymbol\Sigma A^{\mathsf T}.
$$
実際、$\boldsymbol Y-E[\boldsymbol Y]=A(\boldsymbol X-\boldsymbol\mu)$を外積へ代入すれば従います。任意の$\boldsymbol a\in\mathbb R^p$に対し
$$
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0
$$
なので、共分散行列は半正定値です。

## P3M-THM-02 多変量正規のアフィン変換と周辺分布

$\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$なら
$$
A\boldsymbol X+\boldsymbol b
\sim N_q(A\boldsymbol\mu+\boldsymbol b,A\boldsymbol\Sigma A^{\mathsf T}).
$$
右辺は特異でもよいものとします。任意の$\boldsymbol c\in\mathbb R^q$について$\boldsymbol c^{\mathsf T}(A\boldsymbol X+\boldsymbol b)=(A^{\mathsf T}\boldsymbol c)^{\mathsf T}\boldsymbol X+\boldsymbol c^{\mathsf T}\boldsymbol b$が正規なので、定義から従います。

特に成分を選ぶ行列$A$を使えば、任意の部分ベクトルの周辺分布は、対応する平均部分ベクトルと共分散主部分行列を持つ多変量正規分布です。モーメント母関数（moment generating function; MGF）は全$\boldsymbol t\in\mathbb R^p$で
$$
M_{\boldsymbol X}(\boldsymbol t)
=\exp\left(\boldsymbol t^{\mathsf T}\boldsymbol\mu
+\frac12\boldsymbol t^{\mathsf T}\boldsymbol\Sigma\boldsymbol t\right).
$$
実際、$W=\boldsymbol t^{\mathsf T}\boldsymbol X\sim N(\boldsymbol t^{\mathsf T}\boldsymbol\mu,\boldsymbol t^{\mathsf T}\boldsymbol\Sigma\boldsymbol t)$なので、$M_{\boldsymbol X}(\boldsymbol t)=E[e^W]=M_W(1)$へ一変量正規のMGFを代入すれば上式を得ます。

## P3M-THM-03 多変量正規の条件付き分布

$$
\begin{pmatrix}\boldsymbol X_1\\\boldsymbol X_2\end{pmatrix}
\sim N_{p+q}\left(
\begin{pmatrix}\boldsymbol\mu_1\\\boldsymbol\mu_2\end{pmatrix},
\begin{pmatrix}
\Sigma_{11}&\Sigma_{12}\\
\Sigma_{21}&\Sigma_{22}
\end{pmatrix}
\right)
$$
とし、全共分散行列を正定値とします。すると$\Sigma_{22}$は可逆で、任意の$\boldsymbol x_2\in\mathbb R^q$に対する条件付き分布は
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
\sim N_p(\boldsymbol\mu_{1\mid2},\Sigma_{1\mid2}),
$$
$$
\boldsymbol\mu_{1\mid2}
=\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
$$
$$
\Sigma_{1\mid2}
=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
$$
次元は$\Sigma_{12}:p\times q$、$\Sigma_{22}^{-1}:q\times q$、$\Sigma_{1\mid2}:p\times p$です。$\Sigma_{1\mid2}$はSchur補行列で正定値です。

### 証明

$B=\Sigma_{12}\Sigma_{22}^{-1}$、
$$
\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1
-B(\boldsymbol X_2-\boldsymbol\mu_2)
$$
と置きます。定数項を含む線形変換をしても正規分布であることから、$(\boldsymbol R,\boldsymbol X_2)$の結合分布は多変量正規（同時正規）で、
$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
=\Sigma_{12}-B\Sigma_{22}=0.
$$
従って両者は独立です。また
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
&=\Sigma_{11}-\Sigma_{12}B^{\mathsf T}-B\Sigma_{21}
+B\Sigma_{22}B^{\mathsf T}\\
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
=\Sigma_{1\mid2}.
\end{aligned}
$$
恒等式$\boldsymbol X_1=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R$で$\boldsymbol X_2=\boldsymbol x_2$を固定し、独立な$\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2})$を加えれば条件付き公式を得ます。

Schur補の正定値性も全共分散行列の正定値性から従います。任意の$\boldsymbol a\neq\boldsymbol0$に対し
$$
\boldsymbol v=
\begin{pmatrix}
\boldsymbol a\\-\Sigma_{22}^{-1}\Sigma_{21}\boldsymbol a
\end{pmatrix}\neq\boldsymbol0
$$
と置けば、ブロック積を展開して
$$
\boldsymbol v^{\mathsf T}\boldsymbol\Sigma\boldsymbol v
=\boldsymbol a^{\mathsf T}\Sigma_{1\mid2}\boldsymbol a>0.
$$
従って$\Sigma_{1\mid2}$は正定値です。

二変量正規で標準偏差$\sigma_X,\sigma_Y>0$、相関$\rho$なら
$$
Y\mid(X=x)\sim N\left(
\mu_Y+\rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X),
\sigma_Y^2(1-\rho^2)
\right).
$$

## P3M-THM-04 多変量正規における無相関と独立

結合分布が多変量正規である部分ベクトル$\boldsymbol X_1,\boldsymbol X_2$について
$$
\boldsymbol X_1\perp\!\!\!\perp\boldsymbol X_2
\quad\Longleftrightarrow\quad
\Sigma_{12}=0.
$$
独立なら共分散0は一般に成立します。逆向きは正規性を使います。$\Sigma_{12}=0$ならMGFの二次形式に交差項がなく、同時MGFが二つの周辺MGFの積へ因数分解されるため独立です。

## P3M-THM-05 偏相関と精度行列

正定値な共分散行列$\boldsymbol\Sigma$の逆行列を$\Omega=(\omega_{ij})=\boldsymbol\Sigma^{-1}$とします。多変量正規分布では、残りの全変数を条件付けた$X_i,X_j$の偏相関は
$$
\rho_{ij\cdot-ij}
=-\frac{\omega_{ij}}{\sqrt{\omega_{ii}\omega_{jj}}}.
$$
この式はSchur補から得られます。$(X_i,X_j)$を第1ブロック、残りを第2ブロックとすると、条件付き共分散を$S$としてブロック逆行列公式から$\Omega$の対応する$2\times2$主部分行列は$S^{-1}$です。$S=\begin{pmatrix}a&c\\c&b\end{pmatrix}$なら
$$
S^{-1}=\frac1{ab-c^2}\begin{pmatrix}b&-c\\-c&a\end{pmatrix},
$$
なので$-\omega_{ij}/\sqrt{\omega_{ii}\omega_{jj}}=c/\sqrt{ab}$となり、条件付き残差の相関に一致します。
三変数の場合、$X_1$と$X_2$をそれぞれ$X_3$へ線形回帰した残差は
$$
R_1=X_1-\frac{\sigma_{13}}{\sigma_{33}}X_3,
\qquad
R_2=X_2-\frac{\sigma_{23}}{\sigma_{33}}X_3
$$
です。中心化済みとして
$$
\operatorname{Cov}(R_1,R_2)
=\sigma_{12}-\frac{\sigma_{13}\sigma_{23}}{\sigma_{33}},
$$
$$
\operatorname{Var}(R_i)
=\sigma_{ii}-\frac{\sigma_{i3}^2}{\sigma_{33}}
$$
を相関係数へ代入するとP3M-DEF-02の公式を得ます。

## P3M-THM-06 Mahalanobis二次形式

$\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$、$\boldsymbol\Sigma$を正定値とします。対称平方根$\boldsymbol\Sigma^{1/2}$を用いて
$$
\boldsymbol Z=\boldsymbol\Sigma^{-1/2}(\boldsymbol X-\boldsymbol\mu)
\sim N_p(\boldsymbol0,I_p).
$$
従って
$$
Q=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
=\boldsymbol Z^{\mathsf T}\boldsymbol Z
=\sum_{i=1}^pZ_i^2.
$$
$Z_i$は独立な標準正規なので、$Q$は自由度$p$のカイ二乗分布に従います。本章では$\chi_p^2$を「独立標準正規$p$個の平方和」と定義し、標本分布としての詳細はS1-01で扱います。
