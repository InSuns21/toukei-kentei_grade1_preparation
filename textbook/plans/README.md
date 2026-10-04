# 未着手の DREAM THEATER 計画

このディレクトリには、設計は済んでいるが計画固有の実装へまだ着手していない DREAM THEATER 系計画書を置く。

- 着手したら `textbook/plans_progress/` へ移す。
- 計画全体が完了したら `textbook/plan_done/` へ移す。
- 既存章や既存理論への言及だけでは着手扱いにせず、計画固有の作業が始まったかで判定する。


## 横断 PLAN の canonical ownership

複数分野にまたがる理論は、応用 PLAN ごとに重複して育てず、次の正本へ集約する。

| 理論・領域 | canonical PLAN / 資産 |
|---|---|
| Hamilton--Jacobi / HJB / 粘性解 / 微分ゲーム / HJI / 確率制御 | `DREAM_THEATER_OPTIMAL_CONTROL_DIFFERENTIAL_GAMES_PLAN.md` |
| 保存則・entropy solution・単調作用素・非線形拡散・blow-up・漸近 | `DREAM_THEATER_NONLINEAR_PDE_PLAN.md` |
| 閉作用素・$C_0$ 半群・Hille--Yosida・抽象発展方程式 | `DREAM_THEATER_FUNCTIONAL_ANALYSIS_OPERATOR_ALGEBRA_PLAN.md` の関数解析発展枝 |
| Riesz potential / Riesz transform / Calderón--Zygmund | `DREAM_THEATER_REAL_ANALYSIS_STRENGTHENING_PLAN.md` の HA 系列 |
| 幾何解析・Laplace--Beltrami・manifold Sobolev・harmonic map | `DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md` |
| 逆問題・ill-posedness・正則化・tomography・Bayes/PDE 逆問題 | `DREAM_THEATER_INVERSE_PROBLEMS_PLAN.md` |
| 情報幾何・Fisher--Rao 計量・双対接続・双対平坦性・情報射影 | `DREAM_THEATER_INFORMATION_GEOMETRY_PLAN.md` |
| SDE / Markov generator / Feynman--Kac | 完了済み Encore IV（`STO9` / `STO11`） |
| 多様体上の確率解析 | `DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md` |
| Navier--Stokes millennium problem への専門ルート | `DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md` |
| 金融の最適執行・HJB 応用 | `DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md` U3（理論は最適制御・HJB・微分ゲーム計画を参照） |

新 PLAN を追加する際は、まず既存の canonical owner に吸収できないか確認する。応用側で同じ定義・定理・証明系列を再構築する必要がある場合だけ、新しい正本を作る。逆に、中心問い・前提・証明機構が独立した数学分野として成立する場合は、応用 umbrella に抱え込まず科目別 PLAN へ分離する。


旧来の「GPDE 後続を一つの大PLANへまとめる」umbrella 型の運用は採らない。PDE の後続であっても、中心問い・前提・証明機構が異なる場合は上表の科目別 PLAN へ分離する。
