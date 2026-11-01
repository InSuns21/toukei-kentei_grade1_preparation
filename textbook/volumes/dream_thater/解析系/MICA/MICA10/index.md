# MICA10 特異性の伝播

[MICA9の特性方向への制限](../MICA9/index.md#prop-mica9-wavefront-confinement)は、$Pu$ が滑らかなら $WF(u)$ は特性集合内にある、と述べます。しかし特性集合上の点を勝手に間引いても、この包含自体には反しません。波動の特異点が途中で突然消えたり生まれたりしないことを示すには、方程式の別の情報が必要です。

本章では、まず $1+1$ 次元の波を厳密に解き、次に周波数方向を選択する擬微分作用素で局所エネルギーを測ります。この**正交換子法**が、一般の実主型作用素における伝播定理の中核です。証明は局所的です。境界での反射、交差する複数特性、右辺そのものが特異な点を無条件には含みません。

以下で $X$ は境界のない滑らかな多様体、$u\in\mathcal D'(X)$ とします。局所座標 $(x,\xi)$ の微分記号は $D=-i\partial$、Fourier変換は $\widehat f(\xi)=\int e^{-ix\cdot\xi}f(x)\,dx$ とします。$\Psi^m$、主シンボル、楕円方向、波面集合は[MICA8の擬微分作用素](../MICA8/index.md#def-mica8-psi)と[MICA3の波面集合](../MICA3/index.md#def-mica3-wavefront)を使います。作用素の局所化では、核を対角付近に制限した **properly supported** なものを取り、コンパクト集合上の議論に帰着します。

## 1. まず平坦な波は本当に光線に沿う

$P=\partial_t^2-\partial_x^2$ を $\mathbb R^{1+1}$ 上で考えます。新変数 $r=x-t$、$s=x+t$ を導入すると、連鎖律より

$$
\partial_t=-\partial_r+\partial_s,\qquad
\partial_x=\partial_r+\partial_s,\qquad
P=-4\partial_r\partial_s.
$$

$Pu=0$ は分布として $\partial_r\partial_su=0$ と同値です。$\partial_r(\partial_su)=0$ なら $\partial_su$ は $s$ だけに依存します。局所的にその分布の原始関数 $g(s)$ を選び、$\partial_s(u-g(s))=0$ を積分すると

$$
u(t,x)=f(x-t)+g(x+t)
$$

を得ます。分布の原始関数は試験関数を積分して構成でき、積分定数は他方の変数の分布に吸収されます。従ってここで $f,g$ が通常の関数である必要はありません。$f$ は右向き、$g$ は左向きの波です。

例えば $u=\delta(x-t)$ は $f=\delta,g=0$ の解です。[MICA5の部分多様体デルタの波面集合](../MICA5/index.md#thm-mica5-submanifold-delta)を使うと、その波面集合は

$$
WF(u)=\{(t,x;\tau,\kappa):x=t,\ (\tau,\kappa)=\lambda(-1,1),\ \lambda\ne0\}.
$$

$D$ 規約の主シンボルは $p=-\tau^2+\kappa^2$ で、[MICA9のHamilton方程式](../MICA9/index.md#prop-mica9-kg-characteristic)から

$$
H_p=-2\tau\partial_t+2\kappa\partial_x,\qquad
(t(s),x(s);\tau,\kappa)=(t_0+2\lambda s,x_0+2\lambda s;-\lambda,\lambda).
$$

この曲線上で $x-t=0$ も周波数方向も保たれ、波面は曲線の一部分ではなく全体を占めます。反対に $u=\sin(x-t)$ は $Pu=0$ でも滑らかで $WF(u)=\varnothing$。**全特性曲線が特異とは限らず、特異な曲線は途中だけ欠けない**、というのが目指す定理です。

## 2. 伝播を述べるための仮定

実主型とは[MICA9の定義](../MICA9/index.md#def-mica9-real-principal-type)に従い、実数値・正次数同次の主シンボル $p$ が特性集合上で半径方向に退化しないことです。例えば $P=-\Box_g+\mu^2$ は実主型ですが、$P^2$ の主シンボル $p^2$ は特性上で $H_{p^2}=0$ となるため、同じ説明をそのまま適用できません。

伝播を語るときには**局所的な双特性曲線の区間**と**全体の極大曲線**を分けます。流れのパラメータが有限時間で座標領域を出ることもあり、境界や無限遠へ出た後の延長はこの定理の結論ではありません。

<a id="thm-mica10-propagation"></a>

<!-- formal-statement-start -->
> **定理（実主型作用素の特異性伝播）**  
> $X$ を境界のない滑らかな多様体、$P\in\Psi^m(X)$（$m>0$）を properly supported なスカラー古典擬微分作用素とする。主シンボル $p_m$ は実数値・$\xi$ に関して $m$ 次同次で、$\operatorname{Char}(P)$ の各点が実主型とする。$u\in\mathcal D'(X)$ が $Pu\in C^\infty(X)$ を満たすとき、

$$
WF(u)\subset\operatorname{Char}(P),\qquad
WF(u)\cap\operatorname{Char}(P)
\text{ は }H_{p_m}\text{ の各極大双特性曲線に沿って不変}
$$

> である。正確には、双特性曲線 $\gamma:I\to\operatorname{Char}(P)$ と $s_0,s_1\in I$ に対し、$\gamma(s_0)\notin WF(u)$ なら $\gamma(s_1)\notin WF(u)$ である。逆に一点が $WF(u)$ に属すれば同じ曲線の全点が属す。ただし $I$ は曲線が零余接束を避けて存在する区間である。
<!-- formal-statement-end -->

この「不変」は周波数の正の拡大縮小を同一方向とみなす波面集合と整合します。[MICA9の同次性補題](../MICA9/index.md#lem-mica9-homogeneous-rescaling)によって、同じ円錐方向上の曲線は正の再パラメータ化で対応するからです。

一般定理の証明では、$WF(u)$ が空かどうかを直接追う代わりに、Sobolev正則性を少しずつ上げます。そのための言葉と計算をここで導入します。

## 3. 局所Sobolev正則性を方向別に測る

$\langle\xi\rangle=(1+|\xi|^2)^{1/2}$ と置きます。[GPDE3の二乗可積分型 Sobolev 空間](../../GPDE/GPDE3/index.md#def-gpde3-hk)を実数階数 $s$ に拡張し、周波数方向別に測ります。コンパクト支持分布 $v$ の $H^s$ ノルムは

$$
\|v\|_{H^s}^2=(2\pi)^{-n}\int_{\mathbb R^n}
\langle\xi\rangle^{2s}|\widehat v(\xi)|^2\,d\xi
$$

で定めます（一般の局所分布にはcutoffを掛けます）。$s$ は負でもよく、$s$ が大きいほど強い正則性を要求します。方向別の判定には、点 $z=(x,\xi)\ne0$ で楕円的な $A\in\Psi^s$ を選び、$Au$ の二乗可積分性を測ります。楕円性は $|\sigma_s(A)(z)|>0$ によって判定し、低周波の違いは問いません。

<a id="def-mica10-sobolev-wavefront"></a>

<!-- formal-statement-start -->
> **定義（Sobolev波面集合）**  
> $u\in\mathcal D'(X)$、$s\in\mathbb R$ とする。$z\in T^*X\setminus0$ で楕円的な $A\in\Psi^s$ が存在し $Au\in L^2_{\mathrm{loc}}$ となるとき、$u$ は $z$ で **microlocalに $H^s$** であるという。そのような $A$ が存在しない点の集合を **Sobolev波面集合** $WF^s(u)$ とする。従って $z\notin WF^s(u)$ は、その余接方向で $s$ 階のSobolev正則性があることを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica10-sobolev-wavefront -->
### 直接例：一点のデルタ分布で基準を検算する

**定義の確認**。$u=\delta_0$ を $\mathbb R^n$ 上で考え、$\chi(0)=1$ とします。$\widehat{\chi\delta_0}=1$ なので錐方向の高周波で必要な積分は

$$
\int_1^\infty r^{2s+n-1}\,dr.
$$

これは $2s+n<0$、すなわち $s<-n/2$ のときだけ有限です。全非零余接方向に同じ判定が成り立つので、$s<-n/2$ では $WF^s(\delta_0)=\varnothing$、$s\ge-n/2$ では $WF^s(\delta_0)=\{(0,\xi):\xi\ne0\}$ です。基点が零でないところでは分布自体が零です。
<!-- definition-example-end -->

<a id="lem-mica10-sobolev-wavefront"></a>

<!-- formal-statement-start -->
> **補題（Sobolev波面と通常の波面）**  
> 任意の $u\in\mathcal D'(X)$ に対し、

$$
WF(u)=\overline{\bigcup_{s\in\mathbb R}WF^s(u)}.
$$

> 閉包は $T^*X\setminus0$ の位相で取る。また $s_1\le s_2$ なら $WF^{s_1}(u)\subset WF^{s_2}(u)$ である。閉包は一般には省略できない。
<!-- formal-statement-end -->

### 証明の見取り図

高周波の全次数で急減少することと、あらゆる多項式重みで二乗積分可能なことを結びます。逆向きは一段強い重みを使うCauchy–Schwarz評価です。

<!-- proof-start -->
### 証明

$z\notin WF(u)$ なら、[MICA3の定義](../MICA3/index.md#def-mica3-wavefront)によって、$z$ の小さい錐と基点近傍のcutoffに対し $\widehat{\chi u}$ が任意次数で減衰します。従って任意の $s$ について $\langle\xi\rangle^s\widehat{\chi u}$ のその錐での二乗積分は有限です。楕円的な錐cutoff作用素を選べるので $z\notin WF^s(u)$ です。

逆向きには閉包の外にある $z$ を取ります。$z$ の一つの錐的近傍が**すべての** $WF^s(u)$ を避けるので、楕円近似逆によって、その中の少し小さい共通錐で $\langle\xi\rangle^s\widehat{\chi u}\in L^2$ がすべての $s$ について成り立ちます。固定した整数 $N\ge0$ に対して $s>N+n/2$ を選び、Cauchy–Schwarzで

$$
\int_\Gamma \langle\xi\rangle^N|\widehat{\chi u}(\xi)|\,d\xi
\le
\left(\int_\Gamma\langle\xi\rangle^{2s}|\widehat{\chi u}|^2d\xi\right)^{1/2}
\left(\int_\Gamma\langle\xi\rangle^{2(N-s)}d\xi\right)^{1/2}<\infty.
$$

これだけでは点ごとの減衰は直ちに従いません。さらに小さい錐を選び、コンパクト支持な $\chi u$ のFourier変換を周波数の単位球で平均します。その各微分は $x^\alpha\chi u$ のFourier変換であり、同じ錐内部で重み付き二乗積分評価を満たします。

単位球上のSobolev埋め込みを有限個の微分へ適用すると、任意の整数 $N\ge0$ について

$$
|\widehat{\chi u}(\xi)|\le C_N\langle\xi\rangle^{-N}
$$

が得られ、$z\notin WF(u)$ です。逆の包含は各 $WF^s(u)\subset WF(u)$ と通常の波面集合の閉性によります。単調性は、$s_1\le s_2$ なら $\langle\xi\rangle^{s_1}\le\langle\xi\rangle^{s_2}$ であることから従います。
<!-- proof-end -->

## 4. Hamilton流は交換子の主項に現れる

作用素 $A$ と $Q$ の交換子は $[Q,A]=QA-AQ$ です。MICA8で得た[記号の合成公式](../MICA8/index.md#lem-mica8-composition)を、次数1の $Q$ と次数 $s$ の $A$ に適用します。

<a id="lem-mica10-commutator"></a>

<!-- formal-statement-start -->
> **補題（交換子とHamilton微分）**  
> $Q\in\Psi^1$ の実数値主シンボルを $q$、$A\in\Psi^s$ の主シンボルを $a$ とする。このとき $[Q,A]\in\Psi^s$ で

$$
\sigma_s\bigl(i[Q,A]\bigr)=H_q a
=\sum_j(\partial_{\xi_j}q\,\partial_{x_j}a-\partial_{x_j}q\,\partial_{\xi_j}a).
$$

> 特に $A^*A\in\Psi^{2s}$ について $\sigma_{2s}(i[Q,A^*A])=H_q|a|^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

合成の最上位項 $qa$ と $aq$ は相殺されます。残る一階微分の差がPoisson括弧です。

<!-- proof-start -->
### 証明

$D=-i\partial$ の[MICA8の合成公式](../MICA8/index.md#lem-mica8-composition)では、$QA$ と $AQ$ の二番目の項はそれぞれ $(1/i)\sum_j\partial_{\xi_j}q\,\partial_{x_j}a$、$(1/i)\sum_j\partial_{\xi_j}a\,\partial_{x_j}q$ です。最上位の積 $qa-aq=0$、その差を $i$ 倍すると

$$
\sigma_s(i[Q,A])
=\sum_j(\partial_{\xi_j}q\,\partial_{x_j}a-\partial_{x_j}q\,\partial_{\xi_j}a)=H_qa.
$$

[擬微分作用素の合成公式](../MICA8/index.md#lem-mica8-composition)の剰余は一次低い $S^{s-1}$ に入ります。随伴の主シンボルは複素共役であるから、$A^*A$ の主シンボルは $\overline a a=|a|^2$。これに同じ計算を適用します。
<!-- proof-end -->

**直接計算。** $Q=D_t=-i\partial_t$、$A$ を実数値の滑らかな $a(t)$ による乗算とすると $i[D_t,a^2]=\partial_t(a^2)$ が厳密に成り立ちます。$q=\tau$ の Hamilton 流は $H_q=\partial_t$。交換子の符号は微分の向きと一致します。この計算は正交換子法が「流れに沿うエネルギーの変化」を測る理由を示しています。

## 5. 一階への還元と正交換子の局所評価

一般の次数 $m$ に対し、特性点の近くで正の楕円的記号 $\ell(x,\xi)\in S^{1-m}$ を持つ $L\in\Psi^{1-m}$ を選び $Q=LP\in\Psi^1$ とします。例えば局所的には $\ell=\langle\xi\rangle^{1-m}$ を高周波で使えます。主シンボルは $q=\ell p_m$、したがって特性集合上で

$$
H_q=\ell H_{p_m}+p_m H_\ell=\ell H_{p_m}.
$$

$\ell>0$ なので曲線の向きと軌跡を変えません。また $Pu\in C^\infty$ なら[MICA8の擬局所性](../MICA8/index.md#thm-mica8-pseudolocal)から $Qu=L(Pu)$ も局所的に滑らかです。以降は一階の $Q$ を扱います。

局所的に $H_q$ が零でも半径方向だけでもないことから、特性集合を正の周波数倍率で割った方向空間に非零の流れが誘導されます。ODEの流れの箱（初期点の近くの横断面から流線を流して座標にする）を取れば、曲線パラメータ $v$ と横断変数 $y$ によって $H_qv=1$、$H_qy=0$ となります。周波数半径 $\rho\asymp|\xi|$ を取ると $H_q\log\rho$ はこの小さな流れの箱上で有界です。

**正交換子で制御したい量。** これまでに分かっている $H^s$ 正則性を入口の小領域 $E$ に置き、出口に近い小領域 $B$ の正則性を示します。$A\in\Psi^s$ の記号を流れに沿って減少させると $i[Q,A^*A]$ の主項が負になり、$B^*B$ の正の二乗ノルムが取り出せます。

<a id="lem-mica10-positive-commutator"></a>

<!-- formal-statement-start -->
> **補題（局所正交換子評価）**  
> $Q\in\Psi^1(X)$ はスカラーで実主シンボル $q$ を持ち、$z_0\in\{q=0\}$ は実主型とする。$z_0$ を終点とする十分短い双特性区間の入口に錐的集合 $E$、区間の周囲に細い錐的管 $G$ を取り、$\overline G$ は座標箱に収まるとする。$s\in\mathbb R$ とする。$u$ が $G$ 上でmicrolocalに $H^{s-1/2}$、$Qu$ が $G$ 上でmicrolocalに $H^s$、$u$ が $E$ 上でmicrolocalに $H^s$ なら、$z_0$ で $u$ はmicrolocalに $H^s$ である。
<!-- formal-statement-end -->

### 証明の見取り図

流れの箱で減少する記号 $a$ を作り、$i(Q^*A^*A-A^*AQ)$ を二つの平方 $-B^*B+E_0^*E_0$ と一階低い剰余に分けます。非自己共役な低階項は減少率を大きく選んで吸収します。最後に高周波正則化を外します。

<!-- proof-start -->
### 証明

**(1) 減少する記号の構成。** $z_0$ の流線に沿う座標 $v$ を、入口が $v<0$、目標点が $v=0$ となるように取ります。横断方向のcutoff $\theta(y)$ を $z_0$ の近くで1にし、入口で0から1へ増え、その後一定、出口の先で0へ減る $\chi(v)\ge0$ を選びます。$a=\theta(y)\chi(v)e^{-Kv}\rho^s$ を管内で定め、高周波の外側は滑らかに0とします。$H_q\theta=0$、$H_qv=1$ より

$$
H_q(a^2)=\theta^2\rho^{2s}e^{-2Kv}
\left(2\chi\chi'-2K\chi^2+2s\chi^2H_q\log\rho\right).
$$

$H_q\log\rho$ は有界です。$K$ を $|s|\sup|H_q\log\rho|$ より十分大きくすると、$\chi'=0$ で $\chi>0$ の領域では $H_q(a^2)\le-c\theta^2\chi^2e^{-2Kv}\rho^{2s}$ です。正となり得るのは $\chi'>0$ の入口だけです。滑らかな非負記号 $b,e\in S^s$ を少し余裕を持って選び、$b$ は $z_0$ で楕円的、$e$ は入口 $E$ に支持を持つようにして、

$$
H_q(a^2)\le -b^2+e^2
$$

を管上で成立させます。管の横の境界では $\theta$ は変化しますが、$H_q\theta=0$ なので新たな正符号の流れ方向の誤差を作りません。$q=0$ から少し外れた領域への記号の延長による項は、$q$ の楕円性を利用して $Qu$ で制御します。

**(2) 作用素の不等式。** $A=\operatorname{Op}(a)$、$B=\operatorname{Op}(b)$、$E_0=\operatorname{Op}(e)$ とします。$Q$ が厳密に自己共役でなくても $Q^*-Q\in\Psi^0$ です。従って

$$
K_A=i(Q^*A^*A-A^*AQ)
$$

は自己共役な次数 $2s$ の作用素で、その主シンボルは $H_q(a^2)$ に、$Q^*-Q$ 由来の実数値な $c_0(x,\xi)a^2$ が加わります。$c_0$ は次数0で有界なので、(1) の指数の減衰率 $K$ をさらに増やしてこの項を負側へ吸収できます。記号計算と平方の主記号 $b^2,e^2$ から、適切な $B,E_0$ を選べば局所化後に

$$
-K_A=B^*B-E_0^*E_0+R+FQ+Q^*F^*,\qquad R\in\Psi^{2s-1},\quad F\in\Psi^{2s-1}
$$

と表せます。$q$ の倍数となる記号を $FQ+Q^*F^*$ へ移したのは、特性面から外れた部分の処理です。$F$ の次数は $2s-1$、$FQ$ は $2s$ なので次数も一致します。$R$ の主要部分を求めるには、(1) の符号差を正の平方記号へ分配し、合成記号の次数 $2s-1$ 以下を $R$ に集めます。

**(3) ペアリングの評価。** まず $u$ を滑らかな関数として計算します。$K_A$ の定義より、内積の取り方による全体符号を一貫して選べば

$$
|\langle K_Au,u\rangle|\le 2\,\|Au\|_{L^2}\,\|AQu\|_{L^2}.
$$

記号の支持を $G$ 内に取ってあるため $Qu$ の項は仮定により有限です。$A$ のほうは未知ですが $2ab\le\varepsilon a^2+\varepsilon^{-1}b^2$ を使って $B$ の係数に吸収するよう $a$ と $b$ を選びます。$E_0u$ は入口の $H^s$ 正則性で制御できます。$R$ は $2s-1$ 次なので、$u$ の既知の $H^{s-1/2}$ 正則性を二つの因子に割り当てれば

$$
|\langle Ru,u\rangle|\le C\|u\|_{H^{s-1/2}(G)}^2
$$

です。これには $\langle D\rangle^{-(s-1/2)}R\langle D\rangle^{-(s-1/2)}\in\Psi^0$ の $L^2$ 有界性を使います。局所化した $S^0$ の作用素については、記号の $x$-Fourier変換が十分多くの $x$ 微分で $|\widehat a_x(\eta,\xi)|\le C_N\langle\eta\rangle^{-N}$ と評価され、Fourier側の畳み込みに Young の不等式を適用すれば有界性が従います。$FQ$ の項も $Qu$ の既知の正則性と $u$ の低い正則性で抑えられます。よって

$$
\|Bu\|_{L^2}^2\le C\bigl(
\|E_0u\|_{L^2}^2+\|G_0Qu\|_{H^s}^2
+\|G_1u\|_{H^{s-1/2}}^2\bigr)
$$

となります。ここで $G_0,G_1$ は管に支持される次数0のcutoffで、各項の有限性は仮定によります。管の外からの平滑な剰余は、コンパクト支持した $u$ の十分低いSobolevノルムで抑えます。

**(4) 分布への拡張。** 分布に形式的に $B$ を当てて二乗ノルムを書いてはいけません。$M$ を十分大きく選び、高周波の正則化因子を

$$
j_\varepsilon(\rho)=(1+\varepsilon\rho)^{-M},\qquad
\frac{dj_\varepsilon}{d\rho}=-M\varepsilon(1+\varepsilon\rho)^{-M-1}
$$

とします。$a_\varepsilon=aj_\varepsilon$ を(1)–(3)の記号に代入し、まず正則化した作用素について評価します。$0<\varepsilon\le1$ で記号評価が一様であり、導関数の寄与も(1)の減少率を十分大きく選べば吸収できます。

この評価で得た $\|B_\varepsilon u\|_{L^2}$ の一様上界にFatouの補題を適用すると $Bu\in L^2$ です。$B$ は $z_0$ で楕円的なので、[Sobolev波面集合の定義](#def-mica10-sobolev-wavefront)から、その点は $WF^s(u)$ に入りません。
<!-- proof-end -->

### 技術的な境界：何を証明して、何を使ったか

この局所評価の本体は、流れの箱でのescape function、交換子の $H_q$ 主項、$2s-1$ 次への剰余の下降、正則化後の極限です。道具としては[MICA8の合成計算](../MICA8/index.md#lem-mica8-composition)と[楕円的近似逆](../MICA8/index.md#thm-mica8-parametrix)を使いました。流れの箱の存在は滑らかなODEの局所存在一意性と逆関数定理から従います。ここで必要なのは短い流線管であり、全域での正準変換やFourier積分作用素の構成ではありません。

## 6. 局所評価から伝播定理を導く

### 証明の見取り図

任意の分布はコンパクト領域で十分負のSobolev階数には属します。局所評価で半階ずつ正則性を上げ、短い区間を連ね、最後にすべての $s$ を通します。両向きの伝播は $-Q$ にも同じ議論を適用して得ます。

<!-- proof-start -->
### 定理の証明

まず[非特性方向の楕円正則性](../MICA9/index.md#prop-mica9-wavefront-confinement)から $WF(u)\subset\operatorname{Char}(P)$ です。特性上では第5節の $Q=LP$ が同じ向きの双特性曲線を持ち、$Qu$ は滑らかです。

特性曲線 $\gamma$ 上の点 $\gamma(s_0)$ で $u$ が滑らかだとします。任意のSobolev階数 $s$ を固定すると、$s_0$ の小さい錐的近傍では $u$ はその階数の正則性を持ちます。

一方、コンパクトな短い曲線区間の近くでは、分布 $u$ は十分負の階数 $s_*=-N$ のSobolev空間に属します。第5節の[局所正交換子評価](#lem-mica10-positive-commutator)を最初に

$$
s=s_*+\tfrac12,\qquad s-\tfrac12=s_*
$$

として使います。入口ではすでに $H^s$、管の全体では $H^{s-1/2}$ が既知なので、出口にも $H^s$ が得られます。

同じ流れの箱を少しずつ重ね、$s_*+1/2,s_*+1,\ldots$ と反復します。右辺 $Qu$ は滑らかなので、各段階の $H^s$ 条件を満たします。有限回の反復で任意に指定した $s$ に届きます。したがって各 $WF^s(u)$ はHamilton流に沿って不変です。これらの集合の和集合の閉包も、連続な流れと逆向きの流れによって不変です。[Sobolev波面と通常の波面](#lem-mica10-sobolev-wavefront)の補題から、これは通常の $WF(u)$ の不変性そのものです。

曲線上の任意の $s_1$ までの閉区間は有限個の小さい流れの箱で覆えます。これらを順に渡れば $\gamma(s_1)\notin WF(u)$ となります。逆向きは主シンボル $-q$ を持つ $-Q$ に同じ局所評価を適用します。従って滑らかな点の集合は曲線上で両方向へ伝播し、その補集合である $WF(u)$ も曲線上で不変です。
<!-- proof-end -->

大切なのは $Pu\in C^\infty$ という条件です。右辺が特異なら、その特異点から新しい波が出ても矛盾しません。また、実主型でない重複特性では局所的な流れの箱を作る出発点が壊れます。

## 7. 曲がった時空の波動作用素への帰結

$(M,g)$ を境界のない滑らかな時間向き付きLorentz多様体（次元 $d\ge2$、符号 $(-,+,\ldots,+)$）、$P=-\Box_g+\mu^2+V$、$V\in C^\infty(M,\mathbb R)$ とします。[MICA9の光的特性と実主型性](../MICA9/index.md#prop-mica9-kg-characteristic)により

$$
p(x,\xi)=g^{ab}(x)\xi_a\xi_b,
\qquad H_p=2g^{ab}\xi_b\partial_{x^a}
-(\partial_ag^{bc})\xi_b\xi_c\partial_{\xi_a}.
$$

[MICA9の零測地線への射影定理](../MICA9/index.md#thm-mica9-null-geodesic)によって、その基点はアフィンパラメータ付き零測地線です。従って $Pu\in C^\infty$ なら、$WF(u)$ の各光的余接方向は零測地線に沿って運ばれます。$\mu^2$ と $V$ は零階なので光線の幾何を変えませんが、解の振幅や位相まで同じとは言えません。

ここでは局所結果のため、大域双曲性は不要です。大域のCauchy問題や伝播子の存在・一意性が必要な場合は、別途[HPDE5のnormally hyperbolic作用素](../../HPDE/HPDE5/index.md#def-hpde5-normally-hyperbolic)の仮定に戻ります。後続の二点分布の波面集合では、本章の定理を**各変数について**使うことになりますが、それだけで正エネルギー条件やHadamard状態の存在は証明されません。

## 8. 演習――模型から伝播の論理まで

<a id="ex-mica10-a01"></a>
### 演習 MICA10-A1：光的座標への変換

- Level: A
- 目安時間: 18分

$r=x-t$、$s=x+t$ のとき $\partial_t^2-\partial_x^2=-4\partial_r\partial_s$ を導き、$u=\delta(x-t)$ が同次方程式を満たすことを分布の意味で確認せよ。

<!-- solution-start -->
#### 詳細解答

連鎖律で $\partial_t=-\partial_r+\partial_s$、$\partial_x=\partial_r+\partial_s$ です。微分は可換なので二乗を展開すると

$$
(-\partial_r+\partial_s)^2-(\partial_r+\partial_s)^2
=-4\partial_r\partial_s.
$$

$u=\delta(r)$ は $s$ に依存しない分布です。任意の試験関数 $\varphi(r,s)$ に対して $\langle\partial_s\delta(r),\varphi\rangle=-\int\partial_s\varphi(0,s)\,ds=0$。従って $\partial_r\partial_su=0$ です。
<!-- solution-end -->

<a id="ex-mica10-a02"></a>
### 演習 MICA10-A2：デルタ波の向き

- Level: A
- 目安時間: 17分

$u=\delta(x+t)$ について $WF(u)$ を求め、$p=-\tau^2+\kappa^2$ の $H_p$ に沿って不変かを符号まで確認せよ。

<!-- solution-start -->
#### 詳細解答

$h(t,x)=x+t$ とすると $dh=dt+dx$ は零でありません。[MICA5の部分多様体デルタの波面集合](../MICA5/index.md#thm-mica5-submanifold-delta)より

$$
WF(u)=\{(t,x;\lambda,\lambda):x=-t,\ \lambda\ne0\}.
$$

$H_p=-2\tau\partial_t+2\kappa\partial_x$ に $\tau=\kappa=\lambda$ を入れると $dt/ds=-2\lambda$、$dx/ds=2\lambda$ で、$d(x+t)/ds=0$ です。余接成分の微分は零ですから、任意の初期点から出る全曲線が同じ波面集合内にあります。
<!-- solution-end -->

<a id="ex-mica10-a03"></a>
### 演習 MICA10-A3：Sobolev階数の閾値

- Level: A
- 目安時間: 18分

$\delta_0\in\mathcal D'(\mathbb R^2)$ はどの $s$ でmicrolocalに $H^s$ となるか。全非零方向で調べよ。

<!-- solution-start -->
#### 詳細解答

$\chi(0)=1$ なら $\widehat{\chi\delta_0}=1$ です。錐領域での重み付き二乗積分は極座標で $\int_1^\infty r^{2s}r\,dr=\int_1^\infty r^{2s+1}\,dr$ に定数倍で等しくなります。収束条件は $2s+1<-1$、すなわち $s<-1$ です。すべての開錐で同じ半径積分が現れ、$s\ge-1$ では発散するので、結論は $WF^s(\delta_0)=\varnothing$（$s<-1$）と $WF^s(\delta_0)=\{(0,\xi):\xi\ne0\}$（$s\ge-1$）です。
<!-- solution-end -->

<a id="ex-mica10-a04"></a>
### 演習 MICA10-A4：交換子の最小模型

- Level: A
- 目安時間: 16分

$Q=D_t$、$A$ を $a(t)=e^{-t}\chi(t)$ による乗算とし、$\chi\equiv1$ の区間で $i[Q,A^*A]$ を求め、その符号の意味を説明せよ。

<!-- solution-start -->
#### 詳細解答

$A^*A$ は実数値 $a^2$ による乗算です。試験関数 $v$ に適用して

$$
[D_t,a^2]v=-i\partial_t(a^2v)+ia^2\partial_tv=-i(a^2)'v.
$$

従って $i[D_t,A^*A]=(a^2)'$。$\chi=1$ の区間では $a^2=e^{-2t}$ なので $(a^2)'=-2e^{-2t}<0$。$H_q=\partial_t$ の方向に測定する重みが減り、その負号から正の平方ノルムを取り出せます。
<!-- solution-end -->

<a id="ex-mica10-b01"></a>
### 演習 MICA10-B1：一般の定係数波と曲線

- Level: B
- 目安時間: 26分

$P=\partial_t^2-c^2\partial_x^2$（$c>0$）について、$u=F(x-ct)+G(x+ct)$ が任意の一変数分布 $F,G$ に対して同次解であることを示せ。$F=\delta$ の波面を計算し、Hamilton流に沿うことを確認せよ。

<!-- solution-start -->
#### 詳細解答

$r=x-ct$、$s=x+ct$ とすると $\partial_t=-c\partial_r+c\partial_s$、$\partial_x=\partial_r+\partial_s$ なので $P=-4c^2\partial_r\partial_s$。$F(r)$ は $\partial_sF=0$、$G(s)$ は $\partial_rG=0$ であり、分布として $Pu=0$ です。

$F=\delta$ の超曲面 $x-ct=0$ の法共変ベクトルは $-c\,dt+dx$ です。従って $WF(\delta(x-ct))=\{(t,x;-c\lambda,\lambda):x=ct,\lambda\ne0\}$。$D$ 規約の $p=-\tau^2+c^2\kappa^2$ について $H_p=-2\tau\partial_t+2c^2\kappa\partial_x$。指定方向で $dt/ds=2c\lambda$、$dx/ds=2c^2\lambda$、従って $d(x-ct)/ds=0$。余接成分は一定で、波面は伝播方向に不変です。
<!-- solution-end -->

<a id="ex-mica10-b02"></a>
### 演習 MICA10-B2：記号の次数をそろえる

- Level: B
- 目安時間: 27分

$P\in\Psi^m$ の実主シンボルを $p_m$ とし、$L\in\Psi^{1-m}$ の主シンボルを正の $\ell$ とする。$Q=LP$ の次数、主シンボル、特性集合、Hamilton流を比較せよ。$P$ の低階項が消滅すると誤解してはいけない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

[MICA8の擬微分作用素の合成公式](../MICA8/index.md#lem-mica8-composition)から、一階の主シンボルは

$$
Q\in\Psi^1,\qquad \sigma_1(Q)=\ell p_m
$$

です。$\ell>0$ なので、その零集合は元の主シンボルと同じです。積の微分を行うと

$$
H_{\ell p_m}=\ell H_{p_m}+p_mH_\ell,
\qquad H_{\ell p_m}|_{p_m=0}=\ell H_{p_m}|_{p_m=0}.
$$

従って特性曲線の向きは保たれ、パラメータの速さだけが正の倍率で変わります。ただし $Q=LP$ には両作用素の低階記号の積や合成の微分補正が残ります。二つの同次方程式の解集合は近似逆を伴う議論なしには同一と断定できません。ここで必要なのは、元の右辺 $Pu$ が滑らかなら $Qu$ も滑らか、という擬局所性です。
<!-- solution-end -->

<a id="ex-mica10-b03"></a>
### 演習 MICA10-B3：正交換子で半階が現れる理由

- Level: B
- 目安時間: 26分

一階の $Q$、$s$ 次の $A$ に対し、$K_A=i(Q^*A^*A-A^*AQ)$ とする。$Q$ の主シンボルが実なら、$K_A$ と主記号の平方分解から生じる剰余 $R$ の次数を求め、なぜ $R$ が既知の $H^{s-1/2}$ 正則性で制御できるか説明せよ。

<!-- solution-start -->
#### 詳細解答

$A^*A\in\Psi^{2s}$、$[Q,A^*A]\in\Psi^{2s}$ です。主シンボルの交換子は[本章の補題](#lem-mica10-commutator)で $H_q|a|^2$、$Q^*-Q\in\Psi^0$ の寄与も $2s$ 次です。主シンボルを $-b^2+e^2$ として差し引くと最上位次数が消えるので残差は $R\in\Psi^{2s-1}$。二つの因子のSobolev階数をそれぞれ $s-1/2$ に取れば合計 $2s-1$ となります。具体的には $T=\langle D\rangle^{-(s-1/2)}R\langle D\rangle^{-(s-1/2)}\in\Psi^0$ だから、

$$
|\langle Ru,u\rangle|
=|\langle T\langle D\rangle^{s-1/2}u,\langle D\rangle^{s-1/2}u\rangle|
\le C\|u\|_{H^{s-1/2}}^2.
$$

局所化では作用素の両側にcutoffを入れ、支持の外の項は低いSobolevノルムへ移します。
<!-- solution-end -->

<a id="ex-mica10-c01"></a>
### 演習 MICA10-C1：滑らかな右辺と点状発生源の区別

- Level: C
- 目安時間: 38分

$P=\partial_t^2-\partial_x^2$、$H$ をHeaviside分布として $u(t,x)=H(t)\,\delta(x-t)$ を考える。$Pu$ を分布として計算し、この $u$ が伝播定理の反例にならない理由を説明せよ。加えて、$t>0$ でどの光線方向に波面が乗るかを調べよ。

<!-- solution-start -->
#### 詳細解答

$r=x-t$、$s=x+t$ とすると $t=(s-r)/2$ で $u=H((s-r)/2)\delta(r)=H(s/2)\delta(r)$ です（$r=0$ への制限は、$H$ の跳び目が $s=0$ で交差することを含め分布積として解釈でき、この式は $H(t)\otimes\delta(x-t)$ の座標変換です）。$P=-4\partial_r\partial_s$ なので

$$
\partial_su=\delta(s)\delta(r),\qquad
Pu=-4\delta'(r)\delta(s).
$$

ここで $\partial_s H(s/2)=\delta(s)$（$H(s/2)=H(s)$）です。変数変換のJacobianは $|\partial(t,x)/\partial(r,s)|=1/2$ ですが、上の式は $(r,s)$ 座標での分布の等式として書いており、その定義と一致します。右辺は原点に支持される特異分布で $C^\infty$ ではありません。したがって[伝播定理](#thm-mica10-propagation)の仮定を満たさず、$t=0$ で波を新たに発生させることは反例ではありません。

$t>0$ の領域では $H(t)=1$ なので $u=\delta(x-t)$ と同じです。従って $WF(u)$ は $x=t>0$、$(\tau,\kappa)=\lambda(-1,1)$、$\lambda\ne0$ の方向にあり、$H_p$ に沿う右向き光線の部分です。$t<0$ では $u=0$ ですから、その間を隔てる原点の特異な右辺が決定的です。
<!-- solution-end -->

## 9. 次章への接続

定係数の波では $f(x-t)+g(x+t)$ を直接求めました。一般の実主型方程式では、$H_q$ に沿って減る重みから交換子を作り、低い正則性から高い正則性へ移る局所評価を得ました。これにより、$Pu$ が滑らかな領域では $WF(u)$ は双特性曲線の**和集合**になります。

次のMICA11では、自由場の二点分布の二つの変数のどちらに波面が現れるかを調べます。本章の伝播だけでは二点分布の正値性や未来向きの枝は選ばれません。そこには状態と周波数条件が別途必要です。

### 参考文献

- L. Hörmander, *The Analysis of Linear Partial Differential Operators III*, 実主型作用素と正交換子による特異性伝播。
- D. Baskin and K. Datchev, [*Propagation of Singularities for the Wave Equation*](https://drbaskin.github.io/assets/pdf/propsing.pdf), 正交換子の局所推定と正則化の手順。
