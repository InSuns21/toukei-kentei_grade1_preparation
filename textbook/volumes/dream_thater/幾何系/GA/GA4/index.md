# GA4 Laplace作用素のスペクトル理論

[GA3の平均零Poisson問題](../GA3/index.md#thm-ga3-poisson-existence)では、外力の平均が零なら解が存在し、その解は定数の違いまで一意でした。しかし、異なる外力に対して解がどの方向に大きく応答するのか、あるいは熱がどの速さで均一になるのかは、存在定理だけでは読み取れません。有限次元の対称行列を固有ベクトルに分解するように、**多様体上のLaplacianを固有関数に分解**したいところです。

難点は、$L=-\Delta_g$ が $L^2$ のすべての関数に作用する有界作用素ではないことです。そこで[GA3の反応項つき方程式](../GA3/index.md#thm-ga3-shifted-poisson)を先に解き、有界な逆作用素を構成します。その逆作用素を[FA7のコンパクト自己共役作用素のスペクトル定理](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)へつなぐのが本章の道筋です。

以下、$(M,g)$ は滑らか・連結・コンパクト・境界なしの $d\ge1$ 次元Riemann多様体、$V=\operatorname{Vol}_g(M)>0$ です。実数値関数のHilbert空間 $H=L^2(M,dV_g)$ に内積 $(u,v)_2=\int_Muv\,dV_g$ を入れ、$H^1(M)$ には[GA2の内在的ノルム](../GA2/index.md#prop-ga2-intrinsic-h1)を用います。

符号は [GA1のGreenの第一公式](../GA1/index.md#thm-ga1-green-first)に従い、$\Delta_g=\operatorname{div}_g\nabla_g\le0$、$L=-\Delta_g\ge0$ です。複素関数の場合は内積に複素共役を入れれば同じ議論になります。

## 1. 二階微分を必要とする作用素を、弱解から定義する

$u\in L^2$ に $-\Delta_g u$ を無条件に作用させてはいけません。$u$ の二階弱微分が存在するとは限らないからです。代わりに、任意の $f\in L^2$ に対し

$$
\int_M\{\langle\nabla_gu,\nabla_gv\rangle_g+uv\}\,dV_g
=\int_Mfv\,dV_g\qquad(v\in H^1(M))
$$

を満たす $u\in H^1(M)$ を取ります。[GA3の存在一意性定理](../GA3/index.md#thm-ga3-shifted-poisson)の $\lambda=1$ への適用により、$u$ はただ一つあります。外力 $f$ から解 $u$ を返す写像を $R$ とすれば、有界作用素を出発点にできます。

<a id="def-ga4-l2-realization"></a>
<!-- formal-statement-start -->
> **定義（LaplacianのL2実現とレゾルベント）**  
> $(M,g)$ を滑らかなコンパクト境界なしRiemann多様体とする。
> 各 $f\in L^2(M)$ に対して、方程式
>
$
(-\Delta_g+I)u=f
$
>
> の $H^1$ 弱解 $u$ を対応させる線形写像を $R$ とする。
>
$
R:L^2(M)\longrightarrow L^2(M),\qquad Rf=u.
$
>
> $R$ は次節で証明するように有界かつ単射である。その像上の逆写像を用いて次のように定める。
>
$
D(L)=\operatorname{Ran}R,\qquad Lu=R^{-1}u-u\quad(u\in D(L)).
$
>
> これを $-\Delta_g$ の $L^2$ 実現と呼び、そのレゾルベントを
>
$
R=(L+I)^{-1}
$
>
> と書く。$D(L)$ は $L$ に作用させてよい関数の集合（作用素領域）である。
<!-- formal-statement-end -->

定義式に逆写像が現れますが、全空間で $R^{-1}$ を定義したわけではありません。その定義域は $\operatorname{Ran}R$ に限定されます。単射性は次節で証明します。また、滑らかな $u$ では[Greenの第一公式](../GA1/index.md#thm-ga1-green-first)により $R(-\Delta_g u+u)=u$ となるので、$Lu=-\Delta_gu$ が回復します。

<!-- definition-example-start: def-ga4-l2-realization -->
**定義の確認**：円の余弦関数。 標準円 $S^1=\mathbb R/(2\pi\mathbb Z)$ では $\Delta_g=d^2/d\theta^2$ です。$f(\theta)=\cos\theta$、$u(\theta)=\tfrac12\cos\theta$ とすると、

$$
-u''+u=\tfrac12\cos\theta+\tfrac12\cos\theta=f.
$$

$u$ は滑らかで $H^1$ に属し、周期境界項は相殺されるので任意の滑らかな $v$ に対して弱形式が成り立ちます。

[GA2の滑らかな関数の密度](../GA2/index.md#thm-ga2-complete-density)からすべての $H^1$ 試験関数にも拡張でき、[反応Poisson解の一意性](../GA3/index.md#thm-ga3-shifted-poisson)から $Rf=\frac12f$ です。$f\in\operatorname{Ran}R$ であることも $R(2f)=f$ から分かり、$Lf=R^{-1}f-f=2f-f=f=-f''$ と直接確かめられます。
<!-- definition-example-end -->

## 2. レゾルベントに残る対称性

ここで言う有界作用素の**自己共役性**とは $(Rf,h)_2=(f,Rh)_2$ がすべての $f,h\in L^2$ について成り立つことです。これは[FA7の自己共役有界作用素の定義](../../../解析系/FA/FA7/index.md#def-fa7-self-adjoint)に対応します。**正値性**は $(Rf,f)_2\ge0$、**単射性**は $Rf=0$ なら $f=0$ です。三つを混同せず、弱形式で確かめます。

<a id="thm-ga4-resolvent-properties"></a>
<!-- formal-statement-start -->
> **定理（レゾルベントの有界自己共役性と正値性）**  
> 滑らかなコンパクト境界なしRiemann多様体 $(M,g)$ において、上で定義した $R=(-\Delta_g+I)^{-1}:L^2(M)\to L^2(M)$ は有界線形で $\|R\|_{2\to2}\le1$、自己共役、正値かつ単射である。さらに
>
> $$
> \|Rf\|_{H^1_g}\le\|f\|_2,\qquad (Rf,f)_2=\|Rf\|_{H^1_g}^2.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

反応Poisson方程式を $v=u$ で試すと $H^1$ エネルギーが得られます。二つの弱解を互いの試験関数にすると、左辺の対称性から自己共役性が現れます。

<!-- proof-start -->
### 証明

$u=Rf$ と置き、弱形式で $v=u$ とすると

$$
\|u\|_{H^1_g}^2
=\|\nabla_gu\|_2^2+\|u\|_2^2
=(f,u)_2
\le\|f\|_2\|u\|_2
\le\|f\|_2\|u\|_{H^1_g}.
$$

$u=0$ なら評価は成立し、$u\ne0$ なら最後の式を $\|u\|_{H^1_g}$ で割って $\|Rf\|_{H^1_g}\le\|f\|_2$ を得ます。$\|Rf\|_2\le\|Rf\|_{H^1_g}$ なので $L^2$ 上の有界性が従います。存在一意性と弱形式の線形性から $R$ 自身も線形です。

$f,h\in L^2$、$u=Rf$、$w=Rh$ に対し、まず $u$ の弱形式で $v=w$、次に $w$ の弱形式で $v=u$ とすると

$$
(f,Rh)_2
=\int_M(\langle\nabla_gu,\nabla_gw\rangle_g+uw)\,dV_g
=(Rf,h)_2.
$$

よって自己共役です。また直前に示した $v=u$ での弱形式の等式から $(Rf,f)_2=\|Rf\|_{H^1_g}^2\ge0$ で正値です。$Rf=0$ なら任意の $v\in H^1$ に対して $(f,v)_2=0$ です。[GA2の密度](../GA2/index.md#thm-ga2-complete-density)により $H^1(M)$ は $L^2(M)$ で稠密だから $f=0$ で、単射性も示されました。
<!-- proof-end -->

$R1=1$ です。実際 $-\Delta_g1+1=1$ で一意性が成り立ちます。したがって $\|R\|=1$ で、上のノルム評価は等号を実現します。一方 $R^{-1}$ は無限次元で一般に有界ではなく、**$L$ と $R$ は別の作用素**です。

## 3. コンパクト性が固有関数を生み出す

有界な外力列 $(f_n)$ を与えたとき、解 $u_n=Rf_n$ は $H^1$ で有界です。[GA2の多様体Rellichの定理](../GA2/index.md#thm-ga2-rellich)は、コンパクト多様体上でその列が $L^2$ 収束部分列を持つことを保証します。この「有界列の像に収束部分列がある」という性質が[FA6のコンパクト作用素の特徴付け](../../../解析系/FA/FA6/index.md#thm-fa6-unit-ball-characterization)です。$FA6$ は $FA7$ の既習部分です。

<a id="thm-ga4-compact-resolvent"></a>
<!-- formal-statement-start -->
> **定理（コンパクトなレゾルベント）**  
> $(M,g)$ を滑らかなコンパクト境界なしRiemann多様体とする。このとき $R=(L+I)^{-1}:L^2(M)\to L^2(M)$ はコンパクト自己共役作用素である。
<!-- formal-statement-end -->

### 証明の見取り図

有界な $L^2$ 外力列を、反応Poissonのエネルギー評価で有界な $H^1$ 解列へ移し、そこへRellichを適用します。

<!-- proof-start -->
### 証明

任意の $L^2$ 有界列 $(f_n)$ を取り、$\sup_n\|f_n\|_2=C<\infty$ とします。[レゾルベント評価](#thm-ga4-resolvent-properties)より

$$
\|Rf_n\|_{H^1_g}\le\|f_n\|_2\le C.
$$

[コンパクト多様体のRellichの定理](../GA2/index.md#thm-ga2-rellich)を有界な $H^1$ 列 $(Rf_n)$ に適用すると、ある部分列 $(Rf_{n_k})$ が $L^2$ で強収束します。この部分列条件が $R:L^2\to L^2$ のコンパクト性です。自己共役性は[前定理](#thm-ga4-resolvent-properties)で証明済みです。
<!-- proof-end -->

**重要な仮定。** $M$ のコンパクト性が失われるとRellichの大域版は使えません。領域が非コンパクトだから必ず離散スペクトルでなくなるという主張ではなく、ここでの証明機構が失われる、という区別が必要です。

## 4. 固有関数が $L^2$ 全体を尽くす

$R$ はコンパクト・自己共役・正値で単射です。したがって[FA7のコンパクト自己共役スペクトル定理](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)の仮定をすべて満たし、$L^2$ に正規直交固有関数基底を持ちます。もし $R\phi=\mu\phi$、$\mu>0$ なら $\phi=R(\mu^{-1}\phi)$ なので $\phi\in D(L)$ であり

$$
L\phi=(\mu^{-1}-1)\phi.
$$

これが「有界な逆作用素の固有値」から「非有界Laplacianの固有値」への橋渡しです。

<a id="thm-ga4-spectral-basis"></a>
<!-- formal-statement-start -->
> **定理（Laplacianの固有関数展開と自己共役性）**  
> $(M,g)$ を滑らか・連結・コンパクト・境界なしの $d\ge1$ 次元Riemann多様体とする。$L$ を[定義](#def-ga4-l2-realization)の $L^2$ 実現とする。このとき実数値の滑らかな関数からなる $L^2$ 正規直交基底 $(\phi_j)_{j\ge0}$ と、重複度込みの固有値列
>
> $$
> 0=\lambda_0<\lambda_1\le\lambda_2\le\cdots,\qquad
> \lambda_j\longrightarrow+\infty
> $$
>
> が存在し、$L\phi_j=\lambda_j\phi_j$、$\phi_0=V^{-1/2}$ である。各固有値の重複度は有限で、$\lambda=0$ の固有空間は定数関数全体である。任意の $f\in L^2(M)$ は
>
> $$
> f=\sum_{j=0}^\infty (f,\phi_j)_2\phi_j
> \quad\text{in }L^2,\qquad
> \|f\|_2^2=\sum_{j=0}^\infty |(f,\phi_j)_2|^2
> $$
>
> を満たす。さらに
>
> $$
> D(L)=\left\{u=\sum_jc_j\phi_j:
> \sum_j\lambda_j^2|c_j|^2<\infty\right\},\quad
> Lu=\sum_j\lambda_jc_j\phi_j.
> $$
>
> この領域上で $L$ は非負自己共役作用素であり、$R=(L+I)^{-1}$ はコンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

[FA7で証明したコンパクト自己共役作用素の直交展開結果](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)で $R$ を直交対角化し、$\lambda=\mu^{-1}-1$ に読み替えます。定数関数が $\lambda_0=0$ を担い、その単純性は[GA3の調和関数の定数性](../GA3/index.md#prop-ga3-harmonic-constant)で決まります。最後に、対角表示から $L$ に許される関数の**作用素領域**まで確定します。

<!-- proof-start -->
### 証明

[前定理](#thm-ga4-compact-resolvent)と[FA7で証明したコンパクト自己共役作用素の直交展開結果](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)により、$R$ の非零固有値 $\mu_j>0$ の正規直交固有関数を取れます。

$R$ は単射なので $\ker R=\{0\}$、したがって非零固有関数だけで $L^2$ の基底が得られます。$0<\mu_j\le1$、各非零固有値の重複度は有限で、非零固有値の集積点は $0$ に限ります。$L^2(M)$ は無限次元（正体積の互いに素な小開集合上の関数を任意個取れる）だから固有関数は無限個で、$\mu_j\to0$ となるよう順序づけられます。

$\lambda_j=\mu_j^{-1}-1\ge0$ とします。$R\phi_j=\mu_j\phi_j$ の両辺に $R^{-1}$ を $\operatorname{Ran}R$ 上で作用させると

$$
R^{-1}\phi_j=\mu_j^{-1}\phi_j,\qquad
L\phi_j=(R^{-1}-I)\phi_j=\lambda_j\phi_j.
$$

$R1=1$ だから定数関数は $\mu=1$ の固有ベクトルです。逆に $R\phi=\phi$ なら弱形式で $f=\phi$、$u=\phi$ として $\|\nabla_g\phi\|_2^2=0$ を得ます。[GA2の平均零Poincaré不等式](../GA2/index.md#thm-ga2-poincare)と連結性から $\phi$ は定数です。よって $\phi_0=V^{-1/2}$、$\lambda_0=0$ は単純で $\lambda_1>0$ です。

各 $\phi_j$ は $-\Delta_g\phi_j=\lambda_j\phi_j$ の弱解です。$L^2$ 右辺についての[GA3の局所正則性](../GA3/index.md#thm-ga3-local-regularity)でまず $H^2_{\mathrm{loc}}$ に上がります。$H^k_{\mathrm{loc}}$ なら右辺も $H^k_{\mathrm{loc}}$ なので $H^{k+2}_{\mathrm{loc}}$ へ上げる操作を反復し、$\phi_j\in C^\infty(M)$ となります。

基底性から $f=\sum_j(f,\phi_j)_2\phi_j$ が $L^2$ 収束し、Parseval等式も成立します。また $R$ はこの基底上で $Rf=\sum_j\mu_j(f,\phi_j)_2\phi_j$ なので、その像は係数 $c_j$ が $\sum_j|c_j/\mu_j|^2<\infty$ を満たす関数全体です。$\mu_j^{-1}=1+\lambda_j$ より

$$
\sum_j(1+\lambda_j)^2|c_j|^2<\infty
\quad\Longleftrightarrow\quad
\sum_j\lambda_j^2|c_j|^2<\infty,
$$

なぜなら $\lambda_j\ge0$ で $1+\lambda_j^2\le(1+\lambda_j)^2\le2(1+\lambda_j^2)$ かつ $\sum|c_j|^2<\infty$ だからです。従って記した $D(L)$ と $Lu$ の式が得られます。この対角表示は対称性 $(Lu,v)_2=(u,Lv)_2$ だけでなく、随伴領域の一致も示します。実際 $v=\sum b_j\phi_j$ が $L^*$ の領域に入る条件は、$u=\phi_j$ を試して得る係数列 $(\lambda_jb_j)$ が $\ell^2$ に属することであり、これはちょうど $v\in D(L)$ です。$\sum\lambda_j|c_j|^2\ge0$ なので非負性も従います。
<!-- proof-end -->

$0$ が $R$ のスペクトルに入っても、単射である以上 $R$ の固有値ではありません。一方 $L$ の $0$ は正規化定数関数を持つ固有値です。**$R$ と $L$ の「零」を取り違えない**ようにしましょう。

## 5. Rayleigh商と最小最大原理

行列の固有値は長さ1のベクトルで二次形式を評価して見つけられます。多様体でも、$H^1$ の弱微分だけで計算できる[GA1のDirichletエネルギー](../GA1/index.md#def-ga1-dirichlet-energy)から同じ判定が可能です。$u\in H^1$ のとき、$Lu$ が $L^2$ 関数として定義できなくても勾配の積分には意味があります。

<a id="def-ga4-rayleigh"></a>
<!-- formal-statement-start -->
> **定義（多様体LaplacianのRayleigh商）**  
> $(M,g)$ を滑らかなコンパクト境界なしRiemann多様体とする。零でない $u\in H^1(M)$ に対し
>
> $$
> Q(u)=\int_M|\nabla_gu|_g^2\,dV_g,\qquad
> \mathcal R(u)=\frac{Q(u)}{\int_M|u|^2\,dV_g}
> $$
>
> と定め、$\mathcal R(u)$ を $-\Delta_g$ の **Rayleigh商** と呼ぶ。$u\in D(L)$ なら[Greenの第一公式](../GA1/index.md#thm-ga1-green-first)の弱形式によって $Q(u)=(Lu,u)_2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga4-rayleigh -->
**定義の確認**：円の二つの周波数。 $u(\theta)=a\cos\theta+b\sin(2\theta)$（$a,b\in\mathbb R$、$(a,b)\ne(0,0)$）を選びます。滑らかな周期関数なので $H^1(S^1)$ に属し、$\int_0^{2\pi}\cos\theta\sin(2\theta)\,d\theta=0$、$\int_0^{2\pi}\sin\theta\cos(2\theta)\,d\theta=0$ です。従って

$$
\|u\|_2^2=\pi(a^2+b^2)>0,\qquad
Q(u)=\int_0^{2\pi}(-a\sin\theta+2b\cos2\theta)^2\,d\theta
=\pi(a^2+4b^2),
$$

$$
\mathcal R(u)=\frac{a^2+4b^2}{a^2+b^2}.
$$

定義域への所属、分母の非零性、勾配エネルギーの全条件を確認しました。$b=0$ のとき1、$a=0$ のとき4となり、固有振動数による違いが表れます。
<!-- definition-example-end -->

この商をすべての $H^1$ 関数で最小化してよいか考えるには、$H^1$ と固有関数の展開をまずつながなければなりません。$L^2$ での基底性だけから**エネルギー級数の等号を無条件に推論することはできません**。

<a id="lem-ga4-form-domain"></a>
<!-- formal-statement-start -->
> **補題（H1の固有関数展開とエネルギー恒等式）**  
> 上記定理の固有関数 $(\phi_j)$ と固有値 $(\lambda_j)$ について、$u\in H^1(M)$ と $c_j=(u,\phi_j)_2$ を与えると
>
> $$
> \|u\|_{H^1_g}^2=\sum_{j=0}^\infty(1+\lambda_j)|c_j|^2,\qquad
> Q(u)=\sum_{j=0}^\infty\lambda_j|c_j|^2.
> $$
>
> また部分和 $\sum_{j=0}^Nc_j\phi_j$ は $H^1$ でも $u$ に収束する。
<!-- formal-statement-end -->

### 証明の見取り図

固有関数の有限線形結合が $H^1$ で稠密だと証明してから、$H^1$ 内積での直交性を使います。密度の核心は、$R$ の弱形式と $L^2$ 基底性を結ぶことです。

<!-- proof-start -->
### 証明

$H^1$ 上の内積を $a_1(u,v)=\int_M(\langle\nabla_gu,\nabla_gv\rangle_g+uv)\,dV_g$ とします。固有関数の弱形式から

$$
a_1(\phi_i,\phi_j)=(1+\lambda_i)(\phi_i,\phi_j)_2
=(1+\lambda_i)\delta_{ij}.
$$

固有関数の有限線形結合全体を $E$ とします。$w\in H^1$ が $a_1(w,\phi_j)=0$ を全 $j$ で満たしたとしましょう。任意の $f\in L^2$ に対して $f_N=\sum_{j=0}^N(f,\phi_j)_2\phi_j\to f$ と置くと、$Rf_N\in E$ です。[レゾルベント評価](#thm-ga4-resolvent-properties)で

$$
\|Rf_N-Rf\|_{H^1_g}\le\|f_N-f\|_2\longrightarrow0.
$$

ゆえに $a_1(w,Rf)=\lim_Na_1(w,Rf_N)=0$。$Rf$ の弱形式で試験関数 $w$ を用いると $a_1(w,Rf)=(w,f)_2$ です。任意の $f\in L^2$ に対して $(w,f)_2=0$ だから $w=0$ です。$H^1$ はHilbert空間であり、$E$ の $a_1$ 直交補が零なので $E$ は $H^1$ で稠密です。

各 $u\in H^1$ を $E$ の部分和で近似すると、$a_1$ 直交基底 $\phi_j/\sqrt{1+\lambda_j}$ の係数は $\sqrt{1+\lambda_j}c_j$ です。Hilbert空間の直交展開から

$$
\|u\|_{H^1_g}^2=\sum_j(1+\lambda_j)|c_j|^2
$$

となり、その部分和は $H^1$ 収束します。[前定理](#thm-ga4-spectral-basis)の $\|u\|_2^2=\sum_j|c_j|^2$ を引けば第二式が得られます。
<!-- proof-end -->

<a id="thm-ga4-minmax"></a>
<!-- formal-statement-start -->
> **定理（Rayleigh--Ritzとmin--max原理）**  
> $(M,g)$ を滑らか・連結・コンパクト・境界なしのRiemann多様体とし、$-\Delta_g$ の固有値を重複度込みで $0=\lambda_0<\lambda_1\le\cdots$ とする。任意の $k\ge0$ について
>
> $$
> \lambda_k=\min_{\substack{E\subset H^1(M)\\\dim E=k+1}}
> \ \max_{0\ne u\in E}\mathcal R(u)
> =\min_{\substack{u\in H^1(M),\ u\ne0\\
> (u,\phi_0)_2=\cdots=(u,\phi_{k-1})_2=0}}\mathcal R(u).
> $$
>
> $k=0$ では右端の直交条件は空とする。特に
>
> $$
> \lambda_1=\min_{\substack{u\in H^1(M),\ u\ne0\\\int_Mu\,dV_g=0}}\frac{\int_M|\nabla_gu|_g^2\,dV_g}{\int_Mu^2\,dV_g}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

[エネルギー級数表示](#lem-ga4-form-domain)により、最初の $k$ 本の固有関数と直交する関数の商は $\lambda_k$ 以上です。任意の $(k+1)$ 次元部分空間には、その $k$ 個の直交条件を満たす非零元があります。

<!-- proof-start -->
### 証明

まず $u\in H^1$、$u\ne0$ が $\phi_0,\ldots,\phi_{k-1}$ と直交するとします。[補題](#lem-ga4-form-domain)の展開では $c_0=\cdots=c_{k-1}=0$ なので

$$
Q(u)=\sum_{j\ge k}\lambda_j|c_j|^2
\ge\lambda_k\sum_{j\ge k}|c_j|^2
=\lambda_k\|u\|_2^2.
$$

従って $\mathcal R(u)\ge\lambda_k$ で、$u=\phi_k$ と選べば等号です。これで右端の最小値が確定します。

次に任意の $(k+1)$ 次元部分空間 $E\subset H^1$ を考えます。線形写像 $T:E\to\mathbb R^k$ を $T(u)=((u,\phi_0)_2,\ldots,(u,\phi_{k-1})_2)$ と置くと $\dim\ker T\ge(k+1)-k=1$ です。$0\ne u\in\ker T$ を取れば上の評価により $\max_{0\ne v\in E}\mathcal R(v)\ge\mathcal R(u)\ge\lambda_k$ です。ここで有限次元の単位球上でRayleigh商は連続なので最大値は存在します。

逆向きには $E_k=\operatorname{span}\{\phi_0,\ldots,\phi_k\}$ を選びます。$v=\sum_{j=0}^kc_j\phi_j$ なら

$$
\mathcal R(v)=\frac{\sum_{j=0}^k\lambda_j|c_j|^2}{\sum_{j=0}^k|c_j|^2}
\le\lambda_k,
$$

かつ $v=\phi_k$ で等号です。したがって $E_k$ 上の最大値は $\lambda_k$、全部分空間についての最小値も $\lambda_k$ です。$k=1$ の直交条件 $(u,\phi_0)_2=V^{-1/2}\int_Mu\,dV_g=0$ を代入して最後の式を得ます。
<!-- proof-end -->

<a id="cor-ga4-poincare-gap"></a>
<!-- formal-statement-start -->
> **系（第一正固有値と平均零Poincaré不等式）**  
> $(M,g)$ を滑らか・連結・コンパクト・境界なしのRiemann多様体とする。このとき $\lambda_1>0$ であり、任意の $u\in H^1(M)$ について
>
> $$
> \|u-\bar u\|_2^2\le\lambda_1^{-1}\|\nabla_gu\|_2^2,
> \qquad \bar u=V^{-1}\int_Mu\,dV_g.
> $$
>
> この不等式における最良の係数は $\lambda_1^{-1}$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[GA2の平均零Poincaré不等式](../GA2/index.md#thm-ga2-poincare)は平均零 $v$ について $\|v\|_2\le C_P\|\nabla_gv\|_2$ を保証するので、[Rayleigh--Ritzとmin--max原理](#thm-ga4-minmax)から $\lambda_1\ge C_P^{-2}>0$ です。

$v=u-\bar u$ は平均零で $\nabla_gv=\nabla_gu$ だから、[Rayleigh--Ritzとmin--max原理](#thm-ga4-minmax)を $v$ に使って $Q(v)\ge\lambda_1\|v\|_2^2$ となります。$u=\phi_1$ では平均零で $Q(\phi_1)=\lambda_1\|\phi_1\|_2^2$、等号が実現するため係数を小さくできません。
<!-- proof-end -->

平均零条件を落とせば定数 $u\ne0$ で $Q(u)=0$ なので正の下界は不可能です。ここでの **$\lambda_1>0$ は連結性とコンパクト性の効果**です。

## 6. 固有値を手で検算する

### 標準円 $S^1$

長さ $2\pi$ の円では、周期境界条件つき $L=-d^2/d\theta^2$ です。直接微分すれば

$$
L1=0,\quad L\cos(n\theta)=n^2\cos(n\theta),\quad
L\sin(n\theta)=n^2\sin(n\theta)\quad(n=1,2,\ldots).
$$

[Fourier級数の完全性](#thm-ga4-spectral-basis)を利用するまでもなく候補が確認でき、他に固有値がないことは二階常微分方程式から確認できます。固有値 $\lambda$ の固有関数 $u\ne0$ では $\lambda=Q(u)/\|u\|_2^2\ge0$ です。$\lambda=0$ では $u''=0$ と周期性から定数、$\lambda>0$ では $u=A\cos(\sqrt\lambda\theta)+B\sin(\sqrt\lambda\theta)$ です。

$u(0)=u(2\pi)$ と $u'(0)=u'(2\pi)$ が同時に成り立つ非零係数 $(A,B)$ が存在するには、回転角 $2\pi\sqrt\lambda$ が $2\pi$ の整数倍でなくてはならず、$\sqrt\lambda\in\mathbb Z$ です。

$0$ は一重、$n^2$ は $\cos(n\theta),\sin(n\theta)$ による二重です。特に $\lambda_1=\lambda_2=1$ で、$\lambda_1=1$ の最良Poincaré評価は $\int(u-\bar u)^2\le\int|u'|^2$ となります。

### 長方形の平坦トーラス

$T^2_{a,b}=\mathbb R^2/(a\mathbb Z\times b\mathbb Z)$ に計量 $dx^2+dy^2$（$a,b>0$）を入れます。整数 $m,n$ に対し複素指数関数（実部・虚部を取れば実固有関数）

$$
e_{m,n}(x,y)=\exp\!\left(2\pi i\left(\frac{mx}{a}+\frac{ny}{b}\right)\right)
$$

は両方向で周期的で、

$$
-Le_{m,n}=\Delta_ge_{m,n}
=-4\pi^2\left(\frac{m^2}{a^2}+\frac{n^2}{b^2}\right)e_{m,n},
\qquad
\lambda_{m,n}=4\pi^2\left(\frac{m^2}{a^2}+\frac{n^2}{b^2}\right).
$$

$a\ne b$ では横と縦の第一振動の固有値が異なり、$a=b$ では縮退します。面積 $ab$ は定数固有関数の正規化 $1/\sqrt{ab}$ に効きますが、**一つ一つの固有値の式には分母の長さの二乗**が効きます。

### 単位球面 $S^2$

標準球面の球座標 $(\theta,\varphi)$（極を除く）で計量は $d\theta^2+\sin^2\theta\,d\varphi^2$ です。$z=\cos\theta$ を $\mathbb R^3$ の第三座標の球面制限とします。[GA1の局所Laplacian公式](../GA1/index.md#thm-ga1-green-first)をこの計量へ代入すると

$$
\Delta_g z
=\frac1{\sin\theta}\partial_\theta
 \bigl(\sin\theta\,\partial_\theta\cos\theta\bigr)
=\frac1{\sin\theta}\partial_\theta(-\sin^2\theta)
=-2\cos\theta=-2z.
$$

両辺は滑らかなので極でも一致します。球面の回転は等長写像で、同じ式が $x,y$ の座標制限にも成り立ちます。従って固有値 $2$ の固有空間は少なくとも三次元です。ただしここでの計算だけから「$2$ が第一正固有値」「重複度がちょうど3」とまで断定してはいけません。それには全固有関数の分類など追加の証明が必要です。

## 7. 非コンパクトだとどこで失敗するか

実直線 $\mathbb R$ の標準計量を考えます。非零の滑らかなコンパクト台関数 $u$ を取り、$f=-u''+u$ とします。$u$ は $(-d^2/dx^2+1)u=f$ の解です。整数 $n$ を十分離して取り、$u_n(x)=u(x-n)$、$f_n(x)=f(x-n)$ と平行移動すれば、$\|f_n\|_2=\|f\|_2$ で一様に有界ですが、互いに台が交わらない $u_n$ の間には

$$
\|u_n-u_m\|_2^2=2\|u\|_2^2\quad(n\ne m)
$$

という距離が残ります。よって $(-d^2/dx^2+1)^{-1}$ は $\mathbb R$ 上ではコンパクトではありません。壊れたのは[Rellichの大域コンパクト性](../GA2/index.md#thm-ga2-rellich)であり、局所で解が正則になることではありません。

さらに平均零を要求しない直線上の $L^2$ 関数で、低周波の拡大列 $u_R(x)=R^{-1/2}\eta(x/R)$（$0\ne\eta\in C_c^\infty(\mathbb R)$）を作ると

$$
\|u_R\|_2^2=\|\eta\|_2^2,\qquad
\|u_R'\|_2^2=R^{-2}\|\eta'\|_2^2,\qquad
\mathcal R(u_R)=R^{-2}\frac{\|\eta'\|_2^2}{\|\eta\|_2^2}\longrightarrow0.
$$

にもかかわらず、$L^2(\mathbb R)$ に非零の定数関数は存在しません。$-u''=0$ の分布解は $u=ax+b$ なので、$L^2$ 固有値としての0もありません。つまり、Rayleigh商の下限0が**固有関数によって達成されるとは限らない**のです。コンパクト性は単なる技術的便宜ではありません。

## 8. 演習

### Level A

<a id="ex-ga4-a01"></a>
#### GA4-A01 円上のレゾルベント
- Level: A

標準円 $S^1$ で $f(\theta)=6\cos(2\theta)$ とする。$(-\Delta_g+I)u=f$ の解 $u$ と、$Ru$ を求め、$R$ の固有値との対応を説明せよ。

<!-- solution-start -->
**詳細解答**

$-\Delta_g\cos(2\theta)=4\cos(2\theta)$ だから、$(-\Delta_g+I)(c\cos2\theta)=5c\cos2\theta$ です。$5c=6$ と置いて $u=\frac65\cos2\theta$ を得ます。$R\cos2\theta=\frac15\cos2\theta$ は[レゾルベントの定義](#def-ga4-l2-realization)での $\mu=(1+\lambda)^{-1}=1/5$（$\lambda=4$）と一致します。さらに $Ru=\frac65 R\cos2\theta=\frac6{25}\cos2\theta$ です。滑らかな周期関数なので弱形式も満たし、[反応Poisson一意性](../GA3/index.md#thm-ga3-shifted-poisson)から解は唯一です。
<!-- solution-end -->

<a id="ex-ga4-a02"></a>
#### GA4-A02 定数核と平均零
- Level: A

コンパクト連結境界なし多様体 $(M,g)$ で $Lu=0$ の $u\in D(L)$ をすべて求めよ。$f\in L^2(M)$ が定数関数 $1$ と直交する条件を書け。

<!-- solution-start -->
**詳細解答**

$Lu=0$ を弱形式で試験関数 $v=u$ とすると、[Greenの弱形式](../GA3/index.md#def-ga3-h1-weak-poisson)により $\int_M|\nabla_gu|^2\,dV_g=0$ です。[GA2の平均零Poincaré不等式](../GA2/index.md#thm-ga2-poincare)を $u-\bar u$ に適用すると $\|u-\bar u\|_2=0$、従って $u$ は定数です。

逆に定数関数は $-\Delta_g u=0$ で $D(L)$ に入ります。直交条件は $(f,1)_2=\int_Mf\,dV_g=0$ であり、正規化 $\phi_0=V^{-1/2}$ との直交条件 $(f,\phi_0)_2=0$ と同値です。
<!-- solution-end -->

<a id="ex-ga4-a03"></a>
#### GA4-A03 平坦トーラスの波数
- Level: A

$T^2_{2\pi,4\pi}$ の標準平坦計量で $u(x,y)=\cos x+\sin(y/2)$ とする。$Lu$ を求め、各成分の固有値を計算せよ。$u$ 自身は固有関数か。

<!-- solution-start -->
**詳細解答**

計量が $dx^2+dy^2$ なので $\Delta_g=\partial_x^2+\partial_y^2$ です。$\partial_x^2\cos x=-\cos x$、$\partial_y^2\sin(y/2)=-\frac14\sin(y/2)$ により

$$
Lu=\cos x+\frac14\sin(y/2).
$$

$\cos x$ の固有値は1、$\sin(y/2)$ の固有値は $1/4$ です。$Lu=\lambda u$ なら独立な二つのFourier成分の係数を比べて $\lambda=1$ と $\lambda=1/4$ が同時に必要となり矛盾します。従って $u$ 自身は固有関数ではありません。
<!-- solution-end -->

<a id="ex-ga4-a04"></a>
#### GA4-A04 球面の座標関数
- Level: A

標準単位球面 $S^2$ 上の $z=\cos\theta$ について、$\Delta_g=\sin^{-1}\theta\,\partial_\theta(\sin\theta\,\partial_\theta)+\sin^{-2}\theta\,\partial_\varphi^2$ を使い $Lz$ を計算し、$z$ が定数固有関数と直交することも確認せよ。

<!-- solution-start -->
**詳細解答**

$z$ は $\varphi$ に依存しないから $\partial_\varphi^2 z=0$、$\partial_\theta z=-\sin\theta$ です。従って

$$
\Delta_gz=\frac1{\sin\theta}\partial_\theta(-\sin^2\theta)
=\frac{-2\sin\theta\cos\theta}{\sin\theta}=-2z,
\qquad Lz=2z.
$$

極では滑らかさによって延長できます。体積要素 $dV_g=\sin\theta\,d\theta\,d\varphi$ を使うと

$$
\int_{S^2}z\,dV_g
=2\pi\int_0^\pi\cos\theta\sin\theta\,d\theta
=\pi[\sin^2\theta]_0^\pi=0.
$$

したがって $z$ は定数固有関数と直交し、固有値2は正です。
<!-- solution-end -->

### Level B

<a id="ex-ga4-b01"></a>
#### GA4-B01 弱解評価からコンパクト性へ
- Level: B

コンパクト境界なし多様体で $\|f_n\|_{L^2}\le5$ なる列を与え、$u_n=(-\Delta_g+1)^{-1}f_n$ とする。$H^1$ 有界性と $L^2$ 強収束部分列の存在を、使用する二つの定理の仮定込みで証明せよ。

<!-- solution-start -->
**詳細解答**

[正の反応項を持つPoisson問題](../GA3/index.md#thm-ga3-shifted-poisson)から $u_n\in H^1$ が一意に存在します。その弱形式で $v=u_n$ とすれば

$$
\|u_n\|_{H^1_g}^2
=(f_n,u_n)_2
\le\|f_n\|_2\|u_n\|_2
\le5\|u_n\|_{H^1_g}.
$$

零の場合を除き割ると $\|u_n\|_{H^1_g}\le5$ です。[GA2のRellichの定理](../GA2/index.md#thm-ga2-rellich)は、多様体がコンパクトで滑らかかつ境界なしであるとき $H^1\hookrightarrow L^2$ がコンパクトであると述べています。その仮定を満たすので、この $H^1$ 有界列から $L^2$ 強収束部分列 $(u_{n_k})$ を抽出できます。外力自身の $L^2$ 強収束を仮定する必要はありません。
<!-- solution-end -->

<a id="ex-ga4-b02"></a>
#### GA4-B02 Poincaré定数と固有値
- Level: B

コンパクト連結境界なし多様体の平均零関数について $\|u\|_2\le C\|\nabla_gu\|_2$ が成り立つとする。$\lambda_1\ge C^{-2}$ を示し、最良の $C$ を求めよ。

<!-- solution-start -->
**詳細解答**

平均零で非零の $u$ では $\|u\|_2^2\le C^2Q(u)$、すなわち $\mathcal R(u)=Q(u)/\|u\|_2^2\ge C^{-2}$ です。[第一正固有値のRayleigh特徴付け](#thm-ga4-minmax)でそのような $u$ 全体の最小値が $\lambda_1$ だから $\lambda_1\ge C^{-2}$ です。

一方、正規化された $\phi_1$ は $(\phi_1,\phi_0)_2=0$ より平均零で、[H1の固有関数展開とエネルギー恒等式](#lem-ga4-form-domain)から $Q(\phi_1)=\lambda_1\|\phi_1\|_2^2$ です。従って $C\ge\lambda_1^{-1/2}$ は必要で、[Poincaréの系](#cor-ga4-poincare-gap)がその値で不等式の成立を保証します。最良定数は $C_{\mathrm{best}}=\lambda_1^{-1/2}$ です。
<!-- solution-end -->

<a id="ex-ga4-b03"></a>
#### GA4-B03 円でmin--maxの添字を確認する
- Level: B

標準円で最初の3本の正規直交固有関数を $\phi_0=(2\pi)^{-1/2}$、$\phi_1=\pi^{-1/2}\cos\theta$、$\phi_2=\pi^{-1/2}\sin\theta$ とする。$\lambda_0,\lambda_1,\lambda_2$ と $\operatorname{span}\{\phi_0,\phi_1,\phi_2\}$ 上のRayleigh商の最大値を求め、なぜ $\lambda_1=\lambda_2$ か説明せよ。

<!-- solution-start -->
**詳細解答**

二階微分により $L\phi_0=0$、$L\phi_1=\phi_1$、$L\phi_2=\phi_2$ なので $\lambda_0=0$、$\lambda_1=\lambda_2=1$ です。$u=a\phi_0+b\phi_1+c\phi_2$ なら直交性から

$$
\|u\|_2^2=a^2+b^2+c^2,\qquad
Q(u)=b^2+c^2,\qquad
\mathcal R(u)=\frac{b^2+c^2}{a^2+b^2+c^2}\le1.
$$

$a=0$ で $(b,c)\ne(0,0)$ なら等号です。固有値1に独立な $\cos\theta,\sin\theta$ の二つの固有関数が存在するため、重複度を数える並べ方では $\lambda_1=\lambda_2$ となります。添字が異なっても固有値は厳密増加する必要はありません。
<!-- solution-end -->

### Level C

<a id="ex-ga4-c01"></a>
#### GA4-C01 非コンパクトでの二つの破綻を構成する
- Level: C

$\mathbb R$ 上の $L=-d^2/dx^2$ を考える。(i) 非零 $w\in C_c^\infty(\mathbb R)$ を用い、$R=(L+I)^{-1}$ が $L^2(\mathbb R)$ 上でコンパクトでないことを示せ。(ii) 非零 $\eta\in C_c^\infty(\mathbb R)$ と $u_R(x)=R^{-1/2}\eta(x/R)$ ($R>0$) で $\inf_{u\ne0}\int|u'|^2/\int|u|^2=0$ を示せ。(iii) この下限が非零 $L^2$ 固有関数で達成されない理由を述べよ。

<!-- solution-start -->
**詳細解答**

(i) $w$ の台が区間 $[-A,A]$ に入るように $A>0$ を取ります。整数 $n$ を $2A+1$ の間隔で選び、$w_n(x)=w(x-n)$、$f_n(x)=-w_n''(x)+w_n(x)$ とします。平行移動は $L^2$ ノルムを変えないので $\|f_n\|_2=\|-w''+w\|_2$ は一定です。各 $w_n$ は滑らかな弱解であり、$(-d^2/dx^2+I)w_n=f_n$ です。弱解の一意性は二解の差 $v$ に $v$ を試して $\|v'\|_2^2+\|v\|_2^2=0$ とすれば確かめられます。従って $Rf_n=w_n$。異なる $n,m$ の台は交わらないので

$$
\|Rf_n-Rf_m\|_2^2
=\|w_n\|_2^2+\|w_m\|_2^2
=2\|w\|_2^2>0.
$$

これは収束部分列を持たず、[コンパクト作用素の定義](../../../解析系/FA/FA6/index.md#thm-fa6-unit-ball-characterization)に反します。

(ii) $y=x/R$ と変数変換すると $dx=R\,dy$ です。微分は $u_R'(x)=R^{-3/2}\eta'(x/R)$ なので

$$
\int_{\mathbb R}|u_R|^2dx
=\int_{\mathbb R}R^{-1}|\eta(x/R)|^2dx=\|\eta\|_2^2,
$$

$$
\int_{\mathbb R}|u_R'|^2dx
=\int_{\mathbb R}R^{-3}|\eta'(x/R)|^2dx
=R^{-2}\|\eta'\|_2^2.
$$

商は $R^{-2}\|\eta'\|_2^2/\|\eta\|_2^2\to0$ です。商自体は非負なので下限は0です。

(iii) もし非零の $u\in H^1(\mathbb R)$ が下限0を達成すれば $\|u'\|_2^2=0$ で、弱微分零の関数はほとんど至る所定数です。しかし $\mathbb R$ 上の非零定数は $L^2$ に入らず矛盾します。失われた仮定は多様体のコンパクト性であり、(i)では平行移動がRellich型の大域コンパクト性を壊し、(ii)(iii)では最小化列が $L^2$ の強収束部分列を持たないことが原因です。
<!-- solution-end -->

本章の固有関数展開を使えば、次章では各成分を $e^{-t\lambda_j}$ 倍することによって熱方程式の解を組み立てられます。**固有値の存在と列挙を証明する段階**と、**熱核の滑らかさ・正値性を証明する段階**は区別します。
