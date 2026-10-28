# DREAM THEATER 複素代数幾何学（CAG1）

分冊: 2026-10-11  
推敲: 2026-10-28（標準教科書・公開講義ノートとの照合、証明境界・依存・具体例の再設計）  
状態: in progress（CAG1-01 を実装。CAG1-02 以降と全体監査は未完了）

## 中心問いと到達点

**複素数体上の代数的対象を解析化したとき、何が保存され、どの条件の下で正則な対象を代数的対象として取り戻せるのか。**

単なる「代数的＝正則」の暗記ではなく、**解析化 → 連接層・コホモロジーの比較 → 射の比較 → 代数化 → 幾何学的応用**を一つの論理として学ぶ。終了時の到達目標は次のとおり。

1. 有限型 $\mathbb C$-スキームの解析化 $X^{\mathrm{an}}$ を、複素点・解析位相・正則構造層から説明し、代数的局所環と解析的局所環の違いを計算できる。
2. 射影的な $X$ に対する GAGA の三本柱（連接層のコホモロジー比較、射の比較、連接層の代数化）を、仮定・補題の使用箇所・証明の主要段階込みで説明できる。
3. 射影多様体の正則線束・正則射・閉解析部分集合がいつ代数的になるかを示し、非射影の場合へ結論を無条件に拡張しない。
4. 標準束・随伴公式、曲線の種数、滑らかな五次三次元超曲面（quintic threefold）を代数・解析の双方から具体的に確認し、Hodge 数に至るための**未習の入力**を特定できる。

## 前提・責務境界（2026-10-28 のリポジトリ照合）

- [代数幾何学 I〜III：AG1〜AG3](../plan_done/DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md) は全38章が完成。AG2-01/05/06/07/08/09/10/12（射影空間・構造層・線束・標準束・随伴公式・quintic）、AG3-06/07/08/10/11（連接層・コホモロジー・種数）を主に再利用する。一般のSerre双対性・交叉理論をAG3で証明済みと見なさない。
- [複素多様体論 I・II：CM1/CM2](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md) は全21章が完成。CM1-10（複素射影空間）、CM2-04〜08（Dolbeault・正則束・標準束）を再利用する。解析空間は特異点・非被約構造を許すため、**複素多様体**だけの定義とは区別する。
- [Kähler幾何学：KAH1](../plan_done/DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md) は全16章が完成。KAH1-07/12〜14（Fubini–Study形式、第一Chern類、Kähler class、射影多様体）を再利用する。CAG1でKähler接続・曲率を重複証明しない。
- [Kähler–Hodge理論：HOD1](../plans/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md) は計画のみ。Hodge分解、Hard Lefschetz、Hodge数の対称性・原始コホモロジーの**証明 owner**であり、本PLANの完成をこれら未完成の定理の既習扱いに依存させない。
- [Calabi–Yau幾何学：CYG1](../plans/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md) は計画のみ。Calabi–Yau の諸定義・quintic の **Hodge 数の実計算**・変形への入口を所有する。CAG1はquinticの滑らかさ・随伴公式と正則3形式の入口までを担当する。

このPLANの固有責務は**代数化／解析化の比較の仕組み（GAGA）と、その線束・射・具体例への適用**である。一般Hodge理論、Kodaira消滅・埋め込みの完全証明、Calabi–Yau定理、一般のGrothendieck双対、変形理論は本講に押し込まない。Kodaira埋め込み定理は仮定と結論のみ必要箇所で紹介し、完全証明を掲載する別の正本が決まるまでは「既証明」としない。

## 対象・記号と初回に固定する区別

- 基礎体は $\mathbb C$。主系列では有限型の射影 $\mathbb C$-スキーム、特に滑らかな射影多様体を扱う。GAGA の連接層の比較は**滑らかさを要しない**ため、特異・非被約な場合を早い段階で切り分ける。
- $X^{\mathrm{an}}$ は $X(\mathbb C)$ を台集合とする複素解析空間。代数的構造層 $\mathcal O_X$ と解析的構造層 $\mathcal O_{X^{\mathrm{an}}}$、Zariski位相と解析位相、代数的層 $\mathcal F$ とその解析化 $\mathcal F^{\mathrm{an}}$ を混同しない。
- 解析化は大域正則関数を任意に多項式へ変換する操作ではない。たとえば $\mathbb A^1_{\mathbb C}$ の大域代数的関数は $\mathbb C[z]$、その解析化 $\mathbb C$ 上の大域正則関数には $e^z$ もある。
- **射影的 $\Rightarrow$ 固有（proper）**だが逆は一般には成り立たない。Serreの古典的射影版 GAGA を主証明対象とし、固有スキームへの拡張は別途必要となる補題（Chowの補題等）とともに範囲を示す。「コンパクト複素多様体ならすべて代数的」は誤り。
- 線束の正則性は複素構造に関するもの。正則線束の解析化と、単なる $C^\infty$ 複素線束／位相的Chern類とは同義でない。$K_X=\det\Omega_X^1$ と $K_{X^{\mathrm{an}}}=\det\Omega_{X^{\mathrm{an}}}^1$ を、それぞれの圏で定義して比較する。
- KAH1 の規格化 $[\omega_{\mathrm{FS}}/(2\pi)]=c_1(\mathcal O(1))_{\mathbb R}$ に合わせる。複素次元 $n$ と実次元 $2n$、曲線の算術種数と滑らかな曲線の幾何種数を取り違えない。

## 講義構成（暫定14章・証明量による分割／統合可）

章IDは**未予約の仮ID**。初回実装時に系列 manifest の有無・既存IDとの衝突を確認する。14という数値は時間割・上限・達成ノルマではない。

### 第I部　同じ方程式、異なる関数と位相

1. **CAG1-01：代数的幾何と複素解析的幾何のずれ。** $\mathbb A^1_{\mathbb C}$ と $\mathbb P^1_{\mathbb C}$ を両側の関数・開集合から比較する。多項式と整関数の違い、射影直線上の大域正則関数の定数性を実証。「いつ一致するのか」という中心問いを発生させる。
2. **CAG1-02：解析化の構成と特異解析空間。** アフィン方程式 $f_1=\cdots=f_r=0$ から正則関数の層の商を作り、開被覆で貼り合わせる。$X^{\mathrm{an}}$ の点・局所環、射の解析化、滑らかな超曲面と節点、$z^2=0$ の非被約例を比較する。一般の有限型スキームへの関手性は必要な局所命題を確認して示す。
3. **CAG1-03：代数的連接層と解析的連接層。** AG3の有限表示・連接性と解析側の局所有限表示、$\mathcal F^{\mathrm{an}}=\mathcal O_{X^{\mathrm{an}}}\otimes_{h^{-1}\mathcal O_X}h^{-1}\mathcal F$、局所環の平坦性と完全列の保存を区別する。$\mathcal O(d)$ の遷移関数を両側で具体照合し、平坦性や解析的連接性を単なる「明らか」としない。

### 第II部　GAGAの三本柱

4. **CAG1-04：射影空間上のねじり層と比較の基底例。** 既習の $H^q(\mathbb P^n,\mathcal O(d))$ と、解析的チャート上の正則関数・Čech複体を比較。$H^0(\mathcal O(d))$ の斉次多項式、負次数での消失、長完全列を計算する。解析側のStein開集合の高次コホモロジー消滅は**Cartanの定理Bという入力**として名指しする。
5. **CAG1-05：GAGA I――連接層コホモロジーの比較。** 射影的 $X/\mathbb C$、代数的連接 $\mathcal F$、各 $q\ge0$ に対して $H^q(X,\mathcal F)\cong H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}})$ を正確に述べる。$\mathcal O(d)$ の場合から有限個のねじり層による表示、長完全列・五項補題等で一般の連接層へ進む主要帰納を説明する。Serre消滅と解析側の消滅の使用位置を記録する。
6. **CAG1-06：GAGA II――正則な層の射は代数的か。** $\operatorname{Hom}_{\mathcal O_X}(\mathcal F,\mathcal G)$ と解析化後のHomの自然写像が同型であることを、局所有限表示、$\mathcal Hom$、平坦な基底変換、前章の$H^0$比較で導く。線束の同型、切断、正則写像がどの仮定のもとで代数化するかを例で確認する。
7. **CAG1-07：GAGA III――正則連接層の代数化。** 任意の解析的連接層 $\mathcal E$ をねじった大域切断で生成し、有限個の$\mathcal O(-m)$の表示から前章のHom比較を使って代数的余核を作る。必要な解析的有限次元性・十分大きなねじりでの大域生成を**Cartan–Serre型の深い解析的入力**として分離する。代数化対象の**同型を除く一意性**を曖昧にしない。
8. **CAG1-08：射影版GAGAの統合と固有版の境界。** 三本柱を連接層の圏の同値としてまとめ、同型の自然性・コホモロジー保存を確認する。特異・非被約な射影例にも適用可能な範囲、固有スキームへの拡張（Chowの補題が要る段階）、非固有な $\mathbb A^1$ の反例を分けて示す。
9. **CAG1-09：Chowの定理と解析的射の代数性。** 射影空間の閉解析部分集合が代数的であるというChowの定理を、GAGAでイデアル層を代数化する方法から導く。射影多様体間の正則写像についてグラフの閉性・代数化から代数性を説明し、射影性／固有性／分離性がどこに用いられるかを明示する。任意のコンパクト複素多様体へ一般化しない。

### 第III部　線束・標準束・曲線への適用

10. **CAG1-10：Picard群と正則線束の代数化。** 射影的 $X$ における $\operatorname{Pic}(X)\cong\operatorname{Pic}(X^{\mathrm{an}})$ をGAGAの可逆層への適用として導く。$\mathbb P^1$ 上の$\mathcal O(d)$、因子と線束、指数完全列の解析側の役割を例示。正則線束・位相的線束・正の線束を区別し、一般コンパクト複素多様体上のPicard群まで同一視しない。
11. **CAG1-11：標準束と随伴公式を両側で読む。** 滑らかな射影超曲面 $X_d\subset\mathbb P^n$ で代数的余法完全列を解析化し、$K_{X_d}\cong\mathcal O_{X_d}(d-n-1)$ の変換を局所Jacobian・行列式で検証する。AG2-10の代数的証明を正本として引用し、解析側では局所正則微分形式の貼り合わせを実計算する。
12. **CAG1-12：曲線の種数はどちらの言葉でも読めるか。** 滑らかな射影曲線で $g=h^1(C,\mathcal O_C)$ の代数側と解析的層コホモロジー側を**GAGAで**結ぶ。CM2-04のDolbeaultコホモロジーは定義と具体計算までであり、層コホモロジーとの同型（Dolbeaultの定理）は既証明でない。$(0,*)$形式による解消、局所$\bar\partial$-Poincaré補題、細層（fine sheaf）の非巡回性を補題として証明または未証明入力と明示してから $H^1(C^{\mathrm{an}},\mathcal O)\cong H_{\bar\partial}^{0,1}(C^{\mathrm{an}})$ を扱う。平面滑らかな$d$次曲線の $g=(d-1)(d-2)/2$ をAG3-11の制限完全列から再確認し、三次曲線の$g=1$・平面五次曲線の$g=6$を演習で検算。一般Serre双対性を未証明のまま逆輸入しない。

### 第IV部　quinticとその先の境界

13. **CAG1-13：滑らかなquintic threefold。** $X=\{z_0^5+\cdots+z_4^5=0\}\subset\mathbb P^4$ の射影Jacobianから滑らかさを確かめ、複素次元3と $K_X\cong\mathcal O_X$ を随伴公式で導く。局所の正則3形式の遷移を確認する。**$K_X$が自明であることだけでRicci平坦計量の存在や全ホロノミー$SU(3)$を証明したとしない**。
14. **CAG1-14：総合演習とHodge数への橋。** $\mathbb A^1$ では大域関数の比較が失敗し、射影的な $\mathbb P^n$ 上では連接層・射のGAGA比較が成立することを、線束・曲線・quinticの同じ図式で検証する。quinticの $h^{1,1},h^{2,1}$ に進むにはHOD1のHodge分解・Lefschetz型定理、Chern類・Euler標数／変形理論等がさらに必要と棚卸しする。数値の実導出はCYG1の責務とし、計算せず既知値だけを宣言して終了しない。

## 必須の証明・計算チェックポイント

| 節目 | 完了の証拠 |
|---|---|
| 解析化 | 方程式・構造層・局所環・射を一つの滑らかな例と一つの特異／非被約例で比較する |
| 連接層 | 有限表示と解析化後の連接性・平坦性の必要箇所、完全列の保存をそれぞれ追う |
| GAGA I | $\mathcal O(d)$ の基底計算と、一般連接層への帰納を途中の完全列込みで追う |
| GAGA II | $\mathcal Hom$ と大域切断の比較によるHom同型を具体的な線束の射で検算する |
| GAGA III | 大域生成→二項表示→射の代数化→余核の解析化を接続する。解析的入力は証明済みと偽らない |
| Chow・Picard | 閉解析部分集合のイデアル層と、線束の可逆性が代数化後も保たれる理由を確認する |
| 曲線・quintic | 次元、Jacobianの階数、$\mathcal O(d)$ の符号、$d-n-1$、$h^1(\mathcal O_C)$ の計算を再導出する |
| 境界 | 非固有・非射影・非Kähler・特異の場合のうち、どの定理の仮定が失われたかを言語化する |

**証明停止線（特に重要）：** GAGAの本体は定理の「三項目」を述べるだけでは完了しない。上記04〜07の帰納と構成を本文で再現する。一方、Weierstrassの準備定理による解析的連接性、解析的局所環の平坦性、Cartanの定理A/B、コンパクト解析空間上の連接層コホモロジーの有限次元性等は一般に高度な入力である。**このPLANの既存prerequisiteに完全な証明があるかを個別確認し、ないものは外部定理として出典・仮定・未証明の旨を明記する。** それらを引用した相対的な証明を「解析的補題まで含む完全な自己完結証明」と称さない。完全な閉包が学習目標になった場合は必要な解析的補講を明示してからPLAN/依存を拡張する。

## 演習の骨格（各実装章ではA4/B3/C1以上、必要に応じ追加）

- **A：定義と直接確認。** $\mathbb A^1$ と $\mathbb P^1$ の関数環、$\mathcal O(d)$ の遷移、$H^0(\mathbb P^1,\mathcal O(d))$、平面曲線のJacobian判定、曲線の種数。
- **B：二つの言語の接続。** 多項式方程式から解析化した構造層の芽、短完全列の解析化、GAGAで線束の同型・射を代数化する手順、解析化と標準束の比較。
- **C：条件の使い分け。** 「アフィンではGAGAのどの結論が壊れるか」、射影的な閉解析部分集合へのChow適用、quinticの滑らかさと標準束の計算、非射影複素トーラスをGAGAの反例と誤記しない理由。

全演習の詳細解答では、仮定、使用する既習結果、主要中間式、結論を必ず可視化する。題数を満たすための形式的な水増しはしない。

## 標準教科書・公開ノートとの照合（2026-10-28）

| 文献と対象箇所 | 今回の設計への取り込み | 本PLAN外へ残す点 |
|---|---|---|
| [Robin Hartshorne, *Algebraic Geometry*, Appendix B “Transcendental Methods”](https://books.google.com/books/about/Algebraic_Geometry.html?id=7z4mBQAAQBAJ) | 解析空間化、代数／解析圏の比較、射影性判定を一続きの主題として扱う | Appendix Bを読んだだけでKodaira埋め込みの全証明を履修済みとしない |
| [Kiran Kedlaya, MIT 18.726 *GAGA*（公開講義ノート、2009）](https://ocw.mit.edu/courses/18-726-algebraic-geometry-spring-2009/resources/mit18_726s09_lec22_gaga/) | 連接層→コホモロジー→Hom→本質的全射→射影／固有版→Chowという骨組み、必要な解析的ブラックボックスの位置 | 大学院講義ノートの「exercise」やスケッチを無検証の完全証明として転載しない |
| [Jean-Pierre Serre, “Géométrie algébrique et géométrie analytique”, *Annales de l'Institut Fourier* 6 (1956)](https://aif.centre-mersenne.org/item/AIF_1956__6__1_0/) | 原定理の射影という仮定、三本柱の射程と用語を一次資料で照合 | 原文の抽象一般化を無条件に本講へ追加しない |
| [Phillip Griffiths & Joseph Harris, *Principles of Algebraic Geometry*, Ch. 0–2](https://onlinelibrary.wiley.com/doi/book/10.1002/9781118032527) | 複素多様体・射影多様体、Riemann面と代数曲線を具体例の両側から扱う | 交叉理論・高次曲面の大規模な各論は対象外 |
| [Daniel Huybrechts, *Complex Geometry: An Introduction*, §2.2–2.4、§5.3](https://link.springer.com/book/10.1007/b137952) | 正則束・因子・射影空間・Kodaira埋め込みの概念的距離を確認 | Kodaira埋め込みの完全証明は別途ownerと解析補題が揃ったときに扱う |
| [Claire Voisin, *Hodge Theory and Complex Algebraic Geometry I*, Introduction、Hodge・Lefschetz関連章](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-i/A6E52939BA107FFCB5A901D5B5D88025) | 「射影 $\subset$ Kähler」とHodge理論の接続、quinticの数値計算に要る後続知識を区別 | Hodge分解・Lefschetzの核心証明はHOD1、Hodge数の適用計算はCYG1 |

文献は**講義構成・仮定・証明経路を照合する参照先**であり、本文・図・演習を転載するものではない。章の執筆時には出典の定理番号・適用条件・記号規約を原文に戻って照合する。

## 着手・査読・完成条件

1. CAG1-01 のみ本文・系列 manifest・公開索引へ登録済み。未実装章を公開索引へ先行登録せず、残る章・全体監査の完了まで本PLANを **textbook/plans_progress/** に保つ。
2. 正式着手時に仮IDの衝突、完成済みAG・CM・KAHの実在する章・stable anchor、未完成HOD・CYGの現在地、必要な解析的入力の証明ownerを照合する。章別の直接 prerequisite は「この章が実際に使うもの」に絞り、前提を無意味に増やさない。
3. 各章は動機→定義の通常文での導入→条件を検算する直接例→主要結果と証明→独習用演習と全詳細解答の順を基準とする。既習結果を実際に使う文からcanonical stable anchorへリンクする。
4. 新規本文は現行 [執筆基準](../DREAM_THEATER_AUTHORING_STANDARD.md) の区分Cに従い、全主要証明・全演習解答の棚卸しと出発点からの再計算、完成本文の別観点再読を行う。同じ担当者の再読を第三者の独立査読と呼ばない。**別の完成章の追跡監査は章IDを指定された場合のみ**実施する。
5. 変更スコープに応じた教材・knowledge・concept・exercise-count・数式・リンク検証とCIを通し、最終的に系列 manifest、必要な索引・routing、公開先、依存の向きと証明停止線を横断確認する。全learning objectivesの証拠が揃うまでPLANはcompletedにしない。
