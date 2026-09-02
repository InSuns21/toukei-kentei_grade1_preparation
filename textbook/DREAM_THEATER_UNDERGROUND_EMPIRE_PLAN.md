# DREAM THEATER 地下帝国・応用拡張計画

## 目的

DREAM THEATER 本編で整備している測度論・線形代数・Fourier解析・PDE・関数解析・確率過程・最適化を、**「現実の問題を解こうとすると、なぜこの数学が必要になるのか」**という方向から再接続する。

統計検定1級の先を単なる上位数学の列挙にせず、

> 統計検定1級は終点ではない。ここから先では、同じ確率・推定・線形代数が、医用画像・ロボティクス・金融・幾何・量子という別の名前で現れる。

ことを体験できる応用課題群を整備する。

この計画は **現在進行中の既存記事の粒度・構成強化を優先し、その完了後に着手する後続ロードマップ** とする。現時点では各分野の本編追加を行わず、依存関係・実装順・到達点を定義する。

---

## 基本方針：欲望から数学へ降りる

各系列は、抽象理論の定義から始めない。最初に具体的な目的を置き、既存の統計学だけでは何が足りないかを明示してから地下へ降りる。

| やりたいこと | 最初の統計・数理 | 地下で必要になるもの |
| --- | --- | --- |
| 体の内部を見たい | 線形モデル・積分・ノイズ | 逆問題・Radon変換・Fourier解析・関数解析・正則化 |
| ロボットを迷子にしたくない | Bayes・正規分布・状態空間モデル | Kalman filter・EKF・particle filter・SLAM |
| 不確実な市場を価格付けしたい | 確率過程・期待値・Monte Carlo | Brown運動・Itô解析・SDE・リスク中立評価 |
| 市場の価格矛盾を見つけたい | 回帰・最適化・時系列 | 凸最適化・マルチンゲール・測度変換・共和分 |
| Fisher情報量の正体をもっと知りたい | 尤度・score・Fisher情報量 | 情報幾何・Fisher–Rao計量・指数型分布族・自然勾配 |
| 量子状態を観測から推定したい | 二項分布・MLE・Fisher情報量 | 密度作用素・POVM・量子状態推定・量子Fisher情報量 |

共通テンプレートは次の順序とする。

1. **Mission**：現実に何をしたいのか。
2. **最小モデル**：既習事項だけで書ける最小の数式。
3. **壁**：なぜ既習事項だけでは解けないのか。
4. **地下数学**：新しく必要になる概念を最小限導入する。
5. **導出**：主要結果を途中式つきで追う。
6. **数値実験**：小規模な計算・シミュレーションで現象を確認する。
7. **地下課題**：標準問題から深掘り問題まで段階化する。
8. **出口案内**：DREAM THEATER本編・通常教材のどこへ戻るかを示す。

---

## Phase 0：既存記事の強化を先に完了する

この計画の実装開始条件。

- `textbook/REVIEW_PLAN.md` に基づく既存記事の粒度・構成強化を優先する。
- DREAM THEATER既存章の proof / pedagogy / granularity audit の major な未解決項目を先に処理する。
- 新規応用記事の追加によって、既存記事のレビュー対象を増やし続ける状態を避ける。
- 新規系列から参照する前提章が統合・廃止予定の場合は、移行完了後の正本へリンクする。

**Phase 0 完了前は、この文書を除き地下帝国の新規本編を追加しない。**

---

# Phase 1：逆問題・確率ロボティクス

既存教材との接続が最も強く、応用上の目的も視覚化しやすい2系列を最初に実装する。

## U1 逆問題：体の中を見たい

### Mission

X線CTのように、対象を切り開かずに内部構造を復元したい。

### 最小モデル

未知画像を $f(x,y)$ とし、方向 $\theta$、位置 $s$ の投影を

$$
Rf(\theta,s)
=
\int_{x\cos\theta+y\sin\theta=s} f(x,y)\,d\ell
$$

とする。観測された $Rf$ から $f$ を復元する。

離散化すると

$$
Ax=b
$$

だが、実測では

$$
Ax+\varepsilon=b_{\mathrm{obs}}
$$

となる。

### 地下へ降りる順序

1. 小さな画素画像を用いた線形方程式としてのCT
2. Radon変換
3. Fourier slice theorem
4. filtered back projection
5. SVDと小さい特異値によるノイズ増幅
6. ill-posedness と Hadamard の well-posedness
7. Tikhonov正則化

$$
\hat f
=
\arg\min_f
\left\{
\|Af-g\|^2+\lambda\|Lf\|^2
\right\}
$$

8. Hilbert空間・有界作用素・コンパクト作用素・随伴作用素への接続
9. optional basement：TV正則化・compressed sensing・Bayesian inverse problem
10. optional basement：地震探査、波動方程式、Full Waveform Inversion、adjoint-state method

### 既存教材との接続

- 線形代数・SVD・作用素ノルム
- Fourier解析
- Hilbert空間・随伴作用素
- 凸最適化・正則化
- Bayes推論

### 最低到達点

「逆行列を掛ければよい」がノイズ下で破綻する理由を、特異値と正則化の両方から説明できる。

---

## U2 確率ロボティクス：ロボットを迷子にしたくない

### Mission

移動にもセンサーにも誤差があるロボットに、自分がどこにいるか推定させたい。

### 最小モデル

$$
x_t=x_{t-1}+u_t+w_t,
\qquad
 y_t=x_t+v_t
$$

から始める。

### 地下へ降りる順序

1. Bayes localization
2. 線形Gaussian状態空間モデル
3. Kalman filter の予測・更新
4. 共分散更新の意味
5. 非線形観測と extended Kalman filter
6. Monte Carloによる particle filter
7. degeneracy と resampling
8. 2次元自己位置推定
9. optional basement：SLAM、data association、factor graph

### 既存教材との接続

- 条件付き分布・Bayes
- 多変量正規分布
- 状態空間モデル
- Monte Carlo
- 行列計算
- GIS・位置情報への応用

### 最低到達点

Kalman filterを公式暗記ではなく、**事前分布と観測尤度から事後分布を更新する操作**として説明できる。

---

# Phase 2：数理ファイナンス・裁定機会

確率過程・時系列・最適化が十分整備された後に実装する。

## U3 数理ファイナンス：不確実な価格をどう扱うか

### Mission

将来価格がランダムに動く資産のデリバティブ価格を求め、さらに大口注文をどう執行するか考える。

### 第1ルート：価格付け

離散時間の幾何Brown運動近似

$$
S_{t+\Delta t}
=
S_t\exp\left[
\left(\mu-\frac{\sigma^2}{2}\right)\Delta t
+\sigma\sqrt{\Delta t}Z_t
\right]
$$

から

$$
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t
$$

へ進む。

1. random walkからBrown運動へのスケーリング
2. 幾何Brown運動と対数正規分布
3. Monte Carlo option pricing
4. Monte Carlo標準誤差・信頼区間
5. European call と Black–Scholes の比較
6. Itô公式
7. リスク中立評価
8. optional basement：Girsanov、stochastic volatility

### 第2ルート：最適執行

$$
dX_t=-v_tdt
$$

を在庫、$v_t$ を売却速度とし、例えば

$$
E\left[
\int_0^T
\left(\eta v_t^2+\lambda X_t^2\right)dt
+\phi X_T^2
\right]
$$

を最小化する。

ここから

- stochastic control
- dynamic programming
- HJB equation
- optimal stopping

へ接続する。

optional basementとして部分観測下の filtering + control、order book、stochastic differential games を扱う。

### 最低到達点

Brown運動・SDE・Monte Carlo・制御が「金融専用の公式」ではなく、既習の確率・推定・最適化の延長としてつながることを説明できる。

---

## U4 裁定機会：市場を出し抜きたい

### Mission

多数の価格から、同じキャッシュフローなのに価格が整合しない組合せや、統計的に一時的な価格歪みを探したい。

### ルートA：確実な裁定

1. 一物一価
2. ポートフォリオを用いた線形不等式
3. 線形計画・凸最適化としての裁定探索
4. option price の単調性・凸性・butterfly arbitrage
5. 満期間の整合性

### ルートB：なぜ無裁定価格になるのか

無裁定と同値マルチンゲール測度の関係へ進む。

割引価格が $Q$ の下でマルチンゲールなら、価格を

$$
V_t
=
B_t E_Q\left[
\frac{X_T}{B_T}
\middle|
\mathcal F_t
\right]
$$

として捉える。

ここから

- 条件付き期待値
- martingale
- Radon–Nikodym微分
- measure change
- Girsanov

へ接続する。

### ルートC：統計的裁定

1. 単位根
2. 共和分
3. spread の平均回帰
4. 状態空間モデル・Kalman filter
5. 因子モデル
6. 高次元・スパース推定
7. transaction cost と backtest bias

optional basement：martingale optimal transport。

### 最低到達点

**無リスク裁定**と**統計的裁定**を明確に区別し、前者が無裁定理論・凸最適化、後者が時系列推論・モデルリスクの問題であることを説明できる。

---

# Phase 3：情報幾何

## U5 情報幾何：Fisher情報量、お前ここにもいたのか

### Mission

MLEやCramér–Raoで使ってきたFisher情報量を、単なる公式ではなく「確率分布の空間の幾何」として理解したい。

### 最小モデル

パラメトリック分布族

$$
\{p(x;\theta):\theta\in\Theta\}
$$

を点の集合とみなし、Fisher情報行列

$$
g_{ij}(\theta)
=
E_\theta\left[
\frac{\partial}{\partial\theta_i}\log p(X;\theta)
\frac{\partial}{\partial\theta_j}\log p(X;\theta)
\right]
$$

を局所的な計量として読む。

### 地下へ降りる順序

1. 1次元正規分布でFisher情報量を距離感として読む
2. Fisher information matrix
3. reparameterization に対する変換
4. Fisher–Rao metric
5. exponential family
6. KL divergence の局所2次近似
7. natural gradient
8. optional basement：dual connections、Bregman divergence、Amariの情報幾何

### 既存教材との接続

- score
- Fisher情報量
- Cramér–Rao
- MLE
- 指数型分布族
- KL divergence
- 多変量微分

### 最低到達点

Fisher情報行列が推定精度の指標であるだけでなく、パラメータ化に依存しない局所幾何を与える理由を具体例で説明できる。

---

# Phase 4：量子統計

## U6 量子統計：量子状態を観測から推定したい

### Mission

量子力学を一冊学び直すことを入口にせず、**観測結果から未知の量子状態・量子パラメータを推定する**問題として統計学から入る。

### 最初の例

qubit

$$
|\psi\rangle
=
\cos\frac{\theta}{2}|0\rangle
+
\sin\frac{\theta}{2}|1\rangle
$$

を繰り返し測定すると、測定結果は二項モデルとして扱える。

ここから

1. Born rule と測定確率
2. 二項尤度
3. MLE
4. Fisher情報量
5. Cramér–Rao lower bound
6. 複素内積空間・Hermitian / unitary operator の最小補講
7. density matrix

$$
\rho
=
\frac12\left(I+\mathbf r\cdot\boldsymbol\sigma\right)
$$

8. quantum state tomography
9. POVM
10. quantum Fisher information
11. quantum Cramér–Rao bound

へ進む。

### 境界線

Schrödinger方程式、量子力学の全体系、場の量子論を本系列の必須前提にはしない。

必要に応じて

- 複素ベクトル空間
- Hermitian / unitary 行列
- スペクトル定理
- tensor product
- operator

を最小限補う。量子力学そのものの講義へ膨張した場合は別系列へ分離する。

### 最低到達点

古典統計の「未知分布・未知母数を観測から推定する」という発想が、量子測定ではどこまでそのまま使え、どこから測定設計・非可換性という新しい問題が加わるか説明できる。

---

# 依存関係

```text
既存の通常教材・DREAM THEATER
│
├─ 線形代数 / SVD / Fourier / 関数解析
│   └─ U1 逆問題
│       └─ Bayesian inverse problem / seismic imaging（optional）
│
├─ Bayes / 多変量正規 / 状態空間 / Monte Carlo
│   └─ U2 確率ロボティクス
│       └─ SLAM（optional）
│
├─ 確率過程 / 条件付き期待値 / 時系列
│   ├─ U3 数理ファイナンス
│   │   └─ 確率制御・HJB
│   └─ U4 裁定機会
│       ├─ 無裁定理論・測度変換
│       └─ 統計的裁定・共和分
│
├─ likelihood / score / Fisher / 指数型分布族
│   └─ U5 情報幾何
│       └─ natural gradient
│
└─ 線形代数 + likelihood / Fisher
    └─ U6 量子統計
        └─ quantum Fisher / tomography
```

実装順は依存関係だけでなく、既存教材の再利用率を重視して

$$
\boxed{
\text{逆問題・確率ロボティクス}
\rightarrow
\text{数理ファイナンス・裁定}
\rightarrow
\text{情報幾何}
\rightarrow
\text{量子統計}
}
$$

を標準とする。

---

# 各記事の受け入れ基準

新規記事を「地下帝国の本編」として追加する際は、少なくとも以下を満たす。

1. **前提知識を明記**し、既存教材の正本へリンクする。
2. 初出記号・概念を「知っているもの」として投げない。
3. 最初に現実の Mission と最小具体例を置く。
4. 「なぜ既存の道具では足りないか」を明示してから新理論を導入する。
5. 主要公式を少なくとも1つは導出する。
6. 手計算できる小例または小規模な数値実験を1つ以上置く。
7. **標準課題 / 深掘り課題 / optional basement** を分離する。
8. 計算結果だけでなく、統計的意味・仮定・失敗条件を説明する。
9. DREAM THEATER本編の数学章との往復リンクを置く。
10. 通常教材の統計検定1級範囲と混同させず、「発展・範囲外」であることを明示する。
11. KaTeX strict、用語・記号ガイド、教材のproof/pedagogy基準に従う。
12. 本編追加後は `dream-theater-index.json` と関連監査文書の対象へ組み込む。

---

# 実装単位

巨大な「応用数学大全」を一度に作らず、各系列を小さなPRへ分割する。

推奨単位：

1. U1-01 CTと離散逆問題
2. U1-02 Radon変換とFourier slice theorem
3. U1-03 ill-posedness・SVD・正則化
4. U2-01 Bayes localization
5. U2-02 Kalman filter
6. U2-03 particle filterからSLAM入口
7. U3-01 random walkからBrown運動・GBM
8. U3-02 Monte Carlo pricing・Black–Scholes
9. U3-03 最適執行・確率制御入口
10. U4-01 静的裁定と凸最適化
11. U4-02 無裁定とマルチンゲール測度
12. U4-03 統計的裁定・共和分
13. U5-01 Fisher情報行列からFisher–Rao計量
14. U5-02 指数型分布族・KL・natural gradient
15. U6-01 qubit測定を二項推定として読む
16. U6-02 density matrix・tomography
17. U6-03 quantum Fisher information

各PRは、既存記事の品質強化と同じく「読者が途中を自力で再現できる粒度」を満たしてから次へ進む。

---

# この計画でやらないこと

- 現在進行中の既存記事強化を中断して新規記事を量産しない。
- 6分野をそれぞれ独立した大学院教科書の完全版にしない。
- 応用上不要な抽象論を、体系上美しいという理由だけで必須化しない。
- 量子統計を一般的な量子力学講義へ置換しない。
- 数理ファイナンスを金融実務の売買推奨や収益保証の教材にしない。
- 統計的裁定を「過去に平均回帰したから将来も儲かる」という説明にしない。

地下帝国の目的は、数学を深くすること自体ではなく、**現実の問題を真面目に解こうとした結果、どの地下数学が必要になるかを見えるようにすること**である。
