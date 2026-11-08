# IG6 アファイン接続と統計的測地線

<!-- definition-example-audit: strict -->

[IG2 の Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)によって、確率分布の族に曲線の長さを定められます。[IG5 の双対座標](../IG5/index.md#thm-ig5-mean-diffeomorphism)によって、同じ分布に自然母数と期待値母数という異なる表示を与えられました。しかし計量を知っただけでは、「座標成分が一定の速さで変わる」をどの座標で採用するかは決まりません。

たとえば Bernoulli 族で成功確率 $p$ を $1/4$ から $3/4$ まで直線的に変える曲線を考えると、対数オッズ $a=\log\{p/(1-p)\}$ は直線的には変わりません。**座標の形に依存しない「速度の変わらなさ」**を記述するには、座標の変化を補正する規則が必要です。この規則がアフィン接続です。

本講では [GEO13 のアフィン接続](../../GEO/GEO13/index.md#def-geo13-affine-connection)と [GEO14 の測地線](../../GEO/GEO14/index.md#def-geo14-geodesic)を、統計モデル上で使える形に接続します。座標係数の変換則を導き、Bernoulli 族で **任意に選んだ接続**と **Fisher 計量から定まる Levi-Civita 接続**を実際に計算して区別します。後に計量に関する二つの接続の双対性を考える際の準備になります。

## 1. 分布の族で何を平行と見るか

[IG1 の幾何学的正則性](../IG1/index.md#def-ig1-geometric-regularity)を満たす統計モデルを、滑らかな $d$ 次元多様体 $\mathcal S$ として扱い、局所座標を $x=(x^1,\ldots,x^d)$ と書きます。$x$ の微小変化による接ベクトルは $\partial_i=\partial/\partial x^i$ を基底として表されます。ここでは Fisher 情報行列が正定値となる範囲に制限し、計量 $g$ が非退化なものとします。

各点の接空間は異なるベクトル空間です。曲線に沿った二点の速度ベクトルを「同じ」と比べるには、単にその成分を引くだけでは足りません。[GEO13 の共変微分](../../GEO/GEO13/index.md#def-geo13-affine-connection)では、ベクトル場 $Y$ を方向 $X$ に沿って変化させる演算 $\nabla_XY$ を与えます。第一変数には関数倍の線形性、第二変数には Leibniz 則を課すため、座標を変えても同じ演算になります。

<a id="def-ig6-connection-choice"></a>

<!-- formal-statement-start -->
> **定義（統計モデル上の接続の選択）**
> 滑らかな正則統計モデル $\mathcal S$ の接束上に、[アフィン接続の公理](../../GEO/GEO13/index.md#def-geo13-affine-connection)を満たす演算 $\nabla$ を選ぶことを、**統計モデル上の接続の選択**という。局所座標 $x$ におけるその係数は

$$
\nabla_{\partial_i}\partial_j=\Gamma^k_{ij}\partial_k
$$

> で定める。ここでは $\Gamma^k_{ij}$ を上添字 $k$、下添字 $i,j$ の順で書き、同じ上下添字について和を取る。接続 $\nabla$ の選択は、計量 $g$ を与えることとは別のデータである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig6-connection-choice -->
**定義の確認**（成功確率の区間）。Bernoulli 分布 $P_p(X=1)=p$, $P_p(X=0)=1-p$ の母数領域 $M=(0,1)$ 上で、$X=f(p)\partial_p$, $Y=h(p)\partial_p$ に対し

$$
\nabla^P_XY=f(p)h'(p)\partial_p
$$

とします。$f$ については関数倍の線形性を満たし、任意の滑らかな $u$ について

$$
\nabla^P_X(uY)=f(uh)'\partial_p=X(u)Y+u\nabla^P_XY
$$

です。$Y$ についての実数線形性も微分の線形性から従います。よって接続の全公理を満たし、$\nabla^P_{\partial_p}\partial_p=0$、すなわち $\Gamma^p_{pp}=0$ です。これは単に一つの係数が零なだけでなく、$p$ 座標で定義した一つの接続を表します。
<!-- definition-example-end -->

**計量との違い**。[IG2 の Bernoulli 計量](../IG2/index.md#def-ig2-fisher-information)は $g_{pp}=1/[p(1-p)]$ です。これは $p$ 座標で常数ではありません。後に計算するように、$\nabla^P$ はこの計量を一般には保存しません。接続を選ぶ際に Fisher 計量との両立性を要求したわけではないため、矛盾はありません。

## 2. 座標を変えると接続係数は変わる

[GEO13 の接続係数](../../GEO/GEO13/index.md#def-geo13-christoffel)が零かどうかは、座標を指定しなければ意味を持ちません。二つの座標 $x=(x^i)$, $y=(y^a)$ が重なる開集合で滑らかに可逆とし、Jacobian と逆 Jacobian を

$$
P^i_b=\frac{\partial x^i}{\partial y^b},
\qquad Q^a_k=\frac{\partial y^a}{\partial x^k}
$$

と書きます。$\partial/\partial y^b=P^i_b\partial_i$ ですから、接続の Leibniz 則は、基底の変化そのものの微分を生みます。これが一般のテンソル成分変換にはない二階微分の項です。

ここで、座標によらず真っすぐに進む曲線の条件を先に確定します。[GEO13 の曲線に沿う共変微分](../../GEO/GEO13/index.md#def-geo13-curve-covariant-derivative)を $D^\nabla/dt$ と書くと、[GEO14 の測地線](../../GEO/GEO14/index.md#def-geo14-geodesic)の速度平行条件は一般の接続にも意味を持ちます。

<a id="def-ig6-connection-geodesic"></a>

<!-- formal-statement-start -->
> **定義（接続依存の統計的測地線）**
> 滑らかな統計多様体 $\mathcal S$ にアフィン接続 $\nabla$ を選ぶ。区間 $I$ 上の $C^2$ 曲線 $\gamma:I\to\mathcal S$ が

$$
\frac{D^\nabla\dot\gamma}{dt}=0
$$

> を満たすとき、これを **$\nabla$-測地線**という。局所座標 $x(t)$ では $\ddot x^k+\Gamma^k_{ij}(x)\dot x^i\dot x^j=0$ に等しい。この定義は接続を指定して初めて意味を持ち、計量の距離最小曲線という条件を一般には含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig6-connection-geodesic -->
**定義の確認**。$(0,1)$ 上の $p$ 座標で係数零の $\nabla^P$ を使い、$p(t)=p_0+vt$ が $(0,1)$ に入る時間区間を取ります。$\dot p=v$、$\ddot p=0$、$\Gamma^p_{pp}=0$ なので $D^{\nabla^P}\dot\gamma/dt=0$ を満たします。単に座標線が直線だというだけでなく、定義の方程式を確認しました。
<!-- definition-example-end -->

<a id="thm-ig6-coordinate-covariance"></a>

<!-- formal-statement-start -->
> **定理（接続係数の変換則と測地線方程式の不変性）**
> 滑らかな多様体 $M$ 上のアフィン接続 $\nabla$ を取り、重なる局所座標 $x=(x^i)$ と $y=(y^a)$ が $C^2$ 級以上で滑らかに可逆であるとする。$x$ 座標の係数を $\Gamma^k_{ij}$、$y$ 座標の係数を $\widetilde\Gamma^a_{bc}$ とすると

$$
\boxed{\widetilde\Gamma^a_{bc}
=Q^a_k\left(P^i_bP^j_c\Gamma^k_{ij}
+\frac{\partial^2x^k}{\partial y^b\partial y^c}\right).}
$$

> また $C^2$ 曲線 $\gamma(t)$ の座標を $x(t)$、$y(t)$ とすると、次の二組の方程式は同値である。

$$
\ddot x^k+\Gamma^k_{ij}(x)\dot x^i\dot x^j=0,
\qquad
\ddot y^a+\widetilde\Gamma^a_{bc}(y)\dot y^b\dot y^c=0.
$$
<!-- formal-statement-end -->

**証明の見取り図**：$y$ の座標基底を $x$ の座標基底で展開し、共変微分の積の法則を適用します。測地線方程式では逆変換の二階微分が、速度の二階連鎖律で現れる項を打ち消します。

<!-- proof-start -->
### 証明

$\partial_b^y=P_b^i\partial_i$ とおきます。[共変微分の座標公式](../../GEO/GEO13/index.md#prop-geo13-coordinate-formula)を基底へ適用すると

$$
\begin{aligned}
\nabla_{\partial_b^y}\partial_c^y
&=P_b^i\nabla_{\partial_i}(P_c^j\partial_j)\\
&=P_b^i(\partial_iP_c^k+P_c^j\Gamma^k_{ij})\partial_k\\
&=\left(\frac{\partial^2x^k}{\partial y^b\partial y^c}
+P_b^iP_c^j\Gamma^k_{ij}\right)Q^a_k\partial_a^y.
\end{aligned}
$$

最後の行は $P_b^i\partial_i=\partial_b^y$ および $\partial_k=Q_k^a\partial_a^y$ を使いました。係数を比較して第一式を得ます。

次に $y^a(t)=y^a(x(t))$ を二回微分すると

$$
\ddot y^a=Q^a_k\ddot x^k+
\frac{\partial^2y^a}{\partial x^i\partial x^j}\dot x^i\dot x^j.
$$

恒等写像 $y^a(x(y))=y^a$ の二階微分は

$$
Q^a_k\frac{\partial^2x^k}{\partial y^b\partial y^c}
+\frac{\partial^2y^a}{\partial x^i\partial x^j}P^i_bP^j_c=0
$$

を与えます。$\dot x^i=P^i_b\dot y^b$ とともに第一式を代入すると

$$
\begin{aligned}
\ddot y^a+\widetilde\Gamma^a_{bc}\dot y^b\dot y^c
&=Q^a_k\ddot x^k
+\frac{\partial^2y^a}{\partial x^i\partial x^j}\dot x^i\dot x^j\\
&\quad+Q^a_k\Gamma^k_{ij}\dot x^i\dot x^j
+Q^a_k\frac{\partial^2x^k}{\partial y^b\partial y^c}\dot y^b\dot y^c\\
&=Q^a_k(\ddot x^k+\Gamma^k_{ij}\dot x^i\dot x^j).
\end{aligned}
$$

$Q$ は可逆なので右辺が零であることと、$x$ 座標の各方程式が零であることは同値です。$\square$
<!-- proof-end -->

**具体例**（二乗座標）。先ほどの $\nabla^P$ を $q=p^2\in(0,1)$ で書きます。$p=\sqrt q$ なので

$$
\frac{dq}{dp}=2p,
\quad \frac{dp}{dq}=\frac{1}{2\sqrt q},
\quad \frac{d^2p}{dq^2}=-\frac{1}{4q^{3/2}}.
$$

$\Gamma^p_{pp}=0$ を定理の一次元版へ代入すると

$$
\widetilde\Gamma^q_{qq}=\frac{dq}{dp}\frac{d^2p}{dq^2}=-\frac1{2q}.
$$

同じ接続なのに $q$ 座標の係数は零ではありません。$q$ を新しい別のモデルと誤認せず、同じ確率分布 $p=\sqrt q$ を二通りに表示していることが肝心です。

## 3. 速度を自分自身に平行に運ぶ曲線

一般の接続 $\nabla$ に対する [曲線に沿う共変微分](../../GEO/GEO13/index.md#def-geo13-curve-covariant-derivative)を $D^\nabla/dt$ と書きます。曲線 $\gamma$ に沿うベクトル $V=V^k\partial_k$ に対し

$$
\frac{D^\nabla V}{dt}
=\left(\dot V^k+\Gamma^k_{ij}(x(t))\dot x^iV^j\right)\partial_k
$$

です。$D^\nabla V/dt=0$ が[平行移動](../../GEO/GEO13/index.md#def-geo13-parallel-transport)の条件です。特に $V=\dot\gamma$ を代入すると、[接続依存の測地線](#def-ig6-connection-geodesic)は「進む速度を、その速度自身に平行に保つ」曲線になります。

**二乗座標での追加確認**。前節の $p(t)=p_0+vt$ を $q(t)=(p_0+vt)^2$ で表すと $\ddot q=2v^2$ ですが、$\widetilde\Gamma^q_{qq}=-1/(2q)$ と $\dot q=2pv$ を使うと

$$
\ddot q+\widetilde\Gamma^q_{qq}\dot q^2
=2v^2-\frac{(2pv)^2}{2p^2}=0.
$$

直線に見えなくても同じ接続測地線です。

<a id="thm-ig6-connection-local-odes"></a>

<!-- formal-statement-start -->
> **定理（平行移動と接続測地線の局所存在一意性）**
> $M$ を滑らかな有限次元多様体、$\nabla$ を滑らかなアフィン接続とする。
> (i) $C^1$ 曲線 $\gamma:I\to M$ と時刻 $t_0\in I$、初期ベクトル $V_0\in T_{\gamma(t_0)}M$ が与えられると、次を満たす曲線沿いのベクトル場が一意に存在する。

$$
\frac{D^\nabla V}{dt}=0,\qquad V(t_0)=V_0.
$$

> これは $I$ の各コンパクト部分区間で解をつないで得られる。
>
> (ii) 任意の点 $m\in M$ と初速度 $v\in T_mM$ に対し、次を満たす $\nabla$-測地線が時刻0の近傍に一意に存在する。

$$
\gamma(0)=m,\qquad \dot\gamma(0)=v.
$$
<!-- formal-statement-end -->

**証明の見取り図**：平行移動はベクトル成分に関する線形常微分方程式です。測地線は位置と速度を一組の未知量にすれば滑らかな一階方程式へ帰着します。存在一意性に必要なのは、接続係数の滑らかさと局所座標です。

<!-- proof-start -->
### 証明

1. $\gamma$ が一つの座標近傍にある部分区間では、係数 $A^k{}_j(t)=\Gamma^k_{ij}(x(t))\dot x^i(t)$ は連続です。平行条件は

   $$
   \dot V^k(t)=-A^k{}_j(t)V^j(t),\qquad V^k(t_0)=V_0^k
   $$

   です。連続係数の線形常微分方程式の存在一意性により、この区間全体で一意の解があります。曲線の像を覆う座標近傍を有限個使い、重なりでは初期値の一意性によって解が一致するので、任意のコンパクト部分区間まで延長できます。これらが重なりで一致するため、$I$ 上の一意な平行場になります。

2. 点 $m$ の座標近傍で速度を $v^k=\dot x^k$ と書きます。測地線方程式は

   $$
   \dot x^k=v^k,
   \qquad \dot v^k=-\Gamma^k_{ij}(x)v^iv^j
   $$

   です。右辺は $(x,v)$ の滑らかな関数なので局所 Lipschitz です。既習の[測地線方程式の常微分方程式への帰着](../../GEO/GEO14/index.md#thm-geo14-geodesic-existence)と同じ局所存在一意性の論法を、今の滑らかな $\Gamma$ に適用できます。座標の重なりで得る解は[変換則](#thm-ig6-coordinate-covariance)により同じ幾何学的曲線を表します。$\square$
<!-- proof-end -->

**平行移動の意味**：$p$ 座標での $\nabla^P$ に沿うベクトル成分 $V^p$ は $\dot V^p=0$ です。しかしこれは Fisher 内積の長さを固定することを意味しません。$g_{pp}(p)(V^p)^2=(V^p)^2/[p(1-p)]$ は曲線に沿って変わり得ます。

## 4. 接続の差と捩率

係数 $\Gamma^k_{ij}$ は座標を取り替えると二階微分項を持つため、単体ではテンソル成分ではありません。一方、**二つの接続を引けば**その余分な項が相殺されます。これを先に知っておくと、異なる接続を統計モデル上で比較できます。

[GEO13 の接続の差](../../GEO/GEO13/index.md#prop-geo13-connection-difference)と[捩率](../../GEO/GEO13/index.md#def-geo13-torsion)の定義に従い、$A(X,Y)=\nabla_XY-\bar\nabla_XY$、$T(X,Y)=\nabla_XY-\nabla_YX-[X,Y]$ と書きます。座標基底は交換するので $[\partial_i,\partial_j]=0$ です。

<a id="prop-ig6-difference-torsion"></a>

<!-- formal-statement-start -->
> **命題（接続の差と捩率の座標表示）**
> 滑らかな多様体 $M$ 上の二つのアフィン接続 $\nabla,\bar\nabla$ の係数を同一の座標で $\Gamma^k_{ij},\bar\Gamma^k_{ij}$ とする。このとき差 $A(X,Y)=\nabla_XY-\bar\nabla_XY$ は $(1,2)$ 型テンソルであり、その成分は $A^k_{ij}=\Gamma^k_{ij}-\bar\Gamma^k_{ij}$ である。また $\nabla$ の捩率 $T$ の座標成分は

$$
T^k_{ij}=\Gamma^k_{ij}-\Gamma^k_{ji}.
$$

> 特に $\nabla$ が捩率零であることと、任意の座標で $\Gamma^k_{ij}=\Gamma^k_{ji}$ が成立することは同値である。
<!-- formal-statement-end -->

**証明の見取り図**：Leibniz 則で $X(f)Y$ が差の中では相殺されるため、$A$ は両変数で関数倍に関して線形です。捩率は座標基底に代入すれば下添字の反対称部分になります。

<!-- proof-start -->
### 証明

任意の滑らかな関数 $f$ に対して、第一変数の線形性から $A(fX,Y)=fA(X,Y)$ です。また

$$
\begin{aligned}
A(X,fY)
&=\nabla_X(fY)-\bar\nabla_X(fY)\\
&=X(f)Y+f\nabla_XY-X(f)Y-f\bar\nabla_XY\\
&=fA(X,Y).
\end{aligned}
$$

ゆえに $A$ はテンソルです。$X=\partial_i,Y=\partial_j$ とおけば $A(\partial_i,\partial_j)=(\Gamma^k_{ij}-\bar\Gamma^k_{ij})\partial_k$ です。捩率も座標基底で評価すると

$$
T(\partial_i,\partial_j)=\nabla_{\partial_i}\partial_j-\nabla_{\partial_j}\partial_i
-[\partial_i,\partial_j]
=(\Gamma^k_{ij}-\Gamma^k_{ji})\partial_k.
$$

$T$ は [GEO13 の捩率のテンソル性](../../GEO/GEO13/index.md#prop-geo13-torsion-tensor)によりテンソルであるため、一つの座標で全成分が零なら座標に依らず捩率零です。$\square$
<!-- proof-end -->

一次元では下添字 $i,j$ がどちらも同じ値を取るため、**どの接続も捩率零**です。ただし捩率零から計量両立性は出ません。また一般接続で測る曲がりと Fisher 計量の Levi-Civita 曲率を区別する必要があります。後者の定義は[GEO16 の曲率作用素](../../GEO/GEO16/index.md#def-geo16-curvature)で学べます。

## 5. Fisher 計量が選ぶ接続と Bernoulli 族

ここで初めて計量を使って一つの接続を選びます。[GEO13 の計量両立性](../../GEO/GEO13/index.md#def-geo13-metric-compatibility)は $Xg(Y,Z)=g(\nabla_XY,Z)+g(Y,\nabla_XZ)$ を要求します。平行移動中の内積が一定となるためには、この条件が必要です。これと捩率零の二条件から一意に選べるのが [Levi-Civita 接続](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)です。

<a id="def-ig6-fisher-levi-civita"></a>

<!-- formal-statement-start -->
> **定義（Fisher--Levi-Civita 接続）**
> Fisher--Rao 計量 $g$ が正定値な滑らかな統計多様体 $(\mathcal S,g)$ に対し、$g$ と計量両立かつ捩率零である一意な接続を **Fisher 計量の Levi-Civita 接続**と呼び、$\nabla^{\mathrm{LC}}$ と書く。その座標係数は

$$
\Gamma^{\mathrm{LC},k}_{ij}=
\frac12g^{k\ell}
\left(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij}\right),
$$

> ただし $(g^{k\ell})$ は正定値行列 $(g_{k\ell})$ の逆行列である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig6-fisher-levi-civita -->
**定義の確認**（Bernoulli）。$g_{pp}=1/[p(1-p)]>0$、$g^{pp}=p(1-p)$ です。一次元なので捩率は零で、係数公式から

$$
\Gamma^{\mathrm{LC},p}_{pp}
=\frac12g^{pp}\frac{dg_{pp}}{dp}
=\frac{2p-1}{2p(1-p)}.
$$

計量両立性も直接確認します。$dg_{pp}/dp=(2p-1)/[p^2(1-p)^2]$ なので

$$
2\Gamma^{\mathrm{LC},p}_{pp}g_{pp}
=\frac{2p-1}{p(1-p)}\frac1{p(1-p)}
=\frac{dg_{pp}}{dp}.
$$

両方の非自明条件を満たすため、[Levi-Civita 接続の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)によってこれが要求された接続です。対して $\nabla^P$ の係数は零なので、$p\ne1/2$ では計量両立条件を満たしません。
<!-- definition-example-end -->

<a id="def-ig6-bernoulli-probability-connection"></a>

<!-- formal-statement-start -->
> **定義（Bernoulli 族の成功確率アファイン接続）**
> $p\in(0,1)$ について次の Bernoulli 統計多様体を考える。

$$
M=\{P_p:p\in(0,1)\},\quad P_p(X=1)=p,\quad P_p(X=0)=1-p.
$$

> 成功確率座標 $p$ で接続係数を零と定める。

$$
\nabla^P_{\partial_p}\partial_p=0.
$$

> 他の座標では[接続係数の変換則](#thm-ig6-coordinate-covariance)で定める接続を $\nabla^P$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig6-bernoulli-probability-connection -->
**定義の確認**。第1節では $\nabla^P_{f\partial_p}(h\partial_p)=fh'\partial_p$ と具体的に構成し、接続の公理を確かめました。$p\mapsto a=\log\{p/(1-p)\}$ は $(0,1)\to\mathbb R$ の滑らかな一対一対応で、その逆は $p=e^a/(1+e^a)$ です。よって[座標変換則](#thm-ig6-coordinate-covariance)は全域で適用できます。次の命題で変換後の係数と測地線を計算します。
<!-- definition-example-end -->

<a id="prop-ig6-bernoulli-two-connections"></a>

<!-- formal-statement-start -->
> **命題（Bernoulli 族の二つの接続と測地線）**
> 成功確率 $p\in(0,1)$ の Bernoulli 族に、Fisher 計量 $g_{pp}=1/[p(1-p)]$、成功確率接続 $\nabla^P$、Fisher--Levi-Civita 接続 $\nabla^{\mathrm{LC}}$ を入れる。すると

$$
\Gamma^{P,p}_{pp}=0,
\qquad
\Gamma^{\mathrm{LC},p}_{pp}=\frac{2p-1}{2p(1-p)}.
$$

> 対数オッズ $a=\log\{p/(1-p)\}$ での係数はそれぞれ

$$
\Gamma^{P,a}_{aa}=1-2p,
\qquad
\Gamma^{\mathrm{LC},a}_{aa}=\frac{1-2p}{2},
\quad p=\frac{e^a}{1+e^a}.
$$

> また、$p$ 座標の $\nabla^P$-測地線は $p(t)=p_0+vt$（ただし $0<p(t)<1$）であり、$\nabla^{\mathrm{LC}}$-測地線は $s=2\arcsin\sqrt p\in(0,\pi)$ を用いて $s(t)=s_0+ct$ と書ける。
<!-- formal-statement-end -->

**証明の見取り図**：まず $dp/da=p(1-p)$ を二度微分して非線形座標の補正を計算します。次に一次元の Levi-Civita 公式を適用します。最後に Fisher 計量を $ds^2$ に変える座標を積分して、一定速度の測地線を求めます。

<!-- proof-start -->
### 証明

$\nabla^P$ の $p$ 座標係数は定義から零です。$a$ による逆変換 $p(a)=e^a/(1+e^a)$ を微分すると

$$
\frac{dp}{da}=p(1-p),\qquad
\frac{d^2p}{da^2}=p(1-p)(1-2p),\qquad
\frac{da}{dp}=\frac1{p(1-p)}.
$$

よって[変換則](#thm-ig6-coordinate-covariance)から

$$
\Gamma^{P,a}_{aa}=\frac{da}{dp}\frac{d^2p}{da^2}=1-2p.
$$

一方、Levi-Civita 公式（[GEO13](../../GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)）と $g_{pp}=1/[p(1-p)]$ により

$$
\Gamma^{\mathrm{LC},p}_{pp}
=\frac12p(1-p)\frac{2p-1}{p^2(1-p)^2}
=\frac{2p-1}{2p(1-p)}.
$$

これも同じ変数変換を行うと

$$
\begin{aligned}
\Gamma^{\mathrm{LC},a}_{aa}
&=\frac{da}{dp}\left\{\left(\frac{dp}{da}\right)^2\Gamma^{\mathrm{LC},p}_{pp}+\frac{d^2p}{da^2}\right\}\\
&=\frac{2p-1}{2}+(1-2p)=\frac{1-2p}{2}.
\end{aligned}
$$

$\nabla^P$ の測地線方程式は $\ddot p=0$ なので、解は $p(t)=p_0+vt$ です。次に Fisher 計量の弧長座標を構成します。

$$
s(p)=\int^p\frac{du}{\sqrt{u(1-u)}}=2\arcsin\sqrt p
$$

と定数を選べば $ds/dp=1/\sqrt{p(1-p)}$ です。この座標で

$$
g_{ss}=g_{pp}\left(\frac{dp}{ds}\right)^2
=\frac1{p(1-p)}\,p(1-p)=1.
$$

従って Levi-Civita 係数は $\Gamma^{\mathrm{LC},s}_{ss}=\frac12g^{ss}dg_{ss}/ds=0$ となり、[測地線方程式](../../GEO/GEO14/index.md#prop-geo14-geodesic-equation) $\ddot s=0$ から $s(t)=s_0+ct$ を得ます。$s\in(0,\pi)$ に収まる区間で成り立ちます。$\square$
<!-- proof-end -->

**何が違うのか**。同じ端点を結ぶとき、$p$ の線形補間と $s$ の線形補間は一般に異なる時刻配分を与えます。ただし Bernoulli 族は一次元なので、両端の間を単調に進むなら**曲線の像も Fisher 長さも同じ**です。長さだけが異なる、または $p$ の線形補間が最短でない、と結論するのは誤りです。違うのはどちらの接続について速度を平行に運ぶかです。高次元では曲線の像自体が異なる場合もあります。

## 6. 時刻を取り替えると測地線なのか

上の違いを正確に述べるために、測地線方程式に曲線のパラメータを入れ直してみます。$t=t(u)$ は $C^2$ 級で $dt/du\ne0$ とし、$\widehat\gamma(u)=\gamma(t(u))$ とします。

<a id="prop-ig6-affine-reparameterization"></a>

<!-- formal-statement-start -->
> **命題（アファイン再パラメータ化と一般の時刻変更）**
> 滑らかな多様体 $M$ 上のアフィン接続 $\nabla$ に関する $C^2$ 測地線 $\gamma(t)$ と、$C^2$ 級で $t'(u)\ne0$ の時刻変換 $t=t(u)$ を取る。$\widehat\gamma(u)=\gamma(t(u))$ に対し

$$
\frac{D^\nabla}{du}\frac{d\widehat\gamma}{du}
=t''(u)\dot\gamma(t(u))
$$

> が成り立つ。特に $t(u)=au+b$（$a\ne0$）では $\widehat\gamma$ も $\nabla$-測地線である。元の速度がどこでも非零なら、$\widehat\gamma$ が $\nabla$-測地線であるための必要十分条件は $t''(u)=0$ である。
<!-- formal-statement-end -->

**証明の見取り図**：速度に鎖律を一回、共変微分に Leibniz 則を一回使います。[GEO14 のアフィン再パラメータ化](../../GEO/GEO14/index.md#prop-geo14-affine-reparam)は Levi-Civita 接続の例ですが、計算は任意の接続で同じです。

<!-- proof-start -->
### 証明

$d\widehat\gamma/du=t'(u)\dot\gamma(t(u))$ です。曲線に沿う共変微分の積の法則と鎖律から

$$
\begin{aligned}
\frac{D^\nabla}{du}\frac{d\widehat\gamma}{du}
&=\frac{D^\nabla}{du}\{t'\dot\gamma(t(u))\}\\
&=t''\dot\gamma(t(u))+(t')^2\frac{D^\nabla\dot\gamma}{dt}(t(u))\\
&=t''\dot\gamma(t(u)).
\end{aligned}
$$

最後は $\gamma$ の測地線性です。$t''=0$ なら方程式は零、逆に $\dot\gamma\ne0$ なら方程式が零であることから $t''=0$ です。$\square$
<!-- proof-end -->

**注意**：定数曲線は速度が零なので任意の再パラメータ化でも測地線です。また $\nabla^{\mathrm{LC}}$ の測地線は Fisher 長さの局所的な極値・最短性と結び付きますが、任意の接続の測地線にはその結論を適用できません。

## 7. 演習と詳細解答

### IG6-A01 成功確率接続の基本計算

$M=(0,1)$ 上の $\nabla^P_{f\partial_p}(h\partial_p)=fh'\partial_p$ に対し、$X=p\partial_p$、$Y=p^2\partial_p$ とする。$\nabla^P_XY$ と $\nabla^P_X(pY)$ を計算し、Leibniz 則を確認せよ。

- Level: A
- 狙い: 接続は普通の成分微分と Leibniz 則を同時に持つ

<!-- solution-start -->
**詳細解答**

$h(p)=p^2$ の微分は $2p$ なので $\nabla^P_XY=p(2p)\partial_p=2p^2\partial_p$ です。また $pY=p^3\partial_p$ から $\nabla^P_X(pY)=p(3p^2)\partial_p=3p^3\partial_p$。一方、$X(p)=p$ なので

$$
X(p)Y+p\nabla^P_XY
=p\cdot p^2\partial_p+p\cdot2p^2\partial_p
=3p^3\partial_p.
$$

両式が一致します。
<!-- solution-end -->

### IG6-A02 二乗母数での係数と方程式

Bernoulli の $p\in(0,1)$ に $\Gamma^p_{pp}=0$ の接続を入れ、$q=p^2$ に変換する。$q$ の接続係数を求め、$p(t)=1/4+t/4$（$0\le t\le1$）に対応する $q(t)$ が測地線方程式を満たすか調べよ。

- Level: A
- 狙い: 非零な係数と曲がった座標表示を同時に検算する

<!-- solution-start -->
**詳細解答**

$p=\sqrt q$ より $dp/dq=1/(2\sqrt q)$、$d^2p/dq^2=-1/(4q^{3/2})$、$dq/dp=2p$ です。[変換則](#thm-ig6-coordinate-covariance)に元の係数零を入れると $\Gamma^q_{qq}=2\sqrt q\{-1/(4q^{3/2})\}=-1/(2q)$ となります。

$p'=1/4$、$p''=0$ なので $q'=2pp'=p/2$、$q''=2(p')^2=1/8$ です。また $q=p^2$ より

$$
\Gamma^q_{qq}(q')^2=-\frac1{2p^2}\left(\frac p2\right)^2=-\frac18.
$$

したがって $q''+\Gamma^q_{qq}(q')^2=1/8-1/8=0$。$p(t)\in[1/4,1/2]\subset(0,1)$ で正則な再パラメータ化も保証されています。
<!-- solution-end -->

### IG6-A03 捩率と計量両立性は別物

Bernoulli の $(0,1)$ 上で $g_{pp}=1/[p(1-p)]$、$\Gamma^p_{pp}=0$ とする。(i) 捩率は零か。(ii) 計量両立性を満たす点と満たさない点を求めよ。(iii) [曲率作用素](../../GEO/GEO16/index.md#def-geo16-curvature)が方向の二入力について反対称であることから、一次元では曲率作用素が零となる理由を示し、曲率零から計量両立性が従うか判断せよ。

- Level: A
- 狙い: 捩率零と計量両立性を混同しない

<!-- solution-start -->
**詳細解答**

(i) 一次元では捩率成分は $T^p_{pp}=\Gamma^p_{pp}-\Gamma^p_{pp}=0$ で、捩率零です。

(ii) $\partial_p g_{pp}-2\Gamma^p_{pp}g_{pp}$ が零であることが、座標基底についての計量両立条件です。今は

$$
\frac{dg_{pp}}{dp}
=\frac{2p-1}{p^2(1-p)^2}
$$

となるため、$p=1/2$ の点では値が零ですが、それ以外で零ではありません。接続が**計量両立**であるとは全ての点でこの条件が成立することなので、$\nabla^P$ 全体は計量両立接続ではありません。

(iii) [曲率作用素の定義](../../GEO/GEO16/index.md#def-geo16-curvature)にある $R(X,Y)Z=-R(Y,X)Z$ は、接続による共変微分の交換子と Lie 括弧の反対称性から従います。一次元の接ベクトルは $\partial_p$ の倍数だけなので $R(\partial_p,\partial_p)\partial_p=0$ で、全曲率が零です。しかし (ii) で計量両立性は破れているため、曲率零から計量両立性は従いません。
<!-- solution-end -->

### IG6-A04 Fisher--Levi-Civita 係数

成功確率 $p\in(0,1)$ の Bernoulli モデルで $g_{pp}=1/[p(1-p)]$ とする。[Levi-Civita 接続の Christoffel 係数公式](../../GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)から係数を求め、$p=1/4$ での値を示せ。

- Level: A
- 狙い: 計量の導関数から接続係数を作る

<!-- solution-start -->
**詳細解答**

$g^{pp}=p(1-p)$ なので[Levi-Civita 接続の Christoffel 係数公式](../../GEO/GEO13/index.md#prop-geo13-levi-civita-christoffel)から

$$
\begin{aligned}
\Gamma^{\mathrm{LC},p}_{pp}
&=\frac12g^{pp}\frac{d}{dp}\frac1{p(1-p)}\\
&=\frac12p(1-p)\frac{-(1-2p)}{p^2(1-p)^2}\\
&=\frac{2p-1}{2p(1-p)}.
\end{aligned}
$$

$p=1/4$ では分子 $-1/2$、分母 $2(1/4)(3/4)=3/8$ なので $\Gamma^{\mathrm{LC},p}_{pp}=-4/3$ です。
<!-- solution-end -->

### IG6-B01 logit 座標での二つの係数

Bernoulli の $p\in(0,1)$、$a=\log\{p/(1-p)\}$ とする。$p$ 座標で $\Gamma^{P,p}_{pp}=0$、$\Gamma^{\mathrm{LC},p}_{pp}=(2p-1)/[2p(1-p)]$ の二つの接続がある。(i) $dp/da$, $d^2p/da^2$ を求め、(ii) 各接続の $a$ 座標係数を計算せよ。(iii) $p(t)=p_0+vt$ が $\nabla^P$-測地線なら $a(t)$ の測地線方程式が成立することを直接示せ。

- Level: B
- 狙い: 接続の変換則と測地線の共変性を計算で結ぶ

<!-- solution-start -->
**詳細解答**

(i) $p=e^a/(1+e^a)$ と商の微分を行うと $dp/da=e^a/(1+e^a)^2=p(1-p)$ です。さらに $d[p(1-p)]/da=(1-2p)dp/da$ なので $d^2p/da^2=p(1-p)(1-2p)$ です。

(ii) $da/dp=1/[p(1-p)]$ を用いて

$$
\begin{aligned}
\Gamma^{P,a}_{aa}&=\frac{da}{dp}\frac{d^2p}{da^2}=1-2p,\\
\Gamma^{\mathrm{LC},a}_{aa}&=\frac{da}{dp}\left\{\left(\frac{dp}{da}\right)^2\Gamma^{\mathrm{LC},p}_{pp}+\frac{d^2p}{da^2}\right\}\\
&=\frac{2p-1}{2}+1-2p=\frac{1-2p}{2}.
\end{aligned}
$$

(iii) $a'=p'/[p(1-p)]=v/[p(1-p)]$ です。$p''=0$ と $d[1/(p(1-p))]/dp=(2p-1)/[p^2(1-p)^2]$ から

$$
a''=\frac{(2p-1)v^2}{p^2(1-p)^2},
\qquad (1-2p)(a')^2=\frac{(1-2p)v^2}{p^2(1-p)^2}.
$$

二つを足すと零になり、$a''+\Gamma^{P,a}_{aa}(a')^2=0$ です。これは単なる $a''=0$ とは異なります。
<!-- solution-end -->

### IG6-B02 Fisher 弧長での測地線

$P_p(X=1)=p$（$p\in(0,1)$）の Fisher 計量 $g_{pp}=1/[p(1-p)]$ を考える。$p(0)=1/4$、$p(1)=3/4$ を結ぶ (i) $\nabla^P$-測地線と (ii) Levi-Civita 接続の一定速測地線を求めよ。(iii) 両者の Fisher 長さを計算し、相違点を説明せよ。

- Level: B
- 狙い: 1次元で曲線像・長さ・パラメータ化の違いを精密に分ける

<!-- solution-start -->
**詳細解答**

(i) $p''=0$ なので $p_P(t)=1/4+t/2$ です。

(ii) $s=2\arcsin\sqrt p$ で $g_{ss}=1$ です。$p=1/4$ では $s_0=2\arcsin(1/2)=\pi/3$、$p=3/4$ では $s_1=2\arcsin(\sqrt3/2)=2\pi/3$ です。一定速の解は $s(t)=\pi/3+\pi t/3$ なので

$$
p_{\mathrm{LC}}(t)=\sin^2\left(\frac\pi6+\frac{\pi t}{6}\right).
$$

(iii) どちらの $p(t)$ も単調増加です。[Fisher--Rao 長さ](../IG2/index.md#def-ig2-fisher-rao-distance)を変数 $p$ へ置換すると

$$
L=\int_0^1\frac{|p'(t)|}{\sqrt{p(t)(1-p(t))}}dt
=\int_{1/4}^{3/4}\frac{dp}{\sqrt{p(1-p)}}
=\frac{2\pi}{3}-\frac\pi3=\frac\pi3.
$$

よって長さも曲線像も等しいのですが、一般に $p_P(t)\ne p_{\mathrm{LC}}(t)$ で時間配分が異なります。$p_P$ は Levi-Civita 接続について一定速ではありません。
<!-- solution-end -->

### IG6-B03 二次元では捩率を計算できる

$M=\mathbb R^2$ の座標 $(x^1,x^2)$ で、標準係数零の接続 $D$ と、$\Gamma^1_{12}=1$ だけが非零である接続 $\nabla$ を考える。各係数は定数とする。(i) $A=\nabla-D$ の成分を求めよ。(ii) $\nabla$ の捩率を求めよ。(iii) $A$ が関数倍に関して双線形であることを $A(X,fY)$ で確認せよ。

- Level: B
- 狙い: 接続差テンソルと反対称部分を別々に扱う

<!-- solution-start -->
**詳細解答**

(i) $D$ の全係数は零なので $A^1_{12}=1$、残りは零です。すなわち $A(X,Y)=X^1Y^2\partial_1$ です。

(ii) [接続の差と捩率の座標表示](#prop-ig6-difference-torsion)から $T^1_{12}=\Gamma^1_{12}-\Gamma^1_{21}=1-0=1$、$T^1_{21}=-1$、その他は零です。よって捩率零ではありません。

(iii) $f\in C^\infty(M)$ に対して $A(X,fY)=X^1(fY^2)\partial_1=fX^1Y^2\partial_1=fA(X,Y)$ です。なおここでの $X^1$ は $X$ の成分であって、微分演算子 $X(f)$ ではありません。元の各接続の Leibniz 則にある $X(f)Y$ が差で消えることと一致します。
<!-- solution-end -->

### IG6-B04 非計量両立接続での平行移動

$p(t)\in(0,1)$ を $C^1$ 曲線とする。Bernoulli 族の $\Gamma^{P,p}_{pp}=0$ の接続に沿い、初期値 $V^p(t_0)=c$ の平行場を求めよ。さらに $a=\log\{p/(1-p)\}$ の座標で表した成分 $V^a$ が、$\Gamma^{P,a}_{aa}=1-2p$ の平行方程式を満たすことを確認せよ。$c\ne0$ として Fisher 内積の長さが常に保存されるか述べよ。

- Level: B
- 狙い: 平行移動は座標不変だが計量保存とは限らない

<!-- solution-start -->
**詳細解答**

$p$ 座標の平行方程式は $(V^p)'=0$ ですから $V^p(t)=c$ です。ベクトル成分を $a$ 座標へ書き換えると

$$
V^a=\frac{da}{dp}V^p=\frac{c}{p(1-p)}.
$$

時間微分は

$$
\frac{dV^a}{dt}
=\frac{c(2p-1)\dot p}{p^2(1-p)^2},
\quad \dot a=\frac{\dot p}{p(1-p)}.
$$

ゆえに

$$
\frac{dV^a}{dt}+(1-2p)\dot a V^a
=\frac{c\dot p}{p^2(1-p)^2}\{(2p-1)+(1-2p)\}=0.
$$

Fisher ノルムの二乗は $g_{pp}(V^p)^2=c^2/[p(1-p)]$ で、$p$ が変化する一般の曲線では一定でありません。したがって $\nabla^P$ の平行移動は Fisher 内積を一般には保ちません。
<!-- solution-end -->

### IG6-C01 同じ Bernoulli 曲線を三つの表示で読む

Bernoulli 族 $P_p(X=1)=p$（$p\in(0,1)$）に $g_{pp}=1/[p(1-p)]$ を入れ、$p$ 座標係数が零の $\nabla^P$ と Fisher--Levi-Civita 接続 $\nabla^{\mathrm{LC}}$ を考える。$a=\log\{p/(1-p)\}$ は logit 座標である。

1. $\nabla^P$ と $\nabla^{\mathrm{LC}}$ の $p$ および $a$ 係数を導出せよ。接続の差が一点では零になっても、両接続全体が同一とは限らない理由を説明せよ。
2. $p(0)=1/4$、$p(1)=3/4$ として、$\nabla^P$ のアファイン時刻での測地線 $p_P(t)$ とその logit 表示 $a_P(t)$ を求めよ。$a_P$ の測地線方程式を直接確認せよ。
3. 同じ端点の Levi-Civita のアファイン時刻での測地線 $p_{\mathrm{LC}}(t)$ を求め、両曲線の Fisher 長さを比較せよ。
4. $\nabla^P$-測地線の速度 $\dot\gamma$ が、Fisher ノルム一定とならない理由を示せ。どの条件を変えると一定になるか述べよ。

- Level: C
- 狙い: 接続選択・再パラメータ化・測地線・平行移動・弧長を一つのモデルで統合する

<!-- solution-start -->
**詳細解答**

1. $g^{pp}=p(1-p)$、$g'_{pp}=(2p-1)/[p^2(1-p)^2]$ です。したがって

   $$
   \Gamma^{P,p}_{pp}=0,\qquad
   \Gamma^{\mathrm{LC},p}_{pp}=\frac12g^{pp}g'_{pp}=\frac{2p-1}{2p(1-p)}.
   $$

   $p(a)=e^a/(1+e^a)$ より $p'=p(1-p)$、$p''=p(1-p)(1-2p)$（ここだけ素数は $a$ 微分）です。[接続係数の変換則](#thm-ig6-coordinate-covariance)から

   $$
   \begin{aligned}
   \Gamma^{P,a}_{aa}&=\frac{1}{p(1-p)}p''=1-2p,\\
   \Gamma^{\mathrm{LC},a}_{aa}
   &=\frac{1}{p(1-p)}\left\{(p')^2\frac{2p-1}{2p(1-p)}+p''\right\}\\
   &=\frac{2p-1}{2}+1-2p=\frac{1-2p}{2}.
   \end{aligned}
   $$

   両係数の差は $p$ 座標で $\frac{2p-1}{2p(1-p)}$ です。$p=1/2$ の一点では零でも、$p=1/4$ では $-4/3\ne0$ ですから接続は全体として同一ではありません。

2. $p$ 座標の方程式 $p''_P=0$ を端点条件で解くと $p_P(t)=(1+2t)/4$ です。$1-p_P=(3-2t)/4$ なので

   $$
   a_P(t)=\log\frac{1+2t}{3-2t}.
   $$

   $\dot p_P=1/2$ として $\dot a_P=\dot p_P/[p_P(1-p_P)]$、$\ddot a_P=(2p_P-1)(\dot p_P)^2/[p_P^2(1-p_P)^2]$ です。一方 $\Gamma^{P,a}_{aa}(\dot a_P)^2=(1-2p_P)(\dot p_P)^2/[p_P^2(1-p_P)^2]$ で、合計0です。$a_P$ は直線ではないのに同じ $\nabla^P$ の測地線です。

3. $s(p)=2\arcsin\sqrt p$ と置けば $ds/dp=1/\sqrt{p(1-p)}$ です。$s$ 座標の計量は $g_{ss}=1$、従って Levi-Civita 係数は零になります。端点は $s(0)=\pi/3$, $s(1)=2\pi/3$（ここでは $s(t)=s(p(t))$ の略記）なので $s(t)=\pi(1+t)/3$、

   $$
   p_{\mathrm{LC}}(t)=\sin^2\left(\frac\pi6+\frac{\pi t}{6}\right).
   $$

   いずれも $p$ が単調増加するため、[Fisher--Rao 長と距離](../IG2/index.md#def-ig2-fisher-rao-distance)の定義により

   $$
   L=\int_{1/4}^{3/4}\frac{dp}{\sqrt{p(1-p)}}
   =\left[2\arcsin\sqrt p\right]_{1/4}^{3/4}=\frac\pi3
   $$

   で一致します。一次元では経路の像は同じで、アファイン時刻に沿った速度が違います。

4. $\nabla^P$-測地線では $\dot p_P=1/2$ が一定でも

   $$
   \|\dot\gamma\|_g^2=g_{pp}(\dot p_P)^2
   =\frac{1}{4p_P(1-p_P)}
   $$

   は一定ではありません。例えば $p=1/4$ で $4/3$、$p=1/2$ で $1$ です。$\nabla^P$ は計量両立でないためです。$\nabla^{\mathrm{LC}}$ とそのアファイン時刻を使えば $\|\dot\gamma\|_g^2=(ds/dt)^2=(\pi/3)^2$ が一定になります。定数速度が求める量は座標成分ではなく Fisher ノルムであることも確認できます。
<!-- solution-end -->

---

## 8. 何が分かったか

- 統計モデル上の接続は、接ベクトルの変化を比べる追加の規則です。一般には Fisher 計量から一意には決まりません。
- 接続係数は非線形に座標を取り替えると二階微分の項を持ちます。係数零という記述は座標依存ですが、測地線方程式と平行移動は座標不変です。
- 接続の差はテンソルです。捩率零は係数の下二添字の対称性を表しますが、計量両立性とは別です。
- Fisher--Levi-Civita 接続だけは Fisher 計量両立かつ捩率零で一意に定まります。Bernoulli 族では成功確率の直線補間と Fisher 弧長の直線補間の**時刻配分**が異なります。
- これからは、計量に対して互いに双対な二つの接続を定められるかという問いに進みます。そこで三次の統計量や $\alpha$-接続が登場します。
