# LORG17 Lorentz時間分離と曲線長の極限

<!-- definition-example-audit: strict -->

## 1. 一つの曲線の固有時から、二点の時間分離へ

[LORG3のLorentz長さ](../LORG3/index.md#def-lorg3-lorentz-length)は、一つの未来因果曲線を選んで初めて計算できる量でした。[LORG5の局所最大化](../LORG5/index.md#thm-lorg5-local-maximization)によって短い時間的測地線は近傍内の競争に勝ちますが、遠くの二点について「最も固有時の長い道筋」をまだ定義していません。

二点 $p,q$ が決まったとき、それらを結ぶ**すべての未来向き因果曲線**の長さを比較し、得られる値を時間分離と呼びます。ただし通常の距離とは反対に、経由点を増やせば最大値の候補が増えるため、**逆三角不等式**になります。さらに「上限値が存在する」ことと「その値を実現する曲線が存在する」ことは別です。この区別を次章の最大化曲線の存在定理まで保ちます。

以下、$(M,g)$ は境界のない滑らかな連結Hausdorff・第二可算の時間向き付きLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ とします。未来向き因果曲線は区分的 $C^1$ のものに加え、[LORG14の局所Lipschitz因果曲線](../LORG14/index.md#lem-lorg14-local-closedness)も許します。後者の速度はほとんど至るところ存在し、長さはその速度の積分で定義します。区分的 $C^1$ の場合はLORG3の定義と一致します。

## 2. 時間分離の定義と直接計算

[因果的到達関係](../LORG6/index.md#def-lorg6-chronological-causal-future) $p\le q$ は、$p=q$ または $p$ から $q$ への未来因果曲線の存在を表します。因果関係にない二点には比較すべき因果曲線がないので、時間分離の値を零と決めます。因果関係にある場合には、長さの上限を取ります。

<a id="def-lorg17-time-separation"></a>

<!-- formal-statement-start -->
> **定義（Lorentz時間分離）**  
> 時間向き付き滑らかなLorentz時空 $(M,g)$ の二点 $p,q\in M$ に対し、
>
$$
d_g(p,q)=
\begin{cases}
\sup\{L_g(\gamma):\gamma\text{ は }p\text{ から }q\text{ への未来因果曲線}\},&p\le q,\\
0,&p\not\le q
\end{cases}
$$
>
> を **Lorentz時間分離** と呼ぶ。$p=q$ では定数曲線を許す。この段階で値域は $[0,+\infty]$ であり、上限が有限または達成されるとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg17-time-separation -->
**定義の確認**。二次元Minkowski時空 $(\mathbb R^{1,1},\eta=-dt^2+dx^2)$、標準未来向きを考え、$p=(0,0)$、$q=(5,3)$ とします。[Minkowskiの因果錐](../LORG6/index.md#thm-lorg6-minkowski-futures)の条件は $5\ge|3|$ なので $p\le q$ です。直線 $\gamma(s)=(5s,3s)$、$0\le s\le1$ は速度 $(5,3)$ を持ち、

$$
\eta(\dot\gamma,\dot\gamma)=-25+9=-16,\qquad L_\eta(\gamma)=\int_0^1 4\,ds=4.
$$

他の未来因果曲線の長さは[LORG3の端点長さ不等式](../LORG3/index.md#thm-lorg3-minkowski-length-bound)によって $4$ 以下です。したがって**上限の下界と上界が一致**し、$d_\eta(p,q)=4$ と確定します。例えば $q=(1,3)$ に替えると因果曲線がなく、定義の第二行から $d_\eta(p,q)=0$ です。
<!-- definition-example-end -->

<a id="thm-lorg17-minkowski-formula"></a>

<!-- formal-statement-start -->
> **定理（Minkowski時空の時間分離）**  
> $\mathbb R^{1+n}$ に $\eta=-dt^2+\sum_i(dx^i)^2$ と標準未来向きを与え、$p=(t_0,\mathbf x_0)$、$q=(t_1,\mathbf x_1)$、$\Delta t=t_1-t_0$、$\Delta\mathbf x=\mathbf x_1-\mathbf x_0$ とする。このとき
>
$$
d_\eta(p,q)=
\begin{cases}
\sqrt{(\Delta t)^2-\|\Delta\mathbf x\|^2},
&\Delta t\ge\|\Delta\mathbf x\|,\\
0,&\Delta t<\|\Delta\mathbf x\|.
\end{cases}
$$
>
> 特に $d_\eta(p,q)>0$ は $p\ll q$ と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

因果錐の条件で場合分けした上で、曲線の長さの上限と直線の長さを突き合わせます。平方根の式だけを記憶するのではなく、**過去向きの端点差も第二行に入る**ことに注意してください。

<!-- proof-start -->
### 証明

[因果錐公式](../LORG6/index.md#thm-lorg6-minkowski-futures)により、$\Delta t\ge\|\Delta\mathbf x\|$ と $p\le q$ は同値です。条件が破れれば定義の第二行で $d_\eta=0$ です。

条件が成立するとき、[端点長さ不等式](../LORG3/index.md#thm-lorg3-minkowski-length-bound)により任意の未来因果曲線 $\sigma$ に対し

$$
L_\eta(\sigma)\le\sqrt{(\Delta t)^2-\|\Delta\mathbf x\|^2}.
$$

一方 $\gamma(s)=p+s(q-p)$ の速度は $(\Delta t,\Delta\mathbf x)$、したがって未来因果的または零です。直接積分すると

$$
L_\eta(\gamma)=\int_0^1
\sqrt{(\Delta t)^2-\|\Delta\mathbf x\|^2}\,ds
=\sqrt{(\Delta t)^2-\|\Delta\mathbf x\|^2}.
$$

この二つの評価から上限は右辺と一致します。平方根が正なのは $\Delta t>\|\Delta\mathbf x\|$ の場合であり、これは[時間的未来の条件](../LORG6/index.md#thm-lorg6-minkowski-futures)です。$\square$
<!-- proof-end -->

Minkowskiでの値は両端点の座標差だけで決まります。しかし一般の時空では異なる位置の速度を一つのベクトル空間で足せないため、この公式をそのまま用いることはできません。

## 3. 通常の距離と逆向きになる不等式

$p$ から $q$ へ行き、次に $q$ から $r$ へ行く道を一本につなげられます。長さは[加法的](../LORG3/index.md#prop-lorg3-length-additivity)なので、それぞれの区間でなるべく長い曲線を選べば、$p$ から $r$ への長さの候補が増えます。

<a id="prop-lorg17-reverse-triangle"></a>

<!-- formal-statement-start -->
> **命題（時間分離の逆三角不等式）**  
> 滑らかな時間向き付きLorentz時空の点 $p\le q\le r$ に対し、拡張非負実数の意味で
>
$$
d_g(p,r)\ge d_g(p,q)+d_g(q,r)
$$
>
> が成立する。比較できない三点にこの形を無条件で適用してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

上限を「達成する曲線」が既にあると仮定するのは循環です。有限上限なら任意の $\varepsilon>0$ に対し、それぞれの上限に $\varepsilon$ だけ近い曲線を選びます。

<!-- proof-start -->
### 証明

両方の値が有限なら、任意の $\varepsilon>0$ に対し未来因果曲線 $\alpha:p\to q$、$\beta:q\to r$ を

$$
L_g(\alpha)>d_g(p,q)-\varepsilon,\qquad
L_g(\beta)>d_g(q,r)-\varepsilon
$$

と取れます。連結した曲線 $\alpha*\beta$ は未来因果的であり、[長さの加法性](../LORG3/index.md#prop-lorg3-length-additivity)から

$$
\begin{aligned}
d_g(p,r)&\ge L_g(\alpha*\beta)\\
&=L_g(\alpha)+L_g(\beta)\\
&>d_g(p,q)+d_g(q,r)-2\varepsilon.
\end{aligned}
$$

$\varepsilon\downarrow0$ とすると結論を得ます。どちらかの上限が $+\infty$ なら、任意の $A>0$ より長い該当区間の曲線を選べます。他方の区間には少なくとも一本の非負長の因果曲線があるので、連結後の長さも $A$ を超えます。ゆえに左辺も $+\infty$ です。$\square$
<!-- proof-end -->

この不等式は $d(p,q)+d(q,r)\ge d(p,r)$ というRiemann距離の三角不等式とは逆です。比較対象が**最大化**されるLorentz長さであることが原因です。

<a id="prop-lorg17-positive"></a>

<!-- formal-statement-start -->
> **命題（正の時間分離と時間的到達）**  
> 滑らかな時間向き付きLorentz時空では、任意の $p,q$ に対して
>
$$
d_g(p,q)>0\quad\Longleftrightarrow\quad p\ll q
$$
>
> が成り立つ。ただし $d_g(p,q)$ 自体は無限大を取り得る。
<!-- formal-statement-end -->

### 証明の見取り図

正の積分は曲線上のどこかに時間的速度があることを意味します。その部分を時間的区間として取り出し、前後の因果部分をpush-upでつなぎます。

<!-- proof-start -->
### 証明

$d_g(p,q)>0$ なら、上限の定義から正の長さの未来因果曲線 $\gamma$ が一本あります。被積分関数は非負で、積分が正なので、ある微分可能な点では

$$
-g(\dot\gamma,\dot\gamma)>0.
$$

その付近の短い区間の接ベクトルは未来時間的で、区間の端点 $a,b$ は $a\ll b$ を満たします。元の曲線の残りから $p\le a$、$b\le q$ です。[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を二度使えば $p\ll q$ が従います。局所Lipschitz曲線の場合も、積分が正となる時間的部分を局所近似して同じ推論を行えます。

逆に $p\ll q$ なら、定義上 $p$ から $q$ の未来時間的な区分的 $C^1$ 曲線が取れます。その非零時間的速度を持つ区間では被積分関数が正なので $L_g(\gamma)>0$、従って $d_g(p,q)>0$ です。$\square$
<!-- proof-end -->

## 4. なぜ「曲線列の収束」だけで長さの収束を結論できないか

[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)は、一様Lipschitzに正規化した因果曲線列から極限因果曲線を抽出する道具です。しかし曲線の位置が一様収束しても、速度が一様収束するとは限りません。

二次元Minkowskiで

$$
\gamma_k(s)=\left(s,\frac{\sin(2\pi ks)}{2\pi k}\right),
\qquad 0\le s\le1
$$

を考えます。速度は $(1,\cos(2\pi ks))$ で未来因果的です。$\gamma_k$ は $(s,0)$ に一様収束する一方、

$$
\begin{aligned}
L_\eta(\gamma_k)
&=\int_0^1\sqrt{1-\cos^2(2\pi ks)}\,ds\\
&=\int_0^1|\sin(2\pi ks)|\,ds
=\frac2\pi,
\end{aligned}
$$

極限曲線 $\gamma(s)=(s,0)$ は $L_\eta(\gamma)=1$ です。したがって長さの極限は一般に**等号ではなく上半連続性**として扱います。

上半連続性とは「極限の長さが、近似列の長さの上極限より小さくならない」という性質です。

<a id="def-lorg17-upper-semicontinuity"></a>

<!-- formal-statement-start -->
> **定義（曲線長の上半連続性）**  
> 共通のコンパクトパラメータ区間 $[0,1]$ に定義された未来因果曲線 $\gamma_k$ が $\gamma$ に一様収束するとき、
>
$$
L_g(\gamma)\ge\limsup_{k\to\infty}L_g(\gamma_k)
$$
>
> が成立することを、その収束に沿ったLorentz長さの**上半連続性**という。ここでは曲線が共通のコンパクト集合内にあり、補助Riemann計量のLipschitz定数が一様有界である場合を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg17-upper-semicontinuity -->
**定義の確認**。上の曲線列は $|\dot\gamma_k|_{\mathrm{Euclid}}\le\sqrt2$ だから一様Lipschitzです。画像は時空のコンパクト長方形内に入り、極限も未来因果曲線です。数値を代入すると

$$
L_\eta(\gamma)=1>\frac2\pi
=\limsup_{k\to\infty}L_\eta(\gamma_k).
$$

したがって不等式の向きも、等号が不要であることも直接確認できます。
<!-- definition-example-end -->

<a id="lem-lorg17-local-partition"></a>

<!-- formal-statement-start -->
> **補題（小区間の局所時間分離による長さの復元）**  
> $\gamma:[0,1]\to M$ を未来向き局所Lipschitz因果曲線とする。分割 $0=t_0<\cdots<t_N=1$ の各像 $\gamma([t_i,t_{i+1}])$ が因果的凸な凸正規近傍 $U_i$ に収まるとする。$U_i$ 内の測地線で計算した局所時間分離を $\tau_{U_i}$ と書けば
>
$$
L_g(\gamma)\le\sum_{i=0}^{N-1}\tau_{U_i}
\bigl(\gamma(t_i),\gamma(t_{i+1})\bigr).
$$
>
> 分割幅を零に近づけ、各小区間の像をそのような近傍に収めるとき、右辺は $L_g(\gamma)$ に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

局所では[測地線の長さ最大化](../LORG5/index.md#thm-lorg5-local-maximization)と光的の場合の零長さが使えます。微細分割の極限では、各小区間の**平均速度**がほとんど至るところ実際の速度へ近づくことを用います。

<!-- proof-start -->
### 証明

因果的凸な凸正規近傍 $U_i$ 内での未来因果的端点 $x\le y$ に対し、$v=\exp_x^{-1}(y)$ を取ります。[凸正規近傍](../LORG5/index.md#def-lorg5-convex-normal)内の放射測地線の長さは

$$
\tau_{U_i}(x,y)=\sqrt{-g_x(v,v)}.
$$

時間的端点では[局所最大化定理](../LORG5/index.md#thm-lorg5-local-maximization)により、同じ近傍内の因果曲線の長さは $\tau_{U_i}$ 以下です。光的端点では、因果的凸性と局所の錐判定により当該部分のLorentz長さは零です。各部分に適用し[長さの加法性](../LORG3/index.md#prop-lorg3-length-additivity)で足すと最初の不等式を得ます。

極限の等号を確認します。曲線の像を有限個の座標近傍で覆い、各々を小分割します。座標表示 $x(t)$ はLipschitzなので $\dot x(t)$ がほとんど至るところ存在し、$\dot x$ は本質的有界です。幅 $\delta_i=t_{i+1}-t_i$ に対する平均速度は

$$
\bar v_i=\frac{x(t_{i+1})-x(t_i)}{\delta_i}
=\frac1{\delta_i}\int_{t_i}^{t_{i+1}}\dot x(t)\,dt.
$$

指数写像の原点での微分が恒等で、計量も滑らかなので、$t_i$ を基点とする局所測地線の初速度は、座標上で $\delta_i\bar v_i+O(\delta_i^2)$ です。一様有界な速度集合上の連続性と平方根の連続性により

$$
\frac{\tau_{U_i}(x(t_i),x(t_{i+1}))}{\delta_i}
-\sqrt{-g_{x(t_i)}(\bar v_i,\bar v_i)}
\longrightarrow0
$$

が細分に沿って一様に成り立ちます（光的速度への接近でも平方根の連続性で足ります）。例えば二進細分ではLebesgueの微分定理により、区間平均 $\bar v_i$ が $\dot x(t)$ にほとんど至るところ収束します。対応する平方根は因果錐上の非負連続関数で、速度の有界性により共通の積分可能上界を持つため、優収束定理から

$$
\sum_i\delta_i\sqrt{-g_{x(t_i)}(\bar v_i,\bar v_i)}
\longrightarrow
\int_0^1\sqrt{-g_{x(t)}(\dot x(t),\dot x(t))}\,dt.
$$

指数写像の誤差の総和も $\sum_i\delta_i o(1)=o(1)$ です。よって右辺の局所時間分離の和が $L_g(\gamma)$ に収束します。$\square$
<!-- proof-end -->

<a id="thm-lorg17-length-usc"></a>

<!-- formal-statement-start -->
> **定理（因果曲線のLorentz長さの上半連続性）**  
> 滑らかな時間向き付きLorentz時空 $(M,g)$ 上の未来因果曲線 $\gamma_k:[0,1]\to M$ が、ある未来因果曲線 $\gamma$ に一様収束し、すべての像が共通コンパクト集合に含まれ、補助Riemann計量に関するLipschitz定数が一様有界であるとする。このとき
>
$$
\limsup_{k\to\infty}L_g(\gamma_k)\le L_g(\gamma).
$$
<!-- formal-statement-end -->

### 証明の見取り図

極限曲線を細かく分割し、各部分を因果的凸な凸正規近傍に入れます。一様収束によって近似曲線の対応する部分も同じ近傍へ入ります。局所時間分離は端点に連続であるため、「$\limsup$」を有限和の外へ出せます。

<!-- proof-start -->
### 証明

$\gamma$ の像はコンパクトです。[因果的凸近傍](../LORG8/index.md#def-lorg8-causal-convex)を用い、十分細かな有限分割 $0=t_0<\cdots<t_N=1$ を選び、各像を凸正規かつ因果的凸な近傍 $U_i$ に収めます。近似列は一様収束するので、大きな $k$ について $\gamma_k([t_i,t_{i+1}])\subset U_i$ です。

各部分に[局所最大化](../LORG5/index.md#thm-lorg5-local-maximization)を適用し、局所時間分離の連続性を使うと

$$
\begin{aligned}
\limsup_k L_g(\gamma_k)
&\le \limsup_k\sum_i \tau_{U_i}
(\gamma_k(t_i),\gamma_k(t_{i+1}))\\
&\le \sum_i\limsup_k\tau_{U_i}
(\gamma_k(t_i),\gamma_k(t_{i+1}))\\
&=\sum_i\tau_{U_i}(\gamma(t_i),\gamma(t_{i+1})).
\end{aligned}
$$

ここで $\tau_{U_i}$ は指数写像の逆写像と $v\mapsto\sqrt{\max(0,-g(v,v))}$ の合成で、因果的端点上で連続です。分割を細かくするたびに[局所分割補題](#lem-lorg17-local-partition)の右辺は $L_g(\gamma)$ へ近づくので、任意の $\varepsilon>0$ に対して右辺を $L_g(\gamma)+\varepsilon$ 未満にできます。$\varepsilon\downarrow0$ で所望の不等式を得ます。$\square$
<!-- proof-end -->

注意：**上半連続なのは曲線を変化させるときの長さ**です。次節で扱う「二点を変化させたときの時間分離」の**下半連続性**とは、変化させる対象が違います。

## 5. 時間分離の下半連続性と大域双曲性

二点 $(p_k,q_k)$ が $(p,q)$ に近づくとき、時間分離 $d_g(p,q)$ が近傍の値より突然大きくなることはありません。厳密には **下半連続性** と呼び、

$$
d_g(p,q)\le\liminf_{k\to\infty}d_g(p_k,q_k)
$$

です。逆向きの**上半連続性**は一般に保証されません。二点間の候補曲線が時空の穴や無限遠へ逃げないという大域的条件が必要です。

<a id="lem-lorg17-timelike-approximation"></a>

<!-- formal-statement-start -->
> **補題（正長因果曲線の時間的折れ線近似）**  
> $p\ll q$ とし、$\gamma$ を $p$ から $q$ への区分的 $C^1$ または局所Lipschitz未来因果曲線とする。任意の $\varepsilon>0$ に対し、$p$ と $q$ を端点に持ち、有限個の時間的測地線片をつないだ曲線 $\beta$ が存在し、
>
$$
L_g(\beta)>L_g(\gamma)-\varepsilon
$$
>
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

各小部分を凸正規近傍の測地線片へ置き換えると長さは減りません。ただし光的部分を時間的へ押すには、端点間のどこかにある時間的な余裕を使います。

<!-- proof-start -->
### 証明

[凸正規近傍の存在](../LORG5/index.md#thm-lorg5-convex-normal-existence)から、$\gamma$ を有限個の小部分へ分け、それぞれを局所の因果的測地線片へ置き換えます。時間的端点では[局所最大化](../LORG5/index.md#thm-lorg5-local-maximization)により長さは減りません。光的端点の元の部分は零長なので、置換も零長です。これで因果的測地線折れ線 $\alpha$ が得られ、$L_g(\alpha)\ge L_g(\gamma)$ です。

$p\ll q$ なので、$\alpha$ の各小片の端点を $x_0=p,x_1,\ldots,x_m=q$ とすれば少なくとも一つの辺が時間的です。もし全辺が光的か零なら、$L_g(\alpha)=0$ ですが、$p\ll q$ でも $\gamma$ が零長であることはあり得ます。その場合にも $p$ と $q$ を時間的に結ぶ曲線を別に取れるものの、$\gamma$ の長さ零より大きいという結論は直ちに満たされます。そこで $L_g(\gamma)>0$ の場合だけ以下を考えます。

正の長さの辺があるので、その辺の両端には時間的関係の開性による余裕があります。それ以外の光的辺に沿っては中間頂点を微小量だけ未来向き時間的にずらし、時間的辺に到達したところでそのずれを吸収できます。始点 $p$ と終点 $q$ は固定したまま、すべての隣接頂点を時間的関係にすることができます。これは各凸正規近傍の座標で「閉未来錐のベクトルに任意に小さな未来時間的ベクトルを足すと未来時間的になる」ことと、有限個の頂点に対する逐次構成によります。

摂動後の隣接点は $U_i$ 内で時間的なので、その間を時間的測地線で結びます。有限個の各局所測地線の長さは端点に連続であるため、頂点の摂動を十分小さくすれば折れ線全体の長さは $L_g(\alpha)-\varepsilon$ より大きくなります。したがって $L_g(\beta)>L_g(\gamma)-\varepsilon$ です。$\square$
<!-- proof-end -->

<a id="thm-lorg17-time-lsc"></a>

<!-- formal-statement-start -->
> **定理（時間分離の下半連続性）**  
> 任意の滑らかな時間向き付きLorentz時空で、$d_g:M\times M\to[0,+\infty]$ は下半連続である。すなわち $(p_k,q_k)\to(p,q)$ なら
>
$$
d_g(p,q)\le\liminf_{k\to\infty}d_g(p_k,q_k).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$d_g(p,q)=0$ は非負性で即座に処理できます。正の場合、ほぼ上限の長さを持つ曲線を選び、時間的折れ線へ近似します。その**内側の長い部分**を固定すると、近い端点からもその部分へ時間的に連結できます。

<!-- proof-start -->
### 証明

$d_g(p,q)=0$ なら、すべての $d_g(p_k,q_k)\ge0$ から成立します。$d_g(p,q)>0$ とし、任意の有限 $A<d_g(p,q)$ を取ります。上限の定義から、$p$ と $q$ を結ぶ長さ $L_g(\gamma)>A$ の未来因果曲線があります。[正の時間分離の命題](#prop-lorg17-positive)により $p\ll q$ です。

[時間的折れ線近似](#lem-lorg17-timelike-approximation)を十分良い精度で行い、$L_g(\beta)>A$ を満たす時間的折れ線 $\beta$ を取ります。両端から非常に短い部分を切り落として中間端点 $a,b$ を選べば、

$$
p\ll a,\qquad b\ll q,\qquad
L_g(\beta|_{a\to b})>A
$$

です。[時間的未来・過去の開性](../LORG7/index.md#thm-lorg7-chronological-open)から、十分大きな $k$ で $p_k\ll a$ かつ $b\ll q_k$ になります。これらを $\beta|_{a\to b}$ の前後に連結した未来因果曲線の長さは、[加法性](../LORG3/index.md#prop-lorg3-length-additivity)と非負性により $A$ より大きいので、

$$
d_g(p_k,q_k)\ge L_g(\beta|_{a\to b})>A
$$

です。従って $\liminf_k d_g(p_k,q_k)\ge A$。有限の $A<d_g(p,q)$ を任意に取れるので、$d_g(p,q)=+\infty$ の場合も含めて結論を得ます。$\square$
<!-- proof-end -->

大域双曲性はこの下半連続性を得るためではなく、逆向きの上半連続性と有限性を得るために使います。

<a id="thm-lorg17-gh-continuity"></a>

<!-- formal-statement-start -->
> **定理（大域双曲的時空での時間分離の有限性と連続性）**  
> $(M,g)$ を[LORG16の意味で大域双曲的](../LORG16/index.md#def-lorg16-global-hyperbolicity)な滑らかな時間向き付きLorentz時空とする。このとき任意の $p,q\in M$ で $d_g(p,q)<+\infty$ であり、
>
$$
(p_k,q_k)\to(p,q)
\quad\Longrightarrow\quad
d_g(p_k,q_k)\to d_g(p,q).
$$
>
> この定理は上限を達成する曲線の存在をまだ主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

端点が動いても、それらより少し前・後に固定した点 $a\ll p$ と $q\ll b$ の因果ダイヤモンドに曲線を入れます。そのダイヤモンドのコンパクト性と強因果性が補助弧長の一様上界を与えます。上半連続性を近似最大曲線列に使います。

<!-- proof-start -->
### 証明

固定した $p\le q$ を考えます。[LORG16のコンパクト曲線抽出](../LORG16/index.md#prop-lorg16-curves-compact)の証明にある強因果性による非閉じ込め性から、コンパクトなダイヤモンド $K(p,q)$ 内のすべての $p$–$q$ 因果曲線には、補助計量 $h$ に関する長さの共通上界 $B$ があります。コンパクト集合上では、未来因果ベクトル $v$ に対し

$$
0\le\sqrt{-g(v,v)}\le C|v|_h
$$

となる定数 $C$ を一つ選べます。これは $h$-単位因果ベクトルのコンパクト性と $g$ の連続性から従います。よって $L_g(\gamma)\le CB$、従って $d_g(p,q)<\infty$ です。$p\not\le q$ の場合は定義により $d_g(p,q)=0$ です。

連続性の上半連続側を示します。$(p_k,q_k)\to(p,q)$ とし、$\limsup_kd_g(p_k,q_k)$ を実現する方向へ部分列を取ります。上極限が零なら主張は非負性から直ちに成立するので、正とします。この部分列で $p_k\le q_k$、かつ各 $k$ に上限より $1/k$ 以内の長さを持つ因果曲線 $\gamma_k:p_k\to q_k$ を選びます。固定した $a\ll p$、$q\ll b$ を選べば、[時間的未来の開性](../LORG7/index.md#thm-lorg7-chronological-open)によって大きな $k$ で

$$
a\ll p_k\le q_k\ll b
$$

となります。従って $\gamma_k$ はすべて固定コンパクト集合 $K(a,b)$ 内を通ります。[LORG16の曲線抽出](../LORG16/index.md#prop-lorg16-curves-compact)と非閉じ込め性により補助弧長は一様有界で、$[0,1]$ に定数速で付け直せば一様Lipschitzです。[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)によって、部分列は端点 $p,q$ を持つ未来因果曲線 $\gamma$ に一様収束します。

[長さの上半連続性](#thm-lorg17-length-usc)を適用すると、

$$
\begin{aligned}
\limsup_k d_g(p_k,q_k)
&\le\limsup_k\bigl(L_g(\gamma_k)+1/k\bigr)\\
&\le L_g(\gamma)
\le d_g(p,q).
\end{aligned}
$$

一方、[時間分離の下半連続性](#thm-lorg17-time-lsc)により

$$
d_g(p,q)\le\liminf_k d_g(p_k,q_k).
$$

両式を合わせると極限が存在し $d_g(p,q)$ に等しくなります。$\square$
<!-- proof-end -->

## 6. コンパクトでないと「上限が達成される」とは限らない

二次元Minkowski時空から原点を取り除いた $M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$ を考え、$p=(-1,0)$、$q=(1,0)$ とします。$g$ は平坦計量の制限です。原点を通る直線は使えませんが、$0<\varepsilon<1$ として中継点 $r_\varepsilon=(0,\varepsilon)$ を経由する折れ線は $M_*$ 内で未来時間的です。各辺の長さは $\sqrt{1-\varepsilon^2}$ なので

$$
L_g(p\to r_\varepsilon\to q)=2\sqrt{1-\varepsilon^2}\longrightarrow2.
$$

一方、どの曲線も元のMinkowskiにおける[端点長さ不等式](../LORG3/index.md#thm-lorg3-minkowski-length-bound)により長さは $2$ 以下。従って

$$
d_{M_*}(p,q)=2.
$$

しかし長さが厳密に $2$ の曲線は、Minkowskiの逆三角不等式の等号条件から、空間速度が零の直線に限られます。その直線は原点を通るので $M_*$ の曲線ではありません。つまり**時間分離は有限でも上限を達成する曲線がない**のです。問題は点を除いたことで失った因果ダイヤモンドのコンパクト性です。

また時間方向を周期同一視した平坦Lorentz円筒では、未来時間的閉曲線を何周でも回れます。周回数に応じて長さが際限なく増すため $d_g(p,p)=+\infty$ となり、有限性さえ壊れます。これらは大域双曲性の仮定が単なる飾りでない例です。

## 7. 演習と詳細解答

演習で別記しない限り $\eta=-dt^2+dx^2$ と標準未来向きを使います。すべての解答で因果条件を先に確認してください。

<a id="ex-lorg17-a01"></a>
### LORG17-A01 時間的端点の時間分離
- Level: A

$p=(0,0)$、$q=(13,5)$ の時間分離を求め、上限を実現する具体的曲線を一本示せ。

<!-- solution-start -->
**詳細解答**。$\Delta t=13\ge5=|\Delta x|$ なので因果的です。[Minkowski時間分離公式](#thm-lorg17-minkowski-formula)により

$$
d_\eta(p,q)=\sqrt{13^2-5^2}=\sqrt{169-25}=12.
$$

$\gamma(s)=(13s,5s)$（$0\le s\le1$）は未来時間的で、$L_\eta(\gamma)=\int_0^1\sqrt{13^2-5^2}\,ds=12$。よって上限を実現します。
<!-- solution-end -->

<a id="ex-lorg17-a02"></a>
### LORG17-A02 零は到達不能とは限らない
- Level: A

$p=(0,0)$ として、$q=(2,2)$、$r=(1,3)$、$s=(-2,0)$ の時間分離を求め、それぞれが未来因果的に到達可能か判定せよ。

<!-- solution-start -->
**詳細解答**。$q$ は $\Delta t=2=|\Delta x|$ だから $p\le q$ で光的直線が存在しますが、公式より

$$
d_\eta(p,q)=\sqrt{4-4}=0.
$$

$r$ は $1<3$ なので到達不能、$s$ は $\Delta t=-2<0$ なので過去向きで到達不能です。それぞれ定義の第二行で $d_\eta(p,r)=d_\eta(p,s)=0$ です。**零という値だけでは光的到達と到達不能を区別できません**。
<!-- solution-end -->

<a id="ex-lorg17-a03"></a>
### LORG17-A03 逆三角不等式の等号と不等号
- Level: A

$p=(0,0)$、$q=(2,0)$、$r=(4,0)$ と、$q'=(2,1)$ の場合を比較し、時間分離の逆三角不等式を数値で確かめよ。

<!-- solution-start -->
**詳細解答**。$p\le q\le r$ で、公式から

$$
d(p,q)=2,\quad d(q,r)=2,\quad d(p,r)=4,
$$

ゆえに $4=2+2$。$q'$ も $p\ll q'\ll r$ を満たし、

$$
d(p,q')=\sqrt{4-1}=\sqrt3,\qquad
d(q',r)=\sqrt{4-1}=\sqrt3.
$$

従って $4>2\sqrt3$ です。経由点が直線からずれると、二つの長さの和は厳密に減りました。
<!-- solution-end -->

<a id="ex-lorg17-a04"></a>
### LORG17-A04 揺れる曲線の長さ
- Level: A

$\gamma_k(s)=(s,\sin(2\pi ks)/(2\pi k))$（$0\le s\le1$）が未来因果的か判定し、長さと一様極限の長さを比較せよ。

<!-- solution-start -->
**詳細解答**。速度は $(1,\cos(2\pi ks))$ です。時間成分が正で

$$
\eta(\dot\gamma_k,\dot\gamma_k)
=-1+\cos^2(2\pi ks)=-\sin^2(2\pi ks)\le0
$$

なので未来因果的です。$|\gamma_k(s)-(s,0)|\le1/(2\pi k)$ だから一様収束します。長さは

$$
L_\eta(\gamma_k)=\int_0^1|\sin(2\pi ks)|\,ds
=\frac1{2\pi k}\int_0^{2\pi k}|\sin u|\,du
=\frac{4k}{2\pi k}=\frac2\pi.
$$

極限の直線は速度 $(1,0)$ で長さ $1$。よって $2/\pi<1$ となり、等号を伴う長さの連続性は成り立ちません。
<!-- solution-end -->

<a id="ex-lorg17-a05"></a>
### LORG17-A05 時間周期模型での無限大
- Level: A

$(\mathbb R/T\mathbb Z)_t\times\mathbb R_x$、$g=-dt^2+dx^2$、$T>0$ とし、固定点 $p$ から $p$ への時間分離を求めよ。

<!-- solution-start -->
**詳細解答**。時間方向を $m$ 周する $\gamma_m(s)=([mTs],x_p)$（$0\le s\le1$）は閉じた未来時間的曲線です。その速度は局所座標で $(mT,0)$ なので

$$
L_g(\gamma_m)=\int_0^1\sqrt{(mT)^2}\,ds=mT.
$$

$m\to\infty$ で長さは発散し、上限の定義から $d_g(p,p)=+\infty$ です。この時空では閉時間的曲線があり大域双曲性を満たしません。
<!-- solution-end -->

<a id="ex-lorg17-b01"></a>
### LORG17-B01 Minkowskiの経由点を動かす
- Level: B

$p=(0,0)$、$r=(6,0)$、$q=(3,1)$ の場合、$p\le q\le r$ を確かめた上で、逆三角不等式の余裕を計算せよ。$q=(3,a)$ に一般化して $|a|\le3$ のとき等号となる条件を求めよ。

<!-- solution-start -->
**詳細解答**。$q-p=(3,1)$ と $r-q=(3,-1)$ はいずれも時間成分3、空間成分の絶対値1なので未来時間的です。

$$
d(p,q)=d(q,r)=\sqrt{3^2-1^2}=2\sqrt2,\qquad
d(p,r)=6.
$$

余裕は $6-4\sqrt2>0$ です。一般に $q=(3,a)$ では $|a|\le3$ のとき両辺が未来因果的で、

$$
d(p,q)+d(q,r)=2\sqrt{9-a^2}\le 6.
$$

非負数の平方根の単調性から、等号は $9-a^2=9$、すなわち $a=0$ の場合に限られます。$|a|=3$ の光的経由では和が零です。
<!-- solution-end -->

<a id="ex-lorg17-b02"></a>
### LORG17-B02 点を除くと上限が逃げる
- Level: B

$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$、$p=(-1,0)$、$q=(1,0)$ とする。$d_{M_*}(p,q)=2$ を示し、その上限を実現する未来因果曲線が存在しないことを説明せよ。

<!-- solution-start -->
**詳細解答**。$r_\varepsilon=(0,\varepsilon)$（$0<\varepsilon<1$）を通る二本の直線辺は原点を避け、各速度差 $(1,\varepsilon)$、$(1,-\varepsilon)$ は未来時間的です。[長さの加法性](../LORG3/index.md#prop-lorg3-length-additivity)から

$$
L(p\to r_\varepsilon\to q)
=\sqrt{1-\varepsilon^2}+\sqrt{1-\varepsilon^2}
=2\sqrt{1-\varepsilon^2}\to2.
$$

一方[端点長さ不等式](../LORG3/index.md#thm-lorg3-minkowski-length-bound)であらゆる曲線の長さが2以下なので上限は2。等号となる曲線について、$t$ をパラメータとすれば

$$
\sqrt{1-(dx/dt)^2}\le1
$$

であり、積分が2に等しいには $dx/dt=0$ がほとんど至るところ必要です。従って $x(t)\equiv0$、$-1\le t\le1$ の直線だけが等号を実現します。この直線は除かれた点を通るので許されません。
<!-- solution-end -->

<a id="ex-lorg17-b03"></a>
### LORG17-B03 下半連続性の向きを再構成
- Level: B

$p\ll q$ と $0<A<d_g(p,q)$ を仮定する。$d_g$ の下半連続性の証明で、時間的折れ線の内部端点 $a,b$ を固定する理由を説明し、近い $(p',q')$ について $d_g(p',q')>A$ となる連結を記述せよ。

<!-- solution-start -->
**詳細解答**。上限の定義から長さが $A$ を超す因果曲線を選び、[時間的折れ線近似](#lem-lorg17-timelike-approximation)により同じ不等式を満たす時間的折れ線 $\beta$ に替えます。端の十分短い部分を捨てても中間部分の長さは $A$ より大きいように $a,b$ を選びます。

時間的な関係 $p\ll a$、$b\ll q$ は[LORG7の開性](../LORG7/index.md#thm-lorg7-chronological-open)によって、それぞれ $p'\ll a$、$b\ll q'$ のまま近傍へ拡張できます。その近傍の任意の点対から、$p'\to a$、$\beta|_{a\to b}$、$b\to q'$ を連結します。前後の長さは非負、中央は $A$ より大きいので

$$
d_g(p',q')\ge L_g(p'\to a)+L_g(\beta|_{a\to b})+L_g(b\to q')>A.
$$

固定しておくのは中央部分の端点であり、動く端点への小片を両側に補うのが証明の要点です。
<!-- solution-end -->

<a id="ex-lorg17-b04"></a>
### LORG17-B04 半連続性と収束する対象
- Level: B

「$L(\gamma_k)\to L(\gamma)$ が曲線の一様収束から従う」「$d(p_k,q_k)\to d(p,q)$ が任意の時空で従う」という二つの主張を検討し、それぞれ正しい代替主張と必要な仮定を述べよ。

<!-- solution-start -->
**詳細解答**。第一の主張は[A04](#ex-lorg17-a04)の列により偽です。各曲線が未来因果的で、像が共通コンパクト集合内にあり、補助Lipschitz定数が一様有界なら[長さの上半連続性](#thm-lorg17-length-usc)が使え、

$$
L_g(\gamma)\ge\limsup_kL_g(\gamma_k)
$$

とだけ結論できます。第二の主張には大域仮定が足りません。任意の滑らかな時空で常に成り立つのは[時間分離の下半連続性](#thm-lorg17-time-lsc)による

$$
d_g(p,q)\le\liminf_kd_g(p_k,q_k)
$$

です。さらに時空が[大域双曲的](../LORG16/index.md#def-lorg16-global-hyperbolicity)なら有限性と上半連続側が得られ、初めて連続性を結論できます。
<!-- solution-end -->

<a id="ex-lorg17-c01"></a>
### LORG17-C01 大域双曲性が連続性に必要な場所を追う
- Level: C

大域双曲的時空で $(p_k,q_k)\to(p,q)$ とし、$d_g(p_k,q_k)$ の上極限が正であるとする。次を示せ。

1. 近似的に時間分離の上限へ近づく因果曲線 $\gamma_k$ を、ある一つのコンパクトダイヤモンドに入れられる。
2. 再パラメータ化した部分列から極限曲線を得られる。
3. 上半連続性と下半連続性を組み合わせ、時間分離の連続性が得られる。

<!-- solution-start -->
**詳細解答**。上極限が正の部分列を選べば各 $p_k\le q_k$ です。有限性は[大域双曲性と時間分離の定理](#thm-lorg17-gh-continuity)の前半（固定ダイヤモンドで $L\le CB$）によります。そこで

$$
L_g(\gamma_k)\ge d_g(p_k,q_k)-1/k
$$

となる $\gamma_k:p_k\to q_k$ を選びます。

1. [時間的未来の開性](../LORG7/index.md#thm-lorg7-chronological-open)を使い $a\ll p$、$q\ll b$ を固定すると、大きな $k$ について $a\ll p_k$、$q_k\ll b$ です。因果関係の推移性から $\gamma_k$ の任意の点は $J^+(a)\cap J^-(b)=K(a,b)$ に入ります。この集合は大域双曲性によりコンパクトです。
2. [LORG16の非閉じ込め補題](../LORG16/index.md#lem-lorg16-nonimprisonment)と曲線抽出命題から $K(a,b)$ 内の因果曲線に補助弧長の一様上界があります。$[0,1]$ に定数速で再表示すれば一様Lipschitzとなり、[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)を適用できます。収束した部分列の極限 $\gamma$ は $p\to q$ の未来因果曲線です。
3. [長さの上半連続性](#thm-lorg17-length-usc)により

$$
\limsup_k d_g(p_k,q_k)
\le\limsup_k\bigl(L_g(\gamma_k)+1/k\bigr)
\le L_g(\gamma)\le d_g(p,q).
$$

他方、[下半連続性](#thm-lorg17-time-lsc)によって $d_g(p,q)\le\liminf_kd_g(p_k,q_k)$。両者の間に上極限・下極限の一般的な順序を挟めば一致し、$d_g(p_k,q_k)\to d_g(p,q)$ となります。コンパクトダイヤモンドを失うと第1段が崩れ、強因果性を失うと第2段の弧長上界が崩れます。
<!-- solution-end -->

## 8. 次の講への接続

この講で、時間分離は**曲線長の上限**であり、Minkowskiの公式、逆三角不等式、任意の滑らかな時空での下半連続性、大域双曲時空での連続性を得ました。曲線長が極限に対して上半連続なことも確認しました。

まだ**上限が必ず実現される**とは証明していません。次のLORG18では、大域双曲性の下で長さが上限に近づく曲線列を取り、今準備したコンパクト性と上半連続性によって最大化曲線の存在を証明します。
