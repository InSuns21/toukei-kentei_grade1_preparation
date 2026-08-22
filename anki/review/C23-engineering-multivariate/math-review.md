# C23-engineering-multivariate 独立数理査読

- reviewer_id: `/root/c23_math_review`
- initial_reviewer_id: /root/c23_math_review
- reviewed_at: `2026-08-22T20:07:40+09:00`
- initial_reviewed_at: 2026-08-22T20:07:40+09:00
- review_round: `initial`
- scope: `anki/cards/45_engineering_multivariate.md` の C23 新規42枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`
- fatal: 0
- major: 3
- minor: 1

## 検証結果

- `npm run anki:validate`: 成功（1154 cards、0 warnings、生成HTML一致）
- `npm run validate`: 成功（構造検証、358 Markdown の KaTeX strict、237生成対象テキスト）
- 全42枚に「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節がある。
- 機械検証は通るが、`qquad` は未定義コマンドにならず英字の積として解釈されるため、MATH-C23-001は検出されない。

## 初回指摘

### MATH-C23-001 — major — LaTeX脱字により配置の答えが別の数式として表示される

- 場所: `engmv-classical-mds-three-points` の答え
- 根拠: `x_1=-1,qquad x_2=0,qquad x_3=1` の2箇所で空白コマンドのバックスラッシュが欠けている。KaTeXでは `qquad` が英字の積として数式に入り、3座標を並べた等式として正しく表示されない。
- 独立再計算: $(-1,0,1)$ の平均は0で、$|x_1-x_2|=1$、$|x_2-x_3|=1$、$|x_1-x_3|=2$。数値解自体は正しい。
- 修正案: `$$x_1=-1,\qquad x_2=0,\qquad x_3=1$$` とする。

### MATH-C23-002 — major — 信頼楕円の正確なカイ二乗分布に必要な標本モデルがない

- 場所: `engmv-confidence-ellipsoid-known-cov`
- 根拠: 問題は $n$、標本平均、既知共分散だけを指定しており、独立同分布な多変量正規標本であることを指定していない。一般母集団では $n(\bar{\boldsymbol X}-\boldsymbol\mu)^\top\Sigma^{-1}(\bar{\boldsymbol X}-\boldsymbol\mu)$ が有限標本で正確に $\chi_p^2$ に従うとは限らず、「95%信頼楕円」という結論はそのままでは保証されない。
- 独立再計算: 正規標本なら $\bar{\boldsymbol X}\sim N_2(\boldsymbol\mu,I_2/25)$ なので二次形式は $\chi_2^2$。候補点では $25\{(-0.2)^2+(-0.3)^2\}=3.25<5.991$ で、包含判定自体は正しい。
- 修正案: 問題文に「$\boldsymbol X_1,\ldots,\boldsymbol X_{25}$ は独立同分布に $N_2(\boldsymbol\mu,I_2)$ に従う」を加える。漸近近似として扱うなら、その旨を明記する。

### MATH-C23-003 — major — 事前確率付きLDA得点に必要な正規モデル・損失条件がない

- 場所: `engmv-lda-prior-probability`
- 根拠: 問題は平均、共通分散、事前確率だけを指定しているが、使用公式 $\delta_k(x)=x\mu_k-\mu_k^2/2+\log\pi_k$ は各群の条件付き分布が共通分散1の正規分布であり、通常の0--1損失で最大事後確率分類を行うときに導かれる。任意の同分散分布には成立しない。
- 独立再計算: 正規モデルなら $\log f_k(x)+\log\pi_k=-\{x^2-2x\mu_k+\mu_k^2\}/2+\log\pi_k+\text{共通定数}$ から提示式を得る。$x=1$ では $\delta_1=\log0.8\approx-0.2231$、$\delta_2=2-2+\log0.2\approx-1.6094$ で群1となり、数値は正しい。
- 修正案: 問題文または記号・用語に、各群が $N(\mu_k,1)$、誤分類損失が等しいことを明記する。

### MATH-C23-004 — minor — 公式集の2標本Hotelling統計量で $S_p$ が未定義

- 場所: `anki/formulae.md` の「2標本Hotelling統計量」
- 根拠: 式に $S_p$ を用いるが、同項目にも `anki/notation.md` の多変量解析節にも、これが2群の不偏標本分散共分散行列を自由度でプールした行列であるとの定義がない。`anki/notation.md` の $S_W$ や、区間推定節の1変量の $S_p^2$ とは別物である。
- 修正案: 同項目で
  $$S_p=\frac{(n_1-1)S_1+(n_2-1)S_2}{n_1+n_2-2}$$
  と定義し、多変量正規性、群間独立、共通共分散、可逆性も簡潔に添える。

## 独立再計算で一致した主要数値・恒等式

- `engmv-normal-density-numeric`: $|\Sigma|=4$、二次形式2、$f(1,2)=e^{-1}/(4\pi)\approx0.0293$
- `engmv-sample-covariance-matrix`: 外積和 $\begin{pmatrix}8&-4\\-4&8\end{pmatrix}$、$S=\begin{pmatrix}4&-2\\-2&4\end{pmatrix}$
- `engmv-covariance-matrix-validity`: $|A|=-5$、$(1,-2)A(1,-2)^\top=-4$
- `engmv-linear-combination-normal`: 平均 $-3$、分散 $4+36-4=36$
- `engmv-conditional-normal-numeric`: 条件付き平均2、条件付き分散3
- `engmv-covariance-linear-transform-matrix`: $A\Sigma A^\top=\begin{pmatrix}7&-1\\-1&3\end{pmatrix}$
- `engmv-precision-conditional-independence`: 提示精度行列は正定値（主座小行列式 $2,6,7$）で、$\Omega_{12}=0$ による条件付き独立判定は有効
- `engmv-hotelling-two-sample`: Mahalanobis二乗距離1.5、有効標本係数5、$T^2=7.5$
- `engmv-spectral-reconstruction`: $3\boldsymbol v_1\boldsymbol v_1^\top+\boldsymbol v_2\boldsymbol v_2^\top=\begin{pmatrix}2&1\\1&2\end{pmatrix}$
- `engmv-standardized-pca-2x2`: 固有値1.8、0.2、第1寄与率0.9
- `engmv-factor-covariance-numeric`: $\Sigma=\begin{pmatrix}1&0.48\\0.48&1\end{pmatrix}$
- `engmv-factor-communality-numeric`: 共通性0.65、独自性0.35
- `engmv-lda-pooled-covariance`: $S_p=\operatorname{diag}(25/8,23/8)$
- `engmv-qda-quadratic-term`: 得点差 $\log2-3x^2/8$、境界 $|x|=\sqrt{8\log2/3}\approx1.36$
- `engmv-ward-merge-increase`: $\Delta=30$
- `engmv-canonical-eigenvalue`: 固有値0.36、0.04、正準相関0.6、0.2
- `engmv-mds-stress`: $\operatorname{Stress}=1/\sqrt{14}\approx0.2673$

## 再査読欄

- revision_reviewer_id: `/root/c23_math_review`
- revision_reviewed_at: `2026-08-22T20:19:47+09:00`
- status: `approved`
- fatal: 0
- major: 0
- minor: 0

## 修正確認

- MATH-C23-001: 解消。`engmv-classical-mds-three-points` の2箇所は `\qquad` となり、$(-1,0,1)$ の中心0と距離 $(1,1,2)$ を再確認した。
- MATH-C23-002: 解消。`engmv-confidence-ellipsoid-known-cov` は独立な2変量正規標本を明記した。$25\{0.2^2+0.3^2\}=3.25<5.991$ を再確認した。
- MATH-C23-003: 解消。`engmv-lda-prior-probability` は各群の1変量正規分布、共通分散、等しい誤分類損失を明記した。得点は $\log0.8\approx-0.2231$ と $\log0.2\approx-1.6094$ で群1となる。
- MATH-C23-004: 解消。`anki/formulae.md` で多変量のプールした不偏分散共分散行列
  $$S_p=\frac{(n_1-1)S_1+(n_2-1)S_2}{n_1+n_2-2}$$
  を定義し、`anki/notation.md` でも $T^2,S_p$ を定義した。

## 差替え・追加カードの独立再計算

- `engmv-mahalanobis-control-limit`: $\Sigma^{-1}=\operatorname{diag}(1/4,1)$、$d_M^2=4^2/4+2^2=8<9.21$。母数推定時は単純なカイ二乗限界でないとの条件も明記されている。
- `engmv-pca-loading-numeric`: $\operatorname{Corr}(X_i,Y_1)=\sqrt{\lambda_1}v_{i1}/\sigma_i=\sqrt3/2\approx0.8660$。係数と負荷量の区別は正しい。
- `engmv-unit-change-correlation-invariance`: $A\Sigma A^\top=\begin{pmatrix}400&3000\\3000&90000\end{pmatrix}$、$3000/\sqrt{400\cdot90000}=0.5$。正の単位変換に対する相関不変性を正しく示す。
- `engmv-fisher-discriminant-direction`: $\boldsymbol w=(0.5,1)^\top$、射影平均 $(2,0)$、中点境界1。$(1,1)^\top$ の得点1.5による群1判定も一致する。
- `engmv-ward-merge-increase`: $\Delta(A,B)=10.8$、$\Delta(A,C)=98/3\approx32.67$、$\Delta(B,C)=12$ で、A--Bの選択は正しい。
- `engmv-canonical-eigenvalue`: $\Sigma_{XY}\Sigma_{YX}=\begin{pmatrix}0.41&0.40\\0.40&0.41\end{pmatrix}$ の固有値は $0.81,0.01$、正準相関は $0.9,0.1$。和・差方向の説明も一致する。
- `engmv-pca-rayleigh-process-variance`: 特性多項式 $\lambda^2-7\lambda+6$、固有値 $6,1$、最大固有値6の単位固有ベクトル $(2,1)^\top/\sqrt5$ を確認した。
- `engmv-hotelling-two-sample-decision`: $p=2$、F自由度 $(2,17)$、変換値 $17\cdot7.5/36=3.5417<3.59$ で、5%水準の非棄却判断は正しい。

## 全文再査読

- 新規44枚すべてで7節テンプレート、1カード1論点、使用公式、条件、カード固有の一手、追跡可能な式展開を確認した。
- 既存初回再計算項目を含む全44枚について、定義・行列次元・正定値性・分布条件・数値例に残存指摘はない。
- `anki/syllabus/coverage.yaml` の `engineering-multivariate` は実在する44新規カードと既存4カードを参照し、5つの公式用語への割当も整合している。

## 最終機械検証

- `npm run anki:validate`: 成功（1156 cards、0 warnings、生成HTML一致）
- `npm run validate`: 成功（構造検証、360 Markdown の KaTeX strict、237生成対象テキスト）

- final_reviewer_id: /root/c23_math_review
- final_reviewed_at: 2026-08-22T20:19:47+09:00
- final_status: `approved`
- fatal: 0
- major: 0
- minor: 0

fatal: 0 / major: 0 / minor: 0
