# OA4 連続関数計算と可換 Gelfand--Naimark

<!-- definition-example-audit: strict -->

> **既出概念**：[OA2 の Gelfand 変換](../OA2/index.md#def-oa2-gelfand-transform)、[OA2 のスペクトルの character 表示](../OA2/index.md#thm-oa2-spectrum-character)、[OA3 の単位的 C*-環](../OA3/index.md#def-oa3-cstar-algebra)、[OA3 の可換 C*-環における Gelfand 変換の等長性](../OA3/index.md#thm-oa3-commutative-gelfand-isometry)、[OA3 の自己共役元が生成する部分代数での逆元近似](../OA3/index.md#lem-oa3-self-adjoint-generated-inverse)、[RA8 の Weierstrass 近似定理](../RA8/index.md#thm-ra8-weierstrass)を使います。

OA3 の最後では、正元 $b$ に対して平方根 $b^{1/2}$ を作りました。そこで使った考え方は、多項式で実数上の関数を近似し、その多項式へ $b$ を代入して極限を取ることでした。

しかし平方根だけを毎回個別に作るのでは不便です。たとえば自己共役元 $h$ に対して

$$
|h|,
\qquad
e^{ih},
\qquad
\frac{1}{1+h^2}
$$

のような元を一つずつ別の議論で構成するのではなく、スペクトル上の連続関数 $f$ をまとめて「$h$ へ代入」したいはずです。

多項式なら

$$
p(z)=\alpha_0+\alpha_1z+\cdots+\alpha_nz^n
$$

に対して

$$
p(a)
=
\alpha_01+\alpha_1a+\cdots+\alpha_na^n
$$

とすぐ定義できます。目標は、この操作を

$$
p
\longrightarrow
f\in C(\sigma_A(a))
$$

まで広げることです。

本章では、そのために一度「一つの元が作る可換な世界」へ移ります。

~~~
a と a* が可換
  ↓
a と 1 から作る閉じた *-部分代数は可換
  ↓
可換 C*-環は character 空間上の C(K) と同じ
  ↓
character 空間は a のスペクトルと同じ
  ↓
f∈C(σ(a)) を C*-環の元 f(a) へ戻せる
~~~

最後に

$$
\sigma_A(f(a))
=
f(\sigma_A(a))
$$

まで証明します。これにより「スペクトル上で関数を作用させる」ことと「環の中で元を作る」ことが完全に対応します。

---

## 1. 随伴と可換な元

一般の元 $a$ と $a^*$ は可換とは限りません。連続関数を一変数の関数として扱うためには、まず $a$ と $a^*$ の間に可換性が必要です。

<a id="def-oa4-normal-element"></a>

<!-- formal-statement-start -->
### 定義（正規元）

単位的 $C^*$-環 $A$ の元 $a$ が

$$
a^*a=aa^*
$$

を満たすとき、$a$ を **正規元** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa4-normal-element -->

**定義の確認**

$C(K)$ では積が点ごとで可換なので、任意の $f\in C(K)$ について

$$
f^*f
=
ff^*.
$$

したがって $C(K)$ の全ての元が正規元です。

また

$$
a=
\begin{pmatrix}
1&0\\
0&i
\end{pmatrix}
$$

とすると

$$
a^*
=
\begin{pmatrix}
1&0\\
0&-i
\end{pmatrix},
$$

よって

$$
a^*a
=
aa^*
=
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}.
$$

したがってこの行列も正規元です。

<!-- definition-example-end -->

自己共役元 $h=h^*$、unitary 元 $u^*u=uu^*=1$、projection は全て正規元です。正規元は、自己共役元より広く unitary 元も含むクラスになっています。

---

## 2. 一つの元が生成する C*-部分環

元 $a$ だけを調べたいとき、環 $A$ 全体を使う必要はありません。$a$ と単位元から、和・積・随伴・極限で作れる元だけを集めます。

<a id="def-oa4-generated-cstar"></a>

<!-- formal-statement-start -->
### 定義（一つの元が生成する単位的 C*-部分環）

単位的 $C^*$-環 $A$ と $a\in A$ に対し、$a$ と $1$ を含む単位的 $C^*$-部分環全体の共通部分を

$$
\boxed{
C^*(a,1)
}
$$

と書き、**$a$ と $1$ が生成する単位的 $C^*$-部分環** とする。

同値に、$a$ と $a^*$ の複素係数多項式全体のノルム閉包である。
<!-- formal-statement-end -->

同値性を確認します。$a$ と $1$ を含む *-部分代数は $a^*$ も含み、従って $a,a^*$ の有限和・積を全て含みます。閉じた部分環ならそのノルム極限も含みます。

逆に $a,a^*$ の *-多項式全体の閉包は、和・積・随伴について閉じ、$a$ と $1$ を含みます。したがって最小の閉じた *-部分代数です。

<!-- definition-example-start: def-oa4-generated-cstar -->

**定義の確認：projection が生成する場合**

$p$ を projection とします。すると

$$
p^*=p,
\qquad
p^2=p.
$$

従って $p,p^*$ のどんな多項式も

$$
\alpha1+\beta p
$$

の形へ整理できます。

集合

$$
B=
\{\alpha1+\beta p:\alpha,\beta\in\mathbb C\}
$$

は高々2次元なのでノルム閉です。また $1,p$ を含み、積と随伴でも閉じます。よって

$$
\boxed{
C^*(p,1)=\operatorname{span}\{1,p\}.
}
$$

<!-- definition-example-end -->

正規性の役割はここで現れます。

<a id="prop-oa4-normal-generated-commutative"></a>

<!-- formal-statement-start -->
### 命題（正規元が生成する C*-部分環は可換である）

単位的 $C^*$-環 $A$ の正規元 $a$ に対して

$$
C^*(a,1)
$$

は可換単位的 $C^*$-環である。
<!-- formal-statement-end -->

### 証明の見取り図

正規性は $a$ と $a^*$ が可換であるという条件です。従って $a,a^*$ の *-多項式どうしは可換です。最後にノルム極限へ可換性を移します。

<!-- proof-start -->
### 証明

$a$ は正規なので

$$
aa^*=a^*a.
$$

従って任意の非負整数 $m,n,r,s$ について

$$
a^m(a^*)^n a^r(a^*)^s
=
a^{m+r}(a^*)^{n+s}
=
a^r(a^*)^s a^m(a^*)^n.
$$

線形結合を取れば、任意の二つの *-多項式 $p(a,a^*)$、$q(a,a^*)$ が可換です。

いま $x,y\in C^*(a,1)$ を取ります。定義から *-多項式列 $p_n(a,a^*)$、$q_n(a,a^*)$ を

$$
p_n(a,a^*)\to x,
\qquad
q_n(a,a^*)\to y
$$

となるように選べます。

各 $n$ で

$$
p_n(a,a^*)q_n(a,a^*)
=
q_n(a,a^*)p_n(a,a^*)
$$

です。積はノルム連続なので極限を取ると

$$
xy=yx.
$$

従って $C^*(a,1)$ は可換です。
<!-- proof-end -->

この命題により、正規元一個の問題は OA2・OA3 で作った可換 Gelfand 理論へ戻せます。

---

## 3. コンパクト Hausdorff 空間での近似

OA2 の character 空間はコンパクト Hausdorff でした。一方、RA8 の実 Stone--Weierstrass 定理は定理文ではコンパクト距離空間に対して述べました。

ここでは Gelfand 理論に必要な形だけを、同じ近似機構から証明します。距離を使うのではなく、コンパクト性による有限部分被覆を使うことが本質です。

<a id="thm-oa4-stone-weierstrass-self-adjoint"></a>

<!-- formal-statement-start -->
### 定理（自己共役部分代数版 Stone--Weierstrass）

$K$ をコンパクト Hausdorff 空間とする。$B\subset C(K)$ が

1. 定数関数を含む複素部分代数である。
2. $f\in B$ なら $\overline f\in B$ である。
3. 任意の異なる $x,y\in K$ に対し、ある $f\in B$ が存在して $f(x)\ne f(y)$ となる。

を満たすとする。

このとき $B$ は一様ノルムで $C(K)$ に稠密である。
<!-- formal-statement-end -->

### 証明の見取り図

複素関数を直接近似する代わりに、まず $B$ の実数値部分を取ります。

随伴で閉じているため

$$
\operatorname{Re}f,
\qquad
\operatorname{Im}f
$$

もこの実部分に入ります。実部分が点を分離することを確認し、その閉包で絶対値、最大値、最小値を作ります。

その後は「二点を正確に補間する関数を作る → コンパクト性で有限個へ圧縮する」という流れです。

<!-- proof-start -->
### 証明

まず

$$
B_{\mathbb R}
=
\{f\in B:f(K)\subset\mathbb R\}
$$

と置きます。

$f\in B$ なら $\overline f\in B$ なので

$$
\operatorname{Re}f
=
\frac{f+\overline f}{2},
\qquad
\operatorname{Im}f
=
\frac{f-\overline f}{2i}
$$

はいずれも $B_{\mathbb R}$ に属します。

異なる $x,y\in K$ を取ります。仮定3から $f(x)\ne f(y)$ となる $f\in B$ が存在します。

もし

$$
\operatorname{Re}f(x)
\ne
\operatorname{Re}f(y)
$$

なら $\operatorname{Re}f$ が二点を分離します。実部が等しいなら、$f(x)\ne f(y)$ なので虚部が異なり、$\operatorname{Im}f$ が分離します。

従って $B_{\mathbb R}$ は点を分離する実部分代数です。

その一様ノルム閉包を

$$
D=\overline{B_{\mathbb R}}
\subset C(K,\mathbb R)
$$

とします。$D$ は実線形で閉じています。積についても、$f_n\to f$、$g_n\to g$ が一様収束するとき

$$
\|f_ng_n-fg\|_\infty
\le
\|f_n\|_\infty\|g_n-g\|_\infty
+
\|g\|_\infty\|f_n-f\|_\infty
\to0
$$

なので閉じています。

次に $h\in D$ なら $|h|\in D$ を示します。

$$
M=\|h\|_\infty
$$

と置きます。$M=0$ なら自明です。$M>0$ とします。

[RA8 の Weierstrass 近似定理](../RA8/index.md#thm-ra8-weierstrass)を連続関数

$$
t\mapsto |t|
\qquad
(-M\le t\le M)
$$

へ適用すると、実係数多項式 $p_n$ を

$$
\sup_{|t|\le M}
\bigl|p_n(t)-|t|\bigr|
\to0
$$

となるように選べます。

$D$ は定数・和・積・実数倍で閉じるため

$$
p_n(h)\in D.
$$

さらに

$$
\|p_n(h)-|h|\|_\infty
\le
\sup_{|t|\le M}
\bigl|p_n(t)-|t|\bigr|
\to0.
$$

[距離空間における閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)を、一様ノルムが定める距離に適用します。$D$ は閉であり $p_n(h)\in D$ が $|h|$ へ一様収束するので、$|h|\in D$ です。

従って $f,g\in D$ に対して

$$
\max(f,g)
=
\frac{f+g+|f-g|}{2},
$$

$$
\min(f,g)
=
\frac{f+g-|f-g|}{2}
$$

も $D$ に属します。

ここから任意の $u\in C(K,\mathbb R)$ を $D$ の元で一様近似します。

$x,y\in K$ を固定します。$x\ne y$ なら、点を分離する $r\in B_{\mathbb R}$ を取れます。そこで

$$
h_{x,y}(z)
=
u(x)
+
\frac{u(y)-u(x)}{r(y)-r(x)}
\{r(z)-r(x)\}
$$

と置くと $h_{x,y}\in B_{\mathbb R}\subset D$ で

$$
h_{x,y}(x)=u(x),
\qquad
h_{x,y}(y)=u(y).
$$

$x=y$ なら定数関数 $u(x)$ を使います。

$\varepsilon>0$ を固定し、$x$ を一つ固定します。各 $y\in K$ に対して

$$
U_y
=
\{z\in K:
h_{x,y}(z)>u(z)-\varepsilon\}
$$

と置きます。$h_{x,y}(y)=u(y)$ なので $y\in U_y$ です。従って $(U_y)_{y\in K}$ は $K$ の開被覆です。

$K$ はコンパクトなので、有限個

$$
y_1,\ldots,y_m
$$

を選んで

$$
K=U_{y_1}\cup\cdots\cup U_{y_m}
$$

とできます。

$$
g_x
=
\max\{h_{x,y_1},\ldots,h_{x,y_m}\}
$$

と置くと $g_x\in D$ です。全ての $j$ で $h_{x,y_j}(x)=u(x)$ なので

$$
g_x(x)=u(x).
$$

また有限被覆の作り方から全ての $z\in K$ で

$$
g_x(z)>u(z)-\varepsilon.
$$

次に

$$
V_x
=
\{z\in K:g_x(z)<u(z)+\varepsilon\}
$$

と置きます。$g_x(x)=u(x)$ なので $x\in V_x$ です。従って $(V_x)_{x\in K}$ も開被覆です。

再びコンパクト性から有限個

$$
x_1,\ldots,x_r
$$

を選べます。

最後に

$$
g
=
\min\{g_{x_1},\ldots,g_{x_r}\}
\in D
$$

と置きます。

各 $g_{x_j}$ は全点で $u-\varepsilon$ より大きいので

$$
g(z)>u(z)-\varepsilon.
$$

一方、各 $z$ は少なくとも一つの $V_{x_j}$ に属するので

$$
g(z)
\le
g_{x_j}(z)
<
u(z)+\varepsilon.
$$

従って

$$
\|g-u\|_\infty\le\varepsilon.
$$

最初から $\varepsilon/2$ に対して構成すれば、誤差を厳密に $\varepsilon$ 未満にできます。よって

$$
D=C(K,\mathbb R).
$$

最後に任意の $F\in C(K)$ を

$$
F=u+iv,
\qquad
u,v\in C(K,\mathbb R)
$$

と書きます。$u,v$ を $B_{\mathbb R}$ の元で任意精度に近似すれば、$F$ は $B$ の元で任意精度に近似できます。

従って $B$ は $C(K)$ に一様ノルムで稠密です。
<!-- proof-end -->

この証明で必要だったのは、$K$ 上の距離ではなく開被覆の有限化でした。これで OA2 の character 空間へそのまま適用できます。

---

## 4. 可換 C*-環は本当に C(K) である

OA3 では、可換単位的 $C^*$-環 $A$ の Gelfand 変換

$$
\Gamma:A\to C(\Delta(A))
$$

が等長かつ単射であることまで証明しました。

残っていたのは全射性です。

<a id="thm-oa4-commutative-gelfand-naimark"></a>

<!-- formal-statement-start -->
### 定理（可換 Gelfand--Naimark）

$A$ を可換単位的 $C^*$-環とする。character 空間 $\Delta(A)$ に Gelfand 位相を入れる。

このとき Gelfand 変換

$$
\Gamma:A\to C(\Delta(A)),
\qquad
\Gamma(a)(\varphi)=\varphi(a)
$$

は単位的な等長 *-同型である。

したがって

$$
\boxed{
A\cong C(\Delta(A))
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

OA3 で既に

$$
\|\Gamma(a)\|_\infty=\|a\|
$$

が分かっています。

そこで像 $\Gamma(A)$ が

- 定数を含む。
- 複素共役で閉じる。
- character 空間の異なる二点を分離する。

ことを確認し、前節の[自己共役部分代数版 Stone--Weierstrass 定理](#thm-oa4-stone-weierstrass-self-adjoint)を使います。

稠密性だけではなく、等長性から像が閉であることも使います。

<!-- proof-start -->
### 証明

[OA3 の「可換 C*-環では Gelfand 変換は等長かつ単射」](../OA3/index.md#thm-oa3-commutative-gelfand-isometry)から

$$
\|\Gamma(a)\|_\infty=\|a\|
$$

であり、$\Gamma$ は単射です。

また OA3 の証明で、任意の $\varphi\in\Delta(A)$ に対して

$$
\varphi(a^*)
=
\overline{\varphi(a)}
$$

を示しました。従って

$$
\Gamma(a^*)
=
\overline{\Gamma(a)}.
$$

したがって $\Gamma(A)$ は複素共役で閉じています。

$\Gamma(1)$ は定数関数 $1$ なので、定数関数を含みます。

次に異なる $\varphi,\psi\in\Delta(A)$ を取ります。$\varphi$ と $\psi$ は異なる線形汎関数なので、ある $a\in A$ が存在して

$$
\varphi(a)\ne\psi(a).
$$

従って

$$
\Gamma(a)(\varphi)
\ne
\Gamma(a)(\psi).
$$

よって $\Gamma(A)$ は点を分離します。

前節の[自己共役部分代数版 Stone--Weierstrass 定理](#thm-oa4-stone-weierstrass-self-adjoint)により

$$
\overline{\Gamma(A)}
=
C(\Delta(A)).
$$

一方、$\Gamma(A)$ は閉です。実際、$\Gamma(a_n)$ が $C(\Delta(A))$ で一様 Cauchy なら、等長性から

$$
\|a_n-a_m\|
=
\|\Gamma(a_n)-\Gamma(a_m)\|_\infty
$$

なので $(a_n)$ は $A$ で Cauchy です。

$A$ は Banach 空間なので、ある $a\in A$ に

$$
a_n\to a
$$

と収束します。再び等長性から

$$
\Gamma(a_n)\to\Gamma(a).
$$

従って一様極限も $\Gamma(A)$ に属します。

よって $\Gamma(A)$ は稠密かつ閉なので

$$
\Gamma(A)=C(\Delta(A)).
$$

したがって $\Gamma$ は全射でもあり、単位的な等長 *-同型です。
<!-- proof-end -->

一般の可換 Banach 環では Gelfand 変換が単射でないことすらありました。$C^*$-恒等式を加えると、可換な場合には抽象代数そのものが連続関数環になります。

---

## 5. C*-部分環でスペクトルは変わらない

後で構成する「スペクトル上の関数を元へ代入する仕組み」では

$$
B=C^*(a,1)
$$

の中で議論します。しかし最終的には元の大きな環 $A$ でのスペクトルを使いたいので、

$$
\sigma_B(a)
=
\sigma_A(a)
$$

を保証する必要があります。

一般の Banach 部分環ではこれは自動ではありません。$C^*$-構造が効きます。

<a id="thm-oa4-spectral-invariance"></a>

<!-- formal-statement-start -->
### 定理（単位的 C*-部分環ではスペクトルが保存される）

$A$ を単位的 $C^*$-環、$B\subset A$ を同じ単位元を持つ単位的 $C^*$-部分環とする。

任意の $b\in B$ に対して

$$
\boxed{
\sigma_B(b)=\sigma_A(b)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

常に

$$
\sigma_A(b)\subset\sigma_B(b)
$$

です。逆向きが問題です。

$\lambda1-b$ が $A$ で可逆なら

$$
c=(\lambda1-b)^*(\lambda1-b)
$$

は自己共役で $A$ で可逆です。OA3 で証明した「自己共役元の逆元は、その元が生成する C*-部分環へ戻る」という補題を $c$ に適用します。

<!-- proof-start -->
### 証明

$B$ で可逆な元は $A$ でも同じ逆元を持つので

$$
\sigma_A(b)\subset\sigma_B(b)
$$

です。

逆向きを示します。$\lambda\notin\sigma_A(b)$ とします。

$$
x=\lambda1-b
$$

と置くと、$x$ は $A$ で可逆です。

$$
c=x^*x
$$

と置きます。$x\in B$ なので $c\in B$ です。また

$$
c^*=c
$$

で自己共役です。

$x$ が可逆なので

$$
c^{-1}
=
x^{-1}(x^*)^{-1}
$$

が $A$ に存在します。従って

$$
0\notin\sigma_A(c).
$$

[OA3 の自己共役元が生成する部分代数での逆元近似](../OA3/index.md#lem-oa3-self-adjoint-generated-inverse)を自己共役元 $c$ と $\lambda=0$ に適用すると

$$
c^{-1}\in C^*(c,1).
$$

$c\in B$ かつ $B$ は単位的 C*-部分環なので

$$
C^*(c,1)\subset B.
$$

従って $c^{-1}\in B$ です。

そこで

$$
y=c^{-1}x^*
$$

と置くと $y\in B$ で、

$$
yx
=
c^{-1}x^*x
=
c^{-1}c
=
1.
$$

一方、$x$ は $A$ で可逆でした。$yx=1$ の右から $x^{-1}$ を掛けると

$$
y=x^{-1}.
$$

従って $x^{-1}\in B$ です。

つまり $\lambda1-b$ は $B$ でも可逆なので

$$
\lambda\notin\sigma_B(b).
$$

よって

$$
\sigma_B(b)\subset\sigma_A(b).
$$

両包含を合わせて

$$
\sigma_B(b)=\sigma_A(b).
$$
<!-- proof-end -->

この定理のおかげで、以後 $C^*(a,1)$ の中へ移ってもスペクトルを取り違えません。

---

## 6. 正規元のスペクトルは character 空間そのものになる

$a$ を正規元とし、

$$
B=C^*(a,1)
$$

と置きます。第2節から $B$ は可換です。

OA2 では可換 Banach 環のスペクトルを character の値として表しました。ここではさらに、一つの生成元 $a$ があるため character 全体を $a$ の値だけで識別できます。

<a id="thm-oa4-character-spectrum-homeomorphism"></a>

<!-- formal-statement-start -->
### 定理（正規元の character 空間はスペクトルと同相である）

$A$ を単位的 $C^*$-環、$a\in A$ を正規元とし

$$
B=C^*(a,1)
$$

とする。

写像

$$
\Theta:\Delta(B)\to\sigma_A(a),
\qquad
\Theta(\varphi)=\varphi(a)
$$

は同相写像である。
<!-- formal-statement-end -->

### 証明の見取り図

全射性は OA2 のスペクトルの character 表示と、前節のスペクトル不変性から従います。

単射性では、二つの character が $a$ で同じ値を取れば $a^*$ でも同じ値を取り、従って $a,a^*$ の全ての *-多項式で一致します。これを稠密性で $B$ 全体へ広げます。

<!-- proof-start -->
### 証明

$B$ は可換単位的 $C^*$-環です。

[OA2 のスペクトルの character 表示](../OA2/index.md#thm-oa2-spectrum-character)から

$$
\sigma_B(a)
=
\{\varphi(a):\varphi\in\Delta(B)\}.
$$

前節の[スペクトル不変性](#thm-oa4-spectral-invariance)から

$$
\sigma_B(a)=\sigma_A(a).
$$

従って $\Theta$ は全射です。

次に単射性を示します。$\varphi,\psi\in\Delta(B)$ が

$$
\varphi(a)=\psi(a)
$$

を満たすとします。

OA3 の character の随伴保存から

$$
\varphi(a^*)
=
\overline{\varphi(a)}
=
\overline{\psi(a)}
=
\psi(a^*).
$$

従って $a,a^*$ の任意の *-多項式 $p(a,a^*)$ に対して

$$
\varphi(p(a,a^*))
=
\psi(p(a,a^*)).
$$

$B=C^*(a,1)$ の定義から、任意の $b\in B$ に対し *-多項式列 $p_n(a,a^*)$ を

$$
p_n(a,a^*)\to b
$$

となるように選べます。

character は連続なので

$$
\begin{aligned}
\varphi(b)
&=
\lim_{n\to\infty}\varphi(p_n(a,a^*))\\
&=
\lim_{n\to\infty}\psi(p_n(a,a^*))\\
&=
\psi(b).
\end{aligned}
$$

従って $\varphi=\psi$ であり、$\Theta$ は単射です。

Gelfand 位相の定義により、各 $b\in B$ に対する評価写像

$$
\varphi\mapsto\varphi(b)
$$

は連続です。特に $b=a$ とすれば $\Theta$ は連続です。

$\Delta(B)$ は OA2 でコンパクト Hausdorff と分かっています。$\sigma_A(a)$ は $\mathbb C$ のコンパクト部分集合なので Hausdorff です。

コンパクト空間から Hausdorff 空間への連続全単射は同相写像なので、$\Theta$ は同相です。
<!-- proof-end -->

ここで初めて

$$
\Delta(C^*(a,1))
\cong
\sigma_A(a)
$$

が得られました。可換 Gelfand--Naimark 定理と組み合わせると、$C^*(a,1)$ はスペクトル上の連続関数環になります。

---

## 7. 連続関数を元へ代入する

準備が全てそろいました。

$a$ を正規元とし

$$
K=\sigma_A(a)
$$

と置きます。

第6節の同相写像

$$
\Theta:\Delta(C^*(a,1))\to K
$$

により、$f\in C(K)$ は

$$
\varphi\mapsto f(\varphi(a))
$$

という character 空間上の連続関数になります。

可換 Gelfand--Naimark 定理でこの関数を $C^*(a,1)$ の元へ戻します。

<a id="thm-oa4-continuous-functional-calculus"></a>

<!-- formal-statement-start -->
### 定理（正規元の連続関数計算）

$A$ を単位的 $C^*$-環、$a\in A$ を正規元とし

$$
K=\sigma_A(a)
$$

とする。

座標関数

$$
\iota:K\to\mathbb C,
\qquad
\iota(z)=z
$$

に対して

$$
\Phi_a(\iota)=a
$$

を満たす単位的 *-準同型

$$
\Phi_a:C(K)\to C^*(a,1)
$$

がただ一つ存在する。

さらに $\Phi_a$ は全射かつ等長であり、

$$
\boxed{
\|\Phi_a(f)\|
=
\|f\|_\infty
}
$$

を満たす。

$\Phi_a(f)$ を

$$
\boxed{
f(a)
}
$$

と書く。
<!-- formal-statement-end -->

### 証明の見取り図

$B=C^*(a,1)$ と置きます。

1. character 空間を $\Theta$ で $K$ と同一視する。
2. $f\in C(K)$ を $f\circ\Theta$ として $C(\Delta(B))$ へ送る。
3. 可換 Gelfand--Naimark 同型の逆写像で $B$ へ戻す。

一意性は、座標関数 $z$ と複素共役 $\overline z$ から作る *-多項式が $C(K)$ に稠密であることから示します。

<!-- proof-start -->
### 証明

$$
B=C^*(a,1)
$$

と置きます。第2節から $B$ は可換です。

第6節の同相写像を

$$
\Theta:\Delta(B)\to K,
\qquad
\Theta(\varphi)=\varphi(a)
$$

とします。

写像

$$
U:C(K)\to C(\Delta(B))
$$

を

$$
U(f)=f\circ\Theta
$$

で定めます。

$\Theta$ は同相なので $U$ は単位的 *-同型です。また

$$
\|U(f)\|_\infty
=
\sup_{\varphi\in\Delta(B)}
|f(\Theta(\varphi))|
=
\sup_{z\in K}|f(z)|
=
\|f\|_\infty.
$$

従って $U$ は等長です。

第4節の[可換 Gelfand--Naimark 定理](#thm-oa4-commutative-gelfand-naimark)から

$$
\Gamma:B\to C(\Delta(B))
$$

も単位的な等長 *-同型です。

そこで

$$
\Phi_a
=
\Gamma^{-1}\circ U
$$

と定めます。

$\Phi_a$ は単位的な等長 *-同型なので、全射で

$$
\|\Phi_a(f)\|=\|f\|_\infty
$$

を満たします。

座標関数 $\iota(z)=z$ について、任意の $\varphi\in\Delta(B)$ で

$$
U(\iota)(\varphi)
=
\iota(\Theta(\varphi))
=
\varphi(a)
=
\Gamma(a)(\varphi).
$$

従って

$$
U(\iota)=\Gamma(a),
$$

よって

$$
\Phi_a(\iota)=a.
$$

最後に一意性を示します。

$\Psi:C(K)\to B$ を別の単位的 *-準同型で

$$
\Psi(\iota)=a
$$

を満たすものとします。

* を保つので

$$
\Psi(\overline\iota)
=
\Psi(\iota^*)
=
\Psi(\iota)^*
=
a^*.
$$

従って $z$ と $\overline z$ の任意の *-多項式 $q(z,\overline z)$ に対して

$$
\Psi(q)=q(a,a^*)=\Phi_a(q).
$$

$z,\overline z$ の *-多項式全体は定数を含み、複素共役で閉じ、異なる二点 $z,w\in K$ を座標関数 $\iota$ 自身で分離します。

[自己共役部分代数版 Stone--Weierstrass 定理](#thm-oa4-stone-weierstrass-self-adjoint)から、この *-多項式代数は $C(K)$ に稠密です。

任意の $f\in C(K)$ に対し *-多項式列 $q_n$ を

$$
q_n\to f
$$

と一様収束するように選びます。

[OA3 の *-準同型の縮小性](../OA3/index.md#thm-oa3-star-hom-contractive)から $\Psi$ は連続です。$\Phi_a$ は等長なので連続です。従って

$$
\Psi(f)
=
\lim_{n\to\infty}\Psi(q_n)
=
\lim_{n\to\infty}\Phi_a(q_n)
=
\Phi_a(f).
$$

よって $\Psi=\Phi_a$ です。
<!-- proof-end -->

この定理から、任意の $f,g\in C(K)$ に対して

$$
(f+g)(a)=f(a)+g(a),
$$

$$
(fg)(a)=f(a)g(a),
$$

$$
\overline f(a)=f(a)^*,
$$

$$
1(a)=1
$$

が自動的に従います。

特に *-多項式

$$
q(z,\overline z)
$$

なら

$$
q(a)
=
q(a,a^*)
$$

という元々の代入と一致します。

正規元が自己共役とは限らない場合、$z$ だけの多項式ではなく $z$ と $\overline z$ の *-多項式が自然に現れる点が重要です。

---

## 8. スペクトルも関数と一緒に動く

$f(a)$ を作れたら、そのスペクトルはどうなるでしょうか。

連続関数環 $C(K)$ では答えが直接見えます。$f\in C(K)$ に対して

$$
\lambda1-f
$$

が可逆であることは、関数 $\lambda-f(z)$ が全ての $z\in K$ で $0$ でないことと同値です。

<a id="thm-oa4-continuous-spectral-mapping"></a>

<!-- formal-statement-start -->
### 定理（連続スペクトル写像）

$A$ を単位的 $C^*$-環、$a\in A$ を正規元とする。

任意の

$$
f\in C(\sigma_A(a))
$$

に対して

$$
\boxed{
\sigma_A(f(a))
=
f(\sigma_A(a))
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず $C(K)$ で関数 $f$ 自身のスペクトルが値域 $f(K)$ に一致することを直接示します。

その後、連続関数計算の *-同型で $C(K)$ と $C^*(a,1)$ を同一視し、最後に第5節のスペクトル不変性で元の環 $A$ へ戻します。

<!-- proof-start -->
### 証明

$$
K=\sigma_A(a)
$$

と置きます。

まず $C(K)$ で $f$ のスペクトルを計算します。

$\lambda\notin f(K)$ とします。すると全ての $z\in K$ で

$$
\lambda-f(z)\ne0.
$$

関数

$$
g(z)=\frac1{\lambda-f(z)}
$$

は $K$ 上連続です。従って $g\in C(K)$ で

$$
(\lambda1-f)g
=
g(\lambda1-f)
=
1.
$$

よって $\lambda1-f$ は可逆です。

逆に $\lambda=f(z_0)$ となる $z_0\in K$ があるとします。もし $\lambda1-f$ が可逆なら、ある $g\in C(K)$ が存在して

$$
(\lambda1-f)g=1
$$

となるはずです。

$z_0$ で評価すると

$$
(\lambda-f(z_0))g(z_0)=0,
$$

一方右辺は $1$ なので矛盾です。

従って

$$
\sigma_{C(K)}(f)=f(K).
$$

第7節の $\Phi_a$ は単位的代数同型なので可逆性を保ち、

$$
\sigma_{C^*(a,1)}(f(a))
=
\sigma_{C(K)}(f)
=
f(K).
$$

さらに第5節の[スペクトル不変性](#thm-oa4-spectral-invariance)から

$$
\sigma_A(f(a))
=
\sigma_{C^*(a,1)}(f(a)).
$$

従って

$$
\sigma_A(f(a))
=
f(\sigma_A(a)).
$$
<!-- proof-end -->

この定理から、スペクトル上の点ごとの条件をそのまま環の性質へ移せます。

たとえば $f$ が実数値なら

$$
\overline f=f
$$

なので

$$
f(a)^*=f(a),
$$

すなわち $f(a)$ は自己共役です。

$f\ge0$ なら

$$
\sigma_A(f(a))
=
f(\sigma_A(a))
\subset[0,\infty)
$$

なので $f(a)$ は正元です。

さらに

$$
|f(z)|=1
\quad
(z\in\sigma_A(a))
$$

なら

$$
\overline f\,f=1
$$

なので

$$
f(a)^*f(a)=1
$$

かつ同様に $f(a)f(a)^*=1$ であり、$f(a)$ は unitary 元です。

---

## 9. 自己共役元では「多項式の極限」が見える

$a=h=h^*$ の場合、[OA3](../OA3/index.md#thm-oa3-self-adjoint-real-spectrum)から

$$
\sigma_A(h)\subset\mathbb R.
$$

このとき連続関数計算は、最初に目標としていた多項式近似そのものとして読めます。

$K=\sigma_A(h)$ とします。実数値連続関数 $f\in C(K,\mathbb R)$ に対し、$K$ 上の実多項式は定数を含み点を分離するので [RA8 の実 Stone--Weierstrass 定理](../RA8/index.md#thm-ra8-stone-weierstrass)から実係数多項式 $p_n$ を

$$
\|p_n-f\|_\infty\to0
$$

となるように選べます。

連続関数計算の等長性から

$$
\|p_n(h)-f(h)\|
=
\|p_n-f\|_\infty
\to0.
$$

複素数値の $f$ でも実部・虚部を別々に近似すれば同じ結論です。

つまり

$$
\boxed{
f(h)
=
\lim_{n\to\infty}p_n(h)
}
$$

という形で本当に「多項式を連続関数へ拡張」しています。

OA3 で個別に構成した正の平方根も一致します。正元 $b$ に

$$
f(t)=\sqrt t
$$

を適用すれば $f(b)$ は正元で

$$
f(b)^2=b.
$$

OA3 で正の平方根の一意性を証明済みなので、この $f(b)$ は OA3 の $b^{1/2}$ と同じ元です。

---

## 10. 三つの具体例

### 10.1 projection

$p$ を $0,1$ 以外の projection とします。[OA3](../OA3/index.md#def-oa3-projection)から

$$
\sigma_A(p)=\{0,1\}.
$$

任意の

$$
f\in C(\{0,1\})
$$

に対し

$$
g(z)=f(0)(1-z)+f(1)z
$$

と置くと、$z=0,1$ で $g=f$ です。

従って連続関数計算により

$$
\boxed{
f(p)
=
f(0)(1-p)+f(1)p.
}
$$

二点上の連続関数は二つの値 $f(0),f(1)$ だけで決まり、$C^*(p,1)$ が $\operatorname{span}\{1,p\}$ だったことと完全に対応します。

### 10.2 対角行列

$$
a=
\begin{pmatrix}
1&0\\
0&i
\end{pmatrix}
$$

では

$$
\sigma(a)=\{1,i\}.
$$

projection の例と同様に、二点集合上の関数は二つの値で決まります。従って

$$
\boxed{
f(a)
=
\begin{pmatrix}
f(1)&0\\
0&f(i)
\end{pmatrix}.
}
$$

たとえば $f(z)=|z|$ なら

$$
f(a)=I.
$$

### 10.3 $C(K)$ では合成になる

$K$ をコンパクト Hausdorff 空間、$g\in C(K)$ とします。$C(K)$ は可換なので $g$ は正規元です。

スペクトルは値域

$$
\sigma_{C(K)}(g)=g(K)
$$

です。

任意の $f\in C(g(K))$ に対して

$$
\Psi(f)=f\circ g
$$

と置きます。

まず $\Psi(f)$ が実際に $C^*(g,1)$ に属することを確認します。$g(K)$ 上の $z,\overline z$ の *-多項式全体は、定数を含み、複素共役で閉じ、座標関数 $z$ によって点を分離します。したがって[自己共役部分代数版 Stone--Weierstrass 定理](#thm-oa4-stone-weierstrass-self-adjoint)から、*-多項式 $q_n(z,\overline z)$ を

$$
\|q_n-f\|_{\infty,g(K)}\to0
$$

となるように選べます。

合成すると

$$
\|q_n(g,g^*)-f\circ g\|_{\infty,K}
\le
\|q_n-f\|_{\infty,g(K)}
\to0.
$$

各 $q_n(g,g^*)$ は $C^*(g,1)$ に属し、$C^*(g,1)$ は閉なので

$$
f\circ g\in C^*(g,1).
$$

従って

$$
\Psi:C(g(K))\to C^*(g,1)
$$

は単位的 *-準同型として定まり、座標関数 $\iota(z)=z$ に対して

$$
\Psi(\iota)=g.
$$

[正規元の連続関数計算の一意性](#thm-oa4-continuous-functional-calculus)から

$$
\boxed{
f(g)=f\circ g.
}
$$

従って抽象的な記号 $f(a)$ は、連続関数環では文字通りの関数合成です。

---

# 演習

## Level A

### A1. 正規元の基本例

- Level: A

単位的 $C^*$-環 $A$ で次を示せ。

1. 自己共役元は正規元である。
2. unitary 元は正規元である。
3. projection は正規元である。

<!-- solution-start -->
### 詳細解答

#### 1. 自己共役元

$h^*=h$ なので

$$
h^*h
=
h^2
=
hh^*.
$$

従って $h$ は正規元です。

#### 2. unitary 元

unitary 元 $u$ は

$$
u^*u=1,
\qquad
uu^*=1
$$

を満たすので

$$
u^*u=uu^*.
$$

従って正規元です。

#### 3. projection

projection $p$ は $p^*=p$ なので1と同じ計算で

$$
p^*p
=
p^2
=
pp^*.
$$

従って正規元です。
<!-- solution-end -->

### A2. projection が生成する環

- Level: A

$p$ を単位的 $C^*$-環の projection とする。

1. $p$ の任意の正整数冪が $p$ に等しいことを示せ。
2. $p,p^*$ の任意の *-多項式が $\alpha1+\beta p$ の形になることを示せ。
3. $C^*(p,1)=\operatorname{span}\{1,p\}$ を導け。

<!-- solution-start -->
### 詳細解答

#### 1. 冪

$p^2=p$ です。$p^n=p$ と仮定すると

$$
p^{n+1}
=
p^np
=
p^2
=
p.
$$

従って帰納法で全ての $n\ge1$ に対して $p^n=p$ です。

#### 2. *-多項式

$p^*=p$ なので、$p$ と $p^*$ を混ぜた積は全て $p$ の冪です。

定数項は $\alpha1$、正次数の項は全て係数をまとめて $\beta p$ になります。従って

$$
q(p,p^*)=\alpha1+\beta p.
$$

#### 3. 閉包

$$
B=\operatorname{span}\{1,p\}
$$

は高々2次元なので閉です。2から全 *-多項式が $B$ に入り、逆に $1,p\in C^*(p,1)$ なので $B\subset C^*(p,1)$ です。

従って

$$
C^*(p,1)=B.
$$
<!-- solution-end -->

### A3. 連続関数環でのスペクトル

- Level: A

$K$ をコンパクト Hausdorff 空間、$f\in C(K)$ とする。

$$
\sigma_{C(K)}(f)=f(K)
$$

を、可逆性の定義から直接示せ。

<!-- solution-start -->
### 詳細解答

$\lambda\notin f(K)$ とします。全ての $x\in K$ で

$$
\lambda-f(x)\ne0.
$$

従って

$$
g(x)=\frac1{\lambda-f(x)}
$$

は連続で、

$$
(\lambda1-f)g=1.
$$

点ごとの積は可換なので $g(\lambda1-f)=1$ も成り立ちます。よって $\lambda1-f$ は可逆です。

逆に $\lambda=f(x_0)$ とします。もし $\lambda1-f$ が可逆なら、ある $g\in C(K)$ が存在して

$$
(\lambda1-f)g=1.
$$

$x_0$ で評価すると左辺は

$$
(\lambda-f(x_0))g(x_0)=0
$$

ですが右辺は $1$ で矛盾です。

従って非可逆となる $\lambda$ はちょうど $f(K)$ であり、

$$
\sigma_{C(K)}(f)=f(K).
$$
<!-- solution-end -->

### A4. projection の連続関数計算

- Level: A

$p\ne0,1$ を projection とし、$f\in C(\{0,1\})$ とする。

$$
f(p)
=
f(0)(1-p)+f(1)p
$$

を示せ。

<!-- solution-start -->
### 詳細解答

二点集合 $\{0,1\}$ 上で

$$
g(z)=f(0)(1-z)+f(1)z
$$

と置きます。

$z=0$ では

$$
g(0)=f(0),
$$

$z=1$ では

$$
g(1)=f(1).
$$

従って $g=f$ です。

連続関数計算は多項式代入と一致するので

$$
\begin{aligned}
f(p)
&=g(p)\\
&=f(0)(1-p)+f(1)p.
\end{aligned}
$$
<!-- solution-end -->

## Level B

### B1. character は生成元の値だけで決まる

- Level: B

$a$ を正規元、$B=C^*(a,1)$ とする。$\varphi,\psi\in\Delta(B)$ が

$$
\varphi(a)=\psi(a)
$$

を満たすとき $\varphi=\psi$ を示せ。

<!-- solution-start -->
### 詳細解答

OA3 で character は随伴を複素共役へ送ることを証明しました。従って

$$
\varphi(a^*)
=
\overline{\varphi(a)}
=
\overline{\psi(a)}
=
\psi(a^*).
$$

character は線形かつ乗法的なので、$a,a^*$ の任意の *-多項式 $q$ に対し

$$
\varphi(q(a,a^*))
=
\psi(q(a,a^*)).
$$

任意の $b\in B$ を取ります。$B=C^*(a,1)$ なので *-多項式列 $q_n(a,a^*)$ を

$$
q_n(a,a^*)\to b
$$

となるように取れます。

character は連続なので

$$
\begin{aligned}
\varphi(b)
&=
\lim_n\varphi(q_n(a,a^*))\\
&=
\lim_n\psi(q_n(a,a^*))\\
&=
\psi(b).
\end{aligned}
$$

全ての $b\in B$ で一致するため

$$
\varphi=\psi.
$$
<!-- solution-end -->

### B2. 対角行列への連続関数計算

- Level: B

$$
a=
\begin{pmatrix}
2&0\\
0&-1
\end{pmatrix}
$$

とする。

1. $\sigma(a)=\{2,-1\}$ を示せ。
2. 任意の $f\in C(\{2,-1\})$ に対し

$$
f(a)
=
\begin{pmatrix}
f(2)&0\\
0&f(-1)
\end{pmatrix}
$$

を示せ。
3. $f(t)=|t|$ のとき $f(a)$ を求めよ。

<!-- solution-start -->
### 詳細解答

#### 1. スペクトル

$$
\lambda I-a
=
\begin{pmatrix}
\lambda-2&0\\
0&\lambda+1
\end{pmatrix}.
$$

これは

$$
\lambda\ne2,
\qquad
\lambda\ne-1
$$

のとき、かつそのときに限り可逆です。従って

$$
\sigma(a)=\{2,-1\}.
$$

#### 2. 二点補間

二点 $2,-1$ 上で $f$ と一致する一次多項式

$$
p(t)
=
f(2)\frac{t+1}{3}
+
f(-1)\frac{2-t}{3}
$$

を取ります。

連続関数計算は多項式代入と一致するので

$$
f(a)=p(a).
$$

$a$ は対角行列なので

$$
p(a)
=
\begin{pmatrix}
p(2)&0\\
0&p(-1)
\end{pmatrix}
=
\begin{pmatrix}
f(2)&0\\
0&f(-1)
\end{pmatrix}.
$$

#### 3. 絶対値関数

$$
f(2)=2,
\qquad
f(-1)=1.
$$

従って

$$
f(a)
=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix}.
$$
<!-- solution-end -->

### B3. 可逆性をスペクトル上で判定する

- Level: B

$a$ を正規元、$f\in C(\sigma_A(a))$ とする。

1. $f(a)$ が可逆であるための必要十分条件が

$$
0\notin f(\sigma_A(a))
$$

であることを示せ。
2. 条件が成り立つとき

$$
f(a)^{-1}
=
\left(\frac1f\right)(a)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 必要十分条件

[連続スペクトル写像定理](#thm-oa4-continuous-spectral-mapping)から

$$
\sigma_A(f(a))
=
f(\sigma_A(a)).
$$

元が可逆であることと $0$ がスペクトルに入らないことは同値なので、

$$
f(a)\text{ が可逆}
$$

であることは

$$
0\notin\sigma_A(f(a))
$$

と同値です。

スペクトル写像を代入すると

$$
0\notin f(\sigma_A(a))
$$

と同値です。

#### 2. 逆元

$0\notin f(\sigma_A(a))$ なら

$$
g(z)=\frac1{f(z)}
$$

は $\sigma_A(a)$ 上連続です。

連続関数計算は積を保つので

$$
f(a)g(a)
=
(fg)(a)
=
1(a)
=
1.
$$

同様に

$$
g(a)f(a)=1.
$$

従って

$$
f(a)^{-1}=g(a)
=
\left(\frac1f\right)(a).
$$
<!-- solution-end -->

### B4. 正の元から対数を作る

- Level: B

$a$ を正元とし、さらに可逆とする。

1. ある $m>0$ が存在して

$$
\sigma_A(a)\subset[m,\|a\|]
$$

となることを示せ。
2. 実数値連続関数 $\log t$ を $\sigma_A(a)$ 上で使って $\log a$ を定義できることを確認せよ。
3. $\log a$ が自己共役であることを示せ。
4. $e^{\log a}=a$ を示せ。

<!-- solution-start -->
### 詳細解答

#### 1. スペクトルの下端

$a$ は正元なので

$$
\sigma_A(a)\subset[0,\infty).
$$

また $a$ は可逆なので

$$
0\notin\sigma_A(a).
$$

スペクトルはコンパクトなので、連続関数 $\lambda\mapsto\lambda$ は $\sigma_A(a)$ 上で最小値を取ります。

その最小値を $m$ とすると、$0$ はスペクトルに入らないため

$$
m>0.
$$

さらに任意の $\lambda\in\sigma_A(a)$ で

$$
|\lambda|\le r(a)\le\|a\|.
$$

$\lambda\ge0$ なので

$$
\sigma_A(a)\subset[m,\|a\|].
$$

#### 2. 対数

$\log t$ は $(0,\infty)$ 上連続であり、1からスペクトルはその中に含まれます。

従って

$$
\log a
$$

を連続関数計算で定義できます。

#### 3. 自己共役性

$\log t$ はスペクトル上で実数値です。連続関数計算で実数値関数は自己共役元へ移るので

$$
(\log a)^*=\log a.
$$

#### 4. 指数との合成

スペクトル上で

$$
e^{\log t}=t.
$$

$\sigma_A(a)\subset[m,\|a\|]$ はコンパクトなので、指数関数のべき級数

$$
s_N(x)=\sum_{n=0}^N\frac{x^n}{n!}
$$

は $\log(\sigma_A(a))$ 上で $e^x$ へ一様収束します。

連続関数計算の等長性と積の保存から

$$
s_N(\log a)
=
(s_N\circ\log)(a).
$$

左辺は $N\to\infty$ で Banach 環の指数級数により $e^{\log a}$ へ収束します。右辺は

$$
s_N(\log t)\to e^{\log t}=t
$$

がスペクトル上で一様なので、等長性から $a$ へ収束します。

従って

$$
e^{\log a}=a.
$$
<!-- solution-end -->

## Level C

### C1. 可逆な正規元を「大きさ」と「位相」に分ける

- Level: C

$a$ を単位的 $C^*$-環の可逆な正規元とする。$K=\sigma_A(a)$ と置く。

$0\notin K$ なので

$$
r(z)=|z|,
\qquad
u(z)=\frac{z}{|z|}
$$

は $K$ 上連続である。

$$
b=r(a),
\qquad
v=u(a)
$$

と定める。

1. $b$ が正元で可逆であることを示せ。
2. $v$ が unitary 元であることを示せ。
3. $a=vb=bv$ を示せ。
4. $b^2=a^*a$ を示せ。
5. 以上から $b$ が OA3 の正の平方根 $(a^*a)^{1/2}$ に一致することを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. $b$ の正性と可逆性

$r(z)=|z|$ は実数値で

$$
r(z)>0
\qquad
(z\in K)
$$

です。

従って $b=r(a)$ は自己共役です。

連続スペクトル写像から

$$
\sigma_A(b)
=
r(K)
=
\{|z|:z\in K\}
\subset(0,\infty).
$$

したがって $b$ は正元です。

さらに $0\notin\sigma_A(b)$ なので $b$ は可逆です。

#### 2. $v$ の unitary 性

$K$ 上で

$$
|u(z)|=1.
$$

従って

$$
\overline{u(z)}u(z)=1
$$

です。

連続関数計算は積と複素共役を保つので

$$
v^*v
=
\overline u(a)u(a)
=
(\overline uu)(a)
=
1.
$$

同様に

$$
vv^*=1.
$$

従って $v$ は unitary 元です。

#### 3. 積

各 $z\in K$ で

$$
u(z)r(z)
=
\frac{z}{|z|}|z|
=
z.
$$

また通常の複素数の積は可換なので

$$
r(z)u(z)=z.
$$

従って

$$
vb
=
(ur)(a)
=
\iota(a)
=
a,
$$

$$
bv
=
(ru)(a)
=
a.
$$

よって

$$
a=vb=bv.
$$

#### 4. $b^2$

座標関数を $\iota(z)=z$ とすると

$$
a=\iota(a),
\qquad
a^*=\overline\iota(a).
$$

従って

$$
a^*a
=
(\overline\iota\,\iota)(a).
$$

スペクトル上では

$$
\overline z\,z
=
|z|^2
=
r(z)^2.
$$

よって

$$
a^*a
=
(r^2)(a)
=
r(a)^2
=
b^2.
$$

#### 5. 正の平方根

1で $b$ は正元、4で

$$
b^2=a^*a.
$$

さらに4の計算から

$$
a^*a
=
(|z|^2)(a).
$$

関数 $|z|^2$ はスペクトル上で非負なので、第8節の結果から $a^*a$ は正元です。

[OA3 の「正元には一意な正の平方根が存在する」](../OA3/index.md#thm-oa3-positive-square-root)で正の平方根の一意性を証明済みです。

従って

$$
\boxed{
b=(a^*a)^{1/2}.
}
$$

したがって

$$
\boxed{
a=v(a^*a)^{1/2}
}
$$

と書けます。

ここでは $a$ が正規かつ可逆なので、連続関数計算だけで「絶対値」と「単位円上の位相」に分解できました。
<!-- solution-end -->

---

## まとめ

本章では、OA3 で個別に行った多項式近似を一つの一般原理へまとめました。

まず正規元

$$
a^*a=aa^*
$$

に対して

$$
C^*(a,1)
$$

が可換であることを示しました。

次に、コンパクト Hausdorff 空間上の自己共役な部分代数に対する Stone--Weierstrass 型近似を証明し、OA3 で「等長かつ単射」まで到達していた Gelfand 変換を全射へ押し上げました。

その結果、可換単位的 $C^*$-環 $A$ は

$$
A\cong C(\Delta(A))
$$

と表せます。

さらに C*-部分環でスペクトルが保存されることを証明し、正規元 $a$ について

$$
\Delta(C^*(a,1))
\cong
\sigma_A(a)
$$

を得ました。

二つを合わせると

$$
\boxed{
C^*(a,1)
\cong
C(\sigma_A(a))
}
$$

です。この同型の逆向きが連続関数計算

$$
f
\longmapsto
f(a)
$$

です。

等長性

$$
\|f(a)\|
=
\max_{\lambda\in\sigma_A(a)}|f(\lambda)|
$$

と、連続スペクトル写像

$$
\sigma_A(f(a))
=
f(\sigma_A(a))
$$

により、スペクトル上の連続関数をそのまま $C^*$-環の元として扱えるようになりました。

次章では、ここで作った連続関数計算を使い、正元から「確率を与える線形汎関数」へ進みます。そこから状態と GNS 構成を作り、抽象的な $C^*$-環を Hilbert 空間上の作用素として表現します。
