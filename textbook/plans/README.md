# 未着手の DREAM THEATER 計画

このディレクトリには、設計は済んでいるが計画固有の実装へまだ着手していない DREAM THEATER 系計画書を置く。

- 着手したら `textbook/plans_progress/` へ移す。
- 計画全体が完了したら `textbook/plan_done/` へ移す。
- 既存章や既存理論への言及だけでは着手扱いにせず、計画固有の作業が始まったかで判定する。


## 横断 PLAN の canonical ownership

複数分野にまたがる理論は、応用 PLAN ごとに重複して育てず、次の正本へ集約する。

| 理論・領域 | canonical PLAN / 資産 |
|---|---|
| Hamilton--Jacobi / HJB / viscosity solution / differential game / HJI / stochastic control | `DREAM_THEATER_POST_GPDE_PDE_EXTENSIONS_PLAN.md` Track C |
| SDE / Markov generator / Feynman--Kac | 完了済み Encore IV（`STO9` / `STO11`） |
| 多様体上の確率解析 | `DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md` |
| Navier--Stokes millennium problem への専門ルート | `DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md` |
| 金融の最適執行・HJB 応用 | `DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md` U3（理論は POST_GPDE を参照） |

新 PLAN を追加する際は、まず既存の canonical owner に吸収できないか確認する。応用側で同じ定義・定理・証明系列を再構築する必要がある場合だけ、新しい正本を作る。
