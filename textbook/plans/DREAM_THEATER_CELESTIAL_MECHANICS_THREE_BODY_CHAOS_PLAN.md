# DREAM THEATER 天体力学・三体問題・Hamiltonian chaos コース計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

二体問題の完全可積分性を基準に、三体問題・制限三体問題・Poincare の非可積分性・共鳴・ホモクリニック構造・Hamiltonian chaos・太陽系長期力学までを一つの物語として構成する。

中心問いは、

> Kepler の二体問題はなぜ解けるのに、天体を一つ増やすと運動は本質的に複雑になるのか。

とする。

「一般解を閉形式で書けない」という事実だけで三体問題を語らず、保存量・自由度・摂動・不変多様体・Poincare 写像・非可積分性・KAM を用いて、何が壊れ何が残るかを数学的に追う。

## 1. 市販教科書との照合

主参照:

- 齋藤利弥『解析力学講義』日本評論社  
  https://www.nippyo.co.jp/shop/book/1317.html
- 柴山允瑠『重点解説 ハミルトン力学系―可積分系とKAM理論を中心に―』サイエンス社  
  https://saiensu.co.jp/search/?isbn=978-4-7819-9001-9&y=2023
- Henri Poincare『ポアンカレ 常微分方程式』共立出版  
  https://www.books.or.jp/book-details/9784320011595
- Carl D. Murray and Stanley F. Dermott, *Solar System Dynamics*, Cambridge University Press  
  https://www.cambridge.org/core/books/solar-system-dynamics/108745217E4A18190CBA340ED5E477A2
- Stephen Wiggins, *Introduction to Applied Nonlinear Dynamical Systems and Chaos*, Springer  
  https://link.springer.com/book/10.1007/b97481
- 松葉育雄『力学系カオス』森北出版  
  https://www.morikita.co.jp/books/mid/015459

齋藤の「二体問題 → 自由度2の Hamilton 系 → 制限三体問題 → Poincare の定理」と、Murray--Dermott の「二体 → 制限三体 → secular / resonant perturbation → chaos and long-term evolution」を主要な射程基準とする。

## 2. prerequisite

必須:

- 古典力学 I の中心力・Kepler・2体問題
- 解析力学 I の Hamilton 形式・正準変換・Poisson 括弧
- 可積分系 PLAN の INT1--INT5 の主要内容
- ODE の流れ・Poincare 写像
- 力学系の安定・不安定多様体と局所線形化

推奨:

- AMECH II の symmetry / reduction
- INT6--INT8 の Birkhoff / KAM
- 数値解析の ODE integration の基礎

CELE 後半は INT8 と相互参照可能だが、循環依存を避けるため、KAM の定理そのものは INT8 を canonical owner とする。

## 3. 章構成

候補 ID: CELE1--CELE8。

### CELE1 二体問題を「可積分系」として読み直す

- Newtonian two-body problem
- center-of-mass reduction
- reduced mass
- central force
- angular momentum
- effective potential
- Kepler orbits
- eccentricity / energy classification
- Runge--Lenz vector
- hidden symmetry の入口
- action variables への接続

古典力学 I の結果を再証明し直すのではなく、保存量と可積分性の観点で再編する。

### CELE2 $N$ 体 Hamiltonian と三体問題

- Newtonian $N$-body Hamiltonian
- translation / rotation symmetry
- total momentum / angular momentum
- center-of-mass reduction
- collision singularity
- three-body phase space
- degrees of freedom count
- known first integrals
- なぜ二体問題の reduction がそのまま完結しないか

保存量の個数と Liouville integrability の条件を混同しない。

### CELE3 三体問題の特殊解

- Euler collinear solutions
- Lagrange equilateral solutions
- homographic motion
- central configurations
- scaling
- relative equilibrium
- rotating frame
- stability question

AMECH II の symmetry / relative equilibrium と接続する。

### CELE4 円制限三体問題

- circular restricted three-body problem
- nondimensionalization
- rotating coordinates
- effective potential
- Jacobi integral
- zero-velocity curve
- Hill region
- five Lagrange points
- linear stability of $L_1,\ldots,L_5$
- transport through neck regions の入口

具体的なパラメータで Lagrange 点と Hill 領域を計算する。

### CELE5 Poincare・摂動・非可積分性

- Kepler problem as integrable limit
- perturbing function
- resonant terms
- Poincare section
- return map
- Poincare nonintegrability theorem の位置づけ
- analytic first integrals の制約
- restricted three-body problem への適用

「非可積分」を「数値計算で複雑に見える」と同一視せず、どの class の first integral が存在しないと言っているかを明示する。

### CELE6 ホモクリニック構造と Hamiltonian chaos

- hyperbolic periodic orbit
- stable / unstable manifold
- homoclinic orbit
- transverse homoclinic intersection
- homoclinic tangle
- Smale--Birkhoff mechanism
- horseshoe / symbolic dynamics への接続
- transport and lobe dynamics の入口

stable manifold theorem や horseshoe の一般証明は DYN 系列を参照し、本章では Hamiltonian / celestial setting での機構を主役にする。

### CELE7 共鳴・KAM・規則運動とカオスの共存

- resonant island
- destroyed separatrix
- surviving KAM torus
- cantorus の入口
- Lyapunov exponent の解釈
- Poincare section の読み方
- resonance overlap の経験則
- Arnold diffusion の位置づけ

「KAM により太陽系が安定と証明された」という誤解を避け、適用条件と有限時間予測可能性を区別する。

### CELE8 太陽系の長期力学

- disturbing function
- secular perturbation
- resonant perturbation
- mean-motion resonance
- Kirkwood gaps
- Trojan motion
- spin--orbit resonance の入口
- long-term stability / instability
- deterministic but not indefinitely predictable
- numerical experiment と厳密理論の役割分担

特定の最新数値結果を固定知識として埋め込まず、長期安定性を議論する数学的枠組みを主役にする。

## 4. canonical ownership と境界

本科目が canonical owner:

- three-body problem の Hamiltonian formulation
- central configuration / Euler--Lagrange special solutions
- circular restricted three-body problem
- Jacobi integral / Hill region / Lagrange points
- celestial mechanics における Poincare nonintegrability の適用
- celestial Hamiltonian chaos
- secular / resonant perturbation の天体力学的意味
- solar-system long-term dynamics への数学的入口

他系列を参照:

- Kepler / 2-body の初等力学: 古典力学 I
- symplectic geometry / momentum map / reduction: 解析力学 II
- Liouville--Arnold / Birkhoff / KAM: INT 系列
- stable manifold / horseshoe / symbolic dynamics / chaos の一般定理: DYN / ODE 系列
- high-precision symplectic integrator: 数値解析の将来拡張

## 5. 力学系系列との責務分担

DYN 系列では、一般の力学系として

- invariant manifold
- Poincare map
- local / global bifurcation
- homoclinic intersection
- symbolic dynamics
- chaos の定義と代表的十分条件

を扱う。

CELE 系列ではそれらを、

- restricted three-body problem
- periodic orbit around Lagrange points
- resonant dynamics
- solar-system transport

へ適用する。一般定理を CELE で再証明して二重管理しない。

## 6. 教育設計

本科目の中心導線は次とする。

```text
2体問題は可積分
  ↓
3体にすると保存量だけでは足りない
  ↓
制限三体問題で具体的に見る
  ↓
Poincare section / perturbation
  ↓
非可積分性
  ↓
homoclinic tangle
  ↓
Hamiltonian chaos
  ↓
それでも KAM torus は一部残る
  ↓
太陽系では秩序とカオスが共存する
```

各章で、解析式だけでなく位相図・Poincare section・軌道の数値確認を必要に応じて使う。ただし数値図を証明の代替にしない。

理由付き例外がなければ各章 Level A 4題、B 3題、C 1題以上、全問詳細解答。

## 7. 完成条件

- 二体問題が Liouville 可積分であることを保存量と自由度から説明できる。
- 三体問題で重心 reduction 後の自由度と既知保存量を数えられる。
- Euler / Lagrange 特殊解を central configuration として理解できる。
- 円制限三体問題の rotating-frame Hamiltonian と Jacobi integral を導ける。
- Lagrange 点と Hill region を計算・解釈できる。
- Poincare nonintegrability の主張を「何が存在しないか」まで正確に説明できる。
- transverse homoclinic intersection から chaos へ至る論理を DYN の定理と接続できる。
- KAM torus、resonance、chaotic region が同じ phase space に共存することを説明できる。
- 太陽系長期力学で厳密理論・摂動論・数値計算が担う役割を区別できる。

## 8. 実装順

1. MECH / AMECH / INT / DYN との重複監査
2. CELE1--CELE2
3. CELE3--CELE4
4. CELE5--CELE6
5. CELE7--CELE8
6. numerical lab の要否判断
7. knowledge DAG / public index / series manifest
8. 数学的完全性・物理モデル・数値図の三系統レビュー
