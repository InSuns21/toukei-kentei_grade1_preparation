# DREAM THEATER 全体の読む順

[DREAM THEATER 本編](textbook/dream-theater.md)

このページは、DREAM THEATER を上から通読するときの標準的な学習順です。各科目名から、その科目の目次へ直接移動できます。科目別に探したいときは [DREAM THEATER 本編](textbook/dream-theater.md) も使ってください。

原則として一つの科目はまとめて読みます。ただし、章数が多く一学期分を大きく超える系列や、他科目との前後関係を自然に保つために必要な系列だけ、内容上の切れ目で I / II に分けています。章単位で細かく行き来する読順にはしません。

## 共通基礎

1. [**集合論**](textbook/dream-theater.md#dt-subject-set-theory)：集合・写像・関係・可算性・濃度・順序・選択公理・Zorn の補題まで、後続科目の集合論的な言語を整える。
2. [**線形代数**](textbook/dream-theater.md#dt-subject-linear-algebra)：線形空間、線形写像、内積、固有値、スペクトル、SVD、テンソル積・外積代数までを扱う。
3. [**実解析**](textbook/dream-theater.md#dt-subject-real-analysis)：実数の上限性質から数列・級数、極限、微分、Riemann 積分、多変数解析までを、一般位相空間を前提にせず具体的に組み立てる。
4. [**位相空間論**](textbook/dream-theater.md#dt-subject-topology)：実解析で学んだ収束・連続性・コンパクト性・Cauchy 条件・完備性を、距離空間・位相空間へ一般化する。

> **RA8 は位相空間論後の実解析発展です。** RA5 までの一様収束に加えて TOP5 の一般コンパクト性を使うため、共通基礎の実解析本体には置かず、位相空間論を終えた後に [RA8 関数族のコンパクト性・近似](textbook/volumes/00_foundations/RA8/index.md) へ戻ります。順序数・超限再帰・Hartogs 補題を使う選択公理の完全同値証明は、共通基礎ではなく独立した [**集合論・数学基礎論**](textbook/dream-theater.md#dt-subject-axiomatic-set-theory) の発展分岐で扱います。

## 共通基礎からの発展分岐

[**集合論・数学基礎論**](textbook/dream-theater.md#dt-subject-axiomatic-set-theory) は、共通基礎の集合論を終えた後に必要に応じて進む独立系列です。

```text
SET1 ZF / ZFC
  ↓
SET2 順序型・順序数
  ↓
SET3 超限帰納法
  ↓
SET4 超限再帰 ─────→ SET5 累積階層・rank
  │
  └→ SET6 基数
        ↓
      SET7 Hartogs の補題
        ↓
F0-00A3A 選択公理・整列可能定理・Zorn の同値性
        ↓
SET9 弱い選択原理・超フィルター
        ↓
SET10 数学各分野での選択原理
```

この系列は、解析・線形代数・確率・幾何の標準通読に対する必須 prerequisite ではありません。ZF の公理使用箇所、順序数による超限構成、選択公理の同値形、弱い選択原理、既存数学での選択原理の使われ方を体系的に追いたい場合に読みます。

## 解析・幾何の主幹

5. [**複素解析 I（CA1--CA7）**](textbook/dream-theater.md#dt-subject-complex-analysis-i)：複素微分、Cauchy 理論、留数、解析接続、調和関数、正規族、Riemann 写像定理までを扱う。
6. [**測度論**](textbook/dream-theater.md#dt-subject-measure-theory)：Lebesgue 積分、収束定理、積測度、Radon--Nikodym 理論、$L^p$ 空間までを扱う。

> **測度論の初回は、すべての証明を完走しなくても構いません。** 後続科目へ進むための一巡目では、測度・可測性・Lebesgue 積分・ほとんど至る所での性質・$L^p$ の定義と、単調収束定理・Fatou の補題・優収束定理・Tonelli--Fubini の定理・Radon--Nikodym の定理・$L^p$ の完備性や稠密性について、まず**主張と適用条件を確認して正しく使えること**を優先します。証明の仕組み自体が必要になった地点で該当章へ戻って補う読み方でも大丈夫です。測度論そのものを体系的に修了したい場合は、科目目次を上から通読してください。

7. [**確率論**](textbook/dream-theater.md#dt-subject-probability)：測度論を基礎に、条件付き期待値、収束、極限定理、統計理論への接続までを扱う。
8. [**関数解析 I**](textbook/dream-theater.md#dt-subject-functional-analysis)：Banach・Hilbert 空間、双対、随伴、Hahn–Banach、Baire のカテゴリー定理と Banach 空間の基本定理を扱う。
9. [**関数解析 II**](textbook/dream-theater.md#dt-subject-functional-analysis-ii)：弱位相・弱*位相、Banach–Alaoglu、スペクトル・レゾルベント、コンパクト作用素、Fredholm 理論を扱う。
10. [**常微分方程式 I（ODE1--ODE7）**](textbook/dream-theater.md#dt-subject-ode-i)：一階方程式、線形方程式、連立系、非線形系、Laplace 変換、級数解、Sturm--Liouville 理論までを扱う。
11. [**ベクトル解析 I（VC1--VC7）**](textbook/dream-theater.md#dt-subject-vector-calculus-i)：勾配・発散・回転、線積分・面積分、Green・Gauss--Ostrogradsky・Kelvin--Stokes の定理、曲線座標とテンソル記法までを扱う。
12. [**常微分方程式 II（ODE8--ODE11）**](textbook/dream-theater.md#dt-subject-ode-ii)：最大解、連続依存、Lyapunov 理論、平面力学系、周期軌道、分岐までを扱う。
13. [**Fourier 解析**](textbook/dream-theater.md#dt-subject-fourier-analysis)：Fourier 級数・Fourier 変換、Plancherel 理論、確率分布との接続、離散 Fourier 変換、サンプリングまでを一続きで扱う。
14. [**時系列解析（大学院レベル）**](textbook/dream-theater.md#dt-subject-time-series)：確率論・関数解析・Fourier 解析を土台に、定常過程、Hilbert 空間による線形予測、Wold 分解、スペクトル表現、ARMA、エルゴード性、状態空間モデル、Kalman フィルタまでを扱う。
15. [**複素解析 II（CA8--CA12）**](textbook/dream-theater.md#dt-subject-complex-analysis-ii)：Riemann 面、楕円関数、無限積、Gamma 関数、Riemann ζ 関数と theta 変換までを扱う。
16. [**偏微分方程式 I**](textbook/dream-theater.md#dt-subject-pde-i)：特性曲線、熱・波動・Laplace / Poisson 方程式、Green 関数、固有関数展開、Hamilton--Jacobi 方程式までを扱う。
17. [**ベクトル解析 II（VC8--VC9）**](textbook/dream-theater.md#dt-subject-vector-calculus-ii)：Newton ポテンシャル、Helmholtz 分解、流体、Maxwell 方程式までを扱う。
18. [**微分幾何 I（GEO1--GEO9）**](textbook/dream-theater.md#dt-subject-differential-geometry-i)：滑らかな多様体、接空間、部分多様体、ベクトル場、微分形式、一般 Stokes の定理、de Rham コホモロジー入門までを扱う。
19. [**微分幾何 II（GEO10--GEO19）**](textbook/dream-theater.md#dt-subject-differential-geometry-ii)：曲線・超曲面、Riemann 計量、接続、測地線、曲率、比較幾何、Gauss--Bonnet の定理までを扱う。
20. [**偏微分方程式 II**](textbook/dream-theater.md#dt-subject-pde-ii)：超関数、Sobolev 空間、弱解、変分法、楕円型正則性、Galerkin 法までを扱う。
21. [**確率解析**](textbook/dream-theater.md#dt-subject-stochastic-analysis)：マルチンゲール、Brown 運動と Wiener 測度、Itô 積分、SDE、生成作用素、Lévy 過程までを扱う。

### 抽象発展方程式・半群論への発展分岐

[**抽象発展方程式・半群論**](textbook/dream-theater.md#dt-subject-evolution-equations) は、関数解析 II の後で時間発展 PDE を作用素論から読み直す発展系列です。共通の標準通読順には挿入しません。

~~~text
FA2 閉グラフ・グラフノルム ─┐
FA5 スペクトル・レゾルベント ─┴→ EVOL1 非有界作用素・閉作用素・可閉作用素 → EVOL2 C0 半群・生成作用素・Hille--Yosida → EVOL3 散逸作用素・Lumer--Phillips → EVOL4 抽象 Cauchy 問題・mild 解・Duhamel 公式 → EVOL5 analytic semigroup・sectorial operator・放物型 smoothing → EVOL6 半線形発展方程式・局所解・continuation criterion
~~~

### 量子力学基礎・作用素環論への発展分岐

[**量子力学基礎 I**](textbook/dream-theater.md#dt-subject-quantum-foundations-i) は、関数解析 II の後で、量子実験に現れる重ね合わせ・位相・離散的測定を複素 Hilbert 空間形式へ接続する発展系列です。[**量子力学基礎 II**](textbook/dream-theater.md#dt-subject-quantum-foundations-ii) では、EVOL1 の非有界作用素一般論と FOU4 の $L^2$ Fourier 変換を使って、位置・運動量などの非有界観測量へ進みます。一般の解析主幹には強制せず、量子力学と作用素環論へ進む読者の分岐として置きます。

~~~text
LA5 複素内積 ───────────┐
FA7 コンパクト自己共役作用素 ─┴→ QM1 実験事実から Hilbert 空間形式へ → QM2 状態・観測量・Born 則 → QM3 射影・PVM・スペクトル定理 → QM4 非可換観測量と不確定性関係
                                                                                                                                       │
EVOL1 非有界・閉・可閉作用素 ────────────────────────────────────────────────────────────────────────────────────────────────┤
FOU4 L2 Fourier 変換 ────────────────────────────────────────────────────────────────────────────────────────────────────┴→ QM5 非有界作用素と自己共役性 → QM6 非有界自己共役作用素のスペクトル定理 → QM7 Stone の定理と Schrödinger 発展
~~~

### 非線形偏微分方程式への発展分岐

[**非線形偏微分方程式**](textbook/dream-theater.md#dt-subject-nonlinear-pde) は、偏微分方程式 I・II を土台に、保存則・非線形楕円型／放物型方程式へ進む発展系列です。共通の標準通読順には挿入しません。

~~~text
PDE1 Burgers・特性線交差 ─┐
GPDE1 テスト関数・超関数 ─┴→ NPDE1 保存則・衝撃波・Rankine--Hugoniot 条件
GPDE2 平滑化核・局所 L1 近似 ───────┴→ NPDE2 entropy solution・選択原理・L1 収縮性
GPDE6 変分形式 ─┐
FA4 反射性 ─────┤
FIX1 Brouwer ───┼→ NPDE3 非線形変分法・単調作用素・p-Laplacian
OPT3 強圧性 ────┘
PDE3 熱方程式・熱核 ──────┐
GPDE5 Sobolev 埋め込み ───┴→ NPDE4 尺度変換・熱核平滑化・自己相似 ─┬→ NPDE5 多孔質媒質方程式・有限伝播速度 → NPDE7 長時間漸近・普遍 profile・rescaled convergence
PDE8 Duhamel 原理・非斉次問題 ────────────────────────────────────┤
GPDE10 強連続半群・mild 解 ───────────────────────────────────────┴→ NPDE6 半線形熱方程式・臨界性・有限時間 blow-up
~~~

### 最適制御・HJB・微分ゲームへの発展分岐

[**最適制御・HJB・微分ゲーム**](textbook/dream-theater.md#dt-subject-optimal-control-hjb) は、PDE12 の Hamilton--Jacobi 方程式から動的計画法と HJB へ進む PDE 発展系列です。

~~~text
PDE12 Hamilton--Jacobi・特性曲線 → HJC1 決定論的最適制御・DPP・HJB → HJC2 粘性解・comparison・一意性 → HJC3 value function の粘性解特徴付け → HJC4 決定論的微分ゲーム・HJI / HJC5 確率制御・二階HJB → HJC6 確率微分ゲーム・二階Isaacs
~~~

### Navier--Stokes 方程式への発展分岐

[**Navier--Stokes 方程式への道**](textbook/dream-theater.md#dt-subject-navier-stokes) は、ベクトル解析 II・Fourier 解析・偏微分方程式 II を土台に、非圧縮 Navier--Stokes 方程式の解析へ進む発展系列です。共通の標準通読順には挿入しません。

~~~text
VC9 非圧縮 Navier--Stokes の導出 ─┐
FOU4 L2 Fourier / Plancherel ──────┼→ NS1 発散零空間・Leray 射影・Stokes 作用素 ─┐
GPDE3 Sobolev 空間 ────────────────┘                                              ├→ NS2 非線形項・三重線形形式・エネルギー評価 ─┐
GPDE5 Sobolev 埋め込み・コンパクト性 ─────────────────────────────────────────────┘                                               ├→ NS3 Leray--Hopf 弱解と大域存在 → NS4 二次元渦度・大域制御 → NS5 三次元局所強解・発散判定 → NS6 尺度変換・臨界性 → NS7 正則性判定・渦伸長 → NS8 CMI 公式問題 A/B/C/D → NS8A 2026年有限時間特異点構成・検証状況
GPDE10 Galerkin・時間発展弱解 ────────────────────────────────────────────────────────────────────────────────────────────────┘
~~~

### 超準解析への発展分岐

[**超準解析**](textbook/dream-theater.md#dt-subject-nonstandard-analysis) は、実解析と集合論・数学基礎論を接続する発展系列です。共通の標準通読順には挿入しません。

```text
SET-U1 同値関係・商集合 ─┐
SET9 自由超フィルター ───┼→ NSA1 超実数の超冪構成 → NSA2 最小一階論理 → NSA3 Łoś の定理・移送原理 → NSA4 内部・外部／超有限 → NSA5 標準部 → NSA6 極限・連続・コンパクト性 → NSA7 微分・Taylor → NSA8 Riemann 積分・超有限和 → NSA9 級数・関数列・一様収束
F0-00A1B Archimedes 性 ──┘
```

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
