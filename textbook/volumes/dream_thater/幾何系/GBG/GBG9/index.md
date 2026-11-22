# GBG9 結合束上で場をどう微分するか

[GBG4 の結合ベクトル束](../GBG4/index.md#def-gbg4-associated-bundle)によって、同じ物質場を各パッチのベクトル値関数として表せるようになった。しかし、二つのパッチの成分は位置に依存する行列で変換されるため、普通に微分しただけでは同じ場の微分にならない。[GBG8 の局所接続形式の変換則](../GBG8/index.md#thm-gbg8-local-transform)に現れた非斉次項を、微分に組み込む必要がある。

この講では、主束の水平方向を使って結合束の切断を微分し、その局所式が $d+\rho_*(A)$ となることを構成から証明する。さらに、重なりで局所微分が貼り合わさる理由を行列積の微分から確認し、$U(1)$ の荷電スカラー場と $SU(2)$ の随伴場を計算する。

$M$ は Hausdorff・第二可算で境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束、$\mathfrak g=T_eG$ とする。$\mathbb F$ は $\mathbb R$ または $\mathbb C$、$V$ は有限次元 $\mathbb F$ ベクトル空間、$\rho:G\to GL_{\mathbb F}(V)$ は[滑らかな左線形表現](../GBG4/index.md#def-gbg4-representation)とする。結合束は $E=P\times_\rho V$ であり、同一視は

$$
[pg,w]=[p,\rho(g)w]
$$

とする。局所 section $s_j=s_i g_{ij}$ で切断の局所成分が $u_j=\rho(g_{ij}^{-1})u_i$ となるのは[GBG4 の変換定理](../GBG4/index.md#thm-gbg4-component-transformation)による。

[主束接続1形式](../GBG7/index.md#def-gbg7-connection-form) $\omega$ を一つ固定する。水平空間を $H_p=\ker\omega_p$、局所ポテンシャルを $A_i=s_i^*\omega$ とする。$\omega(\xi_P)=\xi$、$R_g^*\omega=\operatorname{Ad}_{g^{-1}}\omega$ の右主作用規約を全節で用いる。

<!-- definition-example-audit: strict -->

---

## 1. なぜ普通の微分は貼り合わないか

まず、変換する成分をそのまま微分する。$W(x)=\rho(g(x))$、$u'(x)=W(x)^{-1}u(x)$ と置く。ここで $u'$ のプライムは**別の局所sectionで表した成分**を意味し、$x$ による導関数ではない。$d$ は基底の変数 $x$ に関する外微分である。積の微分から

$$
du'=d(W^{-1})u+W^{-1}du.
$$

$WW^{-1}=I$ を微分すると

$$
dW\,W^{-1}+W\,d(W^{-1})=0,
\qquad
d(W^{-1})=-W^{-1}(dW)W^{-1}.
$$

よって $du'$ は一般には $W^{-1}du$ と等しくない。微分する位置に依存して基底を取り替えると、基底の変化を測る一項が余分に出る。

この差を補うため、Lie 環の元 $\xi$ が表現空間 $V$ をどのように無限小で動かすかを先に整理する。[Lie 群の指数写像](../../../代数系/LIE/LIE2/index.md#def-lie2-exponential-map)を用い、群の単位元の近くで表現を微分する。

$\operatorname{End}_{\mathbb F}(V)$ は $V$ から $V$ への $\mathbb F$ 線形写像全体を表す。可逆である必要はない。

以下の定義では微分変数 $t$ は実数で、$w$ と $\xi$ を固定して動かす。

<a id="def-gbg9-infinitesimal-representation"></a>

<!-- formal-statement-start -->
> **定義（表現の無限小作用）**  
> 有限次元 Lie 群 $G$ の Lie 環 $\mathfrak g=T_eG$、有限次元 $\mathbb F$ ベクトル空間 $V$、滑らかな左線形表現 $\rho:G\to GL_{\mathbb F}(V)$ に対して、各 $\xi\in\mathfrak g$ と $w\in V$ で

$$
\rho_*:\mathfrak g\longrightarrow\operatorname{End}_{\mathbb F}(V),
\qquad
\rho_*(\xi)w=
\left.\frac{d}{dt}\right|_{t=0}\rho(\exp(t\xi))w
$$

> と定まる $\rho_*$ を **表現の無限小作用** と呼ぶ。これは $\mathbb F$ 線形作用素を値に取る実線形写像である（複素表現でも Lie 環に関しては実線形）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg9-infinitesimal-representation -->
**定義の確認**。$G=GL(2,\mathbb R)$、$V=\mathbb R^2$ の標準表現 $\rho(K)w=Kw$ を使う。$GL(2,\mathbb R)$ は行列空間 $M_2(\mathbb R)$ のうち $\det K\ne0$ を満たす開集合なので、単位行列での接空間 $T_I G=\mathfrak{gl}_2(\mathbb R)$ は行列空間 $M_2(\mathbb R)$ と同一視できる。この同一視により、Lie 環の元 $\xi$ は行列として列ベクトル $w$ に作用する。

$\rho$ は行列積と単位元を保ち、各 $K$ は可逆で、行列の成分に関して滑らかである。[行列群の指数写像](../../../代数系/LIE/LIE2/index.md#thm-lie2-general-linear-exponential)により、$\xi\in\mathfrak{gl}_2(\mathbb R)$ について $\exp(t\xi)=I+t\xi+O(t^2)$。したがって、固定した列ベクトル $w$ に対し

$$
\left.\frac d{dt}\right|_0\rho(\exp(t\xi))w
=\left.\frac d{dt}\right|_0(I+t\xi+O(t^2))w
=\xi w.
$$

したがって $\rho_*(\xi)$ は行列 $\xi$ の左からの線形作用である。各 $w$ に線形で、$\xi$ に関しても実線形であることを、この表示から直接確認できる。
<!-- definition-example-end -->

以下の形式 $\rho_*(A)$ は、1形式 $A$ の各値に $\rho_*$ を適用して得る $\operatorname{End}_{\mathbb F}(V)$ 値1形式を意味する。

行列群で $\rho$ が標準表現なら $\rho_*(\xi)=\xi$。一般の表現でも滑らかな群準同型の連鎖律から

$$
\rho_*(\operatorname{Ad}_{g^{-1}}\xi)
=\rho(g)^{-1}\rho_*(\xi)\rho(g),
\qquad
\rho_*(g^{-1}dg)=\rho(g)^{-1}d(\rho(g))
$$

が成り立つ。第一式は $g^{-1}\exp(t\xi)g=\exp(t\operatorname{Ad}_{g^{-1}}\xi)$ の両辺に $\rho$ を適用して $t=0$ で微分したもの。このとき $g$ と $\xi$ は固定して $t$ だけを動かす。

第二式では $g:U\to G$ を滑らかな群値関数、$x\in U$、$v\in T_xU$ とする。$x(0)=x$、$\dot x(0)=v$ を満たす曲線 $x(r)$ を選ぶ。$g^{-1}dg$ は [左 Maurer–Cartan 形式](../../../代数系/LIE/LIE4/index.md#def-lie4-maurer-cartan-form)の引き戻しであり、$g(x)$ における速度を左移動で単位元の接空間へ戻したものである。したがって連鎖律と群準同型性により

$$
\begin{aligned}
\rho_*((g^{-1}dg)_x(v))
&=\left.\frac{d}{dr}\right|_{0}\rho(g(x)^{-1}g(x(r)))\\
&=\rho(g(x))^{-1}\left.\frac{d}{dr}\right|_0\rho(g(x(r)))\\
&=\rho(g(x))^{-1}\bigl(d(\rho\circ g)\bigr)_x(v).
\end{aligned}
$$

ここで $r$ は曲線の変数、$d(\rho\circ g)$ は基底の方向 $v$ に沿う微分である。これらの等式が、次に作る微分の変換を保証する。

## 2. 水平方向だけで場の変化を測る

[GBG4 の切断と同変関数の対応](../GBG4/index.md#thm-gbg4-sections-equivariant)により、滑らかな切断 $\sigma:M\to E$ は、一意な滑らかな関数 $f_\sigma:P\to V$ に対応し、

$$
\sigma(\pi(p))=[p,f_\sigma(p)],
\qquad
f_\sigma(pg)=\rho(g^{-1})f_\sigma(p)
$$

を満たす。同じ場を表すため、ファイバー内の移動に沿った $f_\sigma$ の変化はあらかじめ決まっている。そこで $x$ から $v\in T_xM$ の方向へ進むとき、接続で選ばれる**水平な速度**だけを $f_\sigma$ に入力する。

[GBG6 の水平リフトの一意性](../GBG6/index.md#prop-gbg6-horizontal-lift)から、$p\in\pi^{-1}(x)$ と $v\in T_xM$ に対して、$d\pi_p(h_pv)=v$、$h_pv\in H_p$ を満たす接ベクトル $h_pv$ が一意にある。各 $x$ で接方向 $v$ を $E_x$ の元へ線形に送る滑らかな族を **$E$ 値1形式** と呼び、その全体を $\Omega^1(M;E)$ と書く。

<a id="def-gbg9-covariant-derivative"></a>

<!-- formal-statement-start -->
> **定義（結合束上の共変微分）**  
> 滑らかな右主 $G$ 束 $P\to M$、滑らかな有限次元表現 $\rho:G\to GL_{\mathbb F}(V)$、主束接続1形式 $\omega$ を固定し、$E=P\times_\rho V$ とする。滑らかな切断 $\sigma$ に対応する同変関数を $f_\sigma$ とするとき、$x\in M$、$v\in T_xM$、$p\in\pi^{-1}(x)$ に対し

$$
(\nabla_v\sigma)(x):=[p,(df_\sigma)_p(h_pv)]
$$

> と定める。この式で得る $E$ 値1形式 $\nabla\sigma\in\Omega^1(M;E)$ を、$\omega$ と $\rho$ が誘導する **共変微分** という。右辺が $p$ に依存しないこと、ならびに滑らかさは直後に証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg9-covariant-derivative -->
**定義の確認**（積主束上の二次関数の場）。$M=\mathbb R$、$G=U(1)$、$V=\mathbb C$、$\rho(z)w=zw$、$P=\mathbb R\times U(1)$ とする。[GBG7 の積主束接続形式](../GBG7/index.md#prop-gbg7-product-form)で $A=0$ を選ぶと、点 $(x,k)$ の水平リフトは $h_{(x,k)}(v)=(v,0)$ である。実際、$d\pi(v,0)=v$ であり、接続形式 $\omega(v,W)=k^{-1}W$ に代入すると $\omega(v,0)=0$。水平条件と射影条件の双方を確認した。

切断 $\sigma(x)=[(x,1),x^2]$ に対する同変関数は[GBG4 の対応定理](../GBG4/index.md#thm-gbg4-sections-equivariant)から $f(x,k)=k^{-1}x^2$。実際、$h\in U(1)$ に対し $f(x,kh)=h^{-1}f(x,k)=\rho(h^{-1})f(x,k)$ であり、同変条件を満たす。したがって

$$
(df)_{(x,k)}(v,0)=k^{-1}2xv,
\qquad
[(x,k),k^{-1}2xv]=[(x,1),2xv].
$$

最後の等号は $[pg,w]=[p,\rho(g)w]$ に $p=(x,1)$、$g=k$ を代入したもの。同じ計算を任意の $k\in U(1)$ で行ったので、結果は代表点に依存しない。この例では $\nabla_{\partial_x}\sigma=[(x,1),2x]$ となり、接続が $A=0$ の基準では普通の微分に戻る。
<!-- definition-example-end -->

一般の束で定義が代表点に依存しない理由を確認しよう。以下の Leibniz 則で $da\otimes\sigma$ は $E$ 値1形式を表し、$(da\otimes\sigma)_x(v)=da_x(v)\,\sigma(x)$ と定める。

<a id="thm-gbg9-well-defined"></a>

<!-- formal-statement-start -->
> **定理（水平微分の整合性とLeibniz則）**  
> 上記の滑らかな右主 $G$ 束、表現、接続を仮定する。定義した $\nabla_v\sigma$ は $p\in\pi^{-1}(x)$ の選び方に依存せず、$x,v$ について滑らかで $v$ に線形である。また、任意の滑らかな $\mathbb F$ 値関数 $a$、滑らかな切断 $\sigma,\tau$ に対し

$$
\nabla(\sigma+\tau)=\nabla\sigma+\nabla\tau,
\qquad
\nabla(a\sigma)=da\otimes\sigma+a\nabla\sigma
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

代表点を $p$ から $pg$ に変更すると、水平リフトも $(dR_g)_p$ で移る。[水平分布の右同変性](../GBG6/index.md#def-gbg6-horizontal-distribution)と $f_\sigma(pg)=\rho(g^{-1})f_\sigma(p)$ を合わせれば、微分値は $\rho(g^{-1})$ 倍になる。その倍数は結合束の同値関係で打ち消される。

<!-- proof-start -->
### 証明

**代表点の不変性**。$p'=pg$ とする。$R_g$ は基底を固定し、水平空間を $H_p$ から $H_{pg}$ に送る。したがって

$$
d\pi_{pg}((dR_g)_ph_pv)=d\pi_p(h_pv)=v.
$$

水平リフトの一意性から $h_{pg}v=(dR_g)_ph_pv$。固定した $g\in G$ に関して $f_\sigma\circ R_g=\rho(g^{-1})f_\sigma$ を微分すれば

$$
(df_\sigma)_{pg}(h_{pg}v)
=(df_\sigma)_{pg}((dR_g)_ph_pv)
=\rho(g^{-1})(df_\sigma)_p(h_pv).
$$

ゆえに結合束の同値関係より

$$
[pg,(df_\sigma)_{pg}(h_{pg}v)]
=[p,\rho(g)\rho(g^{-1})(df_\sigma)_p(h_pv)]
=[p,(df_\sigma)_p(h_pv)].
$$

**滑らかさ・線形性**。局所自明化 $p=s_i(x)k$ のもとで水平分布は滑らかな定数階数部分束であり、$d\pi|_H$ は各点で線形同型だから、その逆 $h_p$ は滑らかである。$df_\sigma$ との合成も滑らかで、$v$ に線形。局所基準点 $p=s_i(x)$ で得られる $V$ 値1形式が重なりで上の関係により変換されるため、大域の滑らかな $E$ 値1形式を与える。

**演算則**。同変関数は $f_{\sigma+\tau}=f_\sigma+f_\tau$、$f_{a\sigma}=(a\circ\pi)f_\sigma$。水平リフトに積の微分を適用すると

$$
\begin{aligned}
d f_{a\sigma}(h_pv)
&=d(a\circ\pi)_p(h_pv)\,f_\sigma(p)
 +(a\circ\pi)(p)\,df_\sigma(h_pv)\\
&=da_x(v)f_\sigma(p)+a(x)\,df_\sigma(h_pv).
\end{aligned}
$$

結合束の同値類を取れば Leibniz 則が出る。加法則も微分の線形性から従う。
<!-- proof-end -->

普通の微分との差は「微分の線形性」ではなく、**どの方向の速度を微分へ渡すか**にある。

## 3. 局所公式 $d+\rho_*(A)$ を導く

抽象的な水平微分を実際に計算するには、局所section $s:U\to P$ と場の成分 $u=f_\sigma\circ s$ を使う。$A=s^*\omega$ は[GBG8 の局所ポテンシャル](../GBG8/index.md#def-gbg8-local-potential)である。$ds_xv$ は一般に水平ではない。$ds_xv$ の垂直成分の Lie 環ラベルは $A_x(v)$ なので、再生条件から

$$
h_{s(x)}v=(ds)_xv-\bigl(A_x(v)\bigr)_P(s(x)).
$$

この式が水平なのは $\omega(ds_xv)=A_x(v)$、$\omega((A_x(v))_P)=A_x(v)$ で差が零となるからである。射影も $d\pi(ds_xv)=v$、垂直項の射影は零。よって水平リフトの二条件を満たす。

<a id="thm-gbg9-local-formula"></a>

<!-- formal-statement-start -->
> **定理（結合束の共変微分の局所公式）**  
> 滑らかな右主 $G$ 束 $P\to M$、有限次元の滑らかな左線形表現 $\rho$、主束接続形式 $\omega$、結合束 $E$ を上記のとおり固定する。局所section $s:U\to P$ に関して $A=s^*\omega$、$\sigma(x)=[s(x),u(x)]$ と書けば、共変微分の局所成分は

$$
\boxed{\displaystyle
(\nabla\sigma)_s=du+\rho_*(A)u
}
$$

> である。すなわち $x\in U$、$v\in T_xM$ に対し

$$
(\nabla_v\sigma)(x)
=[s(x),(du)_x(v)+\rho_*(A_x(v))u(x)].
$$
<!-- formal-statement-end -->

### 証明の見取り図

$ds_xv$ から基本ベクトル場を引いて水平化し、その差に同変関数の微分を適用する。[GBG6 の基本ベクトル場](../GBG6/index.md#def-gbg6-fundamental-field)に沿う同変関数の微分は、表現の無限小作用の**負号**を持つ。水平化でも引き算するので、局所公式では正号になる。

<!-- proof-start -->
### 証明

$f=f_\sigma$、$p=s(x)$、$\xi=A_x(v)$ と置く。$f\circ s=u$ より連鎖律で

$$
(df)_p((ds)_xv)=(du)_x(v).
$$

基本ベクトル場に沿う微分は、[同変関数の条件](../GBG4/index.md#def-gbg4-equivariant-map)を $\exp(t\xi)$ に適用して

$$
\begin{aligned}
(df)_p(\xi_P(p))
&=\left.\frac{d}{dt}\right|_0 f(p\exp(t\xi))\\
&=\left.\frac{d}{dt}\right|_0
 \rho(\exp(-t\xi))f(p)\\
&=-\rho_*(\xi)f(p)=-\rho_*(\xi)u(x).
\end{aligned}
$$

先に得た水平リフトへ代入すると

$$
\begin{aligned}
(df)_p(h_pv)
&=(df)_p((ds)_xv-\xi_P(p))\\
&=(du)_x(v)-(-\rho_*(\xi)u(x))\\
&=(du)_x(v)+\rho_*(A_x(v))u(x).
\end{aligned}
$$

この値を $[s(x),\,\cdot\,]$ に入れると結論となる。
<!-- proof-end -->

一方、$\rho_*$ を使わずに $du+A u$ と書けるのは、表現が行列の標準作用として具体化され $\rho_*(A)=A$ と確認した場合だけである。任意の荷電表現や随伴表現に、その省略を無条件に使うことはできない。

## 4. パッチを替えても同じ共変微分になる

$U$ 上で $s'=sg$ と置くと、[GBG8 の局所接続の変換則](../GBG8/index.md#thm-gbg8-local-transform)と[GBG4 の成分変換則](../GBG4/index.md#thm-gbg4-component-transformation)から

$$
A'=\operatorname{Ad}_{g^{-1}}A+g^{-1}dg,
\qquad
u'=\rho(g^{-1})u.
$$

この二つを**同時に**変換すれば、微分後の場も元の場と同じように変換される。

<a id="thm-gbg9-gauge-covariance"></a>

<!-- formal-statement-start -->
> **定理（局所共変微分のゲージ共変性）**  
> $P\to M$ を滑らかな右主 $G$ 束、$\rho$ を滑らかな有限次元左線形表現、$\omega$ を主束接続形式とする。同じ開集合 $U$ 上の局所sectionが $s'=sg$ で関係し、$A=s^*\omega$、$u=f_\sigma\circ s$ とおく。このとき対応する $A'$、$u'$ について

$$
\boxed{\displaystyle
du'+\rho_*(A')u'
=\rho(g^{-1})\bigl(du+\rho_*(A)u\bigr)
}
$$

> が $U$ 上の $V$ 値1形式として成り立つ。したがって局所式 $d+\rho_*(A_i)$ は重なりで貼り合わさり、同一の大域共変微分を表す。
<!-- formal-statement-end -->

### 証明の見取り図

$W=\rho(g)$ とおく。非斉次項が $W^{-1}dW$ になり、$d(W^{-1})=-W^{-1}(dW)W^{-1}$ と相殺する。微分の成分と場の成分を片方だけ変えてはいけない。

<!-- proof-start -->
### 証明

$W=\rho(g)$、$B=\rho_*(A)$ と記す。第1節で確認した表現の微分公式を $g$ と $A$ に適用すると

$$
\begin{aligned}
B'=\rho_*(A')
&=\rho_*(\operatorname{Ad}_{g^{-1}}A)+\rho_*(g^{-1}dg)\\
&=W^{-1}BW+W^{-1}dW.
\end{aligned}
$$

$u'=W^{-1}u$ だから、$V$ 値関数の積の微分とこの表示から

$$
\begin{aligned}
du'+B'u'
&=d(W^{-1}u)+(W^{-1}BW+W^{-1}dW)W^{-1}u\\
&=(dW^{-1})u+W^{-1}du+W^{-1}Bu
 +W^{-1}(dW)W^{-1}u\\
&=W^{-1}du+W^{-1}Bu.
\end{aligned}
$$

最後の等号では $dW^{-1}=-W^{-1}(dW)W^{-1}$ によって二項が消える。$W^{-1}=\rho(g^{-1})$ に戻すと主張が従う。これは $x$ と接方向 $v$ のすべてで成立するので、1形式として成り立つ。
<!-- proof-end -->

局所形式から大域の接続を[GBG8 の再構成定理](../GBG8/index.md#thm-gbg8-local-reconstruction)で与えた場合にも、上の計算はその結合束の場の微分が大域的に定まることを示す。

## 5. 荷電スカラー場と随伴場の二つの例

### $U(1)$：荷電スカラーの微分

整数 $q\in\mathbb Z$ に対し $\rho_q(e^{i\theta})w=e^{iq\theta}w$ は [GBG4 の表現の例](../GBG4/index.md#def-gbg4-representation)で確認した滑らかな複素線形表現である。$\xi=it\in i\mathbb R$ に対して

$$
\rho_{q*}(it)w
=\left.\frac d{dr}\right|_0 e^{iqtr}w
=iqt\,w.
$$

$U=\mathbb R$ で $A=ia\,dx$（$a\in\mathbb R$ は定数）、$u(x)=e^{ikx}$（$k\in\mathbb R$）とすれば

$$
du=ik e^{ikx}dx,\qquad
\rho_{q*}(A)u=iq a e^{ikx}dx,
$$

よって

$$
\nabla u=i(k+qa)e^{ikx}dx.
$$

section を $g(x)=e^{ibx}$（$b\in\mathbb R$）で変更すると、$A'=i(a+b)dx$、$u'=e^{-iqbx}e^{ikx}$。微分を実行すると

$$
\begin{aligned}
du'+\rho_{q*}(A')u'
&=i(k-qb)u'dx+iq(a+b)u'dx\\
&=i(k+qa)u'dx
=\rho_q(g^{-1})\,\nabla u.
\end{aligned}
$$

$q=0$ なら補正項は零になり、接続が何であっても中性スカラーの共変微分は $du$ となる。$q$ はここでは表現の整数重みであり、物理的な結合係数や単位の規約とは区別する。

### 随伴表現：Lie 環に値を持つ場

[GBG5 の随伴Lie環束](../GBG5/index.md#def-gbg5-adjoint-lie-bundle)は $\rho=\operatorname{Ad}:G\to GL_{\mathbb R}(\mathfrak g)$ に対応する結合束である。[LIE2 の随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation)を指数曲線で微分すると $\rho_*(\xi)\eta=[\xi,\eta]$。したがって局所成分 $\Phi:U\to\mathfrak g$ の微分は

$$
\boxed{\displaystyle
\nabla\Phi=d\Phi+[A,\Phi]
}
$$

となる。ここで $[A,\Phi]_x(v)=[A_x(v),\Phi(x)]$ と定め、$A$ は1形式、$\Phi$ は0形式である。

例えば $G=SU(2)$、$U=\mathbb R$、次の反 Hermite・跡零行列を使う。

$$
H=\begin{pmatrix}i&0\\0&-i\end{pmatrix},
\qquad
X=\begin{pmatrix}0&i\\i&0\end{pmatrix},
\qquad
A=H\,dx,\quad \Phi(x)=xX.
$$

行列の掛け算を順に行うと

$$
HX=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
XH=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad
[H,X]=\begin{pmatrix}0&-2\\2&0\end{pmatrix}.
$$

よって

$$
\nabla\Phi=
\left(X+x[H,X]\right)dx
=\begin{pmatrix}0&i-2x\\i+2x&0\end{pmatrix}dx.
$$

係数行列はすべて反 Hermite・跡零で、確かに $\mathfrak{su}(2)$ に値を取る。変換すると $\Phi'=\operatorname{Ad}_{g^{-1}}\Phi$、共変微分も $\operatorname{Ad}_{g^{-1}}(\nabla\Phi)$ となる。$[A,\Phi]$ を落とすと、位置で変わる共役を普通に微分したときの余分な項を消せない。

## 6. 演習と詳細解答

以下では、特記しない限り右主作用、$s'=sg$、$\rho$ は左表現、$\nabla u=du+\rho_*(A)u$ という本講の規約を使う。

### Level A：公式の各部を自分で計算する

<a id="ex-gbg9-a01"></a>
#### GBG9-A01 逆行列の微分

- Level: A

滑らかな $W:\mathbb R\to GL(2,\mathbb R)$ が与えられたとき、$W^{-1}$ の微分公式を $WW^{-1}=I$ から証明せよ。$W(x)=\operatorname{diag}(e^x,e^{-x})$ に適用して両辺を比較せよ。

<!-- solution-start -->
**詳細解答**。ここで $W'(x)=dW(x)/dx$ は $x$ に関する導関数であり、第1節で局所成分の変更を表した $u'$ とはプライムの意味が異なる。恒等式の両辺を $x$ で微分すると $W'W^{-1}+W(W^{-1})'=0$。左から $W^{-1}$ を掛けて

$$
(W^{-1})'=-W^{-1}W'W^{-1}.
$$

例では $W'=\operatorname{diag}(e^x,-e^{-x})$、$W^{-1}=\operatorname{diag}(e^{-x},e^x)$ だから

$$
-W^{-1}W'W^{-1}
=-\operatorname{diag}(e^{-x},-e^x)
=\operatorname{diag}(-e^{-x},e^x).
$$

直接 $W^{-1}$ を微分してもこの行列となる。順序を入れ替えられない一般行列でも最初の式が成り立つ。
<!-- solution-end -->

<a id="ex-gbg9-a02"></a>
#### GBG9-A02 $U(1)$ の表現微分

- Level: A

$q=-2$、$\rho_q(e^{i\theta})w=e^{iq\theta}w$、$A=3i\,dx$、$u(x)=e^{ix}$ に対し $\rho_{q*}(i)$ と $\nabla u$ を求めよ。

<!-- solution-start -->
**詳細解答**。定義から

$$
\rho_{q*}(i)w
=\left.\frac d{dt}\right|_0e^{-2it}w=-2iw.
$$

したがって $\rho_{q*}(A)u=3(-2i)e^{ix}dx=-6ie^{ix}dx$。$du=ie^{ix}dx$ を加え

$$
\nabla u=(-5i)e^{ix}dx.
$$

係数 $q=-2$ を落として $du+A u$ としないことが要点である。
<!-- solution-end -->

<a id="ex-gbg9-a03"></a>
#### GBG9-A03 水平化に必要な符号

- Level: A

局所section $s:U\to P$ で $A=s^*\omega$ とし、$\xi=A_x(v)$ と置く。$h=(ds)_xv-\xi_P(s(x))$ が水平リフトであることを、接続の二条件をそれぞれ使って確かめよ。

<!-- solution-start -->
**詳細解答**。[局所接続形式の定義](../GBG8/index.md#def-gbg8-local-potential)より $\omega((ds)_xv)=A_x(v)=\xi$。[接続の再生条件](../GBG7/index.md#def-gbg7-connection-form)から $\omega(\xi_P)=\xi$。ゆえに $\omega(h)=\xi-\xi=0$ で、$h\in H_{s(x)}$。

また $d\pi_{s(x)}((ds)_xv)=d(\pi\circ s)_xv=v$ であり、$d\pi(\xi_P)=0$ は基本ベクトル場がファイバー内の曲線の速度であることから従う。したがって $d\pi(h)=v$。両条件と[水平リフトの一意性](../GBG6/index.md#prop-gbg6-horizontal-lift)によってこの $h$ が求めるリフトである。
<!-- solution-end -->

<a id="ex-gbg9-a04"></a>
#### GBG9-A04 非可換な随伴作用

- Level: A

$\mathfrak{gl}_2(\mathbb R)$ の行列 $B=\left(\begin{smallmatrix}1&0\\0&0\end{smallmatrix}\right)$、$Y=\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$ に対し $[B,Y]$ を求め、$A=B\,dx$、$\Phi(x)=xY$ の $\nabla\Phi$ を求めよ。

<!-- solution-start -->
**詳細解答**。行列積を比べると $BY=Y$、$YB=0$。したがって $[B,Y]=Y$ である。また $d\Phi=Y\,dx$、$[A,\Phi]=x[B,Y]dx=xY\,dx$ なので

$$
\nabla\Phi=(1+x)Y\,dx.
$$

行列 $B,Y$ は $GL(2,\mathbb R)$ の Lie 環 $\mathfrak{gl}_2$ に属するので、[随伴表現の局所公式](#thm-gbg9-local-formula)の仮定を満たす。
<!-- solution-end -->

<a id="ex-gbg9-a05"></a>
#### GBG9-A05 中性場とLeibniz則

- Level: A

$G=U(1)$ の自明表現 $\rho_0(z)=1$、$a(x)=x$、$u(x)=x^2$ の場合に $\nabla(au)=da\,u+a\nabla u$ を直接検算せよ。任意の接続 $A$ を許す。

<!-- solution-start -->
**詳細解答**。$\rho_0(\exp(t\xi))=1$ は $t$ によらないから $\rho_{0*}(\xi)=0$。よって $\nabla u=du$、$\nabla(au)=d(x^3)=3x^2dx$。右辺は

$$
da\,u+a\nabla u
=dx\,x^2+x(2x\,dx)
=3x^2dx.
$$

接続に依存する項は表現の微分の段階で零なので、任意の $A$ について等しい。
<!-- solution-end -->

### Level B：複数の構成をつなぐ

<a id="ex-gbg9-b01"></a>
#### GBG9-B01 非定数ゲージ変換を最後まで追う

- Level: B

$U=\mathbb R$、$G=U(1)$、$\rho_2(z)=z^2$、$A=i x\,dx$、$u(x)=e^{ix^2}$、$g(x)=e^{i3x}$ とする。$A'$、$u'$ を求め、$D'u'=\rho_2(g^{-1})Du$ を両辺独立に計算せよ。

<!-- solution-start -->
**詳細解答**。[GBG8 の局所ゲージポテンシャルの変換則](../GBG8/index.md#thm-gbg8-local-transform)により $g^{-1}dg=3i\,dx$、$U(1)$ では随伴作用は恒等。したがって

$$
A'=i(x+3)dx,\qquad
u'=e^{-i6x}e^{ix^2}=e^{i(x^2-6x)}.
$$

表現微分は $\rho_{2*}(it)=2it$ だから

$$
Du=(2ix+2ix)e^{ix^2}dx=4ix\,e^{ix^2}dx.
$$

一方

$$
\begin{aligned}
D'u'
&=du'+\rho_{2*}(A')u'\\
&=i(2x-6)u'dx+2i(x+3)u'dx\\
&=4ix\,u'dx.
\end{aligned}
$$

これは $\rho_2(g^{-1})Du=e^{-i6x}4ix\,e^{ix^2}dx$ と一致する。非斉次の $+3$ と場の位相の $-6x$ が打ち消し合った。
<!-- solution-end -->

<a id="ex-gbg9-b02"></a>
#### GBG9-B02 同変関数から共変微分を復元する

- Level: B

積主束 $P=\mathbb R\times GL(2,\mathbb R)$ の標準表現と $b=B\,dx$（一定行列 $B$）による接続を考える。$u:\mathbb R\to\mathbb R^2$ に対し $f(x,K)=K^{-1}u(x)$ と置く。$K=I$ で水平リフトを求め、$(df)(h)$ が $u'+Bu$ に等しいことを示せ。

<!-- solution-start -->
**詳細解答**。[GBG7 の積主束における接続1形式の具体式](../GBG7/index.md#prop-gbg7-product-form)により

$$
\omega_{(x,K)}(v,W)=K^{-1}BvK+K^{-1}W.
$$

$K=I$ では $\omega_{(x,I)}(v,W)=Bv+W$。射影条件 $d\pi(v,W)=v$ と水平条件 $\omega(v,W)=0$ から $W=-Bv$、すなわち $h_{(x,I)}v=(v,-Bv)$。

逆行列の微分公式を $K(t)=I-tBv$ に適用すると、$K(0)=I$、$\dot K(0)=-Bv$ より

$$
\left.\frac d{dt}\right|_0 K(t)^{-1}=Bv.
$$

したがって

$$
(df)_{(x,I)}(v,-Bv)
=Bv\,u(x)+u'(x)v
=(u'+Bu)v.
$$

$G$ の標準表現では $\rho_*(B)=B$ なので[本章の局所公式](#thm-gbg9-local-formula)と一致する。
<!-- solution-end -->

<a id="ex-gbg9-b03"></a>
#### GBG9-B03 Leibniz則だけでは接続が決まらない

- Level: B

$E=\mathbb R\times\mathbb R$ 上で $D_1u=du$、$D_2u=du+xu\,dx$ と置く。両方がLeibniz則を満たすことを確かめ、$u=1$ に作用させて二つが異なることを示せ。この違いはどの接続データに由来するか。

<!-- solution-start -->
**詳細解答**。滑らかな実関数 $a,u$ について

$$
D_2(au)=d(au)+x(au)dx
=(da)u+a(du+xu\,dx)
=(da)u+aD_2u.
$$

$D_1$ は通常の積の微分から同じ規則を満たす。しかし $u=1$ では $D_1(1)=0$、$D_2(1)=x\,dx$ であり、$x\ne0$ の点で異なる。

$G=(\mathbb R,+)$ の標準的な1次元表現 $\rho(t)=e^t\in GL_1(\mathbb R)$ を用いると $\rho_*(t)=t$ である。積主束の二つの局所接続ポテンシャル $A_1=0$、$A_2=x\,dx$ は[GBG7 の積主束接続構成](../GBG7/index.md#prop-gbg7-product-form)から別々の主束接続を与える。よって違いは同じ束に入れた接続の選択に由来し、Leibniz則そのものからは補正項が一意に決まらない。
<!-- solution-end -->

<a id="ex-gbg9-b04"></a>
#### GBG9-B04 随伴場の共変性を計算する

- Level: B

$G=GL(2,\mathbb R)$ の随伴表現で、$A=B\,dx$、$\Phi=Y$ は一定とする。$B=\operatorname{diag}(1,0)$、$Y=E_{12}$、$g(x)=\operatorname{diag}(e^x,1)$。$\Phi'=\operatorname{Ad}_{g^{-1}}\Phi$、$A'=g^{-1}Ag+g^{-1}dg$ を求め、$D'\Phi'=g^{-1}(D\Phi)g$ を示せ。

<!-- solution-start -->
**詳細解答**。$g$ と $B$ は対角なので $g^{-1}Bg=B$。$g^{-1}dg=B\,dx$ だから $A'=2B\,dx$。行列積を順に取ると

$$
\Phi'=g^{-1}Yg=e^{-x}Y,\qquad
d\Phi'=-e^{-x}Y\,dx.
$$

$BY=Y$、$YB=0$ なので $[B,Y]=Y$。したがって

$$
\begin{aligned}
D'\Phi'&=d\Phi'+[A',\Phi']\\
&=-e^{-x}Y\,dx+2e^{-x}[B,Y]dx\\
&=e^{-x}Y\,dx.
\end{aligned}
$$

元の成分では $D\Phi=dY+[B,Y]dx=Y\,dx$。右辺 $g^{-1}(D\Phi)g=e^{-x}Y\,dx$ と一致する。[ゲージ共変性定理](#thm-gbg9-gauge-covariance)を非可換行列で検算できた。
<!-- solution-end -->

### Level C：大域的な微分として貼り合わせる

<a id="ex-gbg9-c01"></a>
#### GBG9-C01 二つのパッチと非可換表現

- Level: C

滑らかな多様体 $M$ の開被覆 $U_1,U_2$ 上で右主 $G=GL(2,\mathbb R)$ 束の局所section $s_2=s_1 g$ があり、重なり上では $g:U_{12}\to GL(2,\mathbb R)$ が滑らかであるとする。標準表現 $V=\mathbb R^2$ を用い、各パッチの滑らかな $\mathfrak{gl}_2$ 値1形式 $A_i$ と滑らかな列ベクトル値関数 $u_i$ が

$$
A_2=g^{-1}A_1g+g^{-1}dg,\qquad
u_2=g^{-1}u_1
$$

を満たすとする。

1. これらが一つの主束接続と一つの結合束切断を与えることを、GBG8 の接続再構成と GBG4 の切断貼り合わせを根拠に説明せよ。
2. $D_i u_i=du_i+A_i u_i$ が大域的な $E$ 値1形式を与えることを、逆行列の微分を展開して示せ。
3. $U_{12}$ 上で $A_1=0$、$u_1=c$（一定列ベクトル）として、$A_2$ を無視した $du_2$ が一般には同じ大域微分を表さない具体例を一つ作れ。

<!-- solution-start -->
**詳細解答**。

**1. 大域データの存在**。$g$ は与えられた主束の遷移関数であり、$A_2$ は[GBG8 の接続の再構成定理](../GBG8/index.md#thm-gbg8-local-reconstruction)の重なり条件を満たす。従ってそれらを局所表示とする唯一の主束接続 $\omega$ が存在する。$\rho$ が標準表現なので $u_2=\rho(g^{-1})u_1$ は[GBG4 の局所成分の貼り合わせ命題](../GBG4/index.md#prop-gbg4-local-section-gluing)の条件であり、唯一の切断 $\sigma$ を与える。

**2. 微分の貼り合わせ**。$gg^{-1}=I$ の微分から $d(g^{-1})=-g^{-1}(dg)g^{-1}$。これを代入し、行列順序を維持すると

$$
\begin{aligned}
D_2u_2
&=d(g^{-1}u_1)+(g^{-1}A_1g+g^{-1}dg)g^{-1}u_1\\
&=d(g^{-1})u_1+g^{-1}du_1
 +g^{-1}A_1u_1+g^{-1}(dg)g^{-1}u_1\\
&=g^{-1}(du_1+A_1u_1)=g^{-1}D_1u_1.
\end{aligned}
$$

最後の関係は[GBG4 の結合束の成分変換](../GBG4/index.md#thm-gbg4-component-transformation)と同じなので、$D_1u_1,D_2u_2$ は $E$ 値1形式として一致して貼り合わされる。

**3. 補正項を落とした失敗例**。$U_{12}$ に実座標 $x$ がある場合を取り、$g(x)=\operatorname{diag}(e^x,1)$、$c=(1,0)^{\mathsf T}$ とする。この $g$ は滑らかで可逆。$u_2=(e^{-x},0)^{\mathsf T}$、$A_2=g^{-1}dg=\operatorname{diag}(1,0)\,dx$。元のパッチでは $D_1u_1=dc=0$ だから、大域微分なら第2パッチでも零でなければならない。ところが

$$
du_2=(-e^{-x},0)^{\mathsf T}dx\ne0,
$$

一方

$$
A_2u_2=(e^{-x},0)^{\mathsf T}dx,
\qquad
D_2u_2=du_2+A_2u_2=0.
$$

補正項を落とすと、同じ一定場の微分を $0$ と非零の双方で表す矛盾が生じる。破綻したのは切断の貼り合わせではなく、**微分の重なりでの整合性**である。
<!-- solution-end -->

## 7. 次に何ができるようになったか

[主束接続形式](../GBG7/index.md#def-gbg7-connection-form) $\omega$ があると、結合束の切断を水平方向に沿って微分できる。局所表示では $d+\rho_*(A)$ となり、ゲージの選択を変更しても同じ大域共変微分が得られる。$U(1)$ 表現の整数重み $q$、随伴表現の括弧 $[A,\Phi]$ は同じ構成の異なる表現に過ぎない。

次の GBG10 では、この微分を二方向に重ねたときに順序が交換できない理由を、接続の**曲率**として調べる。