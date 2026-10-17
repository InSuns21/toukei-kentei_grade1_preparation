# GA3 楕円型方程式・弱解・最大値原理

[GA1のGreenの第一公式](../GA1/index.md#thm-ga1-green-first)によって滑らかなPoisson方程式を積分の等式に直せました。[GA2の多様体Sobolev空間](../GA2/index.md#def-ga2-sobolev)では、微分が弱い意味でしか存在しない関数も扱えます。ところが「弱形式を書ける」だけでは、任意の外力から解が得られるとは限りません。境界のない閉じた空間では定数を足してもLaplacianが変わらず、外力の総和にも制約があります。

本章の主題は、この**定数方向を分離して解を構成すること**、曲がった座標でも解の正則性を回復すること、そして**解が内部で最大になる条件を判別すること**です。以下、断らない限り $(M,g)$ は滑らかで連結・コンパクト・境界なしの実 $d$ 次元Riemann多様体（$d\ge1$）です。計量体積を $dV_g$、$V=\operatorname{Vol}_g(M)>0$ とし、関数は実数値です。[GA1の符号規約](../GA1/index.md#thm-ga1-green-first)に従って $\Delta_g=\operatorname{div}_g\nabla_g$ は非正、すなわち $-\Delta_g$ は非負です。

## 1. 一階微分しか使わずにPoisson方程式を読む

滑らかな解の候補 $u$ が $-\Delta_gu=f$ を満たすなら、境界がないとき[GA1の積分計算](../GA1/index.md#thm-ga1-green-first)から、任意の滑らかな $v$ に対して

$$
\int_M\langle\nabla_gu,\nabla_gv\rangle_g\,dV_g
=\int_Mfv\,dV_g
$$

です。この等式は $u$ が二階微分可能でなくても、$u,v\in H^1(M)$、$f\in L^2(M)$ なら両辺に意味があります。左辺はCauchy--Schwarz不等式で絶対収束し、右辺も $M$ の体積が有限だから絶対収束します。$H^1(M)$ は[GA2のSobolev空間](../GA2/index.md#def-ga2-sobolev)の $k=1,p=2$ の場合です。

<a id="def-ga3-h1-weak-poisson"></a>
<!-- formal-statement-start -->
> **定義（多様体Poisson方程式のH1弱解）**  
> 滑らかなコンパクト境界なしRiemann多様体 $(M,g)$ と $f\in L^2(M)$ を与える。$u\in H^1(M)$ が、すべての $v\in H^1(M)$ に対し

$$
\int_M\langle\nabla_gu,\nabla_gv\rangle_g\,dV_g
=\int_Mfv\,dV_g
$$

> を満たすとき、$-\Delta_gu=f$ の **$H^1$ 弱解** と呼ぶ。平均が零である条件 $\int_Mu\,dV_g=0$ を別に課すときは、平均零弱解と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga3-h1-weak-poisson -->
**定義の確認**：円の正弦関数。 円 $S^1=\mathbb R/(2\pi\mathbb Z)$ に標準計量 $d\theta^2$ を入れ、$u(\theta)=\sin\theta$、$f(\theta)=\sin\theta$ とします。周期性から滑らかな $v$ について

$$
\int_0^{2\pi}u'v'\,d\theta
=\bigl[\cos\theta\,v(\theta)\bigr]_0^{2\pi}
-\int_0^{2\pi}(-\sin\theta)v\,d\theta
=\int_0^{2\pi}fv\,d\theta.
$$

$u,f$ は滑らかで $H^1,L^2$ に属し、[GA2の滑らかな関数の密度](../GA2/index.md#thm-ga2-complete-density)によって任意の $v\in H^1$ へ等式を延長できます。さらに $\int_0^{2\pi}u\,d\theta=0$ です。これで所属、すべての試験関数に対する等式、平均零という定義の条件を確認しました。
<!-- definition-example-end -->

「弱解」は単なる近似解ではありません。指定されたすべての試験関数に対して**正確な等式**を満たすものです。

## 2. 定数方向が引き起こす障害

どの $H^1$ 弱解にも試験関数 $v=1$ を使えます。このとき $\nabla_g1=0$ なので、外力の積分は零でなくてはなりません。滑らかな場合の[GA1の積分適合条件](../GA1/index.md#prop-ga1-compatibility)が、弱解でもそのまま残ります。

<a id="prop-ga3-compatibility"></a>
<!-- formal-statement-start -->
> **命題（Poisson弱解の積分適合条件）**  
> $(M,g)$ を連結・コンパクト・境界なしの滑らかなRiemann多様体、$f\in L^2(M)$ とする。$-\Delta_gu=f$ に $H^1(M)$ 弱解が存在するなら

$$
\int_Mf\,dV_g=0
$$

> である。また $u$ が弱解なら、任意の定数 $c\in\mathbb R$ に対して $u+c$ も弱解である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[弱解の定義](#def-ga3-h1-weak-poisson)で $v=1$ と置けば $\int_Mf\,dV_g=\int_M\langle\nabla_gu,\nabla_g1\rangle_g\,dV_g=0$ です。また弱微分について $\nabla_g(u+c)=\nabla_gu$ なので $u+c$ は同じ等式を満たします。
<!-- proof-end -->

たとえば外力が $f\equiv1$ なら $\int_Mf\,dV_g=V>0$ なので弱解はありません。解けない原因は正則性不足ではなく、**定数試験関数に対する適合条件の破れ**です。

## 3. 平均零の空間なら存在と一意性が戻る

障害を取り除く自然な試行空間は

$$
H^1_\perp(M)=\left\{v\in H^1(M):\int_Mv\,dV_g=0\right\}
$$

です。平均はCauchy--Schwarz不等式で $H^1$ 連続なので、この空間は閉部分空間、したがってHilbert空間です。[GA2の平均零空間の勾配ノルム](../GA2/index.md#prop-ga2-gradient-norm)により

$$
\|v\|_{H^1_g}^2
\le(1+C_P^2)\|\nabla_gv\|_{L^2}^2,\qquad v\in H^1_\perp(M).
$$

これは勾配だけを測る双線形形式が、定数方向を除いた空間では[GPDE6の強圧条件](../../../解析系/GPDE/GPDE6/index.md#def-gpde6-coercive)を満たすことを意味します。

<a id="thm-ga3-poisson-existence"></a>
<!-- formal-statement-start -->
> **定理（コンパクト境界なしPoisson問題の存在一意性）**  
> $(M,g)$ を滑らかで連結・コンパクト・境界なしのRiemann多様体とし、$f\in L^2(M)$ が $\int_Mf\,dV_g=0$ を満たすとする。このとき $-\Delta_gu=f$ には平均零の $H^1$ 弱解がただ一つ存在する。平均を指定しない弱解はその解に定数を足したものに限る。GA2のPoincaré定数を $C_P$ とすれば、平均零解 $u$ は

$$
\|\nabla_gu\|_{L^2}\le C_P\|f\|_{L^2},
\qquad
\|u\|_{L^2}\le C_P^2\|f\|_{L^2}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[GA2のPoincaré不等式](../GA2/index.md#thm-ga2-poincare)で強圧性を得て、[GPDE7のLax--Milgram定理](../../../解析系/GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)に必要な双線形形式の有界性と外力汎関数の連続性を一つずつ確かめます。平均零試験関数について得た等式を、最後に任意の試験関数へ拡張する点が重要です。

<!-- proof-start -->
### 証明

$H=H^1_\perp(M)$ に $H^1_g$ ノルムを入れ、

$$
a(w,v)=\int_M\langle\nabla_gw,\nabla_gv\rangle_g\,dV_g,
\qquad F(v)=\int_Mfv\,dV_g
$$

と置きます。まず[Cauchy--Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|a(w,v)|\le\|\nabla_gw\|_2\|\nabla_gv\|_2
\le\|w\|_{H^1_g}\|v\|_{H^1_g}
$$

なので有界です。[GA2の平均零勾配評価](../GA2/index.md#thm-ga2-poincare)より

$$
a(v,v)=\|\nabla_gv\|_2^2
\ge\frac1{1+C_P^2}\|v\|_{H^1_g}^2
$$

だから強圧性があります。また

$$
|F(v)|\le\|f\|_2\|v\|_2\le\|f\|_2\|v\|_{H^1_g}
$$

により連続線形汎関数です。以上の仮定を $H$ 上の[GPDE7のLax--Milgram定理](../../../解析系/GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)に代入すると、すべての $v\in H$ に対し $a(u,v)=F(v)$ を満たす $u\in H$ がただ一つ存在します。

これがすべての $H^1(M)$ 試験関数に対する弱解であることを確かめます。任意の $v\in H^1(M)$ に対して

$$
v=v_0+\bar v,\qquad
\bar v=\frac1V\int_Mv\,dV_g,\qquad v_0\in H
$$

と分解します。定数成分については $a(u,\bar v)=0$、平均零条件から $F(\bar v)=\bar v\int_Mf\,dV_g=0$ です。ゆえに $a(u,v)=a(u,v_0)=F(v_0)=F(v)$ です。

二つの弱解の差 $w$ に $v=w-\bar w$ を代入すると $\|\nabla_gw\|_2^2=0$ です。[GA2の平均零Poincaré不等式](../GA2/index.md#thm-ga2-poincare)を $w-\bar w$ に用いると $\|w-\bar w\|_2=0$、したがって差は定数です。

最後に方程式に $v=u$ を代入して

$$
\|\nabla_gu\|_2^2=\int_Mfu\,dV_g
\le\|f\|_2\|u\|_2
\le C_P\|f\|_2\|\nabla_gu\|_2
$$

とします。勾配ノルムが零の場合は評価が直ちに成立し、正なら両辺をそれで割って第一の評価を得ます。第二は再び[GA2の平均零勾配評価](../GA2/index.md#thm-ga2-poincare)を用いて得られます。
<!-- proof-end -->

**何が証明できたか。** 外力の平均零は単に必要条件でなく、コンパクト連結境界なしの設定では十分条件でもあります。[平均零空間の勾配ノルム](../GA2/index.md#prop-ga2-gradient-norm)が存在証明の鍵でした。この解構成は次章でLaplacianの固有値を調べる出発点になります。

## 4. 正の反応項は定数核を消す

$f\equiv1$ が解けないなら、方程式に正の零次項 $\lambda u$（$\lambda>0$）を加えたらどうなるでしょうか。定数 $u\equiv1/\lambda$ は $-\Delta_gu+\lambda u=1$ を満たします。今度は定数関数も方程式で検出されます。

<a id="thm-ga3-shifted-poisson"></a>
<!-- formal-statement-start -->
> **定理（正の反応項を持つPoisson問題）**  
> $(M,g)$ を滑らかなコンパクト境界なしRiemann多様体（連結性は不要）とする。任意の $\lambda>0$ と $f\in L^2(M)$ に対し

$$
\int_M\bigl(\langle\nabla_gu,\nabla_gv\rangle_g+\lambda uv\bigr)\,dV_g
=\int_Mfv\,dV_g\quad(v\in H^1(M))
$$

> を満たす $u\in H^1(M)$ がただ一つ存在する。しかも

$$
\|u\|_2\le\lambda^{-1}\|f\|_2,\qquad
\|\nabla_gu\|_2^2+\lambda\|u\|_2^2
\le\lambda^{-1}\|f\|_2^2
$$

> が成立する。$f$ の平均零条件は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

平均零空間に制限せず、$H^1(M)$ 全体で $\lambda\|u\|_2^2$ を加えます。[GPDE7のLax--Milgram定理](../../../解析系/GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)の強圧性は $\min(1,\lambda)$ から直接得られます。

<!-- proof-start -->
### 証明

$a_\lambda(w,v)=\int_M(\langle\nabla_gw,\nabla_gv\rangle_g+\lambda wv)\,dV_g$ とおくと

$$
|a_\lambda(w,v)|
\le(1+\lambda)\|w\|_{H^1_g}\|v\|_{H^1_g},
\qquad
a_\lambda(v,v)\ge\min\{1,\lambda\}\|v\|_{H^1_g}^2.
$$

$F(v)=\int fv$ は上の定理で示したように連続です。[Lax--Milgram定理](../../../解析系/GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)から存在と一意性が従います。$v=u$ を代入すると

$$
\|\nabla_gu\|_2^2+\lambda\|u\|_2^2
=\int_Mfu\,dV_g\le\|f\|_2\|u\|_2.
$$

左辺の非負な第一項を捨てれば $\lambda\|u\|_2^2\le\|f\|_2\|u\|_2$ であり、$u=0$ の場合も含めて $\|u\|_2\le\lambda^{-1}\|f\|_2$ です。これを元の等式の右辺に代入して第二の評価も得ます。
<!-- proof-end -->

**比較。** $\lambda=0$ で強圧性が失われるのは定数方向に限ります。$\lambda>0$ ではこの方向にも正のエネルギーが付くため、外力が定数でも解けます。$\lambda\downarrow0$ のとき得られた上界が発散しうることは、元の方程式の障害を反映しています。

## 5. 座標表示から弱解を滑らかに戻す

存在定理は $H^1$ の元を与えるだけです。滑らかな $f$ から作った弱解を、どの条件で二階、さらに高階微分できるように戻せるでしょうか。

座標写像 $\kappa:U\to\Omega\subset\mathbb R^d$ を固定し、$\tilde u=u\circ\kappa^{-1}$、$\tilde f=f\circ\kappa^{-1}$ と書きます。[GA1のLaplace--Beltramiの座標表示](../GA1/index.md#thm-ga1-green-first)と体積密度 $\rho(x)=\sqrt{\det(g_{ij}(x))}>0$ を使えば、座標での方程式は

$$
-\partial_i\bigl(A^{ij}(x)\partial_j\tilde u\bigr)
=\rho(x)\tilde f(x),\qquad
A^{ij}(x)=\rho(x)g^{ij}(x)
$$

です（添字 $i,j$ を $1,\ldots,d$ で和を取る）。この $A$ は突然選んだ行列ではありません。**計量の逆行列が勾配を、$\rho$ が積分体積を表す**ため、弱形式の係数行列として現れます。

座標像の中のコンパクト集合 $K$ を取ります。$g_{ij}$ は連続で各点で正定値、$\rho>0$ です。$K$ 上の最小・最大固有値の連続性とコンパクト性により、定数 $0<c_K\le C_K<\infty$ があり

$$
c_K|\xi|^2\le A^{ij}(x)\xi_i\xi_j\le C_K|\xi|^2
\quad(x\in K,\ \xi\in\mathbb R^d).
$$

これは[GPDE8の一様楕円性の定義](../../../解析系/GPDE/GPDE8/index.md#def-gpde8-uniform-ellipticity)を**局所的に**満たすという判定です。任意の座標像全体で定数が同じと主張しているわけではありません。

<a id="thm-ga3-local-regularity"></a>
<!-- formal-statement-start -->
> **定理（Poisson方程式の局所正則性）**  
> $(M,g)$ を滑らかな境界のないRiemann多様体、$u\in H^1_{\mathrm{loc}}(M)$ を $-\Delta_gu=f$ の分布弱解とする。$f\in L^2_{\mathrm{loc}}(M)$ なら $u\in H^2_{\mathrm{loc}}(M)$ である。さらに整数 $k\ge0$ について $f\in H^k_{\mathrm{loc}}(M)$ なら $u\in H^{k+2}_{\mathrm{loc}}(M)$ である。特に $f\in C^\infty(M)$ なら $u\in C^\infty(M)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

局所化して $A=\rho(g^{ij})$ の一様楕円性と局所Lipschitz性を確認し、[GPDE9の一般係数内部H2正則性](../../../解析系/GPDE/GPDE9/index.md#thm-gpde9-lipschitz-coefficient-h2)を適用します。その後、係数の微分を右辺へ移しながら同じ評価を繰り返します。境界近傍では局所座標が半球になり、同じ内部定理はそのまま使えません。

<!-- proof-start -->
### 証明

$p\in M$ の周りで、閉包が内側に収まる二つの座標球を選びます。

$
\Omega'\Subset\Omega
$

切断関数で弱形式を局所化すると、座標関数 $\tilde u$ は $\Omega$ 上で発散形方程式を満たします。係数 $A^{ij}$ は滑らかなので、$\overline{\Omega'}$ の近傍で有界かつLipschitz連続です。また第5節で確認した局所一様楕円性も使えます。

右辺は $\rho\tilde f\in L^2_{\mathrm{loc}}$ です。この条件を[GPDE9の一般係数内部H2定理](../../../解析系/GPDE/GPDE9/index.md#thm-gpde9-lipschitz-coefficient-h2)に代入すると

$
\tilde u\in H^2(\Omega')
$

を得ます。

高階の場合は入れ子の座標球をもう一段用意します。$\tilde u\in H^{m+1}_{\mathrm{loc}}$、$\tilde f\in H^m_{\mathrm{loc}}$ を仮定し、$|\alpha|=m$ の弱導関数に差分商近似を使います。滑らかな係数の積の微分則は

$$
-\partial_i\bigl(A^{ij}\partial_jD^\alpha\tilde u\bigr)
=D^\alpha(\rho\tilde f)
+\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
\partial_i\bigl((D^\beta A^{ij})
\partial_jD^{\alpha-\beta}\tilde u\bigr).
$$

ここで和の添字は $0<|\beta|\le m$ です。各係数は滑らかで、右辺の最も高い $\tilde u$ の微分階数は

$
1+|\alpha-\beta|+1=m-|\beta|+2\le m+1
$

です。帰納仮定から右辺は局所 $L^2$ に属します。差分商近似の極限を取って[内部H2定理](../../../解析系/GPDE/GPDE9/index.md#thm-gpde9-lipschitz-coefficient-h2)を $D^\alpha\tilde u$ に適用します。その結果

$
D^\alpha\tilde u\in H^2_{\mathrm{loc}},
\qquad \tilde u\in H^{m+2}_{\mathrm{loc}}
$

です。最初の $m=1$ では、既に得た $H^2$ 正則性を帰納法の出発点にします。

$f$ が滑らかなら任意の $m$ で同様の議論ができます。固定した次元 $d$ に対して $s>r+d/2$ を選べば、[GPDE5の局所Sobolev埋め込み](../../../解析系/GPDE/GPDE5/index.md#cor-gpde5-lipschitz-embedding)により $H^s_{\mathrm{loc}}$ の関数は $C^r$ 代表元を持ちます。$r$ が任意だから滑らかな代表元が得られます。座標変換は滑らかなので、それらは多様体上で一致します。
<!-- proof-end -->

**具体例：計量で係数が変わる。** 二次元の局所座標で $g_{ij}=\operatorname{diag}(1,4)$ とすると、$\rho=2$、$(g^{ij})=\operatorname{diag}(1,1/4)$ だから $A=\operatorname{diag}(2,1/2)$ です。任意の $\xi=(\xi_1,\xi_2)$ に対して

$$
\xi^\mathsf TA\xi=2\xi_1^2+\tfrac12\xi_2^2,
\qquad
\tfrac12|\xi|^2\le\xi^\mathsf TA\xi\le2|\xi|^2.
$$

任意の方向について正の下限を得たので、局所一様楕円性の条件を実際に確認しました。行列式が正という一行だけでは、一般の係数行列についてあらゆる方向の評価を示したことにはなりません。

## 6. 符号を見分ける弱最大値原理

調和関数は内部で極端に大きな山を作れるでしょうか。境界がある場合は、値を境界と比べます。まず**劣調和**とは、$\Delta_gu\ge0$ の向き、つまり $-\Delta_gu\le0$ の向きの関数です。符号を逆にすると結論は最大値ではなく最小値の側になります。

この節では $D$ を滑らかなRiemann多様体内の連結で比較的コンパクトな滑らかな境界を持つ領域とします。$H^1_0(D)$ はコンパクト台の滑らかな関数の $H^1$ 閉包であり、[GPDE4の零トレース条件](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel)と同じ意味を持ちます。境界上の値は、[GA2の多様体トレース](../GA2/index.md#prop-ga2-boundary-trace)を介して解釈します。

<a id="def-ga3-weak-subharmonic"></a>
<!-- formal-statement-start -->
> **定義（多様体上の弱劣調和関数）**  
> $D$ を滑らかなRiemann多様体の開領域とし、$u\in H^1_{\mathrm{loc}}(D)$ が任意の非負 $\varphi\in C_c^\infty(D)$ に対して

$$
\int_D\langle\nabla_gu,\nabla_g\varphi\rangle_g\,dV_g\le0
$$

> を満たすとき、$u$ は $D$ 上で弱劣調和である。$u\in C^2(D)$ なら、この条件は $\Delta_gu\ge0$ と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga3-weak-subharmonic -->
**定義の確認**：区間の二次関数。 $D=(0,1)$、$u(x)=x^2$ とし、任意の非負 $\varphi\in C_c^\infty(D)$ を取ります。部分積分すると

$$
\int_0^1u'(x)\varphi'(x)\,dx
=-\int_0^1u''(x)\varphi(x)\,dx
=-2\int_0^1\varphi(x)\,dx\le0.
$$

$u\in H^1_{\mathrm{loc}}$ で、全非負試験関数に対する必要な不等式を確認したので、弱劣調和です。反対に $-x^2$ は一般にはこの不等式を満たさず、符号の違いが本質的です。
<!-- definition-example-end -->

<a id="thm-ga3-weak-maximum"></a>
<!-- formal-statement-start -->
> **定理（弱最大値原理）**  
> $D$ を連結で比較的コンパクトな滑らかな境界 $\partial D\ne\varnothing$ を持つRiemann多様体の領域とする。$u\in H^1(D)$ が弱劣調和で、境界トレースがほとんど至る所で $u\le K$（定数 $K\in\mathbb R$）なら、$u\le K$ が $D$ 内でほとんど至る所成立する。特に $u\in C^2(D)\cap C^0(\overline D)$ かつ $\Delta_gu\ge0$ の場合、

$$
\max_{\overline D}u=\max_{\partial D}u
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

境界より高い部分 $w=(u-K)_+$ だけを切り出します。零トレースによって $w\in H^1_0(D)$ になり、非負な試験関数として使えます。そこで正である部分の勾配が零だと分かります。

<!-- proof-start -->
### 証明

$w=(u-K)_+=\max(u-K,0)$ と置きます。Lipschitz写像のSobolev合成則から $w\in H^1(D)$、かつ

$$
\nabla_gw=\mathbf1_{\{u>K\}}\nabla_gu
\quad\text{a.e. on }D.
$$

境界トレースが $u\le K$ だから $w$ のトレースは零であり、[零トレースと $H^1_0$ の同一視](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel)を滑らかな境界座標で使って $w\in H^1_0(D)$ です。弱劣調和の不等式は非負なコンパクト台滑らか関数から非負な $H^1_0$ 関数へ、非負性を保つ近似と $H^1$ 連続性で延長できます。したがって $\varphi=w$ を代入して

$$
0\ge\int_D\langle\nabla_gu,\nabla_gw\rangle_g\,dV_g
=\int_{\{u>K\}}|\nabla_gu|_g^2\,dV_g
=\int_D|\nabla_gw|_g^2\,dV_g\ge0.
$$

よって $\nabla_gw=0$ です。$w\in H^1_0(D)$ では[GPDE4のPoincaré不等式](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-poincare)を局所座標と有限貼り合わせで適用でき、$\|w\|_2\le C\|\nabla_gw\|_2=0$ です。従って $u\le K$ です。連続な $u$ では点ごとの不等式となり、$K=\max_{\partial D}u$ を選んで結論を得ます。
<!-- proof-end -->

**符号の反例。** $D=(0,1)$ で $u(x)=x(1-x)/2$ は $-\Delta u=1>0$、端点で零ですが、内部 $x=1/2$ で $u=1/8>0$ です。したがって「$-\Delta u\ge0$ なら最大値が境界にある」は誤りです。失われた仮定は $\Delta u\ge0$ という**符号**で、証明中の $w$ を代入した際の不等号が逆向きになります。

## 7. 強最大値原理：内部の一箇所で等号になったら

弱最大値原理は境界全体との比較でした。さらに調和関数なら、内部の一点が全体の最大値に一致するだけで定数になることを示せます。その核心は、測地球の環状部分に指数関数を使って内側への増加を定量化することです。

<a id="thm-ga3-strong-maximum"></a>
<!-- formal-statement-start -->
> **定理（強最大値原理）**  
> $(N,g)$ を滑らかなRiemann多様体、$D\subset N$ を連結開集合とする。$u\in C^2(D)$ は $\Delta_gu=0$ を満たすと仮定する。ある内部点 $p\in D$ で

$
u(p)=\sup_Du<\infty
$

> となれば、$u$ は $D$ 全体で定数である。内部点で最小値を取る場合も同じ結論が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$v=\sup_Du-u$ は非負の調和関数です。零になる集合が真の部分集合だと仮定し、正の部分から零集合へ接する小さな測地球を取ります。球の環状部分で $\exp(-\alpha r^2)$ 型の具体的な関数を取り、[弱最大値原理](#thm-ga3-weak-maximum)で $v$ の**内向き微分**を正に強制します。しかし零点は内部最小なので勾配が零であり矛盾します。

<!-- proof-start -->
### 証明

$m=\sup_Du$、$v=m-u$ とおきます。$v\ge0$、$\Delta_gv=0$、$v(p)=0$ です。零集合 $Z=\{x\in D:v(x)=0\}$ は空でない閉集合です。$Z\ne D$ と仮定します。$D$ は連結なので $Z$ の境界に属する点 $z_0\in D$ があり、その近くの正の点 $q$ を選べます。$q$ を十分近く選び、$R=\operatorname{dist}_g(q,Z)$ が正で、閉測地球 $\overline B_R(q)$ が $D$ の内部の正規座標球に入るようにします。距離の最小値はこの小さなコンパクト球内で実現されるので、ある $z\in Z$ に対し $\operatorname{dist}_g(q,z)=R$ です。$B_R(q)$ には零点がありません。

[正規球での基点からの距離](../../GEO/GEO14/index.md#cor-geo14-normal-distance)の公式を用いて $r(x)=\operatorname{dist}_g(q,x)$ とすると、正規座標球の内部で $r^2$ は滑らかで、$|\nabla_gr|_g=1$ ($r>0$)、$\Delta_g(r^2)$ は閉球上で有界です。環状領域 $A=\{R/2<r<R\}$ 上で

$$
w(x)=e^{-\alpha r(x)^2}-e^{-\alpha R^2}
$$

とおきます。$A$ の内部では $w>0$、外側の球面では $w=0$ です。また、連鎖律を二回用いて

$$
\Delta_gw
=e^{-\alpha r^2}\bigl(4\alpha^2r^2-\alpha\Delta_g(r^2)\bigr)
$$

です。$r\ge R/2$ と $\Delta_g(r^2)$ の有界性から、$\alpha$ を十分大きくすれば 環状領域の閉包 $\overline A$ 上で $\Delta_gw>0$ です。

$v$ は $B_R(q)$ で正なので、内側の球面 $r=R/2$ で正の最小値を持ちます。$\varepsilon>0$ を十分小さく取り、内側の球面では $v-\varepsilon w\ge0$、外側では $w=0$、$v\ge0$ とします。$\psi=v-\varepsilon w$ は $\Delta_g\psi=-\varepsilon\Delta_gw<0$、すなわち $-\psi$ が劣調和です。[弱最大値原理](#thm-ga3-weak-maximum)を $-\psi$ に適用すると、環状領域の全体で $\psi\ge0$、したがって $v\ge\varepsilon w$ です。

$z$ は外球面上の零点です。$z$ から測地線に沿って球の内部へ距離 $t>0$ 進むと、$v(z)=w(z)=0$ から

$$
\frac{v(\gamma(t))-v(z)}t
\ge\varepsilon\frac{w(\gamma(t))-w(z)}t
\longrightarrow 2\varepsilon\alpha R e^{-\alpha R^2}>0
$$

となります。しかし $v\ge0$ は $z\in D$ で最小値0を取る $C^2$ 関数だから $\nabla_gv(z)=0$、左辺の極限は0です。矛盾したので $Z=D$、従って $u\equiv m$ です。最小値は $-u$ に適用します。
<!-- proof-end -->

コンパクトで境界がないときにはさらに短い証明があります。

<a id="prop-ga3-harmonic-constant"></a>
<!-- formal-statement-start -->
> **命題（境界なし調和関数の定数性）**  
> $(M,g)$ を滑らかで連結・コンパクト・境界なしのRiemann多様体とする。$\Delta_gu=0$ を満たす $H^1$ 弱解 $u$ はほとんど至る所定数である。滑らかな調和関数なら各点で定数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[弱解の定義](#def-ga3-h1-weak-poisson)に $f=0,v=u$ を代入して $\|\nabla_gu\|_2^2=0$ とします。[平均零Poincaré不等式](../GA2/index.md#thm-ga2-poincare)によって $\|u-\bar u\|_2=0$ です。$u$ が連続なら、ほとんど至る所の等式から全点での等式が従います。
<!-- proof-end -->

## 8. 境界条件を変えると適合条件も変わる

境界がある場合、[GA1のGreenの第一公式](../GA1/index.md#thm-ga1-green-first)には外向き単位法線 $\nu$ による項が現れます。$-\Delta_gu=f$ の滑らかな解では

$$
\int_D\langle\nabla_gu,\nabla_gv\rangle_g\,dV_g
=\int_Dfv\,dV_g+\int_{\partial D}v\,\partial_\nu u\,dS_g.
$$

ここで **Dirichlet条件**は境界での $u$ の値、**Neumann条件**は外向き法線微分 $\partial_\nu u$ を与えることです。試験関数の許される範囲が違うため、同じ可解性条件になりません。

<a id="prop-ga3-boundary-comparison"></a>
<!-- formal-statement-start -->
> **命題（DirichletとNeumann問題の比較）**  
> $(D,g)$ を連結でコンパクトな閉包と滑らかな非空境界を持つ滑らかなRiemann多様体の領域とする。$f\in L^2(D)$ とする。
>
> (i) 零Dirichlet問題は $u\in H^1_0(D)$、$\int_D\langle\nabla_gu,\nabla_gv\rangle_g=\int_Dfv$（すべての $v\in H^1_0(D)$）によって定義され、任意の $f$ に対し弱解が一意に存在する。
>
> (ii) $h\in L^2(\partial D)$ を与えたNeumann問題は $u\in H^1(D)$、すべての $v\in H^1(D)$ に対し次の式で定義される。

$$
\int_D\langle\nabla_gu,\nabla_gv\rangle_g\,dV_g
=\int_Dfv\,dV_g+\int_{\partial D}h\,\operatorname{Tr}(v)\,dS_g.
$$

> この問題に解が存在する必要十分条件は

$$
\int_Df\,dV_g+\int_{\partial D}h\,dS_g=0
$$

> であり、解は定数の違いを除いて一意である。
<!-- formal-statement-end -->

### 証明の見取り図

Dirichletでは試験空間 $H^1_0(D)$ が定数を含まず、[GPDE4のPoincaré不等式](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-poincare)で強圧性を得られます。Neumannでは $v=1$ を試せるので適合条件が必要です。境界を持つ多様体でも局所半球座標のRellichを貼り合わせれば平均零Poincaré不等式が成立し、その空間で同様の存在論を使えます。

<!-- proof-start -->
### 証明

(i) 零Dirichletの試行空間を $H^1_0(D)$ とします。滑らかな境界の有限個の局所座標で[GPDE4の $H^1_0$ Poincaré不等式](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-poincare)を比較すれば、$\|v\|_{L^2(D)}\le C_D\|\nabla_gv\|_2$ となります。勾配双線形形式は有界かつ強圧的で、$v\mapsto\int_Dfv$ は連続です。[Lax--Milgram定理](../../../解析系/GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)で一意解が得られます。$v=1$ は $H^1_0(D)$ に属さないため、$\int_Df=0$ は必要ありません。

(ii) $v=1$ をNeumann弱形式に代入すると左辺は0で、必要条件 $\int_Df+\int_{\partial D}h=0$ が得られます。境界のある $D$ の平均零空間 $H^1_\perp(D)$ でも $\|v\|_2\le C\|\nabla_gv\|_2$ が成り立つことを確認します。これが偽なら平均零・$L^2$ ノルム1・勾配が零へ向かう列が取れます。滑らかな境界の有限の内側球・半球座標で[GPDE5の有界領域拡張](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-extension-lipschitz)とRellichの有限枚貼り合わせ（[GA2の多様体Rellich](../GA2/index.md#thm-ga2-rellich)と同じ部分列抽出）を用いると、$L^2(D)$ で強収束する部分列が取れます。極限は勾配零だから連結性で定数、平均零だから0なのにノルム1という矛盾です。

従って平均零空間上で $a(w,v)=\int_D\langle\nabla_gw,\nabla_gv\rangle_g$ は強圧的です。[GA2のトレース定理](../GA2/index.md#prop-ga2-boundary-trace)による連続性から

$$
|F(v)|\le\|f\|_{L^2(D)}\|v\|_{L^2(D)}
+\|h\|_{L^2(\partial D)}\|\operatorname{Tr}(v)\|_{L^2(\partial D)}
\le C\bigl(\|f\|_2+\|h\|_{2,\partial D}\bigr)\|v\|_{H^1(D)}
$$

です。[Lax--Milgram定理](../../../解析系/GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)により平均零の解がただ一つあります。任意の $v\in H^1(D)$ を平均零部分と定数に分解すると、定数部分では適合条件により $F(1)=0$ なので、解はすべての試験関数に対する弱形式を満たします。二解の差にその平均零部分を試せば勾配零、差は定数です。
<!-- proof-end -->

**一次元の確認。** 区間 $D=(0,1)$ で $f\equiv1$ を考えます。零Dirichletなら $u=x(1-x)/2$ で、$u(0)=u(1)=0$、$-u''=1$ です。零Neumannでは $\int_Df=1$ なので解がありません。外向き微分を $h(0)=0,h(1)=-1$ に変更すれば $u=-x^2/2+C$ が解になり、$\partial_\nu u(0)=-u'(0)=0$、$\partial_\nu u(1)=u'(1)=-1$、$\int_Df+h(0)+h(1)=0$ が確かめられます。**境界は0次元測度**で積分は両端点での和です。

## 9. 演習

### Level A

<a id="ex-ga3-a01"></a>
#### GA3-A01 円上の弱解を直接確かめる
- Level: A

標準円 $S^1$ 上で $f(\theta)=3\cos(2\theta)$ とする。平均零弱解を求め、任意の $H^1(S^1)$ 試験関数に対する弱形式を検証せよ。

<!-- solution-start -->
**詳細解答**

$-\frac{d^2}{d\theta^2}\cos(2\theta)=4\cos(2\theta)$ なので

$$
u(\theta)=\frac34\cos(2\theta)
$$

と取れます。$\int_0^{2\pi}u\,d\theta=0$、$u\in H^1(S^1)$ です。滑らかな周期関数 $v$ に対して

$$
\int_0^{2\pi}u'v'\,d\theta
=-\int_0^{2\pi}u''v\,d\theta
=\int_0^{2\pi}3\cos(2\theta)v\,d\theta.
$$

境界項は周期性で消えます。[GA2の密度](../GA2/index.md#thm-ga2-complete-density)から $H^1$ の $v$ にも延長できます。[コンパクト境界なしPoisson問題の存在一意性](#thm-ga3-poisson-existence)によりこれがただ一つの平均零弱解です。
<!-- solution-end -->

<a id="ex-ga3-a02"></a>
#### GA3-A02 定数外力の適合条件
- Level: A

体積 $V>0$ のコンパクト連結境界なし多様体で、$-\Delta_gu=c$ の弱解があるための $c\in\mathbb R$ の条件を示せ。$c=0$ の場合の全解も求めよ。

<!-- solution-start -->
**詳細解答**

定数試験関数 $v=1$ を[弱解の定義](#def-ga3-h1-weak-poisson)に入れると $0=\int_M c\,dV_g=cV$ です。$V>0$ なので $c=0$ が必要です。逆に $c=0$ なら定数関数は弱解です。[境界なし調和関数の定数性](#prop-ga3-harmonic-constant)から、これ以外の弱解はなく、全解は $u\equiv C$（任意の実定数 $C$）です。
<!-- solution-end -->

<a id="ex-ga3-a03"></a>
#### GA3-A03 反応項の定数解
- Level: A

$\lambda>0$、$f\equiv c$ に対する $-\Delta_gu+\lambda u=c$ の解を構成し、その $L^2$ 評価が等号になることを確かめよ。

<!-- solution-start -->
**詳細解答**

$u=c/\lambda$ は定数だから $\nabla_gu=0$、$-\Delta_gu+\lambda u=c$ です。[反応項つき存在一意性](#thm-ga3-shifted-poisson)により唯一解です。$\|u\|_2=|c|\sqrt V/\lambda$、$\|f\|_2=|c|\sqrt V$ なので $\|u\|_2=\lambda^{-1}\|f\|_2$ であり、評価は定数外力に対して鋭いものです。
<!-- solution-end -->

<a id="ex-ga3-a04"></a>
#### GA3-A04 劣調和の符号を判定する
- Level: A

$(0,1)$ 上の $u=x^2$ と $v=x(1-x)/2$ のうち、どちらが弱劣調和か。境界最大値との関係も確認せよ。

<!-- solution-start -->
**詳細解答**

$u''=2>0$ なので、非負 $\varphi\in C_c^\infty(0,1)$ について $\int u'\varphi'=-2\int\varphi\le0$、従って[弱劣調和の定義](#def-ga3-weak-subharmonic)を満たします。$u(0)=0,u(1)=1$ で内部値は1未満だから[弱最大値原理](#thm-ga3-weak-maximum)と一致します。

$v''=-1<0$ で $\int v'\varphi'=\int\varphi>0$（$\varphi\not\equiv0$ なら）なので劣調和ではありません。$v(0)=v(1)=0$ なのに $v(1/2)=1/8$ です。逆向きの符号では最大値原理を適用できないことを数値で確認できました。
<!-- solution-end -->

### Level B

<a id="ex-ga3-b01"></a>
#### GA3-B01 外力差に対する安定性
- Level: B

$\int_Mf_1\,dV_g=\int_Mf_2\,dV_g=0$ とし、それぞれの平均零弱解を $u_1,u_2$ とする。$H^1_g$ ノルムでの差を $\|f_1-f_2\|_2$ によって評価せよ。

<!-- solution-start -->
**詳細解答**

$w=u_1-u_2$、$F=f_1-f_2$ と置きます。線形性から $w$ は平均零で

$$
\int_M\langle\nabla_gw,\nabla_gv\rangle_g\,dV_g=\int_MFv\,dV_g
$$

が任意の $v\in H^1(M)$ について成立します。[Poissonの存在定理に伴うエネルギー評価](#thm-ga3-poisson-existence)を $F$ に適用すると

$$
\|\nabla_gw\|_2\le C_P\|F\|_2,
\qquad\|w\|_2\le C_P^2\|F\|_2.
$$

したがって

$$
\|u_1-u_2\|_{H^1_g}^2
=\|w\|_2^2+\|\nabla_gw\|_2^2
\le(C_P^4+C_P^2)\|f_1-f_2\|_2^2.
$$

平方根を取れば求める評価です。この証明では二解の平均零という条件を引き継ぐことが重要です。
<!-- solution-end -->

<a id="ex-ga3-b02"></a>
#### GA3-B02 計量から楕円性を検査する
- Level: B

二次元の座標で $g_{ij}=\operatorname{diag}(a^2,b^2)$（$a,b>0$ は定数）とする。発散形の係数 $A^{ij}=\sqrt{\det g}\,g^{ij}$ を求め、一様楕円性を最小・最大固有値を用いて証明せよ。

<!-- solution-start -->
**詳細解答**

計量の逆行列は $(g^{ij})=\operatorname{diag}(a^{-2},b^{-2})$、体積密度は $\rho=\sqrt{a^2b^2}=ab$ です。従って

$$
A=\operatorname{diag}\left(\frac ba,\frac ab\right).
$$

これは座標方向の各二次形式の係数であり、任意の $\xi\in\mathbb R^2$ について

$$
\xi^\mathsf TA\xi=\frac ba\xi_1^2+\frac ab\xi_2^2.
$$

$\mu=\min\{b/a,a/b\}>0$、$L=\max\{b/a,a/b\}$ と置けば

$$
\mu(\xi_1^2+\xi_2^2)\le\xi^\mathsf TA\xi\le L(\xi_1^2+\xi_2^2).
$$

よって[GPDE8の一様楕円性](../../../解析系/GPDE/GPDE8/index.md#def-gpde8-uniform-ellipticity)の全方向条件を満たします。$a,b$ を位置の関数に変えるなら、調べるコンパクト集合上で $a,b$ が正の上下界を持つことを追加で確認する必要があります。
<!-- solution-end -->

<a id="ex-ga3-b03"></a>
#### GA3-B03 Neumannの法線と適合条件
- Level: B

区間 $(0,L)$、$L>0$ で $-u''=q$（$q$ は定数）、外向き法線微分が $h(0)=\alpha$、$h(L)=\beta$ である。解が存在する条件を求め、そのとき全解を表示せよ。

<!-- solution-start -->
**詳細解答**

まず $u''=-q$ を二回積分すると

$$
u'(x)=-qx+C_1,\qquad
u(x)=-\frac q2x^2+C_1x+C_2
$$

です。区間の左端の外向き法線は $-1$、右端は $+1$ なので $-u'(0)=\alpha$ から $C_1=-\alpha$、$u'(L)=\beta$ から $-qL-\alpha=\beta$ が必要です。したがって

$$
qL+\alpha+\beta=0.
$$

この条件は[境界問題の適合条件](#prop-ga3-boundary-comparison)で $\int_0^L q\,dx+h(0)+h(L)=0$ とする結果に一致します。条件が成り立てば全解は

$$
u(x)=-\frac q2x^2-\alpha x+C_2,\qquad C_2\in\mathbb R
$$

です。境界の向きを取り違えると適合条件の符号も誤ります。
<!-- solution-end -->

### Level C

<a id="ex-ga3-c01"></a>
#### GA3-C01 平均零Poisson・正則性・最大値の統合
- Level: C

$(M,g)$ を滑らかで連結・コンパクト・境界なしのRiemann多様体とし、$f\in C^\infty(M)$ とする。次の問いに答えよ。

1. $-\Delta_gu=f$ に平均零の滑らかな解が存在する条件を必要十分で証明せよ。
2. その解について $\|u\|_{H^1_g}$ の外力評価を導け。
3. $f\ge0$ なら $f\equiv0$ と $u\equiv0$ が必ず成り立つことを示せ。
4. なぜ同じ結論を零Dirichlet境界条件の領域に持ち込めないか、具体例を示せ。

<!-- solution-start -->
**詳細解答**

(1) [積分適合条件](#prop-ga3-compatibility)より $\int_Mf=0$ は必要です。逆に平均零なら[コンパクト境界なしPoisson問題の存在一意性](#thm-ga3-poisson-existence)が唯一の平均零 $H^1$ 弱解を与えます。計量は滑らか、$f$ も滑らか、境界はないので[局所正則性定理](#thm-ga3-local-regularity)を全点の有限座標近傍で適用して $u\in C^\infty(M)$ と分かります。従って弱形式に限らず古典的な $-\Delta_gu=f$ が成立します。これで必要十分性が示されました。

(2) 平均零解に対して $v=u$ を代入し、[GA2の平均零勾配評価](../GA2/index.md#thm-ga2-poincare)を用いると

$$
\|\nabla_gu\|_2^2
=\int_Mfu\,dV_g
\le\|f\|_2\|u\|_2
\le C_P\|f\|_2\|\nabla_gu\|_2.
$$

ゆえに $\|\nabla_gu\|_2\le C_P\|f\|_2$、再び $\|u\|_2\le C_P^2\|f\|_2$ です。二乗して加えると

$$
\|u\|_{H^1_g}\le C_P\sqrt{1+C_P^2}\,\|f\|_2.
$$

(3) $f$ が連続かつ非負で $\int_Mf=0$ なら、ある点で $f>0$ だとその近傍で正、体積も正なので積分が正になり矛盾します。従って $f\equiv0$ です。[調和関数の定数性](#prop-ga3-harmonic-constant)から $u$ は定数であり、平均零より $u\equiv0$ です。この結論は「非負な外力なら解が存在しない」という適合条件と、一意性を組み合わせたものです。

(4) 区間 $(0,1)$ は境界を持ち、$f=1\ge0$ に対する零Dirichlet解 $u=x(1-x)/2$ は非零です。実際 $-u''=1$、$u(0)=u(1)=0$ です。[境界問題の比較](#prop-ga3-boundary-comparison)で示したように、Dirichlet試験関数には定数 $1$ を使えないため、境界なしの場合の $\int_Mf=0$ という推論自体が成立しません。
<!-- solution-end -->

## 10. ここからスペクトル理論へ

平均零の外力には平均零のPoisson弱解がただ一つ対応し、正の反応項を足せば平均零制約も要らなくなりました。次のGA4では、この解作用素を $L^2$ 上で捉え直し、[GA2のRellichコンパクト性](../GA2/index.md#thm-ga2-rellich)によって離散的な固有値と固有関数が現れる仕組みを調べます。