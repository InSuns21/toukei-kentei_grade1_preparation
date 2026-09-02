# 定義・定理・命題・補題などのステートメント表示

このファイルを、通常教材で formal statement を表示・参照する方法の正本とする。対象は **定義・定理・命題・補題・系・公理・原理** である。

## 1. 表示の標準

formal statement の**ステートメント本体だけ**を、GitHub Pages 上で共通の青い左罫線を持つ panel として表示する。

- 左罫線: `5px solid #2f6f9f`（Pages では `--formal-statement-rule` を使用）
- 証明、証明の見取り図、例、意味説明、使い方は panel の外に置く。
- formal statement 自体は、単独で切り出しても対象・仮定・結論が分かるよう `CONTENT_GUIDELINES.md` の自己完結性規約に従う。
- HTML の `<div class="formal-statement">` を Markdown に手書きしない。Pages runtime が marker から生成する。
- **すべての formal statement に安定 anchor を付け、章内・章間の参照はその anchor へ直接飛ばせるようにする。** Docsify が見出しから自動生成する `?id=...` を formal result の正本参照にしない。

## 2. Markdown の書き方

一つの formal statement を、一つの安定 anchor と marker の組で囲む。

```md
<a id="prop-convergent-implies-cauchy"></a>

<!-- formal-statement-start -->
> **命題（収束列はコーシー列）**  
> 距離空間 $(X,d)$ の点列 $(x_n)$ が収束するなら、$(x_n)$ はコーシー列である。
<!-- formal-statement-end -->
```

安定 anchor の接頭辞は次を標準とする。

| 種別 | 接頭辞 |
|---|---|
| 定義 | `def-` |
| 定理 | `thm-` |
| 命題 | `prop-` |
| 補題 | `lem-` |
| 系 | `cor-` |
| 公理 | `axiom-` |
| 原理 | `principle-` |
| 定理以外の参照用節 | `ref-` |

既に意味の分かる安定IDがある場合は、それを維持する。新規IDは英数字とハイフンで、人間が意味を追える名前を優先する。自動移行で付いた章ID＋連番形式も安定IDとして維持してよい。

見出し形式の宣言を使う場合も一つずつ囲む。

```md
<a id="thm-example"></a>

<!-- formal-statement-start -->
### 定理（TODO）

TODO: 定理の対象・仮定・結論を書く。
<!-- formal-statement-end -->
```

表示数式を含む場合、数式行に Markdown の `>` を付ける必要はない。marker 全体が panel になるため、数式に blockquote 記号が混入する書き方を避ける。

```md
<a id="def-example"></a>

<!-- formal-statement-start -->
> **定義（TODO）**  
> TODO: 文章部分を書く。

$$
A=B.
$$

> TODO: 必要なら文章を続ける。
<!-- formal-statement-end -->
```

## 3. 参照リンク

formal result を他の場所から使う場合は、章トップや見出し自動IDではなく、その result の安定 anchor をリンク先にする。

```md
[有限個のコンパクト距離空間の直積定理](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md#thm-f0-00c2-02)
```

これにより、見出し文言や節番号を変更しても参照先を壊さず、読者を実際の定理・定義へ直接送れる。

## 4. 証明との境界

完全証明は formal statement panel の外へ置く。証明を後回しにできるよう、完全証明は `proof-start` / `proof-end` で折りたたむ。

```md
<a id="thm-example"></a>

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

## 5. 「説明文の中の定義」を作らない

数学的対象を本文で

- `**○○** といいます`
- `**○○** と呼びます`
- `**○○** と定義します`

のように導入したなら、それは実質的な定義である。原則として `**定義（○○）**` の formal statement panel に昇格させる。

既存教材には、この規約を導入する前の prose-style definition が残っているため、`scripts/implicit-formal-baseline.txt` に移行負債として固定する。`npm run validate:implicit-formals` は**新しい prose-style definition を禁止し、既存候補が増えないことを保証する**。既存候補は監査・改稿のたびに panel へ移し、baseline を減らしていく。baseline に新規項目を追加して規約を回避しない。

## 6. CI

`npm run validate:formal-statements` は source Markdown と Pages runtime/style を検査し、次を違反として失敗させる。

- formal label / formal declaration heading が panel marker の外にある。
- marker が対応していない、または panel が入れ子になっている。
- 一つの panel に formal declaration が0個または2個以上ある。
- formal statement に安定 `def-` / `thm-` / `prop-` / `lem-` / `cor-` / `axiom-` / `principle-` / `ref-` anchor がない。
- folded proof の中に formal statement panel を置く、または panel の中で proof を開始する。
- Pages の共通青線 `#2f6f9f`、4〜6px の左罫線、blockquote の二重線抑制が失われる。
- Pages runtime の marker → `.formal-statement` 変換が失われる。

`npm run validate:formal-references` は formal result を使うリンクが章トップ止まりでないこと、指定 fragment が実在することを検査する。`npm run validate:pages` は生成後Pagesでも全種の安定 formal anchor へのリンクが実際に着地できることを再検証する。

`npm run validate:implicit-formals` は prose-style definition / unlabeled formal assertion の新規発生を検知する。既存の移行負債はbaselineを減らす方向にしか動かさない。
