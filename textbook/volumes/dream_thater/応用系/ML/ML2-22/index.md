# ML2-22 敵対的生成モデルと分布比較

[正規化flow](../ML2-21/index.md#def-ml2-21-flow)では、逆写像とJacobianで生成標本の密度を計算した。しかし、標本を作るのは簡単でも、密度を求めるのが難しい生成器がある。その場合、生成分布を直接密度で評価する代わりに、「実データか生成データか」を見分ける判別器を学習できないだろうか。

実データ分布を $P$、生成分布を $Q$ とする。識別器 $D(x)$ は観測 $x$ が実データである確率の候補を出す。識別器は見分けたく、生成器は見分けられなくしたい。この競争の理想的な目的値がどの発散に一致するかを、有限集合から導こう。対数は自然対数である。

## 1. 分布と識別器を分けて定義する

まず観測値が有限集合 $\Omega=\{1,\ldots,k\}$ に属するとする。実データの確率質量を $p_i=P(X=i)$、生成データの確率質量を $q_i=Q(Y=i)$ と書く。どちらも非負で総和1である。潜在乱数 $Z$ を写像 $G_\theta$ へ入れ $Y=G_\theta(Z)$ とした場合、$Q=Q_\theta$ が生成分布となる。有限集合での議論には確率ベクトル $q$ だけで十分である。

識別器 $D:\Omega\to[0,1]$ の出力を $D_i=D(i)$ とする。実データでは $\log D_i$、生成データでは $\log(1-D_i)$ を大きくしたい。これは既習の[条件付き対数損失](../ML2-01/index.md#def-ml2-01-conditional-log-risk)に符号を反転して適用したものである。実データと生成データの抽出比率を等しくし、二つの期待値を同じ重みで足す。

<a id="def-ml2-22-adversarial-value"></a>

<!-- formal-statement-start -->
> **定義（敵対的生成モデルと識別器の価値関数）**
> 有限集合 $\Omega=\{1,\ldots,k\}$ 上の確率ベクトル $p=(p_i),q=(q_i)$、識別器 $D:\Omega\to[0,1]$ に対し、識別器の価値を

$$
V(D;p,q)=\sum_{i=1}^k
\left[p_i\log D_i+q_i\log(1-D_i)\right]
$$

> とする。係数0の対数項は0とみなし、正の係数に $\log0$ を掛ける項は $-\infty$ とする。識別器は $V$ を最大化し、生成器は $q=q_\theta$ を変えて $\sup_DV(D;p,q_\theta)$ を最小化する。この理想化された最小最大問題を敵対的生成モデルの目的とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-22-adversarial-value -->
**定義の確認**。$\Omega=\{1,2\}$、$p=(3/4,1/4)$、$q=(1/4,3/4)$ は各総和1の確率ベクトルである。例えば $Z$ を区間 $(0,1)$ 上の一様乱数とし、$Z<1/4$ なら1、他なら2を返す生成器が $q$ を作る。識別器 $D=(3/4,1/4)$ は両成分が $[0,1]$ に入り、

$$
V(D;p,q)=2\left(\frac34\log\frac34+\frac14\log\frac14\right)
$$

と直接計算できる。ここでは二種類の期待対数報酬を足しており、さらに $1/2$ を掛けてはいない。この規約で後述の定数項が $-\log4$ となる。
<!-- definition-example-end -->

この段階では生成器の学習が成功するとは仮定しない。**生成分布 $q$ を固定したときの最適な識別器**を最初に求める。

## 2. 固定生成分布に対する最適識別器

ある点 $i$ で実分布の質量が $p_i$、生成分布の質量が $q_i$ なら、その点の判定 $D_i=d$ による価値の寄与は $p_i\log d+q_i\log(1-d)$ である。各 $D_i$ は別々に選べるので、一次元の凹関数を最大化すればよい。

<a id="thm-ml2-22-optimal-discriminator"></a>

<!-- formal-statement-start -->
> **定理（固定生成分布の最適識別器）**
> 有限集合 $\Omega$ 上の確率ベクトル $p,q$ を固定し、[敵対的生成モデルの目的](#def-ml2-22-adversarial-value)を $D_i\in[0,1]$ の全識別器について最大化する。$p_i+q_i>0$ である点では最適成分は一意で、

$$
\boxed{D_i^*=\frac{p_i}{p_i+q_i}.}
$$

> $p_i=q_i=0$ の点では任意の $D_i$ が最適である。$p_i=0<q_i$ なら $D_i^*=0$、$q_i=0<p_i$ なら $D_i^*=1$ となる。出力を開区間 $(0,1)$ に制限した場合、こうした端点での最大値は一般に達成されず、上限値となる。
<!-- formal-statement-end -->

### 証明の見取り図

実データの比率が高いほど識別器は「実」と答える。両方の質量が正の場合は微分と二階微分で一意性を示し、片方が0の場合は対数の端点を直接調べる。

<!-- proof-start -->
### 証明

座標 $i$ を固定し $a=p_i,b=q_i$ とおく。$a,b>0$ なら $0<d<1$ で

$$
f'(d)=\frac ad-\frac b{1-d}
=\frac{a-(a+b)d}{d(1-d)},\qquad
f''(d)=-\frac a{d^2}-\frac b{(1-d)^2}<0.
$$

従って導関数は $d=a/(a+b)$ で0、それより左で正、右で負となる。また両端で $f(d)\to-\infty$ だから唯一の大域最大点である。

$a=0<b$ なら $f(d)=b\log(1-d)$ は $d=0$ で最大0。$b=0<a$ なら $f(d)=a\log d$ は $d=1$ で最大0。$a=b=0$ では規約から全 $d$ で0。これらの座標最大化は互いに独立だから、各成分を並べれば全体が最大になる。

有限な実数 $t$ から $D=\sigma(t)=1/(1+e^{-t})$ を作ると常に $0<D<1$。$D=0,1$ はそれぞれ $t\to-\infty,+\infty$ で近づけるが有限 $t$ では達成できない。$\square$
<!-- proof-end -->

第1節の二点分布なら最適識別器は $D^*=(3/4,1/4)$。一方 $p=(1,0,0)$、$q=(0,1,0)$ なら $D^*=(1,0,d)$（$0\le d\le1$）である。第三点は実・生成のどちらからも現れないため、そこにおける判定は価値に影響しない。

## 3. 二つの分布を半分ずつ混ぜて比較する

識別器の最適化が済んだ後の値を、分布 $p,q$ の違いとして表したい。比較の基準として二つを半分ずつ混ぜた分布 $m=(p+q)/2$ を作る。$m_i\ge0$、$\sum_i m_i=1$、しかも $p_i>0$ または $q_i>0$ なら $m_i>0$ である。

既習の[相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)を使う。ただしINFO2は底2の対数で測っていたので、本章では自然対数に換算したKLを使う。正の成分上での対数の底の変換から、

$$
D_{\mathrm{KL}}(p\|m)
=\sum_{i:p_i>0}p_i\log\frac{p_i}{m_i}
=(\log2)\,D^{(2)}(p\|m)
$$

となる。右辺の $D^{(2)}$ はINFO2で定義した底2の相対エントロピーを表す。分母を混合分布 $m$ にしたので、$p_i>0$ なら $m_i>0$ であり、元の分布どうしの台がずれていてもこのKLは有限となる。

<a id="def-ml2-22-js"></a>

<!-- formal-statement-start -->
> **定義（Jensen–Shannon発散）**
> 同じ有限集合 $\Omega$ 上の確率ベクトル $p,q$ に対して $m=(p+q)/2$ と置き、自然対数によるJensen–Shannon発散を

$$
\boxed{\operatorname{JS}(p,q)=
\frac12D_{\mathrm{KL}}(p\|m)
+\frac12D_{\mathrm{KL}}(q\|m)}
$$

> と定義する。確率0の項は0とする。共通の基準測度 $\mu$ に関する非負の確率密度 $p,q$ に対しても、$m=(p+q)/2$ とし和を $\mu$ 積分へ置き換えて定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-22-js -->
**定義の確認**。$p=(3/4,1/4)$、$q=(1/4,3/4)$ とすると $m=(1/2,1/2)$ は確率ベクトルで、$p,q$ の正の成分に対応する分母はすべて正である。対称性から二つのKLは同じで、

$$
\begin{aligned}
\operatorname{JS}(p,q)
&=D_{\mathrm{KL}}(p\|m)\\
&=\frac34\log\frac{3/4}{1/2}
+\frac14\log\frac{1/4}{1/2}\\
&=\frac34\log\frac32+\frac14\log\frac12
\approx0.130812.
\end{aligned}
$$

これは元の $q$ を分母に置くKLでなく、混合分布 $m$ を分母にした比較である。
<!-- definition-example-end -->

<a id="thm-ml2-22-js-value"></a>

<!-- formal-statement-start -->
> **定理（敵対的価値とJensen–Shannon発散の恒等式）**
> 同じ有限集合上の確率ベクトル $p,q$ について、[敵対的生成モデルの目的](#def-ml2-22-adversarial-value)の最適識別器による値は

$$
\boxed{\sup_D V(D;p,q)=-\log4+2\operatorname{JS}(p,q).}
$$

> 共通の $\sigma$ 有限基準測度 $\mu$ に対する非負可測確率密度 $p,q$ がそれぞれ積分1を持つ場合も、$V(D)=\int[p\log D+q\log(1-D)]\,d\mu$ と定め、可測な $D:\Omega\to[0,1]$ を許すと同じ式が成立する。$p+q>0$ のほとんど至るところで $D^*=p/(p+q)$、他の点では任意に選べる。
<!-- formal-statement-end -->

### 証明の見取り図

[最適識別器](#thm-ml2-22-optimal-discriminator)を代入すると、分母が $p+q=2m$ になる。各分布から $\log2$ が一回ずつ出ることが定数 $-\log4$ の由来である。密度への拡張では点ごとの最大化に加え、可測性と積分可能性を確かめる。

<!-- proof-start -->
### 証明

まず有限集合で、$p_i+q_i>0$ の点に $D_i^*=p_i/(p_i+q_i)$ を代入する。零確率点も対数の規約により同じ計算に含めてよい。$m_i=(p_i+q_i)/2$ だから

$$
\begin{aligned}
V(D^*;p,q)
&=\sum_i p_i\log\frac{p_i}{p_i+q_i}
+\sum_iq_i\log\frac{q_i}{p_i+q_i}\\
&=\sum_i p_i\left(\log\frac{p_i}{m_i}-\log2\right)
+\sum_iq_i\left(\log\frac{q_i}{m_i}-\log2\right)\\
&=D_{\mathrm{KL}}(p\|m)+D_{\mathrm{KL}}(q\|m)
-2\log2\\
&=2\operatorname{JS}(p,q)-\log4.
\end{aligned}
$$

第三行では $\sum p_i=\sum q_i=1$ を使った。[固定生成分布の最適識別器](#thm-ml2-22-optimal-discriminator)によりこの値が上限であり、端点を含めれば達成される。

次に密度を考える。$m=(p+q)/2$ は非負可測かつ積分1である。$p+q>0$ では $p/(p+q)$ は可測で $[0,1]$ に入り、$p+q=0$ では $1/2$ と定めれば全体で可測である。任意の可測識別器 $D$ に対し、有限のときと同じ凹関数の点ごとの最大化から、ほとんど至るところで

$$
p\log D+q\log(1-D)
\le p\log D^*+q\log(1-D^*).
$$

右辺で $s=p+q$、$t=p/s$（$s>0$）と置くと、$q=s(1-t)$ であるから右辺は

$$
s\bigl[t\log t+(1-t)\log(1-t)\bigr]
$$

となる。括弧内を $h(t)$ と書けば、$0<t<1$ で

$$
h'(t)=\log\frac{t}{1-t},\qquad
h''(t)=\frac1t+\frac1{1-t}>0.
$$

したがって最小値は $t=1/2$ での $-\log2$ である。各対数は非正だから $h(t)\le0$ であり、$0\log0=0$ の規約で端点へ連続に延ばしても

$$
-\log2\le t\log t+(1-t)\log(1-t)\le0
$$

なので右辺は $-s\log2$ と0の間であり、$\int s\,d\mu=2$ から積分が有限である。左辺は $-\infty$ を許すが、右辺より大きくならない。

KLの積分も正負を分けて確認する。$p>0$ では $u=p/m\in(0,2]$ であり、$u\log u\ge-1/e$ と $\log u\le\log2$ から

$$
-\frac{m}{e}\le p\log\frac pm\le p\log2.
$$

両端はそれぞれ積分可能なので、$p$ のKLは有限な実数となる。$q$ でも同様である。従って積分の符号付き差は曖昧にならず、有限和の各段階を $\mu$ 積分に置き換えられる。$\int p\,d\mu=\int q\,d\mu=1$ を用いて同じ恒等式を得る。$\square$
<!-- proof-end -->

これは**識別器を各生成分布に対して完全に最適化した理論値**である。交互更新の途中で観測した価値がそのままJS発散の数値になるわけではない。

<a id="prop-ml2-22-js-bounds"></a>

<!-- formal-statement-start -->
> **命題（Jensen–Shannon発散の上下界と台の分離）**
> 同じ基準測度 $\mu$ に関する確率密度 $p,q$（有限集合では数え上げ測度）について

$$
0\le\operatorname{JS}(p,q)\le\log2.
$$

> 左の等号は $p=q$ が $\mu$ ほとんど至るところで成立するとき、かつそのときに限る。右の等号は $p(x)q(x)=0$ が $\mu$ ほとんど至るところで成立するとき、かつそのときに限る。従って $\sup_DV$ の範囲は $[-\log4,0]$ である。
<!-- formal-statement-end -->

### 証明の見取り図

有限集合の下界は既習の[KLの非負性](../../INFO/INFO2/index.md#thm-info2-gibbs)に対応する。一般の基準測度の密度では、同じ対数不等式を積分して仮定を確かめる。上界は混合密度が各元の密度の半分以上であることを使い、等号の場合を台の条件まで追う。

<!-- proof-start -->
### 証明

$m=(p+q)/2$ は $p,q$ の双方を支配する。有限集合では[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)が使えるが、ここでは一般の基準測度 $\mu$ に関しても直接確認する。$A=\{x:p(x)>0\}$ で $m\ge p/2>0$ だから、$u=m/p>0$ に $\log u\le u-1$ を適用すると

$$
p\log\frac pm\ge p-m\qquad(x\in A).
$$

第3節でこのKLの有限性は確認済みなので積分でき、$\int p\,d\mu=\int m\,d\mu=1$ より

$$
D_{\mathrm{KL}}(p\|m)
\ge1-\int_A m\,d\mu
=\int_{\{p=0\}}m\,d\mu\ge0.
$$

等号なら、$A$ 上での非負の差 $p\log(p/m)-(p-m)$ の積分も、$\{p=0\}$ 上の $m$ の積分も0である。$\log u=u-1$ の等号条件は $u=1$ だから、$p=m$ が $A$ 上でほとんど至るところ成立し、$A$ の外では $m=0=p$ となる。

逆に $p=m$ ならKLは0である。$q$ にも同じ議論が使える。したがってJSが0となるのは $p=m=q$、すなわち $p=q$ が $\mu$ ほとんど至るところ成立する場合に限る。

$p>0$ では $m=(p+q)/2\ge p/2$ だから $p/m\le2$。従って

$$
D_{\mathrm{KL}}(p\|m)
=\int_{\{p>0\}}p\log\frac pm\,d\mu
\le\int p\log2\,d\mu=\log2.
$$

$q$ に対しても同じ上界が成り立つ。上界との隔たりは、$p$ 側では

$$
\log2-D_{\mathrm{KL}}(p\|m)
=\int_{\{p>0\}}p\log\frac{2m}{p}\,d\mu\ge0.
$$

被積分関数が非負なので、等号は $p>0$ のほとんど至るところで $2m=p$、すなわち $q=0$ の場合に限る。同じく $q$ 側の等号は、$q>0$ のほとんど至るところで $p=0$ の場合に限る。

JSが上界 $\log2$ に達するには両方の等号が必要である。これは $pq=0$ が $\mu$ ほとんど至るところで成り立つことと同値である。[価値の恒等式](#thm-ml2-22-js-value)へ上下界を代入して価値の範囲も従う。$\square$
<!-- proof-end -->

$p=q$ なら最適識別器は（正の質量を持つ点で）$1/2$、価値は $-\log4$。反対に台が完全に離れれば理想識別器は完全に見分け、価値は0になる。発散に上限があることと、すべての生成器パラメータが良い勾配を得ることは同じではない。

## 4. 有限パラメータでの識別器・生成器の更新

実際の識別器は有限な実数の **logit** $t_i$ から、sigmoid関数で出力を作る。

$$
D_i=\sigma(t_i)=\frac1{1+e^{-t_i}}.
$$

生成側ではsoftmaxのスコア $s_i$ から分布を作る。

$$
q_i=\frac{e^{s_i}}{\sum_j e^{s_j}}.
$$

これなら識別器の出力は開区間 $(0,1)$ に、生成分布の全成分は正の値に入り、その総和は1である。ここでは両者を独立に更新する離散模型を考える。

生成器側の一回の更新では、現在の識別器を固定し、次の生成目的を小さくする。

$$
G(s;t)=\sum_i q_i(s)\log(1-D_i(t)).
$$

識別器の $t_i$ に関する偏微分では生成器のスコア $s$（したがって $q$）を固定し、生成器の $s_j$ に関する偏微分では $t$ を固定する。識別器のHessian（2階偏微分行列）は

$$
\nabla_t^2V=\left(\frac{\partial^2V}{\partial t_i\partial t_j}\right)_{i,j=1}^k
$$

と表す。いずれも識別器を $D^*(q)$ へ再最適化した目的関数を微分する操作とは違う。

<a id="prop-ml2-22-discrete-gradients"></a>

<!-- formal-statement-start -->
> **命題（識別器logitと生成器softmaxの勾配）**
> 有限集合 $\Omega=\{1,\ldots,k\}$、確率ベクトル $p$、有限の実数パラメータ $t,s\in\mathbb R^k$ に対し、$D_i=\sigma(t_i)$、$q_i=e^{s_i}/\sum_\ell e^{s_\ell}$ とする。識別器の目的 $V$ の偏微分は

$$
\frac{\partial V}{\partial t_i}
=p_i(1-D_i)-q_iD_i,\qquad
\frac{\partial^2V}{\partial t_i^2}
=-(p_i+q_i)D_i(1-D_i).
$$

> また $a_i=\log(1-D_i)$、$\overline a=\sum_iq_i a_i$ とすれば、$t$ を固定した生成目的 $G(s;t)=\sum_iq_i a_i$ の偏微分は

$$
\boxed{\frac{\partial G}{\partial s_j}
=q_j(a_j-\overline a).}
$$
<!-- formal-statement-end -->

### 証明の見取り図

logitの一変数微分とsoftmaxの商の微分を行う。後者は分母が全スコアに依存するので、単純に $q_j a_j$ とはならない。[逆伝播の連鎖律](../ML2-14/index.md#thm-ml2-14-reverse-chain)の有限例である。

<!-- proof-start -->
### 証明

$\sigma'(t_i)=e^{-t_i}/(1+e^{-t_i})^2=D_i(1-D_i)$。他の $D_j$ は $t_i$ に依存しないので

$$
\begin{aligned}
\frac{\partial V}{\partial t_i}
&=\left(\frac{p_i}{D_i}-\frac{q_i}{1-D_i}\right)
D_i(1-D_i)\\
&=p_i(1-D_i)-q_iD_i.
\end{aligned}
$$

さらに $p,q$ を固定して微分すれば第二微分式となり、混合二階微分は0である。

$S=\sum_\ell e^{s_\ell}$ と置く。分子・分母の微分を別々に行うと

$$
\frac{\partial q_i}{\partial s_j}
=\frac{\boldsymbol1_{\{i=j\}}e^{s_i}S-e^{s_i}e^{s_j}}{S^2}
=q_i(\boldsymbol1_{\{i=j\}}-q_j).
$$

従って $a_i$ を定数として扱えば

$$
\begin{aligned}
\frac{\partial G}{\partial s_j}
&=\sum_i a_iq_i(\boldsymbol1_{\{i=j\}}-q_j)\\
&=a_jq_j-q_j\sum_iq_i a_i
=q_j(a_j-\overline a).
\end{aligned}
$$

また $\sum_j\partial G/\partial s_j=\sum_jq_ja_j-\overline a\sum_jq_j=0$ であり、全スコアへの共通定数の加算がsoftmaxを変えないことと整合する。$\square$
<!-- proof-end -->

**更新方向の例**。$p=(0.6,0.4)$、$q=(0.2,0.8)$、$t=(0,0)$ なら $D=(1/2,1/2)$。識別器の上昇勾配は $(0.2,-0.2)$ だが、生成器の係数は $a_1=a_2=\log(1/2)$ であるため生成器の勾配は0。この瞬間は識別器がまだ違いを学んでおらず、生成側は方向を得ない。

## 5. 台の分離とmode collapseを混同しない

$p=(1,0,0)$、$q_\theta=(0,\theta,1-\theta)$（$0<\theta<1$）を考えよう。実データは点1のみ、生成器は点2か3のみを出す。この族の内部では最適識別器は常に $(1,0,0)$ であり、[台の分離の命題](#prop-ml2-22-js-bounds)により

$$
\operatorname{JS}(p,q_\theta)=\log2,\qquad
\sup_DV(D;p,q_\theta)=0.
$$

$\theta$ を動かしても実データ側の点1へ質量を置けない。したがってこの**特定のパラメータ族内**では理想化した値は一定であり、勾配も0である。連続空間で支持集合が動く場合は、微分可能性そのものが別問題になる。一般のGANが常に零勾配になるという結論ではない。

実装では、識別器を完全に最適化せず、生成器に次の**非飽和生成損失**を使うことがある。現在の識別器に生成標本を「実」と答えさせる負の対数損失である。

$$
L_{\mathrm{NS}}(\theta;D)
=-E_{Y\sim Q_\theta}[\log D(Y)].
$$

元の生成器は $E_Q[\log(1-D(Y))]$ を小さくするが、非飽和損失は固定された現在の識別器に対する別の勾配を与える。$D(Y)$ が0に近いと損失は大きく、0ちょうどでは無限大なので有限な微分式を無条件には書けない。実際の有限logitでは $0<D<1$ だが数値的な飽和には注意が必要である。この変更がJS発散の単調減少を保証するわけでもない。

**mode collapse** も区別する。$p=(1/2,1/2)$ が二つの様式を等量含むのに、$q=(1,0)$ しか生成しない場合、$m=(3/4,1/4)$ となり

$$
\begin{aligned}
D_{\mathrm{KL}}(p\|m)
&=\frac12\log\frac23+\frac12\log2
=\frac12\log\frac43,\\
D_{\mathrm{KL}}(q\|m)&=\log\frac43,\\
\operatorname{JS}(p,q)&=\frac34\log\frac43>0.
\end{aligned}
$$

生成器が $q=p$ を実現できればJSは0なので、collapseは**理論目的の大域最適解ではない**。しかし表現力不足、限られた標本、識別器と生成器の交互更新の不安定さで学習中に一部のmodeを失うことはある。目的関数の性質と算法の到達可能性を分けよう。

## 6. 再計算ラボ：有限分布を交互に更新する

実分布を $p=(0.6,0.3,0.1)$ に固定し、現在の $q$ と識別器 $D$ を交互に更新する。以下はPythonの標準ライブラリだけで動く**全期待値**による計算であり、乱数を使わないので実行結果は決定的である。更新は[勾配命題](#prop-ml2-22-discrete-gradients)をそのまま使う。任意の学習率に対する収束保証を表すものではない。

~~~python
import math

p = [0.6, 0.3, 0.1]
s = [0.6, -0.4, -1.2]  # generator scores
t = [0.0, 0.0, 0.0]    # discriminator logits
disc_lr, gen_lr = 0.5, 0.3
steps = 4000

def softmax(scores):
    shift = max(scores)
    exp_values = [math.exp(v - shift) for v in scores]
    total = sum(exp_values)
    return [v / total for v in exp_values]

def sigmoid(x):
    if x >= 0:
        return 1 / (1 + math.exp(-x))
    z = math.exp(x)
    return z / (1 + z)

def kl(a, b):
    return sum(x * math.log(x / y) for x, y in zip(a, b) if x > 0)

def js(a, b):
    m = [(x + y) / 2 for x, y in zip(a, b)]
    return (kl(a, m) + kl(b, m)) / 2

initial_q = softmax(s)
for _ in range(steps):
    q = softmax(s)
    d = [sigmoid(v) for v in t]
    dt = [pi * (1 - di) - qi * di
          for pi, qi, di in zip(p, q, d)]
    t = [ti + disc_lr * gi for ti, gi in zip(t, dt)]

    d = [sigmoid(v) for v in t]
    a = [math.log1p(-di) for di in d]
    avg = sum(qi * ai for qi, ai in zip(q, a))
    ds = [qi * (ai - avg) for qi, ai in zip(q, a)]
    s = [si - gen_lr * gi for si, gi in zip(s, ds)]

final_q = softmax(s)
print("initial q:", [round(x, 6) for x in initial_q])
print("final q:", [round(x, 6) for x in final_q])
print("JS before/after:", round(js(p, initial_q), 8),
      round(js(p, final_q), 8))
print("optimal D*:", [round(pi / (pi + qi), 6)
                      for pi, qi in zip(p, final_q)])
assert all(x > 0 for x in final_q)
assert abs(sum(final_q) - 1) < 1e-12
assert js(p, final_q) < js(p, initial_q)
~~~

この模型では $q$ の全成分が常に正で、最適化の結果を正確なJS発散で照合できる。最初のJSは約 $0.00229178$、4000反復後は表示精度で0となり、$q$ は $(0.6,0.3,0.1)$ に近づく。識別器の学習率・生成器の学習率・初期スコアを変えて、悪化や収束の遅さを確かめよう。通常の敵対的生成学習では、真の期待値を知る代わりに標本平均で勾配を近似する。

## 7. 演習

### Level A

**ML2-22-A01（二点分布の識別と値）**
- Level: A
- 問題: 有限集合 $\Omega=\{1,2\}$ 上の実分布 $p=(3/4,1/4)$ と生成分布 $q=(1/4,3/4)$ を考える。$D^*$、混合分布 $m$、JS発散、最大価値 $V(D^*;p,q)$ を求めて恒等式を検算せよ。
<!-- solution-start -->
**詳細解答**。各点の分母 $p_i+q_i$ は1だから、[最適識別器](#thm-ml2-22-optimal-discriminator)から

$$
D^*=\left(\frac34,\frac14\right),\qquad
m=\left(\frac12,\frac12\right).
$$

両KLは対称性から同じであり、[JSの定義](#def-ml2-22-js)へ代入して

$$
\operatorname{JS}(p,q)
=\frac34\log\frac32+\frac14\log\frac12
$$

を得る。一方価値へ直接代入すると

$$
V(D^*;p,q)
=2\left(\frac34\log\frac34+\frac14\log\frac14\right).
$$

$\log(3/4)=\log(3/2)-\log2$、$\log(1/4)=\log(1/2)-\log2$ を使って展開すると、$V(D^*)=2\operatorname{JS}(p,q)-2\log2$ となり、[価値とJSの恒等式](#thm-ml2-22-js-value)と一致する。
<!-- solution-end -->

**ML2-22-A02（零質量点と端点）**
- Level: A
- 問題: $\Omega=\{1,2,3\}$ で $p=(1,0,0)$、$q=(0,1,0)$ とする。最適識別器の全体、最大価値、JS発散を求めよ。有限なlogit $t_i$ から $D_i=\sigma(t_i)$ を作る場合、最大値が達成されるかも判定せよ。
<!-- solution-start -->
**詳細解答**。点1では $p_1>0,q_1=0$ だから $D_1^*=1$、点2では $p_2=0,q_2>0$ だから $D_2^*=0$。点3では双方の質量が0なので識別器の値は自由である。全最適解は $D^*=(1,0,d)$、$0\le d\le1$。

各非零項は $\log1=0$ なので $V(D^*)=0$。$m=(1/2,1/2,0)$ から $D_{\mathrm{KL}}(p\|m)=D_{\mathrm{KL}}(q\|m)=\log2$、従ってJSは $\log2$。有限logitでは $0<D_i<1$ だから、質量が正の点1,2の報酬は必ず負になる。$t_1\to+\infty$、$t_2\to-\infty$ なら上限0へ近づくが有限の $t$ では達成できない。
<!-- solution-end -->

**ML2-22-A03（分布が一致する場合）**
- Level: A
- 問題: $\Omega=\{1,2\}$ 上で $p=q=(2/3,1/3)$ とする。最適識別器、JS発散、最大価値を求め、各点で識別器の出力が同じになる理由を説明せよ。
<!-- solution-start -->
**詳細解答**。各点で $p_i=q_i>0$ より $D_i^*=p_i/(p_i+q_i)=1/2$ である。$m=p=q$ なので $D_{\mathrm{KL}}(p\|m)=D_{\mathrm{KL}}(q\|m)=0$、JSも0。価値は

$$
V(D^*)=\sum_i(p_i+q_i)\log\frac12
=2\log\frac12=-\log4.
$$

点ごとの実質量と生成質量が同じなので、点を観測しても「実か生成か」の判定に有利な情報がない。どちらも同率で抽出されることが $D^*=1/2$ の理由である。
<!-- solution-end -->

**ML2-22-A04（logit勾配と凹性）**
- Level: A
- 問題: 二点集合で実分布 $p=(0.6,0.4)$、生成分布 $q=(0.2,0.8)$、識別器logit $t=(0,0)$ とする。$\nabla_tV$ とHessianを求め、微小な勾配上昇がどちらの点の実判定を増やすか答えよ。
<!-- solution-start -->
**詳細解答**。$D=(1/2,1/2)$ である。[識別器logitと生成器softmaxの勾配](#prop-ml2-22-discrete-gradients)へ代入すると

$$
\frac{\partial V}{\partial t_1}
=0.6(0.5)-0.2(0.5)=0.2,\quad
\frac{\partial V}{\partial t_2}
=0.4(0.5)-0.8(0.5)=-0.2.
$$

混合微分は0、対角成分は $-(p_i+q_i)D_i(1-D_i)$ なので

$$
\nabla_t^2V=\begin{pmatrix}-0.2&0\\0&-0.3\end{pmatrix}.
$$

正の学習率で $t_1$ は増え、$t_2$ は減る。$\sigma$ は単調増加なので点1の実判定は増え、点2では減る。Hessianの負の対角成分は、この固定 $q$ の目的がlogitについて凹であることとも整合する。
<!-- solution-end -->

### Level B

**ML2-22-B01（固定識別器と二つの生成目的）**
- Level: B
- 問題: 二点集合の生成器が $s=(0,\log3)$ のsoftmaxで $q=(1/4,3/4)$ を作り、現在の固定識別器が $D=(3/4,1/2)$ とする。元の生成目的 $G=\sum_iq_i\log(1-D_i)$ と非飽和損失 $L_{\mathrm{NS}}=-\sum_iq_i\log D_i$ の両方について、$s_1,s_2$ に関する勾配を求め、両者が異なることを示せ。
<!-- solution-start -->
**詳細解答**。$e^{s_1}=1,e^{s_2}=3$ なのでsoftmaxの分母4から指定の分布となる。[softmax勾配](#prop-ml2-22-discrete-gradients)により、固定係数 $c=(c_1,c_2)$ に対して

$$
\frac{\partial}{\partial s_1}\sum_iq_ic_i
=q_1(1-q_1)(c_1-c_2)
=\frac3{16}(c_1-c_2).
$$

全スコアへの共通加算で分布が変わらないので $s_2$ の微分は上式の符号反転となる。$G$ では $c=(\log(1/4),\log(1/2))$ だから

$$
\nabla_sG=\left(-\frac3{16}\log2,\frac3{16}\log2\right).
$$

非飽和損失では $c=(-\log(3/4),-\log(1/2))$ だから差 $c_1-c_2=\log(4/3)-\log2=\log(2/3)$。従って

$$
\nabla_sL_{\mathrm{NS}}
=\left(\frac3{16}\log\frac23,-\frac3{16}\log\frac23\right).
$$

$\log(2/3)\ne-\log2$ であり、二つの局所更新は同じではない。どちらもここでは $s_1$ を増やす降下方向だが、勾配の大きさが異なる。
<!-- solution-end -->

**ML2-22-B02（連続密度のsupportと最適識別）**
- Level: B
- 問題: Lebesgue測度に関する実密度 $p(x)=1$（$0<x<1$）、それ以外0に対し、(i) 生成密度 $q(x)=1$（$1<x<2$）、それ以外0、(ii) $q(x)=1/2$（$0<x<2$）、それ以外0を別々に考える。各場合の最適識別器、JS発散、最大価値を求めよ。端点 $x=1$ での密度値は任意でよい。
<!-- solution-start -->
**詳細解答**。両設定とも非負で積分1の密度である。(i) は二分布の台が測度零の境界を除いて分離する。$D^*=1$ を $(0,1)$ で、$D^*=0$ を $(1,2)$ で取り、他では任意。[台の分離命題](#prop-ml2-22-js-bounds)からJSは $\log2$、最大価値は0である。

(ii) では $(0,1)$ 上で $p=1,q=1/2$ だから $D^*=1/(3/2)=2/3$、$(1,2)$ では $p=0,q=1/2$ なので $D^*=0$。混合密度は $(0,1)$ で $3/4$、$(1,2)$ で $1/4$ である。

$$
D_{\mathrm{KL}}(p\|m)=\int_0^1\log\frac1{3/4}\,dx
=\log\frac43,
$$

$$
\begin{aligned}
D_{\mathrm{KL}}(q\|m)
&=\int_0^1\frac12\log\frac{1/2}{3/4}\,dx+
\int_1^2\frac12\log\frac{1/2}{1/4}\,dx\\
&=\frac12\log\frac23+\frac12\log2
=\frac12\log\frac43.
\end{aligned}
$$

従ってJSは $\frac34\log(4/3)$、最大価値は $-\log4+\frac32\log(4/3)$。台の部分的重なりがあるため(i)と違いJSは上限に達しない。
<!-- solution-end -->

**ML2-22-B03（mode collapseの最適性）**
- Level: B
- 問題: 二点集合の実分布 $p=(1/2,1/2)$ に対し、生成分布が $q=(1,0)$ に偏った。$m$、$D^*$、JS発散、最大価値を計算せよ。また $q=p$ を実現できる生成器において、この偏りが大域最適にならないことを証明せよ。
<!-- solution-start -->
**詳細解答**。$m=(3/4,1/4)$。[最適識別器](#thm-ml2-22-optimal-discriminator)は $D^*=(1/3,1)$。KLを定義から計算すると

$$
D_{\mathrm{KL}}(p\|m)
=\frac12\log\frac{1/2}{3/4}
+\frac12\log\frac{1/2}{1/4}
=\frac12\log\frac43,
$$

$$
D_{\mathrm{KL}}(q\|m)=\log\frac1{3/4}=\log\frac43.
$$

従って $\operatorname{JS}(p,q)=\frac34\log(4/3)$、最大価値は $-\log4+\frac32\log(4/3)$。$\log(4/3)>0$ なのでこの価値は $-\log4$ より大きい。$q=p$ を生成できれば[JSの下界](#prop-ml2-22-js-bounds)0を達成し最大価値は $-\log4$ となるため、$q=(1,0)$ は大域最適でない。ただし学習算法の収束は別問題である。
<!-- solution-end -->

**ML2-22-B04（実と生成の抽出比率が異なる場合）**
- Level: B
- 問題: 有限集合 $\Omega$ 上の確率ベクトル $p,q$、$0<\pi<1$ に対して $V_\pi(D)=\pi\sum_i p_i\log D_i+(1-\pi)\sum_iq_i\log(1-D_i)$ を考える。$m_\pi=\pi p+(1-\pi)q$ と置く。最適識別器を求め、最大値をKLで表し、さらに $p=q$ のときの値を導け。
<!-- solution-start -->
**詳細解答**。

**（1）最適識別器。** 点 $i$ で係数を $a=\pi p_i,b=(1-\pi)q_i$ と置く。[最適識別器の証明](#thm-ml2-22-optimal-discriminator)へ代入すると、$m_{\pi,i}>0$ なら

$$
D_i^*=\frac{\pi p_i}{\pi p_i+(1-\pi)q_i}
=\frac{\pi p_i}{m_{\pi,i}}.
$$

両質量0の点では任意、片方だけ正なら端点0または1となる。

**（2）最大価値。** $1-D_i^*=(1-\pi)q_i/m_{\pi,i}$ を価値へ代入し、$\sum p_i=\sum q_i=1$ を使うと

$$
\begin{aligned}
V_\pi(D^*)&=\pi\sum_i p_i\log\frac{\pi p_i}{m_{\pi,i}}
+(1-\pi)\sum_iq_i\log\frac{(1-\pi)q_i}{m_{\pi,i}}\\
&=\pi\log\pi+(1-\pi)\log(1-\pi)\\
&\quad+\pi D_{\mathrm{KL}}(p\|m_\pi)
+(1-\pi)D_{\mathrm{KL}}(q\|m_\pi).
\end{aligned}
$$

**（3）分布が一致する場合。** $p=q$ なら $m_\pi=p$ で二つのKLは0。正の質量がある点で $D_i^*=\pi$、最大値は $\pi\log\pi+(1-\pi)\log(1-\pi)$ になる。抽出比率を変えたときに $p/(p+q)$ をそのまま使ってはいけない。
<!-- solution-end -->

### Level C

**ML2-22-C01（三点分布の識別・発散・生成更新）**
- Level: C
- 問題: $\Omega=\{1,2,3\}$ 上の実分布 $p=(1/2,1/3,1/6)$ と生成分布 $q=(1/6,1/3,1/2)$ を考える。対数は自然対数とする。

  1. 混合分布 $m=(p+q)/2$ と最適識別器 $D^*$ を求め、各点の判定を説明せよ。
  2. 二つのKL、JS発散、最大価値を求め、$V(D^*)$ の直接代入でも検算せよ。
  3. 生成器がsoftmaxスコア $s=(\log1,\log2,\log3)$ により $q$ を作り、識別器を(1)の $D^*$ に**固定**する。$G(s;t)=\sum_iq_i\log(1-D_i^*)$ の各スコアの偏微分を求め、勾配和が0となることを検算せよ。
  4. この生成器が $p$ を実現できるとして、理論上どちらへ質量を移すべきか、また(3)の一回の更新から大域最適への収束を保証できるか述べよ。
<!-- solution-start -->
**詳細解答**。(1) 各点で $p_i+q_i=2/3$ だから

$$
m=\left(\frac13,\frac13,\frac13\right),\quad
D^*=\left(\frac{1/2}{2/3},\frac{1/3}{2/3},\frac{1/6}{2/3}\right)
=\left(\frac34,\frac12,\frac14\right).
$$

点1は実が多く、点3は生成が多く、点2は等率である。

(2) すべての $m_i$ が正なのでKLの計算に零の分母はない。成分の入れ替えにより両KLは同じで、

$$
\begin{aligned}
D_{\mathrm{KL}}(p\|m)
&=\frac12\log\frac{1/2}{1/3}
+\frac13\log\frac{1/3}{1/3}
+\frac16\log\frac{1/6}{1/3}\\
&=\frac12\log\frac32-\frac16\log2
=D_{\mathrm{KL}}(q\|m).
\end{aligned}
$$

従ってJSは $\frac12\log(3/2)-\frac16\log2$、[価値の恒等式](#thm-ml2-22-js-value)から最大価値は $-\log4+\log(3/2)-\frac13\log2$。直接代入では

$$
\begin{aligned}
V(D^*)&=\frac12\log\frac34+\frac13\log\frac12+\frac16\log\frac14\\
&\quad+\frac16\log\frac14+\frac13\log\frac12+\frac12\log\frac34\\
&=\log\frac34+\frac23\log\frac12+\frac13\log\frac14
=\log3-\frac{10}3\log2.
\end{aligned}
$$

恒等式側でも $-\log4+\log(3/2)-\frac13\log2=\log3-\frac{10}3\log2$ と一致する。

(3) $e^{s_i}=(1,2,3)$、その和6なので $q=(1/6,1/3,1/2)$。(1) の識別器は全成分が開区間 $(0,1)$ に入るため、$D_i^*=\sigma(t_i)$ に対応する有限logitは $t_i=\log\bigl(D_i^*/(1-D_i^*)\bigr)$、すなわち $t=(\log3,0,-\log3)$ と取れる。この $t$ を固定するので、係数は

$$
a_i=\log(1-D_i^*),\qquad
a=\left(-\log4,-\log2,\log\frac34\right).
$$

加重平均は

$$
\begin{aligned}
\overline a
&=\frac16(-2\log2)+\frac13(-\log2)
+\frac12(\log3-2\log2)\\
&=\frac12\log3-\frac53\log2.
\end{aligned}
$$

[softmax勾配](#prop-ml2-22-discrete-gradients)を用いると、全成分は

$$
\begin{aligned}
g_1&=\frac16\left(-2\log2-\overline a\right),\\
g_2&=\frac13\left(-\log2-\overline a\right),\\
g_3&=\frac12\left(\log3-2\log2-\overline a\right).
\end{aligned}
$$

$\sum_j g_j=\sum_j q_j a_j-\overline a\sum_jq_j=0$。$a_1<\overline a$、$a_3>\overline a$ なので、微小な勾配下降で $s_1$ は増え $s_3$ は減る。

(4) 実分布は点1の質量が生成分布より大きく、点3はその逆。理想上は点1へ質量を移し点3から減らして $q=p$ とすればJSの最小値0へ達する。ただし(3)は**現在の識別器を固定した局所勾配**である。識別器を更新し直すと勾配も変わり、非凸パラメータ化や学習率の影響もあるので、この一回の符号だけで大域的収束を保証できない。
<!-- solution-end -->

## まとめ

- 固定された生成分布に対して識別器を完全に最適化すると、実データの相対質量 $p/(p+q)$ を出力する。
- 同率で抽出した理想的な最大価値は $-\log4+2\operatorname{JS}(P,Q)$。混合分布を分母に置くため、元の二分布の台が違ってもJSは有限となる。
- JS発散は0以上 $\log2$ 以下で、分布一致で0、台が分離すると上限に飽和する。
- 実際の交互更新、非飽和生成損失、有限の識別器は理論的な最適価値と区別する。
- mode collapseは理想目的の大域最適ではないが、生成器の表現・学習手続きの問題として生じ得る。

次講では、識別器を用いる分布比較とは異なり、対数密度の空間微分であるscoreを学ぶ。
