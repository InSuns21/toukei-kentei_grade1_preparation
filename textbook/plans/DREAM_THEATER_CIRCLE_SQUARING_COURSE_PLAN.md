# DREAM THEATER 円積問題：作図不可能性と等分解の二経路

分冊: 2026-10-11  
状態: planned（学修ルートのみ）

- [古典円積・作図可能性（SQC1〜7）](DREAM_THEATER_CLASSICAL_CONSTRUCTIBILITY_SQUARING_PLAN.md)：FLD5を利用し、TRN11のHermite–Lindemann定理から円積作図不能を導く。
- [Tarskiの円積・可測等分解（SQC8〜12）](DREAM_THEATER_TARSKI_EQUIDECOMPOSITION_PLAN.md)：SET/MTを前提に、有限分割・Borel/可測性・境界次元を扱う。

両者の「円積」は許す操作が異なり、古典作図の不可能性と分割による可能性は矛盾しない。SQC8〜12にTRN11を必須としない。旧12講の題材と章IDは保持するが、完成判定は別科目ごとに行う。未実装内容を公開索引には載せない。

---

## 元の横断PLANから保持した共通規則・資料（個別シラバスは各科目PLANが正本）

## 3. 証明・演習・視覚化のゲート

- 章構成の境界は中心定理によって決める。**固定の文字数下限、15講への調整は課さない。**
- 各章は導入→定義と検証例→主要結果→仮定を見せる証明→解釈→演習／詳細解答。定理の一般証明を既存章へ委譲する場合は直接anchorを設ける。
- coreの不可能性（SQC2–4、SQC6–7）は証明を完結させる。SQC8–12の研究級定理は証明アーキテクチャと引用範囲を明示する。
- SVGの候補：直線・円の交点、平方根作図、立方体倍積の幾何、角の三等分試行、17角形、等積分割と等分解。ただし静止図・ラベル・代替説明・モーション削減を満たし、図が証明の代用にならない。
- 機械チェック：frontmatter/ID・prerequisite・DAG循環・リンク・KaTeX・演習/解答対応・見出し・SVG。数理査読：最小多項式の既約性、作図可能性の「必要 vs 十分」、Euler式、等分解定理の量化。
- 章単位でのみ `textbook/dream-theater.md`、knowledge DAG、系列 manifest へ公開登録。`volumes/dream_thater/` の実在章との一致を検証し、未実装の12章を公開済みと記録しない。

## 4. 実装順・終了条件

- Phase A（SQC1–SQC5）：古典作図と体拡大、三大作図問題と正多角形。
- Phase B（SQC6–SQC7）：無理性と超越性、TRNの定理との接続。TRN未実装の場合は結果先行と明記し、空リンクは作らない。
- Phase C（SQC8–SQC12）：多角形等積分割、Tarski、可測・Borel、境界正則性。
- Phase D：12講の概念・依存・完全証明の境界、演習、図、公開リンク・索引・manifest、実ブラウザ表示まで横断監査。
- `plan_done` への移動は上記を満たした後のみ。本文未実装の今回のPRは `plans/` に据え置く。

## 5. 参照文献

- Wantzelの作図不可能性、Gauss–Wantzel判定：既存 `FLD5` の出典と数学的証明を優先。
- Lindemann–Weierstrass：`https://encyclopediaofmath.org/wiki/Lindemann%E2%80%93Weierstrass_theorem`（定理の形式を確認）。
- Laczkovich（1990）の位置付け：Grabowski–Máthé–Pikhurko, *Measurable circle squaring*, Annals of Mathematics 185 (2017), https://annals.math.princeton.edu/2017/185-2/p06
- Máthé–Noel–Pikhurko, *Circle squaring with pieces of small boundary and low Borel complexity*, Advances in Mathematics 484 (2026), 110685, https://doi.org/10.1016/j.aim.2025.110685 ; プレプリント https://arxiv.org/abs/2202.01412
- 同分野の古典的な有限分割の結果と modern descriptive combinatorics は、各章執筆時に原論文と照合する。

## 6. 現在地

2026-10-11：12講としてPLANを確定。**今回は設計のみ**。SQC章・章別演習・SVG・公開索引・progress/series manifestは未実装。次工程はSQC1の詳細設計と実装であり、開始時にPLANを `plans_progress/` へ移す。
