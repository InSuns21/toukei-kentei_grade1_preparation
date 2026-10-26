# ML2-15 深層最適化・正則化・汎化検証

前講の[多層網の逆伝播とパラメータ勾配](../ML2-14/index.md#thm-ml2-14-backprop)により、有限の多層網で一つの損失を微分する方法が分かった。ところが、勾配が正確でも「どれほど大きく重みを動かせばよいか」「訓練損失をゼロへ近づけるほど未知のデータにも強くなるか」は別問題である。例えば二次関数でさえ学習率が大きすぎれば発散し、訓練損失が下がり続けるのに検証損失が上がることもある。

本講では、勾配の更新を**最適化**、重みやモデルのばらつきを抑える操作を**正則化**、未知データ上での選択と評価を**検証**として切り分ける。深層網の非凸性に対し、何を数学的に証明でき、何を実験でしか観測していないかを区別する。

## 1. 損失と重みの役割を固定する

訓練標本 $D_{\mathrm{tr}}=((x_i,y_i))_{i=1}^n$、有限次元の重み・バイアスをまとめた $\theta\in\mathbb R^p$、ネットワーク予測 $f_\theta(x)$、各標本の非負損失 $\ell(f_\theta(x),y)$ を考える。経験損失は標本ごとに損失を計算して平均した量である。重みに余分な費用を課すことがある。

<a id="def-ml2-15-regularized-objective"></a>

<!-- formal-statement-start -->
> **定義（深層網の正則化付き経験損失）**
> 訓練標本 $D_{\mathrm{tr}}$、予測器 $f_\theta$、損失 $\ell$ および非負関数 $\Omega:\mathbb R^p\to[0,\infty)$ を固定する。標本平均を $F(\theta)$ とし、強さ $\lambda\ge0$ の正則化付き目的関数 $J_\lambda$ を次で定める。

$$
F(\theta)=\frac1n\sum_{i=1}^{n}\ell(f_\theta(x_i),y_i),
\qquad J_\lambda(\theta)=F(\theta)+\lambda\Omega(\theta).
$$

> $F$ と $J_\lambda$ の最小化は、$\lambda=0$ または $\Omega$ が定数の場合を除き、一般に別の問題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-15-regularized-objective -->
**定義の確認**。 一入力一重みの網 $f_w(x)=wx$、標本 $(x,y)=(1,2)$、二乗損失 $\ell(u,y)=(u-y)^2/2$ を考える。非負の罰則 $\Omega(w)=w^2/2$ を選び、標本数を $n=1$、正則化係数を $\lambda=1$ とすると、定義の二つの目的は

$$
F(w)=\frac{(w-2)^2}{2},\qquad
J_1(w)=\frac{(w-2)^2+w^2}{2}.
$$

$F'(w)=w-2$、$J_1'(w)=2w-2$ で、それぞれの二階微分は $1,2$ と正である。したがって唯一の最小点は順に $w=2$、$w=1$。$\Omega(w)\ge0$ も全実数で満たされる。**訓練データへの適合と小さな重みの間に競合が生じた**。
<!-- definition-example-end -->

正則化は「絶対に過学習を防ぐ保証」ではない。学習規則に組み込む設計上の偏りであり、効果は問題・データ分割・最適化到達点による。

## 2. 学習率は何を保証するか

[ML1-09のL-滑らかさ](../ML1-09/index.md#def-ml1-09-smooth-loss)は、勾配が距離に比例する範囲を超えて急変しない条件である。深層網のReLU折点では一般に微分が存在しないので、以下は**微分可能かつ勾配がL-Lipschitz**である評価域でのみ使う。滑らかな活性化の網でも、全パラメータ空間に共通の有限 $L$ が存在するとは限らない。

今は正則化も含めた微分可能な目的関数を $J$ と書き、全標本勾配下降 $\theta_{t+1}=\theta_t-\eta\nabla J(\theta_t)$ を使う。[ML1-10のミニバッチ勾配](../ML1-10/index.md#thm-ml1-10-unbiased)では追加の乱数分散を考慮する必要があり、決定論的結論をそのまま適用しない。

<a id="thm-ml2-15-nonconvex-descent"></a>

<!-- formal-statement-start -->
> **定理（非凸滑らかな損失の勾配下降と停留性評価）**
> $J:\mathbb R^p\to\mathbb R$ は連続微分可能で、全空間上で勾配が $L$-Lipschitz（$L>0$）であり、すべての $\theta$ で $J(\theta)\ge J_{\inf}>-\infty$ とする。$0<\eta\le1/L$ を固定し、

$$
\theta_{t+1}=\theta_t-\eta\nabla J(\theta_t)
$$

> と更新すると、任意の整数 $T\ge1$ に対して

$$
\begin{aligned}
J(\theta_{t+1})&\le J(\theta_t)-\frac{\eta}{2}\|\nabla J(\theta_t)\|^2,\\
\frac1T\sum_{t=0}^{T-1}\|\nabla J(\theta_t)\|^2
&\le\frac{2[J(\theta_0)-J_{\inf}]}{\eta T}.
\end{aligned}
$$

> したがって $\min_{0\le t<T}\|\nabla J(\theta_t)\|^2$ も右辺以下となる。この結論は大域最小値への収束を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[ML1-09の下降補題](../ML1-09/index.md#thm-ml1-09-learning-rate)の導出に用いた二次上界に、方向 $d=-\eta\nabla J(\theta_t)$ を代入する。非凸でもこの一段の比較は成立する。各段の改善量を足すと、損失の下界が勾配ノルム二乗の総和を抑える。

<!-- proof-start -->
### 証明

$L$-Lipschitz勾配の条件から、任意の $\theta,d$ について

$$
J(\theta+d)\le J(\theta)+\nabla J(\theta)^{\mathsf T}d+\frac L2\|d\|^2
$$

が成り立つ。実際 $g(s)=J(\theta+sd)$ とおけば、微積分の基本定理と[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
\begin{aligned}
g(1)-g(0)-g'(0)
&=\int_0^1[\nabla J(\theta+sd)-\nabla J(\theta)]^{\mathsf T}d\,ds\\
&\le\int_0^1Ls\|d\|^2\,ds=\frac L2\|d\|^2.
\end{aligned}
$$

ここへ $d=-\eta\nabla J(\theta_t)$ を代入すると

$$
\begin{aligned}
J(\theta_{t+1})-J(\theta_t)
&\le-\eta\|\nabla J(\theta_t)\|^2
+\frac{L\eta^2}{2}\|\nabla J(\theta_t)\|^2\\
&=-\eta(1-L\eta/2)\|\nabla J(\theta_t)\|^2\\
&\le-\frac\eta2\|\nabla J(\theta_t)\|^2.
\end{aligned}
$$

最後は $L\eta\le1$ を使う。この不等式を $t=0,\ldots,T-1$ まで加えると左側の損失差が相殺され、

$$
\frac\eta2\sum_{t=0}^{T-1}\|\nabla J(\theta_t)\|^2
\le J(\theta_0)-J(\theta_T)
\le J(\theta_0)-J_{\inf}.
$$

両辺を $\eta T/2$ で割る。各項は非負だから、その最小値は平均以下である。$\square$
<!-- proof-end -->

この定理は「ある反復で勾配が小さい」ことしか保証しない。例えば $J(w)=1-\cos w$ は非負で、$J'(w)=\sin w$ は全実数上で1-Lipschitzである。しかし $w=\pi$ では勾配ゼロでも $J(\pi)=2$、大域最小値は $J(0)=0$ である。**定理の仮定を満たしていても停留性と大域最適性は別**だと分かる。

<a id="prop-ml2-15-quadratic-step"></a>

<!-- formal-statement-start -->
> **命題（二次模型の学習率閾値）**
> $a>0$、$J(w)=aw^2/2$、初期値 $w_0\ne0$ を考える。固定学習率 $\eta>0$ の勾配下降は

$$
w_t=(1-a\eta)^t w_0
$$

> となる。$0<a\eta<2$ なら $w_t\to0$、$a\eta=2$ なら符号が交互に変わり損失は一定、$a\eta>2$ なら $|w_t|\to\infty$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

勾配 $J'(w)=aw$ を更新に入れるだけで等比数列になる。絶対値 $|1-a\eta|$ が1より小さいかどうかを見る。

<!-- proof-start -->
### 証明

更新式 $w_{t+1}=w_t-\eta aw_t=(1-a\eta)w_t$ を帰納的に繰り返し $w_t=(1-a\eta)^tw_0$ を得る。$0<a\eta<2$ と $|1-a\eta|<1$ は同値なので零へ収束する。$a\eta=2$ では係数が $-1$、$a\eta>2$ では係数の絶対値が1より大きい。損失は $aw_t^2/2$ だから、後者では無限大へ発散する。$\square$
<!-- proof-end -->

$a=4$ とすれば $\eta=1/4$ は一段で最小点へ到達し、$\eta=1/2$ は振動し、$\eta=3/4$ は発散する。[前講の逆伝播](../ML2-14/index.md#thm-ml2-14-backprop)が正しい勾配を返しても、学習率を安全に選ぶ責務は残る。

## 3. weight decayは何を縮めるか

重みが大きいと予測値が入力の小さな変化に敏感になる場合がある。しかしバイアスまで一律に縮めるか、どの重みを費用対象とするかは設計事項である。パラメータを重み成分 $w$ とそれ以外 $b$ に分け、$w$ の二乗和を罰する。

<a id="def-ml2-15-weight-decay"></a>

<!-- formal-statement-start -->
> **定義（weight decay）**
> $F(w,b)$ が微分可能な経験損失で、$\lambda\ge0$、$\eta>0$ とする。**結合型weight decay** は $J_\lambda(w,b)=F(w,b)+\lambda\|w\|^2/2$ に対する勾配更新であり、

$$
\begin{aligned}
w_{t+1}&=(1-\eta\lambda)w_t-\eta\nabla_wF(w_t,b_t),\\
b_{t+1}&=b_t-\eta\nabla_bF(w_t,b_t)
\end{aligned}
$$

> とする。ここでは $b$ には罰則を置かない。重みを減衰させる係数は $1-\eta\lambda$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-15-weight-decay -->
**定義の確認**。 $F(w,b)=(w-2)^2/2+(b-1)^2/2$、$(w_0,b_0)=(1,0)$、$\eta=1/4$、$\lambda=1$ とする。$\nabla_wF=-1$、$\nabla_bF=-1$ より $w_1=(3/4)\cdot1-(1/4)(-1)=1$、$b_1=0-(1/4)(-1)=1/4$。重みには減衰 $-1/4$ と損失勾配による $+1/4$ が拮抗し、バイアスには減衰がない。定義の二行を直接確認できる。
<!-- definition-example-end -->

この等価性は**通常のSGDの同一スカラー学習率**についての代数恒等式である。Adam等の成分別前処理を用いると、結合型の $\lambda w$ も前処理される。分離型decoupled weight decayは $-\eta\lambda w$ を前処理の外で引くため、一般には結合型の $L^2$ 罰則付き最適化と同一ではない。また $1-\eta\lambda<0$ なら「減衰」という字面から単調ノルム減少を結論できない。

非凸最適化では発見した局所解どうしのノルムは何も保証されない。それでも、**大域最小化を本当に達成した場合**には比較できる。

<a id="prop-ml2-15-norm-order"></a>

<!-- formal-statement-start -->
> **命題（非凸大域最小解の重みノルム比較）**
> $F:\mathbb R^p\to\mathbb R$ と $P(w)=\|w\|^2/2$ を固定する。$0\le\lambda_1<\lambda_2$ について $F+\lambda_iP$ の**大域最小解** $w_i$ が各々存在するとき、

$$
P(w_2)\le P(w_1),\qquad F(w_1)\le F(w_2).
$$

> $F$ に凸性は仮定しない。ただし勾配法が得る任意の局所停留点についての主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

各最小解を相手の目的関数に代入して二つの最適性不等式を作り、足して $F$ を消す。

<!-- proof-start -->
### 証明

$w_1,w_2$ の大域最小性から順に

$$
F(w_1)+\lambda_1P(w_1)\le F(w_2)+\lambda_1P(w_2),
$$

$$
F(w_2)+\lambda_2P(w_2)\le F(w_1)+\lambda_2P(w_1).
$$

足すと $(\lambda_2-\lambda_1)[P(w_2)-P(w_1)]\le0$ だから $P(w_2)\le P(w_1)$。最初の不等式を移項すると $F(w_1)-F(w_2)\le\lambda_1[P(w_2)-P(w_1)]\le0$。$\square$
<!-- proof-end -->

ReLU網では層の正のスケールを相殺できる場合があり、「パラメータノルムが小さい」と「表現関数が一意に簡単」は同じではない。

## 4. early stoppingは検証によるモデル選択である

訓練損失だけを見ていれば、訓練を長く続ける方が常によさそうに見える。しかし反復回数 $t$ 自体が、データから選ばれる複雑度の調整量になりうる。[ML1-12の三分割](../ML1-12/index.md#def-ml1-12-three-way-split)を使い、モデル重みの更新には訓練標本だけを用いる。

<a id="def-ml2-15-early-stopping"></a>

<!-- formal-statement-start -->
> **定義（early stopping）**
> 固定した学習手順と訓練データから重み列 $\theta_0,\ldots,\theta_T$ を作る。訓練に使わなかった独立な検証標本 $D_{\mathrm{val}}$ で各時刻の平均損失 $V_t$ を計算し、同点なら最も早い時刻を選ぶ規則

$$
\hat t=\min\operatorname*{arg\,min}_{0\le t\le T} V_t,\qquad
\hat\theta=\theta_{\hat t}
$$

> を**early stopping**（検証による学習終了反復の選択）という。最終評価用の独立テスト標本は $\hat t$ の選択に使わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-15-early-stopping -->
**定義の確認**。 検証損失が $V_0=1/2,V_1=0,V_2=1/8$ なら集合 $\operatorname*{arg\,min}_{0\le t\le2}V_t=\{1\}$ だから $\hat t=1$ となる。例えば $V_1=V_2=0$ なら同点規則により1を選ぶ。$V_t$ は訓練損失そのものではない。
<!-- definition-example-end -->

<a id="prop-ml2-15-early-counterexample"></a>

<!-- formal-statement-start -->
> **命題（early stoppingの反例）**
> 以下の訓練損失を初期値 $w_0=0$ から学習率 $\eta=1/2$ で勾配下降させ、別に検証損失を計算する。

$$
F(w)=\frac12(w-2)^2,\qquad V(w)=\frac12(w-1)^2.
$$

> このとき訓練損失 $F(w_t)$ は $t\ge0$ で厳密に減少するが、検証損失 $V(w_t)$ は $t=1$ で最小の0となり、それ以後は厳密に増加する。
<!-- formal-statement-end -->

### 証明の見取り図

訓練データは目標2、検証データは目標1である。更新は2へ近づくが、1を通り越した時点から検証誤差は増加する。

<!-- proof-start -->
### 証明

$F'(w)=w-2$ なので $w_{t+1}=(w_t+2)/2$。$e_t=2-w_t$ と置けば $e_{t+1}=e_t/2$、$e_0=2$、従って

$$
w_t=2(1-2^{-t}),\qquad F(w_t)=2\cdot4^{-t}.
$$

$F(w_{t+1})=F(w_t)/4$ なので厳密に減少する。一方

$$
V(w_t)=\frac12(1-2^{1-t})^2
$$

であり $V(w_1)=0$。$t\ge1$ では $w_t$ は1から2へ厳密単調増加するので、$V(w_t)$ は $t\ge1$ で厳密に増加する。$\square$
<!-- proof-end -->

これは特定の訓練・検証標本の対照例であって、early stoppingが常に改善するという定理ではない。打切り反復番号、学習率、$\lambda$、ネット幅、乱数の初期化値などを検証データで何度も選ぶほど、最小検証損失を最終汎化誤差とみなせない。[ML1-12の選択楽観性定理](../ML1-12/index.md#thm-ml1-12-selection-optimism)がその理由を説明する。

## 5. dropoutでは学習時と予測時を取り違えない

網の隠れ特徴 $h=(h_1,\ldots,h_m)$ を出力層が線形結合する例を考える。学習時だけ一部の特徴を確率的に消せば、毎回違う網の一部分を使って損失を計算できる。消す確率を変えたとき出力の平均まで変わってしまうのを避けるため、**残した特徴を逆確率で拡大**する。

ここでBernoulli$(q)$ は、値1を確率 $q$、値0を確率 $1-q$ で取る二値分布である。特徴ごとに独立にこの値を引き、1なら残し、0なら消す。

<a id="def-ml2-15-inverted-dropout"></a>

<!-- formal-statement-start -->
> **定義（inverted dropoutと評価時予測）**
> 保持確率 $q\in(0,1]$ と特徴 $h\in\mathbb R^m$ に対し、学習時に互いに独立なBernoulli確率変数を生成し、各特徴を次のように変換する操作を**inverted dropout**という。

$$
B_j\sim\mathrm{Bernoulli}(q),\qquad M_j=\frac{B_j}{q},
\qquad\tilde h_j=M_jh_j.
$$

> 係数 $a\in\mathbb R^m$ とバイアス $c\in\mathbb R$ を固定した線形出力は、学習時と評価時でそれぞれ次のようになる。

$$
\tilde y=\sum_{j=1}^m a_j\tilde h_j+c,\qquad
y=\sum_{j=1}^m a_jh_j+c.
$$

> 評価時はmaskを使わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-15-inverted-dropout -->
**定義の確認**（1特徴）。 $m=1,q=1/2,a_1=2,h_1=3,c=0$ なら $B=0,1$ がそれぞれ確率1/2。学習時 $\tilde y$ は0または12、期待値は6であり、評価時出力 $y=2\cdot3=6$ に一致する。

**2特徴での独立性の確認**。 $m=2$、$a=(2,1)$、$h=(3,1)$、$q=1/2$、$c=0$ として各maskを独立に引く。$(B_1,B_2)$ の4通り $(0,0),(1,0),(0,1),(1,1)$ は、各座標の確率を掛けてそれぞれ確率 $1/4$ になる。対応する学習時出力とその平均は

$$
(\tilde y_{00},\tilde y_{10},\tilde y_{01},\tilde y_{11})=(0,12,2,14),
\qquad \mathbb E[\tilde y]=\frac{0+12+2+14}{4}=7.
$$

評価時は $y=2\cdot3+1\cdot1=7$ で平均と一致する。maskは訓練時にだけ再抽選するもので、評価時には確率抽選をしない。$q=1$ なら両者は常に一致する。
<!-- definition-example-end -->

<a id="prop-ml2-15-dropout-loss"></a>

<!-- formal-statement-start -->
> **命題（inverted dropoutの期待損失）**
> 固定した $a,h,c,t$ と、互いに独立な上記mask $M_j$ を考える。このとき $y=\sum_j a_jh_j+c$ として

$$
\mathbb E_B[\tilde y]=y,\qquad
\mathbb E_B\!\left[\frac12(\tilde y-t)^2\right]
=\frac12(y-t)^2+\frac{1-q}{2q}\sum_{j=1}^m(a_jh_j)^2.
$$

> これは**出力がmaskに関して線形で、二乗損失を用いる固定特徴の模型**での厳密式である。一般の非線形な後続層、softmax損失、maskに依存する正規化層へそのまま拡張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$M_j$ の平均は1、分散は $(1-q)/q$。独立な出力寄与の分散を足し、二乗誤差の期待値を「平均誤差の二乗＋分散」に分ける。

<!-- proof-start -->
### 証明

$B_j$ は0と1だけを取り、それぞれ確率 $1-q,q$ なので

$$
\mathbb E[M_j]=\frac{q}{q}=1,\qquad
\mathbb E[M_j^2]=\frac q{q^2}=\frac1q,\qquad
\operatorname{Var}(M_j)=\frac{1-q}{q}.
$$

$v_j=a_jh_j$ と置くと $\tilde y-y=\sum_jv_j(M_j-1)$。各項の平均は0、独立性より異なる添字の積の期待値は0だから

$$
\operatorname{Var}(\tilde y)=\mathbb E[(\tilde y-y)^2]
=\frac{1-q}{q}\sum_jv_j^2.
$$

$\tilde y-t=(\tilde y-y)+(y-t)$ を二乗して期待値を取れば、交差項 $2(y-t)\mathbb E[\tilde y-y]=0$ が消え、主張を得る。$\square$
<!-- proof-end -->

dropoutは重みの二乗ノルムそのものに定数を掛ける罰則とは一般に等しくない。追加項は**データから生じる特徴 $h_j$** に依存する。さらに評価時にmaskを外す操作は、一般の非線形網の「学習時出力の期待値と評価時出力が必ず一致する」ことを保証しない。

## 6. 数値実験：二層網の曲線を自分で再計算する

ここまでの一段下降定理は訓練目的の話であり、未知データ上の損失まで保証しない。実際に非線形な二層網を学習し、訓練・検証曲線、重みノルム、選択した反復番号を観察する。次の実験は $\tanh$ 隠れ層を持つ $1\to8\to1$ の小型網である。二乗損失と出力層を明示することで[多層網の逆伝播とパラメータ勾配](../ML2-14/index.md#thm-ml2-14-backprop)を直接実装する。$\tanh$ は微分可能で $d(\tanh z)/dz=1-\tanh^2z$ を使う。

データは乱数の初期化値を固定して独立に発生させる。真の回帰関数は $\sin(3x)$、各観測に平均0・標準偏差を指定した正規雑音を足す。入力は区間 $[-1,1]$ を台とし、その上で密度が常に $1/2$ の分布から抽出する。訓練24点・検証24点・独立テスト128点を生成する。

正則化係数・学習率・雑音・乱数の初期化値を変え、検証損失が最小となる反復番号を比較する。テスト損失は**選択が終わった後**に一度だけ計算する。

コードの行列が何を表すかを先に確かめる。標本数は $n=24$、隠れ特徴数は8である。

| 記号 | 表す量 | 行列の大きさ |
|---|---|---|
| $X$ | 訓練入力 | $n\times1$ |
| $W_1$ | 第一層の重み | $1\times8$ |
| $b_1$ | 第一層のバイアス | $1\times8$ |
| $W_2$ | 出力層の重み | $8\times1$ |
| $b_2$ | 出力バイアス | $1\times1$ |

$\mathbf1_n$ を成分がすべて1の列ベクトルとすると、隠れ層と出力は

$$
Z=XW_1+\mathbf1_n b_1,\qquad H=\tanh Z,\qquad
\hat Y=HW_2+\mathbf1_n b_2.
$$

二乗経験損失と出力誤差を次で定める。$\|\cdot\|_F^2$ は行列の全成分の二乗和である。

$$
F=\frac{\|\hat Y-Y\|_F^2}{2n},\qquad
\Delta=\frac{\hat Y-Y}{n}\in\mathbb R^{n\times1}.
$$

[前講の逆伝播公式](../ML2-14/index.md#thm-ml2-14-backprop)をこの二層網に当てはめると、出力から隠れ層への勾配と二つの重みの勾配は

$$
\begin{aligned}
\nabla_{W_2}F&=H^{\mathsf T}\Delta&&\in\mathbb R^{8\times1},\\
\Delta_Z&=(\Delta W_2^{\mathsf T})\odot(\mathbf1_{n\times8}-H^{\odot2})&&\in\mathbb R^{n\times8},\\
\nabla_{W_1}F&=X^{\mathsf T}\Delta_Z&&\in\mathbb R^{1\times8}.
\end{aligned}
$$

ここで $\odot$ は同じ位置の成分どうしの積、$H^{\odot2}$ は成分ごとの二乗、$\mathbf1_{n\times8}$ は全成分が1の行列である。$\Delta W_2^{\mathsf T}$ が各標本の出力誤差を8つの隠れ特徴へ戻し、$1-\tanh^2Z$ を掛けるのが連鎖律である。バイアス勾配はそれぞれ $\Delta$ と $\Delta_Z$ の行方向の和になる。weight decayでは $W_1,W_2$ の勾配にだけ $\lambda W_1,\lambda W_2$ を加える。

ラボの空欄は、逆伝播の連鎖律、weight decayの勾配、検証時刻の選択の3箇所である。乱数の初期化値を固定して繰り返せば同じ数値が得られるが、別の初期化値で同じ結論になる保証はない。

```python-lab
# lab-id: ml2-15-deep-training
# lab-title: 二層網の重み更新とearly stopping
# lab-mode: exercise
# timeout-ms: 30000
import numpy as np
import matplotlib.pyplot as plt

def experiment(seed=2715, noise=0.30, lr=0.08, decay=0.02, steps=450):
    rng = np.random.default_rng(seed)
    xtr = rng.uniform(-1, 1, (24, 1))
    xval = rng.uniform(-1, 1, (24, 1))
    xtest = rng.uniform(-1, 1, (128, 1))
    ytr = np.sin(3*xtr) + rng.normal(0, noise, xtr.shape)
    yval = np.sin(3*xval) + rng.normal(0, noise, xval.shape)
    ytest = np.sin(3*xtest) + rng.normal(0, noise, xtest.shape)
    W1 = rng.normal(0, 0.6, (1, 8))
    b1 = np.zeros((1, 8))
    W2 = rng.normal(0, 0.6, (8, 1))
    b2 = np.zeros((1, 1))
    def predict(x):
        return np.tanh(x @ W1 + b1) @ W2 + b2
    train_curve, val_curve, norms, snapshots = [], [], [], []
    for step in range(steps + 1):
        h = np.tanh(xtr @ W1 + b1)
        residual = h @ W2 + b2 - ytr
        train_curve.append(float(np.mean(residual**2)/2))
        val_curve.append(float(np.mean((predict(xval)-yval)**2)/2))
        norms.append(float(np.sqrt(np.sum(W1**2) + np.sum(W2**2))))
        snapshots.append((W1.copy(), b1.copy(), W2.copy(), b2.copy()))
        if step == steps:
            break
        dy = residual / len(xtr)
        dW2 = h.T @ dy
        db2 = np.sum(dy, axis=0, keepdims=True)
        # ヒント: 隠れ層への連鎖律とtanhの局所導関数
        dz = ___
        dW1 = xtr.T @ dz
        db1 = np.sum(dz, axis=0, keepdims=True)
        # ヒント: 重みだけにL2罰則を掛ける結合型weight decay
        W1 -= ___
        W2 -= lr * (dW2 + decay * W2)
        b1 -= lr * db1
        b2 -= lr * db2
    # ヒント: 訓練曲線ではなく検証曲線で最も早い最小時刻
    best = ___
    Wa, ba, Wb, bb = snapshots[best]
    pred_test = np.tanh(xtest @ Wa + ba) @ Wb + bb
    test_loss = float(np.mean((pred_test-ytest)**2)/2)
    return np.array(train_curve), np.array(val_curve), np.array(norms), best, test_loss

tr, va, nr, best, test_loss = experiment()
print("best epoch:", best, "test loss:", round(test_loss, 5))
plt.plot(tr, label="train")
plt.plot(va, "--", label="validation")
plt.axvline(best, color="black", linestyle=":", label="selected epoch")
plt.xlabel("gradient steps"); plt.ylabel("mean squared loss / 2")
plt.legend(); plt.show()
```

```python-solution
import numpy as np
import matplotlib.pyplot as plt

def experiment(seed=2715, noise=0.30, lr=0.08, decay=0.02, steps=450):
    rng = np.random.default_rng(seed)
    xtr = rng.uniform(-1, 1, (24, 1))
    xval = rng.uniform(-1, 1, (24, 1))
    xtest = rng.uniform(-1, 1, (128, 1))
    ytr = np.sin(3*xtr) + rng.normal(0, noise, xtr.shape)
    yval = np.sin(3*xval) + rng.normal(0, noise, xval.shape)
    ytest = np.sin(3*xtest) + rng.normal(0, noise, xtest.shape)
    W1 = rng.normal(0, 0.6, (1, 8))
    b1 = np.zeros((1, 8))
    W2 = rng.normal(0, 0.6, (8, 1))
    b2 = np.zeros((1, 1))
    def predict(x):
        return np.tanh(x @ W1 + b1) @ W2 + b2
    train_curve, val_curve, norms, snapshots = [], [], [], []
    for step in range(steps + 1):
        h = np.tanh(xtr @ W1 + b1)
        residual = h @ W2 + b2 - ytr
        train_curve.append(float(np.mean(residual**2)/2))
        val_curve.append(float(np.mean((predict(xval)-yval)**2)/2))
        norms.append(float(np.sqrt(np.sum(W1**2) + np.sum(W2**2))))
        snapshots.append((W1.copy(), b1.copy(), W2.copy(), b2.copy()))
        if step == steps:
            break
        dy = residual / len(xtr)
        dW2 = h.T @ dy
        db2 = np.sum(dy, axis=0, keepdims=True)
        dz = (dy @ W2.T) * (1 - h**2)
        dW1 = xtr.T @ dz
        db1 = np.sum(dz, axis=0, keepdims=True)
        W1 -= lr * (dW1 + decay * W1)
        W2 -= lr * (dW2 + decay * W2)
        b1 -= lr * db1
        b2 -= lr * db2
    best = int(np.argmin(val_curve))
    Wa, ba, Wb, bb = snapshots[best]
    pred_test = np.tanh(xtest @ Wa + ba) @ Wb + bb
    test_loss = float(np.mean((pred_test-ytest)**2)/2)
    return np.array(train_curve), np.array(val_curve), np.array(norms), best, test_loss

tr, va, nr, best, test_loss = experiment()
print("best epoch:", best, "test loss:", round(test_loss, 5))
plt.plot(tr, label="train")
plt.plot(va, "--", label="validation")
plt.axvline(best, color="black", linestyle=":", label="selected epoch")
plt.xlabel("gradient steps"); plt.ylabel("mean squared loss / 2")
plt.legend(); plt.show()
```

```python-test
assert len(tr) == len(va) == len(nr) == 451
assert 0 <= best <= 450
assert np.isfinite(tr).all() and np.isfinite(va).all()
assert np.isfinite(nr).all() and np.isfinite(test_loss)
assert tr[1] < tr[0] and tr[-1] < tr[0]
assert best == int(np.argmin(va))
assert abs(va[best] - float(np.min(va))) < 1e-12
tr2, va2, nr2, best2, test2 = experiment()
assert np.array_equal(tr, tr2) and np.array_equal(va, va2)
assert np.array_equal(nr, nr2) and best == best2 and test_loss == test2
_, va3, _, _, _ = experiment(seed=2716)
assert not np.array_equal(va, va3)
_, _, nr4, _, _ = experiment(decay=0.2)
assert not np.array_equal(nr, nr4)
```

実行後はまず正則化係数0と0.2の重みノルムを比較し、次に学習率、雑音、乱数の初期化値を一つずつ変える。train/validation曲線が交差しなくても異常ではない。網の規模と乱数次第では明瞭な過学習は出ない。このラボは**全標本勾配でありdropoutは使わない**。dropoutの期待値は第5節の有限模型で別途検算した。

## 7. 演習

### ML2-15-A01 学習率の三つの領域

- Level: A

$J(w)=2w^2$、$w_0=1$ に対して学習率 $\eta=1/4,1/2,3/4$ を一つずつ使う。$w_1,w_2$ と極限挙動を求めよ。

<!-- solution-start -->
### 詳細解答

$J'(w)=4w$ なので $w_{t+1}=(1-4\eta)w_t$。[二次模型の閾値](#prop-ml2-15-quadratic-step)へ $a=4$ を代入する。

- $\eta=1/4$ では係数0で、$w_1=w_2=0$、以後0。
- $\eta=1/2$ では係数 $-1$ で、$w_1=-1,w_2=1$、収束しない。
- $\eta=3/4$ では係数 $-2$ で、$w_1=-2,w_2=4$、$|w_t|=2^t$ へ発散する。

いずれも勾配そのものは正しい。更新幅だけが異なる。
<!-- solution-end -->

### ML2-15-A02 結合型weight decay

- Level: A

$F(w,b)=(w-3)^2/2+(b-1)^2/2$、初期 $(w,b)=(2,0)$、$\eta=0.1,\lambda=0.5$ とする。罰則対象を $w$ だけとして一回更新せよ。

<!-- solution-start -->
### 詳細解答

$\partial_wF=w-3=-1$、$\partial_bF=b-1=-1$。$\lambda w=0.5\cdot2=1$ なので、[weight decayの定義](#def-ml2-15-weight-decay)へ代入すると

$$
w_1=2-0.1(-1+1)=2,\qquad b_1=0-0.1(-1)=0.1.
$$

重み勾配と罰則が相殺しただけで、最適化が停止したとは限らない。
<!-- solution-end -->

### ML2-15-A03 検証時刻の同点

- Level: A

時刻0から4の検証損失が $(0.6,0.3,0.2,0.2,0.4)$ だった。定義の同点規則で採用反復番号を求めよ。最小値0.2を独立テスト誤差と断言できるか。

<!-- solution-start -->
### 詳細解答

最小値0.2は時刻2と3で実現し、$\operatorname*{arg\,min}V_t=\{2,3\}$。したがって[early stoppingの定義](#def-ml2-15-early-stopping)により $\hat t=2$。時刻の選択に使った検証データは、選択後のモデルから独立ではない。したがって0.2を独立テスト誤差と断言できない。
<!-- solution-end -->

### ML2-15-A04 dropoutの一変数検算

- Level: A

$q=1/4$、$a=2,h=1,c=0$ のinverted dropoutで、学習時出力の分布、平均、分散、評価時出力を求めよ。

<!-- solution-start -->
### 詳細解答

maskは確率 $3/4$ で0、$1/4$ で4だから、学習時出力は確率 $3/4$ で0、$1/4$ で8になる。平均は $0(3/4)+8(1/4)=2$。二乗平均は $0+64(1/4)=16$ なので分散は $16-2^2=12$。評価時はmaskを外し $ah=2$。同じ値は[dropout期待損失命題](#prop-ml2-15-dropout-loss)の分散公式からも $((1-q)/q)(ah)^2=3\cdot4=12$ と得られる。
<!-- solution-end -->

### ML2-15-B01 非凸の停留点保証

- Level: B

$J$ が[非凸下降定理](#thm-ml2-15-nonconvex-descent)の仮定を満たし、$J(\theta_0)-J_{\inf}=6$、$L=3$、$\eta=1/3$ とする。$T=1200$ 反復の中に、勾配ノルムが高々何である時刻が存在するか。そこから大域最小点へ到達したと言えるか。

<!-- solution-start -->
### 詳細解答

学習率は $\eta=1/L$ で仮定を満たす。[定理の最小値評価](#thm-ml2-15-nonconvex-descent)から

$$
\min_{0\le t<1200}\|\nabla J(\theta_t)\|^2
\le \frac{2\cdot6}{(1/3)\cdot1200}=\frac3{100}.
$$

平方根を取れば、少なくとも一つの時刻で $\|\nabla J(\theta_t)\|\le\sqrt{3}/10$。非凸関数の停留点は大域最小点とは限らず、この不等式は零勾配の厳密達成さえ述べていない。
<!-- solution-end -->

### ML2-15-B02 dropoutの二特徴

- Level: B

$h=(1,2)$、$a=(2,-1)$、$c=1$、目標 $t=0$、保持確率 $q=1/2$、独立maskとする。評価時出力、学習時の出力分散、期待二乗損失を求めよ。maskの独立性を失った場合にどの項が増えるか。

<!-- solution-start -->
### 詳細解答

固定寄与は $v_1=a_1h_1=2$、$v_2=a_2h_2=-2$ だから評価時出力は $y=2-2+1=1$。分散は[期待損失命題](#prop-ml2-15-dropout-loss)より

$$
\operatorname{Var}(\tilde y)=\frac{1-q}{q}(v_1^2+v_2^2)
=1(4+4)=8.
$$

従って期待二乗損失は $(y-t)^2/2+\operatorname{Var}(\tilde y)/2=1/2+4=9/2$。独立性がなければ分散展開に

$$
2v_1v_2\operatorname{Cov}(M_1,M_2)
$$

が加わる。値は共分散の符号と大きさ次第で変わる。
<!-- solution-end -->

### ML2-15-B03 正則化係数と大域解

- Level: B

$F(w)=(w-3)^2/2$ と $P(w)=w^2/2$ に対し $\lambda=0,1,2$ の大域解、$P$ と $F$ の値を求める。さらにノルム比較の命題が成立する理由を式で説明せよ。

<!-- solution-start -->
### 詳細解答

$J'_\lambda(w)=(w-3)+\lambda w=(1+\lambda)w-3$、$J''_\lambda=1+\lambda>0$。従って唯一の大域解は $w_\lambda=3/(1+\lambda)$。代入結果は

| $\lambda$ | $w_\lambda$ | $P(w_\lambda)$ | $F(w_\lambda)$ |
|---|---:|---:|---:|
| 0 | 3 | $9/2$ | 0 |
| 1 | $3/2$ | $9/8$ | $9/8$ |
| 2 | 1 | $1/2$ | 2 |

係数が増えるとノルム費用は減り、経験損失は増える。[大域解比較命題](#prop-ml2-15-norm-order)は凸性よりも二つの大域最適性不等式を足して $F$ を消すことに依拠する。この例では二階微分正値で大域解の存在と一意性を直接確認した。
<!-- solution-end -->

### ML2-15-B04 観測するリスクと選択の情報

- Level: B

訓練から得た候補網 $\theta_0,\theta_1,\theta_2$ を同じ検証集合で比較し $\hat t$ を選ぶ。次にその検証集合をそのまま「未知データ性能」と報告する案と、完全に保留した独立テスト集合の平均損失を報告する案を比較せよ。後者にどの独立性・可積分性が必要かも述べよ。

<!-- solution-start -->
### 詳細解答

選択後の網 $\theta_{\hat t}$ は検証集合の損失を比較した結果であり、選択した最小値には[選択楽観性](../ML1-12/index.md#thm-ml1-12-selection-optimism)がある。検証標本を再び評価に使うと選択と評価が独立でない。

独立テスト集合 $((X_j,Y_j))_{j=1}^m$ が、訓練・検証・全ハイパーパラメータ選択手順と独立で、同一対象分布からi.i.d.に抽出され、選択網の損失が条件付き可積分であるとする。学習済み $\hat\theta$ を固定した条件付き期待値は

$$
\mathbb E\left[\left.\frac1m\sum_{j=1}^m\ell(f_{\hat\theta}(X_j),Y_j)\,\right|\,\hat\theta\right]
=\mathbb E_{(X,Y)}[\ell(f_{\hat\theta}(X),Y)\mid\hat\theta].
$$

これは[独立保留標本の条件付き不偏性](../ML1-12/index.md#thm-ml1-12-independent-holdout)の適用である。テストも繰り返し選択へ使えば、この前提が壊れる。
<!-- solution-end -->

### ML2-15-C01 正則化・学習率・検証の統合

- Level: C

二次模型の訓練損失 $F(w)=(w-2)^2/2$、罰則 $P(w)=w^2/2$、$w_0=0$ を考える。$\lambda=1$ とし、検証損失は $V(w)=(w-1)^2/2$。テスト標本はこの選択に使わない。

1. 正則化目的 $J_\lambda$ と勾配を求め、固定学習率で収束する必要十分条件を示せ。
2. $\eta=1/4$ で $w_t$ の閉式を求め、$t=0,1,2,3$ での訓練損失 $F$、正則化目的 $J_\lambda$、検証損失 $V$ を計算せよ。
3. 候補時刻を $\{0,1,2,3\}$ に限定したearly stoppingで時刻を選び、訓練目的を最小化する時刻とは異なるか説明せよ。
4. 同じ検証集合で $\eta$ や $\lambda$ まで何度も調整した場合、独立テスト評価をどう設計すべきか述べよ。

<!-- solution-start -->
### 詳細解答

1. 二つの二乗を展開すると

$$
J_1(w)=\frac12(w-2)^2+\frac12w^2
=w^2-2w+2=(w-1)^2+1.
$$

勾配は $J_1'(w)=2(w-1)$、更新は $w_{t+1}=(1-2\eta)w_t+2\eta$。誤差 $e_t=w_t-1$ は $e_{t+1}=(1-2\eta)e_t$ なので、$w_0\ne1$ に対して収束の必要十分条件は $|1-2\eta|<1$、すなわち $0<\eta<1$ である。[学習率閾値](#prop-ml2-15-quadratic-step)の $a=2$ に対応する。

2. $\eta=1/4$ では $e_0=-1$、$e_t=-2^{-t}$、よって $w_t=1-2^{-t}$。訓練損失 $F_t=(w_t-2)^2/2=(1+2^{-t})^2/2$、正則化目的 $J_t=1+4^{-t}$、検証損失 $V_t=4^{-t}/2$。具体的に

| 時刻 $t$ | $w_t$ | $F_t$ | $J_t$ | $V_t$ |
|---|---:|---:|---:|---:|
| 0 | 0 | 2 | 2 | $1/2$ |
| 1 | $1/2$ | $9/8$ | $5/4$ | $1/8$ |
| 2 | $3/4$ | $25/32$ | $17/16$ | $1/32$ |
| 3 | $7/8$ | $81/128$ | $65/64$ | $1/128$ |

3. ここでは $V_t$ も $F_t$ も各時刻で厳密に減少するので、候補の中ではどちらも時刻3を選ぶ。**early stoppingが必ず訓練目的と異なる時刻を選ぶわけではない**。逆転例が必要なら、第4節の[反例](#prop-ml2-15-early-counterexample)のように検証最適点が訓練最適点へ至る経路の途中にある設定に変える。

4. 検証集合で $\eta,\lambda,t$ を選ぶ工程全体を単一の学習アルゴリズムとして固定した後に、これまで一切見ていない独立テスト集合へ一度適用する。結果を見て再調整するなら、そのテスト集合は以後「未知データ」としては使えない。[独立保留標本の条件](../ML1-12/index.md#thm-ml1-12-independent-holdout)を保つには新たな独立評価集合または外側分割が必要になる。
<!-- solution-end -->

## 8. まとめと次への接続

深層網の最適化で下降保証が得られても、それは**訓練目的の値や勾配**の話である。weight decayは目的関数に重みの費用を加え、early stoppingは検証集合によって反復時刻を選び、dropoutは学習時に入力する特徴を確率的に変える。三者の作用機構は異なり、いずれも汎化性能改善の無条件な証明ではない。

次講 **ML2-16** では、重み共有がどのように構造上の制約となり、畳み込みの平行移動等変性へつながるかを調べる。
