# GBG29 なぜ任意の多様体にspin構造があるとは限らないか

[主束の貼り合わせ](../GBG1/index.md#thm-gbg1-gluing)では、三枚の重なりで積が整合すれば大域的な束を作れた。今回は接空間の回転を、スピノルに作用する群の元へ持ち上げたい。[三次元の二重被覆](../../../代数系/LREP/LREP5/index.md#thm-lrep5-double-cover)では一つの回転に二つの持ち上げがある。各重なりでどちらかを選べても、三枚を一周すると符号が反転するかもしれない。この符号を全て消せるかどうかが本講の問いである。

以下、$M$ は Hausdorff・第二可算で境界のない滑らかな $n$ 次元多様体、$n\ge2$ とし、向きと正定値の [Riemann 計量](../../GEO/GEO12/index.md#def-geo12-riemannian-metric) $g$ を固定する。Lorentz 計量の枠束とは区別する。群作用は右作用で、遷移関数の規約を $s_j=s_i g_{ij}$ とする。

<!-- definition-example-audit: strict -->

## 1. 回転を持ち上げる対象は何か

[接束の枠束](../GBG2/index.md#def-gbg2-frame-bundle)の各点には順序付き基底が載っていた。計量と [向き](../../GEO/GEO8/index.md#def-geo8-vector-space-orientation) を固定すると、その中から長さ1・互いに直交し・正の向きを持つ基底だけを選べる。この制限により変換行列は [特殊直交群](../../../代数系/LIE/LIE3/index.md#def-lie3-orthogonal-groups) $SO(n)$ に入る。

<a id="def-gbg29-oriented-frame"></a>

<!-- formal-statement-start -->
> **定義（向き付き直交枠束）**  
> 向き付き $n$ 次元 Riemann 多様体 $(M,g)$ 上で、点 $x$ の枠を線形同型 $u:\mathbb R^n\to T_xM$ として表す。標準基底を $e_a$ とする。正の向きを保ち、

$$
g_x(u(e_a),u(e_b))=\delta_{ab}
$$

> を満たす枠全体を $F_{SO}(M,g)$ とし、射影を $u\mapsto x$、右作用を $uR=u\circ R$ とする。ここで $R\in SO(n)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg29-oriented-frame -->
**定義の確認**。標準計量と向きの $\mathbb R^2$ で、$u(e_1)=(0,1)$、$u(e_2)=(-1,0)$ と置く。内積行列は $I_2$ で、列を並べた行列の行列式は $0\cdot0-(-1)\cdot1=1$ だから向きも正である。右から回転行列を掛けると枠は再びこの二条件を満たし、基底点は変化しない。
<!-- definition-example-end -->

任意の二つの正向き直交枠 $u,v$ に対し $R=u^{-1}v$ が一意に存在する。等長性より $R^{\mathsf T}R=I_n$、向きより $\det R=1$ である。局所座標の正向き基底 $v_1,\ldots,v_n$ に [Gram–Schmidt の直交化](../../../基礎科目/LA/LA5/index.md#thm-la5-complex-gram-schmidt) の実内積の場合を適用する。すなわち

$$
w_a=v_a-\sum_{b<a}g(v_a,u_b)u_b,
\qquad u_a=\frac{w_a}{\sqrt{g(w_a,w_a)}}.
$$

各 $w_a$ は元の基底の独立性から非零。正の長さで割るので滑らかで、新旧の基底を結ぶ係数行列は正の対角成分を持つ三角行列となり、向きも変わらない。

この局所枠を、各点で正向き直交枠を滑らかに選ぶ [主束の局所切断](../GBG3/index.md#def-gbg3-local-section) $s_i$ とする。各点の枠を $s_i(x)R$ と一意に表す局所自明化が滑らかである（$R$ の成分は $g_x(s_i(e_a),u(e_b))$）。従って [滑らかな主束の条件](../GBG2/index.md#def-gbg2-principal-bundle)を全て満たす。

### 群の側から持ってくる道具

この講で用いる群の入力は、全射 Lie 群準同型

$$
\rho:\operatorname{Spin}(n)\longrightarrow SO(n),
\qquad \ker\rho=\{1,-1\}
$$

が滑らかな二重被覆であるという標準的事実である。二重被覆とは、値域の各点にその近傍があり、逆像が二枚の互いに交わらない開集合に分かれ、各枚からその近傍へ微分同相になることをいう。核は中心に入る。実際、任意の $h$ に対して $h(-1)h^{-1}$ は核の非単位元であるから $-1$ に等しい。

平面回転の記号を

$$
R(\theta)=\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}
$$

とする。$n=2$ では円周群を用い、$\rho(e^{it})=R(2t)$ と書ける。$n=3$ では [SU(2)からSO(3)への二重被覆](../../../代数系/LREP/LREP5/index.md#thm-lrep5-double-cover)がその模型である。

一般次元での群の構成は Clifford 代数の理論に属する。本講はその構成を前提として、束の持ち上げを証明する。もう一つ、後の具体例で用いる標準的な群の性質は、座標二平面内の角 $\theta$ の回転が $1$ から始まる持ち上げでは $\theta=2\pi$ で $-1$ に達すること。

Clifford 代数の規約 $e_a^2=-1$、$e_ae_b=-e_be_a$（$a\ne b$）では、この持ち上げは

$$
q_{ab}(\theta)=\cos(\theta/2)+e_ae_b\sin(\theta/2)
$$

である。$J=e_ae_b$ と書くと $J^2=-1$、$Je_a=e_b$、$e_aJ=-e_b$、$Je_b=-e_a$、$e_bJ=e_a$。$C=\cos(\theta/2)$、$S=\sin(\theta/2)$ として逆元は $C-SJ$ であり、

$$
\begin{aligned}
(C+SJ)e_a(C-SJ)
&=(C^2-S^2)e_a+2CS e_b,\\
(C+SJ)e_b(C-SJ)
&=(C^2-S^2)e_b-2CS e_a.
\end{aligned}
$$

これは $e_a,e_b$ 平面の角 $\theta$ の回転である。その他の $e_k$ は $J$ と可換なので固定される。よって $q_{ab}(2\pi)=-1$ になる。これは回転の持ち上げの符号を計算する式であり、一般の Spin 群の構成そのものの証明ではない。

持ち上げとは、写像 $f:U\to SO(n)$ に対し $\rho\circ\widetilde f=f$ となる $\widetilde f:U\to\operatorname{Spin}(n)$ を作ることを指す。二重被覆の局所逆を使うと、曲線を小区間に分けて開始値から順に持ち上げられ、接続点の値を固定すると各区間の枚は一意に決まる。曲線の連続変形も、パラメータ正方形を各小長方形の像が一つの被覆近傍に入るよう有限分割して同じ局所逆で持ち上げられる。共有辺では開始値の一致から一致する。特に固定端点間の変形では持ち上げの終点は二点の集合内で連続に動くため一定である。従って可縮な開集合（恒等写像を一点への定値写像へ連続変形できる開集合）からの写像は、開始点の値を一つ決めれば曲線に沿って矛盾なく持ち上がる。元の写像が滑らかなら局所逆によって持ち上げも滑らかである。

## 2. スピン構造の条件

枠束そのものを変えるのではなく、その上に各枠を二通りに表す新しい主束を載せる。二つの右作用が被覆写像を通じて対応する必要がある。

<a id="def-gbg29-spin-structure"></a>

<!-- formal-statement-start -->
> **定義（スピン構造）**  
> 向き付き $n$ 次元 Riemann 多様体 $(M,g)$、$n\ge2$ と二重被覆 $\rho:\operatorname{Spin}(n)\to SO(n)$ を取る。スピン構造は、主 $\operatorname{Spin}(n)$ 束 $\pi:Q\to M$ と滑らかな写像 $\lambda:Q\to F_{SO}(M,g)$ の組である。枠束の射影を $\pi_F$ として

$$
\pi_F\circ\lambda=\pi,\qquad
\lambda(qh)=\lambda(q)\rho(h)
$$

> を満たすことを要求する。二つの組は、基底上の主束同型 $\Phi:Q\to Q'$ が存在し $\lambda'\circ\Phi=\lambda$ となるとき同値とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg29-spin-structure -->
**定義の確認**。$M=\mathbb R^n$ の標準枠 $s(x)$ を用いて $Q=M\times\operatorname{Spin}(n)$ とし、$\lambda(x,h)=s(x)\rho(h)$ と置く。積主束なので射影・右作用・局所自明化を持ち、各ファイバーの作用は自由・推移的である。写像 $\lambda$ は滑らかで、$\pi_F(\lambda(x,h))=x$。また $k\in\operatorname{Spin}(n)$ に対して

$$
\lambda(x,hk)=s(x)\rho(h)\rho(k)=\lambda(x,h)\rho(k)
$$

となる。二つの元 $h,-h$ は同じ枠へ写る。これが積によるスピン構造である。
<!-- definition-example-end -->

一般の $Q$ でも、局所切断 $t_i$ を取れば $\lambda(t_i(x)h)=\lambda(t_i(x))\rho(h)$ なので、局所積の表示で $\lambda$ は $(x,h)\mapsto(x,\rho(h))$ となる。よって定義から $\lambda$ 自身が二重被覆になる。枠束の任意の局所切断を持ち上げたいときには、前節の局所逆を使える。

## 3. 三枚の符号を足し算で扱う

$+1,-1$ の積を扱うとき、$(-1)^a$ と書けば指数 $a$ は $0,1$ の足し算になる。以下 $A=\mathbb Z/2$ と書き、全ての指数の和を2で割った余りで取る。例えば $1+1=0$ であり、差も和と同じである。

[開被覆](../GBG1/index.md#def-gbg1-open-cover) $\mathcal U=(U_i)$ を取り、$U_{i_0\cdots i_p}$ を共通部分とする。必要なら被覆を細かくする。以下では良い被覆、すなわち空でない有限個の共通部分が可縮となる被覆を使う。

[凸正規近傍の局所存在定理](../../GEO/GEO14/index.md#thm-geo14-convex-normal-existence) の証明では、座標球を十分小さく取り、二点間の一意な [最短測地線](../../GEO/GEO15/index.md#def-geo15-minimizing-geodesic) がその内部にあり端点に滑らかに依存するように構成した。この球を指定された開集合の内側に取れば、任意の開被覆をこの種の近傍で細分できる。

共通部分内の二点を結ぶ最短測地線は各球で同じ一意な曲線なので共通部分に含まれる。共通部分の一点を固定し、各点からそこへ測地線で連続に縮めれば共通部分は可縮である。こうして良い被覆が得られる。

二重被覆の二つの枚の差は離散的なので、各重なりで連続な符号は局所定数になる。これを2元係数の Čech コホモロジーの言葉で記録する。Čech（チェッホ）の方式では、開集合の重なりの次数ごとに局所定数を置き、さらに一枚多い重なり上で和を取る。

<a id="def-gbg29-cech"></a>

<!-- formal-statement-start -->
> **定義（2元係数のČechコホモロジー）**  
> 位相空間 $M$ の開被覆 $\mathcal U$ と係数群 $A=\mathbb Z/2$ に対し、非負整数 $p$ に対して $C^p(\mathcal U;A)$ を各 $(p+1)$ 重共通部分上の局所定数写像 $c_{i_0\cdots i_p}$ の族の加法群とする。各族を $p$-cochain と呼ぶ。添字は順序付け、別順序へは対称に延長し、同じ添字がある成分は零とする。写像 $\delta:C^p\to C^{p+1}$ を

$$
(\delta c)_{i_0\cdots i_{p+1}}
=\sum_{m=0}^{p+1}c_{i_0\cdots\widehat{i_m}\cdots i_{p+1}}
\big|_{U_{i_0\cdots i_{p+1}}}
$$

> と定める（帽子は添字を除くことを表す）。$\delta c=0$ の族を cocycle、$c=\delta b$ の族を coboundary とする。本講で必要な $p=1,2$ に対し

$$
\check H^p(\mathcal U;A)=
\ker(\delta:C^p\to C^{p+1})/
\operatorname{im}(\delta:C^{p-1}\to C^p)
$$

> とし、被覆の細分による制限写像のもとで同一視した極限を $\check H^p(M;A)$ とする。
<!-- formal-statement-end -->

二度 $\delta$ を施すと二つの添字を除く各項が二回出現するので $\delta^2=0$。従って分母は分子に含まれ、商群を取れる。具体的には

$$
(\delta a)_{ij}=a_j+a_i,\qquad
(\delta b)_{ijk}=b_{jk}+b_{ik}+b_{ij}.
$$

<!-- definition-example-start: def-gbg29-cech -->
**定義の確認**。$M=\mathbb R$ の被覆 $U_0=(-\infty,2)$、$U_1=(-1,3)$、$U_2=(0,\infty)$ を取る。三重共通部分は $(0,2)$ である。$b_{01}=1,b_{02}=0,b_{12}=0$ はいずれも局所定数。$c_{012}=1$ と置くと $\delta b=c$ になる。四つの異なる添字がないので $\delta c=0$ であり、$c$ は値として非零でも $[c]=0$ である。商群の零元は「全成分が零」とは限らないことが分かる。
<!-- definition-example-end -->

### 被覆を変えるときの同一視

[開被覆の細分](../../GEO/GEO4/index.md#def-geo4-refinement) $\mathcal V=(V_\alpha)$ では各 $V_\alpha\subset U_{r(\alpha)}$ を選び、$r^*c$ を対応する添字成分の制限で作る。$\delta r^*=r^*\delta$ なので cocycle と coboundary を保つ。極限とは、二つの類が共通の細分で同じ類になれば同一とすることである。特に類が零になるとは、ある細分で coboundary になることである。

親添字の選び方 $r,s$ の違いを確かめておく。以降の式では $r_\alpha=r(\alpha)$、$s_\alpha=s(\alpha)$ と省略し、全ての項を該当する共通部分に制限する。次数1の Čech cocycle $a$ なら $\delta a=0$ を二つの三角形に適用すると

$$
a_{r_\alpha r_\beta}+a_{s_\alpha s_\beta}
=a_{r_\alpha s_\alpha}+a_{r_\beta s_\beta}.
$$

従って $r^*a+s^*a=\delta d$、$d_\alpha=a_{r_\alpha s_\alpha}$ である。2-cocycle $c$ なら $\alpha<\beta$ に対し

$$
D_{\alpha\beta}
=c_{r_\alpha s_\alpha s_\beta}
+c_{r_\alpha r_\beta s_\beta}
$$

と置く。四重共通部分での $\delta c=0$ を、添字組

$$
\begin{gathered}
(r_\alpha,s_\alpha,s_\beta,s_\gamma),\\
(r_\alpha,r_\beta,s_\beta,s_\gamma),\\
(r_\alpha,r_\beta,r_\gamma,s_\gamma)
\end{gathered}
$$

に適用して三式を足す。内部の二つの三角形の項は二回現れて消え、残る六つの側面項は $D_{\beta\gamma}+D_{\alpha\gamma}+D_{\alpha\beta}$、残りの上下二面は $c_{r_\alpha r_\beta r_\gamma}+c_{s_\alpha s_\beta s_\gamma}$ になる。従って $r^*c+s^*c=\delta D$。このように必要な次数1,2では細分の親添字の選択によらない。以下、この2元係数の群を簡潔に $H^p(M;A)$ と書く。

## 4. 三重重なりの失敗から第二Stiefel–Whitney類を作る

枠束の局所切断 $s_i$ を良い被覆に沿って選ぶ。[遷移関数の整合条件](../GBG1/index.md#def-gbg次数1の Čech cocycle) は

$$
s_j=s_i g_{ij},\qquad
g_{ij}g_{jk}=g_{ik}
$$

である。各二重共通部分は可縮なので、$g_{ij}$ を滑らかな $\widetilde g_{ij}$ に持ち上げられる。$i<j$ で選び、逆順は $\widetilde g_{ji}=\widetilde g_{ij}^{-1}$、$\widetilde g_{ii}=1$ とする。

三枚を比較すると射影先は単位元になるが、持ち上げ先では負符号が残り得る。

<a id="thm-gbg29-sign-cocycle"></a>

<!-- formal-statement-start -->
> **定理（三重重なりの符号は2-cocycleになる）**  
> 向き付き Riemann 多様体の向き付き直交枠束の遷移関数 $g_{ij}$ を、空でない有限重共通部分が可縮な被覆で選ぶ。二重被覆への滑らかな局所持ち上げを $\widetilde g_{ij}$ とし、逆順は逆元、同じ添字では単位元とする。三重共通部分上で

$$
\widetilde g_{ij}\widetilde g_{jk}
=(-1)^{c_{ijk}}\widetilde g_{ik}
$$

> と定まる $c_{ijk}\in A$ は局所定数で $\delta c=0$ を満たす。別の持ち上げ $\widetilde g'_{ij}=(-1)^{b_{ij}}\widetilde g_{ij}$ を選ぶと

$$
c'=c+\delta b
$$

> となる。
<!-- formal-statement-end -->

**証明の見取り図**。四枚の重なりで三つの群元の積を左右から計算する。核の符号は中心にあるので、括弧の位置だけが違う二式から符号の和が一致する。

<!-- proof-start -->
### 証明

$\rho(\widetilde g_{ij}\widetilde g_{jk}\widetilde g_{ik}^{-1})=g_{ij}g_{jk}g_{ik}^{-1}=1$ だから、この積は $\{1,-1\}$ に入る。滑らかな写像の値が離散集合にあるので符号は局所定数。添字を交換した場合も確認する。$\widetilde g_{ij}\widetilde g_{jk}=(-1)^{c_{ijk}}\widetilde g_{ik}$ の左から $\widetilde g_{ji}$ を掛けると

$$
\widetilde g_{ji}\widetilde g_{ik}
=(-1)^{c_{ijk}}\widetilde g_{jk}.
$$

また元の式の右から $\widetilde g_{kj}$ を掛けると

$$
\widetilde g_{ik}\widetilde g_{kj}
=(-1)^{c_{ijk}}\widetilde g_{ij}.
$$

隣り合う二添字の交換で符号が保たれるため任意の並べ替えでも保たれる。繰り返し添字では正規化条件から符号は零である。

四重共通部分で結合法則を二通りに使うと

$$
\begin{aligned}
(\widetilde g_{ij}\widetilde g_{jk})\widetilde g_{kl}
&=(-1)^{c_{ijk}+c_{ikl}}\widetilde g_{il},\\
\widetilde g_{ij}(\widetilde g_{jk}\widetilde g_{kl})
&=(-1)^{c_{jkl}+c_{ijl}}\widetilde g_{il}.
\end{aligned}
$$

右から $\widetilde g_{il}^{-1}$ を掛けると $c_{ijk}+c_{ikl}=c_{jkl}+c_{ijl}$ であり、全項を足すと $(\delta c)_{ijkl}=0$。

二つの持ち上げの比は核に入るから $b_{ij}$ が一意に定まる。中心性を使って

$$
\begin{aligned}
\widetilde g'_{ij}\widetilde g'_{jk}
&=(-1)^{b_{ij}+b_{jk}+c_{ijk}}\widetilde g_{ik}\\
&=(-1)^{b_{ij}+b_{jk}+c_{ijk}+b_{ik}}
\widetilde g'_{ik}
\end{aligned}
$$

と書けるので $c'=c+\delta b$ である。
<!-- proof-end -->

枠自体を変更しても類が変わらないことを確認する。[局所section変更による遷移関数の変換則](../GBG3/index.md#thm-gbg3-transition-change) により、$s'_i=s_i h_i$ なら $g'_{ij}=h_i^{-1}g_{ij}h_j$。良い被覆の各 $U_i$ で $h_i$ を $\widetilde h_i$ に持ち上げ、

$$
\widetilde g'_{ij}=\widetilde h_i^{-1}
\widetilde g_{ij}\widetilde h_j
$$

を選ぶ。この積の三重重なりでは中間の $\widetilde h_j\widetilde h_j^{-1}$ が消え、残る符号は中心性により $(-1)^{c_{ijk}}$ のままである。[三重重なりの符号は2-cocycleになる](#thm-gbg29-sign-cocycle) の符号変更式を適用すれば、持ち上げを選び直しても類は同じである。異なる被覆は共通の良い細分を取り、制限後にこの枠変更の議論を適用する。よって類は枠・持ち上げ・被覆の選択に依存しない。

<a id="def-gbg29-w2"></a>

<!-- formal-statement-start -->
> **定義（第二Stiefel–Whitney類）**  
> 向き付き Riemann 多様体 $(M,g)$ の向き付き直交枠束に対し、三重共通部分の符号 $c$ から得られる類を

$$
w_2(TM)=[c]\in H^2(M;\mathbb Z/2)
$$

> とする。これは向き付き実接束の第二Stiefel–Whitney類の、Spin 被覆による記述である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg29-w2 -->
**定義の確認**。標準枠を持つ $\mathbb R^n$ を、3節の三つの開区間と $\mathbb R^{n-1}$ の直積で覆い、三枚に同じ枠を制限すると $g_{ij}=I$。全ての持ち上げを $1$ とすれば $c=0$ なので $w_2=0$。ただし一つの重なりの持ち上げだけ $-1$ に変えると三重共通部分で $c_{012}=1$ となる。この符号は $b_{01}=1$ による coboundary であり、類は変わらない。
<!-- definition-example-end -->

## 5. 存在条件は必要でも十分でもある

符号が全て零なら、持ち上げた群元はそのまま貼り合わせに使える。符号が非零でも類が零なら、二枚ごとの符号を変更して全三枚の不一致を解消できる。ここで初めて「局所的に持ち上がる」と「大域的にスピン構造がある」の間がつながる。

<a id="thm-gbg29-obstruction"></a>

<!-- formal-statement-start -->
> **定理（スピン構造の存在障害）**  
> 向き付き、Hausdorff・第二可算の境界なし滑らかな Riemann 多様体 $(M,g)$、$\dim M=n\ge2$ にスピン構造が存在するための必要十分条件は

$$
w_2(TM)=0\quad\text{in }H^2(M;\mathbb Z/2)
$$

> である。
<!-- formal-statement-end -->

**証明の見取り図**。存在すれば主束 $Q$ の遷移関数は既に整合する。逆に類が零なら適切な細分で符号を修正でき、修正済みの遷移関数で $Q$ を作る。

<!-- proof-start -->
### 証明

必要性。スピン構造 $(Q,\lambda)$ があるとする。良い被覆上で $s_i$ を選び、二重被覆 $\lambda$ のもとで $s_i$ を $t_i:U_i\to Q$ に持ち上げる。主束の局所表示から $t_j=t_i k_{ij}$ となる一意な滑らかな $k_{ij}$ が存在する。$\lambda(t_j)=s_j=s_i\rho(k_{ij})$ なので $\rho(k_{ij})=g_{ij}$。三重共通部分で

$$
t_k=t_jk_{jk}=t_i k_{ij}k_{jk}=t_i k_{ik}.
$$

右作用が自由だから $k_{ij}k_{jk}=k_{ik}$。従ってこの選択では $c=0$ である。

十分性。$[c]=0$ なら、[2元係数のČechコホモロジー](#def-gbg29-cech) の零元の定義を適用すると、ある細分で $c=\delta b$ となる。以下添字を細分後のものに取り直す。$\widehat g_{ij}=(-1)^{b_{ij}}\widetilde g_{ij}$ と置くと

$$
\begin{aligned}
\widehat g_{ij}\widehat g_{jk}
&=(-1)^{b_{ij}+b_{jk}+c_{ijk}}\widetilde g_{ik}\\
&=(-1)^{b_{ik}}\widetilde g_{ik}=\widehat g_{ik}.
\end{aligned}
$$

また $\widehat g_{ji}=\widehat g_{ij}^{-1}$、$\widehat g_{ii}=1$。従って [滑らかなcocycleからの貼り合わせ](../GBG1/index.md#thm-gbg1-gluing) により局所積 $U_i\times\operatorname{Spin}(n)$ を

$$
(i,x,h)\sim(j,x,\widehat g_{ij}^{-1}h)
$$

で貼り合わせ、滑らかな主束 $Q$ を得る。写像を $\lambda([i,x,h])=s_i(x)\rho(h)$ とする。代表元を替えると

$$
\begin{aligned}
s_j(x)\rho(\widehat g_{ij}^{-1}h)
&=s_i(x)g_{ij}g_{ij}^{-1}\rho(h)\\
&=s_i(x)\rho(h)
\end{aligned}
$$

なので値は代表元に依存しない。局所積表示で滑らかであり、射影を保つ。さらに $\lambda([i,x,h]k)=s_i(x)\rho(h)\rho(k)=\lambda([i,x,h])\rho(k)$ なので [スピン構造の全条件](#def-gbg29-spin-structure) が成立する。
<!-- proof-end -->

この障害は向きが付いた後にも残る。向きのない多様体では正向き直交枠束を全体に取る段階で失敗する。向きがあっても、次の例のように回転を一周持ち上げたときの符号が消せない場合がある。

### 具体例：複素射影平面にはスピン構造がない

$\mathbb{CP}^2$ は $\mathbb C^3$ の零でないベクトルを非零複素数倍で同一視した空間で、点を $[Z_0:Z_1:Z_2]$ と書く。各 $Z_i\ne0$ の領域では残り二成分を $Z_i$ で割った複素座標を持つ。座標変換は滑らかな複素微分可能写像で逆も存在するので実4次元の向き付きアトラスを持つ（複素可逆行列の実行列式は複素行列式の絶対値の二乗で正）。位相は単位球面 $S^5$ の円周作用による商であり、$[Z]\mapsto ZZ^\dagger/(Z^\dagger Z)$ がコンパクトな商を行列空間に連続単射で写すため Hausdorff、第二可算である。

部分空間 $L=\{Z_2=0\}\simeq\mathbb{CP}^1$ 上に接束 $T\mathbb{CP}^2$ を制限する（$TL$ だけではなく実階数4の束である点が重要）。$Z_0\ne0$ で $(z,w)=(Z_1/Z_0,Z_2/Z_0)$、$Z_1\ne0$ で $(\zeta,\eta)=(1/z,w/z)$ と置く。$w=0$ での複素微分は

$$
\begin{pmatrix}d\zeta\\d\eta\end{pmatrix}
=\begin{pmatrix}-z^{-2}&0\\0&z^{-1}\end{pmatrix}
\begin{pmatrix}dz\\dw\end{pmatrix}.
$$

この二本の複素方向は $L$ 上で別々に貼り合わされる。計量には各座標での標準 Hermitian 内積の実部を [1 の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity) で足したものを使える。$L$ は第三座標のパッチに交わらず、上の微分が対角なので二方向は $L$ 上で直交する。各複素座標枠をそれぞれ正の長さで割れば正向き直交枠となる。

赤道 $|z|=1$ を $z=e^{i\theta}$ と書く。二つの座標の枠の変換はこの微分の逆であり、正規化後の回転行列は二つの直交二平面において

$$
g_{01}(\theta)=
\operatorname{diag}(R(\pi+2\theta),R(\theta)).
$$

正の正規化因子は偏角に影響しない。ここで $R(\alpha)$ は角 $\alpha$ の平面回転である。持ち上げの一つを

$$
q_{12}(\pi+2\theta)\,q_{34}(\theta)
$$

と取ると、$\theta=2\pi$ では第一因子が開始値へ戻り、第二因子は $-1$ 倍になる。よって全体は開始値の $-1$ 倍で終わり、円周上の写像として閉じない。もう一つの持ち上げは全体を $-1$ 倍するだけなので同じ失敗をする。

もし $\mathbb{CP}^2$ にスピン構造があれば、$L$ 上の二つの座標パッチ（いずれも複素平面で可縮）でその枠を持ち上げられる。両者の遷移関数は重なりにある赤道上で上の $g_{01}$ の閉じた持ち上げを与えるはずである。これは矛盾である。従って [存在障害定理](#thm-gbg29-obstruction) により $w_2(T\mathbb{CP}^2)\ne0$。正の向きだけでは足りないことが具体的に分かる。

### 計量の変更とスピン構造

計量の選び方でこの結論が変わるわけでもない。二つの正定値計量 $g,g'$ に対して $g'(v,w)=g(Bv,w)$ と表せば $B$ は $g$ に関して対称正定値である。$B^{-1/2}$ は正の固有値の逆平方根を取った正定値作用素である。

[正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root) を実対称行列に適用すると、唯一の正定値平方根 $S$ は実行列である（共役しても同じ平方根なので）。

滑らかな $g$-直交枠で表した実対称行列の空間で、二乗写像の微分 $X\mapsto SX+XS$ は、$S$ の固有基底で成分を正数 $s_i+s_j$ 倍するため可逆である。

[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function) をこの二乗写像へ適用すれば、正定値平方根は局所的に滑らかであり、一意性により全体で滑らかである。

枠の写像 $u\mapsto B^{-1/2}u$ について

$$
g'(B^{-1/2}v,B^{-1/2}w)
=g(B^{1/2}v,B^{-1/2}w)=g(v,w)
$$

が成り立つ。正定値作用素の行列式は正なので正の向きを保ち、$B^{-1/2}(uR)=(B^{-1/2}u)R$ だから右作用と可換である。逆写像は $u'\mapsto B^{1/2}u'$。従って一方のスピン構造を他方へ移せる。

## 6. 存在しても選び方は一つとは限らない

障害を消す符号の変更が二通りあったとする。それらの差は三枚で整合する符号、すなわち 次数1の Čech cocycle である。さらに各局所枠の持ち上げを $-1$ 倍するだけなら同じ構造を別表示したにすぎない。この差が 0-cochain の coboundary に当たる。

<a id="thm-gbg29-classification"></a>

<!-- formal-statement-start -->
> **定理（スピン構造の選択と一次コホモロジー）**  
> 向き付き、Hausdorff・第二可算の境界なし滑らかな Riemann 多様体 $(M,g)$、$\dim M=n\ge2$ が少なくとも一つスピン構造を持つとする。一つの構造を基準に固定すると、スピン構造の同値類全体は $H^1(M;\mathbb Z/2)$ と一対一に対応する。
<!-- formal-statement-end -->

**証明の見取り図**。同じ枠を持ち上げる二つの束を比較し、遷移関数の比として符号を取り出す。その符号の類が零であることと、枠への写像を保つ主束同型が作れることを両方向から示す。

<!-- proof-start -->
### 証明

基準構造の遷移関数を $k_{ij}$、もう一つを $k'_{ij}$ とする。共通の良い被覆で同じ枠 $s_i$ を持ち上げた局所切断を用いる。$\rho(k'_{ij})=\rho(k_{ij})$ だから $k'_{ij}=(-1)^{a_{ij}}k_{ij}$。両者は遷移関数の積条件を満たすので

$$
k'_{ij}k'_{jk}=(-1)^{a_{ij}+a_{jk}}k_{ik}
=k'_{ik}=(-1)^{a_{ik}}k_{ik}.
$$

従って $\delta a=0$。局所切断の持ち上げを $(-1)^{d_i}$ 倍すると、遷移関数の指数は $d_i+d_j$ だけ変化する。よって $[a]$ はその選択に依存しない。枠の変更は両構造に同じ $\widetilde h_i$ を使って共役型の変換を施せば $a_{ij}$ が中心にあるため不変。被覆の変更は共通細分で比較できる。

逆に任意の 次数1の Čech cocycle $a$ に対し $(-1)^{a_{ij}}k_{ij}$ は、上の計算を逆にたどると積条件を満たす。必要な共通細分を選び、[存在障害定理の十分性の構成](#thm-gbg29-obstruction) と同じ貼り合わせと写像を作れば新しいスピン構造となる。

二つの構造の局所切断を $t_i,t'_i$ とする。枠への写像を保つ同変同型 $\Phi$ があれば、$\Phi(t_i)=t'_i(-1)^{d_i}$ となる。重なりで $\Phi(t_j)=\Phi(t_i)k_{ij}$ と $\Phi(t_j)=t'_i k'_{ij}(-1)^{d_j}$ を比較すると $a_{ij}=d_i+d_j$。逆にこの等式を満たす $d_i$ があるなら局所写像

$$
\Phi(t_i h)=t'_i(-1)^{d_i}h
$$

は重なりで一致する。実際 $t_jh=t_i k_{ij}h$ を用いると、一方は $t'_i(-1)^{d_i}k_{ij}h$、他方は $t'_i(-1)^{a_{ij}+d_j}k_{ij}h$ で等しい。滑らかで同変、各局所表示で逆を持ち、枠への写像も保つ。類が等しい場合は共通細分でこの議論を適用する。よって同値類は $H^1(M;A)$ と一対一に対応する。
<!-- proof-end -->

基準の変更は対応する類の原点を移す。すなわち構造全体には自然な差があるが、一般には自然な零の構造は指定されていない。この状況を群の自由かつ推移的な作用として記述できる。

### 円筒で二つの選択を見る

$M=S^1\times\mathbb R^{n-1}$ に積計量・向きを入れる。円周方向の単位接ベクトルと残りの定数ベクトルから大域枠 $s$ があるので $w_2=0$。積構造 $Q_+=M\times\operatorname{Spin}(n)$ と、次の同一視による構造 $Q_-$ を比較する。

$$
Q_-=(\mathbb R\times\mathbb R^{n-1}\times\operatorname{Spin}(n))/\sim,
\qquad
(t+2\pi,y,h)\sim(t,y,-h).
$$

円周の小区間では $t$ を一意に選べるため局所積を持ち、重なりの符号は定数で滑らか、右作用も中心性から両立する。枠への写像は $\lambda_-([t,y,h])=s(e^{it},y)\rho(h)$ であり、同一視の両側で $\rho(-h)=\rho(h)$ となるので矛盾しない。射影と同変性も積表示で確認できる。

大域枠 $s$ の像の逆像を考える。$Q_+$ では $M\times\{1,-1\}$ で二つの連結成分を持つ。一方 $Q_-$ では $t$ を $2\pi$ 増やすと符号が入れ替わり、$4\pi$ で初めて戻る。逆像は $(\mathbb R/4\pi\mathbb Z)\times\mathbb R^{n-1}$ と同一視でき連結である。枠への写像を保つ同型ならこの逆像同士も同相になるはずだから、二つは同値でない。

## 7. 演習

<a id="ex-gbg29-a01"></a>

#### GBG29-A01 枠の行列による判定
- Level: A

標準計量の $\mathbb R^2$ で $u_1=(1/\sqrt2,1/\sqrt2)$、$u_2=(-1/\sqrt2,1/\sqrt2)$ を列とする枠が正向き直交枠であることを確認せよ。右から $\operatorname{diag}(1,-1)$ を掛けるとどの条件が壊れるか。

<!-- solution-start -->
**詳細解答**。[向き付き直交枠束の条件](#def-gbg29-oriented-frame) を用いる。内積は $g(u_1,u_1)=1/2+1/2=1$、$g(u_2,u_2)=1$、$g(u_1,u_2)=-1/2+1/2=0$。列行列 $U$ の行列式は $1/2-(-1/2)=1$ で正。右から掛ける行列 $D$ は $D^{\mathsf T}D=I_2$ を満たすので $(UD)^{\mathsf T}UD=I_2$ だが、$\det(UD)=1\cdot(-1)=-1$ となる。直交性は残り、向きの条件が壊れる。
<!-- solution-end -->

<a id="ex-gbg29-a02"></a>

#### GBG29-A02 回転の二つの持ち上げ
- Level: A

$n=2$、$\rho(e^{it})=R(2t)$ とする。$R(\theta)$ の二つの持ち上げを求め、$\theta$ が $0$ から $2\pi$ まで動く曲線を $1$ から持ち上げた終点を求めよ。

<!-- solution-start -->
**詳細解答**。$R(2t)=R(\theta)$ なら $2t-\theta=2\pi k$、$k\in\mathbb Z$。従って $t=\theta/2+\pi k$ で、円周群の元は $e^{i\theta/2}$ と $-e^{i\theta/2}$ の二つになる。開始値を1に固定すると局所逆の一意性から $e^{i\theta/2}$ が曲線の持ち上げである。終点は $e^{i\pi}=-1$。回転の曲線は閉じるが持ち上げは閉じない。
<!-- solution-end -->

<a id="ex-gbg29-a03"></a>

#### GBG29-A03 二回の余境界操作
- Level: A

四重共通部分上で $b$ を任意の1-cochain とし、$(\delta(\delta b))_{0123}=0$ を成分展開で示せ。

<!-- solution-start -->
**詳細解答**。[2元係数のČechコホモロジー](#def-gbg29-cech) の余境界写像を二回適用すると

$$
\begin{aligned}
(\delta(\delta b))_{0123}
&=(b_{23}+b_{13}+b_{12})\\
&\quad +(b_{23}+b_{03}+b_{02})\\
&\quad +(b_{13}+b_{03}+b_{01})\\
&\quad +(b_{12}+b_{02}+b_{01}).
\end{aligned}
$$

各二重共通部分の値を四重共通部分に制限している。$b_{01},b_{02},b_{03},b_{12},b_{13},b_{23}$ の各項が二回ずつ現れ、$A$ で $b+b=0$ だから和は零。
<!-- solution-end -->

<a id="ex-gbg29-a04"></a>

#### GBG29-A04 符号の修正
- Level: A

三枚の良い被覆で $c_{012}=1$、他の異なる添字組はないとする。$b$ を一つ選んで $c+\delta b=0$ とせよ。修正後の遷移関数の整合を確認せよ。

<!-- solution-start -->
**詳細解答**。$b_{01}=1,b_{12}=b_{02}=0$ と置けば $(\delta b)_{012}=1+0+0=1$。従って $c+\delta b=0$。[三重重なりの符号は2-cocycleになる](#thm-gbg29-sign-cocycle) の符号変更式 で $\widehat g_{01}=-\widetilde g_{01}$、$\widehat g_{12}=\widetilde g_{12}$、$\widehat g_{02}=\widetilde g_{02}$ とする。元は $\widetilde g_{01}\widetilde g_{12}=-\widetilde g_{02}$ だから

$$
\widehat g_{01}\widehat g_{12}
=-\widetilde g_{01}\widetilde g_{12}
=\widetilde g_{02}=\widehat g_{02}.
$$

逆順を逆元で定めれば他の順序でも積条件を満たす。従って [存在障害定理](#thm-gbg29-obstruction) の構成が使える。
<!-- solution-end -->

<a id="ex-gbg29-b01"></a>

#### GBG29-B01 枠を変更した場合の不変性
- Level: B

$g'_{ij}=h_i^{-1}g_{ij}h_j$ とし、$h_i$ は良い被覆上で $\widetilde h_i$ に持ち上がるとする。$\widetilde g'_{ij}=(-1)^{b_{ij}}\widetilde h_i^{-1}\widetilde g_{ij}\widetilde h_j$ に対し $c'=c+\delta b$ を積から直接導け。

<!-- solution-start -->
**詳細解答**。中心の符号を前に出し、中間の $\widetilde h_j$ を消去する。

$$
\begin{aligned}
\widetilde g'_{ij}\widetilde g'_{jk}
&=(-1)^{b_{ij}+b_{jk}}
\widetilde h_i^{-1}\widetilde g_{ij}
\widetilde g_{jk}\widetilde h_k\\
&=(-1)^{b_{ij}+b_{jk}+c_{ijk}}
\widetilde h_i^{-1}\widetilde g_{ik}\widetilde h_k\\
&=(-1)^{b_{ij}+b_{jk}+c_{ijk}+b_{ik}}
\widetilde g'_{ik}.
\end{aligned}
$$

二行目では [三重重なりの符号](#thm-gbg29-sign-cocycle) を使った。最後の指数は $c_{ijk}+(\delta b)_{ijk}$。従って同じ類を定める。
<!-- solution-end -->

<a id="ex-gbg29-b02"></a>

#### GBG29-B02 三角形上の選択の違い
- Level: B

三枚の開集合に共通部分があるとし、二つのスピン構造の遷移関数の差を $a_{01}=1,a_{12}=1,a_{02}=0$ とする。次数1の Čech cocycle であることを確認し、局所符号の変更だけで両者が一致することを示せ。

<!-- solution-start -->
**詳細解答**。$(\delta a)_{012}=a_{01}+a_{12}+a_{02}=1+1+0=0$。$d_0=0,d_1=1,d_2=0$ と置くと $d_0+d_1=1$、$d_1+d_2=1$、$d_0+d_2=0$。従って $a=\delta d$ である。[スピン構造の選択の定理](#thm-gbg29-classification) の同型 $\Phi(t_i h)=t'_i(-1)^{d_i}h$ は、重なりで $a_{ij}+d_j=d_i$ だから一致し、$\lambda'\Phi=\lambda$ を満たす。局所符号の差だけでは異なる構造にならない。
<!-- solution-end -->

<a id="ex-gbg29-b03"></a>

#### GBG29-B03 球面の二枚の貼り合わせ
- Level: B

球面 $S^2$ の北極・南極をそれぞれ除いた二つのパッチで、赤道上の遷移関数が $R(m\theta)\in SO(2)$、$m\in\mathbb Z$ である向き付き階数2の Euclid ベクトル束を考える。重なりの遷移関数は赤道の値を半径方向に一定に延ばしたものとする。この直交枠束の Spin(2) への持ち上げが存在する条件を求めよ。

<!-- solution-start -->
**詳細解答**。両パッチは可縮なので、持ち上げがあるなら各局所枠を持ち上げて赤道上の閉じた遷移関数を得られる。$\rho(e^{it})=R(2t)$ からその候補は $\pm e^{im\theta/2}$。一周後と開始時の比は

$$
e^{im\pi}=(-1)^m.
$$

$m$ が奇数なら閉じず、どちらの開始符号もこの比を変えない。

$m=2k$ が偶数なら $e^{ik\theta}$ は円周上の滑らかな写像で、重なり全体へ半径方向に一定に延ばせる。逆順を逆元とすると二枚の積条件が成立する。

[滑らかなcocycleからの貼り合わせ](../GBG1/index.md#thm-gbg1-gluing) で主 Spin(2) 束を作り、[存在障害定理](#thm-gbg29-obstruction) の十分性と同じ式で元の枠束への同変写像を得る。従って必要十分条件は $m$ が偶数であること。ここで対象は任意の階数2の束であり、全てが $TS^2$ だとは仮定していない。
<!-- solution-end -->

<a id="ex-gbg29-c01"></a>

#### GBG29-C01 二つの周期方向と符号
- Level: C

標準積計量の二次元トーラス $M=\mathbb R^2/(2\pi\mathbb Z)^2$ の大域枠を $s$ とする。$\epsilon_1,\epsilon_2\in A$ に対し

$$
(x+2\pi m,y+2\pi n,h)
\sim (x,y,(-1)^{m\epsilon_1+n\epsilon_2}h)
$$

で $\mathbb R^2\times\operatorname{Spin}(2)$ を貼り合わせる（$m,n\in\mathbb Z$）。この構成がスピン構造を定め、四つの組が互いに同値でないことを示せ。さらに任意のスピン構造がこのいずれかと同値であることを示せ。

<!-- solution-start -->
**詳細解答**。まず二回の格子移動 $(m,n),(p,q)$ の符号の積は

$$
(-1)^{m\epsilon_1+n\epsilon_2}
(-1)^{p\epsilon_1+q\epsilon_2}
=(-1)^{(m+p)\epsilon_1+(n+q)\epsilon_2}.
$$

従って同一視は格子加法と整合し、逆の移動もある。トーラスの小さな座標矩形で一つの代表 $(x,y)$ を選ぶと局所積が得られ、重なりの変換は局所定数の中心符号を掛ける写像になる。[滑らかな主束の条件](../GBG2/index.md#def-gbg2-principal-bundle) が局所積で成立する。$\lambda([x,y,h])=s([x,y])\rho(h)$ は格子移動で値が変わらず、局所的に滑らか、射影を保ち、$\lambda([x,y,h]k)=\lambda([x,y,h])\rho(k)$ である。よって [スピン構造](#def-gbg29-spin-structure) となる。

固定した点の上の枠 $s$ を一つ選び、その逆像の一点を開始値とする。第一周期方向の閉路を持ち上げると、終点は開始点に $(-1)^{\epsilon_1}$ を右作用させたものになる。第二方向では $(-1)^{\epsilon_2}$ である。開始符号を替えても中心性によりこの比は変わらず、同型は枠への写像と右作用を保つから比を保つ。従って異なる組は同値でない。

最後に任意のスピン構造 $(Q,\lambda)$ を取り、$P=\lambda^{-1}(s(M))$ を考える。$P\to M$ は二重被覆である。平面からトーラスへの商写像を $p$ とすると、平面は可縮なので $s\circ p$ を $\lambda$ のもとで滑らかに持ち上げた $t:\mathbb R^2\to Q$ が取れる。各格子移動後の $t$ と移動前の $t$ は同じ枠に写るのでその比は符号であり、平面の連結性から一定である。二回の移動の比は積になるので、単位格子方向の比 $(-1)^{\epsilon_1},(-1)^{\epsilon_2}$ が全ての比を決める。従って

$$
t(x+2\pi m,y+2\pi n)=
t(x,y)(-1)^{m\epsilon_1+n\epsilon_2}.
$$

写像 $[x,y,h]\mapsto t(x,y)h$ は同一視の両側で一致し、局所積では同変な微分同相、枠への写像も保つ。これが構成した束から $Q$ への同型である。以上から四つで尽くされる。[選択の定理](#thm-gbg29-classification) と比較すると、このトーラスの $H^1(M;A)$ は $A^2$ と同型である。
<!-- solution-end -->

## 8. まとめ

局所の回転を二重被覆へ持ち上げることは常に小さな領域でできる。大域的な障害は三重共通部分の符号として現れ、2元係数の第二Stiefel–Whitney類がその不一致を消せるかを測る。消せた後も一次のコホモロジーに対応する選択が残る。次は、選んだスピン構造からスピノルが値を取る束を作り、接続とゲージ場を結び付ける。

参考：H. B. Lawson, M.-L. Michelsohn, [Spin Geometry](https://press.princeton.edu/books/hardcover/9780691085425/spin-geometry)（Spin 被覆とスピン構造の大域的定式化）。
