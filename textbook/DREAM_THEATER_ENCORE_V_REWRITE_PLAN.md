# DREAM THEATER Encore V リライト計画

## 0. 目的

現行 Encore V「Numerical Analysis, FEM & Monte Carlo」を、数学科・数理科学系の計算数理として読める体系へ再編する。

主線は次の5系列とする。

1. 数値解析
2. 差分法
3. 有限要素法
4. Monte Carlo 法
5. 準 Monte Carlo 法

現行 Encore V は削除せず archive へ隔離し、reader-facing facade・DREAM THEATER index・knowledge DAG・standard math core からは外す。新系列完成後は旧本文を並行保守しない。

本計画では **原則として1講座を1回の作業セッションで完成させる**。1セッション内で本文、主要定義・主要定理、必要な核心証明、直接例・反例、演習 A4/B3/C1、全問詳細解答、依存関係、validation / audit、PR / merge まで閉じる。

計算機演習は理論講座へ逐次埋め込まず、理論系列完成後にまず **PYNUM1「Python 数値計算速習」** を1セッションで行い、その後 **NUMLAB** を別枠でまとめて構築する。完成後、理論講座と計算機演習を stable anchor で相互リンクする。

---

## 1. 参照資料と役割

主な参照資料は次とする。

- 齊藤宣一「計算数理I（数学科）・計算数理（統合自然科学科）」
  - https://norikazu-saito.github.io/p/kougi/19keisan1.html
- 齊藤宣一「計算数理II（数学科4年）・数値解析学（大学院数理科学研究科）」
  - https://norikazu-saito.github.io/p/kougi/19keisan2.html
- 齊藤宣一「NS: 計算数理I（2026-3S）」
  - https://norikazu-saito.github.io/p/kougi/26na.html
- 齊藤宣一「数学特別講義 Special Lecture on Mathematics」
  - https://norikazu-saito.github.io/p/kougi/19kyoto.html
- 齊藤宣一『偏微分方程式の計算数理』
  - 大著なので全内容を移植しない。差分法・有限要素法・楕円型・Stokes・放物型・移流拡散の標準線を抽出する。
- 『重点解説モンテカルロ法と準モンテカルロ法』
  - https://ci.nii.ac.jp/ncid/BD10332986
  - Monte Carlo / variance reduction / MLMC / QMC の日本語主線として参照する。
- Josef Dick and Friedrich Pillichshammer, Digital Nets and Sequences: Discrepancy Theory and Quasi–Monte Carlo Integration
  - ディスクレパンシー、digital net、Walsh 解析、双対理論、weighted spaces、randomized QMC、高次 QMC の理論骨格を補強する。

既存の DREAM THEATER 正本を優先し、参照資料を理由に prerequisite 外の理論を逆輸入しない。

---

## 2. 共通執筆契約

各講は DREAM_THEATER_AUTHORING_STANDARD.md を入口の正本として執筆する。

各講を完成扱いするために、理由付き例外がなければ最低限次を満たす。

- 主役となる定義に直接例を置き、条件を実際に検証する。
- learning objective そのものとなる主要定理は核心証明まで閉じる。
- 既存 canonical result を使う場合は stable anchor へ直接リンクし、適用条件を局所的に確認する。
- 反例・失敗例では、どの仮定を失い、証明機構のどこが壊れたかまで説明する。
- Level A: 4題以上
- Level B: 3題以上
- Level C: 1題以上
- 全演習に詳細解答を置く。
- 本番答案・20点採点基準は新規追加しない。
- 日本語に定着した数学・数値解析用語は日本語を主表記にする。

各講の標準検証は少なくとも次を含む。

~~~bash
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

knowledge / standard math core / concept dependency を変更した場合は対応する strict validation も実行する。

概念依存監査の scope は `DREAM_THEATER_AUTHORING_STANDARD.md` に従う。通常の各講実装 PR では changed-only strict validation を原則とし、`dream-theater-index.json` への pure-add と新規章の `knowledge.yaml` 追加だけを理由に full audit を要求しない。既存章の `knowledge.yaml`、既存 index path の削除・移動・並べ替え、全体レジストリ・推論規則・監査エンジンを変更した場合は full audit とする。main への push では全体監査を行う。

---

## 3. Phase 0：旧 Encore V の隔離と新 facade

最初の移行セッションで行う。

### 3.1 archive

現行 Encore V の次の系列を archive へ移す。

- F0-00NA*
- F0-00FEM1
- F0-00MC*
- F0-00SDE*
- F0-00UQ1
- F0-00MLMC

保存先の基本方針：

~~~text
textbook/archive/dream-theater/encore-v-legacy/
~~~

旧本文は履歴確認・移植元として保持するが、次から外す。

- textbook/dream-theater-index.json
- reader-facing Encore V facade
- standard math core
- knowledge DAG の canonical owner
- 新章の prerequisites / proof dependency

### 3.2 facade

現行 F0_00R5_EncoreV_Numerical_FEM_MonteCarlo の reader-facing URL は、新 Encore V の facade として再利用する。

facade は完成済み講座だけをリンクする。未完成章を先行表示しない。

旧個別 URL が外部参照されている場合は、必要に応じて非掲載の互換 stub を残し、新 canonical page へ誘導する。

### 3.3 Phase 0 完了状況

- [x] 旧 Encore V 11講を `textbook/archive/dream-theater/encore-v-legacy/` へ隔離
- [x] reader-facing facade を新 Encore V「計算数理」へ切替
- [x] `textbook/dream-theater-index.json` から旧講座を除外
- [x] `textbook/dream-theater.md` の Encore V 目次を facade のみに整理
- [x] standard math core / knowledge DAG に旧 Encore V の canonical owner が存在しないことを確認
- [x] NA1「浮動小数点・誤差・条件数・安定性」を新正本として実装
- [x] NA2「非線形方程式・不動点反復・Newton 法」を新正本として実装
- [x] NA3「非線形連立方程式」を新正本として実装
- [x] NA4「多項式補間」を新正本として実装
- [x] NA5「数値積分・直交多項式・Gauss 型積分」を新正本として実装
- [x] NA6「ODE 数値解法 I：一段法と収束」を新正本として実装
- [x] NA7「ODE 数値解法 II：Runge–Kutta・絶対安定性」を新正本として実装
- [x] NA8「数値線形代数 I：直接法」を新正本として実装
- [x] NA9「数値線形代数 II：反復法・Krylov 法」を新正本として実装
- [x] NA10「固有値数値計算」を新正本として実装
- [x] NA11「Perron–Frobenius 理論と PageRank」を新正本として実装
- [x] NA12「無制約最適化と共役勾配法」を新正本として実装
- [x] FDM1「熱方程式と差分法の導入」を新正本として実装
- [x] FDM2「差分スキームの安定性」を新正本として実装
- [x] FDM3「整合性・安定性・収束性」を新正本として実装
- [x] FDM4「移流拡散と風上化」を新正本として実装
- [x] FEM1「Poisson 方程式・変分形式・Galerkin 法」を新正本として実装
- [x] FEM2「三角形分割・局所基底・組立て」を新正本として実装
- [x] FEM3「有限要素補間とメッシュ」を新正本として実装
- [x] FEM4「楕円型 FEM の誤差解析」を新正本として実装
- [x] FEM5「鞍点問題・Stokes 方程式」を新正本として実装
- [x] FEM6「放物型方程式の有限要素法」を新正本として実装
- [x] FEM7「移流拡散・安定化有限要素法」を新正本として実装
- [x] MC1「Monte Carlo 法と統計的誤差」を新正本として実装
- [x] MC2「乱数生成とサンプリング」を新正本として実装
- [x] MC3「分散減少法」を新正本として実装
- [x] MC4「Multilevel Monte Carlo」を新正本として実装
- [x] QMC1「一様分布・ディスクレパンシー・Koksma–Hlawka」を新正本として実装
- [x] QMC2「RKHS・最悪誤差・重み付き空間」を新正本として実装
- [x] QMC3「格子則」を新正本として実装
- [x] QMC4「(t,m,s)-net・(t,s)-sequence」を新正本として実装
- [x] QMC5「Walsh 解析とデジタルネットの双対理論」を新正本として実装
- [x] QMC6「多項式格子（polynomial lattice）」を新正本として実装
- [x] QMC7「ランダム化準 Monte Carlo 法（randomized QMC）」を新正本として実装
- [x] QMC8「高次準 Monte Carlo 法（higher-order QMC）」を新正本として実装
- [x] Encore V 理論35講の横断監査：**方針決定により実施対象外（skip）**
- [x] PYNUM1「Python 数値計算速習」を新正本として実装
- 次の実装対象：**NUMLAB0「計算機演習基盤」**


---

# 4. Phase 1：数値解析 NA1–NA12

数値解析本線は12講とする。

| ID | 講座 | 中心内容 |
|---|---|---|
| NA1 | 浮動小数点・誤差・条件数・安定性 | 浮動小数点、丸め、桁落ち、条件数、forward/backward error、後方安定性 |
| NA2 | 非線形方程式・不動点反復・Newton 法 | 二分法、不動点反復、縮小写像、Newton 法、収束次数 |
| NA3 | 非線形連立方程式 | Jacobian、Newton 法、局所収束、初期値依存、悪条件性 |
| NA4 | 多項式補間 | Lagrange 補間、Newton 補間、補間誤差、節点選択、Runge 現象 |
| NA5 | 数値積分・直交多項式・Gauss 型積分 | Newton–Cotes、複合則、直交多項式、Gauss 求積、次数 |
| NA6 | ODE 数値解法 I：一段法と収束 | Euler 法、一段法、局所打切り誤差、整合性、安定性、大域誤差 |
| NA7 | ODE 数値解法 II：Runge–Kutta・絶対安定性 | Runge–Kutta、次数、安定領域、stiffness、陰解法 |
| NA8 | 数値線形代数 I：直接法 | Gaussian elimination、LU、Cholesky、QR、条件数、後方誤差 |
| NA9 | 数値線形代数 II：反復法・Krylov 法 | Jacobi、Gauss–Seidel、残差、CG、Krylov、前処理 |
| NA10 | 固有値数値計算 | 冪乗法、逆反復、shift、Rayleigh 商、対称固有値問題 |
| NA11 | Perron–Frobenius 理論と PageRank | 非負行列、Perron 固有ベクトル、確率行列、PageRank |
| NA12 | 無制約最適化と共役勾配法 | 最急降下、Newton、二次最適化、CGとの関係 |

### 4.1 境界

- NA9 の CG は SPD 線形方程式を解く Krylov 法として扱う。
- NA12 では同じ CG を二次関数最小化の立場から再解釈し、重複証明を避ける。
- ODE の存在一意性・線形化などは既存 ODE 系列へ参照し、数値離散化へ集中する。

### 4.2 Phase 1 進捗

- [x] NA1：浮動小数点・誤差・条件数・安定性
- [x] NA2：非線形方程式・不動点反復・Newton 法
- [x] NA3：非線形連立方程式
- [x] NA4：多項式補間
- [x] NA5：数値積分・直交多項式・Gauss 型積分
- [x] NA6：ODE 数値解法 I
- [x] NA7：ODE 数値解法 II
- [x] NA8：数値線形代数 I
- [x] NA9：数値線形代数 II
- [x] NA10：固有値数値計算
- [x] NA11：Perron–Frobenius 理論と PageRank
- [x] NA12：無制約最適化と共役勾配法

---

# 5. Phase 2：差分法 FDM1–FDM4

差分法は1講に圧縮しない。4講に分割する。

| ID | 講座 | 中心内容 |
|---|---|---|
| FDM1 | 熱方程式と差分法の導入 | 格子、差分商、陽解法・陰解法の導出、初期・境界条件 |
| FDM2 | 差分スキームの安定性 | CFL 条件、von Neumann 型解析、陽解法・陰解法・θ法 |
| FDM3 | 整合性・安定性・収束性 | 局所打切り誤差、大域誤差、安定性＋整合性→収束の構造、離散最大値原理 |
| FDM4 | 移流拡散と風上化 | centered / upwind、数値拡散、非物理振動、Péclet 数、安定化への入口 |

FDM3 を独立講にする。数値 PDE の基本論理

~~~text
PDE
↓
離散化
↓
局所打切り誤差
↓
安定性
↓
大域誤差・収束
~~~

を後続 FEM の近似性・coercivity・収束へ接続する。

### 5.1 Phase 2 進捗

- [x] FDM1：熱方程式と差分法の導入
- [x] FDM2：差分スキームの安定性
- [x] FDM3：整合性・安定性・収束性
- [x] FDM4：移流拡散と風上化

---

# 6. Phase 3：有限要素法 FEM1–FEM7

現行 FEM1 一講への過密集約を解消し、7講へ分割する。

| ID | 講座 | 中心内容 |
|---|---|---|
| FEM1 | Poisson 方程式・変分形式・Galerkin 法 | 弱形式、有限次元 Galerkin、最良近似、Céa |
| FEM2 | 三角形分割・局所基底・組立て | finite element、自由度、reference element、affine map、assembly |
| FEM3 | 有限要素補間とメッシュ | Lagrange 補間、shape regularity、局所補間誤差、大域化 |
| FEM4 | 楕円型 FEM の誤差解析 | H1 誤差、Céa、L2 誤差、Aubin–Nitsche 型双対論法 |
| FEM5 | 鞍点問題・Stokes 方程式 | 一般化 Lax–Milgram、inf-sup、混合 FEM、Taylor–Hood の位置付け |
| FEM6 | 放物型方程式の有限要素法 | 半離散化、energy estimate、時間離散、全離散化 |
| FEM7 | 移流拡散・安定化有限要素法 | 移流卓越、標準 Galerkin の失敗、風上化、SUPG 等の入口 |

### 6.1 Encore III との境界

既存 GPDE 系列を canonical dependency として再利用する。

- GPDE3–5：Sobolev、trace、embedding、compactness
- GPDE6：弱形式・変分形式
- GPDE7：Lax–Milgram
- GPDE8：二階線形楕円型 PDE
- GPDE9：楕円型正則性
- GPDE10：Galerkin・時間発展 PDE の弱解

新 FEM 系列では、これらを重複再証明するのではなく、

- 有限次元空間の選び方
- メッシュ・基底
- 補間
- assembly
- 数値誤差
- 離散安定性

へ重心を置く。

### 6.2 Phase 3 進捗

- [x] FEM1：Poisson 方程式・変分形式・Galerkin 法
- [x] FEM2：三角形分割・局所基底・組立て
- [x] FEM3：有限要素補間とメッシュ
- [x] FEM4：楕円型 FEM の誤差解析
- [x] FEM5：鞍点問題・Stokes 方程式
- [x] FEM6：放物型方程式の有限要素法
- [x] FEM7：移流拡散・安定化有限要素法

---

# 7. Phase 4：Monte Carlo MC1–MC4

| ID | 講座 | 中心内容 |
|---|---|---|
| MC1 | Monte Carlo 法と統計的誤差 | 積分＝期待値、LLN、CLT、RMSE、標準誤差、信頼区間 |
| MC2 | 乱数生成とサンプリング | 疑似乱数、逆関数法、棄却法、seed、stream、再現性 |
| MC3 | 分散減少法 | antithetic、control variate、層化、importance sampling |
| MC4 | Multilevel Monte Carlo | telescoping、coupling、最適標本配分、bias / variance / cost、計算量 |

確率論側では既存の大数則・中心極限定理を canonical dependency として用いる。

### 7.1 Phase 4 進捗

- [x] MC1：Monte Carlo 法と統計的誤差
- [x] MC2：乱数生成とサンプリング
- [x] MC3：分散減少法
- [x] MC4：Multilevel Monte Carlo

現行 SDE1 / SDE1A / UQ1 は新 Encore V 本線には残さない。将来の「確率数値解析」系列の移植元として archive に保持する。

---

# 8. Phase 5：準 Monte Carlo QMC1–QMC8

QMC は3講程度に圧縮せず、理論骨格を8講に分割する。

| ID | 講座 | 中心内容 |
|---|---|---|
| QMC1 | 一様分布・ディスクレパンシー・Koksma–Hlawka | 一様分布、局所ディスクレパンシー、スター・ディスクレパンシー、変動、誤差評価 |
| QMC2 | RKHS・最悪誤差・重み付き空間 | 最悪誤差、再生核、重み付き Sobolev 空間、実効次元、tractability |
| QMC3 | 格子則 | rank-1 lattice、双対格子、積分誤差、CBC 構成の思想 |
| QMC4 | (t,m,s)-net・(t,s)-sequence | elementary interval、t 値、digital construction、Sobol / Faure / Niederreiter |
| QMC5 | Walsh 解析とデジタルネットの双対理論 | Walsh 関数、双対ネット、周波数消去、NRT 重み |
| QMC6 | 多項式格子 | 有限体多項式、digital net との関係、CBC、構成法 |
| QMC7 | ランダム化準 Monte Carlo 法 | digital shift、scrambling、不偏推定、分散、分散分析との接続 |
| QMC8 | 高次準 Monte Carlo 法 | 滑らかさ、Walsh 係数減衰、高次デジタルネット、桁交互配置、高次収束 |

### 8.1 既存 RKHS との接続

QMC2 は既存 F0-02C7 の RKHS / 再生核を再定義しない。stable anchor へリンクし、

- 積分汎関数
- 最悪誤差
- 重み付き関数空間

へ応用する。

### 8.2 Digital Nets and Sequences から採用する主題

本線へ採用：

- 幾何学的ディスクレパンシー
- (t,m,s)-net / (t,s)-sequence
- digital construction
- Walsh 解析
- dual net
- polynomial lattice
- weighted spaces
- randomized digital nets
- higher-order digital nets

本線から外す、またはコラムに留める：

- orthogonal array の一般論
- propagation rule の網羅
- cyclic / hyperplane net の特殊理論
- 代数関数体を使う高度な構成
- 特殊な最適 $L^2$ ディスクレパンシー構成

### 8.3 Phase 5 進捗

- [x] QMC1：一様分布・ディスクレパンシー・Koksma--Hlawka
- [x] QMC2：RKHS・最悪誤差・重み付き空間
- [x] QMC3：格子則
- [x] QMC4：$(t,m,s)$-net・$(t,s)$-sequence
- [x] QMC5「Walsh 解析とデジタルネットの双対理論」を新正本として実装
- [x] QMC6「多項式格子（polynomial lattice）」を新正本として実装
- [x] QMC7「ランダム化準 Monte Carlo 法（randomized QMC）」を新正本として実装
- [x] QMC8「高次準 Monte Carlo 法（higher-order QMC）」を新正本として実装
- [x] Encore V 理論35講の横断監査：**方針決定により実施対象外（skip）**
- [x] PYNUM1「Python 数値計算速習」を新正本として実装
- 次の実装対象：**NUMLAB0「計算機演習基盤」**

---

# 9. Phase 6：Python 数値計算速習・計算機演習系列 NUMLAB

理論35講が完成した後にまとめて別枠で行う。

理論章へ実行環境を先行導入しない。計算機演習へ入る前に、**何らかのプログラミング経験がある読者**を対象として、Python と科学技術計算の差分だけを1セッションで速習する。

| ID | 講座 | 内容 |
|---|---|---|
| PYNUM1 | Python 数値計算速習 | Python の要点、NumPy 配列、shape / dtype、slicing、broadcasting、vectorization、乱数、Matplotlib、SciPy の必要最小限 |
| NUMLAB0 | 計算機演習基盤 | ブラウザ上 Python 実行、Worker、依存ライブラリ、採点、保存、timeout、CI |
| NUMLAB1 | 数値解析演習 | NA1–NA12 対応 |
| NUMLAB2 | 差分法演習 | FDM1–FDM4 対応 |
| NUMLAB3 | 有限要素法演習 | FEM1–FEM7 対応 |
| NUMLAB4 | Monte Carlo 演習 | MC1–MC4 対応 |
| NUMLAB5 | 準 Monte Carlo 演習 | QMC1–QMC8 対応 |

## 9.1 PYNUM1：Python 数値計算速習

一般的なプログラミング入門は行わない。変数・条件分岐・反復・関数・基本的なデータ構造・デバッグという概念自体は既知とする。

1セッションで後続 NUMLAB を読める状態にするため、次へ集中する。

- Python のインデント、反復、内包表記、関数定義、tuple unpacking など他言語との差分
- mutable / immutable、代入と参照、浅いコピーと view の違い
- NumPy の ndarray、shape、axis、dtype、slicing / indexing
- broadcasting と vectorization、および Python loop との役割分担
- 行列積・内積・ノルムなど、後続講で頻出する NumPy 線形代数記法
- boolean mask と条件付き配列演算
- 乱数生成器、seed、再現性
- Matplotlib による折れ線、散布図、log–log plot の最小操作
- SciPy の linear algebra / sparse / sparse.linalg / stats を「必要になったら読める」程度に案内する
- NaN / inf、shape mismatch、dtype 変換、off-by-one など数値計算で頻出する失敗例

対象外とするもの：

- 初学者向けの「プログラミングとは何か」
- Web アプリ開発、GUI、ネットワーク、データベース
- Python の高度なオブジェクト指向、metaclass、非同期処理
- packaging / 配布の一般論
- pandas を前提にした表計算中心のデータ分析

PYNUM1 は後続 NUMLAB の共通参照章とし、各演習で Python / NumPy の記法説明を繰り返さない。必要箇所から PYNUM1 の stable anchor へ直接リンクする。

## 9.2 基盤方針

第一候補はブラウザ内 Python 実行とする。

基本要件：

- Python
- NumPy
- 必要時のみ SciPy
- Matplotlib
- Web Worker による実行分離
- seed / PRNG の再現性
- timeout 時に Worker を破棄可能
- localStorage / IndexedDB 等による進捗保存
- 数値 tolerance を持つ自動テスト
- 性質ベースのテスト
- offline / GitHub Pages との整合
- ネットワークアクセスを演習実行の必須条件にしない

実際の技術選定は NUMLAB0 開始時に、当時の GitHub Pages 構成・bundle size・保守性を確認して最終決定する。

## 9.3 理論演習との役割分担

NUMLAB は理論章の A4/B3/C1 の代替ではない。

理論章は数式・証明・手計算だけで独立完成させる。

NUMLAB は、

- 収束次数の実測
- 安定性条件を破ったときの挙動
- 疎行列・反復法の挙動
- Monte Carlo / QMC の error-versus-work 比較
- 理論で予測した誤差率の確認

を担う。

---

# 10. 理論講座と NUMLAB の相互リンク

NUMLAB 完成後、理論講座と計算機演習を双方向にリンクする。

例：

~~~text
NA5 Gauss型積分
  ⇅
NUMLAB1 Gauss型積分の収束実験

FDM2 CFL条件
  ⇅
NUMLAB2 CFL条件を破ったときの発散

FEM4 H1 / L2 誤差評価
  ⇅
NUMLAB3 mesh幅と収束次数

MC3 control variate
  ⇅
NUMLAB4 分散削減率の比較

QMC4 digital net
  ⇅
NUMLAB5 Sobol点列の低次元投影
~~~

対応関係は機械可読な台帳を用意する。

候補：

~~~text
textbook/numerical-lab-links.yaml
~~~

各レコードには少なくとも、

- theory chapter ID
- theory stable anchor
- lab chapter ID
- lab stable anchor
- exercise / experiment ID

を持たせる。

最終的には

~~~text
theory anchor
→ lab anchor
→ theory anchor
~~~

の両方向リンクが解決することを validation で確認する。

---

# 11. セッション運用

原則として次の順に1講ずつ進める。

~~~text
Phase 0
archive / facade
  ↓
NA1 → NA2 → … → NA12
  ↓
FDM1 → FDM2 → FDM3 → FDM4
  ↓
FEM1 → FEM2 → … → FEM7
  ↓
MC1 → MC2 → MC3 → MC4
  ↓
QMC1 → QMC2 → … → QMC8
  ↓
理論 Encore V 横断監査
  ↓
PYNUM1
  ↓
NUMLAB0
  ↓
NUMLAB1 → … → NUMLAB5
  ↓
相互リンク・最終横断監査
~~~

1セッションで複数講を半端に開始しない。

対象講を完成・査読・検証・PR / merge してから次講へ進む。

---

# 12. 完了判定

## 理論 Encore V 完了

次をすべて満たした時点とする。

- Phase 0 完了
- NA1–NA12 完了
- FDM1–FDM4 完了
- FEM1–FEM7 完了
- MC1–MC4 完了
- QMC1–QMC8 完了
- facade / index / DAG / standard math core 同期
- archive が reader-facing 主線から隔離されている
- 横断 terminology / proof / formalism / dependency audit が green
- 人手査読で主要な数学的・教育的欠陥が残っていない

## Encore V 全体完了

理論完了に加えて、

- PYNUM1 完了
- NUMLAB0–NUMLAB5 完了
- 理論講座との相互リンク完了
- 計算機演習の自動テスト・ブラウザ smoke test が green
- 主要数値実験が理論上の予測と整合
- Pages 上で offline / runtime / link が機能

まで完了した状態とする。

---

# 13. 予定作業数

- Phase 0：1セッション
- 理論：35講
  - NA 12
  - FDM 4
  - FEM 7
  - MC 4
  - QMC 8
- Python 数値計算速習：1セッション
- NUMLAB：6セッション
- Phase 6 合計：7セッション
- 横断監査：**理論完成直後の横断監査は実施対象外**。NUMLAB 完成後の最終横断監査のみ計画対象とする

したがって、基本作業単位は **1講座＝1セッション**を維持しながら、理論と計算機実験を混線させず段階的に完成させる。
