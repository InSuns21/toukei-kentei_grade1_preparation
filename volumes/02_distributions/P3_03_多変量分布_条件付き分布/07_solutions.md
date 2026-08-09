# 詳細解答集

## P3M-A01 解答

### 詳細解答

$$
E[2X-Y]=2E[X]-E[Y]=0.
$$
共分散の双線形性から
$$
\operatorname{Var}(2X-Y)
=4\operatorname{Var}(X)+\operatorname{Var}(Y)-4\operatorname{Cov}(X,Y)
=16+9-12=13.
$$

### 本番答案

$E[2X-Y]=0$、$\operatorname{Var}(2X-Y)=4\cdot4+9-4\cdot3=13$。

### 採点基準

平均3点、分散の交差項4点、計算3点。

## P3M-A02 解答

### 詳細解答

$\Sigma$が半正定値であるための必要十分条件は、対角成分が非負で行列式が非負となることです。ここでは
$$
|\Sigma|=36-c^2\geq0
$$
より$-6\leq c\leq6$です。標準偏差は2と3なので
$$
\rho=\frac{c}{2\cdot3}=\frac c6.
$$

### 本番答案

$|\Sigma|=36-c^2\geq0$より$|c|\leq6$。相関係数は$\rho=c/6$。

### 採点基準

半正定値条件5点、範囲2点、相関3点。

## P3M-A03 解答

### 詳細解答

周辺分布は対応する平均と対角分散を持つため
$$
X\sim N(1,4),\qquad Y\sim N(2,9).
$$
また線形変換の閉性と分散和から
$$
X+Y\sim N(1+2,4+9+2\cdot3)=N(3,19).
$$

### 本番答案

$X\sim N(1,4)$、$Y\sim N(2,9)$、$X+Y\sim N(3,19)$。

### 採点基準

周辺各3点、和の平均1点、分散3点。

## P3M-A04 解答

### 詳細解答

$$
\begin{aligned}
\rho_{12\cdot3}
&=\frac{1/2-(1/3)(1/4)}
{\sqrt{\{1-(1/3)^2\}\{1-(1/4)^2\}}}\\
&=\frac{5/12}{\sqrt{(8/9)(15/16)}}
=\frac{\sqrt{30}}{12}.
\end{aligned}
$$

### 本番答案

$\rho_{12\cdot3}=(5/12)/\sqrt{(8/9)(15/16)}=\sqrt{30}/12$。

### 採点基準

公式5点、分子2点、分母2点、整理1点。

## P3M-B01 解答

### 詳細解答

平均は
$$
A\boldsymbol\mu+\boldsymbol b
=\begin{pmatrix}1\\-2\end{pmatrix}
+\begin{pmatrix}0\\1\end{pmatrix}
=\begin{pmatrix}1\\-1\end{pmatrix}.
$$
また
$$
A\Sigma=
\begin{pmatrix}3&4&1\\1&2&-1\end{pmatrix},
$$
$$
A\Sigma A^{\mathsf T}
=\begin{pmatrix}7&3\\3&3\end{pmatrix}.
$$
従って
$$
\boldsymbol Y\sim N_2\left(
\begin{pmatrix}1\\-1\end{pmatrix},
\begin{pmatrix}7&3\\3&3\end{pmatrix}
\right).
$$

### 本番答案

$A\boldsymbol\mu+\boldsymbol b=(1,-1)^{\mathsf T}$、$A\Sigma A^{\mathsf T}=\begin{pmatrix}7&3\\3&3\end{pmatrix}$より、$\boldsymbol Y$はこれらを平均・共分散とする$N_2$に従う。

### 採点基準

平均3点、$A\Sigma$2点、共分散3点、分布結論2点。

## P3M-B02 解答

### 詳細解答

$\sigma_X=2$, $\sigma_Y=3$, $\rho=1/3$なので
$$
E[Y\mid X=x]
=1+\frac13\frac32x=1+\frac x2,
$$
$$
\operatorname{Var}(Y\mid X=x)=9\left(1-\frac19\right)=8.
$$
従って$Y\mid(X=x)\sim N(1+x/2,8)$です。

### 本番答案

$Y\mid(X=x)\sim N(1+x/2,8)$。条件付き分散は$x$に依存しない。

### 採点基準

平均5点、分散3点、分布結論2点。

## P3M-B03 解答

### 詳細解答

対称性より$E[X]=E[X^3]=0$なので
$$
\operatorname{Cov}(X,Y)=E[X^3]-E[X]E[X^2]=0.
$$
しかし$A=\{X>1/2\}$、$B=\{Y\leq1/4\}=\{|X|\leq1/2\}$とすると
$$
P(A\cap B)=0,\qquad P(A)P(B)=\frac14\cdot\frac12=\frac18.
$$
従って独立ではありません。一方、$(X,Y)$がjointly normalなら、共分散0から独立が従います。

### 本番答案

$E[X]=E[X^3]=0$より$\operatorname{Cov}(X,X^2)=0$。ただし$P(X>1/2,Y\leq1/4)=0\neq1/8=P(X>1/2)P(Y\leq1/4)$なので非独立。同時正規なら無相関から独立が従う。

### 採点基準

共分散3点、反例事象4点、非独立結論1点、正規の場合2点。

## P3M-B04 解答

### 詳細解答

$$
\Sigma^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$
正定値な共分散で白色化できるため$Q\sim\chi_2^2$です。$\boldsymbol x=(1,-1)^{\mathsf T}$では
$$
\Sigma^{-1}\boldsymbol x
=\begin{pmatrix}1\\-1\end{pmatrix},
\qquad
\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x=2.
$$

### 本番答案

$\Sigma^{-1}=3^{-1}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$。白色化により$Q\sim\chi_2^2$。$\boldsymbol x=(1,-1)^{\mathsf T}$で$Q=2$。

### 採点基準

逆行列4点、分布4点、数値2点。

## P3M-C01 解答

### 時間配分

初動3分、(1)2分、(2)7分、(3)3分、(4)5分、(5)3分、見直し2分。

### 詳細解答

$$
\rho=\frac3{\sqrt4\sqrt9}=\frac12.
$$
条件付き平均と分散は
$$
E[Y\mid X=4]
=-1+\frac34(4-2)=\frac12,
$$
$$
\operatorname{Var}(Y\mid X=4)
=9-\frac{3^2}{4}=\frac{27}{4}.
$$
従って
$$
Y\mid(X=4)\sim N\left(\frac12,\frac{27}{4}\right).
$$
閾値$1/2$は条件付き平均そのものなので、対称性から$P(Y>1/2\mid X=4)=1/2$です。逆向きには
$$
E[X\mid Y=y]=2+\frac39(y+1)=2+\frac{y+1}{3},
$$
$$
\operatorname{Var}(X\mid Y=y)=4-\frac{3^2}{9}=3.
$$

### 本番答案

$\rho=1/2$。正規条件付け公式より
$$
Y\mid(X=4)\sim N\left(-1+\frac34(4-2),9-\frac94\right)
=N\left(\frac12,\frac{27}{4}\right).
$$
従って$P(Y>1/2\mid X=4)=1/2$。また$E[X\mid Y=y]=2+(y+1)/3$、$\operatorname{Var}(X\mid Y=y)=3$。

### 採点基準と選択判断

相関3点、条件付き平均5点、分散5点、確率3点、逆向き平均5点、逆向き分散4点。3分で$\rho=1/2$と回帰係数$3/4$が見えれば選択し、15分で(3)まで進めば継続します。25分では逆向き係数$3/9$と分散3を残して閉じます。

## P3M-C02 解答

### 時間配分

初動3分、(1)5分、(2)6分、(3)7分、(4)3分、(5)2分、見直し2分。

### 詳細解答

任意の$(u,v,w)\neq(0,0,0)$に対し、対応する二次形式は
$$
\begin{aligned}
&4u^2+2uv+4uw+3v^2+2vw+2w^2\\
&\quad=4\left(u+\frac v4+\frac w2\right)^2
+\frac{11}{4}\left(v+\frac{2w}{11}\right)^2
+\frac{10}{11}w^2>0.
\end{aligned}
$$
従って共分散行列は正定値です。求める側を$\boldsymbol X_1=(X_1,X_2)^{\mathsf T}$、条件付ける側を$X_3$とすると
$$
\mu_1=\begin{pmatrix}0\\1\end{pmatrix},\quad
\Sigma_{11}=\begin{pmatrix}4&1\\1&3\end{pmatrix},\quad
\Sigma_{12}=\begin{pmatrix}2\\1\end{pmatrix},\quad
\Sigma_{22}=2.
$$
従って条件付き平均は
$$
\begin{pmatrix}0\\1\end{pmatrix}
+\begin{pmatrix}2\\1\end{pmatrix}\frac12(4-2)
=\begin{pmatrix}2\\2\end{pmatrix}.
$$
条件付き共分散は
$$
\begin{aligned}
\Sigma_{1\mid2}
&=\begin{pmatrix}4&1\\1&3\end{pmatrix}
-\begin{pmatrix}2\\1\end{pmatrix}\frac12
\begin{pmatrix}2&1\end{pmatrix}\\
&=\begin{pmatrix}2&0\\0&5/2\end{pmatrix}.
\end{aligned}
$$
条件付き分布も二変量正規で交差共分散が0なので、条件付きで$X_1,X_2$は独立です。周辺を取れば
$$
X_1\mid(X_3=4)\sim N(2,2).
$$

### 本番答案

二次形式は
$$
4\left(u+\frac v4+\frac w2\right)^2
+\frac{11}{4}\left(v+\frac{2w}{11}\right)^2
+\frac{10}{11}w^2>0
$$
（$(u,v,w)\neq0$）なので$\Sigma$は正定値。ブロック公式より
$$
E\left[\begin{pmatrix}X_1\\X_2\end{pmatrix}\middle|X_3=4\right]
=\begin{pmatrix}0\\1\end{pmatrix}
+\begin{pmatrix}2\\1\end{pmatrix}\frac12(2)
=\begin{pmatrix}2\\2\end{pmatrix},
$$
$$
\operatorname{Cov}\left(\begin{pmatrix}X_1\\X_2\end{pmatrix}\middle|X_3=4\right)
=\begin{pmatrix}4&1\\1&3\end{pmatrix}
-\frac12\begin{pmatrix}2\\1\end{pmatrix}\begin{pmatrix}2&1\end{pmatrix}
=\begin{pmatrix}2&0\\0&5/2\end{pmatrix}.
$$
条件付きでも同時正規かつ共分散0なので独立。$X_1\mid(X_3=4)\sim N(2,2)$。

### 採点基準と選択判断

平方完成による正定値5点、平均6点、共分散7点、独立性4点、周辺3点。3分で$2\times1$の交差ブロックが取れれば選択し、15分で条件付き平均まで進めば継続します。25分ではSchur補と「条件付き同時正規」を明記して閉じます。

## P3M-C03 解答

### 時間配分

初動3分、(1)4分、(2)5分、(3)5分、(4)4分、(5)4分、見直し2分。

### 詳細解答

標準化済みなので回帰係数は相関そのものです。
$$
R_1=X_1-0.5X_3,\qquad R_2=X_2-0.6X_3.
$$
従って
$$
\operatorname{Cov}(R_1,R_2)=0.3-(0.5)(0.6)=0,
$$
$$
\operatorname{Var}(R_1)=1-0.5^2=0.75,\qquad
\operatorname{Var}(R_2)=1-0.6^2=0.64.
$$
よって
$$
\rho_{12\cdot3}=\frac0{\sqrt{0.75\cdot0.64}}=0.
$$
三変量正規なら$(X_1,X_2)\mid X_3$は二変量正規で、その条件付き共分散は上の残差共分散0です。従って$X_3$を与えた下で$X_1,X_2$は条件付き独立です。

### 本番答案

$R_1=X_1-0.5X_3$, $R_2=X_2-0.6X_3$。残差共分散は$0.3-0.5\cdot0.6=0$、残差分散は$0.75,0.64$なので$\rho_{12\cdot3}=0$。三変量正規なら条件付き分布も正規で交差共分散0ゆえ、$X_1\perp\!\!\!\perp X_2\mid X_3$。

### 採点基準と選択判断

残差5点、共分散5点、分散5点、偏相関4点、条件付き独立6点。3分で標準化済みの回帰係数0.5,0.6が見えれば選択し、15分で残差分散まで進めば継続します。25分では正規仮定を明示して条件付き独立まで閉じます。

## P3M-C04 解答

### 時間配分

初動3分、(1)5分、(2)5分、(3)4分、(4)3分、(5)3分、見直し2分。

### 詳細解答

$$
E[\boldsymbol Z]=L^{-1}(E[\boldsymbol X]-\boldsymbol\mu)=\boldsymbol0,
$$
$$
\operatorname{Cov}(\boldsymbol Z)
=L^{-1}\Sigma L^{-\mathsf T}
=L^{-1}LL^{\mathsf T}L^{-\mathsf T}=I_p.
$$
アフィン変換の閉性から$\boldsymbol Z\sim N_p(\boldsymbol0,I_p)$で、交差共分散0のjointly normalな成分なので$Z_1,\ldots,Z_p$は独立です。$\Sigma^{-1}=L^{-\mathsf T}L^{-1}$より
$$
(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
=\boldsymbol Z^{\mathsf T}\boldsymbol Z.
$$
従って二次形式は$\sum_iZ_i^2\sim\chi_p^2$です。標準正規MGF $M_Z(t)=e^{t^2/2}$ を4回微分して$t=0$を代入すると$E[Z_i^4]=M_Z^{(4)}(0)=3$です。従って$E[Z_i^2]=1$、$\operatorname{Var}(Z_i^2)=3-1=2$です。独立和なので平均$p$、分散$2p$です。

### 本番答案

$E[\boldsymbol Z]=0$、$\operatorname{Cov}(\boldsymbol Z)=L^{-1}LL^{\mathsf T}L^{-\mathsf T}=I_p$。従って$\boldsymbol Z\sim N_p(0,I_p)$で成分は独立。$\Sigma^{-1}=L^{-\mathsf T}L^{-1}$より
$$
(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol X-\boldsymbol\mu)
=\boldsymbol Z^{\mathsf T}\boldsymbol Z=\sum_{i=1}^pZ_i^2\sim\chi_p^2.
$$
$E[Z_i^2]=1$, $\operatorname{Var}(Z_i^2)=3-1=2$より、平均$p$、分散$2p$。

### 採点基準と選択判断

平均共分散6点、正規性独立性5点、二次形式5点、分布4点、平均分散5点。3分で$L^{-1}$による白色化が見えれば選択し、15分で$N_p(0,I_p)$まで進めば継続します。25分では$\Sigma^{-1}=L^{-\mathsf T}L^{-1}$と平方和を残して閉じます。

## P3M-C05 解答

### 時間配分

初動3分、各小問4分、見直し2分。

### 詳細解答

1. 正しい。任意の$\boldsymbol a$に対して$\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0$で、共分散の対称性もある。
2. 誤り。$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$とする。対称性から$E[X]=E[X^3]=0$なので$\operatorname{Cov}(X,Y)=0$である。一方、$A=\{X>1/2\}$、$B=\{Y\leq1/4\}$とすれば$P(A\cap B)=0$だが$P(A)P(B)=(1/4)(1/2)=1/8$なので独立でない。
3. 正しい。同時正規で交差共分散0ならMGFが周辺MGFの積へ因数分解される。
4. 誤り。条件付き共分散$\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$は観測値に依存しない。
5. 正しい。成分選択はアフィン変換なので、多変量正規性が保たれる。

### 本番答案

(1)正。$\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0$。(2)誤。$X\sim$Unif$(-1,1)$、$Y=X^2$では$E[X]=E[X^3]=0$より共分散0。しかし$A=\{X>1/2\}$、$B=\{Y\leq1/4\}$で$P(A\cap B)=0\neq1/8=P(A)P(B)$なので非独立。(3)正。同時正規かつ共分散0ならMGF因数分解により独立。(4)誤。Schur補は観測値を含まない。(5)正。部分ベクトルは成分選択という線形変換である。

### 採点基準と選択判断

各5点。正誤1点、根拠または反例4点。3分で(2)の反例と(4)のSchur補が見えれば選択し、15分で3項以上完成すれば継続します。25分では全項に「正規仮定の有無」を補って閉じます。

## P3M-D01 解答

### 時間配分

次元確認4分、(1)7分、(2)10分、(3)(4)各5分、(5)6分、見直し3分。

### 詳細解答

$B=\Sigma_{12}\Sigma_{22}^{-1}$は$p\times q$です。中心化した変数を用いると
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
&=\Sigma_{12}-B\Sigma_{22}\\
&=\Sigma_{12}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{22}=0.
\end{aligned}
$$
また
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
&=\Sigma_{11}-\Sigma_{12}B^{\mathsf T}-B\Sigma_{21}
+B\Sigma_{22}B^{\mathsf T}\\
&=\Sigma_{11}-2\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
+\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\\
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}
=\Sigma_{1\mid2}.
\end{aligned}
$$
$\Sigma_{22}$は対称なので逆行列も対称であることを使いました。$(\boldsymbol R,\boldsymbol X_2)$は$(\boldsymbol X_1,\boldsymbol X_2)$のアフィン変換なのでjointly normalです。交差共分散が0であるため、正規分布の性質から$\boldsymbol R$と$\boldsymbol X_2$は独立です。また
$$
\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2}).
$$
恒等式
$$
\boldsymbol X_1
=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R
$$
で$\boldsymbol X_2=\boldsymbol x_2$を固定しても、独立な$\boldsymbol R$の分布は変わりません。従って
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)
\sim N_p\left(
\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}
(\boldsymbol x_2-\boldsymbol\mu_2),
\Sigma_{1\mid2}
\right).
$$

### 本番答案

$B=\Sigma_{12}\Sigma_{22}^{-1}$、$\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)$とすると
$$
\operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)=\Sigma_{12}-B\Sigma_{22}=0,
$$
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol R)
&=\Sigma_{11}-\Sigma_{12}B^{\mathsf T}-B\Sigma_{21}+B\Sigma_{22}B^{\mathsf T}\\
&=\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}=\Sigma_{1\mid2}.
\end{aligned}
$$
$(\boldsymbol R,\boldsymbol X_2)$はjointly normalで無相関なので独立し、$\boldsymbol R\sim N_p(\boldsymbol0,\Sigma_{1\mid2})$。$\boldsymbol X_1=\boldsymbol\mu_1+B(\boldsymbol X_2-\boldsymbol\mu_2)+\boldsymbol R$へ$\boldsymbol X_2=\boldsymbol x_2$を入れれば
$$
\boldsymbol X_1\mid(\boldsymbol X_2=\boldsymbol x_2)\sim N_p\left(\boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2),\Sigma_{1\mid2}\right).
$$

### 採点基準と選択判断

次元3点、交差共分散7点、残差共分散10点、正規性5点、独立性5点、条件付き分布7点。3分で残差化が見えなければ後回しにします。15分で交差共分散0まで得られれば継続し、25分でSchur補まで完成しなければ途中式を残して打ち切ります。完成した場合は独立残差の平行移動として閉じます。
