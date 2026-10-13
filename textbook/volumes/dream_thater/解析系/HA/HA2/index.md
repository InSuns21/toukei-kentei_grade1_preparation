# HA2 弱Lpと補間

[HA1の最大作用素の弱 $(1,1)$ 評価](../HA1/index.md#thm-ha1-weak11)は、$Mf$ が大きくなる点の測度を抑えました。一方、[強い $(1,1)$ 評価の失敗](../HA1/index.md#prop-ha1-no-strong11)から、同じ評価を $L^1$ ノルムの有界性と言い換えることはできません。

では、「閾値を超える点が少ない」という情報と「有界関数は有界関数へ写る」という情報を合わせれば、途中の $L^p$ で積分可能性を証明できるでしょうか。これに答えるのが**補間**です。本章では、まず大きい値の現れる頻度を記録する方法を定義し、その情報を使って Marcinkiewicz 補間を証明します。その後、線形作用素に限ると、複素解析からさらに一般の入出力指数を補間できることを示します。

以下、測度空間は特記しない限り $\sigma$ 有限とし、$\mu$ と $\nu$ をそれぞれ入力と出力の測度とします。測度が違う場合でも使えるように、$T$ は入力側の可測関数を出力側の可測関数へ送るものとします。積分やノルムはほとんど至る所の同値類に対して解釈します。

## 1. 大きい値が占める測度を記録する

$L^p$ ノルムは $|f|^p$ を直接積分します。これとは別に、どの高さを超える点がどれだけあるかを記録しても、積分の情報を復元できます。この見方が補間の出発点です。

<a id="def-ha2-distribution"></a>
<!-- formal-statement-start -->
> **定義（分布関数）**  
> 測度空間 $(X,\mu)$ 上の可測関数 $f$ と $\lambda>0$ に対し、分布関数を

$$
d_f(\lambda):=\mu(\{x\in X:|f(x)|>\lambda\})
$$

> とする。値 $+\infty$ を許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha2-distribution -->
**定義の確認**　$X=(0,3)$ にLebesgue測度を入れ、$f=2\boldsymbol{1}_{(0,1)}+\boldsymbol{1}_{(1,3)}$ とします。$0<\lambda<1$ なら長さ3の全体、$1\le\lambda<2$ なら長さ1の部分だけが超水準集合です。$\lambda\ge2$ では空集合です。等号を含むかどうかが閾値1、2で効きます。
<!-- definition-example-end -->

積分の各点での値を、高さ方向に積み上げると次の公式になります。

<a id="prop-ha2-layercake"></a>
<!-- formal-statement-start -->
> **命題（layer-cake公式）**  
> 任意の測度空間 $(X,\mu)$、可測関数 $f$、$0<p<\infty$ に対し、両辺に $+\infty$ を許して

$$
\int_X |f|^p\,d\mu
=p\int_0^\infty \lambda^{p-1}d_f(\lambda)\,d\lambda
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

非負数 $a$ を $a^p=\int_0^a p\lambda^{p-1}\,d\lambda$ と書き、$x$ と $\lambda$ の二重積分を入れ替えます。

<!-- proof-start -->
### 証明

各 $x$ について、$|f(x)|$ が有限なら

$$
|f(x)|^p
=\int_0^\infty p\lambda^{p-1}
\boldsymbol{1}_{\{\lambda<|f(x)|\}}\,d\lambda.
$$

$|f(x)|=+\infty$ でも両辺は $+\infty$ として一致します。被積分関数が非負なので、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)により

$$
\begin{aligned}
\int_X|f(x)|^p\,d\mu(x)
&=\int_X\int_0^\infty
p\lambda^{p-1}\boldsymbol{1}_{\{|f(x)|>\lambda\}}
\,d\lambda\,d\mu(x)\\
&=\int_0^\infty p\lambda^{p-1}
\left(\int_X\boldsymbol{1}_{\{|f(x)|>\lambda\}}\,d\mu(x)\right)d\lambda\\
&=p\int_0^\infty\lambda^{p-1}d_f(\lambda)\,d\lambda.
\end{aligned}
$$
<!-- proof-end -->

上の例では $p=2$ とすると、公式の右辺は

$$
2\int_0^1 3\lambda\,d\lambda
+2\int_1^2\lambda\,d\lambda
=3+3=6.
$$

直接積分しても $\int_0^1 4\,dx+\int_1^3 1\,dx=6$ です。

<a id="def-ha2-weak-lp"></a>
<!-- formal-statement-start -->
> **定義（弱Lp空間）**  
> $1\le p<\infty$ とする。可測関数 $f$ に対して

$$
\|f\|_{L^{p,\infty}(X)}
:=\sup_{\lambda>0}\lambda\,d_f(\lambda)^{1/p}
$$

> と置く。この値が有限である関数の同値類の集合を $L^{p,\infty}(X)$ とする。これは一般にノルムではなく準ノルムである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha2-weak-lp -->
**定義の確認**　$\mathbb R^d$ の単位球で $f(x)=|x|^{-d/p}$、球外で0、原点で任意の値を取るとします。$v_d=|B(0,1)|$ とすると、$\lambda\ge1$ では

$$
d_f(\lambda)=v_d\lambda^{-p},
$$

$0<\lambda<1$ では $d_f(\lambda)=v_d$ です。したがって $\|f\|_{L^{p,\infty}}=v_d^{1/p}$ ですが、

$$
\int_{\mathbb R^d}|f|^p\,dx
=\int_{B(0,1)}|x|^{-d}\,dx=+\infty
$$

です。弱 $L^p$ は強い $L^p$ より真に広い空間になり得ます。
<!-- definition-example-end -->

<a id="prop-ha2-weak-properties"></a>
<!-- formal-statement-start -->
> **命題（強型から弱型への包含と準三角不等式）**  
> $1\le p<\infty$、$f,g$ を可測関数とする。このとき

$$
\|f\|_{L^{p,\infty}}\le\|f\|_p,\qquad
\|f+g\|_{L^{p,\infty}}
\le2\bigl(\|f\|_{L^{p,\infty}}+\|g\|_{L^{p,\infty}}\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

第1式は $\{|f|>\lambda\}$ 上での積分評価、第2式は $|f+g|>2\lambda$ なら少なくとも一方の絶対値が $\lambda$ を超えるという包含から出ます。

<!-- proof-start -->
### 証明

$\lambda>0$ なら

$$
\lambda^p d_f(\lambda)
\le\int_{\{|f|>\lambda\}}|f|^p\,d\mu
\le\|f\|_p^p.
$$

$p$ 乗根を取り $\lambda$ で上限を取ると第1式です。また

$$
\{|f+g|>2\lambda\}
\subset\{|f|>\lambda\}\cup\{|g|>\lambda\}
$$

なので $d_{f+g}(2\lambda)\le d_f(\lambda)+d_g(\lambda)$ です。$p\ge1$ なら $(a+b)^{1/p}\le a^{1/p}+b^{1/p}$ ですから

$$
\begin{aligned}
2\lambda\,d_{f+g}(2\lambda)^{1/p}
&\le2\lambda\bigl(d_f(\lambda)+d_g(\lambda)\bigr)^{1/p}\\
&\le2\lambda d_f(\lambda)^{1/p}
+2\lambda d_g(\lambda)^{1/p}\\
&\le2\bigl(\|f\|_{L^{p,\infty}}+\|g\|_{L^{p,\infty}}\bigr).
\end{aligned}
$$

$2\lambda$ が全正数を動くので結論を得ます。
<!-- proof-end -->

## 2. 劣線形性と二つの端点

作用素 $T$ が線形でなくても、和を評価する三角不等式に似た性質があれば補間できます。最大作用素はその典型です。

<a id="def-ha2-sublinear"></a>
<!-- formal-statement-start -->
> **定義（劣線形作用素）**  
> 関数空間の和として定義された作用素 $T$ が、任意の定義可能な $f,g$ と複素数 $a$ について、ほとんど至る所で

$$
|T(f+g)|\le|Tf|+|Tg|,\qquad |T(af)|=|a|\,|Tf|
$$

> を満たすとき、$T$ を劣線形という。出力 $Tf$ は一般に複素値でもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha2-sublinear -->
**定義の確認**　[HA1の中心付き最大作用素](../HA1/index.md#prop-ha1-basic-maximal)は各球で $|f+g|\le|f|+|g|$ を平均し上限を取るため劣線形です。反対に、$T(f)=\|f\|_1^2$ を定数値として出力する規則は $|T(2f)|=4|Tf|$ となり、要求される一次斉次性を満たしません。
<!-- definition-example-end -->

<a id="def-ha2-type"></a>
<!-- formal-statement-start -->
> **定義（強型・弱型(p,q)）**  
> $1\le p\le\infty$、$1\le q<\infty$ とする。作用素 $T$ が強型 $(p,q)$ とは、定義域中のすべての $f\in L^p(X)$ に対して

$$
\|Tf\|_{L^q(Y)}\le A\|f\|_{L^p(X)}
$$

> となる有限定数 $A$ があることをいう。弱型 $(p,q)$ とは

$$
\nu(\{|Tf|>\lambda\})
\le\left(\frac{A\|f\|_p}{\lambda}\right)^q
\quad(\lambda>0)
$$

> となることをいう。$q=\infty$ の端点では「弱型」とは呼ばず、強型 $(p,\infty)$ を $\|Tf\|_\infty\le A\|f\|_p$ で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha2-type -->
**定義の確認**　恒等作用素 $I$ は任意の $1\le p\le\infty$ で強型 $(p,p)$、定数1です。[弱型包含](#prop-ha2-weak-properties)から $p<\infty$ では弱型 $(p,p)$ でもあります。一方、HA1の $M$ は弱型 $(1,1)$ であっても一般には強型 $(1,1)$ ではありません。
<!-- definition-example-end -->

## 3. Marcinkiewicz補間を分布関数から証明する

強型推定を弱型だけから得るには、関数を閾値より大きい部分と小さい部分に分けます。$p_0<p<p_1$ のとき、大きい部分は $L^{p_0}$、小さい部分は $L^{p_1}$ に収まり、両端点を別々に適用できます。

<a id="thm-ha2-marc-finite"></a>
<!-- formal-statement-start -->
> **定理（Marcinkiewicz補間：有限端点）**  
> $1\le p_0<p<p_1<\infty$ とし、$T$ を $L^{p_0}(X)+L^{p_1}(X)$ から出力可測関数への劣線形作用素とする。$T$ が弱型 $(p_i,p_i)$ で定数 $A_i\ge0$ を持つと仮定する（$i=0,1$）。すると $T$ は強型 $(p,p)$ で、任意の $c>0$ に対して

$$
\|Tf\|_p^p
\le p\,2^p\left(
\frac{A_0^{p_0}c^{-(p-p_0)}}{p-p_0}
+\frac{A_1^{p_1}c^{p_1-p}}{p_1-p}
\right)\|f\|_p^p.
$$

> 入出力の測度空間は同一でなくてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

作用素値の閾値を $2\lambda$ とし、入力を $c\lambda$ で切ります。劣線形性で二つの超水準集合へ分解した後、[layer-cake公式](#prop-ha2-layercake)と非負積分の順序交換を行います。二つの $\lambda$ 積分の指数が収束する場所で $p_0<p<p_1$ が使われます。

<!-- proof-start -->
### 証明

$f\in L^p(X)$、$\lambda>0$ を固定し、

$$
f_0^\lambda=f\boldsymbol{1}_{\{|f|>c\lambda\}},
\qquad
f_1^\lambda=f\boldsymbol{1}_{\{|f|\le c\lambda\}}
$$

と置きます。$p_0<p$ なので大きい部分について

$$
\int|f_0^\lambda|^{p_0}\,d\mu
=\int_{\{|f|>c\lambda\}}|f|^{p_0}\,d\mu
\le(c\lambda)^{p_0-p}\int|f|^p\,d\mu<\infty.
$$

同様に $p<p_1$ から

$$
\int|f_1^\lambda|^{p_1}\,d\mu
\le(c\lambda)^{p_1-p}\int|f|^p\,d\mu<\infty.
$$

したがって二つの端点推定をそれぞれ適用できます。$f=f_0^\lambda+f_1^\lambda$ だから劣線形性と二つの弱型推定により

$$
\begin{aligned}
d_{Tf}(2\lambda)
&\le d_{Tf_0^\lambda}(\lambda)
+d_{Tf_1^\lambda}(\lambda)\\
&\le A_0^{p_0}\lambda^{-p_0}
\int_{\{|f|>c\lambda\}}|f|^{p_0}\,d\mu\\
&\quad +A_1^{p_1}\lambda^{-p_1}
\int_{\{|f|\le c\lambda\}}|f|^{p_1}\,d\mu.
\end{aligned}
$$

[layer-cake公式](#prop-ha2-layercake)を $Tf$ と指数 $p$ に使い、$t=2\lambda$ と置換すると

$$
\|Tf\|_p^p
=p\,2^p\int_0^\infty\lambda^{p-1}d_{Tf}(2\lambda)\,d\lambda.
$$

ここへ先の上界を代入します。第1項では $|f(x)|>c\lambda$ は $0<\lambda<|f(x)|/c$ と同じです。$p-p_0>0$ なので [Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)を使って

$$
\begin{aligned}
&\int_0^\infty\lambda^{p-p_0-1}
\int_{\{|f|>c\lambda\}}|f|^{p_0}\,d\mu\,d\lambda\\
&=\int_X|f(x)|^{p_0}
\left(\int_0^{|f(x)|/c}\lambda^{p-p_0-1}\,d\lambda\right)d\mu(x)\\
&=\frac{c^{-(p-p_0)}}{p-p_0}\int_X|f(x)|^p\,d\mu(x).
\end{aligned}
$$

第2項では $|f(x)|\le c\lambda$ は $\lambda\ge|f(x)|/c$ と同じです。$p-p_1<0$ より

$$
\begin{aligned}
&\int_0^\infty\lambda^{p-p_1-1}
\int_{\{|f|\le c\lambda\}}|f|^{p_1}\,d\mu\,d\lambda\\
&=\int_X|f(x)|^{p_1}
\left(\int_{|f(x)|/c}^\infty\lambda^{p-p_1-1}\,d\lambda\right)d\mu(x)\\
&=\frac{c^{p_1-p}}{p_1-p}\int_X|f(x)|^p\,d\mu(x).
\end{aligned}
$$

$|f(x)|=0$ の場所は内側を最初から0として積分し、最後の式も0と解釈します。これらを戻して定理の係数を得ます。右辺が有限なので $Tf\in L^p(Y)$ も結論します。
<!-- proof-end -->

この証明では、閾値 $\lambda$ に応じて分割が変わります。一度だけ決めた分割にすべての閾値を適用しても、両端の指数はうまく積分されません。また $p=p_0$ や $p=p_1$ では分母が消えるため、この定理は**開区間の中間指数に対してのみ**主張しています。

<a id="thm-ha2-marc-infinity"></a>
<!-- formal-statement-start -->
> **定理（Marcinkiewicz補間：L∞端点）**  
> $1\le p_0<p<\infty$、$T:L^{p_0}(X)+L^\infty(X)\to$ 出力可測関数が劣線形とする。$T$ は弱型 $(p_0,p_0)$、定数 $A_0$、および強型 $(\infty,\infty)$、定数 $A_\infty>0$ を満たすと仮定する。このとき強型 $(p,p)$ であり、

$$
\|Tf\|_p^p
\le\frac{p\,2^p}{p-p_0}
A_0^{p_0}(2A_\infty)^{p-p_0}\|f\|_p^p.
$$
<!-- formal-statement-end -->

### 証明の見取り図

小さい値の部分は $L^\infty$ 評価だけで $\lambda$ 未満に抑えます。その分、超水準集合の測度は大きい部分だけで評価でき、有限端点の証明の第1項だけが残ります。

<!-- proof-start -->
### 証明

$c=(2A_\infty)^{-1}$ とし、有限端点の場合と同様に $f=f_0^\lambda+f_1^\lambda$ と分けます。$\|f_1^\lambda\|_\infty\le c\lambda$ だから

$$
\|Tf_1^\lambda\|_\infty
\le A_\infty c\lambda=\lambda/2.
$$

従って $\{|Tf|>2\lambda\}\subset\{|Tf_0^\lambda|>\lambda\}$ がほとんど至る所で成立します（$|Tf|\le|Tf_0^\lambda|+|Tf_1^\lambda|$）。弱型 $(p_0,p_0)$ から

$$
d_{Tf}(2\lambda)
\le A_0^{p_0}\lambda^{-p_0}
\int_{\{|f|>c\lambda\}}|f|^{p_0}\,d\mu.
$$

これを [layer-cake公式](#prop-ha2-layercake)に代入し、前定理の第1項と同じ非負積分の順序交換を行うと

$$
\begin{aligned}
\|Tf\|_p^p
&\le p2^p A_0^{p_0}
\int_X|f(x)|^{p_0}
\int_0^{|f(x)|/c}\lambda^{p-p_0-1}\,d\lambda\,d\mu(x)\\
&=\frac{p2^pA_0^{p_0}}{p-p_0}
c^{-(p-p_0)}\|f\|_p^p.
\end{aligned}
$$

$c^{-1}=2A_\infty$ を代入して結論を得ます。
<!-- proof-end -->

$A_\infty=0$ なら $T$ は $L^\infty$ 上で0であり、$f_0^\lambda$ の超水準集合を任意の閾値で評価する極限を取れば $Tf=0$ が $L^p$ 上でも成り立ちます。したがってこの場合も強型 $(p,p)$ です。

## 4. HA1の最大作用素へ戻る

<a id="cor-ha2-maximal-strong"></a>
<!-- formal-statement-start -->
> **系（Hardy--Littlewood最大作用素の強いLp評価）**  
> $d\ge1$、$1<p\le\infty$ に対し、$\mathbb R^d$ 上の中心付き Hardy--Littlewood 最大作用素 $M$ は強型 $(p,p)$ である。$1<p<\infty$ では例えば

$$
\|Mf\|_p^p
\le \frac{p\,2^{2p-1}\,3^d}{p-1}\|f\|_p^p
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[HA1の弱 $(1,1)$ 評価](../HA1/index.md#thm-ha1-weak11)で $p_0=1$, $A_0=3^d$ とし、[最大作用素の $L^\infty$ 評価](../HA1/index.md#prop-ha1-basic-maximal)で $A_\infty=1$ とします。[Marcinkiewiczの無限端点版](#thm-ha2-marc-infinity)がそのまま使えます。

<!-- proof-start -->
### 証明

最大作用素 $M$ は[劣線形](../HA1/index.md#prop-ha1-basic-maximal)で、$L^1+L^\infty$ 上で定義できます。$f\in L^p$、$1<p<\infty$ なら各 $\lambda>0$ に対する閾値分割は $L^1$ 部分と $L^\infty$ 部分に収まります。

[弱型評価](../HA1/index.md#thm-ha1-weak11)の定数を $A_0=3^d$、[$L^\infty$ 評価](../HA1/index.md#prop-ha1-basic-maximal)の定数を $A_\infty=1$ とし、[無限端点補間定理](#thm-ha2-marc-infinity)に $p_0=1$ を入れると

$$
\begin{aligned}
\|Mf\|_p^p
&\le\frac{p\,2^p}{p-1}(3^d)^1
(2\cdot1)^{p-1}\|f\|_p^p\\
&=\frac{p\,2^{2p-1}\,3^d}{p-1}\|f\|_p^p.
\end{aligned}
$$

$p=\infty$ の場合は [HA1の直接の評価](../HA1/index.md#prop-ha1-basic-maximal)です。
<!-- proof-end -->

$p$ を1へ近づけると係数が発散します。これは証明の不備ではなく、HA1で確認した強型 $(1,1)$ の失敗と整合しています。ここまでの補間は、入力と出力の指数が**同じ**場合を扱いました。異なる指数を持つ線形作用素には次の複素補間が必要です。

## 5. 複素補間のための三線定理

[CA3の最大値原理](../../CA/CA3/index.md#thm-ca3-maximum-modulus)は有界領域の正則関数の最大値を境界で抑えます。今度は無限に縦長の帯の左右端の評価から、中間線上の評価を作りたいところです。上下方向を切るだけでは水平端の制御が残るので、補助関数に Gaussian 型の減衰を掛けます。

<a id="lem-ha2-three-lines"></a>
<!-- formal-statement-start -->
> **補題（三線定理：有界正則関数版）**  
> $S=\{z\in\mathbb C:0<\operatorname{Re}z<1\}$ とし、$F$ は閉帯 $\overline S$ で連続、$S$ で正則かつ閉帯上で有界とする。$M_0,M_1>0$ について

$$
|F(it)|\le M_0,\qquad |F(1+it)|\le M_1
\quad(t\in\mathbb R)
$$

> なら、$0\le\theta\le1$ で

$$
|F(\theta)|\le M_0^{1-\theta}M_1^\theta.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$F$ を境界評価で正規化し、$e^{\varepsilon(z^2-z)}$ を掛けます。この因子の絶対値は上下方向で $e^{-\varepsilon t^2}$ のように減衰します。有限長方形に[最大値原理](../../CA/CA3/index.md#thm-ca3-maximum-modulus)を適用し、最後に $\varepsilon\downarrow0$ とします。

<!-- proof-start -->
### 証明

正の実数の対数を使い

$$
G_\varepsilon(z)
=F(z)M_0^{z-1}M_1^{-z}
\exp\!\bigl(\varepsilon(z^2-z)\bigr)
$$

と置きます。$G_\varepsilon$ は閉帯で連続、内部で正則です。$z=x+it$ に対して

$$
\operatorname{Re}(z^2-z)=x^2-x-t^2
$$

なので、左右の境界 $x=0,1$ では $\lvert G_\varepsilon(z)\rvert\le e^{-\varepsilon t^2}\le1$ です。

元の $F$ は閉帯上で有界であり、$M_0^{x-1}M_1^{-x}$ は $0\le x\le1$ で上下に有界です。従って、水平辺 $t=\pm R$ では

$$
|G_\varepsilon(x\pm iR)|
\le C\exp\!\bigl(\varepsilon(x^2-x-R^2)\bigr)
\le C e^{-\varepsilon R^2},
$$

ここで $C$ は $R$ に依存しません。$R$ を十分大きくすれば水平辺でも絶対値が1以下です。[最大値原理](../../CA/CA3/index.md#thm-ca3-maximum-modulus)を長方形 $\{0\le x\le1,\ |t|\le R\}$ に適用すると、その内部でも $|G_\varepsilon|\le1$ です。特に $z=\theta$ として

$$
|F(\theta)|
\le M_0^{1-\theta}M_1^\theta
\exp\!\bigl(\varepsilon(\theta-\theta^2)\bigr).
$$

$\varepsilon\downarrow0$ とすれば結論です。$\theta=0,1$ はもともとの境界仮定です。
<!-- proof-end -->

この補題を使うときは、実軸上だけではなく**帯全体で正則・有界**な補助関数を作る必要があります。次の証明では有限個の単関数を使い、この条件を具体的に検査します。

## 6. Riesz–Thorin補間

<a id="thm-ha2-riesz-thorin"></a>
<!-- formal-statement-start -->
> **定理（Riesz–Thorin補間：稠密部分空間からの版）**  
> $(X,\mu),(Y,\nu)$ を $\sigma$ 有限測度空間とする。$1\le p_0,p_1,q_0,q_1\le\infty$、$0<\theta<1$ とし、$p_0,p_1$ は同時には $\infty$ でないとする。有限測度台を持つ単関数の線形空間 $\mathcal S$ 上で定義された線形作用素 $T$ が、$i=0,1$ について

$$
\|Tf\|_{q_i}\le M_i\|f\|_{p_i}
\qquad(f\in\mathcal S),\quad M_i>0
$$

> を満たすと仮定する。指数を

$$
\frac1{p_\theta}=\frac{1-\theta}{p_0}+\frac{\theta}{p_1},
\qquad
\frac1{q_\theta}=\frac{1-\theta}{q_0}+\frac{\theta}{q_1}
$$

> と定める（$1/\infty=0$）。このとき $T$ は $L^{p_\theta}(X)\to L^{q_\theta}(Y)$ の有界線形作用素へ一意に連続延長され、

$$
\|Tf\|_{q_\theta}
\le M_0^{1-\theta}M_1^\theta\|f\|_{p_\theta}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

有限測度台の単関数 $f,h$ をノルム1に正規化し、帯の左右でそれぞれ $L^{p_0}$、$L^{p_1}$、および $L^{q'_0}$、$L^{q'_1}$ のノルムが1になるように係数を複素冪で変化させます。$\int(Tf_z)h_z\,d\nu$ は帯上の有界正則関数になります。[$L^q$ 双対による積分評価](../../MT/MT7/index.md#thm-mt7-lp-duality)と[三線定理](#lem-ha2-three-lines)を合わせて結論を得ます。

<!-- proof-start -->
### 証明

ここで $q_i'$ は $1/q_i+1/q_i'=1$ を満たす共役指数で、$1'=\infty$、$\infty'=1$ とします。まず $1\le p_\theta<\infty$、$1<q_\theta\le\infty$ とし、$\|f\|_{p_\theta}=\|h\|_{q_\theta'}=1$ となる有限測度台の単関数 $f,h$ を選びます。値0の部分を除き、互いに素な有限測度集合上で

$$
f=\sum_{j=1}^m a_j\boldsymbol{1}_{E_j},
\qquad
h=\sum_{k=1}^n b_k\boldsymbol{1}_{F_k}
$$

と書けます。$a_j,b_k\ne0$ としてよく、$\operatorname{sgn}(a)=a/|a|$ と定めます。

$$
\alpha(z)=\frac{1-z}{p_0}+\frac{z}{p_1},
\qquad
\beta(z)=\frac{1-z}{q_0'}+\frac{z}{q_1'}
$$

と置き、複素冪は $r^w=\exp(w\log r)$（$r>0$）で定義します。$r=q_\theta'<\infty$ として

$$
\begin{aligned}
f_z&=\sum_j\operatorname{sgn}(a_j)|a_j|^{p_\theta\alpha(z)}
\boldsymbol{1}_{E_j},\\
h_z&=\sum_k\operatorname{sgn}(b_k)|b_k|^{r\beta(z)}
\boldsymbol{1}_{F_k}.
\end{aligned}
$$

ここで $\alpha(\theta)=1/p_\theta$、$\beta(\theta)=1/q_\theta'=1/r$ なので、$f_\theta=f$、$h_\theta=h$ です。境界 $z=it$ では各係数の絶対値が $|a_j|^{p_\theta/p_0}$ となり、$p_0<\infty$ なら

$$
\|f_{it}\|_{p_0}^{p_0}
=\sum_j|a_j|^{p_\theta}\mu(E_j)
=\|f\|_{p_\theta}^{p_\theta}=1.
$$

$p_0=\infty$ のときも $|f_{it}|=1$ が $f$ の台上で成り立ち、$\|f_{it}\|_\infty=1$ です。同じ議論で $\|f_{1+it}\|_{p_1}=1$、$\|h_{it}\|_{q_0'}=1$、$\|h_{1+it}\|_{q_1'}=1$ を得ます。$q'_i=\infty$ の場合は係数の絶対値が1になることから確認できます。

$$
F(z)=\int_Y (Tf_z)(y)h_z(y)\,d\nu(y)
$$

と置きます。$f_z$ は有限個の固定された指示関数の線形結合です。$T$ が線形なので $Tf_z$ も固定された $T\boldsymbol{1}_{E_j}$ の有限線形結合であり、$h_z$ も有限個の指示関数からなります。両端点の評価により $T\boldsymbol{1}_{E_j}\in L^{q_0}\cap L^{q_1}$ で、$\nu(F_k)<\infty$ です。従ってすべての積分 $\int_{F_k}T\boldsymbol{1}_{E_j}\,d\nu$ は絶対収束します（$q_i=\infty$ の場合も有限測度台を使う）。これら固定された有限個の積分の係数は $z$ の指数関数なので、$F$ は帯の内部で正則、閉帯で連続であり、閉帯全体で有界です。

左右の境界では [Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)と端点の作用素評価から

$$
\begin{aligned}
|F(it)|&\le\|Tf_{it}\|_{q_0}\|h_{it}\|_{q'_0}\le M_0,\\
|F(1+it)|&\le\|Tf_{1+it}\|_{q_1}\|h_{1+it}\|_{q'_1}\le M_1.
\end{aligned}
$$

[三線定理](#lem-ha2-three-lines)を $F$ に使い、$f_\theta=f$、$h_\theta=h$ を戻すと

$$
\left|\int_Y(Tf)h\,d\nu\right|
=|F(\theta)|
\le M_0^{1-\theta}M_1^\theta.
$$

$q_\theta>1$ のとき $q_\theta'<\infty$ なので、有限測度台の単関数 $h$ を動かして積分の上限を取れば [単関数稠密性と $L^q$ 双対](../../MT/MT7/index.md#thm-mt7-lp-duality)から $\|Tf\|_{q_\theta}$ が同じ定数以下となります。

残る $q_\theta=1$ の場合は $q_0=q_1=1$ です。このとき $h$ を任意の有限測度台の単関数で $|h|\le1$ とし、$h_z=h$ を固定すれば左右で $\|h_z\|_\infty\le1$ となります。先の $f_z$ と $F(z)$ に同じ三線定理を適用します。$\sup_{|h|\le1}|\int(Tf)h|=\|Tf\|_1$ を、符号関数の有限測度台近似から得て同じ評価になります。

最後に任意の有限測度台の単関数 $f$ に対し、$f/\|f\|_{p_\theta}$ で正規化すると一般の不等式が得られます。$p_\theta<\infty$ は $p_0,p_1$ が同時に $\infty$ でないことから従います。[単関数の $L^{p_\theta}$ 稠密性](../../MT/MT7/index.md#thm-mt7-simple-dense)により $f_n\to f$ を選べば、上の不等式から $(Tf_n)$ は $L^{q_\theta}$ の Cauchy 列です。[完備性](../../MT/MT7/index.md#thm-mt7-lp-complete)を使い、極限で $Tf$ を定めると近似列に依らない一意な有界延長を得ます。
<!-- proof-end -->

この定理では作用素の**線形性**が鍵です。$T(f_z)$ を $z$ の正則関数として扱うため、劣線形作用素にはそのまま使えません。最大作用素には前節の Marcinkiewicz 補間を使い、畳み込みなどの線形作用素には Riesz–Thorin 補間を使う、という使い分けです。

また、定理の結論は $0<\theta<1$ の中間指数です。弱型の一端点だけを強型と取り違えたり、指数を入れ替えて任意の $(p,q)$ を主張したりはできません。

## 7. 演習

### 演習 HA2-A01（弱空間にあるが強空間にはない関数）
<a id="ex-ha2-a01"></a>
- Level: A
- 問題: $d\ge1$、$1\le p<\infty$ とし、$f(x)=|x|^{-d/p}\boldsymbol{1}_{\{0<|x|<1\}}$ とする。$\lambda<1$ と $\lambda\ge1$ で分布関数を求め、弱 $L^p$ 準ノルムおよび $L^p$ 積分を計算せよ。

<!-- solution-start -->
**詳細解答**

$0<\lambda<1$ なら球内の非零点では $|f|>1>\lambda$ なので $d_f(\lambda)=v_d$ です。$\lambda\ge1$ では $|x|^{-d/p}>\lambda$ と $|x|<\lambda^{-p/d}$ が同値で、$\lambda^{-p/d}\le1$ より

$$
d_f(\lambda)=|B(0,\lambda^{-p/d})|
=v_d\lambda^{-p}.
$$

従って $\lambda d_f(\lambda)^{1/p}$ は前者で $\lambda v_d^{1/p}<v_d^{1/p}$、後者で $v_d^{1/p}$ なので、上限は $v_d^{1/p}$ です。一方、[layer-cake公式](#prop-ha2-layercake)から

$$
\int|f|^p
=p\int_0^1\lambda^{p-1}v_d\,d\lambda
+p\int_1^\infty\lambda^{p-1}v_d\lambda^{-p}\,d\lambda
=v_d+pv_d\int_1^\infty\frac{d\lambda}{\lambda}
=+\infty.
$$
<!-- solution-end -->

### 演習 HA2-A02（分布関数から $L^2$）
<a id="ex-ha2-a02"></a>
- Level: A
- 問題: $(0,3)$ 上で $f=2\boldsymbol{1}_{(0,1)}+\boldsymbol{1}_{(1,3)}$ とする。分布関数を閾値の等号に注意して書き、layer-cake公式から $\|f\|_2$ を求めよ。

<!-- solution-start -->
**詳細解答**

分布関数は

$$
d_f(\lambda)=
\begin{cases}
3,&0<\lambda<1,\\
1,&1\le\lambda<2,\\
0,&2\le\lambda.
\end{cases}
$$

よって [layer-cake公式](#prop-ha2-layercake)に $p=2$ を入れると

$$
\|f\|_2^2
=2\int_0^1 3\lambda\,d\lambda
+2\int_1^2\lambda\,d\lambda=3+(4-1)=6.
$$

したがって $\|f\|_2=\sqrt6$ です。点 $\lambda=1,2$ 自身の値は積分値に影響しませんが、超水準集合の厳密な定義を確認する際には必要です。
<!-- solution-end -->

### 演習 HA2-A03（弱型評価を積分から得る）
<a id="ex-ha2-a03"></a>
- Level: A
- 問題: $1\le p<\infty$、$f\in L^p(X)$ とする。$\lambda^p d_f(\lambda)\le\|f\|_p^p$ を超水準集合上の積分から示せ。$p=2$、$f=\boldsymbol{1}_E$、$0<\mu(E)<\infty$ のとき弱ノルムも求めよ。

<!-- solution-start -->
**詳細解答**

集合 $E_\lambda=\{|f|>\lambda\}$ では $|f|^p\ge\lambda^p$ なので

$$
\lambda^p d_f(\lambda)
=\int_{E_\lambda}\lambda^p\,d\mu
\le\int_{E_\lambda}|f|^p\,d\mu
\le\|f\|_p^p.
$$

$f=\boldsymbol{1}_E$ のとき $0<\lambda<1$ なら $d_f(\lambda)=\mu(E)$、$\lambda\ge1$ なら0です。したがって

$$
\|f\|_{L^{2,\infty}}
=\sup_{0<\lambda<1}\lambda\mu(E)^{1/2}
=\mu(E)^{1/2}
=\|f\|_2.
$$
<!-- solution-end -->

### 演習 HA2-A04（劣線形性）
<a id="ex-ha2-a04"></a>
- Level: A
- 問題: 球平均を用いる中心付き最大作用素 $M$ に対し、$M(f+g)\le Mf+Mg$ と $M(af)=|a|Mf$ を定義から示せ。$T(f)=\|f\|_1^2$ が劣線形でない理由も述べよ。

<!-- solution-start -->
**詳細解答**

任意の球 $B(x,r)$ では $|f+g|\le|f|+|g|$ なので

$$
\frac1{|B(x,r)|}\int_{B(x,r)}|f+g|
\le\frac1{|B(x,r)|}\int_{B(x,r)}|f|
+\frac1{|B(x,r)|}\int_{B(x,r)}|g|.
$$

$r>0$ の全候補で上限を取ると右辺は $Mf(x)+Mg(x)$ 以下です。$|af|=|a||f|$ から球平均にも $|a|$ が外へ出るので $M(af)=|a|Mf$ です。一方、$f\ne0$ と $a=2$ を取れば $T(2f)=4\|f\|_1^2$、$2T(f)=2\|f\|_1^2$ で斉次性が破れます。
<!-- solution-end -->

### 演習 HA2-A05（切断した二部分の空間）
<a id="ex-ha2-a05"></a>
- Level: A
- 問題: $1\le p_0<p<p_1<\infty$、$f\in L^p(X)$、$a>0$ とする。$f_0=f\boldsymbol{1}_{\{|f|>a\}}$ と $f_1=f\boldsymbol{1}_{\{|f|\le a\}}$ に対して、$f_0\in L^{p_0}$、$f_1\in L^{p_1}$ とそれぞれのノルムの上界を示せ。

<!-- solution-start -->
**詳細解答**

$|f|>a$ では $p_0-p<0$ なので $|f|^{p_0-p}\le a^{p_0-p}$ です。したがって

$$
\|f_0\|_{p_0}^{p_0}
=\int_{\{|f|>a\}}|f|^{p_0-p}|f|^p\,d\mu
\le a^{p_0-p}\|f\|_p^p<\infty.
$$

$|f|\le a$ では $p_1-p>0$ なので $|f|^{p_1-p}\le a^{p_1-p}$ です。よって

$$
\|f_1\|_{p_1}^{p_1}
=\int_{\{|f|\le a\}}|f|^{p_1-p}|f|^p\,d\mu
\le a^{p_1-p}\|f\|_p^p<\infty.
$$

この向きが逆になると、一般の $L^p$ 関数を端点作用素へ入れることはできません。
<!-- solution-end -->

### 演習 HA2-B01（有限端点での指数計算）
<a id="ex-ha2-b01"></a>
- Level: B
- 問題: [有限端点Marcinkiewicz補間](#thm-ha2-marc-finite)で $p_0=1$、$p_1=2$、$p=3/2$、$c=1$ とする。定数 $A_0,A_1$ をそのまま残し、$\|Tf\|_{3/2}^{3/2}$ の上界を計算せよ。

<!-- solution-start -->
**詳細解答**

定理の係数へ $p=3/2$、$p-p_0=1/2$、$p_1-p=1/2$ を代入します。

$$
\begin{aligned}
\|Tf\|_{3/2}^{3/2}
&\le\frac32\,2^{3/2}
\left(\frac{A_0}{1/2}+\frac{A_1^2}{1/2}\right)
\|f\|_{3/2}^{3/2}\\
&=3\,2^{3/2}(A_0+A_1^2)
\|f\|_{3/2}^{3/2}.
\end{aligned}
$$

両辺を $2/3$ 乗すると強型ノルムの上界が得られます。$A_0$ は1乗、$A_1$ は2乗になる点は各弱型推定の指数に対応しています。
<!-- solution-end -->

### 演習 HA2-B02（最大作用素の $p=2$ 評価）
<a id="ex-ha2-b02"></a>
- Level: B
- 問題: $\mathbb R^d$ 上の中心付き最大作用素 $M$ について、$A_0=3^d$、$A_\infty=1$、$p_0=1$、$p=2$ を使い、[無限端点Marcinkiewicz補間](#thm-ha2-marc-infinity)から $\|Mf\|_2$ の具体的な上界を導け。

<!-- solution-start -->
**詳細解答**

[HA1の弱型評価](../HA1/index.md#thm-ha1-weak11)と[$L^\infty$ 評価](../HA1/index.md#prop-ha1-basic-maximal)から定理の二端点が成立します。式に順に代入すると

$$
\begin{aligned}
\|Mf\|_2^2
&\le\frac{2\cdot2^2}{2-1}
(3^d)^1(2\cdot1)^{2-1}\|f\|_2^2\\
&=16\cdot3^d\|f\|_2^2.
\end{aligned}
$$

よって $\|Mf\|_2\le4\cdot3^{d/2}\|f\|_2$ です。ここでは$L^2$有界性を前提にせず、弱型 $L^1$ と強型 $L^\infty$ のみから導きました。
<!-- solution-end -->

### 演習 HA2-B03（有限次元のRiesz–Thorin）
<a id="ex-ha2-b03"></a>
- Level: B
- 問題: 複素行列 $A$ が $\mathbb C^n\to\mathbb C^m$ の線形写像を定め、$\|A\|_{\ell^1\to\ell^1}\le U$、$\|A\|_{\ell^\infty\to\ell^\infty}\le V$ とする。$\|A\|_{\ell^2\to\ell^2}\le\sqrt{UV}$ を導け。また $\ell^1$ 作用素ノルムが列の絶対値和の最大値であることを確認せよ。

<!-- solution-start -->
**詳細解答**

有限集合に数え上げ測度を入れ、[Riesz–Thorin補間](#thm-ha2-riesz-thorin)で $(p_0,q_0)=(1,1)$、$(p_1,q_1)=(\infty,\infty)$、$\theta=1/2$ とします。すると

$$
1/p_\theta=(1-\theta)/1+\theta/\infty=1/2,
\qquad 1/q_\theta=1/2.
$$

従って $\|Ax\|_2\le U^{1/2}V^{1/2}\|x\|_2$ です。さらに行列 $A=(a_{ij})$ について

$$
\begin{aligned}
\|Ax\|_1
&=\sum_i\left|\sum_j a_{ij}x_j\right|
\le\sum_j|x_j|\sum_i|a_{ij}|\\
&\le\left(\max_j\sum_i|a_{ij}|\right)\|x\|_1.
\end{aligned}
$$

列 $j_0$ で最大値を達成するなら標準基底 $e_{j_0}$ に対して $\|Ae_{j_0}\|_1=\sum_i|a_{ij_0}|$ なので、上界は等号達成します。
<!-- solution-end -->

### 演習 HA2-B04（端点を勝手に閉じない）
<a id="ex-ha2-b04"></a>
- Level: B
- 問題: $f(x)=x^{-1}\boldsymbol{1}_{(0,1)}(x)$ が弱 $L^1(0,1)$ に属するが $L^1(0,1)$ に属さないことを示せ。これが「弱型 $(1,1)$ だけで強型 $(1,1)$」という推論への反例にならない理由も説明せよ。

<!-- solution-start -->
**詳細解答**

$\lambda\ge1$ なら $x^{-1}>\lambda$ は $0<x<1/\lambda$ と同値なので $d_f(\lambda)=1/\lambda$ です。$0<\lambda<1$ なら $d_f(\lambda)=1$ です。よって

$$
\|f\|_{L^{1,\infty}}
=\sup_{\lambda>0}\lambda d_f(\lambda)=1.
$$

一方 $\int_0^1x^{-1}\,dx=+\infty$ なので $f\notin L^1$ です。ただしこの $f$ は作用素ではなく単一の関数ですから、それ自体はある作用素の弱型から強型が従わないことの**論理的な反例ではありません**。作用素としての失敗例は[HA1の最大作用素](../HA1/index.md#prop-ha1-no-strong11)です。この演習は弱空間が強空間より広いことを明示する例です。
<!-- solution-end -->

### 演習 HA2-C01（畳み込み作用素の $(4/3,4)$ 評価）
<a id="ex-ha2-c01"></a>
- Level: C
- 問題: $\mathbb R$ 上の $K=\boldsymbol{1}_{[0,1]}$ に対し、$Tf=K*f$ とする。(i) $\|Tf\|_\infty\le\|f\|_1$、(ii) $\|Tf\|_2\le\|f\|_2$ を導け。(iii) [Riesz–Thorin補間](#thm-ha2-riesz-thorin)を使い $\|Tf\|_4\le\|f\|_{4/3}$ を証明せよ。指数の算出過程と線形性・端点定数の確認を省かないこと。

<!-- solution-start -->
**詳細解答**

畳み込みは $Tf(x)=\int_0^1 f(x-y)\,dy$ です。まず $f\in L^1$ なら

$$
|Tf(x)|
=\left|\int_{\mathbb R}K(y)f(x-y)\,dy\right|
\le\int_{\mathbb R}|f(x-y)|\,dy=\|f\|_1,
$$

したがって $\|Tf\|_\infty\le\|f\|_1$ で、$(p_0,q_0)=(1,\infty)$、$M_0=1$ です。

次に $f\in L^2$ とします。各 $x$ で確率測度 $K(y)\,dy$ に対して Cauchy–Schwarz を適用すると

$$
|Tf(x)|^2
=\left|\int_0^1f(x-y)\,dy\right|^2
\le\int_0^1|f(x-y)|^2\,dy.
$$

これを $x$ で積分し、[Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)と平行移動不変性を使うと

$$
\begin{aligned}
\|Tf\|_2^2
&\le\int_{\mathbb R}\int_0^1|f(x-y)|^2\,dy\,dx\\
&=\int_0^1\left(\int_{\mathbb R}|f(x-y)|^2\,dx\right)dy\\
&=\int_0^1\|f\|_2^2\,dy=\|f\|_2^2.
\end{aligned}
$$

よって $(p_1,q_1)=(2,2)$、$M_1=1$ です。畳み込みの積分は $f$ に関して線形であるため、複素補間の線形性仮定を満たします。

$\theta=1/2$ を選ぶと

$$
\frac1{p_\theta}
=\frac{1/2}{1}+\frac{1/2}{2}=\frac34,
\qquad
\frac1{q_\theta}
=\frac{1/2}{\infty}+\frac{1/2}{2}=\frac14.
$$

したがって $p_\theta=4/3$、$q_\theta=4$ です。[Riesz–Thorin補間](#thm-ha2-riesz-thorin)から有限測度台の単関数に対し

$$
\|Tf\|_4\le M_0^{1/2}M_1^{1/2}\|f\|_{4/3}
=\|f\|_{4/3}.
$$

単関数の稠密性と作用素の連続延長で一般の $f\in L^{4/3}$ にも成立します。$L^1\to L^\infty$ と $L^2\to L^2$ は指数の異なる二端点であり、劣線形作用素の同指数補間だけからこの結論は出ません。
<!-- solution-end -->

## 8. この章で得た道具

弱 $L^p$ は「大きな値がどの程度まれか」を量る空間でした。Marcinkiewicz補間では入力を高さで切り、二つの弱型端点から**中間の強型 $(p,p)$** を得ました。Riesz–Thorin補間では線形性と複素解析を用いて **$(p,q)$ の両方の指数**を補間しました。

次のHA3以降では Hilbert変換や特異積分の端点評価と $L^2$ 有界性が重要になります。弱型 $(1,1)$ と $L^\infty$、あるいは $L^2$ と双対性のどれを使えるかを区別し、その作用素に適した補間定理を選ぶことが新しい課題になります。
