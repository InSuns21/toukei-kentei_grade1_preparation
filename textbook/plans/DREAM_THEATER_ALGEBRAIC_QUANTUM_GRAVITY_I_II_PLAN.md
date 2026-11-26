# DREAM THEATER 代数的量子重力 I・II（AQG1〜AQG48）

設計: 2026-11-26 JST。状態: **未着手・全48講の設計確定**（I 24講、II 24講）。系列ID: AQG（物理系）。本文・chapter.yaml・knowledge.yaml・系列manifestは実装開始時に作成する。講数は証明責務の再評価により理由付きで改訂できる。原論文の独立検証完了を意味しない。

## 1. 中心問いと範囲

固定背景上の場を量子化するのでなく、有限時空領域の光的境界上で重力の制約を解き、関係的観測量を構成し、物理状態・振幅・貼り合わせを定義できるか。Chandrasekaran, *An algebraic quantization of gravity from the null cone*, [arXiv:2611.34924v1](https://arxiv.org/html/2611.34924v1)（2026-11-25 UTC提出）を研究読解の固定版とする。対象は4次元Lorentz型真空一般相対論、先端を空間的切断面で切った交差光円錐。JT＋物質は比較用の低次元模型であって4次元の証明ではない。摂動的非繰り込み可能性は有効場理論の無効性を意味しない。

Iは標準理論・先行研究を中心に据え、IIでv1の構成を再構成・査定する。AQFT（固定背景の局所環）、MQFC（数学的QFT構成・YM）、BHT/BHI（熱力学・情報）、HOLO（AdS/CFT）と中心問いが異なるため独立系列とする。論文の訂正・否定があってもIの教育価値を保つ。EOMは研究動向の横断参照に留め、AQGの定理を重複所有しない。

## 2. 文献と役割

| 文献 | 担当範囲 |
|---|---|
| Wald, *General Relativity*; Poisson, *A Relativist's Toolkit* | 光的合同、集束、曲率、境界と符号 |
| Henneaux–Teitelboim, *Quantization of Gauge Systems*; Rovelli, *Quantum Gravity* | 制約、ゲージ、正準量子化、背景独立性の比較 |
| Choquet-Bruhat, *General Relativity and the Einstein Equations*; Rendall (1990), Proc. R. Soc. A 427, 221–239; Luk, [On the Local Existence for the Characteristic Initial Value Problem in General Relativity](https://doi.org/10.1093/IMRN/RNR201) | 特性初期値問題の局所存在範囲・エネルギー評価。大域存在と混同しない |
| Reisenberger, [The Poisson bracket on free null initial data for gravity](https://arxiv.org/abs/0712.2541) | 光的初期データと括弧・共役点の問題 |
| Lee–Wald (1990), *Local symmetries and constraints*; Wald–Zoupas (2000), [A General Definition of Conserved Quantities in General Relativity and Other Theories of Gravity](https://arxiv.org/abs/gr-qc/9911095) | 共変位相空間、境界電荷・流束 |
| Donnelly–Freidel, [Local subsystems in gauge theory and gravity](https://arxiv.org/abs/1601.04744) | 拡張位相空間、境界対称性、貼り合わせ |
| Chandrasekaran–Flanagan–Prabhu, [Symmetries and charges of general relativity at null boundaries](https://arxiv.org/abs/1807.11499) | 光的境界の電荷 |
| Chandrasekaran–Prabhu, [Symmetries, charges and conservation laws at causal diamonds in general relativity](https://arxiv.org/abs/1908.00017) | 因果ダイヤモンド、定数ブースト |
| Chandrasekaran–Flanagan, [Horizon phase spaces in general relativity](https://arxiv.org/abs/2309.03871) | 交差する光的超曲面、相対ブースト、境界条件 |
| Haag, *Local Quantum Physics*; Bratteli–Robinson, *Operator Algebras and Quantum Statistical Mechanics*; Reed–Simon, *Methods of Modern Mathematical Physics I* | CCR、表現、閉作用素、スペクトル、トレース |
| Birrell–Davies, *Quantum Fields in Curved Space*; Vassilevich, [Heat kernel expansion: user's manual](https://arxiv.org/abs/hep-th/0306138) | 1ループ行列式、熱核、半古典重力 |
| Sen, [Logarithmic Corrections to Schwarzschild and Other Non-extremal Black Hole Entropy in Different Dimensions](https://arxiv.org/abs/1205.0971) | 固定質量での対数補正の独立比較 |
| Chandrasekaran 2026 v1 §§2–6、付録A–E | 研究課題。式番号・仮定・未閉鎖の論証を固定版で記録 |

前段の論文は独立した既刊研究、2026論文はプレプリントとして扱う。文献の定理・本文・演習をそのまま転載しない。本文執筆時には原典の定理番号・規格化・適用条件まで照合する。

## 3. 既存正本と直接依存

2026-11-26 mainの系列manifestを確認：GR46、LORG21、HPDE24、GBG30、GMECH8、QMOA21、QFT64、AQFT34、QCURV21、BHT24、BHI36、HOLO33は各系列全講completed、MQFCは24/48。全講を一律必修化しない。以下は実在章への接続候補であり、章別の厳密なprerequisitesは執筆時に本文・knowledge.yaml・stable anchorで確定する。特にGR34・BHT18・HPDE23・AQFT15・BHI15/19のknowledge.yamlを確認済み。

| 再利用 | 所有と境界 |
|---|---|
| GR2/6/10–12/34–40、LORG8/12–16 | 計量・作用・光的Raychaudhuri・因果領域・ADM制約。GR34の光学分解・集束評価を再証明せず新しい光的制約へ適用 |
| HPDE5–11/16/23 | 線形normally hyperbolic Cauchy問題・保存流。HPDE23のKlein–Gordon解空間のシンプレクティック形式を比較。非線形Einstein特性問題はAQGで追加 |
| GBG2–11/29–30、GMECH1–6、SYM | 束・接続・曲率・簡約の一般論。四脚場の非退化性、光的ゲージ・境界はAQG |
| BHT18–20 | 共変変分、シンプレクティック流保存、Noether電荷、表面Hamiltonian変分・境界恒等式。角・光的境界の追加項をAQGで扱う |
| QM3/5–8、OA3–5、VN2–7、AQFT5–10/15/24–25 | Weyl CCR、GNS、因子、トレース・KMS。AQFT15のType IIIトレース障害を参照しType Iと有限次元を区別 |
| BHI15/19–22/28–31、BHT9/12–14、HOLO21 | Gauss制約の有限模型、JT作用・場の方程式、レプリカ法。BHI15は有限模型であって重力の一般因数分解定理ではない |
| QFT4–6/19–26、QCURV15–17、GEO19 | Fock、生成汎関数、繰り込み、半古典方程式、Gauss–Bonnet。熱核・角の1ループは不足部分を導入 |
| MQFC3–10/13/22–23、MICA | 再構成・正値性・極限・局所分布の比較。MQFC全48講完了を待たない。未完了章に直接依存させず必要な補題を別途確定 |

DAGの主線：GR/LORG/HPDE/GBG/GMECH/BHT18 → AQG I → AQG II。IIにはQMOA/AQFT/QFT/BHIの対応章が合流し、QCURV/BHT/HOLO/MQFCは必要な箇所で参照する。AQG1から着手可能と見込むが、既存章の全内容を再査読済みとはしない。

## 4. 確定講義構成

暫定42講から48講へ変更：特性問題の適用範囲と評価、光的制約と角の整合、内積・順序付け、状態存在と有限次元性、熱核と固定質量変換、公理比較を独立に追える粒度にした。以下の各行は章の中心問い・検算課題であり、v1の主張を無条件の定理として登録する指示ではない。

### I：光的境界と古典重力（24講）

| ID | 中心問い・内容 | 直接前提候補／証明・計算目標 |
|---|---|---|
| AQG1 | なぜ重力では背景計量自体が量子化の対象となるか | GR10/12/21、QFT26：摂動の次元解析、有効理論と非摂動構成の区別 |
| AQG2 | 関係的観測量は何に対して不変か | AQG1、GBG5：場と参照枠の同時変換で不変量を作る |
| AQG3 | 有限時空領域・因果ダイヤモンド | AQG2、LORG12–16：Minkowski模型の切断面と因果境界、共役点の限界 |
| AQG4 | 四脚場と局所Lorentz対称性 | GR2、GBG2–4：計量復元、逆四脚と向き、ゲージ自由度 |
| AQG5 | スピン接続・曲率・捩率 | AQG4、GBG7–11：Cartan構造方程式、捩率なしの接続 |
| AQG6 | 一次形式のPalatini作用 | AQG5、GR10–12：独立変分、境界項、非退化四脚のもとでのEinstein方程式 |
| AQG7 | BF理論の制約と自由度 | AQG6、GMECH4–5：変分、シフト対称性、局所平坦模型 |
| AQG8 | Plebański作用と単純性制約 | AQG7：Bの重力セクター、退化・別セクターの区別、作用の照合 |
| AQG9 | 光的超曲面の退化計量 | AQG3–5、GR34：スクリーン、規格化した二つの光的法線 |
| AQG10 | 膨張・せん断と重力時計 | AQG9、GR34–35：面積密度ODEとアフィン長、集束の具体例 |
| AQG11 | 二重光的座標と自由初期データ | AQG10：交差面のデータ、再パラメータ化、独立変数の数 |
| AQG12 | 光的制約方程式 I | AQG8/11：Raychaudhuri制約、面積とせん断の積分、初期条件 |
| AQG13 | 光的制約方程式 II | AQG12：残余接続・交差面整合、v1付録Aの成分と拘束 |
| AQG14 | 特性初期値問題の局所存在 | AQG11–13、HPDE5–11：線形Goursat模型の構成、Rendall定理の条件と結論 |
| AQG15 | 特性問題の評価と適用限界 | AQG14：二重光的エネルギー評価の模型、Lukの局所領域、caustic反例 |
| AQG16 | 共変位相空間と光的流束 | AQG6/13、BHT18：一次形式のポテンシャルから流を計算 |
| AQG17 | 光的境界項と変分原理 | AQG16：固定するデータと変分可能なデータ、向き・角項 |
| AQG18 | 余次元2の角と表面電荷 | AQG17：境界対称性とゲージ縮退、積分可能性と流束 |
| AQG19 | 重力のエッジモード | AQG18、GMECH4–5：拡張位相空間、Donnelly–Freidel型有限模型 |
| AQG20 | 面積とLorentzブーストの共役性 | AQG19：角シンプレクティック項と係数、正負の向き |
| AQG21 | 簡約シンプレクティック形式 | AQG12–13/16/20：制約解の代入と縮退の商、付録A |
| AQG22 | 光的初期データのPoisson括弧 | AQG21：smearing、核・境界条件、有限モードでの反転とJacobi検算 |
| AQG23 | 簡約Hamiltonianとdressed観測量 | AQG22：境界時間並進、付録Bの境界項、計量と時計の復元 |
| AQG24 | 古典データの貼り合わせ | AQG23：両側の電荷の向き、整合・重複領域、Iの総合再構成 |

### II：量子化・研究論文（24講）

| ID | 中心問い・内容 | 直接前提候補／証明・計算目標 |
|---|---|---|
| AQG25 | JT＋質量なしスカラーの重力時計 | AQG10/24、BHI19–21：§2.1、固定曲率でもdilatonが変動する解 |
| AQG26 | JT量子化・貼り合わせの反例 | AQG25、QM8：§2.2、有限時計幅でも直交状態が無限個の機構 |
| AQG27 | 観測量代数と源変形 | AQG24/26、OA3–5：§4.1、積・随伴・関係、源の微分 |
| AQG28 | 正準交換関係・smearing・定義域 | AQG27、AQFT5–6：有限モードCCRと連続極限、順序付けを区別 |
| AQG29 | Gaussian状態と無限自由度 | AQG28、QFT4、AQFT7–10：共分散、正値性、有限モード内積 |
| AQG30 | 物理内積・零ノルム商・完備化 | AQG29：付録C.1、正半定値性と非退化性の別証明、表現依存性 |
| AQG31 | Weyl順序・接触項と境界演算子 | AQG30：付録C.2–3、共通稠密定義域、自己共役性・正値性の確認 |
| AQG32 | Type I因子の構成と限界 | AQG31、AQFT15、VN7：階数1演算子と強閉包。Type I無限次元例 |
| AQG33 | エッジモード・面積・ブーストの量子化 | AQG20/32：スペクトル射影、電荷整合、物理空間の定義 |
| AQG34 | Lorentz型振幅と貼り合わせ | AQG33：§4.3–4.4、境界反転、恒等分解、合成と独立性 |
| AQG35 | 中間状態和の絶対収束 | AQG34：Cauchy–Schwarzの有限ノルム条件、複数切断・連続極限との区別 |
| AQG36 | 重力子対生成・消滅振幅 | AQG35：式4.32–4.34、Wick収縮、級数・dilogarithm、極限交換の反例 |
| AQG37 | 量子的集束と時計のスペクトル制限 | AQG33/36：式4.27、付録D.3、作用素不等式・正則化 |
| AQG38 | 因果ダイヤモンドの状態存在 | AQG37：§5.1、時計射影、非零ノルム、生成されるセクター |
| AQG39 | 有限次元性の背理法 | AQG35/38：§5.2、面積帯、ブースト位相、切断と未切断の振幅、式5.38の符号 |
| AQG40 | 面積離散性・AdS境界の状態数 | AQG39：有限次元の帰結と別個のエネルギー制限、式5.39–5.49の条件 |
| AQG41 | Lorentz型トレースと面積則 | AQG40、BHT9/12：§5.3、限界捕捉面、Gibbs型重みとエントロピー |
| AQG42 | 1ループ行列式と熱核 | AQG41、QFT22–26：付録D.1、有限次元Gaussianから正則化行列式、ghost・零モード |
| AQG43 | Schwarzschild固定質量の対数補正 | AQG42、GEO19：式5.67–5.69、Gauss–Bonnet、面積→質量のJacobian、Sen比較 |
| AQG44 | 空間トポロジー・零状態・ER=EPR | AQG40/41、BHI15/31：§5.4、Gram行列の階数、商空間、因数分解の条件 |
| AQG45 | 古典解の再現 | AQG34/38：§6.1、停留位相、境界データと変分、古典極限の条件 |
| AQG46 | 重力子揺らぎと1ループ逆反応 | AQG42/45、QCURV15–17：§6.2、付録D.2、保存則・繰り込み条件 |
| AQG47 | Lorentz型公理とEuclid型再構成 | AQG30/34/40、MQFC8–10：付録E、正値性・合成・有限トレース条件、OSとの違い |
| AQG48 | 全構成の再査定と比較 | AQG39–47：証明台帳、独立した再計算、摂動重力・LQG・AdS/CFTとの適用範囲比較 |

## 5. 研究論文の証明責務台帳

各章で「標準結果として証明済み」「引用定理（条件照合済み）」「有限模型で再現」「v1固有の条件付き論証」「未解決・再検証待ち」を区別する。以下の主張は初期状態では検証待ち。成立しない論証が見つかった場合は誤りと修正可能な範囲を明示する。計画完成を論文の肯定と同一視しない。

| v1 | 重点検証 | 担当 |
|---|---|---|
| §3、付録A/B | 非退化四脚、ゲージ固定、光的制約の局所解、自由データの範囲、境界項の符号、括弧のJacobi恒等式 | AQG4–24 |
| §4.1–3、付録C | Gaussianの正値性・内積、連続モードの共通定義域、接触項、表現の選択。§5.1脚注20の異なる状態によるユニタリ同値性は著者が将来課題としている | AQG27–34 |
| §4.4 | 個々の状態和での絶対収束と、貼り合わせの切断独立性・複数和・極限の存在は別の責務。式4.34は特定のモード・挿入であり全UV問題の解決ではない | AQG35–36 |
| §5.1–2、付録D.3 | 時計上限、面積の有界性、状態存在、物理セクターの定義、ブーストでの比較、部分和の符号と極限。有限次元性を先取りしたトレースや基底の使用を禁止 | AQG37–40 |
| §5.3、付録D.1 | 限界捕捉面と事象地平線の差、熱的重み、1ループ行列式の仮定、固定質量・角運動量和と測度 | AQG41–43 |
| §5.4 | Gram行列の階数と零状態商、境界条件・因数分解仮定を明示。ER=EPR一般定理にしない | AQG44 |
| §6、付録D.2 | コヒーレント初期状態、停留位相、1ループでの低エネルギー極限。全次数・全状態への外挿禁止 | AQG45–46 |
| 付録E | 合成、反転、正値性、切断独立性、連続性、有限トレースとEuclid側の条件を一つずつ検査 | AQG47–48 |

### 計画段階での独立検算（小さな再現課題）

- 状態和：Hilbert空間の正規直交系に対し、有限部分集合Fで $\sum_{i\in F}|\langle x,e_i\rangle\langle e_i,y\rangle|\leq\|x\|\|y\|$。Bessel不等式とCauchy–Schwarzによる。有限ノルムを構成前に仮定しない。
- 式4.34：$s=A/(4G_N\hbar)>0$ とおくと、$\sum_{k\geq1}|e^{-2ik/s}/(2s^2k^2)|=\pi^2/(12s^2)$。一方指数の一次展開は $-i/s^3$ 倍の調和級数を生じる。絶対収束と展開・和の交換は別。
- 式5.69：$q=257/302$ とすれば $q/[2(1-q)]-1/2=257/90-45/90=212/90=106/45$。これは係数の代数的照合に限り、$q$ の熱核導出・測度はAQG42–43で再計算する。
- 有限次元性とType I：$B(\ell^2)$ はType Iだが無限次元。面積演算子の有界性のみから有限次元性を推論しない。有限次元なら自己共役演算子は有限スペクトルを持つ。
- 4次元真空・アフィン・回転零で $d\theta/d\lambda=-\theta^2/2-\sigma_{ab}\sigma^{ab}$。$\sigma=0,\theta(0)=\theta_0$ なら $\theta=\theta_0/(1+\lambda\theta_0/2)$。共役点以後へ解の正則性を延長しない。

## 6. 実装・完成条件

- 計量符号(-+++)を正本にし、内部Lorentz添字・時空添字・角の向き、$G_N,\hbar$ の単位と規格化を各章で宣言する。
- 各章は動機→定義→直接例→主要結果・証明→反例→演習を備える。最低A4/B3/C1と全詳細解答。仮定を使う箇所・定義域・演算子の閉性・極限順序・既習結果への使用箇所リンクを確認する。
- 特性問題の深い外部存在定理は、引用が不可避なら原典の仮定・適用域、証明の機構、独習可能な模型を明示し、完全証明したと称さない。研究主張の未確立部分は証明済みのcanonical theoremに登録しない。
- 必要な可視化：二重光的領域と角、集束ODE、式4.34の打ち切り・発散、Gram行列の固有値。図は幾何を正しく表し、数値実験は同一Python計算系で解析値と比較する。
- 実装開始時にPLANをplans_progressへ移し、AQG manifestを作成し、直接参照を同時更新する。各章のcompletedは本文・metadata・公開目次・区分C全件再計算と別観点再査読・CIの完了後のみ。既存完了章の追跡監査は別依頼とする。
- I終了時に古典的制約・境界・括弧・貼り合わせを横断検算。II終了時に証明責務台帳、文献の版差、研究主張の検証状態、全演習・参照・公開導線を監査し、未確認部分を明示してPLANの状態を判定する。

設計時の留保：原論文の節構成・主要主張・関連先行研究と一部の既存knowledgeを照合した。全付録の独立再計算、全既存章のanchor照合、標準教科書全頁の通読、第三者による研究論文の査読は未実施であり、講義執筆・研究査定の作業として残す。
