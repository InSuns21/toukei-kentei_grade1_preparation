# DREAM THEATER 天体力学・三体問題・Hamiltonian chaos コース計画

作成日: 2026-10-07  
状態: in_progress（2026-10-13。CELE1〜CELE8本文を実装。系列横断の最終確認・numerical lab 要否判断が残る）

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

- [GMECH](../plan_done/DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)のsymmetry / reduction（使うCELE講だけ直接前提にする）
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

[GMECH](../plan_done/DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)のsymmetry / relative equilibrium と接続する。

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

安定多様体定理や horseshoe の一般証明を使う場合、CELE6の着手時にDYN/ODEのどのcanonical章で証明されているかを確定する。DYN14の線形安定・不安定方向だけで非線形安定多様体定理を既知として扱わない。既存の正本がない結果は、証明担当と直接prerequisiteを先に整える。

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
- symplectic geometry：[SYM](../plan_done/DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)。momentum map / reduction：[GMECH](../plan_done/DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)。
- Liouville--Arnold / Birkhoff / KAM: INT 系列
- stable manifold / horseshoe / symbolic dynamics / chaos の一般定理: DYN / ODE 系列
- high-precision symplectic integrator: 数値解析の将来拡張

## 5. 力学系系列との責務分担

DYN1〜DYN15では、区間写像、記号力学、horseshoeの符号化、線形双曲模型を扱う。非線形のinvariant manifold theorem、一般のPoincare return map、横断homoclinic intersectionからの結論は、既存DYN章が証明を持つと仮定しない。これらをCELE6で使用する前にDYN/ODEの実章・stable anchorと証明ownerを確認し、未整備の一般定理は独立した正本として必要な範囲で補う。

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

1. MECH / AMECH / INT / DYN との重複監査（完了）
2. CELE1--CELE2（完了）
3. CELE3--CELE4
4. CELE5--CELE6
5. CELE7--CELE8（本文・全演習解答実装済み）
6. numerical lab の要否判断
7. knowledge DAG / public index / series manifest
8. 数学的完全性・物理モデル・数値図の三系統レビュー

## 9. 着手時の直接前提・正本担当照合（2026-10-13）

- `textbook/dream-theater-series/MECH.yaml` でMECH1〜8、`AMECH.yaml` でAMECH1〜8、`INT.yaml` でINT1〜8、`GMECH.yaml` でGMECH1〜8、`DYN.yaml` でDYN1〜15の `completed` を確認した。MECH6にはKepler・中心力、INT1〜INT5には可積分性・共鳴、INT8には解析的KAM定理が既にある。CELE側でこれらを重複証明しない。
- **前提の境界**：DYN14は双曲線形模型の安定・不安定方向を証明する章であり、一般の非線形安定多様体定理や横断ホモクリニック定理の完全証明まで所有するとみなさない。CELE6着手時には、直接必要なDYN/ODEのcanonical resultを再確認し、不足する定理の証明先を確保する。後続章の未確認結果をCELE1の暗黙前提にしない。
- **系列開始**：`textbook/dream-theater-series/CELE.yaml` にCELE1〜CELE8を `planned` として登録する。CELE1の章本文・knowledge metadata・公開索引を追加済み。CELE1はMECH6/MECH7、AMECH5/AMECH6、INT1〜INT3の既出結果を確認して執筆する。
- **INTとの接続**：可積分系の完了PLANは[INT1〜INT8](../plan_done/DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md)。力学系の一般論は[DYN](../plan_done/DREAM_THEATER_DYNAMICAL_SYSTEMS_COURSE_PLAN.md)を再利用する。天体力学の非可積分性・具体的な三体モデルは本計画を正本とする。


## 10. CELE6 の外部定理と次の一般証明担当（2026-10-13）

CELE6では、強制振り子のホモクリニック分離曲線・Melnikov積分・単純零点・分離量から横断性への局所計算・ローブ面積を本文内で証明し、一般論への橋を明示した。

DYN13は**区間上の片側シフトへの共役**、DYN14は**線形双曲模型**を証明する章であり、次の一般結果を証明済みだと誤認しない。

- 非線形局所安定多様体定理とその滑らかなパラメータ依存性（graph transformなどの理論を要する）。
- Smale–Birkhoffの横断ホモクリニック点から平面双曲horseshoeを作る定理（lambda-lemmaと長方形の双方向縮小を要する）。

CELE6の教材ではこれら二結果を**外部定理・意図的黒箱**と明示し、ステートメントの仮定を検査した上でのみ適用する。黒箱定理の一般証明をDYN13・DYN14・CELE6自身が所持するとはしない。将来DYN系で独立した証明正本を増補する場合は、当該定理とstable anchorを確立してからCELE6の外部入力をその参照に置き換える。CELE7ではこの一般証明を既に本文で閉じたものとして扱わない。
