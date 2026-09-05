# 通常教材

統計検定1級の通常章教材をまとめる領域です。Anki教材の `anki/` と同様に、通常教材に固有の正本・本文・補助資材をこのフォルダ配下へ集約します。

- 全教材共通規約：`../CONTENT_GUIDELINES.md`
- 構成・進捗の正本：`curriculum.yaml`
- 章本文の正本：`volumes/<volume>/<chapter>/index.md`（新形式）
- 章メタデータ：各章の `chapter.yaml`、`glossary.yaml`
- 共通記法：`../references/notation-guide.md`
- 通常教材だけの記法差分：`notation.md`
- 共通用語：`../references/terminology-guide.md`
- 共通分布規約：`../references/distribution-notation-guide.md`
- 通常教材だけの執筆差分：`style-guide.md`
- 共通演習規約：`../EXERCISE_GUIDELINES.md`
- 粒度レビュー計画：`REVIEW_PLAN.md`
- 章間依存：`dependency-graph.md`
- 章生成・査読プロンプト：`prompts/`
- 雛形：`templates/`

## 対象読者

この教材は、**高校数学の基本事項は使え、大学初年度の微積分・線形代数を一度履修した経験がある**統計検定1級の独習者を想定します。

大学初年度の授業で扱った計算手順を忘れていることは前提に含めます。微分・積分・行列計算の意味に見覚えがあっても、紙に向かうと手が止まる読者は、下の「計算基礎体力」で必要な技能だけ再起動できます。

一方で、証明を中心とする大学数学を体系的に履修していることは前提にしません。通常教材で必要になる理論概念は、未導入の専門語を既知扱いせず、その概念が必要になった箇所で意味と最小の具体例から導入します。

### 数学基礎の入口

- [F0-00 統計検定1級のための数学速習](volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md)：概念の意味、公式が出る理由、統計との接続を確認する。
- [計算基礎体力 — 統計検定1級のための微積・線形代数](volumes/00_foundations/F0_00CALC_計算基礎体力/index.md)：大学初年度に一度やった計算を、診断と短いドリルで再起動する。

「概念そのものが初見・意味が分からない」なら F0-00 を読み、「意味は分かるが計算手順が出てこない」なら計算基礎体力へ進む、という使い分けを基本とします。

## 1単元1ページ

新規章は `index.md` 1枚に、導入・定義・定理・例題・演習・詳細解答・本番ドリルをまとめます。演習は「問題 → 折りたたみ式の解答 → 次の問題」の順に配置します。

既存章には `00_overview.md` から `09_past_exam_practice.md` までの旧分割形式が残っています。移行期間中はこの形式もvalidationで許容し、GitHub Pagesのビルド時に1ページへ合成します。既存の個別ファイルへのリンクは互換性のため当面残します。

## Chatからの追記

通常教材の本文追記・問題追加は、独立査読記録が未作成でも機械validationを実行できます。人手査読と機械検証を分離し、Chatから小さな追記を行うたびにレビュー状態遷移を強制しません。

```powershell
npm run progress
npm run new:chapter -- <CHAPTER-ID>
npm run validate
npm run validate:pages
```

`npm run validate` は構造・数式・文字コードなどのブロッキング検証です。従来の厳格な査読状態込み構造検証を確認したい場合だけ `npm run validate:structure:strict` を使います。

品質改善用の非ブロッキング監査は別コマンドです。

```powershell
npm run audit:textbook-granularity
npm run audit:terminology
```

`curriculum.yaml` の `volumes[].directory` は、この `textbook/` を基準とする相対パスです。通常教材の新規ファイルは原則としてこのフォルダ配下へ置き、共有の出典・過去問索引・用語・記法ガイドはルートの `references/` を参照します。
