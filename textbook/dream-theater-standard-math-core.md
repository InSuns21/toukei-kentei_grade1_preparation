# DREAM THEATER 全体の読む順

[DREAM THEATER 本編](textbook/dream-theater.md)

このページは、DREAM THEATER を上から通読するときの標準的な学習順です。各科目名から、その科目の目次へ直接移動できます。科目別に探したいときは [DREAM THEATER 本編](textbook/dream-theater.md) も使ってください。

原則として一つの科目はまとめて読みます。ただし、章数が多く一学期分を大きく超える系列や、他科目との前後関係を自然に保つために必要な系列だけ、内容上の切れ目で I / II に分けています。章単位で細かく行き来する読順にはしません。

## 共通基礎

1. [**集合論**](textbook/dream-theater.md#dt-subject-set-theory)：集合・写像・関係・可算性・濃度・順序・選択公理・Zorn の補題まで、後続科目の集合論的な言語を整える。
2. [**線形代数**](textbook/dream-theater.md#dt-subject-linear-algebra)：線形空間、線形写像、内積、固有値、スペクトル、SVD、テンソル積・外積代数までを扱う。
3. [**実解析**](textbook/dream-theater.md#dt-subject-real-analysis)：実数の上限性質から数列・級数、極限、微分、Riemann 積分、多変数解析までを、一般位相空間を前提にせず具体的に組み立てる。
4. [**位相空間論**](textbook/dream-theater.md#dt-subject-topology)：実解析で学んだ収束・連続性・コンパクト性・Cauchy 条件・完備性を、距離空間・位相空間へ一般化する。

> **RA8 は位相空間論後の実解析発展です。** RA5 までの一様収束に加えて TOP5 の一般コンパクト性を使うため、共通基礎の実解析本体には置かず、位相空間論を終えた後に [RA8 関数族のコンパクト性・近似](textbook/volumes/00_foundations/RA8/index.md) へ戻ります。順序数・超限再帰・Hartogs 補題を使う選択公理の完全同値証明は、共通基礎ではなく独立「集合論・数学基礎論」の発展分岐で扱います。

## 解析・幾何の主幹

5. [**複素解析 I（CA1--CA7）**](textbook/dream-theater.md#dt-subject-complex-analysis-i)：複素微分、Cauchy 理論、留数、解析接続、調和関数、正規族、Riemann 写像定理までを扱う。
6. [**測度論**](textbook/dream-theater.md#dt-subject-measure-theory)：Lebesgue 積分、収束定理、積測度、Radon--Nikodym 理論、$L^p$ 空間までを扱う。

> **測度論の初回は、すべての証明を完走しなくても構いません。** 後続科目へ進むための一巡目では、測度・可測性・Lebesgue 積分・ほとんど至る所での性質・$L^p$ の定義と、単調収束定理・Fatou の補題・優収束定理・Tonelli--Fubini の定理・Radon--Nikodym の定理・$L^p$ の完備性や稠密性について、まず**主張と適用条件を確認して正しく使えること**を優先します。証明の仕組み自体が必要になった地点で該当章へ戻って補う読み方でも大丈夫です。測度論そのものを体系的に修了したい場合は、科目目次を上から通読してください。

7. [**確率論**](textbook/dream-theater.md#dt-subject-probability)：測度論を基礎に、条件付き期待値、収束、極限定理、統計理論への接続までを扱う。
8. [**関数解析**](textbook/dream-theater.md#dt-subject-functional-analysis)：Banach・Hilbert 空間、双対、弱位相、作用素とスペクトルを扱う。
9. [**常微分方程式 I（ODE1--ODE7）**](textbook/dream-theater.md#dt-subject-ode-i)：一階方程式、線形方程式、連立系、非線形系、Laplace 変換、級数解、Sturm--Liouville 理論までを扱う。
10. [**ベクトル解析 I（VC1--VC7）**](textbook/dream-theater.md#dt-subject-vector-calculus-i)：勾配・発散・回転、線積分・面積分、Green・Gauss--Ostrogradsky・Kelvin--Stokes の定理、曲線座標とテンソル記法までを扱う。
11. [**常微分方程式 II（ODE8--ODE11）**](textbook/dream-theater.md#dt-subject-ode-ii)：最大解、連続依存、Lyapunov 理論、平面力学系、周期軌道、分岐までを扱う。
12. [**Fourier 解析**](textbook/dream-theater.md#dt-subject-fourier-analysis)：Fourier 級数・Fourier 変換、Plancherel 理論、確率分布との接続、離散 Fourier 変換、サンプリングまでを一続きで扱う。
13. [**時系列解析（大学院レベル）**](textbook/dream-theater.md#dt-subject-time-series)：確率論・関数解析・Fourier 解析を土台に、定常過程、Hilbert 空間による線形予測、Wold 分解、スペクトル表現、ARMA、エルゴード性、状態空間モデル、Kalman フィルタまでを扱う。
14. [**複素解析 II（CA8--CA12）**](textbook/dream-theater.md#dt-subject-complex-analysis-ii)：Riemann 面、楕円関数、無限積、Gamma 関数、Riemann ζ 関数と theta 変換までを扱う。
15. [**偏微分方程式 I**](textbook/dream-theater.md#dt-subject-pde-i)：特性曲線、熱・波動・Laplace / Poisson 方程式、Green 関数、固有関数展開、Hamilton--Jacobi 方程式までを扱う。
16. [**ベクトル解析 II（VC8--VC9）**](textbook/dream-theater.md#dt-subject-vector-calculus-ii)：Newton ポテンシャル、Helmholtz 分解、流体、Maxwell 方程式までを扱う。
17. [**微分幾何 I（GEO1--GEO9）**](textbook/dream-theater.md#dt-subject-differential-geometry-i)：滑らかな多様体、接空間、部分多様体、ベクトル場、微分形式、一般 Stokes の定理、de Rham コホモロジー入門までを扱う。
18. [**微分幾何 II（GEO10--GEO19）**](textbook/dream-theater.md#dt-subject-differential-geometry-ii)：曲線・超曲面、Riemann 計量、接続、測地線、曲率、比較幾何、Gauss--Bonnet の定理までを扱う。
19. [**偏微分方程式 II**](textbook/dream-theater.md#dt-subject-pde-ii)：超関数、Sobolev 空間、弱解、変分法、楕円型正則性、Galerkin 法までを扱う。
20. [**確率解析**](textbook/dream-theater.md#dt-subject-stochastic-analysis)：マルチンゲール、Brown 運動と Wiener 測度、Itô 積分、SDE、生成作用素、Lévy 過程までを扱う。

## 代数系

21. [**抽象代数**](textbook/dream-theater.md#dt-subject-abstract-algebra)：群・環・加群を学び、一般の体上の線形代数を橋として体拡大・有限 Galois 理論まで扱う。
22. [**Lie 理論**](textbook/dream-theater.md#dt-subject-lie-theory)：Lie 群・Lie 環、指数写像、古典群、群作用、等質空間を扱う。

## 計算・最適化系

23. [**凸解析・最適化**](textbook/dream-theater.md#dt-subject-convex-optimization)：凸性、双対性、KKT 条件、線形・二次・錐最適化を扱う。
24. [**不動点理論**](textbook/dream-theater.md#dt-subject-fixed-point)：Brouwer・Kakutani の不動点定理、集合値写像、Berge 最大値定理を扱う。
25. [**RKHS・カーネル法**](textbook/dream-theater.md#dt-subject-rkhs)：再生核 Hilbert 空間、表現定理、カーネル回帰、SVM を扱う。
26. [**数値解析**](textbook/dream-theater.md#dt-subject-numerical-analysis)：誤差解析、非線形方程式、数値積分、ODE 数値解法、数値線形代数、数値最適化を扱う。
27. [**差分法**](textbook/dream-theater.md#dt-subject-fdm)：偏微分方程式の差分近似、安定性、収束性、風上化を扱う。
28. [**有限要素法**](textbook/dream-theater.md#dt-subject-fem)：変分形式、Galerkin 法、有限要素近似、誤差解析を扱う。
29. [**Monte Carlo 法**](textbook/dream-theater.md#dt-subject-monte-carlo)：乱数、統計的誤差、分散減少、多段階 Monte Carlo を扱う。
30. [**準 Monte Carlo 法**](textbook/dream-theater.md#dt-subject-qmc)：低 discrepancy 点列、格子則、デジタルネット、RKHS による誤差評価、高次法を扱う。
31. [**離散最適化**](textbook/dream-theater.md#dt-subject-discrete-optimization)：整数計画、ネットワーク最適化、マッチング、整数多面体を扱う。

## 応用系

32. [**ミクロ経済学**](textbook/dream-theater.md#dt-subject-microeconomics)：消費者・生産者理論、厚生定理、一般均衡、顕示選好、Afriat の定理、期待効用、リスク回避、確率優越、異時点間選択、時間整合性を扱う。
33. [**ゲーム理論**](textbook/dream-theater.md#dt-subject-game-theory)：非協力ゲーム、情報不完備ゲーム、協力ゲーム、交渉を扱う。

## 科目を分ける境界

Fourier 解析は途中で測度論や確率論へ寄り道せず、必要な前提を先に終えてから **FOU1--FOU5 をまとめて**読みます。複素解析は CA12 の theta 変換・Riemann ζ 関数で Fourier 解析を使うため、**CA1--CA7** と **CA8--CA12** の二つに分けます。

常微分方程式は、ODE10 の Bendixson--Dulac の判定で Green の定理を使うため、基礎的な ODE1--ODE7 と力学系中心の ODE8--ODE11 を分けます。ベクトル解析も、VC8 の Newton ポテンシャル・Helmholtz 分解が偏微分方程式の基本解と深く結び付くため、古典的な積分定理までの VC1--VC7 と応用的な VC8--VC9 を分けます。

微分幾何は章数が多いため、GEO1--GEO9 で多様体・微分形式・一般 Stokes の定理までを一つのまとまりとし、GEO10--GEO19 で曲面論・Riemann 幾何・大域幾何へ進みます。
