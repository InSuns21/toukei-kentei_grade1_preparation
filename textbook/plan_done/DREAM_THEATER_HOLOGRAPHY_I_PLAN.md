# DREAM THEATER ホログラフィー I（HOLO系列・全33講確定）

分冊: 2026-10-11  
改訂: 2026-11-11（標準的教科書・講義ノートとの範囲照合、講義数と図版計画の確定）  
状態: in progress（全33講の個別章を実装。系列横断の最終照合・PLAN全体の完了判定は継続）

## 0. 中心問いと到達点

**境界の共形場理論から、どの仮定と近似の下で高次元の重力・幾何・局所的情報を記述できるのか。境界領域の量子情報はバルクのどの領域を再構成し、何を再構成しないのか。**

本講義は「AdS/CFT一般の完全な数学的証明」を約束しない。制御されたAdS/CFTの代表例、半古典的なバルク模型、境界の相関関数、重力のサドル・量子補正、有限次元の誤り訂正模型を**区別した上で**、成立条件付きの式を計算する科目である。

修了時には、少なくとも以下を自力で再現する。

1. $AdS_{d+1}$ の双曲面表示・曲率・境界の座標表示を導き、global AdSとPoincaré patchの覆う領域を区別する。
2. バルク自由スカラーの境界漸近、$m^2L^2=\Delta(\Delta-d)$、適用条件付きのBF境界とGKPWの2点関数を導き、bulk/boundary正規化・接触項・繰り込みを区別する。
3. 大$N$・大結合・スペクトルギャップ・重力の有効理論の関係を述べ、古典重力の近似と有限$N$の完全な双対性を混同しない。
4. $AdS_3$の区間RT面について、カットオフ依存を含む測地線長から$S(A)=(c/3)\log(\ell/\epsilon)$を適切な真空・境界条件の下で再現し、homology条件と多重候補の選択を検査する。
5. RT/HRT、重力レプリカ法、FLM、QESの対象と近似次数を区別し、$S_{\mathrm{gen}}=\mathrm{Area}/(4G_N)+S_{\mathrm{bulk}}+\cdots$の領域・反項・極値化条件を説明する。
6. causal wedge・entanglement wedge・HKLL・JLMSの接続を代表模型で確認し、有限次元の消失訂正・作用素代数量子誤り訂正の類比が成り立つ範囲を検証する。
7. ホログラフィーの強い証拠、制御された導出、模型依存の提案、未解決問題を分けて評価する。

**全33講 = 第I部6講 + 第II部10講 + 第III部9講 + 第IV部7講 + 第V部1講。** 旧15候補はテーマ目録であって章割りではない。33講を実装時の正式な設計数とする。学修期間や1回90分の枠による制限は置かず、必要な非自明な論証・演習を圧縮しない。増減が本当に必要になれば、このPLANと関連参照を同一PRで変更する。

## 1. 直接前提とcanonical ownership

| 既習正本 | 本講で再利用すること | HOLOで新たに学ぶこと |
| --- | --- | --- |
| [GR I/II](../plan_done/DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md)、[LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md) | Lorentz幾何、Einstein方程式、因果構造、ブラックホール時空 | AdSの共形境界、バルク/境界辞書と因果領域の双対性 |
| [QFT I〜IV](../plan_done/DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md) | 経路積分、相関関数、Ward恒等式、CFT一次演算子、OPE、2次元CFT・レプリカ法 | 重力側の境界値問題・GKPW、Witten図、重力レプリカ鞍点の意味 |
| [QINF I〜III](../plan_done/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md) | 密度行列、相対エントロピー、強劣加法性、Knill–Laflamme、消失訂正と秘密分散 | RT/QESに現れる部分領域再構成と作用素代数符号の重力的解釈 |
| [BHT I](../plan_done/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_I_PLAN.md) | Hawking温度、一般化エントロピー、AdSブラックホールとHawking–Page転移 | 同じ熱状態・相転移の境界CFT側の解釈。重力熱力学は再証明しない |
| GEO12〜GEO19・既存変分問題 | 測地線、面積変分、曲率、極小曲面の初歩 | RT/HRTのアンカー・homology・共変的極値面の適用条件 |

- 正本の確認は各章執筆時に実在するcanonical stable anchorで行う。上表は**科目の学修案内**であり、`chapter.yaml`・`knowledge.yaml` の直接prerequisiteへ無条件に全科目を列挙する趣旨ではない。依存は章ごとに必要な最小集合を選ぶ。
- 厳密な局所作用素環、Type III因子・モジュラー理論を追う分岐では[AQFT](../plans/DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)を参照。未実装の場合は一般定理を既習扱いせず、有限次元またはUV正則化された例を主に使い、一般の無限次元QFTへの拡張を明記する。
- **HOLOの固有責務**はAdS/CFT辞書、RT/HRT・FLM・QES、entanglement wedge、HKLL、JLMS、重力側の量子誤り訂正。一般の量子情報・CFT・重力熱力学を複製しない。
- [BHI I/IIの横断ルート](../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)へはQESと辞書の意味を渡す。island、replica wormhole、蒸発のPage曲線の再現と因数分解問題は**BHI II**に置き、HOLOでは一般的に解決済みと主張しない。
- Lorentz計量は[$(-,+,+,+)$規約](../dream-theater-lorentz-conventions.md)。一般の$AdS_{d+1}$では時間方向1・空間方向$d$、曲率の符号はGR/GEOの規約に従う。計算ごとに$L,G_N,\hbar$、作用の境界項、Euclid/Lorentz、有限カットオフ、$1/N$次数を宣言する。

## 2. 教科書・講義ノートとの照合と範囲決定

本PLANの章の切り方は、次の**著者・出版社の資料および原論文**と照合して定めた。文献から講義本文・証明・演習・図を転載しない。

| 文献 | 照合した核 | 本PLANでの反映 |
| --- | --- | --- |
| O. Aharony et al., [*Large N Field Theories, String Theory and Gravity*](https://arxiv.org/abs/hep-th/9905111) (2000) | 大$N$ゲージ理論、D3-brane由来の代表的双対性、場と演算子、相関関数・熱状態 | HOLO5〜16で原型・パラメータ・辞書・熱状態を分離 |
| M. Natsuume, [*AdS/CFT Duality User Guide*](https://link.springer.com/book/10.1007/978-4-431-55441-7) (Springer, 2015) | AdS幾何、熱平衡・ブラックホール、実際の重力側計算 | HOLO1〜3・15〜16で独習可能な計算を設定。非平衡輸送・凝縮系応用は本編必修外 |
| K. Skenderis, [*Lecture Notes on Holographic Renormalization*](https://arxiv.org/abs/hep-th/0209067) (2002) | スカラー場の漸近、反項、正則化された作用、Ward恒等式 | HOLO7〜9・14を独立させ、裸のon-shell作用から無条件に相関関数を読まない |
| M. Rangamani and T. Takayanagi, [*Holographic Entanglement Entropy*](https://link.springer.com/book/10.1007/978-3-319-52573-0) (Springer, 2017) | RT/HRT、相関・エントロピーと幾何、レプリカ法、情報的解釈 | HOLO17〜25を9講に分け、仮定・変分・位相・量子補正を別々に検算 |
| D. Harlow, [*TASI Lectures on the Emergence of the Bulk in AdS/CFT*](https://arxiv.org/abs/1802.01040) (2018) | 半古典的バルクの必要条件、再構成、誤り訂正、量子RT、テンソル網 | HOLO26〜32にコード部分空間・復号・模型の限界を組み込む |
| A. Almheiri, X. Dong, D. Harlow, [*Bulk Locality and Quantum Error Correction in AdS/CFT*](https://arxiv.org/abs/1411.7041) (2015) | 部分領域双対性を誤り訂正として読む条件 | HOLO29〜31で有限次元の消失訂正を物理辞書へ接続 |
| T. Faulkner et al., [*Gravitation from Entanglement in Holographic CFTs*](https://arxiv.org/abs/1312.7856) (2014) | 球領域のエンタングルメント第一法則と線形化Einstein方程式 | HOLO32の条件付き導出を独立の最終発展講にする |

論文上の提案・近似評価は、それ自体を全量子重力模型の無条件な定理と呼ばない。例えば[HRT](https://arxiv.org/abs/0705.0016)、[FLM](https://arxiv.org/abs/1307.2892)、[QES](https://arxiv.org/abs/1408.3203)、[JLMS](https://arxiv.org/abs/1512.06431)はそれぞれ異なる仮定・近似次数を持つ。

## 3. 確定講義表

以下の「必須検算」は、主要な定義・中間計算・仮定確認・詳細解答の核である。重い一般命題は模型での完全導出と一般論の証明責務を分け、導出範囲外を「結果先行」と明示する。

### 第I部：AdS幾何から双対性の入口へ（HOLO1〜HOLO6・6講）

| 講義 | 中心問い・新しい道具 | 必須検算・境界 |
| --- | --- | --- |
| **HOLO1** 反de Sitter時空 | 定曲率Lorentz多様体としての$AdS_{d+1}$とは何か。埋め込み双曲面、等長群 | 埋め込み制約から誘導計量・定曲率と曲率半径$L$を求める。双曲面と普遍被覆の時間周期を区別 |
| **HOLO2** 座標と共形境界 | global・Poincaré・Fefferman–Graham型座標、境界の因果構造 | 座標変換と領域を計算し、Poincaré patchを全AdSと誤認しない。代表的null曲線と境界共形類 |
| **HOLO3** 境界のUV/IRと測地線 | 半径方向とエネルギースケールはどう対応するか。Euclid AdSと測地線近似 | 半円測地線の方程式・cutoff長を再導出。重い演算子の測地線近似と一般の相関関数の厳密等号を区別 |
| **HOLO4** 対称性と境界CFT | $SO(2,d)$と境界共形対称性、一次演算子・次元・OPEの対応 | 既習QFT IVのWard/OPEを具体的2点・3点関数へ適用。CFT一般論の重複証明は避ける |
| **HOLO5** 制御された双対性の原型 | D3-braneの低エネルギー極限と$AdS_5\times S^5$／$\mathcal N=4$ SYMの対応 | 開弦・閉弦の二つの記述と極限を図式化。一般のYang–Millsすべてが重力双対を持つという飛躍を避ける |
| **HOLO6** 大$N$と半古典重力 | 't Hooft結合、$1/N$展開、$L/\ell_s$、$G_N/L^{d-1}$、低次単一トレース演算子とギャップ | $AdS_5\times S^5$で$\lambda$・$N$と曲率・ループ補正の大小を検算。大$N$だけで局所Einstein重力が従うとは言わない |

### 第II部：場と相関関数の辞書（HOLO7〜HOLO16・10講）

| 講義 | 中心問い・新しい道具 | 必須検算・境界 |
| --- | --- | --- |
| **HOLO7** 作用の境界値問題 | バルクの境界条件・源・状態、on-shell作用の変分 | 有限cutoff面のスカラー作用の境界変分とDirichlet条件。sourceとnormalizable modeを混同しない |
| **HOLO8** スカラー漸近とBF境界 | 質量とCFTスケーリング次元、正規化可能性、代替量子化 | $\Delta_\pm=d/2\pm\sqrt{d^2/4+m^2L^2}$を導く。BF境界と代替量子化の許容範囲・境界条件を区別 |
| **HOLO9** GKPWと2点関数 | 生成汎関数、bulk-to-boundary kernel、renormalized on-shell作用 | Euclid自由スカラーの核から境界2点の距離冪を導く。正規化、接触項、cutoff依存、$i\epsilon$継続の区別 |
| **HOLO10** Witten接触図 | 3点相関・bulk-to-boundary核の積分、結合と係数 | $\phi^3$接触図から共形3点の座標依存を検算。積分の収束域と境界正則化を明記 |
| **HOLO11** 交換図と4点関数 | bulk-to-bulk伝播子、4点関数・OPE、単一／多重トレース | スカラー交換図の構成とチャネル分解を追う。自由模型の連結・非連結次数を大$N$で数える |
| **HOLO12** バルクゲージ場と保存流 | 境界値と保存電流、ゲージ変換・Ward恒等式 | Maxwell作用の境界変分と境界currentの次元・縦成分の条件。ゲージ不変な観測量を明示 |
| **HOLO13** バルク重力場と応力テンソル | 境界計量の源、Brown–York型テンソル | 境界計量変分・GHY項の役割を検証。cutoff面の裸テンソルと繰り込み後の1点関数を区別。$AdS_3$のBrown–Henneaux中央電荷の仮定・正規化を橋渡しする |
| **HOLO14** ホログラフィック繰り込み | 反項、Ward恒等式、共形異常 | スカラー模型の発散項・局所反項を次数別に計算し、有限renormalized 1点/2点を検証。scheme依存を明記 |
| **HOLO15** 境界の熱状態とAdSブラックホール | 熱的経路積分の鞍点とCFT自由エネルギー | BHTのHawking–Page計算を引用し、熱AdSとBHの作用差を境界分配関数に接続。ensemble・体積・極限を限定 |
| **HOLO16** BTZ・熱場二重状態 | 2境界・TFD、両側相関とEinstein–Rosen橋 | TFDの片側縮約を計算し、BTZの温度・境界円周との対応を検算。TFDを蒸発情報回収の一般的説明としない |

### 第III部：エンタングルメントから面積と領域へ（HOLO17〜HOLO25・9講）

| 講義 | 中心問い・新しい道具 | 必須検算・境界 |
| --- | --- | --- |
| **HOLO17** 境界領域のエントロピー | 局所QFTの領域、UV cutoffとRényi／von Neumann entropy | QFT IVの区間結果を復習し、密度行列が定義できる正則化模型とType IIIの一般の局所環を区別 |
| **HOLO18** RT公式の最小模型 | 静的AdSで境界区間と極小面積を結ぶ | $AdS_3$区間測地線長$2L\log(\ell/\epsilon)$と$S=(c/3)\log(\ell/\epsilon)$をBrown–Henneaux関係の条件付きで再導出 |
| **HOLO19** homology条件と面積競合 | 複数領域、連結／非連結面、熱的状態の位相 | homologyの定義と二つの候補曲面を比較。境界領域の補集合と地平線の扱いを模型で確認 |
| **HOLO20** RTとエントロピー不等式 | 面の切断・貼合せと強劣加法性 | 共通時間断面でのcut-and-pasteの面積不等式を証明し、適用不能な時空依存や量子補正へ無条件拡張しない |
| **HOLO21** 重力レプリカ法 | レプリカ対称鞍点・円錐欠損・極小面の出現 | 対称Euclid模型で$n\to1$の面積項を導く。解析接続、鞍点・対称性、一般の完全な導出との隔たりを明示 |
| **HOLO22** 共変HRT面 | 時間依存、極値面、maximinによる選択 | 静的RTとの比較と簡単な時間依存断面の変分。null energyなど選択定理の仮定を検査 |
| **HOLO23** FLM量子補正 | バルク場の部分領域エンタングルメントと$O(G_N^0)$補正 | 固定古典RT面のbulk entropyと面積・重力ループ・局所反項を整理。裸の$S_{\mathrm{bulk}}$だけを有限量としない |
| **HOLO24** 量子極値曲面QES | 一般化エントロピーの量子極値化と候補比較 | 面位置の変分$\delta S_{\mathrm{gen}}=0$、極値と候補最小選択の順を模型で検算。一般の蒸発islandはBHI IIへ |
| **HOLO25** causal wedgeとentanglement wedge | 境界の領域依存、因果菱形・RT/HRT面・領域の包含 | 純AdSの球領域で二種類のwedgeを作図し、一般の包含や一致に必要な因果・エネルギー・状態条件を照合 |

### 第IV部：バルク再構成と誤り訂正（HOLO26〜HOLO32・7講）

| 講義 | 中心問い・新しい道具 | 必須検算・境界 |
| --- | --- | --- |
| **HOLO26** HKLL再構成 | 境界演算子から自由バルク場を復元するsmearing kernel | 自由場のglobal mode展開から境界極限とsmearingを導く。有限$N$・相互作用下の厳密な局所演算子と混同しない |
| **HOLO27** 部分領域再構成 | AdS–Rindler領域、境界部分領域・code subspace | どのモードがどの領域から再構成可能かを具体図で検査。HKLLの単純な1点復元からentanglement wedge一般へ論理を飛ばさない |
| **HOLO28** JLMSと相対エントロピー | 境界/バルクのモジュラーHamiltonian、相対エントロピーの等式 | 小摂動・code subspaceで$K_{\mathrm{CFT}}$の面積項とバルク項を比較。作用素の定義域・$1/N$次数を条件付きで書く |
| **HOLO29** 消失訂正としてのバルク | finite-dimensional code subspaceと補集合の情報 | QINFのKnill–Laflamme・消失訂正を具体的3-qutrit等の符号で再検算し、同じ論理演算子の複数境界表現を構成 |
| **HOLO30** 作用素代数量子誤り訂正 | 中心・超選択セクター・面積演算子 | 有限直和の代数コードを構成し、中心項を含む量子RT型エントロピー式と再構成条件を条件付きで示す。一般Type IIIはAQFTへ |
| **HOLO31** テンソル網・HaPPY模型 | 多領域符号と最小cut・離散的な幾何の類比 | 小さなperfect-tensor型網のcutと消失回復を直接計算。離散網の等式を連続Einstein方程式の証明としない |
| **HOLO32** エンタングルメントと重力の線形応答 | 第一法則$\delta S=\delta\langle K\rangle$から何を得るか | 真空球領域の相対エントロピー第一変分と線形化Einstein拘束の対応を追う。非線形・全状態・全時空の方程式を証明したとしない |

### 第V部：統合と境界監査（HOLO33・1講）

| 講義 | 中心問い・新しい道具 | 必須検算・境界 |
| --- | --- | --- |
| **HOLO33** 何が双対で何が未解決か | AdS/CFT辞書、RT/HRT/FLM/QES、HKLL/JLMS/QECを同一模型の異なる近似として整理 | AdS3区間の2点関数/エントロピーと有限コードの回復を条件・次数・定義域付きで総合演習。一般的非超対称CFTの重力双対、実天体の漸近平坦時空、内部再構成、factorization、蒸発の普遍的復号は未解決／別分野と明示 |

## 4. 図版・SVGの具体配置（執筆時の必須検討）

図は各講の中心的な空間・包含・対応の理解のために配置し、意味ある図に限る。「図の見た目」は計算や証明の代わりにしない。**図はこの設計時点では未作成**。

| 講義 | 図・表現 | 読者が図で確認する関係 |
| --- | --- | --- |
| HOLO1〜3 | 埋め込み双曲面の模式図、global/Poincaréの2断面、境界・半円測地線のSVG | 時間被覆、patchの範囲、境界cutoffと深さ |
| HOLO4〜6 | 対称性/演算子対応表、D3-braneの二つの極限図、$N,\lambda$の近似領域図 | 同一の対称性の両側、極限の取り方、古典重力が使える領域 |
| HOLO7〜11 | 境界条件の径方向図、二つの漸近モード、bulk-to-boundary線・接触/交換Witten図 | source/応答、外線/内部線と$1/N$次数 |
| HOLO12〜14 | 境界でのnormal vector・変分図、cutoff面と反項表 | 境界流/応力テンソルの変分、裸量と有限量の相違 |
| HOLO15〜16 | thermal AdS/black holeの二鞍点、2境界BTZ・TFD対応 | 熱アンサンブルと連結幾何、片側縮約 |
| HOLO17〜20 | 区間とRT半円、二候補面・homologyの塗り分け、切断・貼合せ図 | 面積と領域、許される面、強劣加法性の構成 |
| HOLO21〜24 | レプリカ円錐/固定点、静的RTと共変HRT、古典面とQESの位置比較 | $n\to1$、共変極値化、量子補正による面位置の変化 |
| HOLO25〜28 | 境界因果菱形/causal wedge/entanglement wedge、HKLLの支持域、JLMSの領域図 | 部分領域と情報的再構成の違い |
| HOLO29〜31 | 符号空間・消失チャネルの模式図、代数の直和/中心、HaPPYの小さいネットワーク | 物理領域の喪失と論理情報の回復、中心と幾何cut |
| HOLO32〜33 | 球領域と双曲的流れ、条件と模型を結ぶ最終対応表 | エントロピー第一変分が線形応答に留まること、主張の有効範囲 |

**SVGアニメーションを検討する場面:** HOLO2のglobal/Poincaré patchの対応、HOLO19の連結/非連結RT候補の切替、HOLO24の$S_{\mathrm{gen}}$の極値候補移動、HOLO29の消失位置と復号可能領域の変化。いずれも静止状態で意味が読める独立フレームを正本として先に作り、アニメがなくても本文と図で導出が閉じるようにする。`prefers-reduced-motion`、alt・`title`・`desc`、色以外の線種・ラベル、本文幅縮小時の重なり、SVG strict layout lintを[図版品質規約](../DREAM_THEATER_SVG_QUALITY_GUIDE.md)に従って確認する。

## 5. 主要式の検算ゲートと誤解防止

1. **辞書の範囲:** $Z_{\rm CFT}[J]\simeq e^{-S_{\rm bulk,ren}^{\rm on\!\text{-}shell}[\phi_{(0)}=J]}$はEuclid半古典サドルの表現。厳密な経路積分の等号と古典鞍点近似を分離し、Lorentz時空では状態・実時間輪郭・$i\epsilon$を指定する。
2. **スカラーの質量:** $m^2L^2=\Delta(\Delta-d)$は自由スカラーの漸近方程式と適切な境界条件に基づく。BF境界より上でも代替量子化が常に許されるわけではない。
3. **重力の制御:** $N\to\infty$によるループ抑制、強い't Hooft結合による弦補正抑制、低いスピンの単一トレース演算子のスペクトルギャップ等を別の条件として扱う。弱結合の一般CFTには単純な局所古典重力を保証しない。
4. **RT/HRT:** 静的な最小面、時空的な共変極値面、homology、背景と状態、面積のUV発散を区別する。HRTの一般的な最大最小定理の仮定を暗黙に外さない。
5. **量子補正:** FLMの$O(G_N^0)$項、QESの$S_{\rm gen}$の変分、重力境界・edge mode・繰り込み反項の可能性を分ける。領域エントロピーが無条件に有限で因数分解するとの仮定を置かない。
6. **再構成:** HKLLはまず自由／摂動的なコード部分空間で構成する。entanglement wedge再構成とJLMSは近似次数・演算子代数・状態範囲の仮定付き。復号の存在は効率的な復号アルゴリズムの存在を意味しない。
7. **研究上の境界:** AdS/CFTが成功する代表模型と、4次元非超対称Yang–Mills、de Sitter/漸近平坦時空、蒸発ブラックホールの完全な微視的復号を同一視しない。島公式・replica wormholeの研究課題はBHI IIで扱う。

## 6. 演習設計・実装・完了条件

- 各講に「既習から何が分かるか → どこが不足か → 新道具と直接例 → 定理・核心計算 → 適用不能例 → 演習・詳細解答」を設け、**原則Level A4題・B3題・C1題以上**を全問詳細解答付きで出す。学修目標が未検証なら題数下限を超えて増題する。
- 典型演習は、AdS座標変換と曲率、scalar boundary falloff・2点関数、Witten図の次数、BTZ/TFDの縮約、RT面のcutoff長、homology候補比較、量子補正の次数勘定、簡単な消失訂正と中心代数、最後のモデル条件監査を必ず含める。
- 一般のAdS/CFT双対性、LMの重力レプリカ法、量子RTやentanglement wedge再構成の一般論は、特殊なサドルや有限符号での検算だけで完全に証明したと宣言しない。「定理」「原論文での提案」「条件付き導出」「玩具模型での等式」を本文の各使用位置で区別する。
- 章IDは設計上HOLO1〜HOLO33とするが、正式な`chapter.yaml.id`は着手時に衝突確認する。**PLANだけの改訂では**`textbook/dream-theater-series/HOLO.yaml`、chapter/knowledge、knowledge DAG、公開目次、共通routingを先取り作成しない。
- 実装着手時にこのPLANを`textbook/plans_progress/`へ**移動**し、既存の横断PLANや直接参照先を同期する。完了章を各系列manifestで`completed`とするが、全33講の本文・区分C査読、学修目標の横断検証、依存・stable anchor・図版レンダリング・公開導線の照合が済むまで`plan_done/`には移動しない。
- 書式・局所数学修正・新規実装の区分A/B/Cは[`DREAM_THEATER_AUTHORING_STANDARD.md`](../DREAM_THEATER_AUTHORING_STANDARD.md)第10・10.1節に従う。**変更した講義自身**の全証明・全解答の自己査読と別観点再読を新規実装時に行う。**別の完成章の追跡監査は章IDを明示して依頼された場合のみ**実施する。CI greenや図の見た目を数学的正しさの根拠としない。
