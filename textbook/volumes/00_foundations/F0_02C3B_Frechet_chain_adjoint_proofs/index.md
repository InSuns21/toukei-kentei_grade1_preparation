# F0-02C3B：Fréchet連鎖律とHilbert随伴の証明

C3/C3AではFréchet微分と随伴作用素の意味を先に学びました。この補講では、監査上残っていた **連鎖律の完全証明** と **Riesz表現からのHilbert随伴の構成** を閉じます。

```text
Fréchet微分の残差表示
  ↓
合成後も残差は o(||h||)
  ↓
chain rule

Riesz表現
  ↓
y ごとに x↦<Tx,y> をベクトル化
  ↓
Hilbert随伴の存在・一意性
```

---

## 1. Fréchet微分を残差で書く

$f:X\to Y$ が $x$ でFréchet微分可能で $A=Df(x)$ なら

$$
f(x+h)=f(x)+Ah+r_f(h),
$$

かつ

$$
\frac{\|r_f(h)\|_Y}{\|h\|_X}\to0.
$$

同様に、$g:Y\to Z$ が $y_0=f(x)$ でFréchet微分可能で $B=Dg(y_0)$ なら

$$
g(y_0+k)=g(y_0)+Bk+r_g(k),
$$

$$
\frac{\|r_g(k)\|_Z}{\|k\|_Y}\to0.
$$

連鎖律では、$k=f(x+h)-f(x)$ が $O(\|h\|)$ であることを確認すれば、二つ目の残差も $o(\|h\|)$ に落とせます。

---

## 2. Fréchet連鎖律

<a id="thm-f0-02c3b-chain-rule"></a>

<!-- formal-statement-start -->
> **定理（Fréchet連鎖律）**  
> $X,Y,Z$ をノルム空間とする。$f:X\to Y$ が $x$ でFréchet微分可能、$g:Y\to Z$ が $f(x)$ でFréchet微分可能なら、$g\circ f$ は $x$ でFréchet微分可能である。

$$
\boxed{D(g\circ f)(x)=Dg(f(x))\circ Df(x)}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A=Df(x)$、$B=Dg(f(x))$ と置きます。

$$
f(x+h)-f(x)=Ah+r_f(h).
$$

右辺を

$$
k(h):=Ah+r_f(h)
$$

と置くと、$A$ の有界性と $r_f(h)=o(\|h\|)$ から

$$
\|k(h)\|=O(\|h\|),
\qquad k(h)\to0.
$$

$g$ の微分可能性を $k(h)$ に適用すると

$$
\begin{aligned}
g(f(x+h))-g(f(x))
&=Bk(h)+r_g(k(h))\\
&=BAh+B r_f(h)+r_g(k(h)).
\end{aligned}
$$

第1残差は

$$
\frac{\|B r_f(h)\|}{\|h\|}
\le
\|B\|\frac{\|r_f(h)\|}{\|h\|}
\to0.
$$

$k(h)\ne0$ なら第2残差は

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}.
$$

第1因子は $k(h)\to0$ により0へ、第2因子は $O(1)$ です。$k(h)=0$ なら $r_g(0)=0$ なので同じ結論です。従って

$$
\frac{\|g(f(x+h))-g(f(x))-BAh\|}{\|h\|}\to0.
$$

よって

$$
D(g\circ f)(x)=BA
=Dg(f(x))\circ Df(x).
$$

$\square$
<!-- proof-end -->

有限次元の

$$
J_{g\circ f}(x)=J_g(f(x))J_f(x)
$$

は、この定理を座標表示したものです。

---

## 3. 例：二乗ノルムと線形作用素

Hilbert空間 $H_1,H_2$、有界線形作用素 $T:H_1\to H_2$ に対し

$$
J(x)=\frac12\|Tx-y\|_{H_2}^2
$$

とします。$F(x)=Tx-y$、$q(z)=\frac12\|z\|^2$ と分ければ

$$
DF(x)[h]=Th,
\qquad
Dq(z)[k]=\langle z,k\rangle.
$$

連鎖律から

$$
DJ(x)[h]=\langle Tx-y,Th\rangle.
$$

次節の随伴を使うと、これは

$$
DJ(x)[h]=\langle T^\dagger(Tx-y),h\rangle
$$

と書けます。

---

## 4. Riesz表現から随伴を作る

$T:H_1\to H_2$ を有界線形作用素とし、固定した $y\in H_2$ に対して

$$
\phi_y(x):=\langle Tx,y\rangle_{H_2}
$$

と置きます。Cauchy--Schwarzより

$$
|\phi_y(x)|
\le\|T\|\|x\|\|y\|.
$$

従って $\phi_y$ は $H_1$ 上の連続線形汎関数です。ここでRiesz表現定理が使えます。

---

## 5. Hilbert随伴の存在一意性

<a id="thm-f0-02c3b-hilbert-adjoint"></a>

<!-- formal-statement-start -->
> **定理（Hilbert随伴の存在一意性）**  
> 実Hilbert空間 $H_1,H_2$ と有界線形作用素 $T:H_1\to H_2$ に対し、一意な有界線形作用素 $T^\dagger:H_2\to H_1$ が存在し、次を満たす。

$$
\boxed{\langle Tx,y\rangle_{H_2}=\langle x,T^\dagger y\rangle_{H_1}}
$$

さらに

$$
\|T^\dagger\|\le\|T\|.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $y\in H_2$ に対して $\phi_y(x)=\langle Tx,y\rangle$ と置くと

$$
\|\phi_y\|\le\|T\|\|y\|.
$$

Riesz表現定理により、一意な $z_y\in H_1$ が存在して

$$
\phi_y(x)=\langle x,z_y\rangle_{H_1}
\qquad(\forall x\in H_1)
$$

となります。そこで

$$
T^\dagger y:=z_y
$$

と定義します。

$a,b\in\mathbb R$、$y_1,y_2\in H_2$ に対し、任意の $x$ について

$$
\begin{aligned}
\langle x,T^\dagger(ay_1+by_2)\rangle
&=\langle Tx,ay_1+by_2\rangle\\
&=\langle x,aT^\dagger y_1+bT^\dagger y_2\rangle.
\end{aligned}
$$

Riesz表現の一意性から $T^\dagger$ は線形です。また

$$
\|T^\dagger y\|
=\|\phi_y\|
\le\|T\|\|y\|
$$

なので有界です。

別の作用素 $S$ も同じ内積恒等式を満たすなら

$$
\langle x,(S-T^\dagger)y\rangle=0
$$

が全ての $x,y$ で成立します。$x=(S-T^\dagger)y$ と取れば $(S-T^\dagger)y=0$ なので $S=T^\dagger$。一意性も示されました。$\square$
<!-- proof-end -->

複素Hilbert空間でも同じ構成が成り立ちますが、内積をどちらの変数について線形とするかで共役線形性の表記が変わります。この補講ではKKTとの接続に十分な実Hilbert空間版を正本とします。

---

## 6. 行列の場合

$T(x)=Ax$、Euclid内積なら

$$
\langle Ax,y\rangle
=x^{\mathsf T}A^{\mathsf T}y
=\langle x,A^{\mathsf T}y\rangle.
$$

従って

$$
\boxed{T^\dagger=A^{\mathsf T}}.
$$

---

## 7. 演習A

### A01 残差の大きさ

$f(x+h)=f(x)+Ah+r_f(h)$、$r_f(h)=o(\|h\|)$ とする。$k(h)=Ah+r_f(h)$ が $O(\|h\|)$ であることを示せ。

<!-- solution-start -->
$\|Ah\|\le\|A\|\|h\|$。また十分小さい $h$ では $\|r_f(h)\|\le\|h\|$ とできるので $\|k(h)\|\le(\|A\|+1)\|h\|$。
<!-- solution-end -->

### A02 行列の随伴

$A\in\mathbb R^{m\times n}$ に対し、Hilbert随伴が $A^{\mathsf T}$ であることを示せ。

<!-- solution-start -->
$\langle Ax,y\rangle=x^TA^Ty=\langle x,A^Ty\rangle$ なので、随伴の一意性から $A^T$ が随伴。
<!-- solution-end -->

---

## 8. 演習B

### B01 chain rule の核心

連鎖律の証明で

$$
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}
\to0
$$

となる理由を説明せよ。

<!-- solution-start -->
第1因子は $k(h)\to0$ と $g$ のFréchet微分可能性から0へ収束し、第2因子は $k(h)=O(\|h\|)$ から有界。従って積は0へ収束する。
<!-- solution-end -->

### B02 最小二乗汎関数の勾配

$$
J(x)=\frac12\|Tx-y\|^2
$$

について

$$
\nabla J(x)=T^\dagger(Tx-y)
$$

を示せ。

<!-- solution-start -->
連鎖律より $DJ(x)[h]=\langle Tx-y,Th\rangle$。随伴の定義から $DJ(x)[h]=\langle T^\dagger(Tx-y),h\rangle$。Riesz表現により結論。
<!-- solution-end -->

---

## 9. 監査チェック

この補講でP2残件だった

- Fréchet chain rule
- Hilbert adjoint のRiesz表現からの存在・一意性

を、定義・例・定理・完全証明・A/B演習まで閉じました。
