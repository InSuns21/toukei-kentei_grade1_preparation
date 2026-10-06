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


## 4. self-adjoint は定義域まで一致する

<a id="def-qm5-self-adjoint"></a>

<!-- formal-statement-start -->
### 定義（自己共役作用素）

稠密定義作用素 $A:D(A)\subset H\to H$ が

$$
A=A^*
$$

すなわち

$$
D(A)=D(A^*),
\qquad
Ax=A^*x
\quad(x\in D(A))
$$

を満たすとき、$A$ を**自己共役作用素**という。
<!-- formal-statement-end -->

つまり

$$
\boxed{
\text{対称}:A\subset A^*,
\qquad
\text{自己共役}:A=A^*
}
$$

です。有限次元の Hermitian 行列ではこの差が隠れますが、非有界作用素では定義域の等号が本体です。

<!-- definition-example-start: def-qm5-self-adjoint -->
### 直接例：最大対角作用素 $A$

$A$ は実対角作用素なので対称です。逆に $y\in D(A^*)$、$A^*y=z$ として $e_k\in D(A)$ を使うと

$$
z_k=ky_k.
$$

$z\in\ell^2$ だから $(ky_k)\in\ell^2$、従って $y\in D(A)$ です。よって

$$
D(A^*)\subset D(A).
$$

対称性から逆包含もあるため

$$
D(A^*)=D(A),
\qquad
A^*=A.
$$
<!-- definition-example-end -->

<a id="thm-qm5-real-diagonal-self-adjoint"></a>

<!-- formal-statement-start -->
### 定理（最大実対角作用素は自己共役）

実数列 $(\lambda_n)$ に対し

$$
D(M_\lambda)
=
\{x\in\ell^2:(\lambda_nx_n)\in\ell^2\},
$$

$$
(M_\lambda x)_n
=
\lambda_nx_n
$$

と定める。このとき $M_\lambda$ は自己共役である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\lambda_n\in\mathbb R$ なので

$$
\langle M_\lambda x,y\rangle
=
\sum_n\lambda_nx_n\overline{y_n}
=
\sum_nx_n\overline{\lambda_ny_n}
=
\langle x,M_\lambda y\rangle,
$$

従って $M_\lambda$ は対称です。

$y\in D(M_\lambda^*)$、$M_\lambda^*y=z$ とし、$e_k$ を随伴の定義へ入れると

$$
z_k=\lambda_ky_k.
$$

$z\in\ell^2$ より $(\lambda_ky_k)\in\ell^2$、したがって $y\in D(M_\lambda)$ です。よって

$$
D(M_\lambda^*)\subset D(M_\lambda).
$$

対称性による逆包含と合わせて

$$
M_\lambda^*=M_\lambda.
$$

$\square$
<!-- proof-end -->

自己共役なら $A=A^*$ であり、第2節で $A^*$ は閉じていると証明しました。従って

$$
\boxed{\text{自己共役作用素は閉作用素}}
$$

です。

## 5. 本質的自己共役性

対称作用素を扱いやすい小さい定義域で作った後、閉包を取って自己共役作用素を回収できることがあります。

<a id="def-qm5-essential-self-adjoint"></a>

<!-- formal-statement-start -->
### 定義（本質的自己共役性）

稠密定義対称作用素 $A$ の閉包 $\overline A$ が自己共役であるとき、$A$ は**本質的自己共役**であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm5-essential-self-adjoint -->
### 直接例：$A_0$ は本質的自己共役

EVOL1 で

$$
\overline{A_0}=A
$$

を証明しました。本章で $A$ は自己共役と分かったので、$A_0$ は本質的自己共役です。

一方

$$
D(A_0)\subsetneq D(A_0^*)
$$

なので $A_0$ 自身は自己共役ではありません。
<!-- definition-example-end -->

有限次元では全ての線形部分空間が閉じています。そのため稠密な定義域は $H$ 全体しかなく、

$$
D(A)\subsetneq H,
\qquad
\overline{D(A)}=H
$$

という無限次元特有の状況が起こりません。これが有限次元で「対称」と「自己共役」の差が見えにくい理由です。

## 6. 位置作用素：掛け算だけでも非有界になる

$H=L^2(\mathbb R)$ 上で

$$
D(Q)
=
\{\psi\in L^2(\mathbb R):x\psi(x)\in L^2(\mathbb R)\},
$$

$$
(Q\psi)(x)=x\psi(x)
$$

とします。

任意の $\psi\in L^2$ に対し

$$
\psi_N=\mathbf 1_{[-N,N]}\psi
$$

と置けば、$|x|\le N$ 上で

$$
\|x\psi_N\|_2
\le
N\|\psi_N\|_2,
$$

なので $\psi_N\in D(Q)$ です。また

$$
\|\psi-\psi_N\|_2^2
=
\int_{|x|>N}|\psi(x)|^2\,dx
\to0.
$$

従って $D(Q)$ は稠密です。

一方

$$
\psi(x)=\frac1{1+|x|}
$$

は $L^2(\mathbb R)$ に属しますが、$x\psi(x)$ は無限遠で絶対値が 1 に近づくため $L^2$ には属しません。よって

$$
D(Q)\subsetneq L^2(\mathbb R).
$$

<a id="thm-qm5-position-self-adjoint"></a>

<!-- formal-statement-start -->
### 定理（位置作用素は自己共役）

上の最大定義域 $D(Q)$ 上で定めた位置作用素 $Q$ は自己共役である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x$ は実数なので、$\psi,\varphi\in D(Q)$ に対し

$$
\langle Q\psi,\varphi\rangle
=
\int x\psi\overline{\varphi}
=
\int\psi\overline{x\varphi}
=
\langle\psi,Q\varphi\rangle.
$$

従って $Q$ は対称で $Q\subset Q^*$ です。

逆に $g\in D(Q^*)$、$Q^*g=h$ とします。任意の $f\in D(Q)$ について

$$
\int xf\,\overline g
=
\int f\,\overline h.
$$

$N\ge1$ を固定し

$$
k_N
=
\mathbf1_{[-N,N]}(xg-h)
$$

と置きます。区間上では $x$ が有界なので $k_N\in D(Q)$ です。$f=k_N$ を代入すると

$$
\int_{-N}^{N}|xg-h|^2\,dx=0.
$$

従って $xg=h$ が $[-N,N]$ 上でほとんど至る所成り立ちます。$N$ は任意なので $\mathbb R$ 全体で $xg=h$ です。

$h\in L^2$ より $xg\in L^2$、すなわち $g\in D(Q)$。従って

$$
D(Q^*)\subset D(Q).
$$

対称性から逆包含もあるため $Q^*=Q$ です。$\square$
<!-- proof-end -->
