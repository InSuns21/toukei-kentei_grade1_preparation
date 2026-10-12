# GMECH5 Marsden–Weinstein簡約

[GMECH4の正則運動量レベルの商定理](../GMECH4/index.md#thm-gmech4-smooth-quotient)によって、対称性を持つ系から滑らかな商多様体を作れる条件が分かりました。しかし、多様体を得ただけではHamilton方程式をそこで書けません。必要なのは、もとのシンプレクティック形式が商に残り、しかも退化しないことです。

商では同じ群軌道上の点を一つと見なします。したがって群軌道方向に2形式の値が残ると、代表点や持ち上げる接ベクトルの選び方で値が変わってしまいます。本章はまずその障害が消える理由を計算し、続いて商の非退化性を証明します。最後に対称なHamiltonianが商の上の力学を定めることを確かめ、平面回転対称系の遠心力項を導きます。

## 1. 2形式が商に降りるとは何か

$(M,\omega)$ を次元 $2n$ のシンプレクティック多様体とし、次元 $r$ のLie群 $G$ が滑らかに左Hamilton作用するとします。運動量写像 $J:M\to\mathfrak g^*$ は余随伴同変であり、符号は[GMECH2の運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)に合わせます。

$$
d\langle J,\xi\rangle=\iota_{\xi_M}\omega
\qquad(\xi\in\mathfrak g).
$$

値 $\mu\in\mathfrak g^*$ が正則値で、$L_\mu=J^{-1}(\mu)$ が空でなく、余随伴安定化群 $G_\mu$ が $L_\mu$ に自由かつ固有に作用すると仮定します。包含を $i:L_\mu\hookrightarrow M$、商射影を $\pi:L_\mu\to M_\mu=L_\mu/G_\mu$ と書きます。[正則運動量レベルの滑らかな商](../GMECH4/index.md#thm-gmech4-smooth-quotient)より $\pi$ は全射劣沈写像です。

元の形式を $L_\mu$ に制限して得る $i^*\omega$ は、一般には非退化とは限りません。群軌道の方向では値が零になり、その方向を商で取り除いたときに初めて非退化になることを狙います。

<a id="def-gmech5-basic-form"></a>

<!-- formal-statement-start -->
> **定義（基本2形式と商への降下）**  
> Lie群 $K$ が多様体 $N$ に滑らかに自由かつ固有に作用し、$\pi:N\to N/K$ を商射影とする。$N$ の滑らかな2形式 $\alpha$ が **基本的** であるとは、次の二条件を満たすことをいう。
>
> **（B1）不変性：** 各 $k\in K$ について $k^*\alpha=\alpha$。
>
> **（B2）水平性：** 各 $\xi\in\mathfrak k$ について $\iota_{\xi_N}\alpha=0$。
>
> このとき $\pi^*\bar\alpha=\alpha$ を満たす $N/K$ 上の2形式 $\bar\alpha$ を、$\alpha$ が商へ **降下した形式** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech5-basic-form -->
### 直接例：平行移動で消える座標

$M=T^*\mathbb R^2$ の座標を $(q_1,q_2,p_1,p_2)$ とし、$\omega=dq_1\wedge dp_1+dq_2\wedge dp_2$ とします。$G=(\mathbb R,+)$ が $q_1$ だけを $a$ だけ平行移動させると、$J=p_1$ です。[正則値の判定](../GMECH4/index.md#prop-gmech4-tangent-regular)を直接確認すると、$dJ=dp_1$ は全射であり、

$$
L_\mu=\{p_1=\mu\},\qquad
i^*\omega=dq_2\wedge dp_2.
$$

$G_\mu=G$ は $q_1$ 方向に自由かつ固有に作用します。制限形式は $q_1$ に依存せず、生成子 $\partial_{q_1}$ を入れると零なので（B1）、（B2）を満たします。商の点は $(q_2,p_2)$ で指定でき、$\pi(q_1,q_2,\mu,p_2)=(q_2,p_2)$ と置けば、

$$
\pi^*(dq_2\wedge dp_2)=i^*\omega
$$

が実際に成立します。消えたのは運動量 $p_1$ を固定したうえでの、対称性方向 $q_1$ です。
<!-- definition-example-end -->

## 2. 降下のために本当に必要な条件

基本性のうち、不変性はもとの群作用がシンプレクティックであることから期待できます。水平性は運動量写像の微分から導きます。これにより、群方向へ接ベクトルを付け足しても形式の値が変わらなくなります。

<a id="prop-gmech5-basic-restriction"></a>

<!-- formal-statement-start -->
> **命題（運動量レベル上の制限形式の基本性）**  
> $(M,\omega)$、$G$、同変運動量写像 $J$、正則値 $\mu$、非空な $L_\mu$ を第1節の仮定の通りとする。$G_\mu$ の $L_\mu$ への作用が自由かつ固有なら、$\alpha=i^*\omega$ は $G_\mu$ に関して基本的である。
<!-- formal-statement-end -->

### 証明の見取り図

群元による不変性は $i$ と作用写像の可換性から、水平性は $dJ$ がレベル集合の接方向で零になることから示します。どちらも商を構成する前に確認できます。

<!-- proof-start -->
### 証明

$h\in G_\mu$ とし、$h_M:M\to M$、$h_L:L_\mu\to L_\mu$ をそれぞれの作用写像とします。[GMECH4のレベル集合への制限作用](../GMECH4/index.md#prop-gmech4-level-action)より $i\circ h_L=h_M\circ i$ です。Hamilton作用はシンプレクティックなので、

$$
\begin{aligned}
h_L^*(i^*\omega)
&=(i\circ h_L)^*\omega\\
&=(h_M\circ i)^*\omega\\
&=i^*(h_M^*\omega)=i^*\omega.
\end{aligned}
$$

これで（B1）を得ます。次に水平性（B2）を確認します。任意の点 $m\in L_\mu$、接ベクトル $v\in T_mL_\mu$、Lie代数元 $\xi\in\mathfrak g_\mu$ を固定します。

$\xi$ は安定化Lie代数に属するので、基本ベクトル $\xi_M(m)$ はレベル集合に接します。また[GMECH4で導いた運動量レベル集合の接空間の表示](../GMECH4/index.md#prop-gmech4-tangent-regular)より

$$
dJ_m(v)=0.
$$

[運動量写像の定義](../GMECH2/index.md#def-gmech2-hamiltonian-action)を $\xi$ と $v$ に適用すると、

$$
\begin{aligned}
(i^*\omega)_m(\xi_M(m),v)
&=\omega_m(\xi_M(m),v)\\
&=d\langle J,\xi\rangle_m(v)\\
&=\langle dJ_m(v),\xi\rangle=0.
\end{aligned}
$$

任意の $\xi$ と $v$ で零なので（B2）です。よって $\alpha$ は基本的です。
<!-- proof-end -->

<a id="prop-gmech5-descent"></a>

<!-- formal-statement-start -->
> **命題（基本2形式の一意な降下）**  
> Lie群 $K$ が多様体 $N$ に自由かつ固有に作用し、$\pi:N\to B=N/K$ が滑らかな全射劣沈写像であるとする。$N$ 上の滑らかな基本2形式 $\alpha$ に対し、$B$ 上にはただ一つの滑らかな2形式 $\bar\alpha$ が存在して、次を満たす。
>
$$
\pi^*\bar\alpha=\alpha.
$$
<!-- formal-statement-end -->

### 証明の見取り図

商の点とその接ベクトルを上へ持ち上げて $\alpha$ に入れます。持ち上げの差は群軌道方向なので水平性が消し、代表点の変更は不変性が消します。局所切片を使えば滑らかさも分かります。

<!-- proof-start -->
### 証明

$b=[m]\in B$ と $u,v\in T_bB$ を取ります。$\pi$ は劣沈なので $d\pi_m:T_mN\to T_bB$ は全射です。$d\pi_m\tilde u=u$、$d\pi_m\tilde v=v$ となる持ち上げを選び、

$$
\bar\alpha_b(u,v):=\alpha_m(\tilde u,\tilde v)
$$

と置きます。別の持ち上げ $\tilde u'$ と $\tilde v'$ との差は $\ker d\pi_m=T_m(K\cdot m)$ に属します。この接空間の任意のベクトルはある $\xi_N(m)$ であり、水平性により

$$
\alpha_m(\tilde u'-\tilde u,w)=0
\qquad(w\in T_mN).
$$

第二引数についても交代性から同じことが成り立ち、持ち上げによらないと分かります。

代表点を $m'=k\cdot m$ に取り替えたときは、$d\pi_{m'}\circ dk_m=d\pi_m$ なので $dk_m\tilde u$、$dk_m\tilde v$ を持ち上げにできます。不変性によって

$$
\alpha_{m'}(dk_m\tilde u,dk_m\tilde v)
=\alpha_m(\tilde u,\tilde v)
$$

です。したがって $\bar\alpha$ は点の代表元にも依存しません。

各 $b$ の周囲で $\pi$ の滑らかな局所切片 $s:U\to N$ を選ぶと、構成した形式は $U$ 上で $\bar\alpha=s^*\alpha$ となります。よって滑らかです。定義から $\pi^*\bar\alpha=\alpha$ を満たします。

一意性は全射性から従います。もし $\pi^*\beta=0$ なら任意の $b,u,v$ に対して上と同じ持ち上げを使い、

$$
\beta_b(u,v)=(\pi^*\beta)_m(\tilde u,\tilde v)=0
$$

です。従って $\beta=0$ で、降下した形式は唯一です。
<!-- proof-end -->

## 3. Marsden–Weinstein簡約定理

降下する形式が存在しても、なお退化している可能性はあります。鍵となるのは、レベル集合の制限形式の核が **ちょうど** 商で消すべき群軌道方向に等しいことです。ここで正則値条件、同変性、非退化性を同時に使います。

<a id="thm-gmech5-marsden-weinstein"></a>

<!-- formal-statement-start -->
> **定理（Marsden–Weinstein簡約）**  
> $(M,\omega)$ を有限次元シンプレクティック多様体（$\dim M=2n$）、$G$ を有限次元Lie群（$\dim G=r$）とする。$G$ が $M$ に滑らかに左Hamilton作用し、余随伴同変な運動量写像 $J:M\to\mathfrak g^*$ を持つとする。$\mu\in\mathfrak g^*$ は正則値で $L_\mu=J^{-1}(\mu)\ne\varnothing$ とし、$G_\mu$ が $L_\mu$ に自由かつ固有に作用すると仮定する。
>
> このとき $M_\mu=L_\mu/G_\mu$ には一意なシンプレクティック形式 $\omega_\mu$ が存在し、包含 $i$ と射影 $\pi$ について次を満たす。
>
$$
\pi^*\omega_\mu=i^*\omega.
$$
>
> さらに商の次元は次の通りである。
>
$$
\dim M_\mu=2n-r-\dim G_\mu.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前節の基本性と降下命題で形式の存在・一意性は得られます。閉性は外微分と引き戻しの交換で示します。非退化性は $W=T_mL_\mu$ と置き、$W^\omega=T_m(G\cdot m)$ を用いて核を求め、$\mathfrak g_\mu$ の軌道方向だけが残ると示します。

<!-- proof-start -->
### 証明

[運動量レベル上の制限形式の基本性](#prop-gmech5-basic-restriction)と[基本2形式の一意な降下](#prop-gmech5-descent)により滑らかな2形式 $\omega_\mu$ が唯一存在し、$\pi^*\omega_\mu=i^*\omega$ です。

まず閉性を調べます。外微分は引き戻しと可換であり、もとの $\omega$ が閉じているので、

$$
\begin{aligned}
\pi^*(d\omega_\mu)
&=d(\pi^*\omega_\mu)\\
&=d(i^*\omega)=i^*(d\omega)=0.
\end{aligned}
$$

$\pi$ は全射劣沈写像ですから、任意の商の点と三つの接ベクトルはレベル集合の点と接ベクトルに持ち上がります。持ち上げを使って $\pi^*(d\omega_\mu)=0$ を評価すると $d\omega_\mu=0$ です。

次に非退化性を証明します。$m\in L_\mu$ を固定し、

$$
V=T_mM,\qquad
W=T_mL_\mu=\ker dJ_m,\qquad
A=T_m(G\cdot m)
$$

と書きます。[運動量写像の微分・軌道方向・正則性](../GMECH4/index.md#prop-gmech4-kernel-stabilizer)より $W=A^\omega$ です。非退化な有限次元交代形式では $(A^\omega)^\omega=A$ が成り立ちます。実際、$\omega^\flat:V\to V^*$ は同型で、$A^\omega$ は $A$ を零にする共変ベクトルの逆像なので $\dim A^\omega=\dim V-\dim A$、さらに $A\subseteq(A^\omega)^\omega$ だから次元比較で等号です。従って

$$
W^\omega=A,\qquad
\ker((i^*\omega)_m)=W\cap W^\omega=W\cap A.
$$

右辺が $G_\mu$ の軌道方向と一致することを示します。$\xi\in\mathfrak g$ について同変性を $\exp(t\xi)\cdot m$ に適用すると、

$$
J(\exp(t\xi)\cdot m)
=\operatorname{Ad}_{\exp(t\xi)}^*\mu.
$$

$t=0$ で微分すれば、

$$
dJ_m(\xi_M(m))
=\left.\frac d{dt}\right|_{0}
\operatorname{Ad}_{\exp(t\xi)}^*\mu.
$$

右辺が零であることは $\xi$ が余随伴安定化群のLie代数 $\mathfrak g_\mu$ に属することと同値です。ここではLie群の安定化Lie代数は軌道写像の微分の核として得られるという[LIE4の結果](../../../代数系/LIE/LIE4/index.md#thm-lie4-stabilizer-kernel-orbit-rank)を余随伴作用に適用しています。従って

$$
\begin{aligned}
W\cap A
&=\{\xi_M(m):\xi\in\mathfrak g,\ dJ_m(\xi_M(m))=0\}\\
&=\{\xi_M(m):\xi\in\mathfrak g_\mu\}\\
&=T_m(G_\mu\cdot m)=\ker d\pi_m.
\end{aligned}
$$

最後に、$b=\pi(m)$ で $\bar v\in T_bM_\mu$ がすべての $\bar w$ と $\omega_\mu(\bar v,\bar w)=0$ を満たすとします。$d\pi_m(v)=\bar v$ を満たす $v\in W$ を選びます。任意の $w\in W$ に対して、

$$
(i^*\omega)_m(v,w)
=(\pi^*\omega_\mu)_m(v,w)
=\omega_{\mu,b}(\bar v,d\pi_mw)=0.
$$

よって $v\in\ker(i^*\omega)_m=\ker d\pi_m$ であり、$\bar v=d\pi_m(v)=0$ です。つまり $\omega_\mu$ は非退化です。

次元については[正則運動量レベルの商定理](../GMECH4/index.md#thm-gmech4-smooth-quotient)を仮定どおり適用し、

$$
\dim M_\mu=\dim L_\mu-\dim G_\mu
=(2n-r)-\dim G_\mu
$$

を得ます。閉性と非退化性が示されたので $(M_\mu,\omega_\mu)$ はシンプレクティック多様体です。
<!-- proof-end -->

**何が重要か。** $i^*\omega$ の核が、商で取り除く群軌道方向より大きければ、商の上にも退化が残ります。この定理は二つが一致することを保証します。たとえば $G=SO(3)$、$\mu\ne0$ なら一般には $\dim G_\mu=1$ であり、商の次元を $2n-2\dim G$ としてはいけません。

## 4. Hamilton方程式は商に引き継がれるか

シンプレクティック形式が降りても、元のHamiltonianが同じ軌道上で違う値を取るなら商の上でエネルギーを定義できません。また元の運動がレベル集合を出てしまっても困ります。両方を満たす十分条件は、元のHamiltonianの $G$ 不変性です。

<a id="thm-gmech5-reduced-dynamics"></a>

<!-- formal-statement-start -->
> **定理（不変Hamiltonianの簡約力学）**  
> [Marsden–Weinstein簡約](#thm-gmech5-marsden-weinstein)の仮定に加え、$H\in C^\infty(M)$ が $G$ 不変、すなわち $H(gm)=H(m)$ を満たすとする。このとき一意な滑らかな $H_\mu:M_\mu\to\mathbb R$ が存在して次を満たす。
>
$$
H_\mu\circ\pi=H|_{L_\mu}.
$$
>
> $X_H$ は $L_\mu$ に接し、$G_\mu$ 不変である。従って商へ射影されるベクトル場 $\bar X$ が存在し、これは $H_\mu$ のHamiltonベクトル場に一致する。
>
$$
d\pi(X_H|_{L_\mu})=X_{H_\mu}\circ\pi,
\qquad
\iota_{X_{H_\mu}}\omega_\mu=dH_\mu.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Noetherの定理でレベル集合への接性を得ます。Hamiltonベクトル場の一意性と対称性から群作用との可換性を確かめ、最後に簡約形式の引き戻し等式へ代入します。

<!-- proof-start -->
### 証明

$H$ は全 $G$ に不変なので、[GMECH3の幾何学的Noetherの定理](../GMECH3/index.md#thm-gmech3-geometric-noether)を各 $\xi\in\mathfrak g$ に適用すると、$dJ_\xi(X_H)=0$ です。$\xi$ が任意であるため $dJ(X_H)=0$ となり、[レベル集合の接空間](../GMECH4/index.md#prop-gmech4-tangent-regular)から $X_H(m)\in T_mL_\mu$ です。

$H|_{L_\mu}$ は $G_\mu$ 不変なので、$\pi(m)=\pi(m')$ なら $H(m)=H(m')$ です。よって $H_\mu([m])=H(m)$ と定義でき、局所切片 $s$ により $H_\mu|_U=H\circ i\circ s$ と表せるので滑らかです。

$h\in G_\mu$ を取ります。$h_M^*\omega=\omega$、$H\circ h_M=H$ なので、任意の $v\in T_mM$ に対して

$$
\begin{aligned}
\omega_{hm}(dh_m X_H(m),dh_m v)
&=\omega_m(X_H(m),v)\\
&=dH_m(v)=dH_{hm}(dh_m v).
\end{aligned}
$$

$dh_m$ は全射で、[Hamiltonベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)から $dh_mX_H(m)=X_H(hm)$ です。ゆえに $X_H|_{L_\mu}$ は群軌道に沿って整合し、$\bar X_{\pi(m)}=d\pi_mX_H(m)$ は商上の滑らかなベクトル場です。

$\bar X$ と任意の $v\in T_mL_\mu$ について簡約形式の関係を使うと、

$$
\begin{aligned}
(\pi^*\iota_{\bar X}\omega_\mu)_m(v)
&=\omega_{\mu,\pi(m)}(d\pi_mX_H(m),d\pi_mv)\\
&=(i^*\omega)_m(X_H(m),v)\\
&=dH_m(v)=(\pi^*dH_\mu)_m(v).
\end{aligned}
$$

ここで第三の等号は[Hamiltonベクトル場の定義](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)です。$\pi$ は全射劣沈だから1形式の引き戻しは単射です。したがって $\iota_{\bar X}\omega_\mu=dH_\mu$ が成り立ち、非退化性から $\bar X=X_{H_\mu}$ です。
<!-- proof-end -->

したがって、商の軌道を計算することは「対称性を除いた元の軌道」を計算することになります。ただし、商では群軌道上のどの代表点にいたかという位相情報は失われます。

## 5. 回転対称系を実際に簡約する

$M=T^*\mathbb R^2$ に正準形式 $\omega=dx\wedge dp_x+dy\wedge dp_y$ を入れ、$G=SO(2)$ が位置と運動量を同時に回すとします。[GMECH2の回転運動量の式](../GMECH2/index.md#thm-gmech2-cotangent-momentum)をこの作用に適用すると、

$$
J(x,y,p_x,p_y)=xp_y-yp_x=\ell.
$$

$\mu\ne0$ を固定します。$J=\mu$ の点では位置ベクトル $q=(x,y)$ が零ではなく、非零の平面ベクトルを固定する回転は恒等元だけです。[GMECH4の正則性判定](../GMECH4/index.md#prop-gmech4-kernel-stabilizer)から $\mu$ は正則値で、作用は自由です。$SO(2)$ はコンパクトなので固有です。また可換群ゆえ $G_\mu=G$ です。

半径 $r>0$ と角度 $\theta$ を使い、単位ベクトル $e_r=(\cos\theta,\sin\theta)$ と $e_\theta=(-\sin\theta,\cos\theta)$ を置きます。位置と運動量を次のように分解します。

$$
q=r e_r,\qquad
p=p_r e_r+\frac{\ell}{r}e_\theta.
$$

実際、$\ell=q\times p$ の平面の垂直成分は $r$ と接線方向運動量との積です。$de_r=e_\theta\,d\theta$ なので

$$
dq=e_r\,dr+r e_\theta\,d\theta,
\qquad
p\cdot dq=p_r\,dr+\ell\,d\theta.
$$

右辺は正準1形式です。$\omega=-d(p\cdot dq)$ の符号を計算すると、

$$
\omega=dr\wedge dp_r+d\theta\wedge d\ell.
$$

$\ell=\mu$ に制限すると接ベクトル上で $d\ell=0$ であり、

$$
i^*\omega=dr\wedge dp_r.
$$

$SO(2)$ は $\theta$ だけを変え、$r,p_r$ を保ちます。従って軌道は $\theta$ の円で、商は $(r,p_r)\in(0,\infty)\times\mathbb R$ と同一視できます。簡約形式は

$$
\omega_\mu=dr\wedge dp_r,\qquad \dim M_\mu=4-1-1=2.
$$

**対称性で消えた角度は、保存した角運動量そのものとは違います。** 角運動量は $\ell=\mu$ と固定し、その後で角度 $\theta$ を商で同一視しました。順序を逆にして両方を同時に消す操作ではありません。

さらに $\kappa>0$ として回転不変Hamiltonianを考えます。

$$
H(q,p)=\frac12|p|^2+\frac{\kappa}{2}|q|^2.
$$

$e_r,e_\theta$ は直交する単位ベクトルなので、$|p|^2=p_r^2+\ell^2/r^2$ です。従って[不変Hamiltonianの簡約力学](#thm-gmech5-reduced-dynamics)から

$$
H_\mu(r,p_r)
=\frac12p_r^2+\frac{\mu^2}{2r^2}+\frac{\kappa}{2}r^2.
$$

[SYM4の正準座標Hamilton方程式](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)に $q=r$、$p=p_r$、$H=H_\mu$ を代入すると、

$$
\dot r=\frac{\partial H_\mu}{\partial p_r}=p_r,
\qquad
\dot p_r=-\frac{\partial H_\mu}{\partial r}
=\frac{\mu^2}{r^3}-\kappa r.
$$

遠心力項 $\mu^2/r^3$ は、**角運動量を固定して角度を除いた結果**として現れます。$r$ の正の下限を作る $\mu^2/(2r^2)$ は、商を取る前の単純な半径方向のポテンシャルにはありません。

## 6. 演習：降下・核・力学を自分で組み立てる

### Level A

<a id="ex-gmech5-a01"></a>
**A1. 平行移動の水平性。** $T^*\mathbb R^2$ の $(q_1,q_2,p_1,p_2)$ について、$q_1$ 並進の運動量 $J=p_1$ とする。$p_1=\mu$ への $\omega$ の制限を求め、$\partial_{q_1}$ を入れて零になることを確認し、商の形式を書け。

- Level: A

<!-- solution-start -->
**詳細解答。** レベル集合の接ベクトルでは $dp_1=0$ です。従って

$$
i^*\omega=i^*(dq_1\wedge dp_1+dq_2\wedge dp_2)
=dq_2\wedge dp_2.
$$

$\iota_{\partial_{q_1}}(dq_2\wedge dp_2)=0$ は $dq_2(\partial_{q_1})=dp_2(\partial_{q_1})=0$ から従います。形式は $q_1$ に依存せず不変でもあります。商射影 $\pi(q_1,q_2,\mu,p_2)=(q_2,p_2)$ に対し

$$
\omega_\mu=dq_2\wedge dp_2,\qquad
\pi^*\omega_\mu=i^*\omega
$$

です。形式の降下に必要な二条件を両方確認しました。
<!-- solution-end -->

<a id="ex-gmech5-a02"></a>
**A2. 制限2形式の核。** $T^*\mathbb R^2$ 上の回転作用で $\ell=xp_y-yp_x$ とし、$\mu\ne0$ に固定する。極座標で $\omega=dr\wedge dp_r+d\theta\wedge d\ell$ を用い、$i^*\omega$ の核を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $L_\mu$ は $(r,\theta,p_r)$ を局所座標とし、接方向では $d\ell=0$ なので $i^*\omega=dr\wedge dp_r$ です。接ベクトルを $v=a\partial_r+b\partial_\theta+c\partial_{p_r}$ と置くと

$$
\iota_v(i^*\omega)=a\,dp_r-c\,dr.
$$

これは $a=c=0$ の場合に限り零です。よって

$$
\ker(i^*\omega)=\operatorname{span}\{\partial_\theta\}
=T(G_\mu\cdot m).
$$

角度方向だけが核に残り、商でちょうどそれが除かれます。
<!-- solution-end -->

<a id="ex-gmech5-a03"></a>
**A3. 次元公式の入力。** $M=T^*\mathbb R^3$、$G=SO(3)$、$J=q\times p$、$\mu=\ell e_3$（$\ell\ne0$）で、正則性・自由性・固有性が成立することを示し、簡約空間の次元を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 角運動量が非零なので、$q$ と $p$ は線形独立です。両者を固定する回転は恒等元だけであり、[運動量写像の微分・軌道方向・正則性](../GMECH4/index.md#prop-gmech4-kernel-stabilizer)によりレベル上の各点で $dJ$ は全射です。

余随伴安定化群 $G_\mu$ は $e_3$ 軸を固定する回転群 $SO(2)$ で、次元は $1$ です。制限作用は自由で、群がコンパクトなので固有です。

よって[Marsden–Weinstein簡約定理](#thm-gmech5-marsden-weinstein)に、もとの多様体の次元 $2n=6$、全群の次元 $r=3$、安定化群の次元 $1$ を代入して

$$
\dim M_\mu=6-3-1=2.
$$

全群の次元 $3$ を二回引くと誤答になる例です。
<!-- solution-end -->

<a id="ex-gmech5-a04"></a>
**A4. 偶数次元になる理由。** 正則なMarsden–Weinstein簡約で $\dim M_\mu=2n-r-\dim G_\mu$ が偶数である理由を、2形式の性質から説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [簡約定理](#thm-gmech5-marsden-weinstein)は $M_\mu$ 上の $\omega_\mu$ が非退化な交代2形式であることを示します。奇数次元 $d$ の交代行列 $A$ なら $A^T=-A$ なので

$$
\det A=\det A^T=\det(-A)=(-1)^d\det A=-\det A.
$$

従って $\det A=0$ となり非退化とは矛盾します。ゆえに $\dim M_\mu$ は偶数です。したがって $r+\dim G_\mu$ も偶数になります。この偶奇条件を次元の暗記だけでなく非退化性から導きました。
<!-- solution-end -->

### Level B

<a id="ex-gmech5-b01"></a>
**B1. 核の等式を再構成する。** $J$ が同変な運動量写像で、$\mu$ が正則値であるとする。$W=T_mL_\mu$、$A=T_m(G\cdot m)$ と置き、$W=A^\omega$ から $\ker(i^*\omega)_m=T_m(G_\mu\cdot m)$ を示せ。自由性を使う箇所と使わない箇所を区別せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [運動量写像の微分・軌道方向・正則性](../GMECH4/index.md#prop-gmech4-kernel-stabilizer)から $W=A^\omega$ です。有限次元で $\omega$ は非退化なので $W^\omega=(A^\omega)^\omega=A$ であり、

$$
\ker(i^*\omega)_m=W\cap W^\omega=W\cap A.
$$

$\xi_M(m)\in W$ である条件を調べます。同変性 $J(\exp(t\xi)m)=\operatorname{Ad}_{\exp(t\xi)}^*\mu$ を微分すると、

$$
dJ_m(\xi_M(m))
=\left.\frac d{dt}\right|_0\operatorname{Ad}_{\exp(t\xi)}^*\mu.
$$

これが零となる $\xi$ は $\mathfrak g_\mu$ にちょうど属します。従って $W\cap A=T_m(G_\mu\cdot m)$ です。**この核の等式そのものには自由性は不要**です。自由性・固有性を使うのは $L_\mu/G_\mu$ を通常の滑らかな多様体として構成し、その接空間を $W/T_m(G_\mu\cdot m)$ と同一視する段階です。
<!-- solution-end -->

<a id="ex-gmech5-b02"></a>
**B2. 簡約Hamilton方程式を証明する。** 簡約定理の仮定に加え、$H$ が $G$ 不変であるとする。$H_\mu([m])=H(m)$ がwell-definedであることを示し、$\omega_\mu(\bar X,\cdot)=dH_\mu$ を引き戻しで導け。

- Level: B

<!-- solution-start -->
**詳細解答。** 商で同じ点を表す $m,m'$ は、ある $h\in G_\mu$ について $m'=hm$ を満たします。$H$ の群不変性から

$$
H(m')=H(hm)=H(m).
$$

従って $H_\mu([m])=H(m)$ は代表元によらず定義できます。

[GMECH3の幾何学的Noetherの定理](../GMECH3/index.md#thm-gmech3-geometric-noether)を適用すると $dJ(X_H)=0$ です。ゆえに $X_H$ は各運動量レベルに接します。

さらに作用が $\omega$ と $H$ をともに保存するので、[Hamiltonベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)から

$$
dh_m\bigl(X_H(m)\bigr)=X_H(hm).
$$

従って商の接ベクトル $\bar X_{\pi(m)}=d\pi_m(X_H(m))$ は代表元の取り方によらず定義できます。

$u=d\pi_m(v)\in T_{\pi(m)}M_\mu$ を任意に選ぶと、

$$
\begin{aligned}
\omega_{\mu,\pi(m)}(\bar X,u)
&=(i^*\omega)_m(X_H,v)\\
&=dH_m(v)
=dH_{\mu,\pi(m)}(u).
\end{aligned}
$$

$u$ は $\pi$ の劣沈性から任意です。従って $\iota_{\bar X}\omega_\mu=dH_\mu$ で、$\bar X=X_{H_\mu}$ です。
<!-- solution-end -->

<a id="ex-gmech5-b03"></a>
**B3. 回転対称振動子の円運動。** 第5節の $H_\mu=p_r^2/2+\mu^2/(2r^2)+\kappa r^2/2$（$\mu\ne0$、$\kappa>0$）について平衡半径 $r_0$ を求め、半径方向の小振動の線形化を計算せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 有効ポテンシャルを $U_\mu(r)=\mu^2/(2r^2)+\kappa r^2/2$ とすると、

$$
U_\mu'(r)=-\frac{\mu^2}{r^3}+\kappa r.
$$

平衡は $p_r=0$ かつ $U_\mu'(r)=0$ です。$r>0$ なので $\kappa r^4=\mu^2$、従って

$$
r_0=\left(\frac{\mu^2}{\kappa}\right)^{1/4},\qquad p_r=0.
$$

さらに $U_\mu''(r)=3\mu^2/r^4+\kappa$ で、$r_0^4=\mu^2/\kappa$ を代入すると $U_\mu''(r_0)=4\kappa$ です。$r=r_0+\rho$、$p_r=\eta$ として線形化すると

$$
\dot\rho=\eta,\qquad
\dot\eta=-4\kappa\rho,\qquad
\ddot\rho+4\kappa\rho=0.
$$

よって半径方向の微小振動の角振動数は $2\sqrt\kappa$ です。簡約空間の平衡が元の空間では回転する円軌道に対応することにも注意します。
<!-- solution-end -->

<a id="ex-gmech5-b04"></a>
**B4. 零運動量レベルで何が壊れるか。** $SO(2)$ が $T^*\mathbb R^2$ に同時回転で作用し、$J=xp_y-yp_x$ とする。$\mu=0$ に通常のMarsden–Weinstein簡約定理を適用できない理由を二つ独立に示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** まず原点で

$$
dJ=p_y\,dx-p_x\,dy-y\,dp_x+x\,dp_y=0
$$

なので、$0$ は正則値ではありません。次に $(q,p)=(0,0)$ は任意の回転に固定され、点の安定化群は $SO(2)$ 全体です。従って $G_0=SO(2)$ のレベル上の作用は自由ではありません。

これは正則値条件と自由作用条件という**別々の仮定の失敗**です。原点では軌道方向が零次元なのに、非零の $q$ を持つ零レベル点では軌道方向が一次元です。[GMECH4の滑らかな商定理](../GMECH4/index.md#thm-gmech4-smooth-quotient)の一定次元の局所切片構成を使えないため、通常の滑らかな商を当然視して非退化な2形式を降ろす議論は成立しません。
<!-- solution-end -->

### Level C

<a id="ex-gmech5-c01"></a>
**C1. 中心力問題の完全な簡約。** $M=T^*(\mathbb R^2\setminus\{0\})$、$G=SO(2)$ の同時回転作用に対し、

$$
\omega=dx\wedge dp_x+dy\wedge dp_y,\quad
J=xp_y-yp_x,\quad
H=\frac12|p|^2-\frac{k}{|q|}
$$

とする。ただし $k>0$、$\mu\ne0$ に運動量を固定する。

1. $J^{-1}(\mu)$ が非空な正則レベル集合で、$G_\mu$ の作用が自由かつ固有であることを示せ。
2. 極座標と動径運動量を用いて $\omega_\mu$ と $H_\mu$ を求めよ。
3. 簡約Hamilton方程式を導き、平衡半径とそこでのエネルギーを求めよ。
4. その平衡が半径方向に線形安定であることを示し、元の運動の意味を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答。** 1. 位置 $q$ は定義域の条件により零ではありません。これを固定する平面回転は恒等元のみなので、作用は自由です。[運動量写像の微分・軌道方向・正則性](../GMECH4/index.md#prop-gmech4-kernel-stabilizer)より、すべての点で $dJ$ は全射です。

レベルの非空性も確認します。位置と運動量を

$$
q=(1,0),\qquad p=(0,\mu)
$$

と選べば、$J(q,p)=\mu$ です。

$SO(2)$ はコンパクトなので作用は固有です。また可換群だから余随伴作用は自明であり、$G_\mu=G$ です。

2. $q=re_r$、$p=p_re_r+(\ell/r)e_\theta$ と置きます。$dq=e_r\,dr+r e_\theta\,d\theta$ から $p\cdot dq=p_r\,dr+\ell\,d\theta$ です。従って

$$
\omega=dr\wedge dp_r+d\theta\wedge d\ell,\quad
\ell=J.
$$

$\ell=\mu$ に制限して $\theta$ 方向を商にすると、[簡約定理](#thm-gmech5-marsden-weinstein)の関係式から

$$
M_\mu\simeq(0,\infty)\times\mathbb R,\qquad
\omega_\mu=dr\wedge dp_r.
$$

位置ベクトルの長さは $r$ です。$e_r$ と $e_\theta$ は長さ1で互いに直交するため、運動量の内積を成分ごとに展開すると

$$
|p|^2=p\cdot p
=p_r^2(e_r\cdot e_r)
+2\frac{p_r\mu}{r}(e_r\cdot e_\theta)
+\frac{\mu^2}{r^2}(e_\theta\cdot e_\theta)
=p_r^2+\frac{\mu^2}{r^2}.
$$

この式をもとのHamiltonianへ代入すると

$$
H_\mu(r,p_r)=\frac12p_r^2+\frac{\mu^2}{2r^2}-\frac{k}{r}.
$$

3. [簡約Hamilton方程式の定理](#thm-gmech5-reduced-dynamics)と[SYM4の正準座標公式](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)を用いて

$$
\dot r=p_r,\qquad
\dot p_r=\frac{\mu^2}{r^3}-\frac{k}{r^2}.
$$

平衡では $p_r=0$、$\mu^2-kr=0$ だから $r_0=\mu^2/k$ です。この点のエネルギーは

$$
H_\mu(r_0,0)
=\frac{\mu^2}{2(\mu^4/k^2)}-\frac{k}{\mu^2/k}
=\frac{k^2}{2\mu^2}-\frac{k^2}{\mu^2}
=-\frac{k^2}{2\mu^2}.
$$

4. $U_\mu(r)=\mu^2/(2r^2)-k/r$ と書くと、

$$
U_\mu''(r)=\frac{3\mu^2}{r^4}-\frac{2k}{r^3},
\qquad
U_\mu''(r_0)=\frac{\mu^2}{r_0^4}>0.
$$

従って変位 $\rho=r-r_0$ は一次近似で $\ddot\rho+(\mu^2/r_0^4)\rho=0$ を満たします。固有値は $\pm i|\mu|/r_0^2$ なので半径方向に線形安定です。元の運動では $\dot\theta=\partial H/\partial\ell=\mu/r^2$ であり、半径一定 $r_0$ の円運動です。商ではその回転方向を同一視したため、円運動が時間変化しない点として表されます。
<!-- solution-end -->

本章では、運動量レベルの制限形式が基本的であること、商の上で非退化性が戻ること、Hamiltonianとその流れが商で再びHamilton力学を定めることを証明しました。次のGMECH6では、対称性を取り除いた運動を別の方法で表現するため、Lie代数の双対空間上のPoisson構造と余随伴軌道を調べます。
