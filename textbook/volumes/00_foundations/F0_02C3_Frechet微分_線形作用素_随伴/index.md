# F0-02C3 関数解析III：Fréchet微分・線形作用素・随伴

有限次元の多変数微分では、同じ現象を

$$
\nabla f(x),
\qquad
Df(x),
\qquad
J_F(x)
$$

と複数の記法で書いても、あまり困りませんでした。

しかし無限次元へ進むと、それぞれの型を区別する必要があります。

まず結論だけ並べると、

$$
\boxed{
\begin{array}{ccl}
f:X\to\mathbb R
&\Rightarrow&
Df(x)\in X^*,\\[1mm]
F:X\to Y
&\Rightarrow&
DF(x)\in\mathcal L(X,Y),\\[1mm]
T:X\to Y
&\Rightarrow&
T^*:Y^*\to X^*.
\end{array}
}
$$

ここで $\mathcal L(X,Y)$ は $X$ から $Y$ への有界線形作用素全体です。

---

## 1. 一変数微分を「一次近似」として読み直す

一変数関数 $f:\mathbb R\to\mathbb R$ が $x$ で微分可能なら

$$
f(x+h)
=f(x)+f'(x)h+o(|h|).
$$

重要なのは、微分係数 $f'(x)$ そのものより

$$
\boxed{
f(x+h)-f(x)
\approx
f'(x)h
}
$$

という **線形な一次近似** があることです。

多変数・無限次元でも、この発想を保存します。

---

## 2. 方向微分

$X$ をノルム空間、$f:X\to\mathbb R$ とします。

点 $x\in X$ と方向 $h\in X$ に対し

$$
D_hf(x)
=\lim_{t\to0}
\frac{f(x+th)-f(x)}{t}
$$

が存在するとき、これを **方向微分** といいます。

これは「方向 $h$ に沿って一変数関数として微分する」だけです。

方向ごとに微分できること自体は、まだ一つの良い線形近似が存在することを保証しません。

---

## 3. Gâteaux微分

すべての方向 $h$ について方向微分が存在し、さらに

$$
h\mapsto D_hf(x)
$$

が線形写像になるとき、その線形写像を **Gâteaux微分** と呼びます。

記号的には

$$
D_Gf(x)[h]
=D_hf(x)
$$

です。

ただしGâteaux微分は方向ごとの情報をまとめただけなので、$h$ の方向によらず誤差が一様に小さいことまでは要求していません。

この点でFréchet微分より弱い概念です。

---

## 4. Fréchet微分

$f:X\to Y$ をノルム空間間の写像とします。

$f$ が $x$ で **Fréchet微分可能** であるとは、ある有界線形作用素

$$
A:X\to Y
$$

が存在して

$$
\boxed{
\frac{
\|f(x+h)-f(x)-Ah\|_Y
}{\|h\|_X}
\to0
\qquad(h\to0)
}
$$

となることです。

この $A$ を

$$
Df(x)
$$

と書きます。

つまり

$$
\boxed{
f(x+h)
=f(x)+Df(x)h+o(\|h\|)
}
$$

です。

Fréchet微分は、点 $x$ の近くのすべての小さな増分 $h$ に対して **一つの線形写像でまとめて一次近似する** 概念です。

---

## 5. 実数値関数なら微分は双対空間の元

$f:X\to\mathbb R$ なら

$$
Df(x):X\to\mathbb R
$$

は連続線形汎関数です。

したがって

$$
\boxed{Df(x)\in X^*}.
$$

一般のBanach空間では、微分そのものをまず「ベクトル」だと思わないことが重要です。

Hilbert空間 $H$ ならRiesz表現定理により一意な $g\in H$ が存在して

$$
Df(x)[h]
=\langle g,h\rangle_H.
$$

この $g$ をHilbert空間での勾配とみなし

$$
\boxed{g=\nabla_Hf(x)}
$$

と書けます。

---

## 6. 有限次元では勾配が出る

$X=\mathbb R^p$、$f:\mathbb R^p\to\mathbb R$ とします。

通常の微分可能性の下で

$$
Df(x)[h]
=\sum_{j=1}^p
\frac{\partial f}{\partial x_j}(x)h_j
=\nabla f(x)^{\mathsf T}h.
$$

つまり

$$
\boxed{
Df(x)
\longleftrightarrow
\nabla f(x)
}
$$

という対応は、Euclid内積によるRiesz表現そのものです。

---

## 7. 例：Hilbert空間のノルム二乗

Hilbert空間 $H$ 上で

$$
f(x)=\frac12\|x\|^2
$$

とします。

$x+h$ で展開すると

$$
\begin{aligned}
f(x+h)
&=\frac12\langle x+h,x+h\rangle\\
&=\frac12\|x\|^2
+\langle x,h\rangle
+\frac12\|h\|^2.
\end{aligned}
$$

したがって

$$
Df(x)[h]=\langle x,h\rangle.
$$

Riesz表現により

$$
\boxed{\nabla_Hf(x)=x}.
$$

SVMの正則化項

$$
\frac12\|w\|_{\mathcal H}^2
$$

を $w$ で微分すると $w$ が出る背景です。

---

## 8. 例：二乗誤差型の汎関数

$H=L^2([0,1])$ とし、固定関数 $g\in H$ に対して

$$
J(f)=\frac12\|f-g\|_2^2
$$

とします。

増分 $h$ に対し

$$
J(f+h)
=J(f)
+\langle f-g,h\rangle
+\frac12\|h\|^2.
$$

よって

$$
DJ(f)[h]
=\langle f-g,h\rangle,
$$

したがって

$$
\boxed{\nabla_HJ(f)=f-g}.
$$

有限次元の最小二乗と全く同じ形です。

---

## 9. 有界線形作用素

ノルム空間 $X,Y$ の間の線形写像

$$
T:X\to Y
$$

が、ある $M<\infty$ に対して

$$
\|Tx\|_Y
\le M\|x\|_X
\qquad(\forall x\in X)
$$

を満たすとき、**有界線形作用素** といいます。

線形写像については

$$
\boxed{
\text{有界}
\Longleftrightarrow
\text{連続}
}
$$

です。

線形汎関数で見た議論と同じです。

---

## 10. 作用素ノルム

有界線形作用素 $T:X\to Y$ に対し

$$
\boxed{
\|T\|
=\sup_{\|x\|_X\le1}\|Tx\|_Y
}
$$

を **作用素ノルム** といいます。

同値に

$$
\|T\|
=\sup_{x\ne0}
\frac{\|Tx\|_Y}{\|x\|_X}.
$$

したがって

$$
\|Tx\|_Y
\le\|T\|\|x\|_X.
$$

有限次元でEuclidノルムを使う行列 $A$ の作用素ノルムは最大特異値です。

---

## 11. 微分は有界線形作用素

$f:X\to Y$ がFréchet微分可能なら

$$
Df(x)\in\mathcal L(X,Y),
$$

ここで

$$
\mathcal L(X,Y)
$$

は有界線形作用素全体です。

有限次元では

$$
DF(x)
\longleftrightarrow
J_F(x)
$$

です。

Jacobian行列は、微分という線形写像を座標で表したものにすぎません。

---

## 12. 連鎖律

$f:X\to Y$、$g:Y\to Z$ がそれぞれ適切にFréchet微分可能なら

$$
\boxed{
D(g\circ f)(x)
=Dg(f(x))\circ Df(x)
}
$$

です。

有限次元では行列積

$$
J_{g\circ f}(x)
=J_g(f(x))J_f(x)
$$

になります。

関数解析では「Jacobianの積」ではなく、**一次近似作用素の合成** が本体です。

---

## 13. Banach空間での随伴作用素

有界線形作用素

$$
T:X\to Y
$$

を考えます。

$y^*\in Y^*$ に対し

$$
T^*y^*
\in X^*
$$

を

$$
\boxed{
(T^*y^*)[x]
=y^*[Tx]
}
$$

で定めます。

これを **随伴作用素** といいます。

型を確認すると

$$
\boxed{
T^*:Y^*\to X^*
}
$$

です。

つまり $T$ が $X$ から $Y$ へ進むのに対し、随伴は双対空間の上を逆向きに進みます。

---

## 14. なぜ逆向きになるのか

$y^*$ は $Y$ のベクトルを実数へ測る装置です。

$x\in X$ を測りたいとき、まず

$$
x\xmapsto{T}Tx\in Y
$$

と送り、その後

$$
Tx\xmapsto{y^*}y^*(Tx)
$$

と測れます。

この合成

$$
y^*\circ T
$$

が $X$ 上の汎関数です。

したがって

$$
T^*y^*=y^*\circ T.
$$

「出力側の測定器を、入力側へ引き戻す」と考えると分かりやすくなります。

---

## 15. 有限次元では転置行列になる

$T:\mathbb R^p\to\mathbb R^m$ を

$$
T(x)=Ax
$$

とします。

$y^*\in(\mathbb R^m)^*$ をベクトル $\lambda\in\mathbb R^m$ で

$$
y^*(y)=\lambda^{\mathsf T}y
$$

と表します。

すると

$$
(T^*y^*)(x)
=\lambda^{\mathsf T}Ax
=(A^{\mathsf T}\lambda)^{\mathsf T}x.
$$

したがって

$$
\boxed{T^*\lambda=A^{\mathsf T}\lambda}.
$$

KKTに

$$
J_G(x)^{\mathsf T}\lambda
$$

が出るのは、制約写像の微分

$$
DG(x):X\to Y
$$

の随伴

$$
DG(x)^*:Y^*\to X^*
$$

が本体だからです。

---

## 16. Hilbert空間での随伴

$H_1,H_2$ をHilbert空間、$T:H_1\to H_2$ を有界線形作用素とします。

Banach空間としての随伴は

$$
T^*:H_2^*\to H_1^*
$$

ですが、Riesz表現により各双対空間を元のHilbert空間と対応付けられます。

その結果、一意な作用素

$$
T^\dagger:H_2\to H_1
$$

が存在して

$$
\boxed{
\langle Tx,y\rangle_{H_2}
=\langle x,T^\dagger y\rangle_{H_1}
}
$$

となります。

文献によってはこのHilbert随伴も $T^*$ と書きます。本教材では型を明確にしたい場面では $T^\dagger$ と書き分けます。

有限次元の実内積空間では

$$
T^\dagger=A^{\mathsf T}.
$$

---

## 17. 例：積分作用素の随伴

$H=L^2([0,1])$ とし

$$
(Tf)(s)
=\int_0^1K(s,t)f(t)\,dt
$$

とします。

適切な可積分性を仮定して積分順序を交換すると

$$
\begin{aligned}
\langle Tf,g\rangle
&=\int_0^1\int_0^1
K(s,t)f(t)g(s)\,dt\,ds\\
&=\int_0^1f(t)
\left(
\int_0^1K(s,t)g(s)\,ds
\right)dt.
\end{aligned}
$$

したがって

$$
\boxed{
(T^\dagger g)(t)
=\int_0^1K(s,t)g(s)\,ds
}
$$

です。

実数値ならkernelの二変数を入れ替えた形が現れます。

---

## 18. KKTへ向けた型チェック

制約写像

$$
G:X\to Y
$$

があるとします。

その微分は

$$
DG(x):X\to Y.
$$

乗数は

$$
\lambda\in Y^*.
$$

したがって

$$
DG(x)^*\lambda\in X^*.
$$

目的関数 $f:X\to\mathbb R$ の微分も

$$
Df(x)\in X^*.
$$

だから

$$
\boxed{
Df(x)+DG(x)^*\lambda=0
}
$$

という足し算が型として正しくなります。

有限次元の

$$
\nabla f(x)+J_G(x)^{\mathsf T}\lambda=0
$$

は、この式をEuclid内積でベクトル表示したものです。

---

## 19. 次の講義

[F0-02C4 凸解析・劣勾配・normal cone・双対錐](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md) では、制約付き最適化を

$$
0\in \partial f(x)+N_C(x)
$$

という一つの包含関係へまとめます。

KKTの乗数がなぜ法線を作るのか、その幾何側を準備します。

---

## 章末チェック

- 方向微分とFréchet微分の違いを説明できる。
- 実数値関数のFréchet微分が $X^*$ の元であることを説明できる。
- $\frac12\|x\|^2$ のHilbert勾配を求められる。
- 有界線形作用素と作用素ノルムを定義できる。
- 連鎖律を作用素の合成として説明できる。
- Banach随伴 $T^*:Y^*\to X^*$ の型を説明できる。
- 行列の転置が随伴作用素の有限次元表示であることを示せる。
