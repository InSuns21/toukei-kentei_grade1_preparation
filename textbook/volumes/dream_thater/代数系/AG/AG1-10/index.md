# AG1-10 Zariski接空間とJacobian判定の準備

曲線 $y=x^2$ の点を拡大すると、接線 $y-2ax+a^2=0$ が見えてきます。一方、$xy=0$ の原点では二本の枝が交差し、普通の意味での「一本の接線」は選べません。前章では[Krull次元と超越次数の一致](../AG1-09/index.md#thm-ag1-09-dimension-trdeg)により、どちらも1次元の代数的集合だと分かりました。**同じ幾何学的次元でも、一点における一次の振る舞いは異なる**のです。

多項式の一次の項だけを残すことで、点における代数的な接方向を定義します。さらに、[点の局所環](../AG1-04/index.md#def-ag1-04-point-local-ring)から同じ方向を取り出せることを証明します。これが後に「どの点が特異か」を調べるための準備になります。ただし、本章では一般の滑らかさのJacobian判定定理を証明したことにはせず、まず判定に使う線形代数を確立します。

以下、$k=\mathbb C$ とします。$X\subseteq k^n$ は非空アフィン代数的集合、$I=I(X)$ は消滅イデアル、$A=k[X]=k[x_1,\ldots,x_n]/I$ は[座標環](../AG1-03/index.md#def-ag1-03-coordinate-ring)です。$a=(a_1,\ldots,a_n)\in X$ を固定します。偏微分は多項式を各単項式について形式的に微分する操作であり、極限の存在を前提としません。

## 1. 方程式の一次部分から接方向を読む

$f(x,y)=y-x^2$ の点 $a=(s,s^2)$ で、増分 $(u,v)$ を代入してみます。

$$
f(s+u,s^2+v)=v-2su-u^2.
$$

$u,v$ の一次部分は $v-2su$ です。これが零になる方向だけを残すと $v=2su$、すなわち通常の接線の方向を得ます。一般の多項式でも同じ操作ができるようにします。

<a id="def-ag1-10-tangent"></a>

<!-- formal-statement-start -->
> **定義（Zariski接空間）**  
> 体 $k$ 上のアフィン代数的集合 $X\subseteq k^n$ と点 $a\in X$ に対し、$v=(v_1,\ldots,v_n)\in k^n$ が $a$ における**Zariski接ベクトル**であるとは、すべての $f\in I(X)$ について

$$
\sum_{j=1}^{n}\frac{\partial f}{\partial x_j}(a)v_j=0
$$

> が成り立つことをいう。このような $v$ のなす $k$ 線形部分空間を $T_aX$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-10-tangent -->
**定義の確認。** $X=V(y-x^2)$ とし、$a=(s,s^2)$ とします。$I(X)=(y-x^2)$ であることは、$y-x^2$ で割った余りが $x$ の多項式となり、その余りが全点 $(t,t^2)$ で零なら零多項式であることから従います。$f=y-x^2$ の偏微分を並べた行は $(-2x,1)$ なので、Zariski接ベクトル $(u,v)$ の条件は $-2su+v=0$ です。従って

$$
T_{(s,s^2)}X=\{(u,2su):u\in k\}.
$$

[多変数多項式環のNoether性](../AG1-05/index.md#cor-ag1-05-multivariate-noether)により消滅イデアルは有限生成なので、以下のJacobianは必ず有限行列として作れます。今は一つの生成多項式の微分だけを見ました。**なぜ無限個の $I(X)$ の元を全部確かめなくてよいか**を次で証明します。
<!-- definition-example-end -->

<a id="prop-ag1-10-jacobian-kernel"></a>

<!-- formal-statement-start -->
> **命題（生成方程式とJacobian行列）**  
> $I(X)=(f_1,\ldots,f_r)$ とする。点 $a\in X$ におけるJacobian行列を

$$
J_f(a)=\left(\frac{\partial f_i}{\partial x_j}(a)\right)_{\substack{1\le i\le r\\1\le j\le n}}
$$

> と置くと、

$$
T_aX=\ker J_f(a),\qquad
\dim_k T_aX=n-\operatorname{rank}J_f(a).
$$

> 特に、右辺の階数は $I(X)$ の有限生成系の選び方によらない。
<!-- formal-statement-end -->

### 証明の見取り図

ある方程式が生成元の多項式係数付き和なら、積の微分で現れる「係数の微分×生成元」の項は、$a$ が零点であるため消えます。従って生成元の微分だけですべての方程式の一次条件を代表できます。

<!-- proof-start -->
### 証明

まず $v\in T_aX$ なら $f_i\in I(X)$ に対する定義の条件から $J_f(a)v=0$ です。逆に $J_f(a)v=0$ とし、任意の $g\in I(X)$ を取ります。生成の仮定から $g=\sum_{i=1}^r h_if_i$ と書けます。多項式の積の微分則を各 $x_j$ に適用すると、

$$
\frac{\partial g}{\partial x_j}
=\sum_{i=1}^r\left(
\frac{\partial h_i}{\partial x_j}f_i+
h_i\frac{\partial f_i}{\partial x_j}
\right).
$$

$a\in X$ より $f_i(a)=0$ なので、

$$
\sum_{j=1}^n\frac{\partial g}{\partial x_j}(a)v_j
=\sum_{i=1}^r h_i(a)
\left(\sum_{j=1}^n\frac{\partial f_i}{\partial x_j}(a)v_j\right)=0.
$$

これで $v\in T_aX$ が分かりました。最後に、$J_f(a)$ は $k^n$ から $k^r$ への線形写像です。ここで階数公式を直接確認するため、核の基底を $k^n$ の基底へ延長すれば、その補空間上の像が $\operatorname{im}J_f(a)$ の基底になるため、$n=\dim\ker J_f(a)+\operatorname{rank}J_f(a)$ です。生成系を替えても左辺の $T_aX$ は定義により同じなので、階数も同じです。
<!-- proof-end -->

**計算例（交差する二軸）。** $X=V(xy)\subset k^2$ について $I(X)=(xy)$ です。実際 $g(x,0)=g(0,y)=0$ なら、各単項式は $x$ と $y$ をともに因子に持つため $xy\mid g$ です。$J_{xy}(a)=(a_y,a_x)$ だから原点では零行列で $T_{(0,0)}X=k^2$ ですが、$(c,0)$（$c\ne0$）では $T_{(c,0)}X=\{(u,0)\}$ です。集合の次元が1でも、原点のZariski接空間は2次元になります。

## 2. 局所環の一次情報だけを残す

Jacobian行列は便利ですが、$X$ を何次元のアフィン空間に埋め込んだかに依存した表示です。点の周りの関数だけから、座標に依存しないZariski接空間を構成できるでしょうか。

[点の局所環と単元判定](../AG1-04/index.md#thm-ag1-04-local-ring)より、$R=A_{\mathfrak m_a}$ の元は $a$ で分母が非零な分数で表され、唯一の極大イデアルは $M=\mathfrak m_aR$ です。評価 $R\to k$ の核が $M$ です。$M$ は $a$ で零になる関数、$M^2$ はその積の和、つまり少なくとも二次に消える部分です。

<a id="def-ag1-10-cotangent"></a>

<!-- formal-statement-start -->
> **定義（Zariski余Zariski接空間）**  
> $R=k[X]_{\mathfrak m_a}$、$M=\mathfrak m_aR$ とする。商 $M/M^2$ を $a$ における **Zariski余Zariski接空間** という。$M/M^2$ は $R/M\simeq k$ の作用によって $k$ ベクトル空間になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-10-cotangent -->
**定義の確認。** $X=k$（アフィン直線）、$a=0$ では $R=k[t]_{(t)}$、$M=(t)R$、$M^2=(t^2)R$ です。分母 $q(0)\ne0$ の $p(t)/q(t)\in M$ は $p(0)=0$ を満たし、$p(t)=t\,h(t)$ と書けます。$h(t)/q(t)$ と定数 $h(0)/q(0)$ の差は $t$ の倍数なので、

$$
\frac{p(t)}{q(t)}\equiv
\frac{h(0)}{q(0)}t\pmod{M^2}.
$$

$t\notin M^2$ は、もし $t=t^2 u$ なら整域 $R$ で零でない $t$ を消去して $1=tu$ となり、$t$ が非単元であることに矛盾するためです。従って $M/M^2$ の基底は $[t]$ 一個で、その双対も1次元です。
<!-- definition-example-end -->

一次情報を数値に読み替えるため、今定義した余Zariski接空間から $k$ への線形写像を集めます。

<a id="def-ag1-10-intrinsic-tangent"></a>

<!-- formal-statement-start -->
> **定義（内在的Zariski接空間）**  
> $X$ の点 $a$ の局所環を $R$、その極大イデアルを $M$ とする。$a$ における**内在的Zariski接空間**は、$M/M^2$ の $k$ 線形双対

$$
\operatorname{Hom}_k(M/M^2,k)
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-10-intrinsic-tangent -->
**定義の確認。** 上のアフィン直線の例では $M/M^2=k\,[t]$（ここで $[t]$ は剰余類を表す）です。任意の $k$ 線形写像 $\varphi:M/M^2\to k$ は $\varphi([t])=c$ を選ぶと $\varphi(d[t])=dc$ により一意に決まるため、その双対は1次元です。
<!-- definition-example-end -->

<a id="thm-ag1-10-intrinsic-tangent"></a>

<!-- formal-statement-start -->
> **定理（Jacobianの核と局所環の双対の一致）**  
> 代数閉体 $k=\mathbb C$ 上のアフィン代数的集合 $X\subseteq k^n$、点 $a\in X$ に対し、自然な $k$ 線形同型

$$
T_aX\simeq\operatorname{Hom}_k(M/M^2,k),
\qquad M=\mathfrak m_a k[X]_{\mathfrak m_a}
$$

> が存在する。同型は $v$ に対し、各多項式の $a$ における一次変化を取り出す線形写像を対応させる。
<!-- formal-statement-end -->

### 証明の見取り図

多項式には、点 $a$ の周りで定数項・一次項・二次以上の項という厳密な分解があります。$M/M^2$ では二次以上が消えるため、座標関数 $x_j-a_j$ の像が全体を生成します。その線形関係式はまさに方程式の一次部分です。

<!-- proof-start -->
### 証明

**(1) 多項式上の微分式を局所環へ延長する。** $v\in T_aX$ とし、多項式 $F$ に

$$
D_vF(a)=\sum_{j=1}^n v_j
\frac{\partial F}{\partial x_j}(a)
$$

を対応させます。$F$ と $F'$ が $A$ で等しければ $F-F'\in I(X)$ であり、$v\in T_aX$ の定義から $D_vF(a)=D_vF'(a)$ です。従って $D_v$ は $A$ 上 well-defined です。さらに積の微分則から

$$
D_v(bc)(a)=b(a)D_vc(a)+c(a)D_vb(a)
$$

です。分母 $s(a)\ne0$ に対して次の式で局所環の元へ延長します。

$$
D_v(b/s)(a)=
\frac{s(a)D_vb(a)-b(a)D_vs(a)}{s(a)^2}.
$$

表示が変わっても値が同じことを確認します。$b/s=c/t$ なら[局所化の同値関係](../AG1-04/index.md#def-ag1-04-localization)により、$u(a)\ne0$ なる $u\in A$ があり $u(bt-cs)=0$ です。点での値は $u(a)\ne0$ だから $bt-cs$ の値は0です。積の微分則を $u(bt-cs)$ に使うと、$u(a)D_v(bt-cs)(a)=0$、従ってその微分も0です。商の微分式を共通分母 $st$ に直せば差は $D_v(bt-cs)(a)/(s(a)t(a))=0$ となり、値は表示によらないことが分かります。

**(2) 二次部分で消える。** $b,c\in M$ では $b(a)=c(a)=0$ なので $D_v(bc)(a)=0$ です。よって $D_v$ は $M^2$ を消し、$M/M^2$ 上の線形写像 $\Phi_v$ を誘導します。

**(3) 座標の一次部分が生成する。** $z_j=\overline{x_j-a_j}\in A$ と置きます。任意の多項式 $F$ について二項展開を用いて各単項式を展開すれば、

$$
F(x)=F(a)+\sum_{j=1}^n
\frac{\partial F}{\partial x_j}(a)(x_j-a_j)+H(x),
$$

となり、$H$ は $(x_1-a_1,\ldots,x_n-a_n)^2$ に属します。$b/s\in M$ なら $b(a)=0$ であり、分母 $s$ は $R$ で可逆です。また

$$
\frac bs-\frac{b}{s(a)}
=\frac{b(s(a)-s)}{s\,s(a)}\in M^2
$$

なので、$M/M^2$ の任意の元は $[z_1],\ldots,[z_n]$ の $k$ 線形結合です。

**(4) 逆写像を構成する。** $\Phi\in\operatorname{Hom}_k(M/M^2,k)$ に対し $v_j=\Phi([z_j])$ と置きます。$F\in I(X)$ なら $F(a)=0$、さらに $F$ の像は $A$ で零です。(3) の展開を $M/M^2$ で読むと

$$
0=\sum_{j=1}^n\frac{\partial F}{\partial x_j}(a)[z_j]
$$

なので、$\Phi$ を適用して $\sum_j(\partial F/\partial x_j)(a)v_j=0$ を得ます。すなわち $v\in T_aX$ です。$\Phi_v([z_j])=D_v(x_j-a_j)(a)=v_j$ より (1)〜(2) の写像の逆になっています。$[z_j]$ が全体を生成するので、これらの値が一致する二つの線形写像は等しく、同型が示されました。
<!-- proof-end -->

**何が内在的なのか。** $\operatorname{Hom}_k(M/M^2,k)$ は点の局所環だけで定義でき、埋め込み座標を取り替えても同じ対象です。Jacobianはその空間を具体的に連立一次方程式として計算する装置なのです。

## 3. 正則写像はZariski接ベクトルをどう運ぶか

[正則写像の座標表示](../AG1-03/index.md#def-ag1-03-regular-map) $F=(F_1,\ldots,F_m):X\to Y\subseteq k^m$ を考えます。入力を一次だけ動かしたとき出力の一次変化はJacobianで計算できるはずです。

<a id="prop-ag1-10-tangent-map"></a>

<!-- formal-statement-start -->
> **命題（正則写像による接写像）**  
> $F:X\to Y$ が多項式成分 $F_1,\ldots,F_m$ で与えられる正則写像で、$a\in X$、$b=F(a)$ とする。行列

$$
J_F(a)=\left(\frac{\partial F_i}{\partial x_j}(a)\right)_{\substack{1\le i\le m\\1\le j\le n}}
$$

> は $T_aX$ を $T_bY$ に写す。誘導する線形写像を $dF_a:T_aX\to T_bY$ と書く。合成についても

$$
d(G\circ F)_a=dG_{F(a)}\circ dF_a
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$Y$ 上で零になる方程式 $g$ に $F$ を代入すると $g(F(x))$ は $X$ 上で零になります。この関係式に多項式の連鎖律を適用すれば、接方向が出力側の方程式を満たします。

<!-- proof-start -->
### 証明

$v\in T_aX$ とし、$w=J_F(a)v\in k^m$ と置きます。任意の $g\in I(Y)$ について $g(F(x))$ は $X$ 上の各点で零ですから $g\circ F\in I(X)$ です。多項式の連鎖律を各座標について展開すると、

$$
\frac{\partial(g\circ F)}{\partial x_j}(a)
=\sum_{i=1}^m
\frac{\partial g}{\partial y_i}(b)
\frac{\partial F_i}{\partial x_j}(a).
$$

左辺に $v_j$ を掛けて $j$ について和を取れば、$v\in T_aX$ より零となります。和の順序を交換して、

$$
0=\sum_{i=1}^m\frac{\partial g}{\partial y_i}(b)
\left(\sum_{j=1}^n\frac{\partial F_i}{\partial x_j}(a)v_j\right)
=\sum_{i=1}^m\frac{\partial g}{\partial y_i}(b)w_i.
$$

従って $w\in T_bY$ です。$G:Y\to Z$ を多項式成分で書くと、各成分について同じ連鎖律から $J_{G\circ F}(a)=J_G(b)J_F(a)$ となります。両辺を $T_aX$ のベクトルに作用させれば合成式が得られます。座標表示を別の多項式に替えても、その差は $I(X)$ に属し、方向微分はZariski接ベクトル上で零ですから $dF_a$ は表示によらず定まります。
<!-- proof-end -->

**例（尖点のパラメータ表示）。** $F:k\to V(y^2-x^3)$ を $F(t)=(t^2,t^3)$ とすると、$t^6-t^6=0$ なので確かに像は曲線に入ります。$t=0$ で $J_F(0)=(0,0)^{\mathsf T}$ です。従って $dF_0$ は零写像です。しかし後で計算するように尖点の $T_{(0,0)}X$ は2次元です。**曲線をパラメータ表示できることと、Zariski接ベクトルをすべてその微分で得られることは別**です。

## 4. Jacobianの階数から何が分かるか

<a id="prop-ag1-10-hypersurface"></a>

<!-- formal-statement-start -->
> **命題（既約超曲面の次元と一次接条件）**  
> 非定数既約多項式 $f\in k[x_1,\ldots,x_n]$ と、$X=V(f)\subseteq k^n$ を考える。$X$ の座標環は $k[x_1,\ldots,x_n]/(f)$ で、$\dim X=n-1$ である。任意の点 $a\in X$ について

$$
T_aX=
\left\{v\in k^n:
\sum_{j=1}^n\frac{\partial f}{\partial x_j}(a)v_j=0
\right\}.
$$

> $\nabla f(a)\ne0$ なら $\dim_kT_aX=n-1$、$\nabla f(a)=0$ なら $\dim_kT_aX=n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

次元は方程式を一つ持つという直感で決めず、前章の超越次数を使います。一方、Zariski接空間の次元はJacobian一行の階数で決まります。この二種類の次元を並べると、交差点や尖点で何が増えているかを数値で捉えられます。

<!-- proof-start -->
### 証明

$k[x_1,\ldots,x_n]$ は一意分解整域であり、既約元 $f$ が生成するイデアルは素です。$k$ が代数閉体なので[強零点定理](../AG1-07/index.md#thm-ag1-07-strong-nullstellensatz)から $I(V(f))=\sqrt{(f)}=(f)$ となり、座標環の記述を得ます。

$f$ が正の次数で現れる変数を $x_n$ として番号を付け直します。$f$ は $x_n$ に関して正次数なので、$(f)\cap k[x_1,\ldots,x_{n-1}]=(0)$ です。実際、$h=fq$ で $h$ が $x_n$ に依存せず、$q\ne0$ なら整域 $k[x_1,\ldots,x_{n-1}]$ 上で $\deg_{x_n}(fq)=\deg_{x_n}f+\deg_{x_n}q>0$ となり矛盾します。よって $x_1,\ldots,x_{n-1}$ の像は代数的に独立です。$f=0$ は $x_n$ の像に対する非零多項式方程式なので、商体は $k(x_1,\ldots,x_{n-1})$ 上代数的です。[アフィン整域の次元と超越次数](../AG1-09/index.md#thm-ag1-09-dimension-trdeg)から $\dim X=n-1$ です。

$(f)$ の生成元は一つなので、[生成方程式とJacobian行列](#prop-ag1-10-jacobian-kernel)より表示されたZariski接空間の式を得ます。偏微分を並べた行が非零なら行行列の階数は1で核の次元は $n-1$、零なら階数は0で核の次元は $n$ です。
<!-- proof-end -->

**比較表**

| 集合と点 | 幾何学的次元 | Jacobianの階数 | Zariski接空間の次元 |
|---|---:|---:|---:|
| $y=x^2$ の任意の点 | 1 | 1 | 1 |
| $y^2=x^3$ の原点 | 1 | 0 | 2 |
| $xy=0$ の原点 | 1 | 0 | 2 |
| $xy=0$ の $(1,0)$ | 1 | 1 | 1 |

表の二軸は可約なので上の「既約超曲面」の命題をそのまま適用する例ではありません。二軸の次元1は[成分の次元の命題](../AG1-09/index.md#prop-ag1-09-components-dimension)によるものです。Zariski接空間の列は $I(V(xy))=(xy)$ から直接計算しました。

ここまでの結果から、Jacobianの階数が小さくなる点で一次の接方向が増えることは確実に分かります。しかし、**一般の代数的集合で「Zariski接空間の次元が幾何学的次元と等しいこと」と「滑らかであること」の同値性**を主張するには、局所環の正則性や次元との比較が必要です。その判定を本章で証明なしに使わず、次章で特異点と接錐を導入して検討します。

## 5. 方程式を二乗するとZariski接空間は変わるのか

代数的集合 $V(x)$ と $V(x^2)$ はどちらも原点 $\{0\}\subset k$ ですが、Jacobianの行を形式的に作ると前者は $(1)$、後者は原点で $(0)$ です。ここで前者と後者を同じ**Zariski接空間**だと思いながら後者のJacobianを使うのは誤りです。

<a id="prop-ag1-10-radical-warning"></a>

<!-- formal-statement-start -->
> **命題（根基化と一次情報の違い）**  
> $k[x]$ のイデアル $J=(x^2)$ は $I(V(J))=(x)$ と異なる。従って、零点集合 $\{0\}$ のZariski接空間を定義するときは $I(\{0\})=(x)$ を用い、その次元は0である。一方、商環 $B=k[x]/(x^2)$ の極大イデアル $\mathfrak n=(\overline x)$ について

$$
\dim_k \mathfrak n/\mathfrak n^2=1
$$

> である。両者は異なる代数的対象の一次情報を測っている。
<!-- formal-statement-end -->

### 証明の見取り図

零点を忘れないようにする根基化は、点集合の情報を保ちますが、二重零点の「一次の厚み」は保ちません。$B$ では $\overline{x}^2=0$ でも $\overline{x}\ne0$ であることが核心です。

<!-- proof-start -->
### 証明

$x^2(t)=0$ と $t=0$ は同値ですから $V(J)=\{0\}$ です。多項式 $g$ が $0$ で零なら余りの定理により $x\mid g$ なので $I(\{0\})=(x)$ です。このイデアルを生成する $x$ の微分は1ですから、[生成方程式とJacobian行列](#prop-ag1-10-jacobian-kernel)によりZariski接空間は $\ker(1)=\{0\}$ です。

他方、$B$ における $\mathfrak n$ は $\overline x$ によって生成されます。$\overline x^2=0$ なので $\mathfrak n^2=0$、$\overline x\ne0$ なので $\mathfrak n=k\overline x$ は1次元です。従って $\mathfrak n/\mathfrak n^2=\mathfrak n$ も1次元です。二つの値を同一視する根拠はありません。
<!-- proof-end -->

この違いは前章で見た「根基化してもKrull次元は変わらない」という事実と両立します。[根基化と次元の命題](../AG1-09/index.md#prop-ag1-09-components-dimension)は**素イデアル鎖**についての結果であり、$M/M^2$ に関しては何も保証していないからです。

## 6. 演習：Jacobianと局所環を往復する

各問題で特に指定しない限り $k=\mathbb C$ です。零点集合のZariski接空間では消滅イデアル $I(X)$ を使ってください。生成元が本当に $I(X)$ を生成しているかの確認を省略しないでください。

**Level A：一次近似を直接計算する**

### A1. アフィン一次部分空間

$X=V(y-3x+2,z-x)\subseteq k^3$、$a=(1,1,1)$ とする。$I(X)$ を求め、$T_aX$ の基底と次元を求めよ。

- Level: A
- ID: AG1-10-A1

<!-- solution-start -->
**詳細解答**　$y=3x-2$、$z=x$ を代入すると $X=\{(t,3t-2,t):t\in k\}$ です。任意の多項式を $y-3x+2$ と $z-x$ で順に割って残る $x$ の多項式がすべての $t$ で零なら零多項式なので $I(X)=(y-3x+2,z-x)$ です。Jacobianは

$$
J=\begin{pmatrix}-3&1&0\\-1&0&1\end{pmatrix}.
$$

$v=(u,v_2,w)$ に $Jv=0$ を課すと $v_2=3u$、$w=u$ なので $T_aX=k(1,3,1)$、次元1です。二行は独立で階数2、$3-2=1$ と一致します。
<!-- solution-end -->

### A2. 放物線の接方向

$X=V(y-x^2)\subseteq k^2$ の $a=(2,4)$ でZariski接空間を計算し、$x=2+h$ を代入した一次部分と照合せよ。

- Level: A
- ID: AG1-10-A2

<!-- solution-start -->
**詳細解答**　$y-x^2$ は $I(X)$ を生成します（本文第1節の割り算による確認）。偏微分を並べた行は $(-2x,1)$ で $a$ では $(-4,1)$ です。従って $-4u+v=0$、すなわち $T_aX=k(1,4)$ です。また $x=2+h$、$y=4+\ell$ とすると

$$
(4+\ell)-(2+h)^2=\ell-4h-h^2.
$$

一次部分 $\ell-4h$ を零とする方向は $(h,\ell)=(h,4h)$ で、Jacobianの結果と一致します。
<!-- solution-end -->

### A3. 二軸の二種類の点

$X=V(xy)\subseteq k^2$ について $T_{(0,0)}X$ と $T_{(3,0)}X$ を求めよ。$I(X)=(xy)$ も証明せよ。

- Level: A
- ID: AG1-10-A3

<!-- solution-start -->
**詳細解答**　$g\in I(X)$ なら $g(x,0)=0$、$g(0,y)=0$ はどちらも恒等的です。$g$ を単項式で展開すると $x$ の冪が0の項も $y$ の冪が0の項も存在しないため、各単項式に $xy$ が含まれ、$g\in(xy)$ です。逆の包含は自明に零点で確認できるので $I(X)=(xy)$ です。偏微分を並べた行は $(y,x)$、原点では $(0,0)$ で核は $k^2$、$(3,0)$ では $(0,3)$ で条件は $3v=0$ です。よって $T_{(3,0)}X=k(1,0)$ です。
<!-- solution-end -->

### A4. 尖点の一次方向

$X=V(y^2-x^3)\subseteq k^2$ とする。原点と $(1,1)$ におけるJacobianおよびZariski接空間の次元を求めよ。

- Level: A
- ID: AG1-10-A4

<!-- solution-start -->
**詳細解答**　まず $I(X)=(f)$、$f=y^2-x^3$ を直接示します。$X$ の点 $(x,y)$ で $x=0$ なら $y=0$、$x\ne0$ なら $t=y/x$ と置くと $t^2=y^2/x^2=x$、$t^3=tx=y$ です。従って $X=\{(t^2,t^3):t\in k\}$ です。任意の $g\in I(X)$ を $y$ のモニック多項式 $f$ で割ると

$$
g=Q(x,y)(y^2-x^3)+p(x)+yq(x)
$$

となります。$(t^2,t^3)$ を代入すれば $p(t^2)+t^3q(t^2)=0$ がすべての $t\in k$ で成立します。左辺は多項式で、前半は偶数次数、後半は奇数次数の項だけを含むため、$p=q=0$ です。よって $g\in(f)$ となり、また $f$ は $X$ の各点で零なので、その倍数もすべて $X$ 上で零となり $(f)\subseteq I(X)$ です。両方から $I(X)=(f)$ です。偏微分を並べた行は $(-3x^2,2y)$、原点では $(0,0)$ だからZariski接空間は $k^2$ で次元2です。$(1,1)$ では $(-3,2)$ で、$-3u+2v=0$ から $T_{(1,1)}X=k(2,3)$、次元1です。
<!-- solution-end -->

**Level B：定義の不変性と局所代数**

### B1. 冗長な生成元

$X=V(y-x^2)$ のイデアルの生成系 $f_1=y-x^2$、$f_2=(x+1)(y-x^2)$ を用いて $a=(1,1)$ におけるJacobian行列を作り、二行目が新しい接条件を生まないことを示せ。

- Level: B
- ID: AG1-10-B1

<!-- solution-start -->
**詳細解答**　$f_1$ が含まれるため $(f_1,f_2)=(f_1)=I(X)$ です。$\nabla f_1(1,1)=(-2,1)$、積の微分則から $\nabla f_2=(1,0)f_1+(x+1)\nabla f_1$ です。点では $f_1(1,1)=0$ なので $\nabla f_2(1,1)=2(-2,1)=(-4,2)$ です。従って

$$
J=\begin{pmatrix}-2&1\\-4&2\end{pmatrix}
$$

の階数は1、核は $k(1,2)$ です。冗長な行は最初の行の2倍なので新しい制約はありません。
<!-- solution-end -->

### B2. 二軸の局所的な一次部分

$A=k[x,y]/(xy)$、$a=(0,0)$、$R=A_{(x,y)}$、$M=(\overline x,\overline y)R$ とする。$M/M^2$ が $[\overline x],[\overline y]$ を基底とすることを示し、Jacobianの核と照合せよ。

- Level: B
- ID: AG1-10-B2

<!-- solution-start -->
**詳細解答**　$M$ は二つの元で生成されるので $M/M^2$ は二つの像で張られます。線形結合 $c\overline x+d\overline y\in M^2$ と仮定します。$M^2$ の元は $(\overline x^2,\overline x\overline y,\overline y^2)R$ に属し、$\overline x\overline y=0$ です。局所環の各分母は原点で非零なので、各項を共通分母 $s$（$s(0)\ne0$）に直すと、多項式環で $s(cx+dy)$ は $(xy,x^2,y^2)=(x,y)^2$ に属します。$s=s(0)+(\text{一次以上})$ と展開して一次項を比べれば $s(0)(cx+dy)=0$、従って $c=d=0$ です。よって二つの像は一次独立です。$xy$ の偏微分を並べた行は原点で $(0,0)$ なので $T_aX=k^2$ であり、[局所環との同型](#thm-ag1-10-intrinsic-tangent)の両辺の次元は2と一致します。
<!-- solution-end -->

### B3. パラメータ表示と接写像

$F:k\to X=V(y^2-x^3)$、$F(t)=(t^2,t^3)$ とする。$dF_0$ の像を求め、それが $T_{(0,0)}X$ と一致しない理由を式で説明せよ。

- Level: B
- ID: AG1-10-B3

<!-- solution-start -->
**詳細解答**　$f(F(t))=(t^3)^2-(t^2)^3=t^6-t^6=0$ なので $F$ は $X$ への正則写像です。$J_F(t)=(2t,3t^2)^{\mathsf T}$ なので $dF_0(u)=(0,0)$ で像は零部分空間です。一方 $I(X)=(y^2-x^3)$ はA4で確認した通りで、$J_f(0,0)=(0,0)$ です。従って $T_{(0,0)}X=\ker J_f(0,0)=k^2$ です。パラメータ $t$ の一次変化は $t^2,t^3$ に現れないため、接写像は零でも曲線のZariski接空間は2次元になり得ます。
<!-- solution-end -->

### B4. 一つの方程式と幾何学的次元

$X=V(z-x^2-y^2)\subseteq k^3$ で、$\dim X$、任意の点におけるZariski接空間の次元を求め、具体的に $a=(1,2,5)$ における基底を与えよ。

- Level: B
- ID: AG1-10-B4

<!-- solution-start -->
**詳細解答**　$z-x^2-y^2$ は $z$ に関して一次なので既約です。また $z$ を $x^2+y^2$ に代入する写像から $k[X]\simeq k[x,y]$ を得ます。[次元定理](../AG1-09/index.md#thm-ag1-09-dimension-trdeg)から $\dim X=2$ です。偏微分を並べた行 $(-2x,-2y,1)$ の第三成分は全点で1だから階数は常に1です。ゆえにZariski接空間は3変数1条件の核で次元2です。点 $a$ では $-2u-4v+w=0$ なので $w=2u+4v$、基底は $(1,0,2)$、$(0,1,4)$ です。
<!-- solution-end -->

**Level C：複数の定義を統合する**

### C1. Zariski接空間と根基化を区別する

$X=V(xy)\subseteq k^2$、$a=(0,0)$ と、$B=k[x,y]/(x^2,xy,y^2)$ の極大イデアル $N=(\overline x,\overline y)$ を考える。(1) $X$ の幾何学的次元と $T_aX$ の次元を求めよ。(2) $N/N^2$ の次元を求めよ。(3) $B$ の定義イデアルの零点集合 $V(x^2,xy,y^2)$ のZariski接空間を計算し、(2) と一致させてはならない理由を説明せよ。

- Level: C
- ID: AG1-10-C1

<!-- solution-start -->
**詳細解答**　**(1)** $X$ は二本の直線 $V(x)\cup V(y)$ の和で、それぞれの座標環は $k[y]$ と $k[x]$ です。[可約な集合の次元](../AG1-09/index.md#prop-ag1-09-components-dimension)から $\dim X=1$ です。$I(X)=(xy)$ はA3で証明した通りで、$\nabla(xy)(0,0)=(0,0)$ より $T_aX=k^2$、次元2です。

**(2)** $B$ では $\overline x^2=\overline x\overline y=\overline y^2=0$ であり、$N^2=0$ です。$1,\overline x,\overline y$ は $B$ の $k$ 基底です。実際、線形項は次数2以上のイデアルに属せず一次独立で、すべての次数2以上の単項式が零になるからです。従って $N=k\overline x\oplus k\overline y$ で、$\dim_kN/N^2=2$ です。

**(3)** $V(x^2,xy,y^2)$ では $x^2=0$ と $y^2=0$ から $x=y=0$、従って集合は $\{(0,0)\}$ です。その消滅イデアルは $(x,y)$ で、Jacobianは単位行列

$$
\begin{pmatrix}1&0\\0&1\end{pmatrix}
$$

ですから集合のZariski接空間は零部分空間で次元0です。$B$ の極大イデアルの余Zariski接空間は冪零元 $\overline x,\overline y$ を保持しますが、点集合の座標環 $k[x,y]/(x,y)\simeq k$ はこれらを殺します。「零点集合に対するJacobian」と「冪零元を含む商環の余Zariski接空間」を取り違えることが誤りの原因です。
<!-- solution-end -->

### C2. 二つの表示で同じ接方向を計算する

$X=V(y-x^2)\subseteq k^2$ とし、$F:k\to X$ を $F(t)=(t,t^2)$、$G:X\to k$ を $G(x,y)=x$ とする。(1) $dF_s$、$dG_{(s,s^2)}$ を座標表示で計算せよ。(2) $G\circ F=\mathrm{id}_k$、$F\circ G=\mathrm{id}_X$ を点で確認し、各接写像の合成が恒等写像となることを示せ。(3) $s=0$ でも結論が成り立つことを説明せよ。

- Level: C
- ID: AG1-10-C2

<!-- solution-start -->
**詳細解答**　**(1)** $J_F(s)=(1,2s)^{\mathsf T}$ なので $dF_s(u)=(u,2su)$ です。$J_G=(1,0)$ なので $dG_{(s,s^2)}(u,v)=u$ です。$T_{(s,s^2)}X=\{(u,2su):u\in k\}$ は本文第1節で証明しましたから、両写像は表示したZariski接空間の間で確かに定義されます。

**(2)** 任意の $t$ で $G(F(t))=t$ です。また任意の $(x,y)\in X$ では $y=x^2$ なので $F(G(x,y))=(x,x^2)=(x,y)$ です。Zariski接ベクトルについて具体的に

$$
dG_{F(s)}(dF_s(u))=dG_{F(s)}(u,2su)=u
$$

および

$$
dF_s(dG_{F(s)}(u,2su))=dF_s(u)=(u,2su)
$$

が成り立ちます。これは[接写像の合成則](#prop-ag1-10-tangent-map)の具体的検算です。

**(3)** $s=0$ を代入すると $dF_0(u)=(u,0)$、$dG_{(0,0)}(u,0)=u$ で、上の二つの式はそのまま成立します。尖点の $t\mapsto(t^2,t^3)$ と違い、この表示には一次項 $t$ が残るため接写像は零になりません。
<!-- solution-end -->

## 7. 次章に進む前に

本章で、方程式の一次項を取り出すJacobianの核と、局所環の $M/M^2$ の双対が一致することを証明しました。さらに、Zariski接空間の次元が局所的な方程式の一次独立条件の数で変化すること、同じ点集合を表す非根基的な方程式を混ぜると別の一次情報を測ってしまうことを確認しました。

AG1-11では、この一次情報で捉えられない高次の項も調べ、特異点と接錐を定義します。特に尖点と交点を「Zariski接空間が2次元」という共通点だけでなく、二次・三次の最初の非零項によって区別します。
