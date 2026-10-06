# QM5 非有界作用素と自己共役性

<!-- definition-example-audit: strict -->

> **既出概念**：[EVOL1 の非有界・閉・可閉作用素](../EVOL1/index.md)、[QM4](../QM4/index.md)、[FOU4 の $L^2$ Fourier 変換](../FOU4/index.md)を使います。

QM4 までは観測量を有界自己共役作用素として扱いました。しかし位置
$$
(Q\psi)(x)=x\psi(x)
$$
や運動量
$$
(P\psi)(x)=-i\hbar\psi'(x)
$$
は、すべての $L^2$ 関数に作用できません。

EVOL1 では、非有界作用素を「作用規則と定義域の組」として扱いました。本章ではさらに
$$
A=A^*
$$
を言うには作用規則だけでなく
$$
D(A)=D(A^*)
$$
が必要であることを主役にします。

本章では EVOL1 の
$$
A_0:c_{00}\to\ell^2,\qquad A_0(x_n)=(nx_n)
$$
を使い、随伴、対称性、自己共役性、本質的自己共役性を定義域まで計算し、位置・運動量作用素へ進みます。


---

## 1. 稠密定義作用素の随伴

本章では FOU4 と同じく、複素内積を第1変数について線形とします。有界作用素では随伴は全空間で定義されますが、非有界作用素では「どの $y$ なら随伴値を持つか」も同時に決めなければなりません。

<a id="def-qm5-unbounded-adjoint"></a>

<!-- formal-statement-start -->
### 定義（稠密定義作用素の随伴）

$H$ を複素 Hilbert 空間、$A:D(A)\subset H\to H$ を稠密定義線形作用素とする。

$$
D(A^*)
=
\left\{
y\in H:
\exists z\in H,\ 
\langle Ax,y\rangle=\langle x,z\rangle
\quad(\forall x\in D(A))
\right\}
$$

と定める。$D(A)$ の稠密性により $z$ は一意なので、その $z$ を $A^*y$ と定める。$A^*$ を $A$ の**随伴作用素**という。
<!-- formal-statement-end -->

一意性も確認しておきます。$z_1,z_2$ が候補なら

$$
\langle x,z_1-z_2\rangle=0
\qquad(x\in D(A)).
$$

$D(A)$ の稠密性と内積の連続性から全ての $x\in H$ でも同じ等式が成り立ちます。$x=z_1-z_2$ とすれば

$$
\|z_1-z_2\|^2=0,
$$

よって $z_1=z_2$ です。

<!-- definition-example-start: def-qm5-unbounded-adjoint -->
### 直接例：最小対角作用素の随伴

$y\in D(A_0^*)$、$A_0^*y=z$ とします。標準基底 $e_k\in c_{00}$ を使うと

$$
k\overline{y_k}
=
\langle A_0e_k,y\rangle
=
\langle e_k,z\rangle
=
\overline{z_k}.
$$

従って

$$
z_k=ky_k.
$$

$z$ が $\ell^2$ の元であるための条件は $(ny_n)\in\ell^2$ なので、

$$
D(A_0^*)
=
\{y\in\ell^2:(ny_n)\in\ell^2\},
\qquad
A_0^*y=(ny_n).
$$

EVOL1 の最大対角作用素

$$
D(A)=\{y\in\ell^2:(ny_n)\in\ell^2\},
\qquad
Ay=(ny_n)
$$

と比べると

$$
\boxed{A_0^*=A}
$$

です。
<!-- definition-example-end -->

<a id="prop-qm5-minimal-diagonal-adjoint"></a>

<!-- formal-statement-start -->
### 命題（最小対角作用素の随伴）

上の最小対角作用素 $A_0$ と最大対角作用素 $A$ について

$$
A_0^*=A
$$

である。
<!-- formal-statement-end -->

同じ作用規則 $(nx_n)$ を持っていても

$$
D(A_0)=c_{00}\subsetneq D(A_0^*)=D(A)
$$

です。随伴を取ると、定義域は元の定義域から自動的にコピーされるのではなく、内積恒等式を満たせる最大範囲として決まります。

## 2. 随伴作用素は閉じている

<a id="thm-qm5-adjoint-closed"></a>

<!-- formal-statement-start -->
### 定理（随伴作用素は閉じている）

稠密定義線形作用素 $A$ の随伴 $A^*$ は閉作用素である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$y_n\in D(A^*)$ が

$$
y_n\to y,
\qquad
A^*y_n\to z
$$

を満たすとします。任意の $x\in D(A)$ に対し

$$
\langle Ax,y_n\rangle
=
\langle x,A^*y_n\rangle.
$$

内積の連続性を使って $n\to\infty$ とすれば

$$
\langle Ax,y\rangle
=
\langle x,z\rangle.
$$

これは全ての $x\in D(A)$ で成り立つため、随伴の定義から

$$
y\in D(A^*),
\qquad
A^*y=z.
$$

従って $A^*$ は閉作用素です。$\square$
<!-- proof-end -->

## 3. 対称作用素は随伴に含まれる

<a id="def-qm5-symmetric"></a>

<!-- formal-statement-start -->
### 定義（対称作用素）

稠密定義線形作用素 $A:D(A)\subset H\to H$ が

$$
\langle Ax,y\rangle
=
\langle x,Ay\rangle
\qquad(x,y\in D(A))
$$

を満たすとき、$A$ を**対称作用素**という。
<!-- formal-statement-end -->

$y\in D(A)$ を固定すれば

$$
\langle Ax,y\rangle
=
\langle x,Ay\rangle
\qquad(x\in D(A))
$$

なので、随伴の定義から

$$
y\in D(A^*),
\qquad
A^*y=Ay.
$$

従って対称性は

$$
\boxed{A\subset A^*}
$$

と同値です。

<!-- definition-example-start: def-qm5-symmetric -->
### 直接例：対称だが自己共役ではない $A_0$

$x,y\in c_{00}$ に対して

$$
\langle A_0x,y\rangle
=
\sum_{n=1}^{\infty}nx_n\overline{y_n}
=
\sum_{n=1}^{\infty}x_n\overline{ny_n}
=
\langle x,A_0y\rangle.
$$

従って $A_0$ は対称です。

しかし

$$
D(A_0)=c_{00}
\subsetneq
D(A_0^*)=D(A).
$$

したがって $A_0$ は対称ですが、自己共役ではありません。
<!-- definition-example-end -->

<a id="prop-qm5-symmetric-closable"></a>

<!-- formal-statement-start -->
### 命題（稠密定義の対称作用素は可閉）

稠密定義対称作用素は可閉である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

EVOL1 の可閉性の列判定を使います。$x_n\to0$、$Ax_n\to y$ とし、任意の $z\in D(A)$ を取ります。対称性より

$$
\langle Ax_n,z\rangle
=
\langle x_n,Az\rangle.
$$

極限を取ると

$$
\langle y,z\rangle=0.
$$

これは全ての $z\in D(A)$ で成り立ちます。$D(A)$ は稠密なので $y=0$ です。従って EVOL1 の列判定から $A$ は可閉です。$\square$
<!-- proof-end -->
