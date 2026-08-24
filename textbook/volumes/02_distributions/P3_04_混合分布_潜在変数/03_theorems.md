# 定理

## P3L-THM-01 全確率・全期待値・全分散

$P(Z=j)=\pi_j$、$X\mid Z=j$ の質量関数または密度を $g_j$ とする。$E[|X|]<\infty$ なら
$$
g(x)=\sum_{j=1}^m\pi_jg_j(x),\;
E[X]=\sum_{j=1}^m\pi_jE[X\mid Z=j].
$$
$E[X^2]<\infty$ なら
$$
\operatorname{Var}(X)=\sum_{j=1}^m\pi_j\operatorname{Var}(X\mid Z=j)
+\sum_{j=1}^m\pi_j\{E[X\mid Z=j]-E[X]\}^2.
$$
第一項が群内分散、第二項が群間分散である。

## P3L-THM-02 Poisson--Gamma混合

$X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda)$、$\Lambda\sim\operatorname{Gamma}(\alpha,\beta)$、$\alpha,\beta>0$ とする。$k\in\mathbb N_0$ について
$$
\begin{aligned}
P(X=k)&=\int_0^\infty e^{-\lambda}\frac{\lambda^k}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\,\Gamma(\alpha)(\beta+1)^{k+\alpha}}.
\end{aligned}
$$
これは成功確率 $p=\beta/(\beta+1)$、形状パラメータ $r=\alpha$ の負の二項型質量関数である。$\alpha$ は整数とは限らないので、ここでは「必要成功回数」と断定せず、負の二項型の解析的拡張として扱う。全期待値・全分散から
$$
E[X]=\frac{\alpha}{\beta},\;
\operatorname{Var}(X)=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
$$

## P3L-THM-03 正規混合の平均・分散

$Z\in\{1,2\}$、$P(Z=1)=\pi$、$P(Z=2)=1-\pi$、$0\leq\pi\leq1$ とする。正規分布 $N(\mu_j,\sigma_j^2)$ は $\mu_j\in\mathbb R$、$\sigma_j>0$、台 $\mathbb R$、密度
$$
f_j(x)=\frac1{\sigma_j\sqrt{2\pi}}
\exp\left\{-\frac{(x-\mu_j)^2}{2\sigma_j^2}\right\}
$$
をもつものとし、$X\mid Z=j\sim N(\mu_j,\sigma_j^2)$ とする。すると
$$
E[X]=\pi\mu_1+(1-\pi)\mu_2,
$$
$$
\operatorname{Var}(X)=\pi\sigma_1^2+(1-\pi)\sigma_2^2
+\pi(1-\pi)(\mu_1-\mu_2)^2.
$$

## P3L-THM-04 責務のBayes公式

二成分の条件付き密度を $f_j(x)$ とすると、$f(x)=\pi f_1(x)+(1-\pi)f_2(x)>0$ の範囲で
$$
P(Z=1\mid X=x)=\frac{\pi f_1(x)}{\pi f_1(x)+(1-\pi)f_2(x)},
$$
$$
P(Z=2\mid X=x)=1-P(Z=1\mid X=x).
$$
分母は全成分を足した周辺密度である。

## P3L-THM-05 潜在指標を用いた尤度

独立な観測 $(X_i,Z_i)$、$i=1,\ldots,n$ が得られ、$P(Z_i=j)=\pi_j$、$X_i\mid Z_i=j$ の密度が $g_j(x_i;\vartheta_j)$ なら、完全データ尤度は
$$
L_c=\prod_{i=1}^n\prod_{j=1}^m\{\pi_jg_j(x_i;\vartheta_j)\}^{\boldsymbol{1}_{\{Z_i=j\}}}.
$$
$Z_i$ が見えないときの観測データ尤度は
$$
L=\prod_{i=1}^n\sum_{j=1}^m\pi_jg_j(x_i;\vartheta_j).
$$
責務 $\tau_{ij}=P(Z_i=j\mid X_i=x_i)$ を現在の母数で計算し、$\boldsymbol{1}_{\{Z_i=j\}}$ を $\tau_{ij}$ に置き換えた対数尤度を最大化する一歩がEM法の考え方である。本章ではこの式の意味までを扱い、反復計算は後続の推定章に送る。

## 導出の確認

### P3L-THM-01

周辺質量または密度は、$Z=1,\ldots,m$ という排反な場合を足して
$$
g(x)=\sum_{j=1}^mP(Z=j)g_j(x)
=\sum_{j=1}^m\pi_jg_j(x)
$$
となる。$E[|X|]<\infty$ なら有限和と期待値を交換できるので
$$
\begin{aligned}
E[X]
&=\sum_{j=1}^mE[X\boldsymbol1_{\{Z=j\}}]\\
&=\sum_{j=1}^mP(Z=j)E[X\mid Z=j]\\
&=\sum_{j=1}^m\pi_jE[X\mid Z=j].
\end{aligned}
$$

分散について
$$
X-E[X]
=\{X-E[X\mid Z]\}+\{E[X\mid Z]-E[X]\}
$$
と分ける。交差項の期待値は、$Z$ で条件付けると
$$
\begin{aligned}
&E[\{X-E[X\mid Z]\}\{E[X\mid Z]-E[X]\}]\\
&=E\left[
\{E[X\mid Z]-E[X]\}
E\{X-E[X\mid Z]\mid Z\}
\right]=0.
\end{aligned}
$$
従って二乗後に残る二項は
$$
E[\{X-E[X\mid Z]\}^2]
=E\{\operatorname{Var}(X\mid Z)\},
$$
$$
E[\{E[X\mid Z]-E[X]\}^2]
=\operatorname{Var}\{E[X\mid Z]\}.
$$
$Z=j$ ごとの有限和へ直せばP3L-THM-01の表示を得る。

### P3L-THM-02

条件付き質量とGamma密度の積を整理すると
$$
\begin{aligned}
P(X=k)
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty
\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda.
\end{aligned}
$$
$t=(\beta+1)\lambda$ と置けば
$$
\begin{aligned}
\int_0^\infty
\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda
&=\frac1{(\beta+1)^{k+\alpha}}
\int_0^\infty t^{k+\alpha-1}e^{-t}\,dt\\
&=\frac{\Gamma(k+\alpha)}{(\beta+1)^{k+\alpha}}.
\end{aligned}
$$
これを前の係数へ戻せば周辺質量を得る。モーメントは
$$
E[X]=E[\Lambda]=\frac{\alpha}{\beta},
$$
$$
\operatorname{Var}(X)
=E[\Lambda]+\operatorname{Var}(\Lambda)
=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}
$$
である。最後の正の項が混合による過分散である。

### P3L-THM-03

P3L-THM-01へ
$$
E[X\mid Z=1]=\mu_1,\quad E[X\mid Z=2]=\mu_2
$$
と条件付き分散 $\sigma_1^2,\sigma_2^2$ を代入する。群間項は
$$
\pi(\mu_1-\mu)^2+(1-\pi)(\mu_2-\mu)^2,
\quad \mu=\pi\mu_1+(1-\pi)\mu_2.
$$
$\mu_1-\mu=(1-\pi)(\mu_1-\mu_2)$、
$\mu_2-\mu=-\pi(\mu_1-\mu_2)$ なので
$$
\begin{aligned}
&\pi(1-\pi)^2(\mu_1-\mu_2)^2
+(1-\pi)\pi^2(\mu_1-\mu_2)^2\\
&=\pi(1-\pi)(\mu_1-\mu_2)^2.
\end{aligned}
$$
これが定理の第三項である。

### P3L-THM-04

連続変数の一点条件付けは密度によるBayes公式で計算する。分子は成分1と観測 $x$ の同時密度
$$\pi f_1(x),$$
分母は全成分を足した周辺密度
$$f(x)=\pi f_1(x)+(1-\pi)f_2(x).$$
$f(x)>0$ の範囲で両者の比を取れば責務を得る。二つの責務を足すと分子が分母に一致するため、和は1である。

### P3L-THM-05

独立標本では各観測の同時密度を掛ける。$I_{ij}=\boldsymbol1_{\{Z_i=j\}}$ とおくと、実際に選ばれた成分の因子だけを残す書き方が
$$
L_c=\prod_{i=1}^n\prod_{j=1}^m
\{\pi_jg_j(x_i;\vartheta_j)\}^{I_{ij}}
$$
である。$Z_i$ が見えない場合は、各 $i$ について排反な $j$ を足して
$$
p(x_i)=\sum_{j=1}^m\pi_jg_j(x_i;\vartheta_j)
$$
とし、独立性から $\prod_i p(x_i)$ を取る。

さらに
$$
E[I_{ij}\mid X_i=x_i]
=P(Z_i=j\mid X_i=x_i)=\tau_{ij}
$$
なので、責務は単なる便宜的な重みではなく、見えない所属指示変数の条件付き期待値である。
