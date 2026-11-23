# GBG17 Wilson loopは何に関して不変か

[GBG15 のホロノミー](../GBG15/index.md#def-gbg15-holonomy)は閉路を一周して戻ったときの輸送を群元として記録する。しかしファイバーでの基準点を替えると、その群元は[共役で変わる](../GBG15/index.md#thm-gbg15-base-change)。ゲージ理論で閉路から数値を取り出すには、この曖昧さを取り除きたい。

本講では、有限次元表現でホロノミーを行列に移し、そのトレースを取る **Wilson loop** を構成する。ゲージ不変性を証明した後、向きの反転、始点の移動、経路順序、開いた路と曲線の変形について、何が不変で何が変わるかを具体的に計算する。

**共通設定**：$M$ は滑らかな Hausdorff・第二可算な有限次元多様体、$G$ は有限次元 Lie 群とする。主束と接続は次のとおりである。

$$
\pi:P\to M,\qquad\omega.
$$

曲線は区分的 $C^1$ とし、$\gamma_2*\gamma_1$ は先に $\gamma_1$、次に $\gamma_2$ を進む。[平行移動の同変性・合成・逆路](../GBG14/index.md#thm-gbg14-transport-laws)を用いる。$G$ が非可換でもよく、平坦性は断らない限り仮定しない。

## 1. 共役で変わる群元から、変わらない数を作る

閉路 $\gamma:x\to x$ と $p\in P_x$ を選ぶ。[主束接続のホロノミー群](../GBG15/index.md#def-gbg15-holonomy)から、一意の $h_\gamma(p)\in G$ が

$$
\operatorname{PT}_{\gamma}(p)=p\,h_\gamma(p)
$$

で決まる。$p'=pk$ に替えると、輸送の[右同変性](../GBG14/index.md#thm-gbg14-transport-laws)から

$$
\begin{aligned}
\operatorname{PT}_{\gamma}(pk)
 &=\operatorname{PT}_{\gamma}(p)k\\
 &=p\,h_\gamma(p)k
 =(pk)\bigl(k^{-1}h_\gamma(p)k\bigr).
\end{aligned}
$$

よって群元そのものは一般に不変ではない。代わりに、[滑らかな線形表現](../GBG4/index.md#def-gbg4-representation) $\rho:G\to GL(V)$ を選ぶ。ここでは $V$ を有限次元**複素**ベクトル空間とし、$\dim_{\mathbb C}V=N$ とする。表現は群の積を線形同型の合成に保つので、$\rho(k^{-1}hk)=\rho(k)^{-1}\rho(h)\rho(k)$ が成り立つ。$V$ の任意の基底を選ぶと各 $\rho(g)$ は $N\times N$ 複素可逆行列で表示でき、そのトレースは対角成分の和 $\operatorname{tr}B=\sum_{j=1}^N B_{jj}$ である。基底変更でも表示行列は共役になるため、以下で示すトレースの共役不変性により値は基底に依存しない。

<a id="def-gbg17-wilson-loop"></a>

<!-- formal-statement-start -->
> **定義（表現に関する Wilson loop）**  
> 接続付き右主 $G$ 束 $(P,\omega)$、閉路 $\gamma:x\to x$、有限次元複素表現 $\rho:G\to GL(V)$、点 $p\in P_x$ を固定する。**Wilson loop** を複素数

$$
W_\rho(\gamma;\omega)
 :=\operatorname{tr}_V\!\bigl(\rho(h_\gamma(p))\bigr),
\qquad \operatorname{PT}_\gamma(p)=p\,h_\gamma(p)
$$

> で定める。右辺が $p$ に依存しないことは次の定理で示す。規格化したトレース $N^{-1}W_\rho$ も用いられるが、本講では**規格化しないトレース**を採用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg17-wilson-loop -->
**定義の確認**。$G=U(1)$、$V=\mathbb C$、$\rho_q(z)=z^q$（$q\in\mathbb Z$）とする。これは $\rho_q(zw)=(zw)^q=z^qw^q$ を満たす滑らかな1次元表現である。[GBG16 の円周の接続](../GBG16/index.md#prop-gbg16-circle-holonomy) $A=ia\,\eta$ の正向き一周では $h=e^{-2\pi ia}$。したがって1行1列行列のトレースを取れば

$$
W_{\rho_q}(\gamma;\omega)
=\operatorname{tr}_{\mathbb C}(e^{-2\pi iqa})
=e^{-2\pi iqa}.
$$

特に $q=0$ なら全閉路で $W=1$、$q=1,a=\frac12$ なら $W=-1$。**どの表現を選んだか**も数値の一部である。
<!-- definition-example-end -->

<a id="thm-gbg17-gauge-invariance"></a>

<!-- formal-statement-start -->
> **定理（閉 Wilson loop のゲージ不変性）**  
> 上の接続、閉路、有限次元複素表現について、次が成立する。
>
> 1. $p'=pk$（$k\in G$）とファイバーの基準点を替えても $W_\rho$ は変わらない。
> 2. 閉路の像上の局所 section を $s'=s k$ に替えても、閉路輸送行列から計算した $W_\rho$ は変わらない。
> 3. 固定した主束のゲージ自己同型 $\Phi:P\to P$ により接続を $\omega'=\Phi^*\omega$ と変えても、同じ幾何学的閉路の $W_\rho$ は変わらない。
>
> いずれも $\gamma$、$\rho$ は固定する。接続の任意の変更や経路の任意の変形に関する不変性を主張してはいない。
<!-- formal-statement-end -->

**証明の見取り図**。三つの場面に共通するのは「輸送行列が同一の行列による共役を受ける」という事実である。まず $N\times N$ 行列について $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ を成分から確かめ、共役をトレースの中で相殺する。

<!-- proof-start -->
### 証明

任意の $N\times N$ 行列 $B,C$ について、有限和の順番を入れ替えると

$$
\begin{aligned}
\operatorname{tr}(BC)
&=\sum_{i=1}^N(BC)_{ii}
=\sum_{i,j=1}^N B_{ij}C_{ji}\\
&=\sum_{j,i=1}^N C_{ji}B_{ij}
=\operatorname{tr}(CB).
\end{aligned}
$$

従って可逆行列 $K$ に対して $\operatorname{tr}(K^{-1}BK)=\operatorname{tr}(BKK^{-1})=\operatorname{tr}B$ である。

**1.** 前節の輸送計算より $h_\gamma(pk)=k^{-1}h_\gamma(p)k$。表現の準同型性から

$$
\begin{aligned}
\operatorname{tr}\rho(h_\gamma(pk))
&=\operatorname{tr}\bigl(\rho(k)^{-1}\rho(h_\gamma(p))\rho(k)\bigr)\\
&=\operatorname{tr}\rho(h_\gamma(p)).
\end{aligned}
$$

**2.** 閉路上に一つの section があるときは、[局所輸送行列の変換式](../GBG14/index.md#prop-gbg14-local-transport)を始終点が同じ $x$ という条件に適用する。

$$
U'_\gamma=k(x)^{-1}U_\gamma k(x),\qquad
\rho(U'_\gamma)=\rho(k(x))^{-1}\rho(U_\gamma)\rho(k(x)).
$$

よってトレースは一致する。閉路全体で一つの section が取れない場合も、路を有限個の区間に分け、各切れ目のファイバーに一つずつ枠を選んで輸送を行列表示する。第 $j$ 区間の輸送を $U_j$、切れ目 $j$ の枠の変更を $k_j\in G$ と書けば、[区間輸送の両端変換則](../GBG14/index.md#prop-gbg14-local-transport)により

$$
U'_j=k_j^{-1}U_jk_{j-1}.
$$

すべての区間を順に合成すると

$$
\begin{aligned}
U'_m\cdots U'_1
&=(k_m^{-1}U_mk_{m-1})\cdots(k_1^{-1}U_1k_0)\\
&=k_m^{-1}(U_m\cdots U_1)k_0.
\end{aligned}
$$

閉路では最初と最後の**同じファイバーの同じ枠**でホロノミーを表示するので $k_m=k_0$ と選ぶ。したがって全体が $k_0^{-1}(U_m\cdots U_1)k_0$ という共役になり、トレースは一致する。

**3.** ゲージ自己同型 $\Phi$ は射影を保ち、右作用と可換である。

[ゲージ変換の定義](../GBG5/index.md#def-gbg5-gauge-automorphism)に沿って $\Phi(p)=p\,u$（ある $u\in G$）と書く。

$\omega'=\Phi^*\omega$ について、曲線の $\omega'$-水平リフトを $\Phi$ で写すと $\omega$-水平リフトになる。これは $(\Phi^*\omega)(v)=\omega(d\Phi(v))$ の定義と[水平リフトの一意性](../GBG14/index.md#thm-gbg14-horizontal-existence)による。従って

$$
\operatorname{PT}^{\omega'}_\gamma
 =\Phi^{-1}\circ\operatorname{PT}^{\omega}_\gamma\circ\Phi.
$$

右同変性と $\Phi(pg)=\Phi(p)g$ を順に用いると

$$
\begin{aligned}
\Phi\bigl(\operatorname{PT}^{\omega'}_\gamma(p)\bigr)
 &=\operatorname{PT}^\omega_\gamma(pu)
 =p\,h_\gamma^\omega(p)u,\\
\operatorname{PT}^{\omega'}_\gamma(p)
 &=p\,u^{-1}h_\gamma^\omega(p)u.
\end{aligned}
$$

最後の等式は $\Phi(p\,u^{-1}hu)=\Phi(p)u^{-1}hu=p\,hu$ から従う。再びトレースの共役不変性より $W_\rho(\gamma;\omega')=W_\rho(\gamma;\omega)$。
<!-- proof-end -->

**非可換な直接例**。$G=GL(2,\mathbb C)$、$\rho$ を標準表現とし、ある閉路の群元が

$$
H=\begin{pmatrix}2&0\\0&1/2\end{pmatrix},
\qquad
K=\begin{pmatrix}1&1\\0&1\end{pmatrix}
$$

であるとする。$K^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ なので

$$
K^{-1}HK
=\begin{pmatrix}2&3/2\\0&1/2\end{pmatrix}.
$$

$H$ と $K^{-1}HK$ は異なるが、両方ともトレースは $5/2$。従って「群元が不変」ではなく「**トレースが不変**」が正しい。なお $W_\rho$ は接続の**完全な**分類不変量とは限らず、異なる群元が同じトレースを持つこともある。

## 2. 向き・始点・曲線を替えるとどうなるか

[GBG14 の逆路と合成則](../GBG14/index.md#thm-gbg14-transport-laws)によれば、逆向きの路 $\bar\gamma$ のホロノミーは $h_\gamma(p)^{-1}$ になる。したがって向きを反転させた Wilson loop は、群元の**逆元**を表現に通して計算する。

<a id="prop-gbg17-reversal"></a>

<!-- formal-statement-start -->
> **命題（向きを反転した Wilson loop）**  
> 接続付き右主 $G$ 束、閉路 $\gamma$、有限次元複素表現 $\rho$ に対し

$$
W_\rho(\bar\gamma;\omega)
=\operatorname{tr}\bigl(\rho(h_\gamma(p))^{-1}\bigr).
$$

> 特に $\rho$ が選んだ Hermite 内積を保つユニタリ表現なら

$$
W_\rho(\bar\gamma;\omega)
=\overline{W_\rho(\gamma;\omega)}.
$$

> この場合でも値が常に等しいとは限らない。値が等しいのは $W_\rho(\gamma;\omega)$ が実数である場合である。
<!-- formal-statement-end -->

**証明の見取り図**。逆路の輸送は元の輸送の逆である。ユニタリ行列は逆行列が共役転置であり、対角成分の共役和を取ると式が出る。

<!-- proof-start -->
### 証明

$\operatorname{PT}_{\bar\gamma}=\operatorname{PT}_\gamma^{-1}$ を $p$ に適用する。$\operatorname{PT}_\gamma(pg)=p\,h_\gamma(p)g$ なので、逆写像は $p$ を $p\,h_\gamma(p)^{-1}$ に移す。従って $h_{\bar\gamma}(p)=h_\gamma(p)^{-1}$。$\rho(h^{-1})=\rho(h)^{-1}$ から第1式を得る。

ユニタリ表現なら $B=\rho(h)$ は $B^{-1}=B^\dagger=\overline B^{\,T}$ を満たす。ゆえに

$$
\operatorname{tr}(B^{-1})
=\sum_j\overline{B_{jj}}
=\overline{\sum_jB_{jj}}
=\overline{\operatorname{tr}B}.
$$

最後に複素数 $z$ が $\bar z=z$ を満たすのは $z$ が実数の場合に限る。
<!-- proof-end -->

**向きで値が変わる例**。$G=U(1)$、$\rho_1(z)=z$ とし、[円周上の平坦接続によるホロノミー](../GBG16/index.md#prop-gbg16-circle-holonomy)で $a=1/4$ とすれば

$$
W_{\rho_1}(\gamma)=-i,\qquad
W_{\rho_1}(\bar\gamma)=i.
$$

一方 $SU(2)$ の基本表現で $H=\operatorname{diag}(e^{i\theta},e^{-i\theta})$ なら $\operatorname{tr}H=2\cos\theta$ は実数で逆向きでも同じである。これは**その表現での追加の性質**であり、Wilson loop の定義だけからの普遍的な結論ではない。

### 同じ閉曲線の始点を動かす

「閉路そのものを変える」操作と、「同じ閉路上で読み始める位置を替える」操作は違う。後者では行列積が循環するだけで、トレースは同じである。

<a id="prop-gbg17-cyclic-basepoint"></a>

<!-- formal-statement-start -->
> **命題（閉路上の始点の巡回移動）**  
> 区分的 $C^1$ な閉路を二つの部分路 $\alpha:x\to y$、$\beta:y\to x$ に分ける。$\gamma_x=\beta*\alpha$ と $\gamma_y=\alpha*\beta$ は同じ閉路を異なる点から読み始めたものである。任意の接続と有限次元複素表現について

$$
W_\rho(\gamma_x;\omega)=W_\rho(\gamma_y;\omega).
$$

> ここで曲線の形と向きは変えず、切れ目だけを替える。
<!-- formal-statement-end -->

**証明の見取り図**。$\alpha$ による輸送を使い、異なるファイバーの輸送を同じ基準へ移す。積 $U_\beta U_\alpha$ と $U_\alpha U_\beta$ は共役なので、トレースが等しい。

<!-- proof-start -->
### 証明

$p\in P_x$ を選び $q=\operatorname{PT}_\alpha(p)\in P_y$ とする。$\operatorname{PT}_\beta(q)=p\,h$ と書けば、$\gamma_x$ のホロノミーは $h$ である。[輸送の右同変性・合成則](../GBG14/index.md#thm-gbg14-transport-laws)より

$$
\begin{aligned}
\operatorname{PT}_{\gamma_x}(p)
 &=\operatorname{PT}_\beta(\operatorname{PT}_\alpha(p))
 =p\,h,\\
\operatorname{PT}_{\gamma_y}(q)
 &=\operatorname{PT}_\alpha(\operatorname{PT}_\beta(q))
 =\operatorname{PT}_\alpha(p\,h)
 =q\,h.
\end{aligned}
$$

すなわち移送した基準点では $h$ 自身が同じ値になる。$x,y$ で別々の局所 section を選ぶ場合は[開路輸送の端点変換則](../GBG14/index.md#prop-gbg14-local-transport)によりこの対応が共役に変わるだけで、前定理のトレースの不変性から結論を得る。
<!-- proof-end -->

### 曲線の変形は一般にはゲージ変換ではない

曲線を保ったゲージ変換は $W_\rho$ を変えない。しかし曲線を変えると、同じ接続でも異なる曲率を囲むことがある。

<a id="prop-gbg17-flat-homotopy"></a>

<!-- formal-statement-start -->
> **命題（平坦性とホモトピーに関する条件付き不変性）**  
> 接続が平坦であり、同じ基点の閉路 $\gamma_0,\gamma_1$ が固定端点ホモトピーで結ばれるなら、任意の有限次元複素表現 $\rho$ について

$$
W_\rho(\gamma_0;\omega)=W_\rho(\gamma_1;\omega).
$$

> さらに、道連結な基底上の平坦接続では、基点を動かす自由ホモトピーによって対応する二つの閉路についても Wilson loop は一致する。一般の非平坦接続ではこの結論は成り立たない。
<!-- formal-statement-end -->

**証明の見取り図**。平坦接続なら輸送が固定端点ホモトピーで変わらない。基点が動くときは、その移動路を往復して閉路を共役の形へ直し、輸送の共役をトレースで消す。

<!-- proof-start -->
### 証明

[GBG16 の平坦接続のホモトピー不変性](../GBG16/index.md#thm-gbg16-homotopy-transport)から $\operatorname{PT}_{\gamma_0}=\operatorname{PT}_{\gamma_1}$。同じ $p$ に作用させて得る群元も等しいので、表現・トレースを取った値も等しい。

自由ホモトピー $H:[0,1]^2\to M$ の各縦側は基点の移動路 $\sigma$ となる。

基点を固定した比較では、端点で $\sigma$ と逆路を連結した閉路 $\bar\sigma*\gamma_1*\sigma$ が $\gamma_0$ と固定端点ホモトピーになる（進む順は右から左）。

平坦性と[輸送の合成・逆路](../GBG14/index.md#thm-gbg14-transport-laws)により、$\gamma_1$ の輸送を $\sigma$ に沿って基点へ戻したものが $\gamma_0$ の輸送になる。

[GBG15 の基点変更の公式](../GBG15/index.md#thm-gbg15-base-change)を $q=\operatorname{PT}_\sigma(p)$ に適用すれば、両閉路の群元は対応する基準点で一致する。任意の別基準点では共役になるのでトレースが等しい。

非平坦の場合には最初に使った固定端点ホモトピー不変性がなくなる。以下の矩形例ではその違いを直接示す。
<!-- proof-end -->

**非平坦な反例**。$P=\mathbb R^2\times U(1)$ で標準表現と $A=iB x\,dy$（$B\in\mathbb R$）を取る。[曲率の公式](../GBG10/index.md#thm-gbg10-local-formula)から $F=iB\,dx\wedge dy$。正向き長方形 $\gamma_R=\partial([0,r]\times[0,s])$ は平面内で定値路と固定端点ホモトピーだが、$U(1)$ の輸送ODEと辺ごとの積分から

$$
\int_{\gamma_R} A=iBrs,\qquad
W_{\rho_1}(\gamma_R)=e^{-iBrs}.
$$

定値路なら $W_{\rho_1}=1$。例えば $Brs=\pi$ では $-1$ になり、同じホモトピー類でも値は異なる。壊れたのはゲージ不変性ではなく、**曲率非零のときの経路変形不変性**である。

## 3. 開いた Wilson 線と経路順序を区別する

開いた路 $\gamma:x\to y$ の平行移動はもともと **別々のファイバーの間の同型** である。その行列表示にトレースを取っても、両端の基準点を別々に変えられるため、閉路のときの共役にはならない。まず局所的な表示を定義する。

<a id="def-gbg17-open-wilson-line"></a>

<!-- formal-statement-start -->
> **定義（表現付き開 Wilson 線の局所行列）**  
> 接続付き主 $G$ 束、有限次元複素表現 $\rho:G\to GL(V)$ と開路 $\gamma:x\to y$（$x\ne y$）を取る。端点近傍を含む局所 section で[主束の輸送行列](../GBG14/index.md#prop-gbg14-local-transport) $U_\gamma\in G$ を表示し、

$$
L_\rho(\gamma;s):=\rho(U_\gamma)\in GL(V)
$$

> をその section に関する開 Wilson 線の局所行列と呼ぶ。複数の section を使う場合は区間ごとの輸送を積でつなぐ。同じ幾何学的輸送でも、数値行列は両端の枠の選択に依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg17-open-wilson-line -->
**定義の確認**。$[0,1]\times U(1)$ の零接続 $A=0$ と標準表現 $\rho_1(z)=z$ を用い、$\gamma(t)=t$ とする。[局所水平ODE](../GBG14/index.md#prop-gbg14-local-transport)は $\dot U=0$、$U(0)=1$ なので $U(1)=1$。これを**標準表現に移した行列**が定義した開 Wilson 線であり、

$$
L_{\rho_1}(\gamma;s)=\rho_1(U(1))=1
$$

となる。section を $s'(t)=s(t)k(t)$、$k(t)=e^{i\pi t}$ に替えると $k(0)=1$、$k(1)=-1$。両端の枠変更は一つの共役ではなく、[輸送の端点変換則](../GBG14/index.md#prop-gbg14-local-transport)によって

$$
L_{\rho_1}(\gamma;s')
=\rho_1(k(1))^{-1}L_{\rho_1}(\gamma;s)\rho_1(k(0))
=(-1)^{-1}\cdot1\cdot1=-1
$$

となる。どちらも可逆な同一の輸送の表示だが、1次元行列のトレースはそれぞれ $1$ と $-1$ で一致しない。
<!-- definition-example-end -->

<a id="thm-gbg17-open-endpoints"></a>

<!-- formal-statement-start -->
> **定理（開 Wilson 線の両端変換則）**  
> 局所 section を $s'=s k$ に替えたとき、開路 $\gamma:x\to y$ の表現付き輸送行列は

$$
L_\rho(\gamma;s')
=\rho(k(y))^{-1}\,L_\rho(\gamma;s)\,\rho(k(x)).
$$

> この式は閉路 $x=y$ なら共役になるが、開路のトレースは一般に不変でない。始点のベクトル $v_x$ と終点の双対ベクトル $\lambda_y$ を同時に変換する場合には、スカラー $\lambda_y(L_\rho v_x)$ が不変となる。
<!-- formal-statement-end -->

**証明の見取り図**。既習の主束輸送の変換式に表現を作用させる。両端のベクトルを一緒に変えると、左右の因子を吸収できる。

<!-- proof-start -->
### 証明

[GBG14 の端点変換則](../GBG14/index.md#prop-gbg14-local-transport)より $U'_\gamma=k(y)^{-1}U_\gamma k(x)$。表現の準同型性から第1式が出る。$x=y$ なら $\rho(k(y))=\rho(k(x))$ で共役となる。一方、$x\ne y$ なら二つは一般に異なり、トレースの循環性だけでは打ち消せない。

結合束のベクトル成分は[GBG4 の局所成分変換](../GBG4/index.md#thm-gbg4-component-transformation)により $v'_x=\rho(k(x))^{-1}v_x$。双対成分は評価 $\lambda_y(v_y)$ を保つよう $\lambda'_y=\lambda_y\rho(k(y))$ と変換する。この三式を掛けると

$$
\begin{aligned}
\lambda'_y L'_\rho v'_x
&=\lambda_y\rho(k(y))
 \rho(k(y))^{-1}L_\rho\rho(k(x))
 \rho(k(x))^{-1}v_x\\
&=\lambda_y L_\rho v_x.
\end{aligned}
$$

これが開路を不変なスカラーへ結ぶ一つの方法であり、開路行列単独のトレースを不変としたわけではない。
<!-- proof-end -->

### 後から通る区間の輸送が左に来る

局所接続形式 $A$ を曲線 $\gamma(t)$ の速度 $\dot\gamma(t)=d\gamma/dt$ に適用し、得られた Lie 環の元を [GBG9 で定義した表現の無限小作用 $\rho_*$](../GBG9/index.md#def-gbg9-infinitesimal-representation) で行列へ移す。すなわち

$$
a(t):=\rho_*\bigl(A_{\gamma(t)}(\dot\gamma(t))\bigr).
$$

ここで $t$ は曲線のパラメータで、点は $\gamma(t)$、速度は $d\gamma/dt$、$a(t)$ は $V$ 上の線形作用素の行列表示である。主束輸送 $U_G(t)$ に表現を作用させた $U(t)=\rho(U_G(t))$ を $t$ で微分すると、表現の微分の連鎖律により $\dot U=-a(t)U$ となる（[GBG14 の結合束輸送と共変微分](../GBG14/index.md#thm-gbg14-associated-covariant)）。従って[経路順序指数](../GBG14/index.md#prop-gbg14-dyson-series)の微分方程式は

$$
\dot U(t)=-a(t)U(t),\qquad U(0)=I.
$$

二つの区間での輸送を $U_1,U_2$ とすると、全輸送は **$U_2U_1$** となる。三つなら $U_3U_2U_1$。一般に $a(t)$ が可換でない場合、単に $\exp(-\int a)$ と置き換えることはできない。

**順序を入れ替えるとトレースも変わり得る**。$GL(2,\mathbb C)$ で

$$
U_1=\begin{pmatrix}1&1\\0&1\end{pmatrix},\quad
U_2=\begin{pmatrix}1&0\\1&1\end{pmatrix},\quad
U_3=\begin{pmatrix}2&0\\0&1/2\end{pmatrix}
$$

という三つの区間輸送を考える。各行列は可逆で、各区間に適切な滑らかな行列値接続を選べば実現できる。積を計算すると

$$
\begin{aligned}
U_3U_2U_1
 &=\begin{pmatrix}2&2\\1/2&1\end{pmatrix},
 &\operatorname{tr}(U_3U_2U_1)&=3,\\
U_3U_1U_2
 &=\begin{pmatrix}4&2\\1/2&1/2\end{pmatrix},
 &\operatorname{tr}(U_3U_1U_2)&=9/2.
\end{aligned}
$$

これは途中の二区間を**交換**した別の輸送である。前節の「始点を巡回移動する」操作は $U_3U_2U_1\mapsto U_1U_3U_2$ のような**巡回置換**であり、$\operatorname{tr}(ABC)=\operatorname{tr}(BCA)$ によって値が保存される。任意の並べ替えを許すわけではない。

---

## 4. 演習と詳細解答

### Level A：定義、共役、向き、端点

<a id="ex-gbg17-a01"></a>
#### GBG17-A01 共役で群元は変わり、トレースは変わらない
- Level: A

$H=\operatorname{diag}(3,1/3)$、$K=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ とする。$K^{-1}HK$ を求め、標準表現の Wilson loop の値が基準点変更で不変であることを確認せよ。

<!-- solution-start -->
**詳細解答**。$K^{-1}=\begin{pmatrix}1&-2\\0&1\end{pmatrix}$。右から順に掛けて

$$
HK=\begin{pmatrix}3&6\\0&1/3\end{pmatrix},\qquad
K^{-1}HK=\begin{pmatrix}3&16/3\\0&1/3\end{pmatrix}.
$$

[基準点変更式](../GBG15/index.md#thm-gbg15-base-change)に従えばこれが新基準点での群元である。$16/3\ne0$ なので行列は変わった。しかし

$$
\operatorname{tr}H=3+\frac13=\frac{10}{3}
=\operatorname{tr}(K^{-1}HK)
$$

となり、[Wilson loop のゲージ不変性](#thm-gbg17-gauge-invariance)を確認した。
<!-- solution-end -->

<a id="ex-gbg17-a02"></a>
#### GBG17-A02 表現の整数指数と周回方向
- Level: A

$S^1$ 上の $A=ia\,\eta$、$a=1/6$ に対し、$U(1)$ の表現 $\rho_2(z)=z^2$ に関する正向き一周、逆向き一周、および二周の Wilson loop を求めよ。

<!-- solution-start -->
**詳細解答**。[円周上の平坦接続によるホロノミー](../GBG16/index.md#prop-gbg16-circle-holonomy)で周回数を $n$ とすると $h_n=e^{-2\pi i an}$。表現 $\rho_2$ を作用させれば

$$
W_{\rho_2}(n)=h_n^2=e^{-4\pi ian}.
$$

$n=1$ で $e^{-2\pi i/3}$、$n=-1$ で $e^{2\pi i/3}$、$n=2$ で $e^{-4\pi i/3}$ となる。逆向きの値は正向きの複素共役であり、一般に同値ではない。[向き反転命題](#prop-gbg17-reversal)と一致する。
<!-- solution-end -->

<a id="ex-gbg17-a03"></a>
#### GBG17-A03 開路にトレースを取っても不変量にならない
- Level: A

$[0,1]$ 上の積主 $U(1)$ 束で $A=0$、$\rho_1$ を標準表現とする。$\gamma(t)=t$ の輸送行列を求め、$k(t)=e^{i\pi t/2}$ で section を変更したときの行列とそのトレースを比較せよ。

<!-- solution-start -->
**詳細解答**。[GBG14 の局所水平ODE](../GBG14/index.md#prop-gbg14-local-transport)は $\dot U=0$、$U(0)=1$ だから $U=1$。新 section の始点値は $k(0)=1$、終点値は $k(1)=i$。従って[開 Wilson 線の端点変換則](#thm-gbg17-open-endpoints)により

$$
U'=k(1)^{-1}Uk(0)=i^{-1}\cdot1\cdot1=-i.
$$

1次元のトレースはその数自身なので、$1$ と $-i$ は異なる。原因は始点と終点が違い、同一行列による共役とならないことである。
<!-- solution-end -->

<a id="ex-gbg17-a04"></a>
#### GBG17-A04 三つの輸送を積む
- Level: A

三つの区間の輸送行列を $U_1=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$U_2=\begin{pmatrix}1&0\\1&1\end{pmatrix}$、$U_3=2I$ とする。進む順番が $1\to2\to3$ の場合の全輸送と、$3\to1\to2$ の場合の全輸送を求め、トレースを比較せよ。

<!-- solution-start -->
**詳細解答**。[経路順序指数の積順序](../GBG14/index.md#prop-gbg14-dyson-series)により、進む順番が $1\to2\to3$ なら全輸送は $U_3U_2U_1$。まず

$$
U_2U_1=\begin{pmatrix}1&1\\1&2\end{pmatrix}
$$

なので $U_3U_2U_1=\begin{pmatrix}2&2\\2&4\end{pmatrix}$、トレースは $6$。$3\to1\to2$ なら $U_2U_1U_3=2U_2U_1$ なので行列とトレースはいずれも同じである。二つの通過順序は**巡回置換**であり、一般の可逆な $U_3$ についても $U_2U_1U_3=U_3^{-1}(U_3U_2U_1)U_3$ だからトレースは一致する。この例で行列そのものまで一致するのは、追加条件 $U_3=2I$ により $U_3$ が他の因子と可換だからである。巡回置換以外の交換では、一般にトレースさえ保存されない。
<!-- solution-end -->

### Level B：証明、反例、始点・向きの区別

<a id="ex-gbg17-b01"></a>
#### GBG17-B01 二つの輸送の巡回と基点
- Level: B

可逆な $2\times2$ 行列 $A,B$ について、$BA$ と $AB$ が共役であることを直接示せ。$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$B=\begin{pmatrix}2&0\\0&1/2\end{pmatrix}$ を代入して、それぞれの行列とトレースを計算せよ。

<!-- solution-start -->
**詳細解答**。$A$ が可逆だから

$$
A(BA)A^{-1}=(AB)(AA^{-1})=AB.
$$

よって $BA$ と $AB$ は共役で、[トレースの共役不変性](#thm-gbg17-gauge-invariance)からトレースは一致する。具体的に

$$
BA=\begin{pmatrix}2&2\\0&1/2\end{pmatrix},\qquad
AB=\begin{pmatrix}2&1/2\\0&1/2\end{pmatrix}.
$$

二つの行列は異なるが、トレースはともに $5/2$。閉路を二つの部分路に分けて読み始めを変更する[巡回始点命題](#prop-gbg17-cyclic-basepoint)の行列表現である。
<!-- solution-end -->

<a id="ex-gbg17-b02"></a>
#### GBG17-B02 収縮可能な閉路でも値が変わる
- Level: B

$\mathbb R^2\times U(1)$ の接続 $A=3ix\,dy$ と $\rho_1$ を考える。原点を左下隅とする横幅 $r$、縦幅 $s$ の正向き長方形の Wilson loop を四辺の積分から求め、定値路とホモトピー同値であるのに値が異なる具体例を挙げよ。

<!-- solution-start -->
**詳細解答**。下辺は $dy=0$、右辺は $x=r$ かつ $y:0\to s$、上辺は $dy=0$、左辺は $x=0$。従って四辺の積分は順に $0,3irs,0,0$ となる。$U(1)$ は可換なので、[平行移動の局所ODE](../GBG14/index.md#prop-gbg14-local-transport)を各辺に適用して積を取れば

$$
W_{\rho_1}(\partial R)=e^{-3irs}.
$$

[局所曲率公式](../GBG10/index.md#thm-gbg10-local-formula)による曲率は $F=3i\,dx\wedge dy\ne0$。例えば $r=\pi/3,s=1$ なら $W=e^{-i\pi}=-1$、定値路では $W=1$。両閉路は $\mathbb R^2$ 内で固定端点ホモトピーにより結ばれるが、平坦でないので[GBG16 のホモトピー不変定理](../GBG16/index.md#thm-gbg16-homotopy-transport)の仮定を満たさない。
<!-- solution-end -->

<a id="ex-gbg17-b03"></a>
#### GBG17-B03 平坦な接続で自由ホモトピーが使える理由
- Level: B

道連結な基底の平坦な主 $G$ 束で、$x$ の閉路 $\gamma$ と $y$ の閉路 $\delta$ が自由ホモトピーで結ばれるとする。基点移動路 $\sigma:x\to y$ を使い、$W_\rho(\gamma)=W_\rho(\delta)$ を証明せよ。曲率非零のとき証明のどこが使えなくなるか述べよ。

<!-- solution-start -->
**詳細解答**。自由ホモトピーに沿う基点の軌トレースを $\sigma$ とする。$x$ を基点とする閉路 $\bar\sigma*\delta*\sigma$ と $\gamma$ は固定端点ホモトピーにある。[平坦接続の輸送不変性](../GBG16/index.md#thm-gbg16-homotopy-transport)から両輸送が一致する。$p\in P_x$ と $q=\operatorname{PT}_\sigma(p)\in P_y$ を取れば[GBG15 の基点変更](../GBG15/index.md#thm-gbg15-base-change)より

$$
h_{\bar\sigma*\delta*\sigma}(p)=h_\delta(q).
$$

前段の輸送の等号により $h_\gamma(p)=h_\delta(q)$。従って両者へ $\rho$ とトレースを適用すれば等しい。非平坦なら「固定端点ホモトピーで輸送が同じ」という最初の推論ができず、曲率を囲む変形で値が変わり得る（[矩形反例](#prop-gbg17-flat-homotopy)参照）。
<!-- solution-end -->

<a id="ex-gbg17-b04"></a>
#### GBG17-B04 逆路の値が実数とは限らない
- Level: B

有限次元ユニタリ表現 $\rho$ と閉路 $\gamma$ に対し、$W_\rho(\bar\gamma)=\overline{W_\rho(\gamma)}$ を証明せよ。$G=U(1)$ の標準表現で、$W_\rho(\bar\gamma)\ne W_\rho(\gamma)$ となる一例を作り、逆向きでも同じ値となる条件を述べよ。

<!-- solution-start -->
**詳細解答**。[逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)から $h_{\bar\gamma}=h_\gamma^{-1}$。$B=\rho(h_\gamma)$ とすればユニタリ性 $B^{-1}=B^\dagger$ により

$$
W_\rho(\bar\gamma)
=\operatorname{tr}(B^{-1})
=\sum_j\overline{B_{jj}}
=\overline{\operatorname{tr}(B)}
=\overline{W_\rho(\gamma)}.
$$

$S^1$ の接続 $A=\frac i4\eta$ で[円周上の平坦接続によるホロノミー](../GBG16/index.md#prop-gbg16-circle-holonomy)を用いれば正向きは $-i$、逆向きは $i$ なので異なる。等しくなる必要十分条件は $\overline{W_\rho(\gamma)}=W_\rho(\gamma)$、すなわち $W_\rho(\gamma)\in\mathbb R$ である。
<!-- solution-end -->

### Level C：ゲージ・向き・曲率を同時に扱う

<a id="ex-gbg17-c01"></a>
#### GBG17-C01 円筒上の閉路と開路を統合する
- Level: C

$M=S^1\times\mathbb R$ の角度を $\theta$、実数座標を $t$ とする。積主 $U(1)$ 束の標準 section で

$$
A=i(a+bt)\,d\theta,\qquad a,b\in\mathbb R
$$

とする。$\eta=d\theta$ は各局所角度での表示で、$S^1$ 上では大域1形式とする。$\rho_q(z)=z^q$（$q\in\mathbb Z$）を選ぶ。

1. 曲率を計算し、平坦性を判定せよ。
2. $t=t_0$ を保ち正向き一周する閉路 $\gamma_{t_0}$ の Wilson loop を求めよ。逆向きとの関係も示せ。
3. 大域ゲージ関数 $k_n(e^{i\theta},t)=e^{in\theta}$（$n\in\mathbb Z$）による接続の変換と Wilson loop の不変性を検算せよ。
4. $t=t_0$ で $\theta=0$ から $\theta=\pi$ へ進む開路の局所輸送行列と、同じ $k_n$ で変更したときの両端変換を求めよ。
5. $b\ne0$ のとき、異なる $t_0$ の一周閉路は自由ホモトピーで結ばれるのに Wilson loop が変わり得ることを説明せよ。

<!-- solution-start -->
**詳細解答**。

**1.** $U(1)$ は可換で $A\wedge A=0$。$\eta=d\theta$ は閉形式だから $d\eta=0$。従って[曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula)より

$$
F=dA=i\,d(a+bt)\wedge\eta
=ib\,dt\wedge d\theta.
$$

$b=0$ のときかつそのときに限り平坦である。

**2.** $t=t_0$ の閉路に制限すると、係数 $a+bt_0$ は一定である。全体の接続は $b\ne0$ なら非平坦だが、この円周に沿った輸送は [GBG14 の局所水平ODE](../GBG14/index.md#prop-gbg14-local-transport) で直接計算できる。角度 $\theta$ を $0$ から $2\pi$ まで動かすと

$$
\frac{dU}{d\theta}=-i(a+bt_0)U,\qquad U(0)=1,
$$

なので、$U(\theta)=e^{-i(a+bt_0)\theta}$、一周のホロノミーは $h=U(2\pi)=e^{-2\pi i(a+bt_0)}$ となる。この計算には**基底全体の平坦性を仮定しない**。よって

$$
W_{\rho_q}(\gamma_{t_0})
=e^{-2\pi iq(a+bt_0)},\qquad
W_{\rho_q}(\bar\gamma_{t_0})
=e^{2\pi iq(a+bt_0)}
=\overline{W_{\rho_q}(\gamma_{t_0})}.
$$

**3.** $k_n$ は $n\in\mathbb Z$ のため $\theta$ を $2\pi$ 変えても一価で滑らか。[局所ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)により

$$
A'=A+k_n^{-1}dk_n
=i(a+bt+n)\,d\theta.
$$

新しい閉路輸送は $h'=e^{-2\pi i(a+bt_0+n)}=h$ である。従って $\rho_q(h')=\rho_q(h)$。ここでは可換群なので群元も変わらないが、一般群では[Wilson loop の不変性定理](#thm-gbg17-gauge-invariance)が保証するのはトレースである。

**4.** 局所角度区間 $[0,\pi]$ では一定係数なので[水平ODE](../GBG14/index.md#prop-gbg14-local-transport)から

$$
L_{\rho_q}(\gamma)
=e^{-iq\pi(a+bt_0)}.
$$

端点で $\rho_q(k_n(0,t_0))=1$、$\rho_q(k_n(\pi,t_0))=e^{iqn\pi}$ だから、[開路の両端変換則](#thm-gbg17-open-endpoints)により

$$
L'_{\rho_q}(\gamma)
=e^{-iqn\pi}e^{-iq\pi(a+bt_0)}
=e^{-iq\pi(a+bt_0+n)}.
$$

これは変換後の $A'$ を直接積分した値と一致する。$qn$ が奇数なら行列は符号が反転するので、開路のトレースは一般に不変でない。

**5.** $t=t_0$ の円周を $t=t_1$ まで連続的に移す自由ホモトピーが存在する。一方、2で得た二値の比は

$$
\frac{W_{\rho_q}(\gamma_{t_1})}{W_{\rho_q}(\gamma_{t_0})}
=e^{-2\pi iqb(t_1-t_0)}.
$$

例えば $q=1,b=1,t_1-t_0=1/2$ なら比は $-1$。曲率 $F=i\,dt\wedge d\theta\ne0$ であり、[平坦な場合のホモトピー不変性](#prop-gbg17-flat-homotopy)の仮定が破れていることが値の差の原因である。
<!-- solution-end -->

---

## 5. 次講へ

Wilson loop は固定した閉路・表現・接続についてゲージを替えても変わらず、平坦接続ではホモトピー類に基づく情報を記録する。一方、非平坦な接続では閉路が囲む曲率にも反応する。次の **GBG18** では、そもそも一つの大域 section が選べない $U(1)$ 主束を球面上で貼り合わせ、遷移関数の巻き数によって非自明性を読み取る。
