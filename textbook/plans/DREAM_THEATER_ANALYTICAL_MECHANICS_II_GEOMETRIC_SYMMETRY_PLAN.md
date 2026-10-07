# DREAM THEATER 解析力学 II：幾何学的力学と対称性 コース計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

解析力学 I の有限自由度 Hamilton 形式を、**シンプレクティック幾何・Lie 群作用・運動量写像・簡約**によって座標不変に再構成する。

中心問いは、

> 対称性を持つ Hamilton 系では、保存量と自由度削減を幾何学としてどう理解するか。

とする。

解析力学 I で扱う cyclic coordinate や有限自由度 Noether の定理を出発点とし、それらが余接束上の Hamilton 作用と運動量写像へ一般化される道筋を閉じる。

## 1. 市販教科書との照合

主参照:

- Jerrold E. Marsden and Tudor S. Ratiu, *Introduction to Mechanics and Symmetry*, Springer  
  https://link.springer.com/book/10.1007/978-0-387-21792-5
- V. I. Arnold, *Mathematical Methods of Classical Mechanics*, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-2063-1
- 伊藤秀一『常微分方程式と解析力学』共立出版  
  https://www.books.or.jp/book-details/9784320015630
- 植田一石『数物系のためのシンプレクティック幾何学入門』サイエンス社  
  https://saiensu.co.jp/search/?isbn=978-4-7819-9936-4&y=2018
- 深谷賢治『シンプレクティック幾何学』岩波書店

Marsden--Ratiu の symmetry / momentum map / reduction を本科目の主線とする。一方、擬正則曲線・Floer 理論等の大域シンプレクティック幾何は本科目の必須範囲にしない。

## 2. prerequisite

必須:

- 解析力学 I（AMECH1--AMECH8）
- 多様体、接空間、微分形式、外微分
- Lie 群・Lie 代数・群作用の基礎
- 線形代数

推奨:

- 微分幾何の接束・余接束
- ODE の流れ
- 群論の商・軌道・安定化部分群

実装時に既存 GEO / LIE / GRP 系列の exact chapter ID を確認して canonical dependency を確定する。

## 3. 章構成

候補 ID: AMECH9--AMECH16。

### AMECH9 シンプレクティック線形代数と Hamilton 構造

- 交代2形式
- 非退化性
- symplectic vector space
- 標準形
- Hamilton 行列
- 線形 Hamilton 系
- symplectic transformation
- 解析力学 I の正準変換との対応

単なる記号導入ではなく、非退化性から Hamiltonian vector field が一意に定まる機構を線形代数で確認する。

### AMECH10 余接束の正準シンプレクティック形式

- configuration manifold $Q$
- tangent bundle $TQ$
- cotangent bundle $T^*Q$
- canonical 1-form
- canonical symplectic form
- Darboux 座標
- Hamiltonian vector field
- Hamilton 方程式の座標表示
- Legendre 変換との関係

$T^*Q$ が「たまたま $q,p$ を並べた空間」ではないことを主眼にする。

### AMECH11 Lie 群作用と無限小生成子

- smooth group action
- orbit / isotropy
- fundamental vector field
- 1-parameter subgroup
- Lie algebra action
- lifted action on $T^*Q$
- invariance of Lagrangian / Hamiltonian

$SO(2)$、$SO(3)$、平行移動群を具体例として扱う。

### AMECH12 Noether の定理と運動量写像

- Hamiltonian group action
- momentum map
- infinitesimal generator と Hamiltonian function
- equivariance
- Noether theorem
- 線形運動量・角運動量
- 解析力学 I の有限自由度 Noether との対応

Noether を「対称性があると保存する」という標語で終えず、運動量写像の各成分が保存される計算を閉じる。

### AMECH13 Poisson 多様体と Lie--Poisson 構造への入口

- symplectic manifold から Poisson bracket
- Poisson tensor
- symplectic leaf
- Lie algebra dual
- Lie--Poisson bracket
- coadjoint action
- coadjoint orbit

Poisson 幾何の一般論を過剰に広げず、剛体・簡約に必要な範囲へ限定する。

### AMECH14 シンプレクティック簡約

- conserved momentum level
- quotient by symmetry
- regular value
- free / proper action
- reduced symplectic form
- Marsden--Weinstein 型簡約
- dimension count
- reduction by stages の入口

仮定を省略せず、「保存量で変数を消す」操作が幾何学的商として成立する条件を明示する。

### AMECH15 剛体と Lie--Poisson 力学

- $SO(3)$ と $mathfrak{so}(3)$
- Euler top
- angular momentum sphere
- coadjoint orbit
- Casimir
- energy-momentum picture
- free rigid body の phase portrait
- relative equilibrium の入口

古典力学 I の剛体を、群・Poisson 幾何・簡約の統合例として再訪する。

### AMECH16 相対平衡・安定性と可積分系への橋

- relative equilibrium
- symmetry-reduced equilibrium
- energy-momentum method の初歩
- symmetry と degeneracy
- conserved quantities in involution
- invariant torus への動機
- 可積分系 PLAN への接続

Liouville--Arnold 定理そのものは INT 系列を canonical owner とする。

## 4. canonical ownership と境界

本科目が canonical owner:

- Hamilton 系のシンプレクティック多様体による座標不変記述
- Hamiltonian Lie 群作用
- 運動量写像
- 幾何学的 Noether
- finite-dimensional symplectic reduction
- Lie--Poisson 力学の入口
- symmetry-reduced rigid body

他系列を参照:

- Lie 群・Lie 代数そのもの: 既存 LIE 系列
- 多様体・微分形式: 既存微分幾何系列
- Lagrange/Hamilton/Poisson/正準変換: 解析力学 I
- Liouville--Arnold / KAM: 可積分系 PLAN
- 一般 Poisson 幾何・接触幾何・Floer 理論: 将来の専門系列

## 5. 教育設計

抽象定義の直後に必ず具体例を置く。

継続例:

- 平面回転と角運動量
- 3次元回転と剛体
- 余接束 $T^*mathbb{R}^n$
- 球面上の coadjoint orbit
- cyclic coordinate を momentum map で再解釈

各章で「座標表示」と「座標不変表示」を往復させ、後者だけを先に提示しない。

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 6. 完成条件

- symplectic form の非退化性から Hamiltonian vector field を構成できる。
- $T^*Q$ の canonical 1-form / 2-form を座標表示まで導ける。
- Lie 群作用から infinitesimal generator を作れる。
- momentum map を定義し、平行移動・回転で計算できる。
- Noether の定理を momentum map の保存として証明できる。
- regularity / free / proper 等の条件を確認して簡約の意味を説明できる。
- Euler top を Lie--Poisson 系として読める。
- 可積分系で「可換な保存量」が重要になる理由を説明できる。

## 7. 実装順

1. 既存 GEO / LIE / AMECH の重複監査
2. AMECH9--AMECH10
3. AMECH11--AMECH12
4. AMECH13--AMECH14
5. AMECH15--AMECH16
6. INT 系列への cross-link
7. knowledge DAG / public index / series manifest
8. 数学的完全性・読者粒度の二系統レビュー
