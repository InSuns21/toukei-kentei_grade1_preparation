# DREAM THEATER ブラックホール情報 I・II（BHI1〜BHI36・全36講確定）

改訂: 2026-11-13（標準教科書・総説・原論文との照合による講義設計の確定）  
状態: planned（**設計のみ**。BHI章本文・系列manifest・公開索引は未着手）  
構成: **第I部 BHI1〜BHI16（16講）／第II部 BHI17〜BHI36（20講）**。15週・90分講義への数合わせはしない。

## 0. 中心問いと到達点

> Hawkingの半古典的放射計算で観測される混合性は、閉じた全体系のユニタリ性とどの仮定の下で衝突するのか。重力を含むエントロピーの計算は、なぜ蒸発放射のPage曲線を再現できるのか。そして「エントロピーが求まる」ことから「情報が実際に復号できる」までの間に、どの問題が残るのか。

- **I（矛盾を厳密に立てる）:** 放射領域・残存ブラックホール・参照系と観測者を明示し、Hawking対生成模型の放射エントロピー、ユニタリ蒸発を仮定したPage曲線との相違を計算する。Mathurのsmall-corrections議論、AMPSの仮定の両立不能性、相補性、Hayden–Preskillの条件付き復号を比較する。
- **II（重力模型でPage曲線を計算する）:** 非重力浴と結合した二次元JT重力（まず定常／熱的な計算模型、次に時間依存の蒸発模型）に対象を固定し、CFT区間エントロピー、一般化エントロピーの候補、極値化、鞍点の選択、レプリカ・ワームホールからPage転移を再構成する。情報回復の意味・ensemble平均・factorization・四次元への外挿を区別する。
- **到達判定:** 模型と物理的仮定、Hilbert空間の分割または代数、状態、精細／粗視化エントロピー、正則化、極限・鞍点近似、復号可能性を一枚の計算表で追跡できる。「Page曲線の成功」≠「一般の四次元蒸発の完全な微視的解決」。

## 1. 直接前提・canonical ownership・着手ゲート

| 既習系列 | 再利用する結果と実装停止線 | BHIで初めて扱うこと |
|---|---|---|
| [QINF I〜III](../plan_done/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md)（特にQINF17〜20, 28〜33）・[INFO](../plan_done/DREAM_THEATER_INFORMATION_THEORY_I_PLAN.md) | 部分トレース・精製・von Neumannエントロピー・SSA・量子相対エントロピー・有限次元Page模型・消失訂正／デカップリング。**一般定理を再証明しない** | 蒸発時空の領域、放射と内部の仮定、情報流出の不等式、ブラックホールへの復号条件の翻訳 |
| [QCURV I](../plan_done/DREAM_THEATER_QFT_CURVED_SPACETIME_I_PLAN.md)（特にQCURV9〜18, 21） | 崩壊時空のBogoliubov計算・Hawking温度・灰色体因子・状態選択・半古典的エネルギー流。**Hawking温度の導出を重複しない** | 内外の相関と放射の**精細エントロピー**、逐次放出模型が意味する情報の矛盾 |
| [BHT I](../plan_done/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_I_PLAN.md)（特にBHT8〜9, 21〜24）・[GR I/II](../plan_done/DREAM_THEATER_GENERAL_RELATIVITY_I_II_PLAN.md) | Bekenstein–Hawking面積則・一般化エントロピー・地平線・古典／熱力学的収支。**第一法則・GSLを再証明しない** | Page時刻に関わるエントロピー収支と、放射領域に対する重力の極値化 |
| [QFT IV](../plan_done/DREAM_THEATER_QUANTUM_FIELD_THEORY_I_IV_PLAN.md) | 二次元CFTの区間エントロピー、レプリカトリック・OPEの基本 | 熱的・時間依存の放射浴で区間端点とcutoffを固定した実計算 |
| [HOLO I](../plans_progress/DREAM_THEATER_HOLOGRAPHY_I_PLAN.md)（特にHOLO21〜30） | **HOLOが正本:** 重力レプリカ法の一般論、RT/HRT・FLM・QES、entanglement wedge、JLMSと作用素代数量子誤り訂正 | **BHI IIが正本:** 非重力浴、islandの出現、放射Page曲線を生む鞍点、レプリカ・ワームホールと蒸発の情報問題 |

- IはQINF・QCURV・BHTの指定箇所が実在・到達可能であることを着手時に確認し、HOLO未完了でも開始できる構成とする。相対論的因果構造はGR/LORGの実在する前提へ接続する。
- IIはIを直接前提とする。**HOLO21（重力レプリカ）、HOLO23〜24（FLM/QES）、HOLO25・27〜30（ウェッジ／再構成／符号）**は、それを使う講義の前に実装済みとするか、当該BHI講内で定義・直接例・必要な核心論証まで独立に閉じる。未実装の結果を既習と称さない。HOLOの系列進捗は系列manifestが正本。
- MICA（Hadamard）／AQFT（Type III・局所代数）を発展的に参照するが、全講の事前修了を一律必須とはしない。重力Hilbert空間の素朴な因数分解の限界はBHI15で扱い、厳密な一般論は到達可能なAQFTの実在章へリンクする。
- 本PLANは独立した **BHI系列** の設計であり、横断読順は[熱・時空・情報ルート](DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)、LORG/HPDE/MICA/AQFTの正本は[時空・量子場数学ルート](DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md)で確認する。旧PLANにあった未定義の「BHII」「BHIII」は前提IDに使わない。

## 2. 標準テキスト・原論文との照合による講数決定

| 文献 | 対応領域 | 今回の設計判断 |
|---|---|---|
| D. Harlow, [*Jerusalem Lectures on Black Holes and Quantum Information*](https://doi.org/10.1103/RevModPhys.88.015002) (Rev. Mod. Phys., 2016) | 情報問題の前提、相補性、firewall、AdS/CFT・量子情報の接点 | Iを「Hawking再講義」ではなく、矛盾の論理と提案の比較に集中させる |
| S. D. Mathur, [*The Information Paradox: A Pedagogical Introduction*](https://arxiv.org/abs/0909.1038) (2009/2011) | Hawking対生成・小補正の不十分性 | 逐次放出とentropy増加の不等式を別講にし、定理の**仮定**を可視化 |
| D. N. Page, [*Information in Black Hole Radiation*](https://doi.org/10.1103/PhysRevLett.71.3743) (1993); P. Hayden and J. Preskill, [*Black Holes as Mirrors*](https://arxiv.org/abs/0708.4025) (2007) | ユニタリ性の期待・放射からの回収 | QINF31〜33のランダム純粋状態の基礎証明と、蒸発時空・scramblingの**追加物理仮定**を切り分ける |
| A. Almheiri, D. Marolf, J. Polchinski, J. Sully, [*Black Holes: Complementarity or Firewalls?*](https://arxiv.org/abs/1207.3123) (2012/2013) | AMPSの両立不能な仮定 | 量子情報の単なるmonogamy紹介でなく、早期／後期放射と内部モードを明示した不等式を検算 |
| A. Almheiri, T. Hartman, J. Maldacena, E. Shaghoulian, A. Tajdini, [*The Entropy of Hawking Radiation*](https://doi.org/10.1103/RevModPhys.93.035002) (Rev. Mod. Phys., 2021) | island、放射エントロピーの重力計算、反復構成 | IIの計算経路を「浴→CFT→JT→island候補→極値→Page転移→レプリカ」に組み替える |
| J. Maldacena, D. Stanford, Z. Yang, [*Conformal Symmetry and Its Breaking in Two Dimensional Nearly Anti-de-Sitter Space*](https://doi.org/10.1093/ptep/ptw124) (2016); N. Engelhardt and A. Wall, [*Quantum Extremal Surfaces*](https://arxiv.org/abs/1408.3203) (2014/2015) | JT作用・Schwarzian、QES | JTを単なる公式のブラックボックスにせず、解・境界条件とQESに必要な変分を明示する。QESの一般論はHOLOが正本 |
| G. Penington, [*Entanglement Wedge Reconstruction and the Information Paradox*](https://arxiv.org/abs/1905.08255) (2019/2020); A. Almheiri et al., [*Replica Wormholes and the Entropy of Hawking Radiation*](https://doi.org/10.1007/JHEP05(2020)013) (2020) | Page時刻のQES転移・重力レプリカの新しい鞍点 | IIで**エントロピー曲線を実際に計算する**責務と、復号問題を別に置く |
| G. Penington, S. H. Shenker, D. Stanford, Z. Yang, [*Replica Wormholes and the Black Hole Interior*](https://doi.org/10.1007/JHEP03(2022)205) (2022) | レプリカ鞍点・Petz写像・ensemble/factorization | 「レプリカでエントロピーが求まる」「回復写像が存在」「効率よく復号」の3段階を分離 |

**全36講に確定する理由:** 旧Iの15テーマにはQINFで既習の「部分トレース」「純粋→混合」「典型状態」が独立講として重複し、他方Mathur／AMPSの不等式・Hayden–Preskillのscrambling／デカップリングが薄かった。旧IIの15テーマはJT作用から浴との接合・CFTの正則化・island極値・レプリカ鞍点・解析接続・ensemble解釈までを1講1語で並べ、主要計算が飛ぶ。**Iを16講、IIを20講**とし、一般理論は既習に戻し、模型固有の非自明な計算に講義枠を割り振る。36は出席週数ではなく、以下の中心問い・検算ゲートに基づく**確定予定章数**である。

## 3. 全36講の確定シラバス

### 第I部：情報損失問題を数式で定式化する（BHI1〜BHI16、16講）

| 章 | 中心問い・新たに扱う内容 | 本文で閉じる主要計算・論証 |
|---|---|---|
| **BHI1** 情報損失の論理と観測可能量 | 崩壊前純粋状態と蒸発後放射をどう比較するか。散乱行列・時間発展・remnant／非蒸発の分岐 | 入力・出力Hilbert空間、純粋性、unitarity、観測可能な放射代数を区別した論理表。終期の仮定を省いて矛盾を断言しない |
| **BHI2** 地平線内外の分割とHawking対の玩具模型 | 半古典的な内外の2モードを何で表すか | 2-qubit対の縮約密度行列・エントロピーをQINFの既出結果から再計算し、実際のQFTの無限次元・cutoffとの差を明示 |
| **BHI3** 逐次対生成と放射の混合化 | 一回の熱的放出だけで情報損失は言えるか | 複数放出ステップの状態・部分トレース・$S(R_k)$を明示。新たな対の独立性を仮定した線形増大とその停止線 |
| **BHI4** 放射のエネルギー収支と準静的蒸発 | 情報問題が起こる時間領域はどこか | QCURVの流束・BHTの$T_H,S_{\rm BH}$から$M(t)$の準静的方程式と漸近評価。灰色体・種数・終期の近似依存性 |
| **BHI5** 粗視化と精細エントロピー | 「放射は熱的」と「放射全体が混合」は同じか | 単一モードが熱的でも全放射が純粋な有限模型の反例、相関・相互情報量、粗視化熱エントロピーと$S(R)$の違い |
| **BHI6** ユニタリ蒸発のエントロピー制約 | 全系が純粋なら残存ブラックホールと放射に何が必要か | $S(R)=S(B)$、次元上界とlate-time純粋性を式で確認。QINF33の玩具放射曲線をブラックホールの予言と取り違えない |
| **BHI7** Page曲線の物理的意味 | Pageの典型性を実際の時間発展へどう翻訳するか | QINF31〜32を引用し、時間依存の有効次元・ランダム性・典型性・重力状態の仮定を表にした期待曲線。有限次元平均＝物理時間平均としない |
| **BHI8** Page時刻の模型依存推定 | 曲線が折り返す時刻はどう見積もるか | $S_{\rm rad}^{\rm coarse}(t)$と$S_{\rm BH}(t)$の交点を準静的模型で求める。一般に「寿命の半分」と同一視しない |
| **BHI9** Mathurのsmall-corrections制約 | Hawking対を少し修正するだけでエントロピーを減らせるか | 放出前後の領域を固定し、SSA／条件付きエントロピーから増分下界を導く。誤差のノルム・独立性・smallnessの定義を付す |
| **BHI10** AMPSのエンタングルメント矛盾 | 後期モードは早期放射と内部の両方に強くもつれられるか | $R$（早期放射）、$b$（後期外部）、$\tilde b$（内部）についてpure-likeな近地平線対とunitarityのエントロピー条件をSSAで比較 |
| **BHI11** 相補性・no-cloning・観測者 | 矛盾する複製を単独の観測者が検証できるか | 因果図と情報回収／落下の時間条件を揃え、no-cloning定理（QINF）と運用上の不可検証性を**別の主張**として監査 |
| **BHI12** Hayden–Preskillの情報投入模型 | すでに古いブラックホールに入れた情報はどこへ移るか | diary・参照系・初期エンタングルメント・内部scrambler・放射系の次元と写像を定義し、回復の前提を列挙 |
| **BHI13** デカップリングと回収閾値 | なぜ追加の少数の放射量で復号可能になり得るか | 有限次元のランダムunitaryとswap／二次モーメントから参照系のデカップリングを評価。QINFの一般定理を適用する際の次元条件を確認 |
| **BHI14** scrambling時間と情報放出時間 | 速いscramblingは実際の高速復号を保証するか | $t_{\rm scr}\sim\beta\log S_{\rm BH}$の前提・係数・time convention、回収時間／復号計算量の区別を模型で検算。OTOC等の一般理論は必要な部分だけ参照 |
| **BHI15** 因数分解・ゲージ制約・局所代数 | 内部と外部に独立のHilbert空間を当然に置けるか | edge／Gauss制約の簡単な有限模型で非自明な分割を直接検査。Type IIIや重力ドレッシングはAQFT等の範囲へ接続し、素朴な部分トレースの適用限界を確定 |
| **BHI16** 前半総合：矛盾を構成する仮定と選択肢 | どの仮定を変更すると何が解消し、何が残るか | Hawking・Page・Mathur・AMPS・Hayden–Preskillの同一状態分割／時間／近似を対照。相補性、fuzzball、remnant、非局所性などを**提案**として評価し、解決済みと断定しない |

### 第II部：island・レプリカ・復号の射程（BHI17〜BHI36、20講）

| 章 | 中心問い・新たに扱う内容 | 本文で閉じる主要計算・論証 |
|---|---|---|
| **BHI17** 重力領域と非重力浴の設定 | 放射の精細エントロピーを誰のどの領域で測るか | 重力領域・浴・結合面・放射部分領域$R$・状態・境界条件・cutoffを図と式で固定。永遠／定常模型と実蒸発を区別 |
| **BHI18** 二次元CFT放射領域のエントロピー | 場の相関を$S_{\rm matter}(R)$にどう直すか | 既習QFT IVの区間エントロピーを適用し、共形写像・端点・温度・紫外cutoff変換を具体的に追う |
| **BHI19** JT重力の作用と場の方程式 | 面積に代わる「面積項」を二次元でどう定義するか | bulk・境界・位相項を含むJT作用、dilaton変分による$R=-2/\ell^2$と計量変分の主要中間式。Newton定数等の規約固定 |
| **BHI20** JTブラックホール解・dilaton・エントロピー | island端点に与える幾何学的寄与は何か | 代表座標での地平線とdilaton解・境界条件、$S_0+\Phi/(4G_2)$型の重力エントロピーを計算 |
| **BHI21** 境界モードとSchwarzian力学 | JTが浴と熱を交換すると境界時間はどう動くか | 正則化境界・再パラメータ化・外部曲率の展開からSchwarzian作用の構造、エネルギーと温度の関係を導く |
| **BHI22** JTと非重力浴の接合 | どの接合・透過条件で放射が浴に流れるか | 重力側と浴側の時刻・計量・場のmatching、反射／透過境界条件を明示し、放射fluxと熱収支をモデル内で検算 |
| **BHI23** islandなしの放射エントロピー | Hawking型の増え続ける枝はどこから出るか | 浴の区間端点を固定してCFT相関関数から$S_{\mathrm{no\text{-}island}}(R,t)$を導き、初期／後期近似と発散の差引きを確認 |
| **BHI24** island候補と一般化エントロピー | 放射から切り離れた重力領域を入れると何を数えるか | $I$の端点、$R\cup I$のmatter entropy、重力端点項を同一のcutoff規約で組み立てる。QES一般論はHOLOを参照 |
| **BHI25** island端点の極値化 | 候補islandの位置はどの方程式で決まるか | $\partial_{x_I}S_{\rm gen}=\partial_{t_I}S_{\rm gen}=0$（座標・条件付き）を実際に解き、近地平線位置・存在域・安定枝の適用条件を確認 |
| **BHI26** Page転移と複数鞍点の比較 | なぜ放射エントロピーは途中で折り返すか | islandなし／ありの**各極値を先に計算してから**支配候補を比較し、交点・勾配・近似誤差とPage曲線を描く |
| **BHI27** 時間依存の蒸発JT模型 | 定常浴模型の転移を真の蒸発へ移せるか | 時間依存境界軌道、放射flux・dilatonの準静的収支と$S(R,t)$を接続し、定常模型と異なる初期条件・終期条件を区別 |
| **BHI28** 重力レプリカの分配関数 | $\mathrm{Tr}\rho_R^n$では何をどこで貼り合わせるか | HOLO21の一般論を使い、放射浴の複製、重力境界の固定、複数重力幾何の和を模型固有の境界条件付きで構成 |
| **BHI29** レプリカ・ワームホールの鞍点 | 非連結だけを数えるのと何が違うか | 複製間をつなぐ鞍点の位相・作用差・$n$依存を追い、no-islandとislandの候補対応を図と主要式で確認 |
| **BHI30** $n\to1$とisland公式の導出範囲 | レプリカ鞍点の寄与はどこまで「導出」できたか | $-\left.\partial_n[\log Z_n-n\log Z_1]\right|_{n=1}$の演算、解析接続と鞍点交換・レプリカ対称性の**仮定**を明示。$S(R)=\min\operatorname{ext}_I S_{\rm gen}(R\cup I)$の模型依存の意味を確定 |
| **BHI31** ensemble平均とfactorization問題 | 複数境界を結ぶ幾何は単一量子系を表すか | $\langle Z_1Z_2\rangle$と$\langle Z_1\rangle\langle Z_2\rangle$、connected寄与の差を簡単なensembleで計算。JT重力の結果を固定理論の因数分解へ無条件に移さない |
| **BHI32** 放射のentanglement wedge | islandがあるとは内部演算子がどう表現できることか | QES転移前後のウェッジをHOLOの定義により構成。bulk領域と境界／浴への符号化を、幾何学的領域とHilbert部分系を区別して説明 |
| **BHI33** 回復写像と情報への操作的アクセス | Page曲線が下がれば実際に情報を読めるか | 消失訂正・相補チャネル・Petz型回復を有限コード模型で構成し、復号誤差・状態依存・情報理論上の回復可能性と計算量を分ける |
| **BHI34** 代替二次元模型との比較 | JTで得た島は別の蒸発幾何でも現れるか | RST等の既存研究から、**明示した近似と境界条件の下で**island端点・Page形状を比較。全二次元重力模型への一般化としない |
| **BHI35** 四次元・実在ブラックホールへの外挿 | 二次元の成功が現実の蒸発をどこまで保証するか | 灰色体・高次元角モード・重力揺らぎ・非摂動補正・蒸発終期・観測可能な復号を条件表で監査。四次元一般論は証明できた範囲に限定 |
| **BHI36** 全系列総合と未解決問題 | 何が計算され、何が未だ証明されていないか | 同一の対象$R$についてHawking枝、Page予想、island枝、replica saddle、復号の条件を順に再現し、ensemble/factorization・内部再構成・計算複雑性・蒸発終期の研究課題を評価 |

## 4. 学習ゲート：主要式・反例・モデル境界

1. **放射の精細エントロピーと熱的エントロピー:** $S(\rho_R)=-\operatorname{Tr}(\rho_R\log\rho_R)$ は量子状態と領域を指定して初めて定義できる。$\rho_R$の単一モード熱性は$S(R)$の単調増加も全系の混合性も意味しない。対の玩具模型では因数分解を仮定していることを明記する。
2. **Pageの議論:** $S(R)=S(B)$は閉じた**純粋な**$RB$全系に対する命題。典型的なランダム状態から得るPage型平均曲線と、実際の時間発展の結果を区別する。Page時刻はエントロピー収支の模型・灰色体・種数に依存する。
3. **Mathur／AMPS:** small corrections定理の対象は「新規放出対の相関が基準対に近い」等の限定された模型であり、量子重力のあらゆる微修正を排除した一般不可能性定理ではない。AMPSの不整合は選んだ$R,b,\tilde b$、地平線の正則性、late-time unitarity、局所性／因数分解の仮定を並べて初めて評価する。
4. **scramblingと復号:** Hayden–Preskillでは初期放射とのエンタングルメント、scramblerのランダム性、放射に対するアクセスを固定する。「デカップリングが成立」⇒「効率的な実装アルゴリズムを既知」とはしない。
5. **重力エントロピー:** エントロピーの対数は原則として自然対数（nat）を用い、QINFのbit表記とは$S_{\rm nat}=(\ln 2)S_{\rm bit}$で換算する。単位系を$G=\hbar=c=k_B=1$とする場合も、JTの面積相当項（$S_0+\Phi/(4G_2)$等）の規約、matter entropyのUV cutoffと反項、量子補正の次数をモデルごとに固定する。
6. **island公式の順序:** $S_{\mathrm{gen}}(I;R)=\mathrm{grav}(\partial I)+S_{\mathrm{matter}}(R\cup I)$ を定義し、候補の極値化（`ext`）の後に寄与する候補を比較（`min`）。任意の領域で形式的な数値最小を取る操作ではない。$I=\varnothing$候補の扱いを省略しない。
7. **レプリカ計算:** $\mathrm{Tr}\rho_R^n$ の整数$n$での幾何、連結鞍点の寄与、$n\to1$解析接続、鞍点選択の交換は別々の仮定・検証対象。**レプリカ・ワームホールが見えた＝単一固定量子重力理論の因数分解が解決**としない。
8. **復号と実在世界:** $S(R)$のPage形状、情報理論的な再構成、観測者が実行できる復号、四次元完全蒸発のユニタリ性の証明は異なる達成水準。各講の命題を「有限模型の厳密結果」「半古典近似の導出」「ホログラフィーの条件付き命題」「提案・未解決」に分類する。

## 5. 演習・図・計算成果物

- 各実装章は理由付き例外がなければ **Level A 4題・B 3題・C 1題以上**を、出発点・前提・中間式・結論まで再現可能な全詳細解答とともに置く。下限は題数ノルマではなく、各learning objective・誤りやすい仮定・複数概念の接続に不足があれば増題する。
- **横断課題I:** (a) Bell対と逐次放出の$S(R_k)$、(b) 温度と灰色体付き準静的質量収支、(c) Mathur/AMPSの不等式を同じ系名で書き直す、(d) Hayden–Preskillの参照系と環境系の次元を検算。QINFの証明と重複する場合は**使用箇所の実在するstable anchor**へリンクする。
- **横断課題II:** (a) 明記した二次元CFT状態の区間エントロピー、(b) JT作用の変分と解、(c) 端点ごとの$S_{\rm gen}$を導出して候補を極値化、(d) 二つの鞍点の競合とPage時刻、(e) 重力レプリカの$n\to1$の仮定、(f) 小規模の符号模型の回復可能性を**別々に**計算する。
- **計算・表示:** 第I部の有限次元状態・エントロピー・次元閾値、第II部の$S_{\mathrm{no\text{-}island}}(t)$／$S_{\mathrm{island}}(t)$と極値端点の移動は、再計算可能なPython等の参照実装・数表を用意する（乱数を使う場合はseed／試行数を記録）。解析式と数値グラフの比較を必須とし、SVGのみの再生を数値計算と称しない。実装基盤は[対話型シミュレーションPLAN](../plans_progress/DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md)の既存仕様を参照するが、講義本文の正当性はUIに依存させない。
- **図:** 崩壊と蒸発のPenrose図、$R/b/\tilde b$の状態分割、JT+bathの接合、island端点、replicaの連結／非連結候補、Page曲線の競合枝に絞る。内部と外部、重力と非重力、演算子の再構成可能領域を色以外の線種・ラベルでも区別し、画像なしで論証が読める本文を置く。SVGを追加するときは[執筆・図版品質規約](../DREAM_THEATER_AUTHORING_STANDARD.md)と実レンダリングを確認する。

## 6. 実装・査読・PLANライフサイクル

1. **今回の作業はシラバス確定だけ。** 現在のPLANは`textbook/plans/`のままにし、BHI1〜BHI36の空章、未実装のstable anchor、knowledge DAG、公開索引、系列manifestを先取り作成しない。BHI系列manifestが見つからないことをもって実装済みとしない。
2. 最初のBHI章を実装する時点で同名IDの存在、関連系列の現行manifestと実在prerequisite、直近のHOLO完成範囲を確認し、**BHI1〜BHI36の予定を系列manifestに登録**する。PLAN固有の実装に入った時点で`plans_progress/`へ**移動**し、manifestの`plan`と直接参照を同じ作業単位で更新する。
3. 章ごとの本文には「既習で何が分かる→この模型で何が不足→新しい定義と直接例→適用条件を明示した主要論証→反例／破綻条件→演習と詳細解答」を置き、初出と使用順を確認する。重力経路積分や解析接続を一般的に厳密化したと宣言できない箇所は**仮定を明示した条件付き導出**として扱う。
4. 新規・実質改稿は[統合執筆規約](../DREAM_THEATER_AUTHORING_STANDARD.md)区分Cとして、**変更章自身**の全主要論証・全演習解答の自己再計算と完成本文の別観点再読を分離する。別の完了章の追跡監査は対象章IDの明示依頼時のみ。PRに根拠・未確認範囲と実施主体を残す。
5. BHI1〜36の全本文、実在する依存・stable anchorリンク、演習・詳細解答、変更スコープに応じたvalidation、公開導線、I・II各部と系列全体の数学的／読者粒度査読を終えて初めて`textbook/plan_done/`へ移動する。**講義数を確定したことは講義完成を意味しない。**
