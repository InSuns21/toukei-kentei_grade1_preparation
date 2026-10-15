# LORG19 Cauchy時間関数の存在

<!-- definition-example-audit: strict -->

## 1. 増える時計と、時空全体を切る時計

[LORG10の時間関数](../LORG10/index.md#def-lorg10-time-function)は、未来因果曲線に沿って厳密増加する連続関数でした。これがあると閉因果曲線は排除できます。しかし「時計が増える」だけで、各時計の値を**すべての非延長因果曲線**が通るとは限りません。例えば時計が空間無限遠へ向かう光線上で有限値に近づけば、その後の時刻面は光線と交わりません。

他方、[LORG16のGeroch型体積時間関数定理](../LORG16/index.md#thm-lorg16-geroch-volume)は、大域双曲性から全非延長因果曲線を横切る連続時計をすでに構成しました。この講ではその定理を再証明せず、そこで得た時計の**値域・レベル集合・時空の位相的分割**を調べます。次のLORG20で扱う「滑らかな直交分割」とは何が違うかも明確にします。

以下、$(M,g)$ は境界のない連結Hausdorff・第二可算の滑らかな時間向き付きLorentz時空（符号 $(-,+,\ldots,+)$、次元 $n+1$、$n\ge1$）です。[LORG3の未来因果曲線](../LORG3/index.md#def-lorg3-causal-curve)は停留片を除いた局所Lipschitz曲線も許し、「両側非延長」は[LORG13の非延長性](../LORG13/index.md#def-lorg13-inextendible)を意味します。

## 2. Cauchy時間関数の定義と最小例

各非延長曲線上で時計が過去へ $-\infty$、未来へ $+\infty$ と進むなら、どの実数の時計面も一回ずつ横切ります。この条件を単調性に追加します。

<a id="def-lorg19-cauchy-time"></a>

<!-- formal-statement-start -->
> **定義（Cauchy時間関数）**  
> 時間向き付きLorentz時空 $(M,g)$ の連続写像 $\tau:M\to\mathbb R$ が **Cauchy時間関数** であるとは、[時間関数](../LORG10/index.md#def-lorg10-time-function)であり、任意の両側非延長未来因果曲線 $\gamma:I\to M$ に対して、$\tau\circ\gamma$ が $I$ から $\mathbb R$ への全射となることをいう。
>
> 同値に、$\tau\circ\gamma$ は厳密増加し、過去端で $-\infty$、未来端で $+\infty$ に発散する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg19-cauchy-time -->
**定義の確認**。Minkowski平面 $M=\mathbb R^{1,1}$、$g=-dt^2+dx^2$ で $\tau(t,x)=t$ とします。なぜ時刻座標で非延長曲線を判定できるか、[因果曲線の定義](../LORG3/index.md#def-lorg3-causal-curve)から確認します。未来因果曲線 $\gamma(s)=(t(s),x(s))$ の速度は、ほとんど至る所で

$$
0\ge g(\dot\gamma,\dot\gamma)=-(t')^2+(x')^2,
\qquad t'\ge0
$$

を満たします。従って $|x'|\le t'$ です。時刻が一定の区間では $x'=0$ も成り立ち、その区間の曲線は停留します。停留片を除いた非定数部分では $t$ が厳密増加するので、$t$ をパラメータに選べます。この速度不等式を二時刻 $t_1<t_2$ の間で積分すると

$$
|x(t_2)-x(t_1)|\le t_2-t_1
$$

です。仮に未来非延長曲線の $t$ が有限値 $b$ に近づくなら、上の評価から $x(t)$ もCauchyとなり有限極限 $a$ を持ちます。曲線は $(b,a)\in M$ に終点を持ち、そこから時間的直線を継げるので非延長性に反します。過去側も同様です。従って時刻は全実数を走り、[Minkowskiの全時刻通過補題](../LORG15/index.md#lem-lorg15-full-time)と整合します。連続性・厳密増加・両端発散を一つずつ確認できました。
<!-- definition-example-end -->

「単調」から「全射」への飛躍はできません。連続で厳密増加する関数 $f:I\to\mathbb R$ の値域は区間ですが、例えば $f(s)=\arctan s$ の値域は有界です。さらに、すべての**非空**レベル集合がCauchy面であることと、すべての $c\in\mathbb R$ に対し非空のCauchy面を得ることも区別する必要があります。

## 3. 強い単調性でもCauchy性は失われる

一般の時間関数とCauchy時間関数が違うことは、大域双曲的なMinkowski平面の中だけで確かめられます。滑らかで勾配が時間的という強い条件も、全曲線上の発散を保証しません。

<a id="prop-lorg19-temporal-not-cauchy"></a>

<!-- formal-statement-start -->
> **命題（temporalでもCauchyとは限らない）**  
> Minkowski平面 $(\mathbb R^{1,1},-dt^2+dx^2)$ の関数
>
$$
u(t,x)=t-\sqrt{1+x^2}
$$
>
> は[LORG10のtemporal function](../LORG10/index.md#def-lorg10-time-function)であるが、Cauchy時間関数ではない。
<!-- formal-statement-end -->

### 証明の見取り図

勾配のLorentzノルムを直接調べ、未来因果ベクトルに対する単調性を示します。一方、未来へ無限に進む光線上で $u$ が有限値へ近づくので、ある非空なレベル集合を通りません。

<!-- proof-start -->
### 証明

[temporal functionの定義](../LORG10/index.md#def-lorg10-time-function)では、勾配は $g(\nabla^g u,v)=du(v)$ がすべての接ベクトル $v$ で成立するように決まります。ここでは $g(\partial_t,\partial_t)=-1$、$g(\partial_x,\partial_x)=1$、$g(\partial_t,\partial_x)=0$ です。従って任意の $v=a\partial_t+b\partial_x$ について

$$
du(v)=a-\frac{x}{\sqrt{1+x^2}}b
=g\left(-\partial_t-\frac{x}{\sqrt{1+x^2}}\partial_x,v\right).
$$

従って勾配は過去向きで、その自己内積は

$$
g(\nabla^g u,\nabla^g u)
=-1+\frac{x^2}{1+x^2}
=-\frac1{1+x^2}<0.
$$

ゆえに $u$ はtemporalであり、[temporal functionの厳密単調性](../LORG10/index.md#lem-lorg10-temporal-monotone)から時間関数です。

両側非延長な未来光線 $\gamma(s)=(s,s)$（$s\in\mathbb R$）では

$$
(u\circ\gamma)(s)
=s-\sqrt{1+s^2}
=-\frac{1}{s+\sqrt{1+s^2}}<0,
$$

かつ $s\to+\infty$ で $u(\gamma(s))\to0$ です（分母は正）。他方、$u(2,0)=1$ なので $u^{-1}(1)$ は非空ですが、この光線とは交わりません。全射条件に反するためCauchy時間関数ではありません。$\square$
<!-- proof-end -->

この例で失われたのは**大域双曲性ではなく時計のCauchy性**です。勾配の時間的性質は各点での局所条件、非延長曲線の端での発散は大域条件だからです。

## 4. 大域双曲性から「全時刻を持つ時計」が存在する

[LORG16の大域双曲性](../LORG16/index.md#def-lorg16-global-hyperbolicity)の二条件の下では、有限な滑らかな正密度 $\mu$ により[体積関数](../LORG16/index.md#def-lorg16-volume-functions)

$$
V^-(p)=\mu(I^-(p)),\qquad V^+(p)=\mu(I^+(p))
$$

を作れます。$I^\pm$ は[LORG6の時間的過去・未来](../LORG6/index.md#def-lorg6-chronological-causal-future)です。因果的に未来へ進むと $V^-$ が厳密増加、$V^+$ が厳密減少します。単に一方の体積を使うとその値域は有限区間ですが、**比の対数**は両方向へ発散します。

<a id="thm-lorg19-existence"></a>

<!-- formal-statement-start -->
> **定理（連続Cauchy時間関数の存在）**  
> 滑らかで時間向き付きの大域双曲的Lorentz時空 $(M,g)$ には、連続Cauchy時間関数 $\tau:M\to\mathbb R$ が存在する。具体的に、有限で滑らかな正密度 $\mu$ を任意に選べば
>
$$
\tau(p)=\log\frac{V^-(p)}{V^+(p)}
$$
>
> はそのような関数である。
<!-- formal-statement-end -->

### 証明の見取り図

これは[既習のGeroch型体積時間関数定理](../LORG16/index.md#thm-lorg16-geroch-volume)を、今回の[Cauchy時間関数の定義](#def-lorg19-cauchy-time)で読み替えた帰結です。以下では前提と出力を照合します。

<!-- proof-start -->
### 証明

大域双曲性の強因果性とコンパクトダイヤモンドの条件は、[Geroch型定理](../LORG16/index.md#thm-lorg16-geroch-volume)の仮定に一致します。そこで同定理より $V^\pm$ は正で連続、$\tau$ は連続かつ因果順序について厳密増加します。

さらに未来非延長曲線 $\gamma$ に沿って $p_k=\gamma(s_k)$ を未来端へ共終に選ぶと、同定理の証明では

$$
I^+(p_{k+1})\subset I^+(p_k),\qquad
\bigcap_k I^+(p_k)=\varnothing
$$

を[非閉じ込め補題](../LORG16/index.md#lem-lorg16-nonimprisonment)から得ています。有限測度の上からの連続性で $V^+(p_k)\to0$、かつ $V^-(p_k)\ge V^-(p_1)>0$ だから

$$
\tau(p_k)
=\log V^-(p_k)-\log V^+(p_k)\longrightarrow+\infty.
$$

過去側では $V^-(p_k)\to0$、$V^+(p_k)\ge V^+(p_1)>0$ なので $\tau\to-\infty$ です。曲線に沿う連続性と厳密増加から値域が $\mathbb R$ となります。これは[定義](#def-lorg19-cauchy-time)の追加条件です。$\square$
<!-- proof-end -->

**論理の位置**。滑らかな時間関数が存在することまで示したわけではありません。この構成で得られる $\tau$ は一般に連続としか保証されず、$\nabla^g\tau$ や $\ker d\tau$ をここで書くことはできません。LORG20で扱う滑らかなCauchy temporal functionとは別の段階です。

## 5. すべてのレベルが初期面になる

[LORG15のCauchy面](../LORG15/index.md#def-lorg15-cauchy)は、すべての両側非延長因果曲線と一意に交わる集合でした。Cauchy時間関数の全射性が「少なくとも一度」、厳密増加性が「高々一度」を担います。

<a id="prop-lorg19-level-cauchy"></a>

<!-- formal-statement-start -->
> **命題（Cauchy時間関数の各レベル）**  
> $(M,g)$ 上に連続Cauchy時間関数 $\tau:M\to\mathbb R$ があるとする。任意の実数 $c$ のレベル集合を
>
$$
\Sigma_c=\tau^{-1}(c)
$$
>
> と置けば、$\Sigma_c$ は非空で閉なCauchy面であり、[acausal集合](../LORG12/index.md#def-lorg12-achronal-acausal)である。異なる値のレベル集合は交わらない。
<!-- formal-statement-end -->

### 証明の見取り図

非延長因果曲線上の値域が全実数であることが交点の存在を、厳密単調性が一意性を保証します。閉性は連続性、acausal性は既習のCauchy面の性質で判定します。

<!-- proof-start -->
### 証明

任意の両側非延長未来因果曲線 $\gamma:I\to M$ を固定します。[Cauchy時間関数の定義](#def-lorg19-cauchy-time)より $\tau\circ\gamma:I\to\mathbb R$ は連続で厳密増加し、値域が $\mathbb R$ です。従って各 $c$ についてただ一つ $s_c\in I$ が存在し、

$$
\tau(\gamma(s_c))=c,\qquad
s<s_c\Longrightarrow \tau(\gamma(s))<c,\qquad
s>s_c\Longrightarrow\tau(\gamma(s))>c
$$

です。非延長曲線が少なくとも一つ存在することは、[LORG15のCauchy面の性質の証明](../LORG15/index.md#prop-lorg15-acausal)で使った構成でも分かります。滑らかな未来時間的ベクトル場を完備な補助計量に関して有界な速さに縮め、その両側非延長な積分曲線を取ればよいのです。この曲線にも上の全射性が適用されるので $\Sigma_c$ は非空です。任意の非延長曲線に対する一意交差から[Cauchy面の定義](../LORG15/index.md#def-lorg15-cauchy)を満たします。

$\Sigma_c$ は連続写像 $\tau$ による閉集合 $\{c\}$ の逆像なので閉です。[Cauchy面はacausalかつachronal](../LORG15/index.md#prop-lorg15-acausal)から異なる二点を未来因果曲線で結べません。最後に $c\ne d$ のとき、同一点の $\tau$ 値が同時に二値であることは不可能なので $\Sigma_c\cap\Sigma_d=\varnothing$ です。$\square$
<!-- proof-end -->

## 6. 時間値を取り直せば何が保存されるか

「全レベルが初期面」という性質を保ちながら、時間の数字を変更することができます。ただし値域を有界区間へ押し込むと、先ほどの定義によるCauchy性は失われます。

<a id="prop-lorg19-reparam"></a>

<!-- formal-statement-start -->
> **命題（時間目盛りの変更）**  
> $\tau:M\to\mathbb R$ が連続Cauchy時間関数、$f:\mathbb R\to\mathbb R$ が厳密増加する連続関数とする。$f\circ\tau$ は時間関数であり、これがCauchy時間関数となるための必要十分条件は $f(\mathbb R)=\mathbb R$ である。このとき
>
$$
(f\circ\tau)^{-1}(f(c))=\tau^{-1}(c)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

因果単調性は関数の合成で保たれます。非延長曲線では $\tau$ の値域が $\mathbb R$ なので、合成の値域はちょうど $f(\mathbb R)$ です。

<!-- proof-start -->
### 証明

$p\le q$、$p\ne q$ なら $\tau(p)<\tau(q)$ です。$f$ の厳密増加性から $f(\tau(p))<f(\tau(q))$ となり、合成は連続な時間関数です。任意の両側非延長 $\gamma$ について

$$
(f\circ\tau\circ\gamma)(I)
=f\big((\tau\circ\gamma)(I)\big)
=f(\mathbb R).
$$

従って全射性は $f(\mathbb R)=\mathbb R$ と同値です。最後に $f$ の単射性から、$f(\tau(p))=f(c)$ と $\tau(p)=c$ は同値です。$\square$
<!-- proof-end -->

Minkowskiの $t$ に対して $f(s)=s+s^3$ を選べばCauchy時間関数のままです。一方 $f(s)=\arctan s$ は厳密増加で全レベルの**非空切片**は依然Cauchy面ですが、値域は $(-\pi/2,\pi/2)$ に限られます。「全時刻の座標」を要求する定義に対してはCauchy時間関数ではありません。

## 7. 連続な時計から位相的に時空を分ける

定義と定理の結論から、空間を固定した「各点を時間方向へ運ぶ」モデルを作れます。ここで**位相的超曲面**とは、各点の近傍で適切な局所座標 $(s,y^1,\ldots,y^n)$ を選んだとき、$s=\sigma(y)$ という連続関数のグラフとして表せる部分集合です。滑らかな接空間があるとはまだ仮定しません。目指すのは微分幾何学的な計量分解ではなく、まず**位相空間としての積**です。

[LORG2の大域的未来時間的ベクトル場](../LORG2/index.md#thm-lorg2-time-orientability) $Y$ を選びます。[LORG14の補助Riemann計量の導入](../LORG14/index.md#def-lorg14-h-arclength)で確認したとおり、滑らかな第二可算多様体では完備な補助Riemann計量を選べるので、それを $h$ とします。未来時間的ベクトル場を次のように正の関数倍で縮めます。

$$
X=\frac{Y}{1+|Y|_h},
\qquad |X|_h=\frac{|Y|_h}{1+|Y|_h}<1.
$$

[LORG15のCauchy面とacausal性の証明](../LORG15/index.md#prop-lorg15-acausal)にあるように、有限のパラメータ区間上で積分曲線が走る $h$-距離はその区間長以下です。[Hopf–Rinow定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)により、$X$ の流れ $\Phi_s$ はすべての実数パラメータに存在します。

ただし無限の流れパラメータだけで非延長性が得られるとは限りません。$X$ はどの点でも非零です。仮に流線が未来に点 $q$ へ収束すれば、$q$ 近傍の座標の一成分で $dz_q(X_q)>0$ となるものを選べます。流線に沿う $z$ の増分が下から正の定数で抑えられ、$z$ の収束に矛盾します。過去側も同じ議論で、流線は両側非延長です。

<a id="thm-lorg19-topological-splitting"></a>

<!-- formal-statement-start -->
> **定理（連続Cauchy時間関数による位相的分割）**  
> 滑らかな時間向き付きLorentz時空 $(M,g)$ に連続Cauchy時間関数 $\tau$ があるとする。$\Sigma=\tau^{-1}(0)$ とおけば、$\Sigma$ は閉なacausal位相的超曲面であり、同相写像
>
$$
F:\mathbb R\times\Sigma\longrightarrow M
$$
>
> が存在して、任意の $(c,p)$ に対し $\tau(F(c,p))=c$ となる。特にすべてのレベル集合は $\Sigma$ と同相である。
<!-- formal-statement-end -->

### 証明の見取り図

上の完全な時間的ベクトル場 $X$ の流線は各レベルと一回ずつ交差します。点 $p\in\Sigma$ を固定し、流線上で時刻値 $c$ を取る唯一の流れパラメータを $u(c,p)$ とします。これが連続であることを厳密単調性と挟み撃ちで確認します。

<!-- proof-start -->
### 証明

$H(s,p)=\tau(\Phi_s(p))$ とおきます。流れの連続性と $\tau$ の連続性から $H$ は連続です。各 $p$ について流線 $s\mapsto\Phi_s(p)$ は両側非延長未来時間的曲線なので、[Cauchy時間関数の定義](#def-lorg19-cauchy-time)により $s\mapsto H(s,p)$ は $\mathbb R$ から $\mathbb R$ への厳密増加全射です。従って各 $(c,p)$ に対し

$$
H(u(c,p),p)=c
$$

を満たす実数 $u(c,p)$ がただ一つ存在します。

ここで連続性を証明します。$(c_0,p_0)$ で $u_0=u(c_0,p_0)$ とし、$\varepsilon>0$ を任意に取ります。厳密増加性から

$$
H(u_0-\varepsilon,p_0)<c_0<H(u_0+\varepsilon,p_0)
$$

です。$H$ の連続性により、$(c,p)$ が $(c_0,p_0)$ に十分近ければ同じ不等式の中央を $c$、$p_0$ を $p$ として保てます。$H(\,\cdot\,,p)$ の厳密増加性から

$$
u_0-\varepsilon<u(c,p)<u_0+\varepsilon
$$

を得ます。$\varepsilon$ は任意なので $u$ は連続です。

そこで $F(c,p)=\Phi_{u(c,p)}(p)$ と定めます。$F$ は連続で $\tau(F(c,p))=c$ です。任意の $x\in M$ の流線には $\Sigma$ との唯一の交点があるので、ある一意の $s(x)\in\mathbb R$ により $p(x)=\Phi_{-s(x)}(x)\in\Sigma$ となります。逆向きの流れで時刻零に戻る条件を

$$
K(s,x):=\tau(\Phi_{-s}(x)),\qquad K(s(x),x)=0
$$

と書きます。固定した $x$ に対し $s\mapsto K(s,x)$ は連続で厳密減少し、その値域は $\mathbb R$ です。任意の $x_0$ で $s_0=s(x_0)$ とし、$\varepsilon>0$ を取れば

$$
K(s_0-\varepsilon,x_0)>0>K(s_0+\varepsilon,x_0).
$$

$K$ の連続性により $x$ が $x_0$ に近いときにも両側の不等式は保たれます。厳密減少性と $K(s(x),x)=0$ から

$$
s_0-\varepsilon<s(x)<s_0+\varepsilon
$$

となり、$s(x)$ は連続です。従って

$$
F^{-1}(x)=\big(\tau(x),p(x)\big)
=\big(\tau(x),\Phi_{-s(x)}(x)\big)
$$

は連続です。$F$ は全単射で連続な逆写像を持つので同相です。

最後に $\Sigma_c=\tau^{-1}(c)$ の任意の点 $p$ で、非零で滑らかな $X$ の流れに沿う局所座標 $(s,y)$ を取ります。ここで $y$ は $X_p$ に横断的な空間座標です。

$p$ を通る流線の時刻 $s=0$ で $\tau=c$ となり、十分小さい $\varepsilon>0$ に対して

$$
\tau(-\varepsilon,y_p)<c<\tau(\varepsilon,y_p)
$$

です。連続性により、近い $y$ に対してもこの両側の不等式が成り立ちます。各固定 $y$ に対し $\tau(s,y)$ は厳密増加なので、零点 $s=\sigma(y)$ は存在して一意です。前段と同じ挟み撃ちで $\sigma$ は連続となり、$\Sigma_c$ は局所連続グラフです。閉性とacausal性は[各レベルの命題](#prop-lorg19-level-cauchy)に従います。$\square$
<!-- proof-end -->

ここでは $F$ が同相であると示しただけです。$\tau$ が滑らかとは限らず、$F$ が微分同相、$\Sigma$ が滑らかな空間的超曲面、あるいは計量が $-\,\beta\,d\tau^2+h_\tau$ と書けるとは**まだ主張できません**。LORG20ではBernal–Sánchezの滑らか化定理を用いて、この差を埋めます。

## 8. 時刻帯は再目盛りで全実数へ直せる

$M=(0,1)_t\times\mathbb R_x$ に制限したMinkowski計量を考えます。この時空でも、未来非延長曲線は $t\uparrow1$、過去非延長曲線は $t\downarrow0$ です。なぜなら $|dx/dt|\le1$ であるため、$t$ が $(0,1)$ 内の有限値で止まれば $x$ も極限を持ち、曲線を時空内へ延長できるからです。

$t$ 自体は連続な時間関数で、$t=c$（$0<c<1$）はCauchy面ですが、値域が $(0,1)$ なので本講の定義ではCauchy時間関数ではありません。代わりに

$$
\tau(t,x)=\log\frac{t}{1-t}
$$

は過去端で $-\infty$、未来端で $+\infty$ となり、Cauchy時間関数です。$t$-切片と $\tau$-切片は同じ集合族であり、値域の全射性と切片の幾何は区別すべきだと分かります。時刻帯の両端は多様体に含まれず、測地完備性を新たに保証したわけでもありません。

## 9. 演習と詳細解答

各問では、連続性・厳密増加・非延長曲線上の全射性のどれを確認しているかを明示してください。

<a id="ex-lorg19-a01"></a>
### LORG19-A01 Minkowskiの時計と因果錐
- Level: A

Minkowski平面 $M=\mathbb R^{1,1}$ に $g=-dt^2+dx^2$ を入れる。$t$ がCauchy時間関数であることを、速度不等式と非延長性から示せ。

<!-- solution-start -->
**詳細解答**。[因果曲線の定義](../LORG3/index.md#def-lorg3-causal-curve)から、未来因果速度は $t'\ge|x'|$ を満たします。停留片を除けば $t$ は厳密増加します。任意の二つの時刻で積分すれば

$$
|x(t_2)-x(t_1)|\le t_2-t_1
\qquad(t_1<t_2)
$$

を得ます。もし未来端で $t\to b<+\infty$ なら、二つの時刻がともに $b$ に近いとき、その時刻差は任意に小さくなります。上の距離評価により、対応する $x$ の値の差も任意に小さいため、$x(t)$ はCauchyで $x\to a$ です。$(b,a)$ は時空内の点なので曲線を未来へ延長でき、非延長性に反します。

過去側では同じ不等式を時間反転して、時刻が $-\infty$ へ向かうことを示します。未来端は $+\infty$ なので、時刻の値域は $\mathbb R$ です。連続性も満たし、[定義](#def-lorg19-cauchy-time)の全条件が成立します。
<!-- solution-end -->

<a id="ex-lorg19-a02"></a>
### LORG19-A02 勾配の符号を調べる
- Level: A

$u=t-\sqrt{1+x^2}$ の勾配とLorentzノルムを計算し、temporal性だけではCauchy性が従わないことを示せ。

<!-- solution-start -->
**詳細解答**。まず $du=dt-x(1+x^2)^{-1/2}dx$ と $g^{tt}=-1$、$g^{xx}=1$ から

$$
\nabla^g u=-\partial_t-\frac{x}{\sqrt{1+x^2}}\partial_x,
\qquad
g(\nabla^g u,\nabla^g u)=-\frac1{1+x^2}<0
$$

です。勾配の時間成分が負なので過去時間的です。よって[temporal functionの厳密単調性](../LORG10/index.md#lem-lorg10-temporal-monotone)が適用できます。

一方、両側非延長の未来光線 $\gamma(s)=(s,s)$ に沿って

$$
(u\circ\gamma)(s)=s-\sqrt{1+s^2}
=-\frac1{s+\sqrt{1+s^2}}\longrightarrow0
\quad(s\to+\infty)
$$

です。$u(2,0)=1$ でレベル $u=1$ は非空ですが、この光線とは交わりません。[Cauchy性](#def-lorg19-cauchy-time)を欠きます。
<!-- solution-end -->

<a id="ex-lorg19-a03"></a>
### LORG19-A03 全実数への時間目盛り
- Level: A

$\tau$ がCauchy時間関数のとき、$\sigma=\tau+\tau^3$ がCauchy時間関数であり、$\sigma^{-1}(0)=\tau^{-1}(0)$ であることを示せ。

<!-- solution-start -->
**詳細解答**。$f(s)=s+s^3$ は $f'(s)=1+3s^2>0$ だから厳密増加で連続です。$s\to\pm\infty$ で $f(s)\to\pm\infty$ となり、中間値の定理により $f(\mathbb R)=\mathbb R$ です。[時間目盛り変更命題](#prop-lorg19-reparam)を $f$ に適用すれば $\sigma$ はCauchy時間関数。$f(s)=0$ は $s(1+s^2)=0$ から $s=0$ のみなので零レベルは一致します。
<!-- solution-end -->

<a id="ex-lorg19-a04"></a>
### LORG19-A04 有界時刻帯の補正
- Level: A

$(0,1)\times\mathbb R$ で $t$ が時間関数だが本講のCauchy時間関数ではない理由を述べ、$\sigma=\log(t/(1-t))$ の全射性を確かめよ。

<!-- solution-start -->
**詳細解答**。未来因果曲線に沿って $t$ は厳密増加しますが、$t$ の値域は $(0,1)$ なので $\mathbb R$ への全射ではありません。非延長曲線の両端で $t\to0,1$ となる理由は、$|dx/dt|\le1$ から $(0,1)$ 内の有限端点をもつ曲線なら $x$ も極限を持ち、延長可能になることです。$f(t)=\log(t/(1-t))$ の導関数は $1/t+1/(1-t)>0$、端点の極限は $-\infty,+\infty$。従って $\sigma$ は連続・厳密増加・各非延長曲線上で全射となります。
<!-- solution-end -->

<a id="ex-lorg19-a05"></a>
### LORG19-A05 比の対数が必要な理由
- Level: A

未来非延長曲線上で $V^+(p_k)\to0$、$V^-(p_k)\ge a>0$ なら、$\log(V^-(p_k)/V^+(p_k))\to+\infty$ を示せ。$V^-$ だけではなぜ全射の結論に足りないか。

<!-- solution-start -->
**詳細解答**。$V^-(p_k)/V^+(p_k)\ge a/V^+(p_k)\to+\infty$ なので対数も $+\infty$ へ発散します。一方 $0<V^-(p_k)\le\mu(M)<\infty$ ですから $V^-$ の値だけを時刻として使えば全時刻値域 $\mathbb R$ は得られません。[体積時間関数定理](../LORG16/index.md#thm-lorg16-geroch-volume)は未来で分母を零へ、過去で分子を零へ近づけることで両端の発散を実現します。
<!-- solution-end -->

<a id="ex-lorg19-b01"></a>
### LORG19-B01 各レベルの一意交差
- Level: B

連続Cauchy時間関数の各レベルが非空のCauchy面となることを、全射性と厳密単調性を分けて証明せよ。

<!-- solution-start -->
**詳細解答**。非延長未来因果曲線 $\gamma:I\to M$ を任意に固定します。[Cauchy時間関数の定義](#def-lorg19-cauchy-time)により、$\tau\circ\gamma$ の値域は $\mathbb R$ です。よって任意の $c$ に対してある $s_c$ が存在して

$$
\tau(\gamma(s_c))=c.
$$

さらに $s_1<s_2$ なら $\tau(\gamma(s_1))<\tau(\gamma(s_2))$ なので、二つの交点はありません。各非延長曲線と一度だけ交わり、[Cauchy面の定義](../LORG15/index.md#def-lorg15-cauchy)を満たします。

連続性から $\tau^{-1}(c)$ は閉集合です。[Cauchy面はacausalかつachronal](../LORG15/index.md#prop-lorg15-acausal)という既習命題を適用すれば、acausal性も従います。
<!-- solution-end -->

<a id="ex-lorg19-b02"></a>
### LORG19-B02 全レベルが初期面でも値域は問題になる
- Level: B

Minkowski平面の $\sigma(t,x)=\arctan t$ について、厳密増加性、非空レベル集合のCauchy性、本講の定義でのCauchy時間関数かどうかを区別せよ。

<!-- solution-start -->
**詳細解答**。$d\sigma/dt=1/(1+t^2)>0$、かつ非定数未来因果曲線では $t$ が厳密増加するので $\sigma$ も時間関数です。$c\in(-\pi/2,\pi/2)$ なら $\sigma^{-1}(c)=\{t=\tan c\}$ で、[MinkowskiのCauchy面の定義例](../LORG15/index.md#def-lorg15-cauchy)と同じ時刻切片だからCauchy面です。しかし $\sigma(\mathbb R^{1,1})=(-\pi/2,\pi/2)$ で、各非延長曲線上の値域も $\mathbb R$ でないため、[本講の定義](#def-lorg19-cauchy-time)ではCauchy時間関数ではありません。
<!-- solution-end -->

<a id="ex-lorg19-b03"></a>
### LORG19-B03 交差パラメータの連続性
- Level: B

$H:\mathbb R\times S\to\mathbb R$ が連続で、各 $p\in S$ について $H(\,\cdot\,,p)$ が厳密増加全射とする。$H(u(c,p),p)=c$ を満たす $u$ が連続であることを示せ。

<!-- solution-start -->
**詳細解答**。厳密増加全射なので各 $(c,p)$ に一意の $u(c,p)$ が存在します。$(c_0,p_0)$ に対する値を $u_0$ とし、$\varepsilon>0$ に対して $H(u_0-\varepsilon,p_0)<c_0<H(u_0+\varepsilon,p_0)$ を取ります。$H$ の連続性により $(c,p)$ が十分近ければ $H(u_0-\varepsilon,p)<c<H(u_0+\varepsilon,p)$ です。$H(\,\cdot\,,p)$ の単調性から $u_0-\varepsilon<u(c,p)<u_0+\varepsilon$。任意の $\varepsilon$ で成立するから $u(c,p)\to u_0$ です。これが[位相的分割定理](#thm-lorg19-topological-splitting)の核心です。
<!-- solution-end -->

<a id="ex-lorg19-b04"></a>
### LORG19-B04 完全な時間的ベクトル場を作る
- Level: B

完全な補助Riemann計量 $h$ と滑らかな未来時間的場 $Y$ から $X=Y/(1+|Y|_h)$ を作る。$X$ の流線が全実数パラメータで存在する理由と、パラメータが無限であるだけでは非延長性を証明したことにならない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$Y$ の正の関数倍である $X$ は未来時間的で、補助計量の速さは

$$
|X|_h=\frac{|Y|_h}{1+|Y|_h}<1
$$

です。積分曲線 $c:[0,b)\to M$ が有限の $b$ で止まると仮定すると、

$$
d_h(c(s),c(0))\le\int_0^s|X|_h\,du\le b
$$

となります。[Hopf–Rinow定理](../../GEO/GEO15/index.md#thm-geo15-hopf-rinow)からこの閉球はコンパクトなので局所ODEを延長でき、最大存在端点が $b$ であることに反します。過去向きも同じです。

しかし全実数パラメータの存在だけでは、流線が無限パラメータで時空内の終点へ収束する可能性をまだ排除していません。$c(s)\to q$ を仮定すると、$X_q\ne0$ から $dz_q(X_q)>0$ となる局所座標関数 $z$ を取れます。連続性によって十分大きい $s$ で

$$
\frac{d}{ds}z(c(s))\ge\delta>0
$$

となり、積分すると $z(c(s))\to+\infty$ ですが、同時に $z(c(s))\to z(q)$ のはずなので矛盾です。過去端にも同じ論法を適用して両側非延長性を得ます。
<!-- solution-end -->

<a id="ex-lorg19-c01"></a>
### LORG19-C01 連続Cauchy時計から位相的分割へ
- Level: C

$(M,g)$ を滑らかな大域双曲的時間向き付きLorentz時空とする。次を示せ。

1. 連続Cauchy時間関数の存在。
2. 任意の実数レベルのCauchy性。
3. あるレベル $\Sigma$ と $\mathbb R\times\Sigma$ の同相。
4. これらから滑らかな直交計量分割はまだ従わない理由。

<!-- solution-start -->
**詳細解答**。(1) [Geroch型体積時間関数](../LORG16/index.md#thm-lorg16-geroch-volume)の仮定は大域双曲性と一致します。$\tau=\log(V^-/V^+)$ は連続で因果順序上厳密増加、未来非延長曲線で $V^+\to0$、過去非延長曲線で $V^-\to0$ です。正のもう一方を下から抑えれば $\tau\to+\infty$ と $\tau\to-\infty$ が従い[定義](#def-lorg19-cauchy-time)を満たします。

(2) $\gamma$ を任意の両側非延長因果曲線とすると $\tau\circ\gamma$ は連続な厳密増加全射です。任意の $c$ の原像は一点なので $\Sigma_c=\tau^{-1}(c)$ は各 $\gamma$ と一度だけ交わります。従って[各レベルの命題](#prop-lorg19-level-cauchy)から閉なacausal Cauchy面です。

(3) 完全な補助計量 $h$ と未来時間的場 $Y$ を選び $X=Y/(1+|Y|_h)$ とすると、有限時間での流線の逃避が起きず、流れ $\Phi_s$ は全実数で定義されます。$X$ は非零なので、流線が $s\to+\infty$ で点 $q$ に収束すると仮定すると、$dz_q(X_q)>0$ となる局所座標成分 $z$ に対して十分大きい $s$ で $(z\circ\Phi_s)'\ge\delta>0$ となり、$z(\Phi_s)\to z(q)$ に反します。過去側も同じで、両側非延長性が確認できました。

$\Sigma=\Sigma_0$ とし、各 $p\in\Sigma$ の流線で $\tau(\Phi_{u(c,p)}(p))=c$ を満たす $u$ を一意に取ります。$\varepsilon>0$ について

$$
\tau(\Phi_{u_0-\varepsilon}(p_0))<c_0<
\tau(\Phi_{u_0+\varepsilon}(p_0))
$$

を使う挟み撃ちで $u$ は連続です。$F(c,p)=\Phi_{u(c,p)}(p)$ は全単射で、逆写像は各 $x$ をその流線上の唯一の $\Sigma$ 交点へ戻すことで定まり、同じ挟み撃ちで連続です。従って $F:\mathbb R\times\Sigma\to M$ は同相です。

(4) 得られた $\tau$ と $\Sigma$ の正則性は連続と位相的でしかありません。$d\tau$、時間的勾配、滑らかな接超平面はまだ定義できず、$g=-\beta\,d\tau^2+h_\tau$ の式は導けません。滑らか化に別の議論が必要であり、この区別が次章の出発点です。
<!-- solution-end -->

## 10. この章で得た構造

大域双曲性から[連続Cauchy時間関数](#thm-lorg19-existence)を得て、全実数の各レベルに[Cauchy面](#prop-lorg19-level-cauchy)を置き、[位相的な積分割](#thm-lorg19-topological-splitting)まで到達しました。これで時空を「各瞬間の空間」と「その順序」に分けられます。しかしこの時計を微分して波動方程式の法線方向を作れるかは未解決です。LORG20では滑らかなCauchy temporal functionと直交分割を扱います。
