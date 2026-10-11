# DREAM THEATER Diophantine近似（NDA1〜NDA8）

分冊: 2026-10-11  
状態: planned（科目固有の実装は未着手）

## 中心問いと直接依存

[NT1〜3/NT7](DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)、RA、NDA8ではMTの必要部分。後続に超越数論TRNとEOM017。

**本科目の正本：** 最良近似・連分数、Dirichlet、Roth、計量的Diophantine近似。

# 3A. Diophantine近似 NDA1--NDA8

## 3A.0 位置付け

NT7 に一章分の Diophantine 近似を圧縮したり、EOM017 のためだけに irrationality exponent の補講を追加したりしない。

**Diophantine近似を、整数論の内部に置く独立1セメスター科目として設計する。**

公開科目名は「Diophantine近似」とする。管理 ID は仮に NDA1--NDA8 とし、実装開始時に衝突を再確認する。

主 prerequisite:

- NT1--NT3 の必要部分
- NT7
- RA1 / RA1A
- NDA3 以降で必要に応じて線形代数・凸幾何
- NDA8 で測度論 / 確率論の必要部分

## NDA1 連分数と最良有理近似

- finite / infinite continued fraction
- convergent
- recurrence
- determinant identity
- best approximation
- 二次無理数の周期性
- Pell 方程式との対応

NT7 の内容を受け、近似論として再整理する。

## NDA2 Dirichlet・Hurwitz・badly approximable numbers

- pigeonhole による Dirichlet approximation
- Hurwitz theorem
- approximation constant
- badly approximable number
- golden ratio の位置付け

## NDA3 geometry of numbers と同時近似

- lattice の最小導入
- symmetric convex body
- Minkowski theorem
- simultaneous approximation
- linear forms

geometry of numbers を巨大な別系列へ膨らませず、本科目に必要な標準部分を閉じる。

## NDA4 一様分布・Kronecker・Weyl

- fractional part
- irrational rotation
- equidistribution mod 1
- Weyl criterion
- Kronecker approximation theorem
- QMC / dynamical systems との接続

## NDA5 irrationality measure・irrationality exponent

- rational approximation exponent
- irrationality exponent $\mu(\alpha)$
- $\mu(\alpha)\ge2$
- badly approximable numbers との関係
- 具体例の exponent

EOM017 で使う語彙はここを canonical owner とする。

## NDA6 Liouville 数・超越数

- Liouville theorem
- Liouville numbers
- transcendence
- 代数的数への近似制約
- 明示的 transcendental number

## NDA7 Thue--Siegel--Roth

- Roth theorem の exact statement
- algebraic irrational に対する $\mu(\alpha)=2$
- Thue / Siegel / Roth の歴史的流れ
- proof architecture
- 完全証明を採用する場合の追加 prerequisite の監査

黒箱一行では済ませない一方、EOM017 のためだけに研究レベルの補助理論を逆輸入しない。

## NDA8 metric Diophantine approximation

- almost every real number の irrationality exponent
- Borel--Cantelli
- Khintchine theorem への入口
- null / full measure
- exceptional set
- Hausdorff dimension との接続

MT8 / 幾何学的測度論への横断リンクを置く。

## NDA から EOM017 への出口

~~~text
NT7
 ↓
NDA1--NDA4
 ↓
NDA5 irrationality exponent
 ↓
NDA6--NDA8
 ↓
代数的無理数では Roth により exponent 2
 ↓
超越数 pi では何が分かるか
 ↓
EOM017
~~~

EOM017 は irrationality exponent の初出定義を担当しない。

---

## 章別執筆・数理査読・完了判定

本PLANは設計段階であり、未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読して直前完了章の追跡監査とともに記録する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。
