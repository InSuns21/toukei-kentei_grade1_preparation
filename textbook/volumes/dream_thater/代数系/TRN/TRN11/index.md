# TRN11 Hermite–Lindemann定理とπの超越性

[TRN6の $e$ の超越性](../TRN6/index.md#thm-trn6-e-transcendental)では、$e=e^1$ が有理係数多項式の根にならないことを証明しました。指数を $1$ から任意の非零代数的数に替えても結論は成り立つでしょうか。例えば $\sqrt2$ や $i\sqrt2$ は代数的ですが、$e^{\sqrt2}$ や $e^{i\sqrt2}$ に同じ議論を適用するには、指数の共役と複素線分を扱わねばなりません。

ここまでに準備した三つの道具には異なる役割があります。[TRN8の対称化定理](../TRN8/index.md#thm-trn8-balanced-relation)は仮定した代数関係から、零指数の係数が**正の整数**となる有限指数関係を作ります。[補助微分和から作る非零整数](../TRN9/index.md#thm-trn9-arithmetic-nonzero)は高重複零点を用いて通常の非零整数を作ります。[TRN10の矛盾定理](../TRN10/index.md#thm-trn10-arithmetic-analytic-clash)は、その同じ整数の絶対値を階乗分母の式で上から押さえます。この章では三段階を最初の仮定まで遡って接続し、そこから円周率 $\pi$ の超越性を導きます。

## 1. 非零代数的指数に対する結論

[代数的元・超越的元の定義](../../FLD/FLD1/index.md#def-fld1-algebraic-element)を振り返ると、$\overline{\mathbb Q}$ は有理係数の非零多項式の根からなる集合で、その外にある複素数が超越数です。指数が代数的であることと指数関数の値が代数的であることは、まったく別の条件です。

<a id="thm-trn11-hermite-lindemann"></a>

<!-- formal-statement-start -->
> **定理（Hermite–Lindemannの定理）**  
> $\alpha\in\overline{\mathbb Q}$ を零でない代数的数とする。このとき複素指数関数の値 $e^\alpha$ は $\mathbb Q$ 上の超越数である。
<!-- formal-statement-end -->

### なぜ0を除くか

$\alpha=0$ なら $e^\alpha=1$ は $Y-1\in\mathbb Q[Y]$ の根であり、結論は偽です。$\alpha\ne0$ は証明の開始時にも働きます。指数 $0,\alpha,2\alpha,\ldots$ が相異なるため、最初に作る**形式指数和が非零**になります。指数関数の値が等しいかどうかは、その段階ではまだ問いません。

### 証明の見取り図

反対に $e^\alpha$ が代数的だと仮定します。まず整数係数多項式の関係から形式指数和 $F$ を作り、Galois共役の積 $H$ と指数反転積 $HH^\vee$ から $0$ の係数が正の指数関係を得ます。次に指数を整数化して、素数 $p$ ごとに同じ補助多項式の微分和 $A_p$ を作ります。合同式により $|A_p|\ge1$、複素線分積分により $|A_p|\le CB^p/(p-1)!$ となります。$B,C$ は $p$ に依存しないので、十分大きい素数を選ぶと矛盾します。

<!-- proof-start -->
### 証明

**第1段階：代数関係から正の0係数を持つ指数関係へ。** $\alpha\in\overline{\mathbb Q}\setminus\{0\}$ で $y=e^\alpha$ が代数的と仮定します。[複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から $y e^{-\alpha}=1$ であり、$y\ne0$ です。[TRN8の指数関係への変換](../TRN8/index.md#prop-trn8-polynomial-relation)を使い、整数 $m\ge1$ と $b_0,\ldots,b_m\in\mathbb Z$ を選んで

$$
b_0b_m\ne0,\qquad
P(y)=\sum_{j=0}^{m}b_je^{j\alpha}=0
$$

とします。$\alpha$ の最小多項式の分解体を $K\subset\mathbb C$ とし、必要なら拡大して有限Galois拡大 $K/\mathbb Q$ とします。$G=\operatorname{Gal}(K/\mathbb Q)$ と置きます。

[形式指数和](../TRN7/index.md#def-trn7-formal-exponential-sum)の記号 $U_t$ は $e^t$ そのものではありません。$j\ne k$ のとき $(j-k)\alpha\ne0$ なので、形式和

$$
F=\sum_{j=0}^{m}b_jU_{j\alpha}\ne0,
\qquad
\operatorname{ev}(F)=\sum_{j=0}^{m}b_je^{j\alpha}=0
$$

が得られます。ここで $\operatorname{ev}$ は形式和を複素指数関数で評価する写像です。

[TRN8の整数係数共役積](../TRN8/index.md#prop-trn8-integral-conjugate-product)を使って

$$
H=\prod_{\sigma\in G}(\sigma\cdot F)
 =\sum_{\lambda\in S}B_\lambda U_\lambda
$$

と書きます。形式和の積が零因子を持たないことから $H\ne0$、その係数 $B_\lambda$ は非零整数であり、$\operatorname{ev}(H)=0$ です。最後の等式に必要なのは、積のうち恒等自己同型 $\sigma=1$ に対応する**一つの因子**の評価が0であることだけです。$e^{\sigma(\alpha)}=\sigma(e^\alpha)$ という主張はしていません。

[指数反転の定義](../TRN8/index.md#def-trn8-reflection)に従い、$H^\vee=\sum_{\lambda\in S}B_\lambda U_{-\lambda}$ として $R=HH^\vee$ を取ります。[指数反転積の0係数](../TRN8/index.md#lem-trn8-positive-zero-coefficient)から、指数が重なる項を統合して

$$
R=\sum_{t\in T}c_tU_t,\qquad
c_0=\sum_{\lambda\in S}B_\lambda^2>0
$$

が得られます。$T\subset K$ は有限な相異なる指数の集合で $0\in T$、各 $c_t\in\mathbb Z\setminus\{0\}$ です。$R$ は共役不変なので、全 $\sigma\in G$ に対して

$$
\sigma(T)=T,\qquad c_{\sigma(t)}=c_t
$$

です。また評価の乗法性により

$$
\sum_{t\in T}c_te^t
=\operatorname{ev}(R)
=\operatorname{ev}(H)\operatorname{ev}(H^\vee)=0.
$$

従って $T^\ast=T\setminus\{0\}$ は空ではありません。空なら左辺が $c_0\ne0$ になってしまうからです。これで [TRN8の対称関係定理](../TRN8/index.md#thm-trn8-balanced-relation)の全条件を得ました。

**第2段階：指数を整数化し、微分和を作る。** [TRN2の共通分母消去](../TRN2/index.md#lem-trn2-denominator-clearing)を $T$ の各元に使い、全 $t\in T$ について $Dt$ が代数的整数となる正整数 $D$ を**一度だけ**選びます。[TRN9の整数化した消滅多項式](../TRN9/index.md#lem-trn9-integerized-roots)により、$q=|T^\ast|\ge1$ とおけば

$$
Q(Z)=\prod_{t\in T^\ast}(Z-Dt)\in\mathbb Z[Z],
\qquad Q(0)\in\mathbb Z\setminus\{0\}
$$

です。係数が整数となるのは根の共役不変性と代数的整数の閉性のためであって、各 $Dt$ が通常の整数だからではありません。

素数 $p\ge2$ に対し、[TRN9の補助多項式](../TRN9/index.md#def-trn9-auxiliary-polynomial)の変数と次数を明示して

$$
H_p(Z)=Z^{p-1}Q(Z)^p,\qquad
f_p(z)=\frac{H_p(Dz)}{(p-1)!},\qquad
N_p=(p-1)+qp
$$

$$
F_p(z)=\sum_{k=0}^{N_p}f_p^{(k)}(z),
\qquad
A_p=\sum_{t\in T}c_tF_p(t)
$$

とします。$f_p$ は有理係数多項式ですが、代数的整数であるべきなのは後で評価した $F_p(t)$ です。

**第3段階：算術的な下界。** $f_p$ は $0$ で $p-1$ 重、各 $t\in T^\ast$ で $p$ 重の零点を持ちます。[TRN9の微分値の階乗可除性](../TRN9/index.md#lem-trn9-integral-derivatives)を適用すると、$K$ の代数的整数環 $\mathcal O_K$ において

$$
F_p(0)\equiv D^{p-1}Q(0)^p
\pmod{p\mathcal O_K},
$$

$$
F_p(t)\equiv0\pmod{p\mathcal O_K}
\quad(t\in T^\ast)
$$

を得ます。最初の式は、$H_p(Dz)$ の $z^{p-1}$ の係数が $D^{p-1}Q(0)^p$ で、$k=p-1$ 以外の残る微分階数 $k\ge p$ には $k!/(p-1)!$ の中に因子 $p$ が入ることから出ます。

[補助微分和から作る非零整数](../TRN9/index.md#thm-trn9-arithmetic-nonzero)により、$A_p$ は通常の整数であり

$$
A_p\equiv c_0D^{p-1}Q(0)^p\pmod p.
$$

ここで通常の整数になる理由も確認します。$F_p(t)$ は代数的整数、$f_p$ は有理係数で $c_t$ はGalois不変なので、共役作用は $A_p$ を固定します。従って $A_p\in\mathbb Q\cap\mathcal O_K=\mathbb Z$ です。$p\mathcal O_K\cap\mathbb Z=p\mathbb Z$ により、上の合同は通常の整数の合同へ移せます。

$p$ を選ぶ前に固定した整数 $c_0DQ(0)\ne0$ を割る素数だけを除外すると、右辺は $p$ で割れません。ゆえに、それ以外の素数に対して

$$
A_p\in\mathbb Z\setminus\{0\},
\qquad |A_p|\ge1.
$$

**第4段階：同じ微分和の複素積分表示。** [TRN4の複素端点積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)を $f=f_p$、始点 $a=0$、終点 $b=t$ へ適用します。$F_p=\sum f_p^{(k)}$ なので

$$
e^tF_p(0)-F_p(t)
=\int_0^t e^{t-z}f_p(z)\,dz=:I_{p,t}.
$$

この積分路は $z=st$（$0\le s\le1$）で表した**向き付き複素線分**です。両辺に $c_t$ を掛けて足し、既に得た $\sum_{t\in T}c_te^t=0$ を使うと、

$$
\begin{aligned}
\sum_{t\in T}c_tI_{p,t}
&=F_p(0)\sum_{t\in T}c_te^t-\sum_{t\in T}c_tF_p(t)\\
&=0-A_p,
\end{aligned}
$$

すなわち

$$
A_p=-\sum_{t\in T}c_tI_{p,t}
$$

となります。[TRN10の積分表示](../TRN10/index.md#prop-trn10-integral-identity)と一致し、**符号は負**です。

**第5段階：解析的な上界と矛盾。** 有限集合 $T$ について

$$
R_0=\max_{t\in T}|t|>0,\qquad
M=\max\{1,DR_0\},\qquad
N=\max\{1,2DR_0\},\qquad
B=MN^q
$$

を固定します。$t\in T$ と $0\le s\le1$ に対し、$|Dst|\le DR_0\le M$、$|Dst-Dv|\le2DR_0\le N$（$v\in T^\ast$）です。従って [TRN10の全線分上界](../TRN10/index.md#prop-trn10-uniform-polynomial-bound)を直接展開すると、

$$
|f_p(st)|
=\frac{|Dst|^{p-1}}{(p-1)!}
 \prod_{v\in T^\ast}|Dst-Dv|^p
\le\frac{M^{p-1}N^{qp}}{(p-1)!}
\le\frac{B^p}{(p-1)!}.
$$

さらに線分表示で $dz=t\,ds$、$|e^{(1-s)t}|\le e^{\max(0,\operatorname{Re}t)}$ です。[TRN10の複素積分上界](../TRN10/index.md#prop-trn10-complex-integral-bound)より

$$
|I_{p,t}|
=\left|t\int_0^1e^{(1-s)t}f_p(st)\,ds\right|
\le |t|e^{\max(0,\operatorname{Re}t)}
\frac{B^p}{(p-1)!}.
$$

ここで

$$
C=\sum_{t\in T}|c_t|\,|t|\,
e^{\max(0,\operatorname{Re}t)}>0
$$

は $T$ と係数を固定した後に決まる定数です。同じ $A_p$ の積分表示を使い、三角不等式で

$$
|A_p|
\le\sum_{t\in T}|c_t|\,|I_{p,t}|
\le C\frac{B^p}{(p-1)!}.
$$

$u_n=B^n/(n-1)!$ と置くと $u_{n+1}/u_n=B/n$ です。$n\ge\max\{2,\lceil2B\rceil\}$ ではこの比は $1/2$ 以下となり、$u_n\to0$ です。素数は無限に存在し、固定整数 $c_0DQ(0)$ の素因子は有限個なので、その素因子を避けて $CB^p/(p-1)!<1$ となる素数 $p$ を選べます。よって

$$
1\le|A_p|\le C\frac{B^p}{(p-1)!}<1,
$$

矛盾です。初めの仮定「$e^\alpha$ は代数的」は否定され、$e^\alpha$ は超越数です。$\square$
<!-- proof-end -->

この証明の核心は、同じ $A_p$ に「零でない**通常の整数**」と「0へ収束する**複素積分**」という二つの解釈を与えることです。$e^\alpha$ の共役を直接計算したわけではありません。また $e^\alpha$ が超越数であるという結論は、指数が**零でない代数的数**という限定のもとでのみ得られます。

## 2. 円周率はなぜ代数的ではあり得ないか

円周率 $\pi$ は実数で $\pi>0$ です。実変数の三角関数で $\cos\pi=-1$、$\sin\pi=0$ が成立することと、[複素指数のEuler表示](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)を組み合わせると、

$$
e^{i\pi}=\cos\pi+i\sin\pi=-1
$$

です。この値は代数的です。そこで「$i\pi$ が非零の代数的数だったとしたら」と考えます。

<a id="cor-trn11-pi-transcendental"></a>

<!-- formal-statement-start -->
> **系（πの超越性）**  
> 円周率 $\pi$ は $\mathbb Q$ 上の超越数である。
<!-- formal-statement-end -->

### 証明の見取り図

$\pi$ を代数的と仮定すると、$i$ も代数的だから積 $i\pi$ は代数的になります。この指数は0ではありません。しかしその指数関数値は $-1$ であり、[Hermite–Lindemannの定理](#thm-trn11-hermite-lindemann)が禁じる事態です。

<!-- proof-start -->
### 証明

$\pi$ が代数的であると仮定します。$i$ はモニック多項式 $X^2+1\in\mathbb Z[X]$ の根なので代数的数です。$i$ と $\pi$ を添加した体 $\mathbb Q(i,\pi)$ は二つの代数的数で生成される有限拡大です。[有限拡大の元は代数的](../../FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)をこの体の元 $\alpha=i\pi$ に適用すると、$\alpha$ も代数的です。また $i\ne0$ かつ $\pi>0$ より $\alpha\ne0$ です。

したがって [Hermite–Lindemannの定理](#thm-trn11-hermite-lindemann)をこの $\alpha=i\pi$ に適用すると $e^{i\pi}$ は超越数となるはずです。一方で

$$
e^{i\pi}=\cos\pi+i\sin\pi=-1,
\qquad (-1)+1=0
$$

であり、$-1$ は $Y+1\in\mathbb Q[Y]$ の根です。超越性と代数性が矛盾するため、$\pi$ は超越数です。$\square$
<!-- proof-end -->

この帰結から、任意の零でない有理数 $r$ に対して $r\pi$ も超越数だと分かります。もし $r\pi$ が代数的なら、代数的数の積の閉性から $\pi=r^{-1}(r\pi)$ も代数的になるためです。特に $2\pi$ も超越数です。

## 3. 指数関数はどこで単射になるか

[複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)によれば、任意の複素数 $z$ について $e^{z+2\pi i}=e^z$ です。従って指数関数は**複素平面全体では単射ではありません**。一方、入力を代数的数のみに制限すれば事情が変わります。

<a id="prop-trn11-algebraic-injectivity"></a>

<!-- formal-statement-start -->
> **命題（代数的指数上の単射性）**  
> $\alpha,\beta\in\overline{\mathbb Q}$ に対し、$e^\alpha=e^\beta$ なら $\alpha=\beta$ である。すなわち指数関数の $\overline{\mathbb Q}$ への制限は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

値が一致した二つの代数的指数の差を調べます。差が非零なら、指数の積公式によって指数関数値が1になるので、定理に反します。

<!-- proof-start -->
### 証明

$e^\alpha=e^\beta$ とします。$e^\beta\ne0$ なので、[複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から

$$
e^{\alpha-\beta}
=e^\alpha e^{-\beta}
=\frac{e^\alpha}{e^\beta}=1.
$$

$\alpha,\beta$ が代数的なので $\mathbb Q(\alpha,\beta)/\mathbb Q$ は有限拡大です。[有限拡大の元は代数的](../../FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)をこの体の元 $\delta=\alpha-\beta$ に適用すると、$\delta$ は代数的数です。もし $\delta\ne0$ なら [Hermite–Lindemannの定理](#thm-trn11-hermite-lindemann)から $e^\delta$ は超越数ですが、$e^\delta=1$ は代数的数です。従って $\delta=0$、すなわち $\alpha=\beta$ です。$\square$
<!-- proof-end -->

具体例として $\alpha=0,\beta=1$ はともに代数的ですが $e^0=1$、$e^1=e$ で一致しません。反対に $z=0$ と $w=2\pi i$ は相異なり、$e^z=e^w=1$ です。後者で $w$ が代数的だとすると $\pi=w/(2i)$ も代数的になり、[上の系](#cor-trn11-pi-transcendental)に反します。**単射性の定義域を $\mathbb C$ と書いてしまう誤り**は、この例で区別できます。

## 4. 代数的数の対数に関する帰結

複素対数は値が一つとは限りません。例えば $e^w=1$ には $w=0$ のほか $w=2\pi i$ という解があります。指数関数の値は常に0でないので、$a=0$ はそもそも $e^w=a$ を満たす $w$ を持ちません。しかし $0$ や $1$ 以外の代数的な目標値に対しては、どの対数を選んでも次の結論になります。

<a id="cor-trn11-algebraic-logarithms"></a>

<!-- formal-statement-start -->
> **系（代数的数の対数値）**  
> $a\in\overline{\mathbb Q}\setminus\{0,1\}$ とする。複素数 $w$ が $e^w=a$ を満たすなら、$w$ は超越数である。
<!-- formal-statement-end -->

### 証明の見取り図

指数の値が代数的な $a$ であり、$a\ne1$ なので $w\ne0$ です。もし $w$ が代数的でもあれば主定理がその指数値の代数性を否定します。

<!-- proof-start -->
### 証明

$e^0=1$ なので $a\ne1$ から $w\ne0$ です。$w$ が代数的だと仮定すると、[Hermite–Lindemannの定理](#thm-trn11-hermite-lindemann)により $e^w$ は超越数です。しかし $e^w=a\in\overline{\mathbb Q}$ と仮定したので矛盾します。従って $w$ は超越数です。$\square$
<!-- proof-end -->

例えば実数の $\log 2$ は $e^{\log2}=2$ を満たすので超越数です。ここで $\log 2$ は正の実数を与える実対数ですが、複素数の他の対数値 $w$ を使っても同じ証明が適用できます。$a=1$ を除く必要があるのは、$w=0$ が代数的な反例になるからです。

## 5. 演習

### Level A：仮定と算術条件を確認する

**TRN11-A1（代数関係から形式指数和）**  
$\alpha\in\overline{\mathbb Q}\setminus\{0\}$、$y=e^\alpha$ が $Y^2-3Y+2$ の根だと仮定する。整数係数の形式指数和 $F$ を作り、$F\ne0$ と $\operatorname{ev}(F)=0$ を別々に確かめよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$P(Y)=Y^2-3Y+2$ の係数を指数の昇順に並べると $b_0=2,b_1=-3,b_2=1$ なので

$$
F=2U_0-3U_\alpha+U_{2\alpha}.
$$

$\alpha\ne0$ だから $0,\alpha,2\alpha$ は相異なり、異なる形式記号の係数をまとめても、$U_0$ の係数2は消えません。従って $F\ne0$ です。一方

$$
\operatorname{ev}(F)
=2-3e^\alpha+e^{2\alpha}
=2-3y+y^2=P(y)=0
$$

です。形式的に非零であることから、評価した複素数が非零になるとは推論できません。
<!-- solution-end -->

**TRN11-A2（0係数は平方和）**  
$s=\sqrt2$、$H=2U_0+U_s+U_{-s}$ とする。$H^\vee$ と $HH^\vee$ を展開し、指数0の係数が $\sum B_\lambda^2$ と一致することを確かめよ。

- Level: A

<!-- solution-start -->
**詳細解答**

指数反転は $U_s$ と $U_{-s}$ を交換し、係数を変えません。よって $H^\vee=2U_0+U_{-s}+U_s=H$ です。分配法則で

$$
\begin{aligned}
HH^\vee
&=(2U_0+U_s+U_{-s})^2\\
&=4U_0+4U_s+4U_{-s}
 +U_{2s}+2U_{s-s}+U_{-2s}\\
&=6U_0+4U_s+4U_{-s}+U_{2s}+U_{-2s}.
\end{aligned}
$$

従って0係数は $6$ です。もとの係数は $B_0=2,B_s=B_{-s}=1$ なので $2^2+1^2+1^2=6$ です。計算は形式和の演算であり、$e^s$ に関する代数関係を主張してはいません。
<!-- solution-end -->

**TRN11-A3（例外素数と合同）**  
$T=\{0,1,-1\}$、$D=1$、$Q(Z)=Z^2-1$、$c_0=6$、$c_1=c_{-1}=4$ とする。$A_p$ の合同式から $p=5$ での剰余を求め、$A_5$ が零にならない理由を述べよ。指数関係があるとは仮定しない。

- Level: A

<!-- solution-start -->
**詳細解答**

$Q(0)=-1$ で $c_0DQ(0)=-6$ です。素数5は6を割らず、[非零整数の合同式](../TRN9/index.md#thm-trn9-arithmetic-nonzero)の算術条件を満たします。従って

$$
A_5\equiv c_0D^{4}Q(0)^5
=6\cdot1^4\cdot(-1)^5=-6\equiv4\pmod5.
$$

$A_5\in\mathbb Z$ かつ $A_5\not\equiv0\pmod5$ なので $A_5\ne0$、$|A_5|\ge1$ です。これは積分の上界を主張せず、算術的な部分だけの確認です。
<!-- solution-end -->

**TRN11-A4（Euler表示と超越性）**  
$\pi$ が代数的と仮定した場合に $i\pi$ が [Hermite–Lindemannの定理](#thm-trn11-hermite-lindemann) の仮定を満たすことを、$i$ の満たす多項式と $i\pi\ne0$ の二点から確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$i^2+1=0$ だから $i$ は整数係数の非零多項式 $X^2+1$ の根、すなわち代数的数です。仮定により $\pi$ も代数的なので、代数的数の積の閉性から $i\pi$ は代数的です。さらに $i\ne0$ と $\pi>0$ から $i\pi\ne0$ です。したがって主定理の二つの仮定を満たします。しかし $e^{i\pi}=\cos\pi+i\sin\pi=-1$ は $Y+1$ の根で代数的です。これが矛盾となります。
<!-- solution-end -->

### Level B：証明の仕組みを自力でつなぐ

**TRN11-B1（共役から正の0係数へ）**  
$s=\sqrt2$、$K=\mathbb Q(s)$ とし、$F=U_0+U_s$ を考える。$G=\{1,\sigma\}$、$\sigma(s)=-s$ として、共役積 $H=F(\sigma\cdot F)$ と $R=HH^\vee$ を計算せよ。$R$ の指数集合がGalois不変で0係数が正であることも示せ。評価が0になるとは仮定しない。

- Level: B

<!-- solution-start -->
**詳細解答**

$\sigma\cdot F=U_0+U_{-s}$ だから

$$
H=(U_0+U_s)(U_0+U_{-s})
=2U_0+U_s+U_{-s}.
$$

反転 $H^\vee=H$ より

$$
R=H^2
=6U_0+4U_s+4U_{-s}+U_{2s}+U_{-2s}.
$$

指数集合は $T=\{0,\pm s,\pm2s\}$ で、$\sigma$ は $s$ と $-s$、$2s$ と $-2s$ を交換します。対応する係数は $4=4$、$1=1$ なので共役不変です。また $c_0=2^2+1^2+1^2=6>0$ です。ただし $F$ を評価すれば $1+e^s$ であり、その値は0と仮定していません。**算術の入力と指数評価零は別々の条件**です。
<!-- solution-end -->

**TRN11-B2（上界の固定と素数の選択）**  
数列 $u_n=4^n/(n-1)!$ と定数 $C=3$ を考える。$Cu_{13}<1$ を階乗・整数の比較で確かめ、$u_{n+1}/u_n$ と併せて「十分大きい素数で解析上界が1未満になる」理由を説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$13$ は素数であり、$4^{13}=67\,108\,864$、$12!=479\,001\,600$ だから

$$
3u_{13}
=\frac{3\cdot67\,108\,864}{479\,001\,600}
=\frac{201\,326\,592}{479\,001\,600}<1.
$$

また $u_{n+1}/u_n=(4^{n+1}/n!)/(4^n/(n-1)!)=4/n$ です。$n\ge8$ なら $4/n\le1/2$ なので、$u_n$ は幾何級数型の上界で0へ収束します。例えば $c_0DQ(0)$ が有限な非零整数なら、それを割る素数を除外しても十分大きい素数が残ります。実際の証明では $B,C$ が与えられた固定値のとき同様に選びます。**具体例の $C=3,B=4$ を一般の補助多項式へ代入してよいわけではありません**。
<!-- solution-end -->

**TRN11-B3（単射性の定義域）**  
$\alpha,\beta\in\overline{\mathbb Q}$ で $e^\alpha=e^\beta$ と仮定したときの結論を証明せよ。一方、$0$ と $2\pi i$ を使って、同じ主張を任意の複素数へ拡張できないことを説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

複素指数の積公式で $e^{\alpha-\beta}=e^\alpha/e^\beta=1$ です。$\alpha-\beta$ は代数的数です。もし差が非零なら [主定理](#thm-trn11-hermite-lindemann)からその指数値は超越数となり、代数的数1と矛盾します。従って $\alpha=\beta$ です。

一方 $2\pi i\ne0$ ですが $e^{2\pi i}=(e^{i\pi})^2=(-1)^2=1=e^0$ です。ただし $\pi$ は[上の系](#cor-trn11-pi-transcendental)により超越数であり、$2\pi i$ も代数的ではありません。この反例は代数的数に限定した命題には反しません。
<!-- solution-end -->

**TRN11-B4（対数の枝に依存しない結論）**  
$a=2$ とし、複素数 $w$ が $e^w=2$ を満たすとする。$w$ が超越数であることを示せ。次に $a=1$ では同じ結論が成り立たない理由を具体例で示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

$e^0=1\ne2$ なので $w\ne0$ です。もし $w$ が代数的なら [主定理](#thm-trn11-hermite-lindemann)より $e^w$ は超越数ですが、$e^w=2$ は $Y-2$ の根なので代数的数です。矛盾するため $w$ は超越数です。複素対数の枝を指定していなくても、等式 $e^w=2$ だけで証明は成立します。

$a=1$ なら $w=0$ は $e^0=1$ を満たし、しかも $0$ は $Y$ の根で代数的です。このため $a\ne1$ を外すと系は偽になります。
<!-- solution-end -->

### Level C：算術と解析を接合する

**TRN11-C1（非零整数から矛盾まで）**  
$K/\mathbb Q$ を有限Galois拡大、$T\subset K$ を $0$ を含む有限Galois不変集合、$(c_t)_{t\in T}$ を共役不変な非零整数の族で $c_0>0$ とする。$\sum_{t\in T}c_te^t=0$、$T^\ast=T\setminus\{0\}\ne\varnothing$ を仮定する。全 $Dt$ が代数的整数になる正整数 $D$ を固定し、

$$
Q(Z)=\prod_{t\in T^\ast}(Z-Dt),\qquad
f_p(z)=\frac{(Dz)^{p-1}Q(Dz)^p}{(p-1)!},
\qquad F_p=\sum_{k=0}^{\deg f_p}f_p^{(k)}
$$

と置く。次を順に証明せよ。(1) $Q\in\mathbb Z[Z]$ と $Q(0)\ne0$。(2) $A_p=\sum c_tF_p(t)$ は整数で、$A_p\equiv c_0D^{p-1}Q(0)^p\pmod p$。(3) 適当な素数に対し $1\le |A_p|<1$ となること。複素積分の経路と定数の依存先を明記せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

(1) 各 $Dt$ は代数的整数です。$T^\ast$ がGalois不変だから、$\sigma$ は $Q$ の一次因子を置換し、$Q$ の各係数を固定します。係数は有理数かつ代数的整数なので整数です。$D>0$ と $t\ne0$ より根 $Dt$ は0でなく、従って $Q(0)=\prod_{t\in T^\ast}(-Dt)\ne0$ です。

(2) $q=|T^\ast|$ とすれば $\deg f_p=(p-1)+qp$ です。$z=0$ では $(Dz)^{p-1}$ が、$z=t\ne0$ では $Q(Dz)^p$ が零点を作ります。よって $k<p-1$ の $f_p^{(k)}(0)$ と $k<p$ の $f_p^{(k)}(t)$ は0です。$k\ge p$ の導関数には整数 $k!/(p-1)!$ に因子 $p$ が入るので、[代数的整数点での階乗可除性](../TRN9/index.md#lem-trn9-integral-derivatives)から評価値は $p\mathcal O_K$ に属します。一方、$k=p-1$ の0点の値は

$$
f_p^{(p-1)}(0)
=\frac{(p-1)!D^{p-1}Q(0)^p}{(p-1)!}
=D^{p-1}Q(0)^p.
$$

従って $A_p-c_0D^{p-1}Q(0)^p\in p\mathcal O_K$ です。すべての $F_p(t)$ は代数的整数、かつ $f_p\in\mathbb Q[z]$ と $c_{\sigma(t)}=c_t$ により $\sigma(A_p)=A_p$ です。ゆえに $A_p\in\mathbb Q\cap\mathcal O_K=\mathbb Z$ です。また $p\mathcal O_K\cap\mathbb Z=p\mathbb Z$ なので指定の合同式が通常の整数の合同として従います。

(3) $p\nmid c_0DQ(0)$ なら合同の右辺は $p$ で割れず、$A_p\in\mathbb Z\setminus\{0\}$ です。[TRN4の積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)で $a=0,b=t$ とすると

$$
I_{p,t}=\int_0^t e^{t-z}f_p(z)\,dz
=e^tF_p(0)-F_p(t).
$$

重みを掛けた和で $F_p(0)\sum c_te^t=0$ が消えるので $A_p=-\sum c_tI_{p,t}$ です。各経路を $z=st$、$0\le s\le1$ と置きます。$R_0=\max|t|$、$q=|T^\ast|$、

$$
B=\max(1,DR_0)\max(1,2DR_0)^q,\qquad
C=\sum_{t\in T}|c_t||t|e^{\max(0,\operatorname{Re}t)}
$$

とすれば、$B\ge1,C>0$ は $p$ に依存しません。三角不等式と $dz=t\,ds$ を用いて

$$
|I_{p,t}|
\le|t|e^{\max(0,\operatorname{Re}t)}\frac{B^p}{(p-1)!},
$$

$$
1\le|A_p|\le\sum_{t\in T}|c_t||I_{p,t}|
\le C\frac{B^p}{(p-1)!}.
$$

最後に $u_n=B^n/(n-1)!$ の比 $u_{n+1}/u_n=B/n\to0$ を使い $u_n\to0$ です。非零整数 $c_0DQ(0)$ の素因子は有限個、素数は無限個なので、素因子を避けかつ $Cu_p<1$ となる素数 $p$ が選べます。その素数では $1\le|A_p|<1$ となり矛盾します。
<!-- solution-end -->

**TRN11-C2（代数的指数の仮定から結論まで）**  
$0\ne\alpha\in\overline{\mathbb Q}$ とし、$e^\alpha$ が代数的だと仮定する。整数係数の $P(Y)$、有限Galois拡大、形式指数和の共役積・反転積、Level C1 の整数と積分を順番に用いて、仮定が矛盾することを示せ。特に「指数関数値へのGalois作用」を使わずに0係数の正性を説明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

$y=e^\alpha\ne0$ は代数的と仮定したので、分母を払って定数項・最高次係数が非零な $P(Y)=\sum_{j=0}^mb_jY^j\in\mathbb Z[Y]$ を取れます。$m\ge1$、$b_0b_m\ne0$、$P(y)=0$ です。$j\alpha$ が相異なるので $F=\sum b_jU_{j\alpha}$ は非零形式和ですが、$\operatorname{ev}(F)=0$ です。

$\alpha$ の最小多項式を分解する有限Galois拡大 $K$ を選び、$H=\prod_{\sigma\in G}\sigma\cdot F$ と置きます。[TRN7の形式指数和の積の非零性](../TRN7/index.md#lem-trn7-no-zero-divisors)により $H\ne0$ です。また係数は通常の整数であり、$H$ はGalois不変です。$H=\sum_{\lambda\in S}B_\lambda U_\lambda$ とまとめると $B_\lambda\in\mathbb Z\setminus\{0\}$ です。

$R=HH^\vee$ の零指数への寄与は $\lambda-\mu=0$、すなわち $\lambda=\mu$ の組だけから生じます。従って

$$
c_0=\sum_{\lambda\in S}B_\lambda B_\lambda
=\sum_{\lambda\in S}B_\lambda^2>0.
$$

$R$ の残る非零係数をまとめた指数集合 $T$ は有限かつGalois不変です。$\operatorname{ev}(R)=\operatorname{ev}(H)\operatorname{ev}(H^\vee)=0$ なのは $H$ の積に**元の $F$ が因子として含まれる**からです。ここで $\sigma(e^\alpha)$ を使う必要はありません。指数の共役作用は形式記号 $U_\alpha$ にだけ適用しました。

従って $T,c_t$ は Level C1 のすべての仮定を満たします。Level C1 に従って整数化多項式 $Q$ と微分和 $A_p$ を作り、十分大きく $p\nmid c_0DQ(0)$ の素数に対して

$$
1\le|A_p|\le C\frac{B^p}{(p-1)!}<1
$$

を得ます。矛盾の出発点は $e^\alpha$ の代数性だけなので、それは偽です。以上より $e^\alpha$ は超越数です。
<!-- solution-end -->

## 6. これからの指数関係

[Hermite–Lindemannの定理](#thm-trn11-hermite-lindemann)が扱ったのは **一つの非零代数的指数の指数関数値**です。次に問いたいのは、相異なる代数的指数 $\alpha_1,\ldots,\alpha_m$ について複数の指数関数値が有理数係数の一次関係を持ち得るか、という問題です。この問題は、一つの $e^\alpha$ の代数性だけからは直接は解けません。[本章で得た代数的指数上の単射性](#prop-trn11-algebraic-injectivity)を使い、共役積から生じる指数の衝突を調べることが次の出発点になります。
