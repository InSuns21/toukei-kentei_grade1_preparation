# F0-02C3B：Fréchet連鎖律とHilbert随伴の証明

C3/C3Aでは、Fréchet微分と随伴作用素の意味を先に掴みました。この補講では監査上残っていた2本の証明を閉じます。

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

## 1. Fréchet微分は「線形部分 + 小さい残差」

$f:X\to Y$ が $x$ でFréchet微分可能で $A=Df(x)$ なら、

$$
f(x+h)=f(x)+Ah+r_f(h),
$$

ここで

$$
\boxed{\frac{\|r_f(h)\|_Y}{\|h\|_X}\to0}
$$

です。

同様に $g:Y\to Z$ が $y_0=f(x)$ でFréchet微分可能で $B=Dg(y_0)$ なら

$$
g(y_0+k)=g(y_0)+Bk+r_g(k),
$$

かつ

$$
\boxed{\frac{\|r_g(k)\|_Z}{\|k\|_Y}\to0}.
$$

この2本を代入するだけで連鎖律が出ます。ただし、$k=f(x+h)-f(x)$ が $O(\|h\|)$ であることを確認するのが肝です。

---

## 2. Fréchet chain rule

<a id="thm-f0-02c3b-chain-rule"></a>

<!-- formal-statement-start -->
> **定理（Fréchet連鎖律）**  
> $X,Y,Z$ をノルム空間、$f:X\to Y$ が $x$ でFréchet微分可能、$g:Y\to Z$ が $f(x)$ でFréchet微分可能とする。このとき $g\circ f$ は $x$ でFréchet微分可能で
>
> $$
> \boxed{D(g\circ f)(x)=Dg(f(x))\circ Df(x)}
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A=Df(x)$、$B=Dg(f(x))$ と置きます。上の残差表示から

$$
f(x+h)-f(x)=Ah+r_f(h).
$$

右辺を

$$
k(h):=Ah+r_f(h)
$$

と置くと、有界線形性より

$$
\|Ah\|\le\|A\|\|h\|,
$$

また $r_f(h)=o(\|h\|)$ なので

$$
\boxed{\|k(h)\|=O(\|h\|)}.
$$

さらに $h\to0$ なら $k(h)\to0$ です。

$g$ の微分可能性を $k=k(h)$ に適用すると

$$
\begin{aligned}
g(f(x+h))-g(f(x))
&=Bk(h)+r_g(k(h))\\
&=BAh+B r_f(h)+r_g(k(h)).
\end{aligned}
$$

従って候補となる一次近似は $BA$ です。残差を評価すると

$$
\frac{\|B r_f(h)\|}{\|h\|}
\le
\|B\|\frac{\|r_f(h)\|}{\|h\|}
\to0.
$$

また $k(h)\ne0$ の点では

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}.
$$

第1因子は $k(h)\to0$ により0へ、第2因子は $O(1)$ です。$k(h)=0$ の点では $r_g(0)=0$ なので問題ありません。したがって

$$
\frac{\|g(f(x+h))-g(f(x))-BAh\|}{\|h\|}
\to0.
$$

よって $g\circ f$ はFréchet微分可能で

$$
D(g\circ f)(x)=BA
=Dg(f(x))\circ Df(x).
$$

$\square$
<!-- proof-end -->

### 2.1 何が有限次元のchain ruleと違うのか

違いは本質的にはありません。ただし無限次元では、Jacobian行列ではなく **有界線形作用素** と残差 $o(\|h\|)$ を直接扱います。

有限次元の

$$
J_{g\circ f}(x)=J_g(f(x))J_f(x)
$$

は、この定理を座標表示したものです。

---

## 3. 例：二乗ノルムと線形作用素の合成

Hilbert空間 $H_1,H_2$、有界線形作用素 $T:H_1\to H_2$ に対し

$$
J(x)=\frac12\|Tx-y\|_{H_2}^2
$$

とします。

$F(x)=Tx-y$ と $q(z)=\frac12\|z\|^2$ に分けると

$$
DF(x)[h]=Th,
\qquad
Dq(z)[k]=\langle z,k\rangle.
$$

連鎖律から

$$
DJ(x)[h]
=
\langle Tx-y,Th\rangle.
$$

次節の随伴を使えば、これを

$$
DJ(x)[h]
=
\langle T^\dagger(Tx-y),h\rangle
$$

と書けます。

---

## 4. Hilbert随伴はなぜ必ず存在するのか

$T:H_1\to H_2$ を有界線形作用素とします。

固定した $y\in H_2$ に対して

$$
\phi_y(x):=\langle Tx,y\rangle_{H_2}
$$

と置きます。

Cauchy--Schwarzより

$$
|\phi_y(x)|
\le\|Tx\|\|y\|
\le\|T\|\|x\|\|y\|.
$$

したがって $\phi_y$ は $H_1$ 上の連続線形汎関数です。

ここでRiesz表現定理が効きます。

---

## 5. Hilbert随伴の存在一意性

<a id="thm-f0-02c3b-hilbert-adjoint"></a>

<!-- formal-statement-start -->
> **定理（Hilbert随伴の存在一意性）**  
> 実Hilbert空間 $H_1,H_2$ と有界線形作用素 $T:H_1\to H_2$ に対し、一意な有界線形作用素
>
> $$
> T^\dagger:H_2\to H_1
> $$
>
> が存在して
>
> $$
> \boxed{\langle Tx,y\rangle_{H_2}=\langle x,T^\dagger y\rangle_{H_1}}
> $$
>
> をすべての $x\in H_1,y\in H_2$ について満たす。さらに
>
> $$
> \|T^\dagger\|\le\|T\|.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $y\in H_2$ について

$$
\phi_y(x)=\langle Tx,y\rangle_{H_2}
$$

は連続線形汎関数であり

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

と定義します。すると目的の内積等式は定義から成立します。

次に線形性を示します。$a,b\in\mathbb R$、$y_1,y_2\in H_2$ に対し、任意の $x$ について

$$
\begin{aligned}
\langle x,T^\dagger(ay_1+by_2)\rangle
&=\langle Tx,ay_1+by_2\rangle\\
&=a\langle x,T^\dagger y_1\rangle+b\langle x,T^\dagger y_2\rangle\\
&=\langle x,aT^\dagger y_1+bT^\dagger y_2\rangle.
\end{aligned}
$$

全ての $x$ で内積が一致するので

$$
T^\dagger(ay_1+by_2)=aT^\dagger y_1+bT^\dagger y_2.
$$

Riesz表現では表現ベクトルのノルムと汎関数ノルムが一致するため

$$
\|T^\dagger y\|
=\|\phi_y\|
\le\|T\|\|y\|.
$$

よって $T^\dagger$ は有界で $\|T^\dagger\|\le\|T\|$ です。

最後に別の作用素 $S$ も同じ内積恒等式を満たすとすると、任意の $x,y$ で

$$
\langle x,(S-T^\dagger)y\rangle=0.
$$

$x=(S-T^\dagger)y$ と取ればそのノルム二乗が0なので $S=T^\dagger$。一意性も示されました。$\square$
<!-- proof-end -->

> 複素Hilbert空間でも同様です。内積をどちらの変数について線形とするかで共役線形性の書き方が変わるため、この補講ではKKTとの接続に十分な実Hilbert空間版を正本とします。

---

## 6. 行列の場合

$T(x)=Ax$、Euclid内積なら

$$
\langle Ax,y\rangle
=x^{\mathsf T}A^{\mathsf T}y
=
\langle x,A^{\mathsf T}y\rangle.
$$

したがって

$$
\boxed{T^\dagger=A^{\mathsf T}}.
$$

無限次元の随伴は「転置の一般化」というより、**Riesz表現で出力側の線形汎関数を入力側のベクトルへ戻したもの**です。

---

## 7. 演習A

### A01 chain rule の残差

$f(x+h)=f(x)+Ah+r_f(h)$、$r_f(h)=o(\|h\|)$ とする。$k(h)=Ah+r_f(h)$ が $O(\|h\|)$ であることを示せ。

<!-- solution-start -->
$A$ の有界性より $\|Ah\|\le\|A\|\|h\|$。また $r_f(h)=o(\|h\|)$ なので十分小さい $h$ では $\|r_f(h)\|\le\|h\|$。従って $\|k(h)\|\le(\|A\|+1)\|h\|$。
<!-- solution-end -->

### A02 行列の随伴

$A\in\mathbb R^{m\times n}$ に対してHilbert随伴が $A^{\mathsf T}$ であることを内積の定義から示せ。

<!-- solution-start -->
$\langle Ax,y\rangle=(Ax)^Ty=x^TA^Ty=\langle x,A^Ty\rangle$ なので一意性より $A^T$ が随伴。
<!-- solution-end -->

---

## 8. 演習B

### B01 chain rule を定義から再構成

上の定理で、$r_g(k(h))=o(\|h\|)$ が従う箇所を積の形

$$
\frac{\|r_g(k(h))\|}{\|k(h)\|}\frac{\|k(h)\|}{\|h\|}
$$

に分けて説明せよ。

<!-- solution-start -->
第1因子は $k(h)\to0$ と $g$ のFréchet微分可能性から0へ収束し、第2因子は $k(h)=O(\|h\|)$ から有界。従って積は0へ収束する。
<!-- solution-end -->

### B02 最小二乗汎関数の勾配

$$
J(x)=\frac12\|Tx-y\|^2
$$

についてchain ruleと随伴を使い

$$
\nabla J(x)=T^\dagger(Tx-y)
$$

を示せ。

<!-- solution-start -->
$q(z)=\frac12\|z\|^2$ と $F(x)=Tx-y$ に分解すると $Dq(z)[k]=\langle z,k\rangle$、$DF(x)[h]=Th$。chain ruleより $DJ(x)[h]=\langle Tx-y,Th\rangle=\langle T^\dagger(Tx-y),h\rangle$。Riesz表現により結論。
<!-- solution-end -->

---

## 9. 監査チェック

この補講で次のP2残件を閉じました。

- Fréchet chain rule：**定義 → 定理 → 完全証明 → 例 → A/B演習**
- Hilbert adjoint：**Riesz表現 → 存在 → 線形性 → 有界性 → 一意性 → 例 → A/B演習**

C3/C3Aで概念を学び、この補講で証明を回収する構成です。
