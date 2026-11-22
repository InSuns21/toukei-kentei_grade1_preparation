# DREAM THEATER 保型形式・保型表現（AFR1〜AFR24）

設計確定: 2026-11-21 JST  
状態: designed / 未着手。**24講（AFR1〜AFR24）で講数を確定**。本文・chapter/knowledge・系列manifest・公開目次は未着手。  
系列ID: `AFR`（Automorphic Forms and Representations）。分野: 代数系と解析系の接続。共通ルート: [岩澤理論・保型表現・RH講読](DREAM_THEATER_IWASAWA_AUTOMORPHIC_RH_ROUTE_PLAN.md)。

## 中心問いと到達点

**古典的モジュラー形式の変換則・Hecke固有値・L関数は、局所体上の表現とアデール上の一つの保型表現にどう組み上がり、theta対応・周期・跡公式へどう進むか。**

既存 `MF1〜MF8`（古典的正則モジュラー形式・Hecke・newform・L関数）の繰り返しではなく、**保型形式を表現論的・アデール的に一般化**することを所有範囲とする。数学的に地続きに読むため `ANT`・`CA12`・`EC`・`ANF` の必要部分を援用する。

学修終了時の到達点:
1. `SL_2(Z)`の正則形式とMaass形式の共通する保型性・異なる正則性／スペクトル条件を説明する。
2. アデール上の`GL_1/GL_2`の関数と、古典的モジュラー形式の局所・大域の変換則を結び付ける。
3. 局所の不分岐表現、球Hecke代数、Satake型パラメータ、局所L因子からglobal L関数を組み立てる。
4. theta関数、Weil表現、theta lift、seesaw、周期積分を**一般大定理と計算可能なモデルを区別**して理解する。
5. 2026年11月20日公開・11月21日以降にLean/Mathlibコミュニティが形式的正しさを認証した**RH/Dirichlet GRH証明**を、独立kernel検証と人間可読な数学的再構成を区別しながら読む。

## 標準書・公開テキストに基づく推敲

| 資料 | 採用するもの | 切り分けるもの |
|---|---|---|
| Daniel Bump, *Automorphic Forms and Representations* | 古典的形式→局所`GL_2`→アデール→`GL_2`の保型表現 | MFで証明済みの古典Hecke計算は参照へ集約 |
| Stephen Gelbart, *Automorphic Forms on Adele Groups* | `GL_2(A)`上の保型形式と古典理論の同一対象の見方 | Haar測度・中心指標・正規化を省略しない |
| Anton Deitmar, *Automorphic Forms* | 学生向けに古典・アデールの二つの経路を比較 | 短い概説を深い証明の代用にしない |
| Dorian Goldfeld & Joseph Hundley, *Automorphic Representations and L-Functions for the General Linear Group* | 局所表現・Whittaker模型・`GL(n)`、Rankin–Selberg / Godement–Jacquet L関数 | 一般`GL(n)`の大定理は「証明済み」と過大申告しない |
| Fred Diamond & Jerry Shurman, *A First Course in Modular Forms* | `MF`との接続、古典的合同部分群・newformの規約 | 本系列ではMF1〜8の完全重複を作らない |
| J. S. Milne, *Algebraic Number Theory* / *Class Field Theory* | アデール・イデール、局所体・Hecke指標に必要な数論 | 新規`ANF`へ主要定義の所有権を集約 |

一次リンク:
- Bump著者ページ: https://math.stanford.edu/~bump/book.html
- Cambridge（Bump）: https://www.cambridge.org/core/books/automorphic-forms-and-representations/F46424A2D9646FE32D9B792BC5E0238A
- Gelbart（出版社）: https://press.princeton.edu/books/ebook/9781400881611/automorphic-forms-on-adele-groups-pdf
- Deitmar（出版社）: https://link.springer.com/book/10.1007/978-1-4471-4435-9
- Goldfeld–Hundley（出版社）: https://www.cambridge.org/core/books/automorphic-representations-and-lfunctions-for-the-general-linear-group/
- Diamond–Shurman（出版社）: https://link.springer.com/book/10.1007/978-0-387-27226-9

文献の公開書誌・目次・閲覧可能な講義ページの論題を比較した。市販本の全文読破・第三者査読の完了は主張せず、証明文・演習を転載しない。

## 直接依存と循環回避

- AFR1〜7: 既存`MF1〜MF7`, `ANT2〜ANT8`, `CA12`および必要な双曲幾何・Hilbert空間の既存章。Maass形式の非正則性をMFの正則形式と取り違えない。
- AFR8〜10: `ANF9〜ANF13`、`ANF19`（アデール・局所体）、実／p進のFourier解析の必要な既出章。実数・有限アデール・無限素点を全て定義する。
- AFR11〜18: AFR8〜10、群の表現、`LIE`と`GRP`の必要部分。高階の表現論やHaar積分が不足する場合は定義・補題を章内に置き、未実装`LREP`を前提にせず、章IDの実在を確認。
- AFR19〜22: `CA12`のtheta、`MF5〜6`のL関数、`AFR11〜18`。半整数重さやmetaplectic cover、局所・大域theta correspondenceを混同しない。
- AFR23〜24: `ANT7〜8`の明示公式・RH/GRH、`IWA1〜20`のうち公開済みで実際に使う塔・局所条件、`AFR19〜22`のtheta lift・周期。**IWAが未実装ならAFR1にIWA全講を要求せず、最終研究講のみ明示的に必要な範囲を履修する。**
- ANF/AFR/IWAの各章は着手時に実在`chapter.yaml`・knowledge DAG・stable anchorと照合する。MFの新たな追跡監査を暗黙に行わない。

## 確定24講（中心問い・計算／証明ゲート）

| ID | 講義・中心問い | 主たる証明・直接例 |
|---|---|---|
| AFR1 | 古典的モジュラー形式から保型形式へ | `MF`の変換則を`Gamma\G`上の関数に持ち上げ、重さ・中心の作用を照合 |
| AFR2 | Maass形式・双曲Laplace作用素 | 双曲計量、固有方程式、正則形式との相違、フーリエ展開の準備 |
| AFR3 | 保型スペクトルとカスプ形式 | Petersson積・自己共役性の適切な定義域、離散／連続スペクトルの区別 |
| AFR4 | Whittaker係数・Bessel関数 | Maass形式の分離変数と`K`-Besselの方程式を途中式から導出 |
| AFR5 | Eisenstein級数と関数等式 | 絶対収束域、解析接続・定数項、Mellin変換の小モデル |
| AFR6 | Hecke作用とスペクトルの接続 | double coset・作用素の自己共役条件と固有値の具体的確認 |
| AFR7 | 保型L関数・Rankin型積分の初例 | Dirichlet級数、Euler積、Mellin/積分展開の和積分交換 |
| AFR8 | アデール・イデールの保型的利用 | restricted product と`Q\A_Q`、積公式を実数・p進の素点から確認 |
| AFR9 | アデール上のFourier解析 | Schwartz–Bruhat関数、局所Haar測度、有限アデールのPoisson和公式 |
| AFR10 | Tateの学位論文：`GL_1`のゼータ積分 | 局所ゼータ積分からHecke L関数と関数等式へ、規格化を明記 |
| AFR11 | `GL_2(A)`上の保型形式 | `GL_2(Q)\GL_2(A)`、中心指標、カスプ条件、古典形式の持ち上げ |
| AFR12 | 無限素点の`GL_2(R)`表現 | 主系列・離散系列のモデル、重さと`(g,K)`型の関係 |
| AFR13 | p進`GL_2`表現の入門 | 許容性、smooth、主系列、不分岐／分岐の具体例 |
| AFR14 | 球Hecke代数とSatakeパラメータ | 双対剰余類、作用素と局所Euler因子の対応を計算 |
| AFR15 | 分岐局所表現・newvector | `K_0(p^n)`／導手・Whittaker模型の定義と明示例 |
| AFR16 | 制限テンソル積・局所大域L因子 | 既知`MF6`のEuler因子と局所成分の積の一致、収束域と正規化 |
| AFR17 | `GL_2`の保型表現と古典形式 | cuspidal representation、固有形式のadelizationと復元（外部大定理の境界） |
| AFR18 | Rankin–Selberg積分と積L関数 | unfoldingの成立条件、収束・定数項、`GL_2×GL_2`の模型 |
| AFR19 | Weil表現・theta級数 | 振動子表現の基礎変換、Poisson公式、既存theta変換の再解釈 |
| AFR20 | theta対応とunitary／orthogonal群 | dual pair、theta liftの構成、具体的低ランク例、一般大定理との区別 |
| AFR21 | 周期積分・seesaw identity | seesaw配置、積分交換の条件、Hecke指標による変化をモデルで確認 |
| AFR22 | Rallis内積公式・相対跡公式への入口 | 反復theta lift、norm・period・trace formulaを区別、高ランクの証明依存を明示 |
| AFR23 | RH・Dirichlet GRH：零点から平滑化素数冪和、主不等式(M)への解析的還元 | Mellin変換、主指標の極補正、片側上界、正係数の非相殺、(M)/(B)/(C)の論理関係と引用範囲を検証 |
| AFR24 | Alpöge–Claudeの形式的RH/Dirichlet GRH証明の依存地図・再現可能な検証 | 11/21以降のLean/Mathlib認証・独立kernel記録、theta・CM・Iwasawa・Galois群の仮定、自然言語化の未完部分を分類 |

## RH研究講読の現行正本（2026年11月23日時点）

**2026年11月21日以降、単なる証明「主張」の段階ではない。** Lean・Mathlib両コミュニティの共同声明（Lean FRO／Mathlib Initiative支持）は**リーマン予想の命題と形式的証明を認証**した。Waterloo大学Michael RubinsteinとMITのAndrew Sutherlandが公表した独立検証では、RHと**Dirichlet L関数のGRH**について、コンパイル・標準公理のみへの依存・kernelによる再検証・独立kernelによる検査・最終命題の照合で成功が報告されている。数学的な証明の発想をすべて自然言語で解説し終えたとは主張せず、Clayの公式認定も別に扱う。

- 発表・研究経過（11/20）: https://alpo.ge/remark.pdf
- Lean/Mathlib共同声明（11/21 13:55）: https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
- Rubinsteinの第三者検証（11/21）: https://mrubinst.github.io/grh-lean-verification/
- Sutherlandの第三者検証（11/22 16:20 UTC更新）: https://math.mit.edu/~drew/grh/
- **数学的な解説資料**: https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper.pdf （164頁、11/21作業稿）、https://www.ihes.fr/~rzhang/files/GRH%20note.pdf （Robin Zhang、11/21予備ノート）。前者は主不等式(M)をLeanに依拠する未完の人間可読化、後者はAI支援起草のためLeanとの完全な忠実性が保証されていない。
- 公式認定の経過: https://www.claymath.org/millennium/Riemann-Hypothesis/ （11/23の確認時点では`Unsolved`）。

**厳密なスコープ:** 検証されたLeanの5命題は `riemannHypothesis`, `riemannZeta_eq_zero_re`, `LFunction_ne_zero_of_half_lt_re`, `LFunction_eq_zero_re`, `LFunction_eq_zero_re_of_isPrimitive`。Dirichlet指標は全法を扱い、非原始指標も含む宣言がある。**一般のDedekind ζ、全Hecke L、保型L関数、Extended RHまで証明済みとはしない。** Lean `4.33.1`／Mathlib commit `0df444a3`、アーカイブのSHA-256、標準3公理 `propext`／`Classical.choice`／`Quot.sound` を検証記録から再現可能に引用する。

### AFR23 数理的主役：零点をどう素数の和から検出するか

1. 既存`ANT5/7/8`と接続し、原始Dirichlet指標`χ`に対して平滑化和 `S_χ(x) = Σ_{n≤x} Λ(n)χ(n)(x/n−1)` を定義する。`Re(s)>1`で項別積分を正当化して、そのMellin変換が `−(L'(s,χ)/L(s,χ))/(s(s−1))`となることを手で示す。主指標・`s=1`での補正は別に扱う。
2. 原始・非原始指標、例外的な極、複素共役、関数等式の適用条件を説明する。片側上界・特定区間`[Y,Y^(3/2)]`・正係数線形結合がどのように零点の寄与を検出するかを、まず有限次元の小模型から説明する。
3. Rubinsteinの解説に現れる主不等式`(M)`と補助見積もり`(B),(C)`を正確に記載し、`(M)+(B)+(C) ⇒ RH`の**どこまで人間可読文献内で証明済みか**を表にする。`(M)`自体はこの作業稿ではLeanの結果を引用しており、数学的証明済みとは装わない。
4. 演習の核は重みを変えたMellin計算、極が生む漸近、Dirichlet文字の直交と非相殺、零点に関する量化順の確認。数値実験は検算だが証明を代替しない。

### AFR24 数理的主役：主不等式の依存地図と形式的認証

1. **解析的還元** → 素数冪に対応する整除性 → CM楕円曲線の局所モデル → 反復theta lift・unitary/orthogonal dual pair → 周期積分・seesaw・Rallis内積 → 格子の共体積・傾き評価 → Hecke固有空間射影で発生する分母とGaloisコホモロジー → パラメータ選択 → GRH、の各辺に対象・定理・仮定・中間式の所在を付ける。
2. 低ランク／有限群の実例で、表現の整除性、射影の分母、局所・大域`H^1`の制限を確認。`ANF14〜21`、`IWA7,9,18〜20`、`AFR19〜22`の必要な具体例を直接参照する。
3. Robin Zhangの節2〜6を論証上の**暫定案内**に利用。Bost傾き法・Harder–NarasimhanなHermitian格子、Ferrero–Washingtonの`μ=0`、Tate–Poitou双対、変形環・高ランクGalois表現・p進Hodge等の深い外部入力は、基礎3系列の66講で完証したとは扱わない。元論文の実在する命題・仮定を確認してから参照する。
4. **形式検証の再現可能性:** 原著者の14分割アーカイブ、Lean/Mathlibの固定版とSHA-256、RHのMathlib正規命題への一致、5定理の仮定なしの形、`sorryAx`依存・公理・kernel replay・Rustの`nanoda`・`con-leche`等の役割を比較する。全17M行のローカル再コンパイルは受講者に強制せず、実際の検証ログを読み、小さなLean証明・命題同値・意図的な`sorry`反例を自分で再現する。
5. **数学的理解の到達条件:** Rubinstein原稿の`(M)`を真と仮定した後の解析的帰結を再導出し、`(M)`の各主要入力について「出典、仮定、なぜ必要か、対応Lean宣言、証明済／自然言語化中」を列挙できること。第三者のkernel検証成功を自分の数学的査読と称さない。

### 未完の自然言語再構成を管理する方針

- **形式的に証明された定理**、**外部標準定理**、**Leanコードから引用したが人間向け証明が未記載の補題**、**検討中の自然言語説明**を別ラベルにして追跡する。古い「独立検証なし」の説明は更新後の主要説明として残さない。
- 一般化の限界（Dirichlet GRHか、より一般のL関数か）を全箇所で確認する。p進`L`関数の主予想をRH証明そのものと同一視しない。
- AFR1〜AFR24の**24講は保型表現科目として維持**し、AFR23/24は解析的還元と依存地図・形式認証への橋渡しを担当する。数学の核心である主不等式(M)とそのCM・theta・算術格子・Galoisコホモロジーの証明を二講に圧縮せず、[RHP1〜RHP20の独立研究講読PLAN](DREAM_THEATER_RIEMANN_HYPOTHESIS_PROOF_STUDY_PLAN.md)が所有する。全系列の設計値は計86講（22+20+24+20）で、今後の人間可読な証明の進展に応じRHPの講数を明示的に見直す。

## 各章の完成条件

- 定義前の動機、直接例、formal statement、証明の見取り図、閉じるべき主要補題、例・演習・解答（A4/B3/C1以上）を完成。準同型・表現の左右作用、中心指標、Haar測度の規格化、無限素点、行列表現、収束の交換を曖昧にしない。
- 外部の高度な定理は証明の出典・適用条件・再現可能な小モデルと、**この講義では証明しない範囲**を明記。後続の中心定理の証明を原則として閉じる規約に沿い、未閉鎖を完了としない。
- 研究発表の評価を既知の数学と混同せず、ニュースが変わっても過去の確度ラベルを消さない。
- `AFR1`執筆時、`plans_progress/`へPLANを移動し、`textbook/dream-theater-series/AFR.yaml`に24講`planned`を追加。`completed`は本文と数理・読者査読、CIが揃った章だけ。公開目次は完成章だけ。シリーズ完了後の横断査読・ルーティング一致を経て`plan_done/`へ移動する。
