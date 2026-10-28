# DREAM THEATER カラビ・ヤウ幾何・ミラー対称性 依存ルート

分冊: 2026-10-11  
状態: planned（ルート台帳のみ、未実装）

## 科目別PLAN

- [代数幾何I〜III](DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md)
- [複素多様体I・II](DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md)
- [Kähler幾何](DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)
- [Kähler–Hodge](DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)
- [複素代数幾何](../plans_progress/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md)
- [Calabi–Yau幾何](DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)
- [ヤウの定理](DREAM_THEATER_YAU_CALABI_CONJECTURE_PLAN.md)
- [複素変形理論](DREAM_THEATER_COMPLEX_DEFORMATION_MODULI_PLAN.md)
- [ミラー対称性I・II](DREAM_THEATER_MIRROR_SYMMETRY_I_II_PLAN.md)
- [Gromov–Witten](DREAM_THEATER_GROMOV_WITTEN_GEOMETRY_PLAN.md)
- [ホモロジカルミラー](DREAM_THEATER_HOMOLOGICAL_MIRROR_SYMMETRY_PLAN.md)
- [SYZ](DREAM_THEATER_SYZ_SPECIAL_LAGRANGIAN_PLAN.md)

## 直接依存DAG

~~~text
RNG/MOD/FLD → AG1→AG2→AG3 ───────────→ CAG1 → CYG1 ─┬→ YAU1
CA8/GEO → CM1→CM2 ─→ KAH1→HOD1 ────────┘              └→ DEF1 → MIR1
GEO/GPDE → GA2/3 ────────────────────────────────→ YAU1
SYM＋AG3＋CM1＋GPDE → GW1 → MIR2 ← MIR1
MIR2＋Floer/圏論補講 → HM1
CYG1＋SYM6＋YAU1必要結果 → SYZ1
~~~

AG1〜III、CM1〜II、MIR1〜IIはそれぞれ連続しているので単一PLANに保持。他の中心問いは分冊した。YAU1はMIR1の直列必須ではなく、GW1はMIR1の必須ではない。シンプレクティック幾何の基本定理は新SYMの正本を参照し、独立SYM1を無条件再設置しないとした旧判断を、本分冊設計により正式な独立SYMへ更新する。

---

## 元PLANの共通設計・文献・依存監査資料（各科目のシラバスは分冊先が正本）

## 8. DREAM THEATER 本文・CI・公開の規約

- 章ごとに学習者に必要な導入、定義、命題・証明・例、Level A/B/C などの演習・全問詳細解答を用意する。2〜4手の飛躍は残さず、初出定義・図式・公式の仮定を明示。
- 各章の `chapter.yaml.prerequisites` を **直接必要な既存章と完成済み新章だけ**で固定し、`knowledge.yaml` の概念 owner と矛盾させない。科目名だけの曖昧な全依存や循環は不可。
- AG1 の Zariski、AG2 の $\mathcal O(d)$、CM1 の複素構造、CM2 の $\bar\partial$、KAH1 のケーラー形式はそれぞれ初出 canonical owner を一つに固定。
- 結果先行が必要な大定理（Newlander–Nirenberg、GAGA、BTT、仮想基本類など）は **主張・仮定・結果先行の理由・証明の所属・証明完遂の判定**を明記し、未証明を証明済み扱いしない。
- 参照する前提講義は実在する公開URLを検査し、公開済み章のみ reader-facing index に載せる。内部 PLAN と記事URLを混同しない。
- 既存の依存監査・用語監査・数式・リンク・公開ページ検証を変更時に通す。各新章の公開前には `npm run validate:dream-theater-work`、`npm run validate:dream-theater-prerequisites`、`npm run validate:pages` 等の現行コマンドの適用を確認する。
- 教材の具体例は **アフィン三次曲線 → 射影楕円曲線 → 複素トーラス / K3 → quintic threefold とそのミラー**を縦断させる。
- 対象範囲の静的可視化は複素次元／実次元と断面表示を区別する。模式図を実際の全体形状だと表現しない。

## 9. PLAN 全体の完成判定

- AG1〜AG3 の基礎を通って CAG1 に到達でき、飛ばした代数幾何用語・定理がない。
- 複素多様体とケーラー幾何の前提が CA8 や GEO の内容を超える箇所で明示的に埋まっている。
- GA・AMECH と新系列の canonical owner が一意で、同じ内容を科目名だけ変えて二重実装していない。
- カラビ予想の方程式への帰着、事前評価と連続性の方法を追い、解の存在と一意性に到達できる。
- quintic とミラーの周期・Picard–Fuchs・ミラー写像・曲線計数の一連の計算を検算可能。
- 定理単位の依存 DAG、公開動線、本文リンク、演習の接続、必要な証明後送先に未解決の重大問題がない。

本 PLAN 自体のマージは **講義実装完了を意味しない**。各科目の完成は上記ゲートを通して個別に判定する。
