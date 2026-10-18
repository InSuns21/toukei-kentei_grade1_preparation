# HPDE9 高階Sobolev評価と正則性の伝播

[HPDE8の一次エネルギー不等式](../HPDE8/index.md#thm-hpde8-energy-inequality)は、関数とその一次微分を初期データと源で制御しました。しかし局所存在の近似列を作ると、方程式へ極限を通すために二階・三階、さらには任意階の微分を比較しなければなりません。一次の評価を「何度でも微分すればよい」とだけ言うと、**係数を微分した項**を見落とします。

この章は、まず曲がった空間スライスを持つ計算可能な時間帯で交換子をすべて展開し、高階エネルギーを閉じます。その後、共変微分では曲率が現れる理由、滑らかな近似列の極限で何が証明できるか、何がまだ存在定理として残るかを分けます。

基礎となる[局所Sobolev初期データ](../HPDE6/index.md#def-hpde6-local-sobolev-data)と[GPDE3のSobolev空間](../../GPDE/GPDE3/index.md#def-gpde3-hk)は既習とします。以下の主定理は**コンパクトな空間トーラス** $\mathbb T^n=(\mathbb R/2\pi\mathbb Z)^n$、有限時間区間 $I=[s,T]$ 上で証明します。これは局所的な時空の一つの模型であって、非コンパクトな任意の大域双曲時空に同じ定数が使えるという主張ではありません。

## 1. 一次エネルギーを高階へ持ち上げるには

時空を $I\times\mathbb T^n$ とし、時間依存する滑らかな正定値行列 $h_{ij}(t,x)$ によって

$$
g=-dt^2+h_{ij}(t,x)\,dx^i dx^j
$$

を定めます。これはlapseが $1$、shiftが $0$ の時間分割です。$h^{ij}$ は逆行列、$\mu=\sqrt{\det(h_{ij})}$、$d\mu_{h_t}=\mu\,dx$ と置きます。$I\times\mathbb T^n$ はコンパクトであり、$h$ は滑らかで正定値なので、ある $c,C>0$ に対して

$$
c|\xi|^2\le h^{ij}(t,x)\xi_i\xi_j\le C|\xi|^2,
\qquad c\le\mu(t,x)\le C
$$

が全点で成り立ちます。これが高階のノルムを比較できる理由です。

先行章と同じ符号規約 $P=-\Box_g+q$（実数値の滑らかな $q$）を使用します。[HPDE5のnormally hyperbolic主シンボル](../HPDE5/index.md#def-hpde5-normally-hyperbolic)と整合するよう、成分を直接計算しましょう。$\Box_g=\mu^{-1}\partial_a(\mu g^{ab}\partial_b)$ より

$$
\Box_g u=-\partial_t^2u-a\partial_tu
+\mu^{-1}\partial_i(\mu h^{ij}\partial_ju),\qquad
a=\partial_t\log\mu.
$$

したがって

$$
Pu=\partial_t^2u+a\partial_tu
-h^{ij}\partial_i\partial_ju-b^j\partial_ju+qu,\qquad
b^j=\mu^{-1}\partial_i(\mu h^{ij}).
$$

例えば $h_{11}=e^{2kt}$ の一次元模型では $\mu=e^{kt}$、$a=k$、$b^1=0$ なので

$$
P=\partial_t^2+k\partial_t-e^{-2kt}\partial_x^2+q.
$$

この $k\partial_t$ は時間変化する体積密度から生じます。平坦な式だけを高階へ機械的に持ち込めない理由がここにもあります。

多重指数 $\alpha=(\alpha_1,\ldots,\alpha_n)\in\mathbb N_0^n$ に対し、$|\alpha|=\sum_i\alpha_i$、$D^\alpha=\partial_1^{\alpha_1}\cdots\partial_n^{\alpha_n}$ とします。固定した $\lambda>0$ で、各 $w=D^\alpha u$ の一次エネルギーを足すことにします。

<a id="def-hpde9-high-energy"></a>
<!-- formal-statement-start -->
> **定義（高階スライスエネルギー）**  
> 上記の $I\times\mathbb T^n$ と $h_t$、整数 $m\ge0$、定数 $\lambda>0$ を固定する。十分滑らかな実関数 $u$ に対し

$$
\mathcal E_m[u](t)
=\frac12\sum_{|\alpha|\le m}
\int_{\mathbb T^n}
\left(
|\partial_tD^\alpha u|^2+
h^{ij}\partial_iD^\alpha u\,\partial_jD^\alpha u+
\lambda|D^\alpha u|^2
\right)\mu\,dx
$$

> を第 $m$ 階エネルギーと定める。$m=0$ は[HPDE8の正にずらした一次エネルギー](../HPDE8/index.md#def-hpde8-shifted-energy)である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde9-high-energy -->
### 直接例：一つ高い階数の微分が現れる

$h=dx^2$、$n=1$、$u(t,x)=A(t)\sin(2x)$、$m=1$ とします。$D^0u=A\sin2x$、$Du=2A\cos2x$ なので

$$
\mathcal E_1=\frac12\int_0^{2\pi}
\left[A'^2\sin^22x+4A^2\cos^22x+\lambda A^2\sin^22x
+4A'^2\cos^22x+16A^2\sin^22x+4\lambda A^2\cos^22x\right]dx.
$$

$\int_0^{2\pi}\sin^22x\,dx=\int_0^{2\pi}\cos^22x\,dx=\pi$ を入れると

$$
\mathcal E_1=\frac{\pi}{2}\left(5A'^2+(20+5\lambda)A^2\right).
$$

**定義の確認**：$u_x$ だけでなく $u_{xx}$、$u_{xt}$ も数えており、各積分項は正です。これが「初期変位は $H^{m+1}$、初期速度は $H^m$」という一階のずれを生みます。
<!-- definition-example-end -->

トーラス上の $H^r$ ノルムは、整数 $r\ge0$ に対し $\|v\|_{H^r}^2=\sum_{|\gamma|\le r}\|D^\gamma v\|_{L^2(dx)}^2$ と置きます。正定値性、$\mu$ の上下界、$\lambda>0$ により、$t$ によらない定数 $c_m,C_m>0$ が存在して

$$
c_m\bigl(\|u(t)\|_{H^{m+1}}^2+\|\partial_tu(t)\|_{H^m}^2\bigr)
\le \mathcal E_m[u](t)
\le C_m\bigl(\|u(t)\|_{H^{m+1}}^2+\|\partial_tu(t)\|_{H^m}^2\bigr).
$$

左の評価で $m+1$ 階の空間微分は、$|\alpha|=m$ の $\partial_iD^\alpha u$ に含まれます。右の評価ではどの項も高々 $m+1$ 階です。有限個の多重指数の重複を定数へ吸収できます。

## 2. 係数を微分した瞬間、交換子が発生する

$Pu=f$ を空間方向に一度微分した場合でも、$P(Du)=Df$ ではありません。例えば $q=q(x)$ なら

$$
\partial_x(qu)=q\,u_x+q_xu,\qquad
P(u_x)=f_x-q_xu
$$

であり、$q_xu$ を落とすと誤りです。空間計量が変動すると主部にも同じ現象が起きます。交換子を $[P,D^\alpha]=PD^\alpha-D^\alpha P$ と約束します。

<a id="prop-hpde9-commutator"></a>
<!-- formal-statement-start -->
> **命題（空間微分と波動作用素の交換子）**  
> 上記の滑らかな係数 $a,h^{ij},b^j,q$ と任意の多重指数 $\alpha$ に対し、滑らかな $u$ について

$$
\begin{aligned}
[P,D^\alpha]u
={}&-\sum_{0<\beta\le\alpha}\binom{\alpha}{\beta}
(D^\beta a)\,\partial_tD^{\alpha-\beta}u\\
&+\sum_{0<\beta\le\alpha}\binom{\alpha}{\beta}
(D^\beta h^{ij})\,\partial_i\partial_jD^{\alpha-\beta}u\\
&+\sum_{0<\beta\le\alpha}\binom{\alpha}{\beta}
(D^\beta b^j)\,\partial_jD^{\alpha-\beta}u
-\sum_{0<\beta\le\alpha}\binom{\alpha}{\beta}
(D^\beta q)\,D^{\alpha-\beta}u
\end{aligned}
$$

> が成立する。$\binom{\alpha}{\beta}=\prod_i\binom{\alpha_i}{\beta_i}$、$0<\beta\le\alpha$ は各成分の大小を満たし $|\beta|\ge1$ の意味とする。特に $|\alpha|\le m$ なら右辺の $u$ の空間微分は高々 $m+1$ 階、時間を含む微分は $\partial_tD^\gamma u$、$|\gamma|\le m-1$ に限られる。
<!-- formal-statement-end -->

### 証明の見取り図

多重指数の積の微分公式で「係数を一度も微分しない項」を取り除きます。最も危険な $h^{ij}$ の項でも、係数側に一回以上微分が当たるため $u$ 側の微分階数は $|\alpha-\beta|+2\le m+1$ です。ここが微分損失を防ぐ核心です。

<!-- proof-start -->
### 証明

積の微分公式を一つの係数 $c$ と関数 $v$ に適用すると

$$
D^\alpha(cv)=cD^\alpha v+
\sum_{0<\beta\le\alpha}\binom{\alpha}{\beta}
(D^\beta c)D^{\alpha-\beta}v.
$$

$[\partial_t^2,D^\alpha]=0$ です。一方、例えば $a\partial_t$ について

$$
a\partial_tD^\alpha u-D^\alpha(a\partial_tu)
=-\sum_{0<\beta\le\alpha}\binom{\alpha}{\beta}
(D^\beta a)\partial_tD^{\alpha-\beta}u
$$

となります。$-h^{ij}\partial_i\partial_j$、$-b^j\partial_j$、$q$ にも同じ式を適用し、符号を分配すると表示した四つの和が得られます。$h^{ij}$ の和では $|\alpha-\beta|+2\le|\alpha|+1$、$b^j$ の和では $|\alpha-\beta|+1\le|\alpha|$、$q$ では $|\alpha-\beta|\le|\alpha|-1$ です。$a$ の和には時間微分が一回だけ現れます。$\square$
<!-- proof-end -->

例えば一次元で $h_{11}=e^{2\varphi(x)}$、$q=0$、$\varphi(x)=\varepsilon\sin x$ とすると $\mu=e^\varphi$、$a=0$、

$$
h^{11}=e^{-2\varphi},\qquad b^1=-\varphi'e^{-2\varphi},
\qquad P=\partial_t^2-e^{-2\varphi}\partial_x^2+\varphi'e^{-2\varphi}\partial_x.
$$

この場合

$$
[P,\partial_x]u
=-2\varphi'e^{-2\varphi}u_{xx}
+\partial_x(-\varphi'e^{-2\varphi})u_x.
$$

$u_{xx}$ は確かに残りますが、$\mathcal E_1$ の中の $|u_{xx}|^2$ がそれを制御します。**係数が一定の場合に交換子が消える**ことも、この式で直接確認できます。

## 3. 高階エネルギー不等式を閉じる

前節の交換子を単に列挙しても、各階が互いに増幅し合う可能性が残ります。次の定理ではすべての $|\alpha|\le m$ を**一緒に**数えることで閉じます。これは滑らかな解に対する事前評価であり、まだ解の存在を導いていません。

<a id="thm-hpde9-high-energy-estimate"></a>
<!-- formal-statement-start -->
> **定理（コンパクト有限時間帯の高階Sobolev評価）**  
> $I=[s,T]$、$\mathbb T^n$ 上で $h_{ij}$ は滑らかで一様正定値、$q$ は滑らかな実数値関数とする。$m\ge0$ を整数とし、$u,f$ は滑らかで $Pu=f$ を満たすとする。$\lambda>0$ を固定すると、$m$、有限時間帯、計量とポテンシャルの有限階の係数界に依存する $K_m\ge1$ が存在し、任意の $s\le t\le T$ で

$$
\|u(t)\|_{H^{m+1}}^2+\|\partial_tu(t)\|_{H^m}^2
\le K_m e^{K_m(t-s)}
\left(
\|u(s)\|_{H^{m+1}}^2+\|\partial_tu(s)\|_{H^m}^2+
\int_s^t\|f(\tau)\|_{H^m}^2\,d\tau
\right)
$$

> が成立する。特に源と初期データの同じ階数が一致する二つの滑らかな解の差にも適用できる。空間全体が非コンパクトな場合に、これと同じ**大域的定数**の存在を無仮定で主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

一次エネルギーを $w=D^\alpha u$ に適用すると、その源は $D^\alpha f+[P,D^\alpha]u$ です。交換子の右辺には高々一階上の**空間**微分が残りますが、すべて $\mathcal E_m$ の内部にあります。$L^2$ の積評価と[HPDE8のGrönwall補題](../HPDE8/index.md#lem-hpde8-gronwall)で不等式を積分します。

<!-- proof-start -->
### 証明

**(1) 一つの $w$ について。** $e_\lambda[w]=\frac12(w_t^2+h^{ij}w_iw_j+\lambda w^2)$ と置きます。$\partial_t\mu=a\mu$ を使い、トーラスの周期境界で部分積分すると

$$
\begin{aligned}
\frac{d}{dt}\int e_\lambda[w]\mu\,dx
={}&\int\bigl(w_tw_{tt}+h^{ij}w_i\partial_jw_t+\lambda ww_t\bigr)\mu\,dx\\
&+\frac12\int\bigl((\partial_th^{ij})w_iw_j+2ae_\lambda[w]\bigr)\mu\,dx\\
={}&\int w_t(w_{tt}-\Delta_{h_t}w+\lambda w)\mu\,dx\\
&+\frac12\int\bigl((\partial_th^{ij})w_iw_j+2ae_\lambda[w]\bigr)\mu\,dx.
\end{aligned}
$$

ここで $\Delta_{h_t}w=\mu^{-1}\partial_i(\mu h^{ij}\partial_jw)$ です。$Pw=w_{tt}+aw_t-\Delta_{h_t}w+qw$ を代入すれば

$$
\begin{aligned}
\frac{d}{dt}\int e_\lambda[w]\mu\,dx
=\int\Bigl[
&w_tPw-aw_t^2+(\lambda-q)ww_t\\
&+\tfrac12(\partial_th^{ij})w_iw_j+a e_\lambda[w]
\Bigr]\mu\,dx.
\end{aligned}
$$

コンパクト時間帯では $|a|,|\lambda-q|,|\partial_th^{ij}|$ は有界です。正定値性から $|w_t|^2+|\partial_xw|^2+\lambda|w|^2$ は $e_\lambda[w]$ と比較できます。$|w_tPw|\le\frac12|Pw|^2+\frac12|w_t|^2$ を使えば

$$
\frac{d}{dt}\int e_\lambda[w]\mu\,dx
\le C\int e_\lambda[w]\mu\,dx+C\|Pw\|_{L^2(dx)}^2
$$

となります。定数 $C$ は $w$ や $f$ に依存しません。

**(2) 交換子を同じエネルギーで支配する。** $w_\alpha=D^\alpha u$ と置くと[交換子命題](#prop-hpde9-commutator)から

$$
Pw_\alpha=D^\alpha f+[P,D^\alpha]u.
$$

$|\alpha|\le m$ のすべてを二乗和すると、係数の空間微分が $L^\infty$ で有界であること、$|\alpha-\beta|+2\le m+1$ であること、$|\alpha-\beta|\le m-1$ であることから

$$
\sum_{|\alpha|\le m}\|[P,D^\alpha]u\|_{L^2(dx)}^2
\le C_m\Bigl(\|u\|_{H^{m+1}}^2+\|u_t\|_{H^m}^2\Bigr)
\le C'_m\mathcal E_m[u].
$$

ここで必要な係数界には例えば $\partial_x^{\le m}a$、$\partial_x^{\le m}h^{ij}$、$\partial_x^{\le m}b^j$、$\partial_x^{\le m}q$ が含まれます。$b$ は $h$ の一階空間微分を含むので、計量には空間方向で $m+1$ 階までの界を要求していることに注意します。またエネルギーの時間微分に $\partial_th$ の界が必要です。

**(3) 和を取ってGrönwallへ。** (1)をすべての $w_\alpha$ へ加え、$(A+B)^2\le2A^2+2B^2$ を使うと

$$
\mathcal E_m'(t)
\le C_m\mathcal E_m(t)+C_m\|f(t)\|_{H^m}^2.
$$

これを $s$ から $t$ へ積分して[積分型Grönwall補題](../HPDE8/index.md#lem-hpde8-gronwall)に $E=\mathcal E_m$、$F=\|f\|_{H^m}^2$ を入れれば

$$
\mathcal E_m(t)\le e^{C_m(t-s)}
\left(\mathcal E_m(s)+C_m\int_s^t\|f(\tau)\|_{H^m}^2\,d\tau\right).
$$

最後に[高階エネルギーのノルム比較](#def-hpde9-high-energy)を両端に適用し、有限の係数を $K_m$ にまとめれば定理の不等式を得ます。$\square$
<!-- proof-end -->

ここで $m$ の値を増やすと係数の必要な導関数界も増えます。すべての $m$ に同じ $K$ が存在するわけではありません。また時間の二階微分を含む主係数が空間で変化する一般のlapseでは、$\partial_x^m u_{tt}$ を方程式で消去してから計算する必要があります。本章の座標証明を、その処理なしに任意の $g=-\beta^2dt^2+h_t$ へ同一視してはいけません。

## 4. 共変微分では曲率が交換子へ入る

局所座標の $\partial_i$ だけでは、ベクトル束や時空の接続を持った方程式を扱いにくくなります。[HPDE4の接続](../HPDE4/index.md#def-hpde4-connection)を使うと、スカラー関数 $u$ の一階微分は1-形式 $du$ です。ここで「関数へ作用する波動作用素」と「1-形式へ作用する波動作用素」の違いを明示します。

$\Box_g^{(1)}\omega=\nabla^a\nabla_a\omega$（1-形式への粗い波動作用素）を定め、曲率規約を

$$
\nabla^a\nabla_a(du)-d(\Box_g u)=\operatorname{Ric}(du),
\qquad
(\operatorname{Ric}(du))_c=\operatorname{Ric}_c{}^d\nabla_du
$$

となるものに固定します。これは二回微分した1-形式の交換で、導関数の順序を変えると曲率が生じる恒等式です。

<a id="prop-hpde9-covariant-commutator"></a>
<!-- formal-statement-start -->
> **命題（スカラー波動の共変微分と曲率補正）**  
> 上記の曲率規約を持つ滑らかなLorentz時空 $(M,g)$ で、$q$ は滑らかな実関数、$u$ は滑らかで $(-\Box_g+q)u=f$ を満たすとする。1-形式への作用素 $P^{(1)}=-\Box_g^{(1)}+q$ を定めると

$$
P^{(1)}(du)=df-\operatorname{Ric}(du)-u\,dq
$$

> が成立する。これは $P$ が $du$ にそのまま作用するという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

作用素の対象がスカラーから1-形式に変わったことを先に確認します。主部の交換はRicci曲率、零次の $q$ の交換は $u\,dq$ です。

<!-- proof-start -->
### 証明

曲率の交換恒等式から

$$
-\Box_g^{(1)}(du)=-d(\Box_g u)-\operatorname{Ric}(du).
$$

次に積の微分 $d(qu)=q\,du+u\,dq$ を使って

$$
\begin{aligned}
P^{(1)}(du)
&=-d(\Box_g u)-\operatorname{Ric}(du)+q\,du\\
&=d(-\Box_g u+qu)-u\,dq-\operatorname{Ric}(du)\\
&=df-u\,dq-\operatorname{Ric}(du)
\end{aligned}
$$

と変形できます。$\square$
<!-- proof-end -->

**直接計算できる二つの模型**：平坦Minkowski時空では $\operatorname{Ric}=0$ なので、$q=q(x)$ の $x$ 成分は $P(u_x)=f_x-q_xu$ になり、前節の交換子と一致します。一方、曲率がある場合には $dq=0$ であっても一般にRicciの項が残ります。高階のテンソル $\nabla^r u$ には、さらに曲率テンソルとその共変微分、$\nabla^{\le r}u$ の積が現れます。したがって曲率の有限階の上界を追加する必要があります。

[HPDE7の束値エネルギーと曲率項](../HPDE7/index.md#prop-hpde7-bundle-divergence)を利用する場合、束計量の正定値性・計量互換接続などを仮定して評価します。束値のnormally hyperbolic作用素は一般に形式的自己随伴ではないため、[HPDE8の束値有限時間評価](../HPDE8/index.md#prop-hpde8-bundle-energy)のように一階項を別に支配する必要があります。これらを無仮定にスカラーの定理から読み替えることはできません。

## 5. 平滑な近似列から正則性へ移れる条件

[GPDE3の局所平滑化](../../GPDE/GPDE3/index.md#thm-gpde3-local-mollification)で初期データを滑らかにできても、その平滑データを満たす波動方程式の解が存在することは、まだ別問題です。後のHPDE11はその存在を構成します。この節では**滑らかな近似解が実際に与えられているなら**何が言えるかだけを証明します。

<a id="prop-hpde9-limit-stability"></a>
<!-- formal-statement-start -->
> **命題（滑らかな近似解のSobolev極限）**  
> [高階評価の定理](#thm-hpde9-high-energy-estimate)と同じ固定作用素 $P$、同じ時間帯で、滑らかな $u_\ell,f_\ell$ が $Pu_\ell=f_\ell$ を満たすとする。ある整数 $m\ge0$ について初期変位 $u_\ell(s)$ が $H^{m+1}$、初期速度 $\partial_tu_\ell(s)$ が $H^m$、源 $f_\ell$ が $L^2(I;H^m)$ でそれぞれCauchy列なら、$u_\ell$ は

$$
C^0(I;H^{m+1})\cap C^1(I;H^m)
$$

> のノルムでCauchy列である。その極限 $u$ は $Pu=f$ を分布の意味で満たし、対応する高階評価を満たす。さらにすべての $m$ でこの条件が成立し、$f$ が時空上で滑らかなら、極限 $u$ も時空上滑らかになる。
<!-- formal-statement-end -->

### 証明の見取り図

二つの近似解の差へ同じ高階評価を適用します。データと源の差が零へ近づけば、解の差も指定したノルムで零へ近づきます。極限の同定は、分布とSobolevの完備性から行います。滑らかさへの格上げにはすべての階の推定とSobolev埋込みが必要です。

<!-- proof-start -->
### 証明

$w_{\ell k}=u_\ell-u_k$、$g_{\ell k}=f_\ell-f_k$ とすると、線形性から $Pw_{\ell k}=g_{\ell k}$ です。[高階評価](#thm-hpde9-high-energy-estimate)を全 $t\in I$ へ適用し上限を取れば

$$
\begin{aligned}
\sup_{t\in I}\bigl(
\|w_{\ell k}(t)\|_{H^{m+1}}^2+\|\partial_tw_{\ell k}(t)\|_{H^m}^2
\bigr)
\le C_{m,I}\Bigl(
&\|w_{\ell k}(s)\|_{H^{m+1}}^2+
\|\partial_tw_{\ell k}(s)\|_{H^m}^2\\
&+\|g_{\ell k}\|_{L^2(I;H^m)}^2
\Bigr).
\end{aligned}
$$

右辺はCauchy条件により $k,\ell\to\infty$ で零です。各Sobolev空間が完備であることと時間連続関数空間の完備性から、$u_\ell\to u$ は $C^0H^{m+1}$、$\partial_tu_\ell\to v$ は $C^0H^m$ で成立します。恒等式

$$
u_\ell(t)=u_\ell(s)+\int_s^t\partial_\tau u_\ell(\tau)\,d\tau
$$

に $H^m$ で極限を通すと $u(t)=u(s)+\int_s^t v(\tau)d\tau$ なので $\partial_tu=v$ です。

方程式の左辺は係数が滑らかな二階線形微分作用素であり、分布収束で連続です。すなわち試験関数 $\phi$ に対し[HPDE4の形式的双対](../HPDE4/index.md#def-hpde4-formal-transpose)で

$$
\langle Pu_\ell,\phi\rangle=\langle u_\ell,P^{\mathrm t}\phi\rangle
\longrightarrow\langle u,P^{\mathrm t}\phi\rangle
=\langle Pu,\phi\rangle
$$

となり、$f_\ell\to f$ の分布収束から $Pu=f$ です。高階評価もノルム収束で極限へ移せます。

すべての $m$ で収束するなら任意の $r$ について $u\in C^0H^r$、$u_t\in C^0H^{r-1}$ です。トーラス上のSobolev埋込み（$r>k+n/2$）から空間 $k$ 階までの微分は連続です。さらに

$$
u_{tt}=\Delta_{h_t}u-a u_t-q u+f
$$

を使うと、右辺はすべての空間Sobolev階数で連続です。時間について式をさらに微分し、係数と $f$ が滑らかなことを用いて帰納すると任意の時間微分も存在し、時空上 $u$ は滑らかです。$\square$
<!-- proof-end -->

**重要な境界**：単に $u\in H^1$ の弱解を一つ与えたからといって、自動的にこの命題の「すべての階でCauchyな滑らかな近似解」が存在するわけではありません。また波動方程式には一般に楕円方程式のような瞬間的な平滑化はありません。例えば平坦トーラスの $u(t,x)=\cos(kt)\sin(kx)$ は斉次波動方程式を満たしますが、時刻が進んでも高周波数 $k$ が消えるわけではありません。

## 6. 演習：交換子を最後まで計算する

<a id="ex-hpde9-a01"></a>
### A1. 階数とノルムの対応
- Level: A
- 問題：平坦な一次元トーラス、$\lambda=1$ で $u(t,x)=A(t)\cos(kx)$、整数 $k\ge1$ とする。$\mathcal E_0$、$\mathcal E_1$ を計算し、$k$ に関する増加次数を比較せよ。

<!-- solution-start -->
**詳細解答**。$u_t=A'\cos kx$、$u_x=-kA\sin kx$、$u_{xt}=-kA'\sin kx$、$u_{xx}=-k^2A\cos kx$ です。三角関数の二乗を積分すると

$$
\mathcal E_0=\frac{\pi}{2}\bigl(A'^2+(k^2+1)A^2\bigr).
$$

$m=1$ では $u_x$ へ一次エネルギーを追加するため

$$
\begin{aligned}
\mathcal E_1
&=\mathcal E_0+\frac{\pi}{2}
\bigl(k^2A'^2+(k^4+k^2)A^2\bigr)\\
&=\frac{\pi}{2}(1+k^2)\bigl(A'^2+(1+k^2)A^2\bigr).
\end{aligned}
$$

$A$ を固定すれば $\mathcal E_0$ は最高 $k^2$、$\mathcal E_1$ は最高 $k^4$ で増えます。前者が空間一階、後者が二階を測っているためです。
<!-- solution-end -->

<a id="ex-hpde9-a02"></a>
### A2. ポテンシャルの交換子の符号
- Level: A
- 問題：$P=\partial_t^2-\partial_x^2+q(x)$、$Pu=f$ とする。$P(u_x)$ と $P(u_{xx})$ を $f$ と $u$ で表せ。

<!-- solution-start -->
**詳細解答**。$x$ 微分を一回行うと $f_x=P(u_x)+q_xu$ なので

$$
P(u_x)=f_x-q_xu.
$$

さらに両辺を $x$ 微分すると $\partial_x(Pu_x)=P(u_{xx})+q_xu_x$ であるため

$$
P(u_{xx})=f_{xx}-q_{xx}u-2q_xu_x.
$$

$q$ の積を二回微分すると係数 $2$ が生じること、$P D^2-D^2P$ の符号が負であることを確認しました。
<!-- solution-end -->

<a id="ex-hpde9-a03"></a>
### A3. 時間依存する体積密度
- Level: A
- 問題：$g=-dt^2+e^{2kt}dx^2$、$q=0$、$u=u(t,x)$ とする。$\mu$、$a$、$b^1$、$Pu$ を導き、$k=0$ の式と比較せよ。

<!-- solution-start -->
**詳細解答**。$h_{11}=e^{2kt}$、$h^{11}=e^{-2kt}$ なので $\det h=e^{2kt}$、$\mu=e^{kt}$ です。よって

$$
a=\partial_t\log\mu=k,\qquad
b^1=\mu^{-1}\partial_x(\mu h^{11})=0
$$

であり、$Pu=u_{tt}+ku_t-e^{-2kt}u_{xx}$ です。$k=0$ なら $u_{tt}-u_{xx}$ へ戻ります。係数 $k$ は空間的体積の時間変化に由来します。
<!-- solution-end -->

<a id="ex-hpde9-a04"></a>
### A4. 交換子の最高微分階数
- Level: A
- 問題：$n=1$、$P=\partial_t^2-h(x)\partial_x^2$、$h>0$ は滑らかとする。$[P,\partial_x^2]u$ を展開し、$u$ の最高階微分が何階か答えよ。

<!-- solution-start -->
**詳細解答**。$\partial_x^2(hu_{xx})=h''u_{xx}+2h'u_{xxx}+hu_{xxxx}$ です。他方 $-h\partial_x^2(u_{xx})=-hu_{xxxx}$ なので

$$
[P,\partial_x^2]u
=h''u_{xx}+2h'u_{xxx}.
$$

一見四階が出そうでも $-hu_{xxxx}$ が相殺され、最高は三階です。$m=2$ の $\mathcal E_2$ は三階の空間微分を含むため、この項を制御できます。
<!-- solution-end -->

<a id="ex-hpde9-b01"></a>
### B1. 一階のずらしたエネルギーを実際に微分する
- Level: B
- 問題：平坦トーラス $\mathbb T^1$ 上で $Pu=u_{tt}-u_{xx}+q(x)u=f$、$\lambda>0$ とする。$w=u_x$ の正にずらしたエネルギー $E_\lambda[w]$ の時間微分を求め、$q_xu$ がどこに現れるか示せ。

<!-- solution-start -->
**詳細解答**。$w$ が従う式は[交換子命題](#prop-hpde9-commutator)から

$$
w_{tt}-w_{xx}+qw=f_x-q_xu
$$

です。$E_\lambda[w]=\frac12\int(w_t^2+w_x^2+\lambda w^2)dx$ とおき積の微分と周期部分積分を行うと

$$
\begin{aligned}
E_\lambda'[w]
&=\int(w_tw_{tt}+w_xw_{xt}+\lambda ww_t)dx\\
&=\int w_t(w_{tt}-w_{xx}+\lambda w)\,dx\\
&=\int w_t\bigl(f_x-q_xu+(\lambda-q)w\bigr)\,dx.
\end{aligned}
$$

したがって $-q_xuw_t$ が追加の誤差です。これを $2|ab|\le a^2+b^2$ で抑え、$|q_x|$ の上界を取れば $\|u\|_{L^2}^2+\|w_t\|_{L^2}^2$ へ帰着します。前者は $\mathcal E_1[u]$ の $\lambda u^2$、後者は同じエネルギーの $w_t^2$ に含まれます。
<!-- solution-end -->

<a id="ex-hpde9-b02"></a>
### B2. 変動計量の交換子と微分損失
- Level: B
- 問題：一次元で $P=\partial_t^2+a(x)\partial_t-h(x)\partial_x^2-b(x)\partial_x+q(x)$ とする。$[P,\partial_x]u$ を計算し、$Pu=f$ の場合に $P(u_x)$ の源を求め、どのノルムで制御できるか説明せよ。

<!-- solution-start -->
**詳細解答**。積の微分を各項へ適用して

$$
[P,\partial_x]u=-a'u_t+h'u_{xx}+b'u_x-q'u.
$$

これは $Pu_x=f_x+[P,\partial_x]u$ を意味するので

$$
P(u_x)=f_x-a'u_t+h'u_{xx}+b'u_x-q'u.
$$

係数の各導関数が有界なら右辺の二乗積分は

$$
\|f_x\|_2^2+C\bigl(\|u_t\|_2^2+\|u_{xx}\|_2^2+\|u_x\|_2^2+\|u\|_2^2\bigr)
$$

以下です。$\mathcal E_1[u]$ には $u_t,u_{xt},u_{xx},u_x,u$ の二乗がすべて含まれるため、源 $\|f\|_{H^1}$ と $\mathcal E_1$ で閉じます。$u_{xx}$ を一階エネルギー $\mathcal E_0$ だけで制御しようとするのが誤りです。
<!-- solution-end -->

<a id="ex-hpde9-b03"></a>
### B3. Cauchy列から解の正則性を確保する
- Level: B
- 問題：同一の滑らかな作用素 $P$ について滑らかな解列 $Pu_j=f_j$ があり、初期変位は $H^3$、初期速度は $H^2$、源は $L^2(I;H^2)$ でそれぞれCauchyとする。(i) 解がどの時間連続Sobolev空間で収束するか、(ii) その極限が分布方程式を満たす理由、(iii) この条件だけで滑らかさまで言えるか、を述べよ。

<!-- solution-start -->
**詳細解答**。(i) [高階推定](#thm-hpde9-high-energy-estimate)で $m=2$ とし、$w_{jk}=u_j-u_k$ に適用します。右辺は三つのCauchy差の二乗和で零へ近づくので

$$
u_j\to u\text{ in }C^0(I;H^3),\qquad
\partial_tu_j\to\partial_tu\text{ in }C^0(I;H^2).
$$

(ii) $u_j\to u$ は分布収束も含みます。任意の試験関数 $\phi$ に対して $\langle Pu_j,\phi\rangle=\langle u_j,P^{\mathrm t}\phi\rangle$ を極限に通せるため、$Pu=f$ です。(iii) $H^3$ は全階数を意味しません。一般次元では $H^3$ から何階の連続微分まで従うかは次元に依存し、任意階の時空微分を得るにはすべての $m$ の推定と滑らかな $f$ が必要です。
<!-- solution-end -->

<a id="ex-hpde9-c01"></a>
### C1. 非自明な主部とポテンシャルを一緒に見積もる
- Level: C
- 問題：一次元トーラス上で $g=-dt^2+e^{2\varphi(x)}dx^2$、$\varphi$ と実数値 $q(x)$ は滑らかとする。$P=-\Box_g+q$、$Pu=f$ とする。(i) $P$ を座標表示し、$[P,\partial_x]u$ を計算せよ。(ii) $u_x$ のエネルギー恒等式へ交換子を代入し、$\mathcal E_1'[u]\le C\mathcal E_1[u]+C\|f\|_{H^1}^2$ を証明せよ。(iii) $q$ と $\varphi$ のどの階数の導関数に定数が依存するか説明せよ。

<!-- solution-start -->
**詳細解答**。(i) $\mu=e^\varphi$、$h^{11}=e^{-2\varphi}$、$a=0$、$b^1=-\varphi'e^{-2\varphi}$ なので

$$
Pu=u_{tt}-e^{-2\varphi}u_{xx}+\varphi'e^{-2\varphi}u_x+qu.
$$

[交換子公式](#prop-hpde9-commutator)で $\alpha=1$ を選べば

$$
[P,\partial_x]u
=-2\varphi'e^{-2\varphi}u_{xx}
+\partial_x(-\varphi'e^{-2\varphi})u_x-q'u.
$$

従って $w=u_x$ の方程式は

$$
Pw=f_x-2\varphi'e^{-2\varphi}u_{xx}
+(-\varphi''+2(\varphi')^2)e^{-2\varphi}u_x-q'u.
$$

(ii) $h$ は時間に依存しないので $\partial_th^{11}=0$、$a=0$ です。主定理の証明のエネルギー恒等式を $w=u$ と $w=u_x$ に適用し加えると

$$
\mathcal E_1'
=\int_{\mathbb T^1}e^\varphi\left[
u_t(f+(\lambda-q)u)
+u_{xt}\left(f_x-2\varphi'e^{-2\varphi}u_{xx}
+(-\varphi''+2(\varphi')^2)e^{-2\varphi}u_x
-q'u+(\lambda-q)u_x\right)
\right]dx.
$$

係数 $\varphi',\varphi'',q,q'$ はコンパクトな円周で有界、$e^\varphi$ と $e^{-2\varphi}$ は上下界を持ちます。各積は $|AB|\le(A^2+B^2)/2$ で抑えられます。例えば最高階項は

$$
\left|\int e^\varphi u_{xt}(-2\varphi'e^{-2\varphi}u_{xx})dx\right|
\le\|\varphi'e^{-2\varphi}\|_\infty
\int e^\varphi(u_{xt}^2+u_{xx}^2)dx
\le C\mathcal E_1.
$$

$f u_t$、$f_xu_{xt}$ には同じ不等式を適用して $C\|f\|_{H^1}^2+C\mathcal E_1$ とします。他の低階積も $u,u_x,u_t,u_{xt}$ の二乗で評価され、すべて $\mathcal E_1$ に含まれます。よって指定の不等式が成立し、[Grönwall補題](../HPDE8/index.md#lem-hpde8-gronwall)で時間積分できます。(iii) $q$ は一階まで、$\varphi$ は二階までと $\sup|\varphi|$ に依存します。変形によっては係数の組を別の形で上界評価しても構いませんが、$u_{xx}$ の項を無視してはなりません。
<!-- solution-end -->

## 7. ここで得たものと次の仕事

この章で証明したのは、**滑らかな解を仮定した高階の事前評価**と、**滑らかな近似解が存在し、データと源の各階が収束するなら、その極限にも正則性が伝わる**という命題です。曲率・変動係数は交換子に現れますが、適切なコンパクト領域と係数界の下で一階下の情報と一階上の空間微分を同じエネルギーにまとめられます。

HPDE10では因果領域の形と光的側面の符号を使って有限伝播を示します。HPDE11では、ここで仮定していた滑らかな近似解そのものを構成する段階へ進みます。高階評価は解の存在を無から生み出す魔法ではなく、近似解を極限まで運ぶための安全装置です。
