# DREAM THEATER 量子場の数学的構成 I・II（MQFC系列・講数可変）

設計: 2026-10-13  
状態: planned（数学的厳密化の**任意発展ルート**。本文・series manifest・公開は未着手）

## 中心問いと独立講義が必要な理由

自由場のモード展開やFeynman図は具体的な予測計算を与える。しかし、無限自由度の量子場は一般に時空点ごとの作用素ではなく**作用素値分布**であり、乗算・対角制限・cutoff除去・解析接続は自動的に成立しない。

「どのモデルで何が存在し、どの操作を定理として正当化できるか」を主題に、**(I) Euclid場／構成的QFT、(II) 局所摂動的くりこみ**の二つの方法を比較する連続数学PLANとする。通常の摂動計算コースQFT I〜IVからの独立**発展分岐**で、物理QFT I／QCURV／HOLOへ全科目を必修化しない。

## 数学前提・所有権・停止線

- 既存FA／QM（Hilbert空間・非有界作用素・CCR）、FOU／GPDE（Schwartz試験関数・超関数／Sobolev）、測度・確率、確率過程／SM、複素解析。QFT Iの自由場モデル／QFT IIの摂動展開は物理的動機として参照する。
- (I)にはEuclid楕円作用素と共分散核、Gaussian測度、無限次元分布空間の測度、Schwinger関数とOsterwalder–Schrader (OS)公理／再構成への入口。
- (II)には[MICA](DREAM_THEATER_MICROLOCAL_HADAMARD_PLAN.md)の波面集合・分布の積／引戻しを前提とする後半、[HPDE](DREAM_THEATER_LORENTZIAN_HYPERBOLIC_PDE_PLAN.md)の因果伝播、[AQFT](DREAM_THEATER_ALGEBRAIC_QFT_MODULAR_PLAN.md)の局所環とは相互接続する。ただし**既存MICAの点分離やHadamardくりこみと、相互作用の時間順序積を対角へ延長するくりこみは別問題**。
- MQFCが所有するのはEuclid側の測度・反射陽性・再構成と、平坦模型から始める**分布の対角延長／Epstein–Glaser型摂動くりこみ**。AQFTは局所環net・GNS・モジュラー理論、MICAは波面集合／Hadamard条件、QFT IIは正則化・反項を用いる実際の物理的計算が主担当。
- 共形ネット・vertex operator algebraの分類一般論や4次元非可換Yang–Millsの非摂動的存在／質量ギャップを、完成証明として扱わない。

## 数学的量子場 I：Euclid場と構成的な定義（候補テーマ）

1. Schwartz空間S／温度分布S'、場のsmearing、連続線形汎関数・核・正値性。
2. 作用素値分布と共通の稠密定義域、真空期待値が分布になる条件。
3. Wightman関数の共変性・スペクトル条件・局所性・正定値性：主張の対象と公理の区別。
4. Euclid自由場の共分散C=(−Δ+m²)⁻¹、分布としての核と正定値性。
5. 有限次元Gaussian積分から有限格子／cutoff場の確率測度へ、特性汎関数。
6. Minlos型構成・無限次元測度の必要条件（一般定理は適用条件を明記）。
7. Wick積と共分散、分布の積が未定義になりうる理由、free normal ordering。
8. Schwinger関数のEuclid対称性・対称性・クラスタ性・反射陽性（OS）を小模型で確認。
9. OS再構成の入口：正半定値の内積→零空間商→Hilbert空間→時間並進半群。
10. 格子・有限体積・UV cutoffと順序の問題、連続極限のtightness／相関の収束条件。
11. 低次元の相互作用模型（P(φ)₂等）の有限cutoff構成と、cutoff除去の代表定理の正確な仮定／証明境界。
12. Wightman側との往復、形式的Wick回転と公理からの再構成が異なることの総演習。

**Iの検証ゲート:** Gaussian covarianceの正値性、対称化した試験関数の反射陽性を自由模型で直接検算する。OSの正半定値形式からHilbert空間の商構成まで再導出する。「すべての相互作用QFTで連続極限が存在する」と主張しない。

## 数学的量子場 II：分布の対角延長と局所摂動論（候補テーマ）

1. 時間順序積を時空点が異なる配置空間で構成し、衝突対角が難所となることを調べる。
2. scaling degree／superficial degreeの数学的定義と簡単な分布のスケーリング計算。
3. 原点を除いて定義された分布の延長問題、局所反項の自由度（δとその導関数）。
4. 具体例：低次元模型のsingular kernelの延長とくりこみ条件。
5. 作用汎関数の微分と局所汎関数、自由場のstar積・Peierls bracketのモデル。
6. 因果分割・causal factorizationとEpstein–Glaserの帰納構成の基本模型。
7. Bogoliubov公式と局所相互作用の形式冪級数、形式的構成と収束の区別。
8. BPHZ／運動量空間の減算との比較、Ward恒等式と反項選択の制約。
9. Stückelberg–Petermann型のくりこみ自由度とWilson流の意味の違い、QFT IIのβ関数へ接続。
10. gauge固定を含む理論でのghost／BRST複体とコホモロジーの必要部分（詳細なBV理論は追加の発展課題）。
11. anomalyを恒等式が量子補正で保てない障害として捉える模型（指数定理の一般証明とは分離）。
12. MICA・AQFT・QFT IIとの境界、共変性／局所性／状態依存を明確にして総演習。

**IIの検証ゲート:** 例示したsingular distributionのscaling degreeと許容される局所項の次数を導出する。cutoff計算での反項と対角延長での自由度の対応を具体式で示す。数理的に厳密なpAQFTの**形式摂動的構成**と、収束・非摂動的存在証明とを区別する。

## 分冊方針・完成条件

- IとIIは異なる手法を扱うが「何を量子場として数学的に構成・正当化できるか」という同一中心問いで連続する数学講義として本PLANに置く。必要なら実装時に二つの独立PLANへ分け、その場合は参照を同時移行する。
- 主要定理には対象、位相・関数空間、核の定義域、正値性・支持・microlocal条件、収束／形式冪級数の区別を記す。
- 最初の非自明な定義は通常文・直接例で導入し、代表定理は核心証明を閉じる。一般のOS再構成・構成的相互作用QFTの高度な完全証明を教材の説明粒度に合わせて段階化し、結果先行の場合は証明済範囲と別に管理する。
- 変更章のA4/B3/C1以上と全詳細解答・数理査読・読者粒度査読を行う。別完成章の追跡監査は明示依頼時のみ。設計だけをdoneにしない。

## 校正用文献

- James Glimm & Arthur Jaffe, [*Quantum Physics: A Functional Integral Point of View*](https://link.springer.com/book/10.1007/978-1-4612-4728-9)（Euclid場・構成的模型とその存在範囲）
- Konrad Osterwalder & Robert Schrader, *Axioms for Euclidean Green's Functions*（OS公理と再構成条件）
- Rudolf Haag, *Local Quantum Physics*（代数的定式化との比較。AQFTの正本を侵食しない）
- Klaus Fredenhagen & Katarzyna Rejzner, [*Perturbative algebraic quantum field theory*](https://arxiv.org/abs/1208.1428)（相互作用の局所摂動的構成）
- Romeo Brunetti & Klaus Fredenhagen, [*Microlocal Analysis and Interacting Quantum Field Theories*](https://arxiv.org/abs/math-ph/9903028)（超局所的条件と分布の延長）
- Romeo Brunetti, Michael Dütsch & Klaus Fredenhagen, [*Perturbative AQFT and the Renormalization Groups*](https://arxiv.org/abs/0901.2038)（くりこみの諸概念の区別）

これらは教材範囲と定理の適用条件の校正資料。本文・問題の転載はしない。
