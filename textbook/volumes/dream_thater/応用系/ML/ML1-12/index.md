# ML1-12 検証分割・交差検証・モデル選択

<!-- definition-example-audit: strict -->

## 1. なぜ訓練誤差では選べないのか

[経験リスク最小化](../ML1-03/index.md#def-ml1-03-erm)で係数を学び、[確率的勾配法](../ML1-10/index.md#def-ml1-10-sgd-algorithm)で計算し、[k近傍予測器](../ML1-11/index.md#def-ml1-11-knn-predictor)では近傍数を変更できるようになった。それでも、学習に使った同じ観測で設定を選べば、訓練標本への適合と未知の標本への予測能力は区別できない。

極端な例として、二値ラベルが公平な硬貨で決まるとする。常に0を予測する候補と常に1を予測する候補は、どちらも未知標本上の誤分類確率が $1/2$ である。しかし評価用のラベルを見てから一致する候補を選べば、その評価例への損失は必ず0になる。評価データが、いつの間にか選択の入力になったからである。

これを防ぐため、本講では **訓練（模型の当てはめ）→検証（設定の選択）→テスト（固定済みの手順の評価）** を分離する。一回の検証の不安定さを減らすK分割交差検証、選択手順まで外側で測る入れ子交差検証へ進む。

標本を $Z_i=(X_i,Y_i)$、$i=1,\ldots,n$（$n\ge3$）とし、全観測が同じ未知分布 $P$ に独立同分布で従うと仮定する。損失 $\ell$ は非負・可測で、使用する期待値は有限とする。[母集団リスク](../ML1-01/index.md#def-ml1-01-risks)を

$$
R_P(h)=\mathbb E_{(X,Y)\sim P}[\ell(h(X),Y)]
$$

と書く。右辺の観測は学習標本から独立な新しい標本である。この独立性こそ後の定理の根拠である。

## 2. データを使う三つの役割

学習算法 $\mathcal A_\lambda$ は訓練標本から予測器 $h_{\lambda,T}$ を作る手順である。$\lambda$ は正則化係数や近傍数のような、学習算法を動かす前に決める **ハイパーパラメータ** を表す。乱数を使う算法は、その乱数も評価標本と独立に生成するものとする。

<a id="def-ml1-12-three-way-split"></a>

<!-- formal-statement-start -->
> **定義（訓練・検証・テスト分割）**  
> $n\ge3$ の観測添字 $\{1,\ldots,n\}$ を互いに交わらない非空集合 $T,V,U$ に分割し、$T\cup V\cup U=\{1,\ldots,n\}$ とする。分割は観測値を見ずに固定するか、観測と独立な乱数で決める。$D_T=(Z_i)_{i\in T}$ は訓練集合、$D_V=(Z_i)_{i\in V}$ は検証集合、$D_U=(Z_i)_{i\in U}$ はテスト集合である。模型の当てはめに $T$、模型・設定の選択に $V$ を使い、選択済みの手順を固定した後で初めて $U$ を評価する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-12-three-way-split -->
**定義の確認**。6観測で $T=\{1,2,3\}$、$V=\{4,5\}$、$U=\{6\}$ とすれば、三集合は非空で互いに交わらず、和集合は全6添字である。分割をラベルの観測前に定めたので、独立同分布仮定の下では訓練・検証・テストの観測も相互に独立となる。第6観測を見て設定を変更するのは、テストの役割に反する。
<!-- definition-example-end -->

<a id="def-ml1-12-validation-selection"></a>

<!-- formal-statement-start -->
> **定義（検証損失によるモデル選択）**  
> [三分割](#def-ml1-12-three-way-split)と有限非空な設定集合 $\Lambda=\{\lambda_1,\ldots,\lambda_M\}$ を固定する。各設定値の予測器は $h_{\lambda,T}=\mathcal A_\lambda(D_T)$ とし、検証損失を

$$
\widehat R_V(h_{\lambda,T})
=\frac1{|V|}\sum_{i\in V}\ell(h_{\lambda,T}(X_i),Y_i)
$$

> とする。$\widehat\lambda$ は検証損失を最小にする設定値のうち予め定めた順序で最初のものとする。選択済み予測器のテスト損失を

$$
\widehat R_U(h_{\widehat\lambda,T})
=\frac1{|U|}\sum_{i\in U}\ell(h_{\widehat\lambda,T}(X_i),Y_i)
$$

> とする。$U$ を $\widehat\lambda$ の選択に使用しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-12-validation-selection -->
**定義の確認**。二つの検証ラベル $(0,1)$ に対し、定数予測器 $h_0=0,h_1=1$ の0–1損失はそれぞれ $(0+1)/2=1/2$、$(1+0)/2=1/2$。列挙順を $(0,1)$ とすれば同点規則で $h_0$ を選ぶ。独立なテストラベルが1ならテスト損失は1となる。この値を見て $h_1$ へ切り替えることは許されない。
<!-- definition-example-end -->

設定値を検証で選んだ後、訓練集合と検証集合を合わせて **再学習** する場合もある。そのとき作る予測器は先ほどの $h_{\widehat\lambda,T}$ とは別物なので、再学習済み予測器を固定してから独立テストで測る。テストの結果を見て再度設定を変更したなら、同じテストは独立評価の根拠に使えない。

## 3. 保留標本の不偏性はどこから来るか

評価標本の平均損失が母集団リスクを推定できるのは、予測器を作る過程にその評価標本が入っていない場合である。添字が異なるだけでは、情報の独立性を保証しない。

<a id="thm-ml1-12-independent-holdout"></a>

<!-- formal-statement-start -->
> **定理（独立保留標本の条件付き不偏性）**  
> $Z_1,\ldots,Z_n$ が $P$ から独立同分布に従い、非空添字集合 $V$ は標本値と独立に固定されるとする。予測器 $H$ は $V$ 以外の標本と、全評価標本から独立な算法乱数だけから作られ、$D_V$ と独立と仮定する。損失が可積分なら

$$
\mathbb E[\widehat R_V(H)\mid H]=R_P(H).
$$

> 訓練・検証に基づく選択を全て終えた後の予測器について、独立なテスト集合にも同じ式が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[母集団リスク](../ML1-01/index.md#def-ml1-01-risks)は新しい観測での平均損失である。評価集合が $H$ と独立だから、$H$ を固定すると評価項の期待値が全て同じ母集団リスクになる。最後は有限和の線形性を使う。

<!-- proof-start -->
### 証明

$m=|V|\ge1$ とする。$i\in V$ の $Z_i$ は $H$ と独立に分布 $P$ に従うので、$H=h$ を固定すれば

$$
\mathbb E[\ell(H(X_i),Y_i)\mid H=h]
=\int\ell(h(x),y)\,P(dx,dy)=R_P(h).
$$

従って可積分性と条件付き期待値の線形性により

$$
\begin{aligned}
\mathbb E[\widehat R_V(H)\mid H]
&=\frac1m\sum_{i\in V}\mathbb E[\ell(H(X_i),Y_i)\mid H]\\
&=\frac1m\sum_{i\in V}R_P(H)=R_P(H).
\end{aligned}
$$

テスト集合 $U$ の場合、選択と当てはめを完了した予測器は $T,V$ と算法乱数の関数であり、$U$ と独立だから全く同じ計算を適用できる。$\square$
<!-- proof-end -->

ここで示したのは**固定された一つの予測器**の条件付き不偏性である。[ERMの母集団リスク比較](../ML1-03/index.md#prop-ml1-03-erm-comparison)にある全候補の同時偏差が小さいことや、選択後の最小検証損失が不偏であることは主張していない。

## 4. 検証で最良だった数字は楽観的になる

検証集合への偶然の当たり方も考慮してモデルを選ぶと、選択した候補の最小検証損失をそのまま汎化性能と読むことはできない。その仕組みを期待値の不等式として確認する。

<a id="thm-ml1-12-selection-optimism"></a>

<!-- formal-statement-start -->
> **定理（選択された検証最小値の楽観性）**  
> 有限個の候補 $h_1,\ldots,h_M$ は共通の検証標本 $D_V$ と独立に、訓練標本および独立な算法乱数から作られたとする。全損失の期待値は有限とし、検証損失の最小番号を $J$ とする。このとき、候補を固定した条件付き期待値について

$$
\mathbb E\left[\min_j\widehat R_V(h_j)\mid h_1,\ldots,h_M\right]
\le\min_jR_P(h_j)
\le\mathbb E\left[R_P(h_J)\mid h_1,\ldots,h_M\right].
$$

> 等号になる場合もあり、必ず厳密な不等号になるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

「最小を取った後で平均する」と「平均してから最小を取る」の順を比較する。選択した候補の真のリスクは、その候補集合の最小リスクより低くならない。

<!-- proof-start -->
### 証明

候補全体を固定し、$L_j=\widehat R_V(h_j)$、$r_j=R_P(h_j)$ と書く。各 $j$ について $\min_kL_k\le L_j$ だから、[独立保留標本の不偏性](#thm-ml1-12-independent-holdout)と期待値の単調性により

$$
\mathbb E[\min_kL_k\mid h_1,\ldots,h_M]
\le\mathbb E[L_j\mid h_1,\ldots,h_M]=r_j.
$$

これが全ての $j$ で成立するため、左辺は $\min_j r_j$ 以下である。選ばれた $J$ は検証標本に依存しても、その結果ごとに $r_J\ge\min_jr_j$ なので、条件付き期待値を取って第二不等式を得る。$\square$
<!-- proof-end -->

**厳密な反例**。公平な二値ラベル $Y$ に対して、常に0を返す $h_0$ と常に1を返す $h_1$ を比較する。0–1損失の検証標本が一観測なら、そのラベルに一致する候補の損失は常に0なので、検証最小値も0。一方でどちらの候補の母集団リスクも $1/2$ である。従って

$$
\mathbb E[\min(\widehat R_V(h_0),\widehat R_V(h_1))]
=0<\frac12=\mathbb E[R_P(h_J)].
$$

この問題は候補の数だけでは決まらず、候補と評価集合の関係に依存する。設定候補を検証データで何度も比較するほど、検証データに偶然合う候補を拾う機会は増え得る。ここで別の独立なテストが必要になる。

## 5. K分割交差検証：検証役を持ち回る

一つの検証集合だけで判断すると、分割の偶然に左右されやすい。訓練部分集合を順番に入れ替え、全ての観測を一回ずつ保留評価へ使う方法が交差検証である。各回の予測器は、その回の訓練集合で **学習し直す**。特に乱数を使う算法では、評価折の情報から乱数・停止条件を決めてはならない。

<a id="def-ml1-12-kfold"></a>

<!-- formal-statement-start -->
> **定義（K分割交差検証）**  
> 独立同分布な $n$ 観測と整数 $2\le K\le n$、固定した設定値 $\lambda$ を考える。添字を、標本値に依存しない非空な $K$ 個の折 $F_1,\ldots,F_K$ に分割する。第 $r$ 回には $F_r$ を保留し、それ以外の観測で $h_{\lambda,-r}=\mathcal A_\lambda((Z_i)_{i\notin F_r})$ を学習する。交差検証損失を

$$
\widehat R_{\mathrm{CV},K}(\lambda)
=\frac1n\sum_{r=1}^K\sum_{i\in F_r}
\ell(h_{\lambda,-r}(X_i),Y_i)
$$

> とする。各回の算法乱数は評価折と独立に生成する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-12-kfold -->
**定義の確認**。$n=6,K=3$、$F_1=\{1,2\}$、$F_2=\{3,4\}$、$F_3=\{5,6\}$ は空でなく互いに交わらず、6添字を全て覆う。各回の訓練サイズは4、検証サイズは2である。各折の損失が $(0,1),(0,0),(1,0)$ なら全6観測の損失和は2、交差検証値は $2/6=1/3$。設定値を変えれば、この全手順を設定値ごとにやり直して比較する。
<!-- definition-example-end -->

<a id="thm-ml1-12-cv-target"></a>

<!-- formal-statement-start -->
> **定理（固定設定値のCVが推定する訓練サイズ）**  
> [K分割交差検証](#def-ml1-12-kfold)において、算法 $\mathcal A_\lambda$ は $m$ 個の独立同分布訓練観測とそれに独立な算法乱数から予測器を作り、損失は可積分とする。$\mathcal R_m(\mathcal A_\lambda)$ を、この算法を $m$ 観測で訓練し、新しい独立な一観測で測った期待損失とする。このとき

$$
\mathbb E[\widehat R_{\mathrm{CV},K}(\lambda)]
=\frac1n\sum_{r=1}^K|F_r|\,
\mathcal R_{n-|F_r|}(\mathcal A_\lambda).
$$

> 全折が等サイズ $q=n/K$ の場合、右辺は $\mathcal R_{n-q}(\mathcal A_\lambda)$ である。一般に $n$ 件で学習した算法の期待リスクとは一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

第 $r$ 回で訓練に使った $n-|F_r|$ 件と、保留した $|F_r|$ 件は独立である。各保留項の期待値は、その訓練サイズでの算法の期待リスクになる。折ごとに評価件数だけ重みを付けて足す。

<!-- proof-start -->
### 証明

$r$ を固定し、$H_r=h_{\lambda,-r}$ とおく。$i\in F_r$ の観測 $Z_i$ と $H_r$ は独立なので、[独立保留標本の定理](#thm-ml1-12-independent-holdout)から

$$
\mathbb E[\ell(H_r(X_i),Y_i)\mid H_r]=R_P(H_r).
$$

訓練観測が $n-|F_r|$ 件であるから、さらに期待値を取ると

$$
\mathbb E[\ell(H_r(X_i),Y_i)]
=\mathbb E[R_P(H_r)]
=\mathcal R_{n-|F_r|}(\mathcal A_\lambda).
$$

よって

$$
\begin{aligned}
\mathbb E[\widehat R_{\mathrm{CV},K}(\lambda)]
&=\frac1n\sum_{r=1}^K\sum_{i\in F_r}
\mathbb E[\ell(H_r(X_i),Y_i)]\\
&=\frac1n\sum_{r=1}^K|F_r|\,
\mathcal R_{n-|F_r|}(\mathcal A_\lambda).
\end{aligned}
$$

全ての $|F_r|=q$ なら $n=Kq$ より係数の和は1になり、結論を得る。$\square$
<!-- proof-end -->

折ごとの学習集合は重なるので、各折の評価損失を互いに独立とはみなせない。期待値の線形性はこの重なりに影響されないが、分散や標準誤差の計算では注意が要る。またCV値を最小にした設定値を選び、その**最小CV値**を選択手順の独立な性能評価とすることもできない。

## 6. 入れ子交差検証：選択手順そのものを評価する

交差検証の内部で候補を選ぶなら、その選択を含む手順の外側に更なる評価を置く。外側の訓練集合とは、その折で保留していない全観測である。内側の選択では外側の保留折に触れない。

<a id="def-ml1-12-nested-cv"></a>

<!-- formal-statement-start -->
> **定義（入れ子交差検証）**  
> 独立同分布な $n$ 観測を、値と独立な外側の非空な $K\ge2$ 折 $O_1,\ldots,O_K$ に分ける。第 $r$ 外側反復では、その外側訓練 $n-|O_r|$ 件だけから内側 $L$ 分割交差検証（$2\le L\le n-|O_r|$）を行い設定値 $\widehat\lambda_{-r}$ を選ぶ。選択した設定値で外側訓練全件から予測器 $H_{-r}$ を再学習し、外側保留折だけを評価する。全外側損失を

$$
\widehat R_{\mathrm{nested}}
=\frac1n\sum_{r=1}^K\sum_{i\in O_r}
\ell(H_{-r}(X_i),Y_i)
$$

> とする。前処理・内側分割・設定選択・再学習はすべて外側訓練観測と独立な算法乱数のみで実施する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-12-nested-cv -->
**定義の確認**。9観測を外側3折 $O_1=\{1,2,3\}$、$O_2=\{4,5,6\}$、$O_3=\{7,8,9\}$ に分ける。第1反復では番号4～9の6件のみから内側3折を作り、それぞれ4件学習・2件検証する。内側で選択した設定値を用い、番号4～9の6件で改めて学習し直し、番号1～3の3件だけで評価する。残りの外側反復も同様で、全観測が外側の評価にちょうど一回現れる。
<!-- definition-example-end -->

<a id="prop-ml1-12-nested-evaluation"></a>

<!-- formal-statement-start -->
> **命題（入れ子CVの評価対象）**  
> [入れ子交差検証](#def-ml1-12-nested-cv)において、内側CVによる設定選択、前処理、外側訓練全件での再学習をまとめた算法を $\mathcal B$ と書く。独立同分布標本・算法乱数の独立性・損失の可積分性を仮定する。このとき

$$
\mathbb E[\widehat R_{\mathrm{nested}}]
=\frac1n\sum_{r=1}^K|O_r|\,
\mathcal R_{n-|O_r|}(\mathcal B).
$$

> 等サイズ外側折では、外側訓練サイズで実行する**選択込み算法**の期待リスクを推定する。
<!-- formal-statement-end -->

### 証明の見取り図

外側保留折は内側の設定選択にも前処理にも使われない。外側から見れば、どれほど複雑な選択でも一つの学習算法 $\mathcal B$ が予測器を返したにすぎない。[CVの期待値の計算](#thm-ml1-12-cv-target)をその算法に対して使う。

<!-- proof-start -->
### 証明

第 $r$ 外側反復の $H_{-r}$ は外側訓練集合と独立な算法乱数から作るので、$i\in O_r$ の $Z_i$ と独立である。[独立保留標本の定理](#thm-ml1-12-independent-holdout)により

$$
\mathbb E[\ell(H_{-r}(X_i),Y_i)\mid H_{-r}]=R_P(H_{-r}).
$$

算法 $\mathcal B$ が学習する観測数は $n-|O_r|$ なので、右辺をさらに期待すると $\mathcal R_{n-|O_r|}(\mathcal B)$ となる。これを $|O_r|$ 個の保留項について足し、全件数 $n$ で割ると所望の式となる。$\square$
<!-- proof-end -->

入れ子CVは、外側の訓練サイズで動く選択込み算法を評価する。これを、全 $n$ 件で最後に訓練した特定の予測器の母集団リスクについての厳密な不偏推定量と同一視してはならない。最終予測器の未使用データ上の性能が重要なら、配備時の条件に対応した独立テスト集合を別途確保する。

## 7. データ漏洩は前処理にも潜む

標準化、欠測補完、特徴選択などを分割前に全データへ当てはめると、テスト入力やラベルを使ってしまうことがある。**前処理も学習の一部**とみなし、各CVの訓練折にだけ統計量を当てはめ、その変換を保留折へ適用する。内側CVでは内側訓練折、外側CVの再学習では外側訓練全体から前処理パラメータを求める。

<a id="prop-ml1-12-leakage-counterexample"></a>

<!-- formal-statement-start -->
> **命題（評価ラベルを用いた選択は独立評価でない：反例）**  
> 入力を定数、二値ラベルを確率 $1/2$ ずつ0・1とし、二候補 $h_0=0,h_1=1$ と0–1損失を考える。一観測の評価ラベル $Y$ を見て一致する候補 $h_Y$ を選ぶと、その観測での損失は必ず0だが、独立な新しい一観測での期待損失は $1/2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

評価ラベルが0なら $h_0$、1なら $h_1$ が選ばれ、元のラベルには必ず一致する。独立なラベルには一致確率 $1/2$ に戻る。

<!-- proof-start -->
### 証明

選択済み $h_Y$ の元の損失は $\mathbf 1_{\{Y\ne Y\}}=0$。独立なラベル $Y'$ について

$$
\Pr(Y\ne Y')=\Pr(Y=0,Y'=1)+\Pr(Y=1,Y'=0)
=\frac14+\frac14=\frac12.
$$

選択済み予測器が評価ラベルの関数だから、[保留標本の定理](#thm-ml1-12-independent-holdout)の独立性仮定は失われる。$\square$
<!-- proof-end -->

**ラベルを使わない中心化でも問題は起こる**。訓練入力 $0,2$、テスト入力 $100$ のとき、訓練平均は $(0+2)/2=1$ で、訓練平均で中心化したテスト入力は $99$ である。全入力を混ぜた平均は $(0+2+100)/3=34$ となり、中心化したテスト入力は $66$ に変わる。前処理にテスト側の値を使ったため、評価している手順が変わってしまった。**全データで中心化すれば必ず誤差が楽観的になる、という主張ではない**。

時系列の未来と過去、同一患者の繰返し測定、近接地点の観測などでは、観測番号が違うだけでは独立とは言えない。時間順や患者単位等、実際の配備状況に合わせた分割を設計する必要がある。その場合はこの章の独立同分布の定理を前提なしに適用しない。

## 8. 計算ラボ：固定分割・CV・未使用テスト

Pythonの標準機能だけで実際のデータを生成し、検証とCVの誤分類率を手で実装する。乱数種は314159。$X$ は区間 $[0,1]$ の一様分布、ラベルは $X\ge0.5$ で1、そうでなければ0にし、独立な確率0.1で反転する。訓練36件、検証12件、テスト24件を先に分割する。候補は定数0、定数1、訓練多数派、閾値0.3、閾値0.7である。各折の多数派は必ずその折の訓練データから学習する。テストラベルをモデル選択へ渡さない。

~~~python-lab
# lab-id: ml1-12-cross-validation
# lab-title: ホールドアウト・3-fold CV・独立テスト
# lab-mode: demo
# timeout-ms: 10000
import random
rng = random.Random(314159)

def draw():
    x = rng.random()
    y = int(x >= 0.5)
    if rng.random() < 0.1:
        y = 1 - y
    return (x, y)

data = [draw() for _ in range(72)]
train, valid, test = data[:36], data[36:48], data[48:]
names = ("zero", "one", "majority", "threshold-0.3", "threshold-0.7")

def fit(name, samples):
    if name == "majority":
        rate = sum(y for _, y in samples) / len(samples)
        return lambda x: int(rate > 0.5)
    if name == "zero":
        return lambda x: 0
    if name == "one":
        return lambda x: 1
    threshold = 0.3 if name == "threshold-0.3" else 0.7
    return lambda x: int(x >= threshold)

def risk(model, samples):
    return sum(model(x) != y for x, y in samples) / len(samples)

folds = [tuple(range(r, 36, 3)) for r in range(3)]
def cv_score(name):
    errors = 0
    for fold in folds:
        held = set(fold)
        fit_samples = [train[i] for i in range(36) if i not in held]
        eval_samples = [train[i] for i in fold]
        model = fit(name, fit_samples)
        errors += sum(model(x) != y for x, y in eval_samples)
    return errors / len(train)

holdout = {name: risk(fit(name, train), valid) for name in names}
crossval = {name: cv_score(name) for name in names}
selected_holdout = min(names, key=lambda s: (holdout[s], names.index(s)))
selected_cv = min(names, key=lambda s: (crossval[s], names.index(s)))
print("validation:", holdout, "choice:", selected_holdout)
print("3-fold CV:", crossval, "choice:", selected_cv)
for label, name in (("validation", selected_holdout), ("CV", selected_cv)):
    final_model = fit(name, train + valid)
    print(label, "independent test:", risk(final_model, test))
~~~

~~~python-solution
# demoモードの完成コードは上のセル全体。
# 乱数種と候補を変更しても、テストの結果を設定選択へ戻さない。
~~~

~~~python-test
assert len(train) == 36 and len(valid) == 12 and len(test) == 24
assert [len(f) for f in folds] == [12, 12, 12]
assert sorted(i for fold in folds for i in fold) == list(range(36))
assert all(0 <= holdout[name] <= 1 for name in names)
assert all(0 <= crossval[name] <= 1 for name in names)
assert selected_holdout in names and selected_cv in names
assert abs(cv_score("zero") - sum(y for _, y in train)/36) < 1e-12
assert abs(cv_score("one") - (1 - sum(y for _, y in train)/36)) < 1e-12
~~~

最終テストは24件しかないので、たまたま選ばれた候補が一度よく当たっただけで一般的な優劣は確定できない。乱数種を繰り返して試す場合も、テストで良かった試行だけを選んで報告すると新たな選択バイアスが生じる。

## 演習

### ML1-12-A01 三分割を確かめる
- Level: A

$n=10$ の観測で $T=\{1,\ldots,6\}$、$V=\{7,8\}$、$U=\{9,10\}$ とする。[三分割](#def-ml1-12-three-way-split)の集合条件を検証し、$U$ を見てから設定を選ぶと何が壊れるか述べよ。

<!-- solution-start -->
#### 詳細解答

各集合はそれぞれ6件、2件、2件で全て非空である。添字範囲が重ならないから、どの二集合の交わりも空となり、和集合は $\{1,\ldots,10\}$。また値を見る前に固定すれば分割の独立性条件も成立する。$U$ のラベルを選択に使うと、選択済み予測器が $U$ の関数となり、[保留標本の条件付き不偏性](#thm-ml1-12-independent-holdout)が要求する評価標本と予測器の独立性を保証できない。
<!-- solution-end -->

### ML1-12-A02 検証損失の計算
- Level: A

二つの検証ラベルが $(0,1)$、候補 $a,b,c$ の二つの予測が順に $(0,0),(1,1),(0,1)$ である。0–1損失で各候補の検証平均損失を求め、最小候補を選べ。

<!-- solution-start -->
#### 詳細解答

候補 $a$ は第1観測だけ正答し、平均損失は $(0+1)/2=1/2$。候補 $b$ は第2観測だけ正答し、$(1+0)/2=1/2$。候補 $c$ は両方に正答し、$(0+0)/2=0$。[検証損失選択](#def-ml1-12-validation-selection)では $0<1/2$ なので $c$ が唯一の最小候補となる。
<!-- solution-end -->

### ML1-12-A03 不等サイズの折
- Level: A

6件を3折に分割し、折サイズを $2,3,1$、各折の平均損失を $0,1/3,1$ とする。観測ごとに等重みを与える[CV値](#def-ml1-12-kfold)と、折平均の単純平均を求めて比較せよ。

<!-- solution-start -->
#### 詳細解答

折ごとの損失和は $2\cdot0=0$、$3\cdot(1/3)=1$、$1\cdot1=1$。したがって全6件で割るCV値は $(0+1+1)/6=1/3$。折平均の単純平均は $(0+1/3+1)/3=4/9$ となる。$1/3\ne4/9$ なのは、後者で1件の折と3件の折へ等しい重みを付けたためである。
<!-- solution-end -->

### ML1-12-A04 中心化の情報漏洩
- Level: A

訓練入力 $0,2$、テスト入力 $100$ とする。訓練平均だけで中心化したテスト値と、全入力を混ぜた平均で中心化したテスト値を求め、通常の独立テストに適するのはどちらか答えよ。

<!-- solution-start -->
#### 詳細解答

訓練平均は $(0+2)/2=1$ なので、テスト入力の変換は $100-1=99$。全入力の平均は $(0+2+100)/3=34$ なので、変換は $100-34=66$。独立テスト手順では訓練側で前処理の平均を固定してから未知の入力へ適用するため、99が適切である。66は評価入力を用いて前処理を当てはめ直した結果であり、学習側だけで変換を決めるという前提を失っている。
<!-- solution-end -->

### ML1-12-B01 最小検証損失の楽観性
- Level: B

公平な二値ラベルの検証一観測から、定数予測器 $h_0=0$ と $h_1=1$ の損失が小さい方を選ぶ。検証最小値の期待値と、独立な新しい観測に対する選択済み予測器の期待損失をそれぞれ求めよ。

<!-- solution-start -->
#### 詳細解答

検証ラベル0なら $h_0$ の損失が0、$h_1$ の損失が1である。検証ラベル1なら順序が逆になる。どちらの場合も検証最小損失は0なので、期待値も0。一方、新しい独立ラベルと検証ラベルの一致確率は $1/4+1/4=1/2$、不一致確率も $1/2$。選択済み予測器は検証ラベルをそのまま出すので、その独立新観測への期待0–1損失は $1/2$。[選択の楽観性](#thm-ml1-12-selection-optimism)の厳密な場合となる。
<!-- solution-end -->

### ML1-12-B02 条件付き不偏性の再導出
- Level: B

訓練標本と独立な検証3件に対し、訓練のみから作った予測器 $H$ の損失を $L_1,L_2,L_3$ とする。$\mathbb E[L_i\mid H]=r(H)$ と仮定して平均損失の条件付き期待値を導出せよ。検証を見てから $H$ を選ぶと何が変わるか示せ。

<!-- solution-start -->
#### 詳細解答

平均損失を $\widehat r=(L_1+L_2+L_3)/3$ とおけば、可積分性と条件付き期待値の線形性から

$$
\mathbb E[\widehat r\mid H]
=\frac13\sum_{i=1}^3\mathbb E[L_i\mid H]
=\frac13(3r(H))=r(H).
$$

ここで各項を $r(H)$ に置換できたのは、検証観測と $H$ が独立で、検証観測の条件付き分布が元の $P$ のままであるためである。検証観測から $H$ を選べばこの独立性が破れ、一般には $\mathbb E[L_i\mid H]=r(H)$ と言えない。線形性自体は失われない。
<!-- solution-end -->

### ML1-12-B03 CVが測る訓練サイズ
- Level: B

$n=12,K=4$ の等サイズ交差検証を行う。固定算法の独立新標本上の期待リスクが訓練件数 $m$ に対し $\mathcal R_m=1/(m+1)$ だとする。CV値の期待値と、12件を用いた算法の期待リスクを比較せよ。

<!-- solution-start -->
#### 詳細解答

一折のサイズは $12/4=3$、各回の訓練サイズは $12-3=9$。[CVの評価対象](#thm-ml1-12-cv-target)を使うと期待CV値は $\mathcal R_9=1/(9+1)=1/10$ である。一方で12件で学習した算法の期待リスクは $\mathcal R_{12}=1/(12+1)=1/13$。$1/10>1/13$ だから一致しない。これは候補選択による楽観性とは別の、訓練件数の差の効果である。
<!-- solution-end -->

### ML1-12-B04 入れ子CVと前処理
- Level: B

9件の標本に外側3-fold、各外側訓練に内側3-foldを行う。内側訓練サイズ、内側検証サイズ、外側再学習サイズ、外側評価サイズを答えよ。外側評価ラベルを使った特徴選択がなぜ許されないか述べよ。

<!-- solution-start -->
#### 詳細解答

外側の評価サイズは $9/3=3$、外側訓練は $9-3=6$ 件である。内側一折は $6/3=2$ 件を検証、$6-2=4$ 件を訓練とする。内側で選択した後は外側訓練6件で再学習する。[入れ子CVの定義](#def-ml1-12-nested-cv)では外側評価を手順から遮断するので、外側評価のラベルを使った特徴選択は $H_{-r}$ を外側評価データに依存させ、[評価対象の命題](#prop-ml1-12-nested-evaluation)の独立性仮定を壊す。
<!-- solution-end -->

