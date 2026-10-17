# GA5 熱方程式・熱半群・熱核

[GA4の固有関数展開](../GA4/index.md#thm-ga4-spectral-basis)は、空間方向の振動を固有値で並べました。熱は高い振動数ほど速く消えるので、固有関数 $\phi_j$ に含まれる初期温度の成分を $e^{-t\lambda_j}$ 倍すればよさそうです。しかし $L^2$ 初期値は点ごとの値さえ持たず、級数から得られる解の滑らかさや、温度が負にならないことも自明ではありません。さらに[既習の一次元熱核](../../../解析系/PDE/PDE3/index.md#def-pde3-heat-kernel)を曲がった多様体へ拡張するには、各点で固有関数級数を収束させなければなりません。

本章の流れは **固有値ごとの時間発展 → 解の滑らかさと一意性 → 熱核の構成 → 正値性・質量保存 → 長時間と短時間** です。熱核の存在を仮定して半群を定義するのではなく、その逆順で構成します。

以下、特記しない限り $(M,g)$ は滑らか・連結・コンパクト・境界なしのRiemann多様体とし、実数値関数を考えます。次元は $d\ge1$、体積は $V=\operatorname{Vol}_g(M)>0$ とします。

[GA1の符号規約](../GA1/index.md#thm-ga1-green-first)に従い、Laplacianと非負作用素の関係は次の通りです。

$$
\Delta_g=\operatorname{div}_g\nabla_g,\qquad L=-\Delta_g\ge0.
$$

[GA4の固有関数展開](../GA4/index.md#thm-ga4-spectral-basis)の正規直交固有関数を $(\phi_j)_{j\ge0}$ とします。固有値列と定数固有関数は

$$
0=\lambda_0<\lambda_1\le\cdots,\qquad \phi_0=V^{-1/2}.
$$

内積とノルムは $L^2(M,dV_g)$ のものを使います。

## 1. 固有振動が時間とともに消える

たとえば標準円で初期値を $f(\theta)=2+3\cos\theta+\sin(2\theta)$ とすると、$\Delta_g\cos\theta=-\cos\theta$、$\Delta_g\sin2\theta=-4\sin2\theta$ です。各係数を常微分方程式で発展させれば

$$
u(t,\theta)=2+3e^{-t}\cos\theta+e^{-4t}\sin(2\theta)
$$

となり、$\partial_tu=\Delta_gu$ を満たします。定数成分だけは減衰しません。無限個の固有関数でも同じ操作をするため、まず時間発展を作用素として定義します。

<a id="def-ga5-heat-semigroup"></a>

<!-- formal-statement-start -->
> **定義（熱半群）**  
> 上記のコンパクト境界なし多様体上で、$f\in L^2(M)$、$c_j=(f,\phi_j)_2$、$t\ge0$ に対して
>
$$
T_tf=\sum_{j=0}^{\infty}e^{-t\lambda_j}c_j\phi_j\quad\text{($L^2$ 収束)}
$$
>
> と定める。作用素族 $(T_t)_{t\ge0}$ を $L$ の**熱半群**と呼び、$T_t=e^{-tL}=e^{t\Delta_g}$ と書く。「半群」とは $T_0=I$ および $T_{t+s}=T_tT_s$ を満たすことをいう。
<!-- formal-statement-end -->

定義域は $L^2(M)$ 全体です。係数の二乗和は[Parseval等式](../GA4/index.md#thm-ga4-spectral-basis)で $\sum_j|c_j|^2=\|f\|_2^2<\infty$ です。$|e^{-t\lambda_j}|\le1$ だから級数は確かに $L^2$ で収束します。

<!-- definition-example-start: def-ga5-heat-semigroup -->
**定義の確認**（円の二つの波数）：上記の $f$ は滑らかな周期関数で $L^2$ に属します。定数・$\cos\theta$・$\sin2\theta$ は互いに直交する固有関数で、固有値は順に $0,1,4$。したがって定義の各成分を $1,e^{-t},e^{-4t}$ 倍した結果が上の $u$ です。さらに成分ごとに $e^{-(t+s)\lambda}=e^{-t\lambda}e^{-s\lambda}$ を確かめれば、$T_{t+s}f=T_t(T_sf)$ となります。正規化を変えても線形結合全体の値は同じです。
<!-- definition-example-end -->

<a id="thm-ga5-semigroup"></a>

<!-- formal-statement-start -->
> **定理（熱半群の縮小性・強連続性・生成作用素）**  
> $(M,g)$ を上記の多様体とし、$T_t$ を[定義](#def-ga5-heat-semigroup)で与える。このとき $t,s\ge0$、$f\in L^2(M)$ に対し
>
$$
T_{t+s}=T_tT_s,\qquad T_0=I,\qquad
\|T_tf\|_2\le\|f\|_2,\qquad
\lim_{t\downarrow0}\|T_tf-f\|_2=0.
$$
>
> $t>0$ なら $T_tf\in D(L^m)$ が任意の整数 $m\ge1$ について成立し、$\partial_tT_tf=-LT_tf$ が $L^2$ で成り立つ。$f\in D(L)$ なら
>
$$
\lim_{t\downarrow0}\frac{T_tf-f}{t}=-Lf
\quad\text{in }L^2(M).
$$
<!-- formal-statement-end -->

### 証明の見取り図

半群性は係数の指数法則、縮小性はParsevalから出ます。時間 $0$ への連続性と微分は、いきなり無限和を微分せず、有限部分和で計算してから二乗和の上界で極限を通します。

<!-- proof-start -->
### 証明

$f=\sum_jc_j\phi_j$ と書きます。[GA4の展開](../GA4/index.md#thm-ga4-spectral-basis)より

$$
\|T_tf\|_2^2=\sum_je^{-2t\lambda_j}|c_j|^2\le\sum_j|c_j|^2=\|f\|_2^2.
$$

有限部分和では指数法則が成り立ち、両作用素は有界なので $L^2$ 極限でも $T_{t+s}=T_tT_s$ です。$T_0f=f$ も基底展開から分かります。強連続性は

$$
\|T_tf-f\|_2^2=\sum_j|e^{-t\lambda_j}-1|^2|c_j|^2
$$

において、有限個の項は $t\downarrow0$ で $0$ に向かい、残りは $4\sum_{j>N}|c_j|^2$ 以下であることから従います。任意の $\varepsilon>0$ についてまず $N$ を大きく選び、次に $t$ を小さくする順序です。

$t>0$ と整数 $m\ge1$ に対して、$r^{m}e^{-tr}$ は $r\ge0$ で有界です。ゆえに

$$
\sum_j\lambda_j^{2m}e^{-2t\lambda_j}|c_j|^2
\le\left(\sup_{r\ge0}r^{2m}e^{-2tr}\right)\|f\|_2^2<\infty.
$$

[GA4の作用素領域の係数表示](../GA4/index.md#thm-ga4-spectral-basis)を反復すると $T_tf\in D(L^m)$ です。$t>0$ の微分は任意の区間 $t\ge\varepsilon>0$ 上で $\lambda_je^{-t\lambda_j}$ が一様有界だから二乗和内で正当化でき、$\partial_tT_tf=-LT_tf$ を得ます。

最後に $f\in D(L)$ なら $\sum_j\lambda_j^2|c_j|^2<\infty$。$r\ge0$ で $|(e^{-tr}-1)/t|\le r$ なので

$$
\left\|\frac{T_tf-f}{t}+Lf\right\|_2^2
=\sum_j\left|\frac{e^{-t\lambda_j}-1}{t}+\lambda_j\right|^2|c_j|^2\longrightarrow0.
$$

ここも各項の収束と $\sum_j4\lambda_j^2|c_j|^2<\infty$ により正当化しました。
<!-- proof-end -->

この結果は、**解を $L^2$ の意味で構成した**ことを示します。点ごとの温度や熱核の滑らかさは、まだ証明していません。

## 2. 熱方程式の解とエネルギー散逸

初期値が単に $L^2$ なら $t=0$ で古典的な微分を要求せず、$t>0$ で $\partial_tu=\Delta_gu$ が成り立ち、$t\downarrow0$ で初期値に $L^2$ 収束することを解の条件とします。時間正則性だけでなく空間の滑らかさを得るには、楕円正則性を使います。

<a id="thm-ga5-heat-solution"></a>

<!-- formal-statement-start -->
> **定理（熱方程式の平滑化・一意性・エネルギー恒等式）**  
> $(M,g)$ を滑らかなコンパクト境界なしRiemann多様体、$f\in L^2(M)$ とする。$u(t)=T_tf$ は $t>0$ で $(t,x)$ の滑らかな関数であり
>
$$
\partial_tu=\Delta_gu,\qquad
\lim_{t\downarrow0}\|u(t)-f\|_2=0.
$$
>
> $u\in C([0,\infty);L^2)\cap C^1((0,\infty);L^2)$、$u(t)\in D(L)$ を満たすこの熱方程式の解は一意である。さらに $0<s<t$ について
>
$$
\|u(t)\|_2^2+2\int_s^t\|\nabla_gu(r)\|_2^2\,dr=\|u(s)\|_2^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[GA3の楕円正則性](../GA3/index.md#thm-ga3-local-regularity)を繰り返すと $L$ の高い冪の領域から空間Sobolev正則性が得られます。コンパクト多様体の[GA2のSobolev埋め込み](../GA2/index.md#thm-ga2-embedding)で各階の連続微分へ上げます。一意性は二解の差の $L^2$ エネルギーの減少から従います。

<!-- proof-start -->
### 証明

前定理によって $u(t)\in D(L^m)$ がすべての $m$ について成り立ちます。[GA3の局所楕円正則性](../GA3/index.md#thm-ga3-local-regularity)を有限個の座標近傍で繰り返すと、各整数 $k$ に対して

$$
\|v\|_{H^{2k}(M)}\le C_k\sum_{\ell=0}^k\|L^\ell v\|_2
\quad(v\in D(L^k))
$$

という評価を得ます。一回目の $H^2$ 評価には $Lv$ を、二回目の $H^4$ 評価には $L(Lv)$ を入力します。有限被覆と[GA2の局所ノルム比較](../GA2/index.md#prop-ga2-intrinsic-h1)で定数をまとめます。

次に[GA2のSobolev埋め込み](../GA2/index.md#thm-ga2-embedding)を適用します。整数 $k$ を $2k>r+d/2$ と選べば、$H^{2k}$ 評価から $v$ の $C^r$ ノルムを抑えられます。

時間微分を一回取ることは作用素 $-L$ をさらに一回作用させることです。$t\ge\varepsilon>0$ で各階微分が連続になるため、$u$ は $(0,\infty)\times M$ 上で滑らかです。

$w$ を初期値 $0$ の同じクラスの解とすると、$w(t)\in D(L)$ です。空間積分について $(w,\Delta_gw)_2=-\|\nabla_gw\|_2^2$ が成り立ちます（[GA1の積分公式の証明](../GA1/index.md#thm-ga1-green-first)）。これを用いると

$$
\frac{d}{dt}\|w(t)\|_2^2
=2(w,\Delta_gw)_2=-2\|\nabla_gw\|_2^2\le0.
$$

$0<s<t$ に積分して $\|w(t)\|_2\le\|w(s)\|_2$、$s\downarrow0$ で右辺は $0$ です。よって一意性が従います。同じ計算を $u$ に適用して指定したエネルギー恒等式を得ます。
<!-- proof-end -->

**保存される量と減る量は別です。** 滑らかな $u$ について[Riemann多様体の発散定理](../GA1/index.md#thm-ga1-divergence)から

$$
\frac{d}{dt}\int_Mu\,dV_g=\int_M\Delta_gu\,dV_g=0,
$$

一方 $\|u(t)\|_2$ は減少します。熱が全体で失われるのではなく、空間的なむらが小さくなるということです。

## 3. 熱核を二変数関数として作る

形式的には $T_tf(x)$ の固有関数展開で $c_j=\int_Mf(y)\phi_j(y)\,dV_g(y)$ を代入して

$$
T_tf(x)=\int_M\left\{\sum_je^{-t\lambda_j}\phi_j(x)\phi_j(y)\right\}f(y)\,dV_g(y)
$$

と書けます。ただし和と積分の交換、さらに $\phi_j(x)$ を点で評価する操作は $L^2$ 収束**だけでは許されません**。ここを正当化します。

<a id="lem-ga5-counting"></a>

<!-- formal-statement-start -->
> **補題（固有値の多項式計数評価）**  
> $(M,g)$ を上記の $d$ 次元コンパクト多様体とし、$N(\Lambda)=\#\{j:\lambda_j\le\Lambda\}$（重複度込み、$\Lambda\ge0$）と置く。このときある $C>0$ が存在して
>
$$
N(\Lambda)\le C(1+\Lambda)^{d/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

これはWeyl漸近式を使わない、必要な上界だけの証明です。座標内を小さな立方体へ区切り、各立方体の平均値だけで「固有値が $\Lambda$ 以下の関数」を識別します。立方体上の初等的Poincaré評価が核心です。

<!-- proof-start -->
### 証明

[GA2の有限座標被覆と1の分割](../GA2/index.md#def-ga2-sobolev)を使って、各 $\chi_\alpha u$ が一つの座標立方体の内部で台を持つようにします。計量係数と体積密度は各コンパクトな座標領域上で上下に有界です。幅 $h\in(0,1]$ の小立方体に各座標領域を分け、各 $\chi_\alpha u$ の**小立方体ごとのLebesgue平均値**を $A_{\alpha,Q}(u)$ とします。面積の等価性により、この座標上の平均を使っても評価定数は $h$ に依存しません。

小立方体 $Q$ で $\bar v_Q=|Q|^{-1}\int_Qv$ とおくと、一変数方向に線分を積分しCauchy--Schwarzを適用する（各座標方向を順に平均化する）ことで

$$
\int_Q|v-\bar v_Q|^2\,dz\le C_dh^2\int_Q|\nabla_zv|^2\,dz
$$

を得ます。有限個の $\alpha$ と立方体について和を取り、$\sum_\alpha\chi_\alpha u=u$ と $\nabla(\chi_\alpha u)=\chi_\alpha\nabla u+u\nabla\chi_\alpha$ を使えば

$$
\|u\|_2\le Ch\bigl(\|u\|_2+\|\nabla_gu\|_2\bigr)
\quad\text{if all }A_{\alpha,Q}(u)=0.
$$

$E_\Lambda=\operatorname{span}\{\phi_j:\lambda_j\le\Lambda\}$ とします。[H1の固有関数展開とエネルギー恒等式](../GA4/index.md#lem-ga4-form-domain)より $u\in E_\Lambda$ なら $\|\nabla_gu\|_2^2\le\Lambda\|u\|_2^2$ です。$h=c(1+\Lambda)^{-1/2}$ を $Cc(1+\sqrt{\Lambda})/\sqrt{1+\Lambda}<1$ となるよう小さく選ぶと、すべての平均値が $0$ である $u\in E_\Lambda$ は $u=0$ です。

従って線形写像 $u\mapsto(A_{\alpha,Q}(u))$ は $E_\Lambda$ 上単射です。立方体の総数は有限被覆の各座標体積を $h^d$ で割った $O(h^{-d})$ 以下なので

$$
N(\Lambda)=\dim E_\Lambda\le Ch^{-d}\le C'(1+\Lambda)^{d/2}.
$$

これで上界が示されました。
<!-- proof-end -->

<a id="def-ga5-heat-kernel"></a>

<!-- formal-statement-start -->
> **定義（多様体熱核）**  
> 上記多様体と固有関数系に対し、$t>0$、$x,y\in M$ について
>
$$
p_t(x,y)=\sum_{j=0}^{\infty}e^{-t\lambda_j}\phi_j(x)\phi_j(y)
$$
>
> と定める。これを $L=-\Delta_g$ の**多様体熱核**と呼ぶ。級数が滑らかな二変数関数を定めることと、次の積分表示が成立することを後続の定理で証明する。

$$
T_tf(x)=\int_Mp_t(x,y)f(y)\,dV_g(y).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga5-heat-kernel -->
**定義の確認**（標準円）：$S^1=\mathbb R/(2\pi\mathbb Z)$ の正規直交基底を $\phi_0=(2\pi)^{-1/2}$、$\pi^{-1/2}\cos(n\theta)$、$\pi^{-1/2}\sin(n\theta)$（$n\ge1$）とします。固有値は $n^2$ です。三角恒等式 $\cos a\cos b+\sin a\sin b=\cos(a-b)$ により、定義の級数は

$$
p_t(\theta,\eta)=\frac1{2\pi}+\frac1\pi\sum_{n=1}^{\infty}e^{-tn^2}\cos(n(\theta-\eta)).
$$

$t>0$ なら $\sum_nn^ke^{-tn^2}<\infty$ が各整数 $k$ で成立するので、各階微分を項別に行えます。体積は $d\eta$ で、$\int_0^{2\pi}p_t(\theta,\eta)\,d\eta=1$ です。これは「単なる形式的な和」ではなく、条件を満たす熱核の具体例になっています。
<!-- definition-example-end -->

<a id="thm-ga5-kernel"></a>

<!-- formal-statement-start -->
> **定理（熱核の存在・滑らかさ・対称性・半群性）**  
> $(M,g)$ を上記の滑らかな連結コンパクト境界なし多様体とする。$p_t$ の級数は、任意の $\varepsilon>0$ 上で $t\ge\varepsilon$ のすべての時間・空間微分について一様収束し、$(0,\infty)\times M\times M$ 上の滑らかな関数を定める。$f\in L^2(M)$、$t,s>0$ に対し
>
$$
T_tf(x)=\int_Mp_t(x,y)f(y)\,dV_g(y),
$$
>
$$
p_t(x,y)=p_t(y,x),\qquad
p_{t+s}(x,y)=\int_Mp_t(x,z)p_s(z,y)\,dV_g(z).
$$
>
> また $\partial_tp_t(x,y)=\Delta_{g,x}p_t(x,y)=\Delta_{g,y}p_t(x,y)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

前補題は固有値の個数を多項式で抑えます。楕円正則性は固有関数の各階微分を固有値の多項式で抑えます。指数 $e^{-t\lambda}$ はどんな多項式より速く減るので、二つを組み合わせれば点ごとの絶対一様収束になります。

<!-- proof-start -->
### 証明

[GA3の楕円正則性](../GA3/index.md#thm-ga3-local-regularity)と[GA2のSobolev埋め込み](../GA2/index.md#thm-ga2-embedding)を、$L\phi_j=\lambda_j\phi_j$、$\|\phi_j\|_2=1$ へ繰り返し適用します。任意の非負整数 $r$ に対し、十分大きな整数 $m_r$ を選べば

$$
\|\phi_j\|_{C^r(M)}\le C_r(1+\lambda_j)^{m_r}
$$

を得ます。たとえば $2m_r>r+d/2$ を満たす $m_r$ とし、$H^{2m_r}$ の評価を $m_r$ 回繰り返せばよいのです。

計数補題により各整数 $k\ge0$、$\varepsilon>0$ について

$$
\sum_je^{-\varepsilon\lambda_j}(1+\lambda_j)^k<\infty.
$$

実際 $\lambda_j\in[n,n+1)$ の項数は $N(n+1)\le C(2+n)^{d/2}$ 以下だから、左辺は $\sum_{n\ge0}Ce^{-\varepsilon n}(2+n)^{k+d/2}$ で上から抑えられます。上の $C^r$ 評価と合わせると、$p_t$ の任意の混合微分の項が $t\ge\varepsilon$ で絶対一様可和です。

$f\in L^2$ に対して $y$ で項別積分すると係数 $(f,\phi_j)_2$ が得られます。点ごとの等式も成立し、両辺は滑らかな同じ $L^2$ 関数の表示です。対称性は各項の $\phi_j(x)\phi_j(y)$ を交換すれば従います。半群性では、絶対収束を使って

$$
\int_Mp_t(x,z)p_s(z,y)\,dV_g(z)
=\sum_{j,k}e^{-t\lambda_j-s\lambda_k}\phi_j(x)\phi_k(y)(\phi_j,\phi_k)_2
=\sum_je^{-(t+s)\lambda_j}\phi_j(x)\phi_j(y).
$$

最後の微分方程式は $\partial_t e^{-t\lambda_j}=-\lambda_je^{-t\lambda_j}$ と $\Delta_g\phi_j=-\lambda_j\phi_j$ を項別に計算して得られます。
<!-- proof-end -->

### どうして正の温度が負にならないか

定義の級数は各項 $\phi_j(x)\phi_j(y)$ が負になることもあるため、**級数の各項が正だから熱核が正**という説明は誤りです。ここでは負部分のエネルギーを直接調べます。

<a id="thm-ga5-positivity-mass"></a>

<!-- formal-statement-start -->
> **定理（熱核の非負性・厳密正値性・質量保存）**  
> $(M,g)$ を滑らか・連結・コンパクト・境界なしのRiemann多様体とする。任意の $t>0$、$x,y\in M$ について
>
$$
p_t(x,y)>0,\qquad \int_Mp_t(x,y)\,dV_g(y)=1.
$$
>
> $f\ge0$（ほとんど至る所）なら $T_tf\ge0$ であり、$f$ がほとんど至る所非負で非零なら $T_tf(x)>0$（すべての $t>0,x\in M$）である。
<!-- formal-statement-end -->

### 証明の見取り図

非負性は負部分のエネルギーから、質量保存は定数固有関数から示します。「$>0$」には非負性に加えて、半群性と時間解析性を使います。

<!-- proof-start -->
### 証明

まず滑らかな非負関数 $f$ を取り、$u=T_tf$ と置きます。滑らかな初期値は $L^mf\in L^2$ を各整数 $m$ で満たします。[GA4の固有値展開](../GA4/index.md#thm-ga4-spectral-basis)により、高階微分まで時間 $0$ で収束し、$u$ は初期時刻まで滑らかです。

負部分を $u_-=\max\{-u,0\}$ と置きます。弱微分の連鎖律から、$u<0$ の集合上で $\nabla u_-=-\nabla u$、それ以外では $\nabla u_-=0$ です。

これを[Greenの第一公式](../GA1/index.md#thm-ga1-green-first)へ代入して、

$$
\frac{d}{dt}\|u_-(t)\|_2^2
=-2(\partial_tu,u_-)_2
=-2(\Delta_gu,u_-)_2
=2(\nabla u,\nabla u_-)_2
=-2\|\nabla u_-\|_2^2\le0.
$$

$\|f_-\|_2=0$ なので $u_-=0$ です。一般の $f\in L^2$、$f\ge0$ は、[GA2の滑らかな関数の密度](../GA2/index.md#thm-ga2-complete-density)の構成で非負の滑らかな近似列 $f_n$ を選び、$\|T_tf_n-T_tf\|_2\le\|f_n-f\|_2$ とすれば $T_tf\ge0$ を得ます。さらに、もし $p_t(x_0,y_0)<0$ なら連続性により $y_0$ の近くで負です。その近傍に台を持つ非零の滑らかな $f\ge0$ を取れば $T_tf(x_0)=\int p_t(x_0,y)f(y)dV_g(y)<0$ となり矛盾します。よって $p_t\ge0$ です。

次に**厳密正値性**を半群性から示します。まず各 $s>0$、$x\in M$ で

$$
p_s(x,x)=\sum_je^{-s\lambda_j}\phi_j(x)^2\ge\phi_0(x)^2=V^{-1}>0.
$$

ある $t_0>0$ と $x,y$ で $p_{t_0}(x,y)=0$ と仮定します。任意の $0<s<t_0$ に対して、[熱核の半群性](#thm-ga5-kernel)と既に示した非負性から

$$
0=p_{t_0}(x,y)=\int_Mp_s(x,z)p_{t_0-s}(z,y)\,dV_g(z).
$$

被積分関数は連続かつ非負なので、全点で $p_s(x,z)p_{t_0-s}(z,y)=0$ です。とくに $z=x$ を代入すると $p_s(x,x)>0$ ですから $p_{t_0-s}(x,y)=0$ となります。$s$ は任意だったので、固定した二点 $(x,y)$ における関数 $t\mapsto p_t(x,y)$ は **すべての $0<t<t_0$ で零** です。

一方、各 $t_*>0$ と $|h|<t_*/2$ に対し、指数関数の級数を使うと

$$
p_{t_*+h}(x,y)
=\sum_{n=0}^{\infty}\frac{h^n}{n!}
\sum_j(-\lambda_j)^ne^{-t_*\lambda_j}\phi_j(x)\phi_j(y)
$$

とTaylor展開できます。和の交換は $\sum_je^{-(t_*-|h|)\lambda_j}|\phi_j(x)\phi_j(y)|<\infty$ という[熱核の絶対収束](#thm-ga5-kernel)で正当化されます。従って $t\mapsto p_t(x,y)$ は $(0,\infty)$ 上で実解析的です。局所Taylor展開の一意性により、開区間で零なら接続する近傍にも零が伝わり、すべての $t>0$ で $p_t(x,y)=0$ となります。

しかし $j=0$ 項は $V^{-1}$ で、$j\ge1$ について $\lambda_j\ge\lambda_1>0$、さらに $t\ge1$ では

$$
\left|\sum_{j\ge1}e^{-t\lambda_j}\phi_j(x)\phi_j(y)\right|
\le e^{-(t-1)\lambda_1}\sum_{j\ge1}e^{-\lambda_j}|\phi_j(x)\phi_j(y)|
\longrightarrow0
$$

です。右の級数が有限であることは熱核の絶対一様収束から従います。ゆえに $p_t(x,y)\to V^{-1}>0$ で矛盾しました。**放物型強最大値原理を外部の未証明結果として仮定せずに**厳密正値性が得られました。

最後に $T_t1=1$ は $\phi_0=V^{-1/2}$ と $\lambda_0=0$ より従い、積分表示に $f=1$ を代入して $\int_Mp_t(x,y)\,dV_g(y)=1$ です。$f\ge0$ が非零なら積分の中身が正である集合の体積は正だから $T_tf(x)>0$ です。
<!-- proof-end -->

この定理の意味は、$p_t(x,y)dV_g(y)$ が $x$ で時刻 $t$ の温度を計算する**非負・全質量1の重み**になることです。対称性のため $y$ を固定して $x$ で積分しても1です。

## 4. 長時間ではどこに近づくか

平均を $\bar f=V^{-1}\int_Mf\,dV_g$ とします。連結性のおかげで $\lambda_0=0$ は単純で、[GA4の第一正固有値](../GA4/index.md#cor-ga4-poincare-gap)は $\lambda_1>0$ です。

<a id="thm-ga5-longtime"></a>

<!-- formal-statement-start -->
> **定理（スペクトルギャップと長時間均一化）**  
> 上記多様体上で $f\in L^2(M)$、$t\ge0$ なら
>
$$
\|T_tf-\bar f\|_2\le e^{-\lambda_1t}\|f-\bar f\|_2.
$$
>
> また $t\to\infty$ のとき $p_t(x,y)\to V^{-1}$ が $M\times M$ 上一様に成立する。任意の時刻 $t_0>0$ と整数 $r\ge0$ に対し、適当な定数 $C_{r,t_0}$ があって
>
$$
\|p_t-V^{-1}\|_{C^r(M\times M)}
\le C_{r,t_0}e^{-\lambda_1(t-t_0)}
\qquad(t\ge t_0).
$$
<!-- formal-statement-end -->

### 証明の見取り図

平均は $\phi_0$ 成分、平均からのずれは $j\ge1$ の成分です。そこに $\lambda_j\ge\lambda_1$ を適用します。熱核の一様収束には、既に示した $t_0>0$ における微分級数の絶対収束を用います。

<!-- proof-start -->
### 証明

$f-\bar f=\sum_{j\ge1}c_j\phi_j$ だから

$$
\|T_tf-\bar f\|_2^2
=\sum_{j\ge1}e^{-2t\lambda_j}|c_j|^2
\le e^{-2t\lambda_1}\sum_{j\ge1}|c_j|^2.
$$

平方根を取ると第一の評価です。一方、熱核の第0項は $e^{-t\lambda_0}\phi_0(x)\phi_0(y)=V^{-1}$。従って

$$
p_t(x,y)-V^{-1}
=\sum_{j\ge1}e^{-(t-t_0)\lambda_j}
e^{-t_0\lambda_j}\phi_j(x)\phi_j(y).
$$

$t\ge t_0$ で $e^{-(t-t_0)\lambda_j}\le e^{-(t-t_0)\lambda_1}$。前定理で示した $t_0$ における各階導関数の絶対一様収束により、微分後の項の絶対値の総和はある有限定数 $C_{r,t_0}$ 以下です。評価式と一様収束を得ます。
<!-- proof-end -->

**連結性を外すと** $\lambda=0$ の固有関数は各連結成分で一定の関数になり、全空間にただ一つの $V^{-1}$ へは近づきません。失われるのは「零固有値の単純性」です。

## 5. 短時間のGaussian像を計算する

平坦トーラスでは、初期温度が一箇所へ集中しているとき、非常に短い時間にはEuclid空間のGaussianに似た温度分布が現れます。以下は**平坦トーラスでの完全な計算**です。一般の曲がった多様体上のparametrix全展開を証明したことにはしません。

<a id="thm-ga5-torus-gaussian"></a>

<!-- formal-statement-start -->
> **定理（平坦トーラスの周期化Gaussian熱核）**  
> $T^d=\mathbb R^d/(2\pi\mathbb Z)^d$ に標準平坦計量を入れる。$\theta,\eta\in T^d$ の代表を $\mathbb R^d$ で選び、$t>0$ とする。このとき熱核は次の二通りに書ける。
>
$$
p_t(\theta,\eta)
=\frac1{(2\pi)^d}\sum_{n\in\mathbb Z^d}e^{-t|n|^2}e^{in\cdot(\theta-\eta)}
=\frac1{(4\pi t)^{d/2}}\sum_{k\in\mathbb Z^d}
e^{-|\theta-\eta+2\pi k|^2/(4t)}.
$$
>
> 特に $t\downarrow0$ で
>
$$
p_t(\theta,\theta)=(4\pi t)^{-d/2}(1+O(e^{-c/t}))
$$
>
> となる $c>0$ が存在し、固定した $\theta,\eta$ について
>
$$
\lim_{t\downarrow0}-4t\log p_t(\theta,\eta)
=d_{T^d}(\theta,\eta)^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Fourier表示の各波数 $n$ の固有値は $|n|^2$ です。もう一方の式はEuclid空間のGaussianを $2\pi$ 周期で足したものです。両者のFourier係数を計算して一致を確かめます。短時間の指数の主要項は最短の格子移動、つまりトーラスの測地距離で決まります。

<!-- proof-start -->
### 証明

$\mathbb C$ 値Fourier基底 $(2\pi)^{-d/2}e^{in\cdot\theta}$ を使います（実数値関数への作用素は実部・虚部で同じです）。$L e^{in\cdot\theta}=|n|^2e^{in\cdot\theta}$ なので固有関数級数から最初の式が出ます。

$G_t(z)=(4\pi t)^{-d/2}e^{-|z|^2/(4t)}$ と置き、$F_t(z)=\sum_{k\in\mathbb Z^d}G_t(z+2\pi k)$ を作ります。Gaussianの減衰で級数は $t>0$ で一様収束して周期的です。その $n$ 番目のFourier係数は、積分区間を格子移動して $\mathbb R^d$ 全体へ並べると

$$
\frac1{(2\pi)^d}\int_{[0,2\pi]^d}F_t(z)e^{-in\cdot z}\,dz
=\frac1{(2\pi)^d}\int_{\mathbb R^d}G_t(z)e^{-in\cdot z}\,dz
=\frac{e^{-t|n|^2}}{(2\pi)^d}.
$$

最後のGaussian Fourier積分は、一変数積分 $I_t(a)=\int_{\mathbb R}(4\pi t)^{-1/2}e^{-z^2/(4t)}e^{-iaz}\,dz$ について部分積分で $I_t'(a)=-2taI_t(a)$、$I_t(0)=1$ を得て $I_t(a)=e^{-ta^2}$、その $d$ 個の積として計算しました。従って二表示のFourier係数がすべて一致し、滑らかな周期関数の一意なFourier展開から一致します。

対角線では $k=0$ の項が1、残りは $\sum_{k\ne0}e^{-\pi^2|k|^2/t}=O(e^{-c/t})$ です。一般の二点では $D=\min_{k\in\mathbb Z^d}|\theta-\eta+2\pi k|^2$ と置きます。この最小値がトーラスの距離の二乗です。最小値を実現する有限個の格子点の寄与は $m e^{-D/(4t)}$（$m\ge1$）、それ以外は $D$ より真に大きい離散的な長さを持つので、和は

$$
p_t(\theta,\eta)=(4\pi t)^{-d/2}e^{-D/(4t)}(m+o(1)).
$$

対数を取ると $-4t\log p_t=D+2dt\log(4\pi t)-4t\log(m+o(1))\to D$ です。切断跡では $m$ が複数になるだけで結論は同じです。
<!-- proof-end -->

曲がった多様体の正規座標でも局所的には $g_{ij}(x)=\delta_{ij}+O(|x|^2)$ なので、主要部分がEuclidのGaussianを思わせます。ただし、**この座標計算だけでは一般の $p_t$ のGaussian評価や短時間漸近式は証明されません**。曲率による振幅補正・最短測地路が複数になる箇所・誤差制御を伴うparametrixの構成は別の証明課題です。ここで確立した短時間評価の適用範囲は平坦トーラスに限ります。

## 6. 境界・非コンパクト・確率への接続

これまでの質量保存 $\int p_t=1$ は、境界なしのコンパクト多様体上で $T_t1=1$ を使った結果です。Dirichlet境界条件を課すと境界から熱が逃げ、一般に $\int p_t(x,y)\,dV_g(y)<1$ となります。Neumann境界条件なら、適切な自己共役実現を選ぶと定数関数が零固有値に残り、質量を保存します。この違いを**単に同じLaplacianへ別の名称を付けただけ**と解釈してはいけません。作用素領域と固有関数が変わります。

非コンパクト完備多様体では、コンパクトレゾルベント、$\lambda_1>0$、一様長時間極限は一般にありません。非コンパクト多様体では、境界がなくても熱が無限遠へ「逃げる」可能性を定義上排除できません。熱核が全質量を保存するかどうかを別の条件として区別します。

<a id="def-ga5-stochastic-completeness"></a>

<!-- formal-statement-start -->
> **定義（確率的完備性）**  
> $(M,g)$ を境界なしの連結なRiemann多様体とし、非負の最小熱核 $p_t(x,y)$ が存在すると仮定する。すべての $t>0$、$x\in M$ について

$$
\int_M p_t(x,y)\,dV_g(y)=1
$$

> が成り立つとき、$(M,g)$ は**確率的に完備**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga5-stochastic-completeness -->
**定義の確認**（実直線）：[PDE3の熱核表示](../../../解析系/PDE/PDE3/index.md#thm-pde3-whole-line)によれば、標準計量の $\mathbb R$ 上では $p_t(x,y)=(4\pi t)^{-1/2}e^{-(x-y)^2/(4t)}$ です。$z=(y-x)/(2\sqrt t)$ と置くと

$$
\int_{\mathbb R}p_t(x,y)\,dy
=\frac1{\sqrt\pi}\int_{\mathbb R}e^{-z^2}\,dz=1.
$$

$x,t$ は任意であり、$\mathbb R$ はこの定義を満たします。$\mathbb R$ は非コンパクトですが、これは「非コンパクトなら必ず質量が失われる」という主張が誤りであることも示します。
<!-- definition-example-end -->

測地的完備性だけから確率的完備性を無条件に結論してはいけません。


熱核を後続の確率解析における遷移密度と同一視する場合にも、生成作用素が $\Delta_g$ か $\tfrac12\Delta_g$ かという時間正規化と、一意性・質量保存を確認する必要があります。

## 7. 演習

### Level A

<a id="ex-ga5-a01"></a>
#### GA5-A01 円上の二周波数の時間発展
- Level: A

標準円で $f(\theta)=1+4\cos\theta-2\sin3\theta$ とする。$T_tf$ を求め、$t=0$ の初期値、$t\to\infty$ の極限、$\int_{S^1}T_tf\,d\theta$ を確かめよ。

<!-- solution-start -->
**詳細解答**

[熱半群の定義](#def-ga5-heat-semigroup)で定数の固有値は0、$\cos\theta$ は1、$\sin3\theta$ は9です。ゆえに

$$
T_tf(\theta)=1+4e^{-t}\cos\theta-2e^{-9t}\sin3\theta.
$$

$t=0$ を代入すると $f$ に戻り、$t\to\infty$ では二つの指数項が0へ向かうので1へ収束します。整数波数の正弦・余弦の一周期積分は0なので、どの $t$ でも $\int_0^{2\pi}T_tf\,d\theta=2\pi$ です。平均1が保存されています。
<!-- solution-end -->

<a id="ex-ga5-a02"></a>
#### GA5-A02 $L^2$ の縮小と厳密な等号条件
- Level: A

コンパクト連結境界なし多様体で、$t>0$ に対して $\|T_tf\|_2=\|f\|_2$ が成立する $f\in L^2(M)$ をすべて求めよ。

<!-- solution-start -->
**詳細解答**

[GA4の直交基底](../GA4/index.md#thm-ga4-spectral-basis)で $f=\sum_jc_j\phi_j$ とすると

$$
\|f\|_2^2-\|T_tf\|_2^2
=\sum_{j\ge1}(1-e^{-2t\lambda_j})|c_j|^2.
$$

$\lambda_j\ge\lambda_1>0$ と $t>0$ により各括弧は正です。よって差が0であることと、すべての $j\ge1$ で $c_j=0$ は同値です。従って $f=c_0\phi_0$、すなわち定数関数全体が答えです。逆に定数なら $T_tf=f$ なので等号を満たします。
<!-- solution-end -->

<a id="ex-ga5-a03"></a>
#### GA5-A03 熱核の対称性と積分
- Level: A

標準円の熱核のFourier表示から、(i) $p_t(\theta,\eta)=p_t(\eta,\theta)$、(ii) $\int_0^{2\pi}p_t(\theta,\eta)\,d\eta=1$、(iii) $\lim_{t\to\infty}p_t(\theta,\eta)=1/(2\pi)$ を示せ。

<!-- solution-start -->
**詳細解答**

[円の熱核](#def-ga5-heat-kernel)の確認例で得た

$$
p_t(\theta,\eta)=\frac1{2\pi}+\frac1\pi\sum_{n\ge1}e^{-tn^2}\cos(n(\theta-\eta))
$$

を使います。(i) $\cos$ は偶関数なので $\theta-\eta$ の符号を反転しても値は変わりません。(ii) $t>0$ で一様収束するから項別積分ができ、$\int_0^{2\pi}\cos(n(\theta-\eta))\,d\eta=0$、定数項の積分だけが $(2\pi)/(2\pi)=1$ です。(iii) $t\ge t_0>0$ では $|e^{-tn^2}\cos(\cdot)|\le e^{-t_0n^2}$ が可和なので、有限項と尾部を分けて $t\to\infty$ の極限を通せます。残るのは定数項です。
<!-- solution-end -->

<a id="ex-ga5-a04"></a>
#### GA5-A04 Gaussianの質量と幅
- Level: A

実直線の $G_t(z)=(4\pi t)^{-1/2}e^{-z^2/(4t)}$（$t>0$）について、全積分が1であること、幅を表す二次モーメント $\int_\mathbb Rz^2G_t(z)\,dz$ が $2t$ であることを示せ。

<!-- solution-start -->
**詳細解答**

$y=z/(2\sqrt t)$ と置くと $dz=2\sqrt t\,dy$ なので

$$
\int_\mathbb RG_t(z)\,dz=\frac1{\sqrt\pi}\int_\mathbb Re^{-y^2}\,dy=1.
$$

同じ変数変換を二次モーメントへ適用すると

$$
\int_\mathbb Rz^2G_t(z)\,dz
=\frac{4t}{\sqrt\pi}\int_\mathbb Ry^2e^{-y^2}\,dy.
$$

部分積分で $\int_\mathbb Ry^2e^{-y^2}\,dy=\tfrac12\int_\mathbb Re^{-y^2}\,dy=\sqrt\pi/2$ だから結果は $2t$ です。熱方程式 $\partial_tu=\partial_z^2u$ の幅が $\sqrt{2t}$ に対応します。
<!-- solution-end -->

### Level B

<a id="ex-ga5-b01"></a>
#### GA5-B01 熱半群から作用素を復元する
- Level: B

$f\in D(L)$、$f=\sum_jc_j\phi_j$ とする。$\lim_{t\downarrow0}t^{-1}(T_tf-f)=-Lf$ を $L^2$ で証明し、$f\notin D(L)$ では同じ支配評価を無条件に使用できない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

有限部分和では $(e^{-t\lambda_j}-1)/t\to-\lambda_j$ です。差の二乗和は

$$
\left\|\frac{T_tf-f}{t}+Lf\right\|_2^2
=\sum_j\left|\frac{e^{-t\lambda_j}-1}{t}+\lambda_j\right|^2|c_j|^2.
$$

$0\le1-e^{-a}\le a$（$a\ge0$）より $|(e^{-t\lambda_j}-1)/t|\le\lambda_j$。従って各項は $4\lambda_j^2|c_j|^2$ 以下です。[GA4の作用素領域](../GA4/index.md#thm-ga4-spectral-basis)から $f\in D(L)$ は $\sum_j\lambda_j^2|c_j|^2<\infty$ と同値なので、有限部分和の極限と尾部の一様評価で結論が出ます。$f\notin D(L)$ ではこの支配列は発散しうるため、同じ極限交換は正当化できません。
<!-- solution-end -->

<a id="ex-ga5-b02"></a>
#### GA5-B02 スペクトルギャップとエネルギー
- Level: B

$f\in L^2(M)$、$\bar f=V^{-1}\int_Mf\,dV_g$ とする。$u(t)=T_tf$ の平均零部分 $w(t)=u(t)-\bar f$ について、$t>0$ で $E(t)=\|w(t)\|_2^2$ と置く。[GA4の第一正固有値に基づく平均零評価](../GA4/index.md#cor-ga4-poincare-gap)から微分不等式を導き、解いて指数減衰を示せ。

<!-- solution-start -->
**詳細解答**

$T_t1=1$ から $\int_Mw(t)\,dV_g=0$ です。平滑化により $t>0$ で $w$ は滑らかなので、[Green公式](../GA1/index.md#thm-ga1-green-first)と[GA4のPoincaré不等式](../GA4/index.md#cor-ga4-poincare-gap)を順に使えば

$$
E'(t)=2(w,\Delta_gw)_2=-2\|\nabla_gw\|_2^2
\le-2\lambda_1\|w\|_2^2=-2\lambda_1E(t).
$$

従って $(e^{2\lambda_1t}E(t))'=e^{2\lambda_1t}(E'(t)+2\lambda_1E(t))\le0$。$0<s<t$ で $E(t)\le e^{-2\lambda_1(t-s)}E(s)$、$s\downarrow0$ では熱半群の強連続性により $E(s)\to\|f-\bar f\|_2^2$ です。平方根を取って $\|T_tf-\bar f\|_2\le e^{-\lambda_1t}\|f-\bar f\|_2$ を得ます。
<!-- solution-end -->

<a id="ex-ga5-b03"></a>
#### GA5-B03 周期化Gaussianの係数
- Level: B

$S^1$ で $F_t(z)=\sum_{k\in\mathbb Z}(4\pi t)^{-1/2}e^{-(z+2\pi k)^2/(4t)}$ とする。(i) $F_t$ が $2\pi$ 周期的であること、(ii) Fourier係数が $(2\pi)^{-1}e^{-tn^2}$ であること、(iii) $F_t(0)\sim(4\pi t)^{-1/2}$ を示せ。

<!-- solution-start -->
**詳細解答**

(i) $F_t(z+2\pi)$ の和の添字を $k'=k+1$ と置き換えると元の和になります。(ii) Gaussianの指数減衰で和と積分を交換し、区間 $[2\pi k,2\pi(k+1)]$ を並べると

$$
\frac1{2\pi}\int_0^{2\pi}F_t(z)e^{-inz}\,dz
=\frac1{2\pi}\int_\mathbb R(4\pi t)^{-1/2}e^{-z^2/(4t)}e^{-inz}\,dz
=\frac{e^{-tn^2}}{2\pi}.
$$

最後は[周期化Gaussianの定理](#thm-ga5-torus-gaussian)のGaussian Fourier積分です。(iii) $F_t(0)=(4\pi t)^{-1/2}(1+2\sum_{k\ge1}e^{-\pi^2k^2/t})$。$k^2\ge k$ だから

$$
0\le2\sum_{k\ge1}e^{-\pi^2k^2/t}
\le\frac{2e^{-\pi^2/t}}{1-e^{-\pi^2/t}}\longrightarrow0,
$$

よって比は1へ収束します。
<!-- solution-end -->

### Level C

<a id="ex-ga5-c01"></a>
#### GA5-C01 初期値・平滑化・保存則を結ぶ
- Level: C

コンパクト連結境界なし多様体 $(M,g)$ と $f\in L^2(M)$ を考える。$u(t)=T_tf$ に対し次を示せ。(i) $u$ は正の時間で滑らかかつ熱方程式を満たす。(ii) 初期値の平均が $\bar f$ なら、すべての $t>0$ で $\int_Mu(t)\,dV_g=V\bar f$。(iii) $u(t)\to\bar f$ が $L^2$ で成立し、その速度を定量化せよ。(iv) 「非コンパクト完備なら同じ証明で一様極限が得られる」という主張の破綻箇所を答えよ。

<!-- solution-start -->
**詳細解答**

(i) [熱半群の平滑化定理](#thm-ga5-heat-solution)を直接使うだけでなく、その仮定を確かめます。$M$ は滑らかなコンパクト境界なし、$f\in L^2$ です。任意の整数 $m$、$t>0$ で

$$
\sum_j\lambda_j^{2m}e^{-2t\lambda_j}|(f,\phi_j)_2|^2
\le\bigl(\sup_{r\ge0}r^{2m}e^{-2tr}\bigr)\|f\|_2^2<\infty.
$$

したがって $u(t)\in D(L^m)$、楕円正則性とSobolev埋め込みからすべての空間微分が存在します。時間微分は $\partial_tu=-Lu=\Delta_gu$ です。

(ii) $\phi_0=V^{-1/2}$、$\lambda_0=0$ なので $(u(t),\phi_0)_2=(f,\phi_0)_2$。両辺に $\sqrt V$ を掛けると $\int_Mu(t)\,dV_g=\int_Mf\,dV_g=V\bar f$ です。

(iii) [GA4の固有値ギャップ](../GA4/index.md#cor-ga4-poincare-gap)で $\lambda_j\ge\lambda_1>0$（$j\ge1$）。従って

$$
\|u(t)-\bar f\|_2^2
=\sum_{j\ge1}e^{-2t\lambda_j}|(f,\phi_j)_2|^2
\le e^{-2t\lambda_1}\|f-\bar f\|_2^2.
$$

これを平方根にすれば $\|u(t)-\bar f\|_2\le e^{-\lambda_1t}\|f-\bar f\|_2\to0$ です。

(iv) 非コンパクトでは [GA2の大域Rellich](../GA2/index.md#thm-ga2-rellich)を使えず、[GA4の離散固有値基底](../GA4/index.md#thm-ga4-spectral-basis)を同じ形で確保できません。また $\lambda_1>0$ や、$L^2$ に定数関数が属することも保証されません。したがって (ii) の定数零固有関数の議論と (iii) の $\lambda_1$ を使う議論は、どちらもそのまま移植できません。
<!-- solution-end -->

固有関数を指数減衰させる単純な発想から、熱核の滑らかさ・空間的な広がり・長時間の均一化まで到達しました。次は熱核が微分形式にも作用するとき、単なる関数のLaplacianとは何が異なるかを調べます。
