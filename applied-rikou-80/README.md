# 統計応用（理工学）80大問

統計検定1級「統計応用（理工学）」向けの80大問構成を管理するディレクトリです。

- [正式演習目次](index.md): 80題の分野、学習層、演習価値、難度、過去問対応年度、公式シラバス対応項目
- [validate-katex.mjs](validate-katex.mjs): このディレクトリだけを対象にしたKaTeX strict検証

## 推奨学習順

1. Core 40を1周し、解法パターンを作る。
2. Core 40を2周目で20〜30分答案へ圧縮する。
3. Standard 20で変形耐性を付ける。
4. Advanced 20でシラバスの穴と難問耐性を埋める。

## KaTeX検証

リポジトリのルートで依存関係を導入します。

```bash
npm ci
```

このディレクトリだけを検証する場合:

```bash
npm run validate:rikou80
```

リポジトリ内のすべてのMarkdown数式を検証する場合:

```bash
npm run validate:math
```

どちらも `katex.renderToString` を `throwOnError: true`, `strict: "error"` で実行します。

## 数式記法

- インライン: `$...$`
- 別行: `$$...$$`
- 複数行: `$$\begin{aligned}...\end{aligned}$$`
- 禁止: `\(...\)`, `\[...\]`, `align`, `equation`, 独自マクロ

実際の大問・詳細解答を追加するときも、この記法に統一します。
