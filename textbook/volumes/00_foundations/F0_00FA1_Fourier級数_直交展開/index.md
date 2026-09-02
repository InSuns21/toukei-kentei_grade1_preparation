# F0-00FA1 Encore II：Fourier級数・直交展開

周期関数をsin・cosへ分解するFourier級数を、単なる公式としてではなく **Hilbert空間の正規直交展開** として読みます。

F0-00E2で扱ったBessel不等式・Parseval等式、F0-02C1で扱ったHilbert空間がここで具体的な解析手法になります。

---

## 1. 周期関数を周波数へ分解する

$2\pi$ 周期の関数 $f$ を

$$
f(x)
\sim
\frac{a_0}{2}
+
\sum_{n=1}^{\infty}
\{a_n\cos nx+b_n\sin nx\}
$$

と表すことを考えます。

ここで

- $n=1$：基本的な振動
- $n=2,3,\dots$：その整数倍の高調波

です。

Fourier級数は、時間・空間方向の複雑な形を「周波数成分の重ね合わせ」として読む方法です。

---

## 2. なぜsin・cosなのか：直交性

$L^2(-\pi,\pi)$ の内積を

$$
\langle f,g\rangle
=
\int_{-\pi}^{\pi}f(x)g(x)\,dx
$$

とします。

三角関数について

$$
\int_{-\pi}^{\pi}\cos(mx)\cos(nx)\,dx
=
\begin{cases}
\pi,&m=n\ge1,\\
0,&m\ne n,
\end{cases}
$$

$$
\int_{-\pi}^{\pi}\sin(mx)\sin(nx)\,dx
=
\begin{cases}
\pi,&m=n,\\
0,&m\ne n,
\end{cases}
$$

さらに

$$
\int_{-\pi}^{\pi}\sin(mx)\cos(nx)\,dx=0.
$$

つまり三角関数系は互いに直交しています。

正規化すれば

$$
\frac1{\sqrt{2\pi}},
\qquad
\frac{\cos nx}{\sqrt\pi},
\qquad
\frac{\sin nx}{\sqrt\pi}
$$

は正規直交系です。

---

## 3. Fourier係数は内積から出る

有限次元で正規直交基底 $q_j$ に対する座標が

$$
\langle x,q_j\rangle
$$

だったのと同じです。

$f$ のFourier係数は

$$
\boxed{
a_n
=
\frac1\pi
\int_{-\pi}^{\pi}f(x)\cos(nx)\,dx
}
$$

$$
\boxed{
b_n
=
\frac1\pi
\int_{-\pi}^{\pi}f(x)\sin(nx)\,dx
}
$$

で与えられます。

$a_0$ は

$$
a_0
=
\frac1\pi
\int_{-\pi}^{\pi}f(x)\,dx.
$$

したがってFourier係数は「公式として覚える係数」ではなく、**正規直交方向への射影係数**です。

---

## 4. 複素指数関数で書く

Eulerの公式

$$
e^{inx}=\cos(nx)+i\sin(nx)
$$

を使うと

$$
f(x)
\sim
\sum_{n\in\mathbb Z}c_ne^{inx}
$$

と書けます。

係数は

$$
\boxed{
c_n
=
\frac1{2\pi}
\int_{-\pi}^{\pi}
f(x)e^{-inx}\,dx
}
$$

です。

これは後のFourier変換

$$
\widehat f(\xi)
=
\int_{-\infty}^{\infty}
f(x)e^{-i\xi x}\,dx
$$

の離散版に見えます。

周期的な世界では周波数が整数 $n$ に離散化され、実数全体の世界では周波数 $\xi$ が連続になります。

---

## 5. Bessel不等式

F0-00E2の一般論から、正規直交系に対して

$$
\sum_j|\langle f,e_j\rangle|^2
\le
\|f\|_2^2
$$

です。

Fourier係数へ書けば、例えば複素形式で

$$
\boxed{
2\pi\sum_{n\in\mathbb Z}|c_n|^2
\le
\int_{-\pi}^{\pi}|f(x)|^2\,dx
}
$$

となります。

つまり周波数成分へ分解したエネルギーの総和は元のエネルギーを超えません。

---

## 6. 完全性とParseval等式

三角関数系が $L^2(-\pi,\pi)$ で完全であることを使うとBessel不等式が等号になります。

$$
\boxed{
\int_{-\pi}^{\pi}|f(x)|^2\,dx
=
2\pi\sum_{n\in\mathbb Z}|c_n|^2
}
$$

これがParseval等式です。

実Fourier係数なら

$$
\frac1\pi
\int_{-\pi}^{\pi}|f(x)|^2\,dx
=
\frac{a_0^2}{2}
+
\sum_{n=1}^{\infty}(a_n^2+b_n^2).
$$

つまり

> **関数の二乗積分 = 周波数係数の二乗和**

です。

これは後のPlancherel定理の周期版です。

---

## 7. L2収束と各点収束は違う

Fourier部分和を

$$
S_Nf
=
\sum_{|n|\le N}c_ne^{inx}
$$

とします。

三角関数系の完全性から、$f\in L^2(-\pi,\pi)$ なら

$$
\boxed{
\|S_Nf-f\|_2\to0
}
$$

です。

しかしこれは

$$
S_Nf(x)\to f(x)
$$

が各点で成り立つことと同じではありません。

L2では「平均二乗誤差が0へ行く」と言っているだけです。

この区別は確率論の

- L2収束
- 確率収束
- 概収束

を区別したのと同じ発想です。

---

## 8. 不連続点では何が起きるか

区分的に滑らかな周期関数では、典型的にFourier級数は不連続点 $x_0$ で

$$
\frac{f(x_0-)+f(x_0+)}2
$$

へ収束します。

跳びの近くでは部分和に振動が残ります。これがGibbs現象です。

重要なのは

> Fourier級数は「どんな場合も各点で元の関数へそのまま収束する」わけではない。

ということです。

L2理論を先に置くと、この混乱を避けやすくなります。

---

## 9. 例：奇関数のFourier級数

$f(x)=x$ を $(-\pi,\pi)$ で考え、$2\pi$ 周期に延長します。

$f$ は奇関数なので

$$
a_0=a_n=0.
$$

一方

$$
b_n
=
\frac1\pi
\int_{-\pi}^{\pi}x\sin(nx)\,dx
$$

です。

被積分関数は偶関数なので

$$
b_n
=
\frac2\pi
\int_0^{\pi}x\sin(nx)\,dx.
$$

部分積分から

$$
b_n
=2\frac{(-1)^{n+1}}n.
$$

したがって

$$
\boxed{
x
\sim
2\sum_{n=1}^{\infty}
\frac{(-1)^{n+1}}n\sin(nx)
}
$$

です。

ここで微積分、直交性、無限級数が一つにつながります。

---

## 10. 微分作用素の固有関数

$$
L=-\frac{d^2}{dx^2}
$$

と置きます。

すると

$$
L[\sin(nx)]
=n^2\sin(nx),
$$

$$
L[\cos(nx)]
=n^2\cos(nx).
$$

つまりsin・cosは $-d^2/dx^2$ の固有関数です。

有限次元で

$$
Av_j=\lambda_jv_j
$$

だったものが、関数空間では

$$
L\phi_n=\lambda_n\phi_n
$$

になります。

Fourier級数は

$$
\boxed{
\text{微分作用素の固有関数による展開}
}
$$

と見ることもできます。

この見方はSturm--Liouville問題で一般化します。

---

## 11. 偏微分方程式への予告

熱方程式を有限区間で境界条件

$$
u(t,0)=u(t,L)=0
$$

の下で解くと、空間方向に

$$
\sin\left(\frac{n\pi x}{L}\right)
$$

が自然に現れます。

それぞれのモードの時間係数だけがODEに従い、

$$
\boxed{
\text{PDE}
=
\text{固有関数ごとのODEを無限個並べたもの}
}
$$

という構造が見えてきます。

---

## 演習

### F0-00FA1-A01 直交性から係数を読む

- Level: A
- 目安時間: 10分

$$
f(x)=2+3\cos(2x)-4\sin(3x)
$$

を $(-\pi,\pi)$ 上の $2\pi$ 周期関数とする。実Fourier係数 $a_0,a_n,b_n$ を求めよ。

<!-- solution-start -->
#### 詳細解答

Fourier表示 $f=a_0/2+\sum_{n\ge1}(a_n\cos nx+b_n\sin nx)$ と係数の一意性・直交性から

$$
a_0=4,\qquad a_2=3,\qquad b_3=-4,
$$

その他の $a_n,b_n$ は0。

#### 本番答案

$a_0=4,a_2=3,b_3=-4$、その他は0。

#### 採点基準（20点）
- 定数項: 6点
- cosine係数: 7点
- sine係数: 7点
<!-- solution-end -->

### F0-00FA1-B01 ParsevalからBasel和を出す

- Level: B
- 目安時間: 18分

本文の

$$
x\sim2\sum_{n=1}^\infty\frac{(-1)^{n+1}}n\sin(nx)
$$

を使い、Parseval等式から

$$
\sum_{n=1}^\infty\frac1{n^2}
$$

を求めよ。

<!-- solution-start -->
#### 詳細解答

$f(x)=x$ では $a_0=a_n=0$, $b_n=2(-1)^{n+1}/n$。Parsevalより

$$
\frac1\pi\int_{-\pi}^{\pi}x^2dx
=\sum_{n=1}^\infty b_n^2.
$$

左辺は $2\pi^2/3$、右辺は $4\sum n^{-2}$。したがって

$$
\sum_{n=1}^\infty\frac1{n^2}=\frac{\pi^2}{6}.
$$

#### 本番答案

$2\pi^2/3=4\sum_{n\ge1}n^{-2}$ より $\sum_{n\ge1}n^{-2}=\pi^2/6$。

#### 採点基準（20点）
- Parseval設定: 7点
- 左辺積分: 5点
- 係数二乗和: 5点
- 結論: 3点
<!-- solution-end -->

---

## 章末チェック

- 三角関数系の直交性を積分で確認できる。
- Fourier係数を内積から導ける。
- 実形式と複素形式を行き来できる。
- Bessel不等式とParseval等式をFourier級数に適用できる。
- L2収束と各点収束を区別できる。
- sin・cosが微分作用素の固有関数であることを説明できる。
- Fourier級数をHilbert空間の正規直交展開として説明できる。
