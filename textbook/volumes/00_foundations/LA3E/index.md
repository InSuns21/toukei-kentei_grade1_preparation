# LA3E 標準線形代数 III-E：多重線形代数の代数的基礎

ベクトルや線形写像だけでは、多様体上で現れる「面積要素」「体積要素」「微分形式」をまだ統一的に書けません。

たとえば二つの線形形式
$$
\alpha,\beta\in V^*
$$
から
$$
(v,w)\longmapsto \alpha(v)\beta(w)
$$
という二重線形な量は作れます。しかし、このような多重線形な量を毎回「引数を何個も持つ写像」として扱うだけでは、積や基底を含む演算体系を一つの代数として整理できません。

この章では、その受け皿として

$$
V\otimes W,\qquad
T^r_s(V),\qquad
\Lambda^kV^*
$$

を構成します。最終的な目的は、GEO7 で微分形式を導入するときに

$$
\alpha\wedge\beta,\qquad
\iota_v\omega
$$

を「記号上の約束」ではなく、有限次元線形代数から自然に出てくる演算として使えるようにすることです。

体はこの章を通して $\mathbb F=\mathbb R$ または $\mathbb C$ とします。

---

## 1. 二重線形写像を線形写像として受け止める

線形代数では線形写像を扱う道具がよく整っています。一方で

$$
b:V\times W\to U
$$

が二重線形でも、直積 $V\times W$ を普通のベクトル空間とみたときの線形写像ではありません。実際、

$$
b(v_1+v_2,w)=b(v_1,w)+b(v_2,w)
$$

と

$$
b(v,w_1+w_2)=b(v,w_1)+b(v,w_2)
$$

は成り立っても、

$$
b((v_1,w_1)+(v_2,w_2))
$$

には交差項がありません。

そこで「二重線形性を最初から組み込んだ空間」を作ります。

<a id="def-la3e-tensor-product"></a>
<!-- formal-statement-start -->
> **定義（テンソル積）**  
> ベクトル空間 $V,W$ に対し、ベクトル空間 $T$ と二重線形写像
$$
\tau:V\times W\to T
$$
> の組が次の普遍性を満たすとする。任意のベクトル空間 $U$ と任意の二重線形写像
$$
b:V\times W\to U
$$
> に対して、一意な線形写像 $\widetilde b:T\to U$ が存在し、
$$
b=\widetilde b\circ\tau
$$
> となる。このとき $T$ を $V$ と $W$ の **テンソル積** といい $V\otimes W$ と書く。$\tau(v,w)$ は $v\otimes w$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-tensor-product -->
### 例：$\mathbb R\otimes\mathbb R$ は $\mathbb R$ でよい

**定義の確認**
$T=\mathbb R$ とし

$$
\tau(x,y)=xy
$$

と置きます。これは二重線形です。

任意の二重線形写像 $b:\mathbb R\times\mathbb R\to U$ に対して、

$$
b(x,y)=xy\,b(1,1)
$$

です。そこで

$$
\widetilde b(t)=t\,b(1,1)
$$

と置けば線形で、

$$
\widetilde b(\tau(x,y))
=\widetilde b(xy)
=xy\,b(1,1)
=b(x,y)
$$

となります。

さらに $\widetilde b(1)=b(1,1)$ でなければならないので $\widetilde b$ は一意です。したがってこの $T$ と $\tau$ は定義の普遍性を実際に満たします。
<!-- definition-example-end -->

普遍性の要点は、

> 二重線形写像を調べる問題を、$V\otimes W$ から出る線形写像を調べる問題へ変換する

ことです。

---

## 2. テンソル積は本当に存在する

有限次元なら、基底を使って具体的に構成できます。

<a id="thm-la3e-tensor-product-existence-basis"></a>
<!-- formal-statement-start -->
> **定理（有限次元テンソル積の存在と基底）**  
> $V,W$ を有限次元ベクトル空間とし、
$$
e_1,\dots,e_m,\qquad
f_1,\dots,f_n
$$
> をそれぞれの基底とする。このときテンソル積 $V\otimes W$ が存在し、
$$
\{e_i\otimes f_j:1\le i\le m,\ 1\le j\le n\}
$$
> はその基底になる。従って
$$
\dim(V\otimes W)=mn.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$m n$ 個の記号 $e_i\otimes f_j$ を基底とするベクトル空間を先に作り、一般の $v,w$ に対する $v\otimes w$ を座標展開で定めます。その後、任意の二重線形写像 $b$ が基底対 $(e_i,f_j)$ 上の値だけで決まることを使って普遍性を示します。

<!-- proof-start -->
### 証明

$m n$ 個の記号 $E_{ij}$ を基底とするベクトル空間

$$
T=\operatorname{span}\{E_{ij}:1\le i\le m,\ 1\le j\le n\}
$$

を取ります。

任意の

$$
v=\sum_{i=1}^m x_i e_i,\qquad
w=\sum_{j=1}^n y_j f_j
$$

に対し

$$
\tau(v,w)
=
\sum_{i=1}^m\sum_{j=1}^n x_i y_j E_{ij}
$$

と定めます。座標 $x_i,y_j$ は基底表示の一意性により一意なので、$\tau$ は well-defined です。また係数が各変数について線形に変化するため $\tau$ は二重線形です。

ここで $E_{ij}$ を $e_i\otimes f_j$ と書くことにします。

任意の二重線形写像

$$
b:V\times W\to U
$$

を取ります。$T$ の基底上で

$$
\widetilde b(e_i\otimes f_j)=b(e_i,f_j)
$$

と指定すれば、線形写像 $\widetilde b:T\to U$ が一意に定まります。

実際、

$$
\begin{aligned}
\widetilde b(\tau(v,w))
&=
\widetilde b\left(
\sum_{i,j}x_i y_j(e_i\otimes f_j)
\right)\\
&=
\sum_{i,j}x_i y_j b(e_i,f_j)\\
&=
b\left(\sum_i x_i e_i,\sum_j y_j f_j\right)\\
&=
b(v,w).
\end{aligned}
$$

従って

$$
b=\widetilde b\circ\tau.
$$

一意性も確認します。もし線形写像 $L:T\to U$ が

$$
b=L\circ\tau
$$

を満たすなら、

$$
L(e_i\otimes f_j)
=
L(\tau(e_i,f_j))
=
b(e_i,f_j)
$$

です。$e_i\otimes f_j$ は $T$ の基底なので、$L$ はこの値だけで一意に決まります。

したがって $(T,\tau)$ はテンソル積の普遍性を満たし、構成から $e_i\otimes f_j$ が基底です。よって

$$
\dim(V\otimes W)=mn.
$$

$\square$
<!-- proof-end -->

<a id="thm-la3e-tensor-product-uniqueness"></a>
<!-- formal-statement-start -->
> **定理（テンソル積の一意性）**  
> $(T,\tau)$ と $(T',\tau')$ がともに $V,W$ のテンソル積の普遍性を満たすなら、
$$
\Phi:T\to T'
$$
> で
$$
\Phi(\tau(v,w))=\tau'(v,w)
$$
> を満たす線形同型 $\Phi$ が一意に存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T$ の普遍性を、二重線形写像 $\tau':V\times W\to T'$ に適用します。一意な線形写像

$$
\Phi:T\to T'
$$

が存在して

$$
\Phi\circ\tau=\tau'
$$

となります。

同様に $T'$ の普遍性から、一意な線形写像

$$
\Psi:T'\to T
$$

が存在して

$$
\Psi\circ\tau'=\tau
$$

となります。

すると

$$
(\Psi\circ\Phi)\circ\tau
=
\Psi\circ\tau'
=
\tau.
$$

一方、恒等写像 $\operatorname{id}_T$ も

$$
\operatorname{id}_T\circ\tau=\tau
$$

を満たします。$T$ の普遍性における一意性から

$$
\Psi\circ\Phi=\operatorname{id}_T.
$$

同様に

$$
\Phi\circ\Psi=\operatorname{id}_{T'}.
$$

従って $\Phi$ は線形同型です。また $\Phi\circ\tau=\tau'$ を満たす線形写像自体が普遍性により一意なので、同型も一意です。$\square$
<!-- proof-end -->

この定理により、基底を使って一度構成したテンソル積を、その後は基底に依存しない対象として扱えます。

---

## 3. 1項で書けるテンソルと一般のテンソル

<a id="def-la3e-simple-tensor"></a>
<!-- formal-statement-start -->
> **定義（単純テンソル）**  
> $V\otimes W$ の元のうち、ある $v\in V,w\in W$ を用いて
$$
v\otimes w
$$
> と1項で書けるものを **単純テンソル** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-simple-tensor -->
### 例：1項で書けるものと書けないもの

**定義の確認**
$\mathbb R^2$ の標準基底を $e_1,e_2$ とします。

$$
(e_1+e_2)\otimes e_1
=
e_1\otimes e_1+e_2\otimes e_1
$$

は見かけ上2項でも単純テンソルです。

一方

$$
u=e_1\otimes e_1+e_2\otimes e_2
$$

は単純テンソルではありません。もし

$$
u=(ae_1+be_2)\otimes(ce_1+de_2)
$$

なら係数比較から

$$
ac=1,\qquad ad=0,\qquad bc=0,\qquad bd=1
$$

が必要です。$ac=1$ から $a,c\ne0$ なので $ad=0$ から $d=0$。しかし $bd=1$ に矛盾します。
<!-- definition-example-end -->

テンソル積の一般の元は単純テンソルの有限和です。「$\otimes$ があるから全部1項」と思わないことが重要です。

---

## 4. 共変・反変テンソル

LA3A では代数的双対 $V^*$ を導入しました。$V$ と $V^*$ を何個ずつ掛けるかで、テンソルの型を整理できます。

<a id="def-la3e-rs-tensor"></a>
<!-- formal-statement-start -->
> **定義（$(r,s)$ 型テンソル）**  
> 有限次元ベクトル空間 $V$ に対し
$$
T^r_s(V)
=
V^{\otimes r}\otimes(V^*)^{\otimes s}
$$
> の元を **$(r,s)$ 型テンソル** という。$r$ を反変次数、$s$ を共変次数という。
>
> 自然な同一視により、$(r,s)$ 型テンソルは
$$
(V^*)^r\times V^s\to\mathbb F
$$
> という多重線形写像として評価できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-rs-tensor -->
### 例：$v\otimes\alpha$ は $(1,1)$ 型テンソル

**定義の確認**
$v\in V,\alpha\in V^*$ とします。

$$
v\otimes\alpha\in V\otimes V^*=T^1_1(V)
$$

であり、$\lambda\in V^*,w\in V$ に対して

$$
(v\otimes\alpha)(\lambda,w)
=
\lambda(v)\alpha(w)
$$

と評価します。

各変数について線形なので、確かに $(V^*)\times V$ 上の二重線形写像です。
<!-- definition-example-end -->

基底 $e_1,\dots,e_n$ と双対基底 $\varepsilon^1,\dots,\varepsilon^n$ を取れば、

$$
e_{i_1}\otimes\cdots\otimes e_{i_r}
\otimes
\varepsilon^{j_1}\otimes\cdots\otimes\varepsilon^{j_s}
$$

が $T^r_s(V)$ の基底になります。したがって

$$
\dim T^r_s(V)=n^{r+s}.
$$

---

## 5. 上付きと下付きを1組消す

テンソルの「添字を1組足し合わせる」操作は、基底計算の偶然ではありません。根にあるのは評価写像

$$
V^*\times V\to\mathbb F,\qquad
(\alpha,v)\mapsto \alpha(v)
$$

です。

<a id="def-la3e-tensor-pairing"></a>
<!-- formal-statement-start -->
> **定義（評価写像による因子消去）**  
> 評価写像の普遍性から得られる線形写像
$$
C:V^*\otimes V\to\mathbb F,\qquad
C(\alpha\otimes v)=\alpha(v)
$$
> を基本の **因子消去写像** という。
>
> 一般の $(r,s)$ 型テンソルでは、1個の $V$ 因子と1個の $V^*$ 因子にこの評価を適用し、他の因子を残すことで
$$
T^r_s(V)\to T^{r-1}_{s-1}(V)
$$
> を得る。この操作をここでは **因子消去** と呼ぶ。
<!-- formal-statement-end -->

これは [VC7 で定義した縮約](../VC7/index.md#def-vc7-contraction) を、$V$ と $V^*$ の自然な評価から座標に依存せず説明する仕組みです。ここでは依存を逆転させないため、VC7 の成分表示を証明には使いません。

<!-- definition-example-start: def-la3e-tensor-pairing -->
### 例：線形作用素の因子を消去すると対角成分の和になる

**定義の確認**
基底 $e_i$ と双対基底 $\varepsilon^i$ を取り、線形作用素 $A:V\to V$ を

$$
A
\longleftrightarrow
\sum_{i,j}A^i{}_j\,e_i\otimes\varepsilon^j
$$

と表します。

$e_i$ と $\varepsilon^j$ を評価して因子を消去すると

$$
\sum_{i,j}A^i{}_j\,\varepsilon^j(e_i)
=
\sum_{i,j}A^i{}_j\,\delta_i^j
=
\sum_i A^i{}_i
=
\operatorname{tr}A.
$$

したがって $\operatorname{tr}A$ と書かれる対角成分の和は、$V$ と $V^*$ の自然な評価を行った結果です。
<!-- definition-example-end -->

---

## 6. 交代的な多重線形形式を作る

微分形式では、引数を交換したとき符号が反転するテンソルだけを使います。LA3D では最高次数の交代形式を扱いましたが、ここでは任意次数へ広げます。

<a id="def-la3e-antisymmetrization"></a>
<!-- formal-statement-start -->
> **定義（交代化）**  
> $A:V^k\to\mathbb F$ を $k$ 重線形形式とする。$A$ の **交代化** を
$$
(\operatorname{Alt}A)(v_1,\dots,v_k)
=
\frac{1}{k!}
\sum_{\sigma\in S_k}
\operatorname{sgn}(\sigma)
A(v_{\sigma(1)},\dots,v_{\sigma(k)})
$$
> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-antisymmetrization -->
### 例：二重線形形式の交代化

**定義の確認**
$k=2$ では

$$
(\operatorname{Alt}A)(v,w)
=
\frac12\{A(v,w)-A(w,v)\}.
$$

引数を交換すると

$$
(\operatorname{Alt}A)(w,v)
=
-\frac12\{A(v,w)-A(w,v)\}
=
-(\operatorname{Alt}A)(v,w),
$$

となり、実際に交代的です。
<!-- definition-example-end -->

<a id="prop-la3e-alt-projection"></a>
<!-- formal-statement-start -->
> **命題（交代化は射影）**  
> 任意の $k$ 重線形形式 $A$ に対して $\operatorname{Alt}A$ は交代的であり、
$$
\operatorname{Alt}(\operatorname{Alt}A)=\operatorname{Alt}A.
$$
> 特に $A$ が既に交代的なら $\operatorname{Alt}A=A$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず置換 $\tau\in S_k$ により入力を並べ替えます。

$$
\begin{aligned}
(\operatorname{Alt}A)(v_{\tau(1)},\dots,v_{\tau(k)})
&=
\frac1{k!}
\sum_{\sigma\in S_k}
\operatorname{sgn}(\sigma)
A(v_{\tau(\sigma(1))},\dots,v_{\tau(\sigma(k))}).
\end{aligned}
$$

$\rho=\tau\circ\sigma$ と置くと $\sigma=\tau^{-1}\circ\rho$ なので

$$
\operatorname{sgn}(\sigma)
=
\operatorname{sgn}(\tau)\operatorname{sgn}(\rho).
$$

従って

$$
(\operatorname{Alt}A)(v_{\tau(1)},\dots,v_{\tau(k)})
=
\operatorname{sgn}(\tau)
(\operatorname{Alt}A)(v_1,\dots,v_k).
$$

よって $\operatorname{Alt}A$ は交代的です。

次に交代的な $B$ に対しては

$$
B(v_{\sigma(1)},\dots,v_{\sigma(k)})
=
\operatorname{sgn}(\sigma)B(v_1,\dots,v_k)
$$

なので

$$
\begin{aligned}
(\operatorname{Alt}B)(v_1,\dots,v_k)
&=
\frac1{k!}
\sum_{\sigma\in S_k}
\operatorname{sgn}(\sigma)^2
B(v_1,\dots,v_k)\\
&=
\frac1{k!}\cdot k!\,B(v_1,\dots,v_k)\\
&=
B(v_1,\dots,v_k).
\end{aligned}
$$

$B=\operatorname{Alt}A$ とすれば

$$
\operatorname{Alt}(\operatorname{Alt}A)=\operatorname{Alt}A.
$$

$\square$
<!-- proof-end -->

<a id="def-la3e-exterior-power"></a>
<!-- formal-statement-start -->
> **定義（外冪）**  
> $V$ 上の交代 $k$ 重線形形式全体を
$$
\Lambda^kV^*
$$
> と書き、$V^*$ の **第 $k$ 外冪** という。約束として
$$
\Lambda^0V^*=\mathbb F
$$
> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-exterior-power -->
### 例：$\Lambda^2(\mathbb R^2)^*$

**定義の確認**
標準基底を $e_1,e_2$ とします。交代二重線形形式 $\omega$ を1つ取り、

$$
c=\omega(e_1,e_2)
$$

と置きます。

任意の

$$
v=v_1e_1+v_2e_2,
\qquad
w=w_1e_1+w_2e_2
$$

に対し、多重線形性と交代性から

$$
\begin{aligned}
\omega(v,w)
&=
v_1w_2\,\omega(e_1,e_2)
+
v_2w_1\,\omega(e_2,e_1)\\
&=
c(v_1w_2-v_2w_1).
\end{aligned}
$$

したがって $\omega$ は1個のスカラー $c$ だけで決まります。逆に任意の $c\in\mathbb F$ に対して

$$
\omega_c(v,w)=c(v_1w_2-v_2w_1)
$$

は交代二重線形形式です。

よって

$$
\dim\Lambda^2(\mathbb R^2)^*=1.
$$

次節で導入する積記号をまだ使わずに、この空間の定義そのものから確認できました。
<!-- definition-example-end -->

---

## 7. 交代形式どうしを掛ける

$p$ 次形式と $q$ 次形式を掛けて $(p+q)$ 次形式を作ります。

$(p,q)$-シャッフルとは、

$$
\sigma(1)<\cdots<\sigma(p),
\qquad
\sigma(p+1)<\cdots<\sigma(p+q)
$$

を満たす $\sigma\in S_{p+q}$ のことです。その集合を $\operatorname{Sh}(p,q)$ と書きます。

<a id="def-la3e-wedge-product"></a>
<!-- formal-statement-start -->
> **定義（外積）**  
> $\alpha\in\Lambda^pV^*$、$\beta\in\Lambda^qV^*$ に対し、その **外積（ウェッジ積）**
$$
\alpha\wedge\beta\in\Lambda^{p+q}V^*
$$
> を
$$
(\alpha\wedge\beta)(v_1,\dots,v_{p+q})
=
\sum_{\sigma\in\operatorname{Sh}(p,q)}
\operatorname{sgn}(\sigma)
\alpha(v_{\sigma(1)},\dots,v_{\sigma(p)})
\beta(v_{\sigma(p+1)},\dots,v_{\sigma(p+q)})
$$
> で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-wedge-product -->
### 例：平面の面積形式

**定義の確認**
$\alpha=\varepsilon^1,\beta=\varepsilon^2$ とします。$p=q=1$ なのでシャッフルは恒等置換と交換の2個です。

$$
(\varepsilon^1\wedge\varepsilon^2)(v,w)
=
\varepsilon^1(v)\varepsilon^2(w)
-
\varepsilon^1(w)\varepsilon^2(v).
$$

$v=(v_1,v_2)^T,w=(w_1,w_2)^T$ なら

$$
(\varepsilon^1\wedge\varepsilon^2)(v,w)
=
v_1w_2-v_2w_1.
$$

これは LA3D で使った符号付き面積そのものです。
<!-- definition-example-end -->

1次形式 $\alpha_1,\dots,\alpha_k$ については、外積を繰り返すと

$$
(\alpha_1\wedge\cdots\wedge\alpha_k)(v_1,\dots,v_k)
=
\det[\alpha_i(v_j)]_{i,j=1}^k
$$

となります。これが行列式と外積代数の直接の接点です。

<a id="thm-la3e-exterior-basis-dimension"></a>
<!-- formal-statement-start -->
> **定理（外冪の標準基底と次元）**  
> $\dim V=n$ とし、$\varepsilon^1,\dots,\varepsilon^n$ を $V^*$ の双対基底とする。$0\le k\le n$ について
$$
\varepsilon^{i_1}\wedge\cdots\wedge\varepsilon^{i_k},
\qquad
1\le i_1<\cdots<i_k\le n
$$
> は $\Lambda^kV^*$ の基底である。従って
$$
\dim\Lambda^kV^*
=
\binom nk.
$$
> また $k>n$ なら $\Lambda^kV^*=\{0\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

交代形式は、基底ベクトルを互いに異なる添字で入れた値だけで決まります。その値を「どの $k$ 個の添字を選んだか」で整理すると $\binom nk$ 個あります。外積基底は、双対基底の関係 $\varepsilon^i(e_j)=\delta^i_j$ を使って、それぞれの選び方を0と1からなる行列式として読み分けます。

<!-- proof-start -->
### 証明

任意の $\omega\in\Lambda^kV^*$ を取ります。

多重線形性により、$\omega$ は

$$
\omega(e_{j_1},\dots,e_{j_k})
$$

の値で決まります。交代性から添字が重複する値は0です。また互いに異なる添字については、昇順に並べ替えれば符号を除いて

$$
\omega(e_{i_1},\dots,e_{i_k}),
\qquad
i_1<\cdots<i_k
$$

のどれかになります。

一方、

$$
\eta_I
=
\varepsilon^{i_1}\wedge\cdots\wedge\varepsilon^{i_k},
\qquad
I=(i_1<\cdots<i_k)
$$

と置くと、行列式表示から

$$
\eta_I(e_{j_1},\dots,e_{j_k})
=
\det[\delta^{i_a}_{j_b}]_{a,b=1}^k.
$$

特に $J=(j_1<\cdots<j_k)$ も昇順なら

$$
\eta_I(e_{j_1},\dots,e_{j_k})
=
\begin{cases}
1,& I=J,\\
0,& I\ne J.
\end{cases}
$$

従って

$$
\omega
=
\sum_{I}
\omega(e_{i_1},\dots,e_{i_k})\,\eta_I.
$$

よって $\eta_I$ たちは $\Lambda^kV^*$ を張ります。

また

$$
\sum_I c_I\eta_I=0
$$

とし、両辺を $(e_{i_1},\dots,e_{i_k})$ に評価すれば $c_I=0$ です。従って一次独立です。

したがって $\eta_I$ たちは基底で、その個数は $n$ 個から $k$ 個を選ぶ組合せの数

$$
\binom nk
$$

です。

$k>n$ では $k$ 個の基底添字を全て異ならせることができません。したがって任意の交代 $k$ 重線形形式は基底入力上で全て0となり、多重線形性から恒等的に0です。$\square$
<!-- proof-end -->

---

## 8. 外積の代数法則

外積が実用的なのは、次数を覚えておけば符号を体系的に管理できるからです。

<a id="thm-la3e-wedge-algebra-laws"></a>
<!-- formal-statement-start -->
> **定理（外積の結合性と次数付き交換則）**  
> $\alpha\in\Lambda^pV^*$、$\beta\in\Lambda^qV^*$、$\gamma\in\Lambda^rV^*$ とする。このとき
$$
(\alpha\wedge\beta)\wedge\gamma
=
\alpha\wedge(\beta\wedge\gamma),
$$
> および
$$
\alpha\wedge\beta
=
(-1)^{pq}\beta\wedge\alpha
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

結合性では、$p+q+r$ 個の入力を「$\alpha$ に渡す $p$ 個」「$\beta$ に渡す $q$ 個」「$\gamma$ に渡す $r$ 個」へ順序を保って分配する方法を数えます。どちらの括弧付けでも最終的に同じ $(p,q,r)$-シャッフルをちょうど1回ずつ数えます。

交換則では、$p$ 個のブロックと $q$ 個のブロックを丸ごと入れ替えると $pq$ 回の隣接交換が必要なので $(-1)^{pq}$ が出ます。

<!-- proof-start -->
### 証明

まず結合性を示します。

$(p,q,r)$-シャッフルを、各ブロック内の順序を保つ置換

$$
\sigma\in S_{p+q+r}
$$

で

$$
\sigma(1)<\cdots<\sigma(p),
$$

$$
\sigma(p+1)<\cdots<\sigma(p+q),
$$

$$
\sigma(p+q+1)<\cdots<\sigma(p+q+r)
$$

を満たすものとします。

$(\alpha\wedge\beta)\wedge\gamma$ を定義で展開すると、最初に $(p+q,r)$-シャッフルで入力を二群へ分け、前半 $p+q$ 個をさらに $(p,q)$-シャッフルで二群へ分けます。

この「二段階の選択」は、最終的に $\alpha,\beta,\gamma$ へ渡す位置をそれぞれ $p,q,r$ 個選び、各群内の順序を保つことと同値です。従って $(p,q,r)$-シャッフルと一対一に対応します。

置換の符号は合成に対して乗法的なので、二段階で現れる符号の積は対応する $(p,q,r)$-シャッフルの符号そのものです。従って

$$
((\alpha\wedge\beta)\wedge\gamma)(v_1,\dots,v_{p+q+r})
$$

は

$$
\sum_{\sigma\in\operatorname{Sh}(p,q,r)}
\operatorname{sgn}(\sigma)
\alpha(v_{\sigma(1)},\dots,v_{\sigma(p)})
\beta(v_{\sigma(p+1)},\dots,v_{\sigma(p+q)})
\gamma(v_{\sigma(p+q+1)},\dots,v_{\sigma(p+q+r)})
$$

に等しいです。

$\alpha\wedge(\beta\wedge\gamma)$ も、先に $(p,q+r)$、次に $(q,r)$ と分けるだけで、同じ $(p,q,r)$-シャッフルの和になります。よって結合性が成り立ちます。

次に交換則を示します。$(p,q)$-シャッフル $\sigma$ に対し、前の $p$ 個のブロックと後ろの $q$ 個のブロックを入れ替えた $(q,p)$-シャッフルを対応させます。

このブロック交換では、$\alpha$ 側の各 $p$ 個の要素が $\beta$ 側の各 $q$ 個の要素を1回ずつまたぐため、隣接交換は合計 $pq$ 回です。従って対応する置換の符号は $(-1)^{pq}$ 倍されます。

シャッフル和をこの対応で項ごとに移せば

$$
\alpha\wedge\beta
=
(-1)^{pq}\beta\wedge\alpha.
$$

$\square$
<!-- proof-end -->

特に $p=q=1$ なら

$$
\alpha\wedge\beta=-\beta\wedge\alpha,
$$

したがって

$$
\alpha\wedge\alpha=0.
$$

一方、2次形式 $\omega$ では

$$
\omega\wedge\omega
=
(-1)^{2\cdot2}\omega\wedge\omega
=
\omega\wedge\omega
$$

なので、次数付き交換則だけからは0になりません。偶数次数と奇数次数で挙動が変わる点が重要です。

---

## 9. 1項の積で書ける形式

<a id="def-la3e-decomposable-form"></a>
<!-- formal-statement-start -->
> **定義（分解可能形式）**  
> $\omega\in\Lambda^kV^*$ が1次形式 $\alpha_1,\dots,\alpha_k\in V^*$ を用いて
$$
\omega=\alpha_1\wedge\cdots\wedge\alpha_k
$$
> と書けるとき、$\omega$ を **分解可能な $k$ 次形式** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-decomposable-form -->
### 例：$\mathbb R^4$ では全ての2次形式が分解可能ではない

**定義の確認**
$$
\omega
=
\varepsilon^1\wedge\varepsilon^2
+
\varepsilon^3\wedge\varepsilon^4
$$

とします。

もし $\omega=\alpha\wedge\beta$ と分解できるなら

$$
\omega\wedge\omega
=
\alpha\wedge\beta\wedge\alpha\wedge\beta
=0
$$

です。途中で $\alpha$ を同じ位置へ移すとき符号が変わるだけで、最後は $\alpha\wedge\alpha=0$ を含みます。

しかし実際には

$$
\begin{aligned}
\omega\wedge\omega
&=
(\varepsilon^1\wedge\varepsilon^2)
\wedge
(\varepsilon^3\wedge\varepsilon^4)
+
(\varepsilon^3\wedge\varepsilon^4)
\wedge
(\varepsilon^1\wedge\varepsilon^2)\\
&=
2\,
\varepsilon^1\wedge\varepsilon^2\wedge
\varepsilon^3\wedge\varepsilon^4
\ne0.
\end{aligned}
$$

従ってこの $\omega$ は分解可能ではありません。
<!-- definition-example-end -->

---

## 10. 最高次形式と行列式

LA3D では、最高次交代形式全体が1次元であり、線形写像の抽象行列式をその倍率として定義しました。

ここでは外積基底を使うと、その構造が一行の行列式になります。

<a id="thm-la3e-top-form-change-of-basis"></a>
<!-- formal-statement-start -->
> **定理（最高次外積と基底変換）**  
> $\dim V=n$ とし、基底 $e_1,\dots,e_n$ と双対基底 $\varepsilon^1,\dots,\varepsilon^n$ を取る。
$$
\Omega=\varepsilon^1\wedge\cdots\wedge\varepsilon^n
$$
> とする。別の基底を
$$
e'_j=\sum_{i=1}^n A_{ij}e_i
$$
> と書くと
$$
\Omega(e'_1,\dots,e'_n)=\det A.
$$
> また $e'_1,\dots,e'_n$ の双対基底を $\varepsilon'^1,\dots,\varepsilon'^n$ とすると
$$
\varepsilon'^1\wedge\cdots\wedge\varepsilon'^n
=
(\det A)^{-1}
\varepsilon^1\wedge\cdots\wedge\varepsilon^n.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

外積の行列式表示から

$$
\Omega(e'_1,\dots,e'_n)
=
\det[\varepsilon^i(e'_j)]_{i,j=1}^n.
$$

ところが

$$
e'_j=\sum_i A_{ij}e_i
$$

なので

$$
\varepsilon^i(e'_j)=A_{ij}.
$$

従って

$$
\Omega(e'_1,\dots,e'_n)=\det A.
$$

次に

$$
\Omega'
=
\varepsilon'^1\wedge\cdots\wedge\varepsilon'^n
$$

と置きます。最高次交代形式全体が1次元であることは
[LA3D の最高次交代形式は1次元](../LA3D/index.md#thm-la3d-top-alternating-one-dimensional)
で証明済みなので、ある $c\in\mathbb F$ があって

$$
\Omega'=c\Omega
$$

と書けます。

両辺を $(e'_1,\dots,e'_n)$ に評価すると、双対基底の定義から

$$
\Omega'(e'_1,\dots,e'_n)=1
$$

であり、前半から

$$
\Omega(e'_1,\dots,e'_n)=\det A.
$$

従って

$$
1=c\det A.
$$

$A$ は基底変換行列なので可逆、従って $\det A\ne0$ です。よって

$$
c=(\det A)^{-1}.
$$

$\square$
<!-- proof-end -->

この定理は、向きを変える基底変換で最高次形式の符号が反転する理由をそのまま示しています。GEO8 の向きと積分では、この「最高次形式が行列式で変換する」という事実が局所座標の貼り合わせを支えます。

---

## 11. ベクトルを1本差し込む

<a id="def-la3e-interior-product"></a>
<!-- formal-statement-start -->
> **定義（内部積）**  
> $v\in V$、$\omega\in\Lambda^kV^*$、$k\ge1$ とする。$v$ による $\omega$ の **内部積** を
$$
\iota_v\omega\in\Lambda^{k-1}V^*
$$
> とし、
$$
(\iota_v\omega)(v_2,\dots,v_k)
=
\omega(v,v_2,\dots,v_k)
$$
> で定める。$k=0$ では $\iota_v c=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la3e-interior-product -->
### 例：面積形式へ $e_1$ を差し込む

**定義の確認**
$V=\mathbb R^2$、

$$
\omega=\varepsilon^1\wedge\varepsilon^2
$$

とします。任意の $w$ に対して

$$
\begin{aligned}
(\iota_{e_1}\omega)(w)
&=
\omega(e_1,w)\\
&=
\varepsilon^1(e_1)\varepsilon^2(w)
-
\varepsilon^1(w)\varepsilon^2(e_1)\\
&=
\varepsilon^2(w).
\end{aligned}
$$

したがって

$$
\iota_{e_1}
(\varepsilon^1\wedge\varepsilon^2)
=
\varepsilon^2.
$$
<!-- definition-example-end -->

<a id="thm-la3e-interior-product-identities"></a>
<!-- formal-statement-start -->
> **定理（内部積の基本恒等式）**  
> $v,w\in V$、$\alpha\in\Lambda^pV^*$、$\beta\in\Lambda^qV^*$ とする。このとき
$$
\iota_v(\alpha\wedge\beta)
=
(\iota_v\alpha)\wedge\beta
+
(-1)^p
\alpha\wedge(\iota_v\beta),
$$
> および
$$
\iota_v\iota_w
=
-\iota_w\iota_v,
\qquad
\iota_v^2=0
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず1次形式の外積
$\alpha_1\wedge\cdots\wedge\alpha_k$
へ内部積を作用させると、「どの $\alpha_j$ が $v$ を受け取るか」で $k$ 項に分かれます。この展開式から積に対する符号付き Leibniz 則が直ちに出ます。二つの内部積の反交換性は、交代形式の最初の2引数を交換するだけです。

<!-- proof-start -->
### 証明

最初に、1次形式 $\alpha_1,\dots,\alpha_k$ について

$$
\iota_v(\alpha_1\wedge\cdots\wedge\alpha_k)
=
\sum_{j=1}^k
(-1)^{j-1}
\alpha_j(v)\,
\alpha_1\wedge\cdots
\widehat{\alpha_j}
\cdots\wedge\alpha_k
$$

を示します。右辺の帽子はその因子を除くことを表します。

実際、左辺を $(v_2,\dots,v_k)$ に評価すると

$$
(\alpha_1\wedge\cdots\wedge\alpha_k)
(v,v_2,\dots,v_k)
$$

であり、これは行列

$$
[\alpha_i(u_j)]_{i,j=1}^k,
\qquad
u_1=v,\ u_j=v_j\ (j\ge2)
$$

の行列式です。第1列に沿って余因子で展開すると、ちょうど上の和になります。

一般の交代形式は外積基底の線形結合なので、線形性によりこの公式から一般の場合を示せます。

$\alpha$ が $p$ 個、$\beta$ が $q$ 個の1次形式の外積である場合、上の和を

- $v$ が $\alpha$ 側の因子へ入る項
- $v$ が $\beta$ 側の因子へ入る項

に分けます。

前者の和は

$$
(\iota_v\alpha)\wedge\beta
$$

です。後者では $\beta$ の因子へ到達する前に $\alpha$ の $p$ 個の因子を通過するため、全体に $(-1)^p$ が付き、

$$
(-1)^p\alpha\wedge(\iota_v\beta)
$$

となります。外積基底の線形結合へ拡張すれば

$$
\iota_v(\alpha\wedge\beta)
=
(\iota_v\alpha)\wedge\beta
+
(-1)^p\alpha\wedge(\iota_v\beta).
$$

次に $\omega\in\Lambda^kV^*$ に対して

$$
\begin{aligned}
(\iota_v\iota_w\omega)(v_3,\dots,v_k)
&=
\omega(w,v,v_3,\dots,v_k)\\
&=
-\omega(v,w,v_3,\dots,v_k)\\
&=
-(\iota_w\iota_v\omega)(v_3,\dots,v_k).
\end{aligned}
$$

従って

$$
\iota_v\iota_w=-\iota_w\iota_v.
$$

$w=v$ とすれば

$$
\iota_v^2=-\iota_v^2.
$$

$\mathbb F=\mathbb R$ または $\mathbb C$ では $2\ne0$ なので

$$
\iota_v^2=0.
$$

$\square$
<!-- proof-end -->

---

## 12. GEO7 へ持っていくもの

ここまでで、有限次元ベクトル空間上の代数として

$$
\bigoplus_{k=0}^n\Lambda^kV^*
$$

に外積が入りました。これは **外積代数** です。

多様体へ進むと、各点 $p$ で

$$
V=T_pM
$$

と置き、

$$
\Lambda^kT_p^*M
$$

の元を点ごとに滑らかに選ぶことで微分形式になります。

この章で作ったもののうち

- 外積
- 交代化
- 最高次形式
- 内部積
- 基底変換と行列式

は、そのまま GEO7 以降で使います。

一方、

- テンソル場の滑らかさ
- 微分形式の外微分
- Lie 微分
- Cartan の公式
- 多様体上の積分

はまだ導入していません。これらは点ごとの線形代数だけでは定義できず、多様体の滑らかな構造が必要だからです。

---

## 13. 演習

### LA3E-A01 テンソル積の基底展開

$V=\mathbb R^2$、$W=\mathbb R^3$ とし、それぞれ標準基底を $e_1,e_2$、$f_1,f_2,f_3$ とする。

$$
v=2e_1-e_2,\qquad
w=f_1+3f_3
$$

について $v\otimes w$ を基底 $e_i\otimes f_j$ で展開せよ。また $\dim(V\otimes W)$ を求めよ。

- Level: A
- 狙い: テンソル積の二重線形性と基底

<!-- solution-start -->
**詳細解答**

二重線形性を順に使います。

$$
\begin{aligned}
v\otimes w
&=
(2e_1-e_2)\otimes(f_1+3f_3)\\
&=
2e_1\otimes f_1
+6e_1\otimes f_3
-e_2\otimes f_1
-3e_2\otimes f_3.
\end{aligned}
$$

$V$ の次元は2、$W$ の次元は3なので、テンソル積の基底は

$$
e_i\otimes f_j
\qquad
(i=1,2,\ j=1,2,3)
$$

の6個です。したがって

$$
\boxed{\dim(V\otimes W)=6}.
$$
<!-- solution-end -->

### LA3E-A02 $(1,1)$ 型テンソルの因子消去

$V=\mathbb R^2$、基底を $e_1,e_2$、双対基底を $\varepsilon^1,\varepsilon^2$ とする。

$$
T=
3e_1\otimes\varepsilon^1
-2e_1\otimes\varepsilon^2
+5e_2\otimes\varepsilon^1
+4e_2\otimes\varepsilon^2
$$

の $V$ 因子と $V^*$ 因子を評価して消去せよ。

- Level: A
- 狙い: 評価写像による因子消去と対角成分和

<!-- solution-start -->
**詳細解答**

各項の $e_i$ と $\varepsilon^j$ を自然な評価で組にして消去します。

$$
C(e_i\otimes\varepsilon^j)
=
\varepsilon^j(e_i)
=
\delta_i^j.
$$

従って

$$
\begin{aligned}
C(T)
&=
3\delta_1^1
-2\delta_1^2
+5\delta_2^1
+4\delta_2^2\\
&=
3+4\\
&=
\boxed{7}.
\end{aligned}
$$

非対角成分に対応する $\delta_1^2,\delta_2^1$ は0になり、対角成分だけが残ります。
<!-- solution-end -->

### LA3E-A03 外積の具体計算

$V=\mathbb R^3$ の標準双対基底を $\varepsilon^1,\varepsilon^2,\varepsilon^3$ とする。

$$
\alpha=2\varepsilon^1-\varepsilon^2,
\qquad
\beta=\varepsilon^2+3\varepsilon^3
$$

について $\alpha\wedge\beta$ を外積基底で表せ。

- Level: A
- 狙い: 外積の双線形性と反交換性

<!-- solution-start -->
**詳細解答**

双線形性で展開します。

$$
\begin{aligned}
\alpha\wedge\beta
&=
(2\varepsilon^1-\varepsilon^2)
\wedge
(\varepsilon^2+3\varepsilon^3)\\
&=
2\varepsilon^1\wedge\varepsilon^2
+6\varepsilon^1\wedge\varepsilon^3
-\varepsilon^2\wedge\varepsilon^2
-3\varepsilon^2\wedge\varepsilon^3.
\end{aligned}
$$

1次形式では $\eta\wedge\eta=0$ なので

$$
\varepsilon^2\wedge\varepsilon^2=0.
$$

従って

$$
\boxed{
\alpha\wedge\beta
=
2\varepsilon^1\wedge\varepsilon^2
+6\varepsilon^1\wedge\varepsilon^3
-3\varepsilon^2\wedge\varepsilon^3
}.
$$
<!-- solution-end -->

### LA3E-A04 内部積

$V=\mathbb R^3$ とし

$$
\omega
=
\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3,
\qquad
v=2e_1-e_3.
$$

$\iota_v\omega$ を求めよ。

- Level: A
- 狙い: 内部積の展開公式

<!-- solution-start -->
**詳細解答**

内部積は $v$ について線形なので

$$
\iota_v\omega
=
2\iota_{e_1}\omega
-
\iota_{e_3}\omega.
$$

展開公式から

$$
\iota_{e_1}
(\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3)
=
\varepsilon^2\wedge\varepsilon^3.
$$

また $e_3$ が評価されるのは第3因子で、符号は $(-1)^{3-1}=1$ なので

$$
\iota_{e_3}
(\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3)
=
\varepsilon^1\wedge\varepsilon^2.
$$

従って

$$
\boxed{
\iota_v\omega
=
2\varepsilon^2\wedge\varepsilon^3
-
\varepsilon^1\wedge\varepsilon^2
}.
$$
<!-- solution-end -->

### LA3E-B01 行列式を二重線形写像から因子化する

$V=\mathbb R^2$ とし

$$
b(v,w)=
\det\begin{pmatrix}
v_1&w_1\\
v_2&w_2
\end{pmatrix}
$$

とする。

1. $b$ が二重線形であることを示せ。
2. テンソル積の普遍性により得られる線形写像
   $\widetilde b:V\otimes V\to\mathbb R$
   の値を基底
   $e_i\otimes e_j$
   上で求めよ。
3. $\widetilde b(v\otimes w)=b(v,w)$ を
   $v=(a,b)^T,w=(c,d)^T$
   について直接確認せよ。

- Level: B
- 狙い: 普遍性を具体的な二重線形写像へ適用する

<!-- solution-start -->
**詳細解答**

1. 第1変数について、$v,v',w\in V$ と $\lambda\in\mathbb R$ に対して行列式の列線形性から

$$
b(v+v',w)=b(v,w)+b(v',w),
$$

$$
b(\lambda v,w)=\lambda b(v,w).
$$

第2変数についても同様です。従って $b$ は二重線形です。

2. 普遍性により一意な線形写像 $\widetilde b$ が存在し、

$$
\widetilde b(e_i\otimes e_j)=b(e_i,e_j)
$$

です。

直接計算すると

$$
b(e_1,e_1)=0,\qquad
b(e_1,e_2)=1,
$$

$$
b(e_2,e_1)=-1,\qquad
b(e_2,e_2)=0.
$$

したがって

$$
\widetilde b(e_1\otimes e_1)=0,
\quad
\widetilde b(e_1\otimes e_2)=1,
$$

$$
\widetilde b(e_2\otimes e_1)=-1,
\quad
\widetilde b(e_2\otimes e_2)=0.
$$

3. 二重線形性により

$$
v\otimes w
=
ac\,e_1\otimes e_1
+
ad\,e_1\otimes e_2
+
bc\,e_2\otimes e_1
+
bd\,e_2\otimes e_2.
$$

従って

$$
\begin{aligned}
\widetilde b(v\otimes w)
&=
ac\cdot0+ad\cdot1+bc\cdot(-1)+bd\cdot0\\
&=
ad-bc\\
&=
b(v,w).
\end{aligned}
$$

普遍性による因子化が、通常の行列式計算を正確に再現しました。
<!-- solution-end -->

### LA3E-B02 分解可能でない2次形式

$V=\mathbb R^4$ とし

$$
\omega
=
\varepsilon^1\wedge\varepsilon^2
+
\varepsilon^3\wedge\varepsilon^4.
$$

1. $\omega\wedge\omega$ を計算せよ。
2. 任意の分解可能な2次形式 $\alpha\wedge\beta$ について
   $(\alpha\wedge\beta)\wedge(\alpha\wedge\beta)=0$
   を示せ。
3. $\omega$ が分解可能でないことを結論せよ。

- Level: B
- 狙い: 偶数次数の外積と分解可能性

<!-- solution-start -->
**詳細解答**

1. $a=\varepsilon^1\wedge\varepsilon^2$、
$b=\varepsilon^3\wedge\varepsilon^4$ と置きます。

$$
\omega\wedge\omega
=
a\wedge a+a\wedge b+b\wedge a+b\wedge b.
$$

$a\wedge a$ と $b\wedge b$ は同じ1次形式を2回含むので0です。

また $a,b$ はともに次数2なので、次数付き交換則から

$$
b\wedge a
=
(-1)^{2\cdot2}a\wedge b
=
a\wedge b.
$$

従って

$$
\boxed{
\omega\wedge\omega
=
2\,
\varepsilon^1\wedge\varepsilon^2\wedge
\varepsilon^3\wedge\varepsilon^4
\ne0
}.
$$

2. 結合性を使うと

$$
(\alpha\wedge\beta)\wedge(\alpha\wedge\beta)
=
\alpha\wedge\beta\wedge\alpha\wedge\beta.
$$

中央の $\beta\wedge\alpha$ を入れ替えると符号が1回反転し、

$$
=
-\alpha\wedge\alpha\wedge\beta\wedge\beta
=
0
$$

です。

3. もし $\omega$ が分解可能なら2より $\omega\wedge\omega=0$ のはずです。しかし1で非零と分かりました。従って

$$
\boxed{\omega\text{ は分解可能でない}}.
$$
<!-- solution-end -->

### LA3E-B03 内部積の符号付き積の法則

$\alpha,\beta,\gamma\in V^*$、$v\in V$ とする。

$$
\iota_v(\alpha\wedge\beta\wedge\gamma)
$$

を1次形式の外積の線形結合として展開し、その結果が

$$
\iota_v(\eta\wedge\gamma)
=
(\iota_v\eta)\wedge\gamma
+
\eta\wedge(\iota_v\gamma),
\qquad
\eta=\alpha\wedge\beta
$$

と一致することを確認せよ。

- Level: B
- 狙い: 内部積の次数符号を自力で追う

<!-- solution-start -->
**詳細解答**

3個の1次形式に対する内部積の展開公式から

$$
\boxed{
\iota_v(\alpha\wedge\beta\wedge\gamma)
=
\alpha(v)\beta\wedge\gamma
-
\beta(v)\alpha\wedge\gamma
+
\gamma(v)\alpha\wedge\beta
}.
$$

次に

$$
\eta=\alpha\wedge\beta
$$

は2次形式なので、基本恒等式の符号は

$$
(-1)^2=1
$$

です。従って

$$
\iota_v(\eta\wedge\gamma)
=
(\iota_v\eta)\wedge\gamma
+
\eta\wedge(\iota_v\gamma).
$$

ここで

$$
\iota_v\eta
=
\alpha(v)\beta-\beta(v)\alpha,
$$

また $\iota_v\gamma=\gamma(v)$ は0次形式、すなわちスカラーです。

よって

$$
\begin{aligned}
(\iota_v\eta)\wedge\gamma
+
\eta\wedge(\iota_v\gamma)
&=
\{\alpha(v)\beta-\beta(v)\alpha\}\wedge\gamma
+
\gamma(v)\alpha\wedge\beta\\
&=
\alpha(v)\beta\wedge\gamma
-
\beta(v)\alpha\wedge\gamma
+
\gamma(v)\alpha\wedge\beta.
\end{aligned}
$$

最初の直接展開と一致します。
<!-- solution-end -->

### LA3E-C01 最高次形式への線形写像の作用

$V$ を $n$ 次元ベクトル空間、$T:V\to V$ を線形写像とする。$\omega\in\Lambda^kV^*$ に対して

$$
(T^*\omega)(v_1,\dots,v_k)
=
\omega(Tv_1,\dots,Tv_k)
$$

と定める。

1. $T^*\omega\in\Lambda^kV^*$ であることを示せ。
2. $\alpha\in\Lambda^pV^*$、$\beta\in\Lambda^qV^*$ に対して
   $T^*(\alpha\wedge\beta)=T^*\alpha\wedge T^*\beta$
   を示せ。
3. 非零な最高次形式 $\Omega\in\Lambda^nV^*$ に対して

   $$
   T^*\Omega=(\det T)\Omega
   $$

   を示せ。
4. $V=\mathbb R^3$、
   $T(e_1)=2e_1$、
   $T(e_2)=e_1+e_2$、
   $T(e_3)=e_2+3e_3$
   とするとき、
   $T^*(\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3)$
   を求めよ。

- Level: C
- 狙い: 外積・最高次形式・抽象行列式を統合する

<!-- solution-start -->
**詳細解答**

1. $\omega$ は各変数について線形で、$T$ も線形なので $T^*\omega$ は各変数について線形です。

また $v_i=v_j$ なら $Tv_i=Tv_j$ なので、$\omega$ の交代性から

$$
(T^*\omega)(v_1,\dots,v_i,\dots,v_j,\dots,v_k)=0.
$$

従って

$$
T^*\omega\in\Lambda^kV^*.
$$

2. 外積のシャッフル表示を使います。任意の $v_1,\dots,v_{p+q}$ に対して

$$
\begin{aligned}
&T^*(\alpha\wedge\beta)(v_1,\dots,v_{p+q})\\
&=
(\alpha\wedge\beta)(Tv_1,\dots,Tv_{p+q})\\
&=
\sum_{\sigma\in\operatorname{Sh}(p,q)}
\operatorname{sgn}(\sigma)
\alpha(Tv_{\sigma(1)},\dots,Tv_{\sigma(p)})
\beta(Tv_{\sigma(p+1)},\dots,Tv_{\sigma(p+q)}).
\end{aligned}
$$

これは定義上

$$
(T^*\alpha\wedge T^*\beta)(v_1,\dots,v_{p+q})
$$

そのものです。よって

$$
\boxed{
T^*(\alpha\wedge\beta)
=
T^*\alpha\wedge T^*\beta
}.
$$

3. $T^*\Omega$ も最高次交代形式です。LA3D で最高次交代形式全体が1次元であることを証明済みなので、ある $c$ があって

$$
T^*\Omega=c\Omega
$$

と書けます。

ところが定義から

$$
(T^*\Omega)(v_1,\dots,v_n)
=
\Omega(Tv_1,\dots,Tv_n).
$$

[LA3D の抽象行列式](../LA3D/index.md#def-la3d-abstract-determinant)の定義は

$$
\Omega(Tv_1,\dots,Tv_n)
=
(\det T)\Omega(v_1,\dots,v_n)
$$

です。従って係数は

$$
c=\det T
$$

であり、

$$
\boxed{T^*\Omega=(\det T)\Omega}.
$$

4. 基底 $(e_1,e_2,e_3)$ に関する $T$ の表現行列は、各像を列に並べて

$$
[T]
=
\begin{pmatrix}
2&1&0\\
0&1&1\\
0&0&3
\end{pmatrix}.
$$

上三角なので

$$
\det T=2\cdot1\cdot3=6.
$$

3の結果から

$$
\boxed{
T^*(\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3)
=
6\,
\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3
}.
$$

これは「最高次形式への作用が行列式を読み取る」という LA3D と LA3E の接続を具体的に確認しています。
<!-- solution-end -->

---

## 14. まとめ

この章で作った代数的な流れは

$$
\text{二重線形写像}
\longrightarrow
V\otimes W
\longrightarrow
T^r_s(V)
\longrightarrow
\Lambda^kV^*
\longrightarrow
\wedge,\ \iota_v
$$

です。

特に重要なのは次の4点です。

1. テンソル積は、二重線形写像を線形写像へ普遍的に変換する。
2. 外冪 $\Lambda^kV^*$ の次元は $\binom nk$ で、外積基底が具体的に書ける。
3. 外積は結合的で、

   $$
   \alpha\wedge\beta=(-1)^{pq}\beta\wedge\alpha
   $$

   という次数付き交換則を持つ。
4. 最高次外積は基底変換で行列式を拾い、内部積はベクトルを形式へ差し込む次数 $-1$ の演算になる。

次の幾何学編では、まず GEO1 で滑らかな多様体を定義します。その後 GEO2 で各点の接空間・余接空間を作り、GEO7 でこの章の外積代数を各点の余接空間へ適用して微分形式へ進みます。
