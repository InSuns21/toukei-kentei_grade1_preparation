# DREAM THEATER 情報幾何計画

作成日: 2026-10-05  
改訂日: 2026-11-08（標準教科書・公開シラバスと照合、全14講に確定）  
状態: in_progress（IG1 完了、IG2--IG14 未着手）
移行元: \`DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md\` 旧 U5

## 0. 目的

本計画は、情報幾何を「Fisher 情報量の応用」や「自然勾配のための道具」に限定せず、**確率分布族を多様体として扱い、Fisher 計量・双対接続・divergence・指数型分布族の幾何を体系化する数学分野**として整備するための設計台帳である。

中心となる問いは

> **確率分布の族に、統計的意味を保った座標不変な幾何をどう入れるか。その幾何は推定・指数型分布族・KL divergence とどう結びつくか。**

である。

自然勾配、変分推論、機械学習、統計物理などの応用は扱うが、章構成の主軸は Riemann 計量・affine connection・dual flatness などの数学的構造に置く。

公開上は「応用系」ではなく、微分幾何と統計を接続する **幾何系の発展科目**を第一候補とする。

**確定講義数は全14講（IG1--IG14）**。1講は一つの中心問いを扱う独習用の章単位であり、90分授業・15週制への機械的な対応ではない。IG1--IG10 が数学的中核、IG11--IG12 が推定・最適化への接続、IG13--IG14 が曲率・不変性の発展理論となる。

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

## 4. 確定カリキュラム（全14講）

標準的な情報幾何の構成を「統計モデルと計量 → divergence の局所構造 → 指数型・混合型の凸構造 → 接続と双対性 → 双対平坦性と射影 → 応用 → 曲率と特徴付け」の順に再編する。各講は独立した主要な証明責務と検算例を持つ。後半の高度な一般論を初学者へ無条件に要求しない。

### 第I部：統計モデル・計量・divergence（IG1--IG3）

#### IG1 統計モデルと接空間

**中心問い**：確率分布の滑らかな族を、いつ多様体として扱えるか。

- 有限標本空間の正の確率単体から開始し、局所的に識別可能なパラメータ付けと接ベクトルを導入する。
- 正則な支配測度付きモデルの仮定（共通台、微分と積分の交換、有限な score 二乗積分）を定める。モデルの単射性・浸入性と単なる座標の重複を区別する。
- score による接ベクトル表現、$E_\theta[\partial_i\ell_\theta]=0$ を正規化条件の微分から導く。確率単体の接空間では成分和が0となる。
- **証明・演習の核**：Bernoulli とカテゴリカル分布で接ベクトルと score を直接計算し、正則性が破れる境界・退化パラメータ例を比較する。

#### IG2 Fisher--Rao 計量と座標不変性

**中心問い**：score の内積は、なぜ座標に依らない幾何を定めるか。

- Fisher 行列の非負定値性と正定値性を区別し、score の一次独立性（$L^2$ での非退化性）を明示する。
- パラメータ変換での score の連鎖律と $g'=J^{\mathsf T}gJ$ を導出し、可逆な Jacobian を仮定する。
- Fisher--Rao 長さと距離、統計モデルへの制限による計量を導入する。
- **証明・演習の核**：Bernoulli・カテゴリカル・$N(\mu,\sigma^2)$ の計量を出発点から計算する。正規分布の曲率の証明は IG13 へ送る。

#### IG3 Divergence と局所幾何

**中心問い**：非対称な分布の隔たりから、なぜ二次形式が生じるか。

- KL divergence の定義域・有限性・非対称性、対角線上での非負性と0、滑らかさの必要条件を確認する。
- $D_{\mathrm{KL}}(p_\theta\Vert p_{\theta+\delta})$ の0次・1次・2次項を正規化条件と微分積分交換から順に導き、$\frac12 g_{ij}\delta^i\delta^j+o(\|\delta\|^2)$ を得る。
- 一般 divergence の混合二階微分が計量を与える条件を整理する。$f$-divergence の二次近似は正規化 $f(1)=f'(1)=0$ と $f''(1)>0$ を明示し、一般論の入口とする。
- **証明・演習の核**：Bernoulli と正規位置族の KL 展開、台・境界の反例。三階微分から接続が現れる議論は IG7 で完結させる。

### 第II部：指数型・混合型の凸幾何（IG4--IG5）

#### IG4 指数型分布族と混合型分布族

**中心問い**：どの確率分布族に自然なアファイン座標があるか。

- 正則な指数型分布族の自然パラメータ、十分統計量、対数分配関数 $\psi$ の定義域と正則性を定める。
- $\partial_i\psi=E_\theta[F_i]$ と $\partial_i\partial_j\psi=\operatorname{Cov}_\theta(F_i,F_j)=g_{ij}$ を、微分積分交換を明記して導く。
- 有限確率単体の混合座標と混合型分布族を導入し、「混合型」と「指数型の曲がった部分族」を同一視しない。
- **証明・演習の核**：Bernoulli、Poisson、正規分布の指数型表示と $\psi$ の微分、カテゴリカル分布の混合座標。

#### IG5 Legendre 双対と Hessian 構造

**中心問い**：自然パラメータと期待値パラメータの二つの座標をどう結ぶか。

- $\eta=\nabla\psi(\theta)$、厳密凸性・正定値 Hessian による局所可逆性、正則性条件を確認する。
- 双対ポテンシャル $\varphi(\eta)=\theta\cdot\eta-\psi(\theta)$ と Legendre 双対、$g=\nabla^2\psi$、双対座標での逆計量を導く。
- Hessian 計量とアファイン座標の関係を準備し、接続の存在・平坦性そのものは IG6--IG8 で示す。
- **証明・演習の核**：Bernoulli の log-partition と負エントロピー、カテゴリカルの双対座標。非最小表示・境界で可逆性が失われる反例。

### 第III部：接続・双対平坦性・射影（IG6--IG10）

#### IG6 アファイン接続と統計的測地線

**中心問い**：計量だけでは区別できない「まっすぐさ」をどう記述するか。

- GEO の共変微分・接続係数・座標変換・曲率・捩率の既習定義へ接続し、統計モデルへの制限を確認する。
- 接続と測地線、平行移動、捩率零、Levi-Civita 接続の役割を区別する。座標係数の変換則を具体例で追う。
- **証明・演習の核**：1次元族での接続係数と測地線の座標変換。計量の Christoffel 記号と一般接続係数の取り違えを防ぐ。

#### IG7 双対接続・$\alpha$-接続と三次テンソル

**中心問い**：確率モデルに、互いに双対な二つの接続が現れる理由は何か。

- $Xg(Y,Z)=g(\nabla_XY,Z)+g(Y,\nabla_X^*Z)$ を出発点に dual connection を定義し、二重双対と Levi-Civita 接続との関係を示す。
- Amari--Chentsov 三次テンソル $T_{ijk}=E[\partial_i\ell\,\partial_j\ell\,\partial_k\ell]$ と $\alpha$-connection を導入し、$\nabla^{(\alpha)}$ と $\nabla^{(-\alpha)}$ が双対であること、$\alpha=0$ が Levi-Civita、$\alpha=+1$ が e、$\alpha=-1$ が m である符号規約を固定する。
- divergence の三階微分から接続が誘導されることを導く。一般の曲がった統計モデルでは e/m 接続が自動的に平坦とは限らない。
- **証明・演習の核**：Bernoulli と正規位置尺度族の接続係数を計算し、双対性・符号を直接照合する。

#### IG8 双対平坦性と e/m 測地線

**中心問い**：なぜ指数型分布族に二種類の直線があるか。

- 平坦かつ捩率零の接続、アファイン座標、dually flat manifold の定義と Hessian ポテンシャルによる構成を示す。
- 正則な全指数型分布族の e-平坦性と、その双対 m-平坦性を適切な開集合・可逆座標のもとで導く。有限単体の混合測地線と指数測地線の式を比較する。
- 埋め込まれた曲がった指数型部分モデルと、全指数型分布族・混合型部分モデルの違いを区別する。
- **証明・演習の核**：カテゴリカル単体の $p_t=(1-t)p_0+tp_1$ と正規化された幾何補間を実際に求める。

#### IG9 正準 divergence と Bregman 幾何

**中心問い**：双対座標とポテンシャルは、どんな隔たりを自然に定めるか。

- 双対平坦多様体上の canonical divergence と Bregman divergence を導き、非負性と（厳密凸性の下での）零点を証明する。
- 向きを固定して $D_\psi(\theta:\theta')=\psi(\theta)-\psi(\theta')-\nabla\psi(\theta')\cdot(\theta-\theta')=D_{\mathrm{KL}}(p_{\theta'}\Vert p_\theta)$ を正則な指数型分布族で導く。一般多様体で canonical divergence = KL と誤認しない。
- 双対ポテンシャルでの表現と三点恒等式を導き、IG10 の直交・射影へ接続する。
- **証明・演習の核**：Bernoulli の KL/Bregman の向き、二次ポテンシャルの Euclid 距離。

#### IG10 一般化 Pythagoras と情報射影

**中心問い**：KL の「直角」と最短の射影は、どの仮定の下で成り立つか。

- 双対測地線の直交条件と Bregman 三点恒等式から一般化 Pythagorean identity を証明する。
- e/m アファイン集合への射影の向き、存在・一意性に必要な凸性・閉性・内部性・正則性を適宜整理し、局所直交と大域最小化を混同しない。
- forward/reverse KL、e-projection/m-projection の用語・引数順を明示し、教科書間の命名差による誤読を防ぐ。
- **証明・演習の核**：有限カテゴリカル分布の線形制約への射影と Pythagorean identity を成分計算で検算する。

### 第IV部：統計・最適化への接続（IG11--IG12）

#### IG11 MLE・最大エントロピーと情報射影

**中心問い**：統計推定は何をどの集合へ射影しているか。

- 有限標本空間の経験分布と正則モデルについて、MLE を KL 最小化として厳密に導く（支持と境界・解の存在に注意）。
- 線形モーメント制約下での相対エントロピー最小化／最大エントロピーと指数型解、Lagrange 乗数・双対性・射影の対応を証明する。
- 十分統計量・モーメント一致・反復射影の入口を扱う。EM・IPF の一般収束証明は別テーマとし、等式だけから収束を主張しない。
- **証明・演習の核**：カテゴリカル制約下の最大エントロピーと指数型 MLE。

#### IG12 自然勾配・KL trust region・mirror descent

**中心問い**：分布の幾何を尊重した最急降下はどう得られるか。

- 接空間での Riemannian gradient と $\widetilde\nabla L=G^{-1}\nabla L$、変数変換不変性を導出する。退化計量の場合の適用不能性を明記する。
- 微小 KL 制約付き一次最適化から自然勾配方向を導く。mirror descent は Bregman/prox 更新の仮定と連続時間・局所近似の対応を区別する。
- **証明・演習の核**：Bernoulli/カテゴリカルの自然勾配、logit 変換、二次近似の有効範囲。巨大モデルの実装技法は対象外。

### 第V部：曲率・特徴付け（IG13--IG14）

#### IG13 曲率と曲がった統計モデル

**中心問い**：双対平坦性と Riemann 曲率は両立し得るか。

- Levi-Civita 曲率と $\alpha$-接続の曲率を区別し、「e/m 平坦」から Riemann 平坦を結論しない。
- $N(\mu,\sigma^2)$ の Fisher 計量から Gaussian 曲率 $K=-1/2$（採用した計量正規化で）を計算する。
- curved exponential family を全指数型分布族の部分モデルとして定義し、誘導計量・誘導接続と外在的な曲がりの関係を具体例から説明する。統計曲率は範囲・必要前提を明記して入口に留める。
- **証明・演習の核**：正規位置尺度族の曲率、全族と制限部分族での接続の比較。

#### IG14 情報単調性・Fisher 計量の特徴付け

**中心問い**：確率的な粗視化を許すと、計量はどこまで一意に定まるか。

- 有限確率単体上の Markov kernel・確率写像・情報単調性を定義し、データ処理不等式を有限和と Jensen 不等式から導く。
- Fisher 計量の確率写像下での縮小性、Čencov の特徴付け定理の正確な射程（正の有限単体族、Markov morphism 等に関する不変性、定数倍までの一意性）を示す。一般無限次元へ無条件に拡張しない。
- $\alpha$-divergence、$f$-divergence と不変性の関係を整理する。Čencov 定理の完全証明が所定の前提だけで閉じない場合は、証明済み有限モデルの範囲と追加前提を明示した intentional black box として扱う。
- **証明・演習の核**：有限状態の確率写像による KL の減少、Fisher 計量の縮小、非可逆な粗視化での等号・厳密不等号の例。

**この14講の外へ送る発展主題**：半パラメトリック・無限次元モデル、量子情報幾何、最適輸送、統計物理の体系、EM/IPF の一般収束理論、特異学習理論。接続のための短い outlook は IG14 または関連講の末尾に置いてよいが、本系列の完了条件に数えない。

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

## 9. 実装順と旧8講案からの移行

確定順序は次のとおり。章IDは **IG1--IG14** として予約する。IG1--IG8 の旧見出しは草案上の仮名であり、章本文・manifest・外部リンクが未作成であることを実装時に再照合する。実装着手時は新IDに対応する manifest を作成し、PLAN の進捗状態を規約どおり移す。

| 部 | 講義 | 前から受け取る数学 | 到達点 |
|---|---|---|---|
| I | IG1 → IG2 → IG3 | 統計基礎、GEO の接空間・計量 | 正則モデル、Fisher 計量、KL 二次近似 |
| II | IG4 → IG5 | IG2--IG3、凸解析 | $\psi$、$\eta$、Legendre 双対 |
| III | IG6 → IG7 → IG8 → IG9 → IG10 | GEO の接続、IG3--IG5 | 双対接続、双対平坦性、正準 divergence、射影定理 |
| IV | IG11 → IG12 | IG9--IG10、統計推定・最適化 | MLE/最大エントロピー、自然勾配 |
| V | IG13 → IG14 | IG2、IG6--IG8、IG3 | 曲率と Čencov 特徴付け |

旧8講案のうち、Fisher 計量（旧 IG1）は新 IG1--IG2、divergence（旧 IG2）は新 IG3・IG9・IG14、指数型族（旧 IG3）は新 IG4--IG5、接続（旧 IG4）は新 IG6--IG7、双対平坦性と Pythagoras（旧 IG5）は新 IG8--IG10、推定（旧 IG6）は新 IG11、自然勾配（旧 IG7）は新 IG12、高度な構造（旧 IG8）は新 IG13--IG14 へ分けた。これは **8講に新6講を付け足すのではなく、中心問いを再分節した全14講** である。

単純に「一講90分」へ換算しない。個々の章は主要定理の証明、直接例、A4/B3/C1以上の演習と詳細解答を備えることを優先する。講義数は固定しつつ、節数・例題数・演習数は数学的責務に合わせて増減させる。

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
- 双対平坦性と Levi-Civita 曲率を区別し、正規位置尺度族の $K=-1/2$ を導出できる。
- 有限確率単体の Markov 写像に対する情報単調性を証明し、Čencov 定理の仮定と適用限界を正確に述べられる。
- 各講の例・証明・演習で KL の向き、正則性・可逆性・境界条件、e/m と $\alpha=\pm1$ の符号を一貫して扱う。

---

## 12. 教科書・公開テキストとの照合（2026-11-08）

本改訂は各文献の目次・公開説明・講義計画と、公開されている範囲の数学的説明を比較して構成したものであり、有料書籍の全ページを通読したという主張ではない。講義数は各書籍の章数を写したものではなく、DREAM THEATER の「既習から証明と演習を再構成する」到達基準による独自の編集判断である。

1. **Shun-ichi Amari, Hiroshi Nagaoka, _Methods of Information Geometry_**, AMS, 2000, [DOI:10.1090/mmono/191](https://doi.org/10.1090/mmono/191)。第2章「統計モデルの幾何」、第3章「双対接続」、第4章「統計推論と微分幾何」が IG1--IG11 の中核に対応。一般微分幾何は GEO 正本で補う。
2. **Shun-ichi Amari, _Information Geometry and Its Applications_**, Springer, 2016, [DOI:10.1007/978-4-431-55978-8](https://doi.org/10.1007/978-4-431-55978-8)。Part I の divergence・指数型／混合型・不変幾何、Part II の双対接続、Part III の推論、Part IV の自然勾配という広がりを参照。特に指数型と Legendre、接続と双対平坦性、定理と応用を分割する判断の根拠。
3. **Nihat Ay, Jürgen Jost, Hông Vân Lê, Lorenz Schwachhöfer, _Information Geometry_**, Springer, 2017, [DOI:10.1007/978-3-319-56478-4](https://doi.org/10.1007/978-3-319-56478-4)。有限情報幾何 → パラメータ付き測度モデル → 内在幾何 → 統計・応用の順を参照。IG1 の正則性と IG14 の Markov 写像の仮定を明示する根拠。
4. **Frank Nielsen, “An Elementary Introduction to Information Geometry,” _Entropy_ 22(10), 1100 (2020)**, [DOI:10.3390/e22101100](https://doi.org/10.3390/e22101100)。Fisher 計量、divergence が誘導する双対接続、Bregman/双対平坦性、自然勾配・mirror descent・情報単調性の関連を照合。公開サーベイは説明の見取り図として使い、省略された証明を本教材で自動的に「既知」とはしない。
5. **立教大学「情報数理 4」（2026年度シラバス）**, [講義計画](https://sy.rikkyo.ac.jp/web/preview.php?kodo_2=CA459&nendo=2026)。統計多様体・双対平坦性・Pythagoras・Fisher 計量・Čencov・推論・応用を含む14回構成を比較した。
6. **電気通信大学（2026年度シラバス）**, [講義計画](https://kyoumu.office.uec.ac.jp/syllabus/2026/33/33_25232235.html)。多様体・接続の復習から Fisher 計量、指数型／混合型、双対平坦、射影、推定・最適化へ進む15項目の並びを比較した。
7. **藤岡敦『入門 情報幾何―統計的モデルをひもとく微分幾何学―』**, 共立出版, 2021, [出版社公開の序文・目次](https://kyoritsu-pub.sakura.ne.jp/app/file/goods_contents/3728.pdf)。第1章の統計モデル、第2章の Fisher 計量、第3章の $\alpha$-接続、第6章の指数型／混合型分布族、第7章の双対平坦・divergence という導線を参照。「微積分・線形代数のみから始め、必要時に幾何を導入する」教育設計に対応する。
8. **藤原彰夫『情報幾何学の基礎―情報の内的構造を捉える新たな地平―』**, 共立出版, 2021, [出版社公開の目次](https://kyoritsu-pub.sakura.ne.jp/app/file/goods_contents/3743.pdf)。第3章アファイン接続、第4章双対アファイン接続、第5章 Fisher 計量・$\alpha$-接続・Čencov 定理、第6・7章の応用を照合。IG6--IG10 の論理順と IG14 を独立講義にする判断に使う。
9. **志磨裕彦『ヘッセ幾何学』**, 裳華房, 2001, [出版社の詳細目次](https://www.shokabo.co.jp/mybooks/ISBN978-4-7853-1529-0.htm)。Hesse 構造・その双対・divergence・曲率の位置づけを参照。一般 Hesse 幾何の全面再実装はせず、IG5・IG8・IG9・IG13 で情報幾何の具体例に即して使う。
10. **甘利俊一『増補新版 情報幾何学の新展開』**, サイエンス社, 2025, [出版社の目次](https://saiensu.co.jp/search/?isbn=978-4-7819-1648-4&y=2025)。凸関数・Legendre・双対平坦性・射影、指数型分布族、不変性・粗視化と $f$-divergence、曲指数型分布族が独立した内容として展開されている点を照合。2025年増補の Wasserstein 幾何は本系列の別主題として扱う。

### 改訂判断と再点検項目

- **全14講に確定**：14回／15項目の公開シラバスと国内外の専門書は学修量・説明順の比較材料に留め、こちらでは GEO の一般微分幾何を再講義しない代わりに、KL の微分・Legendre・接続・三点恒等式・射影の各証明を別講義へ分けた。
- **混同防止**：Fisher 行列の半正定値と正定値、指数型「全族」と曲がった部分族、e/m 平坦性と Levi-Civita 曲率、KL の引数順と射影の種類、Čencov の有限次元仮定を明示的なチェック項目とする。
- **前提の最小化**：GEO の接空間・計量・接続、統計の正則モデル、凸解析の Legendre 双対へ、実装時に直接到達できる stable anchor と prerequisite を照合する。GEO 全系列を機械的に前提へ加えない。
- **対象境界**：量子・無限次元・半パラメトリック・複雑な EM/IPF 収束論は独立した中心問いであり、14講へ詰め込まない。
