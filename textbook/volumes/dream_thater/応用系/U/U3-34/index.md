# U3-34 準 Monte Carlo と次元削減

[前講の層化抽出・重要度サンプリング](../U3-33/index.md#def-u3-33-gbm-strata)では、どの領域から何個標本を取るか、どの密度から標本を発生させるかを変えました。今回は別の問題があります。多数の時点を参照する価格付けで、一様乱数点が偶然一か所へ集まることを避け、限られた経路評価回数をより均等に使えないでしょうか。

**準 Monte Carlo（QMC）** は、独立な乱数の代わりに、積分領域を均一に埋めるよう設計した点を使います。ただし点は独立でなく、通常の標本分散・中心極限定理をそのまま使えません。**乱択 QMC（RQMC）** では、点のよい配置をある程度保ちながら配置全体を独立に乱択し、複数回の結果から誤差を測ります。

さらに Brown 運動の経路を作るとき、どの一様座標からどの時点を決めるかも重要です。本講では終端から先に作る *Brownian bridge construction* を使い、低次元の座標が支払額の主要な変動を捉える例を計算します。これは**障壁の未観測越境を補う手法ではありません**。その確率補正は次の U3-35 で扱います。

既習の[リスク中立割引支払の Monte Carlo 推定量](../U3-26/index.md#def-u3-26-mc-estimator)、[時間離散化と標本誤差の分解](../U3-29/index.md#prop-u3-29-mc-decomposition)、[幾何 Brown 運動の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)を使います。時間は年、価格は円、$r,q$ は連続複利の年率、$\sigma>0$ は年$^{-1/2}$、評価測度は $Q$ です。以下、$s>0$、$T>0$、$r,q\in\mathbb R$ を固定します。

## 1. 経路価格を単位立方体上の積分へ直す

まず $m\ge1$、$t_j=jT/m$、$\Delta t=T/m$ とします。独立標準正規変数 $Z_1,\ldots,Z_m$ を用いると、[GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)を各区間へ適用して、時刻 $t_j$ の株価は

$$
S_{t_j}=s\exp\left\{(r-q-\sigma^2/2)t_j
+\sigma\sqrt{\Delta t}\sum_{k=1}^j Z_k\right\}.
$$

ここでは **$m$ 個の観測時点の同時分布**だけを評価します。たとえば $G:(0,\infty)^m\to\mathbb R$ が可測で、$E_Q[|G(S_{t_1},\ldots,S_{t_m})|]<\infty$ なら、価格は $V_m=e^{-rT}E_Q[G]$ です。標準正規の累積分布関数を $\Phi(z)=Q(Z\le z)$ とすると、$U_k=\Phi(Z_k)$ は互いに独立な区間 $(0,1)$ の一様変数です。逆変換 $z_k=\Phi^{-1}(u_k)$ を代入した**割引支払関数**を

$$
f_m(u_1,\ldots,u_m)
=e^{-rT}G(S_{t_1}(z),\ldots,S_{t_m}(z))
$$

と書けば、確率積分は通常の多重積分になります。

<a id="def-u3-34-qmc-pricing"></a>
<!-- formal-statement-start -->
> **定義（金融価格の準 Monte Carlo 積分）**  
> 上の $m$ 時点GBM、可測支払関数 $G$、$E_Q|G|<\infty$ を固定する。$N\ge1$ と $(0,1)^m$ 内の決定論的な点 $u^{(1)},\ldots,u^{(N)}$ に対して、$f_m$ が各点で有限なら、価格の **QMC 積分近似**を

$$
\widehat V_{m,N}^{\rm QMC}
=\frac1N\sum_{i=1}^N f_m(u^{(i)}),
\qquad
V_m=\int_{(0,1)^m}f_m(u)\,du
$$

> とする。QMC 点は互いに独立な確率標本とは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-34-qmc-pricing -->
**定義の確認（終端だけの契約）**：$m=1$、$G(x)=(x-K)_+$、$s=K=100$ 円、$r=0.03,q=0,\sigma=0.2,T=1$ 年とします。ここで $A=100e^{0.01}$、$D=e^{-0.03}$ とすると

$$
f_1(u)=D\max\{A e^{0.2\Phi^{-1}(u)}-100,0\}.
$$

任意の $u\in(0,1)$ で逆正規関数は有限で、$f_1(u)$ も有限です。さらに $0\le f_1(u)\le D A e^{0.2\Phi^{-1}(u)}$ で、[GBM の一次モーメント](../U3-14/index.md#prop-u3-14-moments)が有限なので積分可能です。したがって $u^{(i)}=(i-\tfrac12)/N$ を選べば定義を満たし、時刻の離散化もありません。ただし固定点の平均は**確率変数ではない**ため、通常MCの不偏性・標準誤差をそのまま宣言できません。
<!-- definition-example-end -->

### 均等な配置を一変数から理解する

点が積分領域の左端からどれだけ均等に分布するかを測ります。点が $x_i\in(0,1)$ にあるとき、$[0,t)$ に入る点の割合は $N^{-1}\sum_i\boldsymbol1_{\{x_i<t\}}$ です。一様分布なら区間の長さ $t$ に一致するはずです。

<a id="def-u3-34-star-discrepancy"></a>
<!-- formal-statement-start -->
> **定義（一変数の星食い違い度）**  
> $x_1,\ldots,x_N\in(0,1)$ の **星食い違い度**を、区間 $[0,t)$ における経験割合と長さの差の最大値

$$
D_N^*=\sup_{0\le t\le1}
\left|\frac1N\sum_{i=1}^N
\boldsymbol1_{\{x_i<t\}}-t\right|
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-34-star-discrepancy -->
**定義の確認（4点）**：$x=(1/8,3/8,5/8,7/8)$ なら、各点の直前・直後で経験割合が $0,1/4,1/2,3/4,1$ と変わります。各点の座標と隣接する経験割合との差の絶対値はすべて $1/8$ なので $D_4^*=1/8$ です。一方、4点を $x_i=1/8$ に重ねると、$t$ を $1/8$ より少し大きくした時点で経験割合が1となり、$D_4^*=7/8$ です。**同じ4回の評価でも、点の配置の悪さは違う**ことが数値で確認できます。
<!-- definition-example-end -->

多次元では区間 $[0,t_1)\times\cdots\times[0,t_m)$ とその体積 $\prod_jt_j$ のずれで同様に定義します。ただし「すべての低食い違い点列で、すべての金融ペイオフが速く収束する」という主張ではありません。正規逆変換は区間端で発散し、デジタル・障壁のペイオフには不連続点もあります。

一変数なら、低食い違い度が何に効くかを、追加の大規模定理に頼らず証明できます。

<a id="prop-u3-34-one-dimensional-bound"></a>
<!-- formal-statement-start -->
> **命題（一変数の QMC 積分誤差）**  
> $g:[0,1]\to\mathbb R$ は絶対連続で、導関数が Lebesgue 可積分、すなわち $\int_0^1|g'(t)|dt<\infty$ とする。任意の $x_i\in(0,1)$ について

$$
\left|\frac1N\sum_{i=1}^Ng(x_i)-\int_0^1g(u)\,du\right|
\le D_N^*\int_0^1|g'(t)|\,dt
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**：$g(x)$ を $g(0)$ と導関数の積分に分けます。各 $t$ より右にある点の割合と、一様区間の長さ $1-t$ の差が食い違い度で抑えられます。

<!-- proof-start -->
### 証明

絶対連続性から $g(x)=g(0)+\int_0^x g'(t)\,dt$ です。$g'\in L^1(0,1)$ なので、有限和と積分は交換でき、

$$
\frac1N\sum_{i=1}^Ng(x_i)
=g(0)+\int_0^1 g'(t)
\left(\frac1N\sum_i\boldsymbol1_{\{x_i>t\}}\right)dt.
$$

一方、$g$ の積分で積分順序を交換すると、領域 $0\le t\le u\le1$ より

$$
\int_0^1 g(u)\,du
=g(0)+\int_0^1 g'(t)(1-t)\,dt.
$$

有限個の点 $x_i$ と $t$ が一致する箇所は積分に影響しません。ほとんどすべての $t$ で

$$
\frac1N\sum_i\boldsymbol1_{\{x_i>t\}}
=1-\frac1N\sum_i\boldsymbol1_{\{x_i<t\}}.
$$

したがって両式の差の絶対値は

$$
\left|\int_0^1 g'(t)
\left(t-\frac1N\sum_i\boldsymbol1_{\{x_i<t\}}\right)dt\right|
\le\int_0^1|g'(t)|D_N^*dt.
$$

これが結論です。$\square$
<!-- proof-end -->

例として $g(u)=u^2$、4中点 $x_i=(i-\tfrac12)/4$ では、平均が $21/64$、真の積分は $1/3$ なので誤差は $-1/192$ です。上界は $D_4^*\int_0^1 2u\,du=1/8$。上界は安全ですが鋭いとは限りません。**先ほどのGBMの $f_1$ は端点で無界になり得る**ので、この命題をそのまま当てはめないでください。高次元の一般的な Koksma–Hlawka 型評価にも別の変動条件が必要です。

## 2. 独立な「点配置」を何度も作って誤差を測る

固定したQMC点の誤差を、点間の標本分散で測ることはできません。そこで一つの点配置を**まとめて乱択**します。単位立方体の各点の周辺分布が一様になるようにすれば、点どうしが依存していても、積分の平均値は正しく保てます。

初歩的な例は一次元の周期格子を一様に平行移動する方法です。$V\sim\operatorname{Unif}(0,1)$ を一つ発生し、

$$
X_i=(V+(i-1)/N)\bmod 1,\qquad i=1,\ldots,N
$$

とします。各 $X_i$ は一様分布です。なぜなら、任意の区間 $A\subset[0,1)$ で $Q((V+c)\bmod1\in A)=|A|$ だからです。しかし $X_1,\ldots,X_N$ は独立ではありません。$N=2$ なら必ず二点の距離は周期的に $1/2$ です。

多次元では、たとえば base 2 の Sobol 点列に独立した *scramble*（桁の乱択）を施す構成を使用できます。ここで必要なのは、乱択後の**各点の周辺分布が $(0,1)^m$ 上の一様分布**になり、異なる scramble ごとに独立な点配置を得る性質です。点配置の内部は独立と仮定しません。Sobol 点列の $N=2^k$ 個という区切りを保つのは、配置の均一性に有利な実装上の選択です。

<a id="def-u3-34-rqmc"></a>
<!-- formal-statement-start -->
> **定義（独立乱択配置による価格推定）**  
> $f_m\in L^2((0,1)^m)$ とし、$R\ge2$、$N\ge1$ とする。各 $a=1,\ldots,R$ に対し配置 $(U_{a1},\ldots,U_{aN})$ を乱択し、各 $U_{ai}$ の周辺分布は $(0,1)^m$ の一様分布、配置どうしは $a$ について独立とする。配置内の $U_{ai}$ は依存してもよい。各配置の推定値とその平均を

$$
Y_a=\frac1N\sum_{i=1}^Nf_m(U_{ai}),
\qquad
\widehat V_{R,N}^{\rm RQMC}=\frac1R\sum_{a=1}^RY_a
$$

> と定める。1配置には $N$ 回、全体には $RN$ 回の支払関数評価が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-34-rqmc -->
**定義の確認（周期格子の2点）**：$N=2$、各配置で一様シフト $V_a$ を独立に引き、$U_{a1}=V_a$、$U_{a2}=(V_a+1/2)\bmod1$ とします。二点とも一様で、配置間のシフトは独立、$f(u)=u$ は二乗可積分なので全条件を満たします。たとえば $V_1=0.1,V_2=0.7$ という実現値なら、二配置は $(0.1,0.6)$、$(0.7,0.2)$、積分近似は $Y_1=0.35,Y_2=0.45$、全体平均は $0.40$ です。**この実現値が真値 $1/2$ に等しい必要はありません**。不偏性はシフトを繰り返す確率実験の期待値で主張します。
<!-- definition-example-end -->

<a id="prop-u3-34-rqmc-se"></a>
<!-- formal-statement-start -->
> **命題（独立乱択QMCの不偏性と反復標準誤差）**  
> [乱択配置の定義](#def-u3-34-rqmc)の条件が成り立つなら、$I_m=\int f_m(u)\,du$ に対して

$$
E[\widehat V_{R,N}^{\rm RQMC}]=I_m,\qquad
\operatorname{Var}(\widehat V_{R,N}^{\rm RQMC})
=\frac{\operatorname{Var}(Y_1)}R.
$$

> $Y_a$ が同じ分布に従うとき、反復間の標本分散と標準誤差推定値は

$$
s_Y^2=\frac1{R-1}\sum_{a=1}^R(Y_a-\overline Y)^2,
\qquad
\widehat{\mathrm{SE}}_{\rm RQMC}=\sqrt{\frac{s_Y^2}{R}}.
$$

> $s_Y^2$ は $\operatorname{Var}(Y_1)$ の不偏推定量である。ただし少数反復で正規近似区間の被覆を保証するものではない。
<!-- formal-statement-end -->

**証明の見取り図**：各点は周辺一様なので、一つの配置の**平均の期待値**は積分値です。配置内に相関があってもこの段階では困りません。分散を $1/R$ にする際だけ、配置間の独立性を使います。

<!-- proof-start -->
### 証明

$f_m\in L^2$ は単位立方体の体積が1だから $L^1$ にも属します。各 $U_{ai}$ が一様なので

$$
E[f_m(U_{ai})]=\int_{(0,1)^m}f_m(u)\,du=I_m,
\quad
E[Y_a]=\frac1N\sum_{i=1}^NI_m=I_m.
$$

従って $E[\overline Y]=I_m$ です。各配置の $Y_a$ は独立同分布で二乗可積分なので

$$
\operatorname{Var}(\overline Y)
=\frac1{R^2}\sum_{a=1}^R\operatorname{Var}(Y_a)
=\frac{\operatorname{Var}(Y_1)}R.
$$

分散の不偏推定について、$\mu=I_m$ と置き、

$$
\sum_a(Y_a-\overline Y)^2
=\sum_a(Y_a-\mu)^2-R(\overline Y-\mu)^2
$$

を展開で確認します。両辺の期待値を取ると、右辺は
$R\operatorname{Var}(Y_1)-R\operatorname{Var}(\overline Y)
=(R-1)\operatorname{Var}(Y_1)$ です。従って $E[s_Y^2]=\operatorname{Var}(Y_1)$。$\square$
<!-- proof-end -->

**誤りやすい点**：同一 scramble に含まれる $N$ 個の点で通常の $N-1$ 標本分散を作り、$N$ で割っても、この推定量の分散を測ったことにはなりません。また $R=1$ では反復間分散を推定できません。独立な乱択配置が十分な数あれば、$Y_a$ に対する通常の中心極限定理を使う余地がありますが、**$R$ を固定して $N$ だけ増やしたときの正規近似**を自動的には保証しません。

### 乱択は効率向上を保証するか

固定した $N$ に対して、点の一様な周辺分布は不偏性を保証します。しかし $\operatorname{Var}(Y_a)$ が通常MCの $\operatorname{Var}(f_m(U))/N$ より小さいとは、この仮定だけからは証明できません。乱択法・関数の滑らかさ・次元・座標の順序が効率を左右します。不連続な障壁型支払や、高次元の多数の座標に等しく依存する支払では改善が弱まることがあります。

## 3. Brown 運動の生成順序で重要な座標を前へ置く

$m$ 個の正規座標を使った前進生成では、$W_{t_j}=\sqrt{\Delta t}\sum_{k\le j}Z_k$ です。終端 $W_T$ は $Z_1,\ldots,Z_m$ の**全座標**で決まります。QMC点は初期の座標ほど均一な構造を持つことが多く、終端を最初の座標だけで決められれば有利な可能性があります。

Brown 運動には、既知の両端値の間の値を正規分布から作れる性質があります。まず $W_0=0$、$W_T=\sqrt T\,Z_1$ と置きます。次に $W_{T/2}$ を両端に条件付けた正規分布で作り、さらに左右の区間の中点を作ります。この**経路の生成順序の変更**を Brownian bridge construction と呼びます。連続経路の途中越境確率を加える計算とは違います。

<a id="def-u3-34-bridge-coordinates"></a>
<!-- formal-statement-start -->
> **定義（Brownian bridge による観測時点の正規座標生成）**  
> $0\le a<t<b\le T$ において、すでに値 $W_a,W_b$ が確定しているとする。新たな独立標準正規変数 $Z$ を使い、条件付き平均と分散を

$$
\mu_{t\mid a,b}
=\frac{b-t}{b-a}W_a+\frac{t-a}{b-a}W_b,
\qquad
v_{t\mid a,b}=\frac{(t-a)(b-t)}{b-a}
$$

> として、$W_t=\mu_{t\mid a,b}+\sqrt{v_{t\mid a,b}}\,Z$ と作る。$W_0=0$、$W_T=\sqrt T Z_1$ から開始し、必要な中間観測時刻をこの規則で挿入する方法を **Brownian bridge 座標生成**という。左右の区間の補間には独立な新しい $Z$ を使用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-34-bridge-coordinates -->
**定義の確認（$T=1$、四分割）**：独立な $Z_1,\ldots,Z_4\sim N(0,1)$ から

$$
W_1=Z_1,\qquad W_{1/2}=\tfrac12Z_1+\tfrac12Z_2,
$$

$$
W_{1/4}=\tfrac12W_{1/2}+\sqrt{\tfrac18}\,Z_3,
\qquad
W_{3/4}=\tfrac12(W_{1/2}+W_1)+\sqrt{\tfrac18}\,Z_4
$$

と生成します。$W_{1/2}$ の条件付き平均は $W_1/2$、条件付き分散は $(1/2)(1/2)=1/4$ なので係数 $1/2$ です。左右の四分点では、長さ $1/2$ の区間を二分するので分散は $(1/4)^2/(1/2)=1/8$。4つの新規正規座標が独立で、各条件付き分散も正しく設定されています。
<!-- definition-example-end -->

<a id="prop-u3-34-bridge-law"></a>
<!-- formal-statement-start -->
> **命題（橋生成が Brown 運動の有限次元分布を保つ）**  
> $W_0=0$、$W_T\sim N(0,T)$ を取り、各段階で正しい両端条件付き正規分布から新しい点を発生し、異なる区間の新しい正規雑音を条件付き独立とする。このとき、任意の有限個の挿入時刻 $t_1,\ldots,t_m$ について、得られたベクトルは平均0で

$$
\operatorname{Cov}(W_{t_i},W_{t_j})
=\min(t_i,t_j)
$$

> を持つ多変量正規分布になる。従って Brown 運動の観測点と同じ分布であり、同じ観測時点の金融支払額の期待値を変えない。
<!-- formal-statement-end -->

**証明の見取り図**：Brown 運動の Gaussian 増分を使って、端点を与えたときの中間点の条件付き平均・分散を計算します。条件付き分布の連鎖を順に再構成しているので、前進順と同じ同時分布になります。

<!-- proof-start -->
### 証明

Brown 運動の独立増分を $A=W_t-W_a$、$B=W_b-W_t$ とします。平均0、分散は $t-a$、$b-t$、両者は独立です。既知の端点差 $C=W_b-W_a=A+B$ の分散は $b-a$、$\operatorname{Cov}(A,C)=t-a$ です。独立な正規変数の線形結合だから $(A,C)$ は同時正規です。係数

$$
\lambda=\frac{\operatorname{Cov}(A,C)}{\operatorname{Var}(C)}
=\frac{t-a}{b-a}
$$

で $D=A-\lambda C$ と置けば、$\operatorname{Cov}(D,C)=0$。正規分布では無相関な成分は独立なので、$E[A\mid C]=\lambda C$ かつ

$$
\operatorname{Var}(D)
=(t-a)-\frac{(t-a)^2}{b-a}
=\frac{(t-a)(b-t)}{b-a}.
$$

従って $W_t=W_a+A$ の端点条件付き分布は定義の式になります。両端で条件付けると、重ならない左右区間の内部増分の残差も独立です（もとの独立増分の各区間の正規密度を、区間ごとの端点差を固定して条件付ければ積の形が保たれます）。

最初の $W_T$ は本来の終端分布で、各挿入では本来の条件付き分布を使っています。条件付き密度の積、すなわち連鎖律により、有限回の挿入後の全ベクトルの同時分布は本来の Brown 運動と一致します。元の Brown 運動では $t_i\le t_j$ のとき $W_{t_j}=W_{t_i}+(W_{t_j}-W_{t_i})$、後者の増分は前者と独立だから共分散は $\operatorname{Var}(W_{t_i})=t_i$。よって結論の $\min(t_i,t_j)$ を得ます。$\square$
<!-- proof-end -->

前の四分割を手で検算すると

$$
W_{1/4}=\tfrac14Z_1+\tfrac14Z_2+\sqrt{\tfrac18}Z_3,
\quad
W_{3/4}=\tfrac34Z_1+\tfrac14Z_2+\sqrt{\tfrac18}Z_4.
$$

独立性を使うと

$$
\operatorname{Var}(W_{1/4})=\tfrac1{16}+\tfrac1{16}+\tfrac18=\tfrac14,
\quad
\operatorname{Cov}(W_{1/4},W_{3/4})
=\tfrac3{16}+\tfrac1{16}=\tfrac14.
$$

これは正しい Brown 運動の共分散です。**生成順序が変わっても、経路の分布は変わりません**。

