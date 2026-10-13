# DREAM THEATER 解析力学・対称性・可積分系・三体問題 統合ルート

分冊再設計: 2026-10-11  
状態: planned（順序・責務・依存だけを管理）

## 正本PLANの履修順

1. 古典力学 I（MECH1〜8、既存完了章）
2. 解析力学 I（AMECH1〜8、既存完了章）
3. [シンプレクティック幾何学 I（SYM1〜8）](../plan_done/DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)：閉じた非退化2形式、余接束、Darboux、Lagrange部分多様体、Moser。
4. [幾何学的力学 I（GMECH1〜8）](../plan_done/DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)：Hamilton作用、運動量写像、Noether、簡約、Lie–Poisson。
5. [可積分系と摂動論・KAM（INT1〜8）](../plan_done/DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md)。
6. [天体力学・三体問題・Hamiltonian chaos（CELE1〜8）](../plan_done/DREAM_THEATER_CELESTIAL_MECHANICS_THREE_BODY_CHAOS_PLAN.md)。
7. [変分的周期軌道・8の字・舞踏解と実数値シミュレーション（CELEV1〜8）](DREAM_THEATER_N_BODY_VARIATIONAL_PERIODIC_ORBITS_SIMULATION_PLAN.md)（未着手）。

並行して[変分問題（VAR1〜12）](DREAM_THEATER_VARIATIONAL_PROBLEMS_GEOMETRIC_PLAN.md)を解析・ODE・微分幾何から進められる。CELEVの存在論には**VAR9〜10の直接法・Tonelli**、CELEV7の第二変分にはVAR12を必要箇所だけ前提にする（いずれもPLAN上は未実装）。

## 直接依存と所管

~~~text
MECH + ODE + AMECH1〜8 + GEO2/7 → SYM1〜8
LIE + AMECH4/6 + SYMの必要講 → GMECH1〜8
AMECH5〜8 + SYM1〜4 + ODE + Fourier → INT1〜8
MECH二体 + INT1〜5 + DYN/ODE → CELE1〜8
VAR9〜10 + AMECH3 + CELE2〜3 → CELEV1〜6
VAR12 + CELEV5〜6 + ODEの線形化 → CELEV7〜8
CELEVシミュレーションはNewton積分と離散変分最適化の独立2モード（静的SVGアニメ禁止）
GMECHの簡約・対称性とINT6〜8のKAMはCELE後半で必要箇所のみ追加
~~~

SYMからGMECHを経てINTへ進むのは**推奨読順**。INT1の証明にGMECH8全講を強制せず、chapter.yamlの直接依存で定理ごとに管理する。Darboux/Moser/Lagrange部分多様体はSYM、運動量写像・簡約はGMECH、Liouville–Arnold/KAMはINT、三体モデルはCELEが唯一の正本。AMECH9〜16という旧案は実装せず、その[旧PLANのURL](DREAM_THEATER_ANALYTICAL_MECHANICS_II_GEOMETRIC_SYMMETRY_PLAN.md)は案内ファイルとして残す。
