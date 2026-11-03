# COMB13 形式的反転と再帰構造

[COMB10 の再帰分解](../COMB10/index.md#def-comb10-proper-recursion)では、部品へ分けると大きさが減ることから母関数の方程式を作りました。しかし $F=x(1+F)^2$ のように未知の母関数が両辺に現れると、係数を一つずつ求めることはできても、一般の第 $n$ 項はまだ見えません。方程式を形式的に解き、**任意の次数の係数を一度に取り出す**のがこの章の問いです。

以降、係数は有理数、母関数は $\mathbb Q[[x]]$ の元とします。[COMB9 で定義した係数列と係数抽出](../COMB9/index.md#def-comb9-formal-series)、[Cauchy 積](../COMB9/index.md#def-comb9-cauchy-product)、[定数項による可逆性判定](../COMB9/index.md#thm-comb9-unit-criterion)、[定数項零の対象への合成](../COMB9/index.md#def-comb9-composition)は既習です。ここでいう「形式的」は数値として評価可能かどうかや、実数値関数として微分可能かどうかを要求しない、という意味です。

## 1. 方程式の右辺が一つ次数を上げる

たとえば根を一つ置き、その下へ順序付きの二つの部分構造を付ける仕様では、根が大きさ $1$ を消費します。子の部分構造の大きさがそれぞれ $i,j$ なら完成品の大きさは $1+i+j$。この一個の根のおかげで、次数 $n$ を求めるのに必要なのは既に求めた次数 $n-1$ 以下の係数だけです。

より一般に、$\phi(u)=c_0+c_1u+c_2u^2+\cdots$ は既知の形式冪級数とし、定数項のない未知の $F(x)$ について次を考えます。

$$
F(x)=x\phi(F(x)).
$$

右辺の先頭の $x$ が「サイズを一個消費する」という条件です。$\phi$ は収束しなくても、$F(0)=0$ なら [形式的合成](../COMB9/index.md#def-comb9-composition)が各次数で有限に定まります。

<a id="def-comb13-root-recursion"></a>

<!-- formal-statement-start -->
> **定義（根を一個消費する形式的再帰方程式）**
>
> $\phi(u)\in\mathbb Q[[u]]$ を固定する。未知の $F(x)\in x\mathbb Q[[x]]$ が

$$
F(x)=x\phi(F(x))
$$

> を満たすとき、この等式を根を一個消費する形式的再帰方程式という。ここで $x\mathbb Q[[x]]$ は定数項 $0$ の形式冪級数全体を表す。$\phi(0)$ はこの定義では零でもよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb13-root-recursion -->
### 例：二つの子の場所を持つ木

**定義の確認**として $\phi(u)=(1+u)^2=1+2u+u^2$ とします。左右の子の場所は別々で、各場所は空か、同種の木で満たされます。[大きさ加法的な積](../COMB10/index.md#thm-comb10-sum-product)を左右の場所に用い、根を大きさ $1$ とすれば $F=x(1+F)^2$ です。定数項零の $F=f_1x+f_2x^2+f_3x^3+\cdots$ を代入すると、

$$
\begin{aligned}
f_1&=1,\\
f_2&=2f_1=2,\\
f_3&=2f_2+f_1^2=4+1=5,\\
f_4&=2f_3+2f_1f_2=10+4=14.
\end{aligned}
$$

たとえば三頂点の木は「片側に二頂点の木」を置く $2\cdot2=4$ 通りと「両側に一頂点の木」を置く一通りです。各非空の木には根があり、それを取り除くと小さい二つの木が**左右を区別して**一意に復元されます。大小と分解条件の両方が検証できました。
<!-- definition-example-end -->

<a id="thm-comb13-fixed-point"></a>

<!-- formal-statement-start -->
> **定理（形式的再帰方程式の存在と一意性）**
>
> 任意の $\phi(u)=\sum_{j\geq0}c_ju^j\in\mathbb Q[[u]]$ に対し、$F(0)=0$ で $F=x\phi(F)$ を満たす $F(x)\in\mathbb Q[[x]]$ がただ一つ存在する。
>
> 特に $\phi(0)\ne0$ なら $[x]F=\phi(0)\ne0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$F=\sum_{n\geq1}f_nx^n$ と置くと $x^n$ の係数は $\phi(F)$ の $x^{n-1}$ の係数です。合成の次数 $n-1$ には $f_n$ が出ません。$n$ の小さい順に一意に値が決まるため、無限個の方程式を同時に解く必要はありません。

<!-- proof-start -->
### 証明

$f_0=0$ とし、$n\geq1$ に対して

$$
f_n=[x^{n-1}]\phi\left(\sum_{i=1}^{n-1}f_ix^i\right)
$$

で帰納的に定めます。$n=1$ では和は $0$ なので $f_1=c_0$。$n\geq2$ でも $c_jF^j$ の次数 $n-1$ へ寄与するのは $0\leq j\leq n-1$ の有限項だけです。さらに $F(0)=0$ なので各積に現れる係数の添字は $1,\ldots,n-1$ に限られます。

この手順で全 $f_n$ が定まり、構成した $F$ とその切り詰め多項式は次数 $n-1$ まで一致します。従って $[x^n]x\phi(F)=f_n=[x^n]F$ が全ての $n\geq1$ で成立し、定数項は双方 $0$ です。存在が従います。

別の解 $\widetilde F=\sum_{n\geq1}\widetilde f_nx^n$ があるとします。$n=1$ はともに $c_0$ です。$i<n$ で $f_i=\widetilde f_i$ と仮定すると、$x^{n-1}$ までの合成係数は同じなので

$$
\widetilde f_n=[x^{n-1}]\phi(\widetilde F)
=[x^{n-1}]\phi(F)=f_n.
$$

数学的帰納法により全係数が等しく、一意です。
<!-- proof-end -->

$x$ を外した $F=\phi(F)$ では、この帰納構成は成立しません。たとえば $F=F$ は任意の $F\in x\mathbb Q[[x]]$ が解です。**根が大きさを消費すること**が存在一意性の証明機構です。

## 2. 形式的に微分して「逆」を取る

次に係数を式で求めるため、通常の多項式の微分を係数列へ拡張します。これは実数を代入して極限を取る操作ではありません。

<a id="def-comb13-formal-derivative"></a>

<!-- formal-statement-start -->
> **定義（形式的微分）**
>
> $A(u)=\sum_{n\geq0}a_nu^n\in\mathbb Q[[u]]$ に対して、形式的微分を

$$
A'(u)=\sum_{n\geq1}n a_nu^{n-1}
$$

> で定義する。微分記号は指定した形式変数 $u$ の次数を一つ下げる演算であり、$x$ と $u$ の微分を混同しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb13-formal-derivative -->
### 例：係数と積の微分

**定義の確認**として $A(u)=1+2u+3u^2+\cdots$ なら $A'(u)=2+6u+\cdots$ で、$[u]A'=2[u^2]A=6$ です。$n\geq1$ として、$A(u)B(u)$ の $u^{n-1}$ 係数を微分の前後で比べると、

$$
\begin{aligned}
[u^{n-1}](AB)'
&=n\sum_{i+j=n}a_ib_j\\
&=\sum_{i+j=n}i\,a_ib_j+\sum_{i+j=n}j\,a_ib_j\\
&=[u^{n-1}](A'B+AB').
\end{aligned}
$$

これは $i+j=n$ が有限個であるため成立する形式的な積の法則です。次に外側を $A(z)=\sum_{j\geq0}a_jz^j$、内側を $B(u)\in u\mathbb Q[[u]]$ と書きます。$A'$ は $z$、$B'$ は $u$ に関する形式的微分です。

合成したものを $u$ で微分すると、連鎖律は

$$
\begin{aligned}
\frac{d}{du}A(B(u))
&=\sum_{j\geq1}a_j\frac{d}{du}B(u)^j\\
&=\left(\sum_{j\geq1}j a_jB(u)^{j-1}\right)B'(u)\\
&=A'(B(u))B'(u)
\end{aligned}
$$

です。中段は形式的な積の法則を $B^j$ に $j$ 回適用したもので、次数 $u^n$ の係数に寄与するのは $j\leq n+1$ だけです。ここで $d/du$ は極限による微分ではなく、先ほど定義した係数操作を表します。
<!-- definition-example-end -->

定数項が零で一次係数が非零の $H(u)\in\mathbb Q[[u]]$ なら、別の $F\in x\mathbb Q[[x]]$ を合成し $H(F(x))=x$ とできそうです。ここで「逆数」$1/H$ と「合成逆」$F$ は異なる演算です。

<a id="def-comb13-compositional-inverse"></a>

<!-- formal-statement-start -->
> **定義（形式的合成逆）**
>
> $H(u)\in u\mathbb Q[[u]]$ に対し、$F(x)\in x\mathbb Q[[x]]$ が

$$
H(F(x))=x,\qquad F(H(u))=u
$$

> をともに満たすとき、$F$ を $H$ の形式的合成逆という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb13-compositional-inverse -->
### 例：分数形の合成逆

**定義の確認**として $H(u)=u/(1+u)$、$F(x)=x/(1-x)$ を考えます。分母の定数項が $1$ なので [形式冪級数の逆元](../COMB9/index.md#thm-comb9-unit-criterion)が存在し、$H(0)=F(0)=0$ なので両合成が定義されます。実際、

$$
H(F(x))=\frac{x/(1-x)}{1+x/(1-x)}=x,\qquad
F(H(u))=\frac{u/(1+u)}{1-u/(1+u)}=u.
$$

分数の約分は、定数項 $1$ の可逆な分母を掛けて等式を整理した省略表示です。したがって**左右両方**の合成条件を満たします。
<!-- definition-example-end -->

<a id="thm-comb13-inverse"></a>

<!-- formal-statement-start -->
> **定理（一次係数非零の級数の形式的合成逆）**
>
> $H(u)\in u\mathbb Q[[u]]$ の一次係数 $[u]H(u)$ が非零なら、形式的合成逆 $F(x)\in x\mathbb Q[[x]]$ は存在して一意である。
>
> 特に $\phi(0)\ne0$ のとき、$H(u)=u/\phi(u)$ と第1節の $F=x\phi(F)$ は互いに形式的合成逆である。
<!-- formal-statement-end -->

### 証明の見取り図

$H(u)=u\,h(u)$ と因数分解すると $h(0)\ne0$ です。したがって $h$ は可逆で、$H(F)=x$ は $F=x/h(F)$ に同値です。前節の存在一意性を適用し、反対側の合成も一意性で示します。

<!-- proof-start -->
### 証明

$H(u)=u h(u)$、$h(0)\ne0$ と置きます。[逆元の存在](../COMB9/index.md#thm-comb9-unit-criterion)から $\psi(u)=h(u)^{-1}$ が定まり、[形式的再帰方程式の存在一意性](#thm-comb13-fixed-point)を $\phi=\psi$ に適用して唯一の $F$ を得ます。

$$
F=x\psi(F)=\frac{x}{h(F)}
\quad\Longrightarrow\quad
H(F)=Fh(F)=x.
$$

反対向きについて、$Y(u)=F(H(u))$ と置きます。$F(0)=H(0)=0$ なので合成は定義され、上の関係を $x=H(u)$ に代入すると

$$
Y=H(u)\psi(Y).
$$

一方 $u=H(u)\psi(u)$ も成立します。$H(u)=\sum_{j\geq1}q_ju^j$ と書くと、$Y=H\psi(Y)$ の次数 $n$ の係数は

$$
[u^n]H\psi(Y)=\sum_{j=1}^n q_j[u^{n-j}]\psi(Y)
$$

です。各 $n-j\leq n-1$ なので、右辺は $Y$ の次数 $n-1$ 以下だけで決まります。[第1節と同じ係数帰納法](#thm-comb13-fixed-point)により、この方程式の定数項零の解は一意です。ゆえに $Y=u$、すなわち $F(H(u))=u$ です。

任意の別の合成逆 $\widetilde F$ は $H(\widetilde F)=x$ を満たし、従って $\widetilde F=x\psi(\widetilde F)$ なので先の一意性により $\widetilde F=F$。特例では $h=1/\phi$、$\psi=\phi$ です。
<!-- proof-end -->

一次係数非零は合成逆にとって必要です。$H(u)=u^2$ なら、どの $F(0)=0$ に対しても $H(F)$ の一次係数は $0$ で、$H(F)=x$ とできません。

## 3. Lagrange 反転公式の核心証明

$F=x\phi(F)$ から $f_n$ を帰納的に求めることはできました。今度は $\phi$ の **$n$ 乗の一つの係数**から $f_n$ を直接取り出します。その鍵は、形式冪級数に有限個の負の冪を加え、$u^{-1}$ の係数だけを見る操作です。

<a id="def-comb13-formal-residue"></a>

<!-- formal-statement-start -->
> **定義（形式的 Laurent 級数の留数）**
>
> ある整数 $m$ から始まる形式的な和 $A(u)=\sum_{k\geq m}a_ku^k$ を、有限個の負次数を許す形式的 Laurent 級数という。そこで $u^{-1}$ の係数を次の記号で表す。

$$
\operatorname{Res}_u A(u)\,du:=[u^{-1}]A(u)
$$

> $du$ はどの変数について係数を取るかを示す記号で、数値を積分して求めるものではない。微分は整数 $k$ に対して $(u^k)'=ku^{k-1}$ と拡張する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-comb13-formal-residue -->
### 例：負次数と微分を確かめる

**定義の確認**として $A(u)=2u^{-3}+5u^{-1}+1+u+\cdots$ は負次数が二種類しかないので許され、$\operatorname{Res}_u A\,du=5$ です。一方、

$$
\operatorname{Res}_u (u^k)'\,du
=\operatorname{Res}_u ku^{k-1}\,du=0
$$

です。$u^{-1}$ を作るには $k=0$ ですが、そのとき係数 $k$ 自身が $0$ だからです。線形性により、**微分したあとの $u^{-1}$ の係数は常に零**です。
<!-- definition-example-end -->

<a id="lem-comb13-residue-substitution"></a>

<!-- formal-statement-start -->
> **補題（形式的留数の変数変換）**
>
> $H(u)=u h(u)\in u\mathbb Q[[u]]$、$h(0)\ne0$ とする。任意の有限下限を持つ形式的 Laurent 級数 $A(x)$ に対し、

$$
\operatorname{Res}_x A(x)\,dx
=\operatorname{Res}_u A(H(u))H'(u)\,du.
$$

> 右辺の合成は、$H$ の一次係数が非零であることから各次数で有限に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

$A=x^k$ の場合を調べます。$k\ne-1$ なら右辺は $H^{k+1}$ の微分なので $u^{-1}$ の係数は零。$k=-1$ の場合だけ $H'/H=u^{-1}+h'/h$ となり、同係数が $1$ です。一般の $A$ は係数ごとの有限和で戻せます。

<!-- proof-start -->
### 証明

$H=uh$ で $h(0)\ne0$ なので、負の整数 $j$ に対する $H^j=u^j h^j$ も、可逆な $h$ の整数冪として意味を持ちます。

$k\ne-1$ のとき積の法則を整数冪まで拡張すれば、

$$
H^kH'=\frac{(H^{k+1})'}{k+1}.
$$

負の冪の積の法則は $(h^{-1})'=-h^{-2}h'$ を $hh^{-1}=1$ の微分から得て帰納的に示せます。従って微分の $u^{-1}$ 係数が零という直前の確認により、右辺の同係数は零です。左辺 $\operatorname{Res}_x x^k\,dx$ も $k\ne-1$ なら零です。

$k=-1$ なら $H'/H=(uh)'/(uh)=u^{-1}+h'/h$。$h'/h\in\mathbb Q[[u]]$ には負の次数がないので、右辺の $u^{-1}$ 係数は $1$、左辺も $1$ です。

一般に $A(x)=\sum_{k\geq m}a_kx^k$ とします。$H$ は一次係数非零なので、$H^kH'$ の最低次数は整数 $k$ です。従って $u^{-1}$ の係数へ寄与し得るのは

$$
m\leq k\leq-1
$$

を満たす有限個の項だけです。ここまで示した単項式の場合を係数ごとに足せば主張が従います。
<!-- proof-end -->

<a id="thm-comb13-lagrange"></a>

<!-- formal-statement-start -->
> **定理（Lagrange 反転公式）**
>
> $\phi(u)\in\mathbb Q[[u]]$、$\phi(0)\ne0$ とし、$F(x)\in x\mathbb Q[[x]]$ を $F=x\phi(F)$ の唯一の解とする。任意の $G(u)\in\mathbb Q[[u]]$ と整数 $n\geq1$ に対し、

$$
[x^n]G(F(x))
=\frac1n[u^{n-1}]G'(u)\phi(u)^n.
$$

> 特に $G(u)=u$ では

$$
[x^n]F(x)=\frac1n[u^{n-1}]\phi(u)^n.
$$

> 定数項は別に $[x^0]G(F)=G(0)$ であり、$n=0$ に上式の $1/n$ を使わない。
<!-- formal-statement-end -->

### 証明の見取り図

$H(u)=u/\phi(u)$ は $F$ の形式的合成逆です。$x$ の係数を $\operatorname{Res}_x$ の表記に直し、補題で $x=H(u)$ に変換します。最後に積の微分の $u^{-1}$ 係数が零という事実を使って $G$ の側へ微分を移します。

<!-- proof-start -->
### 証明

$\phi(0)\ne0$ なので、[逆元判定](../COMB9/index.md#thm-comb9-unit-criterion)から $H(u)=u/\phi(u)=u h(u)$ が定まり、[合成逆定理](#thm-comb13-inverse)より $H(F)=x$ および $F(H)=u$ です。$n\geq1$ とします。

$$
\begin{aligned}
[x^n]G(F(x))
&=\operatorname{Res}_x G(F(x))x^{-n-1}\,dx\\
&=\operatorname{Res}_u G(F(H(u)))H(u)^{-n-1}H'(u)\,du\\
&=\operatorname{Res}_u G(u)H(u)^{-n-1}H'(u)\,du.
\end{aligned}
$$

二行目は [形式的留数の変数変換](#lem-comb13-residue-substitution) を $A(x)=G(F(x))x^{-n-1}$ に適用しました。$G(F)$ は負次数を持たず、$x^{-n-1}$ を掛けても負次数は有限個です。

次に $H$ は一次係数非零なので負の整数冪の微分も可能であり、

$$
(H^{-n})'=-nH^{-n-1}H'.
$$

積の法則を $G H^{-n}$ に適用すると、

$$
(G H^{-n})'=G'H^{-n}-nGH^{-n-1}H'.
$$

左辺の $u^{-1}$ 係数は零ですから、

$$
\begin{aligned}
\operatorname{Res}_u GH^{-n-1}H'\,du
&=\frac1n\operatorname{Res}_u G'H^{-n}\,du\\
&=\frac1n\operatorname{Res}_u
G'(u)u^{-n}\phi(u)^n\,du\\
&=\frac1n[u^{n-1}]G'(u)\phi(u)^n.
\end{aligned}
$$

全て係数演算であり、数値を積分する経路や無限和の数値的収束は使っていません。$G=u$ とすれば $G'=1$ なので特例が従います。
<!-- proof-end -->

この式の $n$ は**取り出したい $x^n$ の次数**です。$\phi^n$ の指数と一致するのは公式の結論で、再帰式を単に $n$ 回繰り返したからではありません。

<a id="cor-comb13-powers"></a>

<!-- formal-statement-start -->
> **系（再帰解の冪の係数）**
>
> $\phi(u)\in\mathbb Q[[u]]$、$\phi(0)\ne0$ とし、$F(x)\in x\mathbb Q[[x]]$ を $F=x\phi(F)$ の唯一の解とする。整数 $n\geq k\geq1$ に対して

$$
[x^n]F(x)^k=\frac{k}{n}[u^{n-k}]\phi(u)^n.
$$

> $1\leq n<k$ では左辺は $0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

公式の $G$ を $u^k$ とするだけですが、微分が $ku^{k-1}$ を作り、必要な $u$ の次数が $n-k$ に変わることを確認します。

<!-- proof-start -->
### 証明

[Lagrange 反転公式](#thm-comb13-lagrange)へ $G(u)=u^k$ を代入すると $G'(u)=ku^{k-1}$ であり、

$$
\begin{aligned}
[x^n]F(x)^k
&=\frac1n[u^{n-1}]ku^{k-1}\phi(u)^n\\
&=\frac{k}{n}[u^{n-k}]\phi(u)^n.
\end{aligned}
$$

$F$ の最低次数は $1$ なので $F^k$ の最低次数は $k$ 以上となり、$n<k$ の係数は零です。
<!-- proof-end -->

## 4. Catalan 数を別の証明で取り戻す

先ほどの左右に子の場所を持つ木の母関数 $F=x(1+F)^2$ は、空の木を含む $T=1+F$ を使えば $T=1+xT^2$ とも書けます。[COMB4 の Catalan 数](../COMB4/index.md#def-comb4-catalan)と同じ数が出ることを、ここでは反転公式から確かめます。これによって、格子路の反射原理とは独立の**代数的な数え方**が得られます。

<a id="thm-comb13-catalan"></a>

<!-- formal-statement-start -->
> **定理（Catalan 数の形式的反転による表示）**
>
> $F\in x\mathbb Q[[x]]$ を $F=x(1+F)^2$ の唯一の解とする。各 $n\geq1$ について

$$
[x^n]F(x)
=\frac1n\binom{2n}{n-1}
=\frac1{n+1}\binom{2n}{n}.
$$

> 従って $T=1+F$ は $T=1+xT^2$ の唯一の定数項 $1$ の解であり、$[x^n]T=C_n$（$n\geq0$、$C_0=1$）である。
<!-- formal-statement-end -->

### 証明の見取り図

係数を取りたい次数 $n$ を固定し $\phi(u)=(1+u)^2$ を反転公式へ入れます。二項定理で $u^{n-1}$ の項を取り、階乗を一段変形します。再帰の最初の $1,2,5,14$ とも一致します。

<!-- proof-start -->
### 証明

$\phi(0)=1\ne0$ なので [Lagrange 反転公式](#thm-comb13-lagrange)を適用できます。[二項定理](../COMB2/index.md#thm-comb2-binomial-theorem)により、

$$
\begin{aligned}
[x^n]F
&=\frac1n[u^{n-1}](1+u)^{2n}
=\frac1n\binom{2n}{n-1},\\
\frac1n\binom{2n}{n-1}
&=\frac1n\frac{(2n)!}{(n-1)!(n+1)!}\\
&=\frac1{n+1}\frac{(2n)!}{n!n!}
=\frac1{n+1}\binom{2n}{n}.
\end{aligned}
$$

$T=1+F$ を方程式へ代入すると $T=1+xT^2$。逆に $T(0)=1$ を満たす解から $F=T-1$ が得られるので一意です。$n=0$ なら $T(0)=1=C_0$。$n\geq1$ の係数は [Catalan 数の二項係数表示](../COMB4/index.md#thm-comb4-catalan-formula)と一致します。
<!-- proof-end -->

この木の大きさは**非空頂点数**です。根の左右のどちらか一方だけに子がある二つの木は別物です。一方、COMB4 の格子路は $n$ 対の歩を持ちます。大きさが違う対象の間で個数が等しいことと、同一の対象を数えていることは区別します。

## 5. 標識付き根付き木では $e^F$ が現れる

左右二つの子の場所がある木と異なり、各頂点の子を**順序のない集合**として扱う根付き木を考えます。頂点には $1,\ldots,n$ の相異なる標識が付き、根も標識集合の元です。根を除いた残りは、互いに素な標識集合を持つ非空の根付き木の集合へ一意に分かれます。この集合構成は [標識付き指数公式](../COMB12/index.md#thm-comb12-exponential-formula)で表されます。

全標識 $n$ 個の根付き木の数を $r_n$（$n\geq1$）とし、$r_0=0$、その指数型母関数を $R(x)=\sum_{n\geq1}r_nx^n/n!$ と置きます。根の標識を一つ選ぶと $n$ 通り。残る $n-1$ 個の標識上の成分は順序なし集合なので、

$$
r_n=n\,(n-1)!\,[x^{n-1}]\exp(R(x))
=n!\,[x^{n-1}]\exp(R(x)).
$$

ゆえに係数を $n!$ で割って合計すれば $R=x\exp(R)$ です。ここで $R(0)=0$ なので形式的な指数は係数ごとに有限に定義できます。

<a id="thm-comb13-rooted-labeled-tree"></a>

<!-- formal-statement-start -->
> **定理（標識付き根付き木の計数）**
>
> $n\geq1$ とする。頂点集合 $[n]$ 上の無向の根付き木（根を一つ指定し、子の順序を付けない）の個数 $r_n$ は

$$
r_n=n^{n-1}.
$$

> その指数型母関数 $R(x)=\sum_{n\geq1}r_nx^n/n!$ は $R=x\exp(R)$ の唯一の定数項零の解である。$n=1$ では $r_1=1$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

ここで使うのは [標識付き集合構成の指数公式](../COMB12/index.md#thm-comb12-exponential-formula) です。根の標識を一つ選ぶと、残りは非空部分木の集合になります。その再帰方程式に [Lagrange 反転公式](#thm-comb13-lagrange) を適用すると $[u^{n-1}]e^{nu}$ だけが残ります。標識なしの木の個数ではありません。

<!-- proof-start -->
### 証明

根を $v\in[n]$ と固定し、根から出る辺を切ると、根に隣接していた各頂点を根とする非空の部分木が得られます。木に閉路がないため異なる部分木の頂点集合は交わらず、残りの標識を漏れなく覆います。逆に、残りの標識集合を非空ブロックに分け、それぞれに根付き木を置き、その根と $v$ を辺で結ぶと閉路のない連結な木に戻ります。両操作は逆で、成分の並び順は数えません。

[指数公式](../COMB12/index.md#thm-comb12-exponential-formula)により、残りの $n-1$ 個の標識上の部分木集合の個数は $(n-1)![x^{n-1}]\exp(R)$。根の選び方 $n$ 通りを掛けると上記の係数関係、すなわち $R=x\exp(R)$ です。

$\phi(u)=\exp(u)=\sum_{j\geq0}u^j/j!$ は [形式的指数級数](../COMB12/index.md#def-comb12-formal-exponential)であり $\phi(0)=1$。よって [再帰解の存在一意性](#thm-comb13-fixed-point)と [Lagrange 反転公式](#thm-comb13-lagrange)により

$$
\begin{aligned}
\frac{r_n}{n!}
&=[x^n]R(x)
=\frac1n[u^{n-1}]\exp(u)^n\\
&=\frac1n[u^{n-1}]\exp(nu)
=\frac1n\frac{n^{n-1}}{(n-1)!}
=\frac{n^{n-1}}{n!}.
\end{aligned}
$$

ここで $\exp(u)^n=\exp(nu)$ は形式的な積の係数を比較して成立します。実際、$u^m$ の係数は多項定理により $\sum_{j_1+\cdots+j_n=m}1/(j_1!\cdots j_n!)=n^m/m!$ です。従って $r_n=n^{n-1}$。
<!-- proof-end -->

$n=3$ なら各無向の三頂点の木は辺を二本持つ道で、中央の標識に三通り、根に三通りあるため $3\cdot3=9$。式でも $3^2=9$ です。根の選択は各無向木でちょうど $n$ 通りなので、$n\geq2$ の根を指定しない標識付き木の数は $n^{n-2}$ です。ただしこの割り算は**各木の根の指定が $n$ 通り**という全単射に基づき、標識なしの同型類へそのまま適用してはいけません。

## 6. 演習：方程式、反転、二種類の木

### Level A：各操作の成立条件

#### A1. 三次までの帰納構成

$F=x(2+F+F^2)$ の定数項零の解について、$[x]F$、$[x^2]F$、$[x^3]F$ を順に求め、存在一意性のどの条件を使ったか答えよ。

- Level: A
- ID: COMB13-A1

<!-- solution-start -->
**詳細解答**

[再帰解の存在一意性](#thm-comb13-fixed-point)を $\phi(u)=2+u+u^2$ に適用します。$F=f_1x+f_2x^2+f_3x^3+\cdots$ と置いて右辺を比較すると

$$
\begin{aligned}
f_1&=[x^0](2+F+F^2)=2,\\
f_2&=[x^1](2+F+F^2)=f_1=2,\\
f_3&=[x^2](2+F+F^2)=f_2+f_1^2=2+4=6.
\end{aligned}
$$

先頭に $x$ があり、次数 $n$ に $f_n$ 自身が現れないことが必要です。$\phi(0)=2$ は非零ですが、存在一意性そのものには非零性は不要です。
<!-- solution-end -->

#### A2. 合成逆を両向きで確かめる

$H(u)=u/(2+u)$ の合成逆を求め、$H(F)=x$ と $F(H)=u$ を直接計算せよ。分母の可逆性も説明せよ。

- Level: A
- ID: COMB13-A2

<!-- solution-start -->
**詳細解答**

$H(F(x))=x$ を $F$ について解くと、

$$
x(2+F)=F\quad\Longleftrightarrow\quad
(1-x)F=2x\quad\Longleftrightarrow\quad
F=\frac{2x}{1-x}
$$

です。$2+u$ と $1-x$ は定数項がそれぞれ $2$ と $1$ で非零なので、[逆元判定](../COMB9/index.md#thm-comb9-unit-criterion)から可逆です。$H(0)=F(0)=0$ だから両方向の形式的合成も定義されます。

$$
\begin{aligned}
H(F(x))&=\frac{2x/(1-x)}{2+2x/(1-x)}=x,\\
F(H(u))&=\frac{2u/(2+u)}{1-u/(2+u)}=u.
\end{aligned}
$$

したがって [合成逆の定義](#def-comb13-compositional-inverse)の両条件を満たします。
<!-- solution-end -->

#### A3. $u^{-1}$ 係数の変数変換を手で検算する

$H(u)=u/(1+u)$ と $A(x)=x^{-2}+3x^{-1}+x$ について、$\operatorname{Res}_x A(x)\,dx$ と $\operatorname{Res}_u A(H(u))H'(u)\,du$ を比較せよ。

- Level: A
- ID: COMB13-A3

<!-- solution-start -->
**詳細解答**

左は $[x^{-1}]A=3$。右で使う $H'(u)$ は $u$ に関する[形式的微分](#def-comb13-formal-derivative)であり、積の法則と逆元の微分則から

$$
H'(u)=\frac{d}{du}\bigl(u(1+u)^{-1}\bigr)
=(1+u)^{-1}-u(1+u)^{-2}=(1+u)^{-2}
$$

と求まるので、

$$
\begin{aligned}
H^{-2}H'&=\frac{(1+u)^2}{u^2}\frac1{(1+u)^2}=u^{-2},\\
3H^{-1}H'&=3\frac{1+u}{u}\frac1{(1+u)^2}
=\frac3{u(1+u)}=3u^{-1}-3+\cdots,\\
HH'&=\frac{u}{(1+u)^3}.
\end{aligned}
$$

最後の項は最低次数 $1$、最初の項は $u^{-2}$ のみなので $u^{-1}$ の係数に寄与しません。右辺の $u^{-1}$ 係数も $3$ となり、[変数変換補題](#lem-comb13-residue-substitution)に一致します。
<!-- solution-end -->

#### A4. 一次係数が消える反例

$H(u)=u^2+u^3$ が形式的合成逆を持たないことを証明せよ。なお $F=x\phi(F)$ における $\phi(0)=0$ と混同しないこと。

- Level: A
- ID: COMB13-A4

<!-- solution-start -->
**詳細解答**

$F\in x\mathbb Q[[x]]$ が非零なら最低次数は $1$ 以上で、$F=0$ の場合も含めて $F^2+F^3$ に一次の項はありません。従って

$$
[x]H(F)=[x](F^2+F^3)=0\ne1=[x]x.
$$

従って $H(F)=x$ は不可能で、[合成逆の定義](#def-comb13-compositional-inverse)を満たせません。

一方、$F=xF$ という再帰方程式は $\phi(u)=u$、$\phi(0)=0$ ですが、係数を比較すると

$$
f_1=0,\qquad f_n=f_{n-1}=0\quad(n\geq2)
$$

となり、唯一の解は $F=0$ です。合成逆の定理はこの場合に適用できませんが、[再帰解の存在一意性定理](#thm-comb13-fixed-point)は適用できます。
<!-- solution-end -->

#### A5. 冪の係数を取り出す

$F=x(1+F)^2$ について $[x^3]F^2$ を、直接乗算と反転公式の両方で求めよ。

- Level: A
- ID: COMB13-A5

<!-- solution-start -->
**詳細解答**

第1節の帰納計算で $F=x+2x^2+5x^3+\cdots$ だから、$F^2$ の $x^3$ に寄与するのは $(x)(2x^2)$ と $(2x^2)(x)$ の二項で $4$ です。[冪の係数公式](#cor-comb13-powers)で $n=3,k=2$ を代入すると

$$
[x^3]F^2=\frac23[u^1](1+u)^6
=\frac23\binom61=\frac23\cdot6=4.
$$

計算では $u$ の次数が $n-k=1$ である点に注意します。
<!-- solution-end -->

### Level B：式から計数の意味を回復する

#### B1. 係数公式を自分で導く

$F=x\phi(F)$、$\phi(0)\ne0$ のもとで、$n\geq k\geq1$ の $[x^n]F^k$ を [Lagrange 反転公式](#thm-comb13-lagrange)から導き、$n<k$ の場合も述べよ。

- Level: B
- ID: COMB13-B1

<!-- solution-start -->
**詳細解答**

[Lagrange 反転公式](#thm-comb13-lagrange)で $G(u)=u^k$ とすると、[形式的微分](#def-comb13-formal-derivative)により $G'=ku^{k-1}$。したがって

$$
\begin{aligned}
[x^n]F^k
&=\frac1n[u^{n-1}]\left(ku^{k-1}\phi(u)^n\right)\\
&=\frac{k}{n}[u^{n-k}]\phi(u)^n.
\end{aligned}
$$

$F(0)=0$ なので $F^k$ の最低次数は少なくとも $k$。$n<k$ の係数は零です。$n=0$ に $1/n$ は使用しません。
<!-- solution-end -->

#### B2. 三つの子の場所を持つ木

左右・中央の三つの区別された子の場所があり、各場所が空でもよい根付き木を、非空頂点数で数える。母関数を作り、大きさ $n$ の個数を二項係数で表し、$n=1,2,3$ を検算せよ。

- Level: B
- ID: COMB13-B2

<!-- solution-start -->
**詳細解答**

一個の根と三つの順序付き子の場所への分解は一意で、大きさを一個消費します。[大きさ加法的な積](../COMB10/index.md#thm-comb10-sum-product)から $F=x(1+F)^3$ です。$\phi(0)=1$ なので [Lagrange 反転公式](#thm-comb13-lagrange)を $G(u)=u$ に適用して

$$
[x^n]F=\frac1n[u^{n-1}](1+u)^{3n}
=\frac1n\binom{3n}{n-1}.
$$

$n=1,2,3$ の値は順に

$$
\begin{aligned}
n=1:&\quad \frac11\binom30=1,\\
n=2:&\quad \frac12\binom61=3,\\
n=3:&\quad \frac13\binom92=12.
\end{aligned}
$$

二頂点では子の場所を三つから一つ選びます。三頂点では二頂点の子木を一つの場所へ置く $3\cdot3=9$ 通りと、一頂点の子を二つの異なる場所へ置く $\binom32=3$ 通りで、合計 $12$ です。三つの場所を同一視すると別の計数になります。
<!-- solution-end -->

#### B3. 四頂点の標識付き根付き木

$R=x\exp(R)$ を構造分解で説明し、四頂点の根付き木の数を形式的反転から求めよ。根を固定した場合の数も述べよ。

- Level: B
- ID: COMB13-B3

<!-- solution-start -->
**詳細解答**

根の標識を一つ選び、残りを非空な根付き部分木の順序なし集合へ一意に分解します。[指数公式](../COMB12/index.md#thm-comb12-exponential-formula)より、この残りの指数型母関数は $\exp(R)$ です。根一個の標識を加えると $R=x\exp(R)$ になります。

$n=4$ として [反転公式](#thm-comb13-lagrange)を適用すれば

$$
[x^4]R=\frac14[u^3]\exp(4u)
=\frac14\frac{4^3}{3!}=\frac83.
$$

これは個数そのものではなく EGF の係数です。[指数型母関数の定義](../COMB12/index.md#def-comb12-egf)から $r_4=4!\cdot(8/3)=64=4^3$。すべての非根付き標識付き木には四通りの根の選択があるので、根を指定した一つの標識（たとえば $1$）に固定すると $64/4=16$ 通りです。標識の置換が根の固定位置を対称にするためこの割り算が成立します。
<!-- solution-end -->

#### B4. 解を分数形で求めても反転公式に戻る

$F=x(2+F)$ の解を分数形で求め、$n\geq1$ の係数を反転公式でも計算せよ。$\phi(0)$ が $1$ でないことに注意せよ。

- Level: B
- ID: COMB13-B4

<!-- solution-start -->
**詳細解答**

方程式は $(1-x)F=2x$ なので、[定数項による逆元判定](../COMB9/index.md#thm-comb9-unit-criterion)により定数項 $1$ の $1-x$ は可逆で、

$$
F=\frac{2x}{1-x}
=2x+2x^2+2x^3+\cdots.
$$

一方 $\phi(u)=2+u$ は $\phi(0)=2\ne0$ なので [反転公式](#thm-comb13-lagrange)を使えます。

$$
\begin{aligned}
[x^n]F
&=\frac1n[u^{n-1}](2+u)^n\\
&=\frac1n\binom n{n-1}2^{n-(n-1)}
=\frac1n\cdot n\cdot2=2.
\end{aligned}
$$

$n=0$ は $F(0)=0$ であり、公式の $1/n$ には代入しません。
<!-- solution-end -->

### Level C：再帰構造の二種類を比較する

#### C1. 順序付き木と標識付き木の相違を証明する

次の二種類の対象を混同せずに数えよ。

1. 各頂点が左・右の区別された子の場所を持つ非空の根付き木。大きさ $n$ の数 $a_n$ について母関数を作り、任意の $n\geq1$ の明示式を導け。
2. 頂点が $[n]$ で標識付けられ、子に順序のない根付き木。根・子の分解を全単射として説明し、$r_n$ を求めよ。
3. $n=3$ の個数を双方で検算し、なぜ同じ木として扱えないか、式のどの部分が違いを反映するか説明せよ。

- Level: C
- ID: COMB13-C1

<!-- solution-start -->
**詳細解答**

1. 根を除いた左右二つの場所は、空か同種の木です。互いの順番を交換すると一般に別物なので、構造から左右の部分木への対応は一対一です。[和・積の普通母関数](../COMB10/index.md#thm-comb10-sum-product)から非空頂点数の OGF は $F=x(1+F)^2$。$\phi(0)=1$ なので [Lagrange 反転公式](#thm-comb13-lagrange)に $G(u)=u$ を入れます。

$$
\begin{aligned}
a_n&=[x^n]F=\frac1n[u^{n-1}](1+u)^{2n}\\
&=\frac1n\binom{2n}{n-1}
=\frac1{n+1}\binom{2n}{n}.
\end{aligned}
$$

最後は $(n-1)!n=n!$ を用いた階乗の約分です。$n=3$ では $a_3=5$ となります。

2. 根の標識を $n$ 通り選びます。根から辺を一つずつ切ると、残りの頂点は互いに素な非空標識集合へ分かれ、それぞれの集合に根付き木があります。逆に各部分木の根を新しい根へ辺で結ぶと、閉路を作らずもとの木を復元します。したがって、部分木の集合は順序なしであり、[標識付き集合の指数公式](../COMB12/index.md#thm-comb12-exponential-formula)を適用できます。EGF は $R=x\exp(R)$、$\phi(u)=\exp(u)$ です。

$$
\begin{aligned}
\frac{r_n}{n!}
&=[x^n]R=\frac1n[u^{n-1}]\exp(nu)\\
&=\frac1n\frac{n^{n-1}}{(n-1)!}
=\frac{n^{n-1}}{n!}.
\end{aligned}
$$

よって $r_n=n^{n-1}$、$n=3$ では $9$ です。係数を個数に戻す $n!$ を落としてはいけません。

3. 最初の木の三頂点の五通りは、左右のどちらかに二頂点部分木を置く $2\cdot2=4$ 通り、左右に一頂点ずつ置く一通りです。後者の三頂点の非根付き木は、中央の標識を選ぶ三通りで、各木の根は三通りだから $3\cdot3=9$。前者の $(1+F)^2$ は**左右二つの場所**を掛ける OGF、後者の $\exp(R)$ は**順序なし部分木集合**を数える EGF です。大きさ $n$ が同じでも、標識と子の順序について同じ同値関係を使っていません。
<!-- solution-end -->

## 7. この公式ができること、できないこと

解 $F=x\phi(F)$ を作るだけなら係数の帰納法で足ります。Lagrange 反転は、そこから $[x^n]F$ や $[x^n]G(F)$ を**一つの係数抽出**へ変える道具です。$F=x(1+F)^2$ では Catalan 数、$R=x\exp(R)$ では標識付き根付き木の $n^{n-1}$ が出ました。

ただし、形式的合成逆と $u^{-1}$ の係数による証明には $\phi(0)\ne0$ が必要です。また、形式的に全係数が一致しても、数値を代入したときの収束や係数の漸近挙動が自動で分かるわけではありません。次の COMB14 では再帰でないもう一つの難題、すなわち回転や標識の置換で同一視する対象をどう数えるかへ進みます。
