# QM5 非有界作用素と自己共役性

<!-- definition-example-audit: strict -->

> **既出概念**：[EVOL1 の非有界・閉・可閉作用素](../EVOL1/index.md)、[QM4](../QM4/index.md)、[FOU4 の $L^2$ Fourier 変換](../FOU4/index.md)を使います。

QM4 までは、全空間で作用する有界な観測量を中心に扱いました。しかし位置
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
を使い、随伴と対称性から出発し、定義域まで一致する条件と閉包の役割を順に調べ、位置・運動量作用素へ進みます。


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

と定める。$D(A)$ の稠密性により $z$ は一意なので、その $z$ を $A^*y$ と定める。$A^*$ を $A$ の**随伴**という。
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

**定義の確認**
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

## 2. 随伴は閉じている

<a id="thm-qm5-adjoint-closed"></a>

<!-- formal-statement-start -->
### 定理（随伴は閉じている）

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

## 3. まず内積を移せる条件を切り出す

随伴 $A^*$ は元の作用素より広い定義域を持ち得ます。まず、元の定義域の中だけで内積を移せるという、自己共役性より弱い条件を切り出します。この弱い条件を次で定義します。

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

**定義の確認**
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

EVOL1 の[可閉性の列判定](../EVOL1/index.md#thm-evol1-closability-criterion)を使います。$x_n\to0$、$Ax_n\to y$ とし、任意の $z\in D(A)$ を取ります。対称性より

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

対称性から分かるのは $A\subset A^*$ までで、$A_0$ のように随伴の定義域が真に広がることがあります。観測量として必要な条件は、この余分な定義域が残らず、作用素と随伴が同じ対象になることです。

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

**定義の確認**
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

**定義の確認**
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


## 7. 運動量作用素を Fourier 空間で作る

位置作用素と違い、微分作用素を直接自己共役にするには定義域の選び方が見えにくくなります。そこで FOU4 のユニタリ Fourier 変換を使い、微分を Fourier 側の乗算へ移します。

<a id="prop-qm5-unitary-conjugation"></a>

<!-- formal-statement-start -->
### 命題（ユニタリ共役は自己共役性を保存する）

$U:H\to H$ をユニタリ作用素、$A:D(A)\subset H\to H$ を自己共役作用素とする。

$$
D(B)=U^{-1}D(A),
\qquad
B=U^{-1}AU
$$

と定める。このとき $B$ は自己共役である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x,y\in D(B)$ なら $Ux,Uy\in D(A)$ です。$A$ の対称性と $U$ のユニタリ性から

$$
\langle Bx,y\rangle
=
\langle AUx,Uy\rangle
=
\langle Ux,AUy\rangle
=
\langle x,By\rangle.
$$

従って $B$ は対称です。

次に $y\in D(B^*)$、$B^*y=z$ とします。任意の $v\in D(A)$ に対して $x=U^{-1}v$ と置くと

$$
\langle Av,Uy\rangle
=
\langle v,Uz\rangle.
$$

従って $Uy\in D(A^*)$ です。$A=A^*$ なので $Uy\in D(A)$、したがって

$$
y\in U^{-1}D(A)=D(B).
$$

よって $D(B^*)\subset D(B)$。対称性から逆包含もあるため $B=B^*$ です。$\square$
<!-- proof-end -->

FOU4 のユニタリ Fourier 作用素を

$$
\mathcal F:L^2(\mathbb R)\to L^2(\mathbb R)
$$

とします。Fourier 側で

$$
D(M_\xi)
=
\{\widehat\psi\in L^2:\xi\widehat\psi\in L^2\},
$$

$$
(M_\xi\widehat\psi)(\xi)
=
\xi\widehat\psi(\xi)
$$

と定めます。$M_\xi$ は位置作用素と同じ型の最大実乗算作用素なので自己共役です。

$\hbar>0$ として

$$
D(P)
=
\{\psi\in L^2:\xi(\mathcal F\psi)(\xi)\in L^2\},
$$

$$
P
=
\mathcal F^{-1}(\hbar M_\xi)\mathcal F
$$

と定めます。

<a id="thm-qm5-momentum-fourier"></a>

<!-- formal-statement-start -->
### 定理（運動量作用素の Fourier 表現）

上で定めた $P$ は自己共役である。さらに $f\in C_c^\infty(\mathbb R)$ に対して

$$
Pf=-i\hbar f'
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$M_\xi$ は自己共役で、$\hbar$ は実数なので $\hbar M_\xi$ も自己共役です。前節の命題に

$$
U=\mathcal F,
\qquad
A=\hbar M_\xi
$$

を適用すれば $P$ は自己共役です。

次に $f\in C_c^\infty(\mathbb R)$ とします。FOU4 の Fourier 規約では部分積分から

$$
\mathcal F(f')(\xi)
=
i\xi\,\mathcal Ff(\xi).
$$

従って

$$
\mathcal F(-i\hbar f')
=
\hbar\xi\,\mathcal Ff.
$$

両辺に $\mathcal F^{-1}$ を作用させれば

$$
Pf=-i\hbar f'.
$$

$\square$
<!-- proof-end -->

大事なのは、形式的な式 $-i\hbar\,d/dx$ を見て自己共役と宣言していないことです。まず Fourier 空間で自己共役な最大実乗算作用素を作り、ユニタリ共役で戻しています。

## 8. なぜ量子力学では self-adjoint が必要か

対称性だけなら

$$
\langle A\psi,\varphi\rangle
=
\langle\psi,A\varphi\rangle
$$

は成り立ちます。しかし、それだけでは $D(A)=D(A^*)$ は保証されません。

QM6 では自己共役作用素に対して

$$
A
=
\int_{\mathbb R}\lambda\,dE_A(\lambda)
$$

という非有界スペクトル表示を扱い、QM7 では Stone の定理による

$$
\text{自己共役 }H
\longleftrightarrow
U(t)=e^{-itH}
$$

という時間発展との対応を扱います。そのため、ここで symmetric と self-adjoint を分けることが後続章の土台になります。

---

## 9. 演習

### Level A

<a id="ex-qm5-a01"></a>
#### QM5-A01 最小対角作用素の随伴
- Level: A

$A_0:c_{00}\to\ell^2$, $A_0x=(nx_n)$ について $A_0^*$ の定義域と作用を求めよ。

<!-- solution-start -->
### 詳細解答

$A_0^*y=z$ とし、$e_k$ を随伴の定義へ入れると

$$
z_k=ky_k.
$$

従って必要条件は $(ny_n)\in\ell^2$ です。

逆に $(ny_n)\in\ell^2$ として $z=(ny_n)$ と置けば、$x\in c_{00}$ について有限和で

$$
\langle A_0x,y\rangle
=
\sum_n nx_n\overline{y_n}
=
\sum_n x_n\overline{ny_n}
=
\langle x,z\rangle.
$$

よって

$$
D(A_0^*)
=
\{y:(ny_n)\in\ell^2\},
\qquad
A_0^*y=(ny_n).
$$
<!-- solution-end -->

<a id="ex-qm5-a02"></a>
#### QM5-A02 対称だが自己共役ではない
- Level: A

$A_0$ が対称だが自己共役ではないことを示せ。

<!-- solution-start -->
### 詳細解答

$x,y\in c_{00}$ なら

$$
\langle A_0x,y\rangle
=
\sum_n nx_n\overline{y_n}
=
\langle x,A_0y\rangle,
$$

なので対称です。

一方 A01 から

$$
D(A_0^*)
=
\{y:(ny_n)\in\ell^2\}.
$$

$y_n=1/n^2$ はこの定義域に属しますが $c_{00}$ には属しません。従って

$$
D(A_0)\subsetneq D(A_0^*),
$$

なので自己共役ではありません。
<!-- solution-end -->

<a id="ex-qm5-a03"></a>
#### QM5-A03 自己共役作用素は閉じている
- Level: A

第2節の定理だけを使い、自己共役作用素が閉作用素であることを示せ。

<!-- solution-start -->
### 詳細解答

自己共役なら $A=A^*$ です。第2節で随伴 $A^*$ は閉じていると証明済みなので、同じ作用素 $A$ も閉作用素です。
<!-- solution-end -->

<a id="ex-qm5-a04"></a>
#### QM5-A04 位置作用素の定義域
- Level: A

位置作用素 $Q$ の定義域 $D(Q)$ が $L^2(\mathbb R)$ に稠密だが全空間ではないことを示せ。

<!-- solution-start -->
### 詳細解答

$\psi_N=\mathbf1_{[-N,N]}\psi$ とすれば $x\psi_N\in L^2$ なので $\psi_N\in D(Q)$ です。また

$$
\|\psi-\psi_N\|_2^2
=
\int_{|x|>N}|\psi|^2
\to0.
$$

従って $D(Q)$ は稠密です。

一方 $\psi(x)=1/(1+|x|)$ は $L^2$ に属しますが $x\psi\notin L^2$ なので $D(Q)\ne L^2$ です。
<!-- solution-end -->


### Level B

<a id="ex-qm5-b01"></a>
#### QM5-B01 最大実対角作用素の自己共役性
- Level: B

実数列 $(\lambda_n)$ に対し

$$
D(M_\lambda)=\{x\in\ell^2:(\lambda_nx_n)\in\ell^2\},
\qquad
M_\lambda x=(\lambda_nx_n)
$$

とする。随伴の定義から $M_\lambda^*=M_\lambda$ を証明せよ。

<!-- solution-start -->
### 詳細解答

まず $\lambda_n\in\mathbb R$ より

$$
\langle M_\lambda x,y\rangle
=
\sum_n\lambda_nx_n\overline{y_n}
=
\langle x,M_\lambda y\rangle,
$$

なので $M_\lambda$ は対称です。

$y\in D(M_\lambda^*)$、$M_\lambda^*y=z$ とし、$e_k$ を入れると

$$
z_k=\lambda_ky_k.
$$

$z\in\ell^2$ なので $(\lambda_ky_k)\in\ell^2$、従って $y\in D(M_\lambda)$ です。

したがって

$$
D(M_\lambda^*)\subset D(M_\lambda).
$$

対称性から逆包含も成り立つため、定義域と作用が一致して

$$
M_\lambda^*=M_\lambda.
$$
<!-- solution-end -->

<a id="ex-qm5-b02"></a>
#### QM5-B02 対称作用素の可閉性
- Level: B

稠密定義対称作用素 $A$ が可閉であることを EVOL1 の[可閉性の列判定](../EVOL1/index.md#thm-evol1-closability-criterion)から証明せよ。

<!-- solution-start -->
### 詳細解答

$x_n\to0$、$Ax_n\to y$ とします。任意の $z\in D(A)$ に対し

$$
\langle y,z\rangle
=
\lim_n\langle Ax_n,z\rangle
=
\lim_n\langle x_n,Az\rangle
=
0.
$$

$D(A)$ は $H$ に稠密なので、$y$ は $H$ 全体に直交し

$$
y=0.
$$

従って EVOL1 の列判定を満たし、$A$ は可閉です。
<!-- solution-end -->

<a id="ex-qm5-b03"></a>
#### QM5-B03 Fourier 変換と運動量
- Level: B

$$
P=\mathcal F^{-1}(\hbar M_\xi)\mathcal F
$$

について、$P$ が自己共役であり、$f\in C_c^\infty(\mathbb R)$ では

$$
Pf=-i\hbar f'
$$

となることを示せ。

<!-- solution-start -->
### 詳細解答

$M_\xi$ は最大実乗算作用素なので自己共役です。$\hbar>0$ だから $\hbar M_\xi$ も自己共役です。

FOU4 の $\mathcal F$ はユニタリなので、[ユニタリ共役による自己共役性の保存](#prop-qm5-unitary-conjugation)から $P$ は自己共役です。

また $f\in C_c^\infty$ なら

$$
\mathcal F(f')=i\xi\mathcal Ff.
$$

従って

$$
\mathcal F(-i\hbar f')
=
\hbar\xi\mathcal Ff
=
(\hbar M_\xi)\mathcal Ff.
$$

$\mathcal F^{-1}$ を作用させると

$$
Pf=-i\hbar f'.
$$
<!-- solution-end -->

### Level C

<a id="ex-qm5-c01"></a>
#### QM5-C01 定義域から自己共役性を再構成する
- Level: C

最小対角作用素 $A_0$ と最大対角作用素 $A$ について、次を順に示せ。

1. $A_0$ は稠密定義対称作用素である。
2. $A_0^*=A$ である。
3. $A$ は自己共役である。
4. EVOL1 の $\overline{A_0}=A$ を使い、$A_0$ は本質的自己共役だが自己共役ではないことを説明せよ。
5. 有限次元では 4 のような現象が見えにくい理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. $c_{00}$ は $\ell^2$ に稠密です。また実対角なので
   $$
   \langle A_0x,y\rangle=\langle x,A_0y\rangle
   $$
   が $x,y\in c_{00}$ で成立します。

2. $A_0^*y=z$ とし $e_k$ を代入すると $z_k=ky_k$ です。従って
   $$
   D(A_0^*)=\{y:(ny_n)\in\ell^2\}=D(A),
   $$
   かつ作用も一致するので $A_0^*=A$ です。

3. $A$ は対称です。$A^*y=z$ として $e_k$ を代入すると再び $z_k=ky_k$ なので $y\in D(A)$。従って
   $$
   D(A^*)\subset D(A).
   $$
   対称性から逆包含があるため $A^*=A$ です。

4. EVOL1 より $\overline{A_0}=A$。第3問で $A$ は自己共役なので $A_0$ は本質的自己共役です。一方
   $$
   D(A_0)=c_{00}\subsetneq D(A_0^*)=D(A)
   $$
   なので $A_0$ 自身は自己共役ではありません。

5. 有限次元では線形部分空間は全て閉じています。従って稠密な定義域は $H$ 全体しかなく、無限次元のような真の包含
   $$
   D(A)\subsetneq D(A^*)
   $$
   が生じにくいためです。
<!-- solution-end -->

---

## 10. まとめ

- 非有界作用素では、随伴 $A^*$ を考えるとき、その定義域 $D(A^*)$ も内積恒等式から決まる。
- 随伴 $A^*$ は閉じている。
- 対称作用素は $A\subset A^*$、自己共役作用素は $A=A^*$ を満たす。
- 稠密定義対称作用素は可閉である。
- 本質的自己共役とは、閉包が自己共役になることである。
- $c_{00}$ 上の最小対角作用素は対称だが自己共役ではなく、本質的自己共役である。
- 最大実対角作用素と位置作用素は自己共役である。
- 運動量作用素は Fourier 空間の自己共役乗算作用素をユニタリ共役して構成できる。

次の QM6 では、自己共役作用素に対する非有界スペクトル定理を扱い、

$$
A=\int_{\mathbb R}\lambda\,dE_A(\lambda)
$$

を定義域まで含めて厳密化します。
