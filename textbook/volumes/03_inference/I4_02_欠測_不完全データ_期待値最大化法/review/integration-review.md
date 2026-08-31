# I4-02 統合レビュー

## 確認対象

- `index.md`
- `chapter.yaml`
- `glossary.yaml`
- `review/math-review.md`
- `review/reader-review.md`
- `textbook/curriculum.yaml`
- P1-02 への関連章リンク

## 確認結果

- 章タイトル・前提章・公式範囲は `chapter.yaml` と `curriculum.yaml` で一致している。
- 章状態は reviewed、レビュー結果は fatal / major / minor = 0 / 0 / 0 で一致している。
- カリキュラム集計は total 43 / reviewed 33 / planned 10 で内訳と一致している。
- 数理レビューと読者粒度レビューはいずれも PASS。
- 用語集には欠測機構、観測データ尤度、期待値最大化法、責任度、カルバック・ライブラー情報量、打ち切り、切断、単一代入を収録している。
- I4-02 本文では Bayes の主表記を「ベイズ」へ統一し、P1-02 は既存の小文字 `bayes` 正本パスへ直接リンクする。大文字小文字だけ異なる別ディレクトリは作らない。
- case-only 互換パスを一時的に試した際は PR が `dirty` になったため撤回し、クロスプラットフォームで安全な直接リンク方式へ戻した。

## 結論

I4-02 は通常教材の reviewed 章として統合可能である。本文・メタデータ・査読記録の整合を確認し、最終フォローアップPRの `Validate textbook` / `Validate terminology` 成功をマージ条件とする。
