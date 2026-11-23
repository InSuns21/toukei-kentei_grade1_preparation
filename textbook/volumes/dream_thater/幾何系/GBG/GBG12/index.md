# GBG12 接続は存在するか、二つの接続の差は何か

[GBG8の局所接続の再構成定理](../GBG8/index.md#thm-gbg8-local-reconstruction)は、貼り合わせの変換則を満たす局所ポテンシャルがあれば大域接続を一意に作れると教えた。しかし、そもそも**そのような局所ポテンシャルを選べるのか**、そして選び方を変えると接続はどう変わるのか、という問いは残っている。

この講義では、局所的にはどの主束も積主束になることを利用し、局所接続を重み付きで貼り合わせて接続の存在を証明する。さらに、二つの接続の差は接続そのものと違って**通常のベクトル束値1形式**になることを示す。これによって、基準となる接続を一つ選び、他の接続をそこからの差によって記述できる。

**全節の設定**：$M$ は Hausdorff・第二可算・境界のない有限次元滑らかな多様体、$G$ は有限次元 Lie 群、$\mathfrak g=T_eG$ はその Lie 環、$\pi:P\to M$ は滑らかな右主 $G$ 束とする。基底のパラコンパクト性は[滑らかな多様体のパラコンパクト性](../../GEO/GEO4/index.md#thm-geo4-manifold-paracompact)から従う。各局所接続を貼るための重みは[開被覆に従属する滑らかな1の分割の存在](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)を利用して選ぶ。一般のパラコンパクト滑らかな基底で同じ議論が成り立つ。右作用を $R_g(p)=pg$ とし、局所 section は $s_j=s_i g_{ij}$ とする。

接続形式は[GBG7の二条件](../GBG7/index.md#def-gbg7-connection-form)を満たす $\mathfrak g$ 値1形式、すなわち $\omega(\xi_P)=\xi$ と $R_g^*\omega=\operatorname{Ad}_{g^{-1}}\omega$ を満たすものとする。局所形式 $A_i=s_i^*\omega$ は[GBG8の変換則](../GBG8/index.md#thm-gbg8-local-transform)に従う。

<!-- definition-example-audit: strict -->

---

## 1. 局所接続を貼るための重み

接続形式を任意に足すと再生条件の右辺も足され、接続にならない。そこで基底 $M$ 上の非負の重みを使い、**重みの和を1にしてから**局所接続を足したい。各点の近くで有限個の項しか現れなければ滑らかさも保てる。

[開被覆に従属する滑らかな1の分割](../../GEO/GEO4/index.md#def-geo4-subordinate-partition)は、このための道具である。開被覆 $(U_i)$ に対し、滑らかな関数 $\varphi_i:M\to[0,1]$ が

$$
\operatorname{supp}\varphi_i\subset U_i,\qquad
\sum_i\varphi_i(x)=1
$$

を満たし、各点の近傍で台と交わる添字が有限個であるようにする。[GEO4の存在定理](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)は、Hausdorff・第二可算な有限次元滑らかな多様体上で、このような族を任意の開被覆に対して構成できることを保証する。同章では[パラコンパクト性](../../GEO/GEO4/index.md#thm-geo4-manifold-paracompact)と[滑らかな局所化関数](../../GEO/GEO4/index.md#thm-geo4-smooth-localization)からその証明まで扱っている。

### 二つの開集合で実際に確かめる

$M=\mathbb R$、$U_1=(-\infty,2)$、$U_2=(-2,\infty)$ とする。関数

$$
h(t)=
\begin{cases}
0&(t\le0),\\
e^{-1/t}&(t>0)
\end{cases},
\qquad
q(t)=\frac{h(t)}{h(t)+h(1-t)}
$$

を用いる。分母は全実数で正、$q$ は滑らかで $q=0$（$t\le0$）、$q=1$（$t\ge1$）となる。そこで

$$
\varphi_1(x)=1-q((x+1)/2),\qquad
\varphi_2(x)=q((x+1)/2)
$$

と置く。$\varphi_1$ の台は $(-\infty,1]$、$\varphi_2$ の台は $[-1,\infty)$ であり、それぞれ $U_1,U_2$ に含まれる。台は二つしかないので局所有限で、$\varphi_1+\varphi_2=1$。これで既習の定義にある三条件を個別に満たした。

この章の存在証明で必要なのは、滑らかな分割の1が存在するという結果と、**局所有限性が各点の周りで和を有限和にする**という性質である。

## 2. 任意の主束に接続を作る

各 $U_i$ 上の局所 section $s_i$ により $P|_{U_i}\simeq U_i\times G$ となる。[GBG7の積主束の接続公式](../GBG7/index.md#prop-gbg7-product-form)で局所ポテンシャルを $A_i^{(i)}=0$ と選べば、群座標 $k$ に対して

$$
\omega^{(i)}_{(x,k)}(v,W)=\theta_k(W)
$$

という局所接続がある。$\theta$ は[左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)で、群方向の接ベクトルを Lie 環へ写す。

局所形式 $\omega^{(i)}$ は一般に重なりで一致しない。それでも分割の1を掛けてから足すと大域接続になる。

<a id="thm-gbg12-connection-exists"></a>

<!-- formal-statement-start -->
> **定理（主束接続の存在）**  
> $M$ を Hausdorff・第二可算・境界のない有限次元滑らかな多様体、$G$ を有限次元 Lie 群とする。任意の滑らかな右主 $G$ 束 $P\to M$ には、再生条件と右同変条件を満たす滑らかな主束接続1形式 $\omega\in\Omega^1(P;\mathfrak g)$ が存在する。
<!-- formal-statement-end -->

**証明の見取り図**。局所自明化上で接続を作る。局所接続を、基底から引き戻した重み $\varphi_i\circ\pi$ で掛け、台の外へ零として延長する。重みの和が1なので基本ベクトル場の再生条件が維持される。重みが基底の関数なので右作用で変化せず、同変条件も維持される。

<!-- proof-start -->
### 証明

局所自明化を持つ被覆 $(U_i)$ を取り、[GEO4の分割の1の存在定理](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)で $\operatorname{supp}\varphi_i\subset U_i$、$\sum_i\varphi_i=1$ なる滑らかな局所有限の族を選ぶ。

各 $P|_{U_i}$ に、上の積主束の式から局所接続 $\omega^{(i)}$ を作る。$\psi_i=\varphi_i\circ\pi$ とおく。$\operatorname{supp}\psi_i=\pi^{-1}(\operatorname{supp}\varphi_i)$ は $\pi^{-1}(U_i)$ に含まれるので

$$
\widetilde\omega^{(i)}_p=
\begin{cases}
\psi_i(p)\,\omega^{(i)}_p &(p\in\pi^{-1}(U_i)),\\
0 &(p\notin\pi^{-1}(U_i))
\end{cases}
$$

は滑らかな $P$ 上の $\mathfrak g$ 値1形式である。実際、$\pi^{-1}(U_i)$ の境界近傍では $\psi_i=0$ であり、零延長が滑らかに一致する。

$$
\omega=\sum_i\widetilde\omega^{(i)}
$$

と定める。$(\operatorname{supp}\varphi_i)$ が $M$ 上で局所有限なので、その逆像の族も $P$ 上で局所有限である。従って $\omega$ は滑らかな1形式となる。

任意の $p\in P$ と $\xi\in\mathfrak g$ について、各局所接続の[再生条件](../GBG7/index.md#def-gbg7-connection-form)を用いると

$$
\omega_p(\xi_P(p))
=\sum_i\varphi_i(\pi(p))\,\xi
=\left(\sum_i\varphi_i(\pi(p))\right)\xi
=\xi.
$$

さらに $R_g$ は基底点を固定するため $\psi_i(pg)=\psi_i(p)$。各 $\omega^{(i)}$ の右同変性を使えば、$X\in T_pP$ について

$$
\begin{aligned}
\omega_{pg}((dR_g)_pX)
&=\sum_i\psi_i(pg)\,\omega^{(i)}_{pg}((dR_g)_pX)\\
&=\sum_i\psi_i(p)\,\operatorname{Ad}_{g^{-1}}(\omega^{(i)}_p(X))\\
&=\operatorname{Ad}_{g^{-1}}\omega_p(X).
\end{aligned}
$$

二条件が成立したので $\omega$ は大域接続である。
<!-- proof-end -->

### 二つのパッチで何が起こるか

二つの局所 section $s_1,s_2$ があり、重なりで $s_2=s_1g$ とする。各パッチの基準 section では局所接続を零に選んだとし、重みを $\varphi_1,\varphi_2$ とする。局所接続 $\omega^{(1)}$ の $s_2$ 表示は[GBG8の変換則](../GBG8/index.md#thm-gbg8-local-transform)により $g^{-1}dg$、$\omega^{(2)}$ の $s_1$ 表示は $g\,d(g^{-1})$ である。従って重なりで新しい接続の局所表示は

$$
A_1=\varphi_2\,g\,d(g^{-1}),\qquad
A_2=\varphi_1\,g^{-1}dg.
$$

この二式は

$$
\begin{aligned}
\operatorname{Ad}_{g^{-1}}A_1+g^{-1}dg
&=\varphi_2\,d(g^{-1})g+g^{-1}dg\\
&=-\varphi_2\,g^{-1}dg+g^{-1}dg\\
&=\varphi_1\,g^{-1}dg=A_2
\end{aligned}
$$

を満たす。第1等号で $g^{-1}(g\,d(g^{-1}))g=d(g^{-1})g$、第2等号で $d(g^{-1})g=-g^{-1}dg$ を使った。ここで局所ポテンシャルがどちらも零になるとは限らないが、**重なりの非斉次項が正しく残る**。

ここで得た重なり条件は、[局所ポテンシャルからの大域接続の再構成](../GBG8/index.md#thm-gbg8-local-reconstruction)に必要な条件と一致する。非自明な主束でも接続が作れる理由は、大域 section を要求していないからである。

## 3. 二つの接続を引き算すると何が残るか

再生条件は $\omega(\xi_P)=\xi$ という非斉次条件だった。二つの接続を引けば右辺が相殺し、垂直方向で零になる。一方、同変性は線形な条件なので差にも残る。

この二条件を満たす1形式を区別しておく。

<a id="def-gbg12-tensorial-one-form"></a>

<!-- formal-statement-start -->
> **定義（水平・随伴同変なテンソル的1形式）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ 上の $\mathfrak g$ 値1形式 $\alpha$ が**テンソル的1形式**であるとは、任意の $p\in P$、$X\in T_pP$、$g\in G$、$\xi\in\mathfrak g$ に対し

$$
\alpha_p(\xi_P(p))=0,\qquad
\alpha_{pg}((dR_g)_pX)=\operatorname{Ad}_{g^{-1}}\alpha_p(X)
$$

> を満たすことをいう。第1条件は垂直方向で零になる水平性、第2条件は右作用についての随伴同変性である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg12-tensorial-one-form -->
**定義の確認**。積主束 $P=\mathbb R^2\times U(1)$ で、基底座標を $(x,y)$、群座標を $u$、射影を $\pi$ とし、$\alpha=\pi^*(i y\,dx)$ とする。引き戻しの定義から、任意の接ベクトル $((v_x,v_y),W)$ に対して

$$
\alpha_{(x,y,u)}((v_x,v_y),W)
=(i y\,dx)_{(x,y)}(v_x,v_y)=i yv_x
$$

である。垂直ベクトルは $((0,0),W)$ なので $d\pi((0,0),W)=0$、従って $\alpha((0,0),W)=0$。右作用は基底座標 $(x,y)$ とその速度 $(v_x,v_y)$ を変えず、$U(1)$ は可換で $\operatorname{Ad}_{g^{-1}}$ は恒等写像だから $R_g^*\alpha=\alpha$。二条件を直接満たす。この形式は基底上の $i\mathbb R$ 値1形式を引き戻したものだ。
<!-- definition-example-end -->

<a id="thm-gbg12-connection-difference"></a>

<!-- formal-statement-start -->
> **定理（接続の差とテンソル的1形式）**  
> 滑らかな右主 $G$ 束 $P\to M$ の二つの接続形式 $\omega_0,\omega_1$ に対し、$\alpha=\omega_1-\omega_0$ はテンソル的1形式である。逆に $\omega_0$ が接続、$\alpha$ がテンソル的1形式なら、$\omega_0+\alpha$ は接続である。
<!-- formal-statement-end -->

**証明の見取り図**。基本ベクトル場で接続を引けば $\xi-\xi=0$。右同変性は差と和を通過する。逆向きには再生条件の $\xi+0$ を確認する。

<!-- proof-start -->
### 証明

[接続形式の定義](../GBG7/index.md#def-gbg7-connection-form)から、任意の $\xi\in\mathfrak g$ について

$$
(\omega_1-\omega_0)(\xi_P)=\xi-\xi=0.
$$

また

$$
R_g^*(\omega_1-\omega_0)
=\operatorname{Ad}_{g^{-1}}\omega_1-\operatorname{Ad}_{g^{-1}}\omega_0
=\operatorname{Ad}_{g^{-1}}(\omega_1-\omega_0).
$$

従って $\alpha$ は[テンソル的1形式の定義](#def-gbg12-tensorial-one-form)を満たす。逆に $\omega=\omega_0+\alpha$ と置くと

$$
\omega(\xi_P)=\omega_0(\xi_P)+\alpha(\xi_P)=\xi+0=\xi
$$

かつ

$$
R_g^*\omega=\operatorname{Ad}_{g^{-1}}\omega_0+
\operatorname{Ad}_{g^{-1}}\alpha
=\operatorname{Ad}_{g^{-1}}\omega.
$$

$\omega$ は接続の二条件を満たす。
<!-- proof-end -->

### 基底上の随伴束値1形式として読む

テンソル的1形式は $P$ 上で定義されたが、垂直方向を消すので基底 $M$ の接ベクトルだけに依存する。ただし値の $\mathfrak g$ 座標は $p$ の選択によって随伴作用で変わる。これは[GBG5の随伴Lie環束](../GBG5/index.md#def-gbg5-adjoint-lie-bundle)にちょうど合う。

ここで $\Omega^1(M;\operatorname{ad}(P))$ は、各 $x\in M$ で接ベクトルをその点の随伴束のファイバーへ送る線形写像

$$
a_x:T_xM\longrightarrow \operatorname{ad}(P)_x
$$

が滑らかに変わる族の全体である。[随伴Lie環束の定義](../GBG5/index.md#def-gbg5-adjoint-lie-bundle)により、$a_x(v)$ は $p\in P_x$ を選んで $[p,\xi]$ と表せる。$p$ を $pg$ に替えたとき同じ値を表すには、Lie 環成分を $\operatorname{Ad}_{g^{-1}}\xi$ に替えればよい。そこで $\alpha_p(X)$ を $a_x(d\pi_pX)$ の Lie 環成分として使う。水平性は $d\pi_pX$ が同じ持ち上げを区別しないこと、随伴同変性は $p$ の選択を変えても $[p,\alpha_p(X)]$ が同じ値になることを保証する。

<a id="thm-gbg12-tensorial-adjoint"></a>

<!-- formal-statement-start -->
> **定理（テンソル的1形式と随伴束値1形式の対応）**  
> 滑らかな右主 $G$ 束 $P\to M$ に対し、水平・随伴同変な $\mathfrak g$ 値1形式のベクトル空間と、$\operatorname{ad}(P)=P\times_{\operatorname{Ad}}\mathfrak g$ に値を取る滑らかな1形式のベクトル空間 $\Omega^1(M;\operatorname{ad}(P))$ の間には自然な線形同型がある。対応は、$x=\pi(p)$、$v=d\pi_pX$ に対し

$$
a_x(v)=[p,\alpha_p(X)]
$$

> で定まる。
<!-- formal-statement-end -->

**証明の見取り図**。同じ $v$ の別の持ち上げ $X$ は垂直ベクトルだけ異なるので水平性が効く。$p$ を $pg$ に替えると随伴同変性と $\operatorname{ad}(P)$ の同値関係で値が一致する。逆向きは、$[p,\cdot]:\mathfrak g\to\operatorname{ad}(P)_x$ の逆写像で値を取り出す。

<!-- proof-start -->
### 証明

$x=\pi(p)$ と $v\in T_xM$ を取る。$d\pi_p$ は全射なので $d\pi_pX=v$ を満たす $X\in T_pP$ がある。別の $X'$ も同じ $v$ に写れば $X'-X$ は垂直であり、[GBG6の垂直方向の同型](../GBG6/index.md#thm-gbg6-vertical-fundamental)により基本ベクトル場の値である。水平性から $\alpha_p(X')=\alpha_p(X)$、よって持ち上げに依存しない。

同じファイバーの別の点は $pg$ と書ける。$d\pi_{pg}(dR_gX)=v$、かつ同変性から

$$
[pg,\alpha_{pg}(dR_gX)]
=[pg,\operatorname{Ad}_{g^{-1}}\alpha_p(X)]
=[p,\alpha_p(X)].
$$

最後の等号は[随伴Lie環束の同値関係](../GBG5/index.md#def-gbg5-adjoint-lie-bundle)そのものだ。従って $a$ は代表元 $p$ に依存せず、$v$ に線形である。

滑らかさは局所 section $s_i$ を取って $a|_{U_i}=[s_i,s_i^*\alpha]$ と書けば分かる。局所成分 $B_i=s_i^*\alpha$ は

$$
B_j=\operatorname{Ad}_{g_{ij}^{-1}}B_i
$$

を満たし、[随伴束の局所成分公式](../GBG5/index.md#prop-gbg5-adjoint-bundle-operations)と一致する。

逆に、$a\in\Omega^1(M;\operatorname{ad}(P))$ を与える。各 $p\in P_x$ で $\xi\mapsto[p,\xi]$ は線形同型なので、各 $X\in T_pP$ に対し一意な $\alpha_p(X)\in\mathfrak g$ を

$$
[p,\alpha_p(X)]=a_x(d\pi_pX)
$$

によって定める。右辺は $d\pi_pX=0$ なら零なので $\alpha$ は水平。$p$ を $pg$ に替えれば同値関係から $\alpha_{pg}(dR_gX)=\operatorname{Ad}_{g^{-1}}\alpha_p(X)$。局所 section では $a$ の滑らかな成分 $B_i$ から $\alpha_{s_i(x)k}(X)=\operatorname{Ad}_{k^{-1}} B_i(d\pi X)$ と書けるので滑らかである。二構成は互いに逆で、いずれも和とスカラー倍を保つ。
<!-- proof-end -->

上の変換則と[局所ポテンシャルの非斉次変換則](../GBG8/index.md#thm-gbg8-local-transform)の違いが核心である。二接続の局所成分の差 $B_i=A_{1,i}-A_{0,i}$ なら

$$
\begin{aligned}
B_j&=A_{1,j}-A_{0,j}\\
&=\left(\operatorname{Ad}_{g_{ij}^{-1}}A_{1,i}+g_{ij}^{-1}dg_{ij}\right)
-\left(\operatorname{Ad}_{g_{ij}^{-1}}A_{0,i}+g_{ij}^{-1}dg_{ij}\right)\\
&=\operatorname{Ad}_{g_{ij}^{-1}}B_i.
\end{aligned}
$$

**差にだけ非斉次項がない**ため、$B_i$ が随伴束値1形式として貼り合わさる。

## 4. 接続全体の差を整理する

接続の和は一般には接続ではないが、一つの接続にテンソル的1形式を加える操作はいつでもできる。ここでいう「アフィン」は、差はベクトルだが、特別な原点は選ばれていない、という性質を表す。

<a id="def-gbg12-affine-space"></a>

<!-- formal-statement-start -->
> **定義（ベクトル空間をモデルとするアフィン空間）**  
> 実ベクトル空間 $V$ と非空集合 $\mathcal A$ に対し、作用 $(a,v)\mapsto a+v$ が、任意の $a,b\in\mathcal A$ にただ一つの $v\in V$ が存在して $b=a+v$ となる性質を満たすとき、$\mathcal A$ を $V$ をモデルとする**アフィン空間**という。これは作用が自由かつ推移的であることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg12-affine-space -->
**定義の確認**。$\mathcal A=\{(1,x):x\in\mathbb R\}\subset\mathbb R^2$ とし、$V=\mathbb R$ が $(1,x)+t=(1,x+t)$ により作用するとする。二点 $(1,x),(1,y)$ の差に相当する数はただ一つ $t=y-x$ で、$(1,x)+t=(1,y)$。従って自由・推移的である。一方、$\mathcal A$ は通常のベクトル和について閉じず、$(1,0)+(1,0)=(2,0)\notin\mathcal A$。これが接続全体の振る舞いに対応する。
<!-- definition-example-end -->

<a id="thm-gbg12-connections-affine"></a>

<!-- formal-statement-start -->
> **定理（主束接続全体のアフィン空間構造）**  
> $M$ を上記のパラコンパクトな滑らかな多様体、$P\to M$ を滑らかな右主 $G$ 束とし、$\mathcal A(P)$ を $P$ 上の滑らかな主束接続全体の集合とする。$\mathcal A(P)$ は非空であり、$\Omega^1(M;\operatorname{ad}(P))$ の加法作用により、このベクトル空間をモデルとするアフィン空間になる。二接続の差はこのベクトル空間の一意な元である。
<!-- formal-statement-end -->

**証明の見取り図**。存在定理で基準接続を一つ確保する。任意の二接続を引けば随伴束値1形式になり、基準接続に任意の随伴束値1形式を足せば接続に戻る。

<!-- proof-start -->
### 証明

[主束接続の存在](#thm-gbg12-connection-exists)から $\mathcal A(P)\ne\varnothing$。[テンソル的形式と随伴束値形式の対応](#thm-gbg12-tensorial-adjoint)を用いて $a\in\Omega^1(M;\operatorname{ad}(P))$ を対応する $\alpha$ とみなし、接続 $\omega$ に $\omega+a=\omega+\alpha$ と作用させる。[接続の差の定理](#thm-gbg12-connection-difference)からこれは再び接続になる。

零形式は接続を変えず、$(\omega+a)+b=\omega+(a+b)$ だから加法作用である。二接続 $\omega_0,\omega_1$ に対し $a=\omega_1-\omega_0$ は唯一の差であり $\omega_0+a=\omega_1$。一意性は $\omega_0+a=\omega_0+b$ なら $a=b$ となることから従う。よって作用は自由かつ推移的である。
<!-- proof-end -->

**補間の例**。二接続 $\omega_0,\omega_1$ について、任意の実数 $t$ で

$$
\omega_t=(1-t)\omega_0+t\omega_1
=\omega_0+t(\omega_1-\omega_0)
$$

は接続である。係数が足して1になるので再生条件が保持される。$0\le t\le1$ に限る理由も、接続の定義にはない。

**注意**：この「差」は束上の1形式の差であり、ゲージ群による同値関係で割る操作とは異なる。ゲージ軌道の問題は次の GBG13 で扱う。

## 5. 接続を変えると曲率はどう変わるか

接続の差が通常の随伴束値1形式になったので、曲率の変化も計算できる。これは後で接続を補間する際に役立つ。

<a id="prop-gbg12-curvature-variation"></a>

<!-- formal-statement-start -->
> **命題（接続を変えたときの曲率の差）**  
> 同じ滑らかな右主 $G$ 束上の二接続を $\omega_1=\omega_0+\alpha$ とし、$\alpha$ をその水平・随伴同変な差とする。各曲率を $\Omega_j=d\omega_j+\frac12[\omega_j\wedge\omega_j]$ とすれば

$$
\Omega_1=\Omega_0+d_{\omega_0}\alpha+
\frac12[\alpha\wedge\alpha].
$$

> ここで $d_{\omega_0}\alpha=d\alpha+[\omega_0\wedge\alpha]$ は[GBG11の共変外微分](../GBG11/index.md#def-gbg11-covariant-exterior-derivative)である。局所 section $s:U\to P$ について $A_j=s^*\omega_j$、$B=s^*\alpha=A_1-A_0$、$F_j=s^*\Omega_j$ と置く。また $d_{A_0}B:=dB+[A_0\wedge B]$ と定める。このとき

$$
F_1=F_0+d_{A_0}B+\frac12[B\wedge B]
$$

> となる。
<!-- formal-statement-end -->

**証明の見取り図**。[曲率の構造方程式](../GBG10/index.md#def-gbg10-curvature)へ $\omega_0+\alpha$ を代入して二次式を展開する。1形式同士の括弧付き外積は対称なので混合項が二つ現れ、係数 $1/2$ と打ち消し合う。

<!-- proof-start -->
### 証明

$\omega_1=\omega_0+\alpha$ を代入すると

$$
\begin{aligned}
\Omega_1
&=d(\omega_0+\alpha)+\frac12[
  (\omega_0+\alpha)\wedge(\omega_0+\alpha)]\\
&=d\omega_0+d\alpha+\frac12[\omega_0\wedge\omega_0]
 +\frac12[\omega_0\wedge\alpha]
 +\frac12[\alpha\wedge\omega_0]
 +\frac12[\alpha\wedge\alpha].
\end{aligned}
$$

Lie 環値形式の[次数付き括弧の規約](../GBG11/index.md#gbg11-bracket-three-inputs)より、次数がともに1のとき

$$
[\alpha\wedge\omega_0]
=-(-1)^{1\cdot1}[\omega_0\wedge\alpha]
=[\omega_0\wedge\alpha].
$$

よって

$$
\Omega_1=\underbrace{d\omega_0+\tfrac12[\omega_0\wedge\omega_0]}_{\Omega_0}
+\underbrace{d\alpha+[\omega_0\wedge\alpha]}_{d_{\omega_0}\alpha}
+\tfrac12[\alpha\wedge\alpha].
$$

局所 section $s$ で引き戻すと $s^*\omega_0=A_0$、$s^*\alpha=B$ であり、引き戻しは $d$ と括弧付き外積に可換だから局所式を得る。
<!-- proof-end -->

### 可換例と非可換例

$P=\mathbb R^2\times U(1)$、$A_0=i x\,dy$、$B=i y\,dx$ とする。$U(1)$ では Lie 括弧が零なので

$$
F_0=i\,dx\wedge dy,\qquad
dB=i\,dy\wedge dx=-i\,dx\wedge dy,
\qquad F_1=F_0+dB=0.
$$

実際、$A_1=i(x\,dy+y\,dx)=i\,d(xy)$ である。接続を変えると曲率も変わることが分かる。

非可換な $G=GL(2,\mathbb R)$ では、[行列 Lie 群の曲率の局所公式](../GBG10/index.md#thm-gbg10-local-formula)を使える。$E_{ij}$ を $(i,j)$ 成分だけが $1$ で他が $0$ の $2\times2$ 行列とし、Lie 環 $M_2(\mathbb R)$ の元として

$$
H=E_{11}=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
X=E_{12}=\begin{pmatrix}0&1\\0&0\end{pmatrix}
$$

を取る。行列 Lie 環の括弧は交換子 $[H,X]=HX-XH$ なので、$HX=X$、$XH=0$ から $[H,X]=X$ を得る。局所形式を $A_0=H\,dx$、$B=X\,dy$ とすれば

$$
F_0=0,\qquad dB=0,\qquad
[A_0\wedge B]=X\,dx\wedge dy,\qquad
[B\wedge B]=0.
$$

したがって $F_1=X\,dx\wedge dy$。$B$ 自身が閉形式でも、非可換な $A_0$ があると曲率の変化は $dB$ だけでは決まらない。

---

## 6. 演習と詳細解答

### Level A：定義と局所計算

<a id="ex-gbg12-a01"></a>
#### GBG12-A01 二つのパッチの重み
- Level: A

$U_1=(-\infty,2)$、$U_2=(-2,\infty)$ 上で、第1節の $q$ を使い $\varphi_1=1-q((x+1)/2)$、$\varphi_2=q((x+1)/2)$ とする。台、局所有限性、総和をそれぞれ確認せよ。

<!-- solution-start -->
**詳細解答**。$q(t)=0$ は $t\le0$、$q(t)=1$ は $t\ge1$ である。従って $x\le-1$ で $(\varphi_1,\varphi_2)=(1,0)$、$x\ge1$ で $(0,1)$。間では両者が正なので

$$
\operatorname{supp}\varphi_1=(-\infty,1]\subset U_1,\quad
\operatorname{supp}\varphi_2=[-1,\infty)\subset U_2.
$$

二つの台しかなく局所有限である。さらに $\varphi_1+\varphi_2=1-q+q=1$。よって[開被覆に従属する1の分割の定義](../../GEO/GEO4/index.md#def-geo4-subordinate-partition)が全て成立する。
<!-- solution-end -->

<a id="ex-gbg12-a02"></a>
#### GBG12-A02 再生条件を検査する
- Level: A

二つの局所接続 $\omega^{(1)},\omega^{(2)}$ と、基底 $M$ 上の滑らかな関数 $\varphi_1+\varphi_2=1$ があるとする。$\psi_i=\varphi_i\circ\pi$ として、主束上の形式 $\omega=\psi_1\omega^{(1)}+\psi_2\omega^{(2)}$ の基本ベクトル場への値を求めよ。右作用が基底を固定することも使い、右同変性を示せ（式は両接続が定義される領域上で考える）。

<!-- solution-start -->
**詳細解答**。接続の再生条件より $\omega^{(1)}(\xi_P)=\omega^{(2)}(\xi_P)=\xi$。従って

$$
\omega(\xi_P)=(\psi_1+\psi_2)\xi
=((\varphi_1+\varphi_2)\circ\pi)\,\xi=\xi.
$$

$R_g$ は $\pi(pg)=\pi(p)$ を満たすので $\psi_i(pg)=\varphi_i(\pi(pg))=\psi_i(p)$。両接続の同変性を使って

$$
R_g^*\omega
=\psi_1\operatorname{Ad}_{g^{-1}}\omega^{(1)}
+\psi_2\operatorname{Ad}_{g^{-1}}\omega^{(2)}
=\operatorname{Ad}_{g^{-1}}\omega.
$$

二条件を満たすから[接続形式の定義](../GBG7/index.md#def-gbg7-connection-form)を満たす。
<!-- solution-end -->

<a id="ex-gbg12-a03"></a>
#### GBG12-A03 可換な差
- Level: A

$\mathbb R^2\times U(1)$ に二つの接続を与える局所形式を $A_0=i x\,dy$、$A_1=i(x\,dy+y\,dx)$ とする。差 $B$ とそれぞれの曲率を求めよ。

<!-- solution-start -->
**詳細解答**。$B=A_1-A_0=i y\,dx$。可換な $U(1)$ では[曲率の局所公式](../GBG10/index.md#thm-gbg10-local-formula)は $F=dA$ である。よって

$$
F_0=i\,dx\wedge dy,\qquad
F_1=i(dx\wedge dy+dy\wedge dx)=0.
$$

また $dB=i\,dy\wedge dx=-i\,dx\wedge dy$ なので $F_1-F_0=dB$ と一致する。
<!-- solution-end -->

<a id="ex-gbg12-a04"></a>
#### GBG12-A04 差の変換
- Level: A

$U\subset\mathbb R^2$ 上の二つの $U(1)$ 局所形式 $A_0=i x\,dy$、$A_1=i x\,dy+i y\,dx$ に対し、section を $g=e^{ixy}$ により変更する。$A'_0,A'_1$ および $B'=A'_1-A'_0$ を計算せよ。

<!-- solution-start -->
**詳細解答**。$U(1)$ は可換で $g^{-1}dg=i\,d(xy)=i(y\,dx+x\,dy)$。従って[局所接続の変換則](../GBG8/index.md#thm-gbg8-local-transform)により

$$
\begin{aligned}
A'_0&=i x\,dy+i(y\,dx+x\,dy)=i y\,dx+2i x\,dy,\\
A'_1&=i y\,dx+i x\,dy+i(y\,dx+x\,dy)
=2i y\,dx+2i x\,dy.
\end{aligned}
$$

差は $B'=i y\,dx=B$。非斉次項が二つの接続に同じだけ加わるため差では消える。これは $\operatorname{Ad}$ が自明な場合の[随伴束値1形式の変換](#thm-gbg12-tensorial-adjoint)である。
<!-- solution-end -->

### Level B：構成と同変性を組み合わせる

<a id="ex-gbg12-b01"></a>
#### GBG12-B01 二パッチの貼り合わせを計算する
- Level: B

$P\to M$ の二つの局所 section を $s_2=s_1g$ で関係付ける。局所接続をそれぞれの基準 section で零に取り、$\varphi_1+\varphi_2=1$ とする。重み付き接続の局所成分 $A_1,A_2$ を求め、[GBG8の重なり条件](../GBG8/index.md#thm-gbg8-local-reconstruction)を検証せよ。

<!-- solution-start -->
**詳細解答**。$s_1$ を基準にした局所接続の成分は $0$ であり、これを $s_2=s_1g$ で見れば $g^{-1}dg$。反対に $s_2$ を基準にした零接続を $s_1=s_2g^{-1}$ で見れば $g\,d(g^{-1})$。よって

$$
A_1=\varphi_1\cdot0+\varphi_2g\,d(g^{-1}),\qquad
A_2=\varphi_1g^{-1}dg+\varphi_2\cdot0.
$$

$d(g^{-1})g=-g^{-1}dg$ を使って

$$
\operatorname{Ad}_{g^{-1}}A_1+g^{-1}dg
=\varphi_2d(g^{-1})g+g^{-1}dg
=(1-\varphi_2)g^{-1}dg=A_2.
$$

従って局所接続は貼り合わされ、大域接続になる。$g$ が非定数なら通常 $A_1,A_2$ の双方が零とはならない。
<!-- solution-end -->

<a id="ex-gbg12-b02"></a>
#### GBG12-B02 随伴束値形式の逆構成
- Level: B

$\alpha$ を水平・随伴同変な $\mathfrak g$ 値1形式とする。$a_x(v)=[p,\alpha_p(X)]$（$d\pi_pX=v$）が持ち上げ $X$ と点 $p$ に依存しないことを示せ。さらに $a$ から $\alpha$ を取り戻す式を書け。

<!-- solution-start -->
**詳細解答**。同じ $v$ に写る $X,X'$ の差は $d\pi(X'-X)=0$ より垂直である。水平性から $\alpha(X'-X)=0$、従って $\alpha(X')=\alpha(X)$。

同じファイバー上の別の点は $pg$ と表せる。その点では $dR_gX$ が $v$ の持ち上げであり、同変性から

$$
[pg,\alpha_{pg}(dR_gX)]
=[pg,\operatorname{Ad}_{g^{-1}}\alpha_p(X)]
=[p,\alpha_p(X)].
$$

逆に $a_x(v)$ が与えられたとき、各 $p\in P_x$ について $\xi\mapsto[p,\xi]$ は線形同型だから、

$$
[p,\alpha_p(X)]=a_x(d\pi_pX)
$$

を満たす唯一の $\alpha_p(X)$ を取ればよい。$d\pi_pX=0$ なら $\alpha_p(X)=0$、$p$ を $pg$ に替えれば同じ同値関係から随伴同変性が従う。滑らかさも確認する。局所 section $s_i$ で $a_x(v)=[s_i(x),B_{i,x}(v)]$ と表すと、$a$ が滑らかなので $B_i$ は滑らかな Lie 環値1形式である。$p=s_i(x)k$ では、随伴束の同値関係から

$$
\alpha_p(X)=\operatorname{Ad}_{k^{-1}}
\bigl(B_{i,x}(d\pi_pX)\bigr)
$$

となる。右辺は $p,X$ に滑らかに依存するので、逆構成した $\alpha$ も滑らかである。
<!-- solution-end -->

<a id="ex-gbg12-b03"></a>
#### GBG12-B03 補間はいつでも接続か
- Level: B

同じ右主 $G$ 束上の接続 $\omega_0,\omega_1$ に対して $\omega_t=(1-t)\omega_0+t\omega_1$ とする。任意の $t\in\mathbb R$ で接続となることを証明せよ。また $\omega_0+\omega_1$ が一般に接続にならない理由を述べよ。

<!-- solution-start -->
**詳細解答**。任意の $\xi\in\mathfrak g$ に対し

$$
\omega_t(\xi_P)=(1-t)\xi+t\xi=\xi.
$$

右同変性についても線形性から

$$
R_g^*\omega_t=(1-t)\operatorname{Ad}_{g^{-1}}\omega_0
+t\operatorname{Ad}_{g^{-1}}\omega_1
=\operatorname{Ad}_{g^{-1}}\omega_t.
$$

従って接続となる。一方、$\omega_0+\omega_1$ では基本ベクトル場の値が $\xi+\xi=2\xi$ となり、$\mathfrak g\ne0$ のとき再生条件を満たさない。係数が和1になるアフィン結合だけが自動的に接続になる。
<!-- solution-end -->

<a id="ex-gbg12-b04"></a>
#### GBG12-B04 非可換な曲率変化
- Level: B

$P=\mathbb R^2\times GL(2,\mathbb R)$ の標準 section で $A_0=H\,dx$、$B=X\,dy$、$H=E_{11}$、$X=E_{12}$ とする。$F_0$、$d_{A_0}B$、$[B\wedge B]$、$A_1=A_0+B$ の曲率 $F_1$ をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**。$H,X$ は定数行列、$dx\wedge dx=dy\wedge dy=0$ より $dA_0=0$、$A_0\wedge A_0=0$、$dB=0$、$B\wedge B=0$。従って $F_0=0$、$[B\wedge B]=0$。

行列積を計算すると $HX=X$、$XH=0$ だから $[H,X]=X$。ゆえに

$$
d_{A_0}B=dB+[A_0\wedge B]=X\,dx\wedge dy.
$$

直接 $A_1=H\,dx+X\,dy$ を[曲率の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)へ代入すると

$$
F_1=dA_1+A_1\wedge A_1
=(HX-XH)\,dx\wedge dy=X\,dx\wedge dy.
$$

[曲率変化公式](#prop-gbg12-curvature-variation)の $F_1=F_0+d_{A_0}B+\frac12[B\wedge B]$ と一致する。$dB=0$ でも曲率は増える。
<!-- solution-end -->

### Level C：存在と差の幾何を一つに結ぶ

<a id="ex-gbg12-c01"></a>
#### GBG12-C01 大域接続とそのすべての変形
- Level: C

$M$ を Hausdorff・第二可算の滑らかな有限次元多様体、$P\to M$ を滑らかな右主 $G$ 束とする。局所自明化の被覆 $(U_i)$、従属する滑らかな分割の1 $(\varphi_i)$、局所接続 $\omega^{(i)}$ が与えられたとする。

(1) $\omega=\sum_i(\varphi_i\circ\pi)\omega^{(i)}$ を各項の零延長で定義すると、大域接続になることを証明せよ。

(2) $a\in\Omega^1(M;\operatorname{ad}(P))$ が与えられたとき、対応するテンソル的1形式 $\alpha$ を書き、$\omega+\alpha$ が接続であることを証明せよ。

(3) 局所成分 $A=s^*\omega$、$B=s^*\alpha$ で曲率の差を計算し、別の section $s'=sg$ でも $B'=\operatorname{Ad}_{g^{-1}}B$ となることを確認せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $(\operatorname{supp}\varphi_i)$ は局所有限なので、零延長した各 $\widetilde\omega^{(i)}$ の和は $P$ 上の滑らかな1形式になる。零延長が滑らかなのは $\operatorname{supp}\varphi_i\subset U_i$ による。各局所接続の再生条件で

$$
\omega(\xi_P)=\sum_i\varphi_i(\pi(p))\,\xi=\xi.
$$

右作用は基底を固定し、各局所接続が随伴同変なので

$$
R_g^*\omega=\sum_i(\varphi_i\circ\pi)\operatorname{Ad}_{g^{-1}}\omega^{(i)}
=\operatorname{Ad}_{g^{-1}}\omega.
$$

従って[主束接続の定義](../GBG7/index.md#def-gbg7-connection-form)を満たす。

**(2)** 各 $p\in P_x$ で $[p,\cdot]$ は $\mathfrak g\to\operatorname{ad}(P)_x$ の線形同型だから

$$
[p,\alpha_p(X)]=a_x(d\pi_pX)
$$

により $\alpha_p(X)$ を一意に定める。垂直 $X$ なら右辺零で水平性が成立し、$p\mapsto pg$ の下では[随伴束の同値関係](../GBG5/index.md#def-gbg5-adjoint-lie-bundle)から $\alpha_{pg}(dR_gX)=\operatorname{Ad}_{g^{-1}}\alpha_p(X)$ となる。従って $\alpha$ はテンソル的である。再生条件 $(\omega+\alpha)(\xi_P)=\xi+0=\xi$ と右同変性が両方成立し、[接続の差の定理](#thm-gbg12-connection-difference)の逆向きからも $\omega+\alpha$ が接続である。

**(3)** [曲率の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)を二つの局所形式に使うと

$$
\begin{aligned}
F_{A+B}-F_A
&=dB+\frac12\{[A\wedge B]+[B\wedge A]+[B\wedge B]\}\\
&=dB+[A\wedge B]+\frac12[B\wedge B]\\
&=d_AB+\frac12[B\wedge B].
\end{aligned}
$$

二行目は1形式同士の括弧付き外積が対称であることによる。一方、同じ section 変更に対して二接続は[GBG8の変換則](../GBG8/index.md#thm-gbg8-local-transform)から

$$
A'=\operatorname{Ad}_{g^{-1}}A+g^{-1}dg,\qquad
(A+B)'=\operatorname{Ad}_{g^{-1}}(A+B)+g^{-1}dg.
$$

両式を引いて $B'=\operatorname{Ad}_{g^{-1}}B$。従って局所差は大域の随伴束値1形式の表示であり、基準 section に依存しない。
<!-- solution-end -->

---

## 7. 次章への接続

主束 $P$ 上の接続は常に構成でき、接続を一つ選んだ後は任意の $a\in\Omega^1(M;\operatorname{ad}(P))$ により別の接続へ移れる。**「すべての接続」の空間と、「同じゲージ変換で結ばれる接続」の集合は同じではない。** 次の GBG13 では、このアフィン空間にゲージ群がどのように作用するかを調べる。
