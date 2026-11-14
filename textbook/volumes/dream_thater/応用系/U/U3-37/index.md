# U3-37 Monte Carlo Greeks と手法横断ベンチマーク

[前講の LSM](../U3-36/index.md#prop-u3-36-holdout-lower)では、価格の推定値と、その推定値がどの対象を評価しているかを区別しました。ところが価格を出せても、株価やボラティリティが少し動いたときの**感応度**を知るにはもう一段階必要です。[U3-20 の Greeks](../U3-20/index.md#def-u3-20-greeks)は解析価格を微分できる場合には便利ですが、経路依存商品の価格は積分や数値実験でしか表せないことがあります。

本講の中心問いは「**標本平均の中を微分してよい条件は何か。そして速さと精度を、異なる数値手法でどう公平に比較するか**」です。差分法、経路微分法、尤度比法を同一の欧州型商品で導出し、最後に解析式、木、偏微分方程式（PDE）、通常 Monte Carlo、多層 Monte Carlo（MLMC）を並べます。数理ファイナンスの価格付け用の測度 $Q$ と、実現損益を表す測度 $P$ は混同しません。

## 1. 何を固定して微分するか

時刻0の権利落ち株価を $s>0$ 円、行使価格を $K>0$ 円、満期を $T>0$ 年、定数の連続複利金利を $r\in\mathbb R$ 年$^{-1}$、連続配当利回りを $q\ge0$ 年$^{-1}$、ボラティリティを $\sigma>0$ 年$^{-1/2}$ とします。取引費用、デフォルト、税はなく、リスク中立 $Q$ 下では[配当付き幾何 Brown 運動](../U3-19/index.md#thm-u3-19-bsm-dividend)です。独立な標準正規変数 $Z_i\sim N(0,1)$ を用意し、

$$
a_\sigma=(r-q-\sigma^2/2)T,\qquad b_\sigma=\sigma\sqrt T,\qquad D=e^{-rT},
$$

$$
S(s,\sigma,Z)=s\exp(a_\sigma+b_\sigma Z),\qquad
X(s,\sigma,Z)=D(S(s,\sigma,Z)-K)_+.
$$

とします。$Z$ の確率法則は $s,\sigma$ に依存せず、$X$ は円建てです。[リスク中立割引支払標本と価格の標本平均](../U3-26/index.md#def-u3-26-mc-estimator)から

$$
C(s,\sigma)=E_Q[X(s,\sigma,Z)]
$$

です。以下、Delta は $s$ だけを、Vega は $\sigma$ だけを微分し、その他の $K,r,q,T$ を固定します。Vega はボラティリティを $0.01$ 変化させた価格差そのものではありません。$T=0$ や $\sigma=0$ の特異な境界には以下の証明をそのまま適用しません。

この設定の [Black–Scholes の Greeks 公式](../U3-20/index.md#thm-u3-20-bsm-greeks)は、数値推定量と照合する**別経路の正解**を与えます。

$$
\Delta_C=e^{-qT}\Phi(d_1),\qquad
\mathcal V_C=s e^{-qT}\phi(d_1)\sqrt T,
$$

$$
d_1=\frac{\log(s/K)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}.
$$

例えば $s=K=100$ 円、$r=0.05$、$q=0.02$、$\sigma=0.20$、$T=1$ 年では $d_1=0.25$、$\Delta_C\approx0.586851$、$\mathcal V_C\approx37.901158$ です。

## 2. 共通乱数による中心差分

価格の閉形式を直接微分できなくても、株価を少しずらした**二つの価格**の差から Delta を近似できます。しかし二つの価格を別々の乱数で評価すると、差は標本雑音に埋もれやすくなります。同じ $Z_i$ を両側で使えば、経路ごとに二つの支払額を直接打ち消せます。

<a id="def-u3-37-crn-fd"></a>

<!-- formal-statement-start -->
> **定義（共通乱数中心差分 Delta 推定量）**  
> 上の欧州型 call の条件のもと、$0<h<s$、整数 $N\ge2$ と、互いに独立でいずれも標準正規分布 $N(0,1)$ に従う $Z_1,\ldots,Z_N$ に対して

$$
Y_{h,i}=\frac{X(s+h,\sigma,Z_i)-X(s-h,\sigma,Z_i)}{2h},
\qquad
\widehat\Delta_{h,N}=\frac1N\sum_{i=1}^N Y_{h,i}
$$

> とする。同じ $i$ の分子では**同一の** $Z_i$ を両価格に使い、異なる $i$ は独立とする。$Y_{h,i}$ の単位は円/円（株数に対応）である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-37-crn-fd -->
**定義の確認**：$s=K=100$ 円、$h=1$ 円、$r=q=0$、$\sigma=0.2$、$T=1$ 年、$Z_1=0$ とします。$S(101,0.2,0)=101e^{-0.02}$ 円、$S(99,0.2,0)=99e^{-0.02}$ 円で、両者とも100円未満です。従って $Y_{1,1}=0$ です。$Z_2=1$ なら両者とも100円超なので、$Y_{1,2}=e^{0.18}$ です。**同じ乱数の両側を使う**という定義の条件を確認でき、二つの標本は異なる正規乱数から作ります。この固定数値例自体はランダム標本の独立性を証明するものではありません。
<!-- definition-example-end -->

<a id="prop-u3-37-fd-error"></a>

<!-- formal-statement-start -->
> **命題（中心差分のバイアスと共通乱数の分散）**  
> $C(s,\sigma)$ が区間 $[s-h,s+h]$ 上で3回連続微分可能で、$C_{sss}$ が有界とする。前述の共通乱数推定量は

$$
E[\widehat\Delta_{h,N}]
=\frac{C(s+h,\sigma)-C(s-h,\sigma)}{2h},
$$

$$
\left|E[\widehat\Delta_{h,N}]-\Delta_C\right|
\le \frac{h^2}{6}
\sup_{u\in[s-h,s+h]}|C_{sss}(u,\sigma)|.
$$

> さらに $A_Z=\exp(a_\sigma+b_\sigma Z)$ と置くと

$$
\operatorname{Var}(\widehat\Delta_{h,N})
=\frac{\operatorname{Var}(Y_{h,1})}{N}
\le\frac{D^2E[A_Z^2]}N<\infty.
$$

> この上界は $h\downarrow0$ でも発散しない。同じ二価格を相互に独立な乱数で推定した場合、一般に分散は $h^{-2}/N$ の次数になる。
<!-- formal-statement-end -->

### 証明の見取り図

[中心差分の局所誤差](../U3-20/index.md#prop-u3-20-central-difference)は**価格の滑らかさ**から出ます。一方、標本誤差は一つの支払額の差の分散で決まり、同じ正規乱数を共有したときにだけ経路ごとに差が小さくなります。

<!-- proof-start -->
### 証明

期待値の線形性を二つの $X$ に適用し、$E[X(s\pm h,\sigma,Z)]=C(s\pm h,\sigma)$ を代入すると、期待値の等式を得ます。価格関数の Taylor 展開を $s$ の両側で行うと、ある $\xi_+\in(s,s+h)$ と $\xi_-\in(s-h,s)$ について

$$
C(s+h)=C(s)+hC_s(s)+\frac{h^2}2 C_{ss}(s)+\frac{h^3}6 C_{sss}(\xi_+),
$$

$$
C(s-h)=C(s)-hC_s(s)+\frac{h^2}2 C_{ss}(s)-\frac{h^3}6 C_{sss}(\xi_-).
$$

ここでは $\sigma$ を固定して表示から省きました。差を $2h$ で割れば誤差は $h^2\{C_{sss}(\xi_+)+C_{sss}(\xi_-)\}/12$ です。よって上記の評価を得ます。

次に $f(x)=(x-K)_+$ は $|f(x)-f(y)|\le|x-y|$ を満たし、$S(s\pm h,\sigma,Z)=(s\pm h)A_Z$ です。したがって

$$
|Y_{h,1}|
\le \frac{D|(s+h)A_Z-(s-h)A_Z|}{2h}
=DA_Z.
$$

$E[A_Z^2]=\exp(2a_\sigma+2b_\sigma^2)<\infty$ なので、独立な経路平均の分散は $\operatorname{Var}(Y_{h,1})/N\le E[Y_{h,1}^2]/N\le D^2E[A_Z^2]/N$ です。逆に両側に独立な標本を使う場合、平均の差の分散は

$$
\frac{\operatorname{Var}(X(s+h,\sigma,Z))
+\operatorname{Var}(X(s-h,\sigma,Z))}{4h^2N}.
$$

$\sigma,T,s,K>0$ の call では $X$ は非退化なので、$h\downarrow0$ で分子は正の定数に近づきます。従って $h^{-2}/N$ の次数です。
<!-- proof-end -->

**注意**：差分の95%区間はまず「幅 $h$ の差分近似値」の期待値を対象にします。真の Delta へそのまま95%被覆を主張するには、$O(h^2)$ の系統誤差を標準誤差より十分小さくするか、別途バイアスを評価する必要があります。また丸め誤差は極端に小さい $h$ で増えます。

## 3. 経路微分法：期待値と微分を交換する

同じ $Z$ を固定したとき、株価と変動率が変わる影響を直接微分できるなら、差分幅を選ぶ必要がありません。ただしペイオフの折れ目や指示関数の跳びは、交換の可否を左右します。

<a id="def-u3-37-pathwise"></a>

<!-- formal-statement-start -->
> **定義（欧州型 call の経路微分推定量）**  
> 第1節の条件のもと、独立な $Z_i\sim N(0,1)$ から作った $S_i=S(s,\sigma,Z_i)$ に対し、次の標本平均を経路微分（pathwise）Delta、Vega 推定量とする。

$$
\widehat\Delta_{\rm PW}
=\frac{D}{N}\sum_{i=1}^N
\mathbf1_{\{S_i>K\}}\frac{S_i}{s},
$$

$$
\widehat{\mathcal V}_{\rm PW}
=\frac{D}{N}\sum_{i=1}^N
\mathbf1_{\{S_i>K\}}S_i(\sqrt T Z_i-\sigma T).
$$

> $N\ge2$ とし、$S_i=K$ の事象は確率0なので、その事象で微分の値を0と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-37-pathwise -->
**定義の確認**：$s=K=100$ 円、$r=q=0,\sigma=0.2,T=1$ 年なら、$Z=0$ で $S=100e^{-0.02}<K$ なので両感応度の一経路寄与は0です。$Z=1$ で $S=100e^{0.18}>K$ なので寄与はそれぞれ $e^{0.18}$ と $100e^{0.18}(1-0.2)$ 円です。二次モーメントが存在することは次の命題で確認します。両標本は同じ公式・固定引数を使い、あとは独立な正規乱数列で平均します。
<!-- definition-example-end -->

<a id="prop-u3-37-pathwise-unbiased"></a>

<!-- formal-statement-start -->
> **命題（call の経路微分 Delta・Vega の不偏性）**  
> $s,K,T,\sigma>0$、$r\in\mathbb R$、$q\ge0$、上記の厳密 GBM 満期標本とする。すると経路微分推定量はともに二乗可積分で、

$$
E[\widehat\Delta_{\rm PW}]=\frac{\partial C}{\partial s},
\qquad
E[\widehat{\mathcal V}_{\rm PW}]=\frac{\partial C}{\partial\sigma}.
$$

> それぞれの標本平均の分散は一経路の分散の $1/N$ であり、差分幅のバイアスを持たない。
<!-- formal-statement-end -->

### 証明の見取り図

株価 $S=sA_Z$ の初値微分は $A_Z=S/s$、変動率微分は $S(\sqrt T Z-\sigma T)$ です。call の折れ目は1点にありますが、連続密度を持つ $S$ がそこに一致する確率は0です。さらに有限な支配関数があることまで確認して、初めて期待値と微分を交換できます。

<!-- proof-start -->
### 証明

$S=s\exp(a_\sigma+b_\sigma Z)$ を直接微分します。初値では指数部が $s$ に依存しないので $\partial_s S=S/s$ です。ボラティリティでは

$$
\partial_\sigma(a_\sigma+b_\sigma Z)
=-\sigma T+\sqrt T Z,
\qquad
\partial_\sigma S=S(\sqrt T Z-\sigma T).
$$

$x\mapsto(x-K)_+$ の導関数は $x>K$ で1、$x<K$ で0です。[満期株価の対数正規分布](../U3-14/index.md#prop-u3-14-lognormal-law)により $S$ は正の領域上で連続密度を持つので $Q(S=K)=0$。従って、固定された $Z$ に関してほとんど確実に

$$
\partial_s X=D\mathbf1_{\{S>K\}}S/s,\qquad
\partial_\sigma X=D\mathbf1_{\{S>K\}}S(\sqrt T Z-\sigma T).
$$

初値を $s$ の小さな正の近傍に制限すると、差分近似値の絶対値は $DA_Z$ 以下なので $E[DA_Z]<\infty$ を利用できます。変動率をコンパクト区間 $[\sigma_-,\sigma_+]\subset(0,\infty)$ に制限すると、平均値の定理と $x_+$ の Lipschitz 性より差分近似値は

$$
D\sup_{u\in[\sigma_-,\sigma_+]}
s\exp((r-q-u^2/2)T+u\sqrt T Z)\,
|\sqrt T Z-uT|
$$

以下です。これは $Z$ の正規分布の指数モーメントと多項式モーメントから可積分です。支配収束定理で両微分を期待値の内側へ入れられます。二乗の場合も指数モーメントと $Z^2$ の積の期待値が有限なので、独立標本平均の分散則が適用できます。
<!-- proof-end -->

この命題は「**価格が滑らかなら、任意のペイオフを経路ごとに微分してよい**」とは言っていません。たとえば固定額の現金を支払うデジタル call

$$
g_{\rm dig}(S)=\mathbf1_{\{S>K\}},\qquad
V_{\rm dig}(s)=D\Phi(d_2),
$$

$$
d_2=\frac{\log(s/K)+(r-q-\sigma^2/2)T}{\sigma\sqrt T}
$$

では、実現経路上の指示関数はほとんど確実に局所定数なので微分すると0です。しかし解析価格の Delta は

$$
\frac{\partial V_{\rm dig}}{\partial s}
=\frac{D\phi(d_2)}{s\sigma\sqrt T}>0.
$$

跳びの位置が $s$ とともに動き、**変わる経路の割合**を微分の外に出してしまうことが失敗の理由です。差分近似値の一様可積分性を確保できず、経路微分の積分交換が破れます。

## 4. 尤度比法：確率密度の側を微分する

デジタルのようにペイオフが跳んでも、満期株価の**確率密度**は滑らかです。そこで既習の[スコア関数の定義](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-score)に従い、密度のパラメータ微分を元の密度で割った重みを作ります。ここでは満期株価の対数正規密度にその定義を具体的に代入します。この重みで支払額を平均する方法を尤度比法（likelihood-ratio method）といいます。

その判定に使う密度は、[満期株価の対数正規分布](../U3-14/index.md#prop-u3-14-lognormal-law)を、固定した満期株価の値 $x>0$ へ書き直したものです。第1節の $a_\sigma,b_\sigma$ を使い、標準化値とその密度を

$$
z(x;s,\sigma)=\frac{\log(x/s)-a_\sigma}{b_\sigma},
\qquad
f(x;s,\sigma)=\frac{\phi(z(x;s,\sigma))}{x\sigma\sqrt T}
$$

と表します。$x$ は評価する株価であり、以下の $\partial_s,\partial_\sigma$ は **$x$ を固定して** パラメータだけを動かす偏微分です。経路微分で固定した標準正規 $Z$ と、ここで固定する $x$ は異なる対象です。

<a id="def-u3-37-lr"></a>

<!-- formal-statement-start -->
> **定義（対数正規密度のスコアと尤度比 Greeks）**  
> 第1節の $S=S(s,\sigma,Z)$ の密度 $f(x;s,\sigma)$（$x>0$）に対して、パラメータ方向の対数微分係数を

$$
L_s(x)=\partial_s\log f(x;s,\sigma),
\qquad L_\sigma(x)=\partial_\sigma\log f(x;s,\sigma)
$$

> とし、任意の**パラメータに依存しない**可測支払関数 $g(x)$ で必要な積分が有限な場合、$Dg(S_i)L_s(S_i)$、$Dg(S_i)L_\sigma(S_i)$ の独立標本平均を尤度比 Delta、Vega 推定量とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-37-lr -->
**定義の確認**：$g(x)=(x-K)_+$ はパラメータ $s,\sigma$ を**直接には含まず**、すべての $x>0$ で同じ支払関数です。上記の密度は $x>0$、$s,\sigma,T>0$ で正なので対数を取れます。固定した $x$ について $\log f=-\log x-\log\sigma-\frac12\log T-\frac12\log(2\pi)-z^2/2$ です。商の微分を用いると

$$
\partial_s z=-\frac1{s\sigma\sqrt T},
\qquad
\partial_\sigma z=\sqrt T-\frac z\sigma.
$$

従って、連鎖律から $L_s=-z\partial_s z$、$L_\sigma=-1/\sigma-z\partial_\sigma z$ です。ここまで **$x$ を固定して微分した後に** $Z=0$ に対応する $x=s e^{a_\sigma}$ を代入すると $z=0$ となり、

$$
L_s=0,\qquad L_\sigma=-\frac1\sigma
$$

を得ます。密度と支払関数の条件を確認した上で、定義の二つのパラメータ微分を実際に評価しました。$x=s e^{a_\sigma}$ を最初から代入して $x$ まで微分する操作は、ここでのスコアの定義とは異なります。
<!-- definition-example-end -->

<a id="prop-u3-37-lr-identities"></a>

<!-- formal-statement-start -->
> **命題（GBM の尤度比 Delta・Vega とデジタル感応度）**  
> $s,K,T,\sigma>0$、$r\in\mathbb R$、$q\ge0$ とする。$x>0$ の対数正規密度のスコアを $x=S(s,\sigma,Z)$ で評価すると

$$
L_s(S)=\frac{Z}{s\sigma\sqrt T},
\qquad
L_\sigma(S)=\frac{Z^2-1}{\sigma}-\sqrt T Z.
$$

> $g(x)=(x-K)_+$ または $g(x)=\mathbf1_{\{x>K\}}$ とすると、次の公式が成り立ち、右辺の確率変数は二乗可積分である。

$$
\frac{\partial}{\partial\theta} E[Dg(S)]
=E[Dg(S)L_\theta(S)]
\quad(\theta=s,\sigma).
$$

> 特にデジタル call の Delta は $D\phi(d_2)/(s\sigma\sqrt T)$ であり、尤度比推定の期待値と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

密度の対数には、分散に由来する $-\log\sigma$ と、標準化値 $z$ に由来する $-z^2/2$ が入ります。両方を微分してから支払額を掛けます。ペイオフそのものを微分しないので、デジタルの跳びが障害になりません。

<!-- proof-start -->
### 証明

$z=z(x;s,\sigma)$ を $x$ を固定した標準化値とすると

$$
z=\frac{\log(x/s)-(r-q-\sigma^2/2)T}{\sigma\sqrt T},
\quad
f(x;s,\sigma)=\frac{\phi(z)}{x\sigma\sqrt T}.
$$

$\log f=-\log x-\log\sigma-\tfrac12\log T-\tfrac12\log(2\pi)-z^2/2$ です。固定した $x$ について

$$
\partial_s z=-\frac1{s\sigma\sqrt T},
\qquad
\partial_\sigma z=\sqrt T-\frac z\sigma.
$$

よって

$$
\partial_s\log f=-z\partial_s z=\frac z{s\sigma\sqrt T},
$$

$$
\partial_\sigma\log f
=-\frac1\sigma-z\left(\sqrt T-\frac z\sigma\right)
=\frac{z^2-1}\sigma-\sqrt T z.
$$

$x=S(s,\sigma,Z)$ を代入すると $z=Z$ です。$E[Dg(S)]=\int_0^\infty Dg(x)f(x;s,\sigma)\,dx$ の被積分関数を、$(s,\sigma)$ の内部のコンパクト近傍で微分します。そこでの密度とそのパラメータ導関数には、$\log x$ の二次式による減衰と高々多項式・一次の $x$ の増大しか現れません。変数 $y=\log x$ に置換すれば、近傍で共通の積分可能な正規型上界を作れます。したがって指示関数と線形増大の call のどちらでも微分と積分の交換が許されます。

$\partial_\theta f=f L_\theta$ を積分に代入して公式を得ます。スコアは $Z$ の二次式以下で、call は定数倍の $e^{b_\sigma Z}$ 以下なので、積の二乗も正規の指数モーメントから可積分です。デジタルの場合は $D\Phi(d_2)$ を $s$ で微分して

$$
\partial_s(D\Phi(d_2))
=D\phi(d_2)\partial_s d_2
=\frac{D\phi(d_2)}{s\sigma\sqrt T}>0
$$

となり、尤度比公式と一致します。
<!-- proof-end -->

尤度比法は不連続 payoff に対応できますが、スコアの $1/(\sigma\sqrt T)$ により、短い満期や小変動率で推定分散が大きくなり得ます。**適用可能であることと効率がよいことは別問題**です。

## 5. 誤差・信頼区間・比較費用を分離する

同じ基準値 $G=\partial_\theta C$ に対して、推定量 $\widehat G$ の誤差を測ります。支払額から得た標本 $H_i$ が互いに独立で同じ分布に従うなら、標本平均 $\bar H$ と標本分散

$$
s_H^2=\frac1{N-1}\sum_{i=1}^N(H_i-\bar H)^2
$$

を計算します。以下の定義は[Monte Carlo の標準誤差](../U3-26/index.md#prop-u3-26-clt-interval)と[MLMC の誤差分解](../U3-31/index.md#prop-u3-31-telescope)を、**共通の比較表**にまとめるためのものです。

<a id="def-u3-37-benchmark"></a>

<!-- formal-statement-start -->
> **定義（手法横断ベンチマークの誤差と費用）**  
> 同じ $s,K,r,q,\sigma,T$、同じ欧州型 call の $Q$ 価格 $V$ を基準とし、各手法の近似値 $\widehat V$ に対して、価格の符号付き誤差 $e=\widehat V-V$、絶対誤差 $|e|$、実測計算秒数、および内部で計算した時間刻み数・格子点数・経路数を記録する。乱数法には標本標準誤差（またはレベル別分散から計算した値）も併記する。偏微分の近似については同じ定義を $G$ に適用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-37-benchmark -->
**定義の確認**：真値 $V=10.00$ 円、近似値 $9.80$ 円、推定標準誤差 $0.10$ 円、実行時間 $0.20$ 秒なら $e=-0.20$ 円、$|e|=0.20$ 円、$e/\widehat{\rm SE}=-2$ です。同じ数値でも、木・PDE なら標準誤差を「0」と表示せず**該当なし**とし、刻み誤差を調べます。秒数は実行環境に依存するので機械の異なる計測結果を無条件に順位付けしません。
<!-- definition-example-end -->

<a id="prop-u3-37-mse-budget"></a>

<!-- formal-statement-start -->
> **命題（数値 Greeks の二乗平均誤差予算）**  
> $E[\widehat G^2]<\infty$、目標感応度を定数 $G$ とする。すると

$$
E[(\widehat G-G)^2]
=\operatorname{Var}(\widehat G)
+(E[\widehat G]-G)^2.
$$

> 共通乱数中心差分では前掲の滑らかさのもと、右辺は $O(N^{-1})+O(h^4)$ 以下である。経路微分法と尤度比法は第3・4節の条件で不偏なので、それぞれ分散項だけになる。
<!-- formal-statement-end -->

### 証明の見取り図

標本数を増やせば分散は減ります。しかし差分幅を固定したままでは、差分近似値と真の導関数との差は残ります。値の小ささだけでなく、**どの誤差が消えていないか**を記録します。

<!-- proof-start -->
### 証明

$\mu=E[\widehat G]$ として $\widehat G-G=(\widehat G-\mu)+(\mu-G)$ と分け、二乗して期待値を取ります。交差項は

$$
2(\mu-G)E[\widehat G-\mu]=0
$$

です。残りが分散とバイアスの二乗です。[中心差分の誤差・分散命題](#prop-u3-37-fd-error)を代入すると、バイアスは $O(h^2)$、分散は $O(N^{-1})$ なので主張を得ます。経路微分と尤度比には[各々の不偏性](#prop-u3-37-pathwise-unbiased)と[本章の尤度比命題](#prop-u3-37-lr-identities)を代入し、バイアス項が0です。
<!-- proof-end -->

| 方法 | 推定対象 | 主なバイアス | 不確実性の示し方 |
| --- | --- | --- | --- |
| 解析 Black–Scholes | 同じ GBM の欧州型 call | 浮動小数点丸め | 決定論的基準 |
| CRR 二項木 | 連続 GBM 価格の近似 | 時間刻み、振動 | 刻み別の真値差 |
| Black–Scholes PDE 差分 | 同じ PDE の解 | 空間・時間刻み、有限領域境界 | 格子を変えた真値差 |
| 厳密満期 GBM の通常 MC | 同じ GBM 価格 | 時間離散化バイアスなし | 経路間標本分散と正規近似区間 |
| Euler–Maruyama + MLMC | 最細 EM レベルの期待値 | 最細格子と厳密 GBM の差 | レベル別標本分散の和 |
| 共通乱数差分 Greek | 差分幅 $h$ の価格商 | $O(h^2)$ | 経路別差分の標準誤差 |
| 経路微分／尤度比 Greek | 真の感応度 | 条件内では0 | 経路別微分／スコアの標準誤差 |

正規近似の区間 $\bar H\pm1.96s_H/\sqrt N$ は、[中心極限定理による価格区間](../U3-26/index.md#prop-u3-26-clt-interval)のように、**その推定量の期待値**について大標本で使います。MLMC では独立なレベル平均の分散を足して正規近似を検討します。格子バイアスが残ると、**厳密な連続モデルの価格**を覆う95%区間と同一視できません。

## 6. 再現実験：一つの call を五つの方法で計算する

添付の [benchmark_greeks.py](assets/benchmark_greeks.py) は Python 3 の標準ライブラリのみで動きます。固定シード、配当付き Black–Scholes 閉形式、CRR 木、対数株価上の陽的 PDE 格子、厳密満期 GBM による通常 MC、Euler 結合差分による MLMC を一つの価格基準で比較します。さらに同じ独立な正規標本を使って、Delta・Vega の共通乱数中心差分、経路微分、尤度比を数値検算します。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-37/assets/benchmark_greeks.py
~~~

設定は $s=K=100$ 円、$r=0.05$ 年$^{-1}$、$q=0.02$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$T=1$ 年です。[配当付き Black–Scholes 価格](../U3-19/index.md#thm-u3-19-bsm-dividend)から $d_1=0.25,d_2=0.05$、

$$
C=100e^{-0.02}\Phi(0.25)-100e^{-0.05}\Phi(0.05)
\approx9.227005508\ \text{円}
$$

が既知です。プログラムは真値と各価格の差、経路数・格子数・総更新回数、実時間を出します。**実時間は環境依存なので教材内に架空の測定秒数は固定しません。**

- CRR は $n=100,200$ ステップ、PDE は二つの格子幅を比較する。両者の誤差が単調減少するとは仮定しない。
- MC は厳密 GBM 終端を使うので時間離散化誤差がない。正規区間は標本誤差の指標で、有限試行で真値を必ず覆う保証ではない。
- MLMC は[粗細結合の望遠和](../U3-31/index.md#prop-u3-31-telescope)を用い、細格子と粗格子で**同じ Brown 増分**を使う。別レベルは独立に作る。期待値は厳密 GBM ではなく最細 Euler 価格であり、標本数を増やしてもそのバイアスは残る。
- 価格の誤差と Greeks の誤差は別の列に置く。複数の独立反復で誤差分布を見る場合は、毎回シードを変えて実行時間を含む費用と被覆を比較する。

同じ商品でも、各アルゴリズムは1回の関数評価・1ステップ・1経路で仕事量が異なります。総更新回数と実測秒数を併記した上で、**横軸を費用、縦軸を絶対誤差**として複数予算を測るのが公平です。1回のランで偶然誤差が小さい手法を「高精度」と断言しません。経路依存や不連続 payoff に対象を変えれば、解析解・木・PDE に必要な状態や、経路微分の可否まで変化します。

## 7. 演習と詳細解答

### Level A：一経路の操作を確実にする

<a id="ex-u3-37-a1"></a>
### U3-37-A1：共通乱数中心差分

- Level: A

$D=1$、$S(s,Z)=s e^{0.1Z}$、$s=K=100$ 円、$h=1$ 円、$Z=0$ とする。call の経路別中心差分を計算せよ。

<!-- solution-start -->
**詳細解答**：$Z=0$ なら $S(101,0)=101$ 円、$S(99,0)=99$ 円です。従って支払額はそれぞれ1円、0円であり、[中心差分の定義](#def-u3-37-crn-fd)から

$$
Y_{1}=\frac{(101-100)_+-(99-100)_+}{2}
=\frac{1-0}{2}=0.5.
$$

同じ $Z=0$ を二価格に使い、真の Delta でなく**この経路の差分近似値**を求めました。
<!-- solution-end -->

<a id="ex-u3-37-a2"></a>
### U3-37-A2：経路微分 Delta

- Level: A

$D=0.95$、$s=100$ 円の call で、ある経路の満期株価が120円、行使価格が110円であった。経路微分 Delta の一経路寄与を求めよ。同じ条件で $K=130$ 円ならどうか。

<!-- solution-start -->
**詳細解答**：[経路微分の定義](#def-u3-37-pathwise)は $D(S/s)\mathbf1_{\{S>K\}}$ です。$120>110$ なので

$$
0.95\frac{120}{100}=1.14
$$

です。$K=130$ なら $120<130$ で指示関数が0なので寄与も0です。これらは標本平均の一項であって、真の Delta が必ず1.14あるいは0という意味ではありません。
<!-- solution-end -->

<a id="ex-u3-37-a3"></a>
### U3-37-A3：尤度比スコア

- Level: A

$s=100$ 円、$\sigma=0.2$ 年$^{-1/2}$、$T=1$ 年、$Z=1$ のとき、$L_s(S)$ と $L_\sigma(S)$ を計算せよ。

<!-- solution-start -->
**詳細解答**：[スコアの式](#prop-u3-37-lr-identities)へ順に代入します。

$$
L_s=\frac1{100\cdot0.2\cdot1}=0.05,
$$

$$
L_\sigma=\frac{1^2-1}{0.2}-1\cdot1=0-1=-1.
$$

$L_s$ は株価を円で1変化させるパラメータの逆単位、$L_\sigma$ は変動率を年$^{-1/2}$ で1変化させる逆単位です。
<!-- solution-end -->

<a id="ex-u3-37-a4"></a>
### U3-37-A4：標準誤差と区間

- Level: A

独立な Delta 寄与 $N=400$ 個の標本標準偏差が $0.8$、平均が $0.60$ であった。標準誤差と正規近似95%区間を求め、何の区間か説明せよ。

<!-- solution-start -->
**詳細解答**：[MC の標準誤差と区間](../U3-26/index.md#prop-u3-26-clt-interval)より

$$
\widehat{\rm SE}=\frac{0.8}{\sqrt{400}}=0.04,
$$

$$
0.60\pm1.96(0.04)
=[0.5216,\ 0.6784].
$$

経路微分・尤度比など不偏推定量では、大標本の近似として真の Delta を対象とします。差分法なら中心は差分近似値の期待値で、有限 $h$ のバイアスが別に残ります。
<!-- solution-end -->

<a id="ex-u3-37-a5"></a>
### U3-37-A5：バイアスと標本誤差

- Level: A

真の感応度が $0.60$、推定量の期待値が $0.58$、分散が $0.0009$ とする。バイアス・二乗平均誤差・二乗平均平方根誤差を求めよ。

<!-- solution-start -->
**詳細解答**：[二乗平均誤差予算](#prop-u3-37-mse-budget)のバイアスは $0.58-0.60=-0.02$ です。従って

$$
\operatorname{MSE}=0.0009+(-0.02)^2=0.0013,
$$

$$
\operatorname{RMSE}=\sqrt{0.0013}\approx0.03606.
$$

標準偏差 $0.03$ だけを報告すると、系統誤差の二乗 $0.0004$ を落としてしまいます。
<!-- solution-end -->

### Level B：各推定の根拠と失敗を検証する

<a id="ex-u3-37-b1"></a>
### U3-37-B1：独立乱数を使った差分の分散

- Level: B

二つの価格推定で各 $N$ 経路を使う。$X(s+h)$、$X(s-h)$ の分散がともに $v$ と近似できるとする。乱数を独立に引いた中心差分平均の分散を求め、$h$ を半分にした場合を述べよ。

<!-- solution-start -->
**詳細解答**：独立な二標本平均 $\bar X_+$ と $\bar X_-$ の共分散は0です。従って

$$
\operatorname{Var}\!\left(\frac{\bar X_+-\bar X_-}{2h}\right)
=\frac{\operatorname{Var}(\bar X_+)+\operatorname{Var}(\bar X_-)}{4h^2}
=\frac{v/N+v/N}{4h^2}
=\frac{v}{2Nh^2}.
$$

$h$ を半分にすれば分母の $h^2$ は4分の1になり、分散は4倍、標準誤差は2倍です。共通乱数なら[経路差分の分散上界](#prop-u3-37-fd-error)が $h$ に依存しないため、同じ議論をしてはいけません。
<!-- solution-end -->

<a id="ex-u3-37-b2"></a>
### U3-37-B2：デジタルの経路微分はなぜ失敗するか

- Level: B

$V_{\rm dig}(s)=e^{-rT}Q(S_T>K)$ とし、$S_T$ は連続な確率密度を持つ GBM とする。経路微分が0を返す理由と、真の Delta を導出せよ。

<!-- solution-start -->
**詳細解答**：固定された標準正規 $Z$ に対し $S_T=sA_Z$ です。$sA_Z\ne K$ なら $s$ の十分小さな近傍で $\mathbf1_{\{sA_Z>K\}}$ は変化せず、導関数は0です。$Q(S_T=K)=0$ なので、経路別導関数はほとんど確実に0です。一方、[配当付き GBM の行使確率の表示](../U3-19/index.md#thm-u3-19-bsm-dividend)で

$$
V_{\rm dig}=e^{-rT}\Phi(d_2),\quad
d_2=\frac{\log(s/K)+(r-q-\sigma^2/2)T}{\sigma\sqrt T}.
$$

$s$ で微分すると $\partial_s d_2=1/(s\sigma\sqrt T)$ ですから

$$
\partial_s V_{\rm dig}
=\frac{e^{-rT}\phi(d_2)}{s\sigma\sqrt T}>0.
$$

これは微分と期待値の交換に必要な支配条件が失われた反例です。対象が不連続なことと、移動する閾値近傍の経路が寄与することを区別します。
<!-- solution-end -->

<a id="ex-u3-37-b3"></a>
### U3-37-B3：スコアの平均は0になる

- Level: B

$Z\sim N(0,1)$ とし、GBM の $\sigma$ スコア $L_\sigma=(Z^2-1)/\sigma-\sqrt T Z$ の期待値が0であることを確認し、定額支払 $g(x)=c$ の Vega を求めよ。

<!-- solution-start -->
**詳細解答**：標準正規の一次・二次モーメント $E[Z]=0,E[Z^2]=1$ を代入すると

$$
E[L_\sigma]
=\frac{1-1}{\sigma}-\sqrt T\,0=0.
$$

定額支払の現在価値は $V=e^{-rT}c$ 円で、$\sigma$ に依存しないので Vega は0です。[尤度比推定量の定義](#def-u3-37-lr)に定額支払 $g(x)=c$ を直接代入すると

$$
E[D c L_\sigma]=DcE[L_\sigma]=0
$$

となり、価格の直接微分と一致します。前掲の不偏性命題が明示的に扱うのは call とデジタルですが、定額支払についてはこの計算で別途確認できました。
<!-- solution-end -->

<a id="ex-u3-37-b4"></a>
### U3-37-B4：MLMC の区間が何を覆うか

- Level: B

MLMC が最細 Euler 格子の期待価格 $E[P_L]=9.18$ 円を対象とし、真の GBM 価格は $9.23$ 円だとする。MLMC の標本平均 $9.20$ 円と推定標準誤差 $0.01$ 円が得られた。95%近似区間を求め、連続モデル価格への結論を述べよ。

<!-- solution-start -->
**詳細解答**：[MLMC の望遠和と分散](../U3-31/index.md#prop-u3-31-telescope)では最細格子の平均を推定します。計算した区間は

$$
9.20\pm1.96(0.01)
=[9.1804,\ 9.2196]\ \text{円}.
$$

標本平均の期待値は9.18円で、連続モデル価格との差は $9.18-9.23=-0.05$ 円です。真値9.23円はこの実現区間の外です。また、推定対象の9.18円も今回の実現区間の下端9.1804円よりわずかに小さい値です。95%は繰り返し標本を取り直したときの**近似的な被覆率**を表し、どの実現区間も推定対象を含むという保証ではありません。まして区間は最細格子期待値を対象としており、連続モデル価格までの0.05円の離散化バイアスを含みません。[誤差の二項分解](#prop-u3-37-mse-budget)では標本誤差と離散化バイアスを別に加算します。
<!-- solution-end -->

### Level C：全手法の比較設計

<a id="ex-u3-37-c1"></a>
### U3-37-C1：価格と感応度の公平な検証計画

- Level: C

$s=K=100$ 円、$r=0.05,q=0.02,\sigma=0.2,T=1$ の欧州型 call を用い、解析式、二項木、PDE 格子、厳密終端 MC、Euler–MLMC と、Delta の差分・経路微分・尤度比法を比較したい。

1. 価格と Delta の基準値を数式で示せ。
2. 各数値法について、標本誤差と離散化・差分バイアスの有無を整理せよ。
3. 共通乱数の差分幅を小さくする際の注意、デジタルに商品を変更した際の推定法の変更、費用の公平な記録方法を説明せよ。

<!-- solution-start -->
**詳細解答**：

**1. 基準値**：[配当付き閉形式](../U3-19/index.md#thm-u3-19-bsm-dividend)では $\log(s/K)=0$ で

$$
d_1=\frac{0+(0.05-0.02+0.20^2/2)}{0.20}=0.25,
\qquad d_2=0.25-0.20=0.05.
$$

従って

$$
C=100e^{-0.02}\Phi(0.25)-100e^{-0.05}\Phi(0.05)
\approx9.227005508,
$$

$$
\Delta=e^{-0.02}\Phi(0.25)\approx0.586851146.
$$

ここで価格は円、Delta は株価1円変化当たりの円の微分です。

**2. 誤差の分類**：解析式は決定的基準で、二項木とPDEは格子の打切り誤差を持ち、いずれも標本分散を持ちません。厳密終端 MC は独立な割引支払額の平均なので不偏で標本誤差を持ち、時間格子バイアスはありません。[MLMC 望遠和](../U3-31/index.md#prop-u3-31-telescope)は最細 Euler 格子に対して不偏ですが、厳密 GBM からの離散化差が残り、レベル別標本分散を足します。差分 Delta は $O(h^2)$ のバイアスと標本分散を持ちます。[経路微分](#prop-u3-37-pathwise-unbiased)と[尤度比法](#prop-u3-37-lr-identities)は、この call と固定モデルでは不偏で、独立標本平均の標準誤差で誤差を測れます。

**3. 実験設計**：差分近似値は両側に同じ $Z$ を使い、幅 $h$ を例えば1、0.5、0.25円と減らします。[共通乱数分散命題](#prop-u3-37-fd-error)では分散が $h^{-2}$ に発散しない一方、極端に小さな差分幅では浮動小数点の減算誤差が増えます。デジタルに変更したときは経路微分の素朴な0推定は使えず、[尤度比公式](#prop-u3-37-lr-identities)か差分法などを使います。木・PDE・MLMC では格子を2水準以上、乱数法は独立反復を複数回、すべて同じ金利・配当・商品・満期・精度尺度で比較します。実時間・関数評価数・経路数・更新数と絶対誤差を記録し、計算量が異なる方法を「経路本数」だけで公平に順位付けしません。
<!-- solution-end -->

## この講義で得たこと

Monte Carlo 価格の感応度は、**価格をずらして差を取る、各経路を微分する、分布の密度を微分する**という三つの異なる方法で得られます。経路微分法の交換条件、尤度比のスコア、共通乱数の相関を確認して初めて推定値の意味が確定します。さらに手法の比較では、標本誤差・離散化誤差・計算費用を同じ表で扱い、同じ連続モデルと商品を基準にすることが必要です。次講 U3-38 では確率分布を特性関数で表現し、Fourier 積分による別経路の価格付けを導きます。
