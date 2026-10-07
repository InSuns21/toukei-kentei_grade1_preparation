# 未着手の DREAM THEATER 計画

このディレクトリには、設計は済んでいるが計画固有の実装・検証・監査へまだ着手していない DREAM THEATER 系計画書を置く。

## 運用

- 新規 PLAN は、設計だけを追加するならここに置く。同じ作業単位で PLAN 固有の実装まで開始する場合は、最初から `textbook/plans_progress/` に置いてよい。
- 既存章・既存理論がすでに存在することや、それらへ PLAN が言及することだけでは着手扱いにしない。
- PLAN 固有の成果物・検証・監査のいずれかを実際に開始したら、同じ PLAN を `textbook/plans_progress/` へ移す。
- 状態遷移はコピーではなく移動で行い、同じ PLAN を3ディレクトリへ重複配置しない。
- このディレクトリの並び順・ファイル名・更新日時から、次に進める PLAN の優先順位を推測しない。DREAM THEATER の継続作業では `textbook/dream-theater-work.yaml` と series manifest を先に確認する。
- 詳細な状態判定・参照更新・再開規則は `textbook/AGENTS.md` の「PLAN のライフサイクル運用」を正本とする。

## 横断 PLAN の canonical ownership

複数分野にまたがる理論は、応用 PLAN ごとに重複して育てず、次の正本へ集約する。

| 理論・領域 | canonical PLAN / 資産 |
|---|---|
| Hamilton--Jacobi / HJB / 粘性解 / 微分ゲーム / HJI / 確率制御 | `DREAM_THEATER_OPTIMAL_CONTROL_DIFFERENTIAL_GAMES_PLAN.md` |
| 保存則・entropy solution・単調作用素・非線形拡散・blow-up・漸近 | `DREAM_THEATER_NONLINEAR_PDE_PLAN.md` |
| 強連続半群・mild 解の基本導入 | 完了済み `GPDE10` |
| 閉作用素・半群生成論・Hille--Yosida・抽象発展方程式・半線形発展方程式 | `DREAM_THEATER_EVOLUTION_EQUATIONS_SEMIGROUP_PLAN.md` |
| 現代調和解析・最大作用素・補間・特異積分・Littlewood--Paley・restriction | `DREAM_THEATER_HARMONIC_ANALYSIS_PLAN.md` |
| 幾何学的測度論・Frostman・射影・rectifiability・有限周長・Kakeya interface | `DREAM_THEATER_GEOMETRIC_MEASURE_THEORY_PLAN.md` |
| Riesz potential / Riesz transform / Calderón--Zygmund | `DREAM_THEATER_HARMONIC_ANALYSIS_PLAN.md` |
| 幾何解析・Laplace--Beltrami・manifold Sobolev・harmonic map | `DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md` |
| 逆問題・ill-posedness・正則化・tomography・Bayes/PDE 逆問題 | `DREAM_THEATER_INVERSE_PROBLEMS_PLAN.md` |
| 情報幾何・Fisher--Rao 計量・双対接続・双対平坦性・情報射影 | `DREAM_THEATER_INFORMATION_GEOMETRY_PLAN.md` |
| SDE / Markov generator / Feynman--Kac | 完了済み Encore IV（`STO9` / `STO11`） |
| 多様体上の確率解析 | `DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md` |
| Navier--Stokes millennium problem への専門ルート | `DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md` |
| 初等整数論・Diophantine近似・Hilbert第10問題への発展章・解析的整数論・楕円曲線・モジュラー形式 | `DREAM_THEATER_NUMBER_THEORY_MODULARITY_ROUTE_PLAN.md`（楕円関数は既存 `CA8` / `CA9` を再利用） |
| 熱力学・統計力学・スピングラス | `DREAM_THEATER_THERMODYNAMICS_STATISTICAL_MECHANICS_SPIN_GLASS_PLAN.md` |
| THE END OF MATHEMATICS? 5テーマの横断接続 | `DREAM_THEATER_END_OF_MATHEMATICS_PLAN.md` |
| 金融の最適執行・HJB 応用 | `DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md` U3（理論は最適制御・HJB・微分ゲーム計画を参照） |
| Newton 力学・保存則・振動・中心力・2体問題・剛体 | `DREAM_THEATER_CLASSICAL_MECHANICS_I_PLAN.md` |
| 一般化座標・Lagrangian・Hamiltonian・Poisson 括弧・Hamilton--Jacobi | `DREAM_THEATER_ANALYTICAL_MECHANICS_I_PLAN.md` |
| シンプレクティック幾何・Lie 群作用・幾何学的 Noether・運動量写像・簡約 | `DREAM_THEATER_ANALYTICAL_MECHANICS_II_GEOMETRIC_SYMMETRY_PLAN.md` |
| 第二変分・測地線・Jacobi 場・共役点・極小曲面の安定性 | `DREAM_THEATER_VARIATIONAL_PROBLEMS_GEOMETRIC_PLAN.md` |
| Liouville 可積分性・Liouville--Arnold・作用角変数・Birkhoff 標準形・KAM | `DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md` |
| 三体問題・制限三体問題・Lagrange 点・天体力学上の非可積分性・Hamiltonian chaos | `DREAM_THEATER_CELESTIAL_MECHANICS_THREE_BODY_CHAOS_PLAN.md` |
| 一般力学系の不変多様体・分岐・ホモクリニック構造・記号力学・chaos | `DREAM_THEATER_DYNAMICAL_SYSTEMS_COURSE_PLAN.md` |
| Coulomb / Gauss / Maxwell・電磁ポテンシャル・電磁波 | `DREAM_THEATER_ELECTROMAGNETISM_I_PLAN.md` |
| Schrödinger 作用素・変分原理・量子調和振動子・水素原子 | `DREAM_THEATER_MATHEMATICAL_QUANTUM_MECHANICS_PLAN.md` |

新 PLAN を追加する際は、まず既存の canonical owner に吸収できないか確認する。応用側で同じ定義・定理・証明系列を再構築する必要がある場合だけ、新しい正本を作る。逆に、中心問い・前提・証明機構が独立した数学分野として成立する場合は、応用 umbrella に抱え込まず科目別 PLAN へ分離する。

旧来の「GPDE 後続を一つの大PLANへまとめる」umbrella 型の運用は採らない。PDE の後続であっても、中心問い・前提・証明機構が異なる場合は上表の科目別 PLAN へ分離する。
