# GBG16 曲率ゼロでも大域的な効果は残るか

[GBG15 の微小矩形定理](../GBG15/index.md#thm-gbg15-small-rectangle)では、閉路を一周した輸送の二次係数が曲率であることを示した。曲率がいたるところで零なら、ごく小さい閉路の輸送は恒等になる。では、空間を大きく一周する閉路の輸送も必ず恒等なのだろうか。

答えは **一般には否** である。本講では、曲率が零の接続を局所的には消去できることを示したうえで、平行移動が閉路の変形類だけに依存することを証明する。その変形類から群への写像が **モノドロミー表現** となる。円周の例で、曲率が零でも閉路の位相が輸送に残ることを具体的に確かめる。

**共通設定**：$M$ は Hausdorff・第二可算・境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群とする。主束・接続・曲率を次で表す。
$
\pi:P\to M,\qquad \omega,\qquad \Omega.
$
以下、連結を仮定する箇所は明示する。曲線は区分的 $C^1$ とし、曲線の連結は [GBG14 の規約](../GBG14/index.md#thm-gbg14-transport-laws) に従う。つまり $\gamma_2*\gamma_1$ は、まず $\gamma_1$、次に $\gamma_2$ を進む。

## 1. 平坦とは何か――局所で接続を消せるか

[GBG10 の曲率形式](../GBG10/index.md#def-gbg10-curvature)は、水平ベクトル場を Lie 括弧で合成したときのずれを測る。どの点でも曲率が零なら、水平な方向同士を動かす際の局所的な障害がなくなる。この条件を **平坦性** と呼ぶ。

<a id="def-gbg16-flat-connection"></a>

<!-- formal-statement-start -->
> **定義（平坦な主束接続）**  
> 滑らかな右主 $G$ 束 $\pi:P\to M$ 上の接続形式 $\omega$ が **平坦** であるとは、その曲率2形式
>
> $$
> \Omega=d\omega+\frac12[\omega\wedge\omega]
> $$
>
> が $P$ 上のすべての点で恒等的に零、すなわち $\Omega=0$ となることをいう。局所 section $s:U\to P$ に関する接続 $A=s^*\omega$ の曲率 $F=s^*\Omega$ も、このとき $U$ 上で零となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg16-flat-connection -->
**定義の確認**。積主束 $P=\mathbb R^2\times U(1)$ と標準 section を取り、定数 $a,b\in\mathbb R$ に対して次の局所接続を考える。
$
A=ia\,dx+ib\,dy.
$
$U(1)$ は可換だから $A\wedge A=0$、定数係数ゆえ $dA=0$。したがって [局所曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula) から
$
F=dA+A\wedge A=0.
$
$F=s^*\Omega$ と、積主束の[曲率2形式の水平性・同変性](../GBG10/index.md#thm-gbg10-basic-properties)により、ファイバー内のすべての点 $p=s(x)g$ でも $\Omega=0$ となる。これで **全点** での平坦性を確認した。一方 $A=ibx\,dy$ は $F=ib\,dx\wedge dy$ となり、$b\ne0$ なら平坦ではない。
<!-- definition-example-end -->

### 局所平行 section の意味

section $s:U\to P$ が **平行** であるとは、各 $x\in U$ と $v\in T_xM$ に対し $ds_x(v)$ が水平、すなわち $s^*\omega=0$ となることをいう。これは接続の局所表示 $A$ が零になるようなゲージ選択である。[GBG7 の接続形式と水平分布の対応](../GBG7/index.md#thm-gbg7-equivalence)により、零条件は正確に「section の像の接ベクトルが水平」を意味する。

<a id="def-gbg16-parallel-section"></a>

<!-- formal-statement-start -->
> **定義（局所平行 section）**  
> 開集合 $U\subset M$ 上の滑らかな section $s:U\to P$ を、与えられた接続 $\omega$ に関する **局所平行 section** と呼ぶのは、すべての $x\in U$、$v\in T_xM$ について
>
> $$
> \omega_{s(x)}(ds_xv)=0
> \quad\text{（同値に }s^*\omega=0\text{）}
> $$
>
> が成り立つときである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg16-parallel-section -->
**定義の確認**。上の $A=i a\,dx+i b\,dy$ に対し、$k(x,y)=e^{-i(ax+by)}$ とおき、標準 section $s_0$ から $s=s_0k$ を作る。[GBG8 の局所接続変換則](../GBG8/index.md#thm-gbg8-local-transform)は $U(1)$ では $A^s=A+k^{-1}dk$ である。実際 $dk=-i(a\,dx+b\,dy)k$ だから
$$
A^s=i(a\,dx+b\,dy)-i(a\,dx+b\,dy)=0.
$$
$s$ は各点でファイバーに入る滑らかな section であり、接ベクトルの接続値がすべて零なので、定義の二条件を直接満たす。
<!-- definition-example-end -->

<a id="thm-gbg16-local-parallel"></a>

<!-- formal-statement-start -->
> **定理（平坦接続の局所平行 section）**  
> 滑らかな右主 $G$ 束の接続が平坦であるとする。基底の点と、その上の主束の点を固定する。
>
> $
> x_0\in M,\qquad p_0\in P_{x_0}.
> $
>
> このとき $x_0$ の座標近傍にある開立方体 $U$ 上に、次を満たす局所平行 section が存在する。
>
> $
> s:U\to P,\qquad s(x_0)=p_0,\qquad s^*\omega=0.
> $
>
> さらに $U$ 内の任意の区分的 $C^1$ 路 $\gamma:x\to y$ に対し、
>
> $$
> \operatorname{PT}_{\gamma}(s(x)g)=s(y)g\qquad(g\in G)
> $$
>
> が成立する。逆に、各点の近傍に局所平行 section があるなら $\Omega=0$ である。
<!-- formal-statement-end -->

**証明の見取り図**。曲率零は水平に持ち上げた座標ベクトル場同士が可換になることを意味する。可換な局所フローを座標方向に順に動かして section を作る。これは一般の有限次元 Lie 群についての論証であり、行列群を仮定しない。

<!-- proof-start -->
### 証明

$x_0$ を中心とする座標立方体で座標を $(u^1,\ldots,u^n)$ とし、$\partial_i=\partial/\partial u^i$ の水平リフトを $H_i$ と書く。これは $\pi_*H_i=\partial_i$ と $\omega(H_i)=0$ を満たす滑らかなベクトル場である。

[GBG10 の水平ベクトル場と曲率の公式](../GBG10/index.md#thm-gbg10-horizontal-bracket)を $H_i,H_j$ に適用すると
$$
\omega([H_i,H_j])=-\Omega(H_i,H_j)=0.
$$
他方、射影した括弧は $[\partial_i,\partial_j]=0$ である。ゆえに $[H_i,H_j]$ は垂直かつ水平であり、水平・垂直の直和分解から $[H_i,H_j]=0$ となる。

$H_i$ の局所フローを $\Phi_i^t$ と書く。括弧が零なら、$H_i$ の流れに沿って移した $H_j$ の $t$ 微分は括弧に比例して零である。その初期値は $H_j$ なので $(\Phi_i^t)_*H_j=H_j$。この等式とフローの初期値問題の一意性により $\Phi_i^t\Phi_j^r=\Phi_j^r\Phi_i^t$ が定義可能な小範囲で成立する。

初期点 $p_0$ に対し、座標差 $\delta_i=u^i-u^i(x_0)$ を使って
$$
s(u)=\Phi_n^{\delta_n}\circ\cdots\circ\Phi_1^{\delta_1}(p_0)
$$
と定める。フローの局所存在とパラメータへの滑らかな依存性から、小さな共通立方体 $U$ 上でこれは滑らかに定義される。$\pi_*H_i=\partial_i$ だから $\pi(s(u))=u$、また $\delta_i=0$ では恒等フローなので $s(x_0)=p_0$ である。可換性により任意の $i$ のフローを最後に回せるため、$\partial_i s=H_i\circ s$ が成立し、$\omega(ds(\partial_i))=0$。座標ベクトルは接空間を張るので $s^*\omega=0$ が従う。

今度は $U$ 内の路 $\gamma$ を取る。$t\mapsto s(\gamma(t))$ は $\omega(ds(\dot\gamma))=0$ により水平である。[GBG14 の水平リフトの存在・一意性](../GBG14/index.md#thm-gbg14-horizontal-existence)から、始点 $s(x)$ を持つ輸送の終点は $s(y)$。[同講の右同変性](../GBG14/index.md#thm-gbg14-transport-laws)により一般の $s(x)g$ でも結論の式を得る。

逆向きでは、$s^*\omega=0$ なら局所曲率 $F=d0+\frac12[0\wedge0]=0$。曲率は水平・右同変であり、各ファイバーは $s(x)G$ だから $\Omega$ はその上で零となる。局所 section が各点を覆うので $\Omega=0$。
<!-- proof-end -->

局所平行 section が一つ存在しても、それが **空間全体で一つにつながる** とは限らない。局所の輸送のずれは零でも、異なる局所 section を貼り合わせて一周すると群の元が残り得る。

## 2. 閉路を連続的に変えると輸送はどうなるか

二つの路 $\gamma_0,\gamma_1:[0,1]\to M$ が同じ始点 $x$ と終点 $y$ を持つとする。両端を固定したまま路を連続的に変形できるとき、**固定端点ホモトピー** によって同値という。ここでは $H:[0,1]^2\to M$ を
$$
H(t,0)=\gamma_0(t),\quad H(t,1)=\gamma_1(t),
\qquad H(0,r)=x,\quad H(1,r)=y
$$
を満たす連続な変形とする。中間の路が微分可能でなくても、平坦接続では局所平行 section を経由して連続路に沿う輸送を定義できる。証明でその構成を与えるので、ホモトピーの滑らかさを暗黙に要求しない。

<a id="def-gbg16-fundamental-group"></a>

同じ基点 $x$ で始まり終わる閉路の固定端点ホモトピー類を $[\gamma]$ と書く。その類の集合を **基本群** $\pi_1(M,x)$ という。積を $[\gamma_2][\gamma_1]=[\gamma_2*\gamma_1]$ とし、定値路の類を単位元、逆向きの路の類を逆元とする。連結の結合律はパラメータの取り直しの差しかなく、固定端点ホモトピーの下で同じ類となるので群をなす。基点の選択が必要なことに注意する。

<a id="thm-gbg16-homotopy-transport"></a>

<!-- formal-statement-start -->
> **定理（平坦接続の平行移動は固定端点ホモトピーで不変）**  
> $\Omega=0$ の滑らかな右主 $G$ 束 $(P,\omega)$ を取る。始点・終点がそれぞれ $x,y$ である二本の区分的 $C^1$ 路 $\gamma_0,\gamma_1$ が固定端点ホモトピーで結ばれていれば、
>
> $$
> \operatorname{PT}_{\gamma_0}=\operatorname{PT}_{\gamma_1}:P_x\longrightarrow P_y.
> $$
>
> 特に定値路と固定端点ホモトピーな閉路の輸送は恒等である。
<!-- formal-statement-end -->

**証明の見取り図**。変形のパラメータ正方形を、各小矩形の像が一つの局所平行 section の領域に収まるほど細分する。各小矩形では右辺から左辺への二通りの輸送が一致し、内部辺の輸送が逆路で相殺される。

<!-- proof-start -->
### 証明

まず連続路に沿う輸送を定義する。連続路 $c:[0,1]\to M$ の区間を細分し、各小区間の像が局所平行 section $s_\alpha$ の領域 $U_\alpha$ に入るようにする。小区間では、始点の点を終点へ次の式で運ぶ。
$
s_\alpha(c(a))g\longmapsto s_\alpha(c(b))g.
$

二つの平行 section が重なる領域では $s_\beta=s_\alpha k$ と書ける。[接続のsection変換則](../GBG8/index.md#thm-gbg8-local-transform)の両辺で接続が零なので
$
0=k^{-1}(0)k+k^{-1}dk,\qquad dk=0.
$
従って重なりの各道連結成分で $k$ は一定である。つまり、同じ小区間に沿う輸送は section の選択に依存しない。

細分をさらに細かくしても合成結果は同じである。異なる二つの細分を共通に細分すれば、選び方によらず連続路の輸送が定まる。区分的 $C^1$ 路については [水平リフトの一意性](../GBG14/index.md#thm-gbg14-horizontal-existence)から従来の平行移動と一致する。以下ではこの拡張を中間の連続路にも用いる。

$H:[0,1]^2\to M$ を固定端点ホモトピーとし、[局所平行 section の定理](#thm-gbg16-local-parallel)で得た近傍 $\{U_\alpha\}$ で $H([0,1]^2)$ を覆う。正方形はコンパクトで、$H$ は一様連続なので、十分細かい矩形分割を取れば各小矩形の像がある一つの $U_\alpha$ に入る。

小矩形の左下を $a$、右下を $b$、右上を $c$、左上を $d$ とする。その像を含む $U_\alpha$ の平行 section $s_\alpha$ を使う。任意の $p=s_\alpha(H(a))g$ に対し、下辺・右辺を進む輸送は
$$
s_\alpha(H(a))g\mapsto s_\alpha(H(b))g
\mapsto s_\alpha(H(c))g
$$
であり、左辺・上辺を進む輸送も
$$
s_\alpha(H(a))g\mapsto s_\alpha(H(d))g
\mapsto s_\alpha(H(c))g
$$
となる。[平行移動の同変性・合成・逆路](../GBG14/index.md#thm-gbg14-transport-laws)を用いれば、この小矩形で二通りに進んだときの平行移動が等しい。重要なのは、同じ $U_\alpha$ にある限り **すべての $g\in G$** に対して成り立つ点である。

隣り合う矩形の等式を横・縦へつなぐ。共有する内部辺を一方の経路では順向き、もう一方では逆向きに通る場合、その平行移動は互いに逆なので消去できる。これは群の元を無条件に可換としているのではなく、ファイバー間の平行移動の**合成**として消去している。最終的に外周の上辺と下辺だけが残る。左右の辺は $H(0,r)=x$、$H(1,r)=y$ という定値路だから輸送は恒等であり、$\operatorname{PT}_{\gamma_0}=\operatorname{PT}_{\gamma_1}$ が従う。
<!-- proof-end -->

**仮定を失うと何が壊れるか**。曲率が非零なら小矩形で平行 section を取れず、そこで二通りの辺の輸送が一致しない。[GBG15 の微小矩形計算](../GBG15/index.md#thm-gbg15-small-rectangle)は差の主項が $-F_{xy}\varepsilon^2$ になることを示している。固定端点ホモトピーで同じ閉路類であっても、非平坦なら輸送の値は変わり得る。

## 3. 基本群からモノドロミー表現を作る

同じ点 $x\in M$ のファイバー内で $p\in P_x$ を固定する。[GBG15 の主束接続のホロノミー群](../GBG15/index.md#def-gbg15-holonomy)では閉路ごとに $h_\gamma(p)\in G$ が定まり、$\operatorname{PT}_\gamma(p)=p\,h_\gamma(p)$ と書けた。今は平坦なので前節の定理により、この群元は閉路のホモトピー類にしか依存しない。したがって基本群から $G$ への写像になる。

<a id="def-gbg16-monodromy"></a>

<!-- formal-statement-start -->
> **定義（平坦接続のモノドロミー表現）**  
> 滑らかな右主 $G$ 束の平坦接続 $\omega$、基点 $x\in M$、ファイバーの点 $p\in P_x$ を固定する。[基本群](#def-gbg16-fundamental-group)の元 $[\gamma]\in\pi_1(M,x)$ に
>
> $$
> \rho_{\omega,p}([\gamma])=h_\gamma(p),
> \qquad \operatorname{PT}_\gamma(p)=p\,h_\gamma(p)
> $$
>
> を対応させる写像 $\rho_{\omega,p}:\pi_1(M,x)\to G$ を **モノドロミー表現** と呼ぶ。これは次の定理によって well-defined な群準同型となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg16-monodromy -->
**定義の確認**。$M=\mathbb R$、$P=\mathbb R\times U(1)$、$A=ic\,dx$ とする。任意の基点閉路 $\gamma$ の輸送は [GBG14 の局所水平 ODE](../GBG14/index.md#prop-gbg14-local-transport)から
$$
h_\gamma=e^{-ic\int_\gamma dx}
=e^{-ic(\gamma(1)-\gamma(0))}=1.
$$
したがってすべての閉路類に単位元 $1$ を対応させる。ホモトピー類によらず値が一定で、類の積でも $1\cdot1=1$ となる。後述の $S^1$ では同じ $U(1)$ でも $1$ 以外が現れる。
<!-- definition-example-end -->

<a id="thm-gbg16-monodromy-homomorphism"></a>

<!-- formal-statement-start -->
> **定理（モノドロミーの準同型性・共役・像）**  
> $(P,\omega)$ を上記の平坦な右主 $G$ 束とし、$x\in M$、$p\in P_x$ を固定する。このとき
>
> 1. $\rho_{\omega,p}:\pi_1(M,x)\to G$ は well-defined な群準同型である。
> 2. $k\in G$、$p'=pk$ とすると、すべての $[\gamma]$ について
>    $$
>    \rho_{\omega,p'}([\gamma])=k^{-1}\rho_{\omega,p}([\gamma])k.
>    $$
> 3. その像は $\operatorname{im}\rho_{\omega,p}=\operatorname{Hol}_p(\omega)$ である。
> 4. $y$ を結ぶ路 $\sigma:x\to y$ と $q=\operatorname{PT}_\sigma(p)$ を選ぶと、閉路類の対応
>    $$
>    [\delta]\longmapsto[\bar\sigma*\delta*\sigma]
>    $$
>    によって $\pi_1(M,y)$ と $\pi_1(M,x)$ が同型となり、この対応の下で両基点のモノドロミーは同じ $G$ の元を与える。
<!-- formal-statement-end -->

**証明の見取り図**。路のホモトピー不変性、閉路の連結順序、ファイバー上の点の変更、基点間の輸送をそれぞれ区別する。[GBG15 の群構造と基準点変更](../GBG15/index.md#thm-gbg15-base-change)を使うが、ホモトピー不変性そのものは本講で証明した。

<!-- proof-start -->
### 証明

1. 二つの代表閉路 $\gamma,\gamma'$ が同じ類なら [ホモトピー不変性](#thm-gbg16-homotopy-transport)から $\operatorname{PT}_\gamma(p)=\operatorname{PT}_{\gamma'}(p)$。右作用の自由性によって $h_\gamma(p)=h_{\gamma'}(p)$。よって代表に依存せず定まる。さらに [GBG15 の閉路連結の積の公式](../GBG15/index.md#thm-gbg15-holonomy-subgroup)は
   $$
   \rho_{\omega,p}([\gamma_2][\gamma_1])
   =h_{\gamma_2*\gamma_1}(p)
   =h_{\gamma_2}(p)h_{\gamma_1}(p)
   $$
   を与える。定値路と逆路の公式も同じ既習定理に含まれ、群準同型である。

2. [GBG15 のファイバー基準点変更式](../GBG15/index.md#thm-gbg15-base-change)を閉路の各代表に適用すれば
   $$
   \operatorname{PT}_\gamma(pk)
   =\operatorname{PT}_\gamma(p)k
   =(pk)(k^{-1}h_\gamma(p)k),
   $$
   よって目的の共役式を得る。

3. [主束接続のホロノミー群](../GBG15/index.md#def-gbg15-holonomy)は **すべての閉路** の $h_\gamma(p)$ の集合である。一方、モノドロミーの像は **その閉路の類** を動かして得る同じ値の集合である。固定端点ホモトピー不変性により値を取り落とさず、両集合が等しい。

4. $\delta:y\to y$ の類を $x$ の類へ送る。$\sigma$ と $\bar\sigma$ の挿入・削除は往復路が定値路と固定端点ホモトピーであることから逆対応を与えるので、基本群の同型である。群元については [基点変更の公式](../GBG15/index.md#thm-gbg15-base-change)を $q=\operatorname{PT}_\sigma(p)$ に適用して
   $$
   h_\delta(q)=h_{\bar\sigma*\delta*\sigma}(p)
   $$
   を得る。代表に依存しないので類に対しても同じ等式が成立する。
<!-- proof-end -->

固定点 $p$ の選択を忘れたとき、残るのは表現そのものではなく **$G$ 内の共役での同値類** である。可換群 $G=U(1)$ なら共役は消えるが、非可換群なら基準点の情報を落とさないことが大切である。

## 4. 円周では曲率が零なのに一周の位相が残る

円周 $S^1=\{(x,y)\in\mathbb R^2:x^2+y^2=1\}$ 上で、角度を一周ごとの局所座標 $\theta$ とする。角度そのものは大域的な実数値関数ではないが、
$$
\eta=x\,dy-y\,dx
$$
は円周上で大域的に定義された滑らかな1形式であり、局所角度では $\eta=d\theta$。$\theta\mapsto(\cos\theta,\sin\theta)$ を代入すると
$$
x\,dy-y\,dx
=\cos\theta(\cos\theta\,d\theta)
-\sin\theta(-\sin\theta\,d\theta)
=d\theta.
$$

積主束 $P=S^1\times U(1)$ の標準 section で、任意の $a\in\mathbb R$ に対し
$$
A=ia\,\eta
$$
と置く。これは大域的な $i\mathbb R$ 値1形式であり、[GBG7 の積主束の構成式](../GBG7/index.md#prop-gbg7-product-form)によって接続を定める。基底は1次元なので2形式は零、したがって $F=dA=0$ であり、この接続は平坦である。

<a id="prop-gbg16-circle-holonomy"></a>

<!-- formal-statement-start -->
> **命題（円周上の平坦接続によるホロノミー）**  
> 円周上の積主束と接続を次で与える。
>
> $
> P=S^1\times U(1),\qquad
> A=ia(x\,dy-y\,dx),\quad a\in\mathbb R.
> $
>
> この接続は平坦である。閉路 $\gamma$ の向き付き周回数を整数 $n$ とする。標準 section でのホロノミーは次の値となる。
>
> $$
> h_\gamma=e^{-2\pi ian}.
> $$
>
> 特に $a\notin\mathbb Z$ なら、一周のホロノミーは非自明である。$a\in\mathbb Z$ であることと、この接続が大域的ゲージ変換によって $A=0$ に変換できることは同値である。
<!-- formal-statement-end -->

**証明の見取り図**。角度の実数値への持ち上げを使い、一周の積分を $2\pi n$ と計算する。ゲージ変換を局所と大域で比較し、関数 $e^{-ia\theta}$ が円周上で一価になる条件を調べる。

<!-- proof-start -->
### 証明

閉路 $\gamma(t)\in S^1$ には、始点の角度を選べば連続な実数値角度 $\widetilde\theta(t)$ が取れる。細かい円弧で局所角度をつなぐと、この関数は区分的 $C^1$ となる。終点は始点と同じ円周点なので
$$
\widetilde\theta(1)-\widetilde\theta(0)=2\pi n
$$
を満たす整数 $n$ が定まる。円弧ごとに $\eta=d\widetilde\theta$ だから
$$
\int_\gamma\eta
=\sum_j(\widetilde\theta(t_{j+1})-\widetilde\theta(t_j))
=2\pi n.
$$
[局所水平 ODE](../GBG14/index.md#prop-gbg14-local-transport)で $g'=-ia\dot{\widetilde\theta}g$ を解くと、$g(1)=e^{-ia(\widetilde\theta(1)-\widetilde\theta(0))}g(0)$。従って $h_\gamma=e^{-2\pi ian}$ である。$e^{-2\pi ia}=1$ となる条件は $a\in\mathbb Z$ である。

$a\in\mathbb Z$ とする。$k:S^1\to U(1)$ を局所角度で $k(e^{i\theta})=e^{-ia\theta}$ と定義すると、$\theta$ を $2\pi$ 増しても同じ値になるため大域的な滑らかな関数である。[局所ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)は $A'=A+k^{-1}dk$ で、$k^{-1}dk=-ia\,d\theta=-ia\eta$ だから $A'=0$。

逆に、ある大域的 $k$ により $A'=0$ になったとする。閉路の輸送行列は [GBG14 のsection変更](../GBG14/index.md#prop-gbg14-local-transport)により、基点で $k^{-1}h_\gamma k$ に変わる。$U(1)$ は可換で、新表示 $A'=0$ の輸送は $1$ だから、もとの一周の $h_\gamma$ も $1$。従って $a\in\mathbb Z$。
<!-- proof-end -->

例えば $a=\frac12$ なら
$$
F=0,\qquad h_{\text{一周}}=e^{-i\pi}=-1.
$$
円周の小さな弧では $s(\theta)=(e^{i\theta},e^{-ia\theta})$ が平行 section になる。しかし一周すると第二成分が $e^{-2\pi ia}$ 倍されるので、$a\notin\mathbb Z$ では **同じ点に戻らず** 大域 section として貼り合わない。失われているのは「曲率零」の条件ではなく、局所の角度を一価の大域関数にできるという条件である。

### 単連結ならこの障害は消える

[**単連結**](../../GEO/GEO18/index.md#def-geo18-simply-connected)とは、空間が道連結であり、任意の基点で基本群が単位元だけからなることである。すなわち任意の閉路を基点を固定したまま定値路へ変形できる。

<a id="thm-gbg16-simply-connected"></a>

<!-- formal-statement-start -->
> **定理（単連結な基底上の平坦接続の大域平行 section）**  
> $M$ は道連結かつ単連結な滑らかな多様体で、平坦接続 $\omega$ をもつ滑らかな右主 $G$ 束を考える。
>
> $
> \pi:P\to M,\qquad x_0\in M,\quad p_0\in P_{x_0}.
> $
>
> このとき初期値を固定した大域平行 section が一意に存在する。
>
> $
> s:M\to P,\qquad s(x_0)=p_0,\qquad s^*\omega=0.
> $
>
> 従って $P$ は積主束と同型で、すべての閉路のホロノミーは単位元である。
<!-- formal-statement-end -->

**証明の見取り図**。基点から各点への輸送で section を定義する。単連結性で路による曖昧さを消し、局所平行 section で滑らかさを確認する。

<!-- proof-start -->
### 証明

任意の $x\in M$ に対し、道連結性から路 $\gamma_x:x_0\to x$ を取り、
$$
s(x)=\operatorname{PT}_{\gamma_x}(p_0)
$$
と置く。別の路 $\gamma'_x$ を取ったとき、$\bar\gamma'_x*\gamma_x$ は $x_0$ における閉路である。単連結性と [ホモトピー不変性](#thm-gbg16-homotopy-transport)から、その輸送は恒等。さらに [連結・逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)を適用すると
$$
\operatorname{PT}_{\gamma'_x}^{-1}\operatorname{PT}_{\gamma_x}
=\operatorname{PT}_{\bar\gamma'_x*\gamma_x}
=\operatorname{id}_{P_{x_0}},
$$
従って $s(x)$ は路の選び方によらない。

$x$ の近傍 $U$ に [局所平行 section](#thm-gbg16-local-parallel) $s_U$ を取り、$s(x)=s_U(x)g$ と一意に表す。$U$ 内の任意の $y$ に対して、$x_0$ から $x$ の選んだ路の後に $U$ 内の路をつなぐと
$$
s(y)=\operatorname{PT}_{x\to y}(s(x))=s_U(y)g
$$
である。よって $s|_U=s_Ug$ は滑らかで水平。局所的にすべてそうだから $s$ は大域的に滑らかな平行 section となる。

$s(x_0)=p_0$ を満たす別の平行 section $t$ があれば、任意の $x$ への路に沿って $t$ は $p_0$ の平行移動に一致するため $t=s$。[GBG3 の大域 section と自明性](../GBG3/index.md#thm-gbg3-global-section-trivial)から $(x,g)\mapsto s(x)g$ は主 $G$ 束の同型である。すべての閉路の輸送は $\operatorname{PT}_\gamma(s(x)g)=s(x)g$ なので、ホロノミーは単位元だけとなる。
<!-- proof-end -->

ここで **単連結だから平坦** と言っているのではない。曲率零と単連結性の **両方** を使う定理である。円周は道連結だが単連結ではないので、先ほどの $a=\frac12$ の例はこの定理に反しない。

---

## 5. 演習と詳細解答

### Level A：定義と局所計算

<a id="ex-gbg16-a01"></a>
#### GBG16-A01 平坦性を判定する
- Level: A

$\mathbb R^2\times U(1)$ 上の $A=i(x\,dx+2y\,dy)$ が平坦か判定し、接続を零にする大域的なゲージ関数 $k$ を作れ。

<!-- solution-start -->
**詳細解答**。[局所曲率公式](../GBG10/index.md#thm-gbg10-local-formula)では可換群なので $F=dA$。$d(x\,dx)=dx\wedge dx=0$、$d(2y\,dy)=2dy\wedge dy=0$ より $F=0$。関数 $\phi(x,y)=x^2/2+y^2$ は $d\phi=x\,dx+2y\,dy$ を満たす。$k=e^{-i\phi}$ は全平面上の滑らかな $U(1)$ 値関数で
$$
k^{-1}dk=-i\,d\phi=-A,\qquad A'=A+k^{-1}dk=0
$$
となる。[ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)の全条件を満たす。
<!-- solution-end -->

<a id="ex-gbg16-a02"></a>
#### GBG16-A02 円周の半周と一周
- Level: A

$S^1$ 上で $A=\frac i2\eta$ とする。$\theta=0$ から $\pi$ まで進む路の局所輸送、正向き一周・逆向き一周のホロノミーを計算せよ。

<!-- solution-start -->
**詳細解答**。角度を区間 $[0,\pi]$ で実数値に取ると $A(\dot\gamma)=i/2$。[水平 ODE](../GBG14/index.md#prop-gbg14-local-transport)の解は $g(\theta)=e^{-i\theta/2}g(0)$ だから、半周の局所輸送は $e^{-i\pi/2}=-i$。閉路については [円周のホロノミー公式](#prop-gbg16-circle-holonomy)に $a=\frac12$、$n=\pm1$ を代入し
$$
h_{+1}=e^{-i\pi}=-1,\qquad
h_{-1}=e^{i\pi}=-1=h_{+1}^{-1}
$$
となる。半周は閉路でないので、$-i$ は固定した始点・終点の section に関する輸送行列であってホロノミー群の元と区別する。
<!-- solution-end -->

<a id="ex-gbg16-a03"></a>
#### GBG16-A03 モノドロミーの積
- Level: A

平坦な $U(1)$ 接続の基点閉路 $\alpha,\beta$ が $h_\alpha=e^{i\pi/3}$、$h_\beta=e^{i\pi/5}$ を与えるとする。$\beta*\alpha$ と $\bar\alpha$ の像を求め、積の順序も記せ。

<!-- solution-start -->
**詳細解答**。[モノドロミーの準同型定理](#thm-gbg16-monodromy-homomorphism)と [GBG15 の連結規約](../GBG15/index.md#thm-gbg15-holonomy-subgroup)によれば
$$
h_{\beta*\alpha}=h_\beta h_\alpha
=e^{i\pi/5}e^{i\pi/3}=e^{8\pi i/15},
\qquad h_{\bar\alpha}=h_\alpha^{-1}=e^{-i\pi/3}.
$$
後から通る $\beta$ の元が左側に来る。$U(1)$ では交換可能なので数値上の順序差は消えるが、非可換群に同じ計算を使うときは順序を保つ必要がある。
<!-- solution-end -->

<a id="ex-gbg16-a04"></a>
#### GBG16-A04 局所平行 section の一価性
- Level: A

$S^1\times U(1)$ の $A=\frac{3i}{2}\eta$ に対し、角度の円弧上で $k(\theta)=e^{-3i\theta/2}$ が接続を零にすることを確かめ、この式が大域的なゲージ関数にならない理由を示せ。

<!-- solution-start -->
**詳細解答**。円弧では $\eta=d\theta$ と書け、
$$
k^{-1}dk=-\frac{3i}{2}d\theta,\qquad
A+k^{-1}dk=\frac{3i}{2}d\theta-\frac{3i}{2}d\theta=0.
$$
しかし円周上では $\theta$ と $\theta+2\pi$ は同じ点であり、
$$
k(\theta+2\pi)=e^{-3i\pi}k(\theta)=-k(\theta)\ne k(\theta).
$$
よってこの式は大域的な一価関数として定義できない。曲率零から得られたのは局所平行 section であり、大域存在まで主張するには追加条件が必要である。
<!-- solution-end -->

### Level B：ホモトピー・大域性・非可換性

<a id="ex-gbg16-b01"></a>
#### GBG16-B01 平行 section が輸送を路から独立させる
- Level: B

開集合 $U\subset M$ に平行 section $s$ が存在する。$x,y\in U$ を結ぶ二本の路 $\alpha,\beta$ の像がともに $U$ に入るとき、$\operatorname{PT}_\alpha=\operatorname{PT}_\beta$ を証明せよ。逆に、$U$ の任意の二点について輸送が路に依存しないなら、$U$ 内の全閉路のホロノミーが恒等であることを示せ。

<!-- solution-start -->
**詳細解答**。始点の任意の主束点は、右作用の自由・推移性から一意に $p=s(x)g$ と書ける。[局所平行 section の輸送式](#thm-gbg16-local-parallel)をそれぞれの路へ適用すると
$$
\operatorname{PT}_\alpha(p)=s(y)g
=\operatorname{PT}_\beta(p).
$$
任意の $p$ に成立するため、二つの写像は等しい。逆向きは $x=y$ とし、一方の路を定値路に選ぶ。仮定から任意の閉路の輸送が定値路の輸送に等しい。[定値路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)で後者は恒等なので、$p$ の右作用を表す群元も $e$ に等しい。
<!-- solution-end -->

<a id="ex-gbg16-b02"></a>
#### GBG16-B02 2次元トーラス上の二つの位相
- Level: B

$T^2=S^1\times S^1$ の角度を $\theta,\varphi$ とし、積主 $U(1)$ 束に $A=i(a\,d\theta+b\,d\varphi)$（$a,b\in\mathbb R$）を取る。曲率を求め、閉路の二つの[巻き数](../../../解析系/CA/CA5/index.md#def-ca5-winding-number) $(m,n)\in\mathbb Z^2$ に対するモノドロミーを求めよ。どの条件で全ホロノミーが恒等になるか。

<!-- solution-start -->
**詳細解答**。$d\theta,d\varphi$ はそれぞれ円周因子から引き戻された大域1形式である。係数は定数で $U(1)$ は可換なので
$$
F=dA=0.
$$
巻き数 $(m,n)$ の閉路について、角度を実数値に持ち上げた始終値差は $\Delta\theta=2\pi m$、$\Delta\varphi=2\pi n$。従って [水平ODE](../GBG14/index.md#prop-gbg14-local-transport)で
$$
h_{(m,n)}
=\exp\left(-i\int_\gamma(a\,d\theta+b\,d\varphi)\right)
=e^{-2\pi i(am+bn)}.
$$
すべての $(m,n)$ で $h_{(m,n)}=1$ なら、特に $(1,0)$ と $(0,1)$ から $e^{-2\pi ia}=e^{-2\pi ib}=1$、従って $a,b\in\mathbb Z$。逆に両者が整数なら $am+bn\in\mathbb Z$ だからすべて $1$ となる。
<!-- solution-end -->

<a id="ex-gbg16-b03"></a>
#### GBG16-B03 非可換接続で平坦性を見落とさない
- Level: B

$G=GL(2,\mathbb R)$、$H=E_{12}$、$K=E_{21}$ とし、$\mathbb R^2$ の積主束で $A=H\,dx+K\,dy$ とする。$dA$ と $F$ を別々に求め、曲率が零か判定せよ。さらに微小正方形の輸送の二次項を示せ。

<!-- solution-start -->
**詳細解答**。$H,K$ は定数行列なので $dA=0$。しかし $A\wedge A=[H,K]\,dx\wedge dy$ である。$HK=E_{11}$、$KH=E_{22}$ だから
$$
[H,K]=E_{11}-E_{22}
=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad F=(E_{11}-E_{22})\,dx\wedge dy\ne0.
$$
従って平坦ではない。[GBG15 の微小矩形輸送定理](../GBG15/index.md#thm-gbg15-small-rectangle)を原点、$A_x=H$、$A_y=K$、辺長 $\varepsilon$ に適用すると
$$
U_{\partial R_\varepsilon}
=I-\varepsilon^2(E_{11}-E_{22})+O(\varepsilon^3).
$$
$dA=0$ だけを見て「平坦」と判定すると、交換子の曲率と輸送の二次ずれを見落とす。
<!-- solution-end -->

<a id="ex-gbg16-b04"></a>
#### GBG16-B04 自明なモノドロミーから大域 section を作る
- Level: B

$M$ を道連結とする。平坦な右主 $G$ 束上で、ある $p_0\in P_{x_0}$ におけるモノドロミーがすべて単位元とする。$M$ が単連結でなくても、大域平行 section が存在することを示せ。

<!-- solution-start -->
**詳細解答**。$x_0$ から $x$ への路 $\gamma_x$ を取り $s(x)=\operatorname{PT}_{\gamma_x}(p_0)$ と定める。路 $\gamma'_x$ を替えた場合、両路の差の閉路 $\bar\gamma'_x*\gamma_x$ では仮定により $h=e$、従って
$$
\operatorname{PT}_{\gamma'_x}^{-1}\operatorname{PT}_{\gamma_x}(p_0)
=\operatorname{PT}_{\bar\gamma'_x*\gamma_x}(p_0)
=p_0.
$$
逆輸送を適用すれば、$s(x)$ は路によらず定まる。

局所平行 section $s_U$ を任意の点 $x$ の近傍に取り、$s(x)=s_U(x)g$ と書く。$U$ の点 $y$ まで局所的に運ぶと
$
s(y)=s_U(y)g,\qquad (s|_U)^*\omega=0.
$
よって $s$ は滑らかな大域平行 section である。[大域sectionと自明性の同値](../GBG3/index.md#thm-gbg3-global-section-trivial)により束も自明となる。使ったのは **モノドロミーの自明性** であり、単連結性は必要ない。
<!-- solution-end -->

### Level C：ゲージ変換まで統合する

<a id="ex-gbg16-c01"></a>
#### GBG16-C01 円周の平坦接続をゲージ同値まで分類する
- Level: C

$P=S^1\times U(1)$ で $A_a=ia\,\eta$（$a\in\mathbb R$、$\eta=x\,dy-y\,dx$）とする。

1. $A_a$ と $A_b$ の一周のホロノミーを求め、一致条件を示せ。
2. 大域的ゲージ関数 $k_n(e^{i\theta})=e^{in\theta}$（$n\in\mathbb Z$）の作用を計算せよ。
3. $A_a$ と $A_b$ が大域的ゲージ同値である条件を必要十分で示せ。
4. $a=1/2$ と $a=3/2$ は同値か。また $a=0$ と $a=1/2$ は同値か。理由を示せ。

<!-- solution-start -->
**詳細解答**。

**1.** [円周のホロノミー公式](#prop-gbg16-circle-holonomy)より正向き一周では
$$
h_a=e^{-2\pi ia},\qquad h_b=e^{-2\pi ib}.
$$
等号 $h_a=h_b$ は $e^{-2\pi i(a-b)}=1$ と同値であり、これは $a-b\in\mathbb Z$ と同値である。

**2.** $n\in\mathbb Z$ だから $k_n(\theta+2\pi)=k_n(\theta)$ で、大域的な $U(1)$ 値関数である。$dk_n=in e^{in\theta}d\theta$ により $k_n^{-1}dk_n=in\,\eta$ となる。[ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)を代入すると
$$
A_a'=A_a+k_n^{-1}dk_n
=i(a+n)\eta=A_{a+n}.
$$

**3.** $a-b\in\mathbb Z$ とし、$n=b-a$ と選ぶと 2 により $A_a$ は $A_b$ に変わる。逆に両接続が大域ゲージ同値なら、[閉路輸送の section 変換](../GBG14/index.md#prop-gbg14-local-transport)は基点での共役となり、$U(1)$ では共役が消える。ゆえに $h_a=h_b$。1 により $a-b\in\mathbb Z$。従って必要十分条件は $a-b\in\mathbb Z$ である。

**4.** $3/2-1/2=1$ は整数だから、$k_1$ で $A_{1/2}$ は $A_{3/2}$ へ変わる。一周の位相はいずれも $-1$ である。他方 $1/2-0=1/2$ は整数でなく、一周の位相も $h_0=1$、$h_{1/2}=-1$ と違うので同値ではない。従ってこの形の接続のゲージ同値類は $a$ の整数差で分類される、すなわち $\mathbb R/\mathbb Z$ で表される。
<!-- solution-end -->

---

## 6. 次講へ

曲率が零なら小さい領域では平行 section を選べる。しかし大きな閉路には基本群の情報が残り、平坦接続のモノドロミー $\pi_1(M,x)\to G$ がそれを記録する。次の GBG17 では、非可換群においてファイバーの基準点を替えると群元が共役で変わるという問題を、表現の跡でどのように解決するかを調べる。
