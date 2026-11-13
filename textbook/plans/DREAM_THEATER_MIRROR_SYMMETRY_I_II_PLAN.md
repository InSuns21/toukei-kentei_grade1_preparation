# DREAM THEATER ミラー対称性 I・II（MIR1・MIR2）

分冊: 2026-10-11  
設計改訂: 2026-11-14（標準教科書・公開講義テキストと再照合）  
状態: planned（**MIR1＝16章、MIR2＝16章、全32章に設計確定**。講義本文・系列manifestは未着手）

## 中心問い・到達目標

滑らかなquintic Calabi–Yau三次元多様体 $X\subset\mathbb P^4$ の種数0曲線計数を、ミラーの一パラメータ複素構造族 $Y_z$ の周期積分からどう再構成するか。物理的なA/B模型の説明、具体例での数学的恒等式、一般のミラー対称性予想は同一ではない。

**到達する計算の鎖**は、ミラー族の構成と定義域 → 正則3形式の周期 → Gauss–Manin・Picard–Fuchs → Frobenius解とモノドロミー → ミラー写像 → 正規化したB側Yukawa結合 → A側種数0 GW理論とミラー定理の精確な適用 → 多重被覆補正 → 低次数係数の検算である。

- **MIR1**：B側の複素構造、周期、局所モノドロミー、ミラー写像、Yukawa結合を計算する。quintic全体の複素構造変形（一般に多パラメータ）と、ミラー商から得た一パラメータの不変部分を混同しない。
- **MIR2**：GW1で導入したA側の計数と周期計算をつなぎ、quintic種数0の数値を導く。量子微分方程式と $I/J$ 関数の役割、局所化とミラー定理の深い入力を明示して使う。
- 一般Calabi–Yauのミラー対称性全体、ホモロジカル・ミラー対称性、SYZ、高種数GW／GV理論の完全構成は本32章で証明したとは主張しない。

## 文献照合による講数の確定

### 採用した教科書・テキストと設計判断

出版社・著者・研究機関が公開する**目次・解説・講義資料**を照合して論証上の境界を決めた。書籍の全頁を通読済みとは扱わず、講数を文献の章数から機械的に転用していない。著作物の本文・演習・証明は転載しない。

| 文献 | 確認した内容と、本PLANへの反映 |
| --- | --- |
| [D. Cox / S. Katz, *Mirror Symmetry and Algebraic Geometry*（AMS, 1999）](https://doi.org/10.1090/surv/068)／[著者の書誌・訂正情報](https://katzs.web.illinois.edu/msag/) | 第2–6章のquintic・商・Hodge・モジュライ・ミラー写像をMIR1へ、第7–11章のGW・量子コホモロジー・局所化・量子微分方程式・ミラー定理をGW1とMIR2へ分担。第5章には著者による訂正注記があり、記載された証明を無条件に正本化しない。 |
| [K. Hori et al., *Mirror Symmetry*（Clay/AMS, 2003）](https://www.claymath.org/resource/mirror-symmetry/)／[公開版PDF](https://www.claymath.org/library/monographs/cmim-1.pdf) | 第6–7章の複素モジュライ・quintic例・商と解消、第21–30章の安定写像・仮想類・局所化・量子微分方程式・Calabi–Yau超曲面のミラー定理、第33–34章の整数型数値と多重被覆を区別。第20章の物理的「証明」と第29–30章の数学的定理を混同しない。 |
| [C. Voisin, *Hodge Theory and Complex Algebraic Geometry II*（Cambridge）](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-ii/47F0D9D694725A426F9CAFDFA830DB11) | Hodge構造の変動・Gauss–Manin・モノドロミーはDEF1/HOD1での正本を確認し、MIR1ではquinticへの具体的適用に集中する。 |
| [P. Candelas et al., *A Pair of Calabi–Yau Manifolds as an Exactly Soluble Superconformal Theory*（1991）](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf) | 一パラメータ族・周期・ミラー座標・Yukawa・低次数曲線計数を接続する元の計算経路。物理予測と数学的証明の年代・論理を分ける。 |
| [A. Givental, *Equivariant Gromov–Witten Invariants*（公開原稿）](https://sumizdat.com/homepage/papers/eqv.pdf) | $I/J$型の母関数とquinticの数値に関係する定理の深さを確認。証明全体を「周期の計算」と呼んで省略しない。 |
| [J. Walcher, *Open Strings and Extended Mirror Symmetry*（2007、公開講義原稿）](https://www.mathi.uni-heidelberg.de/~walcher/assets/documents/mfsdwalcher.pdf) | 普通のquinticの直線2875本をGrassmann多様体上の $\int_{G(2,5)}c_6(\operatorname{Sym}^5 S^\vee)$ で独立検算する古典的手順を参照。実quinticの問題は本PLANの別テーマとして混入させない。 |

### 旧24章案から32章案への再編理由

従来のMIR1＝12章・MIR2＝12章では、(i)商の特異点・crepant解消とHodge数の照合、(ii)留数・極次数低減からPicard–Fuchs作用素への論証、(iii)局所解と積分構造・モノドロミーの違い、(iv) $I/J$ 関数・量子微分方程式・局所化の意味、(v)GWの有理数と整数型数値および実際の曲線本数の区別を、別々の中心問いとして練習する余地が不足していた。

**MIR1＝16、MIR2＝16、合計32章を設計上の確定数とする。** これは15週や90分に合わせた数でも、全員に講義時間を固定する上限でもない。各章には主要定義の導入・直接例・核心計算・自力演習を置き、無関係な類題で講数を水増ししない。実装中に実在する新たな証明依存が判明した場合に限り、根拠とルート台帳の同期更新を伴う再設計を行う。

## 直接依存と証明所有者

- **MIR1**：完成済み [HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)、[CAG1](../plan_done/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md)、[CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)、および [DEF1](../plan_done/DREAM_THEATER_COMPLEX_DEFORMATION_MODULI_PLAN.md) のGauss–Manin・変形理論を直接利用する。**DEF1の完了後に着手**し、GW1やYAU1の完了はMIR1の必須条件にしない。既知の定理は実装時に実在するstable anchorへつなぐ。
- **MIR2**：MIR1の周期・ミラー写像と、[GW1](../plans_progress/DREAM_THEATER_GROMOV_WITTEN_GEOMETRY_PLAN.md) の種数0GW・因子公理・量子積を直接前提とする。**MIR1とGW1の双方が完成した後に着手**する。
- GW1は凸な射影標的の種数0計数と量子積を中心にし、**非凸quinticの仮想基本類の一般構成および局所化・量子微分方程式・ミラー定理を完了済みとはしない**。MIR2では、非凸標的に必要な仮想類・仮想局所化・quinticミラー定理の精確な外部数学的入力を表示し、それらを使って何を計算・証明できたかを区別する。
- Greene–Plesser型の商とcrepant解消、積分周期格子の選択、一般の局所化・ミラー定理の全構成は、個別の採用条件・証明責務・未証明範囲を明記する。一般の「ミラー対称性の定理」がすべてのCalabi–Yauで使えると書かない。
- [HM1](DREAM_THEATER_HOMOLOGICAL_MIRROR_SYMMETRY_PLAN.md) と [SYZ1](DREAM_THEATER_SYZ_SPECIAL_LAGRANGIAN_PLAN.md) は別系列。$A_\infty$圏、Fukaya圏、特殊Lagrangeファイバーの構成をMIR1/2へ逆輸入しない。

## MIR1：quinticミラー族・周期・Picard–Fuchs・ミラー座標（確定16章）

### I. 何が鏡像になるのか

1. **MIR1-01：A模型とB模型の問い** — 複素構造・複素化Kähler構造・観測量の数学的対象を導入。物理的動機、実際に使う数学的定理、予想の境界を示す。
2. **MIR1-02：Hodge数交換は何を主張するか** — Calabi–Yau三次元での $h^{1,1}\leftrightarrow h^{2,1}$、HodgeダイヤモンドとEuler標数の符号。楕円曲線・K3では何が別なのかを確かめる。
3. **MIR1-03：quinticのHodge数とミラー構成の目標** — 滑らかなquinticの $h^{1,1}=1,\ h^{2,1}=101$ を既習CYG/CAGの根拠に接続し、対となる $(101,1)$ の意味を確認。既出のHodge計算を全文重複しない。
4. **MIR1-04：Greene–Plesser型の群作用と商** — 対角位相群、正則3形式の不変性、軌道と固定点を具体点で計算。滑らかな多様体と特異な商を区別する。
5. **MIR1-05：特異点・crepant解消・鏡像のHodge数** — 解消前後の違い、例外因子、Hodge数の変化と計算の外部入力を明示。単に「商を取ったから$(101,1)$」とはしない。

### II. 周期が微分方程式を満たすまで

6. **MIR1-06：Dwork型一パラメータ族と判別式** — quintic方程式・パラメータ・座標 $z$ を固定し、滑らかなファイバー、判別式、$z=0$の境界、conifold点を直接検算する。
7. **MIR1-07：留数で作る正則3形式** — 射影超曲面の留数表示、次数、規格化、3サイクルと周期積分。正則性・サイクルが動く条件を示す。
8. **MIR1-08：Gauss–Manin接続・Hodge構造の変動** — サイクルの平行移動、周期の微分、Griffiths横断性、有限ランクから微分方程式が生まれる理由を実演する。
9. **MIR1-09：Griffiths–Dworkの極次数低減** — 有理4形式を偏微分に沿って簡約する手順、Jacobian ideal、全微分で消える項と境界の仮定を計算する。
10. **MIR1-10：quinticのPicard–Fuchs作用素** — $\theta=z\,d/dz$ の規約で4階作用素を導出し、係数・符号・正則特異点を検算。4解は**ミラー族の対象となる不変部分**であり、元のquinticの $H^3$ 全体の次元を表さない。
11. **MIR1-11：正則周期と超幾何級数** — $\omega_0(z)=\sum_{d\ge0}(5d)!/(d!)^5\,z^d$ の漸化式を作用素から導き、収束する局所領域・初項を検算する。
12. **MIR1-12：Frobenius法と対数周期** — 指標根の重複、4本の局所解の構成、対数の分枝、周期比を定義できる領域と規格化の自由度を確認する。

### III. モノドロミーから鏡像座標へ

13. **MIR1-13：大複素構造極限と最大単冪モノドロミー** — $z=0$を一周する解析接続から対数解の作用を求め、nilpotent部分・最大単冪条件を局所解の基底で検算する。
14. **MIR1-14：conifold・orbifold点と積分構造** — 他の特異点近傍の局所解・モノドロミーを比較し、局所的なFrobenius基底と積分・シンプレクティックな周期基底が自動的に一致しない理由を明示する。
15. **MIR1-15：ミラー写像の構成と逆級数** — 正規化した周期比 $t$ と $q=e^{2\pi i t}$、$q=z+770z^2+\cdots$ を得て逆写像を検算。座標・対数規約を固定してから計算する。
16. **MIR1-16：B側Yukawa結合と周期の統合** — Hodge側三次結合を定義し、z座標の式から平坦座標への変換・正則3形式の規格化を整理。MIR2へ渡す量と未証明の等式を明示する。

## MIR2：量子微分方程式・quinticミラー定理・種数0計数（確定16章）

### I. A側の計数を接続・母関数にまとめる

1. **MIR2-01：複素化KählerパラメータとA側の幾何** — 曲線類、面積、$q$とNovikov変数、形式級数と解析的収束の区別を定義する。
2. **MIR2-02：quinticのGW不変量と仮想次元** — 種数0の安定写像・非凸標的の仮想基本類の必要性をGW1から接続し、$\operatorname{vdim}_{\mathbb C}\overline{\mathcal M}_{0,k}(X,d)=k$と挿入次数を検算する。
3. **MIR2-03：因子公理と三点関数** — $H\in H^2(X)$、$\int_X H^3=5$、三点挿入の次数と $d^3$ の由来。$d=0$と不安定標点の例外を整理する。
4. **MIR2-04：小量子積・Novikov環・大きい量子積との差** — GW1の量子積を再利用し、quinticのambient cohomologyに必要な範囲、係数と次数の整合を計算する。
5. **MIR2-05：種数0ポテンシャルとA側Yukawa結合** — 三次交叉項 $5t^3/6$ と曲線寄与、三階微分で得られる三点関数を区別する。prepotentialの低次多項式の不定性を明示する。
6. **MIR2-06：量子接続と量子微分方程式** — Dubrovin型接続の定義、平坦性が成り立つ範囲、GW1での結合律との関係を示し、射影空間で簡単な計算例を置く。

### II. B側と比較するための関数と定理

7. **MIR2-07：B側Yukawaの座標変換と規格化** — MIR1-16の三次結合と $(dz/dt)^3$、$\omega_0$ による正規化を仮定つきで導き、A側の式と**比較可能な規約**を確定する。
8. **MIR2-08：特殊幾何とprepotential** — 周期と平坦座標の関係、三階微分の一致がどこまでポテンシャルを定めるか、三次交叉数5を含む古典項を検算する。
9. **MIR2-09：GWの $J$ 関数とdescendant** — 評価写像・$\psi$類を導入し、$J$の係数がなぜGW数を組織するかを例で示す。一般非凸標的で必要な仮想類は外部入力として明示する。
10. **MIR2-10：超幾何 $I$ 関数とquinticの係数** — 超曲面の次数5による積の因子、$I_0,I_1$とMIR1の周期の対応を漸化式・初項で検算する。GWの $J$ と定義上同一視しない。
11. **MIR2-11：トーラス局所化と固定グラフ** — 等変コホモロジーの最小例、固定点寄与・次数・自己同型係数を説明。quinticの**仮想局所化全証明**を一講で済ませたとは主張せず、必要な定理を正確に記載する。
12. **MIR2-12：quinticミラー定理の正確な主張** — $I$と$J$の関係、ミラー座標変換、次数・規格化・適用条件を確定。Givental／Lian–Liu–Yau等による数学的定理の外部証明入力と、本文で実際に導く帰結を明確に分ける。

### III. 級数から曲線数へ

13. **MIR2-13：鏡像座標でのYukawa級数** — MIR1の周期・鏡像座標を代入して $K(q)=5+2875q+4876875q^2+\cdots$ を計算し、変数変換・微分・規格化を紙上で検算する。
14. **MIR2-14：多重被覆と整数型数値** — $K(q)=5+\sum_{d\ge1}n_dd^3q^d/(1-q^d)$、有理GWの係数 $N_d=\sum_{k\mid d}n_{d/k}/k^3$、Möbius反転を明記して初項を再計算する。$n_d$を一般に幾何的な曲線本数と断言しない。
15. **MIR2-15：2875本の直線を独立に数える** — $G(2,5)$ 上の普遍部分束 $S$ と $\operatorname{Sym}^5S^\vee$ の階数6、零点の横断性、$\int_{G(2,5)}c_6(\operatorname{Sym}^5S^\vee)=2875$ の主要積分を追い、ミラー側 $n_1$ と照合する。
16. **MIR2-16：低次数の照合と論理の総決算** — $n_2=609250,\ n_3=317206375$ を多重被覆式へ代入して計数とGWの差を検算し、既知の独立な列挙結果は出典つきで**照合**する。次数一般・特異/非横断な曲線・高種数に同じ「本数」を適用できない理由を述べ、全計算の依存を再検査する。

## 計算・査読の完成ゲート

- **MIR1**：対象の群作用と解消の仮定、Dwork族の判別式、留数の次数、Picard–Fuchs作用素の係数、階数、局所級数・対数解・モノドロミー、周期規格化と $q(z)$ を各出発点から再計算できる。とくに $4$階作用素の対象を元のquinticの $H^3$ 全体と取り違えない。
- **MIR2**：A側の仮想次元・挿入次数・因子公理、$I/J$関数と局所化の外部入力、A/Bの三次結合の規格化、$q$係数、多重被覆の $1/k^3$、直線2875本のGrassmann積分を確認できる。**有理数のGW不変量・整数型 $n_d$・実際の曲線本数は別の対象**として扱う。
- $z$はB側族のパラメータ、$q$は鏡像写像後の形式的な平坦座標、$d$はA側曲線の次数である。対数分枝、導関数の変数、複素次元・実次元、符号、初項、解析接続と収束を混同しない。数式の同一性は正規化を明示した式で比較する。
- 各実装章に原則Level A **4題以上**、B **3題以上**、C **1題以上**と全問詳細解答。数合わせで止めず、主要learning objective・反例・接続が不足すれば追加する。主要定理は本文または到達可能な正本で核心証明を閉じ、意図的な外部定理は名称・仮定・用途・証明の所属を示す。
- 変更章自身に [DREAM THEATER執筆・査読規約](../DREAM_THEATER_AUTHORING_STANDARD.md) の区分C（全件再計算・別観点での再読）を適用する。別の完了章の追跡監査は章ID明示の依頼時のみ。CI greenや講数到達だけで完成扱いしない。
- **今回の作業は設計改訂のみ**で、講義本文・章メタデータ・系列manifest・公開目次を作らない。PLANは **textbook/plans/** に置いたままにする。将来の実装着手時にはID・必要prerequisite・stable anchor・系列manifestを実在ファイルと照合し、PLAN状態遷移と参照更新を同じ作業単位で行う。
