# 共通記号ガイド

このファイルを `textbook/`、`statistical-mathematics/`、`applied-rikou-80/`、`anki/` に共通する**記号の正本**とする。

教材固有の `notation.md` は、このファイルとの差分・追加だけを記載する。共通記号をローカル側で再定義しない。分布の台・母数化・確率質量関数・確率密度関数は [`distribution-notation-guide.md`](distribution-notation-guide.md)、用語・略語・日本語表記は [`terminology-guide.md`](terminology-guide.md) を正本とする。

## 1. 確率・標本

- 確率測度は $P$、期待値は $E[X]$、分散は $\operatorname{Var}(X)$、共分散は $\operatorname{Cov}(X,Y)$ とする。
- 母数への依存を明示する必要があるときは $P_\theta$、$E_\theta[\cdot]$、$\operatorname{Var}_\theta(\cdot)$ を使う。母数が文脈から明らかなときは添字を省略してよい。
- 条件付き期待値・条件付き分散・条件付き共分散は、それぞれ $E[X\mid Z]$、$\operatorname{Var}(X\mid Z)$、$\operatorname{Cov}(X,Y\mid Z)$ とする。縦線の右側が条件である。
- 指示関数は $\boldsymbol{1}_A$ とし、添字には事象を置く。
- 確率変数は大文字 $X,Y$、観測値は小文字 $x,y$ を基本とする。
- $n$ は標本数を基本とする。$N$ を母集団サイズ・総観測数などに使う場合は、その意味を初出時に明記する。
- 独立同分布標本は $X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}P_\theta$ とする。
- 確率論上の独立は、事象なら $A\perp B$、確率変数なら $X\perp Y$、条件付き独立は $A\perp B\mid C$ または $X\perp Y\mid Z$ と書く。文献で $\perp\!\!\!\perp$ と書く流儀もあるが、本教材の確率論では単一の $\perp$ に統一する。
- $\perp$ は線形代数では直交にも使う。たとえばベクトル $\boldsymbol u\perp\boldsymbol v$ は内積0、部分空間 $V^\perp$ は直交補を表す。したがって、確率変数・事象の間に置かれた $\perp$ は独立、ベクトル・部分空間に対する $\perp$ は直交と、対象と文脈で区別する。初学者が混同しうる箇所では本文でも「独立」「直交」を併記する。
- 標本平均は $\overline X=n^{-1}\sum_{i=1}^nX_i$、不偏標本分散は $S^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\overline X)^2$ とする。
- 相関係数は $\rho_{X,Y}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ とする。相関を演算子として書く場合は $\operatorname{Corr}(X,Y)$ とし、$\operatorname{Corr}(X,Y)=\rho_{X,Y}$ である。偏相関係数は $\rho_{XY\cdot Z}$ とする。
- 第 $p$ 分位点は $q_p=\inf\{x:F_X(x)\ge p\}$ とする。中央値は $q_{1/2}$、四分位範囲は $Q_3-Q_1$ とする。

## 2. 分布関数・母関数

- 確率質量関数は $p_X(x)=P(X=x)$、確率密度関数は $f_X(x)$、累積分布関数は $F_X(x)=P(X\le x)$ とする。
- 同時確率質量関数・同時確率密度関数は $p_{X,Y}(x,y)$、$f_{X,Y}(x,y)$ とする。
- 生存関数は $S_X(x)=P(X>x)=1-F_X(x)$、危険率は $h_X(x)=f_X(x)/S_X(x)$、累積危険率は $H_X(x)=-\log S_X(x)$ とする。
- 確率母関数は $G_X(s)=E[s^X]$、モーメント母関数は $M_X(t)=E[e^{tX}]$、特性関数は $\varphi_X(t)=E[e^{itX}]$ とする。
- キュムラント母関数は $K_X(t)=\log M_X(t)$、第 $r$ キュムラントは $\kappa_r=K_X^{(r)}(0)$ とする。
- $Z\sim N(0,1)$ の確率密度関数を $\phi(z)$、累積分布関数を $\Phi(z)$ とする。
- $z_\alpha$ は標準正規分布の上側 $\alpha$ 点、すなわち $P(Z>z_\alpha)=\alpha$ とする。$t_{\nu,\alpha}$、$\chi^2_{\nu,\alpha}$、$F_{\nu_1,\nu_2,\alpha}$ も上側確率点とする。

個々の分布の台・母数化・密度または確率質量関数は [`distribution-notation-guide.md`](distribution-notation-guide.md) を参照する。同じ一覧を教材固有ファイルへ複製しない。

## 3. 収束・漸近記法・推測

- 分布収束は $X_n\xrightarrow{d}X$、確率収束は $X_n\xrightarrow{p}X$、概収束は $X_n\xrightarrow{\mathrm{a.s.}}X$ とする。
- 分布収束を表す主表記は $\xrightarrow{d}$ とする。$\Rightarrow$ や、分布への収束を意味する裸の $\to$ を同じ教材内で混在させない。
- 同分布は $X\overset{d}{=}Y$ とし、通常の等号と区別する。
- 決定論的なオーダー記法は $a_n=O(b_n)$、$a_n=o(b_n)$、確率的オーダー記法は $X_n=O_p(a_n)$、$X_n=o_p(a_n)$ とする。$O_p(a_n)$ は $X_n/a_n$ が確率的に有界、$o_p(a_n)$ は $X_n/a_n\xrightarrow{p}0$ を意味する。
- 推定量の漸近分散は $\operatorname{Avar}(\widehat\theta)$ とする。有限標本の分散 $\operatorname{Var}(\widehat\theta)$ と区別する。
- 推定量 $T$ の偏りは $\operatorname{Bias}_\theta(T)=E_\theta[T]-\theta$、平均二乗誤差は $\operatorname{MSE}_\theta(T)=E_\theta[(T-\theta)^2]$ とする。母数添字が明らかな場合は省略してよい。
- 標準誤差は必要なら $\operatorname{SE}(\widehat\theta)=\sqrt{\operatorname{Var}(\widehat\theta)}$ と書く。推定標準誤差を使う場合は、何を代入推定したかを本文で明記する。
- 母数空間は $\Theta$、真値または帰無仮説で指定する値は文脈に応じて $\theta_0$ とする。推定量は $\widehat\theta$ を主表記とするが、短い母数に対する既存の $\hat\theta$ も同義として許容する。同一問題・同一節では $\widehat{\cdot}$ と $\hat{\cdot}$ を同じ対象に混在させない。
- 尤度は $L(\theta;x)$、対数尤度は $\ell(\theta;x)$、スコアは $U(\theta)=\partial\ell(\theta;x)/\partial\theta$ とする。
- フィッシャー情報量は1観測当たりを $I_1(\theta)$、標本全体を $I_n(\theta)$、多母数の場合の情報行列を $\boldsymbol I(\boldsymbol\theta)$ とする。
- 帰無仮説は $H_0$、対立仮説は $H_1$、有意水準は $\alpha$、検出力関数は $\pi(\theta)$ とする。
- $p$ 値は小文字斜体 $p$ とし、確率測度 $P$ と区別する。

## 4. ベクトル・行列・線形モデル

- 一般のベクトルは太字小文字 $\boldsymbol x$、行列は太字大文字 $\boldsymbol X$ を基本とする。
- 回帰・線形モデルでは、慣例上 $y=X\beta+\varepsilon$ のように非太字で行列・ベクトルを書く教材もある。この表記を使う場合は、$X$ が行列、$y,\beta,\varepsilon$ がベクトルであることと次元を初出時に明記し、同一問題内で太字・非太字を同じ対象に混在させない。
- 転置の主表記は $\boldsymbol X^{\mathsf T}$ とする。既存資料の $X^T$ や $X^\top$ は同じ転置を意味するが、新規記述では $^{\mathsf T}$ を優先し、同一問題内で流儀を混在させない。
- 逆行列は $\boldsymbol X^{-1}$、$n$ 次単位行列は $\boldsymbol I_n$ を基本とする。非太字の線形モデル流儀では $I_n$ を用いてよい。
- 行列 $A$ の行列式は $\det(A)$ を主表記とする。多変量正規密度などで、行列であることが明白な $|A|$ を行列式として使う既存表記も許容するが、絶対値と紛らわしい箇所では $\det(A)$ を使う。
- 行列 $A$ のトレースは $\operatorname{tr}(A)$、対角成分または対角行列を表す演算子は $\operatorname{diag}(\cdot)$ とする。
- 行列 $A$ の階数は $\operatorname{rank}(A)$、列空間は $\mathcal C(A)$ とする。
- ベクトルのノルムは $\lVert\boldsymbol x\rVert$ とし、添字がなければユークリッドノルムを意味する。別のノルムを使うときは $\lVert\boldsymbol x\rVert_1$ などと明記する。
- ベクトルの直交は $\boldsymbol u\perp\boldsymbol v$、部分空間 $V$ の直交補は $V^\perp$ とする。確率論の独立にも同じ $\perp$ を使うため、対象を明示する。
- 線形モデルは $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ または上記の宣言済み非太字流儀を使い、必要な次元を初出時に示す。
- 自己共分散は $\gamma(h)$、自己相関は $\rho(h)$、バックシフト演算子は $B$ とする。

## 5. 一般・局所記号の扱い

- 自然数は $\mathbb N=\{1,2,\ldots\}$、非負整数は $\mathbb N_0$ とする。
- 定義としての等号は必要に応じて $\coloneqq$ を使う。
- 比例関係は $\propto$ とする。密度・尤度などで正規化定数や母数に依存しない因子を落として使う場合は、「何を変数（または母数）として比例しているか」が分かる文脈にする。
- 同じ節・問題・カード内で記号の意味を無言で変更しない。
- $\arg\max$、$\arg\min$、$\sup$、$\inf$ のような標準演算子を使う場合も、最適化する変数・範囲が曖昧にならない式にする。
- `SSE`、`SSR`、射影行列 $H,M$、尤度比 $\Lambda$、Wald統計量 $W$、スコア統計量、実験計画の効果記号、管理図定数など、問題・分野によって意味や流儀が変わる記号は共通正本へ固定しない。**各問題・各節の初出時に意味を宣言する。**
- 教科書・過去問・公式資料の記法が共通正本と異なる場合は、引用元の記号をそのまま全教材の標準へ昇格させず、対応関係を初出で明記する。
- 分野固有の記号は、その分野を扱う本文・問題・カードで初出時に宣言する。複数教材で繰り返し使うことが判明した記号だけ、この共通正本へ昇格させる。

## 6. 適用順序

記号は「上位規約」と「対象の具体性」で解決する。

1. `CONTENT_GUIDELINES.md` に反するローカル規約は作らない。
2. 分布固有の台・母数化・密度などは `references/distribution-notation-guide.md` を優先する。
3. それ以外の一般記号は `references/notation-guide.md` に従う。
4. 教材固有の `notation.md` は、共通正本に未定義の追加事項だけを定め、共通正本を上書きしない。
5. 個別問題・個別カードで原資料と異なる記号を使う必要がある場合は、その場で対応関係を明示する。

共通化できるローカル差分が増えた場合は、このファイルへ移してローカル側から削除する。
