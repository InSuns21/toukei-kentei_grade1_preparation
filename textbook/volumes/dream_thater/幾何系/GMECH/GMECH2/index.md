# GMECH2 Hamilton作用と運動量写像

[GMECH1の余接持ち上げ作用](../GMECH1/index.md#thm-gmech1-lift-action)は位置と運動量の変換を同時に記述し、その[無限小座標公式](../GMECH1/index.md#thm-gmech1-infinitesimal-coordinate)は位置速度だけでなく運動量速度まで求めました。ただし、それがどんな**関数**によって生成されるかはまだ体系化していません。[SYM4のHamiltonベクトル場](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)を使えば、ベクトル場と関数を結ぶことができます。

本章では、Lie代数の元 $\xi$ ごとに得る関数を一つの双対空間値写像へ束ねます。すると平行移動には線形運動量、回転には角運動量が現れます。さらに、群で状態を変換したときその写像がどう変わるかを追います。**群作用がシンプレクティックであること、Hamiltonianであること、運動量写像が同変であることは、それぞれ異なる条件**です。最後の違いは具体的な反例でも確認します。

## 1. シンプレクティック作用からHamilton作用へ

$(M,\omega)$ を有限次元シンプレクティック多様体、$G$ を有限次元実Lie群、$\mathfrak g=T_eG$ をそのLie代数とします。滑らかな左作用 $\Phi:G\times M\to M$ を固定し、$\Phi_g(m)=g\cdot m$、$\xi_M(m)=\left.\frac d{dt}\right|_0\exp(t\xi)\cdot m$ とします。基本ベクトル場の符号は[GMECH1の定義](../GMECH1/index.md#def-gmech1-infinitesimal-lift)と同じで、**左作用をそのまま微分**します。

$\Phi_g^*\omega=\omega$ がすべての $g$ で成立する作用をシンプレクティック作用と考えます。それだけでは $\xi_M$ をHamilton関数から作れるとは限りません。欲しいのは、各 $\xi$ に対して $\iota_{\xi_M}\omega$ がある関数の完全微分となり、その関数を $\xi$ に対して**線形に選べる**ことです。

<a id="def-gmech2-hamiltonian-action"></a>

<!-- formal-statement-start -->
> **定義（Hamilton作用）**  
> 有限次元Lie群 $G$ がシンプレクティック多様体 $(M,\omega)$ に滑らかに左作用し、各 $\Phi_g$ が $\omega$ を保存するとする。滑らかな写像 $J:M\to\mathfrak g^*$ が存在して、任意の $\xi\in\mathfrak g$ に対して関数 $J_\xi(m)=\langle J(m),\xi\rangle$ が
>
$$
\iota_{\xi_M}\omega=dJ_\xi
$$
>
> を満たすとき、この作用を **Hamilton作用** と呼び、$J$ を **運動量写像** と呼ぶ。ここで $\langle\ ,\ \rangle$ は $\mathfrak g^*$ と $\mathfrak g$ の自然な双対評価とする。
<!-- formal-statement-end -->

[SYM4の規約](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)は $\iota_{X_f}\omega=df$ です。したがってこの定義の符号では、[Hamiltonベクトル場の一意性](../../SYM/SYM4/index.md#thm-sym4-existence-coordinate)により $\xi_M=X_{J_\xi}$ となります。符号を逆にした運動量写像をここへ持ち込むと後続の角運動量や括弧の式がすべて反転します。

<!-- definition-example-start: def-gmech2-hamiltonian-action -->
### 直接例：一次元の平行移動

$G=(\mathbb R,+)$ が $M=T^*\mathbb R$ に $t\cdot(q,p)=(q+t,p)$ と作用します。これは[GMECH1の余接持ち上げ](../GMECH1/index.md#def-gmech1-cotangent-action)で、正準2形式 $\omega=dq\wedge dp$ を保存します。Lie代数の元 $\xi\in\mathbb R$ の生成子は $\xi_M=\xi\partial_q$ なので、

$$
\iota_{\xi_M}\omega=\xi\,dp=d(\xi p).
$$

したがって $\mathfrak g^*\simeq\mathbb R$ のもとで $J(q,p)=p$ とすれば、$\langle J(q,p),\xi\rangle=\xi p$ となり、すべての $\xi$ について定義式を満たします。単に $J_1=p$ を見つけただけでなく、$\xi$ への線形性まで確かめています。
<!-- definition-example-end -->

同じ生成子でも関数の定数項は微分で消えます。特に $M$ が連結なら、固定した作用の二つの運動量写像の差は定数の $\mathfrak g^*$ 値です。ただしその定数を任意に取っても後で述べる同変性が保たれるとは限りません。

<a id="prop-gmech2-momentum-ambiguity"></a>

<!-- formal-statement-start -->
> **命題（連結な位相空間での運動量写像の不定性）**  
> $M$ を連結なシンプレクティック多様体とし、同じ滑らかな左作用に対して $J,K:M\to\mathfrak g^*$ が運動量写像であるとする。このとき、ある定数 $c\in\mathfrak g^*$ が存在して $K(m)=J(m)+c$ が全 $m\in M$ で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

すべての $\xi$ との双対評価について微分が消えることを確認し、Lie代数の基底に沿って定数をまとめます。

<!-- proof-start -->
### 証明

任意の $\xi\in\mathfrak g$ に対し、[運動量写像の定義](#def-gmech2-hamiltonian-action)を $J$ と $K$ に適用すると、

$$
d\langle K-J,\xi\rangle
=\iota_{\xi_M}\omega-\iota_{\xi_M}\omega=0.
$$

連結な滑らかな多様体上で微分が零の滑らかな実関数は定数です。実際、任意の点の座標近傍の小さい凸球内では直線上に関数を制限して一変数微分を積分すれば一定であり、局所定数関数は連結性により大域的にも一定です。$\mathfrak g$ の基底 $e_1,\ldots,e_r$ を取り、各 $\langle K-J,e_i\rangle$ の値を $c_i$ とすると、双対基底 $e^i$ に対して $c=\sum_i c_i e^i$ を定められます。任意の $\xi=\sum_i\xi^i e_i$ について、

$$
\langle K(m)-J(m),\xi\rangle
=\sum_i\xi^ic_i=\langle c,\xi\rangle.
$$

双対評価がすべての $\xi$ で一致するため $K(m)-J(m)=c$ です。
<!-- proof-end -->

## 2. 余接持ち上げの運動量写像を構成する

任意のシンプレクティック作用で運動量写像を探すのは難しいことがあります。しかし位置空間 $Q$ の作用から余接持ち上げた場合は、余ベクトル $\alpha_q$ を位置の基本ベクトル場 $\xi_Q(q)$ に評価するだけで候補が作れます。これは座標なしに書けるので、座標ごとに候補を貼り合わせる必要もありません。

<a id="thm-gmech2-cotangent-momentum"></a>

<!-- formal-statement-start -->
> **定理（余接持ち上げ作用の標準運動量写像）**  
> 有限次元実Lie群 $G$ が有限次元滑らかな多様体 $Q$ に滑らかに左作用するとする。$T^*Q$ への余接持ち上げ作用、Liouville 1形式 $\theta$ と $\omega_{\mathrm{can}}=-d\theta$ に対して
>
$$
\langle J(\alpha_q),\xi\rangle
=\alpha_q(\xi_Q(q)),
\qquad \alpha_q\in T_q^*Q,\quad \xi\in\mathfrak g
$$
>
> と定めると、$J:T^*Q\to\mathfrak g^*$ は滑らかな運動量写像である。すなわち全 $\xi$ について
>
$$
\iota_{\xi_{T^*Q}}\omega_{\mathrm{can}}
=d\langle J,\xi\rangle
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

まず右辺が $\xi$ の線形汎関数を定めること、滑らかであることを確かめます。その後、[GMECH1の正準1形式保存](../GMECH1/index.md#prop-gmech1-canonical-preservation)を無限小に微分し、[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)を使います。この方法では運動量写像の正負を推測せずに決められます。

<!-- proof-start -->
### 証明

各 $\alpha_q$ を固定すると、$\xi\mapsto\xi_Q(q)$ は基本ベクトル場の定義により線形であり、$\alpha_q:T_qQ\to\mathbb R$ も線形です。ゆえに $\xi\mapsto\alpha_q(\xi_Q(q))$ は $\mathfrak g$ 上の線形汎関数となり、$J(\alpha_q)\in\mathfrak g^*$ が一意に定まります。

滑らかさは局所座標で調べます。Lie代数の基底を $e_a$ とし、$(e_a)_Q=\sum_i a_a^i(q)\partial_{q^i}$ と書くと、双対基底に関する $J$ の成分は $\sum_i p_i a_a^i(q)$ です。作用が滑らかなので係数 $a_a^i$ は滑らかであり、従って $J$ も滑らかです。

[Liouville 1形式の定義](../../SYM/SYM3/index.md#def-sym3-tautological-form)では $\theta_{\alpha_q}(v)=\alpha_q(d\pi_{\alpha_q}v)$ です。[GMECH1の生成子の射影公式](../GMECH1/index.md#thm-gmech1-infinitesimal-coordinate)から

$$
\begin{aligned}
\theta_{\alpha_q}(\xi_{T^*Q}(\alpha_q))
&=\alpha_q\bigl(d\pi_{\alpha_q}\xi_{T^*Q}(\alpha_q)\bigr)\\
&=\alpha_q(\xi_Q(q))
=\langle J(\alpha_q),\xi\rangle.
\end{aligned}
$$

さらに余接持ち上げは[GMECH1の保存命題](../GMECH1/index.md#prop-gmech1-canonical-preservation)により $\widetilde\Phi_g^*\theta=\theta$ を満たします。$g=\exp(t\xi)$ として $t=0$ で微分すると、生成子のLie微分は

$$
\mathcal L_{\xi_{T^*Q}}\theta
=\left.\frac d{dt}\right|_0\widetilde\Phi_{\exp(t\xi)}^*\theta=0.
$$

[Cartanの公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)の1形式への適用から

$$
0=\mathcal L_{\xi_{T^*Q}}\theta
=d(\iota_{\xi_{T^*Q}}\theta)
+\iota_{\xi_{T^*Q}}d\theta.
$$

$\omega_{\mathrm{can}}=-d\theta$ と $\iota_{\xi_{T^*Q}}\theta=\langle J,\xi\rangle$ を代入して移項すると

$$
\iota_{\xi_{T^*Q}}\omega_{\mathrm{can}}
=-\iota_{\xi_{T^*Q}}d\theta
=d(\iota_{\xi_{T^*Q}}\theta)
=d\langle J,\xi\rangle.
$$

定義に必要な全 $\xi$ で成立したので証明が完了します。
<!-- proof-end -->

<!-- definition-example-start: thm-gmech2-cotangent-momentum -->
### 直接計算：一般の局所座標で符号を再確認する

$\xi_Q=\sum_i a^i(q)\partial_{q^i}$ とすると

$$
J_\xi(q,p)=\sum_i p_i a^i(q),\qquad
dJ_\xi=\sum_i a^i\,dp_i
+\sum_{i,j}p_j\,\partial_i a^j\,dq^i.
$$

[GMECH1の無限小座標公式](../GMECH1/index.md#thm-gmech1-infinitesimal-coordinate)を代入すると

$$
\begin{aligned}
\iota_{\xi_{T^*Q}}\omega_{\mathrm{can}}
&=\iota_{\sum_i a^i\partial_{q^i}-\sum_{i,j}p_j\partial_i a^j\partial_{p_i}}
\sum_k dq^k\wedge dp_k\\
&=\sum_i a^i\,dp_i+\sum_{i,j}p_j\partial_i a^j\,dq^i\\
&=dJ_\xi.
\end{aligned}
$$

縮約では $\iota_{\partial_{p_i}}(dq^i\wedge dp_i)=-dq^i$ なので、生成子の負号ともう一つの負号が打ち消し合います。この二重の符号が重要です。
<!-- definition-example-end -->

## 3. 並進・回転・伸縮の運動量

$Q=\mathbb R^n$ の並進作用 $a\cdot q=q+a$ を考えると、$\xi_Q(q)=\xi$ です。余接束の標準運動量写像は

$$
\langle J(q,p),\xi\rangle=p^{\mathsf T}\xi.
$$

したがって $\mathfrak g^*\simeq(\mathbb R^n)^*$ のもとで **$J(q,p)=p$** です。これが線形運動量です。

次に $SO(2)$ の回転 $R_t$ のLie代数を実数 $s$ と同一視し、$s$ に対応する生成子を $\xi_Q(x,y)=s(-y,x)$ とします。このとき

$$
\begin{aligned}
J_s(q,p)&=p_x(-sy)+p_y(sx)\\
&=s(xp_y-yp_x).
\end{aligned}
$$

したがって運動量写像の成分は **$L_z=xp_y-yp_x$** です。$G$ が $SO(3)$ なら、$\xi\in\mathbb R^3\simeq\mathfrak{so}(3)$ を $\xi_Q(q)=\xi\times q$ と同一視します。Euclid内積のもとで

$$
\langle J(q,p),\xi\rangle
=p\cdot(\xi\times q)
=\xi\cdot(q\times p),
$$

ゆえに **$J(q,p)=q\times p$** です。最後の等式はスカラー三重積の循環性から得られます。$q,p$ を同時に回すと角運動量も同じ回転で変わります。

伸縮作用 $\phi_t(q)=e^tq$ では $\xi_Q(q)=\xi q$ ですから、

$$
J_\xi(q,p)=\xi\,qp,\qquad J(q,p)=qp.
$$

これは線形運動量 $p$ と異なり、位置と運動量の積です。どの保存量が現れるかは、運動量だけでなく**どの群が何を動かすか**で決まります。

## 4. 運動量写像の同変性は何を要求するか

運動量写像は無限小作用を関数へ翻訳しました。次は有限な群元 $g$ で点 $m$ を動かした後の $J(g\cdot m)$ を知りたい、という問いです。Lie代数の基底は群による共役で変わるので、その双対側の変換を使います。

[LIE2の随伴表現](../../../代数系/LIE/LIE2/index.md#def-lie2-adjoint-representation) $\operatorname{Ad}_g:\mathfrak g\to\mathfrak g$ は $h\mapsto ghg^{-1}$ の単位元での微分です。その双対を $(\operatorname{Ad}_g)^*:\mathfrak g^*\to\mathfrak g^*$ と書くとき、$G$ の**左余随伴作用**は逆元を含む写像で与えます。

<a id="def-gmech2-coadjoint-equivariance"></a>

<!-- formal-statement-start -->
> **定義（余随伴作用と同変な運動量写像）**  
> 有限次元Lie群 $G$ の左余随伴作用を
>
$$
g\cdot\mu=\operatorname{Ad}_{g^{-1}}^*\mu,
\qquad
\langle \operatorname{Ad}_{g^{-1}}^*\mu,\xi\rangle
=\langle\mu,\operatorname{Ad}_{g^{-1}}\xi\rangle
$$
>
> と定める。$G$ が $(M,\omega)$ に左Hamilton作用し、運動量写像が $J:M\to\mathfrak g^*$ であるとき、すべての $g\in G,m\in M$ に対して
>
$$
J(g\cdot m)=\operatorname{Ad}_{g^{-1}}^*J(m)
$$
>
> が成り立つなら、$J$ は **同変**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmech2-coadjoint-equivariance -->
### 直接例：可換な回転群では不変性になる

$G=SO(2)$ は可換なので $ghg^{-1}=h$ です。したがって $\operatorname{Ad}_g$ はLie代数上の恒等写像で、余随伴作用も恒等写像です。§3 の角運動量 $L_z=xp_y-yp_x$ について $q'=R_tq$、$p'=R_tp$ とすると

$$
\begin{aligned}
x'p_y'-y'p_x'
&=(x\cos t-y\sin t)(p_x\sin t+p_y\cos t)\\
&\quad-(x\sin t+y\cos t)(p_x\cos t-p_y\sin t)\\
&=xp_y(\cos^2t+\sin^2t)-yp_x(\sin^2t+\cos^2t)\\
&=xp_y-yp_x.
\end{aligned}
$$

よって $J(R_tq,R_tp)=J(q,p)$ となり、余随伴作用が恒等な場合の同変性を直接確認できました。
<!-- definition-example-end -->

<a id="thm-gmech2-cotangent-equivariance"></a>

<!-- formal-statement-start -->
> **定理（余接持ち上げの標準運動量写像は同変）**  
> 有限次元実Lie群 $G$ が滑らかな多様体 $Q$ に左作用するとする。[標準運動量写像](#thm-gmech2-cotangent-momentum)は、任意の $g\in G$、$\alpha_q\in T_q^*Q$ に対し
>
$$
J(\widetilde\Phi_g(\alpha_q))
=\operatorname{Ad}_{g^{-1}}^*J(\alpha_q)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

有限変換で移動した点の基本ベクトル場は、元の点の $\operatorname{Ad}_{g^{-1}}\xi$ に対応する基本ベクトル場を押し出したものです。逆微分で運ぶ余ベクトルと、この押し出しの微分を相殺します。

<!-- proof-start -->
### 証明

$g\in G$ と $\xi\in\mathfrak g$ を固定し、$q'=g\cdot q$ と書きます。まず基本ベクトル場の変換公式を導きます。曲線

$$
\exp(t\xi)\cdot(g\cdot q)
=g\cdot\bigl((g^{-1}\exp(t\xi)g)\cdot q\bigr)
$$

の $t=0$ での微分を考えます。[LIE2の共役と指数写像の可換性](../../../代数系/LIE/LIE2/index.md#thm-lie2-conjugation-exponential)から

$$
g^{-1}\exp(t\xi)g
=\exp(t\operatorname{Ad}_{g^{-1}}\xi)
$$

です。従って連鎖律より、

$$
\xi_Q(g\cdot q)
=d\phi_g|_q\bigl((\operatorname{Ad}_{g^{-1}}\xi)_Q(q)\bigr).
$$

一方、[余接持ち上げの定義](../GMECH1/index.md#def-gmech1-cotangent-action)から、移動後の余ベクトルは $\beta_{q'}=\alpha_q\circ(d\phi_g|_q)^{-1}$ です。[運動量写像の定義式](#thm-gmech2-cotangent-momentum)へこれを代入すると、

$$
\begin{aligned}
\langle J(\widetilde\Phi_g(\alpha_q)),\xi\rangle
&=\beta_{q'}(\xi_Q(q'))\\
&=\alpha_q\bigl((d\phi_g|_q)^{-1}\xi_Q(q')\bigr)\\
&=\alpha_q\bigl((\operatorname{Ad}_{g^{-1}}\xi)_Q(q)\bigr)\\
&=\langle J(\alpha_q),\operatorname{Ad}_{g^{-1}}\xi\rangle\\
&=\langle\operatorname{Ad}_{g^{-1}}^*J(\alpha_q),\xi\rangle.
\end{aligned}
$$

任意の $\xi\in\mathfrak g$ との評価が一致するため、$\mathfrak g^*$ の元として等しいことが従います。
<!-- proof-end -->

$SO(3)$ の場合は $\operatorname{Ad}_{R}\xi=R\xi$ を $\mathbb R^3$ による表示で確かめると、

$$
J(Rq,Rp)=(Rq)\times(Rp)=R(q\times p)
$$

となり、余随伴作用の表現と一致します。直交性と $\det R=1$ が積の向きを保つことに注意してください。

## 5. Hamilton作用でも同変性は自動でない

同変性が余接持ち上げで成立するのは定理であり、任意のHamilton作用に無条件で拡張できません。$M=\mathbb R^2$ に $\omega=dq\wedge dp$ を入れ、可換群 $G=(\mathbb R^2,+)$ を

$$
(u,v)\cdot(q,p)=(q+u,p+v)
$$

で作用させます。微分は恒等なので $\omega$ を保ちます。Lie代数の元 $\xi=(a,b)$ の生成子は $a\partial_q+b\partial_p$ で、

$$
\iota_{\xi_M}\omega=a\,dp-b\,dq
=d(ap-bq).
$$

したがって $J(q,p)=(p,-q)$ は（標準双対基底に関して）確かに運動量写像です。しかし可換群の余随伴作用は恒等であるにもかかわらず、

$$
J((u,v)\cdot(q,p))
=(p+v,-q-u)=J(q,p)+(v,-u).
$$

$(u,v)\ne(0,0)$ なら等しくありません。これは**Hamilton作用だが同変な運動量写像を持たない**例です。$M$ は連結なので[不定性の命題](#prop-gmech2-momentum-ambiguity)により他の運動量写像は $J+c$ だけですが、$J+c$ の差分も $(v,-u)$ のままで、定数の取り直しでは直せません。

次章では群作用でHamiltonianが不変のとき、ここで作った関数 $J_\xi$ が時間発展でどう保存されるかを調べます。**同変性の有無と、時間発展による保存は別の問い**です。

## 6. 演習：定義式・符号・同変性を自力で調べる

### Level A

<a id="ex-gmech2-a01"></a>
**A1. 直線の平行移動。** $(T^*\mathbb R,dq\wedge dp)$ に $t\cdot(q,p)=(q+t,p)$ と作用させる。一般の $\xi\in\mathbb R$ について $\iota_{\xi_M}\omega$ と $J_\xi$ を求め、定義式を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $t\xi$ による曲線は $(q+t\xi,p)$ なので $\xi_M=\xi\partial_q$ です。縮約すると $\iota_{\xi\partial_q}(dq\wedge dp)=\xi\,dp$ です。$J_\xi=\xi p$ なら $dJ_\xi=\xi\,dp$ で一致します。$\xi$ に関して線形であるため $J(q,p)=p\in\mathfrak g^*\simeq\mathbb R$ とまとめられます。
<!-- solution-end -->

<a id="ex-gmech2-a02"></a>
**A2. 伸縮の運動量。** $t\cdot(q,p)=(e^tq,e^{-t}p)$ に対し、$\xi=1$ の運動量関数を求めて正準形式で検算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 作用を微分すると $X=q\partial_q-p\partial_p$ です。[標準運動量写像](#thm-gmech2-cotangent-momentum)では位置の生成子が $q\partial_q$ なので $J_1=pq$ です。これとは別に

$$
\iota_X(dq\wedge dp)=q\,dp+p\,dq=d(qp)
$$

と計算でき、符号が一致します。
<!-- solution-end -->

<a id="ex-gmech2-a03"></a>
**A3. 平面回転の成分。** $SO(2)$ が $T^*\mathbb R^2$ に $(q,p)\mapsto(R_tq,R_tp)$ と作用する。生成子 $\xi=1$ に対する $J_1$ を求め、点 $q=(2,3)$、$p=(5,7)$ で評価せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 位置の生成子は $(-y,x)$ だから、[標準公式](#thm-gmech2-cotangent-momentum)より

$$
J_1(x,y,p_x,p_y)=(p_x,p_y)\cdot(-y,x)
=xp_y-yp_x.
$$

値は $2\cdot7-3\cdot5=14-15=-1$ です。$yp_x-xp_y$ としてしまうと[SYM4の符号](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)に反します。
<!-- solution-end -->

<a id="ex-gmech2-a04"></a>
**A4. せん断の運動量。** $t\cdot(x,y)=(x,y+tx)$ の余接持ち上げに対して $J_1$ を求め、生成子による縮約と比べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 位置の生成子は $x\partial_y$ なので $J_1=xp_y$ です。[GMECH1の生成子公式](../GMECH1/index.md#thm-gmech1-infinitesimal-coordinate)から余接束上の生成子は $X=x\partial_y-p_y\partial_{p_x}$ です。$\omega=dx\wedge dp_x+dy\wedge dp_y$ に代入すると、

$$
\iota_X\omega=p_y\,dx+x\,dp_y=d(xp_y).
$$

これで二つの導出が一致します。
<!-- solution-end -->

### Level B

<a id="ex-gmech2-b01"></a>
**B1. 任意の線形一パラメータ群。** 実 $n\times n$ 行列 $A$ に対して $t\cdot q=e^{tA}q$ が $Q=\mathbb R^n$ に作用するとする。余接持ち上げの生成子と $J_1$ を求め、定義式を成分で検算せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 微分が $e^{tA}$ だから余接持ち上げは

$$
(q,p)\longmapsto(e^{tA}q,e^{-tA^{\mathsf T}}p).
$$

$t=0$ で微分して $X=(Aq)\cdot\partial_q-(A^{\mathsf T}p)\cdot\partial_p$ です。位置の生成子は $Aq$ なので $J_1=p^{\mathsf T}Aq$ です。成分微分を取ると

$$
dJ_1=(Aq)^{\mathsf T}dp+(A^{\mathsf T}p)^{\mathsf T}dq.
$$

一方 $\omega=\sum_i dq^i\wedge dp_i$ だから、$X$ の $dq^i$ 方向係数が $(Aq)_i$、$dp_i$ 方向係数が $-(A^{\mathsf T}p)_i$ であることを使い、

$$
\iota_X\omega
=\sum_i(Aq)_i\,dp_i+\sum_i(A^{\mathsf T}p)_i\,dq^i=dJ_1.
$$

行列 $A$ の対称性・可逆性は仮定していません。指数行列 $e^{tA}$ は常に可逆です。
<!-- solution-end -->

<a id="ex-gmech2-b02"></a>
**B2. 平面の全平行移動は非同変。** $G=\mathbb R^2$ が $(q,p)$ を $(q+u,p+v)$ に動かすとする。(1) 運動量写像を計算せよ。(2) 余随伴作用を求め同変性を判定せよ。(3) 定数ベクトルを足して修正できるか。

- Level: B

<!-- solution-start -->
**詳細解答。** $\xi=(a,b)$ の生成子は $X_\xi=a\partial_q+b\partial_p$ であり、

$$
\iota_{X_\xi}(dq\wedge dp)
=a\,dp-b\,dq=d(ap-bq).
$$

ゆえに $J(q,p)=(p,-q)$ です。$G$ は可換だから $\operatorname{Ad}_g=\operatorname{id}$ で、同変性には $J(q+u,p+v)=J(q,p)$ が必要ですが、差は $(v,-u)$ です。定数 $c$ を足しても

$$
(J+c)(q+u,p+v)-(J+c)(q,p)=(v,-u)
$$

で消えません。[運動量写像の不定性](#prop-gmech2-momentum-ambiguity)と $M$ の連結性から、別の運動量写像を選んでも同じ結論です。
<!-- solution-end -->

<a id="ex-gmech2-b03"></a>
**B3. 回転の同変性を直接計算。** $G=SO(3)$ が $(q,p)\in T^*\mathbb R^3$ に $(Rq,Rp)$ と作用する。$J=q\times p$ が $\operatorname{Ad}_{R^{-1}}^*J$ に従って変換することを、任意の $\xi\in\mathbb R^3$ との評価から示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 位置の基本ベクトル場は $\xi_Q(q)=\xi\times q$ だから

$$
\langle J(q,p),\xi\rangle
=p\cdot(\xi\times q)=\xi\cdot(q\times p).
$$

直交行列 $R\in SO(3)$ では内積とベクトル積が保たれるため、

$$
\begin{aligned}
\langle J(Rq,Rp),\xi\rangle
&=(Rp)\cdot(\xi\times Rq)\\
&=p\cdot(R^{\mathsf T}\xi\times q)\\
&=\langle J(q,p),R^{-1}\xi\rangle.
\end{aligned}
$$

$\mathfrak{so}(3)\simeq\mathbb R^3$ では $\operatorname{Ad}_{R^{-1}}\xi=R^{-1}\xi$ なので最後の式は $\langle\operatorname{Ad}_{R^{-1}}^*J(q,p),\xi\rangle$ です。任意の $\xi$ で一致して同変性が従います。
<!-- solution-end -->

<a id="ex-gmech2-b04"></a>
**B4. Lie代数の括弧と運動量関数。** $G$ の左Hamilton作用に対し同変な $J$ が存在するとする。[SYM4のPoisson括弧](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)について、任意の $\xi,\eta\in\mathfrak g$ に対し次を証明せよ。

$$
\{J_\xi,J_\eta\}=J_{[\xi,\eta]}.
$$

- Level: B

<!-- solution-start -->
**詳細解答。** [SYM4のHamiltonベクトル場](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)と[運動量写像の定義](#def-gmech2-hamiltonian-action)から $X_{J_\eta}=\eta_M$ です。[SYM4のPoisson括弧の定義](../../SYM/SYM4/index.md#def-sym4-poisson-bracket)は

$$
\{J_\xi,J_\eta\}
=\omega(X_{J_\xi},X_{J_\eta})
=dJ_\xi(X_{J_\eta})
=\eta_M J_\xi.
$$

同変性を $g=\exp(t\eta)$ に適用し $\xi$ と双対評価を取ると、

$$
J_\xi(\exp(t\eta)\cdot m)
=\langle J(m),\operatorname{Ad}_{\exp(-t\eta)}\xi\rangle.
$$

[LIE2の無限小随伴作用と括弧](../../../代数系/LIE/LIE2/index.md#thm-lie2-infinitesimal-adjoint-bracket)より $\left.\frac d{dt}\right|_0\operatorname{Ad}_{\exp(-t\eta)}\xi=-[\eta,\xi]$ なので、$t=0$ で微分すると、

$$
\eta_M J_\xi(m)
=-\langle J(m),[\eta,\xi]\rangle
=\langle J(m),[\xi,\eta]\rangle.
$$

反対称性 $[\eta,\xi]=-[\xi,\eta]$ を使ったので結論が正符号になることが分かります。この等式を得るには**同変性の仮定が必要**であり、一般のHamilton作用に無条件では主張できません。
<!-- solution-end -->

### Level C

<a id="ex-gmech2-c01"></a>
**C1. 非可換アフィン群で運動量写像と余随伴作用を照合する。** $G=\{(a,b):a>0,\ b\in\mathbb R\}$ に積 $(a,b)(c,d)=(ac,b+ad)$ を入れ、$Q=\mathbb R$ に $(a,b)\cdot q=aq+b$ と作用させる。Lie代数の基底を、伸縮の一パラメータ部分群 $(e^t,0)$ の生成元 $D$ と、並進 $(1,t)$ の生成元 $T$ とする。(1) $T^*Q$ への持ち上げを求め、運動量写像 $J$ の $D,T$ 成分を示せ。(2) $\operatorname{Ad}_{(a,b)^{-1}}D,\operatorname{Ad}_{(a,b)^{-1}}T$ を求めよ。(3) 任意の $(a,b)$ について同変性を2成分で確認せよ。(4) $\{J_D,J_T\}$ の値を確認せよ。

- Level: C

<!-- solution-start -->
**詳細解答。**

(1) $q\mapsto aq+b$ の微分は $a$、逆微分は $1/a$ なので[GMECH1の作用](../GMECH1/index.md#def-gmech1-cotangent-action)から

$$
(a,b)\cdot(q,p)=(aq+b,p/a).
$$

位置の基本ベクトル場は $D_Q=q\partial_q$、$T_Q=\partial_q$ です。従って[標準運動量写像](#thm-gmech2-cotangent-momentum)の値は

$$
J_D(q,p)=qp,\qquad J_T(q,p)=p.
$$

双対基底 $(D^*,T^*)$ による成分表示は $J(q,p)=(qp,p)$ です。

(2) 群元を行列 $g=\begin{pmatrix}a&b\\0&1\end{pmatrix}$ と表すと、

$$
g^{-1}=\begin{pmatrix}a^{-1}&-b/a\\0&1\end{pmatrix},\quad
D=\begin{pmatrix}1&0\\0&0\end{pmatrix},\quad
T=\begin{pmatrix}0&1\\0&0\end{pmatrix}.
$$

共役の微分は行列積なので、

$$
\begin{aligned}
\operatorname{Ad}_{g^{-1}}D
&=g^{-1}Dg
=\begin{pmatrix}1&b/a\\0&0\end{pmatrix}
=D+(b/a)T,\\
\operatorname{Ad}_{g^{-1}}T
&=g^{-1}Tg
=\begin{pmatrix}0&1/a\\0&0\end{pmatrix}
=(1/a)T.
\end{aligned}
$$

(3) 左辺を移動後の座標で計算すると、

$$
J(aq+b,p/a)
=\left((aq+b)\frac pa,\frac pa\right)
=\left(qp+\frac ba p,\frac pa\right).
$$

右辺について $\mu=(\mu_D,\mu_T)$ とすれば、(2) と[余随伴作用の定義](#def-gmech2-coadjoint-equivariance)により

$$
\operatorname{Ad}_{g^{-1}}^*\mu
=\left(\mu_D+\frac ba\mu_T,\frac1a\mu_T\right).
$$

ここへ $\mu=J(q,p)=(qp,p)$ を代入すると左辺の2成分と一致します。

(4) [SYM4の正準座標Poisson括弧](../../SYM/SYM4/index.md#prop-sym4-coordinate-bracket)を $f=qp$、$g=p$ に適用すると、

$$
\{qp,p\}
=\frac{\partial(qp)}{\partial q}\frac{\partial p}{\partial p}
-\frac{\partial(qp)}{\partial p}\frac{\partial p}{\partial q}
=p\cdot1-q\cdot0=p.
$$

また $[D,T]=T$ は行列交換子 $DT-TD=T$ で確かめられます。[B4で導いた等式](#ex-gmech2-b04)とも合致して、左作用・同変性・Poisson括弧の符号が一つの非可換な例で揃いました。
<!-- solution-end -->
