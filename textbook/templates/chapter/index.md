<!-- 通常教材の章構成はこのファイルを正本とする。 -->

# {{chapter_id}} {{chapter_title}}

TODO: この章の役割を1〜2段落で説明する。何を扱い、後続単元へどうつながるかを、用語の列挙ではなく読者が意味をつかめる文章で書く。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[formal statement表示ガイド](../../../formal-statement-presentation-guide.md)、[証明の見せ方と教材導線](../../../proof-presentation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- TODO: 3〜7項目で、章末に実際に解けるようになる問題・操作を書く。
- TODO: 「理解する」だけで終わらず、計算・導出・説明・判定など答案上の行動で書く。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| TODO | TODO |

## 前提知識チェック

1. TODO: 前提章IDと、そこで使う具体的な知識を書く。
2. TODO

---

## 1. 導入

TODO: 概念の意味を、最小の具体例から説明する。定義や一般式を先に並べすぎない。

## 2. 定義と記号

TODO: 定義、記号、母数範囲、存在条件を明記する。

<a id="def-{{chapter_id}}-example"></a>

<!-- formal-statement-start -->
> **定義（TODO）**  
> TODO: 定義する対象と条件をこのblockだけで自己完結させる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-{{chapter_id}}-example -->
### 2.1 例：定義を具体例で確認する

TODO: 定義した対象の最小の具体例を置く。

**定義の確認**

1. TODO: 定義の条件1を実際に確認する。
2. TODO: 定義の条件2を実際に確認する。
3. TODO: 非自明な条件は式または短い論証で確認する。
<!-- definition-example-end -->

## 3. 定理・公式と導出

TODO: 定理の仮定と結論を明記し、非自明な式は必要な途中式を示す。問題で導出させる公式を暗記前提で置かない。

定義・定理・命題・補題・系・公理・原理のステートメント本体は、GitHub Pages上で共通の青い左罫線を付ける。**必ず安定anchorを直前に置き**、次のmarkerで一つのformal statementだけを囲む。証明・証明の見取り図・例・意味説明は外へ置く。

```md
<a id="thm-{{chapter_id}}-example"></a>

<!-- formal-statement-start -->
> **定理（TODO）**  
> TODO: 対象・仮定・結論をこのblockだけで自己完結させる。
<!-- formal-statement-end -->
```

anchor接頭辞は、定義 `def-`、定理 `thm-`、命題 `prop-`、補題 `lem-`、系 `cor-`、公理 `axiom-`、原理 `principle-`、その他の参照用節 `ref-` を使う。章内・章間でformal resultを参照するときは、見出し自動IDや章トップではなくこの安定anchorへ直接リンクする。

本文で `**○○** といいます` / `**○○** と呼びます` / `**○○** と定義します` と数学的対象を導入して済ませず、正式な定義なら `**定義（○○）**` のpanelにする。

表示数式を含むときは、数式の各行に `>` を付ける必要はない。marker全体がPages runtimeでformal statement panelへ変換される。

完全証明を置く場合は、証明を閉じた状態でも意味・具体例・使い道を追える本文にする。証明の見取り図は表示したままにし、完全証明だけを次のマーカーで囲む。

```md
### 証明の見取り図

TODO: 証明の核心と使う道具を短く説明する。

<!-- proof-start -->
### 証明

TODO: 完全証明を書く。
<!-- proof-end -->
```

## 4. 典型例題

TODO: 典型例を途中式付きで示す。

## 5. 演習

### {{chapter_id}}-A01 問題タイトル

- Level: A
- 目安時間: 8分
- 主題: TODO
- 使用技術: TODO

問題文をここに書く。問題だけを切り出しても、確率変数・母数・分布のパラメータ化・必要な定義や使用可公式が追えるようにする。

<!-- solution-start -->

#### 解答

##### 詳細解答

方針、使用する結果と仮定、計算・証明、結論、必要な検算を追える粒度で書く。

##### 本番答案

得点に必要な核を残して圧縮する。

##### 採点基準

20点満点で配点を明記する。

<!-- solution-end -->

### {{chapter_id}}-B01 問題タイトル

問題文をここに書く。

<!-- solution-start -->

#### 解答

##### 詳細解答

TODO

##### 本番答案

TODO

##### 採点基準

20点満点で配点を明記する。

<!-- solution-end -->

## 6. 本番ドリル

TODO: Level C相当の連結問題を置く。問題の直後に `solution-start` / `solution-end` で詳細解答・本番答案・採点基準を置く。

## 7. 過去問との対応

TODO: 原文転載ではなく、過去問ID・論点・この章で担当する技能を記録する。

## 8. 章末チェック

- TODO: この章で解けるようになる問題と対応した確認項目を書く。
