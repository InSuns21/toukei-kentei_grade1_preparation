# DREAM THEATER 機械学習・統計的学習理論・多様体学習・物理学 横断ルート

分冊: 2026-10-11  
状態: planned（ルート台帳のみ）

## 科目別PLAN（それぞれI→IIを同一PLANに保持）

- [機械学習I・II（ML1/2）](../plans_progress/DREAM_THEATER_MACHINE_LEARNING_I_II_PLAN.md)
- [統計的学習理論I・II（SLT1/2）](DREAM_THEATER_STATISTICAL_LEARNING_THEORY_I_II_PLAN.md)
- [多様体学習I・II（MFL1/2）](DREAM_THEATER_MANIFOLD_LEARNING_I_II_PLAN.md)
- [機械学習と物理学I・II（PML1/2）](DREAM_THEATER_PHYSICS_INFORMED_MACHINE_LEARNING_I_II_PLAN.md)

## 直接依存の見取り図

~~~text
LA/RA/最適化・確率論 → ML1 → ML2
HDP・確率論＋ML1 → SLT1 → SLT2（RMTは発展の必要部分）
SGT＋GEO → MFL1 → MFL2（群作用・表現を追加）
ML1/2＋TH/SMの該当講 → PML1 → PML2（GPDE/INV/FEM）
~~~

SGTは有限グラフのスペクトル定理の正本、MFLは標本グラフから連続作用素への近似を正本とする。HDP・RMT・OTR・情報幾何など未実装PLANを無条件必修・既証明扱いにしない。

---

## 元の横断PLANから保持した共通規則・資料（個別シラバスは各科目PLANが正本）

## 0. 目的・中心問い

本 PLAN は、機械学習の手法を「使い方の羅列」で終わらせず、**統計的学習、学習可能性の理論、データ幾何、多様体仮説、統計力学・物理法則との接続**までを独立セメスター単位で組織する横断ルートである。

- 観測標本から予測器や確率モデルを作るとはどういうことか。
- 有限標本から汎化できるためにどの仮定が必要か。
- 高次元データの「低い内在次元」をどの数学で定式化・検査できるか。
- 学習の最適化と統計力学・拡散・対称性・保存則はどこまで厳密につながるか。
- 学習モデルで物理の数値計算を行う際、誤差・安定性・保存則はどう監査するか。

本 PLAN は科目間の依存・正本境界・検証基準を所有する。集中不等式やグラフのスペクトルなど、独立数学科目として成立する主題を本 PLAN 内の数ページの補講に押し込まない。

## 1. 講義規模と一覧

各科目は独立した学修系列とするが、**15週・90分×15回は上限・下限・完成条件のいずれにも使わない**。15項目のシラバスは初期テーマ案であり、演習・計算実験の自習時間と主要証明の長さを考慮して必要な章に分ける。章IDは予約候補であり、実装前にDAG・既存ID・series manifestを確認して増減・修正する。

| ID | 独立科目 | 区分 | 学修到達点 |
|---|---|---|---|
| ML1 | 機械学習 I：学習問題・予測・最適化 | 基幹 | 損失・正則化・検証・基本算法を導出する |
| ML2 | 機械学習 II：確率的機械学習と深層表現 | 基幹 | 潜在変数・変分推論・深層学習・生成モデルを数式で扱う |
| SLT1 | 統計的学習理論 I：汎化・学習可能性 | 基幹 | VC・Rademacher・安定性の汎化保証を証明する |
| SLT2 | 統計的学習理論 II：高次元・深層学習理論 | 基幹 | 過剰パラメータ化・NTK・暗黙バイアスの条件付き定理を扱う |
| MFL1 | 多様体学習 I：内在次元とデータ幾何 | 基幹 | 多様体仮説を定式化し、スペクトル法を解析する |
| PML1 | 機械学習と物理学 I：統計力学・対称性・動力学 | 基幹 | 対応の成立条件、物理構造を取り込むモデルを理解する |
| MFL2 | 幾何的深層学習 | 発展独立科目 | 群作用・表現・グラフ・多様体上の同変モデル |
| PML2 | 科学機械学習・物理制約付き数値近似 | 発展独立科目 | PINN・operator learning・逆問題の誤差評価 |

**SLT = Statistical Learning Theory。** 「統計的機械学習」は主として ML2 の確率モデルと推論、「統計的学習理論」は SLT1/2 の学習可能性・汎化・高次元極限であり、両者を同一視しない。

## 2. 数学基盤の棚卸し：既存 / planned / 新設

リポジトリの章が既にあることと、前提定理を十分な深さで証明済みであることは区別する。「既存」は導線が確認できたという意味で、全細目の証明監査が完了したとの主張ではない。

| 領域 | 現状の正本・導線 | 判定 | 新規で負う責務 |
|---|---|---|---|
| 線形代数、SVD、二次形式、多変数微分 | LA・RA 系列 | 既存を再利用 | ML1 は損失への適用のみ |
| Hilbert・作用素・Fourier・Sobolev | FA / FOU / GPDE / RKHS | 既存を再利用 | SLT2 の関数空間・作用素極限の仮定を確認 |
| 測度論・条件付き期待値・収束・マルチンゲール | MT / 確率論 / STO | 既存を再利用 | ML2 の変分目的・SLT1 の経験過程に適用 |
| 凸解析・数値最適化・Monte Carlo | OPT / NA / MC | 既存を再利用 | 非凸深層学習で既存凸理論を乱用しない |
| カーネル・表現定理・SVM | RKHS1–RKHS5 | 既存を再利用 | ML1/SLT1 は参照・汎化解析 |
| 滑らかな多様体・計量・曲率 | GEO1–GEO19 | 既存を再利用 | MFL はデータ標本による推定を担当 |
| Laplace–Beltrami・熱核 | 幾何解析 PLAN | 計画済み、未実装 | MFL はグラフ近似と収束の適用条件 |
| Fisher–Rao・情報射影・自然勾配 | 情報幾何 PLAN | 計画済み、未実装 | ML2 はモデルへの利用に限定 |
| 熱力学・統計力学・スピングラス | TH / SM / SG の PLAN | 計画済み、未実装 | PML は学習との対応を担当 |
| Shannon 情報理論・符号化 | ブラックホール・情報ルート内の情報理論 I | 計画済み、未実装 | SLT は mutual information・Fano 等の具体的な学習界 |
| 逆問題・作用素正則化 | 逆問題 PLAN | 計画済み、未実装 | PML2 は inverse learning の数値比較 |
| 力学系・不変多様体 | ODE4/ODE8–11・力学系 PLAN | 部分的に既存＋計画 | PML は学習勾配流・物理系への適用 |
| 確率的不等式・高次元確率・行列集中 | **高次元確率 PLAN (HDP)** | **新設する数学正本** | SLT1/2 で再証明せず参照 |
| グラフ Laplacian・Cheeger・スペクトル分割 | **スペクトルグラフ理論 PLAN (SGT)** | **新設する数学正本** | MFL で多様体標本・学習へ適用 |
| ランダム行列の極限スペクトル | **ランダム行列 PLAN (RMT)** | **発展数学正本** | SLT2 の必要部分に限定して接続 |
| Wasserstein 幾何・最適輸送・勾配流 | **最適輸送 PLAN (OTR)** | **発展数学正本** | ML2/PML は用途別に接続 |
| VC・経験過程・PAC-Bayes | **SLT1** | 新設：学習理論固有正本 | HDP の濃度定理の上で構築 |
| グラフ→多様体 Laplacian 収束 | **MFL1** | 新設：統計幾何固有正本 | SGT の離散スペクトル理論と分離 |

対応する科目別 PLAN:
- [高次元確率・集中不等式](DREAM_THEATER_HIGH_DIMENSIONAL_PROBABILITY_PLAN.md)
- [スペクトルグラフ理論](DREAM_THEATER_SPECTRAL_GRAPH_THEORY_PLAN.md)
- [ランダム行列理論](DREAM_THEATER_RANDOM_MATRIX_THEORY_PLAN.md)
- [最適輸送・Wasserstein 幾何](DREAM_THEATER_OPTIMAL_TRANSPORT_WASSERSTEIN_PLAN.md)

## 3. 学習依存と必修判定

~~~text
線形代数・RA・確率論・OPT・NA
          │
          ├──→ ML1 ──────→ ML2 ──────────→ PML1
          │      │           │                ↑
          │      │           └──→ MFL2        │
          │      ↓                            │
          │     SLT1 ───────→ SLT2            │
          │      ↑             ↑              │
          └──→ HDP1 ───────────┤              │
                               │              │
                    RMT1（発展分岐）     TH / SM / STO
                               
GEO・線形代数・確率論
          ├──→ SGT1 ─────→ MFL1 ───→ MFL2
          └──→ GEO・幾何解析 PLAN ──┘

PDE / GPDE / INV・NA / FEM・ML2・PML1 → PML2
OTR1（発展分岐） ──→ ML2の高度な生成模型 / PML2の拡散・流体勾配流
~~~

上図の矢印は典型的導線であり、**全部履修してから ML1 に入る必要はない**。ML1 は LA・RA・基礎確率から開始でき、各章で使う定理にのみ prerequisite を置く。

- **HDP1 は SLT1 の汎化証明の重要な数理基盤**。ただし初回 ML1 の必修ではない。
- **SGT1 は MFL1 のスペクトル法の数理基盤**。GEO 全19章の完了を一律必須にはしない。
- **RMT1/OTR1 は発展分岐**。SLT2 の NTK 入門や ML2 の基本拡散モデルを読むために無条件の必修にしない。
- PML1 の SM/SG が必要なのは統計力学との対応部分であり、一般対称性・構造保存モデルの先行学習を禁止しない。
- 幾何解析/情報幾何/熱・情報の「計画済み」結果を実装済みとしてリンクしない。公開講義時は依存元完成まで局所定義または intentional black box を明示。

## 6. 必ず監査する数学的飛躍

1. **ERM と汎化の区別**: 訓練損失が小さいだけで母集団リスクの保証にはならない。損失の有界性・尾部・関数クラス・標本独立性などを明示する。
2. **多様体仮説と一般定理の区別**: データが厳密な滑らかな多様体上にあるとは仮定しない。球面上の例と混合・交差・特異点・ノイズを比較する。
3. **三種類の多様体**: データの support/latent の多様体、Fisher 計量を持つパラメータ統計多様体、力学系の不変多様体を混同しない。
4. **Laplace–Beltrami の近似**: sampling density、bandwidth、境界、正規化、採用する convergence mode を固定する。どの graph Laplacian でも無条件に同じ極限にはならない。
5. **深層学習理論の量化**: 幅・標本数・学習時間の極限順序、初期化、activation、loss の条件を明示する。NTK・mean-field を任意の有限幅モデルの万能説明にしない。
6. **Gibbs/SGD の対応**: 一定温度の可逆 Langevin 模型と離散ミニバッチ SGD を同一視しない。ノイズの状態依存・非等方性・有限 step size を検査する。
7. **生成モデルと確率測度**: score の存在、密度・平滑性、時間反転 SDE の仮定と境界を明示する。Wasserstein 解釈は導出のある範囲だけ使う。
8. **PINN と PDE 解法**: residual norm と解の誤差は同値ではない。安定性・正則性・離散化・境界条件・数値ベースラインを固定する。
9. **情報量の用語**: Shannon entropy、KL、cross-entropy、Fisher information、熱力学 entropy を定義と単位で区別する。
10. **未実装の数学 PLAN**: 情報幾何・幾何解析・統計力学・情報理論 I を既習と仮定する章では、その章の公開前に導線を検証する。

## 7. 各科目の中核証明・演習

| 科目 | 少なくとも一つ完成させる主要証明 / 計算 |
|---|---|
| ML1 | ridge の正規方程式と一意性、勾配法の収束条件 |
| ML2 | EM の Jensen による単調性、ELBO の厳密な恒等式、逆伝播 |
| SLT1 | Sauer–Shelah + VC 汎化界、symmetrization |
| SLT2 | 最小ノルム補間解と高次元線形模型、制限つき NTK 結果 |
| MFL1 | graph Laplacian の極限の有限次元・局所模型、密度の効果 |
| PML1 | Gibbs 変分恒等式と Langevin 不変分布（境界条件明示） |
| MFL2 | 指定した群作用下での等変性の証明 |
| PML2 | PDE 残差・誤差の非同値例、FEM/差分ベースライン比較 |

少なくとも一つの連続教材横断プロジェクトは、合成円環/球面データの生成 → PCA/グラフ法/拡散法 → 汎化/標本数の検討 → 物理対称性を用いた制約学習とし、パラメータ・乱数種・実行条件を保存する。

## 8. 執筆・公開・CI・完了条件

- [ ] 各コースの正式 chapter ID / metadata / 依存 DAG / カテゴリを確定。
- [ ] 各科目の全学習目標、定義、具体例、証明、詳細解答、実験を講数に関係なく整備。
- [ ] 各初出定義を CI で監査し、2–4 手の非自明な変形を落とさない。
- [ ] 図解が有益なら図・アニメーション SVG を使用。ただし定義・証明の代替としない。
- [ ] 既存 canonical owner との重複を判定して参照を張る。
- [ ] URL・索引・標準通読順・必要な manifest を、講義実装段階で整合させる。
- [ ] 証明の独立数理監査、読者前提監査、検証コマンド / CI を通す。
- [ ] 本計画を `plans_progress/` → `plan_done/` にライフサイクル規約どおり移す。

**本 PR は PLAN 設計のみであり、未実装の章を本編へ公開したと表示しない。**

## 9. 範囲校正の参考書・原論文

- Trevor Hastie, Robert Tibshirani, Jerome Friedman, *The Elements of Statistical Learning*.
- Kevin P. Murphy, *Probabilistic Machine Learning: An Introduction* / *Advanced Topics*.
- Shai Shalev-Shwartz, Shai Ben-David, *Understanding Machine Learning: From Theory to Algorithms*.
- Martin Anthony, Peter Bartlett, *Neural Network Learning: Theoretical Foundations*.
- Stéphane Mallat, *A Wavelet Tour of Signal Processing*（表現・多重スケールへの接続）。
- Ronald Coifman, Stéphane Lafon, “Diffusion Maps”.
- Michael Bronstein et al., “Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges”.
- Giuseppe Carleo et al., “Machine learning and the physical sciences”.
- George Karniadakis et al., “Physics-informed machine learning”.
