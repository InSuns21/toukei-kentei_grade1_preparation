# IWA5 岩澤加群のtorsion／擬同型

[IWA4の類群逆極限への岩澤代数作用](../IWA4/index.md#thm-iwa4-iwasawa-action)で、円分塔の有限類群の情報を一つの $\Lambda$ 加群にまとめました。ただし、作用があるだけで、その加群が有限生成であるとも、torsionであるともいえません。ここでtorsionとは、各元が環の何らかの非零係数で消える性質です。例えば $\Lambda$ 自身は自分への作用を持ちますが、$1$ は非零係数では消せないのでtorsionではありません。

本講の問いは、**無限塔から得た加群のどこを分類し、有限個のずれをどう扱うか**です。まず有限生成とtorsionを区別し、有限部分を忘れたときに同じ形となる比較方法を導入します。続いて、岩澤加群の構造定理の適用条件と、有限部分を無視する意味を例で確認します。$\Lambda=\mathbb Z_p[[T]]$ の環論的な分類に必要な部分は、どこから外部の可換環論を使うかも区別します。

## 1. 作用することと有限生成であることは違う

$p$ は素数、$\Gamma\simeq\mathbb Z_p$ の位相的生成元を $\gamma$ とし、[IWA3の冪級数表示定理](../IWA3/index.md#thm-iwa3-power-series-isomorphism)に従って

$$
R=\Lambda=\mathbb Z_p[[\Gamma]]
 \simeq\mathbb Z_p[[T]],\qquad T=\gamma-1
$$

と固定します。$R$ は零因子を持たない可換環です。実際、非零冪級数の最低次数の係数は零でなく、二つの積の最低次数係数は係数環 $\mathbb Z_p$ が整域であるため非零です。$R$ 加群とは、$R$ の元を係数として足し算と分配法則ができるAbel群です。$Rm=\{am:a\in R\}$ と書きます。

まず、有限個の元 $m_1,\ldots,m_r$ で全ての元が $a_1m_1+\cdots+a_rm_r$ と書けることを**有限生成**とします。例えば $R$ は $1$ の一元で生成され、$R/(T)$ も $1+(T)$ の一元で生成されます。ただし前者は係数環そのもの、後者は $T$ が零として作用する商加群です。この違いを「ある非零係数で各元を消せるか」で測ります。

<a id="def-iwa5-fg-torsion"></a>

<!-- formal-statement-start -->
> **定義（有限生成torsion岩澤加群）**  
> $R=\mathbb Z_p[[T]]$ を固定し、$M$ を $R$ 加群とする。
> **有限生成**とは、有限個の $m_1,\ldots,m_r\in M$ が存在し、次を満たすことである。

$$
M=\sum_{i=1}^r Rm_i.
$$

> **torsion** とは、任意の $m\in M$ を非零の係数 $a\in R$ で消せることである。

$$
am=0.
$$

> 両条件を満たす $M$ を有限生成torsion岩澤加群と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa5-fg-torsion -->
**定義の確認**。 $M=R/(T)$ とすると、$1+(T)$ が生成元です。任意の元 $f(T)+(T)$ は $f(0)(1+(T))$ と書け、非零元 $T$ が全てを消します。よって有限生成かつtorsionです。しかも $M\simeq\mathbb Z_p$ は集合として有限ではありません。一方 $R$ は有限生成ですが、$a\cdot1=a$ が非零 $a$ で零になることがないのでtorsionではありません。
<!-- definition-example-end -->

この例は重要です。**torsionは「有限集合」を意味せず、係数環 $R$ に関する消滅条件です。** $R/(p)$ は $\mathbb F_p[[T]]$ と同型で、こちらも無限集合ですが非零元 $p$ で消えます。ここで $\mathbb F_p=\mathbb Z/p\mathbb Z$ とします。

個々の元ごとに消す係数が違っても、有限生成なら一つの係数を取れます。

<a id="prop-iwa5-common-annihilator"></a>

<!-- formal-statement-start -->
> **命題（有限生成torsionの共通消去元）**  
> $R=\mathbb Z_p[[T]]$ とし、$M$ を有限生成 $R$ 加群とする。
> $M$ がtorsionであるための必要十分条件は、非零元 $a\in R$ が存在して次を満たすことである。

$$
aM=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

生成元ごとの消去元を掛け合わせれば、全ての生成元を同時に消します。零因子のないことが積の非零性を保証します。

<!-- proof-start -->
### 証明

$M=Rm_1+\cdots+Rm_r$ がtorsionとします。各 $m_i$ に対し $0\ne a_i\in R$、$a_i m_i=0$ を取ります。$R$ が整域なので $a=\prod_{i=1}^r a_i$ は非零です。各 $i$ について $a$ は $a_i$ の倍数なので $am_i=0$。任意の $m=\sum b_i m_i$ について

$$
am=\sum_{i=1}^r b_i(am_i)=0
$$

です。逆に $aM=0$ で $a\ne0$ なら、各 $m$ を同じ $a$ が消すので定義どおりtorsionです。零加群でも $a=1$ を取れば成立します。
<!-- proof-end -->

## 2. なぜ「有限部分を無視する」のか

$R$ のイデアル $(p,T)$ は、$p$ と $T$ の倍数の和からなる集合です。[IWA3の単元判定](../IWA3/index.md#prop-iwa3-augmentation)によると、冪級数が単元であるのは定数項が $p$ 進単元のときであり、$(p,T)$ は非単元全体からなる唯一の極大イデアルです。以下 $\mathfrak m=(p,T)$ と書きます。

最小の有限加群 $F=R/(p,T)$ を考えると、定数項を法 $p$ へ送ることにより $F\simeq\mathbb F_p$ です。$p$ も $T$ も零として作用します。$\mathfrak m^2=(p^2,pT,T^2)$ なので、$R/(p,T^2)$ では $1,T$ が $\mathbb F_p$ 上の基底となり、位数は $p^2$ です。

高さ1の素イデアルとは、零イデアルとその素イデアルの間に別の素イデアルがない非零素イデアルをいいます。以下では可換環論の入力として、$R$ が2次元Noether正則局所環かつ一意分解整域であることを使います。このとき $(p)$ と $(T)$ は高さ1の素イデアル、$\mathfrak m$ は高さ2であり、非零の高さ1素イデアルは既約元一つで生成され、その局所化は離散付値環です。また、非零イデアルの根基が $\mathfrak m$ なら、ある $n$ で $\mathfrak m^n$ を含みます。ここでNoetherとは任意のイデアルが有限生成であること、正則局所とは極大イデアルの最小生成元の数が環の次元に等しい局所環であることをいいます。離散付値環とは、非零元が一つの素元（局所的な一様化元）の冪と単元の積で表される局所整域です。これらの環論的性質の証明は本講では入力として扱います。

素イデアル $\mathfrak q$ に属さない係数を分母として許した加群を $M_{\mathfrak q}$ と書き、元を $m/s$（$m\in M$、$s\notin\mathfrak q$）で表します。局所化で $m/1=0$ となるのは、ある $s\notin\mathfrak q$ が $sm=0$ を満たすとき、かつそのときに限ります。例えば $R/(p,T)$ では $\mathfrak q=(p)$ とすれば $T$ が可逆になる一方、$T$ は加群を消すので $(R/(p,T))_{(p)}=0$ です。$\mathfrak q=(T)$ でも $p$ を可逆にするため零になります。

このように、高さ1の場所で全て消える有限部分を**擬零**と捉えます。具体的な判定は次で十分です。

<a id="def-iwa5-pseudonull"></a>

<!-- formal-statement-start -->
> **定義（擬零岩澤加群）**  
> $R=\mathbb Z_p[[T]]$ 上の有限生成加群 $N$ が擬零であるとは、全ての高さ1の素イデアル $\mathfrak q\subset R$ に対し、局所化 $N_{\mathfrak q}=0$ となることである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa5-pseudonull -->
**定義の確認**。 $N=R/(p,T)$ を取ります。任意の高さ1素イデアル $\mathfrak q$ は、極大イデアル $\mathfrak m=(p,T)$ とは異なるので $p,T$ の少なくとも一方を含みません。$\mathfrak q$ に含まれない方を局所化で可逆にすると、その元は元の加群 $N$ を零にするため $N_{\mathfrak q}=0$ です。よって擬零です。
<!-- definition-example-end -->

上で用いた環論の入力の証明には、Weierstrass準備や局所環の次元論が必要です。後続のIWA6では準備定理による具体的な計算方法を学びます。証明の出典は末尾のSharifi講義ノート第2章です。

<a id="prop-iwa5-pseudonull-finite"></a>

<!-- formal-statement-start -->
> **命題（擬零と有限性）**  
> $R=\mathbb Z_p[[T]]$ 上の有限生成加群 $N$ に対して、$N$ が擬零であることと、$N$ が有限集合であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

有限加群では十分大きな $\mathfrak m$ の冪が作用を消します。逆に、高さ1の全ての局所化が零であれば、消去イデアルが極大イデアルの冪を含むことを示します。

<!-- proof-start -->
### 証明

まず有限集合 $N$ を考えます。その部分加群の減少列

$$
N\supset\mathfrak m N\supset\mathfrak m^2N\supset\cdots
$$

は有限集合の部分集合からなるので停止します。従って、ある $k$ で $L=\mathfrak m^kN=\mathfrak m L$ です。

$L$ は有限集合であるため有限生成です。$L=\mathfrak mL$ とは、各生成元 $l_i$ を他の生成元の $\mathfrak m$ 係数の線形結合で表せることです。そこで

$
l_i=\sum_{j=1}^r a_{ij}l_j\quad(1\le i\le r),\qquad a_{ij}\in\mathfrak m
$

と書きます。$A=(a_{ij})\in M_r(R)$ を係数の $r\times r$ 行列、$l=(l_1,\ldots,l_r)^{\mathsf T}$ を生成元の列とすると、関係式は $(I_r-A)l=0$ です。$I_r$ は $r$ 次単位行列、上付き $\mathsf T$ は転置を表し、冪級数変数 $T$ とは別の記号です。全ての $a_{ij}$ は $\mathfrak m$ に属するため

$
\det(I_r-A)\equiv\det I_r=1\pmod{\mathfrak m}
$

です。[単元判定](../IWA3/index.md#prop-iwa3-augmentation)より行列式は $R$ の単元です。余因子行列 $\operatorname{adj}(I_r-A)$ の恒等式

$
\operatorname{adj}(I_r-A)(I_r-A)=\det(I_r-A)I_r
$

を左から作用させると $\det(I_r-A)l=0$ となり、単元の逆数を掛けて $l=0$ です。従って $L=\mathfrak m^kN=0$ です。

高さ1素イデアル $\mathfrak q$ は $\mathfrak m$ と異なり、$\mathfrak m^k$ のある元が $\mathfrak q$ の外にあります。その元は局所化で可逆ですが $N$ を消すので $N_{\mathfrak q}=0$ です。

逆に $N$ を擬零とします。$N=0$ なら結論は成立しますから、$N\ne0$ とします。$N$ の消去イデアルを $I=\operatorname{Ann}_R(N)=\{a\in R:aN=0\}$ と置きます。$I$ の根基 $\sqrt I$ は、ある正整数 $n$ について $a^n\in I$ となる元 $a\in R$ 全体のイデアルです。

各高さ1素イデアル $\mathfrak q$ で $N_{\mathfrak q}=0$ なので、$N$ の有限個の生成元それぞれを消す分母を選べます。これらの積は $\mathfrak q$ の外にあり、$N$ の全生成元を消します。従って $I$ はどの高さ1素イデアルにも含まれません。特に $(p)$ の外に元を持つため $I\ne0$ です。また $N\ne0$ より $I\ne R$ です。

$R$ は次元2の局所整域であり、零・高さ1・高さ2の素イデアルのうち $I$ を含みうるのは、高さ2の $\mathfrak m$ だけです。従って $\sqrt I=\mathfrak m$ となり、前節で明示したNoether環論の入力から、ある $k$ で $\mathfrak m^k\subseteq I$ です。

$R/\mathfrak m^k$ は有限集合です。実際、

$
\mathfrak m^k=(p^k,p^{k-1}T,\ldots,pT^{k-1},T^k)
$

なので、次数 $j<k$ の $T^j$ の係数は法 $p^{k-j}$ で指定され、$j\ge k$ の項は零です。従って、有限個の有限剰余類で全て表せます。$N$ はこの有限環上の有限生成加群なので有限集合です。
<!-- proof-end -->

上の証明では有限生成性・局所化と、Noether環論から必要になる入力を分けました。「有限な加群」と「有限生成な加群」は同じではありません。

## 3. 擬同型は同型より弱い

加群の分類で、有限個の元が消えたり増えたりする違いを許すため、核と余核が擬零である写像を考えます。核は零へ移る元、余核は写像の像で割った残りです。第2節で示した[擬零と有限性](#prop-iwa5-pseudonull-finite)により、今回の環の有限生成加群ではこれらが有限集合であることと同値になります。

<a id="def-iwa5-pseudoisomorphism"></a>

<!-- formal-statement-start -->
> **定義（擬同型）**  
> $R=\mathbb Z_p[[T]]$ 上の有限生成加群 $M,N$ と $R$ 線形写像 $f:M\to N$ を取る。
> $f$ の核と余核がともに擬零加群であるとき、$f$ を**擬同型**という。ここで余核は次の商加群である。

$$
\operatorname{coker}f=N/f(M).
$$

> 擬同型は同型とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa5-pseudoisomorphism -->
**定義の確認**。 自然な写像 $R/(p,T)\to0$ は核が $R/(p,T)$、余核が零加群なので、[擬零と有限性の命題](#prop-iwa5-pseudonull-finite)により擬同型です。しかし単射ではなく、同型ではありません。逆向きの零写像 $0\to R/(p,T)$ も有限余核を持つ擬同型です。有限部分を無視した分類で、有限群が零と同じになる意味がここに現れます。
<!-- definition-example-end -->

非有限の商加群の間にも、この差は現れます。$p$ と $T$ は異なる素元であり、互いに共通の既約因子を持たないので $(p)\cap(T)=(pT)$ です。この等式を使うと、二つの剰余を同時に取る写像

$$
\iota:R/(pT)\longrightarrow R/(p)\oplus R/(T),
\qquad [f]\longmapsto([f]_p,[f]_T)
$$

は単射です。ただし中国剰余定理をそのまま使って全射とすることはできません。$(p)+(T)=\mathfrak m\ne R$ だからです。余核を具体的に求めます。

<a id="prop-iwa5-residue-pseudoiso"></a>

<!-- formal-statement-start -->
> **命題（pTの商加群の擬同型）**  
> $R=\mathbb Z_p[[T]]$ に対して、上の自然写像 $\iota$ は単射で、その余核は $R/(p,T)\simeq\mathbb F_p$ である。したがって $\iota$ は擬同型だが同型ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの剰余が同じ $f$ に由来するとき、定数項は法 $p$ で一致します。この一致が全ての障害であり、障害はちょうど一つの $\mathbb F_p$ です。

<!-- proof-start -->
### 証明

$\iota([f])=0$ なら $f\in(p)$ かつ $f\in(T)$ です。$f=pa$、$f=Tb$ と書けば、$p$ を法とした等式 $T[b]_p=0$ が整域 $\mathbb F_p[[T]]$ で成立するため $b\in(p)$、従って $f\in(pT)$ です。逆の包含も明らかなので核は零です。

$R/(T)\simeq\mathbb Z_p$ と識別し、$b\in\mathbb Z_p$ の法 $p$ の像を $\bar b\in\mathbb F_p$ と書きます。次の差写像を取ります。

$
\delta:R/(p)\oplus R/(T)\longrightarrow\mathbb F_p,
\qquad (u(T),b)\longmapsto u(0)-\bar b
$$

を取ります。$\delta$ は全射で、$\delta\iota([f])=0$ です。逆に $\delta(u,b)=0$ なら、$u(0)\equiv b\pmod p$ です。$u(T)$ を $\mathbb Z_p[[T]]$ に係数ごとに持ち上げた $U(T)$ を選び、定数項を $b$ に置き換えた

$$
f(T)=b+\bigl(U(T)-U(0)\bigr)
$$

を取ると、$f\bmod p=u$ かつ $f(0)=b$ です。よって $(u,b)$ は $\iota$ の像に入ります。従って $\ker\delta=\operatorname{im}\iota$、余核は $\mathbb F_p$ と同型です。$\mathbb F_p$ は有限なので定義から擬同型であり、余核が非零なので同型ではありません。
<!-- proof-end -->

この例から、擬同型で分類した結果を実際の同型へ勝手に強めてはいけないことが分かります。

## 4. 構造定理は何を保存するか

構造定理を読むには、一次元の「場所」に関する判定が必要です。素イデアル $\mathfrak q$ に属さない環の元は、局所化 $R_{\mathfrak q}$ で割れるようになります。$\mathfrak q$ での写像 $f_{\mathfrak q}$ が同型なら、その場所では核と余核が見えません。

<a id="prop-iwa5-local-pseudoiso"></a>

<!-- formal-statement-start -->
> **命題（擬同型の局所判定）**  
> $R=\mathbb Z_p[[T]]$ 上の有限生成加群 $M,N$ と $R$ 線形写像 $f:M\to N$ を取る。擬同型であることと、各高さ1素イデアル $\mathfrak q$ で次の写像が同型となることは同値である。

$$
f_{\mathfrak q}:M_{\mathfrak q}\longrightarrow N_{\mathfrak q}
$$
<!-- formal-statement-end -->

### 証明の見取り図

局所化は核・余核を保つ完全関手です。有限生成性により核・余核にも有限生成性があり、第2節の判定を適用できます。

<!-- proof-start -->
### 証明

$R$ はNoether環なので有限生成加群 $M$ の部分加群 $\ker f$ も有限生成であり、商 $\operatorname{coker}f$ も有限生成です。局所化は完全なので各 $\mathfrak q$ で

$$
\ker f_{\mathfrak q}=(\ker f)_{\mathfrak q},\qquad
\operatorname{coker}f_{\mathfrak q}=(\operatorname{coker}f)_{\mathfrak q}
$$

となります。$f_{\mathfrak q}$ が同型である必要十分条件は両者が零となることです。全高さ1でこれが成立する条件は、[擬零の定義](#def-iwa5-pseudonull)により核・余核が擬零であることに一致します。これは[擬同型の定義](#def-iwa5-pseudoisomorphism)そのものです。
<!-- proof-end -->

次の構造定理は本講の分類の到達点です。「既約元」とは単元でなく、二つの非単元の積に分解できない元です。同伴とは単元倍の違いだけの元であることをいいます。$p$ も $T$ も既約ですが、互いに同伴ではありません。

<a id="thm-iwa5-structure"></a>

<!-- formal-statement-start -->
> **定理（有限生成torsion岩澤加群の構造定理）**  
> 素数 $p$ と $R=\mathbb Z_p[[T]]$ を固定し、$M$ を有限生成torsion $R$ 加群とする。このとき、既約元 $q_i\in R$ と正整数 $e_i$ を適切に選び、擬同型

$$
M\longrightarrow E,\qquad
E=\bigoplus_{i=1}^s R/(q_i^{e_i})
$$

> が存在する。同じ既約元が異なる指数で複数回現れてよく、$(q_i,e_i)$ の多重集合は同伴と並べ替えを除いて一意である。$M=0$ または擬零加群の場合は $s=0$ とする。
<!-- formal-statement-end -->

### どの部分を証明するか

これは[IWA3の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)だけからは証明できず、前節で明示した **$R$ が2次元正則局所・一意分解整域であるという環論の入力**を使います。以下では、入力を仮定した上で、どのように擬同型が構成され、一意性が出るかを証明します。環論の入力とその一般的な証明は [Sharifi, *Iwasawa Theory*, Chapter 2](https://math.ucla.edu/~sharifi/notes/iwasawa-ch02.html) にあります。IWA6ではWeierstrass準備を導入して既約元を具体的な多項式の形で扱います。

### 証明の見取り図

各高さ1素イデアルで局所化すると、係数環は離散付値環になり、そこでは有限生成torsion加群を素元の冪による商の直和に分解できます。有限個の場所のデータを一つの写像へ戻し、残った核と余核が有限となることを確認します。

<!-- proof-start -->
### 証明

$M=0$ なら $E=0$ とすれば零写像は同型であり、定理が成り立ちます。以下 $M\ne0$ とします。[有限生成torsionの共通消去元](#prop-iwa5-common-annihilator)より、$0\ne a\in R$ が存在して $aM=0$ です。この $a$ が単元なら $M=0$ となって矛盾するため、$a$ は非単元です。$R$ は一意分解整域なので $a$ の既約因子は同伴を除き有限個 $q_1,\ldots,q_t$（$t\ge1$）です。$M_{\mathfrak q}$ が非零となる高さ1素イデアル $\mathfrak q$ は $a\in\mathfrak q$ を満たし、従って $\mathfrak q=(q_j)$ のいずれかです。

これら有限個の素イデアルの和集合の補集合を

$
S=R\setminus\bigcup_{j=1}^t(q_j)
$

とします。$S$ は積について閉じており、$S^{-1}R$ は $S$ の元を全て可逆にした環、$S^{-1}M$ はその環上の加群です。有限個の素イデアルに関する素イデアル回避と前述の環論の入力から、$S^{-1}R$ で残る非零素イデアルは $(q_j)$ を局所化したものだけで、いずれも極大です。従って $S^{-1}R$ は1次元Noether一意分解整域です。さらに、この環の非零イデアル $J$ は、各極大イデアル $(q_j)S^{-1}R$ で局所化すれば離散付値環のイデアルとなり、ある $n_j\ge0$ について $(q_j^{n_j})$ です。$a=\prod_{j=1}^tq_j^{n_j}$ と置けば、$J$ と $(a)$ は全ての極大イデアルで局所化すると一致し、従って $J=(a)$ です。ゆえに $S^{-1}R$ は全てのイデアルが主イデアルである主イデアル整域になります。主イデアル整域上の有限生成torsion加群の分類定理を $S^{-1}M$ に適用すると、ある正整数 $e_i$ と上の $q_j$ から選んだ $q_i$ に対し

$$
g:S^{-1}M\overset{\sim}{\longrightarrow}
\bigoplus_{i=1}^s S^{-1}R/(q_i^{e_i})
=S^{-1}E
$$

という同型が得られます。$R$ はNoether環で $M$ が有限生成なので $M$ は有限表示です。すなわち有限個の生成元だけでなく、それらの間の関係も有限個で生成されます。

そこで各生成元 $m_j$ の $g(m_j/1)$ を $e_j/s_j$（$e_j\in E$, $s_j\in S$）と表します。有限個の分母を掛け合わせた $s\in S$ により $s g(m_j/1)$ は $E$ の元で表されます。$m_j$ の有限個の関係式を代入した結果は局所化すると零になるため、各関係式を消す $S$ の元を選び、その積 $t\in S$ をさらに掛けます。すると $m_j\mapsto ts\,g(m_j/1)$ は全ての関係式を保ち、$R$ 線形写像 $f:M\to E$ を定義します。

局所化した $f$ は $ts\cdot g$ で、$ts$ は $S^{-1}R$ の単元なので同型です。とくに各高さ1素イデアルで $f_{\mathfrak q}$ は同型です。よって[局所判定](#prop-iwa5-local-pseudoiso)から $f$ は擬同型です。

最後に同じ構造を持つ $E,E'$ が存在すれば、各 $(q)$ で局所化した加群は離散付値環 $R_{(q)}$ 上の有限長torsion加群です。主イデアル整域の初等因子の一意性により、$(q)$ に対応する指数の多重集合が一致します。異なる高さ1素イデアルはそれぞれ別に検出されるので、全体の多重集合も一致します。
<!-- proof-end -->

この証明で外部から用いた結果は、環 $R$ のNoether性・次元2・一意分解性と高さ1での離散付値環性、および主イデアル整域の加群分類です。有限層の類群に対する有限生成torsion性を証明したわけではありません。

**具体例。** [第3節の写像](#prop-iwa5-residue-pseudoiso)から

$$
R/(pT)\ \text{と}\ R/(p)\oplus R/(T)
$$

は擬同型です。したがって、同型でない加群でも素元 $p,T$ の指数データは同じです。有限加群 $R/(p,T)$ を直和で付け加えても、このデータは変わりません。

## 5. torsionを判定する実用的な条件

有限生成という仮定は、torsion判定にも使えます。$TM$ は $T$ が掛かった元からなる部分加群で、$M/TM$ は $\gamma$ の作用を自明にした商です。この商は $R/(T)\simeq\mathbb Z_p$ 上の加群になります。

<a id="prop-iwa5-finite-coinvariants"></a>

<!-- formal-statement-start -->
> **命題（有限なT商からtorsionを導く）**  
> $R=\mathbb Z_p[[T]]$ 上の有限生成加群 $M$ について、$M/TM$ が有限集合なら $M$ はtorsionである。逆は一般に成り立たない。
<!-- formal-statement-end -->

### 証明の見取り図

$M/TM$ が有限なら、生成元の $p$ の十分大きな冪倍を $TM$ に押し込めます。これを有限個の連立線形関係にし、行列式で一つの非零消去元を作ります。

<!-- proof-start -->
### 証明

$M$ を $m_1,\ldots,m_r$ で生成します。$M/TM$ は有限な $\mathbb Z_p$ 加群です。有限な加法群に現れうる素数 $\ell\ne p$ の位数の元は、$\ell$ が $\mathbb Z_p$ の単元であるため零元しかありません。従って $M/TM$ は有限 $p$ 群であり、ある $a\ge1$ で $p^a(M/TM)=0$ です。従って各 $i$ について係数 $b_{ij}\in R$ を使って

$$
p^a m_i=T\sum_{j=1}^r b_{ij}m_j
$$

と書けます。列ベクトル $v=(m_1,\ldots,m_r)^{\mathsf T}$ と $r\times r$ 係数行列 $B=(b_{ij})$ を取ると、各生成元の関係式を並べた行列方程式は $(p^a I_r-TB)v=0$ です。この行列の余因子行列を左から掛ければ

$$
d(T)v=0,\qquad d(T)=\det(p^aI_r-TB)
$$

です。$d(0)=p^{ar}\ne0$ なので、$d(T)$ は零でない冪級数です。したがって全生成元を同じ非零元が消し、[有限生成torsionの共通消去元](#prop-iwa5-common-annihilator)から $M$ はtorsionです。

逆が成り立たない例は $M=R/(T)\simeq\mathbb Z_p$ です。$T$ が零として作用するため $M/TM=M$ で、これは有限ではありません。しかし $T$ が全てを消すのでtorsionです。
<!-- proof-end -->

[IWA4の類群逆極限](../IWA4/index.md#thm-iwa4-iwasawa-action)を $X$ とすると、$X/TX$ の有限性を別に証明できる場面ではこの命題が使えます。逆に $\Lambda$ が $X$ に作用するという事実**だけ**では、$X$ の有限生成性も、上の判定の仮定も出てきません。実際、$R=\varprojlim_{m,n}R/(p^m,\omega_n)$ 自身も[IWA3の岩澤代数・完備群環](../IWA3/index.md#def-iwa3-completed-group-ring)により有限環の逆極限ですが、$R$ はtorsionではありません。算術への適用には有限生成性とtorsion性を別途確かめる必要があります。

## 6. 演習：有限部分と非零消去元を区別する

### A1. 三つの商加群

$R=\mathbb Z_p[[T]]$ とする。$R$、$R/(p)$、$R/(T)$ の各加群が有限生成か、torsionかを判定し、理由を示せ。

- Level: A
- ID: IWA5-A1

<!-- solution-start -->
**詳細解答。** いずれも $1$ の像で生成できるので有限生成です。$R$ では $a\cdot1=a\ne0$（$a\ne0$）なのでtorsionではありません。$R/(p)$ では $p$ が全元を零にし、$R/(T)$ では $T$ が全元を零にするので、後二者はtorsionです。$R/(p)\simeq\mathbb F_p[[T]]$、$R/(T)\simeq\mathbb Z_p$ はともに無限集合です。ここでは元の個数ではなく $R$ の非零係数による消滅を判定しています。
<!-- solution-end -->

### A2. 共通消去元

$M=R/(p^2)\oplus R/(T^3)$ とする。各直和成分と $M$ 全体に対する非零消去元を一つずつ示せ。

- Level: A
- ID: IWA5-A2

<!-- solution-start -->
**詳細解答。** 第1成分は $p^2$、第2成分は $T^3$ で消えます。積 $p^2T^3$ は $R$ が整域なので非零です。任意の $(u,v)\in M$ に対して

$$
p^2T^3(u,v)=(T^3p^2u,\ p^2T^3v)=(0,0)
$$

となるので、[有限生成torsionの共通消去元](#prop-iwa5-common-annihilator)を直接確かめられました。
<!-- solution-end -->

### A3. 有限な商の位数

$F=R/(p,T^2)$ を $\mathbb F_p$ 加群として表示し、位数と $T$ の作用を求めよ。

- Level: A
- ID: IWA5-A3

<!-- solution-start -->
**詳細解答。** 係数を法 $p$ へ還元し $T^2=0$ とするので、任意の元は一意に $a+bT$（$a,b\in\mathbb F_p$）と書けます。従って $F\simeq\mathbb F_p\oplus\mathbb F_pT$、位数は $p^2$ です。$T(a+bT)=aT$ となり、$T$ の作用は一般には零でない一方 $T^2F=0$ です。$\mathfrak m^2=(p^2,pT,T^2)$ は $F$ を零にするので、[擬零と有限性](#prop-iwa5-pseudonull-finite)から擬零です。
<!-- solution-end -->

### A4. 有限なずれを見つける

$F=R/(p,T)$ として自然な写像 $0\to F$ の核と余核を求め、擬同型か同型か判定せよ。

- Level: A
- ID: IWA5-A4

<!-- solution-start -->
**詳細解答。** 定義域は零加群なので核も零です。像は $F$ の零部分加群だから余核は $F/0\simeq F$ です。$F\simeq\mathbb F_p$ は有限なので核・余核とも[擬零](#prop-iwa5-pseudonull-finite)です。従って[擬同型の定義](#def-iwa5-pseudoisomorphism)を満たします。余核が非零なので全射でなく、同型ではありません。
<!-- solution-end -->

### A5. $p$ 冪の有限加群

$M=R/(p^2,T)$ を求め、有限生成性、torsion性、擬零性を判定せよ。

- Level: A
- ID: IWA5-A5

<!-- solution-start -->
**詳細解答。** $T=0$ とすると $R/(T)\simeq\mathbb Z_p$ です。さらに $p^2=0$ として $M\simeq\mathbb Z_p/p^2\mathbb Z_p\simeq\mathbb Z/p^2\mathbb Z$。位数は $p^2$ です。$1$ の像で生成され、非零元 $p^2$ が全元を消すので有限生成torsionです。有限集合なので[擬零と有限性の命題](#prop-iwa5-pseudonull-finite)により擬零です。
<!-- solution-end -->

### B1. なぜ中国剰余定理を使い切れないか

$R/(pT)\to R/(p)\oplus R/(T)$ の剰余写像が単射であることを示し、全射でない具体的な組を一つ挙げ、その余核の位数を求めよ。

- Level: B
- ID: IWA5-B1

<!-- solution-start -->
**詳細解答。** $[f]$ が両成分で零なら $f=pa=Tb$ です。$\mathbb F_p[[T]]$ で $T[b]_p=0$ なので $b=pc$ と書け、$f=pTc$、従って核は零です。一方 $(0,1)\in R/(p)\oplus R/(T)$ は共通の $f$ から得られません。もし得られれば $f\bmod p=0$ から $f(0)\equiv0\pmod p$、$f\bmod T=1$ から $f(0)=1$ となって矛盾します。[余核の計算](#prop-iwa5-residue-pseudoiso)で示した差写像 $\delta(u,b)=u(0)-\bar b$ は全射で核が剰余写像の像なので、余核は $\mathbb F_p$、位数は $p$ です。
<!-- solution-end -->

### B2. 局所化が有限誤差を消す

$F=R/(p,T^2)$ とする。高さ1素イデアル $\mathfrak q$ において $F_{\mathfrak q}=0$ となることを直接示し、$F\to0$ が擬同型であると結論せよ。

- Level: B
- ID: IWA5-B2

<!-- solution-start -->
**詳細解答。** 高さ1素イデアル $\mathfrak q$ が $p$ を含まなければ $p$ が $R_{\mathfrak q}$ で可逆です。しかし $pF=0$ なので $F_{\mathfrak q}=0$。$p\in\mathfrak q$ なら $\mathfrak q=(p)$ です。ここで $T\notin(p)$ なので $T$ は可逆であり、$T^2F=0$ から再び $F_{\mathfrak q}=0$ です。全ての高さ1で零なので[擬零の定義](#def-iwa5-pseudonull)を満たします。$F\to0$ の核は $F$、余核は零ですから[擬同型](#def-iwa5-pseudoisomorphism)です。
<!-- solution-end -->

### B3. 有限な $T$ 商とtorsion

$M=R/(p^2+T)$ とする。$M/TM$ の位数を求め、非零消去元を挙げてtorsionと示せ。また、逆向きの含意が失敗する加群を説明せよ。

- Level: B
- ID: IWA5-B3

<!-- solution-start -->
**詳細解答。** $M/TM\simeq R/(T,p^2+T)$ です。$T=0$ を代入すると $p^2+T$ は $p^2$ になるので、この商は $\mathbb Z_p/(p^2)$、位数は $p^2$ です。$M$ は $1$ の像で生成され、$p^2+T\ne0$ が全元を消すのでtorsionです。これは[有限な $T$ 商の命題](#prop-iwa5-finite-coinvariants)の結論と一致します。逆向きの反例は $R/(T)$ で、$T$ が全てを消すのでtorsionですが $M/TM\simeq\mathbb Z_p$ は無限です。
<!-- solution-end -->

### B4. 有限生成性がどこで働くか

$R$ の $r$ 個の生成元 $m_i$ が $p^a m_i=T\sum_j b_{ij}m_j$ を満たすと仮定する。$r=2$ の場合に消去元の行列式を展開し、非零であることを確認せよ。

- Level: B
- ID: IWA5-B4

<!-- solution-start -->
**詳細解答。** $B=(b_{ij})_{1\le i,j\le2}$ に対して

$$
D=p^aI_2-TB=
\begin{pmatrix}
p^a-Tb_{11}&-Tb_{12}\\
-Tb_{21}&p^a-Tb_{22}
\end{pmatrix}.
$$

余因子行列を左から掛けると $\det(D)m_1=\det(D)m_2=0$ です。その行列式は

$$
\det(D)=p^{2a}-p^aT(b_{11}+b_{22})
+T^2(b_{11}b_{22}-b_{12}b_{21}).
$$

定数項は $p^{2a}\ne0$ なので $\det(D)$ は非零であり、二つの生成元を同時に消します。このように[有限な $T$ 商からのtorsion判定](#prop-iwa5-finite-coinvariants)では、有限個の生成元があるから正方行列の行列式を使えます。
<!-- solution-end -->

### C1. 擬同型による分類を実行する

$M=R/(pT)\oplus R/(T^2)\oplus R/(p,T)$ とし、$E=R/(p)\oplus R/(T)\oplus R/(T^2)$ とする。

1. $M$ が有限生成torsionであることを示せ。
2. $M\to E$ の擬同型を構成し、核と余核をそれぞれ求めよ。
3. $M$ と $E$ が同型であると結論してよいか検討せよ。
4. 有限部分を除くと残る既約元と指数を答えよ。

- Level: C
- ID: IWA5-C1

<!-- solution-start -->
**詳細解答。** 

1. $M$ は三つの巡回加群の直和なので3元で生成できます。第1成分を $pT$、第2成分を $T^2$、第3成分を $p$ で消せます。共通の非零消去元は例えば $pT^2$ です。$pT^2$ は $pT$、$T^2$、$p$ のいずれの倍数でもあるので全元を消し、[有限生成torsionの共通消去元](#prop-iwa5-common-annihilator)からtorsionです。

2. 第1成分に[剰余写像 $\iota$](#prop-iwa5-residue-pseudoiso)、第2成分に恒等写像、第3成分に零写像を用います。ここで $\iota(u)$ は $R/(p)\oplus R/(T)$ の2成分をまとめて表すので、$E$ の3成分表示では $\iota(u)$ の2成分に $v$ を続けます。

$$
f:M\longrightarrow E,\quad
(u,v,w)\longmapsto(\iota(u),v)
$$

と置きます。$\iota$ は単射なので $\ker f\simeq R/(p,T)\simeq\mathbb F_p$ です。$E/f(M)$ は $\iota$ の余核と同じで $\mathbb F_p$、従って $\operatorname{coker}f\simeq\mathbb F_p$ です。両者が有限なので[擬同型の定義](#def-iwa5-pseudoisomorphism)を満たします。

3. 擬同型の定義から核・余核が零になるとはいえません。構成した $f$ の核・余核はどちらも非零なので、**この写像は同型ではありません**。

   さらに、$M$ と $E$ 自体も同型ではありません。$E$ の各直和成分を調べます。$R/(T)$ は $\mathbb Z_p$ 上階数1、$R/(T^2)$ は基底 $1,T$ を持つ階数2の自由加群です。従って、この二つの成分は非零の有限部分加群を持ちません。

   $R/(p)=\mathbb F_p[[T]]$ でも、$T$ による乗法は単射です。もし非零の有限部分加群があれば、[擬零と有限性の命題](#prop-iwa5-pseudonull-finite)の証明によって $T$ のある冪がその有限部分加群を消します。これは $T$ の単射性に反します。従って $E$ に非零の有限部分加群はありません。

   一方、$M$ は $R/(p,T)\simeq\mathbb F_p$ を直和成分として含みます。有限部分加群を持つ性質は同型で保たれるので、$M\not\simeq E$ です。

4. [構造定理](#thm-iwa5-structure)で残る初等因子は $R/(p)$、$R/(T)$、$R/(T^2)$ の三つです。既約元と指数の多重集合は $(p,1),(T,1),(T,2)$ です。零と擬同型な有限成分 $R/(p,T)$ はこれに寄与しません。
<!-- solution-end -->

## 7. 次講への問い

擬同型は有限部分の影響を取り除き、有限生成torsion加群を素元の冪による基本ブロックへ分けます。しかし、一般の既約冪級数 $q(T)$ がどのような形を持つかはまだ分かりません。次の IWA6 では **Weierstrass準備定理**を導入し、$p$ の冪と distinguished 多項式を区別して特徴イデアルを定義します。こうして素因子のデータが類数の成長へつながります。

### 参考文献

- [Romyar Sharifi, *Iwasawa Theory*, Chapter 2: Module theory](https://math.ucla.edu/~sharifi/notes/iwasawa-ch02.html) — 擬零・擬同型と構造定理に必要な環論の入力。
- [B. Forrás, *Iwasawa Theory* 講義ノート](https://www.bforras.eu/docs/Forr%C3%A1s_Iwasawa_Theory_blue.pdf) — 有限生成torsion岩澤加群の分類と算術的応用の位置付け。
