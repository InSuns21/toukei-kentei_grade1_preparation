# CELEV1 n体の作用と周期ループ空間

<!-- definition-example-audit: strict -->

CELE2では[Newtonのn体Hamiltonian](../../CELE/CELE2/index.md#def-cele2-newton-nbody)から、衝突を除く運動方程式を導きました。一方[AMECH3の作用と第一変分](../../AMECH/AMECH3/index.md#def-amech3-first-variation)では、二つの端点を固定して軌道を比較しました。

ところが、探したい軌道が周期的なら、始点と終点を**同じ一点に固定すること**と、始点・終点が**互いに一致しながら一緒に動けること**は違います。さらにNewtonの重力では、衝突でポテンシャルが発散します。「作用を最小にする」と言い始める前に、そもそもどの曲線を比較し、その作用が何を意味するかを決める必要があります。

本章の流れは、周期ループの定義、衝突を許す拡張実数値の作用、周期変分の境界項、Newton方程式と速度の接合条件、そして最小化が簡単には成立しない反例、の順です。**ここでは極小点の存在も衝突回避もまだ結論しません。** それらを次章以降で証明するための入口を作ります。

## 1. 重心零の周期ループを作る

粒子数 $n\ge2$、質量 $m_i>0$、重力定数 $G>0$、周期候補 $T>0$ を固定します。平面内の粒子位置を $q_i(t)\in\mathbb R^2$ とし、

$$
q(t)=(q_1(t),\ldots,q_n(t))\in(\mathbb R^2)^n,
\qquad M=\sum_{i=1}^n m_i
$$

と書きます。衝突集合は

$$
\Delta=\{x\in(\mathbb R^2)^n:\ x_i=x_j
\text{ となる }i\ne j\text{ がある}\}
$$

です。重心を原点に置くと、並進する座標系を除けます。しかし重心零だけでは、周期軌道を保証する十分な制約になりません。

周期ループの関数空間には $H^1([0,T];(\mathbb R^2)^n)$ を使います。これは各成分とその弱微分が二乗可積分な関数の空間です。一次元区間の $H^1$ 関数は連続代表を持ちます。[VAR9の区間上の許容集合](../../../解析系/VAR/VAR9/index.md#def-var9-admissible)を使うと、端点値を意味のある量として扱えます。

<a id="def-celev1-periodic-loop"></a>

<!-- formal-statement-start -->
> **定義（重心零の周期ループ空間）**  
> $n\ge2$、$m_i>0$、$T>0$ とする。弱微分をもつ $H^1$ 曲線のうち、連続代表について以下を満たすものを許容ループと呼ぶ。

$$
\mathcal H_T=
\left\{q\in H^1([0,T];(\mathbb R^2)^n):
q(0)=q(T),\
\sum_{i=1}^n m_iq_i(t)=0\ (0\le t\le T)\right\}.
$$

> $q(0)=q(T)$ は**位置の周期端点条件**であり、速度の接合条件はこの定義には含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev1-periodic-loop -->
### 例：二つの粒子が重心の周囲を回る

等質量 $m_1=m_2=m$ とし、$R>0$、$\omega=2\pi/T$ に対して

$$
q_1(t)=R(\cos\omega t,\sin\omega t),
\qquad q_2(t)=-q_1(t)
$$

とします。滑らかな曲線なので $q\in H^1$ です。$\omega T=2\pi$ から $q_i(T)=q_i(0)$、また $mq_1+mq_2=0$ がすべての $t$ で成立します。したがって $q\in\mathcal H_T$ です。さらに $|q_1-q_2|=2R>0$ で衝突しません。**許容ループであること**と**Newton方程式を満たすこと**は別で、後者には $\omega$ と $R$ の関係を追加で確かめる必要があります。
<!-- definition-example-end -->

任意の $H^1$ ループには位置の端点一致だけを要求します。たとえば区分的直線の往復路は $H^1$ に入っても折返し点で速度が跳ぶことがあります。このような曲線も作用の比較対象です。滑らかな周期解であると最初から仮定してしまえば、その解の**存在を示すべき問題**を定義の中へ隠してしまいます。

## 2. 引力なのに作用では正符号になる

[CELE2のポテンシャル](../../CELE/CELE2/index.md#def-cele2-newton-nbody)は力学的には負の位置エネルギー $V=-U$ です。従って運動エネルギーから位置エネルギーを引くLagrangianは $K+U$ になります。距離の逆数を使うため、衝突で $U$ が発散することに注意します。

<a id="def-celev1-extended-action"></a>

<!-- formal-statement-start -->
> **定義（Newton n体の拡張作用）**  
> $n\ge2$、$m_i,G,T>0$ とし、$q\in\mathcal H_T$ とする。$x\notin\Delta$ では

$$
U(x)=G\sum_{1\le i<j\le n}\frac{m_im_j}{|x_i-x_j|},
\qquad
U(x)=+\infty\quad(x\in\Delta)
$$

> と置く。非負の可測関数のLebesgue積分として、作用を

$$
\mathcal A_T[q]=
\int_0^T
\left\{\frac12\sum_{i=1}^n m_i|\dot q_i(t)|^2
+U(q(t))\right\}dt
\in[0,+\infty]
$$

> と定義する。作用が有限のループの集合を $\mathcal D_T=\{q\in\mathcal H_T:\mathcal A_T[q]<\infty\}$ と書く。
<!-- formal-statement-end -->

$H^1$ の代表は連続なので $U(q(t))$ は拡張実数値可測関数です。運動エネルギー積分は有限ですが、$U$ の積分は無限大にもなりえます。$U(q(t_0))=+\infty$ となる**単一時刻**があっても、積分が必ず無限大になるわけではありません。この相違が衝突排除の難しさです。

<!-- definition-example-start: def-celev1-extended-action -->
### 例：一定距離と無限作用

等質量二体で $q_1(t)=(R,0),q_2(t)=(-R,0)$ とすると重心零・周期端点条件を満たし、運動エネルギーは0、距離は $2R$ です。従って

$$
\mathcal A_T[q]=T\,\frac{Gm^2}{2R}<\infty.
$$

一方、$q_1(t)=q_2(t)=0$ ではすべての時刻で $U=+\infty$ なので、作用は無限大です。どちらも $\mathcal H_T$ の元ですが、後者は $\mathcal D_T$ に入りません。
<!-- definition-example-end -->

## 3. 有限作用でも衝突は起こりうる

「作用が無限大にならない」だけで非衝突を宣言できるでしょうか。簡単な曲線で反例を構成できます。

<a id="prop-celev1-finite-collision"></a>

<!-- formal-statement-start -->
> **命題（有限作用の衝突ループ）**  
> 任意の $T,G,m>0$ に対し、平面の等質量二体について、$q\in\mathcal H_T$、$\mathcal A_T[q]<\infty$ でありながら $q(0)\in\Delta$ となるループが存在する。
<!-- formal-statement-end -->

証明の考え方は、衝突への距離を $|t|^\alpha$ の速さで小さくすることです。速度の二乗を積分するには $\alpha>1/2$、距離逆数を積分するには $\alpha<1$ が必要です。両方は両立します。

<!-- proof-start -->
### 証明

$\alpha=2/3$、$a>0$ とし、$s(t)=|\sin(\pi t/T)|^\alpha$ を取ります。単位ベクトル $e=(1,0)$ に対し、

$$
q_1(t)=a\,s(t)e,\qquad q_2(t)=-a\,s(t)e
$$

と定めます。$q(0)=q(T)=0$、$mq_1+mq_2=0$ です。$s$ は内部で滑らかで、端点付近において

$$
s(t)\asymp t^\alpha,\quad |s'(t)|\le C t^{\alpha-1}
\quad(t\downarrow0)
$$

です。$T$ の近くでも $T-t$ に対する同じ評価が成立します。したがって

$$
\int_0^\varepsilon |s'(t)|^2dt
\le C^2\int_0^\varepsilon t^{2\alpha-2}dt
=\frac{C^2\varepsilon^{2\alpha-1}}{2\alpha-1}<\infty
$$

なので $q\in H^1$ です。また $0<t<T$ では $|q_1-q_2|=2as(t)>0$、端点付近で

$$
U(q(t))=\frac{Gm^2}{2as(t)}
\le C' t^{-\alpha},\qquad
\int_0^\varepsilon t^{-\alpha}dt
=\frac{\varepsilon^{1-\alpha}}{1-\alpha}<\infty.
$$

区間内部の閉部分区間では $s$ は正であり、運動・位置両積分が有限です。端点 $t=0,T$ のポテンシャル値だけは $+\infty$ ですが、零測度の点はLebesgue積分に寄与しません。従って $\mathcal A_T[q]<\infty$ で、なおかつ衝突が存在します。$\square$
<!-- proof-end -->

これはNewton方程式の解であるという主張ではありません。**最小化列の極限で衝突が出る可能性を、有限作用の定義だけで排除できない**という論理上の警告です。

## 4. 周期条件のもとで変分する

固定端変分と違い、周期変分の方向は端点でゼロになる必要がありません。ただし変形後にも重心を動かさず、始点と終点が一致していなければなりません。

<a id="def-celev1-periodic-variation"></a>

<!-- formal-statement-start -->
> **定義（重心を保つ周期変分）**  
> $q\in\mathcal H_T$ に対し、$\eta\in C^1([0,T];(\mathbb R^2)^n)$ が

$$
\eta(0)=\eta(T),\qquad
\sum_{i=1}^n m_i\eta_i(t)=0
\quad(0\le t\le T)
$$

> を満たすとき、$q_\varepsilon=q+\varepsilon\eta$ を重心を保つ周期変分という。$\mathcal A_T[q_\varepsilon]$ が $\varepsilon=0$ 近傍で有限かつ微分可能な場合、第一変分 $\delta\mathcal A_T[q;\eta]$ をその $\varepsilon$ 微分で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev1-periodic-variation -->
### 例：端点でゼロでない変分

等質量二体に対して $\eta_1(t)=e$、$\eta_2(t)=-e$ （定数単位ベクトル $e$）とします。$m\eta_1+m\eta_2=0$、$\eta(T)=\eta(0)$ なので許される方向です。しかし $\eta_i(0)\ne0$ です。周期変分を固定端変分と取り違えると、このような方向を不当に除外してしまいます。
<!-- definition-example-end -->

## 5. 第一変分を粒子ごとに求める

ここだけは衝突から一様に離れた滑らかな基準曲線を仮定します。$q\in C^2([0,T];(\mathbb R^2)^n)\cap\mathcal H_T$ とし、

$$
\min_{\substack{0\le t\le T\\i<j}}|q_i(t)-q_j(t)|\ge\rho>0
$$

とします。これは点ごとの非衝突とコンパクトな時間区間上の連続性からも従います。$\eta$ を固定すれば、十分小さい $|\varepsilon|$ に対して $q_\varepsilon$ も非衝突です。よって積分内微分ができ、定義に従って第一変分を計算できます。

<a id="prop-celev1-first-variation"></a>

<!-- formal-statement-start -->
> **命題（Newton作用の周期第一変分）**  
> $n\ge2$、$m_i,G,T>0$ とし、$q\in C^2([0,T];(\mathbb R^2)^n)\cap\mathcal H_T$ が全時刻で非衝突とする。任意の重心を保つ $C^1$ 周期方向 $\eta$ について

$$
\begin{aligned}
\delta\mathcal A_T[q;\eta]
={}&\int_0^T\sum_i m_i\dot q_i\cdot\dot\eta_i\,dt\\
&-G\int_0^T\sum_{i<j}
m_im_j\frac{(q_i-q_j)\cdot(\eta_i-\eta_j)}
{|q_i-q_j|^3}\,dt.
\end{aligned}
$$

> また $F_i(q)=G\sum_{j\ne i}m_im_j(q_j-q_i)/|q_j-q_i|^3$ とすると、

$$
\delta\mathcal A_T[q;\eta]
=\left[\sum_i m_i\dot q_i\cdot\eta_i\right]_0^T
-\int_0^T\sum_i(m_i\ddot q_i-F_i(q))\cdot\eta_i\,dt.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各粒子対の距離逆数を微分すると、相対ベクトルと相対変分の内積が現れます。これを粒子番号ごとに集めると、反作用を含んだNewton力になります。最後の部分積分では、固定端変分と異なり境界項を勝手に消してはいけません。

<!-- proof-start -->
### 証明

$d_{ij}=q_i-q_j$、$h_{ij}=\eta_i-\eta_j$ と置きます。$d_{ij}\ne0$ なので、一次元の連鎖律と平方根の微分から

$$
\left.\frac{d}{d\varepsilon}|d_{ij}+\varepsilon h_{ij}|^{-1}
\right|_{\varepsilon=0}
=-\frac{d_{ij}\cdot h_{ij}}{|d_{ij}|^3}.
$$

実際 $|d+\varepsilon h|^{-1}=(|d|^2+2\varepsilon d\cdot h+\varepsilon^2|h|^2)^{-1/2}$ に微分を適用すると、$-\tfrac12(|d|^2)^{-3/2}\cdot 2d\cdot h$ になります。運動エネルギー側は

$$
\left.\frac{d}{d\varepsilon}
\frac{m_i}{2}|\dot q_i+\varepsilon\dot\eta_i|^2
\right|_0=m_i\dot q_i\cdot\dot\eta_i.
$$

距離下界 $\rho$ と区間のコンパクト性により、これらの導関数は $\varepsilon$ の小近傍で一様有界です。有限和・積分・微分の交換が正当化され、第一式が成立します。

対 $(i,j)$ から粒子 $i$ への寄与は $-Gm_im_j d_{ij}/|d_{ij}|^3$、粒子 $j$ への寄与は反対符号です。全対を集めると

$$
-G\sum_{i<j}m_im_j
\frac{d_{ij}\cdot(\eta_i-\eta_j)}{|d_{ij}|^3}
=\sum_i F_i(q)\cdot\eta_i.
$$

運動項について

$$
\int_0^T m_i\dot q_i\cdot\dot\eta_i\,dt
=[m_i\dot q_i\cdot\eta_i]_0^T
-\int_0^T m_i\ddot q_i\cdot\eta_i\,dt
$$

と部分積分して第二式が得られます。$\square$
<!-- proof-end -->

## 6. Newton方程式だけでなく速度の接合条件が出る

周期境界条件は位置だけでなく速度にも及ぶのか、という問いへ答えます。注意すべき点は、重心制約のせいで変分方向が全粒子独立ではないことです。この制約は、重心方向を射影して取り除くことができます。

<a id="prop-celev1-periodic-stationarity"></a>

<!-- formal-statement-start -->
> **命題（周期停留条件とNewton方程式）**  
> $n\ge2$、$m_i,G,T>0$ とし、$q\in C^2([0,T];(\mathbb R^2)^n)\cap\mathcal H_T$ が非衝突であるとする。すべての重心を保つ $C^1$ 周期方向 $\eta$ に対して $\delta\mathcal A_T[q;\eta]=0$ であることと、次の両条件は同値である。

$$
m_i\ddot q_i(t)=
G\sum_{j\ne i}m_im_j
\frac{q_j(t)-q_i(t)}{|q_j(t)-q_i(t)|^3}
\quad(0<t<T,\ 1\le i\le n),
$$

$$
\dot q_i(0)=\dot q_i(T)\quad(1\le i\le n).
$$
<!-- formal-statement-end -->

### 証明の見取り図

重心が零なので、任意の周期変分から重心成分を引いても、第一変分は変わりません。このため制約付きの停留性から全粒子独立な周期試験関数での停留性が得られます。内部に台を持つ試験関数でNewton方程式を取り出し、次に端点でゼロでない変分で速度接合を取り出します。

<!-- proof-start -->
### 証明

任意の $C^1$ 周期関数 $h=(h_1,\ldots,h_n)$ に対し、

$$
c(t)=\frac1M\sum_jm_jh_j(t),\qquad
\eta_i(t)=h_i(t)-c(t)
$$

と置きます。$\sum_i m_i\eta_i=0$、$\eta(0)=\eta(T)$ なので、$\eta$ は許容方向です。[第一変分の式](#prop-celev1-first-variation)で $h$ と $\eta$ の差は全粒子共通の $c$ です。位置エネルギーの変分は粒子差しか見ないので不変です。また

$$
\sum_i m_i\dot q_i(t)=
\frac d{dt}\sum_i m_iq_i(t)=0
$$

から、運動項の差も

$$
\int_0^T\sum_i m_i\dot q_i\cdot\dot c\,dt
=\int_0^T0\cdot\dot c\,dt=0.
$$

よって $\delta\mathcal A_T[q;h]=\delta\mathcal A_T[q;\eta]$ です。右辺がすべての許容 $\eta$ で零なら、左辺はすべての周期 $h$ で零です。

まず粒子 $i$ の成分だけに、$(0,T)$ 内に台を持つ任意の滑らかな関数 $h_i$ を取ります。この $h$ は端点で零なので、[第一変分の部分積分形](#prop-celev1-first-variation)に境界項は残りません。従って

$$
\int_0^T(m_i\ddot q_i-F_i(q))\cdot h_i\,dt=0.
$$

連続な被積分係数に[変分法の基本補題](../../AMECH/AMECH3/index.md#lem-amech3-fundamental-variation)を適用すると $m_i\ddot q_i-F_i(q)=0$ が $(0,T)$ で成立します。

これを第一変分式へ戻すと積分項は消え、周期条件 $h_i(T)=h_i(0)$ により

$$
0=\delta\mathcal A_T[q;h]
=\sum_i m_i(\dot q_i(T)-\dot q_i(0))\cdot h_i(0).
$$

任意の端点値 $v\in\mathbb R^2$ を持つ定数周期関数を一つの粒子の $h_i$ として選べます。他は零にします。従って各 $m_i(\dot q_i(T)-\dot q_i(0))=0$ であり、$m_i>0$ から速度が接合します。

逆に、Newton方程式と速度接合を仮定すれば、[第一変分の部分積分形](#prop-celev1-first-variation)の積分項も境界項も零です。ゆえにすべての許容方向で停留します。$\square$
<!-- proof-end -->

この命題は**非衝突かつ $C^2$ の曲線についての同値性**です。$H^1$ の極小曲線がその仮定を満たすことはまだ示していません。存在・正則性・衝突回避を先に証明せず、極小点にNewton方程式を適用してはなりません。

## 7. 円運動を代入して、式を数字に戻す

第1節の等質量円ループについて $q_1=Re(t)$、$q_2=-Re(t)$、$|e(t)|=1$ とします。$q_1''=-\omega^2 Re(t)$、距離は $2R$。$q_1$ に働くNewton力は

$$
F_1=Gm^2\frac{-2Re(t)}{(2R)^3}
=-\frac{Gm^2}{4R^2}e(t).
$$

従って $m q_1''=F_1$ は

$$
m\omega^2R=\frac{Gm^2}{4R^2}
\quad\Longleftrightarrow\quad
\omega^2=\frac{Gm}{4R^3}
$$

と同値です。この条件を満たすとき、$q(0)=q(T)$、$\dot q(0)=\dot q(T)$ に加えてNewton方程式も成立し、[周期停留命題](#prop-celev1-periodic-stationarity)から作用が停留します。運動エネルギーと正の $U$ はそれぞれ

$$
K=mR^2\omega^2=\frac{Gm^2}{4R},
\qquad
U=\frac{Gm^2}{2R},
$$

なので

$$
\mathcal A_T[q]
=T(K+U)=\frac{3TGm^2}{4R}.
$$

この計算は「円を描いたから周期解だ」とはしないための検算です。$T$ を勝手に指定しても、その $T$ と $R$ が上の関係を満たさなければNewtonの停留軌道ではありません。

## 8. 重心制約だけでは最小化列が逃げていく

時間ごとに粒子の重心を零にしても、互いの距離を無制限に大きくできることが残ります。$H^1$ 空間における[強制性](../../../解析系/VAR/VAR9/index.md#def-var9-coercivity)を確かめる必要があります。

<a id="prop-celev1-no-coercivity"></a>

<!-- formal-statement-start -->
> **命題（重心零だけでは強制性がない）**  
> $n=2$、$m_1=m_2=m>0$、$G,T>0$ とする。$\mathcal H_T$ 上のNewton拡張作用は、$H^1$ ノルムについて強制的でない。さらに作用の下限は0であるが、この値を達成する有限作用ループは存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

粒子をそれぞれ $\pm R e$ に静止させれば、重心と周期端点は保たれたまま、相互距離だけ大きくなります。運動エネルギーは零、正のポテンシャルも零へ近づきます。しかし有限の位置ではポテンシャルは厳密に正なので、下限は達成できません。

<!-- proof-start -->
### 証明

$R>0$、単位ベクトル $e\in\mathbb R^2$ について定数曲線 $q_1=Re$、$q_2=-Re$ を取ります。第2節の計算から

$$
\mathcal A_T[q]=\frac{TGm^2}{2R}\longrightarrow0
\qquad(R\to\infty).
$$

一方 $H^1$ ノルムは

$$
\|q\|_{H^1}^2
=\int_0^T(|q_1|^2+|q_2|^2)\,dt=2TR^2
\longrightarrow\infty.
$$

したがってノルムが発散する列に沿って作用は有界であり、強制性はありません。作用は非負なので下限は0です。有限作用 $q$ が $\mathcal A_T[q]=0$ を達成したと仮定すると、非負の積分から $U(q(t))=0$ がほとんど至るところで必要です。しかし各時刻で $U(q(t))$ は有限なら正、衝突なら $+\infty$ ですから、零にはなれません。矛盾します。$\square$
<!-- proof-end -->

[VAR9の直接法](../../../解析系/VAR/VAR9/index.md#thm-var9-direct-method)を使うには、弱閉性や下半連続性だけでなく、最小化列を有界に留める仕組みが必要です。周期解の変分的存在論では、対称性や衝突排除といった条件が、その欠けた仕組みにどう働くかを調べます。

## 9. 演習と詳細解答

### Level A

<a id="ex-celev1-a01"></a>
**A1. 周期端点と重心。** $m_1=2,m_2=1,T=2\pi$ とする。$q_1(t)=(\cos t,\sin t)$、$q_2(t)=(-2\cos t,-2\sin t)$ が $\mathcal H_T$ に属することと、最小粒子間距離を示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

両曲線は滑らかなので $H^1$ です。$\cos(2\pi)=\cos0$、$\sin(2\pi)=\sin0$ から両粒子の端点値は一致します。重心の分子は

$$
2q_1+q_2=(2-2)(\cos t,\sin t)=0.
$$

また $q_1-q_2=3(\cos t,\sin t)$ より $\min_t|q_1-q_2|=3$。したがって重心零の非衝突周期ループです。
<!-- solution-end -->

<a id="ex-celev1-a02"></a>
**A2. 作用の符号。** 静止する等質量二体 $q_1=(2,0),q_2=(-2,0)$ で、$G=m=T=1$ の場合、$K,V,L=K-V,\mathcal A_T$ を計算せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

粒子は静止するので $K=0$。距離は4だから重力位置エネルギーは $V=-1/4$ です。従って $L=0-(-1/4)=1/4$、積分区間の長さが1なので $\mathcal A_T=1/4$。$V$ の負符号と $L$ の正符号を区別します。
<!-- solution-end -->

<a id="ex-celev1-a03"></a>
**A3. 許される方向。** $m_1=2,m_2=1$ とし、$\eta_1(t)=(\cos(2\pi t/T),0)$、$\eta_2(t)=-2\eta_1(t)$ が重心を保つ周期変分方向であることを確認せよ。また固定端方向か判定せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\eta_i$ は $C^1$ で $\cos 2\pi=\cos0$ のため端点一致です。重心変化は $2\eta_1+\eta_2=0$。よって[周期変分の定義](#def-celev1-periodic-variation)を満たします。しかし $\eta_1(0)=(1,0)$、$\eta_2(0)=(-2,0)$ は零ではないので固定端方向ではありません。
<!-- solution-end -->

<a id="ex-celev1-a04"></a>
**A4. 円運動の周期。** $G=m=1$ の等質量二体の相対距離を2とする。第7節の円運動がNewton方程式を満たす $\omega$ と $T$、作用 $\mathcal A_T$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

相対距離が $2R=2$ なので $R=1$。[円運動の導出](#prop-celev1-periodic-stationarity)で確認する条件は $\omega^2=Gm/(4R^3)=1/4$、したがって $\omega=1/2$、$T=2\pi/\omega=4\pi$。作用は

$$
\mathcal A_T=\frac{3TGm^2}{4R}
=\frac{3(4\pi)}4=3\pi.
$$

位置・速度の周期端点条件も三角関数の周期から成立します。
<!-- solution-end -->

<a id="ex-celev1-a05"></a>
**A5. 位置周期と速度周期の差。** $T=1$、$q_1(t)=(t(1-t),0)$、$q_2=-q_1$ は重心零の周期 $H^1$ ループである。各粒子の端点速度を求め、この例がNewtonの非衝突周期解ではない理由を二つ示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

両粒子は滑らかで $q_i(0)=q_i(1)=0$、重心零です。一方、$\dot q_1(t)=(1-2t,0)$ だから $\dot q_1(0)=(1,0)$、$\dot q_1(1)=(-1,0)$ で不一致です。粒子2の速度はその負です。さらに両端時刻で $q_1=q_2=0$ の衝突を起こします。速度接合と非衝突という二つの必要条件をともに失っており、滑らかな非衝突Newton周期解ではありません。
<!-- solution-end -->

### Level B

<a id="ex-celev1-b01"></a>
**B1. 対の微分と力の符号。** 二粒子の $U=Gm_1m_2/|q_1-q_2|$ について、$q_i\mapsto q_i+\varepsilon\eta_i$ に沿う微分を連鎖律で求めよ。得られる $F_1,F_2$ が等しく反対であることを示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$d=q_1-q_2$、$h=\eta_1-\eta_2$ と書き、$r_\varepsilon^2=|d+\varepsilon h|^2$ を微分すると $(r_\varepsilon^2)'|_0=2d\cdot h$。従って

$$
\delta U
=Gm_1m_2\left(-\frac12\right)
(|d|^2)^{-3/2}(2d\cdot h)
=-Gm_1m_2\frac{d\cdot(\eta_1-\eta_2)}{|d|^3}.
$$

$\eta_1,\eta_2$ の係数を別々に読むと

$$
F_1=-Gm_1m_2\frac{d}{|d|^3},
\qquad F_2=+Gm_1m_2\frac{d}{|d|^3}=-F_1.
$$

符号は引力であることと一致します。
<!-- solution-end -->

<a id="ex-celev1-b02"></a>
**B2. 境界項を落とさない。** 非衝突の滑らかな重心零ループ $q$ が内部でNewton方程式を満たすとする。周期変分の第一変分を端点速度差で表せ。位置端点条件だけで停留と言えるか。

- Level: B

<!-- solution-start -->
### 詳細解答

[第一変分の部分積分形](#prop-celev1-first-variation)で $m_i\ddot q_i-F_i=0$ と置くと

$$
\delta\mathcal A_T[q;\eta]
=\left[\sum_i m_i\dot q_i\cdot\eta_i\right]_0^T
=\sum_i m_i(\dot q_i(T)-\dot q_i(0))\cdot\eta_i(0).
$$

周期方向では $\eta_i(T)=\eta_i(0)$ ですが、その値が零とは限りません。従って内部方程式だけから境界項は消えません。ただし重心零で $\sum m_i\dot q_i=0$、相互作用が並進不変なので、第6節の射影操作により任意の周期 $h$ に拡張できます。全方向の停留には各速度差が零であることが必要で、そのとき境界項は十分に消えます。
<!-- solution-end -->

<a id="ex-celev1-b03"></a>
**B3. 衝突の冪指数。** $q_1=a|\sin(\pi t/T)|^\alpha e$、$q_2=-q_1$ ($a>0$) の等質量二体について、$0<\alpha<1$ の範囲で $q\in H^1$ かつ $\mathcal A_T[q]<\infty$ となる $\alpha$ を求めよ。端点衝突は残るか。

- Level: B

<!-- solution-start -->
### 詳細解答

端点近くで $s(t)\asymp t^\alpha$、$s'(t)\asymp t^{\alpha-1}$（非零定数倍）です。従って $|\dot q|^2$ の積分は $\int_0^\varepsilon t^{2\alpha-2}dt$ と同じ収束条件を持ち、$2\alpha-2>-1$、すなわち $\alpha>1/2$ が必要十分です。距離逆数の積分は $\int_0^\varepsilon t^{-\alpha}dt$ と同じ条件で、$\alpha<1$ が必要十分です。よって $1/2<\alpha<1$ で両者が有限。いずれも $s(0)=s(T)=0$ なので衝突は残ります。
<!-- solution-end -->

<a id="ex-celev1-b04"></a>
**B4. 逃走する最小化列。** $m_1=2,m_2=1,G=T=1$ とし、重心零の静止配置 $q_1=(R,0),q_2=(-2R,0)$ ($R>0$) を取る。作用と $H^1$ ノルムを求め、重心零制約が強制性を保証しないことを示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

重心は $2R-2R=0$。相対距離は $3R$、運動エネルギーは0なので

$$
\mathcal A_T[q]
=\frac{Gm_1m_2T}{3R}=\frac{2}{3R}.
$$

また $T=1$ で速度が零だから

$$
\|q\|_{H^1}^2
=\int_0^1(|q_1|^2+|q_2|^2)dt
=R^2+4R^2=5R^2.
$$

$R\to\infty$ で作用は0に近づく一方、ノルムは無限大です。したがって[強制性の定義](../../../解析系/VAR/VAR9/index.md#def-var9-coercivity)の対偶となる列を構成できました。
<!-- solution-end -->

### Level C

<a id="ex-celev1-c01"></a>
**C1. 質量が異なる二体の周期停留軌道。** $m_1,m_2,G>0$、重心零、相対距離を $a>0$ とする。(i) $q_1=(m_2/M)a e(t),\ q_2=-(m_1/M)a e(t)$、$e(t)=(\cos\omega t,\sin\omega t)$ の重心・距離を確かめよ。(ii) Newton方程式から $\omega^2=GM/a^3$ を導け。(iii) この円軌道の $K,U,\mathcal A_T$ を求めよ。ただし $T=2\pi/\omega$。(iv) これが $\mathcal H_T$ 内の作用の大域最小であるとここまでの議論から結論できるか、衝突・強制性・停留性の区別を用いて説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(i) $M=m_1+m_2$ とすると

$$
m_1q_1+m_2q_2
=\left(\frac{m_1m_2}{M}-\frac{m_1m_2}{M}\right)ae=0.
$$

また $q_1-q_2=((m_2+m_1)/M)ae=ae$、よって距離は $a$。

(ii) $\ddot e=-\omega^2e$。粒子1のNewton方程式は

$$
-m_1\frac{m_2}{M}a\omega^2e
=Gm_1m_2\frac{-ae}{a^3}
=-\frac{Gm_1m_2}{a^2}e.
$$

正の $m_1m_2a$ を除して $\omega^2=GM/a^3$。粒子2も作用反作用から同じ条件を得ます。

(iii) 円運動の速度の大きさは $\omega(m_2/M)a$、$\omega(m_1/M)a$ なので、縮約質量 $\mu=m_1m_2/M$ を使って

$$
\begin{aligned}
K&=\frac12\omega^2a^2
\left(m_1\frac{m_2^2}{M^2}+m_2\frac{m_1^2}{M^2}\right)\\
&=\frac12\mu\omega^2a^2
=\frac{Gm_1m_2}{2a}.
\end{aligned}
$$

また $U=Gm_1m_2/a$。従って

$$
\mathcal A_T[q]=T(K+U)
=\frac{3TGm_1m_2}{2a}.
$$

位置・速度ともに $T$ 周期であり非衝突なので、[周期停留命題](#prop-celev1-periodic-stationarity)より停留軌道です。

(iv) 停留は第一変分が零というだけであり、すべての許容曲線の中で作用が最小とは言えません。[重心零での非強制性](#prop-celev1-no-coercivity)は、このままの集合では大域最小を確保できないことを示しています。また、[有限作用の衝突例](#prop-celev1-finite-collision)により、有限作用と非衝突は同値ではありません。従って存在・非衝突・停留・極小はそれぞれ独立した確認が必要です。
<!-- solution-end -->

## 10. 次章に持ち越す課題

周期曲線を $H^1$ で比較し、Newton作用を衝突点でも定義できました。さらに**非衝突で滑らかなら**第一変分の停留条件がNewton方程式と速度接合に一致すると分かりました。

しかし、このままの重心零ループ空間では、作用を減らす列が無限遠へ逃げます。有限作用でも衝突がありえます。次のCELEV2では、**どの対称性・制約が最小化列を有界に保ち、直接法のどの仮定を実際に満たせるのか**を個々に確認します。