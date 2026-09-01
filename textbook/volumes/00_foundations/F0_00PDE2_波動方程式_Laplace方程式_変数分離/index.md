# F0-00PDE2 Encore II：波動方程式・Laplace方程式・変数分離

熱方程式では高周波が指数的に消えました。

今度は同じ二階空間微分を持ちながら、時間側が二階微分になる波動方程式を見ます。

さらに時間を消した定常問題としてLaplace方程式へ進みます。

---

## 1. 波動方程式

一次元波動方程式は

$$
\boxed{
\frac{\partial^2u}{\partial t^2}
=c^2\frac{\partial^2u}{\partial x^2}
}
$$

です。

弦の振動、音波、電磁波など、多くの伝播現象の基本形として現れます。

---

## 2. Fourier変換すると調和振動子になる

$x$ についてFourier変換すると

$$
\partial_{tt}\widehat u(t,\xi)
=-c^2\xi^2\widehat u(t,\xi).
$$

つまり

$$
\boxed{
\partial_{tt}\widehat u
+c^2\xi^2\widehat u=0
}
$$

です。

$\xi$ を固定すれば、F0-00H1で扱った調和振動子

$$
y''+\omega^2y=0
$$

そのものです。

したがって

$$
\widehat u(t,\xi)
=A(\xi)\cos(c|\xi|t)
+B(\xi)\sin(c|\xi|t).
$$

熱方程式では

$$
e^{-\kappa\xi^2t}
$$

で減衰したのに対し、波動方程式では

$$
\cos(c|\xi|t),\qquad \sin(c|\xi|t)
$$

として振動が残ります。

---

## 3. 熱と波動の違い

同じ空間作用素

$$
\partial_{xx}
$$

を使っていても、時間微分の次数で挙動は大きく変わります。

熱方程式：

$$
\partial_tu=\kappa\partial_{xx}u
$$

は

$$
\text{高周波を減衰させる}.
$$

波動方程式：

$$
\partial_{tt}u=c^2\partial_{xx}u
$$

は

$$
\text{各周波数を振動させる}.
$$

この差は周波数空間で最も明瞭です。

---

## 4. 有限区間では境界条件が周波数を離散化する

$0<x<L$ で

$$
\partial_{tt}u=c^2\partial_{xx}u
$$

を考え、固定端条件

$$
\boxed{u(t,0)=u(t,L)=0}
$$

を課します。

ここでは実数全体のFourier変換ではなく、Fourier級数が自然に現れます。

---

## 5. 変数分離

積の形

$$
u(t,x)=T(t)X(x)
$$

を仮定します。

PDEへ代入すると

$$
T''(t)X(x)
=c^2T(t)X''(x).
$$

両辺を $c^2TX$ で割ると

$$
\frac{T''}{c^2T}
=
\frac{X''}{X}.
$$

左辺は $t$ だけ、右辺は $x$ だけの関数です。

全ての $t,x$ で等しいため、両方とも定数でなければなりません。

そこで

$$
\frac{X''}{X}=-\lambda
$$

と置き、

$$
\boxed{
X''+\lambda X=0
}
$$

$$
\boxed{
T''+c^2\lambda T=0
}
$$

を得ます。

一つのPDEが二つのODEへ分かれました。

---

## 6. 境界条件が固有値を選ぶ

空間側は

$$
-X''=\lambda X,
\qquad
X(0)=X(L)=0
$$

です。

非自明解が存在するのは

$$
\boxed{
\lambda_n=\left(\frac{n\pi}{L}\right)^2,
\qquad n=1,2,\dots
}
$$

の場合だけです。

対応する固有関数は

$$
\boxed{
X_n(x)=\sin\left(\frac{n\pi x}{L}\right)
}.
$$

境界条件によって、連続だった周波数が離散的な固有値列へ変わります。

---

## 7. 時間側は各モードの調和振動子

各 $n$ について

$$
T_n''+\omega_n^2T_n=0,
$$

$$
\omega_n
=c\frac{n\pi}{L}.
$$

したがって

$$
T_n(t)
=A_n\cos(\omega_nt)
+B_n\sin(\omega_nt).
$$

最終的に

$$
\boxed{u(t,x)
=
\sum_{n=1}^{\infty}
\{A_n\cos(\omega_nt)+B_n\sin(\omega_nt)\}
\sin\left(\frac{n\pi x}{L}\right)
}
$$

という固有モード展開が得られます。

係数 $A_n,B_n$ は初期変位・初速度のFourier正弦係数から決まります。

---

## 8. Fourier級数はPDEの解法だった

ここでFA1へ戻ると、なぜ正弦級数を勉強したのかが分かります。

固定端境界条件を満たす微分作用素

$$
-\frac{d^2}{dx^2}
$$

の固有関数が

$$
\sin\left(\frac{n\pi x}{L}\right)
$$

であり、その固有関数展開がFourier正弦級数です。

つまり

$$
\boxed{
\text{Fourier級数}
=
\text{境界値問題の固有関数展開}
}
$$

という見方ができます。

---

## 9. d'Alembert解への位置付け

実数全体上の一次元波動方程式には

$$
\boxed{u(t,x)=F(x-ct)+G(x+ct)}
$$

という形の解があります。

これは右向き波と左向き波の重ね合わせです。

初期値

$$
u(0,x)=f(x),
\qquad
u_t(0,x)=g(x)
$$

からはd'Alembert公式が得られます。

Fourier法は周波数ごとの振動を見る方法、d'Alembert法は波形そのものが速度 $c$ で移動することを見る方法です。

同じ方程式を異なる座標で理解しています。

---

## 10. Laplace方程式

時間を含まない代表的なPDEとして

$$
\boxed{
\Delta u=0
}
$$

があります。

二次元なら

$$
\boxed{u_{xx}+u_{yy}=0}
$$

です。

この方程式を満たす関数を調和関数といいます。

熱方程式で定常状態

$$
u_t=0
$$

を考えると

$$
u_{xx}=0
$$

が出ることからも、Laplace方程式は平衡状態と結び付きます。

---

## 11. 長方形で変数分離する

長方形

$$
0<x<L,
\qquad
0<y<H
$$

で

$$
u_{xx}+u_{yy}=0
$$

を考えます。

$$
u(x,y)=X(x)Y(y)
$$

と置けば

$$
X''Y+XY''=0.
$$

したがって

$$
\frac{X''}{X}
=-\frac{Y''}{Y}
=-\lambda
$$

と置けます。

すると

$$
X''+\lambda X=0,
$$

$$
Y''-\lambda Y=0.
$$

一方は三角関数、もう一方は指数関数または双曲線関数になります。

境界条件をFourier係数に分解することで、長方形内部の解をモードごとに構成できます。

---

## 12. 三つのPDEを比較する

同じ空間微分作用素を使っても役割が違います。

$$
\boxed{
\begin{array}{c|c|c}
\text{方程式}&\text{時間発展}&\text{周波数モード}\\
\hline
u_t=\kappa u_{xx}&\text{拡散}&e^{-\kappa\xi^2t}\\
\nu_{tt}=c^2u_{xx}&\text{振動・伝播}&\cos(c|\xi|t),\sin(c|\xi|t)\\
\Delta u=0&\text{平衡}&\text{境界条件から決定}
\end{array}
}
$$

この比較はPDEを単なる方程式の公式集にしないための基本図です。

---

## 13. 次の講義：Sturm--Liouville

ここでは

$$
-X''=\lambda X
$$

という非常に単純な固有値問題を使いました。

次はこれを

$$
-\frac d{dx}
\left(p(x)\frac{dy}{dx}\right)
+q(x)y
=
\lambda w(x)y
$$

へ一般化します。

そこから

- 固有値
- 固有関数の直交性
- 重み付き内積
- Fourier級数の一般化

を一つにまとめます。

---

## 章末チェック

- 波動方程式をFourier変換して調和振動子へ落とせる。
- 熱方程式と波動方程式の周波数モードの違いを説明できる。
- 変数分離法から空間・時間ODEを導ける。
- 固定端境界条件から正弦固有関数と固有値を導ける。
- Fourier正弦級数を固有関数展開として説明できる。
- d'Alembert解とFourier法の見方の違いを説明できる。
- Laplace方程式を定常・平衡問題として位置付けられる。
- 長方形のLaplace方程式で変数分離の骨格を説明できる。
