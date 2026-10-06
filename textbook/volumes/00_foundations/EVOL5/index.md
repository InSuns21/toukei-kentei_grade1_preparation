# EVOL5 analytic semigroup・sectorial operator・放物型 smoothing

<!-- definition-example-audit: strict -->

EVOL4 では、生成作用素 $A$ と強連続半群 $T(t)$ を使って

$$
u'(t)=Au(t)+f(t)
$$

を

$$
u(t)
=
T(t)u_0
+
\int_0^t T(t-s)f(s)\,ds
$$

という mild 解へ落としました。

これで「初期値が $D(A)$ に入らなくても解を作る」ことはできました。しかし、熱方程式にはさらに強い現象があります。

初期値がかなり粗くても、時刻を少しでも進めると解が急に滑らかになります。たとえば Fourier 係数が

$$
a_n
$$

だった初期値に対し、熱方程式では第 $n$ モードが

$$
e^{-n^2t}a_n
$$

へ変わります。$t>0$ なら高周波ほど非常に強く減衰します。

つまり熱方程式では

$$
\text{時間を進める}
\quad\Longrightarrow\quad
\text{高周波が消える}
\quad\Longrightarrow\quad
\text{空間的に滑らかになる}
$$

という仕組みがあります。

普通の $C_0$ 半群は「連続に時間発展できる」ことしか保証しません。本章では、さらに複素時間まで正則に延長できる **analytic semigroup** を導入し、

$$
\boxed{
\text{複素時間での正則性}
\quad\Longrightarrow\quad
\|B^m e^{-tB}\|
\lesssim
t^{-m}
}
$$

という放物型 smoothing を作用素論から導きます。

ここでは符号を混同しないため、EVOL2--4 の生成作用素 $A$ ではなく、

$$
B=-A
$$

という「正の向き」の作用素を使います。したがって時間発展は

$$
S(t)=e^{-tB}
$$

です。

---

## 1. なぜ複素時間を見ると smoothing が見えるのか

有限次元で行列 $B$ が与えられれば、

$$
e^{-zB}
$$

は複素変数 $z$ の正則関数です。

無限次元で非有界作用素を扱うときも、もし $S(t)$ が複素時間 $z$ へ正則に延長できれば、[Cauchy の積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula)から時間微分を制御できます。

そして生成作用素との関係

$$
\frac{d}{dt}S(t)x
=
-BS(t)x
$$

を使えば、時間微分の評価がそのまま

$$
BS(t)
$$

の評価になります。

ここが ordinary $C_0$ 半群との決定的な違いです。

---

## 2. 複素時間の sector を定める

$0<\theta\le\pi/2$ に対して

$$
\Sigma_\theta
=
\left\{
z\in\mathbb C\setminus\{0\}:
|\arg z|<\theta
\right\}
$$

と置きます。

これは正の実軸を中心に開いた扇形です。

正の実時間は

$$
(0,\infty)\subset\Sigma_\theta
$$

に入ります。analytic semigroup では、実時間上の $S(t)$ をこの扇形へ延長します。

<a id="def-evol5-analytic-semigroup"></a>
<!-- formal-statement-start -->
### 定義（bounded analytic C0 半群）

$X$ を複素 Banach 空間、$0<\theta\le\pi/2$ とする。

写像

$$
S:\Sigma_\theta\to\mathcal B(X)
$$

が **bounded analytic $C_0$ 半群**であるとは、次を満たすことをいう。

1. 各 $x\in X$ に対して $z\mapsto S(z)x$ は $\Sigma_\theta$ 上で正則である。
2. $z,w,z+w\in\Sigma_\theta$ なら
   $$
   S(z+w)=S(z)S(w)
   $$
   が成り立つ。
3. 任意の $0<\theta'<\theta$ について
   $$
   \sup_{z\in\Sigma_{\theta'}}\|S(z)\|<\infty
   $$
   である。
4. 任意の $x\in X$ と $0<\theta'<\theta$ について、$z\to0$ を $\Sigma_{\theta'}$ 内から取ると
   $$
   S(z)x\to x
   $$
   が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol5-analytic-semigroup -->
### **定義の確認**：$B=bI$ の指数半群

$b>0$ とし、$B=bI\in\mathcal B(X)$ とします。

$$
S(z)=e^{-bz}I
$$

と置きます。指数関数は全関数なので、各 $x\in X$ に対して

$$
z\mapsto S(z)x
$$

は正則です。また

$$
S(z+w)=S(z)S(w)
$$

です。

$0<\theta'<\pi/2$ とし、$z=re^{i\varphi}\in\Sigma_{\theta'}$ とすると

$$
\operatorname{Re}z
=
r\cos\varphi
\ge
r\cos\theta'
>
0.
$$

したがって

$$
\|S(z)\|
=
e^{-b\operatorname{Re}z}
\le
1.
$$

さらに $z\to0$ なら $e^{-bz}\to1$ なので

$$
S(z)x\to x.
$$

よって $S$ は任意の角度 $\theta<\pi/2$ で bounded analytic $C_0$ 半群です。
<!-- definition-example-end -->

---

## 3. sectorial operator は resolvent を扇形で制御する

analytic semigroup を生成する作用素側の条件が **sectoriality** です。

正の作用素 $B$ を考えると、熱方程式の典型ではスペクトルは正の実軸側に並びます。

$0\le\omega<\pi$ とし、

$$
\overline{\Sigma_\omega}
=
\left\{
\lambda\ne0:
|\arg\lambda|\le\omega
\right\}
\cup\{0\}
$$

と書きます。

<a id="def-evol5-sectorial-operator"></a>
<!-- formal-statement-start -->
### 定義（sectorial operator）

$X$ を複素 Banach 空間とし、

$$
B:D(B)\subset X\to X
$$

を稠密定義閉線形作用素とする。

ある $0\le\omega<\pi$ が存在して、

$$
\sigma(B)\subset\overline{\Sigma_\omega}
$$

かつ、任意の $\phi\in(\omega,\pi)$ に対して定数 $M_\phi>0$ が存在し、

$$
\|(\lambda I-B)^{-1}\|
\le
\frac{M_\phi}{|\lambda|}
$$

がすべての

$$
\lambda\notin\overline{\Sigma_\phi}
$$

で成り立つとき、$B$ を角度 $\omega$ の **sectorial operator** という。
<!-- formal-statement-end -->

この評価は

$$
\|\lambda(\lambda I-B)^{-1}\|
\le
M_\phi
$$

と同値です。

EVOL2 の Hille--Yosida では正の実軸上の resolvent を見ました。sectoriality では、それを複素平面の sector の外側まで広げて制御します。

<!-- definition-example-start: def-evol5-sectorial-operator -->
### **定義の確認**：$\ell^2$ 上の正の対角作用素

$X=\ell^2(\mathbb N)$ とし、

$$
D(B)
=
\left\{
x=(x_n):
\sum_{n=1}^{\infty}n^4|x_n|^2<\infty
\right\},
$$

$$
Bx=(n^2x_n)_{n\ge1}
$$

とします。

スペクトルは

$$
\sigma(B)=\{1,4,9,\dots\}
$$

なので正の実軸上にあります。

$\phi\in(0,\pi)$ を固定し、

$$
\lambda\notin\overline{\Sigma_\phi}
$$

とします。幾何学的に、$\lambda$ と任意の $r\ge0$ の距離は

$$
|\lambda-r|
\ge
c_\phi\bigl(|\lambda|+r\bigr)
$$

を満たす定数 $c_\phi>0$ で下から評価できます。

したがって

$$
\left|
\frac{\lambda}{\lambda-n^2}
\right|
\le
\frac{1}{c_\phi}
$$

です。

対角作用素の作用素ノルムは対角係数の上限なので、

$$
\|\lambda(\lambda I-B)^{-1}\|
=
\sup_{n\ge1}
\left|
\frac{\lambda}{\lambda-n^2}
\right|
\le
\frac1{c_\phi}.
$$

よって $B$ は角度 $0$ の sectorial operator です。
<!-- definition-example-end -->

---

## 4. sectoriality と analytic semigroup は表裏一体

sectorial angle が $\pi/2$ より小さいことは、$-B$ が analytic semigroup を生成する条件になります。

<a id="thm-evol5-sectorial-generation"></a>
<!-- formal-statement-start -->
### 定理（sectorial operator と analytic semigroup の生成対応）

$X$ を複素 Banach 空間とし、

$$
B:D(B)\subset X\to X
$$

を稠密定義閉作用素とする。

$B$ がある角度

$$
0\le\omega<\frac{\pi}{2}
$$

の sectorial operator なら、$-B$ は bounded analytic $C_0$ 半群

$$
(S(t))_{t\ge0}
$$

を生成する。

逆に、$-B$ が bounded analytic $C_0$ 半群を生成するなら、適切な $\omega<\pi/2$ に対して $B$ は sectorial operator である。
<!-- formal-statement-end -->

### 証明の見取り図

核心は resolvent の積分表示です。

sectoriality があると、正の実軸を囲む contour $\Gamma$ を spectrum の外側に取り、

$$
S(z)
=
\frac{1}{2\pi i}
\int_\Gamma
e^{-z\lambda}
(\lambda I-B)^{-1}\,d\lambda
$$

で半群を構成できます。

$\Gamma$ 上では

$$
\|(\lambda I-B)^{-1}\|
\lesssim
|\lambda|^{-1}
$$

であり、$z$ を適切な sector に取ると

$$
e^{-z\lambda}
$$

が指数減衰するので積分が収束します。

逆向きでは analytic semigroup を Laplace 変換し、複素方向へ積分路を回転させることで sector 外の resolvent 評価を得ます。

<!-- proof-start -->
### 証明

ここでは構成の主要評価を確認します。完全な contour deformation の細部は複素解析の積分論を用います。

$B$ を角度 $\omega<\pi/2$ の sectorial operator とし、

$$
\omega<\psi<\frac{\pi}{2}
$$

を固定します。

$\Gamma$ を二本の半直線

$$
\lambda=re^{i\psi},
\qquad
\lambda=re^{-i\psi},
\qquad
r>0
$$

からなる向き付き contour とします。

sectorial resolvent estimate により

$$
\|(\lambda I-B)^{-1}\|
\le
\frac{C_\psi}{|\lambda|}
=
\frac{C_\psi}{r}.
$$

$z$ を十分小さい角度の sector に取れば、ある $c>0$ が存在して両方の半直線上で

$$
\operatorname{Re}(z\lambda)
\ge
c|z|r
$$

となります。従って

$$
|e^{-z\lambda}|
\le
e^{-c|z|r}.
$$

原点近くでは contour を小円でつないで極限を取り、無限遠では上の指数減衰を使うことで

$$
S(z)
=
\frac{1}{2\pi i}
\int_\Gamma
e^{-z\lambda}
(\lambda I-B)^{-1}\,d\lambda
$$

が定義できます。

積分核は $z$ について正則なので $S(z)$ も正則です。[レゾルベント恒等式](../FA5/index.md#thm-fa5-resolvent-identity)を用いて積分を二重化すると半群則

$$
S(z+w)=S(z)S(w)
$$

が得られます。

また resolvent の $|\lambda|^{-1}$ 評価と指数減衰から、狭い sector 上で

$$
\sup_z\|S(z)\|<\infty
$$

が従います。

最後に contour 表示から $z\downarrow0$ の強収束を確認すると、$-B$ が $S(t)$ の生成作用素になります。

逆向きは EVOL2 の resolvent Laplace 表示

$$
(\lambda I+B)^{-1}x
=
\int_0^\infty
e^{-\lambda t}S(t)x\,dt
$$

を複素時間 sector 内で回転させます。analyticity により積分路を

$$
t=re^{i\eta}
$$

へ回せるため、正の実軸だけでなく sector の外側まで resolvent を延長でき、

$$
\|\lambda(\lambda I-B)^{-1}\|
\le C
$$

を得ます。従って $B$ は角度 $\pi/2$ 未満の sectorial operator です。$\square$
<!-- proof-end -->

この定理で重要なのは、単なる生成性より情報が増えていることです。

$$
C_0\text{ 半群}
\quad\text{は時間連続性、}
$$

$$
analytic\text{ 半群}
\quad\text{は正の時刻での微分可能性}
$$

まで持ちます。

---

## 5. Cauchy の積分公式が $t^{-1}$ を生む

$S(z)$ が analytic なら、固定した $t>0$ の近くで Cauchy の積分公式を使えます。

$t$ を中心とする半径 $\rho t$ の円を analytic sector の内部に入るよう、$0<\rho<1$ を固定します。

すると

$$
S'(t)
=
\frac{1}{2\pi i}
\int_{|\zeta-t|=\rho t}
\frac{S(\zeta)}{(\zeta-t)^2}\,d\zeta.
$$

狭い sector 上で

$$
\|S(\zeta)\|\le M
$$

とします。

円周長は

$$
2\pi\rho t
$$

であり、分母は

$$
|\zeta-t|^2
=
\rho^2t^2
$$

です。従って

$$
\begin{aligned}
\|S'(t)\|
&\le
\frac1{2\pi}
(2\pi\rho t)
\frac{M}{\rho^2t^2}
\\
&=
\frac{M}{\rho t}.
\end{aligned}
$$

一方、$-B$ が生成作用素なので

$$
S'(t)x=-BS(t)x
$$

です。よって

$$
\|BS(t)\|
\le
\frac{C}{t}.
$$

ここで $t^{-1}$ は偶然ではありません。半径を $t$ に比例させた Cauchy 積分公式が一回の微分ごとに $t^{-1}$ を生みます。

---

## 6. 一回の smoothing を反復すると任意の整数階へ進める

<a id="thm-evol5-integer-smoothing"></a>
<!-- formal-statement-start -->
### 定理（analytic semigroup の整数階 smoothing）

$B$ を角度 $\pi/2$ 未満の sectorial operator とし、$-B$ が生成する bounded analytic $C_0$ 半群を $S(t)$ とする。

任意の整数 $m\ge1$ と $t>0$ に対して

$$
S(t)X\subset D(B^m)
$$

であり、定数 $C_m>0$ が存在して

$$
\|B^mS(t)\|
\le
C_m t^{-m}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

半群則を

$$
S(t)
=
S(t/m)^m
$$

と分解し、それぞれの因子に一回の smoothing

$$
\|BS(t/m)\|
\lesssim
\frac{m}{t}
$$

を使います。

<!-- proof-start -->
### 証明

まず $m=1$ は [Cauchy の積分公式](../CA3/index.md#thm-ca3-cauchy-integral-formula)を前節の議論へ適用した評価から

$$
\|BS(t)\|
\le
C_1t^{-1}
$$

です。

一般の $m$ について

$$
S(t)
=
S(t/m)^m
$$

と書きます。

analytic semigroup では $S(s)X\subset D(B)$ かつ

$$
BS(s)=S(s)B
$$

が $D(B)$ 上で成り立つため、正の時刻では各因子を順に作用させて

$$
B^mS(t)
=
\bigl(BS(t/m)\bigr)^m
$$

と読めます。

従って

$$
\begin{aligned}
\|B^mS(t)\|
&\le
\|BS(t/m)\|^m
\\
&\le
\left(
C_1\frac{m}{t}
\right)^m.
\end{aligned}
$$

したがって

$$
C_m=(C_1m)^m
$$

と取れば

$$
\|B^mS(t)\|
\le
C_mt^{-m}.
$$

右辺が有限なので、任意の $x\in X$ に対して $B^mS(t)x$ が定義されます。従って

$$
S(t)X\subset D(B^m).
$$

これで主張が示されました。$\square$
<!-- proof-end -->

この定理は

$$
x\in X
$$

しか仮定していないのに、任意の $t>0$ で

$$
S(t)x\in D(B^m)
$$

になることを言っています。

つまり

$$
\boxed{
\text{正の時間が作用素微分を買う}
}
$$

わけです。

---

## 7. $t^{-m}$ の発散は欠点ではなく初期層の記録

smoothing estimate は

$$
\|B^mS(t)\|
\le
C_mt^{-m}
$$

なので、$t\downarrow0$ で右辺は発散します。

これは analytic semigroup の弱点ではありません。

もし初期値 $x$ がもともと $D(B^m)$ に入っていなければ、

$$
B^mS(t)x
$$

が $t=0$ まで有界に延びることを期待してはいけません。

正の時刻で急に正則化する代わりに、その正則性ノルムは初期時刻近くで大きくなります。

逆に $x\in D(B^m)$ なら半群と $B^m$ を交換して

$$
B^mS(t)x
=
S(t)B^mx
$$

なので boundedness から

$$
\|B^mS(t)x\|
\le
M\|B^mx\|
$$

となり、$t^{-m}$ の粗い評価を使う必要はありません。

---

## 8. 対角熱半群なら fractional smoothing を手で計算できる

一般の sectorial operator に対する fractional power $B^\alpha$ の構成には functional calculus が必要です。本章では完全理論を構築せず、まず対角作用素で意味を直接見ます。

$X=\ell^2(\mathbb N)$ とし、

$$
(Bx)_n=n^2x_n.
$$

任意の $\alpha\ge0$ に対して

$$
(B^\alpha x)_n
=
n^{2\alpha}x_n
$$

と定めます。

対応する熱半群は

$$
(S(t)x)_n
=
e^{-n^2t}x_n.
$$

<a id="prop-evol5-diagonal-fractional-smoothing"></a>
<!-- formal-statement-start -->
### 命題（対角熱半群の fractional smoothing）

上の $B$ と $S(t)$ に対し、任意の $\alpha\ge0$ と $t>0$ について

$$
\|B^\alpha S(t)\|
\le
C_\alpha t^{-\alpha}
$$

が成り立つ。

$\alpha>0$ なら

$$
C_\alpha
=
\left(\frac{\alpha}{e}\right)^\alpha
$$

と取れる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

対角作用素なので

$$
\|B^\alpha S(t)\|
=
\sup_{n\ge1}
n^{2\alpha}e^{-n^2t}.
$$

$r=n^2$ と見て、連続変数 $r\ge0$ 上の関数

$$
g(r)=r^\alpha e^{-rt}
$$

を考えます。

$\alpha>0$ のとき

$$
g'(r)
=
r^{\alpha-1}e^{-rt}(\alpha-rt).
$$

従って最大点は

$$
r=\frac{\alpha}{t}
$$

です。

そこへ代入すると

$$
g(r)
=
\left(\frac{\alpha}{t}\right)^\alpha
e^{-\alpha}
=
\left(\frac{\alpha}{e}\right)^\alpha
t^{-\alpha}.
$$

離散集合 $r=n^2$ 上の上限は連続変数上の上限以下なので

$$
\|B^\alpha S(t)\|
\le
\left(\frac{\alpha}{e}\right)^\alpha
t^{-\alpha}.
$$

$\alpha=0$ では $\|S(t)\|\le1$ です。$\square$
<!-- proof-end -->

整数階の $t^{-m}$ が、そのまま非整数階の

$$
t^{-\alpha}
$$

へつながっています。

一般の sectorial operator でも適切に $B^\alpha$ を定義すると同型の評価が得られます。完全な fractional functional calculus は本系列の完成条件には含めません。

---

## 9. Dirichlet heat semigroup では高周波減衰が smoothing そのもの

EVOL3 で扱った [Dirichlet Laplacian](../EVOL3/index.md#prop-evol3-dirichlet-laplacian) を使います。

$L^2(0,\pi)$ の正規直交基底

$$
e_n(x)
=
\sqrt{\frac2\pi}\sin(nx)
$$

に対し、正作用素 $B=-\Delta_D$ は

$$
Be_n=n^2e_n
$$

です。

初期値

$$
u_0
=
\sum_{n=1}^{\infty}a_ne_n
$$

に対する heat semigroup は

$$
S(t)u_0
=
\sum_{n=1}^{\infty}
e^{-n^2t}a_ne_n.
$$

ここで $m\ge1$ なら

$$
B^mS(t)u_0
=
\sum_{n=1}^{\infty}
n^{2m}e^{-n^2t}a_ne_n.
$$

従って [Parseval の等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-parseval-identity)から

$$
\begin{aligned}
\|B^mS(t)u_0\|_2^2
&=
\sum_{n=1}^{\infty}
n^{4m}e^{-2n^2t}|a_n|^2
\\
&\le
\left(
\sup_{n\ge1}
n^{2m}e^{-n^2t}
\right)^2
\sum_{n=1}^{\infty}|a_n|^2.
\end{aligned}
$$

前節と同じ最大化により

$$
\sup_{n\ge1}
n^{2m}e^{-n^2t}
\le
C_mt^{-m}.
$$

よって

$$
\|B^mS(t)u_0\|_2
\le
C_mt^{-m}\|u_0\|_2.
$$

初期値に微分可能性を仮定していないのに、$t>0$ では任意の $m$ について $B^mS(t)u_0$ が意味を持ちます。

これが放物型 regularization の作用素論的な姿です。

---

## 10. EVOL4 の mild 解に smoothing を入れる

次に外力付き問題

$$
u'(t)+Bu(t)=f(t),
\qquad
u(0)=u_0
$$

を考えます。

EVOL4 の符号規約に直すと生成作用素は $A=-B$ であり、mild 解は

$$
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)f(s)\,ds
$$

です。

初期値項には

$$
\|BS(t)u_0\|
\le
Ct^{-1}\|u_0\|
$$

が使えます。

外力項へ形式的に $B$ を作用させると

$$
B
\int_0^tS(t-s)f(s)\,ds
=
\int_0^t
BS(t-s)f(s)\,ds.
$$

しかし

$$
\|BS(t-s)\|
\lesssim
(t-s)^{-1}
$$

なので、右端 $s=t$ で積分核が非可積分になります。

これは重要な警告です。

analytic smoothing があるだけで、任意の連続外力に対して自動的に

$$
Bu\in L^p
$$

などの最適正則性が出るわけではありません。

外力の時間正則性、差分の打ち消し、

$$
f(s)-f(t),
$$

あるいは maximal regularity の追加理論が必要になります。

本章ではここを越えません。

---

## 11. 「半群が analytic」だけで PDE の全てが解けるわけではない

analytic semigroup が与えるのは、主に線形放物型部分の smoothing です。

たとえば半線形問題

$$
u'(t)+Bu(t)=F(u(t))
$$

では

$$
u(t)
=
S(t)u_0
+
\int_0^t
S(t-s)F(u(s))\,ds
$$

となります。

ここから局所解を作るには、

$$
F
$$

の局所 Lipschitz 性と、どの Banach 空間で Duhamel map を縮小写像にするかを別途決めなければなりません。

EVOL6 では

$$
\text{linear smoothing}
+
\text{nonlinear Duhamel map}
+
\text{Banach fixed point}
$$

を組み合わせます。

Navier--Stokes ではさらに、非線形項の bilinear estimate や divergence-free 構造が必要です。analytic semigroup 一般論だけで三次元正則性問題が解けるわけではありません。

---

## 12. まとめ

本章で得た構造は

$$
\text{sectorial resolvent}
\to
\text{analytic semigroup}
\to
\text{Cauchy estimate}
\to
\|B^mS(t)\|
\lesssim
t^{-m}
\to
\text{parabolic smoothing}
$$

です。

特に覚えるべき違いは、

$$
C_0\text{ 半群}
\quad\Rightarrow\quad
\text{連続な時間発展},
$$

に対して

$$
analytic\text{ 半群}
\quad\Rightarrow\quad
\text{正の時刻で作用素方向に滑らか}
$$

という点です。

次章ではこの smoothing を非線形 Duhamel map の評価へ投入し、局所解・最大存在時間・continuation criterion へ進みます。

---

# 演習

## Level A

### A1. 有界スカラー半群の analytic extension

$X=\mathbb C$、$b>0$ とし、

$$
S(t)z=e^{-bt}z
$$

とする。$S(z)=e^{-bz}$ が任意の $\theta<\pi/2$ で bounded analytic semigroup になることを確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$z=re^{i\varphi}$、$|\varphi|<\theta<\pi/2$ とします。

すると

$$
\operatorname{Re}z
=
r\cos\varphi
\ge
r\cos\theta
>
0.
$$

従って

$$
|e^{-bz}|
=
e^{-b\operatorname{Re}z}
\le
1.
$$

よって

$$
\sup_{z\in\Sigma_\theta}|S(z)|
\le1.
$$

指数関数は全関数なので正則性があり、

$$
S(z+w)=e^{-b(z+w)}=S(z)S(w)
$$

です。

さらに $z\to0$ なら

$$
e^{-bz}\to1.
$$

したがって定義の四条件を満たします。
<!-- solution-end -->

### A2. 対角作用素の sectorial resolvent

$B$ を

$$
(Bx)_n=n^2x_n
$$

で定める。$\lambda\notin[0,\infty)$ のとき

$$
(\lambda I-B)^{-1}x
=
\left(
\frac{x_n}{\lambda-n^2}
\right)_{n\ge1}
$$

を確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$y=(\lambda I-B)^{-1}x$ と仮定すると、成分ごとに

$$
(\lambda-n^2)y_n=x_n
$$

です。

$\lambda\notin[0,\infty)$ なので特に

$$
\lambda\ne n^2
$$

であり、

$$
y_n
=
\frac{x_n}{\lambda-n^2}.
$$

逆にこの $y$ を取れば

$$
((\lambda I-B)y)_n
=
(\lambda-n^2)
\frac{x_n}{\lambda-n^2}
=
x_n.
$$

よって表示が確認できました。
<!-- solution-end -->

### A3. 一回の smoothing の最大化

$t>0$ に対して

$$
\sup_{r\ge0}re^{-rt}
$$

を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$$
g(r)=re^{-rt}
$$

と置きます。

$$
g'(r)=e^{-rt}(1-rt)
$$

なので導関数が $0$ になる点は

$$
r=\frac1t.
$$

$r<1/t$ では増加し、$r>1/t$ では減少するため最大点です。

したがって

$$
\sup_{r\ge0}re^{-rt}
=
\frac1t e^{-1}
=
\frac1{et}.
$$

これは $\|BS(t)\|\lesssim t^{-1}$ の対角モデルです。
<!-- solution-end -->

### A4. 初期値が $D(B)$ にあるとき

bounded analytic semigroup $S(t)$ と sectorial operator $B$ を考える。$x\in D(B)$ なら

$$
BS(t)x=S(t)Bx
$$

を用いて、$t\downarrow0$ でも $BS(t)x$ が有界であることを示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$x\in D(B)$ なので $Bx\in X$ です。

半群と生成作用素の交換関係から

$$
BS(t)x=S(t)Bx.
$$

bounded analytic semigroup は正の実軸上でも一様有界なので、ある $M>0$ があって

$$
\|S(t)\|\le M
$$

です。

従って

$$
\|BS(t)x\|
=
\|S(t)Bx\|
\le
M\|Bx\|.
$$

右辺は $t$ に依存しません。

粗い初期値に対する

$$
Ct^{-1}\|x\|
$$

という評価は一般の $x\in X$ へ拡張するための代償であり、$x\in D(B)$ なら初期時刻での発散は避けられます。
<!-- solution-end -->

### A5. 半群則による整数階評価

$$
\|BS(s)\|\le Cs^{-1}
$$

がすべての $s>0$ で成り立つとする。半群則を使って

$$
\|B^2S(t)\|
\le
4C^2t^{-2}
$$

を示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

半群則から

$$
S(t)=S(t/2)S(t/2).
$$

正の時刻では作用素と半群を交換できるので

$$
B^2S(t)
=
BS(t/2)\,BS(t/2).
$$

従って

$$
\begin{aligned}
\|B^2S(t)\|
&\le
\|BS(t/2)\|^2
\\
&\le
\left(
\frac{C}{t/2}
\right)^2
\\
&=
4C^2t^{-2}.
\end{aligned}
$$
<!-- solution-end -->

## Level B

### B1. fractional smoothing の最大化

$\alpha>0$ とする。

$$
\sup_{r\ge0}r^\alpha e^{-rt}
$$

を求め、$t^{-\alpha}$ が出ることを示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$$
g(r)=r^\alpha e^{-rt}
$$

とします。

$r>0$ で

$$
g'(r)
=
r^{\alpha-1}e^{-rt}(\alpha-rt).
$$

従って最大点は

$$
r=\frac{\alpha}{t}.
$$

代入すると

$$
\begin{aligned}
g\left(\frac{\alpha}{t}\right)
&=
\left(\frac{\alpha}{t}\right)^\alpha
e^{-\alpha}
\\
&=
\left(\frac{\alpha}{e}\right)^\alpha
t^{-\alpha}.
\end{aligned}
$$

よって

$$
\sup_{r\ge0}r^\alpha e^{-rt}
=
\left(\frac{\alpha}{e}\right)^\alpha
t^{-\alpha}.
$$

非整数階でも、微分階数に対応する指数だけ $t$ の特異性が増えることが分かります。
<!-- solution-end -->

### B2. $L^2$ 初期値の即時 regularization

Dirichlet heat semigroup

$$
S(t)u_0
=
\sum_{n\ge1}e^{-n^2t}a_ne_n
$$

を考える。$u_0\in L^2(0,\pi)$ だけを仮定して、任意の $t>0$ で $S(t)u_0\in D(B)$ を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$u_0\in L^2$ なので [Parseval の等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-parseval-identity)から

$$
\sum_{n=1}^{\infty}|a_n|^2<\infty.
$$

$D(B)$ に入るには

$$
\sum_{n=1}^{\infty}
n^4
|e^{-n^2t}a_n|^2
<\infty
$$

を示せばよいです。

本文の $\alpha=1$ の評価から

$$
n^2e^{-n^2t}
\le
\frac1{et}.
$$

従って

$$
n^4e^{-2n^2t}
\le
\frac1{e^2t^2}.
$$

よって

$$
\begin{aligned}
\sum_{n=1}^{\infty}
n^4e^{-2n^2t}|a_n|^2
&\le
\frac1{e^2t^2}
\sum_{n=1}^{\infty}|a_n|^2
\\
&<
\infty.
\end{aligned}
$$

したがって

$$
S(t)u_0\in D(B).
$$
<!-- solution-end -->

### B3. mild 解の初期値項だけを正則化する

$$
u(t)
=
S(t)u_0
+
\int_0^tS(t-s)f(s)\,ds
$$

とする。$u_0\in X$ に対して初期値項には

$$
\|BS(t)u_0\|
\le
Ct^{-1}\|u_0\|
$$

が使える一方、外力項へ同じ評価を直接入れると問題が起きることを示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

初期値項は直接

$$
\|BS(t)u_0\|
\le
\|BS(t)\|\|u_0\|
\le
Ct^{-1}\|u_0\|
$$

です。

一方、外力項へ形式的に $B$ を入れると

$$
\left\|
\int_0^tBS(t-s)f(s)\,ds
\right\|
\le
\int_0^t
C(t-s)^{-1}\|f(s)\|\,ds.
$$

$f$ が単に連続で

$$
f(t)\ne0
$$

なら、$s=t$ 近くで $\|f(s)\|$ は正の定数程度です。

しかし

$$
\int_{t-\varepsilon}^t
(t-s)^{-1}\,ds
=
\infty.
$$

従って smoothing estimate をそのまま積分へ入れるだけでは $Bu(t)$ の存在を示せません。

外力の追加正則性や差分による cancellation、maximal regularity などが必要です。
<!-- solution-end -->

### B4. translation semigroup が熱半群のように smoothing しない理由

$X=L^2(\mathbb R)$ 上の translation semigroup

$$
(T(t)f)(x)=f(x+t)
$$

を考える。これは $C_0$ 半群だが、一般の $f\in L^2$ を正の時刻で自動的に $H^1$ へ送らないことを説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

translation は関数の形を変えず、位置だけを移動します。

弱微分可能性も同様に平行移動するだけなので、

$$
f\in H^1(\mathbb R)
$$

なら $T(t)f\in H^1$ ですが、逆に

$$
f\notin H^1(\mathbb R)
$$

なら平行移動しても微分可能性は新しく生まれません。

Fourier 変換で見ると translation は

$$
\widehat{T(t)f}(\xi)
=
e^{it\xi}\hat f(\xi)
$$

です。

乗数の絶対値は

$$
|e^{it\xi}|=1
$$

なので高周波を減衰させません。

熱半群の

$$
e^{-t\xi^2}
$$

とは対照的です。

従って $C_0$ 性だけでは smoothing は出ず、analytic semigroup の放物型構造が追加で必要だと分かります。
<!-- solution-end -->

## Level C

### C1. analytic smoothing と半線形問題の時間重み

$0<\alpha<1$ とし、sectorial operator $B$ の analytic semigroup が

$$
\|B^\alpha S(t)\|
\le
Ct^{-\alpha}
$$

を満たすとする。

半線形 mild 方程式

$$
u(t)
=
S(t)u_0
+
\int_0^tS(t-s)F(u(s))\,ds
$$

を考える。$F(u(s))$ が $X$ で一様に有界、

$$
\|F(u(s))\|\le M
$$

であると仮定する。

(1) 初期値項について $t^\alpha\|B^\alpha S(t)u_0\|$ を評価せよ。  
(2) Duhamel 項について

$$
t^\alpha
\left\|
B^\alpha
\int_0^t
S(t-s)F(u(s))\,ds
\right\|
$$

を評価せよ。  
(3) なぜ $\alpha<1$ がこの単純評価で重要か説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

まず初期値項は

$$
\|B^\alpha S(t)u_0\|
\le
Ct^{-\alpha}\|u_0\|.
$$

両辺へ $t^\alpha$ を掛けて

$$
t^\alpha
\|B^\alpha S(t)u_0\|
\le
C\|u_0\|.
$$

これで (1) が得られます。

次に Duhamel 項を考えます。

smoothing estimate と $\|F(u(s))\|\le M$ から

$$
\begin{aligned}
\left\|
B^\alpha
\int_0^t
S(t-s)F(u(s))\,ds
\right\|
&\le
\int_0^t
\|B^\alpha S(t-s)\|
\|F(u(s))\|\,ds
\\
&\le
CM
\int_0^t
(t-s)^{-\alpha}\,ds.
\end{aligned}
$$

$0<\alpha<1$ なので

$$
\int_0^t
(t-s)^{-\alpha}\,ds
=
\int_0^t
r^{-\alpha}\,dr
=
\frac{t^{1-\alpha}}{1-\alpha}.
$$

従って

$$
\left\|
B^\alpha
\int_0^t
S(t-s)F(u(s))\,ds
\right\|
\le
\frac{CM}{1-\alpha}
t^{1-\alpha}.
$$

両辺へ $t^\alpha$ を掛けると

$$
t^\alpha
\left\|
B^\alpha
\int_0^t
S(t-s)F(u(s))\,ds
\right\|
\le
\frac{CM}{1-\alpha}t.
$$

これで (2) です。

(3) では積分核

$$
(t-s)^{-\alpha}
$$

の $s=t$ 近くの可積分性が本質です。

$$
\int_0^t(t-s)^{-\alpha}\,ds<\infty
$$

となるのは

$$
\alpha<1
$$

のときです。

$\alpha=1$ では

$$
\int_0^t(t-s)^{-1}\,ds
$$

が発散し、B3 で見た問題が再び現れます。

したがって fractional smoothing は、完全な一階作用素 $B$ をいきなり要求するより、非線形 Duhamel 項を閉じやすい中間正則性を与えます。

EVOL6 ではこの型の時間特異性を、局所解を得る反復の時間幅と組み合わせます。
<!-- solution-end -->
