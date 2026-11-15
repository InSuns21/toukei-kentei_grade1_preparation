# DREAM THEATER 円積問題：作図不可能性と等分解の二経路

分冊: 2026-10-11  
状態: completed（SQC1〜12の系列横断監査を完了）

- [古典円積・作図可能性（SQC1〜7）](DREAM_THEATER_CLASSICAL_CONSTRUCTIBILITY_SQUARING_PLAN.md)：FLD5を利用し、TRN11のHermite–Lindemann定理から円積作図不能を導く。
- [Tarskiの円積・可測等分解（SQC8〜12）](../plan_done/DREAM_THEATER_TARSKI_EQUIDECOMPOSITION_PLAN.md)：SET/MTを前提に、有限分割・Borel/可測性・境界次元を扱う。

両者の「円積」は許す操作が異なり、古典作図の不可能性と分割による可能性は矛盾しない。SQC8〜12にTRN11を必須としない。12講の題材と章IDを保持し、両科目は各manifestで全章completed。公開目次は完成したSQC1〜12の全12章のみを正順に掲載している。

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
- 完了時のPhase D横断監査と公開導線の照合は本PLAN末尾に記録する。完了後は`plan_done/`へ移動する。

## 5. 参照文献

- Wantzelの作図不可能性、Gauss–Wantzel判定：既存 `FLD5` の出典と数学的証明を優先。
- Lindemann–Weierstrass：`https://encyclopediaofmath.org/wiki/Lindemann%E2%80%93Weierstrass_theorem`（定理の形式を確認）。
- Laczkovich（1990）の位置付け：Grabowski–Máthé–Pikhurko, *Measurable circle squaring*, Annals of Mathematics 185 (2017), https://annals.math.princeton.edu/2017/185-2/p06
- Máthé–Noel–Pikhurko, *Circle squaring with pieces of small boundary and low Borel complexity*, Advances in Mathematics 484 (2026), 110685, https://doi.org/10.1016/j.aim.2025.110685 ; プレプリント https://arxiv.org/abs/2202.01412
- 同分野の古典的な有限分割の結果と modern descriptive combinatorics は、各章執筆時に原論文と照合する。

## 6. 現在地

2026-10-11：12講として初期設計。2026-11-15：SQC1〜7・SQC8〜12の本文および公開目次の存在と全講completedを確認し、最終の横断監査を実施。


## 7. Phase D：全12講の横断監査記録（2026-11-15）

- SQC.yaml（SQC1〜7）およびSQC_TARSKI.yaml（SQC8〜12）の**計12章すべてがcompleted**。各章の `index.md`・`chapter.yaml`・`knowledge.yaml` が実在し、章ID・prerequisite列・正本概念は一致する。050_幾何系/005_classical-constructions.md の公開目次に12章が正順掲載されている。
- 12章の章別 `exercise_counts` と本文内の**詳細解答119件が一致**し、各章で最低A4・B3・C1を超える。実際に主要証明・定義例・演習へ使うリンクと依存方向を点検。講義順を跨ぐ直接の依存は SQC1→SQC2→SQC3→SQC4/5/6→SQC7、SET/MT→SQC8→SQC9→SQC10/11→SQC12 である（追加prerequisiteは各章metadataを優先）。
- 古典作図の区別：最小多項式の次数が2の冪であることは必要条件にすぎない（SQC3の四次反例）、立方体倍積・60度三等分は三次既約性（SQC4）、正多角形の十分性は円分体の可換2群（SQC5）。SQC6のNiven型補助積分は `I_n=2F_n(0)∈ℤ` と `0<I_n≤πM^n/n!→0` を別々に導き、SQC7はTRN11のHermite–Lindemannを使って `e^{iπ}=-1` から超越性を導く。使用箇所の既習定理リンクを照合。
- Tarski側の区別：SQC8の多角形等積分割は初等構成を閉じる。SQC9のLaczkovichの1992年一般形、SQC11の可測・Borelの存在定理、SQC12の小境界の存在定理は**引用**し、有限Hallや模型だけで一般存在を証明したと称さない。SQC10の有限Hall帰納法で `|N(S)|≥|S|` の条件を確認。SQC12の零面積交差の追加条件では `Z(D_r,Q_s)⊂∂(Q_s+D_r)` を示し、境界が四線分・四円弧で面積0であることを確認。小境界・Borel性・正面積を別条件として扱う。
- 公刊原典の再照合：Laczkovichによる円積解決は1990年（SQC9の一般化の引用は1992年）、Máthé–Noel–Pikhurkoの小境界版は2022年プレプリント・2026年刊行。研究定理の各片の正面積は追加の零面積交差条件下でのみ得る。伝統的な定規・コンパス不能性と集合片の平行移動可能性は操作が異なるので矛盾しない。
- **監査の範囲**：系列横断の数学的前提・主要結論・代表的中間計算・証明責務、演習数／解答対応、章・リンク・公開目次を再点検した。119解答・全主要証明を今回あらためて独立第三者が全件再計算したとの主張はしない。Tarski側の既存完了時監査記録は個別PLANに保持する。重大な未解決の横断欠陥は確認されなかった。
