# ANT3 Dirichlet文字・Gauss和・Dirichlet L関数

[ANT2のDirichlet級数とEuler積](../ANT2/index.md#thm-ant2-euler-product)は、算術関数の乗法性を素数の積へ変換しました。しかし係数を $1$ にしたままでは、「素数 $p$ が $a$ を法 $q$ とする剰余類に属するか」を区別できません。この章では、剰余類の掛け算を複素数の掛け算に移す重みを構成し、加法的な指数関数との橋になる有限和を計算します。さらに、その重みをDirichlet級数へ入れて複素解析へつなげます。

[NT2の単数群](../../NT/NT2/index.md#def-nt2-unit-group)、[NT3のLegendre記号](../../NT/NT3/index.md#def-nt3-legendre-symbol)、[ANT2のDirichlet級数](../ANT2/index.md#def-ant2-complex-dirichlet-series)を既習とします。法 $q$ は整数 $q\ge2$、$G=(\mathbb Z/q\mathbb Z)^\times$、$h=|G|=\varphi(q)$ とし、$\operatorname{Re}s=\sigma$、$e_q(t)=\exp(2\pi it/q)$ と記します。文字はすべて複素数値です。

## 1. 剰余類を選り分ける乗法的な重み

整数 $n$ を法 $q$ で分類するだけなら合同式で十分ですが、Dirichlet級数に入れるには積 $mn$ に対して係数が積へ分かれると便利です。そこで有限群 $G$ から絶対値 $1$ の複素数への群準同型を使います。

<a id="def-ant3-character"></a>

<!-- formal-statement-start -->
> **定義（Dirichlet文字）**  
> $q\ge2$ とする。群準同型 $\psi:G\to\mathbb C^\times$ に対して、整数上の関数 $\chi:\mathbb Z\to\mathbb C$ を
$$
\chi(n)=
\begin{cases}
\psi(n\bmod q),&\gcd(n,q)=1,\\
0,&\gcd(n,q)>1
\end{cases}
$$
> で定める。この $\chi$ を法 $q$ のDirichlet文字という。法 $q$ の文字全体を $\widehat G$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant3-character -->
### 例：法 $4$ の非自明な文字

**定義の確認**：以下では指定した群・文字・和の定義条件を、実際の値を代入して確かめます。

$\chi_4(n)=0$（$n$ 偶数）、$\chi_4(n)=1$（$n\equiv1\pmod4$）、$\chi_4(n)=-1$（$n\equiv3\pmod4$）とします。単数群は $G=\{1,3\}$、$3^2\equiv1\pmod4$ なので $\psi(3)=-1$ は $\psi(3)^2=\psi(1)=1$ を満たします。この乗法関係から $\chi_4(mn)=\chi_4(m)\chi_4(n)$ が成立します。偶数が一方にあるときは両辺とも $0$ です。
<!-- definition-example-end -->

$\psi(g)$ の位数は有限であり、$g^h=1$ から $\psi(g)^h=1$ です。従って単数上の文字値は $h$ 乗根、特に $|\chi(n)|=1$ です。文字は周期 $q$ を持ち、すべての整数 $m,n$ について $\chi(mn)=\chi(m)\chi(n)$ が成立します。

<a id="def-ant3-principal"></a>

<!-- formal-statement-start -->
> **定義（主Dirichlet文字）**  
> 法 $q$ の文字で、単数に対して常に $1$、非単数に対して $0$ を返すものを主文字 $\chi_0$ と書く。
$$
\chi_0(n)=
\begin{cases}1,&\gcd(n,q)=1,\\0,&\gcd(n,q)>1.\end{cases}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant3-principal -->
### 例：法 $6$ の主文字

**定義の確認**：以下では指定した群・文字・和の定義条件を、実際の値を代入して確かめます。

法 $6$ の単数は $1,5$ です。$\chi_0(1)=\chi_0(5)=1$、$\chi_0(2)=\chi_0(3)=\chi_0(4)=\chi_0(6)=0$ で、これが周期的に続きます。例えば $5\cdot5\equiv1\pmod6$ に対して、文字値の積は $1\cdot1=1$ です。
<!-- definition-example-end -->

主文字以外では、単数上で $1$ 以外の値を取るものがあります。これらをすべて一度に足すと剰余類を取り出す抽出式になります。その仕組みを証明しましょう。

## 2. 有限可換群の指標と直交関係

各文字を $G$ 上の関数と見ると、内積
$$
\langle f,g\rangle=\frac1h\sum_{u\in G}f(u)\overline{g(u)}
$$
を定められます。異なる文字は互いに直交し、文字はちょうど $h$ 個あります。単に個数を言うだけでなく、なぜ全部の剰余類を区別できるかを示します。

<a id="thm-ant3-orthogonality"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet文字の直交関係）**  
> $q\ge2$、$G=(\mathbb Z/q\mathbb Z)^\times$、$h=\varphi(q)$ とする。法 $q$ の文字はちょうど $h$ 個であり、任意の文字 $\chi,\eta$ と単数 $a,b$ について
$$
\sum_{u\in G}\chi(u)\overline{\eta(u)}
=\begin{cases}h,&\chi=\eta,\\0,&\chi\ne\eta,\end{cases}
$$
$$
\sum_{\chi\bmod q}\chi(a)\overline{\chi(b)}
=\begin{cases}h,&a\equiv b\pmod q,\\0,&a\not\equiv b\pmod q.\end{cases}
$$
> ここで第二の和は法 $q$ の全Dirichlet文字にわたる。非単数が $a$ または $b$ の場合、第二の和の各項は $0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

文字は群の掛け算を複素数へ写すため、文字の値を群全体で足し、群の元を一つ掛けて並べ替えると和自身の定数倍になります。文字の存在個数には、有限可換群上で文字を拡張し、点ごとの指示関数を文字の線形結合として作る議論を使います。

<!-- proof-start -->
### 証明

まず有限可換群 $G$ における文字の存在と分離を示します。$x\ne1$ の位数を $r\ge2$ とすると、巡回部分群 $\langle x\rangle$ 上に $x^j\mapsto\exp(2\pi ij/r)$ と置けます。これを $G$ 全体に拡張できます。実際、部分群 $H$ 上の文字 $\psi$ と $y\notin H$ に対し、$y^m\in H$ となる最小の正整数 $m$ を取ります。複素数 $z$ を $z^m=\psi(y^m)$ を満たすよう選び、
$$
\widetilde\psi(hy^j)=\psi(h)z^j
\qquad(h\in H,\ 0\le j<m)
$$
と定めます。表示が一意であることは $j$ の最小性によります。二つの表示を掛けると、指数の $m$ 個ごとの繰り上がりが $z^m=\psi(y^m)$ と一致するため準同型です。さらに $z$ は絶対値 $1$ であり、有限回これを繰り返して $G$ 上の文字を得ます。従って異なる $a,b\in G$ について $ab^{-1}$ を識別する文字が存在し、$\chi(a)\ne\chi(b)$ となります。

次に任意の非自明な文字 $\rho$ に対し、$\rho(v)\ne1$ となる $v\in G$ を選びます。$S=\sum_{u\in G}\rho(u)$ とすると、$u\mapsto vu$ は $G$ の置換なので
$$
S=\sum_{u\in G}\rho(vu)=\rho(v)S.
$$
従って $S=0$ です。$\chi\overline\eta$ は文字であり、$\chi=\eta$ のときだけ主文字になるので、第一の直交関係を得ます。よって相異なる文字は関数空間 $\mathbb C^G$ で線形独立であり、その個数は $h$ 以下です。

反対に、文字の線形包が全関数空間となることを示します。固定した $a\in G$ に対し、各 $b\ne a$ について $\chi_{ab}(a)\ne\chi_{ab}(b)$ となる文字を選べます。関数
$$
D_a(u)=\prod_{\substack{b\in G\\b\ne a}}
\frac{\chi_{ab}(u)-\chi_{ab}(b)}
{\chi_{ab}(a)-\chi_{ab}(b)}
$$
は $D_a(a)=1$、$u\ne a$ のとき $b=u$ に対応する因子が $0$ となるので $D_a(u)=0$ です。各因子は定数関数と文字の線形結合であり、文字の積も文字なので、$D_a$ は文字の線形包にあります。$D_a$ は $h$ 個の点指示関数をすべて与えるため、文字の線形包の次元は $h$ 以上です。従って文字はちょうど $h$ 個で、第一の直交関係から $\sqrt h$ 倍でなく **$1/\sqrt h$ 倍した文字**が $\mathbb C^G$ の正規直交基底です。

その基底の行列 $U_{\chi,u}=\chi(u)/\sqrt h$ は正方行列で、行ベクトルが正規直交なので $UU^*=I$ です。従って $U^*U=I$ となり、成分 $(a,b)$ を書き出せば
$$
\frac1h\sum_{\chi\bmod q}\overline{\chi(a)}\chi(b)=\mathbf1_{\{a=b\}}.
$$
両辺を複素共役に取ることで第二の直交関係を得ます。非単数の場合はすべての文字値が $0$ です。
<!-- proof-end -->

法 $5$ の単数群は [体の乗法群の有限部分群は巡回群](../../NT/NT2/index.md#thm-nt2-finite-subgroup-cyclic)により巡回群であり、実際 $2,4,3,1$ と $2$ の冪が全単数を巡ります。$\chi_k(2^j)=i^{kj}$（$k=0,1,2,3$）の四文字があり、例えば $a=1,b=2$ に対して $1+i^{-1}+i^{-2}+i^{-3}=0$ です。

<a id="cor-ant3-residue-projector"></a>

<!-- formal-statement-start -->
> **系（既約剰余類の指示関数）**  
> $q\ge2$、$\gcd(a,q)=1$ とすると、すべての整数 $n$ について
$$
\mathbf1_{\{n\equiv a\pmod q\}}
=\frac1{\varphi(q)}
\sum_{\chi\bmod q}\chi(n)\overline{\chi(a)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n$ が非単数なら左辺は $0$（単数 $a$ と同じ剰余類には属せない）であり、右辺もすべての $\chi(n)=0$ なので $0$ です。$n$ が単数なら[文字の第二直交関係](#thm-ant3-orthogonality)を $n,a$ に適用し、両辺を $\varphi(q)$ で割ると結論になります。
<!-- proof-end -->

この「一致すると $1$、しないと $0$」という作用が、後の素数の剰余類研究で必要です。ただし剰余類から素数を無限個見つけるには、文字の和だけでなく $L$ 関数の $s=1$ 付近の性質がさらに必要になります。

## 3. 原始文字とGauss和

同じ単数群の文字でも、より小さな法から引き上げられたものがあります。これから構成する加法的な指数和の変換公式がすべての整数周波数で成立するかどうかは、この違いに左右されます。

<a id="def-ant3-primitive"></a>

<!-- formal-statement-start -->
> **定義（誘導文字と原始Dirichlet文字）**  
> $d\mid q$ とし、法 $d$ の文字 $\psi$ が存在して、$q$ の単数であるすべての整数 $n$ に対し $\chi(n)=\psi(n)$ となるとき、$\chi$ は $\psi$ から誘導されるという。ただし文字を比較するのは **法 $q$ の単数上** に限り、法 $q$ の非単数では $\chi(n)=0$ とする。どの真の約数 $d<q$ の文字からも誘導されない文字を **原始文字**という。そうでなければ非原始文字という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant3-primitive -->
### 例：法 $8$ の二種類の非主文字

**定義の確認**：以下では指定した群・文字・和の定義条件を、実際の値を代入して確かめます。

法 $4$ の $\chi_4$ を法 $8$ に誘導すると、奇数 $1,3,5,7$ で順に $1,-1,1,-1$ です。一方、$\chi_8$ を奇数上で $1,-1,-1,1$ と指定すれば、$3^2\equiv5^2\equiv1$、$3\cdot5\equiv7$ なので乗法性を満たします。$\chi_8(5)=-1\ne\chi_8(1)$ であり、$5\equiv1\pmod4$ なので法 $4$ からの誘導は不可能です。法 $8$ の他の真の約数 $1,2$ からも誘導できないため $\chi_8$ は原始です。対して誘導した文字は非原始です。
<!-- definition-example-end -->

$a$ を整数とし、$e_q(ax)$ を加法的な周波数因子に使います。文字は掛け算の道具、$e_q$ は足し算の道具なので、二種類の演算を掛け合わせて総和を作ることに意味があります。

<a id="def-ant3-gauss-sum"></a>

<!-- formal-statement-start -->
> **定義（Gauss和）**  
> 法 $q$ のDirichlet文字 $\chi$ と整数 $a$ に対して
$$
S_\chi(a)=\sum_{x=1}^{q}\chi(x)e_q(ax),
\qquad
\tau(\chi)=S_\chi(1)
$$
> と定める。$\tau(\chi)$ を $\chi$ のGauss和という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant3-gauss-sum -->
### 例：法 $4$ のGauss和

**定義の確認**：以下では指定した群・文字・和の定義条件を、実際の値を代入して確かめます。

法 $4$ の非主文字 $\chi_4$ では、$x=1,3$ だけが寄与します。$e_4(1)=i$、$e_4(3)=-i$ なので
$$
\tau(\chi_4)=1\cdot i+(-1)\cdot(-i)=2i.
$$
この文字は原始であり、$|\tau(\chi_4)|=2=\sqrt4$ という後述の法則と一致します。
<!-- definition-example-end -->

<a id="thm-ant3-gauss-transform"></a>

<!-- formal-statement-start -->
> **定理（原始文字のGauss変換）**  
> $q\ge2$、$\chi$ を法 $q$ の原始Dirichlet文字とする。このとき任意の整数 $a$ に対し
$$
S_\chi(a)=\overline{\chi(a)}\,\tau(\chi)
$$
> が成立する。右辺では $\gcd(a,q)>1$ のとき $\chi(a)=0$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

$a$ が単数なら変数 $x$ を $ax$ に置換するだけです。$a$ が非単数のときは、$e_q(ax)$ を変えない単数 $u$ を探し、原始性によって $\chi(u)\ne1$ とします。置換により総和自身が $\chi(u)$ 倍になるため、総和は $0$ です。

<!-- proof-start -->
### 証明

$\gcd(a,q)=1$ とします。$y\equiv ax\pmod q$ と置くと単数上の置換であり、$x\equiv a^{-1}y$ です。[Dirichlet文字の定義](#def-ant3-character)の乗法性と $|\chi(a)|=1$ から
$$
\begin{aligned}
S_\chi(a)
&=\sum_{y\bmod q}\chi(a^{-1}y)e_q(y)\\
&=\chi(a)^{-1}\sum_{y\bmod q}\chi(y)e_q(y)\\
&=\overline{\chi(a)}\,\tau(\chi).
\end{aligned}
$$

$\gcd(a,q)>1$ とします。$g=\gcd(a,q)$、$d=q/g$ と置くと $d<q$ です。$a=ga'$ なので、$u\equiv1\pmod d$ なら
$$
e_q(au x)=e_q(ax)\,e_q(a(u-1)x)=e_q(ax)
$$
です。最後の等号では $a(u-1)/q=a'(u-1)/d$ が整数であることを用いました。

ここで、法 $q$ の単数群から法 $d$ の単数群への縮約写像は全射です。法 $d$ で単数 $v$ を一つ固定します。$d$ の素因数については $v$ に合同な値を保ち、$q$ の素因数のうち $d$ に含まれないものには $1$ に合同な値を指定します。[中国剰余定理](../../NT/NT1/index.md#thm-nt1-crt-constructive)で得られる整数 $u$ は $u\equiv v\pmod d$ かつ $\gcd(u,q)=1$ を満たします。

すべての単数 $u\equiv1\pmod d$ に対して $\chi(u)=1$ と仮定します。法 $d$ の単数 $v$ の持ち上げ $u$ を一つ選び、$\psi(v)=\chi(u)$ と定めます。別の持ち上げ $u'$ を選んでも $u(u')^{-1}\equiv1\pmod d$ なので $\chi(u)=\chi(u')$ です。積を持ち上げれば $\psi(vw)=\psi(v)\psi(w)$ ですから、$\chi$ は法 $d$ の文字へ降下します。

$\chi$ は原始なので、このような降下は起きません。従って $u\equiv1\pmod d$ で $\chi(u)\ne1$ となる単数 $u$ が存在します。変数を $x\mapsto ux$ と置換すると
$$
S_\chi(a)=\sum_{x\bmod q}\chi(ux)e_q(aux)
=\chi(u)\sum_{x\bmod q}\chi(x)e_q(ax)
=\chi(u)S_\chi(a).
$$
$1-\chi(u)\ne0$ なので $S_\chi(a)=0$ です。一方 $\chi(a)=0$ ですから、主張が非単数の場合も成立します。
<!-- proof-end -->

<a id="thm-ant3-gauss-magnitude"></a>

<!-- formal-statement-start -->
> **定理（原始文字のGauss和の絶対値）**  
> 法 $q\ge2$ の原始Dirichlet文字 $\chi$ に対して
$$
|\tau(\chi)|^2=q,\qquad |\tau(\chi)|=\sqrt q.
$$
> とくに $\tau(\chi)\ne0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

加法的な指数関数の直交性を利用すると、$S_\chi(a)$ の絶対値二乗の総和は $q$ 倍の文字の絶対値二乗の総和になります。他方、[原始文字のGauss変換](#thm-ant3-gauss-transform)を代入すると同じ和が $\varphi(q)|\tau(\chi)|^2$ になります。

<!-- proof-start -->
### 証明

有限等比級数により、整数 $x,y$ について
$$
\sum_{a=0}^{q-1}e_q(a(x-y))
=\begin{cases}q,&x\equiv y\pmod q,\\0,&x\not\equiv y\pmod q.\end{cases}
$$
$x-y$ が $q$ の倍数でないときは公比が $1$ でなく、$q$ 乗すると $1$ なので和が $0$ です。よって二乗を展開して和の順を交換すれば
$$
\begin{aligned}
\sum_{a=0}^{q-1}|S_\chi(a)|^2
&=\sum_{a=0}^{q-1}\sum_{x,y\bmod q}
\chi(x)\overline{\chi(y)}e_q(a(x-y))\\
&=\sum_{x,y\bmod q}\chi(x)\overline{\chi(y)}
\,q\,\mathbf1_{\{x=y\}}\\
&=q\sum_{x\bmod q}|\chi(x)|^2=q\varphi(q).
\end{aligned}
$$
ここで単数なら $|\chi(x)|^2=1$、非単数なら $0$ です。一方 [原始文字のGauss変換](#thm-ant3-gauss-transform)から
$$
\sum_{a=0}^{q-1}|S_\chi(a)|^2
=|\tau(\chi)|^2\sum_{a\bmod q}|\chi(a)|^2
=\varphi(q)|\tau(\chi)|^2.
$$
$\varphi(q)>0$ で両式を比較すると $|\tau(\chi)|^2=q$ を得ます。
<!-- proof-end -->

非原始文字にはこの結論を一般には使えません。例えば法 $4$ の $\chi_4$ を法 $8$ に誘導した文字 $\widetilde\chi$ は、奇数 $1,3,5,7$ 上で $1,-1,1,-1$ です。$e_8(5)=-e_8(1)$、$e_8(7)=-e_8(3)$ より
$$
\tau(\widetilde\chi)
=e_8(1)-e_8(3)+e_8(5)-e_8(7)=0.
$$
原始性を失うと、非単数周波数を消すために使った「小さい法へ降下できない」という機構が壊れ、$\sqrt q$ の絶対値を保証できなくなります。

## 4. Dirichlet L関数：文字をEuler積へ変換する

[ANT2の乗法的係数のEuler積](../ANT2/index.md#thm-ant2-euler-product)に文字 $\chi$ を入れると、素数 $p$ の局所因子は幾何級数になります。文字の値が $0$ となる $p\mid q$ と、$|\chi(p)|=1$ となる $p\nmid q$ を区別しましょう。

<a id="def-ant3-l-function"></a>

<!-- formal-statement-start -->
> **定義（Dirichlet L関数）**  
> 法 $q\ge2$ のDirichlet文字 $\chi$ と $\operatorname{Re}s>1$ に対して、絶対収束する級数
$$
L(s,\chi)=\sum_{n=1}^{\infty}\frac{\chi(n)}{n^s}
$$
> をDirichlet $L$ 関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant3-l-function -->
### 例：法 $4$ の非主文字のL関数

**定義の確認**：以下では指定した群・文字・和の定義条件を、実際の値を代入して確かめます。

$\chi_4$ では偶数項は $0$、奇数項の符号は交互なので
$$
L(s,\chi_4)=1-\frac1{3^s}+\frac1{5^s}-\frac1{7^s}+\cdots
\qquad(\sigma>1).
$$
係数の絶対値が $1$ 以下なので $\sum |\chi_4(n)|n^{-\sigma}\le\zeta(\sigma)$ です。級数の存在と、法 $4$ の符号を反映することの両方を直接確認できました。
<!-- definition-example-end -->

<a id="thm-ant3-l-euler"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet L関数のEuler積と非零性）**  
> 任意の法 $q\ge2$ の文字 $\chi$ と $\operatorname{Re}s>1$ に対して
$$
L(s,\chi)=\prod_p\bigl(1-\chi(p)p^{-s}\bigr)^{-1}\ne0.
$$
> この積は素数を有限個ずつ増やした極限であり、右半平面 $\operatorname{Re}s>1$ のコンパクト集合上一様に収束する。主文字では
$$
L(s,\chi_0)=\zeta(s)\prod_{p\mid q}(1-p^{-s})
\qquad(\operatorname{Re}s>1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

文字は完全乗法的なので局所級数は公比 $\chi(p)p^{-s}$ の幾何級数です。絶対収束と各因子の非零性を確認した上で積を極限へ移します。主文字では $q$ を割る素数の寄与だけを除きます。

<!-- proof-start -->
### 証明

$\sigma>1$ なら $|\chi(n)|\le1$ から
$$
\sum_{n\ge1}\frac{|\chi(n)|}{n^\sigma}
\le\sum_{n\ge1}n^{-\sigma}=\zeta(\sigma)<\infty.
$$
[ANT2のEuler積定理](../ANT2/index.md#thm-ant2-euler-product)は適用可能です。文字の完全乗法性より $\chi(p^j)=\chi(p)^j$、しかも $|\chi(p)p^{-s}|\le p^{-\sigma}<1$ だから
$$
\sum_{j\ge0}\chi(p^j)p^{-js}
=\sum_{j\ge0}(\chi(p)p^{-s})^j
=(1-\chi(p)p^{-s})^{-1}.
$$
各因子は非零であり、$\sum_p|\chi(p)|p^{-\sigma}\le\zeta(\sigma)-1<\infty$ です。コンパクト集合 $K\subset\{\sigma>1\}$ で $m=\min_{s\in K}\operatorname{Re}s>1$ とすると $|\chi(p)p^{-s}|\le p^{-m}$ となり、積の収束は $K$ 上一様です。さらに $|z|\le2^{-m}<1$ で
$$
\left|\frac1{1-z}-1\right|
=\frac{|z|}{|1-z|}
\le\frac{|z|}{1-2^{-m}},
$$
なので各因子の $1$ からのずれの和も一様収束します。[無限積の局所一様収束判定](../../../解析系/CA/CA10/index.md#thm-ca10-infinite-product-criterion)により極限は非零です。

主文字では $p\mid q$ のとき $\chi_0(p)=0$ なので局所因子は $1$、$p\nmid q$ のときは $(1-p^{-s})^{-1}$ です。[ζのEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)で全素数の因子を掛けたものから有限個の $p\mid q$ の因子を取り除くと最後の式になります。
<!-- proof-end -->

$\sigma>1$ での非零性は、まだ $s=1$ に対する非零性を意味しません。とくに非主文字の $L(1,\chi)\ne0$ を使って算術級数中の素数を論じるのはANT4の核心です。この章では $L(s,\chi)$ の定義域をさらに広げるところまで進めます。

## 5. $\operatorname{Re}s>0$ までの非主L関数

非主文字は一周期の値を足すと $0$ です。この打消し合いが、絶対収束より左へ級数を進めるための新しい道具になります。

<a id="thm-ant3-l-continuation"></a>

<!-- formal-statement-start -->
> **定理（非主L関数の正則延長と主L関数の極）**  
> $q\ge2$、$\chi$ を法 $q$ の文字とする。$\chi\ne\chi_0$ ならDirichlet級数 $\sum_{n\ge1}\chi(n)n^{-s}$ は $\operatorname{Re}s>0$ で収束し、その和は同半平面で正則である。特に $L(1,\chi)$ は有限値として定義されるが、非零性はこの定理の結論ではない。一方、主文字では $L(s,\chi_0)$ は $\operatorname{Re}s>0$ に有理型延長され、$s=1$ にただ一つの単純極を持ち、その留数は
$$
\operatorname{Res}_{s=1}L(s,\chi_0)
=\prod_{p\mid q}(1-p^{-1})
=\frac{\varphi(q)}q.
$$
<!-- formal-statement-end -->

### 証明の見取り図

非主文字の部分和が有界であることを先に確認し、[ANT1のAbelの部分和公式](../ANT1/index.md#thm-ant1-abel)で $n^{-s}$ を微分します。主文字は先ほどの有限Euler因子を [CA12のζの解析接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)へ掛けます。

<!-- proof-start -->
### 証明

非主文字では[第一の文字直交関係](#thm-ant3-orthogonality)を $\chi$ と $\chi_0$ に適用すると
$$
\sum_{a=1}^{q}\chi(a)=\sum_{a\in G}\chi(a)=0.
$$
$\chi$ は周期 $q$ なので、任意の $x\ge1$ に対し $x=kq+r$（$k\ge0,0\le r<q$）と分けると
$$
A(x)=\sum_{n\le x}\chi(n)=k\sum_{a=1}^q\chi(a)+\sum_{a=1}^{\lfloor r\rfloor}\chi(a),
\qquad |A(x)|\le q.
$$
ここで実数 $x$ の場合は $k=\lfloor x/q\rfloor$、$r=x-kq$ として読みます。

[Abelの部分和公式](../ANT1/index.md#thm-ant1-abel)を $f(t)=t^{-s}$ に適用すると、$N\ge1$ について
$$
\sum_{n\le N}\frac{\chi(n)}{n^s}
=A(N)N^{-s}+s\int_1^N A(t)t^{-s-1}\,dt.
$$
$\sigma>0$ なら $|A(N)N^{-s}|\le qN^{-\sigma}\to0$ であり、
$$
\left|s\int_N^\infty A(t)t^{-s-1}\,dt\right|
\le\frac{q|s|}{\sigma}N^{-\sigma}\longrightarrow0.
$$
従って級数は $\sigma>0$ で収束し、
$$
L(s,\chi)=s\int_1^\infty A(t)t^{-s-1}\,dt.
$$
$K\subset\{\sigma>0\}$ をコンパクトとし、$m=\min_{s\in K}\sigma>0$、$M=\max_{s\in K}|s|$ とすると積分の尾部は一様に $qM N^{-m}/m$ 以下です。各有限区間の積分は $s$ に関して正則であり、[正則関数列の局所一様極限定理](../../../解析系/CA/CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)から極限も正則です。

主文字では[前節の公式](#thm-ant3-l-euler)を $\sigma>1$ に適用し、
$$
L(s,\chi_0)=\zeta(s)P_q(s),\qquad
P_q(s)=\prod_{p\mid q}(1-p^{-s})
$$
と書きます。$P_q$ は有限積の全関数です。[CA12のζの有理型解析接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)では、$\zeta$ は $\sigma>0$ で $s=1$ 以外正則で、$s=1$ に留数 $1$ の単純極を持つことを証明しました。

$P_q(1)$ は非零であり、値を計算すると
$$
P_q(1)=\prod_{p\mid q}\left(1-\frac1p\right)>0.
$$
したがって $\zeta(s)P_q(s)$ の極は消えず、その留数は $P_q(1)$ です。[φ 関数の積公式](../../NT/NT2/index.md#prop-nt2-totient-formula)を $q$ に適用すると $P_q(1)=\varphi(q)/q$ になります。
<!-- proof-end -->

主文字に対する極と、非主文字の $s=1$ での正則性を区別できました。ただし正則であることは値が $0$ でないことを保証しません。**ここがANT4で新しい証明を要する箇所**です。

## 6. 演習と詳細解答

全問で $q\ge2$、$e_q(t)=\exp(2\pi it/q)$ とし、必要な箇所で既出の定理の仮定を明示してください。

### Level A：文字の値と有限和

#### A1. 法4の文字の乗法性

法 $4$ の非主文字 $\chi_4$ について $\chi_4(3)^2$ と $\chi_4(9)$ を比較し、$\chi_4(2)\chi_4(3)=\chi_4(6)$ を確かめよ。

- Level: A
- ID: ANT3-A1

<!-- solution-start -->
**詳細解答**：[文字の定義](#def-ant3-character)に従い $3\equiv3\pmod4$ なので $\chi_4(3)=-1$、ゆえに $\chi_4(3)^2=1$ です。$9\equiv1\pmod4$ だから $\chi_4(9)=1$ で一致します。$2,6$ は偶数で単数でないため $\chi_4(2)=\chi_4(6)=0$ です。従って左辺は $0\cdot(-1)=0$、右辺も $0$ となり、非単数についても乗法性が成立します。
<!-- solution-end -->

#### A2. 法5の文字を列挙する

$2$ が法 $5$ の単数群の生成元であることを確認し、文字 $\chi_k(2^j)=i^{kj}$（$k=0,1,2,3$）について $\sum_{k=0}^3\chi_k(2)$ を求めよ。

- Level: A
- ID: ANT3-A2

<!-- solution-start -->
**詳細解答**：$2^0\equiv1$、$2^1\equiv2$、$2^2\equiv4$、$2^3\equiv3$、$2^4\equiv1\pmod5$ なので位数は $4$ です。$\chi_0(2)=1$、$\chi_1(2)=i$、$\chi_2(2)=-1$、$\chi_3(2)=-i$ です。総和は $1+i-1-i=0$ で、[文字の直交関係](#thm-ant3-orthogonality)の $a=2,b=1$ の場合と一致します。
<!-- solution-end -->

#### A3. 主L関数の素数因子

法 $6$ の主文字の $L$ 関数を $\zeta(s)$ と有限積で表し、$s=1$ における留数を求めよ。

- Level: A
- ID: ANT3-A3

<!-- solution-start -->
**詳細解答**：$6$ の素因数は $2,3$ です。[主文字のEuler積](#thm-ant3-l-euler)により $\sigma>1$ では
$$
L(s,\chi_0)=\zeta(s)(1-2^{-s})(1-3^{-s}).
$$
[非主L関数の正則延長と主L関数の極](#thm-ant3-l-continuation)から、$s=1$ での留数は $(1-1/2)(1-1/3)=(1/2)(2/3)=1/3$ です。[φ 関数の積公式](../../NT/NT2/index.md#prop-nt2-totient-formula)でも $\varphi(6)/6=2/6=1/3$ と確かめられます。
<!-- solution-end -->

#### A4. 法4のGauss和

$\chi_4$ に対し $\tau(\chi_4)$ と $S_{\chi_4}(3)$ を計算せよ。

- Level: A
- ID: ANT3-A4

<!-- solution-start -->
**詳細解答**：[Gauss和の定義](#def-ant3-gauss-sum)より偶数は消えるため
$$
\tau(\chi_4)=\chi_4(1)e_4(1)+\chi_4(3)e_4(3)
=i-(-i)=2i.
$$
同じ定義を $a=3$ に用いると $S_{\chi_4}(3)=e_4(3)-e_4(9)=-i-i=-2i$ です。[原始文字のGauss変換](#thm-ant3-gauss-transform)でも $\overline{\chi_4(3)}\tau(\chi_4)=(-1)(2i)=-2i$ と一致します。
<!-- solution-end -->

### Level B：どの仮定が計算を支えるか

#### B1. 非主文字の部分和

法 $4$ の非主文字 $\chi_4$ の部分和 $A(N)=\sum_{n\le N}\chi_4(n)$ を $N=1,2,\ldots,8$ について求め、有界性から $\sum_{n\ge1}\chi_4(n)n^{-s}$ が $\sigma>0$ で収束する理由を説明せよ。

- Level: B
- ID: ANT3-B1

<!-- solution-start -->
**詳細解答**：$n=1,\ldots,8$ での文字値は $1,0,-1,0,1,0,-1,0$ なので、部分和は $1,1,0,0,1,1,0,0$ です。周期 $4$ の総和が $0$ であるためこの列を繰り返し、常に $|A(N)|\le1$ です。[Abelの部分和公式](../ANT1/index.md#thm-ant1-abel)を $f(t)=t^{-s}$ へ適用すると尾部は $O_s(N^{-\sigma})$ です。具体的に $B(t)=\sum_{N<n\le t}\chi_4(n)$ は絶対値が $1$ 以下であり、$M>N$ について
$$
\left|\sum_{N<n\le M}\chi_4(n)n^{-s}\right|
\le M^{-\sigma}+|s|\int_N^Mt^{-\sigma-1}dt
\le\left(1+\frac{|s|}{\sigma}\right)N^{-\sigma}.
$$
$\sigma>0$ なら右辺は $N\to\infty$ で $0$ となるのでCauchy条件を満たします。$\sigma>1$ という絶対収束条件とは区別が必要です。
<!-- solution-end -->

#### B2. 法8の原始性判定

法 $8$ の単数 $1,3,5,7$ に対し $\chi(1)=1,\chi(3)=-1,\chi(5)=-1,\chi(7)=1$ と置く。この関数がDirichlet文字かつ原始文字であることを示せ。

- Level: B
- ID: ANT3-B2

<!-- solution-start -->
**詳細解答**：[文字の定義](#def-ant3-character)に従い、まず法 $8$ の単数群 $G=\{1,3,5,7\}$ の乗法関係を確かめます。
$$
3^2\equiv5^2\equiv1\pmod8,
\qquad
3\cdot5\equiv7\pmod8.
$$
$\chi(3)=\chi(5)=-1$ の二乗は $1$ で、積は $\chi(7)=1$ に一致します。偶数で値 $0$ とする拡張も完全乗法性を保つので、法 $8$ のDirichlet文字です。

次に原始性を調べます。法 $8$ の真の約数は $1,2,4$ です。
$$
5\equiv1\pmod4,
\qquad
\chi(5)=-1\ne1=\chi(1).
$$
法 $4$ の文字から誘導されたものなら $5$ と $1$ の値は一致するはずなので、法 $4$ から誘導されません。法 $1,2$ の文字から誘導される場合も法 $4$ の文字を経由して誘導されるため不可能です。[原始文字の定義](#def-ant3-primitive)により原始です。
<!-- solution-end -->

#### B3. 非原始文字でGauss和が消える

法 $4$ の $\chi_4$ を法 $8$ に誘導した $\widetilde\chi$ の $\tau(\widetilde\chi)$ を直接求め、原始性を仮定した定理を適用できない理由を述べよ。

- Level: B
- ID: ANT3-B3

<!-- solution-start -->
**詳細解答**：奇数 $1,3,5,7$ での値は $1,-1,1,-1$ です。[Gauss和の定義](#def-ant3-gauss-sum)で
$$
\tau(\widetilde\chi)
=e_8(1)-e_8(3)+e_8(5)-e_8(7).
$$
$e_8(5)=e_8(1)e_8(4)=-e_8(1)$、同じく $e_8(7)=-e_8(3)$ なので総和は $0$ です。$\widetilde\chi$ は法 $4$ から誘導されるため[原始文字の定義](#def-ant3-primitive)に反します。従って[Gauss和絶対値の定理](#thm-ant3-gauss-magnitude)の仮定がなく、$|\tau|=\sqrt8$ を要求することはできません。
<!-- solution-end -->

#### B4. 原始文字のFourier反転

法 $q$ の原始文字 $\chi$ に対し、すべての整数 $n$ について次を証明せよ。
$$
\chi(n)=\frac1{\overline{\tau(\chi)}}\sum_{a\bmod q}\overline{\chi(a)}e_q(-an).
$$

- Level: B
- ID: ANT3-B4

<!-- solution-start -->
**詳細解答**：[原始文字のGauss変換](#thm-ant3-gauss-transform)を複素共役に取ると、$a$ に対して
$$
\overline{S_\chi(a)}=\chi(a)\overline{\tau(\chi)}.
$$
従って元の文字を反転するには $S_\chi(a)$ のFourier和を考えます。定義を代入し、指数の直交性で
$$
\begin{aligned}
\sum_{a\bmod q}S_\chi(a)e_q(-an)
&=\sum_{x\bmod q}\chi(x)\sum_{a\bmod q}e_q(a(x-n))\\
&=q\chi(n).
\end{aligned}
$$
一方、[原始文字のGauss変換](#thm-ant3-gauss-transform)から左辺は $\tau(\chi)\sum_{a}\overline{\chi(a)}e_q(-an)$ です。従って正しい逆変換は
$$
\chi(n)=\frac{\tau(\chi)}q\sum_{a\bmod q}\overline{\chi(a)}e_q(-an).
$$
[Gauss和の絶対値](#thm-ant3-gauss-magnitude)による $|\tau(\chi)|^2=q$ から $\tau(\chi)/q=1/\overline{\tau(\chi)}$ です。したがって問題文の式が成立します。原始性がなければ $\tau(\chi)=0$ となることがあり、この割り算はできません。
<!-- solution-end -->

### Level C：文字抽出式とL関数を結ぶ

#### C1. 法5の剰余類をL関数で抽出する

法 $5$ のすべての文字 $\chi$ を用いて、$\sigma>1$ において
$$
\sum_{\substack{n\ge1\\n\equiv2\pmod5}}\frac1{n^s}
=\frac14\sum_{\chi\bmod5}\overline{\chi(2)}L(s,\chi)
$$
を証明せよ。和の交換を正当化し、右辺を素数のEuler積で表せることと、そこから直ちに $s=1$ での非零性が出ない理由も説明せよ。

- Level: C
- ID: ANT3-C1

<!-- solution-start -->
**詳細解答**：[剰余類の指示関数公式](#cor-ant3-residue-projector)を $q=5,a=2$ に適用すると、$\varphi(5)=4$ なので
$$
\mathbf1_{\{n\equiv2\pmod5\}}
=\frac14\sum_{\chi\bmod5}\chi(n)\overline{\chi(2)}
$$
がすべての $n\ge1$ で成立します。$\sigma>1$ なら $|\chi(n)|\le1$ より
$$
\sum_{n\ge1}\sum_{\chi\bmod5}\left|
\frac{\chi(n)\overline{\chi(2)}}{n^s}\right|
\le4\sum_{n\ge1}n^{-\sigma}<\infty.
$$
従って有限個の文字の和と整数の無限和を交換でき、
$$
\begin{aligned}
\sum_{\substack{n\ge1\\n\equiv2\pmod5}}n^{-s}
&=\sum_{n\ge1}n^{-s}\,\mathbf1_{\{n\equiv2\pmod5\}}\\
&=\frac14\sum_{\chi\bmod5}\overline{\chi(2)}
 \sum_{n\ge1}\chi(n)n^{-s}\\
&=\frac14\sum_{\chi\bmod5}\overline{\chi(2)}L(s,\chi).
\end{aligned}
$$
[Dirichlet L関数のEuler積](#thm-ant3-l-euler)を各項へ適用すれば
$$
\frac14\sum_{\chi\bmod5}\overline{\chi(2)}
\prod_p(1-\chi(p)p^{-s})^{-1}\qquad(\sigma>1)
$$
とも書けます。各積の非零性は $\sigma>1$ の話であり、有限和全体の非零性までは主張しません。さらに $s=1$ はこのEuler積による絶対収束領域の境界です。[非主L関数の正則延長](#thm-ant3-l-continuation)で値は存在しても $L(1,\chi)\ne0$ はまだ証明していません。これを確立するのが後続のDirichletの定理の重要部分です。
<!-- solution-end -->

## 7. 次章への橋

文字の直交関係で剰余類を抽出し、Gauss和で乗法的な情報と加法的な周波数を変換し、$L$ 関数のEuler積で素数へ接続できました。非主文字の $L$ 関数は $s=1$ まで正則に進めますが、「そこで $0$ にならない」ことは未証明です。ANT4では、この欠けた非零性を正面から証明したうえで、互いに素な剰余類のそれぞれに素数が無限に存在することを導きます。
