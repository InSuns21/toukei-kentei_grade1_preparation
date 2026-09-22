# GEO3 写像の局所標準形から部分多様体へ

[GEO2](../GEO2/index.md) では、滑らかな写像 $f:M\to N$ の微分

$$
df_p:T_pM\to T_{f(p)}N
$$

を座標に依存しない線形写像として定義しました。本章では、その線形写像の像の次元が局所的な幾何をどこまで支配するかを調べます。この量をまもなく [写像の階数](#def-geo3-map-rank) として定義します。

中心となる流れは

$$
\text{微分の像の次元}
\longrightarrow
\text{局所標準形}
\longrightarrow
\text{はめ込み・沈め込み}
\longrightarrow
\text{正則値}
\longrightarrow
\text{部分多様体}
$$

です。

直接 prerequisite は [GEO2](../GEO2/index.md) と [RA6A](../RA6A/index.md) です。本章の中心となる局所標準形の証明では、Euclid 空間上の [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function) を canonical result として使います。RA6A の [正則レベル集合の局所グラフ表示](../RA6A/index.md#cor-ra6a-regular-level-set) は本章の Euclid 空間版の前段階です。

<!-- definition-example-audit: strict -->

---

## 1. 微分の像の次元を定義する

<a id="def-geo3-map-rank"></a>

<!-- formal-statement-start -->
> **定義（滑らかな写像の階数）**  
> $M$ を $m$ 次元、$N$ を $n$ 次元の滑らかな多様体とし、$f:M\to N$ を滑らかな写像、$p\in M$ とする。点 $p$ における $f$ の **階数**を

$$
\operatorname{rank}_p f
:=
\dim \operatorname{Im}(df_p)
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo3-map-rank -->
**定義の確認：線形射影**

$$
\pi:\mathbb R^3\to\mathbb R^2,
\qquad
\pi(x,y,z)=(x,y)
$$

では、どの点でも

$$
d\pi=
\begin{pmatrix}
1&0&0\\
0&1&0
\end{pmatrix}
$$

なので階数は2です。
<!-- definition-example-end -->

局所座標 $x$ と $y$ を取り、座標表示

$$
F=y\circ f\circ x^{-1}
$$

を考えると、[GEO2 の微分の座標表示](../GEO2/index.md#thm-geo2-differential-coordinate)から $df_p$ の行列表現は $DF_{x(p)}$ です。別の座標へ移れば、左右から可逆行列が掛かるだけなので階数は変わりません。

### 階数が一定であることは本質的な仮定

$$
F:\mathbb R^2\to\mathbb R^2,
\qquad
F(x,y)=(x,y^2)
$$

を考えると、

$$
DF_{(x,y)}
=
\begin{pmatrix}
1&0\\
0&2y
\end{pmatrix}.
$$

$y\neq0$ では階数2ですが、$y=0$ では階数1です。したがって原点を含むどの近傍でも階数は一定ではありません。

後で示す定数階数定理は、写像を一つの固定した標準形へ直します。階数が近傍内で変わってしまうと、一つの標準形では全点の微分を同時に表せません。ここが仮定の働く場所です。

---

## 2. 定数階数定理

点 $p$ だけの階数ではなく、その近くで階数がずっと $r$ なら、非線形写像は座標変換によって非常に単純になります。

<a id="thm-geo3-constant-rank"></a>

<!-- formal-statement-start -->
> **定理（定数階数定理）**  
> $M$ を $m$ 次元、$N$ を $n$ 次元の滑らかな多様体とし、$f:M\to N$ を滑らかな写像とする。$p\in M$ のある開近傍で
>
> $$
> \operatorname{rank}_q f=r
> $$
>
> が一定であるとする。このとき $p$ の局所座標
>
> $$
> \varphi:U\to\mathbb R^m
> $$
>
> と $f(p)$ の局所座標
>
> $$
> \psi:V\to\mathbb R^n
> $$
>
> を、$\varphi(p)=0,\ \psi(f(p))=0$ となるように選べて、十分小さい近傍では
>
> $$
> (\psi\circ f\circ\varphi^{-1})
> (x^1,\dots,x^m)
> =
> (x^1,\dots,x^r,0,\dots,0)
> $$
>
> となる。
<!-- formal-statement-end -->

この定理の意味は、「階数 $r$ の非線形写像は、局所的には $r$ 個の座標だけを残して他を捨てる写像と同じ」ということです。

### 証明の見取り図

1. まず座標表示 $F:\mathbb R^m\to\mathbb R^n$ に戻す。
2. 階数 $r$ なので、ある $r\times r$ 小行列が可逆になる。
3. $F$ の最初の $r$ 成分と残りの入力変数を組み合わせた写像 $\Phi$ を作る。
4. $D\Phi$ が可逆なので [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function) で $\Phi$ を新しい入力座標にできる。
5. 新座標では最初の $r$ 出力がそのまま入力座標になる。階数が $r$ を超えないため、残りの出力は残りの入力変数に依存できない。
6. 最後に出力座標を調整して余分な $r$ 変数依存も消す。

<!-- proof-start -->
### 証明

$p$ と $f(p)$ の周りに任意の局所座標を取り、平行移動によって両方の座標値が0になるようにします。座標表示を

$$
F:\Omega\subset\mathbb R^m\to\mathbb R^n,
\qquad
F(0)=0
$$

と書きます。

$DF_0$ の階数は $r$ です。したがって、行と列を必要なら並べ替えることで、左上の $r\times r$ 小行列

$$
\left(
\frac{\partial F^\alpha}{\partial x^i}(0)
\right)_
{\substack{1\le\alpha\le r\\1\le i\le r}}
$$

を可逆にできます。

入力変数を

$$
x=(u,v)
\in
\mathbb R^r\times\mathbb R^{m-r}
$$

と分け、

$$
\Phi(u,v)
=
(F^1(u,v),\dots,F^r(u,v),v)
$$

と定めます。

その微分は $0$ でブロック行列

$$
D\Phi_0
=
\begin{pmatrix}
D_u(F^1,\dots,F^r)_0 & D_v(F^1,\dots,F^r)_0\\
0&I_{m-r}
\end{pmatrix}
$$

になります。左上ブロックが可逆なので、この行列全体も可逆です。

よって [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function) により、0の近くで $\Phi$ は $C^1$ 級の局所逆写像を持ちます。ここで $\Phi$ 自身は滑らかです。逆写像の微分公式

$
D(\Phi^{-1})(y)
=
[D\Phi(\Phi^{-1}(y))]^{-1}
$

を使うと、行列反転は $GL_m(\mathbb R)$ 上で滑らかなので、$\Phi^{-1}$ が $C^k$ 級なら右辺は $C^k$ 級です。従って $\Phi^{-1}$ は $C^{k+1}$ 級となり、$k=1$ から帰納して $\Phi^{-1}$ は滑らかです。したがって $\Phi$ は滑らかな局所微分同相写像です。新しい入力座標を

$$
(s,t)=\Phi(u,v)
$$

とします。

この座標で

$$
G
=
F\circ\Phi^{-1}
$$

と置くと、$\Phi$ の定義から最初の $r$ 成分は

$$
G^\alpha(s,t)=s^\alpha,
\qquad
1\le\alpha\le r.
$$

したがって

$$
G(s,t)
=
(s,H(s,t))
$$

と書けます。

ここで元の仮定により、十分小さい近傍で $DG$ の階数も常に $r$ です。$s$ 方向の $r$ 本の列は、上の $r$ 成分に $I_r$ を含むため一次独立です。

もしある $t^j$ について

$$
\frac{\partial H}{\partial t^j}(s,t)\neq0
$$

なら、$t^j$ 方向の列は上の $r$ 成分がすべて0で、下の成分が非零です。これは $s$ 方向の $r$ 本の列の一次結合にはなれないので、

$$
\operatorname{rank}DG_{(s,t)}\ge r+1
$$

となり矛盾します。

従って

$$
D_tH(s,t)=0
$$

が近傍全体で成り立ちます。近傍を直方体に縮めれば、$t$ を線分に沿って動かして一変数の微積分学の基本定理を各成分へ適用できるので、

$$
H(s,t)=H(s,0)=:h(s)
$$

です。

そこで出力側の座標変換

$$
\Psi(z,w)
=
(z,w-h(z))
$$

を考えます。この写像は

$$
\Psi^{-1}(z,\eta)
=
(z,\eta+h(z))
$$

を逆写像に持つので局所微分同相写像です。

したがって

$$
(\Psi\circ G)(s,t)
=
(s,0).
$$

これを元の多様体の座標へ戻せば、

$$
(\psi\circ f\circ\varphi^{-1})
(x^1,\dots,x^m)
=
(x^1,\dots,x^r,0,\dots,0)
$$

という標準形を得ます。 $\square$
<!-- proof-end -->

### どの仮定をどこで使ったか

- $p$ で階数が $r$：可逆な $r\times r$ 小行列を選ぶため。
- 近傍全体で階数が $r$：新座標で $D_tH=0$ を強制するため。
- 逆関数定理：$\Phi$ を本当に局所座標へ昇格させるため。

「点 $p$ で階数 $r$」だけでは、前節の $F(x,y)=(x,y^2)$ のように近傍で階数が増えることがあり、最後の $D_tH=0$ が成立しません。

---

## 3. はめ込みと沈め込み

<a id="def-geo3-immersion-submersion"></a>

<!-- formal-statement-start -->
> **定義（はめ込み・沈め込み）**  
> $M$ を $m$ 次元、$N$ を $n$ 次元の滑らかな多様体とし、$f:M\to N$ を滑らかな写像とする。
>
> - 各 $p\in M$ で $df_p:T_pM\to T_{f(p)}N$ が単射なら、$f$ を **はめ込み**という。
> - 各 $p\in M$ で $df_p:T_pM\to T_{f(p)}N$ が全射なら、$f$ を **沈め込み**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo3-immersion-submersion -->
**定義の確認**

標準包含

$$
i:\mathbb R^m\to\mathbb R^n,
\qquad
i(x^1,\dots,x^m)
=
(x^1,\dots,x^m,0,\dots,0),
\qquad m\le n
$$

の微分は同じ包含行列で、核が0なので、$i$ ははめ込みです。

一方、標準射影

$$
\pi:\mathbb R^m\to\mathbb R^n,
\qquad
\pi(x^1,\dots,x^m)
=
(x^1,\dots,x^n),
\qquad m\ge n
$$

の微分は全射なので、$\pi$ は沈め込みです。
<!-- definition-example-end -->

はめ込みなら階数は常に $m$、沈め込みなら階数は常に $n$ です。従って定数階数定理をそのまま適用できます。

<a id="cor-geo3-immersion-normal-form"></a>

<!-- formal-statement-start -->
> **系（はめ込みの局所標準形）**  
> $f:M^m\to N^n$ がはめ込みなら、任意の $p\in M$ の周りで適切な局所座標を選ぶことにより
>
> $$
> f(x^1,\dots,x^m)
> =
> (x^1,\dots,x^m,0,\dots,0)
> $$
>
> と表せる。特に、各 $p$ の十分小さい近傍への制限は単射である。
<!-- formal-statement-end -->

<a id="cor-geo3-submersion-normal-form"></a>

<!-- formal-statement-start -->
> **系（沈め込みの局所標準形）**  
> $f:M^m\to N^n$ が沈め込みなら、任意の $p\in M$ の周りで適切な局所座標を選ぶことにより
>
> $$
> f(x^1,\dots,x^m)
> =
> (x^1,\dots,x^n)
> $$
>
> と表せる。
<!-- formal-statement-end -->

どちらも定数階数定理で、それぞれ $r=m$、$r=n$ とした場合です。

---

## 4. はめ込みと埋め込みは違う

はめ込みは微分だけを見る局所条件です。部分集合としてきれいに入っていることまで保証するには、位相も必要です。

<a id="def-geo3-embedding"></a>

<!-- formal-statement-start -->
> **定義（埋め込み）**  
> 滑らかな写像 $f:M\to N$ が次の二条件を満たすとき、$f$ を **埋め込み**という。
>
> 1. $f$ ははめ込みである。
> 2. $f:M\to f(M)$ は、$f(M)$ に $N$ の部分空間位相を入れたとき同相写像である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo3-embedding -->
**定義の確認：標準円周**

包含写像

$$
i:S^1\hookrightarrow\mathbb R^2
$$

ははめ込みです。ここで $S^1$ は GEO1 で構成した標準円周を、その通常の部分空間位相と滑らかな構造で見ています。したがって $i:S^1\to i(S^1)$ は集合として恒等写像であり、その逆も連続です。よって $i$ は埋め込みです。
<!-- definition-example-end -->

### 反例：figure-eight ははめ込みだが埋め込みでない

$$
\gamma:S^1\to\mathbb R^2,
\qquad
\gamma(t)=(\sin t,\sin 2t)
$$

を考えます。速度は

$$
\gamma'(t)
=
(\cos t,2\cos2t).
$$

$\cos t=0$ なら $\cos2t=-1$ なので、二成分が同時に0になることはありません。したがって $\gamma$ ははめ込みです。

しかし

$$
\gamma(0)=\gamma(\pi)=(0,0)
$$

で単射ではないため、埋め込みではありません。

ここで失敗しているのは微分ではなく **大域的な点の同一視** です。はめ込みの局所標準形は各点の近くでは成立していても、遠く離れた二点が同じ像へ来ることは防ぎません。

---

## 5. 埋め込み部分多様体

<a id="def-geo3-embedded-submanifold"></a>

<!-- formal-statement-start -->
> **定義（埋め込み部分多様体）**  
> $M$ を $m$ 次元滑らかな多様体、$S\subset M$ を部分集合とする。$S$ が $k$ 次元 **埋め込み部分多様体**であるとは、任意の $p\in S$ に対して $M$ の局所座標
>
> $$
> x:U\to x(U)\subset\mathbb R^m
> $$
>
> が存在し、$x(p)=0$ かつ
>
> $$
> x(U\cap S)
> =
> x(U)\cap
> \bigl(\mathbb R^k\times\{0\}^{m-k}\bigr)
> $$
>
> となることをいう。このような座標を $S$ に適合した局所座標という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo3-embedded-submanifold -->
**定義の確認：座標平面**

$$
S
=
\mathbb R^k\times\{0\}^{m-k}
\subset\mathbb R^m
$$

では恒等座標そのものが適合座標です。従って $S$ は $k$ 次元埋め込み部分多様体です。
<!-- definition-example-end -->

<a id="prop-geo3-submanifold-inclusion"></a>

<!-- formal-statement-start -->
> **命題（部分多様体の包含写像と接空間）**  
> $S\subset M$ を $k$ 次元埋め込み部分多様体とし、$i:S\hookrightarrow M$ を包含写像とする。任意の $p\in S$ に対して
>
> $$
> di_p:T_pS\to T_pM
> $$
>
> は単射である。$S$ に適合した座標
>
> $$
> (x^1,\dots,x^k,x^{k+1},\dots,x^m)
> $$
>
> では、その像は
>
> $$
> \operatorname{Im}(di_p)
> =
> \operatorname{span}
> \left\{
> \left.\frac{\partial}{\partial x^1}\right|_p,
> \dots,
> \left.\frac{\partial}{\partial x^k}\right|_p
> \right\}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

適合座標では包含写像は Euclid 空間の標準包含

$$
(u^1,\dots,u^k)
\longmapsto
(u^1,\dots,u^k,0,\dots,0)
$$

そのものです。したがって微分も標準包含になります。

<!-- proof-start -->
### 証明

$p$ の周りで $S$ に適合した座標を取ります。$S$ 上の座標を最初の $k$ 成分

$$
u=(x^1,\dots,x^k)
$$

で表すと、包含写像の座標表示は

$$
u
\longmapsto
(u,0)
$$

です。

その Jacobi 行列は

$$
\begin{pmatrix}
I_k\\
0
\end{pmatrix}
$$

なので核は0です。従って $di_p$ は単射です。

また標準基底 $e_a$ は

$$
e_a
\longmapsto
(e_a,0)
$$

へ写るので、GEO2 の座標基底を使えば像は

$$
\operatorname{span}
\left\{
\left.\frac{\partial}{\partial x^1}\right|_p,
\dots,
\left.\frac{\partial}{\partial x^k}\right|_p
\right\}
$$

です。 $\square$
<!-- proof-end -->

以後、包含写像の微分で $T_pS$ をこの部分空間と同一視することがあります。

---

## 6. 正則点・臨界点・正則値

<a id="def-geo3-regular-critical"></a>

<!-- formal-statement-start -->
> **定義（正則点・臨界点・正則値・臨界値）**  
> $f:M^m\to N^n$ を滑らかな写像とする。
>
> - $p\in M$ で $df_p$ が全射なら、$p$ を $f$ の **正則点**という。
> - $df_p$ が全射でないなら、$p$ を **臨界点**という。
> - $q\in N$ に対して、$f^{-1}(q)$ の全ての点が正則点なら、$q$ を **正則値**という。$f^{-1}(q)=\varnothing$ の場合もこの条件は満たされるものとする。
> - 少なくとも一つの臨界点 $p$ が存在して $f(p)=q$ となるとき、$q$ を **臨界値**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo3-regular-critical -->
**定義の確認**

$$
f:\mathbb R^2\to\mathbb R,
\qquad
f(x,y)=x^2+y^2
$$

では

$$
df_{(x,y)}(u,v)=2xu+2yv.
$$

$(x,y)\neq(0,0)$ では $\mathbb R$ への非零線形写像なので全射です。原点だけが臨界点で、0が臨界値です。

$c>0$ は正則値です。また $c<0$ では $f^{-1}(c)=\varnothing$ なので、定義上は $c$ も正則値です。
<!-- definition-example-end -->

<a id="def-geo3-level-set"></a>

<!-- formal-statement-start -->
> **定義（レベル集合）**  
> 滑らかな写像 $f:M\to N$ と $q\in N$ に対し、
>
> $$
> f^{-1}(q)
> =
> \{p\in M:f(p)=q\}
> $$
>
> を $q$ における **レベル集合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo3-level-set -->
**定義の確認**

$$
f(x,y,z)=x^2+y^2+z^2
$$

なら、

$$
f^{-1}(1)=S^2
$$

です。
<!-- definition-example-end -->

---

## 7. 正則値定理

<a id="thm-geo3-regular-value"></a>

<!-- formal-statement-start -->
> **定理（正則値定理）**  
> $M$ を $m$ 次元、$N$ を $n$ 次元の滑らかな多様体とし、$f:M\to N$ を滑らかな写像とする。$q\in N$ が $f$ の正則値で、$f^{-1}(q)\neq\varnothing$ とする。このとき
>
> $$
> S=f^{-1}(q)
> $$
>
> は $M$ の $m-n$ 次元埋め込み部分多様体である。
<!-- formal-statement-end -->

この定理は「方程式が独立な $n$ 本の条件を課すなら、自由度は $n$ だけ減る」を多様体上で正確にしたものです。

### 証明の見取り図

$p\in f^{-1}(q)$ では $df_p$ が全射です。全射性はある $n\times n$ 小行列の行列式が非零という局所条件なので、$p$ の十分小さい近傍でも階数 $n$ が保たれます。そこで [沈め込みの局所標準形](#cor-geo3-submersion-normal-form) を使うと、$f$ は局所的に最初の $n$ 座標を取り出す射影になります。レベル集合は、その $n$ 座標を固定した座標平面です。

<!-- proof-start -->
### 証明

$p\in S=f^{-1}(q)$ を任意に取ります。$q$ は正則値なので

$$
df_p:T_pM\to T_qN
$$

は全射です。従って階数は $n$ です。

局所座標で $df_p$ を Jacobi 行列として表すと、ある $n\times n$ 小行列の行列式が非零です。その行列式は点の滑らかな関数、特に連続関数なので、$p$ の十分小さい近傍では引き続き非零です。

従ってその近傍では

$$
\operatorname{rank}_x f=n
$$

が一定です。よって [沈め込みの局所標準形](#cor-geo3-submersion-normal-form) を適用できます。

$p$ と $q$ の局所座標を、両者が0へ写るように選べば、

$$
f(x^1,\dots,x^m)
=
(x^1,\dots,x^n)
$$

とできます。

この座標で $f(x)=q$ は

$$
x^1=\cdots=x^n=0
$$

と同値です。したがって

$$
S
$$

は $p$ の近くで

$$
\{0\}^n\times\mathbb R^{m-n}
$$

という座標平面として表されます。

座標の順序を入れ替えれば、これは埋め込み部分多様体の定義にある

$$
\mathbb R^{m-n}\times\{0\}^n
$$

の形です。$p$ は任意だったので、$S$ は $m-n$ 次元埋め込み部分多様体です。 $\square$
<!-- proof-end -->

### 例：球面

$$
F:\mathbb R^{n+1}\to\mathbb R,
\qquad
F(x)=\|x\|^2
$$

とすると

$$
dF_x(v)=2\langle x,v\rangle.
$$

$F^{-1}(1)=S^n$ 上では $x\neq0$ なので $dF_x$ は非零、従って $\mathbb R$ への全射です。よって1は正則値で、

$$
S^n
$$

は次元

$$
(n+1)-1=n
$$

の埋め込み部分多様体です。

---

## 8. 正則レベル集合の接空間は微分の核

正則値定理で次元は分かりました。さらに接方向そのものも微分から読めます。

<a id="thm-geo3-level-tangent-kernel"></a>

<!-- formal-statement-start -->
> **定理（正則レベル集合の接空間）**  
> $f:M^m\to N^n$ を滑らかな写像、$q\in N$ を正則値とし、
>
> $$
> S=f^{-1}(q)\neq\varnothing
> $$
>
> とする。包含写像によって $T_pS$ を $T_pM$ の部分空間と同一視すると、任意の $p\in S$ について
>
> $$
> T_pS
> =
> \ker df_p.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$f|_S$ は定数写像なので、包含写像 $i:S\hookrightarrow M$ に対して

$$
f\circ i
$$

の微分は0です。連鎖律から $df_p\circ di_p=0$ となり、まず $T_pS\subseteq\ker df_p$ が分かります。あとは両者の次元が $m-n$ で一致することを使います。

<!-- proof-start -->
### 証明

包含写像を

$$
i:S\hookrightarrow M
$$

とします。$S=f^{-1}(q)$ なので

$$
f\circ i:S\to N
$$

は値 $q$ の定数写像です。

従ってその微分は0です。[GEO2 の多様体上の連鎖律](../GEO2/index.md#thm-geo2-composition-differential)から

$$
d(f\circ i)_p
=
df_p\circ di_p
=
0.
$$

[部分多様体の包含写像と接空間](#prop-geo3-submanifold-inclusion)により $di_p$ は単射なので、$T_pS$ をその像と同一視すると

$$
T_pS\subseteq\ker df_p
$$

です。

一方、[正則値定理](#thm-geo3-regular-value)から

$$
\dim T_pS
=
\dim S
=
m-n.
$$

また $df_p$ は全射なので階数は $n$ です。階数・退化次数の定理から

$$
\dim\ker df_p
=
m-n.
$$

有限次元ベクトル空間の部分空間で、包含関係と次元が一致するため

$$
T_pS=\ker df_p.
$$

$\square$
<!-- proof-end -->

球面の場合は直ちに

$$
T_pS^n
=
\{v\in\mathbb R^{n+1}:\langle p,v\rangle=0\}
=
p^\perp
$$

を再び得ます。GEO2 では曲線からこの公式を構成しましたが、ここでは「球面は正則レベル集合」という構造から一行で回収できます。

---

## 9. 部分多様体は局所的には独立な方程式の零点集合

<a id="cor-geo3-submanifold-local-equations"></a>

<!-- formal-statement-start -->
> **系（部分多様体の局所方程式表示）**  
> $S\subset M^m$ を部分集合、$p\in S$ とする。次は局所的に同値である。
>
> 1. $S$ は $p$ の近くで $k$ 次元埋め込み部分多様体である。
> 2. $p$ の開近傍 $U\subset M$ と滑らかな沈め込み
>
> $$
> F:U\to\mathbb R^{m-k}
> $$
>
> が存在し、
>
> $$
> S\cap U=F^{-1}(0)
> $$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず1を仮定します。$S$ に適合した座標

$$
x=(x^1,\dots,x^m)
$$

を取り、

$$
S\cap U
=
\{x^{k+1}=\cdots=x^m=0\}
$$

とします。

そこで

$$
F
=
(x^{k+1},\dots,x^m)
$$

と定めます。座標表示では最後の $m-k$ 座標への射影そのものなので、$dF$ は全射、従って $F$ は沈め込みです。また明らかに

$$
S\cap U=F^{-1}(0).
$$

逆に2を仮定します。$F$ は沈め込みなので0は $F$ の正則値です。[正則値定理](#thm-geo3-regular-value)を $F$ に適用すると、

$$
F^{-1}(0)=S\cap U
$$

は次元

$$
m-(m-k)=k
$$

の埋め込み部分多様体です。 $\square$
<!-- proof-end -->

この系は「部分多様体を座標平面として見る立場」と「独立な方程式の解集合として見る立場」が同じ局所構造を表すことを示します。

### 例：滑らかな写像のグラフ

滑らかな写像

$$
g:\mathbb R^k\to\mathbb R^\ell
$$

のグラフ

$$
\Gamma_g
=
\{(x,y)\in\mathbb R^k\times\mathbb R^\ell:y=g(x)\}
$$

を考えます。

$$
F(x,y)=y-g(x)
$$

と置けば

$$
D_yF=I_\ell
$$

なので $F$ は沈め込みです。従って

$$
\Gamma_g=F^{-1}(0)
$$

は $k$ 次元埋め込み部分多様体です。

さらに $(x,g(x))$ における接空間は

$$
T_{(x,g(x))}\Gamma_g
=
\ker DF_{(x,g(x))}
$$

なので、

$$
T_{(x,g(x))}\Gamma_g
=
\{(u,Dg_xu):u\in\mathbb R^k\}.
$$

---

## 10. 演習

### GEO3-A01 階数と正則点

$$
f:\mathbb R^3\to\mathbb R^2,
\qquad
f(x,y,z)=(x+y,\ yz)
$$

とする。

1. $df_{(x,y,z)}$ の行列を求めよ。
2. 階数が2となる点を求めよ。
3. 臨界点全体を求めよ。

- Level: A
- 狙い: 階数と正則点を Jacobi 行列から判定する

<!-- solution-start -->
**詳細解答**

1. Jacobi 行列は

$$
Df_{(x,y,z)}
=
\begin{pmatrix}
1&1&0\\
0&z&y
\end{pmatrix}.
$$

2. 第一行は常に非零です。階数が1以下になるのは、第二行が第一行の実数倍になる場合です。第一行の第一成分は1ですが第二行の第一成分は0なので、実数倍になるには第二行そのものが0でなければなりません。

従って

$$
z=0,\qquad y=0
$$

のときだけ階数1で、それ以外では階数2です。

3. 目標空間は2次元なので、正則点は階数2の点です。したがって臨界点全体は

$$
\{(x,0,0):x\in\mathbb R\}.
$$
<!-- solution-end -->

### GEO3-A02 はめ込み・沈め込みの判定

次の写像を考える。

$$
i:\mathbb R\to\mathbb R^2,
\qquad
i(t)=(t,t^2),
$$

$$
\pi:\mathbb R^3\to\mathbb R^2,
\qquad
\pi(x,y,z)=(x+y,z).
$$

1. $i$ がはめ込みであることを示せ。
2. $\pi$ が沈め込みであることを示せ。
3. それぞれの局所標準形で期待される形を述べよ。

- Level: A
- 狙い: 単射・全射という微分条件を直接確認する

<!-- solution-start -->
**詳細解答**

1. 微分は

$$
di_t(a)=(a,2ta).
$$

$di_t(a)=0$ なら第一成分から $a=0$ です。従って $di_t$ は単射で、$i$ ははめ込みです。

2. Jacobi 行列は

$$
D\pi
=
\begin{pmatrix}
1&1&0\\
0&0&1
\end{pmatrix}.
$$

二行は一次独立なので階数は2です。目標空間も2次元なので $d\pi$ は全射、従って $\pi$ は沈め込みです。

3. はめ込み $i$ は適切な局所座標で

$$
t\longmapsto(t,0)
$$

の形に、沈め込み $\pi$ は

$$
(u,v,w)\longmapsto(u,v)
$$

の形になります。
<!-- solution-end -->

### GEO3-A03 グラフの接空間

$$
g:\mathbb R^2\to\mathbb R,
\qquad
g(x,y)=x^2+xy
$$

とし、そのグラフを

$$
S=\{(x,y,z):z=g(x,y)\}
$$

とする。

1. $S$ を沈め込み $F:\mathbb R^3\to\mathbb R$ の零点集合として表せ。
2. $S$ が2次元埋め込み部分多様体であることを示せ。
3. 点 $(1,1,2)$ における接空間を求めよ。

- Level: A
- 狙い: 局所方程式と核による接空間計算を使う

<!-- solution-start -->
**詳細解答**

1.

$$
F(x,y,z)=z-x^2-xy
$$

と置けば

$$
S=F^{-1}(0).
$$

2. 微分は

$$
dF_{(x,y,z)}(u,v,w)
=
-(2x+y)u-xv+w.
$$

$w$ の係数が常に1なので、$dF$ は全ての点で $\mathbb R$ への全射です。従って $F$ は沈め込みで、0は正則値です。[正則値定理](#thm-geo3-regular-value)から $S$ は

$$
3-1=2
$$

次元埋め込み部分多様体です。

3. $(1,1,2)$ では

$$
dF(u,v,w)=-3u-v+w.
$$

よって

$$
T_{(1,1,2)}S
=
\{(u,v,w):-3u-v+w=0\}.
$$

すなわち

$$
w=3u+v
$$

なので

$$
T_{(1,1,2)}S
=
\operatorname{span}\{(1,0,3),(0,1,1)\}.
$$
<!-- solution-end -->

### GEO3-A04 球面の正則値判定

$$
F:\mathbb R^{n+1}\to\mathbb R,
\qquad
F(x)=\|x\|^2
$$

とする。

1. $c>0$ が正則値であることを示せ。
2. $c=0$ が臨界値であることを示せ。
3. $c<0$ が定義上は正則値である理由を述べよ。

- Level: A
- 狙い: 正則値の量化と空の逆像の扱いを確認する

<!-- solution-start -->
**詳細解答**

1.

$$
dF_x(v)=2\langle x,v\rangle.
$$

$F(x)=c>0$ なら $x\neq0$ です。$v=x$ と取れば

$$
dF_x(x)=2\|x\|^2=2c\neq0.
$$

実数値線形写像は非零なら全射なので、$F^{-1}(c)$ の全点が正則点です。従って $c>0$ は正則値です。

2. $F^{-1}(0)=\{0\}$ で、

$$
dF_0=0
$$

は全射ではありません。従って0は臨界値です。

3. $c<0$ では $\|x\|^2=c$ を満たす実ベクトルは存在しないので

$$
F^{-1}(c)=\varnothing.
$$

「逆像の全ての点が正則点」という条件に反する点が存在しないため、定義上は正則値です。
<!-- solution-end -->

### GEO3-B01 定数階数定理の標準形を具体的に作る

$$
F:\mathbb R^2\to\mathbb R^3,
\qquad
F(x,y)=(x,y,x+y)
$$

を考える。

1. $F$ の階数が常に2であることを示せ。
2. 出力側の線形座標変換を一つ具体的に作り、$F$ を
   $$
   (x,y)\longmapsto(x,y,0)
   $$
   の形にせよ。
3. この写像が埋め込みであることを示せ。

- Level: B
- 狙い: 定数階数定理の座標変換を手で再現する

<!-- solution-start -->
**詳細解答**

1.

$$
DF
=
\begin{pmatrix}
1&0\\
0&1\\
1&1
\end{pmatrix}.
$$

上二行だけで2本の独立な列が得られるので階数は2です。

2. 出力座標を

$$
(u,v,w)
=
(X,Y,Z-X-Y)
$$

と定めます。この線形変換の逆は

$$
(X,Y,Z)=(u,v,w+u+v)
$$

なので可逆です。

$F(x,y)=(x,y,x+y)$ を代入すると

$$
(u,v,w)
=
(x,y,(x+y)-x-y)
=
(x,y,0).
$$

3. $F$ ははめ込みです。また像は平面

$$
\{(X,Y,Z):Z=X+Y\}
$$

で、逆写像

$$
F(\mathbb R^2)\to\mathbb R^2,
\qquad
(X,Y,Z)\mapsto(X,Y)
$$

は連続です。従って $F:\mathbb R^2\to F(\mathbb R^2)$ は同相写像であり、$F$ は埋め込みです。
<!-- solution-end -->

### GEO3-B02 figure-eight はなぜ埋め込みでないか

$$
\gamma:S^1\to\mathbb R^2,
\qquad
\gamma(t)=(\sin t,\sin2t)
$$

を考える。ここで $t$ は $2\pi$ 周期で同一視する。

1. $\gamma$ がはめ込みであることを示せ。
2. $\gamma$ が埋め込みでないことを示せ。
3. それでも各点の十分小さい近傍への制限は埋め込みになることを説明せよ。

- Level: B
- 狙い: 局所条件であるはめ込みと大域条件を含む埋め込みを区別する

<!-- solution-start -->
**詳細解答**

1.

$$
\gamma'(t)=(\cos t,2\cos2t).
$$

$\cos t=0$ なら

$$
t=\frac\pi2,\frac{3\pi}2
\pmod{2\pi}
$$

であり、そのとき

$$
\cos2t=-1.
$$

従って $\gamma'(t)\neq0$ は全ての $t$ で成り立ちます。一変数多様体からの写像では微分が非零なら単射なので、$\gamma$ ははめ込みです。

2.

$$
\gamma(0)=(0,0),
\qquad
\gamma(\pi)=(0,0).
$$

$0$ と $\pi$ は $S^1$ 上で異なる点なので $\gamma$ は単射ではありません。埋め込みは像への同相写像、特に全単射でなければならないため、$\gamma$ は埋め込みではありません。

3. [はめ込みの局所標準形](#cor-geo3-immersion-normal-form)により、任意の $t_0$ の周りで適切な座標を選ぶと

$$
s\longmapsto(s,0)
$$

の形になります。この標準包含は小さい近傍では埋め込みです。したがって失敗は局所微分ではなく、離れた点 $0,\pi$ が同じ像へ来る大域的現象です。
<!-- solution-end -->

### GEO3-B03 正則レベル集合の接空間

$$
F:\mathbb R^3\to\mathbb R^2,
\qquad
F(x,y,z)=(x^2+y^2,\ z)
$$

とし、

$$
S=F^{-1}(1,0)
$$

とする。

1. $(1,0)$ が正則値であることを示せ。
2. $S$ の次元を求めよ。
3. $p=(\cos\theta,\sin\theta,0)\in S$ における $T_pS$ を求めよ。

- Level: B
- 狙い: 正則値定理と核公式を連続して使う

<!-- solution-start -->
**詳細解答**

1. 微分は

$$
DF_{(x,y,z)}
=
\begin{pmatrix}
2x&2y&0\\
0&0&1
\end{pmatrix}.
$$

$S$ 上では

$$
x^2+y^2=1
$$

なので $(x,y)\neq(0,0)$ です。従って第一行は非零で、第二行とは明らかに一次独立です。よって階数は2で、$dF$ は全射です。したがって $(1,0)$ は正則値です。

2. 定義域の次元は3、目標空間の次元は2なので

$$
\dim S=3-2=1.
$$

3. $v=(u,v_2,w)$ とすると

$$
dF_p(u,v_2,w)
=
(2\cos\theta\,u+2\sin\theta\,v_2,\ w).
$$

従って核の条件は

$$
\cos\theta\,u+\sin\theta\,v_2=0,
\qquad
w=0.
$$

よって

$$
T_pS
=
\operatorname{span}
\{(-\sin\theta,\cos\theta,0)\}.
$$
<!-- solution-end -->

### GEO3-C01 直交群を正則レベル集合として作る

実 $n\times n$ 行列全体を $M_n(\mathbb R)$ と書き、$M_n(\mathbb R)\cong\mathbb R^{n^2}$ と同一視する。対称行列全体の線形空間を

$$
\operatorname{Sym}_n
=
\{S\in M_n(\mathbb R):S^{\mathsf T}=S\}
$$

とする。写像

$$
F:M_n(\mathbb R)\to\operatorname{Sym}_n,
\qquad
F(A)=A^{\mathsf T}A
$$

を考える。

1. $\dim\operatorname{Sym}_n=n(n+1)/2$ を示せ。
2. $dF_A(H)$ を求めよ。
3. $A\in O(n)=F^{-1}(I)$ なら $dF_A$ が全射であることを示せ。
4. $O(n)$ が埋め込み部分多様体であることと、その次元
   $$
   \dim O(n)=\frac{n(n-1)}2
   $$
   を導け。
5. $T_AO(n)$ を求め、特に
   $$
   T_IO(n)
   =
   \{K:K^{\mathsf T}=-K\}
   $$
   を示せ。

- Level: C
- 狙い: 正則値定理・次元計算・核による接空間を行列の非自明な例で統合する

<!-- solution-start -->
**詳細解答**

1. 対称行列は対角成分 $n$ 個と、上三角の非対角成分

$$
\frac{n(n-1)}2
$$

個を自由に選べます。従って

$$
\dim\operatorname{Sym}_n
=
n+\frac{n(n-1)}2
=
\frac{n(n+1)}2.
$$

2. $A+tH$ を代入すると

$$
F(A+tH)
=
(A+tH)^{\mathsf T}(A+tH).
$$

展開して

$$
F(A+tH)
=
A^{\mathsf T}A
+t(A^{\mathsf T}H+H^{\mathsf T}A)
+t^2H^{\mathsf T}H.
$$

従って $t$ の一次係数から

$$
dF_A(H)
=
A^{\mathsf T}H+H^{\mathsf T}A.
$$

右辺は転置しても同じなので確かに $\operatorname{Sym}_n$ に入ります。

3. $A\in O(n)$ なら

$$
A^{\mathsf T}A=I.
$$

任意の $S\in\operatorname{Sym}_n$ に対し

$$
H=\frac12 AS
$$

と置きます。すると

$$
A^{\mathsf T}H
=
\frac12A^{\mathsf T}AS
=
\frac12S.
$$

また $S^{\mathsf T}=S$ なので

$$
H^{\mathsf T}A
=
\frac12S^{\mathsf T}A^{\mathsf T}A
=
\frac12S.
$$

従って

$$
dF_A(H)=S.
$$

任意の $S$ が像に入るので $dF_A$ は全射です。

4. 3より $I\in\operatorname{Sym}_n$ は $F$ の正則値です。従って [正則値定理](#thm-geo3-regular-value)から

$
O(n)=F^{-1}(I)
$$

は埋め込み部分多様体です。

定義域の次元は $n^2$、目標空間の次元は $n(n+1)/2$ なので

$$
\begin{aligned}
\dim O(n)
&=
n^2-\frac{n(n+1)}2\\
&=
\frac{2n^2-n^2-n}{2}\\
&=
\frac{n(n-1)}2.
\end{aligned}
$$

5. [正則レベル集合の接空間](#thm-geo3-level-tangent-kernel)から

$$
T_AO(n)=\ker dF_A.
$$

従って

$$
T_AO(n)
=
\{H:A^{\mathsf T}H+H^{\mathsf T}A=0\}.
$$

$K=A^{\mathsf T}H$ と置くと

$$
K^{\mathsf T}
=
H^{\mathsf T}A,
$$

なので核条件は

$$
K+K^{\mathsf T}=0,
$$

すなわち $K$ が反対称行列であることと同値です。

$H=AK$ だから

$$
T_AO(n)
=
\{AK:K^{\mathsf T}=-K\}.
$$

特に $A=I$ では

$$
T_IO(n)
=
\{K:K^{\mathsf T}=-K\}.
$$
<!-- solution-end -->

---

## 11. まとめ

本章では、GEO2 で定義した微分

$$
df_p:T_pM\to T_{f(p)}N
$$

の階数から局所幾何を読みました。

階数が近傍で一定なら、定数階数定理によって

$$
(x^1,\dots,x^m)
\longmapsto
(x^1,\dots,x^r,0,\dots,0)
$$

という標準形へ直せます。

その両端が

- 階数 $m$：はめ込み
- 階数 $n$：沈め込み

です。

さらに、正則値 $q$ に対するレベル集合は

$$
f^{-1}(q)
$$

として $m-n$ 次元埋め込み部分多様体になり、その接空間は

$$
T_p(f^{-1}(q))
=
\ker df_p
$$

で与えられます。

この「局所座標で平らにする」「局所方程式の核として接空間を読む」という二つの見方が、以後の幾何学の基本語彙になります。

次の GEO4 では、局所的に作った関数や構造を多様体全体へ貼り合わせるために、局所有限性・bump function・1 の分割へ進みます。
