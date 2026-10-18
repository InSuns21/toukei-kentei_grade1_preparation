# HPDE6 Cauchy超曲面・初期データ・関数空間

[HPDE5の主シンボル](../HPDE5/index.md#def-hpde5-principal-symbol)は、波動型作用素がどの方向の二階微分を最高階として持つかを教えてくれました。しかし、方程式 $Pu=f$ を解くには、単に「波動型である」と判定するだけでは足りません。**どこで、何を、どの意味で指定したら解が決まるのか**を定める必要があります。

平坦時空で与えていた「時刻零での変位と速度」を、曲がった時空のベクトル束へ移します。[LORG15のCauchy超曲面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)は因果曲線を一度だけ横切るという大域的な条件です。それとは別に、[HPDE5の特性](../HPDE5/index.md#def-hpde5-characteristic)を使って、その面から法線方向の二階微分を取り出せるかを調べます。この二条件を混同しないことが本章の核心です。

以下、$(M,g)$ は境界のない時間向き付きの滑らかなLorentz多様体で、次元は $n+1$（$n\ge1$）、符号は $(-,+,\ldots,+)$ とします。

$E\to M$ は有限ランク $r\ge1$ の滑らかな実または複素ベクトル束です。作用素 $P:\Gamma(M,E)\to\Gamma(M,E)$ は[HPDE5で定義したnormally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)とします。

[HPDE5の一意分解定理](../HPDE5/index.md#thm-hpde5-unique-connection)による接続を $\nabla^P$ とすると、
$$
P=-\Box_g^{\nabla^P}+V
$$
です。法線微分にはこの接続を使います。別の接続を無断で選ぶと「初速度」の意味が変わることに注意します。

## 1. 初期面を時空の時計で指定する

一般のCauchy面には滑らかさが保証されません。そこで標準的な波動初期値問題では、**滑らかで空間的なCauchy面**を選びます。ここでは時空 $M$ が連結であり、[LORG16の大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)を仮定すれば、[Bernal–SánchezのCauchy temporal function存在定理](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-bernal-sanchez)により、滑らかな時計 $T:M\to\mathbb R$ を選べます。その各レベル
$$
\Sigma_t=T^{-1}(t)
$$
は滑らかで空間的なCauchy超曲面です。本章では時刻 $t_0$ を固定して $\Sigma=\Sigma_{t_0}$ と書きます。

[滑らかな直交時空分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)を使うと、適切な大域座標 $(t,y)$ において
$$
g=-\alpha(t,y)^2dt^2+h_t(y),\qquad \alpha>0
$$
と表されます。$h_t$ は各 $\Sigma_t$ 上の正定値なRiemann計量、$\alpha$ はlapse関数です。ここで時間座標 $t$ は選んだ $T$ 自身です。$dt$ は時刻の共変ベクトル、$\partial_t$ は分割によって選んだ時間方向を表し、両者は同じ対象ではありません。

<a id="def-hpde6-cauchy-slice"></a>
<!-- formal-statement-start -->
> **定義（滑らかな空間的Cauchy初期面）**  
> 時間向き付きLorentz時空 $(M,g)$ の滑らかな埋め込み超曲面 $\Sigma\subset M$ が、[Cauchy超曲面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)であり、各 $x\in\Sigma$ の接空間 $T_x\Sigma$ 上への計量 $g$ の制限が正定値であるとき、$\Sigma$ を**滑らかな空間的Cauchy初期面**という。制限計量を $h=g|_{T\Sigma}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde6-cauchy-slice -->
### 直接例：Minkowskiの時刻零面

**定義の確認**。$M=\mathbb R^{1+n}$、$g=-dt^2+\sum_a(dx^a)^2$、$\Sigma=\{t=0\}$ とします。$\Sigma$ は滑らかな超曲面で、接ベクトル $X=X^a\partial_{x^a}\ne0$ に対し
$$
h(X,X)=\sum_a(X^a)^2>0.
$$
さらに[LORG15のMinkowski非延長因果曲線の全時刻通過](../../../幾何系/LORG/LORG15/index.md#lem-lorg15-full-time)により、全ての両側非延長因果曲線は $\Sigma$ と一度だけ交わります。正定値性と一意交差性の**両方**を確認できたので、この面は定義を満たします。
<!-- definition-example-end -->

空間的であることは**局所的な接空間の性質**、Cauchyであることは**時空全体での曲線交差の性質**です。例えばMinkowski平面の開区間 $\{t=0,\ |x|<1\}$ は空間的ですが、直線 $x=2$ に沿う未来時間的曲線と交わらないためCauchy面ではありません。

## 2. lapseから単位法線を計算する

面上で「速度」を測るには、面に直交した未来向き時間的ベクトルを長さ $-1$ に規格化します。$\nabla^gT$ は $g(\nabla^gT,X)=dT(X)$ を満たす勾配です。レベル面に接する $X$ には $dT(X)=0$ なので、勾配は面に直交します。$T$ は未来へ増加するため、その勾配は過去向きです。

[lapseと単位法線](../../../幾何系/LORG/LORG20/index.md#prop-lorg20-unit-normal)を初期値の記法で使います。$Q=-g(\nabla^gT,\nabla^gT)>0$ とおけば
$$
N=-Q^{-1/2}\nabla^gT,\qquad
\alpha=Q^{-1/2},\qquad
\partial_t=\alpha N.
$$
符号と規格化を確認すると
$$
g(N,N)=Q^{-1}(-Q)=-1,\qquad
dT(N)=g(\nabla^gT,N)=Q^{1/2}=\alpha^{-1}.
$$
$\partial_t$ が面に直交し $dT(\partial_t)=1$ となる直交分割なので、$\partial_t=cN$ と置いたとき $1=c/\alpha$、すなわち $c=\alpha$ です。ここでの導出は既習の命題を初期データの用途へ当てはめた検算です。

例えば $g=-4dt^2+9dx^2$ なら $g^{tt}=-1/4$ から $Q=1/4$、$\alpha=2$、$N=\tfrac12\partial_t$ です。$\partial_t$ を単位法線と思い込むと、初速度が二倍ずれます。

## 3. 何を初期条件に指定するのか

平坦なスカラー方程式では $(u(0,x),\partial_tu(0,x))$ を与えました。束の切断では、時刻によって局所枠が回転・伸縮する場合があり、裸の $\partial_t$ は幾何学的な切断の微分として不変ではありません。そこで[HPDE4の束接続](../HPDE4/index.md#def-hpde4-connection)を用いて法線微分します。

<a id="def-hpde6-cauchy-data"></a>
<!-- formal-statement-start -->
> **定義（滑らかなCauchyデータと源）**  
> $(M,g)$ を時間向き付きLorentz時空、$\Sigma\subset M$ を滑らかな空間的Cauchy初期面、$N$ を未来向き単位法線、$E\to M$ を滑らかなベクトル束、$P$ をその上のnormally hyperbolic作用素、$\nabla^P$ を[HPDE5の一意分解定理](../HPDE5/index.md#thm-hpde5-unique-connection)で $P$ から一意に定まる接続とする。滑らかな切断 $u\in\Gamma(M,E)$ の**初期変位**と**初期速度**を
$$
u_0=u|_\Sigma\in\Gamma(\Sigma,E|_\Sigma),\qquad
u_1=(\nabla^P_Nu)|_\Sigma\in\Gamma(\Sigma,E|_\Sigma)
$$
> と定める。非斉次方程式 $Pu=f$ の $f\in\Gamma(M,E)$ を**源**という。初期値問題とは $Pu=f$ と上の二条件を同時に要求する問題である。解の存在・一意性はこの定義には含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde6-cauchy-data -->
### 直接例：平坦Klein–Gordon模型

**定義の確認**。$\mathbb R^{1+1}$ の自明実直線束で $g=-dt^2+dx^2$、$P=\partial_t^2-\partial_x^2+m^2$（$m^2\ge0$）とします。[HPDE5の一意分解](../HPDE5/index.md#thm-hpde5-unique-connection)による接続は通常微分で、$N=\partial_t$ です。$u(t,x)=t^2+\sin x$ を切断とすれば
$$
u_0(x)=\sin x,\qquad
u_1(x)=2t|_{t=0}=0.
$$
源は計算によって
$$
f=Pu=2+\sin x+m^2(t^2+\sin x)
$$
です。特に $f|_\Sigma=2+(1+m^2)\sin x$ であり、**源は一般に初期変位・初期速度のいずれでもありません**。この例は与えた切断が指定された三つのデータを満たすかを個別に確認するものです。
<!-- definition-example-end -->

ここで $\Gamma_c(\Sigma,E|_\Sigma)$ は**初期面内でコンパクトな台**を持つ滑らかなデータ、$\Gamma_c(M,E)$ は**時空内でコンパクトな台**を持つ滑らかな源を表します。[HPDE3の台](../HPDE3/index.md#def-hpde3-distribution-support)と同じく、台とは切断が零でない点の閉包です。面内でコンパクトであっても、そこから発展した解が時空内でコンパクトとは限りません。有限伝播は後の章で証明する性質です。

例えば、コンパクト支持を指定する滑らかな問題では、三つのデータの所属を
$$
(u_0,u_1,f)\in
\Gamma_c(\Sigma,E|_\Sigma)\times
\Gamma_c(\Sigma,E|_\Sigma)\times
\Gamma_c(M,E)
$$
と書けます。初期面上の二つの切断と時空上の源では、**台を測る空間が異なります**。この条件は与えるデータの性質であり、解 $u$ の時空内でのコンパクト支持を保証するものではありません。

## 4. 局所枠で「初速度」を読み替える

初期速度の式を、数値計算や局所PDEの係数と接続します。直交分割座標で局所枠 $e=(e_1,\ldots,e_r)$ を選び、切断を $u=e\,v$（$v$ は成分列ベクトル）と表します。[HPDE4の束接続](../HPDE4/index.md#def-hpde4-connection)が枠をどう微分するかを $\nabla^P_{\partial_t}e_b=\sum_a e_a(\omega_t)^a{}_b$ と書けば、積の微分規則から
$
\nabla^P_{\partial_t}u=e(\partial_tv+\omega_tv)
$
となります。したがって $\omega_t$ は接続の時間方向成分を局所枠で並べた行列です。法線 $N=\alpha^{-1}\partial_t$ に対する接続はベクトル場に関して線形なので
$$
\nabla^P_Nv
=\alpha^{-1}(\partial_t v+\omega_tv).
$$
したがって $v_0=v(t_0,\cdot)$、$v_1=(\nabla^P_Nv)|_{t=t_0}$ は
$$
\boxed{\quad
(\partial_tv)|_{t=t_0}
=\alpha_0v_1-\omega_t(t_0,\cdot)v_0
\quad}
$$
を満たします。$\alpha_0=\alpha(t_0,\cdot)$ です。これは裸の時間微分を与えたいときの変換公式で、接続係数を無視することはできません。

<a id="prop-hpde6-first-jet"></a>
<!-- formal-statement-start -->
> **命題（法線データは一階の全微分を決める）**  
> $(M,g)$ を時間向き付きLorentz時空、$\Sigma\subset M$ を滑らかな空間的超曲面、$E\to M$ を接続 $\nabla$ を備えた滑らかな束とする。$N$ は $\Sigma$ 上の未来向き単位法線とする。$\Sigma$ のCauchy性は仮定しない。
>
> 切断 $u$ が $\Sigma$ の近傍で滑らかであり、二つの初期データを

$$
u_0=u|_\Sigma,\qquad u_1=(\nabla_Nu)|_\Sigma
$$

> と定めると、この組から任意の $X\in TM|_\Sigma$ についての $\nabla_Xu|_\Sigma$ が一意に定まる。また、任意の滑らかなデータ対は各点の近傍で滑らかな切断の初期データとして実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

面に接する方向の微分は $u_0$ 自体から分かります。それ以外の成分は法線 $N$ に分解して $u_1$ に吸収します。存在については局所座標で時刻方向の一次式を作ります。ここでは $Pu=f$ を満たすことまでは要求していません。

<!-- proof-start -->
### 証明

$x\in\Sigma$ の任意の $X\in T_xM$ は、一意に
$$
X=Y+cN,\qquad
c=-g(X,N),\qquad Y=X+g(X,N)N\in T_x\Sigma
$$
と分解します。$g(N,N)=-1$ と $g(Y,N)=0$ を直接確かめられます。接続のベクトル場に関する線形性から
$$
(\nabla_Xu)|_x
=(\nabla_Yu)|_x+c\,u_1(x).
$$
$\nabla_Yu|_\Sigma$ は束 $E|_\Sigma$ 上の誘導接続 $\nabla^\Sigma_Yu_0$ に等しく、これは $u_0$ だけから計算できます。実際、[束接続の局所表示](../HPDE4/index.md#def-hpde4-connection)で $u=e\,v$ とすれば、接方向 $Y$ に対して
$
(\nabla_Yu)|_\Sigma
=e\bigl(Y(v_0)+\omega(Y)v_0\bigr),
$
となり、面の外側での $u$ の取り方は現れません。したがって一意性が従います。

次に局所構成を行います。$\Sigma$ が滑らかな超曲面なので、点 $x$ の近傍で $\Sigma=\{T=0\}$ となる定義関数 $T$ を取れます。空間的面の法共変ベクトル $dT$ は時間的なので、$T$ が未来へ増加する符号を選び、
$
Z=\frac{\nabla^gT}{g(\nabla^gT,\nabla^gT)}
$
と置きます。$dT(Z)=1$ であり、$Y\in T\Sigma$ には $g(Z,Y)=0$ です。$Z$ の局所流線に沿って $t=T$、面内座標を $y$ とすれば、$\partial_t=Z=\alpha N$ となる直交座標が得られます。ここで $\alpha=(-g(\nabla^gT,\nabla^gT))^{-1/2}>0$ です。局所枠を選び、滑らかな成分 $v_0(y),v_1(y)$ に対し
$$
w(t,y)=v_0(y)+t\bigl(\alpha_0(y)v_1(y)-\omega_t(0,y)v_0(y)\bigr)
$$
とおきます。$w(0,y)=v_0(y)$ であり、
$$
\alpha_0^{-1}\bigl(\partial_tw+\omega_tw\bigr)|_{t=0}
=\alpha_0^{-1}(\alpha_0v_1-\omega_t v_0+\omega_t v_0)
=v_1.
$$
よって近傍の切断としてデータを実現できます。必要なら $t=0$ の近くで $1$ となる滑らかなcutoffを掛けても初期データは変わりません。
<!-- proof-end -->

この命題は、二階波動方程式で二種類の初期データを指定する理由を説明します。**接線方向の一階微分は第三の独立データではありません**。既に $u_0$ の微分として含まれています。

## 5. 法線の最高階係数はなぜ消えないのか

[HPDE5の特性定義](../HPDE5/index.md#def-hpde5-characteristic)では、面の法共変ベクトルに主シンボルを代入し、それが可逆かどうかを調べました。$\Sigma_t$ の法共変ベクトルは $dT$ です。$g$ が負の時間成分と正の空間成分に分かれているため、$dT$ は光的にはなりません。

<a id="prop-hpde6-noncharacteristic"></a>
<!-- formal-statement-start -->
> **命題（空間的初期面の非特性性）**  
> 滑らかなLorentz時空 $(M,g)$ 上の有限ランク束 $E$ のnormally hyperbolic作用素 $P$ と、滑らかな空間的超曲面 $\Sigma=\{T=t_0\}$ を考える。$dT\ne0$、その勾配は時間的とする。このとき $\Sigma$ は $P$ に関して非特性である。特に直交分割 $g=-\alpha^2dt^2+h_t$ では
$$
\sigma_2(P)(x,dT)=\alpha(x)^{-2}\operatorname{id}_{E_x}.
$$
> したがって任意の $x\in\Sigma$ で主シンボルは可逆である。$\Sigma$ がCauchy面であることは、この結論に不要である。
<!-- formal-statement-end -->

### 証明の見取り図

[HPDE5のnormally hyperbolicの定義](../HPDE5/index.md#def-hpde5-normally-hyperbolic)へ $dT$ を入力します。空間的面の法線は時間的で、その逆計量の値が負であることが可逆性に直結します。

<!-- proof-start -->
### 証明

直交分割では計量の逆行列は時間・空間のブロック対角形で、
$$
g^{tt}=-\alpha^{-2},\qquad g^{ta}=0,\qquad g^{ab}=h_t^{ab}.
$$
$dT=dt$ の成分は $(1,0,\ldots,0)$ なので
$$
g^{-1}(dT,dT)=g^{tt}=-\alpha^{-2}.
$$
したがって
$$
\sigma_2(P)(dT)=-g^{-1}(dT,dT)\operatorname{id}
=\alpha^{-2}\operatorname{id}.
$$
$\alpha>0$ より逆写像は $\alpha^2\operatorname{id}$ です。一般の局所定義関数 $T$ でも勾配が時間的なら $g^{-1}(dT,dT)<0$ が成立し、同じ論法で非特性が従います。
<!-- proof-end -->

### その結果、どの微分が解けるか

直交座標と局所枠を使えば、二階主部は
$$
-g^{ij}\partial_i\partial_j
=\alpha^{-2}\partial_t^2-h_t^{ab}\partial_a\partial_b
$$
です。残りの一階・零階係数を $B^i,C$ とすると
$$
Pu=\alpha^{-2}\partial_t^2u
-h_t^{ab}\partial_a\partial_bu+B^t\partial_tu+B^a\partial_au+Cu.
$$
よって方程式 $Pu=f$ は
$$
\boxed{\quad
\partial_t^2u
=\alpha^2\bigl(f+h_t^{ab}\partial_a\partial_bu
-B^t\partial_tu-B^a\partial_au-Cu\bigr)
\quad}
$$
となります。ここで局所枠の成分について $v_0=u|_\Sigma$、$v_1=(\nabla^P_Nu)|_\Sigma$ と書き直します。$t=t_0$ を固定した面内微分なら
$
(\partial_au)|_\Sigma=\partial_av_0,\qquad
(\partial_a\partial_bu)|_\Sigma=\partial_a\partial_bv_0,
\qquad
(\partial_tu)|_\Sigma=\alpha_0v_1-\omega_t(t_0,\cdot)v_0
$
です。これらを方程式に代入すると
$
\begin{aligned}
(\partial_t^2u)|_\Sigma=\alpha_0^2\bigl(&f|_\Sigma+h_0^{ab}\partial_a\partial_bv_0\\
&-B_0^t(\alpha_0v_1-\omega_t(t_0,\cdot)v_0)
-B_0^a\partial_av_0-C_0v_0\bigr).
\end{aligned}
$
ここでは $u$ と $f$ を局所枠での成分列として扱い、係数にも $t=t_0$ を代入しました。右辺は初期データ、源の初期面への制限および係数から計算できます。ただし、この恒等式を使って**形式的に二階時間微分を決められること**と、全時刻にわたる解の存在とは別問題です。存在・一意性は後のエネルギー法と局所解の構成を要します。

逆にMinkowski平面の $\{t-x=0\}$ では、$g^{-1}(d(t-x),d(t-x))=0$ なので主シンボルは零となり、上のように法線方向二階微分を一意に解くことはできません。

## 6. 傾いた初期面で法線とデータを取り違えない

Minkowski平面で $|a|<1$ とし、
$$
T(t,x)=t+ax,\qquad \Sigma=\{t+ax=0\}
$$
を選びます。この面が滑らかなCauchy面であることは[LORG15の一様Lipschitzグラフ定理](../../../幾何系/LORG/LORG15/index.md#thm-lorg15-uniform-graph)を $t=-ax$ に適用して確認できます。勾配は $\nabla^gT=-\partial_t+a\partial_x$ で、
$$
Q=-g(\nabla^gT,\nabla^gT)=1-a^2,\qquad
\alpha=\frac1{\sqrt{1-a^2}},\qquad
N=\frac{\partial_t-a\partial_x}{\sqrt{1-a^2}}.
$$
$\Sigma$ を $y\mapsto(-ay,y)$ と媒介すると接ベクトルは $Y=-a\partial_t+\partial_x$ なので
$$
h(Y,Y)=1-a^2>0.
$$
自明束・通常接続の切断 $u(t,x)=t+x$ なら
$$
u_0(y)=(1-a)y,\qquad
u_1(y)=N(u)=\frac{1-a}{\sqrt{1-a^2}}.
$$
ここで $\partial_tu=1$ ですが、これは $u_1$ とは一致しません。接線方向にも変化する切断を、傾いた面の法線方向から見ているためです。さらに
$$
\sigma_2(P)(dT)=1-a^2>0
$$
です。$\Sigma$ は非特性で、局所的な二階時間微分の回収が可能です。

## 7. 滑らかなデータとSobolevデータを分ける

上では $u_0,u_1$ を滑らかな切断としました。実際のエネルギー評価では微分可能性を有限回しか仮定できないデータも必要になります。[GPDE3のEuclid領域のSobolev空間](../../GPDE/GPDE3/index.md#def-gpde3-hk)は、弱微分が二乗可積分となるという条件でした。初期面が曲がっていたり、束が自明でなかったりしても、**局所座標と局所枠で同じ条件を課す**ことができます。

<a id="def-hpde6-local-sobolev-data"></a>
<!-- formal-statement-start -->
> **定義（局所Sobolev初期データ）**  
> $\Sigma$ を滑らかな $n$ 次元多様体、$F\to\Sigma$ を有限ランクの滑らかな束、$k\in\mathbb N_0$ とする（Cauchy初期値問題では $F=E|_\Sigma$）。[HPDE3で導入した束値分布](../HPDE3/index.md#def-hpde3-distribution-section) $v$ が $H^k_{\mathrm{loc}}(\Sigma,F)$ に属するとは、各座標近傍 $U\subset\Sigma$ と局所枠における成分ベクトルが、任意の閉包が $U$ の中でコンパクトな小領域 $K\Subset U$ 上で、次数 $|\beta|\le k$ の全ての弱偏微分を局所 $L^2$ 関数として持つことをいう。初期データの一つの自然な正則性クラスは
$$
(u_0,u_1)\in H^{k+1}_{\mathrm{loc}}(\Sigma,F)
\times H^k_{\mathrm{loc}}(\Sigma,F)
$$
> である。これは**許容するデータのクラス**の定義であって、$Pu=f$ の解の存在を主張するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde6-local-sobolev-data -->
### 直接例：全空間では二乗可積分でないデータ

**定義の確認**。$\Sigma=\mathbb R$ の自明実直線束で $u_0(x)=1$、$u_1(x)=0$ とします。任意の有界区間 $K$ 上では $u_0$ の二乗積分は $|K|<\infty$、一階以上の弱微分はすべて零です。従って任意の $k$ で $(u_0,u_1)\in H^{k+1}_{\mathrm{loc}}\times H^k_{\mathrm{loc}}$ です。しかし
$$
\|u_0\|_{L^2(\mathbb R)}^2=\int_{\mathbb R}1\,dx=\infty
$$
なので $u_0\notin H^0(\mathbb R)$ であり、通常の大域 $H^k(\mathbb R)$ にも入りません。
<!-- definition-example-end -->

局所枠を $e'=eS$ と替えると成分は $v'=S^{-1}v$ に変わります。閉包が座標近傍内でコンパクトな小領域では、$S^{-1}$ とその $k$ 階までの導関数が有界です。

[GPDE3の滑らかな乗法作用](../../GPDE/GPDE3/index.md#prop-gpde3-smooth-multiplier)と積の微分公式を成分ごとに適用すると、$v$ が局所 $H^k$ なら $v'$ も局所 $H^k$ です。逆変換 $v=Sv'$ にも同じ議論を適用でき、局所条件は枠の取り方によらなくなります。

局所座標の変更も確かめます。重なりで $y=y(z)$ と座標を変え、成分を $w(z)=v(y(z))$ とします。滑らかな $v$ なら、まず一階の連鎖律は
$
\partial_{z^i}w
=\sum_a (\partial_{y^a}v)(y(z))\,\partial_{z^i}y^a
$
であり、高階もこの式と積の微分規則の反復で表せます。弱微分しかない $v$ には、コンパクト小領域ごとに[GPDE3の局所平滑化定理](../../GPDE/GPDE3/index.md#thm-gpde3-local-mollification)を適用し、$H^k$ で収束する滑らかな近似 $v_j$ を取ります。座標微分同相のJacobianの絶対値は、そのコンパクト領域で上下から正の定数で抑えられ、必要な階数の導関数も有界です。従って変数変換と上の微分公式から $v_j\circ y$ および各階の微分が対応する $L^2$ で収束します。弱微分の定義における試験関数との積分等式も極限へ移せるため、$v\circ y$ に同じ階数の弱微分が存在します。逆座標変換にも同じ議論を適用でき、局所条件は座標によらないことが分かります。

<a id="prop-hpde6-smooth-in-local-sobolev"></a>
<!-- formal-statement-start -->
> **命題（滑らかな切断は局所Sobolev、ただし大域ノルムは別）**  
> $\Sigma$ を滑らかな多様体、$F\to\Sigma$ を有限ランク滑らかな束とする。全ての整数 $k\ge0$ について
$$
\Gamma(\Sigma,F)\subset H^k_{\mathrm{loc}}(\Sigma,F)
$$
> が成り立つ。ただし非コンパクトな $\Sigma$ について、滑らかな切断が大域 $H^k$ ノルム有限であるとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

局所座標上では滑らかな成分とその有限階導関数はコンパクト集合で有界です。その積分は有限になるので局所 $L^2$ 条件を満たします。非コンパクト面での積分は別途検査しなければなりません。

<!-- proof-start -->
### 証明

任意の座標・局所枠近傍内の閉包が座標近傍内でコンパクトな集合 $K$ を選びます。$v$ の各成分 $v^\ell$ は滑らかなので、各 $|\beta|\le k$ に対して $\partial^\beta v^\ell$ は $K$ 上有界です。$K$ のEuclid体積は有限であるから
$$
\int_K|\partial^\beta v^\ell|^2\,dy
\le |K|\sup_K|\partial^\beta v^\ell|^2<\infty.
$$
滑らかな微分は[GPDE2の弱微分](../../GPDE/GPDE2/index.md#def-gpde2-weak-derivative)とも一致します。よって全ての局所条件が成立します。大域 $H^k$ への非包含は直前の定数関数の例で示されました。
<!-- proof-end -->

ここでは大域双曲性から**面全体の一様Sobolev推定を推論しません**。大域的に $H^k$ を測るには、計量・束計量からノルムを選び、非コンパクト面での積分可能性を確かめ、時間依存係数の一様な上下界・導関数界などを別に仮定する必要があります。以後のエネルギー法では、最初にコンパクト領域や有限時間帯で定数依存を明らかにします。

## 8. 源は時空のデータ、初期速度は面のデータ

$u_0,u_1$ は $\Sigma$ 上の束 $E|_\Sigma$ の切断ですが、$f$ は $M$ 上の束 $E$ の切断です。したがって $f|_\Sigma$ だけでは時刻 $t_0$ から離れた方程式を指定したことになりません。

例えば平坦時空で
$$
P=\partial_t^2-\partial_x^2,\quad
u_0=0,\quad u_1=0
$$
としても、$f(t,x)=t$ と $f(t,x)=0$ は異なる初期値問題です。前者では $u(t,x)=t^3/6$ が
$$
Pu=t,\qquad u(0,x)=0,\qquad \partial_tu(0,x)=0
$$
を満たす一方、後者では零関数が同じ初期データを満たします。これは一意性定理を使わずに、**源の時空依存を指定する必要性**を示しています。

## 9. 演習：初期データを自分で構成・判定する

各問で法線の規格化、接続、非特性性、局所／大域の区別を、必要なときは別々に検査してください。

<a id="ex-hpde6-a01"></a>
### A1. lapseと初期速度の係数
- Level: A
- 問題：$g=-9dt^2+4dx^2$、$T=t$、$u=t^2+x$（自明実直線束・通常接続）とする。未来単位法線 $N$、lapse $\alpha$、$u_0,u_1$ を $t=0$ で求めよ。

<!-- solution-start -->
**詳細解答**。逆計量の時刻成分は $g^{tt}=-1/9$ なので $\nabla^gT=-\tfrac19\partial_t$、$Q=1/9$ です。[単位法線命題](../../../幾何系/LORG/LORG20/index.md#prop-lorg20-unit-normal)により
$$
\alpha=Q^{-1/2}=3,\qquad
N=-Q^{-1/2}\nabla^gT=\tfrac13\partial_t.
$$
$g(N,N)=-9/9=-1$ も確認できます。$\partial_tu=2t$ だから
$$
u_0(x)=u(0,x)=x,\qquad
u_1(x)=\tfrac13\partial_tu(0,x)=0.
$$
<!-- solution-end -->

<a id="ex-hpde6-a02"></a>
### A2. 非特性だがCauchyではない面
- Level: A
- 問題：Minkowski平面で $P=\partial_t^2-\partial_x^2$、$S=\{x=0\}$ とする。$S$ の接計量の符号、$\sigma_2(P)(dx)$、Cauchy面かどうかをそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**。$S$ の接方向は $\partial_t$ で、その長さは $g(\partial_t,\partial_t)=-1<0$ です。従って $S$ は時間的で、空間的ではありません。[主シンボル](../HPDE5/index.md#def-hpde5-principal-symbol)は $\tau^2-\zeta^2$ なので
$$
\sigma_2(P)(dx)=0^2-1^2=-1\ne0.
$$
直線束での乗法 $-1$ は可逆ですから非特性です。一方、$\gamma(s)=(s,1)$ は両側非延長な未来時間的曲線で、$x=0$ に交わりません。[Cauchy面の定義](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)に反するのでCauchyではありません。非特性とCauchyを同一視できない実例です。
<!-- solution-end -->

<a id="ex-hpde6-a03"></a>
### A3. 源を直接計算する
- Level: A
- 問題：Minkowski平面の $P=\partial_t^2-\partial_x^2+2$、$u=t^2+\cos x$ に対し、$\Sigma=\{t=0\}$ 上の二つの初期データと源 $f=Pu$ を計算し、$f|_\Sigma$ を求めよ。

<!-- solution-start -->
**詳細解答**。$N=\partial_t$ で接続は通常微分なので $u_0=\cos x$、$u_1=2t|_{t=0}=0$ です。また
$$
\partial_t^2u=2,\qquad
\partial_x^2u=-\cos x.
$$
よって
$$
f=Pu=2+\cos x+2t^2+2\cos x
=2+2t^2+3\cos x.
$$
したがって $f|_\Sigma=2+3\cos x$ です。$u_0,u_1$ と $f$ は作用域も値も異なります。
<!-- solution-end -->

<a id="ex-hpde6-a04"></a>
### A4. 局所と大域のSobolev条件
- Level: A
- 問題：$\Sigma=\mathbb R$ で $v(x)=1$ と $w(x)=e^{-x^2}$ を考える。任意の整数 $k\ge0$ に対し、両者の $H^k_{\mathrm{loc}}(\mathbb R)$ 所属を示し、$v\in H^0(\mathbb R)$ か判定せよ。

<!-- solution-start -->
**詳細解答**。$v$ と $w$ はともに滑らかなので[局所Sobolev包含命題](#prop-hpde6-smooth-in-local-sobolev)から任意の $k$ で局所 $H^k$ です。直接には、$v$ は全ての正階導関数が零、$w$ の導関数は多項式と $e^{-x^2}$ の積で、任意のコンパクト区間上有界です。従ってその二乗積分は有限です。一方
$$
\|v\|_{L^2(\mathbb R)}^2=\int_{-\infty}^{\infty}1\,dx=\infty.
$$
従って $v\notin H^0(\mathbb R)$ です。局所条件は空間無限遠での減衰を要求しません。
<!-- solution-end -->

<a id="ex-hpde6-b01"></a>
### B1. 接続のある束の初期速度
- Level: B
- 問題：$\mathbb R^{1+1}$ で $g=-4dt^2+dx^2$、自明実直線束の接続を $\nabla_{\partial_t}=\partial_t+b$、$\nabla_{\partial_x}=\partial_x$（$b$ は実定数）とする。$\Sigma=\{t=0\}$ に $u_0(x)=\sin x$、$u_1(x)=\cos x$ を指定したとき、$(\partial_tu)|_\Sigma$ を求め、実現する近傍の切断を一つ構成せよ。

<!-- solution-start -->
**詳細解答**。逆計量 $g^{tt}=-1/4$ から $\alpha=2$、$N=\tfrac12\partial_t$ です。ゆえに
$$
\nabla_Nu=\frac12(\partial_tu+bu).
$$
$u_1=\cos x$ と $u_0=\sin x$ を代入して
$$
\frac12\bigl((\partial_tu)|_\Sigma+b\sin x\bigr)=\cos x,
\quad
(\partial_tu)|_\Sigma=2\cos x-b\sin x.
$$
したがって
$$
u(t,x)=\sin x+t(2\cos x-b\sin x)
$$
とすれば $u(0,x)=u_0(x)$ です。また
$$
(\nabla_Nu)|_\Sigma
=\tfrac12(2\cos x-b\sin x+b\sin x)=\cos x=u_1(x).
$$
[一階jet命題](#prop-hpde6-first-jet)の構成を具体化しました。この切断が任意の特定の $Pu=f$ を解くとの主張ではありません。
<!-- solution-end -->

<a id="ex-hpde6-b02"></a>
### B2. 初期値と源から二階時間微分を復元する
- Level: B
- 問題：平坦な自明直線束上の $P=\partial_t^2-\partial_x^2+3$ と $\Sigma=\{t=0\}$ を考える。初期データ $u_0=\cos x$、$u_1=\sin x$、源 $f(t,x)=2\cos x$ を持つ滑らかな解があると仮定し、$(\partial_t^2u)|_\Sigma$ を求めよ。計算は解の存在を証明するか。

<!-- solution-start -->
**詳細解答**。方程式を時間二階微分について解けば
$$
\partial_t^2u=f+\partial_x^2u-3u.
$$
$t=0$ で $u=u_0$ なので $\partial_x^2u|_\Sigma=\partial_x^2\cos x=-\cos x$ です。従って
$$
(\partial_t^2u)|_\Sigma
=2\cos x-\cos x-3\cos x=-2\cos x.
$$
$u_1$ は一階時間微分を指定しており、この例の二階微分式には明示的に現れません。これは**解が存在するなら満たす必要条件**の計算であり、解の存在・一意性の証明ではありません。
<!-- solution-end -->

<a id="ex-hpde6-b03"></a>
### B3. 時間再目盛りと法線速度
- Level: B
- 問題：Minkowski平面で $T=t$ の代わりに $s=2t$ を時計にする。$s$ 座標でのlapseと未来単位法線を求め、$u(t,x)=t+x$ の $s$ に関する裸の微分と法線微分を比較せよ。なお $s$ は全実数を動く。

<!-- solution-start -->
**詳細解答**。$dt=ds/2$ を $g=-dt^2+dx^2$ に代入すると
$$
g=-\tfrac14ds^2+dx^2.
$$
よって $\alpha_s=\tfrac12$、$N=\alpha_s^{-1}\partial_s=2\partial_s=\partial_t$ です。$u=s/2+x$ なので
$$
\partial_su=\tfrac12,\qquad
\nabla_Nu=2\partial_su=1.
$$
$lapse$ は時計の目盛りに依存しますが、幾何学的な単位法線とその微分は変わりません。[lapseと単位法線](../../../幾何系/LORG/LORG20/index.md#prop-lorg20-unit-normal)とも一致します。
<!-- solution-end -->

<a id="ex-hpde6-c01"></a>
### C1. 傾いたCauchy面の幾何・速度・非特性性
- Level: C
- 問題：Minkowski平面上の $P=\partial_t^2-\partial_x^2$ と $T=t+ax$（$|a|<1$）、$\Sigma=T^{-1}(0)$ を考える。次を証明・計算せよ。
  1. $\Sigma$ の誘導計量は正定値であり、未来単位法線 $N$ とlapse $\alpha$ を求めよ。
  2. $\sigma_2(P)(dT)$ を計算し、$\Sigma$ が非特性であることを示せ。
  3. $u(t,x)=t^2+x$ について、$y\mapsto(-ay,y)$ の面座標で $u_0,u_1$ と源 $f=Pu$ を求めよ。
  4. $a\to1$ で上の計算の何が壊れるか、主シンボルの言葉で述べよ。

<!-- solution-start -->
**詳細解答**。

(1) 面の接ベクトルは $Y=-a\partial_t+\partial_x$ です。ゆえに
$$
g(Y,Y)=-a^2+1=1-a^2>0.
$$
面は空間的です。$\nabla^gT=-\partial_t+a\partial_x$ を勾配の定義から得て
$$
Q=-g(\nabla^gT,\nabla^gT)=1-a^2
$$
とすると、[法線公式](../../../幾何系/LORG/LORG20/index.md#prop-lorg20-unit-normal)より
$$
\alpha=(1-a^2)^{-1/2},\qquad
N=\frac{\partial_t-a\partial_x}{\sqrt{1-a^2}}.
$$
$g(N,N)=(-1+a^2)/(1-a^2)=-1$、$dT(N)=\sqrt{1-a^2}=\alpha^{-1}$ も確かめられます。

(2) 主シンボルは $\sigma_2(P)(\tau\,dt+\zeta\,dx)=\tau^2-\zeta^2$ です。$dT=dt+a\,dx$ を代入すると
$$
\sigma_2(P)(dT)=1-a^2>0.
$$
従って直線束上の主シンボルは可逆であり、[非特性の定義](../HPDE5/index.md#def-hpde5-characteristic)から非特性です。

(3) $u(-ay,y)=a^2y^2+y$ だから
$$
u_0(y)=a^2y^2+y.
$$
さらに $\partial_tu=2t$、$\partial_xu=1$ より
$$
u_1(y)=\left.\frac{2t-a}{\sqrt{1-a^2}}\right|_{t=-ay}
=\frac{-2a y-a}{\sqrt{1-a^2}}.
$$
源は $\partial_t^2u=2$、$\partial_x^2u=0$ より $f=2$ です。$f$ は時空上で一定で、二つの初期データとは別の対象です。

(4) $a=1$ では $g(Y,Y)=0$、$Q=0$ です。法線は光的になり $Q^{-1/2}$ で規格化できません。また
$$
\sigma_2(P)(dT)=1-a^2=0
$$
となって非可逆です。したがってこの方法で単位時間的法線と非特性の二階時間微分を得る仕組みが同時に失われます。$|a|<1$ の範囲でも $a\to1$ ではlapseが発散するので、一様な評価をこの式だけから導けません。
<!-- solution-end -->

---

## 10. 次章への橋：データの大きさをどう測るか

ここまでで、滑らかな空間的Cauchy面上のデータ $(u_0,u_1)$、時空上の源 $f$、法線速度と裸の時間微分の換算、非特性性、局所Sobolevクラスの意味を確定しました。まだ示していないのは、初期データの大きさが時間とともにどう変わるかという評価です。HPDE7では実スカラー波動方程式のエネルギー流を構成し、その発散恒等式を導きます。以後の存在・一意性と有限伝播は、その後に証明します。
