# 定理

## この節で使う分布

| 分布 | 自由度 | 台 | 生成表現 |
|---|---:|---|---|
| $\chi^2_\nu$ | $\nu\in\mathbb N$ | $q>0$ | 独立な $N(0,1)$ $\nu$ 個の平方和 |
| $t_\nu$ | $\nu\in\mathbb N$ | $t\in\mathbb R$ | $Z/\sqrt{Q/\nu}$、$Z$ と $Q$ は独立 |
| $F_{\nu_1,\nu_2}$ | $\nu_1,\nu_2\in\mathbb N$ | $w>0$ | $(Q_1/\nu_1)/(Q_2/\nu_2)$、$Q_1,Q_2$ は独立 |

密度は
$$
f_{\chi^2_\nu}(q)=\frac{q^{\nu/2-1}e^{-q/2}}{2^{\nu/2}\Gamma(\nu/2)},
$$
$$
f_{t_\nu}(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2},
$$
$$
f_{F_{\nu_1,\nu_2}}(w)=
\frac{\Gamma((\nu_1+\nu_2)/2)}{\Gamma(\nu_1/2)\Gamma(\nu_2/2)}
\left(\frac{\nu_1}{\nu_2}\right)^{\nu_1/2}
w^{\nu_1/2-1}
\left(1+\frac{\nu_1w}{\nu_2}\right)^{-(\nu_1+\nu_2)/2}
$$
であり、それぞれの台外では0である。

## S1-THM-01 正規標本の平均と分散

$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}N(\mu,\sigma^2)$、$n\geq2$ とする。このとき
$$
\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right),
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $\overline X$ と $S^2$ は独立である。

標本平均の式は正規変数の線形結合から従う。分散については次の平方和分解が中心になる。
$$
\sum_{i=1}^n(X_i-\mu)^2
=\sum_{i=1}^n(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$
実際、$X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ を二乗して足すと、交差項は
$$
2(\overline X-\mu)\sum_{i=1}^n(X_i-\overline X)=0
$$
となる。

## S1-THM-02 平方和分解と自由度

標準化したベクトル
$$
\boldsymbol Z=\frac1\sigma
\begin{pmatrix}
X_1-\mu\\ \vdots\\ X_n-\mu
\end{pmatrix}
\sim N_n(\boldsymbol0,\boldsymbol I_n)
$$
を考える。平均方向
$$
\boldsymbol e=\frac1{\sqrt n}(1,\ldots,1)^{\mathsf T}
$$
へ射影した成分は
$$
\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}{\sigma}\sim N(0,1).
$$
第一行が $\boldsymbol e^{\mathsf T}$ である直交行列 $\boldsymbol A$ を取り、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置く。直交性より
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol A\boldsymbol I_n\boldsymbol A^{\mathsf T})
=N_n(\boldsymbol0,\boldsymbol I_n).
$$
従って $W_1,\ldots,W_n$ は独立な標準正規変数で、$W_1=\boldsymbol e^{\mathsf T}\boldsymbol Z$ である。直交変換は長さを保つため
$$
\left\|(\boldsymbol I_n-\boldsymbol e\boldsymbol e^{\mathsf T})\boldsymbol Z\right\|^2
=\sum_{j=2}^nW_j^2
=\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2.
$$
従って
$$
\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2
=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$
$W_1$ と $(W_2,\ldots,W_n)$ は独立だから、前者の関数である $\overline X$ と、後者の平方和の関数である $S^2$ も独立である。自由度が $n-1$ なのは、残差が
$$\sum_{i=1}^n(X_i-\overline X)=0$$
という一つの線形制約を満たすためである。

## S1-THM-03 t統計量

S1-THM-01より
$$
Z=\frac{\sqrt n(\overline X-\mu)}{\sigma}\sim N(0,1),
\qquad
Q=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $Z,Q$ は独立である。従ってt分布の定義から
$$
\frac{Z}{\sqrt{Q/(n-1)}}
=\frac{\sqrt n(\overline X-\mu)/\sigma}{S/\sigma}
=\frac{\sqrt n(\overline X-\mu)}S
\sim t_{n-1}.
$$
未知の $\sigma$ が約分され、分布が $\mu,\sigma^2$ に依存しないことが重要である。

## S1-THM-04 二標本の分散比

二つの標本が互いに独立で、$n_1,n_2\geq2$ とし、
$$
X_1,\ldots,X_{n_1}\overset{\mathrm{i.i.d.}}{\sim}N(\mu_1,\sigma_1^2),
\qquad
Y_1,\ldots,Y_{n_2}\overset{\mathrm{i.i.d.}}{\sim}N(\mu_2,\sigma_2^2)
$$
とする。各不偏標本分散を $S_1^2,S_2^2$ とすると
$$
Q_1=\frac{(n_1-1)S_1^2}{\sigma_1^2}\sim\chi^2_{n_1-1},
\qquad
Q_2=\frac{(n_2-1)S_2^2}{\sigma_2^2}\sim\chi^2_{n_2-1}.
$$
標本間の独立性から $Q_1,Q_2$ は独立である。従って
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.
$$
$\sigma_1^2=\sigma_2^2$ のときだけ、未調整の比 $S_1^2/S_2^2$ 自体がこのF分布に従う。
