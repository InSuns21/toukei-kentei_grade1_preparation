# SYM3 余接束の正準シンプレクティック形式

[SYM2のシンプレクティック多様体](../SYM2/index.md#def-sym2-symplectic-manifold)は、閉じた非退化2形式を持つ多様体でした。しかし具体的にその形式をどこから得るかは、球面の面積形式や座標で与えた標準形式など、例ごとに工夫が必要でした。任意の滑らかな多様体 $Q$ から、一つの座標系を選ばずに標準的なシンプレクティック多様体を作れないでしょうか。

鍵は、[余接束](../GEO2/index.md#def-geo2-cotangent-bundle)の点が「基点 $q$ と、その点で速度を実数に変える余ベクトル $p$」の組であることです。余ベクトルは、余接束上の接ベクトルを基点側へ射影すれば、自然に評価できます。その値を1形式としてまとめてから外微分するのが本章の構成です。

## 1. 余接束上の1形式は評価から生まれる

$Q$ を $n\ge1$ 次元の滑らかな実多様体とし、[余接束の滑らかな構造](../GEO2/index.md#prop-geo2-cotangent-bundle-smooth)を用います。余接束上の点を $\alpha_q\in T_q^*Q$ と書き、基点を取り出す射影を

$$
\pi:T^*Q\longrightarrow Q,\qquad \pi(\alpha_q)=q
$$

とします。$V\in T_{\alpha_q}(T^*Q)$ は余接束上の方向ですが、[写像の微分](../GEO2/index.md#def-geo2-differential) $d\pi_{\alpha_q}$ によって $d\pi_{\alpha_q}(V)\in T_qQ$ に写ります。これなら $\alpha_q$ が評価できます。

<a id="def-sym3-tautological-form"></a>

<!-- formal-statement-start -->
> **定義（Liouville 1形式・正準1形式）**  
> $Q$ を滑らかな多様体、$\pi:T^*Q\to Q$ を射影とする。$T^*Q$ 上の1形式 $\theta$ を、全ての $\alpha_q\in T^*Q$ と $V\in T_{\alpha_q}(T^*Q)$ に対して
>
> $$
> \theta_{\alpha_q}(V)=\alpha_q\bigl(d\pi_{\alpha_q}V\bigr)
> $$
>
> で定める。これを **Liouville 1形式** または **正準1形式** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym3-tautological-form -->
### 直接例：位置を動かす方向だけを読む

$Q=\mathbb R$ の座標を $q$、余接束の座標を $(q,p)$ とすると、点 $(q,p)$ は余ベクトル $p\,dq|_q$ を表します。接ベクトル

$$
V=a\,\partial_q+b\,\partial_p
$$

を射影すると $d\pi(V)=a\,\partial_q$ なので、

$$
\theta_{(q,p)}(V)=(p\,dq)(a\,\partial_q)=pa.
$$

例えば $(q,p)=(2,3)$、$V=\partial_q+5\partial_p$ では $\theta(V)=3$ です。$V=\partial_p$ なら $\theta(V)=0$。ファイバーだけを動かす方向は基点を動かさないからです。
<!-- definition-example-end -->

この定義は $Q$ の座標にも計量にも依存しません。次に、この1形式が実際に滑らかであり、座標でどう表されるかを確認します。

## 2. 座標表示と、その表示が貼り合う理由

$Q$ の局所座標を $(q^1,\ldots,q^n)$ とします。[余接束の局所自明化](../GEO2/index.md#prop-geo2-cotangent-bundle-smooth)によって

$$
\alpha_q=\sum_{i=1}^n p_i\,dq^i|_q,\qquad
(q^1,\ldots,q^n,p_1,\ldots,p_n)
$$

を $T^*Q$ の局所座標に使えます。ここで $p_i$ は単なる固定定数ではなく、余接束上の点に応じて変わる座標関数です。

<a id="prop-sym3-liouville-coordinate"></a>

<!-- formal-statement-start -->
> **命題（正準1形式の局所表示と座標不変性）**  
> $Q$ を $n$ 次元滑らかな多様体とする。[定義](#def-sym3-tautological-form)の $\theta$ は $T^*Q$ 上の滑らかな1形式であり、余接束の任意の自然な局所座標では
>
> $$
> \theta=\sum_{i=1}^n p_i\,dq^i
> $$
>
> と表される。基点の局所座標を取り替えても、異なる表示は重なり上で同じ1形式を定める。
<!-- formal-statement-end -->

### 証明の見取り図

定義に方向 $V=\sum_i a^i\partial_{q^i}+\sum_i b_i\partial_{p_i}$ を代入します。座標変換では、余ベクトルの係数に逆転置Jacobianが掛かるのと、基点の座標微分にJacobianが掛かるのとが相殺します。

<!-- proof-start -->
### 証明

局所座標で $\pi(q,p)=q$ なので、任意の $V$ に対し

$$
d\pi_{(q,p)}V=\sum_i a^i\,\partial_{q^i}.
$$

[定義](#def-sym3-tautological-form)で $\alpha_q=\sum_i p_i\,dq^i|_q$ として評価すると、

$$
\begin{aligned}
\theta_{(q,p)}(V)
&=\left(\sum_i p_i\,dq^i\right)
  \left(\sum_j a^j\,\partial_{q^j}\right)\\
&=\sum_{i,j}p_i a^j\,dq^i(\partial_{q^j})\\
&=\sum_i p_i a^i.
\end{aligned}
$$

これは $\sum_i p_i\,dq^i$ を $V$ に評価した値です。係数 $p_i$ は滑らかな座標関数なので、$\theta$ は滑らかです。

座標変換を $Q=F(q)$ と書き、$A(q)=DF_q$ とします。$\alpha_q=\sum_i p_i\,dq^i=\sum_j P_j\,dQ^j$ より、[余接座標の変換則](../GEO2/index.md#prop-geo2-cotangent-bundle-smooth)は

$$
P=A(q)^{-\mathsf T}p,\qquad dQ=A(q)\,dq
$$

です。ここで $p,P,dq,dQ$ はいずれも列ベクトル表示とします。すると

$$
\begin{aligned}
\sum_j P_j\,dQ^j
&=P^{\mathsf T}dQ\\
&=(A^{-\mathsf T}p)^{\mathsf T}A\,dq\\
&=p^{\mathsf T}A^{-1}A\,dq\\
&=p^{\mathsf T}dq
=\sum_i p_i\,dq^i.
\end{aligned}
$$

$DF_q$ が可逆なのは、重なりの座標変換が微分同相だからです。よって表示は重なり上で一致し、最初に与えた座標を忘れても同じ1形式です。
<!-- proof-end -->

**何が解決したか。** $q$ の新しい座標を選ぶと $p$ も変換されます。$p$ だけ、または $q$ だけを変換していたら正準1形式の式は一般に保たれません。余ベクトルの変換則そのものが、両者の積を不変にしています。

### 二次元の非線形な座標交換を検算する

$Q=\mathbb R^2$ で、位置座標を

$$
Q^1=q^1,\qquad Q^2=q^2+(q^1)^2
$$

と変えると、Jacobianと逆転置は

$$
A=\begin{pmatrix}1&0\\2q^1&1\end{pmatrix},
\qquad
A^{-\mathsf T}
=\begin{pmatrix}1&-2q^1\\0&1\end{pmatrix}.
$$

従って $P_1=p_1-2q^1p_2$、$P_2=p_2$ です。このとき

$$
\begin{aligned}
P_1\,dQ^1+P_2\,dQ^2
&=(p_1-2q^1p_2)\,dq^1
+p_2(dq^2+2q^1\,dq^1)\\
&=p_1\,dq^1+p_2\,dq^2.
\end{aligned}
$$

係数の補正項がぴったり相殺することが見えます。

## 3. 外微分の符号を決めて標準形式を得る

Liouville 1形式を外微分すると自然に2形式が得られます。ただし力学で使う標準形と符号を合わせるため、ここでは負号を付けます。

<a id="def-sym3-canonical-form"></a>

<!-- formal-statement-start -->
> **定義（余接束の正準2形式）**  
> $Q$ を滑らかな多様体、$\theta$ を[正準1形式](#def-sym3-tautological-form)とする。この章では
>
> $$
> \omega_{\mathrm{can}}=-d\theta
> $$
>
> を $T^*Q$ 上の **正準2形式** と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym3-canonical-form -->
### 直接例：一自由度の位置と運動量

$Q=\mathbb R$ なら $\theta=p\,dq$ です。[外微分の次数付きLeibniz則](../GEO7/index.md#thm-geo7-graded-leibniz)と $d(dq)=0$ を使うと

$$
-d(p\,dq)=-dp\wedge dq=dq\wedge dp.
$$

従って $\omega_{\mathrm{can}}(\partial_q,\partial_p)=1$、$\omega_{\mathrm{can}}(\partial_p,\partial_q)=-1$ であり、[SYM2の平面標準形式](../SYM2/index.md#def-sym2-symplectic-manifold)と一致します。
<!-- definition-example-end -->

<a id="thm-sym3-cotangent-symplectic"></a>

<!-- formal-statement-start -->
> **定理（余接束の正準シンプレクティック形式）**  
> $Q$ を $n\ge1$ 次元滑らかな実多様体とする。$\omega_{\mathrm{can}}=-d\theta$ は $T^*Q$ 上のシンプレクティック形式である。余接束の局所座標 $(q^1,\ldots,q^n,p_1,\ldots,p_n)$ では
>
> $$
> \omega_{\mathrm{can}}=\sum_{i=1}^n dq^i\wedge dp_i.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

外微分を二回取れば閉性が出ます。非退化性は各接空間で、位置方向とファイバー方向が互いを検出することを確認します。これは[SYM1の標準交代行列](../SYM1/index.md#thm-sym1-linear-normal-form)が現れる計算です。

<!-- proof-start -->
### 証明

[正準1形式の局所表示](#prop-sym3-liouville-coordinate)と[外微分のLeibniz則](../GEO7/index.md#thm-geo7-graded-leibniz)を使うと

$$
\begin{aligned}
d\theta
&=\sum_i d(p_i\,dq^i)\\
&=\sum_i \bigl(dp_i\wedge dq^i+p_i\,d(dq^i)\bigr)\\
&=\sum_i dp_i\wedge dq^i.
\end{aligned}
$$

ここで $d(dq^i)=d^2q^i=0$ には[外微分の二乗零](../GEO7/index.md#thm-geo7-d-square-zero)を適用しました。2形式の交代性から負号を入れ替えて

$$
\omega_{\mathrm{can}}=-d\theta
=\sum_i dq^i\wedge dp_i
$$

を得ます。閉性は同じ[二乗零の定理](../GEO7/index.md#thm-geo7-d-square-zero)に、滑らかな1形式 $\theta$ を代入して

$$
d\omega_{\mathrm{can}}=-d(d\theta)=0
$$

です。次に任意の点の接ベクトルを

$$
U=\sum_i (a_i\partial_{q^i}+b_i\partial_{p_i}),
\qquad
V=\sum_i (c_i\partial_{q^i}+e_i\partial_{p_i})
$$

と置くと、外積の評価式より

$$
\omega_{\mathrm{can}}(U,V)
=\sum_i(a_i e_i-b_i c_i).
$$

$U$ が全ての $V$ と組にして零なら、順に $V=\partial_{p_j}$、$V=\partial_{q^j}$ を選んで

$$
a_j=\omega_{\mathrm{can}}(U,\partial_{p_j})=0,\qquad
-b_j=\omega_{\mathrm{can}}(U,\partial_{q^j})=0
$$

を全ての $j$ について得ます。従って $U=0$ であり、非退化です。閉性と非退化性が揃ったので、[シンプレクティック多様体の定義](../SYM2/index.md#def-sym2-symplectic-manifold)を満たします。
<!-- proof-end -->

座標順 $(q^1,\ldots,q^n,p_1,\ldots,p_n)$ に対する係数行列は

$$
J=\begin{pmatrix}0&I_n\\-I_n&0\end{pmatrix},
\qquad J^2=-I_{2n}.
$$

特別な多様体から出発しなくても、$T^*Q$ は必ず偶数次元のシンプレクティック多様体になります。

## 4. 零切断とファイバーが消すもの

余接束には、各点で零の余ベクトルを選ぶ写像 $s_0:Q\to T^*Q$ があります。これは**零切断**であり、$\pi\circ s_0=\mathrm{id}_Q$ です。零切断は自然な $Q$ のコピーですが、正準形式がそこにどのように制限されるかを計算してみます。

<a id="prop-sym3-zero-section-fibers"></a>

<!-- formal-statement-start -->
> **命題（零切断とファイバーでの消失）**  
> $Q$ を滑らかな多様体とし、$s_0$ を零切断とする。このとき
>
> $$
> s_0^*\theta=0,\qquad s_0^*\omega_{\mathrm{can}}=0.
> $$
>
> また各 $q\in Q$ における包含 $i_q:T_q^*Q\hookrightarrow T^*Q$ について $i_q^*\theta=0$、$i_q^*\omega_{\mathrm{can}}=0$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

零切断上は余ベクトルそのものが零であり、ファイバー上は基点が動きません。どちらも正準1形式の評価式へ直接代入できます。2形式については外微分と引き戻しを交換します。

<!-- proof-start -->
### 証明

$q\in Q$、$u\in T_qQ$ に対し、[正準1形式の定義](#def-sym3-tautological-form)から

$$
(s_0^*\theta)_q(u)
=\theta_{0_q}(ds_0(u))
=0_q(d\pi_{0_q}(ds_0(u)))=0.
$$

よって $s_0^*\theta=0$ です。[引き戻しと外微分の可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を写像 $s_0$ と1形式 $\theta$ に適用すると

$$
s_0^*\omega_{\mathrm{can}}
=-s_0^*(d\theta)
=-d(s_0^*\theta)
=0.
$$

次にファイバーに制限した $\pi\circ i_q$ は定数写像です。$w\in T_{\alpha_q}(T_q^*Q)$ に対し、合成の微分公式から

$$
d\pi_{\alpha_q}(di_q(w))
=d(\pi\circ i_q)_{\alpha_q}(w)=0.
$$

従って $(i_q^*\theta)_{\alpha_q}(w)=\alpha_q(0)=0$ です。上と同じ[引き戻しと外微分の可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を $i_q$ に適用し、$i_q^*\omega_{\mathrm{can}}=0$ も得られます。
<!-- proof-end -->

零切断も各ファイバーも、余接束全体の次元 $2n$ に対して次元 $n$ です。正準形式は各々の接方向だけを二つ入れると零ですが、位置方向とファイバー方向を組にすれば非零になり得ます。後のLagrange部分多様体の基本例になる事実です。

## 5. 座標変換を余接束全体へ持ち上げる

座標の交換に限らず、二つの多様体の間の微分同相を考えます。基点の写像 $f:Q\to R$ に沿って余ベクトルを運ぶには、行き先 $r=f(q)$ の接ベクトルを $df_q^{-1}$ で元の接空間へ戻してから、元の余ベクトルに評価させればよいわけです。

<a id="def-sym3-cotangent-lift"></a>

<!-- formal-statement-start -->
> **定義（余接持ち上げ）**  
> $f:Q\to R$ を滑らかな微分同相とする。$f$ の **余接持ち上げ** $\widehat f:T^*Q\to T^*R$ を
>
> $$
> \widehat f(\alpha_q)
> =\alpha_q\circ (df_q)^{-1}\in T_{f(q)}^*R
> $$
>
> で定める。従って $\pi_R\circ\widehat f=f\circ\pi_Q$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym3-cotangent-lift -->
### 直接例：拡大する位置と縮小する運動量

$Q=R=\mathbb R$、$f(q)=2q$ とします。$df_q$ は接ベクトルを2倍するので、$\widehat f(q,p)=(2q,p/2)$ です。従って出力座標 $(Q,P)$ で

$$
P\,dQ=(p/2)\,d(2q)=p\,dq.
$$

基点を2倍したのに運動量も2倍してしまう写像では、この関係は成り立ちません。
<!-- definition-example-end -->

<a id="thm-sym3-cotangent-lift-preserves"></a>

<!-- formal-statement-start -->
> **定理（余接持ち上げは正準1形式を保存する）**  
> $f:Q\to R$ が滑らかな微分同相なら、$\widehat f:T^*Q\to T^*R$ は滑らかな微分同相であり、
>
> $$
> \widehat f^{\,*}\theta_R=\theta_Q,\qquad
> \widehat f^{\,*}\omega_R=\omega_Q
> $$
>
> を満たす。ここで $\theta_Q,\theta_R$ および $\omega_Q=-d\theta_Q,\omega_R=-d\theta_R$ はそれぞれの余接束上の正準形式である。
<!-- formal-statement-end -->

### 証明の見取り図

まず基点に対する可換関係を微分して、$d\pi_R\circ d\widehat f=df\circ d\pi_Q$ を得ます。余ベクトルを運ぶ際の $(df)^{-1}$ が、右辺の $df$ を打ち消します。最後に外微分を取ります。

<!-- proof-start -->
### 証明

$df_q$ は線形同型なので定義は各点で一意です。局所座標で $Q=f(q)$ と書くと

$$
(q,p)\longmapsto
\left(f(q),(Df_q)^{-\mathsf T}p\right)
$$

であり、[余接束の局所自明化](../GEO2/index.md#prop-geo2-cotangent-bundle-smooth)と同じ構成なので滑らかです。$f^{-1}$ の余接持ち上げが逆写像です。実際、$r=f(q)$ で $(df^{-1}_r)^{-1}=df_q$ だから

$$
\widehat{f^{-1}}\bigl(\widehat f(\alpha_q)\bigr)
=(\alpha_q\circ(df_q)^{-1})\circ df_q
=\alpha_q.
$$

逆向きも同様に合成が恒等写像になります。

次に $\alpha_q\in T^*Q$ と $V\in T_{\alpha_q}(T^*Q)$ を固定し、$\beta_{f(q)}=\widehat f(\alpha_q)$ と置きます。[合成写像の微分公式](../GEO2/index.md#thm-geo2-composition-differential)を $\pi_R\circ\widehat f=f\circ\pi_Q$ に適用すると

$$
d\pi_R|_{\beta}\circ d\widehat f|_{\alpha}
=df_q\circ d\pi_Q|_{\alpha}
$$

です。そこで[正準1形式の定義](#def-sym3-tautological-form)を $R$ 側に用い、

$$
\begin{aligned}
(\widehat f^{\,*}\theta_R)_{\alpha}(V)
&=(\theta_R)_{\beta}(d\widehat f_{\alpha}V)\\
&=\beta\bigl(d\pi_R|_{\beta}(d\widehat f_{\alpha}V)\bigr)\\
&=(\alpha\circ(df_q)^{-1})
  \bigl(df_q(d\pi_Q|_{\alpha}V)\bigr)\\
&=\alpha(d\pi_Q|_{\alpha}V)
=(\theta_Q)_{\alpha}(V).
\end{aligned}
$$

全点・全方向で等しいため $\widehat f^{\,*}\theta_R=\theta_Q$ です。さらに[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を写像 $\widehat f$、1形式 $\theta_R$ に適用して

$$
\begin{aligned}
\widehat f^{\,*}\omega_R
&=-\widehat f^{\,*}(d\theta_R)\\
&=-d(\widehat f^{\,*}\theta_R)\\
&=-d\theta_Q=\omega_Q.
\end{aligned}
$$

従って[シンプレクティック微分同相の定義](../SYM2/index.md#def-sym2-symplectomorphism)も満たします。
<!-- proof-end -->

### 持ち上げと合成

<a id="prop-sym3-lift-composition"></a>

<!-- formal-statement-start -->
> **命題（余接持ち上げの合成則）**  
> 微分同相 $f:Q\to R$、$g:R\to S$ に対し、
>
> $$
> \widehat{g\circ f}=\widehat g\circ\widehat f,\qquad
> \widehat{\mathrm{id}_Q}=\mathrm{id}_{T^*Q}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

両辺を一つの余ベクトルに評価し、合成の微分を逆から掛ける順序に注意します。

<!-- proof-start -->
### 証明

$q\in Q$、$\alpha_q\in T_q^*Q$ を取ります。[合成写像の微分公式](../GEO2/index.md#thm-geo2-composition-differential)から

$$
d(g\circ f)_q=dg_{f(q)}\circ df_q
$$

です。両写像は微分同相なので逆写像は

$$
(d(g\circ f)_q)^{-1}
=(df_q)^{-1}\circ(dg_{f(q)})^{-1}.
$$

これを[余接持ち上げの定義](#def-sym3-cotangent-lift)に代入すると

$$
\begin{aligned}
\widehat{g\circ f}(\alpha_q)
&=\alpha_q\circ(d(g\circ f)_q)^{-1}\\
&=(\alpha_q\circ(df_q)^{-1})
  \circ(dg_{f(q)})^{-1}\\
&=\widehat g(\widehat f(\alpha_q)).
\end{aligned}
$$

恒等写像の微分は恒等線形写像なので、その余接持ち上げも恒等写像です。
<!-- proof-end -->

## 6. ファイバー平行移動と閉1形式

余接持ち上げは基点を別の点へ写しました。今度は基点を変えず、各余ベクトルに固定された1形式 $\sigma$ を足してみます。$\sigma$ が閉じているかどうかが、正準2形式の保存を決めます。

<a id="def-sym3-fiber-translation"></a>

<!-- formal-statement-start -->
> **定義（1形式によるファイバー平行移動）**  
> $Q$ 上の滑らかな1形式 $\sigma$ に対し、
>
> $$
> T_\sigma:T^*Q\to T^*Q,\qquad
> T_\sigma(\alpha_q)=\alpha_q+\sigma_q
> $$
>
> と定める。$T_{-\sigma}$ がその滑らかな逆写像である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym3-fiber-translation -->
### 直接例：運動量を位置でずらす

$Q=\mathbb R$、$\sigma=2q\,dq$ なら $T_\sigma(q,p)=(q,p+2q)$ です。点 $(1,3)$ は $(1,5)$ へ移り、基点 $q=1$ は変わりません。
<!-- definition-example-end -->

<a id="thm-sym3-translation-criterion"></a>

<!-- formal-statement-start -->
> **定理（平行移動が正準形式を保存する条件）**  
> $Q$ を滑らかな多様体、$\sigma\in\Omega^1(Q)$ とする。このとき
>
> $$
> T_\sigma^*\theta=\theta+\pi^*\sigma,\qquad
> T_\sigma^*\omega_{\mathrm{can}}
> =\omega_{\mathrm{can}}-\pi^*(d\sigma).
> $$
>
> 従って $T_\sigma$ がシンプレクティック微分同相となる必要十分条件は $d\sigma=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

基点を変えない関係 $\pi\circ T_\sigma=\pi$ を微分し、評価する余ベクトルが $\sigma_q$ だけ増えることを確認します。逆向きの必要性では、射影の引き戻しが零なら零切断で引き戻して元の形式も零だと示します。

<!-- proof-start -->
### 証明

$T_\sigma$ は局所座標で $(q,p)\mapsto(q,p+\sigma(q))$ なので滑らかで逆写像 $T_{-\sigma}$ を持ちます。$\alpha_q$ と $V$ に対して $\pi\circ T_\sigma=\pi$ の微分を使うと

$$
\begin{aligned}
(T_\sigma^*\theta)_{\alpha_q}(V)
&=\theta_{\alpha_q+\sigma_q}(dT_\sigma V)\\
&=(\alpha_q+\sigma_q)
  \bigl(d\pi_{\alpha_q+\sigma_q}(dT_\sigma V)\bigr)\\
&=(\alpha_q+\sigma_q)(d\pi_{\alpha_q}V)\\
&=\theta_{\alpha_q}(V)+(\pi^*\sigma)_{\alpha_q}(V).
\end{aligned}
$$

ここで最後の項には[1形式の引き戻し](../GEO7/index.md#def-geo7-pullback-form)を適用しました。よって最初の等式が成立します。[外微分と引き戻しの可換性](../GEO7/index.md#thm-geo7-pullback-commutes-d)を $T_\sigma$ と $\pi$ に順に用いて

$$
\begin{aligned}
T_\sigma^*\omega_{\mathrm{can}}
&=-d(T_\sigma^*\theta)\\
&=-d(\theta+\pi^*\sigma)\\
&=-d\theta-\pi^*(d\sigma)\\
&=\omega_{\mathrm{can}}-\pi^*(d\sigma)
\end{aligned}
$$

を得ます。$d\sigma=0$ なら保存します。逆に保存すれば $\pi^*(d\sigma)=0$ です。[零切断](#prop-sym3-zero-section-fibers)には $\pi\circ s_0=\mathrm{id}_Q$ があるので

$$
0=s_0^*(\pi^*(d\sigma))
=(\pi\circ s_0)^*(d\sigma)
=d\sigma.
$$

従って同値が証明されました。
<!-- proof-end -->

$\sigma=dh$ のときは[外微分の二乗零](../GEO7/index.md#thm-geo7-d-square-zero)から $d\sigma=d^2h=0$ なので、平行移動は常に正準2形式を保ちます。しかし正準1形式は一般に変化し、$T_{dh}^*\theta=\theta+\pi^*(dh)$ です。**2形式を保つことと1形式を完全に保つことは異なります。**

## 7. 円周にも大域的な正準形式がある

$Q=S^1$ 上には一般に全域で一つの角度座標を置けません。しかし [SYM2で使った円周上の1形式](../SYM2/index.md#prop-sym2-product-and-sign) の具体式 $\alpha=x\,dy-y\,dx$ は、接ベクトル $e=(-y,x)$ に対して $\alpha(e)=1$ を満たす滑らかな1形式です。各 $\beta_x\in T_x^*S^1$ を一意に $\beta_x=p\alpha_x$ と書けば、$(x,p)\in S^1\times\mathbb R$ を $T^*S^1$ の大域表示として使えます。

この表示で射影は $(x,p)\mapsto x$ なので、[正準1形式の定義](#def-sym3-tautological-form)から

$$
\theta=p\,\pi^*\alpha
$$

です。$S^1$ は一次元なので $d\alpha=0$。従って

$$
\begin{aligned}
\omega_{\mathrm{can}}
&=-d(p\,\pi^*\alpha)\\
&=-dp\wedge\pi^*\alpha-p\,\pi^*(d\alpha)\\
&=\pi^*\alpha\wedge dp.
\end{aligned}
$$

接方向 $(e,0)$ とファイバー方向 $\partial_p$ に評価すると $\omega_{\mathrm{can}}((e,0),\partial_p)=1$ です。これは大域的に非退化な形式で、局所角 $\varphi$ を選んだ場所では $\alpha=d\varphi$ から $\omega_{\mathrm{can}}=d\varphi\wedge dp$ に戻ります。大域座標がなくても正準形式は失われません。

## 8. 演習：評価、符号、座標変換、保存性を自力で再現する

### Level A：定義と符号を手で確かめる

#### A1. 正準1形式の評価

$T^*\mathbb R$ の点 $(q,p)=(2,3)$ で $V=2\partial_q+5\partial_p$ とする。$\theta(V)$ と $\omega_{\mathrm{can}}(V,\partial_p)$ を求めよ。

- Level: A
- ID: SYM3-A1

<!-- solution-start -->
**詳細解答**　[正準1形式の局所表示](#prop-sym3-liouville-coordinate)は $\theta=p\,dq$ ですから、

$$
\theta(V)=3\,dq(2\partial_q+5\partial_p)=3\cdot2=6.
$$

[正準2形式の定理](#thm-sym3-cotangent-symplectic)から $\omega_{\mathrm{can}}=dq\wedge dp$ であり、

$$
\begin{aligned}
\omega_{\mathrm{can}}(V,\partial_p)
&=dq(V)\,dp(\partial_p)-dp(V)\,dq(\partial_p)\\
&=2\cdot1-5\cdot0=2.
\end{aligned}
$$

二つの形式の次数が違うため、同じ接ベクトルから異なる値を返します。
<!-- solution-end -->

#### A2. 線形座標変換の相殺

$\mathbb R$ 上の座標交換 $Q=4q$ に対し、余接座標 $P$ を $p$ で表し、$P\,dQ=p\,dq$ を示せ。

- Level: A
- ID: SYM3-A2

<!-- solution-start -->
**詳細解答**　$dQ=4\,dq$ で、共変ベクトルの等式 $p\,dq=P\,dQ$ より $p=4P$ です。従って $P=p/4$ となり、

$$
P\,dQ=\frac p4(4\,dq)=p\,dq
$$

が成立します。これは[正準1形式の座標不変性](#prop-sym3-liouville-coordinate)の一次元の検算です。
<!-- solution-end -->

#### A3. 標準形式の核

$T^*\mathbb R^2$ で $\omega=dq^1\wedge dp_1+dq^2\wedge dp_2$ とする。$U=a_1\partial_{q^1}+a_2\partial_{q^2}+b_1\partial_{p_1}+b_2\partial_{p_2}$ が全ての相手と組にして零なら $U=0$ と示せ。

- Level: A
- ID: SYM3-A3

<!-- solution-start -->
**詳細解答**　[正準形式の評価式](#thm-sym3-cotangent-symplectic)を使い、相手を基底に限定して十分です。

$$
\begin{aligned}
\omega(U,\partial_{p_1})&=a_1,&
\omega(U,\partial_{p_2})&=a_2,\\
\omega(U,\partial_{q^1})&=-b_1,&
\omega(U,\partial_{q^2})&=-b_2.
\end{aligned}
$$

全て零なら $a_1=a_2=b_1=b_2=0$ です。従って核は零で、非退化です。
<!-- solution-end -->

#### A4. 零切断では消える

$Q=\mathbb R$ で $s_0(q)=(q,0)$ とする。$s_0^*\theta$ と $s_0^*\omega_{\mathrm{can}}$ を直接座標で求めよ。

- Level: A
- ID: SYM3-A4

<!-- solution-start -->
**詳細解答**　$T^*\mathbb R$ では $\theta=p\,dq$、$\omega_{\mathrm{can}}=dq\wedge dp$ です。合成 $p\circ s_0=0$ なので

$$
s_0^*\theta=(p\circ s_0)\,d(q\circ s_0)=0\,dq=0.
$$

一方 $p\circ s_0=0$ を微分して $s_0^*dp=d(p\circ s_0)=0$ とするか、[引き戻しの外積との可換性](../GEO7/index.md#prop-geo7-pullback-wedge)を適用して

$$
s_0^*(dq\wedge dp)
=dq\wedge d0=0
$$

と求めます。
<!-- solution-end -->

#### A5. 余接持ち上げのスケーリング

$f:\mathbb R\to\mathbb R$ を $f(q)=3q$ とする。$\widehat f$ とその逆を求め、$\theta$ が保存されることを示せ。

- Level: A
- ID: SYM3-A5

<!-- solution-start -->
**詳細解答**　$df_q$ は3倍の線形写像なので、[余接持ち上げの定義](#def-sym3-cotangent-lift)から

$$
\widehat f(q,p)=(3q,p/3),\qquad
\widehat f^{-1}(Q,P)=(Q/3,3P)
$$

です。後者を前者に代入すると $(q,p)$ に戻り、微分同相です。$\theta$ の引き戻しは

$$
\widehat f^*(P\,dQ)
=\frac p3\,d(3q)
=p\,dq=\theta
$$

となります。
<!-- solution-end -->

### Level B：変換の核心を検算する

#### B1. 非線形な余接持ち上げ

$f:\mathbb R\to\mathbb R$、$f(q)=q+q^3$ とする。$f$ が微分同相であることを示し、$\widehat f$ を求め、局所座標で $\omega_{\mathrm{can}}$ を保存することを計算せよ。

- Level: B
- ID: SYM3-B1

<!-- solution-start -->
**詳細解答**　$f'(q)=1+3q^2>0$ なので $f$ は狭義単調増加です。さらに $q\to\pm\infty$ で $f(q)\to\pm\infty$ だから全単射であり、導関数が零にならないため局所逆写像は滑らかで、それらが大域的な滑らかな逆写像になります。

$D(q)=1+3q^2$ と置くと[余接持ち上げの定義](#def-sym3-cotangent-lift)から

$$
Q=q+q^3,\qquad P=\frac p{D(q)}.
$$

微分は積と商の規則から

$$
dQ=D\,dq,\qquad
dP=\frac1D\,dp-\frac{6qp}{D^2}\,dq
$$

です。よって

$$
\begin{aligned}
\widehat f^*(dQ\wedge dP)
&=D\,dq\wedge\left(\frac1D\,dp-\frac{6qp}{D^2}\,dq\right)\\
&=dq\wedge dp-\frac{6qp}{D}\,dq\wedge dq\\
&=dq\wedge dp
\end{aligned}
$$

となり、保存を確認できます。
<!-- solution-end -->

#### B2. 閉じた1形式と閉じない1形式

$Q=\mathbb R^2$ で $\sigma=q^1\,dq^2+q^2\,dq^1$、$\tau=q^1\,dq^2$ とする。$T_\sigma$ と $T_\tau$ の座標式を求め、正準2形式を保存するか調べよ。

- Level: B
- ID: SYM3-B2

<!-- solution-start -->
**詳細解答**　定義から

$$
\begin{aligned}
T_\sigma(q^1,q^2,p_1,p_2)
&=(q^1,q^2,p_1+q^2,p_2+q^1),\\
T_\tau(q^1,q^2,p_1,p_2)
&=(q^1,q^2,p_1,p_2+q^1).
\end{aligned}
$$

[外微分の定義](../GEO7/index.md#def-geo7-exterior-derivative)により

$$
\begin{aligned}
d\sigma
&=dq^1\wedge dq^2+dq^2\wedge dq^1=0,\\
d\tau&=dq^1\wedge dq^2\ne0.
\end{aligned}
$$

[平行移動の保存判定](#thm-sym3-translation-criterion)に代入して

$$
T_\sigma^*\omega_{\mathrm{can}}=\omega_{\mathrm{can}},\qquad
T_\tau^*\omega_{\mathrm{can}}
=\omega_{\mathrm{can}}-dq^1\wedge dq^2
$$

です。後者は例えば $(\partial_{q^1},\partial_{q^2})$ に評価すると元の形式が0、変換後が$-1$となるため、保存しません。
<!-- solution-end -->

#### B3. 合成則を具体的に確認する

$f(q)=2q$、$g(r)=r+1$ を $\mathbb R$ 上の微分同相とする。それぞれの余接持ち上げを求め、$\widehat{g\circ f}=\widehat g\circ\widehat f$ を確認せよ。

- Level: B
- ID: SYM3-B3

<!-- solution-start -->
**詳細解答**　$df_q=2$、$dg_r=1$ なので[余接持ち上げの定義](#def-sym3-cotangent-lift)より

$$
\widehat f(q,p)=(2q,p/2),\qquad
\widehat g(r,s)=(r+1,s).
$$

従って右辺は

$$
(\widehat g\circ\widehat f)(q,p)=(2q+1,p/2)
$$

です。一方 $(g\circ f)(q)=2q+1$ なので微分は2、ゆえに $\widehat{g\circ f}(q,p)=(2q+1,p/2)$。両辺の基点と余ベクトル成分が一致し、[合成則](#prop-sym3-lift-composition)を確認しました。
<!-- solution-end -->

#### B4. 円周の正準形式

$S^1=\{(x,y):x^2+y^2=1\}$ で $\alpha=x\,dy-y\,dx$ とし、$T^*S^1$ を $(x,p)$、余ベクトル $p\alpha_x$ で表す。$\theta$、$\omega_{\mathrm{can}}$ を求め、非退化性を接方向とファイバー方向で判定せよ。

- Level: B
- ID: SYM3-B4

<!-- solution-start -->
**詳細解答**　$x=(x,y)$ の接ベクトル $e=(-y,x)$ に対し

$$
\alpha_x(e)=x\cdot x-y\cdot(-y)=x^2+y^2=1.
$$

よって $\alpha_x$ は一次元の余接空間の基底で、全ての余ベクトルを一意に $p\alpha_x$ と書けます。[正準1形式の定義](#def-sym3-tautological-form)から $\theta=p\,\pi^*\alpha$。円周は一次元だから $d\alpha=0$、よって

$$
\begin{aligned}
\omega_{\mathrm{can}}
&=-d(p\,\pi^*\alpha)\\
&=-dp\wedge\pi^*\alpha
=\pi^*\alpha\wedge dp.
\end{aligned}
$$

ここで $(e,0)$ は基点方向、$\partial_p$ はファイバー方向なので

$$
\omega_{\mathrm{can}}((e,0),\partial_p)
=\alpha(e)\,dp(\partial_p)=1.
$$

この二方向は各点の接空間の基底ですから、交代形式の係数行列は $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、行列式1で非退化です。
<!-- solution-end -->

### Level C：二種類の保存変換を接続する

#### C1. 非線形持ち上げとファイバー平行移動

$Q=R=\mathbb R^2$ とし、$f(q^1,q^2)=(Q^1,Q^2)=(q^1,q^2+(q^1)^2)$ とする。行き先の1形式を $\sigma=d(Q^1Q^2)$ とし、$F=T_\sigma\circ\widehat f:T^*Q\to T^*R$ を考える。

1. $f$ の逆と $\widehat f$ の座標式を求めよ。
2. $F$ の座標式を求め、$F^*\theta_R=\theta_Q+\pi_Q^*d((Q^1Q^2)\circ f)$ を計算で示せ。
3. $F$ がシンプレクティック微分同相であることを、2形式の引き戻しから示せ。
4. $\sigma$ を $\tau=Q^1\,dQ^2$ に置き換えた $G=T_\tau\circ\widehat f$ はシンプレクティックか。保存が破れる2形式を明示せよ。

- Level: C
- ID: SYM3-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$Q^1=q^1$ から $q^1=Q^1$、$Q^2=q^2+(q^1)^2$ から $q^2=Q^2-(Q^1)^2$ です。逆写像は多項式なので滑らかです。Jacobian と逆転置は

$$
Df_q=\begin{pmatrix}1&0\\2q^1&1\end{pmatrix},
\qquad
(Df_q)^{-\mathsf T}
=\begin{pmatrix}1&-2q^1\\0&1\end{pmatrix}.
$$

従って[余接持ち上げの定義](#def-sym3-cotangent-lift)より

$$
\widehat f(q^1,q^2,p_1,p_2)
=(q^1,q^2+(q^1)^2,p_1-2q^1p_2,p_2).
$$

**(2)**　$\sigma=d(Q^1Q^2)=Q^2\,dQ^1+Q^1\,dQ^2$ だから、運動量成分への加算は $(Q^2,Q^1)$ です。$F$ の出力を $(Q^1,Q^2,P_1,P_2)$ とすると

$$
\begin{aligned}
Q^1&=q^1,&
Q^2&=q^2+(q^1)^2,\\
P_1&=p_1-2q^1p_2+q^2+(q^1)^2,&
P_2&=p_2+q^1.
\end{aligned}
$$

[正準1形式の局所表示](#prop-sym3-liouville-coordinate)を使い、

$$
\begin{aligned}
F^*\theta_R
&=P_1\,dQ^1+P_2\,dQ^2\\
&=(p_1-2q^1p_2+q^2+(q^1)^2)\,dq^1\\
&\quad +(p_2+q^1)(dq^2+2q^1\,dq^1)\\
&=p_1\,dq^1+p_2\,dq^2\\
&\quad +(q^2+3(q^1)^2)\,dq^1+q^1\,dq^2.
\end{aligned}
$$

一方 $(Q^1Q^2)\circ f=q^1q^2+(q^1)^3$ だから

$$
d((Q^1Q^2)\circ f)
=(q^2+3(q^1)^2)\,dq^1+q^1\,dq^2.
$$

二式を比較して $F^*\theta_R=\theta_Q+\pi_Q^*d((Q^1Q^2)\circ f)$ を確認しました。$\pi_Q^*$ は基点の形式を余接束に引き上げる記号です。

**(3)**　$f$ は微分同相、$\widehat f$ は[余接持ち上げの保存定理](#thm-sym3-cotangent-lift-preserves)により微分同相です。$T_\sigma$ も滑らかな逆写像 $T_{-\sigma}$ を持ちます。外微分と引き戻しを交換し、$d^2=0$ を使うと

$$
\begin{aligned}
F^*\omega_R
&=-d(F^*\theta_R)\\
&=-d\theta_Q-d^2((Q^1Q^2)\circ f)\\
&=\omega_Q.
\end{aligned}
$$

これは[シンプレクティック微分同相の定義](../SYM2/index.md#def-sym2-symplectomorphism)を満たします。

**(4)**　$\tau=Q^1\,dQ^2$ では

$$
d\tau=dQ^1\wedge dQ^2\ne0.
$$

[平行移動の保存判定](#thm-sym3-translation-criterion)と[余接持ち上げの保存定理](#thm-sym3-cotangent-lift-preserves)から

$$
\begin{aligned}
G^*\omega_R
&=\widehat f^{\,*}(T_\tau^*\omega_R)\\
&=\widehat f^{\,*}(\omega_R-\pi_R^*d\tau)\\
&=\omega_Q-\pi_Q^*(f^*d\tau).
\end{aligned}
$$

ここで $f^*(dQ^1\wedge dQ^2)=dq^1\wedge(dq^2+2q^1\,dq^1)=dq^1\wedge dq^2$ なので

$$
G^*\omega_R=\omega_Q-dq^1\wedge dq^2\ne\omega_Q.
$$

例えば二つの位置方向 $(\partial_{q^1},\partial_{q^2})$ に評価すると、右辺の補正は $-1$ です。破れた仮定は $d\tau=0$ であり、2形式の保存に余計な基点方向の項が残ります。
<!-- solution-end -->

## 9. 次章への橋

余接束では、点ごとの余ベクトルの評価だけで正準1形式を作り、外微分から閉じた非退化2形式を得られました。余接持ち上げは正準1形式まで保ち、閉1形式による平行移動は正準2形式を保ちます。同じ「形式の保存」でも強さは異なります。

次のSYM4では、シンプレクティック形式を使って関数 $H$ にベクトル場を対応させます。ここでの符号 $\omega_{\mathrm{can}}=dq\wedge dp$ と $\iota_{X_H}\omega=dH$ の組み合わせから、通常のHamilton方程式が現れます。
