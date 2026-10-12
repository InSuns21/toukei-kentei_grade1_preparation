# SYM6 Lagrange部分空間・Lagrange部分多様体

[SYM5のDarbouxの定理](../SYM5/index.md#thm-sym5-darboux)によって、どのシンプレクティック多様体も一点の近くでは位置と運動量の座標で記述できるようになりました。しかし、その空間の中の「半分の次元をもつ曲面」をすべて同じ種類の対象とみなしてよいわけではありません。曲面に沿って2形式が零になるかどうかで、Hamilton力学と結び付く特別な部分多様体が現れます。

まず一つの接空間に戻り、[SYM1のシンプレクティック直交補](../SYM1/index.md#def-sym1-symplectic-orthogonal)を使って、等方・余等方・Lagrangeという三種類の部分空間を比較します。その後、条件を各接空間へ移します。最後に[SYM3の正準1形式](../SYM3/index.md#def-sym3-tautological-form)を使って、余接束の零切断・閉1形式のグラフ・接方向を消す余ベクトルの集合を構成します。「半分の次元」というだけで十分だと誤認しないことが一貫した主題です。

## 1. 面積を消す方向と、その直交補

$(V,\omega)$ を $\dim V=2n$ の有限次元実シンプレクティックベクトル空間とし、$W\subseteq V$ を線形部分空間とします。[シンプレクティック直交補](../SYM1/index.md#def-sym1-symplectic-orthogonal)は

$$
W^\omega=\{v\in V:\omega(v,w)=0\quad(\forall w\in W)\}
$$

でした。「$W$ の内部にいる任意の二方向を組にしても面積が零」と、「$W$ と直交するすべての方向が $W$ に含まれる」は別の条件です。

この三種類の違いを、標準空間 $V=\mathbb R^4$、座標 $(q^1,q^2,p_1,p_2)$ と

$$
\omega_0=dq^1\wedge dp_1+dq^2\wedge dp_2
$$

で確かめます。$e_i=\partial_{q^i}$、$f_i=\partial_{p_i}$ と書けば

$$
\omega_0(e_i,f_j)=\delta_{ij},
\qquad
\omega_0(e_i,e_j)=\omega_0(f_i,f_j)=0.
$$

<a id="def-sym6-isotropic-subspace"></a>

<!-- formal-statement-start -->
> **定義（等方部分空間）**  
> $(V,\omega)$ を実シンプレクティックベクトル空間、$W\subseteq V$ を線形部分空間とする。$W$ が **等方部分空間** とは $\omega|_{W\times W}=0$、同値に $W\subseteq W^\omega$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym6-isotropic-subspace -->
### 直接例：一方向では面積が消える

**定義の確認**：$W=\operatorname{span}\{e_1\}$ の任意の二ベクトルは $ae_1,be_1$ の形なので

$$
\omega_0(ae_1,be_1)=ab\,\omega_0(e_1,e_1)=0.
$$

ゆえに等方です。さらに $v=a_1e_1+a_2e_2+b_1f_1+b_2f_2$ とすれば

$$
\omega_0(v,e_1)=-b_1,
$$

したがって $W^\omega=\operatorname{span}\{e_1,e_2,f_2\}$ であり、包含 $W\subsetneq W^\omega$ も直接確認できます。
<!-- definition-example-end -->

<a id="def-sym6-coisotropic-subspace"></a>

<!-- formal-statement-start -->
> **定義（余等方部分空間）**  
> $(V,\omega)$ を実シンプレクティックベクトル空間、$W\subseteq V$ を線形部分空間とする。$W$ が **余等方部分空間** とは $W^\omega\subseteq W$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym6-coisotropic-subspace -->
### 直接例：三次元部分空間は直交方向を含む

**定義の確認**：$H=\operatorname{span}\{e_1,e_2,f_1\}$ に直交する $v$ について

$$
\omega_0(v,e_1)=-b_1=0,\quad
\omega_0(v,e_2)=-b_2=0,\quad
\omega_0(v,f_1)=a_1=0.
$$

よって $H^\omega=\operatorname{span}\{e_2\}\subset H$ で余等方です。しかし $\omega_0(e_1,f_1)=1$ なので等方ではありません。
<!-- definition-example-end -->

<a id="def-sym6-lagrangian-subspace"></a>

<!-- formal-statement-start -->
> **定義（Lagrange部分空間）**  
> $(V,\omega)$ を実シンプレクティックベクトル空間、$W\subseteq V$ を線形部分空間とする。$W$ が **Lagrange部分空間** とは $W=W^\omega$ となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym6-lagrangian-subspace -->
### 直接例：位置方向の平面

**定義の確認**：$E=\operatorname{span}\{e_1,e_2\}$ では内部の組は零です。また $v$ が $E$ に直交する条件は

$$
\omega_0(v,e_1)=-b_1=0,\qquad
\omega_0(v,e_2)=-b_2=0.
$$

従って $E^\omega=E$ であり、Lagrangeです。同じ計算から、先の一次元空間 $W$ は等方でもLagrangeではないことが分かります。
<!-- definition-example-end -->

等方は「内部で2形式が消える」、余等方は「内部と直交する方向をすでに含む」という意味です。両方が同時に成り立つのがLagrangeですが、どの次元でそれが可能なのでしょうか。

## 2. 直交補の次元を計算する

<a id="lem-sym6-orthogonal-dimension"></a>

<!-- formal-statement-start -->
> **補題（シンプレクティック直交補の次元）**  
> $(V,\omega)$ が $\dim V=2n$ の有限次元実シンプレクティックベクトル空間で、$W\subseteq V$ が線形部分空間なら
>
$$
\dim W^\omega=2n-\dim W,
\qquad (W^\omega)^\omega=W.
$$
<!-- formal-statement-end -->

### 証明の見取り図

非退化性が与える $V$ から $V^*$ への同型を使い、さらに $W$ への制限を取ります。制限の全射性を確認してから核の次元を数えます。

<!-- proof-start -->
### 証明

[非退化性と双対の同型](../SYM1/index.md#def-sym1-nondegenerate-form)により

$$
b_\omega:V\longrightarrow V^*,
\qquad
b_\omega(v)=\omega(v,\cdot)
$$

は線形同型です。制限写像 $\rho:V^*\to W^*$、$\rho(\lambda)=\lambda|_W$ は全射です。実際、$W$ の基底 $w_1,\ldots,w_k$ を $V$ の基底 $w_1,\ldots,w_k,u_{k+1},\ldots,u_{2n}$ に延長します。任意の $\mu\in W^*$ に対し

$$
\lambda(w_i)=\mu(w_i)\ (1\le i\le k),
\qquad
\lambda(u_j)=0\ (k<j\le2n)
$$

と定めて線形に延長すれば、$\rho(\lambda)=\mu$ です。従って合成写像 $T=\rho\circ b_\omega:V\to W^*$ も全射です。定義から

$$
\begin{aligned}
v\in\ker T
&\Longleftrightarrow (\rho\circ b_\omega)(v)=0\\
&\Longleftrightarrow \omega(v,w)=0\quad(\forall w\in W)\\
&\Longleftrightarrow v\in W^\omega.
\end{aligned}
$$

よって[階数・退化次数の定理](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)を線形写像 $T:V\to W^*$ に適用すると

$$
2n=\dim\ker T+\dim\operatorname{im}T
=\dim W^\omega+\dim W.
$$

また、$w\in W$ と $v\in W^\omega$ に対して $\omega(w,v)=-\omega(v,w)=0$ なので

$$
W\subseteq(W^\omega)^\omega.
$$

ここで前半を $W^\omega$ に適用すると

$$
\dim (W^\omega)^\omega=2n-\dim W^\omega=\dim W.
$$

包含する二つの部分空間の次元が等しいため、$(W^\omega)^\omega=W$ です。
<!-- proof-end -->

<a id="thm-sym6-lagrangian-criterion"></a>

<!-- formal-statement-start -->
> **定理（等方・余等方の次元とLagrange判定）**  
> $\dim V=2n$ のシンプレクティックベクトル空間 $(V,\omega)$ の部分空間 $W$ に対して以下が成り立つ。
>
> 1. $W$ が等方なら $\dim W\le n$、余等方なら $\dim W\ge n$。
> 2. 次の条件は同値である。
>    - $W$ はLagrange部分空間である。
>    - $W$ は等方で $\dim W=n$ である。
>    - $W$ は余等方で $\dim W=n$ である。
>    - $W$ は包含関係に関して極大な等方部分空間である。
<!-- formal-statement-end -->

### 証明の見取り図

直交補の包含と[次元公式](#lem-sym6-orthogonal-dimension)を組み合わせます。極大性の逆向きでは、直交補に残った方向を一つ付け加えられることを示します。

<!-- proof-start -->
### 証明

$k=\dim W$ とします。等方の場合、$W\subseteq W^\omega$ なので

$$
k\le\dim W^\omega=2n-k,
\qquad 2k\le2n,
\qquad k\le n.
$$

余等方なら $W^\omega\subseteq W$ なので、不等号を反転した $2n-k\le k$ から $k\ge n$ です。

Lagrangeなら $W=W^\omega$ ですから $k=2n-k$、すなわち $k=n$ であり、両方の包含が成立します。逆に、等方で $k=n$ なら $W\subseteq W^\omega$ かつ双方の次元は $n$、従って等号です。余等方で $k=n$ の場合も同じです。

Lagrange空間 $W$ を真に含む等方空間 $U$ があるとすると、$U\subseteq U^\omega\subseteq W^\omega=W$ となり $W\subsetneq U\subseteq W$ と矛盾します。従って極大等方です。

逆に $W$ が極大等方で $W\ne W^\omega$ と仮定します。$v\in W^\omega\setminus W$ を取り、$U=W+\mathbb Rv$ と置きます。$w,w'\in W$、実数 $a,b$ について

$$
\begin{aligned}
\omega(w+av,w'+bv)
&=\omega(w,w')+b\omega(w,v)\\
&\quad+a\omega(v,w')+ab\omega(v,v)=0.
\end{aligned}
$$

第1項は $W$ の等方性、第2・第3項は $v\in W^\omega$ と交代性、第4項は交代性で零です。従って $U$ は $W$ を真に含む等方空間となり、極大性に矛盾します。よって $W=W^\omega$ です。
<!-- proof-end -->

「次元が半分」はそれだけでは条件になりません。$\mathbb R^4$ の $\operatorname{span}\{e_1,f_1\}$ は2次元ですが $\omega_0(e_1,f_1)=1$ なので等方ではなく、Lagrangeでもありません。

## 3. 接空間ごとに同じ条件を課す

線形空間の条件を曲面に移すには、その曲面が本当に滑らかな部分多様体かを確認する必要があります。任意の $n$ 個の方程式の零点集合を、階数を確かめずに $n$ 次元多様体とみなすことはできません。

<a id="def-sym6-lagrangian-submanifold"></a>

<!-- formal-statement-start -->
> **定義（Lagrange部分多様体）**  
> $(M,\omega)$ を $2n$ 次元シンプレクティック多様体、$L\subset M$ を滑らかな埋め込み部分多様体とする。
> 包含写像を $i:L\hookrightarrow M$ とするとき、$L$ が **Lagrange部分多様体** であるとは次の二条件が成立することをいう。
>
$$
\dim L=n,\qquad i^*\omega=0.
$$
>
> 同値に全ての $x\in L$ について
>
$$
T_xL=(T_xL)^{\omega_x}
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym6-lagrangian-submanifold -->
### 直接例：位置方向だけを許した平面

**定義の確認**：$\mathbb R^4$ の標準形式 $\omega_0=\sum_{i=1}^2dq^i\wedge dp_i$ のもとで

$$
L=\{(q^1,q^2,p_1,p_2):p_1=p_2=0\}
$$

を考えます。$q\mapsto(q,0)$ は明示的な埋め込みで、像は2次元です。任意の接ベクトルは $a_1\partial_{q^1}+a_2\partial_{q^2}$ の形を取り、$dp_i$ はそれらに零を返します。従って $i^*\omega_0=0$。定義の二条件を満たすので $L$ はLagrangeです。
<!-- definition-example-end -->

定義中の「同値」を確かめます。包含の微分 $di_x:T_xL\to T_xM$ は単射であり、接空間をその像と同一視できます。引き戻しの定義より

$$
(i^*\omega)_x(u,v)=\omega_x(di_xu,di_xv).
$$

従って $i^*\omega=0$ は各 $T_xL$ が等方であることです。さらに $\dim T_xL=n$ なので[線形Lagrange判定](#thm-sym6-lagrangian-criterion)が使え、接空間とその直交補の一致が得られます。逆向きも同じ等式を読み戻せばよいのです。

### 「正則な零点集合」の確認

同じ $\mathbb R^{2n}$ で $F(q,p)=(p_1,\ldots,p_n)$ とすれば

$$
DF_{(q,p)}=
\begin{pmatrix}0&I_n\end{pmatrix}.
$$

各点で $DF_{(q,p)}:\mathbb R^{2n}\to\mathbb R^n$ は全射であり、特に $F^{-1}(0)$ の全点で階数が $n$ です。零点集合は空でないので、$0$ は $F$ の正則値です。[正則値定理](../GEO3/index.md#thm-geo3-regular-value)を $F$ と値 $0$ に適用すると、

$
\dim F^{-1}(0)=2n-n=n
$

となり、$F^{-1}(0)$ が埋め込み部分多様体であることも従います。これは先のパラメータ表示と一致します。

これに対して方程式

$$
p_1^2+\cdots+p_n^2=0
$$

を「一本の方程式だから余次元1」と判断するのは誤りです。実数の二乗和が零であるのは各 $p_i=0$ の場合に限るため、零点集合は上と同じ $n$ 次元の零切断です。しかし左辺の微分は零点上で零写像となります。従ってこの**方程式に直接**[正則値定理](../GEO3/index.md#thm-geo3-regular-value)を適用して次元を数えることはできません。集合が滑らかであることと、選んだ制約式の微分が全射であることは別の問題です。

## 4. 余接束の零切断と1形式のグラフ

[SYM3の余接束の正準2形式](../SYM3/index.md#thm-sym3-cotangent-symplectic)は、任意の滑らかな $n$ 次元多様体 $Q$ 上で

$$
\omega_{\mathrm{can}}=-d\theta,
\qquad
\theta=\sum_i p_i\,dq^i,
\qquad
\omega_{\mathrm{can}}=\sum_i dq^i\wedge dp_i
$$

でした。零切断だけでなく、各点の余接空間に一つの余ベクトルを選ぶ1形式 $\alpha$ のグラフを考えます。$\alpha\in\Omega^1(Q)$ を滑らかな1形式とし、

$$
s_\alpha:Q\longrightarrow T^*Q,
\qquad
s_\alpha(q)=\alpha_q,
\qquad
\Gamma_\alpha=s_\alpha(Q)
$$

と書きます。余接束の射影 $\pi$ について $\pi\circ s_\alpha=\operatorname{id}_Q$ なので、$\Gamma_\alpha$ は基点側と一対一に対応します。

<a id="thm-sym6-graph-criterion"></a>

<!-- formal-statement-start -->
> **定理（閉1形式のグラフのLagrange判定）**  
> $Q$ を滑らかな $n$ 次元実多様体、$\alpha\in\Omega^1(Q)$ を滑らかな1形式とする。余接束 $T^*Q$ に $\omega_{\mathrm{can}}=-d\theta$ を入れる。このとき $s_\alpha:Q\to T^*Q$ は滑らかな埋め込みで、グラフ $\Gamma_\alpha$ がLagrange部分多様体であるための必要十分条件は
>
$$
d\alpha=0
$$
>
> である。特に零切断と、滑らかな関数 $f$ の微分 $df$ のグラフはLagrangeである。
<!-- formal-statement-end -->

### 証明の見取り図

埋め込み性は射影との合成が恒等写像になることから確認します。2形式の制限は、正準1形式をまずグラフへ引き戻してから外微分します。

<!-- proof-start -->
### 証明

局所座標 $q=(q^1,\ldots,q^n)$ で $\alpha=\sum_i a_i(q)\,dq^i$ と書けば

$$
s_\alpha(q)=(q^1,\ldots,q^n,a_1(q),\ldots,a_n(q)).
$$

写像は滑らかで、微分は $v\in T_qQ$ に対し

$$
ds_{\alpha,q}(v)=(v,Da(q)v)
$$

です。第一成分が $v$ なので $ds_{\alpha,q}(v)=0$ なら $v=0$、すなわち単射です。さらに $\pi\circ s_\alpha=\operatorname{id}_Q$ により、$s_\alpha$ は像への全単射で逆写像 $\pi|_{\Gamma_\alpha}$ が連続です。従って滑らかな埋め込みで、$\dim\Gamma_\alpha=n$ です。

[正準1形式の定義](../SYM3/index.md#def-sym3-tautological-form)を使い、$q\in Q$ と $v\in T_qQ$ に対し

$$
\begin{aligned}
(s_\alpha^*\theta)_q(v)
&=\theta_{\alpha_q}(ds_{\alpha,q}v)\\
&=\alpha_q\bigl(d\pi_{\alpha_q}(ds_{\alpha,q}v)\bigr)\\
&=\alpha_q\bigl(d(\pi\circ s_\alpha)_qv\bigr)\\
&=\alpha_q(v).
\end{aligned}
$$

従って $s_\alpha^*\theta=\alpha$。[引き戻しと外微分の可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を、写像 $s_\alpha$ と1形式 $\theta$ に適用すると

$$
\begin{aligned}
s_\alpha^*\omega_{\mathrm{can}}
&=s_\alpha^*(-d\theta)\\
&=-d(s_\alpha^*\theta)\\
&=-d\alpha.
\end{aligned}
$$

$s_\alpha$ は $\Gamma_\alpha$ への微分同相です。従ってグラフ上で $\omega_{\mathrm{can}}$ が零となることは、引き戻しで $d\alpha=0$ となることと同値です。

グラフの次元はすでに $n$ と確認しました。この二条件を[Lagrange部分多様体の定義](#def-sym6-lagrangian-submanifold)に照合して、必要十分性が得られます。

零切断は $\alpha=0$ の場合です。$\alpha=df$ なら[外微分の二乗零](../GEO7/index.md#thm-geo7-d-square-zero)で $d\alpha=d(df)=0$ です。
<!-- proof-end -->

### 直接計算：グラフの傾きが対称になる条件

**定理の条件確認**：$Q=\mathbb R^2$、$\alpha=q^2\,dq^1+q^1\,dq^2$ とします。グラフは $p_1=q^2$、$p_2=q^1$ です。接ベクトルは

$$
v_1=\partial_{q^1}+\partial_{p_2},
\qquad
v_2=\partial_{q^2}+\partial_{p_1}.
$$

直接評価すると

$$
\omega_{\mathrm{can}}(v_1,v_2)
=dq^1\wedge dp_1(v_1,v_2)
+dq^2\wedge dp_2(v_1,v_2)
=1-1=0.
$$

一方、外微分は

$$
d\alpha=dq^2\wedge dq^1+dq^1\wedge dq^2=0.
$$

実際、$\alpha=d(q^1q^2)$ で、関数のグラフがLagrangeになる例です。対照的に $\alpha=q^1dq^2$ では $d\alpha=dq^1\wedge dq^2\ne0$。次元が2でもLagrangeにはなりません。

### 成分で確認する閉性と局所的な関数表示

$\alpha=\sum_i a_i(q)\,dq^i$ とします。余接束全体の座標微分 $dp_i$ とグラフ上の微分を混同しないよう、$p_i\circ s_\alpha=a_i$ を微分します。これにより

$
s_\alpha^*(dp_i)=d(p_i\circ s_\alpha)
=da_i=\sum_j(\partial_j a_i)\,dq^j
$

です。従ってグラフへの引き戻しを計算すると

$$
\begin{aligned}
s_\alpha^*\omega_{\mathrm{can}}
&=\sum_{i,j}(\partial_j a_i)\,dq^i\wedge dq^j\\
&=\sum_{i<j}(\partial_j a_i-\partial_i a_j)\,dq^i\wedge dq^j\\
&=-d\alpha.
\end{aligned}
$$

ここで各 $i<j$ について $dq^i\wedge dq^j$ の係数を比べれば、

$
d\alpha=0
\quad\Longleftrightarrow\quad
\partial_j a_i=\partial_i a_j\ \ (\forall i,j)
\quad\Longleftrightarrow\quad
Da=(\partial_j a_i)\ \text{が対称}
$

です。これがグラフの接方向の傾きから閉性を読む方法です。[局所Poincaréの補題](../GEO9/index.md#thm-geo9-poincare-lemma)は、座標球上の閉1形式なら $\alpha=df$ と書けることを保証します。

しかし**大域的には閉形式が必ずしも完全形式ではありません**。円周を

$$
S^1=\mathbb R/(2\pi\mathbb Z)
$$

と表し、局所角度座標を $t$ とします。重なる角度座標の間の変換は、ある整数 $k$ を用いた

$$
t\longmapsto t+2\pi k
$$

です。微分を取れば $d(t+2\pi k)=dt$ なので、局所1形式 $dt$ は貼り合って大域的な1形式を定めます。

円周は一次元です。従って任意の2形式が零となり、$d(dt)=0$ なのでこの1形式は閉じています。

一周する閉曲線に沿った積分を計算すると

$$
\oint_{S^1}dt=\int_0^{2\pi}1\,dt=2\pi
$$

です。もしこの1形式が大域的な滑らかな実数値関数 $f$ の微分であるなら、始点と終点は同じ点なので

$$
\oint_{S^1}df=f(\text{終点})-f(\text{始点})=0
$$

となり矛盾します。よって閉1形式のグラフは大域的な関数の微分によるグラフとは限りません。

## 5. 余法束もLagrangeになる

零切断は部分多様体 $S=Q$ の例です。今度は $Q$ の埋め込み部分多様体 $S$ 上で、その接方向をすべて零にする余ベクトルを集めます。

<a id="def-sym6-conormal-bundle"></a>

<!-- formal-statement-start -->
> **定義（余法束）**  
> $Q$ を $n$ 次元滑らかな多様体、$S\subset Q$ を $k$ 次元の滑らかな埋め込み部分多様体とする。$S$ の **余法束** は
>
$$
N^*S=\{\alpha_q\in T^*Q:q\in S,\ \alpha_q(v)=0\quad(\forall v\in T_qS)\}
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym6-conormal-bundle -->
### 直接例：平面の直線に垂直な余ベクトル

**定義の確認**：$Q=\mathbb R^2$ で $S=\{(q^1,q^2):q^2=0\}$ とします。接空間は $\operatorname{span}\{\partial_{q^1}\}$。余ベクトル $p_1dq^1+p_2dq^2$ がこれを零にする条件は $p_1=0$ です。従って

$$
N^*S=\{q^2=0,\ p_1=0\}\subset T^*\mathbb R^2
$$

であり、独立な自由変数は $q^1,p_2$ の二つです。
<!-- definition-example-end -->

<a id="thm-sym6-conormal-lagrangian"></a>

<!-- formal-statement-start -->
> **定理（埋め込み部分多様体の余法束はLagrange）**  
> $Q$ を $n$ 次元滑らかな多様体とし、$S\subset Q$ を滑らかな埋め込み部分多様体とする。その次元を $k$（$0\le k\le n$）とする。
> このとき余法束 $N^*S\subset T^*Q$ は滑らかな埋め込み $n$ 次元部分多様体となる。さらに正準シンプレクティック形式
>
$$
\omega_{\mathrm{can}}=-d\theta
$$
>
> に関してLagrangeである。
<!-- formal-statement-end -->

### 証明の見取り図

$S$ に沿う適合局所座標を選ぶと、余法束の条件は二群の座標を零にする独立な方程式となります。その上で正準1形式が零になることを調べます。

<!-- proof-start -->
### 証明

$S$ の任意の点の周囲で埋め込み部分多様体の座標を取り、$Q$ の座標を

$$
(u^1,\ldots,u^k,v^1,\ldots,v^{n-k})
$$

と書き、$S$ が $v=0$ に一致するようにします。対応する余接座標を $(p_{u_1},\ldots,p_{u_k},p_{v_1},\ldots,p_{v_{n-k}})$ とすると、$S$ の接方向は $\partial_{u^a}$ で張られます。余法束の定義を各接方向に適用すると

$$
\alpha_q(\partial_{u^a})=p_{u_a}=0
\qquad(1\le a\le k).
$$

ゆえに $N^*S$ の局所方程式は

$$
v^1=\cdots=v^{n-k}=0,
\qquad
p_{u_1}=\cdots=p_{u_k}=0.
$$

その制約写像のJacobianは、$(v,p_u)$ に対応する $n$ 個の変数の列に単位行列を含みます。従ってその階数は

$$
(n-k)+k=n
$$

です。また自由変数 $(u,p_v)$ が直接パラメータを与えるため、$N^*S$ は局所的に滑らかな埋め込み $n$ 次元部分多様体です。

余法束の局所自明化は重なりでも同じ消滅条件を定めるため、この局所構造は貼り合います。

[正準1形式の座標表示](../SYM3/index.md#prop-sym3-liouville-coordinate)は

$$
\theta=\sum_{a=1}^k p_{u_a}\,du^a+
\sum_{b=1}^{n-k}p_{v_b}\,dv^b
$$

です。これを $N^*S$ へ制限します。各接ベクトルに対して、$p_{u_a}=0$ なので第一の和は消えます。また $v^b$ は余法束の基点上で常に零ですから、その接方向では $dv^b=0$ となり、第二の和も消えます。

従って包含写像 $j:N^*S\hookrightarrow T^*Q$ に対して

$$
j^*\theta=0.
$$

ここに[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を適用すると

$$
j^*\omega_{\mathrm{can}}
=-j^*d\theta
=-d(j^*\theta)=0.
$$

次元は $n$ なので、[Lagrange部分多様体の定義](#def-sym6-lagrangian-submanifold)を満たします。
<!-- proof-end -->

極端な場合、$S=Q$ なら $N^*Q$ は零切断で、$S=\{q_0\}$ が一点なら $N^*S=T^*_{q_0}Q$ は一つの余接ファイバーです。両方ともLagrangeです。基点方向だけ、または運動量方向だけに動かせる場合を一つの構成で説明できます。

## 6. シンプレクティック写像で条件を運ぶ

Lagrange条件は座標によらず2形式の制限で定まります。[SYM2のシンプレクティック微分同相](../SYM2/index.md#def-sym2-symplectomorphism)を通しても保存されます。

<a id="prop-sym6-symplectic-image"></a>

<!-- formal-statement-start -->
> **命題（シンプレクティック微分同相によるLagrange性の保存）**  
> $F:(M,\omega)\to(N,\eta)$ を同じ $2n$ 次元のシンプレクティック多様体間のシンプレクティック微分同相、$L\subset M$ を埋め込みLagrange部分多様体とする。このとき $F(L)\subset N$ も埋め込みLagrange部分多様体である。
<!-- formal-statement-end -->

### 証明の見取り図

微分同相で次元と埋め込みが保たれ、2形式の引き戻しが零になることを合成写像で計算します。

<!-- proof-start -->
### 証明

包含を $i:L\hookrightarrow M$、$F(L)$ の包含を $j:F(L)\hookrightarrow N$ とし、制限 $f=F|_L:L\to F(L)$ を取ります。$F$ と $F^{-1}$ は滑らかなので $f$ は微分同相で、$F(L)$ は埋め込み $n$ 次元部分多様体です。等式 $j\circ f=F\circ i$ と $F^*\eta=\omega$ を使えば

$$
\begin{aligned}
f^*(j^*\eta)
&=(j\circ f)^*\eta\\
&=(F\circ i)^*\eta\\
&=i^*(F^*\eta)\\
&=i^*\omega=0.
\end{aligned}
$$

$f$ は微分同相なので、その引き戻しが零であることから $j^*\eta=0$。従ってLagrangeです。
<!-- proof-end -->

局所的な形を調べる際には[SYM5のDarboux座標](../SYM5/index.md#def-sym5-darboux-chart)を使えます。ただし、Darbouxの定理は周囲の2形式を標準化するのであって、**あらゆる部分多様体を自動的にLagrangeにする定理ではありません**。実際に接空間の等方性を調べる必要があります。

## 7. 演習：包含、次元、グラフ、余法束を自力で確かめる

### Level A：一つの条件を最後まで確認する

#### A1. 一方向の直交補

$\mathbb R^4$ の $\omega_0=dq^1\wedge dp_1+dq^2\wedge dp_2$ と $W=\operatorname{span}\{\partial_{q^1}\}$ に対して $W^\omega$ を求め、$W$ が等方・余等方・Lagrangeのどれか判定せよ。

- Level: A
- ID: SYM6-A1

<!-- solution-start -->
**詳細解答**　$v=a_1e_1+a_2e_2+b_1f_1+b_2f_2$ とおくと

$$
\omega_0(v,e_1)=-b_1.
$$

条件は $b_1=0$ の一つだけなので、

$
W^\omega=\{v:b_1=0\}
=\operatorname{span}\{e_1,e_2,f_2\}.
$

$e_1\in W^\omega$ より $W\subsetneq W^\omega$ で等方ですが、$e_2\in W^\omega\setminus W$ なので余等方ではなく、Lagrangeでもありません。
<!-- solution-end -->

#### A2. 半分の次元でも不適切な平面

$\mathbb R^4$ の標準形式で $W=\operatorname{span}\{\partial_{q^1},\partial_{p_1}\}$ の直交補とLagrange性を求めよ。

- Level: A
- ID: SYM6-A2

<!-- solution-start -->
**詳細解答**　$v=a_1e_1+a_2e_2+b_1f_1+b_2f_2$ に対し

$$
\omega_0(v,e_1)=-b_1,
\qquad
\omega_0(v,f_1)=a_1.
$$

よって $W^\omega=\operatorname{span}\{e_2,f_2\}$ です。$\dim W=2=n$ ですが $\omega_0(e_1,f_1)=1$。従って等方でなく、$W\ne W^\omega$ なのでLagrangeではありません。
<!-- solution-end -->

#### A3. 一自由度のグラフ

$Q=\mathbb R$、$\alpha=3q^2\,dq$ のグラフが $T^*Q$ でLagrangeであることを、パラメータ表示と2形式の直接評価で確かめよ。

- Level: A
- ID: SYM6-A3

<!-- solution-start -->
**詳細解答**　グラフは $s(q)=(q,3q^2)$ で、$\pi\circ s=\operatorname{id}_{\mathbb R}$ なので埋め込みです。接ベクトルは

$$
s'(q)=\partial_q+6q\,\partial_p.
$$

この一次元接空間上の任意の二接ベクトルは $as'(q),bs'(q)$ と書けます。交代性から

$
\omega_{\mathrm{can}}(as',bs')
=ab\,\omega_{\mathrm{can}}(s',s')
=0.
$

グラフは一次元で $\frac12\dim T^*\mathbb R=1$ なのでLagrangeです。別の検算として、$\alpha=d(q^3)$ だから $d\alpha=d^2(q^3)=0$ となり、[グラフ判定](#thm-sym6-graph-criterion)にも一致します。
<!-- solution-end -->

#### A4. 非閉1形式のグラフ

$Q=\mathbb R^2$、$\alpha=q^1dq^2$ とする。$\Gamma_\alpha$ の接ベクトルを求め、2形式が零にならない二方向を示せ。

- Level: A
- ID: SYM6-A4

<!-- solution-start -->
**詳細解答**　グラフの方程式は $p_1=0,p_2=q^1$ です。$q^1,q^2$ に沿って微分すると

$$
v_1=\partial_{q^1}+\partial_{p_2},
\qquad
v_2=\partial_{q^2}.
$$

$dp_2(v_1)=1$、$dq^2(v_2)=1$ だから

$$
\omega_{\mathrm{can}}(v_1,v_2)
=dq^2\wedge dp_2(v_1,v_2)=-1\ne0.
$$

また $d\alpha=dq^1\wedge dq^2\ne0$ で、[グラフ判定](#thm-sym6-graph-criterion)の否定側も確認できます。
<!-- solution-end -->

#### A5. 余法束の自由度

$Q=\mathbb R^3$ で $S=\{(q^1,q^2,q^3):q^3=0\}$ とする。$N^*S$ の座標方程式と次元を求め、$\theta$ の制限が零であることを示せ。

- Level: A
- ID: SYM6-A5

<!-- solution-start -->
**詳細解答**　$S$ の接空間は $\partial_{q^1},\partial_{q^2}$ で張られます。$\alpha=p_1dq^1+p_2dq^2+p_3dq^3$ が両者を零にする条件は $p_1=p_2=0$ です。従って

$$
N^*S=\{q^3=p_1=p_2=0\}.
$$

自由変数は $q^1,q^2,p_3$ なので3次元です。包含 $j:N^*S\hookrightarrow T^*\mathbb R^3$ に沿って正準1形式を引き戻すと、$j^*p_1=j^*p_2=0$ と $j^*dq^3=d(j^*q^3)=0$ から

$
j^*\theta
=j^*(p_1\,dq^1+p_2\,dq^2+p_3\,dq^3)=0.
$

[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)により

$
j^*\omega_{\mathrm{can}}=-d(j^*\theta)=0.
$

次元は $\dim N^*S=3=\frac12\dim T^*\mathbb R^3$ なのでLagrangeです。
<!-- solution-end -->

### Level B：二つ以上の条件を結び付ける

#### B1. 極大等方性の証明を組み立てる

$(V,\omega)$ を $2n$ 次元シンプレクティック空間、$W$ を等方部分空間とする。$\dim W<n$ なら $W$ を真に含む等方部分空間を一つ構成できることを、直交補から示せ。

- Level: B
- ID: SYM6-B1

<!-- solution-start -->
**詳細解答**　[シンプレクティック直交補の次元](#lem-sym6-orthogonal-dimension)から

$$
\dim W^\omega=2n-\dim W>\dim W.
$$

等方性によって $W\subseteq W^\omega$ なので、$v\in W^\omega\setminus W$ が選べます。$U=W+\mathbb Rv$ と置けば $\dim U=\dim W+1$。$w,w'\in W$ と $a,b\in\mathbb R$ に対し

$$
\omega(w+av,w'+bv)
=\omega(w,w')+b\omega(w,v)+a\omega(v,w')+ab\omega(v,v)=0.
$$

第1項は $W$ の等方性から消え、第2項は $\omega(w,v)=-\omega(v,w)=0$、第3項は $\omega(v,w')=0$、第4項は交代性 $\omega(v,v)=0$ から消えます。よって $U$ は求める真の等方拡大です。
<!-- solution-end -->

#### B2. 位置と運動量が混じるLagrange平面

$\mathbb R^4$ の標準形式で $W=\operatorname{span}\{\partial_{q^1},\partial_{p_2}\}$ とする。定義から直交補を計算し、Lagrange判定定理でも結論を照合せよ。

- Level: B
- ID: SYM6-B2

<!-- solution-start -->
**詳細解答**　$v=a_1e_1+a_2e_2+b_1f_1+b_2f_2$ に対して

$$
\omega_0(v,e_1)=-b_1,
\qquad
\omega_0(v,f_2)=a_2.
$$

従って $W^\omega=\{b_1=a_2=0\}=\operatorname{span}\{e_1,f_2\}=W$。また内部の生成元について $\omega_0(e_1,f_2)=0$、同じベクトルとの組も零ですから等方で、$\dim W=2=n$。従って[線形判定定理](#thm-sym6-lagrangian-criterion)の必要十分条件も満たします。
<!-- solution-end -->

#### B3. 閉性と完全性を区別する

$Q=\mathbb R^2$ で $\alpha=(2q^1+q^2)\,dq^1+(q^1+2q^2)\,dq^2$ とする。グラフがLagrangeであるか判定し、$\alpha=df$ となる具体的な関数 $f$ を求めよ。

- Level: B
- ID: SYM6-B3

<!-- solution-start -->
**詳細解答**　係数を $a_1=2q^1+q^2$、$a_2=q^1+2q^2$ とすると

$$
\partial_{q^2}a_1=1=\partial_{q^1}a_2.
$$

従って

$$
d\alpha=(\partial_{q^1}a_2-\partial_{q^2}a_1)\,dq^1\wedge dq^2=0.
$$

[グラフ判定](#thm-sym6-graph-criterion)によりLagrangeです。$\partial_{q^1}f=2q^1+q^2$ を先に積分すると

$$
f=(q^1)^2+q^1q^2+h(q^2).
$$

これを $q^2$ で微分すれば

$$
\partial_{q^2}f=q^1+h'(q^2)=q^1+2q^2,
\qquad h'(q^2)=2q^2.
$$

$h'(q^2)=2q^2$ を積分すると $h(q^2)=(q^2)^2+C$ です。従って求める原始関数は

$
f(q^1,q^2)=(q^1)^2+q^1q^2+(q^2)^2+C.
$

これを両変数で偏微分すれば、元の1形式の両係数に戻ります。閉性の判定と原始関数の具体構成は別段階で確認しました。
<!-- solution-end -->

#### B4. 曲線の余法束

$Q=\mathbb R^2$、$S=\{(q^1,q^2):q^2=(q^1)^2\}$ とする。$N^*S$ を二つの自由変数でパラメータ表示し、標準2形式の引き戻しが零になることを直接計算せよ。

- Level: B
- ID: SYM6-B4

<!-- solution-start -->
**詳細解答**　$S$ のパラメータを $u\mapsto(u,u^2)$ とすると接ベクトルは $\partial_{q^1}+2u\partial_{q^2}$ です。余ベクトル $p_1dq^1+p_2dq^2$ がこれを零にする条件は $p_1+2up_2=0$。$p_2=s$ と置いて

$$
F(u,s)=(q^1,q^2,p_1,p_2)=(u,u^2,-2us,s)
$$

を得ます。第一成分と第四成分から $(u,s)$ を連続に復元でき、微分も階数2なので $F$ は埋め込みです。座標関数を $F$ に沿って引き戻して微分すると

$
\begin{aligned}
F^*dq^1&=du,&F^*dq^2&=2u\,du,\\
F^*dp_1&=-2s\,du-2u\,ds,&F^*dp_2&=ds.
\end{aligned}
$

よって

$$
\begin{aligned}
F^*\omega_{\mathrm{can}}
&=du\wedge(-2s\,du-2u\,ds)
 +(2u\,du)\wedge ds\\
&=-2u\,du\wedge ds+2u\,du\wedge ds=0.
\end{aligned}
$$

二つの自由変数で2次元であり、$T^*\mathbb R^2$ の半分の次元ですからLagrangeです。
<!-- solution-end -->

#### B5. 円周上の閉1形式は完全とは限らない

$Q=S^1=\mathbb R/(2\pi\mathbb Z)$ とし、各局所角度座標 $t$ で $\alpha=dt$ と書く1形式を考える。次を示せ。

1. この局所表示が大域的な滑らかな1形式を定め、$d\alpha=0$ となること。
2. $\alpha=df$ を満たす大域的な滑らかな実数値関数 $f$ は存在しないこと。
3. それでも $\Gamma_\alpha\subset T^*S^1$ はLagrange部分多様体になること。

- Level: B
- ID: SYM6-B5

<!-- solution-start -->
**詳細解答**

**(1)**　同じ円周上の点を表す二つの角度の差は局所的に $2\pi k$（$k\in\mathbb Z$ は定数）です。したがって座標変換は $t'=t+2\pi k$ となり、

$
dt'=d(t+2\pi k)=dt.
$

局所表示が重なりで一致するので $\alpha$ は大域的な滑らかな1形式です。また各座標上で

$
d\alpha=d(dt)=0.
$

局所的に零である2形式は大域的にも零です。

**(2)**　円周を一周する曲線 $\gamma:[0,2\pi]\to S^1$、$\gamma(t)=[t]$ に沿って積分すると

$
\int_\gamma\alpha
=\int_0^{2\pi}\gamma^*\alpha
=\int_0^{2\pi}dt=2\pi.
$

もし $\alpha=df$ なら、合成 $f\circ\gamma$ は $[0,2\pi]$ 上の滑らかな実数値関数であり、

$
\int_\gamma df
=(f\circ\gamma)(2\pi)-(f\circ\gamma)(0)
=f([0])-f([0])=0.
$

これは $2\pi\ne0$ に矛盾します。ゆえに $\alpha$ は閉形式ですが完全形式ではありません。

**(3)**　$\alpha$ は滑らかで (1) から $d\alpha=0$ です。[閉1形式のグラフのLagrange判定](#thm-sym6-graph-criterion)を $Q=S^1$ に適用すると、グラフ写像は埋め込みで、

$
s_\alpha^*\omega_{\mathrm{can}}=-d\alpha=0,
\qquad
\dim\Gamma_\alpha=1=\tfrac12\dim T^*S^1.
$

従って $\Gamma_\alpha$ はLagrangeです。(2) より、このグラフを大域的な関数の微分 $df$ のグラフとして書くことはできません。
<!-- solution-end -->

### Level C：グラフと座標変換を接続する

#### C1. 閉形式のグラフをファイバー平行移動で作る

$Q=\mathbb R^2$、$\alpha=q^2\,dq^1+q^1\,dq^2$ とし、$T^*Q$ の座標を $(q^1,q^2,p_1,p_2)$ とする。写像

$$
T_\alpha(q,p)=(q,p+\alpha_q)
$$

について、次を示せ。

1. $T_\alpha$ が全域微分同相であることと、その逆写像を求めよ。
2. $T_\alpha^*\theta$ と $T_\alpha^*\omega_{\mathrm{can}}$ を求め、正準形式を保つことを確認せよ。
3. 零切断の像がLagrange部分多様体であることを、グラフ判定と写像による保存の二通りで示せ。
4. $\alpha$ を $\beta=q^1dq^2$ に変えたとき、正準形式の保存とLagrange性のどの計算が失敗するかを具体的に示せ。

- Level: C
- ID: SYM6-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$T_\alpha$ は運動量だけを平行移動し、

$
T_\alpha(q^1,q^2,p_1,p_2)
=(q^1,q^2,p_1+q^2,p_2+q^1)
$

です。像の運動量を $P_1,P_2$ とすると $p_1=P_1-q^2$、$p_2=P_2-q^1$ なので

$
T_\alpha^{-1}(q^1,q^2,P_1,P_2)
=(q^1,q^2,P_1-q^2,P_2-q^1).
$

互いに合成すれば元の4座標へ戻ります。双方とも全域で滑らかなので微分同相です。

**(2)**　[正準1形式の座標表示](../SYM3/index.md#prop-sym3-liouville-coordinate)に代入すると

$$
\begin{aligned}
T_\alpha^*\theta
&=(p_1+q^2)\,dq^1+(p_2+q^1)\,dq^2\\
&=\theta+\alpha.
\end{aligned}
$$

従って[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)より

$$
T_\alpha^*\omega_{\mathrm{can}}
=-d(T_\alpha^*\theta)
=-d\theta-d\alpha
=\omega_{\mathrm{can}}-d\alpha.
$$

ここで $d\alpha=dq^2\wedge dq^1+dq^1\wedge dq^2=0$ なので保存されます。これは[SYM3の平行移動判定](../SYM3/index.md#thm-sym3-translation-criterion)とも一致します。

**(3)**　零切断 $p=0$ は[SYM3の零切断の命題](../SYM3/index.md#prop-sym3-zero-section-fibers)および[グラフ判定](#thm-sym6-graph-criterion)からLagrangeです。その $T_\alpha$ による像は

$$
p_1=q^2,\qquad p_2=q^1
$$

で定まるグラフです。$d\alpha=0$ を使った[グラフ判定](#thm-sym6-graph-criterion)により、この像も直接Lagrangeと判定できます。

別の方法として、(2)で $T_\alpha$ はシンプレクティック微分同相と分かりました。[シンプレクティック微分同相によるLagrange性の保存](#prop-sym6-symplectic-image)を零切断に適用しても同じ結論です。

**(4)**　$\beta=q^1dq^2$ なら $d\beta=dq^1\wedge dq^2$ です。従って

$$
T_\beta^*\omega_{\mathrm{can}}
=\omega_{\mathrm{can}}-dq^1\wedge dq^2
\ne\omega_{\mathrm{can}}.
$$

零切断の像は $p_1=0,p_2=q^1$ となり、その上で

$$
s_\beta^*\omega_{\mathrm{can}}=-d\beta
=-dq^1\wedge dq^2\ne0.
$$

従ってLagrangeではありません。壊れた仮定は1形式の閉性であり、写像の微分同相性やグラフの次元ではありません。
<!-- solution-end -->

## 8. 次に何が変わるか

線形空間ではLagrange条件を「等方で半分の次元」と言い換えられ、部分多様体ではそれを各接空間で確かめられました。余接束のグラフについては閉1形式であることがちょうど判定条件であり、余法束は埋め込みと次元を検証したうえで自然な例になります。

次のSYM7では2形式そのものを変形させます。本章ではシンプレクティック写像がLagrange部分多様体を運ぶことを確認しましたが、変形の族からそのような写像を構成するには、非退化性と流れの存在域を別途保証する必要があります。