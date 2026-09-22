# NA7 数値解析 VII：ODE 数値解法 II—高次一段法と減衰安定性

NA6 では、一段法

$$
y_{n+1}
=
y_n+h\Phi(t_n,y_n,h)
$$

について、

- 一歩ごとの局所打切り誤差
- 一段関数の摂動増幅
- 固定有限時間での大域誤差

を結び、Euler 法の一次収束を証明しました。

ただし、「刻み幅を十分小さくすれば有限時間で収束する」ことと、「減衰する微分方程式を実用的な刻み幅で正しく減衰させる」ことは同じではありません。

たとえば

$$
y'=-1000y
$$

の厳密解は急速に0へ減衰します。ところが陽的 Euler 法では

$$
y_{n+1}
=
(1-1000h)y_n
$$

なので、$h=0.01$ とすると

$$
1-1000h=-9
$$

となり、厳密解とは逆に絶対値が9倍ずつ増えます。

この章では二つの問いを分けます。

~~~text
一歩を高精度にしたい
  ↓
一歩の中で複数の傾きを評価
  ↓
Taylor 展開と係数条件
  ↓
二次精度・四次精度

減衰を数値法も再現できるか
  ↓
y' = lambda y
  ↓
一歩ごとの増幅率
  ↓
複素平面上で減衰を保つ範囲
  ↓
左半平面全体を保てるか
  ↓
速い減衰と遅い減衰の共存
~~~

直接の前提は [NA6 ODE 数値解法 I](../NA6/index.md) です。NA6 の
[一段法](../NA6/index.md#def-na6-one-step)、
[局所打切り誤差](../NA6/index.md#def-na6-local-error)、
[大域収束定理](../NA6/index.md#thm-na6-one-step-convergence)
をそのまま使います。

---

## 0. NA6 の有限時間収束と、固定刻み幅の減衰再現は何が違うか

NA6 の有限時間摂動安定性は、固定した区間 $[t_0,T]$ で

> 小さな初期値摂動・一歩ごとの摂動が、刻み幅 $h\to0$ のとき制御不能に増幅されないか

を扱いました。

この章の後半では別の問い、

> もともと減衰する線形モードを、ある固定刻み幅の数値法も減衰させるか

を扱います。

したがって、

- **有限時間の収束**：$h\to0$ で正しい解へ近づくか
- **固定刻み幅での減衰再現**：ある $h$ で減衰モードを減衰として再現するか

は別の問いです。

両方必要です。高次でも減衰を保てる範囲の外で使えば数値解の絶対値が増大し得ますし、減衰を保てても低次なら精度は上がりません。

---

## 1. 一歩の中で複数の傾きを見る

Euler 法は一歩につき一回だけ

$$
f(t_n,y_n)
$$

を評価します。より高い精度を得る基本発想は、一歩の途中でも傾きを評価することです。

<a id="def-na7-runge-kutta"></a>
<!-- formal-statement-start -->
### 定義（Runge–Kutta 法）

一階初期値問題

$$
y'=f(t,y)
$$

に対し、$s$ 個の段階値 $k_i$ を

$$
\boxed{
k_i
=
f\left(
t_n+c_i h,\,
y_n+h\sum_{j=1}^s a_{ij}k_j
\right)
}
\qquad
(i=1,\dots,s)
$$

で定め、

$$
\boxed{
y_{n+1}
=
y_n
+
h\sum_{i=1}^s b_i k_i
}
$$

と更新する一段法を **$s$ 段 Runge–Kutta 法**という。

この章では特に

$$
\boxed{
c_i=\sum_{j=1}^s a_{ij}
}
$$

を満たす標準的な係数を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-runge-kutta -->
### 例：陽的中点法

二つの段階を

$$
k_1=f(t_n,y_n),
$$

$$
k_2
=
f\left(
t_n+\frac h2,\,
y_n+\frac h2 k_1
\right)
$$

で作り、

$$
\boxed{
y_{n+1}=y_n+h k_2
}
$$

とします。

最初の傾き $k_1$ で半歩先の値を予測し、その中点での傾き $k_2$ を一歩全体の傾きとして使っています。
<!-- definition-example-end -->

<a id="def-na7-butcher-tableau"></a>
<!-- formal-statement-start -->
### 定義（Butcher 表）

Runge–Kutta 法の係数

$$
A=(a_{ij}),
\qquad
b=(b_i),
\qquad
c=(c_i)
$$

を

$$
\begin{array}{c|cccc}
c_1&a_{11}&a_{12}&\cdots&a_{1s}\\
c_2&a_{21}&a_{22}&\cdots&a_{2s}\\
\vdots&\vdots&\vdots&&\vdots\\
c_s&a_{s1}&a_{s2}&\cdots&a_{ss}\\
\hline
&b_1&b_2&\cdots&b_s
\end{array}
$$

と並べた表を **Butcher 表**という。
<!-- formal-statement-end -->

陽的中点法は

$$
\begin{array}{c|cc}
0&0&0\\
1/2&1/2&0\\
\hline
&0&1
\end{array}
$$

です。

<a id="def-na7-explicit-implicit-rk"></a>
<!-- formal-statement-start -->
### 定義（陽的・陰的 Runge–Kutta 法）

Runge–Kutta 法で

$$
a_{ij}=0
\qquad
(j\ge i)
$$

が成り立つとき、すなわち $A$ が狭義下三角であるとき、**陽的 Runge–Kutta 法**という。

それ以外で、段階値を求めるために一般に方程式を解く必要があるものを **陰的 Runge–Kutta 法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-explicit-implicit-rk -->
### 例：なぜ陽的方法は順番に計算できるのか

陽的二段法なら

$$
k_1=f(t_n,y_n)
$$

をまず求め、その値だけを使って

$$
k_2
=
f(t_n+c_2h,y_n+h a_{21}k_1)
$$

を求められます。

一方、たとえば

$$
k_1
=
f(t_n+h,\,
y_n+h k_1)
$$

では $k_1$ の右辺にも $k_1$ が現れます。非線形 $f$ なら、各時間ステップで非線形方程式を解く必要があります。

陰的方法は一歩が高価になる代わりに、後で見るように安定性で大きな利点を持ちます。
<!-- definition-example-end -->

---

## 2. 二次精度の係数条件を導く

まず二次精度までなら、一般 Runge–Kutta 法の係数条件を直接導けます。

以下では一時刻 $(t,y)$ で

$$
f=f(t,y),
\qquad
f_t=\frac{\partial f}{\partial t}(t,y),
\qquad
f_y=\frac{\partial f}{\partial y}(t,y)
$$

と略記します。

厳密解は

$$
y'=f(t,y)
$$

なので

$$
y''
=
f_t+f_y f.
$$

したがって Taylor 展開から

$$
\boxed{
y(t+h)
=
y
+h f
+\frac{h^2}{2}(f_t+f_yf)
+O(h^3)
}
$$

です。

<a id="thm-na7-rk-order-two"></a>
<!-- formal-statement-start -->
### 定理（二次 Runge–Kutta 法の次数条件）

$c_i=\sum_j a_{ij}$ を満たす Runge–Kutta 法を考える。

十分滑らかなスカラー初期値問題すべてに対して二次整合的となるための条件は

$$
\boxed{
\sum_{i=1}^s b_i=1
}
$$

および

$$
\boxed{
\sum_{i=1}^s b_i c_i=\frac12
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各段階について

$$
k_i
=
f\left(
t+c_i h,\,
y+h\sum_j a_{ij}k_j
\right)
$$

です。

$h\to0$ では各 $k_j=f+O(h)$ なので

$$
h\sum_j a_{ij}k_j
=
h\left(\sum_j a_{ij}\right)f
+O(h^2).
$$

仮定

$$
c_i=\sum_j a_{ij}
$$

より

$$
h\sum_j a_{ij}k_j
=
h c_i f+O(h^2).
$$

$f$ を $(t,y)$ のまわりで一次 Taylor 展開すると

$$
\begin{aligned}
k_i
&=
f
+
c_i h f_t
+
h c_i f f_y
+
O(h^2)\\
&=
f
+
h c_i(f_t+f_yf)
+
O(h^2).
\end{aligned}
$$

したがって数値法の一歩は

$$
\begin{aligned}
y_{n+1}
&=
y
+
h\sum_i b_i k_i\\
&=
y
+
h\left(\sum_i b_i\right)f
+
h^2
\left(\sum_i b_i c_i\right)
(f_t+f_yf)
+
O(h^3).
\end{aligned}
$$

これが厳密解

$$
y(t+h)
=
y
+h f
+\frac{h^2}{2}(f_t+f_yf)
+O(h^3)
$$

と $h^2$ まで一致するためには

$$
\sum_i b_i=1,
\qquad
\sum_i b_i c_i=\frac12
$$

が十分です。

必要性も確認します。

まず

$$
y'=1
$$

に一歩適用すると、すべての $k_i=1$ なので

$$
y_{n+1}-y_n
=
h\sum_i b_i.
$$

厳密増分は $h$ です。したがって一次以上の整合性には

$$
\sum_i b_i=1
$$

が必要です。

次に

$$
y'=t,
\qquad
t_n=0
$$

を考えます。このとき

$$
k_i=c_i h
$$

なので数値増分は

$$
h\sum_i b_i c_i h
=
h^2\sum_i b_i c_i.
$$

厳密増分は

$$
\int_0^h t\,dt
=
\frac{h^2}{2}.
$$

よって二次整合性には

$$
\sum_i b_i c_i=\frac12
$$

も必要です。

以上で必要十分性が示されました。
<!-- proof-end -->

### 2.1 陽的中点法

Butcher 表は

$$
\begin{array}{c|cc}
0&0&0\\
1/2&1/2&0\\
\hline
&0&1
\end{array}
$$

です。

したがって

$$
b_1+b_2=1
$$

かつ

$$
b_1c_1+b_2c_2
=
0\cdot0+1\cdot\frac12
=
\frac12.
$$

よって二次法です。

### 2.2 Heun 法

Heun 法は

$$
k_1=f(t_n,y_n),
$$

$$
k_2=f(t_n+h,y_n+h k_1),
$$

$$
y_{n+1}
=
y_n+\frac h2(k_1+k_2)
$$

であり、Butcher 表は

$$
\begin{array}{c|cc}
0&0&0\\
1&1&0\\
\hline
&1/2&1/2
\end{array}
$$

です。

ここでも

$$
\frac12+\frac12=1,
$$

$$
\frac12\cdot0+\frac12\cdot1=\frac12
$$

なので二次法です。

同じ次数でも中間段階の取り方は一意ではありません。

---

## 3. 四次精度の代表的方法

<a id="def-na7-classical-rk4"></a>
<!-- formal-statement-start -->
### 定義（古典4段4次 Runge–Kutta 法）

段階値を

$$
\begin{aligned}
k_1&=f(t_n,y_n),\\
k_2&=
f\left(t_n+\frac h2,y_n+\frac h2k_1\right),\\
k_3&=
f\left(t_n+\frac h2,y_n+\frac h2k_2\right),\\
k_4&=
f(t_n+h,y_n+h k_3)
\end{aligned}
$$

で定め、

$$
\boxed{
y_{n+1}
=
y_n+
\frac h6(k_1+2k_2+2k_3+k_4)
}
$$

と更新する陽的4段法を **古典4段4次 Runge–Kutta 法**という。

その Butcher 表は

$$
\begin{array}{c|cccc}
0&0&0&0&0\\
1/2&1/2&0&0&0\\
1/2&0&1/2&0&0\\
1&0&0&1&0\\
\hline
&1/6&1/3&1/3&1/6
\end{array}
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-classical-rk4 -->
### 例：$y'=y$ に一歩適用する

$y_n=1$ として一歩だけ進めると

$$
k_1=1,
$$

$$
k_2=1+\frac h2,
$$

$$
k_3
=
1+\frac h2+\frac{h^2}{4},
$$

$$
k_4
=
1+h+\frac{h^2}{2}+\frac{h^3}{4}.
$$

したがって

$$
\begin{aligned}
y_{n+1}
&=
1+\frac h6(k_1+2k_2+2k_3+k_4)\\
&=
1+h+\frac{h^2}{2}
+\frac{h^3}{6}
+\frac{h^4}{24}.
\end{aligned}
$$

一歩の更新が $e^h$ の4次 Taylor 多項式と一致することが見えます。
<!-- definition-example-end -->

一般の非自律・ベクトル方程式で4次性を整理するには三次・四次の Runge–Kutta 次数条件が多数現れます。ここでは核心計算が見える自律スカラー方程式

$$
y'=f(y)
$$

で4次性を直接確認します。

<a id="prop-na7-rk4-order-four"></a>
<!-- formal-statement-start -->
### 命題（古典4段4次 Runge–Kutta 法の自律スカラー4次性）

$f\in C^4$ とし、自律スカラー方程式

$$
y'=f(y)
$$

へ [古典4段4次 Runge–Kutta 法](#def-na7-classical-rk4) を適用する。

厳密解と数値法の一歩の差は

$$
O(h^5)
$$

である。

したがって NA6 の局所打切り誤差の規約では

$$
\tau_{n+1}=O(h^4)
$$

であり、一段関数の差が刻み幅に依存しない定数で抑えられる有限時間区間では大域誤差は

$$
O(h^4)
$$

となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

一歩の始点を $y$ とし、

$$
f=f(y),
\qquad
f'=f'(y),
\qquad
f''=f''(y),
\qquad
f'''=f'''(y)
$$

と略記します。

自律方程式から

$$
y'=f,
$$

$$
y''=f'f,
$$

$$
y'''
=
f''f^2+(f')^2f,
$$

さらに微分して

$$
y''''
=
f'''f^3
+
4f'f''f^2
+
(f')^3f.
$$

したがって厳密解の Taylor 展開は

$$
\begin{aligned}
y(t+h)
=
y
&+hf\\
&+\frac{h^2}{2}f'f\\
&+\frac{h^3}{6}
\left(
f''f^2+(f')^2f
\right)\\
&+\frac{h^4}{24}
\left(
f'''f^3
+
4f'f''f^2
+
(f')^3f
\right)
+O(h^5).
\end{aligned}
$$

次に各段階を展開します。

第1段階は

$$
k_1=f.
$$

第2段階は

$$
k_2=f\left(y+\frac h2f\right)
$$

なので

$$
k_2
=
f
+\frac h2f'f
+\frac{h^2}{8}f''f^2
+\frac{h^3}{48}f'''f^3
+O(h^4).
$$

第3段階は

$$
k_3=f\left(y+\frac h2k_2\right).
$$

上の $k_2$ を代入して三次まで整理すると

$$
\begin{aligned}
k_3
=
f
&+\frac h2f'f\\
&+h^2
\left(
\frac14(f')^2f
+\frac18 f''f^2
\right)\\
&+h^3
\left(
\frac{3}{16}f'f''f^2
+\frac1{48}f'''f^3
\right)
+O(h^4).
\end{aligned}
$$

第4段階は

$$
k_4=f(y+h k_3)
$$

なので

$$
\begin{aligned}
k_4
=
f
&+h f'f\\
&+h^2
\left(
\frac12(f')^2f
+\frac12f''f^2
\right)\\
&+h^3
\left(
\frac14(f')^3f
+\frac58f'f''f^2
+\frac16f'''f^3
\right)
+O(h^4).
\end{aligned}
$$

これらを重み付き和へ代入します。

$$
y_{n+1}
=
y
+
\frac h6(k_1+2k_2+2k_3+k_4).
$$

次数ごとに集めると

$$
\begin{aligned}
y_{n+1}
=
y
&+hf\\
&+\frac{h^2}{2}f'f\\
&+\frac{h^3}{6}
\left(
f''f^2+(f')^2f
\right)\\
&+\frac{h^4}{24}
\left(
f'''f^3
+
4f'f''f^2
+
(f')^3f
\right)
+O(h^5).
\end{aligned}
$$

これは厳密解の展開と $h^4$ まで一致します。

したがって一歩の欠陥は

$$
O(h^5).
$$

NA6 では一歩の欠陥を $h\tau_{n+1}$ と書いたので

$$
\tau_{n+1}=O(h^4).
$$

さらに [NA6 の整合性と摂動安定性からの大域収束](../NA6/index.md#thm-na6-one-step-convergence)を適用できる範囲では、大域誤差も

$$
O(h^4)
$$

です。
<!-- proof-end -->

高次化は「一歩をより正確にする」問題を解きます。しかし次は、減衰を壊さないかを調べなければなりません。

---

## 4. 減衰を測る標準モデルと一歩の増幅率

<a id="def-na7-test-equation"></a>
<!-- formal-statement-start -->
### 定義（線形テスト方程式）

複素定数 $\lambda$ に対する

$$
\boxed{
y'=\lambda y
}
$$

を、数値 ODE 法の絶対安定性を調べる **線形テスト方程式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-test-equation -->
### 例：なぜ $\operatorname{Re}\lambda<0$ を見るのか

厳密解は

$$
y(t)=e^{\lambda(t-t_0)}y_0.
$$

したがって

$$
|y(t)|
=
e^{\operatorname{Re}\lambda(t-t_0)}
|y_0|.
$$

よって

$$
\operatorname{Re}\lambda<0
$$

なら厳密解は時間とともに減衰します。

数値法にも、この減衰を少なくとも「増幅しない」という意味で再現してほしいわけです。
<!-- definition-example-end -->

刻み幅 $h$ と $\lambda$ は常に

$$
z=h\lambda
$$

という組で現れます。

<a id="def-na7-stability-function"></a>
<!-- formal-statement-start -->
### 定義（安定関数）

線形テスト方程式

$$
y'=\lambda y
$$

へ一段法を適用したとき、

$$
\boxed{
y_{n+1}=R(z)y_n,
\qquad
z=h\lambda
}
$$

と書けるなら、$R(z)$ をその数値法の **安定関数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-stability-function -->
### 例：陽的 Euler 法

陽的 Euler 法では

$$
y_{n+1}
=
y_n+h\lambda y_n
=
(1+h\lambda)y_n.
$$

したがって

$$
\boxed{
R(z)=1+z
}
$$

です。
<!-- definition-example-end -->

<a id="prop-na7-rk-stability-function"></a>
<!-- formal-statement-start -->
### 命題（Runge–Kutta 法の安定関数）

$s$ 段 Runge–Kutta 法を線形テスト方程式へ適用する。

$\mathbf 1=(1,\dots,1)^{\mathsf T}$ とし、$I-zA$ が可逆な $z$ では安定関数は

$$
\boxed{
R(z)
=
1
+
z\,b^{\mathsf T}
(I-zA)^{-1}
\mathbf 1
}
$$

である。

特に陽的 Runge–Kutta 法では $A^s=0$ なので、$R$ は高々 $s$ 次の多項式になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形テスト方程式では

$$
f(t,y)=\lambda y.
$$

各段階は

$$
k_i
=
\lambda
\left(
y_n+h\sum_j a_{ij}k_j
\right).
$$

段階ベクトル

$$
k=(k_1,\dots,k_s)^{\mathsf T}
$$

を用いると

$$
k
=
\lambda y_n\mathbf 1
+
h\lambda A k.
$$

$z=h\lambda$ と置けば

$$
(I-zA)k
=
\lambda y_n\mathbf 1.
$$

したがって

$$
k
=
\lambda y_n
(I-zA)^{-1}
\mathbf 1.
$$

更新式

$$
y_{n+1}
=
y_n+h b^{\mathsf T}k
$$

へ代入すると

$$
\begin{aligned}
y_{n+1}
&=
y_n
+
h\lambda y_n
b^{\mathsf T}
(I-zA)^{-1}
\mathbf 1\\
&=
\left[
1+
z b^{\mathsf T}
(I-zA)^{-1}
\mathbf 1
\right]y_n.
\end{aligned}
$$

よって

$$
R(z)
=
1+
z b^{\mathsf T}(I-zA)^{-1}\mathbf 1.
$$

陽的方法では $A$ は狭義下三角なので

$$
A^s=0.
$$

したがって

$$
(I-zA)^{-1}
=
I+zA+z^2A^2+\cdots+z^{s-1}A^{s-1}
$$

と有限和で書けます。

従って $R(z)$ は多項式です。
<!-- proof-end -->

---

## 5. 複素平面上で減衰を保つ範囲

<a id="def-na7-absolute-stability-region"></a>
<!-- formal-statement-start -->
### 定義（絶対安定領域）

安定関数 $R(z)$ に対して

$$
\boxed{
\mathcal S
=
\{z\in\mathbb C:\ |R(z)|\le1\}
}
$$

を **絶対安定領域**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-absolute-stability-region -->
### 例：陽的 Euler 法の負の実軸上の安定区間

$z=-x$、$x\ge0$ とします。

陽的 Euler 法では

$$
R(-x)=1-x.
$$

したがって

$$
|1-x|\le1
$$

は

$$
0\le x\le2
$$

と同値です。

つまり負の実軸上では

$$
\boxed{
-2\le z\le0
}
$$

だけが安定です。
<!-- definition-example-end -->

### 5.1 二次陽的 Runge–Kutta 法

二次条件を満たす二段陽的 Runge–Kutta 法を線形テスト方程式へ適用すると

$$
\boxed{
R(z)=1+z+\frac{z^2}{2}
}
$$

になります。

したがって陽的中点法と Heun 法は、非線形問題では異なる段階構成を持つにもかかわらず、線形テスト方程式に対しては同じ安定関数を持ちます。

負の実軸 $z=-x$ では

$$
R(-x)
=
1-x+\frac{x^2}{2}.
$$

この量は常に正で、

$$
R(-x)\le1
$$

は

$$
-x+\frac{x^2}{2}\le0
$$

すなわち

$$
0\le x\le2
$$

です。

よって負の実軸上の安定区間は、陽的 Euler 法と同じ

$$
[-2,0]
$$

です。

**次数が上がったから安定領域も必ず広がるわけではありません。**

### 5.2 古典4段4次 Runge–Kutta 法

線形テスト方程式では各段階を直接代入すると

$$
\boxed{
R(z)
=
1+z+\frac{z^2}{2}
+\frac{z^3}{6}
+\frac{z^4}{24}
}
$$

です。

これは $e^z$ の4次 Taylor 多項式です。

負の実軸では安定領域が Euler 法より広がり、およそ

$$
\boxed{
-2.785\lesssim z\le0
}
$$

となります。

ただし、どこまでも左へ伸びるわけではありません。

---

## 6. 陽的 Runge–Kutta 法は左半平面全体を安定にできない

<a id="def-na7-a-stability"></a>
<!-- formal-statement-start -->
### 定義（A 安定性）

数値法の絶対安定領域 $\mathcal S$ が

$$
\boxed{
\{z\in\mathbb C:\operatorname{Re}z\le0\}
\subset
\mathcal S
}
$$

を満たすとき、その数値法は **A 安定**であるという。
<!-- formal-statement-end -->

A 安定なら、線形テスト方程式のすべての減衰モードに対して、刻み幅による安定性制約を受けません。

<a id="thm-na7-no-explicit-rk-a-stability"></a>
<!-- formal-statement-start -->
### 定理（陽的 Runge–Kutta 法は A 安定にならない）

整合的な陽的 Runge–Kutta 法は A 安定ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Runge–Kutta 法の安定関数](#prop-na7-rk-stability-function)から、陽的方法の安定関数 $R(z)$ は多項式です。

整合性から

$$
R(0)=1,
\qquad
R'(0)=1
$$

なので、$R$ は定数多項式ではありません。

従って負の実軸上で

$$
x\to+\infty
$$

とすると、非定数多項式の最高次項が支配的になり、

$$
|R(-x)|
\longrightarrow\infty.
$$

よって十分大きな $x$ では

$$
|R(-x)|>1.
$$

しかし

$$
-x
$$

は左半平面に属します。

したがって左半平面全体を絶対安定領域へ含めることはできず、陽的 Runge–Kutta 法は A 安定ではありません。
<!-- proof-end -->

これは「陽的方法の係数をもっと賢く選べば、時間尺度が大きく異なる問題の刻み幅制約を完全に消せる」という期待には限界があることを示します。

---

## 7. 陰的方法の最初の例

<a id="def-na7-backward-euler"></a>
<!-- formal-statement-start -->
### 定義（後退 Euler 法）

一階 ODE

$$
y'=f(t,y)
$$

に対して

$$
\boxed{
y_{n+1}
=
y_n
+
h f(t_{n+1},y_{n+1})
}
$$

と更新する方法を **後退 Euler 法**という。
<!-- formal-statement-end -->

右辺に未知の $y_{n+1}$ が現れるため陰的方法です。

線形テスト方程式なら

$$
y_{n+1}
=
y_n+h\lambda y_{n+1}.
$$

したがって

$$
(1-z)y_{n+1}=y_n
$$

より

$$
\boxed{
R(z)=\frac1{1-z}
}
$$

です。

<a id="def-na7-l-stability"></a>
<!-- formal-statement-start -->
### 定義（L 安定性）

A 安定な数値法で、さらに左半平面内で

$$
\boxed{
|z|\to\infty,
\qquad
\operatorname{Re}z\le0
}
$$

としたとき

$$
\boxed{
R(z)\longrightarrow0
}
$$

が成り立つとき、その数値法を **L 安定**という。
<!-- formal-statement-end -->

L 安定性は、非常に速く減衰するモードを数値法自身も強く0へ押し込む性質です。

<a id="prop-na7-backward-euler-a-l"></a>
<!-- formal-statement-start -->
### 命題（後退 Euler 法の A 安定性・L 安定性）

後退 Euler 法は A 安定かつ L 安定である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z=x+iy$ とし、

$$
x=\operatorname{Re}z\le0
$$

とします。

後退 Euler 法では

$$
R(z)=\frac1{1-z}.
$$

分母について

$$
|1-z|^2
=
(1-x)^2+y^2.
$$

$x\le0$ なので

$$
1-x\ge1.
$$

よって

$$
|1-z|^2\ge1
$$

であり、

$$
|R(z)|
=
\frac1{|1-z|}
\le1.
$$

したがって左半平面全体が絶対安定領域に含まれ、A 安定です。

さらに左半平面内で $|z|\to\infty$ とすると

$$
R(z)=\frac1{1-z}\longrightarrow0.
$$

よって L 安定でもあります。
<!-- proof-end -->

---

## 8. 二次の陰的方法：速いモードはどう残るか

<a id="def-na7-trapezoidal-method"></a>
<!-- formal-statement-start -->
### 定義（台形法）

一階 ODE

$$
y'=f(t,y)
$$

に対して

$$
\boxed{
y_{n+1}
=
y_n
+
\frac h2
\left[
f(t_n,y_n)
+
f(t_{n+1},y_{n+1})
\right]
}
$$

と更新する方法を **台形法**という。
<!-- formal-statement-end -->

線形テスト方程式では

$$
y_{n+1}
=
y_n
+
\frac z2(y_n+y_{n+1}).
$$

従って

$$
\left(1-\frac z2\right)y_{n+1}
=
\left(1+\frac z2\right)y_n
$$

であり、

$$
\boxed{
R(z)
=
\frac{1+z/2}{1-z/2}
}
$$

です。

<a id="prop-na7-trapezoidal-a-not-l"></a>
<!-- formal-statement-start -->
### 命題（台形法の A 安定性と非 L 安定性）

台形法は A 安定であるが、L 安定ではない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z=x+iy$、$x\le0$ とします。

分母と分子の絶対値の二乗の差を取ると

$$
\begin{aligned}
\left|1-\frac z2\right|^2
-
\left|1+\frac z2\right|^2
&=
\left(1-\frac x2\right)^2+\frac{y^2}{4}\\
&\quad-
\left[
\left(1+\frac x2\right)^2+\frac{y^2}{4}
\right]\\
&=
-2x.
\end{aligned}
$$

$x\le0$ だから

$$
-2x\ge0.
$$

従って

$$
\left|1+\frac z2\right|
\le
\left|1-\frac z2\right|,
$$

すなわち

$$
|R(z)|\le1.
$$

よって台形法は A 安定です。

一方、たとえば負の実軸上で $z=-x$、$x\to+\infty$ とすると

$$
R(-x)
=
\frac{1-x/2}{1+x/2}
\longrightarrow-1.
$$

左半平面内のこの経路ですら0へ行かないので、L 安定ではありません。
<!-- proof-end -->

A 安定性は「増幅しない」ことを保証しますが、L 安定性はさらに「非常に速い減衰モードを数値的にも速く消す」ことを要求します。

台形法では強い減衰モードが

$$
-1
$$

に近い増幅率を持ち、符号を交互に変えながらゆっくり残ることがあります。

---

## 9. 異なる減衰時間尺度が共存するとき

「stiffness」には、すべての状況を一意に覆う単純な定義があるわけではありません。そこでこの章では数値時間積分の観点から、次を作業定義とします。

<a id="def-na7-stiff-problem"></a>
<!-- formal-statement-start -->
### 定義（硬い問題）

解に速く減衰するモードと遅いモードが共存し、陽的方法を用いると、

$$
\text{欲しい精度から決まる刻み幅}
$$

よりもはるかに小さい

$$
\text{絶対安定性から決まる刻み幅}
$$

を強制される問題を、この章では **硬い問題（stiff problem）** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na7-stiff-problem -->
### 例：二つの減衰時間尺度

連立系

$$
\begin{cases}
y_1'=-y_1,\\
y_2'=-1000y_2
\end{cases}
$$

を考えます。

厳密解は

$$
y_1(t)=e^{-t}y_1(0),
$$

$$
y_2(t)=e^{-1000t}y_2(0).
$$

$y_1$ は時間尺度1で変化しますが、$y_2$ は時間尺度 $10^{-3}$ で急減衰します。

陽的 Euler 法では増幅率が

$$
1-h
$$

と

$$
1-1000h
$$

です。

速いモードを安定にするには

$$
|1-1000h|\le1.
$$

従って

$$
\boxed{
0\le h\le0.002
}
$$

が必要です。

$t=1$ まで進むだけでも少なくとも500ステップ必要です。

ところが $y_2$ はごく初期にほぼ消え、その後の関心が遅い $y_1$ にあるなら、これは精度ではなく安定性が課した計算コストです。

後退 Euler 法なら速いモードの増幅率は

$$
\frac1{1+1000h}
$$

であり、任意の $h>0$ で絶対値が1未満です。

たとえば $h=0.1$ なら

$$
\frac1{101}
$$

なので、速いモードは一歩で強く減衰します。
<!-- definition-example-end -->

### 9.1 台形法では何が起こるか

同じ速いモード $\lambda=-1000$ に $h=0.1$ を使うと

$$
z=-100.
$$

台形法では

$$
R(-100)
=
\frac{1-50}{1+50}
=
-\frac{49}{51}.
$$

絶対値は1未満なので安定ですが、

$$
\left|-\frac{49}{51}\right|
\approx0.961
$$

と1にかなり近い値です。

厳密解の一歩の増幅率は

$$
e^{-100}
$$

で事実上0です。

したがって台形法は「増幅しない」という A 安定性は持つものの、この極端に速いモードを一歩で消す能力は弱いことが分かります。

これが L 安定性を別に考える理由です。

---

## 10. 三つの方法を一つの族で統一する

<a id="def-na7-theta-method"></a>
<!-- formal-statement-start -->
### 定義（theta 法）

実数パラメータ $\theta$ に対して

$$
\boxed{
y_{n+1}
=
y_n
+
h
\left[
(1-\theta)f(t_n,y_n)
+
\theta f(t_{n+1},y_{n+1})
\right]
}
$$

と更新する方法を **theta 法**という。
<!-- formal-statement-end -->

特に

$$
\theta=0
$$

で陽的 Euler 法、

$$
\theta=\frac12
$$

で台形法、

$$
\theta=1
$$

で後退 Euler 法です。

<!-- definition-example-start: def-na7-theta-method -->
### 例：安定関数

線形テスト方程式へ適用すると

$$
y_{n+1}
=
y_n
+
z
\left[
(1-\theta)y_n+\theta y_{n+1}
\right].
$$

従って

$$
(1-\theta z)y_{n+1}
=
[1+(1-\theta)z]y_n.
$$

よって

$$
\boxed{
R_\theta(z)
=
\frac{1+(1-\theta)z}{1-\theta z}
}
$$

です。
<!-- definition-example-end -->

<a id="thm-na7-theta-a-stability"></a>
<!-- formal-statement-start -->
### 定理（theta 法の A 安定性判定）

$0\le\theta\le1$ とする。

theta 法が A 安定であるための必要十分条件は

$$
\boxed{
\theta\ge\frac12
}
$$

である。

さらに A 安定な theta 法のうち L 安定なのは

$$
\boxed{
\theta=1
}
$$

だけである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$z=x+iy$ と置きます。

A 安定性には左半平面

$$
x\le0
$$

で

$$
|R_\theta(z)|\le1
$$

が必要です。

これは

$$
|1+(1-\theta)z|
\le
|1-\theta z|
$$

と同値です。

両辺の二乗の差を取ると

$$
\begin{aligned}
&|1-\theta z|^2
-
|1+(1-\theta)z|^2\\
&=
(1-\theta x)^2+\theta^2 y^2\\
&\quad-
\left[
(1+(1-\theta)x)^2
+
(1-\theta)^2y^2
\right].
\end{aligned}
$$

展開すると

$$
\boxed{
|1-\theta z|^2
-
|1+(1-\theta)z|^2
=
-2x
+
(2\theta-1)(x^2+y^2)
}
$$

です。

まず

$$
\theta\ge\frac12
$$

なら

$$
2\theta-1\ge0.
$$

さらに左半平面では

$$
x\le0
\quad\Longrightarrow\quad
-2x\ge0.
$$

従って

$$
-2x+(2\theta-1)(x^2+y^2)\ge0.
$$

よって

$$
|R_\theta(z)|\le1
$$

であり、A 安定です。

逆に

$$
\theta<\frac12
$$

とします。

純虚数

$$
z=iy,
\qquad
y\ne0
$$

を取ると $x=0$ なので

$$
|1-\theta z|^2
-
|1+(1-\theta)z|^2
=
(2\theta-1)y^2<0.
$$

従って

$$
|R_\theta(iy)|>1.
$$

純虚軸は左半平面の境界に含まれるので A 安定ではありません。

以上より

$$
\boxed{
\theta\ge\frac12
}
$$

が A 安定性の必要十分条件です。

次に L 安定性を調べます。

$\theta\ge1/2$ とします。$R_\theta$ は一次式同士の比なので、左半平面内で $|z|\to\infty$ とすると最高次項の比から

$$
\lim_{|z|\to\infty\atop \operatorname{Re}z\le0}
R_\theta(z)
=
-\frac{1-\theta}{\theta}.
$$

これが0になるのは

$$
1-\theta=0,
$$

すなわち

$$
\boxed{
\theta=1
}
$$

だけです。

従って A 安定な theta 法の中で L 安定なのは後退 Euler 法だけです。
<!-- proof-end -->

この一つの定理で、

- 陽的 Euler 法：$\theta=0$、A 安定でない
- 台形法：$\theta=1/2$、A 安定だが L 安定でない
- 後退 Euler 法：$\theta=1$、A 安定かつ L 安定

が統一されます。

---

## 11. 高次と安定性は別軸で選ぶ

ここまでの代表法を並べます。

| 方法 | 大域次数 | 陽的/陰的 | A 安定 | L 安定 |
|---|---:|---|---|---|
| 陽的 Euler | 1 | 陽的 | いいえ | いいえ |
| 陽的中点 / Heun | 2 | 陽的 | いいえ | いいえ |
| 古典 RK4 | 4 | 陽的 | いいえ | いいえ |
| 後退 Euler | 1 | 陰的 | はい | はい |
| 台形法 | 2 | 陰的 | はい | いいえ |

ここから重要な見方が得られます。

**高次だから stiff 問題に強いわけではありません。**

古典 RK4 は非常に有用な4次法ですが、陽的方法なので安定領域は有限です。

逆に後退 Euler 法は一次法ですが、強い減衰モードを含む問題では L 安定性が重要なことがあります。

数値 ODE 法の選択では

$$
\text{精度}
\quad\text{と}\quad
\text{絶対安定性}
$$

を別々に見る必要があります。

---

# 12. 演習

## Level A

<a id="ex-na7-a01"></a>
### NA7-A01 Butcher 表から更新式を読む
- Level: A

次の Butcher 表を考える。

$$
\begin{array}{c|cc}
0&0&0\\
1/2&1/2&0\\
\hline
&0&1
\end{array}
$$

1. 段階値 $k_1,k_2$ を書け。
2. 更新式 $y_{n+1}$ を書け。
3. この方法が陽的である理由を説明せよ。
4. 方法名を答えよ。

<!-- solution-start -->
### 詳細解答

第1行から

$$
c_1=0,
\qquad
a_{11}=a_{12}=0
$$

なので

$$
\boxed{
k_1=f(t_n,y_n)
}.
$$

第2行から

$$
c_2=\frac12,
\qquad
a_{21}=\frac12,
\qquad
a_{22}=0
$$

なので

$$
\boxed{
k_2
=
f\left(
t_n+\frac h2,\,
y_n+\frac h2 k_1
\right)
}.
$$

最下行は

$$
b_1=0,
\qquad
b_2=1
$$

なので

$$
\boxed{
y_{n+1}=y_n+h k_2
}.
$$

$k_1$ は既知の $t_n,y_n$ だけから求まり、$k_2$ は求め終わった $k_1$ だけを使います。未知の段階値自身は右辺に現れません。

従って陽的 Runge–Kutta 法です。

これは

$$
\boxed{
\text{陽的中点法}
}
$$

です。
<!-- solution-end -->

<a id="ex-na7-a02"></a>
### NA7-A02 二段二次法の一族
- Level: A

$\alpha\ne0$ とし、

$$
\begin{array}{c|cc}
0&0&0\\
\alpha&\alpha&0\\
\hline
&b_1&b_2
\end{array}
$$

という二段陽的 Runge–Kutta 法を考える。

1. 二次条件から $b_1,b_2$ を $\alpha$ で表せ。
2. $\alpha=1/2$ で陽的中点法になることを確認せよ。
3. $\alpha=1$ で Heun 法になることを確認せよ。

<!-- solution-start -->
### 詳細解答

[二次 Runge–Kutta 法の次数条件](#thm-na7-rk-order-two)は

$$
b_1+b_2=1
$$

および

$$
b_1c_1+b_2c_2=\frac12
$$

です。

ここでは

$$
c_1=0,
\qquad
c_2=\alpha.
$$

したがって第二条件は

$$
b_2\alpha=\frac12.
$$

$\alpha\ne0$ より

$$
\boxed{
b_2=\frac1{2\alpha}
}.
$$

第一条件から

$$
\boxed{
b_1
=
1-\frac1{2\alpha}
}.
$$

$\alpha=1/2$ なら

$$
b_2=1,
\qquad
b_1=0,
$$

なので

$$
\begin{array}{c|cc}
0&0&0\\
1/2&1/2&0\\
\hline
&0&1
\end{array}
$$

となり、陽的中点法です。

$\alpha=1$ なら

$$
b_2=\frac12,
\qquad
b_1=\frac12,
$$

なので

$$
\begin{array}{c|cc}
0&0&0\\
1&1&0\\
\hline
&1/2&1/2
\end{array}
$$

となり、Heun 法です。

同じ二次精度を満たす陽的二段法が一つではないことも分かります。
<!-- solution-end -->

<a id="ex-na7-a03"></a>
### NA7-A03 三つの安定関数
- Level: A

線形テスト方程式

$$
y'=\lambda y,
\qquad
z=h\lambda
$$

に対して、次の安定関数を導け。

1. 陽的 Euler 法
2. 後退 Euler 法
3. 台形法

<!-- solution-start -->
### 詳細解答

#### 1. 陽的 Euler 法

$$
y_{n+1}
=
y_n+h\lambda y_n
=
(1+z)y_n.
$$

従って

$$
\boxed{
R_{\mathrm E}(z)=1+z
}.
$$

#### 2. 後退 Euler 法

$$
y_{n+1}
=
y_n+h\lambda y_{n+1}.
$$

従って

$$
(1-z)y_{n+1}=y_n,
$$

よって

$$
\boxed{
R_{\mathrm{BE}}(z)
=
\frac1{1-z}
}.
$$

#### 3. 台形法

$$
y_{n+1}
=
y_n+\frac z2(y_n+y_{n+1}).
$$

従って

$$
\left(1-\frac z2\right)y_{n+1}
=
\left(1+\frac z2\right)y_n.
$$

よって

$$
\boxed{
R_{\mathrm T}(z)
=
\frac{1+z/2}{1-z/2}
}.
$$
<!-- solution-end -->

<a id="ex-na7-a04"></a>
### NA7-A04 負の実軸上の安定区間
- Level: A

1. 陽的 Euler 法の負の実軸上の絶対安定区間を求めよ。
2. 安定関数
   $$
   R(z)=1+z+\frac{z^2}{2}
   $$
   を持つ二次陽的 Runge–Kutta 法について同じ区間を求めよ。

<!-- solution-start -->
### 詳細解答

$z=-x$、$x\ge0$ と置きます。

#### 1. 陽的 Euler 法

$$
R(-x)=1-x.
$$

絶対安定条件は

$$
|1-x|\le1.
$$

これは

$$
-1\le1-x\le1
$$

と同値です。

右側から

$$
-x\le0
$$

は自動的に成り立ちます。

左側から

$$
1-x\ge-1
$$

すなわち

$$
x\le2.
$$

従って

$$
0\le x\le2.
$$

よって

$$
\boxed{
-2\le z\le0
}.
$$

#### 2. 二次陽的 Runge–Kutta 法

$$
R(-x)
=
1-x+\frac{x^2}{2}.
$$

平方完成すると

$$
1-x+\frac{x^2}{2}
=
\frac12(x-1)^2+\frac12>0.
$$

従って絶対値を外せます。

安定条件は

$$
1-x+\frac{x^2}{2}\le1.
$$

従って

$$
-x+\frac{x^2}{2}\le0.
$$

因数分解して

$$
x\left(\frac x2-1\right)\le0.
$$

$x\ge0$ なので

$$
0\le x\le2.
$$

したがって

$$
\boxed{
-2\le z\le0
}.
$$

二次法でも負の実軸上の区間が Euler 法より広がらない例になっています。
<!-- solution-end -->

## Level B

<a id="ex-na7-b01"></a>
### NA7-B01 古典 RK4 の安定多項式
- Level: B

古典4段4次 Runge–Kutta 法を

$$
y'=\lambda y
$$

へ適用し、

$$
\boxed{
R(z)
=
1+z+\frac{z^2}{2}
+\frac{z^3}{6}
+\frac{z^4}{24}
}
$$

を段階値から直接導け。

<!-- solution-start -->
### 詳細解答

$z=h\lambda$ と置きます。

第1段階は

$$
k_1=\lambda y_n.
$$

第2段階は

$$
\begin{aligned}
k_2
&=
\lambda
\left(
y_n+\frac h2k_1
\right)\\
&=
\lambda y_n
\left(
1+\frac z2
\right).
\end{aligned}
$$

第3段階は

$$
\begin{aligned}
k_3
&=
\lambda
\left(
y_n+\frac h2k_2
\right)\\
&=
\lambda y_n
\left[
1+\frac z2\left(1+\frac z2\right)
\right]\\
&=
\lambda y_n
\left(
1+\frac z2+\frac{z^2}{4}
\right).
\end{aligned}
$$

第4段階は

$$
\begin{aligned}
k_4
&=
\lambda(y_n+h k_3)\\
&=
\lambda y_n
\left[
1+
z\left(
1+\frac z2+\frac{z^2}{4}
\right)
\right]\\
&=
\lambda y_n
\left(
1+z+\frac{z^2}{2}+\frac{z^3}{4}
\right).
\end{aligned}
$$

更新式は

$$
y_{n+1}
=
y_n+\frac h6(k_1+2k_2+2k_3+k_4).
$$

$\lambda y_n$ をくくると

$$
\begin{aligned}
k_1+2k_2+2k_3+k_4
=
\lambda y_n
\Bigg[
&1
+2\left(1+\frac z2\right)\\
&+2\left(1+\frac z2+\frac{z^2}{4}\right)\\
&+\left(1+z+\frac{z^2}{2}+\frac{z^3}{4}\right)
\Bigg].
\end{aligned}
$$

括弧内を整理すると

$$
6+3z+z^2+\frac{z^3}{4}.
$$

したがって

$$
\begin{aligned}
y_{n+1}
&=
y_n
+
\frac z6
\left(
6+3z+z^2+\frac{z^3}{4}
\right)y_n\\
&=
\left(
1+z+\frac{z^2}{2}
+\frac{z^3}{6}
+\frac{z^4}{24}
\right)y_n.
\end{aligned}
$$

よって

$$
\boxed{
R(z)
=
1+z+\frac{z^2}{2}
+\frac{z^3}{6}
+\frac{z^4}{24}
}.
$$
<!-- solution-end -->

<a id="ex-na7-b02"></a>
### NA7-B02 A 安定でも L 安定とは限らない
- Level: B

1. 後退 Euler 法が A 安定であることを示せ。
2. 台形法が A 安定であることを示せ。
3. $z=-x$, $x\to+\infty$ の極限を比較し、どちらが L 安定か判定せよ。

<!-- solution-start -->
### 詳細解答

$z=x+iy$ とし、

$$
x\le0
$$

を仮定します。

#### 1. 後退 Euler 法

安定関数は

$$
R_{\mathrm{BE}}(z)=\frac1{1-z}.
$$

分母の絶対値は

$$
|1-z|^2
=
(1-x)^2+y^2.
$$

$x\le0$ より

$$
1-x\ge1
$$

なので

$$
|1-z|^2\ge1.
$$

従って

$$
|R_{\mathrm{BE}}(z)|\le1.
$$

よって A 安定です。

#### 2. 台形法

安定関数は

$$
R_{\mathrm T}(z)
=
\frac{1+z/2}{1-z/2}.
$$

分母と分子の二乗差は

$$
\left|1-\frac z2\right|^2
-
\left|1+\frac z2\right|^2
=
-2x.
$$

$x\le0$ より

$$
-2x\ge0.
$$

従って

$$
\left|1+\frac z2\right|
\le
\left|1-\frac z2\right|,
$$

したがって

$$
|R_{\mathrm T}(z)|\le1.
$$

よって台形法も A 安定です。

#### 3. L 安定性

後退 Euler 法では

$$
R_{\mathrm{BE}}(-x)
=
\frac1{1+x}
\longrightarrow0.
$$

従って L 安定です。

台形法では

$$
R_{\mathrm T}(-x)
=
\frac{1-x/2}{1+x/2}
\longrightarrow-1.
$$

0へ行かないため L 安定ではありません。

したがって

$$
\boxed{
\text{後退 Euler 法：A 安定かつ L 安定}
}
$$

$$
\boxed{
\text{台形法：A 安定だが L 安定でない}
}
$$

です。
<!-- solution-end -->

<a id="ex-na7-b03"></a>
### NA7-B03 硬い二成分系の刻み幅制約
- Level: B

連立系

$$
\begin{cases}
y_1'=-y_1,\\
y_2'=-1000y_2
\end{cases}
$$

を $0\le t\le1$ で解く。

1. 陽的 Euler 法で両モードを絶対安定にするための刻み幅条件を求めよ。
2. $t=1$ まで進むのに必要な最小ステップ数を求めよ。
3. 後退 Euler 法で $h=0.1$ としたとき、二つのモードの一歩の増幅率を求めよ。
4. この問題が硬いと呼ばれる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 陽的 Euler 法

$\lambda=-1$ のモードでは

$$
z=-h.
$$

陽的 Euler 法の負の実軸上の安定区間は

$$
-2\le z\le0
$$

なので

$$
0\le h\le2.
$$

一方、$\lambda=-1000$ のモードでは

$$
z=-1000h.
$$

従って

$$
-2\le-1000h\le0.
$$

これより

$$
\boxed{
0\le h\le0.002
}.
$$

両方を同時に安定にするには厳しい方の条件

$$
\boxed{
h\le0.002
}
$$

が必要です。

#### 2. ステップ数

$t=1$ まで等間隔で進むなら

$$
Nh=1.
$$

$h\le0.002$ より

$$
N\ge\frac1{0.002}=500.
$$

したがって

$$
\boxed{
N_{\min}=500
}.
$$

#### 3. 後退 Euler 法

後退 Euler 法の増幅率は

$$
R(z)=\frac1{1-z}.
$$

$h=0.1$ のとき、遅いモードでは

$$
z=-0.1
$$

なので

$$
\boxed{
R(-0.1)=\frac1{1.1}=\frac{10}{11}
}.
$$

速いモードでは

$$
z=-100
$$

なので

$$
\boxed{
R(-100)=\frac1{101}
}.
$$

どちらも絶対値1未満で、特に速いモードは強く減衰します。

#### 4. 硬さ

遅い成分 $y_1$ の時間尺度は1です。

一方、速い成分 $y_2$ の時間尺度は

$$
10^{-3}
$$

です。

速い成分は短時間でほぼ消えますが、陽的 Euler 法ではその成分が存在するだけで

$$
h\le0.002
$$

という厳しい制約が全計算期間に課されます。

これは遅い成分の精度要求というより、速い減衰モードに対する絶対安定性から生じる制約です。

したがってこの系は、この章の意味で硬い問題です。
<!-- solution-end -->

## Level C

<a id="ex-na7-c01"></a>
### NA7-C01 theta 法の安定性を完全に分類する
- Level: C

$0\le\theta\le1$ とし、

$$
y_{n+1}
=
y_n
+
h
\left[
(1-\theta)f(t_n,y_n)
+
\theta f(t_{n+1},y_{n+1})
\right]
$$

を考える。

1. 線形テスト方程式に対する安定関数
   $$
   R_\theta(z)
   =
   \frac{1+(1-\theta)z}{1-\theta z}
   $$
   を導け。
2. $z=x+iy$ として
   $$
   |1-\theta z|^2
   -
   |1+(1-\theta)z|^2
   =
   -2x+(2\theta-1)(x^2+y^2)
   $$
   を示せ。
3. $\theta\ge1/2$ なら A 安定であることを示せ。
4. $\theta<1/2$ なら純虚数 $z=iy$ を用いて A 安定でないことを示せ。
5. A 安定な範囲で L 安定となる $\theta$ をすべて求めよ。
6. $\theta=0,1/2,1$ がそれぞれ何法か答え、得られた安定性分類と照合せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 安定関数

線形テスト方程式

$$
y'=\lambda y
$$

へ適用します。

$z=h\lambda$ と置くと

$$
y_{n+1}
=
y_n
+
z
\left[
(1-\theta)y_n
+
\theta y_{n+1}
\right].
$$

$y_{n+1}$ を左へ集めると

$$
(1-\theta z)y_{n+1}
=
[1+(1-\theta)z]y_n.
$$

従って

$$
\boxed{
R_\theta(z)
=
\frac{1+(1-\theta)z}{1-\theta z}
}.
$$

#### 2. 絶対値の差

$z=x+iy$ とします。

まず

$$
1-\theta z
=
1-\theta x-i\theta y
$$

なので

$$
|1-\theta z|^2
=
(1-\theta x)^2+\theta^2y^2.
$$

また

$$
1+(1-\theta)z
=
1+(1-\theta)x+i(1-\theta)y
$$

なので

$$
|1+(1-\theta)z|^2
=
[1+(1-\theta)x]^2
+
(1-\theta)^2y^2.
$$

差を取ると

$$
\begin{aligned}
D
&=
(1-\theta x)^2
-
[1+(1-\theta)x]^2\\
&\quad+
[\theta^2-(1-\theta)^2]y^2.
\end{aligned}
$$

最初の部分を展開すると

$$
\begin{aligned}
&(1-2\theta x+\theta^2x^2)\\
&\quad-
[1+2(1-\theta)x+(1-\theta)^2x^2]\\
&=
-2x
+
[\theta^2-(1-\theta)^2]x^2.
\end{aligned}
$$

さらに

$$
\theta^2-(1-\theta)^2
=
2\theta-1.
$$

よって

$$
\boxed{
D
=
-2x
+
(2\theta-1)(x^2+y^2)
}.
$$

#### 3. $\theta\ge1/2$

左半平面

$$
x\le0
$$

では

$$
-2x\ge0.
$$

また

$$
\theta\ge\frac12
$$

なら

$$
2\theta-1\ge0.
$$

従って

$$
D\ge0.
$$

すなわち

$$
|1-\theta z|
\ge
|1+(1-\theta)z|.
$$

よって

$$
|R_\theta(z)|\le1.
$$

左半平面全体で成り立つため

$$
\boxed{
\theta\ge\frac12
\Longrightarrow
\text{A 安定}
}.
$$

#### 4. $\theta<1/2$

$z=iy$、$y\ne0$ を取ります。

このとき $x=0$ なので

$$
D
=
(2\theta-1)y^2.
$$

$\theta<1/2$ より

$$
2\theta-1<0
$$

なので

$$
D<0.
$$

従って

$$
|1-\theta iy|
<
|1+(1-\theta)iy|,
$$

すなわち

$$
|R_\theta(iy)|>1.
$$

よって A 安定ではありません。

以上から

$$
\boxed{
\text{theta 法が A 安定}
\iff
\theta\ge\frac12
}.
$$

#### 5. L 安定性

A 安定な

$$
\theta\ge\frac12
$$

について $z=-x$、$x\to+\infty$ を考えます。

$$
R_\theta(-x)
=
\frac{1-(1-\theta)x}{1+\theta x}.
$$

最高次項の比から

$$
\lim_{x\to+\infty}R_\theta(-x)
=
-\frac{1-\theta}{\theta}.
$$

これが0になるのは

$$
1-\theta=0
$$

だけです。

従って

$$
\boxed{
\theta=1
}
$$

のみが L 安定です。

#### 6. 特別な三点

$\theta=0$ では

$$
y_{n+1}=y_n+h f(t_n,y_n),
$$

すなわち陽的 Euler 法です。

A 安定条件 $\theta\ge1/2$ を満たさないので A 安定ではありません。

$\theta=1/2$ では台形法です。

A 安定ですが、

$$
\lim_{x\to\infty}R_{1/2}(-x)=-1
$$

なので L 安定ではありません。

$\theta=1$ では後退 Euler 法です。

A 安定かつ L 安定です。

従って

$$
\boxed{
\begin{array}{c|c|c}
\theta&\text{方法}&\text{安定性}\\
\hline
0&\text{陽的 Euler}&\text{A 安定でない}\\
1/2&\text{台形法}&\text{A 安定、非 L 安定}\\
1&\text{後退 Euler}&\text{A 安定、L 安定}
\end{array}
}
$$

となり、本文の分類と一致します。
<!-- solution-end -->

---

## 13. 次へ：線形代数そのものの数値安定性

NA6–NA7 では ODE の時間発展を通じて、

~~~text
局所打切り誤差
  ↓
大域収束
  ↓
Runge–Kutta 高次化
  ↓
安定関数
  ↓
絶対安定性
  ↓
硬い問題
~~~

までを閉じました。

次の NA8 では時間発展から離れ、連立一次方程式

$$
Ax=b
$$

を有限精度で解く問題へ進みます。

中心となるのは

- Gaussian elimination
- LU 分解
- Cholesky 分解
- QR 分解
- 行列条件数
- 後方誤差

です。

NA1 で導入した「問題の条件の悪さ」と「アルゴリズムの安定性」の区別が、数値線形代数で本格的に再登場します。
