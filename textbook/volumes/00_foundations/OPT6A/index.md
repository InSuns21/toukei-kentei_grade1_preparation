# OPT6A 錐制約・一般化 KKT

<!-- definition-example-audit: strict -->

OPT6 では有限個の不等式・等式を個別に扱いました。本章では不等式を

$$
G(x)\in-K
$$

という一つの形へまとめます。すると「乗数は非負」「相補性」「停留条件」は

$$
\lambda\in K^*,\qquad
\langle\lambda,G(x^*)\rangle=0,\qquad
\nabla f(x^*)+DG(x^*)^*\lambda+DH(x^*)^*\nu=0
$$

という同じ幾何から出てきます。

主線は

$$
\boxed{
G(x)\in-K
\to K^*
\to N_{-K}(G(x))
\to \text{Robinson CQ}
\to \text{一般化 KKT}
}
$$

です。

---

## 1. 錐制約

$X=\mathbb R^n$, $Y=\mathbb R^m$ とし、$K\subset Y$ を閉凸錐とします。

<a id="def-opt6a-cone-constraint"></a>
<!-- formal-statement-start -->
> **定義（錐制約）**  
> 有限次元 Euclid 空間 $X=\mathbb R^n$、$Y=\mathbb R^m$ と、閉凸錐 $K\subset Y$ を考える。写像 $G:X\to Y$ に対する
>
$$
G(x)\in-K
$$
>
> という制約を **錐制約**という。等式制約を併用するときは、写像 $H:X\to\mathbb R^r$ を用いて $H(x)=0$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6a-cone-constraint -->
**定義の確認**：通常の不等式

$$
G(x)=(g_1(x),\ldots,g_m(x)),\qquad K=\mathbb R_+^m
$$

なら

$$
G(x)\in-K
\iff
g_i(x)\le0\quad(i=1,\ldots,m).
$$

したがって通常の不等式制約は錐制約の特殊例です。
<!-- definition-example-end -->

行列不等式も同じ形に入ります。例えば対称行列値写像 $F(x)$ に対する

$$
F(x)\preceq0
$$

は、対称半正定値行列の錐 $\mathbb S_+^q$ を用いて $F(x)\in-\mathbb S_+^q$ と書けます。ここに半正定値計画への入口があります。

---

## 2. 双対錐

<a id="def-opt6a-dual-cone"></a>
[OPT3 で定義した双対錐](../OPT3/index.md#def-opt3-polar-dual)を錐制約へ使います。すなわち、錐 $K\subset Y$ に対して

$$
K^*
=
\{\lambda\in Y:
\langle\lambda,k\rangle\ge0\quad(\forall k\in K)\}
$$

です。ここでは新しい概念を再定義するのではなく、OPT3 の canonical な双対錐を再掲しています。

**確認例**：非負直交錐は自己双対

$K=\mathbb R_+^m$ とします。$\lambda\in K^*$ なら標準基底 $e_i\in K$ との内積から $\lambda_i\ge0$。逆に $\lambda_i\ge0$ なら任意の $k_i\ge0$ に対して $\lambda^{\mathsf T}k\ge0$。従って

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$
この自己双対性が通常の KKT の $\lambda_i\ge0$ を復元します。

---

## 3. 一般化 Lagrangian

<a id="def-opt6a-generalized-lagrangian"></a>
<!-- formal-statement-start -->
> **定義（一般化 Lagrangian）**  
> 有限次元 Euclid 空間 $X=\mathbb R^n$、$Y=\mathbb R^m$、閉凸錐 $K\subset Y$ と写像
>
$$
f:X\to\mathbb R,
\qquad
G:X\to Y,
\qquad
H:X\to\mathbb R^r
$$
>
> に対する問題
>
$$
\min_x f(x)
\quad\text{制約}\quad
G(x)\in-K,\qquad H(x)=0
$$
>
> を考える。$\lambda\in K^*$、$\nu\in\mathbb R^r$ に対して
>
$$
L(x,\lambda,\nu)
=
f(x)+\langle\lambda,G(x)\rangle
+\langle\nu,H(x)\rangle
$$
>
> を **一般化 Lagrangian** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6a-generalized-lagrangian -->
**定義の確認**：二本の不等式

$K=\mathbb R_+^2$, $G=(g_1,g_2)$ なら

$$
L=f+\lambda_1g_1+\lambda_2g_2+\nu^{\mathsf T}H,
\qquad
\lambda_1,\lambda_2\ge0.
$$

OPT5 の Lagrangian がそのまま戻ります。
<!-- definition-example-end -->

微分すると

$$
\nabla_xL
=
\nabla f(x)+DG(x)^*\lambda+DH(x)^*\nu.
$$

有限次元 Euclid 空間では $DG(x)^*$ は Jacobian の転置です。

---

## 4. 相補性は法錐の式である

<a id="thm-opt6a-cone-normal"></a>
<!-- formal-statement-start -->
> **定理（閉凸錐の法錐）**  
> 有限次元 Euclid 空間 $Y$ の閉凸錐 $K\subset Y$ と $y\in-K$ を考える。このとき
>
$$
\boxed{
N_{-K}(y)
=
\{\lambda\in K^*:
\langle\lambda,y\rangle=0\}.
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\lambda\in N_{-K}(y)$ とする。法錐の定義から

$$
\langle\lambda,z-y\rangle\le0
\qquad(\forall z\in-K).
$$

$z=0$ とすれば $\langle\lambda,y\rangle\ge0$。また任意の $k\in K$, $t>0$ に対して $z=y-tk\in-K$ だから

$$
-t\langle\lambda,k\rangle\le0,
$$

従って $\lambda\in K^*$。$y=-k_0$ と書けば $\langle\lambda,y\rangle=-\langle\lambda,k_0\rangle\le0$ なので、先ほどの逆向き不等式と合わせて0です。

逆に $\lambda\in K^*$ かつ $\langle\lambda,y\rangle=0$ とする。$z=-k\in-K$ に対し

$$
\langle\lambda,z-y\rangle
=
-\langle\lambda,k\rangle\le0.
$$

よって $\lambda\in N_{-K}(y)$。$\square$
<!-- proof-end -->

つまり一般錐でも

$$
\boxed{
\lambda\in K^*,
\qquad
\langle\lambda,G(x^*)\rangle=0
}
$$

が双対実行可能性と相補性です。

---

## 5. 錐制約を一次近似する

実行可能集合を

$$
C=\{x:G(x)\in-K,\ H(x)=0\}
$$

とします。$y^*=G(x^*)$ と置きます。

<a id="def-opt6a-linearization-cone"></a>
<!-- formal-statement-start -->
> **定義（錐制約の線形化錐）**  
> 閉凸錐 $K\subset Y$、微分可能な写像 $G:X\to Y$、$H:X\to\mathbb R^r$ に対し
>
$$
C
=
\{x:G(x)\in-K,\ H(x)=0\}
$$
>
> と置く。実行可能点 $x^*\in C$ と $y^*=G(x^*)$ に対して
>
$$
L_C(x^*)
=
\left\{
d\in X:
DG(x^*)d\in T_{-K}(y^*),\ 
DH(x^*)d=0
\right\}
$$
>
> を $x^*$ における **錐制約の線形化錐**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6a-linearization-cone -->
**定義の確認**：通常の一変数不等式

$G(x)=x$, $K=\mathbb R_+$, $x^*=0$ とします。$-K=\mathbb R_-$ で

$$
T_{\mathbb R_-}(0)=\mathbb R_-.
$$

$DG(0)d=d$ なので

$$
L_C(0)=\{d:d\le0\},
$$

通常の一次近似条件と一致します。
<!-- definition-example-end -->

微分可能性から OPT6 と同様に

$$
T_C(x^*)\subseteq L_C(x^*)
$$

は常に成立します。問題は逆包含です。

---

## 6. Robinson 制約想定

<a id="def-opt6a-robinson-cq"></a>
<!-- formal-statement-start -->
> **定義（Robinson 制約想定）**  
> 閉凸錐 $K\subset Y$ と $C^1$ 級写像 $G:X\to Y$、$H:X\to\mathbb R^r$ に対し
>
$$
C
=
\{x:G(x)\in-K,\ H(x)=0\}
$$
>
> と置き、$x^*\in C$ とする。集合
>
$$
\mathcal R
=
\left\{
\bigl(DH(x^*)d,\ DG(x^*)d-s\bigr):
d\in X,\ 
s\in T_{-K}(G(x^*))
\right\}
$$
>
> が $\mathbb R^r\times Y$ 全体に等しいとき、$x^*$ で **Robinson 制約想定**が成立するという。
<!-- formal-statement-end -->

有限次元ではこれは「一次近似された制約写像が全方向の摂動を吸収できる」という正則性です。

<!-- definition-example-start: def-opt6a-robinson-cq -->
**定義の確認**：$x\le0$

$G(x)=x$, $K=\mathbb R_+$, $x^*=0$。等式制約はありません。

$$
DG(0)d=d,\qquad
T_{-K}(0)=\mathbb R_-.
$$

任意の $y\in\mathbb R$ に対し $d=y$, $s=0$ と取れば $y=DG(0)d-s$。従って $\mathcal R=\mathbb R$ で Robinson 制約想定が成立します。
<!-- definition-example-end -->

### 6.1 退化例では失敗する

$G(x)=x^2$, $K=\mathbb R_+$, $x^*=0$ では $DG(0)=0$ です。従って

$$
\mathcal R
=
\{-s:s\in\mathbb R_-\}
=
\mathbb R_+,
$$

全実数を覆えません。OPT6 で見た「一次近似が制約を消す」退化が、ここでは Robinson 制約想定の失敗として現れます。

---

## 7. Robinson 制約想定が接錐を回収する

一般錐では、OPT6 のように各不等式へ個別に陰関数定理を当てることはできません。代わりに、Robinson 制約想定から得られる **局所誤差境界** が「一次近似でほぼ実行可能」な点を「真に実行可能」な点へ $o(t)$ だけ補正します。

写像と制約集合を

$$
F(x)
=
\bigl(H(x),G(x)\bigr),
\qquad
D
=
\{0\}\times(-K)
$$

とまとめれば、実行可能集合は

$$
C=F^{-1}(D)
$$

です。

<a id="thm-opt6a-robinson-error-bound"></a>
<!-- formal-statement-start -->
> **定理（有限次元 Robinson 誤差境界）**  
> 有限次元 Euclid 空間 $X$ と $Z$、閉凸集合 $D\subset Z$、$C^1$ 級写像 $F:X\to Z$ を考え、$F(x^*)\in D$ とする。一次近似条件
>
$$
DF(x^*)X-T_D(F(x^*))=Z
$$
>
> が成立するとする。このとき、ある $\kappa>0$ と $x^*$ の近傍 $U$ が存在して
>
$$
\boxed{
\operatorname{dist}\bigl(x,F^{-1}(D)\bigr)
\le
\kappa\,
\operatorname{dist}\bigl(F(x),D\bigr)
}
\qquad(x\in U)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

この定理は Robinson 制約想定の **定量版** です。本章で必要なのは、右辺が $o(t)$ なら実行可能集合までの距離も $o(t)$ になる、という一点です。

### 誤差境界の核心

一次近似作用素

$
Q(d,s)=DF(x^*)d-s,
\qquad
s\in T_D(F(x^*))
$$

を考えます。仮定は $Q$ の像が $Z$ 全体であることです。各 $z\in Z$ に対して

$$
p(z)
=
\inf
\left\{
\|(d,s)\|:
Q(d,s)=z,\ 
s\in T_D(F(x^*))
\right\}
$$

と置くと、接錐が凸錐であるため $p$ は正斉次かつ劣加法的です。しかも仮定により全ての $z$ で有限です。[有限値凸関数の局所 Lipschitz 連続性](../OPT3/index.md#lem-opt3-finite-convex-lipschitz)をこの有限値劣線形関数 $p$ に適用すると、$p$ は原点近傍で有界です。正斉次性と合わせて、ある $M>0$ が存在して

$$
p(z)\le M\|z\|
$$

となります。つまり、**任意の一次残差を、その大きさと同程度の補正で消せる**ことが Robinson 条件の定量的な中身です。

$F$ は $C^1$ 級なので、$x^*$ の十分小さい近傍では

$$
F(x+h)
=
F(x)+DF(x^*)h+r(x,h),
\qquad
\|r(x,h)\|
\le
\varepsilon\|h\|
$$

と一様に評価できます。$\varepsilon M<1$ となるよう近傍を小さく取り、上の有界な一次補正を反復すると、残差は幾何級数的に減少し、補正量の総和は初期残差の定数倍で抑えられます。補正列の極限を $\widehat x$ とすれば閉性から $F(\widehat x)\in D$ であり、

$$
\|x-\widehat x\|
\le
\kappa\,
\operatorname{dist}(F(x),D)
$$

を得ます。これが上の誤差境界です。

> **意図的黒箱：Robinson 誤差境界の完全証明**  
> 上の誤差境界そのものは、本章では定理として使用します。完全証明には集合値写像の局所的な全射安定性と計量正則性（metric regularity）を体系的に構成する必要があり、本章の射程を超えます。ここでは証明で実際に使う「線形化の全射性から有界な一次補正を得る → $C^1$ 剰余を反復吸収する → 距離評価を得る」という核心機構まで示しました。通常制約 $K=\mathbb R_+^m$ では、後の Robinson 制約想定と MFCQ の同値により OPT6 の陰関数定理を用いた完全証明へ戻ります。

<a id="thm-opt6a-robinson-tangent"></a>
<!-- formal-statement-start -->
> **定理（Robinson 制約想定下の接錐公式）**  
> 閉凸錐 $K\subset Y$ と $C^1$ 級写像 $G:X\to Y$、$H:X\to\mathbb R^r$ に対し
>
$$
C
=
\{x:G(x)\in-K,\ H(x)=0\}
$$
>
> と置く。実行可能点 $x^*\in C$ で Robinson 制約想定が成立するとき
>
$$
\boxed{
T_C(x^*)
=
\left\{
d\in X:
DG(x^*)d\in T_{-K}(G(x^*)),\ 
DH(x^*)d=0
\right\}.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

包含 $T_C(x^*)\subseteq L_C(x^*)$ は、実行可能列へ $G,H$ の一次展開を適用すれば得られます。逆包含では $d\in L_C(x^*)$ に対して $z_t=x^*+td$ を作ると、制約違反は $o(t)$ まで小さくなります。Robinson 誤差境界で $z_t$ を $o(t)$ だけ動かして真の実行可能点へ戻します。

<!-- proof-start -->
### 証明

まず $d\in T_C(x^*)$ とします。[Bouligand 接錐](../OPT3/index.md#def-opt3-tangent-cone)の定義から、$x_k\in C$ と $t_k\downarrow0$ が存在して

$$
\frac{x_k-x^*}{t_k}\to d.
$$

$H(x_k)=H(x^*)=0$ と微分可能性から

$$
0
=
\frac{H(x_k)-H(x^*)}{t_k}
\to
DH(x^*)d,
$$

従って $DH(x^*)d=0$ です。また $G(x_k)\in-K$ であり、

$$
\frac{G(x_k)-G(x^*)}{t_k}
\to
DG(x^*)d.
$$

接錐の定義から

$$
DG(x^*)d
\in
T_{-K}(G(x^*)).
$$

よって $T_C(x^*)\subseteq L_C(x^*)$ です。

逆に $d\in L_C(x^*)$ とします。記号を

$$
A=DG(x^*),
\qquad
B=DH(x^*),
\qquad
y^*=G(x^*)
$$

と置きます。$Ad\in T_{-K}(y^*)$ なので、接錐の定義から $t_k\downarrow0$ と $y_k\in-K$ を

$$
\frac{y_k-y^*}{t_k}
\to
Ad
$$

となるように取れます。$z_k=x^*+t_kd$ と置くと、$Bd=0$ と $C^1$ 性から

$$
H(z_k)=o(t_k),
$$

また

$$
G(z_k)
=
y^*+t_kAd+o(t_k).
$$

一方

$$
y_k
=
y^*+t_kAd+o(t_k),
$$

なので

$$
\operatorname{dist}\bigl(G(z_k),-K\bigr)
\le
\|G(z_k)-y_k\|
=
o(t_k).
$$

従って $F=(H,G)$、$D=\{0\}\times(-K)$ に対して

$$
\operatorname{dist}(F(z_k),D)=o(t_k).
$$

Robinson 制約想定は

$$
DF(x^*)X-T_D(F(x^*))=\mathbb R^r\times Y
$$

そのものなので、[有限次元 Robinson 誤差境界](#thm-opt6a-robinson-error-bound)を適用できます。よって

$$
\operatorname{dist}(z_k,C)=o(t_k).
$$

$C$ は $G,H$ の連続性と $-K,\{0\}$ の閉性から閉集合です。したがって $x_k\in C$ を

$$
\|x_k-z_k\|
=
o(t_k)
$$

となるように取れます。すると

$$
\frac{x_k-x^*}{t_k}
=
d+
\frac{x_k-z_k}{t_k}
\to d.
$$

よって $d\in T_C(x^*)$ であり、逆包含も示されました。$\square$
<!-- proof-end -->

> **Robinson 制約想定が働いた場所**  
> KKT の代数操作ではなく、上の誤差境界を通じて
>
$$
L_C(x^*)\subseteq T_C(x^*)
$$
>
> を回収する一箇所です。

### 7.1 線形化錐の極錐を乗数表示へ変える

接錐を線形化錐へ置き換えただけでは、まだ KKT 乗数は出てきません。次に

$$
L_C(x^*)^\circ
$$

を制約写像の随伴で表示します。この段階でも Robinson 制約想定は、乗数表示の右辺を **閉じた錐** にするために働きます。

<a id="thm-opt6a-linearized-polar"></a>
<!-- formal-statement-start -->
> **定理（Robinson 制約想定下の線形化錐の極錐表示）**  
> 有限次元 Euclid 空間 $X,Y$、閉凸錐 $T\subset Y$、線形写像
>
$$
A:X\to Y,
\qquad
B:X\to\mathbb R^r
$$
>
> を考える。
>
$$
L
=
\{d\in X:Ad\in T,\ Bd=0\}
$$
>
> と置き、
>
$$
\left\{
(Bd,Ad-s):
d\in X,\ s\in T
\right\}
=
\mathbb R^r\times Y
$$
>
> を仮定する。このとき
>
$$
\boxed{
L^\circ
=
A^*T^\circ
+
\operatorname{range}B^*
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

右辺から左辺は内積を取れば直ちに分かります。逆向きの核心は、Robinson 条件が「ゼロでない異常乗数」を排除し、その結果

$$
A^*T^\circ+\operatorname{range}B^*
$$

が閉凸錐になることです。閉性が得られれば、OPT2 の閉凸錐分離と OPT3 の極双極定理で逆包含を示せます。

<!-- proof-start -->
### 証明

まず

$$
M
=
A^*T^\circ
+
\operatorname{range}B^*
$$

と置きます。$\mu\in T^\circ$、$\nu\in\mathbb R^r$、$d\in L$ なら

$$
\begin{aligned}
\langle A^*\mu+B^*\nu,d\rangle
&=
\langle\mu,Ad\rangle
+
\langle\nu,Bd\rangle\\
&=
\langle\mu,Ad\rangle
\le0,
\end{aligned}
$$

なので $M\subseteq L^\circ$ です。

次に Robinson 条件から異常乗数が存在しないことを示します。

$$
\mu\in T^\circ,
\qquad
A^*\mu+B^*\nu=0
$$

とします。任意の $(a,b)\in\mathbb R^r\times Y$ に対し、仮定から $d\in X$、$s\in T$ を

$$
Bd=a,
\qquad
Ad-s=b
$$

となるように取れます。このとき

$$
\begin{aligned}
\langle\nu,a\rangle+\langle\mu,b\rangle
&=
\langle\nu,Bd\rangle
+
\langle\mu,Ad-s\rangle\\
&=
\langle A^*\mu+B^*\nu,d\rangle
-
\langle\mu,s\rangle\\
&=
-\langle\mu,s\rangle
\ge0.
\end{aligned}
$$

同じ議論を $(-a,-b)$ に適用すると逆向きの不等式も得られるので

$$
\langle\nu,a\rangle+\langle\mu,b\rangle=0
\qquad
(\forall(a,b)).
$$

従って $\mu=0$、$\nu=0$ です。

もし $T^\circ=\{0\}$ かつ $r=0$ なら $M=\{0\}$ で閉性は自明です。以下ではそれ以外の場合を考えます。

$$
S
=
\left\{
(\mu,\nu):
\mu\in T^\circ,\ 
\|\mu\|^2+\|\nu\|^2=1
\right\}
$$

と置くと $S$ は空でないコンパクト集合です。今示した異常乗数排除により

$$
A^*\mu+B^*\nu\ne0
\qquad((\mu,\nu)\in S).
$$

連続性とコンパクト性から、ある $c>0$ が存在して

$$
\|A^*\mu+B^*\nu\|
\ge
c
\sqrt{\|\mu\|^2+\|\nu\|^2}
$$

が全ての $\mu\in T^\circ$、$\nu\in\mathbb R^r$ で成り立ちます。

したがって $m_k\in M$、$m_k\to m$ とし

$$
m_k=A^*\mu_k+B^*\nu_k,
\qquad
\mu_k\in T^\circ
$$

と表せば、$(\mu_k,\nu_k)$ は有界です。部分列を取って

$$
\mu_k\to\mu\in T^\circ,
\qquad
\nu_k\to\nu
$$

とでき、

$$
m=A^*\mu+B^*\nu\in M.
$$

よって $M$ は閉凸錐です。

最後に $v\in L^\circ$ だが $v\notin M$ と仮定します。[閉凸錐の分離](../OPT2/index.md#thm-opt2-cone-separation)により、ある $d\in X$ が存在して

$$
\langle m,d\rangle\le0
\qquad(\forall m\in M),
$$

かつ

$$
\langle v,d\rangle>0
$$

となります。$\operatorname{range}B^*$ は正負の両方を含む線形部分空間なので、最初の不等式から $Bd=0$ です。また

$$
\langle\mu,Ad\rangle\le0
\qquad(\forall\mu\in T^\circ),
$$

なので

$$
Ad\in T^{\circ\circ}.
$$

$T$ は閉凸錐だから[閉凸錐の極双極定理](../OPT3/index.md#thm-opt3-polar-bipolar)により $T^{\circ\circ}=T$。従って $d\in L$ です。しかし $v\in L^\circ$ なら $\langle v,d\rangle\le0$ でなければならず矛盾します。

よって $L^\circ\subseteq M$ であり、両包含から主張を得ます。$\square$
<!-- proof-end -->

錐制約へ戻し、

$$
A=DG(x^*),
\qquad
B=DH(x^*),
\qquad
T=T_{-K}(G(x^*))
$$

とします。$-K$ は閉凸集合なので、[凸集合の接錐表示](../OPT3/index.md#thm-opt3-tangent-conic-hull)から $T$ は閉凸錐です。従って上の極錐表示定理を適用できます。また[法錐と接錐の極双対](../OPT3/index.md#thm-opt3-normal-tangent-polar)から

$$
T^\circ
=
N_{-K}(G(x^*)).
$$

従って Robinson 制約想定下では

$$
\boxed{
L_C(x^*)^\circ
=
DG(x^*)^*N_{-K}(G(x^*))
+
\operatorname{range}DH(x^*)^*
}.
$$

---

## 8. 一般化 KKT

<a id="thm-opt6a-generalized-kkt"></a>
<!-- formal-statement-start -->
> **定理（Robinson 制約想定下の一般化 KKT）**  
> 有限次元 Euclid 空間 $X=\mathbb R^n$、$Y$、閉凸錐 $K\subset Y$ と $C^1$ 級写像
>
$$
f:X\to\mathbb R,
\qquad
G:X\to Y,
\qquad
H:X\to\mathbb R^r
$$
>
> を考える。$x^*$ が
>
$$
\min_x f(x)
\quad\text{制約}\quad
G(x)\in-K,\qquad H(x)=0
$$
>
> の局所最小点で、$x^*$ で Robinson 制約想定が成立するとする。このとき、ある
>
$$
\lambda\in K^*,\qquad \nu\in\mathbb R^r
$$
>
> が存在して
>
$$
\boxed{
\nabla f(x^*)+DG(x^*)^*\lambda+DH(x^*)^*\nu=0,
}
$$
>
$$
\boxed{
\langle\lambda,G(x^*)\rangle=0
}
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[OPT6 の局所最適点の接方向条件](../OPT6/index.md#thm-opt6-local-tangent)から

$$
-\nabla f(x^*)\in T_C(x^*)^\circ.
$$

[Robinson 制約想定下の接錐公式](#thm-opt6a-robinson-tangent)により

$$
T_C(x^*)=L_C(x^*).
$$

さらに [Robinson 制約想定下の線形化錐の極錐表示](#thm-opt6a-linearized-polar)を

$$
A=DG(x^*),
\qquad
B=DH(x^*),
\qquad
T=T_{-K}(G(x^*))
$$

へ適用すると

$$
T_C(x^*)^\circ
=
L_C(x^*)^\circ
=
DG(x^*)^*N_{-K}(G(x^*))
+
\operatorname{range}DH(x^*)^*.
$$

従ってある $\lambda\in N_{-K}(G(x^*))$, $\nu\in\mathbb R^r$ が存在して

$$
-\nabla f(x^*)
=
DG(x^*)^*\lambda+DH(x^*)^*\nu.
$$

これが停留条件です。さらに[閉凸錐の法錐](#thm-opt6a-cone-normal)から

$$
\lambda\in K^*,\qquad
\langle\lambda,G(x^*)\rangle=0.
$$

よって一般化 KKT が成立します。$\square$
<!-- proof-end -->

---

## 9. 通常の KKT を復元する

$K=\mathbb R_+^m$ とします。自己双対性から

$$
\lambda\in K^*
\iff
\lambda_i\ge0.
$$

また $G(x^*)\in-\mathbb R_+^m$ なので $g_i(x^*)\le0$。相補性は

$$
\sum_i\lambda_i g_i(x^*)=0.
$$

各項は非正なので全て0、従って

$$
\lambda_i g_i(x^*)=0.
$$

停留条件も

$$
\nabla f(x^*)
+\sum_i\lambda_i\nabla g_i(x^*)
+\sum_j\nu_j\nabla h_j(x^*)=0
$$

となり、OPT5/OPT6 の KKT を完全に復元します。

<a id="thm-opt6a-robinson-mfcq"></a>
<!-- formal-statement-start -->
> **定理（通常制約では Robinson 制約想定と MFCQ が同値）**  
> $C^1$ 級関数 $g_1,\dots,g_m$ と $H=(h_1,\dots,h_r)$ による通常制約
>
$$
g_i(x)\le0\quad(i=1,\dots,m),
\qquad
H(x)=0
$$
>
> を、$K=\mathbb R_+^m$、$G=(g_1,\dots,g_m)$ として錐制約 $G(x)\in-K$ に書き直す。実行可能点 $x^*$ において、Robinson 制約想定が成立することと OPT6 の MFCQ が成立することは同値である。
<!-- formal-statement-end -->

### 証明の要点

非活性成分では $G_i(x^*)<0$ なので $T_{\mathbb R_-^m}(G(x^*))$ のその成分は自由です。活性成分だけを見ると、Robinson 条件は「等式線形化を任意に動かせ、同時に活性不等式を厳密に内側へ押す方向がある」ことになります。

<!-- proof-start -->
### 証明

活性集合を

$$
I=\{i:g_i(x^*)=0\}
$$

と置きます。$K=\mathbb R_+^m$ なので $-K=\mathbb R_-^m$ です。各成分について

$$
T_{\mathbb R_-}(g_i(x^*))
=
\begin{cases}
\mathbb R_-,& i\in I,\\
\mathbb R,& i\notin I
\end{cases}
$$

だから

$$
T_{-K}(G(x^*))
=
\{s\in\mathbb R^m:s_i\le0\ (i\in I)\},
$$

非活性成分には制限がありません。

まず MFCQ を仮定します。等式勾配の一次独立性から

$$
B:=DH(x^*):\mathbb R^n\to\mathbb R^r
$$

は全射です。またある $v$ が存在して

$$
Bv=0,
\qquad
\nabla g_i(x^*)^{\mathsf T}v<0
\quad(i\in I).
$$

Robinson 条件を示すため、任意の

$$
(a,b)\in\mathbb R^r\times\mathbb R^m
$$

を取ります。$B$ は全射なので $Bd_0=a$ を満たす $d_0$ が存在します。

$$
d=d_0+tv
$$

と置けば $Bd=a$ のままです。活性添字は有限個で、各 $i\in I$ について $\nabla g_i(x^*)^{\mathsf T}v<0$ なので、十分大きな $t>0$ を一つ選べば同時に

$$
\nabla g_i(x^*)^{\mathsf T}d-b_i\le0
\qquad(i\in I)
$$

となります。そこで

$$
s=DG(x^*)d-b
$$

と置けば $s_i\le0$ $(i\in I)$、非活性成分には条件がないので

$$
s\in T_{-K}(G(x^*)).
$$

従って

$$
\bigl(Bd,DG(x^*)d-s\bigr)=(a,b).
$$

$(a,b)$ は任意だったから Robinson 制約想定が成立します。

逆に Robinson 制約想定を仮定します。任意の $a\in\mathbb R^r$ に対して右辺 $(a,0)$ を実現できるので、ある $d$ が $DH(x^*)d=a$ を満たします。従って $DH(x^*)$ は全射で、等式勾配は一次独立です。

次に $b\in\mathbb R^m$ を

$$
b_i=
\begin{cases}
-1,&i\in I,\\
0,&i\notin I
\end{cases}
$$

と置き、右辺 $(0,b)$ を Robinson 条件で実現します。するとある $v$ と $s\in T_{-K}(G(x^*))$ が存在して

$$
DH(x^*)v=0,
\qquad
DG(x^*)v-s=b.
$$

活性 $i\in I$ では $s_i\le0$ なので

$$
\nabla g_i(x^*)^{\mathsf T}v
=
b_i+s_i
\le-1<0.
$$

従って $v$ は MFCQ 方向であり、MFCQ が成立します。$\square$
<!-- proof-end -->

したがって OPT6A は OPT6 の局所理論を一般錐へ拡張したものであり、通常制約へ戻れば新しい条件を勝手に追加しているわけではありません。

---

## 10. 半正定値錐の例

対称 $2\times2$ 行列全体の空間を $\mathbb S^2$ とし、Frobenius 内積

$$
\langle A,B\rangle
=
\operatorname{tr}(AB)
$$

を入れます。半正定値錐を

$$
\mathbb S_+^2
=
\{S\in\mathbb S^2:v^{\mathsf T}Sv\ge0\ (\forall v\in\mathbb R^2)\}
$$

とします。

<a id="thm-opt6a-psd-self-dual"></a>
<!-- formal-statement-start -->
> **定理（2×2 半正定値錐の自己双対性）**  
> Frobenius 内積に関して
>
$$
\boxed{
(\mathbb S_+^2)^*
=
\mathbb S_+^2
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

双対錐側から半正定値性を出すには、半正定値な rank-one 行列 $vv^{\mathsf T}$ を試します。逆向きでは任意の $2\times2$ 半正定値行列を rank-one 半正定値行列の和に分解し、各項との内積が非負であることを確認します。

<!-- proof-start -->
### 証明

まず $\Lambda\in(\mathbb S_+^2)^*$ とします。任意の $v\in\mathbb R^2$ に対して $vv^{\mathsf T}\succeq0$ なので

$$
0
\le
\langle\Lambda,vv^{\mathsf T}\rangle
=
\operatorname{tr}(\Lambda vv^{\mathsf T})
=
v^{\mathsf T}\Lambda v.
$$

従って $\Lambda\succeq0$ です。よって

$$
(\mathbb S_+^2)^*
\subseteq
\mathbb S_+^2.
$$

逆に $\Lambda\succeq0$ とし、任意の

$$
S=
\begin{pmatrix}
p&q\\
q&r
\end{pmatrix}
\succeq0
$$

を取ります。$p>0$ のとき

$$
u=
\begin{pmatrix}
\sqrt p\\
q/\sqrt p
\end{pmatrix},
\qquad
w=
\begin{pmatrix}
0\\
\sqrt{r-q^2/p}
\end{pmatrix}
$$

と置きます。$S\succeq0$ なので $p=e_1^{\mathsf T}Se_1\ge0$、$r=e_2^{\mathsf T}Se_2\ge0$ です。さらに $p>0$ の場合、ベクトル

$$
z=
\begin{pmatrix}
-q/p\\
1
\end{pmatrix}
$$

を代入すると

$$
0
\le
z^{\mathsf T}Sz
=
r-\frac{q^2}{p}.
$$

従って $r-q^2/p\ge0$ で平方根は実数です。直接計算すると

$$
S=uu^{\mathsf T}+ww^{\mathsf T}.
$$

$p=0$ の場合、任意の $t\in\mathbb R$ に対して

$$
\begin{pmatrix}
1&t
\end{pmatrix}
S
\begin{pmatrix}
1\\t
\end{pmatrix}
=
2qt+rt^2
\ge0.
$$

$q\ne0$ なら $t$ を0に十分近く $q$ と逆符号に取ると左辺が負になるため、$q=0$ です。従って

$$
S=
\begin{pmatrix}
0\\
\sqrt r
\end{pmatrix}
\begin{pmatrix}
0&\sqrt r
\end{pmatrix}
$$

と rank-one に書けます。

したがっていずれの場合も

$$
S=\sum_{j=1}^N v_jv_j^{\mathsf T}
$$

と表せます。ゆえに

$$
\begin{aligned}
\langle\Lambda,S\rangle
&=
\sum_j
\operatorname{tr}(\Lambda v_jv_j^{\mathsf T})\\
&=
\sum_j
v_j^{\mathsf T}\Lambda v_j
\ge0.
\end{aligned}
$$

従って $\Lambda\in(\mathbb S_+^2)^*$ です。逆包含も示され、自己双対性を得ます。$\square$
<!-- proof-end -->

この自己双対錐を制約に使います。$X=\mathbb R$、$K=\mathbb S_+^2$ とし

$$
G(x)=
\begin{pmatrix}
x-1&0\\
0&-x
\end{pmatrix}.
$$

制約 $G(x)\preceq0$ は

$$
x-1\le0,\qquad -x\le0,
$$

すなわち $0\le x\le1$ と同値です。

上の自己双対性から、双対乗数 $\Lambda$ は

$$
\Lambda\succeq0
$$

で、相補性は

$$
\operatorname{tr}(\Lambda G(x^*))=0.
$$

成分不等式の「非負乗数×slack=0」が、行列では「半正定値乗数と slack 行列の内積が0」に置き換わります。これが半正定値計画の KKT の入口です。

---

## 11. 演習 Level A

### OPT6A-A01 不等式を錐制約へまとめる

- Level: A
- 目安時間: 8分

$g_i(x)\le0$ $(i=1,\ldots,m)$ を一つの錐制約に書き、双対乗数の条件を述べよ。

<!-- solution-start -->
#### 詳細解答

$$
G(x)=(g_1(x),\ldots,g_m(x)),\qquad K=\mathbb R_+^m
$$

と置けば $G(x)\in-K$。非負直交錐は自己双対なので

$$
\lambda\in K^*
\iff
\lambda_i\ge0\quad(\forall i).
$$
<!-- solution-end -->

### OPT6A-A02 法錐から相補性を読む

- Level: A
- 目安時間: 10分

$K=\mathbb R_+^2$, $y=(-1,0)$ とする。$N_{-K}(y)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[閉凸錐の法錐](#thm-opt6a-cone-normal)から $\lambda\ge0$ かつ

$$
\lambda^{\mathsf T}y=-\lambda_1=0.
$$

従って $\lambda_1=0$, $\lambda_2\ge0$ で

$$
\boxed{N_{-K}(y)=\{(0,t):t\ge0\}}.
$$
<!-- solution-end -->

### OPT6A-A03 一般化 Lagrangian を微分する

- Level: A
- 目安時間: 10分

$G:\mathbb R^n\to\mathbb R^m$, $H:\mathbb R^n\to\mathbb R^r$ に対する一般化 Lagrangian を $x$ で微分せよ。

<!-- solution-start -->
#### 詳細解答

$$
L=f+\langle\lambda,G\rangle+\langle\nu,H\rangle
$$

なので連鎖律から

$$
\boxed{
\nabla_xL
=
\nabla f+DG^*\lambda+DH^*\nu.
}
$$

$DG^*\lambda$, $DH^*\nu$ はともに $\mathbb R^n$ のベクトルで、目的関数の勾配と型が一致します。
<!-- solution-end -->

### OPT6A-A04 Robinson 制約想定の成否

- Level: A
- 目安時間: 12分

$G(x)=x^2$, $K=\mathbb R_+$, $x^*=0$ について Robinson 制約想定が失敗することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$DG(0)=0$、また

$$
T_{-K}(G(0))=T_{\mathbb R_-}(0)=\mathbb R_-.
$$

従って Robinson の線形化像は

$$
\{0\cdot d-s:s\in\mathbb R_-\}
=
\mathbb R_+.
$$

これは $\mathbb R$ 全体ではありません。従って Robinson 制約想定は失敗します。一次微分 $DG(0)$ が消え、正負両方向の摂動を吸収できないことが原因です。
<!-- solution-end -->

---

## 12. 演習 Level B

### OPT6A-B01 一般化 KKT から通常 KKT を復元する

- Level: B
- 目安時間: 15分

$K=\mathbb R_+^m$ として、[一般化 KKT](#thm-opt6a-generalized-kkt)から $\lambda_i\ge0$ と $\lambda_i g_i(x^*)=0$ を導け。

<!-- solution-start -->
#### 詳細解答

自己双対性から $\lambda\in K^*$ は $\lambda_i\ge0$ と同値です。実行可能性から $g_i(x^*)\le0$。一般化相補性は

$$
\sum_i\lambda_i g_i(x^*)=0.
$$

各項は非正です。有限個の非正数の和が0なので各項が0、従って

$$
\boxed{\lambda_i g_i(x^*)=0\quad(\forall i)}.
$$
<!-- solution-end -->

### OPT6A-B02 半正定値錐の相補性

- Level: B
- 目安時間: 18分

$K=\mathbb S_+^2$ とし、

$$
Y=
\begin{pmatrix}
-1&0\\0&0
\end{pmatrix}
\in-K.
$$

一般の対称行列

$$
\Lambda=
\begin{pmatrix}
a&c\\
c&b
\end{pmatrix}
$$

が $N_{-K}(Y)$ に入るための条件を求めよ。

<!-- solution-start -->
#### 詳細解答

[$2\times2$ 半正定値錐の自己双対性](#thm-opt6a-psd-self-dual)から、まず

$$
\Lambda\succeq0.
$$

さらに[閉凸錐の法錐](#thm-opt6a-cone-normal)による相補性は

$$
\langle\Lambda,Y\rangle
=
\operatorname{tr}(\Lambda Y)
=
-a
=
0,
$$

なので $a=0$ です。

半正定値性から任意の $t\in\mathbb R$ に対して

$$
\begin{pmatrix}
1&t
\end{pmatrix}
\Lambda
\begin{pmatrix}
1\\t
\end{pmatrix}
=
2ct+bt^2
\ge0.
$$

もし $c\ne0$ なら、$t$ を0に十分近く、$c$ と逆符号に取ると $2ct+bt^2<0$ となるため矛盾します。従って $c=0$。残る条件は $b\ge0$ です。よって

$$
\boxed{
N_{-K}(Y)
=
\left\{
\begin{pmatrix}
0&0\\
0&b
\end{pmatrix}
:b\ge0
\right\}.
}
$$
<!-- solution-end -->

### OPT6A-B03 Robinson と MFCQ の対応

- Level: B
- 目安時間: 20分

通常制約

$$
g_1(x)=x_1\le0,\qquad
g_2(x)=2x_1\le0,\qquad
h(x)=x_2=0
$$

を原点で考える。LICQ、MFCQ を判定し、Robinson 制約想定との対応を説明せよ。

<!-- solution-start -->
#### 詳細解答

活性勾配は

$$
\nabla g_1=(1,0)^{\mathsf T},\quad
\nabla g_2=(2,0)^{\mathsf T},\quad
\nabla h=(0,1)^{\mathsf T}.
$$

$\nabla g_1$ と $\nabla g_2$ が一次従属なので LICQ は失敗します。

一方 $v=(-1,0)$ とすれば

$$
\nabla h^{\mathsf T}v=0,\qquad
\nabla g_1^{\mathsf T}v=-1<0,\qquad
\nabla g_2^{\mathsf T}v=-2<0.
$$

等式勾配も非零なので MFCQ は成立します。通常制約では MFCQ と Robinson 制約想定は同値なので Robinson 制約想定も成立します。この例は Robinson 制約想定が LICQ より弱い正則性であることも示します。
<!-- solution-end -->

---

## 13. 演習 Level C

### OPT6A-C01 錐 KKT を行列制約で再構成する

- Level: C
- 目安時間: 35分

$$
\min_{x\in\mathbb R} f(x)=-x
$$

制約

$$
G(x)=
\begin{pmatrix}
x-1&0\\
0&-x
\end{pmatrix}
\preceq0
$$

を考える。

1. 実行可能集合と最適解を求めよ。
2. $K=\mathbb S_+^2$ として一般化 Lagrangian を書け。
3. 一般の対称乗数
   $$
   \Lambda=
   \begin{pmatrix}
   a&c\\
   c&b
   \end{pmatrix}
   \succeq0
   $$
   に対する停留条件と相補性を解け。
4. 通常の二本の不等式として書いた KKT と対応させよ。

<!-- solution-start -->
#### 詳細解答

行列不等式は対角成分から

$$
x-1\le0,\qquad -x\le0,
$$

従って実行可能集合は $[0,1]$。$f(x)=-x$ なので

$$
\boxed{x^*=1}.
$$

一般化 Lagrangian は Frobenius 内積を用いて

$$
L(x,\Lambda)
=
-x+\langle\Lambda,G(x)\rangle.
$$

一般の対称乗数

$$
\Lambda=
\begin{pmatrix}
a&c\\
c&b
\end{pmatrix}
$$

に対して、$G(x)$ は対角行列なので

$$
\langle\Lambda,G(x)\rangle
=
a(x-1)-bx.
$$

従って

$$
L=-x+a(x-1)-bx
$$

で、停留条件は

$$
-1+a-b=0.
$$

$x^*=1$ では

$$
G(1)=
\begin{pmatrix}
0&0\\0&-1
\end{pmatrix}.
$$

相補性は

$$
\langle\Lambda,G(1)\rangle
=
-b
=
0,
$$

従って $b=0$ です。さらに $\Lambda\succeq0$ かつ $b=0$ なら、B02 と同じ二次形式の議論から $c=0$ です。停留条件から $a=1$。よって一般の対称乗数から出発しても

$$
\boxed{
\Lambda^*
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
}
$$

だけが残ります。

通常制約では $g_1=x-1\le0$, $g_2=-x\le0$。$x^*=1$ では第1制約が活性、第2制約は非活性なので $\lambda_2=0$、停留条件 $-1+\lambda_1-\lambda_2=0$ から $\lambda_1=1$。これは $(a,b)=(1,0)$ と完全に一致します。
<!-- solution-end -->

---

## 14. 次に進む

これで通常 KKT から一般錐制約までがつながりました。次は **OPT7「滑らかな凸最適化」** へ進み、Lipschitz 連続勾配、descent lemma、強凸性、最急降下法、Newton 法と収束速度を扱います。
