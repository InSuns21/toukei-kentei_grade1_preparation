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
 FIX1 Brouwer
        ↓
 FIX2 集合値写像・対応
        ↓
 FIX3 Berge・Kakutani
        ├──→ GAME-A3
        └──→ MICRO7

 OPT1--6 + FIX1--3
        │
        ├──→ MICRO1--8
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

有限財・有限主体の有限次元モデルで一度理論を閉じる。

無限次元の商品空間、主体の連続体は本計画の完成条件に含めない。

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
- convex-valued
- upper hemicontinuity
- Kakutani

有限ゲームの Nash existence theorem を FIX3 から閉じる。

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

Bayesian game、repeated game、stochastic game は今回の A 系列完成条件には入れない。

---

# 10. ゲーム理論外伝 B：協力ゲーム

## GAME-B1 特性関数形ゲーム・core

特性関数

$$
v:2^N\to\mathbb R
$$

から始める。

主題：

- coalition
- characteristic function
- imputation
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

次は将来の外伝候補とするが、今回の A--D 完成条件には含めない。

- mechanism design
- VCG
- auction theory
- Myerson
- social choice
- Bayesian mechanism design
- Bayesian game
- repeated game
- stochastic game
- evolutionary game
- differential game
- mean-field game
- NTU cooperative game の一般論
- infinite-dimensional general equilibrium
- continuum of agents
- Sonnenschein--Mantel--Debreu の本格証明

必要になった時点で GAME-E または MICRO-ADV として別計画を立てる。

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
- [x] RKHS4「最大マージンとハードマージン SVM」を実装。線形分離可能性、関数マージン・幾何マージン、最大マージンの凸 QP 定式化、Slater 条件、Lagrange 双対、KKT、サポートベクトル、正負クラスの凸包非交差と最近点距離、双対変数の凸結合解釈、分類器と双対係数の一意性の違いまで canonical 化した。旧 F0-02B1 は in-place archive とした。\n- 次の実装対象：**RKHS5「soft-margin・hinge loss・kernel SVM」**

```text
RKHS1 → RKHS2 → RKHS3 → RKHS4 → RKHS5
```

## Phase 4：不動点共通基盤

```text
FIX1 → FIX2 → FIX3
```

一般均衡と Nash existence の前に完成させる。

## Phase 5：ミクロ経済学

```text
MICRO1 → MICRO2 → MICRO3 → MICRO4
   ↓
MICRO5 → MICRO6 → MICRO7 → MICRO8
```

MICRO7 は FIX3 完成後とする。

## Phase 6：ゲーム理論外伝 A

```text
GAME-A1 → GAME-A2 → GAME-A3 → GAME-A4 → GAME-A5
```

- A2 は OPT10 を使う。
- A3 は FIX3 を使う。
- A4 は OPT5 / OPT6 を使う。

## Phase 7：ゲーム理論外伝 B

```text
GAME-B1 → GAME-B2 → GAME-B3 → GAME-B4 → GAME-B5
```

- B2 は OPT10 / OPT2 を使う。
- B5 は OPT10 を使う。

## Phase 8：ゲーム理論外伝 C

```text
GAME-C1 → GAME-C2 → GAME-C3 → GAME-C4
```

- C1 は OPT5 を使う。
- C4 は GAME-A5 を使う。

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
- GAME-A：matching pennies、prisoner's dilemma
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
2. **GAME-B2**：Bondareva--Shapley を LP 双対 / Farkas として理解する。
3. **GAME-C1**：Nash 交渉を凹最適化・KKT として理解する。
4. **GAME-D4**：assignment LP・双対価格・core・競争均衡を統合する。
5. **MICRO5**：Pareto 効率と価格を支持超平面で結ぶ。
6. **MICRO7**：一般均衡存在を需要対応と Kakutani の不動点として閉じる。
7. **RKHS4**：最大マージン SVM を凸 QP・双対・KKT として閉じる。

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

knowledge / standard math core を変更する場合は対応する strict validation も実行する。

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
