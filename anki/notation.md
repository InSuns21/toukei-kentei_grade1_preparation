# 記法一覧

このファイルをカード教材の記法の正本とする。カード査読では、以下との一致を確認する。

## 共通の記号

- 添字 $i,j,k$ は、特に断らない限り観測・群・成分を走る添字とする。和記号の範囲は、その公式で定義した標本数・群数・成分数に従う。
- $n$ は標本数、$N$ は母集団サイズまたは全観測数を表す。両方を使う公式では、その公式内で意味を再定義する。
- $\widehat\theta$ は母数 $\theta$ の推定量、$\overline X$ は標本平均、下付き添字 $0$ は帰無仮説で指定する値を表す。
- 太字小文字 $\boldsymbol x$ はベクトル、太字大文字 $\boldsymbol X$ は行列とする。$\boldsymbol X^{\mathsf T}$ は転置、$\boldsymbol X^{-1}$ は逆行列、$\boldsymbol I_p$ は $p$ 次単位行列である。
- $Z\sim N(0,1)$ の確率密度関数を $\phi(z)$、累積分布関数を $\Phi(z)=P(Z\le z)$ とする。
- $z_\alpha$ は標準正規分布の上側 $\alpha$ 点、すなわち $P(Z>z_\alpha)=\alpha$ とする。$t_{\nu,\alpha}$、$\chi^2_{\nu,\alpha}$、$F_{\nu_1,\nu_2,\alpha}$ も同じ上側確率点の規約を使う。
- $L(\theta;x)$ は尤度、$\ell(\theta;x)=\log L(\theta;x)$ は対数尤度、$U(\theta)=\partial\ell(\theta;x)/\partial\theta$ はスコアとする。
- $I_1(\theta)$ は1観測当たりのフィッシャー情報量（1次元）、$I_n(\theta)$ は標本全体の情報量、$\boldsymbol I(\boldsymbol\theta)$ はフィッシャー情報行列とする。

## 確率・分布

- 確率測度は $P$、期待値は $E[X]$、分散は $\operatorname{Var}(X)$、共分散は $\operatorname{Cov}(X,Y)$ とする。
- 指示関数は $\boldsymbol{1}_A$ とする。
- 累積分布関数は $F_X(x)=P(X\le x)$、確率質量関数は $p_X(x)$、確率密度関数は $f_X(x)$ とする。
- 生存関数は $S_X(x)=P(X>x)=1-F_X(x)$、危険率は $S_X(x)>0$ の範囲で $h_X(x)=f_X(x)/S_X(x)$ とする。
- 累積危険率は $H_X(x)=-\log S_X(x)$ とする。絶対連続な寿命分布では $H_X(x)=\int_0^x h_X(u)\,du$、$S_X(x)=e^{-H_X(x)}$ とする。
- 同時確率質量関数・同時確率密度関数は $p_{X,Y}(x,y)$、$f_{X,Y}(x,y)$ とする。周辺分布は他方の変数について和または積分を取り、条件付き分布は同時分布を条件側の周辺分布で割る。
- 確率母関数は非負整数値確率変数に対して $G_X(s)=E[s^X]$、モーメント母関数（積率母関数）は原点を含む開区間で期待値が有限なとき $M_X(t)=E[e^{tX}]$ とする。
- 特性関数は実変数 $t$ に対し $\varphi_X(t)=E[e^{itX}]=E[\cos(tX)]+iE[\sin(tX)]$ とする。$\lvert e^{itX}\rvert=1$ より実軸全体で常に存在する。
- キュムラント母関数は $M_X(t)>0$ の範囲で $K_X(t)=\log M_X(t)$ とし、展開係数 $\kappa_r=K_X^{(r)}(0)$ を第 $r$ キュムラントとする。
- 歪度は $E[(X-\mu)^3]/\sigma^3$、尖度は $E[(X-\mu)^4]/\sigma^4$、変動係数は比率尺度で $\mu>0$ のとき $CV=\sigma/\mu$ とする。
- 相関係数は $\rho_{X,Y}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$、偏相関係数は $\rho_{XY\cdot Z}$ とする。
- 第 $p$ 分位点は $q_p=\inf\{x:F_X(x)\ge p\}$ とする。連続かつ狭義単調増加な累積分布関数では $F_X(q_p)=p$ の解に一致する。中央値 $m=q_{1/2}$、四分位数 $Q_1=q_{1/4},Q_3=q_{3/4}$、四分位範囲 $\mathrm{IQR}=Q_3-Q_1$ とする。
- 独立同分布標本は $X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}P_\theta$ とする。
- 標本平均は $\overline X=n^{-1}\sum_{i=1}^nX_i$、不偏標本分散は $S^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\overline X)^2$ とする。
- 正規分布は $N(\mu,\sigma^2)$ とし、第2引数は分散である。多変量正規分布は $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ とする。
- Gamma分布は shape-rate 表示 $\operatorname{Gamma}(\alpha,\beta)$ とする。
- 幾何分布の台は $\{1,2,\ldots\}$ とする。

## 収束・推測

- 分布収束は $X_n\xrightarrow{d}X$、確率収束は $X_n\xrightarrow{p}X$ とする。
- $T_n\dot\sim D_n$：$T_n$ の大標本近似分布が $D_n$ であることを表す。厳密な分布一致や収束矢印とは区別する。
- 推定量は $\widehat\theta$、尤度は $L(\theta;x)$、対数尤度は $\ell(\theta;x)$ とする。
- 1観測当たりのフィッシャー情報量（1次元）は $I_1(\theta)$、標本全体は $I_n(\theta)$ とする。
- 帰無仮説は $H_0$、対立仮説は $H_1$、有意水準は $\alpha$ とする。

## 線形代数・時系列

- ベクトルは太字小文字 $\boldsymbol x$、行列は太字大文字 $\boldsymbol X$ とする。
- 転置は $\boldsymbol X^{\mathsf T}$、逆行列は $\boldsymbol X^{-1}$、単位行列は $\boldsymbol I_n$ とする。
- 線形モデルは $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ とし、初出時に次元を示す。
- $R$、$\boldsymbol r$：線形制約 $R\boldsymbol\beta=\boldsymbol r$ の制約行列と帰無値ベクトル。$q=\operatorname{rank}(R)$ は独立な制約数。
- $\widehat V$：推定量の推定分散共分散行列。漸近理論では文脈により漸近分散の推定値を表す。
- $\operatorname{Avar}(\widehat\theta)$：推定量自体の近似分散。$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,V)$ の $V$ を漸近分散定数と呼び、本教材では $\operatorname{Avar}(\widehat\theta)=V/n$ と書く。
- 自己共分散は $\gamma(h)$、自己相関は $\rho(h)$ とする。

## 品質管理・信頼性

- $CL,UCL,LCL$：管理図の中心線、上側管理限界、下側管理限界。
- $\overline{\overline X},\overline R,\overline S$：群平均の平均、群内範囲の平均、群内標本標準偏差の平均。$A_2,D_3,D_4,B_3,B_4$ は群サイズごとに管理図定数表から選ぶ係数。
- $USL,LSL,T$：上側規格限界、下側規格限界、目標値。
- $C_p,C_{pk},C_{pm}$：工程のばらつき、偏り、目標からのずれを順に考慮する工程能力指数。
- $R(t)=P(T>t)$、$h(t)$：寿命 $T$ の信頼度関数と故障率関数。
- $\operatorname{MTBF},\operatorname{MTTR}$：平均故障間隔と平均修復時間。$A$ はアベイラビリティ、$M(t)$ は時刻 $t$ までに修復が完了する確率を表す保全度関数。
- $ARL$：管理図がシグナルを発するまでの平均標本数（平均ラン長）。$ARL_0$ は管理状態、$ARL_1$ は工程変化後の平均ラン長。
- $Z_t$：EWMA統計量、$C_t^+$：上方CUSUM統計量、$K,H$：原尺度のCUSUMの参照値と決定限界。標準偏差 $\sigma$ で割った標準化CUSUMでは $k=K/\sigma$、$h=H/\sigma$ を使う。

## 実験計画

- $a,b,p$：処置数、ブロック数、ラテン方格の次数。$SS_{\mathrm{tr}},SS_{\mathrm{bl}},SS_E$ は処置・ブロック・誤差平方和。
- $I$：2水準一部実施要因計画の単位列。A、B、Cなどは因子列で、積ABなどは交互作用列を表す。
- $N$：不完備ブロック計画の処置×ブロック接続行列。$N_{ij}=1$ は処置iがブロックjに現れることを表す。
- BIBDでは $v,b,r,k,\lambda$ を処置数、ブロック数、各処置の反復数、ブロックサイズ、任意の処置対が同じブロックに現れる回数とする。
- $U_i$：変量効果、$\tau^2$：変量効果分散、$\sigma^2$：実験単位誤差分散。

## 表示規則

- インライン数式はドル記号1個、別行数式はドル記号2個で囲む。
- 名前付き分布を問題で使う場合は、日本語名を明記する。台・母数範囲・確率質量関数または密度の正本はこの一覧とし、カードには論点に必要な式と条件だけを再掲する。
- 確率変数は大文字、観測値は小文字で区別する。

## 離散分布

| 分布 | 台 | 母数 | 確率質量関数 | 平均 | 分散 | モーメント母関数 |
|---|---|---|---|---|---|---|
| Bernoulli分布 $\operatorname{Bernoulli}(p)$ | $\{0,1\}$ | $0\le p\le1$ | $p_X(x)=p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ | $1-p+pe^t$ |
| 二項分布 $\operatorname{Binomial}(n,p)$ | $\{0,1,\ldots,n\}$ | $n\in\mathbb N$、$0\le p\le1$ | $p_X(x)=\binom nxp^x(1-p)^{n-x}$ | $np$ | $np(1-p)$ | $(1-p+pe^t)^n$ |
| Poisson分布 $\operatorname{Poisson}(\lambda)$ | $\mathbb N_0$ | $\lambda>0$ | $p_X(x)=e^{-\lambda}\dfrac{\lambda^x}{x!}$ | $\lambda$ | $\lambda$ | $\exp\{\lambda(e^t-1)\}$ |
| 幾何分布 $\operatorname{Geometric}(p)$ | $\{1,2,\ldots\}$ | $0<p\le1$ | $p_X(x)=p(1-p)^{x-1}$ | $\dfrac1p$ | $\dfrac{1-p}{p^2}$ | $\dfrac{pe^t}{1-(1-p)e^t}$（$t<-\log(1-p)$） |
| 負の二項分布 $\operatorname{NegBin}(r,p)$ | $\{r,r+1,\ldots\}$ | $r\in\mathbb N$、$0<p\le1$ | $p_X(x)=\binom{x-1}{r-1}p^r(1-p)^{x-r}$ | $\dfrac rp$ | $\dfrac{r(1-p)}{p^2}$ | $\left\{\dfrac{pe^t}{1-(1-p)e^t}\right\}^r$（$t<-\log(1-p)$） |
| 超幾何分布 | 組合せが定義できる整数 | 母集団 $N$、成功 $K$、抽出 $n$ | $p_X(x)=\binom Kx\binom{N-K}{n-x}/\binom Nn$ | $\dfrac{nK}N$ | $n\dfrac KN\dfrac{N-K}N\dfrac{N-n}{N-1}$ | 存在するが初等的な表示はない |
| 多項分布 $\operatorname{Multinomial}(n;p_1,\ldots,p_k)$ | $x_j\in\mathbb N_0$、$\sum_jx_j=n$ | $p_j\ge0$、$\sum_jp_j=1$ | $n!\prod_jp_j^{x_j}/\prod_jx_j!$ | $E[X_j]=np_j$ | $\operatorname{Var}(X_j)=np_j(1-p_j)$ | $(\sum_jp_je^{t_j})^n$ |

## 連続分布

| 分布 | 台 | 母数 | 確率密度関数 | 平均 | 分散 | モーメント母関数 |
|---|---|---|---|---|---|---|
| 一様分布 $U(a,b)$ | $a<x<b$ | $a<b$ | $f_X(x)=\dfrac1{b-a}$ | $\dfrac{a+b}2$ | $\dfrac{(b-a)^2}{12}$ | $\dfrac{e^{tb}-e^{ta}}{t(b-a)}$（$t\ne0$） |
| 正規分布 $N(\mu,\sigma^2)$ | $\mathbb R$ | $\mu\in\mathbb R$、$\sigma^2>0$ | $f_X(x)=\dfrac1{\sqrt{2\pi\sigma^2}}\exp\left\{-\dfrac{(x-\mu)^2}{2\sigma^2}\right\}$ | $\mu$ | $\sigma^2$ | $\exp(\mu t+\sigma^2t^2/2)$ |
| 指数分布 $\operatorname{Exp}(\lambda)$ | $x>0$ | rate $\lambda>0$ | $f_X(x)=\lambda e^{-\lambda x}$ | $\dfrac1\lambda$ | $\dfrac1{\lambda^2}$ | $\dfrac\lambda{\lambda-t}$（$t<\lambda$） |
| Gamma分布 $\operatorname{Gamma}(\alpha,\beta)$ | $x>0$ | shape $\alpha>0$、rate $\beta>0$ | $f_X(x)=\dfrac{\beta^\alpha x^{\alpha-1}e^{-\beta x}}{\Gamma(\alpha)}$ | $\dfrac\alpha\beta$ | $\dfrac\alpha{\beta^2}$ | $\left\{\dfrac\beta{\beta-t}\right\}^\alpha$（$t<\beta$） |
| Beta分布 $\operatorname{Beta}(a,b)$ | $0<x<1$ | $a,b>0$ | $f_X(x)=\dfrac{x^{a-1}(1-x)^{b-1}}{B(a,b)}$ | $\dfrac a{a+b}$ | $\dfrac{ab}{(a+b)^2(a+b+1)}$ | 存在するが初等的な表示はない |
| カイ二乗分布 $\chi^2_\nu$ | $x>0$ | 自由度 $\nu>0$ | $\operatorname{Gamma}(\nu/2,1/2)$ と同じ | $\nu$ | $2\nu$ | $(1-2t)^{-\nu/2}$（$t<1/2$） |
| Studentの $t$ 分布 $t_\nu$ | $\mathbb R$ | 自由度 $\nu>0$ | $f_T(t)=\dfrac{\Gamma\left\{\dfrac{\nu+1}2\right\}}{\sqrt{\nu\pi}\,\Gamma\left(\dfrac\nu2\right)}\left(1+\dfrac{t^2}\nu\right)^{-(\nu+1)/2}$ | $0$（$\nu>1$） | $\dfrac\nu{\nu-2}$（$\nu>2$） | 存在しない |
| $F$ 分布 $F_{\nu_1,\nu_2}$ | $x>0$ | $\nu_1,\nu_2>0$ | $f_X(x)=\dfrac{(\nu_1/\nu_2)^{\nu_1/2}x^{\nu_1/2-1}}{B\left(\dfrac{\nu_1}2,\dfrac{\nu_2}2\right)}\left(1+\dfrac{\nu_1x}{\nu_2}\right)^{-(\nu_1+\nu_2)/2}$ | $\dfrac{\nu_2}{\nu_2-2}$（$\nu_2>2$） | 存在するが複雑 | 存在しない |
| Cauchy分布 $\operatorname{Cauchy}(x_0,\gamma)$ | $\mathbb R$ | $\gamma>0$ | $f_X(x)=\dfrac1{\pi\gamma\left\{1+\left(\dfrac{x-x_0}\gamma\right)^2\right\}}$ | 存在しない | 存在しない | 存在しない |
| 対数正規分布 | $x>0$ | $\log X\sim N(\mu,\sigma^2)$ | $f_X(x)=\dfrac1{x\sigma\sqrt{2\pi}}\exp\left\{-\dfrac{(\log x-\mu)^2}{2\sigma^2}\right\}$ | $e^{\mu+\sigma^2/2}$ | $(e^{\sigma^2}-1)e^{2\mu+\sigma^2}$ | 存在しない |
| Weibull分布 $\operatorname{Weibull}(k,\lambda)$ | $x>0$ | shape $k>0$、scale $\lambda>0$ | $f_X(x)=\dfrac k\lambda\left(\dfrac x\lambda\right)^{k-1}e^{-(x/\lambda)^k}$ | $\lambda\Gamma\left(1+\dfrac1k\right)$ | $\lambda^2\left\{\Gamma\left(1+\dfrac2k\right)-\Gamma\left(1+\dfrac1k\right)^2\right\}$ | 存在するが初等的な表示はない |
| logistic分布 | $\mathbb R$ | 位置 $\mu\in\mathbb R$、scale $s>0$ | $f_X(x)=\dfrac{e^{-(x-\mu)/s}}{s\left\{1+e^{-(x-\mu)/s}\right\}^2}$ | $\mu$ | $\dfrac{\pi^2s^2}3$ | $e^{\mu t}\Gamma(1-st)\Gamma(1+st)$（$\lvert t\rvert<\dfrac1s$） |
| Pareto分布 $\operatorname{Pareto}(x_m,\alpha)$ | $x\ge x_m$ | $x_m,\alpha>0$ | $f_X(x)=\dfrac{\alpha x_m^\alpha}{x^{\alpha+1}}$ | $\dfrac{\alpha x_m}{\alpha-1}$（$\alpha>1$） | 存在するが $\alpha>2$ で有限 | 存在しない |
| Laplace分布 $\operatorname{Laplace}(\mu,b)$ | $\mathbb R$ | $b>0$ | $f_X(x)=\dfrac1{2b}e^{-\lvert x-\mu\rvert/b}$ | $\mu$ | $2b^2$ | $\dfrac{e^{\mu t}}{1-b^2t^2}$（$\lvert t\rvert<\dfrac1b$） |
| Rayleigh分布 $\operatorname{Rayleigh}(\sigma)$ | $x>0$ | $\sigma>0$ | $f_X(x)=\dfrac{x}{\sigma^2}e^{-x^2/(2\sigma^2)}$ | $\sigma\sqrt{\dfrac\pi2}$ | $\left(2-\dfrac\pi2\right)\sigma^2$ | 存在するが初等的な表示はない |

## 多変量分布

- 多変量正規分布 $N_p(\boldsymbol\mu,\boldsymbol\Sigma)$：台 $\mathbb R^p$、$\boldsymbol\mu\in\mathbb R^p$、$\boldsymbol\Sigma$ は $p\times p$ 正定値対称行列。密度は $(2\pi)^{-p/2}|\boldsymbol\Sigma|^{-1/2}\exp[-(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)/2]$。
- 混合分布：潜在変数 $Z$ の確率を $\pi_k$ とすると $f_X(x)=\sum_k\pi_k f_{X\mid Z=k}(x)$、$\pi_k\ge0$、$\sum_k\pi_k=1$。
- 離散一様分布は $\{1,\ldots,m\}$ 上で定義する。幾何分布は初成功までの試行回数を数える台 $\{1,2,\ldots\}$、負の二項分布は $r$ 回成功までの失敗回数を数える台 $\{0,1,\ldots\}$ とする。
- Gamma分布は shape-rate 表示 $\operatorname{Gamma}(\alpha,\beta)$、Weibull分布は shape-scale 表示 $\operatorname{Weibull}(k,\lambda)$、ロジスティック分布は location-scale 表示 $(\mu,s)$ とする。

## 区間推定

- 信頼係数（被覆確率）は $1-\alpha$ とし、区間推定量を $I(X)=[L(X),U(X)]$ とする。
- ピボット量（pivotal quantity）は標本と未知パラメータの関数 $Q(X,\theta)$ で、その分布が $\theta$ に依存しないものとする。
- 上側 $\alpha$ 点を $z_\alpha,t_{\nu,\alpha},\chi^2_{\nu,\alpha},F_{\nu_1,\nu_2,\alpha}$ とし、両側区間には $z_{\alpha/2}$ 等を用いる。
- 結合不偏分散を $S_p^2=((n_1-1)S_1^2+(n_2-1)S_2^2)/(n_1+n_2-2)$、Welch の近似自由度を $\nu$ とする。
## 確率過程・時系列

- $P=(p_{ij})$：離散時間マルコフ連鎖の1段階遷移行列。$P_{ij}^{(n)}$ は $n$ 段階遷移確率。
- $Q=(q_{ij})$：連続時間マルコフ連鎖の生成行列。$q_{ij}$（$i\ne j$）は状態 $i$ から $j$ への遷移率、$-q_{ii}=\nu_i$ は状態 $i$ から出る総率。
- $N=(I-Q)^{-1}$：吸収マルコフ連鎖で一時状態間の部分行列を $Q$ としたときの基本行列。同じ節で計数過程 $N(t)$ と併用するときは引数の有無で区別する。
- $N(t)$：時刻 $t$ までの到着数を数える計数過程。正規分布の記号ではない。
- $\lambda(t)$、$\Lambda(t)$：非一様ポアソン過程の時刻 $t$ における強度と、累積強度 $\Lambda(t)=\int_0^t\lambda(u)\,du$。
- $\rho=\lambda/\mu$：M/M/1待ち行列の利用率。ここで $\lambda$ は到着率、$\mu$ はサービス率であり、自己相関 $\rho(h)$ とは引数の有無で区別する。
- $B_t$：時刻 $t$ の標準ブラウン運動。バックシフト演算子 $B$ とは時点添字の有無で区別する。
- $B$：$BX_t=X_{t-1}$ を満たすバックシフト演算子。
- $\varepsilon_t$：時系列モデルのホワイトノイズまたは状態空間モデルの観測雑音。文脈ごとに平均・共分散を指定する。
- $\gamma(h)$、$\rho(h)$：ラグ $h$ の自己共分散、自己相関。
- $f(\omega)$：角周波数 $\omega$ におけるスペクトル密度。周期は $T=2\pi/\omega$ で換算する。
- $T$、$Z$：状態空間モデルの状態遷移行列、観測行列。
- $Q$、$H$：状態雑音、観測雑音の共分散行列。
- $a_{t\mid s}$、$P_{t\mid s}$：時刻 $s$ までの観測による状態 $\boldsymbol\alpha_t$ の条件付き平均、条件付き共分散。
## 多変量解析

- $\boldsymbol X\sim N_p(\boldsymbol\mu,\Sigma)$：平均ベクトル $\boldsymbol\mu$、正定値な分散共分散行列 $\Sigma$ をもつ $p$ 変量正規分布。
- $\bar{\boldsymbol X}$、$S$：標本平均ベクトル、不偏標本分散共分散行列。
- $R$：相関行列。対角成分は1。
- $W_p(\Sigma,\nu)$：尺度行列 $\Sigma$、自由度 $\nu$ のWishart分布。
- $\lambda_j$、$\boldsymbol v_j$：対称行列の第 $j$ 固有値、対応する単位固有ベクトル。
- $\Lambda$、$\Psi$：因子分析の因子負荷量行列、独自因子の対角分散共分散行列。
- $S_W$：判別分析の群内分散共分散行列。
- $\Sigma_{XY}$：確率ベクトル $\boldsymbol X$ と $\boldsymbol Y$ の交差共分散行列。
- $d_M$：Mahalanobis距離。
- $T^2$、$S_p$：HotellingのT二乗統計量、2群のプールした不偏分散共分散行列。
- $c_j$、$y_{ij}$：第 $j$ 主成分の寄与率、第 $i$ 観測の第 $j$ 主成分得点。
- $\ell_{ij}$：第 $i$ 変数と第 $j$ 主成分の相関として定義する主成分負荷量。
- $h_i^2$：因子分析で第 $i$ 変数の共通性。
- $\boldsymbol w$：Fisherの線形判別方向。
- $\Delta(A,B)$：Ward法でクラスター $A,B$ を併合したときの群内平方和増加。
