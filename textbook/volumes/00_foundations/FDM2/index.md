# FDM2 差分法 II：差分スキームの安定性

FDM1 では、一次元熱方程式

$$
u_t=\kappa u_{xx},
\qquad
\kappa>0
$$

から

- 前進時間・中心空間差分法（FTCS）
- 後退 Euler 差分法

を導きました。

この章では、同じ差分式へ小さな摂動を入れたとき、その摂動が時間発展で増幅されるかを調べます。

主役は

$$
r=\frac{\kappa\tau}{h^2}
$$

です。

FTCS では

$$
r\le\frac12
$$

という刻み幅制約が現れます。一方、後退 Euler 差分法は任意の $r>0$ で安定です。さらに両者を熱方程式の theta 差分法で統一し、どの $\theta$ なら刻み幅制約が消えるかまで求めます。

直接の前提は、[FDM1 の熱方程式差分法](../FDM1/index.md#def-fdm1-ftcs)と、[NA7 の安定関数・theta 法](../NA7/index.md#def-na7-theta-method)です。

> **この章の停止線**  
> 本章では摂動の増幅、von Neumann 型安定性解析、拡散 CFL 条件、後退 Euler 法・Crank--Nicolson 法・theta 法の安定性を扱います。局所打切り誤差を一般に定義し、「整合性＋安定性から収束」を大域誤差評価へつなぐ議論は FDM3 で扱います。

---

## 0. 「1ステップを解ける」と「安定である」は違う

FDM1 では、後退 Euler 差分法の各時刻ステップ

$$
A_r\mathbf U^{n+1}=\mathbf U^n+\mathbf b^{n+1}
$$

が一意に解けることを示しました。

しかし、これは

$$
\text{新しい時刻の値が存在して一意に決まる}
$$

という主張です。

安定性で問うのは別です。

初期値や丸め誤差などに小さな摂動

$$
\mathbf E^0
$$

が入ったとき、時刻を進めることで

$$
\|\mathbf E^n\|
$$

が極端に大きくならないかを調べます。

数値法は「毎回解ける」が「誤差を爆発させる」こともあり得ます。

---

## 1. NA6 の摂動安定性を差分法へ移す

NA6 では、各ステップに加わる摂動まで含めて[有限時間摂動安定性](../NA6/index.md#def-na6-perturbation-stability)を定義しました。

ここではまず、線形な斉次差分スキームに対して、**初期値の違いがどう伝わるか**だけを切り出します。

<a id="def-fdm2-contractivity"></a>
<!-- formal-statement-start -->
### 定義（差分時間発展の縮小性）

格子ベクトル上のノルム $\|\cdot\|$ を固定する。

同じ線形斉次差分スキームに従う二つの数値解 $\mathbf U^n,\widetilde{\mathbf U}^n$ の差を

$$
\mathbf E^n
=
\mathbf U^n-\widetilde{\mathbf U}^n
$$

とする。

すべての時刻ステップで

$$
\boxed{
\|\mathbf E^{n+1}\|
\le
\|\mathbf E^n\|
}
$$

が成り立つとき、その差分時間発展はそのノルムに関して **縮小的**であるという。
<!-- formal-statement-end -->

縮小性が成り立てば、反復して

$$
\|\mathbf E^n\|
\le
\|\mathbf E^0\|
$$

です。

したがって初期値摂動については、NA6 の有限時間摂動安定性に現れる定数を

$$
C_T=1
$$

と取れる特に強い場合になっています。

<!-- definition-example-start: def-fdm2-contractivity -->
### 例：スカラー更新で縮小性を直接判定する

**定義の確認**。摂動が

$$
E^{n+1}=qE^n
$$

と更新されるとします。

反復すると

$$
E^n=q^nE^0.
$$

したがって

$$
|E^n|
=
|q|^n|E^0|.
$$

もし

$$
|q|\le1
$$

なら各ステップで

$$
|E^{n+1}|
=
|q|\,|E^n|
\le
|E^n|,
$$

なので縮小的です。

一方、

$$
|q|>1
$$

ならステップ数 $n$ が増えるほど

$$
|q|^n
$$

が指数的に増えます。

差分スキームでも、各振動モードに対してこの $q$ に相当する量を求めるのが基本戦略です。
<!-- definition-example-end -->

この章では主に離散 $\ell^2$ ノルム

$$
\|\mathbf V\|_2
=
\left(
\sum_j|V_j|^2
\right)^{1/2}
$$

で安定性を見ます。

---

## 2. 格子上の波を1ステップ進める

$i^2=-1$ とし、

$$
e^{i\alpha}
:=
\cos\alpha+i\sin\alpha
$$

と書きます。

空間格子上で

$$
e^{ij\xi}
$$

という複素数値の波を考えます。$\xi$ は格子上の波数に相当します。

左へ1点ずらすと

$$
e^{i(j-1)\xi}
=
e^{-i\xi}e^{ij\xi},
$$

右へ1点ずらすと

$$
e^{i(j+1)\xi}
=
e^{i\xi}e^{ij\xi}.
$$

したがって、格子添字の一定個数のシフトだけからなる線形差分作用素では

$$
e^{ij\xi}
$$

を代入すると同じ形のまま定数倍されます。

これが Fourier モードを使う理由です。

<a id="def-fdm2-amplification-factor"></a>
<!-- formal-statement-start -->
### 定義（増幅因子と von Neumann 型安定性解析）

空間方向に係数一定の線形差分スキームに対し、摂動を

$$
E_j^n
=
\widehat E^n e^{ij\xi}
$$

という1つの Fourier モードで仮定する。

1ステップ後に

$$
\widehat E^{n+1}
=
G(\xi)\widehat E^n
$$

となるとき、$G(\xi)$ をその差分スキームの **増幅因子**という。

各波数 $\xi$ について $G(\xi)$ を求め、その絶対値

$$
|G(\xi)|
$$

から安定性を調べる方法を **von Neumann 型安定性解析**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm2-amplification-factor -->
### 例：単純平均は高周波を弱める

**定義の確認**。更新式

$$
E_j^{n+1}
=
\frac12E_{j-1}^n+\frac12E_{j+1}^n
$$

へ

$$
E_j^n=\widehat E^n e^{ij\xi}
$$

を代入します。

すると

$$
\begin{aligned}
E_j^{n+1}
&=
\frac12\widehat E^n e^{i(j-1)\xi}
+
\frac12\widehat E^n e^{i(j+1)\xi}\\
&=
\frac12
\left(
e^{-i\xi}+e^{i\xi}
\right)
\widehat E^n e^{ij\xi}\\
&=
\cos\xi\,
\widehat E^n e^{ij\xi}.
\end{aligned}
$$

したがって

$$
\boxed{
G(\xi)=\cos\xi
}.
$$

常に

$$
|G(\xi)|\le1
$$

なので各 Fourier モードは増幅しません。
<!-- definition-example-end -->

---

## 3. なぜ1つの Fourier モードだけ調べればよいのか

周期格子で理由を有限次元の計算として確認します。

空間点数を $J$ とし、周期条件

$$
E_{j+J}^n=E_j^n
$$

を課します。

離散波数を

$$
\xi_m=\frac{2\pi m}{J},
\qquad
m=0,\ldots,J-1
$$

とします。

Fourier 係数を

$$
\widehat E_m^n
=
\frac1J
\sum_{j=0}^{J-1}
E_j^n e^{-ij\xi_m}
$$

で定めると、任意の周期格子列は

$$
E_j^n
=
\sum_{m=0}^{J-1}
\widehat E_m^n e^{ij\xi_m}
$$

と離散 Fourier 展開できます。

ここで

$$
\sum_{j=0}^{J-1}
e^{ij(\xi_m-\xi_\ell)}
=
\begin{cases}
J,&m=\ell,\\
0,&m\ne\ell.
\end{cases}
$$

です。

$m\ne\ell$ のときは比が1でない有限等比級数なので

$$
\sum_{j=0}^{J-1}
\left(
e^{i(\xi_m-\xi_\ell)}
\right)^j
=
\frac{
1-e^{iJ(\xi_m-\xi_\ell)}
}{
1-e^{i(\xi_m-\xi_\ell)}
}
=0
$$

となります。

この直交性から

$$
\sum_{j=0}^{J-1}|E_j^n|^2
=
J\sum_{m=0}^{J-1}
|\widehat E_m^n|^2
$$

という離散 Parseval 恒等式が得られます。

<a id="thm-fdm2-von-neumann-criterion"></a>
<!-- formal-statement-start -->
### 定理（周期格子における増幅因子と縮小性）

周期格子上の空間係数一定な線形一段差分スキームが、各離散 Fourier モードに対して

$$
\widehat E_m^{n+1}
=
G(\xi_m)\widehat E_m^n
$$

と作用するとする。

このとき

$$
\boxed{
\max_m|G(\xi_m)|\le1
}
$$

なら

$$
\boxed{
\|\mathbf E^{n+1}\|_2
\le
\|\mathbf E^n\|_2
}
$$

である。

逆に、ある $m$ で

$$
|G(\xi_m)|>1
$$

なら、その Fourier モードだけを初期摂動に選ぶことで1ステップごとに増幅する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

離散 Parseval 恒等式から

$$
\|\mathbf E^{n+1}\|_2^2
=
J
\sum_{m=0}^{J-1}
|\widehat E_m^{n+1}|^2.
$$

各モードで

$$
\widehat E_m^{n+1}
=
G(\xi_m)\widehat E_m^n
$$

だから

$$
\begin{aligned}
\|\mathbf E^{n+1}\|_2^2
&=
J
\sum_{m=0}^{J-1}
|G(\xi_m)|^2
|\widehat E_m^n|^2\\
&\le
J
\sum_{m=0}^{J-1}
|\widehat E_m^n|^2\\
&=
\|\mathbf E^n\|_2^2.
\end{aligned}
$$

したがって

$$
\|\mathbf E^{n+1}\|_2
\le
\|\mathbf E^n\|_2.
$$

逆に、ある $m_*$ で

$$
|G(\xi_{m_*})|>1
$$

なら初期摂動を

$$
E_j^0=e^{ij\xi_{m_*}}
$$

と取ります。

このとき他の Fourier 係数は0なので

$$
E_j^n
=
G(\xi_{m_*})^n e^{ij\xi_{m_*}}.
$$

従って

$$
\|\mathbf E^n\|_2
=
|G(\xi_{m_*})|^n
\|\mathbf E^0\|_2
$$

となり、ステップごとに増幅します。
<!-- proof-end -->

つまり von Neumann 型解析は「特殊な波だけを試している」わけではありません。

周期格子では任意の摂動が直交する Fourier モードへ分解され、差分作用素が各モードを独立に増幅するため、全モードを調べれば任意の摂動を調べたことになります。

---

## 4. FTCS の増幅因子

FDM1 の FTCS は

$$
E_j^{n+1}
=
rE_{j-1}^n
+
(1-2r)E_j^n
+
rE_{j+1}^n
$$

です。

Fourier モード

$$
E_j^n
=
\widehat E^n e^{ij\xi}
$$

を代入すると

$$
\begin{aligned}
E_j^{n+1}
&=
\left[
re^{-i\xi}
+
(1-2r)
+
re^{i\xi}
\right]
\widehat E^n e^{ij\xi}\\
&=
\left[
1-2r+2r\cos\xi
\right]
\widehat E^n e^{ij\xi}.
\end{aligned}
$$

恒等式

$$
1-\cos\xi
=
2\sin^2\frac{\xi}{2}
$$

を使うと

$$
\boxed{
G_{\mathrm{FTCS}}(\xi)
=
1
-
4r\sin^2\frac{\xi}{2}
}
$$

です。

この式には安定性条件がほぼ見えています。

---

## 5. 拡散 CFL 条件

<a id="def-fdm2-diffusive-cfl"></a>
<!-- formal-statement-start -->
### 定義（FTCS の拡散 CFL 条件）

一次元熱方程式の FTCS に対し

$$
r=\frac{\kappa\tau}{h^2}
$$

とする。

条件

$$
\boxed{
r\le\frac12
}
$$

すなわち

$$
\boxed{
\tau
\le
\frac{h^2}{2\kappa}
}
$$

を、この章では **FTCS の拡散 CFL 条件**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm2-diffusive-cfl -->
### 例：空間刻みを半分にすると時間刻みは4分の1以下になる

**定義の確認**。$\kappa=1$ とします。

もし

$$
h=\frac1{20}
$$

なら

$$
\tau
\le
\frac{h^2}{2}
=
\frac1{800}.
$$

空間刻みを半分にして

$$
h=\frac1{40}
$$

とすると

$$
\tau
\le
\frac1{3200}.
$$

つまり $h$ を半分にすると、安定性のための時間刻み上限は

$$
\frac14
$$

になります。

熱方程式の陽解法では

$$
\tau=O(h^2)
$$

という強い時間刻み制約が現れます。
<!-- definition-example-end -->

ここで「CFL」という語には注意が必要です。

CFL という名称は方程式の型によって現れ方が異なります。本章では名称の一般論には踏み込まず、熱方程式の陽的差分法で時間刻みと空間刻みを結ぶ条件として



$$
r\le\frac12
$$

は、拡散方程式の陽的時間発展に現れる **CFL 型の安定性制約**として理解するのが適切です。

---

## 6. FTCS の安定性条件を証明する

<a id="thm-fdm2-ftcs-stability"></a>
<!-- formal-statement-start -->
### 定理（FTCS の von Neumann 型安定性）

空間点数 $J$ が偶数である周期格子上で、一次元熱方程式の FTCS を考える。

$$
r=\frac{\kappa\tau}{h^2}\ge0
$$

とする。

全 Fourier モードが増幅しないための必要十分条件は

$$
\boxed{
0\le r\le\frac12
}
$$

である。

従ってこの条件の下で FTCS は周期格子の離散 $\ell^2$ ノルムに関して縮小的である。
<!-- formal-statement-end -->

### 証明の見取り図

増幅因子は

$$
G_{\mathrm{FTCS}}(\xi)
=
1
-
4r\sin^2\frac{\xi}{2}.
$$

実数なので

$$
|G|\le1
$$

は

$$
-1\le G\le1
$$

と同値です。

上側は自動的に成り立ち、下側が

$$
r\le\frac12
$$

を与えます。

<!-- proof-start -->
### 証明

$r\ge0$ かつ

$$
0\le
\sin^2\frac{\xi}{2}
\le1
$$

なので

$$
G_{\mathrm{FTCS}}(\xi)
\le1
$$

は自動的に成り立ちます。

残る条件は

$$
G_{\mathrm{FTCS}}(\xi)\ge-1.
$$

すなわち

$$
1
-
4r\sin^2\frac{\xi}{2}
\ge
-1.
$$

整理すると

$$
4r\sin^2\frac{\xi}{2}
\le2.
$$

$J$ は偶数なので、離散波数の中に

$$
\xi=\pi
$$

が含まれます。このとき

$$
\sin^2\frac{\xi}{2}=1.
$$

従って全離散 Fourier モードで不等式が成り立つためには

$$
4r\le2
$$

が必要です。

従って

$$
r\le\frac12.
$$

逆に

$$
0\le r\le\frac12
$$

なら

$$
0
\le
4r\sin^2\frac{\xi}{2}
\le
4r
\le2.
$$

よって

$$
-1
\le
1-4r\sin^2\frac{\xi}{2}
\le1.
$$

したがって

$$
|G_{\mathrm{FTCS}}(\xi)|
\le1
$$

です。

周期格子の Fourier 判定定理から

$$
\|\mathbf E^{n+1}\|_2
\le
\|\mathbf E^n\|_2.
$$
<!-- proof-end -->

---

## 7. 条件を破ると何が壊れるのか

偶数点周期格子（または無限格子）で、最も細かく交互振動する格子モード

$$
E_j^n
=
(-1)^j\widehat E^n
$$

を考えます。

これは

$$
\xi=\pi
$$

に対応します。

FTCS の増幅因子は

$$
G_{\mathrm{FTCS}}(\pi)
=
1-4r.
$$

たとえば

$$
r=0.6
$$

なら

$$
G_{\mathrm{FTCS}}(\pi)
=
1-2.4
=
-1.4.
$$

一歩ごとに

$$
\widehat E^{n+1}
=
-1.4\widehat E^n
$$

なので、符号を交互に変えながら絶対値は

$$
1.4^n
$$

倍へ増えます。

10ステップ後には

$$
1.4^{10}\approx28.9
$$

です。

元の熱方程式では高周波ほど速く減衰します。

それなのに差分解では高周波が増幅するので、これは単なる「近似が少し悪い」状態ではありません。

**PDE の減衰機構そのものを数値法が逆転させています。**

---

## 8. FTCS の係数を見ると同じ条件が現れる

FTCS を

$$
U_j^{n+1}
=
rU_{j-1}^n
+
(1-2r)U_j^n
+
rU_{j+1}^n
$$

と書きます。

もし

$$
0\le r\le\frac12
$$

なら

$$
r\ge0,
\qquad
1-2r\ge0,
$$

かつ係数和は

$$
r+(1-2r)+r=1.
$$

したがって新しい値は隣接3点の凸結合です。

これは

$$
|U_j^{n+1}|
\le
\max
\left(
|U_{j-1}^n|,
|U_j^n|,
|U_{j+1}^n|
\right)
$$

を直ちに与えます。

つまり拡散 CFL 条件は Fourier 解析だけから偶然出てきたわけではありません。

同じ条件の下で、更新係数が非負になり、局所平均としての「拡散らしさ」も保たれます。

この観察を境界条件込みの最大・最小の評価へ整理するのは FDM3 です。

---

## 9. 後退 Euler 差分法は刻み幅制約を持たない

後退 Euler 差分法の摂動方程式は

$$
\frac{
E_j^{n+1}-E_j^n
}{\tau}
=
\kappa
\frac{
E_{j+1}^{n+1}
-
2E_j^{n+1}
+
E_{j-1}^{n+1}
}{h^2}.
$$

Fourier モードを代入すると

$$
E_j^{n+1}
=
\widehat E^{n+1}e^{ij\xi},
$$

$$
E_j^n
=
\widehat E^ne^{ij\xi}.
$$

中心二階差分は

$$
e^{i(j+1)\xi}
-
2e^{ij\xi}
+
e^{i(j-1)\xi}
=
-4\sin^2\frac{\xi}{2}
e^{ij\xi}
$$

なので

$$
\widehat E^{n+1}
-
\widehat E^n
=
-4r
\sin^2\frac{\xi}{2}
\widehat E^{n+1}.
$$

従って

$$
\left(
1+
4r\sin^2\frac{\xi}{2}
\right)
\widehat E^{n+1}
=
\widehat E^n.
$$

<a id="prop-fdm2-backward-euler-stability"></a>
<!-- formal-statement-start -->
### 命題（後退 Euler 差分法の無条件 Fourier 安定性）

$r\ge0$ とする。

熱方程式の後退 Euler 差分法の増幅因子は

$$
\boxed{
G_{\mathrm{BE}}(\xi)
=
\frac{
1
}{
1+
4r\sin^2(\xi/2)
}
}
$$

である。

任意の $r\ge0$ と任意の $\xi$ に対して

$$
0<G_{\mathrm{BE}}(\xi)\le1.
$$

従って後退 Euler 差分法は、von Neumann 型解析の意味で刻み幅制約なしに縮小的である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r\ge0$ かつ

$$
\sin^2\frac{\xi}{2}\ge0
$$

なので分母は

$$
1+
4r\sin^2\frac{\xi}{2}
\ge1.
$$

従って

$$
0
<
\frac{
1
}{
1+
4r\sin^2(\xi/2)
}
\le1.
$$

よって

$$
|G_{\mathrm{BE}}(\xi)|
\le1
$$

です。

$r$ の上限は必要ありません。
<!-- proof-end -->

ここで **無条件安定**とは

$$
\tau
\le
C h^2
$$

のような安定性由来の刻み幅条件が不要だという意味です。

「どれだけ大きな $\tau$ を選んでも高精度」という意味ではありません。

精度のためには別に $\tau\to0$ が必要です。

---

## 10. 熱方程式の theta 差分法

NA7 の theta 法は

$$
y_{n+1}
=
y_n
+
\tau
\left[
(1-\theta)f(y_n)
+
\theta f(y_{n+1})
\right]
$$

でした。

熱方程式でも、空間半離散系へ同じ時間離散を適用できます。

<a id="def-fdm2-theta-heat"></a>
<!-- formal-statement-start -->
### 定義（熱方程式の theta 差分法）

$0\le\theta\le1$ とする。

一次元熱方程式に対し

$$
\boxed{
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\kappa
\left[
(1-\theta)\delta_{xx}U_j^n
+
\theta\delta_{xx}U_j^{n+1}
\right]
}
$$

とする差分法を **熱方程式の theta 差分法**という。
<!-- formal-statement-end -->

特に

$$
\theta=0
$$

なら FTCS、

$$
\theta=1
$$

なら後退 Euler 差分法です。

<!-- definition-example-start: def-fdm2-theta-heat -->
### 例：$\theta=1/2$ では新旧時刻の中心二階空間差分作用素 を平均する

**定義の確認**。$\theta=1/2$ を代入すると

$$
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\frac{\kappa}{2}
\left(
\delta_{xx}U_j^n
+
\delta_{xx}U_j^{n+1}
\right).
$$

したがって時間区間の両端で空間中心二階空間差分作用素 を評価し、その平均で1ステップ進めます。
<!-- definition-example-end -->

<a id="def-fdm2-crank-nicolson"></a>
<!-- formal-statement-start -->
### 定義（Crank--Nicolson 差分法）

熱方程式の theta 差分法で

$$
\theta=\frac12
$$

とした方法

$$
\boxed{
\frac{
U_j^{n+1}-U_j^n
}{\tau}
=
\frac{\kappa}{2}
\left(
\delta_{xx}U_j^n
+
\delta_{xx}U_j^{n+1}
\right)
}
$$

を **Crank--Nicolson 差分法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fdm2-crank-nicolson -->
### 例：1つの Fourier モードの更新

**定義の確認**。Fourier モードへ適用し、

$$
a
=
4r\sin^2\frac{\xi}{2}
$$

と置くと

$$
\widehat E^{n+1}
-
\widehat E^n
=
-\frac a2
\left(
\widehat E^n+\widehat E^{n+1}
\right).
$$

従って

$$
\left(
1+\frac a2
\right)
\widehat E^{n+1}
=
\left(
1-\frac a2
\right)
\widehat E^n.
$$

したがって増幅因子は

$$
\boxed{
G_{\mathrm{CN}}(\xi)
=
\frac{
1-a/2
}{
1+a/2
}
}.
$$
<!-- definition-example-end -->

---

## 11. theta 差分法の安定性を完全に分類する

Fourier モードを theta 差分法へ代入します。

$$
a
=
4r\sin^2\frac{\xi}{2}
\ge0
$$

と置くと

$$
\widehat E^{n+1}
-
\widehat E^n
=
-a
\left[
(1-\theta)\widehat E^n
+
\theta\widehat E^{n+1}
\right].
$$

従って

$$
(1+\theta a)\widehat E^{n+1}
=
\left[
1-(1-\theta)a
\right]
\widehat E^n.
$$

よって

$$
\boxed{
G_\theta(\xi)
=
\frac{
1-(1-\theta)a
}{
1+\theta a
},
\qquad
a=4r\sin^2\frac{\xi}{2}
}
$$

です。

<a id="thm-fdm2-theta-stability"></a>
<!-- formal-statement-start -->
### 定理（熱方程式の theta 差分法の安定性条件）

$0\le\theta\le1$、$r\ge0$ とし、von Neumann 型解析として $\xi\in[-\pi,\pi]$ の Fourier モードを考える。

$$
a(\xi)
=
4r\sin^2\frac{\xi}{2},
$$

$$
G_\theta(\xi)
=
\frac{
1-(1-\theta)a(\xi)
}{
1+\theta a(\xi)
}
$$

とする。

全波数で

$$
|G_\theta(\xi)|\le1
$$

を満たす条件は次である。

1. $\theta\ge1/2$ なら任意の $r\ge0$ で安定。
2. $0\le\theta<1/2$ なら

   $$
   \boxed{
   r
   \le
   \frac{
   1
   }{
   2(1-2\theta)
   }
   }
   $$

   が必要十分。

特に

$$
\theta=0
$$

で FTCS の

$$
r\le\frac12
$$

を回収し、

$$
\theta=\frac12
$$

の Crank--Nicolson 差分法と

$$
\theta=1
$$

の後退 Euler 差分法は無条件安定である。
<!-- formal-statement-end -->

### 証明の見取り図

分母

$$
1+\theta a
$$

は正です。

したがって

$$
|G_\theta|\le1
$$

は

$$
-1
\le
G_\theta
\le1
$$

で判定できます。

上側は自動的に成り立ち、下側から

$$
2+(2\theta-1)a\ge0
$$

が出ます。

<!-- proof-start -->
### 証明

$a\ge0$ で

$$
1+\theta a>0.
$$

まず

$$
G_\theta\le1
$$

を調べます。

$$
\frac{
1-(1-\theta)a
}{
1+\theta a
}
\le1
$$

は、正の分母を掛けて

$$
1-(1-\theta)a
\le
1+\theta a.
$$

両辺から1を引くと

$$
-(1-\theta)a
\le
\theta a.
$$

これは

$$
-a\le0
$$

と同値なので常に成り立ちます。

次に

$$
G_\theta\ge-1
$$

を調べます。

$$
\frac{
1-(1-\theta)a
}{
1+\theta a
}
\ge-1
$$

は

$$
1-(1-\theta)a
\ge
-1-\theta a
$$

と同値です。

整理すると

$$
\boxed{
2+(2\theta-1)a\ge0
}.
$$

#### $\theta\ge1/2$ の場合

$$
2\theta-1\ge0
$$

かつ $a\ge0$ なので

$$
2+(2\theta-1)a\ge2>0.
$$

従って任意の $r$ で安定です。

#### $0\le\theta<1/2$ の場合

$$
2\theta-1<0
$$

なので条件は

$$
a
\le
\frac{2}{1-2\theta}.
$$

全波数に対して必要十分な条件を得るには

$$
a
=
4r\sin^2\frac{\xi}{2}
$$

の最大値

$$
a_{\max}=4r
$$

を用います。

従って

$$
4r
\le
\frac{2}{1-2\theta}.
$$

よって

$$
\boxed{
r
\le
\frac1{2(1-2\theta)}
}.
$$
<!-- proof-end -->

---

## 12. NA7 の絶対安定性と同じ式が現れる理由

FDM1 では空間半離散化によって

$$
\mathbf U'(t)
=
-\frac{\kappa}{h^2}
K\mathbf U(t)
$$

を得ました。

もし $K$ の固有ベクトル $\mathbf v$ が

$$
K\mathbf v=\mu\mathbf v,
\qquad
\mu\ge0
$$

を満たすなら、そのモードの係数 $y(t)$ は

$$
y'(t)
=
-\frac{\kappa\mu}{h^2}y(t)
$$

というスカラー ODE に従います。

これは NA7 の線形テスト方程式

$$
y'=\lambda y
$$

で

$$
\lambda
=
-\frac{\kappa\mu}{h^2}
\le0
$$

としたものです。

theta 法の安定関数は NA7 で

$$
R_\theta(z)
=
\frac{
1+(1-\theta)z
}{
1-\theta z
}
$$

でした。

ここで

$$
z
=
\tau\lambda
=
-r\mu
$$

を代入すると

$$
R_\theta(-r\mu)
=
\frac{
1-(1-\theta)r\mu
}{
1+\theta r\mu
}.
$$

$-h^2\Delta_h$ の Fourier 固有値

$$
\mu(\xi)
=
4\sin^2\frac{\xi}{2}
$$

を入れれば

$$
G_\theta(\xi)
=
R_\theta
\left(
-4r\sin^2\frac{\xi}{2}
\right).
$$

したがって

$$
\boxed{
\text{PDE の von Neumann 型安定性}
=
\text{空間離散固有モードごとの ODE 絶対安定性}
}
$$

という関係が成り立っています。

FDM2 は NA7 の絶対安定性を PDE 離散化へ移した章だと見ることもできます。

---

## 13. 無条件安定でも高周波の減衰は同じではない

無条件安定な二つの方法を比較します。

### 後退 Euler 差分法

$$
G_{\mathrm{BE}}
=
\frac1{1+a}.
$$

$a\to\infty$ なら

$$
G_{\mathrm{BE}}\to0.
$$

非常に高周波なモードや非常に大きな $r$ に対して、1ステップで強く減衰します。

### Crank--Nicolson 差分法

$$
G_{\mathrm{CN}}
=
\frac{1-a/2}{1+a/2}.
$$

$a\to\infty$ なら

$$
G_{\mathrm{CN}}\to-1.
$$

絶対値は1を超えないので安定ですが、高周波モードは符号を交互に変えながら残りやすいことが分かります。

これは NA7 で見た

- 後退 Euler 法：L 安定
- 台形法：A 安定だが L 安定ではない

という違いの PDE 版です。

**「増幅しない」と「物理的に速く減衰すべきモードを速く消す」は別の性質です。**

---

## 14. Dirichlet 境界条件では正弦モードが現れる

FDM1 の斉次 Dirichlet 境界条件

$$
U_0^n=U_J^n=0
$$

へ戻ります。

内部格子点 $j=1,\ldots,J-1$ で

$$
\phi_j^{(k)}
=
\sin\frac{k\pi j}{J},
\qquad
k=1,\ldots,J-1
$$

を考えます。

FDM1 の行列

$$
K
=
\begin{pmatrix}
2&-1&&0\\
-1&2&\ddots&\\
&\ddots&\ddots&-1\\
0&&-1&2
\end{pmatrix}
$$

を作用させると

$$
(K\phi^{(k)})_j
=
2\phi_j^{(k)}
-
\phi_{j-1}^{(k)}
-
\phi_{j+1}^{(k)}.
$$

三角関数の加法公式から

$$
\phi_{j-1}^{(k)}
+
\phi_{j+1}^{(k)}
=
2
\cos\frac{k\pi}{J}
\,
\phi_j^{(k)}.
$$

従って

$$
\begin{aligned}
(K\phi^{(k)})_j
&=
2
\left(
1-\cos\frac{k\pi}{J}
\right)
\phi_j^{(k)}\\
&=
4
\sin^2\frac{k\pi}{2J}
\,
\phi_j^{(k)}.
\end{aligned}
$$

<a id="prop-fdm2-dirichlet-sine-modes"></a>
<!-- formal-statement-start -->
### 命題（斉次 Dirichlet 格子の離散正弦モード）

整数 $J\ge2$ とし、斉次 Dirichlet 格子の内部点 $j=1,\ldots,J-1$ 上で、$-h^2\Delta_h$ に対応する行列

$$
K
=
\begin{pmatrix}
2&-1&&0\\
-1&2&\ddots&\\
&\ddots&\ddots&-1\\
0&&-1&2
\end{pmatrix}
$$

を考える。

この $K$ の固有ベクトルは

$$
\phi_j^{(k)}
=
\sin\frac{k\pi j}{J}
\qquad
(k=1,\ldots,J-1)
$$

であり、対応する固有値は

$$
\boxed{
\mu_k
=
4
\sin^2\frac{k\pi}{2J}
}.
$$

従って熱方程式の theta 差分法では各モードの増幅因子が

$$
\boxed{
G_{\theta,k}
=
\frac{
1-(1-\theta)r\mu_k
}{
1+\theta r\mu_k
}
}
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で計算した通り、

$$
K\phi^{(k)}
=
\mu_k\phi^{(k)},
$$

$$
\mu_k
=
4\sin^2\frac{k\pi}{2J}.
$$

theta 差分法をベクトルで書くと

$$
\frac{
\mathbf E^{n+1}-\mathbf E^n
}{\tau}
=
-\frac{\kappa}{h^2}
K
\left[
(1-\theta)\mathbf E^n
+
\theta\mathbf E^{n+1}
\right].
$$

1つの固有モード

$$
\mathbf E^n
=
\widehat E_k^n\phi^{(k)}
$$

を代入すると

$$
\widehat E_k^{n+1}
-
\widehat E_k^n
=
-r\mu_k
\left[
(1-\theta)\widehat E_k^n
+
\theta\widehat E_k^{n+1}
\right].
$$

従って

$$
\left(
1+\theta r\mu_k
\right)
\widehat E_k^{n+1}
=
\left[
1-(1-\theta)r\mu_k
\right]
\widehat E_k^n.
$$

よって

$$
G_{\theta,k}
=
\frac{
1-(1-\theta)r\mu_k
}{
1+\theta r\mu_k
}.
$$
<!-- proof-end -->

FTCS では

$$
G_k=1-r\mu_k.
$$

有限の $J$ では最大固有値が

$$
\mu_{\max}
=
4\cos^2\frac{\pi}{2J}
<4
$$

なので、その固定格子だけを見れば

$$
r
\le
\frac{
1
}{
2\cos^2(\pi/(2J))
}
$$

まで $\ell^2$ 安定です。

しかし

$$
J\to\infty
$$

で

$$
\cos^2\frac{\pi}{2J}\to1
$$

なので、格子細分化に対して一様な条件は

$$
\boxed{
r\le\frac12
}
$$

に戻ります。

この違いは重要です。

数値解析で欲しいのは「この1個の粗い格子だけでは偶然増幅しなかった」ではなく、格子を細かくしても定数が壊れない安定性です。

---

## 15. ここまでの比較

| 差分法 | $\theta$ | 増幅因子 | 安定性条件 | 高周波 $a\to\infty$ |
|---|---:|---|---|---|
| FTCS | 0 | $1-a$ | $r\le1/2$ | 条件を破ると増幅 |
| Crank--Nicolson | $1/2$ | $(1-a/2)/(1+a/2)$ | 無条件安定 | $-1$ へ近づく |
| 後退 Euler | 1 | $1/(1+a)$ | 無条件安定 | $0$ へ近づく |

ただし

$$
a=4r\sin^2\frac{\xi}{2}
$$

です。

この表から

- 陽解法は1ステップが軽いが安定性条件が厳しい
- 陰解法は連立方程式を解く必要があるが刻み幅制約を外せる
- 無条件安定な方法どうしでも高周波減衰特性は異なる

ことが分かります。

---

## 16. この章でまだ言っていないこと

安定性が分かっても、まだ

$$
U_j^n
\longrightarrow
u(t_n,x_j)
$$

を証明したことにはなりません。

数値解が元の PDE 解へ近づくには、

1. 差分式そのものが PDE を正しく近似していること
2. その局所的な近似誤差が時間発展で暴走しないこと

の両方が必要です。

FDM3 では

$$
\text{局所打切り誤差}
\to
\text{整合性}
\to
\text{安定性}
\to
\text{大域誤差}
\to
\text{収束}
$$

を一つの論理として組み立てます。

---

# 17. 演習

## Level A

<a id="ex-fdm2-a01"></a>
### FDM2-A01 FTCS の増幅因子と CFL 条件
- Level: A

FTCS

$$
E_j^{n+1}
=
rE_{j-1}^n
+
(1-2r)E_j^n
+
rE_{j+1}^n
$$

へ

$$
E_j^n=\widehat E^n e^{ij\xi}
$$

を代入し、

1. 増幅因子 $G(\xi)$ を求めよ。
2. 全波数で $|G(\xi)|\le1$ となる条件を求めよ。
3. $\kappa=2$, $h=0.1$ のとき許される最大時間刻み $\tau$ を求めよ。

<!-- solution-start -->
### 詳細解答

Fourier モードを代入すると

$$
E_{j-1}^n
=
e^{-i\xi}
\widehat E^n e^{ij\xi},
$$

$$
E_{j+1}^n
=
e^{i\xi}
\widehat E^n e^{ij\xi}.
$$

従って

$$
\begin{aligned}
E_j^{n+1}
&=
\left[
re^{-i\xi}
+
1-2r
+
re^{i\xi}
\right]
\widehat E^n e^{ij\xi}\\
&=
\left[
1-2r+2r\cos\xi
\right]
\widehat E^n e^{ij\xi}.
\end{aligned}
$$

したがって

$$
G(\xi)
=
1-2r+2r\cos\xi.
$$

さらに

$$
1-\cos\xi
=
2\sin^2\frac{\xi}{2}
$$

なので

$$
\boxed{
G(\xi)
=
1
-
4r\sin^2\frac{\xi}{2}
}.
$$

$r\ge0$ なら $G(\xi)\le1$ は自動的に成り立ちます。

したがって

$$
G(\xi)\ge-1
$$

だけを見ればよく、

$$
1
-
4r\sin^2\frac{\xi}{2}
\ge-1.
$$

最悪の場合

$$
\sin^2\frac{\xi}{2}=1
$$

なので

$$
1-4r\ge-1.
$$

従って

$$
\boxed{
r\le\frac12
}.
$$

$r=\kappa\tau/h^2$ より

$$
\tau
\le
\frac{h^2}{2\kappa}.
$$

$\kappa=2$, $h=0.1$ では

$$
h^2=0.01
$$

なので

$$
\tau
\le
\frac{0.01}{4}
=
0.0025.
$$

従って最大時間刻みは

$$
\boxed{
\tau_{\max}=2.5\times10^{-3}
}.
$$
<!-- solution-end -->

<a id="ex-fdm2-a02"></a>
### FDM2-A02 CFL 条件を破った交互振動
- Level: A

FTCS で

$$
r=0.6
$$

とする。

初期摂動を

$$
E_j^0=10^{-6}(-1)^j
$$

としたとき、

1. 1ステップの増幅因子を求めよ。
2. 5ステップ後の振幅を求めよ。
3. なぜ熱方程式の性質と逆向きの挙動か説明せよ。

<!-- solution-start -->
### 詳細解答

交互振動

$$
(-1)^j=e^{ij\pi}
$$

は波数

$$
\xi=\pi
$$

に対応します。

FTCS の増幅因子は

$$
G(\pi)
=
1-4r.
$$

$r=0.6$ だから

$$
G(\pi)
=
1-2.4
=
\boxed{-1.4}.
$$

従って振幅は1ステップごとに $-1.4$ 倍されます。

5ステップ後は

$$
\widehat E^5
=
(-1.4)^5
10^{-6}.
$$

$$
1.4^2=1.96,
\qquad
1.4^4=3.8416,
$$

なので

$$
1.4^5=5.37824.
$$

したがって

$$
\boxed{
|\widehat E^5|
=
5.37824\times10^{-6}
}.
$$

符号は5回反転するので

$$
\widehat E^5
=
-5.37824\times10^{-6}.
$$

熱方程式は空間の細かい振動ほど速く平滑化します。

ところが数値解では最も細かい交互振動が

$$
1.4^n
$$

倍に増幅します。

したがって数値法が PDE の拡散による減衰機構を再現できず、むしろ逆向きの増幅を作っています。
<!-- solution-end -->

<a id="ex-fdm2-a03"></a>
### FDM2-A03 後退 Euler 差分法の高周波減衰
- Level: A

後退 Euler 差分法について

$$
r=10,
\qquad
\xi=\pi
$$

とする。

1. 増幅因子を求めよ。
2. 同じ $r,\xi$ で FTCS の増幅因子を求めよ。
3. 両者の違いを安定性の観点から説明せよ。

<!-- solution-start -->
### 詳細解答

$\xi=\pi$ では

$$
\sin^2\frac{\pi}{2}=1.
$$

後退 Euler 差分法の増幅因子は

$$
G_{\mathrm{BE}}(\pi)
=
\frac1{1+4r}.
$$

$r=10$ より

$$
\boxed{
G_{\mathrm{BE}}(\pi)
=
\frac1{41}
}.
$$

絶対値は

$$
\frac1{41}<1
$$

なので強く減衰します。

一方、FTCS は

$$
G_{\mathrm{FTCS}}(\pi)
=
1-4r
=
1-40
=
\boxed{-39}.
$$

1ステップだけで振幅が39倍になります。

後退 Euler 差分法では任意の $r\ge0$ で

$$
|G_{\mathrm{BE}}|\le1
$$

ですが、FTCS は

$$
r\le\frac12
$$

が必要です。

したがって $r=10$ は後退 Euler 差分法では安定でも、FTCS では極端に不安定です。
<!-- solution-end -->

<a id="ex-fdm2-a04"></a>
### FDM2-A04 Crank--Nicolson の増幅因子
- Level: A

Crank--Nicolson 差分法について

$$
a
=
4r\sin^2\frac{\xi}{2}
$$

と置く。

1. 増幅因子が
   $$
   G(a)=\frac{1-a/2}{1+a/2}
   $$
   となることを導け。
2. $a=2$ のときの増幅因子を求めよ。
3. $a=100$ のときの増幅因子を求め、高周波減衰について解釈せよ。

<!-- solution-start -->
### 詳細解答

Crank--Nicolson 法は

$$
\frac{
E_j^{n+1}-E_j^n
}{\tau}
=
\frac{\kappa}{2}
\left(
\delta_{xx}E_j^n
+
\delta_{xx}E_j^{n+1}
\right)
$$

です。

Fourier モードでは中心二階空間差分作用素 が

$$
-\frac{4}{h^2}
\sin^2\frac{\xi}{2}
$$

倍として作用します。

従って

$$
\widehat E^{n+1}
-
\widehat E^n
=
-\frac a2
\left(
\widehat E^n
+
\widehat E^{n+1}
\right).
$$

整理すると

$$
\left(
1+\frac a2
\right)
\widehat E^{n+1}
=
\left(
1-\frac a2
\right)
\widehat E^n.
$$

よって

$$
\boxed{
G(a)
=
\frac{1-a/2}{1+a/2}
}.
$$

$a=2$ では

$$
G(2)
=
\frac{1-1}{1+1}
=
\boxed{0}.
$$

$a=100$ では

$$
G(100)
=
\frac{1-50}{1+50}
=
-\frac{49}{51}.
$$

したがって

$$
\boxed{
G(100)
=
-\frac{49}{51}
\approx-0.961
}.
$$

絶対値は1未満なので安定ですが、0には近くありません。

高周波モードは符号を交互に変えながらかなり長く残ります。

従って Crank--Nicolson 法は無条件安定ですが、非常に高周波な成分を強く消す方法ではありません。
<!-- solution-end -->

## Level B

<a id="ex-fdm2-b01"></a>
### FDM2-B01 theta 差分法の安定性条件
- Level: B

熱方程式の theta 差分法で

$$
G_\theta
=
\frac{
1-(1-\theta)a
}{
1+\theta a
},
\qquad
a\ge0
$$

とする。

$0\le\theta\le1$ として、

1. $\theta\ge1/2$ なら任意の $a\ge0$ で $|G_\theta|\le1$ であることを示せ。
2. $\theta<1/2$ なら
   $$
   a\le\frac{2}{1-2\theta}
   $$
   が必要十分であることを示せ。
3. $a\le4r$ を用いて $r$ の条件へ直せ。

<!-- solution-start -->
### 詳細解答

分母は

$$
1+\theta a\ge1>0.
$$

したがって

$$
|G_\theta|\le1
$$

は

$$
-1\le G_\theta\le1
$$

と同値です。

まず上側を調べます。

$$
G_\theta\le1
$$

は

$$
1-(1-\theta)a
\le
1+\theta a
$$

と同値です。

整理すると

$$
-a\le0,
$$

なので $a\ge0$ では常に成り立ちます。

下側は

$$
G_\theta\ge-1.
$$

これは

$$
1-(1-\theta)a
\ge
-1-\theta a
$$

と同値です。

従って

$$
2+(2\theta-1)a\ge0.
$$

$\theta\ge1/2$ なら

$$
2\theta-1\ge0
$$

なので左辺は常に2以上です。

従って任意の $a\ge0$ で安定です。

次に

$$
\theta<\frac12
$$

なら

$$
1-2\theta>0.
$$

条件

$$
2+(2\theta-1)a\ge0
$$

を

$$
2-(1-2\theta)a\ge0
$$

と書くと

$$
a
\le
\frac{2}{1-2\theta}.
$$

これが必要十分です。

熱方程式では

$$
a
=
4r\sin^2\frac{\xi}{2}
\le4r.
$$

全波数で条件を満たすには

$$
4r
\le
\frac{2}{1-2\theta}.
$$

従って

$$
\boxed{
r
\le
\frac1{2(1-2\theta)}
}.
$$
<!-- solution-end -->

<a id="ex-fdm2-b02"></a>
### FDM2-B02 Dirichlet 格子の離散正弦固有値
- Level: B

斉次 Dirichlet 境界条件の内部点 $j=1,\ldots,J-1$ で

$$
\phi_j^{(k)}
=
\sin\frac{k\pi j}{J}
$$

とする。

1. 
   $$
   \phi_{j-1}^{(k)}+\phi_{j+1}^{(k)}
   =
   2\cos\frac{k\pi}{J}\,\phi_j^{(k)}
   $$
   を示せ。
2. 行列
   $$
   (K\phi)_j
   =
   2\phi_j-\phi_{j-1}-\phi_{j+1}
   $$
   の固有値を求めよ。
3. FTCS の各モードの増幅因子を求めよ。

<!-- solution-start -->
### 詳細解答

角

$$
\alpha
=
\frac{k\pi j}{J},
\qquad
\beta
=
\frac{k\pi}{J}
$$

と置きます。

すると

$$
\phi_{j-1}^{(k)}
=
\sin(\alpha-\beta),
$$

$$
\phi_{j+1}^{(k)}
=
\sin(\alpha+\beta).
$$

加法公式

$$
\sin(\alpha-\beta)
+
\sin(\alpha+\beta)
=
2\sin\alpha\cos\beta
$$

より

$$
\boxed{
\phi_{j-1}^{(k)}
+
\phi_{j+1}^{(k)}
=
2\cos\frac{k\pi}{J}
\,
\phi_j^{(k)}
}.
$$

従って

$$
\begin{aligned}
(K\phi^{(k)})_j
&=
2\phi_j^{(k)}
-
\phi_{j-1}^{(k)}
-
\phi_{j+1}^{(k)}\\
&=
2
\left(
1-\cos\frac{k\pi}{J}
\right)
\phi_j^{(k)}.
\end{aligned}
$$

恒等式

$$
1-\cos x
=
2\sin^2\frac x2
$$

を使うと

$$
(K\phi^{(k)})_j
=
4
\sin^2\frac{k\pi}{2J}
\phi_j^{(k)}.
$$

したがって固有値は

$$
\boxed{
\mu_k
=
4
\sin^2\frac{k\pi}{2J}
}.
$$

FTCS のベクトル更新は

$$
\mathbf E^{n+1}
=
(I-rK)\mathbf E^n.
$$

固有モードでは

$$
\widehat E_k^{n+1}
=
(1-r\mu_k)
\widehat E_k^n.
$$

従って

$$
\boxed{
G_k
=
1
-
4r
\sin^2\frac{k\pi}{2J}
}.
$$
<!-- solution-end -->

<a id="ex-fdm2-b03"></a>
### FDM2-B03 ODE の安定関数から PDE の増幅因子を作る
- Level: B

空間半離散系

$$
\mathbf U'
=
-\frac{\kappa}{h^2}K\mathbf U
$$

で

$$
K\mathbf v=\mu\mathbf v
$$

とする。

1. 固有モード $\mathbf U(t)=y(t)\mathbf v$ が満たすスカラー ODE を求めよ。
2. NA7 の theta 法の安定関数
   $$
   R_\theta(z)
   =
   \frac{1+(1-\theta)z}{1-\theta z}
   $$
   へ適切な $z$ を代入せよ。
3. 離散 Fourier モードの
   $$
   \mu=4\sin^2(\xi/2)
   $$
   を代入し、FDM2 の $G_\theta(\xi)$ と一致することを示せ。

<!-- solution-start -->
### 詳細解答

$$
\mathbf U(t)
=
y(t)\mathbf v
$$

と置くと

$$
\mathbf U'(t)
=
y'(t)\mathbf v.
$$

一方、

$$
-\frac{\kappa}{h^2}K\mathbf U
=
-\frac{\kappa}{h^2}
K
\left(
y\mathbf v
\right)
=
-\frac{\kappa}{h^2}
y\mu\mathbf v.
$$

したがって

$$
\boxed{
y'
=
-\frac{\kappa\mu}{h^2}y
}.
$$

これは線形テスト方程式

$$
y'=\lambda y
$$

で

$$
\lambda
=
-\frac{\kappa\mu}{h^2}
$$

としたものです。

時間刻みは $\tau$ なので

$$
z=\tau\lambda
=
-\frac{\kappa\tau}{h^2}\mu.
$$

$r=\kappa\tau/h^2$ より

$$
\boxed{
z=-r\mu
}.
$$

theta 法の安定関数へ代入すると

$$
R_\theta(-r\mu)
=
\frac{
1-(1-\theta)r\mu
}{
1+\theta r\mu
}.
$$

Fourier モードでは

$$
\mu
=
4\sin^2\frac{\xi}{2}
$$

なので

$$
R_\theta
\left(
-4r\sin^2\frac{\xi}{2}
\right)
=
\frac{
1
-
4(1-\theta)r\sin^2(\xi/2)
}{
1
+
4\theta r\sin^2(\xi/2)
}.
$$

したがって

$$
\boxed{
R_\theta
\left(
-4r\sin^2\frac{\xi}{2}
\right)
=
G_\theta(\xi)
}.
$$

PDE の Fourier モード安定性が、空間半離散固有値を ODE の安定関数へ代入したものになっていることが分かります。
<!-- solution-end -->

## Level C

<a id="ex-fdm2-c01"></a>
### FDM2-C01 安定性と高周波減衰を同時に比較する
- Level: C

熱方程式の1つの離散固有モードについて

$$
a=20
$$

とする。

FTCS、Crank--Nicolson、後退 Euler の増幅因子をそれぞれ求める。

さらに、

1. どの方法が安定か判定せよ。
2. 10ステップ後の振幅比の絶対値を求めよ。
3. 「無条件安定」という性質だけでは Crank--Nicolson と後退 Euler の違いを説明できない理由を述べよ。
4. 厳密な半離散 ODE の1ステップ増幅率が $e^{-20}$ であるとき、どの方法が速い減衰モードの消失をよりよく再現しているか説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 各方法の増幅因子

FTCS は

$$
G_{\mathrm{FTCS}}
=
1-a.
$$

$a=20$ なので

$$
\boxed{
G_{\mathrm{FTCS}}=-19
}.
$$

Crank--Nicolson は

$$
G_{\mathrm{CN}}
=
\frac{1-a/2}{1+a/2}.
$$

したがって

$$
G_{\mathrm{CN}}
=
\frac{1-10}{1+10}
=
\boxed{
-\frac9{11}
}.
$$

後退 Euler は

$$
G_{\mathrm{BE}}
=
\frac1{1+a}
=
\boxed{
\frac1{21}
}.
$$

#### 2. 安定性

FTCS は

$$
|G_{\mathrm{FTCS}}|
=
19>1
$$

なので不安定です。

Crank--Nicolson は

$$
\left|
-\frac9{11}
\right|
=
\frac9{11}<1
$$

なので安定です。

後退 Euler は

$$
\frac1{21}<1
$$

なので安定です。

#### 3. 10ステップ後

FTCS は

$$
|G_{\mathrm{FTCS}}|^{10}
=
19^{10}.
$$

これは極めて大きく、摂動は爆発します。

Crank--Nicolson は

$$
\left(
\frac9{11}
\right)^{10}.
$$

数値的には

$$
\frac9{11}
\approx0.81818.
$$

したがって

$$
\left(
\frac9{11}
\right)^{10}
\approx0.134.
$$

後退 Euler は

$$
\left(
\frac1{21}
\right)^{10}.
$$

$$
21^{10}
=
16679880978201
$$

なので

$$
\left(
\frac1{21}
\right)^{10}
\approx
5.995\times10^{-14}.
$$

従って

$$
\boxed{
|G_{\mathrm{FTCS}}|^{10}=19^{10}
},
$$

$$
\boxed{
|G_{\mathrm{CN}}|^{10}\approx0.134
},
$$

$$
\boxed{
|G_{\mathrm{BE}}|^{10}\approx6.0\times10^{-14}
}.
$$

#### 4. 無条件安定だけでは足りない理由

Crank--Nicolson と後退 Euler はどちらも無条件安定です。

しかし $a$ が大きいと

$$
G_{\mathrm{CN}}\to-1,
$$

$$
G_{\mathrm{BE}}\to0.
$$

したがって Crank--Nicolson では速いモードが符号反転しながら残りやすく、後退 Euler では速く消えます。

「絶対値が1を超えない」という安定性だけでは、この差は区別できません。

#### 5. 厳密減衰との比較

厳密な半離散 ODE の1ステップ増幅率は

$$
e^{-20}
\approx2.06\times10^{-9}.
$$

これはほぼ0です。

後退 Euler の

$$
\frac1{21}\approx0.0476
$$

も厳密値よりは大きいですが、Crank--Nicolson の

$$
-\frac9{11}\approx-0.818
$$

よりははるかに強い減衰を与えます。

したがってこの速い減衰モードについては、後退 Euler 法の方が「速く消える」という定性的性質をよく再現しています。

一方、Crank--Nicolson 法は安定ではあるものの、高周波を強く消す L 安定型の性質を持ちません。
<!-- solution-end -->

---

## 18. まとめ

この章の中心式は

$$
\boxed{
G_{\mathrm{FTCS}}(\xi)
=
1
-
4r\sin^2\frac{\xi}{2}
}
$$

と

$$
\boxed{
G_\theta(\xi)
=
\frac{
1-(1-\theta)a
}{
1+\theta a
},
\qquad
a=4r\sin^2\frac{\xi}{2}
}
$$

です。

ここから

$$
\boxed{
\text{FTCS}
\quad
r\le\frac12
}
$$

という拡散 CFL 条件と、

$$
\boxed{
\theta\ge\frac12
\quad\Longrightarrow\quad
\text{無条件安定}
}
$$

が得られました。

さらに、

- Fourier モードを調べればよい理由は離散 Fourier 分解と Parseval 恒等式にある
- 後退 Euler 法は無条件安定かつ高周波を強く減衰させる
- Crank--Nicolson 法は無条件安定だが高周波の減衰は弱い
- PDE の増幅因子は、空間半離散固有値を NA7 の ODE 安定関数へ代入したものになる
- 固定した粗い格子での安定性ではなく、格子細分化に対して一様な安定性を見る必要がある

ことを確認しました。

次の FDM3 では、ここで得た安定性を局所打切り誤差と結び、

$$
\text{整合性}
+
\text{安定性}
\Longrightarrow
\text{収束}
$$

という数値 PDE の基本論理を組み立てます。
