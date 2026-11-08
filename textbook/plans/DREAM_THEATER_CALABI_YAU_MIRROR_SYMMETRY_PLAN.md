# DREAM THEATER カラビ・ヤウ幾何・ミラー対称性 依存ルート

分冊: 2026-10-11  
状態: planned（ルート台帳のみ、未実装。講義数・着手順を2026-11-08に確定）


## 設計確定（2026-11-08）：講義数と到達可能な系列

本書は一つの授業ではなく、代数幾何・複素幾何・解析・曲線計数・圏論を結ぶ**ルート台帳**である。各科目の内容正本は下記の分冊PLAN、既実装の章数・完成statusの正本は各系列manifest。講義数の「確定」は、各科目の**実装設計として章の中心問いを割り当てたこと**を指し、15週や90分等の時間制約で主要証明を削る意味ではない。新たな証明欠損が判明した場合は理由を残して分冊と本表を同期改訂する。

| 系列 | 設計／実装章数 | 現状（2026-11-08、mainのmanifest・PLAN照合） | 次の依存 |
| --- | ---: | --- | --- |
| AG1〜AG3：代数幾何 I〜III | 12+12+14 = **38** | completed（AG.yaml、38章） | CAG1 |
| CM1・CM2：複素多様体 I・II | 10+11 = **21** | completed（CM.yaml、21章） | KAH1・HOD1 |
| KAH1：Kähler幾何 | **16** | completed（KAH1.yaml） | HOD1・YAU1 |
| HOD1：Kähler–Hodge | **16** | completed（HOD1.yaml） | DEF1・MIR1・YAU1 |
| CAG1：複素代数幾何 | **14** | completed（CAG.yaml） | CYG1・MIR1 |
| CYG1：Calabi–Yau幾何 | **14** | completed（CYG1.yaml） | YAU1・DEF1・SYZ1 |
| YAU1：Calabi予想・Yauの定理 | **14** | planned、分冊の14章を確定 | SYZ1 |
| DEF1：複素構造の変形・モジュライ | **14** | in_progress、DEF1-01完成・残13章 | MIR1 |
| GW1：擬正則曲線・Gromov–Witten | **21** | planned、分冊の独立21論証単位を章に確定 | MIR2 |
| MIR1：周期・Picard–Fuchs | **12** | planned、分冊の12章を確定 | MIR2 |
| MIR2：GWとミラー曲線計数 | **12** | planned、分冊の12章を確定 | HM1 |
| HM1：ホモロジカル・ミラー | **18** | planned、分冊の18章を確定（Floer/圏論の前提整備は別） | 発展 |
| SYZ1：特殊Lagrange・双対トーラス | **14** | planned、分冊の14章を確定 | 発展 |
| **総計** | **221章（既完了120、残101）** | **既完了120章／221章** | ※このルート専用の講義数。他系列の一般基礎講座は含まない |

### 現時点の着手判定

- **YAU1：着手可能。** CYG1/KAH1/HOD1/GA系列はcompleted。GPDE1〜10も実在する。初章では既存の線形楕円型評価と$\partial\bar\partial$-補題の正確な証明ownerを照合し、複素Monge–Ampère固有の評価はYAU1で所有する。
- **DEF1：着手可能。** CYG1、AG3、CM2、HOD1はcompleted。最初の章はKodaira–Spencerの定義から始め、Kuranishi・BTTの難しい解析を事前に証明済みと仮定しない。
- **GW1：着手可能（解析・モジュライ基盤の初期棚卸しが必須）。** SYM1〜8、AG3、CM2、GPDE1〜10などの先行教材が存在し、基本概念から着手できる。ただしFredholm・Gromovコンパクト性・スタックの厳密な所有先と証明不足を早期に決める。既存章があることはこれらの一般結果が証明済みである証拠ではない。
- **MIR1：DEF1完了後。** GW1やYAU1は直接必須にしない。MIR2はMIR1とGW1の完了後。
- **SYZ1：YAU1の必要な存在結果が確立した後。** 特殊Lagrangeの変形論には追加解析の確認が要る。
- **HM1：MIR2以後、かつ導来圏・Floer・$A_\infty$圏の前提整備後。** GW計数とFukaya圏の構成は別の論証。
- **本ルートPLAN自身**は科目別実装のための設計台帳であり、今回の文献照合・講義数確定だけでは計画固有の講義実装を始めていない。従ってplannedのまま、plans/から移動しない。未着手系列のmanifestや章IDを設計だけで実装済みとして作成しない。

### 標準的な教科書・講義ノートとの対応

| 参照文献（出版社・著者・大学の公開ページ） | 採用した設計判断 |
| --- | --- |
| [D. Cox / S. Katz, *Mirror Symmetry and Algebraic Geometry*（AMS, 1999）](https://doi.org/10.1090/surv/068) | quintic → トーリック・Hodge/変形 → GW・量子積 → ミラー定理。MIR1とMIR2の境界、GWの独立前提を明瞭化。 |
| [K. Hori et al., *Mirror Symmetry*（Clay Mathematics Institute, 2003）](https://www.claymath.org/resource/mirror-symmetry/) | A/B模型、周期、安定写像、圏論的視点を別の道具として紹介し、物理的予想と証明済み数学を混同しない。 |
| [C. Voisin, *Hodge Theory and Complex Algebraic Geometry I/II*（Cambridge）](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-ii/47F0D9D694725A426F9CAFDFA830DB11) ／ [D. Huybrechts, *Complex Geometry*（Springer）](https://link.springer.com/book/10.1007/b137952) | DEF1のKodaira–Spencer・KuranishiからGauss–Manin、MIR1の周期とHodge構造の順序。 |
| [Tosatti / Kong, *Notes on Calabi–Yau Manifolds*](https://cims.nyu.edu/~wk805/files/CY_Manifolds_Notes.pdf) ／ [T. Collins, Complex Monge–Ampère講義](https://people.math.harvard.edu/~tcollins/Math262.html) | YAU1の体積正規化、連続性、$C^0/C^2/C^3$評価と高階正則性を分離して14章に配置。 |
| [D. McDuff / D. Salamon, *J-holomorphic Curves and Symplectic Topology*（AMS）](https://doi.org/10.1090/coll/052) | GW1を旧13講の目安ではなく、解析・モジュライ・量子積・VFCの境界を持つ21章とする。 |
| [P. Seidel, *Fukaya Categories and Picard–Lefschetz Theory*（EMS）](https://ems.press/books/zlam/2/contents) ／ [MIT OCW 18.969講義ノート](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/pages/lecture-notes/) | HM1の$A_\infty$・Floer・Fukaya・楕円曲線のHMSを18章に、SYZ1の半平坦構成・特異ファイバーを14章に整理。 |
| [M. Gross / B. Siebert, *From real affine geometry to complex geometry*（Annals, 2011）](https://annals.math.princeton.edu/2011/174-3/p01) | SYZ1では特異アフィン構造・インスタントン補正を滑らかな双対化と区別し、一般成立を既証明と扱わない。 |

この表の**章数は書籍の章数を借用したものではなく**、各書籍で独立に証明される概念の境界と既存教材のprerequisiteを照合した編集設計である。講義数そのものの「出典」を書籍へ仮託しない。


## 科目別PLAN

- [代数幾何I〜III](../plan_done/DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md)
- [複素多様体I・II](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md)
- [Kähler幾何](../plan_done/DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)
- [Kähler–Hodge](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)
- [複素代数幾何](../plan_done/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md)
- [Calabi–Yau幾何](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)
- [ヤウの定理](../plans_progress/DREAM_THEATER_YAU_CALABI_CONJECTURE_PLAN.md)
- [複素変形理論](../plans_progress/DREAM_THEATER_COMPLEX_DEFORMATION_MODULI_PLAN.md)
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

## 共通の本文・CI・依存監査ゲート（各科目のシラバスは分冊先が正本）

### DREAM THEATER 本文・CI・公開の規約

- 章ごとに学習者に必要な導入、定義、命題・証明・例、Level A/B/C などの演習・全問詳細解答を用意する。2〜4手の飛躍は残さず、初出定義・図式・公式の仮定を明示。
- 各章の `chapter.yaml.prerequisites` を **直接必要な既存章と完成済み新章だけ**で固定し、`knowledge.yaml` の概念 owner と矛盾させない。科目名だけの曖昧な全依存や循環は不可。
- AG1 の Zariski、AG2 の $\mathcal O(d)$、CM1 の複素構造、CM2 の $\bar\partial$、KAH1 のケーラー形式はそれぞれ初出 canonical owner を一つに固定。
- 結果先行が必要な大定理（Newlander–Nirenberg、GAGA、BTT、仮想基本類など）は **主張・仮定・結果先行の理由・証明の所属・証明完遂の判定**を明記し、未証明を証明済み扱いしない。
- 参照する前提講義は実在する公開URLを検査し、公開済み章のみ reader-facing index に載せる。内部 PLAN と記事URLを混同しない。
- 既存の依存監査・用語監査・数式・リンク・公開ページ検証を変更時に通す。各新章の公開前には `npm run validate:dream-theater-work`、`npm run validate:dream-theater-prerequisites`、`npm run validate:pages` 等の現行コマンドの適用を確認する。
- 教材の具体例は **アフィン三次曲線 → 射影楕円曲線 → 複素トーラス / K3 → quintic threefold とそのミラー**を縦断させる。
- 対象範囲の静的可視化は複素次元／実次元と断面表示を区別する。模式図を実際の全体形状だと表現しない。

### PLAN 全体の完成判定

- AG1〜AG3 の基礎を通って CAG1 に到達でき、飛ばした代数幾何用語・定理がない。
- 複素多様体とケーラー幾何の前提が CA8 や GEO の内容を超える箇所で明示的に埋まっている。
- GA・AMECH と新系列の canonical owner が一意で、同じ内容を科目名だけ変えて二重実装していない。
- カラビ予想の方程式への帰着、事前評価と連続性の方法を追い、解の存在と一意性に到達できる。
- quintic とミラーの周期・Picard–Fuchs・ミラー写像・曲線計数の一連の計算を検算可能。
- 定理単位の依存 DAG、公開動線、本文リンク、演習の接続、必要な証明後送先に未解決の重大問題がない。

本 PLAN 自体のマージは **講義実装完了を意味しない**。各科目の完成は上記ゲートを通して個別に判定する。
