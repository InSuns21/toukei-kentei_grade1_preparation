# C24-engineering-processes 試験適合性査読

- initial_reviewer_id: c24_exam_review
- initial_reviewed_at: 2026-08-22T20:40:09+09:00
- 対象: `anki/cards/46_engineering_processes.md` の新規52枚、既存 `engineering-stochastic-processes` 2枚、C22 `applied-stochastic-processes`・`applied-time-series` 57枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`
- 公式ねらい: 「統計手法の数理的な側面を正しく理解し、応用に結び付けることができる。特に、解析や線形代数などの数学的な理論が実際の応用にどう結び付くのかを理解する。」のうち、確率過程
- 公式terms: ランダムウォーク、マルコフ過程、ポアソン過程、マルコフ連鎖、時系列解析、自己回帰過程、移動平均過程、ARIMA過程
- 参照タイトル: 時系列解析360–380、確率過程381–397
- 参照優先度: S 0 / A 18 / B 20 / C 0

## 初回指摘

### fatal

- なし。

### major

- なし。

### minor

1. 7枚の数式で `\qquad` のバックスラッシュが欠け、配信時に `qquad` が変数列として表示される。
   - 対象: `engproc-random-walk-drift-calibration`、`engproc-arima110-difference-forecast`、`engproc-biased-walk-hit-upper`、`engproc-ctmc-holding-jump-probability`、`engproc-repair-chain-stationary-availability`、`engproc-absorbing-fundamental-matrix`、`engproc-random-walk-difference-data`。
   - 影響: 等式や値の区切りが数式中の文字積として表示され、計算過程を目で追う妨げになる。KaTeX strict検証は通常文字列として受理するため検知しない。
   - 必要な修正: 各 `,qquad` を `,\qquad` に直す。

2. 2枚でLaTeXコマンドのバックスラッシュ欠落により記号の意味が変わる。
   - `engproc-repair-chain-stationary-availability`: 答えの正規化条件が `\pi_0+pi_1=1` となっており、後半を確率 `\pi_1` でなく文字積として表示する。`\pi_0+\pi_1=1` に直す。
   - `engproc-poisson-thinning-defects`: `N_{mathrm{major}}(2)` は下付きラベルがローマン体にならず、`N_{\mathrm{major}}(2)` に直す。
   - 影響: 前者は定常確率の正規化式そのもの、後者は重大欠陥数を表す記号の可読性を損なう。

## ねらい適合性

- 52枚は、確率過程の数理をセンサー累積誤差、劣化・故障修復、故障件数、待ち行列、工程時系列、保全状態、予測出力へ結び付けている。公式ねらいの「数理的な側面を正しく理解し、応用に結び付ける」に直接適合する。
- 線形代数との接続は、遷移行列の二乗、定常分布、吸収連鎖の基本行列と吸収確率行列、生成行列の一様化に現れる。解析との接続は、非一様Poisson過程の累積強度、2状態連続時間Markov連鎖、Brownian bridge、Ornstein--Uhlenbeck過程、スペクトル密度に現れる。
- 公式8用語はすべて `coverage.yaml` で `status: card` とされ、カード本文でも日本語正式名を使って実質的に扱われている。単なる用語列挙でなく、計算・条件判定・診断へ接続されている。
- 全52枚は「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節を各1回持つ。Ankiの範囲として、連結演習、20〜30分完答、答案圧縮、部分点構造、撤退基準、問題選択戦略を要求していない。

## 知識充足性

- 360–380: 弱定常性、自己共分散・ACF、白色雑音、ランダムウォーク、AR(1)・AR(2)、Yule--Walker、MA(1)、ARMA、可逆性、PACF、ACF/PACF識別、差分・ARIMA、季節差分、予測・予測区間、指数平滑、スペクトル、ソフトウェア予測出力を計算または判定できる。
- 381–397: ランダムウォーク、Poisson計数、非一様・複合Poisson、Markov連鎖、遷移確率、Chapman--Kolmogorov関係、定常分布、再帰時間、吸収連鎖、Brown運動を工学例で適用できる。有限次元分布、独立増分・定常増分、指数待ち時間、Gamma到着時間、条件付き一様性、既約性・周期性の定義・基礎判定はC22の `stoch-*` カードが担当し、C24ではそれらを故障・保全・待ち行列等へ適用する役割分担である。
- 計算技能は、和の平均分散、到達確率、吸収時間、行列積・逆行列、定常方程式、積分、条件付き正規分布、ARMA/ARIMA予測、自己共分散、Ljung--Box統計量、スペクトル比を含む。判定技能は、生成行列妥当性、定常性、可逆性、モデル候補、残差白色性、予測区間外れを含む。
- ソフトウェア出力は `engproc-pacf-significance-output`、`engproc-arima-forecast-output`、残差診断カードで、数値を読み取って結論へ進む。C22の係数表・残差出力の一般的な読み方に対し、C24は工程判断と区間復元へ進む。

## 過不足

- C22との重複は、基礎の再掲と工学的適用の段階差として概ね許容できる。例えばC22のPoisson間引き・重ね合わせ、AR(1)平均・予測、MA(1)可逆性、季節差分に対し、C24は欠陥分類、設備故障、工程予測、革新復元、前年同月需要という具体設定で計算を完遂する。
- `engproc-degradation-two-step` と `engproc-chapman-kolmogorov-maintenance` は同じ2段階遷移計算に近いが、前者は劣化経路の確率、後者は全中間状態を足す公式の再生を問う。1カード1論点の反復として許容範囲である。
- M/M/1、一様化、Ornstein--Uhlenbeck過程、非一様Poisson過程は参照タイトルより発展的だが、すべてpriority Bに抑えられ、公式ねらいの解析・線形代数と工学応用の接続を補う。52枚は目安50–60枚に収まり、A技能を圧迫する過剰ではない。
- C24単独では有限次元分布やPoisson到着時間等の定義カードを重複作成していないが、C22が同じtitle_idsの基礎カード群として完了済みであり、全体教材では不足しない。engineeringページのカードにも使用公式・局所定義が再掲され、C22を開かなければ個別計算が解けない構成にはなっていない。

## 優先度根拠

- sourceはA 18件、B 20件、S・Cなしである。C24のpriority Aは、ランダムウォークの平均分散、故障件数、Markov連鎖の多段階確率・定常可用率、定常性・自己共分散・AR/ARMA/ARIMAの推定予測、モデル診断など、頻出の計算・判定技能へ集中している。
- priority Bは、偏り付き到達確率、吸収連鎖、連続時間Markov連鎖、待ち行列、非一様・複合Poisson、Brownian bridge、Ornstein--Uhlenbeck、一様化、スペクトル等の標準から発展寄りの応用である。sourceのB位置付けと整合する。
- `frequency` は全52枚で実過去問確認0のため、優先度は過去問出現件数の直接証拠ではなく、指定親見出しのA/B区分、前提性、計算・判定技能の汎用性を根拠とする。S優先として過大評価したカードはない。

## formulae・notation・coverage・配信品質

- `anki/formulae.md` はChapman--Kolmogorov関係、定常分布、生成行列・保持時間、一様化、吸収連鎖、Poisson・非一様Poisson・複合Poisson、Brown運動、Ornstein--Uhlenbeck、M/M/1、AR・MA・ARIMA、標本自己相関、Ljung--Box、指数平滑、スペクトルを再掲している。
- `anki/notation.md` は $P,Q,N,N(t),\lambda(t),\Lambda(t),\rho,B_t,B,\varepsilon_t,\gamma(h),\rho(h),f(\omega)$ を定義し、生成行列と状態雑音共分散、基本行列と計数過程、利用率と自己相関の記号衝突も文脈で区別している。
- `anki/syllabus/coverage.yaml` は新規52枚と既存2枚を `engineering-stochastic-processes` に列挙し、公式8用語へカードIDを対応付けている。status `complete` はC22との役割分担を含む全体教材として妥当である。
- カードID、subcategory、source topic、coverage参照、カテゴリー配信は機械検証上整合する。配信数式は初回minor 1・2の手動修正が必要である。

## 機械検証

- `npm run anki:validate`: 成功。1208 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、362 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。
- KaTeX strict検証は `qquad`、`pi_1`、`mathrm{major}` を通常の数式文字として受理するため、バックスラッシュ欠落は手動査読指摘として残す。

## 初回集計

- fatal: 0
- major: 0
- minor: 2
- fatal: 0 / major: 0 / minor: 2

## 修正確認

- final_reviewer_id: c24_exam_review
- final_reviewed_at: 2026-08-22T20:45:46+09:00
- 再査読範囲: 初回指摘箇所だけでなく、数理査読による修正を含む全52枚、既存 `engineering-stochastic-processes` 2枚、C22 `applied-stochastic-processes`・`applied-time-series` 57枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml` の作業単位全体

### 初回minorの確認

1. `\qquad` のバックスラッシュ欠落
   - `engproc-random-walk-drift-calibration`、`engproc-arima110-difference-forecast`、`engproc-biased-walk-hit-upper`、`engproc-ctmc-holding-jump-probability`、`engproc-repair-chain-stationary-availability`、`engproc-absorbing-fundamental-matrix`、`engproc-random-walk-difference-data` の全箇所が `,\qquad` に修正された。
   - 全52枚を再検索し、バックスラッシュのない `qquad` は残っていない。初回minor 1は解消した。

2. `\pi_1` と `\mathrm` のバックスラッシュ欠落
   - `engproc-repair-chain-stationary-availability` は、使用公式と答えの双方で `\pi_0+\pi_1=1` となり、定常確率の正規化条件が正しく表示される。
   - `engproc-poisson-thinning-defects` は `N_{\mathrm{major}}(2)` となり、重大欠陥数を表す下付きラベルが正しく表示される。
   - 全52枚を再検索し、同種の `pi_`・`N_{mathrm` は残っていない。初回minor 2は解消した。

### 数理査読由来の修正確認

- `engproc-absorbing-probability-matrix` は行列積 $NR$ の第2行が $(7/18,11/18)$ に修正された。各行和は1で、カード内の確認事項とも一致する。
- `engproc-random-walk-drift-calibration` は標準偏差を $\operatorname{SD}(X_n)=\sqrt{\operatorname{Var}(X_n)}$ と局所定義し、未定義記号を残さない。
- Ljung--Box検定の自由度は `anki/formulae.md` でAR・MAの動的係数数を控除し、切片と革新分散を控除しない規約が明示された。カードの数値例との整合も保たれている。
- `anki/formulae.md` は吸収マルコフ連鎖、連続時間マルコフ連鎖、一様化、非一様ポアソン過程、Ornstein--Uhlenbeck過程、M/M/1待ち行列を含み、`anki/notation.md` は生成行列 $Q$、基本行列 $N$、強度・累積強度、利用率、スペクトル密度を定義する。カードで用いる主要公式・記号との同期を確認した。
- `coverage.yaml` の「マルコフ過程」へBrownian bridge、出生死亡過程、M/M/1の対応IDが補われ、公式termと実カードの意味的対応が改善された。

### 全体再査読

- 全52枚は7節テンプレートを各1回ずつ持ち、公式・定理を問題の近くに再掲する。定義再生、数値計算、条件判定、ソフトウェア出力解釈の各技能を、1カード1論点で反復できる。
- 公式ねらいは、解析を累積強度・連続時間過程・平均回帰・スペクトルへ、線形代数を遷移行列・定常分布・基本行列・一様化へ結び付ける具体例で充足する。
- 公式8用語は全件がカード内で実質的に扱われ、`coverage.yaml` の各term対応と一致する。`engineering-stochastic-processes: complete` は、C22が定義・一般原理、C24が工学的な計算・診断・意思決定を担う教材全体の役割分担として妥当である。
- title_ids 360–380は定常性、自己共分散・ACF・PACF、AR・MA・ARMA・ARIMA、予測、指数平滑、スペクトルを扱う。381–397はC22の基礎カードを前提に、ランダムウォーク、ポアソン過程、マルコフ性・遷移・定常分布・吸収、Brown運動を工学設定へ適用する。A 18 / B 20の指定に対し、中核計算・診断をA、発展的過程・行列計算をBへ置く配分は適切である。
- C22との近接カードは、一般公式・基本定義から、故障・保全・待ち行列・工程予測・残差診断へ進む段階的反復として区別できる。削除すべき同一問題の複製や、A優先技能を圧迫する過剰カードはない。
- 52枚は目安50–60枚に収まり、カテゴリー配信も最大200枚制約内である。Anki範囲外の連結演習、答案圧縮、部分点構造等を要求せず、短時間の再生・計算・判定教材として完結している。

## 再査読時の機械検証

- `npm run anki:validate`: 成功。1208 cards、0 warnings、25 category pages、最大200枚。
- `npm run validate`: 成功。構造検証、364 MarkdownファイルのKaTeX strict検証、237生成対象テキスト検証を完了。

## 最終件数

- fatal: 0
- major: 0
- minor: 0
- fatal: 0 / major: 0 / minor: 0
