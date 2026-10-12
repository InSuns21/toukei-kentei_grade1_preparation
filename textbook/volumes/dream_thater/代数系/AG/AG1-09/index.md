# AG1-09 次元・超越次数・イデアルの鎖

一本の直線と一枚の平面は、どちらも無限個の点を持ちます。点の個数では「曲線は1次元、平面は2次元」を区別できません。前章では[既約閉集合と素イデアルの対応](../AG1-08/index.md#thm-ag1-08-prime-irreducible)を得たので、図形が真に小さな既約閉集合を何段階含めるかを、素イデアルの真の包含列に翻訳できます。一方、[Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)は、座標環を有限個の自由な多項式変数の上で整にします。この二つの「段数」と「自由変数の数」が一致することを、本章で証明します。

本章の基礎体は特に断らない限り代数閉体 $k$（例えば $\mathbb C$）です。環は単位元をもつ可換環で、座標環は $A=k[x_1,\ldots,x_n]/I(X)$ とします。整域に対しては商体 $\operatorname{Frac}(A)$ を使います。空の代数的集合と零環を混同しないため、空集合の次元にはここでは数値を割り当てません。

## 1. 図形を小さくしていく段数

$\mathbb A_k^2$ では、平面全体から直線 $V(x)$ へ、さらに原点 $V(x,y)$ へと、既約閉集合を二回真に狭められます。[包含反転全単射](../AG1-08/index.md#thm-ag1-08-closed-radical-bijection)を使えば、これは $(0)\subsetneq(x)\subsetneq(x,y)$ の逆向きの列です。段数は**イデアルの個数ではなく、真の包含の回数**です。

<a id="def-ag1-09-krull-dimension"></a>

<!-- formal-statement-start -->
> **定義（素イデアル鎖とKrull次元）**  
> $A$ を零環でない可換環とする。素イデアルの有限列
>
$$
\mathfrak p_0\subsetneq\mathfrak p_1\subsetneq\cdots
\subsetneq\mathfrak p_r
$$
>
> を長さ $r$ の**素イデアル鎖**という。取り得る鎖の長さの上限を **Krull次元** $\dim A$ と呼ぶ。上限が有限でなければ $\dim A=\infty$ とする。非空アフィン代数的集合 $X$ の次元を $\dim X=\dim k[X]$ と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-09-krull-dimension -->
**定義の確認。** $A=k[x,y]$ では $(0)$ は整域の零イデアル、$(x)$ は商環 $k[y]$ が整域なので素イデアル、$(x,y)$ は商環 $k$ が体なので素イデアルです。従って $(0)\subsetneq(x)\subsetneq(x,y)$ は長さ2の鎖です。これだけで $\dim A\ge2$ と分かりますが、**これ以上長い鎖がないことはまだ証明されていません**。後の定理で上界も示します。
<!-- definition-example-end -->

[素イデアルの定義と商整域の判定](../../RNG/RNG2/index.md#thm-rng2-prime-quotient-domain)を使うたび、商が整域となるかを確認します。例えば $k[x,y]/(xy)$ の零イデアルは素イデアルではありません。商環で $xy=0$ なのに $x,y$ の像はどちらも非零だからです。この注意が可約集合の計算で効きます。

## 2. 自由な座標の数を体で数える

曲線 $y=x^2$ では、$x$ を自由に動かすと $y$ は決まります。尖点 $y^2=x^3$ では $y$ は $x$ の多項式とは限りませんが、$y$ は $x$ 上の代数方程式を満たします。そこで「他の元を代数方程式で決められるまでに必要な独立な元の数」を数えます。

<a id="def-ag1-09-transcendence-degree"></a>

<!-- formal-statement-start -->
> **定義（超越基底と超越次数）**  
> 体の拡大 $K/k$ において、有限集合 $\{t_1,\ldots,t_d\}\subset K$ が $k$ 上代数的独立であり、$K$ のすべての元が $k(t_1,\ldots,t_d)$ 上代数的であるとき、この集合を**超越基底**という。その元の個数 $d$ を超越次数 $\operatorname{trdeg}_k K$ と書く。本章で扱う $K$ は有限生成 $k$ 代数である整域の商体なので、超越次数は有限である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag1-09-transcendence-degree -->
**定義の確認。** $K=k(t,u)$ に $u^2=t^3$ を課し、$t$ は超越的とします。$u$ は $T^2-t^3=0$ を満たすので $K/k(t)$ は代数拡大です。$\{t\}$ は代数的独立かつ $K$ を代数的に生成するため超越基底で、超越次数は1です。逆に $k(x,y)$ では二変数間に非零多項式関係がないので $\{x,y\}$ は超越基底で、超越次数は2です。
<!-- definition-example-end -->

超越基底の個数が選び方に依存しないこと、代数拡大で超越次数が変化しないことを、次の補題で明確にします。ここで「代数的独立」は[AG1-06の定義](../AG1-06/index.md#def-ag1-06-algebraic-independence)です。

<a id="lem-ag1-09-transcendence-exchange"></a>

<!-- formal-statement-start -->
> **補題（有限生成体の超越基底と代数拡大）**  
> $K=k(a_1,\ldots,a_m)$ を有限生成体とする。$K/k$ の超越基底は存在し、どの超越基底も同じ有限個数の元からなる。
>
> $L/K$ が代数拡大なら、$K/k$ の超越基底は $L/k$ の超越基底でもある。
>
> 特に $d\ge1$ 個の代数的に従属な元 $u_1,\ldots,u_d$ を取り、$L/k(u_1,\ldots,u_d)$ が代数拡大なら、
>
$
\operatorname{trdeg}_k L\le d-1
$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の生成元から代数的独立なものを最大限選びます。残りは選んだものの上で代数的です。二つの基底の個数の一致は、代数的な関係式から一つの旧変数を一つの新変数に交換する操作で得られます。

<!-- proof-start -->
### 証明

まず $\{a_1,\ldots,a_m\}$ の部分集合の中から包含最大の代数的独立集合 $T=\{t_1,\ldots,t_d\}$ を選びます（有限集合なので選べます）。残りの $a_j$ が $k(T)$ 上超越的なら、$T\cup\{a_j\}$ も代数的独立となって最大性に反します。ゆえに残りの各 $a_j$ は $k(T)$ 上代数的で、$K/k(T)$ は代数拡大です。

個数の一意性に必要な**交換操作**を確認します。$u$ が $k(t_1,\ldots,t_d)$ 上代数的で、$k$ 上超越的とします。$T=\{t_1,\ldots,t_d\}$ の部分集合から、$u$ がその元の生成する体の上で代数的となるものを選び、その中で要素数最小のものを $S$ とします。$u$ は $k$ 上超越的だから $S$ は空でありません。$t_i\in S$ を一つ選び、$E=k(S\setminus\{t_i\})$ とします。$S$ の最小性から $u$ は $E$ 上超越的ですが、$u$ は $E(t_i)$ 上代数的です。従って分母を払って

$
F(t_i,u)=0,\qquad 0\ne F(T,U)\in E[T,U]
$

という関係式を得ます。$u$ は $E$ 上超越的なので $F$ は $T$ に関して定数ではありえず、$F(T,u)$ は $E(u)[T]$ の**非零**多項式です。よって $t_i$ は $E(u)$ 上代数的です。

さらに $T\setminus S$ の元は $k(S)$ 上代数的独立です。$u$ が $E(T\setminus S)$ 上代数的だと仮定すると、$u$ の多項式関係式の分母を払い、$T\setminus S$ の各単項式の係数を比較すれば、$u$ はすでに $E$ 上代数的となって矛盾します。従って $u$ は $k(T\setminus\{t_i\})$ 上超越的です。これにより

$
T'=(T\setminus\{t_i\})\cup\{u\}
$

は代数的独立で、$t_i$ は $k(T')$ 上代数的、従って元の $K$ も $k(T')$ 上代数的です。これが一つの旧変数を新変数へ交換する操作です。

今、別の超越基底 $U=\{u_1,\ldots,u_s\}$ を取ります。$K$ は $k(T)$ 上代数的なので、各 $u_i$ を順次取り込むとき上の交換操作を使えます。$U$ の元は互いに代数的独立なので、既に取り込んだ $u$ だけの上で次の $u$ が代数的になって操作が止まることはありません。よって一回につき旧変数を一個減らし $s\le d$ を得ます。$T,U$ の役割を逆にすると $d\le s$ であり $d=s$ です。

最後に $L/K$ が代数拡大なら、$K/k(T)$ と $L/K$ の代数性の推移律により $L/k(T)$ は代数拡大です。$T$ の独立性は体を拡張しても変わらないので、同じ $T$ が $L$ の超越基底です。代数的に従属な $d$ 個の生成元には大きさ $d$ の独立部分集合がないので、上の最大部分集合の構成から超越次数は高々 $d-1$ となります。
<!-- proof-end -->

この補題は有限生成体の「独立な座標を何個選んでも同じ個数になる」ことを保証します。特に、整域 $A$ が [Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)によって $k[t_1,\ldots,t_d]$ 上有限なら、$A$ の商体は $k(t_1,\ldots,t_d)$ の代数拡大なので

$$
\operatorname{trdeg}_k\operatorname{Frac}(A)=d
$$

です。次は、この $d$ が素イデアル鎖の段数でもある理由です。

## 3. 整拡大で素イデアルの鎖はどう動くか

$B=k[t]$ に $z^2=t$ を満たす元 $z$ を追加した $C=k[t,z]/(z^2-t)\simeq k[z]$ を考えます。$B\subset C$ は有限整拡大で、$(0)\subsetneq(t)$ に対して $(0)\subsetneq(z)$ という鎖を見つけられます。任意の有限整拡大でも、下の素イデアルの鎖を上へ持ち上げられるのでしょうか。

<a id="lem-ag1-09-integral-prime-lifting"></a>

<!-- formal-statement-start -->
> **補題（整拡大における素イデアルの持ち上げと非比較性）**  
> $B\subseteq C$ が単位元を共有する整拡大とする。
>
> (1) $B$ の任意の素イデアル $\mathfrak q$ には、$\mathfrak p\cap B=\mathfrak q$ を満たす $C$ の素イデアル $\mathfrak p$ が存在する。
>
> (2) $\mathfrak p$ が $\mathfrak q$ の上にあり、$\mathfrak q\subseteq\mathfrak q'$ なら、$\mathfrak p\subseteq\mathfrak p'$ かつ $\mathfrak p'\cap B=\mathfrak q'$ となる素イデアル $\mathfrak p'$ が存在する。
>
> (3) $\mathfrak p\subsetneq\mathfrak p'$ が $C$ の素イデアルなら、その収縮は $\mathfrak p\cap B\subsetneq\mathfrak p'\cap B$ である。
<!-- formal-statement-end -->

### 証明の見取り図

(1) は素イデアルで局所化して、その上の極大イデアルを取ります。(2) は商環 $C/\mathfrak p$ に (1) を適用します。(3) は、同じ素イデアルに収縮される二つが真に包含されると仮定すると、整方程式の定数項で矛盾するという議論です。いずれも整拡大という条件が要ります。

<!-- proof-start -->
### 証明

**(1) 持ち上げ。** $S=B\setminus\mathfrak q$ とおきます。$S$ に零は含まれず、$B\hookrightarrow C$ は単射なので $S^{-1}C$ は零環ではありません。[局所化の構成](../AG1-04/index.md#def-ag1-04-localization)から $B_{\mathfrak q}=S^{-1}B$ は局所環で、その極大イデアルは $\mathfrak qB_{\mathfrak q}$ です。$S^{-1}C$ は $B_{\mathfrak q}$ 上整です。実際 $c/s$ の $c$ の整方程式を $s$ の冪で割ると、$c/s$ に対するモニック方程式を得ます。

零でない単位的環 $S^{-1}C$ の極大イデアル $M$ を一つ取り、$\mathfrak r=M\cap B_{\mathfrak q}$ とします。$S^{-1}C/M$ は体で、$B_{\mathfrak q}/\mathfrak r$ の整拡大です。この後者が体であることを示します。任意の非零元 $a$ を取ると、逆元 $a^{-1}$ は上の体に存在して整方程式

$$
(a^{-1})^m+b_{m-1}(a^{-1})^{m-1}+\cdots+b_0=0
$$

を満たします。$a^{m-1}$ を掛ければ

$$
a^{-1}=-(b_{m-1}+b_{m-2}a+\cdots+b_0a^{m-1})
$$

となり $a^{-1}$ は下の環に属します。従って $B_{\mathfrak q}/\mathfrak r$ は体で、$\mathfrak r$ は局所環の極大イデアル $\mathfrak qB_{\mathfrak q}$ です。$M$ を $C$ へ引き戻した素イデアル $\mathfrak p$ は $\mathfrak p\cap B=\mathfrak q$ を満たします。

**(2) 鎖の延長。** $B/\mathfrak q\hookrightarrow C/\mathfrak p$ は整拡大です。なぜなら $c\in C$ の整方程式を $\mathfrak p$ で剰余へ移せば、像の整方程式になるからです。$\mathfrak q'/\mathfrak q$ は $B/\mathfrak q$ の素イデアルなので、(1) をこの商環の拡大に適用して上の素イデアルを取ります。それを $C$ へ引き戻せば $\mathfrak p'$ が得られ、両方の要求を満たします。

**(3) 非比較性。** 反対に $\mathfrak p\subsetneq\mathfrak p'$ なのに収縮が等しく $\mathfrak q$ とします。整域 $D=C/\mathfrak p$ は $E=B/\mathfrak q$ 上整で、$\mathfrak p'/\mathfrak p$ は非零の素イデアル、しかも $E$ との共通部分は零です。非零元 $u\in\mathfrak p'/\mathfrak p$ を取ります。$u$ の整方程式のうち次数が最小のもの

$$
u^m+b_{m-1}u^{m-1}+\cdots+b_0=0
$$

を選ぶと $b_0\ne0$ です。もし $b_0=0$ なら整域 $D$ で $u\ne0$ により $u$ を消去して次数 $m-1$ のモニック方程式を得、最小性に反するからです。しかし $u\in\mathfrak p'/\mathfrak p$ なので式から $b_0$ もそこに属し、$b_0\in E$ と合わせると $b_0=0$ となって矛盾します。従って収縮は真の包含です。
<!-- proof-end -->

この補題の (2) は「下の鎖の各段を、すでに選んだ上の素イデアルを保って延長する」という点で、単に各素イデアルを個別に持ち上げる (1) より強い主張です。(3) は反対方向に、上の鎖の段数が収縮によって潰れないことを保証します。

## 4. 次元と超越次数はなぜ一致するのか

<a id="thm-ag1-09-dimension-trdeg"></a>

<!-- formal-statement-start -->
> **定理（アフィン整域の次元と超越次数）**  
> $k$ を任意の体、$A$ を有限生成 $k$ 代数である非零の整域とする。このとき
>
$$
\dim A=\operatorname{trdeg}_k\operatorname{Frac}(A).
$$
>
> 特に $A=k[x_1,\ldots,x_n]$ なら $\dim A=n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)で $B=k[t_1,\ldots,t_d]\subset A$ を取ります。下界は $B$ の長さ $d$ の明示的な鎖を整拡大の上へ持ち上げます。上界は $A$ の素イデアルを一段真に増やすと、商環の超越次数が必ず一つ以上減ることを示します。ここで環が整域であるという条件が効きます。

<!-- proof-start -->
### 証明

[Noether正規化](../AG1-06/index.md#thm-ag1-06-noether-normalization)より、代数的独立な $t_1,\ldots,t_d\in A$ が存在し、$A$ は $B=k[t_1,\ldots,t_d]$ 上有限加群です。[整元の有限加群判定](../AG1-06/index.md#prop-ag1-06-integral-finite-single)から $A/B$ は整拡大です。商体 $\operatorname{Frac}(A)$ は $k(t_1,\ldots,t_d)$ 上代数的なので、[超越次数補題](#lem-ag1-09-transcendence-exchange)により右辺は $d$ です。

**下界。** $B$ には次の長さ $d$ の素イデアル鎖があります。

$$
(0)\subsetneq(t_1)\subsetneq(t_1,t_2)
\subsetneq\cdots\subsetneq(t_1,\ldots,t_d).
$$

各段の商は残りの変数の多項式環なので整域、真の包含は次の変数が前段のイデアルに属さないことで確認できます。$d=0$ のときは体 $B=k$ の素イデアル $(0)$ だけを用います。[整拡大の素イデアルの持ち上げ](#lem-ag1-09-integral-prime-lifting)の (1) で最初の素イデアルの上に $\mathfrak p_0$ を取り、(2) を各段へ順次適用します。収縮が真に増えるので持ち上げた素イデアルも真に増え、長さ $d$ の鎖が $A$ にできます。従って $\dim A\ge d$ です。

**上界。** 任意の素イデアル鎖 $\mathfrak p_0\subsetneq\cdots\subsetneq\mathfrak p_r$ を取ります。$A_i=A/\mathfrak p_i$ は有限生成 $k$ 代数の整域なので、$d_i=\operatorname{trdeg}_k\operatorname{Frac}(A_i)$ と書けます。$i<r$ について $D=A_i$、$\mathfrak q=\mathfrak p_{i+1}/\mathfrak p_i\ne(0)$ とし、$D$ に Noether正規化を適用して $k[u_1,\ldots,u_{d_i}]\subset D$ を有限整拡大として取ります。

このとき $\mathfrak q\cap k[u_1,\ldots,u_{d_i}]\ne(0)$ です。もし共通部分が零なら、非零多項式全体 $S=k[u_1,\ldots,u_{d_i}]\setminus\{0\}$ で局所化すると $S^{-1}D$ は体 $k(u_1,\ldots,u_{d_i})$ 上有限次元の整域になります。有限次元の体上代数で非零元 $a$ の乗法写像は、整域性により単射、有限次元性により全射です。従って $ab=1$ となる $b$ が存在して $S^{-1}D$ は体です。しかし $\mathfrak q\cap S=\varnothing$ なので $S^{-1}\mathfrak q$ は真のイデアルであり、$\mathfrak q\ne0$ だから零でもありません。体のイデアルは $(0)$ と全体しかないことに矛盾します。

よって非零多項式 $h(u_1,\ldots,u_{d_i})$ が $\mathfrak q$ に属し、$D/\mathfrak q$ の中では $h(\bar u_1,\ldots,\bar u_{d_i})=0$ です。この $d_i$ 個の像は代数的に従属しています。一方 $D/\mathfrak q$ は $k[\bar u_1,\ldots,\bar u_{d_i}]$ 上整であるため、商体はそれらの生成する体の代数拡大です。[超越次数補題](#lem-ag1-09-transcendence-exchange)より

$$
d_{i+1}\le d_i-1.
$$

従って $d_0\ge d_1+1\ge\cdots\ge d_r+r\ge r$ です。また $A_0=A/\mathfrak p_0$ は $A$ の商であり、$A$ の Noether正規化の $d$ 個の元の像の上で整なので、同じ超越次数補題から $d_0\le d$ です。ゆえに $r\le d$ となり $\dim A\le d$ です。上下界を合わせて結論を得ます。
<!-- proof-end -->

**幾何への翻訳。** 非空既約アフィン代数的集合 $X$ では [既約性と素イデアル](../AG1-08/index.md#thm-ag1-08-prime-irreducible)から $k[X]$ は整域です。[包含反転全単射](../AG1-08/index.md#thm-ag1-08-closed-radical-bijection)により、$X=X_0\supsetneq X_1\supsetneq\cdots\supsetneq X_r$ という既約閉集合の真の減少列と、$I(X_0)\subsetneq\cdots\subsetneq I(X_r)$ という鎖が対応します。したがって「図形を何段階真に細くできるか」が、関数体の独立なパラメータの数と一致します。

## 5. 可約な集合と冪を持つ方程式

二本の軸の和 $X=V(xy)$ は整域の図形ではありません。しかしそれぞれの軸は一次元です。このとき図形の次元は、既約成分ごとの次元の最大値になります。

<a id="prop-ag1-09-components-dimension"></a>

<!-- formal-statement-start -->
> **命題（可約なアフィン集合の次元）**  
> $k$ を代数閉体、$X\subseteq k^n$ を非空アフィン代数的集合、$X_1,\ldots,X_s$ をその相異なる既約成分とする。このとき
>
$$
\dim X=\max_{1\le j\le s}\dim X_j.
$$
>
> また任意のイデアル $J\subsetneq k[x_1,\ldots,x_n]$ について、環 $k[x_1,\ldots,x_n]/J$ と $k[x_1,\ldots,x_n]/\sqrt J$ は同じKrull次元を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

根基を取っても素イデアルの集合とその包含関係は変わりません。可約集合については、どの素イデアルも既約成分に対応する極小素イデアルを一つ含むため、鎖は成分の一つを出発点にして考えられます。

<!-- proof-start -->
### 証明

まず $J$ を含む素イデアル $\mathfrak p$ は、$f^m\in J\subseteq\mathfrak p$ なら素性を繰り返すことで $f\in\mathfrak p$ となるため $\sqrt J\subseteq\mathfrak p$ を満たします。逆向きは $J\subseteq\sqrt J$ から従います。商環の素イデアルは元の環の $J$ を含む素イデアルに対応するので、$J$ で割った場合と $\sqrt J$ で割った場合で**すべての素イデアル鎖が同じ長さ**となります。

次に $A=k[X]$ は根基的イデアルで割った環です。[既約成分と極小素イデアル](../AG1-08/index.md#prop-ag1-08-components-minimal-primes)から、$A$ の極小素イデアルを $\mathfrak p_1,\ldots,\mathfrak p_s$ とすると

$$
(0)=\mathfrak p_1\cap\cdots\cap\mathfrak p_s,\qquad
k[X_j]\simeq A/\mathfrak p_j.
$$

これらの積 $\mathfrak p_1\cdots\mathfrak p_s$ は共通部分に含まれて零です。任意の素イデアル $\mathfrak q\subset A$ はこの積を含むので、素性を各因子へ繰り返し適用すれば、ある $j$ で $\mathfrak p_j\subseteq\mathfrak q$ です。従って任意の鎖の先頭 $\mathfrak q_0$ の下に $\mathfrak p_j$ を置けます。鎖全体が $\mathfrak p_j$ を含む素イデアルからなり、それらは $A/\mathfrak p_j$ の素イデアル鎖に一対一に対応します。よって各鎖の長さはある $\dim(A/\mathfrak p_j)$ 以下です。逆に任意の $A/\mathfrak p_j$ の鎖は $A$ の鎖になるので、両方向を合わせて最大値の式を得ます。
<!-- proof-end -->

**具体計算。** $k[x,y]/(y-x^2)\simeq k[x]$ は次元1です。$k[x,y,z]/(xy)$ は二つの極小素イデアル $(x)/(xy)$、$(y)/(xy)$ を持ち、商はそれぞれ $k[y,z]$、$k[x,z]$ なので次元2です。これに対し $k[x,y]/(x^2,y^3)$ は冪零元を含みますが根基が $(x,y)$ なので次元0です。**次元は重なりの冪の厚みを数えません**。その厚みは後の接空間・特異点の議論で重要になります。

## 6. 演習：自由変数と素イデアル鎖を往復する

以下 $k=\mathbb C$ とし、特記のない限り環は表示した多項式商環です。途中の素イデアルの真性と、適用定理の前提を必ず確かめてください。

**Level A：定義と直接計算**

### A1. 放物線の次元

$A=k[x,y]/(y-x^2)$ を $k[x]$ と同型にし、超越次数と長さ1の素イデアル鎖を求めよ。

- Level: A
- ID: AG1-09-A1

<!-- solution-start -->
**詳細解答**　$y$ の像を $x^2$ に置き換える写像 $k[x,y]\to k[x]$ は全射です。任意の $f(x,y)$ を $y-x^2$ で割ると $f=(y-x^2)q+r(x)$ なので核は $(y-x^2)$、従って $A\simeq k[x]$ です。商体は $k(x)$ で、$x$ は代数的独立ですから超越次数は1です。$k[x]$ の $(0)$ は整域性、$(x)$ は商体 $k$ を与えることから素イデアルで、$(0)\subsetneq(x)$ は長さ1です。[次元定理](#thm-ag1-09-dimension-trdeg)の上界によりそれ以上はなく、$\dim A=1$ です。
<!-- solution-end -->

### A2. アフィン直線の点

$A=k[t]$ で $(0)\subsetneq(t-2)$ が素イデアル鎖であることを示し、$\dim A$ を求めよ。

- Level: A
- ID: AG1-09-A2

<!-- solution-start -->
**詳細解答**　$k[t]$ は整域なので $(0)$ は素イデアルです。評価写像 $f\mapsto f(2)$ は全射で、その核は余りの定理から $(t-2)$ です。商は体 $k$ だから $(t-2)$ も素イデアルです。$t-2$ は零多項式でないので真の包含です。$k(t)$ の超越基底は $\{t\}$ で、[次元定理](#thm-ag1-09-dimension-trdeg)から $\dim k[t]=1$ です。
<!-- solution-end -->

### A3. 一点集合

$A=k[x,y]/(x-1,y+3)$ のKrull次元を求め、すべての素イデアル鎖を調べよ。

- Level: A
- ID: AG1-09-A3

<!-- solution-start -->
**詳細解答**　$x\mapsto1,\ y\mapsto-3$ の評価写像は核 $(x-1,y+3)$ を持ち、$A\simeq k$ です。体の真のイデアルは零だけで、零は素イデアルです。したがって素イデアル鎖は長さ0の $(0)$ だけで、$\dim A=0$ です。また $\operatorname{Frac}(A)=k$ の超越基底は空集合で、超越次数0と一致します。
<!-- solution-end -->

### A4. 平面での二段の鎖

$R=k[x,y]$ の $(0)\subsetneq(x)\subsetneq(x,y)$ が長さ2の素イデアル鎖であることと、それより長い鎖がないことを示せ。

- Level: A
- ID: AG1-09-A4

<!-- solution-start -->
**詳細解答**　$R/(0)=k[x,y]$、$R/(x)\simeq k[y]$ は整域、$R/(x,y)\simeq k$ は体ですから三つとも素イデアルです。$x\notin(0)$、$y\notin(x)$ で各包含は真です。従って長さ2の鎖を得ます。一方 $R$ の商体 $k(x,y)$ は $x,y$ を代数的独立な超越基底とするので超越次数2です。[次元定理](#thm-ag1-09-dimension-trdeg)から任意の鎖の長さは2以下です。
<!-- solution-end -->

**Level B：整性・成分・冪を見分ける**

### B1. 尖点と自由座標

$A=k[x,y]/(y^2-x^3)$ において $k[x]\subset A$ が単射で、$A=k[x]\cdot1+k[x]\cdot y$ と書けることを示し、$\dim A$ を求めよ。

- Level: B
- ID: AG1-09-B1

<!-- solution-start -->
**詳細解答**　関係式 $y^2=x^3$ によりすべての $y^m$ は、偶数なら $x^{3m/2}$、奇数なら $x^{3(m-1)/2}y$ になります。よって $1,y$ が $k[x]$ 加群を生成し、$y$ は $T^2-x^3=0$ を満たす整元です。$y$ についてのモニック多項式で割ると商環の任意の元は一意的に $a(x)+b(x)y$ と表されます。実際代入 $x=t^2,y=t^3$ により $a(t^2)+t^3b(t^2)$ を得、前者の冪は偶数、後者は3以上の奇数なので和が零なら両方零です。この代入は $A\hookrightarrow k[t]$ の単射を与えるため $A$ は整域です。同じ一意性から $k[x]\hookrightarrow A$ も単射です。$k(x)\subset\operatorname{Frac}(A)$ は $y$ を加えた代数拡大なので超越次数は1、[次元定理](#thm-ag1-09-dimension-trdeg)から $\dim A=1$ です。
<!-- solution-end -->

### B2. 二本の軸

$A=k[x,y]/(xy)$ の極小素イデアルと次元を求め、$(0)$ が素イデアルでないことを示せ。

- Level: B
- ID: AG1-09-B2

<!-- solution-start -->
**詳細解答**　$xy=0$ の商環で $x,y$ はそれぞれ非零です。もし $x=(xy)q$ と多項式環で書ければ $y=0$ の代入から $x=0$ となる矛盾を生じるので、$x$ の像は非零であり、$y$ も対称です。従って $(0)$ は素でありません。$A$ の二つの素イデアル $(x)/(xy)$ と $(y)/(xy)$ は、商がそれぞれ $k[y],k[x]$ で整域だから素です。[既約成分と極小素イデアル](../AG1-08/index.md#prop-ag1-08-components-minimal-primes)によってこれらが極小素イデアルです。それぞれの商は次元1なので[成分次元の命題](#prop-ag1-09-components-dimension)から $\dim A=1$ です。例えば $(x)/(xy)\subsetneq(x,y)/(xy)$ は長さ1の鎖です。
<!-- solution-end -->

### B3. 整拡大による鎖の持ち上げ

$B=k[t]\subset C=k[z]$ を $t=z^2$ で定める。$C$ が整拡大であることを確認し、$B$ の鎖 $(0)\subsetneq(t)$ を具体的に持ち上げよ。また $(z-a)$ の収縮を求めよ。

- Level: B
- ID: AG1-09-B3

<!-- solution-start -->
**詳細解答**　$k[t]\to k[z]$、$t\mapsto z^2$ は非零多項式 $p(t)$ を $p(z^2)$ という非零多項式へ送るので単射です。$z^2-t=0$ はモニック方程式で、$C=B\cdot1+B\cdot z$ です。$C$ の $(0)\subsetneq(z)$ は素イデアル鎖であり、前者の収縮は $(0)$、後者は $p(z^2)\in(z)$ と $p(0)=0$ が同値なので $(t)$ です。一般の $(z-a)$ については $p(z^2)\in(z-a)$ と $p(a^2)=0$ が同値なので、収縮は $(t-a^2)$ です。これは[整拡大の持ち上げ](#lem-ag1-09-integral-prime-lifting)を実際に計算した例です。
<!-- solution-end -->

### B4. 冪零元は次元を増やすか

$A=k[x,y]/(x^2,y^3)$ は整域か。$\sqrt{(x^2,y^3)}$ と $\dim A$ を求め、冪零元があることと次元が正であることの違いを説明せよ。

- Level: B
- ID: AG1-09-B4

<!-- solution-start -->
**詳細解答**　商環の $x$ の像は零でありませんが $x^2=0$ なので零因子があり、整域ではありません。同じく $y^3=0$ です。$x,y$ はともに根基へ入り $(x,y)\subseteq\sqrt{(x^2,y^3)}$ です。逆向きは、$(x^2,y^3)\subseteq(x,y)$ で $(x,y)$ が極大かつ根基的であることから従います。従って根基は $(x,y)$。[冪を除いても次元が同じ命題](#prop-ag1-09-components-dimension)から
$$
\dim A=\dim k[x,y]/(x,y)=\dim k=0.
$$
冪零元の存在は商環が非被約であることを示すだけで、素イデアル鎖が長くなることを意味しません。
<!-- solution-end -->

**Level C：異なる計算を統合する**

### C1. 二枚の平面

$A=k[x,y,z]/(xy)$ のすべての既約成分とKrull次元を求め、長さ2の素イデアル鎖を具体的に書け。また $A$ の零イデアルから鎖を始められない理由を説明せよ。

- Level: C
- ID: AG1-09-C1

<!-- solution-start -->
**詳細解答**　$V(xy)=V(x)\cup V(y)$ は二枚の座標平面の和です。$A$ の $(x)/(xy)$、$(y)/(xy)$ は商がそれぞれ $k[y,z]$、$k[x,z]$ で整域となるので素イデアルです。両平面は互いに包含されず、[既約成分対応](../AG1-08/index.md#prop-ag1-08-components-minimal-primes)からこれらが極小素イデアルであり、$V(x)$ と $V(y)$ が全既約成分です。[次元定理](#thm-ag1-09-dimension-trdeg)でそれぞれの商環の次元は2、[成分次元](#prop-ag1-09-components-dimension)から $\dim A=2$ です。具体的には
$$
(x)/(xy)\subsetneq(x,z)/(xy)\subsetneq(x,y,z)/(xy)
$$
が長さ2の鎖です。商環は順に $k[y,z]$、$k[y]$、$k$ なのでいずれも素です。$(0)\subset A$ が素でないのは、商環で $xy=0$ かつ $x\ne0,y\ne0$ だからです。これを鎖の先頭として加えることはできません。
<!-- solution-end -->

### C2. 次元0の図形は有限個の点

代数閉体 $k$ 上の非空アフィン代数的集合 $X$ について、$\dim X=0$ と $X$ が有限集合であることが同値であると証明せよ。

- Level: C
- ID: AG1-09-C2

<!-- solution-start -->
**詳細解答**　まず $X$ が有限個の点 $\{a^{(1)},\ldots,a^{(s)}\}$ からなるとします。各一点集合の消滅イデアルは $\mathfrak m_i=(x_1-a^{(i)}_1,\ldots,x_n-a^{(i)}_n)$ で、商環は $k$ です。[既約成分と極小素イデアル](../AG1-08/index.md#prop-ag1-08-components-minimal-primes)から相異なる一点が既約成分を尽くし、[成分次元](#prop-ag1-09-components-dimension)より $\dim X=\max_i\dim k=0$ です。

逆に $\dim X=0$ とします。[Noether空間での有限既約分解](../AG1-02/index.md#thm-ag1-02-noether-components)と[アフィン空間のNoether性](../AG1-05/index.md#thm-ag1-05-zariski-noether)から、$X$ は有限個の非空既約成分 $X_i$ に分解されます。[成分次元](#prop-ag1-09-components-dimension)より各 $\dim X_i=0$ です。各 $B_i=k[X_i]$ は有限生成 $k$ 代数の整域であり、[次元定理](#thm-ag1-09-dimension-trdeg)から $\operatorname{Frac}(B_i)$ の超越次数は0、すなわちこの体の全元は $k$ 上代数的です。$k$ は代数閉体なので $k$ 上代数的な体の元はすべて $k$ に属します。従って $k\subseteq B_i\subseteq\operatorname{Frac}(B_i)=k$ から $B_i=k$ です。座標関数 $x_j$ の $B_i$ での像がある $a_j\in k$ に等しいので、$x_j-a_j\in I(X_i)$ です。従って $X_i\subseteq\{(a_1,\ldots,a_n)\}$ となり、$X_i$ は非空だからちょうどその一点です。有限個の成分の和 $X$ も有限集合となります。
<!-- solution-end -->

ここまでで、既約な図形の「独立パラメータ数」、素イデアル鎖の段数、可約図形の各成分の次元を同じ枠組みで計算できました。次章では一点に近づいたときに一次の方程式がどの方向を許すかを調べ、全体の次元と局所的な一次近似から得られる次元が異なる場合を見ていきます。
