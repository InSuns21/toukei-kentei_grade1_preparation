# F0-02C3B Fréchet連鎖律・Hilbert随伴の証明

C3 では Fréchet 微分を「一次近似を与える有界線形写像」として定義し、C3A では随伴が「出力側の測定を入力側へ戻す」操作であることを学びました。

この章では、その二つを**証明として自力で再構成できるところまで閉じます**。焦点は公式そのものではなく、次の二つの非自明な橋です。

~~~text
f の残差は o(||h||)
g の残差は o(||k||)
        ↓ k=f(x+h)-f(x)=O(||h||) を確認する
合成後の残差も o(||h||)

y を固定する
        ↓ x↦<Tx,y> が連続線形汎関数だと確認する
Riesz 表現
        ↓
T†y を得る
        ↓ y に関する線形性・有界性・一意性を確認する
Hilbert 随伴
~~~

「[連鎖律](../RA3/index.md#prop-ra3-chain-rule)より」「Riesz 表現より」で完成式へ飛ばず、どの量に定理を適用し、どの評価が必要かを順に追います。

---

## 1. Fréchet微分を残差で書く

$f:X\to Y$ が $x$ で Fréchet 微分可能で

$$
A:=Df(x)
$$

とします。定義を書き換えると

$$
f(x+h)=f(x)+Ah+r_f(h)
$$

であり、

$$
\frac{\|r_f(h)\|_Y}{\|h\|_X}\to0
\qquad(h\to0)
$$

です。

同じく、$g:Y\to Z$ が

$$
y_0:=f(x)
$$

で Fréchet 微分可能で

$$
B:=Dg(y_0)
$$

とします。このとき

$$
g(y_0+k)=g(y_0)+Bk+r_g(k),
$$

$$
\frac{\|r_g(k)\|_Z}{\|k\|_Y}\to0
\qquad(k\to0).
$$

ここで注意すべき点は、$g$ の残差評価は $k$ に対する評価だということです。合成 $g\circ f$ では

$$
k=f(x+h)-f(x)
$$

が現れるので、**$k$ が $h$ と同程度以下の大きさであること**を先に示さなければなりません。

---

## 2. なぜ $f(x+h)-f(x)=O(\|h\|)$ なのか

上の残差表示から

$$
k(h):=f(x+h)-f(x)=Ah+r_f(h).
$$

$r_f(h)=o(\|h\|)$ なので、例えば $h$ が十分 0 に近ければ

$$
\|r_f(h)\|\le \|h\|
$$

とできます。また $A$ は有界線形写像なので

$$
\|Ah\|\le\|A\|\,\|h\|.
$$

したがって十分小さい $h$ について

$$
\begin{aligned}
\|k(h)\|
&\le \|Ah\|+\|r_f(h)\|\\
&\le (\|A\|+1)\|h\|.
\end{aligned}
$$

よって

$$
\boxed{k(h)=O(\|h\|)}
$$

です。特に $h\to0$ なら $k(h)\to0$ です。

この一段を確認して初めて、$g$ の残差評価を $k(h)$ に代入できます。

---

## 3. Fréchet連鎖律を残差から再構成する

Fréchet 連鎖律の formal statement の正本は [F0-02C3](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#thm-f0-02c3-frechet-composition) にあります。ここでは証明の核心を再構成します。

$X,Y,Z$ をノルム空間とし、$f:X\to Y$ が $x$ で Fréchet 微分可能、$g:Y\to Z$ が $f(x)$ で Fréchet 微分可能とします。

すると

$$
\boxed{
D(g\circ f)(x)
=
Dg(f(x))\circ Df(x)
}
$$

です。

<!-- proof-start -->
### 証明

$$
A:=Df(x),
\qquad
B:=Dg(f(x))
$$

と置きます。前節の

$$
k(h)=Ah+r_f(h)=f(x+h)-f(x)
$$

を使うと、

$$
g(f(x+h))
=
g(f(x)+k(h)).
$$

$g$ の残差表示を、増分 $k=k(h)$ に適用して

$$
g(f(x+h))
=
g(f(x))+Bk(h)+r_g(k(h)).
$$

さらに $k(h)=Ah+r_f(h)$ を代入すると

$$
\begin{aligned}
g(f(x+h))-g(f(x))
&=
B(Ah+r_f(h))+r_g(k(h))\\
&=
BAh+B r_f(h)+r_g(k(h)).
\end{aligned}
$$

したがって、候補となる一次写像は $BA$ で、残差は

$$
R(h)
=
B r_f(h)+r_g(k(h))
$$

です。

第1項は

$$
\frac{\|B r_f(h)\|}{\|h\|}
\le
\|B\|
\frac{\|r_f(h)\|}{\|h\|}
\to0.
$$

第2項を考えます。$k(h)\ne0$ なら

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}.
$$

第1因子は $k(h)\to0$ と $g$ の Fréchet 微分可能性から 0 へ収束します。第2因子は前節の

$$
\|k(h)\|
\le
(\|A\|+1)\|h\|
$$

により、十分小さい $h$ で $\|A\|+1$ 以下です。従って積は 0 へ収束します。

もし $k(h)=0$ なら、残差の定義

$$
r_g(k)
=
g(f(x)+k)-g(f(x))-Bk
$$

へ $k=0$ を代入して

$$
r_g(0)=0
$$

なので、この場合も

$$
\frac{\|r_g(k(h))\|}{\|h\|}=0.
$$

以上から

$$
\frac{\|R(h)\|}{\|h\|}
\to0.
$$

従って

$$
D(g\circ f)(x)
=
BA
=
Dg(f(x))\circ Df(x).
$$
<!-- proof-end -->

有限次元の

$$
J_{g\circ f}(x)
=
J_g(f(x))J_f(x)
$$

は、この定理を基底で行列表示したものです。

---

## 4. 例：二乗ノルムとの合成

実 Hilbert 空間 $H_1,H_2$、有界線形写像 $T:H_1\to H_2$ と $y\in H_2$ に対し

$$
J(x)
=
\frac12\|Tx-y\|_{H_2}^2
$$

とします。

まず

$$
F(x):=Tx-y,
\qquad
q(z):=\frac12\|z\|_{H_2}^2
$$

と分けると $J=q\circ F$ です。

$F$ は線形部分が $T$ なので

$$
DF(x)[h]=Th.
$$

また

$$
\begin{aligned}
q(z+k)-q(z)
&=
\frac12\|z+k\|^2-\frac12\|z\|^2\\
&=
\langle z,k\rangle
+
\frac12\|k\|^2.
\end{aligned}
$$

最後の項は

$$
\frac{\frac12\|k\|^2}{\|k\|}
=
\frac12\|k\|
\to0
$$

だから

$$
Dq(z)[k]=\langle z,k\rangle.
$$

連鎖律を $F$ と $q$ に適用すると

$$
\boxed{
DJ(x)[h]
=
\langle Tx-y,Th\rangle
}.
$$

次に、この右辺を入力側 $h$ との内積へ戻すために Hilbert 随伴を構成します。

---

## 5. Riesz表現を適用する前に連続線形汎関数だと確認する

$T:H_1\to H_2$ を有界線形写像とし、$y\in H_2$ を固定します。

$$
\phi_y(x)
:=
\langle Tx,y\rangle_{H_2}
$$

と置きます。

$x$ に関する線形性は $T$ と内積の線形性から従います。有界性は
[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)
と $T$ の作用素ノルム評価を順に使って

$$
\begin{aligned}
|\phi_y(x)|
&=
|\langle Tx,y\rangle|\\
&\le
\|Tx\|\,\|y\|\\
&\le
\|T\|\,\|x\|\,\|y\|.
\end{aligned}
$$

従って

$$
\phi_y\in H_1^*,
\qquad
\|\phi_y\|
\le
\|T\|\,\|y\|.
$$

ここまで確認したことで、[Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)を $\phi_y$ に適用できます。

---

## 6. Hilbert随伴の存在・一意性

<a id="thm-f0-02c3b-hilbert-adjoint"></a>

<!-- formal-statement-start -->
> **定理（Hilbert随伴の存在・一意性）**  
> 実 Hilbert 空間 $H_1,H_2$ と有界線形写像 $T:H_1\to H_2$ に対し、一意な有界線形写像 $T^\dagger:H_2\to H_1$ が存在し、

$$
\boxed{
\langle Tx,y\rangle_{H_2}
=
\langle x,T^\dagger y\rangle_{H_1}
}
$$

> をすべての $x\in H_1$, $y\in H_2$ について満たす。さらに

$$
\boxed{
\|T^\dagger\|=\|T\|
}
$$

> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 6.1 各 $y$ から一つのベクトルを作る

固定した $y\in H_2$ に対して

$$
\phi_y(x)=\langle Tx,y\rangle
$$

と置きました。前節で $\phi_y\in H_1^*$ を確認済みです。

Riesz 表現定理を $\phi_y$ に適用すると、一意な $z_y\in H_1$ が存在して

$$
\phi_y(x)
=
\langle x,z_y\rangle_{H_1}
\qquad(\forall x\in H_1)
$$

となります。そこで

$$
T^\dagger y:=z_y
$$

と定めます。この時点で

$$
\langle Tx,y\rangle
=
\langle x,T^\dagger y\rangle
$$

が成り立ちます。

#### 6.2 $y\mapsto T^\dagger y$ の線形性

$a,b\in\mathbb R$、$y_1,y_2\in H_2$ とします。任意の $x\in H_1$ について

$$
\begin{aligned}
\langle x,T^\dagger(ay_1+by_2)\rangle
&=
\langle Tx,ay_1+by_2\rangle\\
&=
a\langle Tx,y_1\rangle
+b\langle Tx,y_2\rangle\\
&=
\langle x,aT^\dagger y_1+bT^\dagger y_2\rangle.
\end{aligned}
$$

従って

$$
\left\langle
x,
T^\dagger(ay_1+by_2)
-aT^\dagger y_1-bT^\dagger y_2
\right\rangle
=
0
$$

がすべての $x$ で成り立ちます。

ここで

$$
x=
T^\dagger(ay_1+by_2)
-aT^\dagger y_1-bT^\dagger y_2
$$

と取れば、このベクトルのノルムの二乗が 0 になります。従って

$$
T^\dagger(ay_1+by_2)
=
aT^\dagger y_1+bT^\dagger y_2.
$$

よって $T^\dagger$ は線形です。

#### 6.3 有界性と $\|T^\dagger\|\le\|T\|$

[Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)のノルム一致から

$$
\|T^\dagger y\|
=
\|\phi_y\|.
$$

前節の評価を代入して

$$
\|T^\dagger y\|
\le
\|T\|\,\|y\|.
$$

従って

$$
\|T^\dagger\|
\le
\|T\|.
$$

#### 6.4 逆向きのノルム評価

$x\in H_1$ を固定します。$Tx=0$ なら

$$
\|Tx\|
\le
\|T^\dagger\|\,\|x\|
$$

は成り立ちます。

$Tx\ne0$ なら

$$
y:=\frac{Tx}{\|Tx\|}
$$

と取ると $\|y\|=1$ で

$$
\begin{aligned}
\|Tx\|
&=
\left\langle
Tx,
\frac{Tx}{\|Tx\|}
\right\rangle\\
&=
\langle x,T^\dagger y\rangle\\
&\le
\|x\|\,\|T^\dagger y\|\\
&\le
\|T^\dagger\|\,\|x\|.
\end{aligned}
$$

ここでも [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)を使いました。従って任意の $x$ に対して

$$
\|Tx\|
\le
\|T^\dagger\|\,\|x\|,
$$

ゆえに

$$
\|T\|
\le
\|T^\dagger\|.
$$

6.3 と合わせて

$$
\|T^\dagger\|
=
\|T\|.
$$

#### 6.5 一意性

別の有界線形写像 $S:H_2\to H_1$ も

$$
\langle Tx,y\rangle
=
\langle x,Sy\rangle
$$

を満たすとします。すると任意の $x,y$ に対し

$$
\langle x,(S-T^\dagger)y\rangle=0.
$$

固定した $y$ に対して

$$
x=(S-T^\dagger)y
$$

と取れば

$$
\|(S-T^\dagger)y\|^2=0.
$$

従って $(S-T^\dagger)y=0$ がすべての $y$ で成り立ち、

$$
S=T^\dagger.
$$

以上で存在・線形性・有界性・ノルム一致・一意性が示されました。
<!-- proof-end -->

---

## 7. 行列の場合

$T(x)=Ax$、Euclid 内積なら

$$
\begin{aligned}
\langle Ax,y\rangle
&=
(Ax)^{\mathsf T}y\\
&=
x^{\mathsf T}A^{\mathsf T}y\\
&=
\langle x,A^{\mathsf T}y\rangle.
\end{aligned}
$$

従って

$$
\boxed{
T^\dagger=A^{\mathsf T}
}.
$$

有限次元の転置行列は、Hilbert 随伴の座標表示です。

---

# 演習

## A問題

### F0-02C3B-A01 残差から $O(\|h\|)$ を作る

- Level: A

$f(x+h)=f(x)+Ah+r_f(h)$、$r_f(h)=o(\|h\|)$ とする。
$k(h):=Ah+r_f(h)$ が $O(\|h\|)$ であり、特に $k(h)\to0$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

$r_f(h)=o(\|h\|)$ なので、$h$ が十分小さければ

$$
\|r_f(h)\|
\le
\|h\|
$$

とできます。一方 $A$ は有界線形写像なので

$$
\|Ah\|
\le
\|A\|\,\|h\|.
$$

従って

$$
\begin{aligned}
\|k(h)\|
&\le
\|Ah\|+\|r_f(h)\|\\
&\le
(\|A\|+1)\|h\|.
\end{aligned}
$$

よって $k(h)=O(\|h\|)$ です。右辺は $h\to0$ で 0 へ行くため $k(h)\to0$ も従います。
<!-- solution-end -->

### F0-02C3B-A02 二乗ノルムのFréchet微分

- Level: A

実 Hilbert 空間 $H$ 上で

$$
q(z)=\frac12\|z\|^2
$$

とする。$Dq(z)[k]=\langle z,k\rangle$ を、残差評価まで含めて示せ。

<!-- solution-start -->
#### 詳細解答

内積の双線形性から

$$
\begin{aligned}
q(z+k)-q(z)
&=
\frac12\langle z+k,z+k\rangle
-
\frac12\langle z,z\rangle\\
&=
\langle z,k\rangle
+
\frac12\|k\|^2.
\end{aligned}
$$

候補となる線形写像を

$$
L_z(k):=\langle z,k\rangle
$$

と置きます。[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|L_z(k)|
\le
\|z\|\,\|k\|
$$

なので $L_z$ は有界線形汎関数です。

残差は $\frac12\|k\|^2$ で、

$$
\frac{\frac12\|k\|^2}{\|k\|}
=
\frac12\|k\|
\to0.
$$

従って

$$
\boxed{
Dq(z)[k]=\langle z,k\rangle
}.
$$
<!-- solution-end -->

### F0-02C3B-A03 Rieszを適用できることを確認する

- Level: A

$T:H_1\to H_2$ を実 Hilbert 空間間の有界線形写像、$y\in H_2$ とし、

$$
\phi_y(x)=\langle Tx,y\rangle
$$

と置く。$\phi_y\in H_1^*$ と

$$
\|\phi_y\|
\le
\|T\|\,\|y\|
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$T$ と内積の第1変数についての線形性から、$\phi_y$ は $x$ に関して線形です。

また [Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)と作用素ノルムの評価から

$$
\begin{aligned}
|\phi_y(x)|
&=
|\langle Tx,y\rangle|\\
&\le
\|Tx\|\,\|y\|\\
&\le
\|T\|\,\|x\|\,\|y\|.
\end{aligned}
$$

従って $\phi_y$ は有界線形汎関数で、

$$
\boxed{
\|\phi_y\|
\le
\|T\|\,\|y\|
}.
$$
<!-- solution-end -->

### F0-02C3B-A04 行列の随伴

- Level: A

$A\in\mathbb R^{m\times n}$ に対し、$T(x)=Ax$ とする。Euclid 内積に関する Hilbert 随伴が

$$
T^\dagger(y)=A^{\mathsf T}y
$$

であることを示せ。

<!-- solution-start -->
#### 詳細解答

任意の $x\in\mathbb R^n$、$y\in\mathbb R^m$ に対して

$$
\begin{aligned}
\langle Tx,y\rangle
&=
(Ax)^{\mathsf T}y\\
&=
x^{\mathsf T}A^{\mathsf T}y\\
&=
\langle x,A^{\mathsf T}y\rangle.
\end{aligned}
$$

[Hilbert随伴の存在・一意性](#thm-f0-02c3b-hilbert-adjoint)から

$$
\boxed{
T^\dagger=A^{\mathsf T}
}.
$$
<!-- solution-end -->

## B問題

### F0-02C3B-B01 連鎖律の第2残差

- Level: B

連鎖律の証明で

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}
$$

と分解する理由と、右辺が 0 に収束する理由を説明せよ。$k(h)=0$ の場合も扱え。

<!-- solution-start -->
#### 詳細解答

$g$ の Fréchet 微分可能性が直接与えるのは

$$
\frac{\|r_g(k)\|}{\|k\|}
\to0
\qquad(k\to0)
$$

です。そこで $k=k(h)$ を代入した形を使うため、$\|k(h)\|$ を一度掛けて割ります。

A01 より

$$
k(h)\to0,
\qquad
\frac{\|k(h)\|}{\|h\|}
\le C
$$

となる定数 $C$ が、十分小さい $h$ に対して存在します。従って $k(h)\ne0$ なら、第1因子は 0 へ収束し、第2因子は有界なので積は 0 へ収束します。

$k(h)=0$ のときは

$$
r_g(0)
=
g(y_0)-g(y_0)-B0
=
0
$$

なので

$$
\frac{\|r_g(k(h))\|}{\|h\|}=0.
$$

従ってどちらの場合も第2残差は $o(\|h\|)$ です。
<!-- solution-end -->

### F0-02C3B-B02 二乗誤差を微分して随伴へ戻す

- Level: B

$$
J(x)
=
\frac12\|Tx-y\|^2
$$

について

$$
DJ(x)[h]
=
\langle Tx-y,Th\rangle
$$

を[連鎖律](../RA3/index.md#prop-ra3-chain-rule)から導き、さらに

$$
DJ(x)[h]
=
\langle T^\dagger(Tx-y),h\rangle
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$$
F(x)=Tx-y,
\qquad
q(z)=\frac12\|z\|^2
$$

と置けば $J=q\circ F$ です。

A02 から

$$
Dq(z)[k]
=
\langle z,k\rangle,
$$

また

$$
DF(x)[h]=Th.
$$

従って [Fréchet 連鎖律](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#thm-f0-02c3-frechet-composition)から

$$
\begin{aligned}
DJ(x)[h]
&=
Dq(F(x))[DF(x)[h]]\\
&=
\langle Tx-y,Th\rangle.
\end{aligned}
$$

実 Hilbert 空間では内積が対称なので

$$
\langle Tx-y,Th\rangle
=
\langle Th,Tx-y\rangle.
$$

Hilbert 随伴の定義を $x=h$、$y=Tx-y$ に適用すると

$$
\langle Th,Tx-y\rangle
=
\langle h,T^\dagger(Tx-y)\rangle.
$$

再び対称性を使えば

$$
\boxed{
DJ(x)[h]
=
\langle T^\dagger(Tx-y),h\rangle
}.
$$
<!-- solution-end -->

### F0-02C3B-B03 合成の随伴

- Level: B

実 Hilbert 空間 $H_1,H_2,H_3$ と有界線形写像

$$
T:H_1\to H_2,
\qquad
S:H_2\to H_3
$$

に対して

$$
\boxed{
(S\circ T)^\dagger
=
T^\dagger\circ S^\dagger
}
$$

を示せ。作用素の順序が逆になる理由も内積計算から説明せよ。

<!-- solution-start -->
#### 詳細解答

$x\in H_1$、$z\in H_3$ を任意に取ります。まず $S$ の随伴を使うと

$$
\langle S(Tx),z\rangle_{H_3}
=
\langle Tx,S^\dagger z\rangle_{H_2}.
$$

次に $T$ の随伴を使って

$$
\langle Tx,S^\dagger z\rangle_{H_2}
=
\langle x,T^\dagger(S^\dagger z)\rangle_{H_1}.
$$

従って

$$
\langle (S\circ T)x,z\rangle
=
\langle x,(T^\dagger\circ S^\dagger)z\rangle.
$$

[Hilbert随伴の存在・一意性](#thm-f0-02c3b-hilbert-adjoint)から

$$
\boxed{
(S\circ T)^\dagger
=
T^\dagger\circ S^\dagger
}.
$$

出力側 $H_3$ から入力側 $H_1$ へ戻るため、まず $S^\dagger$ で $H_3\to H_2$、次に $T^\dagger$ で $H_2\to H_1$ と進むので順序が逆になります。
<!-- solution-end -->

## C問題

### F0-02C3B-C01 非線形最小二乗を連鎖律と随伴で微分する

- Level: C

実 Hilbert 空間 $H,H_1,H_2$、Fréchet 微分可能な写像

$$
F:H\to H_1
$$

と有界線形写像

$$
T:H_1\to H_2
$$

を考える。$y\in H_2$ を固定し、

$$
J(x)
=
\frac12\|TF(x)-y\|_{H_2}^2
$$

とする。

1. $DJ(x)[h]$ を求めよ。
2. $DF(x):H\to H_1$ の Hilbert 随伴を $DF(x)^\dagger$ と書くとき、$DJ(x)$ の Riesz 代表を求めよ。

<!-- solution-start -->
#### 詳細解答

写像を

$$
H
\xrightarrow{F}
H_1
\xrightarrow{T}
H_2
\xrightarrow{q}
\mathbb R,
\qquad
q(z)=\frac12\|z-y\|^2
$$

と分けます。

まず $G:=T\circ F$ と置くと、[Fréchet 連鎖律](../F0_02C3_Frechet微分_線形作用素_随伴/index.md#thm-f0-02c3-frechet-composition)から

$$
DG(x)[h]
=
T(DF(x)[h]).
$$

次に $q(z)=\frac12\|z-y\|^2$ について、A02 と同じ計算から

$$
Dq(z)[k]
=
\langle z-y,k\rangle.
$$

従って

$$
\begin{aligned}
DJ(x)[h]
&=
Dq(TF(x))[TDF(x)[h]]\\
&=
\left\langle
TF(x)-y,
TDF(x)[h]
\right\rangle.
\end{aligned}
$$

これが 1 の答えです。

次に実 Hilbert 空間の内積の対称性を使って

$$
DJ(x)[h]
=
\left\langle
TDF(x)[h],
TF(x)-y
\right\rangle.
$$

まず $T^\dagger$ を適用して

$$
DJ(x)[h]
=
\left\langle
DF(x)[h],
T^\dagger(TF(x)-y)
\right\rangle_{H_1}.
$$

さらに $DF(x)^\dagger$ を適用すると

$$
DJ(x)[h]
=
\left\langle
h,
DF(x)^\dagger
T^\dagger(TF(x)-y)
\right\rangle_H.
$$

実 Hilbert 空間では内積が対称なので、これは

$$
DJ(x)[h]
=
\left\langle
DF(x)^\dagger
T^\dagger(TF(x)-y),
h
\right\rangle_H
$$

とも書けます。従って $DJ(x)$ の Riesz 代表は

$$
\boxed{
DF(x)^\dagger
T^\dagger(TF(x)-y)
}.
$$

有限次元なら、これは Jacobian の転置と行列の転置を逆順に掛ける式に対応します。
<!-- solution-end -->

---

## 章末チェック

- Fréchet 連鎖律で、$k(h)=O(\|h\|)$ を先に確認する理由を説明できる。
- 合成後の二つの残差がともに $o(\|h\|)$ になることを主要中間式から再構成できる。
- $x\mapsto\langle Tx,y\rangle$ が連続線形汎関数になることを確認してから Riesz 表現を適用できる。
- Riesz 表現から $T^\dagger$ の存在・線形性・有界性・一意性を導ける。
- $\|T^\dagger\|=\|T\|$ を証明できる。
- 連鎖律と随伴を組み合わせて、線形・非線形の最小二乗汎関数を微分できる。
