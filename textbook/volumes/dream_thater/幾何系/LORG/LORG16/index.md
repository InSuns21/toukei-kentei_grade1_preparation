# LORG16 大域双曲性の特徴付け

<!-- definition-example-audit: strict -->

## 1. Cauchy面だけでは見えない「曲線の逃げ道」

[LORG15のCauchy面](../LORG15/index.md#def-lorg15-cauchy)は、すべての両側非延長因果曲線に一度だけ出会う集合でした。一方、[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)では、点列の収束だけでなく、曲線全体を同じコンパクト集合に閉じ込める必要がありました。

そこで、二点 $p,q$ の間の因果曲線が通り得る**点の集合**を調べます。この集合がコンパクトなら、曲線の列が空間無限遠や時空の穴へ逃げる可能性を排除できます。しかし、点の集合がコンパクトという条件だけで閉因果曲線まで排除できるでしょうか。また、Cauchy面の存在とこの条件はどのように結び付くでしょうか。

以下、$(M,g)$ は滑らかで境界のない連結Hausdorff・第二可算、時間向き付きのLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ とします。曲線は[LORG3の未来因果曲線](../LORG3/index.md#def-lorg3-causal-curve)とし、閉因果曲線がないという意味の[LORG9のcausality](../LORG9/index.md#def-lorg9-causal)、曲線が近傍へ再侵入しないという[LORG10の強因果性](../LORG10/index.md#def-lorg10-strong-causality)を区別します。

## 2. 因果ダイヤモンドと大域双曲性

[LORG6の因果集合](../LORG6/index.md#def-lorg6-chronological-causal-future)では、$J^+(p)$ は $p$ から未来因果曲線で到達できる点、$J^-(q)$ は $q$ に未来因果曲線で到達できる点でした。両方を満たす点は、$p$ から $q$ へ至る途中に通過できる点です。反射的な到達関係を採用するので、$p\le q$ なら端点も含みます。

<a id="def-lorg16-diamond"></a>

<!-- formal-statement-start -->
> **定義（因果ダイヤモンド）**  
> 時間向き付きLorentz時空 $(M,g)$ の二点 $p,q\in M$ に対して、因果ダイヤモンドを次の集合とする。

$$
K(p,q):=J^+(p)\cap J^-(q).
$$

> $p\not\le q$ なら $K(p,q)=\varnothing$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg16-diamond -->
**定義の確認**。二次元Minkowski時空、$p=(-1,0)$、$q=(1,0)$ とします。[Minkowskiの因果錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)へ両端点を代入すると、$r=(t,x)$ が $p\le r$ である条件は $t+1\ge|x|$、$r\le q$ である条件は $1-t\ge|x|$ です。従って

$$
K(p,q)=\{(t,x):-1\le t\le1,\ |x|\le1-|t|\}.
$$

> 時刻 $t=0$ の切断は $[-1,1]$ であり、$t=\pm1$ の切断は各一点です。二つの不等式は閉条件で、集合は $[-1,1]^2$ の中にあるので、Euclid空間の[Heine–Borel定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)によりコンパクトです。
<!-- definition-example-end -->

これを任意の端点に要求し、さらに近傍へ再侵入する曲線を排除するのが、古典的な大域双曲性の定義です。「大域」は時空全体がコンパクトという意味ではありません。

<a id="def-lorg16-global-hyperbolicity"></a>

<!-- formal-statement-start -->
> **定義（大域双曲的時空）**  
> 滑らかな時間向き付きLorentz時空 $(M,g)$ が**大域双曲的**であるとは、次の二条件を満たすことをいう。
>
> 1. $(M,g)$ は[LORG10の強因果的時空](../LORG10/index.md#def-lorg10-strong-causality)である。
> 2. 任意の $p,q\in M$ について[因果ダイヤモンド](#def-lorg16-diamond) $K(p,q)$ がコンパクトである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg16-global-hyperbolicity -->
**定義の確認**。$\mathbb R^{1,n}$ では、標準座標の時刻関数 $t$ に関して強因果性とダイヤモンドのコンパクト性を別々に確かめます。非零の未来因果ベクトル $v=(v^t,\mathbf v)$ は、Minkowski計量 $\eta=-dt^2+|d\mathbf x|^2$ の定義から

$$
\eta(v,v)=-(v^t)^2+|\mathbf v|^2\le0,
\qquad v^t\ge|\mathbf v|,\qquad v^t>0
$$

を満たします。従って停留片のない未来因果曲線に沿って $t$ は厳密増加します。さらに $\eta(\nabla^\eta t,v)=dt(v)$ を満たす勾配は $\nabla^\eta t=-\partial_t$ で、これは過去向き時間的です。よって $t$ は[LORG10のtemporal functionの定義](../LORG10/index.md#def-lorg10-time-function)を満たし、[temporal functionがあれば強因果的](../LORG10/index.md#thm-lorg10-temporal-implies-strong)という既習の定理により強因果的です。

次に、[Minkowskiの因果錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)を $p=(t_p,\mathbf x_p)$、$q=(t_q,\mathbf x_q)$ のそれぞれに適用します。$r=(t,\mathbf x)\in K(p,q)$ なら

$$
t_p\le t\le t_q,\qquad
|\mathbf x-\mathbf x_p|\le t-t_p,\qquad
|\mathbf x-\mathbf x_q|\le t_q-t.
$$

> したがって $K(p,q)$ は閉集合で、$t$ と $\mathbf x$ は有界です（$p\not\le q$ なら空集合）。有限次元Euclid空間での[Heine–Borel定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)によりコンパクトです。因果性とダイヤモンドの双方を検査したのでMinkowski時空は大域双曲的です。
<!-- definition-example-end -->

**注意**：滑らかな時空では「causal＋すべてのダイヤモンドがコンパクト」も同値な定式化として使えます。ただし、*因果条件そのものを外してよい*という意味ではありません。本講は証明での非再侵入性を見えやすくするため、強因果性を定義に含めます。

## 3. どの仮定を落とすと壊れるか

**一点除去**。$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$、$p=(-1,0)$、$q=(1,0)$ とします。

$r_k=(0,1/k)$（$k\ge2$）は $M_*$ に属し、$p\ll r_k\ll q$ です。よって $r_k\in K_{M_*}(p,q)$ ですが、Minkowski空間での唯一の極限 $(0,0)$ は $M_*$ にありません。$K_{M_*}(p,q)$ 内で収束する部分列が存在せず、コンパクトではありません。

$M_*$ はMinkowskiの開部分時空なので強因果性は保たれています。失われたのは**因果ダイヤモンドがコンパクトであるという条件**です。[点除去で非延長性が変わる例](../LORG15/index.md#def-lorg15-cauchy)と同じ穴が、曲線極限にも現れます。

**時間周期トーラス**。$M=S^1_t\times S^1_x$ に $g=-dt^2+dx^2$ を入れます。どの二点間にも時間方向を十分多く周回すれば未来時間的曲線が存在し、$J^+(p)=J^-(q)=M$ です。すべてのダイヤモンドはコンパクトですが、時刻方向の周回 $\gamma(s)=([s],[x_0])$ は閉時間的曲線です。従ってcausalですらなく、大域双曲的ではありません。ここで壊れたのは、曲線の非再侵入性です。

## 4. コンパクト性は曲線列の極限をどう保証するか

強因果性が持つ重要な帰結は、**両側または片側へ非延長な因果曲線が、コンパクト集合の中に永久に閉じ込められない**ことです。これは[LORG10の因果的凸近傍基底](../LORG10/index.md#thm-lorg10-alexandrov-basis)を曲線の再侵入へ適用するものです。

<a id="lem-lorg16-nonimprisonment"></a>

<!-- formal-statement-start -->
> **補題（強因果性と非閉じ込め性）**  
> 滑らかな強因果的Lorentz時空の未来または過去非延長な未来因果曲線は、像の該当する半分を一つのコンパクト集合内に収めることができない。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクト集合に収まるなら、未来方向に無限回近付く集積点があります。強因果的な小近傍には出てから戻ることができないので、曲線はどんどん小さい近傍に留まり、有限の未来端点を得て非延長性に反します。

<!-- proof-start -->
### 証明

未来側を示します。未来非延長曲線の像がコンパクト $C$ に含まれると仮定します。任意に先へ進んだ点列 $\gamma(s_k)$（$s_k$ はパラメータ域の未来端に近付く）から、コンパクト性で $a\in C$ に収束する部分列を得ます。

[LORG10の強因果性](../LORG10/index.md#def-lorg10-strong-causality)により、$a$ の任意の近傍 $O$ の中に、因果曲線が一度出たら再入できない因果的凸近傍 $U$ を $a\in U\subset O$ として選べます。

$\gamma$ は未来へ進んでも $U$ を何度でも訪れます。もし一度 $U$ を出れば、その後の訪問が再侵入になって矛盾します。

従って、ある時刻以降はずっと $U$ の中にいます。

$O$ を $a$ を中心とする補助Riemann距離の半径 $1/j$ の球として同じ議論を繰り返すと、十分未来の全点はその球に入ります。これは $\gamma$ が未来端で $a$ に収束することを意味します。局所的な時間的曲線を $a$ から未来に継ぎ足せるので、非延長性に矛盾します。過去側は時間反転して示せます。$\square$
<!-- proof-end -->

<a id="prop-lorg16-curves-compact"></a>

<!-- formal-statement-start -->
> **命題（コンパクトダイヤモンド内の因果曲線の抽出）**  
> $(M,g)$ が強因果的で、$K(p,q)$ がコンパクトであるとする。$p$ から $q$ へ進む未来因果曲線の任意の列は、適切な再パラメータ化と部分列の選択により、$p$ から $q$ への未来因果曲線へ一様収束する。さらに、固定した完全な補助Riemann計量 $h$ に関して、これらの曲線の $h$-弧長には共通上界が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

点集合がコンパクトでも、曲線がその中で何度も回れば長さは大きくなり得ます。補助弧長が無限大へ向かう曲線列からは、[限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)で両側非延長な極限曲線を作れてしまい、前の非閉じ込め補題に反します。長さが一様有界となってから初めて両端点を残したArzelà–Ascoliを適用します。

<!-- proof-start -->
### 証明

$p\not\le q$ の場合は曲線が存在せず主張は空です。以下、$p\le q$ とします。各曲線を $h$-弧長で $[0,\ell_k]$ 上に表示します。[弧長からの1-Lipschitz評価](../LORG14/index.md#lem-lorg14-arclength-lipschitz)により

$$
d_h(\gamma_k(s),\gamma_k(t))\le |s-t|.
$$

共通上界がないとすると、$\ell_k\to\infty$ となる部分列を取れます。弧長中央の点 $\gamma_k(\ell_k/2)$ はすべて $K(p,q)$ に属するので、さらに部分列で一点へ収束します。中央をパラメータ零に平行移動すると定義域は $[-\ell_k/2,\ell_k/2]$ で、両端が無限へ伸びます。

[限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)をこの列へ適用すれば、像が閉集合 $K(p,q)$ に含まれる両側非延長因果曲線が得られます。これは[非閉じ込め補題](#lem-lorg16-nonimprisonment)に反します。従って $\ell_k\le L$ という上界が存在します。

今度は各曲線を $u\in[0,1]$ で $\widetilde\gamma_k(u)=\gamma_k(\ell_ku)$ と表示します。この列は $L$-Lipschitzで、像はコンパクト $K(p,q)$ 内にあります。

Arzelà–Ascoliで一様収束部分列が取れ、[因果曲線の局所一様極限補題](../LORG14/index.md#lem-lorg14-local-closedness)により極限は未来因果的です。$u=0,1$ でそれぞれ $p,q$ に収束するので端点も保持されます。

$p=q$ の場合はcausalityより定値曲線のみと解釈します。$\square$
<!-- proof-end -->

この命題は**曲線列のLorentz長さと極限曲線のLorentz長さの大小関係**をまだ示していません。最大化因果曲線の存在へ進む際には、LORG17でその関係を検討します。

## 5. ダイヤモンドからGeroch型Cauchy時間関数へ

いよいよ「コンパクトなダイヤモンド」から「Cauchy面の存在」を導きます。ここでいう[LORG10の時間関数](../LORG10/index.md#def-lorg10-time-function)は未来因果曲線上で厳密に増加する**連続関数**です。滑らかで時間的勾配を持つtemporal functionではありません。

まず時空上に、どの非空開集合にも正の測度を与え、全体の測度が有限である滑らかな正密度 $\mu$ を選びます。そのような密度は、局所有限な分割の一とコンパクト台関数に $2^{-j}$ 程度の正係数を掛けて正規化すれば作れます。後で測度の単調収束を使うため、**有限性と正の密度の両方**が必要です。

<a id="def-lorg16-volume-functions"></a>

<!-- formal-statement-start -->
> **定義（過去・未来体積関数）**  
> 滑らかな時空 $(M,g)$ 上で $\mu(M)<\infty$ を満たす滑らかな正密度 $\mu$ を固定する。各 $x\in M$ に対して

$$
V^-(x):=\mu(I^-(x)),\qquad V^+(x):=\mu(I^+(x))
$$

> と置く。$I^\pm(x)$ は[LORG6の時間的未来・過去](../LORG6/index.md#def-lorg6-chronological-causal-future)である。各点には時間的過去と未来が存在するので、$0<V^\pm(x)<\infty$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg16-volume-functions -->
**定義の確認**。二次元Minkowski時空で $\mu$ を正のGaussian密度 $c e^{-t^2-x^2}\,dt\,dx$（$c>0$）とします。時間反転 $(t,x)\mapsto(-t,x)$ が密度を保ち、$I^-(0,a)$ と $I^+(0,a)$ を交換するので

$$
V^-(0,a)=V^+(0,a)>0
$$

> が全 $a$ で成り立ちます。開円錐の測度は正で、全体のGaussian積分は有限です。定義の三条件を確認できました。
<!-- definition-example-end -->

<a id="lem-lorg16-closed-causal-relation"></a>

<!-- formal-statement-start -->
> **補題（大域双曲的時空では因果到達関係が閉）**  
> 滑らかな大域双曲的時空で $p_k\to p$、$q_k\to q$、$p_k\le q_k$ なら、$p\le q$ である。特に $J^\pm(x)$ は閉集合である。
<!-- formal-statement-end -->

### 証明の見取り図

端点の近くに固定した時間的過去点と未来点を選び、それらのダイヤモンドで全曲線をまとめて囲みます。

<!-- proof-start -->
### 証明

$p=q$ の場合は反射性により成立します。以下 $p\ne q$ とします。$r\ll p$、$q\ll s$ を取ります。[時間的未来・過去の開性](../LORG7/index.md#thm-lorg7-chronological-open)により、大きい $k$ では

$$
r\ll p_k\le q_k\ll s
$$

です。$p_k$ から $q_k$ の因果曲線はすべて $K(r,s)$ に入ります。これはコンパクトであり、[曲線抽出命題](#prop-lorg16-curves-compact)を固定端点でない列へ使うには、その証明の弧長上界の背理法を $K(r,s)$ 内で再実行すればよいのです。

共通上界がなければ中央基点から両側非延長曲線が抽出され、[非閉じ込め性](#lem-lorg16-nonimprisonment)に反します。従って曲線は一様Lipschitz再表示でき、Arzelà–Ascoliで極限因果曲線が得られます。

その始点と終点は $p,q$ なので $p\le q$ です。$J^+(x)$ への点列の極限には $p_k=p=x$ を適用します。$\square$
<!-- proof-end -->

<a id="thm-lorg16-geroch-volume"></a>

<!-- formal-statement-start -->
> **定理（Geroch型体積時間関数の構成）**  
> $(M,g)$ を滑らかな大域双曲的時空とし、[体積関数](#def-lorg16-volume-functions) $V^\pm$ を用いる。関数

$$
T(x)=\log\frac{V^-(x)}{V^+(x)}
$$

> は連続な時間関数である。任意の両側非延長未来因果曲線 $\gamma$ 上で $T\circ\gamma$ の値域は $\mathbb R$ であり、各 $c\in\mathbb R$ について $T^{-1}(c)$ は[LORG15のCauchy面](../LORG15/index.md#def-lorg15-cauchy)である。
<!-- formal-statement-end -->

### 証明の見取り図

因果的に未来へ動けば過去集合が増え、未来集合が減ります。厳密単調性だけでなく連続性と両側の発散が必要です。連続性には[Jの閉性](#lem-lorg16-closed-causal-relation)と、時間的集合の境界が滑らかな正密度に関して零測度である事実を使います。発散には**非延長曲線のコンパクト領域への閉じ込めが不可能**という補題を使います。

<!-- proof-start -->
### 証明

**（1）連続性**。$x_k\to x$ とします。

$y\in I^+(x)$ なら[LORG7の開性](../LORG7/index.md#thm-lorg7-chronological-open)によって十分大きい $k$ では $y\in I^+(x_k)$ です。一方、$y\notin J^+(x)$ なら、もし部分列で $x_k\ll y$ なら[Jの閉性](#lem-lorg16-closed-causal-relation)に反します。

従って、$J^+(x)$ の境界上を除く各 $y$ について、$1_{I^+(x_k)}(y)\to1_{I^+(x)}(y)$ です。

[LORG12のachronal境界](../LORG12/index.md#lem-lorg12-boundary-graph)は局所Lipschitzグラフであるため、滑らかな正密度に関して零測度です。第二可算性で可算個のグラフ近傍に覆えるので、$\partial I^+(x)$ 全体も零測度です。従って有限測度 $\mu$ に関する[Lebesgueの優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)で

$$
V^+(x_k)=\int_M1_{I^+(x_k)}\,d\mu
\longrightarrow\int_M1_{I^+(x)}\,d\mu=V^+(x).
$$

同様に $V^-$ も連続です。両方正なので、その比の対数 $T$ も連続です。

**（2）厳密増加**。$x\le y$、$x\ne y$ なら因果集合の推移性から

$$
I^-(x)\subset I^-(y),\qquad I^+(y)\subset I^+(x).
$$

包含が測度について厳密であることも確認します。causalityにより $y\notin J^-(x)$ です。[Jの閉性](#lem-lorg16-closed-causal-relation)から、$y$ の小近傍に $J^-(x)$ と交わらない開集合があります。その中に $z\ll y$ を取ると、$z$ の小さい開近傍が $I^-(y)\setminus I^-(x)$ に入り正の測度を持ちます。従って $V^-(x)<V^-(y)$ です。未来側も $x\notin J^+(y)$ から同様に $V^+(y)<V^+(x)$ が成立し、

$$
T(y)-T(x)
=\log\frac{V^-(y)}{V^-(x)}
+\log\frac{V^+(x)}{V^+(y)}>0
$$

です。よって非定数の未来因果曲線上で厳密増加します。

**（3）両端の発散**。未来非延長な $\gamma:I\to M$ について、パラメータ $s_k\in I$ を厳密増加させ、**未来端に共終**となるよう選びます。つまり、任意の $s\in I$ に対し十分大きな $k$ で $s\le s_k$ とし、$x_k=\gamma(s_k)$ と置きます。[因果集合の推移性](../LORG6/index.md#prop-lorg6-transitivity)から $I^+(x_{k+1})\subset I^+(x_k)$ です。

もし $y\in\bigcap_k I^+(x_k)$ なら、すべての $k$ について $x_k\ll y$ です。任意の $s\ge s_1$ に対し $s\le s_k$ となる $k$ を選ぶと、

$$
x_1\le\gamma(s)\le x_k\ll y
\quad\Longrightarrow\quad
\gamma(s)\in J^+(x_1)\cap J^-(y)=K(x_1,y).
$$

従って曲線の未来尾部がコンパクトなダイヤモンドに閉じ込められ、[非閉じ込め補題](#lem-lorg16-nonimprisonment)に反します。よって $\bigcap_k I^+(x_k)=\varnothing$ です。ここで $A_k:=I^+(x_k)$、$B_j:=A_j\setminus A_{j+1}$ と置くと、$B_j$ は互いに素で、$A_1=\bigsqcup_{j\ge1}B_j$ です。測度の可算加法性と $\mu(A_1)\le\mu(M)<\infty$ から

$$
\mu(A_k)=\sum_{j=k}^{\infty}\mu(B_j)\longrightarrow0
$$

となります。従って

$$
V^+(x_k)=\mu(I^+(x_k))\longrightarrow0.
$$

他方 $V^-(x_k)\ge V^-(x_1)>0$ なので $T(x_k)\to+\infty$ です。（2）の単調性と点列の共終性により、$T\circ\gamma$ は曲線の未来端で $+\infty$ に発散します。

過去非延長側では、過去端に共始となる $s_k$ の減少列を選び、$x_k=\gamma(s_k)$ と置きます。このとき $I^-(x_{k+1})\subset I^-(x_k)$ です。共通部分に $y$ があると、任意の $s\le s_1$ に対し $s_k\le s$ となる $k$ を選んで

$$
y\ll x_k\le\gamma(s)\le x_1
\quad\Longrightarrow\quad
\gamma(s)\in K(y,x_1)
$$

が従い、過去尾部がコンパクト集合に閉じ込められて[非閉じ込め補題](#lem-lorg16-nonimprisonment)に反します。従って $V^-(x_k)\to0$ です。一方、$V^+(x_k)\ge V^+(x_1)>0$ なので $T(x_k)\to-\infty$ となり、単調性と共始性から過去端での発散も従います。

**（4）各レベルの一意交差**。両側非延長因果曲線のパラメータ域は連結区間です。（1）と（3）で $T\circ\gamma$ は連続かつ両端で $-\infty,+\infty$ に向かうので、中間値の定理により任意の $c$ を取ります。（2）の厳密増加から同じ値を二度取れません。従って $T^{-1}(c)$ との交点がちょうど一つで、[Cauchy面の定義](../LORG15/index.md#def-lorg15-cauchy)を満たします。$\square$
<!-- proof-end -->

ここまでで**大域双曲的 $\Rightarrow$ Cauchy面存在**は構成的に証明されました。$T$ は連続ですが、滑らかな勾配や直交分割を得たとは主張していません。その問題はLORG19–20で扱います。

## 6. 逆向きの含意と全体の特徴付け

Cauchy面 $\Sigma$ があると、[Cauchy面と全依存領域の同値](../LORG15/index.md#thm-lorg15-domain)によって $D(\Sigma)=M$ です。ここから大域双曲性を得るには、**依存領域は大域双曲的**という因果論の技術定理を使います。この技術定理は、$\Sigma$ を横切らない非延長曲線が発生することと、限界曲線列の逃避との矛盾を厳密化したものです。

<a id="lem-lorg16-domain-global"></a>

<!-- formal-statement-start -->
> **補題（依存領域の大域双曲性：標準的領域定理）**  
> 滑らかな時間向き付きLorentz時空 $(M,g)$ の閉じたachronal集合 $S$ に対し、$\operatorname{Int}D(S)$ が空でなければ、その開部分時空は強因果的で、その内部で計算したすべての因果ダイヤモンドがコンパクトである。
<!-- formal-statement-end -->

この補題の証明には[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)の**非延長な二本の極限曲線が生じる場合**と、[LORG13の依存領域](../LORG13/index.md#def-lorg13-dependence)の全称条件を組み合わせます。逃避する $p$–$q$ 曲線列を仮定すると、$p$ から未来へ逃げる曲線と $q$ から過去へ逃げる曲線が生じます。依存領域内ではこれらが $S$ の未来・過去を通らねばならず、極限曲線同士の因果順序とpush-upにより $S$ のachronal性に矛盾します。閉性の欠落も同じ極限曲線の二者択一で排除します。

**証明の境界**：この段落は標準的領域定理の核心の見取り図であり、極限曲線二者択一と領域内部の強因果性に関する補助定理を全件再証明したものではありません。正確な証明は Minguzzi, *Lorentzian causality theory* (2019), Theorem 3.45 および直前の Proposition 3.42–3.44 を参照してください。後続のLORG17–20の定理を逆輸入してはいません。

Cauchy面が**閉集合**である点も確認します。$\Sigma$ の極限点 $x$ を取り、$\Sigma$ 内の点列 $x_j\to x$ を選びます。[LORG15の両側非延長への延長構成](../LORG15/index.md#prop-lorg15-acausal)に従い、$x$ を通る局所時間的直線を両側非延長な時間的曲線へ延ばします。その曲線と $\Sigma$ との唯一の交点を $y$ とします。

もし $x\ne y$ で $x\ll y$ なら、[時間的関係の端点安定性](../LORG7/index.md#lem-lorg7-timelike-endpoints)から大きい $j$ では $x_j\ll y$ となります。$x_j,y\in\Sigma$ は[Cauchy面のacausal性](../LORG15/index.md#prop-lorg15-acausal)に反します。$y\ll x$ の場合も $y\ll x_j$ となって同様に矛盾します。従って $x=y\in\Sigma$ であり、$\Sigma$ は閉集合です。

<a id="thm-lorg16-characterization"></a>

<!-- formal-statement-start -->
> **定理（大域双曲性のCauchy面による特徴付け）**  
> 境界のない滑らかな連結Hausdorff・第二可算の時間向き付きLorentz時空 $(M,g)$ に対し、次は同値である。
>
> 1. $(M,g)$ は[大域双曲的](#def-lorg16-global-hyperbolicity)である（強因果的で、任意の $K(p,q)$ がコンパクト）。
> 2. $(M,g)$ は[LORG15のCauchy面](../LORG15/index.md#def-lorg15-cauchy)を少なくとも一つ持つ。
>
> 成立するとき、連続なCauchy時間関数が存在し、そのすべてのレベル集合はCauchy面となる。
<!-- formal-statement-end -->

### 証明の見取り図

（1）から（2）は体積時間関数を実際に構成しました。（2）から（1）は閉じたCauchy面について $D(\Sigma)=M$ を示したあと、依存領域の大域双曲性を適用します。逆向きだけ、明示した領域定理を用います。

<!-- proof-start -->
### 証明（領域定理を使用）

（1）を仮定すると、[Geroch型体積時間関数の構成](#thm-lorg16-geroch-volume)により、例えば $T^{-1}(0)$ はCauchy面です。また $T^{-1}(c)$ は全 $c$ でCauchy面になります。

（2）を仮定しCauchy面 $\Sigma$ を取ります。[Cauchy面のacausal性](../LORG15/index.md#prop-lorg15-acausal)により $\Sigma$ はachronalであり、直前の閉性の議論により閉集合です。Cauchy面が存在する時空はcausalです。実際、閉因果曲線があれば繰り返し周回する両側非延長因果曲線を作れ、Cauchy面との一意交差に矛盾します（交わらなければ存在性に反し、交われば同じ点を反復して一意性に反します）。

そこで[全依存領域との同値](../LORG15/index.md#thm-lorg15-domain)を適用して $D(\Sigma)=M$ を得ます。従って $\operatorname{Int}D(\Sigma)=M$ です。[領域定理](#lem-lorg16-domain-global)へ $S=\Sigma$ を代入すると、$(M,g)$ 自身が強因果的で、すべての因果ダイヤモンドがコンパクトとなります。これは（1）です。$\square$
<!-- proof-end -->

ここで大切なのは、一般時空に対して「Cauchy面が**一つ存在**」を言えば十分で、すべての空間的超曲面がCauchyという主張ではない点です。[LORG15の双曲線の例](../LORG15/index.md#thm-lorg15-uniform-graph)のように、滑らかな空間的面がCauchyとは限りません。

## 7. 仮定を診断する演習と詳細解答

<a id="ex-lorg16-a01"></a>
### LORG16-A01 平坦時空のダイヤモンド
- Level: A

二次元Minkowski時空で $p=(0,0)$、$q=(4,0)$ とする。$K(p,q)$ の各時刻切断と最大空間幅を求め、コンパクト性を示せ。

<!-- solution-start -->
**詳細解答**。[因果錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)によって $p\le(t,x)$ は $t\ge|x|$、$(t,x)\le q$ は $4-t\ge|x|$ です。従って

$$
K(p,q)=\{(t,x):0\le t\le4,\ |x|\le\min(t,4-t)\}.
$$

切断は $[-\min(t,4-t),\min(t,4-t)]$ です。$t=2$ で最大半幅2、最大全幅4となります。集合は連続関数の弱不等式で記された閉集合で、$[0,4]\times[-2,2]$ に含まれるため有界です。[Heine–Borel定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)でコンパクトです。
<!-- solution-end -->

<a id="ex-lorg16-a02"></a>
### LORG16-A02 原点を除くと何が失われるか
- Level: A

$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$ で $p=(-1,0)$、$q=(1,0)$ を取り、$K_{M_*}(p,q)$ がコンパクトでないことを証明せよ。

<!-- solution-start -->
**詳細解答**。$r_k=(0,1/k)$（$k\ge2$）は時刻差1に対し空間差 $1/k<1$ なので $p\ll r_k\ll q$ です。各時間的直線分は $(0,0)$ を通らず $M_*$ 内にあるため $r_k\in K_{M_*}(p,q)$ です。列 $r_k$ は周囲のMinkowski空間で $(0,0)$ に収束し、部分列も同じ極限を持ちます。しかしその点は $M_*$ にないので、$M_*$ 内で収束する部分列はありません。距離化可能空間ではコンパクトなら逐次コンパクトであるため矛盾します。
<!-- solution-end -->

<a id="ex-lorg16-a03"></a>
### LORG16-A03 時間周期の落とし穴
- Level: A

$S^1_t\times S^1_x$ に平坦計量 $-dt^2+dx^2$ を与える。すべての因果ダイヤモンドがコンパクトなのに大域双曲的ではないことを確認せよ。

<!-- solution-start -->
**詳細解答**。$t$ 軸方向の速度 $(1,0)$ は $g((1,0),(1,0))=-1<0$ です。周期方向を一周する曲線は未来向き閉時間的曲線になります。従ってcausalityを失い、強因果性も失います。任意の二点 $p,q$ に対し、時間方向の周回を十分多く行えば空間位置を移すための時間を確保できるので $p\ll q$ が成り立ちます。ゆえに $K(p,q)=M$ はコンパクトです。しかし定義の第一条件に反するので大域双曲的ではありません。
<!-- solution-end -->

<a id="ex-lorg16-a04"></a>
### LORG16-A04 体積の単調性
- Level: A

$u\le v$ なら $V^-(u)\le V^-(v)$、$V^+(v)\le V^+(u)$ を示せ。また、強因果性がある場合に閉因果曲線がない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[因果集合の推移性](../LORG6/index.md#prop-lorg6-transitivity)とpush-upから、$r\ll u\le v$ なら $r\ll v$、$v\ll s$ なら $u\ll s$ です。従って $I^-(u)\subset I^-(v)$、$I^+(v)\subset I^+(u)$ であり、正測度を取って二つの弱不等式を得ます。閉因果曲線が存在すれば、その上の点を含む小さな因果的凸近傍へ一周後に再侵入するため、[強因果性](../LORG10/index.md#def-lorg10-strong-causality)と矛盾します。
<!-- solution-end -->

<a id="ex-lorg16-a05"></a>
### LORG16-A05 時間帯の時空
- Level: A

$M=(0,2)\times\mathbb R^n$ とMinkowski計量を考える。時刻1の面がCauchy面であり、$M$ が大域双曲的であることを確認せよ。

<!-- solution-start -->
**詳細解答**。因果曲線の速度から $|\mathbf x(t_2)-\mathbf x(t_1)|\le t_2-t_1$ です。過去端の時刻が $a>0$ なら空間位置がCauchy列として極限を持ち、$(a,\mathbf x_a)\in M$ から過去へ継げるため非延長性に反します。未来端 $b<2$ についても同様です。したがって任意の両側非延長因果曲線は時刻区間 $(0,2)$ 全体を通り、時刻1の面との交点は一度だけです。

強因果性は時刻関数 $t$ から従います。二点 $p,q\in M$ に対し、ダイヤモンドはMinkowski全体での閉かつ有界なダイヤモンドと一致します。というのも端点の時刻がともに $(0,2)$ にあるため、その間の因果曲線は必ず時刻帯内に収まり、端点の間の閉時間区間も $(0,2)$ に含まれるからです。従ってコンパクトです。
<!-- solution-end -->

<a id="ex-lorg16-b01"></a>
### LORG16-B01 コンパクト閉じ込めの排除
- Level: B

強因果的時空の未来非延長因果曲線の尾部がコンパクト集合 $C$ に含まれると仮定し、集積点と因果的凸近傍を使って矛盾を導け。

<!-- solution-start -->
**詳細解答**。未来へ進むパラメータ列の像は $C$ 内にあるので、ある部分列は $a\in C$ に収束します。

$a$ を含む任意の近傍 $O$ の内側に、[強因果的な因果的凸近傍](../LORG10/index.md#thm-lorg10-alexandrov-basis) $U$ を取ります。尾部は $U$ を何度も訪れますが、一度離れて戻れば因果曲線が $U$ に再侵入したことになり、因果的凸性に反します。

ゆえにある時刻以降、尾部は $U\subset O$ にあります。$O$ を半径 $1/j$ の球に取ると尾部は $a$ に収束します。

局所時間的線分を $a$ の先へ継ぎ足せるため非延長性に反します。よってそのようなコンパクト集合は存在しません。
<!-- solution-end -->

<a id="ex-lorg16-b02"></a>
### LORG16-B02 曲線集合と点集合の違い
- Level: B

強因果的時空の $K(p,q)$ がコンパクトなら、$p$–$q$ 因果曲線の補助Riemann弧長が一様有界となる理由を、中央点からの抽出で説明せよ。

<!-- solution-start -->
**詳細解答**。弧長が共通上界を持たなければ、$\ell_k\to\infty$ の曲線列を取れます。各曲線を補助弧長で表示し、中央を $s=0$ に移します。中央点はすべてコンパクト $K(p,q)$ にあるので収束部分列を持ちます。定義域は $[-\ell_k/2,\ell_k/2]$ で両端が無限に遠ざかるため、[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)が両側非延長な極限因果曲線を与えます。その像は閉じた $K(p,q)$ に含まれますが、[非閉じ込め補題](#lem-lorg16-nonimprisonment)に反します。従って一様上界が必要です。コンパクトな点集合というだけではこの結論は出ず、強因果性が決定的でした。
<!-- solution-end -->

<a id="ex-lorg16-b03"></a>
### LORG16-B03 体積関数の連続性
- Level: B

大域双曲的時空で $x_k\to x$ とする。有限の滑らかな正密度について $\mu(I^+(x_k))\to\mu(I^+(x))$ を示すために必要な、開性・閉性・境界の零測度を順番に述べよ。

<!-- solution-start -->
**詳細解答**。$y\in I^+(x)$ なら、関係 $x\ll y$ の開性から大きな $k$ では $x_k\ll y$ です。

$y\notin J^+(x)$ なら、逆に無限個の $k$ で $x_k\le y$ が起きると[因果関係の閉性](#lem-lorg16-closed-causal-relation)に反します。よって $I^+(x)$ と $M\setminus J^+(x)$ では指示関数が点ごとに収束します。

残る $\partial I^+(x)$ は[LORG12のachronal境界の局所グラフ表示](../LORG12/index.md#lem-lorg12-boundary-graph)によって零測度です。有限測度 $\mu$ に対して $0\le1_{I^+(x_k)}\le1$ なので、[Lebesgueの優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を適用して積分の極限を移せます。
<!-- solution-end -->

<a id="ex-lorg16-b04"></a>
### LORG16-B04 Gaussian密度とCauchy面
- Level: B

二次元Minkowski時空で $\mu=c e^{-t^2-x^2}dt\,dx$ とし、$T=\log(V^-/V^+)$ とする。$T^{-1}(0)=\{t=0\}$ を示せ。

<!-- solution-start -->
**詳細解答**。時間反転 $R(t,x)=(-t,x)$ は密度を保ち、$I^-(0,a)$ を $I^+(0,a)$ へ写します。従って $V^-(0,a)=V^+(0,a)>0$ より $T(0,a)=0$ です。他方、各空間座標 $a$ について垂直線 $\gamma_a(t)=(t,a)$ は未来時間的であり、[体積時間関数の厳密増加](#thm-lorg16-geroch-volume)から $t>0$ なら $T(t,a)>T(0,a)=0$、$t<0$ なら $T(t,a)<0$ です。任意の点 $(t,a)$ を調べたので、零レベル集合は正確に時刻零の全直線です。
<!-- solution-end -->

<a id="ex-lorg16-c01"></a>
### LORG16-C01 三つの時空を診断する
- Level: C

二次元Minkowski時空 $\mathbb R^{1,1}$、原点除去時空 $\mathbb R^{1,1}\setminus\{(0,0)\}$、時間空間トーラス $(S^1\times S^1,-dt^2+dx^2)$ について、次を各々判定し、その不成立例を明示せよ。
1. causality（閉因果曲線の不存在）
2. すべての因果ダイヤモンドのコンパクト性
3. 大域双曲性
4. Cauchy面の存在

<!-- solution-start -->
**詳細解答**。**Minkowski**：時刻 $t$ が非定数の未来因果曲線に沿って厳密増加するため閉因果曲線はありません。[因果錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)によって任意のダイヤモンドは閉かつ有界でコンパクトです。従って大域双曲的で、[全時刻補題](../LORG15/index.md#lem-lorg15-full-time)により $\{t=0\}$ はCauchy面です。

**原点除去**：閉因果曲線が新たに生じることはなく、Minkowskiの時刻関数は制限しても時間関数なのでcausalです。しかし $p=(-1,0)$、$q=(1,0)$、$r_k=(0,1/k)$ の列がダイヤモンド内にあり、原点へ逃げるためコンパクトでありません。従って大域双曲的ではありません。[特徴付け定理](#thm-lorg16-characterization)の対偶からCauchy面も存在しません。

**時間空間トーラス**：時間方向を一周する未来時間的閉曲線があり、causalityを満たしません。一方、時間方向に十分周回できるので任意の二点に因果曲線があり、ダイヤモンドはコンパクトな時空全体 $M$ です。強因果性が破れるため大域双曲的ではありません。閉時間的曲線を無限回周回する両側非延長曲線は、もしCauchy面に出会えば無数回出会い、出会わなければ一度も出会わないので、Cauchy面は存在しません。

整理すると順に、Minkowskiは四条件すべて成立、原点除去は第一条件だけ成立、トーラスは第二条件だけ成立です。「コンパクト」と「因果的に健全」を分離できたかが要点です。
<!-- solution-end -->

## 8. 次の講へ：何がまだ足りないか

大域双曲性から、因果曲線から**収束する部分列を取り出せること**と連続Cauchy時間関数の**存在**を得ました。しかし二点間でLorentz長さを最大にする曲線が必ず存在するとは、まだ証明していません。まず長さの極限・半連続性をLORG17で、最大化曲線の存在をLORG18で扱います。その後にLORG19–20で時間関数の構成と滑らか化・分割へ進みます。

参考となる正確な標準定理と領域定理：E. Minguzzi, [Lorentzian causality theory](https://link.springer.com/article/10.1007/s41114-019-0019-x), *Living Reviews in Relativity* **22**, 3 (2019), Theorems 3.45, 4.119。引用した領域定理の補助論証を本講で完全再証明したわけではない点に注意してください。
