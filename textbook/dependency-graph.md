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
F0-00A  集合・写像・sup/inf
  ↓
F0-00A2 選択公理・Zorn
  ↓
F0-00B  距離・開閉集合・収束
  ↓
F0-00C  連続・コンパクト
  ↓
F0-00D  Cauchy列・完備性
  ↓
F0-00D2 測度・Lebesgue積分・Lp
  ↓
F0-00E  基底・Gram--Schmidt・射影
  ↓
F0-00E2 Cauchy--Schwarz・Bessel・Parseval
  ↓
F0-00F  スペクトル定理・SVD
  ↓
F0-00G  凸解析の入口
  ↓
F0-02 -> F0-02A -> F0-02B
  ↓
F0-02C1 Banach / Hilbert
  ↓
C2 双対・Riesz -> C3 作用素・随伴 -> C4 凸解析
  ↓
C5 一般化KKT -> C6 Hahn--Banach -> C7 RKHS / kernel SVM
```

A2はC6のHahn--Banach標準証明で使うZornの補題を先に導入する。D2はC1で使う $L^2$・a.e.同値類・可測関数を未定義語にしないための橋である。標準通読ルートへ不要な深掘りを逆流させない。

---

## 完全基礎論（DREAM THEATER）

Lebesgue測度そのものの建設まで追う場合だけD2の直後に挿入する。

```text
F0-00D2
  ↓
F0-00D3 外測度・Caratheodory可測性
  ↓
F0-00D4 Lebesgue測度・Borel集合・拡張定理
  ↓
F0-00D5 Vitali集合・非可測集合・選択公理
  ↓
F0-00Eへ復帰
```

D3〜D5は関数解析・RKHSにも確率論補講にも必須前提としない。

---

## 確率論「それどこから来た？」

```text
F0-00D2
  ↓
F0-00P1 確率空間・確率変数・分布
  ↓
P2 Radon--Nikodym・密度・期待値
  ↓
P3 独立・積測度・条件付き期待値
  ↓
P4 収束・Borel--Cantelli・一様可積分性
  ↓
P5 強大数則
  ↓
P6 特性関数・Levy・CLT
  ↓
P7 統計モデル・尤度・正則性
```

確率変数を可測写像、分布を押し出し測度、pdfをRadon--Nikodym密度、期待値をLebesgue積分、条件付き期待値を部分sigma代数上のRadon--Nikodym構成へ戻す。有限分散版強大数則は最大不等式から証明し、CLTは特性関数で導く。

---

## Encore II：Fourier Analysis & Differential Equations

```text
F0-00F / F0-00D2 / F0-00E2 / F0-02C1
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

## Encore III：Distributions, Sobolev Spaces & Weak Solutions

```text
F0-00D2 / F0-02C1 / F0-02C2 / F0-00PDE3
  ↓
F0-00DS1 Schwartz超関数・Dirac delta
  ↓
F0-00DS2 超関数微分・弱微分
  ↓
F0-00SOB1 Sobolev W^{k,p}・H^k
  ↓
F0-00SOB2 H_0^1・Poincare・trace
  ↓
F0-00WK1 弱形式・Poisson
  ↓
F0-00WK2 Lax--Milgram
  ↓
F0-00WK3 楕円型PDE・Galerkin・FEMへの橋
```

WK2ではRiesz表現からLax--Milgramの存在一意性を証明し、WK3ではGalerkin直交性・Ceaの補題からFEMへ接続する。読者向け入口は `F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md`。

---

## Encore IV：Stochastic Processes & Spectral Time Series

```text
F0-00P3 / P4 / P6 / F0-02C1 / F0-00FA2
  ↓
F0-00SP1 filtration・adapted process・stopping time
  ↓
F0-00SP2 martingale・optional stopping
  ↓
F0-00SP3 Brown運動・二次変分
  ↓
F0-00SP4 Ito積分・Ito公式・SDE
  ↓
F0-00SP5 generator・Kolmogorov・Fokker--Planck
  ↓
F0-00TS1 Hilbert予測・innovation・Wold
  ↓
F0-00TS2 Herglotz・spectral measure/density
  ↓
E2-03 AR・MA・ARIMA本編
  ↓
F0-00TS3 linear filter・ARMA周波数領域
```

Brown運動からSDE・generator・PDEへ進む連続時間枝と、定常過程を $L^2$ 射影として読みWold・spectral representation・ARMA filterへ進む離散時間枝を持つ。読者向け入口は `F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md`。

---

## Encore V：Numerical Analysis, FEM & Monte Carlo

通常教材およびEncore II〜IVの必須前提にはしない。数値計算へ進む任意の発展路線であり、FEM branchとMonte Carlo/SDE branchは途中まで独立に読める。

### 共通数値基礎

```text
F0-00F
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
F0-00P5 / P6
  ↓
F0-00MC1 Monte Carlo積分・LLN/CLT・標準誤差
  ↓
F0-00MC2 variance reduction・importance sampling・control variate

Encore IV SP4 + MC1 + NA4
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

## 構造変更時の確認

通常カリキュラム章を追加・分割するときは `curriculum.yaml` を更新し循環依存を検証する。

補講を追加・分割するときは各 `chapter.yaml` の `prerequisites`、読者向けロードマップ、相互リンクを同じ変更単位で更新する。

補講の深掘りを追加するときは、標準通読ルートへ不要な必須依存を追加しない。必要十分な標準ルートと任意の深掘りルートを明示的に分離する。
