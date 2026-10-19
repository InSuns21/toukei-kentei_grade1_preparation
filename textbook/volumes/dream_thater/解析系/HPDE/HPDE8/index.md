# HPDE8 エネルギー不等式と一意性

[HPDE7の乗数電流の発散恒等式](../HPDE7/index.md#thm-hpde7-current-divergence)は、波動方程式からエネルギーの**等式**を取り出しました。しかし曲がった時空では時間並進がKilling場とは限らず、ポテンシャルや束接続にも誤差が残ります。エネルギーが厳密に保存されないからといって、初期値問題の制御を諦める必要はありません。

欲しいのは「時刻 $s$ のエネルギーと源の大きさから、後の時刻 $t$ のエネルギーを抑える」という評価です。発散恒等式の右辺をエネルギー自身で支配し、積分してGrönwall不等式を適用します。これにより、**解の存在をまだ証明しなくても、存在するとした滑らかな解の一意性と連続依存を証明できます**。

以下、$(M,g)$ は符号 $(-,+,\ldots,+)$ の時間向き付き滑らかなLorentz時空、$\nabla$ はLevi-Civita接続、$\Box_g=\nabla^a\nabla_a$ です。局所時間帯には[HPDE6の空間的初期面](../HPDE6/index.md#def-hpde6-cauchy-slice)と[直交時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)を用い、
$$
g=-\beta(t,x)^2dt^2+h_t,\qquad
N=\beta^{-1}\partial_t,\qquad \beta>0
$$
と書きます。$\Sigma_t$ 上の体積密度を $d\mu_{h_t}$ とすると、時空体積密度は $dV_g=\beta\,dt\,d\mu_{h_t}$ です。まず実スカラーの滑らかな解
$$
Pu=f,\qquad P=-\Box_g+q,\qquad q\in C^\infty(M,\mathbb R)
$$
を扱います。以下の定数は**明記した有限時間領域に限って**選び、非コンパクトな空間全体や無限時間軸に一様に延長しません。

## 1. 負のポテンシャルでも測れるエネルギーを作る

[HPDE7の応力テンソル](../HPDE7/index.md#def-hpde7-stress-energy)で $q<0$ とすると、法線方向のエネルギー密度は負にもなります。例えば $u$ が空間的に一定で、$q=-9$ なら、時刻零に $u=1$、$Nu=0$ と置いた密度は $-9/2$ です。「エネルギーが零だから解が零」という推論には使えません。

そこで実際の方程式の $q$ と、エネルギーを作るための**正の定数** $\lambda$ を分けます。$\lambda$ を足しても方程式を変更するのではなく、差 $\lambda-q$ を右辺の誤差として数えます。

スライス接方向への微分 $D_{\Sigma_t}u$ は、[HPDE6で導入した制限計量 $h_t$](../HPDE6/index.md#def-hpde6-cauchy-slice)で長さを測ります。各点で $h_t$-正規直交基底 $(e_1,\ldots,e_n)$ を選べば
$$
|D_{\Sigma_t}u|_{h_t}^2=\sum_{i=1}^n(e_i u)^2
$$
です。基底を直交変換しても右辺の二乗和は変わりません。つまり以下の密度は、特定の座標成分ではなく、法線微分・接方向微分・関数値を測る量です。

<a id="def-hpde8-shifted-energy"></a>
<!-- formal-statement-start -->
> **定義（正にずらした一次エネルギー）**  
> 空間的スライス $\Sigma_t$ と未来向き単位法線 $N$、定数 $\lambda>0$ を固定する。滑らかな実関数 $u$ に対して、スライス上の密度と、測定領域 $K_t\subset\Sigma_t$ のエネルギーをそれぞれ

$$
e_\lambda[u]=\frac12\left((Nu)^2+|D_{\Sigma_t}u|_{h_t}^2+\lambda u^2\right),
\qquad
E_\lambda(t;K_t)=\int_{K_t}e_\lambda[u]\,d\mu_{h_t}
$$

> と定める。$D_{\Sigma_t}u$ は $u$ のスライス接方向への微分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde8-shifted-energy -->
### 直接例：負ポテンシャルと正の測定量を分ける

**定義の確認**。$1+1$ 次元Minkowski時空で $u(t,x)=e^{3t}\cos x$、$\lambda=2$、$N=\partial_t$ とします。$h_t=dx^2$ の単位接ベクトルは $e_1=\partial_x$ なので $Nu=3e^{3t}\cos x$、$|D_{\Sigma_t}u|_{h_t}^2=e^{6t}\sin^2x$ です。定義の三項を順に代入すると
$$
e_2[u]=\frac12\left(9e^{6t}\cos^2x+e^{6t}\sin^2x+2e^{6t}\cos^2x\right)
=\frac{e^{6t}}2(11\cos^2x+\sin^2x)\ge0.
$$
さらに $K_t=[0,2\pi]$ と選ぶと、$\int_0^{2\pi}\cos^2x\,dx=\int_0^{2\pi}\sin^2x\,dx=\pi$ より
$$
E_2(t;K_t)=\frac{e^{6t}}2(11\pi+\pi)=6\pi e^{6t}.
$$
各二乗項が非負であり、密度が零なら $u=Nu=D_{\Sigma_t}u=0$ と分かります。この $u$ は例えば $q=-9$ の方程式では $Pu=e^{3t}\cos x$ を源として満たしますが、正の密度と積分の計算は $q$ の符号に依存しません。
<!-- definition-example-end -->

$\nabla u$ を $N$ に平行な成分とスライス接成分へ分解すると
$$
\nabla^a u\,\nabla_a u=-(Nu)^2+|D_{\Sigma_t}u|^2.
$$
よって[HPDE7のエネルギー電流](../HPDE7/index.md#def-hpde7-energy-current)で $q$ の代わりに $\lambda$、乗数に $X=N$ を入れた $J_\lambda$ は
$$
-g(J_\lambda,N)=T_\lambda(N,N)=e_\lambda[u]
$$
を満たします。ここで $P_\lambda=-\Box_g+\lambda$ とおけば、**元の方程式**から
$$
P_\lambda u=Pu+(\lambda-q)u=f+(\lambda-q)u
$$
を得ます。これが符号を間違えやすい第一段階です。

## 2. 発散恒等式のすべての項を支配する

係数が有界というだけでは不十分です。どの領域上で、何が有界かを指定します。$s\le t\le T$ の有限時間帯にある領域 $\Omega$ を考え、切り口 $K_\tau=\Omega\cap\Sigma_\tau$ は十分滑らか（区分的滑らかでもよい）、領域の閉包はコンパクトとします。境界は上下のスライスと、存在すれば外向き**過去向き光的**共法線を持つ側面からなるとします。側面がない場合も含みます。切り口の時間発展に沿う量は上の時間分割で測ります。

このコンパクト領域では $\beta$、$\beta^{-1}$、$q$、$\nabla N$ の適切な成分が有界です。空間的直交基底での上界が必要なのは、単なる座標成分の有界性よりも、エネルギー密度との比較のためです。

<a id="prop-hpde8-divergence-bound"></a>
<!-- formal-statement-start -->
> **命題（局所エネルギー誤差の点ごとの評価）**  
> 上記のコンパクト有限時間領域 $\Omega$ 上で滑らかな実関数 $u$ が $(-\Box_g+q)u=f$ を満たすとする。任意の定数 $\lambda>0$ に対し、$J_\lambda=-T_\lambda(\,\cdot\,,N)^\sharp$ と置く。このとき $\Omega$ の幾何、$\lambda$ および $q$ の上界のみに依存する有限定数 $c_0,c_1\ge0$ があり、

$$
\nabla_aJ_\lambda^a\le c_0e_\lambda[u]+c_1|f|^2
$$

> が点ごとに成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[HPDE7の発散恒等式](../HPDE7/index.md#thm-hpde7-current-divergence)を $P_\lambda u=f+(\lambda-q)u$ に適用します。右辺の源、ポテンシャル差、乗数の変形をそれぞれ二乗和で抑えます。最後にコンパクト領域で係数の最大値を取ります。

<!-- proof-start -->
### 証明

$\lambda$ は定数なので $N(\lambda)=0$ です。[乗数の変形テンソル](../HPDE7/index.md#def-hpde7-deformation-tensor)を $\pi^N$ と記すと、
$$
\nabla_aJ_\lambda^a
=f\,Nu+(\lambda-q)u\,Nu-\frac12T_\lambda^{ab}\pi^N_{ab}.
$$
まず $2|ab|\le a^2+b^2$ より
$$
|f\,Nu|\le\tfrac12|f|^2+\tfrac12(Nu)^2
\le\tfrac12|f|^2+e_\lambda.
$$
また $u^2\le2e_\lambda/\lambda$ と $(Nu)^2\le2e_\lambda$ なので
$$
|(\lambda-q)u\,Nu|
\le\frac{|\lambda-q|}{2}\bigl(u^2+(Nu)^2\bigr)
\le|\lambda-q|(1+\lambda^{-1})e_\lambda.
$$
各点で $(N,e_1,\ldots,e_n)$ をLorentz直交基底とし、$v_0=Nu$、$v_i=e_i u$ と書きます。$T_\lambda$ の成分は $v_av_b$ と $\frac12g_{ab}(-v_0^2+\sum_i v_i^2+\lambda u^2)$ の和です。各成分の絶対値は二乗和 $v_0^2+\sum_i v_i^2+\lambda u^2=2e_\lambda$ の定数倍以下なので、ある次元のみの定数 $C_n$ が存在し
$$
\left|\frac12T_\lambda^{ab}\pi^N_{ab}\right|
\le C_n\max_{a,b}|\pi^N_{ab}|\,e_\lambda.
$$
$\pi^N$ のこの直交成分のノルムと $|\lambda-q|$ はコンパクトな $\overline\Omega$ で有界です。したがって右辺をまとめて $c_0e_\lambda+c_1|f|^2$ で上から評価できます。例えば $c_1=1/2$ と選べます。$\square$
<!-- proof-end -->

この命題は係数が滑らかでさえあれば**それぞれのコンパクト領域に固有の**定数を持つ、という意味です。$\Omega$ を際限なく拡大しても同じ $c_0$ が使えるとは述べていません。

## 3. 側面フラックスの符号から積分不等式へ

非負のエネルギーが作れても、境界から無制限にエネルギーが流入すれば上面を抑えられません。ここで必要なのは、[HPDE7の光的側面の非負フラックス](../HPDE7/index.md#prop-hpde7-null-flux)です。外向き共法線が過去向き光的である側面では、$N$ が未来向き時間的、$\lambda>0$ なのでフラックスは非負です。

具体的には共法線に計量で対応する光的ベクトルを $K=b(-N+V)$（$b>0$、$V$ は単位スライス接ベクトル）と書くと
$$
g(J_\lambda,K)
=\frac b2\left((Nu-Vu)^2+|D_{\perp V}u|^2+\lambda u^2\right)\ge0.
$$
これは側面の正の密度に対応する式であり、$K$ と面密度を別々に再規格化してはいけません。

<a id="thm-hpde8-energy-inequality"></a>
<!-- formal-statement-start -->
> **定理（有限時間領域の一次エネルギー不等式）**  
> $s<T$ とし、前節の仮定を満たすコンパクトな時空領域 $\Omega\subset\{s\le t\le T\}$ で、滑らかな $u$ が $(-\Box_g+q)u=f$ を満たすとする。$K_t=\Omega\cap\Sigma_t$ とし、側面がないか、外向き過去光的共法線の非負フラックスを持つと仮定する。$\lambda>0$ は固定する。このとき $\Omega$ に依存する有限定数 $A,B\ge0$ が存在し、すべての $s\le t\le T$ について

$$
E_\lambda(t;K_t)\le E_\lambda(s;K_s)
+A\int_s^t E_\lambda(\tau;K_\tau)\,d\tau
+B\int_s^t\int_{K_\tau}|f|^2\,d\mu_{h_\tau}\,d\tau
$$

> が成立する。側面に未来向き光的外法線が現れる領域や、符号不明の時間的側面にはこの結論を無条件で適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

Stokesの収支は「上面＋側面＝下面＋内部発散」です。側面が非負なので落とせます。体積形式を $\beta\,d\tau\,d\mu_{h_\tau}$ に書き、$\beta$ の上界を係数へ吸収します。

<!-- proof-start -->
### 証明

[HPDE7の境界収支定理](../HPDE7/index.md#thm-hpde7-stokes-balance)を時刻 $s$ から $t$ までの部分領域 $\Omega_{s,t}$ に適用します。上下面の向きと $-g(J_\lambda,N)=e_\lambda$ により
$$
E_\lambda(t;K_t)+F_{\mathrm{side}}(s,t)
=E_\lambda(s;K_s)+\int_{\Omega_{s,t}}\nabla_aJ_\lambda^a\,dV_g.
$$
外向き過去光的側面では、直前の平方和によって $F_{\mathrm{side}}(s,t)\ge0$ です。したがって[点ごとの誤差評価](#prop-hpde8-divergence-bound)を代入し、
$$
E_\lambda(t;K_t)\le E_\lambda(s;K_s)
+\int_s^t\int_{K_\tau}
(c_0e_\lambda+c_1|f|^2)\beta\,d\mu_{h_\tau}\,d\tau.
$$
コンパクトな $\overline\Omega$ 上で $\beta\le\beta_{\max}<\infty$ なので、$A=\beta_{\max}c_0$、$B=\beta_{\max}c_1$ と選べば主張を得ます。積分の切り口は元の $\Omega$ によって指定され、**任意の空間領域を後から勝手に代入しているのではありません**。$\square$
<!-- proof-end -->

## 4. Grönwall不等式が「解は一つだけ」を生む

得られた不等式には、評価したい $E(t)$ 自身の時間積分が右辺に残っています。これを消すのがGrönwallの積分型評価です。使う形を証明してから代入します。

<a id="lem-hpde8-gronwall"></a>
<!-- formal-statement-start -->
> **補題（積分型Grönwall不等式）**  
> $E,F:[s,T]\to[0,\infty)$ を連続関数、$A,B\ge0$、$E_s\ge0$ を定数とする。すべての $t\in[s,T]$ で

$$
E(t)\le E_s+A\int_s^tE(r)\,dr+B\int_s^tF(r)\,dr
$$

> が成り立つならば、

$$
E(t)\le e^{A(t-s)}E_s+
B\int_s^t e^{A(t-r)}F(r)\,dr
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

右辺を補助関数 $H$ とおくと $E\le H$、$H'\le AH+BF$ になります。$e^{-At}$ を掛けて積分するだけで、エネルギーの積分項が消えます。

<!-- proof-start -->
### 証明

$$
H(t)=E_s+A\int_s^tE(r)\,dr+B\int_s^tF(r)\,dr
$$
と定めると $E(t)\le H(t)$、$H(s)=E_s$ であり、積分の微分から
$$
H'(t)=AE(t)+BF(t)\le AH(t)+BF(t).
$$
積の微分を使い
$$
\frac{d}{dt}\bigl(e^{-At}H(t)\bigr)
=e^{-At}(H'(t)-AH(t))
\le Be^{-At}F(t).
$$
これを $s$ から $t$ に積分すると
$$
e^{-At}H(t)-e^{-As}E_s
\le B\int_s^t e^{-Ar}F(r)\,dr.
$$
両辺に $e^{At}$ を掛けて $E(t)\le H(t)$ を使えば結論です。$A=0$ も同じ計算で含まれます。$\square$
<!-- proof-end -->

<a id="thm-hpde8-uniqueness-stability"></a>
<!-- formal-statement-start -->
> **定理（滑らかな解の局所一意性と連続依存）**  
> [有限時間エネルギー不等式](#thm-hpde8-energy-inequality)の仮定の下で、$u$ は次を満たす。

$$
E_\lambda(t;K_t)
\le e^{A(t-s)}E_\lambda(s;K_s)
+B\int_s^t e^{A(t-r)}
\|f(r,\cdot)\|_{L^2(K_r)}^2\,dr.
$$

> 同じ作用素 $P$ に対する二つの滑らかな解 $u,v$ の初期変位・法線微分と源が領域内で一致するとき、$u=v$ が成り立つ。さらに同じ領域・作用素で異なるデータと源を与えた場合、その差のエネルギーは上式で連続的に制御される。これは**与えられた領域に解が存在する場合の条件付き一意性・安定性**であり、存在を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず $F(r)=\int_{K_r}|f|^2d\mu_{h_r}$ として補題へ代入します。二解の差 $w=u-v$ に適用すると $Pw=f_u-f_v$ となり、零差分データと零源ならエネルギーが零になります。正にずらしたエネルギーなので、関数自体も零と判定できます。

<!-- proof-start -->
### 証明

[有限時間エネルギー不等式](#thm-hpde8-energy-inequality)の $E(t)=E_\lambda(t;K_t)$ と $F(t)=\|f(t)\|_{L^2(K_t)}^2$ は滑らかな領域・解の下で連続です。[積分型Grönwall補題](#lem-hpde8-gronwall)の $E_s=E_\lambda(s;K_s)$、同じ $A,B$ を代入すれば表示した推定式になります。

二つの解の差を $w=u-v$、源の差を $g=f_u-f_v$ とすれば、$P$ の線形性から
$$
Pw=Pu-Pv=g.
$$
また[滑らかなCauchyデータと源](../HPDE6/index.md#def-hpde6-cauchy-data)より、時刻 $s$ の差の法線データは $Nw=N u-Nv$、接方向データは $D_{\Sigma_s}w=D_{\Sigma_s}(u-v)$ です。初期変位と初期速度が一致するならこれらは零なので
$$
E_\lambda[w](s;K_s)=0.
$$
源も一致すれば $\|g(r)\|_{L^2(K_r)}^2=0$ です。上の評価の右辺が零となり $E_\lambda[w](t;K_t)=0$。連続で非負な密度の積分が零なので $e_\lambda[w]=0$ です。$\lambda>0$ より $\lambda w^2/2\le e_\lambda[w]$、従って $w=0$ が各切り口で成立します。

一般の差分では初期エネルギーを明示すると
$$
E_\lambda[w](s;K_s)=\frac12\int_{K_s}
\left(|u_1-v_1|^2+
|D_{\Sigma_s}(u_0-v_0)|^2+
\lambda|u_0-v_0|^2\right)d\mu_{h_s}.
$$
これと $\|f_u-f_v\|_{L^2(K_r)}^2$ を同じ評価へ代入すれば、初期差・源差が小さいとき後時刻の一次エネルギー差も小さいことが分かります。$\square$
<!-- proof-end -->

例えば源が零のとき
$$
E_\lambda[w](t)\le e^{A(t-s)}E_\lambda[w](s)
$$
です。したがって有限時間の初期値誤差は指数因子で増幅され得ますが、零誤差だけが自発的に非零へ変わることはありません。$A=0$ が必要なのではなく、**有限であること**が本質です。

## 5. 束値作用素にも同じ構造がある

[HPDE5の接続による作用素分解](../HPDE5/index.md#thm-hpde5-unique-connection)によって一般のnormally hyperbolic作用素を扱えますが、その接続 $\nabla^P$ は[HPDE4の計量両立性](../HPDE4/index.md#def-hpde4-metric-compatible-connection)を自動的には持ちません。ここでは[HPDE4の正定値Hermite束計量](../HPDE4/index.md#def-hpde4-hermitian-bundle-metric)（実束では対称正定値内積）を選び、それと両立する補助接続 $D$ を**別に構成**します。局所正規直交枠では接続行列を零とする局所的な計量両立接続 $D^\alpha$ が作れます。従属する開被覆の分割関数 $\chi_\alpha$ によって
$$
D_Xu=\sum_\alpha\chi_\alpha D_X^\alpha u,\qquad
\sum_\alpha\chi_\alpha=1
$$
と貼り合わせれば、Leibniz則も計量両立の恒等式も保たれます。これは局所枠そのものを大域的に貼り合わせるという主張ではありません。

なぜ $D$ でも同じ二階の方程式を扱えるのでしょうか。二つの接続の差を自己準同型値一形式 $A$ と書くと
$$
\nabla_i^P=D_i+A_i.
$$
[接続波動作用素の局所展開](../HPDE5/index.md#thm-hpde5-unique-connection)へ代入し、$\nabla^{D,\mathrm{End}\otimes T^*}A$ を $D$ とLevi-Civita接続から誘導される $A$ の共変微分とすると
$$
\begin{aligned}
-\Box_g^{\nabla^P}u
={}&-\Box_g^D u-2g^{ij}A_iD_ju\\
&-g^{ij}\bigl((\nabla_i^{D,\mathrm{End}\otimes T^*}A)_j+A_iA_j\bigr)u.
\end{aligned}
$$
二階微分の係数は変わらず、接続の差は一階と零階へ移りました。HPDE5の分解 $P=-\Box_g^{\nabla^P}+V$ と比較すると
$$
B^j=-2g^{ij}A_i,\qquad
C=V-g^{ij}\bigl((\nabla_i^{D,\mathrm{End}\otimes T^*}A)_j+A_iA_j\bigr)
$$
となり、
$$
P=-\Box_g^D+B^aD_a+C
$$
と表示できます。$B^a,C$ は滑らかな束自己準同型の係数で、$B$ が零と仮定する必要はありません。$Pu=f$ なら
$$
(-\Box_g^D+\lambda)u
=f-B^aD_au+(\lambda I-C)u
$$
です。以下では $B^aD_au$ を一次エネルギーで、$(\lambda I-C)u$ を正にずらした零次エネルギーで抑えます。

<a id="prop-hpde8-bundle-energy"></a>
<!-- formal-statement-start -->
> **命題（束値normally hyperbolic作用素の有限時間評価）**  
> $E\to M$ を有限ランクの滑らかな実・複素ベクトル束とし、滑らかな正定値束計量と両立接続 $D$ を固定する。コンパクトな有限時間領域 $\Omega$ 上で $P=-\Box_g^D+B^aD_a+C$ を滑らかなnormally hyperbolic作用素とし、$Pu=f$ に滑らかな束切断解 $u$ があるとする。境界と時間分割は[有限時間エネルギー不等式](#thm-hpde8-energy-inequality)と同じ条件を満たす。このとき任意の $\lambda>0$ に対し、実部を用いた束値一次エネルギー

$$
\mathcal E_\lambda(t)=\frac12\int_{K_t}
\left(\|D_Nu\|^2+\|D_{\Sigma_t}u\|^2+\lambda\|u\|^2\right)d\mu_{h_t}
$$

> について、$\Omega$ 上の $B,C,D$ の曲率・幾何の有界量に依存する有限定数 $A_E,B_E\ge0$ が存在し、

$$
\mathcal E_\lambda(t)\le e^{A_E(t-s)}\mathcal E_\lambda(s)
+B_E\int_s^t e^{A_E(t-r)}\|f(r)\|_{L^2(K_r)}^2\,dr
$$

> が成り立つ。初期速度を[HPDE6の定義](../HPDE6/index.md#def-hpde6-cauchy-data)による $\nabla_N^P u$ として与えても、同じ領域で束値の滑らかな解の一意性・連続依存が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$D$ と正定値束計量で作った応力テンソルに[HPDE7の束値の曲率補正](../HPDE7/index.md#prop-hpde7-bundle-divergence)を適用します。源の一次係数、零次係数、接続曲率はいずれも $\|u\|$ と $\|Du\|$ の積であり、コンパクト領域ではエネルギーで制御できます。側面は正の二乗和のままです。

<!-- proof-start -->
### 証明

[束値の応力テンソルの発散命題](../HPDE7/index.md#prop-hpde7-bundle-divergence)で零次作用素に自己随伴な $\lambda I$ を入れると、$\nabla^{\mathrm{End}}(\lambda I)=0$ です。$Pu=f$ を書き直した式から、$P_\lambda^D u=f'$ の源は
$$
f'=f-B^aD_au+(\lambda I-C)u.
$$
このとき電流の発散は $D_Nu$ と $f'$ の内積の実部、曲率と $Du,u$ の内積の実部、および $T^{ab}\pi^N_{ab}$ の項の和です。例えば $B,C$ の作用素ノルムの上界を $b_0,c_0$ として
$$
|\operatorname{Re}\langle B^aD_au,D_Nu\rangle|
\le b_0|Du|_{\mathrm{frame}}\,\|D_Nu\|
\le b_0\,|Du|_{\mathrm{frame}}^2,
$$
ただし $|Du|_{\mathrm{frame}}^2=\|D_Nu\|^2+\sum_i\|D_{e_i}u\|^2$ とし、$b_0$ に有限個の添字の和を吸収しました。また
$$
|\operatorname{Re}\langle(\lambda I-C)u,D_Nu\rangle|
\le\tfrac12(\lambda+c_0)(\|u\|^2+\|D_Nu\|^2).
$$
曲率補正も曲率の上界を $r_0$ として
$$
|\operatorname{Re}\langle D^au,R^D_{ab}u\rangle N^b|
\le r_0|Du|_{\mathrm{frame}}\|u\|
\le\tfrac12r_0(|Du|_{\mathrm{frame}}^2+\|u\|^2).
$$
$\lambda>0$ であるため $\|u\|^2\le2e_\lambda^E/\lambda$、$|Du|_{\mathrm{frame}}^2\le2e_\lambda^E$ です。乗数変形項もスカラーの場合と同じ成分評価で抑えられ、従って
$$
\nabla_aJ_E^a\le c_E e_\lambda^E+d_E\|f\|^2
$$
となります。光的側面の符号も確かめます。各点で未来向き単位法線 $N$ と接方向正規直交基底 $(e_i)$ を取り、外向き過去光的ベクトルを $K=b(-N+e_1)$（$b>0$）とします。$v_0=D_Nu$、$v_i=D_{e_i}u$ とおくと、[HPDE7で構成した束値応力テンソル](../HPDE7/index.md#prop-hpde7-bundle-divergence)を成分表示すると
$$
\begin{aligned}
g(J_E,K)
&=-T_E(N,K)=b\bigl(T_E(N,N)-T_E(N,e_1)\bigr)\\
&=\frac b2\left(\|v_0-v_1\|^2+
\sum_{i=2}^n\|v_i\|^2+\lambda\|u\|^2\right)\ge0.
\end{aligned}
$$
したがって側面フラックスを落としてStokesを適用でき、$dV_g=\beta\,dt\,d\mu_h$ と[積分型Grönwall補題](#lem-hpde8-gronwall)によって表示した評価を得ます。

最後に初期データとの対応を確かめます。[HPDE6のCauchyデータ](../HPDE6/index.md#def-hpde6-cauchy-data)では初期速度を作用素固有の接続 $\nabla^P$ で測ります。一方、ここでのエネルギーは $D$ によるものです。二解の差 $w=u-v$ に対して、上の $A=\nabla^P-D$ から
$$
D_Nw=\nabla_N^Pw-A_Nw,\qquad
D_{\Sigma_s}w=D_{\Sigma_s}(w|_{\Sigma_s})
$$
です。初期変位と $\nabla_N^P$ による初期速度がともに一致すれば、$w|_{\Sigma_s}=0$ と $\nabla_N^Pw|_{\Sigma_s}=0$ なので $D_Nw|_{\Sigma_s}=D_{\Sigma_s}w=0$、よって $\mathcal E_\lambda[w](s)=0$ です。さらに一般の初期差についても
$$
\|D_Nw\|^2\le 2\|\nabla_N^Pw\|^2+
2\|A_N\|_{\mathrm{op}}^2\|w\|^2
$$
であり、コンパクトな初期切り口上で $\|A_N\|_{\mathrm{op}}$ は有界です。したがって初期エネルギーは初期変位の $H^1_D$ 型の大きさと、$\nabla_N^P$ による初期速度の $L^2$ 型の大きさで制御されます。[スカラーの場合の一意性の証明](#thm-hpde8-uniqueness-stability)と同様に差分へエネルギー評価を適用すれば、作用素固有のCauchyデータについても一意性・連続依存が従います。$\square$
<!-- proof-end -->

**注意**：ここでの $D$ はエネルギー評価のために選んだ接続です。一般の作用素の自然な接続が計量非互換だからといって、束値エネルギー評価そのものが不可能になるわけではありません。一方、$B,C$ や曲率の上界を持たない非コンパクト全域へ、この命題の定数を持ち出すことはできません。

## 6. 局所領域から全体の一意性をどう読むか

時空の全体で零初期データに対する一意性を述べるときにも、一度に全スライスのエネルギーを積分する必要はありません。各点の過去にあるコンパクトな因果領域を選び、その領域の光的側面が**外向き過去光的**となるようにすれば、上の評価を局所的に適用できます。ゼロ初期値・ゼロ源ならその領域で場が零になり、そのような領域で覆われた範囲の一意性が従います。

ただし、任意の「過去円錐」と書けば直ちに滑らかでコンパクトな境界が得られるわけではありません。因果構造・境界の正則性・切り口のコンパクト性は別途確かめる必要があります。[LORGの大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)に基づく因果ダイヤモンドのコンパクト性はその道具になります。特に任意の非コンパクト $\Sigma$ に対して $\int_\Sigma e_\lambda$ が有限であることを、滑らかさだけから結論してはいけません。

この章は**一意性と連続依存**を証明しましたが、解の存在と一般の支持伝播を証明したわけではありません。存在には後の局所構成、支持の精密な評価には因果ダイヤモンドの取り方が必要です。

## 7. 演習：不等式を自分で閉じる

<a id="ex-hpde8-a01"></a>
### A1. ずらしたエネルギーの三つの項
- Level: A
- 問題：Minkowski平面で $u(t,x)=t(1+x)$、$\lambda=4$ とする。$e_4[u]$ を計算し、各項の非負性を確認せよ。

<!-- solution-start -->
**詳細解答**。$Nu=u_t=1+x$、$D_{\Sigma_t}u=u_x=t$、$u=t(1+x)$ です。[正にずらした一次エネルギー](#def-hpde8-shifted-energy)へ代入すると
$$
e_4[u]=\frac12\bigl((1+x)^2+t^2+4t^2(1+x)^2\bigr)\ge0.
$$
係数 $4>0$ であるから各項は非負です。$e_4[u]=0$ なら $u=u_t=u_x=0$ も従います。
<!-- solution-end -->

<a id="ex-hpde8-a02"></a>
### A2. 右辺に置くポテンシャル差
- Level: A
- 問題：$P=\partial_t^2-\partial_x^2-5$、$\lambda=2$、$Pu=f$ とする。$P_\lambda u=(\partial_t^2-\partial_x^2+2)u$ を $f$ と $u$ で表せ。

<!-- solution-start -->
**詳細解答**。$P_\lambda-P=2-(-5)=7$ なので
$$
P_\lambda u=Pu+(P_\lambda-P)u=f+7u.
$$
$-7u$ ではありません。源へ送る項は[点ごとの発散評価](#prop-hpde8-divergence-bound)で $(\lambda-q)u$ として現れます。
<!-- solution-end -->

<a id="ex-hpde8-a03"></a>
### A3. 源とエネルギーの積の評価
- Level: A
- 問題：任意の実数 $a,b$ と $\lambda>0$ に対し $|ab|\le(a^2+b^2)/2$ を確かめ、$a=f$、$b=Nu$ を代入して $|fNu|\le |f|^2/2+e_\lambda$ を導け。

<!-- solution-start -->
**詳細解答**。$(|a|-|b|)^2\ge0$ を展開すると $a^2+b^2-2|ab|\ge0$、従って $|ab|\le(a^2+b^2)/2$ です。$a=f$、$b=Nu$ なら
$$
|fNu|\le \tfrac12|f|^2+\tfrac12(Nu)^2
\le\tfrac12|f|^2+e_\lambda,
$$
最後は[一次エネルギーの定義](#def-hpde8-shifted-energy)における他の二乗項の非負性を用いました。
<!-- solution-end -->

<a id="ex-hpde8-a04"></a>
### A4. 積分型Grönwallの定数源
- Level: A
- 問題：$E(t)\le E_0+2\int_0^t E(r)dr+3\int_0^t 1\,dr$（$0\le t\le T$）とする。[積分型Grönwall補題](#lem-hpde8-gronwall)で具体的上界を計算せよ。

<!-- solution-start -->
**詳細解答**。補題の $s=0$、$A=2$、$B=3$、$F(r)=1$ を代入すると
$$
E(t)\le e^{2t}E_0+3\int_0^t e^{2(t-r)}\,dr.
$$
積分は $e^{2t}\int_0^t e^{-2r}dr=e^{2t}(1-e^{-2t})/2$ なので
$$
E(t)\le e^{2t}E_0+\tfrac32(e^{2t}-1).
$$
<!-- solution-end -->

<a id="ex-hpde8-b01"></a>
### B1. 負ポテンシャルで保存エネルギーを誤用しない
- Level: B
- 問題：空間を長さ $L$ の円周とする平坦時空で $P=\partial_t^2-\partial_x^2-9$ とし、$u(t,x)=\cosh(3t)$ とする。(i) $Pu=0$ を確認せよ。(ii) ポテンシャル $q=-9$ の元の密度と、$\lambda=1$ の正の密度を計算せよ。なぜ前者では正定値性を使えないか。

<!-- solution-start -->
**詳細解答**。(i) $u_t=3\sinh(3t)$、$u_{tt}=9\cosh(3t)$、$u_x=0$ だから
$$
Pu=9\cosh(3t)-0-9\cosh(3t)=0.
$$
(ii) 元の密度は
$$
e_q=\tfrac12\bigl(9\sinh^2(3t)-9\cosh^2(3t)\bigr)=-\tfrac92
$$
です。一方、正にずらした密度は
$$
e_1=\tfrac12\bigl(9\sinh^2(3t)+\cosh^2(3t)\bigr)>0.
$$
積分すればそれぞれ $-9L/2$ と $Le_1$ です。前者の負値は $u$ が非零でも起こるので、元の密度だけから零解や安定性を判定してはいけません。
<!-- solution-end -->

<a id="ex-hpde8-b02"></a>
### B2. 光的側面はどちら向きか
- Level: B
- 問題：Minkowski平面の縮む三角領域 $0\le t\le T<R$、$|x|\le R-t$ で $\lambda>0$、$N=\partial_t$ とする。右側面・左側面の外向き共法線と、対応する $J_\lambda$ の非負フラックスを計算せよ。

<!-- solution-start -->
**詳細解答**。右側では $t+x-R\le0$ が領域内なので外向き共法線は $dt+dx$ です。[HPDE7の電流の成分表示](../HPDE7/index.md#def-hpde7-energy-current)を $\lambda$ に対して使うと
$$
J_\lambda^t=\tfrac12(u_t^2+u_x^2+\lambda u^2),
\qquad J_\lambda^x=-u_tu_x.
$$
よって右側の流束密度は
$$
J_\lambda^t+J_\lambda^x
=\tfrac12\bigl((u_t-u_x)^2+\lambda u^2\bigr)\ge0.
$$
左側は $t-x-R\le0$ なので共法線 $dt-dx$、したがって
$$
J_\lambda^t-J_\lambda^x
=\tfrac12\bigl((u_t+u_x)^2+\lambda u^2\bigr)\ge0.
$$
両側で共法線の空間成分の符号が反転することを確かめました。
<!-- solution-end -->

<a id="ex-hpde8-b03"></a>
### B3. 一次項を持つ波動方程式
- Level: B
- 問題：平坦な空間円周上で $Pu=u_{tt}-u_{xx}+b u_t+cu=f$ とする。$b,c$ は実定数、$\lambda>0$ とする。(i) $P_\lambda u$ を表せ。(ii) $\mathcal E_\lambda(t)=\frac12\int(u_t^2+u_x^2+\lambda u^2)dx$ について、ある $C$ が存在し $\mathcal E_\lambda'(t)\le C\mathcal E_\lambda(t)+\frac12\int f^2dx$ を導け。

<!-- solution-start -->
**詳細解答**。(i) $P_\lambda=\partial_t^2-\partial_x^2+\lambda$ なので
$$
P_\lambda u=f-bu_t+(\lambda-c)u.
$$
(ii) 時間・空間で積の微分を展開し、周期境界で全微分の積分が消えるので
$$
\begin{aligned}
\mathcal E_\lambda'(t)
&=\int\bigl(u_tu_{tt}+u_xu_{xt}+\lambda uu_t\bigr)dx\\
&=\int u_t(u_{tt}-u_{xx}+\lambda u)dx\\
&=\int\bigl(fu_t-bu_t^2+(\lambda-c)uu_t\bigr)dx.
\end{aligned}
$$
$\int fu_t\le \tfrac12\int f^2+\tfrac12\int u_t^2$、$|b|u_t^2\le2|b|e_\lambda$、さらに
$$
|(\lambda-c)uu_t|\le \tfrac12|\lambda-c|(u^2+u_t^2)
\le|\lambda-c|(1+\lambda^{-1})e_\lambda.
$$
従って
$$
\mathcal E_\lambda'\le
\left(1+2|b|+|\lambda-c|(1+\lambda^{-1})\right)\mathcal E_\lambda
+\tfrac12\int f^2dx.
$$
この係数は有限なのでGrönwallが使えます。$b$ の符号が非負と仮定されていなくても成立します。
<!-- solution-end -->

<a id="ex-hpde8-b04"></a>
### B4. 自然な接続が計量非互換でも評価できる例
- Level: B
- 問題：$1+1$ 次元Minkowski空間の実1次元自明束に通常の内積を入れ、$a\ne0$ を定数とする。接続を $\nabla^{P}_t=\partial_t+a$、$\nabla^{P}_x=\partial_x$ とし、$P=-\Box_g^{\nabla^P}$ と置く。(i) $\nabla^P$ が通常の内積に両立しないことを示せ。(ii) 計量互換な $D=\partial$ を使って $P=-\Box_g^D+B^tD_t+C$ と表示し、(iii) $Pu=f$ のエネルギー評価で何を誤差へ入れるか示せ。

<!-- solution-start -->
**詳細解答**。(i) 実関数 $v,w$ を切断とみなし、計量両立条件を $t$ 方向で比較します。左辺は $\partial_t(vw)=v_tw+vw_t$、右辺は
$$
(\nabla_t^P v)w+v(\nabla_t^P w)
=v_tw+vw_t+2avw.
$$
$a\ne0$ なので一般に一致せず、非互換です。(ii) $g^{tt}=-1$、$g^{xx}=1$ より
$$
\begin{aligned}
Pu&=(\partial_t+a)^2u-\partial_x^2u\\
&=(\partial_t^2-\partial_x^2)u+2a\partial_tu+a^2u.
\end{aligned}
$$
従って $B^t=2a$、$B^x=0$、$C=a^2$ です。ここで第5節の接続差を直接確かめると $A_t=a$、$A_x=0$、$\nabla^D A=0$ なので、一般式からも $B^t=-2g^{tt}A_t=2a$、$C=-g^{tt}A_t^2=a^2$ を得ます。これで一階・零階係数がどの接続差から生まれたかを照合できました。(iii) 正にずらした作用素 $P_\lambda^D=\partial_t^2-\partial_x^2+\lambda$ に対して
$$
P_\lambda^D u=f-2a\,u_t+(\lambda-a^2)u.
$$
項 $-2a\,u_t$ と $(\lambda-a^2)u$ はそれぞれ $|u_t|^2$ と $|u\,u_t|$ で評価できます。例えば
$$
|2a\,u_t^2|\le4|a|e_\lambda,\qquad
|(\lambda-a^2)u\,u_t|
\le |\lambda-a^2|(1+\lambda^{-1})e_\lambda.
$$
よって有限時間領域で[束値の有限時間評価](#prop-hpde8-bundle-energy)と同じ構造が得られます。自然な接続が非互換でも、補助互換接続へ移せることが計算で分かりました。
<!-- solution-end -->

<a id="ex-hpde8-c01"></a>
### C1. 縮む領域の一意性を最後まで証明する
- Level: C
- 問題：Minkowski平面の $0\le t\le T<R$、$K_t=[-R+t,R-t]$ とする。$q\in C^\infty([0,T]\times[-R,R])$ は実数値で、$u$ は $u_{tt}-u_{xx}+qu=f$ の滑らかな解とする。$\lambda>0$ を選び、(i) $E_\lambda'(t)$ を源とポテンシャル差および非負境界項で表せ。(ii) $q$ が有界であることから積分不等式を導け。(iii) $f=0$、$u(0,x)=u_t(0,x)=0$（$|x|\le R$）なら全三角領域で $u=0$ と証明せよ。

<!-- solution-start -->
**詳細解答**。(i) 密度と流れを
$$
e_\lambda=\tfrac12(u_t^2+u_x^2+\lambda u^2),
\qquad j=-u_tu_x
$$
とします。$P_\lambda u=f+(\lambda-q)u$ を用いた積の微分は
$$
\partial_t e_\lambda+\partial_x j
=u_t(u_{tt}-u_{xx}+\lambda u)
=f u_t+(\lambda-q)uu_t.
$$
可動積分端の速度は右端が $-1$、左端が $+1$ です。よって
$$
\begin{aligned}
E_\lambda'(t)
&=\int_{K_t}\partial_te_\lambda\,dx
-e_\lambda(t,R-t)-e_\lambda(t,-R+t)\\
&=\int_{K_t}\bigl(fu_t+(\lambda-q)uu_t\bigr)dx
-\bigl(e_\lambda+j\bigr)|_{x=R-t}
-\bigl(e_\lambda-j\bigr)|_{x=-R+t}.
\end{aligned}
$$
最後の二項はそれぞれ
$$
e_\lambda+j=\tfrac12((u_t-u_x)^2+\lambda u^2),
\qquad
e_\lambda-j=\tfrac12((u_t+u_x)^2+\lambda u^2)
$$
で非負です。(ii) $Q=\max_{[0,T]\times[-R,R]}|\lambda-q|<\infty$ とおくと
$$
\begin{aligned}
E_\lambda'(t)
&\le \int_{K_t}\left(\tfrac12f^2+\tfrac12u_t^2+
\tfrac Q2(u^2+u_t^2)\right)dx\\
&\le \tfrac12\|f(t)\|_{L^2(K_t)}^2+
\bigl(1+Q(1+\lambda^{-1})\bigr)E_\lambda(t).
\end{aligned}
$$
$C=1+Q(1+\lambda^{-1})$ と置いて $0$ から $t$ に積分すると
$$
E_\lambda(t)\le E_\lambda(0)+C\int_0^t E_\lambda(r)dr+
\tfrac12\int_0^t\|f(r)\|_{L^2(K_r)}^2dr.
$$
(iii) 初期変位が零なのでその接方向微分 $u_x(0,x)$ も零、初期速度も零です。従って $E_\lambda(0)=0$。源が零なら[Grönwall補題](#lem-hpde8-gronwall)から $0\le E_\lambda(t)\le0$ です。$\lambda u^2/2\le e_\lambda$ であり $u$ は連続なので、各 $K_t$ で $u=0$、従って閉じた三角領域全体でも $u=0$ です。ここで $q\ge0$ は仮定していません。
<!-- solution-end -->

## 8. 何を証明し、何を次へ渡すか

この章では、**局所的に有界な誤差項 → 正のエネルギー → 境界フラックス → 積分不等式 → Grönwall → 一意性・連続依存**という一続きの論証を閉じました。負ポテンシャルや非計量互換な自然接続も、補助エネルギーを選べば局所評価から排除されません。

次のHPDE9は方程式を共変微分したときの交換子を計算し、高階Sobolevエネルギーを制御します。さらに後の因果的支持や存在の理論では、本章で用いた領域を実際に構成する仕事が残っています。
