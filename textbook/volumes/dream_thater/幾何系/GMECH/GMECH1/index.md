# GMECH1 Lie群作用と余接束への持ち上げ

位置空間 $Q$ に回転や平行移動が作用するとき、位置 $q$ の変換だけでは力学の位相空間は動かせません。運動量 $p$ は接ベクトルではなく余ベクトルであり、位置の変換に合わせて**逆微分**で運ばなければ、位置と運動量を組にした幾何が壊れます。

[SYM3の余接持ち上げ](../../SYM/SYM3/index.md#def-sym3-cotangent-lift)は一つの微分同相に対する操作でした。本章の問いは「これをLie群のすべての元に同時に適用すると、群作用になり、どんな無限小運動が現れるか」です。[LIE4の基本ベクトル場](../../../代数系/LIE/LIE4/index.md#def-lie4-fundamental-vector-field)と併せ、群作用の有限変換から微分した運動までを具体的に結びます。

## 1. 一つの変換から群全体の作用へ

$G$ を有限次元実Lie群、$Q$ を有限次元滑らかな実多様体とし、滑らかな**左作用** $\Phi:G\times Q\to Q$ を考えます。[滑らかな作用の定義](../../../代数系/LIE/LIE4/index.md#def-lie4-smooth-action)に従い $\phi_g(q)=g\cdot q$ と書くと、

$$
\phi_e=\operatorname{id}_Q,\qquad
\phi_g\circ\phi_h=\phi_{gh}
$$

です。とくに $\phi_{g^{-1}}$ が $\phi_g$ の逆写像なので各 $\phi_g$ は微分同相です。

そこで [SYM3の余接持ち上げの定義](../../SYM/SYM3/index.md#def-sym3-cotangent-lift)を各 $\phi_g$ に適用します。$g$ が動くことも含めて滑らかであること、作用の積と両立することを示すのが最初の目標です。

<a id="def-gmech1-cotangent-action"></a>

<!-- formal-statement-start -->
> **定義（余接持ち上げられたLie群作用）**  
> $G$ が滑らかな左作用 $\phi_g:Q\to Q$ を持つとき、$T^*Q$ 上の写像 $\widetilde\Phi:G\times T^*Q\to T^*Q$ を
>
$$
g\cdot\alpha_q
:=\widetilde\Phi_g(\alpha_q)
=\alpha_q\circ(d\phi_g|_q)^{-1}
\in T^*_{\phi_g(q)}Q
$$
>
> と定める。これを $Q$ 上の作用の**余接持ち上げ作用**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech1-cotangent-action -->
### 直接例：位置の拡大は運動量の縮小を伴う

**定義の確認**：$G=(\mathbb R,+)$ が $Q=\mathbb R$ に $\phi_t(q)=e^tq$ で作用するとします。$\phi_{t+s}(q)=e^{t+s}q=e^t(e^sq)$ なので左作用です。$d\phi_t|_q=e^t$、逆微分は $e^{-t}$ だから

$$
\widetilde\Phi_t(q,p)=(e^tq,e^{-t}p).
$$

例えば $(q,p)=(2,3)$ と $t=\log2$ を代入すると $(4,3/2)$ へ移ります。$t=0$ では元の点に戻り、$s$ に続いて $t$ を作用させれば $(e^{t+s}q,e^{-(t+s)}p)$ です。単に $(e^tq,e^tp)$ と動かすのは定義と異なります。
<!-- definition-example-end -->

<a id="thm-gmech1-lift-action"></a>

<!-- formal-statement-start -->
> **定理（余接持ち上げは滑らかな左作用を定める）**  
> $G$ が有限次元滑らかな多様体 $Q$ に滑らかに左作用するとき、[上の写像](#def-gmech1-cotangent-action)は滑らかな左作用であり、
>
$$
\widetilde\Phi_e=\operatorname{id}_{T^*Q},\qquad
\widetilde\Phi_g\circ\widetilde\Phi_h
=\widetilde\Phi_{gh},\qquad
\pi\circ\widetilde\Phi_g=\phi_g\circ\pi
$$
>
> を満たす。$\pi:T^*Q\to Q$ は余接束の射影である。
<!-- formal-statement-end -->

### 証明の見取り図

群の積に対する等式は [SYM3の合成則](../../SYM/SYM3/index.md#prop-sym3-lift-composition)を $\phi_h,\phi_g$ へ代入すれば出ます。ただし、これは**各 $g$ での滑らかさ**だけでは $G\times T^*Q$ 上の滑らかさを保証しません。後者は作用の局所座標式で別に確認します。

<!-- proof-start -->
### 証明

$g,h\in G$ を任意に取ります。[余接持ち上げの合成則](../../SYM/SYM3/index.md#prop-sym3-lift-composition)に $f=\phi_h$、その次の写像 $\phi_g$ を適用すると

$$
\widetilde\Phi_g\circ\widetilde\Phi_h
=\widehat{\phi_g}\circ\widehat{\phi_h}
=\widehat{\phi_g\circ\phi_h}
=\widehat{\phi_{gh}}
=\widetilde\Phi_{gh}.
$$

同じ合成則の恒等写像の場合から $\widetilde\Phi_e=\operatorname{id}$ です。さらに[余接持ち上げられたLie群作用](#def-gmech1-cotangent-action)から $\widetilde\Phi_g(\alpha_q)$ は基点 $\phi_g(q)$ の余ベクトルです。従って各 $\alpha_q\in T_q^*Q$ について

$$
\begin{aligned}
\pi\bigl(\widetilde\Phi_g(\alpha_q)\bigr)
&=\phi_g(q)\\
&=\phi_g\bigl(\pi(\alpha_q)\bigr).
\end{aligned}
$$

これは任意の $\alpha_q$ で成立するため、射影の等式も従います。

次に $(g_0,\alpha_{q_0})$ の周りで滑らかさを示します。作用 $(g,q)\mapsto\phi_g(q)$ は滑らかです。$q_0$ と $\phi_{g_0}(q_0)$ の座標近傍を取り、$(g_0,q_0)$ の十分小さい積近傍では $q$ と $\phi_g(q)$ がそれぞれその座標内にあるようにできます。その座標で

$$
F(g,q)=\phi_g(q),\qquad
A(g,q)=D_qF(g,q)
$$

と置きます。$\phi_g$ は微分同相だから $A(g,q)$ は正則行列です。余接持ち上げは

$$
(g,q,p)\longmapsto
\bigl(F(g,q),A(g,q)^{-\mathsf T}p\bigr)
$$

と表示されます。$F$ の偏微分である $A$ は $(g,q)$ に滑らかに依存します。正則行列の逆行列は余因子行列を行列式で割って表され、その行列式はこの近傍で零になりません。従って $A^{-\mathsf T}p$ も滑らかです。任意の $(g_0,\alpha_{q_0})$ で示せたので $\widetilde\Phi$ は滑らかな左作用です。
<!-- proof-end -->

この定理があるため、回転・並進・スケーリングを別々に持ち上げ直すのではなく、Lie群として一括して扱えます。

## 2. 正準形式を壊さない理由

[SYM3のLiouville 1形式](../../SYM/SYM3/index.md#def-sym3-tautological-form)は、余ベクトルと射影した接ベクトルとの自然な評価です。余接持ち上げでは逆微分と微分がこの評価の中で相殺し、1形式そのものが保存されます。2形式だけでなく1形式が保存される点が、任意のシンプレクティック変換と異なります。

<a id="prop-gmech1-canonical-preservation"></a>

<!-- formal-statement-start -->
> **命題（余接持ち上げ作用の正準形式保存）**  
> $G$ が $Q$ に滑らかに左作用し、$\theta$ を $T^*Q$ のLiouville 1形式、$\omega_{\mathrm{can}}=-d\theta$ を正準2形式とする。全ての $g\in G$ について
>
$$
\widetilde\Phi_g^*\theta=\theta,\qquad
\widetilde\Phi_g^*\omega_{\mathrm{can}}
=\omega_{\mathrm{can}}
$$
>
> が成立する。従って各 $\widetilde\Phi_g$ はシンプレクティック微分同相である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $\phi_g$ が微分同相であることを確認し、[SYM3の保存定理](../../SYM/SYM3/index.md#thm-sym3-cotangent-lift-preserves)へ**個別の $g$** を代入します。群作用全体の保存則はこの代入を全ての $g$ について行うことで得られます。

<!-- proof-start -->
### 証明

$g\in G$ を固定します。作用則から $\phi_{g^{-1}}\circ\phi_g=\phi_e=\operatorname{id}_Q$、$\phi_g\circ\phi_{g^{-1}}=\operatorname{id}_Q$ です。滑らかな逆写像を持つので $\phi_g$ は微分同相です。そこで[SYM3の余接持ち上げによる正準形式保存](../../SYM/SYM3/index.md#thm-sym3-cotangent-lift-preserves)を $f=\phi_g:Q\to Q$ に適用すれば、

$$
\widehat{\phi_g}^{\,*}\theta=\theta,\qquad
\widehat{\phi_g}^{\,*}(-d\theta)=-d\theta
$$

です。[作用の定義](#def-gmech1-cotangent-action)より $\widehat{\phi_g}=\widetilde\Phi_g$ なので結論を得ます。また逆写像は $\widetilde\Phi_{g^{-1}}$ です。
<!-- proof-end -->

### 具体例：回転は位置と運動量を同じ角度だけ回す

$Q=\mathbb R^2$ で $SO(2)$ の回転行列を

$$
R_t=\begin{pmatrix}\cos t&-\sin t\\ \sin t&\cos t\end{pmatrix}
$$

とします。$DR_t=R_t$ であり、$R_t^{-\mathsf T}=R_t$ だから

$$
\widetilde\Phi_{R_t}(q,p)=(R_tq,R_tp)
$$

です。$q=(x,y)^{\mathsf T}$、$p=(p_x,p_y)^{\mathsf T}$ とすると、

$$
\begin{aligned}
\theta'&=P^{\mathsf T}dQ
=(R_tp)^{\mathsf T}d(R_tq)\\
&=p^{\mathsf T}R_t^{\mathsf T}R_t\,dq
=p^{\mathsf T}dq=\theta
\end{aligned}
$$

と直接確かめられます。これは、スケーリングのときの「位置と運動量は逆倍率」という挙動と矛盾しません。直交行列の場合に限り逆転置が元の行列に一致するからです。

## 3. 群を微分すると位置・運動量がどう動くか

[LIE4の無限小作用](../../../代数系/LIE/LIE4/index.md#def-lie4-fundamental-vector-field)は $\xi\in\mathfrak g=T_eG$ に対し $\exp(t\xi)$ の作用を $t=0$ で微分するものです。$Q$ 上で

$$
\xi_Q(q)=\left.\frac d{dt}\right|_0\phi_{\exp(t\xi)}(q)
$$

を与えると、$T^*Q$ 上の無限小生成子はその「位置方向」に加えて「運動量方向」の速度も持ちます。後者を求める際、単に $d\xi_Q$ を運動量に掛けると符号を取り違えます。

<a id="def-gmech1-infinitesimal-lift"></a>

<!-- formal-statement-start -->
> **定義（余接持ち上げ作用の基本ベクトル場）**  
> $G$ が $Q$ に滑らかに左作用し、$\xi\in\mathfrak g$ とする。余接束上のベクトル場 $\xi_{T^*Q}$ を
>
$$
(\xi_{T^*Q})_{\alpha_q}
=\left.\frac d{dt}\right|_{0}
\widetilde\Phi_{\exp(t\xi)}(\alpha_q)
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech1-infinitesimal-lift -->
### 直接例：一自由度のスケーリング

**定義の確認**：§1の作用では $\xi=1\in T_0\mathbb R$ に対し

$$
\widetilde\Phi_t(q,p)=(e^tq,e^{-t}p).
$$

$t=0$ でそれぞれ微分すると位置方向は $q$、運動量方向は $-p$ なので

$$
\xi_{T^*\mathbb R}
=q\,\partial_q-p\,\partial_p.
$$

これは $q$ と $p$ の両方を同じ符号で動かすベクトル場ではありません。
<!-- definition-example-end -->

<a id="thm-gmech1-infinitesimal-coordinate"></a>

<!-- formal-statement-start -->
> **定理（余接持ち上げの無限小座標公式）**  
> $G$ が滑らかに $n$ 次元多様体 $Q$ に左作用し、$\xi\in\mathfrak g$ とする。$Q$ の局所座標において
>
$$
\xi_Q=\sum_{i=1}^n a^i(q)\partial_{q^i}
$$
>
> と書けば、自然な余接座標で
>
$$
\xi_{T^*Q}
=\sum_i a^i(q)\partial_{q^i}
-\sum_{i,j}p_j\frac{\partial a^j}{\partial q^i}(q)
\,\partial_{p_i}.
$$
>
> とくに $d\pi(\xi_{T^*Q})=\xi_Q\circ\pi$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$F_t(q)=\phi_{\exp(t\xi)}(q)$ と置き、$q_t=F_t(q)$ と $p_t=(DF_t(q))^{-\mathsf T}p$ を別々に微分します。逆行列の微分は行列等式 $A_t^{\mathsf T}B_t=I$ を微分すると確実です。

<!-- proof-start -->
### 証明

$F_0(q)=q$ であり、$a^i(q)=\left.\partial_t F_t^i(q)\right|_0$ です。作用の滑らかさにより局所的に微分の順序を交換でき、

$$
\left.\frac d{dt}\right|_0
\frac{\partial F_t^j}{\partial q^i}(q)
=\frac{\partial}{\partial q^i}
\left.\frac{\partial F_t^j}{\partial t}(q)\right|_0
=\frac{\partial a^j}{\partial q^i}(q).
$$

列ベクトルで $A_t=DF_t(q)$、$B_t=A_t^{-\mathsf T}$ と置くと、$A_0=B_0=I$ かつ $A_t^{\mathsf T}B_t=I$ です。これを $t=0$ で微分して

$$
\dot A_0^{\mathsf T}B_0+
A_0^{\mathsf T}\dot B_0=0,\qquad
\dot B_0=-\dot A_0^{\mathsf T}
$$

を得ます。成分では $(\dot A_0)_{ji}=\partial_i a^j$ なので

$$
(\dot p_0)_i
=(\dot B_0p)_i
=-\sum_j (\dot A_0)_{ji}p_j
=-\sum_j p_j\,\partial_i a^j(q).
$$

一方 $\dot q_0^i=a^i(q)$ です。座標 $(q^i,p_i)$ の接方向に両方の係数を代入すると主張の式になります。射影 $\pi(q,p)=q$ の微分は $\partial_{p_i}$ 成分を消すので最後の等式も成立します。
<!-- proof-end -->

### 回転を無限小にすると

$SO(2)$ で $R_t$ の生成元を

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

とすると、$Q$ 上では $a(x,y)=(-y,x)$ です。偏微分は

$$
Da=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
-(Da)^{\mathsf T}p=(-p_y,p_x).
$$

したがって

$$
\xi_{T^*\mathbb R^2}
=-y\,\partial_x+x\,\partial_y
-p_y\,\partial_{p_x}+p_x\,\partial_{p_y}.
$$

有限変換 $(R_tq,R_tp)$ を時刻0で微分しても同じ答えになります。

## 4. 流れ、括弧、固定点を照合する

余接持ち上げはLie群作用であると証明したので、[LIE4の作用から作る流れと括弧の定理](../../../代数系/LIE/LIE4/index.md#thm-lie4-fundamental-flow-antihom)を余接束に直接適用できます。ただし左作用による基本ベクトル場のLie括弧には**負号**が現れることに注意してください。

<a id="prop-gmech1-flow-bracket"></a>

<!-- formal-statement-start -->
> **命題（余接持ち上げの流れと括弧）**  
> $G$ が $Q$ に滑らかに左作用し、$\xi,\eta\in\mathfrak g$ とする。$\xi_{T^*Q}$ は完備であり、その大域流は
>
$$
\Psi_t=\widetilde\Phi_{\exp(t\xi)}
$$
>
> である。また
>
$$
[\xi_{T^*Q},\eta_{T^*Q}]
=-[\xi,\eta]_{T^*Q}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[滑らかな左作用の定理](#thm-gmech1-lift-action)で作用則と滑らかさを確立しました。この二条件と[LIE4の定理](../../../代数系/LIE/LIE4/index.md#thm-lie4-fundamental-flow-antihom)の対応を一つずつ確認すれば、余接束でもその結論が使えます。

<!-- proof-start -->
### 証明

$M=T^*Q$、作用を $\widetilde\Phi$ として[LIE4の基本ベクトル場の流れと括弧](../../../代数系/LIE/LIE4/index.md#thm-lie4-fundamental-flow-antihom)へ代入します。$G$ は有限次元Lie群、$M$ は滑らかな多様体で、作用 $\widetilde\Phi$ は [定理](#thm-gmech1-lift-action)により滑らかな左作用です。また同章の基本ベクトル場の定義は

$$
\left.\frac d{dt}\right|_0
\exp(t\xi)\cdot\alpha_q
$$

であり、[本章の定義](#def-gmech1-infinitesimal-lift)と一致します。よってLIE4の結論から流れは $\widetilde\Phi_{\exp(t\xi)}$ で全 $t\in\mathbb R$ に定義され、Lie括弧は $-[\xi,\eta]_{T^*Q}$ です。
<!-- proof-end -->

この完備性はHamilton方程式の一般の解がすべて大域的であるという意味ではありません。ここでは**Lie群作用から作られた特定の基本ベクトル場**の大域流だけを述べています。

<a id="prop-gmech1-stabilizer"></a>

<!-- formal-statement-start -->
> **命題（余接ベクトルの安定化群）**  
> $G$ が $Q$ に滑らかに左作用するとき、$\alpha_q\in T_q^*Q$ を固定する余接持ち上げ作用の安定化群は
>
$$
G_{\alpha_q}
=\{g\in G:\ \phi_g(q)=q,\
\alpha_q\circ(d\phi_g|_q)^{-1}=\alpha_q\}
$$
>
> であり、$G_{\alpha_q}\subseteq G_q$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

余接束の点が等しいためには基点が等しく、さらにその基点の余ベクトルが等しい必要があります。

<!-- proof-start -->
### 証明

$\widetilde\Phi_g(\alpha_q)=\alpha_q$ を仮定します。射影を施すと[作用と射影の両立](#thm-gmech1-lift-action)により

$$
\phi_g(q)
=\pi(\widetilde\Phi_g(\alpha_q))
=\pi(\alpha_q)=q
$$

です。このとき二つの余ベクトルは同じ $T_q^*Q$ に属し、[作用の定義](#def-gmech1-cotangent-action)から $\alpha_q\circ(d\phi_g|_q)^{-1}=\alpha_q$ が必要です。逆に二条件を満たせば定義式の基点と余ベクトルがともに元と一致するので $\widetilde\Phi_g(\alpha_q)=\alpha_q$ です。第一条件を満たす元は $G_q$ に属します。
<!-- proof-end -->

$SO(2)$ が $\mathbb R^2$ に回転作用するとき、$q=0$ の安定化群は $SO(2)$ 全体ですが、$q=0$ で $p\neq0$ を固定する回転は恒等回転だけです。位置が不動でも運動量方向が回るからです。

## 5. 次章へ：なぜ保存量が見えてくるのか

[無限小座標公式](#thm-gmech1-infinitesimal-coordinate)の位置成分 $a^i(q)$ と運動量成分 $-p_j\partial_i a^j$ を用いると、正準1形式と生成子の組から関数

$$
K_\xi(q,p)=\sum_i p_i a^i(q)
$$

が自然に現れます。この関数を微分すると

$$
dK_\xi
=\sum_i a^i\,dp_i+\sum_{i,j}p_j\partial_i a^j\,dq^i.
$$

一方 [SYM3の正準2形式](../../SYM/SYM3/index.md#thm-sym3-cotangent-symplectic)を上の生成子へ縮約すると

$$
\iota_{\xi_{T^*Q}}\omega_{\mathrm{can}}
=\sum_i a^i\,dp_i
+\sum_{i,j}p_j\partial_i a^j\,dq^i
=dK_\xi.
$$

これは計算から見つかった一致です。次章でこの関数を全ての $\xi$ にわたってまとめ、Hamilton作用と**運動量写像**を定義します。ここでは次章の理論を使わず、符号と中間式だけを確認しました。

## 6. 演習：一つの作用から有限・無限小の両方を計算する

### Level A

<a id="ex-gmech1-a01"></a>
**A1. 平行移動。** $G=(\mathbb R,+)$ が $Q=\mathbb R$ に $t\cdot q=q+t$ で作用する。余接持ち上げと $\xi=1$ の基本ベクトル場を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $d\phi_t|_q=1$ なのでその逆も1であり、[余接持ち上げられたLie群作用](#def-gmech1-cotangent-action)から

$$
\widetilde\Phi_t(q,p)=(q+t,p).
$$

$t=0$ で微分すれば $q$ の速度は1、$p$ の速度は0です。従って $\xi_{T^*\mathbb R}=\partial_q$ です。[座標公式](#thm-gmech1-infinitesimal-coordinate)でも $a(q)=1$、$a'(q)=0$ から同じ結果です。
<!-- solution-end -->

<a id="ex-gmech1-a02"></a>
**A2. 伸縮の逆転置。** $G=(\mathbb R,+)$ が $Q=\mathbb R^2$ に $\phi_t(x,y)=(e^{2t}x,e^{-t}y)$ で作用する。余接持ち上げを求め、正準1形式が保たれることを座標で確かめよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $D\phi_t=\operatorname{diag}(e^{2t},e^{-t})$ なので逆転置は $\operatorname{diag}(e^{-2t},e^t)$ です。

$$
\widetilde\Phi_t(x,y,p_x,p_y)
=(e^{2t}x,e^{-t}y,e^{-2t}p_x,e^tp_y).
$$

$X=e^{2t}x$、$Y=e^{-t}y$、$P_X=e^{-2t}p_x$、$P_Y=e^tp_y$ と置きます。[Liouville 1形式の局所表示](../../SYM/SYM3/index.md#prop-sym3-liouville-coordinate) $\theta=\sum_i p_i\,dq^i$ を用い、$t$ を固定して微分すると

$$
\begin{aligned}
P_X\,dX+P_Y\,dY
&=e^{-2t}p_x(e^{2t}dx)
+e^tp_y(e^{-t}dy)\\
&=p_x\,dx+p_y\,dy.
\end{aligned}
$$

従って $\theta$ は保存されます。
<!-- solution-end -->

<a id="ex-gmech1-a03"></a>
**A3. 一次元の無限小公式。** $G=\mathbb R$ が $Q=(0,\infty)$ に $\phi_t(q)=e^tq$ で作用する。$\xi=1$ の持ち上げ生成子を直接計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $d\phi_t=e^t$ によって $(q,p)$ は $(e^tq,e^{-t}p)$ に移るので

$$
\left.\frac d{dt}\right|_0 e^tq=q,\qquad
\left.\frac d{dt}\right|_0 e^{-t}p=-p.
$$

よって $q\partial_q-p\partial_p$ です。$a(q)=q$ とすれば $a'(q)=1$ なので [座標公式](#thm-gmech1-infinitesimal-coordinate)の二項も $q\partial_q-p\partial_p$ となります。
<!-- solution-end -->

<a id="ex-gmech1-a04"></a>
**A4. 固定点の違い。** 標準回転 $SO(2)$ の $Q=\mathbb R^2$ 上の作用について、$q=0$、$p=(1,0)$ の余接束の点を固定する回転を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $R_t0=0$ なので基点は任意の回転で固定されます。一方、余ベクトルの成分は $R_tp=(\cos t,\sin t)$ です。これが $(1,0)$ と等しいには $\cos t=1$、$\sin t=0$ が必要十分で、$t\in2\pi\mathbb Z$ に限ります。$SO(2)$ ではこれらは恒等元一つです。[安定化群の命題](#prop-gmech1-stabilizer)の二条件のうち、運動量条件が追加で働く例です。
<!-- solution-end -->

### Level B

<a id="ex-gmech1-b01"></a>
**B1. せん断の一パラメータ作用。** $G=(\mathbb R,+)$ が $Q=\mathbb R^2$ に $\phi_t(x,y)=(x,y+tx)$ で作用する。群則、余接持ち上げ、無限小生成子を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\phi_t(\phi_s(x,y))=(x,y+sx+tx)=\phi_{t+s}(x,y)$、$\phi_0=\operatorname{id}$ なので作用です。Jacobian とその逆転置は

$$
D\phi_t=\begin{pmatrix}1&0\\t&1\end{pmatrix},
\qquad
(D\phi_t)^{-\mathsf T}
=\begin{pmatrix}1&-t\\0&1\end{pmatrix}.
$$

従って

$$
\widetilde\Phi_t(x,y,p_x,p_y)
=(x,y+tx,p_x-tp_y,p_y).
$$

$t=0$ の微分は $x$ 成分0、$y$ 成分 $x$、$p_x$ 成分 $-p_y$、$p_y$ 成分0なので

$$
\xi_{T^*\mathbb R^2}
=x\partial_y-p_y\partial_{p_x}.
$$

$Q$ 上の $a=(0,x)$ として [座標公式](#thm-gmech1-infinitesimal-coordinate)に代入しても $-\partial_xa^y\,p_y=-p_y$ です。
<!-- solution-end -->

<a id="ex-gmech1-b02"></a>
**B2. 無限小と正準2形式。** $Q=\mathbb R^2$ で $\xi_Q=-y\partial_x+x\partial_y$ が回転の生成子とする。[余接持ち上げの無限小座標公式](#thm-gmech1-infinitesimal-coordinate)から持ち上げを求め、$\iota_{\xi_{T^*Q}}\omega_{\mathrm{can}}$ を計算せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $a^x=-y$、$a^y=x$ の偏微分を取ると $\partial_xa^y=1$、$\partial_ya^x=-1$ で、ほかは零です。従って

$$
X=-y\partial_x+x\partial_y
-p_y\partial_{p_x}+p_x\partial_{p_y}.
$$

[SYM3の正準2形式の座標式](../../SYM/SYM3/index.md#thm-sym3-cotangent-symplectic)から $\omega_{\mathrm{can}}=dx\wedge dp_x+dy\wedge dp_y$ です。各項の縮約は

$$
\begin{aligned}
\iota_X(dx\wedge dp_x)&=-y\,dp_x+p_y\,dx,\\
\iota_X(dy\wedge dp_y)&=x\,dp_y-p_x\,dy.
\end{aligned}
$$

和は

$$
-y\,dp_x+x\,dp_y+p_y\,dx-p_x\,dy
=d(xp_y-yp_x).
$$

微分を展開すると $d(xp_y)=p_y\,dx+x\,dp_y$、$d(yp_x)=p_x\,dy+y\,dp_x$ なので、二つの式が一致します。
<!-- solution-end -->

<a id="ex-gmech1-b03"></a>
**B3. 余接束の安定化群。** $SO(2)$ が $Q=\mathbb R^2$ に標準回転で作用する。$q\neq0$ なら任意の $p$ に対し $G_{(q,p)}$ はどうなるか。$q=0$、$p=0$ の場合と比較せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $q\neq0$ を固定する回転は恒等回転のみです。実際 $R_tq=q$ なら両辺の内積を $q$ と取り、$|q|^2\cos t=|q|^2$ だから $\cos t=1$ であり $R_t=I$ です。[安定化群の命題](#prop-gmech1-stabilizer)から $G_{(q,p)}\subseteq G_q=\{I\}$ で、恒等元は必ず固定するので等号です。一方 $(q,p)=(0,0)$ では $R_t0=0$ が位置・運動量の両方で成立し、安定化群は $SO(2)$ 全体です。位置条件と運動量条件を区別する必要があります。
<!-- solution-end -->

<a id="ex-gmech1-b04"></a>
**B4. 2形式保存だけでは余接持ち上げでない。** $Q=\mathbb R$ で $S(q,p)=(q,p+c)$、$c\neq0$ とする。$S$ が正準2形式を保存するが正準1形式を保存しないことを証明し、$S$ がどの微分同相 $f:Q\to Q$ の余接持ち上げでもないと示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** [SYM3の正準形式の座標式](../../SYM/SYM3/index.md#prop-sym3-liouville-coordinate)によって $\theta=p\,dq$ であり、[正準2形式](../../SYM/SYM3/index.md#thm-sym3-cotangent-symplectic)は $\omega_{\mathrm{can}}=dq\wedge dp$ です。$Q=q$、$P=p+c$ と置くと

$$
S^*\theta=(p+c)dq=\theta+c\,dq\neq\theta,
$$

$$
S^*\omega_{\mathrm{can}}
=dq\wedge d(p+c)=dq\wedge dp=\omega_{\mathrm{can}}.
$$

もし $S=\widehat f$ なら [SYM3の余接持ち上げの正準1形式保存定理](../../SYM/SYM3/index.md#thm-sym3-cotangent-lift-preserves)から $S^*\theta=\theta$ が必要です。$c\,dq$ は零でない1形式なので矛盾します。したがって2形式の保存は、余接持ち上げであるための十分条件ではありません。
<!-- solution-end -->

### Level C

<a id="ex-gmech1-c01"></a>
**C1. アフィン群の非可換作用を追う。** $G=\{(a,b):a>0,\ b\in\mathbb R\}$ に積

$$
(a,b)(c,d)=(ac,b+ad)
$$

を入れ、$Q=\mathbb R$ に $(a,b)\cdot q=aq+b$ と作用させる。

1. 群作用を示し、余接持ち上げを求めよ。
2. 一パラメータ部分群 $(e^t,0)$、$(1,t)$ に対応する余接束上の基本ベクトル場 $D,T$ を求めよ。
3. Lie括弧 $[D,T]$ を計算し、左作用による反準同型の符号と整合することを示せ。
4. 任意の群元による $\theta$ の保存を確かめよ。

- Level: C

<!-- solution-start -->
**詳細解答。**

(1) まず $(a,b)\cdot((c,d)\cdot q)=a(cq+d)+b=acq+(b+ad)$ です。これは積 $(ac,b+ad)$ の作用に一致し、$(1,0)$ は恒等作用です。また $a>0$ なので $(a,b)^{-1}=(a^{-1},-b/a)$ が $G$ 内にあり、両方向に掛けると $(1,0)$ になります。従って各群元の作用は逆写像を持ちます。$q\mapsto aq+b$ の微分は $a$、逆微分は $1/a$ なので

$$
\widetilde\Phi_{(a,b)}(q,p)
=(aq+b,p/a).
$$

(2) $(e^t,0)$ による変換を $t=0$ で微分すると

$$
D=\left.\frac d{dt}\right|_0(e^tq,e^{-t}p)
=q\partial_q-p\partial_p.
$$

$(1,t)$ による変換では $(q+t,p)$ となるので $T=\partial_q$ です。各曲線は $t+s$ で積が一致するため一パラメータ部分群です。

(3) 任意の滑らかな関数 $f$ に対し、交換子は $[D,T]f=D(Tf)-T(Df)$ です。$Tf=\partial_q f$ と $Df=q\partial_qf-p\partial_pf$ を代入し、

$$
\begin{aligned}
D(Tf)&=q\partial_q^2f-p\partial_p\partial_q f,\\
T(Df)&=\partial_q f+q\partial_q^2f-p\partial_q\partial_p f.
\end{aligned}
$$

混合偏微分を相殺すると $[D,T]f=-\partial_qf$、すなわち

$$
[D,T]=-T.
$$

元のアフィン変換のLie環では拡大生成元 $d$ と並進生成元 $t$ の括弧が $[d,t]=t$ です。これは行列表示

$$
d=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
t=\begin{pmatrix}0&1\\0&0\end{pmatrix}
$$

の交換子 $dt-td=t$ から確認できます。従って [余接持ち上げの括弧の命題](#prop-gmech1-flow-bracket)は $[D,T]=-[d,t]_{T^*Q}=-T$ を予言し、直接計算と一致します。

(4) [Liouville 1形式の局所表示](../../SYM/SYM3/index.md#prop-sym3-liouville-coordinate)を使います。$Q=aq+b$、$P=p/a$ と置き、$a,b$ を固定すると $dQ=a\,dq$ なので

$$
P\,dQ=(p/a)(a\,dq)=p\,dq=\theta.
$$

これで有限作用、無限小作用、非可換な括弧、正準形式保存を一つの例で照合できました。
<!-- solution-end -->
