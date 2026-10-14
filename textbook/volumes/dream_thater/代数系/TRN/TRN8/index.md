# TRN8 Hermite–Lindemann：仮定と対称化

[Hermiteの定理](../TRN6/index.md#thm-trn6-e-transcendence)では、$e$ 自身が代数的だと仮定し、非零整数と小さい積分を衝突させました。いまは $e^\alpha$ を扱います。ただし $\alpha$ は **0でない代数的数**であり、複素数でもかまいません。$e^\alpha$ が代数的だと仮定したとき、指数 $\alpha,2\alpha,\ldots$ と、その共役をどのように整理すれば、同じ方法を試せるでしょうか。

[TRN7の有限形式指数和](../TRN7/index.md#def-trn7-formal-exponential-sum)では、$U_\lambda$ は数 $e^\lambda$ ではなく指数 $\lambda$ を記録する記号でした。そこでは共役積の**形式的非零性**を示しましたが、微分・積分から非零整数を取り出すには、特別な指数（ここでは0）の係数を非零に保つ工夫が必要です。この章では、仮定から指数和を作り、共役積を取り、さらに指数の符号を反転した形式和との積を取ります。その結果、**指数0の係数が正の整数である、共役不変な非零形式指数和**を得ます。

## 1. 代数関係を指数の異なる形式和へ移す

[代数的数の定義](../../FLD/FLD1/index.md#def-fld1-algebraic-element)により、$y=e^\alpha$ が代数的なら、零でない有理係数多項式 $P_0(Y)$ が $P_0(y)=0$ を満たします。複素指数関数は値0を取らないため、$y\ne0$ です。この性質は後で定数項を残すために必要です。

<a id="prop-trn8-polynomial-relation"></a>

<!-- formal-statement-start -->
> **命題（指数関係への変換）**  
> $\alpha\in\overline{\mathbb Q}\setminus\{0\}$ とし、$y=e^\alpha$ が代数的であると仮定する。このとき整数 $m\ge1$ と $b_0,\ldots,b_m\in\mathbb Z$ が存在し、

$$
b_0b_m\ne0,\qquad
\sum_{j=0}^{m}b_je^{j\alpha}=0
$$

> を満たす。さらに任意の $\alpha$ を含む体 $K\subset\mathbb C$ において、

$$
F=\sum_{j=0}^{m}b_jU_{j\alpha}\in K[K,+]
$$

> は非零の形式指数和で、[指数評価](../TRN7/index.md#def-trn7-exponential-evaluation)は $\operatorname{ev}(F)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最初に有理係数の分母を払い、$y\ne0$ を使って多項式の定数項を非零にします。$\alpha\ne0$ だから $j\alpha$ は相異なり、形式和は零へ潰れません。最後に $U_{j\alpha}$ を $e^{j\alpha}$ に評価します。

<!-- proof-start -->
### 証明

$y=e^\alpha\ne0$ とします。$y$ の代数性から $P_0(Y)\in\mathbb Q[Y]\setminus\{0\}$ で $P_0(y)=0$ を満たすものがあります。$P_0(Y)=Y^rQ(Y)$ と、$Y$ を因子として取り出せる最大の $r\ge0$ を選びます。すると $Q(0)\ne0$ であり、

$$
0=P_0(y)=y^rQ(y),\qquad y^r\ne0
\quad\Longrightarrow\quad Q(y)=0.
$$

$Q$ が零でない定数なら $Q(y)\ne0$ となるので、$m=\deg Q\ge1$ です。$Q$ の係数の共通分母 $D\in\mathbb Z_{>0}$ を掛けて $P(Y)=DQ(Y)=\sum_{j=0}^mb_jY^j$ とすれば、$b_j\in\mathbb Z$、$b_0=DQ(0)\ne0$、$b_m\ne0$、$P(y)=0$ を得ます。

[複素指数関数の加法公式](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)を帰納的に適用すると $y^j=e^{j\alpha}$ なので、$P(y)=\sum_jb_je^{j\alpha}=0$ です。

また $j\ne k$ なら $(j-k)\alpha\ne0$ です。従って $j\alpha\ne k\alpha$ であり、$F$ の $U_0$ と $U_{m\alpha}$ の係数はそれぞれ $b_0,b_m\ne0$ です。[形式指数和の零判定](../TRN7/index.md#def-trn7-formal-exponential-sum)によって $F\ne0$ です。最後に指数評価の定義から $\operatorname{ev}(F)=P(y)=0$ となります。
<!-- proof-end -->

この証明で **$\alpha\ne0$ は指数を区別するために働きます**。仮に $\alpha=0$ なら全ての $U_{j\alpha}$ が $U_0$ に一致し、$F=P(1)U_0$ です。$P(1)=0$ なら形式的にも $F=0$ になり、後の非零積の議論を始められません。

## 2. 共役積は非零で、しかも整数係数を持つ

有限個の代数的数を含む有限Galois拡大を取る方法は [FLD4の分解体とGalois作用](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois) に従います。ここでは指数 $\alpha$ を含む有限Galois拡大 $K/\mathbb Q$ を一つ固定し、そのGalois群を $G$ とします。$b_j$ は通常の整数なので全ての $\sigma\in G$ に固定されます。

[形式和への共役作用](../TRN7/index.md#def-trn7-galois-action)を $F$ に使うと、

$$
\sigma\cdot F=\sum_{j=0}^{m}b_jU_{j\sigma(\alpha)}
$$

です。これは $e^{\sigma(\alpha)}$ が $e^\alpha$ の代数的共役であると言っているわけではありません。共役は形式上の指数へだけ作用させています。

<a id="prop-trn8-integral-conjugate-product"></a>

<!-- formal-statement-start -->
> **命題（整数係数の共役積）**  
> $\alpha\in K\setminus\{0\}$、$K/\mathbb Q$ は有限Galois拡大、$G=\operatorname{Gal}(K/\mathbb Q)$ とし、$P(Y)=\sum_{j=0}^mb_jY^j\in\mathbb Z[Y]$ は $b_0b_m\ne0$ を満たす。形式和 $F=\sum_jb_jU_{j\alpha}$ に対し、[共役積](../TRN7/index.md#def-trn7-conjugate-product)を $H=\mathcal N_G(F)$ とする。このとき

$$
H=\prod_{\sigma\in G}\left(\sum_{j=0}^mb_jU_{j\sigma(\alpha)}\right)
=\sum_{\lambda\in S}B_\lambda U_\lambda
$$

> と零係数を除いて一意に書け、$S$ は空でない有限集合、$B_\lambda\in\mathbb Z\setminus\{0\}$ である。さらに

$$
\sigma(S)=S,\qquad B_{\sigma(\lambda)}=B_\lambda
\quad(\sigma\in G,\ \lambda\in S)
$$

> が成立する。$\operatorname{ev}(F)=0$ なら $\operatorname{ev}(H)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

共役積の各項を選ぶには、各 $\sigma$ に整数 $j_\sigma\in\{0,\ldots,m\}$ を割り当てます。指数の和が衝突する場合には、**同じ指数へ寄与する係数の積を全て加える**ので、係数は整数です。非零性と不変性は [TRN7の共役積の定理](../TRN7/index.md#thm-trn7-conjugate-symmetrization)で確認します。

<!-- proof-start -->
### 証明

分配法則で全因子を展開すると、指数と係数の組は

$$
\lambda(\mathbf j)=\sum_{\sigma\in G}j_\sigma\sigma(\alpha),
\qquad
w(\mathbf j)=\prod_{\sigma\in G}b_{j_\sigma},
\quad \mathbf j=(j_\sigma)_{\sigma\in G}\in\{0,\ldots,m\}^{G}
$$

です。よって、任意の指数 $\lambda$ に付く係数を

$$
B_\lambda=
\sum_{\substack{\mathbf j\in\{0,\ldots,m\}^{G}\\
\lambda(\mathbf j)=\lambda}}w(\mathbf j)
$$

と定めれば、有限個の整数の和なので $B_\lambda\in\mathbb Z$ です。空和は0と約束し、$S=\{\lambda:B_\lambda\ne0\}$ とします。異なる $\mathbf j$ が同じ指数を与えても、上式がその衝突を正確に数えています。

$\alpha\ne0$ と $b_0b_m\ne0$ により $F\ne0$ であり、各 $\sigma\cdot F$ も非零です。[形式和の積の非零性](../TRN7/index.md#lem-trn7-no-zero-divisors)から $H\ne0$ です。従って $S\ne\varnothing$ です。

[共役作用と環演算](../TRN7/index.md#prop-trn7-galois-ring-action)を使い、任意の $\tau\in G$ について

$$
\tau\cdot H
=\prod_{\sigma\in G}(\tau\sigma)\cdot F
=\prod_{\rho\in G}\rho\cdot F=H
$$

です。2番目の等式では左からの乗法 $\sigma\mapsto\tau\sigma$ が $G$ の置換であることを使いました。[係数の共役関係](../TRN7/index.md#prop-trn7-coefficient-orbits)から $\tau(S)=S$、$B_{\tau(\lambda)}=\tau(B_\lambda)$ が従います。ところが $B_\lambda\in\mathbb Z$ なので $\tau(B_\lambda)=B_\lambda$ です。これで係数の等しさも得られました。

最後に [指数評価が積を保つこと](../TRN7/index.md#def-trn7-exponential-evaluation)から

$$
\operatorname{ev}(H)=
\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F).
$$

$\sigma=1$ の因子は $\operatorname{ev}(F)=0$ ですから積は0です。ほかの共役因子の評価値が0であるとは主張していません。
<!-- proof-end -->

ここでは、一般の [TRN7の共役不変形式和](../TRN7/index.md#prop-trn7-coefficient-orbits)と異なり、出発点の $b_j$ が全て**通常の整数**なので、展開後の $B_\lambda$ も整数です。一般の代数的係数の場合に、同じ結論へ飛んではいけません。

### 例：共役の交換と指数の衝突

$s=\sqrt2$、$K=\mathbb Q(s)$、$G=\{1,\sigma\}$、$\sigma(s)=-s$ とし、形式的な試算として $P(Y)=1+Y$ を選びます。これは「$1+e^s=0$」という仮定ではなく、共役積の計算例です。

$$
\begin{aligned}
F&=U_0+U_s,&
\sigma\cdot F&=U_0+U_{-s},\\
H&=(U_0+U_s)(U_0+U_{-s})\\
 &=U_0+U_s+U_{-s}+U_{s+(-s)}\\
 &=2U_0+U_s+U_{-s}.
\end{aligned}
$$

指数0への寄与は $(0,0)$ と $(s,-s)$ の二組で、係数は $1+1=2$ です。$\sigma$ は $U_s$ と $U_{-s}$ を交換し、その係数はいずれも1なので $H$ を固定します。ここでは偶然に指数0の係数が非零になりましたが、**一般の共役積でそれを仮定することはできません**。

## 3. 指数0の係数を相殺させない工夫

整数係数の形式和が非零であることから、指数0の係数が非零とは限りません。たとえば $U_s-U_{-s}$ は非零ですが、$U_0$ の係数は0です。そこで非零係数を持つ各指数 $\lambda$ と、その符号を反転した $-\lambda$ を組み合わせます。

<a id="def-trn8-reflection"></a>

<!-- formal-statement-start -->
> **定義（指数反転）**  
> 有限形式指数和 $H=\sum_{\lambda\in S}B_\lambda U_\lambda\in K[K,+]$ に対し、指数反転を

$$
H^\vee=\sum_{\lambda\in S}B_\lambda U_{-\lambda}
$$

> と定める。係数は動かさず、指数だけを $\lambda\mapsto-\lambda$ に替える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn8-reflection -->
**定義の確認**

$s=\sqrt2$、$H=2U_0+U_s-U_{-s}$ とします。$0,s,-s$ は相異なる指数で、反転後も相異なります。したがって

$$
H^\vee=2U_{-0}+U_{-s}-U_s
=2U_0-U_s+U_{-s}.
$$

この操作をもう一度行えば $(H^\vee)^\vee=H$ です。指数記号の反転は複素共役ではなく、たとえば $\operatorname{ev}(H^\vee)=2+e^{-s}-e^s$ と評価されます。
<!-- definition-example-end -->

<a id="lem-trn8-positive-zero-coefficient"></a>

<!-- formal-statement-start -->
> **補題（指数反転積の0係数）**  
> $K\subset\mathbb C$ を体、$H=\sum_{\lambda\in S}B_\lambda U_\lambda\in K[K,+]$ とする。$S$ は相異なる指数からなる有限集合で、$B_\lambda\in\mathbb Z\setminus\{0\}$ とする。$H\ne0$ なら $R=HH^\vee$ は非零であり、その $U_0$ の係数は

$$
c_0=\sum_{\lambda\in S}B_\lambda^2\in\mathbb Z_{>0}.
$$

> また $R^\vee=R$ であり、全ての係数は整数となる。
<!-- formal-statement-end -->

### 証明の見取り図

$HH^\vee$ の指数は $\lambda-\mu$ です。この差が0となるのは $\lambda=\mu$ のときだけなので、指数0の係数は**整数の平方の和**となり、相殺が起こりません。

<!-- proof-start -->
### 証明

積を分配すると

$$
R=HH^\vee
=\sum_{\lambda\in S}\sum_{\mu\in S}
 B_\lambda B_\mu U_{\lambda-\mu}.
$$

$U_0$ が現れる条件は $\lambda-\mu=0$、すなわち $\lambda=\mu$ です。異なる指数ごとに一つずつ係数を定めたので、指数0の係数は

$$
c_0=\sum_{\substack{\lambda,\mu\in S\\\lambda-\mu=0}}
B_\lambda B_\mu
=\sum_{\lambda\in S}B_\lambda^2.
$$

$S\ne\varnothing$ かつ $B_\lambda$ は非零整数であるため、各平方は1以上の整数であり $c_0\ge1$ です。従って $R\ne0$ です。一般の指数 $\nu$ の係数も

$$
c_\nu=\sum_{\substack{\lambda,\mu\in S\\\lambda-\mu=\nu}}
B_\lambda B_\mu\in\mathbb Z
$$

であり、$\lambda,\mu$ を交換すると $c_{-\nu}=c_\nu$ です。従って $R^\vee=R$ です。
<!-- proof-end -->

**なぜ整数係数が大事か。** 複素数係数なら $\sum B_\lambda^2$ が0になることがあります。例えば $H=U_s+iU_{-s}$ では $1^2+i^2=0$ です。平方和の正値性は、係数が実数であるだけでなく、この章では**整数**であることから保証されます。複素係数を扱うときに同じ補題を条件なしに使うことはできません。

### 例：負の係数も平方にすれば相殺しない

$H=U_s-U_{-s}$ とします。$H^\vee=U_{-s}-U_s=-H$ なので、

$$
\begin{aligned}
HH^\vee
&=(U_s-U_{-s})(U_{-s}-U_s)\\
&=U_0-U_{2s}-U_{-2s}+U_0\\
&=2U_0-U_{2s}-U_{-2s}.
\end{aligned}
$$

$U_0$ の係数は $1^2+(-1)^2=2$ です。反転前に0項がなくても、反転積を作れば0項が残ります。ただし、この例の $H$ に指数評価零の仮定はありません。

## 4. 仮定から得る対称な指数関係

<a id="thm-trn8-balanced-relation"></a>

<!-- formal-statement-start -->
> **定理（Hermite–Lindemannの仮定から作る対称関係）**  
> $0\ne\alpha\in\overline{\mathbb Q}$ とし、$e^\alpha$ が代数的だと仮定する。このとき有限Galois拡大 $K/\mathbb Q$ と、相異なる代数的指数の有限集合 $T\subset K$、非零整数係数 $c_\nu\in\mathbb Z\setminus\{0\}$（$\nu\in T$）が存在し、

$$
R=\sum_{\nu\in T}c_\nu U_\nu\in K[K,+]
$$

> は以下の全条件を満たす。
>
> 1. $0\in T$、$c_0\in\mathbb Z_{>0}$。
> 2. $T=-T$ で $c_{-\nu}=c_\nu$。任意の $\sigma\in\operatorname{Gal}(K/\mathbb Q)$ に対して $\sigma(T)=T$ かつ $c_{\sigma(\nu)}=c_\nu$。
> 3. $R\ne0$ は**形式和として**成立し、

$$
\operatorname{ev}(R)=\sum_{\nu\in T}c_\nu e^\nu=0
$$

> は**複素数として**成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[指数関係への変換](#prop-trn8-polynomial-relation)で非零の $F$ を得ます。[整数係数の共役積](#prop-trn8-integral-conjugate-product)で、非零・共役不変・整数係数の $H$ を得ます。最後に [指数反転積の0係数](#lem-trn8-positive-zero-coefficient)で $R=HH^\vee$ を作ります。指数評価が0であることは、**元の $F$ が評価0であるため**に成立します。

<!-- proof-start -->
### 証明

[指数関係への変換](#prop-trn8-polynomial-relation)を仮定に適用します。$m\ge1$ と $b_0,\ldots,b_m\in\mathbb Z$ を固定して、$b_0b_m\ne0$ かつ

$$
F=\sum_{j=0}^m b_jU_{j\alpha}\ne0,
\qquad \operatorname{ev}(F)=0
$$

を得ます。$\alpha$ の最小多項式の分解体を含む有限Galois拡大 $K/\mathbb Q$ を取り、$G=\operatorname{Gal}(K/\mathbb Q)$ とします。

[整数係数の共役積](#prop-trn8-integral-conjugate-product)により

$$
H=\mathcal N_G(F)=\sum_{\lambda\in S}B_\lambda U_\lambda
$$

と表せます。$S$ は非空、全 $B_\lambda$ は非零整数、$H$ は $G$ 不変、$\operatorname{ev}(H)=0$ です。

[指数反転](#def-trn8-reflection)を使い $R=HH^\vee$ とします。積を展開して、全ての $\nu\in K$ に対し

$$
c_\nu=
\sum_{\substack{\lambda,\mu\in S\\\lambda-\mu=\nu}}
B_\lambda B_\mu,\qquad
T=\{\nu\in K:c_\nu\ne0\}
$$

と置きます。$S$ は有限なので $T$ も有限で、零係数を除いた表示 $R=\sum_{\nu\in T}c_\nu U_\nu$ では指数が相異なります。

[0係数の補題](#lem-trn8-positive-zero-coefficient)を $H$ に適用すると

$$
c_0=\sum_{\lambda\in S}B_\lambda^2\ge1
$$

です。従って $0\in T$ かつ $R\ne0$ で、全係数は整数です。また $\lambda,\mu$ を交換すると $c_{-\nu}=c_\nu$ なので、$T=-T$ です。

共役不変性を確認します。[前章の係数関係](../TRN7/index.md#prop-trn7-coefficient-orbits)と $B_\lambda\in\mathbb Z$ より、$\sigma(S)=S$、$B_{\sigma(\lambda)}=B_\lambda$ です。$\sigma$ は加法を保つので

$$
\begin{aligned}
c_{\sigma(\nu)}
&=\sum_{\substack{\lambda',\mu'\in S\\
\lambda'-\mu'=\sigma(\nu)}}B_{\lambda'}B_{\mu'}\\
&=\sum_{\substack{\lambda,\mu\in S\\
\lambda-\mu=\nu}}B_{\sigma(\lambda)}B_{\sigma(\mu)}\\
&=\sum_{\substack{\lambda,\mu\in S\\
\lambda-\mu=\nu}}B_\lambda B_\mu=c_\nu.
\end{aligned}
$$

2行目は $\lambda'=\sigma(\lambda)$、$\mu'=\sigma(\mu)$ と変数を置き換えたものです。この置換が全単射なのは $\sigma(S)=S$ だからです。従って $\sigma(T)=T$ です。

最後に [指数評価の乗法性](../TRN7/index.md#def-trn7-exponential-evaluation)を $H,H^\vee$ に適用すると

$$
\operatorname{ev}(R)
=\operatorname{ev}(H)\operatorname{ev}(H^\vee)
=0\cdot\operatorname{ev}(H^\vee)=0.
$$

$\operatorname{ev}(H^\vee)$ はどの複素数であっても構いません。以上が全条件です。
<!-- proof-end -->

### 具体計算で最終構成を確かめる

先ほどの $H=2U_0+U_s+U_{-s}$ は反転しても同じなので、

$$
\begin{aligned}
R=H^2
&=(2U_0+U_s+U_{-s})^2\\
&=4U_0+4U_s+4U_{-s}
 +U_{2s}+2U_0+U_{-2s}\\
&=6U_0+4U_s+4U_{-s}+U_{2s}+U_{-2s}.
\end{aligned}
$$

$0$ の係数は $6=2^2+1^2+1^2$ です。また $\sigma(s)=-s$ と反転 $\nu\mapsto-\nu$ の双方が支持集合 $\{0,\pm s,\pm2s\}$ を保ち、対応する係数は等しくなります。これは**形式演算だけ**の具体例であり、$1+e^s=0$ を示した計算ではありません。

## 5. どの仮定がどこで必要か

- **$\alpha\ne0$**：$j\alpha$ が相異なることを保証し、$F\ne0$ の出発点になります。
- **$e^\alpha$ の代数性**：整数係数の多項式関係 $P(e^\alpha)=0$ を与えます。これがなければ指数評価零を主張できません。
- **係数が整数**：共役積でも整数係数が残り、$c_0=\sum B_\lambda^2>0$ と言えます。一般の代数的係数で平方の和の正値性を使うのは誤りです。
- **有限Galois拡大**：指数集合を有限個の共役の下で閉じさせ、共役積を不変にします。$\sigma(e^\lambda)=e^{\sigma(\lambda)}$ は使いません。
- **零係数を削除する順番**：まず全組の指数をまとめて $B_\lambda$ を決め、次に差指数をまとめて $c_\nu$ を決めます。衝突項を先に捨ててはいけません。

ここで得た $R$ について、[係数和写像](../TRN7/index.md#def-trn7-augmentation)は必ずしも非零ではありません。実際 $\varepsilon(R)=\varepsilon(H)^2$ なので、$\varepsilon(H)=0$ なら係数和は0です。しかし **$c_0>0$ は独立に成立**します。後続の積分法では、この区別によって非零性の入口を確保します。

## 6. 演習

### Level A：出発点と形式演算

**TRN8-A1（多項式関係の準備）**  
$\alpha\ne0$、$y=e^\alpha$ が代数的で、$(Y^2-3Y+2)(y)=0$ と仮定します。$F$ を作り、指数が相異なる理由と $\operatorname{ev}(F)$ を述べてください。

- Level: A

<!-- solution-start -->
**詳細解答**

係数は $(b_0,b_1,b_2)=(2,-3,1)$ です。従って

$$
F=2U_0-3U_\alpha+U_{2\alpha}.
$$

$\alpha\ne0$ より $0,\alpha,2\alpha$ は相異なり、係数2と1は非零なので $F\ne0$ です。一方、

$$
\operatorname{ev}(F)=2-3e^\alpha+e^{2\alpha}
=2-3y+y^2=0
$$

です。**形式的非零性と評価零は両立**します。
<!-- solution-end -->

**TRN8-A2（零指数への崩壊）**  
$\alpha=0$ と $P(Y)=Y-1$ について、$\sum_{j=0}^1b_jU_{j\alpha}$ と指数評価を計算し、TRN8の非零性の証明が使えない理由を述べてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$b_0=-1,b_1=1$ で、$0\alpha=1\alpha=0$ だから、

$$
F=-U_0+U_0=0,\qquad
\operatorname{ev}(F)=-e^0+e^0=0.
$$

係数はそれぞれ非零ですが、**指数が衝突して相殺**します。$j\alpha$ が相異なるという [指数関係への変換](#prop-trn8-polynomial-relation)の仮定を失ったため、$F\ne0$ を結論できません。
<!-- solution-end -->

**TRN8-A3（共役積の衝突）**  
$s=\sqrt2$ とし、$F=2U_0-U_s$ の $\mathbb Q(s)/\mathbb Q$ における共役積を計算してください。

- Level: A

<!-- solution-start -->
**詳細解答**

非自明な自己同型 $\sigma$ では $\sigma(s)=-s$ で、係数2と $-1$ は固定されます。よって

$$
\begin{aligned}
H&=(2U_0-U_s)(2U_0-U_{-s})\\
&=4U_0-2U_s-2U_{-s}+U_{s+(-s)}\\
&=5U_0-2U_s-2U_{-s}.
\end{aligned}
$$

指数0の係数は $4+1=5$ です。係数は全て整数で、$\sigma$ は $U_s$ と $U_{-s}$ を交換して $H$ を保ちます。
<!-- solution-end -->

**TRN8-A4（反転と平方和）**  
$H=3U_0+2U_s-U_{-s}$ について $H^\vee$ と $HH^\vee$ の指数0の係数を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

指数だけ符号を替えるので

$$
H^\vee=3U_0+2U_{-s}-U_s.
$$

$HH^\vee$ の指数は $\lambda-\mu$ です。0となるのは同じ指数同士を選ぶときだけなので、

$$
c_0=3\cdot3+2\cdot2+(-1)\cdot(-1)
=9+4+1=14.
$$

特に $c_0>0$ です。異なる指数の組からの寄与を0係数へ混ぜることはありません。
<!-- solution-end -->

### Level B：相殺と対称性を検証する

**TRN8-B1（共役積の最大項）**  
$K=\mathbb Q(\sqrt2)$、$s=\sqrt2$、$F=U_s-U_0$ とします。共役積 $H$ を計算し、形式的に非零であることと、$U_0$ の係数の符号を確認してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$\sigma\cdot F=U_{-s}-U_0$ なので

$$
\begin{aligned}
H&=(U_s-U_0)(U_{-s}-U_0)\\
&=U_0-U_s-U_{-s}+U_0\\
&=2U_0-U_s-U_{-s}.
\end{aligned}
$$

係数は $(2,-1,-1)$ です。例えば指数 $s$ の係数は $-1\ne0$ なので $H\ne0$ です。また指数0の係数は2で正です。ただしこれは特定例であり、一般の共役積の0係数が正になる根拠にはなりません。[反転積の補題](#lem-trn8-positive-zero-coefficient)にはこの欠点がありません。
<!-- solution-end -->

**TRN8-B2（衝突後の係数公式）**  
$K=\mathbb Q(s)$、$s=\sqrt2$、$H=U_0+U_s-U_{-s}$ とします。$R=HH^\vee$ を全て展開し、$c_{2s}=c_{-2s}$ と $c_0>0$ を確認してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$H^\vee=U_0+U_{-s}-U_s$ です。まず三つの項それぞれを掛けると、

$$
\begin{aligned}
R&=U_0+U_{-s}-U_s\\
&\quad+U_s+U_0-U_{2s}\\
&\quad-U_{-s}-U_{-2s}+U_0.
\end{aligned}
$$

$U_s$ と $U_{-s}$ の項はそれぞれ相殺し、0項は三つ残るため、

$$
R=3U_0-U_{2s}-U_{-2s}.
$$

従って $c_{2s}=c_{-2s}=-1$、$c_0=3=1^2+1^2+(-1)^2>0$ です。非零性は最後の0係数だけでも確認できます。
<!-- solution-end -->

**TRN8-B3（Galois作用と係数）**  
$K/\mathbb Q$ を有限Galois拡大、$H=\sum_{\lambda\in S}B_\lambda U_\lambda$ は $G$ 不変かつ $B_\lambda\in\mathbb Z\setminus\{0\}$ とします。$c_\nu=\sum_{\lambda-\mu=\nu}B_\lambda B_\mu$ が $c_{\sigma(\nu)}=c_\nu$ を満たすことを、添字の置換を示して証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

[係数の共役関係](../TRN7/index.md#prop-trn7-coefficient-orbits)より $\sigma(S)=S$ と $B_{\sigma(\lambda)}=\sigma(B_\lambda)=B_\lambda$ を得ます。$\sigma$ は加法・減法を保ち、$S$ 上で全単射なので

$$
\begin{aligned}
c_{\sigma(\nu)}
&=\sum_{\substack{\lambda',\mu'\in S\\\lambda'-\mu'=\sigma(\nu)}}
 B_{\lambda'}B_{\mu'}\\
&=\sum_{\substack{\lambda,\mu\in S\\\lambda-\mu=\nu}}
 B_{\sigma(\lambda)}B_{\sigma(\mu)}\\
&=\sum_{\substack{\lambda,\mu\in S\\\lambda-\mu=\nu}}
 B_\lambda B_\mu=c_\nu.
\end{aligned}
$$

2行目は $\lambda'=\sigma(\lambda)$、$\mu'=\sigma(\mu)$ という全単射の置換です。0係数を除いた支持集合も $\sigma$ で保存されます。
<!-- solution-end -->

**TRN8-B4（係数和の落とし穴）**  
$s=\sqrt2$、$H=U_s-U_{-s}$ に対し、$H\ne0$、$\varepsilon(H)=0$、$HH^\vee$ の0係数が正であることを確認し、それぞれ異なる判定である理由を述べてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$s\ne-s$ で係数 $(1,-1)$ は非零なので、[形式的零判定](../TRN7/index.md#def-trn7-formal-exponential-sum)から $H\ne0$ です。しかし [係数和](../TRN7/index.md#def-trn7-augmentation)は

$$
\varepsilon(H)=1-1=0.
$$

反転積は

$$
HH^\vee=(U_s-U_{-s})(U_{-s}-U_s)
=2U_0-U_{2s}-U_{-2s},
$$

従って0係数は $1^2+(-1)^2=2>0$ です。形式的非零は「どこかの指数の係数が非零」、係数和非零は「全係数の合計が非零」、反転積の0係数正は「整数平方の和が正」です。別の性質なので、一方から他方を推論してはいけません。
<!-- solution-end -->

### Level C：仮定から対称な関係を再構成する

**TRN8-C1（全工程の証明）**  
$0\ne\alpha\in\overline{\mathbb Q}$ かつ $e^\alpha$ は代数的と仮定します。次を全て証明してください。

1. 整数係数の非零形式指数和 $F$ で $\operatorname{ev}(F)=0$ を作り、$\alpha\ne0$ の用途を指摘する。
2. $\alpha$ を含む有限Galois拡大上の共役積 $H$ を展開式から定め、重複指数があっても係数が整数で、$H\ne0$ かつ $\operatorname{ev}(H)=0$ であることを示す。
3. $R=HH^\vee$ を作って0係数を明示し、反転対称性・Galois不変性・評価零を確認する。
4. この段階だけでは超越性との矛盾にならない理由を述べる。

- Level: C

<!-- solution-start -->
**詳細解答**

代数性より有理係数の非零多項式 $P_0(Y)$ が $P_0(e^\alpha)=0$ を満たします。$e^\alpha\ne0$ を使って $P_0(Y)=Y^rQ(Y)$ の $Y$ の因子を除けば $Q(0)\ne0$、$Q(e^\alpha)=0$ です。係数の共通分母を掛けて $P(Y)=\sum_{j=0}^mb_jY^j\in\mathbb Z[Y]$、$b_0b_m\ne0$ を得ます。$m\ge1$ です。そこで

$$
F=\sum_{j=0}^m b_jU_{j\alpha},
\qquad \operatorname{ev}(F)=P(e^\alpha)=0
$$

とします。$\alpha\ne0$ なら $j\alpha=k\alpha$ は $j=k$ を意味し、異なる指数の非零係数 $b_0,b_m$ が残るため $F\ne0$ です。

$K/\mathbb Q$ を $\alpha$ を含む有限Galois拡大、$G$ をその群とします。形式的共役積は

$$
H=\prod_{\sigma\in G}
\left(\sum_{j=0}^mb_jU_{j\sigma(\alpha)}\right).
$$

各因子から $j_\sigma\in\{0,\ldots,m\}$ を選んだ組の係数と指数は

$$
w(\mathbf j)=\prod_\sigma b_{j_\sigma}\in\mathbb Z,
\qquad \lambda(\mathbf j)=\sum_\sigma j_\sigma\sigma(\alpha).
$$

同じ指数を持つ全組の係数を加え $B_\lambda=\sum_{\mathbf j:\lambda(\mathbf j)=\lambda}w(\mathbf j)$ とすれば、各 $B_\lambda$ は整数です。零係数を除いた集合を $S$ とします。[形式和の積の非零性](../TRN7/index.md#lem-trn7-no-zero-divisors)により $H\ne0$、従って $S$ は非空です。[共役積の定理](../TRN7/index.md#thm-trn7-conjugate-symmetrization)により $H$ は $G$ 不変で、

$$
\operatorname{ev}(H)=
\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F)=0
$$

です。最後の積には $\sigma=1$ の零因子があります。

反転を $H^\vee=\sum_{\mu\in S}B_\mu U_{-\mu}$ と定めます。すると

$$
R=HH^\vee=\sum_{\lambda,\mu\in S}B_\lambda B_\mu U_{\lambda-\mu}.
$$

指数0に残るのは $\lambda=\mu$ の組だけなので

$$
c_0=\sum_{\lambda\in S}B_\lambda^2\in\mathbb Z_{>0}.
$$

一般の係数 $c_\nu=\sum_{\lambda-\mu=\nu}B_\lambda B_\mu$ は整数です。添字交換で $c_{-\nu}=c_\nu$、$G$ による組の置換と $B_{\sigma(\lambda)}=B_\lambda$ から $c_{\sigma(\nu)}=c_\nu$ を得ます。非零係数の支持集合 $T$ は有限で、$0\in T$、$T=-T$、$\sigma(T)=T$ です。指数評価は積を保つので $\operatorname{ev}(R)=\operatorname{ev}(H)\operatorname{ev}(H^\vee)=0$ です。

ただし $R\ne0$ と $\operatorname{ev}(R)=0$ は、形式和と複素数という**異なる空間での二つの主張**です。[TRN7の指数評価](../TRN7/index.md#def-trn7-exponential-evaluation)は単射と証明されていません。後続では特別項 $c_0$ を用いて非零整数を構成し、それと複素積分の上界を矛盾させる必要があります。
<!-- solution-end -->

## 7. 次に必要となるもの

整数係数 $c_\nu$ と非零特別係数 $c_0$ を得たので、指数0以外の有限個の代数的指数を高重複度の零点にした補助多項式を考えられます。しかし、**$c_0>0$ だけで指数和 $\sum c_\nu e^\nu=0$ が不可能と結論することはできません**。

[Hermiteの複素端点積分恒等式](../TRN4/index.md#thm-trn4-complex-endpoint)へ具体的な補助多項式を代入し、特別項を素数合同で残し、算術量の整数性・非零性を解析的上界と突き合わせることが次の課題です。TRN9では重複零点と微分値を、TRN10では非零整数の下界と積分上界を扱います。
