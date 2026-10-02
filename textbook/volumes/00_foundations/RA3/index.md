# RA3 標準実解析 III：微分法の理論

高校微積分で使った公式を、微分法の基本定理を積み上げる流れから組み直します。

---

## 1. 導関数と微分可能性

<a id="def-ra3-derivative"></a>
<!-- formal-statement-start -->
> **定義（導関数）**  
$$
f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}
$$
> が有限値として存在するとき、$f$ は $a$ で微分可能という。
<!-- formal-statement-end -->

### 微分可能なら連続

$f$ が $a$ で微分可能なら
$$
\frac{f(a+h)-f(a)}h\to f'(a).
$$
収束する量は $h=0$ の近くで有界なので、ある $M>0$ と十分小さい $|h|$ に対して
$$
\left|\frac{f(a+h)-f(a)}h\right|\le M.
$$
したがって
$$
|f(a+h)-f(a)|
\le M|h|\to0.
$$
よって $f(a+h)\to f(a)$、すなわち $f$ は $a$ で連続です。

逆は偽です。$|x|$ は0で連続ですが、右差商は1、左差商は $-1$ なので微分可能ではありません。

### 積の微分公式を定義から確認する

$f,g$ が $a$ で微分可能なら
$$
\frac{f(a+h)g(a+h)-f(a)g(a)}h
$$
に $f(a+h)g(a)$ を足して引くと
$$
\frac{f(a+h)-f(a)}h\,g(a+h)
+f(a)\frac{g(a+h)-g(a)}h.
$$
微分可能性から $f,g$ は連続なので $g(a+h)\to g(a)$。したがって極限を取れば
$$
(fg)'(a)=f'(a)g(a)+f(a)g'(a).
$$

### 連鎖律を定義から確認する

$f$ が $a$ で微分可能、$g$ が $f(a)$ で微分可能とします。$u_h=f(a+h)-f(a)$ と置くと、$f$ の連続性から $u_h\to0$ です。

$$
Q(u)=
\begin{cases}
\dfrac{g(f(a)+u)-g(f(a))}{u},&u\ne0,\\[6pt]
g'(f(a)),&u=0
\end{cases}
$$
と定めれば、$g$ の微分可能性から $Q(u)\to g'(f(a))$ です。また $u_h=0$ の場合も上の定義なら同じ式で扱えて
$$
\frac{g(f(a+h))-g(f(a))}{h}
=Q(u_h)\frac{f(a+h)-f(a)}h.
$$
したがって $h\to0$ とすると
$$
(g\circ f)'(a)=g'(f(a))f'(a).
$$
この連鎖律が、次章で扱う積分公式の証明で使われます。

<!-- definition-example-start: def-ra3-derivative -->
**定義の確認**：$f(x)=x^2$ では
$$
\frac{f(a+h)-f(a)}h
=\frac{(a+h)^2-a^2}{h}
=2a+h\to2a
$$
なので、導関数の定義から $f'(a)=2a$ です。逆に $f(x)=|x|$ を $a=0$ で見ると
$$
\frac{|h|-0}{h}
=
\begin{cases}
1,&h>0,\\
-1,&h<0,
\end{cases}
$$
となり左右の極限が一致しないため、0では微分不能です。
<!-- definition-example-end -->

### 高階導関数と $C^k$ 級

Taylorの定理のように高階導関数を使う前に、ここで記法を固定します。「微分できる」と「導関数まで連続である」は別の条件です。

<a id="def-ra3-higher-derivative"></a>
<!-- formal-statement-start -->
> **定義（高階導関数）**  
> 開区間 $I\subset\mathbb R$ 上の関数 $f$ について、$f'=f^{(1)}$ とし、$f^{(j)}$ が微分可能なら
$$
f^{(j+1)}=(f^{(j)})'
$$
> と帰納的に定める。$f^{(0)}=f$ と約束する。
<!-- formal-statement-end -->

したがって $f''=f^{(2)}$、$f'''=f^{(3)}$ です。「$k$ 回微分可能」とは $f^{(k)}$ まで存在することをいいますが、まだそれらの連続性までは要求していません。

<a id="def-ra3-ck-class"></a>
<!-- formal-statement-start -->
> **定義（C^k級・C∞級）**  
> 開区間 $I\subset\mathbb R$ と整数 $k\ge0$ に対し、$f:I\to\mathbb R$ が **$C^k$ 級**であるとは、$0\le j\le k$ の各 $j$ について $f^{(j)}$ が存在し連続であることをいう。そのような関数全体を $C^k(I)$ と書く。すべての整数 $k\ge0$ について $C^k$ 級である関数を **$C^\infty$ 級**または **滑らかな関数**という。
<!-- formal-statement-end -->

特に
$$
C^0(I)=\{\text{$I$ 上の連続関数}\},
$$
$$
C^1(I)=\{\text{$I$ 上で微分可能で、$f'$ も連続な関数}\}.
$$
また定義から
$$
C^{k+1}(I)\subset C^k(I),
\qquad
C^\infty(I)=\bigcap_{k=0}^{\infty}C^k(I)
$$
です。ここで重要なのは、**微分可能であることだけでは $C^1$ 級とは限らない**ことです。

閉区間 $[a,b]$ に対して $C^k([a,b])$ と書くときは、$(a,b)$ で $k$ 回微分可能で、$f,f',\ldots,f^{(k)}$ が端点まで連続に延長できる、という意味で用います。

<!-- definition-example-start: def-ra3-higher-derivative, def-ra3-ck-class -->
**定義の確認**：多項式や指数関数 $e^x$ は何回微分しても連続な導関数を持つので $C^\infty$ 級です。一方
$$
f(x)=
\begin{cases}
x^2\sin(1/x),&x\ne0,\\
0,&x=0
\end{cases}
$$
を考えます。$x=0$ では
$$
\frac{f(h)-f(0)}h=h\sin(1/h)\to0
$$
なので $f'(0)=0$ です。$x\ne0$ では
$$
f'(x)=2x\sin(1/x)-\cos(1/x).
$$
ところが $x_n=1/(2\pi n)\to0$ とすると
$$
f'(x_n)=-1
$$
なので $f'(x)\to f'(0)=0$ ではありません。したがって $f$ は実数全体で微分可能ですが $C^1$ 級ではありません。
<!-- definition-example-end -->

$C^\infty$ 級であることも、関数がTaylor級数と一致することまでは意味しません。Taylor**級数**との一致には、後で述べるように剰余項が次数とともに0へ行くことを別途確認する必要があります。

---

## 2. Rolleから平均値定理へ

<a id="thm-ra3-rolle"></a>
<!-- formal-statement-start -->
> **定理（Rolleの定理）**  
> $f$ が $[a,b]$ で連続、$(a,b)$ で微分可能、かつ $f(a)=f(b)$ なら、ある $c\in(a,b)$ が存在して $f'(c)=0$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Weierstrassの最大最小定理](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md#thm-f0-00c2-01) により、$f$ は $[a,b]$ 上で最大値と最小値を取ります。

$f$ が定数関数なら任意の $c\in(a,b)$ で $f'(c)=0$ なので終了です。以下、$f$ は定数でないとします。このとき最大値と最小値は異なります。しかも $f(a)=f(b)$ なので、最大値または最小値の少なくとも一方は端点値 $f(a)=f(b)$ と異なります。その極値を取る点は端点ではあり得ないので、ある $c\in(a,b)$ で極大または極小を取ります。

例えば $c$ で極大を取るとします。十分小さい $h>0$ に対して
$$
f(c+h)-f(c)\le0
$$
なので
$$
\frac{f(c+h)-f(c)}h\le0.
$$
一方、十分小さい $h<0$ では同じく分子は0以下ですが分母が負なので
$$
\frac{f(c+h)-f(c)}h\ge0.
$$
$f'(c)$ が存在するため左右の差商は同じ極限へ行きます。その極限は一方から0以下、他方から0以上でなければならないので $f'(c)=0$ です。極小の場合も不等号を逆にすれば同じ結論です。$\square$
<!-- proof-end -->

<a id="thm-ra3-mvt"></a>
<!-- formal-statement-start -->
> **定理（平均値定理）**  
> $f$ が $[a,b]$ で連続、$(a,b)$ で微分可能なら、ある $c\in(a,b)$ が存在して
$$
f'(c)=\frac{f(b)-f(a)}{b-a}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

端点 $(a,f(a))$, $(b,f(b))$ を結ぶ直線を引き、それを $f$ から差し引きます。具体的に
$$
g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)
$$
と置きます。すると
$$
g(a)=0,
$$
かつ
$$
g(b)=f(b)-f(a)-\frac{f(b)-f(a)}{b-a}(b-a)=0.
$$
したがって [Rolleの定理](#thm-ra3-rolle) により、ある $c\in(a,b)$ が存在して $g'(c)=0$ です。一方
$$
g'(c)=f'(c)-\frac{f(b)-f(a)}{b-a},
$$
なので
$$
f'(c)=\frac{f(b)-f(a)}{b-a}.
$$
$\square$
<!-- proof-end -->

この定理から、例えば $f'\ge0$ なら単調増加です。実際 $x<y$ に [平均値定理](#thm-ra3-mvt) を適用すると
$$
f(y)-f(x)=f'(c)(y-x)\ge0.
$$
また $|f'|\le M$ なら
$$
|f(x)-f(y)|=|f'(c)||x-y|\le M|x-y|
$$
なので $f$ はLipschitz連続です。

<a id="thm-ra3-cauchy-mvt"></a>
<!-- formal-statement-start -->
> **定理（Cauchyの平均値定理）**  
> $f,g$ が $[a,b]$ で連続、$(a,b)$ で微分可能なら、ある $c\in(a,b)$ が存在して
$$
(f(b)-f(a))g'(c)=(g(b)-g(a))f'(c).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの増分を消し合わせる補助関数
$$
H(x)
=(f(b)-f(a))(g(x)-g(a))
-(g(b)-g(a))(f(x)-f(a))
$$
を考えます。$x=a$ では両括弧が0なので $H(a)=0$ です。また $x=b$ では
$$
H(b)
=(f(b)-f(a))(g(b)-g(a))
-(g(b)-g(a))(f(b)-f(a))=0.
$$
したがって [Rolleの定理](#thm-ra3-rolle) から、ある $c\in(a,b)$ で $H'(c)=0$ です。微分すると
$$
H'(c)
=(f(b)-f(a))g'(c)
-(g(b)-g(a))f'(c),
$$
よって主張が従います。$\square$
<!-- proof-end -->

二つの関数の増分比を導関数比へつなぐ形で、極限計算の理論的な土台になります。

---

## 3. Taylorの定理

<a id="thm-ra3-taylor"></a>
<!-- formal-statement-start -->
> **定理（Taylorの定理：Lagrange剰余）**  
> $f$ が $a$ と $x$ を含む開区間で $C^{n+1}$ 級なら、ある $\xi$ が $a$ と $x$ の間に存在して
$$
f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k
+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x=a$ なら剰余項は0で自明なので $x\ne a$ とします。$n$ 次Taylor多項式を
$$
P_n(t)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(t-a)^k
$$
とし、実際の誤差を
$$
R=f(x)-P_n(x)
$$
と置きます。次の補助関数を考えます。
$$
\Phi(t)
=f(t)-P_n(t)-R\left(\frac{t-a}{x-a}\right)^{n+1}.
$$
$t=x$ を代入すると $\Phi(x)=0$ です。またTaylor多項式の作り方から
$$
\Phi(a)=\Phi'(a)=\cdots=\Phi^{(n)}(a)=0.
$$

ここで [Rolleの定理](#thm-ra3-rolle) を繰り返します。まず $\Phi(a)=\Phi(x)=0$ から、$a$ と $x$ の間に $\xi_1$ が存在して $\Phi'(\xi_1)=0$。さらに $\Phi'(a)=\Phi'(\xi_1)=0$ なので、再び同じ定理からその間に $\xi_2$ が存在して $\Phi''(\xi_2)=0$。これを $n+1$ 回繰り返すと、$a$ と $x$ の間にある $\xi$ が存在して
$$
\Phi^{(n+1)}(\xi)=0
$$
となります。

$P_n$ は $n$ 次多項式なので $P_n^{(n+1)}=0$ です。また
$$
\frac{d^{n+1}}{dt^{n+1}}
\left(\frac{t-a}{x-a}\right)^{n+1}
=\frac{(n+1)!}{(x-a)^{n+1}}.
$$
したがって
$$
0=\Phi^{(n+1)}(\xi)
=f^{(n+1)}(\xi)-R\frac{(n+1)!}{(x-a)^{n+1}}.
$$
これを $R$ について解くと
$$
R=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}.
$$
$R=f(x)-P_n(x)$ だったので、主張の公式を得ます。$\square$
<!-- proof-end -->

有限次のTaylor定理は剰余項込みの厳密な等式です。一方、Taylor**級数**と関数が一致するには、次数 $n\to\infty$ で剰余項が0へ行くことを別に確認する必要があります。

---

## 4. 逆関数の微分

<a id="thm-ra3-inverse"></a>
<!-- formal-statement-start -->
> **定理（逆関数の微分）**  
> $f$ が単調で逆関数を持ち、$f$ が $a$ で微分可能、$f'(a)\ne0$、逆関数が $b=f(a)$ で連続なら
$$
(f^{-1})'(b)=\frac1{f'(a)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g=f^{-1}$ と置きます。$y\to b$ で $y\ne b$ とし、
$$
x=g(y)
$$
と置けば $f(x)=y$、また $g(b)=a$ です。$g$ は $b$ で連続なので
$$
y\to b\Longrightarrow x=g(y)\to g(b)=a.
$$
さらに $y\ne b$ なら、$f$ が単射なので $x\ne a$ です。したがって逆関数の差商は
$$
\frac{g(y)-g(b)}{y-b}
=\frac{x-a}{f(x)-f(a)}
=\frac1{\dfrac{f(x)-f(a)}{x-a}}.
$$
$x\to a$ のとき分母は $f'(a)$ に収束し、しかも $f'(a)\ne0$ なので逆数の極限を取れます。よって
$$
g'(b)=\frac1{f'(a)}.
$$
$\square$
<!-- proof-end -->

公式を暗記するより、**逆関数の差商が元の差商の逆数になる**ことを押さえるのが本体です。

---

## 5. 演習

### Level A

<a id="ex-ra3-a01"></a>
#### RA3-A01 Rolle
- Level: A

$f(x)=x^2-1$ を $[-1,1]$ に制限したとき、Rolleの定理が与える点を求めよ。

<!-- solution-start -->
**解答**：$f$ は多項式なので $[-1,1]$ で連続、$(-1,1)$ で微分可能です。また
$$
f(-1)=0=f(1).
$$
したがって [Rolleの定理](#thm-ra3-rolle) を適用できます。導関数は
$$
f'(x)=2x
$$
なので $f'(c)=0$ を満たす点は $c=0$ です。
<!-- solution-end -->

<a id="ex-ra3-a02"></a>
#### RA3-A02 平均値定理
- Level: A

$f(x)=\log x$ を $[1,e]$ に適用したときの $c$ を求めよ。

<!-- solution-start -->
**解答**：平均変化率は
$$
\frac{\log e-\log1}{e-1}=\frac1{e-1}.
$$
[平均値定理](#thm-ra3-mvt) から、ある $c\in(1,e)$ で
$$
f'(c)=\frac1c=\frac1{e-1}
$$
となります。したがって
$$
c=e-1.
$$
実際 $1<e-1<e$ なので区間内にあります。
<!-- solution-end -->

<a id="ex-ra3-a03"></a>
#### RA3-A03 Lipschitz評価
- Level: A

$|\sin x-\sin y|\le|x-y|$ を示せ。

<!-- solution-start -->
**解答**：$x=y$ なら自明です。$x\ne y$ とすると、$x,y$ の間の閉区間に [平均値定理](#thm-ra3-mvt) を適用して、ある $c$ が存在し
$$
\sin x-\sin y=\cos c\,(x-y)
$$
となります。絶対値を取って $|\cos c|\le1$ を使えば
$$
|\sin x-\sin y|
=|\cos c|\,|x-y|
\le|x-y|.
$$
<!-- solution-end -->

<a id="ex-ra3-a04"></a>
#### RA3-A04 Taylor
- Level: A

$e^x$ を0のまわりで2次まで展開し、剰余項を書け。

<!-- solution-start -->
**解答**：$f(x)=e^x$ ではすべての導関数が $e^x$ で、$f^{(k)}(0)=1$ です。[Taylorの定理](#thm-ra3-taylor) を $a=0$, $n=2$ に適用すると、0と $x$ の間のある $\xi$ に対して
$$
e^x
=1+x+\frac{x^2}{2}
+\frac{e^{\xi}}{3!}x^3.
$$
<!-- solution-end -->

<a id="ex-ra3-a05"></a>
#### RA3-A05 $C^k$ 級の判定
- Level: A

次の関数について、指定された性質を判定せよ。

1. $f(x)=x^3$ は $C^\infty(\mathbb R)$ に属するか。
2. $g(x)=|x|$ は $C^1(\mathbb R)$ に属するか。
3. 本文の $h(x)=x^2\sin(1/x)$（$x\ne0$）、$h(0)=0$ は $C^1(\mathbb R)$ に属するか。

<!-- solution-start -->
**解答**：

1. 多項式は何回微分しても多項式になり、各導関数は連続です。したがって $f\in C^\infty(\mathbb R)$ です。
2. $|x|$ は0で微分可能でないので、そもそも $C^1$ 級の必要条件を満たしません。したがって $g\notin C^1(\mathbb R)$ です。
3. 本文で確認したように $h'(0)=0$ は存在しますが、$x_n=1/(2\pi n)\to0$ に沿って $h'(x_n)=-1$ となるため $h'$ は0で連続ではありません。したがって $h$ は微分可能ですが $h\notin C^1(\mathbb R)$ です。

この3例から「連続」「微分可能」「$C^1$ 級」「$C^\infty$ 級」は同じ条件ではなく、滑らかさの段階を表していることが分かります。
<!-- solution-end -->

### Level B

<a id="ex-ra3-b01"></a>
#### RA3-B01 導関数0なら定数
- Level: B

区間 $I$ 上で $f'(x)=0$ がすべての内部点で成り立つなら $f$ は定数であることを示せ。

<!-- solution-start -->
**解答**：任意の $x<y$ を $I$ から取ります。$[x,y]$ 上で [平均値定理](#thm-ra3-mvt) を適用すると、ある $c\in(x,y)$ が存在して
$$
f(y)-f(x)=f'(c)(y-x).
$$
仮定から $f'(c)=0$ なので $f(y)-f(x)=0$、すなわち $f(y)=f(x)$ です。任意の二点で値が等しいので $f$ は定数です。
<!-- solution-end -->

<a id="ex-ra3-b02"></a>
#### RA3-B02 指数関数の誤差
- Level: B

$0\le x\le1$ で $e^x-(1+x)\le ex^2/2$ を示せ。

<!-- solution-start -->
**解答**：[Taylorの定理](#thm-ra3-taylor) を $a=0$, $n=1$ に適用すると、0と $x$ の間のある $\xi$ に対して
$$
e^x=1+x+\frac{e^{\xi}}2x^2.
$$
$0\le x\le1$ なので $0\le\xi\le1$、したがって $e^{\xi}\le e$ です。よって
$$
e^x-(1+x)=\frac{e^{\xi}}2x^2\le\frac e2x^2.
$$
<!-- solution-end -->

<a id="ex-ra3-b03"></a>
#### RA3-B03 逆関数
- Level: B

$f(x)=x^3+x$ の逆関数 $g$ について $g'(0)$ を求めよ。

<!-- solution-start -->
**解答**：$f'(x)=3x^2+1>0$ なので $f$ は狭義単調増加で逆関数を持ちます。また $f(0)=0$ なので $g(0)=0$、
$$
f'(0)=1\ne0.
$$
[逆関数の微分](#thm-ra3-inverse) から
$$
g'(0)=\frac1{f'(0)}=1.
$$
<!-- solution-end -->

### Level C

<a id="ex-ra3-c01"></a>
#### RA3-C01 $e$ の近似誤差を保証する
- Level: C

$e$ を $\sum_{k=0}^{n}1/k!$ で近似する。誤差が $10^{-6}$ 未満になることを保証する十分な $n$ を求めよ。

<!-- solution-start -->
**解答**：$e=e^1$ に [Taylorの定理](#thm-ra3-taylor) を $a=0$, $x=1$ で適用すると、ある $\xi\in(0,1)$ が存在して
$$
e=\sum_{k=0}^{n}\frac1{k!}
+\frac{e^{\xi}}{(n+1)!}.
$$
したがって誤差 $R_n$ は
$$
0<R_n=\frac{e^{\xi}}{(n+1)!}<\frac e{(n+1)!}.
$$
$n=9$ とすれば $(n+1)!=10!=3628800$ なので
$$
R_9<\frac e{3628800}<7.5\times10^{-7}<10^{-6}.
$$
したがって $n=9$ で十分です。問題は「最小の $n$」ではなく「保証できる十分な $n$」を求めているので、この評価で目的を満たします。
<!-- solution-end -->

---

## 6. 次に進む

**次：[RA4 Riemann/Darboux積分・FTC](../RA4/index.md)**