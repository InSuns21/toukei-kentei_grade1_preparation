# DREAM THEATER — 一般化Poincaré予想・微分トポロジー（全96講）

設計日: 2026-11-25 JST。監査基準 main: `ed61aa3bba8cdcf4b8dc955a8da6fce104c85315`。
状態: 設計済・未実装。新設6系列96講。FOUR FRONTIERSの144講とは独立した追加計画で、そこで計画済みのATOP14・M3T12を重複計上しない。前者はPR #4706（設計時点でopen）を参照し、実装前にマージ・実装状況と正本パスを確認する。96講は講義の粒度・証明責務に基づく設計値。変更時は理由と件数を記録する。

## 0. 中心問いと到達点

閉n次元ホモトピー球面が標準球面と同相か、PL同相か、微分同相かを区別する。3次元のHamilton–Perelman証明（別PLANのPCP）を繰り返さず、n>=5と4次元の別次元における位相的証明を学ぶ。これは3次元予想の別証明ではない。

| 対象 | 目標と停止線 |
|---|---|
| n>=6 の滑らかなホモトピー球面 | 二円板貼り合わせへの還元、h-cobordismとAlexander trickから位相同相を再構成。境界球面の微分同相が円板内へ滑らかに延長するとは限らない |
| n=5 | 6次元以上のh-cobordismを5次元の穿孔コボルディズムへ誤適用しない。Smaleのn>=5定理とKervaire–MilnorのTheta_5=0の証明入力を個別に追う |
| n>=5 の一般TOP/PL | 滑らかさを暗黙に仮定せず、Stallings・Zeeman・高次元TOPの結果との関係を区別。一般TOPの全証明は原典定理を引用 |
| n=4 TOP | Freedmanの単連結閉4多様体分類からホモトピー4球面がS^4と同相であることを証明。disk embeddingとCasson handleを研究講読する |
| n=4 DIFF | Donaldson・Seiberg–Witten理論の具体的成果を学ぶが、滑らかな4次元Poincaré予想は未解決。一般のエキゾチック4多様体やexotic R^4はエキゾチックS^4の存在を意味しない |
| n>=5 DIFF | MilnorのエキゾチックS^7等、滑らかな一般化予想は全次元では成立しない。Theta_nの理論を理解する |

単連結だけではn>=4で球面とならない。CP^2、S^2×S^2を比較し、単連結かつ球面と同じ整数ホモロジー→ホモトピー球面の導出にはHurewicz/Whiteheadを用いる。

## 1. 既存正本の再利用

| 既存／計画済 | 再利用 | 新系列が所有する残差 |
|---|---|---|
| TOP1–7、GEO1–9 | 位相、多様体、接束、微分形式、de Rham | ATOP（別PLAN）で基本群・特異鎖・双対、HTOPで高次理論 |
| ATOP1–14、M3T1–12（PR #4706） | van Kampen・CW・特異コホモロジー・Poincare双対、3次元ハンドル体・Dehn手術 | 本PLANで再新設しない。MORSの一般次元ハンドルとTOP4DのKirby計算のみ追加 |
| CATB7-01〜05（既存計画）、CATB8必要箇所 | 複体、導来関手、符号 | HTOP10のフィルトレーション・スペクトル系列、CBOの幾何的鎖複体 |
| VAR11–12（completed） | minimax・Morse指数 | Morse補題、ハンドル付着、MorseホモロジーはMORSが担当 |
| GBG1–30（completed） | 主束・接続・Chern–Weil・特性類・ASD・BPST・spin | DIFF4DはASD/SWの変形複体、モジュライ、指数、4次元不変量。GBG27–30を根拠に指数定理やUhlenbeck compactnessが証明済みとはしない |
| GA1–9、GPDE、関数解析、LREP必要箇所 | 楕円型理論、調和形式、Bochner、表現 | 4次元ゲージ特有のslice、コンパクト性、gluing |
| HOD1、KAH1、CAG | Kähler曲面・Hodge理論・複素曲面 | SWのKähler例へ応用。CYC/HCP全講は必修にしない |
| GW1、FLOER1-01〜05（別計画） | Fredholm、横断性、非コンパクト端、gluingの類似 | 対象が異なる。Lagrange Floerの定理を4次元ASD/SWへ流用しない。全Floer履修は必修にしない |

監査はmainの系列一覧・plans/plans_progress・GBG/VARのmanifest・HMS/FLOER計画および先行PRの設計との照合。全本文・knowledge.yamlの独立再査読ではない。執筆時に各結果の実在するstable anchorと証明範囲を照合し、直接prerequisiteを最小化する。既存IDおよび前回提案10系列と新規6系列の衝突はない（着手時再確認）。

## 2. 教科書・公開講義・原典による校正

| 系列 | 文献 | 設計判断 |
|---|---|---|
| HTOP | [Hatcher, Algebraic Topology Ch.4](https://pi.math.cornell.edu/~hatcher/AT/ATchapters.html)、May, A Concise Course in Algebraic Topology | 相対群→Whitehead/Hurewicz→安定化。全高次ホモトピー群計算は対象外 |
| MORS/CBO | Milnor, Morse Theory; [Lectures on the h-Cobordism Theorem](https://press.princeton.edu/books/paperback/9780691273723/lectures-on-the-h-cobordism-theorem)（Morse関数による完全な証明）、Hirsch, Differential Topology; Smale, Generalized Poincaré's Conjecture in Dimensions Greater Than Four | 横断性からハンドル相殺までを閉じる。Wの次元と境界の次元を分ける |
| SURG | [Ranicki, Algebraic and Geometric Surgery](https://academic.oup.com/book/9774)、Wall, Surgery on Compact Manifolds; Kervaire–Milnor, Groups of Homotopy Spheres I | 幾何的手術、normal maps、L理論、構造集合を分離。5次元・Theta_nは個別責務 |
| TOP4D | [Gompf–Stipsicz, 4-Manifolds and Kirby Calculus](https://doi.org/10.1090/gsm/020)、[Freedman–Quinn, Topology of 4-Manifolds](https://www.jstor.org/stable/j.ctt7ztz2d)、[Powellのdisk embedding講義資料](https://www.maths.gla.ac.uk/~mpowell/freedmannotes.html)、[Powell–Ray–Teichner, The 4-dimensional disc embedding theorem and dual spheres](https://doi.org/10.1007/s00029-025-01069-y) | finite towerと無限Casson handle、代数的／幾何的双対の区別。現代の証明修正も反映 |
| DIFF4D | [Donaldson–Kronheimer, The Geometry of Four-Manifolds](https://academic.oup.com/book/52942)、[Morgan, The Seiberg–Witten Equations and Applications](https://press.princeton.edu/books/paperback/9780691025971/the-seiberg-witten-equations-and-applications-to-the-topology-of)、[Moore, Lectures on Seiberg-Witten Invariants](https://link.springer.com/book/10.1007/978-3-540-40952-6)、[Stipsicz mini-course](https://ttss.math.gatech.edu/stipsicz-mini-course/) | ASDとSWを別の解析系として扱う。SWの具体例で位相分類と微分分類の相違を学ぶ |

公開目次・出版社の内容紹介・講義案内・論文abstractを照合した設計であり、市販書全頁の精読ではない。証明の出典は実装時に版・節・定理番号で確定し、本文・演習の転載はしない。

## 3. 講数確定

| 系列 | 内容 | 講数 | 主な入口 |
|---|---|---:|---|
| HTOP | 高次ホモトピー理論 | 14 | ATOP1–14（別PLAN、未実装）、CATB7必要部分 |
| MORS | 微分トポロジー・Morse理論・ハンドル | 14 | GEO1–9、ATOP1–8、VAR11–12（変分法の既習部分） |
| CBO | コボルディズムとh/s-cobordism | 12 | MORS、HTOP1–6、ATOP9–14 |
| SURG | 高次元手術理論・エキゾチック球面 | 16 | CBO、HTOP7–14、GBG20–24（特性類） |
| TOP4D | 4次元位相トポロジーとFreedman理論 | 20 | MORS、ATOP、M3T（Dehn surgery等）、CBOの定理境界、SURG1–4（高次元との比較） |
| DIFF4D | 滑らかな4次元多様体とゲージ理論 | 20 | TOP4D1–8,17–20、GEO/GA、GBG20–30、VAR、関数解析・GPDE、LREP必要部分 |
| | **合計** | **96** | ATOP/M3T等の既存計画を除く |

暫定80講案から96講へ変更。高次ホモトピー+2、微分トポロジー/Morse+4、手術+2、TOP4D+4、DIFF4D+4。4次元のKirby計算・円板埋め込み、ゲージ理論の解析を一括の紹介講で済ませず、横断性・次元条件・n=5の独立責務を置いた。FOUR FRONTIERS144講と合算240新設講。既存RHP34を含め274、既存CATB7の5講をさらに含め279（先行PLANと同じ計数条件）。

## 4. 個別講義の中心問い・証明責務

### HTOP — 高次ホモトピー理論（14講）

入口候補: ATOP1–14（別PLAN、未実装）、CATB7必要部分。

| 講義ID | 中心問い・証明責務 |
|---|---|
| HTOP1 | 相対ホモトピー群・完全列・基点と作用 |
| HTOP2 | ファイブレーションとホモトピー持上げ・長完全列 |
| HTOP3 | Hopfファイブレーションと球面の低次ホモトピー群 |
| HTOP4 | CW近似・胞体近似・相対CW対 |
| HTOP5 | Whitehead定理・弱ホモトピー同値 |
| HTOP6 | Hurewicz定理と単連結ホモロジー球面の判定 |
| HTOP7 | ホモトピー余ファイブレーション・写像錐・懸垂 |
| HTOP8 | Blakers–MasseyとFreudenthal懸垂定理の適用条件 |
| HTOP9 | 安定ホモトピー群・スペクトルの入口 |
| HTOP10 | スペクトル系列のフィルトレーション・収束・低次数計算 |
| HTOP11 | Serreスペクトル系列と球面ファイブレーションの例 |
| HTOP12 | Eilenberg–Mac Lane空間・Postnikov塔 |
| HTOP13 | ベクトル束の分類空間・安定束・KO理論の入口 |
| HTOP14 | J準同型・安定ホモトピーと球面の微分構造への接続 |

### MORS — 微分トポロジー・Morse理論・ハンドル（14講）

入口候補: GEO1–9、ATOP1–8、VAR11–12（変分法の既習部分）。

| 講義ID | 中心問い・証明責務 |
|---|---|
| MORS1 | 正則値・Sard定理・一般位置の仮定 |
| MORS2 | 横断性・相対横断性と交叉次元の公式 |
| MORS3 | 埋込み・浸入・Whitney埋込み定理の役割 |
| MORS4 | 管状近傍・法束・framing・collar |
| MORS5 | isotopy extension・境界と角の平滑化 |
| MORS6 | Morse関数・非退化臨界点・Morse補題の証明 |
| MORS7 | gradient-likeベクトル場・正則レベル間の積構造 |
| MORS8 | 臨界値を跨ぐハンドル付着の局所証明 |
| MORS9 | ハンドルの双対性・belt sphere・境界の手術 |
| MORS10 | 臨界値の並べ替え・handle slide・交叉行列 |
| MORS11 | ハンドルの生成・相殺定理と幾何的交叉条件 |
| MORS12 | Morse複体・Morse–Smale横断性・境界の二乗零 |
| MORS13 | Morseホモロジーと胞体／特異ホモロジーの比較・Morse不等式 |
| MORS14 | Whitney disk・framing・Whitney trickと次元制約 |

### CBO — コボルディズムとh/s-cobordism（12講）

入口候補: MORS、HTOP1–6、ATOP9–14。

| 講義ID | 中心問い・証明責務 |
|---|---|
| CBO1 | コボルディズム・向き・境界・積・同値関係 |
| CBO2 | 相対ハンドル分解とホモトピー同値の条件 |
| CBO3 | 単連結h-cobordismの相対鎖複体・acyclic性 |
| CBO4 | 低指数ハンドルの消去・連結性の制御 |
| CBO5 | 交叉行列を単位行列へ：整数基本変形とhandle slide |
| CBO6 | Whitney trickで代数的交叉を幾何的交叉にする条件 |
| CBO7 | 相殺の実行とSmaleのh-cobordism定理（Wの次元6以上） |
| CBO8 | 非単連結の場合：群環の交叉係数と基点の道 |
| CBO9 | Whitehead torsion・K1・Wh群と計算例 |
| CBO10 | s-cobordism定理・torsion零の条件・実現の引用境界 |
| CBO11 | ホモトピー球面から二円板の貼り合わせへ（n>=6） |
| CBO12 | Alexander trick・位相同相の結論・滑らかな延長の限界 |

### SURG — 高次元手術理論・エキゾチック球面（16講）

入口候補: CBO、HTOP7–14、GBG20–24（特性類）。

| 講義ID | 中心問い・証明責務 |
|---|---|
| SURG1 | 埋め込まれたframed球面に沿う手術・trace cobordism |
| SURG2 | 手術による基本群と低次ホモトピー群の変更 |
| SURG3 | 一般位置・法束自明化・手術可能性の条件 |
| SURG4 | 中間次元の交叉形式・手術核と双対性 |
| SURG5 | Pontryagin–Thom構成・framed cobordism |
| SURG6 | 安定法束・法写像・normal invariant |
| SURG7 | 次数1法写像から手術問題を構成する |
| SURG8 | 中間次元のquadratic refinement・偶奇・Arf不変量 |
| SURG9 | 群環上のL群・単連結L群の主張と具体例 |
| SURG10 | 手術障害・零障害とホモトピー同値への手術 |
| SURG11 | 構造集合・normal invariant・手術完全列 |
| SURG12 | n=5の別処理：Smaleの結果と境界次元を区別、Theta_5=0への文献ルート |
| SURG13 | PL／TOP／DIFFの区別・TOP/PL・PL/Oの役割、位相多様体への一般化 |
| SURG14 | MilnorのS^7束の例・ホモトピー球面判定・微分同相障害 |
| SURG15 | Kervaire–MilnorのTheta_n・bP群・J準同型・Theta_7の位数28 |
| SURG16 | 次元別総合：高次元Poincareの証明・滑らかな版が一般に偽である理由 |

### TOP4D — 4次元位相トポロジーとFreedman理論（20講）

入口候補: MORS、ATOP、M3T（Dehn surgery等）、CBOの定理境界、SURG1–4（高次元との比較）。

| 講義ID | 中心問い・証明責務 |
|---|---|
| TOP4D1 | 閉向き付き4多様体・Euler標数・signature・交叉形式 |
| TOP4D2 | unimodular形式・偶奇・hyperbolic form・E8の具体計算 |
| TOP4D3 | spinと交叉形式・w2・Kirby–Siebenmann不変量の区別 |
| TOP4D4 | 4次元ハンドル図・framed link・linking matrix |
| TOP4D5 | Kirby move・handle slide・cancelの図式と代数 |
| TOP4D6 | 境界3多様体・Dehn surgery・homology sphere・Rokhlin不変量 |
| TOP4D7 | 局所平坦埋込み・TOPとDIFF・wild embeddingの反例 |
| TOP4D8 | 浸入円板・交叉数・自己交叉・Whitney diskの障害 |
| TOP4D9 | kinky handle・符号付き木・Casson towerの有限段 |
| TOP4D10 | Casson handleの無限塔・開集合・endの管理 |
| TOP4D11 | Casson handle定理：位相的標準開2ハンドルと滑らかな主張の差 |
| TOP4D12 | capped grope・capsの交叉・height raisingの構成 |
| TOP4D13 | 円板埋込み定理の仮定・代数的双対球面・good group |
| TOP4D14 | 円板埋込み定理の核心 I：grope／towerへの還元 |
| TOP4D15 | 円板埋込み定理の核心 II：無限構成・局所平坦性と幾何的双対 |
| TOP4D16 | 4次元topological surgeryと5次元topological h-cobordismの適用条件 |
| TOP4D17 | Freedmanの存在定理：unimodular form・KSの整合 |
| TOP4D18 | Freedmanの分類・一意性：単連結閉位相4多様体 |
| TOP4D19 | ホモトピー4球面の交叉形式0・KS=0・S^4同相の導出 |
| TOP4D20 | E8多様体・滑らかさの障害・高次元の手術との比較 |

### DIFF4D — 滑らかな4次元多様体とゲージ理論（20講）

入口候補: TOP4D1–8,17–20、GEO/GA、GBG20–30、VAR、関数解析・GPDE、LREP必要部分。

| 講義ID | 中心問い・証明責務 |
|---|---|
| DIFF4D1 | 4次元Hodge star・自己双対／反自己双対2形式・b2± |
| DIFF4D2 | spin・Spin^c構造・determinant line・Clifford作用 |
| DIFF4D3 | Dirac作用素・Weitzenböck公式・指数定理の適用 |
| DIFF4D4 | Sobolev完備化・ゲージ群・slice・既約／可約接続 |
| DIFF4D5 | ASD方程式・Yang–Millsエネルギーと位相数（GBG27–28再利用） |
| DIFF4D6 | ASD変形複体・楕円性・仮想次元と指数 |
| DIFF4D7 | Uhlenbeck局所ゲージ・エネルギー集中・bubbling |
| DIFF4D8 | ASDモジュライのコンパクト化・摂動・向き・gluing境界 |
| DIFF4D9 | Donaldsonの対角化定理：正確な仮定と証明機構 |
| DIFF4D10 | Donaldson多項式不変量・μ写像・同相と微分同相の区別 |
| DIFF4D11 | Seiberg–Witten方程式・二次写像・ゲージ共変性 |
| DIFF4D12 | SW Weitzenböck評価・スピノル上界・曲率評価 |
| DIFF4D13 | SW変形複体・指数・expected dimension |
| DIFF4D14 | SWモジュライのコンパクト性・摂動・正則性 |
| DIFF4D15 | SW不変量・向き・cobordism不変性・b2+とwall crossing |
| DIFF4D16 | 正スカラー曲率とSW消滅・連結和消滅の条件 |
| DIFF4D17 | adjunction inequality・埋込み曲面の種数下界 |
| DIFF4D18 | Kähler曲面・K3・blow-upと基本類の例（HOD1等を再利用） |
| DIFF4D19 | 同相だが非微分同相の4多様体・exotic R^4の構成の位置付け |
| DIFF4D20 | 滑らかな4次元Poincare予想：既知の候補、何が未解決か、証明手段の限界 |

## 5. 依存関係と並行着手

```text
既存TOP/GEO → ATOP（別PLAN） → HTOP1–6 → HTOP7–14
                      └──────→ MORS1–14 → CBO1–12 → SURG1–16
ATOP → M3T（別PLAN） ───────────────→ TOP4D1–20
MORS/CBO/SURGの必要箇所 ───────────────→ TOP4D
GBG/GA/GPDE/LREP + TOP4D基礎 ─────────→ DIFF4D1–20
```

- MORS1はGEO3等の完成済み前提から着手可能（ATOP全体を待たない）。MORSの交叉・Morse複体はATOPの対応章完成後。HTOP1はATOPの相対鎖・基本群等が揃ってから。
- HTOPとMORSは並行可能。CBOの証明はMORS14の次元制約を参照。SURG1–4はCBO全講を待たず、framingとハンドルの必要章から先行できる。SURG12はn=5の証明を既存CBO12から形式的に推論しない。
- TOP4D1–6とDIFF4D1–3は前提が揃った時点で先行できる。TOP4D13–18は高次元手術が4次元で失敗する位置を明記。DIFF4D9/17/19に必要なTOP4D分類、交叉形式は実装済み箇所へリンク。
- M3TのDehn手術とTOP4DのKirby calculus、PCPのRicci手術とSURGの位相的手術を区別する。
- いずれも未完成の章から定理を引用しない。別PLANが未マージの場合は着手時に依存を再確定。

## 6. 証明契約・完成判定

| 系列 | 本文・canonical dependencyで閉じる核心 | 外部定理として許容する明確な停止線 |
|---|---|---|
| HTOP | 相対群、完全列、Whitehead/Hurewiczから球面判定、Hopfの計算、スペクトル系列の例 | Freudenthal、Blakers–Massey、一般Serre spectral sequenceの構成・収束の深い部分、安定ステムの大規模計算 |
| MORS | Morse補題、正則レベル間積、handle attachment/cancellationの局所機構、Morse複体の境界、Whitney trickの高次元模型と4次元の破綻 | 一般Sard、横断性、埋込み・isotopy extension、Morse–Smale正則化・gluingは適用条件と原典を明記。既存GEOにない定理を既証明扱いしない |
| CBO | 単連結smooth h-cobordismをMilnorの順に相対ハンドル、行列、Whitney、相殺から再構成。W>=6、境界>=5。n>=6球面の証明 | 一般s-cobordismの全実現・分類、K理論一般。引用しても単連結証明は省略しない |
| SURG | 手術trace、ホモトピー変更、単連結模型、Pontryagin–Thomの対応、構造集合と障害の適用、exotic sphereとAlexander trickの差 | 一般群環L理論・手術完全列の全証明、PL/O等の全理論、Kervaire–Milnorの全安定計算、n=5の深い原典入力を引用。n=5を未解説のままn>=6の証明に含めない |
| TOP4D | 交叉形式の計算、Kirby movesの局所例、Whitney disk障害、Casson towerの有限段、disk embeddingの正確な仮定、Freedman分類からS^4の論理 | 無限Casson handleの全位相認識・disk embedding theorem・Freedman分類の原論文完全証明は外部入力として明示し、核心構成と依存関係を研究講読する。完全自力証明を達成したとは称さない。good groupを全群と混同しない |
| DIFF4D | ASD/SW方程式、ゲージ変換・変形複体、指数公式の適用、SW Weitzenböckと評価、正スカラー曲率消滅、具体例の判定 | 指数定理、Uhlenbeck compactnessの全証明、ASD gluing、Donaldsonの対角化全証明、SW不変量の全解析的構成・adjunction一般は外部定理を明記。証明の機構を示し4次元滑らかな予想を解決済みにしない |

外部引用する定理は対象・仮定・結論・適用・原典と自力証明との差を明示。全96講を本リポジトリ規約のA4/B3/C1以上・全詳細解答・数理査読・読者粒度査読・安定アンカー・CI・公開目次で完成判定。形式的下限はA384/B288/C96=768題。Kirby図は線種・向き・framing・before/afterを明示し、図だけでハンドル相殺を主張しない。

## 7. 状態管理

設計のみなのでplans/に置く。新規章・manifest・目次・global DAGの先行登録はしない。初回実装で本PLANをplans_progress/へ移動し、対象系列manifestを作り、既存参照を同時に整合させる。全96講と横断証明監査、公開・CIが完了してからplan_done/へ移動。優先着手候補はMORS1（GEOの直接前提を確認）。HTOP1はATOPの必要講の完成後。別PLANの144講やRHP34の内容・件数は変更しない。
