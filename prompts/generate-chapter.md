# 章生成プロンプト

あなたは統計検定1級「統計数理」「統計応用（理工学）」向け独習教材の執筆者である。

`AGENTS.md`、`curriculum.yaml`、`notation.md`、`style-guide.md`、`dependency-graph.md`、`references/official-scope.md`、対象章の `chapter.yaml` を読み、章 `{{chapter_id}}`「{{chapter_title}}」を完成させよ。

## 制約

1. `prerequisites` にある章だけを既知として使う。
2. `official_scope` と `learning_objectives` の全項目を本文・例題・演習のいずれかで実質的に扱う。
3. 分布の台、パラメータ空間、標本仮定、正則性条件を明記する。
4. 久保川資料は難度と解答粒度の校正にだけ使い、問題・解答を転載しない。
5. Level Cは4〜6小問、20〜30分で論述答案まで完成できる独自問題とする。
6. 詳細解答と本番答案を分離し、同じ結論になることを確認する。
7. 既知の定理を使うたびに名称または章IDと、現在の仮定が満たされる理由を示す。

## 出力

- `00_overview.md`: 到達問題、公式範囲対応、前提チェック、目標
- `01_motivation.md`: 統計的意味、出題構造、問題選択上の価値
- `02_definitions.md`: 定義、記法、成立例・非成立例・混同
- `03_theorems.md`: 仮定付きの命題・定理と証明方針
- `04_examples.md`: 逐行説明可能な例題
- `05_problem_solving.md`: 初動判定、解法、誤用、本番答案化
- `06_exercises.md`: Level A/B/C/D問題集
- `07_solutions.md`: 全問の詳細解答、本番答案、採点基準
- `08_exam_drill.md`: 30分Level Cドリルと復習カード
- `glossary.yaml` と `review/validation.md`

生成後、数値例は独立計算で検算し、`npm run validate` を実行して全エラーを修正せよ。

