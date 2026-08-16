# 利用公式・定理・定義

このファイルをカード教材で利用する公式・定理・定義の正本とする。カードでは、ここへのリンクだけで済ませず、実際に使う項目を「使用公式・定理」欄へ再掲する。

## 確率

- 等確率な有限標本空間：各結果が等確率なら、事象 $A$ について $P(A)=|A|/|\Omega|$。
- 包除原理：$P(A\cup B)=P(A)+P(B)-P(A\cap B)$。
- 3事象の包除原理：$P(A\cup B\cup C)=P(A)+P(B)+P(C)-P(A\cap B)-P(A\cap C)-P(B\cap C)+P(A\cap B\cap C)$。
- 条件付き確率：$P(A\mid B)=P(A\cap B)/P(B)$（$P(B)>0$）。
- 乗法公式：$P(A\cap B)=P(A\mid B)P(B)$（$P(B)>0$）。
- 連鎖則：必要な条件付き確率が定義できるとき、$P(A\cap B\cap C)=P(A)P(B\mid A)P(C\mid A\cap B)$。
- 補集合：$P(A)=1-P(A^c)$。
- Bayesの定理：$P(A_i\mid B)=P(B\mid A_i)P(A_i)/\sum_jP(B\mid A_j)P(A_j)$。
- 全確率の公式：分割 $A_1,\ldots,A_k$ に対し $P(B)=\sum_jP(B\mid A_j)P(A_j)$。
- 独立性：$A,B$ が独立なら $P(A\cap B)=P(A)P(B)$。
- 相互独立：$A_1,\ldots,A_n$ は、2個以上を選ぶすべての部分集合 $J$ について $P(\bigcap_{j\in J}A_j)=\prod_{j\in J}P(A_j)$ を満たすとき相互独立である。ペアごとの独立だけでは足りない。
- 事象列の上極限・下極限：$\limsup_{n\to\infty}A_n=\bigcap_{n=1}^{\infty}\bigcup_{k=n}^{\infty}A_k$ は無限回起こる事象、$\liminf_{n\to\infty}A_n=\bigcup_{n=1}^{\infty}\bigcap_{k=n}^{\infty}A_k$ は十分先では常に起こる事象。
- Booleの不等式：有限または可算個の事象に対して $P(\bigcup_iA_i)\le\sum_iP(A_i)$。
- Borel--Cantelliの補題（基本形）：$\sum_{n=1}^{\infty}P(A_n)<\infty$ なら $P(\limsup_{n\to\infty}A_n)=0$。この向きには独立性を仮定しない。

## 分布・モーメント

- 累積分布関数：離散分布では $F_X(x)=\sum_{u\le x}p_X(u)$。
- 確率質量関数の条件：$p_X(x)\ge0$ かつ $\sum_xp_X(x)=1$。
- 累積分布関数の条件：$F_X$ は非減少かつ右連続で、$\lim_{x\to-\infty}F_X(x)=0$、$\lim_{x\to\infty}F_X(x)=1$。
- 連続分布の累積分布関数：$F_X(x)=\int_{-\infty}^x f_X(u)\,du$。$F_X$ が微分可能な点では $f_X(x)=F_X'(x)$。
- 区間確率：$P(a<X\le b)=F_X(b)-F_X(a)$、$P(a\le X\le b)=F_X(b)-F_X(a-)$。
- 累積分布関数の跳び：$P(X=a)=F_X(a)-F_X(a-)$、$F_X(a-)=\lim_{x\uparrow a}F_X(x)$。
- 混合分布の累積分布関数：点質量と連続部分があるとき、$F_X(x)=\sum_{u\le x}P(X=u)+\int_{-\infty}^x f_{\mathrm{cont}}(u)\,du$。
- 密度の正規化：$f_X(x)\ge0$ かつ $\int_{-\infty}^{\infty}f_X(x)\,dx=1$。
- 生存関数と危険率：$S_X(x)=1-F_X(x)$、$S_X(x)>0$ なら $h_X(x)=f_X(x)/S_X(x)$。
- 累積危険率：$S_X(x)>0$ で $H_X(x)=-\log S_X(x)$。非負で絶対連続な寿命分布かつ $S_X(0)=1$ なら $H_X(x)=\int_0^x h_X(u)\,du$、従って $S_X(x)=e^{-H_X(x)}$。
- 周辺密度と条件付き密度：$f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy$、$f_X(x)>0$ なら $f_{Y\mid X}(y\mid x)=f_{X,Y}(x,y)/f_X(x)$。
- 離散分布の周辺・条件付き分布：$p_X(x)=\sum_y p_{X,Y}(x,y)$、$p_X(x)>0$ なら $p_{Y\mid X}(y\mid x)=p_{X,Y}(x,y)/p_X(x)$。
- 同時分布による独立判定：同時確率質量関数または同時確率密度関数と台が周辺分布の積に分解できるとき、$X,Y$ は独立である。
- 同時累積分布関数：$F_{X,Y}(x,y)=P(X\le x,Y\le y)$。長方形確率は4隅を $+,-,-,+$ で組み合わせ、独立なら $F_{X,Y}(x,y)=F_X(x)F_Y(y)$。
- 同時密度からの累積分布関数：$F_{X,Y}(x,y)=\int_{-\infty}^x\int_{-\infty}^y f_{X,Y}(u,v)\,dv\,du$。
- 条件付き累積分布関数：$F_{Y\mid X}(y\mid x)=\int_{-\infty}^y f_{Y\mid X}(v\mid x)\,dv$。
- 事象 $B$ による切断密度：$P(X\in B)>0$ なら $f_{X\mid X\in B}(x)=f_X(x)\boldsymbol1_B(x)/P(X\in B)$。
- 混合分布：離散潜在変数 $Z$ に対し $f_X(x)=\sum_zf_{X\mid Z}(x\mid z)P(Z=z)$。連続観測によるBayes更新は $P(Z=k\mid X=x)=P(Z=k)f_{X\mid Z}(x\mid k)/\sum_jP(Z=j)f_{X\mid Z}(x\mid j)$。
- 確率母関数：非負整数値の $X$ では $G_X(s)=E[s^X]$、$E[X]=G_X'(1)$、$E[X(X-1)]=G_X''(1)$（各微分値が有限なとき）。
- 確率母関数の判定：$G(s)=\sum_{k\ge0}p_ks^k$ が非負整数値分布の確率母関数であるには、$p_k\ge0$ かつ $G(1)=\sum_{k\ge0}p_k=1$ が必要である。
- 独立な和の母関数：$X,Y$ が独立で各母関数が存在する範囲では $G_{X+Y}(s)=G_X(s)G_Y(s)$、$M_{X+Y}(t)=M_X(t)M_Y(t)$。
- 代表的な確率母関数：二項分布は $(1-p+ps)^n$、幾何分布（初成功までの回数）は $ps/\{1-(1-p)s\}$、Poisson分布は $\exp\{\lambda(s-1)\}$。
- 確率母関数の合成：$N$ 個の要素を独立に確率 $q$ で残した個数 $Y$ は $G_Y(s)=G_N(1-q+qs)$。
- モーメント母関数の線形変換：$Y=aX+b$ なら $M_Y(t)=e^{bt}M_X(at)$。
- 代表的なモーメント母関数：指数分布 $\operatorname{Exp}(\lambda)$ は $\lambda/(\lambda-t)$（$t<\lambda$）、Gamma分布 $\operatorname{Gamma}(\alpha,\beta)$ は $\{\beta/(\beta-t)\}^\alpha$（$t<\beta$）、正規分布 $N(\mu,\sigma^2)$ は $\exp(\mu t+\sigma^2t^2/2)$。
- モーメント母関数の一意性：原点を含む開区間で有限なモーメント母関数は分布を一意に定める。
- Gamma積分：$\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}\,du$、$\int_0^\infty x^{a-1}e^{-bx}\,dx=\Gamma(a)/b^a$。
- 分散公式：$\operatorname{Var}(X)=E[X^2]-E[X]^2$。
- 共分散公式：$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$。
- 全期待値：$E[X]=E[E[X\mid Y]]$。
- 全分散：$\operatorname{Var}(X)=E[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(E[X\mid Y])$。
- 期待値の線形性：期待値が存在すれば $E[aX+bY+c]=aE[X]+bE[Y]+c$。独立性は不要。
- 関数の期待値：連続型では $E[g(X)]=\int g(x)f_X(x)\,dx$、離散型では $E[g(X)]=\sum_xg(x)p_X(x)$（絶対収束時）。
- 分散のスケール変換：$\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$。
- 和の分散：$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)+2ab\operatorname{Cov}(X,Y)$。独立なら共分散項は0。
- 標準化：$\sigma=\sqrt{\operatorname{Var}(X)}>0$ なら $Z=(X-\mu)/\sigma$ は $E[Z]=0$、$\operatorname{Var}(Z)=1$。
- 中心モーメント：$\mu_k=E[(X-\mu)^k]$。$E[X^2]<\infty$ で $\mu_2=\mu_2'-(\mu_1')^2$、$E[|X|^3]<\infty$ で $\mu_3=\mu_3'-3\mu_2'\mu_1'+2(\mu_1')^3$。
- 歪度：$E[(X-\mu)^3]/\sigma^3$。正なら右側の偏差が優勢で典型的には右に歪んだ形状を示唆するが、符号だけで裾の長さを断定はできない。
- 尖度：$E[(X-\mu)^4]/\sigma^4$。正規分布は3。超過尖度は尖度$-3$。値だけで尾確率の大小を一意に断定はできない。
- 変動係数：$CV=\sigma/\mu$（比率尺度で $\mu>0$）。
- パーセント点：第 $p$ 分位点は $q_p=\inf\{x:F_X(x)\ge p\}$。連続かつ狭義単調増加な累積分布関数では $F_X(q_p)=p$ の解に一致する。中央値は $p=1/2$、四分位数は $p=1/4,3/4$。
- 四分位範囲：$\mathrm{IQR}=Q_3-Q_1$。範囲は台の上限と下限の差。
- 最頻値：密度を最大にする点。離散では確率質量を最大にする値。
- 相関係数：$\rho_{X,Y}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$、$-1\le\rho\le1$。独立なら無相関だが逆は一般に不成立。
- 偏相関係数：$\rho_{XY\cdot Z}=(\rho_{XY}-\rho_{XZ}\rho_{YZ})/\sqrt{(1-\rho_{XZ}^2)(1-\rho_{YZ}^2)}$。
- 畳み込み：独立な連続確率変数の和 $Z=X+Y$ では $f_Z(z)=\int f_X(x)f_Y(z-x)\,dx$。
- 最大値：独立同分布標本の $M=\max_iX_i$ では $F_M(m)=F_X(m)^n$。
- 1変数変換：単調な $Y=g(X)$ では $f_Y(y)=f_X(g^{-1}(y))|(g^{-1})'(y)|$。
- 逆関数法：$F$ が連続で狭義単調増加なら $U\sim U(0,1)$ に対し $X=F^{-1}(U)$ は $F$ に従う。
- 非単調変換：$F_Y(y)=P(g(X)\le y)$ を領域積分で求め、$f_Y(y)=F_Y'(y)$ とする。
- 2変数変換：1対1変換では $f_{U,V}(u,v)=f_{X,Y}(x(u,v),y(u,v))|\det\partial(x,y)/\partial(u,v)|$。
- 独立正規の線形結合：$aX+bY\sim N(a\mu_X+b\mu_Y,a^2\sigma_X^2+b^2\sigma_Y^2)$。
- MGF：$M_X(t)=E[e^{tX}]$、存在すれば $E[X^r]=M_X^{(r)}(0)$。
- Poisson分布のモーメント母関数：$M_X(t)=\exp\{\lambda(e^t-1)\}$。

## 極限定理・標本分布

- 大数の法則：独立同分布で $E[|X_1|]<\infty$ なら $\overline X\xrightarrow{p}E[X_1]$。
- 中心極限定理：独立同分布で平均 $\mu$、有限な正の分散 $\sigma^2$ なら $\sqrt n(\overline X-\mu)/\sigma\xrightarrow{d}N(0,1)$。
- Delta法：$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$ かつ $g$ が $\theta$ で微分可能なら、$\sqrt n\{g(\widehat\theta)-g(\theta)\}\xrightarrow{d}N(0,g'(\theta)^2\sigma^2)$。

## 推定

- 最尤推定量：$\widehat\theta\in\operatorname*{arg\,max}_{\theta\in\Theta}L(\theta;x)=\operatorname*{arg\,max}_{\theta\in\Theta}\ell(\theta;x)$。
- モーメント法：母モーメントを対応する標本モーメントへ等置し、母数について解く。
- 因子分解定理：$L(\theta;x)=g_\theta(T(x))h(x)$ と分解できれば $T$ は十分統計量。
- Fisher情報量：$I_1(\theta)=E[U(\theta)^2]$。台が局所的に母数へ依存せず、対数尤度が2回微分可能で、微分と積分の交換ができ、情報量が有限なら $I_1(\theta)=-E[\ell''(\theta)]$。
- Cramér--Rao不等式：共通の台、微分と積分の交換、有限で正の情報量という正則条件の下で、$g(\theta)$ の不偏推定量 $T$ は $\operatorname{Var}_\theta(T)\ge g'(\theta)^2/I_n(\theta)$ を満たす。
- AIC：$\operatorname{AIC}=-2\ell(\widehat\theta)+2k$。
- 平均二乗誤差：$E[(T-\theta)^2]=\operatorname{Var}(T)+\operatorname{Bias}(T)^2$。

## 検定

- 母分散既知の正規平均：$(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$。信頼係数 $1-\alpha$ の区間は $\overline X\pm z_{1-\alpha/2}\sigma/\sqrt n$。
- 符号検定：連続分布の中央値の帰無仮説下で、正符号数は二項分布 $\operatorname{Binomial}(n,1/2)$ に従う。
- Neyman--Pearson補題：単純仮説同士では尤度比が大きい標本点から棄却域へ入れる。
- 尤度比検定：真値が母数空間の内部にあり、モデルが識別可能、尤度が十分滑らか、Fisher情報行列が正定値という正則条件の下で $-2\log\Lambda\xrightarrow{d}\chi_r^2$。$r$ は独立な制約数。
- Pearson適合度統計量：区分確率が正で期待度数が増大し、識別可能な正則 $r$ 母数モデルを最尤法等で当てはめると $\sum_j(O_j-E_j)^2/E_j\xrightarrow{d}\chi^2_{k-1-r}$。

## 線形モデル・多変量・時系列

- 単回帰の傾き：$\widehat\beta_1=S_{xy}/S_{xx}$。
- オッズ比：2×2表 $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ では $ad/(bc)$。
- bootstrap標準誤差：$\{(B-1)^{-1}\sum_b(T^{*(b)}-\overline T^*)^2\}^{1/2}$。
- 共分散二次形式：$\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a$。
- Rayleigh商：対称行列では $\max_{\boldsymbol a^{\mathsf T}\boldsymbol a=1}\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\lambda_{\max}$。
- 多変量正規分布の条件付き平均：$E[X\mid Y=y]=\mu_X+\sigma_{XY}(y-\mu_Y)/\sigma_Y^2$。
- OLS：$\widehat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y$。
- Gauss--Markov定理：固定・列フルランク計画、誤差平均0、共分散 $\sigma^2\boldsymbol I_n$ の下でOLSはBLUE。
- 多変量正規の線形変換：$\boldsymbol a^{\mathsf T}\boldsymbol X\sim N(\boldsymbol a^{\mathsf T}\boldsymbol\mu,\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a)$。
- Chapman--Kolmogorov関係：$P_{ij}^{(m+n)}=\sum_kP_{ik}^{(m)}P_{kj}^{(n)}$。
- 定常分布：$\boldsymbol\pi^{\mathsf T}\boldsymbol P=\boldsymbol\pi^{\mathsf T}$、$\sum_i\pi_i=1$。
- Poisson過程の待ち時間：$P(T_1>t)=P(N(t)=0)=e^{-\lambda t}$。
- AR(1)定常分散：$X_t=\phi X_{t-1}+\varepsilon_t$、$|\phi|<1$、革新が平均0、分散 $\sigma_\varepsilon^2$ で過去と無相関なら $\gamma(0)=\sigma_\varepsilon^2/(1-\phi^2)$。
- MA(1)自己共分散：$X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ なら $\gamma(0)=(1+\theta^2)\sigma_\varepsilon^2$、$\gamma(1)=\theta\sigma_\varepsilon^2$、$|h|>1$ で $\gamma(h)=0$。
- ロジスティック回帰：説明変数が $c$ 増えるとオッズは $e^{c\beta_1}$ 倍。
- Poisson回帰：説明変数が $c$ 増えると条件付き平均は $e^{c\beta_1}$ 倍。
- 線形対比：$\sum_ic_i=0$ を満たす $\sum_ic_i\mu_i$。

## 品質・信頼性・実験計画

- 工程能力指数：$C_p=(USL-LSL)/(6\sigma)$。
- 独立な直列系：$R(t)=\prod_iR_i(t)$。
- $\overline X$ 管理図：$UCL=\mu+3\sigma/\sqrt n$、$CL=\mu$、$LCL=\mu-3\sigma/\sqrt n$。
- 一元配置平方和：$SS_T=SS_B+SS_W$。
- 指数寿命：$R(t)=e^{-\lambda t}$、$\operatorname{MTBF}=1/\lambda$。
- 乱塊法：$Y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij}$、識別制約は $\sum_i\tau_i=\sum_j\beta_j=0$。
- 2因子交互作用：$(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11})$ という差の差で測る。

## Bayes・不完全データ・simulation

- Beta--Bernoulli共役更新：事前分布 $\operatorname{Beta}(a,b)$、成功 $s$、失敗 $f$ なら事後分布は $\operatorname{Beta}(a+s,b+f)$。
- EM法の負担率：$r_k(x)=\pi_kf_k(x)/\sum_j\pi_jf_j(x)$。
- Monte Carlo積分：$\int_0^1g(x)\,dx=E[g(U)]$ を $n^{-1}\sum_ig(U_i)$ で推定する。

## 基本分布の公式

- 離散一様分布：$X\in\{1,\ldots,m\}$ で $p_X(k)=1/m$、$E[X]=(m+1)/2$、$\operatorname{Var}(X)=(m^2-1)/12$。
- ベルヌーイ分布：$P(X=x)=p^x(1-p)^{1-x}$ $(x\in\{0,1\})$、$E[X]=p$、$\operatorname{Var}(X)=p(1-p)$。
- 二項分布：$P(X=k)=\binom nkp^k(1-p)^{n-k}$ $(k=0,\ldots,n)$、$E[X]=np$、$\operatorname{Var}(X)=np(1-p)$。
- 超幾何分布：$P(X=k)=\binom Kk\binom{N-K}{n-k}/\binom Nn$、$E[X]=nK/N$、$\operatorname{Var}(X)=n(K/N)(1-K/N)(N-n)/(N-1)$。
- 幾何分布（台1始まり）：$P(X=k)=(1-p)^{k-1}p$、$E[X]=1/p$、$\operatorname{Var}(X)=(1-p)/p^2$。
- 負の二項分布（失敗回数）：$P(Y=k)=\binom{k+r-1}{k}p^r(1-p)^k$、$E[Y]=r(1-p)/p$、$\operatorname{Var}(Y)=r(1-p)/p^2$。
- ポアソン分布：$P(X=k)=e^{-\lambda}\lambda^k/k!$、$E[X]=\operatorname{Var}(X)=\lambda$。
- 多項分布：$P(\boldsymbol X=\boldsymbol k)=n!\prod_i p_i^{k_i}/\prod_i k_i!$、$E[X_i]=np_i$、$\operatorname{Cov}(X_i,X_j)=-np_ip_j$ $(i\ne j)$。
- 連続一様分布：$f(x)=1/(b-a)$ $(a\le x\le b)$、$E[X]=(a+b)/2$、$\operatorname{Var}(X)=(b-a)^2/12$。
- 指数分布：$f(x)=\lambda e^{-\lambda x}$ $(x\ge0)$、$S(x)=e^{-\lambda x}$、$E[X]=1/\lambda$、$\operatorname{Var}(X)=1/\lambda^2$。
- Gamma分布（shape-rate）：$f(x)=\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$、$E[X]=\alpha/\beta$、$\operatorname{Var}(X)=\alpha/\beta^2$。
- Beta分布：$f(x)=x^{\alpha-1}(1-x)^{\beta-1}/B(\alpha,\beta)$ $(0<x<1)$、$E[X]=\alpha/(\alpha+\beta)$。
- Weibull分布（shape-scale）：$S(x)=e^{-(x/\lambda)^k}$、$h(x)=k(x/\lambda)^{k-1}/\lambda$、$E[X]=\lambda\Gamma(1+1/k)$。
- ロジスティック分布：$F(x)=1/(1+e^{-(x-\mu)/s})$、$E[X]=\mu$、$\operatorname{Var}(X)=\pi^2s^2/3$。
