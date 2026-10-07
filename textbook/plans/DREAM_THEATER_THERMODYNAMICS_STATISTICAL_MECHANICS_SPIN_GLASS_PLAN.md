# DREAM THEATER 熱力学・統計力学・スピングラス 計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

Family 221 を読むためだけの Gibbs / Ising / spin-glass 補講を作らない。

次の三科目を、それぞれ **1セメスターを修了したと言える独立講義**として整備する。

1. 熱力学 TH
2. 統計力学 SM
3. スピングラス SG

中心ルート:

~~~text
既存 解析・凸解析
       ↓
熱力学 TH
       ↓
統計力学 SM ← 測度論・確率論
       ↓
スピングラス SG
       ↓
EOM221
~~~

## 0.1 範囲校正に用いる標準書

### 熱力学

- 田崎晴明『熱力学―現代的な視点から』
- Herbert B. Callen, *Thermodynamics and an Introduction to Thermostatistics*

### 統計力学

- 田崎晴明『統計力学 I・II』
- R. K. Pathria and Paul D. Beale, *Statistical Mechanics*

### スピングラス

- Dmitry Panchenko, *The Sherrington--Kirkpatrick Model*
- Michel Talagrand, *Mean Field Models for Spin Glasses*
- Marc Mézard and Andrea Montanari, *Information, Physics, and Computation*

各系列は Family 221 への最短 prerequisite として内容を削るのではなく、上記標準書の射程を校正に使って独立科目として閉じる。

## 1. 熱力学 TH1--TH8

### TH1 平衡状態・状態量・温度
系・環境、平衡、示量 / 示強変数、第0法則、状態方程式。

### TH2 第一法則・内部エネルギー・熱・仕事
$dU=\delta Q+\delta W$、準静的過程、$pV$ work、熱容量、理想気体。

### TH3 第二法則・Carnot・絶対温度
熱機関、Kelvin / Clausius、Carnot theorem、可逆 / 不可逆。

### TH4 entropy・基本関係式
Clausius integral、entropy increase、$U(S,V,N)$。

### TH5 thermodynamic potential・Legendre transform
$F,G,H$、自然変数、Maxwell relation、Euler / Gibbs--Duhem。

### TH6 stability・response・convexity
heat capacity、compressibility、susceptibility、convexity / concavity、variational principle。

### TH7 chemical potential・multicomponent・phase equilibrium
chemical potential、phase coexistence、Clapeyron、mixing、chemical equilibrium、third law の位置付け。

### TH8 phase transition・magnetism・Landau への入口
first / continuous transition、order parameter、magnetic field / magnetization、Landau free energy、criticality の入口。

非平衡熱力学は本系列の停止線とする。

## 2. 統計力学 SM1--SM8

### SM1 microscopic state・ensemble・thermodynamic limit
microstate / macrostate、density of states、thermodynamic limit。

### SM2 microcanonical ensemble
equal probability、Boltzmann entropy、temperature の emergence。

### SM3 canonical ensemble
Gibbs distribution、partition function、free energy、energy fluctuation。

### SM4 grand canonical ensemble
chemical potential、grand partition function、particle-number fluctuation。

### SM5 classical ideal gas・equivalence of ensembles
Maxwell--Boltzmann、Sackur--Tetrode の位置付け、ensemble equivalence。

### SM6 quantum statistics
Bose--Einstein、Fermi--Dirac、quantum ideal gas。

### SM7 Ising / Curie--Weiss・mean-field
Ising Hamiltonian、magnetization、Curie--Weiss、self-consistency、spontaneous symmetry breaking。

### SM8 phase transition・critical phenomenon
free-energy nonanalyticity、correlation、critical point、scaling / universality への入口。

## 3. スピングラス SG1--SG8

### SG1 quenched disorder・REM
quenched / annealed、Random Energy Model、freezing transition。

### SG2 Gaussian toolbox
Gaussian concentration、Gaussian integration by parts、interpolation。

### SG3 Sherrington--Kirkpatrick model
SK Hamiltonian、overlap、thermodynamic free energy。

### SG4 replica symmetry / RSB
replica method の物理的由来、RS ansatz、RSB、AT instability の位置付け。

### SG5 Ghirlanda--Guerra・ultrametricity
overlap identities、hierarchical structure、ultrametricity。

### SG6 Ruelle probability cascade・Parisi formula
RPC、Parisi functional、Guerra interpolation、Parisi variational principle。

### SG7 diluted spin glass・factor graph
Viana--Bray、Poisson interaction、random factor graph、random CSP への橋。

### SG8 cavity method・Mézard--Parisi
belief propagation、cavity field、Bethe free energy、RS / 1RSB cavity、diluted Mézard--Parisi interface。

EOM221 は SG8 の後に置く。

## 4. canonical boundary

- thermodynamic potential の公理的構造: TH
- partition function から potential を導く: SM
- disorder / overlap / Parisi / cavity: SG
- 2026 Family 221 の exact claim / proof architecture / verification status: EOM221

同じ定義を各系列で再導入しない。

## 5. 停止線

今回の主線には含めない。

- nonequilibrium thermodynamics
- Boltzmann equation / kinetic theory
- transport coefficient / Onsager theory
- renormalization group の完全理論
- constructive statistical mechanics
- quantum spin glass の完全理論

必要なら独立 PLAN とする。

## 6. 完成条件

- TH1--TH8 で平衡熱力学を独立に履修できる。
- SM1--SM8 で標準平衡統計力学を独立に履修できる。
- SG1--SG8 で平均場から diluted spin glass / cavity method まで一本の講義になる。
- EOM221 が基礎定義の初出場所にならない。
