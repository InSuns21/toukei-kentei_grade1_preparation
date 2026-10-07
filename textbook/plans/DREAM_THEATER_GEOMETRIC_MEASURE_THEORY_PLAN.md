# DREAM THEATER 幾何学的測度論 計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

本計画は、既存の測度論と Fourier / 調和解析の上に **幾何学的測度論を1セメスターの独立科目として整備する**ための設計台帳である。

Kakeya を読むためだけに Hausdorff dimension と Frostman lemma の短い補講を置く方針は採らない。

既存 `MT8 Hausdorff測度・Hausdorff次元` を入口とし、

- Frostman lemma / energy / capacity
- projection theorem
- area / coarea
- rectifiability
- density / tangent
- BV / finite perimeter
- Besicovitch set
- Kakeya tube geometry

までを一つの科目として閉じる。

Kakeya の研究最前線は本計画の終盤で独立調和解析 PLAN の HA8 と合流し、EOM074 へ送る。

## 0.1 範囲校正に用いる標準書

- Pertti Mattila, *Geometry of Sets and Measures in Euclidean Spaces*
- Pertti Mattila, *Fourier Analysis and Hausdorff Dimension*
- Lawrence C. Evans and Ronald F. Gariepy, *Measure Theory and Fine Properties of Functions*

Mattila の全範囲を一学期へ詰め込まず、Frostman / projection / rectifiability / finite perimeter / Kakeya interface を本科目の標準射程とする。analytic capacity、uniform rectifiability、currents / varifolds の完全理論は停止線の外へ置く。

## 1. canonical owner と既存資産

既存正本:

- Hausdorff measure / Hausdorff dimension / mass distribution principle: MT8
- Radon measure: MT5--MT6
- one-dimensional BV: MT4
- Fourier transform / Plancherel: FOU3--FOU4
- maximal / singular integral / restriction interface: `DREAM_THEATER_HARMONIC_ANALYSIS_PLAN.md` の HA 系列
- manifold / differential geometry: GEO 系列

本計画はこれらを再実装しない。

幾何解析 GA は manifold PDE を主役とし、本計画の Euclidean GMT / rectifiability / finite perimeter と責務を分ける。

## 2. 科目構成

仮 ID: GMT1--GMT8

### GMT1 Frostman lemma・energy・capacity

- Frostman measure
- $s$-energy
- Riesz energy
- capacity
- Hausdorff dimension の下界
- energy と Fourier transform の接続

MT8 の mass distribution principle を本格化する。

### GMT2 projection theorem・Marstrand

- orthogonal projection
- almost every direction
- projection of measures
- energy method
- Marstrand projection theorem
- exceptional directions の入口

### GMT3 Lipschitz mapping・area formula・coarea formula

- approximate differential
- Jacobian
- Lipschitz image
- area formula
- coarea formula
- level set measure

通常の変数変換公式との違いを明示する。

### GMT4 rectifiable set・approximate tangent

- countably $m$-rectifiable set
- Lipschitz image
- approximate tangent plane
- density
- purely unrectifiable set
- integer dimension と rectifiability の違い

### GMT5 density・rectifiability criterion

- upper / lower density
- tangent measure の入口
- rectifiability criterion
- Preiss theorem の位置付け
- pure unrectifiability

Preiss theorem の完全理論は停止線候補とし、1セメスターで必要な古典的整数次元 theory を優先する。

### GMT6 BV・finite perimeter・Gauss--Green

- 多変数 BV
- distributional derivative
- set of finite perimeter
- perimeter measure
- reduced boundary
- measure-theoretic normal
- Gauss--Green theorem

MT4 の1次元 BV を prerequisite とする。

### GMT7 Besicovitch set・Kakeya set problem

- Kakeya needle problem
- Besicovitch construction
- zero Lebesgue measure
- Minkowski / Hausdorff dimension
- high-dimensional Kakeya conjecture
- $\delta$-tube discretization

### GMT8 tube geometry・Kakeya maximal interface

- direction-separated tubes
- overlap multiplicity
- Kakeya maximal operator
- set version と maximal version
- scaling
- wave packet / restriction との接続
- HA8 との合流

2026 Family 074 の proof details は EOM074 へ送る。

## 3. 主依存

~~~text
MT8
 ↓
GMT1 → GMT2
 ↓       │
GMT3 → GMT4 → GMT5 → GMT6
                  │
                  └────→ GMT7 → GMT8
                                ↑
                               HA8
~~~

実際の prerequisite は章ごとに最小化する。

## 4. 停止線

1セメスターでは原則として次を完全理論へ広げない。

- tangent measures の本格理論
- uniform rectifiability
- analytic capacity
- singular integrals on uniformly rectifiable sets
- currents / varifolds の完全理論
- minimal surface GMT の完全理論

必要なら GMT II / geometric variational theory を別 PLAN とする。

## 5. 演習・証明方針

各章は DREAM THEATER 標準の A4/B3/C1 を原則とする。

- Frostman measure の構成と dimension bound
- projection の具体例
- area / coarea の低次元計算
- rectifiable / unrectifiable の判定例
- finite perimeter set の計算
- Besicovitch construction の finite-stage 可視化
- tube overlap estimate

を含める。

## 6. 完成条件

1. MT8 の Hausdorff dimension を前提に、その先の GMT を独立科目として読める。
2. Frostman / energy method を自力で使える。
3. projection theorem の statement と proof mechanism を説明できる。
4. area / coarea を Jacobian から追える。
5. rectifiable / purely unrectifiable を区別できる。
6. finite perimeter と reduced boundary を説明できる。
7. Besicovitch set と Kakeya conjecture の関係を説明できる。
8. Kakeya maximal operator が set conjecture より解析的に強い形であることを説明できる。
9. HA8 と GMT8 が自然に合流し EOM074 へ進める。
