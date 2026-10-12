# SM3 正準アンサンブルと分配関数

[SM2の微正準アンサンブル](../SM2/index.md#def-sm2-microcanonical)は、孤立した系のエネルギーを固定するときの記述でした。しかし実験で試料を一定温度の環境に置くと、試料は周囲と熱を交換できます。試料だけのエネルギーを一つに固定してしまうと、この交換を表現できません。

必要なのは、試料の各エネルギーがどの程度現れるかを決め、平均エネルギー、揺らぎ、熱力学的な自由エネルギーを同じ確率分布から計算する道具です。この章では、まず孤立した「試料＋熱浴」の数え上げから指数重みの理由を調べ、次に有限系では厳密に扱える**正準アンサンブル**を構成します。温度は熱浴が与える外部条件であり、[SM2の統計的温度](../SM2/index.md#def-sm2-statistical-temperature)との関係を確認します。

## 1. 孤立した全体系から部分系を取り出す

試料Sの状態集合を有限集合 $\Omega$、エネルギーを $H:\Omega\to\mathbb R$ とします。熱浴Bも有限状態集合を持ち、弱い相互作用のエネルギーを無視でき、全エネルギーが厳密に $U$ で固定されているとします。熱浴のエネルギー $v$ に対応する状態数を $W_B(v)$ と書き、許されないエネルギーでは0とします。

[加法的複合系の状態数](../SM2/index.md#prop-sm2-composite-counting)と[微正準分布のエネルギー分割確率](../SM2/index.md#prop-sm2-energy-split-probability)を、今度は試料の**一つの配置**に適用してみます。

<a id="prop-sm3-bath-exact"></a>

<!-- formal-statement-start -->
> **命題（有限熱浴の厳密な周辺分布）**  
> 有限試料 $\Omega$ と有限熱浴Bが加法的エネルギー $H(\omega)+H_B(b)$ を持ち、全エネルギー $U$ の複合状態の集合が空でないとする。複合系の厳密準位 $U$ に[微正準等確率](../SM2/index.md#def-sm2-microcanonical)を置くと、試料の各配置 $\omega$ の周辺確率は

$$
P_S(\omega)=\frac{W_B(U-H(\omega))}{\sum_{\eta\in\Omega}W_B(U-H(\eta))}.
$$

> これは熱浴の状態数を用いた**厳密な**有限系の式であり、一般には指数重みと一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

試料の配置を一つ指定すると、熱浴に残るエネルギーが決まります。等確率であるのは複合系の個々の状態で、試料配置ごとの重みはその配置と組になる熱浴状態の数です。

<!-- proof-start -->
### 証明

全エネルギー $U$ を持つ複合状態集合を $\Gamma_U$ と書きます。試料を $\omega$ に固定した場合、

$$
H(\omega)+H_B(b)=U
\quad\Longleftrightarrow\quad
H_B(b)=U-H(\omega)
$$

なので、組にできる熱浴の状態数は $W_B(U-H(\omega))$ です。異なる $\omega$ に属する複合配置は互いに重複しないため、

$$
|\Gamma_U|=\sum_{\eta\in\Omega}W_B(U-H(\eta))>0.
$$

[微正準分布の規格化と観測量](../SM2/index.md#prop-sm2-uniform-observables)により各複合配置の確率は $1/|\Gamma_U|$ です。$\omega$ を固定した上で可能な $b$ にわたってこの確率を足せば、提示した式となります。
<!-- proof-end -->

### 例：有限熱浴では指数重みにならないことがある

試料のエネルギーが $0,\varepsilon$ の二配置で、熱浴の対応する状態数が $W_B(U)=3$、$W_B(U-\varepsilon)=1$ なら、試料の確率は $3/4,1/4$ です。別の中間エネルギー準位まで加えると、熱浴の状態数の対数がエネルギーに関して直線でない限り、同じ一つの指数係数で全準位の比を表せるとは限りません。

大きな熱浴では、試料のエネルギーの変化が熱浴全体のエネルギーに比べて小さければ、状態数の対数の変化を一次の項で近似することが考えられます。ただし「熱浴が大きい」という言葉だけでは誤差は評価できません。

<a id="prop-sm3-bath-approx"></a>

<!-- formal-statement-start -->
> **命題（熱浴近似と指数重みの誤差）**  
> 有限試料 $\Omega$ の各エネルギー $H(\omega)$ について $W_B(U-H(\omega))>0$ とし、ある実数 $a,\beta$ と $\delta\ge0$ が存在して

$$
\left|\log W_B(U-H(\omega))-a+\beta H(\omega)\right|\le\delta
\qquad(\omega\in\Omega)
$$

> を満たすとする。正準形の候補を $q_\beta(\omega)=e^{-\beta H(\omega)}/Z(\beta)$、$Z(\beta)=\sum_{\eta\in\Omega}e^{-\beta H(\eta)}$ とおけば

$$
e^{-2\delta}\le \frac{P_S(\omega)}{q_\beta(\omega)}\le e^{2\delta}
\qquad(\omega\in\Omega)
$$

> が成り立つ。さらに $\log W_B(v)$ を $U$ の近傍で二回連続微分可能な滑らかな状態数近似 $\ell(v)$ に置き換え、すべての $U-H(\omega)$ がその近傍にあれば、$\beta=\ell'(U)$ と選べる。$|\ell''(v)|\le M$ がその間で成立すれば、一次Taylor近似の誤差は各配置で $M H(\omega)^2/2$ 以下となる。
<!-- formal-statement-end -->

### 証明の見取り図

状態数を指数関数に直すと、誤差は重みの倍率になります。規格化定数にも同じ範囲の誤差が入るため、確率の比では二倍の指数誤差を見積もります。

<!-- proof-start -->
### 証明

仮定を $r_\omega=\log W_B(U-H(\omega))-a+\beta H(\omega)$ と書くと $|r_\omega|\le\delta$ で、

$$
W_B(U-H(\omega))=e^a e^{-\beta H(\omega)}e^{r_\omega}.
$$

$r_\eta\in[-\delta,\delta]$ を各項に適用して正の項を足せば、

$$
e^{-\delta}Z(\beta)\le
\sum_{\eta\in\Omega}e^{-\beta H(\eta)}e^{r_\eta}
\le e^\delta Z(\beta).
$$

[有限熱浴の厳密式](#prop-sm3-bath-exact)へ代入し、$e^a$ を約分します。$P_S(\omega)/q_\beta(\omega)$ は $e^{r_\omega}$ を上記の和と $Z$ の比で割ったものなので、下限は $e^{-\delta}/e^\delta$、上限は $e^\delta/e^{-\delta}$ です。

最後の主張は、[Taylorの定理（Lagrange剰余）](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)を関数 $\ell$、次数 $n=1$、展開点 $a=U$、評価点 $x=U-H(\omega)$ に適用します。$\ell$ は該当区間で $C^2$ 級であり、$H(\omega)=0$ の場合は剰余が0となります。したがって、

$$
\ell(U-H(\omega))
=\ell(U)-H(\omega)\ell'(U)
+\frac{H(\omega)^2}{2}\ell''(\xi_\omega)
$$

となる中間点 $\xi_\omega$ を取れば得られます。したがって $a=\ell(U)$、$\beta=\ell'(U)$、$\delta=(M/2)\max_\omega H(\omega)^2$ で評価できます。実際の離散状態数に滑らかな近似を使うには、その近似自体の誤差も別に管理する必要があります。
<!-- proof-end -->

熱浴のBoltzmannエントロピーを $S_B(v)=k_{\mathrm B}\ell(v)$ として[統計的温度の関係](../SM2/index.md#def-sm2-statistical-temperature)が適用できるなら、

$$
\beta=\ell'(U)=\frac1{k_{\mathrm B}}\frac{\partial S_B}{\partial U}
=\frac1{k_{\mathrm B}T}.
$$

正の温度 $T$ の熱浴では $\beta>0$ です。以後は熱浴からの近似の成否とは分けて、任意の有限模型について正準分布自体を**厳密に定義**します。

## 2. 分配関数がすべての確率を規格化する

指数重みの和は、一つの数に見えて全配置の情報を含みます。ここでエネルギー関数は外部温度によって変化しないものとします。磁場や容積など別の制御パラメータがある場合は、微分中はそれらを固定します。

<a id="def-sm3-canonical"></a>

<!-- formal-statement-start -->
> **定義（有限正準アンサンブルと分配関数）**  
> 空でない有限集合 $\Omega$、エネルギー関数 $H:\Omega\to\mathbb R$、正の定数 $k_{\mathrm B}$、温度 $T>0$ を固定する。逆エネルギー次元のパラメータ $\beta=1/(k_{\mathrm B}T)>0$ に対し、**分配関数** $Z(\beta)$ と**Gibbs分布** $p_\beta$ を

$$
Z(\beta)=\sum_{\omega\in\Omega}e^{-\beta H(\omega)},
\qquad
p_\beta(\omega)=\frac{e^{-\beta H(\omega)}}{Z(\beta)}
$$

> と定義する。この確率分布を持つ有限アンサンブルを**正準アンサンブル**という。数学的には $\beta\in\mathbb R$ でも同じ式が定義できるが、本章の温度・自由エネルギーの議論は $T>0$ を対象とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm3-canonical -->
### 例：励起状態が二通りある模型

**定義の確認**：三配置 $\Omega=\{g,e_1,e_2\}$ に $H(g)=0$、$H(e_1)=H(e_2)=\varepsilon>0$ を与えます。$r=e^{-\beta\varepsilon}\in(0,1)$ と置くと、

$$
Z=1+2r,\qquad
p_\beta(g)=\frac1{1+2r},\qquad
p_\beta(e_1)=p_\beta(e_2)=\frac r{1+2r}.
$$

三つとも非負で和は $(1+2r)/(1+2r)=1$。同じエネルギーを持つ二配置は**それぞれ**重み $r$ を持ちます。準位 $\varepsilon$ の確率は二つを合わせた $2r/(1+2r)$ で、配置の確率と準位の確率を区別します。
<!-- definition-example-end -->

<a id="prop-sm3-normalization"></a>

<!-- formal-statement-start -->
> **命題（正準分布の規格化と準位表示）**  
> 空でない有限 $\Omega$、$H:\Omega\to\mathbb R$、$\beta\in\mathbb R$ とし、[正準分布](#def-sm3-canonical)を使う。$p_\beta(\omega)>0$、$\sum_\omega p_\beta(\omega)=1$ が成立する。異なるエネルギーの集合を $\mathcal E=H(\Omega)$、各準位の多重度を $g(u)=|\{\omega:H(\omega)=u\}|$ とすると

$$
Z(\beta)=\sum_{u\in\mathcal E}g(u)e^{-\beta u},
\qquad
P_\beta(H=u)=\frac{g(u)e^{-\beta u}}{Z(\beta)}.
$$

> また任意の実数値観測量 $A$ の期待値は $\mathbb E_\beta[A]=Z(\beta)^{-1}\sum_\omega A(\omega)e^{-\beta H(\omega)}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

分母がすべて正の有限和であることと、和を同じエネルギーの配置ごとにグループ化できることが要点です。

<!-- proof-start -->
### 証明

指数関数は正なので $Z=\sum_\omega e^{-\beta H(\omega)}>0$ で、すべての $p_\beta(\omega)$ は正です。したがって

$$
\sum_{\omega\in\Omega}p_\beta(\omega)
=\frac{\sum_\omega e^{-\beta H(\omega)}}{Z}=1.
$$

$H^{-1}(\{u\})$ は互いに交わらず $\Omega$ を分割し、各集合に $g(u)$ 個の配置があります。よって

$$
\sum_{\omega\in\Omega}e^{-\beta H(\omega)}
=\sum_{u\in\mathcal E}\sum_{H(\omega)=u}e^{-\beta u}
=\sum_{u\in\mathcal E}g(u)e^{-\beta u}.
$$

準位 $u$ の確率も同じ部分和を $Z$ で割ることで得ます。期待値は有限確率の定義に $p_\beta$ を代入したものです。
<!-- proof-end -->

[SM1の準位の状態数](../SM1/index.md#def-sm1-density-of-states)と組み合わせることで、全配置を列挙する代わりに多重度だけから分配関数を求められます。温度が低く $\beta$ が大きい場合は低い準位の重みが増し、逆に $T\to\infty$ ではすべての**微視的配置**が等確率 $1/|\Omega|$ に近づきます。

## 3. 平均エネルギーと揺らぎは分配関数の微分

正準分布はエネルギーを固定していません。そのため、平均値だけでなく、そこからのばらつきが問題になります。分配関数を $\beta$ で微分すると、各配置のエネルギーが係数として現れます。

<a id="thm-sm3-energy-variance"></a>

<!-- formal-statement-start -->
> **定理（分配関数の微分とエネルギー揺らぎ）**  
> 空でない有限 $\Omega$、$\beta\in\mathbb R$、$\beta$ に依存しない $H:\Omega\to\mathbb R$ に対する[正準分布](#def-sm3-canonical)で、平均エネルギー $U(\beta)=\mathbb E_\beta[H]$、分散 $\operatorname{Var}_\beta(H)=\mathbb E_\beta[H^2]-U(\beta)^2$ とすると

$$
U(\beta)=-\frac{d}{d\beta}\log Z(\beta),
\qquad
\operatorname{Var}_\beta(H)=\frac{d^2}{d\beta^2}\log Z(\beta),
$$

$$
\frac{dU}{d\beta}=-\operatorname{Var}_\beta(H)\le0.
$$

> 分散が0であることと、$H$ が全配置上で一定であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

一回微分で $-H$、二回微分で $H^2$ が現れます。ただし $\log Z$ を二回微分すると商の微分によって平均値の二乗が引かれ、その差が分散になります。

<!-- proof-start -->
### 証明

有限和なので各項を個別に微分でき、

$$
Z'(\beta)=-\sum_\omega H(\omega)e^{-\beta H(\omega)},
\qquad
Z''(\beta)=\sum_\omega H(\omega)^2e^{-\beta H(\omega)}.
$$

[正準分布の期待値表示](#prop-sm3-normalization)から

$$
\frac{Z'}Z=-\mathbb E_\beta[H]=-U,
\qquad
\frac{Z''}Z=\mathbb E_\beta[H^2].
$$

$Z>0$ なので対数は二回微分でき、商の微分を実行すると

$$
\frac{d^2}{d\beta^2}\log Z
=\frac{Z''Z-(Z')^2}{Z^2}
=\frac{Z''}Z-\left(\frac{Z'}Z\right)^2
=\mathbb E_\beta[H^2]-U^2.
$$

第一式をもう一度微分して第三式を得ます。分散は

$$
\operatorname{Var}_\beta(H)
=\sum_\omega p_\beta(\omega)(H(\omega)-U)^2\ge0.
$$

すべての $p_\beta(\omega)>0$ なので、この和が0なら各項の二乗が0、すなわち全配置で $H(\omega)=U$ です。逆向きは一定値の分散が0であることから従います。
<!-- proof-end -->

### 例：低温と高温の違い

前節の三配置模型では $r=e^{-\beta\varepsilon}$ として、

$$
U=\frac{2\varepsilon r}{1+2r},
\qquad
\mathbb E_\beta[H^2]=\frac{2\varepsilon^2r}{1+2r}.
$$

ここから

$$
\operatorname{Var}_\beta(H)
=\frac{2\varepsilon^2r}{1+2r}
-\frac{4\varepsilon^2r^2}{(1+2r)^2}
=\frac{2\varepsilon^2r}{(1+2r)^2}.
$$

$T\to0+$ では $r\to0$ なので $U$ と分散はともに0へ近づきます。一方 $T\to\infty$ では $r\to1$ なので $U\to2\varepsilon/3$、分散は $2\varepsilon^2/9$ です。高温でも有限模型のエネルギーが必ず一定になるわけではありません。

## 4. 分配関数から自由エネルギーへ

[TH4の基本関係式](../../TH/TH4/index.md#prop-th4-fundamental-fixed-n)を受けた[TH5のHelmholtz自由エネルギー](../../TH/TH5/index.md#def-th5-potentials)では、温度が外部から指定される状況に合わせてエネルギーからエントロピーの寄与を引きます。正準分布には、その組み合わせが分配関数だけで書けるという特徴があります。

まず「どの確率分布を採用するか」に依存するエントロピーを、有限和で構成します。微正準では等確率のため状態数の対数となりましたが、正準では一般に確率は非一様です。

<a id="def-sm3-gibbs-entropy"></a>

<!-- formal-statement-start -->
> **定義（有限確率分布のGibbsエントロピー）**  
> 空でない有限 $\Omega$ 上の確率分布 $q$ に対し、$0\log0=0$ と約束して

$$
S_{\mathrm G}(q)=-k_{\mathrm B}\sum_{\omega\in\Omega}q(\omega)\log q(\omega)
$$

> と定める。$k_{\mathrm B}>0$ はBoltzmann定数とする。これは分布 $q$ のエントロピーであり、熱力学的な状態関数との同定には物理的条件が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm3-gibbs-entropy -->
### 例：一様分布と偏った分布

**定義の確認**：二配置の一様分布 $q=(1/2,1/2)$ は両項が定義でき、

$$
S_{\mathrm G}(q)=-k_{\mathrm B}\left(\frac12\log\frac12+\frac12\log\frac12\right)
=k_{\mathrm B}\log2.
$$

一方 $q=(1,0)$ では $1\log1=0$、零確率の項は約束により0で、$S_{\mathrm G}=0$。[SM2のBoltzmannエントロピー](../SM2/index.md#def-sm2-boltzmann-entropy)は許容集合の一様分布を置いた場合に一致します。
<!-- definition-example-end -->

<a id="def-sm3-free-energy"></a>

<!-- formal-statement-start -->
> **定義（正準Helmholtz自由エネルギー）**  
> 空でない有限 $\Omega$、$H:\Omega\to\mathbb R$、定数 $k_{\mathrm B}>0$、$T>0$ を固定する。[正準分配関数](#def-sm3-canonical) $Z(1/(k_{\mathrm B}T))$ に対し、**Helmholtz自由エネルギー**を

$$
F(T)=-k_{\mathrm B}T\log Z\left(\frac1{k_{\mathrm B}T}\right)
$$

> と定義する。以下の微分ではエネルギー関数および容積・粒子数などの制御パラメータを固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm3-free-energy -->
### 例：エネルギーがすべて0の模型

**定義の確認**：$m\ge1$ 個の配置で $H=0$ なら、各Boltzmann重みは1、$Z=m>0$、$F(T)=-k_{\mathrm B}T\log m$ です。$m=1$ のとき $F=0$。エネルギーが同じでも配置が多い系では $F$ がより小さく、配置数の寄与が反映されます。
<!-- definition-example-end -->

<a id="thm-sm3-free-energy-identity"></a>

<!-- formal-statement-start -->
> **定理（正準エントロピーと自由エネルギーの恒等式）**  
> 空でない有限 $\Omega$ 上の温度非依存の $H:\Omega\to\mathbb R$、$k_{\mathrm B}>0$、$T>0$ に対する[正準分布](#def-sm3-canonical)を $p_\beta$、$\beta=1/(k_{\mathrm B}T)$ とする。平均 $U=\mathbb E_\beta[H]$、[Gibbsエントロピー](#def-sm3-gibbs-entropy) $S=S_{\mathrm G}(p_\beta)$、[Helmholtz自由エネルギー](#def-sm3-free-energy) $F$ は

$$
S=k_{\mathrm B}(\log Z+\beta U),
\qquad
F=U-TS,
\qquad
\frac{dF}{dT}=-S
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

確率の対数を取ると $\log p_\beta=-\beta H-\log Z$ です。これをエントロピーの有限和へ代入します。温度微分では $\beta(T)$ の連鎖律を明示します。

<!-- proof-start -->
### 証明

正準分布はすべて正なので対数を取れ、各配置で

$$
\log p_\beta(\omega)=-\beta H(\omega)-\log Z(\beta)
$$

です。[Gibbsエントロピーの定義](#def-sm3-gibbs-entropy)へ代入して

$$
\begin{aligned}
S
&=-k_{\mathrm B}\sum_\omega p_\beta(\omega)\log p_\beta(\omega)\\
&=k_{\mathrm B}\beta\sum_\omega p_\beta(\omega)H(\omega)
+k_{\mathrm B}\log Z\sum_\omega p_\beta(\omega)\\
&=k_{\mathrm B}(\beta U+\log Z)
\end{aligned}
$$

を得ます。[規格化](#prop-sm3-normalization)と $k_{\mathrm B}T\beta=1$ を使えば

$$
U-TS=U-k_{\mathrm B}T\log Z-k_{\mathrm B}T\beta U
=-k_{\mathrm B}T\log Z=F.
$$

次に $\beta(T)=1/(k_{\mathrm B}T)$ より $d\beta/dT=-1/(k_{\mathrm B}T^2)$ です。$H$ は $T$ に依存せず、[エネルギー微分の定理](#thm-sm3-energy-variance)の $\partial_\beta\log Z=-U$ を使って、

$$
\begin{aligned}
\frac{dF}{dT}
&=-k_{\mathrm B}\log Z-k_{\mathrm B}T
   \frac{d\log Z}{d\beta}\frac{d\beta}{dT}\\
&=-k_{\mathrm B}\log Z
   -k_{\mathrm B}T(-U)\left(-\frac1{k_{\mathrm B}T^2}\right)\\
&=-k_{\mathrm B}\log Z-\frac UT=-S.
\end{aligned}
$$

最後の等号は第一式を $T$ で割った結果です。
<!-- proof-end -->

この恒等式は有限和から厳密に導きました。一方、熱力学の $F=U-TS$ と統計的なこの $F$ が実際の物質について一致するかは、採用した模型が平衡状態を適切に表すかにも依存します。

## 5. なぜGibbs分布が選ばれるのか：変分原理

「指数重みを採用する」という規則とは別に、正準分布は平均エネルギーとエントロピーの釣合いからも特徴付けられます。試料の任意の分布 $q$ に対して、エネルギーが小さい方がよいという項と、広がった分布を好むエントロピー項を組み合わせます。

<a id="thm-sm3-variational"></a>

<!-- formal-statement-start -->
> **定理（有限正準分布の自由エネルギー変分原理）**  
> 空でない有限 $\Omega$、$H:\Omega\to\mathbb R$、$k_{\mathrm B}>0$、$T>0$ を固定する。任意の確率分布 $q$ に対し

$$
\mathcal F_T(q)
=\sum_\omega q(\omega)H(\omega)-T S_{\mathrm G}(q)
$$

> とおく。このとき[正準分布](#def-sm3-canonical) $p_\beta$、$\beta=1/(k_{\mathrm B}T)$ は $\mathcal F_T$ の唯一の最小化分布であり、

$$
\mathcal F_T(q)-F(T)
=k_{\mathrm B}T\sum_{\omega:q(\omega)>0}
q(\omega)\log\frac{q(\omega)}{p_\beta(\omega)}
\ge0.
$$

> 等号は $q=p_\beta$ のとき、かつそのときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

差を計算すると、二つの確率分布の対数比の平均になります。対数の基本不等式を有限和で使えば、非負性だけでなく等号条件まで確認できます。

<!-- proof-start -->
### 証明

[正準分布の定義](#def-sm3-canonical)から

$$
\log p_\beta(\omega)=-\beta H(\omega)-\log Z
$$

です。$q(\omega)>0$ の項について差を展開し、$\sum_\omega q(\omega)=1$ と $k_{\mathrm B}T\beta=1$ を使います。

$$
\begin{aligned}
k_{\mathrm B}T\sum_{q(\omega)>0}q(\omega)
 \log\frac{q(\omega)}{p_\beta(\omega)}
&=k_{\mathrm B}T\sum_\omega q(\omega)\log q(\omega)
+\sum_\omega q(\omega)H(\omega)
+k_{\mathrm B}T\log Z\\
&=-T S_{\mathrm G}(q)+\mathbb E_q[H]-F(T)\\
&=\mathcal F_T(q)-F(T).
\end{aligned}
$$

$p_\beta(\omega)>0$ ですから $t_\omega=p_\beta(\omega)/q(\omega)>0$ とおける $q(\omega)>0$ の項には $\log t_\omega\le t_\omega-1$ を使えます。この不等式は $f(t)=t-1-\log t$ が $f'(t)=1-1/t$ により $t=1$ で唯一の最小値0を持つことから従います。よって

$$
\begin{aligned}
\sum_{q(\omega)>0}q(\omega)\log\frac{q(\omega)}{p_\beta(\omega)}
&\ge\sum_{q(\omega)>0}q(\omega)
\left(1-\frac{p_\beta(\omega)}{q(\omega)}\right)\\
&=1-\sum_{q(\omega)>0}p_\beta(\omega)\ge0.
\end{aligned}
$$

仮に $q(\omega)=0$ の配置が一つでもあれば、$p_\beta(\omega)>0$ なので最終式は厳密に正です。すべて $q(\omega)>0$ の場合、最初の不等式で等号になるには各 $t_\omega=1$、すなわち $q(\omega)=p_\beta(\omega)$ が必要です。逆に $q=p_\beta$ を代入すれば対数比がすべて0です。これで最小値と一意性が示されました。
<!-- proof-end -->

この原理では「温度を固定した平衡」を確率分布の最適化として読み取れます。ただし、現実の系の力学が実際に正準分布へ収束するという主張は、この有限集合上の最小化からは出ません。

## 6. 熱容量と独立な二系

温度を上げたとき平均エネルギーがどれほど変化するかは、熱容量で測ります。ここでも外部からの仕事によるエネルギー準位の変化は固定し、温度依存だけを取り出します。

<a id="prop-sm3-heat-capacity"></a>

<!-- formal-statement-start -->
> **命題（正準エネルギー揺らぎと熱容量）**  
> 空でない有限 $\Omega$、温度非依存の $H:\Omega\to\mathbb R$、$k_{\mathrm B}>0$、$T>0$ から定まる[正準分布](#def-sm3-canonical)について、固定した容積・粒子数・その他の外部パラメータの下で $C=\frac{dU}{dT}$ とすると

$$
C=\frac{\operatorname{Var}_\beta(H)}{k_{\mathrm B}T^2}\ge0,
\qquad \beta=\frac1{k_{\mathrm B}T}.
$$

> 全配置で $H$ が一定でなければ $C>0$ である。この式は $H$ が温度に直接依存する模型へそのまま適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

$U$ の逆温度微分は分散の負、逆温度の温度微分も負なので、二つの負号が打ち消し合います。

<!-- proof-start -->
### 証明

[分配関数の微分とエネルギー揺らぎ](#thm-sm3-energy-variance)により $dU/d\beta=-\operatorname{Var}_\beta(H)$。$\beta=1/(k_{\mathrm B}T)$ を直接微分すると

$$
\frac{d\beta}{dT}=-\frac1{k_{\mathrm B}T^2}.
$$

連鎖律を $U(\beta(T))$ に適用し、

$$
\frac{dU}{dT}
=\frac{dU}{d\beta}\frac{d\beta}{dT}
=(-\operatorname{Var}_\beta(H))
 \left(-\frac1{k_{\mathrm B}T^2}\right)
=\frac{\operatorname{Var}_\beta(H)}{k_{\mathrm B}T^2}.
$$

分散の非負性と等号条件は同じ定理の末尾で証明しました。$H$ が温度に依存すると、$Z$ を温度で微分するときに各 $H(\omega,T)$ 自体の微分項が加わるため、この式の仮定は本質的です。
<!-- proof-end -->

熱容量の単位は、分散が $\mathrm{J}^2$、$k_{\mathrm B}T^2$ が $\mathrm{J\,K}$ なので $\mathrm{J/K}$ です。熱容量が正であることは、正準有限系の特性であり、孤立微正準系の一般的な熱容量の符号をこれだけで論じることはできません。

<a id="prop-sm3-independent-systems"></a>

<!-- formal-statement-start -->
> **命題（独立な二系の分配関数と自由エネルギー）**  
> 空でない有限 $\Omega_A,\Omega_B$ と温度非依存のエネルギー $H_A,H_B$ があり、複合系の状態空間を $\Omega_A\times\Omega_B$、エネルギーを $H_{AB}(a,b)=H_A(a)+H_B(b)$ とする。共通の $\beta=1/(k_{\mathrm B}T)>0$ について

$$
Z_{AB}=Z_AZ_B,\qquad
p_{AB}(a,b)=p_A(a)p_B(b),\qquad
F_{AB}=F_A+F_B
$$

> が成立し、平均エネルギーと分散もそれぞれ二系の和となる。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーの加法性は指数の積に移り、有限の二重和が二つの和の積へ分解します。積分布であるため、交差項の期待値も計算できます。

<!-- proof-start -->
### 証明

各状態 $(a,b)$ の指数重みは

$$
e^{-\beta(H_A(a)+H_B(b))}
=e^{-\beta H_A(a)}e^{-\beta H_B(b)}.
$$

有限二重和を分配法則で展開し、

$$
Z_{AB}
=\sum_a\sum_b e^{-\beta H_A(a)}e^{-\beta H_B(b)}
=\left(\sum_a e^{-\beta H_A(a)}\right)
 \left(\sum_b e^{-\beta H_B(b)}\right)=Z_AZ_B.
$$

[正準分布](#def-sm3-canonical)へ代入すると $p_{AB}=p_Ap_B$。[正準Helmholtz自由エネルギー](#def-sm3-free-energy)より

$$
F_{AB}=-k_{\mathrm B}T\log(Z_AZ_B)
=-k_{\mathrm B}T\log Z_A-k_{\mathrm B}T\log Z_B=F_A+F_B.
$$

平均は $\mathbb E[H_A+H_B]=U_A+U_B$ です。積分布なので

$$
\begin{aligned}
\mathbb E[H_AH_B]
&=\sum_a\sum_b H_A(a)H_B(b)p_A(a)p_B(b)\\
&=\left(\sum_a H_A(a)p_A(a)\right)
  \left(\sum_b H_B(b)p_B(b)\right)=U_AU_B.
\end{aligned}
$$

従って二つのエネルギーの積の平均から平均の積を引いた差は $\mathbb E[H_AH_B]-U_AU_B=0$ となり、$(H_A+H_B-U_A-U_B)^2$ の展開により分散が加算されます。
<!-- proof-end -->

相互作用エネルギーが無視できない場合、最初の指数の積への分解が崩れます。「二系を合わせれば必ず分配関数が掛け算になる」と覚えず、加法的エネルギーと直積状態空間を確認しましょう。

## 7. 演習：有限模型で公式を再構成する

### Level A：定義・規格化・単位

#### A1. 多重度つきの二準位

三配置 $g,e_1,e_2$ のエネルギーを $0,\varepsilon,\varepsilon$ とする（$\varepsilon>0$、$T>0$）。分配関数、各配置の確率、エネルギー $\varepsilon$ の確率を求めよ。

- Level: A
- ID: SM3-A1

<!-- solution-start -->
**詳細解答**　$\beta=1/(k_{\mathrm B}T)$、$r=e^{-\beta\varepsilon}$ とします。[正準分配関数](#def-sm3-canonical)は配置ごとの指数重みを足すので、

$$
Z=e^0+e^{-\beta\varepsilon}+e^{-\beta\varepsilon}=1+2r.
$$

それぞれ $p(g)=1/Z$、$p(e_1)=p(e_2)=r/Z$。和は $(1+2r)/Z=1$ です。準位 $\varepsilon$ の事象は二配置の和集合なので、その確率は $r/Z+r/Z=2r/(1+2r)$ です。多重度2を確率の分母だけでなく分子にも反映します。
<!-- solution-end -->

#### A2. エネルギー原点の変更

空でない有限模型のエネルギーを $H_c(\omega)=H(\omega)+c$（$c\in\mathbb R$）と変える。温度 $T>0$ を固定したときの $Z_c$、$p_c$、$U_c$、$F_c$ を元の量で表せ。

- Level: A
- ID: SM3-A2

<!-- solution-start -->
**詳細解答**　[分配関数](#def-sm3-canonical)から

$$
Z_c=\sum_\omega e^{-\beta(H(\omega)+c)}
=e^{-\beta c}\sum_\omega e^{-\beta H(\omega)}
=e^{-\beta c}Z.
$$

したがって $p_c(\omega)=e^{-\beta c}e^{-\beta H(\omega)}/(e^{-\beta c}Z)=p_\beta(\omega)$。平均は

$$
U_c=\sum_\omega p_\beta(\omega)(H(\omega)+c)
=U+c\sum_\omega p_\beta(\omega)=U+c.
$$

[自由エネルギー](#def-sm3-free-energy)も

$$
F_c=-k_{\mathrm B}T(\log Z-\beta c)=F+c
$$

です。確率はエネルギーの原点に依存せず、エネルギーと自由エネルギーは同じ定数だけ移動します。
<!-- solution-end -->

#### A3. 二配置の平均と分散

エネルギー $0,\varepsilon$（$\varepsilon>0$）の二配置に $T>0$ の正準分布を置く。$r=e^{-\beta\varepsilon}$ として平均 $U$、二乗平均、分散を求めよ。

- Level: A
- ID: SM3-A3

<!-- solution-start -->
**詳細解答**　$Z=1+r$、励起配置の確率は $r/(1+r)$ です。従って

$$
U=0\cdot\frac1{1+r}+\varepsilon\frac r{1+r}
=\frac{\varepsilon r}{1+r},
\qquad
\mathbb E[H^2]=\frac{\varepsilon^2r}{1+r}.
$$

[分散の定義](#thm-sm3-energy-variance)へ代入し、分母を通分すると

$$
\operatorname{Var}(H)
=\frac{\varepsilon^2r(1+r)-\varepsilon^2r^2}{(1+r)^2}
=\frac{\varepsilon^2r}{(1+r)^2}>0.
$$
<!-- solution-end -->

#### A4. 非一様分布のエントロピー

二配置 $\{a,b\}$ の分布を $q(a)=1/4$、$q(b)=3/4$ とする。$S_{\mathrm G}(q)$ を求め、無次元量 $S_{\mathrm G}(q)/k_{\mathrm B}$ が $\log2$ より小さいことを示せ。$k_{\mathrm B}>0$ とする。

- Level: A
- ID: SM3-A4

<!-- solution-start -->
**詳細解答**　[エントロピーの定義](#def-sm3-gibbs-entropy)に代入すると

$$
\begin{aligned}
S_{\mathrm G}(q)/k_{\mathrm B}
&=-\frac14\log\frac14-\frac34\log\frac34\\
&=\log4-\frac34\log3.
\end{aligned}
$$

一様分布の $\log2$ との差は

$$
\log2-\left(\log4-\frac34\log3\right)
=\frac14\log\frac{27}{16}>0
$$

です。$27>16$ なので正です。したがって $S_{\mathrm G}(q)<k_{\mathrm B}\log2$ も成立し、比較する両辺の単位が一致します。確率が偏ると、同じ二配置でも一様分布よりエントロピーが小さくなります。
<!-- solution-end -->

#### A5. 熱容量の単位と符号

エネルギーの分散が $3\varepsilon^2$ の温度非依存有限模型について、$\varepsilon>0$、$T>0$ とする。正準熱容量を表し、$\varepsilon$ がジュールなら単位と符号を確認せよ。

- Level: A
- ID: SM3-A5

<!-- solution-start -->
**詳細解答**　[揺らぎと熱容量の命題](#prop-sm3-heat-capacity)が適用できるのはエネルギー関数が温度非依存だからです。代入して

$$
C=\frac{3\varepsilon^2}{k_{\mathrm B}T^2}>0.
$$

$\varepsilon^2$ の単位は $\mathrm{J}^2$、$k_{\mathrm B}T^2$ の単位は $(\mathrm{J/K})\mathrm{K}^2=\mathrm{J\,K}$ なので $C$ の単位は $\mathrm{J/K}$ です。この設問は特定の模型の分散がこの値になる条件までは与えていません。指定された分散から熱容量を評価しています。
<!-- solution-end -->

### Level B：仮定と導出を検査する

#### B1. 熱浴の状態数を数え直す

試料の三配置のエネルギーが $0,\varepsilon,2\varepsilon$ で、熱浴の状態数がそれぞれ $W_B(U)=9$、$W_B(U-\varepsilon)=3$、$W_B(U-2\varepsilon)=1$ とする。孤立した複合系の厳密全エネルギー $U$ で等確率とする。試料の周辺分布を求め、正準分布に厳密一致する $\beta$ があるか示せ。$\varepsilon>0$ とする。

- Level: B
- ID: SM3-B1

<!-- solution-start -->
**詳細解答**　[有限熱浴の厳密な周辺分布](#prop-sm3-bath-exact)によって重みの和は $9+3+1=13$、従って周辺確率は $(9/13,3/13,1/13)$ です。隣接準位の比は

$$
\frac{P(H=\varepsilon)}{P(H=0)}=\frac39=\frac13,
\qquad
\frac{P(H=2\varepsilon)}{P(H=\varepsilon)}=\frac13.
$$

各エネルギー準位に一配置ずつなので、[正準分布](#def-sm3-canonical)なら両比は $e^{-\beta\varepsilon}$。$\beta=(\log3)/\varepsilon>0$ と選ぶと両方が一致し、

$$
Z=1+\frac13+\frac19=\frac{13}{9}.
$$

正準確率は $(9/13,3/13,1/13)$ となります。これはこの三点の $\log W_B$ が一次関数に一致した特殊例で、一般の有限熱浴には無条件ではありません。
<!-- solution-end -->

#### B2. 加法的な二系

Aのエネルギーが $0,\varepsilon$、Bのエネルギーが $0,2\varepsilon$（各準位一配置、$\varepsilon>0$）とする。共通温度 $T>0$ で相互作用がなく、状態空間は直積とする。$Z_{AB}$、$F_{AB}$、平均エネルギーと分散を個別系の量から求めよ。

- Level: B
- ID: SM3-B2

<!-- solution-start -->
**詳細解答**　$r=e^{-\beta\varepsilon}$ と置くと $Z_A=1+r$、$Z_B=1+r^2$ です。[独立な二系の分配関数と自由エネルギー](#prop-sm3-independent-systems)から

$$
Z_{AB}=(1+r)(1+r^2)=1+r+r^2+r^3,
$$

$$
F_{AB}=-k_{\mathrm B}T\log(1+r)-k_{\mathrm B}T\log(1+r^2).
$$

Aの励起確率は $r/(1+r)$、Bは $r^2/(1+r^2)$ なので

$$
U_{AB}=\frac{\varepsilon r}{1+r}
+\frac{2\varepsilon r^2}{1+r^2}.
$$

分散も各二準位系から求めます。Aの励起確率を $p_A=r/(1+r)$、Bの励起確率を $p_B=r^2/(1+r^2)$ とすると、Aでは $H_A$ は $0$ または $\varepsilon$、Bでは $H_B$ は $0$ または $2\varepsilon$ です。そこで

$$
\begin{aligned}
\operatorname{Var}(H_A)
&=\varepsilon^2p_A-(\varepsilon p_A)^2
=\varepsilon^2p_A(1-p_A)
=\frac{\varepsilon^2r}{(1+r)^2},\\
\operatorname{Var}(H_B)
&=4\varepsilon^2p_B-(2\varepsilon p_B)^2
=4\varepsilon^2p_B(1-p_B)
=\frac{4\varepsilon^2r^2}{(1+r^2)^2}.
\end{aligned}
$$

[積分布での分散加法性](#prop-sm3-independent-systems)により

$$
\operatorname{Var}(H_{AB})
=\operatorname{Var}(H_A)+\operatorname{Var}(H_B)
=\frac{\varepsilon^2r}{(1+r)^2}
+\frac{4\varepsilon^2r^2}{(1+r^2)^2}.
$$

複合準位は $0,\varepsilon,2\varepsilon,3\varepsilon$ で、直接の分配関数も前式と一致します。
<!-- solution-end -->

#### B3. 変分原理を二状態で確かめる

エネルギーが $0,\varepsilon$（$\varepsilon>0$）の二配置に $q=(1-x,x)$、$0\le x\le1$ の確率を置く。$T>0$ で $\mathcal F_T(q)$ を求め、その最小点を求めよ。境界と二階微分も調べよ。

- Level: B
- ID: SM3-B3

<!-- solution-start -->
**詳細解答**　[有限正準分布の自由エネルギー変分原理](#thm-sm3-variational)で定めた $\mathcal F_T(q)$ の式から、$0<x<1$ に対して

$$
\mathcal F_T(x)=\varepsilon x
+k_{\mathrm B}T[(1-x)\log(1-x)+x\log x].
$$

微分すると定数項の消去を一つずつ行って、

$$
\begin{aligned}
\mathcal F_T'(x)
&=\varepsilon+k_{\mathrm B}T[-\log(1-x)-1+\log x+1]\\
&=\varepsilon+k_{\mathrm B}T\log\frac{x}{1-x},\\
\mathcal F_T''(x)
&=k_{\mathrm B}T\left(\frac1x+\frac1{1-x}\right)>0.
\end{aligned}
$$

$\mathcal F_T'(x)=0$ は $x/(1-x)=e^{-\beta\varepsilon}=r$ と同値なので、$x_*=r/(1+r)\in(0,1)$ が唯一の内部停留点です。$\mathcal F_T'(x)\to-\infty$（$x\to0+$）、$+\infty$（$x\to1-$）で、連続な端点値よりも内部で小さくなるので、これが閉区間全体の唯一の最小です。[正準分布](#def-sm3-canonical)の励起確率と一致します。
<!-- solution-end -->

#### B4. 温度に対する単調性と極限

有限非空 $\Omega$ で温度非依存 $H$ が少なくとも二つの異なる値を取るとする。$T>0$ の正準分布について $U(T)$ が狭義増加であることを示し、$T\to0+$ と $T\to\infty$ の極限を求めよ。最低エネルギーの多重度を $m$ とする。

- Level: B
- ID: SM3-B4

<!-- solution-start -->
**詳細解答**　$H$ が非定数で正準分布は各配置で正なので、[分散の等号条件](#thm-sm3-energy-variance)から $\operatorname{Var}_\beta(H)>0$。[熱容量の命題](#prop-sm3-heat-capacity)により

$$
\frac{dU}{dT}=\frac{\operatorname{Var}_\beta(H)}{k_{\mathrm B}T^2}>0.
$$

最小エネルギーを $h_{\min}$ とし、各配置で $d_\omega=H(\omega)-h_{\min}\ge0$ と置きます。正準確率の分子分母へ $e^{\beta h_{\min}}$ を掛けると

$$
p_\beta(\omega)=\frac{e^{-\beta d_\omega}}{\sum_\eta e^{-\beta d_\eta}}.
$$

$\beta\to\infty$ で $d_\omega=0$ のちょうど $m$ 配置の重みは1、それ以外は0へ近づきます。従って最低準位内の各確率は $1/m$、$U(T)\to h_{\min}$。他方 $T\to\infty$ では $\beta\to0$、すべての指数が1へ近づき、

$$
p_\beta(\omega)\to\frac1{|\Omega|},
\qquad
U(T)\to\frac1{|\Omega|}\sum_\omega H(\omega).
$$

極限と有限和の交換は、$\Omega$ が有限なので項ごとに行えます。
<!-- solution-end -->

### Level C：分配関数・自由エネルギー・揺らぎを接続する

#### C1. 二個の独立な励起単位

各単位は $0,\varepsilon$（$\varepsilon>0$）のエネルギーを持ち、それぞれの配置は一通りとする。独立な二単位の直積状態空間に、共通温度 $T>0$ の正準分布を置く。$\beta=1/(k_{\mathrm B}T)$ とする。

1. 各総エネルギーの多重度、分配関数、各総エネルギーの確率を求めよ。
2. 平均エネルギー $U$ と分散を計算し、$\partial_\beta\log Z$ と $\partial_\beta^2\log Z$ でも検算せよ。
3. 自由エネルギー $F$ とGibbsエントロピー $S$ を求め、$F=U-TS$ を直接検算せよ。
4. 熱容量 $C$ を求め、$T\to0+$ と $T\to\infty$ の挙動を説明せよ。
5. 分配関数の積表示が破れる例として、二単位がともに励起したときだけ追加エネルギー $J\ne0$ を持つ場合の分配関数を書き、どの証明段階が使えなくなるか示せ。

- Level: C
- ID: SM3-C1

<!-- solution-start -->
**詳細解答**

**(1)**　四つの配置 $(0,0),(0,1),(1,0),(1,1)$ についてエネルギーは $0,\varepsilon,\varepsilon,2\varepsilon$ です。多重度は $1,2,1$。[準位表示](#prop-sm3-normalization)で $r=e^{-\beta\varepsilon}$ と置くと、

$$
Z=1+2r+r^2=(1+r)^2,
\qquad
P(H=0)=\frac1{(1+r)^2},
$$

$$
P(H=\varepsilon)=\frac{2r}{(1+r)^2},
\qquad
P(H=2\varepsilon)=\frac{r^2}{(1+r)^2}.
$$

分子の和は $(1+r)^2$ で、規格化を確認できます。

**(2)**　準位の確率から

$$
\begin{aligned}
U
&=\varepsilon\frac{2r}{(1+r)^2}
 +2\varepsilon\frac{r^2}{(1+r)^2}\\
&=\frac{2\varepsilon r(1+r)}{(1+r)^2}
=\frac{2\varepsilon r}{1+r},
\end{aligned}
$$

$$
\mathbb E[H^2]
=\frac{2\varepsilon^2r+4\varepsilon^2r^2}{(1+r)^2}.
$$

よって分散の分子は $2r+4r^2-4r^2=2r$ となり、

$$
\operatorname{Var}(H)=\frac{2\varepsilon^2r}{(1+r)^2}.
$$

さらに $dr/d\beta=-\varepsilon r$ なので

$$
\frac{d}{d\beta}\log Z
=\frac{2}{1+r}(-\varepsilon r)
=-\frac{2\varepsilon r}{1+r},
$$

$$
\frac{d^2}{d\beta^2}\log Z
=-2\varepsilon
 \frac{(-\varepsilon r)(1+r)-r(-\varepsilon r)}{(1+r)^2}
=\frac{2\varepsilon^2r}{(1+r)^2}.
$$

[エネルギー微分の定理](#thm-sm3-energy-variance)と一致します。

**(3)**　[正準Helmholtz自由エネルギー](#def-sm3-free-energy)から

$$
F=-2k_{\mathrm B}T\log(1+r).
$$

各微視的配置は[独立な二系の積分布](#prop-sm3-independent-systems)を持つので、一単位の励起確率は $p_1(1)=r/(1+r)$、非励起確率は $p_1(0)=1/(1+r)$ です。四配置 $(a,b)\in\{0,1\}^2$ の確率は $p(a,b)=p_1(a)p_1(b)$ であり、

$$
\log p(a,b)=\log p_1(a)+\log p_1(b).
$$

[エントロピーの定義](#def-sm3-gibbs-entropy)へ代入し、各変数について $\sum_{a=0}^1p_1(a)=1$ を使うと、

$$
\begin{aligned}
S/k_{\mathrm B}
&=-\sum_{a,b}p_1(a)p_1(b)
  \bigl(\log p_1(a)+\log p_1(b)\bigr)\\
&=-\sum_a p_1(a)\log p_1(a)\sum_b p_1(b)
  -\sum_b p_1(b)\log p_1(b)\sum_a p_1(a)\\
&=-2\sum_{a=0}^1p_1(a)\log p_1(a).
\end{aligned}
$$

したがって一単位の寄与が二回現れ、

$$
\begin{aligned}
S
&=-2k_{\mathrm B}\left[
 \frac1{1+r}\log\frac1{1+r}
+\frac r{1+r}\log\frac r{1+r}\right]\\
&=2k_{\mathrm B}\left[
 \log(1+r)-\frac r{1+r}\log r\right]\\
&=2k_{\mathrm B}\left[
 \log(1+r)+\frac{\beta\varepsilon r}{1+r}\right].
\end{aligned}
$$

$TS=2k_{\mathrm B}T\log(1+r)+2\varepsilon r/(1+r)$ なので、上で計算した $U$ を引き合わせ、

$$
U-TS
=\frac{2\varepsilon r}{1+r}
-2k_{\mathrm B}T\log(1+r)-\frac{2\varepsilon r}{1+r}
=F
$$

となります。

**(4)**　[揺らぎと熱容量](#prop-sm3-heat-capacity)より

$$
C=\frac{2\varepsilon^2r}{k_{\mathrm B}T^2(1+r)^2}>0.
$$

$T\to0+$ では $x=\varepsilon/(k_{\mathrm B}T)\to\infty$ と置くと $r=e^{-x}$ で、

$$
C=2k_{\mathrm B}\frac{x^2e^{-x}}{(1+e^{-x})^2}\to0.
$$

指数減衰が $x^2$ を上回るためです。$T\to\infty$ では $x\to0$、$r\to1$ で、

$$
C=2k_{\mathrm B}\frac{x^2r}{(1+r)^2}\to0.
$$

一方、平均エネルギーはそれぞれ0、$\varepsilon$ へ近づき、揺らぎはそれぞれ0、$\varepsilon^2/2$ へ近づきます。高温で分散が残っても熱容量は $T^{-2}$ の因子により消えます。

**(5)**　二つとも励起した配置のみエネルギーが $2\varepsilon+J$ となるので、

$$
Z_J=1+2e^{-\beta\varepsilon}
    +e^{-\beta(2\varepsilon+J)}
=1+2r+r^2e^{-\beta J}.
$$

$J\ne0$、$\beta>0$ なら $e^{-\beta J}\ne1$ なので、$Z_J\ne(1+r)^2$ です。[独立な二系の分配関数と自由エネルギー](#prop-sm3-independent-systems)の証明における $e^{-\beta(H_A+H_B)}=e^{-\beta H_A}e^{-\beta H_B}$ は、相互作用項 $J$ により二励起配置で成り立ちません。
<!-- solution-end -->

## 8. 何が得られ、次に何を調べるか

孤立した全体系の微正準確率から部分系の重みを数えれば熱浴の状態数が現れ、その対数がほぼ一次関数であるときにGibbs型の指数重みへ近づきます。正準アンサンブルを有限模型として定義した後は、分配関数の微分から平均エネルギーと分散を、対数からHelmholtz自由エネルギーを、変分原理からGibbs分布の一意な最適性を導けました。

重要なのは、**有限和の恒等式は厳密**でも、**熱浴近似や実物質への熱力学的同定は追加の条件を要する**という区別です。次のSM4では、さらに粒子も環境と交換できるときに、粒子数の確率と化学ポテンシャルをどう組み込むかを考えます。
