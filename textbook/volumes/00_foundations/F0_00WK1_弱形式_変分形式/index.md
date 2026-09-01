# F0-00WK1 Encore III：弱形式・変分形式・Poisson方程式

ここまでで、弱微分とSobolev空間を用意しました。

いよいよPDEそのものを弱くします。

代表例として

$$
\boxed{
-\Delta u=f
\quad\text{in }\Omega,
\qquad
u=0
\quad\text{on }\partial\Omega
}
$$

というPoisson方程式を考えます。

---

## 1. 古典解なら二階微分が必要

方程式

$$
-\Delta u=f
$$

を各点で読むには、少なくとも $u$ の二階偏微分が意味を持つ必要があります。

しかし実際の境界値問題では、データ $f$ や領域の形によってはそのような滑らかな解が存在しない場合があります。

一方、物理的・変分的にはより弱い意味の解が十分意味を持つことがあります。

---

## 2. テスト関数を掛ける

まず古典解が存在すると仮定し、$v\in C_c^\infty(\Omega)$ を掛けて積分します。

$$
\int_\Omega(-\Delta u)v\,dx
=
\int_\Omega fv\,dx.
$$

Greenの公式または部分積分を使うと

$$
\int_\Omega\nabla u\cdot\nabla v\,dx
-
\int_{\partial\Omega}
\frac{\partial u}{\partial n}v\,dS
=
\int_\Omega fv\,dx.
$$

$v$ が境界で0なら境界項は消えます。

---

## 3. 二階微分が消えた

すると

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega fv\,dx
}
$$

だけが残ります。

この式では $u$ に必要なのは一階弱微分だけです。

つまり $u\in H_0^1(\Omega)$ で意味を持ちます。

これが弱形式です。

---

## 4. 弱解の定義

$f\in L^2(\Omega)$ などとします。

$u\in H_0^1(\Omega)$ が全ての $v\in H_0^1(\Omega)$ に対して

$$
\boxed{
\int_\Omega
\nabla u\cdot\nabla v\,dx
=
\int_\Omega fv\,dx
}
$$

を満たすとき、$u$ をPoisson方程式の弱解と呼びます。

点ごとにPDEを満たすことを要求していません。

---

## 5. 古典解は弱解である

十分滑らかな古典解が零Dirichlet境界条件を満たせば、部分積分により上の弱形式を満たします。

したがって

$$
\boxed{
\text{古典解}
\Longrightarrow
\text{弱解}
}
$$

です。

逆は追加の正則性定理がなければ一般には成り立ちません。

弱解の方が広い概念です。

---

## 6. Hilbert空間上の方程式として書く

$V=H_0^1(\Omega)$ と置きます。

双線形形式

$$
\boxed{
a(u,v)
=
\int_\Omega
\nabla u\cdot\nabla v\,dx
}
$$

と線形汎関数

$$
\boxed{
F(v)
=
\int_\Omega fv\,dx
}
$$

を定義します。

すると弱形式は

$$
\boxed{
\text{Find }u\in V
\text{ such that }
a(u,v)=F(v)
\quad(\forall v\in V)
}
$$

です。

PDEがHilbert空間上の抽象方程式になりました。

---

## 7. aは連続である

Cauchy--Schwarzから

$$
|a(u,v)|
\le
\|\nabla u\|_2
\|\nabla v\|_2.
$$

$H_0^1$ で勾配ノルムを使えば

$$
\boxed{
|a(u,v)|
\le
\|u\|_V\|v\|_V
}
$$

です。

これが双線形形式の連続性です。

---

## 8. aはcoerciveである

$$
a(u,u)
=
\|\nabla u\|_2^2.
$$

Poincare不等式により、これは $H_0^1$ ノルムを制御します。

したがって適切なノルムの取り方で

$$
\boxed{
a(u,u)
\ge\alpha\|u\|_V^2}
$$

となります。

これがcoercivityです。

---

## 9. 右辺Fも連続である

Cauchy--SchwarzとPoincare不等式から

$$
\begin{aligned}
|F(v)|
&\le
\|f\|_2\|v\|_2\\
&\le
C_P\|f\|_2\|\nabla v\|_2.
\end{aligned}
$$

したがって

$$
\boxed{F\in V^*}.
$$

ここでF0-02C2の双対空間が再登場します。

---

## 10. 何が残ったか

Poisson方程式の存在一意性は、もはや微分方程式固有の計算ではなく

> Hilbert空間 $V$ 上で、連続かつcoerciveな双線形形式 $a$ と連続線形汎関数 $F$ が与えられたとき、$a(u,v)=F(v)$ を満たす $u$ は存在して一意か？

という問題になりました。

その答えがLax--Milgramです。

---

## 11. エネルギー最小化との関係

$a$ が対称なら

$$
J(u)
=
\frac12a(u,u)-F(u)
$$

を考えられます。

方向 $v$ へ微分すると

$$
DJ(u)[v]
=
a(u,v)-F(v).
$$

したがって

$$
DJ(u)[v]=0
\quad(\forall v)
$$

は弱形式と同値です。

つまり

$$
\boxed{
\text{弱解}
\longleftrightarrow
\text{エネルギー汎関数の停留点}
}
$$

です。

coercivityと凸性があれば最小点として理解できます。

---

## 12. 有限要素法への予告

無限次元空間 $V$ の代わりに有限次元部分空間

$$
V_h\subset V
$$

を取り

$$
a(u_h,v_h)=F(v_h)
\quad(\forall v_h\in V_h)
$$

を解けば、有限次元の連立一次方程式になります。

これがGalerkin法・有限要素法の基本構造です。

---

## 章末チェック

- Poisson方程式へテスト関数を掛けて弱形式を導ける。
- 弱解と古典解を区別できる。
- $H_0^1$ が零Dirichlet境界条件を担うことを説明できる。
- 双線形形式 $a$ と線形汎関数 $F$ を定義できる。
- 連続性とcoercivityをPoincareから確認できる。
- 弱形式をエネルギー最小化と対応付けられる。
- Galerkin法への橋を説明できる。
