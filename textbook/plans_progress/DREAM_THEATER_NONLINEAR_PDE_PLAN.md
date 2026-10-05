# DREAM THEATER 非線形偏微分方程式計画

作成日: 2026-10-04  
状態: in_progress

## 0. 目的

本計画は、偏微分方程式 II（GPDE1--GPDE10）の後で必要になる一般非線形 PDE を、Navier--Stokes や幾何解析などの個別専門系列から分離して整備する設計台帳である。

中心となる問いは三つある。

1. 弱解が複数あるとき、どの追加条件で物理的・数学的に適切な解を選ぶか。
2. 線形 Lax--Milgram を越えた非線形方程式で、存在・一意性・極限通過をどう行うか。
3. 解が存在した後、尺度変換・自己相似・減衰・blow-up・長時間漸近をどう読むか。

本計画は「非線形 PDE の百科事典」ではなく、これらの共通機構を代表方程式から学ぶ。

---

## 1. canonical owner と責務分担

| 領域 | canonical owner |
|---|---|
| distribution / Sobolev / weak formulation / energy method | GPDE1--GPDE10 |
| scalar conservation law・entropy solution | 本計画 |
| monotone operator・$p$-Laplacian | 本計画 |
| nonlinear diffusion・porous medium | 本計画 |
| semilinear heat・blow-up | 本計画 |
| scaling・self-similarity・long-time asymptotics の一般機構 | 本計画 |
| HJB・粘性解・HJI | DREAM_THEATER_OPTIMAL_CONTROL_DIFFERENTIAL_GAMES_PLAN.md |
| Navier--Stokes 固有理論 | DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md |
| Riesz transform / Calderón--Zygmund | DREAM_THEATER_REAL_ANALYSIS_STRENGTHENING_PLAN.md |
| $C_0$ 半群・抽象 Cauchy 問題 | DREAM_THEATER_FUNCTIONAL_ANALYSIS_OPERATOR_ALGEBRA_PLAN.md |

同じ方程式を複数系列で例に使うことは許すが、同じ定理・存在論・選択原理を二重に正本化しない。

---

## 2. prerequisite 方針

章ごとに必要な直接依存だけを置く。

主要候補:

- PDE1: Burgers 方程式と古典解の破綻
- PDE3 / PDE8: 熱方程式・Duhamel
- GPDE3--GPDE5: Sobolev 空間・埋め込み・コンパクト性
- GPDE6--GPDE10: 弱形式・エネルギー法・時間発展弱解
- convex analysis / lower semicontinuity の既存 canonical result
- 必要な節だけ関数解析の弱収束・半群論
- 必要な節だけ HA 系列の調和解析

全章へ「関数解析 II」「調和解析全部」を一括 prerequisite にしない。

---

## 3. コース構成

仮 ID は NPDE1--NPDE7 とする。

### NPDE1 保存則・衝撃波・Rankine--Hugoniot 条件

入口は Burgers 方程式

$$
u_t+f(u)_x=0
$$

とする。

扱う内容:

- scalar conservation law
- characteristic crossing
- shock / rarefaction
- distributional weak solution
- Rankine--Hugoniot condition
- Riemann problem
- weak solution の非一意性

「弱くすれば存在する」で終わらず、なぜ解をさらに選ぶ必要があるかまで示す。

### NPDE2 entropy solution・選択原理・$L^1$ contraction

扱う内容:

- entropy / entropy flux pair
- Lax / Oleinik 型条件の位置付け
- Kruzhkov entropy inequality
- entropy solution
- $L^1$ contraction
- uniqueness
- vanishing viscosity との接続

entropy condition は「より弱い解概念」ではなく、distributional weak solution の中から適切な解を選ぶ追加条件として説明する。

### NPDE3 非線形変分法・単調作用素・$p$-Laplacian

扱う内容:

- convex energy functional
- direct method of calculus of variations
- weak lower semicontinuity
- coercivity
- monotone operator
- Browder--Minty 型定理
- $p$-Laplacian
- nonlinear elliptic weak solution
- nonlinear term への極限通過

Lax--Milgram のどの線形性を失い、代わりに単調性・凸性が何を保証するかを対比する。

### NPDE4 尺度変換・熱核平滑化・自己相似

扱う内容:

- parabolic scaling
- 方程式・ノルム・保存量の scaling
- subcritical / critical / supercritical
- heat kernel の $L^p$--$L^q$ smoothing
- Gagliardo--Nirenberg / Nash 型不等式
- energy estimate と decay
- similarity variables
- logarithmic time
- rescaled dynamics
- self-similar profile

指数を暗記させず、方程式を不変にする変換を毎回導出する。

### NPDE5 多孔質媒質方程式・有限伝播速度

代表モデル

$$
u_t=\Delta(u^m),
\qquad m>1
$$

を用いる。

扱う内容:

- nonlinear diffusion
- mass conservation
- scaling から similarity exponent を決める
- Barenblatt 型 profile
- profile equation
- finite speed of propagation
- compact support の発展
- 線形熱方程式の infinite speed との比較
- rescaling と long-time behavior

Barenblatt profile は完成式を置くだけでなく、質量保存と scaling から指数を導く。

### NPDE6 半線形熱方程式・臨界性・有限時間 blow-up

代表モデル

$$
u_t=\Delta u+u^p
$$

を用いる。

扱う内容:

- mild formulation
- local existence への入口
- maximum / comparison principle
- global existence と finite-time blow-up
- scaling critical exponent
- Fujita exponent の意味
- backward self-similar blow-up
- blow-up quantity の特定

Fujita 型結果は仮定・次元・指数範囲・解概念を固定して述べる。

### NPDE7 長時間漸近・普遍 profile・rescaled convergence

扱う内容:

- heat equation の leading asymptotic profile
- conserved mass
- decay rate
- moment correction
- rescaled convergence
- nonlinear diffusion の asymptotic profile
- attractor / asymptotic profile という見方
- self-similar solution を rescaled dynamics の定常解として読む

「存在したから終わり」ではなく、どの正規化で何へ近づくかを明示する。

---

## 4. advanced branch: rough data と一般化解

以下は主線の完成後に必要性を再判定する。

- $L^1$ data
- renormalized solution
- truncation method
- measure data
- Young measure
- measure-valued solution

仮 ID を先に固定せず、後続系列から実需要が生じた場合だけ独立章にする。

---

## 5. 半群論との境界

mild solution、generator、Hille--Yosida、abstract Cauchy problem の理論正本は DREAM_THEATER_FUNCTIONAL_ANALYSIS_OPERATOR_ALGEBRA_PLAN.md の関数解析発展枝に置く。

NPDE 側では、

- heat semigroup の kernel estimate
- smoothing / decay
- nonlinear Duhamel formula の利用

を主役にし、抽象半群論を再証明しない。

---

## 6. Navier--Stokes との境界

Navier--Stokes 固有の

- 発散零空間
- Leray 射影
- Stokes 作用素
- Leray--Hopf 弱解
- 2D / 3D の差
- 渦伸長
- Prodi--Serrin
- NS 固有の臨界空間

は DREAM_THEATER_NAVIER_STOKES_MILLENNIUM_PLAN.md を正本とする。

本計画の scaling / interpolation / asymptotics は共有可能な一般機構を扱うが、NS 系列の証明を本計画完了まで待たせない。

---

## 7. 調和解析との境界

次は DREAM_THEATER_REAL_ANALYSIS_STRENGTHENING_PLAN.md の HA 系列を正本とする。

- Hardy--Littlewood maximal operator
- Riesz potential
- Hardy--Littlewood--Sobolev inequality
- Riesz transform
- Calderón--Zygmund estimate
- Littlewood--Paley / Besov 以降の発展候補

NPDE のためだけにこれらを局所再実装しない。

---

## 8. 証明・教育方針

- entropy solution では「何を選別する条件か」を明示する。
- compactness を使う場合、どの空間で何が収束するかを書く。
- nonlinear term の極限通過では、弱収束だけで十分かを毎回確認する。
- scaling では未知関数・時間・空間・ノルムの変換を別々に計算する。
- self-similar ansatz の指数を「既知」として置かない。
- long-time asymptotics では収束する空間・正規化・profile を明示する。
- blow-up では何の量が有限時間で発散するかを明示する。
- 線形熱方程式、多孔質媒質方程式、半線形熱方程式を対比する。

---

## 9. 演習設計

理由付き例外がなければ各章で最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。

演習では少なくとも

- Rankine--Hugoniot の計算
- entropy inequality の判定
- 単調性・coercivity の確認
- $p$-Laplacian の弱形式
- scaling exponent の導出
- heat kernel smoothing の指数計算
- Barenblatt exponent の導出
- blow-up comparison
- rescaled variables の導出

を実際に手計算させる。

---

## 10. 実装順

~~~text
NPDE1 保存則・shock
  ↓
NPDE2 entropy solution

NPDE3 monotone operator / p-Laplacian

NPDE4 scaling / smoothing / self-similarity
  ├──→ NPDE5 porous medium
  ├──→ NPDE6 semilinear heat / blow-up
  └──→ NPDE7 long-time asymptotics
~~~

NPDE1--NPDE3 と NPDE4--NPDE7 は一列に強制せず、直接 prerequisite が閉じた側から実装してよい。

---

## 11. Navier--Stokes への戻り接続

NPDE の一般理論が整った後は、完了済み NS 系列へ一般論を後付け prerequisite として強制せず、別計画 `DREAM_THEATER_NAVIER_STOKES_NPDE_CONNECTION_AUDIT_PLAN.md` に従って接続監査を行う。

節目は次とする。

- NPDE2 完成後: NS3 の弱解と entropy selection の違いを監査する。
- NPDE4 完成後: NS6 / NS7 / NS8A の scaling・criticality・self-similarity を監査する。
- NPDE6 完成後: NS5 / NS7 / NS8A の finite-time blow-up・continuation criterion を監査する。
- NPDE7 完成後: NS4 / NS8A の rescaling・長時間挙動との接続を監査する。

NS 側の主要証明は NPDE に依存させず、NPDE 既読者向けの一般理論への参照と、NS 固有機構の境界を磨くことを目的とする。

---

## 12. 完成条件

- weak solution の非一意性から entropy selection が必要になる流れを説明できる。
- 単調作用素法が Lax--Milgram のどの部分を一般化するか説明できる。
- 代表的な nonlinear diffusion / reaction-diffusion の scaling を自力で導ける。
- self-similar profile の指数を保存量と scaling から再構成できる。
- blow-up と long-time decay の問いを、存在・一意性の問いと区別できる。
- 他系列の HJB / Navier--Stokes / geometric analysis を重複実装せず接続できる。


---

## 13. 2026-10-05 進捗

実装完了:

- NPDE1「保存則・衝撃波・Rankine--Hugoniot 条件」を実装
- 一次元スカラー保存則を区間の保存量と境界流束から導出
- 滑らかな解の特性速度 $f'(u)$ と古典解破綻の接続を整理
- テスト関数による分布的弱解と局所 $L^1$ 初期値トレースを定義
- 移動界面の Leibniz 則と部分積分から Rankine--Hugoniot 条件を完全証明
- 定数状態を結ぶ衝撃波速度を流束の割線勾配として導出
- Riemann 問題と狭義凸流束の中心希薄波を構成し、弱解性と初期値収束を証明
- Burgers の $0\to1$ 初期値で expansion shock と rarefaction が共存する弱解非一意性を証明
- Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NPDE1 へ接続
- NPDE2「entropy solution・選択原理・L1 contraction」を実装
- entropy / entropy flux pair と粘性散逸から entropy inequality を導出
- shock entropy jump condition と Lax / Oleinik 型の圧縮選択を整理
- Kruzhkov entropy pair と entropy solution を定義し、凸 Riemann 問題の shock / rarefaction 選択を証明
- doubling of variables から Kato 型不等式を導出
- Kato 型不等式から局所 $L^1$ 評価・$L^1$ 収縮性・一意性を証明
- vanishing viscosity の強い局所 $L^1$ 極限が entropy inequality を満たすことを証明
- Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NPDE2 へ接続
- NPDE3「非線形変分法・単調作用素・p-Laplacian」を実装
- $W_0^{1,p}$ の $p$-Poincaré 不等式と反射性を既存 Sobolev・$L^p$ 双対・FA4 から導出
- 弱下半連続性・強圧性と反射的 Banach 空間上の直接法を完全証明
- $p$-energy の弱下半連続性・強圧性・狭義凸性と Gâteaux 微分を導出し、Euler--Lagrange 方程式へ接続
- 単調作用素・半連続性・作用素の強圧性を定義し、有限次元 Brouwer 補題から Browder--Minty 型全射定理を完全証明
- $p$-Laplacian 作用素の単調性・半連続性・強圧性を確認し、零 Dirichlet 問題の存在一意性を証明
- Minty の非線形極限同定を証明し、弱収束だけでは非線形項を同定できない点を整理
- Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NPDE3 へ接続
- NPDE4「尺度変換・熱核平滑化・自己相似」を実装
- 放物型 scaling を時間微分・Laplacian へ代入して $tmapstolambda^2t$ を導出し、振幅指数とノルム指数を分離
- $L^p$ scaling から劣臨界・臨界・超臨界を定義し、小スケール集中をノルムがどう見るかを整理
- $d$ 次元熱核の $L^r$ ノルムを自己相似 scaling から導出
- Young の畳み込み不等式を完全証明し、熱核の $L^p$--$L^q$ smoothing と一階微分 smoothing を導出
- GPDE5 の Sobolev 不等式と補間から Nash 型不等式を導き、energy identity と合わせて $L^1$--$L^2$ decay $t^{-d/4}$ を再現
- 質量保存から自己相似指数 $d/2$ を導き、$	au=log t$、$y=x/sqrt t$ の similarity variables から rescaled heat equation を導出
- Gaussian heat kernel profile が rescaled dynamics の定常解であることを直接検証
- Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NPDE4 へ接続

次作業:

- NPDE5「多孔質媒質方程式・有限伝播速度」
