# C22-stochastic-time-series 独立数理査読

- reviewer_id: `/root/c22_math_review`
- initial_reviewer_id: /root/c22_math_review
- reviewed_at: `2026-08-22T19:23:40+09:00`
- initial_reviewed_at: 2026-08-22T19:23:40+09:00
- review_round: `initial`
- scope: `anki/cards/44_stochastic_time_series.md` の C22 新規52枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`
- fatal: 0
- major: 4
- minor: 2

## 検証結果

- `npm run anki:validate`: 成功（1107 cards、0 warnings）
- `npm run validate`: 成功（構造検証、354 Markdown の KaTeX strict、237生成対象テキスト）
- 機械検証は通るが、下記の数式文字列は KaTeX 上で未定義コマンドにならず英字の積として解釈されるため、機械検証成功だけでは検出できない。

## 初回指摘

### MATH-C22-001 — major — LaTeX脱字により公式が別の数式として表示される

- 場所: `ts-spectral-density-ar1` の答え、`ts-kalman-update` の使用公式・答え
- 根拠:
  - スペクトル密度で `1+phi^2-2\phi\cos\lambda` とあり、最初の `phi` にバックスラッシュがない。`phi` はギリシャ文字 $\phi$ ではなく英字の積として組版される。
  - カルマン更新式と数値代入で `qquad` とあり、空白コマンド `\qquad` ではなく英字列として組版される。
- 独立再計算:
  - $|1-\phi e^{-i\lambda}|^2=1+\phi^2-2\phi\cos\lambda$、したがって $f(\lambda)=\sigma^2/[2\pi(1+\phi^2-2\phi\cos\lambda)]$。
  - $v_t=2-1=1$、$F_t=1.75+0.25=2$、$K_t=1.75/2=0.875$、$a_{t\mid t}=1.875$、$P_{t\mid t}=1.75-0.875\times1.75=0.21875$。数値自体は正しい。
- 修正案: `phi` を `\phi`、`qquad` を `\qquad` に直す。

### MATH-C22-002 — major — 分散公式に必要な独立性・無相関性の仮定が問題文にない

- 場所: `stoch-random-walk-mean-variance`、`ts-random-walk-nonstationary`、`stoch-compound-poisson-moments`
- 根拠:
  - `stoch-random-walk-mean-variance` は各 $\xi_i$ の1次元分布だけを指定しているが、$\operatorname{Var}(S_n)=4np(1-p)$ には少なくとも増分同士の無相関、通常は独立同分布が必要。
  - `ts-random-walk-nonstationary` は $\operatorname{Var}(\varepsilon_t)=\sigma^2$ しか明記していないが、$\operatorname{Var}(X_t)=t\sigma^2$ には革新同士の無相関が必要で、平均0も弱定常性の説明に明示すべきである。
  - `stoch-compound-poisson-moments` は $Y_i$ 同士が独立同分布であることは読めるが、$N$ と列 $\{Y_i\}$ の独立性を明記していない。$E[S\mid N]=N\mu$ と $\operatorname{Var}(S\mid N)=N\sigma^2$ はこの独立性を使う。
- 修正案: 各問題の「記号・用語」または問題文に、増分の独立同分布・平均0・有限分散、および $N$ と $\{Y_i\}$ の独立性を明記する。

### MATH-C22-003 — major — 指定テンプレート未適用で、公式から答えへの一手と未定義語が欠けるカードが多数ある

- 場所: `stoch-markov-property`、`ts-weak-vs-strong-stationarity` から `ts-backshift-arma` までの旧形式カード群、`stoch-transition-matrix-check` から `stoch-geometric-brownian-solution` までの旧形式カード群
- 根拠: ユーザー指定の順序「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」に対し、多数のカードで「記号・用語」と「一手／方針」がない。`stoch-three-state-two-step` だけは見出しが `一手` であり表記も不一致。
- 学習上の影響:
  - `ts-ar1-acf` は、$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h})$ と置き、革新と過去の無相関から $\operatorname{Cov}(\varepsilon_t,X_{t-h})=0$ とする一手が書かれていない。
  - `ts-yule-walker-ar2` は連立方程式から数値解までの代入過程を「計算例」に一文だけ置き、答案欄では途中式を省いている。
  - `stoch-gambler-ruin` は2階差分方程式から一次解を得る根拠（$h_{i+1}-h_i=h_i-h_{i-1}$）を省いている。
  - `stoch-compound-poisson-moments` は全分散の2項展開を示さず、$\lambda\mu^2$ がどこから出るか追いにくい。
- 修正案: 全52枚を指定見出しへ統一し、特に上記4枚は「使用公式・定理 → 一手／方針 → 答え」の間に独立再計算可能な途中式を入れる。

### MATH-C22-004 — major — `anki/notation.md` が新規公式の中心記号と同期していない

- 場所: `anki/notation.md` の「線形代数・時系列」、`anki/formulae.md` の「線形モデル・多変量・時系列」
- 根拠: `formulae.md` は $P_{ij}^{(n)},N(t),B_t,B,\varepsilon_t,T,Z,Q,H,a_{t\mid s},P_{t\mid s}$ を用いるが、`notation.md` で正本として定められているのは時系列関係では $\gamma(h),\rho(h)$ だけである。とくに $B_t$（ブラウン運動）と $B$（バックシフト演算子）は形が似て役割が異なるため、時点添字の有無を含めた区別が必要。
- 修正案: `notation.md` に確率過程・時系列の小節を設け、上記記号とカルマンフィルタの予測・更新記号を定義する。`formulae.md` にもカルマン更新式を追加する。

### MATH-C22-005 — minor — 条件付き一様性の表現が順序統計量との区別を欠く

- 場所: `stoch-poisson-conditional-binomial`
- 根拠: 「各到着時刻は区間内で一様」は各時刻の周辺分布としては正しいが、順序付けた到着時刻 $(T_1,\ldots,T_n)$ は独立な一様分布ではなく、独立一様標本の順序統計量と同分布である。現状でも二項条件付き分布の計算 $\binom62(1/2)^6=15/64$ は正しい。
- 修正案: 「順序を無視した $n$ 個の到着点は独立な一様分布、順序付き到着時刻はその順序統計量」と明記する。

### MATH-C22-006 — minor — AR(2)定常条件の数値例が退化している

- 場所: `ts-ar2-stationarity`
- 根拠: $\phi_2=0$ とすると実質AR(1)で、二次多項式が一次へ退化する。「すべての根が単位円外」を2根について練習する例になっていない。述べた定常条件自体は正しい。
- 修正案: 例えば $\phi_1=0.5,\phi_2=0.2$ とし、$1-0.5z-0.2z^2=0$ の2根 $z=(-0.5\pm\sqrt{1.05})/0.4$ の絶対値がともに1を超えることを示すか、係数による同値条件も併記する。

## 独立再計算で一致した主要数値

- `stoch-three-state-two-step`: $p_{13}^{(2)}=1/4$
- `stoch-three-state-stationary`: $\boldsymbol\pi=(1/4,1/4,1/2)$
- `stoch-expected-hitting-time`: $m_1=2$
- `stoch-poisson-count-numeric`: $e^{-6}6^4/4!\approx0.1339$
- `stoch-poisson-conditional-binomial`: $\binom62/2^6=15/64$
- `stoch-brownian-increment-probability`: $1-\Phi(\sqrt2)\approx0.0787$
- `ts-sample-acf`: $\widehat\rho_1=0$
- `ts-simple-exponential-smoothing`: $S_t=106$
- `ts-yule-walker-ar2`: $(\phi_1,\phi_2)=(0.5625,0.0625)$
- `ts-kalman-prediction`: $(a_{t\mid t-1},P_{t\mid t-1})=(1,1.75)$
- `ts-kalman-update`: $(a_{t\mid t},P_{t\mid t})=(1.875,0.21875)$

## 再査読欄

- revision_reviewed_at: `2026-08-22T19:33:23+09:00`
- revision_reviewer_id: `/root/c22_math_review`
- status: `revision_required`
- fatal: 0
- major: 2
- minor: 2

### 修正確認

- MATH-C22-001: 解消。スペクトル密度の `\phi` とカルマン更新式の `\qquad` を確認し、数式を再計算した。
- MATH-C22-004: 解消。`anki/notation.md` に確率過程・時系列の記号が追加され、`anki/formulae.md` にカルマン更新式が追加された。
- 新規5枚:
  - `ts-pacf-lag2-calculation`: $(0.2-0.6^2)/(1-0.6^2)=-0.25$ を確認。
  - `ts-software-arima-coefficients`: $0.72/0.15=4.8$、95%区間 $(0.426,1.014)$ を確認。
  - `ts-software-residual-diagnostics`: $0.016<0.05$ による残差無相関の棄却判断を確認。
  - `ts-ar-causality-check`: 根 $(-0.5\pm\sqrt{1.05})/0.4\approx1.31,-3.81$ を確認。
  - `ts-linear-detrend`: $(\widehat a,\widehat b)=(1,2)$、残差 $(0,0,0)$ を確認。

### 残存指摘

- MATH-C22-002 — major — 未解消。`stoch-random-walk-mean-variance` の問題文に $\xi_i$ の独立同分布性がなく、`ts-random-walk-nonstationary` に革新の平均0・無相関がなく、`stoch-compound-poisson-moments` に $N$ と $\{Y_i\}$ の独立性がない。答えで使う分散公式の仮定が依然として不足している。
- MATH-C22-003 — major — 未解消。全カードを統一したとの前提に反し、例えば `ts-weak-vs-strong-stationarity`、`ts-autocovariance-properties`、`ts-ar1-acf`、`stoch-random-walk-mean-variance` など多数で `## 一手／方針` がなく、複数カードでは `## 記号・用語` もない。`stoch-three-state-two-step` は `## 一手` のままである。空行は増えているが、指定テンプレートへの統一と途中式追加は本文に反映されていない。
- MATH-C22-005 — minor — 未解消。`stoch-poisson-conditional-binomial` は条件付き到着時刻を単に「各到着時刻は区間内で一様」としたままで、順序付き到着時刻が独立一様標本の順序統計量である点を区別していない。
- MATH-C22-006 — minor — 未解消。`ts-ar2-stationarity` の例は依然 $\phi_2=0$ で、AR(2)の二根判定例として退化している。

### 再査読時の機械検証

- `npm run anki:validate`: 成功（1112 cards、0 warnings）
- `npm run validate`: 成功（構造、KaTeX strict、生成対象テキスト）

## 第3回査読（区切りバグ修正後）

- revision_reviewed_at_2: `2026-08-22T19:37:24+09:00`
- revision_reviewer_id_2: `/root/c22_math_review`
- status: `revision_required`
- fatal: 0
- major: 2
- minor: 0

### 解消確認

- 57枚すべてが7節を持ち、見出し総数399、旧 `一手` / `方針` 見出し0を確認した。
- `stoch-random-walk-mean-variance` に増分の独立同分布性、`ts-random-walk-nonstationary` に革新の平均0・無相関、`stoch-compound-poisson-moments` に和の項と計数変数の独立性が本文へ入ったことを確認した。
- `stoch-poisson-conditional-binomial` に、順序を無視した到着点と順序付き到着時刻の区別が追加されたことを確認した。
- `ts-ar2-stationarity` は $(\phi_1,\phi_2)=(0.5,0.2)$ の非退化例となり、二根の絶対値 $1.31,3.81$ を再計算した。
- 前回までの minor 2件は解消した。

### 残存する自動補完の意味的不整合

- MATH-C22-002 — major — `stoch-compound-poisson-moments` の追加文が問題設定と不整合。
  - 問題は $N\sim\operatorname{Poisson}(\lambda)$、$\operatorname{Var}(Y_i)=\sigma^2$、$S=\sum_{i=1}^NY_i$ と置いている。
  - 追加された「記号・用語」は分散を新記号 $\tau^2$ と置き直し、答えの追加式は未定義の時刻 $t$ を入れて $\lambda tE[Y_1^2]$ としている。
  - 同じ答えの直前には正しく $\operatorname{Var}(S)=\lambda(\sigma^2+\mu^2)$ とあるため、1枚の中で $\lambda$ と $\lambda t$、$\sigma^2$ と $\tau^2$ が競合する。
  - 修正案: $N$ と $\{Y_i\}$ の独立性だけを追記し、全分散展開を
    $$\operatorname{Var}(S)=E[N\sigma^2]+\operatorname{Var}(N\mu)=\lambda\sigma^2+\lambda\mu^2=\lambda E[Y_1^2]$$
    に統一する。$N(t)$、$t$、$\tau^2$ はこのカードから除く。
- MATH-C22-007 — major — `ts-random-walk-nonstationary` に別分野の記号と方針が誤挿入されている。
  - 「記号・用語」に $p_{ij}$、遷移行列 $P$、$n$ 段階遷移確率が入り、「一手／方針」に遷移行列成分・行列積による計算が入っているが、このカードは時系列 $X_t=X_{t-1}+\varepsilon_t$ の分散非定常性を示す問題であり、これらを一切用いない。
  - 読者にはランダムウォークをマルコフ連鎖として解く必要があるように見え、使用する記号・公式の区別を損なう。
  - 修正案: 遷移行列関係を除き、「記号・用語」は $\varepsilon_t$ の仮定と弱定常性、「一手／方針」は $X_t=\sum_{j=1}^t\varepsilon_j$ と展開して無相関による分散加法を使う、とする。

### 第3回査読の機械検証

- `npm run anki:validate`: 成功（1112 cards、0 warnings）
- `npm run validate`: 成功（構造、356 Markdown の KaTeX strict、237生成対象テキスト）

fatal: 0 / major: 0 / minor: 0

## 第4回査読（カード固有方針化後）

- revision_reviewed_at_3: `2026-08-22T19:43:05+09:00`
- revision_reviewer_id_3: `/root/c22_math_review`
- status: `revision_required`
- fatal: 0
- major: 0
- minor: 1

### 解消確認

- MATH-C22-002: 複合Poisson和は $N\sim\operatorname{Poisson}(\lambda)$、$E[Y_i]=\mu$、$\operatorname{Var}(Y_i)=\sigma^2$、$N$ と $\{Y_i\}$ の独立性へ統一された。全分散展開 $\lambda\sigma^2+\lambda\mu^2$ も正しい。
- MATH-C22-007: `ts-random-walk-nonstationary` から遷移行列関係が除かれ、革新の和と分散加法を使う方針へ置換された。
- 57枚の `一手／方針` を全件確認し、各カードの解法に対応する固有方針となっている。

### 残存指摘

- MATH-C22-008 — minor — `ts-random-walk-nonstationary` の仮定と方針の用語が一致しない。
  - 「記号・用語」では革新を「互いに無相関」とだけ仮定しているが、「一手／方針」は「独立な革新の分散を加えて」と、本文で仮定していないより強い独立性へ言い換えている。
  - この分散計算に必要なのは無相関性で十分であり、答え自体 $\operatorname{Var}(X_t)=t\sigma^2$ は正しい。
  - 修正案: 「独立な革新の分散を加えて」を「互いに無相関な革新の分散を加えて」へ変更する。

### 第4回査読の機械検証

- `npm run anki:validate`: 再実行で成功（1112 cards、0 warnings）。初回は共有作業中の生成HTML更新競合でcheckが一時失敗したが、再実行時にカードと生成物の一致を確認した。
- `npm run validate`: 成功（構造、356 Markdown の KaTeX strict、237生成対象テキスト）

## 最終再査読

- final_reviewer_id: /root/c22_math_review
- final_reviewed_at: 2026-08-22T19:45:58+09:00
- status: `approved`
- fatal: 0
- major: 0
- minor: 0

### 最終修正確認

- MATH-C22-008: 解消。`ts-random-walk-nonstationary` の方針は「互いに無相関な革新の分散を加えて」となり、記号欄の仮定と一致した。
- 初回からの全指摘 MATH-C22-001〜008 の解消を確認した。
- 新規57枚の定義、条件、公式、数値例、7節構造、カード固有の方針を最終承認する。

### 最終機械検証

- `npm run anki:validate`: 成功（1112 cards、0 warnings、生成HTML一致）
- `npm run validate`: 成功（構造、356 Markdown の KaTeX strict、237生成対象テキスト）
