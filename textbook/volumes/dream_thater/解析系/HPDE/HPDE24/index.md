# HPDE24 反例・模型・AQFT/MICAへの橋

[大域Cauchy解の存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)、[Green作用素の存在](../HPDE18/index.md#thm-hpde18-green-existence)、[因果伝播子の短完全系列](../HPDE22/index.md#thm-hpde22-surjectivity-exact)、そして[実Klein–Gordon解のシンプレクティック形式](../HPDE23/index.md#thm-hpde23-nondegenerate)が揃いました。どれも波動作用素の二階部分が光円錐を決めるだけで成立するのでしょうか。

答えを見分けるには、**局所的な光円錐、全時空の因果構造、境界から入る情報**を分離する必要があります。同じ局所波動方程式でも、点を一つ取り除いたり時間的境界を作ったりすると、先ほどの定理に必要な仮定が失われます。他方、計量が時間依存であること自体は大域双曲性を壊しません。具体的な核・曲線・解を実際に計算して、この境目を確かめます。

計量符号は $(-,+,\ldots,+)$、$\Box_g=g^{ab}\nabla_a\nabla_b$、$P=-\Box_g+m^2$（$m\ge0$）とします。$G_{\mathrm{ret}}$ は未来への支持を持つ遅延Green作用素、$G_{\mathrm{adv}}$ は過去への支持を持つ先進Green作用素です。点源の分布核と滑らかなコンパクト源への作用は、適用場面ごとに区別します。

## 1. まず何を診断するのか

[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)であることは主シンボルが $-g^{-1}(\zeta,\zeta)$ であるという**各点近傍で判定する条件**です。一方、[大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)は、[強因果性](../../../幾何系/LORG/LORG10/index.md#def-lorg10-strong-causality)と、任意の二点 $p,q$ の因果ダイヤモンド $J^+(p)\cap J^-(q)$ がコンパクトであることを要求します。強因果性は閉因果曲線がないことより強く、因果曲線の小近傍への再侵入も排除します。$J^+(p)$ は $p$ から未来因果曲線で到達できる集合、$J^-(q)$ は $q$ へ未来因果曲線で到達できる集合です。

境界なしの時空に適用する本系列の大域定理について、次の診断の順番を固定します。

<a id="def-hpde24-diagnostic"></a>

<!-- formal-statement-start -->
> **定義（因果ダイヤモンドによる大域診断）**
> 時間向き付きLorentz時空上の二階作用素に、境界なし大域双曲時空用のCauchy・Green定理を適用できるか調べる際、(i) 作用素の主シンボルと正則性、(ii) 時空の強因果性と全ての $J^+(p)\cap J^-(q)$ のコンパクト性、(iii) 境界の有無と、境界がある場合の条件指定、を別々に確認する手順を本講の**大域診断**と呼ぶ。(i) だけで (ii) または (iii) を結論しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde24-diagnostic -->
### 直接例：完全なMinkowski平面

**定義の確認**。$M_0=\mathbb R^{1,1}$、$g_0=-dt^2+dx^2$、$P=\partial_t^2-\partial_x^2+m^2$ とします。座標基底の二階係数は $\operatorname{diag}(1,-1)=-g_0^{-1}$、質量項は滑らかなので (i) を満たします。また計量勾配は $\nabla^{g_0}t=-\partial_t$ で過去時間的です。よって $t$ は[temporal functionの定義](../../../幾何系/LORG/LORG10/index.md#def-lorg10-time-function)を満たし、[temporal functionがあれば強因果的](../../../幾何系/LORG/LORG10/index.md#thm-lorg10-temporal-implies-strong)という定理により (ii) の強因果性を確認できます。

ダイヤモンドについて、例えば $p=(-1,0),q=(1,0)$ に[Minkowskiの因果到達条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)を二回使うと

$$
J^+(p)\cap J^-(q)=\{(t,x):|t|+|x|\le1\}
$$

です。これは閉かつ有界なので[Heine–Borelの定理](../../../基礎科目/F0/F0-00C1/index.md#thm-f0-00c1-02)によりコンパクトです。一般の端点 $p=(t_p,x_p),q=(t_q,x_q)$ に対しても、ダイヤモンド中の $r=(t,x)$ は

$$
t_p\le t\le t_q,\qquad
|x-x_p|\le t-t_p,\qquad |x-x_q|\le t_q-t
$$

を満たします。時刻の上下界と $x_p$ からの距離上界によって $t,x$ は有界で、三条件はいずれも閉条件です。到達不能ならダイヤモンドは空集合です。よって任意のダイヤモンドがコンパクトで (ii) を満たします。$M_0$ に境界はなく (iii) も満たすので、[大域Cauchy定理](../HPDE16/index.md#thm-hpde16-global-cauchy)と[Green作用素定理](../HPDE18/index.md#thm-hpde18-green-existence)の対象になります。
<!-- definition-example-end -->

以降、診断が不合格になった模型でも「Green作用素が絶対に存在しない」とは主張しません。**この仮定を使った一般定理を適用できない**ことと、**特定の問題が解けない**ことは異なります。

## 2. 平坦時空でも質量・次元で波の尾は変わる

まず全時空は大域双曲のまま、波動方程式そのものを変えます。$M_0=\mathbb R^{1,1}$、$g_0=-dt^2+dx^2$ とし、時刻零・空間零の点源に対する未来支持の核 $K_m(t,x)$ を考えます。[1+1次元の因果的支持と内部への伝播](../HPDE1/index.md#prop-hpde1-causal-support)では初速度が光円錐の**内部**へも伝わりました。質量を加えても、その内部がどう変わるかを分布方程式で直接確認できます。

$H(s)$ を $s>0$ で $1$、$s<0$ で $0$ となるHeaviside分布とします（$s=0$ の点での値は分布を変えません）。$\delta$ はDirac分布です。光的座標 $p=t-x$、$q=t+x$ を取ると

$$
\partial_t^2-\partial_x^2=4\partial_p\partial_q,
\qquad t^2-x^2=pq.
$$

また $F_m(z)$ を $z\ge0$ について絶対収束級数

$$
F_m(z):=\sum_{k=0}^{\infty}\frac{(-m^2z/4)^k}{(k!)^2}
$$

で定めます。級数自体は $z<0$ にも収束し、境界での微分にはこの滑らかな延長を使います。通常のBessel記法では $F_m(z)=J_0(m\sqrt z)$（$z\ge0$）ですが、ここでは級数から必要な恒等式を導きます。特に $F_m(0)=1$ です。

<a id="prop-hpde24-flat-kernel"></a>

<!-- formal-statement-start -->
> **命題（平坦1+1次元の質量付き遅延核）**
> $m\ge0$、$P_m=\partial_t^2-\partial_x^2+m^2$ を $\mathbb R^{1,1}$ 上の作用素とし、上で定めた $F_m$ を用いる。このとき分布

$$
K_m(t,x)=\frac12H(t-x)H(t+x)F_m(t^2-x^2)
$$

> は $P_mK_m=\delta(t)\delta(x)$ を満たし、台は $\{t\ge|x|\}$ に含まれる。$m=0$ なら $K_0=\frac12H(t-|x|)$ であり、$m>0$ では円錐内部で

$$
K_m(t,x)=\frac12-\frac{m^2}{8}(t^2-x^2)
+O\!\left(m^4(t^2-x^2)^2\right)
$$

> が原点近くで成り立つ。従って1+1次元では質量の有無にかかわらず内部へのtailがあり、質量はその振幅を変える。
<!-- formal-statement-end -->

### 証明の見取り図

光的座標では二階作用素が混合微分になります。級数を二回微分して内部で方程式が零になることを確認します。分布の境界微分は $p=q=0$ で点源を一つ作り、その係数が $1$ になることをJacobianで確かめます。

<!-- proof-start -->
### 証明

$z=pq$、$F_m(z)=\sum a_kz^k$、$a_k=(-m^2/4)^k/(k!)^2$ とします。任意の有界 $z$ 区間で級数と各階導関数は一様収束します。従って項別微分でき、$k\ge1$ の項について

$$
\partial_p\partial_q(pq)^k
=\partial_p(kp^kq^{k-1})=k^2p^{k-1}q^{k-1}.
$$

ゆえに

$$
\begin{aligned}
4\partial_p\partial_q F_m(pq)
&=4\sum_{k\ge0}(k+1)^2a_{k+1}(pq)^k\\
&=-m^2\sum_{k\ge0}a_k(pq)^k=-m^2F_m(pq).
\end{aligned}
$$

分布 $W=H(p)H(q)F_m(pq)$ を微分します。まず $\partial_qF_m(pq)=pF_m'(pq)$ を使って

$$
\partial_qW=H(p)\delta(q)F_m(0)+H(p)H(q)pF_m'(pq).
$$

さらに $p$ で微分すると、第二項の境界微分に現れる $\delta(p)pF_m'(pq)$ は零です。第一項の微分は $\delta(p)\delta(q)F_m(0)$ です。従って光線に沿う余分な分布項は残らず、

$$
\begin{aligned}
4\partial_p\partial_q\{H(p)H(q)F_m(pq)\}
&=4\delta(p)\delta(q)F_m(0)\\
&\quad+4H(p)H(q)\partial_p\partial_qF_m(pq).
\end{aligned}
$$

内部の項は $m^2H(p)H(q)F_m(pq)$ と相殺します。残りは $K_m$ の係数 $1/2$ を含めて $2\delta(p)\delta(q)$ です。座標変換のJacobianは $|\partial(p,q)/\partial(t,x)|=2$ なので

$$
\delta(t)\delta(x)=2\delta(p)\delta(q).
$$

ゆえに $P_mK_m=\delta(t)\delta(x)$ です。$H(p)H(q)$ の台は $p,q\ge0$、すなわち $t\ge|x|$ であり、遅延支持を満たします。

質量が零なら正次数の級数項が全て消えます。質量が正なら原点近くで

$$
F_m(z)=1-\frac{m^2z}{4}+O(m^4z^2)
$$

となります。$F_m(0)=1$ で連続なので、円錐内部の原点に近い開領域で核は非零です。$\square$
<!-- proof-end -->

この模型には二つの注意があります。第一に、$K_m$ は**点源の分布核**であって、一般の滑らかな初期データの解そのものではありません。滑らかなコンパクト源 $f$ には畳込み $G_{\mathrm{ret}}f=K_m*f$ を使います。第二に、[有限伝播・支持の因果的包含](../HPDE10/index.md#thm-hpde10-finite-propagation)は台が閉光円錐を越えないことで、**強Huygens性**とは点源の伝播核が光円錐面上に限られることです。1+1次元の $K_0$ は既に強Huygens性を満たしません。

比較として、[3+1次元の質量なしMinkowski核](../HPDE12/index.md#thm-hpde12-three-dimensional)は $r=|\boldsymbol x|>0$ で

$$
K_{0}^{(3+1)}(t,r)=\frac{\delta(t-r)}{4\pi r}
$$

となり、光円錐面にのみ載ります。したがって次元を指定せず「質量なしなら強Huygens性がある」とは言えません。3+1次元に質量項を加えた場合の内部成分は[質量項が作る三次元の内部残響](../HPDE2/index.md#prop-hpde2-massive-tail)で、Duhamel表示と小質量展開から別途検証しています。本講の1+1次元の式だけから3+1次元の結果を推論してはいません。

## 3. 時間依存計量でもCauchy面は残せる

静的な背景では波の速度が一定でした。では時間とともに空間尺度が変化すれば、[大域双曲性の判定](#def-hpde24-diagnostic)は不合格になるのでしょうか。反例として、時間に依存するにもかかわらず、全時刻スライスがCauchy面になる模型を作ります。

$\alpha>0$ を定数とし、$M=\mathbb R_t\times\mathbb R_x$ に

$$
g=-dt^2+a(t)^2dx^2,\qquad a(t)=e^{\alpha t}>0
$$

を入れます。これは $1+1$ 次元の滑らかなLorentz計量で、時間依存します。$\eta=-e^{-\alpha t}/\alpha$ は**共形時間**という新しい座標で、$d\eta=dt/a(t)$、値域は $(-\infty,0)$ です。したがって

$$
g=a(t(\eta))^2(-d\eta^2+dx^2).
$$

<a id="prop-hpde24-expanding-cauchy"></a>

<!-- formal-statement-start -->
> **命題（時間依存膨張模型のCauchy性）**
> $\alpha>0$、$M=\mathbb R^2$、$g=-dt^2+e^{2\alpha t}dx^2$、未来向きを $\partial_t$ で定める。このとき各 $\Sigma_c=\{t=c\}$ は滑らかな空間的Cauchy面であり、$(M,g)$ は大域双曲的である。また $P=-\Box_g+m^2$ の主シンボルは $-g^{-1}(\zeta,\zeta)$ で、局所表示は

$$
P=\partial_t^2+\alpha\partial_t-e^{-2\alpha t}\partial_x^2+m^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

共形時間では因果曲線の速度上界が $|dx/d\eta|\le1$ になります。もし曲線の $t$ が有限値で止まれば、$x$ も有限極限を持ち、時空内で曲線を延長できてしまいます。ゆえに非延長曲線はすべての $t$ を一度ずつ通過します。

<!-- proof-start -->
### 証明

未来因果曲線 $\gamma$ の接ベクトルについて、共形因子 $a^2>0$ を割ると

$$
a^2\{-\dot\eta^2+\dot x^2\}\le0,\qquad \dot\eta\ge0.
$$

時間が増える非定数部分を共形時間 $\eta$ でパラメータ表示すれば、因果条件から

$$
\left|\frac{dx}{d\eta}\right|\le1
$$

です。ここで座標時刻 $t$ に有限の未来上端 $b$ があると仮定します。共形時間 $\eta(t)$ は $t=b$ まで有限・連続に延長できます。また、上の不等式が与える1-Lipschitz性により、空間座標 $x$ には有限極限 $x_b$ が存在します。

極限点 $(b,x_b)$ は時空 $M$ 内にあります。この点から未来向きの垂直時間曲線を接続できるため、もとの曲線 $\gamma$ は未来非延長ではありません。矛盾です。過去側も同じ議論で示されるので、両側非延長因果曲線の時刻値域は $\mathbb R$ です。時間は未来因果曲線に沿って厳密増加し、各 $\Sigma_c$ とちょうど一度交わります。

よって[滑らかなCauchy面の定義](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)を満たし、[大域双曲性の特徴付け](../../../幾何系/LORG/LORG16/index.md#thm-lorg16-characterization)から大域双曲性が従います。

一方、座標基底 $(\partial_t,\partial_x)$ で $g_{ij}=g(\partial_i,\partial_j)$ を並べると $\operatorname{diag}(-1,a^2)$ です。$a>0$ なので非退化で、負方向・正方向が一本ずつあります。逆計量と体積密度の係数は

$$
(g^{ij})=\operatorname{diag}(-1,a^{-2}),\qquad
\det(g_{ij})=-a^2,\qquad\sqrt{|\det g|}=a
$$

です。[Levi-Civita接続の係数公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)へ $\partial_tg_{xx}=2aa'$ を代入すると

$$
\Gamma^t_{xx}=aa',\qquad\Gamma^x_{tx}=\Gamma^x_{xt}=a'/a
$$

が非零の係数です。関数の二階共変微分 $\nabla_i\nabla_j u=\partial_i\partial_j u-\Gamma^k_{ij}\partial_ku$ を逆計量で縮約すると

$$
\begin{aligned}
\Box_gu
&=g^{tt}(u_{tt}-\Gamma^k_{tt}u_k)
+g^{xx}(u_{xx}-\Gamma^t_{xx}u_t)\\
&=-u_{tt}+a^{-2}(u_{xx}-aa'u_t)\\
&=-\partial_t^2u-\alpha\partial_tu+e^{-2\alpha t}\partial_x^2u.
\end{aligned}
$$

したがって $-\Box_g+m^2$ は命題の表示を持ち、二階主シンボルは $\zeta_t^2-e^{-2\alpha t}\zeta_x^2=-g^{-1}(\zeta,\zeta)$ です。$\square$
<!-- proof-end -->

**質量なしの追加検算**。次元が $1+1$ なので $-\Box_g=a^{-2}(\partial_\eta^2-\partial_x^2)$ です。任意の滑らかな一変数関数 $F$ に対して $u(\eta,x)=F(x-\eta)$ とすれば

$$
(\partial_\eta^2-\partial_x^2)u=F''(x-\eta)-F''(x-\eta)=0.
$$

したがって時間に依存する背景でも明示的な波動解を得ます。$t\to+\infty$ で $\eta\uparrow0$ と有限値へ近づくことは、**時空から未来端を取り除いたことではありません**。どの有限 $t$ の点も時空内にあり、Cauchy面は全ての実数 $t$ に存在します。

## 4. 点を一つ除くと因果ダイヤモンドに穴が開く

今度は方程式の局所係数を一切変えず、$M_*=\mathbb R^{1,1}\setminus\{o\}$、$o=(0,0)$、$g_*=-dt^2+dx^2$ とします。除去点以外のすべての点の近傍は平坦Minkowskiの開部分と同じです。$P=-\Box_{g_*}$ はなおnormally hyperbolicですが、全時空を一枚のCauchy面から支配する論証には穴が開きます。

<a id="prop-hpde24-puncture"></a>

<!-- formal-statement-start -->
> **命題（点除去模型の失われた大域仮定）**
> $M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$ に平坦計量を制限し、$p=(-1,0)$、$q=(1,0)$ とする。$J^+_{M_*}(p)\cap J^-_{M_*}(q)$ は非コンパクトである。さらに初期集合 $S_*=\{(0,x):x\ne0\}$ はCauchy面でなく、その依存領域は

$$
D_{M_*}(S_*)=\{(t,x)\in M_*:|x|>|t|\}.
$$

> 従って局所的に波動型であっても、境界なし大域双曲時空について証明したCauchy・Green存在一意性定理の仮定は満たされない。
<!-- formal-statement-end -->

### 証明の見取り図

除去された原点に収束するダイヤモンド内の点列を作ればコンパクト性は壊れます。また原点から出発するはずだった因果曲線は、点除去時空では原点まで延長できず、その先の初期スライスを通過しません。

<!-- proof-start -->
### 証明

$z_k=(0,1/k)$（$k\ge2$）を取ります。$p\to z_k$ と $z_k\to q$ を結ぶ直線の時間差はいずれも $1$、空間差の絶対値は $1/k<1$ であるため、どちらも時間的です。$t=0$ での空間位置は $1/k\ne0$ なので原点を通りません。従って $z_k$ は $M_*$ 内の因果ダイヤモンドに属します。

一方、$z_k\to o$ ですが除去点 $o$ は $M_*$ に属しません。部分列も同じ点以外には収束できないため、ダイヤモンド中のこの点列に $M_*$ で収束する部分列はなく、コンパクトではありません。

$t>0$ で $|x|\le t$ を満たす点 $(t,x)$ へは、$\gamma(s)=(s,sx/t)$（$0<s\le t$）という過去端が原点に近づく未来因果曲線が到達します。$|dx/ds|=|x|/t\le1$ で、$s\downarrow0$ で曲線は削除点に達するため、$M_*$ 内では過去非延長です。この曲線は $S_*$ と交わらないので $(t,x)\notin D^+(S_*)$ です。光的な等号 $|x|=t$ も除外されます。

逆に $t>0$ で $|x|>t$ とします。[点除去時空の依存領域の計算](../../../幾何系/LORG/LORG21/index.md#prop-lorg21-punctured-domain)で使った因果速度評価により、過去向き曲線を時刻 $s$ で表すと

$$
|x(s_1)-x(s_2)|\le|s_1-s_2|
$$

です。従って有限な過去端時刻があれば空間座標にも極限があり、曲線を延長できない有限端点は除去点 $o$ しかありません。しかし原点から $(t,x)$ へ因果的に達するには $|x|\le t$ が必要であり、仮定に反します。よって全ての過去非延長曲線は時刻零で $o$ 以外の点を通り、$S_*$ と交わります。過去側は時間反転で同様に示せ、表示の式を得ます。$\square$
<!-- proof-end -->

では、点除去のせいで**滑らかな解の一意性が必ず破れる**のでしょうか。そこまでは結論できません。正則性クラスを区別するため、[束値超関数](../HPDE3/index.md#def-hpde3-distribution-section)の定義を階数1の実数束に適用して次を見ます。完全なMinkowski平面上の分布

$$
w(t,x)=\frac12H(t-|x|)
$$

は第2節の $K_0$ なので $(\partial_t^2-\partial_x^2)w=\delta_o$ です。しかし $M_*$ へ制限した分布 $w|_{M_*}$ に対し、コンパクト支持試験関数 $\phi\in C_c^\infty(M_*)$ は $o$ の近傍で零なので、$\mathbb R^{1,1}$ へ零延長した試験関数 $\widetilde\phi$ に対して

$$
\langle P(w|_{M_*}),\phi\rangle
=\langle\delta_o,\widetilde\phi\rangle=0.
$$

しかも各 $(0,x_0)\in S_*$ に対して、近傍

$$
|t|+|x-x_0|<|x_0|/2\quad\Longrightarrow\quad t<|x|
$$

では $w$ が零です。従って初期集合上の分布的な変位と速度は共に零であるのに、未来の錐内部では $w=1/2$ です。これは**分布解として**、穴に隠れた源を初期データだけでは排除できない実例です。ただし光円錐上に跳びがあり $w$ は滑らかでないので、この例を滑らかな解の非一意性の証明へすり替えてはいけません。

## 5. 時間的境界では滑らかな零データ解さえ一意ではない

より鋭い失敗は半直線模型で起きます。内部時空 $M_+=\mathbb R_t\times(0,\infty)_x$ は局所平坦ですが、$x=0$ に時間的な「壁」を付けた閉半空間 $\overline M_+=\mathbb R\times[0,\infty)$ を考えると、壁に沿う誘導計量は $-dt^2$ です。従って境界は時間的です。

$x>0$ の初期変位・速度を二つ指定しても、後から壁を通じて入ってくる波の値はまだ決まりません。境界に沿って何を零にするかが追加データです。

<a id="def-hpde24-dirichlet"></a>

<!-- formal-statement-start -->
> **定義（斉次Dirichlet条件）**
> 半空間 $\overline M_+=\mathbb R\times[0,\infty)$ 上の波動作用素 $P=\partial_t^2-\partial_x^2$ について、境界まで滑らかな実関数 $u$ が次を満たすとき、斉次Dirichlet条件を満たすという。

$$
u(t,0)=0\qquad(t\in\mathbb R).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde24-dirichlet -->
### 直接例：固定端の振動

**定義の確認**。$k>0$、$u_D(t,x)=\sin(kx)\cos(kt)$ とします。境界での値と内部の方程式を別々に確かめると

$$
u_D(t,0)=\sin(0)\cos(kt)=0,\qquad Pu_D=(-k^2+k^2)u_D=0
$$

です。一方 $\partial_xu_D(t,0)=k\cos(kt)$ は恒等的に零ではありません。これは**固定端**の境界条件です。
<!-- definition-example-end -->

<a id="def-hpde24-neumann"></a>

<!-- formal-statement-start -->
> **定義（斉次Neumann条件）**
> 半空間 $\overline M_+=\mathbb R\times[0,\infty)$ 上の波動作用素 $P=\partial_t^2-\partial_x^2$ について、境界まで滑らかな実関数 $u$ が次を満たすとき、斉次Neumann条件を満たすという。

$$
\partial_xu(t,0)=0\qquad(t\in\mathbb R).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde24-neumann -->
### 直接例：自由端の振動

**定義の確認**。同じ $k>0$ について $u_N(t,x)=\cos(kx)\cos(kt)$ とします。境界の法線微分と内部方程式は

$$
\partial_xu_N(t,0)=-k\sin(0)\cos(kt)=0,\qquad Pu_N=(-k^2+k^2)u_N=0
$$

です。他方 $u_N(t,0)=\cos(kt)$ は恒等的に零ではありません。こちらは**自由端**に対応します。両方のモードは空間的に非コンパクトなので、後の有限エネルギー一意性の証明へそのまま入力しません。
<!-- definition-example-end -->

<a id="prop-hpde24-boundary-nonunique"></a>

<!-- formal-statement-start -->
> **命題（時間的境界での零初期データ非一意性）**
> 開半空間 $M_+=\mathbb R\times(0,\infty)$ において、波動方程式と零初期データ

$$
(\partial_t^2-\partial_x^2)u=0,\qquad
u(0,x)=\partial_tu(0,x)=0\quad(x>0)
$$

> を課しても、壁での境界値を指定しなければ、未来の滑らかな解は一意ではない。
<!-- formal-statement-end -->

### 証明の見取り図

壁から右へ進む波 $F(t-x)$ は波動方程式を満たします。$F$ を正時刻にのみ台を持つ滑らかな関数にすれば、初期面には何も現れませんが、時間が経つと内部に波が到達します。

<!-- proof-start -->
### 証明

$F\in C_c^\infty((1,2),\mathbb R)$ を零でない関数とし、$u(t,x)=F(t-x)$ と置きます。合成関数の微分を一段ずつ計算すると

$$
\partial_tu=F'(t-x),\quad \partial_t^2u=F''(t-x),
$$

$$
\partial_xu=-F'(t-x),\quad \partial_x^2u=F''(t-x).
$$

従って $Pu=0$ です。$t=0$、$x>0$ では $t-x=-x<0$ なので $F(-x)=F'(-x)=0$ です。したがって初期変位・速度は零です。しかし $s_0\in(1,2)$ で $F(s_0)\ne0$ となる点を選び、$x>0$、$t=x+s_0$ とすれば $u(t,x)=F(s_0)\ne0$ です。零解も同じ初期データを満たすので一意ではありません。実際、境界値は $u(t,0)=F(t)$ と非零であり、ここから情報が入っています。$\square$
<!-- proof-end -->

この証明の失敗機構は明確です。$t=0$ は $M_+$ のCauchy面ではなく、過去向き因果曲線の中には壁で終わって $t=0$ を通らないものがあります。[HPDE8の零データ一意性](../HPDE8/index.md#thm-hpde8-uniqueness-stability)で側面のエネルギー流を消せたのは、適切な因果領域と境界項の符号があったからです。ここでは未指定の壁からの流束が残ります。

## 6. 境界条件を指定すれば別々のGreen核ができる

壁の存在がGreen核の選択にも現れることを、質量なし1+1次元で明示します。全平面上の遅延核を

$$
K_0(\tau,z)=\frac12H(\tau-|z|)
$$

とし、$y>0$ を源の空間位置、$s$ をその時刻とします。壁から反射した「鏡像源」の位置は $-y$ です。内部の観測点を $(t,x)$（$x>0$）として、鏡像核を引けばDirichlet、足せばNeumannを満たす候補になります。

<a id="prop-hpde24-image-green"></a>

<!-- formal-statement-start -->
> **命題（半直線の反射Green核）**
> $x,y>0$、$\tau=t-s$ とし、$P=\partial_t^2-\partial_x^2$ とする。分布核

$$
\begin{aligned}
K_D(t,x;s,y)&=K_0(\tau,x-y)-K_0(\tau,x+y),\\
K_N(t,x;s,y)&=K_0(\tau,x-y)+K_0(\tau,x+y)
\end{aligned}
$$

> は内部で $P_{t,x}K_{D/N}=\delta(t-s)\delta(x-y)$、$t<s$ で零を満たす。さらに壁で $K_D(t,0;s,y)=0$、$\partial_xK_N(t,0;s,y)=0$ が分布として成立する。従って、壁での条件が異なる二つの遅延問題は異なるGreen核を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

二つの項はそれぞれ全平面の点源核です。鏡像源は $x=-y<0$ にあるため、内部 $x>0$ では源を作りません。$K_0(\tau,z)$ が $z$ に関して偶関数であることから、壁での値と法線微分の相殺を確認します。

<!-- proof-start -->
### 証明

[平坦核の分布方程式](#prop-hpde24-flat-kernel)を $m=0$、$(t,x)\mapsto(t-s,x-y)$ に適用すると

$$
P_{t,x}K_0(t-s,x-y)=\delta(t-s)\delta(x-y).
$$

鏡像項へ適用すると $\delta(t-s)\delta(x+y)$ ですが、$x>0$、$y>0$ ではこの分布の台は内部と交わりません。ゆえに $K_D,K_N$ は共に内部の正しい点源を持ちます。各項は $\tau<0$ で零です。

壁で $x=0$ を代入すると、偶関数性 $K_0(\tau,-y)=K_0(\tau,y)$ から

$$
K_D(t,0;s,y)=K_0(\tau,-y)-K_0(\tau,y)=0.
$$

空間変数に関する分布微分は奇関数なので $\partial_zK_0(\tau,-y)=-\partial_zK_0(\tau,y)$ です。従って

$$
\partial_x K_N(t,0;s,y)
=\partial_zK_0(\tau,-y)+\partial_zK_0(\tau,y)=0.
$$

最後に $\tau>x+y$ なら両方の $K_0$ の値は $1/2$ なので、$K_D=0$、$K_N=1$ です。鏡像項は実際に両核を異なるものにします。$\square$
<!-- proof-end -->

これらは $C_c^\infty(\mathbb R_s\times(0,\infty)_y)$ の源を積分して作る、**指定した境界条件に対する**遅延解の核です。例えば

$$
(G_Df)(t,x)=\int_{\mathbb R}\int_0^\infty
K_D(t,x;s,y)f(s,y)\,dy\,ds
$$

は $P G_Df=f$、$G_Df|_{x=0}=0$ を満たします。反射項の符号が違う $G_N$ も同じ内部方程式を満たします。いずれも境界なしの[Green一意性定理](../HPDE19/index.md#thm-hpde19-uniqueness)をそのまま使って得たものではありません。境界条件を加えた別問題であり、一意性を証明するには境界フラックスを制御する必要があります。

## 7. 壁を通るシンプレクティック電流

[保存電流の発散恒等式](../HPDE23/index.md#prop-hpde23-current-divergence)は局所微分の計算なので、壁のある時空でも内部では成立します。しかし面積分が保存するかは別問題です。二つの実斉次解 $u,v$ に対して、境界まで滑らかで、各有限時間帯で空間方向にコンパクト支持を持つと仮定します。この支持仮定によって $x\to\infty$ の境界項は消せます。

<a id="prop-hpde24-boundary-flux"></a>

<!-- formal-statement-start -->
> **命題（シンプレクティック電流の境界フラックス）**
> $\overline M_+=\mathbb R\times[0,\infty)$ で $Pu=Pv=0$、$P=\partial_t^2-\partial_x^2$ とし、$u,v$ は境界まで滑らかで有限時間帯ごとに空間コンパクト支持とする。初期面上の形式を

$$
\Omega_t(u,v):=\int_0^\infty(u\partial_tv-v\partial_tu)(t,x)\,dx
$$

> と定めると、任意の $a<b$ に対して

$$
\Omega_b(u,v)-\Omega_a(u,v)
=-\int_a^b\left[u\partial_xv-v\partial_xu\right]_{x=0}dt.
$$

> 両解が共に斉次Dirichlet条件、または共に斉次Neumann条件を満たせば右辺は零である。
<!-- formal-statement-end -->

### 証明の見取り図

時間微分した面積分へ波動方程式 $u_{tt}=u_{xx}$、$v_{tt}=v_{xx}$ を代入し、空間方向に積の微分を一回戻します。唯一残る壁の項が流束です。

<!-- proof-start -->
### 証明

滑らかさと有限帯での空間コンパクト支持により、時間微分を積分内へ入れられます。積の法則では一次時間微分の積が相殺して

$$
\begin{aligned}
\frac{d}{dt}\Omega_t(u,v)
&=\int_0^\infty
\bigl(u_tv_t+uv_{tt}-v_tu_t-vu_{tt}\bigr)\,dx\\
&=\int_0^\infty(uv_{xx}-vu_{xx})\,dx.
\end{aligned}
$$

右辺の被積分関数は

$$
uv_{xx}-vu_{xx}
=\partial_x(uv_x-vu_x)
$$

です。十分大きな $x$ では両解と微分が零なので、[定積分の端点評価](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)を $x\mapsto uv_x-vu_x$ に適用し、

$$
\frac{d}{dt}\Omega_t
=\left[uv_x-vu_x\right]_{x=\infty}
-\left[uv_x-vu_x\right]_{x=0}
=-\left[uv_x-vu_x\right]_{x=0}.
$$

これを $t\in[a,b]$ で積分します。[定積分の端点評価](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)を $t\mapsto\Omega_t$ に適用すると、$\int_a^b\Omega_t'\,dt=\Omega_b-\Omega_a$ となります。Dirichletなら壁で $u=v=0$、Neumannなら $u_x=v_x=0$ なので、どちらの場合も積分される壁の流束が零になります。$\square$
<!-- proof-end -->

同じ時間的境界でも条件の選び方が保存形式を変えます。したがって[HPDE23の面独立性](../HPDE23/index.md#thm-hpde23-slice-independence)の証明に現れた「外側の流束が零」を、境界条件なしで再利用することはできません。

## 8. 古典場から量子場へ何を渡せるか

ここまでの結果を、後続の代数的量子場理論（AQFT）と微局所的な場の解析（MICA）へ接続します。略号は科目名を指すもので、既に量子論の構成が済んだという意味ではありません。

| 渡せる古典的データ | 成立のための入力 | まだ別途必要なもの |
| --- | --- | --- |
| 斉次解の存在一意性・因果的支持 | 境界なし・滑らかな大域双曲時空、normally hyperbolic作用素、指定されたCauchyデータ | 境界付き時空での適切な境界条件とその適切設定性 |
| $G_{\mathrm{ret}},G_{\mathrm{adv}}$ と因果伝播子 $E_{\mathrm{cau}}$ | [Green存在と支持](../HPDE18/index.md#thm-hpde18-green-existence)、[exact sequence](../HPDE22/index.md#thm-hpde22-surjectivity-exact) | 境界反射などを含む新たなGreen作用素の構成 |
| 実解空間と非退化交代形式 $\Omega$ | 同一実ポテンシャルの[形式的自己随伴なKlein–Gordon作用素](../HPDE23/index.md#def-hpde23-real-kg)と[非退化性](../HPDE23/index.md#thm-hpde23-nondegenerate) | 量子場の交換関係を実装する代数の構成、表現・状態・正値性、局所代数の取り扱い（AQFT） |
| 局所Hadamard係数と古典的基本解の特異構造 | [Hadamard輸送式](../HPDE13/index.md#thm-hpde13-hadamard-integral)と[局所parametrix補正](../HPDE14/index.md#thm-hpde14-true-local) | 波面集合の解析、二点関数のHadamard条件・正値性（MICA） |

ここで特に三つの飛躍を避けます。

1. $P$ がnormally hyperbolicでも一般には形式的自己随伴ではありません。実KG場で[保存形式を構成した追加仮定](../HPDE23/index.md#def-hpde23-real-kg)を、束値の全作用素へ無条件に拡張しません。
2. 因果伝播子の反対称な積分対を得ただけでは、量子状態の正値性やHadamard二点関数の存在は示されません。古典解空間は**入力**であって量子論の完成品ではありません。
3. 局所Hadamard係数と、量子状態のHadamard条件は同じ対象ではありません。前者は基本解の局所構成であり、後者には二点関数の特異方向・波面集合など追加の理論が要ります。

時間的境界のDirichlet・Neumann模型は、これらの条件が単なる形式上の飾りでないことを示します。局所的な作用素が同じでも、許される解、Green核、面上の保存量の領域を、**境界条件込みで**決める必要があるのです。

## 9. 演習

### Level A：核・係数・因果曲線を手で検算する

<a id="ex-hpde24-a01"></a>

#### HPDE24-A01 光的座標のDirac係数

- Level: A

$p=t-x$、$q=t+x$ により $K_0(t,x)=\frac12H(p)H(q)$ とする。$P_0=\partial_t^2-\partial_x^2$ について、(i) $P_0=4\partial_p\partial_q$、(ii) $P_0K_0=\delta(t)\delta(x)$、(iii) $\operatorname{supp}K_0\subseteq\{t\ge|x|\}$ を示せ。

<!-- solution-start -->
**詳細解答**。連鎖律で $\partial_t=\partial_p+\partial_q$、$\partial_x=-\partial_p+\partial_q$ なので

$$
\begin{aligned}
\partial_t^2-\partial_x^2
&=(\partial_p+\partial_q)^2-(-\partial_p+\partial_q)^2\\
&=4\partial_p\partial_q.
\end{aligned}
$$

$\partial_pH(p)=\delta(p)$、$\partial_qH(q)=\delta(q)$ を別々に使い、

$$
P_0K_0=4\partial_p\partial_q\bigl(\tfrac12H(p)H(q)\bigr)
=2\delta(p)\delta(q).
$$

一方、$\det\partial(p,q)/\partial(t,x)=2$ なので、二変数のDirac分布の変数変換は $\delta(t)\delta(x)=2\delta(p)\delta(q)$ となります。よって分布方程式を満たします。$H(p)H(q)$ は $p,q\ge0$ の外で零であり、これは $t-x\ge0$、$t+x\ge0$、すなわち $t\ge|x|$ と同値です。
<!-- solution-end -->

<a id="ex-hpde24-a02"></a>

#### HPDE24-A02 質量項と級数の最初の係数

- Level: A

$F(z)=1+a_1z+a_2z^2+\cdots$ が $4\partial_p\partial_qF(pq)+m^2F(pq)=0$ を満たし、$m>0$ とする。$a_1,a_2$ を求め、$\frac12F(t^2-x^2)$ の円錐内部での二次までの展開を書け。

<!-- solution-start -->
**詳細解答**。$\partial_p\partial_q(pq)^k=k^2(pq)^{k-1}$ だから、$z^k$ の係数比較で

$$
4(k+1)^2a_{k+1}+m^2a_k=0,
\qquad a_{k+1}=-\frac{m^2}{4(k+1)^2}a_k.
$$

$a_0=1$ を代入すると

$$
a_1=-\frac{m^2}{4},\qquad
a_2=-\frac{m^2}{16}a_1=\frac{m^4}{64}.
$$

したがって $z=t^2-x^2>0$ の原点近くでは

$$
\frac12F(z)=\frac12-\frac{m^2z}{8}+\frac{m^4z^2}{128}
+O(m^6z^3).
$$

質量が零なら全ての正次数係数が零ですが、核の定数項 $1/2$ は円錐内部で残ります。従ってmasslessでも1+1次元にはtailがあります。
<!-- solution-end -->

<a id="ex-hpde24-a03"></a>

#### HPDE24-A03 時間依存計量の主シンボル

- Level: A

$g=-dt^2+e^{2\alpha t}dx^2$（$\alpha>0$）とし、$P=-\Box_g+m^2$ とする。$\det g$、$g^{-1}$、$P$ の座標表示を求め、共変ベクトル $\zeta=\tau\,dt+\kappa\,dx$ に対する二階主シンボルを計算せよ。

<!-- solution-start -->
**詳細解答**。座標基底 $(\partial_t,\partial_x)$ に関する計量の成分 $g_{ij}=g(\partial_i,\partial_j)$ は $g_{tt}=-1$、$g_{tx}=0$、$g_{xx}=e^{2\alpha t}$ です。係数行列は $\operatorname{diag}(-1,e^{2\alpha t})$ となり、逆計量はその逆行列です。

$$
\det g=-e^{2\alpha t},\quad \sqrt{|\det g|}=e^{\alpha t},\quad
g^{tt}=-1,\quad g^{xx}=e^{-2\alpha t}.
$$

本章の[膨張模型の係数計算](#prop-hpde24-expanding-cauchy)と同じく、$\Gamma^t_{xx}=\alpha e^{2\alpha t}$、$\Gamma^x_{tx}=\Gamma^x_{xt}=\alpha$ を得ます。$\Box_gu=g^{ij}(\partial_i\partial_j u-\Gamma^k_{ij}\partial_ku)$ に代入すると

$$
\begin{aligned}
\Box_gu
&=-u_{tt}+e^{-2\alpha t}(u_{xx}-\alpha e^{2\alpha t}u_t)\\
&=-u_{tt}-\alpha u_t+e^{-2\alpha t}u_{xx}.
\end{aligned}
$$

よって $Pu=u_{tt}+\alpha u_t-e^{-2\alpha t}u_{xx}+m^2u$ という作用です。二階係数だけを取り出すと

$$
\sigma_2(P)(\zeta)=\tau^2-e^{-2\alpha t}\kappa^2
=-g^{-1}(\zeta,\zeta).
$$

係数 $\alpha$ の一次微分項や $m^2$ は主シンボルに入らず、計量の時間依存はnormally hyperbolic性を壊しません。
<!-- solution-end -->

<a id="ex-hpde24-a04"></a>

#### HPDE24-A04 点除去ダイヤモンドの非コンパクト性

- Level: A

$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$、$p=(-1,0)$、$q=(1,0)$ とする。$z_k=(0,1/k)$（$k\ge2$）が $J^+_{M_*}(p)\cap J^-_{M_*}(q)$ に入ることを因果速度で示し、ダイヤモンドがコンパクトでない理由を記せ。

<!-- solution-start -->
**詳細解答**。$p$ と $z_k$ の差は $(\Delta t,\Delta x)=(1,1/k)$、$z_k$ と $q$ の差は $(1,-1/k)$ です。どちらも

$$
\Delta t=1>|\Delta x|=1/k
$$

なので、結ぶ直線は未来時間的です。両線分は $t=0$ で $z_k$ のみを通り、原点を避けるため $M_*$ 内にあります。従って $z_k$ はダイヤモンドに属します。一方 $z_k\to(0,0)$ ですが、この極限点は $M_*$ に属しません。部分列も同じ欠損点にしか収束できず、$M_*$ 内で収束部分列を持たないのでコンパクトではありません。
<!-- solution-end -->

### Level B：失敗機構と境界条件を分ける

<a id="ex-hpde24-b01"></a>

#### HPDE24-B01 三つの模型を同じ診断表で比較する

- Level: B

次の各模型について、(i) 局所normally hyperbolicな $P=-\Box_g$ を持つか、(ii) 境界なし大域双曲時空用の定理をそのまま適用できるか、(iii) その判定を示す曲線または具体計算、を述べよ。

1. $\mathbb R^2$ に $g=-dt^2+e^{2\alpha t}dx^2$（$\alpha>0$）。
2. $\mathbb R^{1,1}\setminus\{(0,0)\}$ に平坦計量。
3. $\mathbb R\times(0,\infty)$ に平坦計量（境界条件は指定しない）。

<!-- solution-start -->
**詳細解答**。三つとも滑らかなLorentz計量の逆を最高階係数とするので (i) は「はい」です。(ii) と (iii) は次のように異なります。

| 模型 | 定理の直接適用 | 判定の根拠 |
| --- | --- | --- |
| 膨張模型 | 可能 | $d\eta=e^{-\alpha t}dt$ の下で $|dx/d\eta|\le1$。有限 $t$ 端で非延長曲線は止まれず、各 $t=c$ はCauchy面 |
| 点除去 | 不可 | $z_k=(0,1/k)$ は $p=(-1,0)$ と $q=(1,0)$ のダイヤモンド内にあるが、極限 $o$ は時空外 |
| 開半空間 | 不可 | $x=0$ に有限時刻で達する曲線は内部では非延長で、$t=0$ を通らずに壁から入る波がある |

膨張模型では[時間依存模型のCauchy性](#prop-hpde24-expanding-cauchy)を使って大域双曲性を確認します。点除去は[因果ダイヤモンドの反例](#prop-hpde24-puncture)、半空間は[零データ非一意性](#prop-hpde24-boundary-nonunique)が具体的な障害です。「二階主シンボルが同じ」という (i) の情報だけでは (ii) は判定できません。
<!-- solution-end -->

<a id="ex-hpde24-b02"></a>

#### HPDE24-B02 壁から入る滑らかな波

- Level: B

$M_+=\mathbb R\times(0,\infty)$、$P=\partial_t^2-\partial_x^2$ とする。零でない $F\in C_c^\infty((1,2))$ を使って $u(t,x)=F(t-x)$ を定める。(i) $Pu=0$、(ii) $t=0$ の変位・速度が零、(iii) 将来には非零、(iv) 斉次Dirichlet・Neumann条件のいずれを一般には満たさない、をそれぞれ計算して示せ。

<!-- solution-start -->
**詳細解答**。合成微分より $u_{tt}=F''(t-x)$、$u_{xx}=F''(t-x)$ なので $Pu=0$ です。$x>0$ に対し $-x<0$ だから $u(0,x)=F(-x)=0$、$u_t(0,x)=F'(-x)=0$ です。

零でない点 $s_0\in(1,2)$ を $F(s_0)\ne0$ となるよう選び、任意の $x>0$ について $t=x+s_0$ とすれば $u(t,x)=F(s_0)\ne0$ です。壁では

$$
u(t,0)=F(t),\qquad u_x(t,0)=-F'(t).
$$

Dirichletなら $F\equiv0$ が必要になり仮定に反します。また $F'\equiv0$ なら $F$ は定数であり、コンパクト支持かつ非零とは両立しません。従ってNeumannにも適合しません。初期データが零でも壁からの入力が未指定なら一意に決まらないことを、滑らかな解で確かめました。
<!-- solution-end -->

<a id="ex-hpde24-b03"></a>

#### HPDE24-B03 像の方法と反射の到着時刻

- Level: B

半直線の源位置 $y>0$、観測点 $x>0$ に対して

$$
K_D=\tfrac12\{H(t-s-|x-y|)-H(t-s-x-y)\},
$$

$$
K_N=\tfrac12\{H(t-s-|x-y|)+H(t-s-x-y)\}
$$

とする。境界条件、内部の点源方程式、直接波が届く時間と反射波が届く時間を検査せよ。$|x-y|<t-s<x+y$ と $t-s>x+y$ での値も求めよ。

<!-- solution-start -->
**詳細解答**。直接波の到着条件は $t-s\ge|x-y|$、鏡像波は $t-s\ge x+y$ です。$x+y\ge|x-y|$ なので反射波は直接波より早く届きません。全平面の核を空間位置 $y$ と $-y$ にそれぞれ平行移動した表示であるため、内部で $P K_{D/N}=\delta(t-s)\delta(x-y)$ です。鏡像源 $-y$ は内部にありません。

壁 $x=0$ では両項の引数の絶対値が共に $y$ なので $K_D=0$ です。$K_N$ の空間微分は、偶関数 $K_0(\tau,z)$ の奇導関数が $z=-y,y$ で相殺するので零です。

直接波だけが届いた $|x-y|<t-s<x+y$ では $K_D=K_N=1/2$ です。反射も届いた $t-s>x+y$ では $K_D=(1-1)/2=0$、$K_N=(1+1)/2=1$ です。Dirichletの反射は符号が逆、Neumannの反射は同符号であることが核の値に表れます。
<!-- solution-end -->

<a id="ex-hpde24-b04"></a>

#### HPDE24-B04 シンプレクティック流束と混合条件

- Level: B

$u,v$ は半直線上の滑らかな波動方程式の解で、任意の有限時間帯で空間コンパクト支持とする。$\Omega_t=\int_0^\infty(uv_t-vu_t)dx$ について時間変化を求めよ。両解がDirichlet、両解がNeumannの各場合には保存することを示せ。一方、$u$ だけDirichlet、$v$ だけNeumannという条件から保存を推論できるか検討せよ。

<!-- solution-start -->
**詳細解答**。積を時間微分して $u_tv_t-v_tu_t=0$ と相殺し、波動方程式 $v_{tt}=v_{xx}$、$u_{tt}=u_{xx}$ を代入します。

$$
\begin{aligned}
\frac d{dt}\Omega_t
&=\int_0^\infty(uv_{xx}-vu_{xx})dx\\
&=\int_0^\infty\partial_x(uv_x-vu_x)dx\\
&=-\left[uv_x-vu_x\right]_{x=0}.
\end{aligned}
$$

Dirichletを共に満たせば $u=v=0$、Neumannを共に満たせば $u_x=v_x=0$ が壁で成立し、右辺は零です。異なる条件の場合、$u(t,0)=0$、$v_x(t,0)=0$ だけでは壁の括弧は $-v(t,0)u_x(t,0)$ となります。

実際、$F,G\in C_c^\infty(\mathbb R)$ に対し

$$
u(t,x)=F(t-x)-F(t+x),\qquad v(t,x)=G(t-x)+G(t+x)
$$

と置けば、どちらも波動方程式の解で、有限時間帯ごとに空間コンパクト支持です。境界では $u(t,0)=0$、$v_x(t,0)=0$ である一方、$u_x(t,0)=-2F'(t)$、$v(t,0)=2G(t)$ なので

$$
\frac{d}{dt}\Omega_t(u,v)=-4G(t)F'(t).
$$

$G(t)F'(t)$ が零でない箇所を持つように選べます。従って条件の混在だけから面積分の保存は導けません。保存される解空間を一緒に選ぶ必要があります。
<!-- solution-end -->

### Level C：幾何・Green・保存形式を接続する

<a id="ex-hpde24-c01"></a>

#### HPDE24-C01 半直線のGreen問題を一から組み立てる

- Level: C

$\overline M_+=\mathbb R\times[0,\infty)$、$P=\partial_t^2-\partial_x^2$ とする。$f\in C_c^\infty(\mathbb R\times(0,\infty),\mathbb R)$ は壁から離れた滑らかな源とする。次を順に示せ。

1. 開半空間で $t=0$ の初期データだけでは一意性がない理由を、実際の零データ斉次解で示せ。
2. 全平面遅延核 $K_0$ を使い、斉次Dirichlet条件を持つ $G_Df$ と斉次Neumann条件を持つ $G_Nf$ をそれぞれ積分式で構成し、両者に共通な内部方程式と異なる境界条件を検算せよ。
3. 壁まで滑らかで、有限時間帯に空間コンパクト支持を持つ二つの斉次解 $u,v$ が**同じ**Dirichlet条件、または**同じ**Neumann条件を満たすとき、$\Omega_t(u,v)$ が保存することを導け。
4. これらの事実が、境界なし大域双曲時空のGreen一意性・実KGシンプレクティック定理を半直線に無条件で引用できることを意味しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

**1.** 非零 $F\in C_c^\infty((1,2))$ を取り $u(t,x)=F(t-x)$ とします。$u_{tt}=F''(t-x)=u_{xx}$、また $x>0$ で $F(-x)=F'(-x)=0$ なので $u|_{t=0}=u_t|_{t=0}=0$ です。$t-x\in(1,2)$ で $F$ が非零になる場所があり、零解とは異なります。壁での値は $F(t)$ です。

**2.** $K_0(\tau,z)=\frac12H(\tau-|z|)$ とし、二つの核を

$$
K_D=K_0(t-s,x-y)-K_0(t-s,x+y),
$$

$$
K_N=K_0(t-s,x-y)+K_0(t-s,x+y)
$$

と定義します。それぞれ $s\in\mathbb R$、$y>0$ に関してソース $f(s,y)$ を掛けて積分したものを $G_Df,G_Nf$ とします。

[平坦点源方程式](#prop-hpde24-flat-kernel)を質量零で使うと、各核の第一項は内部の点源 $\delta(t-s)\delta(x-y)$ を作ります。一方、鏡像項の点源は $x=-y$ に置かれます。積分領域では $x,y>0$ なので鏡像点源は寄与しません。従って

$$
P(G_Df)=f,\qquad P(G_Nf)=f
$$

です。両核ともソース時刻より前では零なので、時間的には遅延解です。

最後に $K_0(\tau,z)$ は空間変数について偶関数です。このため壁では差を取る二項の値が等しくなり、Dirichlet核は零です。空間微分は奇関数なので、和を取るNeumann核の壁での法線微分は零です。これをソースと積分すれば、それぞれ指定した境界条件を満たします。

**3.** 斉次方程式を $u_{tt}=u_{xx}$、$v_{tt}=v_{xx}$ と書き、積の微分・相殺・空間積分の順で

$$
\begin{aligned}
\frac d{dt}\Omega_t
&=\int_0^\infty(uv_{tt}-vu_{tt})dx\\
&=\int_0^\infty(uv_{xx}-vu_{xx})dx\\
&=\left[uv_x-vu_x\right]_{\infty}
-\left[uv_x-vu_x\right]_0.
\end{aligned}
$$

有限時間帯での空間コンパクト支持により無限遠の項は零です。共通Dirichlet条件なら $u=v=0$、共通Neumann条件なら $u_x=v_x=0$ が壁で成立するため、壁の項も零です。したがって $\Omega_t$ は一定です。

**4.** (1) は初期データだけで解を決められないことを示します。(2) は**異なる境界条件に対して異なる**Green核が実際に存在することを示します。(3) は保存則が壁の流束を消す追加条件に依存することを示します。境界なしの場合の[Green一意性](../HPDE19/index.md#thm-hpde19-uniqueness)と[面積分の保存](../HPDE23/index.md#thm-hpde23-slice-independence)には、境界のない大域双曲時空という前提があります。半直線ではその仮定を満たさないため、これらの結論が必要なら境界条件とそのエネルギー・支持評価を別に証明しなければなりません。上記模型ではその違いを具体式で示せました。
<!-- solution-end -->

## 10. まとめ：何が壊れ、何が残るか

平坦massless・massiveの比較では全時空の大域双曲性を保ったまま核のtailが変わりました。時間依存計量では静的性を失ってもCauchy性は保たれました。点除去では局所双曲性がそのままなのに因果ダイヤモンドのコンパクト性が失われ、分布解は穴に隠れた源を検知できなくなります。時間的境界では初期データだけで滑らかな解が一意に決まらず、境界条件の選択でGreen核とシンプレクティック流束の扱いが変わりました。

以上から、古典的な因果伝播子・解空間・保存形式は、後続の量子場理論へ渡せる確かな出発点です。ただしその保証範囲は**仮定付き**です。AQFTでは代数と状態、MICAでは二点関数の微局所的条件を、ここで構成した古典的データの上に改めて積み上げます。
