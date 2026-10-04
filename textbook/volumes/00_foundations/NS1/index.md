# NS1 発散零空間・Leray 射影・Stokes 作用素

VC9 では、質量保存と運動量保存から非圧縮 Navier--Stokes 方程式

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u+f,
\qquad
\nabla\cdot u=0
$$

までを導きました。

ここから解析へ進むと、最初の障害は圧力 $p$ です。速度 $u$ の時間発展を調べたいのに、方程式には未知のスカラー場 $p$ が同時に現れます。しかし圧力は独立に好きな値を取る未知量ではありません。非圧縮条件

$$
\nabla\cdot u=0
$$

を時間発展の間ずっと保つために、速度の「勾配方向の成分」を打ち消す役割を持っています。

そこで本章では、

~~~text
非圧縮条件
  ↓
各 Fourier モードは波数 k に直交する
  ↓
各モードを k に直交する平面へ射影する
  ↓
発散零方向への直交射影
  ↓
圧力を消した速度だけの方程式
  ↓
粘性項を扱う線形作用素
~~~

という順で、圧力と発散零制約を Hilbert 空間の構造へ組み込みます。

前提は [VC9 保存則・流体・Maxwell 方程式](../VC9/index.md)、[FOU4 Plancherel・L2 Fourier解析](../FOU4/index.md)、[GPDE3 Sobolev 空間](../GPDE3/index.md) です。VC9 の流体方程式を再導出するのではなく、ここではその解析構造を作ります。

---

## 1. 証明の舞台を三次元トーラスに固定する

境界のある領域では、速度の境界条件、圧力の境界条件、境界正則性が同時に入ってきます。三次元 Navier--Stokes の非線形機構そのものを見る最初の舞台としては、周期境界条件の方が余計な論点が少なくなります。

本章では

$$
\mathbb T^3
=
(\mathbb R/2\pi\mathbb Z)^3
$$

を三次元トーラスとし、$x=(x_1,x_2,x_3)$ の各成分について $2\pi$ 周期のベクトル場を扱います。

十分滑らかな複素ベクトル場 $u:\mathbb T^3\to\mathbb C^3$ の Fourier 係数を

$$
\widehat u(k)
=
\frac1{(2\pi)^3}
\int_{\mathbb T^3}
u(x)e^{-ik\cdot x}\,dx,
\qquad
k\in\mathbb Z^3
$$

とします。

実数値ベクトル場では

$$
\widehat u(-k)=\overline{\widehat u(k)}
$$

が成り立ちます。以後の議論は複素表示を使いますが、実数値場にもそのまま戻せます。

FOU4 の $L^2$ Fourier 理論と同じく、周期場でも三つの座標に一変数 Fourier 展開を順に適用すると、三角多項式が $L^2(\mathbb T^3)$ に稠密で、Parseval 型の等式

$$
\|u\|_{L^2(\mathbb T^3)}^2
=
(2\pi)^3
\sum_{k\in\mathbb Z^3}
|\widehat u(k)|^2
$$

を得ます。本章で必要なのは、この「$L^2$ ノルムを Fourier 係数の二乗和で測れる」ことです。

平均値は $k=0$ の係数です。

$$
\widehat u(0)
=
\frac1{(2\pi)^3}\int_{\mathbb T^3}u(x)\,dx.
$$

以後は平均零

$$
\widehat u(0)=0
$$

の速度場を主に扱います。平均速度は空間的に一定なので、別に分離して扱えるためです。

---

## 2. 非圧縮条件は各モードの直交条件になる

実空間での条件

$$
\nabla\cdot u=0
$$

を Fourier 空間へ移します。

有限 Fourier 和

$$
u(x)
=
\sum_{k\in F}\widehat u(k)e^{ik\cdot x}
$$

を考えると、

$$
\nabla\cdot u
=
\sum_{k\in F}
i\,k\cdot\widehat u(k)e^{ik\cdot x}.
$$

したがって、発散が恒等的に0であるためには各係数が0でなければなりません。

<a id="prop-ns1-divergence-fourier"></a>
<!-- formal-statement-start -->
> **命題（発散零条件の Fourier 表示）**  
> 滑らかな周期ベクトル場 $u$ について

$$
\nabla\cdot u=0
$$

> であることと、すべての $k\in\mathbb Z^3$ について

$$
k\cdot\widehat u(k)=0
$$

> が成り立つことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

微分は Fourier 側で $ik_j$ の乗算になります。したがって発散は、各モードで $i\,k\cdot\widehat u(k)$ を係数に持ちます。

<!-- proof-start -->
### 証明

成分ごとに

$$
u_j(x)
=
\sum_{k\in\mathbb Z^3}
\widehat u_j(k)e^{ik\cdot x}
$$

と書きます。滑らかさにより項別微分でき、

$$
\partial_j u_j(x)
=
\sum_{k\in\mathbb Z^3}
ik_j\widehat u_j(k)e^{ik\cdot x}.
$$

$j=1,2,3$ で足すと

$$
\nabla\cdot u
=
\sum_{k\in\mathbb Z^3}
i
\left(
\sum_{j=1}^3k_j\widehat u_j(k)
\right)
e^{ik\cdot x}
=
\sum_{k\in\mathbb Z^3}
i\,k\cdot\widehat u(k)e^{ik\cdot x}.
$$

Fourier 係数の一意性から、この関数が0であることと、各 $k$ で

$$
i\,k\cdot\widehat u(k)=0
$$

であることは同値です。$i\ne0$ なので

$$
k\cdot\widehat u(k)=0
$$

を得ます。逆向きは同じ式へ代入すれば従います。
<!-- proof-end -->

### 例1：単一モード

$$
u(x)=ae^{ik\cdot x}
$$

とします。ここで $k\in\mathbb Z^3\setminus\{0\}$、$a\in\mathbb C^3$ です。

発散は

$$
\nabla\cdot u
=
i(k\cdot a)e^{ik\cdot x}
$$

なので、

$$
\nabla\cdot u=0
\quad\Longleftrightarrow\quad
k\cdot a=0.
$$

つまり非圧縮条件は、各波数 $k$ に対して振幅ベクトル $a$ が $k$ に垂直であることです。

---

## 3. 発散零場だけを集めた閉部分空間

Navier--Stokes の速度は、任意の $L^2$ ベクトル場ではなく、発散零条件を満たす部分空間の中を動きます。

まずこの空間を Fourier 係数で固定します。

<a id="def-ns1-divergence-free-space"></a>
<!-- formal-statement-start -->
> **定義（周期発散零空間）**  
> 平均零の $L^2$ 周期ベクトル場のうち

$$
k\cdot\widehat u(k)=0
\qquad
(k\in\mathbb Z^3\setminus\{0\})
$$

> を満たすもの全体を $H$ と書く。すなわち

$$
H
=
\left\{
u\in L^2(\mathbb T^3;\mathbb R^3):
\widehat u(0)=0,\ 
k\cdot\widehat u(k)=0
\ \text{for }k\ne0
\right\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns1-divergence-free-space -->
**定義の確認**。

$$
u(x_1,x_2,x_3)
=
(\sin x_2,0,0)
$$

を考えます。平均は0です。また

$$
\nabla\cdot u
=
\partial_1(\sin x_2)=0.
$$

Fourier モードは $k=(0,\pm1,0)$ だけにあり、振幅は $e_1=(1,0,0)$ 方向です。

$$
(0,\pm1,0)\cdot(1,0,0)=0
$$

なので、この場は $H$ に入ります。
<!-- definition-example-end -->

この定義は「弱い意味の発散零」を Fourier 係数で書いたものです。一方、PDE では滑らかな発散零場から近似できることも重要です。

<a id="prop-ns1-divergence-free-closure"></a>
<!-- formal-statement-start -->
> **命題（発散零空間の閉包表示）**  
> $H$ は、平均零で滑らかな発散零三角多項式全体の $L^2(\mathbb T^3)$ 閉包に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$u\in H$ の Fourier 級数を有限個の波数だけで切れば、各有限和も同じ直交条件を保つため発散零です。Parseval により切り捨て誤差は $L^2$ で0へ行きます。逆向きでは、各 Fourier 係数は $L^2$ 収束に対して連続なので、発散零条件が極限へ残ります。

<!-- proof-start -->
### 証明

まず $u\in H$ とします。$N\ge1$ に対し

$$
u_N(x)
=
\sum_{0<|k|\le N}
\widehat u(k)e^{ik\cdot x}
$$

と置きます。

これは有限 Fourier 和なので滑らかです。また各 $k$ で

$$
k\cdot\widehat u(k)=0
$$

だから、[発散零条件の Fourier 表示](#prop-ns1-divergence-fourier)より

$$
\nabla\cdot u_N=0.
$$

さらに $k=0$ を含めていないので平均零です。

Parseval 型等式から

$$
\|u-u_N\|_2^2
=
(2\pi)^3
\sum_{|k|>N}
|\widehat u(k)|^2
\longrightarrow0.
$$

従って $u$ は滑らかな平均零発散零三角多項式で $L^2$ 近似できます。

逆に、そのような列 $u_n$ が $L^2$ で $u$ へ収束するとします。固定した $k$ に対し

$$
\widehat u_n(k)
=
\frac1{(2\pi)^3}
\int_{\mathbb T^3}
u_n(x)e^{-ik\cdot x}\,dx.
$$

Cauchy--Schwarz により

$$
|\widehat u_n(k)-\widehat u(k)|
\le
\frac1{(2\pi)^{3/2}}
\|u_n-u\|_2
\longrightarrow0.
$$

各 $u_n$ は発散零なので

$$
k\cdot\widehat u_n(k)=0.
$$

$n\to\infty$ として

$$
k\cdot\widehat u(k)=0.
$$

同じく $k=0$ の係数も0へ保たれるので $\widehat u(0)=0$ です。よって $u\in H$ です。
<!-- proof-end -->

---

## 4. 各波数で何を射影すればよいか

固定した $k\ne0$ を考えます。

$\mathbb C^3$ の任意のベクトル $a$ は、

- $k$ に直交する成分
- $k$ に平行な成分

へ分解できます。

平行成分は

$$
\frac{k\otimes k}{|k|^2}a
=
\frac{k(k\cdot a)}{|k|^2}
$$

です。したがって直交成分は

$$
a-
\frac{k(k\cdot a)}{|k|^2}
=
\left(
I-\frac{k\otimes k}{|k|^2}
\right)a.
$$

この3次元線形代数を、全 Fourier モードへ同時に適用します。

<a id="def-ns1-leray-projection"></a>
<!-- formal-statement-start -->
> **定義（Leray 射影）**  
> 平均零の $L^2$ 周期ベクトル場 $u$ に対して、Fourier 係数を

$$
\widehat{Pu}(k)
=
\left(
I-\frac{k\otimes k}{|k|^2}
\right)
\widehat u(k),
\qquad
k\ne0,
$$

$$
\widehat{Pu}(0)=0
$$

> と定める。この作用素 $P$ を **Leray 射影**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns1-leray-projection -->
**定義の確認**。

$$
k=(1,2,0),
\qquad
a=(2,1,3)
$$

とします。

$$
k\cdot a=4,
\qquad
|k|^2=5
$$

なので

$$
\frac{k(k\cdot a)}{|k|^2}
=
\frac45(1,2,0)
=
\left(\frac45,\frac85,0\right).
$$

したがって

$$
P_k a
=
a-
\frac{k(k\cdot a)}{|k|^2}
=
\left(\frac65,-\frac35,3\right).
$$

実際、

$$
k\cdot P_k a
=
\frac65-\frac65=0.
$$

射影後の振幅は確かに波数 $k$ に直交しています。
<!-- definition-example-end -->

---

## 5. Leray 射影は何を残し、何を消すか

固定した $k\ne0$ に対する行列を

$$
P_k
=
I-\frac{k\otimes k}{|k|^2}
$$

と書きます。

まず

$$
P_k k
=
k-
\frac{k(k\cdot k)}{|k|^2}
=0.
$$

一方、$k\cdot a=0$ なら

$$
P_k a=a.
$$

つまり $P_k$ は $k$ に平行な成分を消し、$k$ に直交する成分をそのまま残します。

勾配場との関係を確認します。平均零スカラー場 $\phi$ に対して

$$
\widehat{\nabla\phi}(k)
=
ik\widehat\phi(k).
$$

この係数は $k$ に平行なので

$$
P_k(ik\widehat\phi(k))=0.
$$

従って

$$
P\nabla\phi=0.
$$

圧力勾配が射影で消える理由はここにあります。

<a id="thm-ns1-periodic-helmholtz"></a>
<!-- formal-statement-start -->
> **定理（周期 Leray 射影と Helmholtz 分解）**  
> 平均零の $u\in L^2(\mathbb T^3;\mathbb R^3)$ に対して、
>
> 1. $Pu\in H$。
> 2. $P^2u=Pu$。
> 3. $\|Pu\|_2\le\|u\|_2$。
> 4. ある平均零の $\phi\in H^1(\mathbb T^3)$ が存在して

$$
u=Pu+\nabla\phi
$$

> と書ける。
> 5. $Pu$ と $\nabla\phi$ は $L^2$ 内積で直交する。
>
> この分解は、$\phi$ を平均零に固定すれば一意である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $k\ne0$ で $\widehat u(k)$ を $k^\perp$ 成分と $k$ 平行成分へ直交分解します。全空間の分解は、そのモードごとの分解を Parseval で足し合わせたものです。

<!-- proof-start -->
### 証明

固定した $k\ne0$ に対し

$$
P_k
=
I-\frac{k\otimes k}{|k|^2}
$$

と置きます。

まず

$$
k\cdot P_k a
=
k\cdot a-
\frac{|k|^2(k\cdot a)}{|k|^2}
=0.
$$

従って $\widehat{Pu}(k)$ は $k$ に直交し、$Pu\in H$ です。

次に、$P_k a$ はすでに $k$ に直交するので

$$
P_k(P_k a)=P_k a.
$$

従って $P^2=P$ です。

直交分解

$$
a
=
P_k a
+
\frac{k(k\cdot a)}{|k|^2}
$$

では二項が直交するため

$$
|P_k a|^2
\le |a|^2.
$$

Parseval を使うと

$$
\|Pu\|_2^2
=
(2\pi)^3
\sum_{k\ne0}|P_k\widehat u(k)|^2
\le
(2\pi)^3
\sum_{k\ne0}|\widehat u(k)|^2
=
\|u\|_2^2.
$$

次に勾配成分を作ります。$k\ne0$ に対して

$$
\widehat\phi(k)
=
-i\frac{k\cdot\widehat u(k)}{|k|^2},
\qquad
\widehat\phi(0)=0
$$

と置きます。Cauchy--Schwarz により

$$
|k|^2|\widehat\phi(k)|^2
=
\frac{|k\cdot\widehat u(k)|^2}{|k|^2}
\le
|\widehat u(k)|^2.
$$

右辺は $u\in L^2$ により総和可能なので、Parseval 型等式から $\nabla\phi\in L^2$、すなわち $\phi\in H^1$ です。

すると

$$
\widehat{\nabla\phi}(k)
=
ik\widehat\phi(k)
=
\frac{k(k\cdot\widehat u(k))}{|k|^2}.
$$

従って

$$
\widehat u(k)
=
P_k\widehat u(k)
+
\widehat{\nabla\phi}(k)
$$

であり、

$$
u=Pu+\nabla\phi.
$$

各 $k$ で $P_k\widehat u(k)$ は $k$ に直交し、$\widehat{\nabla\phi}(k)$ は $k$ に平行です。よって各モードで内積が0です。[Parseval 内積等式](../FOU4/index.md#thm-fou4-parseval)から

$$
(Pu,\nabla\phi)_{L^2}=0.
$$

最後に一意性を示します。もし

$$
u=v+\nabla\psi
$$

でもあり、$v\in H$、$\psi$ は平均零とします。両辺へ $P$ を作用させると

$$
Pu=Pv+P\nabla\psi=v.
$$

従って $v=Pu$ です。すると

$$
\nabla\psi=u-Pu=\nabla\phi.
$$

よって $\nabla(\psi-\phi)=0$ です。周期領域で勾配が0なら $\psi-\phi$ は定数ですが、両方平均零なのでその定数は0です。従って $\psi=\phi$ です。
<!-- proof-end -->

### 例2：勾配場は丸ごと消える

$$
\phi(x)=\sin(x_1+2x_2)
$$

とすると

$$
\nabla\phi
=
(1,2,0)\cos(x_1+2x_2).
$$

波数は $k=(1,2,0)$ で、振幅は $k$ に平行です。したがって

$$
P\nabla\phi=0.
$$

「圧力勾配が消える」は、単に記号上の都合ではなく、勾配成分が発散零部分空間の直交補空間にあるという事実です。

---

## 6. 粘性項を発散零空間の中で見る

Navier--Stokes の線形粘性項は $\nu\Delta u$ です。

しかし今後は速度を $H$ の中だけで扱いたいので、作用素も $H$ 上の作用素として書き直します。

このために GPDE3 の $H^2$ を使います。

<a id="def-ns1-stokes-operator"></a>
<!-- formal-statement-start -->
> **定義（Stokes 作用素）**  
> 定義域を

$$
D(A)
=
H^2(\mathbb T^3;\mathbb R^3)\cap H
$$

> とし、

$$
Au:=-P\Delta u
$$

> と定める。この作用素 $A$ を **Stokes 作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns1-stokes-operator -->
**定義の確認**。

$$
u(x)=(\sin x_2,0,0)
$$

は発散零で平均零です。また

$$
\Delta u=(-\sin x_2,0,0)=-u.
$$

$\Delta u$ も発散零なので $P\Delta u=\Delta u$ です。したがって

$$
Au=-\Delta u=u.
$$

この場は Stokes 作用素の固有関数になっています。
<!-- definition-example-end -->

<a id="prop-ns1-stokes-fourier"></a>
<!-- formal-statement-start -->
> **命題（Stokes 作用素の Fourier 表示と正値性）**  
> $u\in D(A)$ とする。このとき

$$
\widehat{Au}(k)
=
|k|^2\widehat u(k)
\qquad(k\ne0).
$$

> 特に発散零空間上では

$$
Au=-\Delta u.
$$

> また

$$
(Au,u)_{L^2}
=
\|\nabla u\|_2^2
\ge0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Laplacian は各 Fourier モードを $-|k|^2$ 倍します。もとの係数が $k$ に直交していれば、$-|k|^2$ 倍しても直交性は失われません。従ってその後に $P$ を掛けても何も変わりません。

<!-- proof-start -->
### 証明

$u\in H$ なので

$$
k\cdot\widehat u(k)=0.
$$

一方、

$$
\widehat{\Delta u}(k)
=
-|k|^2\widehat u(k).
$$

従って

$$
k\cdot\widehat{\Delta u}(k)
=
-|k|^2k\cdot\widehat u(k)
=0.
$$

よって $\Delta u$ も発散零です。そのため

$$
P\Delta u=\Delta u
$$

であり

$$
Au=-\Delta u.
$$

Fourier 係数では

$$
\widehat{Au}(k)
=
|k|^2\widehat u(k).
$$

[Parseval 内積等式](../FOU4/index.md#thm-fou4-parseval)から

$$
(Au,u)_{L^2}
=
(2\pi)^3
\sum_{k\ne0}
|k|^2|\widehat u(k)|^2.
$$

一方、

$$
\|\nabla u\|_2^2
=
(2\pi)^3
\sum_{k\ne0}
|k|^2|\widehat u(k)|^2.
$$

従って

$$
(Au,u)_{L^2}
=
\|\nabla u\|_2^2
\ge0.
$$
<!-- proof-end -->

ここで重要なのは、粘性項がエネルギーを増やす符号ではなく、後で

$$
\nu(Au,u)=\nu\|\nabla u\|_2^2
$$

という散逸項になることです。これが NS2 のエネルギー評価へつながります。

---

## 7. 非線形項にも射影を掛ける

圧力を消した後も、移流項

$$
(u\cdot\nabla)v
$$

は一般には発散零ではありません。

従って、速度を $H$ の中で時間発展させるには、この項も $H$ へ戻す必要があります。

<a id="def-ns1-projected-convection"></a>
<!-- formal-statement-start -->
> **定義（射影された移流作用素）**  
> 十分滑らかな周期ベクトル場 $u,v$ に対し

$$
B(u,v)
:=
P\bigl((u\cdot\nabla)v\bigr)
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns1-projected-convection -->
**定義の確認**。

$B(u,v)$ は定義そのものから $P$ の像に入るので

$$
\nabla\cdot B(u,v)=0
$$

です。

一方、射影前の $(u\cdot\nabla)v$ が発散零とは限りません。従って $P$ は飾りではなく、「非線形項を速度空間へ戻す」役割を持ちます。
<!-- definition-example-end -->

NS2 では、この $B$ から三重線形形式を作り、なぜエネルギー計算で非線形項が消えるかを詳しく調べます。

---

## 8. 圧力を消した Navier--Stokes 方程式

VC9 で得た周期非圧縮 Navier--Stokes 方程式を

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u+f,
$$

$$
\nabla\cdot u=0
$$

とします。

平均零速度と平均零外力を考え、$u,f$ が十分滑らかだとします。外力の平均が非零なら速度の平均自体が時間発展するため、その定数モードはここで扱う平均零部分とは別に分離します。

両辺へ $P$ を作用させます。

まず $u(t)\in H$ なら

$$
P\partial_tu=\partial_tu.
$$

圧力項は

$$
P\nabla p=0.
$$

粘性項は

$$
P\Delta u=\Delta u=-Au.
$$

非線形項は定義から

$$
P((u\cdot\nabla)u)=B(u,u).
$$

これらを代入します。

<a id="prop-ns1-projected-equation"></a>
<!-- formal-statement-start -->
> **命題（Leray 射影後の Navier--Stokes 方程式）**  
> 十分滑らかな平均零周期速度場 $u$ と平均零周期外力 $f$ が

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u+f,
\qquad
\nabla\cdot u=0
$$

> を満たすなら、

$$
\boxed{
\partial_tu+\nu Au+B(u,u)=Pf
}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

各項へ $P$ を作用させ、発散零成分・勾配成分・Laplacian がどう振る舞うかを一項ずつ使います。

<!-- proof-start -->
### 証明

元の方程式へ $P$ を作用させると

$$
P\partial_tu
+
P((u\cdot\nabla)u)
=
-P\nabla p
+
\nu P\Delta u
+
Pf.
$$

$u(t)\in H$ なので

$$
P\partial_tu=\partial_tu.
$$

Leray 射影は勾配場を消すので

$$
P\nabla p=0.
$$

また発散零場では Stokes 作用素が $-\Delta$ と一致するので

$$
P\Delta u
=
\Delta u
=
-Au.
$$

さらに

$$
P((u\cdot\nabla)u)=B(u,u).
$$

従って

$$
\partial_tu+B(u,u)
=
-\nu Au+Pf.
$$

$\nu Au$ を左辺へ移して

$$
\partial_tu+\nu Au+B(u,u)=Pf.
$$
<!-- proof-end -->

この式では圧力が見えなくなりました。以後、速度の存在・一意性・正則性はこの発散零空間上の方程式として扱えます。

---

## 9. 圧力は消えたのではなく、速度から回収できる

射影後の式から $p$ が消えたので、「圧力情報を捨てた」と見えるかもしれません。

しかし元の方程式の発散を取れば、圧力は速度と外力から Poisson 方程式で決まります。

元の式

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u+f
$$

の発散を取ります。

非圧縮条件から

$$
\nabla\cdot\partial_tu
=
\partial_t(\nabla\cdot u)
=0,
$$

$$
\nabla\cdot\Delta u
=
\Delta(\nabla\cdot u)
=0.
$$

従って

$$
\nabla\cdot((u\cdot\nabla)u)
=
-\Delta p+\nabla\cdot f.
$$

つまり

$$
\Delta p
=
\nabla\cdot f
-
\nabla\cdot((u\cdot\nabla)u).
$$

<a id="prop-ns1-pressure-recovery"></a>
<!-- formal-statement-start -->
> **命題（圧力の Poisson 方程式による回収）**  
> 十分滑らかな周期非圧縮速度場 $u$ と外力 $f$ に対し、Navier--Stokes 方程式の圧力は

$$
\Delta p
=
\nabla\cdot f
-
\nabla\cdot((u\cdot\nabla)u)
$$

> を満たす。$p$ の平均を0に固定すれば、周期 Poisson 方程式の解として一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

発散を取ると、時間微分項と粘性項は $\nabla\cdot u=0$ のため消え、圧力だけが $\Delta p$ になります。周期 Poisson 方程式は定数を加える自由度を持つので、平均零条件でその自由度を固定します。

<!-- proof-start -->
### 証明

上で計算した通り、元の方程式の発散から

$$
0
+
\nabla\cdot((u\cdot\nabla)u)
=
-\Delta p
+
0
+
\nabla\cdot f.
$$

従って

$$
\Delta p
=
\nabla\cdot f
-
\nabla\cdot((u\cdot\nabla)u).
$$

右辺の空間平均は0です。周期関数 $g$ について

$$
\int_{\mathbb T^3}\nabla\cdot g\,dx=0
$$

だからです。

従って周期 Poisson 方程式の可解条件を満たします。Fourier 係数では $k\ne0$ に対し

$$
-|k|^2\widehat p(k)
=
\widehat{
\nabla\cdot f
-
\nabla\cdot((u\cdot\nabla)u)
}(k),
$$

よって

$$
\widehat p(k)
=
-\frac1{|k|^2}
\widehat{
\nabla\cdot f
-
\nabla\cdot((u\cdot\nabla)u)
}(k).
$$

$k=0$ の係数は Poisson 方程式からは決まりません。そこで

$$
\widehat p(0)=0
$$

すなわち平均零を課せば、すべての Fourier 係数が一意に決まります。
<!-- proof-end -->

圧力は「別の自由な未知量」ではなく、発散零制約を維持するために速度へ従属して決まる量だと分かります。

---

## 10. この章で何ができるようになったか

VC9 の式をそのまま見ると、

$$
u,\quad p
$$

という二種類の未知量と

$$
\nabla\cdot u=0
$$

という制約が同時に現れていました。

平均零スカラー Sobolev 空間を

$$
\dot H^1(\mathbb T^3)
:=
\left\{
\phi\in H^1(\mathbb T^3):
\int_{\mathbb T^3}\phi\,dx=0
\right\}
$$

と書けば、本章で

$$
L^2_0(\mathbb T^3;\mathbb R^3)
=
H
\oplus
\nabla \dot H^1(\mathbb T^3)
$$

という直交分解を Fourier モードごとに構成し、Leray 射影 $P$ によって速度空間 $H$ を取り出しました。

その結果、

$$
\partial_tu+\nu Au+B(u,u)=Pf
$$

という速度だけの発展方程式へ移れます。

さらに、

$$
\Delta p
=
\nabla\cdot f
-
\nabla\cdot((u\cdot\nabla)u)
$$

から圧力を後で回収できます。

次章 NS2 では、ここで定義した $B(u,v)$ を

$$
b(u,v,w)
=
\int_{\mathbb T^3}
(u\cdot\nabla)v\cdot w\,dx
$$

という三重線形形式として調べます。そこで初めて、非線形項があるのに基本 $L^2$ エネルギー評価が閉じる理由を証明します。

---

## 11. 演習

### Level A

<a id="ex-ns1-a01"></a>
#### NS1-A01 単一 Fourier モードの発散零判定
- Level: A

$$
u(x)=ae^{ik\cdot x},
\qquad
k=(1,-1,2),
\qquad
a=(1,1,0)
$$

とする。

1. $\nabla\cdot u$ を計算せよ。
2. $u$ が発散零か判定せよ。

<!-- solution-start -->
#### 詳細解答

単一モードなので

$$
\nabla\cdot u
=
i(k\cdot a)e^{ik\cdot x}.
$$

内積を計算すると

$$
k\cdot a
=
1\cdot1+(-1)\cdot1+2\cdot0
=0.
$$

従って

$$
\nabla\cdot u=0.
$$

よってこのモードは発散零です。

重要なのは、成分を個別に見ているのではなく、波数 $k$ と振幅 $a$ の直交性

$$
k\cdot a=0
$$

を確認している点です。
<!-- solution-end -->

<a id="ex-ns1-a02"></a>
#### NS1-A02 勾配モードは Leray 射影で消える
- Level: A

$$
\phi(x)=\cos(2x_1-x_3)
$$

とする。$\nabla\phi$ を求め、

$$
P\nabla\phi=0
$$

を Fourier モードの向きから説明せよ。

<!-- solution-start -->
#### 詳細解答

まず微分すると

$$
\nabla\phi
=
(-2\sin(2x_1-x_3),0,\sin(2x_1-x_3)).
$$

波数は

$$
k=(2,0,-1).
$$

振幅の方向は

$$
(-2,0,1)=-k
$$

なので、各 Fourier モードの振幅は $k$ に平行です。

Leray 射影は

$$
P_k
=
I-\frac{k\otimes k}{|k|^2}
$$

であり、$k$ に平行なベクトルを0へ送ります。

したがって各非零 Fourier モードで係数が消え、

$$
P\nabla\phi=0.
$$
<!-- solution-end -->

<a id="ex-ns1-a03"></a>
#### NS1-A03 Leray 射影を数値計算する
- Level: A

$$
k=(1,2,0),
\qquad
a=(2,1,3)
$$

とする。

$$
P_k a
=
\left(
I-\frac{k\otimes k}{|k|^2}
\right)a
$$

を計算し、$k\cdot P_ka=0$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
k\cdot a
=
1\cdot2+2\cdot1+0\cdot3
=4,
$$

$$
|k|^2=1^2+2^2=5.
$$

平行成分は

$$
\frac{k(k\cdot a)}{|k|^2}
=
\frac45(1,2,0)
=
\left(
\frac45,\frac85,0
\right).
$$

従って

$$
P_ka
=
(2,1,3)
-
\left(
\frac45,\frac85,0
\right)
=
\left(
\frac65,-\frac35,3
\right).
$$

内積を取ると

$$
k\cdot P_ka
=
1\cdot\frac65
+
2\cdot\left(-\frac35\right)
+
0\cdot3
=0.
$$

よって射影後の振幅は発散零条件を満たします。
<!-- solution-end -->

<a id="ex-ns1-a04"></a>
#### NS1-A04 Stokes 作用素の固有モード
- Level: A

$$
u(x_1,x_2,x_3)
=
(\sin 2x_2,0,0)
$$

とする。

1. $u\in H$ を確認せよ。
2. $Au$ を求めよ。
3. $(Au,u)=\|\nabla u\|_2^2$ を直接確認せよ。

<!-- solution-start -->
#### 詳細解答

まず平均は0です。

発散は

$$
\nabla\cdot u
=
\partial_1(\sin2x_2)=0
$$

なので $u\in H$ です。

Laplacian は

$$
\Delta u
=
(\partial_2^2\sin2x_2,0,0)
=
(-4\sin2x_2,0,0)
=
-4u.
$$

発散零場では $A=-\Delta$ なので

$$
Au=4u.
$$

従って

$$
(Au,u)
=
4\int_{\mathbb T^3}|u|^2\,dx.
$$

一方、非零の微分は

$$
\partial_2u
=
(2\cos2x_2,0,0)
$$

だけなので

$$
\|\nabla u\|_2^2
=
4
\int_{\mathbb T^3}\cos^2(2x_2)\,dx.
$$

一周期では

$$
\int_{-\pi}^{\pi}\sin^2(2x_2)\,dx_2
=
\int_{-\pi}^{\pi}\cos^2(2x_2)\,dx_2
=
\pi.
$$

$x_1,x_3$ の積分はどちらも $2\pi$ なので

$$
\int_{\mathbb T^3}|u|^2\,dx
=
(2\pi)^2\pi.
$$

従って

$$
(Au,u)
=
4(2\pi)^2\pi
=
\|\nabla u\|_2^2.
$$
<!-- solution-end -->

### Level B

<a id="ex-ns1-b01"></a>
#### NS1-B01 周期 Helmholtz 分解を一つのモードで再構成する
- Level: B

$$
u(x)=ae^{ik\cdot x},
\qquad
k\ne0
$$

とする。

1. $a$ を $k^\perp$ 成分と $k$ 平行成分へ分解せよ。
2. 平行成分があるスカラー場 $\phi$ の $\nabla\phi$ と書けることを示せ。
3. 二成分が直交することを示せ。

<!-- solution-start -->
#### 詳細解答

直交成分を

$$
a_\perp
=
a-\frac{k(k\cdot a)}{|k|^2}
$$

と置きます。

平行成分を

$$
a_\parallel
=
\frac{k(k\cdot a)}{|k|^2}
$$

と置けば

$$
a=a_\perp+a_\parallel.
$$

また

$$
k\cdot a_\perp
=
k\cdot a
-
\frac{|k|^2(k\cdot a)}{|k|^2}
=0.
$$

従って $a_\perp\in k^\perp$ です。

次に

$$
\phi(x)
=
-i
\frac{k\cdot a}{|k|^2}
e^{ik\cdot x}
$$

と置きます。

すると

$$
\nabla\phi
=
ik
\left(
-i\frac{k\cdot a}{|k|^2}
\right)
e^{ik\cdot x}
=
\frac{k(k\cdot a)}{|k|^2}
e^{ik\cdot x}
=
a_\parallel e^{ik\cdot x}.
$$

よって

$$
u
=
a_\perp e^{ik\cdot x}
+
\nabla\phi.
$$

最後に

$$
a_\perp\cdot a_\parallel
=
a_\perp\cdot
\frac{k(k\cdot a)}{|k|^2}
=
\frac{k\cdot a}{|k|^2}
(a_\perp\cdot k)
=0.
$$

従って二成分は各モードで直交します。
<!-- solution-end -->

<a id="ex-ns1-b02"></a>
#### NS1-B02 Leray 射影は Sobolev ノルムを増やさない
- Level: B

整数 $s\ge0$ とし、周期 Sobolev ノルムを Fourier 係数で

$$
\|u\|_{H^s}^2
:=
(2\pi)^3
\sum_{k\in\mathbb Z^3}
(1+|k|^2)^s|\widehat u(k)|^2
$$

と定める。

$$
\|Pu\|_{H^s}\le\|u\|_{H^s}
$$

を示せ。また $P$ と空間微分が可換であることを説明せよ。

<!-- solution-start -->
#### 詳細解答

固定した $k\ne0$ で $P_k$ は直交射影なので

$$
|P_k a|\le|a|.
$$

従って各 Fourier 係数について

$$
|\widehat{Pu}(k)|
=
|P_k\widehat u(k)|
\le
|\widehat u(k)|.
$$

両辺を二乗し、非負の重み $(1+|k|^2)^s$ を掛けて足すと

$$
\sum_k
(1+|k|^2)^s
|\widehat{Pu}(k)|^2
\le
\sum_k
(1+|k|^2)^s
|\widehat u(k)|^2.
$$

よって

$$
\|Pu\|_{H^s}\le\|u\|_{H^s}.
$$

次に $\partial_j$ は Fourier 側で $ik_j$ を掛けます。

$P_k$ は $k$ だけに依存する行列で、スカラー $ik_j$ とは可換なので

$$
P_k(ik_j\widehat u(k))
=
ik_jP_k\widehat u(k).
$$

従って

$$
P(\partial_ju)
=
\partial_j(Pu).
$$

同じ理由で $P$ は $\Delta$ とも可換です。
<!-- solution-end -->

<a id="ex-ns1-b03"></a>
#### NS1-B03 射影形から圧力を回収する
- Level: B

滑らかな平均零発散零速度 $u$ と平均零外力 $f$ が

$$
\partial_tu+\nu Au+B(u,u)=Pf
$$

を満たすとする。

$$
g
=
f-(u\cdot\nabla)u
$$

と置き、周期 Helmholtz 分解

$$
g=Pg+\nabla\phi
$$

を使って、適切な $p$ を選べば元の Navier--Stokes 方程式を回復できることを示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
B(u,u)
=
P((u\cdot\nabla)u)
$$

なので射影形は

$$
\partial_tu+\nu Au
+
P((u\cdot\nabla)u)
=
Pf.
$$

発散零場では

$$
Au=-\Delta u
$$

だから

$$
\partial_tu
-\nu\Delta u
=
P\left(
f-(u\cdot\nabla)u
\right)
=
Pg.
$$

[本章の周期分解定理](#thm-ns1-periodic-helmholtz)により

$$
g=Pg+\nabla\phi.
$$

従って

$$
Pg=g-\nabla\phi
=
f-(u\cdot\nabla)u-\nabla\phi.
$$

これを代入すると

$$
\partial_tu-\nu\Delta u
=
f-(u\cdot\nabla)u-\nabla\phi.
$$

移項して

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla\phi+\nu\Delta u+f.
$$

そこで

$$
p:=\phi
$$

と置けば

$$
\partial_tu+(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u+f
$$

を回復します。

つまり射影形は圧力を捨てたのではなく、勾配成分を一旦 Helmholtz 分解の側へ退避させた形です。
<!-- solution-end -->

### Level C

<a id="ex-ns1-c01"></a>
#### NS1-C01 発散零空間の閉包表示を有限 Fourier 射影から再構成する
- Level: C

$u\in H$ とし、

$$
u_N(x)
=
\sum_{0<|k|\le N}
\widehat u(k)e^{ik\cdot x}
$$

と置く。

1. $u_N$ が滑らか・平均零・発散零であることを示せ。
2. $u_N\to u$ が $L^2$ で成り立つことを Parseval から示せ。
3. 逆に、滑らかな平均零発散零場 $v_n$ が $L^2$ で $v$ へ収束するとき $v\in H$ を示せ。
4. 以上から、Fourier 条件による $H$ の定義と「滑らかな発散零場の $L^2$ 閉包」という定義が一致する理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1. 有限 Fourier 和の性質。**

$u_N$ は有限個の指数関数の和なので $C^\infty$ 級です。

$k=0$ を和に含めていないため

$$
\widehat{u_N}(0)=0,
$$

よって平均零です。

さらに $u\in H$ だから、各 $k\ne0$ で

$$
k\cdot\widehat u(k)=0.
$$

$u_N$ に残る係数も同じ条件を満たすため

$$
\nabla\cdot u_N
=
\sum_{0<|k|\le N}
i\,k\cdot\widehat u(k)e^{ik\cdot x}
=0.
$$

従って $u_N$ は滑らかな平均零発散零場です。

**2. $L^2$ 収束。**

差の Fourier 係数は $|k|>N$ の部分だけです。Parseval により

$$
\|u-u_N\|_2^2
=
(2\pi)^3
\sum_{|k|>N}
|\widehat u(k)|^2.
$$

$u\in L^2$ なので

$$
\sum_k|\widehat u(k)|^2<\infty.
$$

収束級数の尾は0へ行くため

$$
\|u-u_N\|_2\to0.
$$

**3. 逆向き。**

$v_n\to v$ in $L^2$ とします。

固定した $k$ に対し、

$$
\widehat v_n(k)-\widehat v(k)
=
\frac1{(2\pi)^3}
\int_{\mathbb T^3}
(v_n-v)e^{-ik\cdot x}\,dx.
$$

Cauchy--Schwarz から

$$
|\widehat v_n(k)-\widehat v(k)|
\le
\frac1{(2\pi)^{3/2}}
\|v_n-v\|_2
\to0.
$$

各 $v_n$ は発散零なので

$$
k\cdot\widehat v_n(k)=0.
$$

$n\to\infty$ とすると

$$
k\cdot\widehat v(k)=0.
$$

また平均零より

$$
\widehat v_n(0)=0,
$$

したがって極限でも

$$
\widehat v(0)=0.
$$

よって $v\in H$ です。

**4. 二つの定義の一致。**

前半で、Fourier 条件を満たす任意の $u\in H$ が滑らかな平均零発散零場で近似できることを示しました。

後半で、そのような滑らかな場の $L^2$ 極限は必ず Fourier 条件を保つことを示しました。

従って

$$
H
=
\overline{
\{
\text{滑らかな平均零発散零周期ベクトル場}
\}
}^{\,L^2}.
$$

つまり「Fourier モードごとの直交条件」と「滑らかな非圧縮場の $L^2$ 閉包」は同じ速度空間を表します。
<!-- solution-end -->
