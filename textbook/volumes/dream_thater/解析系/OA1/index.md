# OA1 Banach 環とスペクトル

<!-- definition-example-audit: strict -->

> **既出概念**：[FA5 のスペクトル・レゾルベント](../FA5/index.md#def-fa5-resolvent-spectrum)と[スペクトル半径公式](../FA5/index.md#thm-fa5-spectral-radius-formula)、[FA1 の商 Banach 空間](../FA1/index.md#thm-fa1-quotient-banach)を使います。量子力学基礎はこの章の formal prerequisite ではありませんが、QM8 で現れた「複数の有界作用素を和・積・極限でまとめて扱う」という問題意識が本章の動機です。

FA5 では、一つの有界作用素 $T\in B(X)$ を固定し、$\lambda I-T$ が可逆かどうかでスペクトルを調べました。しかし QM8 の Weyl 作用素のように、実際に扱いたい対象は一個の作用素で終わりません。二つの作用素 $S,T$ があれば、

$$
S+T,\qquad ST,\qquad S^2T,\qquad \sum_{n=0}^{\infty}a_nS^n
$$

のような新しい作用素が次々に現れます。

ここで視点を変えます。

~~~
一個の作用素 T のスペクトル
  ↓
作用素の集合を「加法・積・ノルム極限」で閉じる
  ↓
Banach 環
  ↓
可逆性を環の内部で調べる
  ↓
一般の元 a のスペクトル
~~~

本章の中心は、**FA5 の作用素スペクトル論を捨てることではなく、そこへ一般 Banach 環を戻す橋を作ること**です。各 $a$ を「左から $a$ を掛ける作用素」

$$
L_a(x)=ax
$$

へ写せば、一般 Banach 環の問題を $B(A)$ の作用素スペクトル論として読み直せます。この構成には後で正式な名前を与えます。

---

## 1. Banach 空間に「積」を入れる

ベクトル空間には加法とスカラー倍があります。作用素を合成したり関数を掛けたりするには、さらに二つの元から積を作る演算が必要です。

<a id="def-oa1-banach-algebra"></a>

<!-- formal-statement-start -->
### 定義（複素 Banach 環）

複素 Banach 空間 $A$ に双線形な積

$$
A\times A\longrightarrow A,\qquad (a,b)\longmapsto ab
$$

があり、全ての $a,b,c\in A$ に対して

$$
(ab)c=a(bc)
$$

および

$$
\|ab\|\le \|a\|\,\|b\|
$$

を満たすとき、$A$ を **複素 Banach 環**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-banach-algebra -->

**定義の確認**

### 直接例：$C([0,1])$

$A=C([0,1])$ に一様ノルム

$$
\|f\|_\infty=\max_{0\le t\le1}|f(t)|
$$

を入れ、積を点ごとに

$$
(fg)(t)=f(t)g(t)
$$

と定めます。

$C([0,1])$ が一様ノルムで Banach 空間であることは既知とします。積については

$$
\begin{aligned}
\|fg\|_\infty
&=
\max_{0\le t\le1}|f(t)g(t)|\\
&\le
\left(\max_{0\le t\le1}|f(t)|\right)
\left(\max_{0\le t\le1}|g(t)|\right)\\
&=
\|f\|_\infty\|g\|_\infty.
\end{aligned}
$$

従って $C([0,1])$ は Banach 環です。

<!-- definition-example-end -->

作用素の例も重要です。複素 Banach 空間 $X$ に対し、$B(X)$ を有界線形作用素全体とします。積を合成

$$
ST:=S\circ T
$$

とすれば

$$
\|ST\|\le\|S\|\,\|T\|
$$

であり、$B(X)$ は作用素ノルムについて Banach 環です。FA5 は、まさにこの Banach 環の一つの元 $T$ を調べていたことになります。

---

## 2. 単位元と可逆元

スペクトルを定義するには

$$
\lambda 1-a
$$

という式が必要です。したがって本章では単位元を持つ Banach 環を主に扱います。

<a id="def-oa1-unital-invertible"></a>

<!-- formal-statement-start -->
### 定義（単位的 Banach 環・可逆元）

Banach 環 $A$ に元 $1\in A$ があり、全ての $a\in A$ に対して

$$
1a=a1=a
$$

を満たすとき、$A$ を **単位的 Banach 環**という。本章では以後、単位元が

$$
\|1\|=1
$$

を満たす場合を扱う。

$a\in A$ に対して、ある $b\in A$ が存在し

$$
ab=ba=1
$$

を満たすとき、$a$ を **可逆元**といい、その $b$ を $a^{-1}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-unital-invertible -->

**定義の確認**

### 直接例：関数環の可逆元

$A=C([0,1])$ の単位元は定数関数

$$
1(t)=1
$$

です。

$f\in C([0,1])$ が全ての $t\in[0,1]$ で $f(t)\ne0$ を満たすなら、コンパクト性により

$$
m:=\min_{0\le t\le1}|f(t)|>0.
$$

従って

$$
g(t)=\frac1{f(t)}
$$

は連続であり、

$$
fg=gf=1.
$$

よって $f$ は可逆です。

逆に $f(t_0)=0$ となる点が一つでもあれば、任意の $g\in C([0,1])$ に対して

$$
(fg)(t_0)=0
$$

なので $fg=1$ は不可能です。従って $C([0,1])$ では

$$
f\text{ が可逆}
\quad\Longleftrightarrow\quad
f(t)\ne0\ \text{for all }t\in[0,1].
$$

<!-- definition-example-end -->

左右両方を要求している点に注意してください。積の順序を入れ替えられない場合には、片側逆元だけから可逆性を定義しません。

---

## 3. Neumann 級数：可逆性は小さい摂動で壊れない

スカラーでは $|z|<1$ のとき

$$
\frac1{1-z}
=
\sum_{n=0}^{\infty}z^n
$$

でした。Banach 環では同じ計算がそのまま動きます。必要なのは、積の劣乗法性と完備性だけです。

<a id="lem-oa1-neumann-series"></a>

<!-- formal-statement-start -->
### 補題（Banach 環の Neumann 級数）

$A$ を単位的 Banach 環とし、$x\in A$ が

$$
\|x\|<1
$$

を満たすとする。このとき $1-x$ は可逆で、

$$
\boxed{
(1-x)^{-1}
=
\sum_{n=0}^{\infty}x^n
}
$$

が $A$ のノルムで成り立つ。さらに

$$
\|(1-x)^{-1}\|
\le
\frac1{1-\|x\|}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

有限の幾何級数では

$$
(1-x)\sum_{n=0}^{N}x^n=1-x^{N+1}
$$

です。あとは $\|x^{N+1}\|\le\|x\|^{N+1}\to0$ と、級数が Banach 空間 $A$ で収束することを確認します。

<!-- proof-start -->
### 証明

部分和を

$$
s_N=\sum_{n=0}^{N}x^n
$$

と置きます。$M>N$ なら

$$
\begin{aligned}
\|s_M-s_N\|
&=
\left\|
\sum_{n=N+1}^{M}x^n
\right\|\\
&\le
\sum_{n=N+1}^{M}\|x^n\|\\
&\le
\sum_{n=N+1}^{M}\|x\|^n.
\end{aligned}
$$

右辺は収束する数値級数の尾なので $N\to\infty$ で $0$ へ行きます。従って $(s_N)$ は Cauchy 列です。$A$ は Banach 空間なので、ある $s\in A$ が存在して

$$
s_N\longrightarrow s
$$

となります。

結合則から

$$
(1-x)s_N
=
s_N-xs_N
=
1-x^{N+1}.
$$

また

$$
\|x^{N+1}\|
\le
\|x\|^{N+1}
\longrightarrow0.
$$

積は連続なので極限を取り、

$$
(1-x)s=1.
$$

同様に

$$
s_N(1-x)=1-x^{N+1}
$$

から

$$
s(1-x)=1
$$

も得ます。従って $s=(1-x)^{-1}$ です。

最後に

$$
\begin{aligned}
\|(1-x)^{-1}\|
&=
\|s\|\\
&\le
\sum_{n=0}^{\infty}\|x^n\|\\
&\le
\sum_{n=0}^{\infty}\|x\|^n\\
&=
\frac1{1-\|x\|}.
\end{aligned}
$$

$\square$
<!-- proof-end -->

FA5 の [Neumann 級数](../FA5/index.md#lem-fa5-neumann-series)は $A=B(X)$ の場合です。ここでは同じ証明のうち、作用素に固有な部分が一つもないことを切り出しました。

---

## 4. 可逆元全体は開いている

可逆元 $a$ を少しだけ動かした $b$ も可逆であることを、前節の級数表示から直接示せます。

<a id="thm-oa1-invertibles-open"></a>

<!-- formal-statement-start -->
### 定理（可逆元全体の開性と逆元の局所級数表示）

$A$ を単位的 Banach 環とし、$a\in A$ を可逆とする。$b\in A$ が

$$
\|a^{-1}(b-a)\|<1
$$

を満たせば $b$ も可逆である。

特に

$$
\|b-a\|<\frac1{\|a^{-1}\|}
$$

なら $b$ は可逆である。

さらに

$$
\boxed{
b^{-1}
=
\sum_{n=0}^{\infty}
\bigl(-a^{-1}(b-a)\bigr)^n a^{-1}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$b$ から $a$ をくくり出して

$$
b=a\left(1+a^{-1}(b-a)\right)
$$

と書きます。括弧内は $1-x$ の形なので、前節の Neumann 級数を適用できます。

<!-- proof-start -->
### 証明

$$
h=a^{-1}(b-a)
$$

と置きます。仮定より $\|h\|<1$ です。また

$$
b=a(1+h).
$$

前節の補題を $x=-h$ に適用すると

$$
(1+h)^{-1}
=
\sum_{n=0}^{\infty}(-h)^n.
$$

従って積 $a(1+h)$ も可逆で、

$$
\begin{aligned}
b^{-1}
&=
(1+h)^{-1}a^{-1}\\
&=
\sum_{n=0}^{\infty}
\bigl(-a^{-1}(b-a)\bigr)^n a^{-1}.
\end{aligned}
$$

また

$$
\|a^{-1}(b-a)\|
\le
\|a^{-1}\|\,\|b-a\|
$$

なので

$$
\|b-a\|<\frac1{\|a^{-1}\|}
$$

なら確かに $\|a^{-1}(b-a)\|<1$ です。$\square$
<!-- proof-end -->

したがって可逆元全体

$$
A^\times=\{a\in A:a\text{ は可逆}\}
$$

は $A$ の開集合です。

この事実は、スペクトルの補集合が開くことの代数的な源です。

---

## 5. 元のスペクトル

FA5 では $T\in B(X)$ に対して $\lambda I-T$ を見ました。一般の単位的 Banach 環では $I$ を単位元 $1$ に置き換えます。

<a id="def-oa1-spectrum"></a>

<!-- formal-statement-start -->
### 定義（Banach 環のスペクトル・レゾルベント集合）

$A$ を複素単位的 Banach 環、$a\in A$ とする。

$$
\rho_A(a)
=
\{\lambda\in\mathbb C:\lambda1-a\text{ が }A\text{ で可逆}\}
$$

を $a$ の **レゾルベント集合**といい、

$$
\boxed{
\sigma_A(a)
=
\mathbb C\setminus\rho_A(a)
}
$$

を $a$ の **スペクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-spectrum -->

**定義の確認**

### 直接例：$C([0,1])$ の座標関数

$A=C([0,1])$ とし、

$$
a(t)=t
$$

とします。

$\lambda1-a$ は関数

$$
t\longmapsto\lambda-t
$$

です。前節の可逆性判定から、これは $[0,1]$ 上で零点を持たないとき、かつそのときに限って可逆です。

従って

$$
\lambda\in\rho_A(a)
\quad\Longleftrightarrow\quad
\lambda\notin[0,1].
$$

よって

$$
\boxed{
\sigma_A(a)=[0,1].
}
$$

<!-- definition-example-end -->

この例は「スペクトルが固有値の集合」という見方から一段離れるのに有効です。$C([0,1])$ の元 $a$ は作用素として導入していません。それでも、環の内部の可逆性だけでスペクトルが定義できます。

---

## 6. 左正則表現：Banach 環を作用素として見る

ここが FA5 と OA1 を接続する核心です。

$a\in A$ を固定すると、左から $a$ を掛ける写像

$$
x\longmapsto ax
$$

は $A$ 自身の上の有界線形作用素になります。

<a id="def-oa1-left-regular-representation"></a>

<!-- formal-statement-start -->
### 定義（左正則表現）

$A$ を複素単位的 Banach 環とする。各 $a\in A$ に対して

$$
L_a:A\to A,
\qquad
L_a(x)=ax
$$

と定める。

写像

$$
L:A\to B(A),
\qquad
a\longmapsto L_a
$$

を $A$ の **左正則表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-left-regular-representation -->

**定義の確認**

### 直接例：$C([0,1])$ では乗算作用素になる

$a(t)=t$ とすると、$L_a$ は

$$
(L_af)(t)=t f(t)
$$

です。

つまり FA5 で扱った「関数を掛ける作用素」が、関数環 $C([0,1])$ の元 $a$ の左正則表現として現れます。

また

$$
\|L_af\|_\infty
\le
\|a\|_\infty\|f\|_\infty
$$

なので $\|L_a\|\le\|a\|_\infty$ です。$f=1$ を入れると

$$
\|L_a1\|_\infty=\|a\|_\infty
$$

だから

$$
\|L_a\|=\|a\|_\infty.
$$

<!-- definition-example-end -->

<a id="prop-oa1-regular-representation"></a>

<!-- formal-statement-start -->
### 命題（左正則表現は等長な単位的代数準同型である）

$A$ を複素単位的 Banach 環とする。左正則表現

$$
L:A\to B(A)
$$

は線形で、

$$
L_{ab}=L_aL_b,\qquad L_1=I_A
$$

を満たす。

さらに全ての $a\in A$ に対して

$$
\boxed{
\|L_a\|=\|a\|
}
$$

である。従って $L$ は単射である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x\in A$ に対して

$$
\|L_ax\|
=
\|ax\|
\le
\|a\|\,\|x\|
$$

なので

$$
\|L_a\|\le\|a\|.
$$

一方、$\|1\|=1$ だから

$$
\|L_a\|
\ge
\|L_a1\|
=
\|a\|.
$$

従って

$$
\|L_a\|=\|a\|.
$$

また $x\in A$ に対して

$$
L_{ab}(x)
=
(ab)x
=
a(bx)
=
L_a(L_bx),
$$

なので

$$
L_{ab}=L_aL_b.
$$

さらに $L_1x=x$ だから $L_1=I_A$ です。

最後に $L_a=0$ なら

$$
a=L_a1=0
$$

なので $L$ は単射です。$\square$
<!-- proof-end -->

これで $A$ は、ノルムも積も保ったまま $B(A)$ の中へ入ります。ただし、次に必要なのは「埋め込める」だけではなく、**可逆性を正確に保つ**ことです。

---

## 7. 可逆性とスペクトルは左正則表現で変わらない

<a id="thm-oa1-spectrum-regular-representation"></a>

<!-- formal-statement-start -->
### 定理（左正則表現による可逆性とスペクトルの保存）

$A$ を複素単位的 Banach 環、$a\in A$ とする。

$a$ が $A$ で可逆であることと、$L_a$ が Banach 空間 $A$ 上の有界作用素として可逆であることは同値である。

従って

$$
\boxed{
\sigma_A(a)
=
\sigma_{B(A)}(L_a).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$a^{-1}$ があれば $L_{a^{-1}}$ が $L_a$ の逆作用素です。逆向きでは、$L_a$ の全射性からまず右逆元 $b$ を作り、単射性を使って $ba=1$ まで回収します。

<!-- proof-start -->
### 証明

まず $a$ が可逆とします。このとき

$$
L_aL_{a^{-1}}
=
L_{aa^{-1}}
=
L_1
=
I_A
$$

であり、同様に

$$
L_{a^{-1}}L_a=I_A.
$$

従って $L_a$ は可逆で、逆作用素は $L_{a^{-1}}$ です。

逆に $L_a$ が $B(A)$ で可逆とします。特に $L_a$ は全射なので、ある $b\in A$ が存在して

$$
L_a(b)=1,
$$

すなわち

$$
ab=1
$$

となります。

次に

$$
L_a(ba-1)
=
a(ba-1)
=
(ab)a-a
=
a-a
=
0.
$$

$L_a$ は可逆なので単射です。従って

$$
ba-1=0,
$$

すなわち $ba=1$ です。よって $a$ は可逆です。

最後に任意の $\lambda\in\mathbb C$ について

$$
L_{\lambda1-a}
=
\lambda I_A-L_a.
$$

上で示した可逆性の同値から

$$
\lambda1-a\text{ が }A\text{ で可逆}
$$

と

$$
\lambda I_A-L_a\text{ が }B(A)\text{ で可逆}
$$

は同値です。補集合を取れば

$$
\sigma_A(a)=\sigma_{B(A)}(L_a).
$$

$\square$
<!-- proof-end -->

この一行が、以後の「FA5 の結果を一般 Banach 環へ持ち上げる」ための変換装置です。

---

## 8. スペクトルは空でないコンパクト集合である

<a id="thm-oa1-spectrum-compact-nonempty"></a>

<!-- formal-statement-start -->
### 定理（Banach 環のスペクトルの非空性・コンパクト性）

$A$ を複素単位的 Banach 環、$a\in A$ とする。このとき

$$
\sigma_A(a)
$$

は空でないコンパクト集合であり、

$$
\boxed{
\sigma_A(a)
\subset
\{\lambda\in\mathbb C:|\lambda|\le\|a\|\}.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

ここでは FA5 の長い Liouville 型証明を繰り返しません。前節で

$$
\sigma_A(a)=\sigma_{B(A)}(L_a)
$$

まで帰着したので、FA5 の作用素スペクトル定理を $L_a$ に適用します。

<!-- proof-start -->
### 証明

命題 [左正則表現は等長](#prop-oa1-regular-representation) から

$$
L_a\in B(A),
\qquad
\|L_a\|=\|a\|.
$$

また [左正則表現によるスペクトル保存](#thm-oa1-spectrum-regular-representation) により

$$
\sigma_A(a)=\sigma_{B(A)}(L_a).
$$

ここで Banach 空間 $A$ 上の有界作用素 $L_a$ に、FA5 の [スペクトルのコンパクト性とノルム円板評価](../FA5/index.md#thm-fa5-spectrum-compact)を適用すると、

$$
\sigma_{B(A)}(L_a)
$$

はコンパクトで

$$
\sigma_{B(A)}(L_a)
\subset
\{\lambda:|\lambda|\le\|L_a\|\}
$$

です。

さらに FA5 の [複素 Banach 空間上のスペクトル非空性](../FA5/index.md#thm-fa5-spectrum-nonempty)から

$$
\sigma_{B(A)}(L_a)\ne\varnothing.
$$

従って

$$
\sigma_A(a)\ne\varnothing
$$

であり、

$$
\sigma_A(a)
\subset
\{\lambda:|\lambda|\le\|a\|\}.
$$

$\square$
<!-- proof-end -->

複素数体はここで本質的です。FA5 の非空性証明が複素解析を使っていたため、その結果を受け取る本定理も複素 Banach 環を仮定しています。

---

## 9. スペクトル半径

スペクトルが空でないコンパクト集合だと分かったので、その絶対値の最大値を取れます。

<a id="def-oa1-spectral-radius"></a>

<!-- formal-statement-start -->
### 定義（Banach 環のスペクトル半径）

$A$ を複素単位的 Banach 環、$a\in A$ とする。

$$
\boxed{
r_A(a)
=
\max_{\lambda\in\sigma_A(a)}|\lambda|
}
$$

を $a$ の **スペクトル半径**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-spectral-radius -->

**定義の確認**

### 直接例：$C([0,1])$ の座標関数

前に

$$
a(t)=t
$$

について

$$
\sigma_A(a)=[0,1]
$$

と求めました。従って

$$
r_A(a)
=
\max_{0\le\lambda\le1}\lambda
=
1.
$$

一方

$$
\|a\|_\infty=1
$$

なので、この例では

$$
r_A(a)=\|a\|.
$$

後で $C^*$-環ではこのようなノルムとスペクトルの強い結び付きが主役になりますが、一般 Banach 環では常に等号とは限りません。

<!-- definition-example-end -->

<a id="thm-oa1-spectral-radius-formula"></a>

<!-- formal-statement-start -->
### 定理（Banach 環のスペクトル半径公式）

$A$ を複素単位的 Banach 環、$a\in A$ とする。このとき

$$
\boxed{
r_A(a)
=
\lim_{n\to\infty}\|a^n\|^{1/n}.
}
$$

特に

$$
r_A(a)\le\|a\|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

左正則表現は積とノルムを保つので

$$
L_a^n=L_{a^n},
\qquad
\|L_a^n\|=\|a^n\|.
$$

したがって FA5 の作用素版スペクトル半径公式をそのまま移せます。

<!-- proof-start -->
### 証明

[スペクトル保存](#thm-oa1-spectrum-regular-representation)により

$$
r_A(a)
=
r_{B(A)}(L_a).
$$

FA5 の [スペクトル半径公式](../FA5/index.md#thm-fa5-spectral-radius-formula)を $L_a$ に適用すると

$$
r_{B(A)}(L_a)
=
\lim_{n\to\infty}\|L_a^n\|^{1/n}.
$$

左正則表現は積を保つので

$$
L_a^n=L_{a^n}.
$$

さらに等長性から

$$
\|L_a^n\|
=
\|L_{a^n}\|
=
\|a^n\|.
$$

従って

$$
r_A(a)
=
\lim_{n\to\infty}\|a^n\|^{1/n}.
$$

また劣乗法性から

$$
\|a^n\|
\le
\|a\|^n.
$$

$n$ 乗根を取り極限を取れば

$$
r_A(a)\le\|a\|.
$$

$\square$
<!-- proof-end -->

ここでも FA5 と同じ証明を二重に持ちません。OA1 で新しい仕事は「一般 Banach 環を $B(A)$ に忠実に表現できる」と示すところです。

---

## 10. 閉部分代数

作用素や関数の一部だけを集めて、それ自体を Banach 環として扱いたい場面があります。そのとき「積で閉じる」だけでなく「ノルム極限でも閉じる」ことが重要です。

<a id="def-oa1-closed-subalgebra"></a>

<!-- formal-statement-start -->
### 定義（閉部分代数）

Banach 環 $A$ の線形部分空間 $B\subset A$ が

$$
b_1,b_2\in B
\quad\Longrightarrow\quad
b_1b_2\in B
$$

を満たし、さらに $A$ のノルム位相で閉集合であるとする。このとき $B$ を **閉部分代数**という。

$A$ が単位的で $1\in B$ のとき、本章では $B$ を **単位的閉部分代数**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-closed-subalgebra -->

**定義の確認**

### 直接例：対角行列

$A=M_2(\mathbb C)$ に作用素ノルムを入れ、

$$
B=
\left\{
\begin{pmatrix}
\alpha&0\\
0&\beta
\end{pmatrix}
:
\alpha,\beta\in\mathbb C
\right\}
$$

とします。

二つの対角行列の和・スカラー倍・積は再び対角行列です。また $B$ は有限次元部分空間なので閉です。さらに単位行列も $B$ に属します。

従って $B$ は単位的閉部分代数です。

<!-- definition-example-end -->

閉であることにより、$B$ は $A$ のノルムを引き継いで Banach 空間になります。従って閉部分代数はそれ自体 Banach 環です。

ただし注意が必要です。$b\in B$ が大きい環 $A$ で可逆でも、その逆元が $B$ に入るとは一般には限りません。従って

$$
\sigma_B(b)
$$

と

$$
\sigma_A(b)
$$

を理由なく同一視してはいけません。この「どの部分代数なら逆元まで内部に残るか」は、後続の $C^*$-環で非常に重要になります。

---

## 11. イデアルと商 Banach 環

部分代数は「内部に残す」構成でした。もう一つの基本操作は、ある部分を $0$ と同一視して潰すことです。線形空間では商空間、環ではイデアルによる商がその役割を持ちます。

<a id="def-oa1-closed-two-sided-ideal"></a>

<!-- formal-statement-start -->
### 定義（閉両側イデアル）

Banach 環 $A$ の線形部分空間 $I\subset A$ が、全ての $a\in A$ と $x\in I$ に対して

$$
ax\in I,
\qquad
xa\in I
$$

を満たすとき、$I$ を **両側イデアル**という。

さらに $I$ が $A$ のノルム位相で閉じているとき、$I$ を **閉両側イデアル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-closed-two-sided-ideal -->

**定義の確認**

### 直接例：一点で消える関数

$A=C([0,1])$ とし、

$$
I_0
=
\{f\in C([0,1]):f(0)=0\}
$$

と置きます。

$f,g\in I_0$、$\alpha,\beta\in\mathbb C$ なら

$$
(\alpha f+\beta g)(0)=0
$$

なので $I_0$ は線形部分空間です。

また $h\in A$、$f\in I_0$ なら

$$
(hf)(0)=h(0)f(0)=0,
$$

$$
(fh)(0)=f(0)h(0)=0.
$$

従って $I_0$ は両側イデアルです。

さらに $f_n\in I_0$ が一様収束して $f_n\to f$ なら

$$
|f(0)|
\le
|f(0)-f_n(0)|+|f_n(0)|
\le
\|f-f_n\|_\infty
\longrightarrow0.
$$

よって $f(0)=0$ であり、$I_0$ は閉です。

<!-- definition-example-end -->

商空間 $A/I$ には、剰余類どうしの積を自然に入れられます。

<a id="def-oa1-quotient-banach-algebra"></a>

<!-- formal-statement-start -->
### 定義（商 Banach 環）

$A$ を Banach 環、$I\subset A$ を閉両側イデアルとする。

FA1 の商ノルム

$$
\|a+I\|_{A/I}
=
\inf_{x\in I}\|a-x\|
$$

を $A/I$ に入れ、積を

$$
\boxed{
(a+I)(b+I)=ab+I
}
$$

で定める。この Banach 環を **商 Banach 環**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa1-quotient-banach-algebra -->

**定義の確認**

### 直接例：$C([0,1])/I_0$ は一点の値だけを残す

前の

$$
I_0=\{f:f(0)=0\}
$$

で商を取ります。

$f+I_0$ では、$f-f(0)\cdot1$ が $I_0$ に属するので

$$
f+I_0=f(0)\cdot1+I_0.
$$

従って各剰余類は $f(0)$ だけで決まります。

実際、

$$
\Phi:A/I_0\to\mathbb C,
\qquad
\Phi(f+I_0)=f(0)
$$

と置くと、和・積・スカラー倍を保ちます。さらに後で確認するように

$$
\|f+I_0\|_{A/I_0}=|f(0)|.
$$

従ってこの商 Banach 環は $\mathbb C$ と同じ構造を持ちます。

<!-- definition-example-end -->

<a id="prop-oa1-quotient-banach-algebra"></a>

<!-- formal-statement-start -->
### 命題（閉両側イデアルによる商は Banach 環になる）

$A$ を Banach 環、$I\subset A$ を閉両側イデアルとする。このとき

$$
(a+I)(b+I)=ab+I
$$

は代表元によらず定まり、FA1 の商ノルムに関して

$$
\|(a+I)(b+I)\|_{A/I}
\le
\|a+I\|_{A/I}\,
\|b+I\|_{A/I}
$$

が成り立つ。

また $A/I$ は Banach 空間なので、$A/I$ は Banach 環である。
<!-- formal-statement-end -->

### 証明の見取り図

代表元を $a+i$、$b+j$ に変えたときに増える項

$$
aj+ib+ij
$$

がすべて $I$ に入ることが「両側」イデアルの役割です。完備性は FA1 の商 Banach 空間定理から受け取ります。

<!-- proof-start -->
### 証明

まず $i,j\in I$ とします。すると

$$
\begin{aligned}
(a+i)(b+j)-ab
&=
aj+ib+ij.
\end{aligned}
$$

$I$ は両側イデアルなので

$$
aj\in I,\qquad ib\in I,\qquad ij\in I.
$$

従って

$$
(a+i)(b+j)+I=ab+I.
$$

よって積は代表元によらず定まります。

次に $\varepsilon>0$ を取ります。商ノルムの infimum の定義から、$i,j\in I$ を

$$
\|a-i\|
<
\|a+I\|_{A/I}+\varepsilon,
$$

$$
\|b-j\|
<
\|b+I\|_{A/I}+\varepsilon
$$

となるように選べます。

$a+I=(a-i)+I$、$b+I=(b-j)+I$ なので

$$
(a+I)(b+I)
=
(a-i)(b-j)+I.
$$

従って

$$
\begin{aligned}
\|(a+I)(b+I)\|_{A/I}
&\le
\|(a-i)(b-j)\|\\
&\le
\|a-i\|\,\|b-j\|\\
&<
\bigl(\|a+I\|_{A/I}+\varepsilon\bigr)
\bigl(\|b+I\|_{A/I}+\varepsilon\bigr).
\end{aligned}
$$

$\varepsilon\downarrow0$ とすれば

$$
\|(a+I)(b+I)\|_{A/I}
\le
\|a+I\|_{A/I}\,
\|b+I\|_{A/I}.
$$

最後に $A$ は Banach 空間、$I$ は閉線形部分空間なので、FA1 の [Banach 空間の閉部分空間による商は Banach](../FA1/index.md#thm-fa1-quotient-banach)を適用して $A/I$ は Banach 空間です。

従って $A/I$ は Banach 環です。$\square$
<!-- proof-end -->

単位的 $A$ で $I\ne A$ なら、$1+I$ が $A/I$ の単位元になります。

---

## 12. 何が一つにまとまったか

本章で得た構造を並べると、

~~~
Banach 空間 + 連続な積
  ↓
Banach 環
  ↓
Neumann 級数
  ↓
可逆元は開集合
  ↓
λ1-a の非可逆性
  ↓
スペクトル σ_A(a)
  ↓ 左正則表現 a ↦ L_a
FA5 の作用素スペクトル論
  ↓
非空・コンパクト性
スペクトル半径公式
~~~

となります。

さらに、

- 閉部分代数は「必要な元だけを内部に残す」、
- 閉両側イデアルによる商は「ある方向を $0$ と同一視する」、

という二つの基本操作も得ました。

次の OA2 では、**可換 Banach 環の元を複素数へ評価する準同型**を集めます。行列の固有値に似た「スカラー値の観測」を一般 Banach 環から取り出す仕組みが character と Gelfand 変換です。

---

# 演習

## Level A

### A1. $2\times2$ 行列で Neumann 級数を確認する

- Level: A

$$
x=
\begin{pmatrix}
1/2&0\\
0&1/3
\end{pmatrix}
$$

とする。$M_2(\mathbb C)$ に作用素ノルムを入れる。

1. $\|x\|<1$ を確認せよ。
2. $\sum_{n=0}^{\infty}x^n$ を成分ごとに計算せよ。
3. その和が $(I-x)^{-1}$ に等しいことを直接確認せよ。

<!-- solution-start -->
### 詳細解答

$x$ は対角行列なので、Euclid ノルムから誘導される作用素ノルムは対角成分の絶対値の最大です。従って

$$
\|x\|
=
\max\left\{\frac12,\frac13\right\}
=
\frac12<1.
$$

各 $n\ge0$ について

$$
x^n
=
\begin{pmatrix}
2^{-n}&0\\
0&3^{-n}
\end{pmatrix}.
$$

従って

$$
\sum_{n=0}^{\infty}x^n
=
\begin{pmatrix}
\sum_{n=0}^{\infty}2^{-n}&0\\
0&\sum_{n=0}^{\infty}3^{-n}
\end{pmatrix}
=
\begin{pmatrix}
2&0\\
0&3/2
\end{pmatrix}.
$$

一方、

$$
I-x
=
\begin{pmatrix}
1/2&0\\
0&2/3
\end{pmatrix}
$$

なので

$$
(I-x)^{-1}
=
\begin{pmatrix}
2&0\\
0&3/2
\end{pmatrix}.
$$

両者は一致します。これは Banach 環の Neumann 級数を有限次元行列で直接見た例です。
<!-- solution-end -->

### A2. 関数環のスペクトル

- Level: A

$A=C([0,1])$ とし、

$$
a(t)=t^2.
$$

$\sigma_A(a)$ と $r_A(a)$ を求めよ。

<!-- solution-start -->
### 詳細解答

定義より

$$
\lambda\in\sigma_A(a)
$$

であることは、関数

$$
\lambda1-a:t\longmapsto\lambda-t^2
$$

が $C([0,1])$ で可逆でないことと同値です。

関数環の可逆性判定から、可逆でないことは

$$
\lambda-t^2=0
$$

となる $t\in[0,1]$ が存在することと同値です。

$t^2$ の値域は $[0,1]$ なので

$$
\sigma_A(a)=[0,1].
$$

従って

$$
r_A(a)
=
\max_{\lambda\in[0,1]}|\lambda|
=
1.
$$
<!-- solution-end -->

### A3. 単位元の近くの元は可逆

- Level: A

単位的 Banach 環 $A$ の元 $a$ が

$$
\|1-a\|<1
$$

を満たすとする。$a$ が可逆であることを示し、

$$
\|a^{-1}\|
\le
\frac1{1-\|1-a\|}
$$

を証明せよ。

<!-- solution-start -->
### 詳細解答

$$
x=1-a
$$

と置くと

$$
a=1-x
$$

であり、仮定から

$$
\|x\|<1.
$$

従って Banach 環の Neumann 級数を適用でき、

$$
a^{-1}
=
(1-x)^{-1}
=
\sum_{n=0}^{\infty}x^n
=
\sum_{n=0}^{\infty}(1-a)^n.
$$

よって $a$ は可逆です。

さらに Neumann 級数のノルム評価から

$$
\|a^{-1}\|
\le
\frac1{1-\|x\|}
=
\frac1{1-\|1-a\|}.
$$
<!-- solution-end -->

### A4. 一点評価による商ノルム

- Level: A

$A=C([0,1])$、

$$
I_0=\{f\in A:f(0)=0\}
$$

とする。任意の $f\in A$ に対して

$$
\|f+I_0\|_{A/I_0}=|f(0)|
$$

を示せ。

<!-- solution-start -->
### 詳細解答

まず任意の $g\in I_0$ について $g(0)=0$ なので

$$
\|f-g\|_\infty
\ge
|f(0)-g(0)|
=
|f(0)|.
$$

従って infimum を取って

$$
\|f+I_0\|_{A/I_0}
=
\inf_{g\in I_0}\|f-g\|_\infty
\ge
|f(0)|.
$$

逆向きには

$$
g(t)=f(t)-f(0)
$$

と置きます。$g(0)=0$ なので $g\in I_0$ です。この $g$ を使うと

$$
f-g=f(0)\cdot1
$$

だから

$$
\|f+I_0\|_{A/I_0}
\le
\|f-g\|_\infty
=
|f(0)|.
$$

両向きの不等式を合わせて

$$
\|f+I_0\|_{A/I_0}=|f(0)|.
$$
<!-- solution-end -->

## Level B

### B1. 逆元写像の局所評価

- Level: B

単位的 Banach 環 $A$ の可逆元 $a,b$ に対して

$$
a^{-1}-b^{-1}
=
a^{-1}(b-a)b^{-1}
$$

を示せ。

さらに $a$ を可逆とし、

$$
\|b-a\|
<
\frac1{2\|a^{-1}\|}
$$

を満たす $b$ について

$$
\|b^{-1}\|
\le
2\|a^{-1}\|
$$

および

$$
\|b^{-1}-a^{-1}\|
\le
2\|a^{-1}\|^2\|b-a\|
$$

を示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
\begin{aligned}
a^{-1}(b-a)b^{-1}
&=
a^{-1}bb^{-1}-a^{-1}ab^{-1}\\
&=
a^{-1}-b^{-1}.
\end{aligned}
$$

従って恒等式が成り立ちます。

次に

$$
h=a^{-1}(b-a)
$$

と置きます。仮定から

$$
\|h\|
\le
\|a^{-1}\|\,\|b-a\|
<
\frac12.
$$

本文の局所級数表示より

$$
b^{-1}=(1+h)^{-1}a^{-1}.
$$

Neumann 級数の評価を $-h$ に適用すると

$$
\|(1+h)^{-1}\|
\le
\frac1{1-\|h\|}
<
2.
$$

従って

$$
\|b^{-1}\|
\le
2\|a^{-1}\|.
$$

また

$$
a^{-1}-b^{-1}
=
a^{-1}(b-a)b^{-1}
$$

だったので、

$$
\begin{aligned}
\|b^{-1}-a^{-1}\|
&=
\|a^{-1}(a-b)b^{-1}\|\\
&\le
\|a^{-1}\|\,\|a-b\|\,\|b^{-1}\|\\
&\le
2\|a^{-1}\|^2\|b-a\|.
\end{aligned}
$$

これで逆元写像が各可逆元の近くで局所 Lipschitz であることまで分かります。
<!-- solution-end -->

### B2. 冪零元のスペクトル

- Level: B

$A$ を複素単位的 Banach 環、$a\in A$ とし、ある $m\ge1$ について

$$
a^m=0
$$

とする。$\sigma_A(a)=\{0\}$ を示せ。

<!-- solution-start -->
### 詳細解答

まず $\lambda\ne0$ とします。

$$
\lambda1-a
=
\lambda\left(1-\lambda^{-1}a\right).
$$

$a^m=0$ なので有限幾何級数により

$$
\left(1-\lambda^{-1}a\right)
\left(
1+\lambda^{-1}a+\cdots+\lambda^{-(m-1)}a^{m-1}
\right)
=
1-\lambda^{-m}a^m
=
1.
$$

積の順序を逆にしても、全て $a$ の冪なので同じ計算ができ、

$$
\left(1-\lambda^{-1}a\right)^{-1}
=
\sum_{k=0}^{m-1}\lambda^{-k}a^k.
$$

従って

$$
(\lambda1-a)^{-1}
=
\lambda^{-1}
\sum_{k=0}^{m-1}\lambda^{-k}a^k.
$$

よって全ての $\lambda\ne0$ はレゾルベント集合に入ります。したがって

$$
\sigma_A(a)\subset\{0\}.
$$

一方、本文の [Banach 環のスペクトルの非空性・コンパクト性](#thm-oa1-spectrum-compact-nonempty) から

$$
\sigma_A(a)\ne\varnothing.
$$

従って

$$
\sigma_A(a)=\{0\}.
$$

別の確認として、もし $a$ 自身が可逆なら $a^m$ も可逆ですが $a^m=0$ は可逆でないので、確かに $0\in\sigma_A(a)$ です。
<!-- solution-end -->

### B3. 多項式スペクトル写像を Banach 環へ移す

- Level: B

$A$ を複素単位的 Banach 環、$a\in A$、$p$ を複素係数多項式とする。FA5 の [多項式スペクトル写像定理](../FA5/index.md#thm-fa5-polynomial-spectral-mapping) を用いて

$$
\sigma_A(p(a))
=
p(\sigma_A(a))
$$

を示せ。

<!-- solution-start -->
### 詳細解答

左正則表現 $L:A\to B(A)$ を使います。

まず $L$ は和・積・スカラー倍・単位元を保つので、多項式 $p$ に対して

$$
L_{p(a)}
=
p(L_a).
$$

本文の [左正則表現による可逆性とスペクトルの保存](#thm-oa1-spectrum-regular-representation) から

$$
\sigma_A(p(a))
=
\sigma_{B(A)}(L_{p(a)})
=
\sigma_{B(A)}(p(L_a)).
$$

ここで $L_a\in B(A)$ に FA5 の [多項式スペクトル写像定理](../FA5/index.md#thm-fa5-polynomial-spectral-mapping)を適用すると

$$
\sigma_{B(A)}(p(L_a))
=
p\bigl(\sigma_{B(A)}(L_a)\bigr).
$$

再び [左正則表現による可逆性とスペクトルの保存](#thm-oa1-spectrum-regular-representation) により

$$
\sigma_{B(A)}(L_a)=\sigma_A(a).
$$

従って

$$
\boxed{
\sigma_A(p(a))
=
p(\sigma_A(a)).
}
$$

となります。

ここで重要なのは、FA5 の定理を「同じ証明でもう一度」行わず、左正則表現で適用対象を $a$ から $L_a$ へ変換したことです。
<!-- solution-end -->

## Level C

### C1. 商を取るとスペクトルは縮みうる

- Level: C

$A$ を複素単位的 Banach 環、$I\subsetneq A$ を閉両側イデアルとし、標準商写像を

$$
q:A\to A/I,
\qquad
q(a)=a+I
$$

とする。

1. 任意の $a\in A$ に対して

$$
\sigma_{A/I}(q(a))
\subset
\sigma_A(a)
$$

を示せ。
2. $A=C([0,1])$、

$$
I_0=\{f:f(0)=0\},
\qquad
a(t)=t
$$

としたとき、この包含が真に狭いことを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 一般の包含

$\lambda\notin\sigma_A(a)$ とします。定義より

$$
\lambda1-a
$$

は $A$ で可逆です。その逆元を $b$ とすると

$$
(\lambda1-a)b
=
b(\lambda1-a)
=
1.
$$

商写像 $q$ は積と単位元を保つので、

$$
q(\lambda1-a)\,q(b)
=
q(1)
$$

および

$$
q(b)\,q(\lambda1-a)
=
q(1)
$$

です。

また

$$
q(\lambda1-a)
=
\lambda(1+I)-(a+I).
$$

従って

$$
\lambda(1+I)-q(a)
$$

は $A/I$ で可逆です。よって

$$
\lambda\notin\sigma_{A/I}(q(a)).
$$

つまり

$$
\mathbb C\setminus\sigma_A(a)
\subset
\mathbb C\setminus\sigma_{A/I}(q(a)).
$$

補集合を取って

$$
\boxed{
\sigma_{A/I}(q(a))
\subset
\sigma_A(a).
}
$$

#### 2. 包含が真に狭くなる例

$A=C([0,1])$、$a(t)=t$ では本文で

$$
\sigma_A(a)=[0,1]
$$

と求めました。

一方 $a(0)=0$ なので

$$
a\in I_0.
$$

従って商では

$$
q(a)=a+I_0=0+I_0.
$$

商 Banach 環の零元のスペクトルは

$$
\{0\}
$$

です。実際 $\lambda\ne0$ なら

$$
\lambda(1+I_0)
$$

の逆元は

$$
\lambda^{-1}(1+I_0)
$$

であり、$\lambda=0$ では零元は可逆でありません。

したがって

$$
\sigma_{A/I_0}(q(a))
=
\{0\}
\subsetneq
[0,1]
=
\sigma_A(a).
$$

商を取ると、元が持っていた情報の一部を潰すため、スペクトルも小さくなり得ることが分かります。
<!-- solution-end -->
