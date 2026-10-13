# VAR3 平面曲線の変分

[VAR1の第一変分](../VAR1/index.md#def-var1-first-variation)では関数のグラフを動かし、[VAR2の第二変分](../VAR2/index.md#def-var2-second-variation)では停留曲線が本当に最小かを検査しました。しかし、輪ゴムの形や針金の曲がり方を考えると、グラフ表示だけでは不十分です。鉛直接線を持つ円を一つのグラフにできないからです。

曲線そのものを平面内で動かすと、長さの第一変分には曲率が現れます。さらに曲率の二乗を積分すると、曲線の**曲がりやすさ**を測る弾性エネルギーができ、その停留方程式には曲率の二階微分が現れます。本章の中心は、符号・端点・変分方向を明記して、この二つの計算を最初からつなぐことです。

## 1. 弧長と符号付き曲率を固定する

[弧長パラメータへの再表示](../../../幾何系/GEO/GEO10/index.md#thm-geo10-arc-length-reparam)によって、正則な平面曲線は弧長で記述できます。以降は $L>0$ とし、$\gamma:[0,L]\to\mathbb R^2$ は $C^4$ 級の単位速曲線、すなわち $|\gamma'(s)|=1$ とします。曲線の端点が一致する場合には、必要な階数の導関数も一致する滑らかな閉曲線とします。

通常の非負曲率だけでは、左へ曲がるか右へ曲がるかを区別できません。そこで、反時計回りに $90^\circ$ 回す線形写像 $J(x,y)=(-y,x)$ を使い、左法線を採用します。

<a id="def-var3-signed-curvature"></a>
<!-- formal-statement-start -->
> **定義（符号付き曲率と接線・法線分解）**  
> $C^2$ 級の単位速平面曲線 $\gamma$ について
>
$$
T=\gamma',\qquad n=JT,\qquad \kappa=\det(T,T')=T'\cdot n
$$
>
> と定め、$\kappa$ を符号付き曲率と呼ぶ。曲線に沿う任意の $C^2$ ベクトル値の変分方向 $\eta$ は、一意に $\eta=fT+gn$ と書ける。$f=\eta\cdot T$ を接線成分、$g=\eta\cdot n$ を法線成分と呼ぶ。
<!-- formal-statement-end -->

$T\cdot T=1$ の微分から $T'\cdot T=0$ です。$T,n$ が正規直交基底なので、ある実数 $\kappa$ に対して $T'=\kappa n$、さらに $n'=JT'=-\kappa T$ となります。[GEO10の曲率](../../../幾何系/GEO/GEO10/index.md#def-geo10-frenet)の大きさが $|\kappa|$ です。曲率がゼロになる点でも、上の符号付き定義と左法線は使えます。

<!-- definition-example-start: def-var3-signed-curvature -->
**定義の確認**。反時計回りの円を
$$
\gamma(s)=R(\cos(s/R),\sin(s/R)),\qquad 0\le s\le2\pi R
$$
とすると、$T=(-\sin(s/R),\cos(s/R))$、$n=(-\cos(s/R),-\sin(s/R))$ です。$T'=n/R$ なので $\kappa=1/R>0$、左法線は円の内側を向きます。向きを逆転させると符号付き曲率は $-1/R$ です。
<!-- definition-example-end -->

曲線族 $\gamma_\varepsilon=\gamma+\varepsilon\eta$ の長さ、曲率を計算するとき、$s$ は**元の曲線の弧長**として固定します。変形後の曲線は一般に単位速ではありません。ここを混同すると曲率の変分に欠けた項が現れます。

## 2. 速度要素と曲率を動かす

$\eta=fT+gn$ とすると、[上の接線・法線の微分式](#def-var3-signed-curvature)から
$$
\begin{aligned}
\eta'&=f'T+f\kappa n+g'n-g\kappa T\\
&=(f'-\kappa g)T+(g'+\kappa f)n.
\end{aligned}
$$
簡単のため
$$
a=f'-\kappa g,\qquad b=g'+\kappa f
$$
と置きます。$a$ は速度の大きさの一次変化、$b$ は接線が回る角度の一次変化に対応します。

<a id="prop-var3-speed-curvature"></a>
<!-- formal-statement-start -->
> **命題（速度要素と曲率の第一変分）**  
> $C^4$ 単位速平面曲線 $\gamma$ と $C^2$ ベクトル場 $\eta=fT+gn$ を考える。十分小さい $|\varepsilon|$ で $\gamma_\varepsilon=\gamma+\varepsilon\eta$ が正則であるとする。$v_\varepsilon=|\gamma_\varepsilon'|$、$\kappa_\varepsilon=\det(\gamma_\varepsilon',\gamma_\varepsilon'')/|\gamma_\varepsilon'|^3$ と定めると
>
$$
\left.\partial_\varepsilon v_\varepsilon\right|_0=f'-\kappa g,
\qquad
\left.\partial_\varepsilon\kappa_\varepsilon\right|_0
=g''+\kappa^2g+\kappa'f.
$$
>
> 特に法線変分 $\eta=gn$ では $\delta(ds)=-\kappa g\,ds$、$\delta\kappa=g''+\kappa^2g$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\gamma_\varepsilon'=T+\varepsilon(aT+bn)$ を微分します。速度はその長さ、曲率は行列式を速度の三乗で割った量です。**分母の微分による $-3\kappa a$** を落とさないようにします。

<!-- proof-start -->
### 証明

微分式 $T'=\kappa n,\ n'=-\kappa T$ から
$$
\begin{aligned}
\gamma_\varepsilon'&=(1+\varepsilon a)T+\varepsilon bn,\\
\gamma_\varepsilon''&=\{\varepsilon(a'-\kappa b)\}T+
\{\kappa+\varepsilon(b'+\kappa a)\}n.
\end{aligned}
$$
よって
$$
v_\varepsilon^2=(1+\varepsilon a)^2+\varepsilon^2b^2,
\qquad
\partial_\varepsilon v_\varepsilon|_0=a.
$$
$\det(T,n)=1$ を使って分子を展開すると
$$
\begin{aligned}
\det(\gamma_\varepsilon',\gamma_\varepsilon'')
&=(1+\varepsilon a)\{\kappa+\varepsilon(b'+\kappa a)\}
-\varepsilon^2b(a'-\kappa b)\\
&=\kappa+\varepsilon(b'+2\kappa a)+O(\varepsilon^2).
\end{aligned}
$$
一方、$v_\varepsilon^{-3}=1-3\varepsilon a+O(\varepsilon^2)$ です。従って
$$
\delta\kappa=b'+2\kappa a-3\kappa a=b'-\kappa a.
$$
$a=f'-\kappa g$、$b=g'+\kappa f$ を代入して
$$
b'-\kappa a
=g''+\kappa'f+\kappa f'-\kappa f'+\kappa^2g
=g''+\kappa^2g+\kappa'f.
$$
最後に、変形後の線素は $ds_\varepsilon=v_\varepsilon ds$ なので $\delta(ds)=a\,ds$ です。
<!-- proof-end -->

定数 $g=c>0$ で円を内側へ押すと、半径は $R-\varepsilon c$ です。上の式は $\delta\kappa=c/R^2$ を与え、$1/(R-\varepsilon c)$ の微分と一致します。符号検査には、円が最も手軽な試験台です。

## 3. 長さの第一変分と自由端点

曲線の長さを $L[\gamma]=\int_0^L|\gamma'|ds$ と書きます。積分区間の記号 $L$ は元の長さであり、汎関数は角括弧で区別します。[前節の速度の変分](#prop-var3-speed-curvature)を積分すると、内部の曲率項と端点項が分かれます。

<a id="prop-var3-length-first"></a>
<!-- formal-statement-start -->
> **命題（平面曲線の長さの第一変分）**  
> 正則な $C^2$ 単位速曲線 $\gamma:[0,L]\to\mathbb R^2$ と $C^2$ 変分場 $\eta=fT+gn$ について
>
$$
\delta L[\gamma;\eta]
=[f]_0^L-\int_0^L\kappa g\,ds
=[T\cdot\eta]_0^L-\int_0^L\kappa n\cdot\eta\,ds.
$$
>
> 固定端点では $\eta(0)=\eta(L)=0$ なので境界項が消える。閉曲線かつ周期的な変分でも境界項が消える。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|\gamma_\varepsilon'|$ は $\varepsilon=0$ の近くで正であり、閉区間上で滑らかに微分できるため積分と微分を交換できます。[速度要素の公式](#prop-var3-speed-curvature)から
$$
\delta L=\int_0^L(f'-\kappa g)\,ds
=f(L)-f(0)-\int_0^L\kappa g\,ds.
$$
$\eta\cdot T=f$ を代入すれば二つ目の表示です。固定端点のとき $f=0$、閉曲線で周期的な $\eta$ のとき両端の $f$ が等しいので、それぞれ端点項はゼロです。
<!-- proof-end -->

**固定端点で何が起きるか**。全ての法線方向 $g$ について停留すると $\int\kappa g=0$ です。[変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を内部に台を持つ $g$ へ適用すると $\kappa=0$、すなわち $\gamma''=0$ です。従って停留曲線は直線です。ただし最短性は別途
$$
L[\gamma]=\int_0^L|\gamma'|ds
\ge\left|\int_0^L\gamma'ds\right|
=|\gamma(L)-\gamma(0)|
$$
で検証でき、直線線分が等号を達成します。

**端点が動けると何が違うか**。内部の $\kappa=0$ だけでは停留条件は完成しません。端点を滑らかな支持曲線 $C_0,C_1$ 上に限定するなら、端点変位は各支持曲線の接線に沿います。端点項 $T(L)\cdot\eta(L)-T(0)\cdot\eta(0)$ が全許容端点変位でゼロになるには、各端点の $T$ が支持曲線の接線に直交する必要があります。これは自由端点の横断条件です。

<a id="thm-var3-free-endpoint"></a>
<!-- formal-statement-start -->
> **定理（長さ問題の自由端点条件）**  
> $C^2$ 正則平面曲線の長さを停留させ、端点 $\gamma(0),\gamma(L)$ をそれぞれ滑らかな支持曲線 $C_0,C_1$ 上で自由に動かせるとする。内部と端点で独立な $C^2$ 許容変分が取れるなら、停留性の必要条件は
>
$$
\kappa(s)=0\quad(0<s<L),\qquad
T(0)\perp T_{\gamma(0)}C_0,\quad
T(L)\perp T_{\gamma(L)}C_1.
$$
>
> 逆に、これらを満たす曲線の第一変分は全許容方向でゼロとなる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

両端に台を持たない法線変分を[長さの第一変分](#prop-var3-length-first)に代入すると、全てのそのような $g$ に対して $\int_0^L\kappa g\,ds=0$ です。この式へ[変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を適用して $\kappa=0$ を得ます。この条件を第一変分へ戻すと、残りは $T(L)\cdot\eta(L)-T(0)\cdot\eta(0)$ です。一方の端点変位をゼロ、他方を支持曲線の任意の接ベクトルにすると、各内積が独立にゼロであることが必要です。逆に内部項と二つの端点内積がゼロなら、すべての許容変分に対して $\delta L=0$ です。
<!-- proof-end -->

もし端点が平面内を全く自由に動くなら、端点変位も任意になり $T(0)=T(L)=0$ を要求します。これは $|T|=1$ と矛盾します。**正則な長さの停留曲線は、両端が完全自由な問題には存在しません**。境界条件を省くと見落としやすい結論です。

## 4. 面積を保つ閉曲線：なぜ円が出るのか

滑らかな単純閉曲線を反時計回りにたどり、その内部の符号付き面積を考えます。面積は
$$
A[\gamma]=\frac12\int_0^L\det(\gamma,\gamma')\,ds
$$
で定めます。パラメータを変えても値は同じです。この式は平面の面積公式に一致します。

<a id="prop-var3-area-first"></a>
<!-- formal-statement-start -->
> **命題（閉曲線の面積の第一変分）**  
> 周期的な $C^2$ 変分 $\eta=fT+gn$ の下で、滑らかな単純閉曲線の符号付き面積は
>
$$
\delta A[\gamma;\eta]=\int_0^L\det(\eta,T)\,ds
=-\int_0^L g\,ds
$$
>
> を満たす。ただし $n=JT$ は左法線であり、反時計回りの曲線では内向き法線である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積分範囲は元の周期パラメータのままとし、行列式を微分すると
$$
\delta A=\frac12\int_0^L
\{\det(\eta,\gamma')+\det(\gamma,\eta')\}\,ds.
$$
第二項を部分積分すると
$$
\int_0^L\det(\gamma,\eta')ds
=[\det(\gamma,\eta)]_0^L-\int_0^L\det(\gamma',\eta)ds.
$$
閉曲線と周期的変分から境界項はゼロです。また $\det(\gamma',\eta)=-\det(\eta,\gamma')$ なので
$$
\delta A=\int_0^L\det(\eta,T)ds.
$$
$\eta=fT+gn$、$\det(T,T)=0$、$\det(n,T)=-1$ より $\delta A=-\int g\,ds$ です。
<!-- proof-end -->

周長を面積一定で最小化するなら、$g$ の平均ゼロが面積を一次まで保つ条件です。しかし**一次の拘束**と、変形後も面積が**厳密に一定**という条件は違います。[VAR1の正則拘束に対する乗数構成](../VAR1/index.md#thm-var1-multiplier)と同様、$\delta A$ がゼロでない補正方向を使えば、任意の一次拘束方向を厳密に面積一定な曲線族へ補正できます。ここでは $g\equiv1$ に対して $\delta A=-L\ne0$ なので正則性が確かめられます。

<a id="thm-var3-isoperimetric-stationary"></a>
<!-- formal-statement-start -->
> **定理（面積拘束下での周長の停留条件）**  
> $C^4$ 級の正則な単純閉曲線 $\gamma$ を反時計回りにたどり、囲む面積 $A[\gamma]=A_0>0$ を固定する。十分滑らかな全ての面積保存変形について周長が停留するなら、符号付き曲率 $\kappa$ は定数である。従って曲線は円である。逆に円は面積拘束下で周長の第一変分がゼロになる。
<!-- formal-statement-end -->

### 証明の見取り図

面積の一次拘束は $\int g=0$ です。その全方向で周長の一次変分がゼロなら $\kappa$ は定数しかあり得ません。定数曲率の微分方程式を解くと円になります。ここでは停留性を示すのであって、**円の大域最小性はまだ主張していません**。

<!-- proof-start -->
### 証明

任意の滑らかな周期的 $g$ で $\int_0^Lgds=0$ とします。例えば補正方向 $h\equiv1$ を用いた二変数族
$$
\Gamma_{t,u}(s)=\gamma(s)+(tg(s)+u)n(s)
$$
に対して面積拘束 $A[\Gamma_{t,u}]=A_0$ を考えます。$u$ による偏微分は $-L\ne0$ なので[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)から $u=u(t)$ が取れます。[面積の第一変分](#prop-var3-area-first)により $u'(0)=-(\delta A[g]/\delta A[h])=0$ です。よってこの厳密な面積保存族の初期変分は $gn$ であり、停留性と[周長の第一変分](#prop-var3-length-first)から
$$
0=\delta L[\gamma;gn]=-\int_0^L\kappa g\,ds.
$$
平均曲率を $\bar\kappa=L^{-1}\int_0^L\kappa\,ds$ と置き、$g=\kappa-\bar\kappa$ を選べば $\int g=0$ です。従って
$$
0=\int_0^L\kappa(\kappa-\bar\kappa)ds
=\int_0^L(\kappa-\bar\kappa)^2ds.
$$
連続性より $\kappa=\bar\kappa$ が全点で成り立ちます。

$\kappa=0$ なら $T'=0$ で直線になり、正則な閉曲線にはなりません。$\kappa=c\ne0$ なら $T' =cJT$ の解は
$$
T(s)=(\cos(cs+\theta_0),\sin(cs+\theta_0)).
$$
積分すると
$$
\gamma(s)=p+\frac1c
(\sin(cs+\theta_0),-\cos(cs+\theta_0)),
$$
したがって半径 $1/|c|$ の円上にあります。単純閉曲線という仮定により多重周回は許されず、円を一周します。

逆に半径 $R$ の反時計回りの円では $\kappa=1/R$ が定数です。厳密な面積保存族の初期法線成分は [閉曲線の面積の第一変分](#prop-var3-area-first)より $\int g=0$ を満たすので
$$
\delta L=-\frac1R\int_0^L g\,ds=0.
$$
これで必要性と逆が成立します。
<!-- proof-end -->

同じ計算を乗数法で書くと
$$
\delta(L+\lambda A)
=-\int_0^L(\kappa+\lambda)g\,ds.
$$
従って $\kappa=-\lambda$ が停留条件です。面積を保つ変分でない全法線方向を使っても方程式が出る理由は、面積拘束が正則だからです。面積 $A=\pi R^2$ の円は $L=2\pi R$、$\kappa=1/R$ であり、三つの量を直接照合できます。

## 5. Euler弾性曲線：曲率を二乗すると何が起きるか

長さだけなら直線が最短です。針金が曲がること自体を嫌うときは、曲率の大きさを二乗して全長にわたり積分します。符号が逆でも曲げる費用は同じで、円では $R$ が小さいほど高くなります。

<a id="def-var3-elastica-energy"></a>
<!-- formal-statement-start -->
> **定義（平面曲線の曲げエネルギー）**  
> $C^4$ 級の正則平面曲線について
>
$$
E[\gamma]=\frac12\int_\gamma\kappa^2\,ds
$$
>
> を曲げエネルギー（Euler弾性曲線のエネルギー）という。元の曲線が単位速なら積分は $\frac12\int_0^L\kappa(s)^2ds$ である。長さに対する乗数 $\lambda\in\mathbb R$ を入れた作用を $\mathcal F_\lambda=E+\lambda L$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var3-elastica-energy -->
**定義の確認**。半径 $R>0$ の円では $\kappa^2=1/R^2$、$L=2\pi R$ だから
$$
E=\frac12\frac1{R^2}(2\pi R)=\frac{\pi}{R}.
$$
同じ半径の円を二周すればエネルギーも二倍です。エネルギーは曲線の形だけでなく、通過の重複にも依存します。
<!-- definition-example-end -->

<a id="thm-var3-elastica-variation"></a>
<!-- formal-statement-start -->
> **定理（曲げエネルギーの第一変分と弾性曲線方程式）**  
> $C^4$ 単位速曲線 $\gamma:[0,L]\to\mathbb R^2$、$C^2$ 変分 $\eta=fT+gn$ を考え、必要な微分は連続とする。このとき
>
$$
\begin{aligned}
\delta \mathcal F_\lambda[\gamma;\eta]
&=\left[\left(\frac12\kappa^2+\lambda\right)f
+\kappa g'-\kappa'g\right]_0^L\\
&\quad+\int_0^L
\left(\kappa''+\frac12\kappa^3-\lambda\kappa\right)g\,ds.
\end{aligned}
$$
>
> 特に閉曲線の周期変分、または内部に台を持つ変分で $\mathcal F_\lambda$ が停留するための必要十分条件は
>
$$
\kappa''+\frac12\kappa^3-\lambda\kappa=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$E$ の変分には「曲率の二乗の変化」と「線素の変化」の二種類があります。[曲率の第一変分](#prop-var3-speed-curvature)を代入して、$\kappa g''$ を二回部分積分します。接線方向の項は内部の式には残らず端点項になります。

<!-- proof-start -->
### 証明

変形後は曲率 $\kappa_\varepsilon$、線素 $v_\varepsilon ds$ を用いて
$$
E[\gamma_\varepsilon]
=\frac12\int_0^L\kappa_\varepsilon^2v_\varepsilon\,ds.
$$
従って積の微分により
$$
\delta E=\int_0^L\left(\kappa\,\delta\kappa+
\frac12\kappa^2\,\delta v\right)ds.
$$
[速度と曲率の第一変分](#prop-var3-speed-curvature)を代入すると
$$
\begin{aligned}
\kappa\,\delta\kappa+\frac12\kappa^2\delta v
&=\kappa(g''+\kappa^2g+\kappa'f)
+\frac12\kappa^2(f'-\kappa g)\\
&=\kappa g''+\frac12\kappa^3g
+\kappa\kappa'f+\frac12\kappa^2f'\\
&=\kappa g''+\frac12\kappa^3g
+\left(\frac12\kappa^2f\right)'.
\end{aligned}
$$
最後の等号は積の微分 $\left(\kappa^2f/2\right)'=\kappa\kappa'f+\kappa^2f'/2$ です。さらに二回の部分積分を**境界項を残して**行うと
$$
\begin{aligned}
\int_0^L\kappa g''ds
&=[\kappa g']_0^L-\int_0^L\kappa'g'ds\\
&=[\kappa g'-\kappa'g]_0^L+\int_0^L\kappa''gds.
\end{aligned}
$$
以上から
$$
\delta E
=\left[\frac12\kappa^2f+\kappa g'-\kappa'g\right]_0^L
+\int_0^L\left(\kappa''+\frac12\kappa^3\right)gds.
$$
[長さの第一変分](#prop-var3-length-first)は
$$
\lambda\delta L=\lambda[f]_0^L-\lambda\int_0^L\kappa gds
$$
なので、足し合わせて主張の式になります。周期的変分では各端点項が一致して消え、内部に台を持つ法線変分では端点項がゼロです。[変分法の基本補題](../../../物理系/AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を連続な係数 $\kappa''+\kappa^3/2-\lambda\kappa$ に適用すると方程式を得ます。逆に方程式が成立すれば、指定の変分では右辺がゼロとなります。
<!-- proof-end -->

**計算による二重確認**。円の内向き一様法線変分 $g=c$ では
$$
E[\gamma_\varepsilon]=\frac{\pi}{R-\varepsilon c},
\quad
\delta E=\frac{\pi c}{R^2},
\qquad
\delta L=-2\pi c.
$$
積分公式では $\kappa''=0$、$\frac12\kappa^3=\frac1{2R^3}$ なので $\delta E=\frac1{2R^3}(2\pi R)c=\pi c/R^2$、一致します。円が $\mathcal F_\lambda$ に停留するのは $\lambda=1/(2R^2)$ の場合です。$E$ 単独では円は停留しません。

## 6. 曲げエネルギーの端点条件

曲げエネルギーは曲率、つまり二階微分に依存します。このため端点の**位置だけ**を固定しても、端点の接線方向を動かす自由度が残ります。境界項は単なる付け足しではなく、どの実験装置で針金を支えるかを区別します。

<a id="prop-var3-hinged-boundary"></a>
<!-- formal-statement-start -->
> **命題（位置固定・接線自由の曲げ端点条件）**  
> $C^4$ 単位速曲線 $\gamma$ の端点位置 $\gamma(0),\gamma(L)$ を固定し、端点接線は自由とする。$\mathcal F_\lambda=E+\lambda L$ が全ての $C^2$ 固定端変分について停留するなら、内部で
>
$$
\kappa''+\frac12\kappa^3-\lambda\kappa=0
$$
>
> が成立し、両端では
>
$$
\kappa(0)=\kappa(L)=0
$$
>
> が必要である。逆にこれらを満たす曲線の第一変分は全固定端方向でゼロとなる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定端点では $\eta=0$ なので $f(0)=f(L)=g(0)=g(L)=0$ です。[弾性エネルギーの第一変分](#thm-var3-elastica-variation)の端点項は $[\kappa g']_0^L$ だけ残ります。内部に台を持つ任意の $g$ を取れば、まず内部方程式が必要です。

端点で $g=0$ でも $g'$ は自由に指定できます。例えば小さな端点近傍で $g(s)=as$（左端側）、$g(s)=b(s-L)$（右端側）とし、内部へ滑らかにつなげれば、$g'(0)=a$ と $g'(L)=b$ を独立に選べます。境界項は $\kappa(L)b-\kappa(0)a$ なので、任意の $a,b$ でゼロとなるには両端の $\kappa=0$ が必要です。逆は同じ第一変分式に代入すれば成立します。
<!-- proof-end -->

これは端点が回転できる支持（蝶番、hinged）の条件です。端点**位置と接線の両方**を固定するなら、$g=g'=0$ となり、$\kappa=0$ は境界から要求されません。たとえば円弧は内部の弾性曲線方程式を $\lambda=\kappa^2/2$ で満たしても、曲率が端点で非零なので、端点位置だけ固定・接線自由の曲げ問題では停留しません。

さらに端点位置も自由にする場合は、[完全な境界項](#thm-var3-elastica-variation)の $f$、$g$、$g'$ を対応する許容自由度ごとに検査する必要があります。位置固定の条件 $\kappa=0$ を、そのまま任意の自由端点問題へ転用してはいけません。

## 7. グラフ表示と小さな曲がり

<a id="prop-var3-graph-curvature"></a>
平面曲線を局所的に $\gamma(x)=(x,u(x))$ と書ける場合は、前二章の汎関数へ戻れます。ただし $x$ は一般に弧長ではありません。$u\in C^4$、$x\in[a,b]$ とし、左向き回転で法線を定めると
$$
ds=\sqrt{1+(u')^2}\,dx,\qquad
\kappa=\frac{u''}{(1+(u')^2)^{3/2}}.
$$
後者は $\det(\gamma_x,\gamma_{xx})/|\gamma_x|^3=u''/(1+(u')^2)^{3/2}$ から得られます。

従って、グラフの曲げエネルギーは
$$
E[u]=\frac12\int_a^b
\frac{(u'')^2}{(1+(u')^2)^{5/2}}\,dx.
$$
二階微分の二乗に $-5/2$ 乗が掛かる理由は、$\kappa^2$ の分母の三乗に、線素の平方根を掛けるためです。$|u'|\ll1$ の小傾斜近似では
$$
E[u]\approx\frac12\int_a^b(u'')^2dx
$$
です。これは長さの問題で $u'$ が現れたのに対し、曲げでは $u''$ が現れることを示します。

この近似を正確に読むには、$|u'|\le\rho$ なら[平均値の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)から
$$
\left|(1+(u')^2)^{-5/2}-1\right|
\le\frac52(u')^2\le\frac52\rho^2
$$
が成り立ちます。よって
$$
\left|E[u]-\frac12\int_a^b(u'')^2dx\right|
\le\frac54\rho^2\int_a^b(u'')^2dx.
$$
小傾斜近似の誤差は、導関数の一様な小ささによって制御されます。

より一般に $F(p,q)=q^2/[2(1+p^2)^{5/2}]$ とおけば
$$
F_p=-\frac{5pq^2}{2(1+p^2)^{7/2}},\qquad
F_q=\frac{q}{(1+p^2)^{5/2}}.
$$
$u+\varepsilon h$ を代入した第一変分は
$$
\delta E[u;h]=\int_a^b(F_ph'+F_qh'')dx.
$$
一回、さらに一回の部分積分によって
$$
\delta E=[(F_p-(F_q)')h+F_qh']_a^b
+\int_a^b\{- (F_p)'+(F_q)''\}h\,dx
$$
です。従って内部方程式は $(F_q)''-(F_p)'=0$。位置固定で接線自由なら $h=0$ ですが $h'$ は自由なので $F_q=0$、すなわち $u''=0$ が両端に必要です。[曲率の端点条件](#prop-var3-hinged-boundary)と一致します。

## 8. 第二変分・第一積分・次章への橋

長さの第一変分がゼロでも、その曲線が最小かは別に調べなければなりません。固定端点の直線 $\gamma(s)=(s,0)$、$0\le s\le L$ を法線方向 $\eta=(0,g(s))$ に動かすと、
$$
L[\gamma+\varepsilon\eta]
=\int_0^L\sqrt{1+\varepsilon^2(g')^2}\,ds
$$
なので
$$
\delta L=0,\qquad
\delta^2L=\int_0^L(g')^2ds.
$$
$g(0)=g(L)=0$ かつ $g\not\equiv0$ ならこの値は正です。[VAR2の第二必要条件](../VAR2/index.md#thm-var2-necessary)を、幾何的な長さに直接当てはめた例になっています。

一方、閉じた弾性曲線の内部方程式は、曲率という未知関数に対する二階常微分方程式です。[弾性曲線方程式](#thm-var3-elastica-variation)に $2\kappa'$ を掛ければ
$$
2\kappa'\kappa''+\kappa^3\kappa'-2\lambda\kappa\kappa'
=\left((\kappa')^2+\frac14\kappa^4-\lambda\kappa^2\right)'=0.
$$
従って
$$
(\kappa')^2+\frac14\kappa^4-\lambda\kappa^2=C
$$
という第一積分を持ちます。定数解 $\kappa=c\ne0$ には $\lambda=c^2/2$ が必要です。非定数の曲率解から実際の平面曲線を作るには $T'=\kappa JT$、$\gamma'=T$ をさらに積分し、端点や閉曲線の接続条件を検査します。第一積分だけでは形状の存在を保証しません。

ここまでで「長さを動かすと曲率」「曲率エネルギーを動かすと曲率の微分」という関係ができました。次の VAR4 では、直線の代わりに Riemann多様体上の測地線を扱い、曲率と空間自体の曲がり方を区別します。

---

# 演習

## VAR3-A01 円で全ての符号を検査する

- Level: A
- 目安時間: 12分

半径 $R>0$ の反時計回りの円 $\gamma(s)=R(\cos(s/R),\sin(s/R))$ を考える。左法線 $n$、符号付き曲率 $\kappa$、周長 $L$、面積 $A$ を求めよ。$\eta=cn$（$c>0$ 定数）による第一変分 $\delta L,\delta A,\delta\kappa$ を求め、半径の直接微分と比較せよ。

<!-- solution-start -->
### 詳細解答

$T=(-\sin(s/R),\cos(s/R))$、$n=JT=(-\cos(s/R),-\sin(s/R))$、$T'=n/R$ なので
$$
\kappa=\frac1R,\qquad L=2\pi R,\qquad A=\pi R^2.
$$
[長さの公式](#prop-var3-length-first)と[面積の公式](#prop-var3-area-first)で、周期的な定数 $g=c$ を代入すると
$$
\delta L=-\int_0^{2\pi R}\frac cRds=-2\pi c,\qquad
\delta A=-\int_0^{2\pi R}c\,ds=-2\pi Rc.
$$
[曲率の変分](#prop-var3-speed-curvature)では $g''=0$ だから
$$
\delta\kappa=\frac{c}{R^2}.
$$
実際 $\gamma_\varepsilon$ は半径 $R-\varepsilon c$ の円で、$L_\varepsilon=2\pi(R-\varepsilon c)$、$A_\varepsilon=\pi(R-\varepsilon c)^2$、$\kappa_\varepsilon=(R-\varepsilon c)^{-1}$ です。それぞれ $\varepsilon=0$ で微分すると上記の値に一致します。
<!-- solution-end -->

## VAR3-A02 接線方向の端点項

- Level: A
- 目安時間: 10分

$\gamma(s)=(s,0)$、$0\le s\le d$ とし、$\eta=f(s)T+g(s)n$、$f(s)=s/d$、$g(s)=s(d-s)$ とする。$\delta L$ を求めよ。法線成分が第一変分に寄与しない理由も述べよ。

<!-- solution-start -->
### 詳細解答

$T=(1,0)$、$n=(0,1)$、$\kappa=0$ です。[長さの第一変分](#prop-var3-length-first)より
$$
\delta L=[f]_0^d-\int_0^d0\cdot g\,ds
=f(d)-f(0)=1.
$$
直接 $\gamma_\varepsilon'= (1+\varepsilon/d,\varepsilon(d-2s))$ と計算すると
$$
\left.\frac d{d\varepsilon}|\gamma_\varepsilon'|\right|_0
=\frac1d,
\qquad \delta L=\int_0^d\frac1d ds=1
$$
で一致します。直線の曲率はゼロなので、法線方向は一次の長さを変えません。今回は $f(d)=1$ で右端が動くため、固定端点の問題ではありません。
<!-- solution-end -->

## VAR3-A03 グラフの曲率と曲げ密度

- Level: A
- 目安時間: 12分

$\gamma(x)=(x,\alpha x^2)$、$\alpha\in\mathbb R$ とする。$\kappa(x)$、$\kappa(0)$、曲げエネルギーの $dx$ 当たりの密度を求め、$\alpha=0$ の場合を検査せよ。

<!-- solution-start -->
### 詳細解答

$u'=2\alpha x$、$u''=2\alpha$ です。[第7節のグラフ公式](#prop-var3-graph-curvature)に示した $\kappa=u''/(1+(u')^2)^{3/2}$ を代入すると
$$
\kappa(x)=\frac{2\alpha}{(1+4\alpha^2x^2)^{3/2}},
\qquad \kappa(0)=2\alpha.
$$
$\kappa^2/2$ に $ds/dx=\sqrt{1+4\alpha^2x^2}$ を掛けると
$$
\frac12\kappa^2\frac{ds}{dx}
=\frac{2\alpha^2}{(1+4\alpha^2x^2)^{5/2}}.
$$
$\alpha=0$ なら $u$ は直線で、曲率もエネルギー密度もゼロです。$\alpha<0$ なら符号付き曲率は負ですが、曲げ密度は依然非負です。
<!-- solution-end -->

## VAR3-A04 直線の第二変分

- Level: A
- 目安時間: 12分

固定端の直線 $\gamma(s)=(s,0)$、$0\le s\le d$ を $\eta=(0,\sin(\pi s/d))$ で変分する。長さの第一変分と第二変分を直接求めよ。

<!-- solution-start -->
### 詳細解答

$g=\sin(\pi s/d)$、$g'=(\pi/d)\cos(\pi s/d)$ です。端点で $g=0$ なので固定端方向です。
$$
L(\varepsilon)=\int_0^d\sqrt{1+\varepsilon^2(g')^2}\,ds.
$$
被積分関数を微分すると、一階導関数は $\varepsilon(g')^2/\sqrt{1+\varepsilon^2(g')^2}$ で $\varepsilon=0$ においてゼロです。二階導関数を同じ点で評価すると $(g')^2$ です。従って
$$
\delta L=0,\qquad
\delta^2L=\int_0^d\frac{\pi^2}{d^2}\cos^2(\pi s/d)ds
=\frac{\pi^2}{2d}.
$$
$[0,d]$ 上で $\cos^2$ の積分は $d/2$ です。正の二次変化は直線の最小性と整合しますが、最小性そのものは[長さの大域下界](#prop-var3-length-first)の後で示した式からも確認できます。
<!-- solution-end -->

## VAR3-B01 面積保存の一次方向と曲率の変化

- Level: B
- 目安時間: 18分

半径 $R$ の反時計回りの円で、$g(s)=\cos(ms/R)$、$m$ は正の整数、とする。法線変分 $\eta=gn$ について $\delta A,\delta L,\delta\kappa$ を求めよ。$m=1$ と $m=2$ の違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$\int_0^{2\pi R}\cos(ms/R)ds=(R/m)[\sin(ms/R)]_0^{2\pi R}=0$ です。[面積の変分](#prop-var3-area-first)より $\delta A=0$、[長さの変分](#prop-var3-length-first)より
$$
\delta L=-\frac1R\int_0^{2\pi R}g\,ds=0.
$$
さらに $g''=-(m^2/R^2)g$ と $\kappa=1/R$ を[曲率の変分](#prop-var3-speed-curvature)に代入すると
$$
\delta\kappa=\frac{1-m^2}{R^2}\cos(ms/R).
$$
$m=1$ では曲率の一次変化がゼロ、$m=2$ では $-3\cos(2s/R)/R^2$ です。$m=1$ の法線成分は円の平行移動の法線成分と対応しますが、**法線方向だけの変形が厳密な平行移動という意味ではありません**。平行移動全体には一般に接線成分もあります。
<!-- solution-end -->

## VAR3-B02 支持直線で自由に滑る端点

- Level: B
- 目安時間: 20分

始点を直線 $x=0$、終点を直線 $x=d$（$d>0$）の上で自由に動かす正則な曲線の長さを考える。停留曲線の必要条件を求め、可能な線分を全て記述せよ。それらが大域最小であることも示せ。

<!-- solution-start -->
### 詳細解答

各支持直線の接ベクトルは $(0,1)$ です。[自由端点の定理](#thm-var3-free-endpoint)により内部で $\kappa=0$、両端の $T$ は $(0,1)$ に直交します。$\kappa=0$ から $T$ は定数なので、$\gamma$ は水平直線上を単位速で進む線分です。端点がそれぞれ $x=0,x=d$ にあるため、向きを始点から終点に取れば
$$
\gamma(t)=(dt,h),\qquad 0\le t\le1,\quad h\in\mathbb R
$$
が候補の全てです。任意の許容曲線について
$$
L[\gamma]=\int_0^1|\dot\gamma(t)|dt
\ge\int_0^1\dot x(t)dt=x(1)-x(0)=d
$$
です。水平線分は長さ $d$ で等号を達成するため大域最小です。高さ $h$ は拘束されないので最小点は一意ではありません。
<!-- solution-end -->

## VAR3-B03 曲げられた円弧の端点

- Level: B
- 目安時間: 22分

非零定数曲率 $\kappa=c$ の円弧を考える。$\mathcal F_\lambda=E+\lambda L$ が内部で停留する $\lambda$ を求めよ。端点位置だけを固定して端点接線を自由にすると、この円弧は停留曲線か。固定端点の法線試験方向を使い、境界項から判定せよ。

<!-- solution-start -->
### 詳細解答

[弾性曲線方程式](#thm-var3-elastica-variation)に $\kappa=c$ を入れると
$$
0+\frac12c^3-\lambda c=0.
$$
$c\ne0$ より $\lambda=c^2/2$ です。位置固定の法線方向 $\eta=gn$ では $g(0)=g(L)=0$ ですが $g'(0)$ と $g'(L)$ は自由です。内部式をゼロにした[第一変分公式](#thm-var3-elastica-variation)は
$$
\delta\mathcal F_\lambda=[cg']_0^L
=c\{g'(L)-g'(0)\}.
$$
例えば $g$ を左端近くに台を持ち $g'(0)=1$、右端では $g'(L)=0$ とすると $\delta\mathcal F_\lambda=-c\ne0$ です。従ってこの円弧は位置固定・接線自由の問題では停留しません。[蝶番端点条件](#prop-var3-hinged-boundary)の $\kappa(0)=\kappa(L)=0$ を満たさないことと一致します。
<!-- solution-end -->

## VAR3-C01 等周問題の停留形の分類

- Level: C
- 目安時間: 35分

反時計回りの $C^4$ 単純閉曲線 $\gamma$ について、面積が厳密に一定の曲線族に沿って周長が停留すると仮定する。

1. 面積の第一変分がゼロになる法線方向 $g$ の条件を求め、任意のそのような方向から面積を厳密に保存する曲線族を構成できる理由を示せ。
2. 停留性から曲率が定数になることを証明せよ。
3. 定数曲率方程式を解き、単純閉曲線が円になることを導け。
4. この結論だけで大域的な等周不等式を証明したと言えるか、理由を述べよ。

<!-- solution-start -->
### 詳細解答

[面積の第一変分](#prop-var3-area-first)より
$$
\delta A[gn]=-\int_0^L g\,ds.
$$
従って一次拘束条件は $\int g=0$ です。$h\equiv1$ による補正を導入して $\Gamma_{t,u}=\gamma+(tg+u)n$ と置きます。$u=0,t=0$ で面積は指定値、さらに $\partial_u A|_{(0,0)}=-L\ne0$ です。二変数の[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)により $A[\Gamma_{t,u(t)}]=A[\gamma]$ を満たす $u(t)$ が存在し、微分すると
$$
0=-\int_0^Lg\,ds-Lu'(0)=-Lu'(0),
\qquad u'(0)=0.
$$
これで初期方向が $gn$ である厳密な面積保存族を得ます。

[長さの第一変分](#prop-var3-length-first)と停留性より、全ての $\int g=0$ に対して $\int\kappa g=0$ です。$\bar\kappa=L^{-1}\int\kappa$ とおき $g=\kappa-\bar\kappa$ を選ぶと
$$
0=\int_0^L\kappa(\kappa-\bar\kappa)ds
=\int_0^L(\kappa-\bar\kappa)^2ds.
$$
従って $\kappa\equiv c$。$c=0$ なら $T'=0$ で閉曲線になりません。$c\ne0$ なら $T'=cJT$ から
$$
T(s)=(\cos(cs+\theta_0),\sin(cs+\theta_0)),
\qquad
\gamma(s)=p+\frac1c(\sin(cs+\theta_0),-\cos(cs+\theta_0)).
$$
ゆえに半径 $1/|c|$ の円です。単純閉であるため多重周回はありません。

最後に、この証明は周長の**停留曲線の分類**です。候補が円しかないことから、全許容曲線に対して必ず $L^2\ge4\pi A$ という大域最小性が従うわけではありません。大域最小の存在・比較または等周不等式の独立な証明が必要です。[VAR2で区別した停留性と最小性](../VAR2/index.md#thm-var2-necessary)の違いがここにも残ります。
<!-- solution-end -->

## VAR3-C02 弾性曲線の第一積分と端点

- Level: C
- 目安時間: 35分

$C^4$ 平面曲線が $\mathcal F_\lambda=E+\lambda L$ の内部停留曲線であるとする。

1. $\delta E$ を $\delta\kappa$ と $\delta(ds)$ に分け、曲率の方程式を導け。
2. $\kappa'$ を掛けて第一積分を導出せよ。
3. 直線 $\kappa=0$ と円 $\kappa=c\ne0$ をそれぞれ代入し、許される $\lambda$ を調べよ。
4. 端点位置固定・接線自由という条件を追加したとき、非零定数曲率の円弧がなぜ失格になるか説明せよ。

<!-- solution-start -->
### 詳細解答

法線方向 $\eta=gn$ を取れば [曲率と速度の変分](#prop-var3-speed-curvature)より $\delta\kappa=g''+\kappa^2g$、$\delta(ds)=-\kappa gds$ です。従って
$$
\begin{aligned}
\delta E
&=\int_0^L\left\{\kappa(g''+\kappa^2g)
-\frac12\kappa^3g\right\}ds\\
&=\int_0^L\left(\kappa g''+\frac12\kappa^3g\right)ds\\
&=[\kappa g'-\kappa'g]_0^L
+\int_0^L\left(\kappa''+\frac12\kappa^3\right)gds.
\end{aligned}
$$
[長さの第一変分](#prop-var3-length-first)は法線方向で $\delta L=-\int\kappa g$ です。内部方向について任意の $g$ で $\delta(E+\lambda L)=0$ として
$$
\kappa''+\frac12\kappa^3-\lambda\kappa=0
$$
を得ます。

この方程式に $2\kappa'$ を掛ければ
$$
2\kappa''\kappa'+\kappa^3\kappa'-2\lambda\kappa\kappa'
=\left((\kappa')^2+\frac14\kappa^4-\lambda\kappa^2\right)'=0.
$$
連結な区間上で積分し
$$
(\kappa')^2+\frac14\kappa^4-\lambda\kappa^2=C
$$
を得ます。$\kappa\equiv0$ は任意の $\lambda$ で内部方程式を満たします。$\kappa\equiv c\ne0$ なら $c^3/2-\lambda c=0$ より $\lambda=c^2/2$ です。

ただし端点位置だけを固定すると、$g=0$ であっても $g'$ は独立に動かせます。内部方程式を満たした後の第一変分は $[\kappa g']_0^L$ であり、これが任意の $g'$ に対してゼロとなるには $\kappa(0)=\kappa(L)=0$ が必要です。$c\ne0$ の円弧はこの条件に反するので、内部停留と境界を含む停留は異なります。
<!-- solution-end -->
