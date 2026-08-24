# 詳細解答

## 問題別の詳細解答

ここでは、上の計算結果で省略した立式、使用した仮定、検算を問題IDごとに補う。本番答案ではなく、初回学習時に途中式を再現するための層である。

### P3L-A01

**方針。** 潜在成分を $Z=1,2$ に分け、全確率の公式を使う。

$$
\begin{aligned}
P(X=0)
&=P(Z=1)P(X=0\mid Z=1)+P(Z=2)P(X=0\mid Z=2)\\
&=0.4\cdot0.2+0.6\cdot0.5\\
&=0.08+0.30=0.38.
\end{aligned}
$$
各項は「その成分を選び、さらに0を観測する」同時確率である。$0\le0.38\le1$ なので確率の範囲にも入る。

### P3L-A02

**方針。** 条件付き平均を混合比で重み付けする。

$$
\begin{aligned}
E[X]
&=E\{E[X\mid Z]\}\\
&=P(Z=1)E[X\mid Z=1]+P(Z=2)E[X\mid Z=2]\\
&=\frac14\cdot2+\frac34\cdot6=5.
\end{aligned}
$$
結論5は二つの条件付き平均2と6の間にあり、重み付き平均として妥当である。

### P3L-A03

**方針。** 全分散を群内変動と群間変動へ分ける。

条件付き分散の平均は
$$
E\{\operatorname{Var}(X\mid Z)\}
=\frac12\cdot1+\frac12\cdot4=\frac52.
$$
条件付き平均を $\mu_1=0,\mu_2=2$ とすると、その分散は
$$
\operatorname{Var}\{E[X\mid Z]\}
=\frac12(0-1)^2+\frac12(2-1)^2=1.
$$
したがって
$$
\operatorname{Var}(X)=\frac52+1=\frac72.
$$
群間項が非負なので、周辺分散が群内分散平均 $5/2$ より大きいことも確認できる。

### P3L-A04

**方針。** Bayes公式の分母を全確率で先に求める。

$$
P(X=x)=\frac13\cdot\frac12+\frac23\cdot\frac14=\frac13.
$$
分子は
$$P(Z=1,X=x)=P(Z=1)P(X=x\mid Z=1)=\frac16.$$
よって
$$P(Z=1\mid X=x)=\frac{1/6}{1/3}=\frac12.$$
同様に第2成分の事後確率も $1/2$ で、二つの責務の和が1になる。

### P3L-B01

**方針。** 成分別Poisson質量を混合し、モーメントは全期待値・全分散で求める。

$Z=1$ の率を1、$Z=2$ の率を4とすると
$$
\begin{aligned}
P(X=k)
&=\sum_{z=1}^2P(Z=z)P(X=k\mid Z=z)\\
&=\frac13e^{-1}\frac{1^k}{k!}
+\frac23e^{-4}\frac{4^k}{k!},\qquad k\in\mathbb N_0.
\end{aligned}
$$
平均は
$$E[X]=\frac13\cdot1+\frac23\cdot4=3.$$
Poisson分布では条件付き平均と条件付き分散がともに率なので
$$E\{\operatorname{Var}(X\mid Z)\}=3.$$
また
$$
\operatorname{Var}\{E[X\mid Z]\}
=\frac13(1-3)^2+\frac23(4-3)^2=2.
$$
従って $\operatorname{Var}(X)=3+2=5$。混合による群間変動のため、分散が平均を上回る。

### P3L-B02

**方針。** Poisson条件付き質量とGamma密度を掛け、$\lambda$ を積分して消去する。

$$
\begin{aligned}
P(X=k)
&=\int_0^\infty
e^{-\lambda}\frac{\lambda^k}{k!}
\frac{3^2}{\Gamma(2)}\lambda^{2-1}e^{-3\lambda}\,d\lambda\\
&=\frac9{k!\Gamma(2)}
\int_0^\infty\lambda^{k+1}e^{-4\lambda}\,d\lambda.
\end{aligned}
$$
$t=4\lambda$ と置くと
$$
\int_0^\infty\lambda^{k+1}e^{-4\lambda}\,d\lambda
=\frac1{4^{k+2}}\int_0^\infty t^{k+1}e^{-t}\,dt
=\frac{\Gamma(k+2)}{4^{k+2}}.
$$
したがって
$$
P(X=k)
=\frac{9\Gamma(k+2)}{k!\Gamma(2)4^{k+2}}
=\frac{9(k+1)}{4^{k+2}},\qquad k\in\mathbb N_0.
$$
平均・分散は全期待値・全分散から
$$E[X]=E[\Lambda]=\frac23,$$
$$
\operatorname{Var}(X)
=E[\Lambda]+\operatorname{Var}(\Lambda)
=\frac23+\frac29=\frac89.
$$
確率質量の和は $\frac9{16}\sum_{k\ge0}(k+1)4^{-k}=1$ となる。

### P3L-B03

**方針。** 正規成分の分散1を群内項、平均差3を群間項として扱う。

$$E[X]=\pi\cdot0+(1-\pi)\cdot3=3(1-\pi).$$
全分散より
$$
\begin{aligned}
\operatorname{Var}(X)
&=E\{\operatorname{Var}(X\mid Z)\}
+\operatorname{Var}\{E[X\mid Z]\}\\
&=1+\pi(1-\pi)(0-3)^2\\
&=1+9\pi(1-\pi).
\end{aligned}
$$
$0<\pi<1$ なら群間項が正なので分散は1より大きい。平均が1なら
$3(1-\pi)=1$ から $\pi=2/3$ である。

### P3L-B04

**方針。** 正規密度の共通定数を消去し、指数部だけ比較する。

事前重みが $1/4,3/4$ なので
$$
\tau_1(x)=\frac{(1/4)\phi(x)}{(1/4)\phi(x)+(3/4)\phi(x-3)}
=\frac{\phi(x)}{\phi(x)+3\phi(x-3)}.
$$
$x=3$ では $\phi(3)=e^{-9/2}\phi(0)$ だから
$$
\tau_1(3)
=\frac{e^{-9/2}}{e^{-9/2}+3}
=0.00369\ldots.
$$
$x=3/2$ では二つの尤度が等しいが、事前重みは等しくないので
$$\tau_1(3/2)=\frac{1}{1+3}=\frac14.$$
$x=0$ では
$$
\tau_1(0)
=\frac{\phi(0)}{\phi(0)+3\phi(-3)}
=\frac1{1+3e^{-9/2}}
=0.9677\ldots,
$$
従って $\tau_1(0)>\tau_1(3)$ も数値で確認できる。
「尤度が同じなら事後確率が1/2」とは限らないことが分かる。

### P3L-C01

**方針。** 各 $\Lambda_i$ を積分して周辺分布を得た後、同じ階層表現から推定量の性質を調べる。

Poisson質量とGamma密度を掛けると
$$
\begin{aligned}
P(X_i=k)
&=\int_0^\infty
e^{-\lambda}\frac{\lambda^k}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda\\
&=\frac{\beta^\alpha\Gamma(k+\alpha)}
{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.
\end{aligned}
$$
全期待値と全分散を一段ずつ使うと
$$E[X_i]=E[\Lambda_i]=\frac{\alpha}{\beta},$$
$$
\operatorname{Var}(X_i)
=E[\Lambda_i]+\operatorname{Var}(\Lambda_i)
=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
$$
$X_i$ は独立なので
$$
E[\bar X]=\frac{\alpha}{\beta},\qquad
\operatorname{Var}(\bar X)
=\frac{\alpha(\beta+1)}{n\beta^2}.
$$
従って任意の $\varepsilon>0$ について
$$
P\left(\left|\bar X-\frac{\alpha}{\beta}\right|\ge\varepsilon\right)
\le\frac{\alpha(\beta+1)}
{n\beta^2\varepsilon^2}\to0.
$$
これは設問どおり $\bar X\xrightarrow{p}\alpha/\beta$ を示す。また $\widehat\alpha=\beta\bar X$ は不偏であり、
$$
P(|\widehat\alpha-\alpha|\ge\varepsilon)
\le\frac{\alpha(\beta+1)}{n\varepsilon^2}\to0
$$
なので一致推定量でもある。

### P3L-C02

**方針。** $X=3$ で成分を更新し、その事後成分確率を $Y$ の予測へ再利用する。

成分別尤度を $q_1=e^{-2}2^3/3!$、$q_2=e^{-5}5^3/3!$ とおくと
$$P(X=3)=\pi q_1+(1-\pi)q_2,$$
$$
\tau_1=P(Z=1\mid X=3)
=\frac{\pi q_1}{\pi q_1+(1-\pi)q_2}.
$$
$X,Y$ は $Z$ を条件に独立なので
$$
\begin{aligned}
P(Y=0\mid X=3)
&=\sum_{z=1}^2P(Y=0\mid Z=z)P(Z=z\mid X=3)\\
&=\tau_1e^{-2}+(1-\tau_1)e^{-5}.
\end{aligned}
$$
$\pi=1/2$ では $3!$ と共通因子を消去して
$$\tau_1=\frac{8e^3}{8e^3+125}.$$
従って
$$
\begin{aligned}
P(Y=0\mid X=3)
&=\frac{8e^3}{8e^3+125}e^{-2}
+\frac{125}{8e^3+125}e^{-5}\\
&=\frac{8e+125e^{-5}}{8e^3+125}
=0.0791\ldots.
\end{aligned}
$$
予測確率は $e^{-5}$ と $e^{-2}$ の重み付き平均なので、その間に入る。
観測 $X=3$ に対する成分別尤度 $q_1,q_2$ が異なるため、観測後の成分重みは事前の $\pi,1-\pi$ から $\tau_1,1-\tau_1$ へ更新される。従って予測で事前の $\pi$ をそのまま使ってはならない。

### P3L-C03

**方針。** 責務の大小を二つの正規密度の距離比較へ直す。

等混合比なので
$$
\tau_2(x)
=\frac{\phi(x-1)}{\phi(x+1)+\phi(x-1)}.
$$
従って
$$
\tau_2(x)>\frac12
\iff\phi(x-1)>\phi(x+1)
\iff(x-1)^2<(x+1)^2
\iff x>0.
$$
したがって分類規則は $x>0$ なら第2成分である。第1成分 $N(-1,1)$ を第2成分へ誤分類する確率は
$$P_{N(-1,1)}(X>0)=1-\Phi(1)=\Phi(-1).$$
第2成分を第1成分へ誤分類する確率も対称性から $\Phi(-1)$ なので、全誤分類確率も $\Phi(-1)$ である。
全期待値・全分散から $E[X]=0$、$\operatorname{Var}(X)=1+1=2$。一般の混合比では
$$E[X]=-\pi+(1-\pi)=1-2\pi,$$
よって形式解 $\widehat\pi_0=(1-\bar X)/2$ を得る。母数空間を守るには $[0,1]$ へ射影する。
すなわち
$$
\widehat\pi
=\min\{1,\max\{0,\widehat\pi_0\}\}.
$$

### P3L-C04

**方針。** 潜在ラベルが見える完全データと、見えない観測データの尤度を分ける。

$I_i=\boldsymbol1_{\{Z_i=1\}}$ とおけば
$$
L_c(\pi)=\prod_i\{\pi f_1(x_i)\}^{I_i}
\{(1-\pi)f_2(x_i)\}^{1-I_i}.
$$
$n_1=\sum I_i$ として
$$
\ell_c(\pi)=n_1\log\pi+(n-n_1)\log(1-\pi)+\text{const}.
$$
$0<n_1<n$ なら
$$
\ell_c'(\pi)=\frac{n_1}{\pi}-\frac{n-n_1}{1-\pi}=0
\iff\widehat\pi=\frac{n_1}{n}.
$$
$n_1=0$ なら尤度は $1-\pi$ の側で最大となり $\widehat\pi=0$、$n_1=n$ なら $\widehat\pi=1$ である。
ラベルが見えないと各観測の周辺密度は
$$\pi f_1(x_i)+(1-\pi)f_2(x_i),$$
したがって観測尤度はその積になる。責務
$$
\tau_{i1}
=\frac{\pi f_1(x_i)}{\pi f_1(x_i)+(1-\pi)f_2(x_i)}
=E[I_i\mid X_i=x_i]
$$
は、見えない所属指示変数を条件付き期待値で置き換える量である。
特に設問の現在値 $\pi=1/2$ では
$$
\tau_{i1}=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.
$$

### P3L-C05

**方針。** ラベル交換による非識別と、平均・分散だけでは足りない非識別を別々に示す。

全期待値・全分散から一般に
$$
E[X]=\pi\mu_1+(1-\pi)\mu_2,
$$
$$
\operatorname{Var}(X)
=1+\pi(1-\pi)(\mu_1-\mu_2)^2.
$$
成分1と2の名前を交換して
$$
(\pi,\mu_1,\mu_2)\mapsto(1-\pi,\mu_2,\mu_1)
$$
としても混合密度は変わらない。$\mu_1<\mu_2$ のような順序制約は、この二重表現を一つに絞る。

平均0・分散2について、まず
$$
(\pi,\mu_1,\mu_2)=\left(\frac12,-1,1\right)
$$
が条件を満たす。次に $\pi=1/4$、$d=4/\sqrt3$、
$$\mu_1=-\frac{3d}{4},\qquad\mu_2=\frac d4$$
とおくと
$$
\frac14\mu_1+\frac34\mu_2=0,
$$
$$
\operatorname{Var}(X)
=1+\frac14\frac34(\mu_1-\mu_2)^2
=1+\frac3{16}d^2=2.
$$
異なる母数が同じ二つのモーメントを与えるため、平均・分散だけでは識別できない。

実データへ使う前には、少なくとも次を確認する。

1. **成分数と分布形。** 成分数を増やせば当てはまりは改善しやすいが、標本中の偶然の群や外れ値を独立成分と誤認する危険がある。ヒストグラムや残差で正規成分の仮定も確認する。
2. **分散・外れ値・ラベル。** 共通分散の仮定が不適切なら、裾の厚い一群を複数成分へ分割することがある。推定結果を比較するときは、ラベル交換を考慮して平均の順序などで対応付ける。

### P3L-D01

**方針。** 周辺化、モーメント、不偏・一致推定、事後予測を同じPoisson--Gamma階層でつなぐ。

周辺質量は潜在率を積分して
$$
\begin{aligned}
P(X_i=k)
&=\int_0^\infty
e^{-\lambda}\frac{\lambda^k}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}\,d\lambda\\
&=
\frac{\beta^\alpha\Gamma(k+\alpha)}
{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.
\end{aligned}
$$
さらに
$$
E[X_i]=\frac{\alpha}{\beta},\qquad
\operatorname{Var}(X_i)=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
$$
$X_i$ の独立性より
$$
\operatorname{Var}(\bar X)
=\frac1n\left(\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}\right)
=\frac{\alpha(\beta+1)}{n\beta^2}.
$$
$\widehat\alpha=\beta\bar X$ について
$$
E[\widehat\alpha]=\alpha,\qquad
\operatorname{Var}(\widehat\alpha)
=\frac{\alpha(\beta+1)}n\to0,
$$
従って任意の $\varepsilon>0$ について
$$
P(|\widehat\alpha-\alpha|\ge\varepsilon)
\le\frac{\alpha(\beta+1)}{n\varepsilon^2}\to0,
$$
すなわち $\widehat\alpha\xrightarrow{p}\alpha$ である。

$X_1=x$ の尤度 $\lambda^xe^{-\lambda}$ と事前密度を掛けると
$$
\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}
$$
に比例する。よって
$$\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1).$$
$Y$ が同じ $\Lambda_1$ を共有し、条件付きで $X_1$ と独立なら
$$
\begin{aligned}
P(Y=0\mid X_1=x)
&=E[P(Y=0\mid\Lambda_1)\mid X_1=x]\\
&=E[e^{-\Lambda_1}\mid X_1=x]\\
&=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.
\end{aligned}
$$
最後の等式はGamma$(a,b)$ のLaplace変換
$E[e^{-t\Lambda}]=\{b/(b+t)\}^a$ による。ここでは直接、
$$
\begin{aligned}
E[e^{-\Lambda_1}\mid X_1=x]
&=\int_0^\infty e^{-\lambda}
\frac{(\beta+1)^{\alpha+x}}{\Gamma(\alpha+x)}
\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}\,d\lambda\\
&=\frac{(\beta+1)^{\alpha+x}}{(\beta+2)^{\alpha+x}}
\frac{\Gamma(\alpha+x)}{\Gamma(\alpha+x)}\\
&=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}
\end{aligned}
$$
と確認できる。

第5問で $\beta$ も未知とする。$m=E[X]=\alpha/\beta$、
$v=\operatorname{Var}(X)$ とおき、
$$q=v-m=\frac{\alpha}{\beta^2}$$
とする。$m>0,q>0$ なら
$$
\frac{m}{q}
=\frac{\alpha/\beta}{\alpha/\beta^2}
=\beta,
\qquad
\alpha=m\beta=\frac{m^2}{q}.
$$
従って平均だけでは比 $\alpha/\beta$ しか分からないが、分散を加えて $q>0$ が得られれば
$$
\beta=\frac{m}{v-m},\qquad
\alpha=\frac{m^2}{v-m}
$$
として二母数を分離できる。

## C・D問題の本番答案

### P3L-C01（25分・25点）

周辺化して
$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
全期待値・全分散より
$$E[X_i]=E[\bar X]=\frac{\alpha}{\beta},\quad \operatorname{Var}(X_i)=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2},\quad \operatorname{Var}(\bar X)=\frac{\alpha(\beta+1)}{n\beta^2}.$$
よって $\widehat\alpha=\beta\bar X$ は不偏で、Chebyshevにより $\bar X\xrightarrow{p}\alpha/\beta$。配点は周辺化6、モーメント6、不偏4、推定4、一致性5点とする。

### P3L-C02（26分・25点）

$$\tau_1=\frac{\pi e^{-2}2^3}{\pi e^{-2}2^3+(1-\pi)e^{-5}5^3},\qquad
P(Y=0\mid X=3)=\tau_1e^{-2}+(1-\tau_1)e^{-5}.$$
$\pi=1/2$ では $\tau_1=8e^3/(8e^3+125)$ を代入し、
$$P(Y=0\mid X=3)=\frac{8e+125e^{-5}}{8e^3+125}=0.0791\ldots.$$
配点は周辺化5、責務7、予測7、数値代入4、説明2点とする。
このとき
$$P(X=3)=\frac12e^{-2}\frac{2^3}{3!}+\frac12e^{-5}\frac{5^3}{3!},$$
であり、観測 $X=3$ によって二成分の尤度が異なるため、予測で事前重み $\pi$ をそのまま使ってはならない。

### P3L-C03（25分・25点）

$$\tau_2(x)=\frac{\phi(x-1)}{\phi(x+1)+\phi(x-1)},\quad
\tau_2(x)>1/2\iff x>0.$$
誤分類確率は $\Phi(-1)$、平均0、分散2。混合比の形式推定量は $\widehat\pi_0=(1-\bar X)/2$、制約付きなら $\widehat\pi=\min\{1,\max\{0,\widehat\pi_0\}\}$。配点は責務6、閾値5、誤分類5、モーメント4、推定5点とする。

### P3L-C04（24分・25点）

$$L_c=\prod_i\{\pi f_1(x_i)\}^{\boldsymbol1_{\{z_i=1\}}}\{(1-\pi)f_2(x_i)\}^{\boldsymbol1_{\{z_i=2\}}},\quad
\widehat\pi=\frac1n\sum_i\boldsymbol1_{\{z_i=1\}},$$
$$L=\prod_i[\pi f_1(x_i)+(1-\pi)f_2(x_i)],\quad
\tau_{i1}=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.$$
責務は指示関数の条件付き期待値である。配点は完全尤度6、最尤推定5、観測尤度5、責務6、解釈3点とする。
ただし $n_1=0$ なら境界解 $\widehat\pi=0$、$n_1=n$ なら $\widehat\pi=1$。現在の $\pi=1/2$ では
$$\tau_{i1}=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.$$

### P3L-C05（25分・25点）

ラベル交換
$(\pi,\mu_1,\mu_2)\mapsto(1-\pi,\mu_2,\mu_1)$
は同じ密度を与え、$\mu_1<\mu_2$ が重複を除く。
$$E[X]=\pi\mu_1+(1-\pi)\mu_2,\quad
\operatorname{Var}(X)=1+\pi(1-\pi)(\mu_1-\mu_2)^2.$$
平均0・分散2の二つの表示 $(1/2,-1,1)$ と
$(1/4,-3d/4,d/4)$、$d=4/\sqrt3$ があるため、二つのモーメントだけでは識別できない。適用前には成分数・正規性・分散仮定・外れ値・ラベル対応を確認する。配点は交換4、制約4、モーメント5、反例8、モデル注意4点とする。

### C問題の時間判断

C01は3分で階層式、15分で周辺化・モーメント、25分で一致性まで進む。C02は3分で責務の分子分母、15分で観測後重み、25分で予測確率まで進む。C03は3分で閾値、15分で誤分類確率、25分で推定量まで進む。C04は3分で完全データ、15分で観測尤度、25分で責務の解釈まで進む。C05は3分でラベル交換、15分でモーメント、25分で具体的非識別例とモデル注意まで進む。

小問別の目安は、C01が4・5・3・4・9分、C02が4・5・5・7・5分、C03が4・4・6・5・6分、C04が5・6・5・5・3分、C05が3・3・5・8・6分である。前半を失った場合は問題文の復帰用与式から後半へ進む。

### P3L-D01（40分・25点）

周辺化、全期待値・全分散、$\widehat\alpha=\beta\bar X$ の不偏性・Chebyshev一致性、共有潜在率の事後分布
$$\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1)$$
を順に書き、予測確率を
$$P(Y=0\mid X_1=x)=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}$$
とする。$\operatorname{Var}(\bar X)=\alpha(\beta+1)/(n\beta^2)$ である。$\beta$ も未知なら $m=E[X]$、$q=\operatorname{Var}(X)-m>0$ から
$$\beta=m/q,\qquad\alpha=m^2/q.$$
配点は周辺化6、モーメント5、推定6、予測6、識別注意2点とする。15分で1・2、25分で3まで到達し、4・5は式を残して部分点を確保する。
小問別の目安は1が8分、2が6分、3が8分、4が10分、5が8分である。

## 全問の解答構造・検算一覧

| ID | 方針 | 使用結果・仮定 | 結論・検算 | 本番答案・採点 |
|---|---|---|---|---|
| P3L-A01 | 全確率を成分ごとに足す | $\pi=0.4$ と条件付き確率 | $0.38\in[0,1]$ | A01の1行答案、7点 |
| P3L-A02 | 全期待値 | 成分比と条件付き平均 | $E[X]=5$ | A02の1行答案、7点 |
| P3L-A03 | 全分散を群内・群間に分解 | 条件付き分散・平均 | $7/2\geq0$ | A03の2行答案、8点 |
| P3L-A04 | Bayes公式 | 分母は全成分の周辺確率 | 責務 $1/2$、成分責務の和を確認 | A04の1行答案、8点 |
| P3L-B01 | 条件付き質量を足し、全分散 | Poissonの平均・分散は率 | $E=3,V=5$、$V\geq E$ を検算 | B01の3小問答案、14点 |
| P3L-B02 | Poisson質量とGamma密度を積分 | Gamma積分、$\alpha=2,\beta=3$ | 負の二項型質量、$E=2/3,V=8/9$ | B02の3小問答案、16点 |
| P3L-B03 | 全期待値・全分散 | 正規成分の分散1 | $E=3(1-\pi),V=1+9\pi(1-\pi)$ | B03の3小問答案、15点 |
| P3L-B04 | 責務をBayes公式に代入 | $\phi(3)=e^{-9/2}\phi(0)$ | $\tau_1(3)\approx0.00369$、確率範囲を確認 | B04の3小問答案、15点 |
| P3L-C01 | 周辺化からモーメント推定へ | 独立同分布、$\beta$既知、Chebyshev | $\widehat\alpha$不偏・確率収束 | C01答案・25点 |
| P3L-C02 | 観測後責務を予測へ再利用 | $Y$ は共有成分を条件に独立 | 責務の和1、予測確率は[0,1] | C02答案・25点 |
| P3L-C03 | 責務の大小を平方距離で比較 | 等分散・等混合比 | 閾値0、誤分類 $\Phi(-1)$、制約付き推定 | C03答案・25点 |
| P3L-C04 | 完全データと観測尤度を分離 | $0<n_1<n$ と境界を場合分け | $n_1/n$ または境界0,1、責務は指示関数の条件付き期待値 | C04答案・25点 |
| P3L-C05 | ラベル交換後と具体的モーメント反例 | $\mu_1<\mu_2$、$d=4/\sqrt3$ | 同じ平均・分散の異なる母数、識別不能 | C05答案・25点 |
| P3L-D01 | 周辺化→モーメント→推定→共有率の予測 | $X_1,Y$ は $\Lambda_1$ を共有 | 事後Gammaと予測確率、平均だけでは比のみ | D01答案・25点 |

各行の結論・検算は詳細解答で示した計算を短く再掲したものであり、本番答案では対応する行を残す。非自明な積分・分散展開・境界・確率収束は詳細解答側で展開し、採点基準は上表とC/D節で一対一に対応する。
