# DREAM THEATER：多様体・微分幾何 再編計画

作成日: 2026-09-22

## 0. 位置付け

この文書は、DREAM THEATER に学部数学・理論物理系を想定した **多様体・微分幾何系列**を新設するための設計台帳である。

現在の標準数学コアでは、位相・実解析・線形代数・ベクトル解析・ODE/PDE が既に独立系列として整備されている。特に VC 系列は Euclid 空間上の曲線・曲面・積分定理・テンソル計算・Helmholtz 分解・数理物理への橋までを扱い、一般多様体・微分形式・接続・曲率は意図的に停止線の外へ置いている。

本系列ではその停止線の先を canonical に受け持ち、

- 滑らかな多様体と滑らかな写像
- 接空間・余接空間・ベクトル束
- はめ込み・埋め込み・部分多様体
- 1 の分割
- ベクトル場・流れ・Lie 括弧
- 線形分布と Frobenius の定理
- テンソル場・微分形式・外微分
- 多様体上の積分と一般 Stokes の定理
- de Rham コホモロジーへの入口
- Euclid 空間内の曲線・超曲面
- Riemann 計量
- アフィン接続・Levi-Civita 接続
- 測地線・指数写像・正規座標
- Hopf--Rinow の定理
- Riemann 曲率・断面曲率・Ricci 曲率・スカラー曲率
- 変分公式・Jacobi 場・共役点
- 比較幾何
- Gauss--Bonnet の定理

までを、学部標準の一本の主線として整備する。

Lie 群・Lie 環は幾何学本線へ必須 prerequisite とせず、後述する独立系列 `LIE1--LIE4` として分離する。

---

## 1. 範囲校正に用いる基準書

本計画の学部標準範囲は、主として次の 3 冊を上限・配置の校正に用いる。

1. 松本幸夫『多様体の基礎』東京大学出版会  
   https://www.utp.or.jp/book/b302120.html
2. 落合卓四郎『微分幾何入門 上』東京大学出版会  
   https://www.utp.or.jp/book/b302145.html
3. 落合卓四郎『微分幾何入門 下』東京大学出版会  
   https://www.utp.or.jp/book/b302146.html

松本本では、多様体、接空間、はめ込み・埋め込み、1 の分割、ベクトル場、積分曲線、微分形式、外微分、Stokes の定理までが多様体論の基礎主線として扱われる。

落合上巻では、Euclid 空間・超曲面・形作用素・構造方程式・可微分多様体・線形分布・微分形式・多様体上の積分・Gauss--Bonnet が扱われる。

落合下巻では、Lie 群、アフィン接続、Riemann 計量、Levi-Civita 接続、変分公式、指数写像、正規凸近傍、Hopf--Rinow、断面曲率、共役点、Morse 指数定理、比較定理までが扱われる。

本教材ではこれらをそのまま章順へ写さず、既存 DREAM THEATER の canonical owner を再利用し、重複を避けた依存 DAG に組み替える。

---

## 2. 設計目標

系列完了時に、読者が prerequisites だけを既知として次を自力再構成できることを目標とする。

1. 滑らかな多様体を chart / atlas / 座標変換から定義し、具体例の滑らかさを検証できる。
2. 接ベクトルを曲線・derivation・局所座標表示の間で行き来し、写像の微分を座標に依存しない対象として扱える。
3. 階数定理から immersion / submersion / regular value / embedded submanifold を導き、具体的な level set の次元を判定できる。
4. 1 の分割を局所データの大域化に使い、なぜ paracompactness / second countability が必要か説明できる。
5. ベクトル場の積分曲線と局所流を ODE から構成し、Lie 括弧 を flow と derivation の両面から理解できる。
6. Frobenius の定理で「線形分布がいつ部分多様体へ積分できるか」を判定できる。
7. 外積代数・微分形式・pullback・外微分を計算し、`d^2=0` を証明できる。
8. 多様体の向き・境界向き・微分形式の積分を定義し、一般 Stokes の定理を局所座標と 1 の分割から証明できる。
9. Green、Gauss--Ostrogradsky、Kelvin--Stokes、微積分学の基本定理を一般 Stokes の特殊例として回収できる。
10. closed / exact の違いを topology と結びつけ、Poincaré の補題と低次 de Rham コホモロジーを具体計算できる。
11. Euclid 空間内の曲線・超曲面について第一・第二基本形式、形作用素、主曲率、Gauss 曲率、平均曲率を計算できる。
12. Riemann 計量から長さ・距離・体積を構成し、Euclid 幾何の座標公式を一般化できる。
13. Levi-Civita 接続を「metric compatible + torsion free」の一意な接続として構成できる。
14. 測地線・指数写像・Gauss の補題・正規座標・正規凸近傍を理解し、Hopf--Rinow の各同値条件を追える。
15. Riemann 曲率テンソル・断面曲率・Ricci 曲率・スカラー曲率の関係を説明し、定曲率空間で計算できる。
16. 第一・第二変分公式から Jacobi 方程式を導き、共役点と局所最短性の関係を説明できる。
17. 代表的な比較定理で曲率仮定が距離・共役点・完備性へどう効くか説明できる。
18. Gauss--Bonnet の定理で局所曲率と Euler 標数が結ばれることを、曲面の具体例で検証できる。

---

## 3. 既存正本との役割分担

### 3.1 位相との境界

既存正本：

- TOP1：生成位相・積・商
- TOP2：同値関係による商空間・貼り合わせ
- TOP3：連結性・弧状連結性
- TOP4：Hausdorff・第二可算等
- TOP5 / TOP5A：コンパクト性・局所コンパクト性・Urysohn の補題
- TOP6 / TOP7：Baire・net/filter・一様構造

多様体の定義に必要な Hausdorff・第二可算・局所 Euclid 性は GEO 系列で再証明せず、TOP4 を canonical reference とする。

商多様体・貼り合わせ例で商位相を使う際は TOP1 / TOP2 へ stable anchor 参照する。

### 3.2 実解析との境界

既存正本：

- RA3：微分法
- RA4：Riemann 積分
- RA6 / RA6A：Fréchet 微分・逆関数定理・陰関数定理
- RA7：多重 Riemann 積分・変数変換

多様体上の局所座標計算は RA6A を基礎とし、regular value theorem / submanifold theorem は階数定理へ接続する。

多様体上の積分で使う変数変換は RA7 を canonical reference とし、Euclid 空間上の変数変換公式を重複証明しない。

### 3.3 線形代数との境界

既存正本：

- LA3A：代数的双対
- LA3B--LA3D：行列式・交代多重線形形式
- LA5 / LA6：内積・随伴・スペクトル

一般の tensor product、`T^r_s V`、外積代数 `Λ^kV^*`、wedge product は現状 canonical owner がないため、GEO 系列に先立ち **LA3E「テンソル積・外積代数」**を追加する。

LA3E は微分形式の代数的前提に限定し、一般表現論や tensor category へ広げない。

### 3.4 ベクトル解析との境界

VC1--VC9 は Euclid 空間での具体計算を canonical owner とする。

特に、

- VC2：曲線・線積分・保存場
- VC3：曲面・向き・曲面積分
- VC4：Green / Gauss--Ostrogradsky
- VC5：Kelvin--Stokes
- VC7：Cartesian tensor
- VC9：流体・Maxwell

は GEO 系列で再実装しない。

GEO8 の一般 Stokes は、これらを「特殊例として統一する一般構造」の canonical owner とする。VC 側は具体計算、GEO 側は座標不変な構造という役割分担にする。

### 3.5 ODE との境界

ベクトル場の積分曲線・局所流、測地線方程式、Jacobi 方程式は ODE の存在一意性を使う。

基本依存は ODE1 / ODE4 とし、各幾何章では ODE の existence theorem を再証明しない。

### 3.6 PDE・確率解析との橋

GEO 系列完了後、次の後続理論へ自然に接続できるようにする。

- Laplace--Beltrami 作用素 → PDE / spectral geometry
- Riemannian volume → geometric analysis
- Levi-Civita connection / geodesic → manifold-valued ODE
- Stratonovich calculus → manifold-valued SDE
- Lie 群系列 → Lie group valued stochastic process
- curvature / Ricci → geometric PDE / mathematical physics

ただし、これら後続理論を GEO の証明へ逆輸入しない。

---

## 4. 補助章：LA3E テンソル積・外積代数

**tier: core-advanced-standard bridge**

**prerequisites:** LA3A, LA3D

主な内容：

- tensor product の普遍性
- `V⊗W` の基底と次元
- 共変・反変 tensor の代数的定義
- tensor product と contraction
- alternating tensor
- antisymmetrization
- exterior power `Λ^kV^*`
- wedge product
- graded commutativity
- decomposable form
- top form と determinant の LA3D との接続
- interior product の代数版

主要結果：

- `dim Λ^kV^*=binom(n,k)`
- wedge product の結合性・graded commutativity
- top form の基底変換と determinant
- contraction / interior product の基本恒等式

停止線：

- tensor field は GEO7
- differential form は GEO7
- Hodge star は GEO12 以降
- representation theory は LIE 系列にも持ち込まない

---

## 5. 多様体主線：GEO1--GEO9

### GEO1 滑らかな多様体・滑らかな写像

**tier: core**

**prerequisites:** TOP4, RA6A

主な内容：

- topological manifold
- coordinate chart
- atlas
- compatible charts
- maximal smooth atlas
- smooth manifold
- smooth function / smooth map
- diffeomorphism
- local coordinates
- product manifold
- sphere, torus, projective space の基本例

主要結果：

- smooth compatibility の同値関係
- product manifold の smooth structure
- smoothness の chart independence
- compact Hausdorff domain からの典型的同相同定

直接例：

- `S^1`, `S^n`
- `T^n`
- `RP^n`
- 開集合 `U⊂R^n`

### GEO2 接空間・余接空間・微分・接束

**tier: core**

**prerequisites:** GEO1, LA3A

主な内容：

- tangent vector as derivation
- curve equivalence による tangent vector
- coordinate basis
- tangent map / differential
- chain rule
- cotangent space
- pullback of covectors
- tangent bundle / cotangent bundle
- vector bundle の最小限の定義

主要結果：

- curve 定義と derivation 定義の同値
- `d(g∘f)=dg∘df`
- tangent bundle の局所 trivialization

### GEO3 階数定理・はめ込み・沈め込み・部分多様体

**tier: core**

**prerequisites:** GEO2, RA6A

主な内容：

- rank of smooth map
- constant rank theorem
- immersion
- submersion
- embedding
- embedded submanifold
- regular point / critical point
- regular value
- level set
- inclusion の differential

主要結果：

- constant rank theorem
- regular level set theorem
- submanifold local normal form
- tangent space of level set `T_pM=ker df_p`

### GEO4 1 の分割・局所化・埋め込み

**tier: core-advanced-standard**

**prerequisites:** GEO3, TOP5A

主な内容：

- locally finite family
- refinement
- bump function on manifolds
- partition of unity subordinate to an open cover
- local data の gluing
- global Riemann metric の存在への橋
- smooth embedding theorem の位置付け

証明責務：

- second countable smooth manifold の paracompactness に必要な位相事実を明示
- subordinate partition of unity の構成は核心証明まで閉じる
- Whitney 型 embedding theorem は、採用する版の proof dependency を事前に分解する。大規模 transversality を必要とする強い版を安易に黒箱化しない
- 本系列で完全証明可能な Euclid embedding 版を canonical theorem として選定する

### GEO5 ベクトル場・積分曲線・局所流・Lie 括弧

**tier: core**

**prerequisites:** GEO2, ODE1, ODE4

主な内容：

- smooth vector field
- derivation on `C∞(M)`
- integral curve
- maximal integral curve
- local flow
- complete vector field
- pushforward of vector fields
- Lie 括弧
- bracket as commutator of derivations
- flow による bracket の解釈

主要結果：

- 局所座標での積分曲線存在一意性
- maximal flow の局所群則
- Lie 括弧 の coordinate formula
- Jacobi identity

### GEO6 線形分布・Frobenius の定理

**tier: advanced-standard**

**prerequisites:** GEO3, GEO5

主な内容：

- smooth distribution
- integral manifold
- involutive distribution
- local frame
- adapted coordinates
- Frobenius theorem

主要結果：

- integrable `⇒` involutive
- involutive `⇒` locally integrable
- adapted coordinate form

直接例：

- level set の tangent distribution
- contact-type nonintegrable distribution
- Euclid 空間の constant distribution

証明責務：

Frobenius の核心証明を「標準的」で飛ばさず、局所 flow・straightening・帰納的座標構成のどの方法を採用するかを章内で固定する。

### GEO7 テンソル場・微分形式・外微分

**tier: core**

**prerequisites:** GEO2, GEO5, LA3E

主な内容：

- tensor field
- differential form
- wedge product
- pullback
- exterior derivative
- coordinate formula
- `d^2=0`
- interior product
- Lie derivative の入口
- Cartan の公式

主要結果：

- pullback と wedge の可換性
- `d(f^*ω)=f^*(dω)`
- `d^2=0`
- Cartan formula `L_X=d i_X+i_X d`

### GEO8 向き・多様体上の積分・一般 Stokes の定理

**tier: core**

**prerequisites:** GEO4, GEO7, RA7, VC5

主な内容：

- orientation of manifold
- orientation atlas
- orientation form
- manifold with boundary
- boundary orientation
- compactly supported top form
- integration in charts
- partition of unity による global integral
- change of coordinates
- Stokes theorem

主要結果：

`∫_M dω = ∫_{∂M} ω`

証明責務：

- half-space chart 上の局所計算
- compact support による有限化
- partition of unity による局所化
- internal cancellation
- boundary orientation の符号

を明示し、主要 Stokes theorem の核心証明を閉じる。

VC4 / VC5 の Green・Gauss--Ostrogradsky・Kelvin--Stokes は特殊例として stable anchor 参照する。

### GEO9 Poincaré の補題・de Rham コホモロジー入門

**tier: advanced-standard**

**prerequisites:** GEO7, GEO8, TOP3

主な内容：

- closed form / exact form
- Poincaré lemma
- homotopy operator
- de Rham complex
- `H^k_dR(M)`
- smooth homotopy invariance の入口
- `S^1`, punctured plane, contractible domain の低次例

主要結果：

- star-shaped domain 上の Poincaré lemma
- `H^1_dR(S^1)` の具体計算
- VC2 / VC5 の「curl-free だが potential がない」現象の再解釈

停止線：

- singular homology
- de Rham theorem
- Mayer--Vietoris の一般論
- characteristic classes

は代数的位相幾何系列へ送る。

---

## 6. 曲面・Riemann 幾何主線：GEO10--GEO19

### GEO10 Euclid 空間の曲線・超曲面 I：基本形式と形作用素

**tier: core-advanced-standard**

**prerequisites:** GEO3, VC2, VC3, LA5

主な内容：

- regular curve
- arc length parameter
- curvature / torsion
- Frenet frame
- hypersurface
- unit normal field
- first fundamental form
- Gauss map
- shape operator
- second fundamental form
- principal curvature
- Gauss curvature / mean curvature

直接例：

- plane
- sphere
- cylinder
- torus の局所計算

### GEO11 Euclid 空間の超曲面 II：構造方程式・Gauss--Codazzi・基本定理

**tier: advanced-standard**

**prerequisites:** GEO10, GEO6, GEO9

主な内容：

- Gauss formula
- Weingarten formula
- Gauss equation
- Codazzi equation
- structure equations
- fundamental theorem of hypersurfaces
- rigidity
- constant curvature hypersurfaces

主要結果：

- intrinsic Gauss curvature と extrinsic shape operator の関係
- Gauss の Theorema Egregium への橋

### GEO12 Riemann 計量・長さ・距離・体積

**tier: core**

**prerequisites:** GEO4, GEO7, GEO8, LA5, VC1

主な内容：

- Riemann metric
- existence of Riemann metrics via partition of unity
- musical isomorphisms
- gradient
- length of curve
- energy
- Riemannian distance
- isometry
- Riemannian volume form
- divergence / Laplace--Beltrami の入口

主要結果：

- Riemannian distance が manifold topology を誘導すること
- metric volume の座標表示
- Euclid の grad/div/Laplacian と VC 系列の対応

### GEO13 アフィン接続・Levi-Civita 接続・平行移動

**tier: core**

**prerequisites:** GEO5, GEO12

主な内容：

- affine connection
- covariant derivative
- covariant derivative along a curve
- parallel vector field
- parallel transport
- torsion
- metric compatibility
- Christoffel symbols
- Levi-Civita connection
- Koszul formula

主要結果：

- Levi-Civita connection の存在一意性
- coordinate Christoffel formula
- tensor field の covariant derivative

### GEO14 測地線・指数写像・正規座標

**tier: core**

**prerequisites:** GEO13, ODE4

主な内容：

- geodesic equation
- existence / uniqueness
- exponential map
- differential of exponential map
- Gauss lemma
- normal coordinates
- radial geodesic
- normal neighborhood
- convex normal neighborhood

主要結果：

- geodesic の局所最短性
- normal coordinates で Christoffel symbols が基点で消えること
- Gauss lemma

### GEO15 完備性・Hopf--Rinow

**tier: advanced-standard**

**prerequisites:** GEO14, TOP5

主な内容：

- geodesic completeness
- metric completeness
- minimizing geodesic
- compact closed ball
- Hopf--Rinow theorem
- cut point / cut locus の入口

証明責務：

Hopf--Rinow は本系列の主要定理として核心証明を閉じる。局所正規近傍、延長可能性、閉有界集合のコンパクト性がどこで使われるかを追える形にする。

### GEO16 Riemann 曲率

**tier: core-advanced-standard**

**prerequisites:** GEO13, GEO11

主な内容：

- curvature operator
- Riemann curvature tensor
- symmetries
- first / second Bianchi identity
- sectional curvature
- Ricci curvature
- scalar curvature
- constant curvature space
- Gauss equation
- intrinsic / extrinsic curvature の接続

主要結果：

- sectional curvature から Riemann tensor が復元されること
- 2 次元では Gauss curvature が sectional curvature に一致すること
- Euclid / sphere / hyperbolic model の曲率計算

### GEO17 変分公式・Jacobi 場・共役点

**tier: advanced-standard**

**prerequisites:** GEO14, GEO16

主な内容：

- variation of curves
- first variation of energy / length
- second variation
- Jacobi equation
- Jacobi field
- conjugate point
- differential of exponential map と Jacobi field
- index form
- local minimizing property

主要結果：

- geodesic が energy の臨界点であること
- Jacobi equation
- conjugate point と `d exp` の退化の対応

### GEO18 比較幾何入門

**tier: advanced-standard**

**prerequisites:** GEO15, GEO17

主な内容：

- model space
- Jacobi field comparison
- Rauch comparison theorem
- Bonnet--Myers theorem
- Cartan--Hadamard theorem
- curvature bound と diameter / conjugate point / topology の関係

証明境界：

代表比較定理を選び、曲率仮定が index form または Jacobi field estimate のどこに入るかを明示する。全てを theorem-name catalog にしない。

### GEO19 Gauss--Bonnet と二次元大域幾何

**tier: advanced-standard capstone**

**prerequisites:** GEO8, GEO11, GEO16

主な内容：

- geodesic curvature
- local Gauss--Bonnet
- triangulation / polygonal decomposition の必要最小限
- global Gauss--Bonnet
- Euler characteristic
- sphere / torus / higher genus surface
- curvature sign と topology

主要結果：

`∫_M K dA = 2π χ(M)`

境界付きの場合は geodesic curvature と corner term を含む版まで扱う。

本章を「局所微分量としての曲率が大域位相不変量へ積分される」幾何編の capstone とする。

---

## 7. Lie 群・Lie 環は別系列とする

Lie 群は落合下巻の主要項目だが、Riemann 幾何主線の必須 prerequisite にはしない。

独立系列 **LIE1--LIE4** を将来実装する。

### LIE1 Lie 群・Lie 環・不変ベクトル場

**prerequisites:** GEO5

- Lie group
- left / right translation
- left-invariant vector field
- Lie algebra
- bracket
- matrix Lie group の基本例

### LIE2 1 パラメータ部分群・指数写像・Adjoint 表現

**prerequisites:** LIE1, ODE4

- one-parameter subgroup
- exponential map
- BCH formula の入口
- Ad / ad representation
- conjugation

### LIE3 Lie 部分群・古典群

**prerequisites:** LIE2, LA6

- Lie subgroup
- closed subgroup theorem の位置付け
- `GL(n)`, `SL(n)`, `O(n)`, `SO(n)`, `U(n)`, `SU(n)`
- tangent Lie algebra の直接計算

### LIE4 Lie 群作用・軌道・等質空間・Maurer--Cartan

**prerequisites:** LIE3, GEO3

- smooth group action
- orbit / stabilizer
- homogeneous space
- infinitesimal action
- Maurer--Cartan form
- Maurer--Cartan equation

停止線：

- representation theory
- semisimple Lie algebra classification
- root systems
- principal bundles / gauge theory

は独立の後続系列へ送る。

---

## 8. 推奨 prerequisite DAG

概略主線：

```text
TOP4 + RA6A
      │
      ▼
    GEO1
      │
      ▼
    GEO2
      │
      ├────────→ GEO3 ───────→ GEO4
      │                       │
      └────────→ GEO5 ─→ GEO6│
                              │
LA3A + LA3D → LA3E ───────┐
GEO2 ──────────────────────────────────┼→ GEO7
GEO5 ──────────────────────────────────┘
                                         │
                                         ▼
                                       GEO8
                         │
                         ▼
                       GEO9

GEO3 + VC3 ─────→ GEO10 → GEO11
GEO4 + GEO7 + GEO8 + LA5 + VC1 ─→ GEO12
GEO5 + GEO12 ─────────────────────→ GEO13
GEO13 + ODE4 ────→ GEO14 → GEO15
GEO13 + GEO11 ───→ GEO16
GEO14 + GEO16 ───→ GEO17
GEO15 + GEO17 ───→ GEO18
GEO8 + GEO11 + GEO16 ─→ GEO19

GEO5 → LIE1 → LIE2 → LIE3 → LIE4
```

direct prerequisite は実装時に各証明を再確認し、単に「先に読んでいると便利」という理由で増殖させない。

---

## 9. 既存系列への再リンク方針

GEO 実装時に、既存章から一般幾何への逆向き依存を追加しない。

つまり、

- VC2--VC5 は GEO8 を prerequisite にしない
- VC7 は LA3E / GEO7 を prerequisite にしない
- STO7 の Stratonovich calculus は GEO13 を prerequisite にしない
- PDE / GPDE は GEO 系列を prerequisite にしない

これにより既存教材の DAG を壊さず、GEO は「一般化として後から読む」系列になる。

GEO 実装後に読者向けの「次に読む」リンクを加えることは許容するが、proof dependency と reader recommendation を混同しない。

---

## 10. 証明責務

DREAM THEATER の現行規約に従い、特に次を theorem-name catalog にしない。

原則として章内または canonical dependency で核心証明まで閉じる主要結果：

- smoothness の chart independence
- tangent vector definitions の同値
- constant rank theorem
- regular level set theorem
- partition of unity
- vector field flow の局所存在一意性
- Jacobi identity
- Frobenius theorem
- `d^2=0`
- Poincaré lemma
- general Stokes theorem
- Levi-Civita existence / uniqueness
- Gauss lemma
- Hopf--Rinow theorem
- curvature tensor symmetries / Bianchi identity
- first / second variation
- Jacobi equation
- representative comparison theorem
- Gauss--Bonnet theorem

ただし、Whitney embedding theorem、Morse index theorem、強い比較定理など、完全証明に独立した大規模理論が必要なものは、実装前に依存を分解し、

1. 本系列で完全証明する版
2. 後続系列へ送る版
3. 技術的入力として境界明示する版

を明示してから採用する。

「証明が長い」だけでは黒箱化しない。

---

## 11. 直接例・反例の基準

各章では主役となる定義を満たすことを実際に式で検証する。

特に次の例を系列全体で必ず扱う。

- `S^n`
- torus `T^n`
- projective space `RP^n`
- cylinder / sphere / torus as submanifolds
- graph submanifold
- regular level set
- non-embedded immersion の例
- vector field with finite-time blow-up / incomplete flow
- integrable / nonintegrable distribution
- exact / closed non-exact 1-form
- punctured plane
- Euclidean metric
- sphere metric
- hyperbolic model
- cylinder / sphere / torus の主曲率
- complete / incomplete Riemannian manifold
- conjugate point on sphere
- nonpositive-curvature example
- sphere / torus の Gauss--Bonnet

反例では、どの仮定を失い、証明のどこが壊れるかまで説明する。

---

## 12. 演習・詳細解答

各変更章は理由付き例外がない限り、

- Level A: 4 題
- Level B: 3 題
- Level C: 1 題

を最低ラインとする。

全問に詳細解答を置く。

幾何編では「定義を言える」だけでなく、少なくとも次の操作を演習で自力実行させる。

- atlas の compatibility 判定
- tangent map の計算
- tangent space の kernel 計算
- regular value 判定
- vector field の integral curve 計算
- Lie 括弧 計算
- integrability 判定
- wedge / pullback / exterior derivative 計算
- orientation / boundary orientation 判定
- Stokes の具体適用
- de Rham class の非自明性判定
- first / second fundamental form 計算
- Christoffel symbol 計算
- geodesic equation の導出
- curvature tensor / sectional curvature 計算
- Jacobi equation
- Gauss--Bonnet による Euler characteristic / total curvature 計算

---

## 13. 実装フェーズ

### Phase 0：代数・依存準備

- LA3E 実装 ✅ 2026-09-22
- standard math core へ LA3E を登録 ✅ 2026-09-22
- knowledge / glossary / terminology を整備 ✅ 2026-09-22

Phase 0 完了。次の実装開始点は **Phase 1：GEO1「滑らかな多様体・滑らかな写像」** とする。

### Phase 1：多様体の基礎

- GEO1 滑らかな多様体・滑らかな写像 ✅ 2026-09-22
- GEO2 接空間・余接空間 ✅ 2026-09-22
- GEO3 階数定理・部分多様体 ✅ 2026-09-22
- GEO4 1 の分割・局所化・埋め込み ✅ 2026-09-22

Phase 1 完了。GEO1 → GEO2 → GEO3 → GEO4 完了。

### Phase 2：ベクトル場・分布・微分形式

- GEO5 ベクトル場・流れ・Lie 括弧 ✅ 2026-09-22
- GEO6 Frobenius ✅ 2026-09-22
- GEO7 テンソル場・微分形式 ✅ 2026-09-22
- GEO8 一般 Stokes ✅ 2026-09-22
- GEO9 de Rham 入門 ✅ 2026-09-22

Phase 2 完了。GEO5 → GEO6 → GEO7 → GEO8 → GEO9 完了。
Phase 3 完了。GEO10 → GEO11 → GEO12 → GEO13 → GEO14 完了。次の実装開始点は **Phase 4：GEO15「完備性・Hopf--Rinow」** とする。

### Phase 3：古典曲面論から Riemann 幾何へ

- GEO10 曲線・超曲面 I ✅ 2026-09-22
- GEO11 超曲面 II ✅ 2026-09-23
- GEO12 Riemann 計量 ✅ 2026-09-23
- GEO13 接続 ✅ 2026-09-23
- GEO14 測地線・指数写像 ✅ 2026-09-23

### Phase 4：大域 Riemann 幾何

- GEO15 Hopf--Rinow
- GEO16 曲率
- GEO17 Jacobi 場・共役点
- GEO18 比較幾何
- GEO19 Gauss--Bonnet

### Phase 5：独立 Lie 系列

- LIE1--LIE4

GEO 系列を全て完了してから Lie 系列へ進む必要はない。GEO5 完了後は LIE1 を並行実装可能だが、reader-facing の標準読順では Riemann 幾何主線を Lie 群なしで完走できるようにする。

---

## 14. reader-facing index / DAG 登録方針

計画ファイルを追加しただけの段階では、

- `textbook/dream-theater-index.json`
- `textbook/dream-theater-standard-math-core.yaml`
- `textbook/dream-theater-standard-math-core.md`
- `textbook/knowledge-dag.yaml`
- `textbook/dependency-graph.md`

へ未実装 GEO / LIE ノードを先行公開しない。

各章は本文・chapter.yaml・knowledge.yaml・glossary.yaml・演習・詳細解答・検証が完成した時点で登録する。

ただし計画を機械可読な implementation batch として管理する必要が生じた場合は、既存 standard math core の status 規約に従って `planned` 登録を別 PR で行う。

---

## 15. 用語方針

既存の日本語用語規約に従う。

本文主表記の例：

- manifold → 多様体
- smooth manifold → 滑らかな多様体
- tangent space → 接空間
- cotangent space → 余接空間
- differential form → 微分形式
- exterior derivative → 外微分
- immersion → はめ込み
- embedding → 埋め込み
- submersion → 沈め込み
- partition of unity → 1 の分割
- vector field → ベクトル場
- flow → 流れ
- affine connection → アフィン接続
- covariant derivative → 共変微分
- parallel transport → 平行移動
- geodesic → 測地線
- sectional curvature → 断面曲率
- conjugate point → 共役点

人名由来の定理名・補題名は人名部分を英字で保持する。

例：

- Frobenius の定理
- Poincaré の補題
- Stokes の定理
- Whitney の埋め込み定理
- Levi-Civita 接続
- Gauss の補題
- Hopf--Rinow の定理
- Jacobi 場
- Rauch の比較定理
- Bonnet--Myers の定理
- Cartan--Hadamard の定理
- Gauss--Bonnet の定理
- Morse 指数定理

---

## 16. 機械検証

各 GEO / LIE 実装 PR では、変更内容に応じて少なくとも次を実行する。

- `npm run validate`
- `npm run validate:pages`
- `npm run validate:dream-theater-exercise-counts`
- `npm run audit:proof-pedagogy`
- `npm run audit:formalism-pedagogy`

standard math core / knowledge DAG を変更した場合は対応する strict validation も実行する。

概念依存監査の scope は `DREAM_THEATER_AUTHORING_STANDARD.md` に従う。通常の GEO / LIE 実装 PR では changed-only strict validation を原則とし、`dream-theater-index.json` への pure-add と新規章の `knowledge.yaml` 追加だけを理由に full audit を要求しない。既存章の `knowledge.yaml`、既存 index path の削除・移動・並べ替え、全体レジストリ・推論規則・監査エンジンを変更した場合は full audit とする。main への push では全体監査を行う。

機械検証 green は完成の十分条件にしない。

---

## 17. 完成条件

幾何編の完成とは、GEO1--GEO19 が単に存在することではない。

独習者が既存 prerequisite と本文だけから、

```text
Euclid 空間の局所計算
  ↓
滑らかな多様体
  ↓
接空間・部分多様体
  ↓
ベクトル場・流れ
  ↓
微分形式
  ↓
一般 Stokes
  ↓
Riemann 計量
  ↓
Levi-Civita 接続
  ↓
測地線・指数写像
  ↓
曲率
  ↓
Jacobi 場・大域幾何
  ↓
Gauss--Bonnet
```

という理論の流れを再構成できる状態を完成とする。

Lie 群はこの主線から独立に、

```text
GEO5 ベクトル場・Lie 括弧
  ↓
LIE1 Lie 群・Lie 環
  ↓
LIE2 指数写像・Adjoint
  ↓
LIE3 古典群
  ↓
LIE4 群作用・等質空間
```

として伸ばす。

この構成により、現在の VC 系列の停止線を自然に引き継ぎつつ、数学科・理論物理系の学部で期待される多様体・微分幾何の主線を、後続の幾何解析・確率解析・数理物理へ接続できる canonical series として整備する。
