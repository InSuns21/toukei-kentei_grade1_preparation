# C22-stochastic-time-series 試験適合性査読

- initial_reviewer_id: c22_exam_review
- initial_reviewed_at: 2026-08-22T10:23:14Z
- 対象: `anki/cards/44_stochastic_time_series.md` の新規52枚、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 公式ねらい: 「重回帰分析・各種多変量解析法・確率過程・時系列解析について正しく理解すると共に、ソフトウェアの出力結果の解釈ができる。」のうち、C22が担当する確率過程・時系列解析
- 参照タイトル: 時系列解析360–380、確率過程381–397
- 参照優先度: S 0 / A 18 / B 20 / C 0

## 初回指摘

### major

1. 公式ねらいの「ソフトウェアの出力結果の解釈」が、確率過程・時系列解析では直接測定されていない。
   - 根拠: `ts-acf-pacf-identification` は作成済みのACF/PACF列を模型的に読むが、ARIMA推定結果の係数・標準誤差・情報量規準・残差診断表など、ソフトウェア出力から統計量と結論を選ばせるカードがない。状態空間モデルの3枚も手計算であり、出力解釈ではない。
   - 影響: 公式aimの「正しく理解」には広く対応する一方、「ソフトウェアの出力結果の解釈ができる」はC22担当範囲で未達になる。
   - 必要な修正: 少なくとも、ARIMA係数表から係数の有意性・定常性を判定するカードと、残差ACFまたはLjung–Box出力からモデル妥当性を判定するカードを追加する。候補IDは `ts-software-arima-coefficients`、`ts-software-residual-diagnostics`。数値を代入し、検定統計量またはP値の判定まで完遂させる。

2. A優先タイトル374「偏自己相関PACF」の計算技能が欠け、B優先タイトル373・377も片側だけの扱いになっている。
   - 根拠: `ts-acf-pacf-identification` はPACFを一文で定義し打切り形を読むだけで、偏自己相関係数を共分散・相関またはYule–Walker方程式から計算しない。`ts-ma1-invertibility` は可逆性を扱うが因果性を定義・判定せず、`ts-seasonal-difference` は季節性を扱うがトレンドの除去・判定を扱わない。
   - 影響: 最優先群AのPACFが「見たら識別できる」に留まり、「与えられた相関から計算できる」を満たさない。タイトル373「因果性と可逆性」、377「トレンド・季節性」もタイトル全体を充足したとは言いにくい。
   - 必要な修正: `ts-pacf-lag2-calculation` を追加し、例えば $\alpha_{22}=(\rho_2-\rho_1^2)/(1-\rho_1^2)$ を数値計算させる。あわせてAR多項式の根から因果性を判定するカード、線形トレンドの差分または回帰除去を計算するカードを追加する。追加後にcoverageのcompleteを再判定する。

3. 指定テンプレートが52枚中40枚で不完全で、公式・定義から答えへ移る操作が明示されないカードが多数ある。
   - 根拠: `stoch-markov-property`、`ts-weak-vs-strong-stationarity` から `ts-backshift-arma`、`stoch-transition-matrix-check` から `stoch-geometric-brownian-solution` は、「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の一部を欠く。`stoch-three-state-two-step` だけは見出しが `一手` で表記も不統一である。
   - 影響: `ts-ar1-acf`、`ts-ar1-forecast-error-variance`、`ts-yule-walker-ar2`、`stoch-gambler-ruin`、`stoch-compound-poisson-moments` などで、どの公式をどの量へ適用するかを読者が補う必要がある。既に明示された教材方針「式展開を読めば追える」「利用公式を明示」に適合しない。
   - 必要な修正: 全52枚を指定順序へ統一し、未定義記号を `記号・用語` へ、最初に行う代入・条件付け・共分散計算・再帰式設定を `一手／方針` へ記す。とくに証明・導出型では、変形前、操作または根拠、変形後を分離する。

### minor

1. `ts-spectral-density-ar1` の分母が `1+phi^2-2\phi\cos\lambda` となり、2か所で `\phi` のバックスラッシュが欠けている。
   - 影響: 数式中に文字列 `phi` が表示され、公式再生を誤らせる。
   - 必要な修正: 2か所とも `1+\phi^2-2\phi\cos\lambda` とする。

2. `ts-kalman-update` の更新式と数値計算に `qquad` が3か所あり、`\qquad` のバックスラッシュが欠けている。
   - 影響: 配信画面で `qquad` が変数列のように表示され、等式を読み取りにくい。
   - 必要な修正: `,qquad` をすべて `,\qquad` に直す。

3. `anki/formulae.md` はC22の主要式を概ね同期しているが、カードで中心的に使うカルマン更新式が掲載されていない。
   - 根拠: 予測式は掲載済みだが、`ts-kalman-update` の予測誤差、予測誤差分散、カルマンゲイン、更新平均・分散はformulaeにない。
   - 必要な修正: 記号の意味とともに、1次元または行列形のカルマン更新式を追記する。

4. `stoch-geometric-brownian-solution` は参照タイトル397「Brown運動の定義と性質（基本）」を超える伊藤計算の発展論点であり、priority B は高めである。
   - 影響: A優先のPACF計算や公式aimの出力解釈が未充足の段階で、学習順序が発展へ先行する。
   - 必要な修正: 削除は必須でないが、残すならpriority Cへ下げる。中核不足を追加した後の補助カードとして扱う。

## ねらい適合性

- 確率過程の「正しく理解」は概ね達成している。`stoch-markov-property` から遷移行列、Chapman–Kolmogorov関係、定常分布、既約性・周期・再帰性、吸収確率・平均到達時間へ進み、マルコフ連鎖の再生・計算・判定を一通り扱う。
- ランダムウォーク、ポアソン過程、ブラウン運動も、平均分散、待ち時間・到着時刻、条件付き件数、複合ポアソン、増分分布・共分散まで具体計算を含む。公式term4件はすべて実質的なカードを持つ。
- 時系列解析は定常性、自己共分散・自己相関、AR・MA・ARMA・ARIMA、予測、指数平滑、スペクトル、状態空間まで広い。公式term「ARIMAモデル」「状態空間モデル」は両方とも実質的に扱う。
- 一方、公式aimの出力解釈はmajor 1のとおり未達である。手計算が豊富であることは、出力の列・統計量・診断結果を読む技能の代替にはならない。

## 知識充足性

- 381–397は、既存 `process-poisson-wait` を385へ再利用し、`stoch-finite-dimensional-distribution`、ポアソン計数・到着・条件付け、マルコフ性・遷移・定常・再帰・吸収、ブラウン運動のカード群で概ね充足している。既存カードを無理に複製しない判断は妥当である。
- 360–372、375–380は概ね対応する。既存 `process-ar1-stationary` と `process-ma1-autocovariance` を366・370へ活用し、新規カードは平均、ACF、予測、AR(2)、Yule–Walker、可逆性、ARIMA、指数平滑、スペクトルへ役割を広げている。
- 374のPACF計算、373の因果性、377のトレンド、公式aimの時系列出力解釈は不足している。特にPACFはA優先なので、認識カード1枚だけで充足とするのは不適切である。
- 状態空間モデルはタイトル一覧外だが公式termであり、`ts-state-space-definition`、`ts-kalman-prediction`、`ts-kalman-update` の3枚追加は妥当である。

## 過不足

- 不足: ARIMA係数・残差診断の出力解釈、PACFの具体計算、AR因果性の判定、トレンドの除去計算。
- 過剰: 幾何ブラウン運動は基本範囲より発展的だが1枚だけであるため、中核不足を補った後にC優先で残すなら許容できる。ポアソン間引き・重ね合わせ、詳細釣合い、カルマンフィルタも周辺拡張だが、1カード1論点で応用価値があり削除不要である。
- 重複: `stoch-three-state-two-step` と既存 `process-markov-two-step`、`stoch-three-state-stationary` と既存 `process-stationary-markov` は同じ公式を使うが、2状態から3状態への計算拡張であり、数値例の単純複製ではない。重複として削除する必要はない。
- 配信・検索: subcategory、title、hashtags、coverageのカードID対応は整っている。coverageは機械的には同期済みだが、上記不足を修正するまで意味上のcomplete判定は保留すべきである。

## 優先度根拠

- sourceはA 18、B 20でS/Cを含まない。A群の定常性、自己共分散、ACF、AR(1)、AR(2)、Yule–Walker、ARMA、PACF、ポアソン過程、到着回数・到着分布・条件付け・複合過程、定常分布を先に計算できる設計が必要である。
- 現状は多くのA群を具体計算で扱うが、AのPACFだけが認識に留まる。追加するPACF計算カードはAとするべきである。
- 出力解釈カードは公式aimに直接必要なのでA、因果性とトレンド除去はsourceに従いBが妥当である。
- `stoch-geometric-brownian-solution` はsourceの基本Brown運動を越えるためCが妥当であり、現在のB指定は優先度根拠と一致しない。

## 機械検証

- `npm run anki:validate`: 成功。1107 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、354 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。
- KaTeX strict検証は `phi` と `qquad` を数式中の通常文字として受理するため、表示上の誤記は手動査読指摘として残す。

## 初回集計

- fatal: 0
- major: 3
- minor: 4
- fatal: 0 / major: 3 / minor: 4

## 修正確認

- final_reviewer_id: c22_exam_review
- final_reviewed_at: 2026-08-22T10:44:32Z
- 再査読範囲: 初回指摘箇所だけでなく、新規5枚を含む全57枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml` の作業単位全体

### 初回majorの確認

1. 公式aimのソフトウェア出力解釈
   - `ts-software-arima-coefficients` が、ARIMA係数表の推定値と標準誤差からWald統計量を計算し、有意性とAR(1)の定常性を区別して判定させる。信頼区間と単位根判断を混同しない注意もある。
   - `ts-software-residual-diagnostics` が、Ljung--Box検定出力のP値から残差の白色性を判定し、モデルに依存が残るという解釈と次の診断候補まで示す。
   - 2枚により、公式ねらいの「ソフトウェアの出力結果の解釈ができる」はC22担当範囲で直接測定されるようになった。初回major 1は解消した。

2. PACF・因果性・トレンドの不足
   - `ts-pacf-lag2-calculation` がDurbin--Levinson公式を明示し、$ho_1=0.6,ho_2=0.2$ からラグ2偏自己相関 $-0.25$ を導く。A優先タイトル374は再生だけでなく具体計算まで充足した。
   - `ts-ar-causality-check` がAR(2)多項式の2根を実際に計算し、両方が単位円外であることから因果性を判定する。source 373に合わせpriority Bへ修正された。
   - `ts-linear-detrend` が最小二乗法で線形トレンドを推定し、各観測から差し引いて残差系列まで計算する。source 377のトレンド側が季節差分カードを補完した。
   - 初回major 2は解消した。

3. 7節テンプレートと式展開
   - 全57枚について「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節、合計399見出しを確認した。旧 `一手` / `方針` 見出しは残っていない。
   - 旧40枚の `一手／方針` は機械的な共通文ではなく、カード固有の最初の操作へ修正された。例として、`ts-ar1-acf` はモデル式と過去値の共分散、`ts-yule-walker-ar2` は連立方程式への代入と消去、`stoch-compound-poisson-moments` は到着数による条件付け、`stoch-brownian-covariance` は過去値と独立増分への分解、`stoch-geometric-brownian-solution` は伊藤公式・積分・指数化を明示する。
   - `stoch-three-state-two-step` は $p_{ij}$ と $p_{ij}^{(2)}$、`stoch-detailed-balance-check` は $p_{ij}$ と $pi_i$ をカード内で定義し、最後まで残っていた汎用的な記号説明も解消した。
   - 導出カードには、AR(1)の自己相関、Yule--Walker方程式、全分散などで中間式が追加され、変形元と操作を目で追える。初回major 3は解消した。

### 初回minorの確認

1. `ts-spectral-density-ar1` の分母は、導出式・最終式とも `1+\phi^2-2\phi\cos\lambda` に修正された。
2. `ts-kalman-update` の更新式・数値計算はすべて `\qquad` として正しく表示される。
3. `anki/formulae.md` に、予測誤差、予測誤差共分散、カルマンゲイン、更新平均・更新共分散からなるカルマン更新式が記号説明付きで同期された。
4. `stoch-geometric-brownian-solution` は発展論点としてpriority Cへ下げられ、中核A/Bカードより後に学ぶ順序となった。

### 全体再査読

- 57枚は目安50〜60枚の範囲内で、定義・公式の再生、数値計算、条件判定、モデル識別、予測、出力解釈を1カード1論点で反復できる構成である。
- 公式termは、確率過程側のマルコフ連鎖・ランダムウォーク・ポアソン過程・ブラウン運動、時系列側のARIMAモデル・状態空間モデルをすべて実質的に扱う。`coverage.yaml` のカードIDとterm対応も全57枚および既存再利用カードへ同期されている。
- title_ids 360–397は全件について、既存または新規カードにより実質的に対応する。A優先の定常性、自己共分散、ACF、AR系列、Yule--Walker、ARMA、PACF、ポアソン計数・到着・条件付け、定常分布は具体計算を含む。B優先の因果性・可逆性、トレンド・季節性、予測、指数平滑、スペクトル、再帰性・吸収連鎖、ブラウン運動も役割を分けて扱う。
- 既存 `process-markov-two-step` / `process-stationary-markov` と新規3状態カードは、同じ公式の2状態計算から3状態計算への段階的拡張であり、数値例の複製ではない。既存 `process-poisson-wait`、`process-ar1-stationary`、`process-ma1-autocovariance` を指数待ち時間・AR(1)定常分散・MA(1)共分散へ再利用したため、不要な重複追加もない。
- 状態空間モデルの3枚と出力解釈2枚は参照タイトルを越えているが、前者は公式term、後者は公式aimに直接必要であり過剰ではない。幾何ブラウン運動だけをCとした優先度も妥当である。
- `anki/notation.md` と `anki/formulae.md` は、遷移確率、計数過程、ブラウン運動、バックシフト演算子、自己共分散・自己相関、状態空間モデル、カルマン予測・更新の記号と主要公式を同期している。カードにも使用公式・定理を再掲しており、別ファイル探索を前提としない。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。1112 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、356 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。

## 最終件数

- fatal: 0
- major: 0
- minor: 0
- fatal: 0 / major: 0 / minor: 0
