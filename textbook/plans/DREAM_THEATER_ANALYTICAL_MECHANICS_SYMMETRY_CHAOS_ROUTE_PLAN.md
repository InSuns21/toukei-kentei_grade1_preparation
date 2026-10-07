# DREAM THEATER 解析力学・対称性・可積分系・三体問題 統合ルート計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

本計画は、古典力学から解析力学へ進んだ読者を、

```text
古典力学 I
  ↓
解析力学 I
  ├─→ 変分問題
  ↓
解析力学 II：幾何学的力学と対称性
  ↓
可積分系と摂動論・KAM
  ↓
天体力学・三体問題・Hamiltonian chaos
```

という一枚の依存設計へまとめる route PLAN である。

中心問いは次の三つとする。

1. Newton 方程式は、変分原理・シンプレクティック構造・Lie 群作用によってどのように再構成されるか。
2. 対称性はなぜ保存量を生み、可積分性はなぜ運動を不変トーラス上の準周期運動へ還元するのか。
3. 二体問題では成立した可積分性が三体問題で壊れるとき、Poincare の非可積分性、ホモクリニック構造、KAM 理論、カオスはどのようにつながるか。

既存 PLAN を巨大 umbrella に吸収せず、中心問いと証明機構が異なる科目を独立 PLAN に分ける。本 route PLAN は順序・責務・canonical ownership の台帳であり、各章そのものの実装正本ではない。

## 1. 構成する PLAN

### 1.1 既存

- `DREAM_THEATER_CLASSICAL_MECHANICS_I_PLAN.md`
  - Newton 力学、保存則、中心力、Kepler 問題、2体問題、剛体
- `DREAM_THEATER_ANALYTICAL_MECHANICS_I_PLAN.md`
  - 一般化座標、Lagrange 形式、Hamilton 形式、Poisson 括弧、正準変換、Hamilton--Jacobi

### 1.2 新規

- `DREAM_THEATER_ANALYTICAL_MECHANICS_II_GEOMETRIC_SYMMETRY_PLAN.md`
  - シンプレクティック幾何、Lie 群作用、Noether、運動量写像、簡約
- `DREAM_THEATER_VARIATIONAL_PROBLEMS_GEOMETRIC_PLAN.md`
  - 第二変分、測地線、Jacobi 場、極小曲面、安定性
- `DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md`
  - Liouville--Arnold、作用角変数、共鳴、小分母、Birkhoff 標準形、KAM
- `DREAM_THEATER_CELESTIAL_MECHANICS_THREE_BODY_CHAOS_PLAN.md`
  - 三体問題、制限三体問題、Poincare の非可積分性、Hamiltonian chaos、太陽系長期力学

「可積分系と摂動論」と「可積分系・KAM」は同じ理論を二重管理しないため、一つの PLAN に統合する。

## 2. 推奨読順

### 主線

```text
MECH
  ↓
AMECH1--8
  ↓
AMECH9--16
  ↓
INT1--8
  ↓
CELE1--8
```

### 変分の並行枝

```text
実解析・ODE・微分幾何
        ↓
      VAR1--8
        ↘
   AMECH / 幾何解析 / 測地線・安定性
```

変分問題は解析力学 I の「作用から Euler--Lagrange 方程式を出す」だけでは不足する第二変分・Jacobi 場・極小曲面の安定性を数学側で閉じる。したがって AMECH3 の単なる続編ではなく、微分幾何・幾何解析へも出る独立枝とする。

## 3. canonical ownership

| 主題 | canonical owner |
|---|---|
| Newton 方程式、仕事・エネルギー、中心力、Kepler、2体問題 | 古典力学 I |
| 一般化座標、作用、Lagrange/Hamilton、Poisson 括弧、正準変換、Hamilton--Jacobi | 解析力学 I |
| シンプレクティック形式、余接束の正準形式、Lie 群作用、運動量写像、Marsden--Weinstein 型簡約 | 解析力学 II |
| 第一・第二変分、index form、Jacobi 場、共役点、極小曲面の第二変分 | 変分問題 |
| Liouville 可積分性、Liouville--Arnold、作用角変数、近可積分系、Birkhoff 標準形、KAM | 可積分系と摂動論・KAM |
| 三体問題、制限三体問題、Lagrange 点、Jacobi 積分、天体力学上の非可積分性・共鳴・長期力学 | 天体力学・三体問題・カオス |
| 一般の流れ、Poincare 写像、安定・不安定多様体、分岐、symbolic dynamics、chaos の一般論 | 力学系コース / ODE 系列 |

CELE 系列で Smale horseshoe や安定・不安定多様体を使う場合、一般定理の完全証明は力学系系列を参照し、天体力学では Hamiltonian 系への適用と幾何を主役にする。

## 4. 市販教科書との照合

特定の一冊を写すのではなく、標準的な教科書の射程を比較して DREAM THEATER の既存 dependency に合わせる。

### 4.1 解析力学 I

- 宮下精二『解析力学』裳華房  
  https://www.shokabo.co.jp/mybooks/ISBN978-4-7853-2090-4.htm
- 久保謙一『解析力学』裳華房  
  https://www.shokabo.co.jp/mybooks/ISBN978-4-7853-2205-2.htm
- 河辺哲次『物理学レクチャーコース 解析力学』裳華房  
  https://www.shokabo.co.jp/mybooks/ISBN978-4-7853-2416-2.htm

作用、Lagrange/Hamilton、正準変換、Noether、Hamilton--Jacobi までを学部標準コアとする。

### 4.2 幾何学的力学と対称性

- Jerrold E. Marsden and Tudor S. Ratiu, *Introduction to Mechanics and Symmetry*, Springer  
  https://link.springer.com/book/10.1007/978-0-387-21792-5
- V. I. Arnold, *Mathematical Methods of Classical Mechanics*, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-2063-1
- 植田一石『数物系のためのシンプレクティック幾何学入門』サイエンス社  
  https://saiensu.co.jp/search/?isbn=978-4-7819-9936-4&y=2018

Marsden--Ratiu の「対称性・運動量写像・簡約」を解析力学 II の中心に置き、深谷『シンプレクティック幾何学』が扱う大域シンプレクティック幾何の研究的話題は本 route の必須範囲にしない。

### 4.3 変分問題

- 小磯憲史『変分問題』共立出版  
  https://www.books.or.jp/book-details/9784320015647

同書の懸垂線・等周問題・弾性曲線から、測地線の安定性、Jacobi 場、極小曲面の安定性へ進む構成を主要な射程基準とする。

### 4.4 可積分系・摂動論・KAM

- 伊藤秀一『常微分方程式と解析力学』共立出版  
  https://www.books.or.jp/book-details/9784320015630
- 柴山允瑠『重点解説 ハミルトン力学系―可積分系とKAM理論を中心に―』サイエンス社  
  https://saiensu.co.jp/search/?isbn=978-4-7819-9001-9&y=2023
- 中村佳正ほか『解析学百科II 可積分系の数理』朝倉書店  
  https://www.asakura.co.jp/detail.php?book_code=11727

伊藤の「完全積分可能系 → Birkhoff 標準形 → twist map → KAM」と、柴山の「Liouville--Arnold → Poincare 非可積分性 → KAM → 制限三体問題 → Arnold 拡散」を主線の基準にする。

### 4.5 天体力学・カオス

- 齋藤利弥『解析力学講義』日本評論社  
  https://www.nippyo.co.jp/shop/book/1317.html
- Henri Poincare『ポアンカレ 常微分方程式』共立出版  
  https://www.books.or.jp/book-details/9784320011595
- Carl D. Murray and Stanley F. Dermott, *Solar System Dynamics*, Cambridge University Press  
  https://www.cambridge.org/core/books/solar-system-dynamics/108745217E4A18190CBA340ED5E477A2
- 松葉育雄『力学系カオス』森北出版  
  https://www.morikita.co.jp/books/mid/015459
- Stephen Wiggins, *Introduction to Applied Nonlinear Dynamical Systems and Chaos*, Springer  
  https://link.springer.com/book/10.1007/b97481

齋藤の制限三体問題・Poincare の定理、Murray--Dermott の二体・制限三体・摂動・共鳴・chaos の流れを CELE 系列の基準とする。

## 5. 依存設計上の原則

1. 解析力学 I の有限自由度 Noether はその場で証明するが、Lie 群作用と運動量写像による座標不変な Noether は解析力学 II が canonical owner。
2. AMECH II は Lie 群・Lie 代数そのものを再構築せず、既存代数・微分幾何系列を prerequisite として使う。
3. 変分問題は Euler--Lagrange の初歩を必要以上に複製せず、第二変分以降を主役にする。
4. 可積分系 PLAN は有限次元 Hamilton 系を主対象とする。KdV、逆散乱、ソリトン、離散可積分系は別系列の対象。
5. 三体問題 PLAN は「解けない」を単に閉形式解がないという意味にしない。第一積分の不足、非可積分性、位相空間の幾何、共鳴、カオスを区別する。
6. KAM は「摂動しても安定」と雑に述べず、非退化条件、Diophantine 条件、残る不変トーラスの意味を明示する。
7. chaos は「見た目が複雑」の同義語にしない。初期値鋭敏性、双曲性、symbolic dynamics、entropy 等の定義・十分条件を責務に応じて区別する。

## 6. 実装単位

推奨順:

1. 古典力学 I
2. 解析力学 I
3. 解析力学 II
4. 変分問題
5. 可積分系と摂動論・KAM
6. 天体力学・三体問題・カオス

ただし変分問題は解析力学 II と並行実装可能とする。実装開始時に各 PLAN を `plans/` から `plans_progress/` へ移し、active series に選ばれたものだけ `dream-theater-work.yaml` と series manifest を更新する。

## 7. 完成像

全系列を通した読者が、次を一続きに説明できることを最終到達点とする。

```text
最小作用
  ↓
Lagrange 方程式
  ↓ Legendre 変換
Hamilton 方程式
  ↓
シンプレクティック構造
  ↓
Lie 群対称性 ─→ 運動量写像 ─→ 簡約
  ↓
Poisson 可換な第一積分
  ↓
Liouville--Arnold / 作用角変数
  ↓
近可積分系・共鳴・小分母
  ↓
Birkhoff / KAM
  ↓
三体問題・Poincare 非可積分性
  ↓
規則運動と Hamiltonian chaos の共存
```

「解析的に解ける系」から「解けないが構造は理解できる系」へ視点が移ることを、本 route の数学的な物語とする。
