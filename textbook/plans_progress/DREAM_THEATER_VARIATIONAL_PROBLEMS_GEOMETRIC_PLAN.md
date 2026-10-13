# DREAM THEATER 変分問題：幾何的第二変分・存在定理・臨界点理論 コース計画

作成日: 2026-10-07  
状態: in_progress（着手準備・前提照合を開始。VAR1〜VAR12本文はすべて未執筆）

## 0. 目的

解析力学 I で現れる第一変分と Euler--Lagrange 方程式を出発点に、**第二変分・測地線・Jacobi 場・共役点・極小曲面・安定性**と、**極小点の存在の直接法・弱下半連続性・minimax・Morse指数**を体系化する。証明量で講数を調整する。

中心問いは、

> 停留点であることと最小であることはどう違うか。そもそも極小点は存在するのか。その差と存在条件は第二変分・幾何・弱収束にどう現れるか。

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

一般Sobolev空間・弱収束・埋め込みはGPDE3〜5を正本とするが、**最小化の直接法・Tonelli型存在定理はVAR9〜10が正本**とする。多次元PDEの一般的準凸性・緩和・正則性は後続へ送る。

## 2A. 着手準備と既存証明正本の照合（2026-10-13）

章の本文執筆に先立って、GitHub上の現行 `chapter.yaml` と系列manifestを確認した。

- **第一変分の入口**: `AMECH3` の作用積分・固定端点変分・Euler--Lagrange方程式・停留点と極小点の相違が既存の証明正本。VAR1は自由端点、角点、等周拘束、許容関数空間へ拡張する。
- **曲線・曲面**: `GEO10` の弧長・曲率・基本形式・平均曲率を使用する。VAR3・VAR7〜8はこれらを変分したときの境界項、停留条件、具体計算を扱う。
- **測地線**: `GEO12`（計量と長さ・エネルギー）、`GEO13`（接続）、`GEO14`（測地線）、`GEO16`（曲率）が存在する。**`GEO17` は測地線の第一・第二変分公式、指数形式、Jacobi場、共役点、局所最短性の証明正本**である。VAR4〜5は既存の [GEO17](../volumes/dream_thater/幾何系/GEO/GEO17/index.md) の結果へ使用箇所でリンクし、曲線変分との比較、曲率模型の計算、安定性・Morse指数への接続を中心にする。
- **大域測地線論**: `GEO15` がHopf--Rinow・最短測地線・切断点の証明正本であり、VAR6で無条件に再証明しない。[GEO15](../volumes/dream_thater/幾何系/GEO/GEO15/index.md) の仮定を明示して変分的存在論と比較する。
- **関数空間**: `GPDE3`（Sobolevの定義）、`GPDE4`（区間トレースとPoincaré）、`GPDE5`（Hilbert弱収束・Rellich）は実在する。VAR9では必要な1次元の弱閉性・コンパクト性を具体化し、最小化の直接法を新たに証明する。
- **後続との停止線**: `CELE2〜3` はNewton n体の正本だが、CELEVは未執筆であり、VAR9〜12の未実装定理を既知として先取りしない。

VAR系列manifestの全12章は `planned` で初期化し、本文・chapter.yaml・knowledge.yaml・公開索引・目次は**VAR1の実執筆まで追加しない**。章ごとの正確なprerequisitesは執筆時に `chapter.yaml` で確定する。初期の教材スコープは `textbook/volumes/dream_thater/解析系/VAR/` とする。

## 3. 章構成

候補 ID: VAR1--VAR12（VAR9〜12は上記監査による追加、実装は未着手）。

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

解析力学の自由運動と Riemann 幾何の測地線を同一視するための仮定を明示する。一般の第一変分公式・測地線と臨界点の同値はGEO17を証明正本とし、本章では具体的Lagrangianと幾何の対応を再計算する。

### VAR5 第二変分・Jacobi 場・共役点

- index form
- second variation of energy
- Jacobi equation
- Jacobi field
- conjugate points
- variation through geodesics
- curvature term
- minimality の破れ

Jacobi 場を「名前付き方程式」として置くだけでなく、測地線族の微分との対応を具体例で再構成する。一般の第二変分・Jacobi方程式・共役点と局所最短性の定理はGEO17が既存の証明正本であり、完全な一般証明を重複させず実在stable anchorへリンクする。

### VAR6 最短測地線と存在

- normal neighborhood
- geodesic ball
- minimizing geodesic
- completeness との関係
- Hopf--Rinow の位置づけ
- cut locus の入口
- sphere / torus examples

Hopf--Rinow・切断点・最短測地線はGEO15が既存の証明正本である。定理の適用仮定と、変分による極小化の直接法との違いを本章で具体化する。

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


## 3A. 不足分の増補講義 VAR9〜12（2026-10-13監査）

既存VAR1〜8は小磯憲史『変分問題』の幾何的変分（第一/第二変分、測地線、Jacobi場、極小曲面）をよくカバーする。一方、**最小値は存在するか・最小化列は収束するか・最小でない周期解をどう探すか**の独立した証明正本が欠けていたため、以下を追加する。章数は証明・演習の密度に応じて可変。既存VAR1〜8を改名/未着手のまま完成扱いしない。

参照:
- 小磯憲史『変分問題』共立出版 https://www.books.or.jp/book-details/9784320015647
- Bernard Dacorogna, *Direct Methods in the Calculus of Variations*, 2nd ed. https://link.springer.com/book/10.1007/978-0-387-55249-1
- Jean Mawhin and Michel Willem, *Critical Point Theory and Hamiltonian Systems* https://link.springer.com/book/10.1007/978-1-4757-2061-7
- Gelfand and Fomin, *Calculus of Variations*（端点自由・角点のWeierstrass–Erdmann条件）

### VAR9 H¹弱収束と最小化の直接法

- 一般Sobolevの定義は[GPDE3](../volumes/dream_thater/解析系/GPDE/GPDE3/index.md)、区間トレースは[GPDE4](../volumes/dream_thater/解析系/GPDE/GPDE4/index.md)、弱収束/Rellichは[GPDE5](../volumes/dream_thater/解析系/GPDE/GPDE5/index.md)を直接参照し、重複証明しない。
- 区間のH¹、固定端点・周期H¹_per、平均零条件、弱閉な許容集合、コンパクトな1次元埋め込みを具体化。
- coercivity、弱逐次下半連続性、弱閉性から極小点の存在を導く直接法の定理を**仮定→最小化列→部分列→下半連続性→結論**まで完全証明。
- 定数並進がcoercivityを壊す例と、平均零/Poincaré拘束で直す例。存在と一意性・滑らかさを区別する。

### VAR10 Tonelli型存在論・弱EL方程式と正則性

- 区間上のJ(u)=∫F(t,u,u')dt。速度変数についての凸性、適切な可測性・成長条件・coercivity・弱下半連続性を明示。
- **1次元のTonelli型存在定理**を証明し、境界条件、非凸性、弱下半連続性失敗例を実計算。
- 弱極小点のEuler–Lagrange方程式を弱形式で導き、古典正則性へ進むには別の仮定が必要と示す。
- Newton n体の衝突特異性へ一般定理を無条件に適用しない。

### VAR11 Palais–Smale・Ekeland・minimax

- Frechet/Gateaux微分、臨界点、(PS)コンパクト性条件、極小点と鞍点。
- Ekelandの変分原理、Mountain Passの主要論理、minimax値からPS列を構成する条件を査読可能な証明粒度で扱う。
- 有限群の対称臨界性の条件と例。一般Hamiltonian系に(PS)成立を主張しない。
- 無限次元全一般の臨界点理論・LSカテゴリー・Floerホモロジーは停止線の外。

### VAR12 第二変分作用素・Morse index

- VAR2/VAR5の二次形式から自己共役作用素、境界条件、indexとnullity、Sturm/Jacobiの具体例。
- 共役点・局所最小性・Morse indexの関係を条件つきで扱い、制約付きHessianと全変分Hessianを区別する。
- 作用の極小性・力学的安定性・Floquet乗数を同一視せず、CELEV7への接続を確保。

**後続**：[CELEV1〜8 変分的n体周期軌道・8の字・舞踏解と実シミュレーション](../plans/DREAM_THEATER_N_BODY_VARIATIONAL_PERIODIC_ORBITS_SIMULATION_PLAN.md)。VAR9〜12を一般変分理論の正本、CELEVを特異作用/衝突回避/対称性/実際のNewton積分の正本とする。CELEVがVAR未実装定理を参照するときは、必ず実章の存在を確認する。

**VAR1〜8の局所補強**: VAR1には自由端点・角点・Weierstrass–Erdmannの接合条件を加える。VAR2にはLegendre/Jacobiの必要条件と十分条件の差・使用位相・coercivity仮定を加える。VAR6にはHopf–Rinowの前提とcut locusの限界、VAR7〜8には面積変分と安定作用素の境界条件を明示する。これらは実装時の必須チェック項目であり、このPLAN更新だけで実本文へ反映済みとみなさない。

## 4. canonical ownership と境界

本科目が canonical owner:

- 変分問題の直接法・Tonelli型存在定理・無限次元臨界点/minimax・Morse indexの基礎（VAR9〜12）
- 変分問題としての第一・第二変分
- 一般の許容変分・第一/第二変分と局所最小性の区別（既存AMECH3の重複を除く）
- 平面曲線・幾何的拘束変分でのJacobi型線形化と安定性への応用（GEO17の一般測地線定理を重複所有しない）
- 曲線・曲面の代表的幾何変分
- minimal surface の第一・第二変分と Jacobi operator の入口

他系列を参照:

- Hamilton の原理の物理的意味: 解析力学 I
- Riemann 多様体の一般論: 微分幾何
- Hopf--Rinow・最短測地線・切断点: GEO15
- 測地線エネルギーの第一・第二変分、指数形式、Jacobi場・共役点と最短性: GEO17
- Sobolev・弱収束・埋め込み: GPDE3〜5。直接法/Tonelli: VAR9〜10。多次元PDE正則性・準凸性: 後続
- Newton n体の特異作用・衝突回避・8の字/舞踏解・実際の物理時間発展: CELEV後続PLAN
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
- VAR9〜10の直接法/弱下半連続性/Tonelliの仮定を実例で検査・証明できる。
- VAR11〜12のminimax・Morse indexが極小性や動的安定性とどう違うか説明できる。

## 7. 実装順

1. AMECH3 / GEO10・12〜17 / GPDE3〜5 / 幾何解析 / CELEVとの重複・証明正本監査（着手準備で主要前提とGEO15/17の所有関係を確認。章執筆時に実在anchorを再確認する）。
2. VAR1〜VAR2（端点項・角点条件・第二変分の必要/十分条件を含む）。
3. VAR3〜VAR4、VAR5〜VAR6、VAR7〜VAR8（幾何変分の各組）。
4. VAR9〜VAR10（H¹直接法・Tonelli存在/正則性）。
5. VAR11〜VAR12（Palais–Smale・minimax・指数）。
6. AMECH / GPDE / 幾何解析 / CELEVへの実在stable anchor cross-link。未実装定理を既知扱いしない。
7. knowledge DAG / public index / series manifest（**PLAN段階では未公開章を登録しない**）。
8. 数学的完全性・読者粒度の二系統レビューとCI/公開検証。
