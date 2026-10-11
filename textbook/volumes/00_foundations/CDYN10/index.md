# CDYN10 弱結合振動子から位相差方程式へ

[CDYN9の位相応答公式](../CDYN9/index.md#thm-cdyn9-response-formula)は、一つの振動子へ加わる外力が時計の進み方をどう変えるかを教えます。しかし二つの振動子を結ぶと、外力そのものが相手の状態に依存します。さらに、速く回る時計を平均して「位相差だけ」の式を得るには、誤差を何秒間制御できるかが問題になります。

本章では、まず**正確な四次元の結合方程式**を極座標へ直し、半径が引力で円の近くに保たれることを証明します。次に共通の速い回転を除き、[CDYN7の有限遅い時間の平均化](../CDYN7/index.md#thm-cdyn7-finite-slow-time)と同じ周期原始関数の方法で、長さ $L/\varepsilon$ の区間の位相差近似を正当化します。交換対称性の有無も明示的に比較します。

## 1. 二つの円を水平な結合でつなぐ

[CDYN9の吸引円](../CDYN9/index.md#prop-cdyn9-radial-attraction)の模型で $\lambda=1,c=0$ とした振動子を二つ置きます。状態 $X_i=(x_i,y_i)$ とその半径 $r_i=|X_i|$ を用い、添字は $i=1,2$、相手の添字は $j=3-i$ とします。

基本角速度は $\Omega>0$ とします。周波数の微小なずれ、結合係数、方向のずれはそれぞれ

$$
\nu_i\in\mathbb R,\qquad
\kappa_i\ge0,\qquad
\alpha_i\in\mathbb R
$$

で表します。

小さい $0<\varepsilon$ に対し、$\Omega_i=\Omega+\varepsilon\nu_i$ として

$$
\begin{aligned}
x_i'&=(1-r_i^2)x_i-\Omega_i y_i
+\varepsilon\kappa_i\{x_j\cos\alpha_i-y_j\sin\alpha_i-x_i\},\\
y_i'&=\Omega_i x_i+(1-r_i^2)y_i
\qquad(i=1,2;\ j=3-i)
\end{aligned}
$$

を調べます。相手の状態を角度 $\alpha_i$ だけ回してから**水平成分だけ**を接続します。水平だけにするのは、平均前の式に速い時刻依存性を残し、その消え方を自分の手で検算するためです。

$\varepsilon=0$ では両方とも半径1の吸引周期軌道を持ちます。初期値は $r_1(0)=r_2(0)=1$ とし、角度は任意です。$\kappa_i=0$ も許しますが、評価定数には $K=\max\{1,\kappa_1,\kappa_2\}$ を用います。

近い周波数という仮定 $\Omega_i-\Omega=\varepsilon\nu_i$ は重要です。差が固定された $O(1)$ の量なら、ここで使う同一の速い回転座標では位相差を遅い変数として扱えません。

## 2. 位相方程式を推測せずに計算する

原点以外で $X_i=r_i(\cos\theta_i,\sin\theta_i)$ と書き、相手からの水平入力を

$$
a_i=\kappa_i\{r_j\cos(\theta_j+\alpha_i)-r_i\cos\theta_i\}
$$

とします。まず、$x_i=r_i\cos\theta_i$、$y_i=r_i\sin\theta_i$ を微分して

$$
\begin{aligned}
x_ix_i'+y_iy_i'&=r_ir_i',\\
x_iy_i'-y_ix_i'&=r_i^2\theta_i'
\end{aligned}
$$

を得ます。元の直交座標方程式を代入すると、回転項は半径の計算で相殺され、

$$
\begin{aligned}
x_ix_i'+y_iy_i'
&=(1-r_i^2)(x_i^2+y_i^2)
+\varepsilon a_ix_i\\
&=r_i^2(1-r_i^2)+\varepsilon a_ir_i\cos\theta_i.
\end{aligned}
$$

一方、半径方向の項は角速度の計算で相殺され、

$$
\begin{aligned}
x_iy_i'-y_ix_i'
&=(\Omega+\varepsilon\nu_i)(x_i^2+y_i^2)
-\varepsilon a_iy_i\\
&=(\Omega+\varepsilon\nu_i)r_i^2
-\varepsilon a_ir_i\sin\theta_i.
\end{aligned}
$$

$r_i>0$ なので前者を $r_i$、後者を $r_i^2$ で割ると、

$$
\begin{aligned}
r_i'&=r_i(1-r_i^2)+\varepsilon a_i\cos\theta_i,\\
\theta_i'&=\Omega+\varepsilon\nu_i
-\varepsilon\frac{a_i}{r_i}\sin\theta_i.
\end{aligned}
$$

特に $a_i/r_i$ を展開すると

$$
\theta_i'=\Omega+\varepsilon\nu_i
+\varepsilon\kappa_i\left\{
\sin\theta_i\cos\theta_i
-\frac{r_j}{r_i}\sin\theta_i\cos(\theta_j+\alpha_i)
\right\}.
$$

この式は近似ではありません。$c=0$ では[CDYN9の漸近位相](../CDYN9/index.md#def-cdyn9-asymptotic-phase)が偏角そのものなので、角度 $\theta_i$ を位相として使えます。反対に $c\ne0$ の模型なら、[位相応答ベクトル](../CDYN9/index.md#def-cdyn9-phase-response)の半径成分まで考慮する必要があります。

<a id="def-cdyn10-exact-coupled-phase"></a>

<!-- formal-statement-start -->
### 定義（結合模型の正確な位相と位相差）

上の系の解が $r_1,r_2>0$ である区間で、連続に持ち上げた偏角 $\theta_i\in\mathbb R$ を各振動子の**正確な位相**、その差

$$
\delta(t)=\theta_2(t)-\theta_1(t)
$$

を**正確な位相差**とする。円周上の差は $[\delta]_{2\pi}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn10-exact-coupled-phase -->
**定義の確認**　両初期点が $(1,0)$ なら $\theta_1(0)=\theta_2(0)=0$ と持ち上げられ、$\delta(0)=0$ です。第二の角度だけ $2\pi$ 増やしても円周上の位相差は変わりません。一方、$\theta_1(0)=0$、$\theta_2(0)=\pi/2$ なら $[\delta(0)]_{2\pi}=[\pi/2]_{2\pi}$ です。
<!-- definition-example-end -->

ここでの正確な位相差の導関数は二つの角度方程式の差です。半径比や両方の絶対角度がまだ残っているため、**この段階では位相差だけの閉じた方程式ではありません**。

## 3. 半径が長時間にわたって円を離れない

[CDYN9の有限固定時間の位相近似](../CDYN9/index.md#thm-cdyn9-finite-phase-reduction)は、区間長を固定して半径を抑えました。ここで必要な $L/\varepsilon$ 区間にその誤差定数を流用することはできません。代わりに半径方向の一様な収縮を使います。

<a id="prop-cdyn10-radial-bound"></a>

<!-- formal-statement-start -->
### 命題（結合下の半径の一様評価）

第1節の模型で $r_1(0)=r_2(0)=1$、$K=\max\{1,\kappa_1,\kappa_2\}$、$0<\varepsilon K\le1/16$ とする。このとき解はすべての $t\ge0$ で存在し、

$$
\frac12\le r_i(t)\le\frac32,\qquad
|r_i(t)-1|\le4\varepsilon K
\qquad(i=1,2)
$$

が成り立つ。特に両位相はすべての正時刻で定義できる。
<!-- formal-statement-end -->

**証明の見取り図**　帯の境界で半径速度が内側を向くことを先に示します。その後、半径誤差を単に増幅する Lipschitz 評価ではなく、負の傾きによる収縮で抑えます。この順番にすれば、誤差定数が時間とともに増大しません。

<!-- proof-start -->
### 証明

両半径が $[1/2,3/2]$ にある間、三角関数の絶対値は1以下なので

$$
|a_i\cos\theta_i|
\le\kappa_i(r_i+r_j)\le3K.
$$

半径の自律部分を $f(r)=r(1-r^2)$ と置くと

$$
f(1/2)=3/8,\qquad f(3/2)=-15/8.
$$

よって $r_i=1/2$ では $r_i'\ge3/8-3\varepsilon K\ge3/16>0$、$r_i=3/2$ では $r_i'\le-15/8+3\varepsilon K<0$ です。初めて帯から出る時刻を仮定するとその境界で外向きに進まねばならず矛盾するため、両半径は帯を出ません。

$e_i=r_i-1$ とおくと

$$
f(r_i)=-(r_i-1)r_i(r_i+1)
=-e_i r_i(r_i+1).
$$

帯上で $r_i(r_i+1)\ge(1/2)(3/2)=3/4$。従って $e_i\ne0$ で符号を掛けて

$$
\frac d{dt}|e_i|
\le-\frac34|e_i|+3\varepsilon K.
$$

$e_i=0$ でも右上微分について同じ不等式が成り立ちます。積分因子 $e^{3t/4}$ を掛けて積分すると

$$
\begin{aligned}
|e_i(t)|&\le
3\varepsilon K\int_0^t e^{-3(t-s)/4}\,ds\\
&=4\varepsilon K(1-e^{-3t/4})
\le4\varepsilon K.
\end{aligned}
$$

角速度と入力は有界で、半径は原点から離れたコンパクトな帯にあります。直交座標の解も有界なので、[ODE8の最大解の延長判定](../ODE8/index.md#thm-ode8-continuation)から任意の有限時間まで延長できます。$\square$
<!-- proof-end -->

これにより、円から少しずつ離れて位相方程式が崩れるという問題は、この具体模型では起こりません。ただし半径が**厳密に1**という意味ではありません。

## 4. 共通の速い回転を平均する

位相の主要な $\Omega t$ を除いて、遅く動く変数

$$
\psi_i(t)=\theta_i(t)-\Omega t
$$

を考えます。[結合下の半径の一様評価](#prop-cdyn10-radial-bound)から

$$
\left|\frac{r_j}{r_i}-1\right|
=\frac{|r_j-r_i|}{r_i}
\le2(|r_j-1|+|r_i-1|)
\le16\varepsilon K
$$

です。したがって角度方程式を次の形へ**厳密に**書き直せます。

$$
\psi_i'=\varepsilon F_i(\Omega t,\psi)
+\varepsilon^2R_i(t),\qquad
|R_i(t)|\le16K^2,
$$

ただし

$$
\begin{aligned}
F_i(s,u)&=\nu_i+\kappa_i\{
\sin(s+u_i)\cos(s+u_i)\\
&\hspace{39pt}
-\sin(s+u_i)\cos(s+u_j+\alpha_i)\}.
\end{aligned}
$$

残差を実際に取り出します。角度方程式の相手入力の項だけに半径比が残るので、

$$
\begin{aligned}
&-\varepsilon\kappa_i\frac{r_j}{r_i}
\sin\theta_i\cos(\theta_j+\alpha_i)\\
&\quad=-\varepsilon\kappa_i
\sin\theta_i\cos(\theta_j+\alpha_i)\\
&\qquad-\varepsilon\kappa_i
\left(\frac{r_j}{r_i}-1\right)
\sin\theta_i\cos(\theta_j+\alpha_i).
\end{aligned}
$$

したがって、最終行を $\varepsilon^2R_i$ と置けば、

$$
R_i(t)=-\frac{\kappa_i}{\varepsilon}
\left(\frac{r_j(t)}{r_i(t)}-1\right)
\sin\theta_i(t)\cos(\theta_j(t)+\alpha_i)
$$

です。$\kappa_i\le K$、半径比の誤差が $16\varepsilon K$ 以下、三角関数の絶対値が1以下であることを順に使うと、

$$
|R_i(t)|\le\frac K\varepsilon\cdot16\varepsilon K
=16K^2.
$$

これは $\varepsilon>0$ で定義された残差であり、もとの位相速度に戻すと $\varepsilon^2R_i=O(\varepsilon^2)$ です。$F_i$ は速い角度 $s$ について $2\pi$ 周期で、$u=(u_1,u_2)$ には滑らかに依存します。

位相差へ戻る前に、一周期で何が残るかを定義します。

<a id="def-cdyn10-averaged-interaction"></a>

<!-- formal-statement-start -->
### 定義（平均相互作用関数）

第1節の $\kappa_i,\alpha_i$ に対して、相手との位相差 $d$ による**平均相互作用関数**を

$$
\mathcal H_i(d)=\frac{\kappa_i}{2}\sin(d+\alpha_i)
$$

と定める。第一の振動子が受ける平均作用は $\mathcal H_1(u_2-u_1)$、第二が受ける平均作用は $\mathcal H_2(u_1-u_2)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn10-averaged-interaction -->
**定義の確認**　$\kappa_1=2,\alpha_1=0$ なら $\mathcal H_1(d)=\sin d$ で、$d=\pi/2$ では1です。$\kappa_2=1,\alpha_2=\pi/2$ なら $\mathcal H_2(-d)=\tfrac12\cos d$ となり、第二の振動子の作用は第一の作用の単なる負とは限りません。
<!-- definition-example-end -->

<a id="prop-cdyn10-period-average"></a>

<!-- formal-statement-start -->
### 命題（水平結合の一周期平均）

第4節の $F_i$ の $s$ に関する $2\pi$ 平均は

$$
\overline F_i(u)=
\nu_i+\frac{\kappa_i}{2}\sin(u_j-u_i+\alpha_i)
=\nu_i+\mathcal H_i(u_j-u_i)
$$

である。
<!-- formal-statement-end -->

**証明の見取り図**　水平入力には「自分の水平成分」と「相手の水平成分」があります。前者の平均は0です。後者は積和公式で、速い角度の二倍で動く項と、位相差だけの項に分かれます。

<!-- proof-start -->
### 証明

$\langle h\rangle=(2\pi)^{-1}\int_0^{2\pi}h(s)\,ds$ と書きます。まず

$$
\sin(s+u_i)\cos(s+u_i)
=\frac12\sin(2s+2u_i)
$$

なので平均は0です。相手に関する積には

$$
\begin{aligned}
&\sin(s+u_i)\cos(s+u_j+\alpha_i)\\
&\quad=\frac12\sin(2s+u_i+u_j+\alpha_i)
+\frac12\sin(u_i-u_j-\alpha_i)
\end{aligned}
$$

を使います。第一項の積分は0、第二項は $s$ に依存せず、

$$
-\frac{\kappa_i}{2}\sin(u_i-u_j-\alpha_i)
=\frac{\kappa_i}{2}\sin(u_j-u_i+\alpha_i).
$$

$\nu_i$ は定数ですから主張を得ます。$\square$
<!-- proof-end -->

**速い時刻が消えるのは積分の後**です。例えば一瞬の相互作用 $\sin\theta_1\cos\theta_2$ が、各時刻で $\sin(\theta_1-\theta_2)/2$ と等しいわけではありません。

## 5. 平均方程式の誤差を遅い時間で保証する

平均を計算しただけでは、実際の位相が平均系に近いとは言えません。速く振動する項が $O(\varepsilon)$ の速度を持っていても、時間 $1/\varepsilon$ で積み重ならないことを証明します。

<a id="thm-cdyn10-averaging"></a>

<!-- formal-statement-start -->
### 定理（二振動子の有限遅い時間平均化）

第1節の模型で $r_1(0)=r_2(0)=1$、$\Omega>0$、$\kappa_i\ge0$、$\nu_i,\alpha_i\in\mathbb R$ とする。任意の固定 $L>0$ に対し、十分小さい $\varepsilon>0$ で、初期値 $u_i(0)=\theta_i(0)$ を持つ平均系

$$
\frac{du_i}{d\tau}
=\nu_i+\frac{\kappa_i}{2}
\sin(u_j-u_i+\alpha_i),
\qquad \tau=\varepsilon t
$$

は一意な大域解を持つ。さらに $\varepsilon$ に依存しない定数 $C_L$ があって、

$$
\sup_{0\le t\le L/\varepsilon}
|\theta_i(t)-\Omega t-u_i(\varepsilon t)|
\le C_L\varepsilon
\qquad(i=1,2)
$$

が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　[CDYN7の周期原始関数の方法](../CDYN7/index.md#lem-cdyn7-oscillatory-integral)を、ここでは二成分・状態依存の周期関数に対して式から確かめます。半径比の残差は $O(\varepsilon^2)$ なので、$L/\varepsilon$ の積分でも $O(\varepsilon)$ に留まります。

<!-- proof-start -->
### 証明

$F=(F_1,F_2)$、$\overline F=(\overline F_1,\overline F_2)$ とし、$g(s,u)=F(s,u)-\overline F(u)$ と置きます。[水平結合の一周期平均](#prop-cdyn10-period-average)により、すべての $u\in\mathbb R^2$ について

$$
\int_0^{2\pi}g(s,u)\,ds=0.
$$

周期原始関数を

$$
G(s,u)=\int_0^s g(v,u)\,dv
$$

と定めると、上の平均零により $G(s+2\pi,u)=G(s,u)$。$g$ とその $u$ 偏微分は三角多項式であり、$u\in\mathbb R^2$、$s\in\mathbb R$ にわたり有界です。従って定数 $C_0,C_1$ を選んで

$$
\|G(s,u)\|\le C_0,\qquad
\|D_uG(s,u)\|\le C_1
$$

とできます。ここでノルムは二次元の Euclid ノルムとその作用素ノルムです。

[半径の一様評価](#prop-cdyn10-radial-bound)を用いて角度の式を整理したので、ある定数 $M$ に対し、$0<\varepsilon K\le1/16$ の全時刻で

$$
\|\psi'(t)\|\le\varepsilon M
$$

が成り立ちます。実際、各成分の $|F_i|\le|\nu_i|+2K$ と $\varepsilon^2|R_i|\le\varepsilon K$ を合わせれば、例えば

$$
M=\sqrt2\{\max_i|\nu_i|+3K\}
$$

が使えます。

連鎖律を $G(\Omega t,\psi(t))$ へ適用すると

$$
\frac d{dt}G(\Omega t,\psi(t))
=\Omega g(\Omega t,\psi(t))
+D_uG(\Omega t,\psi(t))\psi'(t).
$$

従って $0\le t\le L/\varepsilon$ で

$$
\begin{aligned}
\varepsilon\int_0^t g(\Omega s,\psi(s))\,ds
&=\frac{\varepsilon}{\Omega}
\{G(\Omega t,\psi(t))-G(0,\psi(0))\}\\
&\quad-\frac{\varepsilon}{\Omega}
\int_0^tD_uG(\Omega s,\psi(s))\psi'(s)\,ds.
\end{aligned}
$$

ここから

$$
\left\|\varepsilon\int_0^t g(\Omega s,\psi(s))\,ds\right\|
\le\frac{\varepsilon}{\Omega}
(2C_0+C_1ML).
$$

さらに $|R_i|\le16K^2$ なので

$$
\left\|\varepsilon^2\int_0^t R(s)\,ds\right\|
\le16\sqrt2 K^2L\varepsilon.
$$

一方 $\overline F$ の各成分は定数と正弦関数の和なので、全空間で Lipschitz です。例えば正弦関数の差について $|\sin a-\sin b|\le|a-b|$ を使うと、

$$
\begin{aligned}
|\overline F_i(v)-\overline F_i(w)|
&\le\frac{\kappa_i}{2}
|(v_j-v_i)-(w_j-w_i)|\\
&\le\frac K2\sqrt2\,\|v-w\|.
\end{aligned}
$$

二成分をまとめれば $\|\overline F(v)-\overline F(w)\|\le B\|v-w\|$ として $B=K$ を選べます。また、

$$
\|\overline F(u)\|
\le\sqrt2\left(\max_i|\nu_i|+\frac K2\right)=:A
$$

なので、[ODE8の線形成長条件による大域存在](../ODE8/index.md#cor-ode8-global-linear-growth)において、次元 $d=2$、右辺 $F=\overline F$、定数 $A$ を上式、$B_{\mathrm{growth}}=0$ とすれば、平均系は全時刻で解を持ちます。大域 Lipschitz 性による一意性と合わせ、初期値から一意な大域解 $u(\tau)$ が存在します。$\widehat u(t)=u(\varepsilon t)$ は $\widehat u'=\varepsilon\overline F(\widehat u)$ を満たします。

$\psi(0)=\widehat u(0)$ ですから積分方程式を引くと、$E(t)=\|\psi(t)-\widehat u(t)\|$ に対して

$$
E(t)\le\varepsilon B\int_0^t E(s)\,ds
+\varepsilon\left\{
\frac{2C_0+C_1ML}{\Omega}
+16\sqrt2 K^2L\right\}.
$$

[ODE8のGrönwallの不等式](../ODE8/index.md#lem-ode8-gronwall)に $a=\varepsilon\{(2C_0+C_1ML)/\Omega+16\sqrt2K^2L\}$、$b=\varepsilon B$ を代入し、$\varepsilon t\le L$ を用いると

$$
E(t)\le\varepsilon e^{BL}
\left\{\frac{2C_0+C_1ML}{\Omega}
+16\sqrt2 K^2L\right\}.
$$

右辺は初期角度や $\varepsilon$ に依存しないので、二つの成分にも同じ上界を使えます。$\square$
<!-- proof-end -->

[CDYN7の平均化定理](../CDYN7/index.md#thm-cdyn7-finite-slow-time)はスカラーの分離形でした。ここではその証明に使われた「有界な周期原始関数を部分積分する」という核心を、二成分の三角多項式について再現したことになります。**固定した遅い時間 $L$** の範囲に限られ、$L\to\infty$ の誤差保証ではありません。

## 6. 位相差の閉じた方程式と交換対称性

平均系から、遅い位相差 $D(\tau)=u_2(\tau)-u_1(\tau)$ を作ります。

<a id="thm-cdyn10-phase-difference"></a>

<!-- formal-statement-start -->
### 定理（平均位相差方程式と正確な位相差との比較）

第5節の仮定の下で、$D(0)=\theta_2(0)-\theta_1(0)$ とすれば

$$
\frac{dD}{d\tau}
=\nu_2-\nu_1
+\frac{\kappa_2}{2}\sin(\alpha_2-D)
-\frac{\kappa_1}{2}\sin(D+\alpha_1)
$$

が成り立つ。さらに各 $L>0$ に対して定数 $C_L$ が存在し、正確な位相差 $\delta(t)$ と比較して

$$
\sup_{0\le t\le L/\varepsilon}
|\delta(t)-D(\varepsilon t)|
\le2C_L\varepsilon
$$

を満たす。ただし位相は初期値に一致する実数値の持ち上げで比較する。
<!-- formal-statement-end -->

**証明の見取り図**　二つの平均系の差を取る操作と、元の二つの角度の差を取る操作を区別します。比較するのは導関数の瞬間値ではなく、有限の遅い時間区間での**解の値**です。

<!-- proof-start -->
### 証明

平均方程式の $i=1$ と $i=2$ はそれぞれ

$$
\begin{aligned}
u_1'(\tau)&=\nu_1+\frac{\kappa_1}{2}\sin(u_2-u_1+\alpha_1),\\
u_2'(\tau)&=\nu_2+\frac{\kappa_2}{2}\sin(u_1-u_2+\alpha_2).
\end{aligned}
$$

第二式から第一式を引き、$D=u_2-u_1$ と $u_1-u_2=-D$ を代入すると表示した自律方程式を得ます。

次に[二振動子の有限遅い時間平均化](#thm-cdyn10-averaging)を各振動子に適用して解を比較します。正確な位相差は $\delta=\theta_2-\theta_1$、平均位相差は $D=u_2-u_1$ なので、

$$
\begin{aligned}
|\delta(t)-D(\varepsilon t)|
&=|(\theta_2-\Omega t-u_2)-(\theta_1-\Omega t-u_1)|\\
&\le|\theta_2-\Omega t-u_2|
+|\theta_1-\Omega t-u_1|\\
&\le2C_L\varepsilon.
\end{aligned}
$$

よって主張が従います。$\square$
<!-- proof-end -->

重要なのは、この定理は

$$
\delta'(t)=\varepsilon
\left\{\nu_2-\nu_1+\frac{\kappa_2}{2}\sin(\alpha_2-\delta)
-\frac{\kappa_1}{2}\sin(\delta+\alpha_1)\right\}
+O(\varepsilon^2)
$$

という**各時刻の導関数の近似を主張していない**ことです。平均前の $O(\varepsilon)$ の速い振動は瞬間的には残ります。近いのは積分された軌道です。

二つの振動子を入れ替えても方程式の形が変わらないのは、$\nu_1=\nu_2$、$\kappa_1=\kappa_2=\kappa$、$\alpha_1=\alpha_2=\alpha$ の場合です。このとき対称性が位相差に何をもたらすか確かめます。

<a id="prop-cdyn10-exchange-symmetry"></a>

<!-- formal-statement-start -->
### 命題（交換対称模型の奇な位相差ドリフト）

上の平均位相差方程式で $\nu_1=\nu_2$、$\kappa_1=\kappa_2=\kappa$、$\alpha_1=\alpha_2=\alpha$ とすると

$$
\frac{dD}{d\tau}=-\kappa\cos\alpha\sin D.
$$

従って右辺は $D$ の奇関数で、$D=0$ は平均系の平衡位相差である。結合方向が $\alpha=\pi/2$ のとき平均位相差ドリフトは恒等的に0となる。
<!-- formal-statement-end -->

**証明の見取り図**　振動子を交換すると $D$ は $-D$ に変わります。両振動子の相互作用が同一なら右辺が符号反転することを、正弦の差の公式から直接確かめます。

<!-- proof-start -->
### 証明

$\nu_2-\nu_1=0$ と $\kappa_1=\kappa_2=\kappa$ を[平均位相差方程式](#thm-cdyn10-phase-difference)へ入れると

$$
\frac{dD}{d\tau}
=\frac\kappa2\{\sin(\alpha-D)-\sin(\alpha+D)\}.
$$

$\sin(\alpha-D)=\sin\alpha\cos D-\cos\alpha\sin D$、$\sin(\alpha+D)=\sin\alpha\cos D+\cos\alpha\sin D$ なので

$$
\sin(\alpha-D)-\sin(\alpha+D)
=-2\cos\alpha\sin D.
$$

よって表示式が成立します。$\sin(-D)=-\sin D$ から奇性が分かり、$D=0$ では右辺0です。$\alpha=\pi/2$ では $\cos\alpha=0$ なので任意の $D$ で右辺0です。$\square$
<!-- proof-end -->

**対称性を失う反例**　$\nu_1=\nu_2$、$\kappa_1=\kappa_2=\kappa>0$ でも、$\alpha_1=0$、$\alpha_2=\pi/2$ とすれば

$$
\frac{dD}{d\tau}
=\frac\kappa2(\cos D-\sin D).
$$

$D=0$ で右辺は $\kappa/2>0$。したがって「同じ初期位相なら、平均系で差がずっと0」とは言えません。交換により結合方向のパラメータが一致しないため、**奇性を支えていた仮定が失われた**のです。

また $\kappa_1\ne\kappa_2$、$\alpha_1=\alpha_2=0$ では、今回の正弦模型に限っては右辺が $-(\kappa_1+\kappa_2)\sin D/2$ となり、たまたま奇性が残ります。逆に、非対称なら常に奇性が壊れると主張するのも誤りです。

次章ではこの**平均方程式**の平衡点、周波数差と結合強度の閾値、引込み域を検討します。本章の $O(\varepsilon)$ 評価だけから元の四次元系の無限時間同期を断言することはできません。

## 7. 演習と詳細解答

### A1. 円上の位相応答を再計算する

$c=0,\lambda=1$ の単一振動子で $\Phi=\theta$ とする。$\nabla\Phi(x,y)$ を求め、円上の外向き単位ベクトル $e_r$ と接線単位ベクトル $e_\theta$ に対する内積を計算せよ。

- Level: A
- ID: CDYN10-A1

<!-- solution-start -->
**詳細解答**　原点を除いた近傍で偏角 $\Phi=\theta$ を連続に持ち上げます。$x=r\cos\theta$、$y=r\sin\theta$ の微分は

$$
\begin{aligned}
dx&=\cos\theta\,dr-r\sin\theta\,d\theta,\\
dy&=\sin\theta\,dr+r\cos\theta\,d\theta
\end{aligned}
$$

です。第一式に $-y=-r\sin\theta$、第二式に $x=r\cos\theta$ を掛けて足すと、$dr$ の係数が相殺され、

$$
x\,dy-y\,dx
=r^2(\cos^2\theta+\sin^2\theta)\,d\theta
=r^2\,d\theta.
$$

$r^2=x^2+y^2>0$ で割り、$dx$、$dy$ の係数を比較すれば、

$$
d\Phi=-\frac y{r^2}\,dx+\frac x{r^2}\,dy,
\qquad
\nabla\Phi(x,y)=(-y/r^2,x/r^2).
$$

円上の点 $(\cos\theta,\sin\theta)$ では $Z(\theta)=(-\sin\theta,\cos\theta)$。$e_r=(\cos\theta,\sin\theta)$、$e_\theta=(-\sin\theta,\cos\theta)$ なので、

$$
Z\cdot e_r=-\sin\theta\cos\theta+\cos\theta\sin\theta=0,
$$

$$
Z\cdot e_\theta=\sin^2\theta+\cos^2\theta=1.
$$

[CDYN9の位相応答公式](../CDYN9/index.md#thm-cdyn9-response-formula)の $R=1,c=0$ とも一致します。
<!-- solution-end -->

### A2. 二つの三角項の平均

$u,v,\alpha$ を固定し、$s$ の $2\pi$ 平均で $\sin(s+u)\cos(s+u)$ と $\sin(s+u)\cos(s+v+\alpha)$ を求めよ。

- Level: A
- ID: CDYN10-A2

<!-- solution-start -->
**詳細解答**　[水平結合の一周期平均](#prop-cdyn10-period-average)で使う積和公式を、ここでは直接計算します。三角関数の積を和へ展開すると

$$
\sin(s+u)\cos(s+u)=\tfrac12\sin(2s+2u),
$$

$$
\sin(s+u)\cos(s+v+\alpha)
=\tfrac12\sin(2s+u+v+\alpha)
+\tfrac12\sin(u-v-\alpha).
$$

$2s$ を含む正弦を $0$ から $2\pi$ まで積分すると0です。従って前者の平均は0、後者は $\tfrac12\sin(u-v-\alpha)$ です。相手への入力には負号が付くため、位相の平均寄与は $\tfrac12\sin(v-u+\alpha)$ となります。
<!-- solution-end -->

### A3. 半径の境界判定

$0<\varepsilon K\le1/16$ とし、両半径が $[1/2,3/2]$ にあるとき、$r_i=1/2$ および $r_i=3/2$ で半径速度の符号を判定せよ。

- Level: A
- ID: CDYN10-A3

<!-- solution-start -->
**詳細解答**　[結合下の半径の一様評価](#prop-cdyn10-radial-bound)と同じ帯の境界判定を行います。両半径が $[1/2,3/2]$ にあるので、$|a_i\cos\theta_i|\le\kappa_i(r_i+r_j)\le3K$。$f(r)=r(1-r^2)$ は $f(1/2)=3/8$、$f(3/2)=-15/8$ です。従って

$$
r_i'|_{r_i=1/2}\ge3/8-3/16=3/16>0,
$$

$$
r_i'|_{r_i=3/2}\le-15/8+3/16=-27/16<0.
$$

下の境界では増加、上の境界では減少します。従って初期半径1から出た両解はこの帯を離れません。
<!-- solution-end -->

### A4. 対称結合の係数

$\kappa_1=\kappa_2=2$、$\alpha_1=\alpha_2=\pi/3$、$\nu_1=\nu_2$ の場合、平均位相差方程式を具体化せよ。$D=0$ での右辺も求めよ。

- Level: A
- ID: CDYN10-A4

<!-- solution-start -->
**詳細解答**　[交換対称模型の命題](#prop-cdyn10-exchange-symmetry)に $\kappa=2$、$\cos(\pi/3)=1/2$ を代入すると

$$
\frac{dD}{d\tau}=-2\cdot\tfrac12\sin D=-\sin D.
$$

$D=0$ では $\sin0=0$ より導関数は0です。$\pi/3$ という方向ずれは係数を弱めますが、奇関数という性質は残ります。
<!-- solution-end -->

### A5. 解の誤差と導関数の誤差は別

$z_\varepsilon(t)=\varepsilon\sin(2t)$ を $0\le t\le L/\varepsilon$ で考える。$\sup_t|z_\varepsilon(t)|$ と $\sup_t|z_\varepsilon'(t)|$ を求め、$\sup_t|z_\varepsilon(t)|=O(\varepsilon)$ から $\sup_t|z_\varepsilon'(t)|=O(\varepsilon^2)$ といえるか判定せよ。

- Level: A
- ID: CDYN10-A5

<!-- solution-start -->
**詳細解答**　$\varepsilon>0$、$L>0$ とし、区間の右端を $T=L/\varepsilon$ と置きます。$|z_\varepsilon(t)|\le\varepsilon$ ですが、上界 $\varepsilon$ を実際に取るのは $2t=\pi/2$、すなわち $t=\pi/4$ が区間内にあるときです。$0\le t\le\pi/4$ では $\sin(2t)$ が単調増加するので、

$$
\sup_{0\le t\le L/\varepsilon}|z_\varepsilon(t)|
=\begin{cases}
\varepsilon\sin(2L/\varepsilon)
& (L/\varepsilon<\pi/4),\\
\varepsilon & (L/\varepsilon\ge\pi/4).
\end{cases}
$$

特に固定した $L>0$ に対し十分小さい $\varepsilon$ では第二の場合になり、いずれにせよ $\sup_t|z_\varepsilon(t)|\le\varepsilon$ なので $O(\varepsilon)$ です。

微分すると

$$
z_\varepsilon'(t)=2\varepsilon\cos(2t).
$$

区間は $t=0$ を含み、その時の絶対値は $2\varepsilon$ です。したがってすべての $\varepsilon>0$ で

$$
\sup_{0\le t\le L/\varepsilon}|z_\varepsilon'(t)|
=2\varepsilon.
$$

これは $O(\varepsilon^2)$ ではありません。平均化で消えるのは速い変動の**積分効果**であり、各時刻の速い変動ではありません。
<!-- solution-end -->

### B1. 回転した水平入力の極座標表示

第二振動子の位置を $(r_2\cos\theta_2,r_2\sin\theta_2)$ とする。これを角度 $\alpha_1$ だけ回し、その水平成分と第一振動子の水平成分との差を入力とするとき、第一振動子の半径・角度への摂動項を導け。

- Level: B
- ID: CDYN10-B1

<!-- solution-start -->
**詳細解答**　回転後の水平成分は $r_2\cos(\theta_2+\alpha_1)$ なので

$$
a_1=\kappa_1\{r_2\cos(\theta_2+\alpha_1)-r_1\cos\theta_1\}.
$$

入力ベクトルは $(\varepsilon a_1,0)$ です。半径成分は $e_r\cdot(\varepsilon a_1,0)=\varepsilon a_1\cos\theta_1$。角速度の摂動は

$$
\frac{x_1\cdot0-y_1\cdot(\varepsilon a_1)}{r_1^2}
=-\varepsilon\frac{a_1}{r_1}\sin\theta_1.
$$

従って $r_1'=r_1(1-r_1^2)+\varepsilon a_1\cos\theta_1$ と

$$
\theta_1'=\Omega_1-\varepsilon\frac{a_1}{r_1}\sin\theta_1
$$

が得られます。$r_1>0$ を使う箇所は角速度の除算です。
<!-- solution-end -->

### B2. 半径比と位相速度の誤差

$r_1,r_2\ge1/2$、$|r_i-1|\le4\varepsilon K$、$\kappa_i\le K$ とする。$|r_j/r_i-1|$ と、角速度の相手入力で $r_j/r_i$ を1に置換したときの誤差を評価せよ。

- Level: B
- ID: CDYN10-B2

<!-- solution-start -->
**詳細解答**　まず

$$
\left|\frac{r_j}{r_i}-1\right|
=\frac{|r_j-r_i|}{r_i}
\le2\{|r_j-1|+|r_i-1|\}
\le16\varepsilon K.
$$

角速度の置換前後の差は

$$
-\varepsilon\kappa_i
\left(\frac{r_j}{r_i}-1\right)
\sin\theta_i\cos(\theta_j+\alpha_i).
$$

三角関数の絶対値は1以下なので

$$
|\text{差}|\le\varepsilon K\cdot16\varepsilon K
=16\varepsilon^2K^2.
$$

この二次誤差を長さ $L/\varepsilon$ で積分しても、高々 $16LK^2\varepsilon$ に留まります。
<!-- solution-end -->

### B3. 交換対称性が残すもの

$\nu_1=\nu_2$、$\kappa_1=\kappa_2=\kappa>0$、$\alpha_1=\alpha_2=\alpha$ とする。平均位相差の右辺が奇関数になることを示し、$\alpha=0$ と $\alpha=\pi/2$ で何が違うか計算せよ。

- Level: B
- ID: CDYN10-B3

<!-- solution-start -->
**詳細解答**　[平均位相差方程式](#thm-cdyn10-phase-difference)に $\nu_2-\nu_1=0$、$\kappa_1=\kappa_2=\kappa$、$\alpha_1=\alpha_2=\alpha$ を代入すると、

$$
D'=\frac\kappa2\{\sin(\alpha-D)-\sin(\alpha+D)\}.
$$

積和公式から $\sin(\alpha-D)-\sin(\alpha+D)=-2\cos\alpha\sin D$ となるため、

$$
D'=-\kappa\cos\alpha\sin D.
$$

$D$ を $-D$ に置けば右辺の符号が反転するので奇関数です。結合方向による違いは

$$
\begin{cases}
D'=-\kappa\sin D& (\alpha=0),\\
D'=0& (\alpha=\pi/2)
\end{cases}
$$

です。後者は結合が消えたという意味ではなく、**この次数の平均位相差ドリフト**が消えるという意味です。高次の効果をこの計算は排除しません。
<!-- solution-end -->

### B4. 結合方向の非対称性

$\nu_1=\nu_2$、$\kappa_1=\kappa_2=\kappa>0$、$\alpha_1=0$、$\alpha_2=\pi/2$ とする。平均位相差方程式を求め、$D=0$ の値が平衡か調べよ。また、交換対称性が成り立たない理由を述べよ。

- Level: B
- ID: CDYN10-B4

<!-- solution-start -->
**詳細解答**　[水平結合の一周期平均](#prop-cdyn10-period-average)で $u_2-u_1=D$、$u_1-u_2=-D$ を用い、第一のパラメータ $\alpha_1=0$ と第二のパラメータ $\alpha_2=\pi/2$ をそれぞれ代入すると、

$$
\begin{aligned}
\overline F_1(u)&=\nu_1+\frac\kappa2\sin(D+0),\\
\overline F_2(u)&=\nu_2+\frac\kappa2\sin(-D+\pi/2)
=\nu_2+\frac\kappa2\cos D.
\end{aligned}
$$

$D'=u_2'-u_1'$ であり、$\nu_2-\nu_1=0$ なので、

$$
D'=\frac\kappa2\cos D-\frac\kappa2\sin D
=\frac\kappa2(\cos D-\sin D).
$$

$D=0$ を代入すると $D'=\kappa/2>0$ なので平衡ではありません。

振動子のラベルを交換すると、第一に作用する結合方向0と第二に作用する結合方向 $\pi/2$ も交換されます。元の係数を保つ同じ方程式にはならず、この交換対称性の欠落が $D=0$ でのドリフトを許します。
<!-- solution-end -->

### C1. 非対称な二振動子を出発点から平均化する

第1節の模型で $\Omega=2$、$\kappa_1=2$、$\kappa_2=1$、$\alpha_1=0$、$\alpha_2=\pi/2$、$\nu_1=0$、$\nu_2=1/4$、$X_1(0)=X_2(0)=(1,0)$ とする。

1. $K$ と $\varepsilon$ の安全な範囲を示し、半径誤差と半径比の誤差を計算せよ。
2. 二つの一周期平均位相方程式と平均位相差方程式を導け。$\tau=0$ で $D'$ を求めよ。
3. 元の正確な位相差について $\delta'(0)$ を求め、2の値と比較せよ。
4. $0\le t\le L/\varepsilon$ における正確な位相差と平均位相差の関係を述べ、何を証明したことにはならないか説明せよ。

- Level: C
- ID: CDYN10-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$K=\max\{1,2,1\}=2$ です。例えば $0<\varepsilon\le1/32$ なら $\varepsilon K\le1/16$。従って[半径の一様評価](#prop-cdyn10-radial-bound)より

$$
\frac12\le r_i(t)\le\frac32,\qquad |r_i(t)-1|\le8\varepsilon.
$$

さらに

$$
\left|\frac{r_j}{r_i}-1\right|
\le2(8\varepsilon+8\varepsilon)=32\varepsilon.
$$

**(2)**　[水平結合の一周期平均](#prop-cdyn10-period-average)へ代入すると

$$
\frac{du_1}{d\tau}=\sin(u_2-u_1),
$$

$$
\frac{du_2}{d\tau}=\frac14+\frac12\cos(u_2-u_1).
$$

$D=u_2-u_1$ とすれば

$$
\frac{dD}{d\tau}=\frac14+\frac12\cos D-\sin D.
$$

初期角度はともに0なので $D(0)=0$、従って $D'(0)=1/4+1/2=3/4$ です。

**(3)**　元の初期角度は $\theta_1=\theta_2=0$。正確な位相方程式に現れる結合由来の項はどれも $\sin\theta_i$ を因子に持つため、時刻0では両方0です。従って

$$
\theta_1'(0)=2,\qquad
\theta_2'(0)=2+\frac{\varepsilon}{4},
$$

よって $\delta'(0)=\varepsilon/4$ です。平均系から予測した $\varepsilon D'(0)=3\varepsilon/4$ と**瞬間の速度は一致しません**。

**(4)**　[二振動子の有限遅い時間平均化](#thm-cdyn10-averaging)で、$\Omega=2$ を固定し $L>0$ も固定すると、

$$
\sup_{0\le t\le L/\varepsilon}
|\delta(t)-D(\varepsilon t)|\le2C_L\varepsilon.
$$

証明では、まず半径比の置換による位相速度の誤差を $O(\varepsilon^2)$ と評価します。次に、速い零平均項を積分した誤差を $O(\varepsilon)$、平均系の解との差を Grönwall 評価によって $O(\varepsilon)$ と抑えます。

したがって得られたのは有限の遅い時間での**解の比較**です。元の系の無限時間同期や平均系のすべての平衡点の安定性は、ここでは証明していません。各時刻の位相速度について $O(\varepsilon^2)$ の近似を得たわけでもありません。
<!-- solution-end -->

本章では、位相応答から出発して、半径収縮・周期平均・有限遅い時間誤差・交換対称性をそれぞれ別に検証しました。次章では得られた一次元平均位相差方程式を解析し、同期が生じる条件と引込み域を調べます。
