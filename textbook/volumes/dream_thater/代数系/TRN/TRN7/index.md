# TRN7 共役に関する対称化と代数的係数

[Hermiteの定理](../TRN6/index.md#thm-trn6-e-transcendental)では、整数係数の指数関係を仮定し、非零整数の下界と積分上界を衝突させました。しかし指数が $\sqrt2$ のような代数的数になり、係数にも $\sqrt2$ などが混じると、同じ整数合同式をそのまま使えません。共役をまとめて算術的な量を作る準備が必要です。

例えば $K=\mathbb Q(\sqrt2)$ で $\sigma(\sqrt2)=-\sqrt2$ とします。代数的数には $\sigma$ を作用させられますが、一般に $\sigma(e^{\sqrt2})=e^{-\sqrt2}$ と書いてはいけません。左辺は通常の $K$ 上のGalois自己同型の**定義域にありません**。代わりに「代数的指数と係数を持つ**形式的な和**」を作り、そこで共役を取り、最後に指数関数で値を計算します。

本章の目標は、形式的な有限積が非零であること、複素数への評価後には零にもなり得ること、そして共役不変性から言える整数性の**正確な範囲**を、一つずつ証明することです。

## 1. 指数和を先に形式的に扱う

$\overline{\mathbb Q}$ は代数的複素数全体です。有限個の代数的な指数 $\alpha_j$ と代数的な係数 $a_j$ を固定すると、[分解体の存在](../../FLD/FLD2/index.md#thm-fld2-splitting-field-existence)により、それらの最小多項式の根をすべて含む有限Galois拡大 $K/\mathbb Q$ を選べます。以後 $K\subset\mathbb C$ を固定します。[有限Galois拡大の定義](../../FLD/FLD4/index.md#def-fld4-finite-galois)とその自己同型群 $G=\operatorname{Gal}(K/\mathbb Q)$ を用います。

実際の指数和 $\sum_j a_je^{\alpha_j}$ をいきなり共役に移す代わりに、記号 $U_\lambda$（$\lambda\in K$）を考えます。この記号は複素数 $e^\lambda$ そのものではありません。指数の足し算だけを記号の掛け算として表し、

$$
U_\lambda U_\mu=U_{\lambda+\mu},
\qquad U_0=1
$$

と約束します。まず $\lambda$ が異なる項を区別できるようにしておきます。

<a id="def-trn7-formal-exponential-sum"></a>

<!-- formal-statement-start -->
> **定義（有限形式指数和）**  
> $K/\mathbb Q$ を $\mathbb C$ 内の有限Galois拡大とする。$K$ の有限部分集合 $S$ と係数 $a_\lambda\in K$ を用いた形式和

$$
F=\sum_{\lambda\in S}a_\lambda U_\lambda
$$

> を有限形式指数和という。同じ指数が二度出た場合は係数を加え、係数が0の項を削除する。全係数が0のときだけ $F=0$ とする。加法は同じ指数の係数の和、乗法は $U_\lambda U_\mu=U_{\lambda+\mu}$ を分配して定める。この環を $K[K,+]$ と表す。
<!-- formal-statement-end -->

ここでの $K[K,+]$ は、体 $K$ の**加法群**を指数集合とした群環の記号です。二重の $K$ のうち外側は係数体、内側は加法を備えた指数集合を表します。したがって $U_\lambda$ は独立した形式上の基底記号であり、$e^\lambda$ と数として等しいと宣言したわけではありません。

<!-- definition-example-start: def-trn7-formal-exponential-sum -->
**定義の確認**

$s=\sqrt2$、$K=\mathbb Q(s)$ とします。例えば

$$
(2U_s+3U_s-U_{-s})=5U_s-U_{-s}\ne0
$$

です。指数 $s$ が二度現れたので係数を $2+3=5$ にまとめました。他方 $(U_s-U_s)=0$ です。積では

$$
(U_s+U_{-s})^2
=U_{2s}+2U_0+U_{-2s}.
$$

中央の $2U_0$ は $s+(-s)$ と $(-s)+s$ の**二つの組**から生じました。指数衝突は勝手に捨てず、係数を加えます。
<!-- definition-example-end -->

実際に指数関数へ戻す操作を「評価」と呼ぶことにします。[複素指数関数の加法公式](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)が成り立つので、次の操作は積を保ちます。

<a id="def-trn7-exponential-evaluation"></a>

<!-- formal-statement-start -->
> **定義（指数評価）**  
> 有限形式指数和 $F=\sum_{\lambda\in S}a_\lambda U_\lambda$ に対し、指数評価を

$$
\operatorname{ev}(F)=\sum_{\lambda\in S}a_\lambda e^\lambda\in\mathbb C
$$

> と定める。$\operatorname{ev}(F+H)=\operatorname{ev}(F)+\operatorname{ev}(H)$、$\operatorname{ev}(FH)=\operatorname{ev}(F)\operatorname{ev}(H)$ が成立する。
<!-- formal-statement-end -->

和をまとめた後も評価値は変わりません。積の公式は、$F=\sum a_\lambda U_\lambda$、$H=\sum b_\mu U_\mu$ とおいて

$$
\begin{aligned}
\operatorname{ev}(FH)
&=\sum_{\lambda,\mu}a_\lambda b_\mu e^{\lambda+\mu}\\
&=\sum_{\lambda,\mu}(a_\lambda e^\lambda)(b_\mu e^\mu)\\
&=\left(\sum_\lambda a_\lambda e^\lambda\right)
  \left(\sum_\mu b_\mu e^\mu\right)
\end{aligned}
$$

と有限和を展開すれば分かります。

<!-- definition-example-start: def-trn7-exponential-evaluation -->
**定義の確認**

$F=U_s-U_{-s}$ なら $\operatorname{ev}(F)=e^s-e^{-s}$ です。$F$ は二つの異なる指数を持ち形式的に非零です。評価はあくまで複素数値への環準同型であり、**定義だけでは単射性を保証しません**。特に後続の超越性定理をここで先取りして「形式的に非零だから評価も非零」とは言えません。
<!-- definition-example-end -->

## 2. Galois作用はどこに及ぶか

$G$ の元 $\sigma$ は $K$ の加法・乗法を保つため、指数 $\lambda$ と係数 $a_\lambda$ の両方を変えられます。$\sigma$ は単射なので、異なる指数の像も異なります。よって形式和への操作は曖昧ではありません。

<a id="def-trn7-galois-action"></a>

<!-- formal-statement-start -->
> **定義（形式指数和のGalois共役）**  
> 有限Galois拡大 $K/\mathbb Q$、$G=\operatorname{Gal}(K/\mathbb Q)$、$F=\sum_{\lambda\in S}a_\lambda U_\lambda\in K[K,+]$ に対し、

$$
\sigma\cdot F
=\sum_{\lambda\in S}\sigma(a_\lambda)U_{\sigma(\lambda)}
\qquad(\sigma\in G)
$$

> と定める。係数と指数に作用するのであり、指数評価後の $e^\lambda$ に $\sigma$ が作用するという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn7-galois-action -->
**定義の確認**

$s=\sqrt2$、$\sigma(s)=-s$ とします。$F=sU_s+1$ に対して

$$
\sigma\cdot F=-sU_{-s}+1
$$

です。指数と係数の双方を共役にしました。$1=U_0$ の指数0と係数1は固定されます。この式は $e^s$ のGalois共役を仮定していません。
<!-- definition-example-end -->

<a id="prop-trn7-galois-ring-action"></a>

<!-- formal-statement-start -->
> **命題（共役作用と環演算）**  
> 上の $K[K,+]$ の任意の $F,H$ と $\sigma,\tau\in G$ について、

$$
\sigma\cdot(FH)=(\sigma\cdot F)(\sigma\cdot H),
\qquad
\tau\cdot(\sigma\cdot F)=(\tau\sigma)\cdot F
$$

> が成り立ち、$\sigma\cdot F=0$ と $F=0$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

最初に $U_\lambda U_\mu$ に作用させると、指数の和が保存されることが要点です。合成法則と零の保存は自己同型が逆写像を持つことから示します。

<!-- proof-start -->
### 証明

$F=\sum_\lambda a_\lambda U_\lambda$、$H=\sum_\mu b_\mu U_\mu$ とし、積を分配してから作用させると

$$
\begin{aligned}
\sigma\cdot(FH)
&=\sum_{\lambda,\mu}\sigma(a_\lambda b_\mu)
 U_{\sigma(\lambda+\mu)}\\
&=\sum_{\lambda,\mu}\sigma(a_\lambda)\sigma(b_\mu)
 U_{\sigma(\lambda)+\sigma(\mu)}\\
&=(\sigma\cdot F)(\sigma\cdot H).
\end{aligned}
$$

和についても同じ指数の係数を足す操作を $\sigma$ が保ちます。合成については

$$
\tau\cdot(\sigma\cdot F)
=\sum_\lambda\tau(\sigma(a_\lambda))
 U_{\tau(\sigma(\lambda))}
=(\tau\sigma)\cdot F.
$$

$\sigma$ は $K$ の自己同型なので、$\sigma^{-1}$ が存在します。$\sigma\cdot F=0$ なら双方へ $\sigma^{-1}$ を作用させ、$F=0$ を得ます。逆方向は定義から直ちに従います。
<!-- proof-end -->

## 3. なぜ形式的な共役積は消えないのか

共役をすべて掛ければ共役不変性が得られそうですが、その積が形式的に0では役に立ちません。「複数の多項式の積は非零」という原理を、この指数和にも証明します。

複素数 $\lambda$ に対し実部、次に虚部を比較する**辞書式順序**を使います。すなわち $\lambda\prec\mu$ は $\operatorname{Re}\lambda<\operatorname{Re}\mu$、または実部が等しく虚部が小さいことを意味します。この順序は $\lambda\prec\mu$ なら $\lambda+\nu\prec\mu+\nu$ を満たします。

<a id="lem-trn7-no-zero-divisors"></a>

<!-- formal-statement-start -->
> **補題（有限形式指数和の積の非零性）**  
> $K\subset\mathbb C$ を体とする。$F,H\in K[K,+]$ がともに非零なら $FH\ne0$ である。したがって非零な有限個の形式指数和の積も非零である。
<!-- formal-statement-end -->

### 証明の見取り図

各形式和で最も大きな指数を一つ選びます。積の最大指数へ寄与する組は最大同士の組だけなので、その係数は非零係数の積となり、他の組と相殺されません。

<!-- proof-start -->
### 証明

$F$ の非零係数を持つ有限集合を $S$、$H$ のそれを $T$ とします。辞書式順序で最大の指数を $\lambda_*=\max S$、$\mu_*=\max T$ とし、その係数を $a_*\ne0$、$b_*\ne0$ とします。

任意の $(\lambda,\mu)\in S\times T$ について $\lambda\preceq\lambda_*$、$\mu\preceq\mu_*$ です。加法と順序の両立性より、

$$
\lambda+\mu\preceq\lambda_*+\mu_*.
$$

等号が成り立つには $\lambda=\lambda_*$ かつ $\mu=\mu_*$ が必要です。実際、どちらか一方が真に小さければ、他方が最大以下なので和も真に小さくなります。よって積 $FH$ における $U_{\lambda_*+\mu_*}$ の係数はただ一組から来る

$$
a_*b_*\ne0
$$

です。$K$ は体なので非零元の積は非零です。従って $FH\ne0$。有限個の積についてはこの議論を順に繰り返します。
<!-- proof-end -->

この補題は指数の重複が起こらないと主張しているのではありません。最大項**以外**では重複して相殺することがあっても、最大項の係数は必ず残る、という主張です。

## 4. 共役をすべて掛けて不変量を作る

[有限Galois拡大の自己同型群の位数](../../FLD/FLD4/index.md#cor-fld4-galois-order-degree)から $G$ は有限群です。そこで形式的な積を作ります。

<a id="def-trn7-conjugate-product"></a>

<!-- formal-statement-start -->
> **定義（形式指数和の共役積）**  
> 有限Galois拡大 $K/\mathbb Q$ と $G=\operatorname{Gal}(K/\mathbb Q)$ に対し、$F\in K[K,+]$ の**共役積**を

$$
\mathcal N_G(F)=\prod_{\sigma\in G}(\sigma\cdot F)
$$

> と定める。積は環 $K[K,+]$ で取るのであり、複素数の指数評価はこの積の構成後に行う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn7-conjugate-product -->
**定義の確認**

$s=\sqrt2$、$F=sU_s+1$ に対して $G=\{1,\sigma\}$ なので

$$
\begin{aligned}
\mathcal N_G(F)
&=(sU_s+1)(-sU_{-s}+1)\\
&=-2U_0+sU_s-sU_{-s}+U_0\\
&=-U_0+sU_s-sU_{-s}.
\end{aligned}
$$

ここでは指数 $s+(-s)=0$ と、定数項の指数 $0+0=0$ が衝突しました。係数を $-2+1=-1$ と合算しています。形式的に非零であり、係数 $s,-s$ は有理数ではありません。
<!-- definition-example-end -->

<a id="thm-trn7-conjugate-symmetrization"></a>

<!-- formal-statement-start -->
> **定理（共役積の非零性・不変性・評価）**  
> $K/\mathbb Q$ を有限Galois拡大、$G$ をそのGalois群とする。次の形式和を取る。

$
F=\sum_{j=1}^m a_jU_{\alpha_j},
\quad \alpha_j\in K,\quad
\alpha_i\ne\alpha_j\ (i\ne j),\quad a_j\in K.
$

> ただし $m\ge1$ とし、係数 $a_j$ は少なくとも一つ非零とする。このとき以下が成立する。
>
> 1. $\mathcal N_G(F)\ne0$（形式和として）。
> 2. どの $\tau\in G$ に対しても $\tau\cdot\mathcal N_G(F)=\mathcal N_G(F)$。
> 3. $\sum_j a_je^{\alpha_j}=0$ なら $\operatorname{ev}(\mathcal N_G(F))=0$（複素数として）。
<!-- formal-statement-end -->

### 証明の見取り図

非零性は[形式指数和の積の非零性](#lem-trn7-no-zero-divisors)、不変性はGalois群が共役因子を置換する事実、評価後の零性は元の因子の評価が零となることから、互いに独立して導きます。

<!-- proof-start -->
### 証明

指数 $\alpha_j$ は相異なるので、少なくとも一つの $a_j$ が非零なら定義上 $F\ne0$ です。[共役作用と環演算](#prop-trn7-galois-ring-action)から各 $\sigma\cdot F$ も非零であり、[積の非零性](#lem-trn7-no-zero-divisors)を有限個の因子に適用すると

$$
\mathcal N_G(F)=\prod_{\sigma\in G}(\sigma\cdot F)\ne0.
$$

次に任意の $\tau\in G$ に対して共役作用の積の保存を使うと、

$$
\begin{aligned}
\tau\cdot\mathcal N_G(F)
&=\prod_{\sigma\in G}\tau\cdot(\sigma\cdot F)\\
&=\prod_{\sigma\in G}(\tau\sigma)\cdot F\\
&=\prod_{\rho\in G}\rho\cdot F
=\mathcal N_G(F).
\end{aligned}
$$

3行目では $\sigma\mapsto\tau\sigma$ が有限群 $G$ の置換であることを使いました。最後に、指数評価は[環演算を保つ](#def-trn7-exponential-evaluation)ので

$$
\operatorname{ev}(\mathcal N_G(F))
=\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F).
$$

この有限積には $\sigma=1$ の因子 $\operatorname{ev}(F)=\sum_j a_je^{\alpha_j}=0$ が含まれます。よって積全体は0です。他の因子が0かどうか、$\operatorname{ev}(\sigma\cdot F)$ が元の関係から0と分かるかどうかは、ここでは一切必要ありません。
<!-- proof-end -->

ここまでで「**非零な形式的対象が、複素数としては0と評価される**」という形に仮定を変換できました。これは矛盾ではありません。後続章では補助多項式と整数性・解析上界を使い、このような評価零が起こらないことを**追加の論証**で示します。

## 5. 共役不変と有理係数を取り違えない

共役積を異なる指数ごとにまとめて

$$
\mathcal N_G(F)=\sum_{\lambda\in T}B_\lambda U_\lambda,
\qquad B_\lambda\in K\setminus\{0\}
$$

と書きます。どの指数にどの係数があるかを追うと、共役不変の意味が分かります。$T$ は非零係数の付いた有限集合です。

<a id="prop-trn7-coefficient-orbits"></a>

<!-- formal-statement-start -->
> **命題（共役不変な形式和の係数関係）**  
> $H=\sum_{\lambda\in T}B_\lambda U_\lambda\in K[K,+]$ が全ての $\sigma\in G$ に対して $\sigma\cdot H=H$ を満たすなら、$T$ は $G$ の作用で閉じ、全ての $\lambda\in T$ について

$$
B_{\sigma(\lambda)}=\sigma(B_\lambda)
$$

> が成り立つ。ただし $B_\mu=0$ を $\mu\notin T$ にも拡張して考えてよい。とくに $\lambda$ が全ての $\sigma$ で固定される場合だけ、$B_\lambda\in\mathbb Q$ が従う。
<!-- formal-statement-end -->

### 証明の見取り図

形式的な指数 $U_\lambda$ ごとに係数を比較します。指数は動くので、「同じ指数の係数が変わらない」とするのではなく、「移った指数の係数と元の係数の共役が等しい」と比較します。

<!-- proof-start -->
### 証明

$H$ へ $\sigma$ を作用させると

$$
\sigma\cdot H=\sum_{\lambda\in T}\sigma(B_\lambda)U_{\sigma(\lambda)}.
$$

$B_\lambda\ne0$ なら $\sigma(B_\lambda)\ne0$ です。$H=\sigma\cdot H$ だから、それらの非零指数の集合は等しく、$\sigma(T)=T$ を得ます。$U_{\sigma(\lambda)}$ の係数を双方で比較すると $B_{\sigma(\lambda)}=\sigma(B_\lambda)$ です。

もし $\sigma(\lambda)=\lambda$ が全 $\sigma$ で成立すれば、同じ等式は $\sigma(B_\lambda)=B_\lambda$ となります。[Galois対応の固定体](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)によって $K^G=\mathbb Q$ なので、$B_\lambda\in\mathbb Q$ です。指数が動くときはこの推論を使えません。
<!-- proof-end -->

前節の $H=-U_0+sU_s-sU_{-s}$ を見ると、$\sigma$ は $s$ と $-s$ を交換し、係数 $s$ と $-s$ も交換します。従って $H$ は共役不変ですが、$U_s$ の係数 $s$ は**有理数ではありません**。これが「共役積だから各係数は有理数」という誤りの反例です。

**別の操作との違い。** $P(Y)=sY+1\in K[Y]$ について係数にだけ共役を作用させれば、

$$
P(Y)\sigma(P)(Y)=(sY+1)(-sY+1)=1-2Y^2\in\mathbb Q[Y].
$$

ここでは変数 $Y$ を固定したため、同じ次数の係数同士を比較できました。これに対して形式指数和では $U_s$ そのものも $U_{-s}$ へ動きます。後の代数的係数版で用いる「係数だけの多項式ノルム」と本節の「係数・指数の共役積」は、似た見た目でも異なる演算です。

## 6. 整数になるものを正確に特定する

[TRN2の跡・ノルムの整数性](../TRN2/index.md#thm-trn2-integral-trace-norm)は、代数的整数の共役全体から通常の整数を作る道具です。しかし本章の $H$ が共役不変だからといって、すべての $B_\lambda$ が整数にはなりません。まず共役**で動かない一つの代数的数**に対して使います。

<a id="lem-trn7-fixed-integer"></a>

<!-- formal-statement-start -->
> **補題（共役不変な代数的整数）**  
> $K/\mathbb Q$ は有限Galois拡大とする。$\eta\in K$ が代数的整数で、全ての $\sigma\in\operatorname{Gal}(K/\mathbb Q)$ に対して $\sigma(\eta)=\eta$ なら $\eta\in\mathbb Z$ である。
<!-- formal-statement-end -->

### 証明の見取り図

固定体の定理で有理数へ移し、[有理数である代数的整数の判定](../TRN1/index.md#prop-trn1-rational-integers)で通常の整数へ移します。「有理」と「整数」は別々の段階です。

<!-- proof-start -->
### 証明

[有限Galois拡大の固定体の定理](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)で、全自己同型の固定体は $\mathbb Q$ なので $\eta\in\mathbb Q$ です。仮定より $\eta$ は代数的整数でもあります。[TRN1の有理数判定](../TRN1/index.md#prop-trn1-rational-integers)を適用して $\eta\in\mathbb Z$ を得ます。
<!-- proof-end -->

具体的に共役積から整数を取り出す方法の一つが、すべての指数記号を1に置き換える**係数和**です。これは指数評価とは別操作です。

<a id="def-trn7-augmentation"></a>

<!-- formal-statement-start -->
> **定義（係数和写像）**  
> $F=\sum_{\lambda\in S}a_\lambda U_\lambda$ に対し、

$$
\varepsilon(F)=\sum_{\lambda\in S}a_\lambda\in K
$$

> を係数和と呼ぶ。$\varepsilon(FH)=\varepsilon(F)\varepsilon(H)$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn7-augmentation -->
**定義の確認**

$F=sU_s+1$ なら $\varepsilon(F)=s+1$ です。[共役積の具体計算](#def-trn7-conjugate-product)から

$$
\varepsilon(\mathcal N_G(F))=-1+s-s=-1
$$

となります。これは $(s+1)(1-s)=1-s^2=-1$ と一致します。係数和は $e^s$ を代入する操作ではなく、**すべての $U_\lambda$ を1に置く操作**です。
<!-- definition-example-end -->

<a id="prop-trn7-augmentation-norm"></a>

<!-- formal-statement-start -->
> **命題（係数和で得る体ノルム）**  
> $K/\mathbb Q$ は有限Galois拡大、$G=\operatorname{Gal}(K/\mathbb Q)$ とし、$F\in K[K,+]$ とする。このとき

$$
\varepsilon(\mathcal N_G(F))
=\prod_{\sigma\in G}\sigma(\varepsilon(F))
=N_{K/\mathbb Q}(\varepsilon(F))\in\mathbb Q.
$$

> さらに $F$ の全係数が代数的整数なら左辺は通常の整数であり、$\varepsilon(F)\ne0$ ならその整数は非零である。
<!-- formal-statement-end -->

### 証明の見取り図

係数和が積と共役作用を保つことを各有限和で確かめます。その後は[共役のノルム公式](../TRN2/index.md#thm-trn2-conjugate-formula)と整数性を使います。

<!-- proof-start -->
### 証明

$F=\sum a_\lambda U_\lambda$、$H=\sum b_\mu U_\mu$ について、$FH$ の全係数を足すと

$$
\varepsilon(FH)=\sum_{\lambda,\mu}a_\lambda b_\mu
=\left(\sum_\lambda a_\lambda\right)
 \left(\sum_\mu b_\mu\right).
$$

指数が衝突する場合も、同じ指数の係数を加えてから全係数を足せば同じ結果です。また

$$
\varepsilon(\sigma\cdot F)
=\sum_\lambda\sigma(a_\lambda)
=\sigma\!\left(\sum_\lambda a_\lambda\right)
=\sigma(\varepsilon(F)).
$$

これらを共役積に順に適用すると

$$
\varepsilon(\mathcal N_G(F))
=\prod_{\sigma\in G}\varepsilon(\sigma\cdot F)
=\prod_{\sigma\in G}\sigma(\varepsilon(F)).
$$

有限Galois拡大は分離拡大で、その $\mathbb Q$-埋め込みは $G$ の全元と一致します。[共役のノルム公式](../TRN2/index.md#thm-trn2-conjugate-formula)からこれは $N_{K/\mathbb Q}(\varepsilon(F))$ です。係数が代数的整数なら[和の閉性](../TRN1/index.md#thm-trn1-integral-ring)により $\varepsilon(F)$ も代数的整数なので、[ノルムの整数性](../TRN2/index.md#thm-trn2-integral-trace-norm)で整数となります。$\varepsilon(F)\ne0$ なら各 $\sigma$ は単射なので共役値も非零であり、積は非零です。
<!-- proof-end -->

ただし **$F\ne0$ だけでは $\varepsilon(F)\ne0$ とは言えません**。例えば $F=U_s-U_{-s}$ は形式的に非零ですが $\varepsilon(F)=1-1=0$ です。従って補助量として係数和のノルムを選ぶ場合には、係数和の非零性を**別途**示す必要があります。後続章でどの算術量を選ぶかは、この区別が鍵になります。

## 7. 対称化で得たものと、まだ得ていないもの

相異なる代数的指数の非自明な関係を仮定すると、[共役積の定理](#thm-trn7-conjugate-symmetrization)は共役不変な**非零形式指数和**で、指数評価だけが0となるものを作ります。しかしその各係数が有理数になるとは限らず、非零整数の下界もまだ得ていません。

そこで次のTRN8では、$e^\alpha$ が代数的であるという仮定を指数和に直し、この形式的対称化を**どの関係に適用するか**を設計します。TRN9–10で零点の重複度、合同の非零性、複素積分上界を加え、ようやく評価零との矛盾を作ります。共役積を作っただけで超越性の証明が終わったわけではありません。

## 8. 演習

### Level A：記号、重複、共役の第一歩

**TRN7-A1（重複指数をまとめる）**  
$K=\mathbb Q(\sqrt2)$、$s=\sqrt2$ とし、$F=2U_s+3U_s-U_{-s}+U_0$ を標準形に直してください。$F$ は非零ですか。また $\varepsilon(F)$ を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$U_s$ の係数を加えて

$$
F=5U_s-U_{-s}+U_0
$$

です。$s,-s,0$ は相異なるので、係数 $5,-1,1$ の少なくとも一つが非零です。従って $F\ne0$。係数和は指数を無視して足すので

$$
\varepsilon(F)=5-1+1=5.
$$

<!-- solution-end -->

**TRN7-A2（共役が動かす二つの場所）**  
$K=\mathbb Q(s)$、$s=\sqrt2$、$\sigma(s)=-s$ とします。$F=3sU_s+(1+s)U_0$ の $\sigma\cdot F$ と $\sigma\cdot(\sigma\cdot F)$ を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$3$、$1$、指数0は固定され、$s$ は $-s$ へ移るため

$$
\sigma\cdot F=-3sU_{-s}+(1-s)U_0.
$$

二度目の作用では $-3s$ が $3s$、$-s$ が $s$、$1-s$ が $1+s$ に戻ります。従って

$$
\sigma\cdot(\sigma\cdot F)=3sU_s+(1+s)U_0=F.
$$

これは $\sigma^2=1$ と[作用の合成法則](#prop-trn7-galois-ring-action)の直接確認です。
<!-- solution-end -->

**TRN7-A3（形式積の重複）**  
$s=\sqrt2$ とし、$(U_s+U_{-s})^2$ を四つの積に展開し、$U_0$ の係数が2となる理由を示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

分配すると

$$
\begin{aligned}
(U_s+U_{-s})^2
&=U_sU_s+U_sU_{-s}+U_{-s}U_s+U_{-s}U_{-s}\\
&=U_{2s}+U_0+U_0+U_{-2s}\\
&=U_{2s}+2U_0+U_{-2s}.
\end{aligned}
$$

$U_sU_{-s}$ と $U_{-s}U_s$ は異なる組の積ですが指数和はどちらも0です。その二つを合算して係数2が生じます。
<!-- solution-end -->

**TRN7-A4（固定される代数的整数）**  
$\eta=3+2\sqrt2$ に対し、$K=\mathbb Q(\sqrt2)$ の全自己同型で固定されるかを判定してください。また跡とノルムが整数であることを計算で示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\sigma(\eta)=3-2\sqrt2$ は $\eta$ と異なるため、$\eta$ は全自己同型で固定されません。一方

$$
\eta+\sigma(\eta)=6,\qquad
\eta\sigma(\eta)=3^2-(2\sqrt2)^2=9-8=1
$$

はともに整数です。$\eta$ は $T^2-6T+1$ の根で代数的整数なので、これは[TRN2の跡・ノルム整数性](../TRN2/index.md#thm-trn2-integral-trace-norm)の具体例です。「本人が固定されること」と「共役全体の和・積が整数になること」は異なります。
<!-- solution-end -->

### Level B：非零性と整数化を組み合わせる

**TRN7-B1（最大指数が残る）**  
$s=\sqrt2$ とし、$F=U_s+U_{-s}-2U_0$、$H=U_s-U_{-s}$ を考えます。$FH$ を展開し、辞書式順序での最大指数とその係数を求めてください。

- Level: B

<!-- solution-start -->
**詳細解答**

まず分配して

$$
\begin{aligned}
FH
&=(U_s+U_{-s}-2U_0)(U_s-U_{-s})\\
&=U_{2s}-U_0+U_0-U_{-2s}-2U_s+2U_{-s}\\
&=U_{2s}-2U_s+2U_{-s}-U_{-2s}.
\end{aligned}
$$

$-U_0+U_0$ は相殺しますが、実数指数で最大の $2s$ の項 $U_{2s}$ は残ります。$F$ の最大指数 $s$ の係数は1、$H$ の最大指数 $s$ の係数も1なので、[非零積の補題](#lem-trn7-no-zero-divisors)のとおり積の最大係数は $1\cdot1=1$ です。
<!-- solution-end -->

**TRN7-B2（不変な形式和の係数は有理とは限らない）**  
$s=\sqrt2$ とし、$H=sU_s-sU_{-s}$ を考えます。$\sigma(s)=-s$ に対して $\sigma\cdot H=H$ を確認し、$H$ の全係数が有理数であるという主張を反証してください。

- Level: B

<!-- solution-start -->
**詳細解答**

作用の定義から

$$
\begin{aligned}
\sigma\cdot H
&=(-s)U_{-s}-(-s)U_s\\
&=sU_s-sU_{-s}=H.
\end{aligned}
$$

しかし $U_s$ の係数 $s=\sqrt2$ は有理数ではありません。[係数の共役関係](#prop-trn7-coefficient-orbits)が言うのは

$$
B_{\sigma(s)}=B_{-s}=-s=\sigma(B_s)
$$

であり、$B_s=\sigma(B_s)$ ではありません。指数 $s$ 自体が固定されないため、固定体の定理をその係数へ直接適用できないのです。
<!-- solution-end -->

**TRN7-B3（共役積と二つの評価）**  
$K=\mathbb Q(s)$、$s=\sqrt2$、$F=U_s+2U_0$ に対して $\mathcal N_G(F)$、$\operatorname{ev}(\mathcal N_G(F))$、$\varepsilon(\mathcal N_G(F))$ を求め、最後の値をノルムでも検算してください。

- Level: B

<!-- solution-start -->
**詳細解答**

共役因子は $U_{-s}+2U_0$ なので

$$
\begin{aligned}
\mathcal N_G(F)
&=(U_s+2U_0)(U_{-s}+2U_0)\\
&=U_0+2U_s+2U_{-s}+4U_0\\
&=5U_0+2U_s+2U_{-s}.
\end{aligned}
$$

指数評価は

$$
\operatorname{ev}(\mathcal N_G(F))
=5+2e^s+2e^{-s}
=(e^s+2)(e^{-s}+2).
$$

一方、係数和は $5+2+2=9$ です。$\varepsilon(F)=1+2=3$ だから[係数和のノルム公式](#prop-trn7-augmentation-norm)によって

$$
N_{K/\mathbb Q}(3)=3\cdot3=9
$$

と一致します。指数評価と係数和は異なる値を返しています。
<!-- solution-end -->

**TRN7-B4（共役積の算術的注意）**  
$s=\sqrt2$、$F=sU_s+1$ とします。共役積の $U_0$、$U_s$、$U_{-s}$ の係数を求め、それぞれの有理性と $\varepsilon(\mathcal N_G(F))$ の非零性を判定してください。

- Level: B

<!-- solution-start -->
**詳細解答**

共役積を分配して

$$
\begin{aligned}
(sU_s+1)(-sU_{-s}+1)
&=-s^2U_0+sU_s-sU_{-s}+U_0\\
&=-U_0+sU_s-sU_{-s}
\end{aligned}
$$

を得ます。$U_0$ の係数 $-1$ は有理数ですが、$U_s$ と $U_{-s}$ の係数 $s,-s$ は有理数ではありません。係数和は

$$
-1+s-s=-1\ne0.
$$

また $\varepsilon(F)=1+s$ のノルムは

$$
(1+s)(1-s)=1-s^2=-1,
$$

なので直接計算と一致します。この例では係数の全てが有理になるのではなく、特定の係数和が整数になります。
<!-- solution-end -->

### Level C：対称化の論証を再構成する

**TRN7-C1（指数衝突と非零整数性の境界）**  
$K/\mathbb Q$ を有限Galois拡大、$G=\operatorname{Gal}(K/\mathbb Q)$ とします。相異なる $\alpha_j\in K$、$a_j\in K$ の少なくとも一つが非零である $F=\sum_{j=1}^m a_jU_{\alpha_j}$ について、次を示してください。

1. $\mathcal N_G(F)$ を有限形式指数和に展開すると、指数の衝突をまとめた後も非零であり、$G$ 不変である。
2. $\operatorname{ev}(F)=0$ なら $\operatorname{ev}(\mathcal N_G(F))=0$ である。ここで $\sigma(e^{\alpha_j})$ という操作を使ってはいけません。
3. 係数 $a_j$ が全て代数的整数かつ $\sum_j a_j\ne0$ なら、$\varepsilon(\mathcal N_G(F))$ が非零整数である。
4. 3の「$\sum_j a_j\ne0$」を単なる「$F\ne0$」へ弱められないことを反例で示してください。

- Level: C

<!-- solution-start -->
**詳細解答**

まず指数が相異なり非零係数があるので $F\ne0$ です。各 $\sigma\cdot F$ も非零であり、[有限形式指数和の積の非零性](#lem-trn7-no-zero-divisors)を $|G|$ 回使うと $\mathcal N_G(F)\ne0$ です。積の展開時に同じ指数へ複数の組が寄与しても、最大指数の係数は非零な最大係数の積で残ります。

任意の $\tau\in G$ に対し、作用は積を保つので

$$
\tau\cdot\mathcal N_G(F)
=\prod_{\sigma\in G}(\tau\sigma)\cdot F
=\prod_{\rho\in G}\rho\cdot F
=\mathcal N_G(F).
$$

これは $\sigma\mapsto\tau\sigma$ が $G$ 上の全単射であるためです。指数をまとめても形式和の等式は保たれます。

指数評価は環準同型なので

$$
\operatorname{ev}(\mathcal N_G(F))
=\prod_{\sigma\in G}\operatorname{ev}(\sigma\cdot F).
$$

$\sigma=1$ の因子が $\operatorname{ev}(F)=0$ であるため、積は0です。$K$ 上の自己同型を指数関数値へ拡張する操作は用いていません。

次に $\delta=\sum_j a_j$ は[代数的整数の和の閉性](../TRN1/index.md#thm-trn1-integral-ring)により代数的整数です。仮定より $\delta\ne0$ です。共役値 $\sigma(\delta)$ は自己同型の単射性から全て非零であるため、

$$
\begin{aligned}
\varepsilon(\mathcal N_G(F))
&=\prod_{\sigma\in G}\sigma(\varepsilon(F))\\
&=\prod_{\sigma\in G}\sigma(\delta)
=N_{K/\mathbb Q}(\delta).
\end{aligned}
$$

[TRN2の非零整数ノルム](../TRN2/index.md#thm-trn2-integral-trace-norm)からこれは $\mathbb Z\setminus\{0\}$ に属します。

最後に $s=\sqrt2$、$F=U_s-U_{-s}$ を取ると、相異なる指数と係数 $1,-1$ により $F\ne0$ ですが

$$
\varepsilon(F)=1-1=0,\qquad
\varepsilon(\mathcal N_G(F))
=N_{K/\mathbb Q}(0)=0.
$$

よって $F\ne0$ はノルムの非零性を保証せず、3の条件を置き換えられません。形式的な積の非零性と算術的に取り出した整数の非零性は別々に証明する必要があります。
<!-- solution-end -->
