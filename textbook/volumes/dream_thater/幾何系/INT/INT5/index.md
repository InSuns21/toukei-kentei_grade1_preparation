# INT5 正準摂動論と共鳴

[作用角変数](../INT3/index.md#def-int3-action-angle)では、可積分Hamilton系の角度は一定速度で進みます。しかし角度依存の摂動を加えると、作用は変動します。[INT4の一次ホモロジー方程式](../INT4/index.md#def-int4-homological)は、どのFourierモードが除去できるかを教えました。まだ残っている問いは、その解が**実際に正準座標変換を作るのか**、そして共鳴して消せないモードがどのような運動を作るのか、ということです。

この章では生成関数から正準性を検証し、有限モードに対する一次標準形を証明します。次に、共鳴角は遅く、非共鳴角は速いという区別から、一自由度の振り子モデルと幅が摂動の平方根に比例する共鳴領域を導きます。有限次の剰余評価と、無限回変換の収束は別問題です。

## 1. 小さな正準変換を生成関数で作る

$n\ge2$、$D\subset\mathbb R^n$ は開集合、$\mathbb T^n=(\mathbb R/2\pi\mathbb Z)^n$ とします。$K\in C^4(D)$、$f\in C^3(D\times\mathbb T^n)$ は実数値で、$H_\varepsilon=K(I)+\varepsilon f(I,\theta)$ とします。座標の正準形式は $d\theta\wedge dI$、Hamilton方程式は $\dot\theta=\partial_IH$、$\dot I=-\partial_\theta H$ です。

古い角度を $\theta$、新しい作用を $J$ とする関数 $S(\theta,J)$ により、$I=\partial_\theta S$、$\varphi=\partial_J S$ を同時に定めます。$\theta\cdot J$ だけなら恒等変換であり、小さな周期関数を足すと恒等変換に近い写像が得られます。

<a id="def-int5-type2-generator"></a>

<!-- formal-statement-start -->
> **定義（第二種生成関数による近恒等正準変換）**  
> $W\in C^3(D\times\mathbb T^n;\mathbb R)$ を角度について周期的とし、角度の局所的な持ち上げ上で
>
$$
S_\varepsilon(\theta,J)=\theta\cdot J+\varepsilon W(J,\theta)
$$
>
> を考える。関係
>
$$
I=J+\varepsilon\partial_\theta W(J,\theta),\qquad
\varphi=\theta+\varepsilon\partial_JW(J,\theta)\pmod{2\pi}
$$
>
> が局所的に $(I,\theta)$ と $(J,\varphi)$ の間の可逆な写像を定めるとき、これを $S_\varepsilon$ が生成する近恒等正準変換という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int5-type2-generator -->
### 直接例：一つの波で作用と角度を両方動かす

$W(J,\theta)=a(J)\sin\theta_1$ とします。定義により
$$
I_1=J_1+\varepsilon a(J)\cos\theta_1,\quad
I_j=J_j\ (j\ne1),\quad
\varphi_j=\theta_j+\varepsilon\partial_{J_j}a(J)\sin\theta_1.
$$
$a$ が定数なら $\varphi=\theta$、$I_1=J_1+\varepsilon a\cos\theta_1$ となり、逆写像も直接書けます。$a$ が作用に依存すれば角度も変わります。「作用だけをずらす」一般の変換は正準とは限らず、両方の式を使うのが重要です。
<!-- definition-example-end -->

<a id="prop-int5-canonical-map"></a>

<!-- formal-statement-start -->
> **命題（生成写像の正準性と局所可逆性）**  
> $W\in C^3(D\times\mathbb T^n)$ は実数値かつ角度周期的とする。コンパクト集合 $B\Subset D$ と $\theta\in\mathbb T^n$ に対して、$|\varepsilon|$ が十分小さければ、上の式は $B$ の近傍において局所可逆な $C^2$ 正準変換を定める。すなわち
>
$$
\sum_{j=1}^n d\theta_j\wedge dI_j
=\sum_{j=1}^n d\varphi_j\wedge dJ_j.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正準性は「生成関数だから」と済ませず、微分形式を直接照合します。局所可逆性は混合二階微分が単位行列に近いことから確かめます。$\theta\cdot J$ はトーラス上で単価関数ではありませんが、変換の二つの式は周期的で矛盾なく定義されます。

<!-- proof-start -->
### 証明

$\partial_\theta S=I$、$\partial_JS=\varphi$ から
$$
dS=\sum_j I_j\,d\theta_j+\sum_j\varphi_j\,dJ_j,
\qquad
d(S-J\cdot\varphi)=\sum_j I_j\,d\theta_j-\sum_j J_j\,d\varphi_j.
$$
両辺の外微分を取り $d^2=0$ を使うと
$$
\sum_j dI_j\wedge d\theta_j-\sum_j dJ_j\wedge d\varphi_j=0.
$$
両項の順序を交換して符号を変えれば主張した正準形式の保存を得ます。

$(\theta,J)\mapsto(\theta,I)$ の $J$ に関するJacobianは
$$
\frac{\partial I}{\partial J}=
\operatorname{Id}_n+\varepsilon\partial^2_{J\theta}W.
$$
$B\times\mathbb T^n$ 上でこの行列は一様に単位行列へ近づきます。例えばその摂動項の作用素ノルムが $1/2$ 未満なら逆行列が存在します。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $J=J(I,\theta,\varepsilon)$ が局所的に求まり、続いて $\varphi$ を計算できます。局所的な持ち上げを $2\pi m$ だけ変えても $S$ の勾配が規定する $\varphi$ は $2\pi m$ だけ変わるだけで、トーラス上の写像は一意です。
<!-- proof-end -->

この命題は小さな $\varepsilon$ についての**局所**結果です。全ての作用領域で大域的な変換が存在すると主張してはいません。

## 2. 一次平均化：消えるモードと残るモード

生成関数の符号を決めるには、Hamilton関数を実際に変換しなければなりません。$J$ を固定して、最初の式を代入すると
$$
K(I)=K(J)+\varepsilon\nabla K(J)\cdot\partial_\theta W(J,\theta)+O(\varepsilon^2).
$$
また $\theta=\varphi+O(\varepsilon)$ なので、一次項の $f$ は $f(J,\varphi)$ に置き換えられます。したがって
$$
\widetilde H_\varepsilon(J,\varphi)=
K(J)+\varepsilon\bigl[f(J,\varphi)+\Omega(J)\cdot\partial_\varphi W(J,\varphi)\bigr]
+O(\varepsilon^2),\quad \Omega=\nabla K.
$$

[INT4のホモロジー方程式](../INT4/index.md#def-int4-homological)の未知関数を $\chi$ とすると、ここでは $W=-\chi$ を選びます。生成関数の符号規約を取り違えると、平均化したつもりで角度依存項を二倍してしまいます。

<a id="prop-int5-first-order-average"></a>

<!-- formal-statement-start -->
> **命題（有限Fourier摂動の一次平均化）**  
> $K\in C^4(D)$、$f\in C^3(D\times\mathbb T^n)$ とし、$f$ は角度について有限Fourier和で、その波数集合を有限集合 $F\subset\mathbb Z^n$ とする。$B\Subset D$ はコンパクトで、全ての $J\in B$ と $k\in F\setminus\{0\}$ について
>
$$
|k\cdot\Omega(J)|\ge c>0
$$
>
> と仮定する。このとき $B$ の近傍で近恒等正準変換を選び、
>
$$
\widetilde H_\varepsilon(J,\varphi)
=K(J)+\varepsilon\langle f\rangle(J)+R_\varepsilon(J,\varphi),\qquad
\sup_{B\times\mathbb T^n}|R_\varepsilon|\le C\varepsilon^2
$$
>
> とできる。定数 $C$ と小さい $\varepsilon$ の許容範囲は、$K,f,B,c$ に依存する。これは一次の剰余評価であって、長時間の軌道近似を保証するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

角度依存の非零モードだけを、ゼロにならない分母で割ります。有限和なので微分も評価できます。新座標への代入で残る二次項を、コンパクト集合上のTaylor評価で抑えます。

<!-- proof-start -->
### 証明

$f(J,\theta)=\sum_{k\in F}f_k(J)e^{ik\cdot\theta}$ と書き、$f_0=\langle f\rangle$ とします。$F$ は実数値性を保つよう $F=-F$ としてよいので
$$
W(J,\theta)=-\sum_{k\in F\setminus\{0\}}
\frac{f_k(J)}{i\,k\cdot\Omega(J)}e^{ik\cdot\theta}.
$$
分母が $c$ 以上なので $W$ は $B$ の近傍で必要な次数まで滑らかであり、$f_{-k}=\overline{f_k}$ と分母の符号から実数値です。係数ごとに
$$
\Omega(J)\cdot\partial_\theta W
=-\sum_{k\ne0}f_k(J)e^{ik\cdot\theta}
=-f(J,\theta)+\langle f\rangle(J).
$$
[生成写像の正準性](#prop-int5-canonical-map)により、小さい $\varepsilon$ では局所的に変換できます。

変換式から、$I-J=\varepsilon W_\theta(J,\theta)$、$\theta-\varphi=-\varepsilon W_J(J,\theta)$ です。コンパクト集合の少し広い近傍で一階・二階微分は有界なので、一変数Taylor公式を線分 $J+t(I-J)$ に適用して
$$
K(I)=K(J)+\varepsilon\Omega(J)\cdot W_\theta(J,\theta)+O(\varepsilon^2).
$$
同じく平均値の定理より $f(I,\theta)-f(J,\varphi)=O(\varepsilon)$ です。$\theta-\varphi=O(\varepsilon)$ を $W_\theta$ に代入する際も、その差は $O(\varepsilon)$ です。以上を $H_\varepsilon=K(I)+\varepsilon f(I,\theta)$ に入れれば
$$
\widetilde H_\varepsilon
=K(J)+\varepsilon[f(J,\varphi)+\Omega(J)\cdot W_\varphi(J,\varphi)]
+O(\varepsilon^2)
=K(J)+\varepsilon f_0(J)+O(\varepsilon^2).
$$
有限個の有界な微分の最大値を使って、剰余の $O(\varepsilon^2)$ を一様な $C\varepsilon^2$ にできます。
<!-- proof-end -->

### 直接計算：共鳴のない一つの波

$K=\omega_1I_1+\omega_2I_2$、$f=a\cos(\theta_1-\theta_2)$、$\omega_1-\omega_2=\Delta\ne0$ とします。$\psi=\theta_1-\theta_2$ と置けば
$$
W=-\frac{a}{\Delta}\sin\psi,\qquad
\Omega\cdot\partial_\theta W=-a\cos\psi.
$$
$W$ は作用に依存しないので $\varphi=\theta$ です。また $I_1=J_1-\varepsilon(a/\Delta)\cos\psi$、$I_2=J_2+\varepsilon(a/\Delta)\cos\psi$。これをHamilton関数に**厳密に**代入すると、$\varepsilon a\cos\psi$ は相殺され $\widetilde H=\omega\cdot J$ となります。この特殊例では剰余が零です。ところが $|\Delta|\to0$ では変換の大きさ $\varepsilon|a/\Delta|$ が発散し、近恒等という前提が破れます。

## 3. 共鳴では「全角度平均」ではなく「共鳴射影」を残す

整数波数 $k$ と振動数 $\Omega_*$ が $k\cdot\Omega_*=0$ を満たすと、$e^{ik\cdot\theta}$ は非摂動軌道に沿って一定です。したがってこのモードを高速振動として平均で消してはいけません。共鳴が固定された局所モデルでは、残す波数を先に選びます。

<a id="def-int5-resonant-projection"></a>

<!-- formal-statement-start -->
> **定義（共鳴射影と一次共鳴標準形）**  
> 固定振動数 $\Omega_*\in\mathbb R^n$ と実数値有限Fourier和 $f(\theta)=\sum_{k\in F}f_ke^{ik\cdot\theta}$ に対し
>
$$
\mathcal R_*=\{k\in\mathbb Z^n:k\cdot\Omega_*=0\},\qquad
(P_*f)(\theta)=\sum_{k\in F\cap\mathcal R_*}f_ke^{ik\cdot\theta}
$$
>
> と定める。$K(I)=\Omega_*\cdot I$ の一次変換後に残る
>
$$
H_{\mathrm{res}}(J,\varphi)=
\Omega_*\cdot J+\varepsilon(P_*f)(\varphi)
$$
>
> を、この固定振動数に対する一次共鳴標準形という。$k=0$ は常に残る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int5-resonant-projection -->
### 直接例：速い和角と遅い差角

$\Omega_*=(1,1)$、$f=2\cos(\theta_1-\theta_2)+3\cos(\theta_1+\theta_2)$ とします。$k=(1,-1)$ では $k\cdot\Omega_*=0$、$k=(1,1)$ では $k\cdot\Omega_*=2$ です。従って $P_*f=2\cos(\theta_1-\theta_2)$ です。差角の波は残り、和角の波は除去できます。
<!-- definition-example-end -->

<a id="prop-int5-resonant-normal-form"></a>

<!-- formal-statement-start -->
> **命題（固定振動数での共鳴標準形）**  
> $K(I)=\Omega_*\cdot I$ とし、$f(\theta)$ は実数値有限Fourier和とする。全ての非共鳴波数 $k\in F\setminus\mathcal R_*$ について $k\cdot\Omega_*\ne0$ である。このとき滑らかな近恒等正準変換により
>
$$
\widetilde H_\varepsilon(J,\varphi)
=\Omega_*\cdot J+\varepsilon(P_*f)(\varphi)
$$
>
> が**厳密に**成立する。$f$ に作用依存がある、または $K$ が非線形の場合の同じ構成は一般に $O(\varepsilon^2)$ の剰余を伴う。
<!-- formal-statement-end -->

### 証明の見取り図

除去するのは $\mathcal R_*$ の外だけです。この場合 $W$ が作用に依存しないため、角度は変わらず、線形な $K$ のTaylor剰余も消えます。

<!-- proof-start -->
### 証明

$$
W(\theta)=-\sum_{k\in F\setminus\mathcal R_*}
\frac{f_k}{i\,k\cdot\Omega_*}e^{ik\cdot\theta}
$$
とします。有限和で分母は零でなく、$W$ は実数値です。$S=\theta\cdot J+\varepsilon W(\theta)$ は
$$
I=J+\varepsilon W_\theta(\theta),\qquad \varphi=\theta
$$
を与え、逆変換も $J=I-\varepsilon W_\theta(\theta)$ と明示できます。よって
$$
\begin{aligned}
H_\varepsilon(I,\theta)
&=\Omega_*\cdot J+
\varepsilon\bigl[\Omega_*\cdot W_\theta(\theta)+f(\theta)\bigr],\\
\Omega_*\cdot W_\theta
&=-\sum_{k\in F\setminus\mathcal R_*}f_ke^{ik\cdot\theta}
=-(f-P_*f).
\end{aligned}
$$
$\theta=\varphi$ を代入すると主張の式です。正準性は[生成写像の命題](#prop-int5-canonical-map)で確認済みです。作用依存のない線形模型だから厳密である点に注意します。
<!-- proof-end -->

この射影は固定した $\Omega_*$ で定義しました。非線形 $K$ で $k\cdot\Omega(J)$ が作用と共に零を横切る領域に、同じ分母除算をそのまま適用してはいけません。共鳴帯ではその波を**残して**局所座標で調べます。

## 4. 遅い共鳴角と速い角を切り分ける

二自由度で $k=(1,-1)$ の共鳴を考えます。角度差 $\psi=\theta_1-\theta_2$ が共鳴角、$\phi=\theta_2$ が残る角です。作用の変換は勝手に決めず、正準一形式が一致するように定めます。

<a id="def-int5-resonant-coordinates"></a>

<!-- formal-statement-start -->
> **定義（二自由度の差角共鳴座標）**  
> $(\theta_1,\theta_2,I_1,I_2)$ に対して
>
$$
\psi=\theta_1-\theta_2,\quad \phi=\theta_2,\qquad
P=I_1,\quad Q=I_1+I_2
$$
>
> と置く。逆変換は $\theta_1=\psi+\phi$、$\theta_2=\phi$、$I_1=P$、$I_2=Q-P$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int5-resonant-coordinates -->
### 直接例：保存作用と共鳴作用

$\cos(\theta_1-\theta_2)$ だけに依存する摂動なら、新Hamilton関数は $\phi$ に依存しないので $\dot Q=-\partial_\phi H=0$ です。一方 $P$ は $\psi$ によって変化します。元の $I_1+I_2$ の保存と一致します。
<!-- definition-example-end -->

この座標が正準であることを式から確認すると
$$
I_1\,d\theta_1+I_2\,d\theta_2
=P(d\psi+d\phi)+(Q-P)d\phi
=P\,d\psi+Q\,d\phi.
$$
外微分をとれば $d\theta_1\wedge dI_1+d\theta_2\wedge dI_2=d\psi\wedge dP+d\phi\wedge dQ$ です。

元の非摂動振動数が $\Omega_1,\Omega_2$ なら $\dot\psi=\Omega_1-\Omega_2$ です。$|\Omega_1-\Omega_2|$ が通常の大きさなら $\psi$ は速く回りますが、差が小さければ $\psi$ は遅く動きます。たとえば $\Omega_1-\Omega_2=\varepsilon\delta$、$\dot P=O(\varepsilon)$ なら、両者は $\tau=\varepsilon t$ 上で変動し得ます。一方、以下の非線形共鳴帯では典型的な振動時間は $O(\varepsilon^{-1/2})$ であり、全ての遅い角が同じ時間尺度を持つわけではありません。

## 5. 振り子の分離曲線は共鳴帯の境界である

共鳴項を残した後の一自由度Hamilton関数を具体的に解析します。$A>0$、$\varepsilon>0$、$v>0$、$\delta\in\mathbb R$ に対し
$$
h(p,\psi)=\delta p+\frac A2p^2-\varepsilon v\cos\psi.
$$
$p_c=-\delta/A$ とおくと、平方完成で
$$
h(p,\psi)=\frac A2(p-p_c)^2-\varepsilon v\cos\psi-\frac{\delta^2}{2A}.
$$
定数は運動に影響しないので、$u=p-p_c$ の振り子
$$
h_{\mathrm{pend}}(u,\psi)=\frac A2u^2-\varepsilon v\cos\psi
$$
だけを調べれば足ります。これは共鳴点の近くで非摂動関数を二次まで展開したときに現れる基本形です。

<a id="prop-int5-pendulum-width"></a>

<!-- formal-statement-start -->
> **命題（振り子共鳴帯と分離曲線）**  
> $A,\varepsilon,v>0$ のとき、$h_{\mathrm{pend}}=Au^2/2-\varepsilon v\cos\psi$ の $(u,\psi)=(0,0)$ は楕円型、$(0,\pi)$ は双曲型平衡点である。鞍点のエネルギーは $E_s=\varepsilon v$ で、分離曲線は
>
$$
u_\pm(\psi)=\pm2\sqrt{\frac{\varepsilon v}{A}}\left|\cos\frac\psi2\right|.
$$
>
> 作用方向の半幅は $2\sqrt{\varepsilon v/A}$、全幅は $4\sqrt{\varepsilon v/A}$ である。楕円型平衡点付近の微小振動角振動数は $\sqrt{A\varepsilon v}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

平衡点の型は線形化行列の固有値で見分けます。分離曲線は鞍点と同じエネルギーを解けばよく、幅の平方根則は運動エネルギー $u^2$ とポテンシャル障壁 $\varepsilon$ の釣合いから出ます。

<!-- proof-start -->
### 証明

Hamilton方程式は
$$
\dot\psi=\partial_uh_{\mathrm{pend}}=Au,\qquad
\dot u=-\partial_\psi h_{\mathrm{pend}}=-\varepsilon v\sin\psi.
$$
平衡点は $u=0$ かつ $\sin\psi=0$ なので、$\psi=0,\pi$（$2\pi$ を法として）です。$\psi=\psi_*+\eta$、$u=\xi$ と置き、一次の項を取ると
$$
\frac d{dt}\begin{pmatrix}\eta\\\xi\end{pmatrix}
=
\begin{pmatrix}0&A\\-\varepsilon v\cos\psi_*&0\end{pmatrix}
\begin{pmatrix}\eta\\\xi\end{pmatrix}.
$$
固有値は $\lambda^2=-A\varepsilon v\cos\psi_*$ を満たします。$\psi_*=0$ では $\lambda=\pm i\sqrt{A\varepsilon v}$、$\psi_*=\pi$ では $\lambda=\pm\sqrt{A\varepsilon v}$ であり、型と微小振動振動数が確定します。

鞍点 $(0,\pi)$ のエネルギーは $E_s=-\varepsilon v\cos\pi=\varepsilon v$ です。その等エネルギー集合について
$$
\frac A2u^2-\varepsilon v\cos\psi=\varepsilon v
\quad\Longrightarrow\quad
\frac A2u^2=\varepsilon v(1+\cos\psi)
=2\varepsilon v\cos^2(\psi/2).
$$
平方根を取って表示式を得ます。最大の $|u|$ は $\psi=0$ で $2\sqrt{\varepsilon v/A}$ です。上側と下側の最大値の差はその二倍になります。分離曲線における鞍点への接近には無限時間を要し、閉軌道と回転軌道の境界になります。
<!-- proof-end -->

### 具体的な二振動子で共鳴座標を確認する

$H=\frac a2(I_1^2+I_2^2)+\varepsilon v\cos(\theta_1-\theta_2)$、$a,v>0$ を考えます。[差角共鳴座標](#def-int5-resonant-coordinates)を代入すると
$$
H=a(P-Q/2)^2+\frac a4Q^2+\varepsilon v\cos\psi.
$$
$\phi$ がないため $Q$ は**厳密な第一積分**です。固定した $Q$ 上で $\psi$ を $\psi-\pi$ に移せば
$$
H-\frac a4Q^2=a(P-Q/2)^2-\varepsilon v\cos(\psi-\pi).
$$
$u=P-Q/2$、$A=2a$ と一致します。従ってこの具体例では共鳴帯の半幅が
$$
\sqrt{\frac{2\varepsilon v}{a}}
$$
と求まります。これは剰余を落とした近似ではなく、このモデルの厳密な分離曲線です。対して一般の非線形Hamilton系を局所展開した振り子は、捨てた高次項の大きさを確認しなければ近似でしかありません。

## 6. どこまで平均化してよいか

一次平均化では除去対象の各分母 $k\cdot\Omega(J)$ が作用領域で零から離れていることが必要でした。共鳴面に近づくと、生成関数は $\varepsilon/(k\cdot\Omega)$ だけ大きくなり、近恒等変換ではなくなります。その付近は共鳴項を残した標準形で調べるべきです。

振り子の幅 $O(\sqrt\varepsilon)$ は**作用方向の局所的な幅**を意味します。すべてのトーラスが破壊される幅、あるいは全ての初期値に対して無限時間有効な近似を意味しません。さらに複数の共鳴が交わる点では一つの共鳴角だけに落とせない場合があります。次章のBirkhoff標準形と後続のKAM理論では、形式的な除去、有限次剰余、反復の収束を区別して扱います。

## 7. 演習：生成関数から共鳴幅まで

### Level A

<a id="ex-int5-a01"></a>
**A1. 生成関数の二つの微分。** $W(J,\theta)=bJ_2\sin\theta_1$ に対し、$I$ と $\varphi$ を書け。角度補正を落とすと何が問題になるかを述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\partial_{\theta_1}W=bJ_2\cos\theta_1$、$\partial_{\theta_2}W=0$、$\partial_{J_1}W=0$、$\partial_{J_2}W=b\sin\theta_1$ です。[生成関数の定義](#def-int5-type2-generator)に代入して
$$
I_1=J_1+\varepsilon bJ_2\cos\theta_1,\quad I_2=J_2,\quad
\varphi_1=\theta_1,\quad\varphi_2=\theta_2+\varepsilon b\sin\theta_1.
$$
角度補正を捨てた写像では $d\theta_1\wedge dI_1+d\theta_2\wedge dI_2$ に $\varepsilon b\cos\theta_1\,d\theta_1\wedge dJ_2$ が残り、新しい正準形式と一致しません。実際には $d\varphi_2\wedge dJ_2$ が同じ項を持つため正準です。
<!-- solution-end -->

<a id="ex-int5-a02"></a>
**A2. 生成関数の符号。** $K=2I_1+3I_2$、$f=4\cos\theta_1$ に対して、一次の角度依存を消す $W$ を求め、方向微分で確かめよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\Omega=(2,3)$ で、$\Omega\cdot\partial_\theta\sin\theta_1=2\cos\theta_1$ です。$W=-2\sin\theta_1$ とすれば
$$
\Omega\cdot\partial_\theta W=-4\cos\theta_1=-f.
$$
従って[一次平均化の式](#prop-int5-first-order-average)に現れる $f+\Omega\cdot W_\theta$ は零です。$W=+2\sin\theta_1$ では逆に $8\cos\theta_1$ が残ってしまいます。
<!-- solution-end -->

<a id="ex-int5-a03"></a>
**A3. 共鳴射影。** $\Omega_*=(2,1)$ と $f=5+3\cos(\theta_1-2\theta_2)+\sin(\theta_1+\theta_2)$ に対して $P_*f$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 定数の波数は零なので残ります。$k_1=(1,-2)$ は $2-2=0$、$k_2=(1,1)$ は $2+1=3$ です。[共鳴射影の定義](#def-int5-resonant-projection)に従い
$$
P_*f=5+3\cos(\theta_1-2\theta_2).
$$
$\sin(\theta_1+\theta_2)$ は非共鳴なので一次で除去可能です。
<!-- solution-end -->

<a id="ex-int5-a04"></a>
**A4. 正準な差角座標。** $\psi=\theta_1-\theta_2$、$\phi=\theta_2$ に対し、旧作用が $I_1=P,I_2=Q-P$ となる理由を一形式から求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $d\theta_1=d\psi+d\phi$、$d\theta_2=d\phi$ を旧一形式へ入れると
$$
I_1d\theta_1+I_2d\theta_2
=I_1d\psi+(I_1+I_2)d\phi.
$$
これを $Pd\psi+Qd\phi$ と係数比較して $P=I_1$、$Q=I_1+I_2$ を得ます。逆に $I_2=Q-P$ です。従って座標変更は正準です。
<!-- solution-end -->

### Level B

<a id="ex-int5-b01"></a>
**B1. 二つの波の部分平均化。** $\Omega_*=(1,1)$、$f=2\cos(\theta_1-\theta_2)+6\sin(\theta_1+\theta_2)$ とする。共鳴成分を残す $W$ を求め、変換後のHamilton関数を検算せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $k_1=(1,-1)$ は共鳴、$k_2=(1,1)$ は $k_2\cdot\Omega_*=2$ です。共鳴項は残し、非共鳴項 $6\sin(\theta_1+\theta_2)$ のみを消します。方向微分が $-6\sin(\theta_1+\theta_2)$ となるよう
$$
W=3\cos(\theta_1+\theta_2)
$$
とします。実際 $(\partial_{\theta_1}+\partial_{\theta_2})W=-6\sin(\theta_1+\theta_2)$ です。$\varphi=\theta$、$I=J+\varepsilon W_\theta$ なので、$K=I_1+I_2$ を代入すると
$$
\widetilde H=(J_1+J_2)+\varepsilon[-6\sin(\varphi_1+\varphi_2)+f(\varphi)]
=J_1+J_2+2\varepsilon\cos(\varphi_1-\varphi_2).
$$
[固定振動数の共鳴標準形](#prop-int5-resonant-normal-form)の通り、この模型では剰余がありません。
<!-- solution-end -->

<a id="ex-int5-b02"></a>
**B2. 分離曲線を再導出する。** $h=2u^2-\varepsilon\cos\psi$、$\varepsilon>0$ の平衡点の型、鞍点エネルギー、半幅、微小振動角振動数を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $h=Au^2/2-\varepsilon v\cos\psi$ と比較して $A=4,v=1$ です。Hamilton方程式は $\dot\psi=4u$、$\dot u=-\varepsilon\sin\psi$。$(0,0)$ の線形化は $\ddot\psi=-4\varepsilon\psi$ で楕円型、角振動数は $2\sqrt\varepsilon$ です。$(0,\pi)$ の近くでは $\sin(\pi+\eta)\simeq-\eta$ なので $\ddot\eta=4\varepsilon\eta$、双曲型です。鞍点のエネルギーは $\varepsilon$、分離曲線は
$$
2u^2-\varepsilon\cos\psi=\varepsilon
\ \Longrightarrow\
u^2=\varepsilon\cos^2(\psi/2).
$$
従って $u_\pm=\pm\sqrt\varepsilon|\cos(\psi/2)|$、半幅 $\sqrt\varepsilon$、全幅 $2\sqrt\varepsilon$ です。[振り子共鳴帯の命題](#prop-int5-pendulum-width)と一致します。
<!-- solution-end -->

<a id="ex-int5-b03"></a>
**B3. なぜ共鳴面で変換が小さくないのか。** $K(I)=\frac12(I_1^2+I_2^2)$、$f=\cos(\theta_1-\theta_2)$ に対し、作用点 $I_1\ne I_2$ で形式的に $W$ を求め、共鳴面 $I_1=I_2$ で何が壊れるか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\Omega(I)=(I_1,I_2)$ なので、$\psi=\theta_1-\theta_2$ に沿った方向微分は $\Omega\cdot\partial_\theta\sin\psi=(I_1-I_2)\cos\psi$ です。よって
$$
W(I,\theta)=-\frac{\sin(\theta_1-\theta_2)}{I_1-I_2}
$$
が非共鳴点での形式解です。ところが $I_1=I_2$ で分母は零、$W$ の作用微分には $(I_1-I_2)^{-2}$ も現れます。[生成写像の式](#def-int5-type2-generator)の $I-J=\varepsilon W_\theta$、$\varphi-\theta=\varepsilon W_J$ を同時に小さくする一様評価がありません。共鳴面を横断するコンパクト集合では[一次平均化の分母下界](#prop-int5-first-order-average)も成立しません。
<!-- solution-end -->

<a id="ex-int5-b04"></a>
**B4. 離調は共鳴帯をずらす。** $h(p,\psi)=\delta p+3p^2-\varepsilon v\cos\psi$、$v,\varepsilon>0$ を平方完成し、帯の中心と半幅を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $3p^2+\delta p=3(p+\delta/6)^2-\delta^2/12$ なので、中心は $p_c=-\delta/6$ です。$A/2=3$、すなわち $A=6$ です。[振り子共鳴帯と分離曲線](#prop-int5-pendulum-width)をこの $A$ に適用すると、半幅は
$$
2\sqrt{\frac{\varepsilon v}{6}}=\sqrt{\frac{2\varepsilon v}{3}}.
$$
分離曲線は $p=p_c\pm2\sqrt{\varepsilon v/6}\,|\cos(\psi/2)|$ です。$\delta$ は中心を動かしますが、$A,v,\varepsilon$ を固定した幅自体は変えません。
<!-- solution-end -->

### Level C

<a id="ex-int5-c01"></a>
**C1. 二自由度共鳴の完全な縮約。** $a,v>0$ と $\varepsilon>0$ に対し
$$
H=\frac a2(I_1^2+I_2^2)+\varepsilon v\cos(\theta_1-\theta_2)
$$
を考える。(i) 正準変換で $Q=I_1+I_2$ を保存量として示せ。(ii) 固定した $Q$ での楕円型・双曲型平衡点と線形振動数を求めよ。(iii) 分離曲線の $I_1$ の半幅・全幅を求め、なぜ $O(\varepsilon)$ でなく $O(\sqrt\varepsilon)$ なのか説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) [差角共鳴座標](#def-int5-resonant-coordinates)を使い
$$
\psi=\theta_1-\theta_2,\quad\phi=\theta_2,\quad P=I_1,\quad Q=I_1+I_2.
$$
一形式の計算は $I_1d\theta_1+I_2d\theta_2=Pd\psi+Qd\phi$ なので正準です。$I_2=Q-P$ を代入すると
$$
H=\frac a2[P^2+(Q-P)^2]+\varepsilon v\cos\psi
=a(P-Q/2)^2+\frac a4Q^2+\varepsilon v\cos\psi.
$$
$\partial_\phi H=0$ より $\dot Q=0$ で、$Q$ を固定できます。

(ii) $u=P-Q/2$、$\eta=\psi-\pi$ とすると $\cos\psi=-\cos\eta$ なので、定数 $aQ^2/4$ を除いて
$$
h(u,\eta)=au^2-\varepsilon v\cos\eta.
$$
ここで $A=2a$ です。$(u,\eta)=(0,0)$、すなわち $(P,\psi)=(Q/2,\pi)$ は楕円型で、角振動数 $\sqrt{2a\varepsilon v}$ です。$(u,\eta)=(0,\pi)$、すなわち $(P,\psi)=(Q/2,0)$ は双曲型です。直接確かめると $\dot\eta=2au$、$\dot u=-\varepsilon v\sin\eta$、従って楕円点付近で $\ddot\eta=-2a\varepsilon v\,\eta$ です。

(iii) 鞍点の縮約エネルギーは $\varepsilon v$ なので
$$
au^2-\varepsilon v\cos\eta=\varepsilon v
\ \Longrightarrow\
au^2=2\varepsilon v\cos^2(\eta/2).
$$
従って $I_1=P=Q/2+u$ の半幅は $\sqrt{2\varepsilon v/a}$、全幅は $2\sqrt{2\varepsilon v/a}$ です。分離曲線では作用の二次エネルギー $au^2$ がポテンシャル障壁 $2\varepsilon v$ と釣り合うので、$u^2\asymp\varepsilon$、つまり $|u|\asymp\sqrt\varepsilon$ となります。非共鳴点での一次変換の大きさ $O(\varepsilon)$ とは異なる機構です。
<!-- solution-end -->
