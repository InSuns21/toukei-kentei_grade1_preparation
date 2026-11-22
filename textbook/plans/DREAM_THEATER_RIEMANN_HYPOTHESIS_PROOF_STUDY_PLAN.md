# DREAM THEATER Riemann予想・Dirichlet GRH形式証明の数学的再構成（RHP1〜RHP20）

設計初版: 2026-11-23 JST  
状態: **未着手・計画上20講**（独立研究講読）。章本文・`chapter.yaml`・`knowledge.yaml`・系列manifestは未作成。証明の自然言語化の進展で講義数を変更してよい。  
系列ID: `RHP`。分類: 代数系／解析系を横断する数学研究講読。  
履修ルート: [岩澤理論・保型表現・RH研究ルート](DREAM_THEATER_IWASAWA_AUTOMORPHIC_RH_ROUTE_PLAN.md)。

## 1. 新規独立20講が必要な理由

2026年11月20日、Levent AlpögeはClaudeと発見したRH・Dirichlet L関数のGRHのLean形式証明を公開した。11月21日、Lean/Mathlib共同声明はRHの命題と形式証明を認証した。Michael Rubinstein（Waterloo）・Andrew Sutherland（MIT）の第三者検証もRHとDirichlet GRHを含む5つのLean定理の型・標準公理のみへの依存・kernel検査を報告する。一方、Rubinsteinらの164ページの解説は主要不等式(M)の証明の多くをLeanから引用し、人間が追える完全な数学的論文ではない。

既存完成`ANT7/8`・`MF1〜8`・`EC`と、新規`ANF`（数体・類体論）・`IWA`（円分塔）・`AFR`（保型表現）を基盤として使う。`AFR23/24`は**解析的還元／検証状況の短い横断導入**に留め、長大な証明を二講で済ませたことにしない。本PLANは形式的正しさの事実を認めたうえで、数学的機構を**定義・仮定・核心計算・外部入力まで区別して紙上で再構成する**独立の研究講読である。

**定理のスコープ:** 認証された定理は`RiemannHypothesis`とDirichlet指標のL関数のGRH（全法・原始／非原始を含む）。一般Hecke L関数、非可換／一般数体のDedekind ζ、全保型L関数のGRHやExtended RHをLeanが直接形式証明したとは主張しない。ただし**Abel数体のDedekind ζのRH**はDirichlet L関数の積分解からの論理的帰結なので、結果の数学的帰結と直接形式化した命題を明確に分ける。

## 2. 文献と検証：エビデンスの階層

| 資料 | 強み・使い方 | 検証状況の扱い |
|---|---|---|
| Levent Alpöge, 4-page `remark.pdf`（2026-11-20） | 発見過程・Stepanovの発想、CM、theta lift、Iwasawa塔の原著者説明 | 証明全文・詳細な補題の提示ではない |
| Lean・Mathlib共同声明（2026-11-21 13:55） | RHの正規Mathlib命題・形式証明の一致、複数kernelによる認証 | **形式的正しさを強く支持** |
| M. Rubinstein独立検証（2026-11-21） | 175,187 module、標準3公理、Lean replay・nanoda、5最終命題 | 形式的検証の再現可能な根拠 |
| A. Sutherland独立検証（2026-11-22更新） | 隔離ビルド、export比較、con-leche・con-ron、lean4lean等 | 完了済み検査と未完了の重複検査を分ける |
| M. Rubinsteinら, *The Alpöge–Claude proof ... for the Riemann zeta function*（164頁の作業稿、11/21） | RHへの解析的還元、主不等式(M)、補助評価(B)/(C)、Part IIIの条件付き補題 | **(M)の自然言語による全証明は未完成** |
| R. Zhang, *A Preliminary Note ...*（11/21） | prime powers→保型周期→分母とGalois cohomology→パラメータの論理地図 | AI支援の予備的解説。Leanとの逐語・項目一致を断言しない |
| S. Slijepčević, *Outline ...*（11/21） | window positivity／Hermitian格子／Tate twist群／局所大域の概要 | 著者自身が未理解の部分を明示するアウトライン |
| Y. R. Pei, *A roadmap ...*（11月） | Lean依存の絞り込みとStepanov型設計の仮説的解釈 | 初版は独立検証前に執筆。古い「未検証」記述は日付付き履歴のみ |

一次・準一次資料:
- https://alpo.ge/remark.pdf
- https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
- https://mrubinst.github.io/grh-lean-verification/
- https://math.mit.edu/~drew/grh/
- https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/
- https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/zeta-paper.pdf
- https://www.ihes.fr/~rzhang/files/GRH%20note.pdf
- https://hexagonmath.org/pdf/2611.00812v1
- https://peabrane.github.io/files/pei-2026-claimed-lean-proof-rh-roadmap.pdf
- https://www.claymath.org/millennium/Riemann-Hypothesis/ （11/23時点の公式掲載は`Unsolved`）

参照資料間に食い違いがある場合、日付・Leanの固定版・型付き命題・使用した数学的仮定を先に照合する。原著者の研究経過と、後発解説による仮説的な依存地図を同一視しない。教科書と外部論文の文章・演習は転載しない。

## 3. 全20講の中心問いと証明責務

**第I部：解析的な出口――なぜ算術的不等式からRHが導かれるか（RHP1〜RHP5）**

| 講 | 学習者の中心問い | 再現・証明ゲート |
|---|---|---|
| RHP1 | RH・Dirichlet GRHの正確な零点主張は何か | Dirichlet文字の原始化、極・自明零点・`s=1`の例外、一般／Abel数体への帰結の範囲 |
| RHP2 | 零点情報はどの重み付き素数冪和に現れるか | `-L'/L`・Mellin／Perron型逆変換、収束域、留数を中間式から導く |
| RHP3 | なぜ片側上界と正係数が零点を排除できるか | Riesz重み、区間`[Y,Y^(3/2)]`、正係数線形結合、量化順と非相殺の証明 |
| RHP4 | 主不等式(M)と補助評価(B)/(C)は何を主張するか | 164頁作業稿の仮定・結論を固定し、**(M)+(B)+(C)⇒RH**を既出結果から段階的に再構成 |
| RHP5 | Chebyshev–Erdősの階乗の整除性はどう変形されるか | `binom(2n,n)`の素数因子評価とStepanovの補助関数・重複度の最小模型を比較 |

**第II部：CM・theta・周期――整数の整除性がどこから現れるか（RHP6〜RHP11）**

| 講 | 学習者の中心問い | 再現・証明ゲート |
|---|---|---|
| RHP6 | 補助CM数体と惰性素数はなぜ有用か | Frobenius・分岐・分裂の条件、具体的二次CM体の素点判定 |
| RHP7 | 保型周期の整除性は素数冪をどう数えるか | 正整数格子の周期と付値、有限群でのtrace/average・分母の直接計算 |
| RHP8 | 惰性素数で局所的な高次消失をどう得るか | 局所パラメータ、導関数・高さ2の形式群の最小模型と高次一般形の仮定を区別 |
| RHP9 | Weil表現とtheta kernelの整数構造とは何か | Schwartz関数・局所積分・Poisson変換、格子の正規化と局所収束 |
| RHP10 | 反復theta liftはなぜ重複度に似た利得を作るか | dual pair、unitary群の低ランク実例、反復回数と期待する利得の式の所在 |
| RHP11 | seesaw・Rallis内積・保型周期はどう接続するか | 群の包含・積分順序、ノルム・周期・局所積因子の適用条件 |

**第III部：格子のサイズと分母――上界を閉じる算術幾何（RHP12〜RHP17）**

| 講 | 学習者の中心問い | 再現・証明ゲート |
|---|---|---|
| RHP12 | Hermitian格子の共体積と傾きは何を制御するか | determinant・局所ノルム・体埋め込み、行列での簡単なBost型上界 |
| RHP13 | Harder–Narasimhan・Bost傾き不等式はどこに効くか | 傾きフィルトレーションの例、算術的Bost定理の対象・仮定、現行自然言語稿での引用箇所 |
| RHP14 | theta kernelのサイズをどう上から評価するか | Rubinstein Part III §4/§7の解析・算術入力を分離、各不等式のnormと誤差依存 |
| RHP15 | 相対跡公式と一般位置条件で次元をどう制御するか | trace／rank／pairingとスペクトル評価、研究資料で引用される3入力とそのLean対応 |
| RHP16 | Hecke固有空間への射影になぜ分母が発生するか | 整数格子での有理固有射影・分母の直接例、固有値合同・Galois表現の必要条件 |
| RHP17 | GaloisコホモロジーとTate twistの局所大域問題は何か | `H^1/H^2`・制限写像・Selmer型局所条件、Tate–PoitouとTate–Shafarevich型群の仮定 |

**第IV部：塔と統合・形式検証（RHP18〜RHP20）**

| 講 | 学習者の中心問い | 再現・証明ゲート |
|---|---|---|
| RHP18 | 岩澤理論のμ不変量と円分塔が分母にどう関わるか | Ferrero–Washingtonの適用範囲、局所・大域コホモロジーの次数、条件付きの増大評価と限界 |
| RHP19 | どのパラメータ選択で主不等式(M)が得られるか | 局所可除性＋格子上界＋射影分母＋次元を実際に代入、主結果・外部入力・未執筆補題を棚卸し |
| RHP20 | 形式的な認証と自然言語の再構成をどう照合するか | Mathlib標準RHとの同値、5宣言、3公理、再現ログ、Lean定義・外部定理・説明文の対応表を制作 |

**RHP19と20を「全巨大証明の完成」と扱わない。** (M)の現行自然言語文献で未立証の入力を特定し、それぞれについて必要な定義・定理・主要補題を証明できた時点で完成判定する。後続の論文公開で新しい独立の証明サイクルが必要なら講数を**明示的に再検討**する。

## 4. 学習上の直接依存

- RHP1〜5: `ANT3,5,7,8`、`CA12`、初等整数論`NT4/5/8`の必要箇所。RHP5のfunction field比較は導入で有限体の最小例から説明。
- RHP6〜8: `ANF4,9〜13,22`、`EC3,4,7`および局所可除性。未習のCM一般定理を無条件使用しない。
- RHP9〜11: `AFR8〜22`の必要部分。表現論・絶対収束・unitaryの表記とHecke指標は使用前に導入。
- RHP12〜15: `ANF2,5,6`、`AFR19〜22`、`AG`の必要な既出部分。Hermitian算術格子・Bost不等式は本系列で初出なら十分な中間補題を構築する。すでにある`KAH`のHermitian計量と数体のHermitian格子を混同しない。
- RHP16〜18: `ANF14〜21`、`IWA5〜19`のうち実際の結果、`AFR14〜18`。一般Galois表現の証明が必要ならRHP内に小模型・確立した外部定理の範囲を定義する。
- RHP19〜20: RHP1〜18の検証済み内容とLeanの公式宣言・独立の検証ログ。
- 章の`prerequisites`と使用箇所のstable anchorは本文執筆時に現行の実在章を調べて確定。未実装のANF/IWA/AFR章を既習の正本にしない。IWA20はRHP研究講読への接続を説明するので、RHPの定理証明の前提には採らず依存の循環を防ぐ。完了済み既存章の追跡監査はユーザー指定がある場合のみ。

## 5. 数学的・形式的品質の完了ゲート

1. **人間向け証明:** 読者が定義・仮定・結論・中間式・可換図式／代入値を自力で追えること。主要結果の立証がLeanからの引用のままなら「Leanで検証済み、自然言語未再構成」として未完了範囲を明示する。
2. **研究資料の確度:** Rubinsteinの(M)は11/23時点の作業稿では未完証、(B)/(C)は既存理論から立証。Robin Zhang・Slijepčevićのoutlineを検証済みの定理証明と同一視しない。改訂が出たら引用した版・節・日付・条件を照合する。
3. **Lean:** 固定対象は原著者の14分割アーカイブ、結合tar.gz SHA-256 `9631b4f020199e580ba86178cb56c6e9b09f690c2369a80dc4334aa93f49c7fc`、Lean `v4.33.1`、Mathlib `0df444a3`。標準公理 `propext`・`Classical.choice`・`Quot.sound`のみ。局所の全17M行再ビルドは学生に義務づけず、第三者ログ＋数十行のLean例でkernel・statement matching・`sorry`の検証を体験させる。
4. **一般化の区別:** Dirichlet GRHを全Hecke／全保型Lへ勝手に拡大しない。Abel数体のDedekind ζは既知の指標分解に依拠する**系**として導出可能、一般数体には適用不可。
5. **演習:** 新章は内容に応じたLevel A4・B3・C1以上を基本とし全問詳細解答を付ける。解析系のRHP2〜4にはMellin・逆変換を計算する練習、算術系のRHP6〜8には局所体の例、表現論RHP9〜16には低ランク実例、RHP20には形式文の同値・不適切公理使用の検出例を含める。既存の`ANT/MF/EC`演習をコピーしない。
6. **査読:** 変更章の区分C全件再計算と別観点再読。高次保型表現等の一般結果を外部大定理として掲げる場合、その厳密な仮定・実証済みの証明範囲・未証明の箇所を明示する。人間向け完全証明が閉じないのに`completed`へ変更しない。

## 6. 状態と設計の更新

このPLANは設計のみのため`textbook/plans/`に置く。着手時は`textbook/plans_progress/`へ**移動**し、新設`textbook/dream-theater-series/RHP.yaml`を本計画の実在パスで初期化、RHP1〜RHP20を`planned`へ登録する。本文・`chapter.yaml`・`knowledge.yaml`・各章の正式査読・CIが揃ったときのみ`completed`とする。完了講だけ公開目次へ配置し、全講・横断監査完了後に`plan_done/`へ移動。共有ルーターや既存完了`ANT/MF/EC`のステータスは変更しない。

**講数は20を現行の設計値として明示するが、証明の自然言語化を優先し固定枠としては扱わない。** 一つの大定理を満たすのに必要な主要証明・演習が独立した学習サイクルを要する場合、PLAN・横断ルート・依存マップを同じ作業単位で改訂して増減する。
