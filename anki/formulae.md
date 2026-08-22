# 利用公式・定理・定義

このファイルをカード教材で利用する公式・定理・定義の正本とする。カードでは、ここへのリンクだけで済ませず、実際に使う項目を「使用公式・定理」欄へ再掲する。

記号の共通規約は notation.md に従う。ただし、分野固有の添字・統計量・母数は、以下の各節にある「この節の記号」で定義する。帽子は推定量、横棒は標本平均、下付き添字 $0$ は帰無仮説で指定する値を表す。

## 分割表の解析・ノンパラメトリック法

**この節の記号**：$O_{ij}$ と $E_{ij}$ は $r\times c$ 分割表の観測度数と期待度数、$n_{i\cdot}$ と $n_{\cdot j}$ は行和と列和、$n$ は総度数である。2×2表ではセルを行順に $a,b,c,d$ とする。順位検定では $R_i$ は順位和、$n_i$ は群 $i$ の標本数、$N=\sum_i n_i$ は総標本数である。

- 独立性の期待度数：$E_{ij}=n_{i\cdot}n_{\cdot j}/n$。Pearson統計量は $X^2=\sum_{i,j}(O_{ij}-E_{ij})^2/E_{ij}$、自由度は $(r-1)(c-1)$。
- 尤度比統計量：$G^2=2\sum_{i,j}O_{ij}\log(O_{ij}/E_{ij})$。
- 2×2オッズ比：$\widehat{OR}=ad/(bc)$、$\operatorname{SE}(\log\widehat{OR})=\sqrt{1/a+1/b+1/c+1/d}$。
- 相対リスク：$RR=\widehat p_1/\widehat p_0$。リスク差：$RD=\widehat p_1-\widehat p_0$。
- フィッシャー検定：固定周辺和の下で左上セルは超幾何分布に従う。
- McNemar検定：不一致対 $(b,c)$ について帰無仮説下で $b\mid(b+c)\sim\operatorname{Binomial}(b+c,1/2)$。
- Mantel–Haenszel共通オッズ比：$\widehat{OR}_{MH}=\{\sum_ka_kd_k/n_k\}/\{\sum_kb_kc_k/n_k\}$。
- 独立対数線形モデル：$\log m_{ij}=\lambda+\lambda_i^A+\lambda_j^B$。
- ロジスティック回帰：$\operatorname{logit}(p)=\beta_0+\beta_1x$ なら、xが1増えるオッズ比は $e^{\beta_1}$。
- Wilcoxon符号付順位和：独立同分布な差が連続で0対称、0差・同順位なしなら $E[W_+]=n(n+1)/4$、$\operatorname{Var}(W_+)=n(n+1)(2n+1)/24$。
- Mann–Whitney U：$U_1=R_1-n_1(n_1+1)/2$。帰無仮説下で $E[U]=n_1n_2/2$、$\operatorname{Var}(U)=n_1n_2(n_1+n_2+1)/12$。
- Kruskal–Wallis検定：$H=12\sum_iR_i^2/n_i\,/\{N(N+1)\}-3(N+1)\xrightarrow{d}\chi_{k-1}^2$。
- Friedman検定：$Q=12\sum_jR_j^2/\{bk(k+1)\}-3b(k+1)\xrightarrow{d}\chi_{k-1}^2$。
- 2標本Kolmogorov–Smirnov統計量：$D_{m,n}=\sup_x|F_m(x)-G_n(x)|$。
- Spearman順位相関（同順位なし）：$r_S=1-6\sum_id_i^2/\{n(n^2-1)\}$。
- Kendall順位相関（同順位なし）：$\tau=(C-D)/\binom n2$。
- 連の数：$E[R]=1+2n_1n_2/(n_1+n_2)$、$\operatorname{Var}(R)=2n_1n_2(2n_1n_2-n_1-n_2)/\{(n_1+n_2)^2(n_1+n_2-1)\}$。
- Kruskal–Wallisの同順位補正：$C=1-\sum_g(t_g^3-t_g)/(N^3-N)$、$H_{\mathrm{corr}}=H/C$。

## 分散分析・回帰分析

**この節の記号**：分散分析では $i$ は群、$j$ は群内観測、$n_i$ は群サイズ、$N=\sum_i n_i$ は総標本数、$SS$ と $MS$ は平方和と平均平方である。回帰では $\boldsymbol Y$ は応答ベクトル、$\boldsymbol X$ は切片列を含むことがある計画行列、$\boldsymbol\beta$ は係数ベクトル、$p$ は説明変数数、$k$ は切片を含む係数数とする。$S_{xx}=\sum_i(x_i-\bar x)^2$、$S_{xy}=\sum_i(x_i-\bar x)(y_i-\bar y)$ である。

- 一元配置モデル：$Y_{ij}=\mu+\alpha_i+\varepsilon_{ij}$、$\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)$。帰無仮説は $\mu_1=\cdots=\mu_a$。
- 一元配置の平方和：$SS_T=SS_A+SS_E$、$SS_A=\sum_i n_i(\overline Y_{i\cdot}-\overline Y_{\cdot\cdot})^2$、$SS_E=\sum_{i,j}(Y_{ij}-\overline Y_{i\cdot})^2$。
- 一元配置のF統計量：$F=\{SS_A/(a-1)\}/\{SS_E/(N-a)\}\sim F_{a-1,N-a}$（帰無仮説下）。
- 対比：$L=\sum_i c_i\mu_i$、$\sum_i c_i=0$。$\operatorname{SE}(\widehat L)=\sqrt{MS_E\sum_i c_i^2/n_i}$。
- Tukey法（等サイズ）：$|\overline Y_i-\overline Y_j|>q_{a,N-a,\alpha}\sqrt{MS_E/n}$ なら群対差を有意とする。
- Scheffé法：$\widehat L^2/\{MS_E\sum_i c_i^2/n_i\}>(a-1)F_{a-1,N-a,\alpha}$ なら対比を棄却する。
- 二元配置モデル：$Y_{ijk}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk}$。
- 二元配置の自由度：Aは $a-1$、Bは $b-1$、交互作用は $(a-1)(b-1)$、各セル $n$ 反復の誤差は $ab(n-1)$。
- 2×2交互作用：$(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11})$。
- 共分散分析：$Y_{ij}=\mu+\alpha_i+\beta(X_{ij}-\overline X)+\varepsilon_{ij}$。調整平均は $\overline Y_{i,\mathrm{adj}}=\overline Y_i-\widehat\beta(\overline X_i-\overline X)$。
- 単回帰の最小二乗推定：$\widehat\beta_1=S_{xy}/S_{xx}$、$\widehat\beta_0=\overline Y-\widehat\beta_1\overline x$。
- 回帰平方和分解：$SST=SSR+SSE$。決定係数は $R^2=SSR/SST=1-SSE/SST$。
- 単回帰係数の分散：$\operatorname{Var}(\widehat\beta_1)=\sigma^2/S_{xx}$、$\operatorname{Var}(\widehat\beta_0)=\sigma^2\{1/n+\overline x^2/S_{xx}\}$。
- 傾きのt検定：$T=(\widehat\beta_1-\beta_{1,0})/\sqrt{MS_E/S_{xx}}\sim t_{n-2}$。
- 平均応答の信頼区間：$\widehat y_0\pm t_{n-2,\alpha/2}s\sqrt{1/n+(x_0-\overline x)^2/S_{xx}}$。
- 新観測の予測区間：$\widehat y_0\pm t_{n-2,\alpha/2}s\sqrt{1+1/n+(x_0-\overline x)^2/S_{xx}}$。
- 重回帰の最小二乗推定：$\widehat{\boldsymbol\beta}=(X^{\mathsf T}X)^{-1}X^{\mathsf T}Y$、$\operatorname{Var}(\widehat{\boldsymbol\beta})=\sigma^2(X^{\mathsf T}X)^{-1}$。
- ハット行列：$H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}$ は対称かつ冪等。$\widehat Y=HY$、$e=(I-H)Y$。
- 回帰全体F検定：$F=\{SSR/p\}/\{SSE/(n-p-1)\}\sim F_{p,n-p-1}$。
- 部分F検定：$F=\{(SSE_R-SSE_F)/q\}/\{SSE_F/(n-p_F-1)\}\sim F_{q,n-p_F-1}$。
- Gauss–Markovの定理：$E[\varepsilon\mid X]=0$、$\operatorname{Var}(\varepsilon\mid X)=\sigma^2I$、$X$ 列フルランクの下で最小二乗推定量はBLUE。
- レバレッジと残差分散：$h_{ii}=H_{ii}$、$\sum_i h_{ii}=p+1$、$\operatorname{Var}(e_i)=\sigma^2(1-h_{ii})$。
- 自由度調整済み決定係数：切片込み係数数をkとすると $\bar R^2=1-(1-R^2)(n-1)/(n-k)$。
- 分散拡大係数：$X_j$ を他の説明変数へ回帰した決定係数を $R_j^2$ とすると $\operatorname{VIF}_j=1/(1-R_j^2)$。
- Cookの距離：内的スチューデント化残差 $r_i$ に対し $D_i=(r_i^2/k)h_{ii}/(1-h_{ii})$。
- 一般化最小二乗推定：$\operatorname{Var}(\varepsilon)=\sigma^2\Omega$ なら $\widehat\beta_{\mathrm{GLS}}=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}Y$。
- Ridge回帰：$\widehat\beta=(X^{\mathsf T}X+\lambda I)^{-1}X^{\mathsf T}Y$。直交計画のLassoはソフト閾値 $S(z,\lambda)=\operatorname{sign}(z)(|z|-\lambda)_+$。
- 一般化線形モデル：指数型分布族 $f(y;\theta,\phi)=\exp[\{y\theta-b(\theta)\}/a(\phi)+c(y,\phi)]$、線形予測子 $\eta=X\beta$、リンク $g(\mu)=\eta$。
- 一般化線形モデルの3要素：確率成分（指数型分布族）、系統成分（線形予測子 $\eta=X\beta$）、リンク関数 $g(\mu)=\eta$。
- 指数型分布族の平均・分散：$E[Y]=b'(\theta)$、$\operatorname{Var}(Y)=a(\phi)b''(\theta)$。
- ダミー変数との交互作用：$E[Y]=\beta_0+\beta_1x+\beta_2D+\beta_3xD$ では、$D=0$ の傾きは $\beta_1$、$D=1$ の傾きは $\beta_1+\beta_3$。
- 正準リンク：正規分布は恒等、二項分布はlogit、ポアソン分布は対数リンク。
- 一般化線形モデルのIRLS：$z_i=\eta_i+(y_i-\mu_i)d\eta_i/d\mu_i$、$w_i=[\operatorname{Var}(Y_i)(d\eta_i/d\mu_i)^2]^{-1}$ として $\beta^{\mathrm{new}}=(X^{\mathsf T}WX)^{-1}X^{\mathsf T}Wz$。
- 逸脱度：$D=2(\ell_{\mathrm{sat}}-\ell_{\mathrm{fit}})$。Pearson統計量は $X_P^2=\sum_i(y_i-\widehat\mu_i)^2/V(\widehat\mu_i)$。
- 過分散の概算：$\widehat\phi=X_P^2/(n-k)$。標準誤差は分散倍率の平方根に比例する。
- GLMのWald制約検定：$W=(R\widehat\beta-r)^{\mathsf T}(R\widehat V R^{\mathsf T})^{-1}(R\widehat\beta-r)\xrightarrow{d}\chi_q^2$。
- Mahalanobis距離：$d^2=(x-\mu)^{\mathsf T}\Sigma^{-1}(x-\mu)$。
- 1標本Hotelling統計量：p次元正規母集団からの独立標本でSが可逆かつ $n>p$ なら、$T^2=n(\bar x-\mu_0)^{\mathsf T}S^{-1}(\bar x-\mu_0)$、帰無仮説下で $(n-p)T^2/\{p(n-1)\}\sim F_{p,n-p}$。
- 主成分分析：$\max_{\|a\|=1}a^{\mathsf T}\Sigma a$ から $\Sigma a=\lambda a$。寄与率は $\lambda_j/\sum_k\lambda_k$。
- 因子分析：$X=\mu+\Lambda F+\varepsilon$、$\operatorname{Var}(F)=I$、$\operatorname{Var}(\varepsilon)=\Psi$、$\operatorname{Cov}(F,\varepsilon)=0$ なら $\Sigma=\Lambda\Lambda^{\mathsf T}+\Psi$。
- Fisher線形判別：共通群内共分散Σの2群では $w\propto\Sigma^{-1}(\mu_1-\mu_0)$。
- Ward法：2クラスタ併合時の群内平方和増加は $\Delta WSS=n_An_B\|\bar x_A-\bar x_B\|^2/(n_A+n_B)$。
- k-means法：$\sum_k\sum_{i\in C_k}\|x_i-\bar x_k\|^2$ を割当てと重心更新で減少させる。
- 古典的多次元尺度構成法：$J=I-11^{\mathsf T}/n$、平方距離行列 $D^{(2)}$ から $B=-JD^{(2)}J/2$。

## 正規分布に関する検定・種々の検定法

**この節の記号**：$n$ は標本数、$\mu_0$、$\sigma_0^2$、$p_0$ は帰無仮説で指定する母平均・母分散・母比率である。$S^2$ は不偏標本分散、$X_j$ はカテゴリ $j$ の観測度数、$O_j,E_j$ は観測度数と期待度数、$z_\alpha$ などの分位点は notation.md の上側確率点規約に従う。

- 正規母平均（母分散既知）：$Z=(\overline X-\mu_0)/(\sigma/\sqrt n)\sim N(0,1)$。両側検定では $|Z|\ge z_{\alpha/2}$ で棄却する。
- 正規母平均（母分散未知）：$T=(\overline X-\mu_0)/(S/\sqrt n)\sim t_{n-1}$。母集団の正規性を仮定する。
- 対応のある $t$ 検定：$D_i=X_i-Y_i$ とし、$T=(\overline D-\mu_{D,0})/(S_D/\sqrt n)\sim t_{n-1}$ を使う。
- 2標本 $t$ 検定（等分散）：$S_p^2=\{(n_1-1)S_1^2+(n_2-1)S_2^2\}/(n_1+n_2-2)$、$T=\{(\overline X-\overline Y)-\Delta_0\}/\{S_p\sqrt{1/n_1+1/n_2}\}\sim t_{n_1+n_2-2}$。
- Welch検定：$T=\{(\overline X-\overline Y)-\Delta_0\}/\sqrt{S_1^2/n_1+S_2^2/n_2}$。自由度は $\nu=\dfrac{(S_1^2/n_1+S_2^2/n_2)^2}{(S_1^2/n_1)^2/(n_1-1)+(S_2^2/n_2)^2/(n_2-1)}$。
- 正規母分散：$(n-1)S^2/\sigma_0^2\sim\chi^2_{n-1}$。2母分散比では $(S_1^2/S_2^2)/(\sigma_1^2/\sigma_2^2)\sim F_{n_1-1,n_2-1}$。
- 1母比率のScore統計量：$Z=(\widehat p-p_0)/\sqrt{p_0(1-p_0)/n}$。
- 2母比率差：$\widetilde p=(X_1+X_2)/(n_1+n_2)$、$Z=(\widehat p_1-\widehat p_2)/\sqrt{\widetilde p(1-\widetilde p)(1/n_1+1/n_2)}$。
- Pearson適合度検定：$X^2=\sum_{j=1}^k(O_j-E_j)^2/E_j\xrightarrow{d}\chi^2_{k-1-r}$。$r$ は標本から推定した母数の個数。
- 分割表の独立性検定：$E_{ij}=n_{i\cdot}n_{\cdot j}/n$、$X^2=\sum_{i,j}(O_{ij}-E_{ij})^2/E_{ij}\xrightarrow{d}\chi^2_{(r-1)(c-1)}$。
- フィッシャー検定：周辺和を固定した $2\times2$ 表の左上セルは超幾何分布に従う。
- 符号検定：連続分布の中央値が帰無値なら、同順位を除いた正符号数は $\operatorname{Binomial}(n,1/2)$ に従う。
- Wilcoxon符号付順位検定：差の絶対値に順位を付け、正の差の順位和を統計量とする。差の分布の対称性を仮定する。
- Mann--Whitney検定：$U_1=R_1-n_1(n_1+1)/2$。帰無仮説の下で $E[U_1]=n_1n_2/2$。
- 1標本Kolmogorov--Smirnov検定：$D_n=\sup_x|F_n(x)-F_0(x)|$。連続で完全に指定された $F_0$ に対して分布によらない。
- McNemar検定：対応のある二値データの不一致数を $b,c$ とすると、$(b-c)^2/(b+c)\xrightarrow{d}\chi_1^2$。
- Holm法：$p_{(1)}\le\cdots\le p_{(m)}$ を並べ、順に $p_{(i)}\le\alpha/(m-i+1)$ を満たす間だけ棄却する。

## 確率

**この節の記号**：$A,B,C,A_i$ は事象、$\Omega$ は標本空間、$A^c$ は補事象、$|A|$ は有限集合 $A$ の要素数である。$P(A\mid B)$ は $P(B)>0$ のときの条件付き確率を表す。

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

**この節の記号**：$F_X,p_X,f_X$ は確率変数 $X$ の累積分布関数・確率質量関数・確率密度関数、$G_X,M_X,\varphi_X,K_X$ は確率母関数・モーメント母関数・特性関数・キュムラント母関数である。$\mu=E[X]$、$\sigma^2=\operatorname{Var}(X)$ とする。

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
- 特性関数：$\varphi_X(t)=E[e^{itX}]$。$\lvert e^{itX}\rvert=1$ により実数 $t$ 全体で存在する。
- 独立な和の特性関数：$X,Y$ が独立なら $\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)$。
- 代表的な特性関数：正規分布 $N(\mu,\sigma^2)$ は $\exp(i\mu t-\sigma^2t^2/2)$、Cauchy$\operatorname{Cauchy}(0,\gamma)$ は $e^{-\gamma\lvert t\rvert}$。
- 特性関数の一意性：すべての実数 $t$ で $\varphi_X(t)=\varphi_Y(t)$ なら $X,Y$ は同分布。
- キュムラント母関数：$M_X(t)>0$ の範囲で $K_X(t)=\log M_X(t)$。$K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$ の係数 $\kappa_r$ を第 $r$ キュムラントとし、$\kappa_1=E[X]$、$\kappa_2=\operatorname{Var}(X)$。
- キュムラントの加法性：独立な $X,Y$ なら $\kappa_r(X+Y)=\kappa_r(X)+\kappa_r(Y)$（$r\ge1$）。
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

**この節の記号**：$X_1,\ldots,X_n$ は特に断らない限り独立同分布標本、$\bar X$ と $S^2$ は標本平均と不偏標本分散である。$\xrightarrow{p}$ と $\xrightarrow{d}$ は確率収束と分布収束を表す。

- 大数の法則：独立同分布で $E[|X_1|]<\infty$ なら $\overline X\xrightarrow{p}E[X_1]$。
- 中心極限定理：独立同分布で平均 $\mu$、有限な正の分散 $\sigma^2$ なら $\sqrt n(\overline X-\mu)/\sigma\xrightarrow{d}N(0,1)$。
- Delta法：$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,\sigma^2)$ かつ $g$ が $\theta$ で微分可能なら、$\sqrt n\{g(\widehat\theta)-g(\theta)\}\xrightarrow{d}N(0,g'(\theta)^2\sigma^2)$。
- 統計量：観測値 $X_1,\ldots,X_n$ の関数で未知母数を含まない確率変数。その分布を標本分布と呼ぶ。
- 2標本平均差：独立な $\overline X\sim N(\mu_1,\sigma_1^2/n_1)$、$\overline Y\sim N(\mu_2,\sigma_2^2/n_2)$ なら $\overline X-\overline Y\sim N(\mu_1-\mu_2,\ \sigma_1^2/n_1+\sigma_2^2/n_2)$。
- 標本相関係数の定義：$r=\frac{\sum_i(X_i-\overline X)(Y_i-\overline Y)}{\sqrt{\sum_i(X_i-\overline X)^2}\,\sqrt{\sum_i(Y_i-\overline Y)^2}}$。$\rho=0$ 下で $t=\frac{r\sqrt{n-2}}{\sqrt{1-r^2}}\sim t_{n-2}$。

## 推定

**この節の記号**：$\theta$ は母数、$\widehat\theta$ は推定量、$L(\theta;x)$、$\ell(\theta;x)$、$U(\theta)$ は尤度・対数尤度・スコアである。$I_1(\theta)$ と $I_n(\theta)$ は1観測当たりと標本全体のフィッシャー情報量（1次元）、多母数では $\boldsymbol I(\boldsymbol\theta)$ をフィッシャー情報行列とする。

- 最尤推定量：$\widehat\theta\in\operatorname*{arg\,max}_{\theta\in\Theta}L(\theta;x)=\operatorname*{arg\,max}_{\theta\in\Theta}\ell(\theta;x)$。
- モーメント法：母モーメントを対応する標本モーメントへ等置し、母数について解く。
- 因子分解定理：$L(\theta;x)=g_\theta(T(x))h(x)$ と分解できれば $T$ は十分統計量。
- フィッシャー情報量（1次元）：$I_1(\theta)=E[U(\theta)^2]$。台が局所的に母数へ依存せず、対数尤度が2回微分可能で、微分と積分の交換ができ、情報量が有限なら $I_1(\theta)=-E[\ell''(\theta)]$。
- クラーメル・ラオの不等式：共通の台、微分と積分の交換、有限で正の情報量という正則条件の下で、$g(\theta)$ の不偏推定量 $T$ は $\operatorname{Var}_\theta(T)\ge g'(\theta)^2/I_n(\theta)$ を満たす。
- AIC：$\operatorname{AIC}=-2\ell(\widehat\theta)+2k$。
- 平均二乗誤差：$E[(T-\theta)^2]=\operatorname{Var}(T)+\operatorname{Bias}(T)^2$。
- フィッシャー情報行列：$\theta=(\theta_1,\ldots,\theta_k)$ のとき $I(\theta)_{ij}=E[\partial\log f/\partial\theta_i\cdot\partial\log f/\partial\theta_j]=-E[\partial^2\log f/\partial\theta_i\partial\theta_j]$。正則条件下で対称・半正定値。
- 情報量の加法性：独立同分布標本では $I_n(\theta)=nI_1(\theta)$。パラメータ変換 $\eta=\eta(\theta)$ では $I(\eta)=I(\theta)(d\theta/d\eta)^2$。
- Rao--Blackwellの定理：$T$ を十分統計量、$U$ を不偏推定量とすると $\widehat\theta=E[U\mid T]$ は不偏かつ $\operatorname{Var}(\widehat\theta)\le\operatorname{Var}(U)$。
- Lehmann--Schefféの定理：$T$ が完備十分統計量で $g(T)$ が不偏ならば $g(T)$ は一意なUMVU推定量である。

## 区間推定

**この節の記号**：$\alpha$ は非被覆確率、$1-\alpha$ は信頼係数、$L(X),U(X)$ は信頼区間の下端と上端である。$z_\alpha,t_{\nu,\alpha},\chi^2_{\nu,\alpha},F_{\nu_1,\nu_2,\alpha}$ は上側 $\alpha$ 点、$\nu$ は自由度を表す。

- 被覆確率：区間推定量 $I(X)=[L(X),U(X)]$ が $P_\theta(L(X)\le\theta\le U(X))=1-\alpha$ を満たすとき $1-\alpha$ を被覆確率（信頼係数）という。
- ピボット量：標本と未知パラメータの関数 $Q(X,\theta)$ の分布が $\theta$ に依存しないとき、 $P(a\le Q\le b)=1-\alpha$ を $\theta$ について解いて区間を得る。
- 正規平均・分散既知：$\overline X\pm z_{\alpha/2}\,\sigma/\sqrt n$。
- 正規平均・分散未知：$\overline X\pm t_{n-1,\alpha/2}\,S/\sqrt n$。
- 正規分散：$\left[(n-1)S^2/\chi^2_{n-1,\alpha/2},\ (n-1)S^2/\chi^2_{n-1,1-\alpha/2}\right]$。
- 2正規母分散比：$\left[(S_1^2/S_2^2)/F_{n_1-1,n_2-1,\alpha/2},\ (S_1^2/S_2^2)/F_{n_1-1,n_2-1,1-\alpha/2}\right]$。
- 2標本平均差（等分散）：$(\overline X-\overline Y)\pm t_{n_1+n_2-2,\alpha/2}\,S_p\sqrt{1/n_1+1/n_2}$（$S_p^2$ は結合不偏分散）。
- Welch区間：$(\overline X-\overline Y)\pm t_{\nu,\alpha/2}\sqrt{S_1^2/n_1+S_2^2/n_2}$、$\nu$ は Satterthwaite 近似自由度。
- 母比率：$\widehat p\pm z_{\alpha/2}\sqrt{\widehat p(1-\widehat p)/n}$。
- 母比率差：$(\widehat p_1-\widehat p_2)\pm z_{\alpha/2}\sqrt{\widehat p_1(1-\widehat p_1)/n_1+\widehat p_2(1-\widehat p_2)/n_2}$。
- 漸近区間（最尤推定量）：$\widehat\theta\pm z_{\alpha/2}/\sqrt{n\,I_1(\widehat\theta)}$。
- デルタ法区間：$g(T_n)\pm z_{\alpha/2}\,|g'(T_n)|\,\widehat\sigma/\sqrt n$。
- 双対性：水準 $\alpha$ の検定で棄却されない $\theta$ の集合がちょうど信頼係数 $1-\alpha$ の信頼区間になる。

## 検定

**この節の記号**：$\Theta$ は母数空間、$\Theta_0,\Theta_1$ は帰無仮説と対立仮説に対応する部分集合、$R$ は棄却域、$\alpha$ は有意水準である。$\phi(x)$ は検定関数、$\pi(\theta)$ は検出力関数、$\beta(\theta)$ は第二種過誤確率を表す。

- 検定関数：標本 $x$ で棄却する確率を $0\le\phi(x)\le1$ とし、検出力関数を $\pi(\theta)=E_\theta[\phi(X)]$ とする。非無作為化検定では $\phi(x)=\boldsymbol1_R(x)$。
- サイズと有意水準：棄却域 $R$ のサイズは $\sup_{\theta\in\Theta_0}P_\theta(X\in R)$。これが $\alpha$ 以下なら有意水準 $\alpha$ の検定。
- 過誤と検出力：第一種過誤確率は $P_\theta(X\in R)$（$\theta\in\Theta_0$）、第二種過誤確率は $\beta(\theta)=P_\theta(X\notin R)$（$\theta\in\Theta_1$）、検出力は $1-\beta(\theta)$。
- P値：検定統計量 $T$ が大きいほど対立仮説寄りなら、単純帰無仮説で $P_{H_0}(T\ge t_{\rm obs})$、複合帰無仮説では基本形 $\sup_{\theta\in\Theta_0}P_\theta(T\ge t_{\rm obs})$。
- 正規平均の右片側検出力：$\pi(\mu)=1-\Phi\{z_{\alpha}-\sqrt n(\mu-\mu_0)/\sigma\}$。ここで $z_\alpha$ は上側 $\alpha$ 点。
- 正規平均検定の標本サイズ：差 $\delta>0$ を片側有意水準 $\alpha$、検出力 $1-\beta$ で検出するには $n\ge\{(z_\alpha+z_\beta)\sigma/\delta\}^2$。
- 母分散既知の正規平均：$(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$。信頼係数 $1-\alpha$ の区間は $\overline X\pm z_{\alpha/2}\sigma/\sqrt n$。
- 符号検定：連続分布の中央値の帰無仮説下で、正符号数は二項分布 $\operatorname{Binomial}(n,1/2)$ に従う。
- Neyman--Pearson補題：単純仮説同士では尤度比が大きい標本点から棄却域へ入れ、閾値と境界無作為化によりサイズを $\alpha$ まで使う検定が最強力となる。
- 単調尤度比：$\theta_2>\theta_1$ のとき $f(x;\theta_2)/f(x;\theta_1)$ が $T(x)$ の非減少関数なら、右片側検定は $T$ が大きいとき棄却する形でUMPとなる。
- 一般化尤度比：$\Lambda=\sup_{\theta\in\Theta_0}L(\theta)/\sup_{\theta\in\Theta}L(\theta)$。真値が母数空間の内部にあり、モデルが識別可能、尤度が十分滑らか、フィッシャー情報行列が正定値という正則条件の下で $-2\log\Lambda\xrightarrow{d}\chi_r^2$。$r$ は独立な制約数。
- Wald統計量：$Z_W=(\widehat\theta-\theta_0)/\widehat{\operatorname{SE}}(\widehat\theta)\xrightarrow{d}N(0,1)$、$W=Z_W^2\xrightarrow{d}\chi_1^2$。
- Score統計量：$U_n(\theta)=\partial\ell_n(\theta)/\partial\theta$ として $S=U_n(\theta_0)^2/I_n(\theta_0)\xrightarrow{d}\chi_1^2$。
- LR・Wald・Score：正則条件下で帰無仮説における極限分布は同じで、統計量間の差は $o_p(1)$。
- Pearson適合度統計量：区分確率が正で期待度数が増大し、識別可能な正則 $r$ 母数モデルを最尤法等で当てはめると $\sum_j(O_j-E_j)^2/E_j\xrightarrow{d}\chi^2_{k-1-r}$。

## 線形モデル・多変量・時系列

**この節の記号**：$\boldsymbol X$ は確率ベクトルまたは文脈により計画行列、$\boldsymbol\Sigma$ は共分散行列、$\boldsymbol I_n$ は単位行列である。確率過程では $P_{ij}^{(n)}$ は状態 $i$ から $j$ への $n$ 段階遷移確率、$N(t)$ は時刻 $t$ までの事象数、$B_t$ は標準ブラウン運動を表す。時系列では $t$ は時点、$h$ はラグ、$\gamma(h)$ は自己共分散、$\rho(h)$ は自己相関、$BX_t=X_{t-1}$ はバックシフト演算子、$\varepsilon_t$ はホワイトノイズを表す。

- 単回帰の傾き：$\widehat\beta_1=S_{xy}/S_{xx}$。
- オッズ比：2×2表 $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ では $ad/(bc)$。
- bootstrap標準誤差：$\{(B-1)^{-1}\sum_b(T^{*(b)}-\overline T^*)^2\}^{1/2}$。
- 共分散二次形式：$\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a$。
- Rayleigh商：対称行列では $\max_{\boldsymbol a^{\mathsf T}\boldsymbol a=1}\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\lambda_{\max}$。
- 多変量正規分布の条件付き平均：$E[X\mid Y=y]=\mu_X+\sigma_{XY}(y-\mu_Y)/\sigma_Y^2$。
- OLS：$\widehat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y$。
- 正規方程式と残差：$\boldsymbol X^{\mathsf T}\boldsymbol e=\boldsymbol0$、$\boldsymbol e=\boldsymbol Y-\boldsymbol X\widehat{\boldsymbol\beta}$。
- OLSの分散：$\operatorname{Var}(\widehat{\boldsymbol\beta}\mid X)=\sigma^2(X^{\mathsf T}X)^{-1}$。線形結合 $c^{\mathsf T}\widehat{\boldsymbol\beta}$ の分散は $\sigma^2c^{\mathsf T}(X^{\mathsf T}X)^{-1}c$。
- 一般線形制約：$H_0:R\boldsymbol\beta=\boldsymbol r$（独立な制約数 $q$）の有限標本F統計量は
  $$F=\frac{(R\widehat{\boldsymbol\beta}-\boldsymbol r)^{\mathsf T}[R(X^{\mathsf T}X)^{-1}R^{\mathsf T}]^{-1}(R\widehat{\boldsymbol\beta}-\boldsymbol r)}{q s^2}\sim F_{q,n-k}.$$
- 入れ子線形モデルの部分F検定：$F=\{(SSE_R-SSE_F)/q\}/\{SSE_F/(n-k_F)\}$。
- 平均応答と新観測：平均応答の標準誤差は $s\sqrt{x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0}$、新観測の予測標準誤差は $s\sqrt{1+x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0}$。
- HC0サンドイッチ分散：$(X^{\mathsf T}X)^{-1}\{\sum_i e_i^2x_ix_i^{\mathsf T}\}(X^{\mathsf T}X)^{-1}$。
- Gauss--Markov定理：固定・列フルランク計画、誤差平均0、共分散 $\sigma^2\boldsymbol I_n$ の下でOLSはBLUE。
- 多変量正規の線形変換：$\boldsymbol a^{\mathsf T}\boldsymbol X\sim N(\boldsymbol a^{\mathsf T}\boldsymbol\mu,\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a)$。
- $p$ 変量正規分布：正定値な $\Sigma$ に対し、$f(\boldsymbol x)=(2\pi)^{-p/2}|\Sigma|^{-1/2}\exp[-(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)/2]$。
- 標本平均・標本共分散：$\bar{\boldsymbol X}=n^{-1}\sum_i\boldsymbol X_i$、$S=(n-1)^{-1}\sum_i(\boldsymbol X_i-\bar{\boldsymbol X})(\boldsymbol X_i-\bar{\boldsymbol X})^{\mathsf T}$。
- 正規標本の標本分布：$\bar{\boldsymbol X}\sim N_p(\boldsymbol\mu,\Sigma/n)$、$(n-1)S\sim W_p(\Sigma,n-1)$、かつ $\bar{\boldsymbol X}$ と $S$ は独立。
- Wishart分布：独立な $\boldsymbol Z_i\sim N_p(\boldsymbol0,\Sigma)$ に対し、$W=\sum_{i=1}^{\nu}\boldsymbol Z_i\boldsymbol Z_i^{\mathsf T}\sim W_p(\Sigma,\nu)$、$E[W]=\nu\Sigma$。
- 共分散と相関の変換：$\operatorname{Cov}(A\boldsymbol X)=A\Sigma A^{\mathsf T}$、$R=D^{-1/2}\Sigma D^{-1/2}$、$D=\operatorname{diag}(\sigma_{11},\ldots,\sigma_{pp})$。
- Mahalanobis距離：$d_M^2=(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)$。
- 2標本Hotelling統計量：$S_p=\{(n_1-1)S_1+(n_2-1)S_2\}/(n_1+n_2-2)$ をプールした不偏分散共分散行列として、$T^2=n_1n_2(\bar{\boldsymbol X}_1-\bar{\boldsymbol X}_2)^{\mathsf T}S_p^{-1}(\bar{\boldsymbol X}_1-\bar{\boldsymbol X}_2)/(n_1+n_2)$。
- PCAの寄与率：$c_j=\lambda_j/\sum_k\lambda_k$。主成分得点は $y_{ij}=\boldsymbol v_j^{\mathsf T}(\boldsymbol x_i-\bar{\boldsymbol x})$。
- 主成分負荷量：第 $j$ 主成分 $Y_j=\boldsymbol v_j^{\mathsf T}\boldsymbol X$ と第 $i$ 変数の相関は $\ell_{ij}=\operatorname{Corr}(X_i,Y_j)=\sqrt{\lambda_j}v_{ij}/\sigma_i$。
- 因子分析：$\boldsymbol X=\boldsymbol\mu+\Lambda\boldsymbol F+\boldsymbol\varepsilon$、$\operatorname{Cov}(\boldsymbol F,\boldsymbol\varepsilon)=0$、$\Sigma=\Lambda\Lambda^{\mathsf T}+\Psi$。直交因子の共通性は $h_i^2=\sum_j\lambda_{ij}^2$。
- Fisherの線形判別方向：$\boldsymbol w\propto S_W^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_2)$。
- Ward法の併合増分：$\Delta(A,B)=n_An_B\|\bar{\boldsymbol x}_A-\bar{\boldsymbol x}_B\|^2/(n_A+n_B)$。
- 正準相関の二乗：$\Sigma_{XX}^{-1}\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}$ の固有値。
- Chapman--Kolmogorov関係：$P_{ij}^{(m+n)}=\sum_kP_{ik}^{(m)}P_{kj}^{(n)}$。
- 定常分布：$\boldsymbol\pi^{\mathsf T}\boldsymbol P=\boldsymbol\pi^{\mathsf T}$、$\sum_i\pi_i=1$。
- 連続時間マルコフ連鎖：生成行列 $Q=(q_{ij})$ は $q_{ij}\ge0$（$i\ne j$）、$q_{ii}=-\sum_{j\ne i}q_{ij}$。状態 $i$ の保持時間は率 $\nu_i=-q_{ii}$ の指数分布、次の遷移先は $P(J=j\mid i)=q_{ij}/\nu_i$。
- 一様化：$\nu\ge\max_i(-q_{ii})$ と $R=I+Q/\nu$ を用いると、$P(t)=e^{Qt}=e^{-\nu t}\sum_{n=0}^{\infty}(\nu t)^nR^n/n!$。
- 初回帰還時刻 $T_i=\inf\{n\ge1:X_n=i\}$ に対し、$P_i(T_i<\infty)=1$ なら状態 $i$ は再帰的、1未満なら過渡的。
- 吸収確率と平均到達時間：境界値を固定し、非吸収状態ではそれぞれ $h_i=\sum_jP_{ij}h_j$、$m_i=1+\sum_jP_{ij}m_j$ を解く。
- 吸収マルコフ連鎖：標準形 $P=\begin{pmatrix}Q&R\\0&I\end{pmatrix}$ では、基本行列 $N=(I-Q)^{-1}$、吸収までの平均ステップ数は $N\boldsymbol1$、吸収確率行列は $NR$。
- ポアソン過程の待ち時間：$P(T_1>t)=P(N(t)=0)=e^{-\lambda t}$。
- 率 $\lambda$ のポアソン過程：$N(t)-N(s)\sim\operatorname{Poisson}(\lambda(t-s))$。第 $k$ 到着時刻は $\operatorname{Gamma}(k,\lambda)$、$N(t)=n$ の条件下では $N(s)\sim\operatorname{Binomial}(n,s/t)$。
- 非一様ポアソン過程：強度 $\lambda(t)$、累積強度 $\Lambda(t)=\int_0^t\lambda(u)\,du$ に対し、$N(t)-N(s)\sim\operatorname{Poisson}(\Lambda(t)-\Lambda(s))$。
- 複合ポアソン過程 $S(t)=\sum_{i=1}^{N(t)}Y_i$：$E[S(t)]=\lambda tE[Y_1]$、$\operatorname{Var}(S(t))=\lambda tE[Y_1^2]$。
- 標準ブラウン運動：$B_t-B_s\sim N(0,t-s)$（$0\le s<t$）、$\operatorname{Cov}(B_s,B_t)=\min(s,t)$。
- Ornstein--Uhlenbeck過程：$dX_t=\kappa(\mu-X_t)dt+\sigma dB_t$（$\kappa>0$）では、$E[X_t\mid X_0=x]=\mu+(x-\mu)e^{-\kappa t}$、$\operatorname{Var}(X_t\mid X_0=x)=\sigma^2(1-e^{-2\kappa t})/(2\kappa)$。
- M/M/1待ち行列：到着率 $\lambda$、サービス率 $\mu$、$\rho=\lambda/\mu<1$ のとき、定常確率は $\pi_n=(1-\rho)\rho^n$、平均系内数は $L=\rho/(1-\rho)$、Littleの法則により平均系内時間は $W=L/\lambda=1/(\mu-\lambda)$。
- AR(1)定常分散：$X_t=\phi X_{t-1}+\varepsilon_t$、$|\phi|<1$、革新が平均0、分散 $\sigma_\varepsilon^2$ で過去と無相関なら $\gamma(0)=\sigma_\varepsilon^2/(1-\phi^2)$。
- AR(1)の自己相関と予測：$\rho(h)=\phi^{|h|}$、$\widehat X_{t+h\mid t}=\mu+\phi^h(X_t-\mu)$、予測誤差分散は $\sigma_\varepsilon^2\sum_{j=0}^{h-1}\phi^{2j}$。
- MA(1)自己共分散：$X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ なら $\gamma(0)=(1+\theta^2)\sigma_\varepsilon^2$、$\gamma(1)=\theta\sigma_\varepsilon^2$、$|h|>1$ で $\gamma(h)=0$。
- ARIMA$(p,d,q)$：$\phi(B)(1-B)^dX_t=\theta(B)\varepsilon_t$。周期 $s$ の季節差分は $(1-B^s)X_t=X_t-X_{t-s}$。
- 標本自己相関：$\widehat\rho_k=\sum_{t=k+1}^n(x_t-\bar x)(x_{t-k}-\bar x)/\sum_{t=1}^n(x_t-\bar x)^2$。
- Ljung--Box統計量：残差自己相関 $r_h$ に対し、$Q=n(n+2)\sum_{h=1}^m r_h^2/(n-h)$。ARMA($p,q$)残差では通常 $\chi^2_{m-p-q}$ と比較し、季節AR・MA項があればその動的係数数も自由度から引く。切片と革新分散はこの控除数に含めない。
- 単純指数平滑法：$S_t=\alpha X_t+(1-\alpha)S_{t-1}$、$\widehat X_{t+1\mid t}=S_t$。
- AR(1)のスペクトル密度：$f(\omega)=\sigma_\varepsilon^2/[2\pi(1+\phi^2-2\phi\cos\omega)]$。
- 線形状態空間モデル：$\boldsymbol\alpha_t=T\boldsymbol\alpha_{t-1}+\boldsymbol\eta_t$、$\boldsymbol y_t=Z\boldsymbol\alpha_t+\boldsymbol\varepsilon_t$。カルマン予測は $a_{t\mid t-1}=Ta_{t-1\mid t-1}$、$P_{t\mid t-1}=TP_{t-1\mid t-1}T^{\mathsf T}+Q$。
- カルマン更新：予測誤差 $\boldsymbol v_t=\boldsymbol y_t-Za_{t\mid t-1}$、その共分散 $F_t=ZP_{t\mid t-1}Z^{\mathsf T}+H$、ゲイン $K_t=P_{t\mid t-1}Z^{\mathsf T}F_t^{-1}$ として、$a_{t\mid t}=a_{t\mid t-1}+K_t\boldsymbol v_t$、$P_{t\mid t}=P_{t\mid t-1}-K_tZP_{t\mid t-1}$。
- ロジスティック回帰：説明変数が $c$ 増えるとオッズは $e^{c\beta_1}$ 倍。
- Poisson回帰：説明変数が $c$ 増えると条件付き平均は $e^{c\beta_1}$ 倍。
- 線形対比：$\sum_ic_i=0$ を満たす $\sum_ic_i\mu_i$。

## 品質・信頼性・実験計画

**この節の記号**：$USL,LSL$ は上側・下側規格限界、$UCL,CL,LCL$ は上側管理限界・中心線・下側管理限界である。$\overline{\overline X},\overline R,\overline S$ は群平均の平均、群内範囲の平均、群内標本標準偏差の平均、$A_2,D_3,D_4,B_3,B_4$ は群サイズごとに表から選ぶ管理図定数である。実験計画では $a,b,p$ は処置数・ブロック数・方格次数、$SS_{\mathrm{tr}},SS_{\mathrm{bl}},SS_E$ は処置・ブロック・誤差平方和を表す。

- 工程能力指数：$C_p=(USL-LSL)/(6\sigma)$。
- 独立な直列系：$R(t)=\prod_iR_i(t)$。
- $\overline X$ 管理図：$UCL=\mu+3\sigma/\sqrt n$、$CL=\mu$、$LCL=\mu-3\sigma/\sqrt n$。
- 一元配置平方和：$SS_T=SS_B+SS_W$。
- 指数寿命：$R(t)=e^{-\lambda t}$、$\operatorname{MTBF}=1/\lambda$。
- $\overline X$--$R$ 管理図：$UCL_{\overline X}=\overline{\overline X}+A_2\overline R$、$LCL_{\overline X}=\overline{\overline X}-A_2\overline R$、$UCL_R=D_4\overline R$、$LCL_R=D_3\overline R$。
- $S$ 管理図：$CL=\overline S$、$UCL=B_4\overline S$、$LCL=B_3\overline S$。
- $p$ 管理図：標本サイズ $n_i$ の不良率 $p_i$ に対し $CL=\overline p$、$UCL_i=\overline p+3\sqrt{\overline p(1-\overline p)/n_i}$、$LCL_i=\max\{0,\overline p-3\sqrt{\overline p(1-\overline p)/n_i}\}$。
- 群別の検査数 $n_i$ と不適合品数 $d_i$ から作る $p$ 管理図の基準値：$\overline p=\sum_i d_i/\sum_i n_i$。
- $c$ 管理図と $u$ 管理図：一定検査単位の欠点数には $CL=\overline c$、管理限界 $\overline c\pm3\sqrt{\overline c}$。検査単位数 $n_i$ が異なる欠点率には $CL=\overline u$、管理限界 $\overline u\pm3\sqrt{\overline u/n_i}$ を用い、下側管理限界は0未満なら0とする。
- 1点ごとのシグナル確率を $p_s$ とする平均ラン長：$ARL=1/p_s$。管理状態で両側3標準偏差限界なら $ARL_0=1/[2\{1-\Phi(3)\}]$。
- EWMA統計量：$Z_t=\eta X_t+(1-\eta)Z_{t-1}$。独立で分散 $\sigma^2$ の観測なら定常分散は $\sigma^2\eta/(2-\eta)$。
- 片側上方CUSUM：原尺度では $C_t^+=\max\{0,C_{t-1}^++X_t-(\mu_0+K)\}$、$C_t^+>H$ でシグナルとする。標準偏差 $\sigma$ で標準化すれば $z_t=(X_t-\mu_0)/\sigma$、$k=K/\sigma$、$h=H/\sigma$ として $C_t^+=\max\{0,C_{t-1}^++z_t-k\}$、$C_t^+>h$ でシグナルとする。
- 工程能力指数：$C_{pk}=\min\{(USL-\mu)/(3\sigma),(\mu-LSL)/(3\sigma)\}$、$C_{pm}=(USL-LSL)/[6\sqrt{\sigma^2+(\mu-T)^2}]$。
- 独立な並列系：$R(t)=1-\prod_i\{1-R_i(t)\}$。同一信頼度 $r$ の $k$-out-of-$n$ 系は $\sum_{j=k}^n\binom njr^j(1-r)^{n-j}$。
- ワイブル分布（Weibull distribution）の寿命（shape $k$、scale $\lambda$）：$R(t)=\exp\{-(t/\lambda)^k\}$、$h(t)=(k/\lambda)(t/\lambda)^{k-1}$。
- 定常アベイラビリティ：平均故障間隔を $\operatorname{MTBF}$、平均修復時間を $\operatorname{MTTR}$ とすると $A=\operatorname{MTBF}/(\operatorname{MTBF}+\operatorname{MTTR})$。故障率 $\lambda$、修復率 $\mu$ の2状態モデルでは $A=\mu/(\lambda+\mu)$。
- 指数故障モデル：総曝露時間 $T_{\mathrm{tot}}$ 中の故障数を $d$ とすると $\widehat\lambda=d/T_{\mathrm{tot}}$。
- 指数故障モデルの故障率の正確区間：$D\sim\operatorname{Poisson}(\lambda T_{\mathrm{tot}})$、$\chi^2_{\nu,q}$ を上側 $q$ 点とすると、$1-\alpha$ 信頼区間は $[\chi^2_{2D,1-\alpha/2}/(2T_{\mathrm{tot}}),\chi^2_{2(D+1),\alpha/2}/(2T_{\mathrm{tot}})]$（$D=0$ の下端は0）。
- 乱塊法：$Y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij}$、識別制約は $\sum_i\tau_i=\sum_j\beta_j=0$。
- 乱塊法の平方和：$SS_T=SS_{\mathrm{tr}}+SS_{\mathrm{bl}}+SS_E$。自由度は順に $ab-1,a-1,b-1,(a-1)(b-1)$。
- ラテン方格法：$Y_{ij}=\mu+\rho_i+\kappa_j+\tau_{k(i,j)}+\varepsilon_{ij}$。p次なら誤差自由度は $(p-1)(p-2)$。
- 2因子交互作用：$(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11})$ という差の差で測る。
- $2^k$ 要因計画の効果：各処置組合せのセル平均を $\bar y_j$、符号化水準を $x_j\in\{-1,+1\}$ とすると、主効果Aは $2^{-(k-1)}\sum_jx_{Aj}\bar y_j$、交互作用ABは $2^{-(k-1)}\sum_jx_{Aj}x_{Bj}\bar y_j$。r反復の生データを直接足すなら分母は $r2^{k-1}$。
- 一部実施要因計画：生成関係から定義関係を作り、任意の効果を定義関係へ掛けて別名構造を得る。$2^{3-1}$ 計画で $C=AB$ なら $I=ABC$、$A=BC$。
- 解像度IIIでは主効果と2因子交互作用、解像度IVでは主効果同士・主効果と2因子交互作用、解像度Vでは主効果・2因子交互作用同士をそれぞれ分離できる。
- 変量切片モデル：$Y_{ij}=\mu+U_i+\varepsilon_{ij}$、$\operatorname{Var}(U_i)=\tau^2$ なら同じ群の2観測の共分散は $\tau^2$。
- 等標本数2標本比較の概算：各群 $n\approx2(z_{1-\alpha/2}+z_{1-\beta})^2\sigma^2/\Delta^2$。対応あり比較では $n\approx(z_{1-\alpha/2}+z_{1-\beta})^2\sigma_D^2/\Delta^2$。
- 一元配置分散分析の効果量：$f^2=\sum_iw_i(\mu_i-\mu)^2/\sigma^2$、総標本数Nに対する非心度は $\lambda=Nf^2$。

## 研究デザイン・標本調査

**この節の記号**：$N$ は有限母集団サイズ、$n$ は標本サイズ、$\pi_i$ と $\pi_{ij}$ は1次・2次包含確率である。層化抽出では $h$ は層、$N_h,n_h,W_h=N_h/N,S_h^2$ は層サイズ・層標本数・層ウェイト・層内分散を表す。下付き $d$ の分散は標本設計に関する分散である。

- 実験研究は研究者が処置を割り付け、観察研究は自然に生じた曝露と結果を観察する。無作為割付は因果比較、無作為抽出は母集団への一般化を支える。
- 単純無作為非復元抽出：$\pi_i=n/N$、$\pi_{ij}=n(n-1)/[N(N-1)]$。
- 母平均：$\widehat{\bar Y}=\bar y_s$、$\operatorname{Var}_d(\bar y_s)=(1-n/N)S_Y^2/n$。母合計は $\widehat T_Y=N\bar y_s$。
- 母比率：$\operatorname{Var}_d(p)=(1-n/N)\{N/(N-1)\}P(1-P)/n$、推定式は $\widehat{\operatorname{Var}}_d(p)=(1-n/N)p(1-p)/(n-1)$。
- 母平均の必要標本数：標準正規分布の臨界値z、許容半幅d、計画分散 $S^2$ に対し $n\ge Nz^2S^2/(Nd^2+z^2S^2)$。
- 層化平均：$\widehat{\bar Y}_{\mathrm{st}}=\sum_hW_h\bar y_h$、$\operatorname{Var}_d(\widehat{\bar Y}_{\mathrm{st}})=\sum_hW_h^2(1-n_h/N_h)S_h^2/n_h$。
- 比例配分：$n_h=nN_h/N$。等費用のNeyman配分：$n_h=nN_hS_h/\sum_\ell N_\ell S_\ell$。
- 二段階抽出：第1段が $g/G$、集落h内の第2段が $m_h/M_h$ なら最終包含確率は $\pi_{hi}=(g/G)(m_h/M_h)$。
- Horvitz--Thompson母合計推定量：$\widehat T_{\mathrm{HT}}=\sum_{i\in s}y_i/\pi_i$。
- 比推定：$\widehat{\bar Y}_R=(\bar y_s/\bar x_s)\bar X$。回帰推定：$\widehat{\bar Y}_{\mathrm{reg}}=\bar y_s+b(\bar X-\bar x_s)$。
- 設計効果：$\operatorname{DEFF}=\operatorname{Var}_{\mathrm{design}}(\widehat\theta)/\operatorname{Var}_{\mathrm{SRS}}(\widehat\theta)$、$n_{\mathrm{eff}}=n/\operatorname{DEFF}$。
- 非回答バイアス：回答率r、回答・非回答平均を $\mu_R,\mu_N$ とすると回答者平均のバイアスは $(1-r)(\mu_R-\mu_N)$。

## Bayes・不完全データ・simulation

**この節の記号**：$\theta$ は母数、$\pi(\theta)$ と $\pi(\theta\mid x)$ は事前分布と事後分布、$m(x)$ は周辺尤度である。欠測では $R_i$ は観測指示変数、$\pi_i=P(R_i=1\mid X_i)$ は観測確率である。生存解析では $T_i,C_i,Y_i,\delta_i$ は生存時間・打ち切り時間・観測時間・死亡指示変数である。simulationでは $m$ または $B$ は反復数を表す。

- ベイズの公式：$\pi(\theta\mid x)=f(x\mid\theta)\pi(\theta)/m(x)$、$m(x)=\int f(x\mid u)\pi(u)\,du$。
- 事後予測分布：$p(y\mid x)=\int p(y\mid\theta)\pi(\theta\mid x)\,d\theta$。
- Beta--Bernoulli共役更新：事前分布 $\operatorname{Beta}(a,b)$、成功 $s$、失敗 $f$ なら事後分布は $\operatorname{Beta}(a+s,b+f)$。
- Gamma--Exponential共役更新：指数分布の率に $\operatorname{Gamma}(a,b)$（shape--rate）事前分布を置くと、事後分布は $\operatorname{Gamma}(a+n,b+\sum_i x_i)$。
- Normal--Normal共役更新：$X_i\mid\mu\sim N(\mu,\sigma^2)$、$\mu\sim N(m_0,s_0^2)$ なら $s_n^2=(s_0^{-2}+n\sigma^{-2})^{-1}$、$m_n=s_n^2(m_0s_0^{-2}+n\bar x\sigma^{-2})$。
- Dirichlet--Multinomial共役更新：$\boldsymbol p\sim\operatorname{Dirichlet}(\alpha_1,\ldots,\alpha_K)$ に度数 $n_k$ を観測すると事後超母数は $\alpha_k+n_k$。
- 損失とベイズ推定量：二乗損失は事後平均、絶対損失は事後中央値、離散母数の0--1損失はMAPを与える。
- 信用区間：等裾区間は事後分位点 $[q_{\alpha/2},q_{1-\alpha/2}]$。HPD領域は $\{\theta:\pi(\theta\mid x)\ge c\}$ の事後確率が $1-\alpha$ となるcで定める。
- ベイズファクター：$BF_{10}=m_1(x)/m_0(x)$、事後オッズ＝$BF_{10}$×事前オッズ。不適切事前分布では通常のモデル間比較に使えない。
- 正規階層モデルの縮小：$\bar Y_j\mid\theta_j\sim N(\theta_j,v_j)$、$\theta_j\mid\mu,\tau^2\sim N(\mu,\tau^2)$ なら $E[\theta_j\mid-]=B_j\bar Y_j+(1-B_j)\mu$、$B_j=\tau^2/(\tau^2+v_j)$。
- Gibbs完全条件付き分布：$\pi(\theta_k\mid\boldsymbol\theta_{-k},y)\propto_{\theta_k}\pi(\boldsymbol\theta\mid y)$。
- EM法の負担率：$r_k(x)=\pi_kf_k(x)/\sum_j\pi_jf_j(x)$。
- 逆確率重み付き平均：観測確率を $\pi_i=P(R_i=1\mid X_i)$ とすると $\widehat\mu_{\mathrm{IPW}}=n^{-1}\sum_iR_iY_i/\pi_i$。
- 多重代入のRubin則：$\overline Q=m^{-1}\sum_j\widehat Q_j$、$\overline U=m^{-1}\sum_jU_j$、$B=(m-1)^{-1}\sum_j(\widehat Q_j-\overline Q)^2$、$T=\overline U+(1+m^{-1})B$。
- 生存関数・ハザード・累積ハザード：$S(t)=P(T>t)=1-F(t)$、$h(t)=f(t)/S(t)$、$H(t)=\int_0^th(u)\,du=-\log S(t)$、$S(t)=e^{-H(t)}$。
- 独立な右側打ち切りの尤度：$Y_i=\min(T_i,C_i)$、$\delta_i=I(T_i\le C_i)$ に対し $L(\theta)\propto\prod_i f(Y_i;\theta)^{\delta_i}S(Y_i;\theta)^{1-\delta_i}$。
- 指数生存モデルの右側打ち切り最尤推定量：$T_i\sim\operatorname{Exp}(\lambda)$ なら $\widehat\lambda=\sum_i\delta_i/\sum_iY_i$。
- 左トランケーション：$T>L$ の個体だけを観測するとき、条件付き密度は $f(t\mid T>L)=f(t)/S(L)$（$t>L$）。
- Kaplan--Meier推定量：各死亡時点 $t_j$ の直前リスク集合人数を $n_j$、死亡数を $d_j$ とすると $\widehat S(t)=\prod_{t_j\le t}(1-d_j/n_j)$。
- Greenwoodの公式：$\widehat{\operatorname{Var}}\{\widehat S(t)\}=\widehat S(t)^2\sum_{t_j\le t}d_j/[n_j(n_j-d_j)]$。
- log-rank検定：各死亡時点で群1の観測死亡数を $d_{1j}$、期待死亡数を $e_{1j}=d_jn_{1j}/n_j$ とし、$Z=\sum_j(d_{1j}-e_{1j})/\sqrt{\sum_jv_{1j}}$。ここで $v_{1j}=d_j(n_j-d_j)n_{1j}n_{0j}/[n_j^2(n_j-1)]$。
- Cox比例ハザードモデル：$h(t\mid\boldsymbol x)=h_0(t)e^{\boldsymbol\beta^{\mathsf T}\boldsymbol x}$、部分尤度は $L_p(\boldsymbol\beta)=\prod_{i:\delta_i=1}e^{\boldsymbol\beta^{\mathsf T}\boldsymbol x_i}/\sum_{k\in R(Y_i)}e^{\boldsymbol\beta^{\mathsf T}\boldsymbol x_k}$。共変量が1増えたときのハザード比は $e^{\beta}$。
- Monte Carlo積分：$\int_0^1g(x)\,dx=E[g(U)]$ を $n^{-1}\sum_ig(U_i)$ で推定する。
- 逆関数法：一様分布 $U\sim U(0,1)$ に対し $X=F^{-1}(U)$ とおけば $P(X\le x)=F(x)$。率 $\lambda$ の指数分布なら $X=-\log(1-U)/\lambda$。
- 棄却法：$f(x)\le Mg(x)$ のとき $Y\sim g$ を $U\le f(Y)/[Mg(Y)]$ なら受理する。受理確率は $1/M$。
- Box--Muller法：$R=\sqrt{-2\log U_1}$、$\Theta=2\pi U_2$ とし、$(Z_1,Z_2)=(R\cos\Theta,R\sin\Theta)$。
- Monte Carlo標準誤差：独立反復の標準偏差を $\sigma$、反復数をmとすると $\operatorname{SE}(\bar Y)=\sigma/\sqrt m$。
- 制御変量法：$E[C]=\mu_C$ が既知なら $Y-b(C-\mu_C)$ を用い、最適係数は $b^*=\operatorname{Cov}(Y,C)/\operatorname{Var}(C)$。
- 重点サンプリング：$E_f[h(X)]=E_g[h(X)f(X)/g(X)]$。$f(x)h(x)\ne0$ の領域で $g(x)>0$ を要する。
- 定常分布：遷移行列Pに対し $\boldsymbol\pi P=\boldsymbol\pi$。詳細釣合い $\pi_iP_{ij}=\pi_jP_{ji}$ は定常性の十分条件。
- Metropolis--Hastings法：$\alpha(x,y)=\min\{1,\pi(y)q(x\mid y)/[\pi(x)q(y\mid x)]\}$。
- 有限状態MCMCの収束：既約かつ非周期的なら定常分布は一意で、任意の初期分布から収束する。
- MCMCの有効標本サイズ：$m_{\mathrm{eff}}=m/[1+2\sum_{k\ge1}\rho_k]$、$\operatorname{MCSE}(\bar h)\approx\sigma/\sqrt{m_{\mathrm{eff}}}$。
- Bootstrap標準誤差：$\widehat{\operatorname{SE}}_{\mathrm{boot}}=\{(B-1)^{-1}\sum_b(\widehat\theta_b^*-\bar\theta^*)^2\}^{1/2}$。バイアス推定値は $\bar\theta^*-\widehat\theta$。
- Bootstrap区間：percentile区間は $[q_{\alpha/2}^*,q_{1-\alpha/2}^*]$、basic区間は $[2\widehat\theta-q_{1-\alpha/2}^*,2\widehat\theta-q_{\alpha/2}^*]$。
- Jackknife：$\widehat{\operatorname{SE}}_{\mathrm{jack}}=[(n-1)n^{-1}\sum_i(\widehat\theta_{(-i)}-\bar\theta_{(-\cdot)})^2]^{1/2}$、バイアス推定値は $(n-1)(\bar\theta_{(-\cdot)}-\widehat\theta)$。
- k-fold交差検証：$\operatorname{CV}_k=n^{-1}\sum_j\sum_{i\in I_j}L\{Y_i,\widehat f^{(-j)}(X_i)\}$。

## モデル評価・正則化

**この節の記号**：$\ell(\widehat\theta)$ は最大化対数尤度、$k$ は推定母数数、$n$ は標本数である。交差検証では $I_j$ は第 $j$ foldの検証添字集合、$\widehat f_{-j}$ はそのfoldを除いて学習した予測則、$L$ は予測損失である。正則化では $\lambda\ge0$ は罰則強度である。

- 情報量規準AIC：$\operatorname{AIC}=-2\ell(\widehat\theta)+2k$（$\ell$ は最大化対数尤度、$k$ は推定母数数）。小さいほど良い。
- ベイズ情報量規準BIC：$\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n$。真のモデルが候補にあれば大標本で一致して選ぶ。
- Kullback–Leibler情報量（KLダイバージェンス）：離散 $D_{\mathrm{KL}}(P\|Q)=\sum_xP(x)\log\dfrac{P(x)}{Q(x)}$、連続 $D_{\mathrm{KL}}(P\|Q)=\int P(x)\log\dfrac{P(x)}{Q(x)}\,dx$。非対称で $D_{\mathrm{KL}}(P\|Q)\ge0$（ギブスの不等式）。
- 交差検証：k分割は $\operatorname{CV}_{(k)}=n^{-1}\sum_{j=1}^k\sum_{i\in I_j}L(\widehat f_{-j}(X_i),Y_i)$、leave-one-outは $n^{-1}\sum_{i=1}^nL(\widehat f_{-i}(X_i),Y_i)$。
- Ridge回帰（L2正則化）：$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}=(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y$。$\lambda=0$ はOLS、$\lambda\to\infty$ で $\boldsymbol0$。
- Lasso回帰（L1正則化）：$\widehat{\boldsymbol\beta}_{\mathrm{lasso}}=\arg\min_{\boldsymbol\beta}\{\sum_i(Y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2+\lambda\sum_j|\beta_j|\}$。係数をぴったり0にし変数選択する。
- Elastic Net：$\arg\min_{\boldsymbol\beta}\{\sum_i(Y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2+\lambda(\alpha\sum_j|\beta_j|+(1-\alpha)\tfrac12\sum_j\beta_j^2)\}$。$\alpha=0$ はRidge、$\alpha=1$ はLasso。
- バイアス・バリアンス分解：$\operatorname{Err}=\operatorname{Bias}^2+\operatorname{Var}+\sigma^2$。正則化はバイアスを増やしてバリアンスを減らす。

## 漸近理論

**この節の記号**：$\xrightarrow{p}$、$\xrightarrow{d}$、$\xrightarrow{a.s.}$ は確率収束・分布収束・概収束を表す。$O_p(a_n)$ は $a_n$ で割った列が確率的有界、$o_p(a_n)$ は $a_n$ で割った列が確率収束で0へ収束することを表す。

- 確率収束：$X_n\xrightarrow{p}\theta\iff\forall\varepsilon>0,\ P(|X_n-\theta|>\varepsilon)\to0$。
- 概収束：$P(\lim_{n\to\infty}X_n=\theta)=1$。平均二乗収束：$E[(X_n-\theta)^2]\to0$。包含関係は 概収束 $\Rightarrow$ 確率収束 $\Rightarrow$ 分布収束、平均二乗収束 $\Rightarrow$ 確率収束。
- 大数の弱法則：独立同分布で $E[X_i]=\mu$ なら $\overline X_n\xrightarrow{p}\mu$。強法則は $E[|X_i|]<\infty$ で $\overline X_n\xrightarrow{a.s.}\mu$。
- 中心極限定理：独立同分布で $E[X_i]=\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ なら $\sqrt n(\overline X_n-\mu)/\sigma\xrightarrow{d}N(0,1)$。
- Slutskyの定理：$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$（定数）なら $X_n+Y_n\xrightarrow{d}X+c$、$X_nY_n\xrightarrow{d}cX$、$X_n/Y_n\xrightarrow{d}X/c$（$c\ne0$）。
- 連続写像定理：$X_n\xrightarrow{d}X$ かつ $g$ 連続なら $g(X_n)\xrightarrow{d}g(X)$。
- デルタ法：$\sqrt n(T_n-\theta)\xrightarrow{d}N(0,\sigma^2)$ かつ $g$ 微分可能なら $\sqrt n(g(T_n)-g(\theta))\xrightarrow{d}N(0,\{g'(\theta)\}^2\sigma^2)$。
- 最尤推定量の漸近正規性：正則条件の下で $\sqrt n(\widehat\theta_{\mathrm{MLE}}-\theta_0)\xrightarrow{d}N(0,I_1(\theta_0)^{-1})$。$I_1$ は1観測当たりのフィッシャー情報量（1次元）。
- 漸近分散定数・近似分散：$\sqrt n(T_n-\theta)\xrightarrow{d}N(0,v)$ の $v$ を漸近分散定数と呼び、推定量 $T_n$ 自体の近似分散を本教材では $\operatorname{Avar}(T_n)=v/n$ と書く。漸近標準誤差は $\sqrt{v/n}$。
- 漸近相対効率：漸近分散定数を $v_T,v_U$ として $\operatorname{ARE}(T,U)=v_U/v_T$。
- オーダー記号：$X_n=O_p(a_n)$ は確率的有界、$X_n=o_p(1)$ は $X_n\xrightarrow{p}0$。

## 基本分布の公式

**この節の記号**：各項で $X$ または $Y$ はその分布に従う確率変数、$p_X$ と $f_X$ は確率質量関数と確率密度関数である。$n,N,K,r$ などの母数は各分布の項で示す台・母数化に従い、同じ文字を別分布へ持ち越さない。

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
