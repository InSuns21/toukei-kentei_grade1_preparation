# DREAM THEATER カテゴリー別ディレクトリ移行 PLAN

- 作成日: 2026-10-12
- 状態: R0 棚卸し・移行前検査に着手（全講義の移動は未着手）
- 種別: ディレクトリ構造・公開導線・CIを対象とする横断移行。数学講義の執筆PLANとは独立。
- 対象の正本: textbook/dream-theater-index.json と textbook/dream-theater.md
- ユーザー決定: **旧URLの互換維持は不要**。旧パスのリダイレクト、複製ファイル、エイリアスページは作成しない。

## 1. 完成形

移動前:
textbook/volumes/00_foundations/<現行講義ディレクトリ>/index.md

移動後:
textbook/volumes/dream_thater/<カテゴリー>/<chapter.yaml の id>/index.md

ユーザー指定のディレクトリ名 dream_thater をそのまま採用し、英語のスペル修正を黙って行わない。
「講義ID」はファイル名推測ではなく chapter.yaml の id を正本にする。講義の本文、assets、chapter.yaml、knowledge.yaml、レビュー資料等はフォルダごと移す。

| カテゴリー（公開目次の表記と一致） | 現在の対象講義数 |
| --- | ---: |
| 基礎科目 | 56 |
| 基礎論系 | 10 |
| 解析系 | 222 |
| 計算系 | 99 |
| 幾何系 | 35 |
| 代数系 | 21 |
| 応用系 | 65 |
| 物理系 | 32 |
| **合計** | **540** |

数字は2026-10-12に現行の dream-theater-index.json から確認した初期値。実行時は必ず再計測する。通常教材、旧archive専用ファイル、講義でない補助資料は機械的に混入させない。

## 2. 作業原則

1. **カテゴリーは索引で確定**: 各 index.json sections[].name を分類正本とする。講義IDのプレフィックスや過去チャットから分類しない。
2. **衝突検査は移動前**: index.md と chapter.yaml の存在、ID一意性、移動先重複、カテゴリー完全性、すでに移動されたファイルを検査する。
3. **原則 git mv**: ファイル内容の数学的意味を変えない。全画像・SVG・アセット・補助ファイルを同時移動する。
4. **URL互換は実装しない**: 公開の旧URLは失効してよい。サイトの索引・内部リンクはすべて新URLへ更新する。旧ディレクトリの維持・リダイレクト・symlink はしない。
5. **相対リンクは単純置換しない**: ../ODE1 と ../SYM1 は移動後にカテゴリーが異なり得る。リンクの解決先を旧位置から確定してから、新位置からの相対パスへ再計算する。Markdown本文、HTML、SVG参照、プログラム内のパスについても同様に確認する。#stable-anchor は維持する。
6. **全体の参照元を対象にする**: dream-theater.md、standard-math-core、index.json、archive の canonical_path、knowledge DAG、シリーズmanifest、各PLAN、他章からの参照、Pages生成器、検証器、GitHub Actions、README、プロンプト、既存テストのフィクスチャを調べる。
7. **執筆状態は変えない**: PLANの進捗・chapter status・learning objectives・証明内容・演習数は単なる移動を理由に変更しない。別章の追跡監査を自動追加しない。
8. **並行作業を保護**: 移行PR作成時とマージ直前にmainの新規講義・manifest差分を再取り込みする。並行実装された章を取り落とさない。
9. **復帰可能にする**: 移動元→移動先の完全な対応表、検証結果、変更件数を記録し、問題があればPRのまま修正する。互換ページは作らない。

## 3. 段階別作業

### R0 棚卸し・ルール実装（開始済み）

- [x] 公開目次の8カテゴリーと540件を確認
- [x] 旧URL互換不要を確認
- [ ] scripts/dream-theater-layout-inventory.mjs で移動前の chapter.yaml ID・衝突・欠落を全件検査する
- [ ] ルート直下探索やパス正規表現を持つスクリプト・CIの参照元を機械調査し、影響ファイル一覧を記録する
- [ ] 新規講義を作る際の配置方針を scoped AGENTS とシリーズルーターへ反映する

### R1 移行基盤・検証器対応

- [ ] カテゴリー別の多段パスを扱える canonical resolver を設ける
- [ ] dream-theater-index の発見ロジックを全カテゴリーの再帰走査へ変更し、非索引講義・重複登録を検出する
- [ ] series manifest の chapter_root / chapters[].path を多段パス対応にする。未完成講義も系列のカテゴリーへ割り当てる
- [ ] Pages ビルド、ナビゲーション、前提講義リンク、画像パス、stable anchor 検証、変更章の検出が多段階パスを認識する
- [ ] パスだけ変わり内容不変の移行について、証明・演習の再執筆扱いを避けつつ移行差分を検証するゲートを整備する

### R2 講義フォルダ移動・参照更新

- [ ] 最新の索引から対応表を生成し、その対応表だけでディレクトリを移動する
- [ ] 本文内の相対参照を、解決先が変わらないよう再計算する
- [ ] 全体目次・標準読む順・各シリーズmanifest・DAG・PLAN・補助資料を新パスに変更する
- [ ] 旧パスのリダイレクト・互換ページを生成しない
- [ ] 移動先すべての index.md、chapter.yaml、knowledge.yaml、assets の存在と件数を照合する

### R3 全体検証と公開確認

- [ ] npm run validate:dream-theater-index
- [ ] npm run validate:dream-theater-work
- [ ] npm run validate:dream-theater-prerequisites
- [ ] npm run validate:structure / validate:math / validate:formal-references
- [ ] DREAM THEATER concept・knowledge・演習・図面・Pages build / link / image / fragment を全件検証する
- [ ] 代表的なカテゴリ跨ぎのリンク（解析↔幾何、基礎↔解析、応用↔計算）を手動追跡する
- [ ] 正本の講義数と移動先数が一致し、00_foundations直下に移動漏れの公開講義がないことを証明する
- [ ] PRに機械検証結果、移動件数、代表的な参照検査、未検証項目を記す

### R4 完了

- [ ] 検証完了後PRをmerge
- [ ] 新規講義が新パスで作成されることを確認
- [ ] 本計画の状態を完了にし、記録を残す

## 4. 分割条件

1PRでの移動は、変更ファイル数、検証時間、同時編集の競合から現実的でない場合がある。その場合はR1を先行mergeし、R2はカテゴリー単位で8回以内の段階的PRにする。各段階で未移動の章もサイト内リンクを維持し、シリーズmanifest・ルーター・検証器は移行中の両ルートを検査する。最終R3終了後は旧ルートを canonical として認めない。講義本文の修正とディレクトリ移行は意図的に別PRへ分ける。

## 5. 完了の定義

索引に載る全講義が希望どおり「dream_thater / カテゴリー / 講義ID」に1回だけ存在し、未完成講義の将来配置も決まり、公開目次・リンク・アセット・前提章・stable anchor・manifest・CIが新パスに追従している。旧URLへの互換リンクを作ることは要件に含めない。
