# F0-02C6A 関数解析VI-A：分離定理・Minkowski 汎関数・Farkas

Hahn--Banach の定理は「部分空間上の線形汎関数を延長する」定理でした。本章では、集合の幾何を一つの劣線形汎関数へ変換し、その延長定理から **外部の点を連続線形汎関数の値で切り離す方法**を作ります。

標準関数解析では、この分離機構が後でノルム閉集合の弱閉性を示す道具になります。有限次元へ戻すと、同じ考えが連立不等式の実行不能性を証明する代数的な証明書へつながります。

---

## 1. 分離したいものを汎関数の値で比べる

有限次元で

$$
a^{\mathsf T}x=b
$$

という境界を考えると、左辺は線形汎関数

$$
f(x)=a^{\mathsf T}x
$$

です。従って境界は

$$
H=\{x:f(x)=b\}
$$

と書けます。

一般のノルム空間でも、非零の $f\in X^*$ と実数 $b$ による

$$
\{x\in X:f(x)=b\}
$$

が「汎関数の値が一定になる面」の役割を果たします。

点 $z$ と集合 $C$ を強く分離するとは、ある $f\in X^*\setminus\{0\}$ と実数 $\alpha$ が

$$
\sup_{x\in C}f(x)
<
\alpha
<
f(z)
$$

を満たすことです。つまり $f$ で測った値に正の隙間を作ります。

---

## 2. 分離で使う凸性を再確認する

Hahn--Banach の支配関数へ集合の形を移すには、二点を結ぶ線分が集合の外へ飛び出さないことが必要です。C1A で使った条件をここでも再掲します。

<a id="def-f0-02c6a-convex-set-recap"></a>

<!-- formal-statement-start -->
> **定義（分離で使う凸集合）**  
> ベクトル空間 $X$ の集合 $C$ が **凸** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して

$$
(1-t)x+ty\in C
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

この条件により、集合内の二点を係数 $1-t$ と $t$ で混ぜた点を使って Minkowski 汎関数の劣加法性を導けます。

---

## 3. 集合をあらゆる方向へ拡大できる条件

Minkowski 汎関数を全ての $x\in X$ で有限値として定めるには、集合を十分大きく拡大すれば任意のベクトルを取り込める必要があります。その性質を次で定義します。

<a id="def-f0-02c6a-absorbing"></a>

<!-- formal-statement-start -->
> **定義（吸収集合）**  
> ベクトル空間 $X$ の集合 $U$ が **吸収的**であるとは、任意の $x\in X$ に対してある $t>0$ が存在し、

$$
x\in tU
$$

> となることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c6a-absorbing -->
### 例：開球は吸収的

**定義の確認**：$U=B(0,1)$ とします。任意の $x\in X$ に対して

$$
t>\|x\|
$$

と取れば

$$
\left\|\frac{x}{t}\right\|<1,
$$

なので $x/t\in U$、従って

$$
x\in tU.
$$

よって単位開球は吸収的です。
<!-- definition-example-end -->

原点を内部に含むノルム空間の開集合は、同じ理由で吸収的です。

実際、$0\in U$ かつ $U$ が開なら、ある $r>0$ が

$$
B(0,r)\subset U
$$

を満たします。$x\ne0$ に対し $t>\|x\|/r$ と取れば

$$
\left\|\frac xt\right\|<r,
$$

従って $x/t\in U$、すなわち $x\in tU$ です。$x=0$ は $0\in U$ から従います。

---

## 4. 集合ごとの必要倍率を数値化する

吸収性により、任意の $x$ は十分大きい倍率 $t$ の $tU$ に入ります。そこで「$x$ を取り込むには少なくともどれだけ拡大すればよいか」を一つの実数で測ります。

<a id="def-f0-02c6a-minkowski"></a>

<!-- formal-statement-start -->
> **定義（Minkowski 汎関数）**  
> $U\subset X$ を原点を含む吸収的な集合とする。各 $x\in X$ に対して

$$
p_U(x)
:=
\inf\{t>0:x\in tU\}
$$

> と定める。この $p_U$ を $U$ の **Minkowski 汎関数（Minkowski functional, gauge）** という。
<!-- formal-statement-end -->

吸収性により、各 $x$ について集合

$$
\{t>0:x\in tU\}
$$

は空でないので、$p_U(x)$ は有限値を取ります。

<!-- definition-example-start: def-f0-02c6a-minkowski -->
### 例：単位球の Minkowski 汎関数

**定義の確認**：$U=B(0,1)$ とします。

$x\in tU$ は

$$
\|x\|<t
$$

と同値です。従って

$$
p_U(x)
=
\inf\{t>0:\|x\|<t\}
=
\|x\|.
$$

つまりノルムそのものが、単位開球の Minkowski 汎関数です。
<!-- definition-example-end -->

---

## 5. 開凸集合の Minkowski 汎関数は劣線形になる

$U$ を原点を含む開凸集合とします。前節より $U$ は吸収的です。

まず $a>0$ について

$$
\begin{aligned}
p_U(ax)
&=
\inf\{t>0:ax\in tU\}\\
&=
\inf\{as:s>0, x\in sU\}\\
&=
a\,p_U(x).
\end{aligned}
$$

$a=0$ では $p_U(0)=0$ なので正の斉次性が成り立ちます。

次に劣加法性を示します。$\varepsilon>0$ を固定します。infimum の定義から、

$$
x\in aU,
\qquad
a<p_U(x)+\varepsilon,
$$

$$
y\in bU,
\qquad
b<p_U(y)+\varepsilon
$$

となる $a,b>0$ を選べます。infimum が実際に達成されることは仮定していません。

すると

$$
\frac{x+y}{a+b}
=
\frac a{a+b}\frac xa
+
\frac b{a+b}\frac yb.
$$

$x/a,y/b\in U$ で、係数は非負かつ和が 1 です。$U$ の凸性から

$$
\frac{x+y}{a+b}\in U,
$$

従って

$$
x+y\in(a+b)U.
$$

よって

$$
p_U(x+y)
\le
a+b
<
p_U(x)+p_U(y)+2\varepsilon.
$$

$\varepsilon>0$ は任意なので

$$
p_U(x+y)
\le
p_U(x)+p_U(y).
$$

従って

$$
\boxed{p_U\text{ は劣線形汎関数}}
$$

です。

さらに、$U$ が開かつ凸で $0\in U$ なら

$$
\boxed{
x\in U
\iff
p_U(x)<1
}
$$

が成り立ちます。

$ p_U(x)<1$ なら、ある $t<1$ で $x\in tU$ とできます。$x=tu$、$u\in U$ と書けば、$0,u\in U$ と凸性から $x=tu+(1-t)0\in U$ です。

逆に $x\in U$ とします。写像 $s\mapsto sx$ は連続で、$s=1$ で $x\in U$ です。$U$ は開なので、1 より少し大きい $s>1$ でも $sx\in U$ とできます。すると

$$
x\in \frac1s U,
\qquad
\frac1s<1,
$$

なので $p_U(x)<1$ です。

---

## 6. 点と閉凸集合の強分離

<a id="thm-f0-02c6a-strong-separation"></a>

<!-- formal-statement-start -->
> **定理（点と閉凸集合の強分離）**  
> $X$ を実ノルム空間、$C\subset X$ を空でない閉凸集合、$z\notin C$ とする。  
> このとき、ある非零の $f\in X^*$ と実数 $\alpha$ が存在して

$$
\sup_{x\in C}f(x)
<
\alpha
<
f(z)
$$

> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 5.1 閉性から正の余白を作る

$C$ は閉で $z\notin C$ なので

$$
d:=\inf_{c\in C}\|z-c\|>0.
$$

$$
0<r<d
$$

を一つ取り、

$$
G:=C+B(0,r)
$$

と置きます。$G$ は開凸集合です。また $z\notin G$ です。もし $z=c+h$、$c\in C$、$\|h\|<r$ なら

$$
\|z-c\|=\|h\|<r<d
$$

となり $d$ の定義に反するからです。

#### 5.2 原点を含む開凸集合へ平行移動する

$c_0\in C$ を一つ固定し、

$$
V:=G-c_0
$$

と置きます。$V$ は開凸で $0\in V$ です。

$$
y:=z-c_0
$$

と置くと $z\notin G$ なので

$$
y\notin V.
$$

前節の特徴付けから

$$
p_V(y)\ge1.
$$

#### 5.3 一次元汎関数を作って Hahn--Banach で延長する

$M=\operatorname{span}\{y\}$ 上で

$$
f_0(ty):=t
$$

と定めます。

$t\ge0$ なら

$$
p_V(ty)=t\,p_V(y)\ge t=f_0(ty).
$$

$t<0$ なら $f_0(ty)=t<0$ であり、Minkowski 汎関数は定義から非負なので

$$
f_0(ty)\le p_V(ty).
$$

従って

$$
f_0\le p_V
$$

が $M$ 上で成り立ちます。

[Hahn--Banach の定理](../F0_02C6_Hahn_Banach_分離定理/index.md#thm-f0-02c6-hahn-banach-real)により、$f_0$ を線形汎関数 $f:X\to\mathbb R$ へ延長して

$$
f(x)\le p_V(x)
\qquad(x\in X)
$$

とできます。

#### 5.4 延長した汎関数が連続であることを確認する

$V$ は 0 の開近傍なので、ある $\rho>0$ が

$$
B(0,\rho)\subset V
$$

を満たします。

任意の $x\in X$ と $t>\|x\|/\rho$ に対して $x/t\in V$ なので $p_V(x)\le t$ です。$t\downarrow\|x\|/\rho$ として

$$
p_V(x)
\le
\frac{\|x\|}{\rho}.
$$

同じ評価を $-x$ にも使うと

$$
f(x)\le p_V(x)\le\frac{\|x\|}{\rho},
$$

$$
-f(x)=f(-x)\le p_V(-x)\le\frac{\|x\|}{\rho}.
$$

従って

$$
|f(x)|
\le
\frac1\rho\|x\|,
$$

よって $f\in X^*$ です。

#### 5.5 正の分離幅を作る

$g\in G$ なら $g-c_0\in V$ なので

$$
p_V(g-c_0)<1.
$$

従って

$$
f(g-c_0)
\le
p_V(g-c_0)
<1.
$$

一方

$$
f(z-c_0)
=
f(y)
=
f_0(y)
=
1.
$$

よって

$$
f(g)<f(z)
\qquad(g\in G).
$$

$c\in C$ と $\|h\|<r$ に対して $c+h\in G$ だから

$$
f(c)+f(h)<f(z).
$$

$\|h\|<r$ 上で $f(h)$ の supremum を取ると

$$
f(c)+r\|f\|
\le
f(z).
$$

$f(y)=1$ なので $f\ne0$、従って $\|f\|>0$ です。

よって

$$
\sup_{c\in C}f(c)
\le
f(z)-r\|f\|
<
f(z).
$$

例えば

$$
\alpha
=
f(z)-\frac{r\|f\|}{2}
$$

と置けば

$$
\sup_{c\in C}f(c)
<
\alpha
<
f(z).
$$

定理が示されました。
<!-- proof-end -->

### 複素ノルム空間では実部で分離する

複素ノルム空間を実ベクトル空間とみなして上の定理を適用すると、連続実線形汎関数 $\ell$ が得られます。

$$
f(x):=\ell(x)-i\ell(ix)
$$

と置くと

$$
f(ix)=if(x)
$$

なので $f$ は複素線形です。また

$$
\operatorname{Re}f(x)=\ell(x).
$$

従って複素ノルム空間では

$$
\sup_{c\in C}\operatorname{Re}f(c)
<
\operatorname{Re}f(z)
$$

という形で強分離できます。

---

## 7. Hilbert 空間では分離汎関数をベクトルで書ける

$H$ を Hilbert 空間、$C\subset H$ を空でない閉凸集合、$z\notin C$ とします。

[Hilbert 射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)から最近点

$$
p=P_C(z)
$$

が存在します。

[Hilbert 射影の特徴付け](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-f0-02c1a-projection-characterization)から

$$
\langle z-p,x-p\rangle\le0
\qquad(x\in C).
$$

$$
g:=z-p\ne0
$$

と置くと

$$
\langle g,x\rangle
\le
\langle g,p\rangle
$$

です。一方

$$
\begin{aligned}
\langle g,z\rangle
&=
\langle g,p+g\rangle\\
&=
\langle g,p\rangle+\|g\|^2\\
&>
\langle g,p\rangle.
\end{aligned}
$$

従って

$$
\boxed{
\langle g,x\rangle
\le
\langle g,p\rangle
<
\langle g,z\rangle
}
$$

で分離できます。

一般の Banach 空間では分離対象は $f\in X^*$ ですが、Hilbert 空間では Riesz 表現によりその汎関数をベクトルで表せます。

---

## 8. Farkas 型代替定理を有限個の非負結合から読む

$A\in\mathbb R^{m\times n}$ の列ベクトルを $a_1,\dots,a_n$ とし、

$$
K
=
\left\{
\sum_{j=1}^n x_ja_j:
x_j\ge0
\right\}
$$

と置きます。これは有限個の生成元の非負結合集合です。$K$ は加法と非負スカラー倍で閉じ、また二点の凸結合も再び $K$ に入ります。

### 7.1 $K$ が閉であること

$k_\nu\in K$ が $k_\nu\to k$ とします。各 $k_\nu$ は、線形独立な生成元だけを使う表現へ整理できます。

その手順を確認します。ある

$$
k_\nu
=
\sum_{j\in S}x_j a_j,
\qquad
x_j>0
$$

で、$(a_j)_{j\in S}$ が線形従属だとします。すると、全てが 0 ではない係数 $(\lambda_j)_{j\in S}$ が存在して

$$
\sum_{j\in S}\lambda_j a_j=0.
$$

必要なら全ての $\lambda_j$ の符号を反転し、

$$
P:=\{j\in S:\lambda_j>0\}
$$

が空でないようにします。

$$
\theta
:=
\min_{j\in P}\frac{x_j}{\lambda_j}>0
$$

と置き、

$$
x_j'
:=
x_j-\theta\lambda_j
$$

と定めます。$j\in P$ では $\theta\le x_j/\lambda_j$ だから $x_j'\ge0$、$\lambda_j\le0$ なら $x_j'\ge x_j>0$ です。また最小値を達成する $j_0\in P$ では

$$
x_{j_0}'=0.
$$

さらに

$$
\sum_{j\in S}x_j'a_j
=
\sum_{j\in S}x_ja_j
-
\theta
\sum_{j\in S}\lambda_ja_j
=
k_\nu.
$$

従って同じ $k_\nu$ を非負係数で表したまま、正係数を持つ生成元を少なくとも一つ減らせます。有限回繰り返せば、正係数を持つ生成元は線形独立になります。

生成元の部分集合は有限個しかないので、部分列を取れば同じ添字集合

$$
I\subset\{1,\dots,n\}
$$

を使って

$$
k_\nu
=
\sum_{j\in I}x_j^{(\nu)}a_j,
\qquad
x_j^{(\nu)}\ge0
$$

と書け、$(a_j)_{j\in I}$ は線形独立です。

写像

$$
L:\mathbb R^{I}\to\operatorname{span}\{a_j:j\in I\},
\qquad
L(x)=\sum_{j\in I}x_ja_j
$$

は有限次元空間間の線形同型なので逆写像は連続です。従って

$$
(x_j^{(\nu)})_{j\in I}
=
L^{-1}(k_\nu)
\to
L^{-1}(k).
$$

各成分は非負なので極限も非負です。よって $k\in K$ であり、$K$ は閉です。

### 7.2 分離から代数的な証明書を得る

$b\notin K$ とします。$K$ は閉凸で、$b$ はその外点なので強分離定理から、ある $y\in\mathbb R^m$ が

$$
y^{\mathsf T}k
\le
0
\qquad(k\in K),
$$

$$
y^{\mathsf T}b>0
$$

となるように、定数倍して向きを整えられます。

各生成元 $a_j\in K$ なので

$$
y^{\mathsf T}a_j\le0
\qquad(j=1,\dots,n),
$$

すなわち

$$
A^{\mathsf T}y\le0.
$$

従って

$$
\boxed{
b\notin K
\Longrightarrow
\exists y:
A^{\mathsf T}y\le0,
\quad
b^{\mathsf T}y>0
}
$$

です。

逆にこのような $y$ が存在して $b=Ax$、$x\ge0$ だとすると

$$
b^{\mathsf T}y
=
x^{\mathsf T}A^{\mathsf T}y
\le0,
$$

となり $b^{\mathsf T}y>0$ に反します。

したがって

$$
\boxed{
\text{ちょうど一方が成り立つ：}
\quad
\begin{cases}
Ax=b, x\ge0,\\
\exists y: A^{\mathsf T}y\le0, b^{\mathsf T}y>0.
\end{cases}
}
$$

これが Farkas 型の代替定理です。

後続の凸最適化では、この「実行可能点がないときは分離汎関数が証明書になる」という構造が乗数条件へつながります。

---

## 演習

### F0-02C6A-A01 半空間を分離する汎関数

- Level: A

$$
C=\{x\in\mathbb R^2:x_1\le0\},
\qquad
z=(1,0)
$$

を強分離する線形汎関数を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

$$
f(x_1,x_2)=x_1
$$

と置きます。$x\in C$ なら $f(x)\le0$ なので

$$
\sup_{x\in C}f(x)=0.
$$

一方

$$
f(z)=1.
$$

従って、例えば $\alpha=1/2$ と取れば

$$
\sup_{x\in C}f(x)
=
0
<
\frac12
<
1
=
f(z).
$$
<!-- solution-end -->

### F0-02C6A-A02 単位球の Minkowski 汎関数

- Level: A

$U=B(0,R)$、$R>0$ とする。$p_U(x)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$x\in tU$ は

$$
\|x\|<tR
$$

と同値です。従って

$$
p_U(x)
=
\inf\left\{t>0:t>\frac{\|x\|}{R}\right\}
=
\boxed{\frac{\|x\|}{R}}.
$$
<!-- solution-end -->

### F0-02C6A-A03 原点を含む開集合は吸収的

- Level: A

$U$ をノルム空間 $X$ の 0 を含む開集合とする。$U$ が吸収的であることを示せ。

<!-- solution-start -->
#### 詳細解答

$U$ は 0 の開近傍なので、ある $r>0$ が

$$
B(0,r)\subset U
$$

を満たします。

$x=0$ は $0\in U$ からよいので、$x\ne0$ とします。

$$
t>\frac{\|x\|}{r}
$$

と取ると

$$
\left\|\frac xt\right\|<r,
$$

従って $x/t\in U$ です。よって

$$
x=t\left(\frac xt\right)\in tU.
$$

任意の $x$ に対してこのような $t$ が存在するので $U$ は吸収的です。
<!-- solution-end -->

### F0-02C6A-A04 Hilbert 空間で射影から分離する

- Level: A

Hilbert 空間 $H$ の空でない閉凸集合 $C$ と $z\notin C$ に対し、$p=P_C(z)$ と置く。

$$
g=z-p
$$

を使って

$$
\langle g,x\rangle
\le
\langle g,p\rangle
<
\langle g,z\rangle
\qquad(x\in C)
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

Hilbert 射影の特徴付けから

$$
\langle z-p,x-p\rangle\le0
\qquad(x\in C).
$$

$g=z-p$ なので

$$
\langle g,x\rangle
-
\langle g,p\rangle
=
\langle g,x-p\rangle
\le0.
$$

従って

$$
\langle g,x\rangle
\le
\langle g,p\rangle.
$$

一方 $z=p+g$ だから

$$
\langle g,z\rangle
=
\langle g,p\rangle+\|g\|^2.
$$

$z\notin C$ なので $g=z-p\ne0$、従って $\|g\|^2>0$ です。よって厳密不等号も従います。
<!-- solution-end -->

### F0-02C6A-B01 Minkowski 汎関数の劣加法性

- Level: B

$U$ を 0 を含む開凸集合とする。$p_U$ について

$$
p_U(x+y)
\le
p_U(x)+p_U(y)
$$

を infimum の達成を仮定せずに示せ。

<!-- solution-start -->
#### 詳細解答

$\varepsilon>0$ を固定します。infimum の定義から

$$
p_U(x)<a<p_U(x)+\varepsilon,
\qquad
x\in aU,
$$

$$
p_U(y)<b<p_U(y)+\varepsilon,
\qquad
y\in bU
$$

となる $a,b>0$ を選べます。

$x/a,y/b\in U$ であり、$U$ は凸なので

$$
\frac{x+y}{a+b}
=
\frac a{a+b}\frac xa
+
\frac b{a+b}\frac yb
\in U.
$$

従って $x+y\in(a+b)U$ で、

$$
p_U(x+y)
\le a+b
<
p_U(x)+p_U(y)+2\varepsilon.
$$

$\varepsilon>0$ は任意なので結論が従います。
<!-- solution-end -->

### F0-02C6A-B02 閉性が分離の正の余白を作る

- Level: B

$C\subset X$ を閉集合、$z\notin C$ とする。

1. $d=\inf_{c\in C}\|z-c\|>0$ を示せ。
2. $0<r<d$ なら $(C+B(0,r))\cap\{z\}=\varnothing$ を示せ。
3. この $r$ が強分離証明のどこで正の gap を作るか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $X\setminus C$ は開で $z\in X\setminus C$ なので、ある $\rho>0$ が

$$
B(z,\rho)\subset X\setminus C
$$

を満たします。従って $c\in C$ なら $\|z-c\|\ge\rho$ で、

$$
d\ge\rho>0.
$$

2. もし $z=c+h$、$c\in C$、$\|h\|<r$ なら

$$
\|z-c\|=\|h\|<r<d
$$

となり $d$ の定義に反します。

3. Hahn--Banach で得た $f$ は $G=C+B(0,r)$ と $z$ を分けます。$c+h\in G$ を $\|h\|<r$ について使うことで

$$
f(c)+r\|f\|
\le f(z)
$$

となり、$r\|f\|>0$ が強分離の正の余白になります。
<!-- solution-end -->

### F0-02C6A-B03 Farkas 型の実行不能性証明

- Level: B

$$
A=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix},
\qquad
b=(-1,1)^{\mathsf T}
$$

とする。

$$
Ax=b,
\qquad
x\ge0
$$

が不可能であることを証明する $y$ で

$$
A^{\mathsf T}y\le0,
\qquad
b^{\mathsf T}y>0
$$

を満たすものを一つ与えよ。

<!-- solution-start -->
#### 詳細解答

$$
y=(-1,0)^{\mathsf T}
$$

と取ります。このとき

$$
A^{\mathsf T}y
=
(-1,0)^{\mathsf T}
\le0,
$$

また

$$
b^{\mathsf T}y
=
(-1,1)
\begin{pmatrix}
-1\\0
\end{pmatrix}
=
1>0.
$$

もし $Ax=b$、$x\ge0$ が成り立てば

$$
b^{\mathsf T}y
=
x^{\mathsf T}A^{\mathsf T}y
\le0
$$

となるので矛盾します。従って $y$ が実行不能性の証明書になっています。
<!-- solution-end -->

### F0-02C6A-C01 Farkas 型代替定理を分離から導く

- Level: C

$A\in\mathbb R^{m\times n}$ と $b\in\mathbb R^m$ に対して、次の二つのうちちょうど一方が成り立つことを示せ。

1. ある $x\ge0$ が存在して $Ax=b$。
2. ある $y\in\mathbb R^m$ が存在して

$$
A^{\mathsf T}y\le0,
\qquad
b^{\mathsf T}y>0.
$$

有限個の生成元の非負結合集合

$$
K=\{Ax:x\ge0\}
$$

が閉であることと強分離定理を使ってよい。

<!-- solution-start -->
#### 詳細解答

まず 1 と 2 は同時には成り立ちません。もし両方成り立てば

$$
b^{\mathsf T}y
=
(Ax)^{\mathsf T}y
=
x^{\mathsf T}A^{\mathsf T}y.
$$

$x\ge0$、$A^{\mathsf T}y\le0$ なので右辺は 0 以下です。これは $b^{\mathsf T}y>0$ に反します。

次に 1 が成り立たないとします。このとき

$$
b\notin K.
$$

$K$ は閉凸集合なので、強分離定理から非零線形汎関数、すなわちある $y\in\mathbb R^m$ が存在して

$$
\sup_{k\in K}y^{\mathsf T}k
<
y^{\mathsf T}b
$$

となります。

$K$ は非負スカラー倍で閉じ、$0\in K$ です。もしある $k_0\in K$ で $y^{\mathsf T}k_0>0$ なら、$tk_0\in K$ が全ての $t\ge0$ で成り立つため

$$
\sup_{k\in K}y^{\mathsf T}k
=
\infty,
$$

となり分離不等式に反します。従って

$$
y^{\mathsf T}k\le0
\qquad(k\in K).
$$

特に各列ベクトル $a_j=Ae_j\in K$ なので

$$
y^{\mathsf T}a_j\le0,
$$

すなわち

$$
A^{\mathsf T}y\le0.
$$

また $0\in K$ なので

$$
0
\le
\sup_{k\in K}y^{\mathsf T}k
<
y^{\mathsf T}b.
$$

従って

$$
b^{\mathsf T}y>0.
$$

よって 2 が成り立ちます。

以上から 1 と 2 のうちちょうど一方が成り立ちます。
<!-- solution-end -->

---

## 次に進む

標準関数解析では [FA4](../FA4/index.md) へ進みます。凸最適化では、この章で見た有限次元の代替定理が乗数構成へ接続します。
