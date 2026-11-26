# VNP14 F：overlapping windows・固定点集合の角度・一様Poincaré F.6

前講の[上単位三角群の平均長さ評価](../VNP13/index.md#thm-vnp13-weak-length)は、定数が群のサイズとともに増えることを許していました。今回はその増大が二次より遅いという情報を利用し、群の大きさに依存しない定数に改善します。大きな群を重なる小区間に分け、各部分群で不動な点への射影を平均するのが鍵です。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), Appendix F.2–F.3, pp.39–41。以下は収縮仮説の下での議論です。[VNP7](../VNP7/index.md)の完備化と距離幾何の道具、[VNP13](../VNP13/index.md)の群の評価を用います。

## 1. 区間部分群と固定点

正整数 $h$ に対し $U_h$ を[上単位三角群](../VNP13/index.md#def-vnp13-unitriangular)とします。行列の係数は二元体 $\mathbb F_2$、距離は実数です。添字は $0,\ldots,h-1$、$I=I_h$ は単位行列（群の単位元 $e$）、$E_{ij}$ は位置 $(i,j)$ だけが1の行列単位、$x_j=I+E_{j,j+1}$ は隣接操作です。以下、有限集合上の $\mathbb E$ は一様平均を表します。

$U_h$ が非空完備CAT(0)空間 $(Z,d)$ に[等長群作用](../../../幾何系/NPCG/NPCG9/index.md#def-npcg9-isometric-action)をするとは、各群要素が全単射を与え、距離を保ち、次の作用の条件を満たすことです。

$$
ez=z,\qquad (gk)z=g(kz)\qquad(g,k\in U_h).
$$

行列全体を一度に動かす代わりに、一部分の座標だけを動かす部分群を考えます。その作用で変化しない点を集めた[共通固定点集合](../../../幾何系/NPCG/NPCG9/index.md#def-npcg9-common-fixed-set)を考えると、元の点をその集合へ最短距離で移動できます。

<a id="def-vnp14-window"></a>

<!-- formal-statement-start -->
> **定義（区間部分群と固定点集合）**
>
> 正整数 $h$ に対し、二元体上の上単位三角群 $U_h$ が非空完備CAT(0)空間 $(Z,d)$ に等長作用するとする。整数 $0\le p<q\le h$ に対し、$W[p,q)$ を $U_h$ のうち行・列がともに $p,\ldots,q-1$ に属する成分以外は単位行列と一致する行列の集合とする。
> $U_h$ の等長作用が与えられたとき、
>
$$
F[p,q)=\{z\in Z:\ gz=z\ \text{for all }g\in W[p,q)\}
$$
>
> を区間部分群の固定点集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp14-window -->
**定義の確認**：区間外で単位行列と一致する条件は、対角ブロック表示では次の形になることと同値です。区間内のブロック $B$ は $U_{q-p}$ に属します。

$$
g=\operatorname{diag}(I_p,B,I_{h-q}).
$$

端の大きさが0のブロックは省きます。二つのこの形の行列の積の中央ブロックは $BB'$、逆行列の中央ブロックは $B^{-1}$ です。[上単位三角群](../VNP13/index.md#def-vnp13-unitriangular)の閉性と逆元の性質から、どちらも同じ形を保ちます。中央ブロックが単位行列なら全体も単位元です。ブロックを取り出す写像は積を保ち、逆にそのブロックを埋め込めるので $W[p,q)\cong U_{q-p}$ です。三次の群では区間内で自由な非対角成分がそれぞれ $(0,1)$ と $(1,2)$ の一つずつで、係数は0か1です。従って

$$
W[0,2)=\{e,x_0\},\qquad W[1,3)=\{e,x_1\}.
$$

実数直線上の作用を $gz=(-1)^{g_{01}}z$ と定めます。指数は二元体の元を整数0または1として読みます。積の $(0,1)$ 成分は

$$
(gk)_{01}=g_{00}k_{01}+g_{01}k_{11}=k_{01}+g_{01}
$$

です（右辺の和は二元体上）。従って $(-1)^{(gk)_{01}}=(-1)^{g_{01}}(-1)^{k_{01}}$ となり、作用の積条件が成立します。$e_{01}=0$ なので単位元条件も成立し、各写像は自身が逆写像で、$|gz-gw|=|z-w|$ を満たします。

前者の固定点は $-z=z$ より $\{0\}$、後者は全点を固定するので $\mathbb R$ です。この例は区間と固定点の例であり、収縮条件は仮定していません。
<!-- definition-example-end -->

区間部分群は隣接生成元 $x_p,\ldots,x_{q-2}$ で生成されます。実際 $T_{ij}=I+E_{ij}$ とおくと、$i<j<k$ のとき標数2で

$$
T_{ij}T_{jk}T_{ij}T_{jk}=I+E_{ik}.
$$

ここで $E_{ij}E_{jk}=E_{ik}$、逆順の積 $E_{jk}E_{ij}=0$ であり、$E_{ij}^2=E_{jk}^2=0$ です。最初の二因子の積は $I+E_{ij}+E_{jk}+E_{ik}$、第三因子を掛けると $I+E_{jk}+E_{ik}$、第四因子を掛けると $I+E_{ik}$ になります。添字差 $k-i$ の帰納法では差1が $x_i$、差2以上では $j=k-1$ とすれば短い差の $T_{ij}$ と隣接操作 $T_{jk}$ から $T_{ik}$ が得られます。

任意の上単位三角行列は、成分 $(i,j)$ が1なら行 $j$ を行 $i$ に加える左乗算 $T_{ij}$ により、列の昇順に消去できます。行 $j$ は列 $j$ より左で0なので以前の列を変えません。最後は単位行列であり、消去を逆順に戻せば生成が従います。

従って重なる二つの区間の生成元の和集合が大区間の生成元を尽くせば、固定点集合の共通部分は大区間の固定点集合になります。座標が互いに素な区間の行列は別々の対角ブロックに作用するので可換です。

[共通固定点集合の閉性と測地線凸性](../../../幾何系/NPCG/NPCG9/index.md#thm-npcg9-fixed-set-closed-convex)により固定点集合は閉凸です。各 $g$ の固定点集合は連続性で閉じ、固定点を結ぶ測地線は等長性と[測地線分の一意性](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-unique-geodesic)により点ごとに固定されるからです。非空性は[有限群の共通固定点定理](../../../幾何系/NPCG/NPCG9/index.md#thm-npcg9-finite-group-fixed-point)から得られます。作用で軌道を並べ替えても二乗距離和は変わらず、唯一の最小点は固定されます。そこで[距離射影の存在と一意性](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-projection-existence)により、$P_{[p,q)}z$ を $F[p,q)$ への最近点とします。[不変閉凸集合への射影の等変性](../../../幾何系/NPCG/NPCG9/index.md#thm-npcg9-projection-equivariance)を適用すると、可換な区間の一方の固定点集合への射影は他方の固定点を保ちます。実際、他方の各元は射影先を集合として保つ等長写像なので、最近点の一意性から射影と可換です。

[有限加重重心](../../../幾何系/NPCG/NPCG8/index.md#def-npcg8-weighted-barycenter)は、点への二乗距離の加重和を最小にする点です。以下は等重みを用い、同じ点が複数回現れても添字ごとに数えます。[有限加重重心の存在と一意性](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-barycenter-existence)により、この空間では非空有限列の重心が一意に定まります。

以下、各 $z\in Z$ の長さ $L_z(g)=d(z,gz)$ が前講の[群の収縮長さ関数](../VNP13/index.md#def-vnp13-length)であり、収縮パラメータ $\mu,s$ は全 $z$ で共通と仮定します。$\delta_j(z)=d(z,x_jz)$ と書きます。

<a id="lem-vnp14-local-projection"></a>

<!-- formal-statement-start -->
> **補題（区間への局所射影評価）**
>
> 非空完備CAT(0)空間 $Z$ への $U_h$ の等長作用で、各軌道長さが共通の $\mu,s$ で収縮すると仮定する。$n=q-p$ とすると
>
$$
d(z,P_{[p,q)}z)^2\le C(n)\sum_{j=p}^{q-2}\delta_j(z)^2,
\qquad C(n)=n\vartheta_n^2=o(n^2),
$$
>
> ここで $\vartheta_n$ は前講の群の平均長さ評価の定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限列 $(gz)_{g\in W[p,q)}$ の等重み重心を $b$ とします。[有限群の共通固定点定理](../../../幾何系/NPCG/NPCG9/index.md#thm-npcg9-finite-group-fixed-point)により $b\in F[p,q)$ です。[分散不等式](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-variance-inequality)を第三点 $z$ に適用し、非負の重心での分散を捨てれば

$$
d(z,P_{[p,q)}z)^2\le d(z,b)^2\le \mathbb E_{g\in W[p,q)}L_z(g)^2.
$$

区間への制限は収縮を保ちます。任意の行列加法群から区間への準同型を包含と合成すれば元の条件を適用できるためです。[上単位三角群の平均長さ評価](../VNP13/index.md#thm-vnp13-weak-length)を区間の $U_n$ に適用し、二乗して有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使うと

$$
\mathbb E_g L_z(g)^2\le \vartheta_n^2
\left(\sum_{j=p}^{q-2}\delta_j(z)\right)^2
\le n\vartheta_n^2\sum_{j=p}^{q-2}\delta_j(z)^2.
$$

同じパラメータで $n\vartheta_n^2/n^2\to0$ です。$n=1$ では区間が自明で両辺が0になります。
<!-- proof-end -->

## 2. 重なる区間の射影（F.4）

長さ $2u$ の区間を $u$ ずつずらすと、その和集合は長さ $3u$ になります。一方で固定される点をもう一方へ射影した距離が、共通固定点までの距離に近いことを示します。そのため区間の左端を一座標ずつ移動させ、各中間点の変位を平均します。

<a id="lem-vnp14-overlap"></a>

<!-- formal-statement-start -->
> **補題（重なる区間の射影）**
>
> 非空完備CAT(0)空間への $U_h$ の等長作用で、各軌道長さが共通の収縮パラメータを持つとする。第1節の定数 $C(n)$ に対し、整数 $u\ge2,\ p\ge0,\ p+3u\le h$ と実数 $\zeta\ge0$ が
>
$$
4C(3u)\le\zeta^2(u-1)^2
$$
>
> を満たすとする。$a\in F[p,p+2u)$、$R=d(a,P_{[p,p+3u)}a)$ に対して
>
$$
d(a,P_{[p+u,p+3u)}a)\ge(1-\zeta)R.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

添字を $p$ だけ平行移動して $p=0$ と書きます。$b_k=P_{[k,3u)}a$ ($u\le k<2u$) とします。固定点集合は $k$ が増えると広がるので、$d(a,b_k)\le d(a,b_u)\le R$ です。

$u<k<2u$ とします。以下、生成元の添字 $j$ は大区間内の $0\le j\le3u-2$ に限ります。$j\ge k$ の生成元は射影先の部分群に属し、$b_k$ を固定します。

$j\le k-2$ の生成元は区間と座標が互いに素で、$a$ を固定します。前節の可換性と[不変閉凸集合への射影の等変性](../../../幾何系/NPCG/NPCG9/index.md#thm-npcg9-projection-equivariance)により $b_k$ も固定します。

残る $x_{k-1}$ は $b_{k-1}$ を固定しますから、等長性で

$$
\delta_{k-1}(b_k)\le
d(b_k,b_{k-1})+d(x_{k-1}b_{k-1},x_{k-1}b_k)
=2d(b_k,b_{k-1}).
$$

$b_{k-1}\in F[k,3u)$ なので、[射影のPythagoras型不等式](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-pythagorean)を $a,b_k,b_{k-1}$ に適用して

$$
d(b_k,b_{k-1})^2\le d(a,b_{k-1})^2-d(a,b_k)^2.
$$

$u<k<2u$ の $u-1$ 個の点の重心を $\bar b$ とします。[重心の等変性](../../../幾何系/NPCG/NPCG9/index.md#thm-npcg9-barycenter-equivariance)によって移動後の重心は移動後の点の重心です。[重心の安定性](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-barycenter-stability)により各生成元の変位は対応する点の変位の平均以下です。各 $j$ について動く可能性がある点は $b_{j+1}$ 一つだけです。従って

$$
\begin{aligned}
\sum_{j=0}^{3u-2}\delta_j(\bar b)^2
&\le\frac4{(u-1)^2}\sum_{k=u+1}^{2u-1}
\bigl(d(a,b_{k-1})^2-d(a,b_k)^2\bigr)\\
&=\frac4{(u-1)^2}\bigl(d(a,b_u)^2-d(a,b_{2u-1})^2\bigr)\\
&\le\frac{4R^2}{(u-1)^2}.
\end{aligned}
$$

[区間への局所射影評価](#lem-vnp14-local-projection)と $\zeta$ の仮定を使えば

$$
d(\bar b,P_{[0,3u)}\bar b)\le\zeta R.
$$

また全点が $a$ の半径 $d(a,b_u)$ の球内にあるので、[重心の安定性](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-barycenter-stability)を全点が $a$ の組と比較して

$$
d(a,\bar b)\le d(a,b_u).
$$

$P_{[0,3u)}\bar b$ は共通固定点集合の点です。$R$ はその集合への最短距離ですから、この点までの距離以下です。その距離を三角不等式で評価します。

$$
R\le d(a,P_{[0,3u)}\bar b)
\le d(a,b_u)+\zeta R.
$$

これを移項すれば結論です。
<!-- proof-end -->

$u=2$ の場合は $b_3$ 一点だけを平均し、その点が動く可能性がある生成元は $x_2$ だけです。$u$ が増えると異なる生成元への変位が分散され、二乗和には $(u-1)^{-2}$ が現れます。$C(3u)=o(u^2)$ がちょうどこの分散効果と組み合わさります。

## 3. 二つの固定点集合の距離比較（F.5）

Euclid平面の直交する二直線への射影では、射影点間の二乗距離は二つの射影距離の平方和です。一般のCAT(0)空間でも、前節の距離評価から直交に近い比較を得られます。角度そのものを定義せず、二乗距離の不等式として証明します。[距離射影](../../../幾何系/NPCG/NPCG7/index.md#def-npcg7-metric-projection)の記法で $d(y,C)=\inf_{w\in C}d(y,w)$、$P_Cy$ は最近点です。空でない閉凸集合 $C$ についてここでは $d(y,C)=d(y,P_Cy)$ が成り立ちます。

<a id="lem-vnp14-angle"></a>

<!-- formal-statement-start -->
> **補題（固定点集合のほぼ直交する射影）**
>
> 非空完備CAT(0)空間の非空閉凸集合 $F,F'$ の共通部分 $S$ が非空であり、全 $y\in F$ について $d(y,F')\ge(1-\zeta)d(y,S)$ と仮定する。ただし $0\le\zeta\le1$、$c>0$、$1-c^2\le(1-\zeta)^2$ とする。任意の $z$ に対し $a=P_Fz,\ a'=P_{F'}z$ とおくと
>
$$
d(a,a')^2\le d(z,a)^2+d(z,a')^2+2c\,d(z,a)d(z,a').
$$
<!-- formal-statement-end -->

[重なる区間の射影](#lem-vnp14-overlap)を $F=F[p,p+2u),F'=F[p+u,p+3u)$ に適用できます。生成元が全区間を尽くすため $S=F[p,p+3u)$ です。

<!-- proof-start -->
### 証明

$v=P_Sa$ とし、次の五つの距離を置きます。

$$
r=d(z,a),\quad r'=d(z,a'),\quad
\alpha=d(v,a),\quad \beta=d(v,a'),\quad D=d(a,a').
$$

$r=0$ または $r'=0$ なら $D$ は他方の射影距離に等しいです。

$\alpha=0$ なら $a=v\in F'$ なので[射影のPythagoras型不等式](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-pythagorean)により $D^2\le r^2-r'^2$ です。

$\beta=0$ なら $a'=v\in F$ で $D^2\le r'^2-r^2$ です。以後四つの距離 $r,r',\alpha,\beta$ はすべて正とします。

まず $D^2\ge\alpha^2+\beta^2-2c\alpha\beta$ を示します。$[v,a]$ は $v$ から $a$ への一意な測地線分を表し、その比率 $\sigma$ の点 $q$ は $d(v,q)=\sigma\alpha$ を満たします。同様に $q'$ を $[v,a']$ の比率 $\sigma'$ の点とします。$0<\sigma,\sigma'\le1$ かつ $\sigma'\beta=c\sigma\alpha$ となるよう $\sigma$ を十分小さく選びます。$q\in F,q'\in F'$ です。任意の $w\in S$ について

$$
d(q,w)\ge d(a,w)-d(a,q)\ge \alpha-(1-\sigma)\alpha=\sigma\alpha.
$$

$v\in S$ で等号になるので $P_Sq=v$ です。仮定を $q$ に適用し、非負の $1-\zeta$ を使って二乗すれば $d(q,q')^2\ge(1-\zeta)^2\sigma^2\alpha^2\ge(1-c^2)\sigma^2\alpha^2$ です。

[任意比の二乗距離評価](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-interpolation)をまず $[v,a']$ 上の $q'$ と第三点 $q$ に適用し、次に $[v,a]$ 上の $q$ と第三点 $a'$ に適用します。

$$
\begin{aligned}
d(q,q')^2
&\le(1-\sigma')\sigma^2\alpha^2+\sigma'd(q,a')^2-\sigma'(1-\sigma')\beta^2,\\
d(q,a')^2
&\le(1-\sigma)\beta^2+\sigma D^2-\sigma(1-\sigma)\alpha^2.
\end{aligned}
$$

代入して係数をまとめると

$$
d(q,q')^2\le
\sigma^2\alpha^2+\sigma'^2\beta^2
-\sigma\sigma'(\alpha^2+\beta^2-D^2).
$$

下界と合わせて $\sigma'\beta=c\sigma\alpha$ を代入すれば

$$
\sigma\sigma'(\alpha^2+\beta^2-D^2)
\le 2c^2\sigma^2\alpha^2
=2c\sigma\sigma'\alpha\beta.
$$

正の $\sigma\sigma'$ で割り、目的の下界を得ます。

次に $w$ を $[a,a']$ の比率 $\eta$ の点、$y$ を $[z,v]$ の比率 $t$ の点とします。

[任意比の二乗距離評価](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-interpolation)を $d(y,w)^2$ に使い、続いて $d(y,a)^2,d(y,a')^2$ に使います。非負の $d(y,w)^2$ を捨てると

$$
\begin{aligned}
t(1-t)d(z,v)^2+\eta(1-\eta)D^2
&\le(1-t)((1-\eta)r^2+\eta r'^2)\\
&\quad+t((1-\eta)\alpha^2+\eta\beta^2).
\end{aligned}
$$

$v$ は両集合に属するので[射影のPythagoras型不等式](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-pythagorean)から $d(z,v)^2$ は $r^2+\alpha^2$ と $r'^2+\beta^2$ の双方以上です。その重み付き平均を左辺へ代入し移項すると

$$
\eta(1-\eta)D^2\le (1-t)^2((1-\eta)r^2+\eta r'^2)
+t^2((1-\eta)\alpha^2+\eta\beta^2).
$$

$A=rr', B=\alpha\beta,\ S_0=r\alpha+r'\beta,\ T_0=r\beta+r'\alpha$ とおき、$\eta=r\alpha/S_0,\ t=A/(A+B)$ と選びます。すべて正で $0<\eta,t<1$ です。$\eta(1-\eta)$ で割った右辺は

$$
(1-t)^2\frac{S_0T_0}{B}+t^2\frac{S_0T_0}{A}
=\frac{S_0T_0}{A+B}.
$$

分子を展開すると $S_0T_0=B(r^2+r'^2)+A(\alpha^2+\beta^2)$ です。従って

$$
(A+B)D^2\le B(r^2+r'^2)+A(\alpha^2+\beta^2)
\le B(r^2+r'^2)+A(D^2+2cB).
$$

$AD^2$ を引き、正の $B$ で割ると結論を得ます。
<!-- proof-end -->

互いに素な区間の場合、$a\in F$ の $F'$ への射影は $F$ にも属するので $d(a,F')=d(a,S)$ です。従って上の補題は $\zeta=0$ と任意の $c>0$ で適用でき、$c\downarrow0$ で交差項が消えます。

この距離条件が重要です。例えばEuclid平面で角 $\theta$ の二直線に対し、一方の単位点から他方までの距離は $|\sin\theta|$、交点までの距離は1です。$\theta$ が小さいと $\zeta$ を小さくできません。小さな射影誤差だけでは共通固定点への近さを保証できない理由です。

## 4. 一様定数を得る反復（F.6）

[区間への局所射影評価](#lem-vnp14-local-projection)で得た $C(n)=o(n^2)$ から

$$
\frac{4C(3u)}{(u-1)^2}
=36\frac{C(3u)}{(3u)^2}\left(\frac{u}{u-1}\right)^2\longrightarrow0
$$

です。従って十分大きい固定整数 $u\ge2$ で

$$
4C(3u)\le (u-1)^2/32^2
$$

を満たせます。$\zeta=1/32,c=1/4$ とします。$1-c^2=15/16=960/1024\le961/1024=(1-\zeta)^2$ です。ここで $u$ は以降変えません。次の定理では[wire単価の極限price](../VNP3/index.md#def-vnp3-price)を群の元の集合上で考えます。priceは異なる点間で0になり得ますが、証明では完備距離空間に移してから射影を行います。

<a id="thm-vnp14-uniform-poincare"></a>

<!-- formal-statement-start -->
> **定理（一様Poincaré不等式）**
>
> 体 $K$ に関して[収縮仮説](../VNP9/index.md#def-vnp9-cases)が成立するとする。この体の収縮パラメータだけで定まる整数 $u\ge2$ と定数 $C_0\ge0$ が存在する。
>
> 任意の整数 $\ell\ge2$ と $h=\ell u$、および $U_h$ 上の任意の体 $K$ に関するprice $d$ に対して
>
$$
\mathbb E_{g,a\in U_h} d(a,ga)^2
\le C_0\sum_{j=0}^{h-2}\mathbb E_a d(a,x_ja)^2.
$$
>
> ここで $g,a$ は独立一様であり、$C_0$ は $\ell,h,d$ に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**作用の構成。** [priceのCAT(0)完備化](../VNP7/index.md#thm-vnp7-price-completion)により $d$ は完備CAT(0)空間 $Y$ の同じ体のpriceを写像 $f:U_h\to Y$ で引き戻したものです。全写像 $z:U_h\to Y$ の集合 $Z$ に

$$
D(z,w)^2=\mathbb E_{a\in U_h}d_Y(z(a),w(a))^2
$$

を入れます。ここで $d_Y$ は $Y$ の距離を表します。$D$ は有限個の座標距離の二乗平均の平方根で、三角不等式を確認します。任意の中間写像 $v$ を取り、座標ごとに $A_a=d_Y(z(a),v(a))$、$B_a=d_Y(v(a),w(a))$ とおきます。座標の三角不等式と有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を用いると

$$
\begin{aligned}
D(z,w)^2&\le\mathbb E_a(A_a+B_a)^2\\
&\le \mathbb E_a A_a^2+2\sqrt{\mathbb E_a A_a^2\,\mathbb E_a B_a^2}+\mathbb E_a B_a^2\\
&=(D(z,v)+D(v,w))^2.
\end{aligned}
$$

非負の平方根を取れば三角不等式が得られます。非負性・対称性は各座標から従い、$D(z,w)=0$ なら全座標で $z(a)=w(a)$ です。従って $D$ は距離です。$D$-Cauchy列は各座標でCauchy列です。各座標の距離は $|U_h|^{1/2}D$ 以下だからです。$Y$ の完備性で各座標の極限を取り、有限和に戻せば $D$ でも収束します。

各座標の測地線を同じ比率 $t$ で進む写像を $\gamma(t)$ とすれば、$D(\gamma(t),\gamma(t'))=|t-t'|D(z,w)$ です。各座標の[任意比の二乗距離評価](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-interpolation)を $t=1/2$ で平均すると、任意の第三点 $v$ について

$$
D(v,\gamma(1/2))^2\le
\frac{D(v,z)^2+D(v,w)^2}{2}-\frac{D(z,w)^2}{4}.
$$

この中点以外の中点 $m$ があれば、第三点に $m$ を取った右辺は0なので一致します。[CAT(0)条件とCN条件の同値性](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-equivalence)により $Z$ も完備CAT(0)です。

作用 $(gz)(a)=z(g^{-1}a)$ は添字を置換するだけなので等長です。作用の積の条件を式で確認します。

$$
(g(kz))(a)=z(k^{-1}g^{-1}a)=((gk)z)(a).
$$

$$
D(z,gz)^2=\mathbb E_a d_Y(z(a),z(g^{-1}a))^2
=\mathbb E_b d_Y(z(gb),z(b))^2.
$$

[写像から作る平均変位の長さ](../VNP13/index.md#prop-vnp13-map-length)により共通のパラメータで収縮します。ここからは $D$ を距離として第1〜3節を適用し、$\delta_j(z)=D(z,x_jz)$ と読み替えます。

**射影点同士の評価。** $k=\ell-1$ とし、$0\le i<k$ について次の記号を置きます。

$$
Q_i=P_{[iu,iu+2u)},\qquad r_i=D(z,Q_i z),
\qquad \Phi(z)=\sum_{i=0}^{k-1}r_i^2.
$$

隣接区間には[重なる区間の射影](#lem-vnp14-overlap)と[固定点集合のほぼ直交する射影](#lem-vnp14-angle)を適用し、$2r_ir_{i+1}\le r_i^2+r_{i+1}^2$ から

$$
D(Q_i z,Q_{i+1}z)^2\le(1+c)(r_i^2+r_{i+1}^2).
$$

$|i-j|\ge2$ では座標が互いに素なので前節末尾の $c\downarrow0$ の議論により $D(Q_i z,Q_j z)^2\le r_i^2+r_j^2$ です。

**一回の平均。** $b$ を $k$ 個の $Q_i z$ の重心とします。[分散不等式](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-variance-inequality)を各 $Q_jz$ に適用して足すと

$$
2k\sum_i D(b,Q_i z)^2\le\sum_{i,j}D(Q_i z,Q_j z)^2.
$$

右辺の順序付き対 $i\ne j$ の基礎項は $2(k-1)\Phi(z)$。隣接対の追加項は $2c\sum_{i=0}^{k-2}(r_i^2+r_{i+1}^2)\le4c\Phi(z)$ なので、全体は $2(k-1+2c)\Phi(z)$ 以下です。$Q_i z$ は第 $i$ 固定点集合に属し、$Q_i b$ は $b$ からの最近点なので

$$
\Phi(b)\le\sum_i D(b,Q_i z)^2
\le \left(1-\frac{1-2c}{k}\right)\Phi(z).
$$

第三点 $z$ に[分散不等式](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-variance-inequality)を適用すれば

$$
kD(z,b)^2\le\Phi(z)-\sum_i D(b,Q_i z)^2\le\Phi(z)-\Phi(b).
$$

$\Delta=\Phi(z)-\Phi(b)$、$\lambda=1-2c>0$ と書くと、$\Delta\ge \lambda\Phi(z)/k$ です。$\Phi(z)>0$ の場合

$$
\begin{aligned}
D(z,b)^2&\le\Delta/k\le\Delta^2/(\lambda\Phi(z)),\\
D(z,b)&\le\frac{\Delta}{\sqrt{\lambda}\sqrt{\Phi(z)}}
\le\frac2{\sqrt\lambda}(\sqrt{\Phi(z)}-\sqrt{\Phi(b)}).
\end{aligned}
$$

最後は $\Delta=(\sqrt{\Phi(z)}-\sqrt{\Phi(b)})(\sqrt{\Phi(z)}+\sqrt{\Phi(b)})$ と $\Phi(b)\le\Phi(z)$ によります。$\Phi(z)=0$ なら全射影点が $z$ で $b=z$ です。

**反復と定数。** $z_0=z$、$z_{m+1}$ を $z_m$ から得た重心とします。$\Phi(z_m)\le(1-\lambda/k)^m\Phi(z)$ は0へ収束し、距離の上界の和は望遠鏡和になるので

$$
\sum_{m=0}^{N-1}D(z_m,z_{m+1})
\le\frac2{\sqrt\lambda}\left(\sqrt{\Phi(z)}-\sqrt{\Phi(z_N)}\right).
$$

任意の尾部の和も $2\sqrt{\Phi(z_M)/\lambda}$ 以下なので $z_m$ はCauchy列です。完備性から極限 $z_*$ が存在します。

各固定点集合への距離は三角不等式で1-Lipschitzです。$\Phi(z_m)\to0$ なので $z_*$ は全区間で固定されます。

区間の生成元の和集合は $x_0,\ldots,x_{h-2}$ を尽くし、$U_h$ 全体で固定されます。最近点距離は

$$
D(z,P_{[0,h)}z)^2\le D(z,z_*)^2\le\frac4\lambda\Phi(z).
$$

各生成元は高々二つの区間に属するので、[区間への局所射影評価](#lem-vnp14-local-projection)を各区間に適用して $\Phi(z)\le2C(2u)\sum_j\delta_j(z)^2$。任意の $g$ が $P_{[0,h)}z$ を固定することと等長性により $D(z,gz)\le2D(z,P_{[0,h)}z)$ です。従って

$$
D(z,gz)^2\le\frac{32C(2u)}{1-2c}\sum_{j=0}^{h-2}\delta_j(z)^2.
$$

$z=f$ と置き、$g$ について一様平均を取ると作用の構成から左辺は $\mathbb E_{g,a}d(a,ga)^2$、右辺の変位は $\mathbb E_a d(a,x_ja)^2$ です。$C_0=32C(2u)/(1-2c)=64C(2u)$ であり、最初に固定した $u$ と収縮パラメータだけに依存します。
<!-- proof-end -->

$k$ が大きいと一回の平均の収縮率は1に近づきます。それでも移動距離の総和は平方根の差の望遠鏡和で抑えられるため、最終定数には $k$ が残りません。これが弱い評価を一様評価に変える仕組みです。

## 5. 演習

<a id="exercise-vnp14-a1"></a>

### A1. 区間の生成元

- Level: A
- ID: VNP14-A1

$h=12,u=3$ とする。区間 $[0,6),[3,9),[6,12)$ の隣接生成元の添字を列挙し、各生成元が高々二つに属することを確認せよ。

<!-- solution-start -->
**詳細解答**：区間 $[p,q)$ の生成元は $p\le j\le q-2$ です。従って三集合は $\{0,1,2,3,4\},\{3,4,5,6,7\},\{6,7,8,9,10\}$。重なるのは $\{3,4\}$ と $\{6,7\}$ で三重の共通部分はありません。和集合は $0$ から10まで全てなので、全区間の共通固定点は全群の固定点です。
<!-- solution-end -->

<a id="exercise-vnp14-a2"></a>

### A2. 定数の選択

- Level: A
- ID: VNP14-A2

仮に $u=65,\ C(195)=1/2$ とする。$\zeta=1/32,c=1/4$ が補題の条件を満たすか検算せよ。

<!-- solution-start -->
**詳細解答**：[重なる区間の射影](#lem-vnp14-overlap)の左辺は $4C(195)=2$、右辺は $(64/32)^2=4$ なので成立します。また[固定点集合のほぼ直交する射影](#lem-vnp14-angle)の条件は $1-c^2=15/16=960/1024\le(31/32)^2=961/1024$ で成立します。これは定数の代入例であり、実際の $C(195)$ を指定する主張ではありません。
<!-- solution-end -->

<a id="exercise-vnp14-a3"></a>

### A3. 射影距離の差

- Level: A
- ID: VNP14-A3

第2節で $d(a,b_u)=5,d(a,b_{u+1})=4$ とする。$d(b_u,b_{u+1})$ と $\delta_u(b_{u+1})$ の上界を求めよ。

<!-- solution-start -->
**詳細解答**：$b_u$ は $F[u+1,3u)$ に属するので、[射影のPythagoras型不等式](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-pythagorean)で $d(b_u,b_{u+1})^2\le25-16=9$。従って距離は3以下です。$x_u$ は $b_u$ を固定するため、三角不等式と等長性で $\delta_u(b_{u+1})\le 2d(b_u,b_{u+1})\le6$ です。
<!-- solution-end -->

<a id="exercise-vnp14-a4"></a>

### A4. 一回の収縮

- Level: A
- ID: VNP14-A4

$k=4,c=1/4,\Phi(z)=16$ のとき、第4節の $\Phi(b)$ と $D(z,b)$ の上界を求めよ。

<!-- solution-start -->
**詳細解答**：[一様Poincaré不等式](#thm-vnp14-uniform-poincare)の一回の平均の評価で $\lambda=1-2c=1/2$。従って

$$
\Phi(b)\le(1-1/8)16=14.
$$

移動距離は次のように評価できます。

$$
kD(z,b)^2\le16-\Phi(b)\le16.
$$

$k=4$ で割って平方根を取ると $D(z,b)\le2$ です。$\Phi(b)$ の上界14を右辺の負号付き項へ代入して $D(z,b)^2\le1/2$ としてはいけません。これは上界を逆向きに用いる誤りです。
<!-- solution-end -->

<a id="exercise-vnp14-b1"></a>

### B1. 中間射影の望遠鏡和

- Level: B
- ID: VNP14-B1

$u=4$、第2節の $d(a,b_4),d(a,b_5),d(a,b_6),d(a,b_7)$ がそれぞれ $6,5,4,2$ とする。重心の生成元変位の二乗和を評価せよ。

<!-- solution-start -->
**詳細解答**：[重なる区間の射影](#lem-vnp14-overlap)の証明で各差は

$$
36-25=11,\qquad25-16=9,\qquad16-4=12.
$$

各生成元が動かす点は高々一つで、その変位の平方はそれぞれ差の4倍以下です。重心では変位が $1/3$ 倍以下なので、二乗和は

$$
4(11+9+12)/9=128/9
$$

以下です。中間の二乗距離が相殺されて $4(36-4)/9$ と一致します。
<!-- solution-end -->

<a id="exercise-vnp14-b2"></a>

### B2. 角度比較のパラメータ

- Level: B
- ID: VNP14-B2

[固定点集合のほぼ直交する射影](#lem-vnp14-angle)の仮定を満たす配置を考える。第3節の距離の候補として $r=2,r'=3,\alpha=4,\beta=5,c=1/4$ を考える。$\eta,t$ を求め、二段階目の比較式の右辺を計算し、最終上界も求めよ。この距離の組が実現できるか判定せよ。

<!-- solution-start -->
**詳細解答**：[固定点集合のほぼ直交する射影](#lem-vnp14-angle)の証明で

$$
A=6,\quad B=20,\quad S_0=23,\quad T_0=22.
$$

従って $\eta=8/23,\ t=6/26=3/13$ です。分母で割った右辺は

$$
S_0T_0/(A+B)=506/26=253/13.
$$

一般の角度比較の上界は次の通りです。

$$
r^2+r'^2+2crr'=4+9+3=16.
$$

この仮の距離値では一段階目も $D^2\ge16+25-10=31$ を要求します。上界と矛盾するので、これら四距離を同時に満たす射影配置は存在しません。
<!-- solution-end -->

<a id="exercise-vnp14-b3"></a>

### B3. 順序付き対の計数

- Level: B
- ID: VNP14-B3

$k=3$ のとき、各射影間の上界を足して $\sum_{i,j}D(Q_i z,Q_j z)^2$ の上界を $r_0,r_1,r_2$ で明示し、第4節の一般上界と比較せよ。

<!-- solution-start -->
**詳細解答**：対角項は0、非対角項は各無順序対が二回出現します。隣接対は $(0,1),(1,2)$ で、非隣接対は $(0,2)$。[一様Poincaré不等式](#thm-vnp14-uniform-poincare)の証明の距離比較により和は

$$
\begin{aligned}
&2(1+c)(r_0^2+r_1^2+r_1^2+r_2^2)+2(r_0^2+r_2^2)\\
&=(4+2c)(r_0^2+r_2^2)+(4+4c)r_1^2\\
&\le(4+4c)(r_0^2+r_1^2+r_2^2)=2(k-1+2c)\Phi(z).
\end{aligned}
$$

端の二点は隣接対に一回しか現れないため、一般上界には余裕があります。
<!-- solution-end -->

<a id="exercise-vnp14-c1"></a>

### C1. 反復から一様固定点評価まで

- Level: C
- ID: VNP14-C1

[一様Poincaré不等式](#thm-vnp14-uniform-poincare)の証明と同じ非空完備CAT(0)空間、固定点集合、非負の $\Phi$ および群作用の設定で、抽象的な平均操作が $\Phi(b)\le(1-\lambda/k)\Phi(z)$ および $kD(z,b)^2\le\Phi(z)-\Phi(b)$ を満たすとする。ただし $0<\lambda\le1,k\ge1$。反復の収束を示し、$\Phi(z)\le 2C(2u)\sum_j\delta_j(z)^2$ を用いて群作用の一様変位評価を再構成せよ。完備性を外すとどこが破綻するか。

<!-- solution-start -->
**詳細解答**：$\Phi_m=\Phi(z_m)$、$\Delta_m=\Phi_m-\Phi_{m+1}$ とおくと、$\Delta_m\ge\lambda\Phi_m/k$ です。$\Phi_m>0$ のとき

$$
D(z_m,z_{m+1})^2\le\Delta_m/k\le\Delta_m^2/(\lambda\Phi_m).
$$

平方根を取り $\Delta_m=(\sqrt{\Phi_m}-\sqrt{\Phi_{m+1}})(\sqrt{\Phi_m}+\sqrt{\Phi_{m+1}})$ を代入すれば

$$
D(z_m,z_{m+1})\le2(\sqrt{\Phi_m}-\sqrt{\Phi_{m+1}})/\sqrt\lambda.
$$

$\Phi_m=0$ なら移動は0です。$M<N$ の和を取ると

$$
D(z_M,z_N)\le2\sqrt{\Phi_M/\lambda},
\qquad \Phi_M\le(1-\lambda/k)^M\Phi_0\to0.
$$

従ってCauchy列です。完備性により極限 $z_*$ があり、各固定点集合への距離は1-Lipschitzなので全区間で固定されます。生成元を尽くすため全群が $z_*$ を固定します。

$M=0,N\to\infty$ の評価で $D(z,z_*)^2\le4\Phi_0/\lambda$。三角不等式で

$$
D(z,gz)^2\le4D(z,z_*)^2
\le16\Phi_0/\lambda
\le(32C(2u)/\lambda)\sum_j\delta_j(z)^2.
$$

$\lambda=1-2c$ なので[一様Poincaré不等式](#thm-vnp14-uniform-poincare)の定数を再現しました。完備性がなければCauchy列の極限が空間内に存在するとは限りません。また最初の射影や重心の存在も一般には保証されず、反復の定義自体が失われ得ます。
<!-- solution-end -->

## 6. 次講へ

大きな上単位三角群について、すべての点対の平均二乗priceを隣接生成元に沿う平均二乗priceで評価できました。次講ではこの一様定数を用い、任意の点対を結ぶwireの積を、隣接辺だけを使うネットワークの和で表す恒等式へ変換します。
