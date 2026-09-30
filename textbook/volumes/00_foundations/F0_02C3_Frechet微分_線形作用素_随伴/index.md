# F0-02C3 関数解析III：Banach空間のFréchet微分・有界線形写像・連鎖律

[実解析の多変数微分](../RA6/index.md)では、$\mathbb R^n$ 上の微分を「一つの線形写像による一次近似」として学びました。この章では、その考え方を一般のノルム空間へ広げます。

有限次元では線形写像は自動的に連続でした。無限次元ではそうとは限らないため、一次近似に使う線形写像には **有界性（連続性）** が必要です。ここが実解析の多変数微分から関数解析へ移る本質的な違いです。

この章の中心線は

~~~text
ノルム空間
  ↓
連続な線形一次近似・その大きさ
  ↓
Fréchet微分
  ↓
方向ごとの微分との比較
  ↓
合成に対する微分則
~~~

です。

---

## 1. 有界線形写像

$X,Y$ をノルム空間とします。

<a id="def-f0-02c3-bounded-linear-operator"></a>

<!-- formal-statement-start -->
> **定義（有界線形写像）**  
> 線形写像 $T:X\to Y$ に対し、ある $M<\infty$ が存在して

$$
\|Tx\|_Y\le M\|x\|_X
\qquad(\forall x\in X)
$$

> が成り立つとき、$T$ を **有界線形写像** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-bounded-linear-operator -->
### 例：積分で一つの数を返す作用素

**定義の確認**：線形性に加え、定義の不等式を具体的な定数 $M=1$ で確かめます。

$X=C([0,1])$ に

$$
\|f\|_\infty=\sup_{0\le t\le1}|f(t)|
$$

を入れ、

$$
T(f)=\int_0^1f(t)\,dt
$$

とします。$T$ は線形で、

$$
|T(f)|
\le
\int_0^1|f(t)|\,dt
\le
\|f\|_\infty
$$

なので有界です。
<!-- definition-example-end -->

線形写像については、有界性と連続性が同値です。

<a id="thm-f0-02c3-bounded-continuous-equivalence"></a>

<!-- formal-statement-start -->
> **定理（線形写像の有界性と連続性）**  
> ノルム空間 $X,Y$ の間の線形写像 $T:X\to Y$ について、次は同値である。
>
> 1. $T$ は有界である。
> 2. $T$ は $0$ で連続である。
> 3. $T$ は $X$ の各点で連続である。
<!-- formal-statement-end -->

### 証明の見取り図

有界なら

$$
\|Tx-Ty\|_Y
=
\|T(x-y)\|_Y
\le
M\|x-y\|_X
$$

なので Lipschitz 連続です。逆向きは、$0$ での連続性を線形性で拡大縮小して全空間の評価へ変換します。

<!-- proof-start -->
### 証明

有界性を仮定すると、

$$
\|Tx-Ty\|_Y
=
\|T(x-y)\|_Y
\le
M\|x-y\|_X
$$

なので $T$ は各点で連続です。従って、特に $x=0$ でも連続です。

逆に $T$ が $0$ で連続とします。$\varepsilon=1$ に対し、ある $\delta>0$ が存在して

$$
\|x\|_X<\delta
\quad\Longrightarrow\quad
\|Tx\|_Y<1
$$

となります。$x\ne0$ に対し

$$
u=\frac{\delta}{2\|x\|_X}x
$$

と置けば $\|u\|_X=\delta/2<\delta$ なので $\|Tu\|_Y<1$。線形性から

$$
\frac{\delta}{2\|x\|_X}\|Tx\|_Y<1,
$$

従って

$$
\|Tx\|_Y
<
\frac{2}{\delta}\|x\|_X.
$$

$x=0$ でも同じ評価が成り立つので $T$ は有界です。$\square$
<!-- proof-end -->

---

## 2. 作用素ノルム

有界線形写像の定義に現れる定数 $M$ は一意ではありません。例えば一つの $M$ で
$\|Tx\|\le M\|x\|$ が成り立てば、それより大きい定数でも成り立ちます。

そこで、$T$ が入力をどれだけ増幅しうるかを一つの量で測るため、**単位球上での最大増幅率**を取り出します。

<a id="def-f0-02c3-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（作用素ノルム）**  
> 有界線形写像 $T:X\to Y$ に対し、

$$
\|T\|
=
\sup_{\|x\|_X\le1}\|Tx\|_Y
$$

> を $T$ の **作用素ノルム** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-operator-norm -->
### 例：2倍写像

**定義の確認**：単位球 $|x|\le1$ 上で $|Tx|$ の上限を直接計算します。

$T:\mathbb R\to\mathbb R$、$T(x)=2x$ なら、

$$
\|T\|
=
\sup_{|x|\le1}|2x|
=
2.
$$
<!-- definition-example-end -->

定義から直ちに

$$
\boxed{
\|Tx\|_Y\le\|T\|\|x\|_X
}
$$

が得られます。また $x\ne0$ として $x/\|x\|_X$ を単位球へ入れれば、

$$
\|T\|
=
\sup_{x\ne0}
\frac{\|Tx\|_Y}{\|x\|_X}
$$

とも書けます。

さらに、$\|Tx\|_Y\le M\|x\|_X$ がすべての $x$ で成り立つなら、$\|x\|_X\le1$ 上で
$\|Tx\|_Y\le M$ なので $\|T\|\le M$ です。したがって $\|T\|$ は、この有界性評価に使える定数のうち最小のものです。

---

## 3. Fréchet微分

$U\subset X$ を開集合、$f:U\to Y$ とします。

<a id="def-f0-02c3-frechet-derivative"></a>

<!-- formal-statement-start -->
> **定義（Fréchet微分）**  
> $a\in U$ とする。ある有界線形写像 $A:X\to Y$ が存在して

$$
\frac{\|f(a+h)-f(a)-Ah\|_Y}{\|h\|_X}
\to0
\qquad(h\to0)
$$

> となるとき、$f$ は $a$ で **Fréchet微分可能** であるという。この $A$ を $Df(a)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-frechet-derivative -->
### 例：有界線形写像そのものを微分する

**定義の確認**：一次近似の候補 $A=T$ が有界線形であり、定義に現れる剰余が恒等的に0になることを確かめます。

$T:X\to Y$ を有界線形写像とし、$f(x)=Tx$ とします。任意の $x,h\in X$ について

$$
f(x+h)-f(x)-Th
=
T(x+h)-Tx-Th
=
0.
$$

したがって

$$
Df(x)=T
$$

です。線形写像は、自分自身がそのまま一次近似になっています。
<!-- definition-example-end -->

定義は

$$
f(a+h)
=
f(a)+Df(a)h+r(h),
\qquad
\|r(h)\|_Y=o(\|h\|_X)
$$

と同値です。

<a id="thm-f0-02c3-frechet-uniqueness-continuity"></a>

<!-- formal-statement-start -->
> **定理（Fréchet微分の一意性と微分可能性からの連続性）**  
> $f$ が $a$ でFréchet微分可能なら、$Df(a)$ は一意であり、$f$ は $a$ で連続である。
<!-- formal-statement-end -->

### 証明の見取り図

一意性は二つの候補を直線 $h=tv$ 上で比較します。連続性は $Df(a)$ の有界性により線形項を $O(\|h\|)$ で抑えることで従います。

<!-- proof-start -->
### 証明

$A,B$ がともに Fréchet 微分の候補だとします。固定した $v\ne0$ に対し $h=tv$ と置くと、

$$
(A-B)tv
=
\{f(a+tv)-f(a)-Btv\}
-
\{f(a+tv)-f(a)-Atv\}.
$$

ノルムを取り $|t|\|v\|$ で割って $t\to0$ とすると、

$$
\frac{\|(A-B)v\|}{\|v\|}=0.
$$

従って $(A-B)v=0$。任意の $v$ について成り立つため $A=B$ です。

次に

$$
f(a+h)-f(a)
=
Df(a)h+r(h)
$$

と書けば、有界性から

$$
\|f(a+h)-f(a)\|_Y
\le
\|Df(a)\|\|h\|_X+\|r(h)\|_Y.
$$

右辺は $h\to0$ で0へ収束するので、$f$ は $a$ で連続です。$\square$
<!-- proof-end -->

---

## 4. 方向微分とGâteaux微分

Fréchet 微分は「全方向を一つの線形写像で同時に近似する」条件でした。方向を一つずつ固定して調べるのが方向微分です。

<a id="def-f0-02c3-directional-derivative"></a>

<!-- formal-statement-start -->
> **定義（方向微分）**  
> $a\in U$、$v\in X$ に対し、

$$
D_vf(a)
=
\lim_{t\to0}
\frac{f(a+tv)-f(a)}{t}
$$

> が $Y$ で存在するとき、これを $f$ の $a$ における方向 $v$ の **方向微分** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-directional-derivative -->
### 例：二乗ノルムの方向微分

**定義の確認**：方向 $v$ を固定し、定義の一変数差商の極限を直接計算します。

実 Hilbert 空間 $H$ 上で $f(x)=\|x\|^2$ とすると、

$$
\frac{f(x+tv)-f(x)}{t}
=
2\langle x,v\rangle+t\|v\|^2
\to
2\langle x,v\rangle.
$$

従って

$$
D_vf(x)=2\langle x,v\rangle.
$$
<!-- definition-example-end -->

<a id="def-f0-02c3-gateaux-derivative"></a>

<!-- formal-statement-start -->
> **定義（Gâteaux微分）**  
> $f:U\to Y$ について、すべての $v\in X$ で方向微分 $D_vf(a)$ が存在し、写像

$$
v\longmapsto D_vf(a)
$$

> が線形であるとき、この線形写像を $f$ の $a$ における **Gâteaux微分** といい、$D_Gf(a)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c3-gateaux-derivative -->
### 例：二乗ノルムのGâteaux微分

**定義の確認**：全方向で方向微分が存在し、その値が方向 $v$ に関して線形になることを確かめます。

上の Hilbert 空間の例では、

$$
D_Gf(x)[v]
=
2\langle x,v\rangle.
$$

$v$ に関して線形なので Gâteaux 微分になっています。
<!-- definition-example-end -->

Fréchet 微分可能なら、$h=tv$ を代入して

$$
f(a+tv)-f(a)
=
tDf(a)v+o(|t|\|v\|)
$$

となるため、

$$
\boxed{
D_Gf(a)=Df(a)
}
$$

です。

しかし逆は一般に成り立ちません。方向ごとの極限は、方向を変えながら $h\to0$ とする挙動を制御しないからです。

### 例：Gâteaux微分可能だがFréchet微分可能でない

$\mathbb R^2$ 上で

$$
f(x,y)
=
\begin{cases}
\dfrac{x^6y}{x^{12}+y^2},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0)
\end{cases}
$$

とします。固定した方向 $v=(a,b)$ について $t\to0$ を考えます。

$b\ne0$ なら

$$
\frac{f(ta,tb)}{t}
=
\frac{t^4a^6b}{t^{10}a^{12}+b^2}
\to0,
$$

$b=0$ なら最初から0です。従って全方向微分は0で、

$$
D_Gf(0,0)=0
$$

です。

ところが曲線 $y=x^6$ 上では

$$
f(x,x^6)=\frac12
\qquad(x\ne0).
$$

原点へ近づいても値が0へ行かないため、$f$ は原点で連続ですらありません。Fréchet 微分可能なら連続であるため、原点では Fréchet 微分可能ではありません。

---

## 5. Hilbert空間では微分をRiesz表現ベクトルで表せる

$f:H\to\mathbb R$ が Fréchet 微分可能なら、

$$
Df(x):H\to\mathbb R
$$

は連続線形汎関数です。従って [Riesz表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation) により、一意な $g_f(x)\in H$ が存在して

$$
Df(x)[h]
=
\langle g_f(x),h\rangle_H
$$

と書けます。

### 例：二乗ノルム

$$
f(x)=\frac12\|x\|^2
$$

なら、

$$
f(x+h)-f(x)
=
\langle x,h\rangle+\frac12\|h\|^2.
$$

したがって

$$
Df(x)[h]=\langle x,h\rangle,
\qquad
g_f(x)=x.
$$

固定した $g\in H$ に対する

$$
J(x)=\frac12\|x-g\|^2
$$

では、

$$
DJ(x)[h]
=
\langle x-g,h\rangle,
\qquad
g_J(x)=x-g.
$$

有限次元で偏微分を並べたベクトル表示は、この Riesz 表現の特別な場合です。

---

## 6. Fréchet連鎖律

<a id="thm-f0-02c3-frechet-composition"></a>

<!-- formal-statement-start -->
> **定理（Fréchet連鎖律）**  
> $X,Y,Z$ をノルム空間、$U\subset X$、$V\subset Y$ を開集合とする。$f:U\to V$ が $a$ で Fréchet 微分可能、$g:V\to Z$ が $f(a)$ で Fréchet 微分可能なら、$g\circ f$ は $a$ で Fréchet 微分可能で

$$
D(g\circ f)(a)
=
Dg(f(a))\circ Df(a)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ と $g$ をそれぞれ「有界線形部分 + 小さい残差」に分けます。核心は

$$
f(a+h)-f(a)=O(\|h\|_X)
$$

を先に示し、$g$ の残差を $\|h\|_X$ に対しても小さくできることです。

<!-- proof-start -->
### 証明

$A=Df(a)$、$B=Dg(f(a))$ と置き、

$$
f(a+h)
=
f(a)+Ah+r_f(h),
\qquad
\|r_f(h)\|_Y=o(\|h\|_X)
$$

と書きます。また

$$
g(f(a)+k)
=
g(f(a))+Bk+r_g(k),
\qquad
\|r_g(k)\|_Z=o(\|k\|_Y).
$$

ここで

$$
k(h)=Ah+r_f(h)
=
f(a+h)-f(a).
$$

$A$ の有界性から

$$
\|k(h)\|_Y
\le
\|A\|\|h\|_X+\|r_f(h)\|_Y
=
O(\|h\|_X),
$$

従って $k(h)\to0$ です。

よって

$$
\begin{aligned}
g(f(a+h))-g(f(a))
&=
Bk(h)+r_g(k(h))\\
&=
BAh+Br_f(h)+r_g(k(h)).
\end{aligned}
$$

第1残差について、

$$
\frac{\|Br_f(h)\|_Z}{\|h\|_X}
\le
\|B\|
\frac{\|r_f(h)\|_Y}{\|h\|_X}
\to0.
$$

$k(h)\ne0$ のとき第2残差は

$$
\frac{\|r_g(k(h))\|_Z}{\|h\|_X}
=
\frac{\|r_g(k(h))\|_Z}{\|k(h)\|_Y}
\frac{\|k(h)\|_Y}{\|h\|_X}.
$$

第1因子は0へ収束し、第2因子は有界です。$k(h)=0$ の場合も $r_g(0)=0$ なので同じ結論になります。

従って全残差は $o(\|h\|_X)$ であり、

$$
D(g\circ f)(a)=BA.
$$

$\square$
<!-- proof-end -->

有限次元で学んだ

$$
J_{g\circ f}(a)
=
J_g(f(a))J_f(a)
$$

は、この定理の行列表現です。

---

## 7. この章で有限次元から変わったこと

[RA6](../RA6/index.md) では $\mathbb R^n$ と行列だけで微分を扱えました。この章で新たに必要になったのは次の三点です。

1. 入力・出力を一般のノルム空間に広げた。
2. 線形写像を「有界線形写像」に限定した。
3. 行列ノルムの代わりに一般の作用素ノルムを使った。

一方、一次近似と残差

$$
f(a+h)
=
f(a)+Df(a)h+o(\|h\|)
$$

という微分の骨格自体は変わっていません。

次は [F0-02C3A 随伴作用素・Banach双対・Hilbert随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md) で、作用素を双対空間の向きへ引き戻す操作を学びます。

---

## 演習

### F0-02C3-A01 積分で定まる写像のノルム

- Level: A

$X=C([0,1])$ に $\|f\|_\infty=\sup_{0\le t\le1}|f(t)|$ を入れ、

$$
T(f)=\int_0^1f(t)\,dt
$$

とする。$T$ が有界線形写像であり、$\|T\|=1$ であることを示せ。

<!-- solution-start -->
### 詳細解答

線形性は積分の線形性から従います。また

$$
|T(f)|
\le
\int_0^1|f(t)|\,dt
\le
\|f\|_\infty
$$

なので $\|T\|\le1$ です。

一方、定数関数 $f(t)=1$ を取ると $\|f\|_\infty=1$ かつ

$$
T(f)=1.
$$

従って $\|T\|\ge1$。以上より

$$
\boxed{\|T\|=1}.
$$
<!-- solution-end -->

### F0-02C3-A02 有界線形写像のFréchet微分

- Level: A

有界線形写像 $T:X\to Y$ に対し $f(x)=Tx$ とする。任意の $x\in X$ で $Df(x)=T$ であることを定義から示せ。

<!-- solution-start -->
### 詳細解答

任意の $h\in X$ について

$$
f(x+h)-f(x)-Th
=
T(x+h)-Tx-Th
=
0.
$$

従って

$$
\frac{\|f(x+h)-f(x)-Th\|_Y}{\|h\|_X}=0
$$

であり、$h\to0$ の極限も0です。よって $Df(x)=T$ です。
<!-- solution-end -->

### F0-02C3-A03 二乗ノルムの微分

- Level: A

実 Hilbert 空間 $H$ 上で

$$
f(x)=\frac12\|x\|^2
$$

とする。$Df(x)$ と、それを表す Riesz 表現ベクトルを求めよ。

<!-- solution-start -->
### 詳細解答

内積を展開すると

$$
f(x+h)-f(x)
=
\langle x,h\rangle+\frac12\|h\|^2.
$$

従って線形候補は

$$
Df(x)[h]=\langle x,h\rangle.
$$

残差について

$$
\frac{\frac12\|h\|^2}{\|h\|}
=
\frac12\|h\|\to0,
$$

なので Fréchet 微分です。Riesz 表現から

$$
\boxed{g_f(x)=x}.
$$
<!-- solution-end -->

### F0-02C3-A04 実数値線形写像との合成

- Level: A

$f:X\to Y$ が $a$ で Fréchet 微分可能、$\ell:Y\to\mathbb R$ が連続線形汎関数とする。$\ell\circ f$ の微分を求めよ。

<!-- solution-start -->
### 詳細解答

$\ell$ 自身は有界線形写像なので

$$
D\ell(y)=\ell
$$

です。[Fréchet 連鎖律](#thm-f0-02c3-frechet-composition)から

$$
D(\ell\circ f)(a)
=
D\ell(f(a))\circ Df(a)
=
\ell\circ Df(a).
$$

従って

$$
\boxed{
D(\ell\circ f)(a)[h]
=
\ell(Df(a)[h])
}.
$$
<!-- solution-end -->

### F0-02C3-B01 有界性とLipschitz連続性

- Level: B

線形写像 $T:X\to Y$ が有界なら Lipschitz 連続であることを示せ。また、線形性がこの結論のどこで使われるか説明せよ。

<!-- solution-start -->
### 詳細解答

線形性から

$$
Tx-Ty=T(x-y)
$$

なので、

$$
\|Tx-Ty\|_Y
=
\|T(x-y)\|_Y
\le
\|T\|\|x-y\|_X.
$$

従って Lipschitz 定数 $\|T\|$ を持つ Lipschitz 連続写像です。

線形性は、二点の出力差 $Tx-Ty$ を一つの入力差 $T(x-y)$ へ変換する箇所で使っています。
<!-- solution-end -->

### F0-02C3-B02 Gâteaux微分可能だがFréchet微分可能でない例

- Level: B

$$
f(x,y)
=
\begin{cases}
\dfrac{x^6y}{x^{12}+y^2},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0)
\end{cases}
$$

について、原点で Gâteaux 微分が0である一方、Fréchet 微分可能でないことを示せ。

<!-- solution-start -->
### 詳細解答

固定した $v=(a,b)$ を取ります。$b\ne0$ なら

$$
\frac{f(ta,tb)}{t}
=
\frac{t^4a^6b}{t^{10}a^{12}+b^2}
\to0.
$$

$b=0$ なら $f(ta,0)=0$ なので同じく方向微分は0です。従って

$$
D_vf(0,0)=0
$$

が全ての $v$ で成り立ち、$v\mapsto0$ は線形なので

$$
D_Gf(0,0)=0.
$$

一方、$y=x^6$ とすると

$$
f(x,x^6)=\frac12
$$

であり、$(x,x^6)\to(0,0)$ でも $f(x,x^6)\not\to0$。従って $f$ は原点で連続ではありません。Fréchet 微分可能性は連続性を含意するので、原点では Fréchet 微分可能ではありません。
<!-- solution-end -->

### F0-02C3-B03 連鎖律の残差評価

- Level: B

Fréchet 連鎖律の証明で

$$
k(h)=Df(a)h+r_f(h)
$$

と置く。なぜ $\|k(h)\|=O(\|h\|)$ となり、それが

$$
r_g(k(h))=o(\|h\|)
$$

を導くのか説明せよ。

<!-- solution-start -->
### 詳細解答

$A=Df(a)$ とすると有界性から

$$
\|Ah\|
\le
\|A\|\|h\|.
$$

また $r_f(h)=o(\|h\|)$ なので、十分小さい $h$ では例えば

$$
\|r_f(h)\|\le\|h\|
$$

とできます。従って

$$
\|k(h)\|
\le
(\|A\|+1)\|h\|,
$$

すなわち $\|k(h)\|=O(\|h\|)$ です。

さらに

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}
$$

と分けると、第1因子は $k(h)\to0$ により0へ、第2因子は $O(1)$ です。従って積は0へ収束し、

$$
r_g(k(h))=o(\|h\|)
$$

となります。
<!-- solution-end -->

### F0-02C3-C01 Fréchet連鎖律を再構成する

- Level: C

$X,Y,Z$ をノルム空間とし、$f:X\to Y$ が $a$ で Fréchet 微分可能、$g:Y\to Z$ が $f(a)$ で Fréchet 微分可能とする。残差表示から

$$
D(g\circ f)(a)
=
Dg(f(a))\circ Df(a)
$$

を証明せよ。

<!-- solution-start -->
### 詳細解答

$A=Df(a)$、$B=Dg(f(a))$ と置き、

$$
f(a+h)
=
f(a)+Ah+r_f(h),
\qquad
\|r_f(h)\|=o(\|h\|)
$$

と書きます。また

$$
g(f(a)+k)
=
g(f(a))+Bk+r_g(k),
\qquad
\|r_g(k)\|=o(\|k\|).
$$

ここで

$$
k(h)
=
Ah+r_f(h).
$$

$A$ の有界性と $r_f(h)=o(\|h\|)$ から

$$
\|k(h)\|=O(\|h\|),
\qquad
k(h)\to0.
$$

したがって

$$
\begin{aligned}
g(f(a+h))-g(f(a))
&=
Bk(h)+r_g(k(h))\\
&=
BAh+Br_f(h)+r_g(k(h)).
\end{aligned}
$$

第1残差は

$$
\frac{\|Br_f(h)\|}{\|h\|}
\le
\|B\|
\frac{\|r_f(h)\|}{\|h\|}
\to0.
$$

第2残差は、$k(h)\ne0$ のとき

$$
\frac{\|r_g(k(h))\|}{\|h\|}
=
\frac{\|r_g(k(h))\|}{\|k(h)\|}
\frac{\|k(h)\|}{\|h\|}
\to0,
$$

です。第1因子は0へ収束し、第2因子は有界だからです。$k(h)=0$ なら残差も0です。

従って

$$
g(f(a+h))-g(f(a))-BAh
=
o(\|h\|),
$$

よって

$$
\boxed{
D(g\circ f)(a)=BA
}.
$$
<!-- solution-end -->

---

## 章末チェック

- 有界線形写像の有界性と連続性が同値である理由を説明できる。
- 作用素ノルムを定義し、基本評価 $\|Tx\|\le\|T\|\|x\|$ を使える。
- Fréchet 微分を有界線形写像による一次近似として定義できる。
- Gâteaux 微分と Fréchet 微分の違いを反例込みで説明できる。
- Hilbert 空間で Fréchet 微分を Riesz 表現ベクトルとして表せる。
- Fréchet 連鎖律を残差評価から証明できる。
