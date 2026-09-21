# DREAM THEATER：標準ベクトル解析 再編計画

作成日: 2026-09-21


## 実装進捗（2026-09-21）

- **Phase 0：完了**
  - PDE6 の vector-calculus 部分を棚卸しし、法線・flux・発散定理を VC 系列の canonical owner へ移す方針を確定。
- **Phase 1：VC1--VC4 実装完了**
  - VC1 ベクトル場と微分演算子
  - VC2 曲線・線積分・保存場
  - VC3 曲面・向き・曲面積分・flux
  - VC4 Green・Gauss--Ostrogradsky と保存則
  - 各章に `knowledge.yaml` / `glossary.yaml`、A4/B3/C1 演習、全問詳細解答を実装。
- **Phase 4 の PDE6 再監査：完了**
  - PDE6 の prerequisite を VC4 へ接続。
  - 発散定理の重複証明を除去し、Green 恒等式・基本解・Green 関数中心へ再編集。
- **Phase 2：VC5--VC6 実装完了（2026-09-22）**
  - VC5 Stokes theorem・curl・topology
  - VC6 直交曲線座標
  - 各章に `knowledge.yaml` / `glossary.yaml`、A4/B3/C1 演習、全問詳細解答を実装。
- **公開導線：VC1--VC6 を反映済み**
  - `dream-theater-index.json`
  - `dream-theater-standard-math-core.yaml` / `.md`
  - `dream-theater.md`
- **未実装**
  - Phase 3：VC7 Cartesian tensor、VC8 Helmholtz decomposition、VC9 数理物理 bridge

未実装の VC7--VC9 は reader index / concept owner として先行公開しない。

## 0. 位置付け

この文書は、DREAM THEATER に独立した **標準ベクトル解析（Vector Calculus / Vector Analysis）系列**を新設するための設計台帳である。

現行 Encore II の PDE6 は、Green の恒等式・基本解・Green 関数を主題としながら、外向き法線、flux、divergence、平面版発散定理まで章内で構成している。数学的には閉じているが、依存構造としては「PDE のためにベクトル解析を局所実装している」状態である。

新系列ではこれを解消し、ベクトル解析を PDE の補助章ではなく、

- 多変数解析
- 古典 PDE
- 流体力学
- 電磁気学
- 連続体力学
- 数理物理
- 後続の微分幾何・微分形式

へ共通に流れ込む **学部標準の canonical series** として正本化する。

標準範囲の校正には、MIT 18.02 の vector integral calculus と Cambridge Part IA Vector Calculus / Mathematical Methods の典型的な学部範囲を参考にする。特に後者に含まれる、直交曲線座標、Laplace/Poisson への接続、Cartesian tensor までを「数学・理論物理系の学部標準」の上側として採用する。

ただし、一般の多様体、微分形式、de Rham cohomology、接続・共変微分・曲率は本系列へ逆輸入しない。これらは将来の微分幾何系列の正本とする。

---

## 1. 設計目標

系列完了時に、読者が次を本文から再構成できることを目標とする。

1. gradient / divergence / curl / Laplacian を座標公式としてではなく、局所的な幾何・流束・循環の意味から理解する。
2. 曲線積分、曲面積分、flux を向きと parametrization を含めて定義し、具体例で計算できる。
3. Green、Gauss--Ostrogradsky、Stokes の各積分定理を、仮定と向きを確認して適用できる。
4. conservative / irrotational / solenoidal の違いと、領域の topology が potential の存在へ影響することを説明できる。
5. 円柱・球座標を含む直交曲線座標で、線素・面素・体積要素および grad/div/curl/Laplacian を導出できる。
6. Einstein の縮約記法、Kronecker delta、Levi--Civita symbol、二階 Cartesian tensor を扱い、ベクトル恒等式や stress / inertia tensor の基本計算を行える。
7. Helmholtz decomposition を適切な減衰・正則性条件の下で理解し、scalar potential / vector potential / gauge freedom を区別できる。
8. 保存則、非圧縮流、渦度、電磁気の積分形と微分形を、ベクトル解析の共通構造として読める。
9. PDE6 以降で、法線・flux・発散定理を未説明のまま使わず、canonical dependency を明示できる。

---

## 2. 既存正本との役割分担

### 2.1 標準実解析との境界

既存正本：

- RA4：一変数微積分・微積分学の基本定理
- RA6 / RA6A：多変数微分、Fréchet 微分、Jacobian、逆写像・陰関数系
- RA7：多重 Riemann 積分、変数変換、極・球座標

新 VC 系列ではこれらを再定義しない。

特に Jacobian determinant と多重積分の変数変換は RA7 を正本とし、VC6 では「曲線座標の scale factor と線素・面素・体積要素」に集中する。

### 2.2 線形代数との境界

内積、直交基底、行列式、交代性、線形写像は LA / 既存 F0-00E 系列を正本とする。

VC7 の Cartesian tensor は「Euclidean 空間で基底変換に対してどう成分が変換するか」を主題とし、一般 tensor product・多様体上の tensor field を先取りしない。

### 2.3 PDE との境界

- Laplace / Poisson 方程式、調和関数、最大原理：PDE5
- Green の第一・第二恒等式、Green 関数、基本解による表現：PDE6
- 弱微分・Sobolev・変分弱形式：GPDE 系列

VC4 は **発散定理そのもの**を canonical owner とする。PDE6 は VC4 を prerequisite とし、Green 恒等式以降に集中する。

VC8 で Helmholtz decomposition を扱う際、scalar Poisson problem / fundamental solution と重なる部分は PDE6 の結果を参照し、Green 関数一般論を重複構築しない。

### 2.4 幾何学との停止線

本系列では Euclidean 2次元・3次元に限定し、

- tangent space の一般論
- differential form
- exterior derivative
- pullback
- orientation of manifolds
- general Stokes theorem
- metric tensor の一般論
- Christoffel symbol
- covariant derivative
- curvature

は導入しない。

VC5 の Stokes theorem は、parametrized surface と Green theorem を用いる古典的ベクトル解析として証明する。

---

## 3. 章構成

新規主線 ID は **VC1--VC9** とする。

### VC1 ベクトル場と微分演算子

**tier: core**

役割：ベクトル解析の局所微分構造を正本化する。

主な内容：

- scalar field / vector field
- directional derivative と gradient の再解釈
- level surface と gradient の法線方向
- divergence
- curl
- scalar Laplacian
- vector Laplacian の入口
- product rules
- `curl grad = 0`
- `div curl = 0`
- `div(fF)`, `curl(fF)`
- `div(F × G)`, `curl(F × G)` 等の主要恒等式
- 局所的な source / sink、circulation density の意味

**証明境界**：偏微分交換は RA 系列の仮定を明示して使う。記号操作だけで恒等式を示さず、少なくとも主要恒等式は成分計算または `δ_{ij}`, `ε_{ijk}` の後続照合ができる形で証明する。

**直接例**：

- `f=x^2+y^2+z^2` の gradient と level sphere
- radial field `F=x` の divergence
- rigid rotation field `F=(-y,x,0)` の curl
- harmonic polynomial の Laplacian

---

### VC2 曲線・線積分・保存場

**tier: core**

役割：一次元の積分幾何から potential と topology の入口を作る。

主な内容：

- parametrized curve
- regular curve
- orientation / reparametrization
- arc length
- unit tangent
- scalar line integral
- vector line integral / work / circulation
- conservative field
- scalar potential
- path independence
- closed-loop integral
- fundamental theorem for line integrals
- star-shaped domain 上の Poincaré lemma の初等版
- simply connected の意味と適用範囲
- punctured plane の反例

曲線の curvature / Frenet frame は、線積分の理解に必要な範囲を超えない補遺として扱ってよいが、一般の曲線論の正本にはしない。

**主要結果**：

- potential があれば path independent
- path independent なら potential を構成できる
- star-shaped domain で `curl F=0` なら potential が存在
- `R^2 \setminus \{0\}` 上の典型的 irrotational 非 conservative field

**停止線**：de Rham cohomology で topology を説明しない。

---

### VC3 曲面・向き・曲面積分・flux

**tier: core**

役割：Gauss / Stokes を読むための幾何と積分を構成する。

主な内容：

- regular parametrized surface
- coordinate tangent vectors
- tangent plane
- normal vector
- orientability の古典的意味
- surface area element
- scalar surface integral
- oriented surface element
- flux integral
- closed surface
- boundary curve と induced orientation の入口
- graph / sphere / cylinder / plane の具体計算

**主要結果**：

- parametrization 変更に対する surface area / flux の不変性
- graph surface の面素公式
- sphere / cylinder の面積・flux 直接計算

**証明境界**：一般 manifold の orientation は使わず、有限個の regular surface patches で扱える範囲に限定する。

---

### VC4 Green・Gauss--Ostrogradsky と保存則

**tier: core**

役割：PDE6 が依存する積分定理の canonical owner になる。

主な内容：

- Green theorem：circulation form
- Green theorem：flux form
- planar divergence / scalar curl
- Gauss--Ostrogradsky divergence theorem
- box での直接証明
- graph domain / simple region への拡張
- finite decomposition と内部境界 flux の相殺
- piecewise smooth boundary
- source density と total flux
- 局所保存則と積分保存則の基本対応

**主要結果**：

$$
\int_{\partial D} P\,dx+Q\,dy
=
\iint_D
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)dA
$$

$$
\int_{\partial \Omega}F\cdot n\,dS
=
\int_\Omega \operatorname{div}F\,dV
$$

**PDE6 との関係**：

PDE6 の現行「外向き法線・flux・平面版発散定理」の導出は、VC3--VC4 実装完了後に正本を VC 側へ移す。PDE6 では必要な定義を短く復習し、VC4 への canonical link を張った上で

$$
\operatorname{div}(u\nabla v)
=
\nabla u\cdot\nabla v
+
u\Delta v
$$

から Green の第一恒等式へ直行する。

---

### VC5 Stokes theorem・curl・topology

**tier: core-advanced-standard**

役割：循環と curl の大域関係を閉じ、potential / vector potential の topology 依存を明示する。

主な内容：

- Kelvin--Stokes theorem
- graph surface での証明
- parametrized surface patch への移送
- finite patch decomposition
- boundary orientation
- curl の circulation density
- `curl grad=0`, `div curl=0` の積分的意味
- holes が potential existence を壊す機構
- irrotational / solenoidal の整理
- vector potential の入口

**主要結果**：

$$
\int_{\partial S}F\cdot dr
=
\int_S
(\nabla\times F)\cdot n\,dS
$$

**停止線**：一般 Stokes theorem を differential forms で再証明しない。

---

### VC6 直交曲線座標

**tier: core-advanced-standard**

役割：理論物理・PDE で頻出する円柱・球座標のベクトル微分を公式暗記から解放する。

主な内容：

- orthogonal curvilinear coordinates
- position-dependent orthonormal basis
- scale factors `h_1,h_2,h_3`
- line element
- surface element
- volume element
- Jacobian との対応
- gradient
- divergence
- curl
- scalar Laplacian
- cylindrical coordinates
- spherical coordinates
- vector Laplacian の基本形
- basis vector 自身が位置で変化すること

公式は結果だけを列挙せず、微小 box / flux / circulation または scale factor から導出する。

**典型例**：

- radial scalar field の gradient / Laplacian
- inverse-square radial field の divergence
- axisymmetric field
- spherical Laplacian による radial harmonic function

---

### VC7 Cartesian tensor・添字記法

**tier: core-advanced-standard**

役割：連続体力学・流体・電磁気・相対論前段の計算言語を整備する。

主な内容：

- suffix / index notation
- Einstein summation convention
- Kronecker delta
- Levi--Civita symbol
- contraction
- scalar / vector / second-order Cartesian tensor
- orthogonal basis transformation
- tensor product / dyadic product の有限次元版
- symmetric / antisymmetric decomposition
- trace
- determinant identities
- cross product の `ε_{ijk}` 表現
- `εε` contraction identity
- gradient of vector field
- divergence of second-order tensor
- stress tensor
- inertia tensor
- isotropic tensor の基本形

**停止線**：

- general covariant / contravariant tensor calculus
- Christoffel symbols
- covariant derivative
- tensor on manifolds

は微分幾何系列へ送る。

---

### VC8 potential theory・Helmholtz decomposition

**tier: advanced-standard**

役割：scalar/vector potential と場の分解を、電磁気・流体へ使える形で正本化する。

主な内容：

- irrotational field と scalar potential
- solenoidal field と vector potential
- gauge freedom
- `R^3` の Newton kernel
- compact support または十分速い減衰条件
- Helmholtz decomposition
- harmonic ambiguity と境界条件
- longitudinal / transverse の見方
- electrostatic / gravitational field
- magnetostatic field
- incompressible velocity / vorticity への接続

代表形：

$$
F
=
-\nabla \phi
+
\nabla\times A
$$

証明では「適当に potential が存在する」とせず、積分表示・微分交換・境界無限遠項が消える条件を局所的に確認する。

**依存**：VC5 + PDE6 を標準候補とする。PDE6 の Green / fundamental-solution machinery を重複構築しない。

---

### VC9 数理物理への統合：保存則・流体・Maxwell

**tier: advanced-standard-bridge**

役割：VC1--VC8 を、後続の Navier--Stokes・電磁気・連続体力学へ接続する。

主な内容：

- continuity equation
- integral conservation law と differential conservation law
- source term
- material derivative の入口
- incompressibility `div u=0`
- vorticity `ω=curl u`
- 2D stream function
- circulation / flux
- tensor divergence と momentum balance
- Maxwell equations の integral / differential form の対応
- Gauss law / Faraday law / Ampère--Maxwell law を積分定理で結ぶ
- boundary / interface 条件の入口

本章は物理学そのものを網羅せず、**ベクトル解析の構造が物理法則をどう結ぶか**を主題とする。

Navier--Stokes の存在理論、電磁場の波動方程式、相対論的 tensor formulation は後続系列へ送る。

---

## 4. 推奨読順と依存 DAG

基本骨格：

```text
RA6 / RA7 / 線形代数
        │
        ↓
       VC1
      /   \
     ↓     ↓
   VC2    VC3
     \     /
      \   /
       VC4  ─────────────→ PDE6
        │                    │
        ↓                    ↓
       VC5                 PDE7 / GPDE
      /   \
     ↓     ↓
   VC6    VC7
      \    /
       \  /
        VC8  ←──────────── PDE6
         │
         ↓
        VC9
         │
   ┌─────┼──────────┐
   ↓     ↓          ↓
Navier  Maxwell   continuum
Stokes            mechanics
```

より具体的な prerequisite 候補：

| 章 | direct prerequisites 候補 |
|---|---|
| VC1 | RA6A + F0-00E / LA1 |
| VC2 | VC1 + RA4 |
| VC3 | VC1 + RA7 + LA3C |
| VC4 | VC2 + VC3 + RA7 |
| VC5 | VC2 + VC3 + VC4 |
| VC6 | VC5 |
| VC7 | VC1 + LA1 + LA3C |
| VC8 | VC5 + PDE6 |
| VC9 | VC7 + VC8 |

実装時には各章の `chapter.yaml` と knowledge DAG を確認して direct prerequisite を最小化する。

---

## 5. PDE6 の再配置方針

VC4 完成後、PDE6 を軽量化する。

### VC 側へ canonical owner を移すもの

- vector field
- divergence
- flux
- outward unit normal の一般的定義
- planar / spatial divergence theorem
- finite decomposition による内部境界相殺

### PDE6 に残すもの

- normal derivative `∂_n u`
- `div(u grad v)` からの Green 第一恒等式
- Green 第二恒等式
- Dirichlet / Neumann uniqueness
- fundamental solution
- punctured-domain argument
- Green representation
- Dirichlet Green function
- Poisson kernel との対応

PDE6 の既存証明は削除前に内容を棚卸しし、VC4 に移すべき証明部分と PDE 固有部分を分離する。既存の丁寧な「内部境界で反対向き法線により flux が相殺する」論証は VC4 の主要証明へ移植する。

---

## 6. 演習設計

DREAM THEATER 現行規約に従い、ロードマップ章を除く各 VC 章は理由付き例外がなければ最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。

### Level A

定義を直接使う計算・確認。

例：

- grad/div/curl の手計算
- 曲線・曲面 parametrization
- line / surface integral
- 円柱・球座標での微分演算子
- `δ_{ij}`, `ε_{ijk}` contraction

### Level B

主要定理を実際に使う。

例：

- Green theorem で循環を面積分へ変換
- divergence theorem で閉曲面 flux を計算
- Stokes theorem で境界線積分を計算
- conservative 判定と potential 構成
- tensor divergence と balance law
- Helmholtz decomposition の具体例

### Level C

複数章を統合する。

例：

- 穴あき領域で `curl F=0` なのに circulation が消えない理由を topology と積分で説明
- 球対称場について Gauss theorem と spherical coordinate の両方から flux / divergence を照合
- Maxwell の積分形から微分形を導き、必要な正則性・領域仮定を確認
- incompressible flow の velocity / vorticity / stream function を同一問題で結ぶ

問題数を満たすためだけに同型計算を水増ししない。

---

## 7. 証明品質の重点監査

ベクトル解析では特に次を「公式だから」で飛ばさない。

1. parametrization の向きが line / surface integral の符号へどう入るか
2. surface normal と boundary orientation の整合
3. Green / Gauss / Stokes の domain 仮定
4. 内部境界の cancellation
5. simply connected / star-shaped 等の topology 仮定が potential existence のどこで必要か
6. 曲線座標で basis vector が位置依存すること
7. `1/r`, `1/r^2` 型特異場で原点を含むか否か
8. Helmholtz decomposition の decay / boundary 条件
9. tensor 記法で free index と dummy index を混同しないこと
10. 積分形から微分形へ移る際の「任意の領域」仮定

反例では結論が壊れるだけでなく、失われた仮定と証明機構を説明する。

---

## 8. 実装フェーズ

### Phase 0：正本・重複棚卸し

- PDE6 の vector-calculus 相当部分を block 単位で `move / keep / rewrite` に分類
- RA6 / RA7 の既存内容と重複しないことを確認
- tensor / curvilinear / Helmholtz の既存正本がないことを再確認
- chapter ID、concept ID、anchor 命名を確定

### Phase 1：積分定理までの必須主線

順序：

```text
VC1 → VC2 → VC3 → VC4
```

ここまでを完成させた時点で PDE6 の prerequisite を VC4 へ接続できる。

### Phase 2：Stokes と曲線座標（実装完了 2026-09-22）

```text
VC5 → VC6
```

古典ベクトル解析として Green / Gauss / Stokes と Cartesian / cylindrical / spherical coordinate の一周を閉じる。

### Phase 3：理論物理向け拡張

```text
VC7 → VC8 → VC9
```

Cartesian tensor、Helmholtz decomposition、保存則・流体・Maxwell bridge を整備する。

### Phase 4：PDE6 再監査

- PDE6 から重複する発散定理証明を VC4 へ移送
- PDE6 の本文導線を Green identity / Green function 中心へ再編集
- chapter.yaml / knowledge DAG / standard math core / reader index を同期
- PDE6 の演習が VC 前提化によって不自然になっていないか再査読

---

## 9. index / DAG 反映方針

未完成章を `dream-theater-index.json` に先行登録しない。

実装済み章から順に、

- 各章の `knowledge.yaml`（DREAM THEATER concept owner / requires の正本）
- `textbook/dream-theater-standard-math-core.yaml`
- `textbook/dream-theater-standard-math-core.md`
- `textbook/dream-theater.md`
- `textbook/dream-theater-index.json`

へ反映する。

`textbook/knowledge-dag.yaml` と `textbook/dependency-graph.md` は共通依存関係の正本として継続して照合する。一方、DREAM THEATER 固有 concept の登録は `textbook/dream-theater-knowledge.yaml` のポリシーに従い、各ページ直下の `knowledge.yaml` へ置く。CI を通すためだけに通常教材側の knowledge DAG へ VC concept を重複登録しない。

読者向けには「標準実解析」「標準線形代数」と並ぶ **標準ベクトル解析コア** として配置し、Encore II の下位補助章にはしない。

PDE 側からは VC4 への direct dependency を明示し、VC5--VC9 を PDE6 の必須 prerequisite にしない。

---

## 10. 機械検証

各章の実装・改稿時は現行 DREAM THEATER 規約に従い、少なくとも

```text
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
```

を実行する。

knowledge / standard math core を変更した場合は対応する strict validation も実行する。

また、数式を含む機械編集後は単独行の `$` がないことを確認する。

---

## 11. 完了条件

VC 系列を「学部標準ベクトル解析として完了」とみなすには、少なくとも次を満たす。

- grad/div/curl/Laplacian の定義・幾何的意味・主要恒等式が閉じている
- line / surface / volume integral を向き込みで扱える
- Green / Gauss / Stokes の仮定・証明・典型適用が揃う
- conservative / irrotational / solenoidal と topology の関係を反例込みで説明できる
- cylindrical / spherical を含む orthogonal curvilinear coordinates が使える
- Cartesian tensor / index notation を後続物理で使える
- Helmholtz decomposition の仮定と gauge freedom を理解できる
- 保存則・非圧縮流・Maxwell へ接続できる
- PDE6 が VC4 を正本として参照し、発散定理を局所再実装していない
- 各章が本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答を持つ
- prerequisite 外の微分形式・多様体・共変微分を暗黙使用していない

---

## 12. 最終像

```text
標準実解析 RA6 / RA7
        +
標準線形代数
        │
        ↓
標準ベクトル解析 VC1--VC5
        │
        ├────────→ PDE6 / PDE7 / Graduate PDE
        │
        ├────────→ VC6 直交曲線座標
        │
        ├────────→ VC7 Cartesian tensor
        │
        └────────→ VC8 Helmholtz
                         │
                         ↓
                    VC9 数理物理 bridge
                   /      |       \
                  ↓       ↓        ↓
              Navier   Maxwell   continuum
              Stokes             mechanics

別系列：
VC5 ──→ 微分形式・一般 Stokes ──→ 微分幾何
```

この構成では、ベクトル解析は「PDE6 の不足を埋める章」ではなく、**Euclidean な多変数解析を積分定理・場・物理へ完成させる独立の学部数学系列**になる。
