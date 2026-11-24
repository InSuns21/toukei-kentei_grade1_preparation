# IWA13 p進測度・積分とIwasawa代数

[IWA12の比較写像](../IWA12/index.md#def-iwa12-control-map)では、無限塔の情報を有限層へ戻す際の誤差を調べました。一方、[IWA3の岩澤代数](../IWA3/index.md#def-iwa3-completed-group-ring)は、有限群環の整合する列を一つの環にまとめます。次は、この「有限層の両立条件」が **関数の積分** という別の姿を持つことを示します。

通常の実数値積分では区間の長さから始めます。しかし $p$ 進世界では、各剰余類 $a+p^n\mathbb Z_p$ に係数を割り当て、その係数が細分化と整合することから積分を作れます。さらに、剰余類の和を取る畳み込みが岩澤代数の積そのものになります。最後に、連続指標を積分する $p$ 進 Mellin 変換を冪級数の代入として計算します。

本講では **奇素数 $p$** を固定します。第1〜5節は $p=2$ でも同じ証明が通りますが、第6節の典型的な指標 $x\mapsto(1+p)^{kx}$ の表記を円分塔での標準的な規約と揃えるため奇素数とします。測度の台は加法群 $\mathbb Z_p$ とし、後で[位相的生成元](../IWA1/index.md#def-iwa1-topological-generator) $\gamma$ を選び、加法の $a$ に乗法の $\gamma^a$ を対応させて $\mathbb Z_p\simeq\Gamma$ と同一視します。

## 1. 有限分割の重みを整合させる

$p$ 進整数の各元 $x$ は、法 $p^n$ の剰余類 $a+p^n\mathbb Z_p$ の中に一意に入ります（整数代表元は $0\le a<p^n$）。以下、$\sum_{a\bmod p^n}$ はこの代表元を全て動かす有限和です。$\bigsqcup$ は互いに素な集合の合併を表します。この集合は開かつ閉であり、$n$ を増すと次の $p$ 個の集合へ分かれます。

$$
a+p^n\mathbb Z_p
=\bigsqcup_{b=0}^{p-1}(a+bp^n+p^{n+1}\mathbb Z_p).
$$

そこで、重みが「親の値＝子の値の和」を満たすようにします。これは [逆極限の整合列](../IWA4/index.md#def-iwa4-inverse-limit)と同じ方向の条件です。

<a id="def-iwa13-distribution"></a>

<!-- formal-statement-start -->
> **定義（p進分布）**  
> $n\ge0$、$a\in\mathbb Z/p^n\mathbb Z$ に対する $\mathbb Q_p$ 値の族 $\mu_n(a)$ が **$p$ 進分布** であるとは、全ての $n,a$ で
>
$$
\mu_n(a)=\sum_{b=0}^{p-1}\mu_{n+1}(a+bp^n)
$$
>
> を満たすことをいう。さらに全ての $n,a$ で $\mu_n(a)\in\mathbb Z_p$ なら **$\mathbb Z_p$ 値測度** という。本講では後者を単に「測度」と呼ぶ。記号 $\mu(a+p^n\mathbb Z_p)=\mu_n(a)$ を使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa13-distribution -->
**定義の確認**（点に集中した重み）。 $c\in\mathbb Z_p$ を固定し

$$
\delta_{c,n}(a)=
\begin{cases}
1 & a\equiv c\pmod{p^n},\\
0 & a\not\equiv c\pmod{p^n}
\end{cases}
$$

とします。親の剰余類が $c$ を含めば、子のうちちょうど一つだけが $c$ を含むので右辺は $1$ です。含まなければ全て $0$ です。いずれの場合も分布関係が成立し、値は $\mathbb Z_p$ に入ります。この測度を **点質量 $\delta_c$** と書きます。$p=3,c=1$ のとき、第1層の重みは $(0,1,0)$、第0層の重みは $(1)$ です。
<!-- definition-example-end -->

分布関係を繰り返すと、任意の $m\ge n$ で

$$
\mu_n(a)=\sum_{\substack{0\le c<p^m\\c\equiv a\pmod{p^n}}}\mu_m(c)
$$

が従います。$m=n+1$ が定義で、$m$ から $m+1$ へは各項をさらに $p$ 個へ分解すればよいからです。特に **全質量**

$$
\mu(\mathbb Z_p)=\sum_{a\bmod p^n}\mu_n(a)=\mu_0(0)
$$

は $n$ に依存しません。測度は確率とは違い、係数が例えば $-1$ でもよく、全質量が $1$ でなくても構いません。$\mathbb Q_p$ に実数のような順序を仮定していません。

## 2. 重みから連続関数の積分を作る

関数 $f:\mathbb Z_p\to\mathbb Z_p$ がある $n$ について法 $p^n$ の剰余類ごとに一定なら、有限和

$$
I_\mu(f)=\sum_{a=0}^{p^n-1}f(a)\mu_n(a)
$$

を考えられます。このようにある有限層の剰余類ごとに一定な関数を局所定数関数と呼びます。剰余類 $U$ の [指示関数](../../../解析系/F0/F0-00D2/index.md#prop-f0-00d2-03) $\mathbf1_U(x)$ は $x\in U$ なら $1$、それ以外なら $0$ です。$U$ とその補集合が開なので、これは連続な $\mathbb Z_p$ 値関数です。有限和の極限を $\int f(x)\,d\mu(x)$ と書き、$x$ は積分する変数、$d\mu(x)$ は重み $\mu$ による積分を表します。微分の記号ではありません。より細かい層 $m\ge n$ で計算しても前節の分布関係から同じ値です。連続関数は局所定数関数で一様近似できるため、この有限和を極限まで延ばせます。

<a id="def-iwa13-integral"></a>

<!-- formal-statement-start -->
> **定義（p進積分）**  
> $\mathbb Z_p$ 値測度 $\mu$ と連続関数 $f\in C(\mathbb Z_p,\mathbb Z_p)$ に対し、
>
$$
f_n(x)=f(a)\quad(x\equiv a\pmod{p^n},\ 0\le a<p^n)
$$
>
> と置き、極限が存在するとき
>
$$
\int_{\mathbb Z_p}f(x)\,d\mu(x)
=\lim_{n\to\infty}\sum_{a=0}^{p^n-1}f(a)\mu_n(a)
$$
>
> と定める。$C(\mathbb Z_p,\mathbb Z_p)$ は連続な $\mathbb Z_p$ 値関数全体であり、ノルムは $\|f\|_\infty=\sup_x|f(x)|_p$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa13-integral -->
**定義の確認**（関数を代入する）。まず任意の $c\in\mathbb Z_p$ について、その第 $n$ 層の整数代表元を $c_n$ と書くと、[点質量の定義](#def-iwa13-distribution)から有限和は $f(c_n)$ です。$|c_n-c|_p\le p^{-n}$ と連続性により $f(c_n)\to f(c)$。従って $\int f(x)\,d\delta_c(x)=f(c)$ です。測度の有限和は各係数について線形なので、点質量の有限線形結合でも極限が存在します。 $\mu=\delta_0+2\delta_1-\delta_3$、$f(x)=x^2$ とします。$n\ge2$ なら三点 $0,1,3$ は異なる剰余類に入るので、有限和は $0^2+2\cdot1^2-3^2=-7$ に一致します。したがって積分は $-7\in\mathbb Z_p$ です。有限和で実際に極限値が安定することまで確認できました。
<!-- definition-example-end -->

<a id="thm-iwa13-extension"></a>

<!-- formal-statement-start -->
> **定理（分布の積分への一意的延長）**  
> $\mathbb Z_p$ 値測度 $\mu$ について、上の極限は全ての $f\in C(\mathbb Z_p,\mathbb Z_p)$ で存在する。写像 $I_\mu:f\mapsto\int f\,d\mu$ は連続な $\mathbb Z_p$ 線形写像で、
>
$$
|I_\mu(f)|_p\le\|f\|_\infty,\qquad
I_\mu(\mathbf1_{a+p^n\mathbb Z_p})=\mu_n(a)
$$
>
> を満たす。この二条件を満たし、局所定数関数上で同じ値を持つ連続線形写像は $I_\mu$ に限る。
<!-- formal-statement-end -->

### 証明の見取り図

局所定数関数上の有限和は分布関係のおかげで表示する層に依存しません。$\mu_n(a)$ の $p$ 進絶対値は $1$ 以下なので、有限和の大きさは関数の最大値で抑えられます。最後に連続関数を一様近似して極限を取ります。

<!-- proof-start -->
### 証明

$\mathbb Z_p$ はコンパクトで、連続な $f$ は一様連続です。従って任意の整数 $r\ge1$ に対し、ある $N$ が存在して $x\equiv y\pmod{p^N}$ なら $|f(x)-f(y)|_p\le p^{-r}$ です。$n\ge N$ なら $\|f-f_n\|_\infty\le p^{-r}$ であり、$\|f-f_n\|_\infty\to0$ が従います。

局所定数関数 $g$ が法 $p^n$ で一定のとき、分布関係から上位層でも

$$
\sum_{c\bmod p^{n+1}}g(c)\mu_{n+1}(c)
=\sum_{a\bmod p^n}g(a)
\sum_{b=0}^{p-1}\mu_{n+1}(a+bp^n)
=\sum_{a\bmod p^n}g(a)\mu_n(a).
$$

従って $I_\mu(g)$ は定義に依存しません。非 Archimedes 的三角不等式と $|\mu_n(a)|_p\le1$ により

$$
|I_\mu(g)|_p
\le\max_{a\bmod p^n}|g(a)\mu_n(a)|_p
\le\|g\|_\infty.
$$

$n,m$ に対し、$f_n-f_m$ も局所定数関数なので

$$
|I_\mu(f_n)-I_\mu(f_m)|_p
\le\|f_n-f_m\|_\infty
\le\max(\|f_n-f\|_\infty,\|f_m-f\|_\infty).
$$

右辺は $n,m\to\infty$ で零へ行きます。$\mathbb Z_p$ は完備なので有限和の値は収束します。線形性は有限和から極限へ移り、評価式は $f_n\to f$ と $|I_\mu(f_n)|_p\le\|f_n\|_\infty\le\|f\|_\infty$ から従います。剰余類の指示関数 $\mathbf1_{a+p^n\mathbb Z_p}$ は局所定数であり、その積分は定義上 $\mu_n(a)$ です。

最後に、局所定数関数上で同じ積分を持つ連続線形写像 $J$ について $J(f_n)=I_\mu(f_n)$ です。$f_n\to f$ と両者の連続性から $J(f)=I_\mu(f)$ となり、一意です。
<!-- proof-end -->

定理が与えるものは「重みの整合性 $\Rightarrow$ 積分」です。逆に積分が先に与えられれば、剰余類の指示関数を積分して重みを復元できます。[連続線形汎関数](../../../解析系/F0/F0-02C2/index.md#def-f0-02c2-continuous-linear-functional)の実数値の場合と同じ発想ですが、ここでは実ベクトル空間ではなく $\mathbb Z_p$ 加群を扱います。すなわち $L(af+bg)=aL(f)+bL(g)$（$a,b\in\mathbb Z_p$）であり、連続性は一様ノルムによる収束を値の $p$ 進収束へ移すことです。

<a id="thm-iwa13-functional-correspondence"></a>

<!-- formal-statement-start -->
> **定理（測度と連続線形汎関数の対応）**  
> $\mathbb Z_p$ 値測度 $\mu$ の全体と、連続な $\mathbb Z_p$ 線形写像
>
$$
L:C(\mathbb Z_p,\mathbb Z_p)\longrightarrow\mathbb Z_p
$$
>
> の全体は、$\mu\mapsto I_\mu$ により一対一に対応する。逆対応は
>
$$
\mu_n(a)=L(\mathbf1_{a+p^n\mathbb Z_p})
$$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

分割された親の指示関数は子の指示関数の和です。この恒等式に $L$ を作用させれば、測度の分布関係が出ます。指示関数の値が一致すれば局所定数関数上でも一致し、前定理の一意性が使えます。

<!-- proof-start -->
### 証明

$\mathbf1_{a+p^n\mathbb Z_p}=\sum_{b=0}^{p-1}\mathbf1_{a+bp^n+p^{n+1}\mathbb Z_p}$ なので、$L$ の線形性から

$$
L(\mathbf1_{a+p^n\mathbb Z_p})
=\sum_{b=0}^{p-1}L(\mathbf1_{a+bp^n+p^{n+1}\mathbb Z_p}).
$$

従って逆対応で作る $\mu_n(a)$ は分布関係を満たします。値域が $\mathbb Z_p$ なので $\mathbb Z_p$ 値測度です。また局所定数関数 $g=\sum_{a\bmod p^n}g(a)\mathbf1_{a+p^n\mathbb Z_p}$ について

$$
L(g)=\sum_{a\bmod p^n}g(a)L(\mathbf1_{a+p^n\mathbb Z_p})
=\sum_{a\bmod p^n}g(a)\mu_n(a)=I_\mu(g).
$$

一様近似 $f_n\to f$ と $L,I_\mu$ の連続性により $L(f)=I_\mu(f)$。逆に積分から復元した値は[分布の積分への一意的延長](#thm-iwa13-extension)の指示関数の等式により元の $\mu_n(a)$ です。両写像は互いに逆です。
<!-- proof-end -->

## 3. 測度を掛ける：畳み込み

測度の足し算と $\mathbb Z_p$ 倍は、各 $\mu_n(a)$ を足し算・スカラー倍すれば定義できます。しかし [岩澤代数の環構造](../IWA3/index.md#def-iwa3-completed-group-ring)へ対応させるには積が必要です。加法群 $\mathbb Z_p$ 上では、二つの位置の **和** がある位置になるように重みを集計します。

<a id="def-iwa13-convolution"></a>

<!-- formal-statement-start -->
> **定義（測度の畳み込み）**  
> $\mathbb Z_p$ 値測度 $\mu,\nu$ に対し
>
$$
(\mu*\nu)_n(a)
=\sum_{\substack{b,c\bmod p^n\\b+c\equiv a\;(\mathrm{mod}\;p^n)}}\mu_n(b)\nu_n(c)
$$
>
> で定まる族を **測度の畳み込み** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa13-convolution -->
**定義の確認**。 $p=3$、$\mu=\delta_1$、$\nu=\delta_2$ とします。第1層では重みがそれぞれ $b=1$、$c=2$ のときだけ $1$ なので、和が $0\bmod3$ の剰余類だけに重み $1$ が残ります。第2層では $1+2=3\bmod9$ だけに重み $1$ が残ります。どの層でも同じ計算となるため $\delta_1*\delta_2=\delta_3$ です。第1層で $\delta_3=\delta_0$ に見えても、測度全体では $\delta_3\ne\delta_0$ である点に注意してください。
<!-- definition-example-end -->

<a id="prop-iwa13-convolution"></a>

<!-- formal-statement-start -->
> **命題（畳み込みの整合性と積分公式）**  
> $\mu,\nu$ が $\mathbb Z_p$ 値測度なら $\mu*\nu$ も $\mathbb Z_p$ 値測度であり、全ての $f\in C(\mathbb Z_p,\mathbb Z_p)$ について
>
$$
\int f(z)\,d(\mu*\nu)(z)
=\int\!\left(\int f(x+y)\,d\nu(y)\right)d\mu(x).
$$
>
> また $\delta_0$ は畳み込みの単位元、全ての $a,b\in\mathbb Z_p$ について $\delta_a*\delta_b=\delta_{a+b}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

有限層で畳み込みを計算し、細分化の総和を $b,c$ の親剰余類ごとにまとめます。積分公式は局所定数関数での有限の二重和を確認した後、一様近似で連続関数に延ばします。

<!-- proof-start -->
### 証明

固定した $a\bmod p^n$ の上にある第 $n+1$ 層の全剰余類で和を取ると、定義から

$$
\sum_{d\equiv a\;(\mathrm{mod}\;p^n)}(\mu*\nu)_{n+1}(d)
=\sum_{\substack{b',c'\bmod p^{n+1}\\b'+c'\equiv a\;(\mathrm{mod}\;p^n)}}
\mu_{n+1}(b')\nu_{n+1}(c').
$$

右辺を $b=b'\bmod p^n$、$c=c'\bmod p^n$ ごとにまとめると

$$
\sum_{\substack{b+c\equiv a\;(\mathrm{mod}\;p^n)}}
\left(\sum_{b'\equiv b}\mu_{n+1}(b')\right)
\left(\sum_{c'\equiv c}\nu_{n+1}(c')\right)
=\sum_{b+c\equiv a}\mu_n(b)\nu_n(c)
=(\mu*\nu)_n(a).
$$

従って分布関係が成立し、各値も $\mathbb Z_p$ 内です。

$f$ が法 $p^n$ の剰余類で一定のとき、積分公式の左辺は

$$
\sum_{a\bmod p^n}f(a)\sum_{b+c\equiv a}\mu_n(b)\nu_n(c)
=\sum_{b,c\bmod p^n}f(b+c)\mu_n(b)\nu_n(c)
$$

です。右辺の反復積分でもまず $y$、次に $x$ の有限和を取れば同じ式です。一般の連続 $f$ については、第2節の局所定数近似 $f_n$ を取ります。内側の積分が外側の積分の入力になることを先に確かめます。

$$
h_n(x)=I_\nu(y\mapsto f_n(x+y)),\qquad
h(x)=I_\nu(y\mapsto f(x+y)).
$$

各 $h_n$ は法 $p^n$ で一定です。[積分の評価式](#thm-iwa13-extension)を $y$ の関数に使うと

$$
|h_n(x)-h(x)|_p
\le \sup_y|f_n(x+y)-f(x+y)|_p
\le \|f_n-f\|_\infty.
$$

従って $h$ は連続関数 $h_n$ の一様極限であり、外側の積分も定義できます。同じ評価式で

$$
|I_\mu(h_n)-I_\mu(h)|_p\le\|h_n-h\|_\infty,
$$

$$
|I_{\mu*\nu}(f_n)-I_{\mu*\nu}(f)|_p\le\|f_n-f\|_\infty.
$$

双方が零に収束するので、局所定数関数での等式を極限へ移せます。

点質量の積は各層の定義から $\delta_a*\delta_b=\delta_{a+b}$ です。一般の $\mu$ についても、畳み込みの和で $\delta_{0,n}(b)$ が非零になるのは $b=0$ だけであり、そのとき $c=a$ なので $(\delta_0*\mu)_n(a)=\mu_n(a)$ です。また三つの測度 $\mu,\nu,\eta$ について、第 $n$ 層の $a$ での重みを計算すると

$$
((\mu*\nu)*\eta)_n(a)
=\sum_{b+c+d\equiv a\;(\mathrm{mod}\;p^n)}
\mu_n(b)\nu_n(c)\eta_n(d)
=(\mu*(\nu*\eta))_n(a).
$$

これは有限和の分配法則であり、畳み込みの結合性を示します。$b,c$ を交換すると交換性も従います。
<!-- proof-end -->

## 4. 完備群環と測度の環は同じもの

[IWA3の有限群環](../IWA3/index.md#def-iwa3-finite-group-ring)には、各 $n$ で $G_n=\mathbb Z/p^n\mathbb Z$ の元 $[a]$ を基底とする $\mathbb Z_p[G_n]$ を考えます。IWA3の有限係数環を係数精度について極限にしたもので、$[b][c]=[b+c]$ です。各 $[a]$ は群環の形式的基底元で、係数は一意に決まります。測度の第 $n$ 層の値を、この基底の係数へ配置します。

<a id="thm-iwa13-measure-algebra"></a>

<!-- formal-statement-start -->
> **定理（測度環と岩澤代数）**  
> $\mathcal M(\mathbb Z_p,\mathbb Z_p)$ を $\mathbb Z_p$ 値測度全体とする。和・スカラー倍・畳み込みにより可換環になり、
>
$$
\Phi:\mathcal M(\mathbb Z_p,\mathbb Z_p)
\xrightarrow{\ \simeq\ }
\varprojlim_n\mathbb Z_p[\mathbb Z/p^n\mathbb Z],
\qquad
\Phi(\mu)_n=\sum_{a\bmod p^n}\mu_n(a)[a]
$$
>
> は環同型である。位相的生成元 $\gamma$ を持つ $\Gamma\simeq\mathbb Z_p$ に $a\mapsto\gamma^a$ で同一視すれば、右辺は $\Lambda=\mathbb Z_p[[\Gamma]]\simeq\mathbb Z_p[[T]]$（$T=\gamma-1$）である。
<!-- formal-statement-end -->

### 証明の見取り図

分布関係は、上位群環から下位群環への写像で係数を集める条件そのものです。有限群環の積の係数は畳み込みと同じ二重和になります。最後の冪級数表示は、すでに [IWA3で証明した同型](../IWA3/index.md#thm-iwa3-power-series-isomorphism)へ接続します。

<!-- proof-start -->
### 証明

群の還元 $G_{n+1}\to G_n$ が誘導する群環準同型 $q_{n+1,n}$ に対し、$[a+bp^n]$ は全て $[a]$ へ写ります。よって

$$
q_{n+1,n}(\Phi(\mu)_{n+1})
=\sum_{a\bmod p^n}
\left(\sum_{b=0}^{p-1}\mu_{n+1}(a+bp^n)\right)[a]
=\sum_{a\bmod p^n}\mu_n(a)[a].
$$

従って $\Phi(\mu)$ は逆極限の元です。逆に、整合する群環の列 $u_n=\sum_a c_{n,a}[a]$ の係数を比較すると、必ず $c_{n,a}=\sum_b c_{n+1,a+bp^n}$ です。これらを $\mu_n(a)=c_{n,a}$ と置けば測度を復元できます。従って $\Phi$ は加法群として全単射です。

有限群環での積の $[a]$ の係数は

$$
\left(\sum_b\mu_n(b)[b]\right)
\left(\sum_c\nu_n(c)[c]\right)\Big|_{[a]}
=\sum_{b+c\equiv a}\mu_n(b)\nu_n(c)
=(\mu*\nu)_n(a).
$$

ゆえに $\Phi(\mu*\nu)=\Phi(\mu)\Phi(\nu)$ です。単位元は $\delta_0$ に対応します。$\Gamma$ の同一視を施すと、有限群環の逆極限は [岩澤代数の定義](../IWA3/index.md#def-iwa3-completed-group-ring)と一致します。具体的に各 $n$ を固定すると、有限個の係数を法 $p^m$ に還元して

$$
\mathbb Z_p[G_n]\simeq
\varprojlim_m(\mathbb Z/p^m\mathbb Z)[G_n]
$$

となります。群環の遷移写像は係数の和なので係数還元と可換です。従って $n$ と $m$ の両方で整合する族は、IWA3の二重逆極限の元そのものです。[岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)により $\gamma$ の像を $1+T$ と置けます。
<!-- proof-end -->

例えば点質量では

$$
\Phi(\delta_0)=1,\quad
\Phi(\delta_1)=\gamma=1+T,\quad
\Phi(\delta_0-\delta_1)=1-(1+T)=-T.
$$

これは測度の全質量・位置・積が、冪級数の定数項・指数・積でどう見えるかを最初に確かめる例です。

## 5. 冪級数の係数は「二項式の積分」である

$a\in\mathbb Z_p$ と非負整数 $j$ に対し、二項係数 $\binom aj=a(a-1)\cdots(a-j+1)/j!$ を使います。$j=0$ の空積は $1$ とし、$\binom a0=1$ です。$j$ を固定すればこの式は $a$ の有理係数多項式なので $p$ 進連続です。非負整数 $a$ における値は整数であり、非負整数は $\mathbb Z_p$ で稠密なので $\binom aj\in\mathbb Z_p$ が全ての $a\in\mathbb Z_p$ で成り立ちます。

<a id="def-iwa13-amice-transform"></a>

<!-- formal-statement-start -->
> **定義（二項式変換）**  
> $\mathbb Z_p$ 値測度 $\mu$ に対し、冪級数
>
$$
\mathcal A_\mu(T)
=\sum_{j=0}^\infty\left(\int_{\mathbb Z_p}\binom{x}{j}\,d\mu(x)\right)T^j
\in\mathbb Z_p[[T]]
$$
>
> を **二項式変換（Amice変換）** という。形式的には $\int_{\mathbb Z_p}(1+T)^x\,d\mu(x)$ と書く。これは $(1+T)^x=\sum_{j\ge0}\binom{x}{j}T^j$ の各係数を別々に積分する記法である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa13-amice-transform -->
**定義の確認**。 $\mu=\delta_2$ なら $\int\binom{x}{j}d\delta_2=\binom2j$。従って係数は順に $1,2,1,0,\ldots$ で、$\mathcal A_{\delta_2}(T)=1+2T+T^2=(1+T)^2$ です。$\mu=\delta_0-\delta_1$ なら係数は $j=0$ で $0$、$j=1$ で $-1$、それより上で $0$、従って $-T$ になります。
<!-- definition-example-end -->

<a id="thm-iwa13-amice-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（二項式変換と岩澤代数の積）**  
> 第4節の位相的生成元 $\gamma$ を固定すると、$\mathcal A_\mu(T)$ は $\Phi(\mu)$ を [IWA3の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)で表したものに一致する。特に
>
$$
\mathcal A_{\mu*\nu}(T)
=\mathcal A_\mu(T)\mathcal A_\nu(T),\qquad
\mathcal A_{\delta_a}(T)=(1+T)^a
$$
>
> が成り立ち、$\mu\mapsto\mathcal A_\mu$ は $\mathcal M(\mathbb Z_p,\mathbb Z_p)\simeq\mathbb Z_p[[T]]$ という環同型である。
<!-- formal-statement-end -->

### 証明の見取り図

有限層の群環を $\gamma\mapsto1+T$ で書くと $\sum_a\mu_n(a)(1+T)^a$ が得られます。$T^j$ の係数は $\sum_a\mu_n(a)\binom aj$ です。これが積分の定義で $j$ 番目の二項式モーメントへ収束します。

<!-- proof-start -->
### 証明

第 $n$ 層で整数代表元 $0\le a<p^n$ を使い

$$
P_n(T)=\sum_{a=0}^{p^n-1}\mu_n(a)(1+T)^a\in\mathbb Z_p[T]
$$

と置きます。第 $n$ 層を表す関係式は

$$
\omega_n=(1+T)^{p^n}-1
$$

です。[有限群環の一変数表示](../IWA3/index.md#prop-iwa3-finite-presentation)により、係数を法 $p^m$ に還元した $P_n(T)$ は $J_{m,n}=(p^m,\omega_n)$ を法として $\Phi(\mu)_n$ の還元に対応します。整数代表元を一段細かく取ると、$(1+T)^{a+bp^n}\equiv(1+T)^a\pmod{\omega_n}$ なので分布関係は

$$
P_{n+1}(T)\equiv P_n(T)\pmod{\omega_n}
$$

を与えます。[有限層の核と極限位相の一致](../IWA3/index.md#lem-iwa3-cofinal-ideals)によれば $\omega_n\in(p,T)^{n+1}$ です。従って $m>n$ のとき、各隣接差を足して $P_m-P_n\in(p,T)^{n+1}$ となり、冪級数環の完備性から極限 $P$ が存在します。固定した有限段 $(s,k)$ では、$n\ge k$ の全ての $P_n$ が同じ剰余類を表します。$J_{s,k}$ は開かつ閉なので $P$ もその剰余類を表し、[岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)から $P$ は $\Phi(\mu)$ の冪級数表示です。

一方、$[T^j]P_n$ は変数 $T$ の $j$ 次係数を取り出す記号です。$j$ を固定すると、二項展開から

$$
[T^j]P_n(T)=\sum_{a=0}^{p^n-1}\mu_n(a)\binom aj.
$$

$\binom{x}{j}$ は連続な $\mathbb Z_p$ 値関数なので、[分布の積分への一意的延長](#thm-iwa13-extension)からこの係数は $\int\binom{x}{j}d\mu$ へ収束します。$(p,T)$ 進収束では固定次数の係数も $p$ 進収束するので、極限の全係数は $\mathcal A_\mu(T)$ の定義式と一致します。最後に [測度環同型](#thm-iwa13-measure-algebra)が積を保つため乗法公式が従います。

$\delta_a$ の場合、$a$ を法 $p^n$ で代表する非負整数列 $a_n$ は $a$ へ $p$ 進収束します。各 $j$ で $\binom{a_n}{j}\to\binom aj$ なので $\mathcal A_{\delta_a}(T)=\sum_j\binom ajT^j=(1+T)^a$ です。
<!-- proof-end -->

## 6. 連続指標を積分する $p$ 進 Mellin 変換

冪級数の $T$ に具体的な $p$ 進数を代入して値を読みます。$K$ を $\mathbb Q_p$ の $p$ 進絶対値を延長した完備な拡大体とし、$\mathcal O_K=\{z\in K:|z|_p\le1\}$ をその整数環とします。これは閉集合なので完備です。$\mathcal O_K^\times$ はその単元群、すなわち $|z|_p=1$ の元全体です。例えば $\mathbb C_p$ は $\mathbb Q_p$ の代数閉包を完備化した体です。連続な群準同型 $\kappa:(\mathbb Z_p,+)\to\mathcal O_K^\times$ は、加法を乗法へ写すので **連続指標** です。$u=\kappa(1)$ とすれば、非負整数 $a$ では $\kappa(a)=u^a$ です。$x$ の整数代表元 $x_n\to x$ を使うと、連続性から $\kappa(x)=\lim_n u^{x_n}$ となります。この極限を $u^x$ と書きます。

さらに $p^n\to0$ より $u^{p^n}=\kappa(p^n)\to1$ です。$\mathfrak m_K=\{z\in\mathcal O_K:|z|_p<1\}$ と置くと、剰余体 $\mathcal O_K/\mathfrak m_K$ は標数 $p$ です。十分大きな $n$ で $u^{p^n}-1\in\mathfrak m_K$ なので、剰余体で

$$
(\bar u-1)^{p^n}=\bar u^{p^n}-1=0.
$$

体には零でない冪零元がないため $\bar u=1$、すなわち $|u-1|_p<1$ です。同じ計算は $p$ 冪根にも適用できます。

第2節の積分を $\mathcal O_K$ 値連続関数にも拡張します。局所定数関数の有限和は同じ分布関係を満たし、$|\mu_n(a)|_p\le1$ なので、[積分への一意的延長](#thm-iwa13-extension)の Cauchy 評価がそのまま成立します。$\mathcal O_K$ の完備性により極限が存在し、有限和から $\mathcal O_K$ 線形性も従います。さらに第3節の [畳み込みの積分公式](#prop-iwa13-convolution)の証明は同じ評価と完備性だけを使うため、$\mathcal O_K$ 値連続関数にも成立します。

<a id="def-iwa13-mellin"></a>

<!-- formal-statement-start -->
> **定義（p進Mellin変換）**  
> $\mathbb Z_p$ 値測度 $\mu$ と上記の連続指標 $\kappa$ に対し
>
$$
\mathscr M_\mu(\kappa)
=\int_{\mathbb Z_p}\kappa(x)\,d\mu(x)\in\mathcal O_K
$$
>
> を **$p$ 進 Mellin 変換** という。積分は $K$ 値関数の有限和を極限にすることで定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa13-mellin -->
**定義の確認**。 $\mu=\delta_0-\delta_1$ なら $\mathscr M_\mu(\kappa)=\kappa(0)-\kappa(1)=1-u$。一方 $\mathcal A_\mu(T)=-T$ なので $\mathcal A_\mu(u-1)=-(u-1)=1-u$ です。指標の値を積分することと冪級数を評価することが一致します。
<!-- definition-example-end -->

ここで積分の入力は $\kappa(x)$ であり、測度の係数は引き続き $\mathbb Z_p$ にあります。

<a id="thm-iwa13-mellin-evaluation"></a>

<!-- formal-statement-start -->
> **定理（Mellin変換の評価公式）**  
> $\mu$ を $\mathbb Z_p$ 値測度、$\kappa:\mathbb Z_p\to\mathcal O_K^\times$ を連続指標、$u=\kappa(1)$ とする。このとき
>
$$
\mathscr M_\mu(\kappa)=\mathcal A_\mu(u-1).
$$
>
> 特に $\kappa$ が法 $p^n$ を通じて定まる有限位数の指標なら
>
$$
\mathscr M_\mu(\kappa)
=\sum_{a=0}^{p^n-1}\kappa(a)\mu_n(a).
$$
>
> また任意の $\mathbb Z_p$ 値測度 $\nu$ について $\mathscr M_{\mu*\nu}(\kappa)=\mathscr M_\mu(\kappa)\mathscr M_\nu(\kappa)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

整数 $a$ について $\kappa(a)=u^a$ です。有限和で $\kappa$ を積分した値は $P_n(u-1)$。$n$ を大きくすると積分へ収束し、冪級数の評価とも一致します。畳み込みの積公式は $\kappa(x+y)=\kappa(x)\kappa(y)$ を使います。

<!-- proof-start -->
### 証明

$\kappa$ が連続なので、$f_n(x)=\kappa(a)$（$x\equiv a\bmod p^n$）は一様に $\kappa$ へ収束します。従って有限和の定義により

$$
\mathscr M_\mu(\kappa)
=\lim_{n\to\infty}\sum_{a=0}^{p^n-1}\mu_n(a)u^a
=\lim_{n\to\infty}P_n(u-1).
$$

$|u-1|_p<1$ より、係数が $\mathbb Z_p$ にある $\mathcal A_\mu(T)=\sum_jb_jT^j$ の評価 $\sum_jb_j(u-1)^j$ は収束します。また [二項式変換と岩澤代数の積](#thm-iwa13-amice-isomorphism)で得た $P_n\to\mathcal A_\mu$ の $(p,T)$ 進収束は、$T=u-1$ での評価により $K$ 内の収束へ移ります。実際、差が $(p,T)^r$ に入れば、評価後の絶対値は $\max(p^{-1},|u-1|_p)^r$ 以下です。従って極限は $\mathcal A_\mu(u-1)$ です。

有限位数の指標が法 $p^n$ を通じて定まるなら、$\kappa$ は各剰余類で一定なので、定義した積分はその層での有限和に等しいです。

最後に [畳み込みの整合性と積分公式](#prop-iwa13-convolution)を $f(z)=\kappa(z)$ へ適用すると、内側は $\int\kappa(x)\kappa(y)d\nu(y)=\kappa(x)\mathscr M_\nu(\kappa)$、外側はその定数をくくり出して $\mathscr M_\mu(\kappa)\mathscr M_\nu(\kappa)$ になります。
<!-- proof-end -->

**具体的な指標。** $p=3$ なら $u=4^k$（$k\in\mathbb Z_3$、$4^k=\sum_{j\ge0}\binom kj3^j$）を選べます。$\kappa_k(x)=4^{kx}$ は連続指標です。例えば $\mu=\delta_0+2\delta_1$ の変換は $1+2\cdot4^k$、二項式変換は $1+2(1+T)=3+2T$ なので $T=4^k-1$ の代入は同じ値を与えます。

この講義で構成したのは **指標を評価する仕組み** です。次の IWA14 では特定の値を複数の $k$ について一つの連続な関数に補間できる条件を調べ、IWA15 で算術的な $p$ 進 $L$ 関数へ進みます。一般の任意の値列がここで自動的に補間できるわけではありません。

## 7. 実数の一様測度をそのまま移せない理由

$\mathbb Z/p^n\mathbb Z$ の各剰余類へ「同じ質量」を割り当て、全質量を $1$ にしたければ、唯一の候補は $\mu_n(a)=p^{-n}$ です。分布関係自体は

$$
\sum_{b=0}^{p-1}p^{-(n+1)}=p^{-n}
$$

で成り立ちます。しかし $|p^{-n}|_p=p^n$ は発散し、値も $n>0$ では $\mathbb Z_p$ に入りません。従ってこれは $\mathbb Q_p$ 値分布ですが、本講の測度ではありません。指示関数のノルムは常に $1$ なのに、積分した値の絶対値が $p^n$ まで大きくなるので、連続な有界線形汎関数には延長できません。

一般に有界な $\mathbb Q_p$ 値分布とは $\sup_{n,a}|\mu_n(a)|_p<\infty$ を満たす分布です。平行移動不変とは、任意の $t\in\mathbb Z_p$ と各 $n,a$ で $\mu_n(a+t)=\mu_n(a)$（添字は法 $p^n$）となることです。

<a id="prop-iwa13-no-haar-probability"></a>

<!-- formal-statement-start -->
> **命題（平行移動不変な有界Q_p値測度）**  
> $\mathbb Z_p$ の全ての平行移動で不変な有界 $\mathbb Q_p$ 値分布は零分布に限る。特に全質量 $1$ の平行移動不変な $\mathbb Z_p$ 値測度は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

平行移動不変性で同じ層の全剰余類の質量は等しくなります。全質量を $c$ とすればそれぞれ $c/p^n$ でなければならず、$c\ne0$ なら有界性に反します。

<!-- proof-start -->
### 証明

平行移動不変な分布 $\mu$ では第 $n$ 層の任意の剰余類が互いの平行移動で移り合うため、$\mu_n(a)$ は $a$ に依存しない値 $t_n$ です。$c=\mu_0(0)$ を全質量とすると、分布関係により $c=p^nt_n$、従って $t_n=c/p^n$。もし $c\ne0$ なら $|t_n|_p=|c|_pp^n$ が無限大へ向かい、有界性に矛盾します。従って $c=0$、よって全ての $t_n=0$ です。
<!-- proof-end -->

実数の Haar 確率測度の直感ではなく、**$p$ 進絶対値に関する有界性** がここで決定的です。

## 8. 演習と詳細解答

### Level A

<a id="ex-iwa13-a1"></a>

**A1. 点質量の第2層**
- Level: A
- ID: IWA13-A1

$p=3$、$\mu=\delta_0-\delta_1$ とする。第0、1、2層の重みを全て記し、分布関係と全質量を確かめよ。

<!-- solution-start -->
**詳細解答。** 第0層は $0$ しかないので $\mu_0(0)=1-1=0$。第1層は $(\mu_1(0),\mu_1(1),\mu_1(2))=(1,-1,0)$。第2層では $a=0$ に $1$、$a=1$ に $-1$、$a=2,\ldots,8$ に $0$ を置きます。第2層から第1層への和は、例えば $a=0$ で $\mu_2(0)+\mu_2(3)+\mu_2(6)=1$、$a=1$ で $\mu_2(1)+\mu_2(4)+\mu_2(7)=-1$、$a=2$ で全て零です。第1層から第0層へは $1-1+0=0$。従って全ての層で全質量は $0$ です。
<!-- solution-end -->

<a id="ex-iwa13-a2"></a>

**A2. 分布関係を一段先へ**
- Level: A
- ID: IWA13-A2

$\mu$ が $p$ 進分布であるとき、任意の $n$ について $\mu_n(a)=\sum_{b=0}^{p^2-1}\mu_{n+2}(a+bp^n)$ を証明せよ。

<!-- solution-start -->
**詳細解答。** まず定義で $\mu_n(a)=\sum_{c=0}^{p-1}\mu_{n+1}(a+cp^n)$。各項に分布関係を再度使って

$$
\mu_n(a)=\sum_{c=0}^{p-1}\sum_{d=0}^{p-1}
\mu_{n+2}(a+cp^n+dp^{n+1}).
$$

$b=c+dp$ と置くと $(c,d)$ と $0\le b<p^2$ は一対一に対応し、$cp^n+dp^{n+1}=bp^n$ なので所望の等式を得ます。
<!-- solution-end -->

<a id="ex-iwa13-a3"></a>

**A3. 積分で多項式を計算**
- Level: A
- ID: IWA13-A3

$p=3$、$\mu=\delta_0+2\delta_1-\delta_3$ とし、$\int1\,d\mu$、$\int x\,d\mu$、$\int x^2\,d\mu$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 点質量の積分は関数をその点で評価するので

$$
\int1\,d\mu=1+2-1=2,
$$

$$
\int x\,d\mu=0+2\cdot1-3=-1,
\qquad
\int x^2\,d\mu=0+2\cdot1-9=-7.
$$

全て $\mathbb Z_3$ に属します。第1層では $0$ と $3$ が同じ剰余類にあるため、有限和は最後の値にまだ一致しないことがありますが、第2層からは三点が分離し、整数代表元も $0,1,3$ そのものになるため、各多項式の積分値に一致します。
<!-- solution-end -->

<a id="ex-iwa13-a4"></a>

**A4. 畳み込みの移動**
- Level: A
- ID: IWA13-A4

$\delta_2*\delta_5$ および $(\delta_0-\delta_1)*\delta_2$ を測度として求め、その二項式変換を計算せよ。

<!-- solution-start -->
**詳細解答。** [畳み込みの整合性と積分公式](#prop-iwa13-convolution)より点質量の積は添字の和になるので

$$
\delta_2*\delta_5=\delta_7,\qquad
(\delta_0-\delta_1)*\delta_2=\delta_2-\delta_3.
$$

[二項式変換と岩澤代数の積](#thm-iwa13-amice-isomorphism)から前者は $(1+T)^7$、後者は

$$
(1-(1+T))(1+T)^2=-T(1+T)^2=-T-2T^2-T^3.
$$

直接 $\mathcal A_{\delta_2}-\mathcal A_{\delta_3}=(1+T)^2-(1+T)^3$ と計算しても同じです。
<!-- solution-end -->

<a id="ex-iwa13-a5"></a>

**A5. 二項式モーメント**
- Level: A
- ID: IWA13-A5

$\mu=2\delta_0-\delta_1+\delta_2$ とする。$j=0,1,2,3$ について $\int\binom{x}{j}\,d\mu$ を求め、$\mathcal A_\mu(T)$ を書け。

<!-- solution-start -->
**詳細解答。** 点 $0,1,2$ における二項係数を順に使います。$j=0$ では各点の値が $1$ なので $2-1+1=2$。$j=1$ では $0,-1,2$ を足して $1$。$j=2$ では $0,0,1$ を足して $1$。$j=3$ では三点とも $0$ で、さらに高い次数も零です。従って

$$
\mathcal A_\mu(T)=2+T+T^2.
$$

また $2-(1+T)+(1+T)^2=2+T+T^2$ と展開して同じ結果を検算できます。
<!-- solution-end -->

### Level B

<a id="ex-iwa13-b1"></a>

**B1. 積分の一意性を自力で再構成**
- Level: B
- ID: IWA13-B1

二つの [連続線形汎関数](../../../解析系/F0/F0-02C2/index.md#def-f0-02c2-continuous-linear-functional) $L_1,L_2:C(\mathbb Z_p,\mathbb Z_p)\to\mathbb Z_p$ が、全ての剰余類の指示関数で一致するとき、全ての連続関数で一致することを証明せよ。

<!-- solution-start -->
**詳細解答。** 任意の局所定数関数 $g$ はある $n$ について

$$
g=\sum_{a=0}^{p^n-1}g(a)\mathbf1_{a+p^n\mathbb Z_p}
$$

と書けるので、線形性から $L_1(g)=L_2(g)$ です。任意の連続 $f$ に対し第2節の $f_n$ を取れば $\|f_n-f\|_\infty\to0$ です。連続性から

$$
L_1(f)=\lim_nL_1(f_n)=\lim_nL_2(f_n)=L_2(f).
$$

一致を示すのに値を知るべき集合が、全関数ではなく剰余類の指示関数だけでよいことが核心です。
<!-- solution-end -->

<a id="ex-iwa13-b2"></a>

**B2. 有限位数の指標の値**
- Level: B
- ID: IWA13-B2

$p=3$ とし、$\mu=\delta_0+\delta_1+\delta_3$ とする。$\mathcal A_\mu(T)$ を展開せよ。さらに $\zeta^3=1$、$\zeta\ne1$ を満たす $\mathbb C_3$ の元 $\zeta$ を取り、$\kappa(x)=\zeta^{x\bmod3}$ の Mellin 変換を、有限和と代入の二通りで求めよ。

<!-- solution-start -->
**詳細解答。** 点質量の和なので

$$
\mathcal A_\mu(T)=1+(1+T)+(1+T)^3
=3+4T+3T^2+T^3.
$$

第1層では $\mu_1(0)=2$（$0,3$ が同じ剰余類）、$\mu_1(1)=1$、$\mu_1(2)=0$ なので、[有限指標評価式](#thm-iwa13-mellin-evaluation)から

$$
\mathscr M_\mu(\kappa)=2\kappa(0)+\kappa(1)=2+\zeta.
$$

一方 $\mathcal A_\mu(\zeta-1)=1+\zeta+\zeta^3=2+\zeta$ で一致します。$\zeta^3=1$ を使うのは有限位数という仮定に対応します。
<!-- solution-end -->

<a id="ex-iwa13-b3"></a>

**B3. 有界でない分布**
- Level: B
- ID: IWA13-B3

$\mu_n(a)=p^{-n}\in\mathbb Q_p$ とする。これが分布関係を満たすことを確かめ、対応する有限和が $C(\mathbb Z_p,\mathbb Q_p)$ 上の連続線形汎関数にならないことを証明せよ。

<!-- solution-start -->
**詳細解答。** 各親剰余類の $p$ 個の子の値の和は $p\cdot p^{-(n+1)}=p^{-n}=\mu_n(a)$ なので分布です。$g_n=\mathbf1_{p^n\mathbb Z_p}$ とすると $\|g_n\|_\infty=1$ ですが、その有限和の値は $I(g_n)=\mu_n(0)=p^{-n}$ で、$|I(g_n)|_p=p^n$ は有界ではありません。実数値の場合の [連続性と有界性の同値](../../../解析系/F0/F0-02C2/index.md#thm-f0-02c2-continuity-boundedness)を思い出します。ただしここでは $\mathbb Q_p$ 上なので、直接連続性に矛盾する列を作ります。$h_n=p^ng_n$ とすれば

$$
\|h_n\|_\infty=p^{-n}\to0,\qquad
I(h_n)=p^n I(g_n)=1.
$$

従って零での連続性と $\mathbb Q_p$ 線形性を同時に満たす延長は存在しません。
<!-- solution-end -->

<a id="ex-iwa13-b4"></a>

**B4. 畳み込みと評価の積の仕組み**
- Level: B
- ID: IWA13-B4

$\mu,\nu$ を $\mathbb Z_p$ 値測度とし、$\kappa$ を連続指標とする。局所定数関数の場合から始めて $\int\kappa\,d(\mu*\nu)=\bigl(\int\kappa\,d\mu\bigr)\bigl(\int\kappa\,d\nu\bigr)$ を導き、$\kappa$ が群準同型でなければ同じ計算が成り立たない理由を述べよ。

<!-- solution-start -->
**詳細解答。** まず $\kappa$ が法 $p^n$ を通る場合は、[測度の畳み込み](#def-iwa13-convolution)の定義から

$$
\sum_{a}\kappa(a)(\mu*\nu)_n(a)
=\sum_{b,c}\kappa(b+c)\mu_n(b)\nu_n(c)
=\sum_{b,c}\kappa(b)\kappa(c)\mu_n(b)\nu_n(c).
$$

最後の二重和は有限和の分配法則で $\bigl(\sum_b\kappa(b)\mu_n(b)\bigr)\bigl(\sum_c\kappa(c)\nu_n(c)\bigr)$ です。一般の連続指標は有限商を通るとは限らないので、ここで「各近似も指標」とは置けません。代わりに [畳み込みの整合性と積分公式](#prop-iwa13-convolution)を連続関数 $f(z)=\kappa(z)$ に適用します。これは局所定数近似の有限二重和から一様極限で証明済みです。その右辺で $\kappa(x+y)=\kappa(x)\kappa(y)$ を使うと

$$
\int\!\left(\int \kappa(x+y)\,d\nu(y)\right)d\mu(x)
=\int\kappa(x)\,\mathscr M_\nu(\kappa)\,d\mu(x)
=\mathscr M_\mu(\kappa)\mathscr M_\nu(\kappa).
$$

単なる連続関数 $f$ では $f(x+y)=f(x)f(y)$ が一般に成り立たず、二重積分を積へ分離する等号が崩れます。
<!-- solution-end -->

### Level C

<a id="ex-iwa13-c1"></a>

**C1. 測度・環・指標の三つの計算を一致させる**
- Level: C
- ID: IWA13-C1

$p=3$、$\mu=\delta_0-\delta_1$、$\nu=\delta_0+\delta_1$ とする。次の四つを確かめよ。

1. 第1層の畳み込みを直接求める。
2. $\mu*\nu$ の全質量と $\int x^2\,d(\mu*\nu)$ を求める。
3. 二項式変換を三つ計算し、乗法性を確かめる。
4. $\zeta^3=1$ のもと $\kappa(x)=\zeta^{x\bmod3}$ としたとき、Mellin 変換の乗法性を有限和から確かめる。

<!-- solution-start -->
**詳細解答。**

(1) 第1層の係数列は $\mu_1=(1,-1,0)$、$\nu_1=(1,1,0)$ です。和が $a\bmod3$ になる組を列挙すると、$a=0$ は $(0,0),(1,2),(2,1)$ から $1$、$a=1$ は $(0,1),(1,0),(2,2)$ から $1-1=0$、$a=2$ は $(0,2),(1,1),(2,0)$ から $-1$ となります。従って $(\mu*\nu)_1=(1,0,-1)$。全層で計算すれば [点質量の畳み込み](#prop-iwa13-convolution)から

$$
\mu*\nu=(\delta_0-\delta_1)*(\delta_0+\delta_1)
=\delta_0+\delta_1-\delta_1-\delta_2
=\delta_0-\delta_2.
$$

(2) 全質量は $1-1=0$ です。[p進積分](#def-iwa13-integral)を点質量に適用して

$$
\int x^2\,d(\mu*\nu)=0^2-2^2=-4.
$$

(3) [二項式変換と岩澤代数の積](#thm-iwa13-amice-isomorphism)より

$$
\mathcal A_\mu(T)=1-(1+T)=-T,\qquad
\mathcal A_\nu(T)=1+(1+T)=2+T,
$$

$$
\mathcal A_{\mu*\nu}(T)=1-(1+T)^2=-2T-T^2.
$$

積を取ると $(-T)(2+T)=-2T-T^2$ で一致します。$T^0$ 係数は全質量 $0$ とも一致します。

(4) $\kappa(0)=1,\ \kappa(1)=\zeta,\ \kappa(2)=\zeta^2$ なので、第1層の有限和で

$$
\mathscr M_\mu(\kappa)=1-\zeta,\qquad
\mathscr M_\nu(\kappa)=1+\zeta,\qquad
\mathscr M_{\mu*\nu}(\kappa)=1-\zeta^2.
$$

$(1-\zeta)(1+\zeta)=1-\zeta^2$ で乗法性を確認しました。これは第4節の環の積が第6節の指標評価では数の積に変わることを、一つの例で検算したものです。
<!-- solution-end -->

## 9. 到達点と次講

剰余類への整合した重みから積分を構成し、測度と連続線形汎関数を対応させました。畳み込みの環は完備群環であり、$\gamma-1=T$ の座標では二項式変換の冪級数環になります。連続指標での評価はこの冪級数の $T=u-1$ への代入です。

次の **IWA14「Kummer合同とBernoulli数」** では、算術的に与えられた特殊値がこのような連続な $p$ 進測度（またはその適切な変種）を生むために、どの合同条件が必要かを学びます。
