# 共通記号ガイド

このファイルを `textbook/`、`statistical-mathematics/`、`applied-rikou-80/`、`anki/` に共通する**記号の正本**とする。

教材固有の `notation.md` は、このファイルとの差分・追加だけを記載する。共通記号をローカル側で再定義しない。分布の台・母数化・確率質量関数・確率密度関数は [`distribution-notation-guide.md`](distribution-notation-guide.md)、用語・略語・日本語表記は [`terminology-guide.md`](terminology-guide.md) を正本とする。

## 1. 確率・標本

- 確率測度は $P$、期待値は $E[X]$、分散は $\operatorname{Var}(X)$、共分散は $\operatorname{Cov}(X,Y)$ とする。
- 指示関数は $\boldsymbol{1}_A$ とし、添字には事象を置く。
- 確率変数は大文字 $X,Y$、観測値は小文字 $x,y$ を基本とする。
- 独立同分布標本は $X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}P_\theta$ とする。
- 標本平均は $\overline X=n^{-1}\sum_{i=1}^nX_i$、不偏標本分散は $S^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\overline X)^2$ とする。
- 相関係数は $\rho_{X,Y}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$、偏相関係数は $\rho_{XY\cdot Z}$ とする。
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

## 3. 収束・推測

- 分布収束は $X_n\xrightarrow{d}X$、確率収束は $X_n\xrightarrow{p}X$、概収束は $X_n\xrightarrow{\mathrm{a.s.}}X$ とする。
- 同分布は $X\overset{d}{=}Y$ とし、通常の等号と区別する。
- 母数空間は $\Theta$、真値または帰無仮説で指定する値は文脈に応じて $\theta_0$、推定量は $\widehat\theta$ とする。
- 尤度は $L(\theta;x)$、対数尤度は $\ell(\theta;x)$、スコアは $U(\theta)=\partial\ell(\theta;x)/\partial\theta$ とする。
- フィッシャー情報量は1観測当たりを $I_1(\theta)$、標本全体を $I_n(\theta)$、多母数の場合の情報行列を $\boldsymbol I(\boldsymbol\theta)$ とする。
- 帰無仮説は $H_0$、対立仮説は $H_1$、有意水準は $\alpha$、検出力関数は $\pi(\theta)$ とする。
- $p$ 値は小文字斜体 $p$ とし、確率測度 $P$ と区別する。

## 4. ベクトル・行列・線形モデル

- ベクトルは太字小文字 $\boldsymbol x$、行列は太字大文字 $\boldsymbol X$ を基本とする。
- 転置は $\boldsymbol X^{\mathsf T}$、逆行列は $\boldsymbol X^{-1}$、$n$ 次単位行列は $\boldsymbol I_n$ とする。
- 線形モデルは $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ とし、必要な次元は初出時に示す。
- 自己共分散は $\gamma(h)$、自己相関は $\rho(h)$、バックシフト演算子は $B$ とする。

## 5. 一般

- 自然数は $\mathbb N=\{1,2,\ldots\}$、非負整数は $\mathbb N_0$ とする。
- 定義としての等号は必要に応じて $\coloneqq$ を使う。
- 同じ節・問題・カード内で記号の意味を無言で変更しない。
- 教科書・過去問・公式資料の記法が共通正本と異なる場合は、引用元の記号をそのまま全教材の標準へ昇格させず、対応関係を初出で明記する。
- 分野固有の記号は、その分野を扱う本文・問題・カードで初出時に宣言する。複数教材で繰り返し使うことが判明した記号だけ、この共通正本へ昇格させる。

## 6. 優先順位

記号が競合した場合は、原則として次の順で解決する。

1. `references/notation-guide.md`（一般記号）
2. `references/distribution-notation-guide.md`（分布固有の規約）
3. 教材固有の `notation.md` に明示された差分
4. 個別問題・個別カードで明示的に宣言した一時的な記号

ローカル差分は、媒体上どうしても必要な場合に限る。共通化できる差分が増えた場合は、このファイルへ移してローカル側から削除する。
