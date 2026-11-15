# U3-49 シナリオ Monte Carlo と full repricing

[U3-48 の Historical Simulation](../U3-48/index.md#def-u3-48-hs) では、実際に観測した変化を現在のポジションへ再適用しました。しかし履歴に存在しない二つの因子の組合せは、そのままでは発生しません。[U3-47 の分散共分散法](../U3-47/index.md#def-u3-47-linear-loss)は因子変化に対して損失を線形に近似しますが、オプションのような曲がった価格関数では大きいショックへの応答を取り逃がします。

この講義では、**予測用の実確率 $P$ から複数因子の将来状態を発生させ、その各状態で現在保有する商品を最初から評価し直す**方法を構成します。確率的なシナリオを増やすことと、各シナリオの評価計算を正しくすることは別の課題です。

## 1. 何を固定し、何をランダムにするか

時点 $t$ に保有数量、リスク因子の現在値、評価モデルとそのパラメータを確定します。保有期間は $h>0$、将来時点は $t+h$ とします。

将来因子の条件付き分布を考える際、状態は次の集合に属するとします。

$$
X_{t+h}\in D\subseteq\mathbb R^d.
$$

ここで $D$ は価格評価関数の定義域です。将来状態を発生させる法則は、[U3-44 の実確率と評価測度の区別](../U3-44/index.md#def-u3-44-p-q)に従い、損失を予測する実確率 $P$ のモデルです。

各シナリオのオプション評価には、採用した価格付けモデルの $Q$ による評価を行ってよく、シナリオを発生させる頻度まで $Q$ に置き換えるわけではありません。

ここで $\mathcal F_t$ は時点 $t$ までに利用できる情報、$\theta_t$ はその情報だけで決める予測パラメータです。乱数を状態へ変換する写像 $G_{\theta_t}$ の「可測」とは、変換後の状態についても確率的な事象を定められるという条件です。この条件は、[U3-44 の全再評価で使う可測性](../U3-44/index.md#def-u3-44-full-revaluation)と同様、損失分布を扱うために必要です。入力乱数の分布 $H$ と、出力の条件付き $P$ 分布は、写像を通して対応付けます。

<a id="def-u3-49-scenario-mc"></a>

<!-- formal-statement-start -->
> **定義（条件付きシナリオ Monte Carlo）**  
> 時点 $t$ で利用できる情報を $\mathcal F_t$ とする。$\mathcal F_t$ で決まるパラメータ $\theta_t$ と可測写像 $G_{\theta_t}:\mathbb R^k\to D$ を指定し、条件付きで独立同分布な乱数 $Z^{(1)},\ldots,Z^{(M)}$ を発生させる。各乱数の法則があらかじめ指定した分布 $H$ で、将来因子の条件付き $P$ モデルが $G_{\theta_t}(Z)$ の法則であると仮定するとき、
>
$$
X^{(j)}_{t+h}=G_{\theta_t}(Z^{(j)}),\qquad j=1,\ldots,M
$$
>
> を条件付きシナリオ Monte Carlo 標本とする。ここで整数 $M\ge1$ とし、シナリオ生成前に $\theta_t$ と写像を固定する。
<!-- formal-statement-end -->

条件付き独立とは、予測を固定した時点で各試行が別の乱数を使うことです。将来の実現値で $\theta_t$ を調整するのは予測ではありません。モデル内の因子間相関と、**別々の試行を独立に発生させること**も別物です。一つの試行内では因子が相関してよく、別の試行どうしは独立に発生させます。

<!-- definition-example-start: def-u3-49-scenario-mc -->
**定義の確認**：状態空間を $D=\mathbb R^2$、乱数の次元を $k=2$ とし、$H$ は独立な標準正規の組の分布とします。写像は次の恒等写像です。

$$
G(z_1,z_2)=(z_1,z_2).
$$

各試行 $j$ に別々の独立な $H$ 分布の入力 $Z^{(j)}$ を使うと、恒等写像による出力 $X^{(j)}=G(Z^{(j)})=Z^{(j)}$ も同じ $H$ 分布に従い、試行間で独立です。これは写像の性質と入力の独立性から確かめる条件であり、実現した3点の並びだけから独立性を判定するものではありません。

固定した $M=3$ 組の標本値として $((1,0),(0,1),(-1,0))$ を考えます。写像は可測で、出力は必ず $D$ に属します。

正規乱数は連続分布なので、特定の数値を**正確に**引く確率は0ですが、その近傍は正の確率を持ちます。標本値を例示することと、3点の等確率分布を元の連続 $P$ 分布そのものと取り違えることは別です。
<!-- definition-example-end -->

## 2. 多因子モデル：相関をどう入れるか

株価と金利を独立に発生させると、両者が同時に動くリスクを誤って評価しかねません。そこで [U3-47 の多変量正規因子モデル](../U3-47/index.md#def-u3-47-normal-factor)を使い、**生成に用いる標準正規ショック間の相関**を $\rho$ と指定します。相関係数は共分散を二つの標準偏差の積で割った値です。ただし、$\rho$ は指数変換後の株価水準 $S_{t+h}$ と金利水準 $r_{t+h}$ 自体の相関係数とは一般に一致しません。どちらかの因子が定数になる場合、その因子と他方の相関係数は定義されません。

<a id="def-u3-49-two-factor"></a>

<!-- formal-statement-start -->
> **定義（株価と短期金利の二因子 P シナリオ）**  
> 現在株価 $S_t>0$、現在金利 $r_t\in\mathbb R$、期間の年数 $h>0$、$P$ 下の株価ドリフト $\mu\in\mathbb R$、株価変動率 $\sigma_S\ge0$、金利の平均変化率 $b\in\mathbb R$、金利変動率 $\sigma_r\ge0$ と相関 $\rho\in[-1,1]$ を時点 $t$ で固定する。独立な標準正規乱数 $Z_1,Z_2$ から
>
$$
U=Z_1,\qquad W=\rho Z_1+\sqrt{1-\rho^2}\,Z_2
$$
>
> を作り、期間末の因子を
>
$$
S_{t+h}=S_t\exp\!\left((\mu-\sigma_S^2/2)h+\sigma_S\sqrt h\,U\right),
$$
>
$$
r_{t+h}=r_t+bh+\sigma_r\sqrt h\,W
$$
>
> と指定する。これは条件付きの一期間 $P$ モデルであり、金利モデルが無裁定モデルであることを主張しない。
<!-- formal-statement-end -->

株価には指数関数を使うため $S_{t+h}>0$ となります。金利は負になり得ますが、実数金利を受け付ける評価関数を使います。モデル変動率と価格付けに使うオプションの変動率は、役割が異なるため同一とは仮定しません。

<a id="prop-u3-49-correlation"></a>

<!-- formal-statement-start -->
> **命題（二因子の共分散と退化相関）**  
> [二因子モデル](#def-u3-49-two-factor)で $Z_1,Z_2$ が独立標準正規なら、$U,W$ は平均0、分散1で、共分散は次の値をとる。

$$
\operatorname{Cov}(U,W)=\rho.
$$

> $|\rho|=1$ では $W=\rho U$ であり、別の独立因子は残らない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの標準正規の混合係数を二乗して足すと分散が1となります。共分散は、同じ $Z_1$ を共有する項だけが寄与します。

<!-- proof-start -->
### 証明

独立性と $E[Z_i]=0$、$E[Z_i^2]=1$ により $E[W]=0$ で、
$$
E[W^2]=\rho^2E[Z_1^2]+2\rho\sqrt{1-\rho^2}E[Z_1Z_2]
 +(1-\rho^2)E[Z_2^2]=\rho^2+0+1-\rho^2=1.
$$
さらに
$$
E[UW]=\rho E[Z_1^2]+\sqrt{1-\rho^2}E[Z_1Z_2]=\rho.
$$
両者の平均は0なので、この値が共分散です。$|\rho|=1$ なら平方根項が0です。逆に $|\rho|>1$ では平方根が実数でなく、この生成法は使えません。
<!-- proof-end -->

<!-- definition-example-start: def-u3-49-two-factor -->
**定義の確認**：$\rho=3/5$、$(Z_1,Z_2)=(1,-1)$ とすると $\sqrt{1-\rho^2}=4/5$ なので $U=1$、$W=3/5-4/5=-1/5$ です。$h=1$、$S_t=100$、$\mu=\sigma_S=b=0$、$\sigma_r=1$、$r_t=0$ なら $S_{t+h}=100>0$、$r_{t+h}=-1/5$ と実際に状態が定まります。株価の変動率0は許容範囲内で、負金利も定義域 $\mathbb R$ 内です。共分散が $3/5$ になるという命題は**単一の試行値ではなく分布全体**についての主張です。
<!-- definition-example-end -->

## 3. 全再評価：標本損失を作る

[U3-44 の固定ポジション全再評価](../U3-44/index.md#def-u3-44-full-revaluation)を、有限状態の表から Monte Carlo 標本へ置き換えます。例えば現在一株と欧州 call 一契約を持ち、満期まで $T>h$ 年なら、時点0と $h$ の保有額は
$$
V_0=S_0+C(S_0,K,r_0,\sigma_Q,T),\qquad
V_h^{(j)}=S_h^{(j)}+C(S_h^{(j)},K,r_h^{(j)},\sigma_Q,T-h).
$$
ここで $C$ は [U3-18 の Black–Scholes call](../U3-18/index.md#thm-u3-18-black-scholes) の価格で、$K>0$ は行使価格、$\sigma_Q>0$ は一定の価格付け変動率です。式の中で期間が $T$ から $T-h$ へ減ること、金利をシナリオごとに更新することが重要です。金利が確率的に動くシナリオに単純な Black–Scholes 公式を代入する場合、これは**指定したシナリオ別マーキング規則**であり、確率金利市場全体の整合的な無裁定価格を自動的に意味しません。

<a id="def-u3-49-full-mc"></a>

<!-- formal-statement-start -->
> **定義（Monte Carlo による full repricing 損失標本）**  
> 時点 $t$ の固定保有額 $V_t\in\mathbb R$、比較用元利倍率 $R>0$、期間末評価関数 $v_h:D\to\mathbb R$、期間末換算の純受取現金関数 $c_h:D\to\mathbb R$ をいずれも有限な可測関数または定数として予測前に指定する。[条件付きシナリオ](#def-u3-49-scenario-mc) $X^{(j)}_{t+h}$ に対し
>
$$
L_j=RV_t-\left(v_h(X^{(j)}_{t+h})+c_h(X^{(j)}_{t+h})\right),\quad j=1,\ldots,M
$$
>
> を full repricing 損失標本とする。$L_j>0$ は基準額より資産価値が小さいことを表す。各 $j$ で $v_h$ を実際に評価し、別のシナリオで得た評価額を使い回さない。
<!-- formal-statement-end -->

費用を $c_h<0$ と指定すれば損失は増えます。保有数量は固定し、配当やクーポンが既に評価関数に入っていれば現金関数へ重複計上しません。数値積分・内側の価格 Monte Carlo で $v_h$ 自体を近似する場合は、その誤差を外側のシナリオ標本誤差から分けて扱います。

<!-- definition-example-start: def-u3-49-full-mc -->
**定義の確認**：金額単位を万円、二つの因子を無次元の $x,y$ として、説明用の非線形マーキング規則 $v_h(x,y)=x^2+y^2$ 万円を指定します。これは実際の取引商品の無裁定価格公式とは主張しません。現在 $x_t=y_t=1$ で $V_t=2$ 万円、$R=1$、$c_h=0$、将来状態が $(2,0)$ と $(0,1)$ なら評価額はそれぞれ $4,1$ 万円、損失は $-2,1$ 万円です。全状態が定義域 $\mathbb R^2$ 内で、非線形関数を実際に再評価しています。
<!-- definition-example-end -->

### 標本から VaR と ES へ

標本 $L_1,\ldots,L_M$ を昇順 $L_{(1)}\le\cdots\le L_{(M)}$ に並べます。$0<\alpha<1$、$k=\lceil M\alpha\rceil$ とすると、[U3-45 の分位点](../U3-45/index.md#def-u3-45-var)に対応する経験 VaR は $L_{(k)}$ です。ES は [等確率標本の ES と端数重み](../U3-46/index.md#prop-u3-46-empirical)を使い、上側の確率質量 $M(1-\alpha)$ を上位から部分採用します。同点があっても順位を付ければ値は一意です。

例えば全再評価損失 $(-2,1,3,7)$ 万円を得て $\alpha=0.75$ なら $k=3$、VaR は3万円、尾部幅 $4(0.25)=1$ によって ES は7万円です。**最大損失の単純平均をどの $\alpha$ にも使うわけではありません。**

## 4. なぜデルタだけでは足りないか

比較を公平にするため、まず将来時点まで暦だけ進め、因子を動かさない価格 $v_h(x_t)$ を計算します。これが「ロール後の基準評価額」です。時点 $t$ の価格 $V_t$ をそのまま近似の切片とすると、時間経過と因子ショックの誤差が混ざります。

この節では $h$（価格を付ける将来時点）と他の契約条件を固定し、因子座標 $x=(x_1,\ldots,x_d)^{\mathsf T}$ だけを変化させます。$\partial v_h/\partial x_i$ は第 $i$ 因子を動かし他の因子を固定した偏微分です。これらを列に並べた勾配と、因子変化 $\Delta=x-x_t$ の内積は

$$
\nabla v_h(x_t)=
\left(\frac{\partial v_h}{\partial x_1}(x_t),\ldots,
\frac{\partial v_h}{\partial x_d}(x_t)\right)^{\mathsf T},
\qquad
\nabla v_h(x_t)^{\mathsf T}\Delta
=\sum_{i=1}^{d}\frac{\partial v_h}{\partial x_i}(x_t)(x_i-x_{t,i}).
$$

したがって転置記号 $\mathsf T$ は列ベクトル同士の内積を表すためのもので、行列式や固有値による判定は使いません。[U3-47 の線形因子損失](../U3-47/index.md#def-u3-47-linear-loss)で用いた感応度と因子変化の積を、同じ将来時点の価格関数の偏微分で具体化したものです。

<a id="def-u3-49-roll-linear"></a>

<!-- formal-statement-start -->
> **定義（保有期間末のロール後一次近似）**  
> $D\subseteq\mathbb R^d$ が開集合で、予測開始時の因子 $x_t\in D$ と将来因子 $x\in D$ を結ぶ線分が $D$ に含まれるとする。$v_h:D\to\mathbb R$ が $x_t$ で微分可能なら、ロール後の一次近似を
>
$$
\widetilde v_h(x)=v_h(x_t)+\nabla v_h(x_t)^\mathsf T(x-x_t)
$$
>
> とする。$v_h(x)$ と $\widetilde v_h(x)$ を**同じ将来時点**で比較する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-49-roll-linear -->
**定義の確認**：$v_h(x,y)=x^2+y^2$、$x_t=(1,1)$ とすると、偏微分は $\partial_xv_h=2x$、$\partial_yv_h=2y$ なので $\nabla v_h(1,1)=(2,2)^\mathsf T$ です。状態 $(2,0)$ への変化は $(1,-1)^\mathsf T$ だから $\widetilde v_h(2,0)=2+2(1)+2(-1)=2$ 万円。一方、全再評価額は4万円です。この状態の一次近似の損失は $2-2=0$ 万円、全再評価の損失は $2-4=-2$ 万円で、差は2万円です。
<!-- definition-example-end -->

<a id="prop-u3-49-linear-error"></a>

<!-- formal-statement-start -->
> **命題（一次近似の誤差上界）**  
> $x_t,x\in D$ を結ぶ線分が開集合 $D$ に含まれ、$v_h$ がその近傍で連続微分可能とする。線分上の任意の $z,w$ についてある定数 $K\ge0$ で
>
$$
\|\nabla v_h(z)-\nabla v_h(w)\|\le K\|z-w\|
$$
>
> が成立するなら、$\Delta=x-x_t$ に対して
>
$$
|v_h(x)-\widetilde v_h(x)|\le\frac K2\|\Delta\|^2
$$
>
> が成立する。ノルムは同じ Euclid ノルムを使う。
<!-- formal-statement-end -->

### 証明の見取り図

線分を $u\in[0,1]$ でなぞる一変数関数に直します。端点の差は導関数の積分であり、導関数の変化を Lipschitz 条件で抑えます。

<!-- proof-start -->
### 証明

$g(u)=v_h(x_t+u\Delta)$ と置きます。線分が $D$ に入り、$v_h$ は連続微分可能なので連鎖律が適用でき、
$$
g'(u)=\nabla v_h(x_t+u\Delta)^\mathsf T\Delta.
$$
[微積分学の基本定理II](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)を、$g$ の区間 $[0,1]$ に適用すると
$$
v_h(x)-v_h(x_t)=\int_0^1g'(u)\,du.
$$
$g'(0)=\nabla v_h(x_t)^\mathsf T\Delta$ を差し引くと
$$
v_h(x)-\widetilde v_h(x)
=\int_0^1[\nabla v_h(x_t+u\Delta)-\nabla v_h(x_t)]^\mathsf T\Delta\,du.
$$
Cauchy–Schwarz と仮定から被積分関数の絶対値は $Ku\|\Delta\|^2$ 以下です。積分すると $K\|\Delta\|^2\int_0^1u\,du=K\|\Delta\|^2/2$ を得ます。
<!-- proof-end -->

**失敗の機構**：$v_h(x)=(x-1)^+$ は $x=1$ で微分できません。行使価格の折れ目では命題の連続微分可能性が壊れます。実際、$x_t=1-\varepsilon$、$x=1+\varepsilon$ なら現在点の傾き0による近似値0に対し、全再評価は $\varepsilon$ です。誤差はショック幅 $2\varepsilon$ の一次です。さらに $\varepsilon>0$ に対し

$$
\frac{|v_h(x)-\widetilde v_h(x)|}{|x-x_t|^2}
=\frac{\varepsilon}{(2\varepsilon)^2}
=\frac1{4\varepsilon}\longrightarrow\infty
\qquad(\varepsilon\downarrow0)
$$

となり、一定の $K/2$ では一様に抑えられません。折れ目で微分可能性が失われ、連鎖律で作る勾配差の Lipschitz 評価が使えないことが失敗の原因です。

## 5. 標本誤差と再価格誤差を分離する

同じ Monte Carlo シナリオから二つの損失列を計算すれば、その違いは乱数標本の不一致ではなく**評価方法の違い**として比較できます。ただしそれは採用した $P$ モデルが正しいことの検証ではありません。

<a id="prop-u3-49-mc-mean"></a>

<!-- formal-statement-start -->
> **命題（固定予測モデルの標本平均誤差）**  
> 時点 $t$ に固定した $P$ モデルで、$L_1,\ldots,L_M$ が独立同分布、$E^P[L_1^2]<\infty$ とする。$\bar L_M=M^{-1}\sum_{j=1}^M L_j$ なら
>
$$
E^P[\bar L_M]=E^P[L_1],\qquad
\operatorname{Var}^P(\bar L_M)=\frac{\operatorname{Var}^P(L_1)}M.
$$
>
> 従って平均の標準偏差は $M^{-1/2}$ に比例する。この主張は標本 VaR や ES が有限標本で不偏だという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

平均の期待値は線形性から求め、分散では異なる試行間の共分散が0であることを使います。

<!-- proof-start -->
### 証明

$\mu_L=E^P[L_1]$、$\sigma_L^2=\operatorname{Var}^P(L_1)$ とすると
$$
E^P[\bar L_M]=\frac1M\sum_{j=1}^M\mu_L=\mu_L.
$$
独立性と有限二次モーメントから $i\ne j$ で $\operatorname{Cov}(L_i,L_j)=0$ なので、
$$
\operatorname{Var}^P(\bar L_M)
=\frac1{M^2}\left(\sum_{j=1}^M\sigma_L^2+
2\sum_{i<j}0\right)=\frac{\sigma_L^2}M.
$$
平方根を取れば標準偏差の主張です。
<!-- proof-end -->

VaR/ES は尾部を推定するため、平均以上に多数のシナリオを要する場合があります。標本数 $M$ を増やしても、誤った $P$ モデル、金利の扱い、評価式、欠落したリスク因子による**モデル誤差**は消えません。

<a id="prop-u3-49-risk-bound"></a>

<!-- formal-statement-start -->
> **命題（共通シナリオの一様再評価誤差と標本 VaR/ES）**  
> 同じ $M\ge1$ シナリオに対する二つの有限損失列 $(L_j)$、$(\widetilde L_j)$ があり、$\max_j|L_j-\widetilde L_j|\le\varepsilon$ とする。$\varepsilon\ge0$、$0<\alpha<1$ なら、[U3-45 の標本分位点規約](../U3-45/index.md#def-u3-45-var)と [U3-46 の標本 ES 規約](../U3-46/index.md#prop-u3-46-empirical)に対し
>
$$
|\widehat{\operatorname{VaR}}_\alpha(L)-\widehat{\operatorname{VaR}}_\alpha(\widetilde L)|\le\varepsilon,
$$
>
$$
|\widehat{\operatorname{ES}}_\alpha(L)-\widehat{\operatorname{ES}}_\alpha(\widetilde L)|\le\varepsilon
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

全シナリオで $\widetilde L_j-\varepsilon\le L_j\le\widetilde L_j+\varepsilon$ と挟みます。分位点と ES は損失を大きくしたとき減少せず、全損失に同じ定数を足すとその分だけ増えます。

<!-- proof-start -->
### 証明

各 $j$ について
$$
\widetilde L_j-\varepsilon\le L_j\le\widetilde L_j+\varepsilon.
$$
成分ごとに $a_j\le b_j$ なら、$b_{(k)}$ 以下の $b_j$ が少なくとも $k$ 個あるので、対応する $a_j$ も少なくとも $k$ 個が $b_{(k)}$ 以下です。よって $a_{(k)}\le b_{(k)}$ です。これを $a_j=L_j,\ b_j=\widetilde L_j+\varepsilon$ と $a_j=\widetilde L_j-\varepsilon,\ b_j=L_j$ にそれぞれ適用します。一定値の加減は順位を変えないため、$k=\lceil M\alpha\rceil$ として
$$
\widetilde L_{(k)}-\varepsilon\le L_{(k)}
\le\widetilde L_{(k)}+\varepsilon.
$$
これが VaR の結論です。ES は [標本 ES の上位部分採用公式](../U3-46/index.md#prop-u3-46-empirical)によって、順位統計量を非負の係数で重み付き平均したものです。各順位に同じ上下界を代入すると、係数の和が1であるため
$$
\widehat{\operatorname{ES}}_\alpha(\widetilde L)-\varepsilon
\le\widehat{\operatorname{ES}}_\alpha(L)
\le\widehat{\operatorname{ES}}_\alpha(\widetilde L)+\varepsilon.
$$
よって主張を得ます。
<!-- proof-end -->

この命題は一様誤差が**実際に確認できたときだけ**使えます。少数標本で観測された最大誤差を、未観測の将来シナリオまでの厳密上界と読み替えてはいけません。

## 6. Python 実験：同一シナリオの call をロールして再評価

株式1株と欧州 call 1契約を保有し、$S_0=K=100$ 円、金利 $r_0=0.02$、価格付け変動率 $\sigma_Q=0.20$、残存満期 $T=1$ 年、保有期間 $h=1/12$ 年とします。実確率シナリオは $\mu=0.04$、株価変動率 $\sigma_S=0.20$、金利変動率 $\sigma_r=0.01$（いずれも年単位）、相関 $\rho=-0.4$、金利ドリフト $b=0$ を指定します。比較用倍率は $R=e^{r_0h}$、期間内配当・費用は0です。元利倍率はあくまで**比較のための固定基準**です。

[Black–Scholes call 価格](../U3-18/index.md#thm-u3-18-black-scholes)を各シナリオの $S_h,r_h,T-h$ で評価し、[ロール後一次近似](#def-u3-49-roll-linear)では同じ $T-h$ の $S_0,r_0$ での偏微分を使用します。株式成分のデルタ1も忘れません。次のラボは乱数生成器の初期整数を固定した同一乱数で価格・VaR・ES・各状態の再価格差を比較します。描画は任意で、数値計算は標準ライブラリで動作します。

~~~python-file-lab
# lab-id: U3-49-FULL-REPRICING
# lab-title: 二因子シナリオと非線形 call の full repricing
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-49/assets/scenario_repricing.py
# timeout-ms: 30000
# lab-preset: 標準（相関-0.4） | --samples 12000 --rho -0.4 --alpha 0.95 --plot
# lab-preset: 正相関 | --samples 12000 --rho 0.6 --alpha 0.95 --plot
# lab-preset: 裾を重視 | --samples 20000 --rho -0.4 --alpha 0.99 --plot
~~~

コンソールで再実行するには以下を用います。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-49/assets/scenario_repricing.py --samples 12000 --rho -0.4 --alpha 0.95
~~~

Matplotlib を利用できる場合は引数に **--plot** を加えると、同一標本の厳密再評価損失を横軸、一次近似損失を縦軸にした散布図と $y=x$ の比較線を表示します。グラフの斜めの線は**差がゼロ**の基準であり、確率密度を示すものではありません。異なる初期整数での再実行では標本誤差で統計量が変わります。

## 7. 演習と詳細解答

### Level A：モデルの条件と損失の符号

<a id="ex-u3-49-a1"></a>
### U3-49-A1：相関正規の一回の生成
- Level: A

$\rho=3/5$、独立標準正規の実現値 $(Z_1,Z_2)=(1,-1)$ に対し、$U,W$ を求めよ。$\operatorname{Cov}(U,W)$ は標本の積 $UW$ と等しいか。

<!-- solution-start -->
**詳細解答**：[二因子モデル](#def-u3-49-two-factor)で $\sqrt{1-(3/5)^2}=4/5$ です。よって $U=1$、$W=(3/5)1+(4/5)(-1)=-1/5$。一回の積は $UW=-1/5$ ですが、[共分散命題](#prop-u3-49-correlation)の $\operatorname{Cov}(U,W)=3/5$ は全試行についての $E[UW]-E[U]E[W]$ です。両者を一致させてはいけません。
<!-- solution-end -->

<a id="ex-u3-49-a2"></a>
### U3-49-A2：途中の現金収支
- Level: A

現在価値 $V_t=50$ 万円、倍率 $R=1.02$、将来の全再評価価値 $V_h=47$ 万円、期末換算の純受取現金 $c_h=3$ 万円とする。損失を求め、現金を無視した結果との差を答えよ。

<!-- solution-start -->
**詳細解答**：[full repricing 損失](#def-u3-49-full-mc)に代入すると $L=1.02(50)-(47+3)=51-50=1$ 万円です。現金を無視すると $51-47=4$ 万円となり、3万円過大です。現金を時点 $h$ に換算済みであることと二重計上していないことを確認します。
<!-- solution-end -->

<a id="ex-u3-49-a3"></a>
### U3-49-A3：分位点と端数の尾部
- Level: A

全再評価損失の昇順標本が $(-3,-1,0,4,10)$ 万円で、$\alpha=0.70$ である。標本 VaR と ES を求めよ。

<!-- solution-start -->
**詳細解答**：$M=5$、$k=\lceil3.5\rceil=4$ より [VaR の定義](../U3-45/index.md#def-u3-45-var)で VaR は4万円です。尾部幅 $5(1-0.7)=1.5$ 件分なので、10万円の1件に境界の4万円の0.5件を加えます。[標本 ES](../U3-46/index.md#prop-u3-46-empirical)より
$$
\widehat{\operatorname{ES}}_{0.70}
=\frac{10+0.5(4)}{1.5}=\frac{12}{1.5}=8
$$
万円です。最大損失10万円だけを採るのは尾部確率0.30を満たしません。
<!-- solution-end -->

<a id="ex-u3-49-a4"></a>
### U3-49-A4：満期のロール
- Level: A

満期まで $T=1$ 年の call を $h=1/12$ 年保有する。将来の株価が110円、金利が0.03である。どの引数で価格公式を再評価するか述べよ。時点0の金利0.02と満期1年を使う方法の問題点は何か。

<!-- solution-start -->
**詳細解答**：[全再評価](#def-u3-49-full-mc)では将来時点の状態に合わせるので $C(110,K,0.03,\sigma_Q,11/12)$ を計算します。$T-h=1-1/12=11/12$ です。$C(110,K,0.02,\sigma_Q,1)$ では金利ショックと時間経過を反映せず、将来時点の評価額になりません。
<!-- solution-end -->

<a id="ex-u3-49-a5"></a>
### U3-49-A5：全再評価と一次近似
- Level: A

$v(x,y)=x^2+y^2$ 万円、現在因子 $(1,1)$、将来因子 $(2,0)$、倍率1、現金0とする。全再評価と一次近似の価格・損失を両方求めよ。

<!-- solution-start -->
**詳細解答**：現在価値は $v(1,1)=2$ 万円、将来価値は $v(2,0)=4$ 万円なので全再評価損失は $2-4=-2$ 万円です。勾配は $(2x,2y)$、現在点で $(2,2)$。ショック $(1,-1)$ に対して [一次近似](#def-u3-49-roll-linear)は $2+(2,2)\cdot(1,-1)=2$ 万円で、近似損失は $2-2=0$ 万円です。損失差は $|-2-0|=2$ 万円です。
<!-- solution-end -->

### Level B：導出・評価関数の一次近似との差・標本推定

<a id="ex-u3-49-b1"></a>
### U3-49-B1：共分散行列の構成
- Level: B

$\sigma_1=2,\sigma_2=3,\rho=-1/2$ とし、$(Y_1,Y_2)=(2U,3W)$ とする。共分散行列を導出し、負定値にならないことを確認せよ。

<!-- solution-start -->
**詳細解答**：[相関の命題](#prop-u3-49-correlation)から $\operatorname{Var}(U)=\operatorname{Var}(W)=1$、$\operatorname{Cov}(U,W)=-1/2$ です。[共分散行列の定義](../U3-47/index.md#def-u3-47-linear-loss)では、第 $(i,j)$ 成分は $\operatorname{Cov}(Y_i,Y_j)$ です。任意の $a,b\in\mathbb R$ について

$$
\begin{aligned}
\operatorname{Var}(aY_1+bY_2)
&=a^2\operatorname{Var}(Y_1)+2ab\operatorname{Cov}(Y_1,Y_2)\\
&\quad+b^2\operatorname{Var}(Y_2)
\end{aligned}
$$

となるので、行列の二次形式を計算すれば非負性を直接判定できます。今回は $E[U]=E[W]=0$ であるため、定義に戻って

$$
\operatorname{Var}(2U)=E[(2U)^2]=4,\qquad
\operatorname{Var}(3W)=E[(3W)^2]=9,
$$

$$
\operatorname{Cov}(2U,3W)=E[(2U)(3W)]
=6E[UW]=6(-1/2)=-3
$$

と求められます。これらを各成分へ代入すると
$$
\operatorname{Cov}(Y)=
\begin{pmatrix}
4 & 2(3)(-1/2)\\
2(3)(-1/2)&9
\end{pmatrix}
=
\begin{pmatrix}4&-3\\-3&9\end{pmatrix}.
$$
任意の実数 $a,b$ に対し $4a^2-6ab+9b^2=(2a-\frac32b)^2+\frac{27}{4}b^2\ge0$ なので半正定値です。$a=b=0$ 以外では正となり正定値です。行列式でも $4(9)-(-3)^2=27>0$、先頭主小行列式4も正と検算できます。
<!-- solution-end -->

<a id="ex-u3-49-b2"></a>
### U3-49-B2：二次価格関数の誤差の再構成
- Level: B

$v(x,y)=x^2+y^2$、初期点 $(1,1)$ とし、ショック $(a,b)$ に対して全再評価と一次近似の差を一般式で求めよ。$\|(a,b)\|$ を使って [誤差上界](#prop-u3-49-linear-error)を等号で確認せよ。

<!-- solution-start -->
**詳細解答**：全再評価は
$$
v(1+a,1+b)=2+2a+2b+a^2+b^2.
$$
[一次近似](#def-u3-49-roll-linear)は $2+2a+2b$ なので差は $a^2+b^2$ です。勾配 $\nabla v(x,y)=(2x,2y)$ は二点 $z,w$ に対し $\|\nabla v(z)-\nabla v(w)\|=2\|z-w\|$ で、命題の $K=2$ を満たします。ゆえに上界 $(2/2)\|(a,b)\|^2=a^2+b^2$ と実際の差が等しいことが確かめられます。
<!-- solution-end -->

<a id="ex-u3-49-b3"></a>
### U3-49-B3：標本数と誤差の種類
- Level: B

条件付き $P$ 下で独立な損失の分散が $100$（万円の二乗）である。$M=100$ と $M=400$ の標本平均の理論標準偏差を求めよ。価格評価式がすべての状態で2万円高く誤っていた場合、$M$ を増やすとその問題は解消するか。

<!-- solution-start -->
**詳細解答**：[標本平均の命題](#prop-u3-49-mc-mean)の $\operatorname{Var}(\bar L)=100/M$ から、$M=100$ では $\sqrt{100/100}=1$ 万円、$M=400$ では $\sqrt{100/400}=0.5$ 万円です。標本数4倍で標準偏差は半分になります。一方 $v_h$ が全状態で2万円過大なら $L_j=RV_t-v_h(X_j)$ が全状態で2万円過小です。これは標本数を増やしても消えない系統誤差です。
<!-- solution-end -->

<a id="ex-u3-49-b4"></a>
### U3-49-B4：共通シナリオでのリスク値の差
- Level: B

$\alpha=0.75$、厳密全再評価損失が $(-2,1,3,7)$ 万円、同じシナリオの近似損失が $(-1,2,2,6)$ 万円である。各 VaR/ES を求め、最大の対ごとの誤差と [安定性命題](#prop-u3-49-risk-bound)を照合せよ。

<!-- solution-start -->
**詳細解答**：両列は昇順です。$M\alpha=3$ だから厳密 VaR は3、近似 VaR は2万円です。尾部幅 $M(1-\alpha)=1$ より厳密 ES は7、近似 ES は6万円です。対応する対の絶対差は $(1,1,1,1)$ 万円で最大 $\varepsilon=1$ 万円。リスク値の差はいずれも1万円なので、[一様誤差の命題](#prop-u3-49-risk-bound)の両上界に等号で達します。同じ順位かどうかは仮定せず、ここでは実際に同順であることも確認しています。
<!-- solution-end -->

### Level C：予測手順を統合する

<a id="ex-u3-49-c1"></a>
### U3-49-C1：二因子の標本、全再評価、VaR/ES と誤差
- Level: C

時点0の二因子 $(x,y)=(1,1)$、ポートフォリオのマーキング関数 $v(x,y)=x^2+y^2$ 万円、元利倍率 $R=1$、現金収支0とする。独立な標準正規乱数から $U=Z_1$、$W=(3/5)Z_1+(4/5)Z_2$ を作り、因子は $(x_h,y_h)=(1+U,1+W)$ とする。同じ初期整数を指定した乱数生成の4回の模擬乱数の**実現値**が順に $(Z_1,Z_2)=(-1,0),(0,-1),(0,1),(1,0)$ だったとする（4点の頻度を母分布とみなす必要はない）。

(i) 4つのシナリオを求め、(ii) 全再評価損失と $(1,1)$ における一次近似損失を求め、(iii) $\alpha=0.75$ で両者の VaR/ES を求め、(iv) その標本差と、母集団の真のリスク値の差について何が言えるか説明せよ。

<!-- solution-start -->
**詳細解答**：

(i) [二因子の相関変換](#def-u3-49-two-factor)を一回ずつ代入すると $(U,W)$ は $(-1,-3/5)$、$(0,-4/5)$、$(0,4/5)$、$(1,3/5)$ です。したがって $(x_h,y_h)$ は $(0,2/5)$、$(1,1/5)$、$(1,9/5)$、$(2,8/5)$ です。

(ii) 初期評価額は $v(1,1)=2$ 万円。各将来の全再評価額は
$$
0^2+(2/5)^2=\frac4{25},\quad
1^2+(1/5)^2=\frac{26}{25},\quad
1^2+(9/5)^2=\frac{106}{25},\quad
2^2+(8/5)^2=\frac{164}{25}.
$$
よって full repricing 損失は $(46,24,-56,-114)/25$ 万円です。[ロール後一次近似](#def-u3-49-roll-linear)の勾配は $(2,2)$、評価額は $2+2U+2W$ なので、近似損失は $-2(U+W)$、順に $16/5,8/5,-8/5,-16/5$ 万円です。

(iii) 全再評価損失の昇順は $(-114,-56,24,46)/25$、近似の昇順は $(-16,-8,8,16)/5$ です。$k=\lceil4(0.75)\rceil=3$、尾部幅は1なので
$$
\widehat{\operatorname{VaR}}^{\rm full}_{0.75}=\frac{24}{25},\quad
\widehat{\operatorname{ES}}^{\rm full}_{0.75}=\frac{46}{25},
$$
$$
\widehat{\operatorname{VaR}}^{\rm lin}_{0.75}=\frac85,\quad
\widehat{\operatorname{ES}}^{\rm lin}_{0.75}=\frac{16}{5}.
$$
金額の単位はいずれも万円です。

(iv) [二次価格の誤差](#prop-u3-49-linear-error)の実際値は $U^2+W^2$ なので、シナリオ順に $34/25,16/25,16/25,34/25$ 万円です。最大は $34/25$ 万円。VaR 差 $|24/25-8/5|=16/25$、ES 差 $|46/25-16/5|=34/25$ で、[標本リスク安定性命題](#prop-u3-49-risk-bound)の上界を満たします。これらは**この4試行の標本値**についての比較です。4つの実現値は独立な標本の具体的な組を与えるだけで、真の $P$ 下の VaR/ES の差やその精度を保証しません。
<!-- solution-end -->

## 振り返りと次講

この方法は「実確率モデルのシナリオ生成 → 残存満期・因子・現金を更新した全再評価 → 損失標本 → VaR/ES」という流れです。**標本誤差、価格の数値計算誤差、一次近似と全再評価の差、$P$ モデル誤差**は異なるものとして記録します。明示的な二次近似や因子間の交差項は次の U3-50 Delta–Gamma 近似で扱います。