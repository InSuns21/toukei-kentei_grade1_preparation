# QM7 Stone の定理と Schrödinger 発展

<!-- definition-example-audit: strict -->

> **既出概念**：[QM6 の非有界自己共役作用素のスペクトル定理](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)、[QM6 の自己共役作用素の Borel 関数計算](../QM6/index.md#def-qm6-borel-functional-calculus)、[QM6 の自己共役性の値域判定](../QM6/index.md#thm-qm6-self-adjoint-range-criterion)を使います。

QM6 では、自己共役作用素 $H$ に対して有界 Borel 関数

$$
\lambda\longmapsto e^{-it\lambda/\hbar}
$$

を代入すれば、

$$
e^{-itH/\hbar}
$$

が全空間 $H$ 上のユニタリ作用素になることを確認しました。

しかし、量子力学で本当に欲しいのは時刻を一つ固定した作用素ではありません。時刻 $t$ を動かしたときに

$$
U(t+s)=U(t)U(s)
$$

が成り立ち、状態が連続的に時間発展し、さらに

$$
i\hbar\frac{d}{dt}\psi(t)=H\psi(t)
$$

という Schrödinger 方程式へ戻れる必要があります。

逆向きも重要です。もし実験やモデルから「時間並進は強連続なユニタリ作用素族である」と分かったなら、その背後には本当に自己共役 Hamiltonian が存在するのでしょうか。

本章で証明する中心定理は、この二つを一つの対応にします。

$$
\boxed{
\text{自己共役 }H
\quad\longleftrightarrow\quad
\text{強連続1パラメータユニタリ群 }U(t)
}
$$

しかも対応は

$$
U(t)=e^{-itH/\hbar}
$$

で与えられます。本章ではこの式を単なる記号として使わず、**定義域・強微分・逆向きの生成作用素構成まで含めて証明**します。

---

## 1. 時間発展に必要な三つの条件

量子状態の時間発展を $U(t)$ で表すとします。時間を $s$ だけ進め、その後 $t$ だけ進めることと、最初から $s+t$ だけ進めることは一致してほしいので

$$
U(t+s)=U(t)U(s)
$$

を要求します。

また Born 則で使う内積を時間発展で壊さないため、各 $U(t)$ はユニタリであるべきです。

最後に、時刻をほんの少し変えたとき状態が突然飛ばないよう、各ベクトル $x$ に対して

$$
U(t)x
$$

が $t$ のノルム連続関数になることを要求します。

<a id="def-qm7-strongly-continuous-unitary-group"></a>

<!-- formal-statement-start -->
### 定義（強連続1パラメータユニタリ群）

複素 Hilbert 空間 $H$ 上の作用素族

$$
(U(t))_{t\in\mathbb R}
$$

が **強連続1パラメータユニタリ群**であるとは、次を満たすことをいう。

1. 各 $t\in\mathbb R$ について $U(t)$ はユニタリである。
2. 
   $$
   U(0)=I,
   \qquad
   U(t+s)=U(t)U(s)
   $$
   が全ての $s,t\in\mathbb R$ で成り立つ。
3. 各 $x\in H$ に対して
   $$
   \lim_{t\to t_0}\|U(t)x-U(t_0)x\|=0
   $$
   が全ての $t_0\in\mathbb R$ で成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm7-strongly-continuous-unitary-group -->

**定義の確認**

### 直接例：二準位 Hamiltonian

$H=\mathbb C^2$ とし、

$$
K=
\begin{pmatrix}
E_1&0\\
0&E_2
\end{pmatrix}
$$

とします。$\hbar>0$ を固定し、

$$
U(t)
=
\begin{pmatrix}
e^{-itE_1/\hbar}&0\\
0&e^{-itE_2/\hbar}
\end{pmatrix}
$$

と置きます。

各対角成分の絶対値は1なので

$$
U(t)^*U(t)=I.
$$

また

$$
e^{-i(t+s)E_j/\hbar}
=
e^{-itE_j/\hbar}e^{-isE_j/\hbar}
$$

より

$$
U(t+s)=U(t)U(s).
$$

さらに $x=(x_1,x_2)$ に対して

$$
\|U(t)x-U(t_0)x\|^2
=
|e^{-itE_1/\hbar}-e^{-it_0E_1/\hbar}|^2|x_1|^2
+
|e^{-itE_2/\hbar}-e^{-it_0E_2/\hbar}|^2|x_2|^2
$$

で、右辺は $t\to t_0$ で0へ収束します。

したがって $(U(t))_{t\in\mathbb R}$ は強連続1パラメータユニタリ群です。

<!-- definition-example-end -->

群性があるので、強連続性は実は $t_0=0$ だけ確認すれば十分です。実際、

$$
U(t)x-U(t_0)x
=
U(t_0)\{U(t-t_0)x-x\}
$$

だから、ユニタリ性より

$$
\|U(t)x-U(t_0)x\|
=
\|U(t-t_0)x-x\|.
$$

---

## 2. 自己共役作用素から時間発展を作る

自己共役作用素 $H$ のスペクトル PVM を $E_H$ とします。QM6 の Borel 関数計算で

$$
U_H(t)
=
e^{-itH/\hbar}
=
\int_{\mathbb R}
e^{-it\lambda/\hbar}
\,dE_H(\lambda)
$$

と定めます。

<a id="prop-qm7-self-adjoint-unitary-group"></a>

<!-- formal-statement-start -->
### 命題（自己共役作用素から得られるユニタリ群）

$H$ を複素 Hilbert 空間上の自己共役作用素、$\hbar>0$ とする。

$$
U_H(t)=e^{-itH/\hbar}
$$

と置くと、$(U_H(t))_{t\in\mathbb R}$ は強連続1パラメータユニタリ群である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
|e^{-it\lambda/\hbar}|=1
$$

なので、[QM6 のスペクトル位相作用素のユニタリ性](../QM6/index.md#prop-qm6-spectral-phase-unitary)から各 $U_H(t)$ はユニタリです。

次に Borel 関数計算の積の規則を使うと

$$
\begin{aligned}
U_H(t)U_H(s)
&=
\left(
\int e^{-it\lambda/\hbar}\,dE_H(\lambda)
\right)
\left(
\int e^{-is\lambda/\hbar}\,dE_H(\lambda)
\right)\\
&=
\int
e^{-i(t+s)\lambda/\hbar}
\,dE_H(\lambda)\\
&=
U_H(t+s).
\end{aligned}
$$

また $U_H(0)=I$ です。

最後に強連続性を示します。$x\in H$ を固定し、

$$
\mu_x^H(B)=\langle x,E_H(B)x\rangle
$$

と置きます。すると

$$
\begin{aligned}
\|U_H(t)x-U_H(t_0)x\|^2
&=
\int_{\mathbb R}
|e^{-it\lambda/\hbar}-e^{-it_0\lambda/\hbar}|^2
\,d\mu_x^H(\lambda).
\end{aligned}
$$

各 $\lambda$ について被積分関数は $t\to t_0$ で0へ収束します。また

$$
|e^{-it\lambda/\hbar}-e^{-it_0\lambda/\hbar}|^2
\le4.
$$

$\mu_x^H(\mathbb R)=\|x\|^2<\infty$ なので、[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\|U_H(t)x-U_H(t_0)x\|^2\to0.
$$

従って $(U_H(t))$ は強連続1パラメータユニタリ群です。$\square$
<!-- proof-end -->

この方向では $H$ が非有界でも問題ありません。指数関数

$$
e^{-it\lambda/\hbar}
$$

自体は有界だからです。

---

## 3. 時間発展を微分すると何が出るか

有限次元なら

$$
\frac{d}{dt}e^{-itH/\hbar}
=
-\frac{i}{\hbar}He^{-itH/\hbar}
$$

と行列の微分をすれば終わります。

しかし非有界 $H$ では、右辺 $Hx$ が意味を持つのは $x\in D(H)$ のときだけです。したがって「時間微分できる初期値」と「Hamiltonian の定義域」が一致するかを確認しなければなりません。

<a id="def-qm7-generator"></a>

<!-- formal-statement-start -->
### 定義（無限小生成作用素）

$(U(t))_{t\in\mathbb R}$ を強連続1パラメータユニタリ群とする。

$$
D(A)
=
\left\{
x\in H:
\lim_{t\to0}
\frac{U(t)x-x}{t}
\text{ が }H\text{ で存在する}
\right\}
$$

と置き、$x\in D(A)$ に対して

$$
Ax
=
\lim_{t\to0}
\frac{U(t)x-x}{t}
$$

と定める。

この $A$ を $(U(t))$ の **無限小生成作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm7-generator -->

**定義の確認**

### 直接例：二準位系の生成作用素

第1節の

$$
U(t)
=
\begin{pmatrix}
e^{-itE_1/\hbar}&0\\
0&e^{-itE_2/\hbar}
\end{pmatrix}
$$

では全ての $x\in\mathbb C^2$ に対して

$$
\frac{U(t)x-x}{t}
\to
-\frac{i}{\hbar}
\begin{pmatrix}
E_1&0\\
0&E_2
\end{pmatrix}
x.
$$

したがって

$$
D(A)=\mathbb C^2,
\qquad
A=-\frac{i}{\hbar}K.
$$

生成作用素は Hamiltonian そのものではなく、

$$
A=-\frac{i}{\hbar}H
$$

という歪自己共役側の作用素になります。

<!-- definition-example-end -->

群性から、$x\in D(A)$ なら全ての $s$ について $U(s)x\in D(A)$ です。実際、

$$
\frac{U(t)U(s)x-U(s)x}{t}
=
U(s)
\frac{U(t)x-x}{t}
$$

なので

$$
AU(s)x=U(s)Ax.
$$

従って軌道 $t\mapsto U(t)x$ は全ての時刻で微分可能で、

$$
\frac{d}{dt}U(t)x
=
U(t)Ax
=
AU(t)x.
$$

---

## 4. 強微分可能な初期値はちょうど $D(H)$

自己共役 $H$ から作った

$$
U_H(t)=e^{-itH/\hbar}
$$

について、生成作用素の定義域をスペクトル定理で完全に決めます。

<a id="thm-qm7-generator-domain"></a>

<!-- formal-statement-start -->
### 定理（強微分可能性と Hamiltonian の定義域）

$H$ を自己共役作用素とし、

$$
U_H(t)=e^{-itH/\hbar}
$$

とする。

このとき

$$
\boxed{
D(H)
=
\left\{
x\in H:
\lim_{t\to0}
\frac{U_H(t)x-x}{t}
\text{ が存在する}
\right\}
}
$$

であり、$x\in D(H)$ に対して

$$
\boxed{
\lim_{t\to0}
\frac{U_H(t)x-x}{t}
=
-\frac{i}{\hbar}Hx
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x\in D(H)$ とします。

[QM6 の非有界自己共役作用素のスペクトル定理](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)より

$$
\int_{\mathbb R}\lambda^2\,d\mu_x^H(\lambda)<\infty.
$$

差商と候補極限の差のノルムは

$$
\left\|
\frac{U_H(t)x-x}{t}
+
\frac{i}{\hbar}Hx
\right\|^2
=
\int_{\mathbb R}
\left|
\frac{e^{-it\lambda/\hbar}-1}{t}
+
\frac{i\lambda}{\hbar}
\right|^2
\,d\mu_x^H(\lambda).
$$

各 $\lambda$ について

$$
\frac{e^{-it\lambda/\hbar}-1}{t}
\to
-\frac{i\lambda}{\hbar}.
$$

さらに

$$
|e^{-iu}-1|\le |u|
$$

より

$$
\left|
\frac{e^{-it\lambda/\hbar}-1}{t}
\right|
\le
\frac{|\lambda|}{\hbar}.
$$

したがって

$$
\left|
\frac{e^{-it\lambda/\hbar}-1}{t}
+
\frac{i\lambda}{\hbar}
\right|^2
\le
\frac{4\lambda^2}{\hbar^2}.
$$

右辺は $\mu_x^H$ 可積分なので[優収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01)から

$$
\frac{U_H(t)x-x}{t}
\to
-\frac{i}{\hbar}Hx.
$$

逆に、差商が $H$ で収束するとします。するとある $\delta>0$ と $M>0$ が存在して

$$
0<|t|<\delta
\quad\Longrightarrow\quad
\left\|
\frac{U_H(t)x-x}{t}
\right\|
\le M.
$$

$t_n\to0$ となる $t_n\ne0$ を取ります。スペクトル表示から

$$
\left\|
\frac{U_H(t_n)x-x}{t_n}
\right\|^2
=
\int
\left|
\frac{e^{-it_n\lambda/\hbar}-1}{t_n}
\right|^2
\,d\mu_x^H(\lambda).
$$

各 $\lambda$ について被積分関数は

$$
\frac{\lambda^2}{\hbar^2}
$$

へ収束します。[Fatou の補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)から

$$
\begin{aligned}
\frac1{\hbar^2}
\int\lambda^2\,d\mu_x^H(\lambda)
&\le
\liminf_{n\to\infty}
\left\|
\frac{U_H(t_n)x-x}{t_n}
\right\|^2\\
&\le
M^2.
\end{aligned}
$$

従って

$$
\int\lambda^2\,d\mu_x^H(\lambda)<\infty.
$$

[QM6 の非有界自己共役作用素のスペクトル定理](../QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral)より $x\in D(H)$ です。

両包含が示されたので、強微分可能な初期値はちょうど $D(H)$ です。$\square$
<!-- proof-end -->

さらに $U_H(t)$ は $H$ の Borel 関数なのでスペクトル射影と可換します。従って

$$
U_H(t)D(H)=D(H),
\qquad
HU_H(t)x=U_H(t)Hx
$$

です。

したがって $x\in D(H)$ なら任意の時刻で

$$
\boxed{
\frac{d}{dt}U_H(t)x
=
-\frac{i}{\hbar}HU_H(t)x
}
$$

が成り立ちます。

---

## 5. 任意の強連続1パラメータユニタリ群から生成作用素を作る

本章の中心定理の逆向きでは、最初から $H$ は与えられていません。与えられているのは強連続1パラメータユニタリ群 $U(t)$ だけです。

まず、生成作用素を微分できるベクトルが十分たくさん存在することを示します。

固定した $x\in H$ と $h>0$ に対し

$$
x_h
=
\frac1h
\int_0^h U(s)x\,ds
$$

と置きます。

ここで積分は Hilbert 空間値の連続関数の積分です。閉区間上の Riemann 和を取り、$H$ の完備性で極限を取れば定義できます。

強連続性から

$$
\begin{aligned}
\|x_h-x\|
&\le
\frac1h
\int_0^h
\|U(s)x-x\|\,ds
\to0
\qquad(h\downarrow0).
\end{aligned}
$$

一方、

$$
\begin{aligned}
\frac{U(t)x_h-x_h}{t}
&=
\frac1{ht}
\left(
\int_h^{h+t}U(r)x\,dr
-
\int_0^tU(r)x\,dr
\right).
\end{aligned}
$$

$t\to0$ とすると、連続性から

$$
\frac1t\int_h^{h+t}U(r)x\,dr\to U(h)x,
$$

$$
\frac1t\int_0^tU(r)x\,dr\to x.
$$

したがって

$$
x_h\in D(A),
\qquad
Ax_h=\frac{U(h)x-x}{h}.
$$

<a id="prop-qm7-generator-density-skew"></a>

<!-- formal-statement-start -->
### 命題（生成作用素の稠密性と歪対称性）

$(U(t))_{t\in\mathbb R}$ を強連続1パラメータユニタリ群、$A$ をその無限小生成作用素とする。

このとき

1. $D(A)$ は $H$ に稠密である。
2. $x,y\in D(A)$ に対して
   $$
   \boxed{
   \langle Ax,y\rangle
   =
   -\langle x,Ay\rangle
   }
   $$
   が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

稠密性は上の平均ベクトル $x_h$ から直ちに従います。任意の $x\in H$ に対して $x_h\in D(A)$ かつ

$$
x_h\to x.
$$

従って $\overline{D(A)}=H$ です。

次に $x,y\in D(A)$ とします。ユニタリ性から

$$
\langle U(t)x,U(t)y\rangle
=
\langle x,y\rangle.
$$

両辺の $t=0$ における差商を取ります。

$$
\begin{aligned}
0
&=
\lim_{t\to0}
\frac{
\langle U(t)x,U(t)y\rangle-\langle x,y\rangle
}{t}\\
&=
\lim_{t\to0}
\left\langle
\frac{U(t)x-x}{t},
U(t)y
\right\rangle
+
\lim_{t\to0}
\left\langle
x,
\frac{U(t)y-y}{t}
\right\rangle\\
&=
\langle Ax,y\rangle+\langle x,Ay\rangle.
\end{aligned}
$$

従って

$$
\langle Ax,y\rangle
=
-\langle x,Ay\rangle.
$$

これが生成作用素の歪対称性です。$\square$
<!-- proof-end -->

---

## 6. Laplace 型積分で値域条件を作る

自己共役性へ戻るには、QM6 の値域判定

$$
\operatorname{Ran}(K\pm iI)=H
$$

を使います。

そのため、生成作用素 $A$ に対して

$$
\operatorname{Ran}(I-A)=H,
\qquad
\operatorname{Ran}(I+A)=H
$$

を示します。

任意の $x\in H$ に対して

$$
R_+x
=
\int_0^\infty e^{-s}U(s)x\,ds
$$

と置きます。ユニタリ性から

$$
\|e^{-s}U(s)x\|
=
e^{-s}\|x\|
$$

なので積分は収束し、

$$
\|R_+x\|\le\|x\|.
$$

<a id="prop-qm7-laplace-resolvent"></a>

<!-- formal-statement-start -->
### 命題（生成作用素の Laplace 型逆作用素）

$(U(t))$ の生成作用素を $A$ とする。

$$
R_+x
=
\int_0^\infty e^{-s}U(s)x\,ds,
\qquad
R_-x
=
\int_0^\infty e^{-s}U(-s)x\,ds
$$

と置くと、

$$
R_+x\in D(A),
\qquad
(I-A)R_+x=x,
$$

$$
R_-x\in D(A),
\qquad
(I+A)R_-x=x.
$$

したがって

$$
\boxed{
\operatorname{Ran}(I-A)=H,
\qquad
\operatorname{Ran}(I+A)=H
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $R_+$ を扱います。

$t>0$ とすると、変数変換 $r=s+t$ により

$$
\begin{aligned}
U(t)R_+x
&=
\int_0^\infty e^{-s}U(t+s)x\,ds\\
&=
e^t
\int_t^\infty e^{-r}U(r)x\,dr\\
&=
e^t
\left(
R_+x-\int_0^t e^{-r}U(r)x\,dr
\right).
\end{aligned}
$$

従って

$$
\begin{aligned}
\frac{U(t)R_+x-R_+x}{t}
&=
\frac{e^t-1}{t}R_+x
-
e^t
\frac1t
\int_0^t e^{-r}U(r)x\,dr.
\end{aligned}
$$

$t\downarrow0$ で

$$
\frac{e^t-1}{t}\to1
$$

かつ、$r\mapsto e^{-r}U(r)x$ は $r=0$ で連続なので

$$
\frac1t
\int_0^t e^{-r}U(r)x\,dr
\to x.
$$

従って右差商は

$$
R_+x-x
$$

へ収束します。

$t<0$ でも同じ変数変換を用い、向き付き積分

$$
\int_0^t=-\int_t^0
$$

として同じ式を書けば、左差商も同じ極限になります。

よって

$$
R_+x\in D(A),
\qquad
AR_+x=R_+x-x.
$$

従って

$$
(I-A)R_+x=x.
$$

次に

$$
V(t)=U(-t)
$$

と置きます。$V$ も強連続1パラメータユニタリ群で、その生成作用素は $-A$ です。

いま証明した $R_+$ の結果を $V$ に適用すると

$$
R_-x
=
\int_0^\infty e^{-s}V(s)x\,ds
\in D(-A)=D(A)
$$

で、

$$
(I-(-A))R_-x=x.
$$

従って

$$
(I+A)R_-x=x.
$$

任意の $x\in H$ に対して右辺を作れたので、

$$
\operatorname{Ran}(I-A)=H,
\qquad
\operatorname{Ran}(I+A)=H.
$$

$\square$
<!-- proof-end -->

この積分は、一般の半群論で現れるレゾルベント公式の可逆時間発展版です。本章では次の中心定理に必要な $\pm1$ の場合だけを使います。

---

## 7. 強連続時間発展と自己共役生成作用素

ここまでで逆向きの材料が揃いました。

生成作用素 $A$ は歪対称なので

$$
K=iA
$$

と置けば対称作用素になります。

実際、

$$
\langle Ax,y\rangle
=
-\langle x,Ay\rangle
$$

より

$$
\begin{aligned}
\langle Kx,y\rangle
&=
i\langle Ax,y\rangle\\
&=
-i\langle x,Ay\rangle\\
&=
\langle x,iAy\rangle\\
&=
\langle x,Ky\rangle.
\end{aligned}
$$

さらに前節から

$$
\operatorname{Ran}(A+I)=H,
\qquad
\operatorname{Ran}(A-I)=H.
$$

したがって

$$
\operatorname{Ran}(K+iI)
=
i\operatorname{Ran}(A+I)
=
H,
$$

$$
\operatorname{Ran}(K-iI)
=
i\operatorname{Ran}(A-I)
=
H.
$$

QM6 の自己共役性の値域判定がそのまま使えます。

<a id="thm-qm7-stone"></a>

<!-- formal-statement-start -->
### 定理（Stone の定理）

$\hbar>0$ を固定する。

複素 Hilbert 空間 $H$ 上の作用素族 $(U(t))_{t\in\mathbb R}$ について、次は同値である。

1. $(U(t))$ は強連続1パラメータユニタリ群である。
2. 一意な自己共役作用素 $\mathsf H$ が存在して
   $$
   \boxed{
   U(t)=e^{-it\mathsf H/\hbar}
   }
   $$
   が全ての $t\in\mathbb R$ で成り立つ。

このとき $(U(t))$ の無限小生成作用素を $A$ とすれば

$$
\boxed{
A=-\frac{i}{\hbar}\mathsf H,
\qquad
\mathsf H=i\hbar A
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$2\Rightarrow1$ は第2節で証明しました。

$1\Rightarrow2$ を示します。$A$ を $(U(t))$ の生成作用素とします。

第5節より $D(A)$ は稠密で、$A$ は歪対称です。そこで

$$
K=iA
$$

と置きます。上で確認した通り $K$ は稠密定義対称作用素です。

第6節より

$$
\operatorname{Ran}(I-A)=H,
\qquad
\operatorname{Ran}(I+A)=H.
$$

従って

$$
\operatorname{Ran}(K-iI)
=
i\operatorname{Ran}(A-I)
=
H,
$$

$$
\operatorname{Ran}(K+iI)
=
i\operatorname{Ran}(A+I)
=
H.
$$

[QM6 の自己共役性の値域判定](../QM6/index.md#thm-qm6-self-adjoint-range-criterion)から $K$ は自己共役です。

$$
\mathsf H=\hbar K=i\hbar A
$$

と置けば、$\mathsf H$ も自己共役です。

この $\mathsf H$ から

$$
V(t)=e^{-it\mathsf H/\hbar}
$$

を作ります。第4節より $V$ の生成作用素は

$$
-\frac{i}{\hbar}\mathsf H=A.
$$

あとは、同じ生成作用素を持つ二つの強連続1パラメータユニタリ群が一致することを示します。

$x\in D(A)$ と $t\in\mathbb R$ を固定し、

$$
F(s)=V(t-s)U(s)x
$$

と置きます。

生成作用素の定義と群性から

$$
AU(s)x=U(s)Ax,
$$

同様に

$$
AV(r)x=V(r)Ax
$$

が成り立ちます。

従って $F$ は微分可能で、

$$
\begin{aligned}
F'(s)
&=
-V(t-s)AU(s)x
+
V(t-s)U(s)Ax\\
&=
0.
\end{aligned}
$$

よって $F$ は定数です。

$s=0$ と $s=t$ を比べると

$$
V(t)x=U(t)x
\qquad(x\in D(A)).
$$

$D(A)$ は稠密で、$U(t),V(t)$ はともに有界作用素なので、この等式は全ての $x\in H$ へ延長されます。したがって

$$
U(t)=V(t)=e^{-it\mathsf H/\hbar}.
$$

最後に一意性を示します。もし別の自己共役作用素 $\widetilde H$ も

$$
U(t)=e^{-it\widetilde H/\hbar}
$$

を満たすなら、第4節の定義域特徴付けから

$$
D(\widetilde H)=D(A),
$$

かつ

$$
A=-\frac{i}{\hbar}\widetilde H.
$$

従って

$$
\widetilde H=i\hbar A=\mathsf H.
$$

よって自己共役生成作用素は一意です。$\square$
<!-- proof-end -->

Stone の定理の重要点は、「ユニタリ時間発展を与えるため Hamiltonian を自己共役にする」という一方向だけではありません。

$$
\boxed{
\text{強連続なユニタリ時間並進}
\text{そのものが}
\text{自己共役生成作用素を決める}
}
$$

という逆向きまで含んでいます。

---

## 8. Schrödinger 方程式を定義域込みで読む

時間に依存しない Hamiltonian $\mathsf H$ に対する Schrödinger 方程式は

$$
i\hbar\psi'(t)=\mathsf H\psi(t)
$$

です。

右辺を Hilbert 空間のベクトルとして読むには

$$
\psi(t)\in D(\mathsf H)
$$

が必要です。

<a id="def-qm7-schrodinger-strong-solution"></a>

<!-- formal-statement-start -->
### 定義（Schrödinger 方程式の強解）

$\mathsf H$ を自己共役作用素とする。

関数

$$
\psi:\mathbb R\to H
$$

が Schrödinger 方程式の **強解**であるとは、全ての $t$ について

1. $\psi(t)\in D(\mathsf H)$、
2. $\psi$ は $H$ のノルムで微分可能、
3. 
   $$
   i\hbar\psi'(t)=\mathsf H\psi(t)
   $$

を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm7-schrodinger-strong-solution -->

**定義の確認**

### 直接例：エネルギー固有状態

$\phi\in D(\mathsf H)$ が

$$
\mathsf H\phi=E\phi
$$

を満たすとします。

$$
\psi(t)=e^{-itE/\hbar}\phi
$$

と置くと、$\psi(t)\in D(\mathsf H)$ で

$$
\psi'(t)
=
-\frac{iE}{\hbar}
e^{-itE/\hbar}\phi.
$$

従って

$$
i\hbar\psi'(t)
=
E e^{-itE/\hbar}\phi
=
\mathsf H\psi(t).
$$

よって $\psi$ は強解です。

時間依存は位相因子だけですが、異なるエネルギー固有状態を重ね合わせると相対位相が変化し、観測確率に影響します。

<!-- definition-example-end -->

<a id="thm-qm7-schrodinger-evolution"></a>

<!-- formal-statement-start -->
### 定理（Schrödinger 発展の存在・一意性）

$\mathsf H$ を自己共役作用素とし、

$$
U(t)=e^{-it\mathsf H/\hbar}
$$

とする。

初期値

$$
\psi_0\in D(\mathsf H)
$$

に対して

$$
\boxed{
\psi(t)=U(t)\psi_0
}
$$

は

$$
i\hbar\psi'(t)=\mathsf H\psi(t),
\qquad
\psi(0)=\psi_0
$$

を満たす一意な強解である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第4節より

$$
U(t)D(\mathsf H)=D(\mathsf H)
$$

であり、

$$
\frac{d}{dt}U(t)\psi_0
=
-\frac{i}{\hbar}
\mathsf H U(t)\psi_0.
$$

従って

$$
i\hbar\psi'(t)
=
\mathsf H\psi(t).
$$

また

$$
\psi(0)=U(0)\psi_0=\psi_0.
$$

よって存在が示されました。

次に一意性を示します。$\phi(t)$ を同じ初期値を持つ別の強解とします。

$$
\chi(t)=U(-t)\phi(t)
$$

と置きます。

$U(-t)$ は $D(\mathsf H)$ を保ち、$\mathsf H$ と可換するので積の微分から

$$
\begin{aligned}
\chi'(t)
&=
\frac{i}{\hbar}\mathsf H U(-t)\phi(t)
+
U(-t)\phi'(t)\\
&=
\frac{i}{\hbar}
U(-t)\mathsf H\phi(t)
+
U(-t)
\left(
-\frac{i}{\hbar}\mathsf H\phi(t)
\right)\\
&=
0.
\end{aligned}
$$

従って $\chi(t)$ は定数で、

$$
\chi(t)=\chi(0)=\psi_0.
$$

両辺に $U(t)$ を作用させれば

$$
\phi(t)=U(t)\psi_0=\psi(t).
$$

よって強解は一意です。$\square$
<!-- proof-end -->

### 初期値が $D(\mathsf H)$ に入らない場合

$\psi_0\in H$ なら、たとえ

$$
\psi_0\notin D(\mathsf H)
$$

でも

$$
U(t)\psi_0
$$

自体は全ての $t$ で定義され、ノルム連続な時間発展になります。

しかし第4節より、そのとき

$$
\lim_{t\to0}
\frac{U(t)\psi_0-\psi_0}{t}
$$

は存在しません。

つまり

- ユニタリ時間発展は存在する。
- しかし Schrödinger 方程式を Hilbert 空間値の強微分方程式としては読めない。

という区別が生じます。

---

## 9. ノルムとエネルギー分布は保存される

<a id="prop-qm7-conservation"></a>

<!-- formal-statement-start -->
### 命題（ノルムとエネルギー分布の保存）

$\mathsf H$ を自己共役作用素、

$$
\psi(t)=e^{-it\mathsf H/\hbar}\psi_0
$$

とする。

このとき任意の $\psi_0\in H$ に対して

$$
\boxed{
\|\psi(t)\|=\|\psi_0\|
}
$$

が成り立つ。

さらに $E_{\mathsf H}$ を $\mathsf H$ のスペクトル PVM とすると、任意の Borel 集合 $B\subset\mathbb R$ に対して

$$
\boxed{
\langle\psi(t),E_{\mathsf H}(B)\psi(t)\rangle
=
\langle\psi_0,E_{\mathsf H}(B)\psi_0\rangle
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$U(t)=e^{-it\mathsf H/\hbar}$ はユニタリなので

$$
\|\psi(t)\|
=
\|U(t)\psi_0\|
=
\|\psi_0\|.
$$

次に $U(t)$ と $E_{\mathsf H}(B)$ は同じスペクトル PVM の関数計算から作られるので可換します。

従って

$$
E_{\mathsf H}(B)U(t)
=
U(t)E_{\mathsf H}(B).
$$

よって

$$
\begin{aligned}
\langle\psi(t),E_{\mathsf H}(B)\psi(t)\rangle
&=
\|E_{\mathsf H}(B)U(t)\psi_0\|^2\\
&=
\|U(t)E_{\mathsf H}(B)\psi_0\|^2\\
&=
\|E_{\mathsf H}(B)\psi_0\|^2\\
&=
\langle\psi_0,E_{\mathsf H}(B)\psi_0\rangle.
\end{aligned}
$$

従って Hamiltonian の測定値の確率分布そのものが時間に依らず保存されます。$\square$
<!-- proof-end -->

$\psi_0\in D(\mathsf H)$ なら特に期待値も

$$
\langle\psi(t),\mathsf H\psi(t)\rangle
=
\langle\psi_0,\mathsf H\psi_0\rangle
$$

で保存されます。

---

## 10. 二準位系では相対位相が動く

$$
\mathsf H
=
\begin{pmatrix}
E_1&0\\
0&E_2
\end{pmatrix}
$$

とし、

$$
\psi_0
=
a e_1+b e_2
$$

とします。

時間発展は

$$
\psi(t)
=
a e^{-itE_1/\hbar}e_1
+
b e^{-itE_2/\hbar}e_2.
$$

全体から

$$
e^{-itE_1/\hbar}
$$

をくくると

$$
\psi(t)
=
e^{-itE_1/\hbar}
\left(
a e_1
+
b e^{-it(E_2-E_1)/\hbar}e_2
\right).
$$

global phase は測定確率に影響しませんが、

$$
e^{-it(E_2-E_1)/\hbar}
$$

という相対位相は残ります。

したがって時間発展で物理的に効くのは、絶対的なエネルギー値だけでなく**エネルギー差が作る相対位相**です。

---

## 11. 自由粒子では Fourier 空間で位相が回る

QM6 の自由粒子 Hamiltonian は

$$
\mathsf H_0
=
\mathcal F^{-1}
M_h
\mathcal F,
\qquad
h(\xi)
=
\frac{\hbar^2\xi^2}{2m}.
$$

したがって Borel 関数計算から

$$
U_0(t)
=
e^{-it\mathsf H_0/\hbar}
=
\mathcal F^{-1}
M_{e^{-ith(\xi)/\hbar}}
\mathcal F.
$$

つまり

$$
\boxed{
\widehat{\psi(t)}(\xi)
=
e^{-it\hbar\xi^2/(2m)}
\widehat{\psi_0}(\xi)
}
$$

です。

各 Fourier 成分の絶対値は変わらず、

$$
|\widehat{\psi(t)}(\xi)|
=
|\widehat{\psi_0}(\xi)|.
$$

変わるのは $\xi$ に依存する位相です。異なる周波数で位相回転速度が違うため、逆 Fourier 変換した位置空間では波束の形が変化します。

$\psi_0\in D(\mathsf H_0)$ なら

$$
\int_{\mathbb R}
\xi^4
|\widehat{\psi_0}(\xi)|^2\,d\xi
<\infty
$$

であり、[強微分可能性と Hamiltonian の定義域](#thm-qm7-generator-domain)から

$$
i\hbar\frac{d}{dt}\psi(t)
=
\mathsf H_0\psi(t)
$$

が $L^2$ ノルムの意味で成立します。

---

## 12. Hamiltonian は時間並進の生成作用素である

ここまでの結果を、量子力学の言葉へ戻します。

時間に依存しない量子系で

$$
U(t)
$$

を「時刻を $t$ だけ進める作用素」とします。

時間並進が

- 可逆で、
- 内積を保ち、
- 時間について強連続

なら、[Stone の定理](#thm-qm7-stone)によって一意な自己共役作用素 $\mathsf H$ が存在して

$$
U(t)=e^{-it\mathsf H/\hbar}.
$$

したがって Hamiltonian は単に「エネルギーを表す観測量」として別個に置かれるだけでなく、数学的には

$$
\boxed{
\mathsf H
=
i\hbar
\left.
\frac{d}{dt}U(t)
\right|_{t=0}
}
$$

という意味で**時間並進を生成する自己共役作用素**です。

ただし右辺は全てのベクトルで定義されるわけではなく、

$$
D(\mathsf H)
=
D(A)
$$

の上でだけ意味を持ちます。ここでも非有界作用素では定義域が理論の一部です。

---

## 13. 演習

### Level A

<a id="ex-qm7-a01"></a>
#### QM7-A01 二準位時間発展
- Level: A

$$
\mathsf H=
\begin{pmatrix}
E_1&0\\
0&E_2
\end{pmatrix}
$$

に対して

$$
U(t)=e^{-it\mathsf H/\hbar}
$$

を具体的に書き、

1. $U(t+s)=U(t)U(s)$、
2. $U(t)^*U(t)=I$、
3. 
   $$
   \left.\frac{d}{dt}U(t)x\right|_{t=0}
   =
   -\frac{i}{\hbar}\mathsf Hx
   $$

を確認せよ。

<!-- solution-start -->
### 詳細解答

対角行列の関数計算から

$$
U(t)
=
\begin{pmatrix}
e^{-itE_1/\hbar}&0\\
0&e^{-itE_2/\hbar}
\end{pmatrix}.
$$

まず各対角成分について指数法則が成り立つので

$$
\begin{aligned}
U(t)U(s)
&=
\begin{pmatrix}
e^{-i(t+s)E_1/\hbar}&0\\
0&e^{-i(t+s)E_2/\hbar}
\end{pmatrix}\\
&=
U(t+s).
\end{aligned}
$$

次に

$$
U(t)^*
=
\begin{pmatrix}
e^{itE_1/\hbar}&0\\
0&e^{itE_2/\hbar}
\end{pmatrix}
$$

だから

$$
U(t)^*U(t)=I.
$$

最後に $x=(x_1,x_2)$ とすると

$$
\frac{U(t)x-x}{t}
=
\left(
\frac{e^{-itE_1/\hbar}-1}{t}x_1,
\frac{e^{-itE_2/\hbar}-1}{t}x_2
\right).
$$

$t\to0$ で

$$
\frac{e^{-itE_j/\hbar}-1}{t}
\to
-\frac{iE_j}{\hbar}
$$

なので

$$
\left.\frac{d}{dt}U(t)x\right|_{t=0}
=
-\frac{i}{\hbar}
\begin{pmatrix}
E_1&0\\
0&E_2
\end{pmatrix}
x.
$$
<!-- solution-end -->

<a id="ex-qm7-a02"></a>
#### QM7-A02 $\ell^2$ 上の対角 Hamiltonian
- Level: A

$\ell^2$ の標準基底を $(e_n)$ とし、

$$
\mathsf H e_n=n e_n
$$

とする最大対角作用素を考える。

1. $U(t)e_n$ を求めよ。
2. $x=(x_n)$ に対して $U(t)x$ を書け。
3. $U(t)$ の $t=0$ における強微分が存在するための条件を求めよ。

<!-- solution-start -->
### 詳細解答

スペクトル関数計算から

$$
U(t)e_n=e^{-itn/\hbar}e_n.
$$

従って一般の $x=(x_n)\in\ell^2$ に対して

$$
U(t)x
=
(e^{-itn/\hbar}x_n)_{n\ge1}.
$$

差商のノルムは

$$
\left\|
\frac{U(t)x-x}{t}
\right\|^2
=
\sum_{n=1}^\infty
\left|
\frac{e^{-itn/\hbar}-1}{t}
\right|^2
|x_n|^2.
$$

[強微分可能性と Hamiltonian の定義域](#thm-qm7-generator-domain)から強微分が存在することは

$$
x\in D(\mathsf H)
$$

と同値です。

この対角作用素では

$$
D(\mathsf H)
=
\left\{
x\in\ell^2:
\sum_{n=1}^\infty n^2|x_n|^2<\infty
\right\}.
$$

従って条件は

$$
\boxed{
\sum_{n=1}^\infty n^2|x_n|^2<\infty
}
$$

です。そのとき

$$
\left.\frac{d}{dt}U(t)x\right|_{t=0}
=
-\frac{i}{\hbar}(n x_n)_{n\ge1}.
$$
<!-- solution-end -->

<a id="ex-qm7-a03"></a>
#### QM7-A03 ノルム保存
- Level: A

$\psi(t)=U(t)\psi_0$ で $U(t)$ がユニタリとする。

1. $\|\psi(t)\|$ が一定であることを示せ。
2. $\|\psi_0\|=1$ なら全ての $t$ で $\|\psi(t)\|=1$ であることを確認せよ。

<!-- solution-start -->
### 詳細解答

ユニタリ作用素はノルムを保つので

$$
\|\psi(t)\|
=
\|U(t)\psi_0\|
=
\|\psi_0\|.
$$

したがって $t$ に依らず一定です。

特に

$$
\|\psi_0\|=1
$$

なら

$$
\|\psi(t)\|=1
$$

です。従って Born 則で状態を単位ベクトルとして正規化した条件は時間発展で壊れません。
<!-- solution-end -->

<a id="ex-qm7-a04"></a>
#### QM7-A04 エネルギー固有状態の強解
- Level: A

$$
\mathsf H\phi=E\phi,
\qquad
\|\phi\|=1
$$

とする。

$$
\psi(t)=e^{-itE/\hbar}\phi
$$

が Schrödinger 方程式の強解であることを、定義の三条件に沿って確認せよ。

<!-- solution-start -->
### 詳細解答

まず $\phi\in D(\mathsf H)$ で、定義域は線形空間なので

$$
\psi(t)=e^{-itE/\hbar}\phi\in D(\mathsf H).
$$

次にスカラー関数 $e^{-itE/\hbar}$ は微分可能だから

$$
\psi'(t)
=
-\frac{iE}{\hbar}
e^{-itE/\hbar}\phi.
$$

従って Hilbert 空間のノルムでも微分可能です。

最後に

$$
\begin{aligned}
i\hbar\psi'(t)
&=
E e^{-itE/\hbar}\phi\\
&=
e^{-itE/\hbar}\mathsf H\phi\\
&=
\mathsf H\psi(t).
\end{aligned}
$$

よって三条件を全て満たし、$\psi$ は強解です。
<!-- solution-end -->

### Level B

<a id="ex-qm7-b01"></a>
#### QM7-B01 差商の有界性から $D(\mathsf H)$ を回収する
- Level: B

$\mathsf H$ を自己共役、

$$
U(t)=e^{-it\mathsf H/\hbar}
$$

とする。

ある $x\in H$ について

$$
\sup_{0<|t|<\delta}
\left\|
\frac{U(t)x-x}{t}
\right\|
<\infty
$$

となる $\delta>0$ が存在すると仮定する。

この仮定だけから $x\in D(\mathsf H)$ を示せ。

<!-- solution-start -->
### 詳細解答

仮定より、ある $M>0$ が存在して

$$
0<|t|<\delta
\quad\Longrightarrow\quad
\left\|
\frac{U(t)x-x}{t}
\right\|
\le M.
$$

$t_n\to0$ かつ $0<|t_n|<\delta$ となる列を取ります。

$\mathsf H$ のスペクトル PVM を $E_{\mathsf H}$ とし、

$$
\mu_x(B)=\langle x,E_{\mathsf H}(B)x\rangle
$$

と置きます。

すると

$$
\left\|
\frac{U(t_n)x-x}{t_n}
\right\|^2
=
\int
\left|
\frac{e^{-it_n\lambda/\hbar}-1}{t_n}
\right|^2
\,d\mu_x(\lambda).
$$

各 $\lambda$ について

$$
\left|
\frac{e^{-it_n\lambda/\hbar}-1}{t_n}
\right|^2
\to
\frac{\lambda^2}{\hbar^2}.
$$

[Fatou の補題](../F0_00D2B_単調収束_Fatou_優収束/index.md#lem-f0-00d2b-01)により

$$
\begin{aligned}
\frac1{\hbar^2}
\int\lambda^2\,d\mu_x(\lambda)
&\le
\liminf_{n\to\infty}
\int
\left|
\frac{e^{-it_n\lambda/\hbar}-1}{t_n}
\right|^2
\,d\mu_x(\lambda)\\
&\le M^2.
\end{aligned}
$$

従って

$$
\int\lambda^2\,d\mu_x(\lambda)<\infty.
$$

QM6 の非有界自己共役スペクトル定理による定義域表示から

$$
x\in D(\mathsf H).
$$

差商が収束することまで仮定しなくても、0近傍で一様に有界なら定義域へ入ることが分かります。
<!-- solution-end -->

<a id="ex-qm7-b02"></a>
#### QM7-B02 Laplace 型逆作用素を導く
- Level: B

$(U(t))$ を強連続1パラメータユニタリ群、$A$ を生成作用素とする。

$$
R_+x
=
\int_0^\infty e^{-s}U(s)x\,ds
$$

と置く。

1. $\|R_+x\|\le\|x\|$ を示せ。
2. $R_+x\in D(A)$ を示せ。
3. $(I-A)R_+x=x$ を示せ。

<!-- solution-start -->
### 詳細解答

ユニタリ性から

$$
\|U(s)x\|=\|x\|.
$$

従って

$$
\begin{aligned}
\|R_+x\|
&\le
\int_0^\infty e^{-s}\|U(s)x\|\,ds\\
&=
\|x\|
\int_0^\infty e^{-s}\,ds\\
&=
\|x\|.
\end{aligned}
$$

次に $t>0$ とし、

$$
U(t)R_+x
=
\int_0^\infty e^{-s}U(t+s)x\,ds.
$$

$r=t+s$ と変数変換すると

$$
U(t)R_+x
=
e^t
\int_t^\infty e^{-r}U(r)x\,dr.
$$

従って

$$
U(t)R_+x
=
e^t
\left(
R_+x-\int_0^t e^{-r}U(r)x\,dr
\right).
$$

よって

$$
\frac{U(t)R_+x-R_+x}{t}
=
\frac{e^t-1}{t}R_+x
-
e^t
\frac1t
\int_0^t e^{-r}U(r)x\,dr.
$$

$t\downarrow0$ で第1項は $R_+x$ へ収束します。

第2項では $e^{-r}U(r)x\to x$ だから

$$
\frac1t
\int_0^t e^{-r}U(r)x\,dr
\to x.
$$

したがって右差商は

$$
R_+x-x
$$

へ収束します。$t<0$ からも同じ極限が得られるので

$$
R_+x\in D(A)
$$

で、

$$
AR_+x=R_+x-x.
$$

従って

$$
(I-A)R_+x=x.
$$
<!-- solution-end -->

<a id="ex-qm7-b03"></a>
#### QM7-B03 自由粒子の Schrödinger 発展
- Level: B

$$
\mathsf H_0
=
\mathcal F^{-1}
M_{\hbar^2\xi^2/(2m)}
\mathcal F
$$

とする。

1. $U_0(t)=e^{-it\mathsf H_0/\hbar}$ を Fourier 空間で書け。
2. $\|\psi(t)\|_2=\|\psi_0\|_2$ を示せ。
3. $\psi_0\in D(\mathsf H_0)$ なら Schrödinger 方程式を満たすことを Fourier 空間で直接確認せよ。

<!-- solution-start -->
### 詳細解答

関数計算とユニタリ同値性から

$$
U_0(t)
=
\mathcal F^{-1}
M_{\exp(-it\hbar\xi^2/(2m))}
\mathcal F.
$$

従って

$$
\widehat{\psi(t)}(\xi)
=
e^{-it\hbar\xi^2/(2m)}
\widehat{\psi_0}(\xi).
$$

位相因子の絶対値は1なので

$$
|\widehat{\psi(t)}(\xi)|
=
|\widehat{\psi_0}(\xi)|.
$$

Plancherel の等式から

$$
\|\psi(t)\|_2
=
\|\widehat{\psi(t)}\|_2
=
\|\widehat{\psi_0}\|_2
=
\|\psi_0\|_2.
$$

次に $\psi_0\in D(\mathsf H_0)$ とします。この条件は

$$
\frac{\hbar^2\xi^2}{2m}\widehat{\psi_0}(\xi)
\in L^2
$$

です。

Fourier 空間で微分すると

$$
\frac{\partial}{\partial t}
\widehat{\psi(t)}(\xi)
=
-\frac{i\hbar\xi^2}{2m}
e^{-it\hbar\xi^2/(2m)}
\widehat{\psi_0}(\xi).
$$

右辺は $L^2$ に属します。従って $L^2$ の強微分として

$$
i\hbar
\frac{\partial}{\partial t}
\widehat{\psi(t)}(\xi)
=
\frac{\hbar^2\xi^2}{2m}
\widehat{\psi(t)}(\xi).
$$

逆 Fourier 変換すれば

$$
i\hbar\psi'(t)
=
\mathsf H_0\psi(t).
$$
<!-- solution-end -->

### Level C

<a id="ex-qm7-c01"></a>
#### QM7-C01 Stone の定理の逆向きを再構成する
- Level: C

$(U(t))_{t\in\mathbb R}$ を複素 Hilbert 空間上の強連続1パラメータユニタリ群とし、

$$
Ax
=
\lim_{t\to0}
\frac{U(t)x-x}{t}
$$

で生成作用素を定める。

次を順に示し、自己共役作用素

$$
\mathsf H=i\hbar A
$$

が存在して

$$
U(t)=e^{-it\mathsf H/\hbar}
$$

となることを導け。

1. 平均ベクトル
   $$
   x_h=\frac1h\int_0^hU(s)x\,ds
   $$
   が $D(A)$ に属し、$x_h\to x$ である。
2. $A$ は歪対称である。
3. 
   $$
   R_\pm x
   =
   \int_0^\infty e^{-s}U(\pm s)x\,ds
   $$
   を用いて
   $$
   \operatorname{Ran}(I-A)=
   \operatorname{Ran}(I+A)=H
   $$
   を示せ。
4. $K=iA$ が自己共役であることを QM6 の値域判定から示せ。
5. $\mathsf H=\hbar K$ と置き、$U(t)=e^{-it\mathsf H/\hbar}$ を示せ。

<!-- solution-start -->
### 詳細解答

1. まず
   $$
   \|x_h-x\|
   \le
   \frac1h
   \int_0^h
   \|U(s)x-x\|\,ds.
   $$
   強連続性から被積分関数は $s\downarrow0$ で0へ収束するので
   $$
   x_h\to x.
   $$
   
   また
   $$
   \frac{U(t)x_h-x_h}{t}
   =
   \frac1{ht}
   \left(
   \int_h^{h+t}U(r)x\,dr
   -
   \int_0^tU(r)x\,dr
   \right).
   $$
   $t\to0$ で
   $$
   \frac1t\int_h^{h+t}U(r)x\,dr\to U(h)x,
   \qquad
   \frac1t\int_0^tU(r)x\,dr\to x.
   $$
   よって
   $$
   x_h\in D(A),
   \qquad
   Ax_h=\frac{U(h)x-x}{h}.
   $$
   任意の $x$ を $D(A)$ の元で近似できるので $D(A)$ は稠密です。

2. $x,y\in D(A)$ とします。ユニタリ性から
   $$
   \langle U(t)x,U(t)y\rangle=\langle x,y\rangle.
   $$
   $t=0$ で微分すると
   $$
   \langle Ax,y\rangle+\langle x,Ay\rangle=0.
   $$
   従って
   $$
   \langle Ax,y\rangle=-\langle x,Ay\rangle.
   $$

3. 
   $$
   R_+x=\int_0^\infty e^{-s}U(s)x\,ds
   $$
   と置きます。第6節と同じ計算で
   $$
   AR_+x=R_+x-x.
   $$
   よって
   $$
   (I-A)R_+x=x.
   $$
   任意の $x$ に対して $R_+x$ が作れるので
   $$
   \operatorname{Ran}(I-A)=H.
   $$
   
   次に $V(t)=U(-t)$ を考えると生成作用素は $-A$ です。
   $$
   R_-x=\int_0^\infty e^{-s}V(s)x\,ds
   $$
   に同じ計算を適用して
   $$
   (I+A)R_-x=x.
   $$
   従って
   $$
   \operatorname{Ran}(I+A)=H.
   $$

4. $K=iA$ と置きます。2より
   $$
   \begin{aligned}
   \langle Kx,y\rangle
   &=
   i\langle Ax,y\rangle\\
   &=
   -i\langle x,Ay\rangle\\
   &=
   \langle x,Ky\rangle.
   \end{aligned}
   $$
   よって $K$ は対称です。
   
   また
   $$
   K+iI=i(A+I),
   $$
   だから
   $$
   \operatorname{Ran}(K+iI)=H.
   $$
   同様に
   $$
   K-iI=i(A-I)
   $$
   で、3の $\operatorname{Ran}(I-A)=H$ は符号を変えて
   $$
   \operatorname{Ran}(A-I)=H
   $$
   を意味するので
   $$
   \operatorname{Ran}(K-iI)=H.
   $$
   
   [QM6 の自己共役性の値域判定](../QM6/index.md#thm-qm6-self-adjoint-range-criterion)から $K$ は自己共役です。

5. 
   $$
   \mathsf H=\hbar K=i\hbar A
   $$
   と置けば $\mathsf H$ は自己共役です。
   
   $$
   V(t)=e^{-it\mathsf H/\hbar}
   $$
   と置くと、第4節より $V$ の生成作用素は
   $$
   -\frac{i}{\hbar}\mathsf H=A.
   $$
   
   $x\in D(A)$ に対して
   $$
   F(s)=V(t-s)U(s)x
   $$
   と置けば
   $$
   F'(s)
   =
   -V(t-s)AU(s)x
   +
   V(t-s)U(s)Ax
   =
   0.
   $$
   従って
   $$
   V(t)x=U(t)x
   $$
   が $D(A)$ 上で成り立ちます。
   
   $D(A)$ は稠密で両作用素は有界なので、全ての $x\in H$ に対して
   $$
   U(t)x=V(t)x.
   $$
   よって
   $$
   \boxed{
   U(t)=e^{-it\mathsf H/\hbar}
   }.
   $$
<!-- solution-end -->

---

## 14. まとめ

本章では、QM6 の非有界自己共役スペクトル理論を時間発展へ接続しました。

- 自己共役作用素 $\mathsf H$ から
  $$
  U(t)=e^{-it\mathsf H/\hbar}
  $$
  を作ると、強連続1パラメータユニタリ群になる。
- $U(t)$ が強微分可能な初期値はちょうど
  $$
  D(\mathsf H)
  $$
  である。
- その定義域上で
  $$
  \frac{d}{dt}U(t)x
  =
  -\frac{i}{\hbar}\mathsf H U(t)x
  $$
  が成り立つ。
- 一般の強連続1パラメータユニタリ群の生成作用素 $A$ は稠密定義で歪対称である。
- Laplace 型積分により
  $$
  \operatorname{Ran}(I\pm A)=H
  $$
  を示せる。
- $K=iA$ に QM6 の自己共役性判定を適用すると $K$ は自己共役になる。
- [Stone の定理](#thm-qm7-stone)により
  $$
  \boxed{
  U(t)=e^{-it\mathsf H/\hbar},
  \qquad
  \mathsf H=i\hbar A
  }
  $$
  という一対一対応が得られる。
- $\psi_0\in D(\mathsf H)$ なら
  $$
  \psi(t)=U(t)\psi_0
  $$
  は Schrödinger 方程式の一意な強解である。
- $\psi_0\notin D(\mathsf H)$ でもユニタリ時間発展は存在するが、強微分形の Schrödinger 方程式は成立しない。
- ノルムだけでなく Hamiltonian のスペクトル分布全体が時間発展で保存される。
- 自由粒子では Fourier 空間の各周波数成分が
  $$
  e^{-it\hbar\xi^2/(2m)}
  $$
  という位相で回転する。

次の QM8 では、位置と運動量の形式的な交換関係

$$
[Q,P]=i\hbar I
$$

を非有界作用素の積の定義域問題まで含めて見直します。そのうえで Weyl 関係へ移り、個々の作用素ではなく**作用素が生成する非可換代数**を見る理由を作ります。
