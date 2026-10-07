# DREAM THEATER 変分問題：第二変分・測地線・極小曲面 コース計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

解析力学 I で現れる第一変分と Euler--Lagrange 方程式を出発点に、**第二変分・測地線・Jacobi 場・共役点・極小曲面・安定性**までを一学期規模で体系化する。

中心問いは、

> 停留点であることと最小であることはどう違い、その差は第二変分と幾何にどう現れるか。

とする。

解析力学の変分原理だけでなく、微分幾何・幾何解析へ接続する数学科目として自立させる。

## 1. 市販教科書との照合

主参照:

- 小磯憲史『変分問題』共立出版  
  https://www.books.or.jp/book-details/9784320015647
- 伊藤秀一『常微分方程式と解析力学』共立出版  
  https://www.books.or.jp/book-details/9784320015630
- V. I. Arnold, *Mathematical Methods of Classical Mechanics*, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-2063-1

小磯の「懸垂線・等周問題・弾性曲線 → 測地線 → Jacobi 場 → 極小曲面 → 安定性」という流れを主な射程基準とする。

## 2. prerequisite

必須:

- 実解析の微分積分・Taylor 展開
- 多変数微積分
- ODE の存在一意性・線形二階方程式
- 微分幾何の曲線・曲面、接空間、Riemann 計量の基礎

推奨:

- 解析力学 I の AMECH3
- 関数解析の Hilbert 空間の基礎

Sobolev 空間・弱収束・楕円型 PDE の本格的な直接法は幾何解析 / 変分法の発展系列へ送る。

## 3. 章構成

候補 ID: VAR1--VAR8。

### VAR1 汎関数・第一変分・Euler--Lagrange 方程式

- admissible class
- variation
- first variation
- fixed endpoint / free endpoint
- Euler--Lagrange equation
- natural boundary condition
- isoperimetric constraint
- Lagrange multiplier
- 懸垂線・最短曲線

AMECH3 と重複する導出は canonical dependency を尊重し、本章では数学的仮定と変分クラスを明示する。

### VAR2 第二変分と最小性

- second variation
- quadratic form
- necessary condition for local minimum
- Legendre condition
- strengthened Legendre condition
- Jacobi equation の出現
- conjugate point への動機
- 1次元 Sturm 型例

「第一変分が 0 だから最小」という誤解を明示的に壊す。

### VAR3 平面曲線の変分

- arclength parametrization
- curvature
- free endpoint problem
- isoperimetric problem
- elastica
- curvature energy
- boundary terms

曲線の変分で「変分すると曲率が現れる」計算を省略しない。

### VAR4 Riemann 多様体上の測地線

- energy functional
- length functional
- first variation formula
- geodesic equation
- affine parameter
- local minimizer
- Gauss lemma への接続
- 力のない粒子との対応

解析力学の自由運動と Riemann 幾何の測地線を同一視するための仮定を明示する。

### VAR5 第二変分・Jacobi 場・共役点

- index form
- second variation of energy
- Jacobi equation
- Jacobi field
- conjugate points
- variation through geodesics
- curvature term
- minimality の破れ

Jacobi 場を「名前付き方程式」として置くだけでなく、測地線族の微分として導く。

### VAR6 最短測地線と存在

- normal neighborhood
- geodesic ball
- minimizing geodesic
- completeness との関係
- Hopf--Rinow の位置づけ
- cut locus の入口
- sphere / torus examples

Hopf--Rinow の完全証明を既存微分幾何で扱う場合は重複せず参照する。

### VAR7 曲面の面積の第一変分と極小曲面

- surface variation
- area functional
- first variation of area
- mean curvature
- minimal surface
- graph case and minimal surface equation
- catenoid / helicoid examples
- boundary conditions

PDE としての極小曲面方程式の正則性理論は幾何解析へ送る。

### VAR8 極小曲面の第二変分と安定性

- second variation of area
- Jacobi operator
- stable / unstable minimal surface
- Jacobi field
- constant mean curvature surface の入口
- catenoid stability
- eigenvalue viewpoint
- 幾何解析への出口

第二変分の符号と作用素のスペクトルが安定性を支配するところまで閉じる。

## 4. canonical ownership と境界

本科目が canonical owner:

- 変分問題としての第一・第二変分
- 第二変分からの Jacobi equation
- geodesic index form / Jacobi field / conjugate point
- 曲線・曲面の代表的幾何変分
- minimal surface の第一・第二変分と Jacobi operator の入口

他系列を参照:

- Hamilton の原理の物理的意味: 解析力学 I
- Riemann 多様体の一般論: 微分幾何
- Hopf--Rinow 等の大域 Riemann 幾何: 既存 canonical owner があれば参照
- Sobolev / direct method / elliptic regularity: 関数解析・幾何解析
- mean curvature flow 等の発展方程式: 幾何解析

## 5. 教育設計

一貫した導線を次とする。

```text
停留点を探す
  ↓
Euler--Lagrange
  ↓
停留点は得たが最小とは限らない
  ↓
第二変分
  ↓
Jacobi 方程式
  ↓
共役点・曲率・安定性
```

具体例として、

- 懸垂線
- 等周問題
- Euler elastica
- sphere 上の測地線
- catenoid

を最後まで計算する。

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 6. 完成条件

- admissible variation を定義し、第一変分を導ける。
- 第二変分を quadratic form として計算し、局所最小性との関係を説明できる。
- 測地線方程式を energy functional の第一変分から導ける。
- Jacobi equation を第二変分または geodesic variation から導ける。
- conjugate point が最小性に与える意味を説明できる。
- 面積の第一変分から mean curvature を導ける。
- minimal surface の Jacobi operator と安定性を説明できる。

## 7. 実装順

1. AMECH3 / 微分幾何 / 幾何解析との重複監査
2. VAR1--VAR2
3. VAR3--VAR4
4. VAR5--VAR6
5. VAR7--VAR8
6. AMECH / 幾何解析への cross-link
7. knowledge DAG / public index / series manifest
8. 数学的完全性・読者粒度の二系統レビュー
