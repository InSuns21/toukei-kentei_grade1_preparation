# GBG14 接続は曲線に沿って何を運ぶか

[GBG7 の主束接続形式](../GBG7/index.md#def-gbg7-connection-form)から水平部分空間 $H_p=\ker\omega_p$ が定まり、[GBG6 の水平持ち上げ](../GBG6/index.md#prop-gbg6-horizontal-lift)によって基底の接ベクトルを各点で一意に水平へ持ち上げられる。しかし各点で持ち上げられることと、**曲線全体に沿って一つの点を連続的に運べること**は別の問題である。

[GEO13 で扱った平行移動](../../GEO/GEO13/index.md#def-geo13-parallel-transport)は接ベクトルを曲線に沿って運んだ。本講では、同じ発想を一般の主束の点に拡張し、その運び方を常微分方程式として構成する。基底の曲線の始点にある主束の点を、水平なまま終点のファイバーへ運ぶ写像が平行移動である。さらに、[GBG9 の共変微分](../GBG9/index.md#def-gbg9-covariant-derivative)で記述された「場が曲線に沿って変化しない」という条件と結び付ける。

**設定**：$M$ は Hausdorff・第二可算・境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束とする。$\omega$ は滑らかな主束接続形式で、$H=\ker\omega$ と置く。曲線 $\gamma:[a,b]\to M$ は区分的 $C^1$ とし、各滑らかな区間では導関数が端点まで連続に延長できるものを扱う。水平性は各滑らかな区間で要求する。必要に応じて滑らかな曲線の場合から始め、区分の端点で解をつなぐ。

## 1. 点ごとの水平ベクトルを曲線にする

基底曲線 $\gamma$ に沿う持ち上げは、$\pi(p(t))=\gamma(t)$ を満たす $P$ 内の曲線 $p(t)$ である。上の等式を微分すれば

$$
d\pi_{p(t)}\dot p(t)=\dot\gamma(t).
$$

同じ $\dot\gamma(t)$ に対応する接ベクトルは垂直方向の分だけ無数にある。[GBG7 の主束接続形式の再生条件](../GBG7/index.md#def-gbg7-connection-form)を使って、垂直方向が零となるよう選ぶのが水平性である。

<a id="def-gbg14-horizontal-curve"></a>

<!-- formal-statement-start -->
> **定義（曲線の水平リフト）**  
> 上記の主束 $P\to M$ と接続 $\omega$、区分的 $C^1$ 曲線 $\gamma:[a,b]\to M$ に対し、区分的 $C^1$ 曲線 $\widetilde\gamma:[a,b]\to P$ が $\gamma$ の**水平リフト**であるとは、各滑らかな区間の内部で

$$
\pi(\widetilde\gamma(t))=\gamma(t),
\qquad
\omega_{\widetilde\gamma(t)}(\dot{\widetilde\gamma}(t))=0
$$

> を満たし、区分の境界でも連続につながることをいう。$\widetilde\gamma(a)=p_0\in P_{\gamma(a)}$ を初期値と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg14-horizontal-curve -->
**定義の確認**。積主束 $\mathbb R\times U(1)$ の標準section $s(x)=(x,1)$ で局所ポテンシャル $A=0$ の接続を置く。[積主束の接続形式の具体式](../GBG7/index.md#prop-gbg7-product-form)では、接ベクトル $(v,W)\in T_x\mathbb R\oplus T_gU(1)$ に対し

$$
\omega_{(x,g)}(v,W)=\operatorname{Ad}_{g^{-1}}A_x(v)+\theta_g(W)
=\theta_g(W)=g^{-1}W
$$

である。最後の等号は $U(1)$ を行列群と見たときの左 Maurer–Cartan 形式の表示なので、水平性を $g^{-1}\dot g=0$ で判定できる。$t\in[0,1]$ で $\gamma(t)=t$、$\widetilde\gamma(t)=(t,g_0)$ とすると

$$
\pi(t,g_0)=t,\qquad g_0^{-1}\dot g_0=0
$$

となり両条件を満たす。初期値も $(0,g_0)$ である。一方 $(t,e^{it}g_0)$ は射影条件を満たすが、

$$
(e^{it}g_0)^{-1}\frac d{dt}(e^{it}g_0)=i\ne0
$$

なので水平ではない。
<!-- definition-example-end -->

### 局所sectionで微分方程式を導く

区間 $\gamma([c,d])$ が局所section $s:U\to P$ の定義域 $U$ に収まるとき、持ち上げを

$$
p(t)=s(\gamma(t))g(t),\qquad g(t)\in G
$$

と書ける。$A=s^*\omega$ を[GBG8 の局所接続形式](../GBG8/index.md#def-gbg8-local-potential)とする。局所自明化 $(x,g)\mapsto s(x)g$ のもとで、持ち上げの速度は $(\dot\gamma(t),\dot g(t))$ と表示される。[GBG7 の積主束の接続形式](../GBG7/index.md#prop-gbg7-product-form)をこの速度に適用すると

$$
\omega_{p(t)}(\dot p(t))
=
\operatorname{Ad}_{g(t)^{-1}}\!\left(A_{\gamma(t)}(\dot\gamma(t))\right)
+\theta_{g(t)}(\dot g(t))
$$

となる。ここで $\theta_g=(d\ell_{g^{-1}})_g$ は左 Maurer–Cartan 形式、$\ell_h(k)=hk$ は左移動である。**一般の Lie 群ではこの微分で読む**。行列群に限れば $\theta_g(\dot g)=g^{-1}\dot g$、$\operatorname{Ad}_{g^{-1}}a=g^{-1}ag$ と通常の行列積に直せる。

曲線の速度を接続1形式へ入れた値を $a(t):=A_{\gamma(t)}(\dot\gamma(t))\in\mathfrak g$ と置く。行列群では水平条件を零にして左から $g(t)$ を掛けると

$$
0=g(t)\left(g(t)^{-1}a(t)g(t)+g(t)^{-1}\dot g(t)\right)
=a(t)g(t)+\dot g(t).
$$

従って行列群での初期値問題は

$$
\boxed{\ \dot g(t)=-a(t)g(t),\qquad g(c)=g_c.\ }
$$

一般の Lie 群でも $\theta_g(\dot g)=-\operatorname{Ad}_{g^{-1}}a$ と $(d\ell_g)_e$ を合成すれば

$$
\dot g(t)=(d\ell_{g(t)})_e\bigl(-\operatorname{Ad}_{g(t)^{-1}}a(t)\bigr)
=(dR_{g(t)})_e(-a(t))
$$

を得る。ここで $R_g(h)=hg$ で、最後の等号は $\ell_g\circ\operatorname{Ad}_{g^{-1}}=R_g$ を単位元で微分したものである。行列群なら **$-g(t)a(t)$ ではなく $-a(t)g(t)$** になる。以下、時間 $t$ の関数では $g'(t)$ と $\dot g(t)$ はどちらも $dg/dt$ を表す。

<a id="thm-gbg14-horizontal-existence"></a>

<!-- formal-statement-start -->
> **定理（水平リフトの存在・一意性）**  
> 上記の滑らかな有限次元右主 $G$ 束 $P$ と滑らかな接続 $\omega$ に対し、任意の区分的 $C^1$ 曲線 $\gamma:[a,b]\to M$ および任意の $p_0\in P_{\gamma(a)}$ について、初期値 $\widetilde\gamma(a)=p_0$ を満たす水平リフトが区間 $[a,b]$ 全体に唯一存在する。各滑らかな区間内では初期値と曲線に滑らかな範囲で連続的に依存する。
<!-- formal-statement-end -->

**証明の見取り図**。主束を局所的に積として書けば水平条件は Lie 群上の時間依存一次ODEになる。局所解の存在一意性は通常のODE定理から従う。問題は有限時間内に解が逃げないことだが、右移動不変な形のODEと、曲線のコンパクトなパラメータ区間を用いて、同じ長さの小区間で解を順に延長できる。

<!-- proof-start -->
### 証明

まず $\gamma([c,d])\subset U$ の場合を考える。$a(t)=A_{\gamma(t)}(\dot\gamma(t))$ は区分的連続で、各滑らかな区間では連続である。上で求めたODEの右辺 $(t,g)\mapsto(dR_g)_e(-a(t))$ は、各滑らかな区間で $g$ に関して滑らかなベクトル場である。したがって、[ODE1 の Picard--Lindelöf 局所存在・一意性定理](../../../解析系/ODE/ODE1/index.md#thm-ode1-picard-lindelof)の反復構成を有限次元の座標成分へ適用できる。右辺は未知数の近傍で滑らかなので、必要な局所 Lipschitz 条件を満たす。

解の延長を確認する。Lie 群の単位元 $e$ の座標近傍を、その閉包がコンパクトになるほど小さく取り、その中で時間依存ベクトル場の座標成分と局所 Lipschitz 定数を一様に評価する。$a(t)$ は閉区間上有界なので、各時刻から始まる単位元での解は、ある共通の正の時間幅 $\delta$ の間この近傍に存在する。初期値が $g_c$ の場合、単位元での解 $u(t)$ を右から $g_c$ 倍した $u(t)g_c$ は同じODEの解である。実際、

$$
\frac d{dt}(u g_c)=(dR_{g_c})_u\dot u
=(dR_{u g_c})_e(-a(t)).
$$

従って時間幅 $\delta$ は初期群元に依存しない。区間を有限個の長さ $\delta$ 以下の区間へ分け、各終値を次の初期値として解をつなげば $[c,d]$ 全体に延長できる。一意性も各小区間のODEの一意性から従う。

一般の $\gamma([a,b])$ はコンパクトで、局所sectionの定義域の逆像 $\gamma^{-1}(U_i)$ で覆われる。Lebesgue数を使ってパラメータ区間を有限分割し、それぞれが一つの局所自明化に入るようにできる。各区間で上のODEを解き、実際の点 $p(t)$ の終値を次の初期値とする。局所自明化を替えても水平条件は大域形式 $\omega$ の条件なので一致し、重なりでの一意性から解がつながる。得られた区分的 $C^1$ 曲線が求める水平リフトである。標準的なODEの解の初期値・係数への依存性から最後の主張も従う。
<!-- proof-end -->

**具体例（単位円群）**。$\mathbb R\times U(1)$ で $A=i b(x)\,dx$（$b:\mathbb R\to\mathbb R$ は滑らか）、$\gamma(t)=t$、$t\in[0,1]$ とする。初期値 $(0,g_0)$ の水平リフトは

$$
\widetilde\gamma(t)
=
\left(t,\exp\left(-i\int_0^t b(r)\,dr\right)g_0\right).
$$

指数関数を微分すれば $g'=-ib(t)g$ を直接確かめられる。[GBG13 の区間上のゲージ固定](../GBG13/index.md#thm-gbg13-interval-fixing)で現れた指数の負符号は、この水平ODEと同じ規約から生まれている。

## 2. ファイバーからファイバーへの平行移動

水平リフトの初期値を変えると、終点はどのように変わるか。右作用と両立する輸送を定義する。

<a id="def-gbg14-parallel-transport"></a>

<!-- formal-statement-start -->
> **定義（主束の平行移動）**  
> 接続付き右主 $G$ 束 $P\to M$ と区分的 $C^1$ 曲線 $\gamma:[a,b]\to M$ に対し、$p\in P_{\gamma(a)}$ から出発する唯一の水平リフトを $\widetilde\gamma_p$ とする。写像

$$
\operatorname{PT}_{\gamma}:P_{\gamma(a)}\longrightarrow P_{\gamma(b)},
\qquad
\operatorname{PT}_{\gamma}(p)=\widetilde\gamma_p(b)
$$

> を $\gamma$ に沿う**平行移動**という。定義域・値域はいずれも主束のファイバーであり、一般には同じ集合ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg14-parallel-transport -->
**定義の確認**。$P=\mathbb R\times U(1)$、$A=i c\,dx$（$c\in\mathbb R$）、$\gamma(t)=t$（$0\le t\le L$、$L>0$）では

$$
\operatorname{PT}_{\gamma}(0,g)
=(L,e^{-icL}g).
$$

上のODEに代入すれば射影先が $L$、水平性が零である。始点の $g$ を $gh$ に替えると終点は $(L,e^{-icL}gh)$ となり、$h$ は右からそのまま現れる。
<!-- definition-example-end -->

<a id="thm-gbg14-transport-laws"></a>

<!-- formal-statement-start -->
> **定理（平行移動の同変性・合成・逆路）**  
> 上記の主束と接続を固定する。$\gamma:[a,b]\to M$ を区分的 $C^1$ 曲線とすると、任意の $p\in P_{\gamma(a)}$、$h\in G$ に対し

$$
\operatorname{PT}_{\gamma}(ph)
=\operatorname{PT}_{\gamma}(p)h.
$$

> $\gamma_1$ の終点と $\gamma_2$ の始点が一致し、$\gamma_2*\gamma_1$ を「$\gamma_1$ の次に $\gamma_2$ を進む」連結路とすれば

$$
\operatorname{PT}_{\gamma_2*\gamma_1}
=\operatorname{PT}_{\gamma_2}\circ\operatorname{PT}_{\gamma_1}.
$$

> 逆路 $\bar\gamma(t)=\gamma(a+b-t)$ について

$$
\operatorname{PT}_{\bar\gamma}
=\operatorname{PT}_{\gamma}^{-1}.
$$

> 定値路の平行移動は恒等写像であり、向きを保つ区分的 $C^1$ の再パラメータ化でも平行移動は変わらない。したがって $\operatorname{PT}_\gamma$ は $G$ 同変なファイバー間の全単射である。
<!-- formal-statement-end -->

**証明の見取り図**。右作用で水平ベクトルが水平ベクトルへ移るので、水平曲線を右から $h$ 倍しても水平である。路の連結では第一の解の終値を第二の初期値にし、逆路では同じ曲線のパラメータを逆転する。すべて水平リフトの一意性に帰着する。

<!-- proof-start -->
### 証明

[GBG7 の右同変条件](../GBG7/index.md#def-gbg7-connection-form)より

$$
\omega_{qh}\bigl(dR_h(v)\bigr)
=\operatorname{Ad}_{h^{-1}}\omega_q(v).
$$

$v=\dot{\widetilde\gamma}_p(t)$ が水平なら右辺は零。ゆえに $\widetilde\gamma_p(t)h$ も $\gamma$ の水平リフトで、初期値は $ph$ である。[水平リフトの一意性](#thm-gbg14-horizontal-existence)から

$$
\widetilde\gamma_{ph}(t)=\widetilde\gamma_p(t)h.
$$

$t=b$ とすれば同変性を得る。

合成について、初期点 $p$ から $\gamma_1$ の水平リフトを解き、その終点 $q=\operatorname{PT}_{\gamma_1}(p)$ を初期点として $\gamma_2$ の水平リフトを解く。二曲線をつないだものは連続で、各区間の水平条件を満たす。連結路に沿う水平リフトの一意性から、その終点は $\operatorname{PT}_{\gamma_2*\gamma_1}(p)$ に等しい。よって合成式が従う。

逆路に対して $\widehat p(t)=\widetilde\gamma_p(a+b-t)$ を考える。連鎖律より

$$
\dot{\widehat p}(t)
=-\dot{\widetilde\gamma}_p(a+b-t),
\quad
\omega(\dot{\widehat p}(t))
=-\omega(\dot{\widetilde\gamma}_p(a+b-t))=0.
$$

$\widehat p(a)=\widetilde\gamma_p(b)$、$\widehat p(b)=p$ だから、$\operatorname{PT}_{\bar\gamma}(\operatorname{PT}_\gamma(p))=p$。始点を逆路の側へ替えても同様なので両側逆写像となる。

定値路では速度が零であり、定値な持ち上げが水平である。再パラメータ化 $\varphi$ では、$\frac d{dt}\widetilde\gamma(\varphi(t))=\varphi'(t)\dot{\widetilde\gamma}(\varphi(t))$ と接続形式の線形性から水平性が保たれる。始終点が同じなら一意性から平行移動の結果も同一である。
<!-- proof-end -->

**注意**。異なる路が同じ始終点を持っても平行移動が一致するとは限らない。上の定理が保証するのは、指定された路を連結した場合の合成である。どの閉路で何が残るかは次講で扱う。

## 3. 局所行列と結合束の輸送

局所section $s$ が曲線全体の像を覆い、$G\subset GL(n,\mathbb F)$ が行列 Lie 群（$\mathbb F=\mathbb R$ または $\mathbb C$）なら、初期群元を単位行列にした解 $U_\gamma(t)$ を考える。

<a id="prop-gbg14-local-transport"></a>

<!-- formal-statement-start -->
> **命題（局所輸送行列とsection変更）**  
> 上記の曲線と局所sectionについて $A=s^*\omega$、$a(t)=A_{\gamma(t)}(\dot\gamma(t))$ とする。初期値問題

$$
\dot U_\gamma(t)=-a(t)U_\gamma(t),
\qquad U_\gamma(a)=I
$$

> の解を用いれば、任意の初期群元 $g_0\in G$ からの平行移動は

$$
\operatorname{PT}_\gamma(s(\gamma(a))g_0)
=s(\gamma(b))U_\gamma(b)g_0.
$$

> section を $s'(x)=s(x)h(x)$ へ替えたとき、同じ輸送の局所行列は

$$
U'_\gamma(b)
=h(\gamma(b))^{-1}U_\gamma(b)h(\gamma(a)).
$$

> これらの式は $G$ の行列積の順序で書く。局所sectionが曲線の全像で取れない場合も、有限分割ごとの式を端点のsection変更でつなげれば大域輸送を計算できる。
<!-- formal-statement-end -->

**証明の見取り図**。一つ目の式は水平ODEの一般解 $g(t)=U(t)g_0$ から得られる。二つ目は同じ点を $s(t)g(t)$ と $s(t)h(t)g'(t)$ の二通りに書き、終点と始点の表示を比較する。

<!-- proof-start -->
### 証明

$\dot U=-aU$ と $g(t)=U(t)g_0$ から $\dot g=-aUg_0=-ag$、$g(a)=g_0$。したがって $\widetilde\gamma(t)=s(\gamma(t))U(t)g_0$ は水平で、定理の一意性によりこれが求める解である。

$s'=sh$ とすると、同じ点の二つの表示 $s(t)g(t)=s(t)h(t)g'(t)$ から $g'(t)=h(t)^{-1}g(t)$。$s'(a)$ から出発するときの旧表示での初期群元は $h(a)$ だから、終点では

$$
s'(b)U'_\gamma(b)
=s(b)U_\gamma(b)h(a)
=s'(b)h(b)^{-1}U_\gamma(b)h(a).
$$

各ファイバーの右作用は自由なので係数を比較して所望の式を得る。ここで $h(a)$ と $h(b)$ はそれぞれ $\gamma(a)$ と $\gamma(b)$ での値の略記である。

式そのものが局所接続の変換公式とも整合することを確認する。[GBG8 の変換則](../GBG8/index.md#thm-gbg8-local-transform)から曲線上で

$$
a'=h^{-1}ah+h^{-1}\dot h.
$$

$V(t)=h(t)^{-1}U(t)h(a)$ とおくと、逆行列の微分から

$$
\begin{aligned}
\dot V
&=-h^{-1}\dot h\,h^{-1}Uh(a)+h^{-1}(-aU)h(a)\\
&=-\bigl(h^{-1}\dot h+h^{-1}ah\bigr)V
=-a'V.
\end{aligned}
$$

$V(a)=I$ なので ODE の一意性から $V=U'$ となる。
<!-- proof-end -->

section変更では、**開いた路の輸送行列は始点と終点で別々の行列に挟まれる**。単なる共役になると決めつけない。閉路で始終点が同じ場合の共役とその応用はGBG15・GBG17で考える。

### 結合ベクトル束では何を運ぶか

[GBG4 の結合束](../GBG4/index.md#def-gbg4-associated-bundle) $E=P\times_\rho V$ と表現 $\rho:G\to GL(V)$ を固定する。$[p,v]$ は $[pg,v]=[p,\rho(g)v]$ という同値関係に従う。

<a id="def-gbg14-associated-transport"></a>

<!-- formal-statement-start -->
> **定義（結合束の平行移動）**  
> 上記の接続付き主束 $P$、表現 $\rho$、曲線 $\gamma$ に対し、結合束のファイバー間の写像を

$$
\operatorname{PT}^E_\gamma:E_{\gamma(a)}\to E_{\gamma(b)},
\qquad
[p,v]\longmapsto[\operatorname{PT}_\gamma(p),v]
$$

> と定める。これを結合束の**平行移動**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg14-associated-transport -->
**定義の確認**。$P=\mathbb R\times U(1)$ とし、$\rho_q(e^{i\theta})=e^{iq\theta}$（$q\in\mathbb Z$）を1次元複素表現とする。$A=ic\,dx$ に沿う主束輸送は $g\mapsto e^{-icL}g$ なので、標準sectionに関する結合束の成分は

$$
v(L)=e^{-iqcL}v(0).
$$

代表点の選択にも依存しないことを直接確かめる。$g=e^{i\theta}$ とすると、同じ始点の元 $[s(0),v_0]$ は $[s(0)g,g^{-q}v_0]$ とも書ける。[主束輸送の右同変性](#thm-gbg14-transport-laws)を使えば後者の輸送は

$$
[s(L)e^{-icL}g,g^{-q}v_0]
=[s(L),\rho_q(e^{-icL}g)g^{-q}v_0]
=[s(L),e^{-iqcL}v_0]
$$

となる。最初の代表 $[s(0),v_0]$ を運んだ値と一致し、結合束の平行移動の定義がこの例で確認できた。
<!-- definition-example-end -->

<a id="thm-gbg14-associated-covariant"></a>

<!-- formal-statement-start -->
> **定理（結合束の平行移動と共変微分）**  
> $E=P\times_\rho V$ と上記の接続、区分的 $C^1$ 曲線 $\gamma$ を固定する。$\operatorname{PT}^E_\gamma$ は代表点の選択によらず定義された線形同型で、連結路・逆路について主束の平行移動と同じ合成則を満たす。曲線に沿う局所成分 $v(t)\in V$ がこの平行移動で運ばれることと、各滑らかな区間で

$$
\dot v(t)+\rho_*(a(t))v(t)=0
$$

> を満たすことは同値である。ここで $a(t)=A_{\gamma(t)}(\dot\gamma(t))$、$\rho_*:\mathfrak g\to\operatorname{End}(V)$ は表現の微分とする。
<!-- formal-statement-end -->

**証明の見取り図**。代表点の独立性には主束輸送の右同変性を使う。局所成分のODEは[GBG9 の局所共変微分公式](../GBG9/index.md#thm-gbg9-local-formula)を曲線の速度に適用して得られる。主束の $U$ に表現を作用させた解が同じODEを満たす。

<!-- proof-start -->
### 証明

結合束の同値関係に対して

$$
\begin{aligned}
\operatorname{PT}^E_\gamma([pg,v])
&=[\operatorname{PT}_\gamma(pg),v]\\
&=[\operatorname{PT}_\gamma(p)g,v]\\
&=[\operatorname{PT}_\gamma(p),\rho(g)v]
=\operatorname{PT}^E_\gamma([p,\rho(g)v]).
\end{aligned}
$$

ゆえに well-defined である。同じ代表点 $p$ では $v\mapsto v$ なので線形性を持ち、逆は $\operatorname{PT}^E_{\bar\gamma}$ である。合成も[主束の合成則](#thm-gbg14-transport-laws)を同値類に適用すれば従う。

局所的に初期値を $[s(\gamma(a)),v_0]$ と書くと、主束の水平リフトは $s(\gamma(t))U(t)$。したがって結合束に運ばれた成分は

$$
v(t)=\rho(U(t))v_0.
$$

表現の微分の定義（[GBG9 の表現の無限小作用](../GBG9/index.md#def-gbg9-infinitesimal-representation)）により、$\dot U=-aU$ を微分すると

$$
\frac d{dt}\rho(U(t))
=\rho_*(-a(t))\,\rho(U(t)).
$$

よって $\dot v=-\rho_*(a)v$。逆にこの線形ODEの解は初期値に対して一意だから、与えられた平行移動成分と一致する。[共変微分の局所公式](../GBG9/index.md#thm-gbg9-local-formula)に $\dot\gamma(t)$ を代入すると $\nabla_{\dot\gamma}v=\dot v+\rho_*(a)v$ であり、零という条件と一致する。
<!-- proof-end -->

## 4. 経路順序はなぜ必要か

行列ODE $\dot U=-a(t)U$ で、一般に $a(t_1)$ と $a(t_2)$ は可換でない。そのため、単に積分を行列指数の中に入れる式は通常成立しない。

まず積分方程式

$$
U(t)=I-\int_a^t a(t_1)U(t_1)\,dt_1
$$

に $U$ を繰り返し代入すると、次の順序付き積が現れる。

<a id="prop-gbg14-dyson-series"></a>

<!-- formal-statement-start -->
> **命題（経路順序指数と局所水平ODE）**  
> $a:[a,b]\to M_n(\mathbb F)$ が有限個の分点を持つ区分的連続関数なら、$U(a)=I$ を満たす連続な区分的 $C^1$ 解で、各連続区間内で $\dot U=-a(t)U$ を満たすものが一意に存在する。分点では次の積分方程式によってつなぐ。

$$
U(t)=I-\int_a^t a(r)U(r)\,dr.
$$

> この解は一様収束級数

$$
\begin{aligned}
U(t)=I
&+\sum_{k=1}^{\infty}(-1)^k
\int_{a\le t_k\le\cdots\le t_1\le t}
a(t_1)\cdots a(t_k)\,
dt_k\cdots dt_1
\end{aligned}
$$

> で与えられる。これを $\mathcal P\exp(-\int_a^t a(r)\,dr)$ と記す。**遅い時刻の行列を積の左に置く**のが本講の $\mathcal P$ の規約である。すべての $a(t)$ が互いに可換なら

$$
U(t)=\exp\left(-\int_a^t a(r)\,dr\right)
$$

> と簡約できる。
<!-- formal-statement-end -->

**証明の見取り図**。積分方程式への反復代入で時間の順序が生まれる。ノルムで見れば $k$ 次項は $C^k(t-a)^k/k!$ 以下なので収束し、項別に微分して元のODEを回復できる。可換性があれば積分域を立方体へ対称化できる。

<!-- proof-start -->
### 証明

積分方程式に $U(t_1)=I-\int_a^{t_1}a(t_2)U(t_2)\,dt_2$ を代入すると

$$
U(t)=I-\int_a^t a(t_1)\,dt_1+
\int_a^t\int_a^{t_1}a(t_1)a(t_2)U(t_2)\,dt_2dt_1.
$$

これを繰り返すと $k$ 次までの和と残項が得られる。任意の劣乗法的行列ノルムで $\|a(t)\|\le C$ とすると、時間順序領域は $k$ 次元立方体の体積の $1/k!$ だから、$k$ 次項のノルムは高々 $C^k(b-a)^k/k!$。指数級数との比較で一様絶対収束する。

さらに各連続区間内で、$k$ 次項の導関数のノルムは $C^k(b-a)^{k-1}/(k-1)!$ 以下である。この上界も指数級数により総和可能なので、各連続区間内で項別微分できる。各 $k$ 次項を上端 $t$ で微分すると、最も遅い時刻 $t_1=t$ の因子が先頭に現れるので

$$
\frac d{dt}U(t)
=-a(t)\left[I+\sum_{j=1}^{\infty}(-1)^j
\int_{a\le t_j\le\cdots\le t_1\le t}
a(t_1)\cdots a(t_j)\,dt_j\cdots dt_1\right]
=-a(t)U(t)
$$

が各連続区間内で成り立ち、$U(a)=I$ も満たす。分点での連続性は一様収束と各積分項の連続性による。ODEの区間ごとの一意性と分点での値の一致から、級数が唯一の解である。

互いに可換なら積 $a(t_1)\cdots a(t_k)$ は変数の置換に関して対称である。立方体は $k!$ 個の順序領域へ測度零の境界を除いて分割されるため、$k$ 次項は

$$
\frac{(-1)^k}{k!}\left(\int_a^t a(r)\,dr\right)^k.
$$

これらを足すと通常の行列指数の級数になる。
<!-- proof-end -->

### 非可換行列で順序を検算する

$G=GL(2,\mathbb R)$ とし、$E_{ij}$ を標準基底に関して $(i,j)$ 成分だけが1で残りが0の $2\times2$ 行列と定める。$H=E_{11}$、$X=E_{12}$ を用いて $\mathbb R^2$ の積主束に $A=H\,dx+X\,dy$ を置く。これは座標速度 $(\dot x,\dot y)$ を Lie 環の元 $H\dot x+X\dot y$ に送る1形式であり、水平ODEの係数は

$$
a(t)=A_{\gamma(t)}(\dot\gamma(t))
=H\dot x(t)+X\dot y(t)
$$

である。実際の行列を掛けると $HX=X$、$XH=0$、$X^2=0$ である。$(0,0)$ から $(1,1)$ へ、横方向を単位速度で進んだ後に縦方向を単位速度で進む路 $\gamma_{xy}$ を選ぶ。すると係数は横区間で $H$、縦区間で $X$ だから

$$
\begin{aligned}
U_{\gamma_{xy}}
&=e^{-X}e^{-H}\\
&=(I-X)\begin{pmatrix}e^{-1}&0\\0&1\end{pmatrix}
=\begin{pmatrix}e^{-1}&-1\\0&1\end{pmatrix}.
\end{aligned}
$$

縦の後に横へ進む路 $\gamma_{yx}$ なら

$$
\begin{aligned}
U_{\gamma_{yx}}
&=e^{-H}e^{-X}\\
&=\begin{pmatrix}e^{-1}&-e^{-1}\\0&1\end{pmatrix}.
\end{aligned}
$$

**始点と終点は同じでも輸送は違う**。これは行列積の順序を飛ばせない直接例である。[曲率の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)から $F=[H,X]\,dx\wedge dy=X\,dx\wedge dy$ と計算でき、路の違いが現れる接続の非可換性を確かめられる。ただし曲率と微小閉路との厳密な展開は次講で扱う。

---

## 5. 演習と詳細解答

### Level A：定義を直接使う

<a id="ex-gbg14-a01"></a>
#### GBG14-A01 水平かどうか判定する
- Level: A

$\mathbb R\times U(1)$ に $A=2ix\,dx$ を置き、$\gamma(t)=t$（$0\le t\le1$）とする。$(t,e^{-it^2}g_0)$ が初期値 $(0,g_0)$ の水平リフトであることを確認せよ。また $(t,e^{it^2}g_0)$ が水平でない点を示せ。

<!-- solution-start -->
**詳細解答**。局所表示で $g(t)=e^{-it^2}g_0$ と置く。微分すると $\dot g=-2it\,g$ であり、$a(t)=A_{\gamma(t)}(\dot\gamma(t))=2it$ だから

$$
\dot g+a(t)g=-2it\,g+2it\,g=0.
$$

これが[水平ODE](#thm-gbg14-horizontal-existence)の条件である。射影も $\pi(t,g(t))=t$、初期値も $g(0)=g_0$ なので定義の全条件を満たす。一方 $g_+(t)=e^{it^2}g_0$ では $\dot g_+=2it\,g_+$ だから

$$
\dot g_++a(t)g_+=4it\,g_+
$$

であり、$t>0$ で零でない。従って水平条件を破る。
<!-- solution-end -->

<a id="ex-gbg14-a02"></a>
#### GBG14-A02 区間の平行移動と逆路
- Level: A

$A=ic\,dx$（$c\in\mathbb R$）、$\gamma:[0,L]\to\mathbb R$、$\gamma(t)=t$（$L>0$）に対する $U(1)$ 主束平行移動と逆路の平行移動を求め、互いに逆であることを示せ。

<!-- solution-start -->
**詳細解答**。$a(t)=ic$ なので $g'=-icg$、$g(0)=g_0$ の解は $g(t)=e^{-ict}g_0$。よって

$$
\operatorname{PT}_{\gamma}(0,g_0)=(L,e^{-icL}g_0).
$$

逆路を $\bar\gamma(t)=L-t$（$0\le t\le L$）と書くと、$A_{\bar\gamma(t)}(\dot{\bar\gamma}(t))=-ic$ である。したがって逆路の群元は $h'=+ich$、$h(0)=h_0$、つまり $h(L)=e^{icL}h_0$。合成では $e^{icL}e^{-icL}g_0=g_0$ で、[逆路の定理](#thm-gbg14-transport-laws)と一致する。
<!-- solution-end -->

<a id="ex-gbg14-a03"></a>
#### GBG14-A03 合成での積の順序
- Level: A

$GL(2,\mathbb R)$ で $E_{ij}$ を $(i,j)$ 成分だけが1の $2\times2$ 行列とし、一番目の区間の係数を $H=E_{11}$、二番目を $X=E_{12}$ とする（各区間の長さ1）。二つの輸送行列の積を求め、時間的に後の行列がどちらへ来るか説明せよ。

<!-- solution-start -->
**詳細解答**。前半では $U_1'= -HU_1$ なので $U_1(1)=e^{-H}=\operatorname{diag}(e^{-1},1)$。後半の初期値はこの行列であり、$U'=-XU$ をもう1単位進めるため

$$
U(2)=e^{-X}U_1(1)=(I-X)\operatorname{diag}(e^{-1},1)
=\begin{pmatrix}e^{-1}&-1\\0&1\end{pmatrix}.
$$

後の区間の $e^{-X}$ が左に来る。これは[路の連結の合成則](#thm-gbg14-transport-laws)を行列に直した順序である。
<!-- solution-end -->

<a id="ex-gbg14-a04"></a>
#### GBG14-A04 結合束の表現の重み
- Level: A

$\rho_2(e^{i\theta})=e^{2i\theta}$ を用い、$A=3i\,dx$ に沿って $x=0$ から $x=2$ へ平行移動したときの結合複素線束の局所成分 $v(2)$ を $v(0)$ で表せ。共変微分のODEも確認せよ。

<!-- solution-start -->
**詳細解答**。主束の輸送は $U(2)=e^{-6i}$。表現を適用すると $\rho_2(U(2))=e^{-12i}$ だから

$$
v(2)=e^{-12i}v(0).
$$

表現の微分は $\rho_{2*}(i\alpha)=2i\alpha$ で、$\rho_{2*}(3i)=6i$。ゆえに共変微分のODEは $\dot v+6iv=0$。その解 $v(x)=e^{-6ix}v(0)$ を $x=2$ に代入しても $e^{-12i}v(0)$ を得る。
<!-- solution-end -->

### Level B：変換と非可換性の論証

<a id="ex-gbg14-b01"></a>
#### GBG14-B01 局所section変更の両端
- Level: B

$\mathbb R\times U(1)$ で $A=ic\,dx$（$c\in\mathbb R$）、$\gamma(t)=t$（$0\le t\le L$、$L>0$）、section変更 $h(x)=e^{ix^2}$ とする。新しい局所接続 $A'$、局所輸送行列 $U'$ を直接ODEから求め、$h(L)^{-1}Uh(0)$ と照合せよ。

<!-- solution-start -->
**詳細解答**。[GBG8 の局所変換則](../GBG8/index.md#thm-gbg8-local-transform)で $U(1)$ は可換なので

$$
A'=A+h^{-1}dh=i(c+2x)\,dx.
$$

新しい水平ODEは $\dot U'(t)=-i(c+2t)U'(t)$、$U'(0)=1$。積分して

$$
U'(L)=\exp\left(-i\int_0^L(c+2t)\,dt\right)
=e^{-i(cL+L^2)}.
$$

旧輸送は $U=e^{-icL}$、$h(0)=1$、$h(L)=e^{iL^2}$ だから

$$
h(L)^{-1}Uh(0)
=e^{-iL^2}e^{-icL}
=e^{-i(cL+L^2)}
$$

で一致する。開いた路では終点と始点のゲージ因子を別々に評価する必要がある。
<!-- solution-end -->

<a id="ex-gbg14-b02"></a>
#### GBG14-B02 非可換な二つの経路
- Level: B

$\mathbb R^2\times GL(2,\mathbb R)$ で $E_{ij}$ を $(i,j)$ 成分だけが1の $2\times2$ 行列とする。$A=E_{11}\,dx+E_{12}\,dy$ について、$(0,0)$ から $(1,1)$ へ「横→縦」と「縦→横」で運ぶ行列をそれぞれ計算し、両者の相違を示せ。曲率も求めよ。

<!-- solution-start -->
**詳細解答**。$H=E_{11}$、$X=E_{12}$ と置く。$X^2=0$ より $e^{-X}=I-X$、$H^2=H$ より $e^{-H}=I+(e^{-1}-1)H$ である。

横→縦なら合成則から

$$
U_{xy}=e^{-X}e^{-H}
=\begin{pmatrix}e^{-1}&-1\\0&1\end{pmatrix}.
$$

縦→横なら

$$
U_{yx}=e^{-H}e^{-X}
=\begin{pmatrix}e^{-1}&-e^{-1}\\0&1\end{pmatrix}.
$$

$e^{-1}\ne1$ だから異なる。$A$ は定数係数なので $dA=0$。[曲率公式](../GBG10/index.md#thm-gbg10-local-formula)で

$$
F=A\wedge A=[H,X]\,dx\wedge dy
=(HX-XH)\,dx\wedge dy=X\,dx\wedge dy
$$

を得る。曲率が零ではないので、少なくともこの例で「端点だけを見ればよい」という主張は成立しない。
<!-- solution-end -->

<a id="ex-gbg14-b03"></a>
#### GBG14-B03 平行移動を結合束へ降ろす
- Level: B

任意の滑らかな右主束接続の平行移動について、$[pg,v]=[p,\rho(g)v]$ の二代表から同じ $\operatorname{PT}^E_\gamma$ の値が得られることを示し、逆路で線形同型の逆が得られることを証明せよ。

<!-- solution-start -->
**詳細解答**。[主束輸送の右同変性](#thm-gbg14-transport-laws)を $pg$ に適用すると

$$
\operatorname{PT}_\gamma(pg)=\operatorname{PT}_\gamma(p)g.
$$

結合束の同値関係を終点のファイバーで用いれば

$$
[\operatorname{PT}_\gamma(pg),v]
=[\operatorname{PT}_\gamma(p)g,v]
=[\operatorname{PT}_\gamma(p),\rho(g)v].
$$

右辺は別の代表 $[p,\rho(g)v]$ から計算した値に一致する。したがって写像は well-defined。同じ $p$ で代表を取れば $v$ に関して線形である。逆路に沿う合成では

$$
\operatorname{PT}^E_{\bar\gamma}
\bigl(\operatorname{PT}^E_\gamma([p,v])\bigr)
=[\operatorname{PT}_{\bar\gamma}(\operatorname{PT}_\gamma(p)),v]=[p,v]
$$

となり、逆向きの合成も同じ。従って両者は互いに逆な線形写像である。
<!-- solution-end -->

<a id="ex-gbg14-b04"></a>
#### GBG14-B04 可換なら指数へ戻る
- Level: B

連続な実数関数 $f,g:[0,1]\to\mathbb R$ に対し $a(t)=f(t)I+g(t)H$（$H=\operatorname{diag}(1,-1)$）を取る。時間を異にする係数が可換であることを確認し、$U(1)$ を具体的な対角行列として求めよ。

<!-- solution-start -->
**詳細解答**。$I$ と $H$ は可換なので、任意の $s,t$ に対し

$$
[a(s),a(t)]=[f(s)I+g(s)H,f(t)I+g(t)H]=0.
$$

$f$ と $g$ の積分をそれぞれ $F_0=\int_0^1f(t)\,dt$、$G_0=\int_0^1g(t)\,dt$ と書く。[可換な場合の経路順序指数](#prop-gbg14-dyson-series)から

$$
\begin{aligned}
U(1)
&=\exp(-F_0I-G_0H)\\
&=\exp\left(\begin{pmatrix}-F_0-G_0&0\\0&-F_0+G_0\end{pmatrix}\right)
=\begin{pmatrix}e^{-F_0-G_0}&0\\0&e^{-F_0+G_0}\end{pmatrix}.
\end{aligned}
$$

途中時刻でも $F(t)=\int_0^t f(r)\,dr$、$G(t)=\int_0^t g(r)\,dr$ と置けば

$$
U(t)=\operatorname{diag}\bigl(e^{-F(t)-G(t)},e^{-F(t)+G(t)}\bigr).
$$

よって各対角成分の微分はそれぞれ $-(f(t)+g(t))U_{11}(t)$、$-(f(t)-g(t))U_{22}(t)$ となり、$\dot U=-a(t)U$ を直接満たす。一般の $a(t)$ ではこの可換性が失われるため、この置換はできない。
<!-- solution-end -->

### Level C：接続・ゲージ表示・場の輸送を統合する

<a id="ex-gbg14-c01"></a>
#### GBG14-C01 非可換な開いた路のゲージ共変性
- Level: C

$G=GL(2,\mathbb R)$ の積主束上で、$E_{ij}$ を $(i,j)$ 成分だけが1の $2\times2$ 行列として、$A=H\,dx+X\,dy$、$H=E_{11}$、$X=E_{12}$ とし、$(0,0)$ から $(1,1)$ へ横の後に縦へ進む路 $\gamma$ を考える。$h(x,y)=\operatorname{diag}(e^x,1)$ で section を変更する。

1. 旧sectionでの輸送行列 $U$ を求めよ。
2. 新しい局所ポテンシャル $A'=h^{-1}Ah+h^{-1}dh$ を計算し、新しいsectionでの輸送行列 $U'$ を二つの区間ごとのODEから求めよ。
3. 両端の変換式 $U'=h(1,1)^{-1}Uh(0,0)$ を直接検算せよ。
4. 標準表現の結合束で、始点の局所成分 $v_0=(1,1)^{\mathsf T}$ が各sectionでどう運ばれるかを述べ、同じ大域的な終点の元を表すことを確かめよ。

<!-- solution-start -->
**詳細解答**。

**1.** $H^2=H$、$X^2=0$ より $e^{-H}=\operatorname{diag}(e^{-1},1)$、$e^{-X}=I-X$。横の後に縦へ進むので

$$
U=e^{-X}e^{-H}=\begin{pmatrix}e^{-1}&-1\\0&1\end{pmatrix}.
$$

**2.** $h=\operatorname{diag}(e^x,1)$ に対し

$$
h^{-1}Hh=H,\qquad
h^{-1}Xh=e^{-x}X,\qquad
h^{-1}dh=H\,dx.
$$

従って $A'=2H\,dx+e^{-x}X\,dy$。前半の横路では $dy=0$ だから $U'_1=e^{-2H}=\operatorname{diag}(e^{-2},1)$。後半の縦路は $x=1$ で固定なので係数は $e^{-1}X$、長さ1を進む解は $e^{-e^{-1}X}=I-e^{-1}X$。合成して

$$
\begin{aligned}
U'&=(I-e^{-1}X)\operatorname{diag}(e^{-2},1)\\
&=\begin{pmatrix}e^{-2}&-e^{-1}\\0&1\end{pmatrix}.
\end{aligned}
$$

**3.** 始点で $h(0,0)=I$、終点で $h(1,1)=\operatorname{diag}(e,1)$ である。よって

$$
h(1,1)^{-1}Uh(0,0)
=\operatorname{diag}(e^{-1},1)
\begin{pmatrix}e^{-1}&-1\\0&1\end{pmatrix}
=\begin{pmatrix}e^{-2}&-e^{-1}\\0&1\end{pmatrix}=U'.
$$

**4.** 旧sectionでの終点成分は $Uv_0=(e^{-1}-1,1)^{\mathsf T}$。新sectionでの始点成分は $\rho(h(0,0)^{-1})v_0=v_0$、終点成分は

$$
U'v_0=(e^{-2}-e^{-1},1)^{\mathsf T}
=h(1,1)^{-1}Uv_0.
$$

結合束の[局所成分変換](../GBG4/index.md#thm-gbg4-component-transformation)により、新sectionでの成分は旧sectionの成分に終点の $h^{-1}$ を掛けたものなので、両者は同じ結合束の元を表す。開いた路の輸送行列そのものは不変ではないが、その大域写像はsectionに依存しない。
<!-- solution-end -->

---

## 6. 次に何を調べるか

接続から、曲線上の初期点を一意に運ぶ写像が構成できた。平行移動は右主作用と整合し、路をつなぐと写像が合成され、逆路では逆写像になる。局所表示を替えると輸送行列の両端にゲージ関数が現れ、非可換な場合には経路順序が必要になる。

次の **GBG15「閉路の平行移動から何が分かるか」** では始点と終点を一致させ、平行移動から holonomy とその群を定義し、基点変更と曲率の関係を調べる。
