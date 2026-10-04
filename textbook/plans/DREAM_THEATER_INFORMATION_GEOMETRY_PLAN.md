# DREAM THEATER 情報幾何計画

作成日: 2026-10-05  
状態: planned  
移行元: \`DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md\` 旧 U5

## 0. 目的

本計画は、情報幾何を「Fisher 情報量の応用」や「自然勾配のための道具」に限定せず、**確率分布族を多様体として扱い、Fisher 計量・双対接続・divergence・指数型分布族の幾何を体系化する数学分野**として整備するための設計台帳である。

中心となる問いは

> **確率分布の族に、統計的意味を保った座標不変な幾何をどう入れるか。その幾何は推定・指数型分布族・KL divergence とどう結びつくか。**

である。

自然勾配、変分推論、機械学習、統計物理などの応用は扱うが、章構成の主軸は Riemann 計量・affine connection・dual flatness などの数学的構造に置く。

公開上は「応用系」ではなく、微分幾何と統計を接続する **幾何系の発展科目**を第一候補とする。

---

## 1. canonical owner と責務分担

| 領域 | canonical owner |
|---|---|
| score・Fisher 情報量・Cramér--Rao・MLE | 統計教材 / 推定論 |
| 指数型分布族の統計学的基礎 | 統計教材 |
| entropy・KL divergence の基礎 | 情報理論・統計側の既存正本 |
| 多様体・接空間・微分形式 | GEO 系列 |
| 一般 Riemann 計量・Levi-Civita 接続 | GEO 系列 |
| convex function・Legendre 変換 | 凸解析 / 最適化系列 |
| statistical manifold・Fisher--Rao 計量・$\alpha$-connection・dual connection・dual flatness | **本計画** |
| canonical divergence・information projection・e/m-geodesic | **本計画** |
| natural gradient の情報幾何学的定式化 | **本計画** |

一般微分幾何を再実装せず、統計モデルに固有の幾何構造と定理を本計画で正本化する。

---

## 2. prerequisite 方針

主要候補:

- 多変量微分
- 線形代数・正定値行列
- 確率密度・期待値
- 尤度・score
- Fisher 情報量
- MLE・Cramér--Rao
- 指数型分布族
- KL divergence
- 凸関数・Legendre 変換
- GEO の多様体・接空間・Riemann 計量の必要部分

GEO 全系列を機械的前提にはしない。IG1 では Bernoulli・categorical・正規分布族などの低次元例から接ベクトルと計量を導入し、一般微分幾何の既存正本へ接続する。

---

## 3. 数学的な中心構造

パラメトリック統計モデルを

$$
\mathcal S
=
\{p(x;\theta):\theta\in\Theta\}
$$

とする。

score を

$$
\partial_i\ell_\theta(x)
=
\frac{\partial}{\partial\theta^i}\log p(x;\theta)
$$

とし、Fisher 計量を

$$
g_{ij}(\theta)
=
E_\theta[
\partial_i\ell_\theta(X)
\partial_j\ell_\theta(X)
]
$$

で定める。

本系列では、この行列を単なる「推定精度の行列」ではなく、

- tangent vector の内積
- reparameterization に対する tensor
- divergence の 2 次項
- dual connection の基礎
- exponential / mixture family の幾何

として読み直す。

---

## 4. コース構成

仮 ID は IG1--IG8 とする。

### IG1 statistical manifold と Fisher--Rao 計量

中心内容:

- statistical model と parameter space
- regular model
- tangent vector を score で表す見方
- Fisher information matrix
- positive definiteness / degeneracy
- reparameterization
- Fisher metric
- Bernoulli family
- categorical simplex
- 1 次元正規分布族
- 位置・尺度族の例

座標変換 $\eta=\eta(\theta)$ の Jacobian を用いて

$$
g^{(\eta)}
=
J^\mathsf T g^{(\theta)}J
$$

が現れることを追い、Fisher 情報行列が Riemann 計量として変換する理由を示す。

### IG2 divergence の局所幾何

中心内容:

- KL divergence
- divergence は距離ではないこと
- diagonal 上での 1 次微分の消失
- 2 次微分から metric が現れること
- KL divergence の局所 2 次近似
- Fisher metric との一致
- f-divergence の入口
- data processing / monotonicity の幾何への入口

「KL を Taylor 展開すると Fisher」と一行で済ませず、どの変数をどの点のまわりで展開し、正規化条件がどの項を消すかを示す。

### IG3 指数型分布族・混合族・凸ポテンシャル

中心内容:

- exponential family

$$
p(x;\theta)
=
\exp\{
\theta\cdot F(x)-\psi(\theta)+k(x)
\}
$$

- natural parameter
- log-partition function
- expectation parameter
- $\nabla\psi(\theta)=\eta$
- Hessian と Fisher metric
- convexity
- Legendre duality
- mixture family
- e-coordinate / m-coordinate

指数型分布族の統計学的性質の再証明ではなく、$\psi$ と Legendre 双対から幾何構造がどう生じるかを主役にする。

### IG4 affine connection と双対接続

中心内容:

- affine connection
- covariant derivative の意味
- torsion
- metric compatibility との違い
- dual connections
- Amari の $\alpha$-connections
- $\alpha=0$ と Levi-Civita connection
- $\alpha=\pm1$ の exponential / mixture connection
- Christoffel symbols の statistical expression
- cubic tensor / Amari--Chentsov tensor

一般接続論は GEO の正本を参照し、本章では統計モデル上での構成と duality を扱う。

### IG5 双対平坦性・測地線・Pythagorean theorem

中心内容:

- flat affine connection
- dually flat manifold
- primal / dual affine coordinates
- convex potential
- e-geodesic
- m-geodesic
- canonical divergence
- generalized Pythagorean theorem
- orthogonality
- e-projection / m-projection

有限カテゴリカル分布と指数型分布族を代表例にし、抽象定義から projection theorem まで紙上で追える構成にする。

### IG6 情報射影・推定との接続

中心内容:

- maximum entropy
- KL projection
- moment constraints
- exponential family への射影
- MLE と information projection
- Bregman divergence
- iterative projection の入口
- sufficient statistic との関係

統計推定の結果を単に引用するのではなく、どの affine submanifold への射影として解釈できるかを明示する。

### IG7 自然勾配・最適化

中心内容:

- Euclid gradient の座標依存性
- Riemannian gradient
- natural gradient

$$
\widetilde\nabla L(\theta)
=
G(\theta)^{-1}\nabla L(\theta)
$$

- steepest descent の計量依存性
- KL trust region からの導出
- reparameterization invariance
- mirror descent / Bregman geometry との接続
- stochastic natural gradient の入口

機械学習応用は扱うが、natural gradient の数値テクニック集にはしない。

### IG8 高度な構造と特徴付け

中心内容:

- monotone metric の考え方
- Markov morphism
- Fisher metric の特徴付け
- Čencov theorem の主張と意味
- $\alpha$-divergence
- curvature
- curved exponential family
- statistical curvature
- semiparametric / infinite-dimensional information geometry への出口

Čencov theorem の完全証明は必要前提が大きい。実装時に証明を閉じる範囲を監査し、完全証明を載せない場合は intentional black box として追加前提・射程を明示する。

---

## 5. 代表例

数学の確認に使う標準例を固定する。

### Bernoulli family

$$
p(x;\theta)
=
\theta^x(1-\theta)^{1-x},
\qquad 0<\theta<1.
$$

Fisher 計量

$$
g(\theta)
=
\frac{1}{\theta(1-\theta)}
$$

を直接計算し、座標変換による表示変化と幾何量の不変性を確認する。

### categorical simplex

確率単体上で Fisher metric、mixture coordinate、exponential coordinate を比較する。

### normal family

$$
N(\mu,\sigma^2)
$$

の 2 パラメータ族で Fisher metric を計算し、曲率を持つ具体的 statistical manifold として読む。

### exponential family

log-partition function の Hessian が Fisher metric になることを一般に導く。

---

## 6. 応用例の位置づけ

応用は理論を使用する代表例として置く。

候補:

- MLE と information projection
- maximum entropy
- iterative proportional fitting
- logistic regression
- variational inference
- natural gradient
- neural network optimization の概念的入口
- statistical physics の Gibbs family
- quantum information geometry への出口

応用側で独自理論が大きくなる場合は、情報幾何の章を膨張させず別系列へ送る。

---

## 7. 証明・教育方針

- Fisher information matrix を最初から「計量」と宣言せず、score の内積から導入する。
- reparameterization では Jacobian を明示し、tensor transformation を計算する。
- KL divergence の局所展開では 0 次・1 次・2 次の各項を確認する。
- exponential family では $\nabla\psi$ と Hessian の導出を期待値計算から追う。
- dual connection は定義式の記号だけで終わらせず、metric derivative を二つの接続へ分配する意味を説明する。
- $\alpha$-connection の添字計算は、少なくとも一つの具体モデルで Christoffel symbol を実際に計算する。
- dual flatness は「指数型分布族だから平坦」と飛ばず、affine coordinates と potential の存在を確認する。
- Pythagorean theorem では divergence の分解式まで導く。
- natural gradient は公式暗記ではなく、局所 KL 制約付き最急降下から導出する。
- general differential geometry の証明を重複させないが、既存定理を使うときは statistical manifold が仮定を満たすことを局所確認する。

---

## 8. 演習設計

各章は理由付き例外がなければ最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

とし、全問に詳細解答を付ける。主要 learning objective に不足する場合は最低数で止めない。

代表題材:

- Bernoulli / Poisson / normal family の Fisher metric を計算する。
- 座標変換後の Fisher metric を tensor law で確認する。
- KL divergence の 2 次展開から Fisher metric を得る。
- exponential family の log-partition function の Hessian を計算する。
- natural / expectation parameter の Legendre 双対を確認する。
- dual connection の定義から Christoffel symbol を求める。
- e-geodesic / m-geodesic を具体分布族で書く。
- Pythagorean identity を有限次元例で確認する。
- information projection と MLE の対応を導く。
- KL trust region から natural gradient を導く。

---

## 9. 実装順

~~~text
IG1 statistical manifold / Fisher metric
  ↓
IG2 divergence and local geometry
  ↓
IG3 exponential family / convex potential / Legendre duality
  ↓
IG4 affine connections / dual connections / alpha-connections
  ↓
IG5 dual flatness / geodesics / Pythagorean theorem
  ↓
IG6 information projection / estimation
  ↓
IG7 natural gradient / optimization
  ↓
IG8 characterizations / curvature / advanced topics
~~~

IG1--IG5 を数学的中核とし、IG6--IG7 は応用との接続、IG8 は発展理論とする。

---

## 10. 本計画に含めないもの

- 一般微分幾何の再講義
- Riemannian geometry 全般の再実装
- 情報理論全般
- 機械学習最適化の百科事典化
- neural network の実装論
- quantum information geometry の完全体系
- infinite-dimensional statistical manifold の完全一般論

中心問いが独立する場合は別 PLAN へ分離する。

---

## 11. 完成条件

- statistical model を manifold とみなす際の regularity と tangent の意味を説明できる。
- Fisher information matrix が座標変換に対して Riemann 計量として変換することを導出できる。
- KL divergence の局所 2 次項から Fisher metric が現れることを追える。
- exponential family で log-partition function と Fisher metric の関係を導出できる。
- natural parameter と expectation parameter の Legendre 双対を説明できる。
- dual connection と $\alpha$-connection の定義・意味を説明できる。
- dually flat manifold 上の e/m-geodesic と Pythagorean theorem を使える。
- MLE / maximum entropy を information projection として読める。
- natural gradient を Riemannian steepest descent と KL 制約の両面から導出できる。
- 応用例に対して「どの情報幾何学的構造を使っているか」を数学的に説明できる。
