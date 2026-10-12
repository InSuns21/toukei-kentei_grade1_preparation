# DREAM THEATER スピングラス（SG1〜SG8）

作成・分冊: 2026-10-11  
状態: in_progress（SG1〜SG8を執筆。系列横断監査は未完了）

## 中心問い

巨視的・微視的・無秩序系のうち、この科目がどの状態空間と極限を正本化するか。

## 直接必要な前提・PLAN間依存

- 統計力学 SM、確率論、高次元確率の必要部分。SGの研究級定理の成立条件を明記。
- この系列の推奨順：[TH](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md) → [SM](../plan_done/DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md) → [SG](DREAM_THEATER_SPIN_GLASS_PLAN.md)。SGは他系列のブラックホール基礎に無条件必修としない。

## 所有範囲

REM/SK、レプリカ対称性、Ghirlanda–Guerra、Parisi、diluted系。

## 3. スピングラス SG1--SG8

### SG1 quenched disorder・REM
quenched / annealed、Random Energy Model、freezing transition。

### SG2 Gaussian toolbox
Gaussian concentration、Gaussian integration by parts、interpolation。

### SG3 Sherrington--Kirkpatrick model
SK Hamiltonian、overlap、thermodynamic free energy。

### SG4 replica symmetry / RSB
replica method の物理的由来、RS ansatz、RSB、AT instability の位置付け。

### SG5 Ghirlanda--Guerra・ultrametricity
overlap identities、hierarchical structure、ultrametricity。

### SG6 Ruelle probability cascade・Parisi formula
RPC、Parisi functional、Guerra interpolation、Parisi variational principle。

### SG7 diluted spin glass・factor graph
Viana--Bray、Poisson interaction、random factor graph、random CSP への橋。

### SG8 cavity method・Mézard--Parisi
belief propagation、cavity field、Bethe free energy、RS / 1RSB cavity、diluted Mézard--Parisi interface。

EOM221 は SG8 の後に置く。

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。主要証明と全詳細解答を再導出し、別観点の再査読を行う。別の完了章の追跡監査は、章IDを指定した明示依頼時のみ実施する。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。


## SG1 着手記録（2026-10-12）

- TH1〜TH8、SM1〜SM8 は現行系列 manifest で全章 completed、両 PLAN は plan_done にあるため、SG1 は前提ゲートを通過。
- SG 系列 manifest を作成し、SG1 の chapter/knowledge metadata と本文初稿を作成。SG1の章statusは planned に保ち、本文は未公開の draft.txt に置く。全件査読・CI・公開索引のゲートを通るまでは completed にしない。
- REM の quenched/annealed、Gaussian tail、有限温度の比較、自由エネルギー極限（確率収束・期待値収束）、凍結転移を最初の学修単位とする。Gaussian integration by parts・SK overlap は SG2 / SG3 が担当。
- 実装初稿の段階で PLAN を plans_progress に移動。検証前の SG1 や SG2〜8 を completed としない。

## SG1 公開・査読記録（2026-10-12）

- `SG1/index.md` として初稿を正式公開。正規尾・区間計数・圧力極限の上下界・期待値収束、Jensenの等号条件、凍結公式を点検した。
- Level A 4題、Level B 3題、Level C 1題と各詳細解答を点検し、特に一般化REMの帯評価からの上下界・期待値移行を加筆した。
- `textbook/dream-theater-index.json` と `textbook/dream-theater.md` へ公開導線を追加し、SG manifest のSG1を completed に更新。SG2以降と系列横断査読を本PLANの残課題とする。

## SG2 執筆・査読記録（2026-10-12）

- SG1とHDP5を直接前提として、有限Gaussian場、共分散付き部分積分、二レプリカGibbs平均、正規圧力集中、平方根補間、等分散比較を実装。
- 既存HDP5のGaussian部分積分・集中定理を重複所有せず参照し、共分散付きへの拡張、圧力のLipschitz評価、補間法と共通ノイズの具体計算を全件再査読。
- Level A4題・B3題・C1題を全問詳細解答付きで実装。SG3〜SG8と横断監査は残作業。

## SG3 執筆・査読記録（2026-10-13）

- SG2のGaussian部分積分・補間・集中を前提に、SK標準表示と対角項付きfull表示、overlapと共分散、quenched圧力微分、超加法性からの熱力学極限を実装。
- 標準表示とfull表示の共通ノイズ差を検算し、二ブロック共分散差を負の平方として導出。Fekete型証明はブロック分割を展開し、平均の極限と試料の概収束を分離。
- Level A4題・B3題・C1題と詳細解答を実装。SG4〜SG8及び系列横断監査は残課題。

## SG4 執筆・査読記録（2026-10-13）

- SG3のSK共分散とSG2のGaussian補間からRS上界・自己整合方程式を導出。外場ゼロの高温圧力を二次モーメント・集中・凸性から再証明した。
- AT条件は独立線形応答近似の分散増幅率に留め、厳密なRSB存在証明と区別した。二水準overlap模型で階層の動機を説明。
- Level A4題・B3題・C1題の詳細解答を実装。SG5〜SG8と系列横断監査は残課題。

## SG5 執筆・査読記録（2026-10-13）

- SG4の二水準overlapを起点に、GG恒等式と条件付き混合則、Gaussian p-spin摂動の有限サイズ部分積分、自己平均化の十分条件、閾値階層を説明した。
- 最大overlapの原子性と二値ultrametricityは条件と中間式を含む証明を記載。Panchenkoの一般定理は研究級の外部定理として原論文へ誘導し、有限値の帰納法入口と未完結の核心を明示した。
- Level A4・B3・C1題と各詳細解答を作成。SG6〜SG8および系列横断査読は残課題。

## SG6 執筆・査読記録（2026-10-13）

- SG5のultrametricityと階層を前提に、有限段Ruelle確率カスケード、Poisson重みの指数傾斜、Parisi汎関数とGaussian再帰を追加。
- Guerra補間の両端点と負の平方誤差を導く和公式を構成し、有限段の上界とTalagrandのParisi等式（研究級の外部定理）の証明境界を分離した。
- Level A4題・B3題・C1題と詳細解答を実装。SG7〜SG8及び系列横断監査は残課題。

## SG7 執筆・査読記録（2026-10-13）

- SG3のoverlap、SG1のquenched/annealed、SG6の希薄模型への接続を前提に、Poisson化Viana–Bray模型、次数のPoisson薄化、ランダムfactor graphと木上Ising、Poisson辺追加公式、多レプリカ展開、ランダムk-SATの第一モーメント上界を実装。
- 有限Nの対数圧力の結合密度微分をPoisson差分と符号平均から再導出。自己ループを許すことによる有限Nの厳密性、局所木収束と大域木性の違い、Poisson化と固定節数模型の指数率の相違を区別した。
- Level A4題・B3題・C1題を全問詳細解答付きで実装。執筆担当者による数学的全件自己検算と読者粒度の別観点再読を行い、第三者独立査読とは区別した。SG8および系列横断監査は残課題。

## SG8 執筆・査読記録（2026-10-13）

- SG7の因子グラフ・Poisson局所木性に接続し、木上BPの局所belief・Bethe分配関数・厳密性を証明した。
- Ising cavity field、三角形のloop補正、RS分布再帰と高温収縮、有限状態1RSB重み付けを実装した。Mézard–Parisiの一般希薄グラフ公式は物理的仮定との境界を明記した。
- Level A4・B3・C1と全詳細解答を作成。数学的全件自己検算と別観点再読は同一執筆担当者による。第三者独立査読とは区別する。
- SG1〜SG8の本文は揃った。依存・証明担当・演習接続・公開導線の系列横断監査は残るためPLANはplans_progressに維持する。
