# GBG28 BPST instantonは実際に何を満たすか

[前講のYang–Mills作用の位相的下界](../GBG27/index.md#thm-gbg27-yang-mills-bound)は、4次元の曲率が自己双対なら作用の下界に達すると教えてくれた。しかしそれだけでは、**曲率が零でなく、自己双対で、しかも作用が有限な接続**が本当に存在するか分からない。この講では、ひとつの具体的な行列値1形式を微分し、その問いに答える。

目標は、局所接続から曲率を計算し、自己双対方程式・Yang–Mills方程式・作用の有限性・第二Chern数を順に確かめ、最後に無限遠を一点加えた $S^4$ 上の非自明な主束を作ることである。

**規約**。座標 $x=(x^1,x^2,x^3,x^4)$ を持つ $\mathbb R^4$ に標準Euclid計量と向き $dx^{1234}>0$ を与える。大きさの母数は $\rho>0$ とし、重複添字は和を取る。ギリシャ文字の添字は $1,\ldots,4$、Lie環の基底添字 $a,b,c$ は $1,2,3$ を動く。$dx^{\mu\nu}$ は $dx^\mu\wedge dx^\nu$ の略記で、$dx^{1234}$ も同様に四つの外積を表す。

$d$ は座標に関する外微分、$\partial_\mu=\partial/\partial x^\mu$ は他の座標と $\rho$ を固定した偏微分である。行列値形式の外積は行列積と外積を合わせる。[局所曲率の公式](../GBG10/index.md#thm-gbg10-local-formula)を用いる。

$$
r^2=\sum_{\mu=1}^4(x^\mu)^2,\qquad F=dA+A\wedge A.
$$

[特殊ユニタリ群 $SU(2)$ の行列表示](../GBG25/index.md#def-gbg25-su2-s3)を用いる。$X^\dagger$ は共役転置で、反Hermiteとは $X^\dagger=-X$ をいう。形式部分に作用する [Hodge星](../GBG27/index.md#def-gbg27-hodge-star) を $*$ と書く。作用と第二Chern数は[前講の規約](../GBG27/index.md#def-gbg27-yang-mills-action)に従う。

$$
\operatorname{YM}(A)=-\int\operatorname{tr}(F\wedge*F),
\qquad
k=\frac1{8\pi^2}\int\operatorname{tr}(F\wedge F).
$$

非コンパクト積分は収束を確かめてから用いる。[前講の自己双対性](../GBG27/index.md#def-gbg27-self-duality)では、この規約の非零・有限作用の自己双対場は $k<0$ に対応する。

## 1. 曲率の行列計算に使う記号

ここでは $SU(2)$ 行列の三つの独立な方向を先に固定する。Pauli行列とその反Hermite基底を

$$
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad T_a=-\frac{i}{2}\sigma_a
$$

と置く。$I_2$ は単位行列、$\delta_{ab}$ は添字が等しいとき1、それ以外で0のKronecker記号である。$\varepsilon_{abc}$ は $\varepsilon_{123}=1$ の完全交代記号（同じ添字があれば0、異なる添字では置換の符号）である。

直接の行列積から $\sigma_a^2=I_2$ および

$$
\sigma_1\sigma_2=i\sigma_3,\quad
\sigma_2\sigma_3=i\sigma_1,\quad
\sigma_3\sigma_1=i\sigma_2
$$

を得る。逆順の積では符号が反転するので $\sigma_a\sigma_b=\delta_{ab}I_2+i\varepsilon_{abc}\sigma_c$ となる。$[X,Y]=XY-YX$ と $\operatorname{tr}(\sigma_a)=0$ を用いると、

$$
[T_a,T_b]=\varepsilon_{abc}T_c,\qquad
-\operatorname{tr}(T_aT_b)=\frac12\delta_{ab}
$$

を得る。実際、$T_aT_b=-\sigma_a\sigma_b/4$ の差を取れば括弧、跡を取れば内積の公式になる。

$SU(2)$ の条件 $U^\dagger U=I_2$、$\det U=1$ を単位元で微分すると、接ベクトル $X$ は $X^\dagger+X=0$、$\operatorname{tr}X=0$ を満たす。逆にこの条件を満たす $X$ は $\exp(tX)\in SU(2)$ の $t=0$ での接ベクトルである。その全体は実数 $u,v,w$ を用いて

$$
X=\begin{pmatrix}iu&v+iw\\-v+iw&-iu\end{pmatrix}
=-2wT_1-2vT_2-2uT_3
$$

と一意に書ける。これが $T_a$ がLie環の実基底となる理由である。

曲率を自己双対にするため、座標添字 $(\mu,\nu)$ を反対称に持つ三組の定数を用意する。$i,j\in\{1,2,3\}$ とし、$\varepsilon_{aij}$ は上と同じ記号である。

<a id="def-gbg28-eta"></a>

<!-- formal-statement-start -->
> **定義（自己双対 't Hooft 記号）**  
> $a=1,2,3$、$\mu,\nu=1,\ldots,4$ に対し、反対称な実数 $\eta^a_{\mu\nu}$ を次で定める。

$$
\eta^a_{ij}=\varepsilon_{aij},\quad
\eta^a_{i4}=\delta_{ai},\quad
\eta^a_{4i}=-\delta_{ai},\quad
\eta^a_{44}=0.
$$

> $E^a=\sum_{\mu<\nu}\eta^a_{\mu\nu}dx^\mu\wedge dx^\nu$ と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg28-eta -->
**定義の確認**。$a=1$ なら $\eta^1_{14}=\eta^1_{23}=1$ で、これら以外の $\mu<\nu$ の値は零である。従って $E^1=dx^{14}+dx^{23}$。同じように

$$
E^2=dx^{24}-dx^{13},\qquad
E^3=dx^{34}+dx^{12}.
$$

[前講のHodge星の基底表示](../GBG27/index.md#def-gbg27-hodge-star)を使うと、$*dx^{14}=dx^{23}$、$*dx^{24}=-dx^{13}$、$*dx^{34}=dx^{12}$ だから $*E^a=E^a$ が三つとも成立する。たとえば $\eta^2_{13}=-1$ は $dx^{13}$ の負符号を担当する。定義の全成分がこれら三つの2形式に反映されている。
<!-- definition-example-end -->

<a id="lem-gbg28-eta-identity"></a>

<!-- formal-statement-start -->
> **補題（'t Hooft 記号の積恒等式）**  
> 上の $\eta$ を用い、$x\in\mathbb R^4$、$r^2=\sum_\lambda(x^\lambda)^2$ とすると、すべての $a,\mu,\nu$ について

$$
\varepsilon_{abc}\eta^b_{\mu\lambda}\eta^c_{\nu\kappa}
x^\lambda x^\kappa
=r^2\eta^a_{\mu\nu}
+x^\mu\eta^a_{\nu\lambda}x^\lambda
-x^\nu\eta^a_{\mu\lambda}x^\lambda.
$$
<!-- formal-statement-end -->

**証明の見取り図**。反対称性により $(\mu,\nu)=(i,4)$ と $(i,j)$ だけを確かめればよい。$\varepsilon$ を二つ掛けた積はKroneckerの $\delta$ に展開できる。

<!-- proof-start -->
### 証明

$\mathbf x=(x^1,x^2,x^3)$、$s=x^4$ とする。$\eta^a_{i\lambda}x^\lambda=\varepsilon_{aik}x^k+\delta_{ai}s$、$\eta^a_{4\lambda}x^\lambda=-x^a$ である。$(\mu,\nu)=(i,4)$ の左辺は

$$
-\varepsilon_{abc}
(\varepsilon_{bik}x^k+\delta_{bi}s)x^c
=(|\mathbf x|^2\delta_{ai}-x^ax^i)
-s\varepsilon_{aic}x^c.
$$

ここでは次の縮約公式を使った。固定した $a,c,i,k$ について $b$ だけを和に取る。$a=c$ または $i=k$ なら両辺は零であり、それ以外では組 $(a,c)$ と $(i,k)$ が同じ二つの添字を持つときだけ非零になる。同順なら $-1$、逆順なら $+1$ である。

$$
\varepsilon_{abc}\varepsilon_{bik}
=\delta_{ak}\delta_{ci}-\delta_{ai}\delta_{ck}.
$$

右辺に $\eta^a_{i4}=\delta_{ai}$ と $\eta^a_{4\lambda}x^\lambda=-x^a$ を代入すると

$$
r^2\delta_{ai}-x^ix^a
-s(\varepsilon_{aik}x^k+\delta_{ai}s)
=|\mathbf x|^2\delta_{ai}-x^ix^a
-s\varepsilon_{aik}x^k,
$$

となって一致する。$(\mu,\nu)=(i,j)$ では、左辺を

$$
\varepsilon_{abc}
(\varepsilon_{bik}x^k+\delta_{bi}s)
(\varepsilon_{cj\ell}x^\ell+\delta_{cj}s)
$$

と展開する。$s^2$ 項は $s^2\varepsilon_{aij}$、$s$ の一次項は $s(\delta_{aj}x^i-\delta_{ai}x^j)$ である。空間成分同士の積は、先ほどの縮約で

$$
\begin{aligned}
\varepsilon_{abc}\varepsilon_{bik}\varepsilon_{cj\ell}x^kx^\ell
&=(\delta_{ak}\delta_{ci}-\delta_{ai}\delta_{ck})
  \varepsilon_{cj\ell}x^kx^\ell\\
&=x^a\varepsilon_{ij\ell}x^\ell
-\delta_{ai}\varepsilon_{kj\ell}x^kx^\ell\\
&=x^a\varepsilon_{ij\ell}x^\ell
\end{aligned}
$$

となる。最後の項は $k,\ell$ の交換で符号が反転するため零である。$i\ne j$ として残りの空間添字を $m$ とする。$a=i,j,m$ の三場合で次式の右辺はそれぞれ $\varepsilon_{ijm}x^ix^m$、$\varepsilon_{ijm}x^jx^m$、$\varepsilon_{ijm}(|\mathbf x|^2-(x^i)^2-(x^j)^2)$ となる。いずれも左辺に一致するので、

$$
x^a\varepsilon_{ij\ell}x^\ell
=|\mathbf x|^2\varepsilon_{aij}
+x^i\varepsilon_{ajk}x^k
-x^j\varepsilon_{aik}x^k.
$$

三つを足すと

$$
r^2\varepsilon_{aij}
+x^i(\varepsilon_{ajk}x^k+\delta_{aj}s)
-x^j(\varepsilon_{aik}x^k+\delta_{ai}s),
$$

すなわち求める右辺になる。$\mu=\nu$ なら両辺零、添字の逆順は双方が反対称なので、全場合が確かめられた。
<!-- proof-end -->

## 2. BPST接続の曲率を全部計算する

前講の定数曲率の例は自己双対でも作用が無限だった。そこで分母に $r^2+\rho^2$ を置き、原点では滑らか、遠方では曲率が速く減衰する接続を探す。以下の $A$ は $\mathbb R^4\times SU(2)$ の標準section $s_0(x)=(x,I_2)$ で書いた局所（ここでは基底全域の）[ゲージポテンシャル](../GBG8/index.md#def-gbg8-local-potential)である。座標接ベクトルに対する値を $A_\mu=A(\partial/\partial x^\mu)=A_\mu^aT_a$ と書く。$F_{\mu\nu}=F_{\mu\nu}^aT_a$ も同様に曲率を二つの座標接ベクトルへ代入した値である。

<a id="def-gbg28-bpst"></a>

<!-- formal-statement-start -->
> **定義（正則ゲージのBPST接続）**  
> $\rho>0$ を固定し、標準向きのEuclid空間 $\mathbb R^4$ 上に

$$
A=A_\mu^aT_a\,dx^\mu,\qquad
A_\mu^a(x)=\frac{2\eta^a_{\mu\nu}x^\nu}{r^2+\rho^2}
$$

> を定める。これを本講の正則ゲージ（regular gauge）のBPST接続という。曲率成分は $F=\frac12F^a_{\mu\nu}T_a\,dx^\mu\wedge dx^\nu$ の約束で読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg28-bpst -->
**定義の確認**。$r=0$ でも分母は $\rho^2>0$ なので全成分は滑らかな実関数である。$A_\mu=A_\mu^aT_a$ は常に反Hermite・跡零の行列で、[局所接続の行列表示](../GBG8/index.md#def-gbg8-local-potential)に適合する。例えば $x=(t,0,0,0)$（$t$ は実数）では $\eta^1_{41}=-1$、$\eta^2_{31}=1$、$\eta^1_{11}=0$ だから

$$
A_4^1=-\frac{2t}{t^2+\rho^2},\quad
A_1^1=0,\quad A_3^2=\frac{2t}{t^2+\rho^2}.
$$

任意の実接ベクトル $v=v^\mu\partial/\partial x^\mu$ について $A_x(v)=v^\mu A_\mu^a(x)T_a$ はLie環に属する。[積主束の接続構成](../GBG7/index.md#prop-gbg7-product-form)にこの滑らかなLie環値1形式を代入すれば、ファイバー座標 $K\in SU(2)$ における接続は

$$
\omega_{(x,K)}(v,W)=K^{-1}A_x(v)K+K^{-1}W.
$$

標準sectionでは $K=I_2$、$W=0$ となるため $s_0^*\omega=A$ である。$\rho>0$ を外すと原点で分母が零になり、この「全空間で滑らか」という確認が壊れる。
<!-- definition-example-end -->

<a id="thm-gbg28-curvature"></a>

<!-- formal-statement-start -->
> **定理（BPST曲率の明示式と自己双対性）**  
> 上の接続の曲率は

$$
F^a_{\mu\nu}(x)
=-\frac{4\rho^2}{(r^2+\rho^2)^2}\eta^a_{\mu\nu}
$$

> で与えられ、全 $x\in\mathbb R^4$ で

$$
*F=F,\qquad d_A*F=0
$$

> を満たす。$d_A$ は接続 $A$ による[共変外微分](../GBG11/index.md#def-gbg11-local-covariant-exterior)であり、$d_A*F=0$ がYang–Mills方程式である。$F$ はどの点でも零でない。
<!-- formal-statement-end -->

**証明の見取り図**。[曲率の局所式](../GBG10/index.md#thm-gbg10-local-formula)に接続成分を代入する。偏微分とLie括弧から $x^\mu x^\nu$ の項が現れるが、['t Hooft記号の積恒等式](#lem-gbg28-eta-identity)によって相殺され、$\eta$ の定数倍だけが残る。

<!-- proof-start -->
### 証明

$D=r^2+\rho^2$ と置く。まず $\partial_\mu D=2x^\mu$ なので

$$
\partial_\mu A_\nu^a
=\frac{2\eta^a_{\nu\mu}}{D}
-\frac{4x^\mu\eta^a_{\nu\lambda}x^\lambda}{D^2}.
$$

[曲率の局所式](../GBG10/index.md#thm-gbg10-local-formula)と $[T_b,T_c]=\varepsilon_{bca}T_a$ より、

$$
\begin{aligned}
F^a_{\mu\nu}
&=\partial_\mu A_\nu^a-\partial_\nu A_\mu^a
+\varepsilon_{abc}A_\mu^bA_\nu^c\\
&=-\frac{4\eta^a_{\mu\nu}}{D}
-\frac{4}{D^2}
 (x^\mu\eta^a_{\nu\lambda}x^\lambda
 -x^\nu\eta^a_{\mu\lambda}x^\lambda)\\
&\quad+\frac4{D^2}
 \varepsilon_{abc}\eta^b_{\mu\lambda}\eta^c_{\nu\kappa}
 x^\lambda x^\kappa.
\end{aligned}
$$

最後の項へ[積恒等式](#lem-gbg28-eta-identity)を代入すると、括弧内の $x$ 依存項がちょうど消える。したがって

$$
F^a_{\mu\nu}
=-\frac{4\eta^a_{\mu\nu}}D+\frac{4r^2\eta^a_{\mu\nu}}{D^2}
=-\frac{4\rho^2\eta^a_{\mu\nu}}{D^2}.
$$

ここで $\frac12F_{\mu\nu}dx^\mu\wedge dx^\nu=\sum_{\mu<\nu}F_{\mu\nu}dx^{\mu\nu}$ なので、[前節の三つの自己双対2形式](#def-gbg28-eta)を使い

$$
F=-\frac{4\rho^2}{D^2}\sum_{a=1}^3T_aE^a,
\qquad
*F=-\frac{4\rho^2}{D^2}\sum_aT_a(*E^a)=F.
$$

さらに[前講の自己双対接続に対する定理](../GBG27/index.md#thm-gbg27-self-dual-solves-ym)を、標準向き・正定値計量の現在の滑らかな接続に適用すると $d_A*F=0$。最後に $F_{14}^1=-4\rho^2/D^2\ne0$ なので $F$ はどの点でも零ではない。
<!-- proof-end -->

計算の簡易検算として、$x=0$ では $A=0$ でも $\partial_\mu A_\nu\ne0$ であり、

$$
F^1_{14}(0)=-\frac4{\rho^2},\qquad
F^1_{23}(0)=-\frac4{\rho^2}
$$

となる。接続の値が一点で零であることは、その点の曲率が零という意味ではない。

## 3. 作用・第二Chern数・スケール

場の減衰を数値だけでなく積分まで調べる。[前講の作用と第二Chern数の規約](../GBG27/index.md#def-gbg27-yang-mills-action)を非コンパクト空間で用いるには、まず可積分性が必要である。

<a id="thm-gbg28-action"></a>

<!-- formal-statement-start -->
> **定理（BPSTの有限作用と単位第二Chern数）**  
> $\rho>0$ の上記BPST接続は、標準向き・Euclid計量の $\mathbb R^4$ 上で

$$
|F|^2=\frac{48\rho^4}{(r^2+\rho^2)^4},
\qquad
\operatorname{YM}_{\mathbb R^4}(A)=8\pi^2,
\qquad
k_{\mathbb R^4}(A)=-1
$$

> を満たす。従って $\operatorname{YM}=8\pi^2|k|$ であり、すべての $\rho>0$ で値は変わらない。
<!-- formal-statement-end -->

**証明の見取り図**。$\eta$ には各 $a$ について非零の2形式成分が二つある。跡内積 $-\operatorname{tr}(T_aT_b)=\delta_{ab}/2$ を用いると、二乗ノルムに係数48が現れる。4次元極座標で径方向を積分すると $\rho$ が消える。

<!-- proof-start -->
### 証明

[曲率の式](#thm-gbg28-curvature)と $-\operatorname{tr}(T_aT_b)=\delta_{ab}/2$ を使う。正規直交基底 $dx^{\mu\nu}$（$\mu<\nu$）で各 $E^a$ はちょうど二つの係数 $\pm1$ を持つため、

$$
\begin{aligned}
|F|^2
&=\sum_{\mu<\nu}-\operatorname{tr}(F_{\mu\nu}F_{\mu\nu})\\
&=\frac{16\rho^4}{D^4}\frac12
\sum_{a=1}^3\sum_{\mu<\nu}(\eta^a_{\mu\nu})^2\\
&=\frac{16\rho^4}{D^4}\frac12(3\cdot2)
=\frac{48\rho^4}{D^4}.
\end{aligned}
$$

これは原点近傍で有界、無限遠で $O(r^{-8})$ なので、4次元の体積要素 $r^3dr\,d\Omega_3$ に対して可積分である。$S^3$ の面積は $2\pi^2$ である（[GBG25の積分次数](../GBG25/index.md#def-gbg25-degree)で用いた正規化）。$r>0$ で $u=r^2/\rho^2$ と変数変換する。$du/dr=2r/\rho^2>0$ なので、有限の正の端点間で置換積分を適用できる。

$$
r^3dr=\frac{\rho^4}{2}u\,du,\qquad D^4=\rho^8(1+u)^4.
$$

既に両端の収束を確認したので端点を $0,\infty$ へ移して

$$
\begin{aligned}
\operatorname{YM}(A)
&=2\pi^2\cdot48\rho^4
 \int_0^\infty\frac{r^3}{(r^2+\rho^2)^4}\,dr\\
&=48\pi^2\int_0^\infty\frac{u}{(1+u)^4}\,du\\
&=48\pi^2\left[
-\frac1{2(1+u)^2}+\frac1{3(1+u)^3}
\right]_{0}^{\infty}\\
&=48\pi^2\left(\frac12-\frac13\right)=8\pi^2.
\end{aligned}
$$

自己双対なので[前講の4形式の符号関係](../GBG27/index.md#thm-gbg27-yang-mills-bound)を各点へ適用すると

$$
\operatorname{tr}(F\wedge F)=-|F|^2\,dx^{1234}.
$$

従って

$$
k_{\mathbb R^4}(A)
=\frac1{8\pi^2}\int_{\mathbb R^4}\operatorname{tr}(F\wedge F)
=-\frac{\operatorname{YM}(A)}{8\pi^2}=-1.
$$

どの段階も $\rho>0$ で積分が収束しており、$\rho$ の値を変えても同じ結果になる。
<!-- proof-end -->

**何を固定しているか**。$\rho$ を変えると $|F(0)|^2=48/\rho^4$ は変わる。したがって接続の形状が同じという主張ではない。作用の積分値はスケールに依存せず、曲率の広がりと高さが補い合う。中心を $x_0$ へ移す場合も $x$ を $x-x_0$ に置き換えれば、平行移動による積分の不変性から値は同じである。

## 4. 無限遠を足すと、なぜ非自明な束になるか

$\mathbb R^4$ は位相的に $S^4$ から一点を除いた空間である。$\mathbb R^4$ の標準ゲージでは $A=O(r^{-1})$ なので、無限遠でこのまま零に向かう成分を読むだけでは滑らかな $S^4$ 接続を得られない。**別のパッチでゲージを変える**必要がある。

$x\ne0$ で次の $SU(2)$ 値関数を考える。

$$
g(x)=\frac{x^4I_2-i\sum_{a=1}^3x^a\sigma_a}{r}.
$$

まず $SU(2)$ の条件を確認する。$s=x^4$、$X=x^a\sigma_a$、$q=sI_2-iX$ と置くと $g=q/r$ である。Pauli行列の積公式から

$$
X^2=x^ax^b(\delta_{ab}I_2+i\varepsilon_{abc}\sigma_c)
=|\mathbf x|^2I_2,\qquad q^\dagger q=r^2I_2.
$$

また

$$
q=\begin{pmatrix}s-ix^3&-x^2-ix^1\\x^2-ix^1&s+ix^3\end{pmatrix}
$$

なので $\det q=s^2+(x^1)^2+(x^2)^2+(x^3)^2=r^2$。$r>0$ だから $g^\dagger g=I_2$、$\det g=1$ となる。

次に [Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form) $g^{-1}dg$ を計算する。$d$ は全座標 $x^\mu$ に作用し、$dr=x^\mu dx^\mu/r$ である。$g^{-1}=q^\dagger/r$ と積の微分より

$$
g^{-1}dg=\frac{q^\dagger dq}{r^2}-\frac{dr}{r}I_2.
$$

$XdX=x^a dx^a I_2+i\varepsilon_{abc}x^b dx^c\sigma_a$ を使うと

$$
\begin{aligned}
q^\dagger dq
&=(sI_2+iX)(ds\,I_2-i\,dX)\\
&=r\,dr\,I_2\\
&\quad-i\sigma_a(s\,dx^a-x^a ds-\varepsilon_{abc}x^b dx^c).
\end{aligned}
$$

スカラー項は相殺し、

$$
g^{-1}dg
=-\frac{i\sigma_a}{r^2}
\left(x^4dx^a-x^a dx^4-\varepsilon_{abc}x^b dx^c\right).
$$

[前節のBPST接続](#def-gbg28-bpst)と比較する。空間添字を展開すると $\eta^a_{\mu\nu}x^\nu dx^\mu=s\,dx^a-x^a ds-\varepsilon_{abc}x^b dx^c$ となり、$2T_a=-i\sigma_a$ なので

$$
A=\frac{r^2}{r^2+\rho^2}\,g^{-1}dg.
$$

特に $r\to\infty$ では、接続は曲率零の[純ゲージ形](../GBG26/index.md#def-gbg26-pure-gauge) $g^{-1}dg$ に近づく。両者の差は $-\rho^2g^{-1}dg/D$ で、座標係数は $O(r^{-3})$ である。ここで「近づく」は係数の漸近形を意味し、無限遠で非自明な遷移関数が消えることを意味しない。

<a id="prop-gbg28-patching"></a>

<!-- formal-statement-start -->
> **命題（正則ゲージから無限遠ゲージへの貼り合わせ）**  
> $U_0\simeq\mathbb R^4$ を $S^4$ の一点 $\infty$ を除いたパッチとし、もう一方のパッチ $U_\infty$ は $\infty$ を含み原点を除くものとする。重なりで $s_\infty=s_0g^{-1}$ と置くと、右主作用の規約で局所接続は

$$
A_\infty
=gAg^{-1}+g\,dg^{-1}
=-\frac{\rho^2}{r^2+\rho^2}\,dg\,g^{-1}.
$$

> $y^\mu=x^\mu/r^2$ を $\infty$ 近傍の座標とすると、$A_\infty$ は $y=0$ に滑らかに延長できる。これによりBPST接続は滑らかな $S^4$ 上の右主 $SU(2)$ 束の接続になる。
<!-- formal-statement-end -->

**証明の見取り図**。[ゲージ変換公式](../GBG8/index.md#thm-gbg8-local-transform)へ $h=g^{-1}$ を代入する。$g$ は零次同次なので、$y$ 表示では $dg\,g^{-1}$ の分母を $|y|^2$ にまとめられ、前の係数と相殺して滑らかになる。

<!-- proof-start -->
### 証明

局所section変更 $s_\infty=s_0h$、$h=g^{-1}$ に対し、[GBG8の公式](../GBG8/index.md#thm-gbg8-local-transform)は $A_\infty=h^{-1}Ah+h^{-1}dh$ を与える。上の $A=f(r)g^{-1}dg$、$f(r)=r^2/(r^2+\rho^2)$ を代入すると

$$
\begin{aligned}
A_\infty
&=f(r)\,dg\,g^{-1}+g\,dg^{-1}\\
&=(f(r)-1)\,dg\,g^{-1}
=-\frac{\rho^2}{r^2+\rho^2}dg\,g^{-1},
\end{aligned}
$$

ここで $d(gg^{-1})=0$ より $g\,dg^{-1}=-dg\,g^{-1}$ を使った。

$y=x/r^2$ なら $r^2=1/|y|^2$ であり、$g(x)=g(y)$ が成立する（正の実数倍に対する零次同次性）。ここからは $d$ を $y$ 座標に関する外微分として読む（同じ1形式の座標変換である）。$R=|y|>0$、$q_y=y^4I_2-iy^a\sigma_a$ と置く。逆順の行列積を計算すると

$$
\begin{aligned}
dg\,g^{-1}&=\frac{dq_y\,q_y^\dagger}{R^2}-\frac{dR}{R}I_2,\\
dq_y\,q_y^\dagger
&=R\,dR\,I_2\\
&\quad-i\sigma_a(y^4dy^a-y^ady^4+\varepsilon_{abc}y^bdy^c).
\end{aligned}
$$

Pauli行列積の順序が逆なので交代記号の項だけ符号が変わる。従って

$$
dg(y)\,g(y)^{-1}
=-\frac{i\sigma_a}{|y|^2}
\left(y^4dy^a-y^a dy^4+\varepsilon_{abc}y^bdy^c\right).
$$

従って $U_\infty$ 上の接続は

$$
A_\infty
=\frac{i\rho^2\sigma_a}{1+\rho^2|y|^2}
\left(y^4dy^a-y^a dy^4+\varepsilon_{abc}y^bdy^c\right).
$$

分母は $y=0$ でも正、分子は $y$ に線形なので、そこで滑らかに $A_\infty(0)=0$ と延長できる。$g^{-1}:U_0\cap U_\infty\to SU(2)$ は滑らかで、[主束のcocycle貼り合わせ](../GBG1/index.md#thm-gbg1-gluing)の二パッチの場合を満たす。逆方向の遷移は $g$、同じパッチへの遷移は単位元としてcocycle条件が成立する。両局所形式は滑らかで、重なりで変換則を満たすから、[局所ポテンシャルからの大域接続の再構成](../GBG8/index.md#thm-gbg8-local-reconstruction)により一つの大域主束接続が存在する。
<!-- proof-end -->

<a id="thm-gbg28-nontrivial"></a>

<!-- formal-statement-start -->
> **定理（BPST束の第二Chern数と非自明性）**  
> 上の貼り合わせで得た $P\to S^4$ に、$\mathbb R^4$ パッチで $dx^{1234}>0$ となる向きを入れる。接続の曲率は全 $S^4$ で滑らかであり、

$$
\frac1{8\pi^2}\int_{S^4}\operatorname{tr}(F\wedge F)=-1.
$$

> 従って $P$ は自明束ではない。遷移関数 $g^{-1}$ は、$\mathbb R^4$ 側の球面を外向き境界として見たクラッチング規約で次数 $-1$ を持つ。
<!-- formal-statement-end -->

**証明の見取り図**。先の積分は無限遠で収束するので、点を一つ足しても4形式の積分値は変わらない。自明束なら平坦接続を入れられ、[第二Chern数の接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)に反する。遷移関数の次数も独立に確かめる。

<!-- proof-start -->
### 証明

[正則ゲージから無限遠ゲージへの貼り合わせ](#prop-gbg28-patching)により $A_\infty$ は滑らかなので、その曲率も滑らかである。[曲率のゲージ共変性](../GBG10/index.md#thm-gbg10-gauge-transform)で両パッチの曲率は共役に移り、$\operatorname{tr}(F\wedge F)$ は一致して大域4形式を作る。$S^4$ の向きは $x$ パッチの標準向きから延長したものとする。点 $\infty$ は4次元体積を持たず、[先の絶対収束した積分](#thm-gbg28-action)から

$$
\int_{S^4}\operatorname{tr}(F\wedge F)
=\int_{\mathbb R^4}\operatorname{tr}(F\wedge F)
=-8\pi^2.
$$

もし $P$ が自明なら大域的に $A=0$ という平坦接続が存在し、その第二Chern数は零である。[GBG22の接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)を同じ閉多様体 $S^4$ と同じ束 $P$ に適用する。不変双線形形式 $p(X,Y)=\operatorname{tr}(XY)/(8\pi^2)$ は跡の巡回性から対称かつAd不変である。二接続のChern–Weil形式の差は完全4形式であり、閉多様体上でその積分は零なので矛盾する。

遷移関数の次数も確かめる。[GBG25の標準同一視](../GBG25/index.md#def-gbg25-su2-s3)の $Q(x)$ と比較すると、$\lvert x\rvert=1$ で $Q^{-1}\circ g$ は実4次元座標に

$$
(x^1,x^2,x^3,x^4)\longmapsto
(x^4,-x^3,x^2,-x^1)
$$

を対応させる。これは $z=x^4-ix^3$、$w=x^2-ix^1$ を実部・虚部の順に並べたものである。座標の逆順置換は符号 $(-1)^6=1$、二つの負符号の積も $+1$ なので、この直交変換の行列式は $+1$ である。従って、[GBG25の次数規約](../GBG25/index.md#def-gbg25-degree)で $\deg g=+1$。群の逆元写像は同講の計算で次数 $-1$ なので $\deg(g^{-1})=-1$。$\mathbb R^4$ 側の4球を基準に境界の向きを選べば、この $g^{-1}$ が貼り合わせ写像となり、[GBG26の境界次数と第二Chern数の関係](../GBG26/index.md#thm-gbg26-clutching-number)とも整合する。
<!-- proof-end -->


球面上で自己双対性と作用を述べるときは計量も指定する。単位球面の丸い計量は立体射影座標 $x$ では

$$
g_{S^4}=\frac{4}{(1+r^2)^2}\sum_{\mu=1}^4(dx^\mu)^2
$$

となる。実際、$H=1+r^2$ とすると立体射影の逆写像は $(2x/H,(1-r^2)/H)$ である。接ベクトル $v$ に対する微分は

$$
\left(\frac{2v}{H}-\frac{4x(x\cdot v)}{H^2},-\frac{4(x\cdot v)}{H^2}\right).
$$

その長さの二乗では $-16(x\cdot v)^2/H^3$ と $16(r^2+1)(x\cdot v)^2/H^4$ が相殺し、$4|v|^2/H^2$ が残る。4次元で計量を $\lambda^2g$ に変えると、2形式の内積は $\lambda^{-4}$ 倍、体積形式は $\lambda^4$ 倍になる。[Hodge星の定義](../GBG27/index.md#def-gbg27-hodge-star)の右辺では両者が相殺されるので、2形式上の星は変わらない。したがってこの丸い計量で $F=*F$ が成り立ち、滑らかさにより無限遠でも成立する。作用密度4形式も同じであり、球面上での作用は $8\pi^2$ である。任意の計量で自己双対になるという主張ではない。

**正則と特異は何が違うか**。$A$ は $x=0$ で滑らかだが無限遠の座標には直接延長できない。$A_\infty$ は $y=0$（無限遠）で滑らかだが、同じ式を $x=0$ まで使おうとすると $g$ が定義されない。この後者が *特異ゲージ* と呼ばれる理由である。**特異なのは局所表示であり、主束の接続や曲率そのものではない**。非零の第二Chern数こそ、大域の単一ゲージで全てを書けないことの証拠となる。

## 5. 演習と詳細解答

### Level A：添字・行列・正規化を手で確認する

<a id="ex-gbg28-a01"></a>
#### GBG28-A01 自己双対基底の符号
- Level: A

$\eta^2_{\mu\nu}$ の非零な $\mu<\nu$ 成分を列挙し、$*E^2=E^2$ をHodge星の定義から確認せよ。

<!-- solution-start -->
**詳細解答**。$\eta^2_{24}=\delta_{22}=1$、$\eta^2_{13}=\varepsilon_{213}=-1$ 以外は $\mu<\nu$ の場合零である。従って $E^2=dx^{24}-dx^{13}$。[星の基底表](../GBG27/index.md#def-gbg27-hodge-star)から $*dx^{24}=-dx^{13}$、$*dx^{13}=-dx^{24}$ なので

$$
*E^2=-dx^{13}+dx^{24}=E^2.
$$

$dx^{13}\wedge dx^{24}=-dx^{1234}$ の負符号が両者の星の負号を生む。
<!-- solution-end -->

<a id="ex-gbg28-a02"></a>
#### GBG28-A02 Lie環の係数
- Level: A

$T_1=-i\sigma_1/2$、$T_2=-i\sigma_2/2$ について $[T_1,T_2]=T_3$ と $-\operatorname{tr}(T_1^2)=1/2$ を直接の行列積で示せ。

<!-- solution-start -->
**詳細解答**。$\sigma_1\sigma_2=i\sigma_3$、$\sigma_2\sigma_1=-i\sigma_3$ なので

$$
[T_1,T_2]=\left(-\frac i2\right)^2
(\sigma_1\sigma_2-\sigma_2\sigma_1)
=-\frac14(2i\sigma_3)=-\frac i2\sigma_3=T_3.
$$

また $\sigma_1^2=I_2$ だから $T_1^2=-I_2/4$、$\operatorname{tr}(T_1^2)=-2/4=-1/2$。これより $-\operatorname{tr}(T_1^2)=1/2$ となる。
<!-- solution-end -->

<a id="ex-gbg28-a03"></a>
#### GBG28-A03 原点での曲率
- Level: A

正則ゲージのBPST接続で $A_\mu^a(0)=0$ である。それでも $F_{14}^1(0)\ne0$ となる値を、$F=dA+A\wedge A$ から直接求めよ。

<!-- solution-start -->
**詳細解答**。[BPST接続の定義](#def-gbg28-bpst)で $D=r^2+\rho^2$ と置く。商の微分を使うと、原点で $A_\nu^a=0$、$\partial_\mu A_\nu^a(0)=2\eta^a_{\nu\mu}/\rho^2$。従って $[A_1,A_4](0)=0$ だが、

$$
F^1_{14}(0)
=\frac{2}{\rho^2}(\eta^1_{41}-\eta^1_{14})
=\frac{2}{\rho^2}(-1-1)=-\frac4{\rho^2}.
$$

零になるのは接続の値であって、接続の一次導関数ではない。
<!-- solution-end -->

<a id="ex-gbg28-a04"></a>
#### GBG28-A04 曲率の減衰次数
- Level: A

$\rho>0$ 固定のとき $|F|^2$ は原点近くと $r\to\infty$ でそれぞれどう振る舞うか。4次元の径方向体積 $r^3dr$ と比較して、作用積分の両端での収束を示せ。

<!-- solution-start -->
**詳細解答**。[曲率ノルムの式](#thm-gbg28-action)から、$r\to0$ では $|F|^2\to48/\rho^4$ だから、径方向の積分は定数倍の $\int_0^1r^3dr=1/4$ で抑えられる。$r\to\infty$ では $r^2+\rho^2\ge r^2$ なので

$$
0\le r^3|F|^2
=\frac{48\rho^4r^3}{(r^2+\rho^2)^4}
\le48\rho^4r^{-5}.
$$

$\int_1^\infty r^{-5}dr=1/4<\infty$ である。両端が収束するから、角度積分の有限因子 $2\pi^2$ を掛けても作用は有限である。
<!-- solution-end -->

### Level B：曲率の構成と大域表示の区別

<a id="ex-gbg28-b01"></a>
#### GBG28-B01 曲率の $14$ 成分を別経路で検算
- Level: B

$x=(t,0,0,0)$ とし、$F_{14}^1$ を接続係数の偏微分とLie括弧から直接計算して、曲率の一般式と照合せよ。

<!-- solution-start -->
**詳細解答**。全空間の式を**先に**微分し、最後に $x=(t,0,0,0)$ を代入する。全空間で $A_4^1=-2x^1/(r^2+\rho^2)$、$A_1^1=2x^4/(r^2+\rho^2)$ である。$x^4$ で微分するときは $x^1$ も固定する。微分した後で直線上の分母を $D=t^2+\rho^2$ と書けば

$$
\partial_1A_4^1
=-\frac2D+\frac{4t^2}{D^2},\qquad
\partial_4A_1^1=\frac2D.
$$

またこの直線上で $A_1^b=0$（どの $b$ でも $\eta^b_{11}=0$）なので、$\varepsilon_{1bc}A_1^bA_4^c=0$。従って

$$
F_{14}^1=-\frac4D+\frac{4t^2}{D^2}
=-\frac{4(D-t^2)}{D^2}
=-\frac{4\rho^2}{(t^2+\rho^2)^2}.
$$

これは $\eta^1_{14}=1$ を入れた[一般式](#thm-gbg28-curvature)に一致する。最初に直線へ制限してから偏微分すると、横方向の微分を失うので順序に注意する。
<!-- solution-end -->

<a id="ex-gbg28-b02"></a>
#### GBG28-B02 スケールを変えても作用はなぜ同じか
- Level: B

$\rho$ を $2\rho$ へ変えると $|F(0)|^2$ は何倍になるか。一方で作用が同じであることを、$u=r^2/\rho^2$ の置換と積分で示せ。

<!-- solution-start -->
**詳細解答**。[曲率ノルムの式](#thm-gbg28-action)より原点では $|F(0)|^2=48/\rho^4$ なので $\rho\mapsto2\rho$ により $1/16$ 倍になる。しかし

$$
\operatorname{YM}
=96\pi^2\rho^4\int_0^\infty
\frac{r^3}{(r^2+\rho^2)^4}\,dr.
$$

$u=r^2/\rho^2$ なら $du/dr=2r/\rho^2>0$（$r>0$）であり、$r^3dr=\rho^4u\,du/2$、$(r^2+\rho^2)^4=\rho^8(1+u)^4$ である。よって

$$
\operatorname{YM}
=48\pi^2\int_0^\infty\frac{u}{(1+u)^4}du
=48\pi^2\left[-\frac{1}{2(1+u)^2}+\frac{1}{3(1+u)^3}\right]_0^\infty
=8\pi^2.
$$

高さは変わっても、4次元の積分領域の広がりがその変化を補う。
<!-- solution-end -->

<a id="ex-gbg28-b03"></a>
#### GBG28-B03 無限遠のパッチは滑らかか
- Level: B

$h=g^{-1}$ によるゲージ変換を行い、$y=x/r^2$ の座標で $A_\infty(0)=0$ に延長できることを確認せよ。なぜ $g$ 自身を $x=0$ に延長する必要はないか。

<!-- solution-start -->
**詳細解答**。[右主束のゲージ変換公式](../GBG8/index.md#thm-gbg8-local-transform)で

$$
A_\infty=gAg^{-1}+g\,dg^{-1}
=\left(\frac{r^2}{r^2+\rho^2}-1\right)dg\,g^{-1}
=-\frac{\rho^2}{r^2+\rho^2}dg\,g^{-1}.
$$

$g(x)=g(y)$ および $r^2=|y|^{-2}$ を使えば、[正則ゲージから無限遠ゲージへの貼り合わせ](#prop-gbg28-patching)の計算により

$$
A_\infty
=\frac{i\rho^2\sigma_a}{1+\rho^2|y|^2}
(y^4dy^a-y^ady^4+\varepsilon_{abc}y^bdy^c).
$$

すべての係数は $y=0$ で零の滑らかな関数である。$g$ は二つのパッチが重なる **$x\ne0$** 上でだけ遷移関数として必要であり、各パッチの全域まで一つの遷移関数を延長するという要求はない。
<!-- solution-end -->

<a id="ex-gbg28-b04"></a>
#### GBG28-B04 反転した向きとChern数
- Level: B

同じBPST接続と丸い計量を固定して $S^4$ の向きを反転する。自己双対性、作用、第二Chern数をそれぞれ述べ、三つの変化が整合することを説明せよ。

<!-- solution-start -->
**詳細解答**。[前講の向き反転の規約](../GBG27/index.md#def-gbg27-hodge-star)により新しい星 $*'=-*$（2形式上）なので、元の $*F=F$ は $*'F=-F$ に変わり、反自己双対となる。作用は正の計量ノルムの積分で $\operatorname{YM}=8\pi^2$ のままである。一方、4形式の向き付き積分は符号反転するため

$$
k'=\frac1{8\pi^2}\int_{-S^4}\operatorname{tr}(F\wedge F)
=-k=+1.
$$

[作用の下界](../GBG27/index.md#thm-gbg27-yang-mills-bound)では $k'>0$ の等号条件は反自己双対である。実際、同じ $\operatorname{YM}=8\pi^2$ が $8\pi^2|k'|$ に一致する。
<!-- solution-end -->

### Level C：局所計算と束の非自明性を結ぶ

<a id="ex-gbg28-c01"></a>
#### GBG28-C01 有限作用の自己双対接続をS⁴へ
- Level: C

$\rho>0$、標準向きの $\mathbb R^4$、$T_a=-i\sigma_a/2$、$\eta^a_{i4}=\delta_{ai}$、$\eta^a_{ij}=\varepsilon_{aij}$ とする。

1. $A_\mu^a=2\eta^a_{\mu\nu}x^\nu/(r^2+\rho^2)$ の曲率を計算し、$F=*F$ を確認せよ。
2. $-\operatorname{tr}(T_aT_b)=\delta_{ab}/2$ から作用積分と $k$ の値を求めよ。
3. $g(x)=(x^4I_2-ix^a\sigma_a)/r$ を用いて無限遠ゲージの局所接続を導き、$S^4$ 上の滑らかな接続を得よ。
4. 第二Chern数を使い、この大域束が自明でない理由を証明せよ。単に $g$ が原点で定義できないことだけでは非自明性の証明にならない理由も述べよ。

<!-- solution-start -->
**詳細解答**。

**1.** $D=r^2+\rho^2$ とすると $\partial_\mu A_\nu^a=2\eta^a_{\nu\mu}/D-4x^\mu\eta^a_{\nu\lambda}x^\lambda/D^2$。これを $F_{\mu\nu}^a=\partial_\mu A_\nu^a-\partial_\nu A_\mu^a+\varepsilon_{abc}A_\mu^bA_\nu^c$ という[局所曲率の公式](../GBG10/index.md#thm-gbg10-local-formula)に代入する。$B=x^\mu\eta^a_{\nu\lambda}x^\lambda-x^\nu\eta^a_{\mu\lambda}x^\lambda$ と略記すると、偏微分項は $-4\eta^a_{\mu\nu}/D-4B/D^2$、[積恒等式](#lem-gbg28-eta-identity)による括弧項は $4(r^2\eta^a_{\mu\nu}+B)/D^2$ である。よって

$$
F_{\mu\nu}^a=-\frac{4\eta^a_{\mu\nu}}D+\frac{4r^2\eta^a_{\mu\nu}}{D^2}
=-\frac{4\rho^2}{D^2}\eta^a_{\mu\nu}.
$$

$E^1=dx^{14}+dx^{23}$、$E^2=dx^{24}-dx^{13}$、$E^3=dx^{34}+dx^{12}$ はすべて星で不変だから $F=*F$ となる。

**2.** $\sum_{a,\mu<\nu}(\eta^a_{\mu\nu})^2=6$ と $-\operatorname{tr}(T_aT_b)=\delta_{ab}/2$ より

$$
|F|^2=\frac{16\rho^4}{D^4}\frac12\sum_{a,\mu<\nu}(\eta^a_{\mu\nu})^2
=\frac{48\rho^4}{D^4}.
$$

原点近傍は有界、遠方は $r^3|F|^2=O(r^{-5})$ なので収束する。[作用の計算](#thm-gbg28-action)と同じく $u=r^2/\rho^2$ を用い、$r^3dr=\rho^4u\,du/2$、$D^4=\rho^8(1+u)^4$ を代入する。4次元極座標で

$$
\operatorname{YM}
=96\pi^2\rho^4\int_0^\infty
\frac{r^3}{(r^2+\rho^2)^4}dr
=48\pi^2\int_0^\infty\frac{u}{(1+u)^4}du
=8\pi^2.
$$

$F=*F$ なので $\operatorname{tr}(F\wedge F)=-|F|^2dx^{1234}$。ゆえに $k=-\operatorname{YM}/(8\pi^2)=-1$。

**3.** 第4節の[貼り合わせの計算](#prop-gbg28-patching)に従い、$q=x^4I_2-ix^a\sigma_a$ と置く。$q^\dagger q=r^2I_2$、$\det q=r^2$ なので $g=q/r$ は $x\ne0$ で滑らかな $SU(2)$ 値関数である。積の微分から

$$
\begin{aligned}
g^{-1}dg&=r^{-2}q^\dagger dq-r^{-1}dr\,I_2\\
&=-\frac{i\sigma_a}{r^2}(x^4dx^a-x^adx^4-\varepsilon_{abc}x^bdx^c).
\end{aligned}
$$

$2T_a=-i\sigma_a$ と 't Hooft 記号の定義から $A=r^2g^{-1}dg/D$ と一致する。$h=g^{-1}$ として [局所ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)を使うと

$$
A_\infty=gAg^{-1}+g\,dg^{-1}
=-\frac{\rho^2}{r^2+\rho^2}dg\,g^{-1}.
$$

$y=x/r^2$ に直す。$g(x)=g(y)$、$r^2=|y|^{-2}$ だから、$-\rho^2/D=-\rho^2|y|^2/(1+\rho^2|y|^2)$ となる。$dg\,g^{-1}$ の分母 $|y|^2$ と相殺し、

$$
A_\infty
=\frac{i\rho^2\sigma_a}{1+\rho^2|y|^2}
(y^4dy^a-y^ady^4+\varepsilon_{abc}y^bdy^c),
$$

なので $y=0$ でも分母は1で、全係数は滑らかである。$x\ne0$ で変換則が成立するため、[局所再構成定理](../GBG8/index.md#thm-gbg8-local-reconstruction)から大域接続が得られる。

**4.** [第二Chern形式の接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)を閉多様体 $S^4$ に適用する。もし主束が自明なら大域接続 $A=0$ を選べるので $k=0$ になる。しかし上の接続は $k=-1$ だから矛盾する。$g$ が原点で未定義であること自体は、二つの局所sectionの重なりで $g$ だけを定義すればよいという主束の原則と矛盾せず、非自明性の根拠にはならない。
<!-- solution-end -->
