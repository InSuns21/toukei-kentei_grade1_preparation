# RA6A 標準実解析 VI-A：逆関数定理・陰関数定理

多変数微分では、写像を点の近くで線形写像に近似しました。次に問いたいのは、その一次近似が可逆なら、元の非線形写像も本当に近くで可逆になるのか、ということです。

この章の答えは次の二つです。

- **逆関数定理**：$Df(a)$ が可逆なら、$f$ 自身も $a$ の近くで可逆になり、逆写像も $C^1$ 級になる。
- **陰関数定理**：方程式 $F(x,y)=0$ で $y$ 側の微分が可逆なら、局所的には $y=\varphi(x)$ と解ける。

両者は別々の暗記項目ではありません。陰関数定理は

$$
G(x,y)=(x,F(x,y))
$$

へ逆関数定理を適用して得られます。この一本の流れを証明まで追うことが本章の主題です。

前提として [多変数微分・Fréchet微分](../F0_02C3_Frechet微分_線形作用素_随伴/index.md)、[Riemann積分と微積分学の基本定理](../RA4/index.md)、[行列式と可逆性](../LA3C/index.md) を使います。後続の [多重Riemann積分・変数変換](../RA7/index.md) では、ここで得る局所可逆性が座標変換の理論的な土台になります。

---

## 1. 「Jacobianが正則」の意味

$f:U\subset\mathbb R^n\to\mathbb R^n$ が $a\in U$ でFréchet微分可能なら

$$
f(a+h)=f(a)+Df(a)h+o(\|h\|).
$$

$Df(a)$ は $a$ の近くで $f$ がどう動くかを表す最良の線形近似です。したがって $Df(a)$ が可逆なら、十分小さい範囲では $f$ も点を潰さず、逆向きに解けそうだと期待できます。

ただし、ここで結論できるのは **局所的な可逆性** です。

### 例1：微分は至る所可逆でも、大域的には単射でない

$$
f(x,y)=(e^x\cos y,e^x\sin y)
$$

とすると

$$
Df(x,y)
=e^x
\begin{pmatrix}
\cos y&-\sin y\\
\sin y&\cos y
\end{pmatrix},
\qquad
\det Df(x,y)=e^{2x}>0.
$$

従って微分はすべての点で可逆です。しかし

$$
f(x,y)=f(x,y+2\pi)
$$

なので $f$ は大域的には単射ではありません。逆関数定理が保証するのは、各点の **十分小さい近傍** での可逆性です。

### 例2：写像が可逆でも微分が可逆とは限らない

一変数の

$$
f(x)=x^3
$$

は全実数上で単射かつ全射ですが、$f'(0)=0$ です。逆関数

$$
f^{-1}(y)=y^{1/3}
$$

は0で有限な導関数を持ちません。

したがって「微分が可逆」という仮定は、単に逆写像が集合論的に存在することではなく、**逆写像まで滑らかに制御する条件**です。

---

## 2. 逆関数定理の証明に使う二つの補題

逆関数定理の核心は、非線形写像を恒等写像からの小さなずれとして扱うことです。そのために二つだけ道具を準備します。

<a id="lem-ra6a-segment-integral"></a>
<!-- formal-statement-start -->
> **補題（線分上の微分の積分表示）**  
> $U\subset\mathbb R^n$ を開集合、$g:U\to\mathbb R^m$ を $C^1$ 級とする。$x,z\in U$ を結ぶ線分 $[z,x]$ が $U$ に含まれるなら
> $$
> g(x)-g(z)
> =\int_0^1Dg(z+t(x-z))(x-z)\,dt.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\gamma(t)=z+t(x-z),\qquad 0\le t\le1
$$

と置き、$h(t)=g(\gamma(t))$ とします。連鎖律により

$$
h'(t)=Dg(\gamma(t))(x-z).
$$

各成分に一変数の微積分学の基本定理を適用すると

$$
h(1)-h(0)=\int_0^1h'(t)\,dt.
$$

$h(1)=g(x)$、$h(0)=g(z)$ を代入すれば主張を得ます。$\square$
<!-- proof-end -->

この補題から、閉球上で

$$
\|Dg(u)-I\|\le q<1
$$

なら、その閉球内の任意の $x,z$ に対して

$$
\|(g(x)-g(z))-(x-z)\|
\le q\|x-z\|
$$

が従います。実際、補題を $g-I$ に適用すればよいからです。従って三角不等式から

$$
(1-q)\|x-z\|
\le\|g(x)-g(z)\|
\le(1+q)\|x-z\|.
$$

左側の評価が「近くの二点は潰れない」ことを定量化しています。

<a id="lem-ra6a-contraction"></a>
<!-- formal-statement-start -->
> **補題（閉球上の収縮写像）**  
> $B\subset\mathbb R^n$ を閉球とし、$T:B\to B$ がある $0\le q<1$ に対して
> $$
> \|T(x)-T(z)\|\le q\|x-z\|
> $$
> をすべての $x,z\in B$ で満たすとする。このとき $T$ はただ一つの不動点 $x_*$ を持つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x_0\in B$ から

$$
x_{k+1}=T(x_k)
$$

と反復します。収縮性から

$$
\|x_{k+1}-x_k\|
\le q^k\|x_1-x_0\|.
$$

したがって $p\ge1$ に対して

$$
\begin{aligned}
\|x_{k+p}-x_k\|
&\le\sum_{j=0}^{p-1}\|x_{k+j+1}-x_{k+j}\|\\
&\le\|x_1-x_0\|\sum_{j=0}^{p-1}q^{k+j}\\
&\le\frac{q^k}{1-q}\|x_1-x_0\|.
\end{aligned}
$$

右辺は $k\to\infty$ で0へ行くので $(x_k)$ はCauchy列です。$\mathbb R^n$ は完備で、閉球 $B$ は閉集合なので、ある $x_*\in B$ へ収束します。

収縮写像はLipschitz連続なので

$$
T(x_*)
=T\left(\lim_{k\to\infty}x_k\right)
=\lim_{k\to\infty}T(x_k)
=\lim_{k\to\infty}x_{k+1}
=x_*.
$$

よって不動点が存在します。

一意性も収縮率 $q<1$ から従います。$x_*,y_*$ がともに不動点なら

$$
\|x_*-y_*\|
=\|T(x_*)-T(y_*)\|
\le q\|x_*-y_*\|.
$$

従って $(1-q)\|x_*-y_*\|\le0$ であり、$x_*=y_*$ です。$\square$
<!-- proof-end -->

ここではBanach空間上の一般形を先取りしていません。逆関数定理に必要な有限次元の閉球だけで証明を閉じています。

---

## 3. 逆関数定理

<a id="thm-ra6a-inverse-function"></a>
<!-- formal-statement-start -->
> **定理（逆関数定理）**  
> $U\subset\mathbb R^n$ を開集合、$f:U\to\mathbb R^n$ を $C^1$ 級とする。$a\in U$ で $Df(a)$ が可逆なら、$a$ の開近傍 $V\subset U$ と $f(a)$ の開近傍 $W$ が存在して、制限
> $$
> f|_V:V\to W
> $$
> は全単射であり、その逆写像 $f^{-1}:W\to V$ も $C^1$ 級である。さらに $x\in V$ に対して
> $$
> D(f^{-1})(f(x))=[Df(x)]^{-1}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

証明を「正規化」「方程式を不動点問題へ変換」「逆写像の微分」の三段階に分けます。

#### 1. $Df(a)=I$ となるよう正規化する

$A=Df(a)$ と置きます。仮定により $A$ は可逆です。変数を $a$ だけ平行移動し、値を $f(a)$ だけ平行移動したうえで $A^{-1}$ を作用させ、

$$
g(h)=A^{-1}\{f(a+h)-f(a)\}
$$

と定めます。すると

$$
g(0)=0,
\qquad
Dg(0)=A^{-1}Df(a)=I.
$$

従って、この $g$ について0の近くで定理を示せば、最後に平行移動と $A$ を戻して元の $f$ の結論が得られます。

以下では記号を簡単にするため、最初から

$$
a=0,\qquad f(0)=0,\qquad Df(0)=I
$$

と仮定して証明します。

#### 2. 微分が恒等写像から大きくずれない閉球を取る

$Df$ は0で連続なので、例えば $q=1/2$ と固定すれば、十分小さい $r>0$ を取って

$$
\overline{B_r(0)}\subset U,
\qquad
\|Df(x)-I\|\le q<1
$$

をすべての $x\in\overline{B_r(0)}$ で成り立たせられます。

Section 2 の線分評価から、この閉球内の任意の $x,z$ に対して

$$
(1-q)\|x-z\|
\le\|f(x)-f(z)\|
\le(1+q)\|x-z\|.
$$

特に左側から、$f$ はこの閉球上で単射です。

#### 3. $f(x)=y$ を収縮写像の不動点方程式へ変える

$y$ を0に近い点として固定し

$$
T_y(x)=x-f(x)+y
$$

と置きます。$T_y(x)=x$ と $f(x)=y$ は同値です。

また

$$
DT_y(x)=I-Df(x)
$$

なので、Section 2 の線分積分表示から

$$
\|T_y(x)-T_y(z)\|
\le q\|x-z\|
$$

です。従って $T_y$ は収縮写像です。

残るのは閉球を自分自身へ写すことです。$T_0(0)=0$ なので

$$
\|T_0(x)\|
\le q\|x\|
\le qr.
$$

そこで

$$
\|y\|<(1-q)r
$$

とすれば

$$
\|T_y(x)\|
\le\|T_0(x)\|+\|y\|
<qr+(1-q)r=r.
$$

よって $T_y$ は $\overline{B_r(0)}$ をそれ自身へ写します。収縮写像補題から、各

$$
y\in B_{(1-q)r}(0)
$$

に対して $f(x)=y$ を満たす $x\in\overline{B_r(0)}$ がただ一つ存在します。しかも上の不等式は厳密なので、その解は実際には $B_r(0)$ の内部にあります。

$$
W=B_{(1-q)r}(0),
\qquad
V=B_r(0)\cap f^{-1}(W)
$$

と置けば、$V$ は開集合で、$f|_V:V\to W$ は全単射です。

#### 4. 逆写像はまずLipschitz連続である

先ほどの二側評価の左側へ $x=f^{-1}(y)$、$z=f^{-1}(y')$ を代入すると

$$
\|f^{-1}(y)-f^{-1}(y')\|
\le\frac1{1-q}\|y-y'\|.
$$

従って逆写像はLipschitz連続です。

#### 5. 逆写像を微分する

$x\in V$、$y=f(x)$ とします。まず $Df(x)$ が可逆であることを確認します。任意の $h$ に対して

$$
\|Df(x)h-h\|\le q\|h\|
$$

なので

$$
\|Df(x)h\|\ge(1-q)\|h\|.
$$

従って $Df(x)h=0$ なら $h=0$ であり、$Df(x)$ は単射です。有限次元で定義域と値域の次元が同じなので可逆です。

$y$ を $y+\eta$ に動かし、対応する逆像を $x+k$ と書きます。すなわち

$$
y+\eta=f(x+k),
\qquad y=f(x).
$$

$f$ の微分可能性から

$$
\eta
=f(x+k)-f(x)
=Df(x)k+r(k),
\qquad
\frac{\|r(k)\|}{\|k\|}\to0.
$$

一方、逆写像のLipschitz評価から

$$
\|k\|\le\frac1{1-q}\|\eta\|.
$$

上の一次近似式を $k$ について解けば

$$
k
=[Df(x)]^{-1}\eta-[Df(x)]^{-1}r(k).
$$

$k=O(\|\eta\|)$ であり、$r(k)=o(\|k\|)$ なので

$$
[Df(x)]^{-1}r(k)=o(\|\eta\|).
$$

したがって

$$
f^{-1}(y+\eta)-f^{-1}(y)
=[Df(x)]^{-1}\eta+o(\|\eta\|).
$$

よって

$$
D(f^{-1})(y)=[Df(x)]^{-1}.
$$

#### 6. 逆写像の微分は連続である

$f^{-1}$ は連続で、$Df$ も連続です。またこの近傍では $Df(x)$ の逆作用素ノルムは一様に

$$
\|[Df(x)]^{-1}\|\le\frac1{1-q}
$$

で抑えられます。可逆行列 $A,B$ には

$$
B^{-1}-A^{-1}=B^{-1}(A-B)A^{-1}
$$

が成り立つので、$B\to A$ なら $B^{-1}\to A^{-1}$ です。従って

$$
y\longmapsto[D f(f^{-1}(y))]^{-1}
$$

は連続です。ゆえに $f^{-1}$ は $C^1$ 級です。

正規化前の座標へ戻せば一般の場合も従います。$\square$
<!-- proof-end -->

この証明の核心は、$Df(a)$ が可逆であることそのものより、正規化後に

$$
\|Df(x)-I\|<1
$$

となる小近傍を取り、非線形部分を収縮に押し込むことです。

---

## 4. 逆関数定理を計算で使う

### 例3：逆写像を明示できる場合

$$
f(x,y)=\bigl(x,(1+x)y\bigr)
$$

とします。

$$
Df(x,y)
=
\begin{pmatrix}
1&0\\
y&1+x
\end{pmatrix},
\qquad
\det Df(x,y)=1+x.
$$

したがって $x\ne-1$ なら逆関数定理を適用できます。実際

$$
(u,v)=f(x,y)
$$

から

$$
x=u,
\qquad y=\frac{v}{1+u}
$$

なので

$$
f^{-1}(u,v)=\left(u,\frac{v}{1+u}\right)
$$

です。

例えば $(x,y)=(0,2)$ では

$$
Df(0,2)=
\begin{pmatrix}
1&0\\
2&1
\end{pmatrix},
\qquad
[Df(0,2)]^{-1}
=
\begin{pmatrix}
1&0\\
-2&1
\end{pmatrix}.
$$

逆写像を直接微分しても、$f(0,2)=(0,2)$ で同じ行列が得られます。

### 例4：行列式が0になる場所は何を示すか

上の写像では $x=-1$ で

$$
f(-1,y)=(-1,0)
$$

となり、$y$ の情報が完全に潰れます。ここでは

$$
\det Df(-1,y)=0
$$

であり、微分の非可逆性と実際の局所的な情報消失が一致しています。

ただし例2の $x^3$ が示すように、$Df(a)$ が非可逆だからといって、写像そのものが必ず局所単射でないとは限りません。逆関数定理は十分条件であって、その逆を主張していません。

---

## 5. 陰関数定理

方程式

$$
F(x,y)=0
$$

を考えます。$x\in\mathbb R^m$ を自由変数、$y\in\mathbb R^n$ を「方程式から決まる変数」と見たいとします。

<a id="thm-ra6a-implicit-function"></a>
<!-- formal-statement-start -->
> **定理（陰関数定理）**  
> $U\subset\mathbb R^{m+n}$ を開集合、$F:U\to\mathbb R^n$ を $C^1$ 級とする。$(a,b)\in U$ が
> $$
> F(a,b)=0
> $$
> を満たし、$y$ に関する偏微分
> $$
> D_yF(a,b):\mathbb R^n\to\mathbb R^n
> $$
> が可逆であるとする。このとき $a$ の開近傍 $A$ と $b$ の開近傍 $B$、ただ一つの $C^1$ 級写像 $\varphi:A\to B$ が存在し、$(x,y)\in A\times B$ では
> $$
> F(x,y)=0
> \quad\Longleftrightarrow\quad
> y=\varphi(x).
> $$
> さらに
> $$
> D\varphi(x)
> =-[D_yF(x,\varphi(x))]^{-1}D_xF(x,\varphi(x)).
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

逆関数定理へ帰着します。

$$
G(x,y)=(x,F(x,y))
$$

と定めます。$G:\mathbb R^{m+n}\to\mathbb R^{m+n}$ の微分はブロック行列で

$$
DG(a,b)
=
\begin{pmatrix}
I_m&0\\
D_xF(a,b)&D_yF(a,b)
\end{pmatrix}.
$$

この行列が可逆であることを直接確認します。右辺 $(u,v)$ に対して

$$
DG(a,b)
\begin{pmatrix}
\xi\\
\eta
\end{pmatrix}
=
\begin{pmatrix}
u\\
v
\end{pmatrix}
$$

を解くと、第1行から $\xi=u$ です。第2行は

$$
D_xF(a,b)u+D_yF(a,b)\eta=v
$$

なので

$$
\eta=[D_yF(a,b)]^{-1}\{v-D_xF(a,b)u\}
$$

とただ一つ解けます。従って $DG(a,b)$ は可逆です。

[逆関数定理](#thm-ra6a-inverse-function) により、$(a,b)$ の近傍で $G$ は $C^1$ 級の逆写像を持ちます。$G(a,b)=(a,0)$ なので、$(a,0)$ の十分小さい直積近傍を逆写像の定義域に含められます。

$G(x,y)$ の第1成分は常に $x$ です。したがって逆写像を

$$
G^{-1}(x,z)=(x,h(x,z))
$$

と書けます。ここで

$$
\varphi(x)=h(x,0)
$$

と置けば

$$
G(x,\varphi(x))=(x,0),
$$

すなわち

$$
F(x,\varphi(x))=0.
$$

逆に近傍内で $F(x,y)=0$ なら $G(x,y)=(x,0)$ です。$G$ はその近傍で単射なので

$$
(x,y)=G^{-1}(x,0)=(x,\varphi(x)),
$$

従って $y=\varphi(x)$ です。これで存在と局所一意性が示されました。

最後に恒等式

$$
F(x,\varphi(x))=0
$$

を $x$ で微分します。連鎖律により

$$
D_xF(x,\varphi(x))
+D_yF(x,\varphi(x))D\varphi(x)=0.
$$

近傍を必要ならさらに小さく取れば $D_yF$ は可逆なので、左から逆行列を掛けて

$$
D\varphi(x)
=-[D_yF(x,\varphi(x))]^{-1}D_xF(x,\varphi(x)).
$$

を得ます。$\square$
<!-- proof-end -->

陰関数定理は「方程式を陽に解く公式」を与える定理ではありません。**解を局所的な関数として一意に追跡できることと、その一次感度**を与える定理です。

---

## 6. 陰関数定理の例

### 例5：円周を局所的にグラフとして見る

$$
F(x,y)=x^2+y^2-1
$$

とします。$(0,1)$ では $F(0,1)=0$ で

$$
\frac{\partial F}{\partial y}(0,1)=2\ne0.
$$

したがって $(0,1)$ の近くでは円周を

$$
y=\varphi(x)
$$

と一意に書けます。実際には上半円

$$
\varphi(x)=\sqrt{1-x^2}
$$

です。

陰関数定理の微分公式から

$$
\varphi'(x)
=-\frac{F_x(x,\varphi(x))}{F_y(x,\varphi(x))}
=-\frac{x}{\varphi(x)}.
$$

一方 $(1,0)$ では $F_y(1,0)=0$ なので、$y$ を $x$ の関数として解くこの形の定理は使えません。しかし

$$
F_x(1,0)=2\ne0
$$

なので、今度は $x$ を $y$ の関数として解けます。円周そのものが壊れたのではなく、**選んだ座標方向が悪かった**だけです。

### 例6：明示解が書けなくても感度は求まる

$$
F(x,y)=y+e^y-x
$$

を考えます。$(x,y)=(1,0)$ で $F(1,0)=0$、また

$$
F_y(1,0)=1+e^0=2\ne0.
$$

従って $x=1$ の近くで方程式 $y+e^y=x$ はただ一つの $C^1$ 級解 $y=\varphi(x)$ を持ちます。$\varphi$ 自体を初等関数で書く必要はありません。

微分公式から

$$
\varphi'(x)
=\frac1{1+e^{\varphi(x)}},
$$

特に

$$
\varphi'(1)=\frac12.
$$

よって

$$
\varphi(1+h)=\frac12h+o(|h|)
$$

です。陰関数定理は、明示解なしでも局所的な一次近似を与えます。

### 例7：推定方程式・パラメータ感度の一般形

未知量 $\theta\in\mathbb R^p$ が外部パラメータ $t\in\mathbb R^q$ に依存し、

$$
\Psi(\theta,t)=0
$$

で定まるとします。$(\theta_0,t_0)$ で

$$
\Psi(\theta_0,t_0)=0,
\qquad
D_\theta\Psi(\theta_0,t_0)
$$

が可逆なら、局所的に $\theta=\theta(t)$ と解けて

$$
D\theta(t_0)
=-[D_\theta\Psi(\theta_0,t_0)]^{-1}
D_t\Psi(\theta_0,t_0).
$$

統計で推定方程式の解がデータ要約や調整パラメータにどう反応するかを見るときにも、同じ構造が現れます。

---

## 7. 正則なレベル集合は局所的にグラフになる

陰関数定理から、曲線・曲面を「方程式の解集合」として扱う基本結果が得られます。

<a id="cor-ra6a-regular-level-set"></a>
<!-- formal-statement-start -->
> **系（正則レベル集合の局所グラフ表示）**  
> $F:U\subset\mathbb R^n\to\mathbb R^k$ を $C^1$ 級、$p\in U$ とする。$DF(p)$ の階数が $k$ なら、座標を必要に応じて並べ替えることで $x=(u,v)\in\mathbb R^{n-k}\times\mathbb R^k$ と書け、$p=(u_0,v_0)$ の近くで
> $$
> F(x)=F(p)
> $$
> の解集合は
> $$
> v=\varphi(u)
> $$
> という $C^1$ 級グラフになる。特に自由度は局所的に $n-k$ 個である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$DF(p)$ の階数が $k$ なので、その $k$ 本の列を適切に選べば可逆な $k\times k$ 小行列が得られます。座標を並べ替え、その列に対応する変数を $v\in\mathbb R^k$、残りを $u\in\mathbb R^{n-k}$ とします。

$$
H(u,v)=F(u,v)-F(p)
$$

と置けば $H(u_0,v_0)=0$ で、$D_vH(u_0,v_0)$ は選んだ可逆小行列です。従って [陰関数定理](#thm-ra6a-implicit-function) から、近傍で

$$
H(u,v)=0
\quad\Longleftrightarrow\quad
v=\varphi(u)
$$

となります。$H=0$ は $F=F(p)$ と同値なので主張が従います。$\square$
<!-- proof-end -->

この結果は一般の定数階数定理そのものではありません。本章で必要な「最大階数のレベル集合」の局所形だけを陰関数定理から取り出しています。

さらに $p$ における接方向も読めます。グラフ表示

$$
\gamma(u)=(u,\varphi(u))
$$

を微分すると、レベル集合に沿う速度 $h=D\gamma(u_0)\xi$ は

$$
DF(p)h=0
$$

を満たします。逆に次元を数えると $\ker DF(p)$ の次元も $n-k$ なので、局所レベル集合の接空間は

$$
\boxed{T_p=\ker DF(p)}
$$

です。

---

## 8. Lagrange未定乗数法は陰関数定理の系

<a id="cor-ra6a-lagrange"></a>
<!-- formal-statement-start -->
> **系（Lagrange未定乗数法）**  
> $f:U\subset\mathbb R^n\to\mathbb R$、$g:U\to\mathbb R^k$ を $C^1$ 級とする。$p\in U$ が制約
> $$
> g(x)=g(p)
> $$
> の下で $f$ の局所極値点であり、$Dg(p)$ の階数が $k$ であるとする。このときある $\lambda\in\mathbb R^k$ が存在して
> $$
> \nabla f(p)=Dg(p)^{\mathsf T}\lambda.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Section 7 により、制約集合は $p$ の近くで $(n-k)$ 次元の $C^1$ 級グラフとして表され、その接空間は

$$
T_p=\ker Dg(p)
$$

です。

任意の接方向 $h\in T_p$ を取ります。局所グラフの中で $p$ を通り初速度 $h$ を持つ $C^1$ 曲線 $\gamma(t)$ を取れます。$p$ は制約集合上の局所極値なので、一変数関数

$$
t\longmapsto f(\gamma(t))
$$

は $t=0$ で局所極値を持ちます。従って

$$
0=\frac{d}{dt}f(\gamma(t))\bigg|_{t=0}
=Df(p)h
=\nabla f(p)^{\mathsf T}h.
$$

つまり $\nabla f(p)$ は $\ker Dg(p)$ のすべてのベクトルに直交します。有限次元線形代数の

$$
(\ker A)^\perp=\operatorname{im}A^{\mathsf T}
$$

を $A=Dg(p)$ に適用すると

$$
\nabla f(p)\in\operatorname{im}Dg(p)^{\mathsf T}.
$$

従ってある $\lambda\in\mathbb R^k$ が存在して

$$
\nabla f(p)=Dg(p)^{\mathsf T}\lambda
$$

となります。$\square$
<!-- proof-end -->

未定乗数法の式は突然現れる計算技巧ではありません。**制約面に沿う全方向で一階変化が0になるため、勾配は制約面の法線方向に入る**という幾何を式にしたものです。

---

## 9. 何を確認してから定理を使うか

逆関数定理・陰関数定理では、次の取り違えが起こりやすいので整理しておきます。

1. **局所と大域を分ける。**  $\det Df\ne0$ が全点で成り立っても、大域単射とは限りません。例1が反例です。
2. **$C^1$ 仮定を落とさない。**  証明では $Df(x)$ を近傍全体で $Df(a)$ に近づけるため、微分の連続性を使っています。
3. **陰関数定理では解きたい変数側の微分を見る。**  $F(x,y)=0$ を $y=\varphi(x)$ と解きたいなら $D_yF$ の可逆性が必要です。
4. **可逆性判定は点で行う。**  条件はまず基準点 $(a,b)$ で確認し、連続性によって近傍へ広げます。
5. **微分が非可逆でも即座に「逆関数なし」とは言えない。**  $x^3$ はその反例です。失われるのは逆関数定理による滑らかな局所逆写像の保証です。

依存関係をまとめると

```text
Fréchet微分・連鎖律 + FTC + 行列の可逆性
              ↓
       線分上の積分評価
              ↓
          収縮写像
              ↓
          逆関数定理
              ↓
          陰関数定理
          ↙        ↘
正則レベル集合   パラメータ感度
        ↓
 Lagrange未定乗数法
```

---

## 10. 演習

### Level A

<a id="ex-ra6a-a01"></a>
#### RA6A-A01 局所逆写像の存在
- Level: A

$$
f(x,y)=(x+y,\ x-y+x^2)
$$

とする。原点の近くで逆写像が存在することを示し、$D(f^{-1})(0,0)$ を求めよ。

<!-- solution-start -->
**解答**：まず

$$
Df(x,y)
=
\begin{pmatrix}
1&1\\
1+2x&-1
\end{pmatrix}.
$$

原点では

$$
Df(0,0)
=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix},
\qquad
\det Df(0,0)=-2\ne0.
$$

$f$ は多項式写像なので $C^1$ 級です。従って [逆関数定理](#thm-ra6a-inverse-function) により、原点のある近傍で $f$ は $C^1$ 級逆写像を持ちます。また $f(0,0)=(0,0)$ なので

$$
D(f^{-1})(0,0)
=[Df(0,0)]^{-1}.
$$

$2\times2$ 行列の逆行列を計算すると

$$
[Df(0,0)]^{-1}
=\frac1{-2}
\begin{pmatrix}
-1&-1\\
-1&1
\end{pmatrix}
=\frac12
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}.
$$

したがって

$$
\boxed{D(f^{-1})(0,0)
=\frac12
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}}.
$$
<!-- solution-end -->

<a id="ex-ra6a-a02"></a>
#### RA6A-A02 局所可逆と大域可逆
- Level: A

$$
f(x,y)=(e^x\cos y,e^x\sin y)
$$

について、任意の点で局所逆写像が存在することを示せ。また大域的な逆写像が存在しない理由を述べよ。

<!-- solution-start -->
**解答**：本文の例1と同様に

$$
Df(x,y)
=e^x
\begin{pmatrix}
\cos y&-\sin y\\
\sin y&\cos y
\end{pmatrix}
$$

なので

$$
\det Df(x,y)=e^{2x}>0.
$$

$f$ は $C^1$ 級で、微分は任意の点で可逆です。従って逆関数定理から、各点ごとに十分小さい近傍を取れば局所逆写像が存在します。

しかし

$$
f(x,y+2\pi)=f(x,y)
$$

なので、異なる点 $(x,y)$ と $(x,y+2\pi)$ が同じ値へ写ります。従って $f$ は $\mathbb R^2$ 全体では単射でなく、大域的逆写像は存在しません。

この問題では

$$
\det Df\ne0\text{ everywhere}
$$

と「大域単射」を混同しないことが要点です。
<!-- solution-end -->

<a id="ex-ra6a-a03"></a>
#### RA6A-A03 円周の陰関数
- Level: A

$$
F(x,y)=x^2+y^2-1
$$

について、点 $(0,1)$ の近くで $y=\varphi(x)$ と解けることを示し、$\varphi'(0)$ を陰関数定理から求めよ。また $(1,0)$ で同じ向きに解けない理由を述べよ。

<!-- solution-start -->
**解答**：$(0,1)$ では

$$
F(0,1)=0,
\qquad
F_y(0,1)=2.
$$

$F_y(0,1)\ne0$ なので [陰関数定理](#thm-ra6a-implicit-function) により、原点に近い $x$ に対してただ一つの $C^1$ 級関数 $y=\varphi(x)$ が存在し

$$
F(x,\varphi(x))=0
$$

となります。

微分公式は

$$
\varphi'(x)
=-\frac{F_x(x,\varphi(x))}{F_y(x,\varphi(x))}
=-\frac{x}{\varphi(x)}.
$$

従って

$$
\boxed{\varphi'(0)=0}.
$$

一方 $(1,0)$ では

$$
F_y(1,0)=0
$$

なので、$y$ を $x$ の関数として解く形の陰関数定理の仮定を満たしません。実際、円周には $(1,0)$ の近くで同じ $x<1$ に対して正負二つの $y$ があり、一価関数 $y=\varphi(x)$ にはなりません。

ただし $F_x(1,0)=2\ne0$ なので、変数の役割を交換すれば $x$ を $y$ の関数としては解けます。
<!-- solution-end -->

<a id="ex-ra6a-a04"></a>
#### RA6A-A04 明示解なしの感度
- Level: A

方程式

$$
y+e^y=x
$$

が $(x,y)=(1,0)$ の近くで $y=\varphi(x)$ を一意に定めることを示し、$\varphi'(1)$ を求めよ。

<!-- solution-start -->
**解答**：

$$
F(x,y)=y+e^y-x
$$

と置きます。すると

$$
F(1,0)=0,
\qquad
F_y(x,y)=1+e^y.
$$

特に

$$
F_y(1,0)=2\ne0.
$$

従って陰関数定理から、$x=1$ の近くでただ一つの $C^1$ 級関数 $y=\varphi(x)$ が存在します。

また

$$
F_x(x,y)=-1
$$

なので

$$
\varphi'(x)
=-\frac{F_x(x,\varphi(x))}{F_y(x,\varphi(x))}
=\frac1{1+e^{\varphi(x)}}.
$$

$\varphi(1)=0$ を代入して

$$
\boxed{\varphi'(1)=\frac12}.
$$

したがって一次近似は

$$
\varphi(1+h)=\frac h2+o(|h|)
$$

です。明示的に $\varphi$ を解かなくても、局所的な感度は計算できます。
<!-- solution-end -->

### Level B

<a id="ex-ra6a-b01"></a>
#### RA6A-B01 逆関数定理の定量評価
- Level: B

凸集合 $C\subset\mathbb R^n$ 上で $g:C\to\mathbb R^n$ が $C^1$ 級で

$$
\|Dg(x)-I\|\le q<1
$$

を満たすとする。任意の $x,z\in C$ に対して

$$
(1-q)\|x-z\|
\le\|g(x)-g(z)\|
\le(1+q)\|x-z\|
$$

を示せ。この評価から $g$ が単射であることも示せ。

<!-- solution-start -->
**解答**：$C$ は凸なので $z+t(x-z)\in C$ が $0\le t\le1$ で成り立ちます。[線分上の積分表示](#lem-ra6a-segment-integral) を $g-I$ に適用すると

$$
(g(x)-x)-(g(z)-z)
=\int_0^1\{Dg(z+t(x-z))-I\}(x-z)\,dt.
$$

ノルムを取れば

$$
\begin{aligned}
\|(g(x)-g(z))-(x-z)\|
&\le\int_0^1
\|Dg(z+t(x-z))-I\|\,\|x-z\|\,dt\\
&\le q\|x-z\|.
\end{aligned}
$$

よって上側は

$$
\|g(x)-g(z)\|
\le\|x-z\|+q\|x-z\|
=(1+q)\|x-z\|.
$$

下側は逆三角不等式から

$$
\begin{aligned}
\|g(x)-g(z)\|
&\ge\|x-z\|-\|(g(x)-g(z))-(x-z)\|\\
&\ge(1-q)\|x-z\|.
\end{aligned}
$$

$q<1$ なので、$g(x)=g(z)$ なら

$$
0\ge(1-q)\|x-z\|
$$

となり $x=z$ です。従って $g$ は単射です。
<!-- solution-end -->

<a id="ex-ra6a-b02"></a>
#### RA6A-B02 球面の接空間
- Level: B

$$
S^{n-1}=\{x\in\mathbb R^n:\|x\|^2=1\}
$$

とする。$p\in S^{n-1}$ の近くで $S^{n-1}$ が $(n-1)$ 個の自由変数を持つ $C^1$ 級グラフになることを示し、接空間が

$$
T_pS^{n-1}=\{h\in\mathbb R^n:p^{\mathsf T}h=0\}
$$

であることを示せ。

<!-- solution-start -->
**解答**：

$$
F(x)=\|x\|^2-1
$$

と置けば $S^{n-1}=F^{-1}(0)$ です。微分は

$$
DF(p)h=2p^{\mathsf T}h.
$$

$p\in S^{n-1}$ なので $p\ne0$ です。従って少なくとも一つの成分 $p_j$ が0でなく

$$
\frac{\partial F}{\partial x_j}(p)=2p_j\ne0.
$$

その座標を従属変数として [陰関数定理](#thm-ra6a-implicit-function) を適用すれば、$p$ の近くで球面は残り $n-1$ 座標の $C^1$ 級関数のグラフになります。

Section 7 の接空間公式から

$$
T_pS^{n-1}=\ker DF(p).
$$

したがって

$$
\ker DF(p)
=\{h:2p^{\mathsf T}h=0\}
=\{h:p^{\mathsf T}h=0\}.
$$

これは幾何的には、半径ベクトル $p$ に直交する超平面です。
<!-- solution-end -->

<a id="ex-ra6a-b03"></a>
#### RA6A-B03 Lagrange未定乗数法
- Level: B

球面

$$
x^2+y^2+z^2=1
$$

の上で

$$
f(x,y,z)=x+y+z
$$

の最大値と最小値を求めよ。Lagrange未定乗数法の適用条件も確認せよ。

<!-- solution-start -->
**解答**：制約関数を

$$
g(x,y,z)=x^2+y^2+z^2
$$

とします。球面上では

$$
\nabla g=2(x,y,z)\ne0
$$

なので $Dg$ の階数は1です。従って [Lagrange未定乗数法](#cor-ra6a-lagrange) の正則性条件を満たします。

極値点ではある $\lambda$ に対して

$$
\nabla f=(1,1,1)
=\lambda\nabla g
=2\lambda(x,y,z).
$$

従って

$$
x=y=z=\frac1{2\lambda}.
$$

制約へ代入すると

$$
3\left(\frac1{2\lambda}\right)^2=1,
$$

したがって候補点は

$$
\left(\frac1{\sqrt3},\frac1{\sqrt3},\frac1{\sqrt3}\right),
\qquad
\left(-\frac1{\sqrt3},-\frac1{\sqrt3},-\frac1{\sqrt3}\right)
$$

です。そこでの値はそれぞれ

$$
\sqrt3,\qquad-\sqrt3.
$$

球面はコンパクトで $f$ は連続なので最大値・最小値は必ず存在します。正則な制約下の極値候補は上で尽くされるため

$$
\boxed{\max f=\sqrt3,\qquad\min f=-\sqrt3}.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra6a-c01"></a>
#### RA6A-C01 非線形方程式系の解の追跡
- Level: C

$\theta=(\theta_1,\theta_2)\in\mathbb R^2$ と $t\in\mathbb R$ に対し

$$
\Psi(\theta_1,\theta_2,t)
=
\begin{pmatrix}
\theta_1+e^{\theta_2}-1-t\\
\theta_1^2+\theta_2-t^2
\end{pmatrix}
$$

とする。

1. $t=0$ の近くで $\Psi(\theta_1,\theta_2,t)=0$ を満たす解が $(0,0)$ の近くにただ一つ存在し、$\theta=\theta(t)$ と $C^1$ 級に書けることを示せ。
2. $\theta'(0)$ を求めよ。
3. $t\to0$ における $\theta_1(t),\theta_2(t)$ の一次近似を書け。

<!-- solution-start -->
**解答**：まず

$$
\Psi(0,0,0)
=
\begin{pmatrix}
0+1-1-0\\
0+0-0
\end{pmatrix}
=
\begin{pmatrix}
0\\
0
\end{pmatrix}.
$$

未知量 $\theta$ に関するJacobianは

$$
D_\theta\Psi
=
\begin{pmatrix}
1&e^{\theta_2}\\
2\theta_1&1
\end{pmatrix}.
$$

従って基準点では

$$
D_\theta\Psi(0,0,0)
=
\begin{pmatrix}
1&1\\
0&1
\end{pmatrix},
\qquad
\det D_\theta\Psi(0,0,0)=1\ne0.
$$

$\Psi$ は $C^1$ 級なので陰関数定理を $(t,\theta)$ の組に適用できます。したがって $t=0$ の近くで $(0,0)$ に近い解はただ一つで

$$
\theta=\theta(t)
$$

という $C^1$ 級関数になります。

次に陰関数定理の感度公式

$$
\theta'(0)
=-[D_\theta\Psi(0,0,0)]^{-1}
D_t\Psi(0,0,0)
$$

を使います。

$$
D_t\Psi(\theta_1,\theta_2,t)
=
\begin{pmatrix}
-1\\
-2t
\end{pmatrix},
$$

従って

$$
D_t\Psi(0,0,0)
=
\begin{pmatrix}
-1\\
0
\end{pmatrix}.
$$

また

$$
[D_\theta\Psi(0,0,0)]^{-1}
=
\begin{pmatrix}
1&-1\\
0&1
\end{pmatrix}.
$$

よって

$$
\theta'(0)
=-
\begin{pmatrix}
1&-1\\
0&1
\end{pmatrix}
\begin{pmatrix}
-1\\
0
\end{pmatrix}
=
\begin{pmatrix}
1\\
0
\end{pmatrix}.
$$

したがって

$$
\boxed{\theta_1'(0)=1,\qquad\theta_2'(0)=0}.
$$

$\theta(0)=(0,0)$ なのでFréchet微分の一次近似から

$$
\theta(t)
=\theta(0)+\theta'(0)t+o(|t|)
=
\begin{pmatrix}
t\\
0
\end{pmatrix}
+o(|t|).
$$

成分ごとには

$$
\boxed{\theta_1(t)=t+o(|t|),\qquad
\theta_2(t)=o(|t|)}.
$$

ここでも非線形方程式系を陽に解く必要はありません。基準点で未知量側のJacobianが可逆であることが、解の局所一意性と一次感度の両方を与えています。
<!-- solution-end -->

---

## 11. 次に読むもの

この章で得た局所可逆性は、[RA7「多重Riemann積分・変数変換」](../RA7/index.md) の座標変換へ直結します。変数変換公式に現れる

$$
|\det D\Phi(x)|
$$

は局所体積倍率であると同時に、$\det D\Phi(x)\ne0$ の場所では座標変換 $\Phi$ が局所的に本当の座標として使えることを逆関数定理が保証しています。

一方、一般の定数階数定理・埋め込み・部分多様体の体系は微分幾何側の主題です。本章ではそこを先取りせず、標準実解析で必要な局所可逆性と陰関数の機構までを閉じました。
