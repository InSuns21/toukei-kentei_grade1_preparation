# I1-01 統合レビュー

## 確認対象

- `index.md`
- `chapter.yaml`
- `glossary.yaml`
- `review/math-review.md`
- `review/reader-review.md`
- `textbook/curriculum.yaml`

## 確認結果

- 章タイトル・前提章・公式範囲は `chapter.yaml` と `curriculum.yaml` で一致する。
- 本文は尤度、対数尤度、スコア、MLE、有効スコアを公式範囲どおり扱う。
- 標準正則例だけでなく、Bernoulli境界、Poisson全0、一様分布の母数依存支持を扱い、「スコア方程式=MLE」という誤学習を避けている。
- Level A/B/C/Dは 4/4/4/1、30分ドリル1題で `chapter.yaml` と一致する。
- 数理レビューと読者粒度レビューは fatal / major / minor = 0 / 0 / 0。
- I1-02で扱うFisher情報量・Cramér--Rao不等式の一般論を本章へ重複展開せず、有効スコアに必要な情報行列のブロックだけ先行導入した。
- カリキュラム完了後の次章は I1-02 とする。

## 結論

I1-01 は通常教材の reviewed 章として統合可能である。GitHub Actions の教材validation成功をマージ条件とする。
