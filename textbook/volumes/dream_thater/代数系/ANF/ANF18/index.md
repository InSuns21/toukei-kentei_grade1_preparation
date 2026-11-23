# ANF18 類体論の計算例

[前講の有限局所 Artin 写像](../ANF17/index.md#thm-anf17-local-reciprocity)は、有限 Abel 拡大のノルム商を Galois 群と結び付けました。しかし、その同型だけでは「例えば $6$ は何に写るのか」という問いに答えられません。本講では $\mathbb Q_p$ の円分拡大を使い、**付値、単数の合同類、自己同型の指数**を実際に計算します。

最初に全体の約束を固定します。$p$ は奇素数、$K=\mathbb Q_p$、$v_p(p)=1$、$\mathcal O_K=\mathbb Z_p$ です。任意の $a\in K^\times$ は一意に

$$
a=p^m u,\qquad m=v_p(a)\in\mathbb Z,\quad u\in\mathbb Z_p^\times
$$

と書けます。[付値・単数の分解](../ANF16/index.md#prop-anf16-valuation-unit-sequence)がこの計算の出発点です。$\bar u_r$ は $u$ の $(\mathbb Z/p^r\mathbb Z)^\times$ における合同類とします。

## 1. 円分拡大の次数を、根の方程式から求める

正整数 $r$ に対し、複素数体での通常の意味での位数 $p^r$ の原始根を、固定した代数閉包内に選んで $\zeta_{p^r}$ と書きます。「原始」とは $\zeta_{p^r}^{p^r}=1$ で、それより小さい正の冪では $1$ にならないことです。この根を $\mathbb Q_p$ に添加した $C_r=K(\zeta_{p^r})$ を考えます。根の間の作用を計算するには、まず次数が必要です。

<a id="prop-anf18-cyclotomic-degree"></a>

<!-- formal-statement-start -->
> **命題（素数冪円分局所拡大の次数・全分岐）**  
> 奇素数 $p$ と整数 $r\ge1$ に対し、次の拡大は Galois 拡大である。

$$
C_r=\mathbb Q_p(\zeta_{p^r}),\qquad
[C_r:\mathbb Q_p]=p^{r-1}(p-1).
$$

> さらに $C_r/\mathbb Q_p$ は全分岐で、$\zeta_{p^r}-1$ はその一様化元である。
<!-- formal-statement-end -->

### 証明の見取り図

原始 $p^r$ 乗根すべてを零点にもつ多項式を $T=1+X$ へ移し、$p$ を法として還元します。定数項が $p$、その他の非最高次係数が $p$ の倍数なので、[Eisenstein の既約性判定](../ANF10/index.md#thm-anf10-eisenstein-irreducible)を適用できます。

<!-- proof-start -->
### 証明

$p^r$ 次原始根の多項式は

$$
\Phi_{p^r}(T)=\frac{T^{p^r}-1}{T^{p^{r-1}}-1}
=\sum_{j=0}^{p-1}T^{j p^{r-1}}
$$

であり、次数は $d_r=(p-1)p^{r-1}$ です。整数係数多項式 $G_r(X)=\Phi_{p^r}(1+X)$ を考えます。$\mathbb F_p[X]$ では $(1+X)^{p^s}=1+X^{p^s}$ なので、

$$
\begin{aligned}
G_r(X)\bmod p
&=\sum_{j=0}^{p-1}(1+X^{p^{r-1}})^j\\
&=\frac{(1+X^{p^{r-1}})^p-1}{X^{p^{r-1}}}
=X^{(p-1)p^{r-1}}.
\end{aligned}
$$

ここで分数表示は $\mathbb F_p[X]$ の多項式恒等式を表します。従って最高次以外の全係数は $p$ で割り切れます。一方、$G_r(0)=\Phi_{p^r}(1)=p$ は $p^2$ では割り切れず、最高次係数は $1$ です。[Eisenstein の既約性判定](../ANF10/index.md#thm-anf10-eisenstein-irreducible)から $G_r$ は $\mathbb Q_p$ 上既約で、$[\mathbb Q_p(\zeta_{p^r}-1):\mathbb Q_p]=d_r$ です。

さらに、[Eisenstein 拡大の付値環と一様化元](../ANF10/index.md#thm-anf10-eisenstein-extension)により $\zeta_{p^r}-1$ が一様化元、分岐指数が $d_r$ です。ゆえに剰余次数は $1$ で全分岐です。$\Phi_{p^r}$ の根はすべて $\zeta_{p^r}^b$（$p\nmid b$）で $C_r$ 内にあるため、標数 $0$ で分離的な分解体 $C_r/K$ は Galois です。
<!-- proof-end -->

**手計算例。** $p=5,r=1$ なら

$$
\Phi_5(1+X)=X^4+5X^3+10X^2+10X+5.
$$

定数項 $5$ の付値は $1$、ほかの非最高次係数はすべて $5$ の倍数です。よって $C_1=\mathbb Q_5(\zeta_5)$ は全分岐四次拡大。$r=2$ なら $d_2=5(5-1)=20$ で、$\zeta_{25}-1$ は全分岐二十次拡大の一様化元です。

## 2. 自己同型を指数に変え、Artin 写像で計算する

$C_r/K$ の自己同型は $\zeta_{p^r}$ の像を決めれば一意に定まります。像は再び原始 $p^r$ 乗根なので $\zeta_{p^r}^b$（$p\nmid b$）の形です。この $b$ の合同類を記録すれば、自己同型の合成は掛け算になります。

<a id="def-anf18-cyclotomic-exponent"></a>

<!-- formal-statement-start -->
> **定義（円分 Galois 指数）**  
> $C_r=\mathbb Q_p(\zeta_{p^r})$ とし、$\sigma\in\operatorname{Gal}(C_r/\mathbb Q_p)$ を取る。次の式を満たす唯一の合同類を円分 Galois 指数とする。

$$
\chi_r(\sigma)=\bar b_r\in(\mathbb Z/p^r\mathbb Z)^\times,
\qquad \sigma(\zeta_{p^r})=\zeta_{p^r}^{\,b}.
$$

> 逆に $\chi_r(\sigma_b)=\bar b_r$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf18-cyclotomic-exponent -->
**定義の確認**。 $p=5,r=1$ とします。前節の次数は $4$、原始五乗根は $\zeta_5,\zeta_5^2,\zeta_5^3,\zeta_5^4$ の四つです。$\Phi_5$ は分解体 $C_1$ で分離的なので各根へ送る $K$-自己同型 $\sigma_1,\ldots,\sigma_4$ が一意に存在します。$\sigma_2(\zeta_5)=\zeta_5^2$、$\sigma_3(\zeta_5)=\zeta_5^3$、さらに

$$
(\sigma_b\circ\sigma_c)(\zeta_5)=\sigma_b(\zeta_5^c)=\zeta_5^{bc}
$$

なので、$\chi_1(\sigma_b\sigma_c)=\bar b_1\bar c_1$ です。核は指数 $1$ の恒等写像のみ、両群の位数はともに $4$ なので $\chi_1$ は同型です。実際、一般の $r$ でも前節の次数と根の個数がともに $d_r$ なので同じ論証が通ります。
<!-- definition-example-end -->

[前講の有限局所 Artin 写像](../ANF17/index.md#def-anf17-finite-reciprocity)では、非分岐拡大の一様化元を**算術的 Frobenius**（剰余体上 $x\mapsto x^p$）へ送ると規格化しました。この約束に合わせた円分拡大での計算公式は次のとおりです。

<a id="thm-anf18-explicit-cyclotomic-reciprocity"></a>

<!-- formal-statement-start -->
> **定理（素数冪円分拡大の明示局所相互法則）**  
> 奇素数 $p$、整数 $r\ge1$ と $C_r=\mathbb Q_p(\zeta_{p^r})$ をとる。$a=p^m u$（$m\in\mathbb Z$、$u\in\mathbb Z_p^\times$）に対する算術的 Frobenius 規格化の局所 Artin 写像は

$$
\operatorname{rec}_{C_r/\mathbb Q_p}(p^m u)(\zeta_{p^r})
=\zeta_{p^r}^{\,\bar u_r^{-1}}.
$$

> 従って $\operatorname{rec}_{C_r/\mathbb Q_p}(p)=1$ で、単数はその合同類の**逆元**を指数にもつ自己同型に写る。
<!-- formal-statement-end -->

この公式は**明示局所相互法則の外部定理**です。[局所相互法則の一般形](../ANF17/index.md#thm-anf17-local-reciprocity)と次数だけでは、$\bar u_r$ と $\bar u_r^{-1}$ のどちらを採用するかまで計算できません。Lubin–Tate 理論等を用いた標準証明は K. Kedlaya, *Class Field Theory*, [局所相互法則](https://kskedlaya.org/cft/sec_localrecip.html) を参照してください。この講では**この一つの明示公式を入力**とし、それ以降の合同式計算・ノルム判定・拡大の組合せを証明します。

**逆元の実計算。** $p=5,r=1,u=2$ なら $2^{-1}\equiv3\pmod5$ なので

$$
\operatorname{rec}_{C_1/K}(2)=\sigma_3,\qquad
\sigma_3(\zeta_5)=\zeta_5^3.
$$

$\sigma_3^2=\sigma_4$、$\sigma_3^4=1$ だから像の位数は $4$ です。$u=6,r=2$ なら $6\cdot21=126\equiv1\pmod{25}$ なので

$$
\operatorname{rec}_{C_2/K}(6)=\sigma_{21},\qquad
21^2\equiv16,\quad21^4\equiv6,\quad21^5\equiv1\pmod{25}.
$$

$\sigma_{21}$ の位数は $5$ です。一方 $6\equiv1\pmod5$ なので、その $C_1$ への制限は恒等写像です。

## 3. ノルムかどうかを合同式だけで決める

元がノルムであるかどうかは、[Artin 写像の核＝ノルム群](../ANF17/index.md#prop-anf17-artin-quotient)を適用します。ここでは $p$ の冪はすべて核に入り、単数部分だけが障害になります。

<a id="prop-anf18-cyclotomic-norm-test"></a>

<!-- formal-statement-start -->
> **命題（円分局所拡大のノルム合同判定）**  
> 奇素数 $p$、$r\ge1$、$C_r=\mathbb Q_p(\zeta_{p^r})$ とする。このとき

$$
N_{C_r/\mathbb Q_p}(C_r^\times)
=p^{\mathbb Z}(1+p^r\mathbb Z_p).
$$

> 特に $a=p^m u$ がノルムである必要十分条件は $u\equiv1\pmod{p^r}$ であり、ノルム商の位数は $p^{r-1}(p-1)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

前節の式で像が恒等写像になるのは、指数 $\bar u_r^{-1}$ が $1$ のときだけです。これを単数の合同条件へ戻し、商の元の数を数えます。

<!-- proof-start -->
### 証明

[明示相互法則](#thm-anf18-explicit-cyclotomic-reciprocity)と[円分指数](#def-anf18-cyclotomic-exponent)により

$$
\begin{aligned}
\operatorname{rec}_{C_r/K}(p^m u)=1
&\iff \bar u_r^{-1}=\bar1_r\\
&\iff \bar u_r=\bar1_r\\
&\iff u\in1+p^r\mathbb Z_p.
\end{aligned}
$$

付値 $m$ は自由だから核は $p^{\mathbb Z}(1+p^r\mathbb Z_p)$ です。[Artin 商同型](../ANF17/index.md#prop-anf17-artin-quotient)を使って、これがノルム群と等しいと分かります。さらに写像

$$
K^\times\longrightarrow(\mathbb Z/p^r\mathbb Z)^\times,\qquad
p^m u\longmapsto\bar u_r
$$

は、$\mathbb Z_p^\times$ の合同類の全てに達し、核が上記のノルム群です。よって商は $(\mathbb Z/p^r\mathbb Z)^\times$ と同型で、位数は $p^r-p^{r-1}=p^{r-1}(p-1)$ です。
<!-- proof-end -->

**三つの判定。** $K=\mathbb Q_5$、$C_1=K(\zeta_5)$ に対して $5=5^1\cdot1$ はノルム、$-5=5^1(-1)$ は $-1\equiv4\not\equiv1\pmod5$ なので非ノルムです。$C_2=K(\zeta_{25})$ では $6=5^0\cdot6$ は $6\equiv1\pmod5$ ですが $6\not\equiv1\pmod{25}$。従って $6$ は $C_1$ からのノルムであり、$C_2$ からはノルムではありません。

ここでは「単数の剰余を測る」という操作が、[ノルム群の付値・単数完全列](../ANF16/index.md#prop-anf16-valuation-unit-sequence)で区別した二つの情報のうち、**単数成分**だけを測っていることも確かめられます。

## 4. 同じ次数でもノルム群は異なる：円分四次と Kummer 四次

$K=\mathbb Q_5$ にはすでに五乗根の円分四次拡大 $C=K(\zeta_5)$ がありました。一方、$X^2+1$ は法 $5$ で $2^2+1\equiv0$、導関数は $2\cdot2=4\not\equiv0\pmod5$ です。[Hensel の補題](../ANF10/index.md#thm-anf10-hensel-simple)により $i^2=-1$ を満たす $i\in K$ が存在します。従って $K$ は $1$ の四乗根をすべて含み、[緩分岐 Kummer 拡大のノルム計算](../ANF16/index.md#prop-anf16-tame-kummer-norm)で扱った $D=K(\alpha)$、$\alpha^4=5$ も巡回四次拡大です。二つの拡大をノルム群で比較します。

<a id="prop-anf18-quartic-contrast"></a>

<!-- formal-statement-start -->
> **命題（五進体上の二種類の巡回四次拡大）**  
> $C=\mathbb Q_5(\zeta_5)$、$D=\mathbb Q_5(\sqrt[4]5)$ とする。両者は巡回四次であるが、

$$
\begin{aligned}
N_{C/K}(C^\times)&=5^{\mathbb Z}(1+5\mathbb Z_5),\\
N_{D/K}(D^\times)&=\langle-5\rangle(1+5\mathbb Z_5)
\end{aligned}
$$

> と異なる。$a=5^m u$ に対し、$C$ からのノルム条件は $\bar u_1=1$、$D$ からのノルム条件は $\bar u_1=(-1)^m$ である。
<!-- formal-statement-end -->

### 証明の見取り図

円分側は前節の合同判定。Kummer 側は $\alpha$ のノルムが $-5$ であり、単数ノルムは剰余の四乗で判定されます。付値部分の符号が違いを生みます。

<!-- proof-start -->
### 証明

$C/K$ のノルム群は[円分ノルム判定](#prop-anf18-cyclotomic-norm-test)で $r=1$ とすれば得られます。

$D/K$ は $4\mid(5-1)$ を満たします。[緩分岐 Kummer ノルム群の公式](../ANF16/index.md#prop-anf16-tame-kummer-norm)を $e=4$、$\pi_K=5$ に適用します。$\mathbb F_5^\times$ の位数は $4$ なので、その四乗部分群は $\{1\}$ です。また一様化元のノルムを計算すると、

$$
N_{D/K}(\alpha)=(-1)^4(-5)=-5.
$$

これらを公式へ代入すると命題の二式が得られます。

$5^m u=(-5)^m((-1)^m u)$ だから、$D$ のノルム群へ入るのは $(-1)^m u\in1+5\mathbb Z_5$ のときだけ、すなわち $\bar u_1=(-1)^m$ のときです。
<!-- proof-end -->

**相違を可視化する元。** $5$ は $C$ からのノルムですが $D$ からはノルムではありません。逆に $-5$ は $D$ からのノルムですが $C$ からはノルムではありません。**次数と分岐指数がともに $4$ であることから、同じノルム群だと結論してはいけません。** また $D$ の分岐 Artin 写像で $2$ を $\alpha\mapsto i\alpha$ と送るのか $\alpha\mapsto-i\alpha$ と送るのかは、ノルム群と位数だけでは確定しません。

## 5. 二次中間体へ制限すると何が消えるか

$C=\mathbb Q_5(\zeta_5)$ で $t=\zeta_5+\zeta_5^{-1}$ とすると、$1+\zeta_5+\cdots+\zeta_5^4=0$ と $\zeta_5^2+\zeta_5^{-2}=t^2-2$ より

$$
1+t+(t^2-2)=0,\qquad
t^2+t-1=0,\qquad (2t+1)^2=5.
$$

ここで $v_5(5)=1$ は奇数ですが、$x\in K^\times$ の平方は $v_5(x^2)=2v_5(x)$ が偶数です。従って $\sqrt5\notin K$ であり、$M=K(t)=K(\sqrt5)$ は確かに $C/K$ の二次中間体です。前節の $D$ でも $\alpha^2=\sqrt5$ なので同じ $M$ が現れます。

<a id="prop-anf18-quadratic-restriction"></a>

<!-- formal-statement-start -->
> **命題（四次円分拡大から二次中間体への制限）**  
> $C=\mathbb Q_5(\zeta_5)$、$M=\mathbb Q_5(\sqrt5)$ とする。$C/K$ の Artin 写像を $M$ に制限した像は、$a=5^m u$ の $\bar u_1\in\mathbb F_5^\times$ が平方剰余なら恒等、非平方剰余なら非自明な自己同型である。従って

$$
N_{M/K}(M^\times)
=5^{\mathbb Z}\{u\in\mathbb Z_5^\times:\bar u_1\in\{1,4\}\}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

$M$ を固定する自己同型を $\zeta_5$ の指数で表し、[中間体への Artin 写像の制限](../ANF17/index.md#prop-anf17-restriction-square)を使います。

<!-- proof-start -->
### 証明

$\sigma_b(t)=\zeta_5^b+\zeta_5^{-b}$ です。$\sigma_1$ と $\sigma_4$ では $t$ が不変です。$\sigma_2(t)=\zeta_5^2+\zeta_5^{-2}=t^2-2=-1-t$ は $t$ とは異なります。もし $-1-t=t$ なら $t=-1/2$ で $t^2+t-1=-5/4\ne0$ と矛盾するからです。$\sigma_3$ も $\sigma_2$ と同じ作用です。従って $\operatorname{Gal}(C/M)=\{\sigma_1,\sigma_4\}$。

[明示相互法則](#thm-anf18-explicit-cyclotomic-reciprocity)から $\operatorname{rec}_{C/K}(5^m u)=\sigma_{\bar u_1^{-1}}$ です。平方部分群 $\{1,4\}$ は逆元操作で不変なので、$M$ への制限が自明となる条件は $\bar u_1\in\{1,4\}$ です。[中間体への制限](../ANF17/index.md#prop-anf17-restriction-square)と[Artin 写像の核](../ANF17/index.md#prop-anf17-artin-quotient)を適用してノルム群の式を得ます。
<!-- proof-end -->

**例。** $2\bmod5$ は非平方なので、$\operatorname{rec}_{M/K}(2)$ は $\sqrt5$ を $-\sqrt5$ に送ります。一方 $-1\bmod5=4$ は平方なので、$\operatorname{rec}_{M/K}(-1)=1$ です。$5$ もこの $M$ からのノルムです。

## 6. 非分岐成分を足すと、付値と単数を同時に検査できる

$E=\mathbb Q_5(\theta)$、$\theta^2=2$ とします。$X^2-2$ は $\mathbb F_5$ で根を持たない（平方は $0,1,4$）ため、$[E:K]=2$ です。非分岐性を結論するには整数環も確認します。$A=\mathbb Z_5[\theta]$ とおくと、基底 $(1,\theta)$ に関する跡行列は

$$
T=\begin{pmatrix}
\operatorname{Tr}_{E/K}(1)&\operatorname{Tr}_{E/K}(\theta)\\
\operatorname{Tr}_{E/K}(\theta)&\operatorname{Tr}_{E/K}(\theta^2)
\end{pmatrix}
=\begin{pmatrix}2&0\\0&4\end{pmatrix}.
$$

$2,4\in\mathbb Z_5^\times$ なので $T^{-1}=\operatorname{diag}(1/2,1/4)$ も整数成分をもちます。実際、$x=a+b\theta$（$a,b\in K$）に対し

$$
\operatorname{Tr}_{E/K}(x)=2a,\qquad
\operatorname{Tr}_{E/K}(x\theta)=4b
$$

です。従って二つの跡がともに $\mathbb Z_5$ に属することと $a,b\in\mathbb Z_5$ は同値であり、[跡双対の定義](../ANF11/index.md#def-anf11-codifferent)に対応する $A^\vee=A$ が従います。任意の整元 $x\in\mathcal O_E$ と $a\in A$ に対して $\operatorname{Tr}_{E/K}(xa)\in\mathbb Z_5$ だから $\mathcal O_E\subseteq A^\vee=A$。逆包含は $\theta$ の整性によるため、$\mathcal O_E=A$ です。さらに

$$
\mathcal O_E/5\mathcal O_E
\simeq\mathbb F_5[X]/(X^2-2)=\mathbb F_{25}
$$

は体です。よって $5\mathcal O_E$ は極大イデアルで、分岐指数 $e=1$、剰余次数 $f=2$、すなわち $E/K$ は非分岐二次です。[非分岐拡大の Frobenius 持ち上げ](../ANF15/index.md#prop-anf15-frobenius-lift)では剰余体で $\bar\theta^5=(\bar\theta^2)^2\bar\theta=4\bar\theta=-\bar\theta$ となるため、$F(\theta)=-\theta$ です。

$C_r/K$ は全分岐なので $E\cap C_r=K$ です。よって $B_r=EC_r$ は次数 $2d_r$ の Abel Galois 拡大です。

<a id="prop-anf18-mixed-reciprocity"></a>

<!-- formal-statement-start -->
> **命題（非分岐二次と円分拡大の合成）**  
> $K=\mathbb Q_5$、$E=K(\sqrt2)$、$C_r=K(\zeta_{5^r})$、$B_r=EC_r$ とし、$F\in\operatorname{Gal}(E/K)$ は算術的 Frobenius とする。制限による同型の下で、$a=5^m u$ に対し

$$
\operatorname{rec}_{B_r/K}(a)
=\bigl(F^m,\ \sigma_{\bar u_r^{-1}}\bigr)
\in\operatorname{Gal}(E/K)\times\operatorname{Gal}(C_r/K)
$$

> である。ノルム群は $5^{2\mathbb Z}(1+5^r\mathbb Z_5)$、ノルム商の位数は $2\cdot4\cdot5^{r-1}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$E$ は非分岐、$C_r$ は全分岐なので共通部分体がありません。従って Galois 群は直積となり、[中間体への制限](../ANF17/index.md#prop-anf17-restriction-square)によって Artin 写像も二つの既知の成分で決まります。

<!-- proof-start -->
### 証明

$C_r/K$ の任意の中間体は全分岐、$E/K$ の任意の中間体は非分岐です。従って両者の共通部分体は $K$ のみ。$E$ と $C_r$ は Galois 拡大なので

$$
\operatorname{Gal}(B_r/K)\xrightarrow{\sim}
\operatorname{Gal}(E/K)\times\operatorname{Gal}(C_r/K),
\quad \tau\longmapsto(\tau|_E,\tau|_{C_r}).
$$

[非分岐 Artin 写像](../ANF15/index.md#thm-anf15-unramified-reciprocity)は $5^m u\mapsto F^m$、[明示円分相互法則](#thm-anf18-explicit-cyclotomic-reciprocity)は $5^m u\mapsto\sigma_{\bar u_r^{-1}}$ です。[局所相互法則の中間体への制限](../ANF17/index.md#prop-anf17-restriction-square)により $B_r$ の Artin 像の二つの成分はちょうどこれらになります。

二つとも恒等写像となる条件は $m\in2\mathbb Z$ かつ $u\equiv1\pmod{5^r}$ です。[Artin 写像の核](../ANF17/index.md#prop-anf17-artin-quotient)によりノルム群の式が得られ、指数は $2|\operatorname{Gal}(C_r/K)|=2\cdot4\cdot5^{r-1}$ です。
<!-- proof-end -->

**例：$r=1$。** $a=5^3\cdot2$ は $(F,\sigma_3)$ へ写り、像の位数は $\operatorname{lcm}(2,4)=4$ です。付値だけ、あるいは単数だけを調べてもこの答えには届きません。

## 7. $\zeta_5$ から $\zeta_{25}$ へ：核が五倍の精度を表す

$C_1\subset C_2$ です。$\zeta_5=\zeta_{25}^5$ と選べば、$\sigma_b\in\operatorname{Gal}(C_2/K)$ の $C_1$ への制限は $\sigma_{b\bmod5}$ です。これは、より高い桁での合同条件が、低い桁へ射影されることを意味します。

<a id="prop-anf18-cyclotomic-tower"></a>

<!-- formal-statement-start -->
> **命題（五乗根から二十五乗根への制限）**  
> $K=\mathbb Q_5$、$C_1=K(\zeta_5)$、$C_2=K(\zeta_{25})$ とする。制限写像は

$$
(\mathbb Z/25\mathbb Z)^\times\longrightarrow
(\mathbb Z/5\mathbb Z)^\times,\qquad \bar b_{25}\longmapsto\bar b_5
$$

> に一致し、核は $\{1,6,11,16,21\}\bmod25$ の位数 $5$ の群である。ノルム群の包含は

$$
5^{\mathbb Z}(1+25\mathbb Z_5)
\subset 5^{\mathbb Z}(1+5\mathbb Z_5)
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

高い桁の指数を低い桁へ減らすと、$C_1$ の根への作用を取り出せます。核の元を列挙し、ノルム群の包含と対応させます。

<!-- proof-start -->
### 証明

$\zeta_5=\zeta_{25}^5$ なので、指数 $b$ の自己同型を制限した作用は

$$
\sigma_b(\zeta_5)=\sigma_b(\zeta_{25}^5)
=\zeta_{25}^{5b}=\zeta_5^{b}
$$

です。従って制限は法 $5$ の還元に一致します。

$\bar b_{25}$ が核に入る条件は $b\equiv1\pmod5$ です。法 $25$ では

$$
b=1+5j,\qquad j=0,1,2,3,4
$$

の五通りで、すべて $5$ と互いに素です。これらが位数 $5$ の核をなします。

ノルム群の包含は[円分ノルム判定](#prop-anf18-cyclotomic-norm-test)を $r=1,2$ に適用して得られ、[Artin 写像の中間体への制限](../ANF17/index.md#prop-anf17-restriction-square)とも一致します。
<!-- proof-end -->

ここまでで、$\mathbb Q_p$ 上の局所類体を、**付値の剰余、単数の合同類、Galois 自己同型の作用**の三つの座標で計算できるようになりました。次講では、これらをすべての素点でまとめるアデール・イデールへ進みます。

## 8. 演習：自分で指数・ノルム・制限を計算する

### A1. 円分五次根の多項式と全分岐

$\Phi_5(T)=T^4+T^3+T^2+T+1$ に $T=1+X$ を代入し、$\mathbb Q_5(\zeta_5)/\mathbb Q_5$ の次数、分岐指数、剰余次数を求めよ。

- Level: A
- ID: ANF18-A1

<!-- solution-start -->
**詳細解答。** 二項展開で

$$
\begin{aligned}
(1+X)^2&=1+2X+X^2,\\
(1+X)^3&=1+3X+3X^2+X^3,\\
(1+X)^4&=1+4X+6X^2+4X^3+X^4
\end{aligned}
$$

を得ます。これらを $\Phi_5(1+X)=\sum_{j=0}^4(1+X)^j$ に代入し、各次数の係数を足すと

$$
\begin{aligned}
\Phi_5(1+X)
&=1+(1+X)+(1+2X+X^2)\\
&\quad +(1+3X+3X^2+X^3)\\
&\quad +(1+4X+6X^2+4X^3+X^4)\\
&=X^4+5X^3+10X^2+10X+5.
\end{aligned}
$$

最高次係数は $1$、それ以外は $5$ で割り切れ、定数項は $25$ で割り切れません。[Eisenstein の既約性](../ANF10/index.md#thm-anf10-eisenstein-irreducible)から次数は $4$、[Eisenstein 拡大の一様化元](../ANF10/index.md#thm-anf10-eisenstein-extension)から全分岐なので $e=4,f=1$ です。
<!-- solution-end -->

### A2. 五乗根への Artin 作用

$C=\mathbb Q_5(\zeta_5)$ とする。$a=5^{-2}\cdot2$ に対し $\operatorname{rec}_{C/\mathbb Q_5}(a)$ の $\zeta_5$ への作用と元の位数を求めよ。

- Level: A
- ID: ANF18-A2

<!-- solution-start -->
**詳細解答。** $a=5^m u$ で $m=-2,u=2$ です。[円分明示相互法則](#thm-anf18-explicit-cyclotomic-reciprocity)に $r=1$ を代入し、$2^{-1}\equiv3\pmod5$ を使うと

$$
\operatorname{rec}_{C/K}(a)(\zeta_5)=\zeta_5^3.
$$

$3^2\equiv4\not\equiv1$、$3^4\equiv1\pmod5$ なので元の位数は $4$ です。付値 $-2$ は円分成分の像に影響しません。
<!-- solution-end -->

### A3. 単数の桁がノルム判定を変える

$C_1=\mathbb Q_5(\zeta_5)$、$C_2=\mathbb Q_5(\zeta_{25})$ とする。$6$ がどちらの拡大からのノルムであるか答え、$C_2$ の Artin 像の位数を求めよ。

- Level: A
- ID: ANF18-A3

<!-- solution-start -->
**詳細解答。** $6\equiv1\pmod5$ なので[円分ノルム判定](#prop-anf18-cyclotomic-norm-test)から $6\in N_{C_1/K}(C_1^\times)$ です。一方 $6\not\equiv1\pmod{25}$ なので $6\notin N_{C_2/K}(C_2^\times)$ です。$6^{-1}\equiv21\pmod{25}$ で、$21^2\equiv16$、$21^4\equiv6$、$21^5\equiv1\pmod{25}$。従って像 $\sigma_{21}$ の位数は $5$ です。
<!-- solution-end -->

### A4. 四次 Kummer 拡大の符号

$D=\mathbb Q_5(\alpha)$、$\alpha^4=5$ とする。$5,-5,10$ が $D$ からのノルムかどうかを判定せよ。

- Level: A
- ID: ANF18-A4

<!-- solution-start -->
**詳細解答。** [四次 Kummer と円分の比較](#prop-anf18-quartic-contrast)から $5^m u$ が $D$ からのノルムであるのは $\bar u_1=(-1)^m$ のときです。$5$ は $m=1,u=1$ で $1\ne-1\pmod5$ より非ノルム。$-5$ は $m=1,u=-1$ で合同条件を満たすのでノルム（実際 $N_{D/K}(\alpha)=-5$）。$10=5\cdot2$ は $m=1,u=2$ で $2\not\equiv4\pmod5$ より非ノルムです。
<!-- solution-end -->

### A5. 三進円分二次と分岐二次の違い

$K=\mathbb Q_3$、$C=K(\zeta_3)=K(\sqrt{-3})$、$D=K(\sqrt3)$ とする。$3$ と $-3$ がそれぞれの拡大からのノルムか判定せよ。

- Level: A
- ID: ANF18-A5

<!-- solution-start -->
**詳細解答。** $C$ のノルム群は[円分ノルム判定](#prop-anf18-cyclotomic-norm-test)で $p=3,r=1$ として $3^{\mathbb Z}(1+3\mathbb Z_3)$ です。$3=3\cdot1$ はノルム、$-3=3(-1)$ は $-1\equiv2\not\equiv1\pmod3$ より非ノルム。

$D$ については[緩分岐 Kummer ノルム群](../ANF16/index.md#prop-anf16-tame-kummer-norm)で $p=3,e=2,\pi_K=3$ を用います。$\mathbb F_3^\times$ の平方部分群は $\{1\}$ なので $N_{D/K}(D^\times)=\langle-3\rangle(1+3\mathbb Z_3)$ です。従って $-3$ はノルム、$3$ は $3=(-3)(-1)$ と $-1\not\equiv1\pmod3$ から非ノルムです。二次・全分岐という情報だけでは群を同定できません。
<!-- solution-end -->

### B1. 四次から二次中間体への制限

$C=\mathbb Q_5(\zeta_5)$、$M=\mathbb Q_5(\sqrt5)$ とする。$\operatorname{Gal}(C/M)$ を円分指数で記述し、$2$ と $-1$ の $M/K$ 上の Artin 像を求めよ。

- Level: B
- ID: ANF18-B1

<!-- solution-start -->
**詳細解答。** $\zeta_5+\zeta_5^{-1}=t$ とすると $t^2+t-1=0$、従って $\sqrt5=2t+1$ が $M$ を生成します。$\sigma_b(t)=\zeta_5^b+\zeta_5^{-b}$ なので $b=1,4$ のとき固定し、$b=2,3$ のとき $t$ は $-1-t$ へ移ります。[二次中間体への制限](#prop-anf18-quadratic-restriction)により

$$
\operatorname{Gal}(C/M)=\{\sigma_1,\sigma_4\}.
$$

[明示相互法則](#thm-anf18-explicit-cyclotomic-reciprocity)から $\operatorname{rec}_{C/K}(2)=\sigma_3$、$\operatorname{rec}_{C/K}(-1)=\sigma_4$ です。前者は $\sqrt5\mapsto-\sqrt5$、後者は $\sqrt5$ を固定します。[Artin 写像の制限則](../ANF17/index.md#prop-anf17-restriction-square)により、これが求める $M/K$ 上の二つの像です。
<!-- solution-end -->

### B2. 同じ次数の二つのノルム群

$C=\mathbb Q_5(\zeta_5)$ と $D=\mathbb Q_5(\sqrt[4]5)$ のノルム群の交わりを求め、その指数を計算せよ。また $5$ と $-5$ のノルム判定が逆になる理由を述べよ。

- Level: B
- ID: ANF18-B2

<!-- solution-start -->
**詳細解答。** $a=5^m u$ とします。[円分のノルム判定](#prop-anf18-cyclotomic-norm-test)は $u\equiv1\pmod5$、[Kummer 側の判定](#prop-anf18-quartic-contrast)は $u\equiv(-1)^m\pmod5$ です。両立条件は $(-1)^m\equiv1\pmod5$、つまり $m$ が偶数で $u\equiv1\pmod5$ です。従って

$$
N_{C/K}(C^\times)\cap N_{D/K}(D^\times)
=5^{2\mathbb Z}(1+5\mathbb Z_5).
$$

商は付値の偶奇で $2$ 通り、単数の法 $5$ の合同類で $4$ 通りなので指数は $8$。$5$ は単数部 $1$ なので円分側だけのノルム、$-5$ は単数部 $-1$ なので Kummer 側だけのノルムです。この符号差は $N_{D/K}(\alpha)=-5$ と円分側で $5$ が核に入ることから生じます。
<!-- solution-end -->

### B3. 非分岐と円分の合成体

$E=\mathbb Q_5(\sqrt2)$、$C=\mathbb Q_5(\zeta_5)$、$B=EC$ とする。$a=5^3\cdot2$ の Artin 像を直積表示し、位数および $a^4$ がノルムであるか判定せよ。

- Level: B
- ID: ANF18-B3

<!-- solution-start -->
**詳細解答。** $E/K$ は非分岐二次、$C/K$ は全分岐四次なので[直積での Artin 計算](#prop-anf18-mixed-reciprocity)を使えます。$v_5(a)=3$ より非分岐成分は $F^3=F$。$2^{-1}\equiv3\pmod5$ より円分成分は $\sigma_3$ です。

$$
\operatorname{rec}_{B/K}(a)=(F,\sigma_3),\qquad
\operatorname{ord}(F,\sigma_3)=\operatorname{lcm}(2,4)=4.
$$

準同型性から $\operatorname{rec}_{B/K}(a^4)=(F^4,\sigma_3^4)=(1,1)$ です。[Artin 写像の核とノルム](../ANF17/index.md#prop-anf17-artin-quotient)より $a^4$ はノルム。直接にも $a^4=5^{12}\cdot16$ で付値は偶数、$16\equiv1\pmod5$ なので[合成体のノルム判定](#prop-anf18-mixed-reciprocity)を満たします。
<!-- solution-end -->

### B4. 五次の核が現れる理由

$C_1=\mathbb Q_5(\zeta_5)\subset C_2=\mathbb Q_5(\zeta_{25})$ に対し、制限写像の核を全て列挙し、$6$ の Artin 像がこの核の生成元になることを証明せよ。

- Level: B
- ID: ANF18-B4

<!-- solution-start -->
**詳細解答。** [円分塔の制限](#prop-anf18-cyclotomic-tower)から核は $b\equiv1\pmod5$ を満たす法 $25$ の可逆合同類で、

$$
\ker(\operatorname{Gal}(C_2/K)\to\operatorname{Gal}(C_1/K))
=\{\sigma_1,\sigma_6,\sigma_{11},\sigma_{16},\sigma_{21}\}.
$$

$6^{-1}\equiv21\pmod{25}$ なので、[明示相互法則](#thm-anf18-explicit-cyclotomic-reciprocity)から $\operatorname{rec}_{C_2/K}(6)=\sigma_{21}$ です。$21^2\equiv16$、$21^3\equiv11$、$21^4\equiv6$、$21^5\equiv1\pmod{25}$ なので $\sigma_{21}$ は五つの核元をすべて巡回し生成します。法 $5$ では $6\equiv1$ のため、$C_1$ への制限が恒等なのも一致します。
<!-- solution-end -->

### C1. 非分岐と二十五乗根を一括して計算する

$K=\mathbb Q_5$、$E=K(\sqrt2)$、$C_2=K(\zeta_{25})$、$B=EC_2$ とする。

1. $[B:K]$ と $\operatorname{Gal}(B/K)$ の直積表示を求めよ。
2. $a=5^7\cdot6$ の Artin 像をこの表示で求め、その位数を決定せよ。
3. $a$ が $E$、$C_1=K(\zeta_5)$、$C_2$、$B$ それぞれからのノルムか判定せよ。
4. $b=5^8(1+25\cdot3)$ が $B$ からのノルムか判定し、必要十分条件を明記せよ。

- Level: C
- ID: ANF18-C1

<!-- solution-start -->
**詳細解答。**

1. $X^2-2$ は $\mathbb F_5$ で既約で、さらに第6節の跡双対計算で $\mathcal O_E=\mathbb Z_5[\sqrt2]$ と確認したので、$E/K$ は非分岐二次。[円分拡大の次数・全分岐](#prop-anf18-cyclotomic-degree)から $C_2/K$ は全分岐二十次です。共通中間体は $K$ しかないので $[B:K]=2\cdot20=40$、Galois 群は

$$
\operatorname{Gal}(B/K)\simeq\operatorname{Gal}(E/K)\times(\mathbb Z/25\mathbb Z)^\times.
$$

2. $a=5^7\cdot6$ は $m=7,u=6$ です。[合成体の Artin 公式](#prop-anf18-mixed-reciprocity)に代入すると

$$
\operatorname{rec}_{B/K}(a)
=(F^7,\sigma_{6^{-1}})=(F,\sigma_{21}).
$$

$F$ の位数は $2$。$21^2\equiv16$、$21^4\equiv6$、$21^5\equiv1\pmod{25}$ だから $\sigma_{21}$ の位数は $5$。よって像の位数は $\operatorname{lcm}(2,5)=10$ です。

3. [非分岐ノルムの付値条件](../ANF15/index.md#prop-anf15-unramified-norm-quotient)から、$E$ のノルムになるには付値が偶数でなければなりません。しかし $v_5(a)=7$ は奇数なので、$E$ からのノルムではありません。

   [円分ノルム判定](#prop-anf18-cyclotomic-norm-test)では、$a$ の単数部 $6$ が判定対象です。

   $6\equiv1\pmod5$ なので $C_1$ からはノルムです。一方 $6\not\equiv1\pmod{25}$ なので $C_2$ からは非ノルムです。

   $B$ のノルムになる条件は、付値が偶数であり、かつ単数が法 $25$ で $1$ に合同であることです。$a$ はいずれも満たさず、$B$ からのノルムではありません。

4. $b=5^8(1+75)=5^8\cdot76$ で $8$ は偶数、$76\equiv1\pmod{25}$ です。[合成体のノルム群](#prop-anf18-mixed-reciprocity)は $5^{2\mathbb Z}(1+25\mathbb Z_5)$ なので $b$ は $B$ からのノルムです。一般に $5^m u$ が $B$ からのノルムである必要十分条件は $m\in2\mathbb Z$ かつ $u\equiv1\pmod{25}$ です。
<!-- solution-end -->
