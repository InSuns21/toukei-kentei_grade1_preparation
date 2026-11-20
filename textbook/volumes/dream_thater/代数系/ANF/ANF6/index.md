# ANF6 イデアル類群の有限性

[ANF3の素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)により、整数環では元の素因数分解が壊れても、零でないイデアルは素イデアルの積に一意分解します。しかし、すべてのイデアルが一つの元で生成できるとは限りません。「どの程度、主イデアルから外れるのか」を測るのがこの講義の中心です。

[ANF5の小ノルム元の定理](../ANF5/index.md#thm-anf5-small-norm-element)は、任意の零でない整イデアルの中に、ノルムの小さい元があることを保証しました。ここではその元から**同じ種類の障害を表す小さなイデアル**を作ります。そして小さなイデアルは有限個しかないことを証明します。

学習後には、分数イデアルを主イデアル倍で分類し、その種類が有限個であることを証明し、$\mathbb Q(\sqrt{-5})$ でその種類が二つだけであることを紙上で決定できます。

## 1. 主イデアルからのずれを積で測る

$K/\mathbb Q$ を次数 $n$ の数体とし、その整数環を $A=\mathcal O_K$ とします。[分数イデアル](../ANF3/index.md#def-anf3-fractional-ideal)は、$K$ の非零加群であり、ある非零整数倍が $A$ の整イデアルになるものでした。

[非零分数イデアルの可逆性](../ANF3/index.md#prop-anf3-invertible-ideals)から、これらは積について可換群を作ります。単位元は $A$ です。分数イデアル $\mathfrak a$ の逆元は $\mathfrak a^{-1}$ です。

元 $\gamma\in K^\times$ が作る分数イデアル $(\gamma)=\gamma A$ は**主分数イデアル**です。これらは積で閉じ、$(\gamma)^{-1}=(\gamma^{-1})$。たとえば $\mathbb Z$ では分数イデアルがすべて $q\mathbb Z$（$q\in\mathbb Q^\times$）なので、非主イデアルの障害は一つもありません。

二つの分数イデアル $\mathfrak a,\mathfrak b$ を比べるとき、$\mathfrak a=(\gamma)\mathfrak b$ となる $\gamma\in K^\times$ があれば同じ種類と考えます。主イデアル倍は、「生成元の尺度の取り替え」に相当します。

<a id="def-anf6-ideal-class-group"></a>

<!-- formal-statement-start -->
> **定義（イデアル類群）**  
> 数体 $K$ の整数環を $A=\mathcal O_K$ とする。零でない分数イデアル全体の乗法群を $\mathcal I_K$、主分数イデアル全体の部分群を $\mathcal P_K$ とする。**イデアル類群**を商群

$$
\operatorname{Cl}(K)=\mathcal I_K/\mathcal P_K
$$

> と定義する。分数イデアル $\mathfrak a$ の類を $[\mathfrak a]$ と書く。類の積は $[\mathfrak a][\mathfrak b]=[\mathfrak a\mathfrak b]$、単位元は $[A]$ である。
<!-- formal-statement-end -->

**定義を直接確かめる。** $\mathcal P_K$ は $(\alpha)(\beta)=(\alpha\beta)$、$(1)=A$、$(\alpha)^{-1}=(\alpha^{-1})$ により部分群です。$\mathcal I_K$ が可換なので正規部分群でもあり、商群が定義できます。さらに

$$
[\mathfrak a]=[\mathfrak b]
\ \Longleftrightarrow\
\mathfrak a\mathfrak b^{-1}=(\gamma)
\ \Longleftrightarrow\
\mathfrak a=(\gamma)\mathfrak b
\quad(\gamma\in K^\times).
$$

第一の同値は商群の定義、第二の同値は $\mathfrak b\mathfrak b^{-1}=A$ を両辺に掛けたものです。とくに $[\mathfrak a]=[A]$ と $\mathfrak a$ が主分数イデアルであることは同値です。整数環 $A=\mathbb Z$ ならすべての分数イデアルが $q\mathbb Z$ なので $\operatorname{Cl}(\mathbb Q)=\{[A]\}$ です。

もう一つの例として $K=\mathbb Q(\sqrt{-5})$ と $s=\sqrt{-5}$ を考えます。$\mathfrak p=(2,1+s)$ は $A/\mathfrak p\simeq\mathbb F_2$ を持つ整イデアルです。この $\mathfrak p$ が主イデアルでないこと、しかし $\mathfrak p^2$ は主イデアルであることを第5節で確認します。元の一意分解の失敗を類群が記録するのです。

## 2. 有限性への橋：同じ類の小さい代表

[整イデアルのノルム](../ANF4/index.md#def-anf4-ideal-norm)は、零でない整イデアル $\mathfrak a$ に対して

$$
N(\mathfrak a)=|A/\mathfrak a|\in\mathbb Z_{\geq1}
$$

です。既習の[素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)と[素イデアル冪のノルム](../ANF4/index.md#lem-anf4-prime-power-norm)から、整イデアルについて

$$
N(\mathfrak a\mathfrak b)=N(\mathfrak a)N(\mathfrak b)
$$

が従います。実際、異なる素イデアルの冪は互いに素であるため中国剰余定理で商の位数が積となり、同じ素イデアルの冪では指数が加算されます。また $0\ne\alpha\in A$ の主イデアル $(\alpha)$ について、整数基底での $\alpha$ 倍写像の行列式から

$$
N((\alpha))=|N_{K/\mathbb Q}(\alpha)|
$$

です。[体ノルムの埋め込み公式](../ANF2/index.md#thm-anf2-embedding-formulas)とも整合します。

次数 $n=r_1+2r_2$、体判別式 $D_K$ の数体に対し、正の定数を

$$
M_K=\frac{n!}{n^n}\left(\frac4\pi\right)^{r_2}\sqrt{|D_K|}
$$

と置きます。[Minkowski の小ノルム元の定理](../ANF5/index.md#thm-anf5-small-norm-element)は、すべての非零整イデアル $I$ に対し $0\ne\alpha\in I$ で $|N_{K/\mathbb Q}(\alpha)|\leq M_KN(I)$ となるものを与えます。

ここで $I$ の逆イデアルを使い $J=(\alpha)I^{-1}$ とします。なぜ $J$ が整イデアルかというと、$\alpha\in I$ から $(\alpha)\subseteq I$、さらに逆イデアルを掛けると

$$
J=(\alpha)I^{-1}\subseteq II^{-1}=A
$$

となるからです。$IJ=(\alpha)$ より、ノルムの乗法性を適用すると

$$
N(I)N(J)=N((\alpha))=|N_{K/\mathbb Q}(\alpha)|,
\qquad N(J)\leq M_K.
$$

したがって $[J]=[I]^{-1}$ を満たす小さい整イデアル $J$ が存在します。**逆の類**になっている点が重要です。任意の類そのものを小さくするには、その逆類を出発点に選びます。

## 3. ノルムが有界な整イデアルは有限個

「ノルムが小さい」は「候補が少ない」ことを意味するでしょうか。整数の絶対値と違ってイデアルは集合なので、有限性の証明が必要です。

<a id="lem-anf6-bounded-ideal-norm"></a>

<!-- formal-statement-start -->
> **補題（ノルム有界な整イデアルの有限性）**  
> $K/\mathbb Q$ を有限次数の数体、$A=\mathcal O_K$ とする。実数 $B\geq1$ に対して、零でない整イデアル $\mathfrak a\subseteq A$ で $N(\mathfrak a)\leq B$ を満たすものは有限個である。
<!-- formal-statement-end -->

**証明の見取り図。** $N(\mathfrak a)=m$ と固定すると、有限加法群 $A/\mathfrak a$ の全元は $m$ 倍で零になります。よって $mA\subseteq\mathfrak a$。$\mathfrak a$ は有限環 $A/mA$ のイデアルの逆像に限られます。

<!-- proof-start -->
### 証明

$m=N(\mathfrak a)$ は正整数です。加法群 $A/\mathfrak a$ の位数は $m$ です。任意の元 $x+\mathfrak a$ が生成する巡回部分群の剰余類でこの群を分割できるので、その元の位数は $m$ を割ります。従って任意の $x\in A$ に対し

$$
m(x+\mathfrak a)=0+\mathfrak a,
\qquad mx\in\mathfrak a.
$$

したがって $mA\subseteq\mathfrak a\subseteq A$。[整数基底の存在](../ANF1/index.md#thm-anf1-integral-basis)より $A$ は階数 $n$ の自由 $\mathbb Z$-加群であり、

$$
A/mA\simeq(\mathbb Z/m\mathbb Z)^n
$$

は $m^n$ 個の元を持つ有限環です。$mA$ を含む $A$ のイデアルと $A/mA$ のイデアルは商写像によって一対一に対応します。有限集合の部分集合は有限個なので、この有限環のイデアルも有限個です。ゆえにノルムがちょうど $m$ の整イデアルは有限個です。$1\leq m\leq\lfloor B\rfloor$ は有限個の値しかないため、主張が従います。
<!-- proof-end -->

**最小例。** $A=\mathbb Z$ で $m=3$ とすると $A/3A=\mathbb Z/3\mathbb Z$ です。ノルム3のイデアルは $3\mathbb Z$ だけです。一般の数体では同じ $m$ に複数のイデアルがあり得ますが、$A/mA$ という**一つの有限環**の中で数えればよいのです。

## 4. 類群が有限になる理由

<a id="thm-anf6-minkowski-class-bound"></a>

<!-- formal-statement-start -->
> **定理（Minkowskiの類数上界と類群の有限性）**  
> $K/\mathbb Q$ を次数 $n=r_1+2r_2$ の数体、$A=\mathcal O_K$、$D_K$ を体判別式とする。
> 任意のイデアル類 $c\in\operatorname{Cl}(K)$ は、零でない整イデアル $J$ により $c=[J]$ と表せ、しかも

$$
1\leq N(J)\leq
\frac{n!}{n^n}\left(\frac4\pi\right)^{r_2}\sqrt{|D_K|}=M_K
$$

> を満たす。特に $\operatorname{Cl}(K)$ は有限群である。
<!-- formal-statement-end -->

**証明の見取り図。** 対象の類の逆類を整イデアル $I$ で代表させます。上の小ノルム元から $J=(\alpha)I^{-1}$ を作れば、$J$ は求める類を代表し、ノルムは $M_K$ 以下です。最後に[有界ノルムの有限性](#lem-anf6-bounded-ideal-norm)を用います。

<!-- proof-start -->
### 証明

$c\in\operatorname{Cl}(K)$ を任意に取ります。逆類 $c^{-1}$ の分数イデアル代表を $\mathfrak b$ とします。[分数イデアルの定義](../ANF3/index.md#def-anf3-fractional-ideal)から、ある正整数 $d$ について $I=d\mathfrak b$ は非零整イデアルです。$(d)$ は主分数イデアルなので $[I]=[\mathfrak b]=c^{-1}$ です。

$I$ に [小ノルム元の定理](../ANF5/index.md#thm-anf5-small-norm-element)を適用し、$0\ne\alpha\in I$ かつ

$$
|N_{K/\mathbb Q}(\alpha)|\leq M_KN(I)
$$

を得ます。$J=(\alpha)I^{-1}$ を作ると、前節で計算したように $J$ は非零整イデアルで、

$$
N(J)=\frac{N((\alpha))}{N(I)}
=\frac{|N_{K/\mathbb Q}(\alpha)|}{N(I)}
\leq M_K.
$$

類については

$$
[J]=[(\alpha)][I]^{-1}=[A](c^{-1})^{-1}=c.
$$

したがって各 $c$ は有限集合

$$
\{J\subseteq A:\ J\ne0,\ N(J)\leq M_K\}
$$

のある元の類として表されます。この集合は[前補題](#lem-anf6-bounded-ideal-norm)により有限なので、その像である $\operatorname{Cl}(K)$ も有限です。
<!-- proof-end -->

ここで初めて、類の個数を普通の正整数として数えられます。

<a id="def-anf6-class-number"></a>

<!-- formal-statement-start -->
> **定義（類数）**  
> 数体 $K$ の有限なイデアル類群 $\operatorname{Cl}(K)$ の元の個数

$$
h_K=|\operatorname{Cl}(K)|
$$

> を $K$ の**類数**と呼ぶ。
<!-- formal-statement-end -->

類数は「互いに主イデアル倍で移り合わない非零分数イデアルが何種類あるか」という数です。$h_K=1$ は、[分数イデアルの可逆性](../ANF3/index.md#prop-anf3-invertible-ideals)を備えた整数環 $A$ ではすべての整イデアルが主イデアルであることを意味します。$A=\mathbb Z$ の場合、既に確認した通り $h_{\mathbb Q}=1$ です。

## 5. 小さい素イデアルだけを調べる

<a id="cor-anf6-class-number-one"></a>

<!-- formal-statement-start -->
> **系（類数1の判定）**  
> 数体 $K$ の Minkowski 定数 $M_K$ が $M_K<2$ を満たせば、そのイデアル類群は自明群であり $h_K=1$ である。
<!-- formal-statement-end -->

証明は短くても条件の使い方を確認しましょう。[類数上界](#thm-anf6-minkowski-class-bound)で任意の類を代表する整イデアル $J$ は $1\leq N(J)<2$。ノルムは整数なので $N(J)=1$、すなわち $A/J$ は一元環で $J=A$ です。

より一般には小さい**素イデアル**が類群を生成します。

<a id="cor-anf6-small-prime-generators"></a>

<!-- formal-statement-start -->
> **系（小ノルム素イデアルによる生成）**  
> 数体 $K$ の類群 $\operatorname{Cl}(K)$ は、$N(\mathfrak p)\leq M_K$ を満たす非零素イデアル $\mathfrak p\subseteq\mathcal O_K$ の類によって生成される。
<!-- formal-statement-end -->

[類数上界](#thm-anf6-minkowski-class-bound)で代表 $J$ を $N(J)\leq M_K$ に選び、[素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)で $J=\prod\mathfrak p_i^{e_i}$ と書きます。[ノルムの乗法性](../ANF4/index.md#lem-anf4-prime-power-norm)により $N(\mathfrak p_i)\leq N(J)\leq M_K$。従って $[J]=\prod[\mathfrak p_i]^{e_i}$ となるためです。この系は単なる有限性より強く、類群を**実際に計算する手順**を与えます。

## 6. 完全計算：$\mathbb Q(\sqrt{-5})$ の類数は2

$K=\mathbb Q(s)$、$s^2=-5$ とします。[二次体の整数環](../ANF1/index.md#thm-anf1-quadratic-integers)から $A=\mathbb Z[s]$、[二次体の判別式](../ANF2/index.md#thm-anf2-quadratic-discriminant)から $D_K=-20$ です。$n=2,r_1=0,r_2=1$ を定数へ代入すると

$$
M_K=\frac{2!}{2^2}\frac4\pi\sqrt{20}
=\frac{4\sqrt5}{\pi}\approx2.847<3.
$$

[類数上界](#thm-anf6-minkowski-class-bound)により、**すべての類はノルム1または2の整イデアルで代表されます**。

ノルム1の整イデアルは $A$ だけです。ノルム2のイデアル $J$ があれば $A/J$ は二元の体 $\mathbb F_2$ です。商写像では $s^2=-5$ の像 $t$ が

$$
t^2+5=t^2+1=(t+1)^2=0
\quad\text{in }\mathbb F_2
$$

を満たすため、$t=1$ に限られます。従って商写像は $\mathbb Z[s]\to\mathbb F_2$、$a+bs\mapsto a+b\pmod2$ の一つだけで、核は

$$
\mathfrak p=(2,1+s),\qquad A/\mathfrak p\simeq\mathbb F_2,
\qquad N(\mathfrak p)=2.
$$

これで類の候補は $[A]$ と $[\mathfrak p]$ の**高々二つ**です。

次に $\mathfrak p$ の非主性を確かめます。もし $\mathfrak p=(a+bs)$（$a,b\in\mathbb Z$）なら

$$
2=N(\mathfrak p)=|N_{K/\mathbb Q}(a+bs)|=a^2+5b^2.
$$

しかし $b=0$ なら $a^2=2$ は不可能、$b\ne0$ なら $a^2+5b^2\geq5$。よって $\mathfrak p$ は非主です。

さらに

$$
\mathfrak p^2=(4,\ 2(1+s),\ (1+s)^2)
=(4,\ 2+2s,\ -4+2s)\subseteq(2).
$$

両方のノルムは4です。左辺は $N(\mathfrak p)^2=4$、右辺は $N((2))=|N_{K/\mathbb Q}(2)|=4$ なので、包含する二つの整イデアルは等しく、$\mathfrak p^2=(2)$。ゆえに $[\mathfrak p]^2=[A]$ です。

<a id="thm-anf6-q-sqrt-minus-five-class-group"></a>

<!-- formal-statement-start -->
> **定理（Q(sqrt(-5))の類群）**  
> $K=\mathbb Q(\sqrt{-5})$、$A=\mathbb Z[\sqrt{-5}]$、$\mathfrak p=(2,1+\sqrt{-5})$ とすると、$\mathfrak p$ は非主イデアルであり、$\mathfrak p^2=(2)$ を満たす。また

$$
\operatorname{Cl}(K)=\{[A],[\mathfrak p]\}
\simeq\mathbb Z/2\mathbb Z,\qquad h_K=2.
$$
<!-- formal-statement-end -->

この例で「類群が自明でない」と「類群が有限である」を同時に確かめられました。$\mathfrak p^2$ が主イデアルでも $\mathfrak p$ 自体は主イデアルではないことが鍵です。

## 7. 類数1の体と、もう一つの類数2の体

**実二次体。** $K=\mathbb Q(\sqrt5)$ では $r_1=2,r_2=0,D_K=5$ で

$$
M_K=\frac{2!}{2^2}\sqrt5=\frac{\sqrt5}{2}<2.
$$

したがって[類数1の判定](#cor-anf6-class-number-one)から $h_K=1$。整数環は $\mathbb Z[(1+\sqrt5)/2]$ であり、$\mathbb Z[\sqrt5]$ と混同しません。

**虚二次体。** $K=\mathbb Q(i)$ なら $D_K=-4$ だから $M_K=4/\pi<2$。$K=\mathbb Q(\sqrt{-2})$ なら $D_K=-8$ だから $M_K=4\sqrt2/\pi<2$。どちらも類数1です。

**$\mathbb Q(\sqrt{-6})$ の見通し。** $s^2=-6$、$A=\mathbb Z[s]$、$D_K=-24$。このとき $M_K=4\sqrt6/\pi\approx3.119$ なのでノルム1,2,3の整イデアルを調べれば足ります。ノルム2の素イデアルは $\mathfrak p_2=(2,s)$、ノルム3は $\mathfrak p_3=(3,s)$ に一意に定まり、$a^2+6b^2=2,3$ に整数解がないので両者とも非主です。$(s)\subseteq\mathfrak p_2\mathfrak p_3$ かつ双方のノルムが6であることから $\mathfrak p_2\mathfrak p_3=(s)$。ゆえに両者は逆の類です。さらに $\mathfrak p_2^2=(2)$ なので逆類は自分自身であり、類群は二元です。演習B4でこれらの包含とノルムを省略せず確かめます。

## 8. 演習：有限性の証明と小さい素イデアルの計算

**Level A：定義を手で使う**

### A1. $\mathbb Q$ の類群

$K=\mathbb Q$、$A=\mathbb Z$ とし、任意の非零分数イデアルが主イデアルであることから $\operatorname{Cl}(K)$ を求めよ。

- Level: A
- ID: ANF6-A1

<!-- solution-start -->
**詳細解答**　零でない分数イデアルは $\mathbb Z$ の階数1の部分加群で、有理数 $q\ne0$ を用いて $q\mathbb Z$ と表せます（分母を払えば整数のイデアル $m\mathbb Z$ になる）。これは $(q)$ です。[類群の定義](#def-anf6-ideal-class-group)ではすべての類が $[A]$ なので、$\operatorname{Cl}(\mathbb Q)=\{[A]\}$、$h_{\mathbb Q}=1$。
<!-- solution-end -->

### A2. 主分数イデアル倍の意味

零でない分数イデアル $I$ と $\gamma,\delta\in K^\times$ に対して $[(\gamma)I]=[I]$ と $[(\gamma)I][(\delta)I^{-1}]=[A]$ を示せ。

- Level: A
- ID: ANF6-A2

<!-- solution-start -->
**詳細解答**　[類群の定義](#def-anf6-ideal-class-group)で主イデアル $(\gamma)$ は商で単位元になります。従って $[(\gamma)I]=[(\gamma)][I]=[A][I]=[I]$。また[分数イデアルの可逆性](../ANF3/index.md#prop-anf3-invertible-ideals)より

$$
[(\gamma)I][(\delta)I^{-1}]
=[(\gamma\delta)II^{-1}]
=[(\gamma\delta)A]=[A].
$$

最後の等号は $(\gamma\delta)A$ が主分数イデアルであるためです。
<!-- solution-end -->

### A3. ノルムと商の包含

$K/\mathbb Q$ の整数環を $A$ とし、整イデアル $J$ が $N(J)=3$ を満たすとする。$3A\subseteq J$ を証明せよ。$A=\mathbb Z$ の場合も具体的に述べよ。

- Level: A
- ID: ANF6-A3

<!-- solution-start -->
**詳細解答**　$A/J$ は加法群として位数3です。任意の $x+J$ の位数は3を割るため、$3(x+J)=0+J$、すなわち $3x\in J$。これを全ての $x\in A$ について適用すると $3A\subseteq J$ です。$A=\mathbb Z$ の場合、ノルム3の整イデアルは $3\mathbb Z$ のみで、包含は等号です。
<!-- solution-end -->

### A4. $\mathbb Q(\sqrt5)$ の類数

$K=\mathbb Q(\sqrt5)$ の署名 $(r_1,r_2)$ と判別式を答え、Minkowski 定数で類数を求めよ。

- Level: A
- ID: ANF6-A4

<!-- solution-start -->
**詳細解答**　[二次体の判別式](../ANF2/index.md#thm-anf2-quadratic-discriminant)から $D_K=5$。実埋め込みが二つで複素共役の組はないので $(r_1,r_2)=(2,0)$。次数 $n=2$ を[類数上界](#thm-anf6-minkowski-class-bound)の定数へ代入すると

$$
M_K=\frac{2}{4}(4/\pi)^0\sqrt5=\frac{\sqrt5}{2}\approx1.118<2.
$$

ノルムが $M_K$ 以下の正整数は1だけなので代表は $A$。従って $h_K=1$ です。
<!-- solution-end -->

### A5. $\mathbb Q(\sqrt{-5})$ でノルム2のイデアル

$A=\mathbb Z[s]$、$s^2=-5$ とする。$\mathfrak p=(2,1+s)$ の商を計算し、ノルム2の整イデアルがこれ以外にないことを示せ。

- Level: A
- ID: ANF6-A5

<!-- solution-start -->
**詳細解答**　$\mathbb F_2$ への写像 $\varphi(a+bs)=a+b\bmod2$ は $s$ の像1が $1^2+5\equiv0\pmod2$ を満たすため環準同型です。全射であり、核は $2$ と $1+s$ で生成される $\mathfrak p$ なので $A/\mathfrak p\simeq\mathbb F_2$、$N(\mathfrak p)=2$。逆に $N(J)=2$ なら $A/J\simeq\mathbb F_2$ で、$s$ の像 $t$ は $t^2+1=(t+1)^2=0$。体に非零冪零元はないので $t=1$。写像は $\varphi$ に一致し $J=\mathfrak p$ です。
<!-- solution-end -->

**Level B：論証を組み直す**

### B1. 有界ノルムの有限性を独立に証明する

$[K:\mathbb Q]=n$ の整数環 $A$ について、正整数 $m$ と整イデアル $J$ が $N(J)=m$ を満たすとする。$A/mA$ の位数と $mA\subseteq J$ を示し、ノルムが $m$ 以下の整イデアルが有限個であることを導け。

- Level: B
- ID: ANF6-B1

<!-- solution-start -->
**詳細解答**　[整数基底](../ANF1/index.md#thm-anf1-integral-basis)を使うと、整数環は加法群として $A\simeq\mathbb Z^n$ です。よって

$$
A/mA\simeq(\mathbb Z/m\mathbb Z)^n,\qquad |A/mA|=m^n.
$$

$A/J$ は位数 $m$ の加法群です。その各元の位数は $m$ を割る（その元が生成する巡回部分群の剰余類で群を分割できる）ので、全ての $x\in A$ について

$$
m(x+J)=0+J,\qquad mA\subseteq J.
$$

従って $J/mA$ は有限環 $A/mA$ のイデアルであり、その候補数は有限です。ノルムの値を $k=1,\dots,m$ に固定して同じ議論を繰り返せば、ノルムが $m$ 以下の整イデアルも有限個となります。
<!-- solution-end -->

### B2. 虚二次体の類数1

$K_1=\mathbb Q(i)$ と $K_2=\mathbb Q(\sqrt{-2})$ の Minkowski 定数をそれぞれ求め、両方の類数が1であることを示せ。

- Level: B
- ID: ANF6-B2

<!-- solution-start -->
**詳細解答**　どちらも $(r_1,r_2)=(0,1)$ で $n=2$。[二次体の判別式](../ANF2/index.md#thm-anf2-quadratic-discriminant)は $D_{K_1}=-4,D_{K_2}=-8$ を与えます。従って[類数上界](#thm-anf6-minkowski-class-bound)の定数は

$$
M_{K_1}=\frac{2}{4}\frac4\pi\sqrt4
=\frac4\pi\approx1.273,\qquad
M_{K_2}=\frac{2}{4}\frac4\pi\sqrt8
=\frac{4\sqrt2}{\pi}\approx1.801.
$$

ともに2未満なので[類数1の判定](#cor-anf6-class-number-one)が適用でき、$h_{K_1}=h_{K_2}=1$ です。
<!-- solution-end -->

### B3. 小さい素イデアルが生成する理由

数体 $K$ に対して $M_K$ 以下のノルムを持つ非零素イデアルの類が $\operatorname{Cl}(K)$ を生成することを、Minkowski の類数上界と素イデアル分解から証明せよ。

- Level: B
- ID: ANF6-B3

<!-- solution-start -->
**詳細解答**　任意の類 $c$ に[類数上界](#thm-anf6-minkowski-class-bound)を適用し、$[J]=c$ かつ $N(J)\leq M_K$ の整イデアルを選びます。[素イデアル分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)で $J=\mathfrak p_1^{e_1}\cdots\mathfrak p_t^{e_t}$、$e_i\geq1$ とすると、ノルムの乗法性から

$$
N(J)=\prod_{i=1}^tN(\mathfrak p_i)^{e_i}.
$$

各ノルムは2以上の整数なので $N(\mathfrak p_i)\leq N(J)\leq M_K$。従って $c=\prod_i[\mathfrak p_i]^{e_i}$ です。$J=A$ なら空積で単位類となります。よって指定した素イデアルの類がすべての $c$ を生成します。
<!-- solution-end -->

### B4. $\mathbb Q(\sqrt{-6})$ の類群

$A=\mathbb Z[s]$、$s^2=-6$ とする。$\mathfrak p_2=(2,s)$、$\mathfrak p_3=(3,s)$ がそれぞれノルム2,3の唯一の整イデアルであることを示し、$\mathfrak p_2^2=(2)$、$\mathfrak p_2\mathfrak p_3=(s)$ を証明して類群を決定せよ。

- Level: B
- ID: ANF6-B4

<!-- solution-start -->
**詳細解答**　$A/\mathfrak p_2\simeq\mathbb F_2$ と $A/\mathfrak p_3\simeq\mathbb F_3$ は $s\mapsto0$ で得られ、$s^2=-6$ と整合します。ノルム2または3の整イデアルの商は各素体です。$s$ の像 $t$ は $t^2=0$（法2,3で $-6=0$）を満たし、体に非零冪零元はないため $t=0$ が唯一です。従ってそれぞれの核は $\mathfrak p_2,\mathfrak p_3$ に一意に決まります。

$$
\mathfrak p_2^2=(4,2s,s^2)=(4,2s,-6).
$$

右辺は $(2)$ に含まれ、$(-6)-(-2)\cdot4=2$ を含むので逆包含も成り立ち $\mathfrak p_2^2=(2)$ です。$\mathfrak p_2,\mathfrak p_3$ は相異なる極大イデアルだから互いに素で、交わりが積と等しいです。$s\in\mathfrak p_2\cap\mathfrak p_3$ から $(s)\subseteq\mathfrak p_2\mathfrak p_3$。ノルムは双方とも6（$N((s))=|s(-s)|=6$）なので等号です。

[判別式の公式](../ANF2/index.md#thm-anf2-quadratic-discriminant)は $D_K=-24$、ゆえに $M_K=4\sqrt6/\pi\approx3.119<4$。各類はノルム1,2,3のどれかの整イデアルで代表されるので候補は $[A],[\mathfrak p_2],[\mathfrak p_3]$。$\mathfrak p_2\mathfrak p_3=(s)$ より $[\mathfrak p_3]=[\mathfrak p_2]^{-1}$、$\mathfrak p_2^2=(2)$ より $[\mathfrak p_2]^{-1}=[\mathfrak p_2]$ です。$a^2+6b^2=2$ に整数解がないため $\mathfrak p_2$ は非主。従って群は $[A]$ と $[\mathfrak p_2]$ の二元で、$h_K=2$ です。
<!-- solution-end -->

**Level C：有限類群と元の非一意分解を結ぶ**

### C1. $6$ の二つの分解とイデアル類

$A=\mathbb Z[s]$、$s^2=-5$ とし、$\mathfrak p=(2,1+s)$、$\mathfrak q=(3,1+s)$、$\mathfrak q'=(3,1-s)$ とする。次をすべて証明せよ。

1. $\mathfrak p,\mathfrak q,\mathfrak q'$ のノルムはそれぞれ $2,3,3$ であり、$\mathfrak q\ne\mathfrak q'$。
2. $(2)=\mathfrak p^2$、$(3)=\mathfrak q\mathfrak q'$、$(1+s)=\mathfrak p\mathfrak q$、$(1-s)=\mathfrak p\mathfrak q'$。
3. $[A]$ と $[\mathfrak p]$ がすべての類であり、$[\mathfrak q]=[\mathfrak q']=[\mathfrak p]$。
4. $6=2\cdot3=(1+s)(1-s)$ が、互いに非同伴な既約元を使った二つの分解であることを、元ノルムで説明せよ。

- Level: C
- ID: ANF6-C1

<!-- solution-start -->
**詳細解答**　**(1)** $\mathfrak p$ の商は $s\mapsto-1=1\pmod2$ で $\mathbb F_2$、$\mathfrak q$ と $\mathfrak q'$ の商はそれぞれ $s\mapsto-1$, $s\mapsto1$（法3）で $\mathbb F_3$ です。したがってノルムは2,3,3。法3で $1\ne-1$ なので、二つの核は異なります。

**(2)** 第6節の[類群の計算](#thm-anf6-q-sqrt-minus-five-class-group)で $(2)=\mathfrak p^2$ を既に示しました。$\mathfrak q,\mathfrak q'$ は異なる極大イデアルで互いに素であり、$3\in\mathfrak q\cap\mathfrak q'$。従って $(3)\subseteq\mathfrak q\mathfrak q'$ で、両辺のノルムが9なので等号です。さらに $1+s$ は $\mathfrak p$ と $\mathfrak q$ の両方に含まれ、ノルムがそれぞれ2と3の異なる極大イデアルなので互いに素です。ゆえに

$$
(1+s)\subseteq\mathfrak p\cap\mathfrak q=\mathfrak p\mathfrak q.
$$

左辺のノルムは $N_{K/\mathbb Q}(1+s)=(1+s)(1-s)=6$、右辺も $2\cdot3=6$ だから等号です。同じ計算で $(1-s)=\mathfrak p\mathfrak q'$ となります。

**(3)** [類数上界](#thm-anf6-minkowski-class-bound)から全類の代表はノルム1または2に取れ、A5でそれらは $A,\mathfrak p$ に限ると示しました。$\mathfrak p$ は非主なので両類は異なります。(2) により $[A]=[\mathfrak p][\mathfrak q]$、また $[\mathfrak p]^2=[A]$ なので $[\mathfrak q]=[\mathfrak p]^{-1}=[\mathfrak p]$。同じ理由で $[\mathfrak q']=[\mathfrak p]$ です。

**(4)** 元 $a+bs$ のノルムは $a^2+5b^2$。ノルム2,3の元は存在しません。$2$ のノルム4の非自明な積分解があれば各因子のノルムは2となり不可能です。$3$ のノルム9の非自明な積分解では各因子のノルムは3となり不可能です。$1\pm s$ のノルム6の非自明な積分解では因子ノルムは2と3となり不可能です。従って四つとも既約です。単元はノルム1を満たす $\pm1$ のみで、$2,3,1+s,1-s$ は符号を掛けても互いに一致しません。よって二つの分解は非同伴の既約因子からなります。しかしイデアルとしては

$$
(6)=(2)(3)=\mathfrak p^2\mathfrak q\mathfrak q'
=(1+s)(1-s).
$$

同じ[素イデアルの一意分解](../ANF3/index.md#thm-anf3-prime-ideal-factorization)に戻ります。非主イデアル $\mathfrak p$ が主イデアルへの分解を阻むという構造が、[類群](#def-anf6-ideal-class-group)の非自明さで説明されます。
<!-- solution-end -->

## 9. 次講へ：単数を調べる

イデアル類群は「イデアルがどの程度主イデアルではないか」を有限群にまとめました。しかし $(\alpha)=(\beta)$ のとき $\alpha$ と $\beta$ は単元倍でしか決まりません。次の ANF7 ではこの単元全体の群を調べ、実・複素埋め込みの絶対値に対数を取って、Dirichlet の単数定理とレギュレータへ進みます。
