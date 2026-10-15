# GA1 Laplace--Beltrami作用素・Green公式・弱形式

[微分幾何学で導入したRiemann計量](../../GEO/GEO12/index.md#def-geo12-riemannian-metric)は長さと体積を決め、[Laplace--Beltrami作用素](../../GEO/GEO12/index.md#def-geo12-div-laplacian)も定めました。しかし作用素の座標式だけでは、方程式を解く際に境界で何が必要か、解が一意になるか、なぜ「弱い意味の解」が登場するかは分かりません。

本章では、**局所座標で微分する作用素を、積分と境界条件を通じて解析の道具へ変える**ことを目標にします。中心となるのは、多様体上の流束積分公式を確立し、そこからGreen公式を導き、微分方程式を積分恒等式に書き換える流れです。後続のSobolev空間論では、この積分恒等式を滑らかでない関数にも拡張します。

## 1. 計量が微分作用素を決める

滑らかなRiemann多様体 $(M,g)$ の局所座標 $(x^1,\ldots,x^d)$ で、座標ベクトルを $\partial_i$、計量行列を $G=(g_{ij})$、その逆行列を $(g^{ij})$ とします。正定値性により $\det G>0$ です。

[GEO12の勾配座標公式](../../GEO/GEO12/index.md#prop-geo12-gradient-coordinate)に従うと、勾配の成分は $\left(\nabla_g u\right)^i=g^{ij}\partial_j u$ です。また[体積密度](../../GEO/GEO12/index.md#prop-geo12-volume-coordinate)は $\rho=\sqrt{\det G}$ です。

既習の[座標公式](../../GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)を本章の符号規約で書くと、

$$
\Delta_g u
=\frac1{\sqrt{\det G}}\partial_i
\left(\sqrt{\det G}\,g^{ij}\partial_j u\right)
$$

です。反復する添字 $i,j$ は $1$ から $d$ まで総和します。二階微分に掛かる係数は正定値行列 $(g^{ij})$ です。

これは座標公式の再導出ではなく、どの部分が解析で用いられるかを整理したものです。

### 式が現れる順序

体積密度 $\rho$ を固定して $X=X^i\partial_i$ の流れを微小時間だけ考えると、[GEO12の発散公式](../../GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)は

$$
\operatorname{div}_g X
=\frac1{\rho}\partial_i(\rho X^i)
$$

です。$X=\nabla_g u$ と置き、その成分 $X^i=g^{ij}\partial_j u$ を代入すると

$$
\operatorname{div}_g(\nabla_g u)
=\rho^{-1}\partial_i(\rho\,g^{ij}\partial_j u)
$$

となり、上の式を得ます。これは定理の適用対象と代入を省かずに追った計算です。

$g^{ij}$ が正定値であるのは、$G$ が正定値なら $v^{\mathsf T}G^{-1}v=(G^{-1}v)^{\mathsf T}G(G^{-1}v)>0$ （$v\ne0$）だからです。従って作用素の二階項は、符号を含めてEuclidのLaplacianに対応する楕円型の形です。

### 円・球面・トーラスで確認

円 $S^1=\mathbb R/(2\pi\mathbb Z)$ で角度 $\theta$、計量 $d\theta^2$ を使うと $\rho=1$、$g^{\theta\theta}=1$ なので

$$
\Delta_{S^1}u=\frac{d^2u}{d\theta^2}.
$$

周期関数 $u(\theta)=\cos(2\theta)$ では $\Delta u=-4u$ です。座標の端点 $0,2\pi$ は同一点であり、円には境界がありません。

単位球面 $S^2$ では、北極・南極を除く座標 $(\theta,\varphi)$ （$0<\theta<\pi$、経度 $\varphi$）で標準計量は

$$
g=d\theta^2+\sin^2\theta\,d\varphi^2,\quad
G=\begin{pmatrix}1&0\\0&\sin^2\theta\end{pmatrix}.
$$

この座標領域では $\rho=\sin\theta>0$、逆行列は対角成分 $1,\sin^{-2}\theta$ なので

$$
\begin{aligned}
\Delta_{S^2}u
&=\frac1{\sin\theta}\partial_\theta(\sin\theta\,\partial_\theta u)
 +\frac1{\sin\theta}\partial_\varphi
 \left(\frac1{\sin\theta}\partial_\varphi u\right)\\
&=\partial_{\theta\theta}u+\cot\theta\,\partial_\theta u
 +\frac1{\sin^2\theta}\partial_{\varphi\varphi}u.
\end{aligned}
$$

見かけ上の $\sin\theta=0$ は極におけるこの座標の破綻です。滑らかな球面関数に対する $\Delta_{S^2}$ 自体がそこで発散することを意味しません。たとえば高さ関数 $u=\cos\theta$ は球面上で滑らかで、上式から $\Delta_{S^2}u=-2\cos\theta$ が成り立ち、両辺の連続性により極でも同じです。

平坦トーラス $T^2=(\mathbb R/2\pi\mathbb Z)^2$ には周期座標 $(x,y)$ に対応する平坦計量を入れます。行列 $G=I_2$ なので

$$
\Delta_{T^2}u=u_{xx}+u_{yy}.
$$

$u=\sin x\cos(2y)$ なら $\Delta u=-(1+4)u=-5u$ です。トーラスがコンパクトでも、周期座標の切れ目は境界ではありません。

## 2. 外向きの流れを境界積分で測る

ここからは、$M$ を**コンパクトな、向き付けられた滑らかな$d$次元Riemann多様体**とし、境界 $\partial M$ は空でもよいものとします。境界があれば滑らかで、計量による外向き単位法線 $\nu$ が定まります。$\nu$ は境界の接空間に直交し、$g(\nu,\nu)=1$、外を向く方を選びます。

境界に制限した計量で定まる面積要素を $dS_g$ とします。$dV_g$ は内部のRiemann体積要素です。向きの選び方は[境界向きの定義](../../GEO/GEO8/index.md#def-geo8-boundary-orientation)に従います。

<a id="thm-ga1-divergence"></a>
<!-- formal-statement-start -->
> **定理（Riemann多様体の発散定理）**  
> 上記の $M$ と $X\in C^\infty(TM)$ に対して
>
$$
\boxed{\int_M\operatorname{div}_gX\,dV_g
=\int_{\partial M}g(X,\nu)\,dS_g.}
$$
>
> $\partial M=\varnothing$ の場合、右辺を $0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

流れの発散を体積形式の微分へ翻訳し、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を使います。肝心なのは、境界上で法線方向の成分だけが残る理由です。

<!-- proof-start -->
### 証明

向きに整合する体積形式を $\mu$ とします。[GEO7のCartan公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)と $d\mu=0$ から

$$
d(\iota_X\mu)=\mathcal L_X\mu
=(\operatorname{div}_gX)\mu
$$

を得ます。最後の等号は[GEO12の発散の定義](../../GEO/GEO12/index.md#def-geo12-div-laplacian)です。[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を $(d-1)$ 次形式 $\iota_X\mu$ に適用すると

$$
\int_M\operatorname{div}_gX\,dV_g
=\int_Md(\iota_X\mu)=\int_{\partial M}\iota_X\mu.
$$

境界点 $p$ で、境界の正向き正規直交基底 $(e_1,\ldots,e_{d-1})$ を選びます。[境界向き](../../GEO/GEO8/index.md#def-geo8-boundary-orientation)に従って $(\nu,e_1,\ldots,e_{d-1})$ は $M$ の正向き基底です。$X=g(X,\nu)\nu+X^\top$ と法線・接線成分へ分解すると

$$
\begin{aligned}
(\iota_X\mu)(e_1,\ldots,e_{d-1})
&=\mu(X,e_1,\ldots,e_{d-1})\\
&=g(X,\nu)\mu(\nu,e_1,\ldots,e_{d-1})\\
&=g(X,\nu).
\end{aligned}
$$

接線成分 $X^\top$ は $e_1,\ldots,e_{d-1}$ と一次従属になるため寄与しません。従って境界への引き戻しは $g(X,\nu)dS_g$ であり結論です。
<!-- proof-end -->

平面の環状領域の内側境界では、外向きは「中心へ向かう方向」です。法線の向きを逆にするとこの定理の境界項の符号が壊れます。

## 3. Greenの二つの公式

Euclid空間の部分積分では、微分を一方の関数から他方へ移すと端点項が残りました。多様体でも同じですが、端点が境界超曲面、傾きが法線微分になります。

境界上の法線微分を $\partial_\nu u:=g(\nabla_g u,\nu)$ と書きます。これは定義済みの[計量勾配](../../GEO/GEO12/index.md#def-geo12-gradient)を法線へ射影した量です。

<a id="thm-ga1-green-first"></a>
<!-- formal-statement-start -->
> **定理（Greenの第一公式）**  
> $M$ は第2節の仮定を満たし、$u,v\in C^\infty(M)$ とする。このとき
>
$$
\boxed{
\int_M g(\nabla_g u,\nabla_g v)\,dV_g
=-\int_M v\Delta_gu\,dV_g
+\int_{\partial M}v\,\partial_\nu u\,dS_g.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$v\nabla_g u$ に発散定理を適用します。発散の積の法則を先に確認することが核心です。

<!-- proof-start -->
### 証明

局所座標で $X^i=g^{ij}\partial_ju$、$\rho=\sqrt{\det G}$ とします。[Riemannian 発散の座標表示](../../GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)から

$$
\begin{aligned}
\operatorname{div}_g(vX)
&=\rho^{-1}\partial_i(\rho vX^i)\\
&=\rho^{-1}\bigl[v\partial_i(\rho X^i)+\rho X^i\partial_i v\bigr]\\
&=v\operatorname{div}_gX+dv(X).
\end{aligned}
$$

[勾配の定義](../../GEO/GEO12/index.md#def-geo12-gradient)により $dv(\nabla_gu)=g(\nabla_gv,\nabla_gu)$ です。$X=\nabla_gu$ を代入して

$$
\operatorname{div}_g(v\nabla_gu)
=v\Delta_gu+g(\nabla_gv,\nabla_gu)
$$

となります。[発散定理](#thm-ga1-divergence)をこのベクトル場へ適用し、境界で $g(v\nabla_gu,\nu)=v\partial_\nu u$ として移項すれば結論です。
<!-- proof-end -->

ここで $u,v$ を交換して差を取ると、内積項が消えます。

<a id="thm-ga1-green-second"></a>
<!-- formal-statement-start -->
> **定理（Greenの第二公式）**  
> 第2節の $M$ と $u,v\in C^\infty(M)$ に対して
>
$$
\boxed{
\int_M(u\Delta_gv-v\Delta_gu)\,dV_g
=\int_{\partial M}
(u\,\partial_\nu v-v\,\partial_\nu u)\,dS_g.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[第一公式](#thm-ga1-green-first)の $(u,v)$ と $(v,u)$ への適用から

$$
\int_Mg(\nabla_gu,\nabla_gv)
=-\int_M v\Delta_gu+\int_{\partial M}v\partial_\nu u,
$$

$$
\int_Mg(\nabla_gv,\nabla_gu)
=-\int_M u\Delta_gv+\int_{\partial M}u\partial_\nu v
$$

を得ます（積分要素はそれぞれ $dV_g,dS_g$）。内積の対称性で左辺は等しいので、二式の差を取り整理すると

$$
\int_M(u\Delta_gv-v\Delta_gu)
=\int_{\partial M}(u\partial_\nu v-v\partial_\nu u)
$$

です。
<!-- proof-end -->

境界が空なら第一公式で $v=u$ とすることにより

$$
\int_Mu(-\Delta_gu)\,dV_g
=\int_M|\nabla_gu|_g^2\,dV_g\ge0
$$

です。従って本講座では **$\Delta_g$ が非正、$L_g:=-\Delta_g$ が非負**という符号を採用します。

## 4. エネルギーと「微分を試験関数へ移す」考え

方程式 $-\Delta_gu=f$ を考えるとき、$u$ が二階微分可能とは限りません。それでも第一公式の左辺なら一階微分だけで意味があります。まず滑らかな関数で積分式を作り、次章で関数空間を拡張します。

<a id="def-ga1-dirichlet-energy"></a>
<!-- formal-statement-start -->
> **定義（Dirichletエネルギー）**  
> コンパクトRiemann多様体 $(M,g)$ と $u\in C^1(M)$ に対し、
>
$$
E_g[u]:=\frac12\int_M|\nabla_gu|_g^2\,dV_g
$$
>
> をDirichletエネルギーと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga1-dirichlet-energy -->
**定義の確認**。標準円 $S^1$ で $u(\theta)=\sin\theta$ とすると $\nabla_gu=(\cos\theta)\partial_\theta$、$|\nabla_gu|_g^2=\cos^2\theta$ です。従って

$$
E_g[u]=\frac12\int_0^{2\pi}\cos^2\theta\,d\theta=\frac{\pi}{2}.
$$

$S^1$ は境界がないので、任意の実数 $c$ に対して $E_g[u+c]=E_g[u]$ です。エネルギーが定数の違いを区別できないことが、次の可解性と一意性に現れます。
<!-- definition-example-end -->

$u+\varepsilon v$ を代入し、積を展開すれば

$$
\begin{aligned}
E_g[u+\varepsilon v]
&=\frac12\int_M
\bigl(|\nabla_gu|^2+2\varepsilon g(\nabla_gu,\nabla_gv)
+\varepsilon^2|\nabla_gv|^2\bigr)\,dV_g,\\
\left.\frac{d}{d\varepsilon}E_g[u+\varepsilon v]\right|_{\varepsilon=0}
&=\int_Mg(\nabla_gu,\nabla_gv)\,dV_g.
\end{aligned}
$$

ここでは積分する関数がコンパクトな $M$ 上で連続なので、係数を積分した二次多項式を微分してよく、積分と極限の交換に新しい定理は要りません。

<a id="def-ga1-smooth-weak-form"></a>
<!-- formal-statement-start -->
> **定義（Poisson方程式の滑らかな試験関数による弱形式）**  
> $M$ を第2節の多様体とし、$f\in C(M)$ とする。境界が空なら $u\in C^1(M)$ が
>
$$
\int_Mg(\nabla_gu,\nabla_g\varphi)\,dV_g
=\int_Mf\varphi\,dV_g
\qquad(\forall\varphi\in C^\infty(M))
$$
>
> を満たすことを、方程式 $-\Delta_gu=f$ の**滑らかな試験関数による弱形式を満たす**という。
>
> 境界がある場合、$h\in C(\partial M)$ を指定し、右辺に $\int_{\partial M}h\varphi\,dS_g$ を足した恒等式を、法線微分条件 $\partial_\nu u=h$ をもつNeumann型弱形式という。この節では $C^1$ 関数だけを扱い、Sobolev空間上の弱解は次章で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga1-smooth-weak-form -->
**定義の確認**。$S^1$ で $u=\sin\theta$、$f=\sin\theta$ とします。$u''=-\sin\theta$ なので、周期的な滑らかな $\varphi$ に対し

$$
\begin{aligned}
\int_0^{2\pi}u'\varphi'\,d\theta
&=[u'\varphi]_0^{2\pi}-\int_0^{2\pi}u''\varphi\,d\theta\\
&=0+\int_0^{2\pi}\sin\theta\,\varphi\,d\theta.
\end{aligned}
$$

端点の寄与がゼロなのは $u'$ と $\varphi$ が周期的であるためです。従って、任意の試験関数について定義の恒等式が成立します。
<!-- definition-example-end -->

<a id="prop-ga1-weak-classical"></a>
<!-- formal-statement-start -->
> **命題（古典解と弱形式の一致）**  
> $M$ を第2節の多様体とし、$u\in C^2(M)$、$f\in C(M)$ とする。境界が空なら、$u$ が第4節の弱形式を満たすことと $-\Delta_gu=f$ が点ごとに成立することは同値である。境界がある場合、$u$ がNeumann型弱形式を満たすことと、内部で $-\Delta_gu=f$、境界で $\partial_\nu u=h$ が成立することは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

古典解から弱形式は[第一公式](#thm-ga1-green-first)で直ちに従います。逆に弱形式に第一公式を代入すると

$$
\int_M(-\Delta_gu-f)\varphi\,dV_g
+\int_{\partial M}(\partial_\nu u-h)\varphi\,dS_g=0.
$$

まず台が内部にある滑らかな $\varphi$ を選べば境界項は消えます。連続関数 $q=-\Delta_gu-f$ が内部の点 $p$ で $q(p)>0$ と仮定すると、連続性からある近傍で $q>0$ です。その近傍に台をもつ非負・非零の滑らかな試験関数を取れば $\int_Mq\varphi>0$ となり矛盾します。$q(p)<0$ も同様です。よって内部で $q=0$、連続性により境界でも値が定まります。

境界があるとき、残る式は

$$
\int_{\partial M}(\partial_\nu u-h)\varphi\,dS_g=0.
$$

境界の任意の滑らかな関数は境界の管状近傍（局所的には半空間座標）で法線方向に一定に延長し、1の分割で貼り合わせれば $M$ 上の滑らかな試験関数の境界値として実現できます。従って境界上でも同じ非負局在関数の議論が使え、$\partial_\nu u=h$ です。
<!-- proof-end -->

## 5. 境界・定数・適合条件

この段階では解の存在一般を主張しません。存在論には次章の多様体Sobolev空間と、さらに先の変分法が必要です。一方、**どんな解にも必要な条件**ならGreen公式だけで分かります。

<a id="prop-ga1-compatibility"></a>
<!-- formal-statement-start -->
> **命題（Poisson方程式の積分適合条件）**  
> 第2節の $M$ と $u\in C^2(M)$ に対し、$-\Delta_gu=f$ が成立するとする。
>
> (i) 境界が空なら、$\int_M f\,dV_g=0$ が必要である。
>
> (ii) 境界があり、$\partial_\nu u=h$ なら
>
$$
\boxed{\int_Mf\,dV_g+\int_{\partial M}h\,dS_g=0}
$$
>
> が必要である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[発散定理](#thm-ga1-divergence)を $X=\nabla_gu$ へ適用します。$\operatorname{div}_g\nabla_gu=\Delta_gu=-f$ なので

$$
-\int_Mf\,dV_g
=\int_M\Delta_gu\,dV_g
=\int_{\partial M}\partial_\nu u\,dS_g.
$$

境界が空なら右辺は $0$、境界があれば $h$ を代入して移項します。
<!-- proof-end -->

<a id="prop-ga1-neumann-uniqueness"></a>
<!-- formal-statement-start -->
> **命題（連結な多様体での定数までの一意性）**  
> $M$ がさらに連結であるとする。$u_1,u_2\in C^2(M)$ が同じ $f$ に対して $-\Delta_gu_i=f$ を満たし、境界があれば同じNeumann条件 $\partial_\nu u_i=h$ を満たすとき、$u_1-u_2$ は定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$w=u_1-u_2$ は $\Delta_gw=0$ を満たし、境界があれば $\partial_\nu w=0$ です。[第一公式](#thm-ga1-green-first)に $u=v=w$ を代入すると

$$
\int_M|\nabla_gw|_g^2\,dV_g
=-\int_Mw\Delta_gw\,dV_g
+\int_{\partial M}w\partial_\nu w\,dS_g=0.
$$

被積分関数は連続かつ非負であるため、ある点で正ならその近傍でも正となって積分が正になってしまいます。よって $\nabla_gw=0$ です。滑らかな曲線に沿った $w$ の微分は $dw(\dot\gamma)=g(\nabla_gw,\dot\gamma)=0$ であり、連結な多様体は区分的滑らかな曲線で結べるため $w$ は定数です。
<!-- proof-end -->

非連結の場合は各連結成分で別の定数を足せます。また境界条件を指定しない場合は、一意性の証明で境界積分を消せません。たとえば円板上で調和な $u(x,y)=x$ は非定数です。これは「調和なら定数」が一般に誤りなのではなく、**境界項を消す仮定が失われた**ためです。

## 6. 演習

### Level A

<a id="ex-ga1-a01"></a>
#### GA1-A01 円の符号
- Level: A

標準計量の $S^1$ で $u(\theta)=\sin(3\theta)$ とする。$\Delta_gu$、$-\Delta_gu$、$E_g[u]$ を求めよ。

<!-- solution-start -->
**詳細解答**。$g_{\theta\theta}=1$ だから第1節の公式で $\Delta_gu=u''$ です。$u'=3\cos(3\theta)$、$u''=-9\sin(3\theta)$ より

$$
\Delta_gu=-9u,\qquad-\Delta_gu=9u.
$$

エネルギーは[定義](#def-ga1-dirichlet-energy)から

$$
\begin{aligned}
E_g[u]
&=\frac12\int_0^{2\pi}9\cos^2(3\theta)\,d\theta\\
&=\frac92\int_0^{2\pi}\frac{1+\cos(6\theta)}2\,d\theta
=\frac{9\pi}{2}.
\end{aligned}
$$

$-\Delta_g$ が非負という符号規約と一致します。
<!-- solution-end -->

<a id="ex-ga1-a02"></a>
#### GA1-A02 球面の高さ関数
- Level: A

単位球面の $u=\cos\theta$ について、球面座標が有効な領域で $\Delta_gu=-2u$ を直接計算し、極でも成立する理由を述べよ。

<!-- solution-start -->
**詳細解答**。$u_\theta=-\sin\theta$、$u_{\theta\theta}=-\cos\theta$、$u_{\varphi\varphi}=0$ なので、第1節の式へ代入すると

$$
\Delta_gu=-\cos\theta+\cot\theta(-\sin\theta)+0=-2\cos\theta.
$$

$\theta=0,\pi$ では座標式に $\cot\theta$ が現れますが、高さ関数 $u$ は球面を $\mathbb R^3$ に埋め込んだときの第三座標関数で滑らかです。$\Delta_gu$ も滑らかであり、極を除く稠密な集合で成立する等式は連続性から極でも成立します。
<!-- solution-end -->

<a id="ex-ga1-a03"></a>
#### GA1-A03 平坦トーラスの二階微分
- Level: A

平坦トーラス $T^2$ で $u(x,y)=\cos x\sin(2y)$ の $\Delta_gu$ を求め、$\int_{T^2}\Delta_gu\,dV_g=0$ を確認せよ。

<!-- solution-start -->
**詳細解答**。$u_{xx}=-\cos x\sin(2y)=-u$、$u_{yy}=-4\cos x\sin(2y)=-4u$ なので

$$
\Delta_gu=-5u.
$$

積分は $dV_g=dx\,dy$ で

$$
\int_{T^2}\Delta_gu\,dV_g
=-5\left(\int_0^{2\pi}\cos x\,dx\right)
\left(\int_0^{2\pi}\sin(2y)\,dy\right)=0.
$$

これは[境界が空の場合の発散定理](#thm-ga1-divergence)とも一致します。
<!-- solution-end -->

<a id="ex-ga1-a04"></a>
#### GA1-A04 円環の法線符号
- Level: A

Euclid平面の閉円環 $A=\{(x,y):a\le r\le b\}$ （$0<a<b$、$r=\sqrt{x^2+y^2}$）で $u=\log r$ とする。$\Delta u$ と内外境界の $\partial_\nu u$ を求めよ。

<!-- solution-start -->
**詳細解答**。極座標の計量は $dr^2+r^2d\theta^2$ です。$\rho=r$、$g^{rr}=1$、$u_r=r^{-1}$ より

$$
\Delta u=\frac1r\partial_r(ru_r)=\frac1r\partial_r(1)=0.
$$

外側 $r=b$ では $\nu=+\partial_r$ なので $\partial_\nu u=1/b$、内側 $r=a$ では $\nu=-\partial_r$ なので $\partial_\nu u=-1/a$ です。内側で符号を逆にしないと[発散定理](#thm-ga1-divergence)の左右が一致しません。
<!-- solution-end -->

### Level B

<a id="ex-ga1-b01"></a>
#### GA1-B01 二次元共形計量とエネルギー
- Level: B

向き付けられた二次元領域で $g=e^{2\psi(x,y)}(dx^2+dy^2)$、$\psi\in C^\infty$ とする。任意の滑らかな $u$ について $\Delta_gu=e^{-2\psi}\Delta_{\mathrm{Euc}}u$ と、$\int|\nabla_gu|_g^2dV_g=\int(u_x^2+u_y^2)dx\,dy$ を示せ。

<!-- solution-start -->
**詳細解答**。計量行列は $G=e^{2\psi}I_2$ です。逆行列 $G^{-1}=e^{-2\psi}I_2$、行列式 $\det G=e^{4\psi}$、密度 $\rho=e^{2\psi}$ なので

$$
\rho g^{ij}=e^{2\psi}e^{-2\psi}\delta^{ij}=\delta^{ij}.
$$

[座標公式](../../GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)へ代入すると

$$
\Delta_gu=e^{-2\psi}\partial_i(\delta^{ij}\partial_ju)
=e^{-2\psi}(u_{xx}+u_{yy}).
$$

また $|\nabla_gu|_g^2=g^{ij}\partial_iu\partial_ju=e^{-2\psi}(u_x^2+u_y^2)$ です。体積要素は $dV_g=e^{2\psi}dx\,dy$ だから積に現れる因子が打ち消し合い

$$
|\nabla_gu|_g^2dV_g=(u_x^2+u_y^2)\,dx\,dy.
$$

二次元という仮定が重要で、一般の $d$ 次元では体積密度は $e^{d\psi}$ となり $e^{(d-2)\psi}$ が残ります。
<!-- solution-end -->

<a id="ex-ga1-b02"></a>
#### GA1-B02 円板でGreen公式の境界項
- Level: B

単位閉円板 $D$ をEuclid計量で考え、$u(x,y)=x^2+y^2$、$v=1$ とする。[Greenの第一公式](#thm-ga1-green-first)の両辺を直接計算せよ。

<!-- solution-start -->
**詳細解答**。$\nabla u=(2x,2y)$、$\nabla v=0$ だから左辺は $0$ です。また $\Delta u=2+2=4$ で面積 $\pi$ より

$$
-\int_Dv\Delta u\,dA=-4\pi.
$$

境界 $x^2+y^2=1$ では外向き単位法線 $\nu=(x,y)$ です。従って $\partial_\nu u=\nabla u\cdot\nu=2$ となり

$$
\int_{\partial D}v\partial_\nu u\,dS
=\int_0^{2\pi}2\,d\theta=4\pi.
$$

右辺は $-4\pi+4\pi=0$ で左辺と一致します。境界項を落とすと誤って $0=-4\pi$ になります。
<!-- solution-end -->

<a id="ex-ga1-b03"></a>
#### GA1-B03 Neumann適合条件を円環で検証
- Level: B

第A04問の円環で、$f=0$、外周 $r=b$ の法線微分 $h=1/b$、内周 $r=a$ の $h=-1/a$ とする。[積分適合条件](#prop-ga1-compatibility)を確認し、$u=\log r$ が解になることを示せ。

<!-- solution-start -->
**詳細解答**。内部の $f=0$ なので $\int_Af\,dA=0$ です。境界要素は半径 $\rho$ の円で $dS=\rho\,d\theta$ です。従って外周の積分は

$$
\int_{r=b}h\,dS=\int_0^{2\pi}(1/b)b\,d\theta=2\pi
$$

で、内周の積分は

$$
\int_{r=a}h\,dS=\int_0^{2\pi}(-1/a)a\,d\theta=-2\pi.
$$

合計は $0$ で適合条件を満たします。A04で $\Delta\log r=0$ と両境界の法線微分を実際に計算したので、$u=\log r$ は境界条件まで満たす古典解です。[定数までの一意性](#prop-ga1-neumann-uniqueness)より別解との差は定数です。
<!-- solution-end -->

### Level C

<a id="ex-ga1-c01"></a>
#### GA1-C01 円板のNeumann問題を弱形式まで
- Level: C

単位閉円板 $D\subset\mathbb R^2$ 上で

$$
-\Delta u=-4\quad\text{（内部）},\qquad \partial_\nu u=2\quad\text{（境界）}
$$

を考える。次の問いに答えよ。

1. 積分適合条件を確認せよ。
2. $u_0=x^2+y^2$ が解であることを確かめよ。
3. 全ての滑らかな解が $u_0+c$ に限ることを証明せよ。
4. 任意の $\varphi\in C^\infty(D)$ に対する弱形式を導け。

<!-- solution-start -->
**詳細解答**。

(1) 円板の面積は $\pi$ なので $\int_D f\,dA=-4\pi$。周長は $2\pi$ なので $\int_{\partial D}h\,dS=2(2\pi)=4\pi$ です。従って

$$
\int_Df\,dA+\int_{\partial D}h\,dS=-4\pi+4\pi=0.
$$

(2) $u_0=x^2+y^2$ は $\partial_{xx}u_0=2$、$\partial_{yy}u_0=2$ で、$-\Delta u_0=-4$ です。境界の外向き単位法線は $\nu=(x,y)$ であり $\nabla u_0=(2x,2y)$ だから

$$
\partial_\nu u_0=\nabla u_0\cdot\nu
=2(x^2+y^2)=2
$$

が境界上で成立します。

(3) 他の $C^2$ 解 $u$ を取り $w=u-u_0$ と置くと、$\Delta w=0$、$\partial_\nu w=0$ です。[第一公式](#thm-ga1-green-first)の $u=v=w$ により

$$
\int_D|\nabla w|^2\,dA
=-\int_Dw\Delta w\,dA+\int_{\partial D}w\partial_\nu w\,dS=0.
$$

$|\nabla w|^2$ は連続・非負なので全点で0です。円板は連結なので $w=c$、つまり全ての解は $u=u_0+c$ です。逆に定数を足しても微分は変わらず、どの $c\in\mathbb R$ でも解です。

(4) [第一公式](#thm-ga1-green-first)で $u=u_0$、$v=\varphi$ とすると

$$
\begin{aligned}
\int_D\nabla u_0\cdot\nabla\varphi\,dA
&=-\int_D\varphi\Delta u_0\,dA+
\int_{\partial D}\varphi\partial_\nu u_0\,dS\\
&=-4\int_D\varphi\,dA+2\int_{\partial D}\varphi\,dS.
\end{aligned}
$$

定数 $c$ は勾配に影響しないので $u_0+c$ でも同じ式です。これは[滑らかな試験関数によるNeumann型弱形式](#def-ga1-smooth-weak-form)そのものです。方程式・境界条件・弱形式・一意性が同じ第一公式で結び付きました。
<!-- solution-end -->

---

本章の積分恒等式は滑らかな関数で証明しました。次章では、[Euclid空間の弱微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-weak-derivative)を多様体に貼り合わせ、二階微分を持たない関数にもこの恒等式を適用できるようにします。
