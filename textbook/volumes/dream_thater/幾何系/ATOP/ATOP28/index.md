# ATOP28 コチェインと特異コホモロジー

これまでは、道や面を足し合わせた鎖を作り、境界が消える鎖を調べてきました。今度は鎖に値を割り当てる側に回ります。例えば道に整数を割り当て、三角形の三辺を向き付きで一周した値が零になるようにします。この条件を満たす割当てを調べると、鎖の側とは逆向きの写像が現れ、後に積や多様体の双対性を扱う道具になります。

## 1. 鎖を評価する写像

位相空間 $X$ の [特異鎖群](../ATOP16/index.md#def-atop16-singular-chains) を $C_n(X)$ とします。これは特異 $n$ 単体を基底とする自由アーベル群です。

係数群 $G$ は加法で書く任意のアーベル群とし、整数倍は加法の反復で定めます。$\operatorname{Hom}_{\mathbb Z}(M,G)$ はアーベル群 $M$ から $G$ への準同型全体で、点ごとの加法を持つ群です。

鎖は有限和ですが、鎖を評価する準同型は全ての基底単体に自由に値を指定できます。指定する単体の個数に有限性を課す必要はありません。

<a id="def-atop28-cochain"></a>

<!-- formal-statement-start -->
> **定義（特異コチェイン）**
> 位相空間 $X$、アーベル群 $G$、整数 $n\ge0$ に対し、$G$ 係数の特異 $n$ コチェインとは準同型 $C_n(X)\to G$ である。その全体を

$$
C^n(X;G)=\operatorname{Hom}_{\mathbb Z}(C_n(X),G)
$$

> とする。負次数では $C^n(X;G)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop28-cochain -->
**定義の確認**：$X=[0,1]$、$G=\mathbb Z$ とします。0単体は点と同一視できるので、各点 $x$ に $\phi(x)=1$ ($x=1$ のとき)、それ以外に0を割り当てます。鎖 $c=\sum_i a_i[x_i]$ に対して

$$
\phi(c)=\sum_i a_i\phi(x_i)
$$

と延長します。基底表示の一意性と有限性により値は一意です。二つの鎖の係数を足すと評価も足されるため、$\phi(c+d)=\phi(c)+\phi(d)$ です。例えば $\phi(3[1]-2[0])=3$。従って $\phi$ は0コチェインです。
<!-- definition-example-end -->

無限個の点からなる空間では、0コチェインは任意の関数 $X\to G$ に対応します。この関数自体に連続性を要求しません。

### 余境界は次数を上げる

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) $\partial_{n+1}$ は $C_{n+1}(X)$ から $C_n(X)$ への写像です。その後に $\phi$ を作用させれば、今度は $n+1$ 次の鎖を評価できます。このように境界を前から合成した写像を余境界と呼びます。

<a id="def-atop28-coboundary"></a>

<!-- formal-statement-start -->
> **定義（特異余境界作用素）**
> 位相空間 $X$ とアーベル群 $G$ に対し、余境界 $\delta^n:C^n(X;G)\to C^{n+1}(X;G)$ を、$\phi\in C^n(X;G)$ と $c\in C_{n+1}(X)$ について

$$
(\delta^n\phi)(c)=\phi(\partial_{n+1}c)
$$

> と定める。負次数からの写像は零写像とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop28-coboundary -->
**定義の確認**：先ほどの $\phi$ と、点0から点1へ進む特異1単体 $\gamma$ を取ります。境界は $\partial_1\gamma=[1]-[0]$ なので

$$
(\delta^0\phi)(\gamma)=\phi([1])-\phi([0])=1.
$$

一般に境界と $\phi$ はともに加法的だから、その合成も加法的です。従ってこれは1コチェインであり、入力する鎖の次数が1増えています。
<!-- definition-example-end -->

続けて二度余境界を取ると、鎖の側で境界を二度取ることになります。[特異鎖の二重境界の消滅](../ATOP16/index.md#thm-atop16-singular-boundary-square) を用い、任意の $c\in C_{n+2}(X)$ について

$$
(\delta^{n+1}\delta^n\phi)(c)
=\phi(\partial_{n+1}\partial_{n+2}c)=0
$$

となります。従って $\delta^{n+1}\delta^n=0$ です。このような次数を上げる準同型の列をコチェイン複体と呼びます。鎖複体との向きを並べると

$$
C_{n+1}(X)\xrightarrow{\partial_{n+1}} C_n(X),
\qquad
C^{n+1}(X;G)\xleftarrow{\delta^n} C^n(X;G)
$$

です。左から右に進む境界を、評価写像の合成によって反転させています。

## 2. 余境界で消える評価

三角形の辺を評価してその合計が零になるという条件は、1コチェイン $\phi$ に対する $\delta^1\phi=0$ です。このような評価をコサイクルと呼びます。一方、点の値の差を辺の値として得られるような評価は、0コチェインの余境界です。この余境界から来るものをコバウンダリ（余境界コチェイン）と呼び、区別したいのはそれらを除いた評価です。

<a id="def-atop28-cohomology"></a>

<!-- formal-statement-start -->
> **定義（特異コホモロジー群）**
> 位相空間 $X$ とアーベル群 $G$ に対し、各 $n\ge0$ でコサイクル群 $Z^n$、コバウンダリ群 $B^n$ を

$$
Z^n(X;G)=\ker\delta^n,\qquad
B^n(X;G)=\operatorname{im}\delta^{n-1}
$$

> とし、特異コホモロジー群を

$$
H^n(X;G)=Z^n(X;G)/B^n(X;G)
$$

> と定める。負次数の群は零とする。
<!-- formal-statement-end -->

二重余境界が零なので $B^n\subset Z^n$ であり、この商は定義できます。$\phi$ と $\psi$ が同じ類を表す条件は、ある $(n-1)$ コチェイン $\eta$ について $\phi-\psi=\delta^{n-1}\eta$ となることです。

<!-- definition-example-start: def-atop28-cohomology -->
**定義の確認**：一点空間 $P$ には各次数でただ一つの特異単体 $s_n$ があり、$C_n(P)=\mathbb Zs_n$ です。$n\ge1$ なら全ての面は $s_{n-1}$ なので

$$
\partial_n s_n=
\left(\sum_{i=0}^n(-1)^i\right)s_{n-1}.
$$

$n$ が奇数なら交代和は0、正の偶数なら1です。評価 $\phi\mapsto\phi(s_n)$ により $C^n(P;G)$ は $G$ と同型です。$\delta^n$ は $n+1$ が奇数なら零、偶数なら恒等写像に対応します。

従って0次では核が $G$、前からの像が0です。正の奇数次では核が0、正の偶数次では核と前からの像がともに $G$ です。よって

$$
H^0(P;G)=G,\qquad H^n(P;G)=0\quad(n>0).
$$
<!-- definition-example-end -->

一般の0次でも $B^0=0$ です。0コチェインがコサイクルとなる条件は、任意の道 $\gamma$ について

$$
0=(\delta^0\phi)(\gamma)=\phi(\gamma(1))-\phi(\gamma(0))
$$

が成り立つことです。これは各道連結成分上で一定であることと同値です。道連結成分の集合を $I$ とすると、各成分の値を自由に選べるので $H^0(X;G)\cong\prod_{i\in I}G$ です。成分が無限個なら直和でなく直積になります。空間が空なら零群です。

## 3. 写像に沿って評価を引き戻す

写像 $f:X\to Y$ が連続なら、[特異鎖の誘導準同型](../ATOP16/index.md#def-atop16-induced-chain-map) $f_\#:C_n(X)\to C_n(Y)$ が定まります。$Y$ 上の評価を $X$ の鎖へ適用するには、先に $f_\#$ で鎖を送ればよいのです。この操作を引戻しと呼びます。

<a id="thm-atop28-pullback"></a>

<!-- formal-statement-start -->
> **定理（特異コホモロジーの誘導準同型）**
> 連続写像 $f:X\to Y$ とアーベル群 $G$ に対し、引戻し $f^\#\phi=\phi\circ f_\#$ は余境界と可換であり、準同型

$$
f^*:H^n(Y;G)\to H^n(X;G),\qquad
f^*[\phi]=[f^\#\phi]
$$

> を誘導する。恒等写像の誘導は恒等写像であり、連続写像 $g:Y\to W$ に対して $(g\circ f)^*=f^*\circ g^*$ が成り立つ。
<!-- formal-statement-end -->

写像の順序が逆になる性質を反変性と呼びます。鎖を移動させてから評価するため、元の写像と逆向きに評価が移動します。

<!-- proof-start -->
### 証明

[特異鎖の誘導準同型と境界の可換性](../ATOP16/index.md#thm-atop16-chain-map) により、任意の $(n+1)$ 鎖 $c$ について

$$
(\delta f^\#\phi)(c)=\phi(f_\#\partial c)
=\phi(\partial f_\#c)=(f^\#\delta\phi)(c).
$$

従ってコサイクルはコサイクルへ、$\delta\eta$ は $\delta f^\#\eta$ へ送られます。代表元を余境界だけ変更しても誘導される類は変わりません。引戻しは加法的なので商上でも準同型です。恒等写像では前から合成する鎖写像が恒等写像です。合成について任意の鎖 $c$ に対し

$$
((g\circ f)^\#\phi)(c)
=\phi(g_\#f_\#c)
=(f^\#g^\#\phi)(c)
$$

となり、商上でも等式が成り立ちます。
<!-- proof-end -->

例えば二点離散空間 $X=\{a,b\}$ から一点空間 $P$ への写像は、0次で $G\to G\times G$、$u\mapsto(u,u)$ を誘導します。二点を一点へ送る写像が、評価を一点から二点へ複製します。

連続変形で結ばれた写像の引戻しは、コホモロジーでも一致します。ここではホモロジー群上の一致を使うのではなく、鎖上の等式から直接導きます。

<a id="thm-atop28-homotopy"></a>

<!-- formal-statement-start -->
> **定理（特異コホモロジーのホモトピー不変性）**
> ホモトピックな連続写像 $f_0,f_1:X\to Y$ と任意のアーベル群 $G$ に対し、全次数で $f_0^*=f_1^*$ が成り立つ。特にホモトピー同値な空間の特異コホモロジー群は同型である。
<!-- formal-statement-end -->

鍵は鎖の次数を上げるプリズム作用素を評価の側から使うと、コチェインの次数が下がることです。

<!-- proof-start -->
### 証明

[プリズム恒等式](../ATOP17/index.md#thm-atop17-prism-identity) により $P_n:C_n(X)\to C_{n+1}(Y)$ が存在し、

$$
(f_1)_\#-(f_0)_\#=\partial P_n+P_{n-1}\partial
$$

が成り立ちます。$P_{-1}=0$ とします。$n$ コチェイン $\phi$ に対して $K^n\phi=\phi\circ P_{n-1}$ と置きます。$K^0=0$ です。任意の $n$ 鎖 $c$ について

$$
(\delta K^n\phi)(c)=\phi(P_{n-1}\partial c),\qquad
(K^{n+1}\delta\phi)(c)=\phi(\partial P_n c).
$$

従って $f_1^\#-f_0^\#=\delta K+K\delta$ です。$\delta\phi=0$ なら引戻しの差は $\delta K\phi$ となるので、商上の類は一致します。ホモトピー同値を与える二写像の合成はそれぞれ恒等写像とホモトピックです。[誘導準同型の合成則](#thm-atop28-pullback) と今の一致により、互いの誘導準同型が逆写像となります。
<!-- proof-end -->

従って空でない可縮空間は一点とホモトピー同値なので、先ほどの一点の計算がそのまま使えます。区間の正次数の群は全て零です。

## 4. 部分空間上で零となる評価

[空間の対](../ATOP18/index.md#def-atop18-pair) $(X,A)$ を考えます。$A$ の中の鎖は無視し、$X$ に付け加えられた部分を評価したいとします。そのためには $A$ 上の鎖を全て零に送るコチェインを使います。

<a id="def-atop28-relative-cohomology"></a>

<!-- formal-statement-start -->
> **定義（相対特異コホモロジー群）**
> 位相空間 $X$、部分空間 $A\subset X$、アーベル群 $G$ に対し、相対コチェイン群を

$$
C^n(X,A;G)=\operatorname{Hom}_{\mathbb Z}(C_n(X)/C_n(A),G)
$$

> とする。相対鎖の境界から定める余境界の核と一つ前の余境界の像の商を $H^n(X,A;G)$ とする。
<!-- formal-statement-end -->

[相対特異鎖群](../ATOP18/index.md#def-atop18-relative-chain) の商写像を $q$ とします。準同型 $\bar\phi$ を $\bar\phi q$ に送ると、$A$ 上で零になるコチェインが得られます。

逆に $\phi$ が $C_n(A)$ 上で零なら、商上の評価を

$$
\bar\phi(c+C_n(A))=\phi(c)
$$

と定められます。代表元の差が $C_n(A)$ に入ると評価の差は零なので良定義です。これらは互いに逆です。

以下では相対コチェインをこの部分群と同一視します。$A$ の鎖の境界は $A$ の鎖だから余境界も相対コチェインを保ちます。

<!-- definition-example-start: def-atop28-relative-cohomology -->
**定義の確認**：二点離散空間 $X=\{a,b\}$、$A=\{a\}$ とします。0コチェインで $a$ に0、$b$ に $u\in G$ を割り当てたものは $A$ 上の鎖を零に送ります。

任意の道は定数道なので両端の値の差は0です。従って相対0コチェインは全てコサイクルです。負次数の群は零だから $H^0(X,A;G)\cong G$ です。
<!-- definition-example-end -->

### 部分空間への制限

相対コチェインの包含を $j$、$A$ への制限を $r$ とします。各次数で次の [短完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-short-exact) が得られます。

$$
0\to C^n(X,A;G)\xrightarrow{j}C^n(X;G)
\xrightarrow{r}C^n(A;G)\to0.
$$

$j$ は包含だから単射であり、制限が零になる条件は相対コチェインの条件そのものです。

最後の全射性には特異鎖の自由基底を使います。$A$ の特異単体は $X$ の特異単体の部分集合とみなせるので、$A$ 内の単体には元の評価を与え、それ以外の単体には零を与えて線形に延長できます。この延長の制限は元の評価です。$G$ が体でなくても成立することが重要です。ただし延長は余境界と可換とは限りません。そこから次の接続準同型が現れます。

<a id="thm-atop28-relative-exact"></a>

<!-- formal-statement-start -->
> **定理（対のコホモロジー長完全列）**
> 任意の空間の対 $(X,A)$ とアーベル群 $G$ に対し、包含 $j$ と制限 $r$ の誘導準同型、および接続準同型 $D$ による次の列は完全である。

$$
\cdots\to H^n(X,A;G)\xrightarrow{j^*}H^n(X;G)
\xrightarrow{r^*}H^n(A;G)
$$

$$
\xrightarrow{D}H^{n+1}(X,A;G)\xrightarrow{j^*}
H^{n+1}(X;G)\to\cdots.
$$

> ここで $D[\alpha]=[\delta\widetilde\alpha]$ とし、$\widetilde\alpha$ は $A$ 上のコサイクル $\alpha$ の $X$ への任意のコチェイン延長である。対の連続写像についてこの列は自然である（誘導写像と各矢印が可換である）。
<!-- formal-statement-end -->

[完全列](../../../基礎論系/CATB/CATB1-05/index.md#def-catb1-05-exact) とは各位置で直前の写像の像が直後の写像の核に一致することです。[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) では接続写像は次数を下げましたが、ここでは延長して余境界を取るため次数が上がります。$j^*,r^*$ はコチェイン包含と制限から得る記号であり、$j$ 自体を空間の写像とみなしているわけではありません。

<!-- proof-start -->
### 証明

係数群を記号から省きます。制限は境界を取る鎖の包含と可換なので、$r\delta=\delta r$ です。$j$ も余境界と可換です。従って両写像はコサイクルとコバウンダリを保ち、商に誘導されます。

まず $D$ を構成します。$\alpha$ を $A$ 上の $n$ コサイクルとし、短完全列の全射性から $\widetilde\alpha$ を取ります。すると

$$
r\delta\widetilde\alpha=\delta\alpha=0,\qquad
\delta\delta\widetilde\alpha=0.
$$

従って $\delta\widetilde\alpha$ は相対 $(n+1)$ コサイクルです。延長を $\widetilde\alpha'$ に変えると差 $\widetilde\alpha'-\widetilde\alpha$ は相対コチェインなので、余境界の差は相対コバウンダリです。

さらに代表元を $\alpha'=\alpha+\delta\beta$ に変えたとき、$\beta$ の延長 $\widetilde\beta$ を取り、$\widetilde\alpha+\delta\widetilde\beta$ を新代表元の延長にできます。その余境界は $\delta\widetilde\alpha$ と一致します。負次数の $\beta$ は零で扱えます。よって $D$ は良定義であり、和の延長に延長の和を選べば加法性も従います。

次に三種類の位置を確認します。

**$H^n(X)$ での完全性**：相対コサイクルの制限は零です。逆に $r^*[\phi]=0$ なら $r\phi=\delta\beta$ となる $\beta$ が $A$ 上に存在します。延長 $\widetilde\beta$ を選べば

$$
\phi'=\phi-\delta\widetilde\beta,\qquad
r\phi'=r\phi-\delta\beta=0.
$$

また $\delta\phi'=0$ です。従って $\phi'$ は相対コサイクルで、$j^*[\phi']=[\phi]$ です。

**$H^n(A)$ での完全性**：$X$ 上のコサイクルの制限はそれ自体を延長に選べるので $D$ で零になります。逆に $D[\alpha]=0$ なら相対 $n$ コチェイン $\eta$ が存在して $\delta\widetilde\alpha=\delta\eta$ です。$\phi=\widetilde\alpha-\eta$ と置くと $\delta\phi=0$、$r\phi=\alpha$ です。よって $r^*[\phi]=[\alpha]$ です。

**$H^{n+1}(X,A)$ での完全性**：$D[\alpha]$ を $X$ 上で見ると $\delta\widetilde\alpha$ はコバウンダリなので $j^*D=0$ です。逆に相対コサイクル $\psi$ が $j^*[\psi]=0$ を満たすなら、$X$ 上の $n$ コチェイン $\phi$ について $\psi=\delta\phi$ です。$\alpha=r\phi$ と置くと

$$
\delta\alpha=r\delta\phi=r\psi=0.
$$

$\phi$ を $\alpha$ の延長とすれば $D[\alpha]=[\psi]$ です。以上で全位置の完全性を得ます。負次数の群が零であるため、最初の $H^0(X,A)$ の単射性も従います（そこで $j^*[\psi]=0$ なら $\psi=\delta 0=0$）。

最後に対の写像 $f:(X,A)\to(Y,B)$ を取ります。これは $f(A)\subset B$ を満たす連続写像です。$B$ 上で零となる評価は $f^\#$ によって $A$ 上で零になるので相対群にも引戻しが定まります。

制限と包含はこの引戻しと可換です。$B$ 上のコサイクル $\alpha$ の延長 $\widetilde\alpha$ に対し、$f^\#\widetilde\alpha$ は $(f|_A)^\#\alpha$ の延長です。[誘導準同型の余境界との可換性](#thm-atop28-pullback) により

$$
D(f|_A)^*[\alpha]=[\delta f^\#\widetilde\alpha]
=[f^\#\delta\widetilde\alpha]=f^*D[\alpha].
$$

これで自然性も示されました。
<!-- proof-end -->

### 区間の両端を相対化する

$I=[0,1]$、$A=\{0,1\}$ とします。一点の計算と [ホモトピー不変性](#thm-atop28-homotopy) から $H^0(I;G)=G$、$H^1(I;G)=0$ です。

$H^0(A;G)=G\times G$ です。[対のコホモロジー長完全列](#thm-atop28-relative-exact) の該当部分は

$$
0\to H^0(I,A;G)\to G
\xrightarrow{u\mapsto(u,u)}G\times G
\xrightarrow{D}H^1(I,A;G)\to0.
$$

対角写像は単射なので $H^0(I,A;G)=0$ です。差を取る準同型 $(u,v)\mapsto v-u$ は全射で、核が対角部分群です。従って $H^1(I,A;G)\cong G$ です。

接続写像の具体的な符号も調べられます。両端に $u,v$ を与える評価を任意に内部へ延長し、端点を結ぶ特異1単体 $\gamma(t)=t$ に余境界を評価すると

$$
(\delta\widetilde\alpha)(\gamma)=v-u.
$$

延長の内部での選び方はこの値に影響しません。

## 5. ホモロジーへの評価と係数の違い

コサイクルは境界鎖に対して零を返します。さらにコバウンダリはサイクルに対して零を返します。従って鎖とコチェインの評価は、両者の商の間の評価になります。ここで $H_n(X)$ は整数係数の [特異ホモロジー群](../ATOP16/index.md#def-atop16-singular-homology) です。

<a id="prop-atop28-evaluation"></a>

<!-- formal-statement-start -->
> **命題（ホモロジー類への評価）**
> 位相空間 $X$、アーベル群 $G$、$n\ge0$ に対し、次の準同型が良定義である。

$$
E:H^n(X;G)\to\operatorname{Hom}_{\mathbb Z}(H_n(X),G),
\qquad E([\phi])([z])=\phi(z).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

サイクル $z$ を $z+\partial c$ に変えても、コサイクル条件から $\phi(\partial c)=(\delta\phi)(c)=0$ です。コサイクルを $\phi+\delta\eta$ に変えても、$(\delta\eta)(z)=\eta(\partial z)=0$ です。従って双方の代表元によらず、評価の加法性から二つの引数それぞれについて加法的です。
<!-- proof-end -->

この写像がいつ同型かを調べます。体 $K$ 係数の場合は、整数鎖の基底と同じ特異単体を基底とする $K$ ベクトル空間 $C_n(X;K)$ を作り、境界を $K$ 線形に延長します。ホモロジー $H_n(X;K)$ はその境界の核を像で割ったものです。

$G$ を $K$ の加法群にすると、整数鎖上の評価は基底単体の値を指定して $K$ 線形に延長できるため、$C^n(X;K)$ は $\operatorname{Hom}_K(C_n(X;K),K)$ と同一視できます。

<a id="thm-atop28-field-duality"></a>

<!-- formal-statement-start -->
> **定理（体係数の評価同型）**
> 任意の体 $K$ と位相空間 $X$ に対し、全ての $n\ge0$ で評価は同型

$$
H^n(X;K)\cong\operatorname{Hom}_K(H_n(X;K),K)
$$

> を与える。有限次元性は仮定しない。
<!-- formal-statement-end -->

鍵は、ベクトル部分空間上の線形汎関数（体に値を取る線形写像）を全空間へ延長できることです。整数係数の部分群ではこの延長が失敗することがあります。

<!-- proof-start -->
### 証明

$K$ 係数の鎖について $Z_n=\ker\partial_n$、$B_n=\operatorname{im}\partial_{n+1}$ と置きます。[ホモロジー類への評価](#prop-atop28-evaluation) と同じ代表元の計算は $K$ 線形でも有効です。

全射性を示します。$\ell:H_n(X;K)\to K$ を線形写像とすると、商写像との合成 $\lambda:Z_n\to K$ は $B_n$ 上で零です。

$Z_n$ の基底を $C_n(X;K)$ の基底へ拡張し、追加基底で零と定めて $\lambda$ を $\phi$ に延長します（無限次元の場合は選択公理に基づく基底拡張を用います）。すると任意の $c\in C_{n+1}(X;K)$ について

$$
(\delta\phi)(c)=\phi(\partial c)=\lambda(\partial c)=0.
$$

従って $\phi$ はコサイクルであり、その評価は $\ell$ です。

単射性を示します。$E([\phi])=0$ なら $\phi(z)=0$ が全ての $z\in Z_n$ について成り立ちます。$n=0$ の場合は $Z_0=C_0$ なので $\phi=0$ です。$n>0$ では $B_{n-1}$ 上の写像を

$$
\theta(\partial_n c)=\phi(c)
$$

と定めます。$\partial_n c=\partial_n c'$ なら $c-c'\in Z_n$ なので $\phi(c)=\phi(c')$ です。よって良定義で、境界と評価の線形性から線形写像です。再び基底拡張で $\theta$ を $C_{n-1}(X;K)$ 上の $\eta$ に延長すれば

$$
(\delta\eta)(c)=\eta(\partial_n c)
=\theta(\partial_n c)=\phi(c).
$$

従って $\phi$ はコバウンダリであり、$[\phi]=0$ です。以上から同型が得られます。
<!-- proof-end -->

### 整数係数では何が壊れるか

具体的な代数模型として、2次と1次に $\mathbb Z$ を持ち、他の次数が零で、境界 $\partial_2$ が2倍写像である鎖複体を考えます。この模型を特異鎖複体そのものと同一視する必要はありません。

$$
0\to\mathbb Z\xrightarrow{\times2}\mathbb Z\to0.
$$

2倍写像は単射なので $H_2=0$、1次の境界は $2\mathbb Z$ なので $H_1=\mathbb Z/2\mathbb Z$ です。

整数への評価を取ると、余境界 $\delta^1$ も2倍写像です。従って $H^1=0$、$H^2=\mathbb Z/2\mathbb Z$ になります。特に2次の評価写像は非零群から $\operatorname{Hom}_{\mathbb Z}(0,\mathbb Z)=0$ への写像で、単射ではありません。

失敗箇所は明示できます。2次のコサイクル $\phi$ を $\phi(1)=1$ とし、単射性の証明での $\theta$ を $2\mathbb Z$ 上に作ると $\theta(2)=1$ です。整数への準同型 $\eta:\mathbb Z\to\mathbb Z$ に延長できるなら、$\eta(2)=2\eta(1)=1$ となり矛盾します。

同じ行列を $\mathbb Q$ 上に移せば2倍は可逆で、両次数のホモロジーとコホモロジーは零です。$\mathbb F_2=\mathbb Z/2\mathbb Z$ 上では2倍は零で、両次数の両群が $\mathbb F_2$ になります。整数係数における評価の核などを組織的に記述する道具は次講で扱います。

## 6. 演習

### 演習 ATOP28-A1：鎖の評価

- Level: A

$X=[0,1]$、$G=\mathbb Z$ とする。0コチェイン $\phi$ を $\phi([x])=2$ ($x=1$)、その他は0として定める。$c=3[0]-4[1]$ の評価と、$0$ から $1$ への特異1単体 $\gamma$ および逆向きの道 $\bar\gamma$ に対する $\delta^0\phi$ の評価を求めよ。

<!-- solution-start -->
**詳細解答**

[特異コチェイン](#def-atop28-cochain) の加法性から $\phi(c)=3\cdot0-4\cdot2=-8$ です。[特異余境界作用素](#def-atop28-coboundary) の定義により

$$
(\delta^0\phi)(\gamma)=\phi([1]-[0])=2,
\qquad
(\delta^0\phi)(\bar\gamma)=\phi([0]-[1])=-2.
$$

道の向きを反転すると端点の差の符号が変わります。
<!-- solution-end -->

### 演習 ATOP28-A2：一点の正次数

- Level: A

一点空間 $P$ について $G=\mathbb Z/3\mathbb Z$ とする。$C^1,C^2,C^3$ と $\delta^0,\delta^1,\delta^2,\delta^3$ を求め、$H^1,H^2,H^3$ を計算せよ。

<!-- solution-start -->
**詳細解答**

各次数に単体が一つだけ存在するので、全ての $C^n$ は $G$ です。境界の交代和は次数1,2,3,4で順に $0,1,0,1$ です。従って余境界は順に $0,\operatorname{id},0,\operatorname{id}$ です。[特異コホモロジー群](#def-atop28-cohomology) の定義から

$$
H^1=0/0=0,\quad H^2=G/G=0,\quad H^3=0/0=0.
$$
<!-- solution-end -->

### 演習 ATOP28-A3：逆向きの写像

- Level: A

離散空間 $X=\{a,b,c\}$、$Y=\{p,q\}$ に対し $f(a)=f(b)=p,f(c)=q$ とする。$G=\mathbb Z$ の0次の $f^*$ を座標で書き、単射か全射かを判定せよ。

<!-- solution-start -->
**詳細解答**

離散空間の道は定数道なので、全ての0コチェインはコサイクルです。0次のコバウンダリは零です。[特異コホモロジーの誘導準同型](#thm-atop28-pullback) による引戻しは

$$
f^*:\mathbb Z^2\to\mathbb Z^3,\qquad
(u,v)\mapsto(u,u,v).
$$

像が零なら第1,3座標から $u=v=0$ なので単射です。第1,2座標が常に等しいため $(1,0,0)$ は像に入らず、全射ではありません。
<!-- solution-end -->

### 演習 ATOP28-A4：相対0次

- Level: A

三点離散空間 $X=\{a,b,c\}$、$A=\{a,c\}$、任意のアーベル群 $G$ について $H^0(X,A;G)$ を求めよ。

<!-- solution-start -->
**詳細解答**

[相対特異コホモロジー群](#def-atop28-relative-cohomology) では $A$ 上で零の評価だけを許します。従って0コチェインは $(0,u,0)$ ($u\in G$) です。道は定数道なので余境界は全て零です。負次数の群も零なので、商はそのまま $H^0(X,A;G)\cong G$ となります。
<!-- solution-end -->

### 演習 ATOP28-B1：同じコホモロジー類

- Level: B

任意の空間 $X$ と係数群 $G$ について、1コチェイン $\phi$ がコサイクルであり、$\eta$ が0コチェインとする。$\psi=\phi+\delta^0\eta$ がコサイクルで、全ての1サイクルに対して $\psi$ と $\phi$ の評価が一致することを示せ。

<!-- solution-start -->
**詳細解答**

任意の2鎖 $c$ に対し

$$
(\delta^1\psi)(c)=(\delta^1\phi)(c)
+\eta(\partial_1\partial_2c)=0.
$$

第一項はコサイクル条件、第二項は [二重境界の消滅](../ATOP16/index.md#thm-atop16-singular-boundary-square) によります。任意の1サイクル $z$ について

$$
\psi(z)-\phi(z)=\eta(\partial_1 z)=\eta(0)=0.
$$

差はコバウンダリなので [特異コホモロジー群](#def-atop28-cohomology) でも同じ類です。
<!-- solution-end -->

### 演習 ATOP28-B2：可縮性と引戻し

- Level: B

$I=[0,1]$ の恒等写像と定数写像 $c:I\to I,\ c(t)=0$ の誘導準同型が一致することを、ホモトピーを明示して示せ。その事実から $H^n(I;G)$ を全次数で求めよ。

<!-- solution-start -->
**詳細解答**

連続写像 $F:I\times I\to I$ を

$$
F(t,s)=(1-s)t
$$

と定めると、$F(t,0)=t$、$F(t,1)=0$ です。[特異コホモロジーのホモトピー不変性](#thm-atop28-homotopy) から $\operatorname{id}^*=c^*$ です。

一点空間 $P$ への写像 $p:I\to P$ と点0の包含 $i:P\to I$ について $c=i\circ p$ です。[合成則](#thm-atop28-pullback) から

$$
c^*=p^*i^*
$$

となり、$n>0$ では $H^n(P;G)=0$ を経由するので零です。恒等写像が零になる群は零群です。

0次では区間内の任意の二点を道で結べるので、コサイクルは定数評価であり $H^0(I;G)=G$ です。
<!-- solution-end -->

### 演習 ATOP28-B3：接続写像と端点交換

- Level: B

$I=[0,1]$、$A=\{0,1\}$、$G=\mathbb Z$ とする。$D[(3,-2)]$ を端点間の道に評価せよ。さらに反転 $f(t)=1-t$ が $H^1(I,A;\mathbb Z)$ に誘導する写像を求めよ。

<!-- solution-start -->
**詳細解答**

[対のコホモロジー長完全列](#thm-atop28-relative-exact) では $D$ の代表元は $\delta\widetilde\alpha$ です。$\gamma(t)=t$ として

$$
(\delta\widetilde\alpha)(\gamma)
=\alpha(1)-\alpha(0)=-2-3=-5.
$$

[対のコホモロジー長完全列](#thm-atop28-relative-exact) を用いた第4節の計算で、$D[(u,v)]$ は $v-u$ と対応し、$D$ は全射でした。端点交換による引戻しは $(u,v)\mapsto(v,u)$ です。長完全列の自然性により

$$
f^*D[(u,v)]=D[(v,u)]
$$

で、右辺に対応する整数は $u-v=-(v-u)$ です。全ての整数が $D$ で得られるため、相対1次の誘導写像は $-1$ 倍です。
<!-- solution-end -->

### 演習 ATOP28-B4：係数を変える

- Level: B

2次と1次だけに自由アーベル群 $\mathbb Z$ を持ち、境界が3倍である鎖複体を考える。整数係数、$\mathbb Q$ 係数、$\mathbb F_3$ 係数のホモロジーとコホモロジーを求めよ。

<!-- solution-start -->
**詳細解答**

係数を $R$ とし、境界と余境界はそれぞれの基底表示で3倍です。従って

$$
H_2=\ker(3:R\to R),\qquad H_1=R/3R,
$$

$$
H^1=\ker(3:R\to R),\qquad H^2=R/3R.
$$

整数では3倍の核は零、商は $\mathbb Z/3\mathbb Z$ です。従って $H_2=H^1=0$、$H_1=H^2=\mathbb Z/3\mathbb Z$ です。有理数では3倍の逆写像が $1/3$ 倍なので、全て零です。$\mathbb F_3$ では3倍が零写像なので、四つとも $\mathbb F_3$ です。他の次数は鎖群もコチェイン群も零です。
<!-- solution-end -->

### 演習 ATOP28-C1：評価同型の具体計算

- Level: C

体 $K=\mathbb Q$ 上の鎖複体で $C_2=K,C_1=K^3,C_0=K$ とし、他の鎖群は零とする。境界を

$$
\partial_2(t)=(t,t,0),\qquad \partial_1(x,y,z)=x-y
$$

と定める。鎖複体の条件を確認し、$H_1$ と $H^1$ を求めよ。1コサイクルから $H_1$ 上の評価がどのように得られるか示せ。

<!-- solution-start -->
**詳細解答**

合成 $\partial_1\partial_2(t)=t-t=0$ で、他の合成も零群を経由するので鎖複体です。1サイクルは $x=y$ を満たすため

$$
Z_1=\{(t,t,z):t,z\in K\},\qquad
B_1=\{(t,t,0):t\in K\}.
$$

第三座標を取る写像は $Z_1$ から $K$ へ全射で、その核が $B_1$ です。従って $H_1\cong K$ で、$(0,0,1)$ の類を基底にできます。

1コチェインを $\phi(x,y,z)=ax+by+cz$ と書きます。[特異余境界作用素](#def-atop28-coboundary) と同じ合成で

$$
(\delta^1\phi)(t)=(a+b)t.
$$

従って $Z^1$ は $a+b=0$ となる $(a,-a,c)$ の全体です。0コチェイン $\eta(s)=ds$ の余境界は

$$
(\delta^0\eta)(x,y,z)=d(x-y).
$$

ゆえに $B^1$ は $(d,-d,0)$ の全体です。$Z^1/B^1$ では第三係数 $c$ が自由で、それ以外の係数はコバウンダリで消せます。従って $H^1\cong K$ です。

1サイクルへの評価は

$$
\phi(t,t,z)=at-at+cz=cz.
$$

これは代表元の第一・第二座標の変化によらず、ホモロジー類の第三座標 $z$ に $c$ を掛ける線形汎関数です。任意の汎関数がこの形であり、零写像に対応するのは $c=0$ のコバウンダリ類だけです。[体係数の評価同型](#thm-atop28-field-duality) の証明と同じ構造を有限次元の代数模型で直接確認できました。
<!-- solution-end -->

## 7. まとめ

コチェインは鎖の評価であり、境界を前から合成する余境界は次数を上げます。その核を直前の像で割るとコホモロジーが得られます。連続写像に沿う引戻しは反変的で、ホモトピー不変です。対の長完全列では制限に対する延長の余境界が接続写像になります。体係数なら評価によってホモロジーの線形双対と一致しますが、整数係数では部分群からの評価の延長が失敗し得ます。この違いを次講でさらに調べます。
