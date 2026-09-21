# DREAM THEATER：測度・確率の残存ギャップ補完計画

作成日: 2026-09-21

## 0. 目的

小谷眞一『測度と確率』の標準項目と、現行 DREAM THEATER の測度論・位相・確率論・確率解析を照合した結果、既存主線の質を保ったまま補う価値が高い論点として次の6項目を追加する。

1. 一様構造
2. Hausdorff 測度・Hausdorff 次元
3. Poisson の少数法則の一般形
4. 離散時間 Markov 連鎖の可算状態理論
5. Donsker の不変原理
6. Brown 運動の標本路幾何

ただし、既存教材には既に

- 通常教材 P4-02 の二項分布から Poisson 分布への少数法則
- 通常教材 E2-01 の有限状態 Markov 連鎖
- 通常教材 E2-04 のランダムウォークから Brown 運動への拡散極限の概説
- STO4 の Brown 運動・到達時刻・反射原理・強 Markov 性
- STO5 の二次変分
- STO8 の局所時間・滞在時間公式

がある。

したがって新章は既存章を言い換えて複製せず、**通常教材で計算・概説まで扱った論点を、DREAM THEATER で標準数学の定理・証明まで閉じる**ことを役割とする。

未完成章を `dream-theater-index.json` や reader-facing の通読順へ先行登録しない。各章は本文、主要証明、直接例、A4/B3/C1、全問詳細解答、chapter / glossary / knowledge metadata、規定の validation / audit が揃った段階でだけ公開する。

---

## 1. 新しい章 ID と配置

### TOP7：一様構造・一様連続・Cauchy 構造

配置:

`textbook/volumes/00_foundations/TOP7/`

役割:

位相だけでは決まらない「二点が一様に近い」という構造を定式化し、距離空間で暗黙に使ってきた一様連続性、Cauchy 性、完備性、全有界性を一つの言葉で整理する。

中心論点:

- entourage
- uniformity
- metric uniformity
- 一様構造が誘導する位相
- uniformly continuous map
- 同じ位相だが異なる一様構造
- Cauchy filter
- separated uniform space
- completeness
- total boundedness
- metric definitions との一致
- 一様収束と sup metric への橋

停止線:

- general completion of arbitrary uniform spaces の完全構成
- uniformizable space の一般判定定理
- Samuel compactification

直接前提:

`TOP6`

TOP6 で net / filter と全有界性まで導入済みなので、そこから uniformity へ進む。

---

### MT8：Hausdorff 測度・Hausdorff 次元

配置:

`textbook/volumes/00_foundations/MT8/`

役割:

Carathéodory 外測度を「長さ・体積」だけでなくスケール依存の幾何量へ拡張し、測度論と幾何・確率過程を接続する。

中心論点:

- diameter
- delta-Hausdorff content
- Hausdorff outer measure
- metric outer measure
- Borel measurability
- Hausdorff dimension
- Lipschitz map による Hausdorff measure / dimension の単調性
- 区間の Hausdorff dimension
- mass distribution principle
- middle-thirds Cantor set の dimension
- Brownian path geometry への bridge

正規化定数は文献により異なるため、本章では diameter による非正規化版を正本とし、次元は正規化に依存しないことを明示する。

直接前提:

- `F0-00D4` Carathéodory extension / Lebesgue measure
- `F0-00C1` compact metric space / Heine--Borel

停止線:

- Frostman lemma の完全一般形
- geometric measure theory の rectifiability
- Besicovitch covering theorem

---

### F0-00P6B：Poisson 少数法則 — 希少事象の三角配列

配置:

`textbook/volumes/00_foundations/F0_00P6B_Poisson少数法則_希少事象列/`

役割:

P4-02 の二項 `Bin(n,p_n)` の Poisson 極限を重複せず、独立だが非同分布な希少 Bernoulli 事象列へ一般化する。

中心論点:

- Bernoulli triangular array
- infinitesimal condition `max_k p_{n,k} -> 0`
- total intensity `sum_k p_{n,k} -> lambda`
- characteristic function による一般少数法則
- `sum p_{n,k}^2 -> 0` が誤差項を消す機構
- 二項少数法則を特殊例として回収
- 複数カテゴリの rare events から independent Poisson vector への極限
- STO13 の Poisson random measure への bridge

直接前提:

- `F0-00P6` 特性関数・Lévy 連続性定理
- `F0-00P1` 確率空間・確率変数・分布

通常教材 P4-02 は試験向けの既存正本として維持し、本章はその上位一般化とする。

---

### STO2A：離散時間 Markov 連鎖 — 再帰・Green 核・不変測度

配置:

`textbook/volumes/00_foundations/STO2A/`

役割:

E2-01 の有限状態計算を複製せず、可算状態 Markov chain の長期構造を確率論として正本化する。

中心論点:

- canonical Markov chain / transition kernel
- strong Markov property in discrete time
- hitting time / return time
- communication classes
- recurrence / transience
- Green kernel
- expected number of visits
- invariant measure / invariant probability
- positive recurrence / null recurrence
- Kac return-time formula
- reversibility / detailed balance
- birth--death / simple random walk の直接例
- finite irreducible chain を特殊例として回収

直接前提:

- `STO1` stopping time / filtration
- `F0-00P3A` 条件付き期待値
- 必要箇所で通常教材 E2-01 の有限状態計算への reader bridge を置くが、証明責務は本章で閉じる

停止線:

- general state space Harris recurrence
- Meyn--Tweedie theory
- spectral gap / log-Sobolev inequality の一般論

---

### STO3A：経路空間の弱収束・tightness・Donsker 不変原理

配置:

`textbook/volumes/00_foundations/STO3A/`

役割:

E2-04 で「厳密には Donsker が必要」としていた橋を、経路空間上の弱収束として閉じる。

中心論点:

- `C([0,1])` with sup norm
- path-valued random element
- weak convergence on metric spaces
- tightness
- Arzelà--Ascoli と compact containment / modulus of continuity
- finite-dimensional convergence
- tightness + finite-dimensional convergence から過程極限を同定する機構
- polygonal interpolation of random walk
- Donsker invariance principle
- Brownian scaling limit

証明方針:

- finite-dimensional convergence は Cramér--Wold / CLT で閉じる
- tightness criterion は Arzelà--Ascoli と dyadic / increment estimates から章内で示す
- 一般有限分散版では truncation を用いて bounded-increment case へ落とす
- Prokhorov theorem の完全一般形は独立した大規模理論になるため、必要最小限の metric-space tightness theorem を証明境界として明示する

直接前提:

- `STO4` Brown 運動の canonical construction / finite-dimensional law
- `STO2` Doob 最大不等式
- `F0-00P6A` iid CLT

当初案では STO3A を STO4 の直前に置く想定だったが、Donsker の極限対象である standard Brownian motion の canonical owner は既存 STO4 である。forward dependency を避けるため、実装時に **STO4 → STO3A** へ修正する。STO4 自体の prerequisite は変更しない。

停止線:

- Skorokhod `J_1` topology on `D([0,1])`
- empirical-process Donsker theorem
- functional delta method

---

### STO4A：Brown 運動の標本路幾何

配置:

`textbook/volumes/00_foundations/STO4A/`

役割:

STO4, STO5, STO8 で得た Brownian path の確率解析的情報を、正則性・変動・零点集合・Hausdorff dimension の幾何へまとめる。

中心論点:

- almost sure nowhere differentiability
- local Hölder regularity: every exponent `alpha<1/2`
- no Hölder regularity of exponent `alpha>1/2`
- infinite total variation
- quadratic variation as the critical second-order scale
- zero set is closed, has no isolated points, and has Lebesgue measure zero
- Brownian zero set の Hausdorff dimension `1/2`
- local time measure + mass distribution principle
- exact modulus / LIL / graph dimension への outlook

直接前提:

- `STO4` Brown 運動
- `STO5` quadratic variation
- `STO8` local time / occupation time
- `MT8` Hausdorff measure / mass distribution principle

停止線:

- Brownian graph dimension `3/2` の完全証明
- planar Brownian frontier
- intersection exponents
- multifractal analysis
- law of the iterated logarithm の一般理論

---

## 2. DAG

新しい依存関係は次とする。

~~~text
TOP6
  ↓
TOP7  一様構造

F0-00D4 + F0-00C1
  ↓
MT8  Hausdorff measure / dimension
  │
  └──────────────────────────────┐
                                 ↓
STO4 + STO5 + STO8 ───────────→ STO4A Brownian path geometry

F0-00P6 + F0-00P1
  ↓
F0-00P6B  general law of small numbers
  ↓
STO13 Poisson process / random measure

STO1 + F0-00P3A
  ↓
STO2A countable-state Markov chains
  ↓
STO11 general Markov process / generator  （概念上の橋。STO11 の既存 prerequisite は機械的に変更しない）

STO2 + STO4 + F0-00P6A
  ↓
STO3A Donsker
~~~

STO4 は既に STO3 だけを前提に構成済みで、その独立性を維持する。STO3A は STO4 を極限対象の canonical owner として参照する add-on とし、既存 STO4 の prerequisite は変更しない。

---

## 3. 実装フェーズ

### Phase 1：位相・測度の幾何的床

1. TOP7
2. MT8

この2章を先に閉じる。特に MT8 は STO4A の direct prerequisite となる。

### Phase 2：極限定理の穴

3. F0-00P6B
4. STO3A

少数法則を Bernoulli 三角配列へ一般化し、その後に path-space weak convergence と Donsker を閉じる。

### Phase 3：Markov と Brownian geometry

5. STO2A
6. STO4A

E2-01 の試験向け Markov chain を再利用しつつ可算状態理論へ進み、最後に Brownian path geometry を MT8 / STO8 へ接続する。

---

## 4. 証明境界

新章は名前紹介では終わらせない。少なくとも次は本文または canonical dependency で核心証明まで閉じる。

- metric uniformity が uniformity をなすこと
- 同じ topology でも uniformity が異なり得る具体例
- Hausdorff outer measure の外測度性
- metric outer measure から Borel 可測性が出る機構
- Hausdorff dimension の threshold property
- middle-thirds Cantor set の dimension
- general Bernoulli triangular-array Poisson limit
- discrete strong Markov property
- recurrence と Green kernel の対応
- Kac return-time formula の標準形
- Donsker の finite-dimensional convergence と tightness の二本柱
- Brownian path の Hölder threshold / infinite variation
- Brownian zero set の Hausdorff dimension `1/2` の主要機構

Prokhorov theorem の完全一般形、Frostman lemma の完全一般形、一般 state-space Harris recurrence など、独立した大規模理論が必要な箇所だけ intentional black box とし、黒箱の入力と出力を明示する。

---

## 5. 演習方針

各実装章は理由付き例外がない限り、

- Level A: 4題以上
- Level B: 3題以上
- Level C: 1題以上

を置き、全問へ詳細解答を付ける。

各章の Level C は次を主題とする。

- TOP7: same topology / different uniformity を用いた構造比較
- MT8: Cantor set の Hausdorff dimension を upper/lower bound から再構成
- F0-00P6B: non-identically distributed rare events の Poisson vector limit
- STO2A: simple random walk の recurrence/transience と invariant measure
- STO3A: random walk path の tightness + finite-dimensional convergence
- STO4A: local time measure と mass distribution principle による zero-set dimension

---

## 6. 既存章との重複回避

### 少数法則

通常教材 P4-02 の
`law-of-small-numbers-syllabus`
および二項 Poisson 極限は維持する。

F0-00P6B は `Bin(n,p_n)` を再証明するだけの章にせず、
`max p_{n,k}->0`, `sum p_{n,k}->lambda`
という非同分布三角配列を主定理とする。

### Markov chain

通常教材 E2-01 の有限状態の遷移行列、定常分布、周期、吸収問題は維持する。

STO2A は countable-state chain, return time, Green kernel, positive/null recurrence, Kac, reversibility を主役とする。

### Donsker

通常教材 E2-04 の「Donsker が厳密な橋である」という説明は残す。

STO3A を Donsker の canonical proof owner とし、E2-04 を DREAM THEATER 側の証明責務に変更しない。

---

## 7. 公開・検証

各章完成時に少なくとも次を実行する。

~~~bash
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

knowledge / standard math core を変更した場合は対応する strict validation も実行する。

さらに人手で

- formal statement の自己完結性
- stable anchor
- prerequisite 外概念の暗黙使用
- proof dependency
- 直接例
- A4/B3/C1 coverage
- 詳細解答の再現可能性

を確認する。

CI green は完成の十分条件にしない。
