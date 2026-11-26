# DREAM THEATER Riemann予想・Dirichlet GRH形式証明の数学的再構成（RHP1〜RHP34）

設計初版: 2026-11-23 JST / 文献更新: 2026-11-26 JST（Sernau短縮Lean二版、Adriazola 11/24版、Rubinstein v2、MIT 11/24更新）  
状態: **未着手・計画上34講**（独立研究講読）。章本文・`chapter.yaml`・`knowledge.yaml`・系列manifestは未作成。証明の自然言語化の進展で講義数を変更してよい。  
系列ID: `RHP`。分類: 代数系／解析系を横断する数学研究講読。  
履修ルート: [岩澤理論・保型表現・RH研究ルート](DREAM_THEATER_IWASAWA_AUTOMORPHIC_RH_ROUTE_PLAN.md)。

## 1. 独立34講が必要な理由

2026年11月20日、Levent AlpögeはClaudeと発見したRH・Dirichlet L関数のGRHのLean形式証明を公開した。11月21日、Lean/Mathlib共同声明はRHの命題と形式証明を認証した。Michael Rubinstein（Waterloo）・Andrew Sutherland（MIT）の第三者検証もRHとDirichlet GRHを含む5つのLean定理の型・標準公理のみへの依存・kernel検査を報告する。一方、Rubinstein主導の解説は11月21日のv1（164頁）から11月22日のv2（265頁）へ拡充したが、主要不等式(M)の証明にはLeanから引用した入力が残り、人間が追える完全な数学的論文にはまだなっていない。v2は(M)を13個の仮定(H0)〜(H12)に還元し、構成対象・レムニスケートの具体例・外部定理の棚卸しを追加した。

11月24日版のJimmie Adriazolaによる287頁の再構成は、論理の骨組みを精密化し、Hecke非退化性・Bessel級数・共体積・Selmer窓の具体的な論証と未証明仮定を開示した。これらを独立の学修単位へ分割し、従来の23講を34講へ改訂する。自然言語論文を独立検証済みとはしない。

既存完成`ANT7/8`・`MF1〜8`・`EC`と、新規`ANF`（数体・類体論）・`IWA`（円分塔）・`AFR`（保型表現）を基盤として使う。`AFR23/24`は**解析的還元／検証状況の短い横断導入**に留め、長大な証明を二講で済ませたことにしない。本PLANは形式的正しさの事実を認めたうえで、数学的機構を**定義・仮定・核心計算・外部入力まで区別して紙上で再構成する**独立の研究講読である。

**定理のスコープ:** 認証された定理は`RiemannHypothesis`とDirichlet指標のL関数のGRH（全法・原始／非原始を含む）。一般Hecke L関数、非可換／一般数体のDedekind ζ、全保型L関数のGRHやExtended RHをLeanが直接形式証明したとは主張しない。ただし**Abel数体のDedekind ζのRH**はDirichlet L関数の積分解からの論理的帰結なので、結果の数学的帰結と直接形式化した命題を明確に分ける。

## 2. 文献と検証：エビデンスの階層

| 資料 | 強み・使い方 | 検証状況の扱い |
|---|---|---|
| Levent Alpöge, 4-page `remark.pdf`（2026-11-20） | 発見過程・Stepanovの発想、CM、theta lift、Iwasawa塔の原著者説明 | 証明全文・詳細な補題の提示ではない |
| Lean・Mathlib共同声明（2026-11-21 13:55） | RHの正規Mathlib命題・形式証明の一致、複数kernelによる認証 | **形式的正しさを強く支持** |
| M. Rubinstein独立検証（2026-11-21） | 175,187 module、標準3公理、Lean replay・nanoda、5最終命題 | 形式的検証の再現可能な根拠 |
| A. Sutherland独立検証（2026-11-24 05:25 UTC更新） | 隔離ビルド、exportのバイト一致、nanoda・con-leche、lean4lean、con-ron等、Lean通常／paranoid kernel、Comparator v4.33.0 | v4.36.0のlake comparatorはこの時点で実行中。完了済検査と区別 |
| J. Adriazola, *The Alpöge Proof of the Riemann Hypothesis*（11/24版、287頁） | §2–18の解析的還元・算術的Stepanov法・7条件・theta鎖・Hecke損失・Bessel周期・高さ・twisted placesと最終組立て | §18.7に未閉鎖の内部仮定・外部文献適用が明記される。§17.4.3のK1代替論証はLean未形式化・独立査読待ち |
| *An Arakelov-theoretic perspective on the Alpöge–Claude argument on RH*（11/22付） | §2の平均傾き不等式、§3のCM点・Shimura集合上の評価写像、§4の局所利得・零点評価・算術的Hilbert–Samuel型評価 | 傾き法の補足解説。未証明の部分は概略的な仮定として記載されており、全証明の独立確認ではない |
| M. Rubinstein主導（Claude/Codex/Gemini協力）, *The Alpöge–Claude proof ... for the Riemann zeta function*（v1:164頁、11/21／**v2:265頁、11/22**） | RHへの解析的還元、補助評価(B)/(C)の証明、Part III §§III.10〜III.13の構成対象・13仮定への還元・レムニスケート例・外部結果の一覧 | **v2でも(M)と(H0)〜(H12)は自然言語では全証明されていない**。資料の版と節を固定 |
| R. Zhang, *A Preliminary Note ...*（11/21） | prime powers→保型周期→分母とGalois cohomology→パラメータの論理地図 | AI支援の予備的解説。Leanとの逐語・項目一致を断言しない |
| S. Slijepčević, *Outline ...*（11/21） | window positivity／Hermitian格子／Tate twist群／局所大域の概要 | 著者自身が未理解の部分を明示するアウトライン |
| Y. R. Pei, *A roadmap ...*（11月） | Lean依存の絞り込みとStepanov型設計の仮説的解釈 | 初版は独立検証前に執筆。古い「未検証」記述は日付付き履歴のみ |

一次・準一次資料:
- https://alpo.ge/remark.pdf
- https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
- https://mrubinst.github.io/grh-lean-verification/
- https://math.mit.edu/~drew/grh/
- https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/
- https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper_v2.pdf （**学習時の基準版**、2026-11-22、265頁）
- https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper.pdf （比較用のv1、2026-11-21、164頁）
- https://www.ihes.fr/~rzhang/files/GRH%20note.pdf
- https://hexagonmath.org/pdf/2611.00812v1
- https://peabrane.github.io/files/pei-2026-claimed-lean-proof-rh-roadmap.pdf
- https://www.claymath.org/millennium/Riemann-Hypothesis/ （11/23時点の公式掲載は`Unsolved`）

参照資料間に食い違いがある場合、日付・Leanの固定版・型付き命題・使用した数学的仮定を先に照合する。原著者の研究経過と、後発解説による仮説的な依存地図を同一視しない。教科書と外部論文の文章・演習は転載しない。

### Rubinstein v2（2026-11-22）の進展と証明責務

- **解析的還元（Parts I–II）:** 重み付き素数冪和の評価に使う主不等式(M)と、適切に選んだ補助素数について成立する補助評価B/Cを区別する。B/CはPart III §§III.1–III.2で引用文献の定理から証明されているが、(M)の全証明はこの論文にはない。
- **構成（§III.10）:** CM拡大体、Hermitian空間・格子、theta kernel、反復写像、重み・レベル・平行移動とラベルのデータを先に定義する。基本補題の証明と、Leanから仮定する実在・整数性・サイズ評価を別欄にする。
- **13仮定への還元（§III.11）:** **(H0)〜(H11)から1つのスケールで(M)を導く**（Theorem M／Corollary M9）。**(H12)は必要な区間の全てのスケールでこれらのデータと適切な補助素数が存在するという一様な供給条件**であり、これらからRHを導く（Corollary M11）。13仮定のいずれもv2では無条件には証明されていない。導出がLeanの命題に依存する(H0),(H1),(H6),(H8),(H10),(H11)、引用される(H7)、未立証の(H2),(H3),(H5),(H9)、一部未立証の(H4)、供給条件(H12)を別々に検証する。
- **モデル例（§III.12）:** レムニスケートのサイズ・整除性の計算は古典的結果から再現可能な**部分構成の例**。これを(M)や全13仮定の証明と誤認しない。
- **外部結果（§III.13）:** Lean開発が「published results」として束ねた**195件の形式的エントリ**を列挙する。重複・未使用枠・弱形式の定理が含まれるため「195個の独立に適用済みの定理」ではない。v2の文献対応は著者自身が記憶に基づく暫定案と記しており、原典と仮定の照合が必要。
- **検証の階層:** Leanの最終定理・使用公理・kernel再検証による形式的検証と、v2の各補題の**自然言語での証明済／条件付き／引用／未立証**を別の記録にする。定理の形式的認証を「v2のすべての論証が紙上で証明された」と読み替えない。


### Adriazola 11/24版：固定版と読み方

参照先は [11/24版のREADME](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/README.md)、[287頁原稿](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/manuscript/main.pdf)、[STATUS](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/docs/STATUS.md)。参照コミット `aa9c86bf2a7d29b08575641fecea19a2a603e87c`（2026-11-24 16:27:32 UTC）。数学の参照には変更されるmainの頁番号だけでなく、固定コミットのTeXファイル、節名・ラベルを併記する。

- 11/22の66頁・依存グラフの残差0は、766,788宣言を依存同定・既存パッケージ・外部境界に分類した結果であり、自然言語での全証明完了を意味しない。11/23の225頁への増補と同日夕方の訂正では未列挙のGSp4の議論、RegDet、異なる点をまたぐpatching、AdjointLiftingTheorem、未登録の外部理論が指摘された。11/24の287頁版はこの進展を受けて§14の体積・旗・減衰・近軌道評価、§17の基底変換と古典的保型点・コホモロジー一様評価を追加した。
- [依存地図](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/docs/PROOF_DEPENDENCY_MAP.md)と[外部定理一覧](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/docs/EXTERNAL_THEOREMS.md)は11/21時点の状態・旧66頁版の節番号を含む。11/24の現行証明責務にはそのまま転用せず、[§18.7のTeX](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/manuscript/sec18_assembly.tex)の `sec:frontier` と本文の実際の仮定を優先。
- §18.7の責務は、鎖／Hecke損失（奇数位置・核の規格化・share・比較レベル・補助素数での余長）、周期／重複度（seesaw・非零性・有理性・pre-trace・kernel expansion・main/loop rows・退化項）、高さ／局所項（Weber値・分岐写像・深いレベルの共体積・局所次数）、twisted places／統合（OneChar・Count・rank-fourの保型性とrigidity・Wach lifting・整数theta比較）、外部定理の規格化である。各責務には以下の講義担当と証明の状況を対応させる。
- [§17.4.3のTeX](https://github.com/jimjamzola/RH-Alpoge-Reconstruction/blob/aa9c86bf2a7d29b08575641fecea19a2a603e87c/manuscript/sec17_twisted.tex)の `tw:effectiveK` は、総虚数体L、d=[L:Q]、D=|Δ_L|、p上の素点集合S、e≥1、奇pならμ_p⊂L、p=2ならμ_4⊂Lのもと、log #H²(G_{L,S},Z_p(e+1))≤exp((2ed)^{C_K}log(2D))（絶対定数C_K、草稿では150）を目指す。Kummer理論から生成元数、偶数次K群との比較・well-rounded retract・セル計数・整数ホモロジーの捩れ・transfer・安定性・Hurewicz核の指数から位数を抑える**代替証明**である。原著者の21段階のLean経路とは別。とくにp=2,3・有限係数からの逆極限・比較定理の仮定・安定範囲・transferの指数・定数の一様性を監査し、代替案の成立やVandiver予想そのものの証明を既定事実にしない。
- Arakelov補足資料（https://hexagonmath.org/pdf/2611.00833v1 、取得表示はv3、本文日付11/22）ではCMアーベル多様体上のtheta関数のjetによる評価、平均傾き不等式、零点評価と算術的Hilbert–Samuel型の定量評価を対比する。個別の仮定をAdriazolaのA1〜A7やRubinsteinのH0〜H12と番号だけで同一視しない。概略的仮定の定数やLeanへの忠実性は別途照合する。


### 2026-11-26更新：Sernau／Anthropicの短縮Lean証明

[公開リポジトリ](https://github.com/lsernau/grh-lean/tree/72fead102f663d5c7a407964a13dc0cf9d977207)（固定コミット `72fead102f663d5c7a407964a13dc0cf9d977207`、2026-11-25 20:38:07 UTC／11-26 05:38:07 JST）。原著者の方法に基づく再実装で、背景理論の再整理に加え、両版には異なる論証も含まれる。**同じ5最終命題の短縮証明であって、一般の保型L関数等へ新たに拡張した結果ではない。** 作成者が報告する機械検証は有力な証拠だが、同版の独立した数学者による通読・査読済みの論文はない。

| 版 | コード行数（READMEの概数） | 検証報告・用途 |
|---|---|---|
| 原Alpöge版 | 約1,737万行 | 既存の独立検証・原論証追跡の正本として保持 |
| [可読版 grh](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/README.md) | 約30万（コメント込み非空43.3万、全47.7万） | build・3公理・nanoda/con-leche/con-ron・Comparator v4.35.0受理を作成者が報告。**各講の形式証明読解の第一候補** |
| [compact版](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh-compact/README.md) | 約7.6万（コメント込み非空9.5万、全11.3万） | build・Lean kernel replay・3公理・Comparator受理を作成者が報告。別論証と短縮機構の比較に利用 |

行数は各READMEの報告値であり、Mathlib依存の規模・コメントや空行の算入方式を揃えたベンチマークではない。両版の環境は Lean v4.35.0、Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`。原版の固定環境とは区別する。12コア・24 GBでbuild 1〜2時間（Mathlibキャッシュなしは約85分追加）、Comparatorは64 GB・数時間という作成者の報告を参考にし、受講者の必須環境にはしない。

読解入口は [GUIDE](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/GUIDE.md)、[INDEX](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/INDEX.md)、[CONTENTS](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/CONTENTS.md)。可読版は背景のLib 495ファイル（177,492コード行）とNew/Main/Statements 308ファイル（122,410コード行）を分け、LibはNewをimportしない。ただしNewのフォルダ名は厳密な依存階層ではない。実際のimport・定理本文で使用箇所を追う。INDEXの「既知の結果」分類は暫定で、[REFERENCES](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/REFERENCES.md) の228件の確認対象のうち原典箇所まで直接確認66、箇所なし未比較8、二次資料経由35、文献特定のみ119。さらに122ファイルの引用は確認対象外と記載されている。Lean内で証明されていることと、原典の正確な引用・数学的説明が成立することは別である。

#### 3定理による主不等式の読解

可読版の [ShortAndEnough](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/src/New/Reduction/ShortAndEnough.lean) と [LongForms](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/src/New/Determinant/Twist/LongForms.lean) から [MainInequality](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/src/New/Reduction/MainInequality.lean) の実際の定理へ接続する。

- A：`Data.span_short_integralRamified_eq_top` と `Data.indexLe_normalizedPoincare`（短い持上げ・小さな指数）。
- B：`Data.enough_forms`（少数の平行移動の像で対象空間のほぼ全体を張る）。
- C：`Data.integral_forms_long`（twistした格子、積公式、行列式の高さを用いた共体積と指数の下界）。
- `New.star_inequality` の実際の型は、admissible data D について `D.m * D.totalRemainder ≤ D.f * D.a * D.logB ^ 5`。A/Bによる上界とCによる下界で主項を相殺する。二乗共体積の対数Vに指数の対数δを2倍して足す理由、次元の補正、Hadamardの評価、誤差の次数を手で再現する。A/B/CはRubinsteinの補助評価(B)/(C)やAdriazolaのTheorem A・A1〜A7と同一命題ではない。
- [OneSidedBound](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh/src/New/Reduction/OneSidedBound.lean) の `Data.primeRemainder_le` では、主不等式を正の m、a、b-placesの個数で割り、f=φ(q₀)·#a-places と #a-places/#b-places≤log b を用いる。誤差の上界は φ(q₀)(log b)^6/m + |R_q₀(x₁)| + log b·|R₁(x₁)|。許容データの存在・補助スケールでの素数定理と片側零点判定を経て `New.grh` に至る。m≈√x が節約を与える理由を確認し、条件付きの不等式から無条件の結果に移る際の量化順を省略しない。

#### 講義別の形式証明読解入口

以下は固定版GUIDE/INDEXとファイルの実在に基づく読解先であり、旧稿の各仮定との同値は着手時に型・論証を照合して確定する（パスは可読版の `grh/src/` 以下）。

| 担当 | 読解入口・追加する学修課題 |
|---|---|
| RHP1–4 | `Statements.lean`、`Main.lean`、New/Reduction/Zeros と OneSidedBound：定義・極・原始化・零点判定の比較 |
| RHP5–12 | New/Reduction/Data、New/Derivatives、New/UpperBound/Kernels・Objects・Seesaw・Divisibility：CMのjet、付値・sharpness、核の整数性、鎖データの型と合成 |
| RHP13–17 | New/UpperBound/ElementaryDivisors、New/Spanning、New/Reduction/ShortAndEnough：非退化性・余長からA、第二モーメント・重複度・Gram行列からBへの実際の接続 |
| RHP18–22 | New/Reduction/Lattices/Heights、TwistedLattice、New/Determinant/Norms・Chain・Exchange・AuxiliaryForms、New/OneLift：積公式、二乗共体積、twist比と高さからCを読む。傾き法との関係は証明してから同一視 |
| RHP23–27 | New/Congruences/GaloisRepresentations・FirstOrder・Selmer・LocalLoss・Lifting、FitTwistsExist：合同と局所大域条件、反円分twistの存在、結晶的拡大の持上げ |
| RHP28–29 | 上記Selmer群評価の実際の依存を追う。Adriazola §17.4.3 K1代替論証が新Leanに採用されたかは未照合なので、形式検証済みに昇格させない。K理論ルートは比較研究として保持 |
| RHP30–32 | New/Reduction/Data/Existence、MainInequality、OneSidedBound：許容データ、A/B/Cと旧A1–A7・H0–H12の仮定・定数・量化の照合。番号による対応を禁止 |
| RHP33–34 | Lib、REFERENCES、INDEX、Statements、Main、Challenge、comparator.json、scripts/PrintAxioms.lean：背景定理と新規結果の区別、原典の照合、三版の最終命題と公理、独立検証の違い |

RHPの証明責務表は原版Lean・可読版・compact版・Rubinstein・Adriazolaの列を区別する。短縮版で論証が変更された場合、原版の未再構成補題を自動的に解決済みとせず、同じ型を証明する別経路か、必要な中間命題自体が変わったかを判定する。可読版のコメントとGUIDEもLean kernelによる検査対象ではないので、実際の型と証明を優先する。

## 3. 全34講の中心問いと証明責務

初版の1〜5講の解析的出口を保ち、旧6〜23講を再配置・分割する。RHPは未着手でmanifestが未作成なので、実装済み章のIDは改名しない。以下の節番号はAdriazola 11/24固定版、H番号はRubinstein v2である。

**第I部：解析的還元（RHP1〜5）**

| 講 | 中心問い | 再現・証明ゲート |
|---|---|---|
| RHP1 | RH・Dirichlet GRHの正確な零点主張は何か | 原始・非原始指標、極・自明零点・関数等式、Abel数体への帰結と一般数体との差 |
| RHP2 | 零点はどう重み付き素数冪和に現れるか | 対数微分とMellin／Perron型逆変換、収束・留数。ζと非主指標の補正を分離 |
| RHP3 | 片側上界はなぜ零点を排除するか | Landauの符号定理、任意に大きな窓、正係数の非相殺と離散サンプル化（§2,4） |
| RHP4 | (M)と(B)/(C)は何を主張するか | Rubinstein v2 Parts I–IIの量化を固定し、B/Cの証明と(M)の仮定からRHを再導出 |
| RHP5 | 算術的Stepanov法の利得と損失は何か | 二項係数の付値・有限体での消失度のモデル、§3の会計原理の小例。A1〜A7の完全統合はRHP31 |

**第II部：CM・局所利得・theta鎖（RHP6〜12）**

| 講 | 中心問い | 再現・証明ゲート |
|---|---|---|
| RHP6 | 補助CM数体と惰性素数はなぜ必要か | 二次CM体の分解・Frobenius・指標、惰性素数冪の重み付き恒等式 |
| RHP7 | 算術的対象と評価写像をどう組み立てるか | §7、Rubinstein §III.10、Arakelov §3：Hermitian空間・自己双対格子・Shimura集合・重み・レベル・周期の対応。実在の仮定を区別 |
| RHP8 | レムニスケートでどこまで具体計算できるか | Rubinstein §III.12：CM曲線・係数・格子・サイズ・整除性。全(M)の証明ではない |
| RHP9 | 高さ2の形式群は局所消失をどう生むか | §8–9、Lubin–Tate型の対数・CM sigma関数・Frobenius半線形性、奇数シフトと付値の級数。局所一般化の条件 |
| RHP10 | Weil表現とtheta核の整数構造は何か | 核の法則・積分・格子と測度、正規化した核の整数性を仮定する箇所、低ランクのPoisson計算 |
| RHP11 | 奇数位置と反復theta liftは利得をどう蓄積するか | §10–11、奇数位置格子、odd-transfer、step characterと行列式規格化、鎖長mの役割 |
| RHP12 | 局所鎖から周期写像の整除性へ何を移すか | 局所モデル、重みの軌道、gainと列写像、周期の付値を条件付きで合成。格子上の小例 |

**第III部：Hecke損失・Bessel周期・階数（RHP13〜17）**

| 講 | 中心問い | 再現・証明ゲート |
|---|---|---|
| RHP13 | Hecke作用素の非退化性がなぜ余長を支配するか | §12の局所Hecke作用、格子と双対格子、Witt環・軌道とLP/LPprime、標準単項式・分岐則の入口 |
| RHP14 | 非退化性の3つのエンジンは何を評価するか | §12のA/B/C：symbol spaceのrank、twisted Fock形式・等型射影、Smith指数と窓のshare。各補題とテスト系の未証明部分を分離 |
| RHP15 | Heckeの損失から格子の余長へどう進むか | Smith標準形、有限DVR加群の長さ、軌道別の損失と局所から大域の評価。L2/Z1・補助素数の余長条件 |
| RHP16 | Bessel–Poincaré級数は周期写像をどう表すか | §14のunfolding・seesaw・double-step identity、非零pairing、有理性とBesselId。商積分の絶対収束を検算 |
| RHP17 | ほぼ直交性はどのように次元を与えるか | §14のGram行列、pre-trace、重複度、体積・旗・近／遠軌道の計数、main/loop rows・退化項、LinkS→PuNZ→MIstar2→BesselIdという依存順 |

**第IV部：Arakelov傾き・高さ・局所項（RHP18〜22）**

| 講 | 中心問い | 再現・証明ゲート |
|---|---|---|
| RHP18 | Hermitian格子のArakelov次数と傾きは何か | 埋め込みごとの共体積、局所長さ、次数の加法性、Harder–Narasimhanの小例 |
| RHP19 | 平均傾き不等式は素数の利得をどう評価するか | §13とArakelov §2：frame条件、階数比較から積分、Bost型不等式・零点評価の役割。frameの成立とは分ける |
| RHP20 | theta核と周期写像の無限素点の高さはどう抑えるか | §15：写像のnorm・合成、CM周期とChowla–Selberg、Rallis、Weber値・分岐因子の仮定 |
| RHP21 | 深いレベルに一様な共体積評価はなぜ必要か | §15の(I1)〜(I17)、descent・flat twist・格子比較、成分傾き・spread、算術的Hilbert–Samuel型の評価。レベル一様性を独立の証明責務にする |
| RHP22 | 局所次数と補助素点の誤差をどう合算するか | §16、慣性／補助素数／twistedの分離、A5の度数・軌道条件、normや分母の付値。有限素点と無限素点の符号を照合 |

**第V部：合同・保型性・コホモロジー（RHP23〜29）**

| 講 | 中心問い | 再現・証明ゲート |
|---|---|---|
| RHP23 | 固有空間への射影でなぜ整数格子に合同欠陥が生じるか | §17.1,17.5、合同イデアル・上側／下側格子・長さ上界の直接証明、Fittingイデアル・局所比較 |
| RHP24 | Tate twistの局所大域問題とGalois表現はどうつながるか | H¹/H²、制限写像、Tate–Poitou、Selmer・Tate–Shafarevich型群、変形環・局所大域対応を仮定別に導入 |
| RHP25 | 円分塔とSelmer窓は分母をどう制御するか | §17.2–4、Ferrero–Washingtonの適用範囲、±分解・p=2・OneChar/Count・窓上の一様性。弱いVandiver方向の評価と予想そのものを区別 |
| RHP26 | 階数4の例外的Galois表現にはなぜ別の議論が必要か | §17.4.1、GSp4・残余可約の場合・保型性の伝播・rigidity、patchingの点の移動とRegDet・AdjointLiftingTheoremの仮定照合。未解決を通常のGL2で代用しない |
| RHP27 | 基底変換はどう古典的保型点を供給するか | §17.4.2、Hilbertモジュラー形式の局所比較、weight/levelと基底変換の適用条件、rank-twoとrank-fourの区別 |
| RHP28 | H²の位数を生成元数と指数に分けると何が得られるか | §17.4.3 K1代替案の前半、Kummer完全列・Pic/Brauer・類数評価、偶数次K群・étale比較、逆極限と小素数の条件を精査 |
| RHP29 | 整数ホモロジーとK理論から指数をどう制御するか | §17.4.3後半：well-rounded retract・旗のセル計数、Hadamard・transfer・安定ホモロジー・Hurewicz核・絶対定数C_K。代替証明の独立検算と原Lean経路の比較、未照合仮定の隔離 |

**第VI部：統合・原典・形式的検証（RHP30〜34）**

| 講 | 中心問い | 再現・証明ゲート |
|---|---|---|
| RHP30 | 必要な体・素数・重み・節点を窓ごとにどう選ぶか | §5,18.1–3、host field、補助素数・例外零点・合同条件・Selmer窓、Gallagher等の適用範囲と選択順 |
| RHP31 | 7つの会計条件はTheorem Aをどう与えるか | §3,18.4–6、A1〜A7・m≈√xの釣合い、誤差と定数の一様性、Theorem Aからζ/Dirichlet Lの零点排除を条件付きで再導出 |
| RHP32 | Rubinsteinの13仮定とAdriazolaの最終責務はどう対応するか | v2 §III.11のH0〜H11→M、H12→RHと§18.7を対象・結論・量化で対応付ける。対応未確定の辺を明記し、番号の一致で同値としない |
| RHP33 | 外部定理は原典の仮定を本当に満たすか | Rubinstein §III.13の195形式エントリとAdriazolaの外部境界・未登録領域を照合。局所大域対応、Siegel–Weil、測度、Wach/Hodge–Tate、K理論等の原典と適用を監査 |
| RHP34 | 形式証明と人間向けの証明責務をどう照合するか | 原版・可読版・compact版の5最終宣言・3公理・独立kernel・statement matching、§18.7の残件とK1代替論証を版付きで整理し、A/B/Cの依存を比較。条件付き証明と無条件の認証を区別 |

## 4. 直接依存と導入順

- RHP1〜5: ANT3,5,7,8・CA12・NTの必要結果。RHP3の窓定理の仮定・証明を確定してからRHP31で使用する。
- RHP6〜12: ANF4,9〜13,19,22・ECのCM／形式群の実在する必要結果・AFR8〜22。形式群・CMアーベル多様体・Weil表現・Shimura集合・jetが未習なら定義例と補題から導入する。
- RHP13〜17: ANFのDVR・LAの行列論・AFR13〜22・必要な既存表現論。Wittベクトル・Fock形式・標準単項式・Pieri則・Bessel変換・pre-trace等を暗黙前提にしない。高度な一般定理を引用するなら正確な版・仮定と小模型を与える。
- RHP18〜22: ANF2,5,6・RHP7,12〜17・AGの必要な既出概念。Hermitian格子、Arakelov次数・高さの定義を先に閉じる。§15の一般定理の証明責務をRHP19の傾き不等式だけで消さない。
- RHP23〜29: ANF14〜21、IWA5〜19、AFR14〜22、RHP15。Galois変形・p進Hodge・代数的K理論・群ホモロジー・安定範囲・Hurewiczの不足分は先行講／章内補題で補う。K1代替証明を元のLean証明の必要前提にしない。
- RHP30〜34: RHP1〜29の必要な既証明結果、固定版の文献・Lean宣言・検証ログ。RHP31はA1〜A7の条件付き帰結を示す講であり、未証明条件の解消なしに自然言語全証明を完了としない。
- IWA20とAFR23/24はRHPへの導入・展望であってRHP後続結果を先取りしない。個別のprerequisitesとstable anchorは着手時に実在章・knowledge DAGで確定する。完成済み他系列の追跡監査は本PLAN改訂の範囲外。

## 5. 証明責務表と完了ゲート

### 5.1 現行§18.7に対する担当と判定

| 責務 | 担当 | 11/24版で残るチェック |
|---|---|---|
| 鎖とHecke | RHP10〜15 | odd-position/normalized kernel、share・レベル比較・テスト系、Z1・補助素数の余長 |
| 周期と重複度 | RHP16〜17 | seesawと非零性・period同定、pre-trace・ラベル、kernel展開・各行と退化項 |
| 高さ・局所項 | RHP18〜22 | Weber値・分岐写像、(I1)〜(I17)と深いレベルの整数構造、一様性 |
| twisted places | RHP23〜29 | OneChar/Count、rank-four保型性・rigidity、Wach lifting、合同欠陥と局所比較、K1代替案 |
| 組立てと外部入力 | RHP30〜34 | 素数定理・例外零点、RallisのPetersson norm、mass/formal degreeの測度、定数・量化・原典一致 |

各講で「固定版の節・定理番号またはTeXラベル／Lean宣言／対象・仮定・結論／依存する定理／実際の証明／原典適用の状況」を対応表に記録する。状態は、紙上で再現・外部定理適用照合済・条件付き導出・引用のみ・未立証・対応不明を分離する。11/22の依存分類の残差0や11/24の原稿の増頁から未立証を自動的に消さない。文献の改版で定理の強さや規格化が変われば実際の使用箇所まで再検算する。

### 5.2 教材品質と形式検証

1. **数学の再構成:** 定義を使用前に導入し、各主要定義の条件を直接例で確認し、仮定・結論と中間式を閉じる。§18.7やK1の未証明入力は明確に残す。主要証明を完了扱いするために「Leanが証明した」を人間向けの証明の代わりにしない。
2. **形式検証:** 原著者14分割アーカイブ、結合tar.gz SHA-256 `9631b4f020199e580ba86178cb56c6e9b09f690c2369a80dc4334aa93f49c7fc`、Lean v4.33.1、Mathlib 0df444a3、標準公理 propext・Classical.choice・Quot.sound。MIT 11/24更新ではLean通常/paranoid kernel、Comparator v4.33.0、独立kernel・statement matching・sandbox exportの一致を確認済み、v4.36.0のlake comparatorは当時実行中。受講者に17M行の全再ビルドを課さず小規模例を用いる。11/26公開の可読版／compact版は別の環境での実装・検証報告として記録し、同版についての独立第三者検証を確認したとは扱わない。Challengeのsorryは比較用であり、実際の証明の依存閉包に含まれないことを確認する。
3. **K1:** §17.4.3は認証済み元Lean証明とは別経路。引用されるK理論・étale比較・安定性・Hurewiczの原典を実際に照合し、逆極限とp=2,3、定数の絶対性を再計算する。成功するまで代替案を定理として教材に採用しない。原Lean経路と独立の責務表を持つ。
4. **演習:** A4/B3/C1は下限。Mellin・付値・Fock形式・Smith余長・Gram行列・Arakelov次数・合同イデアル・Kummer列・有限アーベルp群の位数・セル境界行列の捩れ・誤差の釣合いなど、各講の主要論証を自力再現できる問題と詳細解答を設計する。既存章の問題を転載しない。
5. **査読:** 新規講義は区分C。全主要証明・全演習の再計算、別観点からの再読、初出語・参照の検証を実施。第三者独立査読をしていないなら称さない。一般Hecke/保型L関数や非Abel数体のGRHへの無条件拡張を避ける。

## 6. 状態と今後の更新

RHPは設計改訂のみで未着手のためplansに保持。着手時にplans_progressへ移動し、RHP.yamlにRHP1〜34をplannedとして登録し、本文・メタデータ・査読・CI完了時のみcompletedにする。全講と横断監査完了時にplan_doneへ移す。講数は数学的証明のまとまりを基準に再評価してよく、実装後は既存IDを保護しつつ必要な追加・分割と参照同期を行う。

**現行34講（11/26改訂でも維持）**。短縮版は同じ定理の形式証明と読解資料なので、追加の数学的中心問いが確定するまでは講数を増やさず、各講の証明ゲートを強化する。Sernau短縮版の比較査読、Adriazolaの次版、Rubinsteinの次版、専門家の原典照合・K1の検証結果が出れば、§18.7と責務表を版ごとに差分比較し、確かめられた論証だけを確定へ昇格させる。全体講数はANF22+IWA20+AFR24+RHP34=100講。
