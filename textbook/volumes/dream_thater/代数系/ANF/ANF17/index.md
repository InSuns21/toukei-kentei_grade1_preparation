# ANF17 局所類体論：相互法則・関手性

[前講のノルム群と存在定理](../ANF16/index.md#thm-anf16-local-existence)では、有限 Abel 拡大を開有限指数部分群で指定できることを学びました。しかし、群の位数が一致するだけでは、商群の**どの元がどの Galois 自己同型に対応するか**は定まりません。今回の問いは、対応の向きを Frobenius で固定し、拡大・中間体を変えても同じ対応が働くことを理解することです。

本講では $K/\mathbb Q_p$ を有限拡大、$\mathcal O_K$ を整数環、$\mathfrak p_K$ を極大イデアルとします。剰余体 $k_K$ の位数を $q$ とし、付値を $v_K(K^\times)=\mathbb Z$ と規格化します。

$\pi_K$ は $v_K(\pi_K)=1$ の一様化元です。[局所体の単数と付値の分解](../ANF16/index.md#prop-anf16-valuation-unit-sequence)を使います。

有限 Galois 拡大の Galois 群とノルムは既習です。また[算術的 Frobenius の定義](../ANF15/index.md#def-anf15-arithmetic-frobenius)では、剰余体上の自己同型を $x\mapsto x^q$ としました。

この講で証明するのは、相互法則の有限商から得られる自然な射の可換性・核・一意性、非分岐拡大での規格化と基礎体変更の直接計算です。**すべての分岐 Abel 拡大について相互法則の写像を構成する深い存在部分と、その一般的な基礎体変更則は外部定理**として使用します。この区別は後の具体計算でも維持します。

## 1. どちら向きの Frobenius を対応させるか

次数 $n$ の非分岐拡大 $E/K$ に対して、[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)は次の同型を直接構成しました。

$$
K^\times/(\pi_K^{n\mathbb Z}\mathcal O_K^\times)
\xrightarrow{\ \sim\ }\operatorname{Gal}(E/K),
\qquad [\pi_K]\longmapsto F_{E/K}.
$$

$F_{E/K}$ は剰余体上の $x\mapsto x^q$ の唯一の持ち上げで、単数の像は $1$ です。$x\mapsto x^{q^{-1}}$ という逆向きの作用を採用する流儀もありますが、本講は**算術的 Frobenius** を採用します。この選択により、一様化元と Frobenius の向きが一致します。

より一般の有限 Abel 拡大 $L/K$ でも、$K^\times$ から $\operatorname{Gal}(L/K)$ へ同時に射を作りたいのです。そこで、まず対応させたい写像と必要条件を明示します。

<a id="def-anf17-finite-reciprocity"></a>

<!-- formal-statement-start -->
> **定義（有限拡大の局所 Artin 写像・ノルム剰余記号）**  
> $L/K$ を有限 Abel Galois 拡大とする。局所相互法則により与えられる連続準同型

$$
\operatorname{rec}_{L/K}:K^\times\longrightarrow\operatorname{Gal}(L/K)
$$

> を有限拡大の局所 Artin 写像とし、$\operatorname{rec}_{L/K}(a)$ を $a$ のノルム剰余記号とも書く。規格化は非分岐拡大で $\operatorname{rec}_{E/K}(\pi_K)=F_{E/K}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf17-finite-reciprocity -->
**定義の確認（非分岐二次）。** $K=\mathbb Q_3$、$E=\mathbb Q_3(i)$（$i^2=-1$）では[非分岐 Frobenius の具体例](../ANF15/index.md#prop-anf15-frobenius-lift)により $F(i)=-i$、$F^2=1$ です。任意の $a=3^m u$（$m\in\mathbb Z$、$u\in\mathbb Z_3^\times$）に対して

$$
\operatorname{rec}_{E/K}(3^m u)=F^m,\quad
\operatorname{rec}_{E/K}(3)=F,\quad
\operatorname{rec}_{E/K}(-1)=1.
$$

実際 $F^{m+\ell}=F^mF^\ell$ なので準同型です。$3$ の像が $F$ で全射、核は $m$ が偶数の元、すなわち $3^{2\mathbb Z}\mathbb Z_3^\times=N_{E/K}(E^\times)$ です。単数が全て核に入ることも計算から分かります。
<!-- definition-example-end -->

ここで有限 Abel 拡大とは、$L/K$ が有限・Galois で $\operatorname{Gal}(L/K)$ が可換であることです。[非分岐ノルム群](../ANF15/index.md#prop-anf15-unramified-norm-quotient)なら上の写像を構成できました。一方、分岐一般では Hilbert 90 やノルム群の開性だけでは構成できません。

<a id="thm-anf17-local-reciprocity"></a>

<!-- formal-statement-start -->
> **定理（局所相互法則・有限商による表示）**  
> $K/\mathbb Q_p$ を有限拡大とする。$K$ の分離閉包を固定し、その中の各有限 Abel Galois 拡大 $L/K$ に対して、連続全射 $\operatorname{rec}_{L/K}:K^\times\to\operatorname{Gal}(L/K)$ が存在し、次を満たす。
>
> 1. 核は $N_{L/K}(L^\times)$ であり、従って商に誘導される写像は同型である。
> 2. $L/K$ が非分岐なら、任意の $a\in K^\times$ に対し $\operatorname{rec}_{L/K}(a)=F_{L/K}^{v_K(a)}$ である。
> 3. $K\subset M\subset L$ が有限 Abel 拡大の塔なら、$\operatorname{rec}_{L/K}(a)$ を $M$ に制限したものは $\operatorname{rec}_{M/K}(a)$ である。
>
> これらを全有限 Abel 拡大について両立させる局所 Artin 写像は一意に定まる。
<!-- formal-statement-end -->

### 定理を使うための境界

これは**局所類体論の外部定理**です。分岐拡大も含む存在・両立性の証明には、局所基本類と群コホモロジー、または Lubin–Tate 理論などが必要です。[前講の一般存在定理](../ANF16/index.md#thm-anf16-local-existence)はノルム部分群に対応する拡大の存在を述べるのであって、この自然な写像の構成を単独で与えるわけではありません。標準的な証明は J. S. Milne *Class Field Theory*（https://www.jmilne.org/math/CourseNotes/cft.html）および K. Kedlaya *Class Field Theory*, §4.1（https://kskedlaya.org/cft/sec_localrecip.html）を参照してください。

以下の命題では、この外部定理を**入力として使う箇所**を明示し、その先の群論・計算は全て示します。

## 2. ノルムで割ると何が残るか

<a id="prop-anf17-artin-quotient"></a>

<!-- formal-statement-start -->
> **命題（有限局所 Artin 写像の核と位数）**  
> $L/K$ を有限 Abel Galois 局所拡大とする。このとき

$$
K^\times/N_{L/K}(L^\times)
\xrightarrow{\ \sim\ }\operatorname{Gal}(L/K),
\qquad [a]\longmapsto\operatorname{rec}_{L/K}(a)
$$

> は群同型である。特に $[K^\times:N_{L/K}(L^\times)]=[L:K]$。$a$ がノルムであることと $\operatorname{rec}_{L/K}(a)=1$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

[局所相互法則](#thm-anf17-local-reciprocity)で与えられる全射の核がノルム群です。そこで商での写像を定義し、代表元の取り方に依存しないことと単射・全射を順番に確かめます。

<!-- proof-start -->
### 証明

$H=N_{L/K}(L^\times)$ とします。$aH=bH$ なら $a=b h$ となる $h\in H$ があり、[局所相互法則](#thm-anf17-local-reciprocity)の核の条件から

$$
\operatorname{rec}_{L/K}(a)
=\operatorname{rec}_{L/K}(b)\operatorname{rec}_{L/K}(h)
=\operatorname{rec}_{L/K}(b)
$$

です。よって商からの写像は well-defined です。像が $1$ なら $a\in\ker(\operatorname{rec}_{L/K})=H$ だから $[a]=[1]$、従って単射です。全射性は元の Artin 写像の全射性から従います。最後に、有限 Galois 拡大の次数は Galois 群の位数に等しいので

$$
[K^\times:H]=|\operatorname{Gal}(L/K)|=[L:K].
$$

核に関する同値も同じ条件の言い換えです。
<!-- proof-end -->

注意：$[L:K]$ がノルム指数に等しいという結論は**Abel Galois 拡大について**のものです。一般の非Abel拡大へ無条件にこの等式を広げることはできません。非Abel拡大では Galois 群自体もこの可換な商と同型になりません。

## 3. 中間体への制限は商の射影に一致する

$K\subset M\subset L$ を有限 Abel Galois 拡大の塔とします。[ノルムの塔での包含](../ANF16/index.md#prop-anf16-norm-tower)は

$$
H_L=N_{L/K}(L^\times)\subset H_M=N_{M/K}(M^\times)
$$

を与えます。そのため $K^\times/H_L\to K^\times/H_M$ には自然な全射があります。これが Galois 側の制限 $\sigma\mapsto\sigma|_M$ と同じであることが「一つの Artin 写像を全拡大で使う」という意味です。

<a id="prop-anf17-restriction-square"></a>

<!-- formal-statement-start -->
> **命題（中間体への制限と自然性）**  
> $L/K$ を有限 Abel Galois 拡大、$M$ をその中間体とする。次の二つの写像は可換である。

$$
\begin{array}{ccc}
K^\times/H_L & \xrightarrow{\ \operatorname{rec}_{L/K}\ } &
\operatorname{Gal}(L/K)\\
\downarrow && \downarrow\mathrm{res}_{L/M}\\
K^\times/H_M & \xrightarrow{\ \operatorname{rec}_{M/K}\ } &
\operatorname{Gal}(M/K).
\end{array}
$$

> ここで左の縦射は $aH_L\mapsto aH_M$、右の縦射は自己同型の $M$ への制限である。左縦射の核は $H_M/H_L$ であり、右縦射の核は $\operatorname{Gal}(L/M)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

前講のノルム包含で左縦射を作り、局所相互法則の両立性を使って可換性を確かめます。核の記述は、それぞれ「何が自明な類になるか」を追えば得られます。

<!-- proof-start -->
### 証明

まず[ノルム塔の包含](../ANF16/index.md#prop-anf16-norm-tower)から $H_L\subset H_M$ です。よって $aH_L=bH_L$ なら $a^{-1}b\in H_L\subset H_M$ なので $aH_M=bH_M$、左縦射は well-defined です。任意の $aH_M$ は $aH_L$ から来るので全射です。

右縦射は $L/K$ が Abel Galois であるため中間体 $M/K$ も Galois であり定義できます。任意の $a\in K^\times$ に対し、上から右へ進むと $\operatorname{rec}_{L/K}(a)|_M$、左から下へ進むと $\operatorname{rec}_{M/K}(a)$ です。これらは[局所相互法則](#thm-anf17-local-reciprocity)の両立条件により等しくなります。

左縦射で $aH_L$ が自明になるのは $a\in H_M$ のとき、その全体は $H_M/H_L$ です。右縦射で自明になるのは $M$ を点ごとに固定する $\sigma$ のときで、これは $\operatorname{Gal}(L/M)$ の定義そのものです。両横射は[Artin 商同型](#prop-anf17-artin-quotient)なので、この二つの核も対応します。
<!-- proof-end -->

**直接例：位数4から位数2へ。** $K=\mathbb Q_5$、$L=K(\sqrt[4]5)$、$M=K(\sqrt5)$ とします。[緩分岐 Kummer ノルム群の計算](../ANF16/index.md#prop-anf16-tame-kummer-norm)から

$$
H_L=\langle-5\rangle(1+5\mathbb Z_5),\qquad
H_M=5^{\mathbb Z}\{u\in\mathbb Z_5^\times:\bar u\in\{1,4\}\}.
$$

$K^\times/H_L$ は $[2]$ で生成される位数4の巡回群、$K^\times/H_M$ は $[2]$ で生成される位数2の巡回群です。従って制限は生成元を生成元へ送り、$[2]^2$ を核に送ります。Galois 側の核は次数 $[L:M]=2$ の群に一致します。この例は Artin 写像の **Galois 群への具体的な生成元の像をまだ計算していない** 点にも注意してください。位数だけから分岐拡大の生成元を決めつけることはできません。

## 4. 基礎体を変えた場合：ノルムと制限

今度は $M/K$ を任意の有限局所拡大（Galois でなくてもよい）、$L/K$ を有限 Abel Galois 拡大とし、同じ分離閉包内で $LM$ を合成体とします。$LM/M$ は有限 Abel Galois です。$LM$ の $M$ 上の自己同型を $L$ に制限すると $\operatorname{Gal}(L/K)$ の元になります（実際の像は $\operatorname{Gal}(L/L\cap M)$）。このとき基礎体 $M$ から $K$ へ元を移すのが体ノルム $N_{M/K}$ です。

<a id="thm-anf17-basechange"></a>

<!-- formal-statement-start -->
> **定理（局所相互法則のノルム・制限の関手性）**  
> $K/\mathbb Q_p$ を有限拡大、$M/K$ を有限拡大、$L/K$ を有限 Abel Galois 拡大とする。任意の $b\in M^\times$ に対し

$$
\left.\operatorname{rec}_{LM/M}(b)\right|_L
=\operatorname{rec}_{L/K}\!\left(N_{M/K}(b)\right)
$$

> が $\operatorname{Gal}(L/K)$ の元として成り立つ。
<!-- formal-statement-end -->

この**一般形は外部定理**として用います。局所相互法則の存在と同様、一般の分岐拡大で成立することを前講のノルム群だけから導けるわけではありません。標準的証明では局所基本類の制限・corestrictionとの整合を用います（Kedlaya *Class Field Theory*, §4.3、https://kskedlaya.org/cft/sec_tatethm.html）。以下では**非分岐 $L/K$ の場合は、既習の算術的 Frobenius だけで直接証明**します。

<a id="prop-anf17-unramified-basechange"></a>

<!-- formal-statement-start -->
> **命題（非分岐拡大での基礎体変更：直接証明）**  
> $M/K$ を有限局所拡大、$L/K$ を有限非分岐 Galois 拡大とする。$f=[k_M:k_K]$ とすれば、任意の $b\in M^\times$ について

$$
\left.\operatorname{rec}_{LM/M}(b)\right|_L
=F_{L/K}^{\,f\,v_M(b)}
=\operatorname{rec}_{L/K}(N_{M/K}(b)).
$$

<!-- formal-statement-end -->

### 証明の見取り図

$LM/M$ も非分岐です。$M$ の剰余体は $q^f$ 元なので、その算術的 Frobenius を $L$ の剰余体で見ると $q$ 乗 Frobenius の $f$ 乗です。他方[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)も $f$ を掛けます。この二つの指数が一致することを確かめます。

<!-- proof-start -->
### 証明

$L/K$ が非分岐なので、$LM/M$ も非分岐です。$k_K$ の位数が $q$、$k_M$ が $q^f$ ですから、$LM/M$ の算術的 Frobenius は剰余で $x\mapsto x^{q^f}$ と作用します。これを $L$ に制限すると、$L$ の剰余体では $F_{L/K}^f$ と一致します。剰余体への作用は非分岐 Galois 群を一意に定めるので

$$
\left.F_{LM/M}\right|_L=F_{L/K}^{\,f}.
$$

$b=\pi_M^r u$（$r=v_M(b)$、$u\in\mathcal O_M^\times$）と書くと、[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)を $LM/M$ に適用して

$$
\left.\operatorname{rec}_{LM/M}(b)\right|_L
=\left.F_{LM/M}^r\right|_L
=F_{L/K}^{\,fr}.
$$

他方、[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)は $v_K(N_{M/K}(b))=f\,v_M(b)=fr$ を与えます。再度[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)を $L/K$ に適用すれば

$$
\operatorname{rec}_{L/K}(N_{M/K}(b))
=F_{L/K}^{v_K(N_{M/K}(b))}
=F_{L/K}^{fr}.
$$

従って両辺は一致します。
<!-- proof-end -->

**非分岐例。** $K=\mathbb Q_3$、$L/K$ を非分岐三次、$M/K$ を非分岐二次とします。$f(M/K)=2$ なので $b=3$ に対し、上の左右はともに $F_{L/K}^2$ です。一方 $N_{M/K}(3)=3^2$ なので、右側も確かに $F_{L/K}^{v_3(9)}=F_{L/K}^2$ です。

**分岐例での注意。** 上の証明では $L/K$ の**非分岐性**を使い、相互法則を付値だけで計算しました。$L/K$ が分岐すると単数の像が非自明になり得るため、$v_K(Nb)$ だけを比較して一般的な関手性の証明とすることはできません。これは[前講の緩分岐ノルム商](../ANF16/index.md#prop-anf16-tame-kummer-norm)で単数に障害が残ったことと対応します。

## 5. 対応が作る体の格子

局所相互法則と[前講の存在定理](../ANF16/index.md#thm-anf16-local-existence)を合わせると、有限 Abel 拡大の包含関係と、開有限指数部分群の**逆向き**の包含関係を結べます。

<a id="cor-anf17-correspondence"></a>

<!-- formal-statement-start -->
> **系（有限 Abel 拡大と開有限指数部分群の対応）**  
> $K/\mathbb Q_p$ の分離閉包を固定する。有限 Abel Galois 中間拡大 $L/K$ には $N_{L/K}(L^\times)$ を対応させる。この対応は、$K^\times$ の開有限指数部分群全体との包含反転の一対一対応である。対応する群の指数は $[L:K]$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

存在と一意性は[前講の存在定理](../ANF16/index.md#thm-anf16-local-existence)、指数は[商の同型](#prop-anf17-artin-quotient)によります。包含反転は[中間体への制限](#prop-anf17-restriction-square)です。

<!-- proof-start -->
### 証明

任意の開有限指数部分群 $H$ に対し、[局所存在定理](../ANF16/index.md#thm-anf16-local-existence)は一意な有限 Abel 拡大 $L$ を与え、$H=N_{L/K}(L^\times)$ とします。従って対応は全射であり、ノルム群が同じなら拡大も同じなので単射です。

$L\supset M$ なら[ノルムの塔での包含](../ANF16/index.md#prop-anf16-norm-tower)により $H_L\subset H_M$ です。

逆に $H_L\subset H_M$ とします。合成体 $F=LM$ は有限 Abel Galois 拡大です。$H_F=N_{F/K}(F^\times)$ と置き、[ノルムの塔での包含](../ANF16/index.md#prop-anf16-norm-tower)を適用すると、

$$
H_F\subset H_L\cap H_M
$$

となります。[商の同型](#prop-anf17-artin-quotient)により、$H_L/H_F$ と $H_M/H_F$ を $\operatorname{Gal}(F/K)$ の部分群として比較できます。

[中間体への制限](#prop-anf17-restriction-square)の核の記述から、前者は $\operatorname{Gal}(F/L)$、後者は $\operatorname{Gal}(F/M)$ に対応します。仮定 $H_L\subset H_M$ により

$$
\operatorname{Gal}(F/L)\subset\operatorname{Gal}(F/M).
$$

有限 Galois 対応では固定体の包含が逆転するので $M\subset L$ です。指数の主張は[商同型](#prop-anf17-artin-quotient)から従います。
<!-- proof-end -->

ここまでで、非分岐例では Frobenius を追い、任意の有限 Abel 拡大ではノルムと有限 Galois 群の対応を追えるようになりました。次講ではこの仕組みを $\mathbb Q_p$ の円分・分岐拡大の数値計算へ適用します。

## 6. 演習：規格化・制限・ノルムを自分で追う

### A1. 非分岐三次の Artin 写像

$K/\mathbb Q_p$ を有限拡大、$E/K$ を非分岐三次、$F=F_{E/K}$ とする。$a=\pi_K^8u$（$u\in\mathcal O_K^\times$）の Artin 像と核に属するかを調べよ。

- Level: A
- ID: ANF17-A1

<!-- solution-start -->
**詳細解答。** [非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)では単数が核、$\pi_K$ が $F$ に写ります。よって

$$
\operatorname{rec}_{E/K}(a)=F^{v_K(a)}=F^8=F^2
$$

です。$F$ は位数3なので $F^2\ne1$、従って $a$ は核に属しません。実際[非分岐ノルム群](../ANF15/index.md#prop-anf15-unramified-norm-quotient)は $\pi_K^{3\mathbb Z}\mathcal O_K^\times$ であり $8$ は3の倍数ではありません。
<!-- solution-end -->

### A2. Artin 写像の核で判定する

有限 Abel Galois 局所拡大 $L/K$ と $a,b\in K^\times$ に対して $\operatorname{rec}_{L/K}(a)=\operatorname{rec}_{L/K}(b)$ の必要十分条件をノルムで表せ。

- Level: A
- ID: ANF17-A2

<!-- solution-start -->
**詳細解答。** [有限商の同型](#prop-anf17-artin-quotient)により $\operatorname{rec}$ は準同型で核が $N_{L/K}(L^\times)$ です。従って

$$
\operatorname{rec}(a)=\operatorname{rec}(b)
\iff \operatorname{rec}(ab^{-1})=1
\iff ab^{-1}\in N_{L/K}(L^\times).
$$

逆向きも同じ準同型性から従います。単に $v_K(a)=v_K(b)$ だけでは分岐拡大での単数障害を判定できません。
<!-- solution-end -->

### A3. 中間体に制限したときの核

$L/M/K$ を有限 Abel 拡大の塔、$H_L=N_{L/K}(L^\times)$、$H_M=N_{M/K}(M^\times)$ とする。自然な射 $K^\times/H_L\to K^\times/H_M$ の核を示せ。

- Level: A
- ID: ANF17-A3

<!-- solution-start -->
**詳細解答。** [ノルム群の塔の包含](../ANF16/index.md#prop-anf16-norm-tower)から $H_L\subset H_M$ なので射は定義できます。$[a]_{H_L}$ の像が自明である条件は $[a]_{H_M}=[1]_{H_M}$、すなわち $a\in H_M$ です。従って

$$
\ker(K^\times/H_L\to K^\times/H_M)=H_M/H_L.
$$

さらに[中間体への制限](#prop-anf17-restriction-square)によって、この核は $\operatorname{Gal}(L/M)$ に対応します。
<!-- solution-end -->

### A4. 非分岐でノルムが作る指数

$M/K$ を有限局所拡大で剰余次数 $f=3$、$b\in M^\times$ の $v_M(b)=2$ とする。$L/K$ を非分岐四次とするとき、$\operatorname{rec}_{L/K}(N_{M/K}(b))$ を $F_{L/K}$ で表せ。

- Level: A
- ID: ANF17-A4

<!-- solution-start -->
**詳細解答。** [ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)を $M/K$ に適用すると $v_K(N_{M/K}(b))=3\cdot2=6$ です。[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)から Artin 像は $F_{L/K}^6$。$F_{L/K}$ は位数4なので $F^6=F^2$ です。
<!-- solution-end -->

### A5. 有限商への写像が well-defined になる条件

可換群 $G$ の準同型 $\psi:G\to A$ と部分群 $H\subset G$ について、$gH\mapsto\psi(g)$ が $G/H$ 上で定義できる条件を必要十分で示し、Artin 写像に適用せよ。

- Level: A
- ID: ANF17-A5

<!-- solution-start -->
**詳細解答。** 写像が well-defined なら $1H=hH$（$h\in H$）から $\psi(h)=\psi(1)=1$ なので $H\subset\ker\psi$ です。逆にこの包含があれば $gH=g'H$ は $g'^{-1}g\in H$ を意味し、$\psi(g)=\psi(g')$ です。よって必要十分です。$\psi=\operatorname{rec}_{L/K}$、$H=N_{L/K}(L^\times)$ とすると、[相互法則](#thm-anf17-local-reciprocity)より $H=\ker\psi$、従って商の写像が定義できます。
<!-- solution-end -->

### B1. 制限で位数4を位数2に落とす

$K=\mathbb Q_5$、$L=K(\sqrt[4]5)$、$M=K(\sqrt5)$ とする。$K^\times/H_L$ の $[2]$ の位数と、$M$ への制限の核を求めよ。

- Level: B
- ID: ANF17-B1

<!-- solution-start -->
**詳細解答。** [緩分岐 Kummer ノルム計算](../ANF16/index.md#prop-anf16-tame-kummer-norm)から

$$
H_L=\langle-5\rangle(1+5\mathbb Z_5)
$$

です。$2\bmod5$ は位数4なので、$[2]$ も商群で位数4です。

$H_M$ の単数の剰余は平方集合 $\{1,4\}$ です。$[2]$ は $H_M$ に入らず、$[2]^2=[4]$ は入ります。従って[制限の核](#prop-anf17-restriction-square)は

$$
\{[1],[2]^2\}
$$

で、位数2です。Galois 側でも $M$ を固定する群は $\operatorname{Gal}(L/M)$ で、位数は $[L:M]=2$ です。
<!-- solution-end -->

### B2. 合成体で Frobenius の指数を追う

$L/K$ を非分岐六次、$M/K$ を剰余次数2の有限局所拡大、$b=\pi_M^5u$（$u\in\mathcal O_M^\times$）とする。$\operatorname{rec}_{LM/M}(b)|_L$ と $\operatorname{rec}_{L/K}(N_{M/K}b)$ を計算せよ。

- Level: B
- ID: ANF17-B2

<!-- solution-start -->
**詳細解答。** $LM/M$ は非分岐で、$F_{LM/M}$ を $L$ に制限すると $F_{L/K}^2$ です。従って[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)から

$$
\operatorname{rec}_{LM/M}(b)|_L=(F_{L/K}^2)^5=F_{L/K}^{10}=F_{L/K}^4.
$$

一方、[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)から $v_K(Nb)=2\cdot5=10$、従って $\operatorname{rec}_{L/K}(Nb)=F_{L/K}^{10}=F_{L/K}^4$。$F_{L/K}$ の位数6で指数を6で割った余りが4なので両辺は一致します。
<!-- solution-end -->

### B3. ノルム群を包含で比較する

有限 Abel Galois 拡大 $L_1/K,L_2/K$ のノルム群をそれぞれ $H_1,H_2$ とする。$H_1\subset H_2$ なら $L_2\subset L_1$ であることを、相互法則と Galois 対応で説明せよ。

- Level: B
- ID: ANF17-B3

<!-- solution-start -->
**詳細解答。** $F=L_1L_2$ は有限 Abel Galois 拡大です。[ノルムの塔での包含](../ANF16/index.md#prop-anf16-norm-tower)から $H_F\subset H_1\cap H_2$ です。

[Artin 商同型](#prop-anf17-artin-quotient)を $F/K$ に適用すると、

$$
K^\times/H_F\cong\operatorname{Gal}(F/K).
$$

ここで[制限の核の記述](#prop-anf17-restriction-square)を $F/L_i$ に適用すると、$H_i/H_F$ は $\operatorname{Gal}(F/L_i)$ に対応します。仮定 $H_1\subset H_2$ から

$$
\operatorname{Gal}(F/L_1)\subset\operatorname{Gal}(F/L_2)
$$

です。有限 Galois 対応では固定体の包含が逆になるので、$L_2\subset L_1$ が従います。
<!-- solution-end -->

### B4. 分岐拡大では付値だけで十分か

$K=\mathbb Q_3$、$L=\mathbb Q_3(\sqrt3)$ とする。$-3$ と $3$ の Artin 像が異なることをノルム群から証明せよ。

- Level: B
- ID: ANF17-B4

<!-- solution-start -->
**詳細解答。** [緩分岐 Kummer ノルム群](../ANF16/index.md#prop-anf16-tame-kummer-norm)によれば

$$
H_L=\langle-3\rangle(1+3\mathbb Z_3).
$$

$\sqrt3$ のノルムは $-3$ だから、$\operatorname{rec}_{L/K}(-3)=1$ です。

一方、$3=(-3)(-1)$ ですが、$-1\bmod3=2$ は平方でありません。従って $-1\notin H_L$、さらに $3\notin H_L$ です。[Artin 核の同値](#prop-anf17-artin-quotient)を使うと

$$
\operatorname{rec}_{L/K}(3)\ne1.
$$

$3$ と $-3$ の付値はともに1ですが、Artin 像は異なります。分岐拡大では単数が障害になるため、[非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)の付値だけによる公式をこの拡大へ流用できません。
<!-- solution-end -->

### C1. 非分岐12次の部分体と基礎体変更を一括検算する

$K/\mathbb Q_p$ を有限拡大、$L/K$ を非分岐12次、$F=F_{L/K}$ とする。$M/K$ は $L$ の非分岐三次部分体、$T/K$ は任意の有限局所拡大で $f(T/K)=2$ とする。

1. $\operatorname{rec}_{L/K}(\pi_K^7u)$（$u\in\mathcal O_K^\times$）と、その $M$ への制限を計算せよ。
2. $H_L$ と $H_M$ を記述し、$H_M/H_L$ の位数と生成元を答えよ。
3. $\pi_T$ を $T$ の一様化元としたとき、$\operatorname{rec}_{LT/T}(\pi_T)|_L$ と $\operatorname{rec}_{L/K}(N_{T/K}\pi_T)$ を計算せよ。
4. 第3問の計算を一般の分岐 $L/K$ にそのまま移せない理由を、失われる仮定と証明の失敗箇所で説明せよ。

- Level: C
- ID: ANF17-C1

<!-- solution-start -->
**詳細解答。**

**第1問。** [非分岐局所相互法則](../ANF15/index.md#thm-anf15-unramified-reciprocity)で単数 $u$ は核なので $\operatorname{rec}_{L/K}(\pi_K^7u)=F^7$ です。$M/K$ は非分岐三次で、$F|_M$ は位数3の算術的 Frobenius です。従って $F^7|_M=(F|_M)^7=(F|_M)^1$（$7\equiv1\pmod3$）です。

**第2問。** [非分岐ノルム群](../ANF15/index.md#prop-anf15-unramified-norm-quotient)より

$$
H_L=\pi_K^{12\mathbb Z}\mathcal O_K^\times,\qquad
H_M=\pi_K^{3\mathbb Z}\mathcal O_K^\times.
$$

したがって $H_M/H_L$ は $[\pi_K^3]$ で生成され、$\pi_K^3$ の4乗が $\pi_K^{12}$ に等しくなるので位数4です。[中間体への制限](#prop-anf17-restriction-square)によってこれが $\operatorname{Gal}(L/M)$ に対応し、$[L:M]=12/3=4$ とも一致します。

**第3問。** $LT/T$ は非分岐です。$|k_T|=q^2$ なので、その Frobenius の $L$ への制限は $F^2$。$\pi_T$ は $v_T(\pi_T)=1$ ですから左辺は $F^2$ です。他方、[ノルムの付値と整数環の跡](../ANF12/index.md#prop-anf12-norm-valuation)に $f(T/K)=2$ を代入すると

$$
v_K(N_{T/K}\pi_T)=2\,v_T(\pi_T)=2,
\quad
\operatorname{rec}_{L/K}(N_{T/K}\pi_T)=F^2.
$$

**第4問。** 非分岐性がなくなると $LT/T$ の相互法則を単に付値から決めることができず、$F_{LT/T}$ による記述も使えません。単数が核であるという証明の機構も壊れ、例えば[分岐二次のノルム障害](../ANF16/index.md#prop-anf16-tame-kummer-norm)は同じ付値の $3$ と $-3$ に異なる Artin 像を与えます。一般の分岐への拡張には[ノルム・制限の関手性](#thm-anf17-basechange)という追加定理が必要です。
<!-- solution-end -->

この講の計算法は、**拡大を固定してノルム商を見るときは核**、**中間体へ移るときは制限**、**基礎体を移すときはノルム**、という三つの矢印を取り違えないことです。次講 ANF18 では、これを具体的な局所円分拡大へ適用します。
