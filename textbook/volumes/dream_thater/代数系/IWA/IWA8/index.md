# IWA8 円分体の類群と指標成分

[IWA7の類数成長公式](../IWA7/index.md#thm-iwa7-class-number-growth)は、円分塔の各層で類群の $p$ 部分の位数を数えます。しかし、その位数だけでは、Galois自己同型が類群のどの部分をどう動かすかは分かりません。今回は類群を**指標ごとの成分**に分け、複素共役による偶奇と、有限層をつなぐノルムを同じ座標で扱います。

既習の[IWA2の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting)には、位数 $p-1$ の有限群 $\Delta$ と $p$ 冪位数の群が現れました。$\Delta$ の作用を一度に追う代わりに、各自己同型が単なるスカラー倍となる部分を取り出せば、後に現れる円分単数・$p$ 進 $L$ 関数との比較も成分別に整理できます。

本講では **$p$ を奇素数**に固定します。$p=2$ については最後に、どの割り算が破綻するかを確認します。

## 1. 円分体の類群にはGalois群が作用する

$r\ge1$ とし、$E_r=\mathbb Q(\zeta_{p^r})$、$G_r=\operatorname{Gal}(E_r/\mathbb Q)$ と置きます。[IWA2の円分Galois群の表示](../IWA2/index.md#prop-iwa2-cyclotomic-restriction)より、$\sigma_a(\zeta_{p^r})=\zeta_{p^r}^{a}$ によって

$$
G_r\simeq(\mathbb Z/p^r\mathbb Z)^\times
$$

です。$E_r$ の整数環の非零分数イデアルを主イデアルで割った有限群を $\operatorname{Cl}(E_r)$ と書き、$p$ 冪位数の元全体を

$$
A_r=\operatorname{Cl}(E_r)[p^\infty]
$$

と置きます。$A_r$ は有限アーベル $p$ 群なので、加法記法を採用します。指数が $p^m$ なら、$z\in\mathbb Z_p$ の作用を $z\bmod p^m$ 倍として定義でき、$A_r$ は $\mathbb Z_p$ 加群です。

<a id="prop-iwa8-class-galois-action"></a>

<!-- formal-statement-start -->
> **命題（類群へのGalois作用）**  
> 奇素数 $p$、整数 $r\ge1$、$E_r=\mathbb Q(\zeta_{p^r})$ に対し、$\sigma\in G_r$ と分数イデアル $\mathfrak a$ に対する作用
>
$$
\sigma[\mathfrak a]=[\sigma(\mathfrak a)]
$$
>
> は $\operatorname{Cl}(E_r)$ およびその $p$ 部分 $A_r$ 上の群自己同型を定める。従って $A_r$ は $\mathbb Z_p[G_r]$ 加群である。
<!-- formal-statement-end -->

### 証明の見取り図

自己同型がイデアルの積と主イデアルを保つことを確認します。その後、元の位数が変わらないことを示します。

<!-- proof-start -->
### 証明

$\sigma(\mathfrak a\mathfrak b)=\sigma(\mathfrak a)\sigma(\mathfrak b)$ なので、イデアル類の積を保ちます。$\mathfrak a=(x)$ が主イデアルなら $\sigma(\mathfrak a)=(\sigma(x))$ も主イデアルです。したがって同じイデアル類の代表を選び直しても作用は変わりません。逆写像は $\sigma^{-1}$ の作用です。

$[\mathfrak a]\in A_r$ について $p^m[\mathfrak a]=0$ なら

$$
p^m\sigma[\mathfrak a]=\sigma(p^m[\mathfrak a])=0.
$$

よって $A_r$ は作用で保たれます。加法とスカラー倍に関して準同型であることから群環の作用へ拡張できます。
<!-- proof-end -->

これで「数体の自己同型を、類群の元に作用させる」という出発点が確定しました。ただし $G_r$ 全体は $p$ 冪位数部分も含みます。まずは位数が $p$ と互いに素な $\Delta$ だけを切り出します。

## 2. Teichmüller指標は有限部分を数に変える

[IWA2のTeichmüller持ち上げの存在・一意性](../IWA2/index.md#prop-iwa2-teichmueller-lifting)によって、各 $a\in(\mathbb Z/p\mathbb Z)^\times$ には、すべての $r$ で両立する $p-1$ 乗根 $\omega_{r-1}(a)\bmod p^r$ が一意にあります。その逆極限を取ると、$\mathbb Z_p$ に値を持つ元 $\omega(a)$ が得られます。

以下 $\Delta=(\mathbb Z/p\mathbb Z)^\times$ とし、[IWA2の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting)で各 $G_r$ の Teichmüller 部分群と同一視します。$\Delta$ の元は $E_r$ の自己同型として作用します。

<a id="def-iwa8-teich-character"></a>

<!-- formal-statement-start -->
> **定義（Teichmüller指標）**  
> 奇素数 $p$ と $\Delta=(\mathbb Z/p\mathbb Z)^\times$ に対し、写像 $\omega:\Delta\to\mathbb Z_p^\times$ を、各 $a\in\Delta$ について
>
$$
\omega(a)\equiv a\pmod p,\qquad \omega(a)^{p-1}=1
$$
>
> を満たす唯一の値で定める。これは群準同型であり、$\omega^i(a)=\omega(a)^i$（$0\le i\le p-2$）も $\Delta$ の指標である。ここで指標とは、乗法群 $\Delta$ から $\mathbb Z_p^\times$ への群準同型をいう。
<!-- formal-statement-end -->

存在・一意性は上の有限段持ち上げと逆極限から従います。積 $\omega(a)\omega(b)$ も $p-1$ 乗が1で、法 $p$ の値が $ab$ なので、一意性により $\omega(ab)=\omega(a)\omega(b)$ です。

<!-- definition-example-start: def-iwa8-teich-character -->
**定義の確認。** $p=5$、$a=2\bmod5$ を取ります。[IWA2の具体計算](../IWA2/index.md#def-iwa2-teichmueller-lifts)では法25の持ち上げが7でした。実際 $7\equiv2\pmod5$ かつ $7^2=49\equiv-1\pmod{25}$、したがって $7^4\equiv1\pmod{25}$。さらに $57\equiv7\pmod{25}$ かつ $57^2=3249\equiv-1\pmod{125}$ だから、法125の持ち上げは57です。両方の段で「還元」と「4乗根」の条件を確認できました。
<!-- definition-example-end -->

$\Delta$ は位数 $p-1$ の巡回群です。$\omega$ はその生成元を位数 $p-1$ の根へ送るので、$\omega^0,\ldots,\omega^{p-2}$ がすべて異なる指標になります。ここから類群を分けるための係数を作ります。

## 3. 群環の射影で指標成分を取り出す

射影とは、加群の元を一つの成分だけに写し、同じ射影を二度かけても変わらない作用素です。その条件は $e^2=e$ です。複数の射影が互いに重ならないように $e_i e_j=0$（$i\ne j$）とできれば、類群全体が成分の直和になります。

ここで群環 $\mathbb Z_p[\Delta]$ は、$\Delta$ の元を記号として $\mathbb Z_p$ 係数の有限和を取り、群の積に従って掛け算する環です。$p-1$ は $\mathbb Z_p$ の単元であるため、その逆数を係数に使えます。

<a id="def-iwa8-character-idempotent"></a>

<!-- formal-statement-start -->
> **定義（指標射影子と指標成分）**  
> 奇素数 $p$、$\Delta=(\mathbb Z/p\mathbb Z)^\times$、$0\le i\le p-2$ に対し、群環 $\mathbb Z_p[\Delta]$ の元
>
$$
e_i=\frac1{p-1}\sum_{\delta\in\Delta}\omega(\delta)^{-i}\delta
$$
>
> を **$\omega^i$ 指標射影子**とする。$\mathbb Z_p[\Delta]$ 加群 $M$ に対し
>
$$
M^{(i)}=e_i M
$$
>
> を **$\omega^i$ 指標成分**とする。
<!-- formal-statement-end -->

上の式にある $\delta$ は数ではなく **$M$ への作用素**です。係数 $\omega(\delta)^{-i}$ は $\mathbb Z_p$ に属するので、作用素の和が $M$ に作用します。

<!-- definition-example-start: def-iwa8-character-idempotent -->
**定義の確認。** $p=3$ では $\Delta=\{1,c\}$ で、$c$ は $-1\bmod3$ に対応します。$\omega(c)=-1$ なので

$$
e_0=\frac{1+c}{2},\qquad e_1=\frac{1-c}{2}.
$$

$e_0^2=(1+2c+c^2)/4=(1+c)/2=e_0$、$e_1^2=e_1$、$e_0e_1=(1-c^2)/4=0$、$e_0+e_1=1$ です。ここで $c^2=1$ と、$2$ が $\mathbb Z_3$ 上可逆であることを使いました。射影の三条件を直接確認しました。
<!-- definition-example-end -->

<a id="lem-iwa8-character-orthogonality"></a>

<!-- formal-statement-start -->
> **補題（Teichmüller指標の直交和）**  
> 奇素数 $p$、$\Delta=(\mathbb Z/p\mathbb Z)^\times$、整数 $k$ に対し
>
$$
\sum_{\delta\in\Delta}\omega(\delta)^k=
\begin{cases}
p-1 & (p-1\mid k),\\
0 & (p-1\nmid k).
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

生成元の値の冪が1になる場合とならない場合を分け、後者の和を生成元倍して比較します。

<!-- proof-start -->
### 証明

$d=p-1$ とし、$\Delta$ の生成元 $g$ を取ります。$d\mid k$ なら各 $\omega(\delta)^k=1$ であり、和は $d$ です。$d\nmid k$ なら $q=\omega(g)^k\ne1$ です。$S=\sum_{\delta\in\Delta}\omega(\delta)^k$ と置くと、$\delta\mapsto g\delta$ は $\Delta$ の置換だから

$$
qS=\sum_{\delta\in\Delta}\omega(g\delta)^k
=\sum_{\delta\in\Delta}\omega(\delta)^k=S.
$$

$\mathbb Z_p$ は整域で $q-1\ne0$ なので $S=0$。以上で両場合が示されました。
<!-- proof-end -->

<a id="thm-iwa8-idempotent-decomposition"></a>

<!-- formal-statement-start -->
> **定理（指標射影子による直和分解）**  
> 奇素数 $p$、$\Delta=(\mathbb Z/p\mathbb Z)^\times$ とし、$M$ を任意の $\mathbb Z_p[\Delta]$ 加群とする。上の $e_i$ は
>
$$
e_i e_j=
\begin{cases}
e_i & (i=j),\\
0 & (i\ne j),
\end{cases}
\qquad
\sum_{i=0}^{p-2}e_i=1
$$
>
> を満たす。従って
>
$$
M=\bigoplus_{i=0}^{p-2}M^{(i)},\qquad
M^{(i)}=\{x\in M:\delta x=\omega(\delta)^i x\ \text{for all }\delta\in\Delta\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの射影の積では群元の積 $\eta=\delta\varepsilon$ を固定して係数を集めます。直交和の補題で余分な係数が0になります。最後に各 $\delta$ の作用を計算して固有条件と結び付けます。

<!-- proof-start -->
### 証明

$d=p-1$ と置きます。$e_i e_j$ を群環で展開して $\eta=\delta\varepsilon$ と変数を置くと

$$
\begin{aligned}
e_i e_j
&=\frac1{d^2}\sum_{\delta,\varepsilon\in\Delta}
\omega(\delta)^{-i}\omega(\varepsilon)^{-j}\delta\varepsilon\\
&=\frac1{d^2}\sum_{\eta\in\Delta}\omega(\eta)^{-j}\eta
\sum_{\delta\in\Delta}\omega(\delta)^{j-i}.
\end{aligned}
$$

[指標の直交和](#lem-iwa8-character-orthogonality)から内側の和は $i=j$ なら $d$、異なれば0です。従って $e_i e_j=\mathbf1_{i=j}e_i$ です。また

$$
\sum_{i=0}^{d-1}e_i
=\frac1d\sum_{\delta\in\Delta}\delta
\sum_{i=0}^{d-1}\omega(\delta)^{-i}.
$$

$\omega(\delta)=1$ となるのは $\delta=1$ の場合だけです。内側の幾何級数はその場合 $d$、他の場合0なので、和は群環の単位元1になります。

任意の $x\in M$ は $x=(\sum_i e_i)x=\sum_i e_ix$ と書けます。もし $\sum_i x_i=0$（$x_i\in e_iM$）なら $e_j$ を作用させることで $x_j=0$ が従うため、和は直和です。

最後に $\delta e_i$ を計算します。$\eta=\delta\varepsilon$ と置けば

$$
\delta e_i
=\frac1d\sum_{\eta\in\Delta}\omega(\delta^{-1}\eta)^{-i}\eta
=\omega(\delta)^i e_i.
$$

よって $x=e_i y$ なら $\delta x=\omega(\delta)^i x$。逆に $x$ がこの固有条件を満たすとき

$$
e_i x=\frac1d\sum_{\delta\in\Delta}
\omega(\delta)^{-i}\omega(\delta)^i x=x,
$$

したがって $x\in e_iM$ です。
<!-- proof-end -->

**計算模型（実際の類群だとは仮定しません）。** $p=5$、$\Delta=\langle g\rangle$（$g=2\bmod5$）とし、

$$
M=(\mathbb Z/25\mathbb Z)\oplus(\mathbb Z/5\mathbb Z)
$$

に $g(x,y)=(7x,4y)$ と作用させます。$7^2\equiv-1\pmod{25}$ と $4^2\equiv1\pmod5$ なので、$g^4=1$ は両座標で成立します。$\omega(g)\equiv7\pmod{25}$、$\omega(g)^2\equiv4\pmod5$ により、第一座標は $\omega^1$、第二座標は $\omega^2$ の固有条件を満たします。ゆえに

$$
M^{(1)}=\mathbb Z/25\mathbb Z\oplus0,\qquad
M^{(2)}=0\oplus\mathbb Z/5\mathbb Z
$$

で、$M^{(0)}=M^{(3)}=0$ です。ここでは **群作用を各座標に書いたから** 射影が座標を取り出すと判定できます。成分の位数はそれぞれ25と5で、全体の位数125に掛け戻ります。

## 4. 複素共役は偶数番目・奇数番目を分ける

円分体 $E_r$ の複素共役 $c$ は $\zeta_{p^r}\mapsto\zeta_{p^r}^{-1}$ を満たすため、$\Delta$ の $-1$ に対応します。指標は $\omega(-1)=-1$ を満たし、$c$ は各指標成分で符号だけを変える作用になります。

<a id="def-iwa8-parity-parts"></a>

<!-- formal-statement-start -->
> **定義（複素共役の偶部分・奇部分）**  
> 奇素数 $p$、$r\ge1$ とし、$E_r=\mathbb Q(\zeta_{p^r})$ の $p$ 部分類群を $A_r$、その複素共役を $c$ とする。偶部分・奇部分を
>
$$
A_r^+=\{x\in A_r:cx=x\},\qquad
A_r^-=\{x\in A_r:cx=-x\}
$$
>
> と定義する。射影子はそれぞれ $(1+c)/2$、$(1-c)/2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa8-parity-parts -->
**定義の確認。** 直前の $p=5$ の模型で、$c=g^2$ とすると $c(x,y)=(-x,y)$ です。第一座標では $cx=-x$、第二座標では $cy=y$ が実際に成立します。さらに $\frac{1+c}{2}(x,y)=(0,y)$、$\frac{1-c}{2}(x,y)=(x,0)$ です。$2$ の逆元はどちらの剰余環にも存在するので、二つの射影が定義できます。
<!-- definition-example-end -->

<a id="prop-iwa8-parity-eigenspaces"></a>

<!-- formal-statement-start -->
> **命題（偶奇成分と指標の次数）**  
> 奇素数 $p$、$r\ge1$ と上の $A_r$ に対し、直和分解
>
$$
A_r^+=\bigoplus_{\substack{0\le i\le p-2\\i\text{ even}}}A_r^{(i)},
\qquad
A_r^-=\bigoplus_{\substack{0\le i\le p-2\\i\text{ odd}}}A_r^{(i)}
$$
>
> が成り立つ。特に $A_r=A_r^+\oplus A_r^-$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各成分への $c=-1$ の作用を評価し、偶・奇の射影を一成分ずつ作用させます。

<!-- proof-start -->
### 証明

[指標成分の固有条件](#thm-iwa8-idempotent-decomposition)に $\delta=-1$ を代入すると、$x\in A_r^{(i)}$ に対して

$$
cx=\omega(-1)^i x=(-1)^i x
$$

です。従って偶数 $i$ の成分には $(1+c)/2$ が恒等作用し、奇数 $i$ の成分には零作用します。$(1-c)/2$ では逆です。

[直和分解](#thm-iwa8-idempotent-decomposition)により任意の $x\in A_r$ は一意に $\sum_i x_i$ と書けます。これに $(1+c)/2$ と $(1-c)/2$ を作用させると、それぞれ偶数番目と奇数番目の和だけが残ります。両射影の和が1、積が0なので、主張が従います。
<!-- proof-end -->

$p=3$ なら $i=0,1$ の2成分しかなく、$A_r^{(0)}=A_r^+$、$A_r^{(1)}=A_r^-$ です。$p=7$ なら偶部分は $i=0,2,4$、奇部分は $i=1,3,5$ の和です。**「偶指標」は $\omega^i(-1)=1$ を指す**のであって、指標を評価する整数 $\delta$ が偶数かどうかを指していません。

## 5. 実部分体の類群と偶部分

$E_r^+=\mathbb Q(\zeta_{p^r}+\zeta_{p^r}^{-1})$ を最大実部分体とします。実際、$s=\zeta_{p^r}+\zeta_{p^r}^{-1}$ は複素共役で固定され、$\zeta_{p^r}$ は $X^2-sX+1=0$ を満たします。一方 $\zeta_{p^r}$ は非実数なので、$[E_r:\mathbb Q(s)]=2$。よって $E_r^+=\mathbb Q(s)$ は複素共役の固定体であり、$E_r/E_r^+$ は次数2の拡大です。イデアル類の拡大写像を $j:\operatorname{Cl}(E_r^+)\to\operatorname{Cl}(E_r)$、ノルムを $N:\operatorname{Cl}(E_r)\to\operatorname{Cl}(E_r^+)$ とします。ここでも $p$ 部分への制限を同じ記号で書きます。

イデアルを下の体へノルムで戻してから拡張すると、元のイデアルと共役イデアルの積になるため、加法記法では $jN=1+c$ となります。一方、下の体のイデアルを拡張してからノルムを取ると二乗になるので $Nj=2$ です。

<a id="thm-iwa8-plus-real-class"></a>

<!-- formal-statement-start -->
> **定理（実部分体のp部分類群と偶部分）**  
> 奇素数 $p$、$r\ge1$、$E_r=\mathbb Q(\zeta_{p^r})$、$E_r^+$ をその最大実部分体とする。$B_r=\operatorname{Cl}(E_r^+)[p^\infty]$、$A_r=\operatorname{Cl}(E_r)[p^\infty]$ とし、$c$ を複素共役とする。このときイデアル拡大写像
>
$$
j:B_r\xrightarrow{\ \sim\ }A_r^+
$$
>
> は同型で、逆写像は $x\mapsto\frac12 N(x)$ である。さらに
>
$$
A_r^-=\ker(N:A_r\to B_r).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$jN=1+c$ と $Nj=2$ をイデアルに戻って確かめます。$2$ が $p$ 部分で可逆なことが、拡大写像の単射性と全射性の両方を与えます。

<!-- proof-start -->
### 証明

$E_r/E_r^+$ のGalois群は $\{1,c\}$ です。任意の分数イデアル $\mathfrak a$ を拡大してノルムを取る場合、素イデアル分解において分岐指数と剰余次数の積の和が拡大次数2になるので

$$
N(j([\mathfrak b]))=2[\mathfrak b]
\quad([\mathfrak b]\in\operatorname{Cl}(E_r^+)).
$$

逆の合成について、$E_r$ の分数イデアル $\mathfrak a$ に対して

$$
j(N([\mathfrak a]))=[\mathfrak a]+[c\mathfrak a].
$$

両式は主イデアルでも保たれ、$p$ 部分の上で $Nj=2$、$jN=1+c$ を得ます。

$j(B_r)\subset A_r^+$ です。なぜなら $c$ は $E_r^+$ のイデアルを拡張したものを固定するからです。$j(b)=0$ なら $2b=Nj(b)=0$、$p$ 奇素数ゆえ $2$ 倍が $B_r$ の自己同型なので $b=0$。従って $j$ は単射です。

$x\in A_r^+$ なら $jN(x)=(1+c)x=2x$。$N(x)\in B_r$ なので、$x=j(\frac12N(x))$ と表せます。従って $j$ は偶部分に全射で、逆写像も上記の形です。

最後に $x\in A_r^-$ なら $jN(x)=(1+c)x=0$。$j$ の単射性から $N(x)=0$。逆に $N(x)=0$ なら $(1+c)x=jN(x)=0$ なので $cx=-x$。よって核は奇部分と一致します。
<!-- proof-end -->

この定理は $p$ **部分**についての同型です。類群全体では、2倍が可逆とは限らないため、同じ証明で無条件の同型と断言できません。

## 6. 塔のノルムと射影は両立する

[IWA4のノルムによる逆極限](../IWA4/index.md#thm-iwa4-iwasawa-action)を、今の指標成分ごとに組み立てます。$E_r\subset E_{r+1}$ のイデアルノルムから $N_{r+1,r}:A_{r+1}\to A_r$ が定まり、両層の $\Delta$ は同じ Teichmüller 持ち上げを使って作用します。

<a id="prop-iwa8-norm-equivariance"></a>

<!-- formal-statement-start -->
> **命題（ノルム写像のΔ同変性）**  
> 奇素数 $p$、$r\ge1$、$E_r=\mathbb Q(\zeta_{p^r})$、$A_r=\operatorname{Cl}(E_r)[p^\infty]$ とする。各 $\delta\in\Delta$ と $x\in A_{r+1}$ に対して
>
$$
N_{r+1,r}(\delta x)=\delta N_{r+1,r}(x)
$$
>
> が成立する。従って各 $0\le i\le p-2$ について
>
$$
N_{r+1,r}(e_i x)=e_iN_{r+1,r}(x),
\qquad
N_{r+1,r}(A_{r+1}^{(i)})\subset A_r^{(i)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

ノルムは拡大のGalois共役のイデアル積です。$\Delta$ の作用とこの積を入れ替えられることを確かめ、群環の線形結合へ拡張します。

<!-- proof-start -->
### 証明

$H=\operatorname{Gal}(E_{r+1}/E_r)$ とし、$\mathfrak a$ を $E_{r+1}$ の分数イデアルとします。$G_{r+1}$ はアーベル群なので、$\delta\in\Delta$ は $H$ と可換です。イデアルの拡大を通して見ると

$$
\prod_{h\in H}h(\delta\mathfrak a)
=\delta\left(\prod_{h\in H}h\mathfrak a\right).
$$

これは下の体へ戻すノルムイデアルを拡張した等式に対応します。下の体で直接各素イデアルと剰余次数を比較しても同じ等式が得られ、イデアル類上では $N_{r+1,r}(\delta x)=\delta N_{r+1,r}(x)$ です。主イデアルのノルムも主イデアルなので、類群上でよく定義されています。

$N_{r+1,r}$ は $\mathbb Z_p$ 線形です。従って[射影子の定義](#def-iwa8-character-idempotent)を代入し、

$$
\begin{aligned}
N_{r+1,r}(e_i x)
&=\frac1{p-1}\sum_{\delta\in\Delta}
\omega(\delta)^{-i}N_{r+1,r}(\delta x)\\
&=\frac1{p-1}\sum_{\delta\in\Delta}
\omega(\delta)^{-i}\delta N_{r+1,r}(x)
=e_i N_{r+1,r}(x).
\end{aligned}
$$

よって像は $e_iA_r=A_r^{(i)}$ に入ります。
<!-- proof-end -->

<a id="thm-iwa8-limit-eigenspaces"></a>

<!-- formal-statement-start -->
> **定理（類群逆極限の指標成分分解）**  
> 奇素数 $p$、$E_r=\mathbb Q(\zeta_{p^r})$（$r\ge1$）、$A_r=\operatorname{Cl}(E_r)[p^\infty]$ とし、ノルム写像で
>
$$
X=\varprojlim_{r\ge1}A_r
$$
>
> を定義する。このとき自然な $\Delta$ 作用について
>
$$
X=\bigoplus_{i=0}^{p-2}e_iX
\simeq\bigoplus_{i=0}^{p-2}\varprojlim_{r\ge1}A_r^{(i)}.
$$
>
> また各成分は、[IWA2の円分塔の位相的生成元](../IWA2/index.md#thm-iwa2-compatible-tower)による $\Lambda=\mathbb Z_p[[T]]$ 作用で保たれる。
<!-- formal-statement-end -->

### 証明の見取り図

ノルムが射影と可換なので、互換な類群の列を成分ごとに射影できます。直和の成分数は固定の有限個であり、射影と逆極限を交換できます。

<!-- proof-start -->
### 証明

$x=(x_r)_{r\ge1}\in X$ は $N_{r+1,r}(x_{r+1})=x_r$ を満たします。[ノルムの同変性](#prop-iwa8-norm-equivariance)から

$$
N_{r+1,r}(e_ix_{r+1})=e_iN_{r+1,r}(x_{r+1})=e_i x_r.
$$

よって $(e_i x_r)_r$ は $X$ の元です。各有限層での[直和分解](#thm-iwa8-idempotent-decomposition)から、互換列についても

$$
x_r=\sum_{i=0}^{p-2}e_ix_r.
$$

有限和なので成分別に互換列を作り直せます。逆に各 $i$ の互換列を足せば $X$ の互換列となり、射影の直交性により分解は一意です。

円分塔の $p$ 冪部分のGalois群 $\Gamma$ は $\Delta$ と可換です（[IWA2の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting)）。そのため $\Gamma$ の作用は各 $e_i$ と可換で、[IWA3の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)に基づく $\Lambda$ 作用も各 $e_iX$ を保ちます。
<!-- proof-end -->

**位数と成長の接続。** 有限層では、直和と位数の積から

$$
|A_r|=\prod_{i=0}^{p-2}|A_r^{(i)}|,
\qquad
v_p(|A_r|)=\sum_{i=0}^{p-2}v_p(|A_r^{(i)}|).
$$

これはすべての $r$ で成立します。一方、各成分の有限層と $X^{(i)}$ の coinvariants が直ちに同型であるとは言えません。[IWA7が区別した算術的な有限層比較](../IWA7/index.md#thm-iwa7-class-number-growth)は、指標成分に分けても別途必要です。次のIWA9以降で、分岐とノルムの条件を調べる理由がここにあります。

## 7. p=2では同じ射影が使えない

$p=2$ では $\Delta=\{\pm1\}$ を使った複素共役の分解を考えても、$2$ は $\mathbb Z_2$ の単元ではありません。そのため $(1\pm c)/2$ は $\mathbb Z_2[\Delta]$ の元ではなく、奇素数での証明をそのまま移せません。

**失敗例。** $M=\mathbb Z/4\mathbb Z$ に $c(x)=-x$ と作用させます。$c^2=1$ ですが

$$
M^+=\{x:cx=x\}=\{0,2\},\qquad
M^-=\{x:cx=-x\}=M.
$$

従って $M^+\cap M^-=\{0,2\}\ne0$ で、$M=M^+\oplus M^-$ にはなりません。壊れたのは **$2$ で割って二つの互いに直交する射影を作る手順** です。[IWA2の2進円分塔](../IWA2/index.md#thm-iwa2-two-adic-splitting)は別途構成できますが、ここでの奇素数用射影を自動適用することはできません。

## 8. 演習

### Level A

<a id="ex-iwa8-a1"></a>

**A1. 類群のGalois作用を定める**
- Level: A
- ID: IWA8-A1

数体 $K/\mathbb Q$ のGalois群 $G$ と、そのイデアル類群 $\operatorname{Cl}(K)$ を考える。$\sigma\in G$ と主イデアル $(x)$ に対して $\sigma((x))$ を求め、作用 $[\mathfrak a]\mapsto[\sigma(\mathfrak a)]$ が類群上で定義できる理由を説明せよ。$p$ 冪位数の元全体が保たれることも示せ。

<!-- solution-start -->
**詳細解答。** $\sigma((x))=\{\sigma(xy):y\in\mathcal O_K\}=(\sigma(x))$ です。自己同型は整数環を保ち、主イデアルを主イデアルへ写します。また積を保つため、同じ類の代表 $\mathfrak a$ と $(x)\mathfrak a$ は同じ類へ写ります。よって作用は良定義です。$p^m[\mathfrak a]=0$ なら $p^m[\sigma(\mathfrak a)]=\sigma(p^m[\mathfrak a])=0$ で、$p$ 部分が保たれます。[Galois作用の命題](#prop-iwa8-class-galois-action)の各仮定を直接確認したことになります。
<!-- solution-end -->

<a id="ex-iwa8-a2"></a>

**A2. 法25のTeichmüller値**
- Level: A
- ID: IWA8-A2

$p=5$ とし、法5の元2を法25へ $2+5t$（$0\le t<5$）として持ち上げる。$(2+5t)^4\equiv1\pmod{25}$ となる $t$ を求め、得られた値がTeichmüller持ち上げの二条件を満たすことを検算せよ。

<!-- solution-start -->
**詳細解答。** 二項展開で $(2+5t)^4\equiv16+4\cdot2^3\cdot5t=16+160t\equiv16+10t\pmod{25}$。従って $10t\equiv10\pmod{25}$、両辺を5で割って $2t\equiv2\pmod5$、すなわち $t\equiv1\pmod5$。範囲内では $t=1$ だけです。値は7で、$7\equiv2\pmod5$ かつ $7^2=49\equiv-1\pmod{25}$ から $7^4\equiv1\pmod{25}$。還元と根の条件を両方満たします。
<!-- solution-end -->

<a id="ex-iwa8-a3"></a>

**A3. 巡回4元群の指標直交和**
- Level: A
- ID: IWA8-A3

$\Delta=\langle g\rangle$ を位数4の巡回群とし、$\omega(g)$ は位数4の根とする。$k=0,1,2,3$ について $S_k=\sum_{j=0}^3\omega(g)^{jk}$ を求めよ。$k=2$ でゼロになる途中式を示せ。

<!-- solution-start -->
**詳細解答。** $q=\omega(g)$ と置けば $q^4=1$、$q^2=-1$ です。$S_0=1+1+1+1=4$。$k=1,3$ では $q^k\ne1$ かつ $(q^k)^4=1$ なので $(1-q^k)S_k=1-q^{4k}=0$。$\mathbb Z_5$ は整域なので $S_k=0$。$k=2$ では $S_2=1+q^2+q^4+q^6=1-1+1-1=0$ です。
<!-- solution-end -->

<a id="ex-iwa8-a4"></a>

**A4. 複素共役の偶奇**
- Level: A
- ID: IWA8-A4

$p=7$ とし、$M$ を $\mathbb Z_7[\Delta]$ 加群とする。$M^{(i)}$（$0\le i\le5$）で複素共役 $c=-1\in\Delta$ が作用する符号を求め、$M^+$ と $M^-$ の指標成分表示を書け。

<!-- solution-start -->
**詳細解答。** $\omega(-1)=-1$ なので、[指標の固有条件](#thm-iwa8-idempotent-decomposition)から $cx=(-1)^ix$ です。$i=0,2,4$ では符号は $+1$、$i=1,3,5$ では $-1$。従って $M^+=M^{(0)}\oplus M^{(2)}\oplus M^{(4)}$、$M^-=M^{(1)}\oplus M^{(3)}\oplus M^{(5)}$ です。$2$ は $\mathbb Z_7$ で可逆なので、$(1\pm c)/2$ が実際の射影です。
<!-- solution-end -->

<a id="ex-iwa8-a5"></a>

**A5. 射影の条件を直接検算する**
- Level: A
- ID: IWA8-A5

$p=3$、$M=\mathbb Z/9\mathbb Z$、$c(x)=-x$ とする。$e_0=(1+c)/2$、$e_1=(1-c)/2$ による $M$ の像を計算せよ。ただし $1/2$ は法9での2の逆元を表す。

<!-- solution-start -->
**詳細解答。** 法9で $2\cdot5=10\equiv1$ より $1/2=5$ です。$e_0(x)=5(x-x)=0$、$e_1(x)=5(x+x)=10x\equiv x\pmod9$。したがって $e_0M=0$、$e_1M=M$。$e_0e_1=0$、$e_0+e_1=1$ も作用上で成立します。$c$ は全元に $-1$ で作用するので、奇部分だけが残ることと一致します。
<!-- solution-end -->

### Level B

<a id="ex-iwa8-b1"></a>

**B1. 二座標の指標分解**
- Level: B
- ID: IWA8-B1

$p=5$、$\Delta=\langle g\rangle$（$g=2\bmod5$）、$M=(\mathbb Z/25\mathbb Z)\oplus(\mathbb Z/5\mathbb Z)$ とする。作用を $g(x,y)=(7x,4y)$ と定める。

1. $g^4=1$ を確かめよ。
2. 指標成分 $M^{(i)}$ をすべて求めよ。
3. $c=g^2$ による偶奇部分と各位数を求めよ。これは数体の類群とは限らない加群の模型である。

<!-- solution-start -->
**詳細解答。**

**第1問。** $7^2=49\equiv-1\pmod{25}$ なので $7^4\equiv1$。$4^2=16\equiv1\pmod5$ なので $4^4\equiv1$ です。従って作用は位数4の群の作用として良定義です。

**第2問。** [Teichmüller値](#def-iwa8-teich-character)から $\omega(g)\equiv7\pmod{25}$、$\omega(g)^2\equiv4\pmod5$。第一座標の固有指標は $\omega$、第二座標は $\omega^2$ です。[直和分解](#thm-iwa8-idempotent-decomposition)より $M^{(1)}=\mathbb Z/25\oplus0$、$M^{(2)}=0\oplus\mathbb Z/5$、他は0。

**第3問。** $g^2(x,y)=(-x,y)$ なので $M^-=\mathbb Z/25\oplus0$（位数25）、$M^+=0\oplus\mathbb Z/5$（位数5）です。$|M|=25\cdot5=125$ とも一致します。
<!-- solution-end -->

<a id="ex-iwa8-b2"></a>

**B2. 指標成分を取る操作の完全性**
- Level: B
- ID: IWA8-B2

奇素数 $p$ と $\Delta=(\mathbb Z/p\mathbb Z)^\times$ に対し、$\mathbb Z_p[\Delta]$ 加群の短完全列 $0\to M'\xrightarrow{u}M\xrightarrow{v}M''\to0$ がある。任意の $i$ について $0\to e_iM'\xrightarrow{u}e_iM\xrightarrow{v}e_iM''\to0$ も完全であることを示せ。

<!-- solution-start -->
**詳細解答。** $\Delta$ 同変性から $u(e_ix)=e_iu(x)$、$v(e_iy)=e_iv(y)$ であり、制限写像が定義できます。$u$ は元の列で単射なので制限も単射です。$z\in e_iM''$ を取ると $v(y)=z$ となる $y\in M$ があり、$v(e_iy)=e_iv(y)=e_iz=z$ ですから右端は全射。$y\in e_iM$ が $v(y)=0$ なら $y=u(x)$ となる $x\in M'$ が存在します。$y=e_iy=e_iu(x)=u(e_ix)$ なので $y$ は $u(e_iM')$ に入ります。逆包含は $vu=0$ から従います。したがって中間でも完全です。
<!-- solution-end -->

<a id="ex-iwa8-b3"></a>

**B3. 実部分体へ戻す**
- Level: B
- ID: IWA8-B3

奇素数 $p$、$K=\mathbb Q(\zeta_{p^r})$、$K^+$ をその最大実部分体とする。$A=\operatorname{Cl}(K)[p^\infty]$、$B=\operatorname{Cl}(K^+)[p^\infty]$ とし、イデアル拡大 $j$ とノルム $N$ が $Nj=2$、$jN=1+c$ を満たすことを用いて、

1. $j:B\to A$ の単射性、
2. $j(B)=A^+$、
3. $\ker N=A^-$ を証明せよ。

<!-- solution-start -->
**詳細解答。**

**第1問。** $j(b)=0$ なら $2b=Nj(b)=0$。$B$ は有限 $p$ 群、$p$ は奇数なので2倍は可逆、従って $b=0$。

**第2問。** $c$ は $j(B)$ の元を固定するので $j(B)\subset A^+$。逆に $x\in A^+$ なら $jN(x)=(1+c)x=2x$ であり、$x=j((1/2)N(x))$。従って等号です。

**第3問。** $x\in A^-$ なら $jN(x)=(1+c)x=0$。単射性により $N(x)=0$。逆に $N(x)=0$ なら $(1+c)x=jN(x)=0$ で、$cx=-x$。従って $\ker N=A^-$ です。[実部分体の定理](#thm-iwa8-plus-real-class)の要所を再現しました。
<!-- solution-end -->

<a id="ex-iwa8-b4"></a>

**B4. ノルムと射影の交換**
- Level: B
- ID: IWA8-B4

奇素数 $p$ の円分塔 $E_r\subset E_{r+1}$ を考える。$x\in A_{r+1}$、$\delta\in\Delta$ について $N_{r+1,r}(\delta x)=\delta N_{r+1,r}(x)$ を仮定して、

1. $N_{r+1,r}(e_ix)=e_iN_{r+1,r}(x)$ を計算せよ。
2. 互換列 $(x_r)_r\in\varprojlim A_r$ が $(e_ix_r)_r$ も互換列となることを確かめよ。

<!-- solution-start -->
**詳細解答。**

**第1問。** [射影子の定義](#def-iwa8-character-idempotent)を左辺に代入すると $N(e_ix)=\frac1{p-1}\sum_\delta\omega(\delta)^{-i}N(\delta x)$。仮定で各項を $\delta N(x)$ に直せるので、和は $e_iN(x)$ です。

**第2問。** 互換性 $N_{r+1,r}(x_{r+1})=x_r$ と(1)を続けて使い、$N_{r+1,r}(e_ix_{r+1})=e_iN_{r+1,r}(x_{r+1})=e_ix_r$ を得ます。従って成分別の列もノルムと両立します。
<!-- solution-end -->

<a id="ex-iwa8-b5"></a>

**B5. 素数2で失われる直和**
- Level: B
- ID: IWA8-B5

$M=\mathbb Z/4\mathbb Z$ に $c(x)=-x$ と作用させる。$M^+=\{x:cx=x\}$、$M^-=\{x:cx=-x\}$ を求め、$M=M^+\oplus M^-$ が成り立たない理由を、射影式の分母と結び付けて説明せよ。

<!-- solution-start -->
**詳細解答。** $cx=x$ は $-x\equiv x\pmod4$、すなわち $2x\equiv0\pmod4$ なので $M^+=\{0,2\}$。一方 $cx=-x$ はすべての元で成立するので $M^-=M$ です。$M^+\cap M^-=\{0,2\}$ は非零であり、直和の条件に反します。奇素数の証明で用いた $(1+c)/2$ と $(1-c)/2$ は $2$ が単元であることを必要とします。$\mathbb Z_2$ では $1/2$ が定義できず、直交射影を構成できないことが反例の原因です。
<!-- solution-end -->

### Level C

<a id="ex-iwa8-c1"></a>

**C1. 二層の指標成分・複素共役・ノルムを同時に検算する**
- Level: C
- ID: IWA8-C1

$p=5$、$\Delta=\langle g\rangle$（$g=2\bmod5$）とする。次の二つの有限 $\mathbb Z_5[\Delta]$ 加群は**円分体の類群そのものではない模型**である。

$$
M_1=(\mathbb Z/25\mathbb Z)\oplus(\mathbb Z/5\mathbb Z),
\qquad
M_2=(\mathbb Z/125\mathbb Z)\oplus(\mathbb Z/25\mathbb Z).
$$

$M_1$ では $g(x,y)=(7x,4y)$、$M_2$ では $g(u,v)=(57u,-v)$ とする。$N:M_2\to M_1$ は二つの座標をそれぞれ法25、法5へ還元する写像とする。

1. $M_2$ の $g$ 作用が $g^4=1$ を満たし、法25・法5への還元で $M_1$ の作用と一致することを示せ。
2. 両層の $\omega^i$ 指標成分（$i=0,1,2,3$）を求め、$c=g^2$ の偶奇部分を示せ。
3. $N$ と $e_i$ が可換なことを、各成分で直接確認せよ。
4. 両層の位数と $5$ 進指数を計算し、その和の分解を検算せよ。この二層の差だけから一般の類数成長公式を断定できない理由も述べよ。

<!-- solution-start -->
**詳細解答。**

**第1問。** $57^2=3249\equiv-1\pmod{125}$ なので $57^4\equiv1\pmod{125}$。第二座標でも $(-1)^4=1$ です。従って $g^4$ は恒等作用です。さらに $57\equiv7\pmod{25}$、$-1\equiv4\pmod5$ なので

$$
N(g(u,v))=(7(u\bmod25),\,4(v\bmod5))=gN(u,v).
$$

これで $N$ の同変性が直接確認できました。

**第2問。** [Teichmüller指標の定義](#def-iwa8-teich-character)による $g$ の値は法125で57、法25で7です。$M_2$ の第一座標は $\omega$ に、第二座標は $\omega^2$ に従います。後者について $57^2\equiv-1\pmod{125}$ なので、法25で $\omega(g)^2=-1$ を確かめられます。従って

$$
\begin{aligned}
M_1^{(1)}&=\mathbb Z/25\oplus0,&M_1^{(2)}&=0\oplus\mathbb Z/5,\\
M_2^{(1)}&=\mathbb Z/125\oplus0,&M_2^{(2)}&=0\oplus\mathbb Z/25,
\end{aligned}
$$

他の成分は0です。$c=g^2$ は両層の第一座標で $-1$、第二座標で $+1$ と作用するので、奇部分は第一座標、偶部分は第二座標です。

**第3問。** [射影の固有条件](#thm-iwa8-idempotent-decomposition)により $e_1$ は第一座標だけ、$e_2$ は第二座標だけを残し、$e_0,e_3$ は零作用です。$N$ は座標ごとの剰余還元なので、例えば

$$
N(e_1(u,v))=N(u,0)=(u\bmod25,0)=e_1N(u,v).
$$

同様に $e_2$ では $(0,v\bmod5)$ が両順序で得られ、$e_0,e_3$ はどちらも0です。従って全射影子で可換です。

**第4問。** $|M_1|=25\cdot5=5^3$ なので $v_5(|M_1|)=3=2+1$、$|M_2|=125\cdot25=5^5$ なので $v_5(|M_2|)=5=3+2$ です。右辺はそれぞれ奇成分と偶成分の $5$ 進指数の和です。ただしこの加群は数体の類群でなく、しかも二つの層だけの計算です。[IWA7の類数成長公式](../IWA7/index.md#thm-iwa7-class-number-growth)には数体の無限 $\mathbb Z_p$ 塔と算術的な制御が必要であり、二層の数値差だけから $\mu,\lambda,\nu$ を決めることはできません。
<!-- solution-end -->

## 9. 次への接続と参照資料

今回、$\Delta$ の作用を係数環の中で射影に変えることで、類群の $p$ 部分を指標成分へ分け、複素共役とノルムの両方に沿って追えるようになりました。次のIWA9では、分岐条件と無分岐最大 $p$ 拡大を調べ、有限層の類群と無限塔の加群をつなぐ算術的な条件を導入します。

参考：Romyar Sharifi, [Iwasawa Theory, Chapter 1: Class groups and units](https://math.ucla.edu/~sharifi/notes/iwasawa-ch01.html)、[Chapter 3: Iwasawa theory](https://math.ucla.edu/~sharifi/notes/iwasawa-ch03.html)、[Chapter 4: Cyclotomic fields](https://math.ucla.edu/~sharifi/notes/iwasawa-ch04.html)。本講の射影子の直交性、偶奇分解、ノルムとの両立性は本文の仮定の下で証明しました。