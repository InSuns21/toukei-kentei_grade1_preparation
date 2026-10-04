# DREAM THEATER スコープ規約

このファイルは `textbook/volumes/00_foundations/**` のうち DREAM THEATER に登録される発展数学講座へ適用する。通常教材とは目的・演習形式・前提知識の扱いが異なる。

## 最初に現在地だけを読む

継続執筆では全 `00_foundations` を列挙しない。

1. `textbook/dream-theater-work.yaml`
2. 参照先の `textbook/dream-theater-series/<series>.yaml`
3. `active_plan`
4. 対象章の `chapter.yaml` / `knowledge.yaml`
5. 直接必要な canonical dependency

章を完了して次へ進める場合は、成果物と同じ作業単位で work-state の `completed_through` / `next_work` / `after_next` と series manifest の status を更新する。

## 執筆前に読む正本

対象ページが `textbook/dream-theater-index.json` に掲載される場合、必要な範囲で次を確認する。

1. `textbook/DREAM_THEATER_AUTHORING_STANDARD.md`
2. `textbook/DREAM_THEATER_EXERCISE_POLICY.md`
3. `textbook/formal-statement-presentation-guide.md`
4. `textbook/proof-presentation-guide.md`
5. `textbook/knowledge-dag.yaml`
6. 対象系列の plan / series manifest

旧監査スナップショットや完了済み plan を現行規約として復活させない。

## 完成条件

`implemented`、`existing-anchor`、formal statement、proof block、自動検証 green だけで完成扱いしない。

prerequisites だけを既知とする独習者が、本文から主要概念・主要定理・核心論証を追い、演習で自力再現できることを完成条件とする。prerequisite を知っていることと、途中2〜4手を脳内補完できることを分離する。

## 導入と証明粒度

新しい主要概念・構成・定理は、可能な限り次の導線を先に示す。

```text
今まで何ができたか
↓
どこで困るか
↓
何をしたいか
↓
新しい道具
↓
何ができるようになったか
```

- 初出 definition concept は formal statement より前に通常文の導入を置く。
- 主役となる定義には、条件を実際に検証する直接例を置く。
- formal statement は対象・仮定・結論を単独で確定できるようにする。
- 「定理より」から完成式へ飛ばず、適用対象・点・次数・パラメータ・代入・主要中間式を示す。
- 二段以上の非自明な計算、連鎖律、基底表示、極限操作等を学習者へ丸投げしない。
- 後続依存の主要定理、learning objective の主要定理、標準教科書で証明を学ぶ主要結果は、本文または canonical dependency で核心証明まで閉じる。
- 「明らか」「同様」「既知」「標準的」で核心論証を飛ばさない。
- 反例では、失った仮定と壊れた証明機構まで説明する。
- 完全証明を閉じた状態でも、意味・動機・最小例・重要仮定・使い道を追えるようにする。
- 定義・定理・証明だけが連続する本文にしない。
- 学習者向け本文に archive、canonical owner、自動検証、監査、stable anchor 等の編集事情を書かない。

## 演習・詳細解答

理由付き例外がなければ、変更章の実本文に最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

を置き、全問に詳細解答を付ける。

A4/B3/C1 は**下限であって目標値・上限ではない**。最低数に達しただけで演習設計を終了しない。主要 learning objective が演習で自力使用されていない、典型的な誤りや仮定の効き方を独立に確認する価値がある、複数の主要概念を接続する問題が不足している場合は、教育的に必要なだけ演習を追加する。水増し禁止とは低価値な類題で数だけ増やさないという意味であり、有用な追加演習を抑制する規則ではない。

詳細解答は、出発点、使用定理、適用条件、主要中間式、結論を紙上で再現できる粒度にする。「整理すると」「計算すると」「同様に」で非自明な複数段を隠さない。

## 依存関係

- `chapter.yaml` / `knowledge.yaml` の prerequisites と knowledge DAG を基準にする。
- prerequisite 外の概念を暗黙使用しない。
- 後続章の理論を現在章の証明へ逆輸入しない。
- 既存 canonical result があるなら重複定理を作らず stable anchor を参照する。
- `knowledge.yaml` の `aliases` は真の同義語だけに使う。
- 複数概念を同時導入する見出しは `introduction_aliases` を使い、global alias にしない。
- 再掲 concept は canonical concept を `requires` で参照する。
- 自動検証を通すためだけに concept / dependency を追加しない。
- 弱*位相のように数学的意味を持つ記号を正規化で落とさない。

## 用語

日本語として定着した数学・統計用語があるなら日本語を主表記にする。人名由来の定理名は原則として人名部分の英字表記を保持し、一般名詞側を日本語にする。用語の正本は `references/terminology-guide.md`。

自動監査の誤検出を避けるために自然な標準用語を不自然に改名しない。誤検出なら resolver、alias、contextual alias、監査ロジック側を修正する。

## 検証

leaf chapter の通常PRでは changed-only validation を原則とする。global index、knowledge DAG、規約、validator、workflow等の全体波及変更では full audit を行う。

少なくとも変更内容に応じて、DREAM THEATER exercise / concept / knowledge、KaTeX、proof/formal、Pages link を検証する。自動検証 green だけを完成条件にせず、人手で数学的完全性と読者粒度も確認する。
