# OA3 C*-環の基本構造

<!-- definition-example-audit: strict -->

> **既出概念**：[OA1 の単位的 Banach 環とスペクトル](../OA1/index.md#def-oa1-spectrum)、[OA1 のスペクトル半径公式](../OA1/index.md#thm-oa1-spectral-radius-formula)、[OA2 の character と Gelfand 変換](../OA2/index.md#def-oa2-character)、[OA2 のスペクトルの character 表示](../OA2/index.md#thm-oa2-spectrum-character)、[RA8 の実 Stone--Weierstrass 定理](../RA8/index.md#thm-ra8-stone-weierstrass)、[Hilbert 随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md#def-f0-02c3a-hilbert-adjoint)を使います。

OA1 と OA2 では、Banach 環の積とノルムからスペクトルを調べました。可換な場合には character を集めることで、抽象的な元を連続関数として観測できることも分かりました。

しかし OA2 の最後に見た冪零元

$$
\varepsilon^2=0,
\qquad
\varepsilon\ne0
$$

は、全ての character から消えてしまいました。一般の可換 Banach 環では、Gelfand 変換が元を完全には見分けられないからです。

作用素を扱うときには、もう一つ自然な操作があります。行列なら共役転置、Hilbert 空間上の作用素なら随伴、複素数値関数なら複素共役です。この操作を積・ノルムと結び付けると、Banach 環よりはるかに強い構造が現れます。

本章の流れは次です。

~~~
Banach 環
  ↓ 随伴 a↦a* を加える
*-代数
  ↓ ||a*a||=||a||^2
C*-環
  ├─ 自己共役元 → スペクトルは実数
  ├─ unitary / projection
  ├─ 可換なら Gelfand 変換が等長・単射
  ├─ *-準同型は自動的に縮小的
  └─ 正元 → 一意な正の平方根
~~~

最後の平方根では、次章の一般連続関数計算を丸ごと仮定しません。自己共役元一個に対して必要な多項式近似だけを、RA8 の Stone--Weierstrass 定理から作ります。

---

## 1. 積を反転する随伴：*-代数

行列では

$$
(AB)^*=B^*A^*
$$

です。積の順序が反転することが重要です。抽象代数でも、この性質をそのまま公理にします。

<a id="def-oa3-star-algebra"></a>

<!-- formal-statement-start -->
### 定義（複素 *-代数）

複素単位的代数 $A$ に写像

$$
A\to A,
\qquad
a\mapsto a^*
$$

があり、任意の $a,b\in A$ と $\alpha,\beta\in\mathbb C$ に対して

$$
(\alpha a+\beta b)^*
=
\overline\alpha\,a^*
+
\overline\beta\,b^*,
$$

$$
(ab)^*=b^*a^*,
$$

$$
(a^*)^*=a,
\qquad
1^*=1
$$

を満たすとき、$A$ を **複素 *-代数** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-star-algebra -->

**定義の確認**

### 例1：複素行列

$A=M_n(\mathbb C)$ で $A^*$ を共役転置とします。成分表示から

$$
(\alpha A+\beta B)^*
=
\overline\alpha A^*
+
\overline\beta B^*,
$$

また行列積について

$$
(AB)^*=B^*A^*
$$

です。さらに $(A^*)^*=A$ なので、$M_n(\mathbb C)$ は *-代数です。

### 例2：連続関数

$K$ をコンパクト Hausdorff 空間とし、$C(K)$ で

$$
f^*(x)=\overline{f(x)}
$$

と置きます。点ごとの積について

$$
(fg)^*(x)
=
\overline{f(x)g(x)}
=
\overline{g(x)}\,\overline{f(x)}
=
g^*(x)f^*(x).
$$

$C(K)$ は可換なので順序反転は見えにくいですが、同じ公理を満たしています。

<!-- definition-example-end -->

随伴は「複素共役を含む」ため複素線形ではなく共役線形です。この点を落とすと

$$
(ia)^*=-ia^*
$$

が再現できません。

---

## 2. ノルムと随伴を結ぶ C*-恒等式

*-代数に Banach 環のノルムを入れただけでは、随伴とノルムはまだ別々の構造です。$C^*$-環では両者を一つの等式で結びます。

<a id="def-oa3-cstar-algebra"></a>

<!-- formal-statement-start -->
### 定義（単位的 C*-環）

複素単位的 Banach 環 $A$ が *-代数でもあり、任意の $a\in A$ に対して

$$
\boxed{
\|a^*a\|=\|a\|^2
}
$$

を満たすとき、$A$ を **単位的 $C^*$-環** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-cstar-algebra -->

**定義の確認**

### 例1：$C(K)$

一様ノルムについて

$$
\|f^*f\|_\infty
=
\max_{x\in K}|\,\overline{f(x)}f(x)\,|
=
\max_{x\in K}|f(x)|^2
=
\|f\|_\infty^2.
$$

従って $C(K)$ は可換 $C^*$-環です。

### 例2：$M_n(\mathbb C)$ と $B(H)$

$\mathbb C^n$ の Euclid ノルムから得られる作用素ノルムを $M_n(\mathbb C)$ に入れ、随伴を共役転置とすると $C^*$-恒等式が成立します。

より一般に Hilbert 空間 $H$ 上の有界作用素全体 $B(H)$ では、

$$
\|T\|^2
=
\sup_{\|x\|=1}\|Tx\|^2
=
\sup_{\|x\|=1}\langle T^*Tx,x\rangle
\le
\|T^*T\|.
$$

一方、

$$
\|T^*T\|
\le
\|T^*\|\,\|T\|
=
\|T\|^2
$$

なので

$$
\|T^*T\|=\|T\|^2.
$$

従って $B(H)$ も単位的 $C^*$-環です。

<!-- definition-example-end -->

$C^*$-恒等式は、単なる追加評価ではありません。次の命題のように、随伴のノルムまで自動的に固定します。

<a id="prop-oa3-star-isometric"></a>

<!-- formal-statement-start -->
### 命題（随伴は等長である）

単位的 $C^*$-環 $A$ の任意の $a\in A$ に対して

$$
\boxed{
\|a^*\|=\|a\|
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$C^*$-恒等式を $a^*$ に適用し、Banach 環の劣乗法性で上から抑えます。最後に $a$ と $a^*$ を入れ替えます。

<!-- proof-start -->
### 証明

$a^*$ に $C^*$-環の定義条件を適用すると

$$
\|a^*\|^2
=
\|(a^*)^*a^*\|
=
\|aa^*\|.
$$

劣乗法性から

$$
\|aa^*\|
\le
\|a\|\,\|a^*\|.
$$

$a^*=0$ なら結論は自明です。$a^*\ne0$ なら $\|a^*\|>0$ なので割り算でき、

$$
\|a^*\|
\le
\|a\|.
$$

同じ議論を $a^*$ に適用すると

$$
\|(a^*)^*\|
\le
\|a^*\|,
$$

すなわち

$$
\|a\|
\le
\|a^*\|.
$$

従って

$$
\|a^*\|=\|a\|.
$$
<!-- proof-end -->

以後、随伴は連続写像でもあります。実際、

$$
\|a^*-b^*\|
=
\|(a-b)^*\|
=
\|a-b\|.
$$

したがって、閉包を取っても *-構造が壊れません。

---

## 3. 自己共役元：実数の役割を担う元

複素数の中で実数は

$$
\overline z=z
$$

で特徴付けられます。$C^*$-環では、この条件をそのまま随伴へ移します。

<a id="def-oa3-self-adjoint"></a>

<!-- formal-statement-start -->
### 定義（自己共役元）

$C^*$-環 $A$ の元 $h$ が

$$
h^*=h
$$

を満たすとき、$h$ を **自己共役元** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-self-adjoint -->

**定義の確認**

- $C(K)$ では $f^*=f$ は $f(x)\in\mathbb R$ が全ての $x$ で成り立つことと同値です。
- $M_n(\mathbb C)$ では自己共役元は Hermite 行列です。
- $B(H)$ では、Hilbert 随伴について $T^*=T$ を満たす有界作用素です。

任意の $a\in A$ は

$$
h=\frac{a+a^*}{2},
\qquad
k=\frac{a-a^*}{2i}
$$

と置けば

$$
h^*=h,
\qquad
k^*=k,
\qquad
a=h+ik
$$

と分解できます。

<!-- definition-example-end -->

この分解は複素数 $z=\operatorname{Re}z+i\operatorname{Im}z$ の抽象版です。

### 3.1 自己共役元ではノルムがスペクトルから読める

<a id="prop-oa3-self-adjoint-norm-radius"></a>

<!-- formal-statement-start -->
### 命題（自己共役元ではノルムとスペクトル半径が一致する）

単位的 $C^*$-環 $A$ の自己共役元 $h$ に対して

$$
\boxed{
\|h\|=r_A(h)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

自己共役性により

$$
h^*h=h^2
$$

です。$C^*$-恒等式を繰り返して $2^m$ 乗のノルムを正確に計算し、OA1 のスペクトル半径公式へ入れます。

<!-- proof-start -->
### 証明

$h^*=h$ なので

$$
\|h^2\|
=
\|h^*h\|
=
\|h\|^2.
$$

同じことを $h^2$ に適用すると

$$
\|h^4\|
=
\|h^2\|^2
=
\|h\|^4.
$$

帰納的に

$$
\|h^{2^m}\|
=
\|h\|^{2^m}
$$

を得ます。

OA1 のスペクトル半径公式から

$$
r_A(h)
=
\lim_{n\to\infty}\|h^n\|^{1/n}.
$$

この極限を部分列 $n=2^m$ で見ても同じ値なので

$$
r_A(h)
=
\lim_{m\to\infty}
\|h^{2^m}\|^{1/2^m}
=
\|h\|.
$$
<!-- proof-end -->

一般の Banach 環では

$$
r(a)\le\|a\|
$$

しか保証されません。自己共役元では $C^*$-恒等式がこの不等式を等号へ押し上げます。

### 3.2 自己共役元のスペクトルは実数になる

行列の Hermite 行列では固有値が実数でした。$C^*$-環でも同じ現象が「固有値」ではなく「スペクトル」に対して成立します。

<a id="thm-oa3-self-adjoint-real-spectrum"></a>

<!-- formal-statement-start -->
### 定理（自己共役元のスペクトルは実数である）

単位的 $C^*$-環 $A$ の自己共役元 $h$ に対して

$$
\boxed{
\sigma_A(h)\subset\mathbb R
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$h$ の多項式全体を閉包した可換部分環 $B$ を考えます。OA2 の character は $B$ のスペクトルを完全に検出します。

自己共役元 $h$ から作る指数関数

$$
u_t=e^{ith}
$$

は unitary になり、ノルムが $1$ です。character $\varphi$ を $u_t$ に作用させると

$$
\varphi(u_t)=e^{it\varphi(h)}
$$

ですが、その絶対値も $1$ でなければなりません。これが $\varphi(h)$ の虚部を消します。

<!-- proof-start -->
### 証明

$B$ を $1,h$ の複素係数多項式全体のノルム閉包とします。$h^*=h$ なので多項式の随伴も再び $h$ の多項式であり、随伴の連続性から $B$ は *-閉です。また $h$ 一個から生成されるので積は可換です。

$\varphi\in\Delta(B)$ を取ります。$t\in\mathbb R$ に対し Banach 環の指数級数

$$
u_t=e^{ith}
=
\sum_{n=0}^{\infty}\frac{(ith)^n}{n!}
$$

を考えます。絶対収束するので $u_t\in B$ です。

随伴を項別に取ると

$$
u_t^*=e^{-ith}.
$$

指数関数の積則から

$$
u_t^*u_t
=
e^{-ith}e^{ith}
=
1.
$$

従って $C^*$-環の定義条件により

$$
\|u_t\|^2
=
\|u_t^*u_t\|
=
\|1\|
=
1.
$$

よって $\|u_t\|=1$ です。

OA2 で character はノルム $1$ と分かっているので

$$
|\varphi(u_t)|
\le
1.
$$

一方 $u_t^{-1}=u_{-t}$ であり、同様に $|\varphi(u_{-t})|\le1$ です。さらに

$$
\varphi(u_t)\varphi(u_{-t})
=
\varphi(1)
=
1.
$$

したがって

$$
|\varphi(u_t)|=1.
$$

character の連続性により級数へ作用でき、

$$
\varphi(u_t)
=
\sum_{n=0}^{\infty}
\frac{(it\varphi(h))^n}{n!}
=
e^{it\varphi(h)}.
$$

$$
\varphi(h)=\alpha+i\beta
$$

と書くと

$$
|e^{it\varphi(h)}|
=
|e^{it\alpha-t\beta}|
=
e^{-t\beta}.
$$

これが全ての $t\in\mathbb R$ で $1$ なので

$$
\beta=0.
$$

従って全ての character について

$$
\varphi(h)\in\mathbb R.
$$

OA2 のスペクトル表示から

$$
\sigma_B(h)
=
\{\varphi(h):\varphi\in\Delta(B)\}
\subset\mathbb R.
$$

$B\subset A$ なので、$B$ で可逆なら $A$ でも可逆です。したがって

$$
\sigma_A(h)\subset\sigma_B(h).
$$

よって

$$
\sigma_A(h)\subset\mathbb R.
$$
<!-- proof-end -->

ここまでで、自己共役元は「実数値のスペクトルを持ち、ノルムがその絶対値最大値になる元」として振る舞うことが分かりました。

---

## 4. unitary 元と projection

量子力学側では unitary 作用素と直交射影がすでに現れました。$C^*$-環では、それらを作用素に限らない代数的条件として扱えます。

<a id="def-oa3-unitary"></a>

<!-- formal-statement-start -->
### 定義（unitary 元）

単位的 $C^*$-環 $A$ の元 $u$ が

$$
u^*u=uu^*=1
$$

を満たすとき、$u$ を **unitary 元** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-unitary -->

**定義の確認**

$C(K)$ では $u$ が unitary である条件は

$$
|u(x)|=1
\qquad
(\forall x\in K)
$$

です。実際、

$$
u^*u(x)=\overline{u(x)}u(x)=|u(x)|^2.
$$

また自己共役元 $h$ と $t\in\mathbb R$ に対する

$$
e^{ith}
$$

は前節で確認した通り unitary です。

<!-- definition-example-end -->

unitary 元では

$$
\|u\|^2
=
\|u^*u\|
=
1
$$

なので

$$
\boxed{\|u\|=1}
$$

です。

<a id="def-oa3-projection"></a>

<!-- formal-statement-start -->
### 定義（projection）

単位的 $C^*$-環 $A$ の元 $p$ が

$$
p^*=p,
\qquad
p^2=p
$$

を満たすとき、$p$ を **projection** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-projection -->

**定義の確認**

$M_2(\mathbb C)$ の

$$
p=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
$$

は

$$
p^*=p,
\qquad
p^2=p
$$

なので projection です。

Hilbert 空間上では、閉部分空間への直交射影がこの条件を満たします。

<!-- definition-example-end -->

多項式スペクトル写像を $p^2-p=0$ に使うと、任意の $\lambda\in\sigma_A(p)$ は

$$
\lambda^2-\lambda=0
$$

を満たします。従って

$$
\boxed{
\sigma_A(p)\subset\{0,1\}.
}
$$

$p\ne0$ なら $\|p\|=r(p)=1$ です。

---

## 5. 可換 C*-環では Gelfand 変換が元を消さない

OA2 では一般の可換 Banach 環で

$$
\|\widehat a\|_\infty=r(a)
$$

まで得ました。しかし $r(a)$ と $\|a\|$ が一致しない場合があり、冪零元が Gelfand 変換で消えることもありました。

$C^*$-環では、この欠陥が消えます。

<a id="thm-oa3-commutative-gelfand-isometry"></a>

<!-- formal-statement-start -->
### 定理（可換 C*-環では Gelfand 変換は等長かつ単射）

$A$ を可換単位的 $C^*$-環とする。Gelfand 変換

$$
\Gamma:A\to C(\Delta(A)),
\qquad
\Gamma(a)=\widehat a
$$

は任意の $a\in A$ に対して

$$
\boxed{
\|\widehat a\|_\infty=\|a\|
}
$$

を満たす。従って $\Gamma$ は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

まず character が随伴を複素共役へ送ることを示します。自己共役元に対して character の値が実数になることは、前節と同じ unitary 指数関数の議論で分かります。

その後、

$$
\|a\|^2=\|a^*a\|
$$

と OA2 のスペクトル半径表示を組み合わせます。

<!-- proof-start -->
### 証明

$\varphi\in\Delta(A)$ を固定します。

自己共役元 $h=h^*$ に対して前節と同じ議論を行うと

$$
\varphi(h)\in\mathbb R.
$$

任意の $a\in A$ を

$$
a=h+ik,
$$

$$
h=\frac{a+a^*}{2},
\qquad
k=\frac{a-a^*}{2i}
$$

と自己共役元へ分解します。すると

$$
a^*=h-ik.
$$

$\varphi(h),\varphi(k)$ は実数なので

$$
\begin{aligned}
\varphi(a^*)
&=
\varphi(h)-i\varphi(k)\\
&=
\overline{\varphi(h)+i\varphi(k)}\\
&=
\overline{\varphi(a)}.
\end{aligned}
$$

従って character は随伴を複素共役へ送ります。

次に $a^*a$ は

$$
(a^*a)^*=a^*a
$$

なので自己共役です。したがって前節の命題から

$$
\|a^*a\|
=
r_A(a^*a).
$$

OA2 の Gelfand 変換とスペクトル半径の一致より

$$
r_A(a^*a)
=
\|\widehat{a^*a}\|_\infty.
$$

各 $\varphi\in\Delta(A)$ について

$$
\begin{aligned}
\widehat{a^*a}(\varphi)
&=
\varphi(a^*a)\\
&=
\varphi(a^*)\varphi(a)\\
&=
\overline{\varphi(a)}\varphi(a)\\
&=
|\widehat a(\varphi)|^2.
\end{aligned}
$$

従って

$$
\|\widehat{a^*a}\|_\infty
=
\|\widehat a\|_\infty^2.
$$

$C^*$-恒等式を合わせると

$$
\|a\|^2
=
\|a^*a\|
=
\|\widehat a\|_\infty^2.
$$

両辺の非負平方根を取り、

$$
\|a\|
=
\|\widehat a\|_\infty.
$$

特に $\widehat a=0$ なら $\|a\|=0$ なので $a=0$ です。従って Gelfand 変換は単射です。
<!-- proof-end -->

OA2 の双対数型 Banach 環では非零冪零元が Gelfand 変換で消えました。可換 $C^*$-環では等長性により、その現象は起こりません。

ただし現段階では

$$
\Gamma(A)=C(\Delta(A))
$$

まで証明していません。「等長に埋め込める」ことと「全ての連続関数を得られる」ことは別です。後者が次章の可換 Gelfand--Naimark 定理です。

---

## 6. *-準同型はノルムまで自動的に制御する

Banach 環の準同型では、代数構造を保つことと連続性は一般に別問題です。$C^*$-環では、随伴を保つ準同型は非常に強く制約されます。

<a id="def-oa3-unital-star-hom"></a>

<!-- formal-statement-start -->
### 定義（単位的 *-準同型）

単位的 $C^*$-環 $A,B$ の間の写像

$$
\pi:A\to B
$$

が複素線形で、

$$
\pi(ab)=\pi(a)\pi(b),
$$

$$
\pi(a^*)=\pi(a)^*,
$$

$$
\pi(1_A)=1_B
$$

を全ての $a,b\in A$ について満たすとき、$\pi$ を **単位的 *-準同型** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-unital-star-hom -->

**定義の確認**

$K$ をコンパクト Hausdorff 空間、$x\in K$ とすると点評価

$$
\varepsilon_x:C(K)\to\mathbb C,
\qquad
\varepsilon_x(f)=f(x)
$$

は OA2 の character です。

さらに

$$
\varepsilon_x(f^*)
=
\overline{f(x)}
=
\varepsilon_x(f)^*
$$

なので、$C^*$-環の立場では単位的 *-準同型でもあります。

<!-- definition-example-end -->

<a id="thm-oa3-star-hom-contractive"></a>

<!-- formal-statement-start -->
### 定理（単位的 *-準同型は縮小的である）

単位的 $C^*$-環 $A,B$ の間の単位的 *-準同型

$$
\pi:A\to B
$$

に対し、任意の $a\in A$ について

$$
\boxed{
\|\pi(a)\|\le\|a\|
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず自己共役元 $h$ に対して、準同型が可逆性を保つことからスペクトル包含

$$
\sigma_B(\pi(h))
\subset
\sigma_A(h)
$$

を得ます。自己共役元ではノルムがスペクトル半径に一致するので縮小性が従います。

一般の $a$ は $a^*a$ へ移し、$C^*$-恒等式で戻します。

<!-- proof-start -->
### 証明

$h=h^*$ とします。$\lambda\notin\sigma_A(h)$ なら

$$
\lambda1_A-h
$$

は可逆です。その逆元を $c$ とすると

$$
(\lambda1_A-h)c
=
c(\lambda1_A-h)
=
1_A.
$$

$\pi$ を作用させると

$$
(\lambda1_B-\pi(h))\pi(c)
=
\pi(c)(\lambda1_B-\pi(h))
=
1_B.
$$

従って $\lambda1_B-\pi(h)$ も可逆です。よって

$$
\sigma_B(\pi(h))
\subset
\sigma_A(h).
$$

$\pi(h)^*=\pi(h)$ なので、自己共役元のノルムとスペクトル半径の一致から

$$
\begin{aligned}
\|\pi(h)\|
&=
r_B(\pi(h))\\
&\le
r_A(h)\\
&=
\|h\|.
\end{aligned}
$$

次に一般の $a\in A$ を取ります。$a^*a$ は自己共役なので、今示した評価を使えます。

$$
\begin{aligned}
\|\pi(a)\|^2
&=
\|\pi(a)^*\pi(a)\|\\
&=
\|\pi(a^*)\pi(a)\|\\
&=
\|\pi(a^*a)\|\\
&\le
\|a^*a\|\\
&=
\|a\|^2.
\end{aligned}
$$

両辺の平方根を取り、

$$
\|\pi(a)\|\le\|a\|.
$$
<!-- proof-end -->

「*-準同型である」と分かった時点で、別途連続性を仮定しなくてもよいことが重要です。

---

## 7. 正元：非負実数に対応する元

自己共役元は実数の役割を担いました。その中でスペクトルが負側へ出ないものが、非負実数に対応します。

<a id="def-oa3-positive"></a>

<!-- formal-statement-start -->
### 定義（正元）

単位的 $C^*$-環 $A$ の元 $a$ が自己共役で、

$$
\boxed{
\sigma_A(a)\subset[0,\infty)
}
$$

を満たすとき、$a$ を **正元** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa3-positive -->

**定義の確認**

### 例1：$C(K)$

$f=f^*$ なら $f$ は実数値です。$C(K)$ では

$$
\sigma_{C(K)}(f)=f(K)
$$

なので、$f$ が正元であることは

$$
f(x)\ge0
\qquad
(\forall x\in K)
$$

と同値です。

### 例2：projection

projection $p$ は自己共役で、

$$
\sigma_A(p)\subset\{0,1\}.
$$

従って全ての projection は正元です。

### 例3：Hermite 行列

$M_n(\mathbb C)$ では、自己共役元は Hermite 行列です。有限次元スペクトル定理により、正元は全固有値が非負の Hermite 行列、すなわち通常の正半定値行列に一致します。

<!-- definition-example-end -->

ここでは「正」をスペクトルで定義しました。この定義は $C(K)$ の非負関数、行列の正半定値性、作用素の非負性を同じ言葉へまとめます。

---

## 8. 自己共役元一個が生成する部分代数では逆元も戻ってくる

正の平方根を作る前に、一つ技術的な準備をします。

自己共役元 $a$ について

$$
B=
\overline{
\{p(a):p\in\mathbb C[z]\}
}
$$

と置きます。$a^*=a$ なので $B$ は可換な単位的 $C^*$-部分環です。

一般の Banach 部分環では、$A$ で可逆な元の逆元が部分環へ戻るとは限りません。しかし自己共役元一個から作ったこの $B$ では戻ります。

<a id="lem-oa3-self-adjoint-generated-inverse"></a>

<!-- formal-statement-start -->
### 補題（自己共役元が生成する閉部分代数では逆元を多項式で近似できる）

$A$ を単位的 $C^*$-環、$a=a^*\in A$ とし、

$$
B=
\overline{
\{p(a):p\in\mathbb C[z]\}
}
$$

とする。このとき

$$
\boxed{
\sigma_B(a)=\sigma_A(a)
}
$$

である。

特に $\lambda\notin\sigma_A(a)$ なら

$$
(a-\lambda1)^{-1}\in B.
$$
<!-- formal-statement-end -->

### 証明の見取り図

常に

$$
\sigma_A(a)\subset\sigma_B(a)
$$

です。逆向きを示します。

両方のスペクトルは自己共役性から実数に含まれます。そこで実数

$$
\lambda\notin\sigma_A(a)
$$

を固定し、コンパクト集合 $K=\sigma_A(a)$ 上の連続関数

$$
f(t)=\frac1{t-\lambda}
$$

を実多項式で一様近似します。

多項式 $q$ が実係数なら $q(a)$ は自己共役なので、

$$
\|q(a)\|
=
r_A(q(a))
=
\max_{t\in K}|q(t)|
$$

とノルムをスペクトル上の一様ノルムで正確に計算できます。

<!-- proof-start -->
### 証明

$B\subset A$ なので、$B$ で可逆なら $A$ でも可逆です。従って

$$
\sigma_A(a)\subset\sigma_B(a).
$$

両方の環で $a$ は自己共役なので、前節の定理から

$$
\sigma_A(a)\subset\mathbb R,
\qquad
\sigma_B(a)\subset\mathbb R.
$$

逆向きの包含を示すため、実数

$$
\lambda\notin\sigma_A(a)
$$

を取ります。

$$
K=\sigma_A(a)
$$

はコンパクトな実数集合で、$\lambda\notin K$ です。従って

$$
f(t)=\frac1{t-\lambda}
$$

は $K$ 上の実数値連続関数です。

$K$ 上の実多項式全体は定数を含み点を分離する実部分代数なので、RA8 の実 Stone--Weierstrass 定理から、実係数多項式 $p_n$ を

$$
\sup_{t\in K}
\left|
p_n(t)-\frac1{t-\lambda}
\right|
\longrightarrow0
$$

となるように選べます。

そこで

$$
q_n(t)
=
(t-\lambda)p_n(t)-1
$$

と置きます。$q_n$ は実係数多項式なので $q_n(a)$ は自己共役です。

自己共役元ではノルムとスペクトル半径が一致し、多項式スペクトル写像により

$$
\begin{aligned}
\|q_n(a)\|
&=
r_A(q_n(a))\\
&=
\max_{\mu\in\sigma_A(q_n(a))}|\mu|\\
&=
\max_{t\in K}|q_n(t)|.
\end{aligned}
$$

右辺は $0$ へ収束するので

$$
(a-\lambda1)p_n(a)-1
=
q_n(a)
\longrightarrow0.
$$

$A$ では $a-\lambda1$ は可逆なので、その逆元を左から掛けると

$$
\begin{aligned}
\left\|
p_n(a)-(a-\lambda1)^{-1}
\right\|
&=
\left\|
(a-\lambda1)^{-1}
\bigl((a-\lambda1)p_n(a)-1\bigr)
\right\|\\
&\le
\|(a-\lambda1)^{-1}\|\,\|q_n(a)\|\\
&\longrightarrow0.
\end{aligned}
$$

各 $p_n(a)$ は $B$ に属し、$B$ は閉なので

$$
(a-\lambda1)^{-1}\in B.
$$

従って $\lambda\notin\sigma_B(a)$ です。

実数上で

$$
\sigma_B(a)\subset\sigma_A(a)
$$

が得られ、両スペクトルは実数に含まれるため

$$
\sigma_B(a)=\sigma_A(a).
$$
<!-- proof-end -->

この補題は「自己共役元一個」に必要な逆元だけを多項式近似で回収したものです。一般の連続関数 $f(a)$ を体系化するのは次章の仕事です。

---

## 9. 正元には一意な正の平方根がある

非負実数 $x$ には一意な非負平方根 $\sqrt x$ があります。正元でも同じことが成立します。

<a id="thm-oa3-positive-square-root"></a>

<!-- formal-statement-start -->
### 定理（正元には一意な正の平方根が存在する）

単位的 $C^*$-環 $A$ の正元 $a$ に対して、正元 $b$ がただ一つ存在し、

$$
\boxed{
b^2=a
}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$K=\sigma_A(a)\subset[0,\infty)$ 上で

$$
t\mapsto\sqrt t
$$

を実多項式 $p_n$ で一様近似します。

実係数多項式 $q$ については $q(a)$ が自己共役なので、

$$
\|q(a)\|
=
\max_{t\in K}|q(t)|
$$

です。したがって $(p_n(a))$ は Cauchy 列になり、Banach 完備性から極限 $b$ が作れます。

正性は、前節の部分環 $B$ の character で確認します。一意性は、別の正の平方根 $c$ に対して同じ近似列を $c^2=a$ へ代入して示します。

<!-- proof-start -->
### 証明

$a$ は正元なので

$$
a=a^*,
\qquad
K:=\sigma_A(a)\subset[0,\infty).
$$

$K$ はコンパクトです。RA8 の実 Stone--Weierstrass 定理を $K$ に適用し、実係数多項式 $p_n$ を

$$
\sup_{t\in K}
|p_n(t)-\sqrt t|
\longrightarrow0
$$

となるように取ります。

#### 1. $p_n(a)$ は Cauchy 列

$p_n-p_m$ は実係数多項式なので

$$
(p_n-p_m)(a)
$$

は自己共役です。従って

$$
\begin{aligned}
\|p_n(a)-p_m(a)\|
&=
r_A((p_n-p_m)(a))\\
&=
\max_{t\in K}
|p_n(t)-p_m(t)|.
\end{aligned}
$$

右辺は $n,m\to\infty$ で $0$ へ行くので、$(p_n(a))$ は Cauchy 列です。

$A$ は Banach 空間なので、ある $b\in A$ が存在して

$$
p_n(a)\to b
$$

となります。

各 $p_n(a)$ は自己共役で、随伴は連続なので

$$
b^*=b.
$$

#### 2. $b^2=a$

一様収束

$$
p_n(t)\to\sqrt t
$$

から、$K$ 上で

$$
p_n(t)^2\to t
$$

も一様に成り立ちます。実際、$(p_n)$ は一様に有界なので

$$
|p_n(t)^2-t|
=
|p_n(t)-\sqrt t|\,
|p_n(t)+\sqrt t|
$$

の第2因子を一様に抑えられます。

多項式

$$
r_n(t)=p_n(t)^2-t
$$

は実係数なので

$$
\begin{aligned}
\|p_n(a)^2-a\|
&=
\|r_n(a)\|\\
&=
\max_{t\in K}|r_n(t)|\\
&\longrightarrow0.
\end{aligned}
$$

一方 $p_n(a)\to b$ なので積の連続性から

$$
p_n(a)^2\to b^2.
$$

従って

$$
b^2=a.
$$

#### 3. $b$ は正元

前節の

$$
B=
\overline{\{p(a):p\in\mathbb C[z]\}}
$$

を考えます。補題から

$$
\sigma_B(a)=\sigma_A(a)=K.
$$

OA2 の character 表示により、任意の $\varphi\in\Delta(B)$ について

$$
\varphi(a)\in K\subset[0,\infty).
$$

また

$$
\varphi(p_n(a))
=
p_n(\varphi(a)).
$$

character は連続なので $p_n(a)\to b$ から

$$
\begin{aligned}
\varphi(b)
&=
\lim_{n\to\infty}\varphi(p_n(a))\\
&=
\lim_{n\to\infty}p_n(\varphi(a))\\
&=
\sqrt{\varphi(a)}
\ge0.
\end{aligned}
$$

OA2 のスペクトル表示を $B$ の元 $b$ に適用すると

$$
\sigma_B(b)
=
\{\varphi(b):\varphi\in\Delta(B)\}
\subset[0,\infty).
$$

$B\subset A$ なので

$$
\sigma_A(b)\subset\sigma_B(b).
$$

従って

$$
\sigma_A(b)\subset[0,\infty).
$$

すでに $b=b^*$ なので、$b$ は正元です。

#### 4. 一意性

$c$ も正元で

$$
c^2=a
$$

を満たすとします。

多項式スペクトル写像から

$$
\sigma_A(a)
=
\sigma_A(c^2)
=
\{t^2:t\in\sigma_A(c)\}.
$$

$c$ は正元なので

$$
\sigma_A(c)\subset[0,\infty).
$$

従って $t\in\sigma_A(c)$ に対し

$$
\sqrt{t^2}=t.
$$

先ほどの多項式 $p_n$ について

$$
p_n(c^2)-c
$$

は自己共役です。そのノルムをスペクトルで計算すると

$$
\begin{aligned}
\|p_n(c^2)-c\|
&=
r_A(p_n(c^2)-c)\\
&=
\max_{t\in\sigma_A(c)}
|p_n(t^2)-t|.
\end{aligned}
$$

$t^2\in K$ であり $p_n(s)\to\sqrt s$ が $K$ 上一様なので、右辺は $0$ へ収束します。

$c^2=a$ だから

$$
p_n(c^2)=p_n(a).
$$

よって

$$
p_n(a)\to c.
$$

一方、構成から

$$
p_n(a)\to b.
$$

ノルム極限は一意なので

$$
b=c.
$$

従って正の平方根は一意です。
<!-- proof-end -->

この一意な正元を

$$
a^{1/2}
$$

と書きます。

$C(K)$ では

$$
a^{1/2}(x)=\sqrt{a(x)}
$$

そのものです。抽象 $C^*$-環でも、同じ「点ごとの平方根」がスペクトルと多項式近似を通じて再構成されたと読めます。

なお、本章では正性を自己共役元のスペクトルで定義しました。一般の $x\in A$ に対する $x^*x$ と正元の関係、さらに任意の連続関数 $f$ を $f(a)$ として代入する体系は、連続関数計算を整備すると一つの枠組みで扱えます。

---

# 演習

## Level A

### A1. $C(K)$ の随伴と C*-恒等式

- Level: A

$K$ を非空コンパクト Hausdorff 空間とし、$A=C(K)$ に一様ノルムを入れる。

$$
f^*(x)=\overline{f(x)}
$$

と定めるとき、次を示せ。

1. $(fg)^*=g^*f^*$。
2. $\|f^*\|_\infty=\|f\|_\infty$。
3. $\|f^*f\|_\infty=\|f\|_\infty^2$。
4. $f$ が自己共役であることと、$f$ が実数値であることは同値である。

<!-- solution-start -->
### 詳細解答

#### 1. 積の順序反転

任意の $x\in K$ に対して

$$
\begin{aligned}
(fg)^*(x)
&=
\overline{f(x)g(x)}\\
&=
\overline{g(x)}\,\overline{f(x)}\\
&=
g^*(x)f^*(x).
\end{aligned}
$$

全ての $x$ で一致するので

$$
(fg)^*=g^*f^*.
$$

#### 2. 随伴のノルム

$$
\begin{aligned}
\|f^*\|_\infty
&=
\max_{x\in K}|f^*(x)|\\
&=
\max_{x\in K}|\overline{f(x)}|\\
&=
\max_{x\in K}|f(x)|\\
&=
\|f\|_\infty.
\end{aligned}
$$

#### 3. C*-恒等式

$$
f^*f(x)
=
\overline{f(x)}f(x)
=
|f(x)|^2.
$$

従って

$$
\begin{aligned}
\|f^*f\|_\infty
&=
\max_{x\in K}|f(x)|^2\\
&=
\left(
\max_{x\in K}|f(x)|
\right)^2\\
&=
\|f\|_\infty^2.
\end{aligned}
$$

#### 4. 自己共役性

$f=f^*$ とは、全ての $x\in K$ で

$$
f(x)=\overline{f(x)}
$$

が成り立つことです。

複素数 $z$ について $z=\overline z$ は $z\in\mathbb R$ と同値なので、これは $f$ が実数値であることと同値です。
<!-- solution-end -->

### A2. 行列の自己共役部分と反自己共役部分

- Level: A

$A\in M_n(\mathbb C)$ に対して

$$
H=\frac{A+A^*}{2},
\qquad
K=\frac{A-A^*}{2i}
$$

と置く。

1. $H^*=H$、$K^*=K$ を示せ。
2. $A=H+iK$ を示せ。
3. この表示が自己共役元 $H,K$ による表示として一意であることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 自己共役性

$$
\begin{aligned}
H^*
&=
\left(\frac{A+A^*}{2}\right)^*\\
&=
\frac{A^*+(A^*)^*}{2}\\
&=
\frac{A^*+A}{2}
=
H.
\end{aligned}
$$

次に

$$
\begin{aligned}
K^*
&=
\left(\frac{A-A^*}{2i}\right)^*\\
&=
\frac{A^*-(A^*)^*}{-2i}\\
&=
\frac{A^*-A}{-2i}\\
&=
\frac{A-A^*}{2i}
=
K.
\end{aligned}
$$

#### 2. 再構成

$$
\begin{aligned}
H+iK
&=
\frac{A+A^*}{2}
+
i\frac{A-A^*}{2i}\\
&=
\frac{A+A^*+A-A^*}{2}\\
&=
A.
\end{aligned}
$$

#### 3. 一意性

$$
A=H_1+iK_1=H_2+iK_2
$$

で $H_j,K_j$ が自己共役とします。

随伴を取ると

$$
A^*
=
H_1-iK_1
=
H_2-iK_2.
$$

元の式と足せば

$$
A+A^*=2H_1=2H_2
$$

なので $H_1=H_2$。

差を取れば

$$
A-A^*=2iK_1=2iK_2
$$

なので $K_1=K_2$ です。
<!-- solution-end -->

### A3. unitary と projection の基本量

- Level: A

単位的 $C^*$-環 $A$ で、$u$ を unitary 元、$p$ を非零 projection とする。

1. $\|u\|=1$ を示せ。
2. $\sigma_A(p)\subset\{0,1\}$ を示せ。
3. $\|p\|=1$ を示せ。

<!-- solution-start -->
### 詳細解答

#### 1. unitary のノルム

$u^*u=1$ なので $C^*$-環の定義条件から

$$
\|u\|^2
=
\|u^*u\|
=
\|1\|.
$$

単位的 Banach 環では $\|1\|=1$ なので

$$
\|u\|=1.
$$

#### 2. projection のスペクトル

$p^2=p$ なので

$$
p^2-p=0.
$$

多項式

$$
q(z)=z^2-z=z(z-1)
$$

を考えます。多項式スペクトル写像から

$$
\sigma_A(q(p))
=
q(\sigma_A(p)).
$$

左辺は $q(p)=0$ なので $\{0\}$ です。従って任意の $\lambda\in\sigma_A(p)$ について

$$
\lambda(\lambda-1)=0.
$$

よって

$$
\sigma_A(p)\subset\{0,1\}.
$$

#### 3. projection のノルム

$p$ は自己共役なので

$$
\|p\|=r_A(p).
$$

$p\ne0$ なのに $\sigma_A(p)=\{0\}$ なら、スペクトル半径公式から $\|p\|=0$ となり矛盾です。従って $1\in\sigma_A(p)$ であり、

$$
r_A(p)=1.
$$

よって

$$
\|p\|=1.
$$
<!-- solution-end -->

### A4. *-準同型は自己共役元と projection を保つ

- Level: A

$\pi:A\to B$ を単位的 $C^*$-環の間の単位的 *-準同型とする。

1. $h=h^*$ なら $\pi(h)$ も自己共役であることを示せ。
2. $p$ が projection なら $\pi(p)$ も projection であることを示せ。
3. $u$ が unitary なら $\pi(u)$ も unitary であることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 自己共役元

$$
\pi(h)^*
=
\pi(h^*)
=
\pi(h).
$$

従って $\pi(h)$ は自己共役です。

#### 2. projection

$p^*=p$、$p^2=p$ なので

$$
\pi(p)^*
=
\pi(p^*)
=
\pi(p),
$$

また

$$
\pi(p)^2
=
\pi(p^2)
=
\pi(p).
$$

従って $\pi(p)$ は projection です。

#### 3. unitary

$u^*u=uu^*=1_A$ なので

$$
\pi(u)^*\pi(u)
=
\pi(u^*)\pi(u)
=
\pi(u^*u)
=
\pi(1_A)
=
1_B.
$$

同様に

$$
\pi(u)\pi(u)^*
=
1_B.
$$

従って $\pi(u)$ は unitary です。
<!-- solution-end -->

## Level B

### B1. 自己共役元のノルムと高い偶数冪

- Level: B

$h=h^*$ を単位的 $C^*$-環の自己共役元とする。

1. 全ての $m\ge0$ について

$$
\|h^{2^m}\|
=
\|h\|^{2^m}
$$

を示せ。
2. この式とスペクトル半径公式から

$$
r_A(h)=\|h\|
$$

を導け。
3. $h^2=0$ なら $h=0$ を示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 帰納法

$m=0$ では

$$
\|h^{2^0}\|=\|h\|
$$

で自明です。

$m$ で

$$
\|h^{2^m}\|=\|h\|^{2^m}
$$

とします。$h^{2^m}$ も自己共役なので

$$
\begin{aligned}
\|h^{2^{m+1}}\|
&=
\|(h^{2^m})^2\|\\
&=
\|(h^{2^m})^*h^{2^m}\|\\
&=
\|h^{2^m}\|^2\\
&=
\|h\|^{2^{m+1}}.
\end{aligned}
$$

従って全ての $m$ で成立します。

#### 2. スペクトル半径

OA1 のスペクトル半径公式から

$$
r_A(h)
=
\lim_{n\to\infty}\|h^n\|^{1/n}.
$$

部分列 $n=2^m$ を取ると

$$
\begin{aligned}
r_A(h)
&=
\lim_{m\to\infty}
\|h^{2^m}\|^{1/2^m}\\
&=
\lim_{m\to\infty}
\left(\|h\|^{2^m}\right)^{1/2^m}\\
&=
\|h\|.
\end{aligned}
$$

#### 3. $h^2=0$

$C^*$-恒等式から

$$
\|h\|^2
=
\|h^*h\|
=
\|h^2\|
=
0.
$$

従って $\|h\|=0$、よって $h=0$ です。
<!-- solution-end -->

### B2. 可換 C*-環の character は随伴を保つ

- Level: B

$A$ を可換単位的 $C^*$-環、$\varphi\in\Delta(A)$ とする。

1. 自己共役元 $h$ に対して $\varphi(h)\in\mathbb R$ を示せ。
2. 任意の $a\in A$ に対して

$$
\varphi(a^*)
=
\overline{\varphi(a)}
$$

を示せ。
3. これを使って

$$
\|\widehat a\|_\infty=\|a\|
$$

を導け。

<!-- solution-start -->
### 詳細解答

#### 1. 自己共役元の character 値

$t\in\mathbb R$ に対して

$$
u_t=e^{ith}
$$

と置きます。

$h=h^*$ なので

$$
u_t^*=e^{-ith},
$$

従って

$$
u_t^*u_t=1.
$$

よって $\|u_t\|=1$ です。

OA2 により $\|\varphi\|=1$ なので

$$
|\varphi(u_t)|\le1.
$$

$u_t^{-1}=u_{-t}$ にも同じ評価を使い、

$$
\varphi(u_t)\varphi(u_{-t})=1
$$

を合わせると

$$
|\varphi(u_t)|=1.
$$

一方、

$$
\varphi(u_t)=e^{it\varphi(h)}.
$$

$\varphi(h)=\alpha+i\beta$ と書けば絶対値は $e^{-t\beta}$ です。全ての実数 $t$ で $1$ なので $\beta=0$。

従って

$$
\varphi(h)\in\mathbb R.
$$

#### 2. 随伴保存

$$
a=h+ik,
$$

$$
h=\frac{a+a^*}{2},
\qquad
k=\frac{a-a^*}{2i}
$$

と分解します。$h,k$ は自己共役なので $\varphi(h),\varphi(k)$ は実数です。

従って

$$
\begin{aligned}
\varphi(a^*)
&=
\varphi(h-ik)\\
&=
\varphi(h)-i\varphi(k)\\
&=
\overline{\varphi(h)+i\varphi(k)}\\
&=
\overline{\varphi(a)}.
\end{aligned}
$$

#### 3. 等長性

$$
\|a\|^2
=
\|a^*a\|.
$$

$a^*a$ は自己共役なので

$$
\|a^*a\|
=
r_A(a^*a).
$$

OA2 より

$$
r_A(a^*a)
=
\|\widehat{a^*a}\|_\infty.
$$

各 character で

$$
\widehat{a^*a}(\varphi)
=
\varphi(a^*)\varphi(a)
=
|\varphi(a)|^2.
$$

従って

$$
\|\widehat{a^*a}\|_\infty
=
\|\widehat a\|_\infty^2.
$$

以上から

$$
\|a\|^2
=
\|\widehat a\|_\infty^2,
$$

よって

$$
\|a\|
=
\|\widehat a\|_\infty.
$$
<!-- solution-end -->

### B3. 単位的 *-準同型の縮小性を再構成する

- Level: B

$\pi:A\to B$ を単位的 $C^*$-環の間の単位的 *-準同型とする。

1. 自己共役元 $h$ について

$$
\sigma_B(\pi(h))
\subset
\sigma_A(h)
$$

を示せ。
2. 自己共役元について

$$
\|\pi(h)\|\le\|h\|
$$

を示せ。
3. 一般の $a\in A$ について

$$
\|\pi(a)\|\le\|a\|
$$

を示せ。

<!-- solution-start -->
### 詳細解答

#### 1. スペクトル包含

$\lambda\notin\sigma_A(h)$ とします。すると $\lambda1_A-h$ は可逆です。

逆元を $c$ とすれば

$$
(\lambda1_A-h)c
=
c(\lambda1_A-h)
=
1_A.
$$

$\pi$ を作用させると

$$
(\lambda1_B-\pi(h))\pi(c)
=
\pi(c)(\lambda1_B-\pi(h))
=
1_B.
$$

従って $\lambda1_B-\pi(h)$ も可逆です。

よって

$$
\sigma_B(\pi(h))
\subset
\sigma_A(h).
$$

#### 2. 自己共役元のノルム

$\pi(h)$ も自己共役なので

$$
\|\pi(h)\|
=
r_B(\pi(h)).
$$

1の包含から

$$
r_B(\pi(h))
\le
r_A(h).
$$

$h$ も自己共役なので

$$
r_A(h)=\|h\|.
$$

従って

$$
\|\pi(h)\|\le\|h\|.
$$

#### 3. 一般の元

$$
\begin{aligned}
\|\pi(a)\|^2
&=
\|\pi(a)^*\pi(a)\|\\
&=
\|\pi(a^*a)\|\\
&\le
\|a^*a\|\\
&=
\|a\|^2.
\end{aligned}
$$

平方根を取り、

$$
\|\pi(a)\|\le\|a\|.
$$
<!-- solution-end -->

### B4. $C([0,1])$ で正の平方根を確認する

- Level: B

$A=C([0,1])$ とし、

$$
f(t)=t(1-t)
$$

とする。

1. $f$ が正元であることを示せ。
2. 正の平方根 $g=f^{1/2}$ を具体的に書け。
3. $g\in C([0,1])$ と $g^2=f$ を確認せよ。
4. $h\in C([0,1])$ が正元で $h^2=f$ を満たすなら $h=g$ であることを点ごとに示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 正性

$0\le t\le1$ なら

$$
t(1-t)\ge0.
$$

$f$ は実数値なので自己共役です。

$C([0,1])$ ではスペクトルは値域に一致するため

$$
\sigma_A(f)
=
f([0,1])
\subset[0,\infty).
$$

従って $f$ は正元です。

#### 2. 平方根

点ごとに非負平方根を取り、

$$
g(t)=\sqrt{t(1-t)}
$$

と置きます。

#### 3. 連続性と平方

$t\mapsto t(1-t)$ は連続で非負、$s\mapsto\sqrt s$ は $[0,\infty)$ 上連続なので合成 $g$ も連続です。

また

$$
g(t)^2
=
t(1-t)
=
f(t)
$$

なので

$$
g^2=f.
$$

$g(t)\ge0$ なので $g$ は正元です。

#### 4. 一意性

$h$ が正元なら $C([0,1])$ では

$$
h(t)\ge0
$$

です。

さらに $h^2=f$ なので各 $t$ で

$$
h(t)^2=t(1-t).
$$

非負平方根の一意性から

$$
h(t)=\sqrt{t(1-t)}=g(t).
$$

全ての $t$ で一致するので

$$
h=g.
$$
<!-- solution-end -->

## Level C

### C1. 一つの projection が生成する C*-環を完全に読む

- Level: C

$A$ を単位的 $C^*$-環、$p\in A$ を

$$
p\ne0,
\qquad
p\ne1
$$

を満たす projection とする。複素数 $\alpha,\beta$ に対して

$$
a=\alpha p+\beta(1-p)
$$

と置く。

1. $p(1-p)=(1-p)p=0$ を示せ。
2. $a$ が可逆であるための必要十分条件が

$$
\alpha\ne0,
\qquad
\beta\ne0
$$

であることを示し、そのときの逆元を求めよ。
3. $\sigma_A(a)=\{\alpha,\beta\}$ を示せ。
4. $\alpha,\beta\in\mathbb R$ のとき $a$ が自己共役であることを示し、

$$
\|a\|
=
\max\{|\alpha|,|\beta|\}
$$

を導け。
5. $\alpha,\beta\ge0$ のとき $a$ は正元であり、

$$
a^{1/2}
=
\sqrt\alpha\,p
+
\sqrt\beta\,(1-p)
$$

であることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 直交性

$p^2=p$ なので

$$
p(1-p)=p-p^2=0.
$$

同様に

$$
(1-p)p=p-p^2=0.
$$

また

$$
(1-p)^2
=
1-2p+p^2
=
1-p.
$$

従って $p$ と $1-p$ は互いに積が $0$ となる二つの projection です。

#### 2. 可逆性

まず $\alpha,\beta\ne0$ とします。

$$
b=
\alpha^{-1}p+\beta^{-1}(1-p)
$$

と置くと、1の直交性から

$$
\begin{aligned}
ab
&=
\alpha\alpha^{-1}p^2
+
\alpha\beta^{-1}p(1-p)\\
&\quad+
\beta\alpha^{-1}(1-p)p
+
\beta\beta^{-1}(1-p)^2\\
&=
p+(1-p)\\
&=
1.
\end{aligned}
$$

同様に $ba=1$ です。従って $a$ は可逆で

$$
a^{-1}
=
\alpha^{-1}p+\beta^{-1}(1-p).
$$

逆に $\alpha=0$ とします。このとき

$$
ap
=
\beta(1-p)p
=
0.
$$

$p\ne0$ なので、もし $a$ が可逆なら左から $a^{-1}$ を掛けて $p=0$ となり矛盾です。従って可逆ではありません。

$\beta=0$ の場合も

$$
a(1-p)=0
$$

かつ $1-p\ne0$ なので可逆ではありません。

したがって可逆性の必要十分条件は

$$
\alpha\ne0,
\qquad
\beta\ne0
$$

です。

#### 3. スペクトル

$\lambda\in\mathbb C$ に対して

$$
\lambda1-a
=
(\lambda-\alpha)p
+
(\lambda-\beta)(1-p).
$$

2を適用すると、これは

$$
\lambda-\alpha\ne0,
\qquad
\lambda-\beta\ne0
$$

のとき、かつそのときに限り可逆です。

従って非可逆になるのは

$$
\lambda=\alpha
\quad\text{または}\quad
\lambda=\beta
$$

だけです。

よって

$$
\sigma_A(a)=\{\alpha,\beta\}.
$$

#### 4. 自己共役性とノルム

$\alpha,\beta\in\mathbb R$ とします。$p^*=p$、$(1-p)^*=1-p$ なので

$$
\begin{aligned}
a^*
&=
\overline\alpha\,p^*
+
\overline\beta\,(1-p)^*\\
&=
\alpha p+\beta(1-p)\\
&=
a.
\end{aligned}
$$

従って $a$ は自己共役です。

自己共役元ではノルムとスペクトル半径が一致するので

$$
\begin{aligned}
\|a\|
&=
r_A(a)\\
&=
\max_{\lambda\in\sigma_A(a)}|\lambda|\\
&=
\max\{|\alpha|,|\beta|\}.
\end{aligned}
$$

#### 5. 正の平方根

$\alpha,\beta\ge0$ なら、3より

$$
\sigma_A(a)=\{\alpha,\beta\}\subset[0,\infty).
$$

4より $a$ は自己共役なので、$a$ は正元です。

$$
b=
\sqrt\alpha\,p
+
\sqrt\beta\,(1-p)
$$

と置きます。係数は実数なので $b=b^*$ です。

1の直交性から

$$
\begin{aligned}
b^2
&=
\alpha p^2
+
2\sqrt{\alpha\beta}\,p(1-p)
+
\beta(1-p)^2\\
&=
\alpha p+\beta(1-p)\\
&=
a.
\end{aligned}
$$

また3と同じ計算で

$$
\sigma_A(b)
=
\{\sqrt\alpha,\sqrt\beta\}
\subset[0,\infty).
$$

従って $b$ は正元です。

正の平方根の一意性から

$$
\boxed{
a^{1/2}
=
\sqrt\alpha\,p
+
\sqrt\beta\,(1-p)
}.
$$

この問題では、一つの projection が「二つの点からなる空間上の関数」と同じ代数を作ることが見えています。$\alpha$ と $\beta$ は、その二点での関数値に対応します。
<!-- solution-end -->

---

## まとめ

本章では、Banach 環へ随伴を加え、さらに

$$
\|a^*a\|=\|a\|^2
$$

でノルムと随伴を結びました。

この一つの恒等式から、

$$
\|a^*\|=\|a\|,
$$

自己共役元 $h$ について

$$
\|h\|=r(h),
\qquad
\sigma(h)\subset\mathbb R
$$

が従いました。

また、可換 $C^*$-環では OA2 の Gelfand 変換が

$$
\|\widehat a\|_\infty=\|a\|
$$

を満たすため、一般の可換 Banach 環で起きた「非零元が Gelfand 変換から消える」現象は起こりません。

さらに単位的 *-準同型は自動的に

$$
\|\pi(a)\|\le\|a\|
$$

を満たします。代数構造と随伴を保つことが、そのままノルム制御まで与えます。

最後に、正元

$$
a=a^*,
\qquad
\sigma(a)\subset[0,\infty)
$$

について、Stone--Weierstrass による多項式近似から一意な正の平方根

$$
a^{1/2}
$$

を構成しました。

次章では、この平方根だけの近似を一般化し、自己共役元・正規元に対して連続関数

$$
f\in C(\sigma(a))
$$

を直接

$$
f(a)
$$

へ送る連続関数計算を作ります。その結果、可換 $C^*$-環そのものがあるコンパクト空間上の $C(K)$ と一致することまで進みます。
