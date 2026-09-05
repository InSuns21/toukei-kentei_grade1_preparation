# 公式シラバス用語 → 通常教材対応監査

`anki/syllabus/syllabus.yaml` の公式用語例を正本とし、通常教材43章だけを対象に機械照合した対応表です。DREAM THEATER・advanced/core 問題集などの補助教材は被覆判定に含めません。

- 監査日: 2026-09-05
- 通常教材: 43章
- 公式用語出現: 209件
- exact: 195
- alias: 14
- scope-only: 0
- missing: 0
- 明示的な定義ラベルヒット: 75件

`alias` は公式表記そのものではなく、日本語同義語・慣用表記で本文に回収されているものです。`定義アンカー` は `formal-statement` 内の定義ラベル（例: `定義（尤度関数）`）そのものが公式語または登録済み別名に対応するときだけ表示します。定義本文に偶然その語が出るだけでは定義扱いしません。`—` は教材全体での未扱いを意味しません。

|公式区分|公式用語|判定|主対応（章 / 節・アンカー）|定義アンカー|例|演習|
|---|---|---|---|---|---|---|
|math-events|確率の計算|exact|P1-01 / 公式出題範囲との対応|—|—|—|
|math-events|統計的独立|exact|P1-02 / 公式出題範囲との対応|—|—|—|
|math-events|条件付き確率|exact|P1-01 / 問題|—|—|P1-02 / P1-A04|
|math-events|ベイズの定理|exact|P1-02 / P1-02 条件付き確率・独立・|—|—|P1-02 / P1-A06 二原因のベイズ計算|
|math-events|包除原理|exact|P1-01 / P1-01 事象と確率|—|—|P1-01 / P1-B01 ちょうど一つ|
|math-distribution-functions|確率関数|exact|I1-01 / 前提知識チェック|—|—|S1-02 / S1-02-C04 指数型分布族から読む|
|math-distribution-functions|確率密度関数|exact|F0-00 / 1. この章で扱う数学|—|—|P2-01 / P2-A02 連続密度の正規化|
|math-distribution-functions|累積分布関数|exact|P2-01 / P2-01 確率変数・確率質量関数・確率密度関数・|—|P2-01 / 例1：離散分布から|P2-01 / P2-A03|
|math-distribution-functions|生存関数|exact|P3-02 / この章で解けるようになる問題|—|—|P3-02 / 7. 演習：問題の直後に解答|
|math-distribution-functions|危険率|exact|E4-02 / E4-02 信頼性・保全性|—|—|E4-02 / E4-02-A01|
|math-distribution-functions|同時分布|exact|F0-00 / 15. 統計でどこに使うか|—|—|E2-04 / E2-04-B01 3時点の|
|math-distribution-functions|周辺分布|exact|P2-01 / P2-01 確率変数・確率質量関数・確率密度関数・累積分布関数|—|I4-02 / 5. 正規分布の簡単な例|P2-01 / P2-B01 二変量離散分布|
|math-distribution-functions|条件付き分布|exact|F0-00 / 15. 統計でどこに使うか|—|I4-01 / 3A.3 例：解析積分が閉じないところからMCMCが必要になる|P3-01 / P3-C03 ポアソン和と|
|math-distribution-functions|確率母関数|exact|P2-02 / P2-02 期待値・分散・共分散・母関数|—|P2-02 / 例5：確率質量関数から|P2-02 / P2-B06|
|math-distribution-functions|モーメント母関数（積率母関数）|alias|P2-02 / P2-02 期待値・分散・共分散・母関数|—|P2-02 / 例6：ベルヌーイ分布から|P2-02 / P2-B07 ベルヌーイ分布から|
|math-distribution-characteristics|モーメント|exact|I1-02 / 2. モーメント法#def-i1-02-moment-method|I1-02 / 2. モーメント法#def-i1-02-moment-method|P2-02 / 例1：離散分布の平均と分散|P2-02 / P2-A06 共分散公式|
|math-distribution-characteristics|期待値|exact|F0-00 / 1. この章で扱う数学|—|—|P2-02 / P2-A04 離散平均・分散|
|math-distribution-characteristics|分散|exact|F0-00 / 15. 統計でどこに使うか|—|P2-02 / 例1：離散分布の平均と|P2-02 / P2-A04 離散平均・|
|math-distribution-characteristics|標準偏差|exact|P2-02 / 2.2 分散・|—|P2-02 / 3A.1 例：同じ|P2-02 / P202-B05 歪度・尖度・変動係数と四分位範囲|
|math-distribution-characteristics|歪度|exact|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-shape-characteristics|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-shape-characteristics|—|P2-02 / P202-B05|
|math-distribution-characteristics|尖度|exact|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-shape-characteristics|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-shape-characteristics|—|P2-02 / P202-B05 歪度・|
|math-distribution-characteristics|変動係数|exact|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-shape-characteristics|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-shape-characteristics|P2-02 / 3A.1 例：同じ標準偏差でも|P2-02 / P202-B05 歪度・尖度・|
|math-distribution-characteristics|パーセント点|exact|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-quantiles|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-quantiles|—|—|
|math-distribution-characteristics|中央値|exact|P2-01 / P2-C05 区分累積分布関数から分布を復元する|—|—|P2-01 / P2-C05 区分累積分布関数から分布を復元する|
|math-distribution-characteristics|四分位数|exact|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-quantiles|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-quantiles|—|P2-02 / P202-B05 歪度・尖度・変動係数と四分位範囲|
|math-distribution-characteristics|範囲|exact|F0-00 / 公式出題|—|P4-01 / 例2 独立な一様分布の和|P2-02 / P202-B05 歪度・尖度・変動係数と四分位|
|math-distribution-characteristics|四分位範囲|exact|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-quantiles|P2-02 / 3A. 分布の形・相対的ばらつき・分位点#def-p2-02-quantiles|—|P2-02 / P202-B05 歪度・尖度・変動係数と|
|math-distribution-characteristics|最頻値|exact|P3-02 / P3C-C02 ベータ分布の形とモーメント|—|—|P3-02 / P3C-C02 ベータ分布の形とモーメント|
|math-distribution-characteristics|共分散|exact|L1-03 / 3A. 共分散分析#def-l1-03-ancova|L1-03 / 3A. 共分散分析#def-l1-03-ancova|P2-02 / 例3：全|P2-02 / P2-A06|
|math-distribution-characteristics|相関係数|exact|P2-02 / この章で解けるようになる問題|—|P3-03 / 例1：分散共分散行列を読む|P2-02 / P2-B05 二値変数の相関|
|math-distribution-characteristics|偏相関係数|exact|P3-03 / P3M-A04 偏相関|—|—|P3-03 / P3M-A04 偏相関|
|math-transformations|変数変換|exact|F0-00 / F0-00 統計検定1級のための数学速習|—|—|P4-01 / P4-A01 平方変換|
|math-transformations|確率変数の線形結合|exact|P4-02 / 詳細解答|—|—|—|
|math-limit-approximations|大数の弱法則|alias|P4-02 / P4-02 確率変数の収束・大数則・中心極限定理|—|—|P4-02 / P4T-B02|
|math-limit-approximations|中心極限定理|exact|F0-00 / 1. この章で扱う数学|—|I2-01 / 2.2 例: 標本平均|P4-02 / P4T-B03 ポアソン標本平均の近似確率|
|math-limit-approximations|二項分布の正規近似とポアソン近似|alias|P4-02 / この章で解けるようになる問題|—|P4-02 / 例3：二項分布の|P4-02 / P4T-A04 希少二項の平均・分散|
|math-limit-approximations|少数法則|exact|P4-02 / 3A.|—|P4-02 / 3A.1 例：希少故障件数|P4-02 / P402-A05|
|math-limit-approximations|連続修正|exact|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-yates-correction|—|—|—|
|math-discrete-distributions|一様分布|exact|P2-01 / 2.2 台#def-p2-01-support|—|P4-01 / 例2 独立な|P2-01 / P2-C04 最大値と最小値|
|math-discrete-distributions|ベルヌーイ分布|exact|P2-02 / 例6：|—|P2-02 / 例6：|P2-02 / P2-B07|
|math-discrete-distributions|二項分布|exact|P2-02 / 例6：ベルヌーイ分布からモーメント母関数を作る|—|P2-02 / 例6：ベルヌーイ分布からモーメント母関数を作る|P3-01 / P3-A01 二項確率|
|math-discrete-distributions|超幾何分布|exact|P3-01 / この章で解けるようになる問題|—|P3-01 / 例1：二項分布か|P3-01 / P3-B01 非復元抽出|
|math-discrete-distributions|幾何分布|exact|P3-01 / この章で解けるようになる問題|—|P3-01 / 例1：二項分布か超|P3-01 / P3-A02 幾何待ち時間|
|math-discrete-distributions|ポアソン分布|exact|P2-02 / 1. なぜ期待値・分散・母関数を学ぶのか|—|P3-01 / 例3：|P3-01 / P3-A03 ポアソン確率|
|math-discrete-distributions|負の二項分布|exact|P3-01 / この章で解けるようになる問題|—|—|P3-01 / P3-B02 3回目の成功|
|math-discrete-distributions|多項分布|exact|P3-01 / この章で解けるようになる問題|—|—|P3-01 / P3-B03 三カテゴリ|
|math-continuous-distributions|一様分布|exact|P2-01 / 2.2 台#def-p2-01-support|—|P4-01 / 例2 独立な|P2-01 / P2-C04 最大値と最小値|
|math-continuous-distributions|正規分布（ガウス分布）|alias|F0-00 / 1. この章で扱う数学|—|P3-02 / 例4：コーシー分布の重い裾|P2-02 / P202-B05 歪度・尖度・変動係数と四分位範囲|
|math-continuous-distributions|指数分布|exact|P2-02 / PAST-P2M-02: MATH-2023-Q3|—|I1-02 / 例2:|P3-02 / P3C-A02|
|math-continuous-distributions|ガンマ分布|exact|F0-00 / 15. 統計でどこに使うか|—|P3-02 / 例2：|P3-02 / P3C-B01|
|math-continuous-distributions|ベータ分布|exact|F0-00 / 15. 統計でどこに使うか|—|—|P3-02 / P3C-B02|
|math-continuous-distributions|コーシー分布|exact|P3-02 / この章で解けるようになる問題|—|P3-02 / 例4：|P3-02 / P3C-A04|
|math-continuous-distributions|対数正規分布|exact|P3-02 / この章で解けるようになる問題|—|—|P3-02 / P3C-B04|
|math-continuous-distributions|ワイブル分布|exact|P3-02 / この章で解けるようになる問題|—|P3-02 / 例5：|P3-02 / P3C-B03|
|math-continuous-distributions|ロジスティック分布|exact|P3-02 / この章で解けるようになる問題|—|—|P3-02 / P3C-B04 対数正規分布と|
|math-continuous-distributions|多変量正規分布|exact|F0-00 / 15. 統計でどこに使うか|—|—|P3-03 / P3M-A03 周辺と線形結合|
|math-sampling-distributions|t分布|exact|F0-00 / 15. 統計でどこに使うか|—|—|I2-02 / I2-02-C01 正規母平均と母分散を同時に処理する|
|math-sampling-distributions|カイ二乗分布|exact|F0-00 / 15. 統計でどこに使うか|—|S1-01 / 例1 標本分散の確率|P3-03 / P3M-B04 マハラノビス二次形式|
|math-sampling-distributions|F分布|exact|F0-00 / 1. この章で扱う数学|—|—|S1-01 / S1-A04|
|math-population-sample-statistic|十分統計量|exact|S1-02 / 3. 「母数についての情報を失わない」を条件付き分布で定義する#def-s1-02-sufficient-statistic|S1-02 / 3. 「母数についての情報を失わない」を条件付き分布で定義する#def-s1-02-sufficient-statistic|—|I4-02 / I4-02-C01 正規分布の欠測値に必要な条件付きモーメント|
|math-population-sample-statistic|ネイマンの分解定理|exact|S1-02 / この章で解けるようになる問題|—|—|S1-02 / S1-02-A02 ベルヌーイ標本|
|math-population-sample-statistic|順序統計量|exact|F0-00 / 15. 統計でどこに使うか|—|—|P4-01 / P4-A04 一様分布の第2|
|math-likelihood-mle|尤度関数|exact|I1-01 / 2. 定義と記号#def-i1-01-likelihood|I1-01 / 2. 定義と記号#def-i1-01-likelihood|—|—|
|math-likelihood-mle|対数尤度関数|exact|I1-01 / 2. 定義と記号#def-i1-01-loglikelihood|I1-01 / 2. 定義と記号#def-i1-01-loglikelihood|—|—|
|math-likelihood-mle|有効スコア関数|exact|I1-01 / 3.8 有効スコア関数: まず1個の局外母数で考える#def-i1-01-efficient-score|I1-01 / 3.8 有効スコア関数: まず1個の局外母数で考える#def-i1-01-efficient-score|—|—|
|math-likelihood-mle|最尤推定|exact|I1-01 / 2. 定義と記号#def-i1-01-mle|I1-01 / 2. 定義と記号#def-i1-01-mle|I1-01 / 例1: 二項データは「組合せ係数を付けても付けなくても」|P3-04 / P3L-C04 潜在指標が観測される場合とされない場合|
|math-estimation-methods|モーメント法|exact|I1-02 / 2. モーメント法#def-i1-02-moment-method|I1-02 / 2. モーメント法#def-i1-02-moment-method|I1-02 / 例1: 正規平均では最小二乗・最尤・|I1-02 / I1-02-A01 一様分布のモーメント推定|
|math-estimation-methods|最小二乗法|exact|I1-02 / 3. 最小二乗法#def-i1-02-least-squares|I1-02 / 3. 最小二乗法#def-i1-02-least-squares|I1-02 / 例1: 正規平均では最小二乗・最尤・モーメント法が一致する|L1-01 / L1-01-A01 最小二乗推定量を導く|
|math-estimation-methods|線形推定（BLUE）|alias|I1-02 / 6. 線形不偏推定と BLUE#def-i1-02-blue|I1-02 / 6. 線形不偏推定と BLUE#def-i1-02-blue|—|I1-02 / I1-02-B01 逆分散重みによる線形不偏推定|
|math-estimation-methods|その他の手法|exact|I1-02 / I102-B05 推定量の相対効率と推定法の選択|—|—|I1-02 / I102-B05 推定量の相対効率と推定法の選択|
|math-point-estimator-properties|不偏性|exact|I1-02 / 4. バイアス・不偏性・平均二乗誤差#def-i1-02-bias|I1-02 / 4. バイアス・不偏性・平均二乗誤差#def-i1-02-bias|I1-02 / 3A.1 例：|P3-04 / P3L-C01 ポアソン–ガンマ混合から推定へ|
|math-point-estimator-properties|一致性|exact|I1-02 / 5. 一致性#def-i1-02-consistency|I1-02 / 5. 一致性#def-i1-02-consistency|—|P3-04 / P3L-D01 ポアソン–ガンマ混合の総合問題|
|math-point-estimator-properties|十分性|exact|P2-02 / 採点基準と選択判断|—|—|I1-02 / I1-02-D01 ポアソンで同じ量を推定する二つの不偏推定量|
|math-point-estimator-properties|有効性|exact|I1-02 / 8.1 等号条件#def-i1-02-efficient-estimator|I1-02 / 8.1 等号条件#def-i1-02-efficient-estimator|—|I1-02 / I1-02-B03 ポアソン平均の|
|math-point-estimator-properties|推定量の相対効率|exact|I1-02 / 3A. 推定量の相対効率#def-i1-02-relative-efficiency|I1-02 / 3A. 推定量の相対効率#def-i1-02-relative-efficiency|—|I1-02 / I102-B05|
|math-model-selection|カルバック・ライブラー情報量|exact|L2-02 / 2. カルバック・ライブラー情報量#def-l2-02-kl|L2-02 / 2. カルバック・ライブラー情報量#def-l2-02-kl|—|—|
|math-model-selection|情報量規準AIC|exact|L2-02 / 3. 情報量規準AIC#def-l2-02-aic|L2-02 / 3. 情報量規準AIC#def-l2-02-aic|—|—|
|math-model-selection|クロスバリデーション|exact|L1-04 / 14. 過去問・理工80との対応|—|—|—|
|math-asymptotic-estimation|クラーメル・ラオの不等式|exact|I1-01 / I1-01 尤度・最尤推定|—|—|I1-02 / I1-02-B03 ポアソン平均の有効性|
|math-asymptotic-estimation|フィッシャー情報量（1次元）|alias|I1-02 / 7. フィッシャー情報量#def-i1-02-fisher-information|I1-02 / 7. フィッシャー情報量#def-i1-02-fisher-information|—|I1-02 / I1-02-A03 ベルヌーイの|
|math-asymptotic-estimation|最尤推定量の漸近正規性|exact|I1-02 / I1-02 推定法と推定量の評価|—|I2-01 / 10. 非正則例: 一様分布の最尤推定量は $\sqrt n$ 正規ではない#prop-i2-01-uniform-n-rate|I2-01 / I2-01-A02 ベルヌーイ|
|math-asymptotic-estimation|デルタ法|exact|F0-00 / 1. この章で扱う数学|—|I2-01 / 8.1 例: 平均0で $\bar X^2$|I2-01 / I2-01-A03 指数分布の率母数に|
|math-interval-estimation|信頼係数|exact|I2-02 / 1. 信頼区間は「母数がランダム」なのではない#def-i2-02-confidence-coefficient|I2-02 / 1. 信頼区間は「母数がランダム」なのではない#def-i2-02-confidence-coefficient|—|—|
|math-interval-estimation|信頼区間の構成|exact|I2-02 / 公式出題範囲との対応|—|—|—|
|math-interval-estimation|被覆確率|exact|I2-02 / 1. 信頼区間は「母数がランダム」なのではない#def-i2-02-coverage-probability|I2-02 / 1. 信頼区間は「母数がランダム」なのではない#def-i2-02-coverage-probability|—|I2-02 / I2-02-A01 95%信頼区間の意味|
|math-testing-foundations|仮説|exact|I3-01 / 1. 検定は「データから二者択一をする規則」#def-i3-01-hypothesis-classification|I3-01 / 1. 検定は「データから二者択一をする規則」#def-i3-01-hypothesis-classification|I3-01 / 1.1 正規母平均の片側検定を例にする|I3-01 / I3-01-A04 尤度比の向きを読む|
|math-testing-foundations|検定統計量|exact|I3-01 / 1. 検定は「データから二者択一をする規則」#def-i3-01-test-statistic|I3-01 / 1. 検定は「データから二者択一をする規則」#def-i3-01-test-statistic|I3-01 / 1.1 正規母平均の片側検定を例にする|—|
|math-testing-foundations|P値|exact|I3-01 / 4. P値は「どの水準なら棄却されるか」をデータから測る#def-i3-01-pvalue|I3-01 / 4. P値は「どの水準なら棄却されるか」をデータから測る#def-i3-01-pvalue|—|I3-01 / I3-01-A03|
|math-testing-foundations|有意水準|exact|I3-01 / 2. 第一種の過誤を先に制御する#def-i3-01-significance-level|I3-01 / 2. 第一種の過誤を先に制御する#def-i3-01-significance-level|I3-01 / 3A.1 例：標本サイズを増やすと曲線が立つ|I3-01 / I3-01-A01 第一種・第二種過誤を言葉で区別する|
|math-testing-foundations|棄却域|exact|I3-01 / 1. 検定は「データから二者択一をする規則」#def-i3-01-rejection-region|I3-01 / 1. 検定は「データから二者択一をする規則」#def-i3-01-rejection-region|I3-01 / 1.1 正規母平均の片側検定を例にする|I3-01 / I3-01-A02 正規片側検定の検出力|
|math-testing-foundations|第一種の過誤|exact|I3-01 / 2. 第一種の過誤を先に制御する#def-i3-01-type1-error|I3-01 / 2. 第一種の過誤を先に制御する#def-i3-01-type1-error|—|I3-01 / I3-01-A01 第一種・第二種過誤を言葉で区別する|
|math-testing-foundations|第二種の過誤|exact|I3-01 / 3. 第二種の過誤と検出力関数#def-i3-01-type2-error|I3-01 / 3. 第二種の過誤と検出力関数#def-i3-01-type2-error|—|I3-01 / I3-01-A01 第一種・第二種過誤を言葉で区別する|
|math-testing-foundations|検出力（検定力）|alias|I3-01 / 3. 第二種の過誤と検出力関数#def-i3-01-power-function|I3-01 / 3. 第二種の過誤と検出力関数#def-i3-01-power-function|I3-01 / 3A.1 例：標本サイズを増やすと曲線が立つ|I3-01 / I3-01-A02 正規片側検定の|
|math-testing-foundations|検出力曲線|exact|I3-01 / 3A. 検出力曲線#def-i3-01-power-curve|I3-01 / 3A. 検出力曲線#def-i3-01-power-curve|I3-01 / 3A.1 例：標本サイズを増やすと曲線が立つ|I3-01 / I301-A05|
|math-test-derivation|ネイマン・ピアソンの基本定理|exact|I3-01 / 公式出題範囲との対応|—|—|—|
|math-test-derivation|尤度比検定|exact|I3-02 / 2. 尤度比検定: 山の高さを比べる#def-i3-02-likelihood-ratio|I3-02 / 2. 尤度比検定: 山の高さを比べる#def-i3-02-likelihood-ratio|I3-02 / 10. 例: 正規母平均を未知分散の下で|I3-02 / I3-02-A01 高さ・距離・傾き|
|math-test-derivation|ワルド型検定|exact|I3-02 / 4. ワルド型検定: 推定値と帰無値の距離を見る#def-i3-02-wald|I3-02 / 4. ワルド型検定: 推定値と帰無値の距離を見る#def-i3-02-wald|—|I3-02 / I3-02-A01 高さ・距離・傾き|
|math-test-derivation|スコア型検定|exact|I3-02 / 5. スコア型検定: 帰無仮説点での傾きを見る#def-i3-02-score|I3-02 / 5. スコア型検定: 帰無仮説点での傾きを見る#def-i3-02-score|—|I3-02 / I3-02-A01 高さ・距離・傾き|
|math-normal-tests|平均値と分散に関する検定|exact|I3-03 / chapter.yaml|—|—|—|
|math-normal-tests|複数の平均に関する検定|exact|I3-03 / 3A.2|—|—|—|
|math-various-tests|二項分布・ポアソン分布など基本的な分布に関する検定|exact|I3-03 / 3A.1|—|—|I3-03 / I303-B05|
|math-various-tests|適合度の検定|exact|I3-03 / chapter.yaml|—|—|—|
|math-various-tests|ノンパラメトリック検定|exact|I3-01 / 11. 本章と次章以降の境界|—|—|—|
|math-anova|一元配置分散分析|exact|L1-03 / 1. 一元配置：複数の平均を一度に比べる#def-l1-03-one-way-anova|L1-03 / 1. 一元配置：複数の平均を一度に比べる#def-l1-03-one-way-anova|—|L1-03 / L1-03-A01 一元配置の自由度|
|math-anova|二元配置分散分析|exact|L1-03 / 5.4 ここで一般式に戻る#def-l1-03-two-way-anova|L1-03 / 5.4 ここで一般式に戻る#def-l1-03-two-way-anova|—|L1-03 / L1-03-A03 交互作用を差の差で読む|
|math-anova|交互作用|exact|L1-03 / 5.2 交互作用は「差の差」#def-l1-03-interaction|L1-03 / 5.2 交互作用は「差の差」#def-l1-03-interaction|—|L1-03 / L1-03-A03|
|math-anova|共分散分析|exact|L1-03 / 3A. 共分散分析#def-l1-03-ancova|L1-03 / 3A. 共分散分析#def-l1-03-ancova|—|L1-03 / L103-B05|
|math-anova|多重比較|exact|L1-03 / 6. 多重比較：比較を増やすと偶然の有意差も増える#def-l1-03-multiple-comparisons|L1-03 / 6. 多重比較：比較を増やすと偶然の有意差も増える#def-l1-03-multiple-comparisons|—|L1-03 / L1-03-A04 Bonferroni法の有意水準|
|math-regression|線形単回帰|exact|L1-01 / 1. まず「直線＋ばらつき」として考える#def-l1-01-simple-linear-regression|L1-01 / 1. まず「直線＋ばらつき」として考える#def-l1-01-simple-linear-regression|—|L1-01 / L1-01-B04 傾きのt検定|
|math-regression|線形重回帰|exact|L1-02 / 1. まず3本の回帰式を1本の行列式へまとめる#def-l1-02-multiple-linear-regression|L1-02 / 1. まず3本の回帰式を1本の行列式へまとめる#def-l1-02-multiple-linear-regression|—|—|
|math-regression|最小二乗推定|exact|I1-02 / 3. 最小二乗法#def-i1-02-least-squares|I1-02 / 3. 最小二乗法#def-i1-02-least-squares|—|L1-01 / L1-01-A01|
|math-regression|回帰の分散分析|exact|L1-01 / 4A. 回帰の分散分析：平方和分解をF検定へつなぐ#def-l1-01-regression-anova|L1-01 / 4A. 回帰の分散分析：平方和分解をF検定へつなぐ#def-l1-01-regression-anova|—|L1-01 / L1-01-B02 平方和分解を導く|
|math-regression|重相関係数|exact|L1-02 / 3A. 重相関係数#def-l1-02-multiple-correlation|L1-02 / 3A. 重相関係数#def-l1-02-multiple-correlation|L1-02 / 3A.1 例：符号を付けない|L1-02 / L102-A05|
|math-regression|決定係数|exact|L1-01 / 3. 平方和分解と決定係数#def-l1-01-coefficient-of-determination|L1-01 / 3. 平方和分解と決定係数#def-l1-01-coefficient-of-determination|—|L1-01 / L1-01-B03|
|math-regression|残差|exact|L1-01 / 2.2 残差の直交性#def-l1-01-residual|L1-01 / 2.2 残差の直交性#def-l1-01-residual|S1-01 / 例4 平方和分解|P3-03 / P3M-C03|
|math-regression|変数変換|exact|F0-00 / F0-00 統計検定1級のための数学速習|—|—|P4-01 / P4-A01 平方変換|
|math-regression|平均への回帰（回帰効果）|exact|L1-01 / 3A. 平均への回帰（回帰効果）#def-l1-01-regression-to-mean|L1-01 / 3A. 平均への回帰（回帰効果）#def-l1-01-regression-to-mean|L1-01 / 3A.1 例：成績最下位群だけ補習する|L1-01 / L101-B05|
|math-contingency-tables|カイ二乗検定|exact|I3-03 / 3A.3 例：フィッシャー検定と|—|I3-03 / 3A.3 例：フィッシャー検定と|—|
|math-contingency-tables|フィッシャー検定|exact|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-fisher-exact|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-fisher-exact|I3-03 / 3A.3 例：|I3-03 / I303-B06|
|math-contingency-tables|マクネマー検定|exact|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-mcnemar|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-mcnemar|I3-03 / 3A.4 例：|I3-03 / I303-C05|
|math-contingency-tables|イェーツの補正|exact|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-yates-correction|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-yates-correction|—|I3-03 / I303-B06 フィッシャー検定と|
|math-nonparametric|符号検定|exact|I3-03 / 6. 符号検定#def-i3-03-sign-test|I3-03 / 6. 符号検定#def-i3-03-sign-test|—|—|
|math-nonparametric|ウィルコクソン順位和検定（マン・ホイットニーU検定）|alias|I3-03 / この章で解けるようになる問題|—|—|—|
|math-nonparametric|ウィルコクソン符号付き順位和検定|exact|I3-03 / この章で解けるようになる問題|—|—|—|
|math-nonparametric|順位相関係数|exact|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-rank-correlation|I3-03 / 3A.2 複数の平均に関する検定#def-i3-03-rank-correlation|—|I3-03 / I303-C05 マクネマー検定と|
|math-incomplete-data|欠測（欠損）|alias|I4-02 / 1.1 欠測#def-i4-02-missing|I4-02 / 1.1 欠測#def-i4-02-missing|I4-02 / 5. 正規分布の簡単な例|I4-02 / I4-02-A01|
|math-incomplete-data|打ち切り|exact|I4-02 / 1.2 右打ち切り#def-i4-02-censoring|I4-02 / 1.2 右打ち切り#def-i4-02-censoring|—|I4-02 / I4-02-A02 欠測・|
|math-incomplete-data|トランケーション|alias|I4-02 / 1.3 切断#def-i4-02-truncation|I4-02 / 1.3 切断#def-i4-02-truncation|—|P3-05 / P3T-B04 指数分布の右|
|math-simulation|乱数|exact|P4-03 / P4-03 経験分布・|—|P4-03 / 3A.4 例：ブートストラップとMCMCは目的が違う|P4-03 / P4R-A02 指数|
|math-simulation|モンテカルロシミュレーション|alias|P4-03 / P4-03 経験分布・乱数生成・|—|—|P4-03 / P4R-A03|
|math-simulation|MCMC|exact|P4-03 / 3A.2 MCMC：独立標本を直接引けない分布から連鎖で標本を作る#def-p4-03-mcmc|P4-03 / 3A.2 MCMC：独立標本を直接引けない分布から連鎖で標本を作る#def-p4-03-mcmc|P4-03 / 3A.4 例：ブートストラップと|P4-03 / P4R-C06|
|math-simulation|ブートストラップ|exact|P4-03 / 3A.1 ブートストラップ：未知の標本分布を「標本から再現」する#def-p4-03-bootstrap|P4-03 / 3A.1 ブートストラップ：未知の標本分布を「標本から再現」する#def-p4-03-bootstrap|P4-03 / 3A.4 例：|P4-03 / P4R-B05|
|math-bayesian-methods|事前分布|exact|I4-01 / 1. ベイズ更新の出発点#def-i4-01-prior|I4-01 / 1. ベイズ更新の出発点#def-i4-01-prior|I4-01 / 3A.3 例：解析積分が閉じないところからMCMCが必要になる|—|
|math-bayesian-methods|事後分布|exact|I4-01 / 1. ベイズ更新の出発点#def-i4-01-posterior|I4-01 / 1. ベイズ更新の出発点#def-i4-01-posterior|I4-01 / 3A.3 例：解析積分が閉じないところからMCMCが必要になる|—|
|math-bayesian-methods|階層ベイズモデル|exact|I4-01 / 3A.1 階層ベイズモデル：群ごとの母数も母集団から来ると考える#def-i4-01-hierarchical-bayes|I4-01 / 3A.1 階層ベイズモデル：群ごとの母数も母集団から来ると考える#def-i4-01-hierarchical-bayes|—|I4-01 / I401-B05|
|math-bayesian-methods|ギブスサンプリング|exact|I4-01 / 3A.2 ギブスサンプリング：完全条件付き分布を順番に引く#def-i4-01-gibbs|I4-01 / 3A.2 ギブスサンプリング：完全条件付き分布を順番に引く#def-i4-01-gibbs|I4-01 / 3A.3 例：解析積分が閉じないところからMCMCが必要になる|I4-01 / I401-C05|
|applied-research-types|実験研究|exact|S1-03 / この章で解けるようになる問題|—|—|S1-03 / S1-03-A01 研究設計を区別する|
|applied-research-types|観察研究|exact|S1-03 / この章で解けるようになる問題|—|L1-03 / 3A.1 例：共変量で残差平方和が減る|S1-03 / S1-03-A01 研究設計を区別する|
|applied-research-types|調査|exact|P1-01 / P1-C01 三分類|—|—|P1-01 / P1-C01 三分類|
|applied-sampling|完全無作為抽出|exact|I3-03 / 証明|—|S1-03 / 16.1 単純無作為抽出は特殊例|S1-03 / S1-03-A02 有限母集団補正|
|applied-sampling|層化抽出|exact|S1-03 / この章で解けるようになる問題|—|—|S1-03 / S1-03-B02|
|applied-sampling|二段階抽出|exact|S1-03 / 13. なぜ多段階で抽出するのか#def-s1-03-two-stage-psu|S1-03 / 13. なぜ多段階で抽出するのか#def-s1-03-two-stage-psu|—|S1-03 / S1-03-B04|
|applied-sampling|サンプルサイズの設計|exact|S1-03 / 公式出題範囲との対応|—|—|—|
|applied-design|フィッシャーの3原則|exact|S1-03 / S1-03 標本抽出・研究設計|—|—|E3-01 / E3-01-A02|
|applied-design|一元配置法|exact|E3-01 / 公式出題範囲との対応|—|—|—|
|applied-design|二元配置法|exact|E3-01 / 公式出題範囲との対応|—|—|—|
|applied-design|ブロック化|exact|S1-03 / S1-03 標本抽出・研究設計|—|—|—|
|applied-design|乱塊法|exact|E3-01 / E3-01 実験計画・直交表・交絡|—|—|E3-01 / E3-01-B01|
|applied-design|一部実施要因計画|exact|E3-01 / E3-01 実験計画・直交表・交絡|—|—|E3-01 / E3-01-A04 解像度を読む|
|applied-multiple-regression|重回帰モデル|exact|L1-02 / この章で解けるようになる問題|—|—|L1-04 / L1-04-C04 診断結果から対処を選ぶ|
|applied-multiple-regression|変数選択|exact|L2-02 / 7. 変数選択#def-l2-02-variable-selection|L2-02 / 7. 変数選択#def-l2-02-variable-selection|—|L1-04 / L1-04-C03 部分F・AIC・BICでモデル選択を比較する|
|applied-multiple-regression|残差分析|exact|L1-04 / 公式出題範囲との対応|—|—|L1-04 / L1-04-B01 残差分散をハット行列から導く|
|applied-multiple-regression|一般化最小二乗推定|exact|L1-04 / 6.1 重み付き二次形式を最小化する#def-l1-04-gls|L1-04 / 6.1 重み付き二次形式を最小化する#def-l1-04-gls|—|—|
|applied-multiple-regression|ガウス・マルコフの定理|exact|I1-02 / この章で解けるようになる問題|—|—|L1-02 / L1-02-B04 ガウス・マルコフの分散差|
|applied-multiple-regression|多重共線性|exact|L1-04 / 8. 多重共線性: 当てはまるのに係数が決まらない#def-l1-04-multicollinearity|L1-04 / 8. 多重共線性: 当てはまるのに係数が決まらない#def-l1-04-multicollinearity|—|L1-04 / L1-04-A03 VIF|
|applied-multiple-regression|L1正則化法|exact|L1-04 / 10. L1正則化法とLASSO#def-l1-04-l1-regularization|L1-04 / 10. L1正則化法とLASSO#def-l1-04-l1-regularization|—|L1-04 / L1-04-A04 LASSOの軟閾値|
|applied-multiple-regression|回帰診断法|exact|L1-04 / 公式出題範囲との対応|—|—|—|
|applied-multivariate|主成分分析|exact|F0-00 / 1. この章で扱う数学|—|—|E1-02 / E1-02-A01 最大分散から固有値問題|
|applied-multivariate|因子分析|exact|E1-03 / E1-03|—|—|E1-03 / E1-03-B01 主成分分析と|
|applied-multivariate|判別分析|exact|E1-01 / E1-01 多変量正規分布と標本平均ベクトル|—|—|E1-01 / E1-01-B04 線形判別境界|
|applied-multivariate|クラスター分析|exact|E1-03 / E1-03 因子分析・|—|—|—|
|applied-multivariate|ロジスティック回帰分析|alias|L2-01 / この章で解けるようになる問題|—|—|L2-01 / L2-01-A02 ロジットを確率へ戻す|
|applied-multivariate|プロビット分析|exact|E1-04 / E1-04 プロビット・非線形回帰・SVM|—|—|E1-04 / E104-B05 トービット分析の尤度|
|applied-multivariate|トービット分析|exact|E1-04 / 3A. トービット分析#def-e1-04-tobit|E1-04 / 3A. トービット分析#def-e1-04-tobit|—|E1-04 / E104-B05|
|applied-multivariate|一般化線形モデル|exact|L2-01 / L2-01|—|—|L2-01 / L2-01-A01 三要素を分類する|
|applied-multivariate|非線形回帰モデル|exact|E1-04 / E1-04 プロビット・非線形回帰・SVM|—|—|—|
|applied-multivariate|サポートベクターマシン|exact|E1-04 / E1-04 プロビット・非線形回帰・SVM|—|—|—|
|applied-stochastic-processes|マルコフ連鎖|exact|E2-01 / 2.1 マルコフ性#def-e2-01-markov-chain|E2-01 / 2.1 マルコフ性#def-e2-01-markov-chain|—|E2-01 / E2-01-A01 文章から遷移行列を作る|
|applied-stochastic-processes|ランダムウォーク|exact|P4-03 / 3A.3 例：正規化定数が分からなくても比は計算できる|—|P4-03 / 3A.3 例：正規化定数が分からなくても比は計算できる|E2-02 / E2-02-A01|
|applied-stochastic-processes|ポアソン過程|exact|P3-01 / P3-C05 分布選択総合|—|—|P3-01 / P3-C05 分布選択総合|
|applied-stochastic-processes|ブラウン運動|exact|E2-04 / E2-04|—|—|E2-04 / E2-04-A01 基本モーメント|
|applied-time-series|ARIMAモデル|alias|E2-03 / E2-03 AR・MA・|—|E2-05 / 10. AR(1) は状態空間モデルの特殊例|E2-03 / E2-03-A04 差分と|
|applied-time-series|状態空間モデル|exact|L1-04 / 11. 診断から対処へ|—|E2-05 / 8. 数値例：局所レベルモデル|E2-05 / E2-05-B02 gain を条件付き正規から導く|
|engineering-multivariate|多変量正規分布|exact|F0-00 / 15. 統計でどこに使うか|—|—|P3-03 / P3M-A03 周辺と線形結合|
|engineering-multivariate|平均ベクトル|exact|P3-01 / 詳細解答|—|—|P3-03 / P3M-C01 双方向の条件付き正規|
|engineering-multivariate|分散共分散行列|exact|P3-03 / P3-03 多変量分布・条件付き分布|—|P3-03 / 例1：|P3-03 / P3M-A03 周辺と線形結合|
|engineering-multivariate|相関行列|exact|P3-03 / 公式出題範囲との対応|—|—|P3-03 / P3M-C03 残差と偏相関|
|engineering-multivariate|固有値・固有ベクトル|exact|F0-00 / F0-00 統計検定1級のための数学速習|—|—|F0-00 / F0M-B03|
|engineering-stochastic-processes|ランダムウォーク|exact|P4-03 / 3A.3 例：正規化定数が分からなくても比は計算できる|—|P4-03 / 3A.3 例：正規化定数が分からなくても比は計算できる|E2-02 / E2-02-A01|
|engineering-stochastic-processes|マルコフ過程|exact|E2-01 / E2-01 マルコフ連鎖・|—|—|E4-02 / E4-02-D01 2状態連続時間|
|engineering-stochastic-processes|ポアソン過程|exact|P3-01 / P3-C05 分布選択総合|—|—|P3-01 / P3-C05 分布選択総合|
|engineering-stochastic-processes|マルコフ連鎖|exact|E2-01 / 2.1 マルコフ性#def-e2-01-markov-chain|E2-01 / 2.1 マルコフ性#def-e2-01-markov-chain|—|E2-01 / E2-01-A01 文章から遷移行列を作る|
|engineering-stochastic-processes|時系列解析|exact|E2-03 / 公式出題範囲との対応|—|—|—|
|engineering-stochastic-processes|自己回帰過程|exact|E2-03 / E2-03 AR・MA・ARIMA時系列|—|—|—|
|engineering-stochastic-processes|移動平均過程|exact|E2-03 / E2-03 AR・MA・ARIMA時系列|—|—|—|
|engineering-stochastic-processes|ARIMA過程|alias|E2-03 / E2-03 AR・MA・|—|E2-05 / 10. AR(1) は状態空間モデルの特殊例|E2-03 / E2-03-A04 差分と|
|engineering-linear-inference|線形モデル|exact|I1-02 / I1-02 推定法と推定量の評価|—|—|I1-02 / I1-02-C03 ガウス・マルコフを行列で使う|
|engineering-linear-inference|一般化線形モデル|exact|L2-01 / L2-01|—|—|L2-01 / L2-01-A01 三要素を分類する|
|engineering-linear-inference|線形結合の分布|exact|P3-03 / 9. 復習チェック|—|—|L1-02 / L1-02-B02|
|engineering-linear-inference|線形対比|exact|L1-02 / 5. 線形対比は「平均の比較」のための特別な線形結合#def-l1-02-linear-contrast|L1-02 / 5. 線形対比は「平均の比較」のための特別な線形結合#def-l1-02-linear-contrast|—|L1-02 / L1-02-A04|
|engineering-linear-inference|線形制約|exact|L1-02 / 7. 線形制約を行列でまとめる#def-l1-02-linear-constraint|L1-02 / 7. 線形制約を行列でまとめる#def-l1-02-linear-constraint|—|L1-02 / L1-02-B03 文章から|
|engineering-asymptotics|大数の法則|exact|P4-02 / P4-02 確率変数の収束・|—|—|P4-02 / P4T-B02|
|engineering-asymptotics|中心極限定理|exact|F0-00 / 1. この章で扱う数学|—|I2-01 / 2.2 例: 標本平均|P4-02 / P4T-B03 ポアソン標本平均の近似確率|
|engineering-asymptotics|最尤推定量の漸近正規性|exact|I1-02 / I1-02 推定法と推定量の評価|—|I2-01 / 10. 非正則例: 一様分布の最尤推定量は $\sqrt n$ 正規ではない#prop-i2-01-uniform-n-rate|I2-01 / I2-01-A02 ベルヌーイ|
|engineering-asymptotics|漸近分散|exact|I1-02 / 3A. 推定量の相対効率#def-i1-02-relative-efficiency|—|I2-01 / 11.1 発展例: 標本第1・第2モーメントから分散へ|I2-01 / I2-01-A01|
|engineering-asymptotics|一致性|exact|I1-02 / 5. 一致性#def-i1-02-consistency|I1-02 / 5. 一致性#def-i1-02-consistency|—|P3-04 / P3L-D01 ポアソン–ガンマ混合の総合問題|
|engineering-asymptotics|デルタ法|exact|F0-00 / 1. この章で扱う数学|—|I2-01 / 8.1 例: 平均0で $\bar X^2$|I2-01 / I2-01-A03 指数分布の率母数に|
|engineering-quality|管理図|exact|E4-01 / E4-01|—|—|E4-01 / E4-01-A01 $\bar X$ 管理限界|
|engineering-quality|信頼性|exact|P3-02 / P3C-C04 ワイブル寿命|—|—|P3-02 / P3C-C04 ワイブル寿命|
|engineering-quality|保全性|exact|I4-02 / I4-02 欠測・不完全データ・期待値最大化法|—|—|E4-02 / E4-02-A04 保全度と平均修復時間|
|engineering-quality|プロセス管理|exact|E4-01 / 公式出題範囲との対応|—|—|—|
|engineering-quality|工程能力指数|exact|E4-01 / E4-01 管理図と工程能力|—|—|E4-01 / E4-01-A04 $C_p$ と $C_{pk}$|
|engineering-design|実験の計画と実施|exact|E3-01 / E3-01 実験計画・直交表・交絡|—|—|E3-01 / E3-01-C01 設計の欠陥を直し、乱塊法へつなぐ|
|engineering-design|固定効果|exact|L1-03 / 5.4 ここで一般式に戻る#def-l1-03-two-way-anova|—|—|—|
|engineering-design|変量効果|exact|E3-01 / E3-01 実験計画・直交表・交絡|—|—|E3-01 / E3-01-B02|
|engineering-design|交絡因子|exact|E3-01 / 公式出題範囲との対応|—|—|—|
|engineering-design|ブロック化|exact|S1-03 / S1-03 標本抽出・研究設計|—|—|—|
|engineering-design|直交表|exact|S1-03 / S1-03 標本抽出・研究設計|—|—|—|
|engineering-design|交絡法|exact|E3-01 / E3-01 実験計画・直交表・交絡|—|—|—|

## 定義密度監査の読み方

- `定義アンカー` が `—` でも、それだけで教材欠落とは判定しません。公式シラバスには「確率の計算」「複数の平均に関する検定」のような手続き・範囲名も含まれるためです。
- Batch 2 では、明示定義が必要な概念だけを人手で選別し、既存定義との重複を避けて補強します。例題・演習数はこの判定に使いません。

## 判定の読み方

- `exact`: 公式用語そのものが通常教材の `index.md` または `chapter.yaml` に存在します。
- `alias`: 登録済みの日本語同義語・表記揺れで通常教材に存在します。
- `scope-only`: curriculum では担当章が割り当てられているが本文ヒットがありません。
- `missing`: 通常教材43章で本文・担当scopeとも未回収です。

この表は「語が出ているか」と「正式な定義ラベルとして語が定義されているか」を分けて監査します。Batch 1 は missing を0にし、Batch 2 は定義密度を精査します。
