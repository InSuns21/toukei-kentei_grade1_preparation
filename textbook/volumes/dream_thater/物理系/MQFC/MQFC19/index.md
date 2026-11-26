# MQFC19 連続ゲージ場を格子に置く

[MQFC13 の有限体積・周波数切断](../MQFC13/index.md#def-mqfc13-cutoff) では有限体積と短距離の切断を別々に考えた。スカラー場を有限個の格子点の実数に置き換えるだけなら簡単だが、ゲージ場では局所的な基準の取り替えがある。点ごとに行列を置くのではなく、隣接点間でベクトルの成分をどう運ぶかを記録すれば、有限個の変数でもこの対称性を厳密に残せる。

本講は Euclid 空間の有限格子を使う。確率測度を導入する前に、どの変数を積分するのか、どの観測量が局所的な基準の取り替えに依存しないかを決める。

## 1. 点ではなく辺に変数を置く

格子間隔を $a>0$、次元を整数 $d\ge2$ とし、整数 $L_\mu\ge1$ を用いて有限の長方形格子を取る。

$$
\Lambda=\{a(n_1,\ldots,n_d):0\le n_\mu\le L_\mu,\ n_\mu\in\mathbb Z\}.
$$

$\hat\mu$ は第 $\mu$ 方向の標準基底ベクトルとする。両端が $\Lambda$ にある最近接辺 $e=(x,x+a\hat\mu)$ を正向き辺とし、集合を $E_+$ と書く。逆向き辺は $\bar e=(x+a\hat\mu,x)$ と書き、全有向辺の集合を $E$ とする。ここでは周期的な同一視をせず、境界を越える辺も加えない。

群 $G$ は $N$ 次ユニタリ行列のコンパクト部分群とする（$N\ge1$）。各行列は $\mathbb C^N$ の標準正規直交基底で表し、$I$ を $N$ 次単位行列とする。ユニタリ行列とは、標準複素内積を保つ行列である。[LA5 のユニタリ作用素](../../../基礎科目/LA/LA5/index.md#def-la5-unitary) と [GBG17 のユニタリ表現での逆路公式](../../../幾何系/GBG/GBG17/index.md#prop-gbg17-reversal) に対応して、行列 $M$ の共役転置を $M^\dagger=\overline M^{\,T}$ と書くと、その条件は

$$
M^\dagger M=MM^\dagger=I
$$

である。列ベクトルを $c_1,\ldots,c_N$ とすれば、$(M^\dagger M)_{jk}=c_j^\dagger c_k$ は第 $j$ 列と第 $k$ 列の内積である。従って列が正規直交すれば $M^\dagger M=I$ となり、正方行列なので $M^\dagger=M^{-1}$、$MM^\dagger=I$ も従う。

全ユニタリ行列の群を $U(N)$ と書く。例えば $U(1)$ は絶対値1の複素数を掛け合わせる群である。$SU(2)$ は2次ユニタリ行列のうち行列式1のものからなる。従って $SU(2)$ への所属を調べるには、ユニタリ性と行列式の両方を確かめる。以下の辺の代数にはコンパクト性は必要ないが、次講以降で積分を構成するときに使う。

始点 $x$ での列ベクトルを終点 $y$ に運ぶ行列を $U_{yx}$ とする。添字は「行き先、出発点」の順である。行きと帰りを続けて何もしなかった状態に戻すため、逆向き辺には逆行列を置く。正向き辺だけの値を指定すると逆向きの値が決まるので、この指定を配置の独立な座標と呼ぶ。

<a id="def-mqfc19-link"></a>

<!-- formal-statement-start -->
> **定義（格子の群値辺接続）**
> 上記の有限格子と群 $G$ に対し、各有向辺 $e=(x,y)\in E$ に $U_e=U_{yx}\in G$ を対応させ、全ての辺で

$$
U_{\bar e}=U_e^{-1}
$$

> を満たす割当てを格子の群値辺接続とする。正向き辺の割当てだけが独立な座標であり、配置全体の集合を $\mathcal U$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc19-link -->
**定義の確認**。$d=2$、$L_1=L_2=1$ の正方形で $G=U(1)$ とする。下辺の右向きに $i$、他の3本の正向き辺に $1$ を置く。全て絶対値1なので群に属する。下辺の左向きに $-i$、他の3本の逆向き辺に $1$ を置けば

$$
(-i)i=1,\qquad i(-i)=1.
$$

他の3辺でも積は1であり、全8本で逆向きの条件を満たす。
<!-- definition-example-end -->

正向き辺が $m$ 本あるなら、$G^m$ の任意の元から逆向き辺を一意に補える。逆に $\mathcal U$ の元を正向き辺へ制限すれば元の $m$ 個の値が復元される。従って

$$
\mathcal U\simeq G^{E_+}.
$$

これは変数を自由に選べるという意味であり、将来の確率測度の下で統計的に独立になるという意味ではない。

## 2. 連続接続と頂点ごとの基準変更

[GBG8 の局所ゲージポテンシャル](../../../幾何系/GBG/GBG8/index.md#def-gbg8-local-potential) $A$ は、各点の接ベクトルを Lie 環の元に送る1形式である。[GBG14 の局所輸送行列とsection変更](../../../幾何系/GBG/GBG14/index.md#prop-gbg14-local-transport) では、その接続に沿う輸送が行列微分方程式で与えられた。以下の連続接続からの構成では、$G$ を行列 Lie 群として扱い、格子を含む開領域上の滑らかな右主 $G$ 束と滑らかな接続を考える。

格子の直線辺を $\gamma(t)=x+t\hat\mu$、$0\le t\le a$ とする。ここで $t$ は辺に沿うパラメータ、$x$ は固定した始点であり、速度は $\dot\gamma(t)=\hat\mu$ である。連続接続がこの辺を含む領域に一つの局所表示を持つとき、$A_\mu(z)=A_z(\hat\mu)$ と書く。すると GBG14 のODEの係数は $A_{\gamma(t)}(\dot\gamma(t))=A_\mu(x+t\hat\mu)$ である。初期値問題

$$
\frac{dV}{dt}=-A_\mu(x+t\hat\mu)V(t),
\qquad V(0)=I
$$

を解き $U_{x+a\hat\mu,x}=V(a)$ とする。$V(t)$ は始点から $\gamma(t)$ までの輸送行列で、以下 $V'(t)=dV(t)/dt$ とも書く。[水平リフトの存在・一意性](../../../幾何系/GBG/GBG14/index.md#thm-gbg14-horizontal-existence) を上の滑らかな接続と直線路に適用すれば、区間全体で $V(t)\in G$ が得られる。さらに、[平行移動の合成・逆路](../../../幾何系/GBG/GBG14/index.md#thm-gbg14-transport-laws) の逆路の式から反対向きの辺の値は $V(a)^{-1}$ になる。局所表示を一つに固定できないときにも各頂点のファイバー（その点に対応する空間）に枠を選び、辺ごとの輸送をその両端の枠で表せばよい。列ベクトルの輸送としては、[GBG14 の結合束の平行移動](../../../幾何系/GBG/GBG14/index.md#def-gbg14-associated-transport) に $G\subset U(N)$ の行列表現を用いている。

例えば $G=U(1)$ で $A_1=ic$（$c$ は実定数）とする。水平ODEは $V'=-icV$、$V(0)=1$ である。候補 $V(t)=e^{-ict}$ に対し

$$
V'(t)=-ic e^{-ict}=-icV(t),\qquad V(0)=1
$$

なので、一意性によりこれが解である。従って右向き辺の値は $e^{-ica}$、左向き辺の値は $e^{ica}$ である。

一般の非可換で変化する接続では、各位置の行列が可換とは限らないので単純な積分の指数で代用しない。

次に、各頂点の枠を $k_x\in G$ によって取り替える。旧成分を $v_x$、新成分を $v'_x=k_x^{-1}v_x$ と書く（ここでプライムは微分でなく変更後の成分を表す）。$v_x=k_xv'_x$ を旧成分の輸送式 $v_y=U_{yx}v_x$ に代入すると

$$
v'_y=k_y^{-1}v_y=k_y^{-1}U_{yx}k_xv'_x.
$$

これは [GBG14 の局所輸送行列とsection変更](../../../幾何系/GBG/GBG14/index.md#prop-gbg14-local-transport) の端点公式でもある。

つまり開いた辺では両端の枠が別々に効く。本講では $g_x=k_x^{-1}$ と書き直す。これにより変換を左から作用させる記法に統一する。各頂点の群元の割当て全体を $G^\Lambda$ と書く。二つの割当ての積は各頂点で群の積を取るものとする。

<a id="def-mqfc19-vertex-gauge"></a>

<!-- formal-statement-start -->
> **定義（格子の頂点ゲージ変換）**
> 有限格子 $\Lambda$、群 $G$、格子の群値辺接続 $U\in\mathcal U$ を取る。各頂点に群元を割り当てた $g\in G^\Lambda$ に対し、変換された辺の値を

$$
(g\cdot U)_{yx}=g_yU_{yx}g_x^{-1}
$$

> と定める。$G^\Lambda$ の積は頂点ごとの群の積である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc19-vertex-gauge -->
**定義の確認**。第1節の下辺で、始点に $g_x=1$、終点に $g_y=i$、他の頂点に1を選ぶと、下辺の値は $i\cdot i\cdot1=-1$ となる。逆向きは $1\cdot(-i)\cdot(-i)=-1$ であり、正向きの逆元に一致する。正向き右辺は $1\cdot1\cdot i^{-1}=-i$、その逆辺は $i$ になる。上辺と左辺の両向きは1のままである。全て絶対値1で逆向きの条件も保つ。下辺以外をすべて固定するという変換ではない。
<!-- definition-example-end -->

単位割当て $\mathbf1$ は全頂点の値を $I$ としたものである。変換後も辺接続の条件が成り立ち、単位割当てが恒等変換になり、続けて作用させた結果が割当ての積による作用と一致するとき、群の左作用になる。

<a id="prop-mqfc19-action"></a>

<!-- formal-statement-start -->
> **命題（頂点ゲージ変換の作用則）**
> 格子の頂点ゲージ変換は $\mathcal U$ を保ち、$G^\Lambda$ の左作用となる。すなわち単位割当て $\mathbf1$ と任意の $g,h\in G^\Lambda$ に対し

$$
\mathbf1\cdot U=U,\qquad
g\cdot(h\cdot U)=(gh)\cdot U.
$$
<!-- formal-statement-end -->

核心は逆元を取ると積の順序が反転すること、二つの変換を合成すると各端点で同じ順序の群の積が生じることである。

<!-- proof-start -->
### 証明

[頂点ゲージ変換](#def-mqfc19-vertex-gauge) の右辺は群の積なので $G$ に属する。逆辺について

$$
\begin{aligned}
(g\cdot U)_{xy}
&=g_xU_{xy}g_y^{-1}\\
&=g_xU_{yx}^{-1}g_y^{-1}\\
&=(g_yU_{yx}g_x^{-1})^{-1}.
\end{aligned}
$$

従って [群値辺接続](#def-mqfc19-link) の条件を保つ。単位割当てなら全辺で $IU_{yx}I=U_{yx}$。二重変換では

$$
\begin{aligned}
(g\cdot(h\cdot U))_{yx}
&=g_yh_yU_{yx}h_x^{-1}g_x^{-1}\\
&=(g_yh_y)U_{yx}(g_xh_x)^{-1}\\
&=((gh)\cdot U)_{yx}.
\end{aligned}
$$

全ての辺で一致するので作用則が成立する。
<!-- proof-end -->

この作用は局所的な枠の違いを表現する。特に全ての辺が単位行列である配置を変換すると $U_{yx}=g_yg_x^{-1}$ となる。個々の辺が単位行列でなくても、何もない接続から枠だけを変えた可能性がある。

## 3. 路に沿った積は端点だけで変換する

路 $\gamma=(x_0,\ldots,x_n)$ は、連続する頂点が有向辺をなす列とする。$n=0$ の路も許す。同じ辺や頂点を何度通ってもよい。$x_n=x_0$ の路を閉路、始点と終点が異なる路を開路と呼ぶ。列ベクトルを $x_0$ から $x_1$ へ運び、その結果をさらに $x_2$ へ運ぶので、後から通る辺が行列積の左側に来る。

<a id="def-mqfc19-path"></a>

<!-- formal-statement-start -->
> **定義（格子路の輸送積）**
> 群値辺接続 $U$ と格子路 $\gamma=(x_0,\ldots,x_n)$ に対し

$$
H_U(\gamma)=U_{x_nx_{n-1}}\cdots U_{x_1x_0}
$$

> とする。$n=0$ のときは $H_U(\gamma)=I$ とする。逆路 $\bar\gamma$ は頂点列を逆順に並べた路である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc19-path -->
**定義の確認**。$G=SU(2)$ で二辺の輸送を順に

$$
P=\begin{pmatrix}i&0\\0&-i\end{pmatrix},
\qquad
Q=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

とする。これらは標準基底に関する輸送の行列である。第1節の判定方法を適用すると

$$
P^\dagger=-P,\quad Q^\dagger=-Q,\qquad
P^2=Q^2=-I
$$

だから $P^\dagger P=PP^\dagger=Q^\dagger Q=QQ^\dagger=I$ となる。さらに [2次行列の行列式公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) で $\det P=i(-i)=1$、$\det Q=0-1(-1)=1$。二つの条件を満たすので $P,Q\in SU(2)$ である。例えば異なる三頂点を右、上へと進む二辺にこれらを置き、他の正向き辺には $I$ を置けば、逆向き辺を逆元で補った配置が作れる。順に列ベクトル $v$ に作用させると $Q(Pv)$ となり

$$
QP=\begin{pmatrix}0&-i\\-i&0\end{pmatrix},
\qquad
PQ=\begin{pmatrix}0&i\\i&0\end{pmatrix}.
$$

従って路の輸送積は $QP$ であって $PQ$ ではない。逆向き辺には $P^{-1}=-P$ と $Q^{-1}=-Q$ を置けばよい。長さ0では単位行列がベクトルを変えない。
<!-- definition-example-end -->

<a id="thm-mqfc19-path-covariance"></a>

<!-- formal-statement-start -->
> **定理（格子路の端点変換と逆路）**
> 格子の群値辺接続 $U$、頂点ゲージ変換 $g$、始点 $x$、終点 $y$ の格子路 $\gamma$ について

$$
H_{g\cdot U}(\gamma)=g_yH_U(\gamma)g_x^{-1},
\qquad
H_U(\bar\gamma)=H_U(\gamma)^{-1}.
$$

> また、$\eta$ が $y$ から $z$ へ進む路であり、$\eta*\gamma$ が先に $\gamma$、次に $\eta$ を進む路なら

$$
H_U(\eta*\gamma)=H_U(\eta)H_U(\gamma).
$$
<!-- formal-statement-end -->

開路の内部の頂点では隣接辺の変換行列が相殺される。従って路の長さによらず、変換に残るのは両端だけである。

<!-- proof-start -->
### 証明

路の長さ $n$ が1なら [頂点ゲージ変換](#def-mqfc19-vertex-gauge) の定義そのものである。長さ0でも $g_xIg_x^{-1}=I$。長さ $n\ge1$ で端点変換が成立すると仮定し、頂点 $x_{n+1}$ を一つ追加する。[輸送積](#def-mqfc19-path) の定義から

$$
\begin{aligned}
H_{g\cdot U}(x_0,\ldots,x_{n+1})
&=(g_{x_{n+1}}U_{x_{n+1}x_n}g_{x_n}^{-1})\\
&\quad\cdot(g_{x_n}H_U(x_0,\ldots,x_n)g_{x_0}^{-1})\\
&=g_{x_{n+1}}U_{x_{n+1}x_n}
 H_U(x_0,\ldots,x_n)g_{x_0}^{-1}\\
&=g_{x_{n+1}}H_U(x_0,\ldots,x_{n+1})g_{x_0}^{-1}.
\end{aligned}
$$

従って帰納的に全ての長さで成立する。逆路の積は [逆辺の条件](#def-mqfc19-link) により

$$
H_U(\bar\gamma)=U_{x_1x_0}^{-1}\cdots U_{x_nx_{n-1}}^{-1}
=H_U(\gamma)^{-1}.
$$

合成路では $\gamma$ の全辺に続いて $\eta$ の全辺を通るので、後者の積を前者の左に掛ける。空路の場合も単位行列との積だから成立する。
<!-- proof-end -->

閉路では $x=y$ なので、端点変換は $H\mapsto g_xHg_x^{-1}$ の形になる。このように同じ可逆行列とその逆行列で挟む変換を共役という。開路では始点と終点の変換が一般に異なるため、共役とは限らない。

## 4. 最小の正方形を一周する

格子の二つの異なる方向に一辺ずつ進んで戻る最小の正方形を使えば、局所的な輸送が経路の選び方に依存するかを調べられる。連続理論で曲率を調べるために小さな閉路を考えるのに対応する。格子では有限の正方形の周回積そのものを扱う。

<a id="def-mqfc19-plaquette"></a>

<!-- formal-statement-start -->
> **定義（格子の基本正方形と周回積）**
> $x$ と整数 $1\le\mu<\nu\le d$ を選び、四頂点

$$
x_0=x,\quad x_1=x+a\hat\mu,\quad
x_2=x+a(\hat\mu+\hat\nu),\quad x_3=x+a\hat\nu
$$

> が全て有限格子に属するとする。閉路 $p=(x_0,x_1,x_2,x_3,x_0)$ を基本正方形（plaquette）とし、その周回積を

$$
U_p=U_{x_0x_3}U_{x_3x_2}U_{x_2x_1}U_{x_1x_0}
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc19-plaquette -->
**定義の確認**。第1節の正方形は $x_0=(0,0)$、$x_1=(a,0)$、$x_2=(a,a)$、$x_3=(0,a)$ である。全て格子に属し隣り合う点は最近接である。正向き下辺だけ $i$ で、他の辺は1なので

$$
U_p=1\cdot1\cdot1\cdot i=i.
$$

逆向きの周回は $-i$ になる。右へ進んでから上へ進む輸送は $i$、上へ進んでから右へ進む輸送は1であり、両者の違いが周回積に現れている。
<!-- definition-example-end -->

<a id="prop-mqfc19-plaquette"></a>

<!-- formal-statement-start -->
> **命題（基本正方形の共役変換と二経路比較）**
> 基本正方形 $p=(x_0,x_1,x_2,x_3,x_0)$ と頂点ゲージ変換 $g$ に対し、その周回積は

$$
U_p(g\cdot U)=g_{x_0}U_p(U)g_{x_0}^{-1}
$$

> と変換する。また $T_1=U_{x_2x_1}U_{x_1x_0}$、$T_2=U_{x_2x_3}U_{x_3x_0}$ とすると

$$
U_p=T_2^{-1}T_1,\qquad
U_p=I\ \Longleftrightarrow\ T_1=T_2.
$$
<!-- formal-statement-end -->

周回積が単位行列になることは、正方形の向かい側へ行く二つの最短経路の輸送が同じことと同値である。この判定は各頂点での枠の取り替えに依存しない。

<!-- proof-start -->
### 証明

[格子路の端点変換](#thm-mqfc19-path-covariance) に $\gamma=p$、始点と終点をともに $x_0$ として代入すると第1式が出る。

[逆辺の条件](#def-mqfc19-link) から

$$
\begin{aligned}
T_2^{-1}T_1
&=(U_{x_2x_3}U_{x_3x_0})^{-1}
  U_{x_2x_1}U_{x_1x_0}\\
&=U_{x_0x_3}U_{x_3x_2}U_{x_2x_1}U_{x_1x_0}
=U_p.
\end{aligned}
$$

この積が $I$ なら左から $T_2$ を掛けて $T_1=T_2$。逆に二つが等しければ $T_2^{-1}T_1=I$ である。
<!-- proof-end -->

連続接続からどのような周回積が出るかを一つ厳密に計算する。平面上で $G=U(1)$、接続形式を

$$
A=iB x\,dy
$$

とする。ここで $B$ は実定数、座標は $(x,y)$ である。$dy$ は座標 $y$ の微分で、曲線 $\gamma(\tau)=(x(\tau),y(\tau))$ の速度に作用させれば $dy(\dot\gamma(\tau))=dy(\tau)/d\tau$ ではなく、$y(\tau)$ の導関数 $dy/d\tau$ を与える。従って係数は $iB x(\tau)dy/d\tau$ となる。左下が原点の正方形を反時計回りに回る。

[GBG14 の局所輸送行列とsection変更](../../../幾何系/GBG/GBG14/index.md#prop-gbg14-local-transport) のODEを各辺に適用する。各辺を $\tau\in[0,a]$ で表す。水平辺では $dy/d\tau=0$ なので輸送は1。右辺は $(x(\tau),y(\tau))=(a,\tau)$ であり、$dy/d\tau=1$ を代入すると $V'(\tau)=dV(\tau)/d\tau=-iBaV(\tau)$ となる。第2節と同じ定数係数の初期値問題で、解は $V(\tau)=e^{-iBa\tau}$ である。従って終点の輸送は

$$
V(a)=e^{-iBa^2}.
$$

左辺は $x=0$ なので下向き輸送も1である。従って

$$
U_p=e^{-iBa^2}.
$$

$B$ は面積当たりの位相変化を表す。$a\to0$ で $U_p\to1$ だが、面積 $a^2$ に対する変化率を調べる。$h=a^2$ と置けば $h\to0+$ であり、実変数 $h$ に関する関数 $e^{-iBh}$ の $h=0$ での微分から

$$
\lim_{a\to0}\frac{U_p-1}{a^2}=-iB
$$

となり、面積で割ると情報が残る。一般の非可換接続での小正方形の展開と作用の規格化は MQFC21 で扱う。

## 5. 閉路から不変な数を取り出す

閉路の輸送は共役で変化するため、行列の個々の成分をそのまま観測量にすると枠に依存し得る。連続理論の [表現に関する Wilson loop](../../../幾何系/GBG/GBG17/index.md#def-gbg17-wilson-loop) と同じ発想でトレース（行列の対角成分の和）を取る。本講では群が既に $N$ 次ユニタリ行列として与えられているので、その行列表現を使用し、規格化係数 $1/N$ を入れる。

<a id="def-mqfc19-wilson"></a>

<!-- formal-statement-start -->
> **定義（格子 Wilson loop）**
> $G\subset U(N)$ の群値辺接続 $U$ と有限の閉じた格子路 $\gamma$ に対し、規格化した Wilson loop を

$$
W_\gamma(U)=\frac{1}{N}\operatorname{tr}H_U(\gamma)
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc19-wilson -->
**定義の確認**。第4節の正方形で下辺を $\operatorname{diag}(i,-i)$、他の正向き辺を $I$ とする。逆向きはそれぞれ逆行列を与える。下辺の行列は第3節の $P$ であり、そこで確かめたユニタリ性と行列式1の条件を満たす。他の辺は $I$ とその逆元なので、全辺が $SU(2)$ に属する。周回積と規格化トレースは

$$
H_U(p)=\operatorname{diag}(i,-i),\qquad W_p=\frac{i-i}{2}=0.
$$

長さ0の閉路では $W=2/2=1$ である。規格化しない GBG17 の定義ではそれぞれ0と2になる。
<!-- definition-example-end -->

<a id="thm-mqfc19-wilson-invariance"></a>

<!-- formal-statement-start -->
> **定理（格子 Wilson loop の不変性）**
> $G\subset U(N)$ の任意の群値辺接続、閉路 $\gamma$、頂点ゲージ変換 $g$ に対し

$$
W_\gamma(g\cdot U)=W_\gamma(U),\qquad
W_{\bar\gamma}(U)=\overline{W_\gamma(U)},\qquad
|W_\gamma(U)|\le1.
$$

> また同じ閉路の始点を頂点列に沿って巡回移動しても $W$ は変わらない。
<!-- formal-statement-end -->

ゲージ変換や始点の巡回移動は行列積を共役で変える。逆向きの閉路では逆行列が現れるため、ユニタリ行列なら複素共役になる。従って向きが変わっても実部は同じだが、複素数そのものが同じとは限らない。

<!-- proof-start -->
### 証明

閉路の始点を $x$ とすると [格子路の端点変換](#thm-mqfc19-path-covariance) から $H_{g\cdot U}=g_xH_Ug_x^{-1}$。 [閉 Wilson loop のゲージ不変性](../../../幾何系/GBG/GBG17/index.md#thm-gbg17-gauge-invariance) の証明で得たトレースの共役不変性をこの $N$ 次行列に適用すると

$$
\frac{\operatorname{tr}(g_xH_Ug_x^{-1})}{N}
=\frac{\operatorname{tr}(H_Ug_x^{-1}g_x)}{N}
=W_\gamma(U).
$$

[格子路の端点変換と逆路](#thm-mqfc19-path-covariance) の逆路の式より $H_U(\bar\gamma)=H_U(\gamma)^{-1}$。$H_U$ は群 $G\subset U(N)$ の元の積なのでユニタリ行列であり、第1節で確認したように逆は共役転置である。これは [GBG17 の逆向き Wilson loop](../../../幾何系/GBG/GBG17/index.md#prop-gbg17-reversal) と同じ機構である。対角成分を足して

$$
\frac{1}{N}\operatorname{tr}(H_U^\dagger)
=\frac{1}{N}\sum_{j=1}^N\overline{(H_U)_{jj}}
=\overline{W_\gamma(U)}.
$$

第 $j$ 列のノルムは1、すなわち $\sum_{k=1}^N |(H_U)_{kj}|^2=1$ なので、その非負の一項 $|(H_U)_{jj}|^2$ は1以下である。三角不等式を使うと

$$
|W_\gamma(U)|\le\frac{1}{N}\sum_{j=1}^N |(H_U)_{jj}|\le1.
$$

閉路を始点 $x$ から途中の頂点 $y$ までの路 $\alpha$ と、そこから戻る路 $\beta$ に分ける。[格子路の端点変換と逆路](#thm-mqfc19-path-covariance) の合成則から、始点をそれぞれ $x,y$ とした積は

$$
H_x=H_U(\beta)H_U(\alpha),\qquad
H_y=H_U(\alpha)H_U(\beta).
$$

従って

$$
H_U(\alpha)H_xH_U(\alpha)^{-1}
=H_U(\alpha)H_U(\beta)=H_y.
$$

[トレースの共役不変性](../../../幾何系/GBG/GBG17/index.md#thm-gbg17-gauge-invariance) により値は変化しない。任意の頂点への巡回移動がこの分割で表せる。
<!-- proof-end -->

開路では不変性が壊れる。例えば $G=U(1)$ である辺の値が1、始点の変換が1、終点の変換が $i$ なら変換後のトレースは $i$ である。閉路のように両端で同じ変換が現れないことが原因である。

逆に、閉路でゲージ不変なことは、経路を自由に変えても不変という意味ではない。第4節の $U_p=i$ の正方形では $W_p=i$、空路では1となる。正方形を潰す操作は枠の取り替えではない。

次講では $G$ 上の積分を作る。さらに MQFC21 では、例えば各基本正方形について $1-\operatorname{Re}W_p$ を足した量を作用に用いる。この量は [格子 Wilson loop の不変性](#thm-mqfc19-wilson-invariance) によりゲージ不変で、各項は0以上2以下である。有限格子での不変性は格子間隔の大小によらず厳密である。一方、この段階ではまだ確率測度も連続極限も構成しておらず、相関減衰や質量ギャップについては別の評価が必要になる。

## 6. 演習

### 演習 MQFC19-A1：逆向きの辺と変換

- Level: A

$G=U(1)$、辺 $x\to y$ の値を $e^{i\pi/3}$ とし、$g_x=e^{i\pi/6}$、$g_y=e^{-i\pi/6}$ とする。変換前後の逆辺を求め、逆元の条件を確認せよ。

<!-- solution-start -->
**詳細解答**

[群値辺接続](#def-mqfc19-link) より旧逆辺は $e^{-i\pi/3}$。[頂点ゲージ変換](#def-mqfc19-vertex-gauge) を正向きに適用すると

$$
U'_{yx}=e^{-i\pi/6}e^{i\pi/3}e^{-i\pi/6}=1.
$$

逆向きに適用すると

$$
U'_{xy}=e^{i\pi/6}e^{-i\pi/3}e^{i\pi/6}=1.
$$

従って $U'_{xy}=(U'_{yx})^{-1}$。終点と始点を入れ替えることで指数の符号が反対になる。
<!-- solution-end -->

### 演習 MQFC19-A2：独立な辺の個数

- Level: A

二次元で $L_1=2,L_2=3$ の長方形格子を取る。正向き辺の本数、全有向辺の本数、基本正方形の個数を求めよ。

<!-- solution-start -->
**詳細解答**

横方向には3列の点、縦方向には4行の点がある。横向きの辺は各行2本なので8本。縦向きの辺は各列3本なので9本。[群値辺接続](#def-mqfc19-link) の独立座標は正向き辺だけであり、合計17個の群元である。

逆向きも数えれば $2(8+9)=34$ 本。[基本正方形の定義](#def-mqfc19-plaquette) によれば左下の頂点を横2通り、縦3通りから選べるので6個。境界の外へつなぐ辺を加えないため、横方向の辺を3本と数えないことに注意する。
<!-- solution-end -->

### 演習 MQFC19-A3：向きと積の順序

- Level: A

$G=SU(2)$ で第3節の行列 $P,Q$ をこの順で進む路の二辺の値とする。逆路の輸送積を計算し、元の輸送積と掛けて単位行列になることを確認せよ。

<!-- solution-start -->
**詳細解答**

[格子路の輸送積](#def-mqfc19-path) は $QP$。[逆辺の条件](#def-mqfc19-link) と第3節で計算した $P^2=Q^2=-I$ より、逆路ではまず $Q^{-1}=-Q$、次に $P^{-1}=-P$ が作用するため

$$
H_U(\bar\gamma)=(-P)(-Q)=PQ
=\begin{pmatrix}0&i\\i&0\end{pmatrix}.
$$

順路は $\begin{pmatrix}0&-i\\-i&0\end{pmatrix}$ なので

$$
H_U(\bar\gamma)H_U(\gamma)
=\begin{pmatrix}i(-i)&0\\0&i(-i)\end{pmatrix}
=I.
$$

行列の積を逆にするだけでは一般に逆行列にはならない。今回は両行列の逆元がそれぞれ負号付きなので偶然二つの負号が打ち消されている。
<!-- solution-end -->

### 演習 MQFC19-A4：基本正方形の位相

- Level: A

反時計回りの正方形で、正向き下辺、右辺、上辺、左辺の値をそれぞれ $e^{i\alpha},e^{i\beta},e^{i\delta},e^{i\epsilon}$ とする。上辺は左から右、左辺は下から上を正向きとする。$G=U(1)$ として周回積と逆向き Wilson loop を求めよ。

<!-- solution-start -->
**詳細解答**

上辺と左辺は反時計回りでは逆向きに通る。[基本正方形の周回積](#def-mqfc19-plaquette) に従うと

$$
U_p=e^{-i\epsilon}e^{-i\delta}e^{i\beta}e^{i\alpha}
=e^{i(\alpha+\beta-\delta-\epsilon)}.
$$

$N=1$ なので [格子 Wilson loop](#def-mqfc19-wilson) は $U_p$ 自身である。[格子 Wilson loop の不変性](#thm-mqfc19-wilson-invariance) の逆路の式により

$$
W_{\bar p}=e^{-i(\alpha+\beta-\delta-\epsilon)}.
$$

例えば $\alpha=\pi/2$、残り0なら正向き $i$、逆向き $-i$ となる。
<!-- solution-end -->

### 演習 MQFC19-B1：開路の内部で変換が消える理由

- Level: B

四頂点 $x_0,x_1,x_2,x_3$ をこの順に進む路で、辺の値を順に $A,B,C\in G$ とする。頂点変換を $g_j\in G$ として輸送積を展開せよ。$g_0=g_3=I$ の場合と、$g_0\ne g_3$ の場合の違いを説明せよ。

<!-- solution-start -->
**詳細解答**

[頂点ゲージ変換](#def-mqfc19-vertex-gauge) で各辺を変換し、行列積を通過順と逆に書く。

$$
\begin{aligned}
H'&=(g_3Cg_2^{-1})(g_2Bg_1^{-1})(g_1Ag_0^{-1})\\
&=g_3C(g_2^{-1}g_2)B(g_1^{-1}g_1)Ag_0^{-1}\\
&=g_3CBAg_0^{-1}.
\end{aligned}
$$

元の輸送は $H=CBA$ なので [格子路の端点変換と逆路](#thm-mqfc19-path-covariance) の端点変換が具体的に確認できた。両端を $g_0=g_3=I$ とすれば、内部の変換にかかわらず $H'=H$ となる。

異なる端点変換では一般には共役ではない。例えば $G=U(1)$ として

$$
A=B=C=I,\qquad g_0=1,\qquad g_3=i
$$

を代入すれば $H'=i$ となり、もとのトレース1から変化する。
<!-- solution-end -->

### 演習 MQFC19-B2：枠だけを変えた配置

- Level: B

各頂点に $h_x\in G$ を任意に与え、辺に $U_{yx}=h_yh_x^{-1}$ を置く。これが群値辺接続になること、全閉路で Wilson loop が1になることを示せ。個々の辺が1である必要はあるか。

<!-- solution-start -->
**詳細解答**

各辺は群の積なので群に属する。[逆辺の条件](#def-mqfc19-link) は

$$
U_{xy}=h_xh_y^{-1}=(h_yh_x^{-1})^{-1}
$$

により成立する。全辺が $I$ の配置を $U^0$ と書くと [頂点ゲージ変換](#def-mqfc19-vertex-gauge) の定義から $U=h\cdot U^0$ である。[格子 Wilson loop の不変性](#thm-mqfc19-wilson-invariance) により $W_\gamma(U)=W_\gamma(U^0)$。後者の輸送積は単位行列の積なので

$$
W_\gamma(U)=\frac{\operatorname{tr}I}{N}=1.
$$

$G=U(1)$、$h_x=1,h_y=i$ なら $U_{yx}=i$ なので個々の辺は1である必要がない。辺の値が1からずれることと、閉路の輸送が非自明になることは異なる。
<!-- solution-end -->

### 演習 MQFC19-B3：非可換な正方形

- Level: B

第3節の $P,Q\in SU(2)$ を用い、正向きの下辺と上辺に $P$、左辺と右辺に $Q$ を置く。第4節の二経路の輸送積 $T_1,T_2$、周回積、規格化 Wilson loop を求めよ。

<!-- solution-start -->
**詳細解答**

下辺から右辺へ進むと $T_1=QP$、左辺から上辺へ進むと $T_2=PQ$。[格子路の輸送積の直接例](#def-mqfc19-path) から $PQ=-QP$ であり、どちらも可逆である。[基本正方形の二経路比較](#prop-mqfc19-plaquette) から

$$
U_p=T_2^{-1}T_1=(PQ)^{-1}(-PQ)=-I.
$$

従って [格子 Wilson loop](#def-mqfc19-wilson) は $(-1-1)/2=-1$。対応する向きの対辺に同じ行列を置いていても周回積が1とは限らない。可換群なら $PQ=QP$ となり、この配置での周回積は1になる。
<!-- solution-end -->

### 演習 MQFC19-B4：開路のトレースと不変量

- Level: B

$G=U(N)$ で開路の輸送積が $H$ であるとする。始点と終点が異なるとき、任意の $H\in G$ に対して輸送積を $I$ に変換する頂点ゲージ変換を一つ構成せよ。この操作を非単位の閉路積にも適用できるか。

<!-- solution-start -->
**詳細解答**

始点を $x$、終点を $y$ とする。$x\ne y$ だから $g_x=I,g_y=H^{-1}$ を独立に選べる。他の頂点には $I$ を置く。[格子路の端点変換](#thm-mqfc19-path-covariance) から

$$
H'=g_yHg_x^{-1}=H^{-1}HI=I.
$$

閉路では $x=y$ なので $g_x$ と $g_y$ は独立に選べない。もし $g_xHg_x^{-1}=I$ なら両側から逆の変換を掛けて

$$
H=g_x^{-1}Ig_x=I
$$

となる。従って非単位の閉路積を枠の変更だけで $I$ にすることは不可能である。
<!-- solution-end -->

### 演習 MQFC19-B5：連続接続から格子の辺を作る

- Level: B

$G=U(1)$、平面上の接続形式を $A=iB x\,dy$ とする。$B$ は実定数である。左下が $(s,t)$、辺長 $a>0$ の正方形の4辺について反時計回りの輸送を求めよ。$s$ に依存する辺の値と、周回積の $s$ への依存性を区別せよ。

<!-- solution-start -->
**詳細解答**

[局所輸送のODE](../../../幾何系/GBG/GBG14/index.md#prop-gbg14-local-transport) に各辺の位置と速度を代入する。各辺のパラメータを $\tau\in[0,a]$ とする。$s,t$ は固定した左下頂点の座標であり、ここでは $V'=dV/d\tau$ である。下辺と上辺では $dy/d\tau=0$ なので微分方程式は $V'=0$、$V(0)=1$ であり、輸送は1となる。

右辺では $(x,y)=(s+a,t+\tau)$ だから

$$
V'(\tau)=-iB(s+a)V(\tau),\qquad
V(\tau)=e^{-iB(s+a)\tau}.
$$

左辺では $(x,y)=(s,t+a-\tau)$、$dy/d\tau=-1$ だから

$$
V'(\tau)=iBsV(\tau),\qquad
V(\tau)=e^{iBs\tau}.
$$

両方の候補を $\tau$ で微分すればそれぞれのODEを満たし、$\tau=0$ では1、絶対値は常に1である。[平行移動の逆路公式](../../../幾何系/GBG/GBG14/index.md#thm-gbg14-transport-laws) によれば、各辺を逆向きに進む輸送は元の輸送の逆元になる。

[基本正方形の周回積](#def-mqfc19-plaquette) に従って4辺を掛けると

$$
U_p=e^{iBsa}\cdot1\cdot e^{-iB(s+a)a}\cdot1
=e^{-iBa^2}.
$$

縦辺の輸送は一般に $s$ に依存するが、周回積には $s$ も $t$ も残らない。$a$ を半分にすると位相 $-Ba^2$ は4分の1になる。面積当たりの位相が保たれるという第4節の結果を別の位置でも確認できた。
<!-- solution-end -->

### 演習 MQFC19-C1：隣り合う二つの正方形

- Level: C

$G=U(N)$ とし、横に並ぶ二つの正方形を考える。下段の頂点を左から $A,B,C$、上段を $D,E,F$ と書く。左正方形の反時計回り閉路を $p=(A,B,E,D,A)$、右正方形を $q=(B,C,F,E,B)$、外周を $r=(A,B,C,F,E,D,A)$ とする。辺の値を $U_{yx}$ とする。

1. $q$ の周回積を $A$ を始点とする輸送に直すため、先に $A\to B$ を進み、最後に $B\to A$ へ戻る閉路を考え、その積を求めよ。
2. この閉路と $p$ の輸送積の適切な積が外周 $r$ の輸送積に等しいことを示せ。
3. $G=U(1)$、$U_p=e^{i\alpha}$、$U_q=e^{i\beta}$ なら $W_r$ を求めよ。一般の $U(N)$ では $W_r=W_pW_q$ が成立するか。

<!-- solution-start -->
**詳細解答**

$S=U_{BA}$ と置く。[逆辺の条件](#def-mqfc19-link) から $U_{AB}=S^{-1}$。[輸送積の合成則](#thm-mqfc19-path-covariance) によって、先に $A\to B$、次に $q$、最後に $B\to A$ の積は

$$
K=S^{-1}U_qS.
$$

正方形の積を展開すると

$$
U_p=U_{AD}U_{DE}U_{EB}S,\qquad
U_q=U_{BE}U_{EF}U_{FC}U_{CB}.
$$

ここで添字は行き先が先である。先に $A$ に始点を移した右正方形を回り、次に左正方形を回る積 $U_pK$ を計算する。

$$
\begin{aligned}
U_pK
&=U_{AD}U_{DE}U_{EB}SS^{-1}U_qS\\
&=U_{AD}U_{DE}U_{EB}U_{BE}\\
&\qquad\cdot U_{EF}U_{FC}U_{CB}S\\
&=U_{AD}U_{DE}U_{EF}U_{FC}U_{CB}U_{BA}\\
&=H_U(r).
\end{aligned}
$$

途中の共有辺は $U_{EB}U_{BE}=I$ として消える。非可換な場合は積の順序と、始点を揃える共役の両方が必要である。

$U(1)$ なら $K=U_q$ であり、[格子 Wilson loop](#def-mqfc19-wilson) の規格化は $N=1$ だから

$$
W_r=e^{i(\alpha+\beta)}=W_pW_q.
$$

一般にはトレースは積を保存しない。具体的に $N=2$、下辺 $A\to B$ と共有辺を含め全ての正向き辺を $I$ にしてから、上辺 $D\to E$ と $E\to F$ だけを $P=\operatorname{diag}(i,-i)$ に変更する。両上辺を逆向きに通るので $U_p=P^{-1}$、$U_q=P^{-1}$、$S=I$ となる。第3節で確かめた $P^2=-I$ より $P^{-1}=-P$ である。

$$
W_p=W_q=0,\qquad
H_U(r)=P^{-2}=-I,\qquad W_r=-1.
$$

従って $W_pW_q=0$ と $W_r=-1$ は一致しない。共有辺の相殺は行列積の性質であり、トレースの積に置き換えることはできない。
<!-- solution-end -->

## 7. 次の講義

辺の値を群元として持つことで、格子間隔を有限に保ったまま局所的な枠の取り替えを厳密に扱えた。次講 MQFC20 では、辺の値を積分するための Haar 積分と行列表現の直交関係を学ぶ。
