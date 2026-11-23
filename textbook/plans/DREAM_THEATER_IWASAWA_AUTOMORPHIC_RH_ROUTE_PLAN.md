# DREAM THEATER 岩澤理論・保型形式／保型表現・リーマン予想（履修ルート）

設計初版: 2026-11-21 JST／改訂: 2026-11-23 JST  
状態: 4系列を横断する設計。**現行案86講（ANF22・IWA20・AFR24・RHP20）**。ANF22講は完了、IWAは第1講を実装し、AFR・RHPは設計段階。横断ルート自身は講義を所有しない。  
正本: [ANF 22講](../plans_progress/DREAM_THEATER_ALGEBRAIC_NUMBER_THEORY_CLASS_FIELD_THEORY_PLAN.md)、[IWA 20講](../plans_progress/DREAM_THEATER_IWASAWA_THEORY_PLAN.md)、[AFR 24講](DREAM_THEATER_AUTOMORPHIC_FORMS_REPRESENTATIONS_PLAN.md)、[RHP 20講](DREAM_THEATER_RIEMANN_HYPOTHESIS_PROOF_STUDY_PLAN.md)。

## 0. なぜ基礎3系列とRHの独立研究講読を分けるか

既存教材では `NT`（初等整数論）、`ANT`（解析的整数論・RHの標準命題）、`MF`（正則モジュラー形式）、`EC`（楕円曲線）が完成している。ここからいきなり「岩澤理論」と「保型形式」を独立に追加すると、代数的整数論・局所体・類体論が定義されていないまま使用され、しかも既存`MF`の重複になる。

**中心問いを分ける:**
1. **ANF1〜ANF22**（22講）: 数体・イデアル・局所体・局所／大域類体論を自力で計算できる基盤にする。
2. **IWA1〜IWA20**（20講）: 円分`Z_p`塔を通して類群・単数・p進L関数がどうつながるか。
3. **AFR1〜AFR24**（24講）: 古典的`MF`から保型表現、theta対応・周期・跡公式に進む。AFR23/24は解析的還元と形式的認証の橋渡しをする。
4. **RHP1〜RHP20**（計画上20講）: RH・Dirichlet GRH形式証明の数学的再構成。主不等式(M)、CM素点、theta kernel、格子傾き、相対跡公式、Galoisコホモロジー、形式的検証まで独立した学習サイクルで扱う。

**設計時点の合計: 22 + 20 + 24 + 20 = 86講。** 既存の完了教材`NT/ANT/MF/EC`の講数は含まない。66講への固定は撤廃。2026-11-21以降にLean/Mathlibの認証と人間可読な証明の解説が進んだため、長大な証明の核心をAFR23/24の2講へ押し込まずRHPに独立させた。20講は論証単位から導いた**現行設計値**であり、証明の自然言語化が進めば必要な分割・統合を明示的に行う。未検証の補題を水増しせず証明済みとも扱わない。

~~~text
RNG / FLD / GRP / AG1 / NT
                │
                └── ANF1-8（数体・類群・単数・ζ）
                       └── ANF9-13（p進・局所体）
                            └── ANF14-22（群コホモロジー・類体論）
                                  │             │
                                  ↓             ↓
                           IWA1-20      AFR8-18（アデール・表現）
                                  │             ↑
                       ANT2-8 ───┼─────────────┤
                           MF1-8 ├──→ AFR1-7   │
                             EC ─┤             ↓
                                  └──── AFR19-22（theta・周期）
                                            │
                              ANT7-8 ＋ IWAの必要部分
                                            ↓
                              AFR23-24（解析的還元・形式認証の入口）
                                            ↓
                                 RHP1-20（RH/Dirichlet GRH証明の専門研究講読）
~~~

- `AFR1〜7`は`MF/ANT`だけで独立に開始可能。`ANF`が未完了だから全AFRを一括ブロックしない。
- `IWA1`の直接前提と`AFR8`以降の直接前提は、各講の`chapter.yaml`執筆時に最小化。未実装講を既証明の根拠にしない。
- `IWA20`と`AFR24`の間で循環を作らない。RHの専門講読RHPの必要部分だけIWA/AFRを参照し、IWA20はAFR/RHPの将来結果を証明済み扱いしない。RHPの早い解析的講は完成した`ANT/CA12`だけで着手可能、RHP中盤の高次保型・局所体講はANF/IWA/AFRの実装を待つ。
- 岩澤主予想とRiemann予想は**別の命題**であり、どちらかが他方を直接含意するかのような単純化はしない。

## 1. 書誌・講義資料との比較

**数学的な進度の採用根拠:**

| 学修分岐 | 教科書・公開テキスト | 得られる構成上の利点 |
|---|---|---|
| 数体から局所・大域 | Neukirch *Algebraic Number Theory* / Milne *Algebraic Number Theory*・*Class Field Theory* / MIT 18.785 | 類群・単数・局所相互法則をIWAの暗黙前提にしない |
| 無限円分塔からp進L | Washington *Introduction to Cyclotomic Fields* / Coates–Sujatha *Cyclotomic Fields and Zeta Values* / Sharifiの講義ノート | 岩澤代数・成長公式・主予想を段階的に配置 |
| 古典からアデール・表現 | Bump / Gelbart / Deitmar / Goldfeld–Hundley | 既存MFの再学習ではなく、局所・大域`GL_2`を新しい中心問にする |
| 形式的に認証されたRH／Dirichlet GRHの数学的再構成 | 2026-11-20付発表者メモ、Lean/Mathlib 11/21共同声明、Rubinsteinの164頁作業稿、Robin Zhang／Slijepčevićの予備ノート、MIT・Waterlooの検証ログ | 形式的正しさは認証済み。一方で主不等式(M)の自然言語による全証明は未完なので、20講の独立RHPとして核心論証を段階的に整理 |

参照URL・各文献の適用範囲は個別PLANに記す。教科書の説明・問題の転載をせず、現行本文のprerequisiteに沿って独自の中間式と演習を執筆する。

## 2. 2026年11月20〜22日のRH／Dirichlet GRH：検証済み範囲と数学的読解

**確認基準日: 2026-11-23 JST。** 初報の「著者による証明主張」だけで現在地を記述しない。2026年11月21日13:55付のLean/Mathlib共同声明（Lean FRO・Mathlib Initiativeが支持）は、Alpögeの**RHの命題と形式証明の正しさを認証**した。Waterloo大学Michael Rubinsteinの第三者確認およびMIT Andrew Sutherlandの検証記録は、**RHと全Dirichlet指標のL関数に対するGRH**について、独立のkernel検証・命題照合・公理依存調査を報告している。約1,700万行のLeanコードが形式的に通ることと、人間可読な数学的説明が完成すること、Clay Mathematics Instituteの公式問題認定は別事項である。

### 2.1 日時・主張・検証の区別

| いつ（公開時刻） | 一次資料で確認した事実 | 教材での評価 |
|---|---|---|
| 11月20日 | Levent AlpögeがClaudeとのRH／Dirichlet GRH証明と14分割Leanアーカイブを発表 | 原著者の発表。原著者の4ページメモは証明本文の代用にしない |
| 11月21日 | Lean・Mathlib共同声明がRHの命題・証明を**正しいと認証**。コンパイル、Mathlibの正規命題への一致、別実装kernel検証を根拠とする | 「独立検証が一切ない」という前回の記述は**失効** |
| 11月21日（UTC 10:10まで） | Rubinsteinの検証：175,187モジュールがコンパイル、5主定理の依存は標準3公理のみ、全モジュールのLean kernel replay成功、別実装のnanodaが依存1,484,729宣言を検証 | RHおよびDirichlet GRHの形式的検証が成立した強い根拠 |
| 11月22日16:20 UTC時点 | Sutherlandの報告：隔離環境での独立ビルド、nanoda/con-leche/con-ron、lean4lean、5主定理への独立比較が成功。一部の**重複する**長時間検証は継続中 | 完了済み検査と進行中の重複検査を区別。後者だけで既完了の検証を無効扱いしない |
| 11月23日確認 | ClayのRH個別ページには依然 `Unsolved` と表示 | 形式的証明の検証と、ミレニアム懸賞問題としての公式認定を同一視しない |

一次資料:
- 発表: https://alpo.ge/remark.pdf
- Lean・Mathlib共同声明: https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
- Rubinsteinの独立検証（ログ・再現スクリプト）: https://mrubinst.github.io/grh-lean-verification/
- Sutherlandの検証記録（2026-11-22 16:20 UTC更新）: https://math.mit.edu/~drew/grh/
- Clay数学研究所の公式RHページ: https://www.claymath.org/millennium/Riemann-Hypothesis/

**拡張結果の厳密な境界:** Dirichlet L関数のGRHから、Abel数体のDedekind ζのRHはArtinの指標分解を介して帰結する。ただしこれは、Leanで直接照合された5命題の一つではない。一般の非Abel数体・Hecke/保型L関数のGRHとは区別する。

### 2.2 何が証明されたか：Leanの5つの到達命題

原著者公開の`Main.lean`の主要宣言は `riemannHypothesis`, `riemannZeta_eq_zero_re`, `LFunction_ne_zero_of_half_lt_re`, `LFunction_eq_zero_re`, `LFunction_eq_zero_re_of_isPrimitive` である。前二者はζの非自明零点の実部1/2を主張し、後三者はDirichlet指標のL関数について右半平面での零点不存在／臨界帯内の零点の実部1/2を主張する。後者には法`N >= 1`、自明指標の極`s=1`の例外、原始／非原始指標の区別が必要。**任意のDedekind ζ関数、Hecke L関数、全保型L関数についての一般的GRHやExtended RHまで形式的に証明済みだとは書かない。**

RHの到達命題はMathlib標準`RiemannHypothesis`と照合済み。依存する公理は `propext`, `Classical.choice`, `Quot.sound` の3種。単に`lake build`が成功するだけでなく、暗黙公理がないこと、既存Mathlib定義が標準的ζ・Dirichlet L関数を表すこと、最終定理の仮定が閉じていることが検証に含まれる。

SutherlandはRHからRobin／Lagarias型の**整数の約数和に関する不等式**へ至る独立形式化との接続もチェックした。後続では`NT4`・`ANT8`の演習に接続する候補となるが、既存完了講の追跡監査は明示依頼なく行わない。

### 2.3 数学の証明を読むための新しい一次・専門解説

| 資料 | 現時点で読める主たる内容 | 完全な数学的証明との境界 |
|---|---|---|
| Rubinsteinによる164ページの作業稿（11/21） | Chebyshevの可除性対サイズ、平滑化した素数冪和、RHへ至る解析的還元、主不等式`(M)`、補助的なDirichlet文字評価`(B),(C)` | `(M)`そのものを自然言語で完証しておらず、Lean側の入力を明示して引用 |
| Robin Zhangの予備ノート（11/21） | 零点検出→保型周期の整除性→周期の大きさ→Galoisコホモロジーで分母を制御→パラメータ選択という論理地図 | AI支援で起草した草稿で、著者自身がLeanコードとの完全な忠実性は主張しない |
| 原著者の4ページメモ | Stepanovに由来する視点、反復theta lift、CM、Iwasawa tower、Bostの傾き法、seesaw／relative trace formula等の**研究経過** | 定理ごとの仮定・証明を述べる論文ではない。研究経過だけから証明の依存を確定しない |

- Rubinstein作業稿: https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper.pdf
- Rubinstein資料入口: https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/
- Robin Zhang予備ノート: https://www.ihes.fr/~rzhang/files/GRH%20note.pdf

**現段階の研究講読の到達点**は「形式的な正しさを何が担保したか」を説明し、「人間可読な証明のどの補題が既に再構成され、どの入力がLeanからの引用か」を一覧化できること。17,374,215行の全Lean証明を人間が通読したとは主張しない。

### 2.4 証明の数学的な依存関係と4系列の担当

1. **零点→素数冪和:** Dirichlet Lの対数微分、平滑化したvon Mangoldt和とMellin変換、零点による極、適切な片側上界から零点を排除する論理。正本は既存`ANT5〜8`と`AFR23`。Rubinsteinの`(M)`と補助評価`(B),(C)`の**関係を導出**し、(M)を未立証のまま教材独自に証明したと称さない。
2. **整除性→素数の和:** CM楕円曲線、整数構造、慣性素点での局所可除性、Stepanov型の重複度とtheta liftの反復。既存`EC`、`ANF4,11,13`、`AFR19〜22`を接続。一般の高ランク反復の核心は研究資料から必要補題を列挙。
3. **保型周期の大小・傾き:** Weil／theta対応、seesaw、Rallis内積、相対跡公式、整数格子の共体積・傾きの比較、Harder–Narasimhan・Bostの不等式。`AFR20〜22`は具体的な低ランク例と基礎積分を扱う。**算術的Hermitian格子の傾き・Bostの一般定理は基礎3系列で証明済みとはしない**。研究講読で正確な外部入力として固定する。
4. **分母・合同・Galois側:** Hecke固有空間への射影で生じる分母、Galois表現の剰余拡大、局所・大域`H^1/H^2`、Tate–Poitou、円分塔、`mu`不変量の消失、Ferrero–Washington・Selmer型群・Vandiver関連の条件。基礎は`ANF14〜21`・`IWA7,9,12,18〜20`。一般`p`進Hodge理論、変形環、`GL_n`の深い局所大域対応は別の外部入力として明示。
5. **最後のパラメータ選択:** 任意に大きいスケールの区間での上界、指標成分の非相殺、補助素数の選択、ゼロの不存在との結合。`AFR23〜24`では必要な不等式の量化順、例外集合、補間を追い、前段の未説明入力を消さない。

これらは**現時点の予備的な証明理解の地図**であり、AI生成自然言語草稿を、Leanと一対一照合済みの数学論文と混同しない。`AFR24`で利用する研究資料は更新日・版・対応するLean側宣言／証明箇所を記録し、変更があれば根拠を残す。

### 2.5 Lean形式検証と数学的理解を分離する監査プロトコル

1. **再現環境:** 原著者の14分割アーカイブと結合SHA-256 `9631b4f020199e580ba86178cb56c6e9b09f690c2369a80dc4334aa93f49c7fc`、Lean `v4.33.1`、Mathlib commit `0df444a3`を記録（Rubinsteinによる検証対象）。別版と混同しない。
2. **命題同値:** 正規のMathlib定義・独立のchallengeと五つの最終定理を比較し、全量化変数と極・自明零点・原始性の例外を監査する。
3. **形式的健全性:** `#print axioms`、`sorryAx`を含む依存閉包、公理／unsafeのスキャン、全モジュールのkernel replayと別実装kernelの受理を区別し、既に完了した第三者の記録を参照。全17M行のローカル再ビルドは**入門講義の履修条件にしない**。
4. **人間向け再構成:** 各中核補題について「正式な対象・仮定・結論 → 最小例 → 証明の主要中間式 → 参照する既証明結果 → Lean由来の未説明入力」の5点を記録。Rubinsteinの`(M),(B),(C)`、Zhangの節2〜6、Leanの`allChi`等の対応を照合する。
5. **更新条件:** 専門家の改訂解説が中核補題の役割を修正した場合は依存地図を更新。公式の受容や新たなL関数の証明を**既存RH/Dirichlet GRH検証から推測して**拡大しない。

**RHP1〜RHP20の独立系列を今回新設**する。基礎3系列は保型表現・岩澤理論の一般教育を所有し、`AFR23/24`は解析的還元と形式認証の入口、`RHP1〜20`は主不等式(M)の全体像・解析的帰結・theta／格子／局所大域コホモロジーの証明責務を所有する。現行自然言語文献で引用しているLean依存補題が完成したとは主張しない。[RHPの計画書](DREAM_THEATER_RIEMANN_HYPOTHESIS_PROOF_STUDY_PLAN.md)の数学的ゲートを満たすため必要なら講数を増減する。

## 3. 実装・査読・状態遷移

- 今回は**PLANの設計・文献照合・講数確定のみ**。series manifest、空の章、公開目次、global knowledge DAGには未実装章を先行登録しない。
- 最初の講が着手される際、対象PLANを`textbook/plans/`から`textbook/plans_progress/`へ**移動**し、当該系列manifest（ANFは既に`ANF.yaml`で管理中、IWA／AFR／RHPは着手時に新設）の`plan`と一致させる。全講を`planned`として登録し、本文・meta・必須査読・CIを終えた講だけ`completed`へ遷移させる。
- 新規講は変更区分C（すべての主要証明・全演習と詳細解答の自己再計算、別観点再読）。A4/B3/C1は最低数であり水増し禁止。初出専門語、仮定、定義域、素点、規格化、演習の使用箇所リンクを確認。
- 外部研究水準の定理を引用するなら、引用の厳密な適用条件、教科書で本当に証明済みの範囲、学生が追える小模型を記載。証明を閉じる目標を損なう場合は講数や対象を明示的に再検討する。
- 各系列が全講完了しても必要な横断依存監査・公開索引・CIまで完了した後にだけ`plan_done/`へ移動。ルートPLANは対象4系列の実装と横断監査を終えるまで`plans/`または作業開始後`plans_progress/`に保持する。

## 4. 最初に着手できる講

- **ANF系列の次講:** ANFは進行中であり、現在の完了境界・次講は`textbook/dream-theater-series/ANF.yaml`の先頭からの連続`completed`直後の最初の`planned`から導く。並行実装で日々変化するため、横断PLANへ固定の次章IDを複製しない。
- **AFR1:** 完成済み`MF`系列を直接再利用でき、ANF/IWA完了を待たず開始可能。
- **IWA1:** ANF22までの局所体・円分塔が完成した状態で着手し、有限層・閉部分群・位相的生成元を実装済み。次講はIWA2。
- **RHP1:** 既存`ANT3/7/8`と`CA12`の実在する完成本文を参照して、Leanの到達命題とRH/Dirichlet GRHの条件・例外を講義化できる。RHP中盤の高階保型・Galoisコホモロジーは未実装のANF/IWA/AFRを暗黙前提にしない。

講義IDと現行86講の内容を変更するときはこのルートと個別PLANの**双方**を同じPRで同期する。完了済み`NT/ANT/MF/EC` PLANは改稿しない。
