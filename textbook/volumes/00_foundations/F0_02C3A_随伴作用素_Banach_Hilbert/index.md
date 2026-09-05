# F0-02C3A 関数解析III-A：随伴作用素・Banach双対・Hilbert随伴

<!-- definition-example-audit: strict -->

有界線形作用素を出力側の汎関数から入力側へ引き戻す操作が随伴です。この章で随伴を表す記号とその型を定義し、Hilbert空間ではRiesz表現から存在・一意性・有界性まで証明します。

## 1. Banach空間での随伴作用素

有界線形作用素

$$
T:X\to Y
$$

を考えます。

<a id="def-f0-02c3a-banach-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Banach空間での随伴作用素）**  
> 有界線形作用素 $T:X\to Y$ に対し、$T^*:Y^*\to X^*$ を

$$
(T^*y^*)[x]=y^*[Tx]
$$

> で定めます。この $T^*$ を $T$ の **随伴作用素** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3a-banach-adjoint -->
**定義の確認**  
$T:\mathbb R\to\mathbb R^2$ を $T(x)=(x,2x)$ とし、$y^*(u,v)=au+bv$ とします。すると

$$
(T^*y^*)[x]
=y^*(x,2x)
=(a+2b)x.
$$

したがって $T^*y^*$ は確かに $\mathbb R$ 上の線形汎関数、すなわち $X^*$ の元です。型

$$
T^*:Y^*\to X^*
$$

が具体的に確認できます。
<!-- definition-example-end -->

つまり $T$ が $X$ から $Y$ へ進むのに対し、随伴は双対空間の上を逆向きに進みます。

---

## 2. なぜ逆向きになるのか

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

この合成 $y^*\circ T$ が $X$ 上の汎関数なので

$$
T^*y^*=y^*\circ T.
$$

「出力側の測定器を、入力側へ引き戻す」と考えると分かりやすくなります。

---

## 3. 有限次元では転置行列になる

$T:\mathbb R^p\to\mathbb R^m$ を

$$
T(x)=Ax
$$

とします。

$y^*\in(\mathbb R^m)^*$ をベクトル $\lambda\in\mathbb R^m$ で

$$
y^*(y)=\lambda^{\mathsf T}y
$$

と表すと

$$
(T^*y^*)(x)
=\lambda^{\mathsf T}Ax
=(A^{\mathsf T}\lambda)^{\mathsf T}x.
$$

したがって

$$
\boxed{T^*\lambda=A^{\mathsf T}\lambda}.
$$

KKTに $J_G(x)^{\mathsf T}\lambda$ が出るのは、制約写像の微分

$$
DG(x):X\to Y
$$

の随伴

$$
DG(x)^*:Y^*\to X^*
$$

が本体だからです。

---

## 4. Hilbert空間での随伴

$H_1,H_2$ を実Hilbert空間、$T:H_1\to H_2$ を有界線形作用素とします。

Banach空間としての随伴は

$$
T^*:H_2^*\to H_1^*
$$

ですが、Riesz表現により各双対空間を元のHilbert空間と対応付けられます。

<a id="def-f0-02c3a-hilbert-adjoint"></a>

<!-- formal-statement-start -->
> **定義（Hilbert随伴）**  
> Hilbert空間 $H_1,H_2$ の間の有界線形作用素 $T:H_1\to H_2$ に対し、作用素 $T^\dagger:H_2\to H_1$ が

$$
\langle Tx,y\rangle_{H_2}=\langle x,T^\dagger y\rangle_{H_1}
\qquad(\forall x\in H_1,\ \forall y\in H_2)
$$

> を満たすとき、$T^\dagger$ を $T$ の **Hilbert随伴** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3a-hilbert-adjoint -->
**定義の確認**  
$H_1=\mathbb R^p$、$H_2=\mathbb R^m$、$T(x)=Ax$ とします。$T^\dagger y=A^{\mathsf T}y$ と置けば

$$
\langle Ax,y\rangle
=x^{\mathsf T}A^{\mathsf T}y
=\langle x,A^{\mathsf T}y\rangle.
$$

したがって定義式をすべての $x,y$ で満たし、有限次元ではHilbert随伴が転置行列になることを確認できます。
<!-- definition-example-end -->

文献によってはこのHilbert随伴も $T^*$ と書きます。本教材では型を明確にしたい場面では $T^\dagger$ と書き分けます。

<a id="thm-f0-02c3a-hilbert-adjoint-existence"></a>

<!-- formal-statement-start -->
> **定理（Hilbert随伴の存在・一意性）**  
> 実Hilbert空間 $H_1,H_2$ と有界線形作用素 $T:H_1\to H_2$ に対し、Hilbert随伴 $T^\dagger:H_2\to H_1$ は一意に存在します。さらに $T^\dagger$ は有界線形作用素で

$$
\boxed{\|T^\dagger\|=\|T\|}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：各 $y$ を固定してRiesz表現を使う

$y\in H_2$ を固定し、$H_1$ 上の線形汎関数

$$
\varphi_y(x):=\langle Tx,y\rangle_{H_2}
$$

を考えます。Cauchy--Schwarz不等式と $T$ の有界性から

$$
|\varphi_y(x)|
\le\|Tx\|_{H_2}\|y\|_{H_2}
\le\|T\|\,\|x\|_{H_1}\|y\|_{H_2},
$$

従って $\varphi_y\in H_1^*$ です。

[Riesz表現定理](../F0_02C2_Riesz表現_双対空間/index.md#thm-f0-02c2-riesz) により、一意な $z_y\in H_1$ が存在して

$$
\varphi_y(x)=\langle x,z_y\rangle_{H_1}
\qquad(\forall x\in H_1)
$$

となります。そこで

$$
T^\dagger y:=z_y
$$

と定めれば

$$
\langle Tx,y\rangle_{H_2}=\langle x,T^\dagger y\rangle_{H_1}
$$

が成立します。

次に線形性を示します。$y_1,y_2\in H_2$、$a,b\in\mathbb R$ に対して任意の $x\in H_1$ で

$$
\begin{aligned}
\langle x,T^\dagger(ay_1+by_2)\rangle
&=\langle Tx,ay_1+by_2\rangle\\
&=\langle x,aT^\dagger y_1+bT^\dagger y_2\rangle.
\end{aligned}
$$

Riesz表現の一意性から

$$
T^\dagger(ay_1+by_2)=aT^\dagger y_1+bT^\dagger y_2.
$$

またRiesz表現では $\|z_y\|=\|\varphi_y\|$ なので

$$
\|T^\dagger y\|
=\|\varphi_y\|
\le\|T\|\,\|y\|,
$$

従って

$$
\|T^\dagger\|\le\|T\|.
$$

逆向きは、任意の $x\in H_1$ に対して

$$
\begin{aligned}
\|Tx\|
&=\sup_{\|y\|\le1}|\langle Tx,y\rangle|\\
&=\sup_{\|y\|\le1}|\langle x,T^\dagger y\rangle|\\
&\le\|x\|\,\|T^\dagger\|
\end{aligned}
$$

より $\|T\|\le\|T^\dagger\|$。したがって $\|T^\dagger\|=\|T\|$ です。

最後に、別の作用素 $S:H_2\to H_1$ も定義式を満たすなら、各 $y$ について

$$
\langle x,Sy\rangle=\langle Tx,y\rangle=\langle x,T^\dagger y\rangle
\qquad(\forall x)
$$

なので $Sy=T^\dagger y$。よって作用素としても一意です。$\square$
<!-- proof-end -->

---

## 5. 例：積分作用素の随伴

$H=L^2([0,1])$ とし

$$
(Tf)(s)=\int_0^1K(s,t)f(t)\,dt
$$

とします。

適切な可積分性を仮定して積分順序を交換すると

$$
\begin{aligned}
\langle Tf,g\rangle
&=\int_0^1\int_0^1K(s,t)f(t)g(s)\,dt\,ds\\
&=\int_0^1f(t)\left(\int_0^1K(s,t)g(s)\,ds\right)dt.
\end{aligned}
$$

したがって

$$
\boxed{(T^\dagger g)(t)=\int_0^1K(s,t)g(s)\,ds}
$$

です。実数値ならkernelの二変数を入れ替えた形が現れます。

---

## 6. KKTへ向けた型チェック

制約写像 $G:X\to Y$ があるとします。その微分は

$$
DG(x):X\to Y.
$$

乗数は $\lambda\in Y^*$ なので

$$
DG(x)^*\lambda\in X^*.
$$

目的関数 $f:X\to\mathbb R$ の微分も $Df(x)\in X^*$ だから

$$
\boxed{Df(x)+DG(x)^*\lambda=0}
$$

という足し算が型として正しくなります。

有限次元の

$$
\nabla f(x)+J_G(x)^{\mathsf T}\lambda=0
$$

は、この式をEuclid内積でベクトル表示したものです。

---

## 演習

### F0-02C3A-A01 行列の随伴

- Level: A
- 目安時間: 10分

$T(x)=Ax$ をEuclid空間間の線形写像とする。随伴が $A^{\mathsf T}$ で表されることを示せ。

<!-- solution-start -->
#### 詳細解答
$\langle Ax,y\rangle=x^{\mathsf T}A^{\mathsf T}y=\langle x,A^{\mathsf T}y\rangle$ なのでHilbert随伴は $A^{\mathsf T}$。
#### 本番答案
$\langle Ax,y\rangle=x^{\mathsf T}A^{\mathsf T}y=\langle x,A^{\mathsf T}y\rangle$ なのでHilbert随伴は $A^{\mathsf T}$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C3A-B01 積分作用素の随伴

- Level: B
- 目安時間: 15分

$(Tf)(s)=\int K(s,t)f(t)dt$ のHilbert随伴を、積分順序を交換できると仮定して求めよ。

<!-- solution-start -->
#### 詳細解答
$\langle Tf,g\rangle=\int f(t)[\int K(s,t)g(s)ds]dt$ より $(T^\dagger g)(t)=\int K(s,t)g(s)ds$。
#### 本番答案
$\langle Tf,g\rangle=\int f(t)[\int K(s,t)g(s)ds]dt$ より $(T^\dagger g)(t)=\int K(s,t)g(s)ds$。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C4 凸解析・劣勾配・normal cone](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md)**
