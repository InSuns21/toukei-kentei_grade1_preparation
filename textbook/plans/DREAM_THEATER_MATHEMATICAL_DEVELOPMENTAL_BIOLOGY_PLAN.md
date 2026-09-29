# DREAM THEATER 数理発生生物学入門・応用コース計画

作成日: 2026-09-29  
状態: planned  
配置予定: DREAM THEATER「応用系」

## 0. 目的

発生生物学を、遺伝子名の暗記ではなく **化学反応・拡散・安定性・力・自己組織化** の観点から読む入門応用コースを追加する。

この系列は、発生を学ぶ前に力学系・確率過程・PDE・連続体力学を一巡する構成にしない。**必須前提は基礎科目の実解析と線形代数まで**とし、それを越える概念は各章で必要最小限だけ局所導入する。

## 1. 前提

必須前提:
- 基礎科目「実解析」
- 基礎科目「線形代数」

必須にしない:
- 常微分方程式 I / II
- 力学系
- 偏微分方程式
- 確率論・確率過程・確率解析
- ベクトル解析
- 連続体力学
- 数値解析

これらは発展リンクとして接続し、本文で暗黙前提にしない。

## 2. 設計原則

1. 現象から入る。「胚のどこにいるかをどう知るか」「なぜ縞ができるか」「なぜ組織が曲がるか」を先に置く。
2. 高度な理論を局所導入する。固定点、線形化、拡散方程式、簡単なばね・摩擦モデルはその章内で導入する。
3. PDE は一次元の最小形から扱う。一般的な存在一意性、弱解、Sobolev 空間は要求しない。
4. 力学は離散モデルから入る。細胞を点・ばね・境界として扱い、応力テンソルから始めない。
5. 確率過程は本線から外す。ノイズの存在は扱うが、SDE や master equation は発展欄へ送る。
6. 数値計算は現象観察の補助とし、Euler 法・一次元差分程度を局所導入する。

## 3. 章構成

章 ID は実装時の衝突監査後に確定する。候補は MDB1--MDB8。

### MDB1 発生現象を数理モデルにする
- 状態変数・パラメータ
- 時間スケール・空間スケール
- 濃度・細胞数・位置・力
- 離散モデルと連続モデル
- feedback
- モデルが捨てる要素の明示

到達点: 発生現象を「測れる量」と「関係式」へ翻訳できる。

### MDB2 化学反応・遺伝子調節・細胞運命

最小モデル:

$$
\frac{dx}{dt}=f(x)
$$

- production / degradation
- mass action の初歩
- Hill 型応答
- 平衡状態
- 正帰還・負帰還
- 双安定性
- Jacobian と一次近似
- 固有値による局所安定性の最小導入

到達点: 細胞運命決定を双安定な反応系として説明できる。

### MDB3 拡散と morphogen

$$
\frac{\partial c}{\partial t}
=
D\frac{\partial^2 c}{\partial x^2}
-kc+s(x)
$$

- Fick 型 flux
- 拡散方程式
- 生成・分解
- 定常勾配
- characteristic length
- threshold と位置情報
- source / sink
- 初期条件・境界条件

到達点: 生成・拡散・分解の釣り合いから morphogen gradient を説明できる。

### MDB4 反応拡散と Turing pattern

$$
\frac{\partial u}{\partial t}=D_u\nabla^2u+f(u,v),
\qquad
\frac{\partial v}{\partial t}=D_v\nabla^2v+g(u,v)
$$

- 二成分反応系
- 空間一様平衡
- 微小摂動
- 空間モード
- diffusion-driven instability
- 波長選択
- Turing 条件の意味
- 「すべての模様が Turing 型」という誤解の回避

到達点: 拡散が一様状態を不安定化し得る理由を追える。

### MDB5 発生時計・振動・進行波
- 負帰還と遅れ
- 位相・周期
- 結合振動子の最小モデル
- 同期・位相差
- traveling wave
- clock-and-wavefront
- 体節形成への接続

一般の分岐理論や Poincaré 写像は必須にしない。

### MDB6 細胞から組織へ：最小力学

$$
\gamma \frac{dx_i}{dt}=F_i
$$

- ばね・摩擦
- 接着
- cortical tension
- active contraction
- overdamped dynamics
- 細胞列の伸縮
- vertex / spring model の入口
- tissue folding
- 粗視化としての連続体近似

応力テンソルや Navier--Stokes は前提にしない。

### MDB7 mechanochemical coupling

$$
\frac{\partial c}{\partial t}
=
D\nabla^2c+f(c,u),
\qquad
\gamma\frac{\partial u}{\partial t}=g(c,u)
$$

- chemical field と mechanical field
- mechanosensing
- strain / tension 依存反応
- 変形に依存する輸送
- pattern と shape の共進化
- chemical prepattern と mechanical self-organization

到達点: 発生を一方向の gene → protein → shape ではなく feedback 系として説明できる。

### MDB8 自己組織化・organoid・統合モデル
- symmetry breaking
- positional information
- self-organization
- robustness / scaling
- regeneration
- organoid / gastruloid
- 複数モデルと identifiability
- パラメータ推定の入口

統合演習では morphogen、activator--inhibitor、oscillator + wavefront、chemical switch + tissue mechanics のいずれかを構築する。

## 4. 発展欄へ送る内容

- stochastic gene expression
- chemical master equation
- Gillespie algorithm
- SDE / Langevin approximation
- stress / strain tensor
- active gel / active fluid
- viscoelasticity
- chemotaxis
- moving boundary / phase field
- curvature flow

これらは「数理発生生物学・発展」で正面から扱う。

## 5. 章間依存

実解析 + 線形代数 → MDB1。  
MDB1 から MDB2 / MDB6 に分岐し、MDB2 → MDB3 / MDB5、MDB3 → MDB4、MDB3 + MDB6 → MDB7、最後に MDB4 + MDB5 + MDB7 → MDB8 とする。

direct prerequisite は実装時に各 chapter.yaml へ最小限で記録する。

## 6. 実装フェーズ

- Phase 0: ID・用語・重複範囲監査
- Phase 1: MDB1--MDB2
- Phase 2: MDB3--MDB4
- Phase 3: MDB5--MDB6
- Phase 4: MDB7--MDB8
- Phase 5: 公開索引・knowledge DAG・validation 統合

公開時に textbook/dream-theater.md の「応用系」に **数理発生生物学入門** を追加する。

## 7. 完了条件

- 必須前提が実解析・線形代数を越えていない
- prerequisite 外の ODE / PDE / stochastic / continuum mechanics を暗黙使用していない
- 各章に発生現象・モデル変数・仮定・捨てた要素が明示されている
- 数式だけでなく、生物学上「何を説明しているか」が読める
- advanced topic は発展編へ明確に出口を持つ
