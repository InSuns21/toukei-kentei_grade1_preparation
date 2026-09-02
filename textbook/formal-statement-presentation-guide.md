# 定義・定理・命題・補題などのステートメント表示

このファイルを、通常教材で formal statement を表示する方法の正本とする。対象は **定義・定理・命題・補題・系・公理・原理** である。

## 1. 表示の標準

formal statement の**ステートメント本体だけ**を、GitHub Pages 上で共通の青い左罫線を持つ panel として表示する。

- 左罫線: `5px solid #2f6f9f`（Pages では `--formal-statement-rule` を使用）
- 証明、証明の見取り図、例、意味説明、使い方は panel の外に置く。
- formal statement 自体は、単独で切り出しても対象・仮定・結論が分かるよう `CONTENT_GUIDELINES.md` の自己完結性規約に従う。
- HTML の `<div class="formal-statement">` を Markdown に手書きしない。Pages runtime が marker から生成する。

## 2. Markdown の書き方

一つの formal statement を次の marker で囲む。

```md
<!-- formal-statement-start -->
> **命題（収束列はコーシー列）**  
> 距離空間 $(X,d)$ の点列 $(x_n)$ が収束するなら、$(x_n)$ はコーシー列である。
<!-- formal-statement-end -->
```

見出し形式の宣言を使う場合も一つずつ囲む。

```md
<!-- formal-statement-start -->
### 定理（TODO）

TODO: 定理の対象・仮定・結論を書く。
<!-- formal-statement-end -->
```

表示数式を含む場合、数式行に Markdown の `>` を付ける必要はない。marker 全体が panel になるため、数式に blockquote 記号が混入する書き方を避ける。

```md
<!-- formal-statement-start -->
> **定義（TODO）**  
> TODO: 文章部分を書く。

$$
A=B.
$$

> TODO: 必要なら文章を続ける。
<!-- formal-statement-end -->
```

## 3. 証明との境界

完全証明は formal statement panel の外へ置く。証明を後回しにできるよう、完全証明は `proof-start` / `proof-end` で折りたたむ。

```md
<!-- formal-statement-start -->
> **定理（TODO）**  
> TODO: ステートメント。
<!-- formal-statement-end -->

### 証明の見取り図

TODO: 証明の核心を本文側に残す。

<!-- proof-start -->
### 証明

TODO: 完全証明。
<!-- proof-end -->
```

formal statement marker と proof marker を入れ子にしない。

## 4. CI

`npm run validate:formal-statements` は source Markdown と Pages runtime/style を検査し、次を違反として失敗させる。

- formal label / formal declaration heading が panel marker の外にある。
- marker が対応していない、または panel が入れ子になっている。
- 一つの panel に formal declaration が0個または2個以上ある。
- folded proof の中に formal statement panel を置く、または panel の中で proof を開始する。
- Pages の共通青線 `#2f6f9f`、4〜6px の左罫線、blockquote の二重線抑制が失われる。
- Pages runtime の marker → `.formal-statement` 変換が失われる。

`npm run validate:pages` でも生成後の Pages Markdown / runtime / style を再検査する。したがって source では正しく見えても Pages 組み立て後に panel 化できない状態を CI で止める。
