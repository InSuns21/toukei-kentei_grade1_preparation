# HPDE17 大域安定性と因果的な解の支持

[HPDE16の大域Cauchy定理](../HPDE16/index.md#thm-hpde16-global-cauchy)により、初期値と源が滑らかで**コンパクト支持**なら、滑らかな波動解は全時空に一意に存在します。しかし、例えば無限に広い空間で一定の初期変位を与えると、初期データはどこでも零ではありません。この場合にも波動方程式を解けるのでしょうか。また、遠方のデータだけを変更したとき、手元の観測結果はどう変わるのでしょうか。

鍵は「すべての空間を一度に制御する」ことではありません。**観測するコンパクト領域を先に固定**し、そこへ届く因果的な情報だけを切り出して大域定理を適用します。その切り出しを互いに矛盾なく重ねることで、一般の滑らかな非コンパクトデータにも解を構成できます。最後に、この局所的な安定性と、全空間に共通定数を持つSobolev評価の違いを定量的に調べます。

## 1. 時空・作用素・データを固定する

$(M,g)$ は境界のない、時間向き付き滑らかな大域双曲Lorentz多様体で、計量の符号は $(-,+,\ldots,+)$ とします。$E\to M$ は有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ は滑らかな[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)とします。一般の $P$ は形式的自己随伴と仮定しません。

[LORG20の滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)により、$t:M\to\mathbb R$ をCauchy temporal functionとして選び、$\Sigma_s=t^{-1}(s)$、$\Sigma=\Sigma_0$ と書きます。未来向き単位法線を $N$、[HPDE5の一意な接続](../HPDE5/index.md#thm-hpde5-unique-connection)を $\nabla^P$ とします。初期速度には $\nabla_N^P u|_\Sigma$ を用い、座標微分と取り違えません。

今回は、源 $f\in\Gamma(M,E)$ と初期値 $u_0,u_1\in\Gamma(\Sigma,E|_\Sigma)$ は**滑らかであればよく、コンパクト支持とは仮定しません**。目標は全時空で

$$
Pu=f,\qquad u|_\Sigma=u_0,\qquad
\nabla_N^P u|_\Sigma=u_1
$$

を満たす切断を求めることです。

### 最小例：非コンパクトな初期変位

Minkowski平面の $P=\partial_t^2-\partial_x^2$ で $u_0(x)=1$、$u_1(x)=0$、$f=0$ とすれば、$u(t,x)=1$ は全時空で解です。初期データも解も支持が非コンパクトですが、式を直接微分すると $Pu=0$、初期条件も成立します。[HPDE16の定理](../HPDE16/index.md#thm-hpde16-global-cauchy)をこのデータへ**直接**適用することはできません。局所的に切り出したデータへ適用し、結果が一致することを証明する必要があります。

## 2. 一つの観測領域に必要なデータを探す

[因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)を $J^\pm(A)$ と書き、$J(A)=J^+(A)\cup J^-(A)$ とします。コンパクトな観測集合 $Q\subset M$ について、$Q$ の点へ初期面から届き得る場所は $J(Q)\cap\Sigma$ だけです。さらに源の寄与は、初期面と観測点の間にある因果曲線に沿う部分だけです。

$Q$ の時刻が $[-T,T]$ に含まれるような $T>0$ を一つ取ります。以下の集合は実際に切り出す範囲を**大きめに**取るものです。必要最小限であるとは主張しません。

<a id="def-hpde17-causal-footprint"></a>

<!-- formal-statement-start -->
> **定義（コンパクト観測域の因果的足跡）**  
> $(M,g)$ を滑らかな大域双曲時空、$t$ を各レベルがCauchy面である滑らかなCauchy時間関数、$\Sigma=t^{-1}(0)$ とする。コンパクト集合 $Q\subset t^{-1}([-T,T])$（$T>0$）に対し、初期面の**因果的足跡** $K_Q$ と、時間を切った**源の影響候補** $D_Q$ を

$$
K_Q=J(Q)\cap\Sigma,\qquad
D_Q=J(Q)\cap t^{-1}([-T,T])
$$

> により定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde17-causal-footprint -->
**定義の確認**。$M=\mathbb R^{1+1}$、$\Sigma=\{t=0\}$、$Q=\{(2,x):|x|\le1\}$、$T=2$ とします。$Q$ の過去にある初期面の点 $(0,y)$ は、ある $x\in[-1,1]$ へ $|x-y|\le2$ で到達できるので $-3\le y\le3$。$Q$ は初期面より未来にあるため $J^+(Q)\cap\Sigma$ は空です。よって

$$
K_Q=\{(0,y):|y|\le3\}.
$$

$D_Q$ には例えば $(1,0)$ が入り、$(0,4)$ は入りません。$Q$ の点へ到達する曲線が $t=0$ から $t=2$ までに通る点は必ず $D_Q$ にあります。この例で $Q$ と $T$ の指定、$K_Q,D_Q$ の各条件を実際に確認できました。
<!-- definition-example-end -->

<a id="lem-hpde17-footprint-compact"></a>

<!-- formal-statement-start -->
> **補題（足跡のコンパクト性）**  
> 上の定義の大域双曲時空、Cauchy時間関数、コンパクトな $Q\subset t^{-1}([-T,T])$ に対し、$K_Q$ と $D_Q$ はいずれもコンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

$J(Q)$ が無限の未来・過去へ広がっても、時刻を有限区間に制限すれば[HPDE16の有限時間因果影補題](../HPDE16/index.md#lem-hpde16-shadow-compact)を利用できます。初期面の足跡はそのコンパクトな集合の閉部分集合として得られます。

<!-- proof-start -->
### 証明

[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)を $K=Q$、$a=-T$、$b=T$ として未来向き・過去向きへそれぞれ適用すると、

$$
J^+(Q)\cap t^{-1}([-T,T]),\qquad
J^-(Q)\cap t^{-1}([-T,T])
$$

はいずれもコンパクトです。その有限和集合が $D_Q$ です。$\Sigma=t^{-1}(\{0\})$ は連続関数 $t$ の閉集合の逆像なので閉です。$0\in[-T,T]$ から $K_Q=D_Q\cap\Sigma$。従って $K_Q$ もコンパクトです。$\square$
<!-- proof-end -->

この補題のおかげで、一般の滑らかなデータを、$K_Q$ の近くで一致するコンパクト支持データへ切り出せます。滑らかな切断に掛ける「切断関数」は、指定したコンパクト集合の近傍で $1$、遠方で $0$ となる滑らかな実数値関数です。滑らかな多様体の局所有限な1の分割から構成できます。

## 3. 切り出した解が同じ観測値を与える

コンパクトな $K_Q,D_Q$ に対し、それぞれの近傍で $1$ となる滑らかなコンパクト支持関数 $\chi_\Sigma$（$\Sigma$ 上）と $\chi_M$（$M$ 上）を選びます。積を取って

$$
v_0=\chi_\Sigma u_0,\qquad
v_1=\chi_\Sigma u_1,\qquad h=\chi_M f
$$

とすれば、三つは滑らかなコンパクト支持データです。[HPDE16の大域Cauchy定理](../HPDE16/index.md#thm-hpde16-global-cauchy)によって、それらに対する唯一の大域解 $v$ を作れます。

切断関数の選び方によって $v$ の遠方の様子は変わります。しかし $Q$ 上での値は変わらないはずです。このことを先に証明します。

<a id="lem-hpde17-localized-agreement"></a>

<!-- formal-statement-start -->
> **補題（因果的足跡で一致するデータの局所一致）**  
> $(M,g),\Sigma,E,P$ を第1節の設定とし、コンパクト $Q\subset t^{-1}([-T,T])$ とその因果的足跡 $K_Q,D_Q$ を第2節で定める。二つの滑らかな大域解 $v,w\in\Gamma(M,E)$ が、初期面上で $K_Q$ の近傍において同じ二つのCauchyデータを持ち、源 $Pv,Pw$ が $D_Q$ の近傍において一致するなら、$v=w$ が $Q$ 上で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

差 $z=v-w$ に対し、$Pz$ と二つの初期データは観測点 $q\in Q$ へ情報を送れる範囲で零です。[HPDE10の因果的依存・一意性](../HPDE10/index.md#thm-hpde10-causal-dependence)を、未来側と過去側で別々に使います。

<!-- proof-start -->
### 証明

$z=v-w$ とすると、線形性によって $Pz=Pv-Pw$、$\Sigma$ 上で $z|_\Sigma=v_0-w_0$、$\nabla_N^Pz|_\Sigma=v_1-w_1$ です。$q\in Q$ を任意に取ります。

$t(q)\ge0$ のとき、$q$ の値に寄与する初期位置は $J^-(q)\cap\Sigma$ であり、これは $K_Q$ に含まれます。時刻 $0$ から $t(q)$ の間の源候補は

$$
J^-(q)\cap t^{-1}([0,t(q)])\subset D_Q
$$

です。仮定からこれらの領域で差のデータ・源は零になります。そこで[因果的依存評価](../HPDE10/index.md#thm-hpde10-causal-dependence)を点 $q$ と初期面 $\Sigma$ に適用すると $z(q)=0$。

$t(q)\le0$ のときには、$J^+(q)\cap\Sigma\subset K_Q$ と

$$
J^+(q)\cap t^{-1}([t(q),0])\subset D_Q
$$

を用い、同じ依存評価を過去向きへ適用して $z(q)=0$ です。従って任意の $q\in Q$ で $v(q)=w(q)$。この論法は $v,w$ の支持をコンパクトとは仮定しません。$\square$
<!-- proof-end -->

**適用の重要な点**。切り出しの関数を別の $\widetilde\chi_\Sigma,\widetilde\chi_M$ に変えても、得られる二つの大域解はともに $K_Q,D_Q$ で元データへ一致します。従って補題より $Q$ 上で同じ値になります。これは単に「切断関数を消してよい」という代数操作ではなく、因果的な一意性に依存する結論です。

## 4. 非コンパクトな滑らかなデータから大域解を作る

観測集合を一つに固定しただけでは、時空全体で滑らかな解になったとは言えません。そこで $M$ のコンパクト集合を内部が増大する列

$$
Q_1\subset\operatorname{int}Q_2\subset Q_2
\subset\operatorname{int}Q_3\subset\cdots,\qquad
\bigcup_{j\ge1}\operatorname{int}Q_j=M
$$

で尽くします。$M$ は第二可算・局所コンパクトな滑らかな多様体なので、このようなコンパクトな尽くし方を選べます。各 $Q_j$ を時刻帯 $[-T_j,T_j]$ に含め、$T_j$ は増大させます。

各 $Q_j$ の足跡 $K_j,D_j$ は前節の補題でコンパクトです。$\chi_{\Sigma,j}=1$ が $K_j$ の近傍で、$\chi_{M,j}=1$ が $D_j$ の近傍で成り立つような滑らかなコンパクト支持関数を選びます。この切り出しデータから作った[HPDE16の大域解](../HPDE16/index.md#thm-hpde16-global-cauchy)を $v_j$ と書きます。

<a id="thm-hpde17-noncompact-cauchy"></a>

<!-- formal-statement-start -->
> **定理（任意の滑らかなデータの大域Cauchy解）**  
> $(M,g)$ を境界のない時間向き付き滑らかな大域双曲Lorentz多様体、$\Sigma$ を滑らかな空間的Cauchy超曲面、$E\to M$ を有限ランクの滑らかな実または複素ベクトル束、$P$ を滑らかなnormally hyperbolic作用素とする。$N$ は未来向き単位法線、$\nabla^P$ は $P$ の一意な接続とする。
>
> 任意の滑らかな源 $f\in\Gamma(M,E)$ と滑らかな初期データ $u_0,u_1\in\Gamma(\Sigma,E|_\Sigma)$ に対し、唯一の滑らかな切断 $u\in\Gamma(M,E)$ が存在して

$$
Pu=f,\qquad u|_\Sigma=u_0,\qquad
\nabla_N^Pu|_\Sigma=u_1
$$

> を満たす。$f,u_0,u_1$ の支持がコンパクトであるという仮定は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

すべての $v_j$ は異なるコンパクト支持データから得ています。しかし $i\ge j$ のとき、$v_i$ と $v_j$ は**観測域 $Q_j$ に必要な元のデータ**へともに一致するので、その上で同じ解です。従って局所的に定義した値が矛盾せず、開集合上では実際に一つの滑らかな $v_j$ と一致します。

<!-- proof-start -->
### 証明

まず[足跡のコンパクト性](#lem-hpde17-footprint-compact)により、各 $j$ で切り出しに使う滑らかなコンパクト支持関数が存在します。[HPDE16の存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)から、切り出した $f_j=\chi_{M,j}f$ と $(u_{0,j},u_{1,j})=(\chi_{\Sigma,j}u_0,\chi_{\Sigma,j}u_1)$ に対する大域解 $v_j$ を得ます。

$i\ge j$ なら $Q_j\subset Q_i$、$T_j\le T_i$ です。集合の定義から $K_j\subset K_i$、$D_j\subset D_i$ なので、$v_j$ と $v_i$ の初期データは $K_j$ の近傍で、源は $D_j$ の近傍で、ともに元の $(u_0,u_1,f)$ に一致します。[局所一致補題](#lem-hpde17-localized-agreement)を適用すると

$$
v_i|_{Q_j}=v_j|_{Q_j}.
$$

各点 $q\in M$ について、$q\in\operatorname{int}Q_j$ となる $j$ を選び、$u(q)=v_j(q)$ と定めます。$j$ の選び方を変えても、より大きい添字の領域上で値が一致するため、これは良定義です。さらに $q$ の近傍 $\operatorname{int}Q_j$ で $u=v_j$ なので、$u$ は滑らかです。

任意の点 $q$ はある $\operatorname{int}Q_j$ に含まれ、その上で $u=v_j$。$q\in D_j$ でもあることに注意します。実際、$q\in Q_j$ で $q\in J(q)\subset J(Q_j)$、かつ $|t(q)|\le T_j$ です。従って $Pu(q)=Pv_j(q)=f_j(q)=f(q)$ となります。また任意の $p\in\Sigma$ も十分大きい $\operatorname{int}Q_j$ に含まれ、$p\in K_j$ なので $u|_\Sigma=u_0$、$\nabla_N^Pu|_\Sigma=u_1$ です。

最後に、別の滑らかな解 $w$ が同じ源・初期データを満たすとします。$z=u-w$ は $Pz=0$、初期値は二つとも零です。[HPDE10の依存領域一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)を任意の $q$ に適用すれば $z(q)=0$ なので $u=w$ です。$\square$
<!-- proof-end -->

**どこに大域双曲性を使ったか**。コンパクトな観測領域の足跡をコンパクトにする箇所と、因果的な局所一致を全時空のどの点にも適用する箇所です。非コンパクトな初期面を一つの有限被覆で覆ったわけではありません。必要な有限被覆は $Q_j$ ごとに異なります。

## 5. 「連続依存」の意味を局所ノルムで定める

解の存在一意性に続いて、初期データや源を少し変えたとき解がどれほど変化するかを調べます。「少し」の意味には注意が必要です。非コンパクト空間では、空間全体で積分したSobolevノルムが無限大でも、各コンパクト集合上なら滑らかな関数として問題なく扱えます。

コンパクト集合 $C$ とその近くの有限個の座標枠、非負整数 $k$ を選びます。その枠で切断 $v$ の係数の $k$ 階以下の偏微分の絶対値の最大値を測ることにします。枠と座標箱の取り方を変えても、コンパクト集合上での収束の概念は同じです。

<a id="def-hpde17-smooth-local-topology"></a>

<!-- formal-statement-start -->
> **定義（滑らかな切断のコンパクト開 $C^\infty$ 位相）**  
> 滑らかな多様体 $X$ 上の有限ランク滑らかな束 $F\to X$ と切断列 $v_j,v\in\Gamma(X,F)$ に対し、$v_j\to v$ が**コンパクト開 $C^\infty$ 位相**で成り立つとは、任意のコンパクト集合 $C\subset X$、整数 $k\ge0$、$C$ の近くの有限座標枠において、$v_j-v$ の係数の $k$ 階以下のすべての偏微分が $C$ 上で一様に零へ収束することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde17-smooth-local-topology -->
**定義の確認**。$\phi\in C_c^\infty(\mathbb R)$ を非零とし、$v_j(x)=\phi(x-j)$、$v(x)=0$ とします。任意のコンパクト $C\subset[-R,R]$ と任意の整数 $k$ を固定します。$\operatorname{supp}\phi\subset[-A,A]$ なら $j>R+A$ で $v_j$ とそのすべての導関数は $C$ 上で恒等的に零です。従って上の条件はどの $C,k$ に対しても成立します。一方、平行移動で $L^2$ ノルムは保存され、

$$
\|v_j\|_{L^2(\mathbb R)}=\|\phi\|_{L^2(\mathbb R)}>0
$$

なので、全空間の $L^2$ ノルムでは零へ収束しません。局所滑らかな収束と大域積分ノルムでの収束は異なります。
<!-- definition-example-end -->

<a id="thm-hpde17-local-stability"></a>

<!-- formal-statement-start -->
> **定理（大域Cauchy解の局所連続依存）**  
> $(M,g),\Sigma,E,P,N,\nabla^P$ を[任意の滑らかなデータの大域Cauchy定理](#thm-hpde17-noncompact-cauchy)の設定とする。任意のコンパクト集合 $Q\subset M$ と整数 $k\ge0$ に対し、コンパクト集合 $C_\Sigma\subset\Sigma$、$C_M\subset M$、整数 $r\ge0$、定数 $A>0$ が存在して、二組の滑らかなデータから得た解 $u,\widetilde u$ は、有限座標枠での局所ノルムについて

$$
\|u-\widetilde u\|_{C^k(Q)}
\le A\left(
\|u_0-\widetilde u_0\|_{C^r(C_\Sigma)}
+\|u_1-\widetilde u_1\|_{C^r(C_\Sigma)}
+\|f-\widetilde f\|_{C^r(C_M)}
\right)
$$

> を満たす。従って解写像

$$
(f,u_0,u_1)\longmapsto u
$$

> は各切断空間のコンパクト開 $C^\infty$ 位相について線形かつ連続である。$A,C_\Sigma,C_M,r$ は $Q,k$ と背景の幾何・係数に依存してよい。
<!-- formal-statement-end -->

### 証明の見取り図

差のデータを[足跡 $K_Q,D_Q$](#def-hpde17-causal-footprint)の近くでコンパクト支持へ切り出します。差の解は $Q$ 上でその切り出し解と一致します。コンパクト支持の解には[HPDE16の束値高階評価](../HPDE16/index.md#lem-hpde16-bundle-energy)を使い、有限個の座標箱でのSobolev埋込みから $C^k$ ノルムへ移します。

<!-- proof-start -->
### 証明

差を $\delta u=u-\widetilde u$、$\delta f=f-\widetilde f$、$\delta u_a=u_a-\widetilde u_a$（$a=0,1$）と書きます。線形性から $P\delta u=\delta f$、初期値は $(\delta u_0,\delta u_1)$ です。$Q$ を含む時刻帯 $[-T,T]$ を固定し、コンパクトな $K_Q,D_Q$ の近傍で $1$ となる滑らかなコンパクト支持関数 $\chi_\Sigma,\chi_M$ を選びます。切り出したデータ

$$
(\chi_M\delta f,\ \chi_\Sigma\delta u_0,\ \chi_\Sigma\delta u_1)
$$

の[HPDE16の大域解](../HPDE16/index.md#thm-hpde16-global-cauchy)を $w$ とします。[局所一致補題](#lem-hpde17-localized-agreement)より $\delta u=w$ が $Q$ 上で成り立ちます。

切り出したデータの支持は固定したコンパクト集合の中にあります。[HPDE16の有限時間因果影](../HPDE16/index.md#lem-hpde16-shadow-compact)により、その解の $[-T,T]$ 上の支持も固定したコンパクト集合へ入ります。そこを有限個の局所枠で覆い、[HPDE16の高階エネルギー評価](../HPDE16/index.md#lem-hpde16-bundle-energy)を任意に大きい $m$ で適用すると、有限時間帯での $\delta u$ の空間高階導関数・一階時間微分が、初期データと $\chi_M\delta f$ の有限階Sobolevノルムで支配されます。

時間方向の二階以上の微分は、波動方程式の時間二階係数の可逆性から順に求めます。実際、局所還元の一次系 $A^0\partial_tV+A^j\partial_jV+DV=F$ の $A^0$ は可逆なので

$$
\partial_tV=-(A^0)^{-1}\left(\sum_jA^j\partial_jV+DV-F\right)
$$

と置き、これをさらに微分すると時間高階微分も有限階の空間微分と源の微分で支配されます。$m$ を十分大きく選んで、有限個の座標箱の[局所Sobolev埋込み](../HPDE9/index.md#thm-hpde9-high-energy-estimate)を適用すると $\|\delta u\|_{C^k(Q)}$ を切り出したデータの有限階Sobolevノルムで評価できます。

最後に、各切断関数の支持を含む固定コンパクト集合を $C_\Sigma,C_M$ として取り、十分大きい $r$ を選びます。積の微分公式を有限回適用すれば、例えば

$$
\|\chi_M\delta f\|_{H^m}
\le B\sum_{|\alpha|\le m}\sup_{C_M}|\partial^\alpha\delta f|
\le B'\|\delta f\|_{C^r(C_M)}
$$

であり、初期データも同じです。被覆が有限なので定数を一つの $A$ へまとめて主張の不等式を得ます。$Q,k$ は任意だから、定義したコンパクト開 $C^\infty$ 位相での連続性が従います。$\square$
<!-- proof-end -->

例えば先ほどの移動する波 $u_j(t,x)=\phi(x-j-t)$ は、初期データ $(\phi(x-j),-\phi'(x-j))$ が局所滑らかな位相で零へ収束するのに合わせ、解も各コンパクト時空領域で零へ収束します。一方、全空間の $L^2$ ノルムが小さいとは言っていません。

## 6. 非コンパクト支持にも因果的な方向は残る

コンパクト支持データには[HPDE16の支持包含](../HPDE16/index.md#cor-hpde16-slice-compact)がありました。初期値や源が非コンパクトになっても、「未来の解が未来の源と初期面のデータから決まる」という**向き**は変わりません。

記号 $K_\Sigma=\operatorname{supp}u_0\cup\operatorname{supp}u_1\subset\Sigma$ を初期データの支持の和集合とし、$F_+=\operatorname{supp}f\cap t^{-1}([0,\infty))$、$F_-=\operatorname{supp}f\cap t^{-1}((-\infty,0])$ とします。これらは閉集合です。$J^+(K_\Sigma\cup F_+)$ は初期時刻以降に影響を届け得る点、$J^-(K_\Sigma\cup F_-)$ は初期時刻以前に影響を届け得る点を表します。

<a id="prop-hpde17-one-sided-support"></a>

<!-- formal-statement-start -->
> **命題（非コンパクトデータの片側因果支持）**  
> $(M,g),\Sigma,E,P$ を[任意の滑らかなデータの大域Cauchy定理](#thm-hpde17-noncompact-cauchy)の設定とし、$u$ をその解とする。$K_\Sigma,F_+,F_-$ を上で定める。このとき

$$
\begin{aligned}
\operatorname{supp}u\cap t^{-1}([0,\infty))
&\subset J^+(K_\Sigma\cup F_+),\\
\operatorname{supp}u\cap t^{-1}((-\infty,0])
&\subset J^-(K_\Sigma\cup F_-)
\end{aligned}
$$

> が成り立つ。これらの集合がコンパクトであるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

任意の観測点 $q$ の因果的な過去・未来を初期面まで切り戻し、影響域にデータの支持がなければ解は零になることを使います。支持集合の閉性も必要です。源が未来時刻で下から有界であれば、因果的未来への射影は観測点近傍の**コンパクトな有限時間因果影**に制限できます。

<!-- proof-start -->
### 証明

未来側を示します。$A=K_\Sigma\cup F_+$ は閉で、$t(A)\subset[0,\infty)$ です。まず $J^+(A)$ は閉であると確かめます。$q_j\in J^+(A)$、$q_j\to q$ とし、$p_j\in A$ で $p_j\le q_j$ を選びます。$Q=\{q\}\cup\{q_j:j\ge1\}$ はコンパクトで、$t(q_j)$ はある $T>0$ 以下です。すると

$$
p_j\in J^-(Q)\cap t^{-1}([0,T])
$$

です。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)で右辺はコンパクトなので、部分列で $p_j\to p\in A$ とできます。[閉因果関係](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)から $p\le q$、従って $q\in J^+(A)$ です。

$t(q)\ge0$ かつ $q\notin J^+(A)$ とします。$J^-(q)\cap\Sigma$ は $K_\Sigma$ と交わらず、$J^-(q)\cap t^{-1}([0,t(q)])$ は $F_+$ と交わりません。すなわち $q$ の値を決める初期データ・源は因果的な領域上で零です。[HPDE10の因果的依存定理](../HPDE10/index.md#thm-hpde10-causal-dependence)を適用して $u(q)=0$。よって $t\ge0$ では非零点は $J^+(A)$ に含まれます。これは閉集合なので、相対位相の支持も同じ集合内にあります。$\operatorname{supp}u\cap\Sigma$ についても $u|_\Sigma=u_0$ より包含が成立します。

過去側は $A_-=K_\Sigma\cup F_-$ とし、$t(A_-)\subset(-\infty,0]$、$J^-(A_-)$ の閉性を未来・過去の向きを入れ替えて証明します。依存定理を $q$ の未来領域へ適用すれば、同じ包含が得られます。$\square$
<!-- proof-end -->

例えば $u_0=1$、$u_1=0$、$f=0$ なら $K_\Sigma=\Sigma$ です。右辺の未来側は $J^+(\Sigma)$ 全体になり、これは時空コンパクトではありません。因果的支持の定理は「解がコンパクト支持になる」という意味ではないのです。

## 7. 全空間に共通するSobolev評価には何が要るか

ここまでは観測域を固定するごとに係数界とエネルギー定数を取り直しました。空間全体の $H^{m+1}\times H^m$ ノルムで一つの評価を得るには、**全空間で一様な係数界**などの追加条件が必要です。その仕組みを平坦時空の代表例で実証します。

Minkowski時空 $\mathbb R^{1+n}$、$n\ge1$ で実数値ポテンシャル $V(t,x)$ を持つ作用素

$$
P=\partial_t^2-\Delta_x+V(t,x)
$$

を考えます。$V$ は滑らかとし、各 $|\beta|\le m$ に対して

$$
\sup_{|t|\le T,\ x\in\mathbb R^n}|\partial_x^\beta V(t,x)|<\infty
$$

を要求します。ここで空間多重指数 $\beta$ の長さを $|\beta|$ と記し、$H^m(\mathbb R^n)$ は $m$ 階までの空間弱微分が二乗可積分であるSobolev空間です。

<a id="thm-hpde17-uniform-flat-energy"></a>

<!-- formal-statement-start -->
> **定理（一様係数の平坦波動に対する全空間高階安定性）**  
> $T>0$、整数 $m\ge0$ とし、$V\in C^\infty([-T,T]\times\mathbb R^n;\mathbb R)$ の $m$ 階以下の空間偏微分が、$[-T,T]\times\mathbb R^n$ 全体で有界とする。$\partial_t^2u-\Delta_xu+Vu=f$ の滑らかな解 $u$ が各有限時間帯でコンパクトな空間支持を持ち、$f$ も同様であるとする。初期値を $u(0)=u_0$、$\partial_tu(0)=u_1$ とする。
>
> このとき定数 $C_{m,T}>0$ が存在し、すべての $|t|\le T$ に対し

$$
\begin{aligned}
&\|u(t)\|_{H^{m+1}(\mathbb R^n)}
 +\|\partial_tu(t)\|_{H^m(\mathbb R^n)}\\
&\quad\le C_{m,T}\left(
\|u_0\|_{H^{m+1}}
+\|u_1\|_{H^m}
+\int_{-T}^{T}\|f(s)\|_{H^m}\,ds\right)
\end{aligned}
$$

> が成り立つ。定数は $m,T$ と $V$ の指定した一様係数界に依存するが、$u,f$ には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[HPDE9の高階交換子法](../HPDE9/index.md#thm-hpde9-high-energy-estimate)を、局所コンパクト係数界ではなく、全空間共通の界で適用します。時間微分と空間勾配のエネルギーに $u$ 自身の二乗を加えると、$V$ の符号が負でもエネルギーが正になります。

<!-- proof-start -->
### 証明

まず $t\ge0$ を扱います。$|\alpha|\le m$ に対して $w_\alpha=\partial_x^\alpha u$ と書き、方程式を微分します。積の微分公式から

$$
\partial_t^2w_\alpha-\Delta w_\alpha+Vw_\alpha
=\partial_x^\alpha f-
\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
(\partial_x^\beta V)\,\partial_x^{\alpha-\beta}u.
$$

右辺の和を $R_\alpha$ と書きます。$|\beta|\ge1$ なので $|\alpha-\beta|\le m-1$ であり、仮定した $\partial_x^\beta V$ の一様界から

$$
\sum_{|\alpha|\le m}\|R_\alpha(t)\|_{L^2}^2
\le C_m\|u(t)\|_{H^m}^2
$$

を得ます（$m=0$ では空和です）。正のずらしたエネルギーを

$$
\mathcal E_m(t)=\frac12\sum_{|\alpha|\le m}
\int_{\mathbb R^n}
\left(|\partial_tw_\alpha|^2+|\nabla_xw_\alpha|^2+|w_\alpha|^2\right)dx
$$

と定めます。これは $\|u(t)\|_{H^{m+1}}^2+\|\partial_tu(t)\|_{H^m}^2$ と二つの正定数を用いて比較できます。例えば空間 $m+1$ 階の微分は $\nabla_x\partial_x^\alpha u$（$|\alpha|=m$）の中に現れ、低階は $|w_\alpha|^2$ が測ります。

各方程式を $\partial_tw_\alpha$ と掛けて空間積分します。コンパクトな支持によって部分積分の無限遠境界項が消えるので、

$$
\begin{aligned}
\mathcal E_m'(t)
={}&\sum_{|\alpha|\le m}\int_{\mathbb R^n}
\partial_tw_\alpha\,\bigl[
\partial_x^\alpha f+R_\alpha+(1-V)w_\alpha
\bigr]\,dx.
\end{aligned}
$$

$|1-V|$ と $\partial_x^\beta V$ は一様有界です。Cauchy–Schwarzの不等式と有限項の和の評価により

$$
\mathcal E_m'(t)
\le C_m\mathcal E_m(t)+
C_m\sqrt{\mathcal E_m(t)}\,\|f(t)\|_{H^m}.
$$

$\mathcal E_m=0$ の点でも議論できるよう $\eta_\varepsilon(t)=\sqrt{\mathcal E_m(t)+\varepsilon}$ と置きます。$2\eta_\varepsilon\eta_\varepsilon'=\mathcal E_m'$ を用い、$\sqrt{\mathcal E_m}\le\eta_\varepsilon$ を代入して

$$
\eta_\varepsilon'(t)
\le C_m'\eta_\varepsilon(t)+C_m'\|f(t)\|_{H^m}
$$

を得ます。積分因子 $e^{-C_m't}$ を掛け、$0$ から $t$ まで積分すると

$$
\eta_\varepsilon(t)\le e^{C_m't}
\left(\eta_\varepsilon(0)+C_m'\int_0^t\|f(s)\|_{H^m}\,ds\right).
$$

$\varepsilon\downarrow0$ とし、エネルギーとSobolevノルムの同値から主張の $t\ge0$ 部分を得ます。$t\le0$ は $s=-t$ に変えて同じ導出を適用します。二つを $|t|\le T$ でまとめれば定理が従います。$\square$
<!-- proof-end -->

### なぜ係数の一様界を省けないか：増幅される局所波

一様係数界がなくても、$V$ が各点で滑らかなら前節までの大域解は存在します。しかし全空間に共通する安定定数を無条件に取り出すことはできません。

滑らかな関数 $\rho\in C_c^\infty(\mathbb R)$ を $0\le\rho\le1$、$|x|\le2$ で $\rho(x)=1$、$|x|\ge3$ で $\rho(x)=0$ となるよう選び、

$$
V(x)=-\sum_{j=1}^{\infty}j^2\rho(x-10j)
$$

と置きます。各コンパクト集合には有限個しか項が寄与しないので $V$ は滑らかですが、$\sup_x|V(x)|=\infty$ です。各 $j$ に対して、$\phi\in C_c^\infty(\mathbb R)$ を $|x|\le1$ で $1$、$|x|\ge3/2$ で $0$ となるよう選び、

$$
u_{0,j}(x)=\phi(x-10j),\qquad u_{1,j}(x)=0,\qquad f_j=0
$$

を与えます。初期Sobolevノルムは平行移動で変わらず、どの $j$ にも同じ有限値です。

一方、$|x-10j|\le1/2$、$0\le t\le1/4$ の領域へ影響する初期点は $|y-10j|\le3/4$ に含まれます。その因果領域では $u_{0,j}=1$、$u_{1,j}=0$、$V=-j^2$ です。$x$ に依らない

$$
w_j(t,x)=\cosh(jt)
$$

は $w_{j,tt}-w_{j,xx}-j^2w_j=0$ を満たし、初期値は $1,0$ です。[HPDE10の依存領域一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)で元の解と比較すると、指定した小領域では $u_j=w_j$。ゆえに時刻 $t=1/4$ に

$$
\|u_j(1/4,\cdot)\|_{L^2(\mathbb R)}
\ge\left(\int_{10j-1/2}^{10j+1/2}\cosh^2(j/4)\,dx\right)^{1/2}
=\cosh(j/4)\longrightarrow\infty.
$$

初期の $H^{m+1}\times H^m$ ノルムは一定なのに、同じ正時刻での $L^2$ ノルムは発散します。従って、この $V$ に対して解をすべての $j$ で支配する**一つの全空間Sobolev安定定数**は存在しません。各 $j$ の初期値問題の解が大域的に存在することとは矛盾しません。

## 8. 演習：局所依存・貼り合わせ・安定性を確かめる

### Level A

<a id="ex-hpde17-a01"></a>
#### HPDE17-A01 観測域の初期足跡

Minkowski平面で $\Sigma=\{t=0\}$、$Q=\{(2,x):|x|\le2\}$ とする。第2節の $K_Q=J(Q)\cap\Sigma$ を求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$(0,y)$ が $Q$ の因果的過去にあるための条件は、ある $x\in[-2,2]$ に対して $|x-y|\le2$ となることです。このような $x$ が存在する条件は、$[y-2,y+2]$ と $[-2,2]$ の交わりが空でないこと、すなわち $y-2\le2$、$y+2\ge-2$ です。ゆえに $-4\le y\le4$。$Q$ は $t=2$ にあるので、$J^+(Q)$ と $t=0$ は交わりません。従って

$$
K_Q=\{(0,y):-4\le y\le4\}.
$$

コンパクト性も閉区間であることから確認できます。
<!-- solution-end -->

<a id="ex-hpde17-a02"></a>
#### HPDE17-A02 非コンパクトな初期値を直接検算する

$P=\partial_t^2-\partial_x^2$、$f=0$、$u_0(x)=x$、$u_1(x)=0$ とする。$u(t,x)=x$ が滑らかな大域解であることを確認し、なぜHPDE16のコンパクト支持仮定を満たさないか述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$u_t=0$、$u_{tt}=0$、$u_x=1$、$u_{xx}=0$ なので $Pu=0$ です。$t=0$ で $u=x$、$\partial_tu=0$ なので二つの初期値にも一致します。しかし $u_0(x)=x$ の支持は $\mathbb R$（零でない点の閉包）であり、コンパクトではありません。[HPDE16の定理](../HPDE16/index.md#thm-hpde16-global-cauchy)の仮定には入らず、[本章の大域定理](#thm-hpde17-noncompact-cauchy)がこの場合を含みます。
<!-- solution-end -->

<a id="ex-hpde17-a03"></a>
#### HPDE17-A03 局所滑らかな収束と全空間ノルム

非零 $\phi\in C_c^\infty(\mathbb R)$ と $v_j(x)=\phi(x-2j)$ を取る。$v_j\to0$ がコンパクト開 $C^\infty$ 位相で成立するが、$L^2(\mathbb R)$ では成立しないことを示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。任意のコンパクト $C\subset[-R,R]$ を固定し、$\operatorname{supp}\phi\subset[-A,A]$ とします。$2j>R+A$ なら $\operatorname{supp}v_j=2j+\operatorname{supp}\phi$ は $C$ と交わらず、任意の整数 $k$ について $\sup_C|\partial_x^kv_j|=0$ です。従って[局所滑らかな位相の定義](#def-hpde17-smooth-local-topology)を満たします。しかし $y=x-2j$ と置換すると

$$
\|v_j\|_{L^2}^2
=\int_{\mathbb R}|\phi(x-2j)|^2dx
=\int_{\mathbb R}|\phi(y)|^2dy>0
$$

で、$L^2$ ノルムは零へ近づきません。
<!-- solution-end -->

<a id="ex-hpde17-a04"></a>
#### HPDE17-A04 未来の源は過去側を変えない

$P=\partial_t^2-\partial_x^2$、初期値 $u_0=u_1=0$、源 $f(t,x)=h(t)\phi(x)$ とする。$h,\phi$ は滑らかで、$\operatorname{supp}h\subset[1,2]$、$\phi\in C_c^\infty(\mathbb R)$ とする。$t<0$ での解を求め、使った支持・一意性を述べよ。
- Level: A

<!-- solution-start -->
**詳細解答**。$t<0$ では $f(t,x)=0$ です。初期面 $t=0$ で変位も速度も零なので、時間を過去へ向けたCauchy問題は斉次・零データです。[HPDE10の依存領域一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)からすべての $t<0$ で $u(t,x)=0$。未来にしかない源の支持 $F_+\subset\{t\ge1\}$ から、過去時刻へ未来向き因果曲線が伸びないこととも一致します。
<!-- solution-end -->

### Level B

<a id="ex-hpde17-b01"></a>
#### HPDE17-B01 二種類の切断関数の一致

$Q\subset\mathbb R^{1+1}$ をコンパクトとし、二組の切断関数 $(\chi_\Sigma,\chi_M)$ と $(\eta_\Sigma,\eta_M)$ が、それぞれ $K_Q,D_Q$ の近傍で $1$ であるとする。任意の滑らかな元データ $(u_0,u_1,f)$ をそれぞれ切り出して得た大域解を $v,w$ とする。$v=w$ on $Q$ を、差の初期値と源の支持の観点から説明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。差 $z=v-w$ の初期値は

$$
z|_\Sigma=(\chi_\Sigma-\eta_\Sigma)u_0,\qquad
\nabla_N^Pz|_\Sigma=(\chi_\Sigma-\eta_\Sigma)u_1
$$

であり、源は $Pz=(\chi_M-\eta_M)f$ です。二組の関数は $K_Q$、$D_Q$ のそれぞれの近傍でともに $1$ なので、上記の差はいずれも対応する因果的足跡上で零です。$q\in Q$ が未来側なら、その過去因果領域と初期面の交わりは $K_Q$ に入り、そこまでの源も $D_Q$ に入ります。過去側も因果向きを逆にして同様です。[局所一致補題](#lem-hpde17-localized-agreement)より $z(q)=0$。全時空で $v=w$ と結論してはならず、切断域の外ではデータが違うことがあります。
<!-- solution-end -->

<a id="ex-hpde17-b02"></a>
#### HPDE17-B02 ポテンシャルを一回微分した交換子

$\mathbb R^{1+1}$ 上で $u_{tt}-u_{xx}+V(t,x)u=f$ とし、$V$ は実数値の滑らかな関数とする。$w=u_x$ が満たす方程式を導き、$V,V_x$ が全時空の有限時間帯で有界なら、$w$ のずらしたエネルギーの微分に現れる源項を何で支配できるか示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。元の方程式を $x$ で微分すると

$$
u_{xtt}-u_{xxx}+\partial_x(Vu)=f_x.
$$

積の微分公式から $\partial_x(Vu)=V_xu+Vu_x$ なので、

$$
w_{tt}-w_{xx}+Vw=f_x-V_xu.
$$

右辺を $g$ とします。$V_x$ の一様界を $L$ とすれば

$$
\|g(t)\|_{L^2}\le\|f_x(t)\|_{L^2}+L\|u(t)\|_{L^2}.
$$

$w$ のずらしたエネルギー $E_w=\tfrac12\int(w_t^2+w_x^2+w^2)dx$ の微分では、部分積分の後、

$$
E_w'=\int_{\mathbb R}w_t\bigl[(1-V)w+g\bigr]\,dx
$$

です。$V$ も有界ならCauchy–Schwarzにより $|E_w'|\le C E_w+C\sqrt{E_w}(\|f_x\|_{L^2}+\|u\|_{L^2})$。$u$ 自身のエネルギーと加えて閉じるのが[高階安定性定理](#thm-hpde17-uniform-flat-energy)の $m=1$ の核です。
<!-- solution-end -->

<a id="ex-hpde17-b03"></a>
#### HPDE17-B03 一様な全空間評価が壊れる模型

第7節の $V(x)=-\sum_{j\ge1}j^2\rho(x-10j)$ と初期値 $u_{0,j}=\phi(x-10j)$、$u_{1,j}=0$ を考える。$t=1/4$ に $\|u_j(t)\|_{L^2}\ge\cosh(j/4)$ を再導出し、どの一様な仮定が欠けたか説明せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$|x-10j|\le1/2$、$0\le s\le1/4$ の点から初期面へ下りる因果曲線の到達範囲は $|y-10j|\le1/2+1/4=3/4$。この範囲で $\phi(y-10j)=1$、源は零であり、$|x-10j|\le2$ ではポテンシャルは $-j^2$ です。関数 $w(s,x)=\cosh(js)$ は

$$
w_{ss}-w_{xx}-j^2w=j^2\cosh(js)-0-j^2\cosh(js)=0
$$

を満たし、初期値は $w(0)=1$、$w_s(0)=0$ です。[因果依存一意性](../HPDE10/index.md#thm-hpde10-causal-dependence)からこの小領域では $u_j=w$ です。従って

$$
\|u_j(1/4)\|_{L^2}^2
\ge\int_{10j-1/2}^{10j+1/2}\cosh^2(j/4)\,dx
=\cosh^2(j/4).
$$

一方、初期値の $H^{m+1}$ ノルムは $\|\phi\|_{H^{m+1}}$ に等しく $j$ に依存しません。欠けているのは $V$ の全空間一様界であり、各コンパクト集合での滑らかさでは代用できません。
<!-- solution-end -->

<a id="ex-hpde17-b04"></a>
#### HPDE17-B04 空間コンパクト性は自動的に残るか

Minkowski平面の $P=\partial_t^2-\partial_x^2$ で、初期値 $u_0(x)=1$、$u_1(x)=0$、源 $f=0$ とする。(i) 解を与えよ。(ii) 各時刻の解の支持がコンパクトか判定せよ。(iii) 因果的支持の命題と矛盾しない理由を述べよ。
- Level: B

<!-- solution-start -->
**詳細解答**。(i) $u(t,x)=1$ とすると両二階微分は零で $Pu=0$、初期値も一致します。[滑らかな大域解の一意性](#thm-hpde17-noncompact-cauchy)によりこれが唯一の解です。(ii) 任意の時刻 $t$ に $\{x:u(t,x)\ne0\}=\mathbb R$ なのでその支持は $\mathbb R$、非コンパクトです。(iii) $K_\Sigma=\Sigma$ で、[片側因果支持命題](#prop-hpde17-one-sided-support)の右辺は $J^+(\Sigma)$ または $J^-(\Sigma)$ 全体です。この集合はコンパクトではないので、支持が全空間に広がることを排除しません。
<!-- solution-end -->

### Level C

<a id="ex-hpde17-c01"></a>
#### HPDE17-C01 非コンパクトなデータと安定性を一つにつなぐ

$(M,g)$ は境界なし滑らかな大域双曲時空、$\Sigma=\Sigma_0$ は滑らかな空間的Cauchy面、$P$ は滑らかなnormally hyperbolic作用素とする。$f,u_0,u_1$ は滑らかだが支持に制限はない。

(i) $M$ のコンパクトな尽くし方 $Q_j$ と有限時間帯 $[-T_j,T_j]$ を取り、観測域の初期足跡と源候補がコンパクトであることを示せ。

(ii) 切断関数で元のデータを切り出し、HPDE16による解 $v_j$ が $i\ge j$ で $Q_j$ 上一致することを証明せよ。

(iii) $u|_{\operatorname{int}Q_j}=v_j|_{\operatorname{int}Q_j}$ により定義される解が、滑らかな大域解であることと一意性を示せ。

(iv) コンパクト観測域 $Q$ における解の変動が、初期・源の**固定コンパクト集合上の有限階ノルム**だけで制御できる理由を、高階評価と局所Sobolev埋込みまで含めて述べよ。

(v) 上記から非コンパクトな初期面全体についての一様Sobolev評価は従わない理由を、具体例を用いて説明せよ。
- Level: C

<!-- solution-start -->
**詳細解答**。

(i) 第二可算・局所コンパクト性から $Q_j\subset\operatorname{int}Q_{j+1}$、$\bigcup_j\operatorname{int}Q_j=M$ となるコンパクト尽くし方を取れます。$Q_j\subset t^{-1}([-T_j,T_j])$ となる増大列 $T_j$ を取ります。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)に $K=Q_j$、区間 $[-T_j,T_j]$ を代入すると $D_j=J(Q_j)\cap t^{-1}([-T_j,T_j])$ はコンパクトです。$K_j=D_j\cap\Sigma$ も閉部分集合なのでコンパクトです。

(ii) $K_j$ 近傍で $1$ のコンパクト支持関数 $\chi_{\Sigma,j}$、$D_j$ 近傍で $1$ の $\chi_{M,j}$ を選びます。これを元データに掛けたデータはコンパクト支持で、[HPDE16の大域定理](../HPDE16/index.md#thm-hpde16-global-cauchy)から $v_j$ を得ます。$i\ge j$ なら $Q_j\subset Q_i$ で $T_j\le T_i$ なので $K_j\subset K_i$、$D_j\subset D_i$。従って $v_i,v_j$ の源は $D_j$ 近傍で、初期値は $K_j$ 近傍でともに元データへ一致します。[局所一致補題](#lem-hpde17-localized-agreement)から $v_i=v_j$ on $Q_j$ です。

(iii) 任意の $q\in M$ は $\operatorname{int}Q_j$ に入り、$i\ge j$ なら $v_i(q)=v_j(q)$ なので値の定義は一意です。近傍 $\operatorname{int}Q_j$ では滑らかな $v_j$ と一致するため $u$ は滑らかです。$q\in Q_j\subset D_j$ なので $Pu(q)=Pv_j(q)=\chi_{M,j}(q)f(q)=f(q)$。$p\in\Sigma$ では $p\in Q_j\cap\Sigma\subset K_j$ により $u(p)=u_0(p)$、$\nabla_N^Pu(p)=u_1(p)$ です。別解との差には[HPDE10の一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)を適用すると任意の点で零です。

(iv) 差の元データを観測集合 $Q$ の $K_Q,D_Q$ の近傍で切り出すと、差の解は $Q$ 上でコンパクト支持データの大域解 $w$ に等しくなります。[HPDE16の有限時間高階評価](../HPDE16/index.md#lem-hpde16-bundle-energy)を、この切り出しデータのコンパクトな因果影で適用し、任意に大きい $H^m$ を制御します。一次還元方程式で時間高階微分を空間微分と源へ置き換え、$m$ を $k$ と次元より十分大きく取れば、局所Sobolev埋込みから $\|w\|_{C^k(Q)}$ を得ます。切断関数の積の微分公式により、右辺のSobolevノルムは元の差データの固定コンパクト集合上の有限階 $C^r$ ノルムで支配できます。従って[局所連続依存定理](#thm-hpde17-local-stability)の形になります。

(v) 固定した $Q$ には定数 $A_{Q,k}$ を使えますが、$Q$ を空間無限遠へ動かした際の定数上界は証明していません。例えば第7節の滑らかな $V(x)=-\sum j^2\rho(x-10j)$ では、同じ大きさの初期データを各 $x=10j$ の近くへ移すと、$t=1/4$ の解の $L^2$ ノルムが少なくとも $\cosh(j/4)$ になります。初期Sobolevノルムは平行移動で一定です。ゆえに全空間共通の定数を持つ評価は成り立ちません。必要になるのは、例えば[第7節の一様係数仮定](#thm-hpde17-uniform-flat-energy)です。
<!-- solution-end -->

## 9. 大域解の構成からGreen作用素へ

コンパクト支持データの定理を、因果的足跡ごとに使い直すことで、任意の滑らかなデータ・源へ大域解を拡張しました。ただし、非コンパクトな源まで許しただけでは、源から解を作る作用素の支持条件はまだ定まりません。

次のHPDE18では、コンパクトな源に対し、十分過去のCauchy面でデータを零とした解を作ります。そして源の**未来**へしか広がらない遅延解と、**過去**へしか広がらない先進解を構成し、その作用域と支持を区別します。
