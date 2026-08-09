# 基本命題と主要定理

## P2-THM-05 LOTUSと線形性

$E[|g(X)|]<\infty$ なら
$$
E[g(X)]=\sum_xg(x)p_X(x)
$$
または $E[g(X)]=\int g(x)f_X(x)dx$ です。可積分な $X,Y$ と定数 $a,b$ に対し
$$
E[aX+bY]=aE[X]+bE[Y]
$$
であり、独立性は不要です。

## P2-THM-06 分散・共分散公式

二次モーメントが有限なら
$$
\operatorname{Var}(X)=E[X^2]-(E[X])^2,
$$
$$
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y].
$$
また
$$
\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)+2ab\operatorname{Cov}(X,Y).
$$

### 証明

$2|XY|\leq X^2+Y^2$ なので、二次モーメントが有限なら $E[|XY|]<\infty$ であり、以下の展開に期待値の線形性を使えます。$\mu=E[X]$, $\nu=E[Y]$ とすると

$$
\begin{aligned}
E[(X-\mu)^2]
&=E[X^2-2\mu X+\mu^2]\\
&=E[X^2]-2\mu E[X]+\mu^2\\
&=E[X^2]-\mu^2,
\end{aligned}
$$

$$
\begin{aligned}
E[(X-\mu)(Y-\nu)]
&=E[XY-\nu X-\mu Y+\mu\nu]\\
&=E[XY]-\nu\mu-\mu\nu+\mu\nu\\
&=E[XY]-\mu\nu.
\end{aligned}
$$

さらに $U=X-\mu$, $V=Y-\nu$ とおくと
$$
\begin{aligned}
\operatorname{Var}(aX+bY)
&=E[(aU+bV)^2]\\
&=E[a^2U^2+b^2V^2+2abUV]\\
&=a^2E[U^2]+b^2E[V^2]+2abE[UV]\\
&=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)
+2ab\operatorname{Cov}(X,Y).
\end{aligned}
$$

独立で二次モーメントが有限なら $E[XY]=E[X]E[Y]$ なので共分散は0です。逆は一般に成り立ちません。

## P2-THM-07 有限分割に対する全期待値・全分散

$H_1,\ldots,H_m$ を $P(H_i)>0$ の有限分割とします。二次モーメントが有限なら
$$
E[X]=\sum_{i=1}^mE[X\mid H_i]P(H_i),
$$
$$
\operatorname{Var}(X)=\sum_{i=1}^m\operatorname{Var}(X\mid H_i)P(H_i)
+\sum_{i=1}^m\{E[X\mid H_i]-E[X]\}^2P(H_i).
$$

### 証明

第1式は各条件付き分布にLOTUSを使い、分割上で足せば得ます。第2式では $\mu_i=E[X\mid H_i]$, $\mu=E[X]$ とおき、$H_i$ の下で
$$
X-\mu=(X-\mu_i)+(\mu_i-\mu)
$$
を二乗します。交差項の条件付き平均は $2(\mu_i-\mu)E[X-\mu_i\mid H_i]=0$ です。各 $i$ について平均し、事前確率で重み付けすれば結論を得ます。

## P2-THM-08 母関数の微分と独立和

PGFでは、対応するモーメントが有限なら
$$
G_X'(1-)=E[X],\qquad G_X''(1-)=E[X(X-1)].
$$
MGFが0の開近傍で有限なら、その近傍で微分でき
$$
M_X^{(r)}(0)=E[X^r].
$$
$X,Y$ が独立で各母関数が有限なら
$$
G_{X+Y}(s)=G_X(s)G_Y(s),\qquad M_{X+Y}(t)=M_X(t)M_Y(t).
$$

最後の積公式は $s^{X+Y}=s^Xs^Y$、$e^{t(X+Y)}=e^{tX}e^{tY}$ と独立な関数の期待値の積公式から従います。

### 微分交換の根拠

PGFは $0\leq s<1$ でべき級数を項別微分でき、

$$
G_X'(s)=\sum_{k=1}^{\infty}kP(X=k)s^{k-1}.
$$

$s\uparrow1$ では各項が非負で単調増加するため、単調収束定理から $G_X'(1-)=\sum_k kP(X=k)=E[X]$ です。二階微分も同様に $k(k-1)P(X=k)s^{k-2}$ へ単調収束定理を使います。

MGFが0の開近傍で有限なら、その近傍内に $\pm\delta$ を取って $M_X(\delta),M_X(-\delta)<\infty$ とできます。$|t|\leq\delta/2$ では、各固定次数 $r$ に対し定数 $C_r$ が存在して

$$
|X|^re^{tX}\leq C_r\{e^{\delta X}+e^{-\delta X}\}
$$

となります。右辺の期待値は有限なので優収束定理により期待値と微分を交換でき、$M_X^{(r)}(t)=E[X^re^{tX}]$、特に $t=0$ でモーメント公式を得ます。
