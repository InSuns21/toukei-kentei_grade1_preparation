# F0-02C3A 関数解析III-A：随伴作用素・Banach双対・Hilbert随伴

[F0-02C3](../F0_02C3_Frechet微分_線形作用素_随伴/index.md) では、実数値写像の Fréchet 微分を
$X^*$ の元として扱い、Hilbert 空間では Riesz 表現によってベクトルへ戻せることを見ました。

ここで制約写像や線形写像
$T:X\to Y$
が入ると、出力側 $Y$ の汎関数を $T$ と合成して、入力側 $X$ の汎関数へ戻したくなります。有限次元で
$A^{\mathsf T}\lambda$
と書いていた逆向きの操作を、この章で定義します。

この章では

~~~text
出力側の汎関数 y*
  ↓ T と合成する
入力側の汎関数 y*∘T
  ↓
双対空間の上を逆向きに進む写像
  ↓ 内積でベクトル表示する
元の Hilbert 空間の間を逆向きに進む写像
~~~

という順に、まず操作を作り、その後で名前と型を確定します。

---

## 1. 出力側の測定を入力側へ引き戻す

$X,Y$ をノルム空間、$T:X\to Y$ を有界線形写像とします。

$y^*\in Y^*$ は、$Y$ のベクトルを実数へ測る連続線形汎関数です。$x\in X$ を同じ測定器で測りたければ、

$$
x\xmapsto{T}Tx\xmapsto{y^*}y^*(Tx)
$$

と合成すればよいことになります。

この合成は $X$ 上の汎関数なので、出力側の測定器を入力側へ「引き戻す」操作と考えられます。

<a id="def-f0-02c3a-banach-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Banach空間での随伴作用素）**  
> 有界線形写像 $T:X\to Y$ に対し、$T^*:Y^*\to X^*$ を

$$
(T^*y^*)[x]=y^*[Tx]
$$

> で定める。この $T^*$ を $T$ の **随伴作用素** という。
<!-- formal-statement-end -->

つまり

$$
\boxed{T^*y^*=y^*\circ T}
$$

です。$T$ は $X\to Y$ へ進みますが、随伴は双対空間の上を

$$
\boxed{Y^*\to X^*}
$$

と逆向きに進みます。

<!-- definition-example-start: def-f0-02c3a-banach-adjoint -->
### 例：具体的な汎関数を引き戻す

**定義の確認**：$T^*y^*=y^*\circ T$ を具体的に計算し、出力側の汎関数が入力側へ戻ることを確かめます。

$T:\mathbb R^2\to\mathbb R$ を

$$
T(x_1,x_2)=2x_1-x_2
$$

とし、$y_a^*:\mathbb R\to\mathbb R$ を $y_a^*(r)=ar$ とします。このとき

$$
(T^*y_a^*)(x_1,x_2)
=
a(2x_1-x_2).
$$

確かに、実数側の汎関数 $y_a^*$ を $T$ と合成すると、$\mathbb R^2$ 上の線形汎関数へ戻っています。
<!-- definition-example-end -->

### 1.1 本当に $T^*y^*\in X^*$ になるのか

定義式を書くだけでは、$y^*\circ T$ が連続であることまでは確認できていません。ここを評価します。

$y^*\in Y^*$ と $x\in X$ に対して、双対ノルムの基本評価と作用素ノルムの基本評価を順に使うと

$$
\begin{aligned}
|(T^*y^*)[x]|
&=|y^*(Tx)|\\
&\le \|y^*\|_{Y^*}\,\|Tx\|_Y\\
&\le \|y^*\|_{Y^*}\,\|T\|\,\|x\|_X.
\end{aligned}
$$

したがって $T^*y^*$ は有界線形汎関数で、

$$
\boxed{
\|T^*y^*\|_{X^*}
\le
\|T\|\,\|y^*\|_{Y^*}
}
$$

です。

さらに $a,b\in\mathbb R$、$y_1^*,y_2^*\in Y^*$ に対し、任意の $x\in X$ について

$$
\begin{aligned}
[T^*(ay_1^*+by_2^*)](x)
&=(ay_1^*+by_2^*)(Tx)\\
&=a(T^*y_1^*)(x)+b(T^*y_2^*)(x)
\end{aligned}
$$

なので、$T^*:Y^*\to X^*$ 自身も線形です。上の評価から有界でもあり、

$$
\|T^*\|\le\|T\|
$$

が従います。

ここで重要なのは、**随伴を定義した後に、型 $Y^*\to X^*$ が本当に成立することを有界性評価で確かめた**点です。

---

## 2. 有限次元では転置行列になる

$T:\mathbb R^p\to\mathbb R^m$ を

$$
T(x)=Ax
$$

とします。Euclid 内積を使って $y^*\in(\mathbb R^m)^*$ を係数ベクトル
$\lambda\in\mathbb R^m$ により

$$
y^*(y)=\lambda^{\mathsf T}y
$$

と表します。

すると

$$
\begin{aligned}
(T^*y^*)(x)
&=y^*(Ax)\\
&=\lambda^{\mathsf T}Ax\\
&=(A^{\mathsf T}\lambda)^{\mathsf T}x.
\end{aligned}
$$

従って、$T^*y^*$ を表す係数ベクトルは $A^{\mathsf T}\lambda$ です。

$$
\boxed{
\text{有限次元の随伴}
\longleftrightarrow
\text{転置行列}
}
$$

となります。

有限次元の KKT 条件に

$$
J_G(x)^{\mathsf T}\lambda
$$

が現れるのは、制約写像の Fréchet 微分

$$
DG(x):X\to Y
$$

の随伴

$$
DG(x)^*:Y^*\to X^*
$$

を座標で書いているからです。

---

## 3. Hilbert空間では双対空間を元の空間へ戻せる

Banach 空間の随伴は

$$
T^*:H_2^*\to H_1^*
$$

という双対空間の間の作用素です。

一方、Hilbert 空間では [Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation) により、連続線形汎関数を一意なベクトルで表せます。そこで随伴も、双対空間を経由した後で元の Hilbert 空間へ戻せます。

$H_1,H_2$ を実 Hilbert 空間、$T:H_1\to H_2$ を有界線形写像とします。$y\in H_2$ を固定し、

$$
\phi_y(x):=\langle Tx,y\rangle_{H_2}
$$

と置きます。

Cauchy--Schwarz の不等式と $T$ の有界性から

$$
\begin{aligned}
|\phi_y(x)|
&\le \|Tx\|_{H_2}\,\|y\|_{H_2}\\
&\le \|T\|\,\|x\|_{H_1}\,\|y\|_{H_2}.
\end{aligned}
$$

したがって $\phi_y\in H_1^*$ です。Riesz 表現定理を $\phi_y$ に適用すると、一意な $z_y\in H_1$ が存在して

$$
\phi_y(x)
=
\langle z_y,x\rangle_{H_1}
=
\langle x,z_y\rangle_{H_1}
$$

となります。最後の等号では実 Hilbert 空間の内積の対称性を使いました。

そこで $T^\dagger y:=z_y$ と置きます。

<a id="def-f0-02c3a-hilbert-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Hilbert随伴）**  
> 実 Hilbert 空間 $H_1,H_2$ の間の有界線形写像 $T:H_1\to H_2$ に対し、

$$
\langle Tx,y\rangle_{H_2}
=
\langle x,T^\dagger y\rangle_{H_1}
$$

> をすべての $x\in H_1$, $y\in H_2$ について満たす作用素
> $T^\dagger:H_2\to H_1$ を $T$ の **Hilbert随伴** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3a-hilbert-adjoint -->
### 例：行列の場合

**定義の確認**：内積恒等式を直接計算し、Hilbert 随伴が転置行列で表されることを確かめます。

$T(x)=Ax$ なら

$$
\langle Ax,y\rangle
=
x^{\mathsf T}A^{\mathsf T}y
=
\langle x,A^{\mathsf T}y\rangle.
$$

従って

$$
\boxed{T^\dagger y=A^{\mathsf T}y}.
$$

Hilbert 随伴も有限次元では転置行列になります。
<!-- definition-example-end -->

上の Riesz 表現による構成で各 $y$ に対応する $T^\dagger y$ が存在し、一意であることまでは分かりました。$y\mapsto T^\dagger y$ の線形性・有界性まで含めた完全な証明は、次の
[F0-02C3B「Fréchet連鎖律とHilbert随伴の証明」](../F0_02C3B_Frechet_chain_adjoint_proofs/index.md#thm-f0-02c3b-hilbert-adjoint)
で閉じます。

文献では Banach 随伴と Hilbert 随伴の両方を $T^*$ と書くことがあります。本教材では型を見失わないため、必要な場面では

$$
T^*:Y^*\to X^*,
\qquad
T^\dagger:H_2\to H_1
$$

と書き分けます。

---

## 4. 例：一方向を測って一方向へ出力する写像

積分順序交換のような追加の測度論を使わず、無限次元でもそのまま使える例を考えます。

実 Hilbert 空間 $H_1,H_2$ で $a\in H_1$、$b\in H_2$ を固定し、

$$
Tx
=
\langle x,a\rangle_{H_1} b
$$

と定めます。入力 $x$ から $a$ 方向の成分を一つの実数として取り出し、その大きさだけ $b$ を出力する作用素です。

まず [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
\|Tx\|_{H_2}
&=
|\langle x,a\rangle|\,\|b\|\\
&\le
\|a\|\,\|b\|\,\|x\|
\end{aligned}
$$

なので、$T$ は有界線形作用素です。

次に $y\in H_2$ に対して

$$
\begin{aligned}
\langle Tx,y\rangle_{H_2}
&=
\langle x,a\rangle_{H_1}\langle b,y\rangle_{H_2}\\
&=
\left\langle
x,
\langle b,y\rangle_{H_2}a
\right\rangle_{H_1}.
\end{aligned}
$$

従って Hilbert 随伴は

$$
\boxed{
T^\dagger y
=
\langle b,y\rangle_{H_2}a
}
$$

です。

元の作用素が「$a$ で測って $b$ を出す」のに対し、随伴は「$b$ で測って $a$ を出す」ので、入力側と出力側の役割が入れ替わる様子が見えます。

---

## 5. KKTの停留条件を型から読む

制約写像

$$
G:X\to Y
$$

が Fréchet 微分可能だとします。その微分は

$$
DG(x):X\to Y.
$$

乗数は

$$
\lambda\in Y^*.
$$

Banach 随伴を取ると

$$
DG(x)^*\lambda\in X^*.
$$

一方、目的関数 $f:X\to\mathbb R$ の微分も

$$
Df(x)\in X^*.
$$

したがって

$$
\boxed{
Df(x)+DG(x)^*\lambda=0
}
$$

という和は、どちらも $X^*$ の元なので型として意味を持ちます。

有限次元で Euclid 内積を使って双対空間をベクトル表示すると、

$$
Df(x)\leftrightarrow\nabla f(x),
\qquad
DG(x)^*\lambda
\leftrightarrow
J_G(x)^{\mathsf T}\lambda,
$$

となり、通常の

$$
\nabla f(x)+J_G(x)^{\mathsf T}\lambda=0
$$

が戻ります。

---

## 演習

### F0-02C3A-A01 行列のHilbert随伴

- Level: A

$A\in\mathbb R^{m\times p}$ とし、$T(x)=Ax$ を Euclid 空間間の線形写像とする。
$T^\dagger=A^{\mathsf T}$ であることを定義から示せ。

<!-- solution-start -->
### 詳細解答

任意の $x\in\mathbb R^p$、$y\in\mathbb R^m$ に対して

$$
\begin{aligned}
\langle Tx,y\rangle
&=(Ax)^{\mathsf T}y\\
&=x^{\mathsf T}A^{\mathsf T}y\\
&=\langle x,A^{\mathsf T}y\rangle.
\end{aligned}
$$

Hilbert 随伴はこの内積恒等式を満たす作用素なので、

$$
\boxed{T^\dagger=A^{\mathsf T}}.
$$
<!-- solution-end -->

### F0-02C3A-A02 具体的なBanach随伴

- Level: A

$T:\mathbb R^2\to\mathbb R$ を

$$
T(x_1,x_2)=2x_1-x_2
$$

とする。$y_a^*(r)=ar$ とおくとき、$T^*y_a^*$ を求めよ。さらに Euclid ノルムに関する
$\|T^*y_a^*\|$ を求めよ。

<!-- solution-start -->
### 詳細解答

定義から

$$
(T^*y_a^*)(x_1,x_2)
=
y_a^*(T(x_1,x_2))
=
a(2x_1-x_2).
$$

従って係数ベクトルは

$$
a(2,-1)
$$

です。Euclid ノルムに対する双対ノルムは係数ベクトルの Euclid ノルムに等しいので、

$$
\boxed{
\|T^*y_a^*\|
=
|a|\sqrt5
}.
$$

また $\|T\|=\sqrt5$、$\|y_a^*\|=|a|$ なので、この例では

$$
\|T^*y_a^*\|
=
\|T\|\,\|y_a^*\|
$$

と上界が達成されています。
<!-- solution-end -->

### F0-02C3A-A03 恒等写像と零写像の引き戻し

- Level: A

ノルム空間 $X$ 上の恒等写像 $I:X\to X$ と零写像 $0:X\to X$ について、

$$
I^*=I_{X^*},
\qquad
0^*=0
$$

を示せ。

<!-- solution-start -->
### 詳細解答

任意の $x^*\in X^*$ と $x\in X$ に対して

$$
(I^*x^*)(x)
=
x^*(Ix)
=
x^*(x).
$$

従って $I^*x^*=x^*$ であり、

$$
\boxed{I^*=I_{X^*}}.
$$

同様に

$$
(0^*x^*)(x)
=
x^*(0x)
=
x^*(0)
=
0
$$

なので

$$
\boxed{0^*=0}.
$$
<!-- solution-end -->

### F0-02C3A-A04 直交射影は自己随伴

- Level: A

$H$ を実 Hilbert 空間、$M\subset H$ を閉線形部分空間とし、$P_M$ を $M$ への直交射影とする。
$P_M^\dagger=P_M$ を示せ。

<!-- solution-start -->
### 詳細解答

任意の $x,y\in H$ を直交分解して

$$
x=P_Mx+x_\perp,
\qquad
y=P_My+y_\perp,
$$

と書きます。ここで $x_\perp,y_\perp\in M^\perp$ です。

$P_Mx,P_My\in M$ なので

$$
\langle P_Mx,y_\perp\rangle=0,
\qquad
\langle x_\perp,P_My\rangle=0.
$$

従って

$$
\begin{aligned}
\langle P_Mx,y\rangle
&=\langle P_Mx,P_My\rangle\\
&=\langle x,P_My\rangle.
\end{aligned}
$$

Hilbert 随伴の定義から

$$
\boxed{P_M^\dagger=P_M}.
$$
<!-- solution-end -->

### F0-02C3A-B01 Banach随伴が有界作用素になることを証明する

- Level: B

$T:X\to Y$ を有界線形写像とする。定義

$$
(T^*y^*)(x)=y^*(Tx)
$$

から、$T^*:Y^*\to X^*$ が有界線形写像であり

$$
\|T^*\|\le\|T\|
$$

を満たすことを示せ。

<!-- solution-start -->
### 詳細解答

まず $y^*\in Y^*$ を固定します。任意の $x\in X$ に対し

$$
\begin{aligned}
|(T^*y^*)(x)|
&=|y^*(Tx)|\\
&\le\|y^*\|\,\|Tx\|\\
&\le\|y^*\|\,\|T\|\,\|x\|.
\end{aligned}
$$

従って $T^*y^*$ は有界線形汎関数で、

$$
\|T^*y^*\|
\le
\|T\|\,\|y^*\|.
$$

よって $T^*$ は確かに $Y^*$ から $X^*$ への写像です。

次に $a,b\in\mathbb R$ と $y_1^*,y_2^*\in Y^*$ に対して、任意の $x$ で

$$
\begin{aligned}
[T^*(ay_1^*+by_2^*)](x)
&=(ay_1^*+by_2^*)(Tx)\\
&=a(T^*y_1^*)(x)+b(T^*y_2^*)(x).
\end{aligned}
$$

従って $T^*$ は線形です。

最後に $\|y^*\|\le1$ として上の評価の上限を取れば

$$
\|T^*\|
=
\sup_{\|y^*\|\le1}\|T^*y^*\|
\le
\|T\|.
$$

従って

$$
\boxed{\|T^*\|\le\|T\|}.
$$
<!-- solution-end -->

### F0-02C3A-B02 $Tx=\langle x,a\rangle b$ の随伴と作用素ノルム

- Level: B

実 Hilbert 空間 $H_1,H_2$ で $0\ne a\in H_1$、$0\ne b\in H_2$ とし、

$$
Tx=\langle x,a\rangle b
$$

と定める。

1. $T^\dagger y=\langle b,y\rangle a$ を示せ。
2. $\|T\|=\|a\|\,\|b\|$ を示せ。
3. $\|T^\dagger\|=\|T\|$ をこの例で確認せよ。

<!-- solution-start -->
### 詳細解答

1. 任意の $x\in H_1$、$y\in H_2$ に対して

$$
\begin{aligned}
\langle Tx,y\rangle
&=
\langle x,a\rangle\langle b,y\rangle\\
&=
\langle x,\langle b,y\rangle a\rangle.
\end{aligned}
$$

従って随伴の定義から

$$
\boxed{
T^\dagger y
=
\langle b,y\rangle a
}.
$$

2. [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\|Tx\|
=
|\langle x,a\rangle|\,\|b\|
\le
\|a\|\,\|b\|\,\|x\|,
$$

したがって

$$
\|T\|\le\|a\|\,\|b\|.
$$

一方、

$$
x=\frac{a}{\|a\|}
$$

と取れば $\|x\|=1$ で

$$
\|Tx\|
=
\left|
\left\langle
\frac{a}{\|a\|},a
\right\rangle
\right|\|b\|
=
\|a\|\,\|b\|.
$$

よって

$$
\boxed{
\|T\|=\|a\|\,\|b\|
}.
$$

3. $T^\dagger$ は $a$ と $b$ の役割を交換した同じ形の作用素なので、同じ計算から

$$
\|T^\dagger\|
=
\|b\|\,\|a\|
=
\boxed{\|T\|}.
$$
<!-- solution-end -->

### F0-02C3A-B03 合成を取ると随伴の順序が逆になる

- Level: B

$T:X\to Y$、$S:Y\to Z$ を有界線形写像とする。

$$
(S\circ T)^*
=
T^*\circ S^*
$$

を、両辺の型を確認した上で示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
S^*:Z^*\to Y^*,
\qquad
T^*:Y^*\to X^*
$$

なので

$$
T^*\circ S^*:Z^*\to X^*
$$

です。一方

$$
S\circ T:X\to Z
$$

なので

$$
(S\circ T)^*:Z^*\to X^*.
$$

従って両辺の型は一致しています。

$z^*\in Z^*$ と $x\in X$ に対して

$$
\begin{aligned}
[(T^*\circ S^*)z^*](x)
&=[S^*z^*](Tx)\\
&=z^*(S(Tx))\\
&=[(S\circ T)^*z^*](x).
\end{aligned}
$$

任意の $z^*$ と $x$ について一致するので

$$
\boxed{
(S\circ T)^*=T^*\circ S^*
}.
$$
<!-- solution-end -->

### F0-02C3A-C01 最小二乗と正規方程式

- Level: C

$H_1,H_2$ を実 Hilbert 空間、$T:H_1\to H_2$ を有界線形写像、$y\in H_2$ とし、

$$
J(x)=\frac12\|Tx-y\|_{H_2}^2
$$

とする。

1. $J$ の Fréchet 微分を求めよ。
2. $x$ が停留点であるための条件を $T^\dagger$ を使って書け。
3. この条件が、残差 $r=y-Tx$ が $\operatorname{ran}T$ に直交することと同値であることを示せ。
4. 有限次元で $T(x)=Ax$ とすると、どの方程式になるか。

<!-- solution-start -->
### 詳細解答

1. $h\in H_1$ に対して

$$
\begin{aligned}
J(x+h)-J(x)
&=
\frac12\|Tx-y+Th\|^2
-
\frac12\|Tx-y\|^2\\
&=
\langle Tx-y,Th\rangle
+
\frac12\|Th\|^2.
\end{aligned}
$$

最後の項は

$$
0\le
\frac{\frac12\|Th\|^2}{\|h\|}
\le
\frac12\|T\|^2\|h\|
\to0
$$

なので、Fréchet 微分は

$$
DJ(x)[h]
=
\langle Tx-y,Th\rangle.
$$

Hilbert 随伴の定義を使うと

$$
DJ(x)[h]
=
\langle T^\dagger(Tx-y),h\rangle.
$$

2. 停留点では $DJ(x)=0$ です。Riesz 表現の一意性から

$$
\boxed{
T^\dagger(Tx-y)=0
}.
$$

3. $r=y-Tx$ と置きます。上の条件は、任意の $h\in H_1$ に対して

$$
0
=
\langle Tx-y,Th\rangle
=
-\langle r,Th\rangle
$$

となることと同値です。

$\operatorname{ran}T$ の任意の元は $Th$ と書けるので、

$$
\boxed{
r\perp\operatorname{ran}T
}.
$$

4. 有限次元では $T^\dagger=A^{\mathsf T}$ なので、

$$
\boxed{
A^{\mathsf T}(Ax-y)=0
}
$$

となります。これは最小二乗法の正規方程式です。
<!-- solution-end -->

---

## 章末チェック

- Banach 随伴 $T^*:Y^*\to X^*$ を「汎関数と作用素の合成」として説明できる。
- $T^*y^*\in X^*$ を有界性評価から確認し、$\|T^*\|\le\|T\|$ を示せる。
- 有限次元で随伴が転置行列になることを導ける。
- Riesz 表現から Hilbert 随伴が現れる理由を説明できる。
- $Tx=\langle x,a\rangle b$ 型の具体例で、有界性を確認して随伴と作用素ノルムを求められる。
- 合成の随伴で作用素の順序が逆になることを型付きで示せる。
- 最小二乗の停留条件を $T^\dagger(Tx-y)=0$ と書き、残差の直交性へ読み替えられる。

---

## 次に進む

次は [F0-02C3B Fréchet連鎖律とHilbert随伴の証明](../F0_02C3B_Frechet_chain_adjoint_proofs/index.md) です。ここで Riesz 表現から $T^\dagger$ の線形性・有界性・一意性を最後まで証明し、Fréchet 連鎖律の残差評価も再構成します。
