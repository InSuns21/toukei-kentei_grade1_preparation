# U3-33 層化抽出・重要度サンプリング

[前講の対称変量・対照変量](../U3-32/index.md#def-u3-32-stock-control)は、同じリスク中立分布からの評価に工夫を加えました。しかし、例えば株価が180円を超えたときにだけ1円支払う契約を、初期株価100円から評価すると、通常の標本の大半で支払額は0になります。標本数を増やすだけでは、めったに起きない事象の精度を上げにくいのです。

この講義では二つの仕組みを金融商品へ適用します。

- **層化抽出**：元の確率を保ったまま、株価分布の各領域から一定数の標本を取る。
- **重要度サンプリング（重点サンプリング）**：事象が起こりやすい別の分布から抽出し、**尤度比**を掛けて元の期待値へ戻す。

一般的な層化・重点サンプリングの定義と基本定理は [MC3 の層化抽出](../../../計算系/MC/MC3/index.md#def-mc3-stratified-sampling)と[重点サンプリング](../../../計算系/MC/MC3/index.md#def-mc3-importance-sampling)で既習です。本講では **リスク中立GBMの分位点・割引・経路・希少事象・有限の計算予算**へ具体的に代入していきます。

時刻の単位は年、株価・支払額は円、$r,q$ は年率の連続複利金利と配当利回り、$\sigma$ は年$^{-1/2}$ のボラティリティとします。**価格付けに使う確率測度は $Q$** であり、実市場の損失分布を扱う測度 $P$ とは区別します。$q$ は配当利回りであって、サンプリング密度を示す記号には使いません。

以下、$s,T,\sigma>0$、$r,q\in\mathbb R$、$K,H>0$ とし、[GBMの陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)へリスク中立ドリフト $r-q$ を入れます。標準正規 $Z\sim N(0,1)$ に対して

$$
A=s\exp\{(r-q-\sigma^2/2)T\},\quad
b=\sigma\sqrt T,\quad D=e^{-rT},
$$

$$
S_T(Z)=Ae^{bZ},\qquad F(Z)=D\,G(S_T(Z)),\qquad V=E_Q[F(Z)].
$$

$G$ は満期に支払う円建ての関数です。$F$ は割引済み円建て標本です。通常の独立Monte Carloなら、[U3-26 の推定量](../U3-26/index.md#def-u3-26-mc-estimator)は $F(Z_i)$ の平均で、二乗可積分ならその分散は $\operatorname{Var}_Q(F)/N$ です。

## 1. 分位層に分けて、上側の小さな領域も必ず見る

標準正規の分布関数を $\Phi$、密度を $\phi$、上側確率を $\overline\Phi(a)=1-\Phi(a)$ とします（[U3-18 の正規分布の導入](../U3-18/index.md#def-u3-18-normal-indices)）。$U=\Phi(Z)$ は一様分布です。$U$ を区間で分ければ、**区間の長さそのものが $Q$ 下の層の重み**になります。

有限分割 $0=u_0<u_1<\cdots<u_J=1$ に対し $p_k=u_k-u_{k-1}$ と置きます。層 $k$ の内部で独立一様乱数 $R_{kj}$ を使って

$$
U_{kj}=u_{k-1}+p_kR_{kj},\qquad
Z_{kj}=\Phi^{-1}(U_{kj}),\qquad F_{kj}=F(Z_{kj})
$$

とすれば、$Z_{kj}$ は標準正規を $u_{k-1}<\Phi(Z)<u_k$ へ条件付けた標本です。$R_{kj}$ はすべての $k,j$ を通して独立に作ります。区間の両端に一致する確率は0なので、境界の開閉は期待値に影響しません。

<a id="def-u3-33-gbm-strata"></a>

<!-- formal-statement-start -->
> **定義（正規分位層によるGBM価格推定量）**  
> 上のGBMと正規分位分割を固定し、$E_Q[F(Z)^2]<\infty$ とする。各層から $n_k\ge1$ 個の独立な条件付き標本 $F_{kj}$ を取り、$N=\sum_kn_k$ と置く。**正規分位層による価格推定量**を

$$
\widehat V_{\mathrm{str}}
=\sum_{k=1}^Jp_k\overline F_k,\qquad
\overline F_k=\frac1{n_k}\sum_{j=1}^{n_k}F_{kj}
$$

> と定める。$p_k$ は $Q$ 下の確率であり、標本配分比 $n_k/N$ とは一般に異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-33-gbm-strata -->
**定義の確認**：$s=100$ 円、$T=1$ 年、$r=0.03,q=0,\sigma=0.2$ とし、区間を $(0,0.9]$、$(0.9,0.99]$、$(0.99,1)$ と分けます。各重みは $p=(0.9,0.09,0.01)$ です。最後の層から一様乱数 $R=0.5$ を引くと

$$
U=0.99+0.01(0.5)=0.995,\quad
Z=\Phi^{-1}(0.995)\simeq2.576,
$$

$$
S_T=100\exp(0.01+0.2Z)\simeq169.1\ \text{円}.
$$

これは単なる $N(0,1)$ 全体からの抽出ではなく、条件 $\Phi(Z)>0.99$ を満たす正規標本です。最後の層から $512$ 個引いたとしても、**その層の平均への係数は $512/N$ ではなく $0.01$** です。これが条件付き標本・層の重み・配分を区別する直接例です。
<!-- definition-example-end -->

実際に希少事象を数えます。**満期のみ**に $S_T\ge H$ なら1円支払うデジタル契約を考えます。$H=180$ 円なら

$$
S_T\ge H\iff Z\ge a,\qquad
a=\frac{\log(H/s)-(r-q-\sigma^2/2)T}{\sigma\sqrt T}
=\frac{\log1.8-0.01}{0.2}.
$$

ここで $a\simeq2.8889333$、元の確率は

$$
\pi=\overline\Phi(a)\simeq0.001932755,\qquad
V_{\rm dig}=D\pi\simeq0.001875634\ \text{円}.
$$

最後の層は $\Phi(Z)>0.99$、つまり $Z>\Phi^{-1}(0.99)\simeq2.326$ なので、希少事象は**この層だけ**で起きます。この分割では

$$
\theta=Q(Z\ge a\mid U>0.99)=\frac{\pi}{0.01}\simeq0.193276.
$$

通常の0/1標本では正例率が約0.19%でしたが、この層の内部では約19.3%です。ただしその層の母集団での重み0.01を忘れてはいけません。

<a id="prop-u3-33-strata-variance"></a>

<!-- formal-statement-start -->
> **命題（正規層化推定量の分散と希少閾値）**  
> [定義](#def-u3-33-gbm-strata)の独立性・二乗可積分性が成り立つとする。$\mu_k=E_Q[F\mid u_{k-1}<U<u_k]$、$v_k=\operatorname{Var}_Q(F\mid u_{k-1}<U<u_k)$ とすれば、

$$
E[\widehat V_{\mathrm{str}}]=V,\qquad
\operatorname{Var}(\widehat V_{\mathrm{str}})
=\sum_{k=1}^J\frac{p_k^2v_k}{n_k}.
$$

> 上の3層と満期デジタル契約では $v_1=v_2=0$、$v_3=D^2\theta(1-\theta)$ だから、

$$
\operatorname{Var}(\widehat V_{\mathrm{str}})
=\frac{D^2(0.01)^2\theta(1-\theta)}{n_3}.
$$
<!-- formal-statement-end -->

**証明の見取り図**：一般の[MC3 の層化分散定理](../../../計算系/MC/MC3/index.md#thm-mc3-stratified-variance)へ、層変数 $U=\Phi(Z)$ と金融支払額 $F$ を入力します。今回の閾値では二層が恒等的にゼロなので、一つの条件付きBernoulli分散だけが残ります。

<!-- proof-start -->
### 証明

層 $k$ に条件付けた平均は $\mu_k$ です。層確率は $p_k$ だから全期待値を区分積分して

$$
V=\int_0^1 F(\Phi^{-1}(u))\,du
=\sum_{k=1}^Jp_k\mu_k.
$$

各 $\overline F_k$ の平均は $\mu_k$、分散は $v_k/n_k$ です。異なる層は独立な乱数列から生成するため、

$$
E[\widehat V_{\rm str}]=\sum_kp_k\mu_k=V,
$$

$$
\operatorname{Var}(\widehat V_{\rm str})
=\sum_kp_k^2\operatorname{Var}(\overline F_k)
=\sum_k\frac{p_k^2v_k}{n_k}.
$$

デジタル契約の支払は $F=D\boldsymbol1_{\{Z\ge a\}}$ です。閾値 $a>\Phi^{-1}(0.99)$ より第1・2層の指示関数は常に0、第3層では成功確率 $\theta=\pi/0.01$ のBernoulliです。ゆえに $v_3=D^2(\theta-\theta^2)$ で、表示された分散式を得ます。
<!-- proof-end -->

各層512標本、総評価数 $N=1536$ とすると、

$$
\operatorname{Var}(\widehat V_{\rm str})
\simeq2.8680\times10^{-8}\ {\rm 円}^2.
$$

同じ1536回の独立な通常MCなら

$$
\operatorname{Var}(\widehat V_{\rm plain})
=\frac{D^2\pi(1-\pi)}{1536}
\simeq1.1827\times10^{-6}\ {\rm 円}^2.
$$

比は約 $0.02425$ です。これは「希少事象が最後の層へ収まる」と事前に分かる特別な設定での比較であり、**等配分がどの商品にも最適という意味ではありません**。[MC3 の最適配分](../../../計算系/MC/MC3/index.md#thm-mc3-stratified-variance)は $n_k\propto p_k\sqrt{v_k}$（整数制約・各層最低数を別途考慮）であり、未知の $v_k$ を予備標本から求めるなら学習費用も勘定に入れます。

### 1.1 callなら層内の二次モーメントも解析できる

同じGBMで $G(x)=(x-K)_+$ とします。$z_{k-1}=\Phi^{-1}(u_{k-1})$、$z_k=\Phi^{-1}(u_k)$（端点は無限大を許す）、$z_K=\log(K/A)/b$ と置くと、層内で支払が正になる範囲は $l_k=\max(z_{k-1},z_K)<z<z_k$ です。$l_k\ge z_k$ なら各積分は0です。

正の部分の非正規化モーメントを

$$
B_{j,k}=A^j e^{j^2b^2/2}
\bigl\{\Phi(z_k-jb)-\Phi(l_k-jb)\bigr\}
\quad(j=0,1,2)
$$

と置きます（積分が空なら0）。これは [U3-32 の指数重み付き正規尾積分](../U3-32/index.md#prop-u3-32-call-moments)を区間へ制限し、$\phi(z)e^{jbz}=e^{j^2b^2/2}\phi(z-jb)$ を積分したものです。すると

$$
\mu_k=\frac{D(B_{1,k}-KB_{0,k})}{p_k},
$$

$$
v_k=\frac{D^2(B_{2,k}-2KB_{1,k}+K^2B_{0,k})}{p_k}-\mu_k^2.
$$

この式で、実験から逆算せずに層内分散と配分を検査できます。$j=0$ の式でも $A^0=1$ とします。分割境界が行使閾値をまたぐとき、積分下端を $z_{k-1}$ のままにすると、**負のcall支払を誤って含める**ので注意します。

## 2. 正規分布の中心を動かすと、必ず尤度比が必要

層化は元の確率を区間ごとに配分しました。次は、そもそも **抽出する正規分布を $N(0,1)$ から $N(\lambda,1)$ へ変える**方法です。ここで $\lambda\in\mathbb R$ は無次元の提案平均で、先ほどの配当利回り $q$ とは無関係です。

元の密度は $\phi(y)$、提案密度は $g_\lambda(y)=\phi(y-\lambda)$ です。分母の提案密度はすべての $y\in\mathbb R$ で正です。したがって密度比（尤度比）

$$
L_\lambda(y)=\frac{\phi(y)}{\phi(y-\lambda)}
=\exp\{-\lambda y+\lambda^2/2\}
$$

を掛けると、提案分布下の積分が元の $Q$ の積分へ戻ります。これは[MC3 の重点サンプリング定理](../../../計算系/MC/MC3/index.md#thm-mc3-importance-sampling)への密度の代入であり、$Q$ 自体を変更してオプションの契約条件を変える操作ではありません。

<a id="def-u3-33-shift-importance"></a>

<!-- formal-statement-start -->
> **定義（正規平均シフトによる金融重要度サンプリング）**  
> $E_Q[|F(Z)|]<\infty$ とし、提案分布 $g_\lambda=N(\lambda,1)$ から独立同分布な $Y_1,\ldots,Y_N$ を生成する。**正規平均シフトによる価格推定量**を

$$
\widehat V_{\rm IS}
=\frac1N\sum_{i=1}^N F(Y_i)L_\lambda(Y_i),\qquad
L_\lambda(y)=e^{-\lambda y+\lambda^2/2}
$$

> と定める。ここで $F(y)=D\,G(Ae^{by})$ は**元の**リスク中立GBMに同じ数値 $y$ を代入した割引支払額である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-33-shift-importance -->
**定義の確認**：$H=180$ 円のデジタル契約に $\lambda=2$ を選び、提案分布から $Y=3$ が出たとします。これは $3>a\simeq2.889$ なので1円支払いが発生しますが、割引支払額 $D$ をそのまま平均してはいけません。密度比を計算すると

$$
L_2(3)=\exp(-2\cdot3+2^2/2)=e^{-4},
$$

$$
W(3)=D\,\boldsymbol1_{\{3\ge a\}}L_2(3)=De^{-4}\ \text{円}.
$$

一方、$Y=2$ なら $2<a$ なので $W(2)=0$ です。どちらも同じ提案密度 $g_2$ から引くという条件、全実数での台条件、割引と尤度比の両方を直接確認しました。**重みを掛けない抽出**では、約0.19%の元の確率が約18.7%の提案確率にすり替わってしまいます。
<!-- definition-example-end -->

### 2.1 平均が正しいだけでは不十分：二乗モーメントを解く

満期デジタル支払 $F(y)=D\boldsymbol1_{\{y\ge a\}}$ では、真値は $D\pi$、$\pi=\overline\Phi(a)$ です。Gaussianシフトの効果を、単発の乱数実験ではなく解析式で比較できます。

<a id="prop-u3-33-shift-variance"></a>

<!-- formal-statement-start -->
> **命題（Gaussianシフトの尤度比と閾値事象の分散）**  
> $a,\lambda\in\mathbb R$、$D>0$ とし、$Y\sim N(\lambda,1)$、$L_\lambda(Y)=\phi(Y)/\phi(Y-\lambda)$ とする。$W=D\boldsymbol1_{\{Y\ge a\}}L_\lambda(Y)$ は二乗可積分であり、

$$
E_{g_\lambda}[W]=D\overline\Phi(a),
$$

$$
E_{g_\lambda}[W^2]=D^2e^{\lambda^2}\overline\Phi(a+\lambda),
$$

$$
\operatorname{Var}_{g_\lambda}(\widehat V_{\rm IS})
=\frac{D^2}{N}\left\{
e^{\lambda^2}\overline\Phi(a+\lambda)-\overline\Phi(a)^2
\right\}.
$$
<!-- formal-statement-end -->

**証明の見取り図**：一次モーメントでは提案密度が一つ消え、二次モーメントでは密度比を二乗するため $\phi(y)^2/\phi(y-\lambda)$ が残ります。[U3-18 の正規尾積分](../U3-18/index.md#lem-u3-18-tilted-tail)と同じ平方完成を使います。

<!-- proof-start -->
### 証明

$g_\lambda(y)=\phi(y-\lambda)>0$ なので台条件を満たし、提案分布下で

$$
E_{g_\lambda}[W]
=D\int_a^\infty\frac{\phi(y)}{\phi(y-\lambda)}
\phi(y-\lambda)\,dy
=D\int_a^\infty\phi(y)\,dy
=D\overline\Phi(a).
$$

二次モーメントの被積分関数は

$$
\frac{\phi(y)^2}{\phi(y-\lambda)}
=\frac{1}{\sqrt{2\pi}}
\exp\left\{-y^2+\frac{(y-\lambda)^2}{2}\right\}.
$$

指数を平方完成すると

$$
-y^2+\frac{(y-\lambda)^2}{2}
=-\frac{(y+\lambda)^2}{2}+\lambda^2,
$$

$$
\frac{\phi(y)^2}{\phi(y-\lambda)}
=e^{\lambda^2}\phi(y+\lambda).
$$

従って $v=y+\lambda$ と変数を移すと

$$
E_{g_\lambda}[W^2]
=D^2e^{\lambda^2}\int_a^\infty\phi(y+\lambda)\,dy
=D^2e^{\lambda^2}\overline\Phi(a+\lambda)<\infty.
$$

$\operatorname{Var}(W)=E[W^2]-E[W]^2$ を用い、独立な $N$ 標本の平均だから $N$ で割って結論です。
<!-- proof-end -->

数値例の $a=2.8889333$ で $\lambda=2$ にすると

$$
P_{g_2}(Y\ge a)=\overline\Phi(a-2)\simeq0.187019.
$$

通常MCの一標本分散は $D^2\pi(1-\pi)$、シフト後は $D^2\{e^4\overline\Phi(a+2)-\pi^2\}$。割引係数 $D^2$ を共通因子として消すと、分散比は約 **$0.01241$** です。実際の標準誤差はこの分散を $N$ で割った平方根です。

しかし $\lambda=8$ は過剰なシフトです。提案分布ではイベントがほぼ毎回起こるものの、同じ解析式による分散比は約 **$2103.5$** に悪化します。失ったのは不偏性ではなく、元分布で重要な領域が提案分布で非常に稀になり、そこでの巨大な尤度比が二乗モーメントを支配してしまう性質です。

元の標本を確実に出す層化と違い、**重みの大きな標本を偶然引けない有限回の実験では、見た目の標準誤差も過小になりうる**ことを覚えておきます。

## 3. 満期だけでなく途中の障壁を監視する

ここまでは一つの正規変数 $Z$ に依存する契約でした。[U3-09 のバリア契約](../U3-09/index.md)のように途中の株価を検査する場合は、複数の正規増分を**まとめて**変換します。ここでは上方障壁 $H>s$ を $m$ 個の決められた日時

$$
t_j=jT/m,\quad j=1,\ldots,m
$$

でだけ監視し、いずれかで $S_{t_j}\ge H$ なら **満期 $T$ に1円を支払う**契約を扱います。連続時刻の最大値を使う契約ではありません。$m$ を変えると契約そのものが変わります。

元の $Q$ 下では $Z_1,\ldots,Z_m$ を独立標準正規として

$$
S_{t_j}=s\exp\left\{(r-q-\sigma^2/2)t_j
+\sigma\sqrt{T/m}\sum_{i=1}^jZ_i\right\}.
$$

シフト係数 $\lambda$ は満期の標準正規変量に対して指定します。提案分布では $Y_i\sim N(\lambda/\sqrt m,1)$ を各時刻で独立に生成します。満期までの対数価格の乱数項は $\sigma\sqrt{T/m}\sum_iY_i$ になり、元より上方向へ動きやすくなります。

<a id="def-u3-33-discrete-barrier"></a>

<!-- formal-statement-start -->
> **定義（離散監視上方ノックインの重み付き価格）**  
> $m\ge1$、$H>s$ とし、提案増分 $Y_i\overset{\mathrm{iid}}{\sim}N(\lambda/\sqrt m,1)$ から各 $S_{t_j}(Y)$ を上の対数価格式で作る。監視事象・経路尤度比・割引標本を

$$
E_m(Y)=\left\{\max_{1\le j\le m}S_{t_j}(Y)\ge H\right\},
$$

$$
L_m(Y)=\exp\left\{-\frac{\lambda}{\sqrt m}\sum_{i=1}^mY_i+\frac{\lambda^2}{2}\right\},\qquad
W_m(Y)=D\boldsymbol1_{E_m(Y)}L_m(Y)
$$

> と置く。独立経路 $N$ 本の $\widehat V_{m,N}=N^{-1}\sum_{h=1}^N W_m(Y^{(h)})$ を**離散監視上方ノックイン・デジタル価格の重点サンプリング推定量**とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-33-discrete-barrier -->
**定義の確認**：$m=4$、$T=1$ 年、$\lambda=2$ とすると、各増分の提案平均は $2/\sqrt4=1$ です。例えば $Y=(0,1,1,1)$ なら総和は3で、

$$
L_4=\exp\{-1(0+1+1+1)+2\}=e^{-1}.
$$

この経路では各 $j$ に $S_{t_j}=100\exp\{0.01(j/4)+0.2(1/2)\sum_{i\le j}Y_i\}$ を代入し、どれか一つでも180円以上なら $W_4=De^{-1}$、そうでなければ0です。実際には最大の $S_{t_4}=100e^{0.03+0.30}\simeq139.1$ 円で障壁未到達、従って **この経路の標本は0** です。$L_4=e^{-1}$ を掛けたことだけで契約を満たしたことにはなりません。
<!-- definition-example-end -->

<a id="prop-u3-33-path-likelihood"></a>

<!-- formal-statement-start -->
> **命題（多時点シフトの尤度比と離散監視事象）**  
> 前定義で $m,N$ は有限正整数、$\lambda\in\mathbb R$、$H>s$ とする。独立な各提案増分は全実数に正の密度を持ち、$W_m$ は二乗可積分である。元のリスク中立モデルで定義した $V_m=DQ(E_m)$ に対して、

$$
E_{g_\lambda^{\otimes m}}[\widehat V_{m,N}]=V_m,
$$

$$
\operatorname{Var}_{g_\lambda^{\otimes m}}(\widehat V_{m,N})
=\frac{D^2}{N}\left(E_{g_\lambda^{\otimes m}}[\boldsymbol1_{E_m}L_m^2]-Q(E_m)^2\right).
$$
<!-- formal-statement-end -->

**証明の見取り図**：同じ一次元密度比を各増分で掛け合わせます。二つの値の和を取ると、二乗項は $m(\lambda/\sqrt m)^2/2=\lambda^2/2$ になります。最後に経路事象で積分して元の $Q$ へ戻します。

<!-- proof-start -->
### 証明

提案平均を $\delta=\lambda/\sqrt m$ と書きます。元分布下の同時密度は $\prod_{i=1}^m\phi(y_i)$、提案下は $\prod_i\phi(y_i-\delta)$ です。比は

$$
\prod_{i=1}^m\frac{\phi(y_i)}{\phi(y_i-\delta)}
=\prod_{i=1}^m e^{-\delta y_i+\delta^2/2}
=e^{-\delta\sum_i y_i+m\delta^2/2}=L_m(y).
$$

したがって $Q$ 下の正規増分で評価した事象指示関数の積分は

$$
E_{g_\lambda^{\otimes m}}[\boldsymbol1_{E_m}L_m]
=\int_{\mathbb R^m}\boldsymbol1_{E_m(y)}
\prod_{i=1}^m\phi(y_i)\,dy
=Q(E_m).
$$

不偏性は経路間独立性から従います。さらに $0\le\boldsymbol1_{E_m}\le1$ より

$$
E_{g_\lambda^{\otimes m}}[\boldsymbol1_{E_m}L_m^2]
\le E_{g_\lambda^{\otimes m}}[L_m^2]
=\prod_{i=1}^m E_{N(\delta,1)}[e^{-2\delta Y_i+\delta^2}].
$$

正規指数モーメントへ $Y_i=\delta+\varepsilon_i$（$\varepsilon_i\sim N(0,1)$）を代入すると、各因子は $e^{\delta^2}$ です。従って上界は $e^{m\delta^2}=e^{\lambda^2}<\infty$。二乗可積分性を得て、独立経路の分散公式から結論が出ます。
<!-- proof-end -->

ここで元の **離散監視** 確率 $Q(E_m)$ を検算するとき、満期だけの確率をそのまま代用してはいけません。$S_T\ge H$ なら確かに $E_m$ ですが、早い時刻に到達して満期には下がる経路もあります。和事象への基本的な上下界から

$$
\overline\Phi(a_T)\le Q(E_m)
\le\min\left(1,\sum_{j=1}^m\overline\Phi(a_{t_j})\right),
$$

$$
a_t=\frac{\log(H/s)-(r-q-\sigma^2/2)t}{\sigma\sqrt t}\quad (t>0).
$$

左辺は満期だけ、右辺は各監視時点の到達確率の和です。この範囲外の数値推定値は有限標本の揺れや実装ミスを疑います（推定値が必ず範囲内に入るという保証ではありません）。**連続監視時の区間内部越境補正**は後続のU3-35で扱う課題で、ここには混ぜません。

## 4. 重みを1に直してしまってよいか：ESSと自己正規化

重要度サンプリングの標本平均は $\sum_i L_iF(Y_i)/N$ です。しかし重みの標本平均 $\sum_iL_i/N$ は1に近いとは限りません。見た目を整えようと分母を重みの和に取り替えると、有限標本で別の推定量になります。

まず大きな重みが少数に集中していないかを、重みの総和と二乗和で測ります。これを**有効標本数（ESS）**と呼びますが、独立な実標本が何本存在するかという整数を直接数えているわけではありません。

<a id="def-u3-33-ess"></a>

<!-- formal-statement-start -->
> **定義（提案標本の有効標本数）**  
> 同じ提案密度から得た $N\ge1$ 個の有限な正の尤度比 $L_1,\ldots,L_N$ に対し、正規化重み $\widetilde L_i=L_i/\sum_jL_j$ と、有効標本数

$$
\mathrm{ESS}_N=\frac{1}{\sum_{i=1}^N\widetilde L_i^2}
=\frac{(\sum_{i=1}^NL_i)^2}{\sum_{i=1}^NL_i^2}
$$

> を定義する。$\mathrm{ESS}_N$ はこの**全経路重み**に関する診断量であって、事象付き標本 $L_i\boldsymbol1_{E_i}$ の分散や推定精度そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-33-ess -->
**定義の確認**：$L_1=1,L_2=1,L_3=2$ とすれば $\widetilde L=(1/4,1/4,1/2)$、和は1です。二乗和は $1/16+1/16+1/4=3/8$ だから

$$
\mathrm{ESS}_3=\frac{1}{3/8}=\frac83\simeq2.667.
$$

重みがすべて1ならESSは3、もし一つの重みがほぼすべてを占めればESSは1に近づきます。ここでは $N=3$ という物理的な経路本数は変わりません。
<!-- definition-example-end -->

<a id="prop-u3-33-normalization"></a>

<!-- formal-statement-start -->
> **命題（自己正規化と有効標本数の限界）**  
> 正の $L_1,\ldots,L_N$ について $1\le\mathrm{ESS}_N\le N$。また、独立な $Y_i\sim N(\lambda,1)$ からの $L_i=L_\lambda(Y_i)$ では

$$
\frac{\mathrm{ESS}_N}{N}\longrightarrow e^{-\lambda^2}
\quad\text{ほとんど確実に}\quad(N\to\infty).
$$

> さらに、$a\in\mathbb R$、$\lambda\ne0$、$N=1$ の閾値事象について、自己正規化推定量 $\widehat\pi_{\mathrm{SN}}=\sum_iL_i\boldsymbol1_{\{Y_i\ge a\}}/\sum_iL_i$ は一般に不偏ではなく、

$$
E_{g_\lambda}[\widehat\pi_{\mathrm{SN}}]
=\overline\Phi(a-\lambda)\ne\overline\Phi(a).
$$
<!-- formal-statement-end -->

**証明の見取り図**：ESSの上下界は非負数の和と二乗和の不等式です。極限には尤度比の一次・二次モーメントを計算して大数の法則を適用します。自己正規化の偏りは、標本数1にすれば分母と分子の重みが消える直接反例で確かめられます。

<!-- proof-start -->
### 証明

各 $L_i>0$ なので $\sum_iL_i^2\le(\sum_iL_i)^2$ からESSは1以上です。一方、Cauchy–Schwarzの不等式 $\left(\sum_iL_i\right)^2\le N\sum_iL_i^2$ からESSは $N$ 以下です。

正規シフトの一次モーメントは、密度比の定義から $E_g[L]=\int\phi(y)dy=1$ です。二次モーメントは前命題の平方完成を全実数にわたり積分して

$$
E_g[L^2]=e^{\lambda^2}\int_{-\infty}^\infty\phi(y+\lambda)\,dy=e^{\lambda^2}.
$$

いずれも有限なので大数の法則を $L_i$ と $L_i^2$ の独立標本平均に適用すると、

$$
\frac{\mathrm{ESS}_N}{N}
=\frac{(N^{-1}\sum_iL_i)^2}{N^{-1}\sum_iL_i^2}
\longrightarrow\frac{1^2}{e^{\lambda^2}}.
$$

$N=1$ の自己正規化では、$L_1>0$ により $\widehat\pi_{\rm SN}=\boldsymbol1_{\{Y_1\ge a\}}$ です。提案分布の平均は $\lambda$ なので期待値は $\overline\Phi(a-\lambda)$。$\overline\Phi$ は厳密に減少するから $\lambda\ne0$ では目標 $\overline\Phi(a)$ に一致しません。
<!-- proof-end -->

例えば $\lambda=2$ の提案で大標本ESS比は $e^{-4}\simeq0.0183$、$\lambda=8$ なら $e^{-64}$ に落ちます。**ESSが小さいから必ず閾値事象推定の分散が大きい**とは限りません。実際 $\lambda=2$ はこのデジタル契約で分散を減らす一方、全経路重みのESSは低いのです。ESSは重み退化を知らせる追加の警報であり、精度の判定は[閾値事象の二乗モーメント](#prop-u3-33-shift-variance)と標本の反復分散、費用で行います。

