# DREAM THEATER：Encore III 後続 PDE 拡張計画

作成日: 2026-09-19

## 0. 位置付け

この文書は、新 Encore III `GPDE1`--`GPDE10` の必須主線には入れない PDE 理論を、別系列として計画する台帳である。

Encore III は distributional / variational / energy solution を中心とする大学院 PDE 基礎で閉じる。以下の理論は、必要とする「解」の概念と証明機構が大きく異なるため、一つの弱解章へ詰め込まない。

## 1. Track A：半群・mild solution・抽象発展方程式

### 目的

GPDE10 で bridge として触れる mild solution を、関数解析として独立に正本化する。

```text
closed operator
  ↓
C0 semigroup
  ↓
generator
  ↓
Hille--Yosida
  ↓
variation of constants / Duhamel
  ↓
mild solution
  ↓
analytic semigroup / parabolic PDE
```

候補論点：

- strongly continuous semigroup
- infinitesimal generator
- resolvent estimate
- Hille--Yosida theorem
- abstract Cauchy problem
- mild / strong / classical solution の比較
- Duhamel formula
- heat semigroup
- analytic semigroup は advanced

関数解析 FA 系列の closed operator / spectrum の整備状況を確認してから着手する。

## 2. Track B：保存則・entropy solution

PDE1 で古典解の破綻まで扱った Burgers 方程式を正本の入口とする。

```text
u_t + f(u)_x = 0
  ↓
distributional weak solution
  ↓
Rankine--Hugoniot
  ↓
weak solution の非一意性
  ↓
entropy condition
  ↓
entropy solution / uniqueness
```

候補論点：

- scalar conservation law
- shock / rarefaction
- Rankine--Hugoniot condition
- entropy pair
- Lax / Oleinik 型条件
- Kruzhkov entropy solution
- $L^1$ contraction と uniqueness

**重要**：entropy condition は「より弱い解」ではなく、distributional weak solution の中から物理的・数学的に適切な解を選別する追加条件として説明する。

## 3. Track C：Hamilton--Jacobi・viscosity solution

Sobolev の部分積分型弱形式では扱いにくい完全非線形・一階非線形 PDE の別文化として独立させる。

候補論点：

- Hamilton--Jacobi equation
- subsolution / supersolution
- smooth test function による contact
- viscosity solution
- stability under uniform limits
- comparison principle
- uniqueness
- Perron method
- Hamilton--Jacobi--Bellman への接続

```text
classical derivative を要求しない
          +
最大・最小原理 / comparison を保存したい
          ↓
viscosity solution
```

確率制御・HJB へ接続する場合は確率過程側との依存を別途確認する。

## 4. Track D：非線形変分 PDE・monotone operator

Lax--Milgram の線形理論を非線形へ拡張する。

候補論点：

- convex energy functional
- direct method of calculus of variations
- weak lower semicontinuity
- monotone operator
- Browder--Minty
- $p$-Laplacian
- nonlinear elliptic weak solution
- compactness と nonlinear limit passage

GPDE5 の compactness と GPDE8 の energy estimate を直接利用する重要な後続候補とする。

## 5. Track E：Navier--Stokes・Leray--Hopf weak solution

Navier--Stokes は「弱解一般」の例として軽く消費せず、独立した発展系列にする。

候補論点：

- incompressible Euler / Navier--Stokes
- divergence-free function spaces
- Helmholtz projection
- energy inequality
- Galerkin approximation
- compactness
- Leray--Hopf weak solution
- weak / strong solution
- partial regularity の位置付け

三次元の global regularity は未解決問題であることと、「weak solution の存在」と「smooth solution の global regularity」を明確に分離する。

## 6. Track F：rough data・renormalized / measure-valued solution

これはさらに発展扱いとする。

候補論点：

- $L^1$ data
- renormalized solution
- truncation methods
- measure data
- Young measure
- measure-valued solution

Encore III の standard route へは逆輸入しない。

## 7. Track G：Geometric Analysis

幾何学系列が完成した後に GPDE 系列と合流させる。

前提候補：

```text
manifold / tangent bundle / differential forms
Riemannian metric / volume form / connection
        +
Sobolev / weak PDE / elliptic theory
        ↓
geometric analysis
```

候補論点：

- Laplace--Beltrami operator
- weak formulation on Riemannian manifolds
- Sobolev spaces on manifolds
- heat equation / heat kernel on manifolds
- Hodge Laplacian
- harmonic functions / harmonic maps
- Lie group 上の Laplacian と Brownian motion への接続

幾何学側の canonical definitions を先に確立し、Euclidean PDE の記法をそのまま無断で曲がった空間へ持ち込まない。

## 8. 優先順位

Encore III 完成後の標準的な優先順は次を候補とする。

```text
GPDE10
  ├── Track A semigroup / mild solution
  ├── Track D nonlinear variational PDE
  ├── Track B conservation laws / entropy
  └── Track C viscosity solution

geometry 系列完成後
  └── Track G geometric analysis

必要性が生じた時だけ
  ├── Track E Navier--Stokes
  └── Track F renormalized / measure-valued
```

Track 間の順序は強制しない。それぞれ異なる PDE 構造を対象にするため、必要な前提が閉じたものから独立系列として実装する。

## 9. 設計原則

- 「weak solution」という一語の下に異質な解概念をまとめない。
- 各解概念について、何を保存するために定義されたかを中心に説明する。
- uniqueness が壊れる場合は、どの追加条件が選択原理になるかを示す。
- compactness を使う場合、どの topology で何が収束し、どの非線形項へ極限を通すかを明示する。
- 未解決問題と既知の existence theory を混同しない。
- Encore III の証明へ後続理論を逆輸入しない。
