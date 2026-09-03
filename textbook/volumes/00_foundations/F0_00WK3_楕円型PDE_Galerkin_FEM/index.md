# F0-00WK3 Encore III：楕円型PDE・Galerkin法・有限要素法への橋

Encore IIIの最後に、Lax--Milgramで得た無限次元の弱解を、実際の有限次元計算へつなげます。

中心は

$$
\boxed{
\text{弱形式}
\to
\text{Galerkin近似}
\to
\text{有限要素法}
}
$$

です。

---

## 1. 一般の変分問題

Hilbert空間 $V$ 上で

$$
\boxed{
a(u,v)=F(v)
\qquad(\forall v\in V)}
$$

を考えます。

$a$ が連続かつcoercive、$F\in V^*$ ならLax--Milgramにより一意解 $u\in V$ が存在します。

---

## 2. 一般の楕円型方程式

例えば

$$
-\nabla\cdot(A(x)\nabla u)
+c(x)u
=f
$$

を考えます。

零Dirichlet境界条件の下で部分積分すると

$$
a(u,v)
=
\int_\Omega
(A\nabla u)\cdot\nabla v\,dx
+
\int_\Omega c uv\,dx
$$

という双線形形式が現れます。

$A$ が一様正定値で $c\ge0$ なら、適切な条件の下でcoercivityを得られます。

---

## 3. 一様楕円性

行列場 $A(x)$ に対し、ある $\lambda>0$ が存在して

$$
\boxed{
\xi^{\mathsf T}A(x)\xi
\ge
\lambda|\xi|^2
}
$$

がa.e.で全ての $\xi$ に対して成り立つとします。

これが一様楕円性です。

すると主要項について

$$
\int(A\nabla u)\cdot\nabla u
\ge
\lambda\|\nabla u\|_2^2
$$

となり、Poincare不等式と組み合わせてcoercivityへつながります。

---

## 4. 有限次元部分空間へ制限する

$V$ の有限次元部分空間

$$
V_h\subset V
$$

を選びます。

Galerkin近似 $u_h\in V_h$ を

$$
\boxed{
a(u_h,v_h)=F(v_h)
\qquad(\forall v_h\in V_h)}
$$

で定義します。

同じ弱形式を、有限次元空間だけで解いています。

---

## 5. 基底を取れば連立一次方程式になる

$V_h$ の基底を

$$
\phi_1,\dots,\phi_N
$$

とし

$$
u_h=\sum_{j=1}^N U_j\phi_j
$$

と書きます。

$v_h=\phi_i$ を代入すると

$$
\sum_{j=1}^N
U_j a(\phi_j,\phi_i)
=F(\phi_i).
$$

したがって

$$
\boxed{KU=b}
$$

という連立一次方程式になります。

$$
K_{ij}=a(\phi_j,\phi_i)
$$

が剛性行列です。

---

## 6. Galerkin直交性

真の解 $u$ は全ての $v\in V$ に対し

$$
a(u,v)=F(v)
$$

を満たします。

離散解は全ての $v_h\in V_h$ に対し

$$
a(u_h,v_h)=F(v_h)
$$

です。

引き算すると

$$
\boxed{
a(u-u_h,v_h)=0
\qquad(\forall v_h\in V_h)}
$$

を得ます。

これがGalerkin直交性です。

---

## 7. Ceaの補題

<a id="lem-f0-00wk3-cea"></a>

<!-- formal-statement-start -->
> **補題（Ceaの補題）**  
> $V$ を実Hilbert空間、$V_h\subset V$ を有限次元部分空間とし、双線形形式 $a:V\times V\to\mathbb R$ が $|a(u,v)|\le M\|u\|\|v\|$ と $a(v,v)\ge\alpha\|v\|^2$ を満たすとします。$F\in V^*$ に対し、$u\in V$ が $a(u,v)=F(v)$ をすべての $v\in V$ で満たし、$u_h\in V_h$ が $a(u_h,v_h)=F(v_h)$ をすべての $v_h\in V_h$ で満たすとします。このとき

$
\boxed{
\|u-u_h\|
\le
\frac M\alpha
\inf_{w_h\in V_h}\|u-w_h\|
}
$

> が成り立ちます。
<!-- formal-statement-end -->

$a$ が

$$
|a(u,v)|\le M\|u\|\|v\|
$$

かつ

$$
a(v,v)\ge\alpha\|v\|^2
$$

を満たすとします。

任意の $w_h\in V_h$ に対し

$$
\begin{aligned}
\alpha\|u-u_h\|^2
&\le a(u-u_h,u-u_h)\\
&=a(u-u_h,u-w_h)
+a(u-u_h,w_h-u_h).
\end{aligned}
$$

最後の項はGalerkin直交性で0です。

したがって

$$
\alpha\|u-u_h\|^2
\le
M\|u-u_h\|\|u-w_h\|.
$$

よって

$$
\boxed{
\|u-u_h\|
\le
\frac M\alpha
\inf_{w_h\in V_h}
\|u-w_h\|
}
$$

です。

これがCeaの補題です。

---

## 8. 何がすごいのか

数値解法そのものの誤差が、

> 選んだ有限次元空間が真の解をどれだけうまく近似できるか

という純粋な近似問題へ還元されました。

つまり

$$
\boxed{
\text{離散化誤差}
\lesssim
\text{最良近似誤差}
}
$$

です。

---

## 9. 区分線形有限要素

領域を小さな要素へ分割し、その上で連続な区分線形関数を使うとします。

これらは通常、勾配が要素ごとに定数で $L^2$ に入るため

$$
V_h\subset H_0^1(\Omega)
$$

となるよう構成できます。

古典的二階微分を持たなくても、弱形式には十分です。

Sobolev空間を導入した理由がここで実用上も回収されます。

---

## 10. 一次元の例

区間 $[0,1]$ を

$$
0=x_0<x_1<\cdots<x_N=1
$$

と分割します。

各内部節点 $x_i$ に対してhat function $\phi_i$ を作り、

$$
V_h
=
\operatorname{span}\{\phi_1,\dots,\phi_{N-1}\}
$$

とします。

Poisson問題では

$$
K_{ij}
=
\int_0^1
\phi_j'(x)\phi_i'(x)\,dx
$$

となり、局所台のため疎行列が得られます。

---

## 11. Encore IIとの接続

Encore IIではFourier級数やSturm--Liouville固有関数を使ってPDEを解きました。

それは問題の幾何や係数が非常に整っているときに強力です。

Encore IIIでは

- 複雑な領域
- 可変係数
- 古典解が十分滑らかでない場合

にも使える弱形式へ進みました。

$$
\boxed{
\text{Fourier固有関数展開}
\quad\text{と}\quad
\text{有限要素Galerkin法}
}
$$

は、どちらもHilbert空間で基底・部分空間を使う近似という共通構造を持ちます。

---

## 12. Encore IIIの到達点

ここまでで

$$
\boxed{
\text{Schwartz超関数}
\to
\text{弱微分}
\to
\text{Sobolev空間}
\to
H_0^1
\to
\text{弱形式}
\to
\text{Lax--Milgram}
\to
\text{Galerkin/FEM}
}
$$

を通しました。

古典的に二階微分できない場合でも、PDEをHilbert空間上の問題として解けるようになりました。

---

## 13. ここから先

さらに進むと

- 楕円型正則性
- 最大値原理
- 非線形弱解
- monotone operator
- Navier--Stokes
- conservation law
- entropy solution

などが現れます。

これらはEncore IIIの必須範囲にはしません。

---

## 章末チェック

- 一般楕円型方程式から双線形形式を作れる。
- 一様楕円性とcoercivityの関係を説明できる。
- Galerkin近似を定義できる。
- 基底展開から連立一次方程式を導ける。
- Galerkin直交性を示せる。
- Ceaの補題を導ける。
- 区分線形有限要素がH1弱解と相性がよい理由を説明できる。
