# IWA9 分岐条件と無分岐最大p拡大

[IWA8の指標別分解](../IWA8/index.md#thm-iwa8-limit-eigenspaces)は、円分塔の類群の $p$ 部分を群環の加群として整理しました。しかし、類群の元はイデアル類であって、数体の拡大の自己同型そのものではありません。両者を結ぶのは[Hilbert類体とArtin同型](../../ANF/ANF22/index.md#thm-anf22-hilbert-class-correspondence)です。

本講の中心問いは、**「どこで分岐してよいか」を指定すると、類群の逆極限はどのGalois群を表すか**、です。「どこでも無分岐」と「$p$ の上でだけ分岐を許す」は異なる条件です。さらに、アーベル拡大と非可換な $p$ 拡大を分けます。

以下、$p$ は奇素数です。第1〜4節では必要に応じて任意の数体 $K$ を扱い、第5節以降では $E_r=\mathbb Q(\zeta_{p^r})$（$r\ge1$）とその合併 $E_\infty$ に戻ります。$E_r$ は全虚数体なので、実素点の複素化の問題はありません。一般の実素点を持つ $K$ では、「実素点も非分岐」（実素点の複素化を許さない）という条件を併記します。

## 1. Hilbert類体のうち $p$ 冪次数だけを残す

既習の[Hilbert類体の定義](../../ANF/ANF22/index.md#def-anf22-hilbert-class-field)では、すべての有限素点で非分岐、実素点も実のままという条件を固定して、最大の有限**アーベル**拡大 $H_K/K$ を作りました。[Artin同型](../../ANF/ANF22/index.md#thm-anf22-hilbert-class-correspondence)は

$$
\operatorname{Gal}(H_K/K)\simeq\operatorname{Cl}(K)
$$

です。右辺の有限群は素数ごとの部分に分かれます。$p$ 成分だけを取り出すと、左辺でも対応する固定体を取り出せます。

ここで有限アーベル群 $C$ の $p$ 冪位数の元の部分群を $C[p^\infty]$ と書き、$C$ の位数が $p$ と互いに素な元全体の部分群を $C_{p'}$ と書きます。両者の直積が $C$ です。これは各巡回因子に対する整数のBézout等式から確かめられます。

<a id="def-iwa9-hilbert-p-class-field"></a>

<!-- formal-statement-start -->
> **定義（無分岐最大アーベルp拡大）**  
> 数体 $K$、素数 $p$ とHilbert類体 $H_K$ に対し、Artin同型で $\operatorname{Cl}(K)_{p'}$ に対応する部分群の固定体を $H_K^{(p)}$ とする。これは $K$ のすべての有限素点で非分岐、すべての実素点で複素化せず、Galois群が有限アーベル $p$ 群である拡大のうち最大のものを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa9-hilbert-p-class-field -->
**定義の確認**。 $\operatorname{Cl}(K)\simeq\mathbb Z/12\mathbb Z$、$p=3$ という有限群の模型では、$p'$ 部分は位数4、商は位数3です。対応する固定体の次数は $[H_K^{(3)}:K]=3$ であり、$H_K^{(3)}/K$ はHilbert類体の中間体だからすべての指定素点で非分岐です。任意の非分岐アーベル3拡大 $L/K$ は $H_K$ に含まれ、そのGalois群への射影は位数4の部分群を消すので $L\subseteq H_K^{(3)}$ です。ここで類群が $\mathbb Z/12$ である数体の実在は仮定していません。
<!-- definition-example-end -->

<a id="thm-iwa9-unramified-artin-p"></a>

<!-- formal-statement-start -->
> **定理（無分岐アーベルp拡大と類群のp部分）**  
> 数体 $K$、素数 $p$ に対して、算術的Frobeniusで規格化したArtin写像は自然な群同型
>
$$
\operatorname{Cl}(K)[p^\infty]
\xrightarrow{\ \sim\ }
\operatorname{Gal}(H_K^{(p)}/K)
$$
>
> を与える。従って $[H_K^{(p)}:K]=|\operatorname{Cl}(K)[p^\infty]|$ である。最大性は**アーベル** $p$ 拡大の範囲での主張であり、すべての非可換無分岐 $p$ 拡大を包含すると主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

類体論の深い入力は[Hilbert類体のArtin同型](../../ANF/ANF22/index.md#thm-anf22-hilbert-class-correspondence)です。その後は有限アーベル群の $p$ 部分への射影とGalois対応を計算します。

<!-- proof-start -->
### 証明

$C=\operatorname{Cl}(K)$、$A=C[p^\infty]$、$B=C_{p'}$ と置きます。$C=A\oplus B$ なので、商写像 $C\to C/B$ は $A$ に制限すると単射（$A\cap B=0$）かつ全射（任意の $a+b$ の像は $a$ の像）です。従って $A\simeq C/B$。

[Hilbert類体のArtin同型](../../ANF/ANF22/index.md#thm-anf22-hilbert-class-correspondence)の下で $B$ に対応する部分群を固定した体が $H_K^{(p)}$ です。Galois対応により

$$
\operatorname{Gal}(H_K^{(p)}/K)
\simeq \operatorname{Gal}(H_K/K)/B
\simeq C/B\simeq A.
$$

この同型から次数式が出ます。最後に、$L/K$ が同じ非分岐・実素点条件を満たす有限アーベル $p$ 拡大なら $L\subseteq H_K$ です。制限写像 $C\to\operatorname{Gal}(L/K)$ は位数が $p$ と互いに素な $B$ を消すので、$\operatorname{Gal}(H_K/L)\supseteq B$。固定体の包含は逆転し、$L\subseteq H_K^{(p)}$ です。
<!-- proof-end -->

例えば $K=\mathbb Q$ では[類数1の判定](../../ANF/ANF6/index.md#cor-anf6-class-number-one)により $\operatorname{Cl}(\mathbb Q)=0$ なので $H_{\mathbb Q}^{(p)}=\mathbb Q$。後で見る $p$ で分岐する拡大とは大きく違います。

## 2. 「$p$ の外で無分岐」は別のGalois群を作る

数体 $K$ の有限素点 $v$ と有限Galois拡大 $L/K$ を取り、上の素点 $w$ を固定します。[分岐指数と剰余次数](../../ANF/ANF4/index.md#def-anf4-ramification-residue)はそれぞれ $e(w/v)$ と $f(w/v)$ でした。

局所Galois群のうち剰余体に自明に作用する元の群を **惰性群** $I_w$ といいます。局所拡大がGaloisの場合、剰余体への作用の核が $I_w$ で、その位数は $e(w/v)$ です。

従って $I_w=1$ と $e(w/v)=1$ は同値です。無限拡大では有限部分拡大ごとに同じ条件を課し、惰性群は逆極限で扱います。

有限集合 $S$ に含めた素点では分岐を許し、それ以外では惰性群を零にする、という条件を考えます。円分塔との比較では $S=S_p(K)=\{v:v\mid p\}$ を用います。

<a id="def-iwa9-s-ramified-extension"></a>

<!-- formal-statement-start -->
> **定義（S分岐アーベルpro-p拡大）**  
> 数体 $K$、素数 $p$ と有限素点の有限集合 $S$ を固定する。$M_S(K)$ は、$K$ のすべての有限アーベル $p$ 冪次数拡大のうち、$S$ の外で非分岐であり、すべての実素点の複素化を許さないものの合成体とする。これを最大 $S$ 分岐アーベル pro-$p$ 拡大といい、
>
$$
\mathfrak X_S(K)=\operatorname{Gal}(M_S(K)/K)
$$
>
> と書く。ここで pro-$p$ とは有限 $p$ 群の逆極限であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa9-s-ramified-extension -->
**定義の確認**。 $K=\mathbb Q$、$p=3$、$S=\{(3)\}$ とします。$u=\zeta_9+\zeta_9^{-1}$ は

$$
u^3-3u+1=0
$$

を満たします。なぜなら $u^3-3u=\zeta_9^3+\zeta_9^{-3}=-1$ だからです。

この多項式だけから分岐条件を判定するのではなく、まず円分体の中間体として調べます。[円分体の次数と全分岐](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)から $[\mathbb Q(\zeta_9):\mathbb Q]=6$ です。$u$ は実数で、$\zeta_9$ は非実数、しかも $\zeta_9$ は $T^2-uT+1=0$ を満たすため、

$$
[\mathbb Q(\zeta_9):\mathbb Q(u)]=2,
\qquad
[\mathbb Q(u):\mathbb Q]=6/2=3.
$$

$\mathbb Q(\zeta_9)/\mathbb Q$ のGalois群 $(\mathbb Z/9\mathbb Z)^\times$ はアーベル群なので、この中間体もGalois拡大であり、そのGalois群は位数3の巡回群です。$\mathbb Q(\zeta_9)$ では3が完全分岐し、3以外は非分岐です。したがって中間体 $\mathbb Q(u)$ でも3の分岐指数は3（中間体の次数と等しい）、他の有限素数の分岐指数は1です。$u$ の共役はすべて実数なので $\mathbb Q(u)$ は全実でもあります。

よって $\mathbb Q(u)\subseteq M_S(\mathbb Q)$ ですが、第1節の $H_{\mathbb Q}^{(3)}=\mathbb Q$ には入りません。
<!-- definition-example-end -->

**分岐の条件はGalois群の核へ翻訳できます。** $K$ が全虚数体なら、すべての $v\in S$ に対して $M_S(K)/K$ の惰性群を $\mathfrak X_S(K)$ 内の閉部分群 $I_v$ として取れます。アーベル群なので上の素点の選択に依存しません。

<a id="prop-iwa9-inertia-quotient"></a>

<!-- formal-statement-start -->
> **命題（局所惰性群で割ると類群が現れる）**  
> 全虚数体 $K$、素数 $p$、有限素点の有限集合 $S$ に対し、閉部分群
>
$$
J_S=\overline{\langle I_v:v\in S\rangle}
\subseteq\mathfrak X_S(K)
$$
>
> を取る。すると自然な短完全列
>
$$
1\longrightarrow J_S
\longrightarrow\mathfrak X_S(K)
\longrightarrow\operatorname{Cl}(K)[p^\infty]
\longrightarrow1
$$
>
> が成立する。右端の群はArtin同型で $\operatorname{Gal}(H_K^{(p)}/K)$ と同一視している。
<!-- formal-statement-end -->

### 証明の見取り図

$S$ の外では初めから惰性群が自明です。$S$ に残った惰性群をすべて消す最大の商は、全有限素点が無分岐な最大アーベル $p$ 拡大を表します。

<!-- proof-start -->
### 証明

$H_K^{(p)}/K$ はすべての有限素点で非分岐で、全虚数体ゆえ実素点条件は空です。従って $H_K^{(p)}\subseteq M_S(K)$ で、Galois制限による全射

$$
q:\mathfrak X_S(K)\twoheadrightarrow
\operatorname{Gal}(H_K^{(p)}/K)
$$

があります。各 $I_v$ は無分岐商への制限で自明となるので、$J_S\subseteq\ker q$ です。

逆に $M_S(K)^{J_S}$ を $J_S$ の固定体とします。$v\notin S$ ではもともと分岐がなく、$v\in S$ では惰性群の像をすべて殺したので、この固定体は全有限素点で非分岐です。またアーベル pro-$p$ 拡大です。

任意の有限部分拡大は[第1節の最大性](#thm-iwa9-unramified-artin-p)によって $H_K^{(p)}$ に含まれ、従って固定体全体も $H_K^{(p)}$ に含まれます。逆包含は $J_S\subseteq\ker q$ から従います。

よって $M_S(K)^{J_S}=H_K^{(p)}$、すなわち $\ker q=J_S$ です。最後に[Artin同型](#thm-iwa9-unramified-artin-p)を使って右端を類群の $p$ 部分へ書き換えます。
<!-- proof-end -->

この命題が言う「局所化」は、$S$ の各完備化での分岐を惰性群として検出し、それを商で消すことです。単に $S$ の外で非分岐であるだけでは $J_S=1$ とはいえません。実素点を持つ数体へ拡張するときは、実素点の惰性条件も同時に管理します。

## 3. 「無分岐だが $p$ で完全分解」を区別する

局所の条件には、分岐を許す以外に、無分岐な素点の **Frobeniusまで自明**にする条件があります。後者はその素点で完全分解を要求する、より強い条件です。[Hilbert類体でのFrobeniusの位数](../../ANF/ANF22/index.md#prop-anf22-principal-splitting)で両者の違いを確認できます。

$S$ の素イデアルを逆元として加えた整数環を $\mathcal O_{K,S}$ と書きます。分数イデアルを素イデアル分解すると、$S$ にある因子は $\mathcal O_{K,S}$ では単位イデアルになります。これを用いた類群の商を定義します。

<a id="def-iwa9-s-class-group"></a>

<!-- formal-statement-start -->
> **定義（S整数環の類群とp分解条件）**  
> 数体 $K$ と有限素点集合 $S$ に対し、$S$ 整数環の類群は次で定まる。
>
$$
\operatorname{Cl}_S(K)=\operatorname{Cl}(\mathcal O_{K,S}).
$$

> 数体 $K$ の[Hilbert類体](../../ANF/ANF22/index.md#def-anf22-hilbert-class-field)の中で、$S$ のすべての素点が完全分解する最大アーベル $p$ 拡大を $H_{K,S}^{(p)}$ と呼ぶ。そのGalois群は $A_{K,S}$ と書く。実素点についてはHilbert類体と同じく複素化を許さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa9-s-class-group -->
**定義の確認**。 $K=\mathbb Q$、$S=\{(3)\}$ なら $\mathcal O_{K,S}=\mathbb Z[1/3]$ です。任意の非零イデアルは、3を除く素数の積で生成される主イデアルなので $\operatorname{Cl}_S(\mathbb Q)=0$。対応する無分岐・3完全分解アーベル拡大は自明です。これに対して、第2節で見た $\mathbb Q(\zeta_9)^+/\mathbb Q$ は3で**分岐**しており、$H_{\mathbb Q,S}^{(3)}$ の候補にはなりません。
<!-- definition-example-end -->

<a id="prop-iwa9-s-class-quotient"></a>

<!-- formal-statement-start -->
> **命題（S整数環への局所化と類群の商）**  
> 数体 $K$、有限素点集合 $S$ と素数 $p$ に対し、$\operatorname{Cl}(K)\to\operatorname{Cl}_S(K)$ は全射で、その核は $[\mathfrak p]$（$\mathfrak p\in S$）が生成する部分群である。従って
>
$$
A_{K,S}\simeq\operatorname{Cl}_S(K)[p^\infty]
\simeq \frac{\operatorname{Cl}(K)[p^\infty]}
{\langle[\mathfrak p]_p:\mathfrak p\in S\rangle}.
$$
>
> ここで $[\mathfrak p]_p$ は有限アーベル群の $p$ 成分への射影である。
<!-- formal-statement-end -->

### 証明の見取り図

素イデアル分解から、局所化後の分数イデアルを局所化前のイデアルで表し直します。主イデアル関係に加わるのは $S$ にある素イデアルの類だけです。

<!-- proof-start -->
### 証明

$\mathcal O_K$ の非零分数イデアル群を $I_K$、$S$ の外の素イデアルで生成される自由アーベル群を $I_{K,S}$ とします。[素イデアル分解の一意性](../../ANF/ANF3/index.md#thm-anf3-prime-ideal-factorization)より、$I_K$ の元は一意に

$$
\mathfrak a=
\left(\prod_{\mathfrak p\in S}\mathfrak p^{n_{\mathfrak p}}\right)
\left(\prod_{\mathfrak q\notin S}\mathfrak q^{m_{\mathfrak q}}\right)
$$

と分解でき、局所化は前者の因子を忘れて後者だけを残す全射 $I_K\to I_{K,S}$ です。主分数イデアルは局所化後も主分数イデアルです。逆に局所化後に主となる $\mathfrak a$ は、ある $x\in K^\times$ について $\mathfrak a(x)^{-1}$ の $S$ 外のすべての指数が0です。よって $\mathfrak a(x)^{-1}$ は $S$ の素イデアルの積であり、元の類群における核は $[\mathfrak p]$ が生成する部分群に等しくなります。

有限アーベル群の直積分解 $C=C[p^\infty]\oplus C_{p'}$ をこの全射に適用すると、$p$ 成分を取る操作は商と両立します。核の生成元は各 $[\mathfrak p]$ の $p$ 成分だから、表示した商を得ます。

[Hilbert類体のArtin対応](../../ANF/ANF22/index.md#thm-anf22-hilbert-class-correspondence)で $[\mathfrak p]$ はその素点のFrobeniusです。$S$ で完全分解を課すことは、それらを商Galois群で零にすることに等しいので、左辺 $A_{K,S}$ との同型が従います。
<!-- proof-end -->

**円分塔の具体例。** $E_r=\mathbb Q(\zeta_{p^r})$ では素数 $p$ の上の素イデアルはただ一つであり、[Eisenstein判定と全分岐](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)から $\mathfrak p_r=(1-\zeta_{p^r})$ はその素イデアルです。実際 $\Phi_{p^r}(1)=p$ なので、$N_{E_r/\mathbb Q}(1-\zeta_{p^r})=p$、従ってその主イデアルのノルムも $p$ です。唯一の素イデアルでの指数は1となります。そのため $[\mathfrak p_r]=0$、第3節の商では何も減りません。

$$
\operatorname{Cl}_{S_p}(E_r)[p^\infty]
\simeq\operatorname{Cl}(E_r)[p^\infty].
$$

**ただしこれは特殊な例**です。一般の数体には $p$ の上に非主な素イデアルがあり得ますし、「$p$ の上で完全分解」と「$p$ で分岐を許す」はまったく別の操作です。

## 4. 円分塔を上がると何がGalois群になるか

ここから $E_r=\mathbb Q(\zeta_{p^r})$、$E_\infty=\bigcup_{r\ge1}E_r$ を固定します。$A_r=\operatorname{Cl}(E_r)[p^\infty]$、$H_r^{(p)}=H_{E_r}^{(p)}$ と書きます。

$E_{r+1}/E_r$ は $p$ の上の唯一の素点で完全分岐し、他では非分岐です。これに対し $H_r^{(p)}/E_r$ は全素点で非分岐です。従って

$$
H_r^{(p)}\cap E_{r+1}=E_r.
$$

実際、共通部分は非分岐拡大の部分体であると同時に完全分岐拡大の部分体でもあり、局所の分岐指数は同時に1とその部分拡大の次数に等しくなくてはならないからです。

さらに有限局所拡大の非分岐拡大は任意の基礎体拡大後も非分岐なので、合成体 $H_r^{(p)}E_{r+1}/E_{r+1}$ は全素点で非分岐なアーベル $p$ 拡大です。第1節の最大性により

$$
H_r^{(p)}E_{r+1}\subseteq H_{r+1}^{(p)}.
$$

そこで $L_\infty=\bigcup_{r\ge1}H_r^{(p)}$ が定まり、その $E_\infty$ 上のGalois群は逆極限で記述できそうです。

この群への作用も具体的に説明します。$E_r/E_1$ の自己同型は、無分岐アーベル $p$ 拡大という条件を保つので、その最大拡大 $H_r^{(p)}$ を保ちます。従って $L_\infty/E_1$ はGalois拡大であり、$\Gamma=\operatorname{Gal}(E_\infty/E_1)$ の元 $\sigma$ を $L_\infty$ の自己同型 $\widetilde\sigma$ に持ち上げられます。$x\in\operatorname{Gal}(L_\infty/E_\infty)$ への作用は

$$
\sigma\cdot x=\widetilde\sigma x\widetilde\sigma^{-1}
$$

です。持ち上げを替えたときの差は $\operatorname{Gal}(L_\infty/E_\infty)$ の元であり、この群は各有限層のアーベル $p$ 群の逆極限なのでアーベルです。したがって共役作用は持ち上げによらず定まります。有限層での作用とノルムの両立から、[逆極限への岩澤代数作用](../IWA4/index.md#thm-iwa4-iwasawa-action)と同じ方法で連続な $\mathbb Z_p[[\Gamma]]$ 加群作用になります。

<a id="def-iwa9-unramified-iwasawa-module"></a>

<!-- formal-statement-start -->
> **定義（無分岐岩澤加群）**  
> 奇素数 $p$、$E_r=\mathbb Q(\zeta_{p^r})$、$E_\infty=\bigcup_r E_r$ に対し、各 $E_r$ の最大無分岐アーベル $p$ 拡大を $H_r^{(p)}$ とし、
>
$$
L_\infty=\bigcup_{r\ge1}H_r^{(p)},\qquad
X_\infty=\operatorname{Gal}(L_\infty/E_\infty)
$$
>
> と定める。$X_\infty$ は無分岐岩澤加群と呼ばれ、$\Gamma=\operatorname{Gal}(E_\infty/E_1)$ の共役作用による $\Lambda=\mathbb Z_p[[\Gamma]]$ 加群である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa9-unramified-iwasawa-module -->
**定義の確認**。 $p=3$、$E_1=\mathbb Q(\zeta_3)=\mathbb Q(\sqrt{-3})$ は類数1です（[Minkowski上界](../../ANF/ANF6/index.md#thm-anf6-minkowski-class-bound)で各類にノルム1のイデアル代表がある）。よって $A_1=0$、$H_1^{(3)}=E_1$。上の層 $r\ge2$ の類群を計算せずに $X_\infty=0$ と結論することはできません。定義が要求するのは全層でノルム整合的な自己同型の列であり、第一層だけの情報では足りないからです。
<!-- definition-example-end -->

<a id="thm-iwa9-galois-inverse-limit"></a>

<!-- formal-statement-start -->
> **定理（類群逆極限のGalois表示）**  
> 上の奇素数の円分塔において、有限層のArtin同型はノルムに関して両立し、自然な位相群および $\Lambda$ 加群の同型
>
$$
X_\infty
\simeq\varprojlim_{r\ge1}
\operatorname{Cl}(E_r)[p^\infty]
$$
>
> を与える。さらに $L_\infty/E_\infty$ は、$E_\infty$ の最大無分岐アーベル pro-$p$ 拡大である。ここで無分岐とはすべての有限素点で非分岐であることをいう。
<!-- formal-statement-end -->

### 証明の見取り図

有限層の同型とノルムの互換性、Galois群の逆極限による記述をここで確かめます。最後の「無限層で最大」の部分には、任意の有限アーベル拡大を有限層へ降下し、分岐条件が十分高い層で消えることを示す**無限層の降下定理**を別に要します。その部分は以下の参照文献を用いることを明示します。

<!-- proof-start -->
### 証明（有限層の互換性と無限層の降下）

$H_r^{(p)}\cap E_\infty=E_r$ です。なぜなら $H_r^{(p)}/E_r$ は非分岐ですが、$E_\infty/E_r$ の有限部分拡大はいずれも $p$ の上で完全分岐しているからです。よって制限により

$$
\operatorname{Gal}(H_r^{(p)}E_\infty/E_\infty)
\simeq\operatorname{Gal}(H_r^{(p)}/E_r)
\simeq A_r.
$$

また $H_r^{(p)}E_\infty$ は $r$ とともに増大し、その合併は $L_\infty$ です。有限Galois拡大の合併についての[Galois群の逆極限表示](../IWA1/index.md#thm-iwa1-galois-inverse-limit)を適用すると

$$
\operatorname{Gal}(L_\infty/E_\infty)
\simeq\varprojlim_r\operatorname{Gal}(H_r^{(p)}E_\infty/E_\infty).
$$

遷移写像はGalois自己同型の制限です。これが類群のノルムであることを素イデアルで確認します。$\mathfrak P$ を $E_{r+1}$ の素イデアル、$\mathfrak p$ をその下の $E_r$ の素イデアルとし、$\mathfrak p$ が考える有限アーベル拡大で非分岐とします。Artin同型で

$$
\operatorname{Art}_{r+1}([\mathfrak P])
=\operatorname{Frob}_{\mathfrak P}.
$$

剰余次数 $f=f(\mathfrak P/\mathfrak p)$ に対し、[イデアルノルムの定義](../IWA4/index.md#def-iwa4-ideal-norm-extension)は $N(\mathfrak P)=\mathfrak p^f$ です。下の体の剰余体を $k_{\mathfrak p}$ とすれば、上の剰余体は $[k_{\mathfrak P}:k_{\mathfrak p}]=f$ であり、$\operatorname{Frob}_{\mathfrak P}$ の作用を下の体へ制限すると、剰余体上の $a\mapsto a^{|k_{\mathfrak P}|}=a^{|k_{\mathfrak p}|^f}$ になります。これは $\operatorname{Frob}_{\mathfrak p}^f$ の作用です。[FrobeniusとArtin写像の制限の関手性](../../ANF/ANF21/index.md#prop-anf21-restriction)にも一致し、

$$
\operatorname{res}(\operatorname{Frob}_{\mathfrak P})
=\operatorname{Frob}_{\mathfrak p}^{\,f}
=\operatorname{Art}_r([\mathfrak p^f])
=\operatorname{Art}_r(N[\mathfrak P]).
$$

すべてのイデアル類は素イデアルの積で表せ、主イデアルは両写像で零になるため、式は $A_{r+1}$ 全体に拡張できます。従って逆極限の遷移は[IWA4のノルム](../IWA4/index.md#prop-iwa4-norm-transitivity)そのものです。$\Gamma$ の共役作用がノルムと両立することは[IWA8の同変性](../IWA8/index.md#prop-iwa8-norm-equivariance)の議論と同じ素イデアル作用から従い、$\Lambda$ 線形性も得られます。

以上で $L_\infty$ が無分岐アーベル pro-$p$ 拡大であることと、逆極限同型を**直接**証明しました。任意の無分岐アーベル pro-$p$ 拡大を $L_\infty$ が含むという最大性には、有限層への降下と分岐消滅を扱う追加の論証が必要です。この一般形は Sharifi, *Iwasawa Theory*, §3.2, Proposition 3.2.6 と Corollary 3.2.7 の定理を入力とします。そこでは最大 $S$ 分岐拡大の有限層との比較を示し、$S=\varnothing$ を適用しています。この深い降下部分を有限群の逆極限の形式計算だけで証明したとは主張しません。
<!-- proof-end -->

重要なのは、$X_\infty$ はアーベル群だが、**$\operatorname{Gal}(L_\infty/E_1)$ がアーベルである必要はない**ことです。$\Gamma$ の共役作用が非自明なら半直積的な構造が現れます。また、[IWA7の有限層coinvariants](../IWA7/index.md#def-iwa7-layer-quotient)について、一般に $A_r=X_\infty/(\gamma^{p^{r-1}}-1)X_\infty$ と直ちに断定してはいけません。有限層との比較には、惰性群などの算術的な補正が必要です（IWA12で扱います）。

## 5. 指標成分と局所条件はどこで交わるか

[IWA2の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting)による $\Delta=(\mathbb Z/p\mathbb Z)^\times$ は各 $E_r$ に作用します。分岐指数や「$p$ の上の素点」という条件は自己同型で保たれます。そのため $H_r^{(p)}$ と $L_\infty$ も $\Delta$ 作用で保たれ、局所惰性群が生成する閉部分群も $\Delta$ 作用で保たれます。

<a id="prop-iwa9-character-inertia-compatibility"></a>

<!-- formal-statement-start -->
> **命題（指標射影と局所条件の両立）**  
> 奇素数 $p$、$\Delta=(\mathbb Z/p\mathbb Z)^\times$ とし、$\mathbb Z_p[\Delta]$ 加群の全射 $q:M\twoheadrightarrow N$ の核 $J$ が $\Delta$ 安定であるとする。このとき[IWA8の射影子](../IWA8/index.md#def-iwa8-character-idempotent) $e_i$（$0\le i\le p-2$）について
>
$$
0\longrightarrow e_iJ\longrightarrow e_iM
\xrightarrow{q}e_iN\longrightarrow0
$$
>
> は完全である。特に第2節の惰性群商が $\Delta$ と両立するとき、局所条件は各指標成分で別々に課せる。
<!-- formal-statement-end -->

### 証明の見取り図

同変性と射影の冪等性だけを用い、各矢印で単射・全射・核を調べます。

<!-- proof-start -->
### 証明

$q$ が $\Delta$ 同変なので $q(e_ix)=e_iq(x)$ です。従って $e_iM$ から $e_iN$ への写像が定まります。$e_iJ\subseteq\ker(q|_{e_iM})$ です。逆に $y\in e_iM$、$q(y)=0$ なら $y\in J$ で、しかも $y=e_iy$ なので $y\in e_iJ$。従って核は等しいです。

$z\in e_iN$ に対し全射性から $q(x)=z$ となる $x\in M$ を取ると、$q(e_ix)=e_iq(x)=e_iz=z$ なので右端も全射です。左端は部分群の包含だから単射です。
<!-- proof-end -->

例えば $p=3$ で $\Delta=\{1,c\}$、$M=\mathbb Z/9\mathbb Z\oplus\mathbb Z/3\mathbb Z$、$c(x,y)=(x,-y)$、$J=0\oplus\mathbb Z/3\mathbb Z$ なら $N\simeq\mathbb Z/9\mathbb Z$ です。[偶奇射影](../IWA8/index.md#def-iwa8-parity-parts) $e_\pm=(1\pm c)/2$ は $M^+=\mathbb Z/9\oplus0$、$M^-=0\oplus\mathbb Z/3$ に分けます。商では $N^+=N$、$N^-=0$ となります。この模型はGalois群の**形式的な作用例**であり、実際の円分類群の値を主張するものではありません。

## 6. Selmer型の「局所条件」との正確な接点

後のIWA18では、局所完備化への制限写像の核を用いてSelmer群を構成します。いま扱った $X_\infty$ は類群側の **Galois群** ですが、有限の定数係数に対する一次Galoisコホモロジーの側では、同じ無分岐条件を **文字（準同型）** として測れます。

有限アーベル群 $A=\mathbb Z/p^m\mathbb Z$（$m\ge1$）にGalois群を自明に作用させます。連続一次余サイクル $f:G\to A$ はこのとき $f(gh)=f(g)+f(h)$ を満たすので、[加法的な第1余サイクル・余境界の定義](../../ANF/ANF14/index.md#def-anf14-additive-cocycle)を連続写像へ拡張すると

$$
H^1_{\mathrm{cont}}(G,A)=\operatorname{Hom}_{\mathrm{cont}}(G,A)
$$

です。自明作用では一次余境界が $g\mapsto ga-a=a-a=0$ となります。有限離散群 $A$ への連続準同型は開核を持ち、ある有限商 $G/U$ を通じて因子化します。従って、既習の有限群の余サイクル条件を有限商ごとに確かめることで、上の連続コホモロジーの式が得られます。

ここで $G_{K,S}$ は、$S$ の外の有限素点で非分岐、実素点では複素化しない最大の（必ずしもアーベルでない）Galois拡大のGalois群を表します。この段階では $S$ 内の惰性群に分岐を許しています。以下ではその惰性群上で文字が零になるという条件を加えます。

<a id="def-iwa9-unramified-local-condition"></a>

<!-- formal-statement-start -->
> **定義（無分岐な一次コホモロジー局所条件）**  
> 数体 $K$、奇素数 $p$、有限素点集合 $S$、整数 $m\ge1$ に対し、$G_{K,S}=\operatorname{Gal}(K_S/K)$ を $S$ の外で非分岐、実素点で複素化を許さない最大Galois拡大のGalois群とする（ここではアーベル性を仮定しない）。$A=\mathbb Z/p^m\mathbb Z$ は自明作用とする。各 $v\in S$ の惰性群 $I_v$ に制限した準同型が零となる条件を課し、
>
$$
H^1_{\mathrm{ur}}(K,A)
=\ker\left(
H^1_{\mathrm{cont}}(G_{K,S},A)
\longrightarrow
\bigoplus_{v\in S}
\operatorname{Hom}_{\mathrm{cont}}(I_v,A)
\right)
$$
>
> とする。ここで右辺への写像は各惰性群への制限である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa9-unramified-local-condition -->
**定義の確認**。 $K=\mathbb Q$、$p=3$、$S=\{3\}$、$A=\mathbb Z/3\mathbb Z$ とします。第2節の三次拡大 $\mathbb Q(\zeta_9)^+/\mathbb Q$ に対応する全射文字は、3で完全分岐しているので惰性群上で非零です。この文字は $H^1_{\mathrm{ur}}$ には入りません。他方 $\operatorname{Cl}(\mathbb Q)=0$ なので、以下の定理により $H^1_{\mathrm{ur}}(\mathbb Q,A)=0$ です。分岐を許す文字と、無分岐条件を課した文字が区別できました。
<!-- definition-example-end -->

<a id="prop-iwa9-unramified-characters"></a>

<!-- formal-statement-start -->
> **命題（無分岐文字は類群の文字に一致する）**  
> 数体 $K$、奇素数 $p$、$m\ge1$、有限集合 $S$ は $p$ の上のすべての素点を含むとし、$A=\mathbb Z/p^m\mathbb Z$ に自明なGalois作用を与える。第6節の無分岐局所条件に対して
>
$$
H^1_{\mathrm{ur}}(K,A)
\simeq\operatorname{Hom}(\operatorname{Cl}(K)[p^\infty],A).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一次余サイクルを文字へ読み替え、$S$ の惰性群上で零という条件でさらに商を取ります。最後にArtin対応で類群へ戻します。

<!-- proof-start -->
### 証明

$A$ への連続文字 $\chi:G_{K,S}\to A$ は有限アーベル $p$ 群を通じて因子化します。$S$ の外では $G_{K,S}$ の定義から非分岐です。$v\in S$ の各惰性群を $\chi$ が消すことは、その有限商の拡大が $S$ の各素点でも非分岐であることと同値です。従って $\chi$ は、全有限素点で非分岐な最大アーベル $p$ 拡大 $H_K^{(p)}$ のGalois群を通じて一意に因子化します。

$$
H^1_{\mathrm{ur}}(K,A)
=\operatorname{Hom}(\operatorname{Gal}(H_K^{(p)}/K),A).
$$

[無分岐アーベル $p$ 拡大と類群の同型](#thm-iwa9-unramified-artin-p)を代入して結論を得ます。ここでは $A$ が自明作用の**有限定数係数**であることが重要です。楕円曲線の $p$ 冪捩れなど、非自明なGalois作用を持つ係数では一次余サイクルが単なる準同型ではなくなり、局所条件も変わります。
<!-- proof-end -->

第2節の $\mathfrak X_S(K)\to A_K$ は **Galois群を商にする** 操作で、この節の $H^1_{\mathrm{ur}}$ は **その商に値を持つ文字を選ぶ** 操作です。双対の立場で関連しますが、一般のSelmer群・$H^2$ の有界性・Tate–Poitou双対の結論まで証明したわけではありません。

## 7. 演習：分岐を消す写像を組み立てる

### Level A

<a id="ex-iwa9-a1"></a>

**A1. $p$ 成分への商**
- Level: A
- ID: IWA9-A1

有限アーベル群 $C=\mathbb Z/18\mathbb Z\oplus\mathbb Z/10\mathbb Z$ と $p=3$ に対し、$C[p^\infty]$ と $C_{p'}$ の位数を求め、$C/C_{p'}\simeq C[p^\infty]$ を明示せよ。

<!-- solution-start -->
**詳細解答。** 第一因子 $\mathbb Z/18$ の3部分は位数9、3と互いに素な部分は位数2です。第二因子 $\mathbb Z/10$ は3部分が零、$3'$ 部分が位数10です。よって

$$
C[3^\infty]\simeq\mathbb Z/9\mathbb Z,\quad |C[3^\infty]|=9,
\qquad
C_{3'}\simeq\mathbb Z/2\mathbb Z\oplus\mathbb Z/10\mathbb Z,\quad |C_{3'}|=20.
$$

写像 $C\to\mathbb Z/9\mathbb Z$ を $(\bar x,\bar y)\mapsto\bar x\bmod9$ と定めます。これは全射で、核は $x\equiv0\pmod9$ かつ $y$ は任意という位数20の群です。これはちょうど $C_{3'}$ に一致するので、第一同型定理により $C/C_{3'}\simeq C[3^\infty]$ です。
<!-- solution-end -->

<a id="ex-iwa9-a2"></a>

**A2. 惰性と剰余次数**
- Level: A
- ID: IWA9-A2

有限Galois局所拡大 $L_w/K_v$ の次数が6、分岐指数が2、剰余次数が3とする。惰性群の位数を求め、非分岐と完全分解のどちらが成り立つか答えよ。

<!-- solution-start -->
**詳細解答。** 惰性群は剰余体への作用写像の核で、局所Galois群は位数6、剰余体Galois群は位数3です。従って核の位数は $6/3=2=e$。$e\ne1$ なので非分岐ではありません。完全分解なら局所次数1、従って $e=f=1$ を要するため、こちらも成り立ちません。
<!-- solution-end -->

<a id="ex-iwa9-a3"></a>

**A3. 惰性群で割る**
- Level: A
- ID: IWA9-A3

$G=(\mathbb Z/9\mathbb Z)\oplus(\mathbb Z/3\mathbb Z)$ を加法記法で書き、惰性群の模型 $I=\langle(3,1)\rangle$ を取る。$I$ の位数と $G/I$ の位数、構造を求めよ。

<!-- solution-start -->
**詳細解答。** $3(3,1)=(9,3)=(0,0)$ で $(3,1)\ne0$ なので $|I|=3$、$|G/I|=27/3=9$ です。商群では $(3,1)=0$ となるため、

$$
(0,1)=-(3,0)=-3(1,0)
\qquad\text{in }G/I
$$

が成り立ち、すべての類は $(1,0)$ の整数倍で表せます。この生成元の位数を確かめます。$k(1,0)\in I$ と仮定すれば、ある整数 $a$ について

$$
(k,0)=(3a,a)
\quad\text{in }\mathbb Z/9\mathbb Z\oplus\mathbb Z/3\mathbb Z.
$$

第二座標から $a\equiv0\pmod3$、第一座標から $k\equiv3a\equiv0\pmod9$ です。従って $(1,0)+I$ の位数は9で、$G/I\simeq\mathbb Z/9\mathbb Z$。これは実際の数体ではなく、惰性群商の模型です。
<!-- solution-end -->

<a id="ex-iwa9-a4"></a>

**A4. $S$ の素イデアルを消す**
- Level: A
- ID: IWA9-A4

$\operatorname{Cl}(K)\simeq\mathbb Z/12\mathbb Z$ と仮定し、$S$ にある素イデアルの類が $\overline 4$ を生成するとする。$\operatorname{Cl}_S(K)$ を求め、$p=3$ の部分の位数を求めよ。

<!-- solution-start -->
**詳細解答。** $\overline4$ の位数は $12/\gcd(12,4)=3$ なので生成部分群は $\{0,4,8\}$。よって $\operatorname{Cl}_S(K)\simeq(\mathbb Z/12)/\langle4\rangle\simeq\mathbb Z/4$ です。3部分は零です。元の類群の3部分は $\langle4\rangle\simeq\mathbb Z/3$ であり、局所化でちょうど消えたことを確認できます。
<!-- solution-end -->

<a id="ex-iwa9-a5"></a>

**A5. 円分塔での素点の主性**
- Level: A
- ID: IWA9-A5

$p=3$、$E_2=\mathbb Q(\zeta_9)$ とする。$N_{E_2/\mathbb Q}(1-\zeta_9)$ と $[E_2:\mathbb Q]$ を求め、3の上の唯一の素イデアルが主イデアルであることを説明せよ。

<!-- solution-start -->
**詳細解答。** $\Phi_9(X)=X^6+X^3+1$ より $[E_2:\mathbb Q]=\varphi(9)=6$ です。また全ての共役の積は $\Phi_9(1)=1+1+1=3$ なので $N(1-\zeta_9)=3$。[全分岐](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)により3の上の素イデアル $\mathfrak p$ は一つで、剰余次数 $f=1$ です。$(1-\zeta_9)$ のイデアルノルムは $(3)$ なので、素イデアル分解で $\mathfrak p$ の指数は1。従って $\mathfrak p=(1-\zeta_9)$ は主イデアルです。
<!-- solution-end -->

### Level B

<a id="ex-iwa9-b1"></a>

**B1. 分岐を許す商と完全分解の商**
- Level: B
- ID: IWA9-B1

全虚数体 $K$、有限集合 $S$ について $G=\mathfrak X_S(K)$ とし、$J_S$ は $S$ の惰性群が生成する閉部分群とする。$q:G\to A_K$ の核が $J_S$ と分かっている。$S$ の素点のFrobenius類に対応する $A_K$ の部分群を $D$ とするとき、(1) $G/J_S$、(2) $A_K/D$ が表す分岐・分解条件を区別せよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $G$ は $S$ 外で非分岐なアーベル pro-$p$ 拡大のGalois群です。$J_S$ は $S$ 内の惰性群を全て含むので、商 $G/J_S$ では $S$ の分岐も消え、全有限素点で非分岐です。

従って[惰性群商の命題](#prop-iwa9-inertia-quotient)より、次を得ます。

$$
G/J_S\simeq A_K.
$$

**(2)** この無分岐商でさらに各 $v\in S$ のFrobeniusを零にすると、$v$ は非分岐であるだけでなく完全分解します。[局所化の商](#prop-iwa9-s-class-quotient)より、次の同型が成り立ちます。

$$
A_K/D\simeq A_{K,S}.
$$

前者では惰性群、後者ではFrobeniusを殺す点が異なります。
<!-- solution-end -->

<a id="ex-iwa9-b2"></a>

**B2. Hilbert類体を基礎体変更しても無分岐**
- Level: B
- ID: IWA9-B2

$E_r\subset E_{r+1}$ を奇素数 $p$ の円分塔とし、$H_r^{(p)}/E_r$ を最大無分岐アーベル $p$ 拡大とする。$H_r^{(p)}E_{r+1}\subseteq H_{r+1}^{(p)}$ と、ノルム $A_{r+1}\to A_r$ が全射になる理由を、交わりの条件を明示して証明せよ。

<!-- solution-start -->
**詳細解答。** 各有限素点で非分岐な局所拡大は基礎体を拡大しても非分岐のままなので、$H_r^{(p)}E_{r+1}/E_{r+1}$ は全素点で非分岐です。さらに $H_r^{(p)}/E_r$ はアーベル $p$ 拡大であり、合成体の相対Galois群もその部分群なのでアーベル $p$ 群です。[最大性](#thm-iwa9-unramified-artin-p)から合成体は $H_{r+1}^{(p)}$ に入ります。

$E_{r+1}/E_r$ は唯一の $p$ 素点で完全分岐しますが、$H_r^{(p)}/E_r$ はそこでも非分岐です。従って両拡大の交わりは $E_r$ のみです。その結果 $\operatorname{Gal}(H_r^{(p)}E_{r+1}/E_{r+1})\simeq\operatorname{Gal}(H_r^{(p)}/E_r)$。$H_{r+1}^{(p)}$ からこの合成体への制限はGalois対応で全射です。Artin同型の下ではこの制限が[第4節の計算](#thm-iwa9-galois-inverse-limit)のノルムに対応するので、$A_{r+1}\to A_r$ も全射です。
<!-- solution-end -->

<a id="ex-iwa9-b3"></a>

**B3. 指標で核を取り出す**
- Level: B
- ID: IWA9-B3

$p=3$、$M=(\mathbb Z/9)\oplus(\mathbb Z/3)$、$c(x,y)=(x,-y)$、$J=0\oplus(\mathbb Z/3)$、$N=M/J$ とする。$(1\pm c)/2$ による $J,M,N$ の偶奇成分を求め、各成分の短完全列を検算せよ。

<!-- solution-start -->
**詳細解答。** $2$ は $\mathbb Z_3$ の単元なので $e_\pm=(1\pm c)/2$ は良定義です。$c$ は第一座標には $+1$、第二座標には $-1$ と作用するため、

$$
M^+=\mathbb Z/9\mathbb Z\oplus0,\quad
M^-=0\oplus\mathbb Z/3\mathbb Z,\qquad
J^+=0,\quad J^-=J.
$$

商 $N=M/J\simeq\mathbb Z/9\mathbb Z$ には $c$ が自明に作用するので、$N^+=N$、$N^-=0$。よって各成分の列は

$$
\begin{aligned}
\text{偶成分: }&
0\longrightarrow0\longrightarrow\mathbb Z/9\mathbb Z
\xrightarrow{\sim}\mathbb Z/9\mathbb Z\longrightarrow0,\\
\text{奇成分: }&
0\longrightarrow\mathbb Z/3\mathbb Z
\xrightarrow{\sim}\mathbb Z/3\mathbb Z\longrightarrow0\longrightarrow0
\end{aligned}
$$

です。両方で核と像が一致し、[射影と局所条件の命題](#prop-iwa9-character-inertia-compatibility)を直接確認できました。
<!-- solution-end -->

<a id="ex-iwa9-b4"></a>

**B4. 自明作用の一次余サイクル**
- Level: B
- ID: IWA9-B4

群 $G$ が有限群 $A=\mathbb Z/p^m\mathbb Z$ に自明に作用するとする。一次余サイクルが群準同型であり、一次余境界が全て零であることを定義式から示せ。そのうえで $G=\mathbb Z/9$、$A=\mathbb Z/3$ の場合の $H^1(G,A)$ を求めよ。

<!-- solution-start -->
**詳細解答。** [加法的第1余サイクルと余境界](../../ANF/ANF14/index.md#def-anf14-additive-cocycle)の定義式は $f(gh)=f(g)+g f(h)$ です。自明作用では $g f(h)=f(h)$ なので

$$
f(gh)=f(g)+f(h),\qquad
(\delta a)(g)=ga-a=a-a=0.
$$

従って余サイクルは準同型、余境界は零であり、$H^1(G,A)=\operatorname{Hom}(G,A)$ です。$G=\mathbb Z/9\mathbb Z$ の生成元 $\bar1$ の像は $A=\mathbb Z/3\mathbb Z$ の任意の元から選べます。いずれについても $9f(\bar1)=0$ が成立するので、準同型は3個。加法群として $H^1(G,A)\simeq\mathbb Z/3\mathbb Z$ です。
<!-- solution-end -->

### Level C

<a id="ex-iwa9-c1"></a>

**C1. 一つの円分塔をGalois・分岐・局所条件の三方向から読む**
- Level: C
- ID: IWA9-C1

奇素数 $p=3$ の円分塔 $E_r=\mathbb Q(\zeta_{3^r})$、$E_\infty=\bigcup_r E_r$ を考える。$A_r=\operatorname{Cl}(E_r)[3^\infty]$、$H_r^{(3)}$ は最大無分岐アーベル3拡大、$S_r$ は3の上の素点集合とする。

1. $[E_{r+1}:E_r]$、$S_r$ の素点数および $E_{r+1}/E_r$ での分岐指数を示せ。
2. $H_r^{(3)}\cap E_\infty=E_r$、$H_r^{(3)}E_{r+1}\subset H_{r+1}^{(3)}$ を証明し、$\operatorname{Gal}(L_\infty/E_\infty)$ の逆極限表示を導け。
3. $\operatorname{Cl}_{S_r}(E_r)[3^\infty]\simeq A_r$ を示し、「3の上で完全分解する無分岐拡大」と「3で分岐を許す拡大」は違うことを、$\mathbb Q(\zeta_9)^+/\mathbb Q$ を用いて説明せよ。
4. $A=\mathbb Z/3$ の自明作用について、$K=E_r$ の無分岐一次文字群を $A_r$ の準同型群で表せ。さらに $A_1=0$ だけでは $X_\infty=0$ を導けない理由を説明せよ。

<!-- solution-start -->
**詳細解答。**

**第1問。** [円分体の次数](../../ANF/ANF22/index.md#prop-anf22-prime-power-degree)から $[E_r:\mathbb Q]=2\cdot3^{r-1}$ です。従って $[E_{r+1}:E_r]=(2\cdot3^r)/(2\cdot3^{r-1})=3$。3は各 $E_r/\mathbb Q$ で完全分岐するため $S_r$ は一素点のみで、塔の一段でも $e(E_{r+1}/E_r)=3$ です。

**第2問。** $H_r^{(3)}/E_r$ は無分岐です。$E_m/E_r$（$m>r$）は3の唯一の素点で完全分岐なので、両者の共通中間体は非分岐かつ完全分岐、従って $E_r$ のみ。$m$ の合併を取って $H_r^{(3)}\cap E_\infty=E_r$ です。局所非分岐拡大の基礎体変更は非分岐を保つので、$H_r^{(3)}E_{r+1}/E_{r+1}$ は無分岐アーベル3拡大。[最大性](#thm-iwa9-unramified-artin-p)から $H_r^{(3)}E_{r+1}\subseteq H_{r+1}^{(3)}$ です。制限により

$$
\operatorname{Gal}(H_r^{(3)}E_\infty/E_\infty)
\simeq\operatorname{Gal}(H_r^{(3)}/E_r)\simeq A_r.
$$

これらの合成体は上昇列で合併が $L_\infty$ です。[Galois群の逆極限表示](../IWA1/index.md#thm-iwa1-galois-inverse-limit)より $\operatorname{Gal}(L_\infty/E_\infty)\simeq\varprojlim_r A_r$。矢印は[Artin関手性](#thm-iwa9-galois-inverse-limit)でノルムになります。

**第3問。** 3の上の唯一の素イデアルは $\mathfrak p_r=(1-\zeta_{3^r})$ で主です。[局所化の商](#prop-iwa9-s-class-quotient)はその類だけを消すので、$A_{E_r,S_r}\simeq A_r$。この商で3のFrobeniusは自明、従って無分岐拡大では3が完全分解します。一方 $\mathbb Q(\zeta_9)^+$ は $\mathbb Q$ の次数3の全実拡大で3で完全分岐し、3の外では非分岐です。つまり「3の外で非分岐」は3での非分岐も完全分解も要求しません。

**第4問。** [無分岐文字の命題](#prop-iwa9-unramified-characters)の仮定は $K=E_r$、$S=S_r$、自明係数 $\mathbb Z/3$ で満たされます。よって

$$
H^1_{\mathrm{ur}}(E_r,\mathbb Z/3)
\simeq\operatorname{Hom}(A_r,\mathbb Z/3).
$$

$E_1=\mathbb Q(\sqrt{-3})$ の類数は1なので $A_1=0$、この層での文字群は零です。ただし高層の $A_r$ を計算していない以上、全層で互換な列が零になるとは結論できません。[逆極限の定義](#def-iwa9-unramified-iwasawa-module)と一層の値を混同しないことが重要です。
<!-- solution-end -->

## 8. 今回の到達点と次講

- **無分岐アーベル拡大**はHilbert類体の $p$ 成分から作られ、そのGalois群は類群の $p$ 部分です。
- **$p$ の外で非分岐なアーベル pro-$p$ 拡大**はもっと大きく、$p$ の惰性群を割ると無分岐商に戻ります。
- **$p$ で完全分解する条件**はさらにFrobeniusを消します。円分体では $p$ の上の唯一の素点が主であるため、有限層の $S$ 類群の $p$ 部分は通常の類群の $p$ 部分と一致します。
- **$X_\infty$** は無分岐最大アーベル pro-$p$ 拡大のGalois群であり、有限層の類群をノルムで結ぶ逆極限と一致します。この識別と、有限層coinvariantsが直接同型になるという主張は別物です。

IWA10では円分単数とそのノルムを実際に計算します。IWA11で局所・大域単数から惰性群・類群をつなぐ完全列を作り、IWA12で有限層制御の追加条件を調べます。

参考資料：Romyar Sharifi, [*Iwasawa Theory*, §1.3 Class groups and units](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch01.html)、[§3.2 Limits of class groups](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch03.html)（特に Proposition 3.2.6、Corollary 3.2.7）。局所相互法則・大域類体論の深い入力は[ANF17](../../ANF/ANF17/index.md#thm-anf17-local-reciprocity)と[ANF20](../../ANF/ANF20/index.md#thm-anf20-global-reciprocity)を参照してください。