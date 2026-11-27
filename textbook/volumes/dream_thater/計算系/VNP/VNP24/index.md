# VNP24 P/Q：用語・全主要定理とLean対応、I.1/H.2(d,e)/J.3/N.4の監査、P vs NPへの限界

第1講から第23講まで、算術回路の下界をテンソル、距離、群、有限プログラムの評価へ順に翻訳してきた。本講ではその翻訳を逆向きにたどる。論文で証明したとされる文、形式化された命題、その命題を導くプログラムが満たす条件を一つずつ照合できるようにする。最後に、Boolean入力だけでの評価と形式多項式としての計算がなぜ異なる問題かを確かめる。

一次資料は Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), Appendices P–Q と [公開された形式化の固定版](https://github.com/anthropics/formal-math/tree/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp) である。以下のコード名はこの版を参照する。前提として [厳密下界](../VNP22/index.md#thm-vnp22-all-fields)、[近似下界](../VNP23/index.md#thm-vnp23-allfields)、[証拠台帳](../../FML/FML7/index.md#def-fml7-proof-ledger) の読み方を復習しておく。

## 1. 証明に登場した道具の見取り図

用語の意味を、どの操作で使ったかによって分類する。論文の Appendix P はこれらの用語を検索する入口であり、Appendix Q は命題をソースへ移す入口である。

| 対象 | 読み取るもの | 復習箇所 |
| --- | --- | --- |
| wire（ワイヤ） | 二つの添字に共通の情報を持たせる単位テンソル | [VNP2](../VNP2/index.md) |
| spectral point（スペクトル点）・指数 | テンソルの演算と制限に整合する非負の評価、ワイヤの評価を対数で測る量 | [VNP3](../VNP3/index.md) |
| price・price space | 評価から作る擬距離の極限と、完備化された距離空間 | [VNP3](../VNP3/index.md)、[VNP7](../VNP7/index.md) |
| gauge・hub | 評価を構成する上側の関数と、通信を集約する点。Lean の gauge は紙面の upper functional も表す | [VNP4](../VNP4/index.md)、[VNP11](../VNP11/index.md) |
| clause sum・complete network | ビット割当の重み和と、完全グラフ上の通信を表す多項式 | [VNP10](../VNP10/index.md)、[VNP11](../VNP11/index.md) |
| load・law・slot・channel | 本数を記録し、通信を別の経路へ書き換える恒等式。その入力位置と出力経路 | [VNP15](../VNP15/index.md) |
| packet・node tensor・outcome | ビットの束、各頂点での評価、則適用後の本数 | [VNP17](../VNP17/index.md) |
| run・weight・tally | 実行履歴、その係数環での重み、利用した定数名の記録 | [VNP18](../VNP18/index.md)、[VNP21](../VNP21/index.md) |
| plain instance・tape automaton | 停止と受理時の制約を満たす木プログラムの入力、両側の語を照合する有限機械 | [VNP18](../VNP18/index.md) |
| cut・accelerator | 境界を固定して計算を分割する契約と、長い評価を短時間に実行する契約 | [VNP19](../VNP19/index.md)、[VNP21](../VNP21/index.md) |

例えば packet を Lean で探すときは unit、node tensor は table、tally は bill という名前も探す。名称が違うことだけから別の数学的対象だとは判定しない。添字の型、値を計算する式、必要な上界まで比較する。

## 2. 紙面の命題と形式化の対応

次の索引は Appendix Q の Table 3 を講義順に読み直したものである。名前の接頭辞は原則 Paper. で、番号の範囲内では左から原論文の順に並べた。補助命題や紙面向けの別表示も併記する。

| 論文の番号 | 第何講 | Lean の対応 |
| --- | --- | --- |
| A.1–2 | 2–3 | [def_spectral](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tensors.lean#L71)、[def_spectral_congr](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tensors.lean#L90)、[lem_exponents](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tensors.lean#L258) |
| A.3–4 | 3 | [lem_hubs](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Prices.lean#L436)、[lem_hubs_further](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Prices.lean#L508)、[def_price](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Prices.lean#L23) |
| A.5–6 | 4 | [prop_gauge](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Gauges.lean#L392)、[thm_duality](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Gauges.lean#L560) |
| A.7 | 5 | [prop_extend](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Extension.lean#L166) |
| A.8 | 5 | [prop_random](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Prices.lean#L366) |
| B.1 | 6 | [lem_count](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/States.lean#L136) |
| B.2 | 6 | [prop_identity](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Identity.lean#L699) |
| B.3・式(B.2) | 6 | [prop_crossing](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Crossing.lean#L440)、[eq_Q](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Crossing.lean#L465) |
| C.1 | 7 | [thm_cn](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Fan.lean#L987) |
| C.2 | 7 | [lem_means](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Means.lean#L442) |
| C.3 | 7 | [prop_space](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Curvature.lean#L211) |
| C.4・O | 7 | [lem_toolkit](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L462)、[lem_toolkit_a](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L140)、[lem_toolkit_b](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L220)、[lem_toolkit_c](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L270)、[lem_toolkit_d](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L313)、[lem_toolkit_e](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L339)、[lem_toolkit_f](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L440)、[lem_toolkit_c_minimizer](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Toolkit.lean#L296) |
| D.1–2 | 8–9 | [def_cases](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Alternative.lean#L53)、[thm_alt](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Alternative.lean#L921) |
| E.1–2 | 10 | [prop_grid](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Grids.lean#L23)、[cor_clauses](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Grids.lean#L146) |
| E.3–6 | 10–11 | [lem_fkl_perm](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Flat.lean#L134)、[lem_fkl_perm_printed](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Flat.lean#L173)、[lem_balanced](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Flat.lean#L233)、[prop_flat_lower](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Flat.lean#L493)、[prop_flat_lower_printed](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Flat.lean#L588)、[thm_flat_simple](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Flat.lean#L596) |
| E.7–9 | 12 | [lem_few](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Convex.lean#L22)、[lem_convex](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Convex.lean#L243)、[prop_cube](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Convex.lean#L318) |
| E.10–11 | 12 | [prop_flat_rate](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean)、[prop_flat_rate_printed](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean)、[thm_flat_rate](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean) |
| F.1–2 | 13 | [lem_growth](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Lengths.lean#L141)、[lem_words](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Lengths.lean#L194) |
| F.3–6・式(F.1) | 13–14 | [lem_first](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Groups.lean#L232)、[eq_window](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Groups.lean#L372)、[projection_nearest](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Groups.lean#L315)、[lem_tele](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Groups.lean#L422)、[lem_angle](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Groups.lean#L649)、[thm_poincare](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Groups.lean#L1085) |
| G.1–2 | 15 | [def_law](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Laws.lean#L24)、[thm_laws](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Laws.lean#L425) |
| H.1 | 16 | [prop_tower](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tower.lean#L25)、[prop_tower_representatives](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Nc/Tower/Inst.lean#L422) |
| H.2 | 17 | [thm_tree](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tree.lean#L1628)、[thm_tree_good](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tree.lean#L363) |
| I.1 | 18 | [prop_universal](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Universal.lean#L29) |
| I.2 | 18 | [lem_runnet](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Runnet.lean) |
| J.1 | 19 | [def_cut](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean) |
| J.2 | 19 | [prop_pieces](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Pieces.lean)、[prop_pieces_identity](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Pieces.lean) |
| J.3–4 | 19–20 | [thm_onecut](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean#L101)、[thm_cut](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean)、[exists_setting](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean) |
| K.1 | 21 | [def_acc](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Scales.lean#L25) |
| K.2 | 21 | [lem_lowdeg](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/LowDeg.lean#L42) |
| K.3 | 21 | [lem_circuit](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Circuit.lean#L294)、[lem_circuit_perm](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Circuit.lean#L324) |
| K.4 | 21 | [lem_postpone](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Postpone.lean#L30) |
| K.5 | 21 | [prop_next](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Next.lean#L178) |
| K.6 | 21 | [thm_noacc](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/NoAcc.lean) |
| K.7 | 21 | [thm_contracting](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Scales.lean#L158)、[scales_setting](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Scales.lean#L126) |
| L.1–3 | 12・22 | [thm_main](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean)、[thm_main_form](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean)、[thm_simple](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean)、[cor_classes](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Rate.lean) |
| M.1 | 22 | [lem_transfer](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Transfer.lean#L21) |
| M.2 | 22 | [prop_hc_grid](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/HcGrid.lean#L18)、[cor_clauses_hc](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/HcGrid.lean#L76) |
| M.3–4 | 22 | [thm_allfields](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Fields.lean)、[cor_allclasses](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Fields.lean) |
| N.1 | 23 | [def_approx](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Approximate.lean) |
| N.2 | 23 | [lem_transfer_approx](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Transfer.lean#L41) |
| N.3 | 23 | [lem_few_approx](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Approximate.lean#L60) |
| N.4 | 23 | [prop_approx_acc](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxScales.lean#L403)、[prop_approx_acc_setting](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxScales.lean) |
| N.5 | 23 | [thm_approx](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Approximate.lean#L268) |
| N.6 | 23 | 行列式による近似への帰結。付録Qはこの注記を形式化の対象外としている。 |

A.3 では複数の点への写像を扱う強い形式を採用している。C.4 の補助命題 a から f は一つの長い証明を分割したもので、O の紙面証明を照合する位置でもある。E.3、E.5、E.10 の printed 付きの宣言は紙面の変数の付け方に合わせた表示を与える。H.2 の各条件は一つの構造体の複数の欄として表される。名前が一対一に対応しないことを想定して表を使う。

## 3. 何が最終的に証明される型なのか

[Statement.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Statement.lean) は Mathlib のみを読み込んで述語を定める。[Solution.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Solution.lean) は Paper の結果からそれらの型の定理を組み立てる。

| Solution の宣言 | Statement の型・内容 | 論文と復習 |
| --- | --- | --- |
| mainTheorem | MainTheorem：全標数の厳密下界 | M.3、[VNP22](../VNP22/index.md#thm-vnp22-all-fields) |
| separation | Separation：各体での真の包含 | M.4、[VNP22](../VNP22/index.md#cor-vnp22-separation) |
| mainTheoremApprox | MainTheoremApprox：全標数の近似下界 | N.5、[VNP23](../VNP23/index.md#thm-vnp23-allfields) |
| separationClosure | SeparationClosure：近似クラスへの非包含 | N.5、[VNP23](../VNP23/index.md#cor-vnp23-closure) |
| permanent_over_real | 実数体上の厳密パーマネント下界 | L.1、[VNP1](../VNP1/index.md) |

型が表す計算量を確認する。Computes は自然数で番号付けした多項式の列の先頭 $s$ 個を使い、各項が変数、定数、以前の二項の和または積のいずれかであることを要求する。最後の項に限らず、その先頭 $s$ 個の中に目標多項式が一つあればよい。[全ゲート数](../VNP1/index.md#def-vnp1-total-gates) を数えるモデルと一致する。

パーマネントの添字について、紙面の項 $\prod_i X_{i,\sigma(i)}$ と Lean の項 $\prod_i X_{\sigma(i),i}$ を比較する。後者で $j=\sigma(i)$ とすれば $i=\sigma^{-1}(j)$ だから

$$
\prod_i X_{\sigma(i),i}=\prod_j X_{j,\sigma^{-1}(j)}.
$$

逆置換をとる操作は全置換集合の全単射である。従って全項の和は等しい。巡回多項式では Lean の定義も行番号から列番号を選んでいる。

標数については $p=0$ または $p$ が素数である場合だけが実在の体に対応する。Solution.mainTheorem はそれ以外の $p$ に対して $m_0=0$ と置き、CharP.char_is_prime_or_zero で仮定の矛盾を示す。これは [空の定義域での全称命題](../../FML/FML5/index.md#prop-fml5-empty) の具体例で、合成数標数の体で下界を別途証明したことを意味しない。

近似について Approximates は任意の単項式の指数ベクトル $d$ と整数 $i\le0$ を検査する。出力を $q$、目標を $f$ とすると、条件は

$$
[\varepsilon^i][X^d]q=
\begin{cases}
[X^d]f & (i=0),\\
0 & (i<0).
\end{cases}
$$

$q$ は変数 $X$ に関する有限個の単項式しか持たないので、全係数から $f$ を引いて $\varepsilon$ で割れば係数が非負次数だけの多項式が得られる。逆に $q=f+\varepsilon G$ ならこの係数条件を満たす。従って [近似算術回路](../VNP23/index.md#def-vnp23-approx) の条件と一致する。

クラスの比較では、Family の各添字 $n$ に対して変数集合は有限、VP は変数数・全次数・回路ゲート数の三つを同じ $n^a+a$ で抑える。VNP は有限個の補助ビットを代入した VP の多項式の和で表す。その VP の変数数上界から補助ビット数も多項式で抑えられる。Solution の toNc と ofNc は変数集合、有限性、各多項式を対応する欄へ移す。従って単に別名の集合の包含を証明しているのではなく、同じデータを持つ族へ結論を移している。

## 4. プログラムの正しさをたどる四つのケース

紙面で命令列が省略されたときは、実行時間だけを計算しても正しさは確定しない。入力の条件、計算値の一致、出力に付く構造、サイズと時間の評価を分けて読む。

### 4.1 H.2(d,e)：有限整数上のプログラムと保持量

[VNP17の有限整数上の直線型プログラム](../VNP17/index.md#def-vnp17-slp) は、候補となるパケットの名前と本数、各則の適用結果を固定長のデータとして扱った。

[tree_computed](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tree.lean#L1139) は、塔の段数、候補則の大きさ、与えられた頂点数などを共通の整数 $V\ge3$ で抑え、さらに $D>0$ を仮定する。入力は二つの頂点番号から本数を返す表と、候補操作の結果番号を返す表である。証明はまず cards_le と card_Tg_le により有限集合の大きさを押さえ、$Y=20V^9$ と置く。入力の値域は Fin $(Y^4)$ であり、出力集合には次を含む。

- 親が指定された頂点かを判定する指示関数。
- パケットが残っているか、または指定の操作で消費されるかを判定する指示関数。
- 操作の本数、各頂点の負荷、各操作の良否の指示関数。

tree_slp に実際の入力表を渡し、0と1を作る二命令を追加してこれらの関数を取り出す。steps の上界は $3Y^{16}$。例えば本数が $N$ 以下で $N\le V$ なら、その値は $Y^4$ 未満なので Fin への埋込みができる。$Y^4=20^4V^{36}$ であり、候補数の上界 $Y$ と命令数の上界 $3Y^{16}=3\cdot20^{16}V^{144}$ は同じ量ではない。

保持量は [thm_tree_copies](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tree.lean#L1056) を見る。頂点 $p$ が最終的に保持した名前だけを数えるのではなく、一度でも保持した名前、則適用で生成されるスロット分、使用されない名前の項も加える。ここでは初期頂点ごとの本数上限、全操作が good であること、スロット数の上界が追加仮定である。held_node_le が保持量を抑え、onN_le_up が頂点と子の負荷の和で抑える。係数を $C_*$、元の頂点なら1である指示変数を $b_p$、使われないパケット数を $d_p$ と略記すると、上界は

$$
8C_*\left(u_p+\sum_{q\text{：子}}u_q\right)
 + b_p(1+8m)N+2d_p.
$$

例えば $C_*=3$、$u_p=4$、子の負荷が2と5、$b_p=1$、$m=2$、$N=6$、$d_p=1$ のとき第1項は $24(4+2+5)=264$、第2項は $17\cdot6=102$、第3項は2で、上界は368である。これは定理の適用条件を満たす実例を構成したのではなく、各負荷項の役割を確認する代入例である。最終的な [thm_tree](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Tree.lean#L1628) は塔の構成と良い結果の評価をまとめる。紙面と異なり、中継でも両端に名前が残るモデルなので、この追加項を落としてはいけない。

### 4.2 I.1：一つの受理履歴を一度だけ数える

[万能両側語照合オートマトン](../VNP18/index.md#thm-vnp18-universal) の値が元の木プログラムと一致するためには、正しい履歴を漏らさず、誤った履歴を除き、同じ履歴を重複して数えないことが必要だった。

[prop_universal_machine](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/UniversalSteps.lean#L83) は有限集合 $R$ に受理する履歴をちょうど集め、重み和が元の値と等しく、履歴長が $3|z|+C_c\tau+10$ 以下であることを述べる。次に [prop_universal_automaton](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/UniversalSteps.lean#L25) では、exists_MX で各履歴 $r$ に照合候補 $f(r)$ を選び、nst を各ステップに適用する復号 $g$ が

$$
g(f(r))=r
$$

を満たすことを得る。$f(r)=f(r')$ に両辺から $g$ を作用させると $r=r'$ なので $f$ は単射である。逆向きには mt_X で照合に成功した候補を履歴に戻し、MX.unique によって同じ履歴を表す候補が一つしかないことを用いる。これで許された候補集合が $f(R)$ と一致する。Finset.sum_image を使えるのは単射が成立しているからである。各候補の重みが元の履歴の重みに等しいため、有限和が保存される。

例えば重み2と3の二つの履歴の候補がそれぞれ一つなら、和は5である。後者に二つの符号を認めると $2+3+3=8$ となる。復号可能性だけでは重複を排除できず、一意性を別に証明する必要がある。

時間の評価は [prop_universal_series](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/UniversalSteps.lean#L94) で履歴長とアドレス幅を共通上界へ移し、[prop_universal](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Universal.lean#L29) で有限行列の走行値へ移す。$n=|z|+\tau\ge1$ とすると $n+2\le3n$、ソースの $\lg n=1+\lfloor\log_2 n\rfloor$ に対して $\lg(n+2)\le\lg n+2\le3\lg n$ である。よって

$$
(n+2)\lg(n+2)^2\le27n\lg(n)^2.
$$

有限和の値が等しいことと、この時間上界があることを組み合わせて最終的な契約を得る。長さだけを照合しても値の保存は導けない。

### 4.3 J.3：境界データを共有して分割する

[一回の計算分割](../VNP19/index.md#thm-vnp19-onecut) では、分割片の評価を返すプログラムと、何を各分割片へ渡すかを計算するプログラムが必要になる。

[thm_onecut_evaluator](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean#L72) は定数名の生成可能性を用いて Nc.Grp.exists_group から GROUP と GroupOK を得る。入力には境界の状態やパケットの内容を含める。分割側の [thm_onecut_program](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Nc/Dl/Inst.lean#L111) は dealProg を具体的な木プログラムとして返す。hval が要求する恒等式は、状態、行データ、本数、適用結果、共有境界の値を選ぶ順で有限和をとり、その内部で片ごとの値を積にする形である。初期・終端状態、行データの妥当性、本数表の妥当性、good の検査に失敗した項は0になる。共有境界は各片が独立に選ぶ値ではない。

例えば共有する一つのビット $b$ に対し片の値を $u_b,v_b$ とする。元の値は $u_0v_0+u_1v_1$ である。$(u_0,u_1)=(1,2)$、$(v_0,v_1)=(3,4)$ なら正しい値は11である。一方 $(u_0+u_1)(v_0+v_1)=21$ は境界が不一致な二項も足している。deal_cut と deal_does が必要なのは、符号化した選択とその有限和の項の対応を保証するためである。

[thm_onecut](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean#L101) は万能機械、分割片の構造、GROUP、dealProg を順に構成する。自然数の尺度 $v$、入力上界 $s$、時間上界 $\tau$、分割数パラメータ $k$ は $s\le\tau$、$2\le k\le v^{64}$、さらに $\tau$ の上下に関する仮定を満たす。例えば $T=\lfloor t_U/K\rfloor+1$ と置く箇所で $K>0$ が必要になる。除法の恒等式から $t_U=Kq+r$、$0\le r<K$ とすると

$$
K T=Kq+K=t_U+(K-r)>t_U.
$$

これにより機械の時間予算を確保する。CutNums に境界、片のサイズ、片の個数、符号化の上界を渡し、$m=\lg(v)^{C_1}$、$\Lambda=m^{10}$ を選んで、CutD の四つの数を次にそろえる。

$$
\left\lfloor\frac{\tau\Lambda}{k}\right\rfloor,\quad
\left(\left\lfloor\frac{s}{k}\right\rfloor+
 \left\lfloor\frac{\tau}{v^{256}}\right\rfloor\right)\Lambda
$$

$$
k\Lambda,\qquad
\left(s+\left\lfloor\frac{\tau k}{v^{256}}\right\rfloor\right)\Lambda.
$$

順に片の時間、入力サイズ、片数、分割時間である。床を括弧の外へ勝手に移すと整数の契約が変わる。

### 4.4 N.4：近似計算から厳密な値を回収する

[VNP23の定数項抽出](../VNP23/index.md#lem-vnp23-extraction) は Laurent 多項式の指数を有限の剰余カウンタに入れる。指数の絶対値上界より法が大きければ、非零の指数が剰余0として紛れ込むことはない。

[prop_approx_acc_exact](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxRound.lean#L473) では近似加速器の契約 IsAccA、時間 $t<2^J$、冪の疎性 Thin、指数の幅 Span を仮定する。名前展開後の木の頂点数を $N_K$、元の幅を $M$ と書くと、ソースの hW は

$$
N_K\,2^J\,2^B M<2^W
$$

を要求する。hT と hm は係数候補数が $2^m$ 以下になることを保証する別の仮定である。hW は「剰余0から正しい定数項を読めるか」、hm は「候補を列挙できるか」を制御しており、役割が違う。

証明では K.expand で名前を展開し、coefK で係数の木を構成し、xF で抽出用プログラムを作る。extF により元の評価器と接続する。lem_postpone で名前の使用回数と重みを分離した後、sum_xL が候補の有限和を剰余群上の代数での和に移す。coeff_wrap_zero は幅と hW から剰余群での0次係数が本来の0次係数に一致すると示す。これに近似条件の $i=0$ を適用する。返る契約は IsAccT であり、単に Laurent 多項式を別形式で書いたのではない。

例えば法を8とし $a_{-3}=2,a_0=7,a_3=5$、他の係数を0とする。剰余番号は5、0、3なので0次の値は7となる。もし指数8の係数1を許すと剰余0の値が8になってしまう。厳密不等号を要求する理由である。

最後に [prop_approx_acc](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxScales.lean#L403) は厳密加速器の不存在 thm_noacc を前提として、近似加速器から最初の不変条件を作り、[prop_approx_acc_all_scales](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/ApproxScales.lean#L134) を用いて任意の閾値以上の尺度へ移す。後者の帰納法では次の尺度が $u^5$ であり、$u\ge4$ なら $u^5\ge4u\ge u+1$。したがって閾値 $n$ に達した証人をもう一度進めると $n+1$ に達する。得られた尺度で抽出の全ての幅・時間条件を満たすことを prop_approx_acc_hasAcc が結び付け、厳密加速器の不存在と矛盾させる。係数環が非自明で有限生成係数環 $A$ からの代数構造を持つこと、$h\ge17$、CutHyp が必要である。収縮仮説は prop_approx_acc_setting でこれらの条件を供給する。

この四つの読み方では、紙面の略述と形式化された契約との対応を追った。各補助プログラムの全命令を展開するには、固定版の依存する宣言をさらに開き、Lean で実行して照合する。

## 5. 二つの証明検査器が確認するもの

[FML5の許容公理集合](../../FML/FML5/index.md#def-fml5-policy) と [FML6の定理ステートメント照合](../../FML/FML6/index.md#def-fml6-statement-matching) をこの成果に適用する。

- [Challenge.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Challenge.lean) は Statement だけを読み込み、比較対象の五つの型を列挙する。ここでの sorry は問題側の型を登録するもので、Solution の証明が sorry に依存してよいという意味ではない。
- [comparator.json](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/comparator.json) は五つの対象名、許容公理 propext、Quot.sound、Classical.choice と、nanoda を有効にする設定を指定する。
- [PrintAxioms.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/scripts/PrintAxioms.lean) は Solution の五つの定理に対して依存公理を表示する。これは定理の仮定そのものを検査する手続きとは異なる。

著者の Appendix Q.1 と [README](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/README.md) は Lean 4.33.1、指定 Mathlib 版での検査、Comparator と nanoda による受入を報告している。これらは著者の報告であり、独立の数学者による審査の記録とは区別する。再現時には固定版を取得し、そのディレクトリで次を実行する。

```bash
lake exe cache get
lake build
lake env lean scripts/PrintAxioms.lean
bash ../.github/scripts/comparator-check.sh
```

[FML6の複数カーネルによる受入条件](../../FML/FML6/index.md#def-fml6-multikernel) を満たすかは、対象の型、実行ログ、公理一覧、各検査器の結果をそろえて判定する。設定ファイルの enable_nanoda が true である事実だけから実行成功を推論することはできない。自然言語の主張と形式的な型の一致も独立に判断する。

## 6. P対NPにそのまま移せない理由

算術回路は形式多項式を計算する。一方、Boolean回路が計算するのは入力が0か1のときの関数である。まず Boolean ゲートを算術式で書けることを確認する。その後、逆向きに「同じ形式多項式が得られた」といえるかを考える。

<a id="prop-vnp24-boolean-evaluation"></a>

<!-- formal-statement-start -->
> **命題（Booleanゲート置換の評価保存）**
>
> 体 $F$ 上で、二入力 AND、OR と一入力 NOT、0と1の定数、入力ビットから構成された有限の Boolean 回路を考える。AND を積、OR を $a+b-ab$、NOT を $1-a$ に置換した算術回路は、任意の Boolean 入力に対して同じ値を返す。置換後の多項式が特定の形式多項式に一致することまでは、この命題から従わない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

AND の入力が $(0,0),(0,1),(1,0),(1,1)$ のとき積は順に0、0、0、1である。OR の式 $a+b-ab$ は順に $0,1,1,1+1-1=1$ となる。NOT は $a=0$ なら1、$a=1$ なら0である。これらの等式は標数2でも成立する。

回路のゲートを入力から出力へ向かう順に並べる。入力と定数については値が一致する。あるゲート以前で値がすべて一致し、0または1だと仮定する。次のゲートの入力にもこの仮定が適用できるので、上の三つの検査から、そのゲートでも値が一致し0または1になる。有限回の帰納法で出力まで一致する。

各置換は定数 $-1$ を用意すれば加算と乗算の定数個のゲートで実装できる。しかし一致を確かめたのは Boolean 入力だけである。例えば $X^2-X$ は $F$ の多項式環の非零多項式だが $0,1$ での評価はともに0である。したがって Boolean 入力上の一致は係数の一致を保証しない。
<!-- proof-end -->

実際、同じビットを二乗してもビットの値は変わらない。算術回路では $X,X^2,X^4,\ldots,X^{2^t}$ と共有しながら $t$ 回掛け算をするだけで次数が $2^t$ になる。Boolean入力上では常に $X$ と同じであるが、多項式の次数は大きく異なる。

ここから下界をどのクラスへ適用できるかを確認する。原論文第1節で説明されるように、適切な体での VP = VNP から非一様 Boolean クラス P/poly = NP/poly への既知の含意は、逆向きの含意ではない。論文の結論 VP ≠ VNP はその前件の否定であり、後件の否定を導く推論はできない。また P、NP は一様な決定問題のクラスであり、P/poly、NP/poly は非一様な回路のクラスである。これらも区別する。

なお [全標数の下界](../VNP22/index.md#thm-vnp22-all-fields) では、標数2でパーマネントが行列式に一致するため、この族に同じ下界を適用しない。一方ハミルトン閉路多項式には全標数で下界が主張される。近似クラスへの非包含は [第23講の系](../VNP23/index.md#cor-vnp23-closure) であり、Booleanクラスへの結論を追加するものではない。

## 7. 演習

<a id="exercise-vnp24-a1"></a>
### A1. 置換の添字

- Level: A

3点の巡回置換を $\sigma(1)=2,\sigma(2)=3,\sigma(3)=1$ とする。Lean のパーマネントのこの項と、紙面で同じ積を生む置換を求めよ。

<!-- solution-start -->
**詳細解答**：Lean の項は $X_{21}X_{32}X_{13}$ である。逆置換は $\sigma^{-1}(1)=3,\sigma^{-1}(2)=1,\sigma^{-1}(3)=2$ なので、紙面では $X_{13}X_{21}X_{32}$ となる。積の可換性から同じ項である。
<!-- solution-end -->

<a id="exercise-vnp24-a2"></a>
### A2. 公理と仮定

- Level: A

ある定理の依存公理一覧が許容集合に含まれていたが、型に標数が2でないという仮定があった。この定理を標数2に適用できるか。

<!-- solution-start -->
**詳細解答**：[数学的主張の条件と適用範囲](../../FML/FML5/index.md#def-fml5-claim) に従い、公理一覧と型の仮定を区別する。公理の検査に合格しても、標数2では $p\ne2$ が成立しない。従ってその定理を適用するための引数を構成できず、適用できない。
<!-- solution-end -->

<a id="exercise-vnp24-a3"></a>
### A3. 照合候補の一意性

- Level: A

二つの受理履歴の重みは4と5である。候補が最初の履歴に一つ、後の履歴に三つある。候補をそのまま足した値と正しい履歴和を求め、欠けた条件を説明せよ。

<!-- solution-start -->
**詳細解答**：候補の和は $4+5+5+5=19$、履歴和は $4+5=9$ である。全候補を履歴へ復号できたとしても、三つの候補が一つの履歴へ移る。I.1で使った MX.unique のような、同じ履歴を表す候補の一意性が欠けている。
<!-- solution-end -->

<a id="exercise-vnp24-a4"></a>
### A4. 二つの検査器

- Level: A

設定ファイルに許容公理集合と二つ目のカーネルを使う設定が書かれている。設定だけから、五つの定理を両方が受理したといえるか。

<!-- solution-start -->
**詳細解答**：いえない。設定は実行時に求める条件を記述したもので、実際にその条件を満たした証明を受理した記録ではない。[定理ステートメント照合](../../FML/FML6/index.md#def-fml6-statement-matching)、公理一覧、二つの検査器の実行結果を確認する必要がある。
<!-- solution-end -->

<a id="exercise-vnp24-b1"></a>
### B1. プログラムの出力域と保持量

- Level: B

H.2 の読み方に従い $V=3$ とする。$Y=20V^9$ を計算し、$3Y^{16}$ を $V$ の冪の形で表せ。また保持量の式で $C_*=2,u_p=3$、子の負荷が1と4、$b_p=0,d_p=5$ とする。上界を計算せよ。

<!-- solution-start -->
**詳細解答**：$3^9=19683$ だから $Y=393660$。命令数上界は $3(20V^9)^{16}=3\cdot20^{16}V^{144}$ である。保持量では子の合計は5であり、第1項は $8\cdot2(3+5)=128$。元の頂点に関する第2項は $b_p=0$ なので0、第3項は $2\cdot5=10$。合計は138となる。これらは候補数と命令数と保持量という別々の上界である。
<!-- solution-end -->

<a id="exercise-vnp24-b2"></a>
### B2. 境界を固定する有限和

- Level: B

三つの片が一つのビットを共有し、それぞれの値が $(2,3),(1,4),(5,2)$ である。境界を固定した和と、誤って片ごとに境界を別々に選んだ場合の和を求めよ。

<!-- solution-start -->
**詳細解答**：共有境界を0とすると積は $2\cdot1\cdot5=10$、1とすると $3\cdot4\cdot2=24$ なので、[境界固定による積分解](../VNP19/index.md#thm-vnp19-factor) による和は34。別々に選ぶと $(2+3)(1+4)(5+2)=5\cdot5\cdot7=175$。後者は8通りのうち一致しない6通りを含むので、元のネットワーク値を保存しない。
<!-- solution-end -->

<a id="exercise-vnp24-b3"></a>
### B3. 整数除法の位置

- Level: B

$K=7,t_U=24$ とし $T=\lfloor t_U/K\rfloor+1$ を計算せよ。また $\tau=11,\Lambda=3,k=4$ とするとき、$\lfloor\tau\Lambda/k\rfloor$ と $\Lambda\lfloor\tau/k\rfloor$ を比較せよ。

<!-- solution-start -->
**詳細解答**：$24=7\cdot3+3$ だから $T=4$、$KT=28>24$ となる。後半は $\lfloor33/4\rfloor=8$ に対して $3\lfloor11/4\rfloor=6$。乗じる前に切り捨てると剰余部分を先に失うので同じ値ではない。J.3 の自然数上界を引用するときは除算の位置を保つ。
<!-- solution-end -->

<a id="exercise-vnp24-b4"></a>
### B4. 指数カウンタの条件

- Level: B

N.4 の hW について $N_K=5,J=3,B=2,M=2$ とする。不等式を満たす最小の非負整数 $W$ を求めよ。さらに幅の上界を320としたとき、法256を使うとどのような誤認が起こり得るか。

<!-- solution-start -->
**詳細解答**：幅上界は $5\cdot8\cdot4\cdot2=320$。$2^8=256\le320<512=2^9$ だから最小の $W$ は9。法256では指数256も剰余0となるので、例えば $7+\varepsilon^{256}$ の0次係数7に追加の係数1が混入する。法512なら絶対値が320以下の非零指数が512の倍数になることはない。[定数項抽出の正しさ](../VNP23/index.md#lem-vnp23-extraction) の幅条件を満たす。
<!-- solution-end -->

<a id="exercise-vnp24-c1"></a>
### C1. Boolean評価と形式多項式

- Level: C

$F$ を任意の体とする。二つの入力 $x,y$ の排他的論理和（ちょうど一方が1なら1）を $(x\lor y)\land\lnot(x\land y)$ と表す。第6節の置換から形式多項式を求め、$x+y-2xy$ と Boolean 入力上で一致するが形式多項式としては一致しないことを示せ。

<!-- solution-start -->
**詳細解答**：[Booleanゲート置換の評価保存](#prop-vnp24-boolean-evaluation) により、置換後の式は

$$
P=(x+y-xy)(1-xy).
$$

分配法則を適用すると

$$
P=x+y-xy-x^2y-xy^2+x^2y^2.
$$

$Q=x+y-2xy$ とすると差は

$$
P-Q=xy-x^2y-xy^2+x^2y^2=xy(1-x)(1-y).
$$

$x,y$ が0または1なら少なくとも一つの因子が0になるため、差は0である。形式多項式の差では $x^2y^2$ の係数は1で、任意の体で非零である。従って標数2も含め $P\ne Q$ である。Boolean回路の小ささから特定の形式多項式の小ささを直接導けない具体例となる。
<!-- solution-end -->

<a id="exercise-vnp24-c2"></a>
### C2. 主張と証明の接続を検査する

- Level: C

仮にある版で MainTheorem と MainTheoremApprox の型、五つの許容公理検査の実行記録、両カーネルの受入記録を確認できたとする。しかし別の読者が「近似の定義は負次数を検査せず定数項だけを検査している」と主張した。また「VPとVNPが分離したので P と NP も分離した」と主張した。どの箇所を調べ、どのように判定するか。

<!-- solution-start -->
**詳細解答**：まず Statement.Approximates を開く。任意の $i\le0$ について、$i=0$ の場合は目標係数、$i<0$ なら0を要求する。例えば出力 $\varepsilon^{-1}X+X$ は $i=0$ の条件を満たすが、単項式 $X$ の $i=-1$ の係数が1なので失敗する。従って「定数項だけ」という読み方はこの型と一致しない。

次に Separation の結論は各体の多項式族のクラス VP と VNP の真の包含であることを確認する。第6節の命題は Boolean 入力上での評価の一致しか与えない。形式多項式を計算する回路への下界を Boolean 回路へ移すには、別の帰着が必要である。従って P と NP の分離をこの証拠からは判定できない。

最後に [証拠台帳](../../FML/FML7/index.md#def-fml7-proof-ledger) の型照合、公理、各検査器、自然言語との対応の欄に結果を分けて記録する。仮定された実行記録は形式的な主張への根拠になるが、自然言語の誤読や別の問題への推論を正当化するものではない。
<!-- solution-end -->

## 8. 全24講のまとめ

厳密下界と近似下界は、平坦側のテンソル評価と収縮側の計算分割という異なる機構を組み合わせた主張である。形式化を読むときは、定理名だけでなく、型に現れる全ての仮定、有限和の一意性、数の上界、係数抽出の条件を確認する。本講の対応表と四つのケースを出発点として、さらに各宣言の依存を調べられる。P対NPへの含意はこの証明の範囲外である。
