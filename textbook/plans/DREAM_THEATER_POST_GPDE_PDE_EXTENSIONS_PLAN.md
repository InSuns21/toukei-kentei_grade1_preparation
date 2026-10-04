# DREAM THEATER：Encore III 後続 PDE・HJB・微分ゲーム拡張計画

作成日: 2026-09-19  
更新日: 2026-10-04

## 0. 位置付け

この文書は、新 Encore III `GPDE1`--`GPDE10` の必須主線には入れない PDE 理論を、別系列として計画する台帳である。

Encore III は distributional / variational / energy solution を中心とする大学院 PDE 基礎で閉じる。以下の理論は、必要とする「解」の概念・証明機構・主要な問いが大きく異なるため、一つの弱解章へ詰め込まない。

後続系列では、少なくとも次の三つの問いを区別する。

1. **どの意味で解くか**：distributional / variational / energy / entropy / viscosity / mild など。
2. **なぜ解が存在し、一意で、安定か**：compactness、monotonicity、comparison、semigroup など。
3. **得られた解が時間とともにどう振る舞うか**：尺度変換、自己相似、減衰、長時間漸近、blow-up など。

特に第3の問いは Encore III 本体では体系化しない。後述の Track H で独立に扱う。

### 0.1 canonical ownership と停止線

この計画は、Post-GPDE のうち **Hamilton--Jacobi / HJB / viscosity solution / differential game / stochastic control / stochastic differential game** を Track C の正本として受け持つ。

隣接計画との責務は次のように固定し、同じ理論を複数 PLAN で独立実装しない。

| 領域 | canonical owner |
|---|---|
| 古典 Hamilton--Jacobi・特性曲線・焦散 | 既存 `PDE12` |
| HJB・viscosity solution・微分ゲーム・HJI | 本計画 Track C |
| SDE・Markov generator・Feynman--Kac | 完了済み Encore IV の `STO9` / `STO11` |
| 確率制御・二階 HJB | 本計画 Track C（確率基盤は Encore IV を参照） |
| 確率微分ゲーム・二階 Isaacs 方程式 | 本計画 Track C |
| 数理ファイナンスの最適執行 | `DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md`（Track C の応用） |
| Navier--Stokes の固有理論 | `DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md` |
| 多様体上の確率解析 | `DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md` |
| 静学・反復・Bayesian game の既存正本 | 完了済み `DREAM_THEATER_OPTIMIZATION_ECON_GAME_PLAN.md` |

Mean field game、非ゼロ和の一般微分ゲーム、部分観測制御、jump differential game、一般 H-infinity 制御理論は **本 Track の停止線の外**とする。必要になった時点で独立計画を立て、本 Track では橋だけを置く。

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

PDE8 で Duhamel 原理を具体的 PDE の言葉で正本化している場合、Track A では同じ内容を重複証明せず、抽象発展方程式における variation of constants formula として位置付け直す。

Track A の主眼は **時間発展問題を作用素論として解く枠組み**であり、熱核の具体的な減衰率・尺度変換・長時間漸近は Track H が受け持つ。

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

Track H でも Burgers 型方程式が尺度変換や漸近解析の例として現れうるが、shock 選択・entropy uniqueness の正本は Track B に置く。

## 3. Track C：Hamilton--Jacobi・HJB・viscosity solution・微分ゲーム

### 目的

`PDE12` が古典 Hamilton--Jacobi 方程式と特性曲線・焦散までを正本化している。その先で現れる

- 値関数が一般には滑らかでない
- 最適化により Hamiltonian 自体が `inf / sup` を含む
- 相手の最適反応を入れると HJB が HJI / Isaacs 方程式へ変わる
- 拡散を入れると一階 PDE が二階完全非線形 PDE へ変わる

という四つの変化を、一つの連続した系列として扱う。

中心の見取り図は次とする。

```text
PDE12 classical Hamilton--Jacobi
        ↓
C1 deterministic optimal control / DPP / formal HJB
        ↓
C2 viscosity solution / comparison / stability
        ↓
C3 HJB value characterization
        ├──────────────→ C4 differential game / HJI
        │
STO9 + STO11 ────────→ C5 stochastic control / second-order HJB
                               │
                     C4 ───────┴──────→ C6 stochastic differential game
                                              / second-order HJI
```

「HJB の章」「粘性解の章」「微分ゲームの章」を互いに無関係な外伝として作らず、**dynamic programming が PDE を生み、viscosity solution が値関数の低正則性を受け止め、minimax が HJB を Isaacs 方程式へ変える**という一本の論理で接続する。

### C1：決定論的最適制御・動的計画原理・HJB の導出

代表形

$$
\dot x(s)=f(x(s),u(s)),\qquad
J_{t,x}(u)=g(x(T))+\int_t^T L(x(s),u(s))\,ds
$$

から始める。

候補論点：

- admissible control / controlled ODE
- running cost / terminal cost / value function
- Bellman principle / dynamic programming principle
- 短時間区間 $[t,t+h]$ での展開
- Hamiltonian
- HJB equation の形式導出
- smooth value function を仮定した verification theorem
- 最小の LQR / bang-bang 例
- Pontryagin maximum principle との役割差は bridge として整理

ここではまず **なぜ HJB が出るのか**を閉じる。値関数の微分可能性を暗黙に仮定し続けず、「この形式計算をどの解概念で正当化するか」を C2 への明示的な未解決点として残す。

### C2：viscosity solution の数学的コア

Sobolev の部分積分型弱形式とは別の文化として、comparison を保存する低正則解概念を構築する。

候補論点：

- viscosity subsolution / supersolution
- smooth test function による上接触・下接触
- classical solution との整合性
- max / min principle の局所的な読み替え
- uniform limit に対する stability
- comparison principle
- uniqueness
- Perron method
- boundary / terminal condition の扱い
- semijet は必要になった段階で advanced として導入

導入順は必ず

```text
classical solution が焦散・最適化で壊れる
        ↓
distributional weak solution では comparison の構造を直接表しにくい
        ↓
接触する smooth test function だけで不等式を読む
        ↓
viscosity solution
        ↓
comparison による uniqueness
```

とする。

### C3：HJB を値関数の方程式として正本化

C1 の形式導出と C2 の解概念を合流させる。

候補論点：

- value function の連続性・局所 regularity の必要最小条件
- DPP から viscosity sub / supersolution を導く
- comparison theorem による uniqueness
- value function = unique viscosity solution
- smooth case の verification theorem との整合
- state constraint / exit-time problem は advanced
- optimal stopping / obstacle problem は bridge とし、全面展開は別計画候補

ここで初めて

$$
\text{dynamic programming}
\Longleftrightarrow
\text{HJB in viscosity sense}
$$

を標準ルートとして閉じる。

### C4：決定論的微分ゲーム・Hamilton--Jacobi--Isaacs

二人零和ゲームを標準モデルとする。

$$
\dot x=f(x,u,v),\qquad
J_{t,x}(u,v)
$$

に対して、一方が最小化、他方が最大化する。

候補論点：

- pursuit--evasion を最小具体例にする
- open-loop control と戦略の違い
- nonanticipative strategy
- lower value / upper value
- game の dynamic programming principle
- lower / upper Hamiltonian
- lower / upper HJI equation
- Isaacs condition
- $\sup_v\inf_u H=\inf_u\sup_v H$ が成立するときの game value
- viscosity solution による HJI の比較・一意性
- Nash equilibrium を求める非ゼロ和微分ゲームとの違い

「最適制御に相手を一人足しただけ」と済ませず、**control と strategy の違い、および `inf sup` の順序が情報構造を持つこと**を明示する。

### C5：確率制御・二階 HJB

Encore IV の確率基盤と合流する。

代表形

$$
dX_s=b(X_s,u_s)\,ds+\sigma(X_s,u_s)\,dW_s
$$

から、

- controlled diffusion
- stochastic dynamic programming principle
- Itô formula と generator
- second-order HJB
- smooth verification theorem
- viscosity solution と値関数
- degenerate elliptic / parabolic PDE
- stopping time を含む DPP の必要条件
- Feynman--Kac と「線形 PDE」の位置付けの違い

を扱う。

direct prerequisite 候補は少なくとも

- `STO9`：SDE
- `STO11`：Markov process / generator / Feynman--Kac
- C1--C3：DPP / HJB / viscosity solution

とする。

`TSA6` の Kalman filter は部分観測制御へ進む場合の bridge であり、完全観測下の確率制御を学ぶための必須 prerequisite にはしない。Girsanov や martingale representation も、使う節でだけ direct dependency とする。

### C6：確率微分ゲーム・二階 Isaacs 方程式

C4 のゲーム構造と C5 の controlled diffusion を合流させる。

$$
dX_s=b(X_s,u_s,v_s)\,ds
+\sigma(X_s,u_s,v_s)\,dW_s
$$

を基準形として、

- zero-sum stochastic differential game
- lower / upper stochastic value
- stochastic nonanticipative strategy
- stochastic DPP
- second-order lower / upper Isaacs equation
- stochastic Isaacs condition
- viscosity solution による value characterization
- 最悪外乱を第二プレイヤーとみなす robust-control viewpoint

を扱う。

ここで

```text
deterministic control      → HJB
deterministic game         → HJI
stochastic control         → second-order HJB
stochastic differential game → second-order HJI
```

という対応を明示的に完成させる。

### Track C の停止線

以下は重要だが、本 Track の完成条件には含めない。

- nonzero-sum differential game の一般論
- mean field game
- mean field control
- partially observed stochastic control
- filtering + control の separation principle 一般論
- jump / Lévy differential game
- stochastic target problem
- path-dependent HJB / functional Itô calculus
- full H-infinity / risk-sensitive control theory

金融・ロボティクス・工学応用側で必要になった場合も、まず本 Track の正本へリンクし、応用章の中で HJB / viscosity / Isaacs を再構築しない。

### 実装候補 ID と順序

現時点の設計上の仮 ID を `HJC1--HJC6` とする。

```text
HJC1 deterministic control / DPP / formal HJB
  ↓
HJC2 viscosity solution core
  ↓
HJC3 HJB value characterization
  ├──→ HJC4 differential game / HJI
  │
  └──→ HJC5 stochastic control / second-order HJB
             │
HJC4 ────────┴──→ HJC6 stochastic differential game / second-order HJI
```

実装時には既存 ID 衝突と direct prerequisite を再確認する。読順のためだけに不要な全系列依存を置かない。

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

Track H で非線形拡散を扱う場合も、$p$-Laplacian 型の変分・単調作用素理論を必要とする部分は Track D を canonical dependency とし、同じ存在論を作り直さない。

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
- vorticity equation
- 二次元での渦度表示と長時間挙動への入口
- self-similar variables
- Burgers vortex は advanced example
- partial regularity の位置付け

三次元の global regularity は未解決問題であることと、「weak solution の存在」と「smooth solution の global regularity」を明確に分離する。

尺度不変性・critical space・自己相似変数そのものの一般理論は Track H を正本とし、Track E では Navier--Stokes 固有の構造へ適用する。

圧力表示、Biot--Savart 型表示、Riesz transform などの特異積分作用素が必要になった場合は、後述の横断基盤候補を prerequisite として整備し、流体章の中で調和解析を一から構築しない。

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

Track H の自己相似・blow-up 解析を幾何学的 flow へ接続する場合も、まず Euclid 空間上の尺度変換と漸近解析を正本化し、幾何側で必要な差分だけ追加する。

## 8. Track H：非線形拡散・尺度変換・自己相似・漸近解析

### 目的

Encore III が主に existence / uniqueness / weak formulation を扱うのに対し、本 Track は

> **解が得られた後、その解は時間とともにどの尺度で、どの形へ、どの速さで近づくのか**

を主題とする。

非線形 PDE を個別方程式の解法集として並べず、

```text
scaling
  ↓
invariant quantity / criticality
  ↓
heat kernel smoothing
  ↓
interpolation / functional inequalities
  ↓
self-similar solution
  ↓
rescaled dynamics
  ↓
long-time asymptotics / blow-up
```

という共通機構で読む。

### 候補論点

#### 8.1 尺度変換と臨界性

- parabolic scaling
- 方程式・ノルム・保存量の scaling
- scale invariant quantity
- subcritical / critical / supercritical
- forward self-similar solution
- backward self-similar solution
- dimensional analysis と数学的 scaling の違い

単に指数を暗記させず、「方程式を不変に保つには未知関数を何乗で拡大すべきか」を毎回導出する。

#### 8.2 熱核と $L^p$--$L^q$ 平滑化評価

熱核の具体表示と Young の畳み込み不等式から、典型的な形

$\|e^{t\Delta}f\|_{L^q} \le C t^{-\frac d2(\frac1p-\frac1q)}\|f\|_{L^p}$

を導出し、時間減衰と平滑化を同時に読む。

Track A の heat semigroup を抽象的作用素論の正本とし、本 Track では kernel estimate と定量的 decay を中心に扱う。

#### 8.3 Gagliardo--Nirenberg・Nash 型不等式

GPDE5 の Sobolev embedding を出発点として、

- Gagliardo--Nirenberg interpolation inequality
- Nash inequality
- energy estimate と補間不等式からの decay
- mass conservation と $L^2$ decay の結合

を扱う。

証明に追加の実解析が必要な形は prerequisite を明示し、すべてを「Sobolev の直ちの帰結」として処理しない。

#### 8.4 自己相似変数と rescaled dynamics

典型的な放物型 scaling から

- similarity variables
- logarithmic time
- rescaled equation
- self-similar profile を rescaled dynamics の定常解として読む見方
- conserved quantity が profile のパラメータを決める機構
- attractor / asymptotic profile という考え方

を導入する。

繰り込み群との類似は advanced viewpoint として触れてよいが、物理学的 renormalization group の体系を本 Track の必須前提にはしない。

#### 8.5 多孔質媒質方程式

代表モデル

$u_t = \Delta(u^m),\qquad m>1$

を、線形熱方程式と対比して扱う。

候補論点：

- nonlinear diffusion
- mass conservation
- scaling から similarity exponent を決める
- Barenblatt 型自己相似解
- finite speed of propagation
- compact support の時間発展
- heat equation の infinite speed of propagation との比較
- rescaling による long-time asymptotics への入口

Barenblatt profile は「有名な公式」として提示するだけでなく、少なくとも scaling と質量保存から指数を導出し、profile equation がどこから出るかを追える形にする。

#### 8.6 半線形熱方程式と blow-up

代表モデル

$u_t = \Delta u + u^p$

を用いて、

- mild formulation
- local existence への入口
- maximum principle / comparison の利用
- global existence と finite-time blow-up の対比
- scaling critical exponent
- Fujita exponent の意味
- backward self-similar blow-up への入口

を扱う。

Fujita 型定理の正確な仮定・次元・指数範囲・解概念は実装時に theorem statement として固定し、「$p=1+2/d$ が常に唯一の臨界指数」といった過剰な一般化をしない。

#### 8.7 長時間漸近

熱方程式では、質量 $M$ を持つ解が適切な仮定の下で熱核 profile に近づく現象を基準例とする。

ここから、

- leading asymptotic profile
- decay rate
- conserved mass
- moment correction
- rescaled convergence
- nonlinear diffusion で profile が変わる理由

を扱う。

「存在したから終わり」ではなく、解集合の中でどの profile が普遍的に現れるかを学習目標にする。

### prerequisite 候補

実装時に direct prerequisite を確定するが、少なくとも次を候補とする。

- PDE3 / PDE8：熱方程式・Duhamel
- GPDE5：Sobolev embedding・compactness
- GPDE10：energy weak solution / Galerkin
- Track A：mild solution・heat semigroup
- Track D：非線形変分・単調作用素を実際に使う節だけ

Track H を実装するためだけに Track A / D の全系列完了を機械的に要求しない。必要な結果が既存 canonical result で閉じる場合は、その stable anchor を直接参照する。

## 9. 横断基盤候補：実解析・調和解析

Track E や Track H を本格化すると、PDE 固有の議論だけでは閉じない解析道具が現れる。

候補論点：

- Riesz potential
- Hardy--Littlewood--Sobolev inequality
- Hardy--Littlewood maximal operator
- Riesz transform
- singular integral operator
- Calderón--Zygmund estimate
- fractional Sobolev / potential estimate への入口

これは PDE の一章へ詰め込まず、実解析・調和解析側の canonical series として独立させることを原則とする。具体的な取捨選択と HA1--HA3 の候補構成は `textbook/plans/DREAM_THEATER_REAL_ANALYSIS_STRENGTHENING_PLAN.md` を正本候補とする。

特に Navier--Stokes の圧力表示や渦度表示で Riesz transform を使う場合、名前だけを出して暗黙の $L^p$ boundedness に依存しない。必要な定理を既存正本へリンクするか、前提系列として先に整備する。

## 10. Track 間の境界と接続

同じ方程式が複数 Track に登場してよい。ただし、何を正本化するかを分ける。

| 対象 | 正本となる Track |
|---|---|
| Duhamel / abstract evolution / mild solution | Track A |
| shock・entropy selection | Track B |
| Hamilton--Jacobi / HJB / viscosity / differential game / HJI / stochastic control | Track C |
| monotone operator / $p$-Laplacian の存在論 | Track D |
| incompressibility / Leray--Hopf / fluid-specific structure | Track E |
| renormalized / measure-valued solution | Track F |
| manifold 上の PDE | Track G |
| scaling / self-similarity / decay / long-time asymptotics / blow-up | Track H |
| Riesz transform / singular integral などの共通解析道具 | 実解析・調和解析系列 |

たとえば Navier--Stokes の scaling は Track H の一般理論を参照し、Navier--Stokes 固有の critical space の意味を Track E で説明する。多孔質媒質方程式の弱解存在に単調作用素法を使う場合は Track D を参照し、Barenblatt profile と長時間漸近は Track H で扱う。

## 11. 優先順位

Encore III 完成後の標準的な優先順は次を候補とする。

```text
GPDE10
  ├── Track A semigroup / mild solution
  ├── Track D nonlinear variational PDE
  ├── Track B conservation laws / entropy
  ├── Track C HJB / viscosity / differential game / stochastic control
  └── Track H scaling / self-similarity / asymptotics
```

Track H は独立性が高い一方、PDE3 / PDE8 / GPDE5 の既存資産を大きく再利用できるため、Track A / D の全完了を待たず、必要な prerequisite が閉じた単位から着手してよい。

Track C 内の推奨実装順は次とする。

```text
PDE12
  ↓
HJC1 deterministic control / DPP / formal HJB
  ↓
HJC2 viscosity solution core
  ↓
HJC3 HJB value characterization
  ├──→ HJC4 differential game / HJI
  └──→ HJC5 stochastic control / second-order HJB
              ↓
        HJC6 stochastic differential game / second-order HJI
```

HJC5 以降だけが Encore IV の `STO9` / `STO11` を必須候補とする。決定論的 HJB・viscosity・微分ゲームまでを確率解析完了待ちにしない。

推奨する Track H 内の実装順は次とする。

```text
H1 scaling・自己相似
  ↓
H2 heat kernel・Lp-Lq smoothing
  ↓
H3 Gagliardo--Nirenberg・Nash・decay
  ↓
H4 rescaled dynamics・熱方程式の長時間漸近
  ↓
H5 porous medium equation・Barenblatt profile
  ↓
H6 semilinear heat equation・criticality・blow-up
```

この H1--H6 は現時点では **設計上の仮 ID** であり、実装前に既存系列の命名規則・chapter ID 衝突・prerequisite を確認して確定する。

geometry 系列完成後：

```text
Track G geometric analysis
```

流体力学を本格化するとき：

```text
Track H の scaling / asymptotics
        +
実解析・調和解析の必要範囲
        +
GPDE10 の energy / Galerkin
        ↓
Track E Navier--Stokes
        ↓
vorticity / self-similar variables / Burgers vortex
```

必要性が生じた時だけ Track F renormalized / measure-valued を進める。

Track 間の順序は強制しない。それぞれ異なる PDE 構造を対象にするため、必要な前提が閉じたものから独立系列として実装する。

## 12. 設計原則

- 「weak solution」という一語の下に異質な解概念をまとめない。
- 各解概念について、何を保存するために定義されたかを中心に説明する。
- uniqueness が壊れる場合は、どの追加条件が選択原理になるかを示す。
- compactness を使う場合、どの topology で何が収束し、どの非線形項へ極限を通すかを明示する。
- scaling を使う場合、方程式・ノルム・保存量がそれぞれどう変換されるかを実際に計算する。
- critical / subcritical / supercritical は対象となる scaling と quantity を明示せずにラベルだけ使わない。
- self-similar solution は ansatz の代入だけで終わらせず、なぜその指数を選ぶかを scaling または保存量から導出する。
- long-time asymptotics では、収束する空間・正規化・profile・必要な初期値仮定を明示する。
- blow-up では、何の norm / quantity が有限時間で発散するのかを明示する。
- 線形熱方程式、多孔質媒質方程式、半線形熱方程式を対比し、「拡散だから同じ」と雑にまとめない。
- 未解決問題と既知の existence theory を混同しない。
- 調和解析の大定理を PDE の都合だけでブラックボックス乱用せず、必要なら独立系列を正本化する。
- Encore III の証明へ後続理論を逆輸入しない。
- DPP を使う場合、admissible control / strategy・情報構造・時間整合性を明示し、形式的な Bellman 展開だけで済ませない。
- HJB / HJI では `inf` / `sup` の順序と制御者・対戦者の役割を明示する。
- viscosity solution では「微分不能でも PDE を満たす」という説明だけで終わらせず、test function による接触不等式を具体例で判定させる。
- stochastic control / game では Itô formula、generator、DPP、二階 PDE のどこで確率性が入るかを分離して説明する。
- game value の存在と最適戦略の存在を同一視しない。Isaacs 条件が何を保証するための条件かを明示する。
- 応用 PLAN は HJB / viscosity / Isaacs の理論を再実装せず、本 Track を canonical dependency として参照する。
