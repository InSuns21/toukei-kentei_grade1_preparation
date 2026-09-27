# DREAM THEATER 凸解析・最適化／RKHS／ミクロ経済学／ゲーム理論再構成計画

## 0. 位置付け

この文書は、DREAM THEATER における凸解析・凸最適化・制約付き最適化・線形計画法・二次計画法・組合せ最適化・RKHS・SVMを立て直し、その数学をミクロ経済学（一般均衡）およびゲーム理論外伝へ接続するための設計台帳である。

既存の `F0-00G*`、`F0-02*`、`F0-02C*` には、凸集合、分離定理、Farkas の補題、劣微分、Fenchel 双対、KKT、制約想定、RKHS、SVM などの重要な資産がすでに存在する。一方で、これらは複数の補講系列へ分散しており、有限次元の標準凸解析から最適化、LP/QP、RKHS/SVM、経済学・ゲーム理論へ進む canonical な読順が弱い。

本計画では、既存ページを読まずに全面書き換えせず、現行資産を migration source として再利用しながら、次の幹を新たに整える。

```text
凸集合・凸関数
  ↓
射影・分離・Farkas
  ↓
劣微分・法錐
  ↓
Fenchel 共役・凸双対
  ↓
Lagrange 双対・KKT
  ↓
制約想定・KKT 導出
  ↓
数値最適化 / LP・QP
  ├─ 組合せ最適化
  ├─ RKHS・SVM
  ├─ ミクロ経済学・一般均衡
  └─ ゲーム理論外伝 A--D
```

この文書中の `OPT*`、`DOPT*`、`RKHS*`、`FIX*`、`MICRO*`、`GAME-*` は、現時点では **設計上の仮 ID** である。実装時に既存 ID との衝突、ディレクトリ命名、chapter metadata、knowledge DAG を確認して確定する。未実装章を `dream-theater-index.json` や `dependency-graph.md` の canonical dependency に先行登録しない。

---

## 1. 完成目標

この再編の完成時には、学習者が prerequisites だけを既知として、次の接続を本文と演習から自力再構成できる状態を目標とする。

```text
分離定理
  → Farkas の補題
  → LP 双対
  → minimax / core / assignment market

KKT
  → 制約付き最適化
  → QP
  → SVM / 消費者最適化 / Nash 交渉

支持超平面
  → Pareto 効率
  → 支持価格
  → 厚生定理

不動点
  → Nash 均衡の存在
  → Walras 均衡の存在

整数多面体
  → matching
  → assignment problem
  → assignment game
```

「凸解析とは最適化のための抽象論」で終わらせず、価格、均衡、公平配分、協力可能性、マージン分類、離散市場設計まで同じ数学が再登場することを示す。

---

# 2. 全体依存 DAG

```text
線形代数・実解析・位相
        │
        ▼
 OPT1 凸集合・凸関数
        │
        ▼
 OPT2 射影・支持超平面・分離・Farkas
        │
        ▼
 OPT3 閉凸関数・劣微分・法錐
        │
        ▼
 OPT4 Fenchel 共役・凸双対
        │
        ▼
 OPT5 Lagrange 双対・Slater 条件・KKT
        │
        ▼
 OPT6 接錐・制約想定・KKT 導出
        │
        ├──────────────→ OPT7--9 数値最適化
        │
        └──────────────→ OPT10--12 LP/QP
                              │
                              ├──→ DOPT1--4
                              ├──→ RKHS4--5
                              ├──→ GAME-A2 / GAME-B / GAME-D
                              └──→ MICRO の一部

Hilbert 空間・Riesz
        │
        ▼
 RKHS1 → RKHS2 → RKHS3 → RKHS4 → RKHS5
                         ↑
                       OPT12

位相・コンパクト性・凸集合
        │
        ▼
 FIX1 Brouwer ───────────────────→ GAME-A3
        ↓                           ↑
 FIX2 集合値写像・対応             │
        ↓                           │
 FIX3 Berge・Kakutani ─────────────┘
        └──→ MICRO7

 OPT1--6 + FIX1--3
        │
        ├──→ MICRO1--14
        └──→ GAME-A--D
```

OPT・FIX を数学側の canonical owner とし、MICRO / GAME では数学定理を無条件に再証明しない。応用章側では、現在の具体的対象が参照定理の仮定を満たすことを局所的に確認する。

---

# 3. Track OPT：凸解析・連続最適化

## OPT1 凸集合・凸関数・凸最適化

主題：

- 凸結合
- 凸集合
- 凸包
- 凸錐の入口
- 凸関数・狭義凸関数
- 準凸・準凹との区別
- 微分可能凸関数の一次支持不等式
- Hessian による凸性判定
- 局所最小と大域最小
- 凸最適化問題

主要 migration source：

- `F0-00G`

最低到達点：

- 凸性を図だけでなく定義から判定できる。
- 狭義凸性と Hessian 正定値性を無条件に同値としない。
- 後続の経済学で使う「凸選好」と「凸関数」を混同しない準備をする。

---

## OPT2 射影・支持超平面・分離・Farkas

主題：

- 閉凸集合への最近点射影
- 射影の変分不等式
- 支持超平面
- 点と閉凸集合の分離
- 凸錐
- polar cone
- 有限生成凸錐
- Farkas の補題
- alternative theorem

主要 migration source：

- `F0-00G1`
- `F0-02B`
- `F0-02C6A` の有限次元部分

この章を LP、KKT、厚生定理、協力ゲームの共通基盤とする。

---

## OPT3 閉凸関数・劣勾配・法錐

主題：

- 拡張実数値関数
- effective domain
- proper closed convex function
- epigraph
- 下半連続性
- indicator 関数
- 劣勾配・劣微分
- 方向微分
- 劣微分和則
- max 関数の劣微分
- 法錐
- Fermat 条件
- 制約集合上の一次最適性条件

中心式：

$$
0\in \partial f(x^*)+N_C(x^*).
$$

主要 migration source：

- `F0-00G1`
- `F0-02C4`
- `F0-02C4A`
- `F0-02C4B`

---

## OPT4 Fenchel 共役・凸双対

主題：

- Fenchel--Legendre 共役
- support function
- Fenchel--Young の不等式
- 等号条件と劣微分
- 二重共役
- Fenchel--Moreau の定理
- 劣微分の逆関係
- Fenchel 双対
- relative interior 条件の入口

主要 migration source：

- `F0-00G2`

---

## OPT5 Lagrange 双対・Slater 条件・KKT

有限次元の標準的な凸制約付き最適化を canonical に担当する。

対象：

$$
\min_x f(x)\quad \text{subject to } g_i(x)\le 0,\qquad Ax=b.
$$

主題：

- Lagrangian
- 双対関数
- 主問題・双対問題
- 弱双対性
- Slater 条件
- 強双対性
- KKT の4条件
- 相補性
- 凸問題における KKT の必要十分性

主要 migration source：

- `F0-02`

---

## OPT6 KKT の幾何学的導出・制約想定

主題：

- active set
- tangent cone
- linearization cone
- polar / normal cone
- 局所最適性の接方向条件
- LICQ
- MFCQ
- 接錐と線形化錐
- KKT 乗数の存在
- 制約想定を失った反例
- 二階必要・十分条件の入口

主要 migration source：

- `F0-02A`
- `F0-02C5A`

一般錐制約と Robinson CQ は発展補講 `OPT6A` に分離する。

### OPT6A 錐制約・一般化 KKT

主要 migration source：

- `F0-02C5`

主題：

- 錐制約
- 双対錐
- 一般化 Lagrangian
- Robinson CQ
- 一般化 KKT
- 通常の有限次元 KKT の復元

---

## OPT7 滑らかな凸最適化

新設。

主題：

- Lipschitz 連続勾配
- descent lemma
- 強凸性
- 最急降下法
- 固定歩幅
- 直線探索
- 凸問題での $O(1/k)$ 収束
- 強凸問題での線形収束
- Newton 法
- 条件数と収束速度

`NA12` は数値解析側の canonical dependency として再利用する。共役勾配法、Newton 法、二次目的関数を OPT7 で無駄に全面再証明しない。

---

## OPT8 非滑らか・近接最適化

新設。

主題：

- 劣勾配法
- 射影勾配法
- proximal mapping
- Moreau envelope
- proximal gradient
- soft thresholding
- ISTA
- 正則化付き最小二乗

中心反復：

$$
x^{k+1}=\operatorname{prox}_{\alpha g}\bigl(x^k-\alpha\nabla f(x^k)\bigr).
$$

---

## OPT9 制約付き数値最適化

新設。

主題：

- 射影法
- penalty method
- barrier method
- logarithmic barrier
- primal-dual viewpoint
- KKT system に対する Newton step
- SQP の入口

内点法の線形計画固有部分は OPT11 と接続する。

---

# 4. Track LP/QP

## OPT10 線形計画 I：多面体・極点・双対

主題：

- 線形計画問題の標準形
- polyhedron / polytope
- feasible direction
- extreme point
- basic feasible solution
- 最適解と極点
- 線形計画双対
- complementary slackness
- Farkas の補題との対応

後続の minimax、Bondareva--Shapley、assignment game の直接基盤とする。

---

## OPT11 線形計画 II：simplex・内点法・感度解析

主題：

- simplex 法の幾何
- pivot
- degeneracy
- infeasible / unbounded
- dual simplex の位置付け
- logarithmic barrier
- central path
- 内点法の概念
- shadow price
- sensitivity analysis

アルゴリズムの形式的手順だけでなく、極点移動と双対価格の意味を説明する。

---

## OPT12 二次計画・錐計画入門

主題：

$$
\min_x \frac12 x^{\mathsf T}Qx+c^{\mathsf T}x.
$$

- convex QP
- equality constrained QP
- inequality constrained QP
- KKT linear system
- active-set viewpoint
- $Q\succeq0$ と凸性
- $Q\succ0$ と一意性
- second-order cone programming の入口

RKHS4 の hard-margin SVM の直接 prerequisite とする。

---

# 5. Track DOPT：組合せ最適化

## DOPT1 整数計画・LP 緩和

主題：

- 整数線形計画
- LP relaxation
- integrality gap
- branch-and-bound
- cutting plane の考え方

---

## DOPT2 ネットワーク最適化

主題：

- 有向グラフ
- flow
- maximum flow
- minimum cut
- max-flow min-cut theorem
- minimum-cost flow

---

## DOPT3 matching・assignment

主題：

- 二部 matching
- Hall の定理
- assignment problem
- matching polytope
- 線形計画表現

---

## DOPT4 全単模性・整数多面体

主題：

- totally unimodular matrix
- integral polyhedron
- network matrix
- assignment LP の整数性

GAME-D では DOPT 側の整数性証明・アルゴリズムを再構築せず stable anchor を参照する。

---

# 6. Track RKHS：再生核 Hilbert 空間・kernel 法・SVM

## RKHS1 再生核 Hilbert 空間・Moore--Aronszajn

主要 migration source：

- `F0-02C7`

主題：

- 評価汎関数
- RKHS
- 再生核
- 正半定値 kernel
- canonical feature map
- Moore--Aronszajn の定理

---

## RKHS2 表現定理（representer theorem）

正則化問題

$$
\min_{f\in\mathcal H}
L\bigl(f(x_1),\dots,f(x_n)\bigr)
+\lambda\lVert f\rVert_{\mathcal H}^2
$$

の解を有限和

$$
f=\sum_i\alpha_iK(x_i,\cdot)
$$

へ落とす。

主要 migration source：

- `F0-02C7A`

---

## RKHS3 kernel ridge regression

representer theorem を SVM より先に使用し、kernel 法が SVM 固有の技巧でないことを示す。

主題：

- squared loss
- Tikhonov regularization
- Gram matrix
- kernel ridge solution
- regularization parameter

---

## RKHS4 最大マージン・hard-margin SVM

主題：

- 線形分離
- 正負クラスの凸包
- margin
- convex QP
- Lagrange 双対
- KKT
- support vector
- 双対変数の凸結合解釈

主要 migration source：

- `F0-02B1`
- `F0-02C7A`

---

## RKHS5 soft-margin・hinge loss・kernel SVM

主題：

- slack variable
- hinge loss
- $C$ の意味
- soft-margin dual
- KKT による点の分類
- kernel trick
- kernel SVM

主要 migration source：

- `F0-02C7A`
- `E1-04A`

通常教材 `E1-04` / `E1-04A` は統計検定向け短縮版として保持し、理論の canonical owner を RKHS 系列へ移す。

---

# 7. Track FIX：不動点・対応

ゲーム理論と一般均衡の双方が必要とするため、どちらか一方の応用系列に埋め込まない。

## FIX1 Sperner の補題・Brouwer 不動点定理

主題：

- simplex
- triangulation
- Sperner labeling
- Sperner の補題
- Brouwer fixed point theorem

Brouwer の定理を完全なブラックボックスにせず、有限次元 simplex を中心に証明経路を閉じる。

---

## FIX2 集合値写像・対応

主題：

- correspondence
- closed graph
- upper hemicontinuity
- lower hemicontinuity
- compact-valued
- convex-valued

最適反応対応・需要対応を具体例として条件を検算する。

---

## FIX3 Berge 最大値定理・Kakutani 不動点定理

主題：

- parameterized maximization
- value function
- argmax correspondence
- Berge maximum theorem
- Kakutani fixed point theorem

GAME-A3 と MICRO7 の共通 existence engine とする。

---

# 8. 外伝 MICRO：ミクロ経済学・一般均衡

本系列は経済学公式集にせず、凸解析・最適化・不動点が価格、需要、効率性、均衡へどう現れるかを主題とする。

水準の目安を次のように置く。

- **MICRO1--6**：学部標準〜上級学部。選好・需要・双対性・生産・厚生・純粋交換経済までを閉じる。
- **MICRO7--8**：大学院ミクロの一般均衡コア。Berge / Kakutani を使って均衡存在まで証明し、生産を含む Arrow--Debreu 経済へ進む。
- **MICRO9--14**：大学院ミクロ理論 I の横方向を補完する選択理論。顕示選好、不確実性、リスク、異時点間・動学的選択を加える。

したがって MICRO8 は一般均衡ルートの終点ではあるが、ミクロ理論全体の完成点とはしない。MICRO14 までで、価格理論・一般均衡と個人選択理論の主要幹を一通り接続する。

## MICRO1 選好・効用・凸性

主題：

- 選好関係
- 完備性
- 推移性
- 単調性
- 凸選好
- 効用表現
- 準凹性
- 上位集合

「凸選好」と「凸関数」を混同しないことを明示する。

---

## MICRO2 消費者最適化・需要

対象：

$$
\max_x u(x)\quad \text{subject to } p\cdot x\le m.
$$

主題：

- budget set
- Marshallian demand
- interior / corner solution
- KKT
- marginal rate of substitution
- Cobb--Douglas
- CES

MRS と価格比の関係を KKT の結果として導出する。

---

## MICRO3 消費者双対性

主題：

- indirect utility
- expenditure function
- Hicksian demand
- expenditure minimization
- Shephard 型関係
- Roy 型関係
- Slutsky decomposition
- 包絡定理との接続

Fenchel 共役そのものと経済学的双対問題を安易に同一視せず、共通構造と相違点を説明する。

---

## MICRO4 生産者理論

主題：

- production set
- production possibility
- profit maximization
- cost minimization
- profit function
- cost function
- supporting price

OPT2 / OPT5 を直接利用する。

---

## MICRO5 Pareto 効率・社会計画問題・厚生定理

代表問題：

$$
\max \sum_i\lambda_i u_i(x_i).
$$

主題：

- feasibility
- Pareto efficiency
- weighted social planner problem
- supporting price
- first welfare theorem
- second welfare theorem

中心となる見取り図：

```text
Pareto 効率
  ↓
可達集合の境界
  ↓
支持超平面
  ↓
価格ベクトル
```

第二厚生定理では凸性仮定が何を担うかを明示し、非凸性を失敗例で確認する。

---

## MICRO6 純粋交換経済・Walras 均衡

主題：

- endowment
- price vector
- individual demand
- aggregate demand
- excess demand
- Walras law
- price homogeneity
- competitive equilibrium
- Edgeworth box

二財二消費者の具体例を必須とする。

---

## MICRO7 一般均衡の存在

価格を simplex に規格化し、需要・超過需要から不動点問題を構成する。

FIX2 / FIX3 を参照し、

- nonempty
- compact-valued
- convex-valued
- upper hemicontinuity

など、使用する存在定理の仮定を局所的に確認する。

「Kakutani を使えば存在する」で核心を飛ばさない。

---

## MICRO8 Arrow--Debreu 経済

主題：

- consumers
- firms
- ownership shares
- profit income
- production economy
- commodity-market clearing
- Arrow--Debreu equilibrium
- welfare theorems の統合

有限財・有限主体の有限次元モデルで一度一般均衡理論を閉じる。

無限次元の商品空間、主体の連続体は本計画の完成条件に含めない。

---

## MICRO9 顕示選好・WARP / SARP / GARP

効用関数を先に仮定して需要を導く向きとは逆に、観測された選択データが効用最大化として合理化可能かを問う。

主題：

- choice correspondence
- revealed preference
- direct / indirect revealed preference
- WARP
- SARP
- GARP
- 価格・所得データからの需要整合性
- 選好表現との関係

有限観測データを使い、循環が合理化可能性をどう壊すかを具体的に確認する。

---

## MICRO10 Afriat の定理

有限個の価格・需要観測
$(p^t,x^t)$ を対象に、GARP と局所非飽和・単調・凹効用による合理化の同値を扱う。

主題：

- Afriat inequalities
- GARP との同値
- 効用関数の構成
- 支出効率指数の入口
- 線形不等式系としての rationalizability test

定理を「存在する」で済ませず、Afriat 不等式から piecewise-linear utility を構成する方向まで閉じる。OPT10 の線形不等式・実行可能性との接続も明示する。

---

## MICRO11 不確実性下の選択・期待効用

主題：

- lottery
- compound lottery と reduction
- completeness / transitivity
- continuity
- independence axiom
- von Neumann--Morgenstern expected utility theorem
- affine transformation による一意性
- expected utility representation

確実な消費選択と lottery 上の選好を区別し、期待効用が単なる「期待値を最大化する」という経験則ではなく、公理から導かれる表現定理であることを示す。

---

## MICRO12 リスク回避・Arrow--Pratt・確率優越

主題：

- risk aversion
- certainty equivalent
- risk premium
- Jensen の不等式
- absolute / relative risk aversion
- Arrow--Pratt measure
- first-order stochastic dominance
- second-order stochastic dominance
- mean-preserving spread

凹効用、リスクプレミアム、二次確率優越の関係を具体例と証明で結ぶ。

---

## MICRO13 異時点間選択

代表問題：

$$
\max_{c_0,c_1} u(c_0)+\beta u(c_1)
$$

を予算制約と組み合わせる。

主題：

- present value budget constraint
- saving / borrowing
- intertemporal MRS
- interest rate
- Euler equation
- borrowing constraint
- comparative statics

静学的 KKT が異時点間資源配分へそのまま移ることを示す。

---

## MICRO14 動学的選択・時間整合性

主題：

- exponential discounting
- dynamic consistency
- hyperbolic / quasi-hyperbolic discounting
- present bias
- time inconsistency
- commitment
- sophisticated / naive agent の入口

完全な動的計画法や確率制御は本章の完成条件に含めず、「同じ主体の時点間利害がなぜゲーム的構造を持ち得るか」までを閉じる。

MICRO14 までを **DREAM THEATER の大学院ミクロ理論 I 相当の主要コア完成点**とする。情報の経済学・契約理論・メカニズムデザインは別系列とし、必要になった時点で INFO / MECH 系列として切り出す。

---

# 9. ゲーム理論外伝 A：非協力ゲーム

## GAME-A1 戦略形ゲーム・最適反応・Nash 均衡

主題：

- player
- strategy
- payoff
- dominated strategy
- best response
- pure Nash equilibrium

---

## GAME-A2 混合戦略・ゼロ和ゲーム・minimax

混合戦略集合を simplex として扱う。

有限ゼロ和ゲームを線形計画へ変換し、線形計画双対から

$$
\max_p\min_q p^{\mathsf T}Aq=\min_q\max_p p^{\mathsf T}Aq.
$$

を導く。

OPT10 の代表的応用とする。

---

## GAME-A3 Nash 均衡の存在

主題：

- mixed-strategy simplex
- best-response correspondence
- nonempty
- compact-valued
- convex-valued
- upper hemicontinuity
- Berge 最大値定理による最適反応対応の正則性
- Kakutani 不動点定理による存在証明
- 正の逸脱利得から作る連続な Nash--Brouwer 写像
- Brouwer 不動点定理による独立な存在証明

有限ゲームの Nash existence theorem を二つの不動点経路で閉じる。

Kakutani の経路では、混合最適反応を集合値対応のまま扱い、非空・コンパクト・凸値性と上半連続性を局所的に確認する。

Brouwer の経路では、一価の最適反応選択が同点で不連続になり得ることを確認したうえで、各純粋戦略への正の逸脱利得を現在の混合確率へ加えて正規化する連続自己写像を構成する。その固定点では全ての正の逸脱利得が消えることを期待利得の加重平均から証明し、Nash 均衡へ戻す。

FIX1 の Brouwer と FIX3 の Kakutani を応用側で再証明せず、それぞれの仮定が有限ゲームでなぜ満たされるかを示す。

---

## GAME-A4 凹ゲーム・KKT・変分不等式

連続戦略ゲーム

$$
x_i^*
\in \operatorname*{arg\,max}_{x_i\in X_i}
u_i(x_i,x_{-i}^*)
$$

を扱う。

主題：

- concave game
- player-wise KKT
- normal cone
- Nash equilibrium as a variational inequality
- monotonicity の入口

---

## GAME-A5 展開形ゲーム・部分ゲーム完全均衡

主題：

- extensive-form game
- game tree
- backward induction
- subgame
- subgame-perfect equilibrium

A5 は完全情報動学ゲームの基礎であり、非協力ゲーム学部標準の中間点とする。

---

## GAME-A6 繰り返しゲーム・trigger strategy

主題：

- finitely repeated game
- infinitely repeated game
- history-dependent strategy
- discount factor
- grim trigger
- tit-for-tat の位置付け
- one-shot deviation principle

stage game の Nash 均衡だけでは説明できない協力の持続可能性を、割引現在価値と逸脱利得の比較から導く。

---

## GAME-A7 Folk theorem 入門

主題：

- individually rational payoff
- feasible payoff set
- punishment
- minmax payoff
- repeated-game equilibrium payoff
- Folk theorem の標準的な有限ゲーム版

一般形の最強定理を一気に証明するのではなく、代表的な定理形と構成を閉じ、どの仮定が協力可能集合を広げるかを確認する。

---

## GAME-A8 Bayesian game・Bayesian Nash 均衡

Harsanyi transformation により不完備情報をタイプ付き戦略形ゲームへ変換する。

主題：

- type
- prior
- private information
- strategy as a type-contingent action
- interim expected payoff
- Bayesian Nash equilibrium
- common prior
- Harsanyi transformation

有限 Bayesian game の具体例を必須とする。

---

## GAME-A9 オークション理論入門

GAME-A8 の代表応用として扱う。

主題：

- private value
- first-price auction
- second-price auction
- dominant strategy truth-telling
- symmetric Bayesian Nash equilibrium の簡単な導出
- revenue equivalence の入口

Myerson 最適オークションや一般の mechanism design は本章には含めない。

---

## GAME-A10 動学的不完備情報・belief・Perfect Bayesian Equilibrium

GAME-A5 と GAME-A8 を合流させる。

主題：

- information set
- belief
- Bayes rule
- sequential rationality
- consistency
- Perfect Bayesian Equilibrium
- pooling / separating の入口

PBE が「どの history でも合理的に行動する」という逐次合理性と、観察から belief を更新する情報構造を同時に扱うことを明示する。

---

## GAME-A11 signaling・screening・cheap talk 入門

主題：

- signaling game
- pooling equilibrium
- separating equilibrium
- semi-separating equilibrium の入口
- education signaling 型の例
- screening との役割差
- cheap talk の基本構造

GAME-A10 の PBE を実際に使い、不完備情報下で行動そのものが情報を伝える仕組みを閉じる。

**非協力ゲームの学部標準修了ラインは GAME-A11** とする。A1--A3、A5--A11 を必須コアとし、A4「凹ゲーム・KKT・変分不等式」は数学接続を強めた上級学部〜大学院寄りの補強章として位置付ける。

Sequential equilibrium、trembling-hand perfection、proper equilibrium、global games、stochastic game、evolutionary game は上級編へ送る。

---

# 10. ゲーム理論外伝 B：協力ゲーム

## GAME-B1 特性関数形ゲーム・コア

特性関数

$$
v:2^N\to\mathbb R
$$

から始める。

主題：

- coalition
- characteristic function
- 配分（imputation）
- efficiency
- individual rationality
- core

core を線形不等式で定義される多面体として読む。

---

## GAME-B2 balanced game・Bondareva--Shapley

中心定理：

$$
\operatorname{Core}(v)\ne\varnothing
\iff
v\text{ is balanced}.
$$

OPT10 の線形計画双対または Farkas の補題との対応を核心まで証明する。

「core が空でない条件」をゲーム固有の魔法として提示しない。

---

## GAME-B3 Shapley 値

主題：

- efficiency
- symmetry
- null player
- additivity
- Shapley value

公理から一意性を導く。

さらに

$$
\phi_i(v)=\mathbb E\!\left[\text{random arrival order における }i\text{ の限界貢献}\right]
$$

という確率的表示を示す。

---

## GAME-B4 convex game・supermodularity

ゲーム理論の convex game を

$$
v(S\cup T)+v(S\cap T)\ge v(S)+v(T)
$$

で導入する。

通常の凸関数とは異なる概念であることを明記する。

主要結果：

$$
v\text{ が convex game}\Longrightarrow \phi(v)\in\operatorname{Core}(v).
$$

---

## GAME-B5 least core・nucleolus

coalition の excess

$$
e(S,x)=v(S)-x(S)
$$

を使う。

主題：

- least core
- maximum excess minimization
- lexicographic minimization
- nucleolus
- 線形計画による逐次決定

Shapley 値とは異なる公平性・安定性の考え方として比較する。

---

## GAME-B6 voting game・power index

主題：

- simple game
- weighted voting game
- winning coalition
- veto player
- Shapley--Shubik power index
- Banzhaf power index
- 議席比率と投票力の非線形性

Shapley 値の「限界貢献の期待値」という考えが voting power にどう移るかを確認する。

GAME-B1--B6 で transferable-utility cooperative game の学部標準コアを閉じる。協力ゲームを広い意味で一周する修了ラインは、これに GAME-C1--C3 の公理的交渉と GAME-D3--D4 の assignment game / market を加えた範囲とする。stable set、bargaining set、kernel、一般 NTU game は上級編へ送る。

---

# 11. ゲーム理論外伝 C：交渉ゲーム

## GAME-C1 Nash bargaining problem

実行可能集合 $F$ と disagreement point $d$ を用いる。

代表問題：

$$
\max_{x\in F}\prod_i(x_i-d_i).
$$

対数変換により

$$
\max_{x\in F}\sum_i\log(x_i-d_i)
$$

という凹最適化へ移し、OPT5 の KKT で解く。

---

## GAME-C2 Nash 交渉解の公理化

主題：

- Pareto efficiency
- symmetry
- affine invariance
- independence of irrelevant alternatives

公理から Nash solution を特徴付ける。

GAME-B3 と並べて「公平な解を公理から一意化する」という共通テーマを持たせる。

---

## GAME-C3 代替的交渉解

主題：

- Kalai--Smorodinsky solution
- egalitarian viewpoint
- Nash solution との比較
- 公理を変更したときの解の変化

---

## GAME-C4 Rubinstein 交渉

alternating-offers game を GAME-A5 と接続する。

主題：

- discounting
- stationary strategy
- subgame-perfect equilibrium
- Rubinstein bargaining solution

公理的交渉と戦略的交渉を比較する。

---

## GAME-C5 交渉力の比較静学・outside option・breakdown

主題：

- heterogeneous discount factors
- first-mover advantage
- impatience と bargaining power
- exogenous breakdown risk
- outside option
- outside-option principle
- disagreement payoff と outside option の区別

「交渉力が強い」という日常語を、割引率、提案権、決裂確率、外部選択肢へ分解する。

---

## GAME-C6 公理的交渉解の非協力的基礎

主題：

- strategic bargaining と axiomatic bargaining の接続
- Rubinstein 型交渉の極限
- Nash bargaining solution への収束条件
- bargaining protocol の制度依存性
- cooperative solution の noncooperative foundation

Nash 交渉解を単独の公平性公理として終わらせず、明示的な戦略ゲームからなぜ同様の配分が現れるかを確認する。

---

## GAME-C7 不完備情報下の交渉入門

GAME-A10 の PBE を prerequisite とする。

主題：

- one-sided private information
- buyer / seller type
- offer と accept / reject による signaling
- belief update
- delay
- simple screening
- Perfect Bayesian Equilibrium による解法

有限タイプの簡単な一方向情報モデルを一つ完全に解くことを完成条件とする。二側不完備情報の一般論、reputation / commitment type、連続時間交渉は上級編へ送る。

**交渉ゲームの学部標準修了ラインは GAME-C7** とする。C1--C3 で公理的交渉、C4--C6 で完全情報の戦略的交渉、C7 で不完備情報への入口までを一巡する。

---

# 12. ゲーム理論外伝 D：matching・市場設計

## GAME-D1 stable marriage・Gale--Shapley

主題：

- preference list
- matching
- blocking pair
- stability
- deferred acceptance algorithm

安定 matching の存在を構成的に証明する。

---

## GAME-D2 matching market の構造

主題：

- proposer optimality
- stable matching の構造
- strategy-proofness の入口
- many-to-one matching
- college admissions

一般の mechanism design までは進まない。

---

## GAME-D3 assignment problem

DOPT3 / DOPT4 を canonical dependency とする。

主題：

- weighted bipartite matching
- assignment LP
- LP relaxation の整数性
- dual variables as prices

離散最適化側のアルゴリズム・整数性を再証明しない。

---

## GAME-D4 assignment game・core・競争均衡

assignment market を transferable-utility cooperative game として扱う。

中心接続：

```text
assignment LP
  ↔ dual prices
  ↔ core
  ↔ competitive equilibrium
```

OPT、DOPT、MICRO、GAME-B、GAME-D が合流する総合章とする。

---

# 13. 今回の完成条件に含めない発展領域

今回の拡張で、学部標準として必要な repeated game、Bayesian game、auction 入門、PBE、signaling、Rubinstein bargaining、不完備情報交渉の入口は A / C 系列へ取り込む。

次は将来の上級外伝候補とし、今回の完成条件には含めない。

- sequential equilibrium
- trembling-hand perfect equilibrium
- proper equilibrium
- equilibrium refinement の体系
- stochastic game
- evolutionary game
- differential game
- mean-field game
- global games
- epistemic game theory / belief hierarchy
- mechanism design
- revelation principle
- VCG
- Myerson optimal auction
- Bayesian mechanism design
- social choice
- stable set
- bargaining set
- kernel
- NTU cooperative game の一般論
- bargaining with two-sided continuous private information
- reputation / commitment types の本格理論
- infinite-dimensional general equilibrium
- continuum of agents
- Sonnenschein--Mantel--Debreu の本格証明
- dynamic programming / stochastic control を用いる本格的動学ミクロ

必要になった時点で GAME-ADV、INFO / MECH、または MICRO-ADV として別計画を立てる。

---

# 14. 既存ページの migration / archive 方針

| 現行資産 | 新 canonical owner 候補 | archive の時点 |
|---|---|---|
| F0-00G | OPT1 | OPT1 への移管完了時 |
| F0-00G1 | OPT2 / OPT3 | OPT3 までの移管完了時 |
| F0-02B | OPT2 | OPT2 への移管完了時 |
| F0-02C4* | OPT3 | OPT3 への移管完了時 |
| F0-00G2 | OPT4 | OPT4 への移管完了時 |
| F0-02 | OPT5 | OPT5 への移管完了時 |
| F0-02A | OPT6 | OPT6 への移管完了時 |
| F0-02C5A | OPT6 | OPT6 への移管完了時 |
| F0-02C5 | OPT6A | OPT6A への移管完了時 |
| F0-02C7 | RKHS1 | RKHS1 への移管完了時 |
| F0-02C7A | RKHS2 / RKHS4 / RKHS5 | RKHS5 までの移管完了時 |
| F0-02B1 | RKHS4 | RKHS4 への移管完了時 |
| NA12 | 保持し、OPT7 の数値解析側 dependency とする | archive しない |
| E1-04 / E1-04A | 保持し、統計検定向け短縮版とする | archive しない |

移管済みの旧 F0 ページは **in-place archive** とする。すなわち、stable anchor と過去リンクの後方互換性のため実ファイルは残すが、次を徹底する。

archive 対象の機械可読な正本は `textbook/dream-theater-archive.json` とし、reader-facing index の検証もこのレジストリを参照する。

1. dream-theater-index.json から外し、読者向けサイドバー・標準通読・ロードマップへ掲載しない。
2. canonical concept / theorem owner を新系列へ移し、archive ページを新規章の prerequisite にしない。
3. archive ページ冒頭に canonical owner への案内を置く。
4. 既存 incoming link は可能な範囲で新しい stable anchor へ張り替える。ただし過去URL自体は壊さない。
5. archive ページの knowledge.yaml は semantic owner として扱わず、現行 DREAM THEATER index の監査対象から外す。

一つの旧ページが複数の新章へまたがる場合は、**最後の担当章まで内容を移管してから archive** する。たとえば F0-00G1 は支持超平面部分を OPT2 へ移しただけでは全体 archive にせず、epigraph・閉凸関数・劣勾配側を OPT3 へ移してから一覧から外す。

移管時には、次を確認してから archive へ切り替える。

1. concept owner
2. theorem / formal statement owner
3. stable anchor
4. incoming link
5. knowledge.yaml の requires / aliases
6. chapter.yaml の prerequisite
7. reader-facing index

alias は真の同義語だけを移し、関連語を後方互換性の名目で残さない。

---

# 15. 実装順

## Phase 0：監査・設計固定

- 既存 F0 最適化ページの定義・定理・証明・例・演習 inventory を作る。
- `knowledge.yaml` の concept owner と alias 衝突を確認する。
- 新系列 ID と stable anchor を確定する。
- 既存 incoming link を確認する。
- pure-add と既存 metadata 変更を分離し、strict validation の範囲を決める。

## Phase 1：凸解析の幹

```text
OPT1 → OPT2 → OPT3 → OPT4 → OPT5 → OPT6 → OPT6A
```

- [x] OPT1「凸集合・凸関数・凸最適化」を実装。旧 F0-00G の基礎定義・主要定理を OPT1 へ統合して自立化し、F0-00G は in-place archive として読者向け一覧から除外した。
- [x] OPT2「射影・支持超平面・分離・Farkas」を実装。射影定理・変分不等式・支持/分離・有限生成凸錐の閉性・Farkas を一つの流れで閉じ、旧 F0-02B は in-place archive として読者向け一覧から除外した。
- [x] OPT3「閉真凸関数・劣微分・法錐」を実装。F0-00G1 / F0-02C4 / F0-02C4A / F0-02C4B の canonical 内容を統合し、拡張実数値関数から制約付き Fermat 条件までを一講義で閉じた。旧4ページは in-place archive として読者向け一覧から除外した。
- [x] OPT4「Fenchel 共役・凸双対」を実装し、Fenchel--Young、二重共役、Fenchel 双対までを canonical 化した。旧 F0-00G2 は移管後の archive とした。
- [x] OPT5「Lagrange 双対・Slater 条件・KKT」を実装し、凸制約問題の弱双対・強双対・KKT 必要十分条件を canonical 化した。旧 F0-02 は archive とした。
- [x] OPT6「KKT の幾何学的導出・制約想定」を実装し、接錐・線形化錐・LICQ/MFCQ・二階条件を閉じた。旧 F0-02A / F0-02C5A は archive とした。
- [x] OPT6A「錐制約・一般化 KKT」を実装し、Robinson 制約想定・一般化 KKT・半正定値錐への入口までを閉じた。旧 F0-02C5 は archive とした。

既存資産の再編を中心とし、不足している証明・具体例・反例・演習を補う。

## Phase 2：最適化手法・LP/QP

並列に進めてよい。

```text
OPT7 → OPT8 → OPT9
```

- [x] OPT7「滑らかな凸最適化」を実装。NA12 の正定値二次関数・厳密直線探索・共役勾配法を再利用し、一般の $L$-滑らかな凸関数の降下補題、$O(1/k)$ 収束、強凸性による線形収束、Armijo 条件付き後退直線探索、Newton 法の局所二次収束を canonical 化した。
- [x] OPT8「非滑らか・近接最適化」を実装。OPT3 の劣微分・標示関数・法錐と OPT7 の滑らかな凸最適化を接続し、劣勾配法の $O(1/\sqrt{k})$、射影勾配法、近接作用素、Moreau 包絡、堅非拡大性、ソフト閾値処理、近接勾配法の $O(1/k)$、ISTA を canonical 化した。
- [x] OPT9「制約付き数値最適化」を実装。OPT8 の射影勾配法を一次最適性残差として読み直し、二次ペナルティ法、対数障壁と中心路、摂動 KKT、等式制約および主双対 KKT 系の Newton ステップ、逐次二次計画法を canonical 化した。障壁点の双対ギャップと SQP / KKT-Newton の一致までを証明し、線形計画固有の内点法は OPT11 へ分離した。
- [x] OPT10「線形計画 I：多面体・極点・双対」を実装。標準形、多面体・極点、基本実行可能解、線形計画の基本定理、LP の弱双対・強双対、Farkas の補題による強双対証明、相補性を canonical 化した。
- [x] OPT11「線形計画 II：単体法・内点法・感度解析」を実装。被約費用、比率検定、単体法ピボット、退化・Phase I・非有界判定、LP 中心路と主双対 Newton 系、右辺・費用係数の感度解析と影の価格を canonical 化した。
- [x] OPT12「二次計画・錐計画入門」を実装。二次目的関数の凸性と半正定値性、等式制約 KKT 線形系、零空間上の正定値性、不等式 QP の KKT と活性集合、二次錐の自己双対性、SOCP の標準形、hard-margin SVM への QP 接続を canonical 化した。
```text
OPT10 → OPT11 → OPT12
```

## Phase 3：離散最適化・RKHS

```text
DOPT1 → DOPT2 → DOPT3 → DOPT4
```

- [x] DOPT1「整数計画・LP 緩和」を実装。整数線形計画、LP 緩和と下界、整数包、整数性ギャップ、緩和の強弱、分枝限定法の有限領域での正当性、妥当不等式、整数丸め切除、branch-and-cut の基本構造を canonical 化した。
- [x] DOPT2「ネットワーク最適化」を実装。容量付き有向ネットワーク、s--t フロー、カット、残余ネットワーク、増加路、最大流最小カット定理、整数容量での整数最大流、最小費用流、負費用残余閉路による最適性条件を canonical 化した。
- [x] DOPT3「マッチング・割当問題」を実装。二部グラフ、増加路と Berge の補題、最大フローとの対応、Hall の定理、割当問題の 0--1 線形計画表示、LP 緩和、マッチング多面体、割当 LP の双対を canonical 化した。
- [x] DOPT4「全単模性・整数多面体」を実装。全単模行列、点弧接続行列・二部頂点辺接続行列・ネットワーク行列の全単模性、全単模性と整数右辺による頂点整数性、二部マッチング多面体・割当 LP・Birkhoff--von Neumann・フロー多面体の整数性を canonical 化した。
- [x] RKHS1「再生核 Hilbert 空間・Moore--Aronszajn」を実装。評価汎関数の連続性から再生核を導き、正半定値核から核切片の内積空間を構成し、完備化後の関数同定と核切片の稠密性まで含めて Moore--Aronszajn の存在・一意性を canonical 化した。
- [x] RKHS2「正則化問題の表現定理」を実装。標本部分空間への直交射影が訓練値を保ちながら RKHS ノルムを減らすことから表現定理を証明し、Gram 行列による有限次元化、特異 Gram 行列での係数非一意性、連続で下に有界な損失に対する最小解の存在、連続線形観測への一般化まで canonical 化した。
- [x] RKHS3「カーネルリッジ回帰」を実装。平均二乗誤差と Tikhonov 正則化から閉形式解を導き、特異 Gram 行列での係数非一意性、平滑化行列と固有方向ごとの縮小、正則化係数の極限、線形核における通常のリッジ回帰との主形式・双対形式の一致まで canonical 化した。
- [x] RKHS4「最大マージンとハードマージン SVM」を実装。線形分離可能性、関数マージン・幾何マージン、最大マージンの凸 QP 定式化、Slater 条件、Lagrange 双対、KKT、サポートベクトル、正負クラスの凸包非交差と最近点距離、双対変数の凸結合解釈、分類器と双対係数の一意性の違いまで canonical 化した。旧 F0-02B1 は in-place archive とした。
- [x] RKHS5「ソフトマージン・ヒンジ損失・カーネル SVM」を実装。スラック変数とヒンジ損失の同値性、正則化係数 $C$ の役割、箱型制約付き双対、Slater 条件と KKT による訓練点分類、自由サポートベクトルによる切片回収、カーネルトリック、カーネル SVM の双対と有限和判別関数、XOR の多項式核分離まで canonical 化した。旧 F0-02C7A は in-place archive とした。

```text
RKHS1 → RKHS2 → RKHS3 → RKHS4 → RKHS5
```

## Phase 4：不動点共通基盤

```text
FIX1 → FIX2 → FIX3
```

- [x] FIX1「Sperner の補題・Brouwer 不動点定理」を実装。標準単体・三角形分割・重心細分を導入し、重心細分のメッシュ縮小、Sperner の補題の奇数性を帰納法と有限グラフの次数の偶奇から証明した。座標差による Sperner ラベルから標準単体上の Brouwer 不動点定理を閉じ、最近点射影を用いて非空コンパクト凸集合版へ拡張した。コンパクト性・凸性・連続性を外した反例と、Lipschitz 写像に対する近似不動点誤差評価まで canonical 化した。
- [x] FIX2「集合値写像・対応」を実装。対応・グラフ、非空値・閉値・コンパクト値・凸値、上半連続性・下半連続性を定義し、1点値対応で通常の連続性へ戻ること、コンパクト値な上半連続対応の閉グラフ性、コンパクト終域での閉グラフとの同値、下半連続性の点列判定を証明した。最適反応対応・需要対応で同点による値集合の拡大を検算し、非コンパクト終域で閉グラフだけでは上半連続性が出ない反例まで canonical 化した。
- [x] FIX3「Berge 最大値定理・Kakutani 不動点定理」を実装。パラメータ付き最大化から価値関数・最大化点対応を定義し、上半連続コンパクト値対応の選択列コンパクト性を経由して Berge 最大値定理を証明した。両半連続性の役割分担、一意最適解の連続性、最大化点対応が下半連続とは限らない同点例を確認した。Kakutani は、不動点不存在時の局所厳密分離、有限開被覆に従属する連続重み、最近点射影、Brouwer 不動点定理をつないで核心証明を閉じ、領域のコンパクト性・凸性、値の凸性、上半連続性を失う反例まで canonical 化した。

一般均衡と Nash existence に必要な不動点共通基盤は完成済み。

## Phase 5：ミクロ経済学

```text
MICRO1 → MICRO2 → MICRO3 → MICRO4
   ↓
MICRO5 → MICRO6 → MICRO7 → MICRO8
                         │
                         ├──→ MICRO9 → MICRO10
                         ├──→ MICRO11 → MICRO12
                         └──→ MICRO13 → MICRO14
```

MICRO7 は FIX3 完成後とする。MICRO1--8 の一般均衡ルート完成後、MICRO9--14 を大学院ミクロ理論 I の横方向補完として実装する。

- [x] MICRO1「選好・効用・凸性」を実装。選好関係、完備性・推移性、単調性、上位集合、凸選好、効用表現、狭義単調変換、有限集合での効用表現、辞書式選好の非表現可能性、凸選好と準凹性の同値を canonical 化した。凸選好と凸関数を混同しない反例と Cobb--Douglas 型の総合演習まで閉じた。
- [x] MICRO2「消費者最適化・需要」を実装。正の価格による予算集合の非空・凸・コンパクト性、連続効用での Marshall 需要の存在、狭義単調性による予算使い切り、0次同次性、内点解・端点解、OPT5 の KKT 条件による価格当たり限界効用条件、限界代替率と価格比、Cobb--Douglas 型・CES 型需要を canonical 化した。凹性を失った KKT 停留条件の失敗例と、無料財で需要存在が壊れる例まで閉じた。
- [x] MICRO3「消費者双対性」を実装。間接効用関数・支出関数・Hicks 需要を定義し、支出最小化点の存在、効用最大化と支出最小化の双対恒等式、支出関数の価格に関する1次同次性・単調性・凹性、Shephard 型関係、Roy 型関係、Slutsky 分解を canonical 化した。Cobb--Douglas 型で双対性と補償需要を具体計算し、単調性喪失や複数 Hicks 需要による微分表示の失敗まで閉じた。
- [x] MICRO4「生産者理論」を実装。純産出ベクトルと生産集合から利潤最大化を定式化し、利潤関数の1次同次性・凸性、Hotelling 型関係、凹生産関数の KKT 条件を canonical 化した。さらに費用関数・条件付き要素需要、費用最小化点の存在、費用関数の1次同次性・凹性、利潤最大化と費用最小化の接続を閉じた。閉凸性と自由処分性から非負の支持価格を構成し、非凸生産技術では境界点が価格で支持されない例まで示した。
- [x] MICRO5「Pareto 効率・社会計画問題・厚生定理」を実装。実行可能配分、Pareto 改善・効率、局所非飽和性、加重社会計画問題、効用可能集合を導入し、正の厚生重みを持つ社会計画解の効率性と、凹効用のもとでの効用可能集合の凸性を証明した。支持超平面から非負の厚生重みを構成し、KKT の資源制約乗数を共通価格として読むことで限界代替率の一致へ接続した。第一厚生定理は局所非飽和性と予算総和の矛盾から、第二厚生定理は凸性・支持重み・KKT・一括的所得移転から閉じ、非凸な効用可能集合では Pareto 効率点が線形重みで支持されない反例まで示した。
- [x] MICRO6「純粋交換経済・Walras 均衡」を実装。初期保有とその市場価値から個別需要を構成し、集計需要・超過需要、価格の0次同次性、Walras の法則、正価格下での一市場の冗長性、Walras 均衡と価格尺度不変性を canonical 化した。二財二消費者の Edgeworth ボックスと非対称 Cobb--Douglas 型交換経済で均衡相対価格・均衡配分・純取引を具体計算し、第一厚生定理から均衡配分のパレート効率性へ接続した。局所非飽和性を失うと予算使い切りと Walras の法則の等号が壊れる例まで閉じた。
- [x] MICRO7「一般均衡の存在」を実装。価格尺度不変性から価格を境界を含む規格化単体へ移し、正の初期保有を使って切断予算対応の非空コンパクト凸値性・両半連続性を証明した。Berge 最大値定理で切断需要対応と競売人価格対応の正則性を確保し、その直積自己対応へ Kakutani 不動点定理を適用した。固定点から予算使い切り、Walras の法則、競売人最適化、ゼロ価格財の排除を順につないで全市場清算を導き、狭義準凹性で切断解を元の消費者問題へ戻して Walras 均衡存在を閉じた。正の初期保有や準凹性を失ったときに証明機構が壊れる反例も示した。
- [x] MICRO8「Arrow--Debreu 経済」を実装。MICRO4 の企業利潤最大化を一般均衡へ戻し、企業所有比率・利潤所得・生産を含む実行可能性・Arrow--Debreu 均衡を canonical 化した。企業供給対応の Berge 正則性、生産経済版 Walras の法則、生産を含む第一厚生定理、支持価格と一括的所得移転による第二厚生定理を閉じた。さらに非空コンパクト凸生産集合と休業可能性のもとで、利潤所得を含む切断需要・企業供給・競売人価格を一つの自己対応へまとめ、Kakutani 不動点定理から正価格・全市場清算・切断除去まで追って Arrow--Debreu 均衡存在を証明した。所有比率の正規化喪失、非凸技術、無限利潤技術で壊れる機構も示した。
- [ ] MICRO9「顕示選好・WARP / SARP / GARP」
- [ ] MICRO10「Afriat の定理」
- [ ] MICRO11「不確実性下の選択・期待効用」
- [ ] MICRO12「リスク回避・Arrow--Pratt・確率優越」
- [ ] MICRO13「異時点間選択」
- [ ] MICRO14「動学的選択・時間整合性」

## Phase 6：ゲーム理論外伝 A

```text
GAME-A1 → GAME-A2 → GAME-A3 → GAME-A4 → GAME-A5
                                           ↓
GAME-A6 → GAME-A7 → GAME-A8 → GAME-A9 → GAME-A10 → GAME-A11
```

- [x] GAME-A1「戦略形ゲーム・最適反応・Nash 均衡」を実装。有限戦略形ゲーム、戦略プロファイル、一方的変更、厳密支配・弱支配、最適反応、純粋戦略 Nash 均衡を canonical 化した。Nash 均衡を相互最適反応として特徴付け、厳密被支配戦略の排除と全員が厳密な支配戦略を持つ場合の一意性を証明した。囚人のジレンマ、複数均衡を持つ協調ゲーム、弱く支配される戦略を含む均衡、表裏合わせゲーム の純粋均衡不存在、パラメータ付き2×2ゲームまでを具体計算で閉じた。
- [x] GAME-A2「混合戦略・ゼロ和ゲーム・ミニマックス」を実装。有限純粋戦略上の混合戦略・台・混合拡張・混合戦略 Nash 均衡を定義し、均衡の台に入る純粋戦略が最適反応になることを証明した。二人ゼロ和ゲームの maximin / minimax を安全化 LP として定式化し、列プレイヤーの標準形 LP の双対が行プレイヤーの LP になることを変数変換まで追って導出した。OPT10 の LP 強双対から von Neumann のミニマックス定理を証明し、最適保証戦略と混合戦略 Nash 均衡の同値、表裏合わせゲーム、非対称2×2ゲーム、純粋鞍点、パラメータ境界まで具体計算で閉じた。
- [x] GAME-A3「Nash 均衡の存在」を実装。全混合戦略空間を単体の有限直積として構成し、Berge 最大値定理と期待利得の線形性から混合最適反応対応の非空・コンパクト・凸値性と上半連続性を確認して、FIX3 の Kakutani 不動点定理から有限ゲームの混合戦略 Nash 均衡存在を証明した。さらに一価の最適反応選択が同点で不連続になり得ることを確認し、正の逸脱利得を混合確率へ加えて正規化する Nash--Brouwer 写像を構成した。その固定点で全ての正の逸脱利得が消えることを加重平均の恒等式から証明し、FIX1 の Brouwer 不動点定理だけを使う独立な存在証明も閉じた。
- [x] GAME-A4「凹ゲーム・KKT・変分不等式」を実装。連続戦略ゲームと凹ゲームを導入し、非空コンパクト凸な戦略集合・連続利得・各プレイヤー方向の凹性から、Berge 最大値定理と Kakutani 不動点定理で Nash 均衡存在を証明した。各プレイヤーの最適化を OPT5 の KKT 条件へ落とし、Slater 条件下のプレイヤー別 KKT 特徴付けを示したうえで、OPT3 の法錐と OPT6 の制約想定を使って KKT が法錐の制約表示であること、制約想定失敗時には Nash 条件を保ったまま KKT 乗数だけが失敗し得ることを整理した。さらに擬勾配写像と変分不等式を導入し、凹ゲームで Nash 均衡と VI が同値であること、強単調性から均衡一意性が従うことを証明し、Cournot 複占と境界均衡で具体計算した。
- [x] GAME-A5「展開形ゲーム・部分ゲーム完全均衡」を実装。完全情報の有限展開形ゲームを履歴・手番・行動集合・終端利得から導入し、展開形の純粋戦略が経路外の節点も含む完全な条件付き行動計画であることを具体例で確認した。部分ゲームと部分ゲーム完全均衡を定義し、参入ゲームで Nash 均衡に残る空脅しを逐次合理性が除くことを示した。さらに後ろ向き帰納法を定式化し、木の高さに関する帰納法で純粋戦略の部分ゲーム完全均衡存在を証明した。同点による複数均衡、有限性・完全情報の役割、パラメータ付き三段階ゲームで Nash 均衡と部分ゲーム完全均衡の閾値がずれる例まで閉じた。
- [x] GAME-A6「繰り返しゲーム・trigger strategy」を実装。有限回・無限回の繰り返しゲーム、履歴依存戦略、割引因子・割引利得、トリガー戦略とグリム・トリガー、一回逸脱原理を canonical 化した。段階ゲームの Nash 均衡が一意な有限反復では後ろ向き帰納法により各期・各履歴でその均衡が繰り返されることを証明し、複数均衡がある場合には将来の均衡選択を報酬・罰に使えるため単純な後ろ向き帰納による崩壊が成立しない例を示した。無限反復の標準囚人のジレンマではグリム・トリガーの協力維持条件 $\delta\ge1/2$ を導き、一般の協力プロファイルと段階 Nash 均衡による罰に対する十分条件を証明した。さらに一回逸脱原理を証明し、しっぺ返しは代表的履歴依存戦略でも自動的に部分ゲーム完全均衡ではないことを具体計算で示した。
- [x] GAME-A7「Folk theorem 入門」を実装。実現可能利得集合、ミニマックス値、個人合理性を導入し、繰り返しゲームの均衡利得が実現可能かつ個人合理的でなければならないことを証明した。ミニマックス罰が罰する側にとって信頼可能とは限らない反例を置き、各プレイヤーをミニマックス値まで落とす段階 Nash 均衡が存在する場合には、有限周期・逸脱者別永久罰・一回逸脱原理から、厳密に個人合理的な実現可能利得を十分大きい割引因子で近似実装できるフォーク定理型構成を完全証明した。一般の Folk theorem では罰する側の逐次合理性まで継続利得で支える必要があることを整理し、囚人のジレンマの交互周期と三期周期で閾値計算まで閉じた。
- [x] GAME-A8「Bayesian game・Bayesian Nash 均衡」を実装。有限ベイジアンゲームをタイプ集合・共通事前分布・タイプ依存利得から定義し、相関タイプでは自分のタイプ観察後に条件付き信念を更新すること、共通事前分布がタイプ独立性を意味しないことを具体例で確認した。戦略をタイプ条件付き行動計画として定義し、中間期待利得による Bayesian Nash 均衡条件を一方的私的情報の二人ゲームで解いた。さらに Harsanyi 変換で条件付き計画を純粋戦略とする有限戦略形ゲームへ落とし、全タイプ正確率のもとで純粋 Bayesian Nash 均衡と変換後 Nash 均衡の同値を証明した。GAME-A3 の有限ゲーム Nash 均衡存在定理から混合 Bayesian Nash 均衡存在を導き、事前確率に応じた純粋均衡の分岐と純粋均衡がない領域の混合均衡まで具体計算した。
- [x] GAME-A9「オークション理論入門」を実装。単一財の独立私的価値モデルを GAME-A8 のベイジアンゲームとして定式化し、第一価格・第二価格の配分規則と支払規則を具体例から導入した。第二価格では相手の最高入札を固定した三場合分けにより正直入札の弱支配性を完全証明した。第一価格ではタイプ $v$ がタイプ $x$ のふりをする逸脱から中間期待利得を構成し、一般の連続分布 $F$ について対称 Bayesian Nash 均衡入札 $\beta(v)=v-\int_0^vF(t)^{n-1}dt/F(v)^{n-1}$ を導出し、大域的最適性まで確認した。一様分布の $\beta(v)=(n-1)v/n$ を具体化し、さらに第一価格均衡と第二価格正直入札のタイプ別期待支払が一致することを部分積分で証明して、収入同値の入口を閉じた。
- [x] GAME-A10「動学的不完備情報・信念・Perfect Bayesian Equilibrium」を実装。GAME-A5 の展開形・部分ゲーム完全性と GAME-A8 の私的タイプ・条件付き信念を合流させ、情報集合、行動戦略、信念体系、評価組、Bayes 整合性、逐次合理性、弱い有限ゲーム版 PBE を canonical 化した。到達情報集合では Bayes 信念が一意に定まることを証明し、完全情報特殊化で純粋戦略 PBE と部分ゲーム完全均衡が一致することを示した。二タイプ認証ゲームで分離型 PBE と経路外信念に支えられるプーリング型 PBE を導出し、経路外信念でも救えない候補と SPE だけでは経路外合理性を十分に縛れない例まで閉じた。
- [x] GAME-A11「signaling・screening・cheap talk 入門」を実装。GAME-A10 の PBE を実際の情報伝達へ適用し、二タイプ教育シグナリングで受け手の信念閾値、分離・プーリング・半分離、タイプ別誘因条件を具体計算した。一般パラメータで分離条件 $c_H\le W\le c_L$ を証明し、経路外信念で支えられるプーリングと、送り手の逸脱のため信念では救えない候補を比較した。情報を持たない側がメニューを先に提示するスクリーニングを自己選択の数値例で区別し、チープトークでは babbling PBE の存在を証明したうえで、利害が整合すれば費用なしのメッセージでも情報伝達できる例まで閉じた。Level A 4題 / B 3題 / C 1題と全問詳細解答を追加し、非協力ゲームの学部標準修了ラインを完了した。

## Phase 7：ゲーム理論外伝 B

```text
GAME-B1 → GAME-B2 → GAME-B3 → GAME-B4 → GAME-B5 → GAME-B6
```

- [x] GAME-B1「特性関数形ゲーム・コア」を実装。有限 TU 特性関数形ゲーム、提携・大提携、効率性・個人合理性を満たす配分（英語文献の imputation）、提携によるブロック、コアを canonical 化した。3人ゲームで配分とコアの差を具体計算し、コアを有限本の線形等式・不等式で定まる多面体として OPT10 へ接続した。コアの多面体性・非空時の有界性とブロック不在との同値を証明し、3人多数決型ゲームの空コア、対称3人ゲームのコア非空条件 $b\ge 3a/2$ を導いて GAME-B2 の balancedness への入口を閉じた。Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-B2「平衡ゲーム・Bondareva--Shapley の定理」を実装。各プレイヤーを重み付きでちょうど1回ずつ覆う平衡重み・平衡集合族と平衡ゲームを定義し、GAME-B1 の3人多数決型ゲームで重み $1/2$ の二人提携族が要求総額 $3/2>v(N)$ を与える空コア証明書になることを具体計算した。コア制約を「全提携要求を満たす最小総配分」の線形計画へ直し、その Lagrangian から双対実行可能条件が平衡重みそのものになることを導出した。OPT10 の強双対性を使って Bondareva--Shapley の必要十分性を完全証明し、空コアでは平衡重みが Farkas 型の実行不能証明書になることを OPT2 へ接続した。4人サイクル例、Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-B3「Shapley 値・限界貢献・公理化」を実装。提携への参加で増える価値を限界貢献として定義し、Shapley 係数 $|S|!(n-|S|-1)!/n!$ を一様ランダムな到着順で前任者集合が $S$ となる確率として数え上げから導出した。3人ゲームを直接公式・6通りの到着順・全会一致ゲーム分解の三つの経路で計算し、効率性・対称性・零プレイヤー性・加法性の四公理を定式化した。任意の有限 TU ゲームを全会一致ゲームの有限和へ一意分解し、各 $a_Tu_T$ の配分を公理から直接決めることで、余分な連続性や実数倍線形性を仮定せず Shapley 値の公理的一意性を完全証明した。さらにコア空の多数決型ゲームと、コア非空でも Shapley 値がコア外になる3人ゲームを示し、安定性と平均限界貢献を区別した。Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-B4「凸ゲーム・優モジュラ性」を実装。優モジュラ性と増大型限界貢献の同値を完全証明し、順列ごとの限界ベクトルを導入した。凸ゲームなら任意の限界ベクトルがコアに属し、逆にすべての限界ベクトルがコアに属するならゲームが凸であることを証明して、凸性を限界ベクトルの安定性で特徴付けた。GAME-B3 のランダム到着順表示と GAME-B1 のコアの凸性から、凸ゲームの Shapley 値がコアに属しコアが非空となることを導いた。二人組の非負相乗効果ゲームで一般形を計算し、GAME-B3 の非凸反例では優モジュラ不等式・限界貢献比較・限界ベクトルのコア所属がどこで壊れるかまで追った。Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-B5「最小コア・仁」を実装。提携の超過要求 e(S,x)=v(S)-x(S) を導入し、最大超過要求を最小化する最小コアを OPT10 の線形計画として定式化した。最小コア値が非正であることとコア非空の同値を証明し、空コアの3人多数決型ゲームで最小コア値 1/3 と配分 (1/3,1/3,1/3) を直接導出した。超過要求を非増加順に並べたベクトルの辞書式最小化として仁を定義し、コンパクト性・線形性を使って存在と一意性を証明した。v({1,2})=1, v(N)=2 の3人ゲームでは最小コアが線分として残ることを示し、第2段階の線形最適化で仁 (3/4,3/4,1/2) に絞り、Shapley 値 (5/6,5/6,1/3) と安定性原理の違いを比較した。Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-B6「投票ゲーム・投票力指数」を実装。有限単純投票ゲームを単調な0-1値特性関数として導入し、重み付き表示、勝利提携、拒否権プレイヤーを具体例から整理した。GAME-B3 の Shapley 値を単純投票ゲームへ適用して Shapley--Shubik 指数を定義し、ランダム順列で初めて敗北から勝利へ変える pivot の確率として完全に導出した。さらに Banzhaf swing 数、確率化 Banzhaf 指数、正規化 Banzhaf 指数を区別し、一様部分集合モデルから確率表示を証明した。[3;2,1,1] で Shapley--Shubik 指数 (2/3,1/6,1/6) と正規化 Banzhaf 指数 (3/5,1/5,1/5) を比較し、[51;49,49,2] では重み比 49:49:2 に対して両投票力指数が (1/3,1/3,1/3) となることを勝利提携構造から示した。同じ勝利提携族を持つ重み表示では投票力指数が不変であること、零プレイヤー・対称プレイヤー・独裁者の指数を証明し、Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-C1「Nash 交渉問題」を実装。実行可能集合と決裂点から個別合理的集合・本質性・Nash 積を導入し、正の利得増分領域では Nash 積最大化が対数和最大化と同値になることを証明した。コンパクト性で解の存在、essentiality で正の利得増分、凸性と対数目的の狭義凹性で一意性を閉じた。線形資源制約では OPT5 の Slater 条件と KKT 条件を局所確認し、x_i^*=d_i+(B-a・d)/(n a_i) を導出した。さらにパレート効率性、決裂点の比較静学、非凸実行可能集合で一意性の中点議論が壊れる反例を扱い、Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-C2「Nash 交渉解の公理化」を実装。交渉解規則を個別合理的集合から一点を選ぶ規則として定義し、パレート効率性・対称性・正のアフィン変換に対する不変性・無関係な選択肢からの独立性を具体例から定式化した。Nash 交渉解が四公理を満たすことを GAME-C1 の一意性と Nash 積の変換則から証明し、任意の問題を d=0・Nash 解=(1,...,1) へ正規化した。正規化後の実行可能集合について、凸性と積の方向微分から sum_i y_i<=n の対称単体に含まれることを証明し、対称性・パレート効率性で単体上の解を (1,...,1) に固定したうえで IIA で元の集合へ戻し、Nash 交渉解の公理的特徴付けを完全証明した。各公理を外したときに失われる証明機構と、GAME-B3 の Shapley 値の「全会一致ゲーム分解＋加法性」との違いも整理し、Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。
- [x] GAME-C3「代替的交渉解」を実装。二人の本質的 Nash 交渉問題で理想点と理想点への相対到達率を導入し、決裂点から理想点への線上で最大の実行可能相対到達率を選ぶ Kalai--Smorodinsky 解を定義した。コンパクト性・本質性・下方包括性から存在と一意性を示し、凸性と下方包括性を使ってパレート効率性を完全証明した。正のアフィン不変性、理想点固定の制限単調性を証明し、曲線フロンティア x2<=1-x1^2 で Nash 解 (1/sqrt(3),2/3) と KS 解 ((sqrt(5)-1)/2,(sqrt(5)-1)/2) が異なることを具体計算した。さらに旧解を残した集合縮小でも理想点が変われば KS 解が動く反例から IIA 不成立を確認し、絶対的な等利得増分が効用尺度に依存する一方、KS の相対到達率は尺度変更に不変であることを比較した。微分可能フロンティアでは Nash と KS が一致する接線条件も導き、Level A 4題 / B 3題 / C 1題と全問詳細解答を追加した。\n- 次の実装対象：**GAME-C4「Rubinstein 交渉」**。交互提案ゲームを GAME-A5 の展開形ゲーム・部分ゲーム完全均衡へ接続し、割引、定常戦略、Rubinstein 交渉解を扱う。
- 協力ゲームの広い学部修了ラインは B1--B6 に C1--C3 と D3--D4 を加えた範囲とする。

## Phase 8：ゲーム理論外伝 C

```text
GAME-C1 → GAME-C2 → GAME-C3 → GAME-C4 → GAME-C5 → GAME-C6 ──┐
GAME-A10 ───────────────────────────────────────────────────────┴→ GAME-C7
```

- C1 は OPT5 を使い、パレート効率は MICRO5 の canonical 定義を再利用する。
- C4 は GAME-A5 を使う。
- C7 は GAME-A10 の PBE を使う。

## Phase 9：ゲーム理論外伝 D

```text
GAME-D1 → GAME-D2
DOPT3 / DOPT4 → GAME-D3
GAME-D3 + GAME-B1 + MICRO6 → GAME-D4
```

---

# 16. 外伝の執筆原則

MICRO / GAME も `dream-theater-index.json` に掲載する場合は DREAM THEATER の現行規約をそのまま適用する。

理由付き例外がなければ、変更章ごとに実本文上で最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

を置き、全演習に詳細解答を付ける。

本番答案・20点採点基準は新規追加しない。

## 16.1 数学を応用章で再講義しない

例えば MICRO2 で KKT を最初から証明し直さない。

標準手順は

1. 経済・ゲーム上の問題を数理最適化問題へ翻訳する。
2. 参照する OPT / FIX 定理の仮定を確認する。
3. 定理を適用する。
4. 数学的結論を元の応用語彙へ戻す。
5. 仮定を失うと何が壊れるかを示す。

とする。

## 16.2 直接例を必須にする

代表例候補：

- OPT：(|x|)、二次関数、半空間、多面体
- LP：2変数 LP、輸送・割当の小規模例
- RKHS：線形 kernel、多項式 kernel、Gaussian kernel
- MICRO：Cobb--Douglas、CES、二財二主体純粋交換経済
- GAME-A：表裏合わせゲーム、prisoner's dilemma
- GAME-B：3人 transferable-utility game
- GAME-C：二次元 bargaining polygon
- GAME-D：小規模 stable marriage、4×4 程度の assignment

## 16.3 反例では失った仮定と壊れた機構を説明する

最低でも次の種類を候補とする。

- 非凸問題で KKT が十分条件にならない例
- constraint qualification が失敗して乗数表示が壊れる例
- 非凸選好・非凸生産で第二厚生定理の支持価格構成が壊れる例
- pure Nash equilibrium が存在しない有限ゲーム
- core が空の協力ゲーム
- convex game でないため Shapley 値が core 外へ出る例
- 非凸 bargaining set で標準的な凹最適化構造が失われる例
- matching で stability と Pareto 的な望ましさが一致しない例

---

# 17. 主要総合章

この計画全体を象徴する章として、次を重点章とする。

1. **GAME-A2**：minimax を LP 双対として理解する。
2. **GAME-A10**：SPE と Bayesian game を belief / PBE で合流させる。
3. **GAME-B2**：Bondareva--Shapley を LP 双対 / Farkas として理解する。
4. **GAME-C4 / C6**：Rubinstein 交渉から公理的 Nash 解の非協力的基礎へ接続する。
5. **GAME-D4**：assignment LP・双対価格・core・競争均衡を統合する。
6. **MICRO5**：Pareto 効率と価格を支持超平面で結ぶ。
7. **MICRO7**：一般均衡存在を需要対応と Kakutani の不動点として閉じる。
8. **MICRO10**：顕示選好と Afriat の定理を線形不等式・合理化可能性で結ぶ。
9. **MICRO11 / MICRO12**：期待効用の公理化からリスク回避・確率優越へ進む。
10. **RKHS4**：最大マージン SVM を凸 QP・双対・KKT として閉じる。

個別トピックを増やすことより、これらの章で複数系列が本当に合流することを優先する。

---

# 18. 実装時の検証

各 DREAM THEATER 章の変更では、現行規約に従い少なくとも変更内容に応じて次を実行する。

```text
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
```

`knowledge.yaml` や概念依存を変更する場合は対応する strict validation を実行する。読む順ガイドだけの変更は Pages / リンク検証と prerequisite の人手照合で確認する。

PR では changed-only strict validation を原則とし、既存章の `knowledge.yaml`、index の削除・移動・並べ替え、全体レジストリ・監査エンジン等へ波及する変更だけ full audit を行う。

CI green は完成の十分条件ではない。各章で learning objective、定義例、主要証明、仮定の役割、反例、A4/B3/C1 演習、詳細解答を人手で再確認する。

---

# 19. 本計画と地下帝国計画の境界

`DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md` は「現実の問題から数学へ降りる」応用記事群を設計する。

本計画は、それとは別に **標準数学・数理経済学・ゲーム理論として体系的に読む主線／外伝系列**を設計する。

したがって、

- 地下帝国の裁定機会から線形計画へ触れる場合は OPT10 へ送る。
- 地下帝国の逆問題から正則化へ触れる場合は OPT8 / RKHS 系列へ送る。
- 本計画側で地下帝国の記事内容を重複再現しない。

両計画は応用入口と理論本体という役割分担にする。
