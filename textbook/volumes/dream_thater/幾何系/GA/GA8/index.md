# GA8 調和写像・非線形幾何変分

## 1. 関数から多様体値の写像へ

[GA1のDirichletエネルギー](../GA1/index.md#def-ga1-dirichlet-energy)は、実数値関数の勾配を二乗して積分したものでした。関数の値域を別のRiemann多様体に変えると、導関数は依然として長さを持ちます。しかし変分の方向は値域の接空間に制限され、単純な $\Delta_g u=0$ では済まなくなります。値域の曲がり方が方程式にどのように入り込むかが、本章の問いです。

最初の節から第3節までは、$(M^d,g)$ を滑らかな、連結なコンパクト・境界なしRiemann多様体（$d\ge2$）、$(N^n,h)$ を滑らかなRiemann多様体とします。$u:M\to N$ は滑らかな写像です。$N$ のコンパクト性は、この段階では仮定しません。$du_x:T_xM\to T_{u(x)}N$ は微分であり、$g$ に関する正規直交基底 $e_1,\ldots,e_d$ によってその長さを測ります。

<a id="def-ga8-map-energy"></a>

<!-- formal-statement-start -->
> **定義（写像のDirichletエネルギー）**  
> $(M^d,g)$ をコンパクト・境界なしの滑らかなRiemann多様体、$(N,h)$ を滑らかなRiemann多様体、$u:M\to N$ を滑らかな写像とする。次の非負の数を写像 $u$ のDirichletエネルギーと呼ぶ。

$$
|du|_{g,h}^2=\sum_{i=1}^d h_{u(x)}(du(e_i),du(e_i)),
\qquad
E(u)=\frac12\int_M|du|_{g,h}^2\,dV_g.
$$
<!-- formal-statement-end -->

この量が基底によらない理由も確認します。別の正規直交基底を $e'_a=\sum_iQ_{ia}e_i$ と書くと、基底変換行列は $QQ^{\mathsf T}=I$ を満たします。$du$ の線形性と $h$ の双線形性から

$$
\begin{aligned}
\sum_a h(du(e'_a),du(e'_a))
&=\sum_{i,j}\Bigl(\sum_aQ_{ia}Q_{ja}\Bigr)h(du(e_i),du(e_j))\\
&=\sum_i h(du(e_i),du(e_i)).
\end{aligned}
$$

すなわち計量による縮約であり、任意の正規直交基底で同じ値を与えます。以下では $|du|^2$ と略記します。$N=\mathbb R$ なら既習のDirichletエネルギーに一致します。

<!-- definition-example-start: def-ga8-map-energy -->
**定義の確認**（定数写像と恒等写像）： 単位球面 $S^2$ からそれ自身への定数写像 $u(x)=p$ は $du=0$ なので $E(u)=0$ です。一方、恒等写像 $u(x)=x$ では接ベクトル $e_i$ がそのまま写り、各点で $|du|^2=2$ です。従って $E(u)=\frac12\cdot2\cdot\operatorname{Area}(S^2)=4\pi$。エネルギーが正であっても変分に対して停留する写像は存在します。
<!-- definition-example-end -->

## 2. 異なる接空間をどう微分するか

$u$ を動かす方向 $V(x)$ は実数値関数ではなく、値域の接空間 $T_{u(x)}N$ のベクトルです。各点でこの接空間のベクトルを滑らかに割り当てたものが、$u$ に沿うベクトル場です。

接空間は点によって異なります。したがって通常の差分で微分せず、[GEO13のLevi-Civita接続](../../GEO/GEO13/index.md#def-geo13-levi-civita)を写像に沿って引き戻して微分します。

<a id="def-ga8-pullback-connection"></a>

<!-- formal-statement-start -->
> **定義（引き戻し接続）**  
> 滑らかなRiemann多様体間の写像 $u:(M,g)\to(N,h)$ と、$u$ に沿う滑らかなベクトル場 $V$ に対し、$N$ のLevi-Civita接続から得る微分 $\nabla^u_XV$ を **引き戻し接続** と呼ぶ。$M$ の局所座標 $x^i$、$N$ の局所座標 $y^\alpha$ を取り、$V=V^\alpha\partial_{y^\alpha}|_u$ と書くと、その成分は

$$
(\nabla^u_iV)^\alpha
=\partial_iV^\alpha+
\Gamma^\alpha_{\beta\gamma}(u)
\,\partial_i u^\beta\,V^\gamma
$$

> である。$\Gamma^\alpha_{\beta\gamma}$ は $h$ のLevi-Civita接続係数である。
<!-- formal-statement-end -->

この補正項の意味を確かめます。$V$ が局所的に $N$ 上のベクトル場 $\widetilde V$ を $u$ に沿って評価したものなら、連鎖律と[GEO13のテンソル添字に対する接続の成分規則](../../GEO/GEO13/index.md#prop-geo13-tensor-coordinate)から

$$
\begin{aligned}
(\nabla^u_iV)^\alpha
&=\partial_i\bigl(\widetilde V^\alpha(u)\bigr)
+\Gamma^\alpha_{\beta\gamma}(u)
\,\partial_i u^\beta\,\widetilde V^\gamma(u)\\
&=\partial_i u^\beta
\bigl(\partial_{y^\beta}\widetilde V^\alpha+
\Gamma^\alpha_{\beta\gamma}\widetilde V^\gamma\bigr)(u).
\end{aligned}
$$

すなわち「値域で共変微分して $du$ の方向に評価する」操作です。一般の $V$ は $x$ にも独立に依存するので、定義の成分式を用います。接続は計量と両立するため、$u$ に沿う $V,W$ について

$$
X\,h(V,W)=h(\nabla^u_XV,W)+h(V,\nabla^u_XW)
$$

も成り立ちます。これは後の部分積分で不可欠です。

<!-- definition-example-start: def-ga8-pullback-connection -->
**定義の確認**（平坦な値域）： $N=\mathbb R^2$ の標準座標では $\Gamma^\alpha_{\beta\gamma}=0$。$M=\mathbb T^2$、$u(x,y)=(\cos x,\sin x)$、$V(x,y)=(-\sin x,\cos x)$ とすると

$$
\nabla^u_{\partial_x}V=(-\cos x,-\sin x),\qquad
\nabla^u_{\partial_y}V=0.
$$

$V$ は $u$ に直交しますが、その微分は一般に $u$ と平行です。値域が部分多様体 $S^1$ なら「接ベクトルへの射影」がさらに必要になる理由もここに見えています。
<!-- definition-example-end -->

次に $du$ 自身を微分します。$du$ は $M$ の余接方向と $u$ に沿うベクトル方向を持つので、二つの接続を同時に使って

$$
(\nabla du)(X,Y)
=\nabla^u_X(du(Y))-du(\nabla^M_XY)
$$

と定めます。最後の項は $Y$ 自身が動く分を補正しています。実際、局所座標基底について $du(\partial_j)=\partial_ju^\alpha\partial_{y^\alpha}|_u$ を先ほどの引き戻し接続へ代入すると

$$
\begin{aligned}
\nabla^u_{\partial_i}(du(\partial_j))
&=\bigl(\partial_i\partial_j u^\alpha+
\Gamma^\alpha_{\beta\gamma}(h)(u)\partial_iu^\beta\partial_ju^\gamma\bigr)\partial_{y^\alpha}|_u,\\
du(\nabla^M_{\partial_i}\partial_j)
&=\Gamma^k_{ij}(g)\partial_ku^\alpha\partial_{y^\alpha}|_u.
\end{aligned}
$$

両者の差が二階共変微分です。従ってその成分は

$$
(\nabla du)^\alpha_{ij}
=\partial_i\partial_j u^\alpha
-\Gamma^k_{ij}(g)\partial_k u^\alpha
+\Gamma^\alpha_{\beta\gamma}(h)(u)
\,\partial_i u^\beta\partial_j u^\gamma.
$$

ここで添字 $i,j,k$ は始域、$\alpha,\beta,\gamma$ は値域に属します。両接続の捩率が零なので $i,j$ に関して対称です。

<a id="def-ga8-tension"></a>

<!-- formal-statement-start -->
> **定義（張力場と調和写像）**  
> 滑らかな写像 $u:(M,g)\to(N,h)$ の二階共変微分の始域計量による跡を **張力場** $\tau(u)$ と呼ぶ。

$$
\tau(u)=\operatorname{tr}_g\nabla du
=\sum_{i=1}^d(\nabla du)(e_i,e_i)
\in T_{u(x)}N.
$$

> $\tau(u)=0$ が $M$ のすべての点で成立する写像を **調和写像** と呼ぶ。
<!-- formal-statement-end -->

張力場は値域の接ベクトルです。座標式の $\Gamma^k_{ij}(g)$ を落とすと始域の座標変更に不変でなく、$\Gamma^\alpha_{\beta\gamma}(h)$ を落とすと値域の曲率を無視してしまいます。

<!-- definition-example-start: def-ga8-tension -->
**定義の確認**（恒等写像）： $u=\operatorname{id}:(S^2,g)\to(S^2,g)$ では $\partial_i u^\alpha=\delta_i^\alpha$、$\partial_i\partial_j u^\alpha=0$ です。上の式へ代入すると

$$
(\nabla du)^\alpha_{ij}
=-\Gamma^\alpha_{ij}(g)+\Gamma^\alpha_{ij}(g)=0.
$$

従って $\tau(\operatorname{id})=0$。これは単なるエネルギー零の例ではなく、エネルギーが $4\pi$ でも調和である例です。
<!-- definition-example-end -->

## 3. 第一変分を計算すると張力場が現れる

[VAR1で導入した第一変分](../../../解析系/VAR/VAR1/index.md#def-var1-first-variation)では、許容変分が制約を保っていることが重要でした。ここでの制約は「各 $s$ について $u_s(x)\in N$」です。滑らかな写像族 $u_s:M\to N$（$|s|<\varepsilon$）を $u_0=u$ とし、写像族の初速度（変分方向）を $V=\partial_su_s|_{s=0}$ と書きます。$V(x)$ は $T_{u(x)}N$ に属します。

<a id="thm-ga8-first-variation"></a>

<!-- formal-statement-start -->
> **定理（調和写像エネルギーの第一変分）**  
> $(M,g)$ をコンパクト・境界なし、$(N,h)$ を滑らかなRiemann多様体とする。滑らかな写像 $u:M\to N$ の任意の滑らかな変分 $u_s$ と変分場 $V$ について

$$
\left.\frac{d}{ds}E(u_s)\right|_{s=0}
=-\int_M h(V,\tau(u))\,dV_g.
$$

> 特に、すべての滑らかな許容変分に対して第一変分が零となることと、$\tau(u)=0$ であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

始域の正規直交標構を固定し、値域の接続の計量両立性を用いてエネルギーを微分します。二つのパラメータ微分が交換できるのは、値域接続の捩率が零だからです。[GA1のGreen第一公式](../GA1/index.md#thm-ga1-green-first)と同じ発散定理による部分積分で $\tau(u)$ が現れます。

<!-- proof-start -->
### 証明

$(s,x)\mapsto u_s(x)$ を一つの滑らかな写像として扱います。$e_i$ を $M$ の局所正規直交標構とし、$s$ に依存させません。[GEO13の計量両立性](../../GEO/GEO13/index.md#def-geo13-metric-compatibility)によって

$$
\left.\frac d{ds}\frac12\sum_i h(du_s(e_i),du_s(e_i))\right|_{s=0}
=\sum_i h(\nabla_{\partial_s}du_s(e_i),du(e_i)).
$$

$[\partial_s,e_i]=0$ であり、Levi-Civita接続は捩率零なので、写像 $u_s$ に沿う微分について

$$
\nabla_{\partial_s}du_s(e_i)
=\nabla_{e_i}\partial_su_s.
$$

従って

$$
\left.\frac d{ds}E(u_s)\right|_0
=\int_M\sum_i h(\nabla^u_{e_i}V,du(e_i))\,dV_g.
$$

局所標構で $X=\sum_i h(V,du(e_i))e_i$ と置きます。値域接続の計量両立性と始域の接続による積の微分を両方行うと

$$
\begin{aligned}
\operatorname{div}_gX
&=\sum_i e_i h(V,du(e_i))
-h(V,du(\nabla^M_{e_i}e_i))\\
&=\sum_i h(\nabla^u_{e_i}V,du(e_i))
+\sum_i h(V,\nabla^u_{e_i}(du(e_i))-du(\nabla^M_{e_i}e_i))\\
&=\sum_i h(\nabla^u_{e_i}V,du(e_i))+h(V,\tau(u)).
\end{aligned}
$$

[GA1の発散定理](../GA1/index.md#thm-ga1-divergence)を境界なしの $M$ に適用して $\int_M\operatorname{div}X=0$ とすれば第一変分公式を得ます。

$\tau(u)=0$ なら公式から任意の変分に対して第一変分は零です。逆に全変分に対して零とします。任意の点 $p\in M$ を選び、$u(p)$ を含む値域座標近傍 $W\subset N$ と、$u(\overline U)\subset W$ を満たす始域の閉包 $\overline U$ がコンパクトである開近傍 $U$ を取ります。$p$ の近くで正、$U$ の外では零となる滑らかな非負の切断関数 $\chi$ を選びます。

$u$ に沿う $V=\chi\tau(u)$ は $U$ に台を持ちます。値域座標 $y^\alpha$ で

$$
y^\alpha(u_s(x))=y^\alpha(u(x))+sV^\alpha(x)\quad(x\in U),
$$

と定め、$U$ の外では $u_s=u$ とします。$\operatorname{supp}\chi$ はコンパクトであり、その像は座標領域の内部にあるので、十分小さい共通の $|s|$ では右辺が座標領域に収まります。$\chi$ は $U$ の境界付近で零だから、二つの定義は滑らかにつながります。この許容変分の初速度は $V$ です。

停留性と第一変分公式に代入すると

$$
0=-\int_M\chi|\tau(u)|_h^2\,dV_g.
$$

被積分関数は連続かつ非負であり、$\chi(p)>0$ です。よって $\tau(u)(p)=0$。$p$ は任意なので全点で $\tau(u)=0$ となります。
<!-- proof-end -->

エネルギー停留と最小化は同じではありません。第一変分が零という条件だけでは、エネルギーをもう一度微分したときの符号も、大域的な最小性も分かりません。これが非線形変分問題で別の議論を要する最初の箇所です。

## 4. 球面上では「Laplacian + 制約項」になる

抽象的な $\tau$ を手で計算するため、$N=S^{q-1}\subset\mathbb R^q$（$q\ge2$）を標準計量の単位球面とし、$u:M\to S^{q-1}$ を滑らかとします。$\mathbb R^q$ の各成分へ[GA1のLaplace--Beltrami作用素](../GA1/index.md#thm-ga1-green-first)の符号規約 $\Delta_g=\operatorname{div}_g\nabla_g$ を適用します。

外側の $\mathbb R^q$ で計算した $\Delta_g u$ は、球面への接ベクトルとは限りません。単位球面の接空間は

$$
T_{u(x)}S^{q-1}=\{w\in\mathbb R^q:u(x)\cdot w=0\},
\qquad
P_u w=w-(u\cdot w)u
$$

です。ここで後者は任意の $w$ を接空間へ直交射影する式です。実際、$u\cdot P_uw=u\cdot w-(u\cdot w)|u|^2=0$、接ベクトル $w$ には $P_uw=w$ です。

この射影がなぜ張力場の計算に使えるかも導きます。$W$ を $u$ に沿う球面への接ベクトル場とすると、$u\cdot W=0$ を始域方向 $X$ で微分して

$$
u\cdot D_XW=-du(X)\cdot W,\qquad
P_uD_XW=D_XW+(du(X)\cdot W)u
$$

を得ます。後者は外側の微分から法線成分だけを除いたものです。この接方向の微分は球面の誘導計量と両立し、接ベクトル場の捩率も零なので、[Levi-Civita接続の一意性](../../GEO/GEO13/index.md#thm-geo13-levi-civita-existence)により球面の接続と一致します。従って始域の正規直交標構を使えば

$$
\begin{aligned}
\tau(u)
&=\sum_i\bigl(P_uD_{e_i}(du(e_i))-du(\nabla^M_{e_i}e_i)\bigr)\\
&=P_u\sum_i\bigl(D_{e_i}(du(e_i))-du(\nabla^M_{e_i}e_i)\bigr)
=P_u\Delta_g u.
\end{aligned}
$$

始域側の接続補正まで含めた各成分のLaplacianを射影するから、張力場になるのです。

<a id="thm-ga8-sphere-equation"></a>

<!-- formal-statement-start -->
> **定理（球面値調和写像の方程式）**  
> $(M,g)$ を滑らかなRiemann多様体、$u:M\to S^{q-1}\subset\mathbb R^q$ を滑らかな写像とする。各成分に作用する非正符号の $\Delta_g$ を用いると

$$
\tau(u)=\Delta_gu+|du|_g^2u.
$$

> 従って $u$ が調和写像であることと、次の $\mathbb R^q$ 値の方程式が成り立つことは同値である。

$$
\Delta_gu+|du|_g^2u=0,\qquad |u|=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$|u|=1$ を二回微分すれば、$\Delta_g u$ の法線成分が分かります。射影でその成分を取り除くと、張力場の式になります。

<!-- proof-start -->
### 証明

始域の正規直交標構で $u\cdot u=1$ を微分すると

$$
0=e_i(u\cdot u)=2u\cdot du(e_i).
$$

再び微分して始域の接続補正も含めて和を取ると

$$
\begin{aligned}
0=\Delta_g(|u|^2)
&=2\sum_i|du(e_i)|^2+2u\cdot\Delta_gu\\
&=2|du|_g^2+2u\cdot\Delta_gu.
\end{aligned}
$$

従って $u\cdot\Delta_gu=-|du|_g^2$ です。値域の共変微分は射影で表されるので、接方向の跡を取って

$$
\tau(u)=P_u(\Delta_gu)
=\Delta_gu-(u\cdot\Delta_gu)u
=\Delta_gu+|du|_g^2u
$$

となります。右辺は $u$ と直交しており、本当に $T_uS^{q-1}$ の値を取ります。
<!-- proof-end -->

**具体例：平坦トーラスから円への巻き付け。** $M=(\mathbb R/2\pi\mathbb Z)^2$ に計量 $dx^2+dy^2$ を入れ、整数 $k$ に対し $u(x,y)=(\cos kx,\sin kx)\in S^1$ とします。

$$
\partial_xu=k(-\sin kx,\cos kx),\quad
\partial_yu=0,\quad
|du|^2=k^2,\quad
\Delta_gu=-k^2u.
$$

従って $\Delta_gu+|du|^2u=0$。しかも

$$
E(u)=\frac12\int_0^{2\pi}\!\!\int_0^{2\pi}k^2\,dx\,dy
=2\pi^2k^2.
$$

非定数の球面値調和写像を、接空間の制約も方程式も実際に確認できました。$k=0$ の場合だけ定数写像です。

## 5. 弱調和写像には何を要求するか

滑らかな写像でなくてもエネルギーは有限かもしれません。[GA2の多様体Sobolev空間](../GA2/index.md#def-ga2-sobolev)を使って弱微分を持つ $\mathbb R^q$ 値写像を各成分ごとに扱います。ただし関数の弱微分だけでは、値が球面上にあることは保証されません。そこで値域制約をほとんど至る所で別途課します。

<a id="def-ga8-sphere-sobolev"></a>

<!-- formal-statement-start -->
> **定義（球面値Sobolev写像）**  
> $(M,g)$ をコンパクト・境界なしの滑らかなRiemann多様体とする。$q\ge2$ に対し

$$
W^{1,2}(M,S^{q-1})
=\{u\in W^{1,2}(M,\mathbb R^q):
|u(x)|=1\text{ for almost every }x\in M\}
$$

> と定める。ここで右辺のSobolev空間は各成分について定義する。エネルギーは弱微分から得る $E(u)=\frac12\int_M|du|^2\,dV_g$ とする。
<!-- formal-statement-end -->

一般の値域 $N$ についても、$N$ が $\mathbb R^Q$ の滑らかな閉部分多様体として与えられている場合には、同じ考え方で $u(x)\in N$ をほとんど至る所で課せます。ただし異なる埋め込みの比較や一般の弱調和写像の正則性まで、ここで自動的に結論してはいけません。本章の弱形式の証明は球面値の場合に固定します。

<!-- definition-example-start: def-ga8-sphere-sobolev -->
**定義の確認**（連続性を持たない有限エネルギー写像）： $B^3\subset\mathbb R^3$ 上の $u(x)=x/|x|$（$x\ne0$）を原点では任意の単位ベクトルに定めます。$|u|=1$ は至る所（原点を除けば点ごと）で成立し、

$$
Du=\frac1r(I-u\otimes u),\qquad
|Du|^2=\frac2{r^2},\qquad r=|x|.
$$

原点を除く球座標で $\int_{B^3}|Du|^2dx=4\pi\int_0^1 2\,dr=8\pi<\infty$。さらに $|u|=1$ なので $u\in L^2(B^3)$ です。原点の微小球の境界で積分すると、弱微分の境界項は面積 $O(r^2)$ に有界な $u$ を掛けた $O(r^2)$ で消えます。従って表示した導関数が全 $B^3$ 上の弱微分となり、$u\in W^{1,2}(B^3,S^2)$ です。一方で原点では方向によって極限が異なり連続ではありません。これは境界を持つ局所モデルで、直前の閉多様体の定義をそのまま流用したという意味ではありません。
<!-- definition-example-end -->

ここで「弱い意味の調和性」は、球面上を動く変分だけでエネルギーの第一変分が零となることです。任意の滑らかな $\mathbb R^q$ 値試験場 $\varphi$ に対し、規格化

$$
u_s=\frac{u+s\varphi}{|u+s\varphi|}
$$

を使えば、$|u_s|=1$ を保てます。$|u|=1$ と $\varphi$ の有界性から、$|s|\|\varphi\|_\infty<1/2$ なら分母はほとんど至る所で $1/2$ 以上です。

<a id="def-ga8-weak-harmonic"></a>

<!-- formal-statement-start -->
> **定義（球面値弱調和写像）**  
> コンパクト・境界なしの滑らかな $(M,g)$ 上で $u\in W^{1,2}(M,S^{q-1})$ が **弱調和写像** であるとは、任意の滑らかな $\mathbb R^q$ 値試験場 $\varphi$ に対して

$$
\int_M\langle du,d\varphi\rangle\,dV_g
-\int_M|du|^2(u\cdot\varphi)\,dV_g=0
$$

> が成立することをいう。$\langle du,d\varphi\rangle$ は $g$ による始域添字の縮約と $\mathbb R^q$ の内積である。
<!-- formal-statement-end -->

第2積分は $|du|^2\in L^1$、$|u|=1$、$\varphi$ が有界なので有限です。これは $\Delta_g u+|du|^2u=0$ を分布の意味で読むことに相当します。分布のLaplacianは試験場への作用を $-\int\langle du,d\varphi\rangle$ で定めるため、符号も合っています。

**開領域で弱形式を使うとき。** 後で使う Euclid 球 $B^d$ は、上の定義で仮定した閉多様体ではありません。球の内部で方程式を調べる場合は、境界から離れた場所に台を持つ試験場だけを取ります。開集合 $\Omega\subset\mathbb R^d$ について、$u\in W^{1,2}_{\mathrm{loc}}(\Omega,\mathbb R^q)$ がほとんど至る所で $|u|=1$ を満たすなら、確認すべき積分式は

$$
\int_\Omega Du:D\varphi\,dx
-\int_\Omega|Du|^2(u\cdot\varphi)\,dx=0
\qquad(\varphi\in C_c^\infty(\Omega,\mathbb R^q))
$$

です。試験場 $\varphi$ の台は $\Omega$ の内部にコンパクトに含まれるので、この計算には領域の境界値が現れません。$u\in W^{1,2}(B^d,S^{q-1})$ の特異写像を検査するときは、この開領域内の積分式を使います。

<!-- definition-example-start: def-ga8-weak-harmonic -->
**定義の確認**（平坦トーラスから円への巻き付け）：$M=(\mathbb R/2\pi\mathbb Z)^2$ を平坦トーラス、$k\in\mathbb Z$ とし、$u(x,y)=(\cos kx,\sin kx)$ とします。これは滑らかで $|u|=1$ なので、各成分が $W^{1,2}(M)$ に属し、球面値Sobolev写像の条件を満たします。さらに

$$
|du|^2=k^2,\qquad
\partial_x^2u=-k^2u,\qquad
\partial_yu=0.
$$

任意の滑らかな試験場 $\varphi:M\to\mathbb R^2$ に対して、周期境界での部分積分（[Greenの第一公式](../GA1/index.md#thm-ga1-green-first)）により

$$
\begin{aligned}
\int_M\langle du,d\varphi\rangle\,dV_g
&=-\int_M(\Delta_gu)\cdot\varphi\,dV_g\\
&=k^2\int_Mu\cdot\varphi\,dV_g\\
&=\int_M|du|^2(u\cdot\varphi)\,dV_g.
\end{aligned}
$$

従って定義にある全ての試験場で弱方程式が成り立ち、この $u$ は弱調和写像です。滑らかであることだけで弱調和性を判定したのではなく、**定義の積分等式**を実際に確認しています。
<!-- definition-example-end -->


<a id="thm-ga8-weak-variation"></a>

<!-- formal-statement-start -->
> **定理（制約を保つ弱第一変分）**  
> 前定義の $u\in W^{1,2}(M,S^{q-1})$ と任意の滑らかな $\varphi:M\to\mathbb R^q$ に対し、$u_s=(u+s\varphi)/|u+s\varphi|$ は十分小さい $s$ で球面値Sobolev写像であり、

$$
\left.\frac d{ds}E(u_s)\right|_{s=0}
=\int_M\langle du,d\varphi\rangle\,dV_g
-\int_M|du|^2(u\cdot\varphi)\,dV_g.
$$

> 従って弱調和写像であることと、これらすべての球面制約付き変分に対して停留することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

正規化の微分が接空間への射影になることを先に確認し、その空間微分を計算します。$u\cdot du=0$ が余分な項を消します。

<!-- proof-start -->
### 証明

$F(z)=z/|z|$ は $|z|\ge1/2$ 上で滑らかで、$F$ とその導関数は $u+s\varphi$ の取りうる有界な範囲で一様に有界です。Sobolevの連鎖律を各局所座標に適用すると $u_s\in W^{1,2}$ で $|u_s|=1$、かつ

$$
V:=\left.\partial_su_s\right|_0
=(I-u\otimes u)\varphi
=\varphi-(u\cdot\varphi)u.
$$

$|u|^2=1$ の弱微分から $u\cdot du(e_i)=0$ がほとんど至る所で成立します。積の弱微分を計算して

$$
\begin{aligned}
dV(e_i)
&=d\varphi(e_i)
-\bigl(du(e_i)\cdot\varphi+u\cdot d\varphi(e_i)\bigr)u\\
&\quad-(u\cdot\varphi)du(e_i).
\end{aligned}
$$

この式と $du(e_i)$ の内積を取り、$du(e_i)\cdot u=0$ を使えば

$$
\langle du,dV\rangle
=\langle du,d\varphi\rangle-|du|^2(u\cdot\varphi).
$$

正規化写像の導関数が上の範囲で有界なので、$du_s$ の差商は $L^2$ で $dV$ に収束します。従ってエネルギーの差商は内積の $L^1$ 評価（Cauchy--Schwarz）で極限を積分の内側へ移せます。この式を積分して第一変分公式を得ます。
<!-- proof-end -->

**正則性の停止線。** 滑らかな場合の $\tau=0$ と弱形式は、滑らかな写像に制限すると一致します。しかし $W^{1,2}$ と弱方程式だけから、任意の次元で滑らかさは結論できません。上の $B^3$ の写像については、原点以外で

$$
\Delta u=-\frac2{r^2}u,\qquad
|Du|^2u=\frac2{r^2}u
$$

が相殺し、原点の微小球からの境界流束は $O(r)$ で零に近づくため、分布方程式も成立します。実際、$r=\varepsilon$ の法線導関数は $Du$ の $1/r$ 評価により $O(1/\varepsilon)$、面積は $O(\varepsilon^2)$ なので境界積分は $O(\varepsilon)$ です。こうして不連続な弱調和写像が存在します。

## 6. 二次元が臨界になる理由

次元が解析の難しさを変えることを、抽象的な定理ではなくスケール計算で確認します。Euclid球 $B_1\subset\mathbb R^d$ 上の有限エネルギー写像 $v:B_1\to S^{q-1}$ を取り、$0<r<1$ に対して小球 $B_r$ へ縮めた写像 $v_r(x)=v(x/r)$ を考えます。連鎖律と $y=x/r$ の変数変換により

$$
Dv_r(x)=r^{-1}Dv(x/r),\qquad dx=r^d\,dy.
$$

<a id="prop-ga8-energy-scaling"></a>

<!-- formal-statement-start -->
> **命題（Dirichletエネルギーのスケーリング）**  
> $d\ge2$、$v\in W^{1,2}(B_1,S^{q-1})$、$v_r(x)=v(x/r)$（$x\in B_r$）なら

$$
E(v_r;B_r)=r^{d-2}E(v;B_1).
$$

> 特に $d=2$ ではこの拡大縮小でエネルギーは不変であり、$d>2$ では $r\to0$ とともにこの局所エネルギーは零に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

導関数二乗による $r^{-2}$ と体積の $r^d$ が競合し、指数が $d-2$ になります。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
E(v_r;B_r)
&=\frac12\int_{|x|<r}|Dv_r(x)|^2dx\\
&=\frac12\int_{|x|<r}r^{-2}|Dv(x/r)|^2dx\\
&=\frac12r^{d-2}\int_{|y|<1}|Dv(y)|^2dy
=r^{d-2}E(v;B_1).
\end{aligned}
$$

弱Sobolev写像でも局所的な弱連鎖律と線形変数変換で同じ計算が成立します。
<!-- proof-end -->

**失敗例を次元で比較する。** $v(x)=x/|x|$ を $B^d\setminus\{0\}$ で考えると、$Dv=r^{-1}(I-v\otimes v)$ から $|Dv|^2=(d-1)/r^2$。従って原点近くのエネルギーは

$$
E(v;B_\varepsilon)
=\frac{(d-1)|S^{d-1}|}{2}\int_0^\varepsilon r^{d-3}\,dr.
$$

$d=2$ では $\int_0^\varepsilon dr/r$ が発散し、$d\ge3$ では有限です。二次元では「一点へ縮めてもエネルギーが減らない」という臨界性があり、高次元では有限エネルギーの特異写像を排除できません。これは全ての二次元弱調和写像についての正則性定理を、この計算だけで証明したという意味ではありません。

## 7. 調和写像熱流はどこまで言えるか

実数値の熱方程式は線形ですが、多様体値写像にもエネルギーの最急降下方向を選べます。第3節で第一変分が $-\tau$ との内積だと分かったので、形式上の下降方向は $\tau$ です。ここでは **既に滑らかな解が存在し、すべての時刻で値域制約を満たす場合** だけを扱います。

<a id="thm-ga8-heat-dissipation"></a>

<!-- formal-statement-start -->
> **定理（滑らかな調和写像熱流のエネルギー散逸）**  
> $(M,g)$ をコンパクト・境界なしのRiemann多様体、$(N,h)$ を滑らかなRiemann多様体とする。$u:[0,T]\times M\to N$ が滑らかで、各時刻に

$$
\partial_tu=\tau(u)
$$

> を満たすとする。このとき全ての $t\in[0,T]$ で

$$
\frac d{dt}E(u(t))=-\int_M|\tau(u(t))|_h^2\,dV_g\le0.
$$

> さらに $E(u(t))$ がある時間区間で一定なら、その区間では $\tau(u)=0$ かつ $\partial_tu=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

時間 $t$ での写像 $u(t)$ を、第3節の第一変分公式へ入力します。許容変分場は $\partial_tu$ です。

<!-- proof-start -->
### 証明

$t$ を固定し、$s$ の変分 $u_s=u(t+s)$ を考えます。$t$ が内部時刻なら小さい正負の $s$ を取れ、端点では片側微分で同様の等式を得ます。[調和写像の第一変分](#thm-ga8-first-variation)に $V=\partial_tu(t)$ を代入して

$$
\frac d{dt}E(u(t))
=-\int_M h(\partial_tu,\tau(u))\,dV_g
=-\int_M|\tau(u)|_h^2\,dV_g.
$$

右辺は非正です。ある区間でエネルギーが一定なら各時刻で非負の連続関数 $|\tau|^2$ の積分が零となり、全点で $\tau=0$。熱流方程式から $\partial_tu=0$ です。
<!-- proof-end -->

球面値の場合は第4節から

$$
\partial_tu=\Delta_gu+|du|_g^2u,\qquad |u|=1
$$

になります。$\partial_t|u|^2=2u\cdot\partial_tu=2(-|du|^2+|du|^2)=0$ という計算は、**球面値の滑らかな解であるという仮定の下での整合性確認**です。これだけで任意初期値からの大域解の存在、唯一性、有限時間特異性の有無は証明されません。

## 8. 演習

### Level A：定義と接方向を確認する

<a id="ex-ga8-a01"></a>
#### GA8-A01 平坦な値域への写像の張力場
- Level: A

標準平坦トーラス $M=(\mathbb R/2\pi\mathbb Z)^2$ から $\mathbb R^2$ への写像 $u(x,y)=(\sin x,\cos y)$ について、$\tau(u)$ と $E(u)$ を計算せよ。

<!-- solution-start -->
**詳細解答**

始域も値域も接続係数は零です。[張力場の定義](#def-ga8-tension)から

$$
\tau(u)=\partial_x^2u+\partial_y^2u
=(-\sin x,-\cos y).
$$

また $\partial_xu=(\cos x,0)$、$\partial_yu=(0,-\sin y)$ より

$$
|du|^2=\cos^2x+\sin^2y.
$$

積分して

$$
E(u)=\frac12(2\pi\cdot\pi+2\pi\cdot\pi)=2\pi^2.
$$

張力場は零でないので調和ではありません。
<!-- solution-end -->

<a id="ex-ga8-a02"></a>
#### GA8-A02 球面への接射影
- Level: A

$u=(1,0,0)\in S^2$、$w=(2,3,-1)$ とする。$T_uS^2$ と $P_uw$ を定義から求め、射影が接ベクトルを変えないことを示せ。

<!-- solution-start -->
**詳細解答**

$|u|=1$ なので $T_uS^2=\{(0,a,b):a,b\in\mathbb R\}$ です。$u\cdot w=2$ から

$$
P_uw=w-(u\cdot w)u
=(2,3,-1)-2(1,0,0)=(0,3,-1).
$$

$u\cdot P_uw=0$ なので接ベクトルです。任意の $z=(0,a,b)$ について $u\cdot z=0$ だから $P_uz=z-0u=z$。射影の二つの条件を直接確認しました。
<!-- solution-end -->

<a id="ex-ga8-a03"></a>
#### GA8-A03 巻き付け写像の調和性
- Level: A

平坦トーラスから $S^1$ への $u(x,y)=(\cos 2y,\sin 2y)$ が調和であることを確認し、エネルギーを求めよ。

<!-- solution-start -->
**詳細解答**

$\partial_xu=0$、$\partial_yu=2(-\sin2y,\cos2y)$ なので

$$
|du|^2=4,\qquad
\Delta_gu=\partial_y^2u=-4u.
$$

[球面値方程式](#thm-ga8-sphere-equation)へ代入すると $\Delta_gu+|du|^2u=-4u+4u=0$ です。面積は $4\pi^2$ なので

$$
E(u)=\frac12\cdot4\cdot4\pi^2=8\pi^2.
$$
<!-- solution-end -->

<a id="ex-ga8-a04"></a>
#### GA8-A04 次元とスケール
- Level: A

$E(v;B_1)=5$ の球面値Sobolev写像について、$v_r(x)=v(x/r)$ のエネルギーを $d=2,3,4$ でそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**

[エネルギーのスケーリング](#prop-ga8-energy-scaling)で変数変換のJacobianは $r^d$、導関数二乗は $r^{-2}$ です。従って

$$
E(v_r;B_r)=5r^{d-2}
=\begin{cases}
5&(d=2),\\
5r&(d=3),\\
5r^2&(d=4).
\end{cases}
$$

二次元だけ指数が零なので縮小でエネルギーが減りません。
<!-- solution-end -->

### Level B：変分と弱形式を組み合わせる

<a id="ex-ga8-b01"></a>
#### GA8-B01 接続係数の補正を追う
- Level: B

値域 $N$ の局所座標 $y^\alpha$ において、$u:M\to N$ に沿う $V^\alpha(x)$ の共変微分式を記せ。さらに $u=\operatorname{id}:N\to N$ の場合 $\nabla du=0$ となることを始域・値域それぞれのChristoffel係数から示せ。

<!-- solution-start -->
**詳細解答**

[GEO13のテンソル共変微分](../../GEO/GEO13/index.md#def-geo13-tensor-covariant-derivative)で $V$ の値域添字を補正するので

$$
(\nabla_i^uV)^\alpha
=\partial_iV^\alpha+
\Gamma^\alpha_{\beta\gamma}(u)\partial_iu^\beta V^\gamma.
$$

恒等写像で始域と値域に同じ座標・計量を取れば $u^\alpha=x^\alpha$、$\partial_i u^\alpha=\delta^\alpha_i$、$\partial_i\partial_j u^\alpha=0$ です。二階共変微分に代入して

$$
(\nabla du)^\alpha_{ij}
=0-\Gamma^k_{ij}\delta_k^\alpha
+\Gamma^\alpha_{\beta\gamma}\delta_i^\beta\delta_j^\gamma
=-\Gamma^\alpha_{ij}+\Gamma^\alpha_{ij}=0.
$$

従って $\tau=\operatorname{tr}\nabla du=0$ です。
<!-- solution-end -->

<a id="ex-ga8-b02"></a>
#### GA8-B02 制約付き第一変分の微分
- Level: B

$u\in W^{1,2}(M,S^{q-1})$、$\varphi\in C^\infty(M,\mathbb R^q)$ とする。$u_s=(u+s\varphi)/|u+s\varphi|$ の初速度 $V$ を求め、$\langle du,dV\rangle=\langle du,d\varphi\rangle-|du|^2(u\cdot\varphi)$ を示せ。

<!-- solution-start -->
**詳細解答**

規格化写像 $F(z)=z/|z|$ の単位ベクトル $u$ における微分は

$$
DF_u(w)=w-(u\cdot w)u
$$

です。従って $V=DF_u(\varphi)=\varphi-(u\cdot\varphi)u$ です。$|u|^2=1$ の弱微分から $u\cdot du(e_i)=0$。そこで

$$
dV(e_i)=d\varphi(e_i)
-\bigl(du(e_i)\cdot\varphi+u\cdot d\varphi(e_i)\bigr)u
-(u\cdot\varphi)du(e_i).
$$

$du(e_i)$ との内積では $u$ に比例する項が消えます。$i$ を縮約すれば求める等式です。全ての積は $u,\varphi$ が有界で $du\in L^2$ なので定義されています。
<!-- solution-end -->

<a id="ex-ga8-b03"></a>
#### GA8-B03 特異写像の弱調和性
- Level: B

$B^3\subset\mathbb R^3$ 上の $u(x)=x/|x|$ を考える。$x\ne0$ で $\Delta u=-2u/|x|^2$ を計算し、原点を跨いだ分布方程式 $\Delta u+|Du|^2u=0$ が成り立つ理由を境界項の評価まで示せ。

<!-- solution-start -->
**詳細解答**

$r=|x|$ とし、成分 $u^a=x^a/r$ に対して

$$
\partial_i u^a=\frac{\delta_{ia}}r-\frac{x^a x_i}{r^3}.
$$

各成分をもう一度同じ $x^i$ で微分して和を取ります。第一項からは $-x^a/r^3$、第二項からは積の微分により $-x^a/r^3-3x^a/r^3+3x^a/r^3=-x^a/r^3$ が得られます。従って

$$
\Delta u^a
=-\frac{x^a}{r^3}-\frac{x^a}{r^3}
=-\frac{2x^a}{r^3}=-\frac2{r^2}u^a.
$$

一方 $P=I-u\otimes u$ は $P^{\mathsf T}P=P$ を満たし、$\operatorname{tr}P=3-|u|^2=2$ なので、$Du=r^{-1}P$ から $|Du|^2=r^{-2}\operatorname{tr}(P^{\mathsf T}P)=2/r^2$。従って球を除く領域で方程式が成立します。$B^3\setminus B_\varepsilon$ で滑らかなコンパクト台試験場 $\varphi$ に部分積分すると、内境界の項は $\partial_\nu u=O(1/\varepsilon)$、面積 $4\pi\varepsilon^2$ から $O(\varepsilon)$、$u\,\partial_\nu\varphi$ の項は $O(\varepsilon^2)$ です。どちらも零へ行きます。$|Du|^2\in L^1$ なので体積積分も極限へ移れ、分布方程式が全 $B^3$ で成立します。
<!-- solution-end -->

<a id="ex-ga8-b04"></a>
#### GA8-B04 熱流の散逸と定常性
- Level: B

閉多様体 $M$ から球面への滑らかな熱流 $u(t)$ について、$E(u(t_1))-E(u(t_0))$ を積分表示し、ある区間でエネルギー一定なら写像がその区間で時間に依存しないことを示せ。

<!-- solution-start -->
**詳細解答**

[熱流の散逸定理](#thm-ga8-heat-dissipation)を $t_0\le t\le t_1$ で積分すると

$$
E(u(t_1))-E(u(t_0))
=-\int_{t_0}^{t_1}\int_M|\tau(u(t,x))|^2\,dV_g\,dt.
$$

左辺が零なら右辺の非負の被積分関数は連続なので各 $(t,x)$ で零です。熱流方程式から $\partial_tu=\tau(u)=0$。任意の $x$ で時間微分が零だから $u(t,x)$ は時間に関して一定です。結論には滑らかさと閉多様体の無境界性を使っています。
<!-- solution-end -->

### Level C：方程式・エネルギー・特異性を横断する

<a id="ex-ga8-c01"></a>
#### GA8-C01 球面値写像の臨界性と熱流
- Level: C

$B^d\subset\mathbb R^d$（$d\ge2$）で $u(x)=x/|x|$（$x\ne0$）とする。値域は $S^{d-1}$ とする。

1. $|Du|^2$、$\Delta u$ を計算し、原点以外で球面値調和写像方程式を検証せよ。
2. 原点近傍のエネルギー積分が $d=2$ と $d\ge3$ でどう異なるか示せ。
3. $d\ge3$ で分布の弱調和写像となる一方、滑らかでないことを証明せよ。
4. 閉多様体から球面への滑らかな熱流に限ればエネルギーが非増加となる理由を説明し、これが上の弱写像の滑らかさを意味しない理由を述べよ。

<!-- solution-start -->
**詳細解答**

**1.** $r=|x|$、$u=x/r$ とすると

$$
Du=\frac1r(I-u\otimes u).
$$

ここで $P=I-u\otimes u$ は、$|u|=1$ より $P^{\mathsf T}=P$ かつ $P^2=P$ を満たす直交射影です。$Du=r^{-1}P$ のFrobeniusノルム（全成分の二乗和）は

$$
\begin{aligned}
\|P\|_F^2
&=\operatorname{tr}(P^{\mathsf T}P)
=\operatorname{tr}(P)
=\operatorname{tr}(I)-\operatorname{tr}(u\otimes u)\\
&=d-\sum_{a=1}^d(u^a)^2=d-1.
\end{aligned}
$$

これが微分のノルムを射影行列で判定できる理由です。従って

$$
|Du|^2=\frac{d-1}{r^2}.
$$

成分ごとに $\partial_i(x^a/r)=\delta_{ia}/r-x^ax_i/r^3$ をさらに微分します。$r^2=\sum_i x_i^2$ を用い、$i$ について和を取ると

$$
\begin{aligned}
\sum_i\partial_i\left(\frac{\delta_{ia}}r\right)
&=-\frac{x^a}{r^3},\\
\sum_i\partial_i\left(\frac{x^ax_i}{r^3}\right)
&=\frac{x^a}{r^3}+\frac{d x^a}{r^3}
-\frac{3x^a\sum_i x_i^2}{r^5}
=\frac{(d-2)x^a}{r^3}.
\end{aligned}
$$

従って

$$
\Delta u^a
=-\frac{(d-1)x^a}{r^3}
=-\frac{d-1}{r^2}u^a.
$$

よって[球面値調和写像の方程式](#thm-ga8-sphere-equation)の左辺は $\Delta u+|Du|^2u=0$ です。

**2.** $S^{d-1}$ の面積を $\omega_{d-1}$ とすると球座標の体積要素は $r^{d-1}dr\,d\sigma$ です。

$$
E(u;B_\varepsilon)
=\frac{(d-1)\omega_{d-1}}2
\int_0^\varepsilon r^{d-3}\,dr.
$$

$d=2$ は $\int_0^\varepsilon dr/r=\infty$、$d>2$ では $\varepsilon^{d-2}/(d-2)$ を掛けた有限量です。

**3.** $d\ge3$ では前問の積分により $u\in L^2$ かつ $Du\in L^2$ です。原点を除外して試験関数と部分積分すると、内境界の法線微分項と試験関数の法線微分項の大きさはそれぞれ

$$
O(\varepsilon^{d-2}),\qquad O(\varepsilon^{d-1})
$$

となり、ともに零へ近づきます。したがって分布方程式が成立し、[弱第一変分の定理](#thm-ga8-weak-variation)と同じ局所計算により弱調和です。

一方、原点へ $e_1$ 方向から近づくと値は $e_1$ に、$e_2$ 方向から近づくと $e_2$ に近づきます。極限が方向に依存するため、原点にどんな値を定めても連続に延長できません。

**4.** [滑らかな熱流の散逸定理](#thm-ga8-heat-dissipation)は $\partial_tu=\tau(u)$ により $\frac d{dt}E=-\int_M|\tau|^2\le0$ を与えます。これは閉多様体上の滑らかな時間依存解を仮定した結果です。上の $u$ は局所的な特異な弱停留写像であり、滑らかな熱流が存在するという仮定も満たしていません。従って散逸恒等式だけで弱写像の正則性を結論することはできません。
<!-- solution-end -->

## 9. 何が線形理論から変わったか

スカラー値の場合、Dirichletエネルギーの停留条件は線形な方程式 $\Delta_g u=0$ でした。写像値が曲がった空間に入ると、接続の補正項と値域制約の射影が入るため、張力場は $u$ とその導関数に非線形に依存します。球面ではその非線形性が $|du|^2u$ として直接現れました。さらに二次元でエネルギーのスケールが不変になる一方、三次元以上では有限エネルギーの不連続な弱停留写像が実在します。

次のGA9では「値域が多様体である」以外にも、方程式の係数そのものが未知関数や勾配に依存する幾何的非線形楕円PDEへ進みます。
