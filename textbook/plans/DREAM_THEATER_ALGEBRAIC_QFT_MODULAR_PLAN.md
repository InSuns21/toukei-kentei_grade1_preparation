# DREAM THEATER 代数的量子場理論・モジュラー理論（AQFT系列・講数可変）

作成・分冊: 2026-10-11  
改訂: 2026-10-31（標準教科書・講義ノート・原論文に照合し、証明依存と到達目標を再設計）  
状態: planned（設計の推敲のみ。本文・series manifest・公開は未着手）

## 中心問いと出口

**時空領域ごとに観測可能な量を割り当てるだけで、因果性・真空・熱・情報の何を厳密に言えるのか。** 有限次元量子情報で使う「領域ごとのHilbert空間のテンソル分解」や密度行列は、連続体QFTの鋭い局所領域へそのまま持ち込めるとは限らない。そこで、**局所可観測量の代数netとその状態**を出発点に、次の問いを順に解く。

1. **局所性:** 時空領域の包含・空間的分離・Poincaré変換を、代数間の包含・可換性・自己同型でどう表すか。
2. **自由場からの構成:** Klein–Gordonの因果伝播子からWeyl代数・状態・GNS表現・局所von Neumann環をどう得るか。
3. **真空の驚くべき性質:** 正エネルギーと局所性の下でReeh–Schlieder性がなぜ生じ、局所環の型・テンソル分解に何が起こるか。
4. **モジュラー時間:** 巡回分離ベクトルからTomita作用素・モジュラー流・KMS条件をどう作り、特別なwedgeではLorentz boostとどう結び付くか。
5. **量子情報への出口:** Type III環で密度行列による部分系エントロピーが一般には使えないとき、相対モジュラー作用素・Araki相対エントロピー・split propertyで何を比較できるか。

本PLANは**Minkowski時空の実自由スカラー場を通し模型**とし、その上で一般の局所netの構造定理を仮定付きで学ぶ。全てのnetが自由場に由来する、あるいは一般の相互作用模型が既に厳密構成された、と仮定しない。ブラックホール熱力学・情報問題は応用先であり、重力理論の定理を本PLANで証明したと扱わない。

## 直接必要な前提・証明の所有先

| 既習側の正本 | 本PLANで必要なもの | 実装時の確認事項 |
|---|---|---|
| `QM5–8`、`OA3–5`、`VN1–7`（[QMOA系列manifest](../dream-theater-series/QMOA.yaml)） | 自己共役作用素・Stone定理・C*環・正汎関数とGNS・可換子・正規状態・factor分類の入口 | **GNSはOA5が所有**する。AQFTでは局所netへの適用と非同値表現の現象を扱い、一般定理を重複証明しない |
| `HPDE18–24`（[HPDE系列manifest](../dream-theater-series/HPDE.yaml)） | 先進／遅延Green作用素・因果伝播子・実Klein–Gordon解のシンプレクティック形式 | どの商空間上の形式が非退化かを照合してWeyl関係の符号へ接続する |
| `SREL`・[LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)の必要部分 | Minkowski因果構造・空間的分離・wedge・Lorentz boost | 最初は平坦時空に限定する。大域双曲性一般論は必要箇所にだけ接続する |
| `QFT4–6`、`QINF1–3/17/20`（[QFT](../dream-theater-series/QFT.yaml)・[QINF](../dream-theater-series/QINF.yaml)系列manifest） | 自由場・二点関数・Fock表現、有限次元のテンソル積・密度行列・相対エントロピー | 有限次元計算を比較模型に使うが、QFT・QINF全講を一律必修にしない |
| [MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md) | 曲がった時空でのHadamard状態、二点分布のmicrolocal条件 | **基本のMinkowski AQFTには全講を要求しない**。曲がった時空への拡張・局所共変性の発展課題で必要部分を指定する |

`OA/VN/QM`の一般結果、`HPDE23`のシンプレクティック形式、`QINF20`の有限次元量子相対エントロピーが既習側の正本。章IDがmanifest上で`completed`でも、対応する定理・定義がどのstable anchorにあり、どこまで証明されているかは**執筆着手時に実本文で確認**する。実在しない定理を既習扱いしない。

学修主線は **OA/VN・QM + HPDEの必要部分 → AQFTの局所netと自由場 → Reeh–Schlieder／局所環 → モジュラー理論 → 相対エントロピー**。QINFは有限次元比較、MICAは曲がった時空の発展分岐とし、両者の全科目を前提にしない。

## 対象・規約・canonical ownership

- **AQFTが所有:** Haag–Kastler型局所net、状態・表現と局所von Neumann環、無限自由度の非同値表現、Reeh–Schlieder、局所環の型の条件付き結果、split property、標準対からのTomita–Takesaki理論・KMS・Bisognano–Wichmann、相対モジュラー作用素とAraki相対エントロピー。
- **既存OA/VNが所有:** 一般のC*環・von Neumann環、GNS、作用素位相、極分解、factorと射影比較の基礎。AQFT固有の物理的適用と必要な追加補題だけを新たに証明する。
- **[MQFC I/II](DREAM_THEATER_MATHEMATICAL_QFT_CONSTRUCTION_I_II_PLAN.md)が所有:** Wightman／Schwinger／Osterwalder–Schrader再構成、構成的相互作用模型、Epstein–Glaser型の対角延長・摂動くりこみ。AQFTでは必要なWightman仮定を述べるが、その再構成定理は再執筆しない。
- **MICAが所有:** 波面集合、Hadamard条件、自由場の点分離・局所くりこみ。AQFTのquasifree状態の正値性・CCRと、MICAのmicrolocal Hadamard条件を別の要件として扱う。
- **QINFが所有:** Type Iの有限次元量子相対エントロピーとデータ処理。AQFTはType IIIを含む正規状態への拡張、局所環包含での単調性を所有する。重力双対・island・Page曲線の物理的議論はHOLO/BHIの正本に委ねる。

最初の厳密な舞台は、時間向きと計量符号を固定した**4次元Minkowski時空**、有界なdouble cone、非有界wedgeとその因果補集合、実自由Klein–Gordon場とする。一般の局所netに移る際は、領域族、含める公理、表現・状態、非有界場から有界Weyl作用素への移行を明記する。netのC*代数 $\mathfrak A(O)$ と、選んだ表現での $\mathcal M_\omega(O)=\pi_\omega(\mathfrak A(O))''$ を区別する。

以下を**一律の公理と見なさない**。

- 基本: isotony、Einstein局所性、Poincaré共変性。スペクトル条件、真空の存在・不変性・一意性、弱加法性等は、定理ごとに明記する追加仮定。
- time-slice、additivity、Haag duality、wedge duality、split property、nuclearity、局所factor性、Type III$_1$性は互いに異なる条件・結論。特に局所性からHaag dualityやsplit propertyは自動的に出ない。
- vacuumの巡回性と分離性、全代数の純粋性、局所環がfactorであることは別の主張。領域の非空な空間的補集合など必要条件を落とさない。

## 講義設計：証明依存に沿う候補テーマ

下記の番号は**旧AQFT1–15を含む候補テーマの再配置**であり、正式章IDや講数の確定ではない。証明の核心・直接例・演習解答が1章に収まらなければ分割し、同じ中心問いで完結するものは統合する。旧仮IDを下流へ固定せず、実装開始時にchapter ID・series manifest・参照先を照合する。

### A. 局所netと自由場を実際に作る

1. **局所観測量と時空領域。** double cone、wedge、因果補集合、領域の包含を座標と図から定義する。通常の量子力学の一個の $B(\mathcal H)$ と、領域に沿う代数の族を比較し、各公理の意味がわかる最小の可換／行列代数netを作る。
2. **Haag–Kastler型の公理と真空。** isotony、空間的分離時の可換性、Poincaré共変性を条件と式で確認する。状態・自己同型・共変表現、平行移動のスペクトル条件、真空を導入する。time-slice、additivity、dualityは追加条件として別に判定する。
3. **Klein–Gordon解のシンプレクティック空間。** `HPDE21–23`の因果伝播子から試験関数の商・実双線形交代形式を作り、因果支持から空間的分離の直交性を示す。縮退・符号・方程式による零元の扱いを明記する。
4. **Weyl代数・CCR・局所C*net。** $W(f)W(g)=e^{-i\sigma(f,g)/2}W(f+g)$、$W(f)^*=W(-f)$の規約を固定し、$f$の支持を使って局所netを構成する。代数的CCR、Weyl形式、非有界smeared fieldの違い、規則的表現の必要性を区別する。
5. **代数上の状態と自由場のquasifree状態。** 正値汎関数、二点形式・反対称部分のCCR、対称共分散の正値条件、Weyl特性汎関数を有限モードで検算する。Hadamard性は追加の特異性条件であって、quasifreeや正値性のみでは従わない。
6. **GNS表現と局所von Neumann環。** `OA5`のGNSを自由場・有限モードで具体化し、$\pi_\omega(\mathfrak A(O))''$を作る。Fock真空表示と一般状態、無限自由度で非同値表現が生じる理由（van Hove模型等）を、有限次元のStone–von Neumannとの違いから考える。

### B. 真空と局所環の構造

7. **正エネルギー・解析性からReeh–Schliederへ。** 真空・平行移動の正エネルギー条件の下で局所作用素が作るベクトルの稠密性を導く論証を段階化する。分布の境界値／解析接続に必要な補題、加法性等の採用条件を先に明示し、定理の適用範囲を確定する。
8. **巡回性・分離性・双対性の区別。** 補集合が非空の領域で、補集合側の巡回性と局所性から分離性を導く。$\mathcal M(O)'$ と $\mathcal M(O')$ の包含、Haag dualityの等号、局所環のfactor性をそれぞれ区別し、反例または仮定不足を示す。
9. **Type I／II／III因子と鋭い境界。** 射影のMurray–von Neumann同値・有限性を`VN7`から再確認し、Type IIIで非零有限射影が存在しないことを定義に戻って説明する。局所状態の密度行列・部分トレース・von Neumannエントロピーを、無条件にType III局所環へ移さない。
10. **局所環のType III性はどこから来るか。** 自由場等の適切なクラスで成立するType III$_1$・hyperfinite性に必要な条件を文献ごとに棚卸しする。正エネルギー・局所性だけから「すべてのQFT局所環はType III」と断定しない。一般定理の証明補題と具体的模型の証明を分離する。
11. **split propertyと近接領域の独立性。** $O_1\Subset O_2$に対するType I中間因子 $\mathcal M(O_1)\subset\mathcal N\subset\mathcal M(O_2)$ の定義から、緩衝領域を置いたテンソル積的な分離を導く。隣接する鋭い境界で $\mathcal H=\mathcal H_A\otimes\mathcal H_B$ が当然成立するとは言わない。nuclearityとsplitの関係は、用いる具体的定理の仮定を明記する。

### C. Tomita–Takesakiと幾何学的モジュラー流

12. **標準対とTomita作用素。** $\Omega$が $\mathcal M$ に対して巡回・分離である条件を確認し、稠密領域 $\mathcal M\Omega$ 上に反線形作用素 $S_0(A\Omega)=A^*\Omega$ を定める。well-defined性、可閉性、閉包の定義域、$\mathcal M'$ 側の対応を証明する。
13. **極分解と有限次元の完全計算。** $S=J\Delta^{1/2}$、反ユニタリ $J$、正自己共役 $\Delta$ を定義する。$B(\mathbb C^n)$のHilbert–Schmidt標準表現で、忠実な $\rho$ に対し $\Omega=\rho^{1/2}$、$\Delta=L_\rho R_{\rho^{-1}}$、$J(X)=X^*$ を出発点から計算する。通常の $B(\mathbb C^n)$ の自然表現に任意の巡回分離ベクトルがあるわけではない点を説明する。
14. **Tomita–Takesaki定理の証明鎖。** $J\mathcal M J=\mathcal M'$ と $\sigma_t^\Omega(A)=\Delta^{it}A\Delta^{-it}\in\mathcal M$ を対象・作用素の定義域・連続性込みで確定する。反線形作用素の補題、可閉性、極分解、可換子との関係、モジュラー不変性の順に核心論証を閉じる。一般定理を有限次元の検算だけで証明済みとしない。
15. **KMS条件とモジュラー時間。** 解析帯上の境界値を用いるKMS条件を有限行列のGibbs状態で計算し、モジュラー自己同型群に関するKMS性へつなぐ。時間発展の符号・逆温度の正規化を固定し、$-\log\rho$という有限次元のモジュラーHamiltonianとType IIIの無限次元作用素を区別する。
16. **Bisognano–WichmannとRindler wedge。** 右wedge、boostの軌道、真空表現とWightman場など、採用する定理の仮定を明記して、モジュラー群が適切な向き・$2\pi$係数のLorentz boostに対応する特別な事実を扱う。自由スカラー場で二点関数・解析性／KMSの核心計算を示す。任意の領域・任意の状態のモジュラー流が幾何学的とは主張しない。

### D. 相対モジュラー理論と情報

17. **相対Tomita作用素とAraki相対エントロピー。** 二つの正規状態（まず忠実な状態）に対する相対作用素 $S_{\psi\mid\phi}$ と $\Delta_{\psi\mid\phi}$ の向き・支持条件・定義域を固定する。有限次元の標準表現で $\Delta_{\sigma\mid\rho}=L_\sigma R_{\rho^{-1}}$ を計算し、$S(\rho\Vert\sigma)=\operatorname{Tr}\rho(\log\rho-\log\sigma)$ へ帰着する。非忠実状態・無限値は別に扱う。
18. **部分環への制限と相対エントロピーの単調性。** $\mathcal N\subset\mathcal M$ に状態を制限したときの相対エントロピーの比較を、有限次元QINF20のデータ処理と照合する。一般のAraki単調性に要る補題を明示し、有限次元の証明だけでType III一般を結論しない。モジュラーHamiltonian・相対エントロピー・split propertyを用い、鋭い領域の「絶対的なエントロピー」を不用意に定義しない。
19. **総合演習と発展分岐。** 自由場net→真空→局所環→モジュラー流→相対エントロピーを同一規約でつなぐ。DHR超選択セクター・局所共変AQFT・曲がった時空上の状態・測定理論は標準文献への発展導線として位置づけ、DHR再構成や一般の相互作用模型の存在を本科目の既証明結果とはしない。独立した主要定理として扱うなら追加講・追加PLANで証明責務を確定する。

## 必須の定義・計算・証明ゲート

| 主眼 | 執筆・査読で実際に確認すること |
|---|---|
| 局所netとCCR | 2つの領域の包含・空間的分離を座標から判定し、Weyl積の位相因子、$\sigma(f,g)=0$からの可換性、GNS下での局所包含を計算する。場の非有界性とWeyl作用素の有界性を混同しない |
| 状態と表現 | 二点形式の正値性・CCR反対称部分・規則性を有限モードで確かめる。有限自由度と無限自由度で表現の一意性の射程が変わる理由を示す |
| Reeh–Schlieder | 正エネルギーから解析性へ至る主要補題と局所稠密性の論理を再導出し、分離性は局所性と補集合側の巡回性を**別の段階**で使う。一般定理に必要な補題が未証明なら、章を分割して解消する |
| Type III・split | Type I・IIIの射影比較を例で確かめ、Type III$_1$性の**十分な仮定**と一般netの公理を分ける。splitのType I中間因子を導入してから「緩衝領域つきの独立性」を説明する |
| Tomita–Takesaki | $B(\mathbb C^2)$のHilbert–Schmidt表現で $S,J,\Delta,\sigma_t$ を行列単位から再計算し、一般の $S_0$ の定義域・閉包・反線形極分解と $J\mathcal M J=\mathcal M'$・モジュラー不変性の証明を分離せず閉じる |
| KMS・wedge | 採用した時間・計量・boostの符号に沿ってKMS帯条件と $2\pi$係数を直接検算する。Bisognano–Wichmannの定理を使う場合は模型・共変性・真空・領域などの仮定と証明済み範囲を記す |
| 相対エントロピー | $2\times2$の忠実な密度行列（必要なら非可換な組）で相対モジュラー作用素と $\operatorname{Tr}\rho(\log\rho-\log\sigma)$ を一致させ、支持が含まれない場合の無限値を判定する。一般の単調性は追加補題まで閉じる |

**証明の扱い:** Reeh–Schlieder、一般Tomita–Takesaki、Bisognano–Wichmann、局所環のType III$_1$性、split property、Araki単調性は**それぞれ別の定理**であり、前提・一般性・証明コストが異なる。有限次元模型の検算、自由場での特別な証明、一般定理の完全証明を明示的に分ける。学修目標の主要定理を一般形で教えるなら核心証明に必要な補題の所有講を確定し、重い証明を「標準的」の一語で省略しない。完全証明を提供できない一般形は、証明済み到達目標に含めず、仮定・文献・未解決の証明負債を明記した発展紹介へ下げる。

## 演習設計：概念の差を自力で使う

| 到達目標 | 必須の演習課題の型 |
|---|---|
| netの公理を読む | double cone・wedgeの包含と空間的分離、isotonyと局所性を満たす／破る小模型、dualityを追加公理とする理由 |
| 自由場を構成する | $HPDE23$の交代形式→Weyl関係の交換位相→局所可換性、有限モードのquasifree状態・GNS計算 |
| 真空の非古典性を説明する | cyclicとseparatingの違い、補集合から分離性を導く証明、Type IとType IIIで不可能になる操作 |
| モジュラー対象を計算する | Hilbert–Schmidt空間の行列単位から $S,J,\Delta$、$\rho^{it}A\rho^{-it}$、忠実でない場合の失敗 |
| 熱と幾何をつなぐ | Gibbs状態のKMS境界条件、wedge boostのパラメータと温度の正規化、一般領域への誤った拡張の反例判定 |
| 相対情報を扱う | 非可換な $2\times2$ 密度行列の相対エントロピー、部分環への制限、splitの緩衝領域の役割 |

各実装章には現行規約に従い、理由付き例外がなければ **Level A 4 / B 3 / C 1以上**と全詳細解答を置く。A4/B3/C1は下限であり、核心の仮定・計算・反例・複数概念の接続が不足すれば必要なだけ追加する。無限次元の一般定理を有限次元の数値例だけで「証明した」問題・解答にしない。

## 校正に使う標準教科書・講義ノート・原論文

以下は**テーマの選択、定理の適用条件、証明の所在の照合先**。実際の執筆時は参照する版の章・節・定理番号まで確認し、本文・演習を転載しない。

1. Rudolf Haag, [*Local Quantum Physics: Fields, Particles, Algebras*](https://link.springer.com/book/10.1007/978-3-642-97306-2)。局所net・局所性・熱状態・モジュラー自己同型・superselectionの古典的な主線。**A–Cの基本設計**。
2. Christopher J. Fewster and Kasia Rejzner, [*Algebraic Quantum Field Theory -- an introduction*](https://arxiv.org/abs/1904.04051) (2019)。GNS・非同値表現・単純なnet模型・スペクトル条件・Reeh–Schlieder・split・局所環の型・超選択セクターを演習付きで扱う。**A–Bと初学者への説明粒度**。
3. Masamichi Takesaki, [*Theory of Operator Algebras II*](https://link.springer.com/book/10.1007/978-3-662-10451-4)。モジュラー自己同型・非可換作用素環の一般論。**Cの定義域・証明の厳密性**。
4. Stephen J. Summers, [*Tomita–Takesaki Modular Theory*](https://arxiv.org/abs/math-ph/0511034) (2005)。モジュラー作用素と物理応用の短い整理。**Cの導入順、一般定理と応用の境界**。
5. Ola Bratteli and Derek W. Robinson, [*Operator Algebras and Quantum Statistical Mechanics II*](https://link.springer.com/book/10.1007/978-3-662-03444-6)。KMS条件と平衡状態の数学的扱い。**KMSの解析的定義と符号・正規化の照合先**。
6. Jakob Yngvason, [*The Role of Type III Factors in Quantum Field Theory*](https://arxiv.org/abs/math-ph/0411058) (2005)。局所Type IIIの物理的意味と成立範囲。**Bの過剰一般化防止**。
7. Edward Witten, [*Notes on Some Entanglement Properties of Quantum Field Theory*](https://arxiv.org/abs/1803.04993) (2018)。局所環・量子もつれ・モジュラー理論の理解。**splitと情報の比較模型**。
8. Huzihiro Araki, [*Relative Entropy of States of von Neumann Algebras*](https://ems.press/journals/prims/articles/2800), *Publ. RIMS* **11** (1976), 809–833、および[第II論文](https://ems.press/journals/prims/articles/2844) (1977)。相対モジュラー作用素・相対エントロピーと非忠実状態の射程。**Dの定義・支持条件の原典**。

一般のwedgeにおける幾何学的モジュラー作用、DHR再構成、局所環のType III$_1$を各々一般定理として採る場合は、上記の概説だけで完結させず、採用する**模型・仮定に対応する原論文・証明補題**を実装章の参照表へ追加する。

## 執筆・査読・完了条件

1. **設計と実装を混同しない。** この変更はPLANの推敲であり、章本文やseries manifestを新設しない。`plans/`のまま維持する。AQFT固有の実装・検証・監査に着手したら`plans_progress/`へ移し、必要なmanifest・直接参照を同じ作業単位で更新する。
2. 最初に`chapter.yaml`/`knowledge.yaml`の直接prerequisiteと実在stable anchorを確認する。初出専門語はformal statementより前に通常文と直接例で導入し、既習定理の実際の使用箇所から根拠リンクを付ける。
3. 各章で**動機→定義の直接例→仮定付きの定理→証明の核心→演習・全詳細解答**を閉じる。作用素の定義域、位相、支持、二点関数の正値性、factorの型の追加条件、相対エントロピーの向き・支持条件を重点監査する。
4. 新規・実質改稿した**変更章自身**の主要証明と全演習解答を再計算し、完成本文を別観点で再読する。**別の完了章の追跡監査は明示的な章ID指定があった場合だけ**行い、過去の「直前章の一律追跡監査」は適用しない。
5. 最後に同一自由場模型・記号の一貫性、証明依存、MICA/MQFC/QINF/HOLOとの所有境界、文献照合・全詳細解答・公開導線を横断査読する。候補テーマを消化したことやCI greenだけをもって`completed`としない。
