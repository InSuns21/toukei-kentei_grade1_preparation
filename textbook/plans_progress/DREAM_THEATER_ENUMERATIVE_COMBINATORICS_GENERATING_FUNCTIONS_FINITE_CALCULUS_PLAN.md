# DREAM THEATER 列挙組合せ論・母関数・有限差分法 PLAN

作成日: 2026-11-03  
状態: in_progress（2026-11-03 COMB1 着手。残章と系列横断監査は未完了）  
系列 ID: `COMB`（2026-11-03 に既存章・manifest との衝突なしを確認）

## 0. 目的と中心問い

**「何を同じものとみなし、どう分類して数えるか」「数列の規則をどう発見・証明するか」「離散的な変化・総和・漸化式をどう統一的に扱うか」**を一本の数学の道筋にする。

有限集合の計数、双射、二重計数、包除原理から始め、漸化式、有限差分と和分、形式冪級数、普通母関数（OGF）・指数型母関数（EGF）、群作用・半順序集合、係数漸近・計算法へ進む。公式の暗記ではなく、**数え上げ対象の構造から公式を導き、条件を確かめて別解で検算する**能力を中心に置く。

本 PLAN は列挙組合せ論（enumerative combinatorics）と離散微積分の体系的講座である。三種類の「差分」の境界を明確にする。

1. **有限差分／離散微積分**：数列のシフト、差分作用素、下降階乗、Newton 展開、和分、差分方程式。本 PLAN の正本。
2. **数値 PDE の差分法**：偏微分方程式の格子近似、整合性、安定性、収束性。既存 `FDM1〜4` が正本で、ここでは比較・橋渡しだけ行う。
3. **数値補間・ODE 数値解法**：丸め誤差や数値安定性を含む `NA4/NA6/NA7` が正本。Newton 前進差分補間の代数的恒等式とは区別する。

通常の統計検定1級対策教材は改組しない。確率母関数・離散分布・分配関数等への応用は後続横断演習で接続する。

## 1. 市販の標準教科書・公開テキストとの照合

以下の教科書・講義資料の内容配置、典型定理、証明レベルを参照する。**章構成や演習・詳細解答を翻訳・転載しない**。執筆時には著者の正誤表を確認し、例題・証明・演習を独自に作る。

| 文献 | 参照する主要範囲 | 本 PLAN での用途 |
|---|---|---|
| Ronald L. Graham, Donald E. Knuth, Oren Patashnik, *Concrete Mathematics*, 2nd ed. (Addison-Wesley, 1994)。[著者の紹介](https://cs.stanford.edu/~knuth/gkp.html)、[出版社の目次](https://www.pearson.com/en-us/subject-catalog/p/concrete-mathematics-a-foundation-for-computer-science/P200000000288/9780201558029) | 和と漸化式、有限微積分、二項係数、母関数、漸近法 | COMB2、COMB6〜10、COMB17 |
| Miklós Bóna, *A Walk Through Combinatorics*, 5th ed. (World Scientific, 2023)。[書誌・概要](https://books.google.com/books?id=worVEAAAQBAJ) | 初等計数、双射、包除、グラフ・順列・母関数 | COMB1〜5、COMB12〜16 |
| Herbert S. Wilf, *generatingfunctionology*, 3rd ed. (A K Peters, 2005)。[著者公開版案内](https://www2.math.upenn.edu/~wilf/DownldGF.html)、[出版社](https://www.routledge.com/generatingfunctionology-Third-Edition/Wilf/p/book/9780429108532) | 係数操作、漸化式、OGF と EGF | COMB8〜13 |
| Richard P. Stanley, *Enumerative Combinatorics*, Vol. 1, 2nd ed. (Cambridge, 2012)。[著者目次](https://math.mit.edu/~rstan/ec/ec1toc.html) | 包除／篩、半順序集合と Möbius 反転、順列統計、有理型母関数 | COMB3/5/14〜16 |
| Philippe Flajolet, Robert Sedgewick, *Analytic Combinatorics* (Cambridge, 2009)。[著者側サイト](https://ac.cs.princeton.edu/home/)、[目次](https://algo.inria.fr/flajolet/Publications/AnaCombi/contents.html) | 標識・非標識の組合せ構造、合成、係数漸近 | COMB10〜13/17（発展） |
| Walter G. Kelley, Allan C. Peterson, *Difference Equations: An Introduction with Applications*, 2nd ed. (Academic Press, 2001)。[著者の紹介・目次](https://www.math.unl.edu/~apeterson1/sample_kp.html) | 差分方程式、初期値、線形理論 | COMB7〜8 |
| MIT OCW, *Mathematics for Computer Science*（6.042J）。[公式講義ノート](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/readings/) | 計数、漸化式、母関数の初学者向け導線 | COMB1〜4/9〜10 |

**編集上の停止線**：
- 形式冪級数の恒等式と解析関数の等式を混同しない。前者は係数ごとの有限性、後者は収束域・演算の適用条件を示す。
- Flajolet–Sedgewick の一般の特異点解析・鞍点法を、複素解析の prerequisite なしで標準公式として使わない。
- 教科書の目次数・学期の回数を章数へ転写しない。中心問いと証明・演習の学習サイクルから適切な分割を決める。

## 2. 既存の canonical owner と重複しない境界

| 既存資産（現行 main の実在章・系列） | 所有する内容 | 本 PLAN が行うこと |
|---|---|---|
| `F0-00A`、`F0-00A1C`、`F0-00A1D` | 集合・写像・集合族・半順序の基礎 | 有限集合の具体的計数へ適用。基本定義の重複を避ける |
| `RA1` | 数列、級数、解析的冪級数と収束半径 | 収束を要求しない形式冪級数環と係数抽出を導入して差を説明 |
| `NT4`・`NT5` | 算術関数・Dirichlet 畳み込み、約数順序の Möbius 反転 | 有限半順序集合の incidence algebra と一般反転を扱い、NT5 の約数和証明を重複しない |
| `SGT1〜8` | グラフ Laplacian・スペクトル・ランダムウォーク | 木・格子路・グラフ構造の**数え上げ**に専念し、スペクトル理論を再説明しない |
| `FDM1〜4`、`NA4`、`NA6〜7` | PDE 数値差分、数値補間、数値 ODE | 有限差分の記号的代数・和分を担当。打切り誤差・安定性は既存正本へ |
| `CPLX1`、`DOPT` | 計算量と離散最適化 | 計数 DP・列挙アルゴリズムの正しさを扱う。一般複雑性・最適化の重複を避ける |
| 確率論 P 系、`SM`、`HDP` | 分布・物理的分配関数・集中評価 | 確率母関数等への接続例のみ置き、基礎確率の定義・証明を新設しない |

実装着手時、必要な `chapter.yaml`・`knowledge.yaml`・`textbook/knowledge-dag.yaml`・直接 prerequisite の本文を読み、各 stable anchor の実在と定義初出順を再確認する。この表は**設計時の owner 候補**であり、全章に一律の prerequisite を付ける根拠ではない。

## 3. 章構成案（仮 ID。講数・学修期間は可変）

配置案：`textbook/volumes/dream_thater/計算系/COMB/COMB<n>/`。登録前に系列 ID、公開科目名、科目分類との整合を再点検する。以下の18項目は証明・学習サイクルの検討単位で、**18章ノルマではない**。独習に必要なら分割、同じ中心問いなら統合する。

### A：数え上げの基礎

| 仮 ID | 中心問い・扱う内容 | 主要証明と詳細演習の要点 |
|---|---|---|
| `COMB1` | 何を一つと数えるか：有限集合、加法・乗法原理、双射、二重計数、鳩ノ巣原理 | 同じ対象の二通りの分割による恒等式。写像の単射・全射と「重複なし」を実際に検証 |
| `COMB2` | 順列、組合せ、多重集合：二項・多項係数、stars and bars | 二項・多項定理の組合せ的証明、仕切りと非負整数解の双射、境界条件 |
| `COMB3` | 禁止条件の除去：包除原理、錯置、制約付き配置、篩 | 指示関数から包除、錯置数の包除式と漸化式を独立に導出 |
| `COMB4` | 数え上げと再帰：格子路、括弧列、Dyck 路、Catalan 数、根付き木 | 最初の帰還・根での分割から Catalan 漸化式、格子路反射原理との比較 |
| `COMB5` | 順列と集合分割：第一・第二種 Stirling 数、Bell 数、Eulerian 数 | 新しい元の挿入による漸化式、下降数など順列統計の定義と例 |

### B：有限差分・離散和分・差分方程式

| 仮 ID | 中心問い・扱う内容 | 主要証明と詳細演習の要点 |
|---|---|---|
| `COMB6` | 微分の離散版：シフト、前進・後退差分、下降階乗、差分表 | $\Delta\binom{x}{k}=\binom{x}{k-1}$ と Newton 前進展開の多項式版を基底展開から証明 |
| `COMB7` | 和を「積分」する：不定和分、部分和分、べき和、二項反転 | 離散積の法則と部分和分の境界項、$\sum_{j=0}^{n-1}\binom{j}{k}=\binom{n}{k+1}$、二項反転の両方向 |
| `COMB8` | 漸化式を解く：一次・高階の定数係数線形差分方程式、初期値、特性根、重根、非同次項 | 反復解の一意性と非零重根 $n^j\lambda^n$ の理由、零根の例外と初期添字、母関数法との対応。非線形差分方程式の安定性一般論は別系列の範囲 |

### C：母関数と構造の組合せ

| 仮 ID | 中心問い・扱う内容 | 主要証明と詳細演習の要点 |
|---|---|---|
| `COMB9` | 収束抜きで無限級数を使う：形式冪級数、係数抽出、積・逆数・合成、普通母関数（OGF） | Cauchy 積の係数畳み込み、逆元の条件、合成の定数項 0 条件。解析的収束と明確に区別 |
| `COMB10` | 構造の分解を式にする：和・積・列・再帰仕様、合理型 OGF、漸化式との対応 | 局所有限な分解から式を導く。サイズの加法性・分解の一意性・標識の扱いを証明 |
| `COMB11` | 整数分割と制限付き数え上げ：Euler 積、生成関数、コイン交換 | 形式的無限積の係数ごとの有限性と分割の双射。五角数定理は証明を閉じられる節へ分割するか発展に明示 |
| `COMB12` | 標識付き対象を数える：指数型母関数（EGF）、標識付き積、指数公式 | EGF 積の二項係数の意味、集合分割の Bell 数、連結成分分解。OGF との比較 |
| `COMB13` | 再帰的構造を係数へ戻す：形式的陰関数、Lagrange 反転、Catalan 数・根付き木 | 形式的解の存在一意性と反転公式の仮定・核心証明。単なる定理適用にしない |

### D：対称性・順序・漸近・計算法

| 仮 ID | 中心問い・扱う内容 | 主要証明と詳細演習の要点 |
|---|---|---|
| `COMB14` | 回転や置換を同一視して数える：群作用、軌道、Burnside の補題、Pólya 計数／cycle index | 固定点と軌道の二重計数による証明、彩色の群作用・軌道の直接確認 |
| `COMB15` | 順序関係上の反転：有限 poset、区間、incidence algebra、Möbius 関数と反転 | 三角的な逆元の導出、Boolean 束の包除、約数順序の NT5 との対応 |
| `COMB16` | 重み付き計数：二変数母関数、パラメータ標識、$q$-二項係数、順列統計 | 格子路面積などによる $q$-二項係数の意味、$q\to1$ で戻る条件 |
| `COMB17` | 係数の増大を予測：合理型母関数の部分分数、極と指数成長、基本漸近 | 主要極からの係数の出発点を導出。同絶対値の極を無視しない。一般転移定理は複素解析の十分な prerequisite を持つ発展分岐へ |
| `COMB18` | 式がなくても正しく数える：動的計画法、転送行列、再帰メモ化、列挙アルゴリズム | DP 状態不変条件と漏れ・重複なしの証明。小さい $n$ の全探索・母関数係数・DP の独立照合 |

**履修の線**：
- 基本線は `COMB1→2→3→4→5→6→7→8→9→10→11→12→13`。`COMB14〜18` は直接依存を精査して独立分岐を許す。
- 母関数先行コースは `COMB1〜4→COMB9〜10→COMB12`。有限差分全体を前提にしないが、形式冪級数を飛ばさない。
- 差分法への橋は `COMB6〜8→FDM1` の対比教材であって FDM1 の現行前提 `PDE3/NA7/NA8` を勝手に変更するものではない。
- 漸近の発展は `COMB9〜13→COMB17` に `RA1`、必要な `CA` 系複素解析を加える。

## 4. 定義・証明の owner と前提設計

1. `COMB1〜5` が初等計数と Catalan/Stirling/Bell/Eulerian 数の導入を所有する。`COMB4` と `COMB10/13` の Catalan 数は**同一結果の異なる証明機構**として対応を示し、定義はリンクして再利用する。
2. `COMB6〜8` が有限差分・離散和分・線形差分方程式の数学的正本。PDE の数値差分スキームをここへ移さない。
3. `COMB9` が形式冪級数の演算・係数抽出の canonical owner。`COMB10〜13` は具体的な演算可能条件へリンクする。EGF の係数に $n!$ を割る際は基礎環の標数 0 と可逆性を明記する。
4. `COMB14` の群作用は既存 `GRP` 章に同じ定義があるか着手時に確認し、既存定義を使う場合は実在 stable anchor を援用する。
5. `COMB15` では有限 poset と整数の約数順序を区別する。`NT5` の証明を一般 poset の証明として飛躍的に引用しない。
6. `COMB17` で解析的係数漸近を述べる際、収束円・孤立特異点・複数支配極・誤差項の仮定を固定する。
7. 直接 `prerequisites` は章ごとに定める。初期候補は `F0-00A`、`F0-00A1C`、`F0-00A1D`、自然数の帰納法と数列、必要章に `LA`・`RA1`・`GRP`・`NT4/5`・`CA`・`CPLX1`。到達可能な既習定義と本文の使用位置をすべて照合する。

## 5. 代表的な厳密検算のチェックポイント

| 題材 | 出発点から再導出する式・条件 |
|---|---|
| 二重計数 | $\sum_k k\binom{n}{k}=n2^{n-1}$ を「印付き元を持つ部分集合」で二通りに数える |
| 包除 | $D_n=n!\sum_{k=0}^n(-1)^k/k!$ と $D_n=(n-1)(D_{n-1}+D_{n-2})$、$D_0=1,D_1=0$ を照合 |
| Catalan | $C_n=\sum_{i=0}^{n-1}C_iC_{n-1-i}$ と $C_n=\binom{2n}{n}-\binom{2n}{n+1}$ の双方を証明 |
| 有限差分 | $\Delta x^{\underline{k}}=kx^{\underline{k-1}}$、部分和分の境界項、$\Delta\binom{x}{k}=\binom{x}{k-1}$ |
| 形式母関数 | $[x^n]A(x)B(x)=\sum_{k=0}^na_kb_{n-k}$、逆数と合成の定義域 |
| EGF | $\exp(e^x-1)$ と Bell 数、$B_3=5$ を集合分割の列挙と照合 |
| Burnside | 正方形の頂点の二色彩色で固定点平均と軌道直接列挙を一致させる |
| Möbius | $\mu(A,B)=(-1)^{|B\setminus A|}$（Boolean 束）と約数順序の例を分離 |
| 漸近 | $[x^n](1-x)^{-r}=\binom{n+r-1}{r-1}\sim n^{r-1}/(r-1)!$（整数 $r\ge1$）の係数検算 |
| 計算 | 全探索・DP・母関数係数を小さい入力で突き合わせ、空集合と $n=0,1$ を必ず含む |

## 6. 演習・品質規約

- 新規執筆では原則として**各章 A4/B3/C1 以上、全問に詳細解答**。最低数に達しても主要 learning objective や反例の練習が足りなければ増やす。
- 組合せ的証明・代数計算・漸化式／母関数の異なる観点を、価値があるときに比較する。別解のための水増しはしない。
- 典型的な失敗を扱う：**区別の有無、空の場合、重複計数、添字シフト、初期条件、形式的無限積の局所有限性、負添字、差分の符号、極と収束条件**。
- 主役の定義を形式文より前に通常文で導入し、具体的な直接例で非自明条件まで検証する。既習の定理・定義を実際に使う位置から canonical stable anchor をリンクする。
- 「整理すると」「同様に」だけで二段以上の非自明な計算を隠さず、適用対象・次数・添字・基底・評価点・中間式を示す。
- 列挙コードや小規模表は定理の**検算**であり、全称的証明の代わりにしない。Dyck 路・群作用などの図は対応関係が実質的に読める場合だけ作り、色以外の識別と本文内の完全な説明を残す。

## 7. 実装・公開・完了の手順

1. 着手時に既存章 `F0/GRP/NT5/RA1/CA/FDM` 等の本文・metadata と知識 DAG を再照合し、直接 prerequisite と stable anchor を確定する。
2. PLAN 固有の実装を始めるコミットで本ファイルを `textbook/plans_progress/` へ**移動**し、`textbook/dream-theater-series/COMB.yaml` を登録する。章 status と `plan` のパスは同じ作業単位で管理する。設計だけの現段階では manifest に架空の進捗を記載しない。
3. `textbook/volumes/dream_thater/計算系/COMB/COMB<n>/` に各章の `index.md`・`chapter.yaml`・`knowledge.yaml` を作る。正式 ID・章境界は実装時に確定する。
4. `textbook/dream-theater-toc/040_計算系/` の科目別目次ソースへ公開導線を追加する。生成物 `textbook/dream-theater.md` はコミットしない。
5. 新規章（変更区分 C）は**全主要証明・全演習詳細解答の自己再計算**と、完成本文の**別観点再読**を分けて記録する。定義・前提・直接リンク・題数・reader granularity を監査する。
6. leaf chapter は changed-only validation、global index・knowledge DAG・規約等の全体波及変更は full validation に昇格する。常に現行 `textbook/AGENTS.md` と `textbook/DREAM_THEATER_AUTHORING_STANDARD.md` を正本とする。
7. 全 learning objectives、総合演習、横断リンク、公開導線、CI、数学・読者粒度査読が揃って初めて `textbook/plan_done/` へ移動し、manifest の `plan` と直接参照を同時更新する。

**完了基準は章数ではない**。対象の定義、主要定理と証明、全演習と詳細解答、形式母関数・差分操作の成立条件、既存科目との ownership が独習者に追えるかで判定する。

## 8. 本 PLAN と分ける発展分岐

- 一般の特異点解析・鞍点法・多変数漸近は、複素解析と解析的組合せ論の十分な前提を整えた別 PLAN 候補。
- Young 図形、対称関数・表現論、置換パターン回避、Ehrhart 理論、組合せ的 species の本格理論は、独立した中心問いが成立するなら別 PLAN とする。
- Gosper 法・creative telescoping・Wilf–Zeilberger 型証明は、計算機による恒等式証明の発展候補。hypergeometric 項の定義域、境界項、証明書の検算なしに導入しない。
- ランダムグラフ・確率的組合せ論・分配関数の応用は `P/HDP/SGT/INFO/SM` と役割分担し、際限なく本系列へ取り込まない。
