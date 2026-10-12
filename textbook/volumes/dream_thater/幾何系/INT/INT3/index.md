# INT3 作用角変数

[Liouville–Arnoldの定理](../INT2/index.md#thm-int2-liouville-arnold)によって、独立な可換第一積分のコンパクト連結な正則共通レベルはトーラスであり、その上の運動は一定速度の角度運動で表されます。しかし、異なるエネルギーのトーラスを一緒に扱うには、「トーラスのどこにいるか」に加えて「どのトーラスにいるか」を測る座標が要ります。さらに、運動方程式の形を保ったまま座標を選ぶ必要があります。

この章では、閉曲線に沿って $p\,dq$ を積分した**作用変数**と、その共役な**角変数**を作ります。調和振動子では積分を最後まで計算し、振り子では回転・往復運動を分けて、分離曲線に近づくと座標が壊れる理由まで追います。前章のトーラス定理と本章の正準座標化を区別することが出発点です。

## 1. 閉曲線が測る「トーラスの大きさ」

正準座標 $(q_1,\ldots,q_n,p_1,\ldots,p_n)$ ではシンプレクティック形式を $\omega=\sum_j dq_j\wedge dp_j$ とし、Hamiltonベクトル場を $\iota_{X_H}\omega=dH$ とします。1形式 $\alpha=\sum_jp_j\,dq_j$ は $d\alpha=-\omega$ を満たします。

一自由度の周期軌道 $\gamma_E$ について、Hamilton流が進む方向に積分する
$$
I(E)=\frac{1}{2\pi}\oint_{\gamma_E}p\,dq
$$
を考えます。閉じた軌道の囲む面積が $\oint p\,dq$ になるのは、平面の向きに注意した[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)による説明もできますが、以下では積分を軌道の上下の枝に分けて直接求めます。$I$ は角度一周を $2\pi$ と規格化した量です。

<a id="def-int3-action"></a>

<!-- formal-statement-start -->
> **定義（作用積分・作用変数）**  
> $(M^{2n},\omega)$ のコンパクト連結正則なLiouvilleトーラス $N_c$ の近傍で $d\alpha=-\omega$ を満たす1形式 $\alpha$ を選び、$H_1(N_c,\mathbb Z)$ の向きを指定した基底サイクル $\gamma_1(c),\ldots,\gamma_n(c)$ を滑らかに選ぶ。各
>
$$
I_j(c)=\frac{1}{2\pi}\oint_{\gamma_j(c)}\alpha\qquad(1\le j\le n)
$$
>
> を作用積分という。局所的にこれらをトーラスの横断方向の座標として用いるとき、$I=(I_1,\ldots,I_n)$ を作用変数という。基底サイクルの取り方で整数線形変換が生じ、原始1形式の選択で局所定数が変わり得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int3-action -->
### 直接例：円軌道の積分を計算する

**定義の確認**：正エネルギーの周期軌道に沿って $p\,dq$ を積分し、$2\pi$ で割った値が $I$ になることを確かめます。

$\nu>0$ とし、$H=(p^2+\nu^2q^2)/2=E>0$ の解を
$$
q=\frac{\sqrt{2E}}{\nu}\sin u,\qquad p=\sqrt{2E}\cos u,\qquad 0\le u\le2\pi
$$
と書きます。$dq=(\sqrt{2E}/\nu)\cos u\,du$ を代入すると
$$
\begin{aligned}
\oint p\,dq
&=\int_0^{2\pi}\sqrt{2E}\cos u\,
 \frac{\sqrt{2E}}{\nu}\cos u\,du\\
&=\frac{2E}{\nu}\int_0^{2\pi}\cos^2u\,du
=\frac{2\pi E}{\nu}.
\end{aligned}
$$
よって $I(E)=E/\nu$ です。$E=0$ では軌道が一点に潰れ、周期円の基底という定義の前提が失われます。
<!-- definition-example-end -->

ここで原始1形式の意味を確かめます。二つの原始形式 $\alpha,\widetilde\alpha$ が $d\alpha=d\widetilde\alpha=-\omega$ を満たせば、その差は閉1形式です。同じ局所トーラス族でサイクルを連続に動かす限り、その差の周期積分は一定です。したがって作用変数に生じる不定性はトーラスごとの任意関数ではなく、**局所的な加法定数**です。

## 2. 作用と共役な角度を作る

前章では各トーラスに座標 $\theta\in(\mathbb R/2\pi\mathbb Z)^n$ を入れ、運動を直線化しました。ところがトーラスを横断する向きとの組合せまで標準化して初めて、Hamilton方程式を全近傍で簡単にできます。

<a id="def-int3-action-angle"></a>

<!-- formal-statement-start -->
> **定義（作用角変数）**  
> シンプレクティック多様体の開集合 $U$ 上の座標 $(\theta_1,\ldots,\theta_n,I_1,\ldots,I_n)$ で、各 $\theta_j$ は $2\pi$ 周期の角度、$I_j$ は実数値であり、
>
$$
\omega|_U=\sum_{j=1}^n d\theta_j\wedge dI_j
$$
>
> を満たすものを作用角変数と呼ぶ。特に可積分Hamiltonianが $H=K(I)$ だけで表される場合を考える。上式から
>
$$
\dot I_j=0,\qquad \dot\theta_j=\frac{\partial K}{\partial I_j}
$$
>
> となり、$I$ は一定、$\theta$ は一定速度で進む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int3-action-angle -->
### 直接例：振動子の正準性を微分で検証する

**定義の確認**：$(\theta,I)$ の変換が定義の正準形式 $dq\wedge dp=d\theta\wedge dI$ を満たすことをJacobianから確認します。

$I>0$ として
$$
q=\sqrt{\frac{2I}{\nu}}\sin\theta,\qquad
p=\sqrt{2\nu I}\cos\theta
$$
を定めます。偏微分を各々計算すると
$$
q_\theta=\sqrt{\frac{2I}{\nu}}\cos\theta,\quad
q_I=\frac{\sin\theta}{\sqrt{2\nu I}},\quad
p_\theta=-\sqrt{2\nu I}\sin\theta,\quad
p_I=\sqrt{\frac{\nu}{2I}}\cos\theta .
$$
したがって
$$
\begin{aligned}
dq\wedge dp
&=(q_\theta p_I-q_Ip_\theta)\,d\theta\wedge dI\\
&=(\cos^2\theta+\sin^2\theta)\,d\theta\wedge dI
=d\theta\wedge dI.
\end{aligned}
$$
実際、$H=(p^2+\nu^2q^2)/2=\nu I$ で、$\dot\theta=\nu$、$\dot I=0$ です。作用積分の値と正準性の**両方**を確認しました。
<!-- definition-example-end -->

作用角の順序は $(\theta,I)$ です。$\omega=d\theta\wedge dI$ なので、$X_H=\sum_j(H_{I_j}\partial_{\theta_j}-H_{\theta_j}\partial_{I_j})$ です。$\omega=dI\wedge d\theta$ と取り違えると振動数の符号が逆になります。

## 3. 正則トーラスの近くで作用角変数はなぜ存在するか

結論は単なる「トーラス上に角度がある」以上の内容です。周囲のトーラスを滑らかに並べること、作用積分が局所座標になること、そして余分な $dI\wedge dI$ 項を消せることを順番に証明します。

<a id="thm-int3-local-action-angle"></a>

<!-- formal-statement-start -->
> **定理（局所作用角座標定理）**  
> $(M^{2n},\omega)$ を滑らかなシンプレクティック多様体とし、滑らかな $F=(F_1,\ldots,F_n)$ は $\{F_i,F_j\}=0$ を満たすとする。$F_1=H$ とし、$N=F^{-1}(c_0)$ が空でないコンパクト・連結な正則共通レベルであると仮定する。このとき $N$ のある近傍 $U$ と $I$ 空間の開球 $B$ があり、$U$ は $B\times\mathbb T^n$ と微分同相で、そこで滑らかな座標 $(I,\theta)$ を選び
>
$$
\omega=\sum_{j=1}^n d\theta_j\wedge dI_j,\qquad
F_i=f_i(I),\qquad H=K(I)
$$
>
> とできる。$I$ はサイクルの作用積分（定数の選択を除く）であり、$\dot\theta_j=\partial K/\partial I_j,\ \dot I_j=0$ である。トーラスごとの角度の原点には自由度がある。結論は一般には正則特異値をまたぐ大域座標の存在を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[INT2の周期格子](../INT2/index.md#lem-int2-lattice)を近接するレベルに連続的に運び、各方向に周期 $2\pi$ のベクトル場 $Y_j$ を作ります。このとき $\iota_{Y_j}\omega$ はトーラスに垂直な閉1形式なので作用 $I_j$ の微分になります。最後に角度の原点を $I$ の関数だけずらし、横断方向の余分な2形式を消します。

<!-- proof-start -->
### 証明

**第1段階：近傍をトーラスで埋める。** [正則共通レベルのLagrange性](../INT1/index.md#thm-int1-regular-fiber)から、正則な共通レベル $N$ はLagrange部分多様体です。

その次元は $n$ であり、$dF$ は $N$ 上で全射です。各点で沈め込み座標を取ります。コンパクトな $N$ は有限個のそのような近傍で覆えます。

そこで $N$ の管状近傍を十分狭めます。近くの値 $c$ のファイバーは滑らかな $n$ 次元部分多様体になります。一つの横断断面 $s(c)$ を選びます。

[可換流と全時間存在](../INT2/index.md#lem-int2-commuting-complete)によって $N$ 上の $\mathbb R^n$ 作用は完備です。コンパクトな近傍を狭め、近くのファイバーでも流れが定義される範囲を選びます。$c_0$ における周期格子の基底 $b_j(c_0)$ の近くで、戻り条件
$$
\Phi^{b_j(c)}(s(c))=s(c)
$$
を局所ファイバー座標で解きます。時間方向の微分は $X_{F_1},\ldots,X_{F_n}$ を列とする正則な $n\times n$ 行列なので、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $b_j(c)$ は滑らかに求まります。周期格子の原点近くの離散性と $N$ のコンパクト性から、$c$ の範囲を縮めればこの $n$ 本は引き続き格子の基底です（余分な短い周期が現れれば、極限で $N$ 上に新たな周期または原点に近い非零周期が得られ、いずれも元の格子基底に反します）。よって
$$
(c,\theta)\longmapsto
\Phi^{\,\sum_j b_j(c)\theta_j/(2\pi)}(s(c))
$$
はトーラス族の滑らかな座標です。ここで $\theta_j$ は $2\pi$ 周期です。$b_j(c)$ を列とする行列は可逆です。

**第2段階：周期ベクトル場から閉1形式を得る。** $\theta_j$ だけ増やすベクトル場を $Y_j=\partial_{\theta_j}$ とおきます。行列の成分 $a_{ij}(c)=b_{ij}(c)/(2\pi)$ を用いると
$$
Y_j=\sum_i a_{ij}(c)X_{F_i},\qquad
\iota_{Y_j}\omega=\sum_i a_{ij}(c)\,dc_i=:\sigma_j .
$$
$Y_j$ の流れ $\psi_j^t$ は $2\pi$ 後に恒等写像です。さらに $\sigma_j$ は $c$ のみの形式なので流れに沿って不変です。[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)と $d\omega=0$ から
$$
\mathcal L_{Y_j}\omega=d(\iota_{Y_j}\omega)=d\sigma_j .
$$
$\sigma_j$ は流れに沿って不変であるため、$\frac{d}{dt}(\psi_j^t)^*\omega=d\sigma_j$ です。$t=0$ から $2\pi$ まで積分して
$$
0=(\psi_j^{2\pi})^*\omega-\omega=2\pi\,d\sigma_j
$$
となります。したがって $\sigma_j$ は閉1形式です。$c$ 空間を小さな開球に取ったので、[閉形式の局所的な原始形式の存在](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)から $\sigma_j=dI_j(c)$ と書けます。ヤコビ行列 $(\partial I_j/\partial c_i)_{ji}=(a_{ij})_{ji}$ は可逆です。ゆえに $I$ が横断方向の座標になります。

**第3段階：シンプレクティック形式を標準化する。** いま $\iota_{Y_j}\omega=dI_j$ なので
$$
\beta=\omega-\sum_jd\theta_j\wedge dI_j
$$
に $Y_j$ を挿入すると零です。さらに $\mathcal L_{Y_j}\omega=d\sigma_j=0$、および角度の平行移動が $d\theta_j,dI_j$ を保つことから、$\beta$ は全ての角度に依存しません。したがって $\beta$ は $I$ 空間上の2形式です。$d\beta=0$ だから局所的に $\beta=d\eta$ と書け、$\eta=\sum_j g_j(I)dI_j$ と成分表示できます。角度を
$$
\theta'_j=\theta_j+g_j(I)
$$
と変更すると、$I$ はそのままで
$$
\sum_jd\theta'_j\wedge dI_j
=\sum_jd\theta_j\wedge dI_j+\sum_jdg_j\wedge dI_j
=\omega .
$$
角度変更は各トーラス上で平行移動にすぎないため、周期性は保たれます。

**第4段階：作用積分との一致。** トーラスへの制限では $\omega|_N=0$ です。上の管状近傍は $N$ に変形収縮します。

従って、[ホモトピー公式](../../GEO/GEO9/index.md#thm-geo9-homotopy-formula)から、閉2形式 $\omega$ と零形式との差は外微分で表せます。局所的に次を満たす1形式を取ります。

$$
d\alpha=-\omega .
$$

$Y_j$ が一周する閉曲線を $\gamma_j(c)$ とし、作用積分を $J_j=(2\pi)^{-1}\oint_{\gamma_j}\alpha$ と置きます。$c_i$ に関する微分は曲線の表示 $\gamma_j(c,u)$ に連鎖律と部分積分を使って
$$
\begin{aligned}
\partial_{c_i}J_j
&=\frac1{2\pi}\int_0^{2\pi}
(d\alpha)(\partial_{c_i}\gamma_j,\partial_u\gamma_j)\,du\\
&=\frac1{2\pi}\int_0^{2\pi}
\omega(\partial_u\gamma_j,\partial_{c_i}\gamma_j)\,du\\
&=\frac1{2\pi}\int_0^{2\pi}
dI_j(\partial_{c_i}\gamma_j)\,du
=\partial_{c_i}I_j .
\end{aligned}
$$
第2行では $d\alpha=-\omega$、第3行では $\partial_u\gamma_j=Y_j$ と $\iota_{Y_j}\omega=dI_j$ を用いました。よって $I_j-J_j$ は局所定数であり、定数を選べば作用積分そのものです。

最後に $F_i=c_i$ は $I$ の関数です。正準形式と $\iota_{X_H}\omega=dH$ を係数比較すると
$$
X_H=\sum_j\frac{\partial K}{\partial I_j}\partial_{\theta'_j},
\quad \dot I_j=0,\quad
\theta'_j(t)=\theta'_j(0)+t\frac{\partial K}{\partial I_j}.
$$
以上で局所作用角座標を構成できました。
<!-- proof-end -->

この証明が使ったのは、**正則・コンパクト・連結なトーラスの近傍**です。閉曲線の選択を変えると座標の値も変わるため、全位相空間で一本の作用角座標を作れるとは限りません。分離曲線のような特異レベルでは、そもそも第1段階の周期格子が一定階数になりません。

## 4. 周期と振動数を作用の微分から取り出す

一自由度では、作用積分を微分すると周期が出ます。これにより積分から力学的時間を逆算できます。

<a id="prop-int3-period-derivative"></a>

<!-- formal-statement-start -->
> **命題（作用のエネルギー微分と周期）**  
> $H=p^2/2+V(q)$ を滑らかな一自由度Hamiltonianとし、ある開エネルギー区間の各 $E$ に、臨界点を含まない滑らかなコンパクト連結周期軌道 $\gamma_E$ があるとする。Hamilton流の向きに $I(E)=(2\pi)^{-1}\oint_{\gamma_E}p\,dq$ を取ると
>
$$
\frac{dI}{dE}=\frac{T(E)}{2\pi}>0,
\qquad
\Omega(I)=\frac{dE}{dI}=\frac{2\pi}{T(E)} .
$$
>
> ここで $T(E)$ は軌道の正の最小周期である。
<!-- formal-statement-end -->

### 証明の見取り図

上下の運動量の枝に分け、$p=\pm\sqrt{2(E-V(q))}$ をエネルギーで微分します。両端の折返し点では $p=0$ なので積分端点の移動による項は出ません。[逆関数の微分公式](../../../基礎科目/RA/RA3/index.md#thm-ra3-inverse)が振動数になります。

<!-- proof-start -->
### 証明

往復運動なら折返し点を $q_-(E)<q_+(E)$ として、正向きの上枝と逆向きの下枝を足すと
$$
I(E)=\frac1\pi\int_{q_-}^{q_+}\sqrt{2(E-V(q))}\,dq.
$$
端点の平方根は零です。端点近くは正則性から $E-V(q)$ が端点までの距離の一次程度なので、エネルギー微分の被積分関数は距離の $-1/2$ 乗程度で可積分です。まず端点を少し切った区間でLeibnizの公式を適用し、切り落とした部分の極限を取れば
$$
I'(E)=\frac1\pi\int_{q_-}^{q_+}\frac{dq}{\sqrt{2(E-V(q))}} .
$$
一方 $dq/dt=p$ なので、往復の周期は
$$
T(E)=2\int_{q_-}^{q_+}\frac{dq}{\sqrt{2(E-V(q))}} .
$$
したがって $I'(E)=T(E)/(2\pi)$ です。回転軌道の場合は位置角度の一周を積分区間に取り、片方向の速度の絶対値から $T=\int dq/|p|$ と同様に求まります。$T>0$ だから $I$ は局所的に可逆です。[逆関数の微分公式](../../../基礎科目/RA/RA3/index.md#thm-ra3-inverse)と $H=E(I)$ を用いて $\Omega=dE/dI=1/I'(E)=2\pi/T(E)$ を得ます。
<!-- proof-end -->

調和振動子では $I=E/\nu$ なので $T=2\pi/\nu$ が出ます。逆に周期がエネルギーで変わる非線形振動子では、$E(I)$ は一次式でなくなり、振動数も作用に依存します。この依存性が後の摂動論で重要になります。

## 5. 振り子：往復と回転を分けて積分する

$\kappa>0$ とし、円周位置 $q\bmod2\pi$ と実数運動量 $p$ からなる相空間で
$$
H(q,p)=\frac{p^2}{2}+\kappa(1-\cos q)
$$
を考えます。Hamilton方程式は $\dot q=p,\ \dot p=-\kappa\sin q$ です。安定平衡は $(0,0)$、不安定平衡は $(\pi,0)$（ともに位置は $2\pi$ 周期）で、後者のエネルギーは $2\kappa$ です。

### 往復運動 $0<E<2\kappa$

折返し角を $a(E)=\arccos(1-E/\kappa)\in(0,\pi)$ とすると、軌道の上枝は
$$
p_+(q,E)=\sqrt{2\{E-\kappa(1-\cos q)\}},
\qquad -a\le q\le a
$$
です。下枝は $p_-=-p_+$ で、Hamilton流は上枝では $q$ が増加し、下枝では減少します。したがって
$$
\begin{aligned}
I_{\mathrm{lib}}(E)
&=\frac1{2\pi}\left(
\int_{-a}^{a}p_+\,dq+\int_a^{-a}p_-\,dq\right)\\
&=\frac1\pi\int_{-a}^{a}p_+\,dq
=\frac2\pi\int_0^a\sqrt{2(E-\kappa(1-\cos q))}\,dq .
\end{aligned}
$$
周期は
$$
T_{\mathrm{lib}}(E)=4\int_0^{a(E)}
\frac{dq}{\sqrt{2(E-\kappa(1-\cos q))}},
\quad
\Omega_{\mathrm{lib}}(E)=\frac{2\pi}{T_{\mathrm{lib}}(E)}.
$$
$E\downarrow0$ では $1-\cos q\sim q^2/2$ なので小振幅では角振動数が $\sqrt\kappa$ に近づきます。

### 回転運動 $E>2\kappa$

このとき $E-\kappa(1-\cos q)>0$ が全ての $q$ で成り立ち、$p$ の符号は変わりません。$p>0$ の連結成分では
$$
I_{\mathrm{rot}}(E)=\frac1{2\pi}
\int_0^{2\pi}\sqrt{2(E-\kappa(1-\cos q))}\,dq,
$$
$$
T_{\mathrm{rot}}(E)=\int_0^{2\pi}
\frac{dq}{\sqrt{2(E-\kappa(1-\cos q))}}.
$$
$p<0$ の成分でもHamilton流の向きに一周すると、$p\,dq$ は正となり同じ正の作用値を得ます。ただしトーラスの向きを最初から位置角 $q$ の正方向に固定した場合は負の符号になります。**サイクルの向きの規約と物理的運動方向を混ぜない**ことが肝心です。

<a id="prop-int3-separatrix"></a>

<!-- formal-statement-start -->
> **命題（振り子の分離曲線で周期は発散する）**  
> 上記振り子で $E\uparrow2\kappa$ の往復運動を考えると、$T_{\mathrm{lib}}(E)\to+\infty$、したがって $\Omega_{\mathrm{lib}}(E)\to0$ である。$E=2\kappa$ の共通エネルギーレベルは正則な円ではなく、局所作用角座標定理の仮定を満たさない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $b\in(0,\pi)$ を固定すると、$E$ が $2\kappa$ に十分近いとき $a(E)>b$ です。さらに $E<2\kappa$ なので $0\le q\le b$ に対して
$$
\frac1{\sqrt{2(E-\kappa(1-\cos q))}}
\ge\frac1{\sqrt{2(2\kappa-\kappa(1-\cos q))}}
=\frac1{2\sqrt\kappa\cos(q/2)} .
$$
よって
$$
T_{\mathrm{lib}}(E)\ge
\frac2{\sqrt\kappa}\int_0^b\frac{dq}{\cos(q/2)}.
$$
$b\uparrow\pi$ では $\cos(q/2)\sim(\pi-q)/2$ なので右辺は対数的に発散します。$b$ は任意に $\pi$ に近く取れるため $T_{\mathrm{lib}}(E)\to\infty$ です。$E=2\kappa$ には $dH=p\,dp+\kappa\sin q\,dq=0$ となる $(\pi,0)$ が含まれます。流れはそこに停止するため周期的な正則円でなく、周期格子の構成が破綻します。
<!-- proof-end -->

分離曲線で作用の値自体が発散するわけではありません。被積分関数は収束しても、その**エネルギー微分が発散**するのです。実際、$E\uparrow2\kappa$ では $p_+(q,E)\to2\sqrt\kappa\cos(q/2)$ が $|q|\le\pi$ で成り立ち、
$$
I_{\mathrm{lib}}(E)\longrightarrow
\frac1\pi\int_{-\pi}^{\pi}2\sqrt\kappa\cos(q/2)\,dq
=\frac{8\sqrt\kappa}{\pi}.
$$
一方、回転側から $E\downarrow2\kappa$ とした場合は
$$
I_{\mathrm{rot}}(E)\longrightarrow
\frac1{2\pi}\int_0^{2\pi}2\sqrt\kappa|\cos(q/2)|\,dq
=\frac{4\sqrt\kappa}{\pi}.
$$
値の差は、往復する閉曲線と円筒を一周する閉曲線が**異なるサイクル**であることによります。二つを無理に一本の滑らかな作用変数でつなげてはいけません。

## 6. 二自由度の実計算と座標の非一意性

二つの独立振動子を
$$
H=\frac12(p_1^2+\nu_1^2q_1^2)+
\frac12(p_2^2+\nu_2^2q_2^2),\qquad \nu_1,\nu_2>0
$$
とします。$E_1,E_2>0$ の正則トーラスで各基本閉曲線に沿う積分はそれぞれ $I_j=E_j/\nu_j$ です。したがって
$$
q_j=\sqrt{\frac{2I_j}{\nu_j}}\sin\theta_j,\qquad
p_j=\sqrt{2\nu_jI_j}\cos\theta_j,
$$
$$
H=\nu_1I_1+\nu_2I_2,\quad
\omega=d\theta_1\wedge dI_1+d\theta_2\wedge dI_2,\quad
\Omega=(\nu_1,\nu_2).
$$
各座標対の微分は第2節の計算と同じで、異なる添字の交差項が零なので直和の正準性が従います。

<a id="prop-int3-unimodular"></a>

<!-- formal-statement-start -->
> **命題（サイクルの整数基底変換）**  
> $(I,\theta)\in B\times\mathbb T^n$ が作用角変数であり、$A\in GL(n,\mathbb Z)$ とする。このとき
>
$$
I'=AI,\qquad \theta'=A^{-\mathsf T}\theta
$$
>
> は局所作用角変数であり、$\sum_jd\theta'_j\wedge dI'_j=\sum_jd\theta_j\wedge dI_j$ である。新しい振動数は $\Omega'=A^{-\mathsf T}\Omega$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A$ と $A^{-1}$ は整数行列なので $A^{-\mathsf T}$ は角度格子 $2\pi\mathbb Z^n$ を保ち、$\theta'$ はトーラス上でwell-definedです。行列表記で
$$
(d\theta')^{\mathsf T}\wedge dI'
=(A^{-\mathsf T}d\theta)^{\mathsf T}\wedge(AdI)
=(d\theta)^{\mathsf T}A^{-1}A\wedge dI
=(d\theta)^{\mathsf T}\wedge dI
$$
です。ここで行列との積は成分ごとに線形に展開したウェッジ積を意味します。$I$ が一定なので $\dot\theta'=A^{-\mathsf T}\dot\theta=A^{-\mathsf T}\Omega$ です。
<!-- proof-end -->

これは同じトーラスを異なる整数周期基底で記述したものです。作用は座標の数値そのものに絶対的意味があるのではなく、**基本サイクルと組で定まる**量です。

## 7. 演習：積分・正準性・特異レベルの区別

### Level A

<a id="ex-int3-a01"></a>
**A1. 楕円の作用を直接求める。** $\nu>0$、$H=(p^2+\nu^2q^2)/2$ のエネルギー $E>0$ について、Hamilton流の向きに $p\,dq$ を積分して $I(E)$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $q=(\sqrt{2E}/\nu)\sin u,\ p=\sqrt{2E}\cos u$ とおきます。Hamilton方程式 $\dot q=p$ から $\dot u=\nu>0$ であり、$u$ の増加は流れの向きです。$dq=(\sqrt{2E}/\nu)\cos u\,du$ なので
$$
I(E)=\frac1{2\pi}\frac{2E}{\nu}
\int_0^{2\pi}\cos^2u\,du
=\frac1{2\pi}\frac{2E}{\nu}\pi
=\frac E\nu.
$$
<!-- solution-end -->

<a id="ex-int3-a02"></a>
**A2. 正準Jacobianの確認。** $q=\sqrt{2I/\nu}\sin\theta,\ p=\sqrt{2\nu I}\cos\theta$（$I>0$）について、$(\theta,I)$ から $(q,p)$ へのJacobian行列式を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** まず
$$
q_\theta=\sqrt{2I/\nu}\cos\theta,\quad
q_I=\sin\theta/\sqrt{2\nu I},\quad
p_\theta=-\sqrt{2\nu I}\sin\theta,\quad
p_I=\sqrt{\nu/(2I)}\cos\theta.
$$
よって
$$
\det\frac{\partial(q,p)}{\partial(\theta,I)}
=q_\theta p_I-q_Ip_\theta
=\cos^2\theta+\sin^2\theta=1.
$$
したがって $dq\wedge dp=d\theta\wedge dI$ であり、正準です。
<!-- solution-end -->

<a id="ex-int3-a03"></a>
**A3. 振り子の折返し角。** $H=p^2/2+\kappa(1-\cos q)$、$\kappa>0$、$0<E<2\kappa$ とする。折返し位置を求め、$p>0$ の枝と $p<0$ の枝を表せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 折返し点では $p=0$ なので $\kappa(1-\cos q)=E$、すなわち $\cos q=1-E/\kappa\in(-1,1)$ です。$a=\arccos(1-E/\kappa)\in(0,\pi)$ とすると往復する位置区間は $[-a,a]$ です。エネルギーを運動量について解けば
$$
p_\pm(q)=\pm\sqrt{2(E-\kappa(1-\cos q))}.
$$
$q$ は上枝で増加し、下枝で減少します。従って両枝の $p\,dq$ は正の寄与になります。
<!-- solution-end -->

<a id="ex-int3-a04"></a>
**A4. 回転軌道の作用と周期。** 同じ振り子で $E>2\kappa$、$p>0$ とする。$I(E)$ と $T(E)$ を一周の定積分で表し、$I'(E)=T(E)/(2\pi)$ を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $E>\max V=2\kappa$ より $p(q)=\sqrt{2(E-V(q))}>0$ が全ての $q$ に存在します。$q$ は $0$ から $2\pi$ へ単調増加するため
$$
I(E)=\frac1{2\pi}\int_0^{2\pi}\sqrt{2(E-V(q))}\,dq,\quad
T(E)=\int_0^{2\pi}\frac{dq}{\sqrt{2(E-V(q))}}.
$$
被積分関数は正で、$E>2\kappa$ の近くで一様に零から離れています。ゆえに積分下微分ができ
$$
I'(E)=\frac1{2\pi}\int_0^{2\pi}
\frac{dq}{\sqrt{2(E-V(q))}}
=\frac{T(E)}{2\pi}.
$$
<!-- solution-end -->

### Level B

<a id="ex-int3-b01"></a>
**B1. 非結合二振動子の作用角表示。** $\nu_1,\nu_2>0$、$H=\sum_{j=1}^2(p_j^2+\nu_j^2q_j^2)/2$、各成分のエネルギーは正とする。$I_j,\theta_j$ を具体的に構成し、正準性と振動数ベクトルを確かめよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 各成分を $E_j=(p_j^2+\nu_j^2q_j^2)/2>0$ とすると第1節の作用積分から $I_j=E_j/\nu_j$ です。$q_j=\sqrt{2I_j/\nu_j}\sin\theta_j$、$p_j=\sqrt{2\nu_jI_j}\cos\theta_j$ を採用します。$(q_j,p_j)$ はそれぞれの $(\theta_j,I_j)$ のみに依存し、[一自由度の正準性確認](#def-int3-action-angle)と同じ偏微分を行うと $dq_j\wedge dp_j=d\theta_j\wedge dI_j$ です。従って
$$
\omega=\sum_{j=1}^2d\theta_j\wedge dI_j,\qquad
H=\nu_1I_1+\nu_2I_2.
$$
Hamilton方程式から $\dot I=(0,0)$、$\dot\theta=(\nu_1,\nu_2)$ です。
<!-- solution-end -->

<a id="ex-int3-b02"></a>
**B2. 周期基底を変えると角度はどう変わるか。** $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ とする。$I'=AI$ に対して正準性を保つ $\theta'$ を求め、$H=\nu_1I_1+\nu_2I_2$ を $I'$ で表示して振動数を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ なので
$$
I'_1=I_1+I_2,\ I'_2=I_2,\quad
\theta'_1=\theta_1,\ \theta'_2=-\theta_1+\theta_2.
$$
確かに
$$
\begin{aligned}
d\theta'_1\wedge dI'_1+d\theta'_2\wedge dI'_2
&=d\theta_1\wedge(dI_1+dI_2)
+(-d\theta_1+d\theta_2)\wedge dI_2\\
&=d\theta_1\wedge dI_1+d\theta_2\wedge dI_2.
\end{aligned}
$$
$I_1=I'_1-I'_2,\ I_2=I'_2$ を代入すると $H=\nu_1I'_1+(\nu_2-\nu_1)I'_2$ です。従って $\Omega'=(\nu_1,\nu_2-\nu_1)$ で、$A^{-\mathsf T}(\nu_1,\nu_2)^{\mathsf T}$ と一致します。
<!-- solution-end -->

<a id="ex-int3-b03"></a>
**B3. 往復軌道の周期公式を再構成する。** $H=p^2/2+V(q)$ の正則な往復軌道が二つの単純折返し点 $q_\pm(E)$ を持つとして、作用積分から $I'(E)=T(E)/(2\pi)$ を導出せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 上枝では $p_+=\sqrt{2(E-V)}$、下枝では $p_-=-p_+$ で積分方向が逆です。このため
$$
I(E)=\frac1{2\pi}\left(\int_{q_-}^{q_+}p_+\,dq+
\int_{q_+}^{q_-}p_-\,dq\right)
=\frac1\pi\int_{q_-}^{q_+}\sqrt{2(E-V)}\,dq.
$$
折返し点で被積分関数は零であり、内部では $\partial_E\sqrt{2(E-V)}=1/\sqrt{2(E-V)}$ です。単純折返し点近くではこの微分は端点からの距離の $-1/2$ 乗で積分可能なので
$$
I'(E)=\frac1\pi\int_{q_-}^{q_+}\frac{dq}{\sqrt{2(E-V)}}.
$$
運動は上枝と下枝を各一回通り、$dt=dq/p$ だから $T(E)=2\int_{q_-}^{q_+}dq/\sqrt{2(E-V)}$ です。二式を比較して結論を得ます。
<!-- solution-end -->

<a id="ex-int3-b04"></a>
**B4. 分離曲線の二つの極限を比べる。** 振り子で $E\to2\kappa$ の往復側と回転側からの作用積分の極限を計算し、一致しない理由を説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $E=2\kappa$ を被積分関数へ代入すると $\sqrt{2(E-\kappa(1-\cos q))}=2\sqrt\kappa|\cos(q/2)|$ です。往復側は $-a\le q\le a$ の上下二枝を数えるので
$$
\lim_{E\uparrow2\kappa}I_{\mathrm{lib}}(E)
=\frac1\pi\int_{-\pi}^{\pi}2\sqrt\kappa\cos(q/2)\,dq
=\frac{2\sqrt\kappa}{\pi}[2\sin(q/2)]_{-\pi}^{\pi}
=\frac{8\sqrt\kappa}{\pi}.
$$
回転側は位置角の一周で一枝だけ数えるので
$$
\lim_{E\downarrow2\kappa}I_{\mathrm{rot}}(E)
=\frac1{2\pi}\int_0^{2\pi}2\sqrt\kappa|\cos(q/2)|\,dq
=\frac{2\sqrt\kappa}{2\pi}\cdot4
=\frac{4\sqrt\kappa}{\pi}.
$$
往復軌道は上下の二枝からなる閉曲線、回転は円筒を巻く一枝の閉曲線です。臨界点でサイクルの型が変わり、[局所作用角座標定理](#thm-int3-local-action-angle)の正則性も失われるため、二式を同一の滑らかな関数の左右極限と見なしてはいけません。
<!-- solution-end -->

### Level C

<a id="ex-int3-c01"></a>
**C1. 振り子と振動子の二自由度積分系。** $\kappa,\nu>0$ とし
$$
H=\frac{p_1^2}{2}+\kappa(1-\cos q_1)
+\frac{p_2^2+\nu^2q_2^2}{2}
$$
を考える。$q_1$ は円周角、$(q_2,p_2)\in\mathbb R^2$ とする。振り子成分が $0<E_1<2\kappa$、振動子成分が $E_2>0$ の共通レベルについて、(i) 正則・コンパクト・連結性、(ii) 各作用積分と $H(I)$ の局所表示、(iii) 振動数、(iv) $E_1\uparrow2\kappa$ で失われる仮定を導け。

- Level: C

<!-- solution-start -->
**詳細解答。** (i) 保存量を次のように置きます。

$$
H_1=\frac{p_1^2}{2}+\kappa(1-\cos q_1),\qquad
H_2=\frac{p_2^2+\nu^2q_2^2}{2},\\
F_1=H=H_1+H_2,\qquad F_2=H_2.
$$

成分エネルギー $H_1,H_2$ は異なる正準座標対の関数なので、[Poisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)の各項が零となり $\{H_1,H_2\}=0$ です。したがって $\{F_1,F_2\}=\{H_1+H_2,H_2\}=0$ であり、$F_1=H$ という定理の仮定も満たします。

$dH_1$ が零になる条件は $p_1=0$ と $\sin q_1=0$ の同時成立です。このとき第一成分のエネルギーは $E_1=0$ または $E_1=2\kappa$ に限られます。一方、$E_2>0$ 上では $dH_2\ne0$ です。$dH_1$ と $dH_2$ は異なる座標対に作用し、ともに非零なので一次独立です。さらに
$
dF_1=dH_1+dH_2,\qquad dF_2=dH_2
$
から、$a\,dF_1+b\,dF_2=0$ は $a\,dH_1+(a+b)\,dH_2=0$ と同値です。よって $a=0,\ a+b=0$、従って $a=b=0$ です。したがって $dF_1,dF_2$ も一次独立です。

振り子の往復軌道は一つの閉曲線であり、振動子の正エネルギー軌道は一つの楕円です。直積はコンパクト・連結な二次元トーラスです。従って[Liouville–Arnoldの定理](../INT2/index.md#thm-int2-liouville-arnold)の仮定を満たします。

(ii) $a(E_1)=\arccos(1-E_1/\kappa)$ として
$$
I_1(E_1)=\frac2\pi\int_0^{a(E_1)}
\sqrt{2(E_1-\kappa(1-\cos q))}\,dq,\qquad
I_2=\frac{E_2}{\nu}.
$$
[作用のエネルギー微分と周期](#prop-int3-period-derivative)から $dI_1/dE_1>0$ なので、任意の $E_1\in(0,2\kappa)$ の近傍で逆関数 $E_1=K_1(I_1)$ を定義できます。ゆえに $H=K_1(I_1)+\nu I_2$ です。振動子の $q_2,p_2$ は第2節の式で正準に表せ、振り子側は[局所作用角座標定理](#thm-int3-local-action-angle)により同じ局所正準形式を持ちます。

(iii) $T_1(E_1)=4\int_0^{a(E_1)}dq/\sqrt{2(E_1-\kappa(1-\cos q))}$ です。従って[逆関数の微分公式](../../../基礎科目/RA/RA3/index.md#thm-ra3-inverse)を使い
$$
\frac{\partial H}{\partial I_1}
=\frac{dE_1}{dI_1}=\frac{2\pi}{T_1(E_1)},
\qquad
\frac{\partial H}{\partial I_2}=\nu.
$$
これが振動数ベクトル $\Omega=(2\pi/T_1(E_1),\nu)$ です。

(iv) $E_1\uparrow2\kappa$ では[分離曲線での周期発散](#prop-int3-separatrix)により $T_1\to\infty$、第一振動数は零へ向かいます。ちょうど $E_1=2\kappa$ では振り子の鞍点で $dH_1=0$ となるため、$dF_1=dH_2=dF_2$ となり共通レベルの正則性が破れます。よって周期二トーラスを局所的に滑らかに並べる構成はそこをまたげません。作用 $I_1$ の有限極限と、正則な作用角座標の存続とは別問題です。
<!-- solution-end -->

## 8. 次章への橋：角度が速さを持つと小分母が現れる

可積分系は $H=K(I)$ なので、$\theta(t)=\theta(0)+t\nabla K(I)$ を直接書けます。次章では角度依存する小さい項 $\varepsilon H_1(I,\theta)$ を足します。角度方向にFourier級数を展開すると、$k\cdot\nabla K(I)$ で割りたくなる場面が現れます。作用角変数は可積分系の解法であると同時に、なぜ摂動が難しくなるかを式にする座標でもあります。
