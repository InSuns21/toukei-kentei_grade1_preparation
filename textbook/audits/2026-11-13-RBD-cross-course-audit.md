# RBD1〜RBD16 シリーズ最終横断監査（2026-11-13）

## 位置付けと判断方法

対象は [剛体力学PLAN](../plan_done/DREAM_THEATER_RIGID_BODY_DYNAMICS_PLAN.md) 第7.2節の全16講最終監査。章単位で完了済みの数学・演習・図の査読は当時の章別PRを引き継ぎ、全主要証明と全演習を最終日に再び独立に解く作業とは分ける。RBD16の全文・4証明・10解答の追跡監査と局所修正は [#3231](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/3231) で完了し、必須5CIが成功している。今回の実施主体は本ChatGPT担当のソース点検と別観点の横断照合であり、第三者独立査読ではない。

## 1. 現行実ファイル・問題と証明の対応

RBD manifest 上は RBD1〜RBD16 が連続して `completed`。GitHub main の全章について `index.md`、`chapter.yaml`、`knowledge.yaml` を確認し、証明・解答マーカーの開始と終了、問題IDを突合した。

| 講義 | 証明件数 | 演習・詳細解答 | 備考 |
| --- | ---: | ---: | --- |
| RBD1 | 3 | 10 / 10 | A1–A5 / B1–B4 / C1 |
| RBD2 | 5 | 10 / 10 | 同上 |
| RBD3 | 4 | 10 / 10 | 同上 |
| RBD4 | 3 | 10 / 10 | 同上 |
| RBD5 | 6 | 11 / 11 | A1–A5 / B1–B5 / C1 |
| RBD6 | 7 | 10 / 10 | A1–A5 / B1–B4 / C1 |
| RBD7 | 4 | 10 / 10 | 同上 |
| RBD8 | 3 | 10 / 10 | 同上 |
| RBD9 | 4 | 10 / 10 | 同上 |
| RBD10 | 3 | 10 / 10 | 同上 |
| RBD11 | 4 | 10 / 10 | 同上 |
| RBD12 | 3 | 10 / 10 | 同上 |
| RBD13 | 4 | 10 / 10 | 同上 |
| RBD14 | 4 | 10 / 10 | 同上 |
| RBD15 | 3 | 10 / 10 | 同上 |
| RBD16 | 4 | 10 / 10 | 同上 |
| **合計** | **64** | **161 / 161** | 全16章に A4/B3/C1 以上 |

上の個数は構造・在庫検査であり、それ自体を数学的な正しさの証拠とはしない。

## 2. 数学・物理の講義間接続

1. **配置から姿勢**：RBD1 の向きを保つ回転は $R^{\mathsf T}R=I_3$, $\det R=1$。RBD2 の軸角、RBD3 の物体固定角速度 $\dot R=R\widehat{\omega_b}$、RBD4 のEuler角、RBD5 の四元数は列ベクトルへの能動回転を基準に照合。$\omega_s=R\omega_b$ と、四元数時間発展における物体系の積の順序を混ぜない。
2. **慣性・外力**：RBD6 の同じ重心についての $J_s=RJ_bR^{\mathsf T}$ とRBD7の $L_s=RJ_b\omega_b$ を接続。$\dot L_s=R\tau_b$ は $\dot R$ によるジャイロ項とEuler方程式の交差項が相殺して成り立つ。原点移動と座標変換、外力の作用点を区別する。
3. **自由回転・重いこま**：RBD8–10の無トルク二不変量と中間軸不安定性、Poinsotの空間／物体系軌跡は、RBD11–12の重力トルク下での鉛直・対称軸方向の保存則と区別。Poinsotの「転がり」は角速度空間における幾何であり、RBD13–14の床上の物質点接触とは同じモデルではない。
4. **接触・衝撃・数値積分**：RBD13 の接点速度零条件は静止床での無滑り仮定を必要とし、RBD14 は反力・摩擦と散逸を扱う。RBD15は摩擦なし単一接点の法線衝撃と反発係数というモデルを限定する。RBD16 は $dE/dt=\tau_b\cdot\omega_b$, $dL_s/dt=R\tau_b$ から仕事・角力積の残差を監査し、離散誤差と物理的保存則を混同しない。
5. **canonical依存とCTMへの橋**：MECH8の剛体・慣性正本、AMECH2の力学的前提、GMECHの幾何的枠組みを無条件に同一視せず、必要箇所だけ援用。CTM2–4の $F=R$ と零ひずみはRBDの有限剛体運動を直接例に使うが、剛体と応力ゼロを同義にしない。各章の使用位置stable-anchorと章別prerequisiteは既存監査を引き継ぎ、RBD16についてはPR #3231で外部25リンクを実在照合済み。

## 3. 採用済み図・操作教材と公開経路

現行GitHubの各章本文と `assets/` の対応を突合した。8つのHTML操作教材は以下のすべてについて (a) 実ファイル存在、(b) 章本文からの参照、(c) 章に戻る `href`、(d) ボタン・JavaScript実装、(e) 外部スクリプト・CSS参照なし、をソース上で確認した。

| 講義 | HTML操作教材 |
| --- | --- |
| RBD2 | `rotation-order-player.html` |
| RBD4 | `euler-angles.html` |
| RBD8 | `torque-free-symmetric-top.html` |
| RBD9 | `intermediate-axis-player.html` |
| RBD10 | `poinsot-player.html` |
| RBD12 | `heavy-top-precession.html` |
| RBD13 | `rolling-contact.html` |
| RBD16 | `attitude-audit.html` |

静止図を採用した章・動きを不採用にした章は、既存の章別PRでの採否判断と本文・式による説明を引き継ぐ。新しい図・動きは今回追加・変更していない。

**確認限界**：今回、8教材を実ブラウザで再生・通常幅/狭幅表示・講義への往復操作したわけではなく、各ボタンの実動作・公開HTTPレスポンスを検証済みとは主張しない。旧資産を理由なく全件再積分・再レンダリングすることはPLAN §7.2の要求ではない。実在とソース導線の照合、既存章別の査読記録、Pages assemblyの成功を組み合わせて評価し、確定的なブロッキング欠陥は今回検出していない。

## 4. 公開・計画状態の最終確認

- 系列manifest：RBD1〜RBD16 がすべて `completed`、未完了講義なし。科目別目次には全講が公開済み。
- 依存・公開：RBDからCTMへ進む説明を整合。既存 [RBD16追跡監査PR #3231](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/3231) の最終headでは Validate textbook / Pages assembly / DREAM THEATER concepts / exercises / terminology が **5/5 success**。新しいPLAN移動PRについても必須CIと参照整合を確認する。
- 直接参照：`textbook/dream-theater-series/RBD.yaml` の `plan`、`textbook/plans_progress/DREAM_THEATER_CONTINUUM_MECHANICS_COURSE_PLAN.md` のRBDリンク、`textbook/plans/COURSE_DEPENDENCY_MAP.md` のRBDリンクを同時に `plan_done/` へ切り替える。共通 `dream-theater-work.yaml` は系列個別のPLANパスを持たないため変更しない。
- 数学的独立第三者査読、全既存証明・全161解答の新規再計算、8 HTMLの追加実ブラウザ検証は行っていない。これらを実施済みとは表示しない。変更のない章別実装・監査の証拠と今回の横断整合検証を区別する。

**判定：RBD系列PLAN固有の実装・章別査読・最終横断監査・公開参照整合を満たし、現時点で確定した未解消の重大指摘はないため、`plans_progress/` から `plan_done/` へ移動する。** 監査主体は本作業担当（同一AIによる系列横断照合）、第三者独立査読ではない。
