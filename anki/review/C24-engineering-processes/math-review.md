# C24-engineering-processes 独立数理査読

- 担当ID: `/root/c24_math_review`
- 実行日時: 2026-08-22 (Asia/Tokyo)
- initial_reviewer_id: c24_math_review
- initial_reviewed_at: 2026-08-22T20:40:00+09:00
- 対象: `anki/cards/46_engineering_processes.md` の新規52枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`
- 査読方法: 全カードの問題設定から答え・計算例までを独立再計算し、7節テンプレート、使用公式、条件、記号定義、同期ファイルとの整合を確認した。

## 初回結果

- fatal: 0
- major: 1
- minor: 7

## 指摘

### major

1. `engproc-absorbing-probability-matrix`: 吸収確率行列の第2行が誤っている。提示された
   $$N=\begin{pmatrix}20/9&10/9\\5/9&25/9\end{pmatrix},\qquad
   R=\begin{pmatrix}0.2&0.1\\0.1&0.2\end{pmatrix}$$
   から独立に乗算すると、
   $$NR=\begin{pmatrix}5/9&4/9\\7/18&11/18\end{pmatrix}$$
   である。現記載の第2行 $(1/3,2/3)$ は、たとえば第1列が $(5/9)(0.2)+(25/9)(0.1)=7/18$ になることと一致しない。答えと行和確認を修正すること。

### minor

1. `engproc-random-walk-drift-calibration`: 答えの `,qquad` は `,\qquad` の誤記であり、`qquad` が数式中の変数列として表示される。また、答えで初出の $\operatorname{SD}$ を「標準偏差」として記号・用語節に定義すること。
2. `engproc-arima110-difference-forecast`: 答えの `,qquad` を `,\qquad` に修正すること。現状は数式表示上、不要な文字列が混入する。
3. `engproc-repair-chain-stationary-availability`: 答えの `,qquad` を `,\qquad`、`pi_1` を `\pi_1` に修正すること。後者は定義済みの定常確率記号ではなく文字積として解釈される。
4. `engproc-ctmc-holding-jump-probability`: 答えで $H_1$ を突然導入している。記号・用語節で「$H_1$ は状態1の保持時間」と定義すること。
5. `engproc-ljung-box-numeric` および `anki/formulae.md` のLjung--Box項目: 自由度調整の $k$ を単に「推定したモデル母数の個数」とすると、切片・革新分散まで数えるように読める。通常のARMA残差診断では $m-p-q$（季節項を含めるなら対応する動的係数数を控除）とする旨を明記し、何を $k$ に数えるか限定すること。
6. `anki/formulae.md` のAR(1)スペクトル密度は $f(\lambda)$、`anki/notation.md` と `engproc-ar1-spectral-ratio` は $f(\omega)$ を用いている。到着率 $\lambda$ とも衝突するため、正本の記号を $\omega$ に統一すること。
7. `anki/syllabus/coverage.yaml` の「マルコフ過程」対応カードに、各カード自身が `official_syllabus: マルコフ過程` を出典トピックとして持つ `engproc-brownian-bridge-conditional`、`engproc-birth-death-detailed-balance`、`engproc-mm1-stationary-probability`、`engproc-mm1-little-law` が含まれていない。カード総覧には存在するが用語別coverageが同期していないため追加すること。また `anki/notation.md` と `anki/formulae.md` の英字表記 `Markov` / `Poisson` は、シラバス正本の日本語用語「マルコフ」/「ポアソン」へ統一すること。

## 機械検証

- `npm run anki:validate`: 成功。1208 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（362 Markdown files）、本文検証がすべて成功。
- 注記: 上記の数値誤りと `qquad` / `pi_1` は機械検証では検出されなかったため、成功結果だけでは解消扱いにできない。

## 修正確認

- `engproc-absorbing-probability-matrix` の行列積を独立再計算し、第2行が $(7/18,11/18)$、各行和が1であることを確認した。
- `engproc-random-walk-drift-calibration`、`engproc-arima110-difference-forecast`、`engproc-repair-chain-stationary-availability` の `\qquad` と `\pi_1`、`engproc-poisson-thinning-defects` の `\mathrm{major}` を確認した。
- $\operatorname{SD}$ と $H_1$ の定義追加を確認した。
- `engproc-ljung-box-numeric` と `anki/formulae.md` で自由度控除がAR・MAの動的係数へ限定され、切片・革新分散を含めないことを確認した。
- スペクトル密度の周波数記号が $\omega$ に統一されたことを確認した。
- 「マルコフ過程」の用語別coverageへ4カードが追加され、`anki/notation.md` と対象公式の「マルコフ」「ポアソン」表記がシラバス正本へ統一されたことを確認した。
- 全52枚について、各7節がそれぞれ52件存在すること、初回指摘以外に新たな計算誤り・条件欠落・未定義記号がないことを再確認した。

## 最終再査読

- final_reviewer_id: c24_math_review
- final_reviewed_at: 2026-08-22T20:45:30+09:00
- fatal: 0
- major: 0
- minor: 0

## 最終機械検証

- `npm run anki:validate`: 成功。1208 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（364 Markdown files）、本文検証がすべて成功。

fatal: 0 / major: 0 / minor: 0
