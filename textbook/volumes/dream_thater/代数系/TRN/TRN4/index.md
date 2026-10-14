# TRN4 Hermiteの微分和・積分恒等式

[TRN3の実区間での端点恒等式](../TRN3/index.md#prop-trn3-preview-identity)は、多項式の導関数を足して作った量を積分に変えるものでした。次に必要なのは、積分の端点が $0,1,\ldots,n$ のような実数だけでなく、代数的な複素数になっても同じ仕組みが使えることです。後で指数関数の代数関係を仮定すると、複素数を端点に取ることも避けられません。

多項式の値そのものは整数点で扱いやすいとは限りません。一方、導関数値なら多重零点と階乗を利用して整数性を仕込めます。そこで、**端点の導関数値を有限個足した量を、同じ多項式の線積分で表す**ことを目指します。積分路の向きと指数因子を正しく保持すれば、算術側の端点値と解析側の上界を結び付けられます。

## 1. 微分を一段ずつずらすと何が残るか

まず多項式 $f(z)=z^2$ を考えます。微分を続けると $f'(z)=2z$, $f''(z)=2$, $f'''(z)=0$ です。これらを足した $z^2+2z+2$ をもう一度微分すると $2z+2$ になり、**引き算で元の $z^2$ だけが残ります**。次数が有限だから最後の導関数が消えるのが鍵です。

多項式 $f\in\mathbb C[z]$ が零でないとき、その次数を $m\ge0$ とします。$f^{(0)}=f$ とし、$f^{(k)}$ は $k$ 回微分した多項式を表します。次の構成を使います。

<a id="def-trn4-derivative-sum"></a>

<!-- formal-statement-start -->
> **定義（Hermiteの有限微分和）**  
> 零でない多項式 $f\in\mathbb C[z]$ の次数が $m$ のとき、対応する有限微分和 $F_f$ を

$$
F_f(z)=\sum_{k=0}^{m}f^{(k)}(z)
$$

> とする。零多項式 $f=0$ に対しては $F_f=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn4-derivative-sum -->
### 例：二次多項式で定義を確認する

**定義の確認**：$f(z)=z^2$ は係数が複素数で次数 $m=2$ の多項式です。$k=0,1,2$ の導関数を、定義で指定された順に足すと

$$
F_f(z)=f(z)+f'(z)+f''(z)=z^2+2z+2
$$

です。$f^{(3)}=0$ なので、微分和はここで終わります。また $f=0$ の場合には、定義により $F_f=0$ であり、空の次数を無理に指定する必要はありません。
<!-- definition-example-end -->

一般の $f$ でも、導関数を一段ずつずらすと差が消えます。この相殺は、後の積分恒等式で使う出発点です。

<a id="prop-trn4-telescoping"></a>

<!-- formal-statement-start -->
> **命題（微分和の望遠鏡恒等式）**  
> 任意の多項式 $f\in\mathbb C[z]$ に対し、上で定めた $F_f$ は

$$
F_f(z)-F_f'(z)=f(z)
$$

> をすべての $z\in\mathbb C$ で満たす。さらに、複素指数関数との積について

$$
\frac{d}{dz}\bigl(e^{-z}F_f(z)\bigr)=-e^{-z}f(z)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限微分和を微分したとき、元の $f$ だけは現れず、それより高階の導関数が一つずつ対応して消えます。次に指数関数の微分で生まれる負符号を使います。

<!-- proof-start -->
### 証明

$f=0$ なら $F_f=0$ なので両式とも成立します。$f\ne0$ とし、その次数を $m$ とします。多項式の高階導関数は $f^{(m+1)}=0$ なので、

$$
\begin{aligned}
F_f'(z)
&=\sum_{k=0}^{m}\frac{d}{dz}f^{(k)}(z)\\
&=\sum_{k=0}^{m}f^{(k+1)}(z)\\
&=\sum_{j=1}^{m}f^{(j)}(z)+f^{(m+1)}(z)\\
&=f'(z)+\cdots+f^{(m)}(z).
\end{aligned}
$$

一方、$F_f(z)=f(z)+\sum_{j=1}^{m}f^{(j)}(z)$ です。二式の対応する項を引くと $F_f-F_f'=f$ が得られます。$m=0$ の場合も $F_f=f$ は定数で $F_f'=0$ となり同じ式です。

[CA1の複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から $(e^{-z})'=-e^{-z}$、[複素微分の積の法則](../../../解析系/CA/CA1/index.md#thm-ca1-derivative-rules)から

$$
\begin{aligned}
\frac{d}{dz}(e^{-z}F_f(z))
&=(-e^{-z})F_f(z)+e^{-z}F_f'(z)\\
&=e^{-z}\bigl(F_f'(z)-F_f(z)\bigr)\\
&=-e^{-z}f(z).
\end{aligned}
$$

両因子は整関数なので、微分は全複素平面で正当化されています。
<!-- proof-end -->

したがって $e^{-z}F_f(z)$ は、$-e^{-z}f(z)$ を複素微分して戻せる関数です。次に、この導関数を二点間で積分します。

## 2. 複素線分を向き付きで積分する

複素数 $a,b$ を端点とし、$a$ から $b$ へ進む**向き付き線分**を

$$
\gamma_{a,b}(t)=a+t(b-a),\qquad 0\le t\le1
$$

で表します。$\gamma_{a,b}(0)=a$, $\gamma_{a,b}(1)=b$、速度は $\gamma_{a,b}'(t)=b-a$ です。[CA2の複素線積分の定義](../../../解析系/CA/CA2/index.md#def-ca2-line-integral)をこの曲線へ適用すると、連続関数 $h$ について

$$
\int_a^b h(z)\,dz
:=\int_{\gamma_{a,b}}h(z)\,dz
=(b-a)\int_0^1 h(a+t(b-a))\,dt
$$

となります。右辺は実区間上の複素数値Riemann積分です。$a=b$ なら速度が0なので両辺は0です。端点を逆にすれば速度の符号が反転し、積分値も負になります。

[CA2の原始関数の定義](../../../解析系/CA/CA2/index.md#def-ca2-primitive)では、正則関数 $G$ の導関数が $h$ なら $G$ は $h$ の原始関数です。今回の $G(z)=e^{-z}F_f(z)$ は上の命題により、$h(z)=-e^{-z}f(z)$ の原始関数です。しかも全平面で定義されています。

<a id="thm-trn4-complex-endpoint"></a>

<!-- formal-statement-start -->
> **定理（Hermiteの複素端点積分恒等式）**  
> 任意の多項式 $f\in\mathbb C[z]$ に対し $F_f$ を有限微分和とする。任意の端点 $a,b\in\mathbb C$ について、$a$ から $b$ へ進む向き付き線分に沿って積分すると

$$
e^bF_f(a)-e^aF_f(b)
=\int_a^b e^{a+b-z}f(z)\,dz
$$

> が成立する。とくに $a=0$ のとき、

$$
e^bF_f(0)-F_f(b)
=\int_0^b e^{b-z}f(z)\,dz
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

微分和に指数関数を掛けた $G=e^{-z}F_f$ を使い、[複素線積分の基本定理](../../../解析系/CA/CA2/index.md#thm-ca2-fundamental-theorem)で端点差へ変えます。符号を反転した後、$e^{a+b}$ を掛ける順番を追うと指数因子が定まります。

<!-- proof-start -->
### 証明

$f$ と $F_f$ は多項式で、指数関数も整関数ですから、$G(z)=e^{-z}F_f(z)$ は全平面で正則です。[微分和の望遠鏡恒等式](#prop-trn4-telescoping)から $G'(z)=-e^{-z}f(z)$ であり、線分 $\gamma_{a,b}$ は区分的 $C^1$ 曲線なので、[CA2の複素線積分の基本定理](../../../解析系/CA/CA2/index.md#thm-ca2-fundamental-theorem)を $G'$ と $\gamma_{a,b}$ に適用できます。よって

$$
\begin{aligned}
e^{-b}F_f(b)-e^{-a}F_f(a)
&=G(b)-G(a)\\
&=\int_a^bG'(z)\,dz\\
&=-\int_a^b e^{-z}f(z)\,dz.
\end{aligned}
$$

左右に $-1$ を掛け、次に $e^{a+b}$ を掛けます。指数関数の加法公式により $e^{a+b}e^{-a}=e^b$, $e^{a+b}e^{-b}=e^a$ なので、

$$
\begin{aligned}
e^bF_f(a)-e^aF_f(b)
&=e^{a+b}\int_a^b e^{-z}f(z)\,dz\\
&=\int_a^b e^{a+b-z}f(z)\,dz.
\end{aligned}
$$

最後は一定の複素数 $e^{a+b}$ を線積分の中へ移しただけです。$a=0$ とすると $e^0=1$ なので、第二式も成立します。$a=b$ の場合は左辺が0で、右辺も定義より0です。
<!-- proof-end -->

定理の指数 $a+b-z$ は、端点の二つの指数を相殺せずに残すためのものです。符号を記憶する代わりに、$G(b)-G(a)$ の順から導けば間違えません。

### 具体例：二次式・三次式を端点に代入する

二次式 $f(z)=z(z-1)=z^2-z$ なら、$f'=2z-1$, $f''=2$ で

$$
F_f(z)=z^2+z+1,\qquad F_f(0)=1,\qquad F_f(1)=3.
$$

定理に $a=0,b=1$ を代入すれば

$$
e-3=\int_0^1 e^{1-x}x(x-1)\,dx.
$$

これは[TRN3の実区間での恒等式](../TRN3/index.md#prop-trn3-preview-identity)の具体例と一致します。

次に $f(z)=z^2(z-1)=z^3-z^2$ とすると

$$
\begin{aligned}
f'&=3z^2-2z,&f''&=6z-2,&f'''&=6,\\
F_f(z)&=z^3+2z^2+4z+4.
\end{aligned}
$$

$F_f(0)=4$, $F_f(1)=11$ なので

$$
4e-11=\int_0^1e^{1-x}x^2(x-1)\,dx.
$$

両例とも $0<x<1$ では被積分関数が負です。微分和の次数や端点値が違っても、同じ定理を適用できます。

## 3. 線分パラメータから絶対値上界を得る

積分恒等式はそれ自体では超越性の矛盾を与えません。右辺の絶対値がどれだけ小さくなるかを、定数の依存関係も含めて調べます。

線分上の点 $z=a+t(b-a)$ に対し、

$$
a+b-z=(1-t)b+ta
$$

です。[複素指数関数の絶対値公式](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)により、

$$
|e^{a+b-z}|
=e^{(1-t)\operatorname{Re}b+t\operatorname{Re}a}
\le e^{\max(\operatorname{Re}a,\operatorname{Re}b)}.
$$

最後の不等式では $0\le t\le1$ による実部の凸結合を使いました。曲線が実軸上にあるとは仮定していません。

<a id="prop-trn4-segment-bound"></a>

<!-- formal-statement-start -->
> **命題（複素線分上の積分上界）**  
> $f\in\mathbb C[z]$、$a,b\in\mathbb C$ とし、$F_f$ を有限微分和とする。線分上の最大値を

$$
M_{a,b}(f)=\max_{0\le t\le1}|f(a+t(b-a))|
$$

> とすると、次の上界が成立する。

$$
|e^bF_f(a)-e^aF_f(b)|
\le |b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}M_{a,b}(f).
$$
<!-- formal-statement-end -->

### 証明の見取り図

線分積分を実パラメータ $t$ に戻すと $b-a$ が係数に現れます。指数関数の大きさを実部で評価し、多項式部分を線分上の最大値で押さえます。

<!-- proof-start -->
### 証明

多項式 $f$ は連続で、$t\mapsto a+t(b-a)$ も連続なので、$t\in[0,1]$ 上の $|f(a+t(b-a))|$ は最大値 $M_{a,b}(f)$ を持ちます。[Hermiteの複素端点積分恒等式](#thm-trn4-complex-endpoint)と[CA2の複素線積分の定義](../../../解析系/CA/CA2/index.md#def-ca2-line-integral)を続けて使い、

$$
\begin{aligned}
|e^bF_f(a)-e^aF_f(b)|
&=\left|(b-a)\int_0^1
e^{(1-t)b+ta}f(a+t(b-a))\,dt\right|\\
&\le |b-a|\int_0^1
e^{(1-t)\operatorname{Re}b+t\operatorname{Re}a}
|f(a+t(b-a))|\,dt\\
&\le |b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}
M_{a,b}(f)\int_0^1dt\\
&=|b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}
M_{a,b}(f).
\end{aligned}
$$

第二行は複素数値積分の三角不等式で、[CA2のML評価](../../../解析系/CA/CA2/index.md#thm-ca2-reparam-ml)とも一致します。$a=b$ なら左辺と右辺の双方が0です。
<!-- proof-end -->

### 複素端点の直接計算

$f(z)=z$ なら $F_f(z)=z+1$ です。$a=0,b=i$ とすると

$$
e^i-(1+i)=\int_0^i e^{i-z}z\,dz.
$$

線分を $z=it$ と置けば $dz=i\,dt$、$e^{i-z}=e^{i(1-t)}$ なので

$$
\int_0^i e^{i-z}z\,dz
=\int_0^1 e^{i(1-t)}(it)i\,dt
=-\int_0^1 t\,e^{i(1-t)}\,dt.
$$

ここでは指数の実部が0です。したがって

$$
|e^i-1-i|\le\int_0^1t\,dt=\frac12.
$$

端点が複素数でも、被積分関数の絶対値は実区間上で比較できます。虚数の積分路を実区間だと取り違えていないことに注意してください。

## 4. 階乗で小さくする仕掛け

今後は素数 $p$ を動かし、多項式を $(p-1)!$ で割ります。この形がなぜ効くかは、まず最小の二点で確かめられます。整数 $p\ge2$ に対して

$$
f_p(z)=\frac{z^{p-1}(z-1)^p}{(p-1)!},
\qquad F_p=F_{f_p}
$$

とします。**$f_p$ 自身が整数係数であるとは主張しません。** 分母の階乗は微分値の算術性を後で調べるためにも重要です。

実線分 $0\le x\le1$ では $|x|\le1$ かつ $|x-1|\le1$ なので、

$$
|f_p(x)|=\frac{x^{p-1}(1-x)^p}{(p-1)!}
\le\frac1{(p-1)!}.
$$

[複素端点積分恒等式](#thm-trn4-complex-endpoint)に $a=0,b=1$ を、[積分上界](#prop-trn4-segment-bound)に $M_{0,1}(f_p)\le1/(p-1)!$ を代入すると

$$
eF_p(0)-F_p(1)=\int_0^1e^{1-x}f_p(x)\,dx,
\qquad
|eF_p(0)-F_p(1)|\le\frac e{(p-1)!}.
$$

さらに $f_p(x)>0$（$0<x<1$）なので、左辺は正です。右辺は $p\to\infty$ で0へ近づきます。ただし左辺の $eF_p(0)-F_p(1)$ を**通常の整数と決めつけてはいけません**。微分値そのものの整数性と、仮定した指数の代数関係を組み合わせて非零整数を作るのは後の段階です。

より一般に、端点 $a,b$ を固定し、多項式 $P_p$ に対してある **$p$ に依存しない** $M,D>0$ が

$$
\max_{0\le t\le1}|P_p(a+t(b-a))|\le MD^p
$$

を満たすなら、$f_p=P_p/(p-1)!$ に[積分上界](#prop-trn4-segment-bound)を適用して

$$
|e^bF_{f_p}(a)-e^aF_{f_p}(b)|
\le C\frac{D^p}{(p-1)!},
\qquad
C=|b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}M
$$

を得ます。$C$ も $p$ には依存しません。この区別があれば、[TRN3の非零整数と階乗上界の補題](../TRN3/index.md#lem-trn3-integer-squeeze)を適用するために、**さらに何を算術的に証明する必要があるか**が見えます。

## 5. 演習：導関数、積分路、上界を一つずつ接続する

### Level A：式と向きを自分の手で確認する

**TRN4-A1（二次多項式の微分和）**  
$f(z)=2z^2-z+1$ に対する有限微分和 $F_f$ を求め、$F_f-F_f'=f$ を直接確かめてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$f'=4z-1$, $f''=4$, $f'''=0$ なので次数2までを足して

$$
F_f=(2z^2-z+1)+(4z-1)+4=2z^2+3z+4.
$$

$F_f'=4z+3$ だから

$$
F_f-F_f'=(2z^2+3z+4)-(4z+3)=2z^2-z+1=f.
$$

最後の $f'''=0$ によって有限和の相殺が閉じます。
<!-- solution-end -->

**TRN4-A2（三次多項式の端点）**  
$f(z)=z^2(z-1)$ とするとき $F_f(0)$ と $F_f(1)$ を求め、端点恒等式の左辺を計算してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$f=z^3-z^2$ から $f'=3z^2-2z$, $f''=6z-2$, $f'''=6$ となります。よって

$$
F_f=(z^3-z^2)+(3z^2-2z)+(6z-2)+6
=z^3+2z^2+4z+4.
$$

$F_f(0)=4$, $F_f(1)=1+2+4+4=11$。$a=0,b=1$ なので左辺は $eF_f(0)-F_f(1)=4e-11$ です。[端点積分恒等式](#thm-trn4-complex-endpoint)による右辺は $\int_0^1e^{1-x}x^2(x-1)\,dx$ で、指数の順序も一致します。
<!-- solution-end -->

**TRN4-A3（積分路の逆向き）**  
$f(z)=1$ とし、端点を $a=1$, $b=0$ の順で取ります。恒等式の両辺を直接計算し、符号が合うことを確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

次数0なので $F_f(z)=1$。左辺は $e^0F_f(1)-e^1F_f(0)=1-e$ です。右辺は $a+b=1$ だから

$$
\int_1^0e^{1-z}\,dz
=\left[-e^{1-z}\right]_{z=1}^{z=0}
=-e+1=1-e.
$$

積分の向きを $0$ から $1$ と誤読すると $e-1$ になり、左辺と一致しません。
<!-- solution-end -->

**TRN4-A4（虚軸線分の長さと評価）**  
$f(z)=z$, $a=0$, $b=i$ のとき、$z=it$ による線積分表示を作り、$|e^i-1-i|\le1/2$ を証明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$f'=1$ なので $F_f=z+1$ です。[端点恒等式](#thm-trn4-complex-endpoint)から左辺の差は $e^iF_f(0)-F_f(i)=e^i-1-i$ です。線分 $z=it$ は $0\le t\le1$、速度は $i$ だから

$$
e^i-1-i
=\int_0^1e^{i-it}(it)i\,dt
=-\int_0^1t e^{i(1-t)}\,dt.
$$

$|e^{i(1-t)}|=1$ なので、積分の三角不等式から

$$
|e^i-1-i|\le\int_0^1t\,dt=\frac12.
$$

線分の長さ $|i|=1$ を積分変数の係数に含めています。
<!-- solution-end -->

### Level B：複素端点と既習定理を接続する

**TRN4-B1（一般の複素端点）**  
$f(z)=z^2$, $a=1+i$, $b=2-i$ とします。$F_f(a),F_f(b)$ を求め、線分パラメータを用いて端点差を積分に直してください。さらに $|a+t(b-a)|\le|a|+|b-a|$ から明示的な上界を出してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$f'=2z$, $f''=2$ より $F_f=z^2+2z+2$。$a^2=2i$, $b^2=3-4i$ だから

$$
F_f(a)=2i+2(1+i)+2=4+4i,
\qquad
F_f(b)=3-4i+2(2-i)+2=9-6i.
$$

$b-a=1-2i$ として線分を $z=1+i+t(1-2i)$ と取ると、[端点恒等式](#thm-trn4-complex-endpoint)より

$$
\begin{aligned}
&e^{2-i}(4+4i)-e^{1+i}(9-6i)\\
&\qquad=(1-2i)\int_0^1
e^{(1-t)(2-i)+t(1+i)}
(1+i+t(1-2i))^2\,dt.
\end{aligned}
$$

$0\le t\le1$ で $\operatorname{Re}z=1+t\le2$、かつ $|z|\le |a|+|b-a|=\sqrt2+\sqrt5$。よって[積分上界](#prop-trn4-segment-bound)から

$$
|e^{2-i}(4+4i)-e^{1+i}(9-6i)|
\le\sqrt5\,e^2(\sqrt2+\sqrt5)^2.
$$

粗い上界でも $a,b$ と $f$ のみから決まり、線分の長さの因子 $\sqrt5$ が欠けていません。
<!-- solution-end -->

**TRN4-B2（折れ線と直線の積分）**  
$f(z)=z^2$、始点 $a=0$、終点 $b=1+i$ とします。被積分関数 $e^{a+b-z}f(z)$ を、直線経路と $0\to1\to1+i$ の折れ線経路で積分した値が等しいことを証明し、その共通値を端点の微分和で表してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$f(z)=z^2$ に対し $F_f=z^2+2z+2$ で、[微分和の望遠鏡恒等式](#prop-trn4-telescoping)から

$$
\frac{d}{dz}\bigl(-e^{a+b-z}F_f(z)\bigr)
=e^{a+b-z}f(z)
$$

です。ここで $a+b=1+i$ は定数です。右辺の関数は全平面でこの原始関数を持つので、[CA2の複素線積分の基本定理](../../../解析系/CA/CA2/index.md#thm-ca2-fundamental-theorem)を直線と折れ線の各区間に適用できます。折れ線では中間点 $1$ での原始関数値が足し合わせたとき相殺します。したがって両経路の積分は端点差だけに等しくなります。

$F_f(0)=2$、$(1+i)^2=2i$ より $F_f(1+i)=2i+2+2i+2=4+4i$ なので、共通値は

$$
e^{1+i}F_f(0)-e^0F_f(1+i)
=2e^{1+i}-(4+4i).
$$

直線という条件は上界を計算しやすくするためであり、原始関数がある限り端点恒等式そのものはこの折れ線でも成立します。
<!-- solution-end -->

**TRN4-B3（階乗型の上界と定数の量化）**  
固定した $a,b\in\mathbb C$ と $M,D>0$ に対し、各整数 $p\ge2$ の多項式 $P_p$ が線分上で $|P_p|\le MD^p$ を満たすとします。$f_p=P_p/(p-1)!$ による端点差を $CD^p/(p-1)!$ で評価し、$C$ が $p$ に依存しないことを示してください。$a=b$ も含めてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$f_p$ の線分上の最大値は $MD^p/(p-1)!$ 以下です。[積分上界](#prop-trn4-segment-bound)で $f=f_p$ と置くと、

$$
\begin{aligned}
|e^bF_{f_p}(a)-e^aF_{f_p}(b)|
&\le|b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}
\max_{\gamma_{a,b}}|f_p|\\
&\le|b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}
M\frac{D^p}{(p-1)!}.
\end{aligned}
$$

ゆえに $C=|b-a|e^{\max(\operatorname{Re}a,\operatorname{Re}b)}M$ と取れます。$a,b,M$ は最初に固定され、$p$ で動くのは $P_p,f_p$ のみです。$a=b$ なら端点差は0で、$C=0$ として不等式は成立します。$C>0$ が必要な応用では、$a=b$ は別に自明な場合として扱います。
<!-- solution-end -->

### Level C：恒等式の算術側と解析側を切り分ける

**TRN4-C1（二点の補助多項式を組み立てる）**  
整数 $p\ge2$ について

$$
f_p(z)=\frac{z^{p-1}(z-1)^p}{(p-1)!},
\qquad F_p=\sum_{k=0}^{2p-1}f_p^{(k)}
$$

と置きます。(1) $F_p(0),F_p(1)$ が整数であることを、各端点での多項式展開から示してください。(2) $F_p(0)\equiv(-1)^p\pmod p$, $F_p(1)\equiv0\pmod p$ を示してください。(3) $0<|eF_p(0)-F_p(1)|\le e/(p-1)!$ を示し、その符号も判定してください。(4) それでも、この三事実だけで $e$ の超越性が証明されたとは言えない理由を述べてください。

- Level: C

<!-- solution-start -->
**詳細解答**

(1)(2) まず $z=0$ のまわりで二項展開すると

$$
f_p(z)=\frac1{(p-1)!}
\sum_{j=0}^p {p\choose j}(-1)^{p-j}z^{p-1+j}.
$$

次数 $p-1$ 未満の導関数は0です。$k=p-1+j$（$0\le j\le p$）の導関数の $z=0$ での値は

$$
f_p^{(p-1+j)}(0)
=\frac{(p-1+j)!}{(p-1)!}{p\choose j}(-1)^{p-j}.
$$

$j=0$ なら $(-1)^p$。$j\ge1$ なら階乗比は

$$
\frac{(p-1+j)!}{(p-1)!}=p(p+1)\cdots(p-1+j)
$$

で、$p$ の倍数です。すべて整数であることも分かります。よって導関数値の和は

$$
F_p(0)\in\mathbb Z,\qquad F_p(0)\equiv(-1)^p\pmod p.
$$

一方、$w=z-1$ と置いて $z^{p-1}=(1+w)^{p-1}$ を展開すると

$$
f_p(1+w)=\frac1{(p-1)!}
\sum_{j=0}^{p-1}{p-1\choose j}w^{p+j}.
$$

$k<p$ の導関数は $z=1$ で0です。$k=p+j$（$0\le j\le p-1$）では

$$
f_p^{(p+j)}(1)
=\frac{(p+j)!}{(p-1)!}{p-1\choose j},
$$

となり、階乗比が $p(p+1)\cdots(p+j)$ なので整数で $p$ の倍数です。したがって

$$
F_p(1)\in p\mathbb Z.
$$

(3) $0<x<1$ では $x^{p-1}>0$ かつ $(x-1)^p$ の符号は $(-1)^p$ です。したがって被積分関数の符号は $(-1)^p$ で一定であり、積分は0ではありません。絶対値では $|x^{p-1}(x-1)^p|\le1$ なので、[端点恒等式](#thm-trn4-complex-endpoint)と[線分上界](#prop-trn4-segment-bound)から

$$
0<\bigl|eF_p(0)-F_p(1)\bigr|
=\left|\int_0^1e^{1-x}f_p(x)\,dx\right|
\le\frac e{(p-1)!}.
$$

この差の符号は $(-1)^p$ です。すなわち $(-1)^p(eF_p(0)-F_p(1))>0$。符号なしで正とするのは $p$ が偶数のときだけで、奇数では負になります。

(4) $F_p(0)$ と $F_p(1)$ は整数ですが、$eF_p(0)-F_p(1)$ は整数とは限りません。例えば $e$ が有理数ではないことは[TRN3の定理](../TRN3/index.md#thm-trn3-e-irrational)で既に証明されています。ゆえに一般には $eF_p(0)$ は通常の整数ではありません。[非零整数と階乗上界の補題](../TRN3/index.md#lem-trn3-integer-squeeze)の前提である「**差そのものが非零整数**」をまだ得ていないため、超越性の矛盾にはなりません。後で仮定する代数関係を組み合わせて初めて、この欠けた条件を作ります。
<!-- solution-end -->

## 6. 次章への接続

この章では **有限微分和 $F_f$、複素端点の積分恒等式、線分上界**を一つにつなぎました。$F_f(a),F_f(b)$ は多項式の導関数値から計算でき、他方その指数付きの差は、分母に階乗を持つ小さい積分で表せます。

[TRN3の階乗上界と非零整数の補題](../TRN3/index.md#lem-trn3-integer-squeeze)を使って超越性を得るには、依然として整数性・非零性を同一の補助量で証明する必要があります。次のTRN5では多重点 $0,1,\ldots,n$ と素数 $p$ を使い、この算術側を構成します。
