# DREAM THEATER 幾何解析計画

作成日: 2026-10-04  
状態: planned

## 0. 目的

本計画は、微分幾何と偏微分方程式 II を合流させ、Riemann 多様体上で Laplace--Beltrami 作用素、Sobolev 空間、楕円型・放物型 PDE、Hodge Laplacian、調和写像を扱うための設計台帳である。

中心となる問いは

> **Euclid 空間で作った弱解・エネルギー・正則性の方法を、座標に依存しない形で曲がった空間へどう移すか。**

である。

---

## 1. canonical owner と責務分担

| 領域 | canonical owner |
|---|---|
| 多様体・接束・微分形式・Riemann 計量・Levi-Civita 接続 | GEO 系列 |
| Euclid 空間上の Sobolev / weak PDE | GPDE 系列 |
| Laplace--Beltrami・manifold Sobolev・幾何 PDE | 本計画 |
| Brown 運動・確率展開・確率平行移動 | DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md |
| Lie 群上の確率 SDE | 同上 |
| 一般 nonlinear diffusion | DREAM_THEATER_NONLINEAR_PDE_PLAN.md |

確率解析 II で Laplace--Beltrami を確率生成作用素として使う場合も、決定論的な定義・積分公式・弱形式は本計画を正本候補とする。

---

## 2. prerequisite 方針

主要候補:

- GEO の多様体・接束・微分形式
- Riemann 計量・体積形式・Levi-Civita 接続
- 1 の分割
- GPDE3--GPDE5 の Sobolev 空間・埋め込み・コンパクト性
- GPDE6--GPDE9 の楕円型弱形式・正則性
- 必要に応じて Hodge star の既存 owner

「幾何学全章」「PDE II 全章」を機械的 prerequisite にせず、章ごとに直接使用する結果を固定する。

---

## 3. コース構成

仮 ID は GA1--GA5 とする。

### GA1 Laplace--Beltrami 作用素・Green 公式・弱形式

扱う内容:

- gradient on a Riemannian manifold
- divergence
- Laplace--Beltrami operator
- volume form
- integration by parts / Green identity
- local-coordinate expression
- weak formulation
- compact manifold と boundary の有無の違い

最小例として

- 円 $S^1$
- 球面 $S^2$
- 平坦トーラス

を使い、局所座標式と幾何学的定義を往復する。

### GA2 多様体上の Sobolev 空間・コンパクト性

扱う内容:

- local chart での Sobolev norm
- partition of unity による貼り合わせ
- 定義の atlas 非依存性
- compact manifold 上の norm equivalence
- weak convergence
- Rellich 型 compact embedding
- Poincaré inequality
- boundary がある場合の trace への入口

Euclid 版を単に「局所座標で同様」とせず、有限 atlas・partition of unity・Jacobian の一様比較がどこで必要か示す。

### GA3 楕円型・熱方程式・熱核

扱う内容:

- Poisson equation on a manifold
- variational solution
- elliptic regularity の局所化
- heat equation
- heat semigroup
- heat kernel
- conservation / symmetry
- compact manifold 上の spectral expansion
- short-time / long-time behavior の入口

確率的表現そのものは SGA 側へ送り、ここでは決定論的 PDE と解析構造を正本化する。

### GA4 Hodge Laplacian・調和形式

扱う内容:

- exterior derivative $d$
- codifferential $d^*$
- Hodge Laplacian
- harmonic forms
- exact / coexact / harmonic の分解
- Hodge decomposition の有限次元的意味
- de Rham cohomology との接続

GEO 側で既に正本化された微分形式・Hodge star を再定義しない。

### GA5 調和写像・幾何学的変分問題

扱う内容:

- map $u:M\to N$ の energy
- tension field
- harmonic map equation
- sphere-valued map の最小例
- weak harmonic map
- energy method
- nonlinear constraint が Euler--Lagrange 方程式へ与える影響
- regularity / singularity theory への入口

一般 geometric flow へ拡張せず、「幾何学的対象が未知関数になる PDE」の最初の代表例として閉じる。

---

## 4. 確率解析 II との境界

DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md は

- manifold-valued SDE
- Brown 運動
- stochastic development
- Malliavin calculus
- Hörmander
- probabilistic heat-kernel representation

を主役とする。

本計画は

- Laplace--Beltrami
- manifold Sobolev
- deterministic heat equation / heat kernel
- Hodge Laplacian
- harmonic maps

を主役とする。

SGA9 で heat kernel を扱う場合、決定論的構成を再証明するのではなく、本計画の result と transition density の対応を説明する。

---

## 5. Lie 群との接続

Lie 群上の bi-invariant / left-invariant metric が使える例では、

- Laplace--Beltrami operator
- invariant vector fields
- heat equation
- heat kernel

を具体例にしてよい。

ただし Lie 群の定義・指数写像・Maurer--Cartan・表現論を本計画で再構築しない。

---

## 6. 本計画に含めないもの

- Ricci flow の完全理論
- mean curvature flow の完全理論
- Yamabe problem の完全証明
- minimal surface theory の体系
- gauge theory
- Yang--Mills equation
- geometric measure theory
- index theorem
- global heat-kernel asymptotics の完全理論
- sub-Riemannian analysis の体系

必要になった場合は独立 PLAN へ分ける。

---

## 7. 証明・教育方針

- 「局所座標で Euclid と同じ」で核心を飛ばさない。
- 座標表示へ移すとき、metric・volume density・Christoffel 記号のどれが入るか示す。
- partition of unity を使うとき、何を局所化し、有限和でなぜ一様評価できるか示す。
- compactness を使うとき、compact manifold の有限 atlas がどこで効くか示す。
- heat kernel の存在・滑らかさ・正値性・保存性を別々の主張として扱う。
- harmonic map では target constraint と Euler--Lagrange 方程式の関係を具体例で確認する。

---

## 8. 演習設計

各章は理由付き例外がなければ最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。

代表題材:

- $S^1$ / $S^2$ の Laplace--Beltrami 計算。
- Green identity の直接確認。
- partition of unity を使う Sobolev norm 比較。
- 平坦トーラスの heat kernel / Fourier 展開。
- $d$, $d^*$, Hodge Laplacian の低次元計算。
- sphere-valued map の energy variation。

---

## 9. 実装順

~~~text
GA1 Laplace--Beltrami・弱形式
  ↓
GA2 manifold Sobolev・compactness
  ↓
GA3 elliptic / heat equation・heat kernel
  ├──→ GA4 Hodge Laplacian
  └──→ GA5 harmonic maps
~~~

GA3 完了後、確率解析 II の SGA9 との cross-reference を固定する。

---

## 10. 完成条件

- Euclid PDE を多様体へ移す際に追加される幾何学的データを説明できる。
- Laplace--Beltrami の幾何学的定義と局所座標式を往復できる。
- manifold Sobolev space を partition of unity から構成できる。
- weak elliptic / heat equation を多様体上で定式化できる。
- Hodge Laplacian と通常の scalar Laplacian の違いを説明できる。
- harmonic map equation が energy variation から出ることを追える。
- 確率解析 II と重複せず、heat kernel の deterministic / stochastic 両面を接続できる。
