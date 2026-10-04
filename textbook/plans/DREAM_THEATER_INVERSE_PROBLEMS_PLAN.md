# DREAM THEATER 逆問題計画

作成日: 2026-10-05  
状態: planned  
移行元: \`DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md\` 旧 U1

## 0. 目的

本計画は、逆問題を「CT などの応用例の寄せ集め」ではなく、**観測作用素から未知対象を復元するときの一意性・安定性・正則化を研究する解析学の一分野**として整備するための設計台帳である。

中心となる問いは

> **forward map が分かっているとき、観測から未知量をどこまで一意に、安定に、再構成できるのか。安定性が壊れる場合、どの追加仮定と正則化で意味のある近似解を回復できるのか。**

である。

CT、deconvolution、PDE の係数同定、地震探査などの応用は扱うが、章構成の主軸は応用分野ではなく数学的構造に置く。

公開上は「応用系」ではなく、関数解析・Fourier 解析・PDE から伸びる **解析系の発展科目**を第一候補とする。

---

## 1. canonical owner と責務分担

| 領域 | canonical owner |
|---|---|
| SVD・擬似逆行列・最小二乗 | 線形代数系列 |
| Hilbert / Banach 空間・随伴・コンパクト作用素 | 関数解析 I / II |
| Fourier 変換・畳み込み | Fourier 解析系列 |
| Sobolev 空間・弱解・楕円型 / 放物型 PDE | PDE / GPDE 系列 |
| 凸最適化・近接法 | 最適化系列 |
| Bayes 推論・Gaussian 分布 | 統計・確率系列 |
| well-posedness / ill-posedness・特異系・正則化理論・逆問題の安定性・非線形逆問題 | **本計画** |
| Radon 変換を用いた tomography の逆問題論 | **本計画** |
| PDE 制約逆問題における parameter-to-observation map・adjoint 法 | **本計画** |
| 一般 nonlinear PDE の理論 | \`DREAM_THEATER_NONLINEAR_PDE_PLAN.md\` |

既存正本の定義・定理を複製せず、逆問題で必要な適用条件と新しい結果だけを本計画で正本化する。

---

## 2. prerequisite 方針

章ごとに直接使う結果を固定する。

主要候補:

- 線形代数: SVD、直交射影、最小二乗
- 実解析: ノルム、収束、積分
- 関数解析 I: Hilbert 空間、有界作用素、随伴
- 関数解析 II: コンパクト作用素、スペクトル
- Fourier 解析: Fourier 変換、Plancherel
- 最適化: 凸関数、下半連続性、最小化
- Bayes 逆問題では確率・Bayes 推論
- PDE 逆問題では対応する PDE / Sobolev 章

有限次元の数値線形代数から開始できる入口を残す一方、INV2 以降では無限次元作用素としての逆問題を主役にする。

---

## 3. 数学的な中心構造

基本形を

$$
F(x)=y
$$

とする。線形の場合は

$$
Ax=y
$$

である。

観測には誤差があり、実際には

$$
\|y^\delta-y\|\le \delta
$$

を満たす $y^\delta$ しか得られない。

本系列では、少なくとも次を区別する。

1. **存在**: 与えられた $y$ に対し解 $x$ が存在するか。
2. **一意性**: 解が一つに決まるか。
3. **安定性**: $y$ の小さな変化が $x$ の小さな変化に対応するか。
4. **識別可能性**: モデルの範囲で異なる未知量を観測が区別できるか。
5. **正則化**: 不安定な逆写像を、ノイズに対して安定な近似写像族で置き換えられるか。

「逆行列が存在する」と「観測誤差の下で復元できる」を同一視しないことを、系列全体の基本姿勢とする。

---

## 4. コース構成

仮 ID は INV1--INV8 とする。

### INV1 Hadamard の well-posedness と有限次元逆問題

中心内容:

- forward problem / inverse problem
- Hadamard の well-posedness
- existence / uniqueness / stability
- 最小二乗と擬似逆行列
- SVD による解表示
- condition number
- 小さい特異値による誤差増幅
- rank deficiency と non-uniqueness
- identifiability と numerical instability の区別

有限次元では全単射な線形写像の逆写像は連続になる一方、次元が増える離散化系列では condition が悪化しうることを、無限次元理論への橋として扱う。

### INV2 コンパクト作用素・特異系・Picard 条件

中心内容:

- Hilbert 空間間のコンパクト作用素
- 無限次元で compact injective operator の逆が一般に非有界になる機構
- compact self-adjoint operator のスペクトル理論の再利用
- singular system
- formal inverse
- Picard condition
- range が閉でないことと不安定性
- smoothing operator と information loss

後続の正則化理論に必要な「なぜ逆問題は本質的に不安定になりうるか」をここで数学的に閉じる。

### INV3 線形正則化理論

中心内容:

- regularization family $R_\alpha$
- consistency / convergence
- spectral filtering
- truncated SVD
- Tikhonov 正則化

$$
x_\alpha^\delta
=
\arg\min_x
\left\{
\|Ax-y^\delta\|^2+\alpha\|x\|^2
\right\}
$$

- normal equation
- filter factors
- noise error と approximation error
- source condition
- convergence rate の入口
- a priori / a posteriori parameter choice
- discrepancy principle

単に「罰則項を足す」と説明せず、$\delta\to0$ と $\alpha=\alpha(\delta)\to0$ の関係の下で正則化解が真の解へ近づく条件を扱う。

### INV4 変分正則化・非滑らか正則化

中心内容:

- 一般形

$$
x_\alpha^\delta
\in
\arg\min_x
\left\{
\mathcal D(Fx,y^\delta)+\alpha\mathcal R(x)
\right\}
$$

- coercivity
- 下半連続性
- minimizer の存在
- data perturbation に対する安定性
- convex regularizer
- $\ell^1$ penalty
- total variation
- subgradient
- Bregman distance
- sparsity と edge preservation の数学的意味

compressed sensing の完全理論へは広げず、必要なら独立 PLAN とする。

### INV5 非線形逆問題

中心内容:

- nonlinear forward map $F:X\to Y$
- Fréchet derivative
- local identifiability
- linearization
- conditional stability
- Newton method の不安定性
- Landweber iteration
- iteratively regularized Gauss--Newton method の入口
- tangential cone condition など局所収束条件
- regularization と iteration stopping の関係

「線形化して同様」で済ませず、線形理論から何が失われるかを明示する。

### INV6 積分変換としての tomography

中心内容:

- Radon 変換
- sinogram
- Fourier slice theorem
- injectivity
- inversion formula の構造
- back projection
- filtered back projection
- limited-angle problem
- incomplete data
- artifact と欠測方向の関係

X 線 CT は主役ではなく、積分変換の逆問題を手で追う代表例とする。

Fourier slice theorem は、線積分の 1 次元 Fourier 変換から 2 次元 Fourier 変換の断面が現れるまでの変数変換を省略しない。

### INV7 Bayes 逆問題

中心内容:

- prior / likelihood / posterior
- 線形 Gaussian inverse problem
- posterior mean / covariance
- MAP と Tikhonov 正則化の対応
- uncertainty quantification
- posterior contraction への入口
- prior dependence
- infinite-dimensional formulation で起きる注意点

有限次元では平方完成により posterior を導出する。無限次元 Gaussian measure の本格理論が必要になった場合は、測度論・関数解析側の正本を参照し、必要なら発展章を追加する。

### INV8 PDE 制約逆問題・随伴法

中心内容:

- parameter-to-state map
- parameter-to-observation map
- source inverse problem
- coefficient inverse problem
- PDE-constrained optimization
- Fréchet derivative
- Lagrangian
- adjoint equation
- gradient formula
- uniqueness / conditional stability の入口
- inverse scattering / Full Waveform Inversion への出口

adjoint-state method は

1. 状態方程式
2. 目的関数
3. Lagrangian
4. 状態変分
5. adjoint equation
6. parameter gradient

の順で導出する。

---

## 5. 応用例の位置づけ

応用は各章の数学を使う具体例として置く。

代表例:

- deconvolution
- X 線 CT
- limited-angle tomography
- 画像の TV 正則化
- source reconstruction
- 熱伝導係数の同定
- 地震波速度推定
- Full Waveform Inversion
- Bayesian imaging

応用の背景説明は行うが、医学・地球物理・画像処理の個別実務を章構成の正本にはしない。

---

## 6. 証明・教育方針

- Hadamard の三条件を、単なる用語一覧にせず具体例ごとにどれが壊れるか確認する。
- compact operator の逆が非有界になる機構を、特異値が $0$ へ落ちることから追う。
- Tikhonov 正則化は normal equation だけでなく spectral filter としても導く。
- convergence theorem では $\delta$、$\alpha$、source condition の量化順序を曖昧にしない。
- existence of minimizer では coercivity / compactness / lower semicontinuity のどれを使うか明示する。
- 非線形逆問題では derivative の定義域・値域・局所性を明示する。
- 「逆問題は不良設定だから正則化する」という標語だけで済ませず、何が不連続で、正則化族が何を近似するかを式で示す。
- 数値例では離散化誤差と観測ノイズを区別する。

---

## 7. 演習設計

各章は理由付き例外がなければ最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。主要 learning objective に不足する場合は最低数で止めない。

代表題材:

- 小さい特異値がノイズを増幅することを直接計算する。
- compact diagonal operator の逆が非有界になることを示す。
- Picard 条件を具体的な数列空間で判定する。
- Tikhonov 解を normal equation と singular system の両方から求める。
- parameter choice と convergence の条件を確認する。
- TV 型汎関数の minimizer 存在に必要な仮定を整理する。
- 非線形 forward map を Fréchet 微分して線形化する。
- Fourier slice theorem の主要導出を再現する。
- Gaussian posterior を平方完成で求める。
- adjoint equation を Lagrangian から導出する。

---

## 8. 実装順

~~~text
INV1 well-posedness / finite-dimensional model
  ↓
INV2 compact operators / singular systems / Picard
  ↓
INV3 linear regularization theory
  ├──→ INV4 variational regularization
  ├──→ INV6 tomography
  └──→ INV7 Bayesian inverse problems
             ↓
INV5 nonlinear inverse problems
             ↓
INV8 PDE-constrained inverse problems / adjoint
~~~

INV6--INV8 は応用枝を含むが、各章の中心 learning objective は数学的概念・定理・導出に置く。

---

## 9. 本計画に含めないもの

- tomography 全般の百科事典化
- microlocal analysis の完全体系
- inverse scattering の完全理論
- Calderón problem の完全証明
- compressed sensing の高次元確率論を含む完全理論
- すべての coefficient inverse problem の uniqueness theorem
- 医療診断や地球物理実務そのもの
- 既存の Fourier / functional analysis / optimization の重複再実装

必要になった場合は、中心問いと前提が独立するものだけ別 PLAN へ分ける。

---

## 10. 完成条件

- Hadamard の well-posedness の三条件を具体的に判定できる。
- compact operator が smoothing と情報損失を生む理由を説明できる。
- singular system と Picard 条件から線形逆問題の可解性・不安定性を読める。
- Tikhonov / truncated SVD を regularization family として定式化し、収束条件を説明できる。
- 変分正則化で minimizer の存在・安定性に必要な仮定を追える。
- 非線形逆問題で線形化・正則化・停止条件が必要になる理由を説明できる。
- Radon 変換と Fourier slice theorem の数学的構造を追える。
- Bayes 逆問題と決定論的正則化の対応と相違を説明できる。
- adjoint-state method による gradient 導出を再現できる。
- 応用例に対して「どの forward operator を逆にし、どの数学的困難が起きているか」を抽象化して説明できる。
