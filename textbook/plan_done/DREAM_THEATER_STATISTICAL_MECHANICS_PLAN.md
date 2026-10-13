# DREAM THEATER 統計力学（SM1〜SM8）

作成・分冊: 2026-10-11  
状態: completed（SM1〜SM8全章公開・章内査読済み。SM8追跡監査と系列横断監査を2026-10-12に完了）

## 中心問い

巨視的・微視的・無秩序系のうち、この科目がどの状態空間と極限を正本化するか。

## 直接必要な前提・PLAN間依存

- 完了済みの熱力学 TH1〜TH8、確率論・測度論。SM1 の着手時には実際に使う正本結果と必要な直接前提を chapter/knowledge metadata に確定する。量子統計を扱うSM6では QM の必要部分を改めて確定する。
- この系列の推奨順：[TH](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md) → [SM](DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md) → [SG](DREAM_THEATER_SPIN_GLASS_PLAN.md)。SGは他系列のブラックホール基礎に無条件必修としない。

## 所有範囲

アンサンブル・分配関数・熱力学極限・量子統計・Ising。

## 2. 統計力学 SM1--SM8

### SM1 microscopic state・ensemble・thermodynamic limit
microstate / macrostate、density of states、thermodynamic limit。

### SM2 microcanonical ensemble
equal probability、Boltzmann entropy、temperature の emergence。

### SM3 canonical ensemble
Gibbs distribution、partition function、free energy、energy fluctuation。

### SM4 grand canonical ensemble
chemical potential、grand partition function、particle-number fluctuation。

### SM5 classical ideal gas・equivalence of ensembles
Maxwell--Boltzmann、Sackur--Tetrode の位置付け、ensemble equivalence。

### SM6 quantum statistics
Bose--Einstein、Fermi--Dirac、quantum ideal gas。

### SM7 Ising / Curie--Weiss・mean-field
Ising Hamiltonian、magnetization、Curie--Weiss、self-consistency、spontaneous symmetry breaking。

### SM8 phase transition・critical phenomenon
free-energy nonanalyticity、correlation、critical point、scaling / universality への入口。

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。変更章自身の主要証明と全詳細解答を再導出し、別観点の再査読を行う。別の完了章の追跡監査は章IDを指定した明示依頼時のみ行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。

## SM1 の着手と進捗（2026-10-12）

- SM1 を微視的状態・巨視的状態・有限アンサンブル・離散準位の状態数・熱力学極限の入口として執筆し、SM 系列 manifest を作成した。
- SM1 は主要4結果の完全証明と A5/B4/C1 の詳細解答を備える。SM2 は微正準アンサンブル、Boltzmannエントロピー、複合系、統計的温度と二値スピンのエントロピー率を実装済み。SM3 は正準アンサンブル・分配関数・自由エネルギー・エネルギー揺らぎを実装済み。SM4 は大正準アンサンブルとして実装済み、SM7〜SM8 は未着手、系列横断監査も今後実施する。
- 概念、証明、数え上げの各役割を区別し、等確率とエントロピーの物理的対応は SM2 に委ねる。

## SM2 の進捗（2026-10-12）

- SM2 は有限エネルギー窓の等確率仮定を明示し、状態数の積・畳み込み、内部最大の温度一致の条件、二項係数の指数漸近を証明する。
- A5/B4/C1 の全詳細解答を追加する。温度の同定に必要な滑らかさ・熱力学的対応を等確率の仮定と区別した。

## SM3 の進捗（2026-10-12）

- SM3 は有限熱浴の厳密な周辺分布と指数重みへの近似条件を区別し、正準分配関数・Gibbsエントロピー・Helmholtz自由エネルギー・変分原理・熱容量と揺らぎ・独立系の積表示まで証明する。
- Level A 5題・B 4題・C 1題の詳細解答を実装。SM6以降および系列横断監査は未完了。

## 着手ゲートの確認（2026-10-12）

- TH1〜TH8 は系列 manifest で全章 `completed`、熱力学 PLAN は横断監査を完了して `plan_done/` に移動済み。熱力学の未完了を理由に SM1 の実装を留保する必要はない。
- SM1 の本文・検証に着手したため PLAN を `plans_progress/` へ移し、SM 系列 manifest に進捗を登録した。
- SM1 は微視的状態・巨視的状態・アンサンブル・熱力学極限の定義を入口とし、TH の巨視的平衡論と微視的分配関数の論証を混同しない。

## SM4 の進捗（2026-10-12）

- SM4 は粒子数別有限配置、浴からの二保存量の周辺確率、大分配関数の対数微分と粒子数揺らぎ、大熱力学ポテンシャルの導出、変分原理、二値独立サイト模型を実装した。
- 本文には9個の主要 formal result、Level A 5題・B 4題・C 1題の詳細解答を配置。SM7〜SM8 と系列横断監査は未完了。

## SM5 の進捗（2026-10-12）

- SM5 は古典理想気体の相空間積分、Maxwell–Boltzmann分布、Sackur–Tetrode式、累積相空間体積、正準エネルギーのGamma分布と集中、微正準・正準の熱力学量同値、大正準Poisson粒子数を実装した。
- Level A 5題・B 5題・C 1題の詳細解答を配置。SM7〜SM8 と系列横断監査は未完了。

## SM6 の進捗（2026-10-12）

- SM6 はBose型・Fermi型占有数、大分配関数と揺らぎ、周期境界自由粒子の状態密度、量子理想気体の状態方程式、希薄極限、Bose基底占有とFermi零温度極限を実装した。
- 主要 formal result 11件、主要証明8件、Level A 4題・B 4題・C 1題の詳細解答を配置。SM7〜SM8 の実装と系列横断監査は残っている。


## SM7 の進捗（2026-10-12）

- 有限強磁性Ising模型、零外場反転対称性、一次元開放鎖の分配関数・二点相関、Curie–Weissの磁化別分配関数を実装した。
- 二項係数の一様評価、圧力の変分極限と磁化集中、臨界温度、微小外場による自発磁化、極限順序の非可換性、磁化感受率を証明した。Level A 4題・B 3題・C 1題に全て詳細解答を配置した。
- SM8 と系列横断監査は残るため、PLANは進行中のままとする。

## SM8 の進捗（2026-10-12）

- SM8は有限系の解析性、極限圧力の外場方向の尖りと温度方向の二次非解析性、二値エントロピーの四次展開、平均場臨界指数、一次元鎖の相関長、全結合の共分散と巨大揺らぎ、スケーリングと普遍性の適用範囲を扱う。
- 主要定義4件、命題2件、補題1件、定理4件を記述し、Level A4/B3/C1の全8題に詳細解答を付けた。SM1〜SM8の執筆・章内査読は完了したが、この記録時点では**系列横断監査が未完了**のため、PLANはまだ進行中だった（最終完了は下記「最終クローズ」の記録を参照）。

## 最終クローズ・SM8追跡監査と系列横断監査（2026-10-12）

- **範囲・担当**：SM1〜SM8の各 `chapter.yaml` / `knowledge.yaml` / `index.md` と系列manifest・公開目次・公開indexを照合。SM8については全文838行（修正前）・主要証明7件・A4/B3/C1の詳細解答全8件を出発点から再計算し、別観点で読者粒度も再読した。同一担当者による二観点査読であり、第三者独立査読ではない。
- **論証の担当**：SM1は微視的/巨視的状態と熱力学極限、SM2は微正準と状態数、SM3は正準分配関数、SM4は大正準、SM5は古典理想気体と熱力学量同値、SM6は量子占有、SM7はIsing/Curie–Weiss圧力と最大点、SM8は相転移・臨界指数・相関を担当する。SM8はSM7の二項係数評価・変分圧力・磁化集中と最大点分類を実在anchorで参照し、同じ定理を無根拠に再掲しない。SM6の量子統計はSM7の平均場へ暗黙前提として逆流しない。
- **前提・概念**：8章の `chapter.yaml` と `knowledge.yaml` の直接prerequisitesの一致を確認。SM1←TH8/F0-00P2A、SM2←SM1/TH4、SM3←SM2/TH5、SM4←SM3/TH7/F0-00P3、SM5←SM4/AMECH5/F0-00P4、SM6←SM5/QM2、SM7←SM3、SM8←SM7/F0-00P3。すべて前章または既存の別系列の章に向いている。
- **公開・参照**：SM1〜SM8の8章は `dream-theater-index.json` と `dream-theater.md` に掲載。本文にある相対Markdown参照100件を対象として、参照先18ページおよび指定stable anchorの存在を照合し、解決不能0件。章内anchorも有効。formal結果のanchorは合計79件で、主要定理の使用箇所と演習解答からの参照を確認した。
- **演習接続**：8章に本文演習ID76件（Level A 37・B 31・C 8）と対応する詳細解答を確認。全章でA4/B3/C1以上。演習は微視的状態からアンサンブル、古典/量子の気体、Ising、相転移まで各章の学習目標に接続する。
- **SM8再導出の証拠**：有限和から `∂_b²p_N=N Var(m_N)`、二値エントロピーの `s(m)=log2-m²/2-m⁴/12+O(m⁶)`、自己無撞着方程式から `m_*²=3(a-1)+O((a-1)²)` と `p(a,0)-log2=3(a-1)²/4+O((a-1)³)`、極限圧力の片側微分 `±m_*`、臨界指数 `1/2,1,3`、全結合の `c_N=(N E[m_N²]-1)/(N-1)` と磁化集中を再計算。A1〜A4・B1〜B3・C1の全解答を照合。B2で平方根則の逆向き評価と数式表示、C1で感受率の連鎖微分を補い、該当箇所を再査読した。
- **表示・停止線**：式の独立ブロック・演習ID・章間参照を確認。相関長は一次元開放鎖、長距離秩序は距離を持たないCurie–Weiss模型に限定し、普遍性を模型外へ証明済みと扱わない。他の模型の臨界指数の一般証明は本PLANの完了条件ではなく次の学修課題に置く。SM1〜SM7の全証明をこの横断監査で改めて再計算したとの主張はしない。
- **残作業**：SM1〜SM8に本PLAN固有の未完了成果物・横断監査タスクはない。変更の検証結果は当該クローズPRとGitHub Actionsの記録を正本とする。
