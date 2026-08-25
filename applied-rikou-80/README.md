# 統計応用（理工学）80大問

統計検定1級「統計応用（理工学）」向けの80大問構成を管理するディレクトリです。

## 共通規約

作問・詳細解答・本番答案・採点、定理の利用、電卓・数表、行間の埋め方、日本語表記は、統計数理と共通の [統計数理・統計応用 共通演習規約](../EXERCISE_GUIDELINES.md) を正本とします。

このディレクトリでは上記規約を別定義しません。規約と本文が食い違う場合は、局所規約を増やさず本文を共通規約へ合わせます。

- [正式演習目次](index.md): 80題の分野、学習層、演習価値、難度、過去問対応年度、公式シラバス対応項目
- [Core 40](core/README.md): 最優先40大問
- [Standard 20](standard/README.md): 変形耐性を作る20大問
- [Advanced 20](advanced/README.md): 低頻度・高難度・未出寄り20大問
- [Core 40 横断監査](core/AUDIT_2026-08-25.md): 重複、難度、数値、所要時間、行間の監査
- [Core 39差し替え・短問増強](core/AUGMENTATION_2026-08-25.md): Core短問18枠の再設計記録
- [残り40題 横断監査](AUDIT_REMAINING_40_2026-08-25.md): Standard/Advancedの数式・時間・行間・電卓監査
- [定理適用監査](THEOREM_APPLICATION_AUDIT_2026-08-25.md): 定理名・適用条件・条件確認の横断監査
- [validate-katex.mjs](validate-katex.mjs): このディレクトリ全体のKaTeX strict検証

## 推奨学習順

1. Core 40を1周し、解法パターンを作る。
2. Core 40を2周目で20〜30分答案へ圧縮する。
3. Standard 20で同じ骨格の変形耐性を付ける。
4. Advanced 20でシラバスの穴と難問耐性を埋める。

## 80題共通フォーマット

各実装問題は原則として次を含みます。

- 問題: 4〜6小問、20〜30分級
- 詳細解答
- 本番答案: 90分で3題を解く前提の圧縮答案
- 採点基準: 20点配点
- 打ち切り判断: 20〜25分時点で確保すべき式・論点

詳細解答の粒度、定理の適用条件確認、電卓・数表の制約、略語を使わない表記はすべて共通規約に従います。

## 検証

```bash
npm ci
npm run validate:rikou80
npm run validate:exercise-style
```

リポジトリ全体は

```bash
npm run validate
```

で検証します。`validate:rikou80` は `katex.renderToString` を `throwOnError: true`, `strict: "error"` で実行します。

## 数式記法

- インライン: `$...$`
- 別行: `$$...$$`
- 複数行: `$$\begin{aligned}...\end{aligned}$$`
- 禁止: `\(...\)`, `\[...\]`, `align`, `equation`, 独自マクロ
