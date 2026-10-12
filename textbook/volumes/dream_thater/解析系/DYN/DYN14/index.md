# DYN14 二次元の双曲線形模型・安定方向と不安定方向

[DYN13の区間horseshoe](../DYN13/index.md#thm-dyn13-conjugacy)では、離れた二枝の逆写像をたどることで、初期値と記号列を一対一に対応させました。その仕組みには「折り返し」と「枝の分離」があります。しかし、**折り返しのない線形写像**にも、同じ場所で拡大と収縮が共存します。どちらがカオスの構成に必要なのでしょうか。

今回は最初に $D=\operatorname{diag}(2,1/2)$ のすべての整数時刻の軌道を計算します。次に、[線形写像と固有空間](../../../基礎科目/F0/F0-00F/index.md)の道具を用いて斜めの固有方向へ拡張し、最後に区間horseshoeとはまだ違うことを証明します。

## 1. 横に伸び、縦に縮む写像

列ベクトル $z=(x,y)^{\mathsf T}\in\mathbb R^2$ と

$$
D=\begin{pmatrix}2&0\\0&1/2\end{pmatrix},\qquad T(z)=Dz
$$

を考えます。例えば $(1,8)\mapsto(2,4)\mapsto(4,2)\mapsto(8,1)$。同じ一歩で、横は2倍、縦は半分です。逆行列は $D^{-1}=\operatorname{diag}(1/2,2)$ なので、過去へも一意にさかのぼれます。

<a id="prop-dyn14-iterates"></a>

<!-- formal-statement-start -->
### 命題（対角模型の全整数時刻の軌道）

$D=\operatorname{diag}(2,1/2)$、$z=(x,y)^{\mathsf T}\in\mathbb R^2$ に対し、すべての整数 $n$ で

$$
D^nz=(2^nx,2^{-n}y)^{\mathsf T}
$$

が成立する。$n\ge0$ では横方向が $2^n$ 倍、縦方向が $2^{-n}$ 倍となる。
<!-- formal-statement-end -->

### 証明の見取り図

正の時刻は行列を一歩掛ける帰納法、負の時刻は逆行列を掛ける帰納法で証明します。逆方向で拡大と収縮が交換することを、符号だけでなく行列積で確かめます。

<!-- proof-start -->
### 証明

$n=0$ なら $D^0z=z$。$n\ge0$ で式が成立したとき、

$$
D^{n+1}z=D(2^nx,2^{-n}y)^{\mathsf T}
=(2\cdot2^nx,\tfrac12\cdot2^{-n}y)^{\mathsf T}
=(2^{n+1}x,2^{-(n+1)}y)^{\mathsf T}.
$$

よって非負整数で成立します。逆行列 $D^{-1}=\operatorname{diag}(1/2,2)$ を使い、正整数 $m$ について同じ帰納法を行うと

$$
D^{-m}z=(2^{-m}x,2^my)^{\mathsf T}.
$$

$n=-m$ を代入すれば負整数も含めた式です。$\square$
<!-- proof-end -->

$z=(1,8)$ なら時刻 $-1,0,1,2,3$ の位置は、それぞれ $(1/2,16),(1,8),(2,4),(4,2),(8,1)$ です。

幅2・高さ2の正方形 $[-1,1]^2$ は $[-2,2]\times[-1/2,1/2]$ へ写り、面積はともに4。

$\det D=2(1/2)=1$ は面積保存を示しますが、点 $(1,0)$ の軌道は横方向へ際限なく遠ざかります。

**面積保存と点の軌道の有界性は別です。

**

## 2. 安定集合と不安定集合を点の集まりとして定める

原点は $D0=0$ を満たす固定点です。平面では、原点へ近づく初期点が一本の直線として現れます。前方向で近づく点と後方向で近づく点を取り違えないため、まず二つの集合を区別します。

<a id="def-dyn14-stable-sets"></a>

<!-- formal-statement-start -->
### 定義（原点に関する安定集合・不安定集合）

可逆実線形写像 $A:\mathbb R^2\to\mathbb R^2$ に対し、Euclidノルムを使って

$$
W^s_A(0)=\{z:\|A^nz\|\to0\ (n\to+\infty)\}
$$

および

$$
W^u_A(0)=\{z:\|A^{-n}z\|\to0\ (n\to+\infty)\}
$$

を、それぞれ原点の**安定集合**と**不安定集合**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dyn14-stable-sets -->

**定義の確認**　 $D^n(0,8)=(0,8\cdot2^{-n})\to0$ なので $(0,8)\in W^s_D(0)$。

$D^{-n}(3,0)=(3\cdot2^{-n},0)\to0$ なので $(3,0)\in W^u_D(0)$。

一方、$(1,1)$ は前時刻で横座標 $2^n$、後時刻で縦座標 $2^n$ が発散します。

片方の座標が縮むだけでは**点全体が近づく**ことにはなりません。

<!-- definition-example-end -->

<a id="thm-dyn14-diagonal-directions"></a>

<!-- formal-statement-start -->
### 定理（対角模型の安定方向と不安定方向）

$D=\operatorname{diag}(2,1/2)$ に対して

$$
W^s_D(0)=\{(0,y):y\in\mathbb R\},\qquad
W^u_D(0)=\{(x,0):x\in\mathbb R\}.
$$

$n\ge0$ では、安定集合の $v$ について $\|D^nv\|=2^{-n}\|v\|$、不安定集合の $v$ について $\|D^{-n}v\|=2^{-n}\|v\|$ が成り立つ。二集合の交わりは $\{0\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Euclidノルムの二乗を二つの正項に分けます。一つが無限大なら全体は0に近づけません。残りの軸上なら縮小率を等号で追跡できます。

<!-- proof-start -->
### 証明

全整数反復の式から、$n\ge0$ で

$$
\|D^n(x,y)\|^2=4^nx^2+4^{-n}y^2.
$$

$x\ne0$ なら $4^nx^2\to\infty$、$x=0$ ならノルムは $2^{-n}|y|\to0$。従って $W^s_D(0)$ は縦軸です。後方については

$$
\|D^{-n}(x,y)\|^2=4^{-n}x^2+4^ny^2.
$$

$y\ne0$ なら発散、$y=0$ ならノルムは $2^{-n}|x|\to0$。よって $W^u_D(0)$ は横軸です。二軸の共通点は原点のみ。縮小率の等号も今求めた軸上の式から従います。$\square$
<!-- proof-end -->

例えば $z=(2^{-10},1)$ は原点の近くにありますが、$D^{10}z=(1,2^{-10})$、さらに第一座標は増え続けます。**近い初期点**と**安定集合の中の初期点**は異なります。

## 3. 固有方向が斜めの場合

対角行列でなければ安定方向は必ず縦軸、というわけではありません。固有値・固有ベクトルで平面を別の座標系へ変換すれば、対角模型と同じ反復計算ができます。ただしここでは実固有ベクトルが二本あり、片方の固有値だけが絶対値1未満という条件に限定します。

<a id="def-dyn14-hyperbolic-model"></a>

<!-- formal-statement-start -->
### 定義（二方向を持つ実双曲線形模型）

実行列 $A\in\mathbb R^{2\times2}$ に一次独立な実固有ベクトル $v_u,v_s$ および実固有値 $\lambda_u,\lambda_s$ が存在して

$$
Av_u=\lambda_uv_u,\quad Av_s=\lambda_sv_s,\quad
0<|\lambda_s|<1<|\lambda_u|
$$

を満たすとき、本章では $A$ を**二方向を持つ実双曲線形模型**と呼ぶ。$E^u=\mathbb Rv_u$、$E^s=\mathbb Rv_s$ を、それぞれ不安定固有方向、安定固有方向と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dyn14-hyperbolic-model -->

**定義の確認**　 $D$ は $v_u=(1,0)^{\mathsf T}$、$v_s=(0,1)^{\mathsf T}$、$\lambda_u=2$、$\lambda_s=1/2$ で全条件を満たします。斜めの例

$$
A=\begin{pmatrix}2&-3/2\\0&1/2\end{pmatrix},
\quad v_u=\begin{pmatrix}1\\0\end{pmatrix},
\quad v_s=\begin{pmatrix}1\\1\end{pmatrix}
$$

でも $Av_u=(2,0)^{\mathsf T}=2v_u$、$Av_s=(1/2,1/2)^{\mathsf T}=(1/2)v_s$ です。$\det[v_u\ v_s]=1$ で独立。今度の安定方向は斜めの直線 $x=y$ です。

<!-- definition-example-end -->

<a id="thm-dyn14-eigen-dichotomy"></a>

<!-- formal-statement-start -->
### 定理（固有方向分解と全整数反復）

二方向を持つ実双曲線形模型 $A$ の任意の点 $z\in\mathbb R^2$ は一意に $z=av_u+bv_s$ と表せ、全整数 $n$ で

$$
A^nz=a\lambda_u^nv_u+b\lambda_s^nv_s.
$$

特に $W^s_A(0)=E^s$、$W^u_A(0)=E^u$、$E^s\cap E^u=\{0\}$、$E^s+E^u=\mathbb R^2$。安定方向の前方収縮率は $|\lambda_s|^n$、不安定方向の後方収縮率は $|\lambda_u|^{-n}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二本の固有ベクトルを列に持つ行列 $P$ を作り、$A=P\operatorname{diag}(\lambda_u,\lambda_s)P^{-1}$ を直接導きます。混合点が収束しないことは、成分の打ち消しの可能性を[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)で排除します。

<!-- proof-start -->
### 証明

$P=[v_u\ v_s]$ は二列独立なので可逆です。$(a,b)^{\mathsf T}=P^{-1}z$ とすれば $z=av_u+bv_s$ が一意に決まります。固有値条件を列ごとに書くと

$$
AP=[Av_u\ Av_s]=[\lambda_uv_u\ \lambda_sv_s]
=P\begin{pmatrix}\lambda_u&0\\0&\lambda_s\end{pmatrix}.
$$

右から $P^{-1}$ を掛けて $A=P\operatorname{diag}(\lambda_u,\lambda_s)P^{-1}$。二固有値が0でないため $A$ は可逆で、正負どちらの整数でも

$$
A^n=P\operatorname{diag}(\lambda_u^n,\lambda_s^n)P^{-1}.
$$

これを $z=P(a,b)^{\mathsf T}$ へ適用すれば反復公式が得られます。

$b v_s$ に対し $\|A^n(bv_s)\|=|b||\lambda_s|^n\|v_s\|\to0$。逆に $a\ne0$ なら

$$
\|A^nz\|\ge
|a||\lambda_u|^n\|v_u\|-|b||\lambda_s|^n\|v_s\|
\longrightarrow\infty.
$$

第一項は $|\lambda_u|>1$ により発散し、第二項は $|\lambda_s|<1$ により0になります。従って前方収束集合は $E^s$ です。負時刻で $b\ne0$ なら

$$
\|A^{-n}z\|\ge
|b||\lambda_s|^{-n}\|v_s\|-|a||\lambda_u|^{-n}\|v_u\|
\longrightarrow\infty.
$$

$b=0$ なら $\|A^{-n}z\|=|a||\lambda_u|^{-n}\|v_u\|\to0$。ゆえに $W^u_A(0)=E^u$ です。直和の二条件は $P$ の可逆性から従います。$\square$
<!-- proof-end -->

**斜めの例の全計算。** 上の三角行列では

$$
P=\begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad
P^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}.
$$

ゆえに $(x,y)=(x-y)v_u+yv_s$ となり、定理に $a=x-y$、$b=y$ を代入すると

$$
A^n(x,y)=\bigl(2^n(x-y)+2^{-n}y,\ 2^{-n}y\bigr).
$$

例えば $(0,1)=-v_u+v_s$ は $A(0,1)=(-3/2,1/2)$、$A^2(0,1)=(-15/4,1/4)$ です。縦軸にいるだけでは安定ではなく、$x-y=0$ という**固有方向**が必要です。

## 4. 原点でなく、任意の基準軌道に近づく条件

二点 $z,p$ の軌道を比較すると、線形性により $A^nz-A^np=A^n(z-p)$ です。ここでは原点への収束ではなく、**二つの動く点が互いに近づく**条件を考えます。

<a id="def-dyn14-relative-sets"></a>

<!-- formal-statement-start -->
### 定義（基準軌道に関する安定・不安定集合）

可逆線形写像 $A$ と基準点 $p\in\mathbb R^2$ に対し

$$
W^s_A(p)=\{z:\|A^nz-A^np\|\to0\ (n\to+\infty)\},
$$

$$
W^u_A(p)=\{z:\|A^{-n}z-A^{-n}p\|\to0\ (n\to+\infty)\}
$$

と定める。基準点 $p$ は固定点でなくてもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-dyn14-relative-sets -->

**定義の確認**　 $D$、$p=(1,2)$、$z=(1,-3)$ では $z-p=(0,-5)$、従って $D^nz-D^np=(0,-5\cdot2^{-n})\to0$。

二つの点はそれぞれ横方向に遠ざかっても、互いの距離は縮みます。

一方 $z=(2,2)$ との差は $(1,0)$ で、距離は $2^n$ と発散します。

<!-- definition-example-end -->

<a id="thm-dyn14-affine-fibers"></a>

<!-- formal-statement-start -->
### 定理（基準軌道の安定・不安定集合は平行直線）

二方向を持つ実双曲線形模型 $A$ と $p\in\mathbb R^2$ に対して

$$
W^s_A(p)=p+E^s,\qquad W^u_A(p)=p+E^u.
$$

$z\in W^s_A(p)$ なら $\|A^nz-A^np\|=|\lambda_s|^n\|z-p\|$、$z\in W^u_A(p)$ なら $\|A^{-n}z-A^{-n}p\|=|\lambda_u|^{-n}\|z-p\|$ （$n\ge0$）。
<!-- formal-statement-end -->

### 証明の見取り図

差のベクトルを原点についての定理に入力します。等号になる縮小率は、差が一本の固有直線に載っていることから得ます。

<!-- proof-start -->
### 証明

正整数と0について $A^n(z-p)=A^nz-A^np$ であり、逆行列も線形だから負時刻についても同じ等式です。前節の $W^s_A(0)=E^s$ を差 $z-p$ に適用すると

$$
z\in W^s_A(p)\iff z-p\in E^s\iff z\in p+E^s.
$$

同じ計算を負時刻で行えば $W^u_A(p)=p+E^u$ です。

$z-p=bv_s$ なら $A^n(z-p)=b\lambda_s^nv_s$。

ノルムを取れば $\|A^nz-A^np\|=|\lambda_s|^n\|z-p\|$。

不安定方向でも $z-p=av_u$ と置き、$A^{-n}(z-p)=a\lambda_u^{-n}v_u$ からもう一つの等式を得ます。

$\square$
<!-- proof-end -->

$D$ の $W^s_D(1,2)$ は縦線 $x=1$、$W^u_D(3,4)$ は横線 $y=4$、両者の交点は $(1,4)$ です。一般の模型でも二方向が独立なので、一本ずつの平行移動は一点で交わります。この事実を**曲がった非線形の安定多様体**へ無条件に広げたわけではありません。

## 5. 線形の双曲性だけではhorseshoeにならない

ここまでの $A$ は、方向によって指数的に縮み、別の方向に伸びました。しかし区間の二枝を折り返す仕組みはありません。その違いは「コンパクトな全不変集合にどのような軌道があるか」を調べれば明確になります。

<a id="thm-dyn14-compact-obstruction"></a>

<!-- formal-statement-start -->
### 定理（両側有界な軌道とコンパクト全不変集合）

二方向を持つ実双曲線形模型 $A$ で、両側軌道 $\{A^nz:n\in\mathbb Z\}$ が有界である点は $z=0$ に限る。非空コンパクト集合 $K\subset\mathbb R^2$ が $A(K)=K$ を満たすなら $K=\{0\}$。
<!-- formal-statement-end -->

### 証明の見取り図

不安定成分があれば未来に、安定成分があれば過去に逃げます。集合等号 $A(K)=K$ と可逆性の両方によって、集合に入った点の**全整数時刻**が $K$ に含まれます。

<!-- proof-start -->
### 証明

$z=av_u+bv_s$ と一意に書きます。

$a\ne0$ なら前方反復に[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を適用して $\|A^nz\|\to\infty$、$b\ne0$ なら後方反復から $\|A^{-n}z\|\to\infty$ です。

よって両側有界には $a=b=0$ が必要で、原点の軌道は常に原点なので十分でもあります。

次に $A(K)=K$ かつ $A$ は可逆なので、両辺に逆写像を適用して $A^{-1}(K)=K$ です。

繰り返せば全整数 $n$ について $A^n(K)=K$。

各 $z\in K$ の両側軌道はコンパクト集合 $K$ に入るので有界です。

従って前半から $z=0$、つまり $K\subset\{0\}$。

$K$ は空でないため $K=\{0\}$ です。

$\square$
<!-- proof-end -->

**仮定を落とす反例。

** 等号でなく $A(K)\subset K$ のみなら、$D$ の縦線分 $K=\{(0,y):|y|\le1\}$ はコンパクトで $D(K)=\{(0,y):|y|\le1/2\}\subsetneq K$ を満たします。

$(0,1)\in K$ でも $D^{-1}(0,1)=(0,2)\notin K$ です。

上の証明の「過去も $K$ に含まれる」が壊れます。

また $B=\operatorname{diag}(2,1)$ なら縦軸の点は収縮せず $W^s_B(0)=\{0\}$ です。$C=\operatorname{diag}(2,0)$ には逆行列がなく、後方軌道が一意ではありません。固有値の絶対値が1に等しくない条件、非零である条件には別々の役割があります。

[DYN13の生存集合と全シフト](../DYN13/index.md#thm-dyn13-conjugacy)には二つ以上の周期点があり、自由な二進語が実現します。一方この線形模型のコンパクト全不変集合は原点のみです。**安定・不安定の共存は、二つの枝の折り返し・符号化まで保証しません。** 非線形の安定多様体定理やSmale--Birkhoff定理の仮定・証明を、この線形計算から代用することもできません。

## 6. 演習（10題・詳細解答）

すべての行列は実二次元上の線形写像で、ノルムはEuclidノルムです。負の時刻は可逆行列に対してのみ使います。

### Level A

### A1. 全整数反復

$B=\operatorname{diag}(3,1/4)$、$z=(2,-8)$ について $B^2z,B^{-2}z,B^nz$ を求めよ。

- Level: A
- ID: DYN14-A1

<!-- solution-start -->
**詳細解答**　$B^{-1}=\operatorname{diag}(1/3,4)$。

座標ごとに整数冪を取れば $B^nz=(2\cdot3^n,-8\cdot4^{-n})$ です。

$n=2$ なら $(18,-8/16)=(18,-1/2)$、$n=-2$ なら $(2/9,-8\cdot16)=(2/9,-128)$ です。

正負の指数の符号を一方だけ間違えないことを確認します。
<!-- solution-end -->

### A2. 負の固有値

$B=\operatorname{diag}(-2,-1/3)$ の安定・不安定集合を求め、負符号の役割を説明せよ。

- Level: A
- ID: DYN14-A2

<!-- solution-start -->
**詳細解答**　$B^n(x,y)=((-2)^nx,(-1/3)^ny)$ なので、$x\ne0$ なら第一座標の絶対値は $2^n|x|\to\infty$、$x=0$ ならノルムは $3^{-n}|y|\to0$。

ゆえに安定集合は縦軸です。

後方は $B^{-n}(x,y)=((-1/2)^nx,(-3)^ny)$、$y\ne0$ は発散し $y=0$ は収束するので、不安定集合は横軸です。

負符号は各歩の向きを反転するだけで、距離の指数率は絶対値で決まります。
<!-- solution-end -->

### A3. 近くても不安定

$D^n(2^{-10},1)$ を求め、$n=10$ での値と前方極限を調べよ。

- Level: A
- ID: DYN14-A3

<!-- solution-start -->
**詳細解答**　$D^n(2^{-10},1)=(2^{n-10},2^{-n})$ です。10回後は $(1,2^{-10})$。$n\to\infty$ では第一座標が無限大となり、ノルムも無限大です。第二座標が0へ収束しても、全体は原点へ近づきません。
<!-- solution-end -->

### A4. 固有ベクトルの直接確認

$A=\begin{pmatrix}2&-3/2\\0&1/2\end{pmatrix}$、$v_u=(1,0)$、$v_s=(1,1)$ について固有値と一次独立性を確かめよ。

- Level: A
- ID: DYN14-A4

<!-- solution-start -->
**詳細解答**　$Av_u=(2,0)=2v_u$、$Av_s=(2-3/2,1/2)=(1/2,1/2)=(1/2)v_s$。

列を並べた $P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ の行列式は1で、二本は一次独立です。

$0<1/2<1<2$ なので定義の全条件を満たします。
<!-- solution-end -->

### A5. 面積は有界性を意味しない

$D$ による $[-1,1]^2$ の像と面積を求め、無限遠へ進む軌道を一つ挙げよ。

- Level: A
- ID: DYN14-A5

<!-- solution-start -->
**詳細解答**　像は $[-2,2]\times[-1/2,1/2]$、面積は $4\cdot1=4$ です。もとの面積も $2\cdot2=4$。しかし $D^n(1,0)=(2^n,0)$ であり、ノルムは $2^n\to\infty$。面積保存と軌道有界性を混同できません。
<!-- solution-end -->

### Level B

### B1. 混合点の発散判定

定義の条件を満たす $A$ で、$z=av_u+bv_s$ と一意に書ける理由を述べ、$a\ne0$ なら前方ノルムが無限大へ向かうことを証明せよ。

- Level: B
- ID: DYN14-B1

<!-- solution-start -->
**詳細解答**　$P=[v_u\ v_s]$ の二列が独立だから逆行列 $P^{-1}$ が存在し、$(a,b)^{\mathsf T}=P^{-1}z$ が一意に定まります。

$AP=P\operatorname{diag}(\lambda_u,\lambda_s)$ なので $A^nz=a\lambda_u^nv_u+b\lambda_s^nv_s$。

逆三角不等式で

$$
\|A^nz\|\ge|a||\lambda_u|^n\|v_u\|-|b||\lambda_s|^n\|v_s\|.
$$

$a\ne0$ では第一項が発散、第二項が0へ向かうのでノルムは無限大です。二固有方向が直交するという仮定はないため、[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を使う必要があります。
<!-- solution-end -->

### B2. 遠ざかりながら近づく

$D$、$p=(1,2)$ で $W^s_D(p)$ を方程式で書き、$z=(1,-3)$ の軌道と $p$ の軌道の距離を求めよ。

- Level: B
- ID: DYN14-B2

<!-- solution-start -->
**詳細解答**　差 $z-p=(x-1,y-2)$ の横成分が0であることが必要十分なので、$W^s_D(p)=\{(x,y):x=1\}$ です。

$D^np=(2^n,2^{1-n})$、$D^nz=(2^n,-3\cdot2^{-n})$。

差は $(0,-3\cdot2^{-n}-2^{1-n})=(0,-5\cdot2^{-n})$、距離は $5\cdot2^{-n}\to0$。

両点の横座標は同時に無限大へ進みますが、差の距離は縮みます。
<!-- solution-end -->

### B3. 仮定の役割

$B=\operatorname{diag}(2,1)$ の安定集合と、$C=\operatorname{diag}(2,0)$ の後方反復が一意でない理由を説明せよ。

- Level: B
- ID: DYN14-B3

<!-- solution-start -->
**詳細解答**　$B^n(x,y)=(2^nx,y)$ なので、収束にはまず $x=0$、次に定数成分も0となる $y=0$ が必要です。

$W^s_B(0)=\{0\}$。

固有値1の方向は収縮しません。

$C(x,y)=(2x,0)$ は $(x,y)$ と $(x,y')$ を同じ点へ写します。

特に原点の逆像は $\{(0,y):y\in\mathbb R\}$ であり一意に戻せません。

逆行列もないため $C^{-n}$ を用いる不安定集合の定義は適用できません。
<!-- solution-end -->

### B4. 斜めの安定線

上三角行列 $A$ の全整数反復 $A^n(x,y)$ と安定集合を求め、$A^2(0,1)$ を計算せよ。

- Level: B
- ID: DYN14-B4

<!-- solution-start -->
**詳細解答**　$P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$P^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ より $P^{-1}(x,y)^{\mathsf T}=(x-y,y)^{\mathsf T}$。したがって

$$
A^n(x,y)=\bigl(2^n(x-y)+2^{-n}y,\ 2^{-n}y\bigr).
$$

$n\to+\infty$ で縮むには $x-y=0$ が必要で、そのとき両成分は $2^{-n}y\to0$。ゆえに $W^s_A(0)=\{(x,y):x=y\}$。$(0,1)$ と $n=2$ を代入すれば $(4(-1)+1/4,1/4)=(-15/4,1/4)$ です。
<!-- solution-end -->

### Level C

### C1. 線形双曲性の限界

$A$ は定義を満たす二次元の線形写像とする。

(a) 両整数時刻で有界な軌道を持つ初期点を確定せよ。

(b) 空でないコンパクトな集合 $K$ に対し $A(K)=K$ なら $K$ を確定せよ。

(c) $A(K)\subset K$ のみに弱めた場合の反例を $D$ で構成せよ。

(d) (b)の集合上で二記号の片側全シフトへの位相共役が不可能なことを固定点の個数で示せ。

- Level: C
- ID: DYN14-C1

<!-- solution-start -->
**詳細解答**

(a) $P=[v_u\ v_s]$ は可逆なので $z=av_u+bv_s$ は一意です。$a\ne0$ では

$$
\|A^nz\|\ge|a||\lambda_u|^n\|v_u\|-|b||\lambda_s|^n\|v_s\|\to\infty.
$$

$b\ne0$ では過去について

$$
\|A^{-n}z\|\ge|b||\lambda_s|^{-n}\|v_s\|-|a||\lambda_u|^{-n}\|v_u\|\to\infty.
$$

両方向に有界なら $a=b=0$ で $z=0$。原点は全時刻で0なので十分条件でもあります。

(b) 可逆性と集合等号から $A^{-1}(K)=K$ です。帰納的に $A^n(K)=K$（全整数 $n$）。$z\in K$ の全軌道はコンパクトな $K$ 内で有界なので(a)より $z=0$。非空性により $K=\{0\}$。

(c) $K=\{(0,y):|y|\le1\}$ は非空コンパクトで、$D(K)=\{(0,y):|y|\le1/2\}\subsetneq K$。$K$ は原点以外も含み、$D^{-1}(0,1)=(0,2)\notin K$ なので後方閉包が壊れます。

(d) $A|_K$ には固定点0しかありません。

一方 $\{0,1\}^{\mathbb N_0}$ 上の左シフトには $0^\infty$ と $1^\infty$ という異なる固定点が二つあります。

もし位相共役 $h$ があれば $h(\sigma s)=A(h(s))$ により異なる二固定点が $K$ 上の異なる二固定点へ移るはずで矛盾します。

線形の拡大・収縮だけでは[DYN13のhorseshoe](../DYN13/index.md#thm-dyn13-conjugacy)を再現できません。
<!-- solution-end -->

**まとめ**　平面では、二つの独立な固有方向に前方収縮と前方拡大が共存します。原点についての安定・不安定直線、基準軌道を移した平行直線、両側有界軌道の唯一性まで、線形代数と反復計算だけで導けました。しかし折り返しのない線形模型には、区間horseshoeの自由な二進符号化はまだありません。
