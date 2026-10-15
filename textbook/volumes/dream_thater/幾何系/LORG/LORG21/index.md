# LORG21 時空模型の総合演習とHPDE接続

<!-- definition-example-audit: strict -->

## 1. 局所的に同じ光円錐なのに、何が違うのか

これまでに、[因果的未来・過去](../LORG6/index.md#def-lorg6-chronological-causal-future)、[依存領域](../LORG13/index.md#def-lorg13-dependence)、[大域双曲性](../LORG16/index.md#def-lorg16-global-hyperbolicity)、[時間分離](../LORG17/index.md#def-lorg17-time-separation)、[Cauchy temporal function](../LORG20/index.md#def-lorg20-cauchy-temporal)を別々に学びました。しかし、それらを同じ模型へ一度に適用すると、見落としがちな違いが現れます。

特に「どの点にもMinkowski型の光円錐がある」だけでは、初期値を置ける面の存在も、長さ最大化曲線の存在も保証されません。空間を周期化した場合、点を一つ除いた場合、**時間を周期化した場合**を比較すると、局所計量と大域因果構造の役割が分かれます。

本講では次の四模型を計算し、最後にHPDE（Lorentz時空上の双曲型偏微分方程式）へ渡す幾何学的入力を整理します。

- 全Minkowski平面：局所と大域の基準。
- **空間**を円周にした静的積：空間に周回路があっても大域双曲性は保てる。
- 原点を除いたMinkowski平面：因果的な逃避路ができる。
- **時間**を円周にした商：閉時間的曲線ができる。

共通の計量符号は $(-,+)$、未来向きは時刻の増加方向です。曲線には区分的 $C^1$ の未来向き因果曲線と局所Lipschitzの極限を許します。$I^+(p)$ は未来時間的曲線による到達、$J^+(p)$ は定数曲線を含む未来因果曲線による到達です。依存領域は**すべての**片側非延長因果曲線を量化します。時間分離の値は $+\infty$ も許します。

## 2. 基準模型：Minkowski平面

$M_0=\mathbb R^2$、$g_0=-dt^2+dx^2$ とし、$p=(t_0,x_0)$、$q=(t_1,x_1)$、$\Delta t=t_1-t_0$、$\Delta x=x_1-x_0$ と置きます。曲線の速度条件から $dt\ge |dx|$ です。時間的曲線には厳密不等式が成り立ちます。

[Minkowskiの到達条件](../LORG6/index.md#thm-lorg6-minkowski-futures)と[時間分離の公式](../LORG17/index.md#thm-lorg17-minkowski-formula)をこの記号へ代入すると、

$$
q\in I^+(p)\ \Longleftrightarrow\ \Delta t>|\Delta x|,
\qquad
q\in J^+(p)\ \Longleftrightarrow\ \Delta t\ge|\Delta x|,
$$

$$
d_0(p,q)=
\begin{cases}
\sqrt{(\Delta t)^2-(\Delta x)^2},&\Delta t\ge|\Delta x|,\\
0,&\text{それ以外}
\end{cases}
$$

です。$p=q$ の場合の時間分離も $0$ です。因果関係がある二点では直線 $\gamma(s)=p+s(q-p)$（$0\le s\le1$）が上限を実現します。その理由は、[端点長さ不等式](../LORG3/index.md#thm-lorg3-minkowski-length-bound)が任意の競合因果曲線の長さを上式で抑え、直線に沿う積分がその値に等しいからです。

初期区間 $S_a=\{(0,x):|x|\le a\}$（$a>0$）を取ると、時刻 $T>0$ の点 $(T,X)$ を終点とする過去非延長因果曲線が時刻零で通り得る位置は閉区間 $[X-T,X+T]$ の**全点**です。[依存領域公式](../LORG13/index.md#thm-lorg13-domain-formula)から、

$$
D^+_{M_0}(S_a)=\{(t,x):t\ge0,\ t+|x|\le a\},
$$

$$
D_{M_0}(S_a)=\{(t,x):|t|+|x|\le a\}
$$

を得ます。斜辺・頂点を含むのは、光的曲線も検査し、$S_a$ に端点が含まれるためです。

一方、$S_0=\{t=0\}$ 全体については[全時刻通過補題](../LORG15/index.md#lem-lorg15-full-time)によってすべての両側非延長因果曲線がただ一度交わります。よって $S_0$ は[Cauchy超曲面](../LORG15/index.md#def-lorg15-cauchy)で、$D_{M_0}(S_0)=M_0$ です。[大域双曲性の特徴付け](../LORG16/index.md#thm-lorg16-characterization)により大域双曲的です。

ここでは、有限区間の $D(S_a)$ が小さいことと、**時空そのものが大域双曲的であること**を混同しません。

## 3. 静的積：空間を円周にしても時間は戻らない

時空を $M_{\mathrm s}=\mathbb R_t\times S^1_\theta$、計量を

$$
g_{\mathrm s}=-dt^2+a^2\,d\theta^2,\qquad a>0,\quad\theta\in\mathbb R/(2\pi\mathbb Z)
$$

とします。$d\theta$ は円周上の局所角度表示の微分であり、計量は角度の代表元を変えても一致します。円周の二点 $\theta_0,\theta_1$ の**空間的な最短弧長**を

$$
\delta(\theta_0,\theta_1)
=a\min_{k\in\mathbb Z}|\theta_1-\theta_0+2\pi k|
\quad(0\le\delta\le\pi a)
$$

と置きます。最短距離の定義は空間計量 $a^2d\theta^2$ に関するもので、Lorentz時間分離とは別物です。

<a id="prop-lorg21-static-cylinder"></a>

<!-- formal-statement-start -->
> **命題（空間周期の静的積の因果構造）**  
> 上記の時間向き付き静的積 $(M_{\mathrm s},g_{\mathrm s})$ で $p=(t_0,\theta_0)$、$q=(t_1,\theta_1)$ とし、$\Delta t=t_1-t_0$、$\delta=\delta(\theta_0,\theta_1)$ とする。このとき
>
> 1. $q\in I^+(p)$ と $\Delta t>\delta$ は同値、$q\in J^+(p)$ と $\Delta t\ge\delta$ は同値である。
> 2. $\Delta t\ge\delta$ のとき $d_{\mathrm s}(p,q)=\sqrt{(\Delta t)^2-\delta^2}$ であり、それ以外は $0$ である。因果的な二点間では最短空間弧に沿う曲線がこの値を達成する。
> 3. 各 $\{t=c\}$ はCauchy超曲面であり、その依存領域は時空全体である。この時空は大域双曲的である。
<!-- formal-statement-end -->

### 証明の見取り図

曲線を角度の実数代表へ持ち上げると、計量は $\mathbb R^{1,1}$ の $x=a\theta$ 座標での計量です。終点の角度代表をずらす整数 $k$ ごとに到達条件と長さを計算し、最も短い空間移動を選びます。非延長曲線の時刻が有限端点で止まれないことは、円周の距離に関する速度上界から証明します。

<!-- proof-start -->
### 証明

任意の未来因果曲線を $S^1$ の角度被覆 $\mathbb R\to S^1$ に沿って持ち上げ、終点の角度代表を $\theta_1+2\pi k$ とします。持ち上げた曲線では

$$
g_{\mathrm s}(\dot\gamma,\dot\gamma)
=-(\dot t)^2+a^2(\dot\theta)^2\le0,
\qquad \dot t\ge0.
$$

よって $a|\dot\theta|\le\dot t$ を積分すると、

$$
a|\theta_1-\theta_0+2\pi k|
\le\int a|\dot\theta|\,ds
\le\int\dot t\,ds=\Delta t.
$$

どの $k$ でもこの条件は必要です。逆に $\Delta t\ge\delta$ なら、$\delta$ を実現する整数 $k_*$ を取り、持ち上げた二端点を直線で結ぶと、$a|\Delta\theta+2\pi k_*|\le\Delta t$ なので未来因果曲線となります。$\Delta t>\delta$ ならその直線は時間的です。逆に時間的曲線の両端では厳密な速度不等式を積分できるので $\Delta t>\delta$ が必要です。

曲線の長さは[Minkowski端点長さ不等式](../LORG3/index.md#thm-lorg3-minkowski-length-bound)を各持ち上げに適用して

$$
L_g(\gamma)
\le\sqrt{(\Delta t)^2-a^2|\Delta\theta+2\pi k|^2}
\le\sqrt{(\Delta t)^2-\delta^2}
$$

と評価できます（各曲線が因果的なので根号内部は非負）。最短弧を一定速度で進む持ち上げ直線では、$t(s)=t_0+s\Delta t$、$\theta(s)=\theta_0+s(\Delta\theta+2\pi k_*)$ を代入すると、

$$
L_g(\gamma)=\int_0^1
\sqrt{(\Delta t)^2-a^2(\Delta\theta+2\pi k_*)^2}\,ds
=\sqrt{(\Delta t)^2-\delta^2}.
$$

これで時間分離と達成性が証明できました。

最後にCauchy性を調べます。非延長未来因果曲線を停止片を取り除いて $t$ でパラメータ化すると、任意の二時刻 $u<v$ について空間円周の弧長距離 $d_{S^1}$ は

$$
d_{S^1}(\theta(u),\theta(v))
\le\int_u^v a|\theta'(t)|\,dt
\le v-u
$$

を満たします。もし未来方向に $t\uparrow b<+\infty$ なら、$\theta(t)$ は完備な円周上でCauchyになり、$\theta(t)\to\theta_b$ です。点 $(b,\theta_b)$ は時空内にあり、そこで垂直な時間的曲線を接続できるため、非延長性に矛盾します。過去方向も同様で、時刻の値域は $\mathbb R$ です。しかも時刻は非定数未来因果曲線に沿って厳密増加するので、各面 $\{t=c\}$ をちょうど一度横切ります。[Cauchy面の定義](../LORG15/index.md#def-lorg15-cauchy)を満たし、[大域双曲性の特徴付け](../LORG16/index.md#thm-lorg16-characterization)から結論が従います。$\square$
<!-- proof-end -->

**定義の条件を模型で確認する**。$T=t$ は $dT=dt$、$\nabla^gT=-\partial_t$、$g(\nabla^gT,\nabla^gT)=-1$ です。上の証明が非延長曲線上で $T$ の値域を $\mathbb R$ と示したので、[Cauchy temporal functionの二条件](../LORG20/index.md#def-lorg20-cauchy-temporal)をともに満たします。空間方向に周回できても、時間が一周して戻るわけではありません。

**数値例**。$a=2$、$\theta_0=0$、$\theta_1=3\pi/2$ なら、角度差の候補は $3\pi/2$ と $-\pi/2$ などで、$\delta=2\cdot\pi/2=\pi$ です。$\Delta t=4$ なら $q\in I^+(p)$ で、$d_{\mathrm s}(p,q)=\sqrt{16-\pi^2}$ です。「角度差 $3\pi/2$ の方が短い」としてはいけません。

## 4. 点除去：局所的な時間はあっても穴へ曲線が逃げる

$M_*=\mathbb R^{1,1}\setminus\{o\}$、$o=(0,0)$、$g_*=-dt^2+dx^2$ とします。局所的にはMinkowski時空と全く同じです。また $t$ の勾配は過去時間的なので、[temporal functionからの安定因果性](../LORG10/index.md#thm-lorg10-temporal-implies-stable)により、この時空は安定因果的です。それでもCauchy面や因果ダイヤモンドのコンパクト性は保証されません。

ここでは $S_*=\{(0,x)\in M_*:x\ne0\}$ を初期集合に選びます。これは $M_*$ 内では閉じた、空間的で非時間的な集合です。値域を除去前の時空で考えず、常に $M_*$ の中で因果曲線の非延長性を判定する必要があります。

<a id="prop-lorg21-punctured-domain"></a>

<!-- formal-statement-start -->
> **命題（原点除去時空の全初期スライスの依存領域）**  
> 上記の $(M_*,g_*)$ と $S_*=\{(0,x)\in M_*:x\ne0\}$ に対し、
>
> $$
> D^+_{M_*}(S_*)=\{(t,x)\in M_*:t\ge0,\ |x|>t\},
> $$
>
> $$
> D^-_{M_*}(S_*)=\{(t,x)\in M_*:t\le0,\ |x|>-t\},
> $$
>
> $$
> D_{M_*}(S_*)=\{(t,x)\in M_*:|x|>|t|\}.
> $$
>
> 特に $D_{M_*}(S_*)\ne M_*$ であり、$S_*$ はCauchy超曲面ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$|x|\le|t|$ の錐内部・境界では、取り除いた原点に終わる（または原点から始まる）非延長因果曲線を構成します。錐外側では速度不等式によって原点への到達が不可能なので、全曲線が時刻零の非欠損点を通ります。

<!-- proof-start -->
### 証明

まず $t>0$、$|x|\le t$ の点 $p=(t,x)$ を取ります。曲線

$$
\gamma(u)=(u,(x/t)u),\qquad 0<u\le t
$$

は $|x/t|\le1$ により未来因果的です。$u\downarrow0$ では $\gamma(u)\to o$ ですが $o\notin M_*$ のため、$M_*$ 内では過去非延長です。しかも $\gamma$ は $S_*$ を一度も通りません。従って $p\notin D^+(S_*)$ です。等号 $|x|=t$ でも光的曲線が存在するので除外します。

次に $t>0$、$|x|>t$ の $p$ を取ります。過去非延長未来因果曲線は、時刻で表すと $1$-Lipschitzです。過去端の時刻 $b$ が有限なら、$x(u)$ は $u\downarrow b$ で極限を持ちます。

もしその極限点が $M_*$ にあれば曲線を延長でき、非延長性に反します。従って有限な過去端点は除去点 $o$ しかあり得ません。

しかし原点を端点とする場合、そこから $p$ まで速度不等式を積分すると $|x|\le t$ となり、仮定に反します。よって曲線は時刻零を横切ります。

その交点 $(0,y)$ は $M_*$ 内にあるので $y\ne0$ であり、初期集合 $S_*$ に属します。

$t=0$ に残る点はすべて $S_*$ 自身です。$t<0$ の点から過去へ延ばす垂直因果曲線は $S_*$ と交わらないため、未来依存領域には入りません。以上で $D^+$ の式が従います。時間を反転した同じ議論から $D^-$ を得て、和集合を取れば最後の式です。$\square$
<!-- proof-end -->

[依存領域の全称条件](../LORG13/index.md#def-lorg13-dependence)において、一本の**穴へ消える光線**を忘れると等号 $|x|=t$ を誤って含めてしまいます。

### 4.1 到達可能でも最大化曲線がない

$p=(-1,0)$、$q=(1,0)$ は点除去後も時間的に結べます。$0<\varepsilon<1$ について折れ線

$$
(-1,0)\longrightarrow(0,\varepsilon)\longrightarrow(1,0)
$$

は除去点を通らず、二本の時間的直線で構成されます。長さは

$$
L(\gamma_\varepsilon)
=\sqrt{1-\varepsilon^2}+\sqrt{1-\varepsilon^2}
=2\sqrt{1-\varepsilon^2}\longrightarrow2.
$$

他方、[Minkowski時空における端点とLorentz長さの定理](../LORG3/index.md#thm-lorg3-minkowski-length-bound)を除去前の平面で適用すると、どの因果曲線の長さも $2$ 以下です。よって $d_*(p,q)=2$ ですが、等号を達成するには $\Delta x=0$ の垂直直線でなければなりません。その直線は $o$ を通るので $M_*$ には存在しません。すなわち最大化曲線は**存在しません**。大域双曲性の下で最大化曲線を保証する[Avez–Seifert定理](../LORG18/index.md#thm-lorg18-avez-seifert)の仮定が必要になる箇所です。

因果単純性も失われます。$p'=(-1,-1)$、$q'=(1,1)$ は光的に離れていますが、唯一の未来因果経路は原点を通る直線なので $q'\notin J^+_{M_*}(p')$ です。一方 $q'_k=(1,1-1/k)$（$k\ge1$）は $\Delta t=2>|\Delta x|=2-1/k$ を満たし、原点を避ける微小な時間的迂回路を取れるので $q'_k\in I^+_{M_*}(p')$ です。$q'_k\to q'$ が $M_*$ 内で成立するため、$J^+(p')$ は閉ではありません。[因果単純性の定義](../LORG11/index.md#def-lorg11-causal-simplicity)に反します。

さらに $r=(-1,0)$、$s=(1,0)$ の因果ダイヤモンド $J^+(r)\cap J^-(s)$ には $(0,1/k)$（$k\ge2$）が含まれますが、これらの唯一の極限点は除去された $o$ です。従ってダイヤモンドは $M_*$ 内でコンパクトではなく、[大域双曲性](../LORG16/index.md#def-lorg16-global-hyperbolicity)を満たしません。**落としたのは曲線の極限を時空内へ閉じ込める条件**であり、そのために最大化の極限が欠落するのです。

## 5. 時間周期商：光円錐が同じでも時計が作れない

今度は $P>0$ とし、時間座標だけを $P$ ごとに同一視して

$$
M_{\mathrm t}=(\mathbb R_t/P\mathbb Z)\times\mathbb R_x,
\qquad g_{\mathrm t}=-dt^2+dx^2
$$

とします。$t$ 自体は大域的な実数値関数ではありませんが、局所的な $dt$ と計量は貼り合わさり、$\partial_t$ が滑らかな未来時間的ベクトル場として定まります。**空間周期の模型との相違は、周期を持たせた座標が時間であること**です。

<a id="prop-lorg21-time-periodic"></a>

<!-- formal-statement-start -->
> **命題（時間周期商の全域時間的未来）**  
> 上記の時間向き付き時空 $(M_{\mathrm t},g_{\mathrm t})$ について任意の $p,q\in M_{\mathrm t}$ は $p\ll q$ を満たす。従ってすべての $p$ で
>
> $$
> I^+(p)=J^+(p)=M_{\mathrm t},\qquad d_{\mathrm t}(p,q)=+\infty.
> $$
>
> 非空のachronal集合、Cauchy超曲面、時間関数はいずれも存在しない。一方、$S=\{([t],x):[t]=[0]\}$ と置けば、$D^+(S)=D^-(S)=M_{\mathrm t}$ が成立するが、この $S$ はCauchy面ではない。
<!-- formal-statement-end -->

### 証明の見取り図

被覆空間で終点の時刻を $kP$ だけ未来へ持ち上げると、どの有限空間変位よりも長い時間差を作れます。時刻周回を増やせば固有時も際限なく伸びます。閉時間的曲線があるので時間関数の厳密単調性と矛盾します。

<!-- proof-start -->
### 証明

$p,q$ の代表を $(t_p,x_p)$、$(t_q,x_q)$ と取り、$k$ を十分大きい整数として

$$
\Delta t_k=t_q-t_p+kP>|x_q-x_p|
$$

を満たすようにします。被覆平面で $(t_p,x_p)$ と $(t_q+kP,x_q)$ を結ぶ直線は未来時間的です。それを商へ射影すると $p$ から $q$ への未来時間的曲線となるので、任意の $p,q$ に対して $p\ll q$ です。$p=q$ の場合も時刻を一周する非定数の閉時間的曲線が作れます。よって $I^+(p)=M_{\mathrm t}$ であり、$I^+(p)\subset J^+(p)\subset M_{\mathrm t}$ から $J^+(p)=M_{\mathrm t}$ です。

この直線のLorentz長さは

$$
L_k=\sqrt{(\Delta t_k)^2-(x_q-x_p)^2}.
$$

$k\to+\infty$ によって $\Delta t_k\to+\infty$、従って $L_k\to+\infty$ です。時間分離は因果曲線の長さの上限なので $d_{\mathrm t}(p,q)=+\infty$ となります。

[achronal集合の定義](../LORG12/index.md#def-lorg12-achronal-acausal)では集合のどの点もその集合の時間的未来に入ってはいけません。しかし各 $p$ で $p\ll p$ なので、非空集合はすべてachronalではありません。またCauchy超曲面はachronalであるという[既習の性質](../LORG15/index.md#prop-lorg15-acausal)に反するため存在しません。最後に時間関数 $T$ が存在すれば、閉時間的曲線 $\gamma$ に沿う厳密増加から $T(\gamma(1))>T(\gamma(0))$ が必要ですが、$\gamma(1)=\gamma(0)$ なので矛盾です。

$S=\{([t],x):[t]=[0]\}$ の依存領域も直接検算します。任意の過去非延長未来因果曲線を被覆の時刻 $t$ へ持ち上げると、速度評価 $|dx/dt|\le1$ が成り立ちます。

過去端で持ち上げた時刻が有限値 $b$ に収束すると仮定します。すると空間座標 $x(t)$ はCauchyとなり、有限極限 $x_b$ を持ちます。商の中の点 $([b],x_b)$ に曲線を延長でき、過去非延長性に反します。

従って持ち上げた時刻は過去へ $-\infty$ まで走り、必ず整数倍の時刻 $kP$（$k\in\mathbb Z$）を通ります。射影曲線はそこで $S$ と交わるため、任意の終点について依存領域の全称条件が成立します。

未来非延長曲線にも $t\to+\infty$ として同じ速度評価を適用します。よって $D^+(S)=D^-(S)=M_{\mathrm t}$ です。これは交差の**存在**に関する結論で、同じ曲線が $S$ を何度も通るためCauchy性の一意交差とは両立しません。$\square$
<!-- proof-end -->

$S=\{[t]=[0]\}$ を「初期時刻面」と呼んでも、閉時間的曲線はこの集合を何度も横切ります。Cauchy面の**一度だけ交わる**条件に反し、さらに $S$ はachronalでさえありません。従ってCauchy面に基づく初期値問題をここで立てられると早合点してはいけません。依存領域の定義自体は任意集合に適用できますが、[依存領域の定義](../LORG13/index.md#def-lorg13-dependence)と初期データに適切なachronal面の存在とは別問題です。実際、この時空では空集合以外のachronal集合がなく、非空のachronalな初期集合に基づくCauchy問題を立てられません。対照的に直前で計算した $D(S)=M_{\mathrm t}$ は、**集合との交差を一度は保証することと、初期値を置く面が存在することは別**であると示します。

## 6. 四模型の比較とHPDEへの入力

| 時空 | 因果階層・ダイヤモンド | 時間分離 | 初期面の幾何 |
| --- | --- | --- | --- |
| Minkowski平面 | 大域双曲的 | 有限、直線で達成 | $\{t=0\}$ はCauchy、$D=M_0$ |
| 空間周期の静的積 | 大域双曲的 | $\sqrt{(\Delta t)^2-\delta^2}$（因果的二点） | $\{t=0\}$ はCauchy、$D=M_{\mathrm s}$ |
| 原点除去Minkowski | 安定因果的、非因果単純・非大域双曲的 | 特定の二点で上限非達成 | $S_*$ はCauchyでなく、$D(S_*)=\{|x|>|t|\}$ |
| 時間周期商 | 閉時間的曲線あり、chronology不成立 | 任意の二点で $+\infty$ | 周期スライスの $D(S)=M_{\mathrm t}$、ただしachronalでなくCauchy面ではない |

[滑らかな時空分割](../LORG20/index.md#thm-lorg20-orthogonal-splitting)によれば、大域双曲的な時空では滑らかなCauchy temporal function $T$ を選び、

$$
g=-\beta(T,y)\,dT^2+h_T(y),\qquad \beta>0
$$

と表せます。ここで $h_T$ は各時刻面上で正定値な誘導計量です。[単位法線の命題](../LORG20/index.md#prop-lorg20-unit-normal)で得る未来向き法線 $N$ と、時間的勾配からの $dT$ は、面に垂直な時間方向を指定します。

このデータが後続HPDEで必要になる理由を、静的積の具体式から確かめます。$T=t$、$g_{\mathrm s}=-dt^2+a^2d\theta^2$ では

$$
(g_{\mu\nu})=
\begin{pmatrix}-1&0\\0&a^2\end{pmatrix},
\qquad
(g^{\mu\nu})=
\begin{pmatrix}-1&0\\0&a^{-2}\end{pmatrix}.
$$

行列積が単位行列になることを各対角成分 $(-1)(-1)=1$、$a^2 a^{-2}=1$ で確認すると、時間方向の共変ベクトル $dt$ と空間方向の $d\theta$ に対する二次形式は

$$
g^{-1}(\tau\,dt+\kappa\,d\theta,\,
\tau\,dt+\kappa\,d\theta)
=-\tau^2+a^{-2}\kappa^2.
$$

その零条件は $\tau^2=a^{-2}\kappa^2$ です。一方、元の計量での未来光的速度は $dt>0$ かつ $|a\,d\theta/dt|=1$ です。前者は**余接空間での零方向**、後者は**接空間での零方向**であり、計量と逆計量で対応しています。零方向の計算を、いきなり偏微分方程式の解の存在証明と取り違えないことが大切です。

HPDEに渡す主な入力は次の三つです。

1. **空間的Cauchy面と時間分割**：初期値を与える面が滑らかで、各非延長因果曲線と一度交わること。[Bernal–SánchezのCauchy temporal function存在定理](../LORG20/index.md#thm-lorg20-bernal-sanchez)を使う場合は大域双曲性が仮定です。
2. **因果集合と支持領域**：$J^+(K)$、$J^-(K)$ がどの初期領域からの影響を幾何学的に許すか。ダイヤモンドのコンパクト性は大域的な制御に関係します。
3. **時空計量と法線**：$g^{-1}$、$N$、$h_T$ によって時間微分と空間微分を分けるための座標・幾何学的基盤。

ここから双曲型作用素の定義、エネルギー評価、解の一意性・存在、有限伝播速度、遅延・先進Green作用素を証明するのは**HPDEの責務**です。LORGの因果定理だけから、それらの解析的結論は出てきません。

## 7. 総合演習と詳細解答

以下では、区分の境界、非延長曲線の量化、被覆への持ち上げ、上限と達成の区別を手で再構成します。

<a id="ex-lorg21-a01"></a>
### LORG21-A01 Minkowskiの到達と時間分離
- Level: A

$g=-dt^2+dx^2$ の平面で $p=(0,0)$ と $q_1=(5,3)$、$q_2=(3,3)$、$q_3=(2,3)$ を考える。各 $q_i$ が $I^+(p)$、$J^+(p)$ のどちらに属するかと、時間分離を求めよ。

<!-- solution-start -->
**詳細解答**。[Minkowski到達条件](../LORG6/index.md#thm-lorg6-minkowski-futures)の $\Delta t$ と $|\Delta x|$ を順に比較します。

$q_1$ では $5>3$ なので $I^+(p)$ に属し、従って $J^+(p)$ にも属します。[時間分離公式](../LORG17/index.md#thm-lorg17-minkowski-formula)から $d(p,q_1)=\sqrt{5^2-3^2}=4$ です。

$q_2$ では $3=3$ なので $J^+(p)$ に属しますが $I^+(p)$ には属さず、$d(p,q_2)=0$ です。

$q_3$ は $2<3$ なのでどちらにも属さず、時間分離の定義上 $d(p,q_3)=0$ です。**時間分離が零でも因果的に到達できる場合がある**のは $q_2$ です。
<!-- solution-end -->

<a id="ex-lorg21-a02"></a>
### LORG21-A02 閉初期区間の依存領域
- Level: A

$S=\{(0,x):|x|\le3\}$ に対して、$(1,2)$、$(2,2)$、$(3,0)$ が $D^+(S)$ に属するか判定せよ。境界の光的曲線を含めて説明せよ。

<!-- solution-start -->
**詳細解答**。[依存領域公式](../LORG13/index.md#thm-lorg13-domain-formula)で $t\ge0$ の必要十分条件は、可能な時刻零での交点区間 $[x-t,x+t]$ が $[-3,3]$ に含まれることです。

$(1,2)$ では $[1,3]\subset[-3,3]$ なので属します。$(2,2)$ では交点候補が $[0,4]$ となり、$4$ が $S$ に属さないため入りません。実際、$(0,4)$ から $(2,2)$ へ向かう未来光線が初期集合を避けます。

$(3,0)$ の交点区間は $[-3,3]$ と一致し、両端は $S$ に含まれるので属します。この点はダイヤモンドの頂点ですが排除されません。
<!-- solution-end -->

<a id="ex-lorg21-a03"></a>
### LORG21-A03 空間円周の短い方の弧
- Level: A

静的積で $a=1$、$\theta_0=0$、$\theta_1=3\pi/2$、$\Delta t=2$ とする。$\delta$、因果型、時間分離を求めよ。

<!-- solution-start -->
**詳細解答**。角度代表の差を $3\pi/2+2\pi k$ として絶対値を最小化します。$k=-1$ のとき $|-\pi/2|=\pi/2$、$k=0$ では $3\pi/2$、それ以外はさらに大きいので $\delta=\pi/2$ です。$2>\pi/2$ より時間的に到達でき、[静的積の命題](#prop-lorg21-static-cylinder)から

$$
d(p,q)=\sqrt{2^2-(\pi/2)^2}
=\sqrt{4-\pi^2/4}.
$$

短い方の弧を逆向きに進む直線の射影が最大化曲線です。
<!-- solution-end -->

<a id="ex-lorg21-a04"></a>
### LORG21-A04 点除去と光的境界
- Level: A

$M_*=\mathbb R^{1,1}\setminus\{o\}$ と $S_*=\{(0,x):x\ne0\}$ に対し、$(1,2)$、$(1,1)$、$(1,1/2)$ が $D^+(S_*)$ に属するか、それぞれ原点との因果関係から確かめよ。

<!-- solution-start -->
**詳細解答**。[点除去の依存領域命題](#prop-lorg21-punctured-domain)は $t\ge0$ と $|x|>t$ を要求します。$(1,2)$ では $2>1$ で属します。$(1,1)$ では $|x|=t$ で属しません。実際 $\gamma(u)=(u,u)$（$0<u\le1$）は穴から来る過去非延長光的曲線です。$(1,1/2)$ でも $|x|<t$ で属さず、$\gamma(u)=(u,u/2)$ が時間的な反例曲線です。境界を含めて除外する理由は、光的曲線を量化から外せないためです。
<!-- solution-end -->

<a id="ex-lorg21-a05"></a>
### LORG21-A05 時間周期と閉時間的曲線
- Level: A

$P=3$ の時間周期商で $p=([0],0)$ とする。$p$ から自身への未来時間的曲線を一本示し、連続時間関数が存在しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。被覆平面の $\gamma(u)=(3u,0)$（$0\le u\le1$）を商へ射影します。速度は $(3,0)$ で $g(\dot\gamma,\dot\gamma)=-9<0$、時刻成分は正なので未来時間的です。商では $\gamma(0)=\gamma(1)=p$ です。[時間関数の定義](../LORG10/index.md#def-lorg10-time-function)を満たす $T$ があれば、この曲線に沿って $T(p)=T(\gamma(0))<T(\gamma(1))=T(p)$ となり矛盾します。
<!-- solution-end -->

<a id="ex-lorg21-b01"></a>
### LORG21-B01 被覆で二通りの最短弧を探す
- Level: B

$a=1$ の静的積で $p=(0,[0])$、$q=(4,[\pi])$ とする。持ち上げの角度代表を指定する整数 $k\in\mathbb Z$ から時間分離を計算し、最大化曲線が少なくとも二本ある理由を説明せよ。

<!-- solution-start -->
**詳細解答**。終点角度の持ち上げは $\pi+2\pi k$ です。最短の絶対値は $k=0$ で $\pi$、$k=-1$ で $-\pi$ に対応します。従って $\delta=\pi$、$\Delta t=4>\pi$ です。[静的積の命題](#prop-lorg21-static-cylinder)により

$$
d(p,q)=\sqrt{16-\pi^2}.
$$

二本の持ち上げ直線は $\theta_+(s)=\pi s$ と $\theta_-(s)=-\pi s$、時刻はいずれも $t(s)=4s$ です。両方とも $g(\dot\gamma,\dot\gamma)=-16+\pi^2<0$ を満たし、長さはともに $\sqrt{16-\pi^2}$ です。角度の中間点は $[\pi/2]$ と $[-\pi/2]$ で異なるので、射影後の二曲線も異なります。**最大化曲線の存在と一意性は別**です。
<!-- solution-end -->

<a id="ex-lorg21-b02"></a>
### LORG21-B02 最大値を取らない時間分離
- Level: B

点除去時空の $p=(-1,0)$ と $q=(1,0)$ について、長さが $2$ に近づく曲線列を示し、$2$ を実現する曲線が存在しないことを端点長さ不等式の等号条件から証明せよ。

<!-- solution-start -->
**詳細解答**。$0<\varepsilon<1$ として $p\to(0,\varepsilon)\to q$ と折れます。各片の時間差は $1$、空間差の絶対値は $\varepsilon$ なので未来時間的です。長さは

$$
L_\varepsilon=2\sqrt{1-\varepsilon^2}\longrightarrow2
$$

です。

競合曲線を除去前のMinkowski平面内でも因果曲線とみなし、[Minkowski時空における端点とLorentz長さの定理](../LORG3/index.md#thm-lorg3-minkowski-length-bound)を適用します。任意の競合因果曲線の長さは

$$
\sqrt{(2)^2-(0)^2}=2
$$

以下なので、時間分離は $2$ です。

同不等式の等号成立は接速度がほとんど至る所で同じ未来向き時間的方向に比例する場合に限ります。今回の端点では $x=0$ の垂直直線だけが該当します。その直線は除去点 $(0,0)$ を通り、時空内には存在しません。従って上限は達成されません。
<!-- solution-end -->

<a id="ex-lorg21-b03"></a>
### LORG21-B03 因果単純性の失敗を列で見る
- Level: B

$M_*$ で $p=(-1,-1)$、$q=(1,1)$、$q_k=(1,1-1/k)$ とする。$q_k\in I^+(p)$ であること、$q\notin J^+(p)$ であることを別々に示し、どの因果条件が破れるか結論せよ。

<!-- solution-start -->
**詳細解答**。$p$ から $q_k$ までの時間差は $2$、空間差は $2-1/k$ なので $2>2-1/k$ です。元の平面では時間的直線があり、それが原点を通る場合も時間的条件は開いた不等式なので、ごく小さい迂回路に変形して穴を避けられます。従って $q_k\in I^+_{M_*}(p)$ です。一方 $p$ と $q$ の差は $(2,2)$ で光的です。因果速度条件の積分で

$$
2=x(q)-x(p)\le\int|x'(t)|\,dt\le\int1\,dt=2
$$

が両側等号となるので、ほとんど至るところで $x'(t)=1$、すなわち曲線は $x=t$ です。これは原点を通るため $M_*$ 内にありません。よって $q\notin J^+(p)$ ですが $q_k\to q$ です。したがって $J^+(p)$ は閉ではなく、[因果単純性](../LORG11/index.md#def-lorg11-causal-simplicity)が破れます。単に「点が一つない」ではなく、**到達曲線の極限が穴に落ちる**のが失敗機構です。
<!-- solution-end -->

<a id="ex-lorg21-b04"></a>
### LORG21-B04 時間周期での長さの発散
- Level: B

$P=2$ の時間周期商で $p=([0],0)$、$q=([1],3)$ とする。$p$ から $q$ へ未来時間的曲線が存在すること、長さの上限が無限大であることを、整数の持ち上げで示せ。

<!-- solution-start -->
**詳細解答**。終点の持ち上げを $(1+2k,3)$ とすると、$k\ge2$ では $\Delta t_k=1+2k>3=|\Delta x|$ です。従って二端点を結ぶ被覆平面の直線は未来時間的で、商へ射影した曲線は $p$ から $q$ へ到達します。長さは

$$
L_k=\sqrt{(1+2k)^2-3^2}.
$$

$k\to\infty$ で $(1+2k)^2-9\to\infty$ なので $L_k\to\infty$ です。[時間分離の定義](../LORG17/index.md#def-lorg17-time-separation)は到達曲線の長さの上限ですから $d(p,q)=+\infty$ です。これは「最大値がある」の意味ではなく、有限な上限さえ存在しないという主張です。
<!-- solution-end -->

<a id="ex-lorg21-c01"></a>
### LORG21-C01 四模型の因果診断と仮定の使い所
- Level: C

本講の四模型を対象に、(i) $I^+(p)$ と $J^+(p)$ の関係、(ii) 非空の空間的Cauchy面の存在、(iii) 時間分離の上限達成について判定表を作り、各模型で理由となる曲線または定理を示せ。点除去模型では $p=(-1,0)$、$q=(1,0)$、時間周期模型では任意の $p,q$ を用いよ。

<!-- solution-start -->
**詳細解答**。全Minkowski平面では[到達条件](../LORG6/index.md#thm-lorg6-minkowski-futures)により、$I^+(p)$ は未来錐の内部、$J^+(p)$ は境界を含む未来錐です。$\{t=0\}$ がCauchyであり、[時間分離の公式](../LORG17/index.md#thm-lorg17-minkowski-formula)は直線で実現されます。

空間周期の静的積では[静的積の命題](#prop-lorg21-static-cylinder)から $\Delta t>\delta$ が $I^+(p)$、$\Delta t\ge\delta$ が $J^+(p)$ の条件で、等号が光的境界です。$\{t=0\}$ がCauchyであり、最短空間弧に沿う直線が $\sqrt{(\Delta t)^2-\delta^2}$ を実現します。空間的最短弧が複数ある場合でも存在は失われません。

点除去模型では時間的に到達できる二点の関係は局所的な迂回で保たれますが、原点を通る唯一の光線の先の点は $J^+(p)$ から抜け落ち得ます。[点除去の依存領域](#prop-lorg21-punctured-domain)が時空全体より狭いこと、および非コンパクトな因果ダイヤモンドにより大域双曲性は破れます。指定の二点では折れ線の長さが $2$ に近づくのに、等号を実現する垂直直線が穴を通るので上限非達成です。

時間周期商では[時間周期の命題](#prop-lorg21-time-periodic)により全点が任意の点の時間的未来に入り、$I^+(p)=J^+(p)=M_{\mathrm t}$ です。閉時間的曲線のためCauchy面は存在しません。周期スライスの $D(S)=M_{\mathrm t}$ でも交差は一意ではありません。任意の端点間に時間方向の周回回数を増やした曲線があって長さは $+\infty$ に発散します。ここでは有限な最大値の達成を問えません。

この診断で、**大域双曲性が最大化曲線の一般存在とCauchy分割のための十分条件であり、局所的なLorentz計量だけでは不十分**であることが明確になります。
<!-- solution-end -->

<a id="ex-lorg21-c02"></a>
### LORG21-C02 初期面と特性二次形式の接続
- Level: C

静的積 $g=-dt^2+a^2d\theta^2$（$a>0$）について、(i) $T=t$ がCauchy temporalであること、(ii) $N$、$\beta$、$h_T$、(iii) 任意の余接ベクトル $\xi=\tau\,dt+\kappa\,d\theta$ の $g^{-1}(\xi,\xi)$ と零方向を求めよ。さらに点除去・時間周期模型へ同じ「大域Cauchy分割」の結論を移せない理由を記せ。

<!-- solution-start -->
**詳細解答**。$dT=dt$ を勾配の定義 $g(\nabla^gT,V)=dT(V)$ に代入すると $\nabla^gT=-\partial_t$ です。$g(\nabla^gT,\nabla^gT)=-1$ で過去向き時間的です。また[静的積の命題](#prop-lorg21-static-cylinder)の非延長曲線の時刻評価により $T\circ\gamma$ の値域はすべて $\mathbb R$ です。従ってCauchy temporalの二条件を満たします。

[単位法線の命題](../LORG20/index.md#prop-lorg20-unit-normal)で $Q=-g(\nabla^gT,\nabla^gT)=1$ と置くと

$$
\beta=Q^{-1}=1,\qquad N=-\nabla^gT/\sqrt Q=\partial_t,
\qquad h_T=a^2d\theta^2.
$$

$g(N,N)=-1$、$g(N,\partial_\theta)=0$、$h_T(\partial_\theta,\partial_\theta)=a^2>0$ を直接確認できます。計量行列の逆は $\operatorname{diag}(-1,a^{-2})$ なので

$$
g^{-1}(\xi,\xi)=-\tau^2+a^{-2}\kappa^2=0
\quad\Longleftrightarrow\quad
\tau=\pm\kappa/a.
$$

点除去模型は $t$ の勾配が時間的でも非延長曲線が穴で止まるため、Cauchy性が失われます。時間周期商には大域的な実数値時間関数自体が存在しません。したがって、どちらも[LORG20の大域双曲的分割定理](../LORG20/index.md#thm-lorg20-orthogonal-splitting)の仮定を満たさず、同じ大域分割を無条件で持ち込めません。これは双曲型方程式の解析結果を仮定なしに主張できない理由にもなります。
<!-- solution-end -->

## 8. 本系列の出口：定理を使う順序

新しい時空模型で初期値問題を考える際は、まず因果曲線と $I^\pm,J^\pm$ を調べ、次に閉因果曲線や因果ダイヤモンドのコンパクト性を検査します。その後、仮定が満たされる場合だけCauchy面・Cauchy temporal function・直交分割の定理へ進みます。最後に法線と逆計量を計算してHPDEの出発点を作ります。

この順序を逆にすると、点除去模型で「計量は平坦だから大域Cauchy面がある」、時間周期商で「局所的な時刻座標があるから大域的な時計がある」と誤ることになります。LORGが保証するのは**因果構造についての必要な仮定**です。その入力から偏微分方程式の解を作る論証は、次のHPDEで初めて始まります。
