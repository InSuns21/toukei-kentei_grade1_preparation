# DREAM THEATER — FOUR FRONTIERS: RH・BSD・Hodge・Poincaré 統合到達計画

設計確定日: 2026-11-25 JST。監査基準 main: `83966cbce09f7329c24d4e6c4d4c0160b3f8185d`。
状態: 設計済・未実装。2026-11-26改訂: 新規10系列172講（独立ATOP42講と共有発展ETO12講を含む）。既存RHP34講を加えた固有の今後の講義枠206講。既存CATB7の5講は前提として再利用し、新規数には含めない。RMT30講は既存の独立選択科目。講数は以下の中心問い・証明責務を満たす設計値であり、実装時の厳密な数学査読で分割が必要なら変更理由と差分を記録する。15回制などによる水増しはしない。

## 0. 射程と成功条件

- RH/Dirichlet GRH: 11/20 Alpöge–Claude形式証明の認証と自然言語再構成を区別。既存[RHP34講](DREAM_THEATER_RIEMANN_HYPOTHESIS_PROOF_STUDY_PLAN.md)・[数論横断ルート](DREAM_THEATER_IWASAWA_AUTOMORPHIC_RH_ROUTE_PLAN.md)を正本とし、研究進展で改版する。一般保型L関数のGRHまで証明されたとはしない。
- BSD: Q上の楕円曲線の階数版・精密版、解析的階数0/1の階数一致とSha有限性を正確な外部定理から導出。Gross–Zagier/Kolyvaginの原論文全証明、全pの精密式、高階数の一般証明は今回の完了条件ではない。
- Hodge: 滑らかな複素射影多様体、有理係数、cycle classの像として定式化。Lefschetz (1,1)と次元3以下の証明を閉じる。一般余次元・整数係数版と混同しない。
- Poincaré: 閉単連結3多様体のS^3との同相を有限時間消滅・手術の位相から証明。長時間幾何化の全証明は別計画。Morgan–Tianの論証を追える粒度が目標。大定理を引用する場合、仮定・結論・適用・原典節・証明責務を明記し、引用だけで全証明の自力再構成を完了扱いしない。

## 1. 既存資産の監査とcanonical owner

全体のmanifestディレクトリ、plan/plan_done/plans_progress、科目別公開目次（基礎・基礎論・解析・幾何・代数）、dependency-graph.md、knowledge-dag.yaml、courses.jsonを確認。下表は対象分野のmanifestと選択したchapter.yamlのlearning objectives/定理を確認した結果であり、全既存章の本文・knowledge.yaml・全stable anchorの独立数理再査読ではない。status=completedは実装済の根拠であって、未検証の一般化を正当化しない。

| 必要項目 | 既存正本候補 | 残差と担当 |
|---|---|---|
| ζ、Dirichlet L、素数定理、明示公式 | CA12、ANT1–8（8完了） | RHP既存34。再新設なし |
| 数体・局所体・類体論 | ANF1–22（22完了） | GCOは双対・高次コホモロジーに限定 |
| 古典・局所大域保型理論 | MF1–8（8完了）、AFR1–24（24完了） | RHP・BSDの応用のみ。一般Langlandsは停止線 |
| 楕円曲線・降下・L因子 | EC1–11（11完了） | BSDは高さの精密化、Néronモデル、Heegner点。EC11のModularityは外部引用 |
| 岩澤・Selmer | IWA1–20（20完了）、IWA18-THM-01/02/06 | Kummer/Selmer完全列は既出。GCOは双対性拡張、BSDは具体計算・応用 |
| 可換代数・層・スキーム | AG1-01〜12、AG2-01〜12、AG3-01〜14（38完了） | AG3-13は孤立交点の局所長まで、一般交叉理論はCYC |
| 圏論・site・導来 | CAT1–4、CATB1–5（完了）、CATB7-01〜05（planned） | 新設しない。CATB7の実装済み部分のみ依存可能 |
| 基本群・特異ホモロジー・整数格子 | TOP1–7（一般位相）、GEO9（de Rham） | 公開目次に独立代数的トポロジーなし。ATOP |
| 複素多様体・Dolbeault・束 | CM1-01〜10、CM2-01〜11（21完了） | 新設なし |
| GAGA・Chow定理・Picard | CAG1-01〜14（14完了） | CYC/HCPはcycle class・指数完全列に集中 |
| Kähler幾何・Chern類 | KAH1-01〜16（16完了）、GBG20–24 | CYCではChow群側のChern類と比較 |
| Hodge分解・Hard Lefschetz・純Hodge | HOD1-01〜16（16完了）、GA6-THM-03/04 | HOD1-11-THM-01、HOD1-13-THM-03、HOD1-15の有理類を参照。HCPは(1,1)、サイクル、既知ケース |
| 変形・周期写像 | DEF1-12/13、CYG1/MIR（関連） | HCPの変動は既出定義を再掲しない。MIR/Floerは必修にしない |
| Riemann幾何・比較 | GEO12–19、NPCG1–12 | CAT(0)比較と曲率付き滑らかなコンパクト性を区別。RCG |
| 幾何解析・Sobolev・熱核 | GA1–9（9完了）、GA6/7、GPDE、EVOL1–6、NPDE4–7 | 変動計量の準線形系、曲率評価はRFL/PCP |
| 変分・極小曲面 | VAR4–12、GMTの必要部分 | sweepout/minimax幅はPCP。一般GMT全履修は不要 |
| 3次元位相・手術・Ricci flow | GEO/GA/VAR等の前提 | M3T/RFL/PCPで独立所有 |
| エタール・有限体コホモロジー | EC7–8、AG3、ANF、CATB5 | ETO12。一般Deligne証明は停止線、RHの形式証明の前提と一律にしない |

ANT+ANF+EC+MF+AFR+IWA+AG+CM+CAG+KAH1+HOD1+GA=207 completed chapters（12系列のみの重複なし集計）。他の既存科目を加算した総数ではない。比較の新規172講は「差分の設計」なので、207を全て必修にするわけではない。既存結果へのリンクは執筆時にchapter.yaml/knowledge.yaml/index.mdの実在アンカーを確認する。

## 2. 文献校正と設計判断

| 分野 | 標準書・公開講義・一次資料 | 採用方針 |
|---|---|---|
| 位相 | [Hatcher, Algebraic Topology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html) Ch.1–3、[Notes on Basic 3-Manifold Topology](https://pi.math.cornell.edu/~hatcher/3M/3Mdownloads.html) | 基本群→鎖→双対、3次元分解の独立科目。高次ホモトピー全般は対象外 |
| 算術 | [Milne, Course Notes](https://www.jmilne.org/math/CourseNotes/)、[Arithmetic Duality Theorems](https://www.jmilne.org/math/Books/index.html)、[MIT 18.783 readings](https://ocw.mit.edu/courses/18-783-elliptic-curves-fall-2025/pages/readings/) | Galois双対・Kummer・既存ECと重複しない算術へ |
| BSD | [Silverman, Advanced Topics in the Arithmetic of Elliptic Curves](https://link.springer.com/book/10.1007/978-1-4612-0851-8)、[Wiles, CMI problem description](https://www.claymath.org/millennium/birch-and-swinnerton-dyer-conjecture/)、[Gross–Zagier seminar](https://math.bu.edu/people/svh/GrossZagier.html) | Néron・局所高さ・Heegner点・Euler系を分離。Gross–Zagier/Kolyvaginの厳密な定理を引用し帰結を証明 |
| エタール | Milne, Lectures on Etale Cohomology / Abelian Varieties（上記公開ノート） | site、有限係数、l進、跡公式、曲線のWeil予想へ。Deligneの一般定理は引用境界 |
| Hodge | Claire Voisin, Hodge Theory and Complex Algebraic Geometry I, II（[大学講義シラバス](https://math.illinois.edu/resources/syllabus-math-514)、[Cambridge I目次](https://www.cambridge.org/core/books/abs/hodge-theory-and-complex-algebraic-geometry-i/contents/30F15472C7CC34C4C61E0CF7533F94FC)）、[Deligne, CMI](https://www.claymath.org/millennium/hodge-conjecture/) | Kähler/Hodgeの既存講を維持しcycle classと既知例へ |
| 交叉 | [Fulton, Intersection Theory](https://link.springer.com/book/10.1007/978-1-4612-1700-8) | Chow群・proper/flat/Gysin・対角交叉。全21章の翻案をしない |
| Ricci | [Topping, Lectures on the Ricci Flow](https://warwick.ac.uk/fac/sci/maths/people/staff/peter_topping/rfnotes/)、[Chow–Knopf](https://doi.org/10.1090/surv/110)、[Chow–Lu–Ni](https://doi.org/10.1090/gsm/077) | DeTurck、最大値原理、pinching、Shi、Hamilton compactnessを先に整備 |
| Poincaré | [Morgan–Tian, Ricci Flow and the Poincaré Conjecture](https://www.claymath.org/resource/ricci-flow-and-the-poincare-conjecture/)、[Kleiner–Lott, Notes on Perelman’s Papers](https://math.berkeley.edu/~lott/ricciflow/perelman)、[Bamler graduate course](https://math.berkeley.edu/~rbamler/rfclass.html) | 非崩壊→kappa解→標準近傍→手術→消滅。Morgan–Tian第4部を有限時間消滅の基準 |
| RH | [Lean/Mathlib共同声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)、[Rubinstein作業稿・検証](https://www.math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/)、[MIT検証](https://math.mit.edu/~drew/grh/) | 既存RHPの版管理を継続。一般教科書は基礎、最新研究資料は証明責務の出典 |

今回は公開目次・講義案内・公式問題記述と関連資料の範囲を比較した。市販書全頁の精査や原論文全証明の再現を済ませたという意味ではない。各講の執筆時に該当節・版・定理番号と証明条件を固定し、原文や演習を転載しない。

## 3. 新規系列・講数（設計確定）

| 系列 | 内容 | 講数 | 直接の入口候補 |
|---|---|---:|---|
| ATOP | [位相幾何学 I–III（独立PLAN）](DREAM_THEATER_ALGEBRAIC_TOPOLOGY_PLAN.md) | 42 | TOP1–7、抽象代数、FIX1、MOD2、CATB7/GEO（必要箇所） |
| GCO | 算術コホモロジーと双対性 | 8 | ANF9–21、IWA18、CATB7-01〜05 |
| ETO | エタールコホモロジー・有限体ゼータ（共有発展） | 12 | AG3、CATB5、CATB7、GCO1–4、ATOP16–22,28–37,41–42（比較の箇所） |
| BSD | 楕円曲線の算術とBSD予想 | 20 | EC1–11、MF4–8、AFR必要箇所、ANF、IWA18、GCO |
| CYC | 交叉理論と代数的サイクル | 12 | AG2–3、CAG、ATOP28–37,41–42、GBG20–24 |
| HCP | Hodge予想と発展Hodge理論 | 12 | HOD1、CAG1-05〜10、CYC、ATOP、DEF1-12〜13（変動のみ） |
| RCG | Riemann幾何・幾何解析のコンパクト性 | 8 | GEO12–19、GA1–7、VAR4–8、GPDE、NPCGは必要箇所のみ |
| M3T | 3次元多様体論 | 12 | ATOP、GEO1–9 |
| RFL | HamiltonのRicciフロー | 16 | RCG、GA、EVOL、GPDE、NPDE4–7 |
| PCP | PerelmanのRicciフローとPoincaré予想 | 30 | RFL、M3T、VAR、GA、RCG |
| | **新設合計** | **172** | 共有発展ETO12を含む |

### 計数の区分

- 新設必修本線160講（ATOP42 + GCO8 + BSD20 + CYC12 + HCP12 + RCG8 + M3T12 + RFL16 + PCP30）と共有発展ETO12講＝172講。
- 既存の未実装RHP34を含め206講。CATB7の既存planned 5を含めた残作業は211講（この5講が未実装の基準コミットにおいて）。CATB8の2講、RMT30、一般Langlands/モチーフ、全幾何化は別枠。
- 系列IDは現行manifest一覧と衝突なし。実際の章ID・パスは初回実装時に再チェック。講番号の一意性と件数はこの表と下のシラバスで一致させる。

## 4. 正式シラバス：各講の中心問い・証明責務

各行は独立の主要学習目標・証明責務を持つ。外部引用と本文で証明すべき結果を区別し、単一の講が過密であれば規約に従い分割理由を残す。

### ATOP — 位相幾何学 I–III（42講、独立PLAN）

2026-11-26改訂：旧14講を未実装の段階で大学標準の独立科目へ再編。全42講の題名・証明責務・85図題と旧ID対応、実装状態の正本は[独立ATOP PLAN](DREAM_THEATER_ALGEBRAIC_TOPOLOGY_PLAN.md)。本横断PLANの講数に一度だけ含める。I ATOP1–12（図形・基本群・曲面）、II ATOP13–27（ホモロジー・写像度・応用）、III ATOP28–42（コホモロジー・双対性・多様体）。独立PLANとして状態管理し、本文実装時に他の9系列を同時着手扱いしない。

### GCO — 算術コホモロジーと双対性（8講）

入口: ANF9–21、IWA18、CATB7-01〜05。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| GCO1 | 連続Galois加群・複体・制限／余制限（IWA18の既出定義は参照） |
| GCO2 | inflation–restriction・Hochschild–Serre低次列 |
| GCO3 | Tateコホモロジー・Herbrand商・局所例 |
| GCO4 | Kummer理論・Brauer群・局所不変写像 |
| GCO5 | 局所Tate双対性の定式化・有限加群のpairing |
| GCO6 | 大域Poitou–Tate完全列・局所条件・直交補空間 |
| GCO7 | Selmer構造の比較・有限性・Euler特性の実例 |
| GCO8 | Cassels–Tate pairing・非退化性の条件とBSD／RHPへの接続 |

### ETO — エタールコホモロジー・有限体ゼータ（共有発展）（12講）

入口: AG3、CATB5、CATB7、GCO1–4、ATOP16–22,28–37,41–42（比較の箇所）。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| ETO1 | エタール射と標準例・Zariskiとの差 |
| ETO2 | 有限エタール被覆・幾何的基本群とGalois作用 |
| ETO3 | 小エタールsite・層・構成可能層 |
| ETO4 | 導来大域切断・有限係数の計算・長完全列 |
| ETO5 | Kummer列・Pic・Brauer・Tate twist |
| ETO6 | 固有基底変換・滑らかな基底変換の主張と適用条件 |
| ETO7 | 有限体のFrobenius・幾何的／算術的規約 |
| ETO8 | l進系・逆極限・曲線のコホモロジー |
| ETO9 | Poincaré双対性・Künneth・cycle class比較 |
| ETO10 | Lefschetz跡公式と点数の導出 |
| ETO11 | 曲線のWeil予想：Jacobian・Frobenius・正値性による証明 |
| ETO12 | 高次元Weil予想の定理とDeligneの証明構造・Tate予想／RHPへの境界 |

### BSD — 楕円曲線の算術とBSD予想（20講）

入口: EC1–11、MF4–8、AFR必要箇所、ANF、IWA18、GCO。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| BSD1 | 弱BSD・精密BSD：Q上の式、周期・regulator・Sha・Tamagawa・torsion |
| BSD2 | 正準高さの二次性・双線形化・高さ行列（EC5–6との差分） |
| BSD3 | 局所高さ・大域高さの分解と規格化 |
| BSD4 | 最小Weierstrassモデル・Kodaira型・Tate algorithmの例 |
| BSD5 | Néronモデル・成分群・Tamagawa数 |
| BSD6 | Tate曲線・分裂乗法的還元・局所高さの検算 |
| BSD7 | Néron微分・実周期・複素周期・積分の規格化 |
| BSD8 | Tate module・Weil pairing・局所Galois表現 |
| BSD9 | 有限Selmerの具体計算・2-descentの局所条件 |
| BSD10 | Sha・Cassels–Tate双対・有限性と非退化性を区別 |
| BSD11 | completed L関数・関数等式・root number・解析的階数 |
| BSD12 | モジュラー曲線X0(N)・Jacobian・Eへの写像とManin定数 |
| BSD13 | CM点・環類体・Heegner仮定とCM reciprocity |
| BSD14 | Heegner点のtrace・高さ・非零条件 |
| BSD15 | Rankin L関数と二次捻り・導関数の因子分解 |
| BSD16 | Gross–Zagier公式：規格化・外部定理・適用 |
| BSD17 | Kolyvagin類：補助素数・派生作用素・局所制限 |
| BSD18 | Euler系の関係式・Selmer階数制御・有限性への論理 |
| BSD19 | 解析的階数0／1の定理：補助二次捻りの非消滅を明示し階数とSha有限性を導出 |
| BSD20 | 精密BSDのp部分・岩澤理論・例の数値検算・高階数の停止線 |

### CYC — 交叉理論と代数的サイクル（12講）

入口: AG2–3、CAG、ATOP28–37,41–42、GBG20–24。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| CYC1 | サイクル群・次元／余次元・有理同値・Chow群 |
| CYC2 | 主因子とCH^1・Picの同一視・滑らかさの必要性 |
| CYC3 | 固有pushforward・平坦pullback・次数と射影公式 |
| CYC4 | 局所化完全列とホモトピー不変性の主張・計算 |
| CYC5 | Cartier因子との交叉・AG3-13の局所長から一般構成 |
| CYC6 | ベクトル束・射影束公式・ChowのChern類 |
| CYC7 | 正則埋込み・法束・正規錐 |
| CYC8 | 変形による法錐とGysin写像の構成 |
| CYC9 | 対角埋込みによる滑らかな多様体の交叉積・余次元 |
| CYC10 | 複素サイクルの基本類・Gysin・cycle class写像と積の整合性 |
| CYC11 | 代数的／ホモロジー的／数値的同値と対応の合成 |
| CYC12 | 射影空間・積・曲面・blow-upのChowとコホモロジー比較 |

### HCP — Hodge予想と発展Hodge理論（12講）

入口: HOD1、CAG1-05〜10、CYC、ATOP、DEF1-12〜13（変動のみ）。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| HCP1 | 有理Hodge類・Tate twist・予想の同値定式化 |
| HCP2 | 指数完全列・Picard群・第一Chern類 |
| HCP3 | Lefschetz (1,1)定理：指数列・Hodge分解・GAGAで閉じる |
| HCP4 | Hard Lefschetzで複素次元3以下の全余次元を証明 |
| HCP5 | 曲線の積・射影空間・曲面の例と具体cycle class |
| HCP6 | K3曲面のPicard格子・有理(1,1)とHodge数の区別 |
| HCP7 | 中間Jacobian・Abel–Jacobi写像と積分の周期 |
| HCP8 | Griffiths群・通常関数・有理同値より弱い不変量 |
| HCP9 | 混合Hodge構造：重み・開曲線の具体例 |
| HCP10 | Hodge構造の変動・Hodge locus・Cattani–Deligne–Kaplanの適用境界 |
| HCP11 | 整数Hodge予想の反例・torsionと有理係数の違い |
| HCP12 | 次元4の中間次数・既知例・Tate予想／モチーフとの接点と未解決性 |

### RCG — Riemann幾何・幾何解析のコンパクト性（8講）

入口: GEO12–19、GA1–7、VAR4–8、GPDE、NPCGは必要箇所のみ。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| RCG1 | 曲率テンソル・Ricci・断面曲率の規約と次元3の恒等式 |
| RCG2 | 測地線・距離関数・cut locusの障害とHessian比較 |
| RCG3 | Jacobi場とRiccati方程式・Laplace比較 |
| RCG4 | Bishop–Gromov体積比較・スケールと下限 |
| RCG5 | 単射半径・共役半径・Cheeger型下界の証明責務 |
| RCG6 | 局所Sobolev・等周・調和座標と正則性 |
| RCG7 | pointed Cheeger–Gromov収束・幾何的コンパクト性 |
| RCG8 | スケール変換・曲率導関数・pointed極限の例 |

### M3T — 3次元多様体論（12講）

入口: ATOP、GEO1–9。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| M3T1 | 滑らかな閉3多様体・三角形分割・PL／smooth境界 |
| M3T2 | handlebody・Heegaard分解・基本群の表示 |
| M3T3 | 連結和・分離2球面・prime／irreducibleの違い |
| M3T4 | sphere theorem・loop theoremの正確な適用（外部定理） |
| M3T5 | prime分解・有限性・一意性の証明の骨格 |
| M3T6 | Dehn surgery・solid torus・lens spaceの計算 |
| M3T7 | 被覆・球面空間形・有限群作用 |
| M3T8 | 3次元の八幾何と幾何構造の例 |
| M3T9 | compressible／incompressible torusとJSJの位置付け |
| M3T10 | 首の切断・球でcap・連結和の逆操作 |
| M3T11 | 単連結・H2・pi2とS2掃引族への位相的準備 |
| M3T12 | 手術後消滅から初期多様体の連結和を復元し単連結で結論 |

### RFL — HamiltonのRicciフロー（16講）

入口: RCG、GA、EVOL、GPDE、NPDE4–7。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| RFL1 | Ricciフロー・定曲率空間・積計量・スケール |
| RFL2 | 逆計量・体積要素・接続の変分 |
| RFL3 | 曲率テンソル・Ricci・スカラー曲率の発展 |
| RFL4 | 微分同相不変性と弱放物性 |
| RFL5 | DeTurck trick・strict parabolicity |
| RFL6 | 短時間存在と一意性：準線形放物系の入力と復元 |
| RFL7 | スカラー最大値原理・曲率下限 |
| RFL8 | テンソル最大値原理・不変凸錐 |
| RFL9 | 3次元曲率作用素とHamilton–Ivey pinching I |
| RFL10 | Hamilton–Ivey pinching II：ODE barrier・例外領域 |
| RFL11 | Shi導関数評価 I：局所化とBernstein法 |
| RFL12 | Shi導関数評価 II：高階帰納・完全性 |
| RFL13 | 延長条件と有限時間特異点・point picking |
| RFL14 | Hamiltonコンパクト性定理：時空間極限と単射半径 |
| RFL15 | Ricci soliton・自己相似解・丸い球と円柱 |
| RFL16 | Hamilton Harnack評価の主張・非負曲率・ancient解への接続 |

### PCP — PerelmanのRicciフローとPoincaré予想（30講）

入口: RFL、M3T、VAR、GA、RCG。実際の直接prerequisiteは章ごとに最小化する。

| 講 | 内容・証明責務 |
|---|---|
| PCP1 | 共役熱方程式・測度の保存・後退時間 |
| PCP2 | F汎関数の第一変分と単調性 |
| PCP3 | Wエントロピー・規格化・単調性の全計算 |
| PCP4 | mu／nu汎関数・下界・スケール不変性 |
| PCP5 | 閉多様体の局所非崩壊 I：テスト関数と対数Sobolev |
| PCP6 | 局所非崩壊 II：局所化・曲率上界・背理法 |
| PCP7 | L長さ・第一変分・L測地線 |
| PCP8 | L長さの第二変分とreduced distance不等式 |
| PCP9 | reduced volume単調性とrigidity |
| PCP10 | point picking・parabolic rescaling・特異点極限 |
| PCP11 | 3次元kappa解の定義・pinching・非崩壊 |
| PCP12 | kappa解の曲率比較・Harnack・局所微分評価 |
| PCP13 | 非コンパクトkappa解の漸近縮小解・体積比 |
| PCP14 | kappa解の標準近傍：neck／cap／compact |
| PCP15 | 標準近傍定理 I：反証列・blow-up極限 |
| PCP16 | 標準近傍定理 II：スケールと時間の一様性 |
| PCP17 | 標準解・capモデルの構成と存続 |
| PCP18 | 手術パラメータ：epsilon、r、delta、hと切断曲率 |
| PCP19 | strong neckの同定・切断・cap貼付と曲率制御 |
| PCP20 | 手術後の標準近傍と短時間局所制御 |
| PCP21 | 手術付き非崩壊定理：L曲線と手術障害 |
| PCP22 | 帰納的手術フロー存在：パラメータ選択と局所有限性 |
| PCP23 | 体積減少・discardされる成分・有限時間の手術数 |
| PCP24 | 極小曲面／minimax幅の定義と正値性 |
| PCP25 | 球面積の変分・Gauss–Bonnet・幅の微分不等式 |
| PCP26 | 手術を跨ぐ幅の制御・掃引族の変形 |
| PCP27 | 有限時間消滅：微分不等式の積分と位相条件 |
| PCP28 | 消滅した成分の位相分類・連結和復元 |
| PCP29 | Poincaré予想の完全な論理鎖と依存監査 |
| PCP30 | 幾何化の長時間側との区別・総合証明・典型的循環の排除 |

## 5. 依存順と独立着手可能性

```text
TOP → ATOP1–12 → ATOP13–27 → ATOP28–42 → CYC → HCP
                    ↘ M3T ──────────────────┐
GEO/GA/GPDE/VAR → RCG → RFL → PCP1–23 ───────┼→ PCP24–30
                                              ┘
ANF/EC/IWA18/CATB7 → GCO → BSD
AG3/CATB5/CATB7/GCO1–4 → ETO (比較はATOP該当章)
ANT/ANF/MF/EC/AFR/IWA → RHP（既存34）
```

- ATOP1（以後は必要前提が揃い次第）, RCG1, BSD1–7は必要な完成前提から先行着手できる。ATOP29でExt/Torを使う際はCATB7-05の完成を確認し、Torが不足するならATOP29で必要な分解・Torの定義と計算を所有する。GCO1–4とETO1–3は独立する範囲を切り、まだ存在しない章からの逆参照を禁止。
- M3Tの早い講はATOP1–12の該当講で着手可。M3T11のπ2≅H2にはHTOP6を参照し、ATOP26の次数1と混同しない。PCPの解析部分はM3T全講を待たなくてよい。消滅の結論だけM3T11–12を必須とする。RFL6の準線形放物系は既存半線形EVOL6と同一視せず、局所存在定理の具体的仮定と証明責務を別記。
- GCOとBSDの早い実曲線・モデル講を並行実施可。BSD18/19はGCOの双対・局所条件とBSD12–17を必要とする。ETOはBSD階数0/1定理の必須全履修にしない。
- RHP1–23は既存planの着手順維持。RHP24–25ではGCO1–7を補強参照、RHP28ではETO5/9等を必要に応じ参照。ただしこれらを根拠に高ランク局所大域対応や未解決の研究補題を証明済み扱いしない。RHPの今の34講を止めず、既存の直接前提・条件付き研究講読の境界を保持。実際に依存する章が完成した時点でRHP planの直接参照を最小差分で追記。
- HCP9–10の周期写像はDEF1-12/13へリンク。HCP4の低次元証明はHCP9以降を必要としない。HCP12のモチーフ・Tate予想の一般理論は発展先で、全講義化は本planの外。

## 6. 証明契約・完了ゲート

| 対象 | 必ず本文またはcanonical dependencyで閉じる内容 | 引用・停止線 |
|---|---|---|
| ATOP | van Kampen、切除、Mayer–Vietoris、係数・積・双対・de Rham比較の主要論証 | 一般の高次ホモトピー理論、全スペクトル系列 |
| GCO/ETO | 制限・余制限、低次完全列、具体的pairing、Kummer、跡公式から点数、曲線のWeil予想の標準証明（Jacobianの正値性を含む） | 一般Tate/Poitou–Tate、基底変換・跡公式そのもの・一般Deligne純性の深い証明は明示引用。曲線の正値性に必要なJacobian／Rosatiの補題をETO11内で証明または引用条件を特定 |
| BSD | 全ての精密式因子の定義・具体算出、局所条件、rank 0/1の階数一致・Sha有限性への論理、二次捻りの非消滅入力の適用 | Modularity、Gross–Zagier一般式、Kolyvagin Euler系定理、非消滅定理、一般Tate algorithm・Néronモデル存在の全証明は引用。p部分の既知定理の仮定を個別に区別 |
| CYC/HCP | Chowの基本演算・滑らかな交叉積の構成、cycle classの型、指数列から(1,1)、Hard Lefschetzによるdim<=3 | Fultonの全一般性、混合Hodgeの一般存在、Hodge locus、整数反例の原論文全証明は引用。HCP12で未解決を明示 |
| RCG/RFL | 比較・単射半径評価の役割、幾何コンパクト性、DeTurck、曲率発展、最大値、pinching、Shi、Hamilton compactnessの核心 | 一般の準線形放物系は条件を確認した既存定理として引用可。引用と完全な論証の境界を明記 |
| PCP | W単調性、非崩壊、L長さ・reduced volume、kappa解・標準近傍、手術構成と非崩壊、幅の不等式・有限時間消滅・位相結論の依存鎖 | 標準近傍・手術付き存在・minimaxの核心を「既知」で省略しない。Morgan–Tian該当節を補助定理ごとに割付け、必要なら講数増加。幾何化の長時間解析は別。完了時に外部入力の一覧と再構成済み範囲を監査 |
| RHP | 現行RHP PLANの証明責務表を維持 | Lean認証済と人間可読証明の未再構成箇所を区別 |

各新講はA4/B3/C1以上、全問詳細解答、本文・chapter.yaml・knowledge.yaml・実在するstable anchor、読者粒度査読、独立数理査読、必要な公開索引・CIを満たす。講数の形式的最低演習数は172×8=1376題（A688/B516/C172、追加は必要に応じて）。定理引用は対象・仮定・結論・適用箇所・原典節と、どこを証明したかを記録する。数値実験（BSDの有理点・局所因子・L値、Hodge数、Ricciの定曲率モデル）は証明の代用にしない。

## 7. 状態管理・次作業

本作業は設計のみなので plans/ に置き、既存planを移動せず、未実装章・系列manifest・公開目次・global knowledge DAGを先行登録しない。初回実装時に系列manifestを作る。複数系列が並行する横断planは初回実装時に共通planをplans_progressへ移動し、直接参照する全manifestを同時更新。既存RHP/数論planは独立に維持し、重複章やID変更は作らない。新規10系列全講（ATOPは独立PLANで完成判定）と横断証明責務・索引・CI完了後だけdoneへ移動する。

優先順: ATOP1、RCG1、BSD1を独立先行 → GCO（CATB7の必要講完了後）→ CYC/HCP、M3T/RFL/PCP、BSD後半 → ETO共有発展を並行。RHPの研究講読は現在の34講の正本に従う。

監査残差: 既存全章の本文/knowledge.yamlと全依存辺の機械的閉包検査は未実施。対象新講着手時に直接前提の定義・定理・証明を再確認し、既存不足・重複を発見したら講数変更を記録する。本計画は教材の設計値を確定したもので、既存数学全体の再査読完了を宣言するものではない。
