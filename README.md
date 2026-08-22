# 統計検定1級 独習教材

統計検定1級「統計数理」「統計応用（理工学）」向けの独習教材・問題集・Ankiカードを作成、検証、配信するためのリポジトリです。

- 通常教材の構成・進捗の正本：`curriculum.yaml`
- Anki教材の進捗の正本：`anki/progress.yaml`
- Ankiカード本文の正本：`anki/cards/**/*.md`

## セットアップと検証

```powershell
npm install
npm run validate
npm run progress
```

`npm run validate` は教材構造、KaTeX数式、生成対象テキストを検証します。

## 執筆開始

```powershell
npm run progress -- start M1-01
npm run new:chapter -- M1-01
```

章雛形は、独習本文、例題、問題解決パターン、Level A〜D問題集、詳細解答、30分ドリル、査読記録を分離します。生成には `prompts/generate-chapter.md`、独立査読には `prompts/review-chapter.md` を使います。

## Ankiカード教材

Anki教材は、公式・定義の再生、具体的な計算、適用条件の判定を短時間で反復するための教材です。長い論述問題や模試の代替ではなく、1カード1論点を原則とします。

各カードは次の順序に統一しています。

1. 問題
2. 記号・用語
3. 使用公式・定理
4. 一手／方針
5. 答え
6. 計算例
7. 注意

「記号・用語」でカード内の記号を定義し、「使用公式・定理」で使う公式、定理、成立条件を先に示します。「答え」では途中式を省略せず、読めば変形を追える粒度にします。

### Ankiの主要ファイル

| パス | 役割 |
|---|---|
| `anki/cards/**/*.md` | カード本文の正本 |
| `anki/notation.md` | 記号、分布の母数化、分位点規約の正本 |
| `anki/formulae.md` | 公式・定理の一覧 |
| `anki/syllabus/syllabus.yaml` | カテゴリー、サブカテゴリー、公式用語の正本 |
| `anki/syllabus/coverage.yaml` | 公式用語とカードIDの対応 |
| `anki/progress.yaml` | Anki作業単位と進捗 |
| `anki/review/<WORK-ID>/` | 独立数理査読、試験適合性査読、最終検証記録 |
| `anki/dist/` | 閲覧用HTMLの生成物。Gitには含めない |

### Ankiの確認・生成コマンド

```powershell
# 現在のカード数、進行中作業、次作業を表示
npm run anki:progress

# カード構造・用語・coverageを検証し、配信HTMLとの一致も確認
npm run anki:validate

# anki/dist/ に閲覧用HTMLを生成
npm run anki:build
```

配信HTMLの入口は `anki/dist/index.html` です。カードは公式シラバスのカテゴリー別ページへ分割され、1ページ最大200枚になるよう生成されます。

### Anki作業の進捗操作

```powershell
npm run anki:progress -- start <WORK-ID>
npm run anki:progress -- stage <WORK-ID> self_review
npm run anki:progress -- stage <WORK-ID> independent_review
npm run anki:progress -- stage <WORK-ID> revision
npm run anki:progress -- complete <WORK-ID>
```

状態は `planned → drafting → self_review → independent_review → revision → reviewed` の順に進みます。完了には、同じ担当による修正後再査読を含む独立数理査読・試験適合性査読がそれぞれ `fatal: 0 / major: 0 / minor: 0` であることと、機械検証の成功が必要です。

カードを追加・修正したときは、本文だけでなく `anki/notation.md`、`anki/formulae.md`、`anki/syllabus/coverage.yaml` も同期してください。最終確認は次で行います。

```powershell
npm run anki:validate
npm run validate
```

## 情報源の優先順位

1. 公式出題範囲 `pdfs/grade1_hani_20150508_2.pdf`
2. 公式過去問・公式解答
3. `syllabus.md`
4. 久保川『現代数理統計学の基礎』の目次・章末演習解答

参考資料は構造・難度の校正に用い、問題・解答を転載しません。詳細は `references/sources.md` を参照してください。
