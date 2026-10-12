# ANT1 算術関数の平均と部分和

整数 $n$ ごとに値を持つ[算術関数](../../NT/NT4/index.md#def-nt4-arithmetic-function)は、個々の値が激しく揺れることがあります。例えば約数の個数 $\tau(n)$ は素数なら $2$ ですが、約数の多い整数ではずっと大きくなります。それでも $n\le x$ の値を合計したら、増え方を簡潔な式で表せるのでしょうか。

[NT5の総和関数](../../NT/NT5/index.md#def-nt5-summatory-function)と[Dirichletの双曲線分割](../../NT/NT5/index.md#thm-nt5-hyperbola)は、整数を一度に数える方法を与えました。しかし「数えられる」ことと「主項が何で誤差がどの程度か」は別の問題です。この章では、和に滑らかな重みを付ける Abel の部分和公式、調和和の精密な評価、Möbius 反転を組み合わせて、約数個数関数と Euler の $\varphi$ 関数の平均を自力で導きます。

以下、$\mathbb N=\{1,2,\ldots\}$、$x\ge1$ は実数とします。$\lfloor x\rfloor$ は床関数、$\{x\}=x-\lfloor x\rfloor$ は小数部分です。$O(h(x))$ は十分大きい $x$ について絶対値が定数倍の $h(x)$ 以下という意味で用い、定数の独立性が必要なら明示します。

## 1. 一つずつの値ではなく平均を測る

$\tau(p)=2$ という事実を、すべての整数 $n$ について $\tau(n)\approx2$ と一般化することはできません。数の大小が不規則だからこそ、次のように総和で比較します。

<a id="def-ant1-mean-order"></a>

<!-- formal-statement-start -->
> **定義（算術関数の平均次数）**  
> 算術関数 $f:\mathbb N\to\mathbb R$ に対し、関数 $g:\mathbb N\to[0,\infty)$ が平均次数を与えるとは、

$$
G(x)=\sum_{n\le x}g(n)\longrightarrow\infty
$$

> であり、かつ次の漸近関係が成立することをいう。

$$
\sum_{n\le x}f(n)=G(x)+o(G(x))
\qquad(x\to\infty).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant1-mean-order -->
### 例：点ごとの等式でなくても平均は一致する

$f(n)=1+(-1)^n$、$g(n)=1$ とします。$G(x)=\lfloor x\rfloor$ は無限大へ発散します。一方、$N=\lfloor x\rfloor$ とすると、偶奇が対になって消えるので

$$
\sum_{n\le x}(-1)^n=
\begin{cases}
0 & (N\text{ が偶数}),\\
-1 & (N\text{ が奇数}).
\end{cases}
$$

従って $\sum_{n\le x}f(n)=N+O(1)=G(x)+o(G(x))$ です。偶数と奇数で $f(n)$ はそれぞれ $2$ と $0$ を取りますが、$g(n)=1$ は平均次数です。
<!-- definition-example-end -->

精度を比較するときは、総和を $F(x)=M(x)+E(x)$ と分け、$M$ を**主項**、$E$ を**誤差項**と呼びます。$F(x)\sim M(x)$ だけでなく $E(x)=O(\sqrt x)$ などが分かれば、近似のずれまで制御できます。主項の指定は一意とは限らず、どこまで小さい項を含めるかを明示する必要があります。

## 2. Abelの部分和公式――重み付き和への橋

いま総和 $A(x)=\sum_{n\le x}a(n)$ が分かっているとします。$\sum a(n)/n$ のような重み付き和を、$a(n)$ を一つずつ求め直さずに計算したい。そのために、有限和での部分積分を作ります。

<a id="thm-ant1-abel"></a>

<!-- formal-statement-start -->
> **定理（Abelの部分和公式）**  
> $a:\mathbb N\to\mathbb C$、$x\ge1$ とする。$A(t)=\sum_{1\le n\le t}a(n)$ と置く。$b:[1,x]\to\mathbb C$ が連続微分可能なら

$$
\sum_{1\le n\le x}a(n)b(n)
=A(x)b(x)-\int_1^x A(t)b'(t)\,dt.
$$

> 積分は実変数 $t$ について取る。$x=1$ の場合も成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$a(n)=A(n)-A(n-1)$ によって差を取り、重み $b$ を片方から他方へ移します。段階関数 $A(t)$ は区間 $[n,n+1)$ 上で一定なので、最後の差 $b(n)-b(n+1)$ を積分として書けます。

<!-- proof-start -->
### 証明

$N=\lfloor x\rfloor$、$A(0)=0$ とします。まず有限和を移項すると

$$
\begin{aligned}
\sum_{n=1}^Na(n)b(n)
&=\sum_{n=1}^N(A(n)-A(n-1))b(n)\\
&=A(N)b(N)+\sum_{n=1}^{N-1}A(n)(b(n)-b(n+1)).
\end{aligned}
$$

ここで $N=1$ なら第二の和は空和です。$b(n+1)-b(n)=\int_n^{n+1}b'(t)\,dt$ であり、$n\le t<n+1$ の範囲では $A(t)=A(n)$ です。よって

$$
\sum_{n=1}^{N-1}A(n)(b(n)-b(n+1))
=-\int_1^N A(t)b'(t)\,dt.
$$

次に $N\le x<N+1$ では新しい整数が現れないので $A(t)=A(N)$（$N\le t\le x$）です。従って

$$
-\int_N^x A(t)b'(t)\,dt
=-A(N)(b(x)-b(N)).
$$

前の有限和表示へこの式を加えると、$A(N)b(N)$ と $A(N)(b(N)-b(x))$ が合わせて $A(N)b(x)=A(x)b(x)$ となり、定理の式を得ます。整数の端点での $A$ の跳びは積分値を変えないため問題ありません。
<!-- proof-end -->

例えば $a(n)=(-1)^{n-1}$、$b(t)=1/t$、$x=4$ とします。$A(t)$ は $[1,2)$ と $[3,4)$ で $1$、$[2,3)$ と $t=4$ で $0$ です。$b'(t)=-t^{-2}$ なので

$$
\begin{aligned}
\sum_{n=1}^4\frac{(-1)^{n-1}}n
&=-\int_1^4A(t)(-t^{-2})\,dt\\
&=\int_1^2t^{-2}\,dt+\int_3^4t^{-2}\,dt\\
&=\frac12+\frac1{12}=\frac7{12}.
\end{aligned}
$$

直接計算した $1-\frac12+\frac13-\frac14=\frac7{12}$ と一致します。ここでは総和 $A$ が単純だったので、重み付き和へ切り替えても計算が増えません。

## 3. 調和和のずれからEuler定数へ

[双曲線分割](../../NT/NT5/index.md#thm-nt5-hyperbola)を約数個数関数へ使うと、$\sum_{d\le\sqrt x}\lfloor x/d\rfloor$ が現れます。床関数を $x/d$ に置き換えれば調和和が出ますが、この置換だけでは二次的な主項の定数が分かりません。

$a_n=H_n-\log n$、$H_n=\sum_{k=1}^n1/k$ を調べます。

<a id="def-ant1-euler-constant"></a>

<!-- formal-statement-start -->
> **定義（Euler定数）**  
> 正整数 $n$ に対して $H_n=\sum_{k=1}^{n}1/k$ とし、極限

$$
\gamma=\lim_{n\to\infty}(H_n-\log n)
$$

> が存在するとき、その値を Euler 定数と呼ぶ。次の補題で存在と誤差評価を示す。
<!-- formal-statement-end -->

<a id="lem-ant1-harmonic"></a>

<!-- formal-statement-start -->
> **補題（調和和の評価）**  
> 上の極限 $\gamma$ は存在する。任意の正整数 $m$ で

$$
0\le H_m-\log m-\gamma
\le\log(1+1/m)\le\frac1m.
$$

> 特に $H_m=\log m+\gamma+O(1/m)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

減少関数 $1/t$ の各単位区間での積分を、左端・右端の長方形で挟みます。上下に挟んだ二列の差が $1/m$ 以下へ縮まるため、共通の極限が得られます。

<!-- proof-start -->
### 証明

$t>0$ で $1/t$ は減少するので、整数 $k\ge1$ について

$$
\frac1{k+1}\le\int_k^{k+1}\frac{dt}t\le\frac1k
$$

が成り立ちます。$k=1,\ldots,m$ で和を取ると

$$
H_{m+1}-1\le\log(m+1)\le H_m.
$$

ここで $u_m=H_m-\log m$、$v_m=H_m-\log(m+1)$ と置きます。隣接差を直接計算すると

$$
u_{m+1}-u_m
=\frac1{m+1}-\log(1+1/m)\le0,
$$

$$
v_{m+1}-v_m
=\frac1{m+1}-\log(1+1/(m+1))\ge0.
$$

後者は $\log(1+h)\le h$ を $h=1/(m+1)$ に適用したものです。前者は区間 $[m,m+1]$ で $1/t\ge1/(m+1)$ となることから従います。また $0\le v_m\le u_m$ で、差は

$$
u_m-v_m=\log(1+1/m)\le1/m\longrightarrow0.
$$

従って $u_m$ は下に有界な単調減少列、$v_m$ は上に有界な単調増加列であり、[単調数列の収束](../../../基礎科目/RA/RA1/index.md#thm-ra1-monotone)による各極限は一致します。その共通値が $\gamma$ です。$v_m\le\gamma\le u_m$ から

$$
0\le H_m-\log m-\gamma\le u_m-v_m\le1/m
$$

を得ます。
<!-- proof-end -->

<!-- definition-example-start: def-ant1-euler-constant -->
### 例：有限の調和和から定数を挟む

$m=2$ なら $H_2=3/2$ です。補題の不等式に直接代入すれば

$$
\frac32-\log3\le\gamma\le\frac32-\log2.
$$

$H_2-\log2$ をそのまま $\gamma$ と同一視してはいけません。誤差が正であることと、その幅が $\log(3/2)$ 以下であることまで検査できました。
<!-- definition-example-end -->

## 4. 約数個数関数の平均――双曲線から主項へ

[約数個数関数](../../NT/NT4/index.md#def-nt4-divisor-functions)を $\tau(n)$ と書き、$D(x)=\sum_{n\le x}\tau(n)$ とします。[NT5の双曲線公式](../../NT/NT5/index.md#thm-nt5-hyperbola)は正確な有限和を与えます。その中の床関数の誤差を合計して、初めて漸近式になります。

<a id="thm-ant1-divisor-mean"></a>

<!-- formal-statement-start -->
> **定理（約数個数関数の平均）**  
> $x\ge1$、$D(x)=\sum_{n\le x}\tau(n)$ とし、$\gamma$ を Euler 定数とする。このとき $x\to\infty$ で

$$
D(x)=x\log x+(2\gamma-1)x+O(\sqrt x).
$$

> 特に $D(x)\sim x\log x$、および $D(x)/\lfloor x\rfloor\sim\log x$ である。
<!-- formal-statement-end -->

### 証明の見取り図

双曲線分割で長さ約 $x$ の和を長さ約 $\sqrt x$ の和へ縮めます。床関数を外したときの各誤差は $1$ 未満なので、合計しても $O(\sqrt x)$ です。調和和の補題が $2\gamma x$ を供給します。

<!-- proof-start -->
### 証明

$m=\lfloor\sqrt x\rfloor$ と置きます。[Dirichletの双曲線分割](../../NT/NT5/index.md#thm-nt5-hyperbola)を $f=g=1$ に適用し、$0\le\{y\}<1$ を使って

$$
\begin{aligned}
D(x)
&=2\sum_{d=1}^{m}\left\lfloor\frac xd\right\rfloor-m^2\\
&=2xH_m-m^2-2\sum_{d=1}^m\{x/d\}.
\end{aligned}
$$

最後の和の絶対値は $2m$ 未満です。[調和和の評価](#lem-ant1-harmonic)より、$H_m=\log m+\gamma+O(1/m)$ なので

$$
D(x)=2x\log m+2\gamma x-m^2+O(x/m+m).
$$

ここで $m^2\le x<(m+1)^2$ です。$x-m^2$ は $0$ 以上 $2m+1$ 未満だから

$$
m^2=x+O(m).
$$

また $1\le x/m^2<(1+1/m)^2$ なので

$$
0\le\log(x/m^2)\le2\log(1+1/m)\le2/m.
$$

従って $2x\log m=x\log x+O(x/m)$ です。これらを先ほどの式に代入すると

$$
D(x)=x\log x+(2\gamma-1)x+O(x/m+m).
$$

最後に $m\le\sqrt x<m+1$ です。$x\ge4$ なら $m\ge\sqrt x/2$ なので $x/m=O(\sqrt x)$、$m=O(\sqrt x)$ です。よって主張を得ます。$x\log x$ で割ると補正項は $O(1/\log x)$、誤差は $O(1/(\sqrt x\log x))$ でともに零へ収束します。さらに $\lfloor x\rfloor/x\to1$ なので最後の平均の式も従います。
<!-- proof-end -->

例えば $x=16$ なら $m=4$ で、直接の公式は

$$
D(16)=2(16+8+5+4)-4^2=50.
$$

主項 $16\log16$ は $50$ に等しい必要はありません。漸近式は個々の $x$ で等号を主張するのではなく、無限大へ進んだときの誤差の規模を保証します。

なお $\tau(n)$ 自身が $\log n$ に近づくわけではありません。素数 $p$ に沿えば常に $\tau(p)=2$ です。こうした点ごとの大きな揺れを許すところが、平均次数の大切な役割です。

## 5. Eulerのφ関数の平均――Möbius反転で約数をほどく

[Eulerの$\varphi$関数の約数和](../../NT/NT5/index.md#prop-nt5-totient-divisor-sum)から

$$
\varphi(n)=\sum_{d\mid n}\mu(d)\frac nd
$$

が分かっています。$\varphi(n)$ は $n$ が素数かどうかにも左右されますが、総和して約数 $d$ の側から数え直すと、定数を含む二次の主項が現れます。

<a id="thm-ant1-totient-mean"></a>

<!-- formal-statement-start -->
> **定理（Euler関数の平均）**  
> $\Phi(x)=\sum_{n\le x}\varphi(n)$、$\zeta(2)=\sum_{n=1}^{\infty}n^{-2}$ とする。$x\to\infty$ のとき

$$
\Phi(x)=\frac{x^2}{2\zeta(2)}+O(x\log(2x)).
$$

> 従って $\Phi(x)/\lfloor x\rfloor\sim x/(2\zeta(2))$ であり、$g(n)=n/\zeta(2)$ は $\varphi(n)$ の平均次数の一つである。
<!-- formal-statement-end -->

### 証明の見取り図

$n=dk$ と置いて総和の順序を交換すると、内側は $1+\cdots+\lfloor x/d\rfloor$ になります。床関数を実数へ戻す誤差を $\sum_{d\le x}x/d$ で抑え、定数の無限和は絶対収束する畳み込みで $1/\zeta(2)$ と同定します。

<!-- proof-start -->
### 証明

[φのMöbius反転](../../NT/NT5/index.md#prop-nt5-totient-divisor-sum)を出発点とします。$n\le x$ に含まれる正整数の対 $(d,k)$ は有限個なので、和の順序を交換して

$$
\begin{aligned}
\Phi(x)
&=\sum_{n\le x}\sum_{d\mid n}\mu(d)\frac nd\\
&=\sum_{d\le x}\mu(d)\sum_{k\le x/d}k\\
&=\frac12\sum_{d\le x}\mu(d)
\left(\left\lfloor\frac xd\right\rfloor^2
+\left\lfloor\frac xd\right\rfloor\right).
\end{aligned}
$$

$y\ge1$、$m=\lfloor y\rfloor$ とします。$0\le y-m<1$、$m\le y$ から

$$
|m^2-y^2|=|m-y|(m+y)\le2y,
\qquad 0\le m\le y
$$

です。ゆえに $m(m+1)/2=y^2/2+O(y)$ で、暗黙の定数は $y$ に依存しません。さらに $|\mu(d)|\le1$ だから

$$
\Phi(x)
=\frac{x^2}2\sum_{d\le x}\frac{\mu(d)}{d^2}
+O\left(x\sum_{d\le x}\frac1d\right).
$$

積分比較で $\sum_{d\le x}1/d\le1+\log x$ です。また

$$
\sum_{d>x}\frac{|\mu(d)|}{d^2}
\le\sum_{d>\lfloor x\rfloor}\frac1{d^2}
\le\frac1{\lfloor x\rfloor}=O(1/x)
$$

（十分大きい $x$ で評価）なので、有限和を無限和へ延長する際の誤差は $O(x)$ です。結局

$$
\Phi(x)=\frac{x^2}2
\sum_{d=1}^{\infty}\frac{\mu(d)}{d^2}
+O(x\log(2x)).
$$

最後に定数を確定します。二つの級数 $\sum\mu(d)d^{-2}$、$\sum k^{-2}$ はどちらも絶対収束します。その絶対値の積の二重和も有限であるため、$n=dk$ とまとめ直せます。[Möbius関数の逆元関係](../../NT/NT5/index.md#thm-nt5-mobius-unit)により

$$
\begin{aligned}
\left(\sum_{d\ge1}\frac{\mu(d)}{d^2}\right)
\left(\sum_{k\ge1}\frac1{k^2}\right)
&=\sum_{n\ge1}\frac1{n^2}\sum_{d\mid n}\mu(d)\\
&=1.
\end{aligned}
$$

[ζの定義と収束](../../NT/NT8/index.md#def-nt8-dirichlet-series)から $\zeta(2)>0$ であり、$\sum_{d\ge1}\mu(d)/d^2=1/\zeta(2)$ を得ます。これを代入して主張の漸近式が成立します。さらに $\sum_{n\le x}n/\zeta(2)=x^2/(2\zeta(2))+O(x)$ なので、[平均次数の定義](#def-ant1-mean-order)の条件も満たされます。
<!-- proof-end -->

例として $x=6$ では $\varphi(1),\ldots,\varphi(6)$ は $1,1,2,2,4,2$ で合計 $12$ です。反転側からも、$T(y)=\lfloor y\rfloor(\lfloor y\rfloor+1)/2$ と書けば

$$
\Phi(6)=T(6)-T(3)-T(2)-T(1)+T(1)
=21-6-3-1+1=12
$$

となります。ここで $\mu(d)\ne0$ で $d\le6$ の項 $d=1,2,3,5,6$ だけを使いました。特定の $x$ に対する二次近似の精度と、導出した等号は区別しましょう。

## 6. 平均が分かると、重みを変えられる

主項を求めるだけで終わらせず、[Abelの部分和公式](#thm-ant1-abel)により $\sum_{n\le x}\tau(n)/n$ のような和を見積もります。これが後の Dirichlet 級数とつながる重要な準備です。

<a id="prop-ant1-weighted-divisors"></a>

<!-- formal-statement-start -->
> **命題（約数個数関数の重み付き総和）**  
> $x\to\infty$ のとき

$$
\sum_{n\le x}\frac{\tau(n)}n
=\frac12(\log x)^2+2\gamma\log x+O(1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

Abelの式へ $a(n)=\tau(n)$、$b(t)=1/t$ を入れます。$D(t)$ の二次主項を積分すると $\frac12(\log x)^2$ が現れ、平方根誤差の積分は有界になります。

<!-- proof-start -->
### 証明

[Abelの部分和公式](#thm-ant1-abel)で $b'(t)=-1/t^2$、$A(t)=D(t)$ と指定すれば

$$
\sum_{n\le x}\frac{\tau(n)}n
=\frac{D(x)}x+\int_1^x\frac{D(t)}{t^2}\,dt.
$$

[約数個数関数の平均](#thm-ant1-divisor-mean)から、$t\ge1$ で暗黙の定数を大きく取れば

$$
D(t)=t\log t+(2\gamma-1)t+O(\sqrt t)
$$

です。右辺の第一項は $\log x+(2\gamma-1)+O(x^{-1/2})$ です。積分については

$$
\begin{aligned}
\int_1^x\frac{D(t)}{t^2}\,dt
&=\int_1^x\frac{\log t}{t}\,dt
+(2\gamma-1)\int_1^x\frac{dt}{t}
+O\left(\int_1^x t^{-3/2}\,dt\right)\\
&=\frac12(\log x)^2+(2\gamma-1)\log x+O(1),
\end{aligned}
$$

ここで $\int_1^x t^{-3/2}\,dt=2(1-x^{-1/2})\le2$ です。二つの式を加えると対数の一次の係数は $1+(2\gamma-1)=2\gamma$ となり、結論を得ます。
<!-- proof-end -->

$\Phi(x)$ の場合にも同じ方法を適用できます。ただし $\Phi(t)$ の誤差は $O(t\log(2t))$ なので、$\varphi(n)/n$ の和では $O((\log(2x))^2)$ 程度の誤差が現れます。これは最後の統合演習で導きます。

## 7. 演習と詳細解答

有限の等式、漸近的な評価、重みの変更を別々に練習します。すべての問題で $n$ は正整数、$x$ は指定された実数とします。

### Level A：まず有限和を手で確認する

#### A1. Abelの公式を二方式で検算する

$a(n)=(-1)^{n-1}$、$b(t)=1/t$、$x=4$ とする。左辺を直接計算し、総和関数 $A(t)$ を使った積分でも求めよ。

- Level: A
- ID: ANT1-A1

<!-- solution-start -->
**詳細解答**：$a(1),\ldots,a(4)=(1,-1,1,-1)$ だから直接の和は $1-\frac12+\frac13-\frac14=7/12$ です。$A(t)$ は $[1,2),[3,4)$ で $1$、それ以外の $[1,4]$ で $0$ です。$A(4)=0$ と $b'(t)=-t^{-2}$ を[Abelの公式](#thm-ant1-abel)へ代入し、

$$
-\int_1^4A(t)b'(t)\,dt
=\int_1^2t^{-2}\,dt+\int_3^4t^{-2}\,dt
=\left(1-\frac12\right)+\left(\frac13-\frac14\right)=\frac7{12}.
$$

整数端点の跳びは積分に影響しません。
<!-- solution-end -->

#### A2. 双曲線分割で $D(16)$ を求める

$x=16$ とし、$m=\lfloor\sqrt x\rfloor$ を計算して $D(16)$ を求めよ。正方形を引かない場合の過剰計数も答えよ。

- Level: A
- ID: ANT1-A2

<!-- solution-start -->
**詳細解答**：$m=4$ です。[Dirichletの双曲線公式](../../NT/NT5/index.md#thm-nt5-hyperbola)へ $x=16$ を入れると

$$
D(16)=2\sum_{d=1}^4\lfloor16/d\rfloor-4^2
=2(16+8+5+4)-16=50.
$$

最後の $16$ を引かないと $66$ になります。$1\le d,e\le4$ の $4^2=16$ 組が縦帯・横帯で二度数えられるため、過剰計数は $16$ です。
<!-- solution-end -->

#### A3. 床関数誤差を列挙する

$x=16$ で $m=4$ とするとき、$\sum_{d=1}^m\{x/d\}$ と $2xH_m-m^2-2\sum_{d=1}^m\{x/d\}$ を求めよ。

- Level: A
- ID: ANT1-A3

<!-- solution-start -->
**詳細解答**：$16/1=16$、$16/2=8$、$16/3=5+1/3$、$16/4=4$ なので小数部分の和は $1/3$ です。$H_4=1+1/2+1/3+1/4=25/12$ です。よって

$$
2\cdot16\cdot\frac{25}{12}-4^2-2\cdot\frac13
=\frac{200}{3}-16-\frac23
=\frac{150}{3}=50.
$$

[約数個数関数の平均の証明](#thm-ant1-divisor-mean)で使った恒等式と一致します。
<!-- solution-end -->

#### A4. Euler関数の有限総和を反転で求める

$\Phi(6)$ を各 $\varphi(n)$ の値から求め、次に Möbius 反転の式を総和して検算せよ。

- Level: A
- ID: ANT1-A4

<!-- solution-start -->
**詳細解答**：$n=1,\ldots,6$ の値は $1,1,2,2,4,2$ で、合計は $12$ です。[Euler関数の反転公式](../../NT/NT5/index.md#prop-nt5-totient-divisor-sum)により、$n=dk$ と書けば

$$
\Phi(6)=\sum_{d\le6}\mu(d)\sum_{k\le6/d}k.
$$

$d=1,2,3,5,6$ では $\mu(d)=1,-1,-1,-1,1$、$d=4$ は $0$ です。内側の和は $21,6,3,1,1$ なので $21-6-3-1+1=12$ です。
<!-- solution-end -->

### Level B：どの仮定が誤差評価を支えるか

#### B1. 交代級数の尾部をAbelで評価する

$a(n)=(-1)^{n-1}$ とし、整数 $1\le N<M$ に対して

$$
\left|\sum_{n=N+1}^{M}\frac{a(n)}n\right|\le\frac1N
$$

をAbelの公式により示せ。

- Level: B
- ID: ANT1-B1

<!-- solution-start -->
**詳細解答**：$B(t)=\sum_{N<n\le t}a(n)$ と置きます。交代する $+1$ と $-1$ を足すので、$B(t)$ は常に $0$ または $1$、あるいは $0$ または $-1$ のいずれかとなり、$|B(t)|\le1$ です。[Abelの部分和公式](#thm-ant1-abel)は初項を $N+1$ に変えても同じ有限差分の証明が適用でき、

$$
\sum_{n=N+1}^M\frac{a(n)}n
=\frac{B(M)}M+\int_{N+1}^{M}\frac{B(t)}{t^2}\,dt.
$$

左辺の和の前では $B(t)=0$（$N\le t<N+1$）なので積分を $N$ から始めても同じです。よって

$$
\left|\sum_{n=N+1}^M\frac{a(n)}n\right|
\le\frac1M+\int_N^M t^{-2}\,dt
=\frac1M+\left(\frac1N-\frac1M\right)=\frac1N.
$$

有限和から評価しているため、まだ無限級数の収束を仮定していません。
<!-- solution-end -->

#### B2. 点ごとの次数と平均次数を区別する

$\sum_{n\le x}\log n=x\log x-x+O(\log(2x))$ を積分比較から証明せよ。その結果と $D(x)$ の漸近式から、$g(n)=\log n+2\gamma$ が $\tau(n)$ の平均次数であることを示せ。

- Level: B
- ID: ANT1-B2

<!-- solution-start -->
**詳細解答**：$N=\lfloor x\rfloor$ とすると、$\log t$ の単調増加性により

$$
\int_1^N\log t\,dt
\le\sum_{n=1}^N\log n
\le\int_1^{N+1}\log t\,dt.
$$

積分は $t\log t-t+1$ です。上下の差は $\int_N^{N+1}\log t\,dt\le\log(N+1)$ なので、和は $N\log N-N+O(\log(2N))$ です。$N\le x<N+1$ だから $x\log x-N\log N=O(\log(2x))$、$x-N=O(1)$ であり、

$$
\sum_{n\le x}\log n=x\log x-x+O(\log(2x))
$$

を得ます。さらに $\sum_{n\le x}2\gamma=2\gamma x+O(1)$ なので

$$
\sum_{n\le x}(\log n+2\gamma)
=x\log x+(2\gamma-1)x+O(\log(2x)).
$$

[約数個数関数の平均](#thm-ant1-divisor-mean)の総和との差は $O(\sqrt x+\log(2x))=o(x\log x)$ です。この $g(n)$ は非負で、総和が無限大へ発散するため、[平均次数の定義](#def-ant1-mean-order)を満たします。特に素数 $p$ での $\tau(p)=2$ は、この平均に矛盾しません。
<!-- solution-end -->

#### B3. Abelの公式で重み付き約数総和を作る

$D(t)=t\log t+ct+O(\sqrt t)$ を仮定し、Abelの部分和公式で $\sum_{n\le x}\tau(n)/n$ の $(\log x)^2$ 項・$\log x$ 項を求めよ。その後 $c=2\gamma-1$ を代入せよ。

- Level: B
- ID: ANT1-B3

<!-- solution-start -->
**詳細解答**：[Abelの部分和公式](#thm-ant1-abel)で重み $b(t)=1/t$ とすると

$$
\sum_{n\le x}\frac{\tau(n)}n=\frac{D(x)}x+\int_1^x\frac{D(t)}{t^2}\,dt.
$$

まず $D(x)/x=\log x+c+O(x^{-1/2})$ です。積分は

$$
\int_1^x\frac{\log t+c}{t}\,dt
+O\left(\int_1^xt^{-3/2}dt\right)
=\frac12(\log x)^2+c\log x+O(1)
$$

です。後ろの積分は $2(1-x^{-1/2})\le2$ なので、誤差は有界です。合計して $\frac12(\log x)^2+(c+1)\log x+O(1)$ を得ます。$c=2\gamma-1$ なら係数は $2\gamma$ です。
<!-- solution-end -->

### Level C：Möbius反転とAbelの公式を接続する

#### C1. Euler関数の重み付き平均

$\Phi(x)=x^2/(2\zeta(2))+O(x\log(2x))$ が与えられているとする。$x\to\infty$ で

$$
\sum_{n\le x}\frac{\varphi(n)}n
=\frac{x}{\zeta(2)}+O((\log(2x))^2)
$$

を示せ。主項の係数が $1/(2\zeta(2))$ ではない理由も説明せよ。

- Level: C
- ID: ANT1-C1

<!-- solution-start -->
**詳細解答**：[Abelの部分和公式](#thm-ant1-abel)へ $a(n)=\varphi(n)$、$b(t)=1/t$ を代入します。まず

$$
\sum_{n\le x}\frac{\varphi(n)}n
=\frac{\Phi(x)}x+\int_1^x\frac{\Phi(t)}{t^2}\,dt.
$$

[Euler関数の平均](#thm-ant1-totient-mean)を右辺第一項に使えば

$$
\frac{\Phi(x)}x=\frac{x}{2\zeta(2)}+O(\log(2x)).
$$

積分の主項と誤差項を分けると

$$
\begin{aligned}
\int_1^x\frac{\Phi(t)}{t^2}\,dt
&=\frac1{2\zeta(2)}\int_1^x1\,dt
+O\left(\int_1^x\frac{\log(2t)}t\,dt\right)\\
&=\frac{x-1}{2\zeta(2)}
+O\left(\frac{(\log(2x))^2-(\log2)^2}{2}\right).
\end{aligned}
$$

$\log(2x)\le(\log(2x))^2/\log2$（$x\ge1$）なので、第一項の誤差も二乗対数の誤差へ吸収できます。二つの主項 $x/(2\zeta(2))$ と $(x-1)/(2\zeta(2))$ を加え、定数 $-1/(2\zeta(2))$ を誤差へ入れると指定式を得ます。係数が倍になるのは、境界項 $\Phi(x)/x$ と積分項の**両方**が同じ次数の主項を持つからです。
<!-- solution-end -->

## 8. 次に何をしたいか

総和を近似したいときは、まず離散的な[畳み込みの総和](../../NT/NT5/index.md#thm-nt5-summatory-convolution)や双曲線分割で正確な形へ移し、その後に床関数・調和和・収束する級数を使って主項と誤差を分離します。重みを変えたいときは Abel の公式を使えます。

次の ANT2 では、この重みを $n^{-s}$ として無限和を調べます。その際は **絶対収束する範囲でしか項の並べ替えを許さない**ことが、新しい注意点です。
