# VC2 曲線・線積分・保存場

VC1 では vector field の局所微分を調べました。本章では field を **曲線に沿って積分**し、仕事・循環・potential を結びます。

中心となる問いは

$$
\nabla\phi=F
$$

と書けることと、

$$
\int_\gamma F\cdot dr
$$

が経路に依らないことが、なぜ同じ現象なのかです。

---

## 1. パラメータ表示された曲線

<a id="def-vc2-regular-curve"></a>

<!-- formal-statement-start -->
> **定義（正則曲線）**  
> 区間 $[a,b]$ 上の $C^1$ 写像
>
> $$
> \gamma:[a,b]\to\mathbb R^n
> $$
>
> をパラメータ表示された曲線とする。すべての $t\in[a,b]$ で
>
> $$
> \gamma'(t)\neq0
> $$
>
> なら $\gamma$ を正則曲線と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc2-regular-curve -->
**定義の確認**

$$
\gamma(t)=(\cos t,\sin t),
\qquad 0\le t\le2\pi
$$

では

$$
\gamma'(t)=(-\sin t,\cos t)
$$

で、常に長さ 1 です。従って単位円の正則なパラメータ表示です。
<!-- definition-example-end -->

同じ幾何学的曲線でもパラメータの進み方は変えられます。$C^1$ 級の単調増加全単射

$$
\varphi:[c,d]\to[a,b]
$$

に対し

$$
\widetilde\gamma(s)=\gamma(\varphi(s))
$$

とすれば、向きを保った再パラメータ表示です。$\varphi$ が単調減少なら向きは反転します。

<a id="def-vc2-arclength"></a>

<!-- formal-statement-start -->
> **定義（弧長と単位接ベクトル）**  
> 正則曲線 $\gamma:[a,b]\to\mathbb R^n$ の弧長を
>
> $$
> L(\gamma)
> =
> \int_a^b|\gamma'(t)|\,dt
> $$
>
> と定義する。単位接ベクトルは
>
> $$
> T(t)=\frac{\gamma'(t)}{|\gamma'(t)|}
> $$
>
> とする。
<!-- formal-statement-end -->

向きを保つ再パラメータ表示では、1 変数の変数変換により弧長は変わりません。

---

## 2. scalar field の線積分

<a id="def-vc2-scalar-line-integral"></a>

<!-- formal-statement-start -->
> **定義（scalar line integral）**  
> scalar field $f$ と正則曲線 $\gamma:[a,b]\to\Omega$ に対し
>
> $$
> \int_\gamma f\,ds
> :=
> \int_a^b f(\gamma(t))|\gamma'(t)|\,dt
> $$
>
> と定義する。
<!-- formal-statement-end -->

これは曲線に沿った「密度 × 長さ」の総和です。向きを反転しても $ds$ は正なので値は変わりません。

例えば単位円上で $f(x,y)=x^2$ を積分すると

$$
\int_\gamma f\,ds
=
\int_0^{2\pi}\cos^2t\,dt
=
\pi.
$$

---

## 3. vector field の線積分：仕事と循環

<a id="def-vc2-vector-line-integral"></a>

<!-- formal-statement-start -->
> **定義（vector line integral）**  
> $F:\Omega\to\mathbb R^n$ を連続 vector field、$\gamma:[a,b]\to\Omega$ を区分的 $C^1$ 曲線とする。
>
> $$
> \int_\gamma F\cdot dr
> :=
> \int_a^b
> F(\gamma(t))\cdot\gamma'(t)\,dt
> $$
>
> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vc2-vector-line-integral -->
**定義の確認**

$$
F(x,y)=(-y,x),
\qquad
\gamma(t)=(\cos t,\sin t),
\quad 0\le t\le2\pi
$$

なら

$$
F(\gamma(t))=(-\sin t,\cos t)=\gamma'(t)
$$

なので

$$
\int_\gamma F\cdot dr
=
\int_0^{2\pi}1\,dt
=
2\pi.
$$

回転場に沿って一周すると正の循環が現れます。
<!-- definition-example-end -->

向きを保つ再パラメータ表示では値は不変です。向きを反転すれば $\gamma'$ の符号が反転するので、vector line integral の符号も反転します。

---

## 4. gradient field では積分が端点だけで決まる

<a id="thm-vc2-line-ftc"></a>

<!-- formal-statement-start -->
> **定理（線積分の基本定理）**  
> $\Omega\subset\mathbb R^n$ を開集合、$\phi\in C^1(\Omega)$ とする。区分的 $C^1$ 曲線 $\gamma:[a,b]\to\Omega$ に対し
>
> $$
> \boxed{
> \int_\gamma\nabla\phi\cdot dr
> =
> \phi(\gamma(b))-\phi(\gamma(a))
> }
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\phi(\gamma(t))$ を 1 変数関数として微分すれば、連鎖律で integrand がそのまま出ます。

<!-- proof-start -->
### 証明

連鎖律から

$$
\frac{d}{dt}\phi(\gamma(t))
=
\nabla\phi(\gamma(t))\cdot\gamma'(t).
$$

従って [RA4 の微積分学の基本定理](../RA4/index.md#thm-ra4-ftc2) より

$$
\begin{aligned}
\int_\gamma\nabla\phi\cdot dr
&=
\int_a^b
\nabla\phi(\gamma(t))\cdot\gamma'(t)\,dt\\
&=
\int_a^b
\frac{d}{dt}\phi(\gamma(t))\,dt\\
&=
\phi(\gamma(b))-\phi(\gamma(a)).
\end{aligned}
$$
<!-- proof-end -->

閉曲線では始点と終点が同じなので

$$
\oint_\gamma\nabla\phi\cdot dr=0.
$$

---

## 5. 保存場と path independence

<a id="def-vc2-conservative"></a>

<!-- formal-statement-start -->
> **定義（保存場・potential）**  
> 開集合 $\Omega\subset\mathbb R^n$ 上の連続 vector field $F$ が、ある $\phi\in C^1(\Omega)$ により
>
> $$
> F=\nabla\phi
> $$
>
> と書けるとき、$F$ を保存場、$\phi$ を $F$ の scalar potential と呼ぶ。
<!-- formal-statement-end -->

<a id="def-vc2-path-independent"></a>

<!-- formal-statement-start -->
> **定義（経路独立）**  
> path-connected な $\Omega$ 上の vector field $F$ について、同じ始点 $p$ と終点 $q$ を持つ任意の区分的 $C^1$ 曲線 $\gamma_1,\gamma_2$ に対し
>
> $$
> \int_{\gamma_1}F\cdot dr
> =
> \int_{\gamma_2}F\cdot dr
> $$
>
> が成り立つとき、線積分は経路独立であるという。
<!-- formal-statement-end -->

<a id="thm-vc2-conservative-equivalence"></a>

<!-- formal-statement-start -->
> **定理（保存場・経路独立・閉曲線積分の同値）**  
> $\Omega$ を path-connected な開集合、$F$ を連続 vector field とする。次は同値である。
>
> 1. $F$ は保存場である。
> 2. $F$ の線積分は経路独立である。
> 3. 任意の閉じた区分的 $C^1$ 曲線 $\gamma$ について
>
> $$
> \oint_\gamma F\cdot dr=0.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

1 から 2 は線積分の基本定理です。2 から 3 は閉曲線を定数曲線と比較します。3 から 1 では基準点から $x$ までの線積分を potential の定義にして、短い線分を足したときの増分を計算します。

<!-- proof-start -->
### 証明

1 ⇒ 2 は [線積分の基本定理](#thm-vc2-line-ftc) から、積分値が

$$
\phi(q)-\phi(p)
$$

だけで決まるので従います。

2 ⇒ 3。閉曲線 $\gamma$ の始点・終点を $p$ とする。$p$ に留まる定数曲線の積分は 0 なので、経路独立性から

$$
\oint_\gamma F\cdot dr=0.
$$

3 ⇒ 2。同じ端点を持つ $\gamma_1,\gamma_2$ に対し、$\gamma_1$ の後に $\gamma_2$ を逆向きにたどる閉曲線を作ると

$$
0
=
\int_{\gamma_1}F\cdot dr
-
\int_{\gamma_2}F\cdot dr.
$$

従って積分値は一致します。

2 ⇒ 1。基準点 $p_0\in\Omega$ を固定し、

$$
\phi(x)
=
\int_{p_0}^{x}F\cdot dr
$$

と置きます。経路独立性により well-defined です。

$x\in\Omega$ を固定します。$\Omega$ は開なので、十分小さい $h$ に対し $x+he_j\in\Omega$ です。$p_0$ から $x$ までの曲線の後に線分

$$
s\mapsto x+se_j,\qquad 0\le s\le h
$$

を付けると

$$
\phi(x+he_j)-\phi(x)
=
\int_0^h F_j(x+se_j)\,ds.
$$

$h$ で割り、$h\to0$ とすると $F$ の連続性から

$$
\frac{\partial\phi}{\partial x_j}(x)
=
F_j(x).
$$

すべての $j$ で成立するので

$$
\nabla\phi=F.
$$
<!-- proof-end -->

---

## 6. curl が 0 なら保存場か：star-shaped では Yes

<a id="def-vc2-star-shaped"></a>

<!-- formal-statement-start -->
> **定義（star-shaped domain）**  
> 開集合 $\Omega\subset\mathbb R^n$ が点 $a\in\Omega$ に関して star-shaped であるとは、任意の $x\in\Omega$ と $0\le t\le1$ に対して
>
> $$
> a+t(x-a)\in\Omega
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

凸集合なら任意の点を中心として star-shaped です。

<a id="thm-vc2-poincare-star"></a>

<!-- formal-statement-start -->
> **定理（star-shaped domain 上の初等 Poincaré lemma）**  
> $\Omega\subset\mathbb R^3$ を $a$ に関して star-shaped とし、$F\in C^1(\Omega;\mathbb R^3)$ が
>
> $$
> \nabla\times F=0
> $$
>
> を満たすとする。このとき $F$ は保存場である。
<!-- formal-statement-end -->

### 証明の見取り図

中心 $a$ から $x$ へ伸びる直線だけを使って

$$
\phi(x)
=
\int_0^1F(a+t(x-a))\cdot(x-a)\,dt
$$

と potential を明示的に作ります。curl-free 条件は Jacobian の対称性

$$
\partial_iF_j=\partial_jF_i
$$

として働き、$\partial_i\phi=F_i$ を出します。

<!-- proof-start -->
### 証明

記号を簡単にするため $a=0$ とします。平行移動で一般の場合へ戻せます。

$$
\phi(x)
=
\int_0^1F(tx)\cdot x\,dt
=
\int_0^1\sum_{j=1}^3F_j(tx)x_j\,dt
$$

と定めます。

$F\in C^1$ なので積分記号下微分ができ、

$$
\frac{\partial\phi}{\partial x_i}
=
\int_0^1
\left(
F_i(tx)
+
t\sum_{j=1}^3
\frac{\partial F_j}{\partial x_i}(tx)x_j
\right)dt.
$$

curl-free より

$$
\frac{\partial F_j}{\partial x_i}
=
\frac{\partial F_i}{\partial x_j}.
$$

従って integrand は

$$
F_i(tx)
+
t\sum_j
\frac{\partial F_i}{\partial x_j}(tx)x_j
=
\frac{d}{dt}\left[tF_i(tx)\right].
$$

よって

$$
\frac{\partial\phi}{\partial x_i}
=
\int_0^1
\frac{d}{dt}\left[tF_i(tx)\right]dt
=
F_i(x).
$$

したがって

$$
\nabla\phi=F.
$$
<!-- proof-end -->

ここで star-shaped 仮定は、$a$ から $x$ への線分全体が $\Omega$ 内に残り、上の potential が定義できるために使われています。

---

## 7. 穴があると curl-free でも保存場とは限らない

$\mathbb R^2\setminus\{0\}$ 上で

$$
F(x,y)
=
\left(
-\frac{y}{x^2+y^2},
\frac{x}{x^2+y^2}
\right)
$$

を考えます。

原点以外では

$$
\frac{\partial F_2}{\partial x}
-
\frac{\partial F_1}{\partial y}
=
0.
$$

二次元の意味で curl-free です。

ところが単位円

$$
\gamma(t)=(\cos t,\sin t),
\qquad 0\le t\le2\pi
$$

では

$$
F(\gamma(t))=(-\sin t,\cos t)=\gamma'(t)
$$

なので

$$
\oint_\gamma F\cdot dr
=
2\pi.
$$

従って [保存場・経路独立・閉曲線積分の同値](#thm-vc2-conservative-equivalence) から保存場ではありません。

壊れたのは局所微分ではなく、**領域に原点という穴があり、閉曲線をそのまま一点へ縮める単純な幾何が使えないこと**です。

一般の simply connected domain で curl-free から保存場を導く議論は、VC5 の Stokes 定理を得てから閉じます。VC2 で後続定理を逆輸入しません。

---

## 8. simply connected の意味

本系列で simply connected は直感的に「領域内の任意の閉曲線を、領域の外へ出ずに一点へ連続的に縮められる」ことを表します。

- 円板・球は simply connected。
- 穴あき平面 $\mathbb R^2\setminus\{0\}$ は simply connected ではない。
- star-shaped ⇒ simply connected。

ただし一般位相空間の fundamental group はここでは導入しません。VC5 では古典 Stokes theorem の適用範囲の中で、この条件が potential existence をどう支えるかを扱います。

---

## 9. 演習

#### VC2-A01 円弧の弧長
- Level: A
- 目安時間: 12分

$$
\gamma(t)=(2\cos t,2\sin t),
\qquad 0\le t\le\frac{\pi}{2}
$$

の弧長を求めよ。

<!-- solution-start -->
### 詳細解答

$$
\gamma'(t)=(-2\sin t,2\cos t)
$$

なので

$$
|\gamma'(t)|=2.
$$

従って

$$
L
=
\int_0^{\pi/2}2\,dt
=
\boxed{\pi}.
$$
<!-- solution-end -->

#### VC2-A02 scalar line integral
- Level: A
- 目安時間: 12分

単位円 $\gamma(t)=(\cos t,\sin t)$, $0\le t\le2\pi$ 上で

$$
f(x,y)=1+x
$$

の $\int_\gamma f\,ds$ を求めよ。

<!-- solution-start -->
### 詳細解答

$|\gamma'(t)|=1$ なので

$$
\int_\gamma f\,ds
=
\int_0^{2\pi}(1+\cos t)\,dt
=
2\pi.
$$

従って

$$
\boxed{2\pi}.
$$
<!-- solution-end -->

#### VC2-A03 vector line integral と向き
- Level: A
- 目安時間: 15分

$$
F=(-y,x)
$$

を単位円に沿って反時計回り、時計回りに一周した線積分をそれぞれ求めよ。

<!-- solution-start -->
### 詳細解答

反時計回りでは

$$
\gamma(t)=(\cos t,\sin t),
\qquad
\gamma'(t)=(-\sin t,\cos t)
$$

なので $F(\gamma(t))=\gamma'(t)$ です。

$$
\int_\gamma F\cdot dr
=
\int_0^{2\pi}1\,dt
=
2\pi.
$$

向きを反転すると vector line integral は符号を変えるので、時計回りでは

$$
-2\pi.
$$

従って答えは

$$
\boxed{2\pi,\ -2\pi}.
$$
<!-- solution-end -->

#### VC2-A04 potential から積分を求める
- Level: A
- 目安時間: 12分

$$
\phi(x,y,z)=x^2+y^2+z^2,
\qquad
F=\nabla\phi
$$

とする。$(1,0,0)$ から $(2,1,2)$ までの任意の区分的 $C^1$ 曲線に沿う $\int F\cdot dr$ を求めよ。

<!-- solution-start -->
### 詳細解答

[線積分の基本定理](#thm-vc2-line-ftc) より

$$
\int F\cdot dr
=
\phi(2,1,2)-\phi(1,0,0).
$$

$$
\phi(2,1,2)=4+1+4=9,
\qquad
\phi(1,0,0)=1.
$$

従って

$$
\boxed{8}.
$$

経路の具体形は不要です。
<!-- solution-end -->

#### VC2-B01 path independence から potential を作る
- Level: B
- 目安時間: 25分

$$
F(x,y)=(2x+y,x+2y)
$$

について potential を求め、$(0,0)$ から $(1,2)$ までの線積分を求めよ。

<!-- solution-start -->
### 詳細解答

$\phi_x=2x+y$ を $x$ で積分すると

$$
\phi=x^2+xy+C(y).
$$

これを $y$ で微分して

$$
\phi_y=x+C'(y).
$$

$F_2=x+2y$ と一致させると

$$
C'(y)=2y,
$$

したがって

$$
C(y)=y^2+C_0.
$$

よって potential は

$$
\phi=x^2+xy+y^2+C_0.
$$

線積分の基本定理から

$$
\int F\cdot dr
=
\phi(1,2)-\phi(0,0)
=
1+2+4
=
\boxed{7}.
$$
<!-- solution-end -->

#### VC2-B02 star-shaped Poincaré lemma の構成
- Level: B
- 目安時間: 30分

$$
F(x,y,z)=(y+z,\ x+z,\ x+y)
$$

について curl が 0 であることを確認し、

$$
\phi(x)
=
\int_0^1F(tx)\cdot x\,dt
$$

から potential を構成せよ。

<!-- solution-start -->
### 詳細解答

$$
F_1=y+z,\quad
F_2=x+z,\quad
F_3=x+y.
$$

従って

$$
\nabla\times F
=
(F_{3y}-F_{2z},F_{1z}-F_{3x},F_{2x}-F_{1y})
=
(1-1,1-1,1-1)
=
0.
$$

また

$$
F(tx,ty,tz)
=
(t(y+z),t(x+z),t(x+y)).
$$

よって

$$
\begin{aligned}
F(tx)\cdot x
&=
t\{x(y+z)+y(x+z)+z(x+y)\}\\
&=
2t(xy+xz+yz).
\end{aligned}
$$

したがって

$$
\phi(x,y,z)
=
\int_0^12t(xy+xz+yz)\,dt
=
xy+xz+yz.
$$

実際

$$
\nabla\phi
=
(y+z,x+z,x+y)
=
F.
$$
<!-- solution-end -->

#### VC2-B03 punctured plane の反例
- Level: B
- 目安時間: 25分

$$
F(x,y)
=
\left(
-\frac{y}{x^2+y^2},
\frac{x}{x^2+y^2}
\right)
$$

について、原点以外で scalar curl が 0 であることを直接確認し、半径 $R>0$ の円周上の循環を求めよ。

<!-- solution-start -->
### 詳細解答

$P=-y/r^2,Q=x/r^2$ と書きます。

$$
Q_x
=
\frac{r^2-2x^2}{r^4}
=
\frac{y^2-x^2}{r^4},
$$

$$
P_y
=
-\frac{r^2-2y^2}{r^4}
=
\frac{y^2-x^2}{r^4}.
$$

従って

$$
Q_x-P_y=0.
$$

半径 $R$ の円を

$$
\gamma(t)=(R\cos t,R\sin t)
$$

と置くと

$$
F(\gamma(t))
=
\left(
-\frac{\sin t}{R},
\frac{\cos t}{R}
\right),
$$

$$
\gamma'(t)=(-R\sin t,R\cos t).
$$

したがって

$$
F(\gamma(t))\cdot\gamma'(t)=1
$$

であり、

$$
\oint_\gamma F\cdot dr
=
\int_0^{2\pi}1\,dt
=
\boxed{2\pi}.
$$

curl-free でも閉曲線積分が消えないため保存場ではありません。
<!-- solution-end -->

#### VC2-C01 同じ端点を二経路で照合する
- Level: C
- 目安時間: 40分

$$
F(x,y)=(2xy+y^2,\ x^2+2xy)
$$

を考える。

1. scalar curl が 0 であることを確認せよ。
2. $\mathbb R^2$ が star-shaped であることを使って保存場であると結論せよ。
3. $(0,0)$ から $(1,1)$ へ、直線 $\gamma_1(t)=(t,t)$ と折れ線
   $$
   (0,0)\to(1,0)\to(1,1)
   $$
   の二経路で線積分を直接計算し、一致を確認せよ。
4. potential を求め、その端点差とも一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

1. $P=2xy+y^2,Q=x^2+2xy$ とすると

$$
Q_x=2x+2y,
\qquad
P_y=2x+2y.
$$

従って scalar curl は 0 です。

2. $\mathbb R^2$ は原点に関して star-shaped です。従って [star-shaped domain 上の初等 Poincaré lemma](#thm-vc2-poincare-star) の二次元版により $F$ は保存場です。

3. 直線では

$$
\gamma_1'(t)=(1,1),
$$

$$
F(t,t)=(3t^2,3t^2).
$$

従って

$$
\int_{\gamma_1}F\cdot dr
=
\int_0^16t^2\,dt
=
2.
$$

折れ線の第一辺 $(t,0)$ では

$$
F(t,0)=(0,t^2),
\qquad dr=(1,0)dt,
$$

なので積分は 0 です。

第二辺 $(1,t)$ では

$$
F(1,t)=(2t+t^2,1+2t),
\qquad dr=(0,1)dt.
$$

従って

$$
\int_0^1(1+2t)\,dt
=
2.
$$

二経路とも 2 です。

4. $\phi_x=2xy+y^2$ を $x$ で積分すると

$$
\phi=x^2y+xy^2+C(y).
$$

$y$ 微分は

$$
\phi_y=x^2+2xy+C'(y).
$$

$Q$ と一致させると $C'=0$ です。よって

$$
\phi=x^2y+xy^2+C.
$$

端点差は

$$
\phi(1,1)-\phi(0,0)=1+1=\boxed{2},
$$

直接積分と一致します。
<!-- solution-end -->

---

## 10. 次章への接続

VC2 では曲線と循環を扱いました。VC3 では二次元の面を $\mathbb R^3$ に埋め込み、法線、面積要素、flux を定義します。

その準備が整うと、VC4 の Gauss--Ostrogradsky、VC5 の Stokes が「境界の積分」と「内部の微分」を結びます。
