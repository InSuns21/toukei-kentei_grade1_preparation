# HPDE23 実Klein–Gordon解のシンプレクティック構造

[因果伝播子の短完全系列](../HPDE22/index.md#thm-hpde22-surjectivity-exact)から、空間コンパクトな斉次波動解はコンパクトな源の同値類で記述できました。しかし、解を足したり実数倍したりできるだけでは、二つの解の間に保存される「向き付きの面積」を測れません。量子場の構成にもつながる古典的な第一歩は、**時間発展で値が変わらず、しかも解を識別できる交代双線形形式**を作ることです。

初期時刻では、変位と速度の対から $u_0v_1-v_0u_1$ という組合せが自然に現れます。これを曲がった時空で各Cauchy面に移し、どの面で計算しても一致することを示します。最後に、[遅延引く先進の規約](../HPDE21/index.md#def-hpde21-causal-propagator)を使って、源の積分とこの形式の**負号**まで確かめます。

## 1. 実スカラー場と波動作用素

以下、$(M,g)$ は境界なし、時間向き付き、滑らかな大域双曲Lorentz時空で、次元は $n+1$（$n\ge1$）、計量の符号は $(-,+,\ldots,+)$ とします。

[滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)のレベルを $\Sigma_t$、その未来向き単位法線を $N$、誘導Riemann計量の正の体積密度を $d\mu_{\Sigma_t}$ とします。時空体積密度を $d\mu_g$ と書きます。

これまでの束値作用素は一般に自己随伴ではありませんでした。本講では**実数値のスカラー関数**に限定します。実ポテンシャル $V\in C^\infty(M,\mathbb R)$ を与え、関数 $u$ に作用する $\Box_g u=g^{ab}\nabla_a\nabla_bu$（Lorentz計量による波動作用素）を用います。$\nabla$ は関数の通常の共変微分です。

<a id="def-hpde23-real-kg"></a>

<!-- formal-statement-start -->
> **定義（実Klein–Gordon作用素）**
> 上記の滑らかなLorentz時空と実ポテンシャル $V$ に対し、実関数上の線形微分作用素を

$$
P=-\Box_g+V,
\qquad P:C^\infty(M,\mathbb R)\to C^\infty(M,\mathbb R)
$$

> と定める。$Pu=0$ を実Klein–Gordon方程式と呼ぶ。本講では特に $V=m^2+\xi R$（$m^2\ge0$、$\xi\in\mathbb R$、$R=g^{ab}\operatorname{Ric}_{ab}$ は[スカラー曲率](../../../幾何系/GEO/GEO16/index.md#def-geo16-ricci-scalar)）を含む任意の滑らかな実 $V$ を許す。
<!-- formal-statement-end -->

主シンボルは $-g^{ab}\zeta_a\zeta_b$ であるため、[normally hyperbolic作用素の定義](../HPDE5/index.md#def-hpde5-normally-hyperbolic)を満たします。$V$ が時間依存・空間依存でも、以下の保存則で必要なのは**同じ実 $V$ が両方の解に作用すること**です。$V\ge0$ という条件は不要です。

<!-- definition-example-start: def-hpde23-real-kg -->
### 直接例：平坦時空の質量付き方程式

**定義の確認**。$M=\mathbb R^{1+1}$、$g=-dt^2+dx^2$ とし、$V=m^2$（$m\ge0$）を取ります。定数計量では $\Box_g=-\partial_t^2+\partial_x^2$ です。ゆえに

$$
Pu=\partial_t^2u-\partial_x^2u+m^2u.
$$

係数は実数で滑らかであり、最高階部分は $-\Box_g$、零次部分は指定した $V$ です。$\omega=\sqrt{k^2+m^2}$ とすると $u=\cos(\omega t)\cos(kx)$ は

$$
Pu=(-\omega^2+k^2+m^2)u=0
$$

を満たします（$k\in\mathbb R$）。この平面波は一般に空間コンパクトではないため、後で定義する**面全体の積分**にはそのまま使いません。
<!-- definition-example-end -->

実関数 $a,b\in C_c^\infty(M,\mathbb R)$ について、形式的自己随伴性は[形式的随伴の定義](../HPDE4/index.md#def-hpde4-formal-adjoint)に照らし

$$
\int_M aPb\,d\mu_g=\int_M(Pa)b\,d\mu_g
$$

となることです。$\Box_g$ の二回の部分積分ではコンパクト支持により境界項が消え、$\int aVb=\int (Va)b$ となります。したがってこの $P$ は形式的自己随伴です。一般の束値normally hyperbolic作用素について同じ結論は出ません。

## 2. 二つの解から保存電流を作る

一つの解の二乗では初期変位と速度の**順序**を記録できません。二つの実関数 $u,v$ を交換すると符号が変わる組合せを作り、その発散が方程式で消えるかを調べます。ベクトル場 $j^a$ は上付き添字によりベクトルの成分であり、$\nabla^a=g^{ab}\nabla_b$ です。

<a id="def-hpde23-current"></a>

<!-- formal-statement-start -->
> **定義（Klein–Gordon保存電流）**
> 滑らかなLorentz時空 $(M,g)$ と実数値の滑らかな関数 $u,v$ に対して、ベクトル場 $j(u,v)$ を

$$
j^a(u,v):=u\nabla^av-v\nabla^au
$$

> と定める。$j(v,u)=-j(u,v)$、$j(u,u)=0$ が成り立つ。二つの関数が同じ実Klein–Gordon方程式を満たす場合、次の命題により発散が零となるので保存電流と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde23-current -->
### 直接例：時間振動の二つの解

**定義の確認**。$M=\mathbb R\times S^1$、$g=-dt^2+d\theta^2$、$V=\mu^2$（$\mu>0$）とし、$u=\cos(\mu t)$、$v=\sin(\mu t)/\mu$ とします。どちらも $P=\partial_t^2-\partial_\theta^2+\mu^2$ に対して零解です。$\nabla^t=-\partial_t$、$\nabla^\theta=\partial_\theta$ なので

$$
j^t=-\{u\partial_tv-v\partial_tu\}=-1,
\qquad j^\theta=0.
$$

$\nabla_a j^a=\partial_t(-1)+\partial_\theta0=0$ です。$u,v$ の順を入れ替えると $j^t=+1$ となり、同じ関数を二つ入れれば零です。定義の交代性と保存性を直接検算できました。
<!-- definition-example-end -->

<a id="prop-hpde23-current-divergence"></a>

<!-- formal-statement-start -->
> **命題（保存電流の発散恒等式）**
> $(M,g)$ を滑らかなLorentz時空、$P=-\Box_g+V$ を滑らかな実ポテンシャル $V$ を持つ実スカラー作用素とする。任意の実数値 $u,v\in C^\infty(M)$ に対して

$$
\nabla_a j^a(u,v)=vPu-uPv
$$

> である。特に $Pu=Pv=0$ なら $\nabla_a j^a(u,v)=0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

積の微分で現れる一次微分の積は相殺し、二階微分だけが残ります。さらに $V$ の項は $uv=vu$ なので相殺します。これが実スカラー作用素へ絞る理由です。

<!-- proof-start -->
### 証明

共変微分の積の法則を二項それぞれに適用します。

$$
\begin{aligned}
\nabla_a j^a
&=\nabla_a(u\nabla^av)-\nabla_a(v\nabla^au)\\
&=(\nabla_au)(\nabla^av)+u\Box_gv\\
&\quad-(\nabla_av)(\nabla^au)-v\Box_gu.
\end{aligned}
$$

計量の対称性から $(\nabla_au)(\nabla^av)=(\nabla_av)(\nabla^au)$ です。従って

$$
\nabla_a j^a=u\Box_gv-v\Box_gu.
$$

$Pu=-\Box_gu+Vu$ と $Pv=-\Box_gv+Vv$ を代入すると

$$
\begin{aligned}
vPu-uPv
&=v(-\Box_gu+Vu)-u(-\Box_gv+Vv)\\
&=u\Box_gv-v\Box_gu+V(vu-uv)\\
&=u\Box_gv-v\Box_gu.
\end{aligned}
$$

これで任意の $u,v$ に対する式が成立し、斉次解では右辺が零です。$\square$
<!-- proof-end -->

ポテンシャルが異なる $P_1=-\Box_g+V_1$ の解 $u$ と $P_2=-\Box_g+V_2$ の解 $v$ を組にすると、$\Box_gu=V_1u$、$\Box_gv=V_2v$ より

$$
\nabla_a j^a(u,v)=(V_2-V_1)uv.
$$

同一の実ポテンシャルという仮定を落とすと、保存機構そのものが壊れる例です。

## 3. Cauchy面で積分する

[空間コンパクトな斉次解の空間](../HPDE21/index.md#def-hpde21-spatial-solution)を、今回は実数値の $P$ に対して $\operatorname{Sol}_{\mathrm{sc}}(P)$ と記します。任意の $u,v$ の台はそれぞれあるコンパクト $K_u,K_v$ の因果影 $J(K_u),J(K_v)$ に入ります。

Cauchy面 $\Sigma$ に沿って $j$ を積分するには、未来向き単位法線 $N$ と正の誘導体積密度を使います。$N_a=g_{ab}N^b$ を用いると、フラックスは

$$
N_aj^a(u,v)=uN(v)-vN(u).
$$

一見すると無限に広い $\Sigma$ で積分するため発散しそうですが、[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)によって $J(K_u\cup K_v)\cap\Sigma$ はコンパクトです。積分される関数の台はこの集合に入り、面全体の積分は有限です。

[交代双線形形式](../../../幾何系/SYM/SYM1/index.md#def-sym1-alternating-form)という既習概念を、ここでは無限次元の実解空間へ適用します。交代性だけでは解を区別できるとは限りません。そこでまず候補を定義し、面の取り方に依存しないことと非退化性を別々に証明します。

<a id="def-hpde23-symplectic"></a>

<!-- formal-statement-start -->
> **定義（解空間のシンプレクティック形式）**
> 境界なし、時間向き付き、滑らかな大域双曲Lorentz時空 $(M,g)$、実スカラー作用素 $P=-\Box_g+V$（$V$ は滑らかな実関数）、滑らかな空間的Cauchy面 $\Sigma$ とその未来向き単位法線 $N$ に対し、$u,v\in\operatorname{Sol}_{\mathrm{sc}}(P)$ 上の実双線形形式を

$$
\Omega_\Sigma(u,v)
:=\int_\Sigma\bigl(uN(v)-vN(u)\bigr)\,d\mu_\Sigma
$$

> と定める。面独立性と非退化性を以下で示し、その後は $\Omega$ と書く。ここでシンプレクティック形式とは、実ベクトル空間上の**交代かつ非退化な双線形形式**のことである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde23-symplectic -->
### 直接例：円周上の調和振動子

**定義の確認**。第2節の $M=\mathbb R\times S^1$、$u=\cos(\mu t)$、$v=\sin(\mu t)/\mu$ を使います。各 $\Sigma_t\simeq S^1$ はコンパクトなので両解は空間コンパクトであり、$N=\partial_t$、$d\mu_{\Sigma_t}=d\theta$ です。被積分関数は

$$
u\partial_tv-v\partial_tu
=\cos^2(\mu t)+\sin^2(\mu t)=1.
$$

従って $\Omega_{\Sigma_t}(u,v)=\int_0^{2\pi}1\,d\theta=2\pi$ で、$t$ に依存しません。入れ替えると $-2\pi$、同一解同士では零です。この例の二つの解は退化しておらず、一般の非退化性の証明は第5節で行います。
<!-- definition-example-end -->

<a id="thm-hpde23-slice-independence"></a>

<!-- formal-statement-start -->
> **定理（Cauchy面によらないシンプレクティック積分）**
> 境界のない時間向き付き滑らかな大域双曲Lorentz時空 $(M,g)$、滑らかな実ポテンシャル $V$、$P=-\Box_g+V$ とする。$u,v\in\operatorname{Sol}_{\mathrm{sc}}(P)$ に対して、二つの滑らかな空間的Cauchy面 $\Sigma_0,\Sigma_1$ をいずれも未来向き単位法線で測れば

$$
\Omega_{\Sigma_0}(u,v)=\Omega_{\Sigma_1}(u,v).
$$

> 特に滑らかなCauchy時間関数の全てのレベル面で値は一定である。
<!-- formal-statement-end -->

### 証明の見取り図

[保存電流の発散恒等式](#prop-hpde23-current-divergence)が零です。[Stokesの境界収支](../HPDE7/index.md#thm-hpde7-stokes-balance)を使うと上下のフラックス差は零になります。ただし、**非コンパクト時空へそのままStokesを適用しない**ため、電流が零になる外側で空間カットオフを選び、余分な側面積分を消します。

<!-- proof-start -->
### 証明

まず $\Sigma_a,\Sigma_b$ が一つの滑らかなCauchy時間関数 $T$ のレベル面（$a<b$）である場合を示します。$K=K_u\cup K_v$ はコンパクトで、$j$ の台は $J(K)$ に含まれます。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)より

$$
C=J(K)\cap T^{-1}([a,b])
$$

はコンパクトです。$C$ の開近傍で $1$ となる滑らかな空間カットオフ $\rho\in C_c^\infty(M)$ を取ります。$T^{-1}([a,b])$ 上で $j$ が非零である位置と、$\rho$ の微分の台は交わらないように選べるので、その帯の中で

$$
\nabla_a(\rho j^a)
=\rho\nabla_aj^a+(\nabla_a\rho)j^a=0.
$$

$\rho j$ はコンパクト支持です。時間帯で[Stokesの境界の向き](../HPDE7/index.md#thm-hpde7-stokes-balance)を使うと、上側の外向き共法線は $-N_b^\flat$、下側は $N_a^\flat$ なので

$$
\begin{aligned}
0
&=\int_{T^{-1}([a,b])}\nabla_a(\rho j^a)\,d\mu_g\\
&=-\int_{\Sigma_b}N_{b,a}j^a\,d\mu_{\Sigma_b}
+\int_{\Sigma_a}N_{a,a}j^a\,d\mu_{\Sigma_a}\\
&=-\Omega_{\Sigma_b}(u,v)+\Omega_{\Sigma_a}(u,v).
\end{aligned}
$$

これでレベル面間の等式が従います。

一般の滑らかな空間的Cauchy面 $S_0,S_1$ については、まず**二つの面の間で電流が現れる部分がコンパクト**であることを確かめます。各 $S_i$ は、それをレベル面とする滑らかなCauchy時間関数を選べます（[任意の初期面を時刻零に取る大域Cauchy設定](../HPDE16/index.md#def-hpde16-global-cauchy)）。従って各 $J(K)\cap S_i$ は[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)からコンパクトです。

たとえば $p\in J^+(K)$ が $S_0$ の未来で $S_1$ の過去にある場合を考えます。$p$ から未来向き因果曲線を $S_1$ まで延長して、その交点を $q$ とします。$q\in J^+(K)\cap S_1$ ですから

$$
p\in J^+(K)\cap J^-(J^+(K)\cap S_1).
$$

右辺はコンパクト集合二つの間の因果ダイヤモンドであり、[コンパクト因果ダイヤモンドの性質](../HPDE19/index.md#lem-hpde19-causal-overlap)によりコンパクトです。同じ向きの領域で $p\in J^-(K)$ なら、$p$ から過去へ $S_0$ まで延長して、$J^+(J^-(K)\cap S_0)\cap J^-(K)$ に収めます。$S_1$ が先に来る領域でも二つの面を交換すれば同じです。したがって $J(K)$ と二つのCauchy面に挟まれた領域の交差は有限個のコンパクトな因果ダイヤモンドに含まれます。

この有限個のコンパクト集合を包むカットオフ $\rho$ を取り、二つの面に挟まれた領域の各部分に[Stokesの境界収支](../HPDE7/index.md#thm-hpde7-stokes-balance)を適用します。面が交わる場合は「$S_0$ が先・$S_1$ が後」の部分と逆順の部分に分け、逆順の部分では符号を反転させます。内部で現れる面境界は互いに逆向きで相殺され、$\rho j$ は外側で零です。結果は両面のフラックス差だけになり、先ほどと同じく

$$
0=-\Omega_{S_1}(u,v)+\Omega_{S_0}(u,v)
$$

を得ます。接している面を境に区分する場合も、滑らかな近似でStokesを適用し、コンパクト支持の被積分関数に対する極限を取れます。$\square$
<!-- proof-end -->

この定理は $\Omega$ が**保存する**ことを言います。あらかじめ $\Omega=0$ という意味ではありません。ポテンシャルが時間依存でも第2節の相殺は変わらないため、同じ保存が成立します。

## 4. 初期値対に戻す

任意の滑らかな空間的Cauchy面 $\Sigma$ 上の初期変位・法線初速度を

$$
u_0=u|_\Sigma,\quad u_1=N(u)|_\Sigma,
\qquad v_0=v|_\Sigma,\quad v_1=N(v)|_\Sigma
$$

と書きます。実スカラーの場合、[Cauchyデータの定義](../HPDE6/index.md#def-hpde6-cauchy-data)に出る接続は通常微分です。従って形式は

$$
\Omega(u,v)=\int_\Sigma(u_0v_1-v_0u_1)\,d\mu_\Sigma
$$

となります。$u_0$ と $v_1$ の掛ける順は交換できますが、**二つの項の引く順**は固定しました。

<a id="thm-hpde23-nondegenerate"></a>

<!-- formal-statement-start -->
> **定理（解空間のシンプレクティック非退化性）**
> 境界なしの時間向き付き滑らかな大域双曲Lorentz時空 $(M,g)$ と実スカラー作用素 $P=-\Box_g+V$（$V\in C^\infty(M,\mathbb R)$）について、$\operatorname{Sol}_{\mathrm{sc}}(P)$ 上の $\Omega$ は実双線形・交代かつ非退化である。すなわち

$$
\bigl[\forall v\in\operatorname{Sol}_{\mathrm{sc}}(P),\ \Omega(u,v)=0\bigr]
\quad\Longrightarrow\quad u=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

面上の積分を零にする相手を**任意に選べること**が決め手です。[大域Cauchy存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)により、任意のコンパクトな変位・速度の対が一つの空間コンパクトな解を作ります。片方だけ非零にする選び方で、$u_0,u_1$ をそれぞれ検出します。

<!-- proof-start -->
### 証明

双線形性は積分と微分の線形性から、交代性は $u_0v_1-v_0u_1$ から直ちに従います。非退化性を示します。

$\Omega(u,v)=0$ が全ての $v\in\operatorname{Sol}_{\mathrm{sc}}(P)$ に対して成立するとします。$u$ が空間コンパクトなので、そのCauchyデータ $u_0,u_1$ は各々 $C_c^\infty(\Sigma)$ に属します（[sc支持と有限時間因果影](../HPDE20/index.md#def-hpde20-support-classes)、[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)）。

まず初期データ $(v_0,v_1)=(0,u_0)$ を指定します。実スカラー $P$ はnormally hyperbolicで、データは滑らかでコンパクト支持です。[大域Cauchy存在一意性定理](../HPDE16/index.md#thm-hpde16-global-cauchy)は斉次方程式 $Pv=0$ の一意な滑らかな解 $v$ を与え、有限伝播によりscになります。そこで

$$
0=\Omega(u,v)
=\int_\Sigma u_0^2\,d\mu_\Sigma.
$$

被積分関数は非負連続です。もし $u_0(x_0)\ne0$ なら近傍で $u_0^2>c>0$ となって正の体積を持ち、積分が正になって矛盾します。よって $u_0=0$ です。

次に $(v_0,v_1)=(u_1,0)$ を指定して同じ定理からsc解 $v$ を得ます。すると

$$
0=\Omega(u,v)
=-\int_\Sigma u_1^2\,d\mu_\Sigma
$$

より $u_1=0$ です。$u$ は零の変位・速度を持つ斉次解なので、[大域Cauchy一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)により $u=0$ です。$\square$
<!-- proof-end -->

この非退化性は、単に $\Omega(u,u)=0$ という交代性からは出ません。全ての相手 $v$ との積分が零なら $u$ 自身が零になる、という一段強い性質です。複素場でHermitian内積を構成する議論とも区別します。

## 5. 因果伝播子から同じ形式を読む

[因果伝播子](../HPDE21/index.md#def-hpde21-causal-propagator)は、コンパクトな実数値の源 $f$ を斉次解へ送る写像

$$
E_{\mathrm{cau}}:=G_{\mathrm{ret}}-G_{\mathrm{adv}}:
C_c^\infty(M,\mathbb R)\to\operatorname{Sol}_{\mathrm{sc}}(P)
$$

です。この順は定義済みなので変えません。$f$ と斉次解 $v$ を時空体積密度で積分する対を $\langle f,v\rangle=\int_Mfv\,d\mu_g$ と記します。$f$ がコンパクト支持なので $v$ は非コンパクトでも積分は有限です。

保存電流の[発散恒等式](#prop-hpde23-current-divergence)を、今度は斉次解ではない遅延解 $w=G_{\mathrm{ret}}f$ と斉次解 $v$ に適用すると

$$
\nabla_a j^a(w,v)=vPw-wPv=vf.
$$

したがって源を挟む二つのCauchy面でフラックスを比べれば、時空積分と面積分を結び付けられます。ここでは**未来側境界の外向き共法線が $-N^\flat$** であるため、符号が負になります。

<a id="prop-hpde23-green-pairing"></a>

<!-- formal-statement-start -->
> **命題（因果伝播子と源の積分対の符号）**
> $(M,g)$ は境界なしの時間向き付き滑らかな大域双曲Lorentz時空、$P=-\Box_g+V$ は滑らかな実ポテンシャルを持つ実スカラー作用素とする。$E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ とし、$f,h\in C_c^\infty(M,\mathbb R)$、$v\in\operatorname{Sol}_{\mathrm{sc}}(P)$ とする。このとき

$$
\boxed{\Omega(E_{\mathrm{cau}}f,v)=-\int_Mfv\,d\mu_g.}
$$

> 特に

$$
\Omega(E_{\mathrm{cau}}f,E_{\mathrm{cau}}h)
=-\int_M f(E_{\mathrm{cau}}h)\,d\mu_g
$$

> が成り立ち、$\int_M f(E_{\mathrm{cau}}h)\,d\mu_g=-\int_M(E_{\mathrm{cau}}f)h\,d\mu_g$ である。
<!-- formal-statement-end -->

### 証明の見取り図

源より前では遅延解が零、源より後では先進解が零なので、未来の面で遅延解は $E_{\mathrm{cau}}f$ と一致します。電流の発散を帯で積分し、境界の向きに注意すると負号が出ます。最後の反対称性は得られた式に $v=E_{\mathrm{cau}}h$ を入れ、$\Omega$ の交代性を使います。

<!-- proof-start -->
### 証明

$f=0$ の場合は線形性により両辺が零です。以下 $f\ne0$ とし、$K=\operatorname{supp}f$ をコンパクト集合とします。[滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)の時間 $T$ について、$a<\min T(K)$、$b>\max T(K)$ と選びます。$\Sigma_a,\Sigma_b$ を対応するCauchy面とします。

$w=G_{\mathrm{ret}}f$ を取ると、[Greenの方程式と因果的支持](../HPDE18/index.md#thm-hpde18-green-existence)から $Pw=f$、$\operatorname{supp}w\subset J^+(K)$ です。ゆえに $\Sigma_a$ 付近で $w=0$、また $\Sigma_b$ 付近で $G_{\mathrm{adv}}f=0$ であり

$$
w|_{\Sigma_b}=(E_{\mathrm{cau}}f)|_{\Sigma_b},\qquad
N(w)|_{\Sigma_b}=N(E_{\mathrm{cau}}f)|_{\Sigma_b}.
$$

$v$ は空間コンパクトなので、$\operatorname{supp}v\subset J(L)$ となるコンパクト $L$ を取れます。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)より $J(K\cup L)\cap T^{-1}([a,b])$ はコンパクトです。電流 $j(w,v)$ の台はこの集合に含まれるため、帯の中でその近傍に等しい $1$ を取るコンパクト支持カットオフを掛けてStokes公式を適用できます。カットオフ微分と電流が重なる領域はありません。

[電流の発散恒等式](#prop-hpde23-current-divergence)で $Pw=f$、$Pv=0$ を使い、[Stokesの境界の向き](../HPDE7/index.md#thm-hpde7-stokes-balance)で上面と下面を分けると

$$
\begin{aligned}
\int_M fv\,d\mu_g
&=\int_{T^{-1}([a,b])}\nabla_a j^a(w,v)\,d\mu_g\\
&=-\Omega_{\Sigma_b}(w,v)+\Omega_{\Sigma_a}(w,v)\\
&=-\Omega_{\Sigma_b}(E_{\mathrm{cau}}f,v)+0.
\end{aligned}
$$

最初の等号では $\operatorname{supp}f\subset T^{-1}((a,b))$ を使いました。最後は過去側の $w=0$ と未来側の $w=E_{\mathrm{cau}}f$ を使いました。[Cauchy面独立性](#thm-hpde23-slice-independence)で $\Omega_{\Sigma_b}=\Omega$ と書けます。これが第一式です。

$v=E_{\mathrm{cau}}h$ は[因果伝播子の斉次解・支持](../HPDE21/index.md#prop-hpde21-propagator-identities)により $\operatorname{Sol}_{\mathrm{sc}}(P)$ に属します。第一式へ代入して第二式を得ます。さらに $\Omega$ の交代性から

$$
\begin{aligned}
-\int_M f(E_{\mathrm{cau}}h)\,d\mu_g
&=\Omega(E_{\mathrm{cau}}f,E_{\mathrm{cau}}h)\\
&=-\Omega(E_{\mathrm{cau}}h,E_{\mathrm{cau}}f)\\
&=\int_M h(E_{\mathrm{cau}}f)\,d\mu_g.
\end{aligned}
$$

両辺の符号を戻せば積分対の反対称性も成立します。$\square$
<!-- proof-end -->

### 符号の短い独立検算

平坦円筒 $M=\mathbb R\times S^1$ の空間定数モードで $P=\partial_t^2+\mu^2$（$\mu>0$）を考えます。時刻 $s$ の点源に対応する遅延応答は $\theta(t-s)\sin(\mu(t-s))/\mu$、先進応答は $-\theta(s-t)\sin(\mu(t-s))/\mu$ です（ここでは時刻Dirac分布を符号検算にだけ使います）。従って差は $\sin(\mu(t-s))/\mu$ です。

時刻 $0$ と $a>0$ の点源からできる解を $u(t)=\sin(\mu t)/\mu$、$v(t)=\sin(\mu(t-a))/\mu$ とすれば

$$
u(0)=0,\quad u'(0)=1,\quad
v(0)=-\frac{\sin(\mu a)}{\mu},\quad v'(0)=\cos(\mu a),
$$

$$
\Omega(u,v)=2\pi\{u(0)v'(0)-v(0)u'(0)\}
=\frac{2\pi\sin(\mu a)}{\mu}.
$$

他方、源の時刻零における $v(0)$ は $-\sin(\mu a)/\mu$ なので、面の長さ $2\pi$ を掛けた $-\langle f,v\rangle$ と一致します。分布源は命題の滑らかな源の仮定には含まれませんが、時間方向に滑らかな近似を取ると同じ符号を確認できます。

## 6. コンパクト源の商空間へ移す

[HPDE22の商空間同型](../HPDE22/index.md#cor-hpde22-quotient-isomorphism)により、因果伝播子はコンパクト源 $f$ の同値類 $[f]$ を空間コンパクト解へ一対一に対応させます。二つの源が $P\varphi$ だけ違っても同じ解になります。したがって解の形式を源側で計算するには、$f$ を同値類の代表として選んだとき値が変わらないことを確認しなければなりません。

<a id="cor-hpde23-quotient-form"></a>

<!-- formal-statement-start -->
> **系（コンパクト源の商への誘導形式）**
> $(M,g)$ は境界なしの時間向き付き滑らかな大域双曲Lorentz時空、$P=-\Box_g+V$ は滑らかな実ポテンシャル $V$ を持つ実スカラー作用素とする。実ベクトル空間

$$
\mathcal Q:=C_c^\infty(M,\mathbb R)/P C_c^\infty(M,\mathbb R)
$$

> の二つの同値類 $[f],[h]$ に対して

$$
\omega_{\mathcal Q}([f],[h])
:=-\int_M f(E_{\mathrm{cau}}h)\,d\mu_g
$$

> は代表の取り方によらない交代・非退化な実双線形形式であり、商から $\operatorname{Sol}_{\mathrm{sc}}(P)$ への同型 $[f]\mapsto E_{\mathrm{cau}}f$ は $\omega_{\mathcal Q}$ を $\Omega$ に一致させる。
<!-- formal-statement-end -->

### 証明の見取り図

代表が $P\varphi$ だけ変化しても、[因果伝播子の零合成](../HPDE21/index.md#prop-hpde21-propagator-identities)によって解が変わりません。[因果伝播子と源の積分対の符号](#prop-hpde23-green-pairing)を使って、商側の形式が解側の $\Omega$ そのものであることを示せば、交代性・非退化性が移ります。

<!-- proof-start -->
### 証明

まず $[f]=[f+P\varphi]$（$\varphi\in C_c^\infty$）とします。[零合成](../HPDE21/index.md#prop-hpde21-propagator-identities)から

$$
E_{\mathrm{cau}}(f+P\varphi)
=E_{\mathrm{cau}}f+E_{\mathrm{cau}}P\varphi
=E_{\mathrm{cau}}f.
$$

第二引数の代表 $h+P\psi$ も同様に同じ解になります。[因果伝播子と源の積分対の符号](#prop-hpde23-green-pairing)を両代表に適用すると

$$
\begin{aligned}
-\int_M(f+P\varphi)E_{\mathrm{cau}}(h+P\psi)\,d\mu_g
&=\Omega(E_{\mathrm{cau}}(f+P\varphi),E_{\mathrm{cau}}(h+P\psi))\\
&=\Omega(E_{\mathrm{cau}}f,E_{\mathrm{cau}}h)\\
&=-\int_MfE_{\mathrm{cau}}h\,d\mu_g.
\end{aligned}
$$

よって両方の代表に依存せず、双線形・交代です。[商空間同型](../HPDE22/index.md#cor-hpde22-quotient-isomorphism)は全単射で、[解空間の非退化性](#thm-hpde23-nondegenerate)があるので、任意の $[h]$ との値が零なら $E_{\mathrm{cau}}f=0$、従って $[f]=[0]$ です。非退化性と同型の主張が従います。$\square$
<!-- proof-end -->

この段階で得たのは**古典的な実線形解空間**とそのシンプレクティック形式です。これ自体が量子状態や交換関係式を定めるわけではありません。次に代数的量子場理論へ進むときに、この形式が入力データになります。

## 7. 演習

### Level A：定義・符号・基本計算

<a id="ex-hpde23-a01"></a>

#### HPDE23-A01 保存電流の発散

- Level: A

滑らかなLorentz時空で $P=-\Box_g+V$、$V$ は実数値の滑らかな関数とする。滑らかな実関数 $u,v$ に対して $j^a=u\nabla^av-v\nabla^au$ を共変微分の積の法則で展開せよ。さらに $Pu=Pv=0$ の場合の発散を求めよ。

<!-- solution-start -->
**詳細解答**。まず

$$
\begin{aligned}
\nabla_a(u\nabla^av)&=(\nabla_au)(\nabla^av)+u\Box_gv,\\
\nabla_a(v\nabla^au)&=(\nabla_av)(\nabla^au)+v\Box_gu.
\end{aligned}
$$

計量の対称性で一次微分の積が打ち消し合い、発散は $u\Box_gv-v\Box_gu$ です。$Pu=0$ から $\Box_gu=Vu$、$Pv=0$ から $\Box_gv=Vv$ なので

$$
\nabla_a j^a=u(Vv)-v(Vu)=V(uv-vu)=0.
$$

実スカラーの乗法交換性と両方で同じポテンシャルを使ったことを確認しました。
<!-- solution-end -->

<a id="ex-hpde23-a02"></a>

#### HPDE23-A02 異なるポテンシャルの落とし穴

- Level: A

実関数 $u,v$ がそれぞれ $(-\Box_g+V_1)u=0$、$(-\Box_g+V_2)v=0$ を満たすとする。第2節の電流の発散を求め、$V_1\ne V_2$ でも必ず保存するといえるか答えよ。

<!-- solution-start -->
**詳細解答**。二つの方程式を別々に展開して $\Box_gu=V_1u$、$\Box_gv=V_2v$ を得ます。[発散恒等式の証明](#prop-hpde23-current-divergence)で得た、ポテンシャルを使う前の式へ代入すると

$$
\nabla_aj^a=u\Box_gv-v\Box_gu
=uV_2v-vV_1u=(V_2-V_1)uv.
$$

例えばMinkowski平面で $V_1=0$、$V_2=1$ とし、$u=1$、$v=\cos t$ を取れば、$(-\Box_g+1)v=(\partial_t^2+1)\cos t=0$、$-\Box_g u=0$ です。このとき $\nabla_a j^a=\cos t$ となり、常には零ではありません。
<!-- solution-end -->

<a id="ex-hpde23-a03"></a>

#### HPDE23-A03 円筒上の面積分

- Level: A

$M=\mathbb R\times S^1$、$g=-dt^2+d\theta^2$、$P=\partial_t^2-\partial_\theta^2+\mu^2$（$\mu>0$）とする。$u=\cos\mu t$、$v=\sin\mu t/\mu$ について $Pu,Pv$ および $\Omega_{\Sigma_t}(u,v)$ を計算せよ。ただし円周の長さは $2\pi$ とする。

<!-- solution-start -->
**詳細解答**。空間微分は零です。時間二階微分は $u''=-\mu^2u$、$v''=-\mu^2v$ なので $Pu=Pv=0$。$N=\partial_t$、$d\mu_\Sigma=d\theta$、$u'=-\mu\sin\mu t$、$v'=\cos\mu t$ より

$$
\begin{aligned}
\Omega_{\Sigma_t}(u,v)
&=\int_0^{2\pi}(uv'-vu')\,d\theta\\
&=2\pi\bigl(\cos^2\mu t+\sin^2\mu t\bigr)=2\pi.
\end{aligned}
$$

面独立性と正の符号が確認できます。$\Omega(v,u)=-2\pi$ です。
<!-- solution-end -->

<a id="ex-hpde23-a04"></a>

#### HPDE23-A04 初期データの交代性

- Level: A

滑らかな空間的Cauchy面 $\Sigma$ 上の実コンパクト支持初期データ $(u_0,u_1)$、$(v_0,v_1)$ に対し

$$
B((u_0,u_1),(v_0,v_1))
=\int_\Sigma(u_0v_1-v_0u_1)\,d\mu_\Sigma
$$

を定める。双線形性、交代性と $B((u_0,u_1),(u_0,u_1))$ を確認せよ。

<!-- solution-start -->
**詳細解答**。各積分項は一方のデータを固定すればもう一方に線形なので、和・実数倍それぞれに線形です。データを入れ替えると

$$
\begin{aligned}
B((v_0,v_1),(u_0,u_1))
&=\int_\Sigma(v_0u_1-u_0v_1)\,d\mu_\Sigma\\
&=-B((u_0,u_1),(v_0,v_1)).
\end{aligned}
$$

同じ対を二つ入れると被積分関数が $u_0u_1-u_0u_1=0$ なので $B((u_0,u_1),(u_0,u_1))=0$ です。これだけでは非退化性は証明されず、任意の相手との組合せを調べる必要があります。
<!-- solution-end -->

### Level B：支持・Stokes・非退化性・商

<a id="ex-hpde23-b01"></a>

#### HPDE23-B01 時間帯での支持と面独立性

- Level: B

境界なし大域双曲時空でCauchy時間関数 $T$ を固定し、$u,v\in\operatorname{Sol}_{\mathrm{sc}}(P)$ は同じ実 $P=-\Box_g+V$ の解とする。コンパクト $K_u,K_v$ について $\operatorname{supp}u\subseteq J(K_u)$、$\operatorname{supp}v\subseteq J(K_v)$ とする。$a<b$ の間で電流の台がコンパクトであることを示し、外側境界項を作らず $\Omega_{\Sigma_a}=\Omega_{\Sigma_b}$ を導け。

<!-- solution-start -->
**詳細解答**。$K=K_u\cup K_v$ はコンパクトです。$u,v$ が零の開集合ではその微分も零なので、[電流の定義](#def-hpde23-current)から $\operatorname{supp}j(u,v)\subseteq J(K)$ です。[有限時間因果影のコンパクト性](../HPDE16/index.md#lem-hpde16-shadow-compact)を $K,[a,b]$ に適用すると

$$
C=J(K)\cap T^{-1}([a,b])
$$

はコンパクトです。$C$ の近傍で $1$ となるコンパクト支持関数 $\rho$ を選び、$\rho j$ に[Stokesの境界収支](../HPDE7/index.md#thm-hpde7-stokes-balance)を適用します。$j$ が非零の位置では $\rho=1$、$\nabla\rho=0$ なので $\nabla_a(\rho j^a)=0$ です。$\rho j$ はコンパクト支持ゆえに空間側面の寄与はありません。

未来面の外向き共法線は $-N_b^\flat$、過去面では $N_a^\flat$ であることを[Stokesの境界収支](../HPDE7/index.md#thm-hpde7-stokes-balance)で確認し、

$$
0=-\Omega_{\Sigma_b}(u,v)+\Omega_{\Sigma_a}(u,v)
$$

を得ます。面全体がコンパクトだとは仮定していません。
<!-- solution-end -->

<a id="ex-hpde23-b02"></a>

#### HPDE23-B02 非退化性を二回の初期値選択で証明

- Level: B

滑らかな空間的Cauchy面 $\Sigma$ 上でコンパクト支持初期データ $(u_0,u_1)$ を持つ実斉次解 $u$ が、全ての空間コンパクト斉次解 $v$ に対し $\Omega(u,v)=0$ を満たすとする。零解であることを証明せよ。$\Omega(u,u)=0$ だけを使ってはならない。

<!-- solution-start -->
**詳細解答**。[大域Cauchy存在一意性](../HPDE16/index.md#thm-hpde16-global-cauchy)をコンパクトなデータ $(0,u_0)$ に適用して $v$ を得ます。$Pv=0$ かつ有限伝播によりscなので、仮定に代入でき、

$$
0=\Omega(u,v)=\int_\Sigma u_0^2\,d\mu_\Sigma.
$$

非負な連続関数 $u_0^2$ の積分が零なので $u_0=0$ です。次にデータ $(u_1,0)$ から別のsc解 $v$ を作ると

$$
0=\Omega(u,v)=-\int_\Sigma u_1^2\,d\mu_\Sigma
$$

より $u_1=0$。零Cauchyデータの斉次解の一意性で $u=0$ です。一回目と二回目は互いに独立な初期データ成分を検出しています。
<!-- solution-end -->

<a id="ex-hpde23-b03"></a>

#### HPDE23-B03 源と伝播子の負号

- Level: B

$P=-\Box_g+V$ は実ポテンシャルを持ち、$E_{\mathrm{cau}}=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ とする。$f\in C_c^\infty(M,\mathbb R)$、$v\in\operatorname{Sol}_{\mathrm{sc}}(P)$ とし、$w=G_{\mathrm{ret}}f$ と置く。源の前後でのGreen解の支持とLorentz時空の[Stokesの境界収支](../HPDE7/index.md#thm-hpde7-stokes-balance)から $\Omega(E_{\mathrm{cau}}f,v)$ の式を導き、符号が正か負かを答えよ。

<!-- solution-start -->
**詳細解答**。コンパクト源の前後に $\Sigma_a,\Sigma_b$ を選び、[Green解の支持](../HPDE18/index.md#thm-hpde18-green-existence)から $w=0$ が前面で成立し、後面では $G_{\mathrm{adv}}f=0$、よって $w=E_{\mathrm{cau}}f$ です。[電流の発散恒等式](#prop-hpde23-current-divergence)を $(w,v)$ に適用すると

$$
\nabla_a j^a(w,v)=vPw-wPv=vf.
$$

電流の帯内支持はsc条件と有限時間因果影でコンパクトです。そこで[Stokesの境界収支](../HPDE7/index.md#thm-hpde7-stokes-balance)の上面 $-N_b^\flat$、下面 $N_a^\flat$ を用いて

$$
\begin{aligned}
\int_Mfv\,d\mu_g
&=-\Omega_{\Sigma_b}(w,v)+\Omega_{\Sigma_a}(w,v)\\
&=-\Omega(E_{\mathrm{cau}}f,v)+0.
\end{aligned}
$$

従って答えは**負号**付きで $\Omega(E_{\mathrm{cau}}f,v)=-\int_Mfv\,d\mu_g$ です。$E_{\mathrm{cau}}$ の遅延・先進の順を交換した場合だけ符号が変わります。
<!-- solution-end -->

<a id="ex-hpde23-b04"></a>

#### HPDE23-B04 商の代表に依存しないこと

- Level: B

実Klein–Gordon作用素 $P$ とその因果伝播子 $E_{\mathrm{cau}}$ について、$f,h,\varphi,\psi\in C_c^\infty(M,\mathbb R)$ とする。

$$
W(f,h)=-\int_Mf(E_{\mathrm{cau}}h)\,d\mu_g
$$

が $f\mapsto f+P\varphi$、$h\mapsto h+P\psi$ で不変であることを証明し、$W(f,h)=-W(h,f)$ を導け。

<!-- solution-start -->
**詳細解答**。[因果伝播子の零合成](../HPDE21/index.md#prop-hpde21-propagator-identities)より $E_{\mathrm{cau}}P\psi=0$ です。従って第二引数を変えても $W$ は変わりません。第一引数では[積分対と解空間形式の一致](#prop-hpde23-green-pairing)から

$$
\begin{aligned}
W(f+P\varphi,h)-W(f,h)
&=\Omega(E_{\mathrm{cau}}P\varphi,E_{\mathrm{cau}}h)\\
&=\Omega(0,E_{\mathrm{cau}}h)=0.
\end{aligned}
$$

両方の変化を逐次適用すれば同時変更でも不変です。また

$$
W(f,h)=\Omega(E_{\mathrm{cau}}f,E_{\mathrm{cau}}h)
=-\Omega(E_{\mathrm{cau}}h,E_{\mathrm{cau}}f)=-W(h,f).
$$

形式的な部分積分で計算するなら、$\varphi$ がコンパクト支持であることを確認して $\int(P\varphi)E_{\mathrm{cau}}h=\int\varphi P(E_{\mathrm{cau}}h)=0$ としてもよいです。
<!-- solution-end -->

### Level C：時間カットオフから商空間まで

<a id="ex-hpde23-c01"></a>

#### HPDE23-C01 円筒上の因果伝播子とシンプレクティック形式

- Level: C

$M=\mathbb R\times S^1$、$g=-dt^2+d\theta^2$、$P=\partial_t^2-\partial_\theta^2+\mu^2$（$\mu>0$）とする。実斉次解 $u(t,\theta)=\cos\mu t$、$v(t,\theta)=\sin\mu t/\mu$ を考える。$\eta,\zeta$ を滑らかな実関数で、十分過去では $0$、十分未来では $1$ となり、導関数はコンパクト支持であるものとする。次を順に示せ。

1. $f=P(\eta u)$、$h=P(\zeta v)$ が時空コンパクト支持であることを示し、$f$ を $\eta$ と $u$ の微分で表せ。
2. $E_{\mathrm{cau}}f=u$、$E_{\mathrm{cau}}h=v$ を、半解の支持条件とGreenの両側逆から証明せよ。
3. $\Omega(u,v)$ を直接求め、$-\int_M f(E_{\mathrm{cau}}h)\,d\mu_g$ を $\eta'$ の積分まで変形して一致を示せ。
4. $\eta$ を別の時間カットオフへ変えたとき、$f$ が同じ商空間の類を表す理由を示せ。

<!-- solution-start -->
**詳細解答**。

**1.** $Pu=0$ を使い、積の二階微分を展開します。

$$
\begin{aligned}
f&=\partial_t^2(\eta u)-\partial_\theta^2(\eta u)+\mu^2\eta u\\
&=\eta''u+2\eta'u'+\eta Pu\\
&=\eta''(t)\cos\mu t-2\mu\eta'(t)\sin\mu t.
\end{aligned}
$$

$\eta',\eta''$ はある有限時間区間内でしか非零でなく、空間 $S^1$ はコンパクトなので $\operatorname{supp}f$ はコンパクトです。$h=\zeta''v+2\zeta'v'$ も同様です。

**2.** $\eta u$ は過去で零なので過去コンパクト、$(\eta-1)u$ は未来で零なので未来コンパクトです。両方に $P$ をかけると $f$ です。[pc・fc入力へのGreen両側逆](../HPDE20/index.md#thm-hpde20-green-two-sided)を各作用域で使うと

$$
G_{\mathrm{ret}}f=\eta u,
\qquad G_{\mathrm{adv}}f=(\eta-1)u.
$$

従って $E_{\mathrm{cau}}f=u$。$\zeta v$ と $(\zeta-1)v$ に対して同じ操作をすると $E_{\mathrm{cau}}h=v$ です。

**3.** $u'= -\mu\sin\mu t$、$v'=\cos\mu t$ より、面上の交代積は $uv'-vu'=1$ なので

$$
\Omega(u,v)=\int_0^{2\pi}1\,d\theta=2\pi.
$$

一方 $E_{\mathrm{cau}}h=v$ なので、問1の $f$ を積分すると

$$
\begin{aligned}
\int_M f(E_{\mathrm{cau}}h)\,d\mu_g
&=2\pi\int_{\mathbb R}
\left(\eta''\frac{\cos\mu t\sin\mu t}{\mu}
-2\eta'\sin^2\mu t\right)dt.
\end{aligned}
$$

$\eta'$ はコンパクト支持なので、第一項を一回部分積分できます。導関数が

$$
\frac{d}{dt}\left(\frac{\cos\mu t\sin\mu t}{\mu}\right)
=\cos^2\mu t-\sin^2\mu t
$$

であることを使うと

$$
\begin{aligned}
\int_Mfv\,d\mu_g
&=-2\pi\int_{\mathbb R}\eta'
\bigl(\cos^2\mu t-\sin^2\mu t+2\sin^2\mu t\bigr)dt\\
&=-2\pi\int_{\mathbb R}\eta'(t)dt\\
&=-2\pi\bigl(\eta(+\infty)-\eta(-\infty)\bigr)=-2\pi.
\end{aligned}
$$

従って $-\int_M f(E_{\mathrm{cau}}h)\,d\mu_g=2\pi=\Omega(u,v)$ です。ここで負号を落とすと円筒上で既に矛盾します。

**4.** 別の過去零・未来一のカットオフ $\widetilde\eta$ を取ると、$(\eta-\widetilde\eta)u$ は時間方向にコンパクト、空間は円周でコンパクトなので全時空でコンパクトです。そして

$$
f_\eta-f_{\widetilde\eta}
=P\bigl((\eta-\widetilde\eta)u\bigr)
\in P C_c^\infty(M,\mathbb R).
$$

よって[コンパクト源の同値類](../HPDE22/index.md#def-hpde22-source-classes)では $[f_\eta]=[f_{\widetilde\eta}]$ です。源の表示は変化しても、解と $\omega_{\mathcal Q}$ は変化しません。
<!-- solution-end -->

## 8. 何を保存したのか

実Klein–Gordon場では、二つの解の保存電流から作る $\Omega$ が初期面によらず、初期変位と速度の対を非退化に組み合わせます。さらに遅延Green作用素から先進Green作用素を引く規約では、源側の対応する積分形式に**負号が必要**です。ここまでで古典場の線形・シンプレクティック構造が閉じました。次のHPDE24では、こうした大域結論を保証する仮定が欠けた模型を検討します。
