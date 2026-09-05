# I1-02 統合レビュー

## 確認対象

- `index.md`
- `chapter.yaml`
- `glossary.yaml`
- `review/math-review.md`
- `review/reader-review.md`
- `textbook/curriculum.yaml`
- `references/official-scope.md`
- `references/past-exam-index.yaml`

## 確認結果

- 公式範囲のモーメント法、最小二乗法、BLUE、不偏性、一致性、有効性、Fisher情報量、Cramér--Rao不等式を本文・例・演習のいずれかで実質的に扱っている。
- 元の prerequisite `I1-01` だけでは、一致性に必要な確率収束と BLUE に必要な線形モデルが未宣言だったため、`P4-02` と `L1-02` を追加した。
- `MATH-2023-Q1` の Poisson 不偏推定量・一致推定量、`MATH-2024-Q1` の回帰係数推定へ接続している。
- Level A/B/C/D は 4 / 4 / 4 / 1、さらに30分ドリル1題を収録した。
- 数理レビューでは Gamma モーメント推定、Gauss--Markov、Fisher情報量、一般 $g(\theta)$ のCRLB、非正則一様分布、Poisson零確率推定を独立に再計算した。
- 読者レビューでは「作る → 評価する → 下限と比べる」の導線、具体例から一般形への順序、前提章との接続を確認した。
- 最終マージ条件は GitHub Actions の `Validate textbook`、`Validate terminology`、`Validate Pages assembly` がすべて成功することとする。

## 結論

I1-02 は、formal statement の自己完結性に関する初稿指摘を最終稿で解消し、CIが全て成功した後に reviewed 章として統合する。

## 2026-09-05 公式シラバス用語 Batch 1 再査読

- 対象: 推定量の相対効率・「その他の手法」の位置づけ
- 結果: fatal 0 / major 0 / minor 0
- 確認: 公式用語の導入位置、定義と具体例の整合、演習での再使用、既存章との重複・境界を再確認した。
