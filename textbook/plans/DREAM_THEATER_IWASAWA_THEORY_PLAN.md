# DREAM THEATER 岩澤理論（IWA1〜IWA20）

設計確定: 2026-11-21 JST  
状態: designed / **全20講確定**。章本文・系列manifest・公開索引は未着手。  
系列ID: \`IWA\`。分野: 代数系。上流の新規計画: [ANF1〜ANF22](DREAM_THEATER_ALGEBRAIC_NUMBER_THEORY_CLASS_FIELD_THEORY_PLAN.md)。横断: [RH研究講読ルート](DREAM_THEATER_IWASAWA_AUTOMORPHIC_RH_ROUTE_PLAN.md)。

## 中心問い・到達目標

**なぜ円分体を一つずつ調べる代わりに無限塔の極限を取ると、類群の増大とp進L関数が同一の構造として現れるのか。**

有限体の類群・単数、Galois群、局所類体論から入り、\`Z_p\`拡大、\`Lambda=Z_p[[T]]\`上の加群の構造、\`lambda,mu,nu\`不変量、p進測度とL関数、円分岩澤主予想（定理）、Selmer群と保型的算術への橋まで扱う。

**停止線:** 主予想を「RH/GRHの証明」と同一視しない。Mazur–Wiles／Rubinの深い外部定理の一般証明を20講で完結したと称しない。証明する部分（構造定理からの成長、有限層での諸計算、明示的な補題、適用の核心）と、出典付きで仮定・結論を引用する部分を厳密に分離する。\`IWA19\`以降の楕円曲線／保型形式上の主予想は、一般形がすべて解決済みだと誤記しない。

## 教科書・公開講義との比較と採用

| 参照書・資料 | 採用対象 | このPLANの役割 |
|---|---|---|
| Lawrence C. Washington, *Introduction to Cyclotomic Fields* (2nd ed.) | 円分体、Bernoulli数、p進L関数、\`Z_p\`拡大と類数の成長 | 数学的主線と初等例の基準 |
| John Coates & R. Sujatha, *Cyclotomic Fields and Zeta Values* | 円分単数、岩澤主予想、Euler system / Rubin型経路 | 主予想の証明依存を点検する上級基準 |
| Romyar Sharifi, *Iwasawa Theory*（公開講義ノート） | 類群・単数→岩澤代数→測度→主予想という段階的な橋 | 具体的補題と同値条件を照合 |
| J. Neukirch, A. Schmidt & K. Wingberg, *Cohomology of Number Fields* | Galoisコホモロジー、局所／大域dualities、Selmerの前提 | 群コホモロジーが必要になった時の厳密な依存監査 |
| B. Forrás, *Iwasawa Theory*（公開講義ノート） | Washington／Lang／Coates–Sujatha間の学習順と補助例 | 連続性と例の読者粒度を校正 |

主要一次参照:
- Washington: https://link.springer.com/book/10.1007/978-1-4612-1934-7
- Coates–Sujatha: https://link.springer.com/book/10.1007/978-3-540-33069-1
- Sharifi: https://www.math.ucla.edu/~sharifi/notes/iwasawa.html
- Forrás: https://www.bforras.eu/docs/Forr%C3%A1s_Iwasawa_Theory_blue.pdf
- MIT研究セミナー過去シラバス: https://math.mit.edu/nt/old/stage_f17.html

参照は公開目次・本文の閲覧可能部分・講義アウトラインを対象とする。全市販書を読破したとは主張せず、著作物の証明文章や演習を転載しない。

## 依存の最小化

- IWA1〜7: \`ANF1〜ANF7\`（イデアル類群）、\`ANF9〜ANF13\`（p進体）、\`ANF22\`（円分塔）、\`RNG/FLD\` の既出結果。
- IWA8〜12: \`IWA1〜7\`, \`ANF14〜21\` の必要な類体論・ノルム写像、p進完備代数の章内導入。
- IWA13〜17: \`ANT2〜3\`（Dirichlet L関数）、\`ANF8\`（Dedekind ζ）、\`IWA3〜12\`。補助的な解析結果は \`CA12\` が既に証明した部分のみ再利用。
- IWA18〜20: \`EC\` と \`MF\` の必要な完成章、\`ANF\` のCM／局所群が初出の場合は章内導入する。保型表現 \`AFR\` の全講を前提にせず、直接使用する概念だけを明示。
- 個別章の実装時に実在stable anchor・knowledge DAGに合わせて直接prerequisitesを確定する。シリーズ単位の一律全件prerequisite指定はしない。

## 講義一覧（20講、各講に中心問いと証明ゲート）

| ID | 講義・中心問い | 主要な数学的確認 |
|---|---|---|
| IWA1 | p進数から無限拡大へ：なぜ塔を作るか | \`Z_p\`群、\`Z_p\`拡大の定義、有限層・無限層の分離 |
| IWA2 | 円分\`Z_p\`拡大とGalois群 | \`Gal(Q(mu_{p^n})/Q)\`の射影系、\`Delta×Gamma\`の条件（p=2に注意） |
| IWA3 | 岩澤代数・完備群環 | \`Z_p[[Gamma]]≅Z_p[[T]]\`と位相・位元の規格化 |
| IWA4 | ノルム・制限と逆極限 | 有限類群と局所単数の遷移写像、逆極限の普遍性 |
| IWA5 | 岩澤加群のtorsion／擬同型 | 有限生成torsion \`Lambda\`加群、擬零（有限）部分と構造定理 |
| IWA6 | Weierstrass準備・特徴イデアル | distinguished多項式、\`mu/lambda\`不変量、元の既約性と素因子 |
| IWA7 | 類数成長公式 | \`v_p(h_n)=lambda n+mu p^n+nu\`の十分大きなnでの条件・導出 |
| IWA8 | 円分体の類群と指標成分 | Teichmüller指標、偶奇成分、類群と複素共役の作用 |
| IWA9 | 分岐条件と無分岐最大p拡大 | \`X_infty\`をGalois群とする定義、類体論との対応 |
| IWA10 | 円分単数・ノルム整合性 | 明示的円分単数、群の指数、ノルムの実計算 |
| IWA11 | 局所／大域単数の完全列 | ノルム・局所化・類群との完全列の各矢印、実際の核・余核 |
| IWA12 | 控制定理（control）の原型 | 有限層と無限層のcoinvariants、核・余核の有界性に必要な仮定 |
| IWA13 | p進測度・積分とIwasawa代数 | 分布関係、連続関数への線形汎関数、p進Mellin変換 |
| IWA14 | Kummer合同とBernoulli数 | 補間の整合条件、p進連続性、明示的特殊値の検算 |
| IWA15 | Kubota–Leopoldt p進L関数 | 指標・正規化・補間式、Euler因子とtrivial zeroの説明 |
| IWA16 | 円分岩澤主予想：正確な定式化 | 適切な指標成分・twist・特徴イデアルとL関数の同一性、例外成分 |
| IWA17 | 主予想の証明戦略とEuler systems | Mazur–Wiles／Rubinの標準経路と差の確認、完全に証明する補題／外部入力の分離 |
| IWA18 | Selmer群とPontryagin双対 | 局所条件、制限写像、有限生成\`Lambda\`加群の構成、楕円曲線の具体例 |
| IWA19 | CM楕円曲線・Hecke指標のp進算術 | CMと非CMを区別、Hecke指標・p進L関数の接続、適用範囲 |
| IWA20 | 保型形式・岩澤塔・2026年RH発表への接続 | 塔／局所条件／L関数の役割を既知の主予想と新たな証明主張で区別、\`AFR23〜24\`へ橋渡し |

### 各章の独習サイクル

導入前の用語確認 → 群・環・場の小さな計算例 → formal定義 → 定理の仮定と証明（重要中間式を埋める） → 反例 → 演習 **A4・B3・C1以上** と全詳細解答。たとえばIWA7では群の指数から有限階層のp部分の位数まで計算、IWA15では指標のパリティ／特殊値の定義域を確認する。講義数のために未証明の主予想へ飛ばさない。

## 重要な検証境界

1. **p=2とp奇素数**、\`Gal\`の分解、\`Gamma\`の位相生成元、\`T=gamma-1\`の規約を必要箇所で指定。
2. 擬同型と実際の同型、torsionの必要性、\`mu=0\`の既知条件を混同しない。特定の\`mu=0\`定理を一般の\`Z_p\`拡大全てに流用しない。
3. \`IWA7\`の指数公式はすべての有限層で成立と書かず**十分大きなn**を明記。引数、類数のp-primary部分の解釈を明示。
4. \`IWA16\`では「主予想」は対象・指標・twist・局所Euler因子・正規化を固定しないと誤式になるため、出典にある精確な形へ分解。定理の一般証明が外部依存ならその事実を前面に出す。
5. \`IWA18\`の局所条件は良い普通還元・超特異還元、普通／符号付Selmerなどで変わる。条件を明記せずに特徴イデアルの等式を出さない。
6. \`IWA20\`は2026-11-20のLevent Alpöge / Claudeの**未検証RH・GRH証明主張**を研究動機として扱う。岩澤主予想が直接RHを含意するといった架空の論理は作らない。

## 着手・完了運用

新規設計なので \`textbook/plans/\` に保管し、\`IWA1\`着手時に \`plans_progress/\` へ移動、\`textbook/dream-theater-series/IWA.yaml\`に **20件のplanned** を作る。\`IWA1\`の独習者向け本文・\`chapter.yaml\`・\`knowledge.yaml\`が完成したら初めて該当1件を\`completed\`へ変更し、科目別目次を更新する。共有ルーターは改変しない。終端の\`IWA20\`完了後も系列横断査読・参照整合が済むまで\`plan_done/\`へ移動しない。
