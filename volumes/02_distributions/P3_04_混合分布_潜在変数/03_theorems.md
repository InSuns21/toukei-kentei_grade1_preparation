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

$Z\in\{1,2\}$、$P(Z=1)=\pi$、$P(Z=2)=1-\pi$、$X\mid Z=j\sim N(\mu_j,\sigma_j^2)$、$0\leq\pi\leq1$ とする。すると
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

全分散公式は $X-E[X]=(X-E[X\mid Z])+(E[X\mid Z]-E[X])$ と分解する。二乗して期待値を取ると、交差項は
$$
E[(X-E[X\mid Z])(E[X\mid Z]-E[X])]=0
$$
である。残る二項を $Z=j$ ごとに分ければ、P3L-THM-01の式になる。

P3L-THM-02では、Gamma積分
$$
\int_0^\infty \lambda^{r-1}e^{-c\lambda}\,d\lambda=\frac{\Gamma(r)}{c^r},\qquad r,c>0
$$
を $r=k+\alpha$、$c=\beta+1$ に適用する。P3L-THM-03は全分散公式に $E[X\mid Z=1]=\mu_1$、$E[X\mid Z=2]=\mu_2$、各群内分散 $\sigma_j^2$ を代入したものである。

P3L-THM-05の観測データ尤度は、各 $i$ について $Z_i=1,\ldots,m$ の排反な場合を足して得る。EMの一歩では
$$
E[\boldsymbol{1}_{\{Z_i=j\}}\mid X_i=x_i]=P(Z_i=j\mid X_i=x_i)=\tau_{ij}
$$
を使うので、責務は単なる重みではなく指示関数の条件付き期待値である。
