# ITD4 測定・フィードバックと情報付き第二法則

[ITD3の仕事の下限](../ITD3/index.md#thm-itd3-work-bound)によれば、熱浴に接する系から取り出せる平均仕事は、初期と終期の非平衡自由エネルギーによって制限されます。ところが、系の状態を**測ってから**操作を変える装置なら、測定前には分からなかった偏りを利用できます。系だけを見ると、熱平衡から仕事が取り出されたように見えるのです。

本章の問いは、**測定で得た情報はどの条件で仕事の上限を増やし、どの部分をまだ帳簿に入れていないのか**です。確率的な測定、結果別の操作、経路の逆向き実験を一つずつ作り、情報付き第二法則を有限和から導きます。ここで扱う仕事は**系への制御操作の仕事**であり、センサーや記憶の準備・消去の仕事を最初から含んだものではありません。

空でない有限集合 $X$ を系の状態、$Y$ を有限集合として測定結果とします。温度 $T>0$ の単一熱浴、$k_{\mathrm B}>0$、$\beta=(k_{\mathrm B}T)^{-1}$、有限なエネルギー $E(x,\lambda)$ を用います。

自然対数 $\log$ による情報量は nat、bit 単位への換算は $I_{\mathrm{nat}}=(\ln2)I_2$ です。[SM3の正準分布](../../SM/SM3/index.md#def-sm3-canonical)を $\pi_\lambda$、平衡自由エネルギーを $F_{\mathrm{eq}}(\lambda)$ と書きます。

外部が系にした仕事 $W$ は正、取り出した仕事は $W_{\mathrm{ext}}=-W$ です。浴から系へ入る熱 $Q$ は正で、[ITD1の軌道第一法則](../ITD1/index.md#thm-itd1-first-law)は $\Delta E=W+Q$ です。

## 1. 測定結果は状態そのものではない

箱の左右どちらに粒子がいるかを測る場合を考えます。測定器が「左」と答えても、読み違いがあり得ます。真の状態を $x$、出力を $y$ として、条件付き確率を各組に与える必要があります。これが**測定チャネル**です。[INFO2の確率チャネル](../../../応用系/INFO/INFO2/index.md#def-info2-channel)を、ここでは物理系の状態とセンサーの出力へ具体化します。

測定直前の状態分布を $p_0$ とします。測定が系の状態を変えない、すなわち測定前後の真の状態が同じ $x$ である理想化を置きます。そうして初めて、結果 $y$ を知った後の分布を「測定前の状態に条件付けた分布」と同一視できます。

<a id="def-itd4-measurement"></a>

<!-- formal-statement-start -->
> **定義（有限状態の測定チャネルと事後分布）**  
> 有限集合 $X,Y$ と事前分布 $p_0$ を取る。各 $x\in X$ で $M(y\mid x)\ge0$、$\sum_{y\in Y}M(y\mid x)=1$ を満たす $M$ を測定チャネルとする。測定が $x$ を変化させない場合、結合分布、結果分布、$q(y)>0$ の結果に対する事後分布を

$$
\begin{aligned}
p(x,y)&=p_0(x)M(y\mid x),\\
q(y)&=\sum_{x\in X}p_0(x)M(y\mid x),\\
p_y(x)&=\frac{p_0(x)M(y\mid x)}{q(y)}
\end{aligned}
$$

> と定める。$q(y)=0$ の結果は起こらないため事後分布を定めず、以後の結果の和から除く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd4-measurement -->
### 例：二値センサーを行列から事後分布へ

**定義の確認**：$X=Y=\{0,1\}$、$p_0=(1/2,1/2)$ とします。行を真の状態 $x$、列を読み出し $y$ として

$$
M(y\mid x)=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}_{xy}
$$

と置きます。各成分は非負、各行和は $3/4+1/4=1$ なので、これはチャネルです。結果 $0$ の確率とその事後分布は

$$
q(0)=\frac12\frac34+\frac12\frac14=\frac12,
\qquad
p_{y=0}(0)=\frac{(1/2)(3/4)}{1/2}=\frac34
$$

です。事後分布を $p_{y=0}=(3/4,1/4)$、$p_{y=1}=(1/4,3/4)$ と書くと、どちらも成分が非負で和は1です。添字 $y=0$ は**測定結果が0だった場合**という条件を表し、状態の値 $x=0$ とは役割が違います。測定によって分布を知り直しただけで、物理的な状態 $x$ を $y$ に置き換えたわけではありません。
<!-- definition-example-end -->

測定結果にどれだけ驚いたかは、事前に $q(y)$ が小さかったかだけでは測れません。状態 $x$ を知った場合と知らない場合で、同じ結果 $y$ の起こりやすさがどう違うかを比べます。

<a id="def-itd4-information"></a>

<!-- formal-statement-start -->
> **定義（軌道ごとの測定情報量）**  
> [測定チャネルと事後分布](#def-itd4-measurement)の結合分布 $p(x,y)$ が正の組に対し、測定情報量を

$$
i(x;y)=\log\frac{M(y\mid x)}{q(y)}
=\log\frac{p_y(x)}{p_0(x)}
$$

> と定義する。右辺は $p(x,y)>0$ 上でのみ評価し、そこでは分母も正である。平均測定情報量を

$$
I_{\mathrm{nat}}(X;Y)=\sum_{(x,y):p(x,y)>0}p(x,y)i(x;y)
$$

> と定める。和にない零確率の組の寄与は0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd4-information -->
### 例：一回の情報量は負にもなる

**定義の確認**：直前の二値センサーで $(x,y)=(0,0)$ は確率 $3/8>0$、$M(0\mid0)=3/4$、$q(0)=1/2$ なので $i(0;0)=\log(3/2)$ です。読み違い $(x,y)=(0,1)$ も確率 $1/8>0$ で、$i(0;1)=\log(1/2)=-\log2$ となります。**各回の情報量は負でもよい**のに対し、平均は非負です。$M(y\mid x)=q(y)$ の無情報測定なら、正確率の全組で $i=0$ です。
<!-- definition-example-end -->

<a id="prop-itd4-information-average"></a>

<!-- formal-statement-start -->
> **命題（情報量平均と条件付き相対エントロピー）**  
> 有限集合 $X,Y$、任意の事前分布 $p_0$、[測定チャネル](#def-itd4-measurement) $M$ に対し、$q(y)>0$ の事後分布を $p_y$ とする。[軌道情報量](#def-itd4-information)の平均は

$$
I_{\mathrm{nat}}(X;Y)
=\sum_{y:q(y)>0}q(y)D_{\mathrm{nat}}(p_y\Vert p_0)
\ge0
$$

> である。等号は、すべての $q(y)>0$ について $p_y=p_0$ である場合、かつその場合に限る。これは[INFO1の相互情報量](../../../応用系/INFO/INFO1/index.md#def-info1-mutual-information)の自然対数表示と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

結合分布を $p(x,y)=q(y)p_y(x)$ と分解します。状態 $x$ に着目すると、平均された対数比は事後分布と事前分布の相対エントロピーになります。

<!-- proof-start -->
### 証明

$q(y)>0$ かつ $p_y(x)>0$ のとき、[事後分布の定義](#def-itd4-measurement)から $p_0(x)>0$ と $M(y\mid x)>0$ です。したがって対数比を使えます。

$$
\begin{aligned}
I_{\mathrm{nat}}(X;Y)
&=\sum_{y:q(y)>0}\sum_{x:p_y(x)>0}
q(y)p_y(x)\log\frac{p_y(x)}{p_0(x)}\\
&=\sum_{y:q(y)>0}q(y)D_{\mathrm{nat}}(p_y\Vert p_0).
\end{aligned}
$$

ここで事後分布の支持は事前分布の支持に含まれるため、各相対エントロピーは有限です。[INFO2のGibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)を各 $y$ に適用して非負性を得ます。すべての $q(y)$ は正なので、和が0となるのは各相対エントロピーが0、すなわち全 $p_y=p_0$ のときに限ります。
<!-- proof-end -->

## 2. 結果で仕事の操作を切り替える

測定結果 $y$ を読み、別々のエネルギー準位変更と熱浴接触を行うのが**フィードバック**です。単に結果を記録するだけでは、制御による仕事は発生しません。ここでは測定の前後で真の状態 $x$ が変わらず、結果を読んでから制御を選ぶと仮定します。測定装置の反作用や記憶の費用がある実験は、この段階では含めません。

各 $y$ に対して、[ITD1の操作・接触模型](../ITD1/index.md#def-itd1-controlled-model)と同じく、状態を変えずにエネルギー準位を切り替え、熱浴で遷移する操作を有限回行います。同じ結果 $y$ の下では決めた操作列を途中で変えません。結果別の経路確率は、事後分布から始まるITD1の経路模型で記述できます。

<a id="def-itd4-feedback"></a>

<!-- formal-statement-start -->
> **定義（結果依存フィードバック実験）**  
> 空でない有限集合 $X,Y$、有限な $E(x,\lambda)$、$T>0$ を取る。
> 最初の制御値 $\lambda_0$ で測定前の分布を $p_0$ とし、状態を変えない[測定チャネル](#def-itd4-measurement) $M$ から結果 $y$ を得る。
>
> $q(y)>0$ の結果ごとに、共通の始点 $\lambda_0$ から終点 $\lambda_f$ まで、$n\ge1$ 回のquenchと接触を選ぶ。
> 段階 $j$ の核 $K_j^y$ は行和1、正の遷移の双方向支持、温度 $T$ における[局所詳細釣合い](../ITD1/index.md#def-itd1-local-detailed-balance)を満たす。
> 軌道 $\gamma=(x_0,\ldots,x_n)$ の結合確率を

$$
P(\gamma,y)=p_0(x_0)M(y\mid x_0)
\prod_{j=1}^nK_j^y(x_{j-1},x_j)
$$

> とし、$q(y)>0$ の条件付き軌道確率を $P(\gamma\mid y)=P(\gamma,y)/q(y)$ とする。仕事 $W_y[\gamma]$ と熱 $Q_y[\gamma]$ はこの結果用の制御列で[ITD1の定義](../ITD1/index.md#def-itd1-path-work-heat)に従って計算する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd4-feedback -->
### 例：結果0なら準位を下げ、結果1なら反対を下げる

**定義の確認**：$X=Y=\{0,1\}$、初期エネルギーは両状態で0、初期分布は $(1/2,1/2)$ とします。前節の誤り率 $1/4$ の測定を行い、結果 $y$ の後に、$x=y$ のエネルギーを $-a$、他方を $+a$（$a>0$）へ切り替えます。$y$ ごとの接触核として、その準位での正準分布 $\pi^y$ に一回で移る核 $K^y(x,z)=\pi^y(z)$ を選びます。

各核は非負で行和は $\sum_z\pi^y(z)=1$ です。また $K^y(x,z),K^y(z,x)>0$ で、

$$
\log\frac{K^y(x,z)}{K^y(z,x)}
=\log\frac{\pi^y(z)}{\pi^y(x)}
=-\beta\{E(z,\lambda^y)-E(x,\lambda^y)\},
$$

となるため局所詳細釣合いも満たします。最後に全状態のエネルギーを0へ戻すquenchを加え、最後は共通の $\lambda_f=\lambda_0$ とします（最後の接触は対称核を使えます）。全操作と確率は有限で、$p(x,y)$ と各核の積が結合経路の確率です。最初のquenchの条件付き平均仕事だけなら

$$
\mathbb E[W_1\mid Y=y]
=\frac34(-a)+\frac14(+a)=-\frac a2.
$$

これは途中までの仕事であり、**全過程の抽出仕事**とは違います。浴への接触、準位を戻す操作まで帳簿に入れる必要があります。
<!-- definition-example-end -->

## 3. 測定が仕事の上限へ寄与する理由

結果 $y$ が分かると、最初の分布は $p_y$ です。測定前の正準分布と違うので、結果を固定した一つの枝について[ITD3の非平衡自由エネルギー](../ITD3/index.md#def-itd3-noneq-free-energy)を評価できます。ここで使うのは測定器のエネルギーではなく、**測定で条件付けられた系の分布**です。

<a id="thm-itd4-feedback-work-bound"></a>

<!-- formal-statement-start -->
> **定理（フィードバック付き平均仕事の下限）**  
> 有限集合 $X,Y$、$k_{\mathrm B},T>0$、有限なエネルギー準位、共通の始点・終点 $\lambda_0,\lambda_f$ を取る。[結果依存フィードバック実験](#def-itd4-feedback)の全仮定に加え、測定前分布が正準分布 $p_0=\pi_{\lambda_0}$ であるとする。結果別終端分布 $p_f^y$ は任意で、測定チャネル $M$ の零確率を認める。このとき系への平均仕事は

$$
\mathbb E[W]\ge
F_{\mathrm{eq}}(\lambda_f)-F_{\mathrm{eq}}(\lambda_0)
-k_{\mathrm B}T I_{\mathrm{nat}}(X;Y).
$$

> 従って系から取り出す平均仕事には

$$
\mathbb E[W_{\mathrm{ext}}]\le
-\Delta F_{\mathrm{eq}}+k_{\mathrm B}TI_{\mathrm{nat}}(X;Y),
\qquad
\Delta F_{\mathrm{eq}}=F_{\mathrm{eq}}(\lambda_f)-F_{\mathrm{eq}}(\lambda_0)
$$

> が成り立つ。等号には、$q(y)>0$ のすべての枝で平均エントロピー生成が0であり、かつ終端分布 $p_f^y=\pi_{\lambda_f}$ となることが必要十分である。仕事には測定器・記憶を初期化する費用を含めない。
<!-- formal-statement-end -->

### 証明の見取り図

結果 $y$ を固定すれば、初期分布が $p_y$ のITD3実験です。各枝の仕事の下限を作り、初期の非平衡自由エネルギーを「測定前の平衡値＋$k_{\mathrm B}TD_{\mathrm{nat}}(p_y\Vert p_0)$」として展開してから結果で平均します。

<!-- proof-start -->
### 証明

まず $q(y)>0$ を固定します。測定は真の状態を変えないため、条件付き経路確率は

$$
P(\gamma\mid y)=p_y(x_0)\prod_{j=1}^nK_j^y(x_{j-1},x_j).
$$

各核は温度 $T$ の局所詳細釣合いを満たすので、[ITD3の平均仕事の下限](../ITD3/index.md#thm-itd3-work-bound)を初期分布 $p_y$、終端分布 $p_f^y$ に適用できます。すなわち

$$
\mathbb E[W\mid y]
\ge\mathcal F[p_f^y,\lambda_f]-\mathcal F[p_y,\lambda_0].
$$

[ITD3の自由エネルギー差の相対エントロピー表示](../ITD3/index.md#prop-itd3-kl-identity)を終端・始点へ順に適用します。始点では $p_0=\pi_{\lambda_0}$、終端では $\pi_{\lambda_f}>0$ なので、零確率を含む $p_y,p_f^y$ でも式が成立します。

$$
\begin{aligned}
\mathcal F[p_f^y,\lambda_f]
&=F_{\mathrm{eq}}(\lambda_f)+k_{\mathrm B}T D_{\mathrm{nat}}(p_f^y\Vert\pi_{\lambda_f})
\ge F_{\mathrm{eq}}(\lambda_f),\\
\mathcal F[p_y,\lambda_0]
&=F_{\mathrm{eq}}(\lambda_0)+k_{\mathrm B}T D_{\mathrm{nat}}(p_y\Vert p_0).
\end{aligned}
$$

したがって、枝ごとに

$$
\mathbb E[W\mid y]
\ge\Delta F_{\mathrm{eq}}-k_{\mathrm B}T D_{\mathrm{nat}}(p_y\Vert p_0).
$$

これを $q(y)$ で平均し、[情報量平均の命題](#prop-itd4-information-average)を代入します。

$$
\begin{aligned}
\mathbb E[W]
&=\sum_{y:q(y)>0}q(y)\mathbb E[W\mid y]\\
&\ge\sum_yq(y)\Delta F_{\mathrm{eq}}
-k_{\mathrm B}T\sum_yq(y)D_{\mathrm{nat}}(p_y\Vert p_0)\\
&=\Delta F_{\mathrm{eq}}-k_{\mathrm B}TI_{\mathrm{nat}}(X;Y).
\end{aligned}
$$

結果 $y$ で生じる二つの非負項、すなわちITD3の散逸 $k_{\mathrm B}T\langle\Sigma_y\rangle$ と終端の超過自由エネルギー $k_{\mathrm B}TD_{\mathrm{nat}}(p_f^y\Vert\pi_{\lambda_f})$ を落としたのが最後の下限です。各 $q(y)$ は正なので、全体の等号は各枝でこの二項がともに0であることと同値です。
<!-- proof-end -->

**大切な境界**：この不等式は「情報そのものが仕事に変わる」という等式ではありません。系へ作用する制御を実装できることが必要です。特に無情報測定では $I=0$ なので、同じ始終点での平均抽出仕事は非正です。測定の反作用がある、結果を後から選別した、あるいはセンサーと系が初めから相関している実験では、ここに置いた事前分布・測定チャネル・条件付き仕事の仮定を作り直します。

## 4. 情報付きゆらぎ関係：等式には支持条件が要る

前節は平均の不等式でした。では一回ずつの仕事と情報量を指数に入れて平均すると何が起こるでしょうか。[ITD2の仕事の経路確率比](../ITD2/index.md#thm-itd2-work-ratio)を利用します。ただし、**フィードバック実験では結果 $y$ を固定した逆実験を別々に準備する**必要があります。

測定結果 $y$ を固定して「測定は行わず、最初から $p_0=\pi_{\lambda_0}$ で同じ制御列 $y$ を実行する仮想的な順実験」の確率を $P_{\mathrm F}^{y,0}(\gamma)$ と書きます。その制御列を時間反転し、最後の $\lambda_f$ における $\pi_{\lambda_f}$ から開始する逆実験を $P_{\mathrm R}^y(\gamma^\dagger)$ とします。この二つはそれぞれ規格化されています。

<a id="thm-itd4-information-ift"></a>

<!-- formal-statement-start -->
> **定理（情報付き積分型ゆらぎ関係と支持欠損補正）**  
> 有限な $X,Y$、$k_{\mathrm B},T>0$、共通の $\lambda_0,\lambda_f$ と有限エネルギー、$p_0=\pi_{\lambda_0}>0$ の[結果依存フィードバック実験](#def-itd4-feedback)を取る。各枝の核は局所詳細釣合いを満たし、逆実験は[ITD2の両端平衡の正逆プロトコル](../ITD2/index.md#def-itd2-equilibrium-protocol)に従う。$q(y)>0$ に対して

$$
\begin{aligned}
P_{\mathrm F}^{y,0}(\gamma)
&=\pi_{\lambda_0}(x_0)\prod_jK_j^y(x_{j-1},x_j),\\
P_{\mathrm R}^y(\gamma^\dagger)
&=\pi_{\lambda_f}(x_n)\prod_jK_j^y(x_j,x_{j-1})
\end{aligned}
$$

> とする。正の結合軌道 $P(\gamma,y)>0$ の上で[測定情報量](#def-itd4-information)を $i(x_0;y)$ と書く。このとき

$$
\left\langle\exp\{-\beta(W-\Delta F_{\mathrm{eq}})-i(X_0;Y)\}\right\rangle
=1-\lambda_{\mathrm{abs}},
$$

> ただし逆実験だけにある軌道の総確率を

$$
\lambda_{\mathrm{abs}}
=\sum_{y:q(y)>0}q(y)
\sum_{\gamma:\,M(y\mid x_0)=0}P_{\mathrm R}^y(\gamma^\dagger)
$$

> と置く。従って $0\le\lambda_{\mathrm{abs}}<1$ である。特に全 $x\in X$ と全 $q(y)>0$ の $y$ で $M(y\mid x)>0$ なら $\lambda_{\mathrm{abs}}=0$、指数平均は1である。
<!-- formal-statement-end -->

### 証明の見取り図

正軌道の確率には、測定が加えた因子 $M(y\mid x_0)$ があります。これを $q(y)e^{i(x_0;y)}$ と書き換えると、指数平均は「結果 $y$ の確率 $q(y)$ × 逆実験で対応する軌道の確率」の和になります。測定チャネルに0がある場合、逆実験の全軌道を足せないことが補正の原因です。

<!-- proof-start -->
### 証明

$q(y)>0$ と、$P(\gamma,y)>0$ を固定します。$p_0=\pi_{\lambda_0}$ は全状態で正であり、局所詳細釣合いは正の遷移の逆も正にするので、$P_{\mathrm R}^y(\gamma^\dagger)>0$ です。[ITD2の仕事の経路確率比](../ITD2/index.md#thm-itd2-work-ratio)を、この結果で選ばれた制御列 $y$ に適用すると

$$
\frac{P_{\mathrm F}^{y,0}(\gamma)}{P_{\mathrm R}^y(\gamma^\dagger)}
=\exp\{\beta(W_y[\gamma]-\Delta F_{\mathrm{eq}})\}.
$$

また[情報量の定義](#def-itd4-information)から $M(y\mid x_0)=q(y)e^{i(x_0;y)}$ です。結合経路確率を代入すると

$$
\begin{aligned}
P(\gamma,y)
&=M(y\mid x_0)P_{\mathrm F}^{y,0}(\gamma)\\
&=q(y)e^{i(x_0;y)}e^{\beta(W_y[\gamma]-\Delta F_{\mathrm{eq}})}
P_{\mathrm R}^y(\gamma^\dagger).
\end{aligned}
$$

よって指数因子を掛けて正の結合軌道を足すと

$$
\begin{aligned}
\left\langle e^{-\beta(W-\Delta F_{\mathrm{eq}})-i}\right\rangle
&=\sum_{y:q(y)>0}\sum_{\gamma:P(\gamma,y)>0}
q(y)P_{\mathrm R}^y(\gamma^\dagger)\\
&=\sum_{y:q(y)>0}q(y)
\left(1-\sum_{\gamma:M(y\mid x_0)=0}P_{\mathrm R}^y(\gamma^\dagger)\right)\\
&=1-\lambda_{\mathrm{abs}}.
\end{aligned}
$$

二行目では、各枝の正逆遷移の支持が一致するため、欠けた逆軌道はちょうど $M(y\mid x_0)=0$ のものだけであることを使いました。各結果 $y$ には少なくとも一つ正の $M(y\mid x_0)$ があり、逆の対応する経路にも正の質量があるので $\lambda_{\mathrm{abs}}<1$ です。すべての測定確率が正なら欠損和は空です。
<!-- proof-end -->

この補正は[ITD2の支持欠損による指数平均の補正](../ITD2/index.md#prop-itd2-support-correction)と同じ仕組みです。支持が完全な場合、$e^{-z}\ge1-z$ を $z=\beta(W-\Delta F_{\mathrm{eq}})+i$ に使うと $\beta(\mathbb E[W]-\Delta F_{\mathrm{eq}})+I\ge0$ が従い、[情報付き仕事の下限](#thm-itd4-feedback-work-bound)と一致します。一方、測定に0がある場合は**指数平均を1と書いてからJensenを使ってはいけません**。平均の仕事の下限は第3節の別の証明により、支持欠損があっても成立しています。

### 例：完全測定で「1」にならない指数平均

$X=Y=\{0,1\}$、エネルギー0、$p_0=(1/2,1/2)$、$M(y\mid x)=1$（$y=x$）、それ以外は0とします。制御操作は準位を変えず、接触核 $K(x,z)=\boldsymbol{1}_{x=z}$ を一段使います。行和1、正の対角成分の逆遷移あり、同一準位なので局所詳細釣合いを満たします。仕事は常に0、実現する二つの結合軌道では $q(y)=1/2$、$i(x;y)=\log2$ です。従って

$$
\left\langle e^{-\beta W-i}\right\rangle
=\sum_{y=0}^1\frac12e^{-\log2}=\frac12.
$$

逆実験 $P_{\mathrm R}^y$ は各 $y$ について二つの静止軌道をそれぞれ確率 $1/2$ で持ちます。その一つは初期状態 $x_0\ne y$ で $M(y\mid x_0)=0$ ですから、$\lambda_{\mathrm{abs}}=\sum_y(1/2)(1/2)=1/2$ となり、補正式と一致します。測定によって正の平均情報 $\log2$ は得ていますが、**仕事を取り出す制御はしていません**。

## 5. 二値測定からSzilardエンジンへ

等エネルギー二状態なら最初の分布は一様です。センサーが正しい値を確率 $1-\varepsilon$ で答えるとし、$0\le\varepsilon\le1/2$ を誤り率とします。結果を使った仕事の最大値は、誤り率が大きくなるほど減ります。

<a id="prop-itd4-binary-channel"></a>

<!-- formal-statement-start -->
> **命題（二値対称測定の相互情報量）**  
> $X=Y=\{0,1\}$、事前分布 $p_0=(1/2,1/2)$、$0\le\varepsilon\le1/2$ とする。$M(x\mid x)=1-\varepsilon$、$M(1-x\mid x)=\varepsilon$ と置くと、測定結果は一様で、事後分布は $p_y(y)=1-\varepsilon$、$p_y(1-y)=\varepsilon$ であり、平均相互情報量は

$$
I_{\mathrm{nat}}(X;Y)=\log2-h(\varepsilon),
\qquad h(\varepsilon)=-\varepsilon\log\varepsilon-(1-\varepsilon)\log(1-\varepsilon),
$$

> ただし $0\log0=0$ とする。$I_2=1-h(\varepsilon)/\ln2$ bit である。
<!-- formal-statement-end -->

### 証明の見取り図

二値の対称性により結果は半々です。正しく読む場合と読み違える場合の二つの対数比を、各結果で平均するだけです。

<!-- proof-start -->
### 証明

各結果 $y$ について[測定チャネルの定義](#def-itd4-measurement)を使うと

$$
q(y)=\frac12(1-\varepsilon)+\frac12\varepsilon=\frac12,
$$

です。Bayesの式へ代入して $p_y(y)=(1/2)(1-\varepsilon)/(1/2)=1-\varepsilon$、$p_y(1-y)=\varepsilon$ となります。[情報量の平均](#prop-itd4-information-average)を直接展開すると、

$$
\begin{aligned}
I_{\mathrm{nat}}(X;Y)
&=\sum_{y=0}^1\frac12\left\{(1-\varepsilon)\log\frac{1-\varepsilon}{1/2}
+\varepsilon\log\frac{\varepsilon}{1/2}\right\}\\
&=(1-\varepsilon)\log(1-\varepsilon)
+\varepsilon\log\varepsilon+\log2\\
&=\log2-h(\varepsilon).
\end{aligned}
$$

$\varepsilon=0$ は零確率項を除いて極限で読み、$h(0)=0$、$I=\log2$ です。$\varepsilon=1/2$ では $h(1/2)=\log2$、$I=0$ です。bit 単位には $\ln2$ で割って換算します。
<!-- proof-end -->

### 例：誤りがあっても、分布の偏りを可逆制御へ使える

$0<\varepsilon<1/2$ とします。測定直後、結果 $y$ に基づき、状態 $x$ のエネルギーを

$$
E_y(x)=-k_{\mathrm B}T\log\{2p_y(x)\}
$$

へ瞬間的に切り替えます。両方の $p_y(x)$ が正なので、このエネルギーは有限です。ここで $e^{-\beta E_y(x)}=2p_y(x)$、$Z_y=\sum_x2p_y(x)=2$ ですから、**測定後の分布 $p_y$ が新しい準位の正準分布そのもの**になります。初期の両準位は0なので、quenchの条件付き平均仕事は

$$
\begin{aligned}
\mathbb E[W_1\mid y]
&=\sum_xp_y(x)\{E_y(x)-0\}\\
&=-k_{\mathrm B}T\left\{\log2+\sum_xp_y(x)\log p_y(x)\right\}\\
&=-k_{\mathrm B}T\{\log2-h(\varepsilon)\}=-k_{\mathrm B}TI_{\mathrm{nat}}.
\end{aligned}
$$

その後、熱浴を保ちつつ準位を十分ゆっくり両方0に戻す極限では、各瞬間に平衡分布を保てます。戻す過程の可逆平均仕事は、[SM3の平衡自由エネルギー](../../SM/SM3/index.md#def-sm3-free-energy)の差です。どちらの端でも分配関数は2なので

$$
W_2^{\mathrm{rev}}=F_{\mathrm{eq}}(0,0)-F_{\mathrm{eq}}(E_y)
=-k_{\mathrm B}T\log2-(-k_{\mathrm B}T\log2)=0.
$$

したがって可逆極限で $\mathbb E[W_{\mathrm{ext}}]=k_{\mathrm B}TI$ となり、[仕事の上限](#thm-itd4-feedback-work-bound)に近づきます。有限回の接触で平衡追従させる場合は散逸が残り、一般に上限に達しません。$\varepsilon\downarrow0$ では誤答状態の $E_y(1-y)\to+\infty$ なので、有限エネルギー模型のまま**完全測定で厳密に等号**と言うことはできず、理想極限の説明になります。

### Szilardエンジン：体積の情報を使う理想模型

一個の粒子が温度 $T$ の箱全体積 $V$ に平衡分布しているとします。断熱的な隔壁で箱を左右同体積に分け、粒子がどちらにいるかを無誤差で測ってから、その側から隔壁を押し出す等温膨張を行う理想化です。粒子を理想気体として扱い、膨張中は圧力 $P(v)=k_{\mathrm B}T/v$、体積が $V/2$ から $V$ まで増えるとします。外部が粒子にする仕事は

$$
W=-\int_{V/2}^VP(v)\,dv
=-k_{\mathrm B}T\int_{V/2}^V\frac{dv}{v}
=-k_{\mathrm B}T\log2.
$$

等温理想気体で内部エネルギー変化は0なので $Q=-W=k_{\mathrm B}T\log2$ です。左右は等確率で、完全測定の相互情報量は $I=\log2$ nat ですから、取り出す仕事 $k_{\mathrm B}T\log2$ は情報付き上限と一致します。これは**可逆な隔壁操作・理想測定・準静的膨張**の模型であり、連続位置・体積を使うため上の有限状態ジャンプ模型の厳密な特殊例ではありません。また、隔壁の挿入・除去・センサーの実装・記憶のリセットが無償であると証明したわけではありません。

この時点では、粒子だけの帳簿が閉じたように見えても、結果を記録した装置は初期状態へ戻っていません。次に必要なのは、測定の**記憶を物理的な二状態系として扱い、使い終わった情報を消す仕事**の評価です。

## 6. 演習：情報の計算から仕事・熱の収支まで

以下では $k_{\mathrm B},T>0$、$\beta=(k_{\mathrm B}T)^{-1}$ とし、対数は自然対数、$W$ は外部が系にした仕事、$Q$ は浴から系へ入った熱です。$h(u)=-u\log u-(1-u)\log(1-u)$、$0\log0=0$ とします。

### Level A：測定と仕事を計算する

#### A1. 二値対称センサーの事後確率

真の状態 $X\in\{0,1\}$ の事前分布を $(1/2,1/2)$ とする。結果 $Y\in\{0,1\}$ は正しい状態を確率 $3/4$、反対を確率 $1/4$ で返し、測定は真の状態を変えない。$q(0)$、$P(X=0\mid Y=0)$、$I_{\mathrm{nat}}(X;Y)$ と $I_2(X;Y)$ を求めよ。

- Level: A
- ID: ITD4-A1

<!-- solution-start -->
**詳細解答**　[測定チャネルの定義](#def-itd4-measurement)で $M(0\mid0)=3/4$、$M(0\mid1)=1/4$ なので

$$
q(0)=\frac12\frac34+\frac12\frac14=\frac12,
\qquad
P(X=0\mid Y=0)=\frac{(1/2)(3/4)}{1/2}=\frac34.
$$

結果1も確率 $1/2$ で、事後分布は $(1/4,3/4)$ です。[二値対称測定の命題](#prop-itd4-binary-channel)へ $\varepsilon=1/4$ を代入すると

$$
\begin{aligned}
I_{\mathrm{nat}}&=\log2-h(1/4)\\
&=\log2+\frac14\log\frac14+\frac34\log\frac34
=\frac34\log3-\log2.
\end{aligned}
$$

bit へは $\ln2$ で割り、$I_2=\frac34\log_2 3-1$ bit です。$I_{\mathrm{nat}}>0$ は、$3^3=27>16=2^4$ から $\frac34\log3>\log2$ として確認できます。
<!-- solution-end -->

#### A2. 零確率がある非対称測定

事前分布 $p_0=(3/4,1/4)$、結果集合 $Y=\{0,1\}$ とし、$M(0\mid0)=2/3$、$M(1\mid0)=1/3$、$M(0\mid1)=0$、$M(1\mid1)=1$ とする。結果分布、二つの事後分布と $I_{\mathrm{nat}}(X;Y)$ を求めよ。確率0の組の対数をどう扱うか述べよ。

- Level: A
- ID: ITD4-A2

<!-- solution-start -->
**詳細解答**　各行は非負で $2/3+1/3=1$、$0+1=1$ なのでチャネルです。結果0の確率は $(3/4)(2/3)+(1/4)0=1/2$、結果1の確率は $(3/4)(1/3)+(1/4)1=1/2$ です。[事後分布の定義](#def-itd4-measurement)から

$$
p_{y=0}=(1,0),\qquad
p_{y=1}=\left(\frac{(3/4)(1/3)}{1/2},\frac{(1/4)1}{1/2}\right)=(1/2,1/2).
$$

[情報量平均の命題](#prop-itd4-information-average)で各結果の相対エントロピーを直接計算します。

$$
\begin{aligned}
D_{\mathrm{nat}}(p_{y=0}\Vert p_0)&=\log\frac1{3/4}=\log\frac43,\\
D_{\mathrm{nat}}(p_{y=1}\Vert p_0)&=\frac12\log\frac{1/2}{3/4}+\frac12\log\frac{1/2}{1/4}\\
&=\frac12\log\frac23+\frac12\log2
=\frac12\log\frac43.
\end{aligned}
$$

従って $I_{\mathrm{nat}}=(1/2)\log(4/3)+(1/4)\log(4/3)=\frac34\log(4/3)$ です。$M(0\mid1)=0$ の組 $(x,y)=(1,0)$ は結合確率0なので、$i(1;0)$ を評価せず和から除きます。$0\log0$ を直接評価してはいけません。
<!-- solution-end -->

#### A3. 負の情報と正の平均

事前分布が $(1/2,1/2)$、対称誤り率 $\varepsilon=1/4$ の二値測定で、正答の組と誤答の組の情報量 $i(x;y)$ を求めよ。結果 $y=0$ に条件付けた平均を求め、全結果の平均が同じであることを確認せよ。

- Level: A
- ID: ITD4-A3

<!-- solution-start -->
**詳細解答**　$q(0)=q(1)=1/2$ なので[軌道情報量の定義](#def-itd4-information)から、正答では $i=\log[(3/4)/(1/2)]=\log(3/2)$、誤答では $i=\log[(1/4)/(1/2)]=-\log2$ です。$Y=0$ の下で正答 $X=0$ は確率 $3/4$、誤答 $X=1$ は確率 $1/4$ だから

$$
\mathbb E[i\mid Y=0]
=\frac34\log\frac32-\frac14\log2
=\frac34\log3-\log2.
$$

対称性により $Y=1$ についても同じです。よって全平均は $(1/2)\mathbb E[i\mid0]+(1/2)\mathbb E[i\mid1]=\frac34\log3-\log2>0$ です。一回の誤答に対する負の値と、非負の平均は矛盾しません。
<!-- solution-end -->

#### A4. 分布を平衡にする瞬間的な準位変更

等エネルギー二状態の初期分布を一様とし、測定後の事後分布が $p_y(y)=3/4$、$p_y(1-y)=1/4$ となったとする。$E_y(x)=-k_{\mathrm B}T\log\{2p_y(x)\}$ へ状態を変えずにquenchする。二つのエネルギー、分配関数、条件付き平均quench仕事を求めよ。

- Level: A
- ID: ITD4-A4

<!-- solution-start -->
**詳細解答**　$2p_y(y)=3/2$、$2p_y(1-y)=1/2$ なので

$$
E_y(y)=-k_{\mathrm B}T\log\frac32,
\qquad E_y(1-y)=k_{\mathrm B}T\log2.
$$

この新しい準位のBoltzmann重みは $3/2$ と $1/2$ で、分配関数は $Z_y=3/2+1/2=2$ です。よって正準確率は $(3/4,1/4)=p_y$ であり、平衡化のための熱浴接触をquench直後に必要としません。quenchでは状態不変で $Q_1=0$ ですから、[ITD1の軌道の仕事・熱](../ITD1/index.md#def-itd1-path-work-heat)の定義より

$$
\mathbb E[W_1\mid y]
=\frac34\left(-k_{\mathrm B}T\log\frac32\right)
+\frac14(k_{\mathrm B}T\log2)
=-k_{\mathrm B}T\left(\frac34\log3-\log2\right).
$$

結果 $y$ の条件付き仕事は、測定結果の平均相互情報量を使って $-k_{\mathrm B}TI_{\mathrm{nat}}$ と表せます。
<!-- solution-end -->

#### A5. 無情報と完全測定の両端

等エネルギー二状態を一様に準備し、対称誤り率 $\varepsilon$ の測定を行う。$\varepsilon=1/2$ と $\varepsilon=0$ の事後分布と相互情報量を求めよ。第5節のエネルギー $E_y(x)=-k_{\mathrm B}T\log\{2p_y(x)\}$ を両端へ適用する際の違いを説明せよ。

- Level: A
- ID: ITD4-A5

<!-- solution-start -->
**詳細解答**　$\varepsilon=1/2$ なら $p_y=(1/2,1/2)$ で $I=\log2-h(1/2)=0$、両準位は $E_y(x)=-k_{\mathrm B}T\log1=0$ のままです。$\varepsilon=0$ なら結果 $y$ で $p_y(y)=1$、$p_y(1-y)=0$、$I=\log2-h(0)=\log2$ です。このとき $E_y(y)=-k_{\mathrm B}T\log2$ は有限ですが、誤答側には $-k_{\mathrm B}T\log0=+\infty$ が形式上必要です。有限エネルギーの章の仮定から外れるため、$\varepsilon\downarrow0$ の極限としてのみ読む必要があります。情報量が増えても実現可能な有限操作が直ちに存在するとは限りません。
<!-- solution-end -->

### Level B：上限と支持条件を再構成する

#### B1. 相互情報量は結果のエントロピーを超えない

有限集合上の事前分布 $p_0$ と測定チャネル $M(y\mid x)$ を考える。結果の確率を $q(y)=\sum_xp_0(x)M(y\mid x)$、$H_{\mathrm{nat}}(Y)=-\sum_yq(y)\log q(y)$、$H_{\mathrm{nat}}(Y\mid X)=-\sum_{x,y}p_0(x)M(y\mid x)\log M(y\mid x)$ とする。$I_{\mathrm{nat}}(X;Y)=H_{\mathrm{nat}}(Y)-H_{\mathrm{nat}}(Y\mid X)$ を定義から示し、$I\le H_{\mathrm{nat}}(Y)$ と等号条件を述べよ。零確率項は0とする。

- Level: B
- ID: ITD4-B1

<!-- solution-start -->
**詳細解答**　[測定情報量](#def-itd4-information)の定義に結合確率 $p(x,y)=p_0(x)M(y\mid x)$ を代入すると

$$
\begin{aligned}
I_{\mathrm{nat}}
&=\sum_{x,y:p(x,y)>0}p_0(x)M(y\mid x)
\{\log M(y\mid x)-\log q(y)\}\\
&=\sum_{x,y}p_0(x)M(y\mid x)\log M(y\mid x)
-\sum_y\left\{\sum_xp_0(x)M(y\mid x)\right\}\log q(y)\\
&=-H_{\mathrm{nat}}(Y\mid X)+H_{\mathrm{nat}}(Y).
\end{aligned}
$$

零確率項は定義どおり0です。$M(y\mid x)\in[0,1]$ で $-M(y\mid x)\log M(y\mid x)\ge0$ なので $H_{\mathrm{nat}}(Y\mid X)\ge0$、従って $I\le H_{\mathrm{nat}}(Y)$ です。等号には各 $p_0(x)>0$ の状態で $M(\cdot\mid x)$ のエントロピーが0、すなわち各行が一点へ確率1で出力する**決定的チャネル**であることが必要十分です。事前に絶対に起こらない $x$ の行は任意でもかまいません。
<!-- solution-end -->

#### B2. 最終準位も結果に依存する場合

初期状態は $\pi_{\lambda_0}$、非擾乱の有限測定チャネル $M$、$q(y)>0$ の結果に依存するITD1型の有限操作・単一浴の接触を考える。今回は結果 $y$ ごとに最終制御値が $\lambda_f(y)$ で異なる。$I_{\mathrm{nat}}(X;Y)$ を用いて平均抽出仕事の上限を導け。測定器・記憶の仕事は含めない。

- Level: B
- ID: ITD4-B2

<!-- solution-start -->
**詳細解答**　結果を固定すると初期分布は $p_y$、最終分布は $p_f^y$ です。[ITD3の平均仕事の下限](../ITD3/index.md#thm-itd3-work-bound)に終点 $\lambda_f(y)$ を入れると

$$
\mathbb E[W\mid y]\ge
\mathcal F[p_f^y,\lambda_f(y)]-\mathcal F[p_y,\lambda_0].
$$

[ITD3の自由エネルギー差の表示](../ITD3/index.md#prop-itd3-kl-identity)を終点と始点へ適用すると、$\mathcal F[p_f^y,\lambda_f(y)]\ge F_{\mathrm{eq}}(\lambda_f(y))$、$\mathcal F[p_y,\lambda_0]=F_{\mathrm{eq}}(\lambda_0)+k_{\mathrm B}TD_{\mathrm{nat}}(p_y\Vert\pi_{\lambda_0})$ です。従って

$$
\mathbb E[W_{\mathrm{ext}}\mid y]
\le F_{\mathrm{eq}}(\lambda_0)-F_{\mathrm{eq}}(\lambda_f(y))
+k_{\mathrm B}TD_{\mathrm{nat}}(p_y\Vert\pi_{\lambda_0}).
$$

$q(y)$ で平均し、[情報量平均と条件付き相対エントロピー](#prop-itd4-information-average)の命題を使って

$$
\mathbb E[W_{\mathrm{ext}}]
\le F_{\mathrm{eq}}(\lambda_0)
-\sum_yq(y)F_{\mathrm{eq}}(\lambda_f(y))
+k_{\mathrm B}TI_{\mathrm{nat}}(X;Y).
$$

を得ます。終点が結果によって異なるのに、共通の $\Delta F_{\mathrm{eq}}$ を勝手に置くことはできません。
<!-- solution-end -->

#### B3. 完全測定で消える逆軌道と、正確率測定での復元

$X=Y=\{0,1\}$、両エネルギー0、$p_0=(1/2,1/2)$、遷移核 $K(x,z)=\boldsymbol{1}_{x=z}$ を一段使用し、制御は変えない。まず $M(y\mid x)=\boldsymbol{1}_{x=y}$ で $\lambda_{\mathrm{abs}}$ と $\langle e^{-\beta W-i}\rangle$ を計算せよ。次に $0<\varepsilon<1/2$ の対称誤り測定へ置き換え、同じ指数平均が1になることを定義の有限和で示せ。

- Level: B
- ID: ITD4-B3

<!-- solution-start -->
**詳細解答**　遷移は静止軌道 $(x,x)$ だけで、仕事は全軌道で0です。完全測定では実現する結合軌道は $(0,0;y=0)$ と $(1,1;y=1)$ の二つ、各確率は $1/2$、各情報量は $\log[1/(1/2)]=\log2$ です。したがって

$$
\langle e^{-\beta W-i}\rangle
=\frac12e^{-\log2}+\frac12e^{-\log2}=\frac12.
$$

一方、結果 $y$ の逆実験は平衡分布から始まる二つの静止軌道を各確率 $1/2$ で持ちます。$x_0\ne y$ の軌道は測定チャネルが0なので逆だけにあり、その逆質量は結果当たり $1/2$ です。[情報付き積分型ゆらぎ関係と支持欠損補正](#thm-itd4-information-ift)の定理から $\lambda_{\mathrm{abs}}=\sum_y(1/2)(1/2)=1/2$ です。

誤り率を $0<\varepsilon<1/2$ にすると、各 $M(y\mid x)$ は正なので正の結合軌道は四つです。仕事は依然0、$i(x;y)=\log\{M(y\mid x)/q(y)\}$、$q(y)=1/2$ を使って

$$
\begin{aligned}
\langle e^{-i}\rangle
&=\sum_{x,y}\frac12M(y\mid x)\frac{1/2}{M(y\mid x)}\\
&=\sum_{x,y}\frac14=4\cdot\frac14=1.
\end{aligned}
$$

測定確率が正なので約分できます。$\varepsilon=0$ をこの約分式に**そのまま代入することはできません**。逆実験の半分が正方向では支持されなくなるからです。
<!-- solution-end -->

### Level C：測定・準位操作・熱浴の統合収支

#### C1. 雑音つき二値フィードバックエンジン

等エネルギー $E_0(0)=E_0(1)=0$ の二状態系を温度 $T$ の正準分布 $(1/2,1/2)$ に準備する。状態非擾乱の対称誤り測定 $M(y\mid x)$（$0<\varepsilon<1/2$）を行う。結果 $y$ を固定すると事後分布 $p_y(y)=1-\varepsilon$、$p_y(1-y)=\varepsilon$ である。

1. $I_{\mathrm{nat}}(X;Y)$ を求め、情報付き仕事上限を書け。
2. $E_y(x)=-k_{\mathrm B}T\log\{2p_y(x)\}$ へ瞬間的にquenchし、十分ゆっくり熱浴接触しながら両準位0へ戻す極限を考える。二段階の条件付き平均仕事 $W_1,W_2$、全仕事を求めよ。
3. 第一法則から二段階の平均熱 $Q_1,Q_2$ を求め、測定後から最後までの系の**条件付き**エントロピー変化と浴の変化を照合せよ。
4. 測定結果を保持した記憶が最後にまだ初期化されていないことを、系単独の循環という主張と区別して説明せよ。

- Level: C
- ID: ITD4-C1

<!-- solution-start -->
**詳細解答**

**1. 情報と上限**　[二値対称測定の命題](#prop-itd4-binary-channel)から結果は一様、相互情報量は $I=\log2-h(\varepsilon)$ nat です。始終点の準位がともに0なので $\Delta F_{\mathrm{eq}}=0$、[情報付き仕事上限](#thm-itd4-feedback-work-bound)は

$$
\mathbb E[W_{\mathrm{ext}}]\le k_{\mathrm B}T\{\log2-h(\varepsilon)\}.
$$

**2. 二段階の仕事**　どの $y$ に対しても $p_y(x)>0$ です。quench後の分配関数は

$$
Z_y=\sum_{x=0}^1e^{-\beta E_y(x)}
=2\sum_xp_y(x)=2,
$$

なので $p_y$ は新準位の正準分布です。quenchでは状態と確率は変わらず、$W_1(x,y)=E_y(x)-E_0(x)$、従って

$$
\begin{aligned}
\mathbb E[W_1\mid y]
&=\sum_xp_y(x)\{-k_{\mathrm B}T\log[2p_y(x)]\}\\
&=-k_{\mathrm B}T\{\log2-h(\varepsilon)\}=-k_{\mathrm B}TI.
\end{aligned}
$$

戻す段階の可逆仕事は両端の平衡自由エネルギー差です。最初も最後も $Z=2$ なので $\mathbb E[W_2\mid y]=-k_{\mathrm B}T\log2-(-k_{\mathrm B}T\log2)=0$ です。従って全仕事は $-k_{\mathrm B}TI$、抽出仕事は $+k_{\mathrm B}TI$ となり、可逆極限で上限に一致します。

**3. 熱とエントロピー**　quenchでは状態は不変で熱の交換がないため $Q_1=0$、条件付き平均内部エネルギーは0から

$$
U_y=\sum_xp_y(x)E_y(x)
=-k_{\mathrm B}TI
$$

へ変わります。戻す段階では終端エネルギーが0、終端分布が $(1/2,1/2)$ ですから $\Delta U_2=0-U_y=k_{\mathrm B}TI$ です。[第一法則](../ITD1/index.md#thm-itd1-first-law)に $\Delta U_2=W_2+Q_2$ を代入し、$W_2=0$ より $Q_2=k_{\mathrm B}TI$、従って総熱も $k_{\mathrm B}TI$ です。

測定直後の条件付き系エントロピーは $S_y^{\mathrm{initial}}=k_{\mathrm B}h(\varepsilon)$、戻した後は $S_y^{\mathrm{final}}=k_{\mathrm B}\log2$ です。従って

$$
\Delta S_{\mathrm{sys}\mid y}
=k_{\mathrm B}\{\log2-h(\varepsilon)\}=k_{\mathrm B}I,
\qquad
\Delta S_{\mathrm{bath}\mid y}=-Q_2/T=-k_{\mathrm B}I.
$$

和は0で、条件付き可逆極限と整合します。無条件の始終点の系分布はどちらも一様なので、そのエントロピー差は0です。条件付きエントロピー差 $k_{\mathrm B}I$ と混同してはいけません。

**4. 装置全体の境界**　測定の前には系と記憶が独立と仮定していました。測定後、結果 $y$ は記憶に保存され、系との間に相互情報量 $I$ が存在します。フィードバックはこの相関を利用して系から仕事を引き出しましたが、記憶を次の測定用の初期状態に戻してはいません。したがって**系の準位と周辺分布が元に戻ったこと**は、記憶・測定器・浴を含む全装置の周期性を意味しません。記憶のエネルギー・分布・消去過程を指定して初めて全循環の仕事と熱を評価できます。
<!-- solution-end -->

## 7. 次に問うこと

本章の平均仕事の上限は、状態を乱さずに測り、その結果で制御する有限模型で厳密に成立しました。さらに情報付き指数平均は、測定の正確率の支持によって1にも $1-\lambda_{\mathrm{abs}}$ にもなります。いずれも記憶の準備と再初期化を無条件に無料にする主張ではありません。

次は**記憶そのものをエネルギー準位と分布を持つ物理系**として扱い、Landauer原理の仕事下限を導きます。誤りのある消去、初期分布の偏り、最後に残る相関を分ければ、「悪魔の装置全体で何が循環しているか」を判断する準備が整います。
