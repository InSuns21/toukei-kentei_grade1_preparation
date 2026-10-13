# DREAM THEATER 熱力学（TH1〜TH8）

作成・分冊: 2026-10-11  
状態: completed（TH1〜TH8 全章公開済み。科目横断監査を2026-10-12に完了）

## 中心問い

巨視的・微視的・無秩序系のうち、この科目がどの状態空間と極限を正本化するか。

## 直接必要な前提・PLAN間依存

- 既存 RA/MECH/微積分。SMの前提となる平衡熱力学。
- この系列の推奨順：[TH](DREAM_THEATER_THERMODYNAMICS_PLAN.md) → [SM](../plan_done/DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md) → [SG](DREAM_THEATER_SPIN_GLASS_PLAN.md)。SGは他系列のブラックホール基礎に無条件必修としない。

## 所有範囲

平衡状態、熱の法則、entropy、熱力学ポテンシャル、安定性。

## 1. 熱力学 TH1--TH8

### TH1 平衡状態・状態量・温度
系・環境、平衡、示量 / 示強変数、第0法則、状態方程式。

### TH2 第一法則・内部エネルギー・熱・仕事
$dU=\delta Q+\delta W$、準静的過程、$pV$ work、熱容量、理想気体。

### TH3 第二法則・Carnot・絶対温度
熱機関、Kelvin / Clausius、Carnot theorem、可逆 / 不可逆。

### TH4 entropy・基本関係式
Clausius integral、entropy increase、$U(S,V,N)$。

### TH5 thermodynamic potential・Legendre transform
$F,G,H$、自然変数、Maxwell relation、Euler / Gibbs--Duhem。

### TH6 stability・response・convexity
heat capacity、compressibility、susceptibility、convexity / concavity、variational principle。

### TH7 chemical potential・multicomponent・phase equilibrium
chemical potential、phase coexistence、Clapeyron、mixing、chemical equilibrium、third law の位置付け。

### TH8 phase transition・magnetism・Landau への入口
first / continuous transition、order parameter、magnetic field / magnetization、Landau free energy、criticality の入口。

非平衡熱力学は本系列の停止線とする。

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、変更章自身の別観点の再査読を行う。別の完了章の追跡監査は、対象章が明示依頼された場合のみ実施する。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。

## 最終クローズ・科目横断監査（2026-10-12）

- **範囲**：TH1〜TH8 の各 `chapter.yaml`、`knowledge.yaml`、本文の定義・結果の stable anchor・演習ID・Markdown 参照、TH 系列 manifest、公開索引を照合した。各章の主題は TH1 平衡状態、TH2 第一法則、TH3 Carnot と第二法則、TH4 エントロピー、TH5 熱力学ポテンシャル、TH6 安定性・応答、TH7 化学ポテンシャルと相平衡、TH8 Landau 相転移であり、主要結果の担い手が系列内で重複しない。
- **章間依存**：TH1←MECH1/RA3、TH2←TH1/MECH3/RA3、TH3←TH2/TH1、TH4←TH3/TH2/TH1、TH5←TH4、TH6←TH5、TH7←TH6、TH8←TH7。各章で `chapter.yaml` と `knowledge.yaml` の直接 prerequisite が一致する。
- **公開導線・参照**：8章が DREAM THEATER 公開索引に掲載され、本文中の Markdown 結果参照114箇所について、参照先10ページと指定された stable anchor の存在を照合し、解決不能0件。結果が実際に援用される位置からの参照も TH8 の追跡監査で点検した。
- **演習接続**：本文に TH1〜TH8 の演習ID計79件（Level A 40・B 31・C 8）、詳細解答 marker を確認した。各章に A4/B3/C1 以上が存在する。
- **数学的重点査読**：TH8 の主要証明6件・演習10題を全件検算し、非退化**局所**極小枝の包絡微分を相共存点へ適用できるよう命題・証明を訂正した。再導出例は四次極小の平方完成、六次共存の因数分解、B3 の障壁判定、C1 の潜熱・共存曲線の傾き。TH1〜TH7 の全証明・全解答をこのクローズ作業で改めて独立再証明したとの主張はしない（当該章の完了時査読と今回の**横断**照合を区別）。
- **残作業**：本 PLAN 内で指定された成果物・横断監査・直接必要な公開導線更新は完了。後続 SM の微視的状態・分配関数の理論は統計力学 PLAN が所有し、本 PLAN には逆輸入しない。査読は同一担当者による数理検算と別観点再読であり、第三者独立査読ではない。
