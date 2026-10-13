# 未着手の DREAM THEATER 計画

このディレクトリには、設計は済んでいるが計画固有の実装・検証・監査へまだ着手していない DREAM THEATER 系計画書を置く。

## 運用

- 新規 PLAN は、設計だけを追加するならここに置く。同じ作業単位で PLAN 固有の実装まで開始する場合は、最初から `textbook/plans_progress/` に置いてよい。
- 既存章・既存理論がすでに存在することや、それらへ PLAN が言及することだけでは着手扱いにしない。
- PLAN 固有の成果物・検証・監査のいずれかを実際に開始したら、同じ PLAN を `textbook/plans_progress/` へ移す。
- 状態遷移はコピーではなく移動で行い、同じ PLAN を3ディレクトリへ重複配置しない。
- このディレクトリの並び順・ファイル名・更新日時から、次に進める PLAN の優先順位を推測しない。DREAM THEATER の継続作業では `textbook/dream-theater-work.yaml` と series manifest を先に確認する。
- 詳細な状態判定・参照更新・再開規則は `textbook/AGENTS.md` の「PLAN のライフサイクル運用」を正本とする。

## 科目の講数について

**15週・15回は固定ノルマではない。** 各PLANの15項目・週割りは既存の内容候補であり、実際の講数・章IDは証明の長さ、定義の直接例、演習の必要量、独習時の自然な節目に合わせて増減する。1セメスターという表記も科目としてのまとまりを示すだけで、15回へ数合わせしない。既存の完成済み講義を15回に再編しない。詳細な規約は `textbook/AGENTS.md` を参照。

## 横断 PLAN の canonical ownership

複数分野にまたがる理論は、応用 PLAN ごとに重複して育てず、次の正本へ集約する。

| 理論・領域 | canonical PLAN / 資産 |
|---|---|
| セル・オートマトン（局所更新・離散力学・可逆性・Garden of Eden・普遍計算） | `DREAM_THEATER_CELLULAR_AUTOMATA_SEMESTER_PLAN.md`（独立15週・15章、CELL1〜CELL15・横断監査まで完了。計画は `textbook/plan_done/` に移動済み） |
| 力学系（連続区間の反復・固定点・記号力学・カオス） | `DREAM_THEATER_DYNAMICAL_SYSTEMS_COURSE_PLAN.md`（DYN1–DYN15、`textbook/plans_progress/`でDYN1から実装。CELL3/7とODE4/8–11を重複執筆しない） |
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
| 機械学習・統計的学習理論・多様体学習・物理学の4つの連続I/II科目への履修ルート | `DREAM_THEATER_MACHINE_LEARNING_STATISTICAL_LEARNING_MANIFOLD_PHYSICS_ROUTE_PLAN.md`（未実装科目は本編に公開しない） |
| 高次元確率・集中不等式・非漸近ランダム行列評価 | `DREAM_THEATER_HIGH_DIMENSIONAL_PROBABILITY_PLAN.md`（HDP：独立科目・講数可変、SLTの数理基盤） |
| スペクトルグラフ理論・Cheeger不等式・random walk・graph Laplacian | `DREAM_THEATER_SPECTRAL_GRAPH_THEORY_PLAN.md`（SGT：独立科目・講数可変、MFLの数理基盤） |
| ランダム行列・Wigner半円則・Marčenko–Pastur法則 | `DREAM_THEATER_RANDOM_MATRIX_THEORY_PLAN.md`（RMT：独立科目・講数可変、発展分岐） |
| 最適輸送・Wasserstein幾何・測度上の勾配流 | `DREAM_THEATER_OPTIMAL_TRANSPORT_WASSERSTEIN_PLAN.md`（OTR：独立科目・講数可変、発展分岐） |
| SDE / Markov generator / Feynman--Kac | 完了済み Encore IV（`STO9` / `STO11`） |
| 多様体上の確率解析 | `DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md` |
| Navier--Stokes millennium problem への専門ルート | `DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md` |
| 整数論・Diophantine近似・解析的整数論・楕円曲線・モジュラー形式の5科目間の履修ルート | `DREAM_THEATER_NUMBER_THEORY_MODULARITY_ROUTE_PLAN.md`（楕円関数は既存 `CA8` / `CA9` を再利用） |
| 円積問題の2科目（古典作図SQC1〜7・Tarski等分解SQC8〜12）の履修ルート | `DREAM_THEATER_CIRCLE_SQUARING_COURSE_PLAN.md`（SQC1–SQC12、独立科目。指数値の超越性の完全証明はTRN） |
| 超越数論Ⅰ・Hermiteの $e$ の超越性・Hermite–Lindemann・Lindemann–Weierstrass | `DREAM_THEATER_TRANSCENDENTAL_NUMBER_THEORY_I_PLAN.md`（TRN1–TRN14、独立科目。Liouville定理・Liouville数は整数論ルート `NDA6` が正本） |
| 熱力学・熱力学ポテンシャル | `textbook/plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md`（TH1〜TH8 全章・横断監査完了） |
| 平衡統計力学・アンサンブル・Ising | `DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md`（SM1〜8） |
| スピングラス・SK・Parisi・cavity | `DREAM_THEATER_SPIN_GLASS_PLAN.md`（SG1〜8） |
| ブラックホール熱力学・情報・量子場など12科目PLANへの横断ルート（TH/SMを含む） | `DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md`（2026-10-13改訂・17セメスター相当、TH/SMは既存正本） |
| 量子場理論 I〜IV：自由場・散乱・QED・くりこみ・標準模型・CFT | `DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md`（旧I/II計画を移動。正式章数は着手時に決定） |
| Lie群の表現・相対論的粒子・スピノル | `DREAM_THEATER_LIE_REPRESENTATIONS_SPINORS_PLAN.md`（LREP：QFT I／IIIで必要な表現論の独立数学科目） |
| 主束・接続・Chern–Weil・大域的ゲージ幾何 | `DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md`（GBG：GEO／LIEの停止線外、QFT II／IIIと接続） |
| Euclid場／構成的QFT・対角延長による摂動的くりこみ | `DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md`（MQFC I/II：任意の数学的厳密化ルート） |
| ローレンツ幾何・大域因果構造 | `DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md`（LORG1〜LORG21・全21講） |
| Lorentz多様体上の双曲型PDE | `DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md`（HPDE1〜HPDE24・全24講） |
| 超局所解析・Hadamard条件 | `DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md`（MICA1〜15） |
| 代数的QFT・モジュラー理論 | `DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md`（AQFT1〜15） |
| THE END OF MATHEMATICS? 5テーマの横断接続 | `DREAM_THEATER_END_OF_MATHEMATICS_PLAN.md` |
| 金融の価格付け・最適執行の応用 | `DREAM_THEATER_APPLIED_MATHEMATICAL_FINANCE_PLAN.md`（U3。HJB理論は既存の最適制御PLANを参照） |
| 確率ロボティクス・自己位置推定 | `DREAM_THEATER_APPLIED_PROBABILISTIC_ROBOTICS_PLAN.md`（U2） |
| 無裁定・統計的裁定の応用 | `DREAM_THEATER_APPLIED_ARBITRAGE_PLAN.md`（U4） |
| 量子状態推定の応用 | `DREAM_THEATER_APPLIED_QUANTUM_STATE_ESTIMATION_PLAN.md`（U6） |
| Newton 力学・保存則・振動・中心力・2体問題・剛体 | `DREAM_THEATER_CLASSICAL_MECHANICS_I_PLAN.md` |
| 一般化座標・Lagrangian・Hamiltonian・Poisson 括弧・Hamilton--Jacobi | `DREAM_THEATER_ANALYTICAL_MECHANICS_I_PLAN.md` |
| シンプレクティック幾何・Darboux・Lagrange部分多様体・Moser | `textbook/plan_done/DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md`（SYM1〜8：全章完了） |
| Hamilton作用・幾何学的Noether・運動量写像・Marsden–Weinstein簡約 | `textbook/plan_done/DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md`（GMECH1〜8：本文・横断監査完了） |
| 変分問題・第二変分・測地線・極小曲面・直接法・Tonelli・minimax・Morse指数 | `../plans_progress/DREAM_THEATER_VARIATIONAL_PROBLEMS_GEOMETRIC_PLAN.md`（VAR1〜12：前提監査・manifest初期化済、各章は未執筆） |
| Liouville 可積分性・Liouville--Arnold・作用角変数・Birkhoff 標準形・KAM | `textbook/plan_done/DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md`（INT1〜8：全章実装・終了確認済み） |
| 三体問題・制限三体問題・Lagrange 点・天体力学上の非可積分性・Hamiltonian chaos | `textbook/plan_done/DREAM_THEATER_CELESTIAL_MECHANICS_THREE_BODY_CHAOS_PLAN.md`（CELE1〜8完了） |
| 変分的n体周期軌道・Chenciner–Montgomery 8の字・舞踏解・実動作するNewton/変分シミュレーション | `DREAM_THEATER_N_BODY_VARIATIONAL_PERIODIC_ORBITS_SIMULATION_PLAN.md`（CELEV1〜8、未着手。Canvasで物理積分し誤差可視化。SVG再生のみは禁止） |
| 一般力学系の不変多様体・分岐・ホモクリニック構造・記号力学・chaos | `DREAM_THEATER_DYNAMICAL_SYSTEMS_COURSE_PLAN.md` |
| Coulomb / Gauss / Maxwell・電磁ポテンシャル・電磁波 | `DREAM_THEATER_ELECTROMAGNETISM_I_PLAN.md` |
| Schrödinger 作用素・変分原理・量子調和振動子・水素原子 | `DREAM_THEATER_MATHEMATICAL_QUANTUM_MECHANICS_PLAN.md` |

新 PLAN を追加する際は、まず既存の canonical owner に吸収できないか確認する。応用側で同じ定義・定理・証明系列を再構築する必要がある場合だけ、新しい正本を作る。逆に、中心問い・前提・証明機構が独立した数学分野として成立する場合は、応用 umbrella に抱え込まず科目別 PLAN へ分離する。

**個別科目と横断ルートの一覧は [科目PLAN依存マップ](COURSE_DEPENDENCY_MAP.md) を参照。** 独立した科目は個別PLANに執筆内容を所有させ、既存の複合ファイルは必要に応じてルートとして保持する。

旧来の「GPDE 後続を一つの大PLANへまとめる」umbrella 型の運用は採らない。PDE の後続であっても、中心問い・前提・証明機構が異なる場合は上表の科目別 PLAN へ分離する。
