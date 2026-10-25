# DREAM THEATER ブラックホール情報 I・II（BHI系列・講数可変）

分冊: 2026-10-11  
状態: planned（設計のみ。章本文と公開は未着手）

## 中心問い・直接前提

BHI前半：[QINF](../plans_progress/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md)、[BHT](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_I_PLAN.md)、[QCURV](DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md)、[INFO](../plan_done/DREAM_THEATER_INFORMATION_THEORY_I_PLAN.md)。後半：前半、[HOLO](DREAM_THEATER_HOLOGRAPHY_I_PLAN.md)、[QFT IV](DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md)。AQFTは発展部分。

**canonical owner：** Page曲線・情報問題→island・レプリカの連続構成。

### 共通参照

- 横断読順は[熱・時空・情報ルート](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)、Lorentz幾何・HPDE・MICA・AQFTの数学的基礎は[時空・量子場数学ルート](DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md)から正本を特定する。
- 上記前提のうち未実装PLANの定理は、必要な本文が完成するまでは章内導入か理由付き結果先行とする。

## 学習テーマ候補（旧15週案・講数可変）

**講数方針（2026-10-12）**：下の15項目（I/IIそれぞれの15項目）は履修テーマの草案であり、15回で完結する制約ではない。主要な模型、厳密な仮定、証明、演習の学習上のまとまりで必要な数の講を設ける。候補章IDも正式実装時に増補・調整し、依存・stable anchor・公開索引の参照を同時に整合させる。

### 14. ブラックホール情報 I：Hawking計算・Page曲線・矛盾

- **canonical owner:** 新規 BHI1–BHI15
- **前提:** QINF、BHT、QCURV、INFO
- **学修成果:** 諸立場の比較・未解決事項の整理に到達し、主要な式の適用条件を説明して代表模型で検算する。

- **候補テーマ01**：情報損失問題の論理構造
- **候補テーマ02**：純粋状態から混合状態への見かけの遷移
- **候補テーマ03**：coarse-grainedとfine-grained entropy
- **候補テーマ04**：Hawking対生成の状態モデル
- **候補テーマ05**：内外分割と縮約密度行列
- **候補テーマ06**：蒸発の半古典的収支
- **候補テーマ07**：ユニタリ性を仮定したPage曲線
- **候補テーマ08**：Page時刻と典型状態の仮定
- **候補テーマ09**：Mathurのsmall corrections議論
- **候補テーマ10**：相補性とno-cloning
- **候補テーマ11**：scramblingとHayden–Preskill模型
- **候補テーマ12**：AMPS firewallの三条件
- **候補テーマ13**：strong subadditivityを用いた緊張
- **候補テーマ14**：可観測量・因数分解の前提検査
- **候補テーマ15**：諸立場の比較・未解決事項の整理

### 15. ブラックホール情報 II：Island・レプリカ・研究最前線

- **canonical owner:** 新規 BHI16–BHI30
- **前提:** BHII、HOLO、QFTIV。局所代数・モジュラー理論はAQFTを参照
- **学修成果:** 2026時点の到達点と残る問いを論証評価に到達し、主要な式の適用条件を説明して代表模型で検算する。

- **候補テーマ01**：一般化エントロピーの復習
- **候補テーマ02**：量子極値曲面の変分
- **候補テーマ03**：レプリカトリックと解析接続の論点
- **候補テーマ04**：重力経路積分とsaddle
- **候補テーマ05**：replica wormholeの登場
- **候補テーマ06**：island公式の計算規則
- **候補テーマ07**：JT重力の作用と境界自由度
- **候補テーマ08**：JT+bathの蒸発模型
- **候補テーマ09**：islandなしの放射エントロピー
- **候補テーマ10**：islandありの放射エントロピー
- **候補テーマ11**：Page転移の近似計算
- **候補テーマ12**：entanglement wedge reconstruction
- **候補テーマ13**：ensemble averagingとfactorization puzzle
- **候補テーマ14**：復号・複雑性・実在四次元蒸発の限界
- **候補テーマ15**：2026時点の到達点と残る問いを論証評価

## 重要な完成条件

毎回の主要証明・計算で物理モデル・時間発展・正則化・量化を明記し、他科目の一般定理を二重実装しない。各章に動機と直接例、A4/B3/C1以上の演習と全詳細解答、実際の主要式の再導出に基づく数理査読・読者粒度査読・直前章の追跡監査を設ける。科目単位の依存・リンク・公開導線を監査するまでdoneに移さない。
