# AQFT31 非忠実状態・支持射影・無限値

[AQFT29の相対Tomita作用素](../AQFT29/index.md#def-aqft29-relative-tomita)と[AQFT30の有限次元還元](../AQFT30/index.md#thm-aqft30-finite-reduction)は、入力・出力の状態がともに忠実である場合から始めました。しかし純粋状態の密度行列には零固有値があります。そのとき「逆行列がないから定義できない」と結論してしまうと、純粋状態と混合状態の情報的な隔たりを比較できません。

本講では、まず**状態が実際に重みを置く部分空間**を射影で指定し、相対Tomita作用素の定義を修正します。有限次元では、比較相手がその部分空間をすべて含むことが有限値の必要十分条件です。一方、一般のvon Neumann環では支持が含まれても対数積分が発散し得るため、その違いも直接例で確かめます。有限行列の証明と、一般のvon Neumann環で使う標準形の結果の証明範囲を混同しません。対数はすべて自然対数です。

## 1. 状態が見ている部分：支持射影

[密度行列と忠実性](../AQFT20/index.md#def-aqft20-faithful-density)によれば、有限次元では正半定値でトレース1の行列が密度行列で、忠実性は零固有値がないことです。非忠実でも、非零固有値に対応する部分空間は残ります。その部分を切り出す直交射影を使います。

一般の単位的von Neumann環 $\mathcal M$ で「射影」とは $p=p^*=p^2$ を満たす元です。[VN5で導入した正規状態](../../VN/VN5/index.md#def-vn5-normal-state) $\omega$ について、$\omega(1-p)=0$ となる射影のうち最小のものが存在します。これを $s(\omega)$ と記します。有限行列で最初に計算し、一般環での存在はその後に確認します。

<a id="def-aqft31-support"></a>

<!-- formal-statement-start -->
> **定義（正規状態の支持射影）**  
> 単位的von Neumann環 $\mathcal M$ 上の正規状態 $\omega$ の**支持射影** $s(\omega)\in\mathcal M$ は、$\omega(1-s(\omega))=0$ を満たす最小の射影である。状態が**忠実**とは、任意の正元 $a\in\mathcal M$ に対し $\omega(a)=0$ なら $a=0$ であることをいう。正規状態では
>
$$
\omega\text{ が忠実}\quad\Longleftrightarrow\quad s(\omega)=1.
$$
>
> 有限次元で $\omega(A)=\operatorname{Tr}(\rho A)$、$\rho=\sum_j r_j|v_j\rangle\langle v_j|$（$r_j\ge0$, $\sum_jr_j=1$）なら、
>
$$
s(\rho)=\sum_{j:r_j>0}|v_j\rangle\langle v_j|.
$$
<!-- formal-statement-end -->

定義の「最小」を行列で判定する理由を先に確認します。有限次元の密度行列を固有基底で
$\rho=\sum_{j:r_j>0}r_j|v_j\rangle\langle v_j|$ と書き、任意の直交射影 $q$ を取ります。
$1-q$ も直交射影なので $\langle v_j,(1-q)v_j\rangle=\|(1-q)v_j\|^2$ です。従って

$$
\operatorname{Tr}\rho(1-q)
=\sum_{j:r_j>0}r_j\|(1-q)v_j\|^2.
$$

右辺は非負項の和です。ゆえに $\operatorname{Tr}\rho(1-q)=0$ となるのは、
すべての $r_j>0$ に対して $qv_j=v_j$ となるとき、かつそのときに限ります。
つまり、そのような $q$ は $\rho$ の正固有空間全体を含み、
$s(\rho)=\sum_{j:r_j>0}|v_j\rangle\langle v_j|$ が条件を満たす**最小**の射影です。

<!-- definition-example-start: def-aqft31-support -->
### 直接例：零固有値を含む三準位状態

$\rho=\operatorname{diag}(2/3,1/3,0)$ は正半定値でトレース1です。$\rho$ の像は $\operatorname{span}\{e_1,e_2\}$ なので、固有基底での支持射影は

$$
p=s(\rho)=\operatorname{diag}(1,1,0).
$$

$p^2=p=p^*$ であり、$\operatorname{Tr}\rho(1-p)=0$ です。さらに任意の射影 $q$ が
$\operatorname{Tr}\rho(1-q)=0$ を満たすなら、上の固有基底による判定から

$$
0=\frac23\|(1-q)e_1\|^2+\frac13\|(1-q)e_2\|^2
\quad\Longrightarrow\quad qe_1=e_1,\ qe_2=e_2.
$$

従って $q\ge p$ です。$p$ より小さい射影だけでなく、$p$ と比較不能な射影も含めて
最小性を確認しました。$p\ne I_3$ だから、この状態は忠実ではありません。

**定義の確認**：射影の自己共役性・冪等性、状態が補空間に重みを置かないこと、最小性、忠実性の不成立を個別に判定しました。
<!-- definition-example-end -->

この判定は対角行列に限りません。任意の有限次元密度行列の正規直交固有基底で同じ式が成り立つため、基底の選び方によらず支持射影を特定できます。

一般の正規状態についても、支持射影の存在を確かめます。$\omega(p)=0$ を満たす射影の族の上限を $e$ とします。有限個の零射影の上限も零射影になることが鍵です。

実際、正値汎関数のCauchy–Schwarz不等式は、
$\langle X,Y\rangle_\omega=\omega(X^*Y)$ に
[内積のCauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)
を適用して得られます（零長さの元があっても商空間で適用できます）。
射影 $p$ が $\omega(p)=0$ を満たすなら、

$$
\begin{aligned}
|\omega(pA)|^2&\le\omega(p)\omega(A^*A)=0,\\
|\omega(Ap)|^2&\le\omega(AA^*)\omega(p)=0
\qquad(A\in\mathcal M).
\end{aligned}
$$

有限個のこのような射影 $p_1,\ldots,p_k$ に対し、
$a=p_1+\cdots+p_k$ と置くと $\omega(a)=0$ です。

$a$ の正のスペクトル射影 $e_n=1_{[1/n,\infty)}(a)$ は
$0\le e_n\le na$ を満たすので、$0\le\omega(e_n)\le n\omega(a)=0$ です。
$e_n$ は $n\to\infty$ で $a$ の像への射影、すなわち
$p_1\vee\cdots\vee p_k$ に強収束します。$\omega$ の正規性より
$\omega(p_1\vee\cdots\vee p_k)=0$ です。

さらに有限部分族の上限を増加させた射影ネットにも正規性を適用すると
$\omega(e)=0$ となります。従って $e$ は零射影の最大元で、
$s(\omega)=1-e$ が条件を満たす最小射影です。

忠実性との関係も確認します。$\omega$ が忠実なら零射影は0だけなので
$s(\omega)=1$ です。逆に $s(\omega)=1$ で、正元 $a$ が
$\omega(a)=0$ を満たすなら、各 $n\ge1$ に対して

$$
0\le 1_{[1/n,\infty)}(a)\le na,\qquad
\omega(1_{[1/n,\infty)}(a))=0.
$$

$s(\omega)=1$ のもとでは零射影は0だけです。
従ってすべての正のスペクトル射影が0で、$a=0$ です。

## 2. 支持の包含は何を意味するか

比較する状態を $\rho$（入力）と $\sigma$（比較相手）とします。$s(\rho)\le s(\sigma)$ は、$\rho$ が重みを置く方向を $\sigma$ がすべて見ているという条件です。**射影の順序** $p\le q$ は $pq=qp=p$ を意味し、対角成分ごとの大小や密度行列 $\rho\le\sigma$ とは異なります。

<a id="prop-aqft31-support-criterion"></a>

<!-- formal-statement-start -->
> **命題（有限次元における支持包含の判定）**  
> $\rho,\sigma\in M_n(\mathbb C)$ を密度行列とし、$q=s(\sigma)$ とする。次の条件は同値である。
>
> **（i）** $s(\rho)\le q$。
>
> **（ii）** $\operatorname{Tr}\rho(1-q)=0$。
>
> **（iii）** $\rho$ の正固有値に対応するすべての固有ベクトル $v_j$ は $\sigma$ の像に入る。
<!-- formal-statement-end -->

### 証明の見取り図

「$\rho$ が見ていない方向」は、非負の二次形式の和で判定できます。和が零になるとき各正の重みを持つ固有ベクトルがどこに属するかを調べます。

<!-- proof-start -->
### 証明

$\rho=\sum_{j:r_j>0}r_j|v_j\rangle\langle v_j|$ とします。$1-q$ は直交射影なので

$$
\operatorname{Tr}\rho(1-q)
=\sum_{j:r_j>0}r_j\langle v_j,(1-q)v_j\rangle
=\sum_{j:r_j>0}r_j\|(1-q)v_j\|^2.
$$

（i）なら $qv_j=v_j$ がすべての $r_j>0$ に成立するから（ii）です。（ii）なら非負の各項が零であり、$r_j>0$ より $(1-q)v_j=0$、すなわち（iii）です。（iii）なら $q$ は $s(\rho)$ の像の全ベクトルを固定するので、直交射影の包含関係（i）が従います。
<!-- proof-end -->

例えば $\rho=|e_1\rangle\langle e_1|$、$\sigma=I_2/2$ なら $s(\rho)\le s(\sigma)=I_2$ です。一方 $\sigma=|e_2\rangle\langle e_2|$ と替えると $\operatorname{Tr}\rho(1-s(\sigma))=1$ になり、包含は破れます。**$\rho$ が非忠実であること自体は、相対エントロピーを無限にしません。**

## 3. 非忠実な入力では相対Tomita作用素を修正する

[AQFT29の忠実状態の定義](../AQFT29/index.md#def-aqft29-relative-tomita)にある $A\xi_\rho\mapsto A^*\xi_\sigma$ は、入力が分離的でなくなると一価とは限りません。有限行列で $\rho=\sigma=|e_1\rangle\langle e_1|$、$A=|e_1\rangle\langle e_2|$ とすると

$$
A\rho^{1/2}=0,\qquad A^*\sigma^{1/2}=|e_2\rangle\langle e_1|\ne0.
$$

**同じ零入力に非零の出力が付く**ため、このままでは作用素ですらありません。
以後 $\mathbb C^2$ の標準基底を $e_1,e_2$ とし、
$E_{ij}=|e_i\rangle\langle e_j|$ を行列単位と書きます。
例えば $E_{ij}E_{k\ell}=\delta_{jk}E_{i\ell}$ です。

一般の標準形 $(\mathcal M,\mathcal H,J,\mathcal P)$ の自然正錐 $\mathcal P$ で、状態 $\rho,\sigma$ を単位ベクトル $\xi_\rho,\xi_\sigma$ で表します。

ここで自然正錐は既習の[AQFT30での状態代表](../AQFT30/index.md#def-aqft30-araki-relative-entropy)と同じ設定です。

ベクトル状態の $\mathcal M$ に関する支持を $p=s_{\mathcal M}(\xi_\rho)=s(\rho)$、可換子 $\mathcal M'$ に関する支持を $q=s_{\mathcal M'}(\xi_\rho)$ と記します。具体的には

$$
p\mathcal H=\overline{\mathcal M'\xi_\rho},
\qquad
q\mathcal H=\overline{\mathcal M\xi_\rho}.
$$

この射影表示は単なる記号の置換ではありません。
$P$ を $\overline{\mathcal M'\xi_\rho}$ への直交射影とすると、
この閉部分空間は $\mathcal M'$ とその随伴で不変なので $P\in\mathcal M$ です。
$P\xi_\rho=\xi_\rho$ より $\rho(1-P)=\|(1-P)\xi_\rho\|^2=0$ です。

逆に $e\in\mathcal M$ が $\rho(1-e)=0$ を満たすなら
$e\xi_\rho=\xi_\rho$ であり、任意の $B\in\mathcal M'$ に対して
$eB\xi_\rho=Be\xi_\rho=B\xi_\rho$ です。

ゆえに $e\ge P$、すなわち[支持射影の最小性](#def-aqft31-support)から $P=p$ です。
同様の議論を $\mathcal M'$ に適用すると、もう一方の射影は $q$ となります。

$p\in\mathcal M$、$q\in\mathcal M'$ であるため両者は可換ですが、一般に同じ射影ではありません。
$\mathcal M\xi_\rho$ は $q\mathcal H$ に稠密であり、その直交補空間を定義域に足して全 $\mathcal H$ 上で稠密にします。

反線形作用素の随伴は、[AQFT29の相対モジュラー作用素の定義](../AQFT29/index.md#def-aqft29-relative-modular)
と同じく $S^\sharp$ と書きます。これは反線形作用素に対する随伴であり、
以下の $S^\sharp S$ は線形な非負作用素です。

<a id="def-aqft31-relative-tomita-supported"></a>

<!-- formal-statement-start -->
> **定義（支持付き相対Tomita作用素）**  
> 単位的von Neumann環 $\mathcal M$ の標準形上の二つの正規状態 $\rho,\sigma$ と自然正錐代表 $\xi_\rho,\xi_\sigma$ を取る。$p=s_{\mathcal M}(\xi_\rho)$、$q=s_{\mathcal M'}(\xi_\rho)$ とする。反線形作用素 $S_{\sigma\mid\rho,0}$ を稠密な定義域
>
$$
D_0=\mathcal M\xi_\rho\oplus(1-q)\mathcal H
$$
>
> 上で次により定める。
>
$$
S_{\sigma\mid\rho,0}(A\xi_\rho+\zeta)
=pA^*\xi_\sigma
\quad(A\in\mathcal M,\ \zeta\in(1-q)\mathcal H).
$$
>
> この作用素の閉包を $S_{\sigma\mid\rho}$ とし、**支持付き相対モジュラー作用素**を非負自己共役作用素
>
$$
\Delta_{\sigma\mid\rho}=S_{\sigma\mid\rho}^\sharp S_{\sigma\mid\rho}
$$
>
> と定める。添字の入力側は $\rho$、出力側は $\sigma$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft31-relative-tomita-supported -->
### 直接例：零入力の矛盾を支持射影が消す

上の二準位の純粋状態では、Hilbert–Schmidt空間に左から作用する環が
$\mathcal M=L_{M_2(\mathbb C)}$、可換子が右乗算環です。
ここで $L_A(Y)=AY$、$R_B(Y)=YB$（$A,B,Y\in M_2(\mathbb C)$）は
それぞれ行列空間上の左・右乗算作用素です。
このため状態の二つの支持は
$p=L_{E_{11}}$、$q=R_{E_{11}}$ となり、任意の行列 $Y$ に
$pY=E_{11}Y$、$qY=YE_{11}$ と作用します。
これらは**行列そのものの同一の支持射影ではなく、行列空間に作用する別の射影**です。
零入力を作る $A=|e_1\rangle\langle e_2|$ に対して

$$
pA^*\sigma^{1/2}
=|e_1\rangle\langle e_1|\,|e_2\rangle\langle e_1|=0.
$$

これにより異なる $A$ の零表示が同じ出力0になります。$D_0$ は行列の第1列と第2列の直和で全Hilbert–Schmidt空間です。後で示す通り、$\Delta_{\rho\mid\rho}$ は $E_{11}$ 上で1、それ以外で0です。零固有値があることと、入力ベクトル $E_{11}$ にその零固有値の重みがあることは別です。

**定義の確認**：任意の行列 $Y=(Y_{ij})$ について、
$qY=YE_{11}$ は第1列、$(1-q)Y=YE_{22}$ は第2列です。
従って $Y=A E_{11}+\zeta$（$A E_{11}=YE_{11}$、$\zeta=YE_{22}$）と
定義域の形に一意に分解でき、出力は

$$
pA^*E_{11}=E_{11}A^*E_{11}
=\overline{A_{11}}E_{11}=\overline{Y_{11}}E_{11}.
$$

よって $S(Y)=\overline{Y_{11}}E_{11}$ です。定義域は行列空間全体で稠密、
写像は反線形かつ有界であり、零入力の一価性もこの中間式で確認できます。
<!-- definition-example-end -->

<a id="prop-aqft31-supported-closable"></a>

<!-- formal-statement-start -->
> **命題（修正作用素の一価性・稠密性・可閉性）**  
> [支持付き相対Tomita作用素](#def-aqft31-relative-tomita-supported)の仮定の下で、$S_{\sigma\mid\rho,0}$ は一価に定まり、反線形・稠密定義・可閉である。従ってその閉包から $\Delta_{\sigma\mid\rho}$ が構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

零入力から $Ap=0$ が従うことを、可換子の巡回部分空間で確認します。可閉性は[AQFT29の零列判定](../AQFT29/index.md#prop-aqft29-closable)と同じ発想ですが、今回は出力を $p\mathcal H$ に射影してから判定します。

<!-- proof-start -->
### 証明

$A\xi_\rho=0$ なら、任意の $B\in\mathcal M'$ について $AB\xi_\rho=BA\xi_\rho=0$ です。$\overline{\mathcal M'\xi_\rho}=p\mathcal H$ より $Ap=0$、従って $pA^*=0$ です。$A\xi_\rho$ の二つの表示の差が零なら出力差も零です。さらに $\mathcal M\xi_\rho\subset q\mathcal H$ と $\zeta\in(1-q)\mathcal H$ は直交するため、分解自体も一意です。随伴操作の共役線形性と $p$ の線形性から反線形性が従います。

$D_0$ が稠密であるのは $\overline{\mathcal M\xi_\rho}=q\mathcal H$ にその直交補空間を足したからです。可閉性には $y_n=A_n\xi_\rho+\zeta_n\to0$、$S_0y_n=pA_n^*\xi_\sigma\to w$ と仮定します。$q y_n=A_n\xi_\rho\to0$ であり、$w\in p\mathcal H$ です。任意の $B\in\mathcal M'$ に対して、$pB\xi_\rho=B\xi_\rho$ と $A_nB=BA_n$ から

$$
\begin{aligned}
\langle w,B\xi_\rho\rangle
&=\lim_n\langle pA_n^*\xi_\sigma,B\xi_\rho\rangle\\
&=\lim_n\langle \xi_\sigma,A_nB\xi_\rho\rangle\\
&=\lim_n\langle B^*\xi_\sigma,A_n\xi_\rho\rangle=0.
\end{aligned}
$$

$\mathcal M'\xi_\rho$ は $p\mathcal H$ に稠密なので $w=0$ です。従って零列判定より可閉です。稠密定義で閉じた反線形作用素 $S$ の $S^\sharp S$ が非負自己共役となる点は、[AQFT29の相対モジュラー作用素の構成](../AQFT29/index.md#def-aqft29-relative-modular)と同じです。
<!-- proof-end -->

## 4. 有限行列では疑似逆が現れる

有限次元の正半定値行列では、零固有値に通常の逆数を与えられません。そこで正固有値の方向だけに逆数を与え、零空間上では0にする演算を定義します。これは有限次元のスペクトル分解に基づくもので、もとの行列の逆行列とは区別します。

<a id="def-aqft31-pseudoinverse"></a>

<!-- formal-statement-start -->
> **定義（正半定値行列のMoore–Penrose疑似逆）**  
> $n\ge1$ とし、正半定値行列 $\rho\in M_n(\mathbb C)$ の固有分解を $\rho=\sum_jr_j|v_j\rangle\langle v_j|$（$r_j\ge0$）とする。**Moore–Penrose疑似逆**を次の行列で定義する。

$$
\rho^+=\sum_{j:r_j>0}r_j^{-1}|v_j\rangle\langle v_j|.
$$

> このとき $\rho^+\rho=\rho\rho^+=s(\rho)$ が成り立つ。特に $\rho$ が忠実な場合は $\rho^+=\rho^{-1}$ である。
<!-- formal-statement-end -->

式を固有ベクトル $v_j$ に作用させると、$r_j>0$ では $\rho^+\rho v_j=v_j$、$r_j=0$ では $\rho^+\rho v_j=0$ です。[支持射影の定義](#def-aqft31-support)が選ぶ方向と一致するため $\rho^+\rho=s(\rho)$、同様に $\rho\rho^+=s(\rho)$ が従います。

<!-- definition-example-start: def-aqft31-pseudoinverse -->
### 直接例：三準位の零固有値を除いた逆数

$\rho=\operatorname{diag}(2/3,1/3,0)$ は非負で、標準基底が固有基底です。定義に従い正固有値のみ逆数にすると

$$
\rho^+=\operatorname{diag}(3/2,3,0),
\qquad
\rho^+\rho=\rho\rho^+=\operatorname{diag}(1,1,0).
$$

最後の行列は[第1節で求めた支持射影](#def-aqft31-support)です。$\rho^+$ は零固有値方向を0へ写し、非零固有値の二つの方向をそれぞれ $3/2,3$ 倍します。

**定義の確認**：固有値の非負性、正固有値のみの逆数、零空間での消滅、両側からの積が支持射影になることを具体的に確認しました。
<!-- definition-example-end -->

この疑似逆から、[AQFT29の忠実な左右乗算公式](../AQFT29/index.md#thm-aqft29-matrix-formulas)に対応する非忠実版を直接計算します。

<a id="thm-aqft31-finite-modular"></a>

<!-- formal-statement-start -->
> **定理（非忠実有限行列の相対モジュラー作用素）**  
> $\rho,\sigma\in M_n(\mathbb C)$ を正半定値・トレース1の密度行列とし、Hilbert–Schmidt空間上で左乗算 $L_A(X)=AX$、右乗算 $R_B(X)=XB$ を使う。入力状態の支持 $p=s(\rho)$ と疑似逆 $\rho^+$ に対して
>
$$
\Delta_{\sigma\mid\rho}=L_\sigma R_{\rho^+}
$$
>
> が成立する。$\rho v_j=r_jv_j$、$\sigma u_i=s_iu_i$ とした混合基底 $F_{ij}=|u_i\rangle\langle v_j|$ では
>
$$
\Delta_{\sigma\mid\rho}F_{ij}
=\begin{cases}
(s_i/r_j)F_{ij}&r_j>0,\\
0&r_j=0.
\end{cases}
$$
>
> 入力ベクトル $\xi_\rho=\rho^{1/2}$ に関するスペクトル測度 $\mu_\rho$ の零固有値の重みは
>
$$
\mu_\rho(\{0\})
=\operatorname{Tr}\rho\bigl(1-s(\sigma)\bigr).
$$
<!-- formal-statement-end -->

### 証明の見取り図

入力ベクトルは右から $p$ を掛けた行列空間に属します。まずこの部分空間で $S_0$ のノルム二乗を計算し、$\Delta=S^\sharp S$ の二次形式と比較します。次に[AQFT30の混合固有基底](../AQFT30/index.md#lem-aqft30-mixed-spectrum)の考え方を零固有値まで拡げます。

<!-- proof-start -->
### 証明

$\xi_\rho=\rho^{1/2}$ であり、$\overline{\mathcal M\xi_\rho}$ は $H_p=\{Y\in M_n(\mathbb C):Y=Yp\}$ です。任意の $Y\in H_p$ は $Y=X\rho^{1/2}$ と書け、例えば $X=Y(\rho^+)^{1/2}$ と選べます。定義から

$$
S_0(Y)=pX^*\sigma^{1/2},\qquad
\|S_0Y\|_2^2=\operatorname{Tr}(\sigma XpX^*).
$$

$Xp=Y(\rho^+)^{1/2}$ を代入して巡回性を使うと

$$
\|S_0Y\|_2^2
=\operatorname{Tr}\bigl(Y^*\sigma Y\rho^+\bigr)
=\langle Y,L_\sigma R_{\rho^+}Y\rangle_2.
$$

$H_p$ の直交補 $H_{1-p}$ では $S_0=0$、かつ $R_{\rho^+}=0$ です。有限次元では二次形式の一致が自己共役作用素の一致を与えるので、全空間で $\Delta=L_\sigma R_{\rho^+}$ です。

$F_{ij}$ は[AQFT30の証明](../AQFT30/index.md#lem-aqft30-mixed-spectrum)と同様に $n^2$ 個の正規直交基底です。左からは $s_i$ 倍、右からは $r_j>0$ なら $r_j^{-1}$ 倍、$r_j=0$ なら0倍されるので固有値の式が従います。入力ベクトルの展開係数は、$r_j>0$ で

$$
|\langle F_{ij},\rho^{1/2}\rangle_2|^2
=r_j|\langle u_i,v_j\rangle|^2
$$

であり、$r_j=0$ では0です。従って零固有値に関する総重みは、$s_i=0$ の固有ベクトルについて和を取り、

$$
\begin{aligned}
\mu_\rho(\{0\})
&=\sum_{j:r_j>0}\sum_{i:s_i=0}
r_j|\langle u_i,v_j\rangle|^2\\
&=\sum_j r_j\langle v_j,(1-s(\sigma))v_j\rangle\\
&=\operatorname{Tr}\rho(1-s(\sigma)).
\end{aligned}
$$

ここで $r_j=0$ の方向は零重みなので、作用素の核のすべてが発散へ寄与するわけではありません。
<!-- proof-end -->

## 5. 対数の零固有値を「捨てない」定義

正作用素の対数は正のスペクトル上で計算できますが、固有値0そのものには $\log0$ を有限数として定義できません。測度 $\mu_\rho$ が0に質量を持つ場合を、$-\log\varepsilon\to+\infty$ という極限で検出します。

一般の非忠実正規状態に関する標準的事実として、**核射影の同定**

$$
E_{\Delta_{\sigma\mid\rho}}(\{0\})
=1-s_{\mathcal M}(\xi_\sigma)\,s_{\mathcal M'}(\xi_\rho)
$$

があります。二つの射影はそれぞれ $\mathcal M$ と $\mathcal M'$ に属し可換です。この一般恒等式はAraki, *Relative Entropy for States of von Neumann Algebras II* (1977), §2, Theorem 2.4 の結果です。本講では[第3節の可閉性](#prop-aqft31-supported-closable)と[第4節の有限次元での核の全計算](#thm-aqft31-finite-modular)を証明しましたが、**一般恒等式の証明に必要な標準形上の $2\times2$ 行列還元は引用結果**とします。これをAQFT29で証明済みだとは扱いません。

$\xi_\rho$ は $s_{\mathcal M'}(\xi_\rho)\xi_\rho=\xi_\rho$ を満たすので、この核公式から

$$
\mu_\rho(\{0\})
=\|(1-s(\sigma))\xi_\rho\|^2
=\rho(1-s(\sigma)).
$$

従って $s(\rho)\le s(\sigma)$ と、入力が零固有値に重みを持たないことが同値です。最後の同値性は、[支持射影の定義](#def-aqft31-support)を使い、$\rho(1-s(\sigma))=0$ なら支持の最小性から $s(\rho)\le s(\sigma)$ として確認できます。

<a id="def-aqft31-relative-entropy-extended"></a>

<!-- formal-statement-start -->
> **定義（非忠実正規状態へのAraki相対エントロピーの拡張）**  
> 単位的von Neumann環 $\mathcal M$ の標準形上の正規状態 $\rho,\sigma$ に、[支持付き相対モジュラー作用素](#def-aqft31-relative-tomita-supported) $\Delta_{\sigma\mid\rho}$ を対応させる。$\xi_\rho$ に関するスペクトル測度を $\mu_\rho$ とする。$\rho$ の支持が $\sigma$ の支持に含まれる場合は
>
$$
S_{\mathrm A}(\rho\Vert\sigma)
=-\int_{(0,\infty)}\log\lambda\,d\mu_\rho(\lambda)
\quad\text{if }s(\rho)\le s(\sigma).
$$
>
> 支持が含まれない場合は $S_{\mathrm A}(\rho\Vert\sigma)=+\infty$ と定める。有限な負の値や $-\infty$ を許す定義ではない。積分は拡張実数として解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft31-relative-entropy-extended -->
### 直接例：非忠実でも有限、比較相手を替えると無限

$\rho=\operatorname{diag}(1,0)$ とします。$\sigma=I_2/2$ の場合、$s(\rho)\le s(\sigma)=I_2$ で、[有限行列の定理](#thm-aqft31-finite-modular)により $\xi_\rho=E_{11}$ のスペクトル重みは固有値 $1/2$ に1だけあります。従って

$$
S_{\mathrm A}(\rho\Vert I_2/2)=-\log(1/2)=\log2.
$$

反対に $\sigma=\operatorname{diag}(0,1)$ なら支持が直交し、$\mu_\rho(\{0\})=1$ です。比較相手の零方向を取り除いて対数平均を0と置くのではなく、値は $+\infty$ です。$\rho=\sigma=\operatorname{diag}(1,0)$ なら、$\Delta$ 自体は零固有値を持ちますが $\xi_\rho$ には零重みがなく、正固有値1への重みが1なので値は0です。**定義の確認**：支持の包含、入力の零固有値重み、対数の正固有値部分の積分をそれぞれ計算し、有限値・無限値・一致時の零値を区別しました。
<!-- definition-example-end -->

### 補足例：支持が一致しても無限になる可換無限系

ここまでの「支持が含まれれば有限」という結論は**有限次元に限られます**。可換な無限次元von Neumann環 $\ell^\infty(\mathbb N)$ で、正規状態を確率列 $(p_n)$、$(q_n)$ によって定めます。正規化定数を

$$
C=\left(\sum_{n=1}^{\infty}\frac1{n^2}\right)^{-1},
\qquad
D=\left(\sum_{n=1}^{\infty}\frac{e^{-n}}{n^2}\right)^{-1}
$$

と置きます。両級数は正で有限だから $C,D>0$ であり、

$$
p_n=\frac{C}{n^2},\qquad
q_n=\frac{De^{-n}}{n^2}
\quad(n=1,2,\ldots)
$$

は全成分が正で、和がそれぞれ1です。従って**両状態とも忠実**で、その支持射影は恒等射影です。それでも各座標の相対作用素の固有値は $q_n/p_n=(D/C)e^{-n}$ なので、

$$
\begin{aligned}
S_{\mathrm A}(p\Vert q)
&=\sum_{n=1}^{\infty}p_n\log\frac{p_n}{q_n}\\
&=\sum_{n=1}^{\infty}\frac{C}{n^2}
\left(n+\log\frac CD\right)\\
&=C\sum_{n=1}^{\infty}\frac1n+\log\frac CD
=+\infty.
\end{aligned}
$$

ここでは零固有値への重みはありません。無限値の原因は、**正固有値が0へ近づくときの対数の負の部分が積分可能でない**ことです。従って一般環での支持包含は、零点の質量を排除する条件であって、有限性を保証しません。

定義が $-\infty$ を作らないことも確かめます。$\xi_\rho$ は $S_0$ の定義域に入り、$S_0(\xi_\rho)=s(\rho)\xi_\sigma$ です。よってスペクトル定理と $\Delta=S^\sharp S$ より

$$
\int_{[0,\infty)}\lambda\,d\mu_\rho(\lambda)
=\|S\xi_\rho\|^2
=\|s(\rho)\xi_\sigma\|^2
=\sigma(s(\rho))\le1.
$$

$\log\lambda\le\lambda$（$\lambda>0$）であるため、対数の正の部分の積分は有限です。
負の部分だけが発散し得るので、先頭の負号を含めた値は有限実数または $+\infty$ に限られます。
さらに支持包含がある場合には $\mu_\rho(\{0\})=0$、
$\mu_\rho((0,\infty))=\|\xi_\rho\|^2=1$ です。
各 $\lambda>0$ で $\log\lambda\le\lambda-1$ を積分すれば

$$
S_{\mathrm A}(\rho\Vert\sigma)
\ge 1-\int_{(0,\infty)}\lambda\,d\mu_\rho(\lambda)
=1-\sigma(s(\rho))\ge0.
$$

支持が含まれない場合は定義により $+\infty$ です。
これで値が負にはならないことも確認できました。等号の場合を含む
一般の正値性の詳しい構造はAQFT32で扱います。

さらに作用素の対数を直接適用せず、$\varepsilon\in(0,1]$ に対して零以下の部分を切った関数 $f_\varepsilon(\lambda)=\log(\max\{\lambda,\varepsilon\})$ を用いると

$$
S_{\mathrm A}(\rho\Vert\sigma)
=\lim_{\varepsilon\downarrow0}
\left[-\int_{[0,\infty)}
f_\varepsilon(\lambda)\,d\mu_\rho(\lambda)\right].
$$

これは一般環にも使える**スペクトル切断による極限**です。$-\log(\max\{\lambda,\varepsilon\})$ は、$\varepsilon$ が減ると点ごとに増大します。

さらに $0<\varepsilon\le1$ では $\lambda-\log(\max\{\lambda,\varepsilon\})\ge0$ です。この非負関数列に[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)を適用し、有限な $\int\lambda\,d\mu_\rho$ を最後に引けば、上の極限を得ます。

零の質量があれば $\log\varepsilon$ の寄与が $-\infty$ へ向かい、相対エントロピーは $+\infty$ です。これは**状態そのものを混合して忠実化する極限とは別**の操作です。

## 6. 有限次元の拡張公式と忠実化極限

<a id="thm-aqft31-nonfaithful-reduction"></a>

<!-- formal-statement-start -->
> **定理（非忠実有限次元のトレース公式と発散条件）**  
> $\rho,\sigma\in M_n(\mathbb C)$ を任意の密度行列とする。$\rho$ の正固有値を $r_j$、$\sigma$ の正固有値を $s_i$、対応する固有ベクトルを $v_j,u_i$ とする。$s(\rho)\le s(\sigma)$ なら
>
$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=\sum_{j:r_j>0}r_j\log r_j\\
&\quad-\sum_{j:r_j>0}\sum_{i:s_i>0}
r_j|\langle u_i,v_j\rangle|^2\log s_i.
\end{aligned}
$$
>
> これは $0\log0=0$ とし、$\log\sigma$ をその支持上だけで作用させた $\operatorname{Tr}\rho(\log\rho-\log\sigma)$ の意味である。支持が含まれなければ $S_{\mathrm A}(\rho\Vert\sigma)=+\infty$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

[AQFT30の混合基底とスペクトル重み](../AQFT30/index.md#lem-aqft30-mixed-spectrum)における $r_j>0$ の方向だけを残し、$s_i=0$ の方向への重みが全部消える条件を第2節の支持判定で確認します。その後、正固有値の対数だけを和に戻します。

<!-- proof-start -->
### 証明

[有限行列の相対作用素](#thm-aqft31-finite-modular)の固有値 $s_i/r_j$（$r_j>0$）に対する入力重みは $r_j|\langle u_i,v_j\rangle|^2$ です。支持包含が成り立てば[支持包含の判定](#prop-aqft31-support-criterion)から $s_i=0$ の固有ベクトルはすべての $r_j>0$ の $v_j$ と直交し、その重みは0です。従って

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=-\sum_{j:r_j>0}\sum_{i:s_i>0}
r_j|\langle u_i,v_j\rangle|^2
\log(s_i/r_j)\\
&=-\sum_{j:r_j>0}\sum_{i:s_i>0}
r_j|\langle u_i,v_j\rangle|^2\log s_i\\
&\quad+\sum_{j:r_j>0}r_j\log r_j
\sum_{i:s_i>0}|\langle u_i,v_j\rangle|^2.
\end{aligned}
$$

$s(\rho)\le s(\sigma)$ により、最後の内側の和は $\|s(\sigma)v_j\|^2=1$ です。第1項は $\log\sigma$ の正固有値だけから作る作用素のトレースなので、主張を得ます。支持が含まれない場合は[非忠実有限行列の相対モジュラー作用素](#thm-aqft31-finite-modular)により $\mu_\rho(\{0\})>0$ で、定義通り $+\infty$ です。
<!-- proof-end -->

次に、$\varepsilon>0$ を用いて $\rho_\varepsilon=(1-\varepsilon)\rho+\varepsilon I_n/n$、$\sigma_\varepsilon=(1-\varepsilon)\sigma+\varepsilon I_n/n$ とすると、双方は忠実で[AQFT30の還元定理](../AQFT30/index.md#thm-aqft30-finite-reduction)を適用できます。

<a id="prop-aqft31-depolarizing-limit"></a>

<!-- formal-statement-start -->
> **命題（有限次元における忠実化極限）**  
> 任意の $n$ 次元密度行列 $\rho,\sigma$ について、$0<\varepsilon<1$ とし
>
$$
\rho_\varepsilon=(1-\varepsilon)\rho+\varepsilon I_n/n,\qquad
\sigma_\varepsilon=(1-\varepsilon)\sigma+\varepsilon I_n/n
$$
>
> と置く。このとき
>
$$
\lim_{\varepsilon\downarrow0}
S_{\mathrm A}(\rho_\varepsilon\Vert\sigma_\varepsilon)
=S_{\mathrm A}(\rho\Vert\sigma)
$$
>
> が拡張実数の意味で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

両行列を同時に忠実化すると固有ベクトルは変わらず、固有値だけが $(1-\varepsilon)t+\varepsilon/n$ に替わります。$t>0$ と $t=0$ を分け、零固有値方向の係数が正の極限を持つかを判定します。

<!-- proof-start -->
### 証明

$\rho$ の固有値を $r_j$、$\sigma$ の固有値を $s_i$ とし、互いに異なってよい固有基底 $v_j,u_i$ を選びます。$r_j^\varepsilon=(1-\varepsilon)r_j+\varepsilon/n$、$s_i^\varepsilon=(1-\varepsilon)s_i+\varepsilon/n$ と記せば、[Araki相対エントロピーの忠実有限次元還元](../AQFT30/index.md#thm-aqft30-finite-reduction)より

$$
\begin{aligned}
S_{\mathrm A}(\rho_\varepsilon\Vert\sigma_\varepsilon)
&=\sum_jr_j^\varepsilon\log r_j^\varepsilon\\
&\quad-\sum_i\left(\sum_jr_j^\varepsilon
|\langle u_i,v_j\rangle|^2\right)\log s_i^\varepsilon.
\end{aligned}
$$

第1項は $x\log x\to0$（$x\downarrow0$）により $\sum_{j:r_j>0}r_j\log r_j$ へ収束します。$s_i>0$ の項も $\log s_i^\varepsilon\to\log s_i$ で有限和の極限を取れます。$s_i=0$ の方向の係数を

$$
c_i^\varepsilon
=\langle u_i,\rho_\varepsilon u_i\rangle
=(1-\varepsilon)c_i+\varepsilon/n,\qquad
c_i=\langle u_i,\rho u_i\rangle
$$

と書きます。この場合 $\log s_i^\varepsilon=\log(\varepsilon/n)$ です。[支持包含の判定](#prop-aqft31-support-criterion)より、包含成立時はすべての $s_i=0$ に対して $c_i=0$ だから、係数付き項は $(\varepsilon/n)\log(\varepsilon/n)\to0$ です。ゆえに極限は[非忠実有限次元のトレース公式と発散条件](#thm-aqft31-nonfaithful-reduction)に一致します。

包含不成立時は $\sum_{i:s_i=0}c_i=\operatorname{Tr}\rho(1-s(\sigma))>0$ です。零固有値方向の項は

$$
-\sum_{i:s_i=0}c_i^\varepsilon\log(\varepsilon/n)
=-\bigl((1-\varepsilon)c+\varepsilon d_0/n\bigr)
\log(\varepsilon/n)\longrightarrow+\infty,
$$

ただし $c>0$、$d_0=\dim\ker\sigma$ としました。残る項は有限極限を持つので、全体も $+\infty$ へ発散します。
<!-- proof-end -->

この忠実化極限は**有限次元について完全に証明しました**。一般のvon Neumann環で忠実な正規状態 $\tau$ を用いて両状態を混ぜたとき、同じ極限が得られると無条件に読み替えてはいけません。一般形の支持付き定義と拡張理論はAraki (1977), §§2–3を参照し、ここで証明したのは支持付き作用素の可閉性とスペクトル切断、および有限行列の忠実化極限です。状態の正値性・一般単調性はAQFT32–33へ進む際に別途証明します。

### 非可換な純粋状態の具体計算

$$
\rho=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}.
$$

$\sigma$ の固有値は $3/4,1/4$ で、固有ベクトルは $u_\pm=(e_1\pm e_2)/\sqrt2$ です。$\rho$ の支持は $e_1$ の方向、$\sigma$ は忠実なので支持包含が成立します。非可換性は $[\rho,\sigma]=\begin{pmatrix}0&1/4\\-1/4&0\end{pmatrix}\ne0$ で確認できます。

入力 $\rho^{1/2}=E_{11}$ に関する $\Delta$ の正固有値 $3/4,1/4$ の重みはそれぞれ $1/2$ です。$r_2=0$ に由来する零固有値には入力重みがありません。従って

$$
S_{\mathrm A}(\rho\Vert\sigma)
=-\frac12\log\frac34-\frac12\log\frac14
=\log\frac4{\sqrt3}.
$$

$\rho$ の零固有値へ一律に $-\log0$ を割り当てるのではなく、**入力のスペクトル重み**を調べることが決定的です。

## 7. 演習と詳細解答

### Level A：定義と零方向を分ける

<a id="ex-aqft31-a01"></a>
#### AQFT31-A01 三準位の支持判定
- Level: A

$\rho=\operatorname{diag}(1/2,1/2,0)$、$\sigma=\operatorname{diag}(1/3,1/3,1/3)$、$\tau=\operatorname{diag}(0,1/2,1/2)$ とする。三状態の支持射影と $s(\rho)\le s(\sigma)$、$s(\rho)\le s(\tau)$ の真偽を確かめよ。

<!-- solution-start -->
**詳細解答。** 正固有値に対応する標準基底を拾うと

$$
s(\rho)=\operatorname{diag}(1,1,0),\quad
s(\sigma)=I_3,\quad
s(\tau)=\operatorname{diag}(0,1,1).
$$

各射影について $p=p^*=p^2$、各密度行列のトレース1と正半定値性を確認できます。$s(\sigma)$ は恒等だから $s(\rho)\le s(\sigma)$。一方 $s(\tau)e_1=0$ で $s(\rho)e_1=e_1$ なので $s(\rho)\nleq s(\tau)$ です。[支持判定命題](#prop-aqft31-support-criterion)でも $\operatorname{Tr}\rho(1-s(\tau))=1/2>0$ と再確認できます。
<!-- solution-end -->

<a id="ex-aqft31-a02"></a>
#### AQFT31-A02 純粋状態の零入力
- Level: A

$\rho=\sigma=|e_1\rangle\langle e_1|$ とし、$A=|e_1\rangle\langle e_2|$ とする。未修正の $A\rho^{1/2}\mapsto A^*\sigma^{1/2}$ が失敗する理由と、支持付き写像の値を求めよ。

<!-- solution-start -->
**詳細解答。** 行列単位 $E_{ij}$ を使うと $A=E_{12}$、$\rho^{1/2}=E_{11}$ です。$E_{12}E_{11}=0$ ですが $E_{21}E_{11}=E_{21}\ne0$ です。零入力を $A=0$ で表示すると出力0なので、一価性が破れます。[支持付き定義](#def-aqft31-relative-tomita-supported)では入力支持 $p=E_{11}$ を左から掛け、$E_{11}E_{21}=0$ より出力は0です。二つの零表示が一致しました。
<!-- solution-end -->

<a id="ex-aqft31-a03"></a>
#### AQFT31-A03 相対作用素が特異でも有限
- Level: A

$\rho=\operatorname{diag}(1,0)$、$\sigma=I_2/2$ に対し、$\Delta_{\sigma\mid\rho}$ の $E_{11},E_{21},E_{12},E_{22}$ 上の固有値、入力の重み、相対エントロピーを求めよ。

<!-- solution-start -->
**詳細解答。** $\rho^+=E_{11}$ なので[有限行列定理](#thm-aqft31-finite-modular)から $\Delta(X)=\frac12XE_{11}$。順に固有値は $1/2,1/2,0,0$ です。入力 $\xi_\rho=E_{11}$ の重みは最初の固有方向に1、残りに0です。支持包含があるため定義を適用でき、$-\log(1/2)=\log2$ です。零固有値の存在だけでは無限値になりません。
<!-- solution-end -->

<a id="ex-aqft31-a04"></a>
#### AQFT31-A04 直交支持の無限値
- Level: A

$\rho=\operatorname{diag}(1,0)$、$\sigma=\operatorname{diag}(0,1)$ に対して $\mu_\rho(\{0\})$ を求め、スペクトル切断の式で $+\infty$ を示せ。

<!-- solution-start -->
**詳細解答。** $s(\sigma)=E_{22}$ なので $1-s(\sigma)=E_{11}$、従って[非忠実有限行列の相対モジュラー作用素](#thm-aqft31-finite-modular)で $\mu_\rho(\{0\})=\operatorname{Tr}(E_{11}E_{11})=1$ です。入力のスペクトル測度は零点のみにあるため、

$$
-\int\log(\max\{\lambda,\varepsilon\})\,d\mu_\rho
=-\log\varepsilon\longrightarrow+\infty.
$$

正の固有値への寄与が無いから「和が空で0」と解釈するのは誤りです。
<!-- solution-end -->

### Level B：証明の機構と非可換性

<a id="ex-aqft31-b01"></a>
#### AQFT31-B01 純粋対混合の非可換な相対エントロピー
- Level: B

第6節の $\rho=E_{11}$、$\sigma=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ を用い、支持の包含、交換子、入力のスペクトル重みを自力で求め、相対エントロピーを計算せよ。

<!-- solution-start -->
**詳細解答。** $\sigma$ の固有値は $1/2+1/4=3/4$ と $1/2-1/4=1/4$、どちらも正なので $s(\sigma)=I$。$\rho$ は $e_1$ に支持されるため包含成立です。行列積を取ると $\rho\sigma=\begin{pmatrix}1/2&1/4\\0&0\end{pmatrix}$、$\sigma\rho=\begin{pmatrix}1/2&0\\1/4&0\end{pmatrix}$ なので非可換です。二つの固有ベクトル $u_\pm$ と $e_1$ の内積二乗はそれぞれ $1/2$。[有限行列の定理](#thm-aqft31-finite-modular)では入力重み $1/2,1/2$、固有値 $3/4,1/4$ となるため、

$$
S_{\mathrm A}(\rho\Vert\sigma)
=-\frac12\left(\log\frac34+\log\frac14\right)
=\frac12\log\frac{16}3=\log\frac4{\sqrt3}.
$$
<!-- solution-end -->

<a id="ex-aqft31-b02"></a>
#### AQFT31-B02 非忠実な二状態で有限になる場合
- Level: B

$\rho=\operatorname{diag}(2/3,1/3,0)$、$\sigma=\operatorname{diag}(1/2,1/4,1/4)$ とする。支持の包含を確かめ、非忠実公式で相対エントロピーを求めよ。$\rho$ の零固有値に係る項をどのように扱ったかも説明せよ。

<!-- solution-start -->
**詳細解答。** $s(\rho)=\operatorname{diag}(1,1,0)$、$s(\sigma)=I_3$ ですから包含成立です。共通固有基底では $r_j>0$ の $j=1,2$ だけが入力重みを持つので、[非忠実有限次元のトレース公式と発散条件](#thm-aqft31-nonfaithful-reduction)より

$$
\begin{aligned}
S_{\mathrm A}(\rho\Vert\sigma)
&=\frac23\log\frac{2/3}{1/2}
+\frac13\log\frac{1/3}{1/4}\\
&=\frac23\log\frac43+\frac13\log\frac43
=\log\frac43.
\end{aligned}
$$

第3成分の $r_3=0$ は $0\log0=0$ の連続延長により寄与しません。$\sigma$ はその方向にも正の重みを持ち、支持欠落ではないため発散しません。
<!-- solution-end -->

<a id="ex-aqft31-b03"></a>
#### AQFT31-B03 非忠実な場合の可閉性を再構成する
- Level: B

$\overline{\mathcal M\xi_\rho}=q\mathcal H$、$\overline{\mathcal M'\xi_\rho}=p\mathcal H$ を既知とし、$S_0(A\xi_\rho+\zeta)=pA^*\xi_\sigma$ の零列判定を、自分で証明せよ。$\xi_\sigma$ の分離性が必要かも判定せよ。

<!-- solution-start -->
**詳細解答。** まず $A\xi_\rho=0$ なら $AB\xi_\rho=0$（$B\in\mathcal M'$）なので、稠密性から $Ap=0$、従って $pA^*=0$。これは一価性です。$y_n=A_n\xi_\rho+\zeta_n\to0$、$S_0y_n\to w$ と置きます。$q y_n=A_n\xi_\rho\to0$ で、$w\in p\mathcal H$。任意の $B\in\mathcal M'$ に対して

$$
\langle w,B\xi_\rho\rangle
=\lim_n\langle B^*\xi_\sigma,A_n\xi_\rho\rangle=0.
$$

$p\mathcal H=\overline{\mathcal M'\xi_\rho}$ なので $w=0$ です。[閉包の零列判定](../AQFT29/index.md#prop-aqft29-closable)が適用でき、$S_0$ は可閉です。証明で必要なのは $\xi_\rho$ の支持部分空間と $\xi_\sigma$ がHilbert空間のベクトルであることだけで、$\xi_\sigma$ の分離性は使いません。
<!-- solution-end -->

<a id="ex-aqft31-b04"></a>
#### AQFT31-B04 非可換な支持欠落と発散速度
- Level: B

$\rho=E_{11}$、$\sigma=|+\rangle\langle+|$、$|+\rangle=(e_1+e_2)/\sqrt2$ とする。支持が包含されないことを確かめ、$\rho_\varepsilon=(1-\varepsilon)\rho+\varepsilon I_2/2$、$\sigma_\varepsilon=(1-\varepsilon)\sigma+\varepsilon I_2/2$ について $S_{\mathrm A}(\rho_\varepsilon\Vert\sigma_\varepsilon)$ の主要な発散項を求めよ。

<!-- solution-start -->
**詳細解答。** $|-\rangle=(e_1-e_2)/\sqrt2$ は $\sigma$ の零固有ベクトルで、$|\langle -,e_1\rangle|^2=1/2$ です。[支持判定](#prop-aqft31-support-criterion)により $\operatorname{Tr}\rho(1-s(\sigma))=1/2>0$ なので包含は破れます。忠実化した $\rho_\varepsilon$ の固有値は $1-\varepsilon/2,\varepsilon/2$。$\sigma_\varepsilon$ の固有値も同じですが、固有ベクトルは $|+\rangle,|-\rangle$ です。両固有射影の対角成分は $1/2$ なので

$$
\operatorname{Tr}\rho_\varepsilon\log\sigma_\varepsilon
=\frac12\log(1-\varepsilon/2)+\frac12\log(\varepsilon/2).
$$

一方、

$$
\operatorname{Tr}\rho_\varepsilon\log\rho_\varepsilon
=(1-\varepsilon/2)\log(1-\varepsilon/2)
+(\varepsilon/2)\log(\varepsilon/2)\to0.
$$

よって[AQFT30の忠実還元](../AQFT30/index.md#thm-aqft30-finite-reduction)で差を取り、

$$
S_{\mathrm A}(\rho_\varepsilon\Vert\sigma_\varepsilon)
=-\frac12\log(\varepsilon/2)+o(1)\longrightarrow+\infty.
$$

発散の係数 $1/2$ は $\rho$ が $\sigma$ の零方向へ持つ重みに一致します。
<!-- solution-end -->

### Level C：支持・相対作用素・極限を統合する

<a id="ex-aqft31-c01"></a>
#### AQFT31-C01 順序を交換したとき有限性は保たれるか
- Level: C

$\rho=E_{11}$、$\sigma=I_2/2$ を比較する。$S_{\mathrm A}(\rho\Vert\sigma)$ と $S_{\mathrm A}(\sigma\Vert\rho)$ を支持射影とスペクトル重みから求めよ。また二状態が等しい場合と、比較相手を $|+\rangle\langle+|$ に替えた場合を対照せよ。

<!-- solution-start -->
**詳細解答。** $s(\rho)=E_{11}\le I_2=s(\sigma)$ なので前向きは有限です。[有限行列定理](#thm-aqft31-finite-modular)で入力 $E_{11}$ は相対固有値 $1/2$ に重み1を持つから $\log2$ です。逆向きでは入力支持 $I_2$ が比較相手の $E_{11}$ に含まれず、

$$
\operatorname{Tr}\sigma(1-s(\rho))=\operatorname{Tr}[(I_2/2)E_{22}]=1/2>0,
$$

ゆえに $S_{\mathrm A}(\sigma\Vert\rho)=+\infty$ です。$\rho=\sigma=E_{11}$ の場合は双方の支持が等しく、入力が重みを置く固有値は1だけなので $S_{\mathrm A}(\rho\Vert\rho)=0$。$\sigma=|+\rangle\langle+|$ では二つのランク1支持が一致せず、$|\langle -,e_1\rangle|^2=1/2$ により $S_{\mathrm A}(\rho\Vert\sigma)=+\infty$ です。向きを交換する際は相対作用素の添字と入力ベクトルを**同時に**交換しなければなりません。
<!-- solution-end -->

<a id="ex-aqft31-c02"></a>
#### AQFT31-C02 一般環の切断式と有限次元の忠実化を区別する
- Level: C

支持付き相対作用素のスペクトル測度 $\mu_\rho$ を用い、$\int\lambda\,d\mu_\rho\le1$ を出発点として切断極限が有限値または $+\infty$ へ収束することを示せ。さらに、有限次元の $\rho=E_{11}$、$\sigma=I_2/2$ を使い、（a）スペクトル切断と（b）両密度行列の忠実化が別の手順でありながら同じ極限を与えることを検算せよ。

<!-- solution-start -->
**詳細解答。** [支持付き定義](#def-aqft31-relative-tomita-supported)で $S\xi_\rho=s(\rho)\xi_\sigma$ だから

$$
\int\lambda\,d\mu_\rho=\|S\xi_\rho\|^2=\sigma(s(\rho))\le1.
$$

$g_\varepsilon(\lambda)=\lambda-\log(\max\{\lambda,\varepsilon\})\ge0$ は $\varepsilon\downarrow0$ で単調増大します。[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)により $\int g_\varepsilon\,d\mu_\rho$ は有限または $+\infty$ に収束し、そこから有限の $\int\lambda\,d\mu_\rho$ を引けば切断極限を得ます。

（a）$\rho=E_{11}$、$\sigma=I_2/2$ なら入力のスペクトル測度は $\lambda=1/2$ に1だけあるので、$0<\varepsilon<1/2$ で切断値は常に $\log2$ です。

（b）$\rho_\varepsilon=\operatorname{diag}(1-\varepsilon/2,\varepsilon/2)$、$\sigma_\varepsilon=I_2/2$ とすると、[忠実有限次元還元](../AQFT30/index.md#thm-aqft30-finite-reduction)から

$$
\begin{aligned}
S_{\mathrm A}(\rho_\varepsilon\Vert\sigma_\varepsilon)
&=(1-\varepsilon/2)\log[2(1-\varepsilon/2)]\\
&\quad+(\varepsilon/2)\log\varepsilon.
\end{aligned}
$$

第1項は $\log2$、第2項は0に収束します。したがって両経路の極限は $\log2$ ですが、（a）は**相対作用素のスペクトルを切る**操作、（b）は**状態自体を混合する**操作です。一般環の（b）の極限公式まで、この有限次元検算で証明したことにはなりません。
<!-- solution-end -->

## 8. 次の講義へ

支持射影は、対数の零固有値を「無視する方向」と「無限の隔たりを生む方向」に分けます。[第3節の修正](#def-aqft31-relative-tomita-supported)により非忠実でも相対作用素を作れ、[有限次元の定理](#thm-aqft31-nonfaithful-reduction)と[忠実化極限](#prop-aqft31-depolarizing-limit)がその意味を計算可能にしました。一般環でも相対作用素のスペクトル切断により拡張実数として扱えますが、有限次元のトレース公式をType III環へ持ち込むことはできません。

次のAQFT32では、これらの定義から一般の正値性と、値が0になる条件を証明します。

**文献上の境界**：本講で引用した一般の核射影公式と非忠実正規汎関数の拡張の原典は H. Araki, [*Relative Entropy for States of von Neumann Algebras II*, Publ. RIMS **13** (1977), 173–192](https://doi.org/10.2977/prims/1195190105) です。一般の $2\times2$ 還元の完全証明および任意の状態混合による忠実化極限の一般公式は本講の既証明結果に含めません。
