# DREAM THEATER Diophantine近似（NDA1〜NDA8）

分冊: 2026-10-11  
状態: completed（2026-10-13 NDA1〜NDA8公開・NDA7/NDA8追跡監査・科目横断監査を完了）

## 中心問いと直接依存

[NT1〜NT3・NT6・NT7](../plan_done/DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)、RA1/RA1A。NDA3はLA、NDA6はFLD1、NDA8は測度論（MT1・MT8等）の必要部分を追加する。後続のTRN・EOM017に接続するが、それらの未実装章はNDAの着手条件にしない。

**本科目の新規正本：** 連分数の近似定数の精密化、Hurwitz・Minkowski・Weyl・Kronecker、無理性指数・Liouville・Roth、計量的Diophantine近似。**NT7で証明済み**の連分数基本恒等式・第二種最良近似・一次元Dirichlet近似・平方根の周期性・Pellの基本結果を重複して所有しない。

# 3A. Diophantine近似 NDA1--NDA8

## 3A.0 位置付け

NT7 に一章分の Diophantine 近似を圧縮したり、EOM017 のためだけに irrationality exponent の補講を追加したりしない。

**Diophantine近似を、整数論の内部に置く独立1セメスター科目として設計する。**

公開科目名は「Diophantine近似」とする。管理 ID は仮に NDA1--NDA8 とし、実装開始時に衝突を再確認する。

主 prerequisite:

- NT1--NT3 の必要部分
- NT7
- RA1 / RA1A
- NDA3 以降で必要に応じて線形代数・凸幾何
- NDA8 で測度論 / 確率論の必要部分

## NDA1 連分数と最良有理近似

- finite / infinite continued fraction
- convergent
- recurrence
- determinant identity
- best approximation
- 二次無理数の周期性
- Pell 方程式との対応

NT7 の定義と主要証明を canonical dependency として利用し、一般の二次無理数の最終周期性（平方根に限定したNT7の結果からの拡張）、誤差定数・第一種／第二種最良近似の差、semiconvergentなどを新たな証明課題にする。Pell の既存証明を再録しない。

## NDA2 Dirichlet・Hurwitz・badly approximable numbers

- NT7の一次元Dirichlet近似は既習として再利用し、指数と定数の改良に進む
- Hurwitz theorem
- approximation constant
- badly approximable number
- golden ratio の位置付け

## NDA3 geometry of numbers と同時近似

- lattice の最小導入
- symmetric convex body
- Blichfeldt補題からMinkowskiの凸体定理を導く核心証明
- simultaneous approximation
- linear forms

geometry of numbers を巨大な別系列へ膨らませず、本科目に必要な標準部分を閉じる。

## NDA4 一様分布・Kronecker・Weyl

- fractional part
- irrational rotation
- equidistribution mod 1
- Weyl criterion
- Kronecker approximation theorem
- QMC / dynamical systems との接続

## NDA5 irrationality measure・irrationality exponent

- 無理数 $\alpha$ の有理近似指数を量化（既約分数・無限に多くの近似・上限）を含めて定義
- irrationality exponent $\mu(\alpha)$
- Dirichlet近似からすべての無理数について $\mu(\alpha)\ge2$
- badly approximable numbers との関係
- 具体例の exponent

EOM017 で使う語彙はここを canonical owner とする。

## NDA6 Liouville 数・超越数

- Liouville theorem
- Liouville numbers
- transcendence
- 代数的数への近似制約
- 明示的 transcendental number

## NDA7 Thue--Siegel--Roth

- Roth theorem の exact statement（代数的無理数 $\alpha$ と任意の $\varepsilon>0$ に対する指数 $2+\varepsilon$ の下界）
- 代数的無理数に対する $\mu(\alpha)=2$ の量化付き導出
- Thue / Siegel / Roth の歴史的流れと、Liouville評価から何が改善されるか
- Rothの完全証明に必要な補助多項式・次数・高さ・零点多重度等の証明経路と前提を実装前に確定する

Rothは深い定理であり、FLD1やRAだけから短く従う結果ではない。証明の核心を閉じられない限りNDA7を完成扱いしない。必要ならNDA7を補題のまとまりで分割し、追加章・直接prerequisiteを明示する。引用だけで済ませる場合は「未証明の発展定理」と明示し、その状態で全系列をcompletedとしない。NDA1着手の障害にはしない。

## NDA8 metric Diophantine approximation

- almost every real number の irrationality exponent
- Borel--Cantelliの必要な形（未所有ならここで証明）
- Khintchine theoremの正確な条件（単調な近似関数、級数の収束・発散、Lebesgue測度0/1）と証明経路
- null / full measure
- exceptional set
- Hausdorff dimension との接続

無理数のほとんどすべてで $\mu(\alpha)=2$ を、下界はDirichlet、上界は測度の総和評価とBorel--Cantelliから導く。Hausdorff次元の結論はMT8の既出定理が実際に適用できる場合だけ主張し、未実装の幾何学的測度論PLANを既習扱いしない。

## NDA から EOM017 への出口

~~~text
NT7
 ↓
NDA1--NDA4
 ↓
NDA5 irrationality exponent
 ↓
NDA6--NDA8
 ↓
代数的無理数では NDA7 の Roth により exponent 2
 ↓
超越数 pi では何が分かるか
 ↓
EOM017
~~~

EOM017 は irrationality exponent の初出定義を担当しない。

---

## 章別執筆・数理査読・完了判定

本PLANのNDA1〜NDA8は実装・公開済みである。次の記述は執筆時に適用した共通品質ゲートの履歴である。未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。新規・実質改稿章は主要証明と全演習解答を再計算し、同一担当者による別観点再読を区別して記録する。**別章の追跡監査はユーザーが対象章IDを明示した場合のみ**実施する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。


## 2026-10-12 着手準備ゲート：確認済み事項

- **直接依存は着手可能**：`textbook/dream-theater-series/NT.yaml` でNT1〜NT10はすべて `completed`。特にNT7の `chapter.yaml`・`knowledge.yaml`・本文の正本を確認した。RA1・RA1A、LA1、FLD1、MT1・MT8の章ファイルは存在し、後半の必要理論も先行して参照できる。**ANTは独立した並行系列でありNDA1の必須依存ではない**。
- **ID衝突と公開状態**：`代数系/` に `NDA/` はなく、`NDA.yaml` は科目固有入口監査とともに新設する。NDA1〜NDA8は系列内の `planned` IDであり、章の執筆時には本文ディレクトリ・series manifest・公開索引・knowledge DAG上で再確認する。未作成の章を公開済み・証明済みとは扱わない。
- **NT7のstable anchor再利用**：[単純連分数](../volumes/dream_thater/代数系/NT/NT7/index.md#def-nt7-continued-fraction)、[収束分数](../volumes/dream_thater/代数系/NT/NT7/index.md#def-nt7-convergent)、[差積恒等式と完全商公式](../volumes/dream_thater/代数系/NT/NT7/index.md#lem-nt7-convergent-matrix)、[収束分数の誤差](../volumes/dream_thater/代数系/NT/NT7/index.md#thm-nt7-convergent-error)、[第二種最良近似](../volumes/dream_thater/代数系/NT/NT7/index.md#thm-nt7-best-approximation)、[平方根の周期性](../volumes/dream_thater/代数系/NT/NT7/index.md#thm-nt7-square-root-periodic)、[一次元Dirichlet近似](../volumes/dream_thater/代数系/NT/NT7/index.md#lem-nt7-dirichlet-approximation)、[Pellの全正整数解](../volumes/dream_thater/代数系/NT/NT7/index.md#thm-nt7-pell-all-solutions)。章本文で使用するときは**その使用箇所から**canonical anchorへリンクする。
- **代数・解析のowner**：代数的元・最小多項式は[FLD1](../volumes/dream_thater/代数系/FLD/FLD1/index.md#def-fld1-minimal-polynomial)、数列・極限はRA1、級数評価はRA1A、測度収束はMT1、Hausdorff次元はMT8。Minkowskiの凸体定理・Roth・Khintchineの全証明がこれらから自動的に得られるとはみなさない。
- **境界**：NDAはHilbert第10問題（NT9・NT10）や超越数論（TRN）の代替ではない。EOM017へ供給するcanonical定義はNDA5の無理性指数、NDA6のLiouville評価、NDA7のRoth適用条件である。

## 章ごとの証明経路と演習の焦点

| 章 | 新たに閉じる証明・条件 | 手を動かす演習の焦点 |
|---|---|---|
| NDA1 | NT7の収束分数の差積から誤差定数を導き、一般二次無理数の最終周期性を新たに示す | 同じ数で近似種別を比較、一般二次無理数の周期を検証 |
| NDA2 | Hurwitzの $1/\sqrt5$ の評価と最適性、badly approximableと有界部分商の同値 | 黄金比・有界部分商・無界部分商の反例 |
| NDA3 | Blichfeldt→Minkowski→同時Dirichlet近似を、格子の行列式・体積条件を確認して導く | $\mathbb Z^n$ と一般格子、凸体の境界、二変数の近似 |
| NDA4 | Weyl判定の両方向を三角多項式近似で示し、無理回転・Kroneckerの整数関係条件を確認 | 有理回転／無理回転、指数和の評価、同時近似の可否 |
| NDA5 | 無理数に限った $\mu(\alpha)$ の定義・量化、Dirichlet下界と二次無理数の上界 | $\sqrt2$、有界部分商、指数の上下界の区別 |
| NDA6 | 整数係数最小多項式 $P$ に対する $|P(p/q)|\ge q^{-d}$ と平均値評価からLiouvilleの下界を導く | 代数的次数依存、Liouville数の近似列と超越性 |
| NDA7 | Rothの指数 $2+\varepsilon$ の定量的条件・完全証明への補助理論を閉じてから $\mu=2$ へ進む | $\varepsilon$ の量化、代数的数とLiouville数の対比 |
| NDA8 | $\sum_q q^{-1-\varepsilon}<\infty$ 型評価とBorel--Cantelliでa.e.指数2、Khintchineの収束／発散方向と単調性を点検 | 零測度・全測度、例外集合、Hausdorff次元との違い |

章間の主要依存は `NDA1 → NDA2 → NDA5 → NDA6 → NDA7`、`NDA2 → NDA3 → NDA4`、`NDA5・NDA4・MT → NDA8` とする。これは概形であり、`chapter.yaml` には証明が**直接使う最小の** prerequisite のみを登録する。NDA3以降がNDA1の着手を妨げないよう、各章の証明経路は着手時に個別確定する。

## NDA1着手時の手順（実施済み記録）

1. 本PLANは**依存・ID・入口監査に着手済み**のため `textbook/plans_progress/` へ移動済み。章本文・証明・演習の実装と科目横断監査は未実施。NDA1の執筆が次の実装タスクである。
2. `textbook/dream-theater-series/NDA.yaml` は科目固有の入口監査とともに作成済みで、`plan` は本PLANの `plans_progress` パス、`chapter_root` は既存ルーター、NDA1〜NDA8はすべて `planned`。共通ルーターは変更しない。NDA1執筆に着手しても未完成章の公開索引・knowledge DAGへの先行登録をしない。
3. 最初の章は `textbook/volumes/dream_thater/代数系/NDA/NDA1/` の `chapter.yaml`・`knowledge.yaml`・`index.md`。NT7のリンク先を個別に利用し、**既出証明の再掲で章数を埋めない**。一般二次無理数の最終周期性、近似型の差、具体例を導入→定義→証明→演習で閉じる。
4. 理由付き例外がなければ各新章に有意味なLevel A 4題・B 3題・C 1題以上と全詳細解答を置く。区分Cの全主要証明・全演習解答を出発点から再計算し、別観点で再読する。PRには検証根拠と未確認部分を記録する。章本文と検証が完成した章だけ公開索引・目次・knowledge DAGへ追加し、系列manifestの当該章を `completed` に更新する。
5. 変更に応じて `npm run validate:textbook:changed`、`npm run validate:textbook-knowledge:changed`、`npm run validate:dream-theater-concepts:changed`、`npm run validate:dream-theater-exercise-counts` を実行。manifest・公開索引等に波及する際は現行規約に従い必要な全体検証へ昇格する。後続のRoth・Khintchineの証明経路が未完了なら、その章は `completed` にしない。

## 2026-10-12 NDA2執筆完了・次の章

- 系列 manifest で NDA1・NDA2 を \`completed\` とし、未実装の NDA3〜NDA8 は \`planned\` のままとした。計画全体の科目横断査読・完了判定は残っているため本PLANは \`plans_progress/\` に残す。
- NDA2でHurwitzの最良定数 \`1/sqrt(5)\` の三項誤差証明・黄金比による鋭さ・悪近似数と部分商有界性の同値を記述。直接依存はNDA1（経由してNT7）。
- 次はNDA3「数の幾何と同時Diophantine近似」。Blichfeldt補題からMinkowskiの凸体定理を導き、格子の行列式と体積条件を明示して同時Dirichlet近似へ進む。


## 2026-10-13 NDA7 本文・証明・演習の完了

- NDA7「Thue–Siegel–Rothの定理」の公開本文を `textbook/volumes/dream_thater/代数系/NDA/NDA7/` に実装し、前回の `textbook/plans_progress/drafts/NDA7/` 草稿3ファイルは同作業単位で削除した。
- 主定理の全証明責務を、（1）次数付き零点指数と積・微分則、（2）消滅条件の有限平均と箱詰め補題による高さ付き補助多項式、（3）一般化Wronskianと変数数の帰納法で示すRothの補題、（4）分母増大・変数別次数・非零有理値の下界・Taylor上界の矛盾、（5）代数的整数から一般の代数的無理数への帰着、として閉じた。
- Rothの定理の量化・有限例外からの一様下界・無理性指数2・三次Thue型整数方程式への応用と、演習A5/B5/C2（全12題の詳細解答）を対応させた。新規主要証明と全解答は区分Cとして出発点・中間式・条件の全件再計算と別観点再読を実施し、PRに記録する。
- NDA7の章ファイル・NDA系列manifest・公開索引・本編目次・章内knowledgeを同時更新する。NDA8「計量的Diophantine近似」が次のplanned章であり、科目全体PLANは引き続き `plans_progress/` に置く。

## 2026-10-13 NDA7・NDA8追跡監査とNDA系列横断完了判定

- **対象と現在の正本**：NDA7・NDA8の公開 `index.md` 全文（NDA7はformal statement 13件、証明10ブロック、演習A5/B6/C2の計13解答；NDA8はformal statement 10件、証明9ブロック、演習A5/B5/C2の計12解答）を確認した。両章の `chapter.yaml`・`knowledge.yaml`、直接依存の既出stable anchorを確認した。
- **数理・行間再計算（NDA7）**：整数核の例では `A(1,-2,1)^T=(0,0)^T`。高さ付き補助多項式で消滅条件の割合を有限平均から `1/(4mη²)` 以下とし、方程式の本数 `M≤rN/(4mη²)≤N/64` を再確認。Roth補題から有理点の指数 `≤2mη`、代数的点の微分後の指数 `≥m(1/2-3η)` を得る。したがって主証明では `m≥(2+δ)m(1/2-3η)-2Bα/L` が必要だが `κ=(2+δ)(1/2-3η)-1>0` と `2Bα/L<mκ` に反する。Roth補題の行列式では恒等的零の偏微分項の指数は定義されないので、それを含む置換項を捨て、非零項に指数則を適用する旨を本文に補記した（局所数学修正B）。
- **NDA7演習の再導出**：C1では `p²+αpq+α²q²=(p+αq/2)²+3α²q²/4`。`|p³-2q³|=1` から `|α-p/q|≤4/(3α²q³)` となり、`q>C²`（`C=4/(3α²)`）では `q^{-5/2}` より小さい。既約性は `gcd(p,q)^3|1` から確かめ、Rothの有限性を適用できる。
- **数理・行間再計算（NDA8）**：倍幅分母帯の全格子点は `(3/8)|J|Q²+O(Q)`。非既約分の過大計数を差し引くと `(3/32)|J|Q²-O(Qlog Q)` が残る。二乗平均では `S_{m,n}²≤T_{m,n}λ(∪F_k)` を直接確認し、ブロック間交差の余剰項は `Σ_ℓρ_ℓΣ_{k<ℓ}4^k≤(1/3)Σ_ℓ4^ℓρ_ℓ=(1/3)Σ_ℓa_ℓ` に吸収される。従って各区間 `I` で `λ(W(ψ)∩I)≥c|I|` を得て全測度に至る。
- **NDA8演習の再導出**：A5では `∫Z=7/12`、`∫Z²=1/4+1/3+2/12=3/4` なので `λ(F1∪F2)≥(7/12)²/(3/4)=49/108`、実値 `1/2` と整合する。C1の交差総和も上記の `S+S²` 評価から再確認した。
- **配置・参照・前提**：NDA7・NDA8の別行数式とインライン数式、用語初出と主要論証の使用箇所を再読。両章の章内anchorに未解決リンクはなく、NDA5/NDA6/FLD1/LA3C/MT1/MT8の直接引用先anchorはすべて実在する。NDA7の恒等的零項の扱いのみ補足し、その他の重大な指摘は残っていない。
- **系列横断**：系列manifest上NDA1〜NDA8が連続して `completed`。8章の実本文・`chapter.yaml`・`knowledge.yaml` があり、詳細解答は順に9/9/9/9/9/9/13/12題。全8章が公開 `dream-theater-index.json` と本編目次 `dream-theater.md` に掲載済み。prerequisite は章メタデータで確認済みであり、系列の未実装章・残PLANタスクはない。
- **レビュー主体と未確認**：数学的再計算と読者視点の再読は同一担当者が別観点で実施。第三者による独立査読は実施していない。CI/公開統合チェックは完了PRでのGitHub Actionsを最終ゲートとし、CI結果が不合格なら本完了判定を保留する。
