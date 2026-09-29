# DREAM THEATER 確率過程コース計画

作成日: 2026-09-29  
状態: planned

## 0. 目的

現在の DREAM THEATER では、確率過程の基礎から Itô 解析・SDE・Lévy 過程までが「確率解析」に一続きで入っている。

本計画では、**確率論と確率解析の間に「確率過程」コースを明示的に置く**。Markov 連鎖、計数過程、martingale、Brownian motion の基本像を学んだ後に stochastic calculus へ進める構造にする。

## 1. 既存資産

再利用候補:
- STO1: 確率過程・filtration・停止時刻
- STO2: 離散時間 martingale
- STO2A: 離散時間 Markov 連鎖
- STO3: 過程の構成・Kolmogorov continuity
- STO4: Brownian motion
- STO13: Poisson process・CTMC・random measure

STO3 / STO4 / STO13 は現在の確率解析系列の依存を持つため、単純な並べ替えはしない。各章の prerequisite と証明範囲を監査してから切り分ける。

## 2. コースの標準主線

### SP1 確率過程の見方
- process / sample path
- finite-dimensional distribution
- filtration の直観
- stopping time の基本

既存 STO1 を正本候補とする。

### SP2 離散時間 Markov 連鎖
- transition matrix
- communication class
- recurrence / transience
- invariant distribution
- detailed balance

既存 STO2A を正本候補とする。

### SP3 計数過程・Poisson process
- exponential waiting time
- independent increments
- superposition / thinning の基本
- birth--death process への橋

STO13 から random measure 以前を切り出すか、新しい軽量章を作るかを実装前に決める。

### SP4 連続時間 Markov 連鎖
- Q matrix
- holding time
- jump chain
- Kolmogorov forward / backward equation
- birth--death chain

発生生物学の reaction network へ直接接続する。

### SP5 martingale 入門
- conditional expectation
- martingale
- stopping
- optional sampling の基本
- Doob decomposition の位置付け

既存 STO2 のどこまでを本コースに含めるか監査する。

### SP6 renewal・branching
- renewal process
- renewal equation
- Galton--Watson process
- extinction probability
- population dynamics への橋

### SP7 Brownian motion 入門
- Gaussian increments
- scaling
- path continuity の意味
- hitting time
- diffusion limit の直観

STO3 / STO4 の完全証明を必須にせず、確率解析へ進むための入口を設ける案を検討する。

## 3. 確率解析との境界

確率過程:
- Markov chain
- CTMC
- Poisson process
- renewal / branching
- martingale の基礎
- Brownian motion の基本像

確率解析:
- continuous local martingale
- quadratic variation
- Itô integral / Itô formula
- Stratonovich
- SDE
- Girsanov
- semimartingale
- random measure に対する確率積分
- Lévy process の高度な理論

## 4. 前提候補

- 確率論
- 実解析
- 線形代数

測度論の高度な部分を全章一括で prerequisite にせず、証明を行う章だけ direct prerequisite を付ける。

## 5. 数理発生学との接続

発展編では stochastic gene expression、birth--death process、chemical reaction network、cell-fate switching、first-passage time、branching / lineage、diffusion approximation を扱う。

## 6. 実装順

1. STO1 / STO2 / STO2A / STO3 / STO4 / STO13 の依存監査
2. 「確率過程」と「確率解析」の境界確定
3. SP3 / SP4 / SP6 の不足部分を新設
4. 公開目次を二科目へ分割
5. stochastic analysis 側のリンク・prerequisite を修正
6. 全体 validation
