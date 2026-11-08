# DREAM THEATER 幾何学的測度論 計画

作成日: 2026-10-07  
改訂日: 2026-11-09（標準教科書・公開講義ノートとの照合、全36講の確定）  
状態: planned（全36講は設計上の仮ID。本文・manifestは未実装）

## 0. 中心問いと科目の射程

Hausdorff次元は集合の大きさを測る。しかし、射影したとき何が残るのか、どの集合が滑らかな曲面のように積分できるのか、凹凸や亀裂を持つ領域の境界に面積と法線を与えられるのかは、それだけでは分からない。

この科目では、既存のMT8（Hausdorff測度・次元）を出発点に、**微小スケールの測度と幾何**から射影・整流可能性・BV/有限周長・Kakeyaへ進む。**GMT1--GMT36の全36講、4部構成**とする。

- 第I部 GMT1--GMT8：Frostman測度、energy/capacity、Marstrand型射影定理
- 第II部 GMT9--GMT20：Lipschitz写像・area/coarea・rectifiability・密度・接平面
- 第III部 GMT21--GMT30：多変数BV、finite perimeter、De Giorgi構造定理、等周不等式、周長最小化
- 第IV部 GMT31--GMT36：Besicovitch集合、tube geometry、Kakeya maximal、調和解析への接続

**36講は内容と証明依存に基づく確定講数**であって、36週や90分×36回という意味ではない。1セメスター上限は設けない。逆に短い補講を単に水増ししてはいけない。第IV部は第I部とHA11から入れる分岐であり、GMT9--GMT30を全部履修しないとKakeyaを読めない、という人工的依存は作らない。

## 0.1 市販書・大学公開ノートとの照合（2026-11-09）

出版社公開の目次・書籍説明、および大学公開講義ノートで射程を照合した。本文・例題の転載ではない。

| 参照 | 確認した主題 | 採否・増補理由 |
|---|---|---|
| Pertti Mattila, *Geometry of Sets and Measures in Euclidean Spaces: Fractals and Rectifiability* (1995) | covering/differentiation、energy/capacity、射影、tangent measures、rectifiability・density・projection criterion | GMT1--8と15--20。旧GMT4--5を密度・接平面・射影判定に分割 |
| Pertti Mattila, *Fourier Analysis and Hausdorff Dimension* (2015) | Fourier energy、射影・例外方向、restriction/Kakeya | GMT4--8、31--36。Fourierの作用素論は既存FOU/HAを参照 |
| L. C. Evans / R. F. Gariepy, *Measure Theory and Fine Properties of Functions*, 2nd ed. | Rademacher、area/coarea、BV、finite perimeter | GMT9--14、21--28。areaとcoareaを分け、BVのcompactnessと構造定理の橋を設ける |
| Francesco Maggi, *Sets of Finite Perimeter and Geometric Variational Problems* (2012) | Gauss--Green、rectifiable sets、coarea、reduced boundary/De Giorgi、等周問題・最小化 | GMT21--30。旧停止線の**等周不等式・初等的周長最小化**を内側へ移す |
| Leon Simon, *Introduction to Geometric Measure Theory*（Stanford公開ノート） | rectifiability、varifolds、first variation、monotonicity/regularity | 接平面・blow-upの校正。varifold一般理論は次期科目の領域として明示 |

公開参照先:

- https://www.cambridge.org/core/books/geometry-of-sets-and-measures-in-euclidean-spaces/3E3DDE579ABAEEC863B8964D68DCC72F
- https://www.cambridge.org/core/books/fourier-analysis-and-hausdorff-dimension/78A25BED2C6E4F9B911971305DC928B0
- https://www.routledge.com/Measure-Theory-and-Fine-Properties-of-Functions/Evans-Gariepy/p/book/9781032946443
- https://www.cambridge.org/core/books/sets-of-finite-perimeter-and-geometric-variational-problems/F8D0DABFFFB0D444C5AD5D37B3E3DBC1
- https://web.stanford.edu/class/math285/

旧8講案では、Frostman構成とenergyのFourier恒等式、Marstrandの次元側と正測度側、areaとcoarea、rectifiabilityの定義と判定、BVとDe Giorgi構造、Besicovitch構成とtube評価が各1講へ詰め込まれていた。**主要証明を独習者が途中から再現できる粒度**に割り直した結果が36講である。

## 1. canonical owner・実在する前提と責務

| 既習理論 | 正本・GMTとの分担 |
|---|---|
| Hausdorff測度・次元、Lipschitz像の測度評価、mass distribution principle | 実在するMT8のchapter/knowledgeを確認済み。GMTでは再証明を重複させず、Frostmanの存在証明へ発展 |
| Radon測度、Fubini/Tonelli、積分 | MT5--MT7等。個別結果と条件は執筆開始時に実章・anchorへ照合 |
| Euclidの被覆補題・Lebesgue微分・最大作用素 | 完成済みHA1。一般Radon測度の必要な微分・密度の部分はGMT1で明示 |
| Fourier変換・Plancherel・Rieszポテンシャル | FOU3--FOU4・HA7。GMT4は測度のRiesz energyと正則化の導出を所有 |
| restriction/extension、Knapp例とcap/tube | 完成済みHA11（本文・chapter/knowledge確認済み）。GMT35--36はその幾何側 |
| 1次元BV、多変数Sobolev・弱収束 | MT4、GPDE3--GPDE5。GMT21--23で分布微分がRadon測度になる場合を新たに扱う |
| 曲面の古典的法線・平均曲率・第一/第二変分 | GEO10、VAR7--VAR8。GMT24--30は**弱い境界と周長**を所有し、滑らかな曲面変分を再所有しない |
| 多様体PDE・調和写像 | 完了済みGA系列。GMTはEuclidの可測的幾何、GAはmanifold PDEで分担 |

- PLANのみを推敲する段階ではGMT manifest・仮chapter.yaml・公開目次を作らない。GMT1執筆時にID衝突、実在prerequisite、stable anchorを照合して系列manifestを初期化する。
- 完了済みHAの過去PLAN中の「GMT7--GMT8」は当時の**旧仮IDを参照した履歴**。新しいKakeya側の接続はGMT31--GMT36、特にGMT35--36とする。完了済み計画を過去に遡って書き換えない。
- EOM074の基本ルートは **GMT1--GMT8 → GMT31--GMT36** とHA11。第II/III部全体をEOMへの無条件の必修にはしない。

## 2. 全36講の確定シラバスと証明責務

### 第I部：energy・capacity・射影（GMT1--GMT8）

#### GMT1 Radon測度の被覆・微分・密度

- Vitali/Besicovitch型被覆の採用補題、Radon測度の微分、上・下$m$-密度。
- Lebesgue平均のHA1との差と、Hausdorff測度との接続。
- 点質量・弧長・Cantor測度で密度を計算。一般測度に倍加条件を無断で課さない。

#### GMT2 Frostman補題と測度の構成

- compact集合上のFrostman測度の構成、$\mu(B(x,r))\le Cr^s$の球成長評価。
- contentと質量分布原理の両方向、$s<\dim_H E$を使う理由。
- 有限段階構成→弱極限→球の評価を証明。臨界指数での存在を無条件に主張しない。

#### GMT3 Riesz energyとcapacity

- $0<s<d$での$I_s(\mu)=\iint|x-y|^{-s}\,d\mu(x)d\mu(y)$、対角・拡張実数、capacity。
- 球成長から$t<s$のenergy有限を層ケーキで導き、次元下界を証明。
- Cantor測度でenergyの収束/発散を計算。

#### GMT4 Fourier表示によるenergy法

- 有限測度のFourier変換とRiesz核。$I_s(\mu)=c_{d,s}\int|\widehat\mu(\xi)|^2|\xi|^{s-d}d\xi$の正規化。
- mollifier→Plancherel→単調・優収束等の採用条件を追い、定数と指数を検算。
- HA7の作用素としてのRieszポテンシャルと混同しない。

#### GMT5 平面Marstrand射影定理：次元

- 直交射影$\pi_\theta$、a.e.方向、$\dim_H\pi_\theta E=\min(\dim_HE,1)$の適切な集合クラス。
- 方向平均energyで下界、Lipschitz性で上界。線分・Cantor積集合の例。

#### GMT6 平面Marstrand射影定理：正測度

- $\dim_HE>1$ならa.e.方向で$\mathcal L^1(\pi_\theta E)>0$。
- 射影測度の密度、$L^2$とenergyの関係を導出。次元1と正測度を同一視しない。

#### GMT7 高次元・Grassmann射影

- $G(d,m)$上の回転不変確率測度、$\dim_H\pi_VE=\min(\dim_HE,m)$のa.e.版。
- $\dim_HE>m$の場合の正の$m$-次元Lebesgue測度、核の方向積分。
- 臨界$\dim_HE=m$を境界事例として検算。

#### GMT8 例外方向の定量評価

- 例外方向集合にFrostman測度を置く二重energy法。
- Borel集合$E\subset\mathbb R^2$、$0<t<\min\{\dim_HE,1\}$のとき、$\dim_H\{\theta:\dim_H\pi_\theta E<t\}\le t$という古典的Kaufman型上界を証明。
- sharpな現代的例外方向理論は停止線外。方向の測度零と方向集合のHausdorff次元を区別する。

### 第II部：Lipschitz幾何とrectifiability（GMT9--GMT20）

#### GMT9 Lipschitz写像とRademacher定理

- Lipschitz写像のLebesgue a.e.微分可能性、微分のノルム。
- 1次元絶対連続性から高次元へ至る採用証明と微分不能集合の例。

#### GMT10 近似微分と幾何的Jacobian

- approximate differential、$m$次元JacobianのGram行列式。
- 線形写像・グラフ・rank欠損を計算。どの測度についてa.e.かを宣言。

#### GMT11 area formula：重複度と測度

- Lipschitz $f:\mathbb R^m\to\mathbb R^d$（$m\le d$）の面積公式とmultiplicity。
- 単射の局所表示→一般写像への分割・近似・零集合の扱いを証明。
- 折り返し写像・グラフで測度の重複を実計算。

#### GMT12 可算整流可能集合の定義と例

- countably $m$-rectifiable、purely $m$-unrectifiable、Lipschitz像と$C^1$グラフ。
- 整数のHausdorff次元だけではrectifiableでないことを反例で示す。
- 正かつ有限の$\mathcal H^m$測度を持つ具体例を条件に沿って検証。

#### GMT13 整流可能集合上のarea formula

- 近似接平面・接Jacobianを局所グラフから構成し、rectifiable set上の面積公式へ。
- 接平面の一般的な存在を後続GMT15から循環引用せず、この章の局所補題か既証明事項で支える。
- 滑らかな曲面積分との一致と重複度を計算。

#### GMT14 coarea formula：レベル集合の測度

- Lipschitz $f:\mathbb R^d\to\mathbb R^m$（$1\le m\le d$）のcoarea formula。
- 近似・Jacobian・Fubiniの証明連鎖。線形射影・距離関数・極座標で計算。
- rectifiable set上の拡張はGMT13の接Jacobianを条件つきで適用。

#### GMT15 密度と近似接平面

- $\mathcal H^m$の上・下密度、近似接平面、円錐条件と密度1の導出。
- rectifiable setのa.e.接平面と例外集合。Radon測度の密度とは区別する。

#### GMT16 純非整流性と分解・反例

- rectifiable/purely unrectifiableの分解を有限$\mathcal H^m$の仮定で構成。
- 接平面の失敗と射影の挙動を例で検算。単なる測度零と純非整流性を混同しない。

#### GMT17 Besicovitch--Federer射影判定 I

- 有限$\mathcal H^m$集合の射影とrectifiabilityの幾何的補題。
- 接平面・密度・方向平均の必要な中間評価を証明。Marstrandの射影**次元**定理との差を示す。

#### GMT18 Besicovitch--Federer射影判定 II

- Borel集合$E$、$\mathcal H^m(E)<\infty$で、純$m$-非整流可能とa.e.$V\in G(d,m)$で$\mathcal H^m(\pi_VE)=0$の同値。
- GMT17から両方向を証明。整流可能な直線分と純非整流集合の例。

#### GMT19 blow-upと接測度の基礎

- $T_{x,r}(y)=(y-x)/r$、測度押し出し・規格化、弱収束、接測度の定義と存在条件。
- 平面・錐・特異測度のblow-upを直接計算。一般Preiss理論を暗黙前提にしない。

#### GMT20 密度によるrectifiability判定

- 有限$\mathcal H^m$集合に対する古典的density/tangent criterionの採用版を、GMT15--19から証明。
- Preiss定理は**整数次元密度の正かつ有限な極限が測度a.e.存在する**場合の結論を正確に述べるが、一般の深い証明は停止線外。
- 正の上密度だけで密度の極限の存在を主張しない。

### 第III部：BVとfinite perimeter（GMT21--GMT30）

#### GMT21 多変数BVと分布微分

- $BV(\Omega)$、測度値分布微分$Du$、全変動$|Du|$、$W^{1,1}$との比較。
- ジャンプ関数・特性関数でテスト関数積分の符号と境界を検算。

#### GMT22 BV近似・全変動の下半連続性

- mollification、smooth approximation、strict convergenceと$L^1$収束の違い。
- 全変動の双対表示から下半連続性を証明。局所化・境界での質量漏れの例。

#### GMT23 BVコンパクト性とcoarea

- 局所BV有界列の$L^1_{\mathrm{loc}}$コンパクト性の条件と証明。
- $|Du|(\Omega)=\int P(\{u>t\};\Omega)dt$のBV coareaを近似と下半連続性で導く。
- GMT14のLipschitz coareaとBV coareaを区別する。

#### GMT24 有限周長集合とGauss--Green測度

- $P(E;\Omega)=|D\chi_E|(\Omega)$、分布的Gauss--Greenの定義と符号。
- 球・長方形・合併集合で周長と測度値法線を計算。位相的境界とは区別。

#### GMT25 reduced boundaryと測度論的法線

- $\partial^*E$、測度論的外向き法線、密度$1/2$、半空間近似。
- 滑らかな境界・角点・零測度の穴で定義を検証。接平面を結論から先取りしない。

#### GMT26 De Giorgi構造定理 I：半空間blow-up

- 相対等周不等式・周長密度の採用評価を証明。
- BVコンパクト性→reduced boundaryの半空間blow-up、弱収束と法線の取り扱い。
- 集合の$L^1_{\mathrm{loc}}$ blow-upと測度の接測度を区別する。

#### GMT27 De Giorgi構造定理 II：整流可能性と測度同定

- $\partial^*E$の可算$(d-1)$-rectifiability、$|D\chi_E|=\mathcal H^{d-1}\llcorner\partial^*E$。
- 半空間近似→局所グラフ被覆→測度同定の核心を証明。正規化と零集合を検算。

#### GMT28 Gauss--Greenの境界積分・集合演算・切断

- reduced boundaryでのGauss--Green、集合の和/共通部分/補集合の周長。
- 超平面切断のa.e.定理とcoarea。境界を二重に数える誤りを反例で検討。

#### GMT29 Euclid等周不等式

- $P(E)\ge d\omega_d^{1/d}|E|^{(d-1)/d}$の条件とスケーリング。
- BV--Sobolevからの非鋭い評価と、鋭い定数・等号の場合に必要な追加証明を分離して閉じる。
- 球・直方体・分離成分で直接計算。

#### GMT30 周長最小化の直接法

- 境界/体積条件を明記した具体的な許容クラスでBVコンパクト性＋下半連続性から極小集合を構成。
- 質量消失・並進逃避・境界条件の非閉性を反例で点検。
- 滑らかな曲面の第一/第二変分はVAR7--VAR8が正本。一般正則性は停止線外。

### 第IV部：Kakeyaの幾何と解析側との合流（GMT31--GMT36）

#### GMT31 Besicovitch集合：有限段階から極限まで

- needle problemとBesicovitch setの区別。全方向の単位線分を含む平面測度零集合。
- 三角形移動・重なりの有限段階面積評価→極限の包含・測度の証明。
- 回転問題の解と線分を含む集合を無条件に同一視しない。

#### GMT32 $\delta$-tube・方向分離・次元

- $\delta$-separated方向の長さ1・半径$\delta$のtube、合併体積、重複度。
- Hausdorff次元と上下Minkowski次元、$\delta$-近傍のliminf/limsupを検算。
- 方向本数と各tube体積の次元別scaling。

#### GMT33 平面Córdoba型tube評価

- 二tubeの交差体積と角度、$L^2$二乗積分/Cauchy--Schwarzによる合併体積下界。
- 対数損失を含む採用評価を全項導出。測度零とfull Minkowski次元の両立を説明。

#### GMT34 高次元tube幾何・古典的次元下界

- 高次元のintersection、hairbrush配置、多重度、平面評価の限界。
- **一つの証明可能な古典的高次元下界**を選び、仮定・指数・数え上げを自力再現可能にする。
- 最新の最良指数・個別の2026結果の検証状態はEOM074へ送る。

#### GMT35 Kakeya maximalと集合版の含意

- $\delta$-Kakeya maximalの定義・正規化、$L^p$推定と$\delta$損失。
- maximal評価→tube合併体積→次元下界の正しい**一方向の含意**を証明。
- set版・Hausdorff/Minkowski版・maximal版の強弱、endpoint/log/$\varepsilon$損失を整理。

#### GMT36 Fourier restriction・wave packet・EOM074

- HA11のcap/tube、Knapp例、restriction/extensionを具体的尺度へ代入。
- 周波数直交性とKakeya重なりの対応、示せる含意とheuristicを区別。
- EOM074で扱う個別2026年成果のexact claim・証明構造・検証状況へ橋を架け、未確立な主張を本講義で定理扱いしない。

## 3. 証明依存と学習経路

~~~text
MT8 + MT5--7 + HA1
           |
        GMT1--4 (energy)
           |
        GMT5--8 (projection)
           |             |
        GMT9--20         +----> GMT31--35 (Kakeya)
           |                         |
        GMT21--30                   HA11
                                     |
                                   GMT36 --> EOM074
~~~

これは推奨順であり、全矢印を直接prerequisiteとして強制しない。GMT31--36にGMT9--30全講を一律要求しない。GMT9--14の微分・Jacobian、GMT21--23の分布・弱微分、GMT26--30のBVを既習とする細かな依存は、実際に使う定理の正本を確認して章ごとに確定する。

とくに次の**非循環性**を実装時に確認する。

- GMT13の接Jacobian公式をGMT15の未証明な一般接平面定理へ依存させず、局所グラフの補題で閉じる。
- GMT20の古典的判定にPreissの一般定理の結論を逆輸入しない。
- GMT26--27のDe Giorgi構造定理で、その結論をGMT25の「定義」の中に仮定しない。
- GMT33--35のmaximal評価からKakeya集合の主張へ進むとき、逆方向・同値を勝手に主張しない。

## 4. 停止線：講数上限でなく理論の境界

**旧停止線から内側に移したもの**：接測度の基礎と古典的rectifiability判定、reduced boundaryの半空間blow-up、De Giorgi構造定理、Euclid等周不等式、コンパクト性による周長最小化の存在。

**全36講では完全理論にしないもの**：

1. Preissの定理の一般証明、接測度の高度な分類（GMT19--20では正確な定義・定理文・古典的可証範囲まで）。
2. uniform rectifiability、analytic capacity、非平坦集合上のsingular integralsの完全理論（Euclid CZのHA5だけで済ませない）。
3. integral currents、varifolds、Federer--Fleming compactness、Allard regularity、極小曲面の全正則性・特異集合理論。これらは次期 **GMT II：弱い曲面と幾何変分** の候補。定義だけを置いて証明済み扱いしない。
4. Falconer distance問題、polynomial partitioning、decoupling、最先端のKakeya/restrictionの完全証明。個別の2026成果はEOM074の正本。
5. self-similar/self-affine fractal、packing measureの包括的分類。必要な例と判定はGMT内に入れる。

停止線の外でも標準教科書の主要結果を「既知」として証明に使用する場合は、実在するcanonical dependencyを追加するか、採用した必要部分を本文で証明する。

## 5. 演習・自己査読・検証

各章は理由付き例外がなければ **Level A 4題・B 3題・C 1題以上**、全問に詳細解答。8題は下限であって上限ではない。主要learning objective・典型的な誤り・複数概念の接続に必要なら増やす。

- I部：Frostmanの構成、energyの層ケーキ、Fourierの正則化極限、Marstrandの方向積分。
- II部：Rademacher、Gram行列式、area/coareaの重複度、密度・接平面、射影判定の両方向。
- III部：BV分布微分の符号、coarea、半空間blow-up、De Giorgiの測度同定、等周定数、直接法。
- IV部：Besicovitch有限段階と極限、tubeの交差積分、maximal→setの正しい含意、cap/tubeの尺度。

formal statementでは対象の可測性・次元・有限性、a.e.の参照測度、正規化、収束モード、定数依存を明記する。主要定義の専門語は使用前に導入し、既習定理を使う箇所から実在stable anchorを張る。新規講義は全主要証明・全演習解答を自分で再計算し、完成本文を別観点で再読する。**本PLANだけの改訂は講義本文の数学的査読済みを意味しない**。

## 6. 完成条件

1. GMT1--GMT36が実在し、全36章の本文・chapter/knowledge・系列manifest・公開導線の整合が確認された。
2. Frostman/energy/capacity、Marstrand射影の次元側・正測度側・例外方向を仮定つきで再導出できる。
3. area/coarea、rectifiable/purely unrectifiable、密度・接平面・射影判定を定義・例・核心証明から追える。
4. BV compactness/coarea→finite perimeter→reduced boundary→De Giorgi構造→Gauss--Green→等周・周長最小化の証明が閉じる。
5. Besicovitch構成、tube overlap、Kakeya maximalからの次元含意を計算でき、HA11とEOM074へ正しく接続する。
6. Preissの一般定理・currents/varifolds・Kakeya最新結果について、**証明済みの本科目範囲と停止線外**を読者が区別できる。
7. 全講の主要定理・演習/詳細解答・定義順・リンクを査読し、変更に応じたCI/Pages検証を通した後にのみ、PLANをplans_progressからplan_doneへ移す。現在はplans/に保持する。
