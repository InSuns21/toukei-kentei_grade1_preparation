# DREAM THEATER 数理発生生物学・発展コース計画

作成日: 2026-09-29  
状態: planned  
配置予定: DREAM THEATER「応用系」

## 0. 目的

「数理発生生物学入門」で意図的に軽くした力学系・確率性・連続体力学を、今度は正面から使う発展コースを設ける。

本系列では発生を **nonlinear dynamics + stochastic processes + continuum mechanics + spatial transport** が結合した非平衡系として扱う。

## 1. 前提

direct prerequisite の柱:
- 数理発生生物学入門
- 力学系
- 確率過程
- 連続体力学

必要章に応じて追加:
- 偏微分方程式
- Fourier 解析
- 数値解析 / 差分法
- 確率解析

追加科目は系列全体の一括 prerequisite にせず、必要な章だけ direct prerequisite とする。

## 2. 章構成候補

章 ID 候補: MDBA1--MDBA10。

### MDBA1 gene regulatory network と分岐
- high-dimensional reaction network
- Jacobian spectrum
- saddle-node / pitchfork / Hopf
- multistability
- hysteresis
- cell-fate landscape の数理的注意点

### MDBA2 stochastic gene expression と fate switching
- birth--death process
- chemical reaction network
- master equation
- Gillespie algorithm
- first-passage time
- noise-induced transition
- deterministic limit との比較

### MDBA3 reaction--diffusion の線形安定性と pattern selection
- spatial mode
- dispersion relation
- Turing instability の一般形
- wavelength selection
- domain size
- boundary condition dependence
- parameter sensitivity

### MDBA4 oscillatory development と synchronization
- limit cycle
- phase reduction
- coupled oscillator
- synchronization
- traveling phase wave
- segmentation clock
- entrainment

### MDBA5 tissue continuum mechanics
- deformation / strain / stress
- force balance
- elastic / viscous / viscoelastic tissue
- active stress
- contractility
- boundary conditions
- tissue folding

### MDBA6 growth・morphoelasticity・remodeling
- growth tensor の考え方
- incompatible growth
- buckling / folding
- differential growth
- residual stress
- organ shape formation

厳密な nonlinear elasticity は必要部分だけ扱う。

### MDBA7 mechanochemical PDE
- chemical field + mechanical field
- stress-dependent reaction
- deformation-dependent transport
- moving domain
- feedback instability
- pattern + shape coevolution

この章を発展系列の中核とする。

### MDBA8 collective cell migration と active matter
- polarity
- self-propulsion
- alignment
- active stress
- vertex / particle / continuum model の比較
- epithelial flow
- defect の入口

### MDBA9 stochastic spatial development
- stochastic reaction--diffusion
- fluctuating cell number
- branching / lineage
- chemotactic random walk
- continuum limit
- noise and robustness

SDE / SPDE を完全に一般化せず、発生モデルに必要な範囲へ限定する。

### MDBA10 organoid・inverse problem・model discrimination
- organoid / gastruloid as model systems
- parameter inference
- identifiability
- competing mechanisms
- perturbation experiment
- model selection
- sensitivity analysis
- data assimilation の入口

## 3. 依存構造

- MDBA1 ← 力学系
- MDBA2 ← 確率過程
- MDBA3 ← 力学系 + PDE の必要部分
- MDBA4 ← 力学系
- MDBA5 ← 連続体力学
- MDBA6 ← 連続体力学
- MDBA7 ← MDBA3 + MDBA5
- MDBA8 ← MDBA5 + 力学系
- MDBA9 ← MDBA2 + MDBA3
- MDBA10 ← MDBA7 + MDBA9

全章の共通土台として数理発生生物学入門を置く。

## 4. 入門版との役割分担

入門版:
- 実解析 + 線形代数から読める
- 一次元・低次元・離散モデル中心
- 必要な数理をその場で導入
- 数理の重さを抑える

発展版:
- 基盤3科目を既知として使う
- multi-dimensional / stochastic / continuum model を扱う
- stability / bifurcation / fluctuation / stress を定量化する
- 複数機構の coupling を主題とする

入門版の説明を丸ごと再録しない。

## 5. 実装順

Phase 0:
- 力学系・確率過程・連続体力学の公開コース成立を確認
- MDB 入門完了を確認
- canonical terminology / notation を確定

Phase 1: MDBA1--MDBA2  
Phase 2: MDBA3--MDBA4  
Phase 3: MDBA5--MDBA6  
Phase 4: MDBA7--MDBA9  
Phase 5: MDBA10 + 横断演習

## 6. 横断演習候補

1. bistable switch にノイズを入れ fate switching を比較
2. Turing pattern の dispersion relation を計算
3. coupled oscillator で segmentation wave を再現
4. active contraction を持つ tissue strip を変形させる
5. chemical activation + mechanical feedback で symmetry breaking を作る
6. 二つの異なるモデルが同じ観測パターンを作る例を比較し identifiability を議論

## 7. 完了条件

- 3基盤コースを prerequisite として本当に活用している
- 入門版との重複が最小化されている
- deterministic / stochastic / mechanical の3視点が統合されている
- 各モデルについて「何が観測可能か」「何が推定不能か」を明示する
- 生物学的主張とモデル上の仮定を混同しない
