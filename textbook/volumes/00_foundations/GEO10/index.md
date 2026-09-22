# GEO10 幾何学 X

[GEO3](../GEO3/index.md) では Euclid 空間内の正則レベル集合を埋め込み部分多様体として扱い、接空間を微分の核として計算できるようにしました。[VC2](../VC2/index.md) では正則曲線・弧長・単位接ベクトルを、[VC3](../VC3/index.md) ではパラメータ曲面・接平面・法線・曲面積を具体計算しました。[LA5](../LA5/index.md) では有限次元内積空間上の作用素を正規直交基底で対角化する考え方を整えました。

本章では、この四つを接続します。

曲線については、パラメータの進み方という任意性を除いたうえで、接方向がどれだけ変化し、空間内でどれだけねじれるかを測ります。余次元1の部分多様体については、接空間上の長さと角度、および長さ1の法線が点とともにどう変化するかを線形代数の言葉で記述します。

重要なのは公式集として覚えることではありません。

- 曲線では、パラメータの速さを1にそろえて接方向の変化を測る。
- 余次元1の部分多様体では、長さ1の法線の変化を接空間上の線形写像として読む。
- その線形写像を内積に適合する直交基底で対角化し、方向ごとの曲がりを取り出す。

という構造を追います。

---

## 1. 正則曲線と弧長

$I\subset\mathbb R$ を開区間とし、滑らかな写像

$$
\gamma:I\to\mathbb R^3
$$

を考えます。

[VC2 の正則曲線](../VC2/index.md#def-vc2-regular-curve)と[弧長・単位接ベクトル](../VC2/index.md#def-vc2-arclength)を既知とします。本章では曲率を微分するため、$C^1$ ではなく滑らかな正則曲線を扱います。

<a id="def-geo10-arc-length-parameter"></a>
<!-- formal-statement-start -->
> **定義（弧長パラメータ・単位速曲線）**  
> 滑らかな正則曲線
>
$$
\gamma:I\to\mathbb R^3,
\qquad
\gamma'(t)\ne0
$$
>
> と $t_0\in I$ に対して
>
$$
s(t)
:=
\int_{t_0}^{t}\|\gamma'(u)\|\,du
$$
>
> と置く。
>
> 曲線のパラメータ $u$ が
>
$$
\left\|\frac{d\gamma}{du}\right\|=1
$$
>
> を満たすとき、$u$ を **弧長パラメータ**といい、その表示を **単位速曲線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo10-arc-length-parameter -->
**定義の確認**

半径 $R>0$ の円

$$
\gamma(t)
=
(R\cos t,R\sin t,0)
$$

では

$$
\gamma'(t)
=
(-R\sin t,R\cos t,0),
$$

したがって

$$
\|\gamma'(t)\|=R>0.
$$

よって正則曲線です。$t_0=0$ とすれば

$$
s(t)=Rt
$$

なので、$s=Rt$ と置き直すと

$$
\widetilde\gamma(s)
=
\left(
R\cos\frac{s}{R},
R\sin\frac{s}{R},
0
\right)
$$

となり、

$$
\left\|\widetilde\gamma'(s)\right\|=1
$$

です。
<!-- definition-example-end -->

弧長パラメータは、曲線をたどる「速さ」の任意性を消します。曲率を幾何量として定義するには、まずこの任意性を取り除く必要があります。

<a id="thm-geo10-arc-length-reparam"></a>
<!-- formal-statement-start -->
> **定理（弧長パラメータへの再表示）**  
> $\gamma:I\to\mathbb R^3$ を正則曲線とし、$t_0\in I$ を固定する。
>
$$
s(t)=\int_{t_0}^{t}\|\gamma'(u)\|\,du
$$
>
> と置くと
>
$$
s'(t)=\|\gamma'(t)\|>0.
$$
>
> 従って各 $t\in I$ の近傍で $s$ は滑らかな逆関数 $t=t(s)$ を持ち、
>
$$
\widetilde\gamma(s):=\gamma(t(s))
$$
>
> は単位速曲線である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[微積分学の基本定理I](../RA4/index.md#thm-ra4-ftc1) を弧長関数へ適用すると

$$
s'(t)=\|\gamma'(t)\|.
$$

正則性より

$$
\|\gamma'(t)\|>0
$$

なので $s'(t)\ne0$ です。従って [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function) により、各点の近傍で $s$ は滑らかな逆関数 $t=t(s)$ を持ちます。

合成関数を微分すると

$$
\frac{d\widetilde\gamma}{ds}
=
\gamma'(t(s))
\frac{dt}{ds}.
$$

一方、

$$
\frac{ds}{dt}
=
\|\gamma'(t)\|
$$

なので

$$
\frac{dt}{ds}
=
\frac{1}{\|\gamma'(t)\|}.
$$

従って

$$
\left\|
\frac{d\widetilde\gamma}{ds}
\right\|
=
\frac{\|\gamma'(t)\|}{\|\gamma'(t)\|}
=
1.
$$

よって $\widetilde\gamma$ は単位速です。$\square$
<!-- proof-end -->

正則性が必要なのは、まさに $s'(t)>0$ を保証して逆関数を作るためです。速度が0になる点では、弧長を新しい局所座標として使えません。

---

## 2. 曲線の曲がり方とねじれ

以下、まず単位速曲線

$$
\gamma=\gamma(s)
$$

を考えます。

<a id="def-geo10-frenet"></a>
<!-- formal-statement-start -->
> **定義（曲率・Frenet 標構・捩率）**  
> 単位速曲線 $\gamma$ に対し
>
$$
T:=\gamma'
$$
>
> を単位接ベクトルとする。
>
> 曲率を
>
$$
\kappa:=\|T'\|
$$
>
> と定める。
>
> $\kappa>0$ の区間では
>
$$
N:=\frac{T'}{\kappa},
\qquad
B:=T\times N
$$
>
> と置き、$(T,N,B)$ を **Frenet 標構**という。
>
> さらに捩率を
>
$$
\tau:=-B'\cdot N
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo10-frenet -->
**定義の確認**

**例：円**

半径 $R$ の円を弧長表示

$$
\gamma(s)
=
\left(
R\cos\frac{s}{R},
R\sin\frac{s}{R},
0
\right)
$$

で書くと

$$
T(s)
=
\left(
-\sin\frac{s}{R},
\cos\frac{s}{R},
0
\right),
$$

$$
T'(s)
=
-\frac1R
\left(
\cos\frac{s}{R},
\sin\frac{s}{R},
0
\right).
$$

従って

$$
\kappa=\frac1R.
$$

主法線を

$$
N(s)
=
-
\left(
\cos\frac{s}{R},
\sin\frac{s}{R},
0
\right)
$$

と取れば

$$
B=T\times N=(0,0,1)
$$

は一定です。従って

$$
\tau=-B'\cdot N=0.
$$

円は曲がっていますが、平面から外へねじれてはいません。
<!-- definition-example-end -->

単位速条件から

$$
T\cdot T=1.
$$

微分すると

$$
2T'\cdot T=0,
$$

したがって

$$
T'\perp T.
$$

これが主法線 $N$ を定義できる理由です。

<a id="thm-geo10-frenet-serret"></a>
<!-- formal-statement-start -->
> **定理（Frenet--Serret 公式）**  
> $\gamma$ を単位速曲線とし、考える区間で $\kappa>0$ とする。
>
> Frenet 標構 $(T,N,B)$ と捩率 $\tau$ に対して
>
$$
T'=\kappa N,
$$
>
$$
N'=-\kappa T+\tau B,
$$
>
$$
B'=-\tau N
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$(T,N,B)$ は各点で正規直交基底です。したがって各微分 $T',N',B'$ をこの基底で展開し、内積を微分して係数を決めればよいことが分かります。

<!-- proof-start -->
### 証明

定義から直ちに

$$
T'=\kappa N.
$$

次に

$$
N\cdot N=1
$$

を微分すると

$$
N'\cdot N=0.
$$

したがって $N'$ は $T$ と $B$ の線形結合です。

また

$$
T\cdot N=0
$$

を微分すると

$$
T'\cdot N+T\cdot N'=0.
$$

$T'=\kappa N$ を使えば

$$
\kappa+T\cdot N'=0,
$$

従って $T$ 成分は $-\kappa$ です。

そこで

$$
N'=-\kappa T+aB
$$

と書きます。

一方

$$
B=T\times N
$$

なので

$$
B'
=
T'\times N+T\times N'.
$$

$T'=\kappa N$ だから第1項は0です。また

$$
T\times N'
=
T\times(-\kappa T+aB)
=
a(T\times B).
$$

正向き正規直交基底 $(T,N,B)$ では

$$
T\times B=-N.
$$

従って

$$
B'=-aN.
$$

捩率の定義

$$
\tau=-B'\cdot N
$$

から

$$
\tau=a.
$$

よって

$$
N'=-\kappa T+\tau B,
$$

$$
B'=-\tau N.
$$

$\square$
<!-- proof-end -->

この三式は、曲線に沿って Frenet 標構がどのように回転するかを完全に記述しています。

### 一般パラメータでの計算公式

正則曲線 $\gamma(t)$ で

$$
\gamma'(t)\times\gamma''(t)\ne0
$$

とします。弧長へ直して定義を代入すると

$$
\boxed{
\kappa
=
\frac{\|\gamma'\times\gamma''\|}{\|\gamma'\|^3}
}
$$

を得ます。

さらに三階微分まで存在し、分母が0でなければ

$$
\boxed{
\tau
=
\frac{
\det(\gamma',\gamma'',\gamma''')
}{
\|\gamma'\times\gamma''\|^2
}
}
$$

です。

この二式は計算には便利ですが、意味の正本は「単位接ベクトルの変化率」と「Frenet 標構の回転」です。

### らせん

$$
\gamma(t)
=
(a\cos t,a\sin t,bt),
\qquad
a>0
$$

とします。

$$
\gamma'
=
(-a\sin t,a\cos t,b),
$$

$$
\gamma''
=
(-a\cos t,-a\sin t,0),
$$

$$
\gamma'''
=
(a\sin t,-a\cos t,0).
$$

速度は

$$
\|\gamma'\|
=
\sqrt{a^2+b^2}.
$$

また

$$
\|\gamma'\times\gamma''\|
=
a\sqrt{a^2+b^2},
$$

従って

$$
\kappa
=
\frac{a}{a^2+b^2}.
$$

さらに

$$
\det(\gamma',\gamma'',\gamma''')
=
a^2b,
$$

$$
\|\gamma'\times\gamma''\|^2
=
a^2(a^2+b^2)
$$

なので

$$
\tau
=
\frac{b}{a^2+b^2}.
$$

$b=0$ なら円に戻り、捩率も0になります。

---

## 3. 余次元1の部分多様体と法線

ここから曲線ではなく、$\mathbb R^{n+1}$ 内の余次元1の埋め込み部分多様体を扱います。

<a id="def-geo10-hypersurface-normal"></a>
<!-- formal-statement-start -->
> **定義（超曲面と単位法線場）**  
> $M\subset\mathbb R^{n+1}$ が $n$ 次元の埋め込み部分多様体であるとき、$M$ を **超曲面**という。
>
> 開集合 $U\subset M$ 上の滑らかな写像
>
$$
N:U\to S^n
$$
>
> が各 $p\in U$ で
>
$$
N(p)\perp T_pM
$$
>
> を満たすとき、$N$ を $U$ 上の **単位法線場**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo10-hypersurface-normal -->
**定義の確認**

**例：球面**

$$
S_R^n
=
\{x\in\mathbb R^{n+1}:\|x\|=R\}
$$

を考えます。

$$
F(x)=\|x\|^2
$$

と置けば

$$
S_R^n=F^{-1}(R^2).
$$

$R>0$ なので球面上では

$$
dF_x(v)=2x\cdot v
$$

が零写像ではなく、$R^2$ は正則値です。[GEO3 の正則値定理](../GEO3/index.md#thm-geo3-regular-value)から $S_R^n$ は $n$ 次元埋め込み部分多様体です。

接空間は

$$
T_xS_R^n
=
\{v\in\mathbb R^{n+1}:x\cdot v=0\}.
$$

従って

$$
N(x)=\frac{x}{R}
$$

は長さ1で接空間に直交し、滑らかな単位法線場です。
<!-- definition-example-end -->

ここで定義した長さ1の法線の滑らかな選択は、一般には大域的に存在するとは限りません。以下の曲がりの量は、このような選択ができる局所領域上で構成します。

---

## 4. 接空間上の長さと角度

<a id="def-geo10-first-fundamental-form"></a>
<!-- formal-statement-start -->
> **定義（第一基本形式）**  
> 超曲面 $M\subset\mathbb R^{n+1}$ と $p\in M$ に対して、
>
$$
I_p(v,w)
:=
v\cdot w
\qquad
(v,w\in T_pM)
$$
>
> と定める。
>
> これを $M$ の **第一基本形式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo10-first-fundamental-form -->
**定義の確認**

平面

$$
M=\{(x,y,0):x,y\in\mathbb R\}
$$

の点 $p$ では

$$
T_pM
=
\operatorname{span}\{e_1,e_2\},
$$

ただし

$$
e_1=(1,0,0),
\qquad
e_2=(0,1,0)
$$

です。第一基本形式の定義から

$$
I_p(e_1,e_1)=1,
\qquad
I_p(e_1,e_2)=0,
\qquad
I_p(e_2,e_2)=1.
$$

従って基底 $(e_1,e_2)$ に関する行列は

$$
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}.
$$

周囲の Euclid 内積を接平面へ制限したものになっていることを直接確認できました。
<!-- definition-example-end -->

周囲の Euclid 内積を接空間へ制限しただけなので、第一基本形式は正定値内積です。

局所パラメータ表示

$$
X=X(u^1,\dots,u^n)
$$

を取り、

$$
X_i:=\frac{\partial X}{\partial u^i}
$$

と書きます。すると

$$
g_{ij}
=
I(X_i,X_j)
=
X_i\cdot X_j.
$$

行列

$$
G=(g_{ij})
$$

は正定値です。これが第一基本形式の座標行列です。

### 例：円柱

$$
X(u,z)
=
(R\cos u,R\sin u,z)
$$

とすると

$$
X_u
=
(-R\sin u,R\cos u,0),
$$

$$
X_z=(0,0,1).
$$

従って

$$
G
=
\begin{pmatrix}
R^2&0\\
0&1
\end{pmatrix}.
$$

円柱の接方向では、周方向の座標 $u$ を1だけ動かす長さは $R$、軸方向 $z$ を1だけ動かす長さは1です。

---

## 5. 法線の微分が測る曲がり

前節までに選んだ長さ1の法線

$$
N:U\to S^n
$$

は、それ自体が単位球面への滑らかな写像です。その微分が接方向に沿う法線の変化を記録します。

<a id="def-geo10-shape-operator"></a>
<!-- formal-statement-start -->
> **定義（Gauss 写像・形作用素・第二基本形式）**  
> $U\subset M$ 上に単位法線場
>
$$
N:U\to S^n
$$
>
> を選ぶ。
>
> この $N$ を **Gauss 写像**という。
>
> $p\in U$ で
>
$$
S_p:T_pM\to T_pM,
\qquad
S_p(v):=-dN_p(v)
$$
>
> と定め、$S_p$ を **形作用素**という。
>
> さらに
>
$$
II_p(v,w)
:=
I_p(S_pv,w)
=
S_pv\cdot w
$$
>
> を **第二基本形式**という。
<!-- formal-statement-end -->

本章では上の定義どおり $S=-dN$ を採用します。文献によっては $S=dN$ を採用するため、法線の向きと合わせて符号規約を確認する必要があります。本章以降は $S=-dN$ に統一します。

定義には一つ確認が必要です。$dN_p(v)$ はもともと $\mathbb R^{n+1}$ のベクトルですが、本当に $T_pM$ に入るのでしょうか。

<a id="prop-geo10-shape-tangent"></a>
<!-- formal-statement-start -->
> **命題（形作用素は接空間に値を取る）**  
> 単位法線場 $N$ に対し
>
$$
dN_p(v)\in T_pM
$$
>
> が全ての $p\in U$ と $v\in T_pM$ で成り立つ。
>
> 従って
>
$$
S_p=-dN_p
$$
>
> は $T_pM$ 上の線形自己写像として定義される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

単位法線場なので

$$
N\cdot N=1
$$

です。$v\in T_pM$ の方向へ微分すると

$$
2\,dN_p(v)\cdot N(p)=0.
$$

従って

$$
dN_p(v)\perp N(p).
$$

超曲面では法線空間が $N(p)$ の張る1次元空間なので、

$$
N(p)^\perp=T_pM.
$$

従って

$$
dN_p(v)\in T_pM.
$$

$\square$
<!-- proof-end -->

<!-- definition-example-start: def-geo10-shape-operator -->
**定義の確認**

**例：球面**

球面 $S_R^n$ で外向き単位法線

$$
N(x)=\frac{x}{R}
$$

を取ります。

$v\in T_xS_R^n$ に対して

$$
dN_x(v)=\frac1R v.
$$

従って

$$
S_x(v)
=
-\frac1R v.
$$

つまり

$$
S_x
=
-\frac1R I.
$$

よって

$$
II_x(v,w)
=
-\frac1R\,v\cdot w.
$$

球面では全方向が同じ割合で曲がります。
<!-- definition-example-end -->

---

## 6. 第二基本形式が対称になる理由

第二基本形式は定義だけ見ると

$$
II(v,w)=S(v)\cdot w
$$

なので、対称性はまだ明らかではありません。しかし局所パラメータ表示を使うと、混合偏微分の交換が対称性を生みます。

<a id="thm-geo10-shape-self-adjoint"></a>
<!-- formal-statement-start -->
> **定理（形作用素の自己共役性）**  
> 超曲面 $M\subset\mathbb R^{n+1}$ 上で単位法線場 $N$ を選ぶ。
>
> 各 $p\in M$ で形作用素
>
$$
S_p:T_pM\to T_pM
$$
>
> は第一基本形式に関して自己共役である。
>
> すなわち
>
$$
I_p(S_pv,w)
=
I_p(v,S_pw)
$$
>
> が全ての $v,w\in T_pM$ で成り立つ。
>
> 同値に、第二基本形式は対称である。
<!-- formal-statement-end -->

### 証明の見取り図

局所パラメータ表示 $X(u^1,\dots,u^n)$ を取り、座標接ベクトル $X_i$ について

$$
N\cdot X_j=0
$$

を $u^i$ で微分します。すると $dN$ と $X_{ij}$ が結ばれ、$X_{ij}=X_{ji}$ が対称性を与えます。

<!-- proof-start -->
### 証明

局所パラメータ表示 $X$ を取り、

$$
X_i=\frac{\partial X}{\partial u^i},
\qquad
N_i=\frac{\partial N}{\partial u^i}
$$

と書きます。

法線と接ベクトルは直交するので

$$
N\cdot X_j=0.
$$

$u^i$ で微分すると

$$
N_i\cdot X_j
+
N\cdot X_{ij}
=
0.
$$

形作用素の定義から

$$
S(X_i)=-N_i
$$

なので

$$
II(X_i,X_j)
=
S(X_i)\cdot X_j
=
-N_i\cdot X_j.
$$

上の微分式より

$$
II(X_i,X_j)
=
N\cdot X_{ij}.
$$

滑らかさから混合偏微分は交換でき、

$$
X_{ij}=X_{ji}.
$$

従って

$$
II(X_i,X_j)
=
N\cdot X_{ij}
=
N\cdot X_{ji}
=
II(X_j,X_i).
$$

座標接ベクトル $X_1,\dots,X_n$ は接空間を張るので、双線形性から任意の $v,w\in T_pM$ で

$$
II(v,w)=II(w,v).
$$

すなわち

$$
I(Sv,w)=I(v,Sw).
$$

$\square$
<!-- proof-end -->

上の途中式で重要なのは

$$
\boxed{
II(X_i,X_j)
=
N\cdot X_{ij}
}
$$

です。第二基本形式は「位置ベクトルの二階微分の法線成分」を記録しています。

---

## 7. 局所座標での計算法

<a id="prop-geo10-coordinate-forms"></a>
<!-- formal-statement-start -->
> **命題（基本形式と形作用素の座標表示）**  
> 局所パラメータ表示 $X(u^1,\dots,u^n)$ に対し
>
$$
g_{ij}=X_i\cdot X_j,
$$
>
$$
b_{ij}=N\cdot X_{ij}
$$
>
> と置き、
>
$$
G=(g_{ij}),
\qquad
B=(b_{ij})
$$
>
> とする。
>
> 座標基底 $(X_1,\dots,X_n)$ に関する形作用素の行列を $A$ とすると
>
$$
\boxed{
A=G^{-1}B
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

形作用素を

$$
S(X_j)
=
\sum_{k=1}^n A^k{}_j X_k
$$

と書きます。

両辺と $X_i$ の内積を取ると

$$
II(X_j,X_i)
=
\sum_k A^k{}_j\,g_{ki}.
$$

一方、前節から

$$
II(X_j,X_i)=b_{ji}=b_{ij}.
$$

行列で書けば

$$
B=GA.
$$

$G$ は第一基本形式の行列で正定値、従って可逆です。よって

$$
A=G^{-1}B.
$$

$\square$
<!-- proof-end -->

注意すべき点は、$B$ が対称でも $G^{-1}B$ が通常の転置に関して対称とは限らないことです。形作用素が自己共役なのは Euclid 座標の標準内積ではなく、接空間の第一基本形式 $G$ に関してです。

### グラフ曲面

$$
X(x,y)
=
(x,y,f(x,y))
$$

とします。

$$
X_x=(1,0,f_x),
\qquad
X_y=(0,1,f_y).
$$

従って

$$
G
=
\begin{pmatrix}
1+f_x^2&f_xf_y\\
f_xf_y&1+f_y^2
\end{pmatrix}.
$$

上向き単位法線は

$$
N
=
\frac{(-f_x,-f_y,1)}
{\sqrt{1+f_x^2+f_y^2}}.
$$

$$
W:=\sqrt{1+f_x^2+f_y^2}
$$

と書けば

$$
B
=
\frac1W
\begin{pmatrix}
f_{xx}&f_{xy}\\
f_{xy}&f_{yy}
\end{pmatrix}.
$$

従って

$$
A=G^{-1}B
$$

から形作用素の固有値を求められます。

特に

$$
\nabla f(p)=0
$$

となる点では

$$
G(p)=I,
$$

したがって

$$
A(p)
=
\operatorname{Hess}f(p).
$$

グラフが接平面から二次の項でどちら向きへ離れるかが、その点における形作用素の固有値へ直接現れます。

---

## 8. 形作用素の固有値が表す曲がり

<a id="def-geo10-principal-curvature"></a>
<!-- formal-statement-start -->
> **定義（主曲率・Gauss 曲率・平均曲率）**  
> 超曲面 $M^n\subset\mathbb R^{n+1}$ の点 $p$ で形作用素
>
$$
S_p:T_pM\to T_pM
$$
>
> の固有値
>
$$
\kappa_1,\dots,\kappa_n
$$
>
> を **主曲率**という。
>
> 対応する固有ベクトルの方向を **主方向**という。
>
> $n=2$ の曲面では
>
$$
K:=\kappa_1\kappa_2=\det S_p
$$
>
> を **Gauss 曲率**という。
>
> 一般の $n$ 次元超曲面で
>
$$
H
:=
\frac1n
\sum_{i=1}^n\kappa_i
=
\frac1n\operatorname{tr}S_p
$$
>
> を **平均曲率**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo10-principal-curvature -->
**定義の確認**

半径 $R$ の球面で外向き単位法線を取ると、前節で

$$
S=-\frac1R I
$$

を得ました。従って任意の非零接ベクトル $v$ に対して

$$
S(v)
=
-\frac1R v,
$$

なので全ての接方向が固有方向で、二つの主曲率は

$$
\kappa_1=\kappa_2=-\frac1R.
$$

したがって定義から

$$
K
=
\kappa_1\kappa_2
=
\frac1{R^2},
$$

$$
H
=
\frac{\kappa_1+\kappa_2}{2}
=
-\frac1R.
$$

主曲率、Gauss 曲率、平均曲率が形作用素の固有値から得られることを直接確認できます。
<!-- definition-example-end -->

法線を $N$ から $-N$ へ反転すると

$$
S\mapsto -S.
$$

従って各主曲率と平均曲率の符号は反転します。

二次元曲面では

$$
K=\kappa_1\kappa_2
$$

なので二つとも符号反転し、

$$
K\mapsto K.
$$

従って Gauss 曲率は法線の向きに依存しません。

<a id="thm-geo10-principal-directions"></a>
<!-- formal-statement-start -->
> **定理（主方向の正規直交基底）**  
> 各点 $p$ で形作用素 $S_p$ は第一基本形式に関して自己共役である。
>
> 従って $T_pM$ には、主方向からなる正規直交基底
>
$$
e_1,\dots,e_n
$$
>
> が存在し、
>
$$
S_pe_i=\kappa_i e_i
$$
>
> とできる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[形作用素の自己共役性](#thm-geo10-shape-self-adjoint)から、第一基本形式を内積とする有限次元実内積空間 $T_pM$ 上で $S_p$ は自己共役です。

第一基本形式に関する正規直交基底を一つ選び、この基底で $S_p$ を実行列 $A$ で表します。自己共役性から

$$
A^{\mathsf T}=A.
$$

この実行列を複素行列とみなすと

$$
A^*=A,
$$

したがって $A$ は Hermitian、特に normal です。[LA5 の normal 作用素に対する正規直交対角化結果](../LA5/index.md#thm-la5-normal-spectral)により、$\mathbb C^n$ は $A$ の固有空間の直交直和になります。また [Hermitian 作用素の固有値は実数](../LA5/index.md#thm-la5-hermitian-real-eigenvalues) です。

固有値を $\lambda\in\mathbb R$ とします。複素固有ベクトル

$$
z=x+iy
\qquad
(x,y\in\mathbb R^n)
$$

が

$$
Az=\lambda z
$$

を満たすなら、$A$ と $\lambda$ が実なので実部・虚部を比較して

$$
Ax=\lambda x,
\qquad
Ay=\lambda y.
$$

従って複素固有空間は、対応する実固有空間を複素化したものです。よって各固有値について実固有ベクトルから基底を選べます。

異なる固有値に属する実固有ベクトル $u,v$ については

$$
\lambda\,u\cdot v
=
Au\cdot v
=
u\cdot Av
=
\mu\,u\cdot v.
$$

$\lambda\ne\mu$ なら $u\cdot v=0$ です。同じ固有空間の内部では Gram--Schmidt 直交化を行えます。以上から、$T_pM$ 全体に主方向からなる実正規直交基底

$$
e_1,\dots,e_n
$$

を取れます。

対応する固有値を

$$
\kappa_1,\dots,\kappa_n
$$

と書けば

$$
S_pe_i=\kappa_i e_i
$$

です。$\square$
<!-- proof-end -->

---

## 9. 曲面内の方向ごとの曲がり

曲面上の曲線を一本選ぶと、その空間曲線としての曲がりのうち、曲面法線方向の成分だけを取り出せます。

<a id="def-geo10-normal-curvature"></a>
<!-- formal-statement-start -->
> **定義（正規曲率）**  
> $M\subset\mathbb R^3$ を曲面、$N$ を単位法線場とする。
>
> $p\in M$ を通る単位速曲線
>
$$
c:(-\varepsilon,\varepsilon)\to M,
\qquad
c(0)=p
$$
>
> に対して
>
$$
v:=c'(0)
$$
>
> と置く。
>
> この曲線の $p$ における **正規曲率**を
>
$$
\kappa_n(v)
:=
c''(0)\cdot N(p)
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo10-normal-curvature -->
**定義の確認**

半径 $R$ の円柱上で、外向き単位法線

$$
N(x,y,z)
=
\frac1R(x,y,0)
$$

を取ります。点

$$
p=(R,0,0)
$$

を通る周方向の単位速曲線

$$
c(s)
=
\left(
R\cos\frac{s}{R},
R\sin\frac{s}{R},
0
\right)
$$

を考えます。

$$
c'(s)
=
\left(
-\sin\frac{s}{R},
\cos\frac{s}{R},
0
\right)
$$

なので

$$
\|c'(s)\|=1.
$$

また

$$
c''(0)
=
\left(
-\frac1R,
0,
0
\right),
\qquad
N(p)=(1,0,0).
$$

従って正規曲率の定義から

$$
\kappa_n(c'(0))
=
c''(0)\cdot N(p)
=
-\frac1R.
$$

周方向の曲線について、円柱の外向き法線規約に対応する正規曲率が $-1/R$ になることを直接確認できます。
<!-- definition-example-end -->

曲線の選び方に依存しそうに見えますが、実際には初速度 $v$ だけで決まります。

<a id="prop-geo10-euler-normal-curvature"></a>
<!-- formal-statement-start -->
> **命題（正規曲率と Euler の公式）**  
> 上の設定で
>
$$
\kappa_n(v)
=
II_p(v,v)
$$
>
> が成り立つ。
>
> 特に主方向の正規直交基底 $e_1,e_2$ に対して
>
$$
v
=
\cos\theta\,e_1+\sin\theta\,e_2
$$
>
> なら
>
$$
\boxed{
\kappa_n(v)
=
\kappa_1\cos^2\theta
+
\kappa_2\sin^2\theta
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

曲線は曲面上にあるので

$$
c'(s)\cdot N(c(s))=0.
$$

$s$ で微分し、$s=0$ を代入すると

$$
c''(0)\cdot N(p)
+
c'(0)\cdot dN_p(c'(0))
=
0.
$$

$v=c'(0)$ と形作用素

$$
S=-dN
$$

を使えば

$$
c''(0)\cdot N(p)
=
v\cdot S(v)
=
II_p(v,v).
$$

これで正規曲率が初速度だけで決まることも分かります。

次に

$$
v
=
\cos\theta\,e_1+\sin\theta\,e_2
$$

とします。

$$
S(e_1)=\kappa_1e_1,
\qquad
S(e_2)=\kappa_2e_2
$$

なので

$$
S(v)
=
\kappa_1\cos\theta\,e_1
+
\kappa_2\sin\theta\,e_2.
$$

$e_1,e_2$ は正規直交だから

$$
II(v,v)
=
v\cdot S(v)
=
\kappa_1\cos^2\theta
+
\kappa_2\sin^2\theta.
$$

$\square$
<!-- proof-end -->

この式から、主曲率は正規曲率の極値を与える方向としても解釈できます。

---

## 10. 平面・球面・円柱・トーラス

### 10.1 平面

$$
M=\{(x,y,0)\}
$$

で

$$
N=(0,0,1)
$$

を取ると $N$ は一定です。従って

$$
dN=0,
\qquad
S=0.
$$

よって

$$
\kappa_1=\kappa_2=0,
\qquad
K=0,
\qquad
H=0.
$$

平面は全方向で法線が変化しません。

### 10.2 球面

半径 $R$ の球面で外向き法線

$$
N(x)=\frac{x}{R}
$$

を取ると

$$
S=-\frac1R I.
$$

従って

$$
\kappa_1=\kappa_2=-\frac1R,
$$

$$
K=\frac1{R^2},
$$

$$
H=-\frac1R.
$$

法線を内向きにすれば主曲率と平均曲率は正になりますが、Gauss 曲率は変わりません。

### 10.3 円柱

$$
X(u,z)
=
(R\cos u,R\sin u,z)
$$

とし、外向き法線

$$
N(u,z)
=
(\cos u,\sin u,0)
$$

を取ります。

$$
N_u
=
(-\sin u,\cos u,0)
=
\frac1R X_u,
$$

$$
N_z=0.
$$

従って

$$
S(X_u)
=
-\frac1R X_u,
$$

$$
S(X_z)=0.
$$

主曲率は

$$
\kappa_1=-\frac1R,
\qquad
\kappa_2=0.
$$

従って

$$
K=0,
\qquad
H=-\frac1{2R}.
$$

円柱は周方向には曲がりますが、軸方向にはまっすぐです。

### 10.4 トーラス

$R>r>0$ とし、

$$
X(u,v)
=
\bigl(
(R+r\cos v)\cos u,
(R+r\cos v)\sin u,
r\sin v
\bigr)
$$

とします。

外側を向く単位法線として

$$
N(u,v)
=
(\cos v\cos u,\cos v\sin u,\sin v)
$$

を取れます。

接ベクトルは

$$
X_u
=
\bigl(
-(R+r\cos v)\sin u,
(R+r\cos v)\cos u,
0
\bigr),
$$

$$
X_v
=
\bigl(
-r\sin v\cos u,
-r\sin v\sin u,
r\cos v
\bigr).
$$

従って

$$
G
=
\begin{pmatrix}
(R+r\cos v)^2&0\\
0&r^2
\end{pmatrix}.
$$

また

$$
N_u
=
\frac{\cos v}{R+r\cos v}X_u,
$$

$$
N_v
=
\frac1r X_v.
$$

従って

$$
S(X_u)
=
-\frac{\cos v}{R+r\cos v}X_u,
$$

$$
S(X_v)
=
-\frac1r X_v.
$$

よって主曲率は

$$
\kappa_1
=
-\frac{\cos v}{R+r\cos v},
$$

$$
\kappa_2
=
-\frac1r.
$$

Gauss 曲率は

$$
\boxed{
K
=
\frac{\cos v}{r(R+r\cos v)}
}
$$

です。

外側のふくらみでは $\cos v>0$ なので $K>0$、内側のくびれでは $\cos v<0$ なので $K<0$ です。トーラス一つの中に楕円的な点と双曲的な点が共存します。

平均曲率は

$$
H
=
-\frac12
\left(
\frac{\cos v}{R+r\cos v}
+
\frac1r
\right).
$$

---

## 11. 何が内在的で、何が外在的か

第一基本形式は、曲面上で長さ・角度・面積を測るデータです。

一方、第二基本形式と形作用素は、曲面が周囲の Euclid 空間内でどのように曲がっているかを法線の変化として測ります。

本章の段階では Gauss 曲率を

$$
K=\det S
$$

によって、周囲の Euclid 空間内での法線変化から定めました。

しかし次章 GEO11 では、Gauss 方程式を通じて二次元曲面の $K$ が第一基本形式だけから決まることが現れます。これは Gauss の Theorema Egregium へつながる核心です。

---

## 12. 演習

### Level A

<a id="ex-geo10-a01"></a>
#### GEO10-A01 弧長パラメータ
- Level: A

$$
\gamma(t)=(3\cos t,3\sin t,4t)
$$

について、$t=0$ からの弧長 $s(t)$ を求め、$s$ を用いて曲線を再表示せよ。

<!-- solution-start -->
**解答**

まず

$$
\gamma'(t)
=
(-3\sin t,3\cos t,4).
$$

従って

$$
\|\gamma'(t)\|
=
\sqrt{
9\sin^2t+9\cos^2t+16
}
=
5.
$$

よって

$$
s(t)
=
\int_0^t5\,du
=
5t.
$$

したがって

$$
t=\frac{s}{5}.
$$

弧長表示は

$$
\widetilde\gamma(s)
=
\left(
3\cos\frac{s}{5},
3\sin\frac{s}{5},
\frac{4s}{5}
\right).
$$

微分すると

$$
\widetilde\gamma'(s)
=
\left(
-\frac35\sin\frac{s}{5},
\frac35\cos\frac{s}{5},
\frac45
\right),
$$

従って

$$
\|\widetilde\gamma'(s)\|^2
=
\frac9{25}
\left(
\sin^2\frac{s}{5}
+
\cos^2\frac{s}{5}
\right)
+
\frac{16}{25}
=
1.
$$

よって確かに単位速です。
<!-- solution-end -->

<a id="ex-geo10-a02"></a>
#### GEO10-A02 円柱らせんの曲率・捩率
- Level: A

$$
\gamma(t)=(3\cos t,3\sin t,4t)
$$

の曲率 $\kappa$ と捩率 $\tau$ を求めよ。

<!-- solution-start -->
**解答**

$$
\gamma'
=
(-3\sin t,3\cos t,4),
$$

$$
\gamma''
=
(-3\cos t,-3\sin t,0),
$$

$$
\gamma'''
=
(3\sin t,-3\cos t,0).
$$

まず

$$
\|\gamma'\|=5.
$$

ベクトル積は

$$
\gamma'\times\gamma''
=
(12\sin t,-12\cos t,9),
$$

したがって

$$
\|\gamma'\times\gamma''\|
=
\sqrt{144+81}
=
15.
$$

よって

$$
\kappa
=
\frac{15}{5^3}
=
\frac3{25}.
$$

また

$$
\det(\gamma',\gamma'',\gamma''')
=
36.
$$

従って

$$
\tau
=
\frac{36}{15^2}
=
\frac4{25}.
$$

一般式

$$
\kappa=\frac{a}{a^2+b^2},
\qquad
\tau=\frac{b}{a^2+b^2}
$$

に $a=3,b=4$ を入れた結果とも一致します。
<!-- solution-end -->

<a id="ex-geo10-a03"></a>
#### GEO10-A03 球面の基本形式と形作用素
- Level: A

半径 $R$ の球面 $S_R^2$ に外向き単位法線

$$
N(x)=\frac{x}{R}
$$

を取る。形作用素、第二基本形式、Gauss 曲率、平均曲率を求めよ。

<!-- solution-start -->
**解答**

$v\in T_xS_R^2$ に対して

$$
dN_x(v)=\frac1R v.
$$

本章の符号規約は

$$
S=-dN
$$

なので

$$
S_x(v)
=
-\frac1R v.
$$

従って

$$
S_x
=
-\frac1R I.
$$

第二基本形式は

$$
II_x(v,w)
=
S_x(v)\cdot w
=
-\frac1R\,v\cdot w
=
-\frac1R I_x(v,w).
$$

二つの主曲率は

$$
\kappa_1=\kappa_2=-\frac1R.
$$

従って

$$
K
=
\kappa_1\kappa_2
=
\frac1{R^2},
$$

$$
H
=
\frac{\kappa_1+\kappa_2}{2}
=
-\frac1R.
$$
<!-- solution-end -->

<a id="ex-geo10-a04"></a>
#### GEO10-A04 円柱の主曲率
- Level: A

円柱

$$
X(u,z)
=
(R\cos u,R\sin u,z)
$$

に外向き単位法線

$$
N=(\cos u,\sin u,0)
$$

を取る。$X_u,X_z$ が主方向であることを示し、主曲率を求めよ。

<!-- solution-start -->
**解答**

$$
X_u
=
(-R\sin u,R\cos u,0),
$$

$$
X_z=(0,0,1).
$$

一方

$$
N_u
=
(-\sin u,\cos u,0)
=
\frac1R X_u,
$$

$$
N_z=0.
$$

従って

$$
S(X_u)
=
-dN(X_u)
=
-N_u
=
-\frac1R X_u.
$$

また

$$
S(X_z)
=
-N_z
=
0.
$$

よって $X_u,X_z$ はそれぞれ形作用素の固有ベクトルで、主曲率は

$$
\kappa_1=-\frac1R,
\qquad
\kappa_2=0.
$$

従って

$$
K=0.
$$
<!-- solution-end -->

### Level B

<a id="ex-geo10-b01"></a>
#### GEO10-B01 グラフ曲面の基本形式
- Level: B

$$
X(x,y)
=
(x,y,f(x,y))
$$

について、上向き単位法線を用いて第一基本形式と第二基本形式の行列を導出せよ。

<!-- solution-start -->
**解答**

接ベクトルは

$$
X_x=(1,0,f_x),
$$

$$
X_y=(0,1,f_y).
$$

したがって

$$
g_{11}
=
X_x\cdot X_x
=
1+f_x^2,
$$

$$
g_{12}
=
X_x\cdot X_y
=
f_xf_y,
$$

$$
g_{22}
=
X_y\cdot X_y
=
1+f_y^2.
$$

よって

$$
G
=
\begin{pmatrix}
1+f_x^2&f_xf_y\\
f_xf_y&1+f_y^2
\end{pmatrix}.
$$

法線ベクトル

$$
X_x\times X_y
=
(-f_x,-f_y,1)
$$

の長さは

$$
W
=
\sqrt{1+f_x^2+f_y^2}.
$$

従って上向き単位法線は

$$
N
=
\frac{(-f_x,-f_y,1)}{W}.
$$

二階微分は

$$
X_{xx}=(0,0,f_{xx}),
$$

$$
X_{xy}=(0,0,f_{xy}),
$$

$$
X_{yy}=(0,0,f_{yy}).
$$

前節の公式

$$
b_{ij}=N\cdot X_{ij}
$$

から

$$
b_{11}=\frac{f_{xx}}W,
\qquad
b_{12}=\frac{f_{xy}}W,
\qquad
b_{22}=\frac{f_{yy}}W.
$$

従って

$$
B
=
\frac1W
\begin{pmatrix}
f_{xx}&f_{xy}\\
f_{xy}&f_{yy}
\end{pmatrix}.
$$

形作用素の座標行列は

$$
A=G^{-1}B
$$

です。
<!-- solution-end -->

<a id="ex-geo10-b02"></a>
#### GEO10-B02 法線反転で何が変わるか
- Level: B

単位法線場を $N$ から $-N$ へ変えるとき、形作用素、第二基本形式、主曲率、Gauss 曲率、平均曲率がどう変化するか示せ。

<!-- solution-start -->
**解答**

新しい法線を

$$
\widetilde N=-N
$$

とします。

微分は

$$
d\widetilde N=-dN.
$$

従って新しい形作用素は

$$
\widetilde S
=
-d\widetilde N
=
dN
=
-S.
$$

よって第二基本形式も

$$
\widetilde{II}(v,w)
=
\widetilde S(v)\cdot w
=
-II(v,w)
$$

となります。

$S$ の固有値が $\kappa_i$ なら $-S$ の固有値は $-\kappa_i$ なので

$$
\widetilde\kappa_i=-\kappa_i.
$$

二次元曲面では

$$
\widetilde K
=
(-\kappa_1)(-\kappa_2)
=
K.
$$

一方

$$
\widetilde H
=
\frac{-\kappa_1-\kappa_2}{2}
=
-H.
$$

従って

- 形作用素：符号反転
- 第二基本形式：符号反転
- 主曲率：全て符号反転
- Gauss 曲率：不変
- 平均曲率：符号反転

です。
<!-- solution-end -->

<a id="ex-geo10-b03"></a>
#### GEO10-B03 トーラスの曲率
- Level: B

$R>r>0$ とし、

$$
X(u,v)
=
\bigl(
(R+r\cos v)\cos u,
(R+r\cos v)\sin u,
r\sin v
\bigr)
$$

でトーラスを表す。外向き単位法線

$$
N
=
(\cos v\cos u,\cos v\sin u,\sin v)
$$

に対して主曲率と Gauss 曲率を求め、$K$ の符号がどこで変わるか説明せよ。

<!-- solution-start -->
**解答**

まず

$$
X_u
=
\bigl(
-(R+r\cos v)\sin u,
(R+r\cos v)\cos u,
0
\bigr),
$$

$$
X_v
=
\bigl(
-r\sin v\cos u,
-r\sin v\sin u,
r\cos v
\bigr).
$$

法線の微分は

$$
N_u
=
(-\cos v\sin u,\cos v\cos u,0)
=
\frac{\cos v}{R+r\cos v}X_u,
$$

$$
N_v
=
(-\sin v\cos u,-\sin v\sin u,\cos v)
=
\frac1rX_v.
$$

従って

$$
S(X_u)
=
-\frac{\cos v}{R+r\cos v}X_u,
$$

$$
S(X_v)
=
-\frac1rX_v.
$$

よって主曲率は

$$
\kappa_1
=
-\frac{\cos v}{R+r\cos v},
$$

$$
\kappa_2
=
-\frac1r.
$$

Gauss 曲率は

$$
K
=
\kappa_1\kappa_2
=
\frac{\cos v}{r(R+r\cos v)}.
$$

$R>r$ なので分母は常に正です。従って $K$ の符号は $\cos v$ の符号と一致します。

- $\cos v>0$：外側、$K>0$
- $\cos v=0$：上下の円、$K=0$
- $\cos v<0$：内側のくびれ、$K<0$

です。
<!-- solution-end -->

### Level C

<a id="ex-geo10-c01"></a>
#### GEO10-C01 Euler の公式と正規曲率の極値
- Level: C

曲面上の点 $p$ で主曲率を

$$
\kappa_1\le\kappa_2
$$

とし、対応する正規直交主方向を $e_1,e_2$ とする。

1. 単位接ベクトル
   $$
   v=\cos\theta\,e_1+\sin\theta\,e_2
   $$
   に対して
   $$
   \kappa_n(v)
   =
   \kappa_1\cos^2\theta+\kappa_2\sin^2\theta
   $$
   を導け。
2. 全ての単位接方向について
   $$
   \kappa_1\le\kappa_n(v)\le\kappa_2
   $$
   を示せ。
3. 円柱の一点で外向き法線を取り、正規曲率が方向によってどの範囲を動くか求めよ。

<!-- solution-start -->
**解答**

1. 正規曲率は
   $$
   \kappa_n(v)=II(v,v)=v\cdot S(v)
   $$
   です。

   主方向では
   $$
   S(e_1)=\kappa_1e_1,
   \qquad
   S(e_2)=\kappa_2e_2.
   $$

   従って
   $$
   S(v)
   =
   \kappa_1\cos\theta\,e_1
   +
   \kappa_2\sin\theta\,e_2.
   $$

   $e_1,e_2$ の正規直交性から
   $$
   \begin{aligned}
   \kappa_n(v)
   &=
   (\cos\theta\,e_1+\sin\theta\,e_2)
   \cdot
   (\kappa_1\cos\theta\,e_1+\kappa_2\sin\theta\,e_2)
   \\
   &=
   \kappa_1\cos^2\theta
   +
   \kappa_2\sin^2\theta.
   \end{aligned}
   $$

2. 
   $$
   \cos^2\theta+\sin^2\theta=1
   $$
   なので、$\kappa_n(v)$ は $\kappa_1,\kappa_2$ の重み付き平均です。

   具体的に
   $$
   \kappa_n(v)-\kappa_1
   =
   (\kappa_2-\kappa_1)\sin^2\theta
   \ge0,
   $$

   また
   $$
   \kappa_2-\kappa_n(v)
   =
   (\kappa_2-\kappa_1)\cos^2\theta
   \ge0.
   $$

   従って
   $$
   \kappa_1\le\kappa_n(v)\le\kappa_2.
   $$

   等号はそれぞれ主方向 $e_1,e_2$ で達成されます。

3. 半径 $R$ の円柱で外向き法線を取ると主曲率は
   $$
   -\frac1R,\qquad0.
   $$

   小さい方を
   $$
   \kappa_1=-\frac1R,
   \qquad
   \kappa_2=0
   $$
   とすれば
   $$
   -\frac1R
   \le
   \kappa_n(v)
   \le
   0.
   $$

   周方向で
   $$
   \kappa_n=-\frac1R,
   $$

   軸方向で
   $$
   \kappa_n=0
   $$

   です。

   つまり円柱は、接方向を回すと「球面のように曲がる方向」から「全く曲がらない方向」まで連続的に移ります。
<!-- solution-end -->

---

## 13. 次に進む

本章では Euclid 空間内の曲線・超曲面に対して、

$$
\text{法線の変化}
\longrightarrow
\text{形作用素}
\longrightarrow
\text{第二基本形式}
\longrightarrow
\text{主曲率}
$$

という外在的曲率の流れを構成しました。

次の GEO11 では、局所標構の微分から Gauss 公式・Weingarten 公式・Gauss--Codazzi 方程式を導きます。そこで、二次元曲面の Gauss 曲率が埋め込み方ではなく第一基本形式だけで決まることへ進みます。
