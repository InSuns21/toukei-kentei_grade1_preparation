# DREAM THEATER 保型形式・保型表現（AFR1〜AFR24）

設計確定: 2026-11-21 JST  
状態: designed / 未着手。**24講（AFR1〜AFR24）で講数を確定**。本文・chapter/knowledge・系列manifest・公開目次は未着手。  
系列ID: \`AFR\`（Automorphic Forms and Representations）。分野: 代数系と解析系の接続。共通ルート: [岩澤理論・保型表現・RH講読](DREAM_THEATER_IWASAWA_AUTOMORPHIC_RH_ROUTE_PLAN.md)。

## 中心問いと到達点

**古典的モジュラー形式の変換則・Hecke固有値・L関数は、局所体上の表現とアデール上の一つの保型表現にどう組み上がり、theta対応・周期・跡公式へどう進むか。**

既存 \`MF1〜MF8\`（古典的正則モジュラー形式・Hecke・newform・L関数）の繰り返しではなく、**保型形式を表現論的・アデール的に一般化**することを所有範囲とする。数学的に地続きに読むため \`ANT\`・\`CA12\`・\`EC\`・\`ANF\` の必要部分を援用する。

学修終了時の到達点:
1. \`SL_2(Z)\`の正則形式とMaass形式の共通する保型性・異なる正則性／スペクトル条件を説明する。
2. アデール上の\`GL_1/GL_2\`の関数と、古典的モジュラー形式の局所・大域の変換則を結び付ける。
3. 局所の不分岐表現、球Hecke代数、Satake型パラメータ、局所L因子からglobal L関数を組み立てる。
4. theta関数、Weil表現、theta lift、seesaw、周期積分を**一般大定理と計算可能なモデルを区別**して理解する。
5. 2026年11月20日にLevent AlpögeがClaudeとの共同成果として公開した**RH/Dirichlet GRH証明主張**を、一次資料・標準定理・検証待ちの飛躍を区別しながら読む。

## 標準書・公開テキストに基づく推敲

| 資料 | 採用するもの | 切り分けるもの |
|---|---|---|
| Daniel Bump, *Automorphic Forms and Representations* | 古典的形式→局所\`GL_2\`→アデール→\`GL_2\`の保型表現 | MFで証明済みの古典Hecke計算は参照へ集約 |
| Stephen Gelbart, *Automorphic Forms on Adele Groups* | \`GL_2(A)\`上の保型形式と古典理論の同一対象の見方 | Haar測度・中心指標・正規化を省略しない |
| Anton Deitmar, *Automorphic Forms* | 学生向けに古典・アデールの二つの経路を比較 | 短い概説を深い証明の代用にしない |
| Dorian Goldfeld & Joseph Hundley, *Automorphic Representations and L-Functions for the General Linear Group* | 局所表現・Whittaker模型・\`GL(n)\`、Rankin–Selberg / Godement–Jacquet L関数 | 一般\`GL(n)\`の大定理は「証明済み」と過大申告しない |
| Fred Diamond & Jerry Shurman, *A First Course in Modular Forms* | \`MF\`との接続、古典的合同部分群・newformの規約 | 本系列ではMF1〜8の完全重複を作らない |
| J. S. Milne, *Algebraic Number Theory* / *Class Field Theory* | アデール・イデール、局所体・Hecke指標に必要な数論 | 新規\`ANF\`へ主要定義の所有権を集約 |

一次リンク:
- Bump著者ページ: https://math.stanford.edu/~bump/book.html
- Cambridge（Bump）: https://www.cambridge.org/core/books/automorphic-forms-and-representations/F46424A2D9646FE32D9B792BC5E0238A
- Gelbart（出版社）: https://press.princeton.edu/books/ebook/9781400881611/automorphic-forms-on-adele-groups-pdf
- Deitmar（出版社）: https://link.springer.com/book/10.1007/978-1-4471-4435-9
- Goldfeld–Hundley（出版社）: https://www.cambridge.org/core/books/automorphic-representations-and-lfunctions-for-the-general-linear-group/
- Diamond–Shurman（出版社）: https://link.springer.com/book/10.1007/978-0-387-27226-9

文献の公開書誌・目次・閲覧可能な講義ページの論題を比較した。市販本の全文読破・第三者査読の完了は主張せず、証明文・演習を転載しない。

## 直接依存と循環回避

- AFR1〜7: 既存\`MF1〜MF7\`, \`ANT2〜ANT8\`, \`CA12\`および必要な双曲幾何・Hilbert空間の既存章。Maass形式の非正則性をMFの正則形式と取り違えない。
- AFR8〜10: \`ANF9〜ANF13\`、\`ANF19\`（アデール・局所体）、実／p進のFourier解析の必要な既出章。実数・有限アデール・無限素点を全て定義する。
- AFR11〜18: AFR8〜10、群の表現、\`LIE\`と\`GRP\`の必要部分。高階の表現論やHaar積分が不足する場合は定義・補題を章内に置き、未実装\`LREP\`を前提にせず、章IDの実在を確認。
- AFR19〜22: \`CA12\`のtheta、\`MF5〜6\`のL関数、\`AFR11〜18\`。半整数重さやmetaplectic cover、局所・大域theta correspondenceを混同しない。
- AFR23〜24: \`ANT7〜8\`の明示公式・RH/GRH、\`IWA1〜20\`のうち公開済みで実際に使う塔・局所条件、\`AFR19〜22\`のtheta lift・周期。**IWAが未実装ならAFR1にIWA全講を要求せず、最終研究講のみ明示的に必要な範囲を履修する。**
- ANF/AFR/IWAの各章は着手時に実在\`chapter.yaml\`・knowledge DAG・stable anchorと照合する。MFの新たな追跡監査を暗黙に行わない。

## 確定24講（中心問い・計算／証明ゲート）

| ID | 講義・中心問い | 主たる証明・直接例 |
|---|---|---|
| AFR1 | 古典的モジュラー形式から保型形式へ | \`MF\`の変換則を\`Gamma\G\`上の関数に持ち上げ、重さ・中心の作用を照合 |
| AFR2 | Maass形式・双曲Laplace作用素 | 双曲計量、固有方程式、正則形式との相違、フーリエ展開の準備 |
| AFR3 | 保型スペクトルとカスプ形式 | Petersson積・自己共役性の適切な定義域、離散／連続スペクトルの区別 |
| AFR4 | Whittaker係数・Bessel関数 | Maass形式の分離変数と\`K\`-Besselの方程式を途中式から導出 |
| AFR5 | Eisenstein級数と関数等式 | 絶対収束域、解析接続・定数項、Mellin変換の小モデル |
| AFR6 | Hecke作用とスペクトルの接続 | double coset・作用素の自己共役条件と固有値の具体的確認 |
| AFR7 | 保型L関数・Rankin型積分の初例 | Dirichlet級数、Euler積、Mellin/積分展開の和積分交換 |
| AFR8 | アデール・イデールの保型的利用 | restricted product と\`Q\A_Q\`、積公式を実数・p進の素点から確認 |
| AFR9 | アデール上のFourier解析 | Schwartz–Bruhat関数、局所Haar測度、有限アデールのPoisson和公式 |
| AFR10 | Tateの学位論文：\`GL_1\`のゼータ積分 | 局所ゼータ積分からHecke L関数と関数等式へ、規格化を明記 |
| AFR11 | \`GL_2(A)\`上の保型形式 | \`GL_2(Q)\GL_2(A)\`、中心指標、カスプ条件、古典形式の持ち上げ |
| AFR12 | 無限素点の\`GL_2(R)\`表現 | 主系列・離散系列のモデル、重さと\`(g,K)\`型の関係 |
| AFR13 | p進\`GL_2\`表現の入門 | 許容性、smooth、主系列、不分岐／分岐の具体例 |
| AFR14 | 球Hecke代数とSatakeパラメータ | 双対剰余類、作用素と局所Euler因子の対応を計算 |
| AFR15 | 分岐局所表現・newvector | \`K_0(p^n)\`／導手・Whittaker模型の定義と明示例 |
| AFR16 | 制限テンソル積・局所大域L因子 | 既知\`MF6\`のEuler因子と局所成分の積の一致、収束域と正規化 |
| AFR17 | \`GL_2\`の保型表現と古典形式 | cuspidal representation、固有形式のadelizationと復元（外部大定理の境界） |
| AFR18 | Rankin–Selberg積分と積L関数 | unfoldingの成立条件、収束・定数項、\`GL_2×GL_2\`の模型 |
| AFR19 | Weil表現・theta級数 | 振動子表現の基礎変換、Poisson公式、既存theta変換の再解釈 |
| AFR20 | theta対応とunitary／orthogonal群 | dual pair、theta liftの構成、具体的低ランク例、一般大定理との区別 |
| AFR21 | 周期積分・seesaw identity | seesaw配置、積分交換の条件、Hecke指標による変化をモデルで確認 |
| AFR22 | Rallis内積公式・相対跡公式への入口 | 反復theta lift、norm・period・trace formulaを区別、高ランクの証明依存を明示 |
| AFR23 | RH/Dirichlet GRH・明示公式・正値性 | \`ANT8\`の厳密な予想、von Mangoldt和・明示公式、零点と誤差評価の同値の条件 |
| AFR24 | 2026年Alpöge–Claude証明主張の研究講読 | 作者の発表と公的検証状況、Iwasawa tower・CM・反復theta lift・seesaw・Bostの傾き不等式等の**役割仮説**、Lean検証の手順 |

## RH研究講読の更新可能な厳密な境界

**2026-11-21 JSTの一次資料:** Levent Alpöge, “remark” (2026-11-20), https://alpo.ge/remark.pdf 。著者は、Claudeとの研究でRHとDirichletのGRHを証明し、14分割のLeanアーカイブで形式化したと**主張**している。本人の研究経過説明には、Stepanov determinant、CM曲線、Iwasawa tower、反復theta lift、\`O(2,n)\`、unitary群、period/seesaw、Rallis、Bost slope inequality、relative trace formula、Vandiverに関する弱化条件、\`H^1\`などが登場する。

- **確立した基礎:** \`ANT7/8\`のRH/GRH、Weilの明示公式、定義済み\`AFR19〜22\`の一般的道具、\`IWA\`の既知定理。
- **発表者の主張:** これらを組み合わせた特定の長大な証明と、そのLean formalizationの正しさ。2026-11-21時点で独立検証が完了した事実は確認できない。
- **証明監査:** ①実アーカイブの再現可能な固定（commit/hash、Lean・mathlib版、依存）、②\`sorry\`・新規公理・unsafe・不審なplaceholderの監査、③到達定理の命題・量化・定義が標準RH/Dirichlet GRHと一致するか、④kernelによるビルド確認、⑤数学的依存の段階的可読化、⑥第三者再現の記録。Leanがビルドすることだけで、別命題の証明を標準RHの証明と認めない。
- **到達目標:** 最終講では「証明を全文理解した」とは称さず、**検証済みの範囲を切り分けて論理依存地図を描ける**ことを必修とする。文献・Lean環境・数学界の合意が進んだ後は同じAFR24内に版付追記し、必要なら別途の新しい研究講読PLANを設計する。
- 参考一次・公的情報: https://www.claymath.org/millennium/Riemann-Hypothesis/ 、https://alpo.ge/remark.pdf 。2026-11-21時点のClayの公開ページは\`Unsolved\`。発表と承認は区別する。
- **階層差:** \`AFR20〜22\`の低ランク具体例で示したtheta liftの一般直観から、2026年メモの高ランク反復証明の正しさを推論しない。使用する大定理・比較射・積分の交換・規格化が監査できない場合は「未検証」と表示する。

## 各章の完成条件

- 定義前の動機、直接例、formal statement、証明の見取り図、閉じるべき主要補題、例・演習・解答（A4/B3/C1以上）を完成。準同型・表現の左右作用、中心指標、Haar測度の規格化、無限素点、行列表現、収束の交換を曖昧にしない。
- 外部の高度な定理は証明の出典・適用条件・再現可能な小モデルと、**この講義では証明しない範囲**を明記。後続の中心定理の証明を原則として閉じる規約に沿い、未閉鎖を完了としない。
- 研究発表の評価を既知の数学と混同せず、ニュースが変わっても過去の確度ラベルを消さない。
- \`AFR1\`執筆時、\`plans_progress/\`へPLANを移動し、\`textbook/dream-theater-series/AFR.yaml\`に24講\`planned\`を追加。\`completed\`は本文と数理・読者査読、CIが揃った章だけ。公開目次は完成章だけ。シリーズ完了後の横断査読・ルーティング一致を経て\`plan_done/\`へ移動する。
