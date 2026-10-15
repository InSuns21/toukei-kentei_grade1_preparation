# TRN12 Lindemann–Weierstrass：有理係数版と共役の有限積

[Hermite–Lindemannの定理](../TRN11/index.md#thm-trn11-hermite-lindemann)は、零でない代数的数 $\alpha$ に対し $e^\alpha$ が超越数であることを保証します。しかし、相異なる代数的数 $\alpha_1,\ldots,\alpha_m$ の指数関数値の**和**には、さらに別の問題が残ります。例えば $e^{\sqrt2}$ が超越数であるだけでは、$e^{\sqrt2}+e^{\sqrt3}$ が有理数にならないとは証明できません。

ここから三章をかけて目指すのは、相異なる代数的指数の指数関数値が、有理数係数では一次従属にならないという結論です。この章はその証明の**算術的な入口**です。仮に有理係数の指数関係があった場合、共役の有限積と指数反転によって「指数0の係数が正整数」である対称な指数関係を作ります。補助多項式による矛盾の導出は次章以降で行い、この段階で最終結論を仮定しません。

## 1. 目標を明確にし、既に解ける場合を分ける

代数的数は[代数的元の定義](../../FLD/FLD1/index.md#def-fld1-algebraic-element)に従い、$\overline{\mathbb Q}$ は有理係数の非零多項式の複素根全体を表します。ここで「一次独立」とは、係数を有理数に限った有限線形結合が0になるのは全係数が0の場合だけ、という意味です。

**この系列で証明を目指す有理係数版**は、相異なる $\alpha_1,\ldots,\alpha_m\in\overline{\mathbb Q}$ と $q_j\in\mathbb Q$ に対し

$$
\sum_{j=1}^{m}q_je^{\alpha_j}=0
\quad\Longrightarrow\quad
q_1=\cdots=q_m=0
$$

という命題です。これを本章で証明済みの定理として使ってはいけません。$m=1,2$ については既習の定理で確かめ、$m\ge3$ に備えた一般の還元を構成します。

$m=1$ なら $e^{\alpha_1}\ne0$ なので、$q_1e^{\alpha_1}=0$ は $q_1=0$ を意味します。$m=2$ では両係数が非零だったときの比を調べます。

<a id="cor-trn12-two-exponents"></a>

<!-- formal-statement-start -->
> **系（二つの代数的指数の有理一次独立性）**  
> $\alpha,\beta\in\overline{\mathbb Q}$ が相異なるとする。このとき $e^\alpha,e^\beta$ は $\mathbb Q$ 上一次独立である。
<!-- formal-statement-end -->

### 証明の見取り図

二項関係の両係数が非零なら、指数関数値の比が零でない有理数となります。一方、その比は $e^{\alpha-\beta}$ で、指数は零でない代数的数です。

<!-- proof-start -->
### 証明

$q,r\in\mathbb Q$ が $qe^\alpha+re^\beta=0$ を満たすとします。[複素指数の加法公式と非零性](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から、$e^\alpha,e^\beta$ はともに非零です。$q=0$ なら $re^\beta=0$ より $r=0$ です。同様に $r=0$ なら $q=0$ です。

両方とも非零と仮定すると、$e^\beta$ で割って

$$
qe^{\alpha-\beta}+r=0,
\qquad e^{\alpha-\beta}=-\frac rq\in\mathbb Q
$$

を得ます。ここで差の代数性を確認します。[単純代数拡大の次数公式](../../FLD/FLD1/index.md#cor-fld1-simple-extension-degree)により $\mathbb Q(\alpha)/\mathbb Q$ は有限拡大です。$\beta$ は $\mathbb Q$ 上代数的なので、同じ多項式を $\mathbb Q(\alpha)$ 上で見ても代数的です。したがって $\mathbb Q(\alpha,\beta)/\mathbb Q(\alpha)$ も有限で、[塔の法則](../../FLD/FLD1/index.md#thm-fld1-tower-law)から

$$
[\mathbb Q(\alpha,\beta):\mathbb Q]
=[\mathbb Q(\alpha,\beta):\mathbb Q(\alpha)]
 [\mathbb Q(\alpha):\mathbb Q]<\infty.
$$

$\delta=\alpha-\beta$ はこの有限拡大に属するので、[有限拡大の元の代数性](../../FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)により代数的です。また $\alpha\ne\beta$ から $\delta\ne0$ です。従って[Hermite–Lindemannの定理](../TRN11/index.md#thm-trn11-hermite-lindemann)は $e^\delta$ を超越数としますが、上式はこれが有理数だと主張しています。矛盾です。ゆえに $q=r=0$ となります。$\square$
<!-- proof-end -->

二項では比一つに帰着できます。しかし三項以上では、例えば $ae^\alpha+be^\beta=-ce^\gamma$ を一項で割っても**二つの指数関数値の和**が残ります。ここに新しい構成が必要な理由があります。

## 2. 有理係数の関係を、形式指数和として固定する

以後、相異なる代数的数 $\alpha_1,\ldots,\alpha_m$ と、有理数 $q_1,\ldots,q_m$ がすべて零ではなく、

$$
\sum_{j=1}^{m}q_je^{\alpha_j}=0
$$

を満たすと**仮定**します。$q_j=0$ の項は削除できるので、添字を付け直して全 $q_j\ne0$ とします。正整数 $D$ を全 $q_j$ の共通分母に取れば

$$
a_j=Dq_j\in\mathbb Z\setminus\{0\},
\qquad
\sum_{j=1}^{m}a_je^{\alpha_j}=0.
$$

分母消去で指数 $\alpha_j$ は変化しません。$e^{D\alpha_j}$ に置き換えるのは別の式になり、許されません。

有限個の $\alpha_j$ の最小多項式を掛けた多項式の[分解体](../../FLD/FLD2/index.md#thm-fld2-splitting-field-existence)を $K\subset\mathbb C$ とします。[有限分解体の正規性](../../FLD/FLD2/index.md#thm-fld2-finite-splitting-equivalence)と[標数0での分離性](../../FLD/FLD2/index.md#cor-fld2-char-zero-algebraic)により $K/\mathbb Q$ は有限Galois拡大です。[有限Galois拡大の定義](../../FLD/FLD4/index.md#def-fld4-finite-galois)に従って $G=\operatorname{Gal}(K/\mathbb Q)$ と書きます。$G$ は有限群で、$\sigma(\alpha_j)\in K$ です。

[有限形式指数和](../TRN7/index.md#def-trn7-formal-exponential-sum)では、記号 $U_\lambda$ を用い、$U_\lambda U_\mu=U_{\lambda+\mu}$ と定めました。そこで

$$
F=\sum_{j=1}^{m}a_jU_{\alpha_j}\in K[K,+]
$$

と置きます。$\alpha_j$ は相異なり、$a_j\ne0$ なので、**形式和 $F$ は非零**です。しかし[指数評価](../TRN7/index.md#def-trn7-exponential-evaluation)では

$$
\operatorname{ev}(F)
=\sum_{j=1}^{m}a_je^{\alpha_j}
=0
$$

が成り立ちます。ここでの非零は形式和に関するもので、評価した複素数についての非零ではありません。

### 例：重複した指数を残してはいけない

$s=\sqrt2$ として $F_0=U_0+2U_s-2U_s$ を考えると、まとめた後の形式和は $F_0=U_0$ です。このとき最初の三つの係数が一つでも非零だったというだけでは、残った指数集合が三点あるとはいえません。さらに $U_s-U_s=0$ は、**非零な文字列の和が必ず非零の形式和になる**という推論の反例です。本章では最初から相異なる指数・非零係数に正規化してから積を取ります。

## 3. すべての共役を掛けても形式的な非零性は失われない

[形式和のGalois共役](../TRN7/index.md#def-trn7-galois-action)では、$\sigma\in G$ が代数的な係数と指数へ作用します。今回の $a_j$ は通常の整数であり、$\sigma(a_j)=a_j$ です。従って

$$
\sigma\cdot F
=\sum_{j=1}^{m}a_jU_{\sigma(\alpha_j)}.
$$

これは**指数に作用する式**であり、$\sigma(e^{\alpha_j})=e^{\sigma(\alpha_j)}$ を意味しません。指数関数値は $K$ の元とは限らず、そもそも $\sigma$ の作用域に含まれるとは限らないからです。

有限個の共役をすべて掛け合わせます。

$$
H=\prod_{\sigma\in G}(\sigma\cdot F).
$$

この有限積を展開すると、添字族 $(j_\sigma)_{\sigma\in G}$ を用いて

$$
H=
\sum_{(j_\sigma)\in\{1,\ldots,m\}^{G}}
\left(\prod_{\sigma\in G}a_{j_\sigma}\right)
U_{\sum_{\sigma\in G}\sigma(\alpha_{j_\sigma})}.
$$

同じ指数が複数の添字族から生じた場合、その係数はすべて足します。そのため最終的な係数は整数の和であり、整数に留まります。ただし相殺によって0になる係数もあるため、それらは削除します。

### なぜ積全体は0にならないか

個々の係数が消えることと、積全体が消えることは違います。[形式和の積の非零性](../TRN7/index.md#lem-trn7-no-zero-divisors)は、複素数を $(\operatorname{Re}z,\operatorname{Im}z)$ の辞書式順序で比較することから得られます。

確かめ方をここでも明示します。非零形式和 $A,B$ の各有限指数集合で最大の指数を $\lambda_\ast,\mu_\ast$ とします。これらの係数を $u,v\ne0$ とすると、$\lambda+\mu=\lambda_\ast+\mu_\ast$ を満たす組は $(\lambda_\ast,\mu_\ast)$ しかありません。なぜなら $\lambda\le\lambda_\ast$ と $\mu\le\mu_\ast$ で、片方が真に小さければ、加法で順序が保存されて和も真に小さくなるからです。従って最大指数の係数は

$$
[U_{\lambda_\ast+\mu_\ast}](AB)=uv\ne0
$$

です。この議論は指数が実数だけでなく、虚部を持つ複素数でも成立します。非零因子の有限積なので $H\ne0$ です。

[共役作用が積を保つ命題](../TRN7/index.md#prop-trn7-galois-ring-action)により、任意の $\tau\in G$ について

$$
\tau\cdot H
=\prod_{\sigma\in G}((\tau\sigma)\cdot F)
=\prod_{\rho\in G}(\rho\cdot F)
=H.
$$

二つ目の等号では $\sigma\mapsto\tau\sigma$ が群 $G$ 上の置換であることを使いました。最後に[指数評価の乗法性](../TRN7/index.md#def-trn7-exponential-evaluation)を使うと

$$
\operatorname{ev}(H)
=\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F)=0
$$

です。理由は**恒等自己同型の因子**が $\operatorname{ev}(F)=0$ だからであり、他の因子まで0である必要はありません。

## 4. 指数反転で0の係数を正にする

$H\ne0$ を相異なる指数でまとめて

$$
H=\sum_{\lambda\in S}B_\lambda U_\lambda,
\qquad B_\lambda\in\mathbb Z\setminus\{0\}
$$

と書きます。集合 $S\subset K$ は有限非空です。共役不変性より $\sigma(S)=S$、$B_{\sigma(\lambda)}=B_\lambda$ が成り立ちます。これは[共役不変な形式和の係数関係](../TRN7/index.md#prop-trn7-coefficient-orbits)を、今回の整数係数の場合に適用したものです。

ここで単に $H$ の0係数を見るだけでは不十分です。$S$ が0を含む保証はなく、含んでも正とは限らないからです。[指数反転](../TRN8/index.md#def-trn8-reflection)を用い、

$$
H^\vee=\sum_{\lambda\in S}B_\lambda U_{-\lambda},
\qquad R=HH^\vee
$$

と置きます。積の一項 $B_\lambda B_\mu U_{\lambda-\mu}$ が指数0を持つ条件は $\lambda=\mu$ です。したがって[指数反転積の0係数](../TRN8/index.md#lem-trn8-positive-zero-coefficient)から

$$
[U_0]R=\sum_{\lambda\in S}B_\lambda^2>0
$$

です。平方和を取る理由は、整数係数の符号による相殺を0係数に起こさせないためです。[形式指数和のGalois作用](../TRN7/index.md#def-trn7-galois-action)では指数と係数を別々に写します。指数反転は指数の加法逆元だけを取るので $\sigma(-\lambda)=-\sigma(\lambda)$、つまり $G$ の作用と可換です。[共役作用と環演算](../TRN7/index.md#prop-trn7-galois-ring-action)を用いると

$$
\sigma\cdot H^\vee=(\sigma\cdot H)^\vee=H^\vee,
\qquad \sigma\cdot R=R.
$$

また[指数評価の乗法性](../TRN7/index.md#def-trn7-exponential-evaluation)により

$$
\operatorname{ev}(R)
=\operatorname{ev}(H)\operatorname{ev}(H^\vee)
=0.
$$

以上を一つの還元命題にまとめます。

<a id="prop-trn12-rational-symmetric-reduction"></a>

<!-- formal-statement-start -->
> **命題（有理係数の指数関係の対称化）**  
> $\alpha_1,\ldots,\alpha_m\in\overline{\mathbb Q}$ は相異なり、$a_1,\ldots,a_m\in\mathbb Z$ はすべて非零で、次を満たすと仮定する。

$$
\sum_{j=1}^{m}a_je^{\alpha_j}=0.
$$

> このとき有限Galois拡大 $K/\mathbb Q$ と $K$ の有限集合 $T$、整数 $c_t\in\mathbb Z\setminus\{0\}$（$t\in T$）が存在し、次のすべてを満たす。
>
> 1. $0\in T$ かつ $c_0>0$。
> 2. 任意の $\sigma\in\operatorname{Gal}(K/\mathbb Q)$ に対し $\sigma(T)=T$、$c_{\sigma(t)}=c_t$。
> 3. $T\setminus\{0\}\ne\varnothing$ であり、指数は相異なる。
> 4. 指数評価で次の等式が成立する。

$$
\sum_{t\in T}c_te^t=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

整数係数の非零形式和 $F$ を共役で掛けて $H$ を作ります。辞書式最大指数が消えないため $H\ne0$ です。反転積 $R=HH^\vee$ では0係数が非零整数の平方和になり、評価値は0のままです。最後に零係数を削除して有限指数集合 $T$ を得ます。

<!-- proof-start -->
### 証明

仮定の指数とその共役を含む有限Galois拡大 $K$ を、第2節で作った分解体として固定します。相異なる指数と非零整数係数を持つので $F=\sum_ja_jU_{\alpha_j}\ne0$、仮定によって $\operatorname{ev}(F)=0$ です。

第3節の構成

$$
H=\prod_{\sigma\in G}\sigma\cdot F
$$

において、各共役因子は非零であり、[形式和の積の非零性](../TRN7/index.md#lem-trn7-no-zero-divisors)により $H\ne0$ です。展開式の係数は整数の積の和だから $H$ は整数係数、共役因子を置換することから $G$ 不変です。恒等自己同型の因子で評価が0になるため $\operatorname{ev}(H)=0$ です。

$H$ を非零係数を持つ相異なる項にまとめ、反転積 $R=HH^\vee$ を作ります。[指数反転積の0係数](../TRN8/index.md#lem-trn8-positive-zero-coefficient)を $H$ に適用すると、その0係数は $\sum_{\lambda\in S}B_\lambda^2$ であり、$S$ が有限非空、各 $B_\lambda$ が非零整数なので**正の整数**です。$R$ は整数係数で $G$ 不変、評価は

$$
\operatorname{ev}(R)
=\operatorname{ev}(H)\operatorname{ev}(H^\vee)=0
$$

です。

$R$ の指数を結合し、係数0の項だけを削除して $R=\sum_{t\in T}c_tU_t$ と書きます。0係数は正だから $0\in T$ です。共役不変性から $T$ は共役で保たれ、係数は各軌道で等しくなります。もし $T=\{0\}$ なら $\operatorname{ev}(R)=c_0>0$ となり、評価が0という等式に反します。従って $T\setminus\{0\}\ne\varnothing$ です。これで四条件がすべて示されました。$\square$
<!-- proof-end -->

この命題は**指数関係があると仮定した場合**の還元であり、指数関係の不存在を結論とするものではありません。次の二章で、この還元先が解析的上界と両立しないことを示します。

## 5. 二次体で係数衝突と平方和を追跡する

$s=\sqrt2$、$K=\mathbb Q(s)$ とし、$G=\{1,\sigma\}$、$\sigma(s)=-s$ とします。実際の指数関数値に関係があるとは仮定せず、**形式演算の確認例**として

$$
F=U_0-U_s,\qquad \sigma\cdot F=U_0-U_{-s}
$$

を計算します。すると

$$
H=(U_0-U_s)(U_0-U_{-s})
=2U_0-U_s-U_{-s}.
$$

ここで0係数の2は $U_0U_0$ と $U_sU_{-s}$ から生じます。指数の衝突を整理した後、$H^\vee=H$ だから

$$
R=H^2
=6U_0-4U_s-4U_{-s}+U_{2s}+U_{-2s}.
$$

0係数は、先ほどの平方和と一致します。

$$
2^2+(-1)^2+(-1)^2=6.
$$

また、$\sigma$ は $s$ と $-s$、$2s$ と $-2s$ を交換します。交換される各組の係数は等しいので、$R$ はGalois作用で不変です。

一方、$0$ と $s=\sqrt2$ は相異なる代数的数です。[代数的指数上の単射性](../TRN11/index.md#prop-trn11-algebraic-injectivity)をこれらの指数に適用すると

$$
e^0=1\ne e^s,\qquad
\operatorname{ev}(F)=1-e^s\ne0.
$$

従って、**形式演算の計算例だけから指数関係が存在するとは主張していません**。

## 6. 単射性が保証すること、保証しないこと

[代数的指数上の単射性](../TRN11/index.md#prop-trn11-algebraic-injectivity)により、相異なる代数的数 $\alpha_j$ の値 $e^{\alpha_j}$ も相異なります。このことは

$$
\alpha_j\ne\alpha_k
\quad\Longrightarrow\quad
e^{\alpha_j}\ne e^{\alpha_k}
$$

という**二つの値の不一致**です。一方、複数の異なる複素数が一次従属である例は簡単に作れます。例えば $1,2,3$ はすべて相異なりますが $1+2-3=0$ です。従って単射性だけから有理一次独立性は出ません。

また $H$ の共役積を取る際、代数的指数 $\sigma(\alpha_j)$ に指数関数を適用するのは評価写像の役割です。Galois自己同型に $e^{\alpha_j}$ 自体を入力する操作は行いません。混同すると、指数関数値が代数的であるという未証明の仮定を密かに持ち込んでしまいます。

## 7. 次の章で何を証明するか

前節の[有理係数の指数関係の対称化](#prop-trn12-rational-symmetric-reduction)により、任意の反例候補は正の整数 $c_0$ を持つ共役不変な有限指数関係になります。次のTRN13ではこの固定した指数集合から、整数係数の消滅多項式と高重複零点の補助多項式を作り、素数合同による**非零の整数**と複素積分による**階乗分母の上界**を得る準備をします。その後TRN14で両者を矛盾させ、有理係数版を完成させます。

注意すべき点は、この段階の $c_0>0$ は整数ではありますが、それだけで矛盾にはならないことです。$\sum c_te^t=0$ の他の指数項を抑えるための新しい補助多項式が必要です。

## 8. 演習

### Level A：有限形式和を計算する

**TRN12-A1（分母消去と零係数の削除）**  
$s=\sqrt2$ とする。仮に $\frac12e^0-\frac34e^s+\frac14e^{2s}+0e^{3s}=0$ としたとき、非零整数係数を持つ形式指数和 $F$ を作れ。形式的非零性と評価値0を区別せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

共通分母として $D=4$ を選ぶと係数は $2,-3,1,0$ です。最後の0係数を削除して

$$
F=2U_0-3U_s+U_{2s}.
$$

$s\ne0$ より $0,s,2s$ は相異なり、$U_0$ の係数が2なので $F\ne0$ です。一方、問題文の仮定を4倍すると

$$
\operatorname{ev}(F)=2-3e^s+e^{2s}=0
$$

です。これは**仮定からの形式的帰結**であり、この具体的な指数関係が実在するとの主張ではありません。
<!-- solution-end -->

**TRN12-A2（複素指数の辞書式順序）**  
$1+i,1+2i,2-i$ を $(\operatorname{Re}z,\operatorname{Im}z)$ の辞書式順序で小さい順に並べ、$(1+2i)+(-i)$ と $(2-i)+(-i)$ の大小を比較せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

実部1の二つは虚部1と2を比較するので $1+i<1+2i$ です。$2-i$ は実部2だから両方より大きく、

$$
1+i<1+2i<2-i.
$$

共通の $-i$ を加えると、$(1+2i)-i=1+i$、$(2-i)-i=2-2i$ です。実部を比較して $1+i<2-2i$ であり、複素数の加法で辞書式順序が保たれることも確認できます。
<!-- solution-end -->

**TRN12-A3（二次体で共役を取る）**  
$s=\sqrt2$、$F=3U_0+2U_s$、$\sigma(s)=-s$ とする。$\sigma\cdot F$ と共役積 $H$ を計算し、整数係数と共役不変性を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

整数係数3,2は $\sigma$ に固定されるので $\sigma\cdot F=3U_0+2U_{-s}$ です。乗法 $U_\lambda U_\mu=U_{\lambda+\mu}$ により

$$
H=(3U_0+2U_s)(3U_0+2U_{-s})
=9U_0+6U_{-s}+6U_s+4U_0.
$$

従って $H=13U_0+6U_s+6U_{-s}$ です。全係数は整数です。$\sigma$ は $U_s$ と $U_{-s}$ を交換し、係数はともに6、$U_0$ は固定するので $\sigma\cdot H=H$ です。
<!-- solution-end -->

**TRN12-A4（反転積の0係数）**  
$H=2U_0-U_s-U_{-s}$ に対し $H^\vee$ と $[U_0](HH^\vee)$ を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

指数を符号反転すると $H^\vee=2U_0-U_{-s}-U_s=H$ です。積で指数0になるのは $0-0$、$s-s$、$(-s)-(-s)$ の三組だけです。従って

$$
[U_0](HH^\vee)=2\cdot2+(-1)(-1)+(-1)(-1)=6.
$$

異なる指数同士で差が0になることはないため、ここへ他の項は加わりません。
<!-- solution-end -->

### Level B：非零性・不変性・既習定理を結ぶ

**TRN12-B1（最大指数は相殺しない）**  
$A=U_0-2U_{1+i}+3U_{2-i}$、$B=2U_{-i}+U_1$ とする。複素辞書式順序で $AB$ の最大指数とその係数を求め、それが0でないことを確かめよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$A$ の指数は $0,1+i,2-i$ で、実部2を持つ $2-i$ が最大、係数は3です。$B$ の指数は $-i,1$ で、実部1を持つ1が最大、係数は1です。

よって積の最大指数は $(2-i)+1=3-i$、その係数は $3\cdot1=3$ です。他の組でこの指数が出ないことを確認します。$A$ 側で $0$ または $1+i$ を選ぶと実部は高々1、$B$ 側の実部は高々1であり、和の実部は高々2です。$2-i$ と $-i$ の組では指数が $2-2i$ です。従って $3-i$ の係数は相殺されず、$AB\ne0$ です。
<!-- solution-end -->

**TRN12-B2（恒等因子だけの評価零性）**  
$K/\mathbb Q$ を有限Galois拡大、$F\in K[K,+]$ を $\operatorname{ev}(F)=0$ を満たす非零形式和とし、$H=\prod_{\sigma\in G}\sigma\cdot F$ と置く。$\operatorname{ev}(H)=0$ の証明に $\operatorname{ev}(\sigma\cdot F)=0$（すべての $\sigma$）が不要であることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

[指数評価の乗法性](../TRN7/index.md#def-trn7-exponential-evaluation)を有限個の因子に繰り返し適用すると

$$
\operatorname{ev}(H)=\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F).
$$

恒等自己同型 $1_G$ は必ず $G$ に属し、$1_G\cdot F=F$ です。従って積の一つは $\operatorname{ev}(1_G\cdot F)=\operatorname{ev}(F)=0$ です。複素数の有限積は因子一つが0なら0なので $\operatorname{ev}(H)=0$ です。残りの共役因子の評価値については何も仮定していません。
<!-- solution-end -->

**TRN12-B3（二項の有理一次独立性）**  
$\alpha,\beta$ を相異なる代数的数とする。$qe^\alpha+re^\beta=0$（$q,r\in\mathbb Q$）なら $q=r=0$ であることを、必要な仮定を列挙して証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

[複素指数関数の非零性](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から $e^\alpha,e^\beta\ne0$ です。従って $q=0$ なら $r=0$、$r=0$ なら $q=0$ です。両者が非零だったと仮定すると、$qe^\alpha=-re^\beta$ を $qe^\beta$ で割って

$$
e^{\alpha-\beta}=-r/q\in\mathbb Q.
$$

$L=\mathbb Q(\alpha,\beta)$ と置きます。$\alpha$ が代数的なので $[\mathbb Q(\alpha):\mathbb Q]<\infty$ です。$\beta$ は $\mathbb Q(\alpha)$ 上でも代数的であり、まず[単純代数拡大の次数公式](../../FLD/FLD1/index.md#cor-fld1-simple-extension-degree)により $[L:\mathbb Q(\alpha)]<\infty$ です。続いて[塔の法則](../../FLD/FLD1/index.md#thm-fld1-tower-law)により

$$
[L:\mathbb Q]=[L:\mathbb Q(\alpha)] [\mathbb Q(\alpha):\mathbb Q]<\infty.
$$

この体に属する $\alpha-\beta$ は[有限拡大の元の代数性](../../FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)から代数的であり、相異なる仮定より $\alpha-\beta\ne0$ です。[Hermite–Lindemannの定理](../TRN11/index.md#thm-trn11-hermite-lindemann)をこの差に適用すると左辺は超越数ですが、右辺は有理数です。矛盾するので両係数は0です。相異なる仮定を落とすと $\alpha=\beta$、$q=1,r=-1$ が反例になります。
<!-- solution-end -->

**TRN12-B4（不変性の係数を確認する）**  
$s=\sqrt2$、$R=7U_0+4U_s+4U_{-s}+2U_{2s}+2U_{-2s}$ とする。$K=\mathbb Q(s)$ のGalois作用で $R$ が不変であることを確認し、$R'=7U_0+4U_s+3U_{-s}$ が不変でないことを説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

非自明な $\sigma$ は $s\mapsto-s$ なので $0$ を固定し、$s$ と $-s$、$2s$ と $-2s$ を交換します。$R$ は交換される各組の係数が同じであるため

$$
\sigma\cdot R
=7U_0+4U_{-s}+4U_s+2U_{-2s}+2U_{2s}=R
$$

です。一方

$$
\sigma\cdot R'=7U_0+4U_{-s}+3U_s
$$

であり、$U_s$ の係数は $R'$ では4、$\sigma\cdot R'$ では3です。$s\ne-s$ なので形式和は異なります。不変性は係数が単に整数という条件だけでは得られません。
<!-- solution-end -->

### Level C：全構成を再現し誤推論を排除する

**TRN12-C1（有理関係からの対称化を再構成）**  
相異なる $\alpha_j\in\overline{\mathbb Q}$ と全て非零の有理数 $q_j$ に対し $\sum_jq_je^{\alpha_j}=0$ を仮定する。有限Galois拡大の取り方、形式積の非零性、Galois不変性、評価の零性、反転積の0係数の正値性を順に証明し、$T\setminus\{0\}\ne\varnothing$ まで導け。

- Level: C

<!-- solution-start -->
**詳細解答**

共通分母 $D>0$ を取り $a_j=Dq_j\in\mathbb Z\setminus\{0\}$ とします。$\alpha_j$ の最小多項式を掛けた多項式の[分解体](../../FLD/FLD2/index.md#thm-fld2-splitting-field-existence) $K$ を取ります。これは[有限分解体の正規性](../../FLD/FLD2/index.md#thm-fld2-finite-splitting-equivalence)と[標数0の分離性](../../FLD/FLD2/index.md#cor-fld2-char-zero-algebraic)を満たすので、[有限Galois拡大](../../FLD/FLD4/index.md#def-fld4-finite-galois)です。$G=\operatorname{Gal}(K/\mathbb Q)$ と置きます。

$$
F=\sum_ja_jU_{\alpha_j}
$$

は相異なる指数と非零係数を持つため非零であり、指数評価では $\operatorname{ev}(F)=D\sum_jq_je^{\alpha_j}=0$ です。共役積

$$
H=\prod_{\sigma\in G}(\sigma\cdot F)
$$

を作ります。$\sigma$ は指数集合上で単射なので $\sigma\cdot F\ne0$ です。[TRN7の非零積補題](../TRN7/index.md#lem-trn7-no-zero-divisors)を有限回適用して $H\ne0$ となります。積の係数は整数の積の和なので、すべて整数です。

$\tau\in G$ を固定します。[共役作用と環演算](../TRN7/index.md#prop-trn7-galois-ring-action)により $\tau\cdot H=\prod_{\sigma\in G}(\tau\sigma)\cdot F$ です。$\sigma\mapsto\tau\sigma$ は $G$ の置換であり、各因子の順序を入れ替えるだけなので $\tau\cdot H=H$ です。

[指数評価の乗法性](../TRN7/index.md#def-trn7-exponential-evaluation)を適用します。恒等自己同型に対応する因子は $F$ 自身であり、その評価が0なので

$$
\operatorname{ev}(H)
=\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F)=0
$$

となります。

$H=\sum_{\lambda\in S}B_\lambda U_\lambda$ を相異なる指数・非零整数係数で書くと $S$ は有限非空です。反転積 $R=HH^\vee$ の0係数は、$\lambda-\mu=0$ が $\lambda=\mu$ と同値なので

$$
c_0=[U_0]R=\sum_{\lambda\in S}B_\lambda^2\in\mathbb Z_{>0}
$$

です。$\sigma(-\lambda)=-\sigma(\lambda)$ から $R$ はGalois不変であり、$\operatorname{ev}(R)=\operatorname{ev}(H)\operatorname{ev}(H^\vee)=0$ です。0係数を落とさず、他の零係数だけ削除した $R=\sum_{t\in T}c_tU_t$ では、$0\in T$、$c_0>0$、$T$ は共役不変、軌道上の係数は等しいです。もし $T=\{0\}$ なら $0=\operatorname{ev}(R)=c_0>0$ となって矛盾するので $T\setminus\{0\}\ne\varnothing$ です。この結論は**反例を対称化しただけ**であり、仮定した反例が本当に存在しないことはまだ証明していません。
<!-- solution-end -->

**TRN12-C2（単射・Galois作用・一次独立を区別）**  
次の三つの誤推論をそれぞれ指摘し、どこに追加の論証が必要か説明せよ。（a）代数的指数上で指数関数は単射だから、指数関数値は有理一次独立。（b）$\operatorname{ev}(F)=0$ なら任意の $\sigma$ で $\operatorname{ev}(\sigma\cdot F)=0$。（c）共役積 $H\ne0$ なら必ず $[U_0]H>0$。

- Level: C

<!-- solution-start -->
**詳細解答**

（a）[TRN11の単射性](../TRN11/index.md#prop-trn11-algebraic-injectivity)は**二つの指数関数値が一致しない**という主張です。一般に相異なる数でも $1+2-3=0$ のように一次従属であるため、相異なるだけでは一次独立になりません。指数和に固有の算術的・解析的論証が必要です。

（b）[形式和の共役作用](../TRN7/index.md#def-trn7-galois-action)は、代数的係数・指数へ $\sigma$ を作用させます。一方、評価値 $\operatorname{ev}(F)$ は一般に $K$ の元でなく、$\sigma(\operatorname{ev}(F))$ は定義されないことがあります。従って $\operatorname{ev}(\sigma\cdot F)=\sigma(\operatorname{ev}(F))$ とする根拠はありません。共役積の評価が0なのは**恒等因子の評価値だけが0**だからです。

（c）形式和 $H=U_s$（$s\ne0$）は非零ですが0係数は0です。$H=-U_0$ は非零ですが0係数は負です。どちらも（c）の反例です。[指数反転積の0係数](../TRN8/index.md#lem-trn8-positive-zero-coefficient)を使って $HH^\vee$ に取り替えて初めて

$$
[U_0](HH^\vee)=\sum_{\lambda\in S}B_\lambda^2>0
$$

を保証できます。ここで係数は非零整数で、$S$ は有限非空という条件も使っています。
<!-- solution-end -->
