# 依存関係

通常カリキュラムの機械可読な正本は `curriculum.yaml` の各章の `prerequisites` です。

```text
F0-00（数学速習）
  -> P1 -> P2 -> P3 -> P4 -> S1
  -> I1 -> I2 -> I3 -> I4
  -> L1 -> L2
  -> E1 / E2 / E3 / E4
```

F0-01は通常教材章として廃止済み。`status: supplementary` の補講は通常カリキュラムの進捗集計へ含めない。補講の局所的な機械可読前提は各 `chapter.yaml` の `prerequisites` を正本とする。

---

## 発展補講：関数解析・RKHS標準通読

```text
F0-00
  ↓
A → A1 → A1B → A1C → B0 → B → B1
                 │
                 └→ A1D → A2 → A3 → A3A  （順序・選択公理・Zornの任意深掘り）
  ↓
C → C1 → C2 → D
  ↓
D0 Cauchy完備化
  ↓
D0A 一般距離空間の完備化
  ↓
D0B Dedekind切断
  ↓
D0C Cauchy構成とDedekind構成の同値
  ↓
E → F → E1 → E2 → F1 → F2
  ↓
D1 → D2 → D2A → D2B → D2C → D2D → D2E
  ↓
G
  ↓
F0-02 → 02A → 02B → 02B1
  ↓
F0-02C1 → C1A → C2
  ↓
C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A
```

位相・コンパクト性へ進む局所的な前提列は

```text
A1 → A1B → A1C → B0 → B → B1 → C → C1
```

とする。A1Bで実数の上限性質・Archimedes性、A1Cでべき集合・集合族・添字集合・添字付き集合族・任意和/任意交差、B0で点列・部分列・「十分大きい添字」、Bで距離空間、B1で位相空間・近傍・部分空間位相・位相的収束・位相的連続性を導入する。A1D・A2・A3・A3Aは順序・整列・選択公理・Zornの補題を追う集合論側の深掘りであり、この局所列の必須前提にはしない。

実数の構成を追う局所列は

```text
D → D0 → D0A → D0B → D0C
```

とする。D0で有理Cauchy列の商から $\mathbb R_C$、D0Aで任意の距離空間の完備化、D0BでDedekind切断から $\mathbb R_D$、D0Cで $\mathbb R_C\cong\mathbb R_D$ を構成する。局所的な必須前提は各 `chapter.yaml` を正本とし、D0Bは上限性質との接続のためA1Bも参照する。

標準通読は細かく刻む一方、局所的な必須前提は各 `chapter.yaml` を正本とする。EはBを前提とし、D1はD+C2+Eを前提とするため、線形代数を測度論より前へ置く。例としてHahn--Banach本体C6はA3+C2から、RKHS本体C7はC2から読める。02AはFarkasの証明を02Bへ参照するが、02Bは02Aを必須前提としないため循環しない。C2のRiesz標準証明はC1AのHilbert射影定理を使用する。

---

## 完全基礎論（DREAM THEATER）

Lebesgue測度そのものの建設まで追う場合はD2の直後に次を読む。π--λ定理 D3A は、生成 σ 代数へ性質を拡張する独立した道具として P4 からも参照する。

```text
F0-00D2
  ↓
F0-00D3 外測度・Caratheodory可測性
  ├────────────→ F0-00D4 Lebesgue測度・Borel集合・拡張定理
  └→ F0-00D3A π--λ定理・Dynkin族 ─→ F0-00D4
                                      ↓
                         F0-00D5 Vitali集合・非可測集合・選択公理
  ↓
F0-00D2Aへ復帰
```

D4 は拡張の一意性証明で D3A の π--λ 定理を使うため、局所前提を D3 と D3A の両方とする。D4〜D5は関数解析・RKHSにも確率論補講にも必須前提としない。一方、P4で Kolmogorov の 0--1 則を証明するときも D3A の π--λ定理を局所前提として使う。D3A 自身の前提はその knowledge / dependency metadata を正本とする。

---

## 確率論「それどこから来た？」

```text
F0-00D2
  ↓
P1 確率空間・確率変数・分布
  ↓
P2 RN密度・pmf/pdf → P2A 期待値・LOTUS
  ↓
P3 独立・積測度 → P3A 条件付き期待値 → P3B L2射影・最良予測
  ↓
P4 limsup/liminf・末尾事象・0--1則・Borel--Cantelli → P4A UI・Vitali
  ↑
D3A π--λ定理（P4の独立性拡張で使用）
  ↓
P5 有限分散SLLN → P5A 一般iid SLLN
  │
  └────────────→ P6 特性関数・Lévy → P6A iid CLT
                                      ↓
P7 正則model・score・Fisher → P7A MLE漸近論
                         └──→ P7B QMD・LAN
```

標準通読と必須前提は分離する。P4は末尾事象の0--1則を本文で閉じるため D3A を局所前提に持つ。P6/P6AはSLLNを証明に使わず、P5Aはheavy-tailまでSLLNを証明したい読者向け。P3BはHilbert予測への橋、P7BはP7Aを経由せずQMD/LANへ入れる。

---

## Encore II：Fourier Analysis & Differential Equations

```text
F0-00F1 / F0-00D2 / F0-00E2 / F0-02C1
  ↓
F0-00H1 ODE・線形系・行列指数
  ↓
F0-00FA1 Fourier級数
  ↓
F0-00FA2 Fourier変換・畳み込み・反転
  ↓
F0-00FA3 Plancherel・L2 Fourier・特性関数
  ↓
F0-00PDE1 熱方程式・Gaussian heat kernel
  ↓
F0-00PDE2 波動・Laplace・変数分離
  ↓
F0-00PDE3 Sturm--Liouville・スペクトル展開
```

Fourier級数をHilbert空間の直交展開として導入し、Fourier変換・微分作用素から古典PDEへ進む。読者向け入口は `F0_00R2_EncoreII_Fourier解析_微分方程式/index.md`。

---

## Encore III：Graduate PDE — Distributions, Sobolev Spaces & Weak Solutions

現行主線は GPDE1--GPDE10 とする。再編前の F0-00DS1、F0-00DS2、F0-00SOB1、F0-00SOB2、F0-00WK1、F0-00WK2、F0-00WK3 は archive / migration source であり、現行主線の prerequisite / concept owner / proof dependency にしない。

~~~text
PDE7 / F0-00D2 / F0-02C1 / F0-02C2
  ↓
GPDE1 テスト関数・distribution
  ↓
GPDE2 distribution微分・mollifier・弱微分
  ↓
GPDE3 Sobolev空間
  ↓
GPDE4 H_0^1・Poincare・trace
  ↓
GPDE5 Sobolev embedding・compactness
  ↓
GPDE6 弱形式・変分形式
  ↓
GPDE7 Lax--Milgram
  ↓
GPDE8 二階線形楕円型PDE
  ↓
GPDE9 楕円型正則性
  ↓
GPDE10 Galerkin・時間発展PDEの弱解
~~~

補助依存として、GPDE5 の weak convergence は FA3 を canonical reference とする。GPDE6 は Encore II の PDE5（Laplace / Poisson）を古典側の接続元とし、GPDE10 は PDE3 / PDE4（熱・波動）を弱解の立場から再訪する。

読者向け入口は `F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md`。未完成 GPDE 章は reader-facing index に先行登録しない。
---

## Encore IV：Stochastic Analysis & Time Series

現行主線は STO1--STO14 と TSA1--TSA6 とする。再編前の F0-00SP1--F0-00SP5、F0-00TS1、F0-00TS2、F0-00TS2A、F0-00TS3 は archive / migration source であり、現行主線の prerequisite / concept owner / proof dependency にしない。

~~~text
F0-00P1 + F0-00P3C
  ↓
STO1 確率過程・filtration・stopping time
  ↓
STO2 離散時間 martingale・不等式・収束
  ↓
STO3 Kolmogorov extension・continuity
  ↓
STO4 Brown 運動・hitting time・strong Markov
  ↓
STO5 local martingale・quadratic variation・semimartingale
  ↓
STO6 stochastic integral
  ↓
STO7 multidimensional Ito calculus・Stratonovich
  ↓
STO8 local time・Tanaka

STO7 → STO9 SDE → STO10 Girsanov
                 ├→ STO11 Markov・generator・martingale problem
                 └→ STO12 Brownian martingale representation

STO2 → STO13 Poisson・CTMC・random measure → STO14 Levy・jump calculus

F0-00P3B + Hilbert / Fourier
  ↓
TSA1 定常過程・Hilbert予測
  ↓
TSA2 Wold
  ↓
TSA3 Herglotz・spectral representation
  ↓
TSA4 linear filter・ARMA / ARIMA
  ↓
TSA5 ergodicity・mixing・dependent limit

TSA1 + linear Gaussian theory
  ↓
TSA6 state-space・Kalman filter
~~~

STO1 の direct prerequisite は F0-00P1 と F0-00P3C、STO2 は STO1・F0-00P3C・F0-00P4A とする。後続章でも証明に実際に必要な直接依存だけを各 chapter.yaml に置く。読者向け入口は `F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md`。未完成 STO / TSA 章は reader-facing index に先行登録しない。
---

## Encore V：Numerical Analysis, FEM & Monte Carlo

通常教材およびEncore II〜IVの必須前提にはしない。数値計算へ進む任意の発展路線であり、FEM branchとMonte Carlo/SDE branchは途中まで独立に読める。

### 共通数値基礎

```text
F0-00F2
  ↓
F0-00NA1 浮動小数点・誤差・条件数・安定性
  ↓
F0-00NA2 数値線形代数・疎行列・CG・前処理
  ↓
F0-00NA3 補間・数値微分・数値積分
  ↓
F0-00NA4 ODE数値解法・Runge--Kutta・安定性
```

NA1ではconditioningとalgorithmic stabilityを分離し、NA2ではFEMで現れる疎SPD線形系をCG・前処理まで扱う。NA3では補間・差分・quadratureを導入し、Gaussian quadratureをFEM要素積分へ接続する。NA4ではconsistency・stability・convergence、stiffness、method of linesを扱う。

### FEM branch

```text
Encore III WK3 + NA2 + NA3
  ↓
F0-00FEM1 mesh・nodal basis・element matrix・assembly・Poisson FEM
```

FEM1では弱形式を有限次元化し、局所要素行列からglobal sparse systemを構成する。Ceaの補題から一次要素の典型的 $H^1$ 誤差評価へ進み、solver errorとdiscretization errorを分離する。

### Monte Carlo / SDE branch

```text
F0-00P5 / P6A
  ↓
F0-00MC1 Monte Carlo積分・LLN/CLT・標準誤差
  ↓
F0-00MC2 variance reduction・importance sampling・control variate

STO9 + MC1 + NA4
  ↓
F0-00SDE1 Euler--Maruyama・strong/weak convergence
```

MC1ではMonte Carloを標本平均として導き $N^{-1/2}$ 誤差をCLTで評価する。MC2ではcontrol variate、stratification、importance sampling、common random numbersを扱う。SDE1ではBrown増分を離散化し、path誤差のstrong convergenceと期待値誤差のweak convergenceを区別する。

### 合流：UQとMLMC

```text
F0-00FEM1 + F0-00MC1 + F0-00F
  ↓
F0-00UQ1 random field・Karhunen--Loeve・Monte Carlo FEM
  ↓
F0-00MLMC Multilevel Monte Carlo
          ↑
F0-00SDE1 + F0-00MC2
```

UQ1ではrandom coefficient PDEをsample-wise FEMで解き、random fieldを共分散作用素のKarhunen--Loeve展開へ接続する。総誤差をmodel/truncation・FEM bias・sampling・solverへ分解する。地下水流のrandom permeabilityを主要例とする。

MLMCでは

$$
E[Q_L]=E[Q_0]+\sum_{\ell=1}^LE[Q_\ell-Q_{\ell-1}]
$$

を用い、fine/coarseを同じrandom inputでcoupleする。levelごとのvariance $V_\ell$ とcost $C_\ell$ から $N_\ell\propto\sqrt{V_\ell/C_\ell}$ のsample allocationを導き、FEM mesh hierarchyとSDE time-step hierarchyの両方へ適用する。

読者向け入口は `F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md`。

---
