# GBG20 曲率から不変な多項式を作る条件は

[GBG19の第一Chern数](../GBG19/index.md#def-gbg19-chern-number)は、$U(1)$ 接続の曲率を複素数値2形式として積分した。$U(1)$ は可換なので、局所曲率 $F_i$ はパッチを替えても同じである。一方、非可換群では[GBG10の局所曲率変換則](../GBG10/index.md#thm-gbg10-gauge-transform)が

$$
F_j=\operatorname{Ad}_{g_{ij}^{-1}}F_i
$$

となる。曲率の行列成分をそのまま積分しようとすると、局所sectionの選択で値が変わりうる。

そこで、Lie環の複数の元から**共役で変わらない数**を取り出し、それを曲率に適用する。必要なのは、積を入れ替えられるという「対称性」と、同じ群元で同時に共役しても値が変わらないという「Ad不変性」である。これらは異なる条件であり、両方を確かめて初めて次の講義の Chern–Weil 形式を作る準備が整う。

**本講の設定**：$M$ は Hausdorff・第二可算で境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\mathfrak g=T_eG$、$\pi:P\to M$ は滑らかな右主 $G$ 束、$\omega$ はその接続1形式とする。$G$ は連結とも行列群とも仮定しない。曲率を $\Omega\in\Omega^2(P;\mathfrak g)$、局所section $s_i$ による曲率を $F_i=s_i^*\Omega$ と記す。係数は複素数とし、実数値の不変量が必要な場合は別途実数値条件を課す。曲率の微分形式の次数は2である。

<!-- definition-example-audit: strict -->

## 1. 行列成分ではなく共役不変な数を取りたい

まず $G=GL(2,\mathbb C)$ を考える。$X=\operatorname{diag}(1,-1)$ とし、基底上の局所曲率が

$$
F=X\,dx\wedge dy
$$

であったとする。定数のゲージ変更 $g=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ では $g^{-1}Xg=-X$ となる。第一対角成分は $1$ から $-1$ へ変わるのに対し、

$$
\operatorname{tr}(g^{-1}Xg)=\operatorname{tr}X=0,
\qquad
\operatorname{tr}((g^{-1}Xg)^2)=\operatorname{tr}(X^2)=2
$$

は変わらない。共役を受ける曲率から数を作るなら、このように**全引数の共役に対して不変な関数**を選びたい。

さらに、次数2の曲率を $k$ 個組み合わせれば $2k$ 形式になる。複数の曲率を受け取る関数の各引数を個別に扱えるよう、多重線形性も課す。対称性があると引数の順序による曖昧さをなくせる。

## 2. 対称Ad不変多重線形形式

$k\ge1$ を整数とする。Lie群 $G$ のLie環 $\mathfrak g=T_eG$ は、ここでは**実ベクトル空間**として扱う。写像 $p:\mathfrak g^k\to\mathbb C$ が **$k$ 重線形**とは、ほかの $k-1$ 個の引数を固定すると残る引数について実線形であることをいう。例えば第1引数では、実数 $a,b$ に対し

$$
p(aX+bY,X_2,\ldots,X_k)
=a\,p(X,X_2,\ldots,X_k)+b\,p(Y,X_2,\ldots,X_k)
$$

を要求する。$G=GL(n,\mathbb C)$ の場合も、Lie環を実Lie環として扱うので複素線形性までは要求しない。

**対称**とは任意の置換 $\sigma$ に対して $p(X_{\sigma(1)},\ldots,X_{\sigma(k)})=p(X_1,\ldots,X_k)$ となること、**Ad不変**とは全引数を同じ群元で随伴変換しても値が変わらないことをいう。随伴変換そのものは[Lie群の随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)で導入されている。

また、各引数に同じ $X$ を入れる写像 $q(X)=p(X,\ldots,X)$ は、$\mathfrak g$ の実線形座標で見れば次数 $k$ の斉次多項式（零多項式も含む）になる。斉次性とは任意の実数 $t$ について $q(tX)=t^kq(X)$ となることをいう。

<a id="def-gbg20-invariant-polynomial"></a>

<!-- formal-statement-start -->
> **定義（対称Ad不変多重線形形式）**  
> 有限次元Lie群 $G$ のLie環 $\mathfrak g$ と整数 $k\ge1$ に対し、各引数で実線形な写像 $p:\mathfrak g^k\to\mathbb C$ が対称であり、任意の $g\in G$ および $X_1,\ldots,X_k\in\mathfrak g$ に対して

$$
p(\operatorname{Ad}_gX_1,\ldots,\operatorname{Ad}_gX_k)
=p(X_1,\ldots,X_k)
$$

> を満たすとき、$p$ を **次数 $k$ の対称Ad不変多重線形形式**と呼ぶ。この $p$ に対応する斉次多項式は $q(X)=p(X,\ldots,X)$ である。
<!-- formal-statement-end -->

$p$ の各引数の対称性と $q$ のAd不変性を混同しない。**対称化**を行っていない任意の積のtraceは $k\ge3$ で対称とは限らない。

<!-- definition-example-start: def-gbg20-invariant-polynomial -->
**定義の確認**（可換群の例）。$G=U(1)$ なら $\mathfrak g=i\mathbb R$ で、任意の $g$ に対して $\operatorname{Ad}_gX=X$ である。$X_j=it_j$（$t_j\in\mathbb R$）として

$$
p_k(it_1,\ldots,it_k)=t_1\cdots t_k
$$

と定めると、各 $t_j$ への実線形性、任意の引数置換に対する積の一致、全引数へのAd作用の自明性を順に確認できる。よってこれはすべての $k\ge1$ で定義を満たす。この族では $p_1(it)=t$ である。一方、[GBG19の第一Chern数の正規化](../GBG19/index.md#def-gbg19-chern-number)に用いる別の実線形形式は

$$
p_{\mathrm{Ch},1}(X)=\frac{iX}{2\pi},
\qquad
p_{\mathrm{Ch},1}(it)=-\frac{t}{2\pi}
$$

なので、$p_{\mathrm{Ch},1}=-p_1/(2\pi)$ である。両者ともAd不変だが、同じ形式ではない。
<!-- definition-example-end -->

**非例**。$G=GL(2,\mathbb C)$ を実Lie群として見て $p(X)=X_{11}$ と置くと線形かつ1重のため対称だが、前節の $g$ と $X$ では $p(g^{-1}Xg)=-1\ne1=p(X)$。破れているのはAd不変性である。したがって成分 $(F_i)_{11}$ は一般に貼り合わせられない。

### 無限小の条件で確認できること

有限変換の条件を微分すると、Lie括弧を使う判定式が得られる。$\operatorname{ad}_Y X=[Y,X]$ は[Lie環の無限小随伴作用](../../../代数系/LIE/LIE2/index.md#def-lie2-infinitesimal-adjoint)である。

<a id="prop-gbg20-infinitesimal-condition"></a>

<!-- formal-statement-start -->
> **命題（Ad不変性の無限小必要条件）**  
> 有限次元Lie群 $G$ のLie環 $\mathfrak g$ 上のAd不変な $k$ 重線形形式 $p:\mathfrak g^k\to\mathbb C$ は、任意の $Y,X_1,\ldots,X_k\in\mathfrak g$ に対して

$$
\sum_{j=1}^{k}p(X_1,\ldots,[Y,X_j],\ldots,X_k)=0
$$

> を満たす。$G$ が連結なら、この恒等式はAd不変性の十分条件でもある。
<!-- formal-statement-end -->

**証明の見取り図**。$g(t)=\exp(tY)$ で全引数を同時に動かして $t=0$ で微分する。逆向きは微分式から各1パラメータ部分群に関する不変性を得て、連結群の任意の元へつなぐ。

<!-- proof-start -->
### 証明

$h(t)=p(\operatorname{Ad}_{\exp(tY)}X_1,\ldots,\operatorname{Ad}_{\exp(tY)}X_k)$ と置く。Ad不変性があれば $h(t)$ は定数である。$\frac{d}{dt}|_{t=0}\operatorname{Ad}_{\exp(tY)}X_j=[Y,X_j]$ と、多重線形写像の各引数に対する積の微分則から

$$
0=h'(0)=\sum_{j=1}^k p(X_1,\ldots,[Y,X_j],\ldots,X_k)
$$

を得る。これは必要性を示す。

逆にこの恒等式を仮定する。$Y$ と $X_j$ を固定して $t$ を動かし、$Z_j(t)=\operatorname{Ad}_{\exp(tY)}X_j$ と置く。1パラメータ部分群の積 $\exp((t+h)Y)=\exp(hY)\exp(tY)$ と[無限小随伴作用](../../../代数系/LIE/LIE2/index.md#def-lie2-infinitesimal-adjoint)により

$$
Z_j'(t)=\left.\frac{d}{dh}\right|_{h=0}
\operatorname{Ad}_{\exp(hY)}Z_j(t)
=[Y,Z_j(t)]
$$

となる。従って

$$
h'(t)=\sum_{j=1}^kp(Z_1(t),\ldots,[Y,Z_j(t)],\ldots,Z_k(t))=0.
$$

ゆえに $p$ は $\operatorname{Ad}_{\exp(tY)}$ で不変である。$G$ が連結なら指数写像の単位元近傍の像が生成する部分群は $G$ 全体である。実際、指数写像は零の近傍から単位元近傍への局所微分同相であり、その像で生成された部分群は開である。開部分群の各剰余類も開なので、連結群には真の開部分群がない。従って任意の $g\in G$ は有限個の指数元の積であり、Ad表現の積と各指数元での不変性から $g$ に対するAd不変性が従う。
<!-- proof-end -->

**連結性を落とすと何が壊れるか**。$G=O(2)$ のLie環は1次元で可換だから、どんな線形形式 $p:\mathfrak{so}(2)\to\mathbb R$ も上の括弧条件を満たす。しかし回転の生成元

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

は反射 $r=\operatorname{diag}(1,-1)$ によって $rJr^{-1}=-J$ と変わる。$p(tJ)=t$ とすれば $p(\operatorname{Ad}_rJ)=-1\ne1$ である。無限小条件が検出するのは単位成分内の変化だけで、離れた成分による符号反転は検出できない。したがって本講以降の不変多項式は、**常に群全体のAd不変性**で定義する。

## 3. traceから不変多項式を構成する

[GBG17のWilson loop](../GBG17/index.md#def-gbg17-wilson-loop)では、行列の共役でtraceが変わらないことを利用した。曲率にも、行列traceの巡回不変性を適用できる。ただし行列積は一般に非可換なので、複数の引数を受け取る形では**置換の平均**を取る。

$\rho:G\to GL(V)$ を有限次元複素表現とし、その単位元での微分（微分表現）を

$$
\rho_*(X)=\left.\frac{d}{dt}\right|_{t=0}\rho(\exp(tX))
\in\operatorname{End}_{\mathbb C}(V)
$$

と書く。ここでは $X\in\mathfrak g$ とし、$t$ は実数を動く。$\rho_*$ は実線形で、$\rho_*(\operatorname{Ad}_gX)=\rho(g)\rho_*(X)\rho(g)^{-1}$ を満たす（共役による導出は次の定理の証明で行う）。$V$ の基底を一つ選べば $\rho_*(X)$ は正方行列で表され、その行列のtraceは基底を取り替えても共役不変なので元の線形作用素のtraceに等しい。$\mathfrak S_k$ は $k$ 個の位置を入れ替える置換全体、$k!$ は置換の個数である。

<a id="def-gbg20-symmetrized-trace"></a>

<!-- formal-statement-start -->
> **定義（表現に付随する対称化trace形式）**  
> 有限次元Lie群 $G$ の有限次元複素表現 $\rho:G\to GL(V)$ と整数 $k\ge1$ について、写像 $p_{\rho,k}:\mathfrak g^k\to\mathbb C$ を

$$
p_{\rho,k}(X_1,\ldots,X_k)
=\frac1{k!}\sum_{\sigma\in\mathfrak S_k}
\operatorname{tr}\!\left(
\rho_*(X_{\sigma(1)})\cdots\rho_*(X_{\sigma(k)})
\right)
$$

> と定める。$\operatorname{tr}$ は複素ベクトル空間 $V$ 上の線形作用素のtraceである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg20-symmetrized-trace -->
**定義の確認**（低次数）。$k=1$ では $\operatorname{tr}\rho_*(X)$、$k=2$ では

$$
p_{\rho,2}(X,Y)
=\tfrac12\operatorname{tr}(\rho_*(X)\rho_*(Y))
+\tfrac12\operatorname{tr}(\rho_*(Y)\rho_*(X))
=\operatorname{tr}(\rho_*(X)\rho_*(Y)).
$$

最後の等号は $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ による。さらに $G=U(1)$ と標準の1次元表現 $\rho(e^{it})=e^{it}$ では $\rho_*(it)=it$ なので、上式は $p_{\rho,2}(it_1,it_2)=-t_1t_2$ となる。各引数への実線形性、$t_1,t_2$ を入れ替えた対称性、可換群ゆえのAd不変性をそれぞれ確認できる。
<!-- definition-example-end -->

$k=3$ では、巡回置換のみでは六つの順序をすべて同一視できない。

<a id="thm-gbg20-trace-invariant"></a>

<!-- formal-statement-start -->
> **定理（対称化traceのAd不変性）**  
> 有限次元Lie群 $G$ と有限次元複素表現 $\rho:G\to GL(V)$ について、すべての整数 $k\ge1$ に対し、[対称化trace形式](#def-gbg20-symmetrized-trace) $p_{\rho,k}$ は対称Ad不変 $k$ 重線形形式である。
<!-- formal-statement-end -->

**証明の見取り図**。各引数の線形性は $\rho_*$ の線形性とtraceの線形性、対称性は置換全体で和を取ることから出る。Ad不変性では、積の途中に現れる $\rho(g)^{-1}\rho(g)$ を消すと全体が一つの共役になる。

<!-- proof-start -->
### 証明

各置換 $\sigma$ に対する項は各 $X_j$ について実線形である。有限和も多重線形になる。任意の置換 $\tau$ で引数を並べ替えると、和の添字 $\sigma$ は $\tau\circ\sigma$ に一対一に置き換わるので、置換全体の和は不変であり、対称性が従う。

Ad不変性について、表現の準同型性を $\exp(tX)$ の共役に適用して微分すると

$$
\rho_*(\operatorname{Ad}_gX)
=\left.\frac d{dt}\right|_{t=0}
\rho(g\exp(tX)g^{-1})
=\rho(g)\rho_*(X)\rho(g)^{-1}.
$$

$T=\rho(g)$ と置けば、各置換の積は

$$
(T\rho_*(X_{\sigma(1)})T^{-1})\cdots
(T\rho_*(X_{\sigma(k)})T^{-1})
=T\bigl(\rho_*(X_{\sigma(1)})\cdots\rho_*(X_{\sigma(k)})\bigr)T^{-1}.
$$

任意の正方行列 $B$ について $\operatorname{tr}(TBT^{-1})=\operatorname{tr}(BT^{-1}T)=\operatorname{tr}B$ だから、各項が変わらない。その有限和も変わらず、定義の二条件を満たす。
<!-- proof-end -->

**対称化が必要な直接例**。$E_{ab}$ を第 $(a,b)$ 成分が1で他が0の $3\times3$ 行列とする。$G=GL(3,\mathbb C)$ の標準表現では $\rho_*(X)=X$ なので、抽象的なtrace形式を行列積で判定できる。行列単位の積 $E_{ab}E_{cd}=\delta_{bc}E_{ad}$（$\delta_{bc}$ は添字が一致するとき1、それ以外は0）を用い、$X=E_{12}$、$Y=E_{23}$、$Z=E_{31}$ を取ると

$$
XYZ=E_{11},\quad \operatorname{tr}(XYZ)=1;
\qquad
XZY=0,\quad \operatorname{tr}(XZY)=0.
$$

従って $\operatorname{tr}(XYZ)$ はAd不変でも、三引数について対称ではない。対称化した $p_{\rho,3}$ ならこの順序差は生じない。

**表現を指定する意味**。$GL(2,\mathbb C)$ の標準表現では $p_{\rho,1}(X)=\operatorname{tr}X$ だが、1次元の自明表現では $\rho_*(X)=0$ なので、すべての $p_{\rho,k}=0$ となる。「任意の表現traceが同じ多項式を与える」とは言えない。また、任意の行列値割当て $T(X)$ を $\rho_*(X)$ と呼んでも共役公式は保証されない。定理には実際の群表現であるという仮定が必要である。

## 4. Lie環値曲率をスカラー値の微分形式へ変える

局所曲率 $F_i$ はLie環値2形式である。基底 $e_1,\ldots,e_m$ を固定し、成分を

$$
F_i=\sum_{a=1}^m F_i^a e_a,\qquad F_i^a\in\Omega^2(U_i;\mathbb R)
$$

と書く。$e_a$ は実ベクトル空間 $\mathfrak g$ の基底、$F_i^a$ は対応する実数値の2形式である。$p$ の多重線形性を使えば、係数を先に評価して微分形式を外積することができる。曲率は偶数次数なので $F_i^a\wedge F_i^b=(-1)^{2\cdot2}F_i^b\wedge F_i^a=F_i^b\wedge F_i^a$ である。

一般に $\alpha_j=\sum_a\alpha_j^a e_a$ が次数 $r_j$ のLie環値微分形式のとき、記号 $p(\alpha_1,\ldots,\alpha_k)$ は

$$
p(\alpha_1,\ldots,\alpha_k)
=\sum_{a_1,\ldots,a_k}
p(e_{a_1},\ldots,e_{a_k})\,
\alpha_1^{a_1}\wedge\cdots\wedge\alpha_k^{a_k}
$$

という次数 $r_1+\cdots+r_k$ の複素数値形式を表す。各 $e_a$ は固定した実基底で、複素係数は外積の係数に掛ける。基底を替えたときの係数変換も確認する。$e'_a=\sum_b C_{ba}e_b$ と置くと、同じ形式を二つの基底で表示した等式から

$$
\alpha_j=\sum_a\alpha_j^{\prime a}e'_a
=\sum_b\left(\sum_a C_{ba}\alpha_j^{\prime a}\right)e_b,
\qquad
\alpha_j^b=\sum_a C_{ba}\alpha_j^{\prime a}
$$

を得る。したがって

$$
\sum_{a_1,\ldots,a_k}p(e'_{a_1},\ldots,e'_{a_k})
\,\alpha_1^{\prime a_1}\wedge\cdots\wedge\alpha_k^{\prime a_k}
=\sum_{b_1,\ldots,b_k}p(e_{b_1},\ldots,e_{b_k})
\,\alpha_1^{b_1}\wedge\cdots\wedge\alpha_k^{b_k}.
$$

これは各 $e'_a$ を展開して多重線形性を適用した等式であり、外積による評価が基底の選び方に依存しない理由である。

<a id="def-gbg20-curvature-polynomial-form"></a>

<!-- formal-statement-start -->
> **定義（曲率に適用した不変多項式形式）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$、その接続 $\omega$ と曲率 $\Omega$、および次数 $k\ge1$ の対称Ad不変多重線形形式 $p:\mathfrak g^k\to\mathbb C$ に対し、上の係数ごとの外積の規則で構成した $2k$ 形式を

$$
p(\Omega^k):=p(\Omega,\ldots,\Omega)\in\Omega^{2k}(P;\mathbb C)
$$

> と書く。局所section $s_i:U_i\to P$ の下では $p(F_i^k):=p(F_i,\ldots,F_i)$ と書く。$2k>\dim M$ の場合は、基底上に得られる $2k$ 形式は零とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg20-curvature-polynomial-form -->
**定義の確認**（4形式の構成）。$G=U(1)$、$M=\mathbb R^4$ の積主束上で

$$
A=i(x^1dx^2+x^3dx^4),\qquad
F=dA=i(dx^1\wedge dx^2+dx^3\wedge dx^4)
$$

とする。可換なので $A\wedge A$ の括弧項は零である。$\mathfrak u(1)=\mathbb R e$ の実基底 $e=i$ と、$\eta=dx^1\wedge dx^2$、$\zeta=dx^3\wedge dx^4$ を取ると $F=e(\eta+\zeta)$ である。$p_2(it_1,it_2)=t_1t_2$ は $p_2(e,e)=1$ を満たすので、定義の係数評価規則から

$$
p_2(F,F)=p_2(e,e)(\eta+\zeta)\wedge(\eta+\zeta)
=\eta\wedge\eta+\eta\wedge\zeta+\zeta\wedge\eta+\zeta\wedge\zeta
=2\,dx^1\wedge dx^2\wedge dx^3\wedge dx^4.
$$

ここでは $\eta\wedge\eta=\zeta\wedge\zeta=0$ である。例えば $\eta\wedge\eta$ には $dx^1$ が重複して現れるためである。交差項は2形式どうしの交換符号 $(-1)^{2\cdot2}=+1$ により足し合わされる。**一般の2形式の自己外積が零という意味ではなく**、実際に $(\eta+\zeta)\wedge(\eta+\zeta)\ne0$ となる。$p_2$ の実2重線形性、対称性とAd不変性は先の $U(1)$ の確認に従い、外積規則の適用も基底表示から確かめられた。
<!-- definition-example-end -->

### 何が「大域の形式」なのか

[GBG10の曲率の水平性・同変性](../GBG10/index.md#thm-gbg10-basic-properties)によれば、$\Omega$ は垂直ベクトルを挿入すると零になり、$R_g^*\Omega=\operatorname{Ad}_{g^{-1}}\Omega$ を満たす。この**水平性と右作用不変性**という二条件を持つスカラー値形式は、基底多様体上の一意の形式の引き戻しで表せる。以下ではこの対応も証明する。

<a id="thm-gbg20-basic-descent"></a>

<!-- formal-statement-start -->
> **定理（不変曲率多項式の大域への降下）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ と滑らかな接続の曲率 $\Omega$ を取り、$p:\mathfrak g^k\to\mathbb C$ を次数 $k\ge1$ の対称Ad不変多重線形形式とする。このとき $p(\Omega^k)$ は水平かつ右 $G$ 不変であり、一意の形式 $\beta_p(\omega)\in\Omega^{2k}(M;\mathbb C)$ が存在して

$$
\pi^*\beta_p(\omega)=p(\Omega^k)
$$

> を満たす。各局所section $s_i$ では $\beta_p(\omega)|_{U_i}=p(F_i^k)$ である。
<!-- formal-statement-end -->

**証明の見取り図**。水平性は曲率の各因子から継承する。右作用で各因子が同じAd変換を受けるが、$p$ がその同時変換を打ち消す。局所sectionで引き戻した形式は重なりで一致するから貼り合わされる。

<!-- proof-start -->
### 証明

任意の $v\in\ker d\pi\subset TP$ を $p(\Omega^k)$ の第1引数へ挿入する。各外積項で少なくとも一つの $\Omega$ に $v$ が入る。[曲率の水平性](../GBG10/index.md#thm-gbg10-basic-properties)によりその因子が零なので、全項が零である。したがって $p(\Omega^k)$ は水平である。

次に $g\in G$ に対し、曲率の同変性と $p$ のAd不変性から

$$
R_g^*p(\Omega^k)
=p((R_g^*\Omega)^k)
=p((\operatorname{Ad}_{g^{-1}}\Omega)^k)
=p(\Omega^k).
$$

よって右作用に関して不変である。

各自明化領域 $U_i$ で $\beta_i=s_i^*p(\Omega^k)=p((s_i^*\Omega)^k)=p(F_i^k)$ と置く。重なりで $s_j=s_ig_{ij}$ だから、[局所曲率の変換則](../GBG10/index.md#thm-gbg10-gauge-transform)を適用して

$$
\beta_j=p(F_j^k)
=p((\operatorname{Ad}_{g_{ij}^{-1}}F_i)^k)
=p(F_i^k)=\beta_i.
$$

従って $\beta_i$ は重なりで一致し、唯一の滑らかな形式 $\beta$ に貼り合わさる。$u\in P$ に対し、局所section $s_i$ と $h\in G$ を用いて $u=s_i(x)h$ と一意に書ける。$v_1,\ldots,v_{2k}\in T_uP$ とし $w_\ell=d\pi_u(v_\ell)\in T_xM$ と置く。$d\pi\circ dR_h=d\pi$ と $\pi\circ s_i=\operatorname{id}$ により

$$
v_\ell=d(R_h)_{s_i(x)}(ds_i)_x(w_\ell)+v_\ell^{\mathrm{vert}},
\qquad v_\ell^{\mathrm{vert}}\in\ker d\pi_u.
$$

水平性で垂直成分の項は零になり、右不変性を使うと

$$
p(\Omega^k)_u(v_1,\ldots,v_{2k})
=p(\Omega^k)_{s_i(x)}((ds_i)_xw_1,\ldots,(ds_i)_xw_{2k})
=\beta_x(w_1,\ldots,w_{2k}).
$$

従って $\pi^*\beta=p(\Omega^k)$ が成り立つ。

最後に $\pi^*\beta=\pi^*\widetilde\beta$ なら、各 $s_i^*$ を作用させて $\beta|_{U_i}=\widetilde\beta|_{U_i}$ が従い、一意である。
<!-- proof-end -->

この定理は **局所曲率を使って大域的な微分形式を作れる**という主張である。$\beta_p(\omega)$ が閉形式であることはまだ示していない。その証明では[GBG11のBianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)とAd不変性を一緒に使い、次のGBG21で扱う。また、任意の $p$ から得た形式の積分が整数だという主張でもない。前講の[第一Chern数の整数性](../GBG19/index.md#thm-gbg19-general-integrality)には球面の巻き数という追加の論証があった。

## 5. 小さい例で条件を見分ける

**例1：次数1の第一Chern形式につながる場合**。$G=U(1)$ に対し、先ほど区別した $p_{\mathrm{Ch},1}(X)=iX/(2\pi)$ を用いる。これは実線形で1引数のため対称、かつ $U(1)$ のAd作用が自明なので不変である。$S^2$ 上の[GBG19のmonopole曲率](../GBG19/index.md#thm-gbg19-curvature-flux) $F=-in\sin\vartheta\,d\vartheta\wedge d\varphi/2$ では

$$
\beta_{p_{\mathrm{Ch},1}}=\frac{i}{2\pi}F
=\frac{n}{4\pi}\sin\vartheta\,d\vartheta\wedge d\varphi.
$$

これを球面で積分すると $n$ になる。整数になる理由はこの**特定の束・正規化と巻き数**にあり、対称Ad不変性だけから整数性は出ない。

**例2：次数2の行列のtrace**。$G=GL(2,\mathbb C)$ の標準表現 $\rho$ に対し $p_{\rho,2}(X,Y)=\operatorname{tr}(XY)$ は対称でAd不変である。$X=\operatorname{diag}(1,-1)$ では $p_{\rho,2}(X,X)=2$、一方 $p_{\rho,1}(X)=\operatorname{tr}X=0$。次数1の不変量で見えないものを次数2が捉えることがある。ただし底の次元が2なら $p_2(F,F)$ は4形式なので必ず零であり、基底の次元も重要である。

**例3：群全体の不変性を要する場合**。上の $O(2)$ では $p(tJ)=t$ は無限小条件を満たすが反射のAd作用では符号が変わる。反射を遷移関数に含む主束では、局所曲率の成分から作る $p(F_i)$ が重なりで符号反転し、大域形式へ降りない。[大域への降下定理](#thm-gbg20-basic-descent)が壊れる機構は、局所曲率変換に対する $p$ の不変性の欠如である。

## 6. 演習と詳細解答

### Level A：多重線形性・置換・低次数を手で確かめる

<a id="ex-gbg20-a01"></a>
#### GBG20-A01 可換群の不変形式
- Level: A

$G=U(1)$、$X_j=it_j$ とする。$p_2(it_1,it_2)=3t_1t_2$ が実双線形・対称・Ad不変であることを一つずつ示し、$q(it)=p_2(it,it)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$t_1,t_2\in\mathbb R$ と固定し、$a,b\in\mathbb R$ について

$$
p_2(i(at_1+bt'_1),it_2)=3(at_1+bt'_1)t_2
=a\,p_2(it_1,it_2)+b\,p_2(it'_1,it_2).
$$

第2引数も同じ積の分配法則で実線形である。$3t_1t_2=3t_2t_1$ なので対称である。$U(1)$ は可換ゆえ $\operatorname{Ad}_g(it)=it$ で、両引数の同時Ad変換で値が変わらない。最後に $q(it)=3t^2$。三条件と斉次次数2を直接確認した。
<!-- solution-end -->

<a id="ex-gbg20-a02"></a>
#### GBG20-A02 traceの対称性
- Level: A

$X=\begin{pmatrix}1&2\\0&-1\end{pmatrix}$、$Y=\begin{pmatrix}0&1\\3&0\end{pmatrix}$ とする。$\operatorname{tr}(XY)$、$\operatorname{tr}(YX)$ を実際に計算せよ。

<!-- solution-start -->
**詳細解答**。行列を掛けると

$$
XY=\begin{pmatrix}6&1\\-3&0\end{pmatrix},\qquad
YX=\begin{pmatrix}0&-1\\3&6\end{pmatrix}.
$$

対角成分の和はどちらも $6$ である。従って $\operatorname{tr}(XY)=6=\operatorname{tr}(YX)$。一般の二因子traceの巡回性の直接確認である。
<!-- solution-end -->

<a id="ex-gbg20-a03"></a>
#### GBG20-A03 2形式を二つ掛ける
- Level: A

$M=\mathbb R^4$ とし、$\alpha=2\,dx^1\wedge dx^2-3\,dx^3\wedge dx^4$ とする。$\alpha\wedge\alpha$ を計算し、なぜ交差項が打ち消し合わないか述べよ。

<!-- solution-start -->
**詳細解答**。$\eta=dx^1\wedge dx^2$、$\zeta=dx^3\wedge dx^4$ と置く。$\eta\wedge\eta=\zeta\wedge\zeta=0$、一方 $\zeta\wedge\eta=(-1)^{2\cdot2}\eta\wedge\zeta=\eta\wedge\zeta$ だから

$$
\alpha\wedge\alpha=(2\eta-3\zeta)^2
=-6\eta\wedge\zeta-6\zeta\wedge\eta
=-12\,dx^1\wedge dx^2\wedge dx^3\wedge dx^4.
$$

1形式の外積とは違い、2形式を交換した符号は $+1$ である。
<!-- solution-end -->

<a id="ex-gbg20-a04"></a>
#### GBG20-A04 非不変な成分
- Level: A

$G=GL(2,\mathbb C)$、$X=\operatorname{diag}(2,-1)$、$g=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とする。$p(X)=X_{11}$ と $q(X)=\operatorname{tr}X$ を共役前後で比較せよ。

<!-- solution-start -->
**詳細解答**。$g^{-1}=g$ だから

$$
g^{-1}Xg=\operatorname{diag}(-1,2).
$$

よって $p(X)=2$ だが $p(g^{-1}Xg)=-1$ でAd不変ではない。一方 $q(X)=2+(-1)=1$、$q(g^{-1}Xg)=-1+2=1$。行列の一成分を貼り合わせる操作には失敗し、traceは成功する。
<!-- solution-end -->

### Level B：無限小条件・表現・大域降下をつなぐ

<a id="ex-gbg20-b01"></a>
#### GBG20-B01 二次traceの無限小条件
- Level: B

$\mathfrak g=\mathfrak{gl}(n,\mathbb C)$ を実Lie環として $p(X,Y)=\operatorname{tr}(XY)$ とする。$Z,X,Y$ に対して $p([Z,X],Y)+p(X,[Z,Y])=0$ を積の順序を残して証明せよ。

<!-- solution-start -->
**詳細解答**。Lie括弧を展開して

$$
p([Z,X],Y)+p(X,[Z,Y])
=\operatorname{tr}((ZX-XZ)Y)+\operatorname{tr}(X(ZY-YZ)).
$$

四項を分けると

$$
=\operatorname{tr}(ZXY)-\operatorname{tr}(XZY)
+\operatorname{tr}(XZY)-\operatorname{tr}(XYZ)
=\operatorname{tr}(ZXY)-\operatorname{tr}(XYZ).
$$

最後はtraceの巡回性で $\operatorname{tr}(ZXY)=\operatorname{tr}(XYZ)$。従って零であり、[無限小必要条件](#prop-gbg20-infinitesimal-condition)を満たす。中間二項の相殺と端の巡回性は別の理由である。
<!-- solution-end -->

<a id="ex-gbg20-b02"></a>
#### GBG20-B02 三重traceはなぜ対称化するか
- Level: B

$X=E_{12},Y=E_{23},Z=E_{31}\in\mathfrak{gl}(3,\mathbb C)$ とする。$\operatorname{tr}(XYZ)$、$\operatorname{tr}(XZY)$ と、6つの置換を平均した $p_{\rho,3}(X,Y,Z)$ を計算せよ。$\rho$ は標準表現とする。

<!-- solution-start -->
**詳細解答**。行列単位の積は $E_{ab}E_{cd}=\delta_{bc}E_{ad}$ である。この式より $XYZ=E_{11}$ でtraceは $1$、$XZ=E_{12}E_{31}=0$ で逆順は $0$ である。六つの積のうち $XYZ,YZX,ZXY$ はそれぞれ $E_{11},E_{22},E_{33}$ を作りtraceが $1$、$XZY,ZYX,YXZ$ は零を作る。従って

$$
p_{\rho,3}(X,Y,Z)=\frac{1+1+1+0+0+0}{3!}=\frac12.
$$

$X$ と $Z$ を入れ替えても六つの積は並べ替わるだけで平均は不変になる。
<!-- solution-end -->

<a id="ex-gbg20-b03"></a>
#### GBG20-B03 曲率多項式の局所一致
- Level: B

主 $G$ 束上の二つの局所sectionで $F_j=\operatorname{Ad}_{g^{-1}}F_i$ が成立するとする。$p:\mathfrak g^2\to\mathbb C$ が対称Ad不変実双線形形式であるとき、$p(F_j,F_j)=p(F_i,F_i)$ を、局所基底展開を使って示せ。

<!-- solution-start -->
**詳細解答**。実基底 $e_a$ を用いて $F_i=\sum_aF_i^ae_a$ と書くと

$$
F_j=\sum_aF_i^a\operatorname{Ad}_{g^{-1}}e_a.
$$

外積の係数評価規則により

$$
p(F_j,F_j)=\sum_{a,b}p(\operatorname{Ad}_{g^{-1}}e_a,\operatorname{Ad}_{g^{-1}}e_b)
F_i^a\wedge F_i^b.
$$

各係数にAd不変性を適用すると $p(e_a,e_b)$ へ戻る。従って和は $\sum_{a,b}p(e_a,e_b)F_i^a\wedge F_i^b=p(F_i,F_i)$ である。群元 $g(x)$ が点によって変わっても、この等式は各点で成り立つ。
<!-- solution-end -->

<a id="ex-gbg20-b04"></a>
#### GBG20-B04 反射と無限小不変性
- Level: B

$G=O(2)$、$J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とし、$\ell(tJ)=t$ とする。Lie括弧による無限小不変条件は満たすのに、$\ell$ がAd不変でないことを示せ。その結果、反射を含む遷移関数で何が起こり得るか説明せよ。

<!-- solution-start -->
**詳細解答**。$\mathfrak{so}(2)=\mathbb RJ$ は1次元可換なので任意の $aJ,bJ$ に対し $[aJ,bJ]=0$。従って線形形式 $\ell$ について $\ell([aJ,bJ])=0$ は常に真である。しかし $r=\operatorname{diag}(1,-1)$ で

$$
rJr^{-1}=-J,\qquad
\ell(\operatorname{Ad}_rJ)=-1\ne1=\ell(J).
$$

局所曲率が $F_i=J\alpha$ なら反射の遷移関数で $F_j=-J\alpha$ となり、$\ell(F_i)=\alpha$ に対し $\ell(F_j)=-\alpha$ となる。$\alpha\ne0$ の位置では局所形式が一致しない。つまり欠けた群全体のAd不変性が[降下定理](#thm-gbg20-basic-descent)の貼り合わせ段階を壊す。
<!-- solution-end -->

### Level C：非可換接続から大域4形式を組み立てる

<a id="ex-gbg20-c01"></a>
#### GBG20-C01 低次数の不変曲率形式とゲージ変更
- Level: C

$M=\mathbb R^4$、$G=SU(2)$ とし、積主束の局所接続を $A=X(x^1dx^2+x^3dx^4)$ と置く。ただし $X=\operatorname{diag}(i,-i)\in\mathfrak{su}(2)$ とする。$p_1(Y)=\operatorname{tr}Y$、$p_2(Y,Z)=-\frac12\operatorname{tr}(YZ)$ を定める。

1. $p_1$ と $p_2$ の対称性・Ad不変性を示せ。
2. $F=dA+A\wedge A$ を計算して $p_1(F)$ と $p_2(F,F)$ を求めよ。
3. 定数 $h=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\in SU(2)$ による局所section変更で $F'=h^{-1}Fh$ を求め、両スカラー値形式が変化しないことを計算で確認せよ。
4. この例だけから一般の整数Chern数や接続非依存性を結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

**1.** $p_1$ は線形で1引数だから対称であり、$\operatorname{tr}(h^{-1}Yh)=\operatorname{tr}Y$ によりAd不変である。$p_2$ は各引数に実線形、$\operatorname{tr}(YZ)=\operatorname{tr}(ZY)$ より対称である。さらに

$$
p_2(h^{-1}Yh,h^{-1}Zh)
=-\tfrac12\operatorname{tr}(h^{-1}YZh)
=-\tfrac12\operatorname{tr}(YZ)
=p_2(Y,Z)
$$

でAd不変である。

**2.** $\alpha=x^1dx^2+x^3dx^4$ と置くと $A=X\alpha$ だから $A\wedge A=X^2\alpha\wedge\alpha=0$。従って

$$
F=X\,d\alpha=X(\eta+\zeta),\qquad
\eta=dx^1\wedge dx^2,\quad \zeta=dx^3\wedge dx^4.
$$

$\operatorname{tr}X=i+(-i)=0$ なので $p_1(F)=0$。また $X^2=-I_2$ より $p_2(X,X)=-\frac12(-2)=1$ であり、

$$
p_2(F,F)
=p_2(X,X)(\eta+\zeta)\wedge(\eta+\zeta)
=2\,dx^1\wedge dx^2\wedge dx^3\wedge dx^4.
$$

**3.** $h^{-1}=-h$、$\det h=1$、$h^*h=I$ であり $h\in SU(2)$。直接掛けると $h^{-1}Xh=-X$。よって $F'=-X(\eta+\zeta)$ となる。一方

$$
p_1(F')=-\operatorname{tr}X(\eta+\zeta)=0,
$$

$$
p_2(F',F')
=p_2(-X,-X)(\eta+\zeta)^2
=p_2(X,X)\,2\eta\wedge\zeta
=2\,dx^1\wedge dx^2\wedge dx^3\wedge dx^4.
$$

局所行列は反転するが、不変多項式形式は同じである。これは[局所曲率変換則](../GBG10/index.md#thm-gbg10-gauge-transform)および[大域への降下](#thm-gbg20-basic-descent)の具体例である。

**4.** この底 $M=\mathbb R^4$ は非コンパクトであり、今求めた4形式を積分して整数が得られるような閉4次元サイクルを指定していない。また、一般の接続から得る形式の閉性を示すには、[GBG11の局所Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)と不変多項式の性質を組み合わせる必要がある。この議論は次講で、接続変更による完全形式の差はさらに次の講で証明する。したがって、今回確かめたのは**形式の構成とゲージ変更に対する不変性**である。
<!-- solution-end -->

---

ここまでで、非可換な局所曲率からも、対称Ad不変多重線形形式を介して基底上の大域的な $2k$ 形式を作れることが分かった。次の **GBG21** では、この大域形式が閉じる理由を、Bianchi恒等式と無限小不変条件から導く。