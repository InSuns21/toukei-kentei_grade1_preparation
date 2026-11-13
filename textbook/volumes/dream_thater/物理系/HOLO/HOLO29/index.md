# HOLO29 消失訂正としてのバルク

<!-- definition-example-audit: strict -->

[HOLO27の部分領域演算子再構成](../HOLO27/index.md#def-holo27-subregion-reconstruction)では、境界領域に局在する演算子が符号空間上でバルク演算子と同じ働きをする、という条件を定義しました。[HOLO28のJLMS型模型](../HOLO28/index.md#thm-holo28-fixed-sector-jlms)では、境界とバルクの相対エントロピーが一致する例を計算しました。しかし「再構成できる」という主張に、**境界の一部が失われても論理情報を取り戻せる**という実質はあるのでしょうか。

[QINF28の消失訂正と秘密分散](../../../応用系/QINF/QINF28/index.md#thm-qinf28-qutrit)を使うと、この問いに有限次元で厳密に答えられます。本講で新しく計算するのは、復号器そのものの再証明ではなく、**同一の論理作用素が境界の異なる二つの部分領域に載る具体式**です。符号と量子重力の間に辞書を作りますが、この有限模型が一般のAdS/CFTの双対性を証明するわけではありません。

## 0. 何をバルク、何を境界と呼ぶか

量子重力の厳密な局所代数は使いません。論理qutrit（3準位系）$L=\mathbb C^3$ を「バルクの一つの論理自由度」に、物理qutrit $A,B,C$ を「境界の三つの区画」に見立てます。どの区画も3次元で、符号化は等長写像

$$
V:L\longrightarrow A\otimes B\otimes C,\qquad V^\dagger V=I_L
$$

です。記号 $A$ は物理部分系そのもの、$AB$ は $A\otimes B$ を表します。以下の添字計算はすべて $\mathbb Z_3=\{0,1,2\}$ で行います。連続場の自由度や幾何学的な境界領域を、この3個のqutritと同一視してはいけません。

有限次元密度行列を使い、エントロピーの対数は自然対数（単位 nat）にします。演算子の等式は**物理Hilbert空間全体**ではなく、必要なときには $V(L)$ 上での等式であることを明示します。重力側では大 $N$、小さい $G_N$ のコード部分空間に限定するという[HOLO6の制御条件](../HOLO6/index.md#def-holo6-controlled-window)と、[HOLO28のJLMSの適用規約](../HOLO28/index.md#def-holo28-jlms-dictionary)が別途必要です。

## 1. 消えた境界区画に情報を置かない

例えば $C$ が消えたとします。残る $AB$ から任意の未知の量子状態を回復できるなら、消えた $C$ の密度行列が入力によって変わってはいけません。これは単に直交する二つの符号語を識別できるかではなく、**重ね合わせの位相も漏れない**という条件です。

ここで「消失位置は既知」「消えた内容は未知」を区別します。[QINF28の消失チャネル](../../../応用系/QINF/QINF28/index.md#def-qinf28-erasure)は、消失した系を既知の標識状態に置換します。残る系だけで回復できるかという問題へ帰着します。

<a id="def-holo29-region-recovery"></a>

<!-- formal-statement-start -->
> **定義（境界部分領域の消失回復）**  
> 有限次元の等長写像 $V:L\to A\otimes B\otimes C$ と、物理部分系の部分集合 $R\subseteq\{A,B,C\}$ を固定する。その補集合を $E$ とし、入力密度行列 $\rho$ に対する保持側の縮約を
>
$$
\mathcal E_R(\rho)=\operatorname{Tr}_E(V\rho V^\dagger)
$$
>
> とする。$R$ のみを入力とする一つのCPTP写像 $\mathcal D_R:\mathcal B(\mathcal H_R)\to\mathcal B(L)$ が存在して、任意の論理状態 $\rho$ について
>
$$
\mathcal D_R(\mathcal E_R(\rho))=\rho
$$
>
> となるとき、論理系は領域 $R$ から**完全回復可能**という。復号写像は入力 $\rho$ に依存しない。量子回復は参照系とのもつれも保持することを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo29-region-recovery -->
**定義の確認**（直接例と反例）。 $L=A=\mathbb C^3$、$B=C=\mathbb C^3$ として $V|\psi\rangle=|\psi\rangle_A|0\rangle_B|0\rangle_C$ とすれば、$V^\dagger V=I_L$。保持領域 $A$ の縮約は $\mathcal E_A(\rho)=\rho$ なので、恒等チャネルが回復写像です。一方、$B$ だけを保持するとすべての入力が $|0\rangle\langle0|_B$ になり、異なる二つの入力を同じ出力から復元する写像はありません。領域の名前だけで可否は決まらず、**符号化 $V$ と保持領域 $R$ の組**で決まります。
<!-- definition-example-end -->

[消失訂正と消失系の状態独立性](../../../応用系/QINF/QINF28/index.md#thm-qinf28-erasure-privacy)によれば、有限次元の等長符号では、$E$ の消失を完全訂正できることと

$$
\operatorname{Tr}_R(V\rho V^\dagger)=\sigma_E
\quad\text{（すべての論理密度行列 $\rho$、同じ $\sigma_E$）}
$$

が同値です。ここで量化されるのは**全入力**です。特定の基底状態だけで同じ縮約を示しても、非対角成分から位相が漏れるかもしれません。

## 2. 三つの区画へ一つの量子自由度を分散する

[QINF28の3-qutrit符号](../../../応用系/QINF/QINF28/index.md#thm-qinf28-qutrit)を、そのままバルクと境界の有限模型として採用します。基底 $|j\rangle_L$ の像を

$$
V|j\rangle
=\frac1{\sqrt3}\sum_{i=0}^2
|i\rangle_A|i+j\rangle_B|i+2j\rangle_C,\qquad j\in\mathbb Z_3
$$

とします。例えば

$$
\begin{aligned}
V|0\rangle&=(|000\rangle+|111\rangle+|222\rangle)/\sqrt3,\\
V|1\rangle&=(|012\rangle+|120\rangle+|201\rangle)/\sqrt3,\\
V|2\rangle&=(|021\rangle+|102\rangle+|210\rangle)/\sqrt3 .
\end{aligned}
$$

各列の三項は直交し、異なる $j$ に対する三桁列は重複しません。そのため $V|j\rangle$ は正規直交し、$V^\dagger V=I_3$ です。

**一つの区画に何が残るか。** まず $A$ の部分トレースを省略せず計算します。$j,k\in\mathbb Z_3$ に対し、$BC$ の基底ラベルの一致条件は

$$
i+j=i'+k,\qquad i+2j=i'+2k\pmod3.
$$

後式から前式を引くと $j=k$、これを代入すると $i=i'$ です。従って

$$
\operatorname{Tr}_{BC}
\bigl(V|j\rangle\langle k|V^\dagger\bigr)
=\delta_{jk}\frac13\sum_{i=0}^2|i\rangle\langle i|
=\delta_{jk}\frac{I_A}{3}.
$$

$B$ を残すときには $AC$ の一致条件 $i=i'$、$i+2j=i'+2k$ から $2(j-k)=0$、すなわち $j=k$。$C$ を残すときは $AB$ の一致条件 $i=i'$、$i+j=i'+k$ から同じ結論になります。対角成分では $i+j$、$i+2j$ がいずれも3値を一度ずつ取ります。よってすべての $E=A,B,C$ について

$$
\operatorname{Tr}_{E^c}
\bigl(V|j\rangle\langle k|V^\dagger\bigr)
=\delta_{jk}I_E/3.
$$

任意の論理状態 $\rho=\sum_{jk}\rho_{jk}|j\rangle\langle k|$ に線形に拡張すると

$$
\operatorname{Tr}_{E^c}(V\rho V^\dagger)
=\sum_{jk}\rho_{jk}\delta_{jk}I_E/3
=(\operatorname{Tr}\rho)I_E/3=I_E/3.
$$

したがって[QINF28の消失・秘匿同値定理](../../../応用系/QINF/QINF28/index.md#thm-qinf28-erasure-privacy)の全入力条件を満たし、どの**一つ**の区画が消えても残り二つから回復できます。これは基底情報だけでなく位相を含む結論です。

**二つの区画を失う場合は失敗する。** たとえば $BC$ を失って $A$ だけが残れば、$|0\rangle\langle0|$ と $|1\rangle\langle1|$ のどちらを符号化しても $I_A/3$。一つのCPTP復号写像で同じ行列を二つの異なる入力へ戻すことは不可能です。

## 3. 復号できることを、演算子の式として書く

ここまでは[QINF28の符号定理](../../../応用系/QINF/QINF28/index.md#thm-qinf28-qutrit)の再検算です。ホログラフィーで欲しいのは、論理状態の回復だけでなく、例えば論理観測量が**どの境界の組から測れるか**という演算子の構成です。

各qutritの正規直交基底を $|0\rangle,|1\rangle,|2\rangle$ とし、$\omega=e^{2\pi i/3}$ を固定します。1 qutritのシフト作用素 $X$ と位相作用素 $Z$ を

$$
X|j\rangle=|j+1\rangle,\qquad
Z|j\rangle=\omega^j|j\rangle
$$

で定めます。両者はユニタリで、$X^3=Z^3=I$、$ZX=\omega XZ$ です。$X_A$ は $A$ のみに作用し、他の因子では恒等であることを表します。

今欲しい「境界上の表現」は、物理的な演算子を符号語へ作用させたとき、論理演算子を先に作用させてから符号化した場合と一致することです。

<a id="def-holo29-pair-representation"></a>

<!-- formal-statement-start -->
> **定義（部分領域上の論理演算子表現）**  
> 有限次元等長符号 $V:L\to R\otimes E$ に対し、論理作用素 $O\in\mathcal B(L)$ の**領域 $R$ 上の表現**とは、$R$ 上の作用素 $O_R$ で
>
$$
(O_R\otimes I_E)V=VO
$$
>
> を満たすものをいう。この式は符号空間上での作用を指定し、符号空間の外における $O_R$ を一意には定めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo29-pair-representation -->
**定義の確認**。 前節の単純な符号 $V|\psi\rangle=|\psi\rangle_A|00\rangle_{BC}$ で、論理 $Z_L|j\rangle=\omega^j|j\rangle$ に対し $Z_A$ は $Z_A V|j\rangle=\omega^jV|j\rangle=VZ_L|j\rangle$ を全3基底で満たします。線形性により任意の論理ベクトルでも成立します。一方 $Z_B$ は符号語上で常に恒等の作用をするので、$Z_L$ の表現ではありません。
<!-- definition-example-end -->

ここで二shareの復号を基底の可逆変換として書きます。保持する2つのラベルから論理ラベル $j$ と補助ラベル $t$ を取り出すため、次を使います。

| 保持系 $R$ | 入力ラベル | 論理ラベル $j$ | 補助ラベル $t$ |
| --- | --- | --- | --- |
| $AB$ | $(a,b)$ | $b-a$ | $2b-a$（消えた $C$） |
| $AC$ | $(a,c)$ | $2(c-a)$ | $2c-a$（消えた $B$） |
| $BC$ | $(b,c)$ | $c-b$ | $2b-c$（消えた $A$） |

各行の $(j,t)$ への写像は $\mathbb Z_3^2$ の全単射です。たとえば $AB$ なら逆写像が $a=t-2j,b=t-j$ です。$AC$ なら $a=t-j,c=t+j$、$BC$ なら $b=t+j,c=t+2j$。よって各行は9個の基底を置換するユニタリ $U_R: R\to L\otimes G$ を定めます。補助qutritを $G$ と呼びます。

符号語へ $U_R$ を作用させると、[QINF28の復号計算](../../../応用系/QINF/QINF28/index.md#thm-qinf28-qutrit)で確認したように、どの行でも

$$
(U_R\otimes I_E)V|j\rangle
=|j\rangle_L\otimes|\Phi_3\rangle_{GE},
\qquad
|\Phi_3\rangle=\frac1{\sqrt3}\sum_{t=0}^2|t\rangle_G|t\rangle_E
$$

となります。右辺の $GE$ は $j$ に依存しません。ゆえに $U_R$ の後で $G$ を捨てるという**同一の復号**が、任意の入力と参照系へのもつれを保ちます。

## 4. 三つの異なる境界表現を手で検算する

$X_L,Z_L$ の境界表現を実際に構成します。$X_R$ は、表の $(j,t)$ のうち $j$ を1増やし $t$ を保つように物理ラベルを変化させれば得られます。一方 $Z_R$ は $j$ の値を位相として読むだけです。この方法なら「どの行列を選んだのか」が復号表から追えます。

<a id="thm-holo29-three-representations"></a>

<!-- formal-statement-start -->
> **定理（三つの二領域における同一論理代数の表現）**  
> 第2節の等長符号 $V:\mathbb C^3\to(\mathbb C^3)^{\otimes3}$ に対し、局所qutritの $X,Z$ を第3節のように定める。次の各組は、物理系の表示において異なる部分系にだけ作用する。
>
$$
\begin{aligned}
X_{AB}&=X_A X_B^2,&Z_{AB}&=Z_A^2Z_B,\\
X_{AC}&=X_A^2 X_C,&Z_{AC}&=Z_AZ_C^2,\\
X_{BC}&=X_B X_C^2,&Z_{BC}&=Z_B^2Z_C .
\end{aligned}
$$
>
> 各 $R=AB,AC,BC$ について
>
$$
X_RV=VX_L,\qquad Z_RV=VZ_L.
$$
>
> 従って任意の $O\in\mathcal B(L)$ は、各領域 $R$ にのみ支持を持つ表現 $O_R$ を持ち、$O_RV=VO$ を満たす。等式は符号空間上でのものとする。
<!-- formal-statement-end -->

**証明の見取り図。** $AB$ の二つのラベル $(a,b)$ を変える際、$j=b-a$ を1増やし $t=2b-a$ を保存する連立一次方程式を解きます。$AC,BC$ も同じ考え方で解き、$Z_R$ の位相は表の $j$ の式を使います。最後に $X_L^mZ_L^n$（$m,n=0,1,2$）の9個が全3行3列行列を張ることを示します。

<!-- proof-start -->
### 証明

**(i) $AB$。** $X_A^{\Delta a}X_B^{\Delta b}$ でラベルを変えると

$$
\Delta j=\Delta b-\Delta a,\qquad
\Delta t=2\Delta b-\Delta a\pmod3.
$$

$\Delta j=1,\Delta t=0$ を解くと、第二式から $\Delta a=2\Delta b$、第一式から $-\Delta b=1$、従って $\Delta b=2,\Delta a=1$。よって $X_{AB}=X_AX_B^2$ です。各符号語の和の項は

$$
|i,i+j,i+2j\rangle
\longmapsto|i+1,i+j+2,i+2j\rangle.
$$

$i'=i+1$ とおくと $i+j+2=i'+(j+1)$、$i+2j=i'+2(j+1)$（両式ともmod 3）。従って和を取り直すと $X_{AB}V|j\rangle=V|j+1\rangle$。また $Z_A^2Z_B$ の位相は $\omega^{2i+(i+j)}=\omega^j$ なので $Z_{AB}V|j\rangle=\omega^jV|j\rangle$。

**(ii) $AC$。** 第3節の表から $j=2(c-a),t=2c-a$ です。$\Delta j=1,\Delta t=0$ は

$$
2(\Delta c-\Delta a)=1,\qquad 2\Delta c-\Delta a=0.
$$

第二式より $\Delta a=2\Delta c$。第一式は $-2\Delta c=1$、すなわち $\Delta c=1,\Delta a=2$ となります。そこで $X_{AC}=X_A^2X_C$。入力項 $(a,c)=(i,i+2j)$ に対し新しい $(a',c')=(i+2,i+2j+1)$ です。$i'=i+2$ とすると

$$
i'+2(j+1)=i+2+2j+2=i+2j+1\pmod3.
$$

$B$ のラベルも $i'+(j+1)=i+2+j+1=i+j$ で不変です。従って $X_{AC}V|j\rangle=V|j+1\rangle$。位相作用素 $Z_AZ_C^2$ は $\omega^{i+2(i+2j)}=\omega^{3i+4j}=\omega^j$ を掛けるので $Z_{AC}V=VZ_L$。

**(iii) $BC$。** $j=c-b,t=2b-c$ を使い、$\Delta j=1,\Delta t=0$ を解くと

$$
\Delta c-\Delta b=1,\qquad2\Delta b-\Delta c=0
\quad\Longrightarrow\quad
\Delta b=1,\ \Delta c=2.
$$

従って $X_{BC}=X_BX_C^2$ は、$(i,i+j,i+2j)$ を $(i,i+j+1,i+2j+2)$ へ移し、そのまま $V|j+1\rangle$ の項です。$Z_B^2Z_C$ の位相は

$$
\omega^{2(i+j)+(i+2j)}=\omega^{3i+4j}=\omega^j.
$$

従って $Z_{BC}V=VZ_L$。

**(iv) 全論理演算子。** $X_L^mZ_L^n$（$m,n\in\mathbb Z_3$）の9個は、Hilbert–Schmidt内積で互いに直交します。実際、$m\ne p$ のとき $(X^mZ^n)^\dagger X^pZ^q$ には非自明なシフト $X^{p-m}$ が含まれ、対角要素がすべて零です。$m=p$ のときトレースは位相因子を除いて

$$
\operatorname{Tr} Z^{q-n}
=\sum_{j=0}^2\omega^{(q-n)j}
=\begin{cases}3&(q=n),\\0&(q\ne n).\end{cases}
$$

となります。従って3×3複素行列全体の9次元空間の基底です。任意の $O$ を

$$
O=\sum_{m,n=0}^2c_{mn}X_L^mZ_L^n
$$

と一意に展開し、各領域で

$$
O_R=\sum_{m,n=0}^2c_{mn}X_R^mZ_R^n
$$

と定義します。(i)〜(iii)の等式を積と線形結合へ順に適用すれば $O_RV=VO$。各 $O_R$ は指定した二つの物理区画のみに作用します。
<!-- proof-end -->

**直接例：同じ測定を違う境界で行う。** 論理状態 $|1\rangle_L$ を符号化した $V|1\rangle$ について、$AB$ の $Z_A^2Z_B$ は $\omega$ を、$AC$ の $Z_AZ_C^2$ も $\omega$ を、$BC$ の $Z_B^2Z_C$ も $\omega$ を固有値として与えます。例えば $V|1\rangle=(|012\rangle+|120\rangle+|201\rangle)/\sqrt3$ の第1項 $|012\rangle$ に $Z_AZ_C^2$ を作用させると位相は $\omega^{0+2\cdot2}=\omega$。他の2項でも $\omega$ です。別の境界領域の同じ論理作用素という意味は、符号語に制限したこの等式です。

同じ物理演算子の支持が3組に同時にあるのではありません。**異なる物理演算子が、符号空間に制限すると同じ論理作用をする**のです。

## 5. 消失・相対エントロピー・くさびの対応範囲

先ほどの復号基底を使えば、二つの区画を保持した状態は

$$
U_R\,\operatorname{Tr}_E(V\rho V^\dagger)\,U_R^\dagger
=\rho_L\otimes I_G/3
$$

となります。導出は、第3節の $(U_R\otimes I_E)V|j\rangle=|j\rangle|\Phi_3\rangle$ を $|j\rangle\langle k|$ ごとに外積にし、$E$ を部分トレースすることです。すると $|j\rangle\langle k|\otimes I_G/3$ となり、$\rho$ の成分で足せば上式です。

<a id="prop-holo29-entropy-model"></a>

<!-- formal-statement-start -->
> **命題（二領域の情報保存と定数エントロピー項）**  
> 第2節の3-qutrit符号において $R=AB,AC,BC$、$E=R^c$ とする。任意の論理密度行列 $\rho$ について、自然対数のエントロピーは
>
$$
S(\mathcal E_R(\rho))=S(\rho)+\log3
$$
>
> である。任意の二つの論理密度行列 $\rho,\sigma$ について、台包含が成り立つなら
>
$$
D(\mathcal E_R(\rho)\Vert\mathcal E_R(\sigma))
=D(\rho\Vert\sigma).
$$
>
> 台包含が成立しなければ、両辺とも $+\infty$ と解釈する。
<!-- formal-statement-end -->

**証明の見取り図。** ユニタリ $U_R$ で状態を $\rho\otimes I_3/3$ へ直し、積の固有値を数えます。対数の差に最大混合因子が同じものとして現れるため、相対エントロピーでは $\log3$ が相殺します。これは[HOLO28の固定セクターJLMS型等式](../HOLO28/index.md#thm-holo28-fixed-sector-jlms)の具体的な消失符号による別の実現です。

<!-- proof-start -->
### 証明

$\rho$ の固有値を $r_i\ge0$（$\sum_ir_i=1$）とすると、$\rho\otimes I_3/3$ の固有値は各 $r_i/3$ が3回です。$0\log0=0$ とおき

$$
S(\mathcal E_R(\rho))
=-\sum_i3\frac{r_i}3\log\frac{r_i}3
=-\sum_ir_i\log r_i+\log3.
$$

相対エントロピーではユニタリ共役不変性を用い、$I_3/3$ が同じ両状態について

$$
\begin{aligned}
D(\rho\otimes I_3/3\Vert\sigma\otimes I_3/3)
&=\operatorname{Tr}\bigl[(\rho\otimes I_3/3)
(\log\rho\otimes I_3-\log\sigma\otimes I_3)\bigr]\\
&=D(\rho\Vert\sigma).
\end{aligned}
$$

正定値の $\sigma=\sum_i s_i|i\rangle\langle i|$（$s_i>0$）を対角化すると、積の固有値は $s_i/3$ なので

$
\log(\sigma\otimes I_3/3)
=(\log\sigma)\otimes I_3-(\log3)I.
$

この表示を相対エントロピーのトレースへ代入すると、共通の $-\log3$ が差で消えます。非可逆でも $\operatorname{supp}\rho\subseteq\operatorname{supp}\sigma$ のとき両対数を台へ制限すれば同じ計算です。包含しなければ $I_3/3$ が全台であるため、両側とも同じ台包含違反となり $+\infty$ です。
<!-- proof-end -->

二領域へ載る演算子の構成と、この状態情報の保存が一致することを模型内で確認しました。ただし、この模型の $\log3$ は**補助qutritとの最大もつれが作る定数**であり、重力の面積を計算した値ではありません。[HOLO28のセクター依存の中心項](../HOLO28/index.md#def-holo28-sector-area)や、[HOLO24の一般化エントロピー](../HOLO24/index.md#def-holo24-generalized-entropy)を一般の重力で同一視するには、幾何・反項・近似次数を別に指定する必要があります。

| 有限模型で完全に証明したこと | ホログラフィーへ持ち込むときに別途必要なこと |
| --- | --- |
| 任意の一物理qutritの消失を完全訂正できる | 境界領域と補領域の量子代数の取り方、共通のコード部分空間 |
| 同一の $O_L$ に $O_{AB},O_{AC},O_{BC}$ がある | バルク演算子が幾何学的なentanglement wedgeに属するという特定 |
| 相対エントロピーと定数エントロピー項の等式 | [JLMSの半古典近似条件](../HOLO28/index.md#def-holo28-jlms-dictionary)、UV正則化、面積反項 |
| 一shareだけでは全論理情報を復元できない | 重力の一般的な境界部分領域にしきい値「2/3」があるわけではない |

また、$AB$ と $BC$ という二つの**重なり合う**集合がどちらも復元できることは、未知の量子状態の複製を意味しません。重なりを除いた $A$ と $C$ はそれぞれ $I_3/3$ しか持たず、独立した二つのコピーを作れません。これは[QINF28のしきい値秘密分散](../../../応用系/QINF/QINF28/index.md#thm-qinf28-qutrit)がno-cloningと矛盾しない仕組みです。

## 6. 演習と詳細解答

以下では、断らない限り第2節の $V$、第3節の $X,Z,\omega$、第4節の三組の物理演算子を使い、すべての添字をmod 3で計算します。論理系・各物理系は3次元です。

### Level A：定義と行列要素を自分で確認する

<a id="ex-holo29-a01"></a>
### 演習 HOLO29-A01：等長写像と九つの三桁列
- Level: A

符号語 $V|0\rangle,V|1\rangle,V|2\rangle$ を列挙し、$V^\dagger V=I_3$ を内積から示せ。

<!-- solution-start -->
**詳細解答。** 第2節の式で $j=0,1,2$ と $i=0,1,2$ を代入すると、それぞれ $\{000,111,222\}$、$\{012,120,201\}$、$\{021,102,210\}$ を得る。同じ組の3項は標準基底として直交し、係数の二乗和は $3(1/3)=1$。異なる組の三桁列に重複がないので $\langle j|V^\dagger V|k\rangle=\langle Vj|Vk\rangle=\delta_{jk}$。3次元空間で全行列要素が単位行列と一致するため $V^\dagger V=I_3$。
<!-- solution-end -->

<a id="ex-holo29-a02"></a>
### 演習 HOLO29-A02：失われた $C$ の縮約
- Level: A

$j,k\in\mathbb Z_3$ に対して $\operatorname{Tr}_{AB}(V|j\rangle\langle k|V^\dagger)$ を求めよ。論理重ね合わせ $\frac1{\sqrt2}(|0\rangle+|1\rangle)$ に対する $C$ の状態も求めよ。

<!-- solution-start -->
**詳細解答。** $AB$ のラベルが一致するには $i=i'$、$i+j=i'+k$ が必要で、これより $j=k$。従って

$$
\operatorname{Tr}_{AB}(V|j\rangle\langle k|V^\dagger)
=\delta_{jk}\frac13\sum_{i=0}^2|i+2j\rangle\langle i+2j|
=\delta_{jk}I_C/3.
$$

重ね合わせの密度行列は $(|0\rangle\langle0|+|0\rangle\langle1|+|1\rangle\langle0|+|1\rangle\langle1|)/2$。非対角二項は上式で零、対角二項は各 $I_C/3$。従って縮約は $I_C/3$。振幅だけでなく相対位相も失われている。
<!-- solution-end -->

<a id="ex-holo29-a03"></a>
### 演習 HOLO29-A03：$AB$ の復号座標
- Level: A

$(a,b)\mapsto(j,t)=(b-a,2b-a)$ の逆変換を求め、9個の基底が一対一に移ることを説明せよ。$\Delta j=1,\Delta t=0$ に対応する $(\Delta a,\Delta b)$ も求めよ。

<!-- solution-start -->
**詳細解答。** $t-j=(2b-a)-(b-a)=b$、$t-2j=(2b-a)-2(b-a)=a$。従って $a=t-2j,b=t-j$。任意の $(j,t)$ に逆像がちょうど一つあるので9個の標準基底の置換はユニタリを定める。また

$$
\Delta b-\Delta a=1,\quad2\Delta b-\Delta a=0
\quad\Longrightarrow\quad\Delta b=2,\ \Delta a=1
$$

（mod 3）。よって対応する局所シフトは $X_AX_B^2$。
<!-- solution-end -->

<a id="ex-holo29-a04"></a>
### 演習 HOLO29-A04：位相の三領域表現
- Level: A

$j=2$ の符号語に $Z_A^2Z_B$、$Z_AZ_C^2$、$Z_B^2Z_C$ をそれぞれ作用させ、いずれも $\omega^2V|2\rangle$ になることを各項の指数から示せ。

<!-- solution-start -->
**詳細解答。** 符号語の一般項は $|i,i+2,i+4\rangle$。3種類の位相指数は、それぞれ

$$
2i+(i+2)=3i+2,\qquad
i+2(i+4)=3i+8,\qquad
2(i+2)+(i+4)=3i+8.
$$

いずれもmod 3で $2$。したがって三項すべてに共通して $\omega^2$ が掛かり、和全体も $\omega^2V|2\rangle$ になる。
<!-- solution-end -->

<a id="ex-holo29-a05"></a>
### 演習 HOLO29-A05：復号不能な集合
- Level: A

$A$ 一つだけが残るとき、$|0\rangle$ と $|1\rangle$ を区別する完全復号がないことを線形写像の性質から証明せよ。

<!-- solution-start -->
**詳細解答。** 第2節の縮約計算から、二つの入力に対する保持状態はどちらも $\mathcal E_A(|0\rangle\langle0|)=\mathcal E_A(|1\rangle\langle1|)=I_A/3$。一つの復号チャネル $\mathcal D_A$ が両方を完全復元するなら、同一入力 $I_A/3$ から同時に $|0\rangle\langle0|$ と $|1\rangle\langle1|$ を出力することになる。しかし写像は入力に対して一意の出力を持つため不可能。異なる入力に対して別の復号を選ぶことは定義違反である。
<!-- solution-end -->

### Level B：論理作用と回復の構成

<a id="ex-holo29-b01"></a>
### 演習 HOLO29-B01：$AC$ に局在する論理 $X$
- Level: B

$AC$ の復号座標から $(\Delta a,\Delta c)$ を導き、$X_A^2X_C V|j\rangle=V|j+1\rangle$ を一般の $j$ について検算せよ。

<!-- solution-start -->
**詳細解答。** $j=2(c-a),t=2c-a$ なので、$2(\Delta c-\Delta a)=1,2\Delta c-\Delta a=0$。後式から $\Delta a=2\Delta c$ を前式へ代入して $-2\Delta c=1$、ゆえに $(\Delta a,\Delta c)=(2,1)$。左辺の各項は

$$
|i,i+j,i+2j\rangle\mapsto|i+2,i+j,i+2j+1\rangle.
$$

$i'=i+2$ と置けば、第2成分は $i'+(j+1)=i+j+3=i+j$、第3成分は $i'+2(j+1)=i+2j+4=i+2j+1$（mod 3）。よって和は $V|j+1\rangle$ と一致する。ここでは $B$ に全く作用していない。
<!-- solution-end -->

<a id="ex-holo29-b02"></a>
### 演習 HOLO29-B02：$BC$ の表現とWeyl関係
- Level: B

$BC$ に局在する $X_{BC}=X_BX_C^2$、$Z_{BC}=Z_B^2Z_C$ が $Z_{BC}X_{BC}V=\omega X_{BC}Z_{BC}V$ を満たすことを、論理基底への作用で示せ。

<!-- solution-start -->
**詳細解答。** 第4節の各ラベル計算より $X_{BC}V|j\rangle=V|j+1\rangle$、$Z_{BC}V|j\rangle=\omega^jV|j\rangle$。従って

$$
Z_{BC}X_{BC}V|j\rangle
=Z_{BC}V|j+1\rangle
=\omega^{j+1}V|j+1\rangle
$$

であり、逆順なら

$$
X_{BC}Z_{BC}V|j\rangle
=\omega^jX_{BC}V|j\rangle
=\omega^jV|j+1\rangle.
$$

両式の比は $\omega$。全3基底で成立するので符号空間上の等式を得る。これは異なる領域上の作用素同士が物理空間全体で可換だという主張ではない。
<!-- solution-end -->

<a id="ex-holo29-b03"></a>
### 演習 HOLO29-B03：入力と参照系を同時に回復
- Level: B

参照qutrit $Q$ と論理系 $L$ のもつれ状態 $|\Psi\rangle_{LQ}=\sum_{j=0}^2\alpha_j|j\rangle_L|j\rangle_Q$（$\sum_j|\alpha_j|^2=1$）を符号化し、$C$ を失ったとき $U_{AB}$ の後で補助系を捨てると $|\Psi\rangle\langle\Psi|_{LQ}$ が残ることを示せ。

<!-- solution-start -->
**詳細解答。** 符号化後の純粋状態は $\sum_j\alpha_jV|j\rangle_{ABC}|j\rangle_Q$。[QINF28の二領域復号式](../../../応用系/QINF/QINF28/index.md#thm-qinf28-qutrit)を各 $j$ に使うと

$$
(U_{AB}\otimes I_{CQ})\sum_j\alpha_jV|j\rangle|j\rangle_Q
=\left(\sum_j\alpha_j|j\rangle_L|j\rangle_Q\right)
\otimes\frac1{\sqrt3}\sum_{t=0}^2|t\rangle_G|t\rangle_C.
$$

右辺は $LQ$ と $GC$ の積状態なので、$C$ が失われた後に $G$ を捨てても $LQ$ の密度行列は $|\Psi\rangle\langle\Psi|$ のまま。これにより単一基底だけでなく参照系とのコヒーレンスを保持する。
<!-- solution-end -->

<a id="ex-holo29-b04"></a>
### 演習 HOLO29-B04：二領域のエントロピー
- Level: B

論理状態 $\rho=\operatorname{diag}(1/2,1/2,0)$ と参照状態 $\sigma=I_3/3$ を使い、$R=AB$ の縮約エントロピーと相対エントロピーを求めよ。$\rho$ に零固有値があることが障害になるかも答えよ。

<!-- solution-start -->
**詳細解答。** $U_{AB}\rho_{AB}U_{AB}^\dagger=\rho\otimes I_3/3$ で、非零固有値は $1/6$ が6個。従って

$$
S(\rho_{AB})=-6(1/6)\log(1/6)=\log6
=S(\rho)+\log3.
$$

参照状態は $\sigma_{AB}$ を復号表示で $I_9/9$ に移す。$\rho$ は階数2だが $\sigma>0$ なので台包含を満たし、

$$
D(\rho_{AB}\Vert\sigma_{AB})
=6(1/6)\log\frac{1/6}{1/9}
=\log(3/2)
=D(\rho\Vert I_3/3).
$$

零固有値があるのは比較される $\rho$ 側なので、$0\log0=0$ と扱えばよい。逆に参照状態の台から外れる場合にのみ無限大の問題が起こる。
<!-- solution-end -->

### Level C：複数領域の再構成を同時に監査する

<a id="ex-holo29-c01"></a>
### 演習 HOLO29-C01：同じバルク情報をいくつの境界から得られるか
- Level: C

第2節の3-qutrit符号で、次をすべて示せ。

1. $AB,AC,BC$ はいずれも全論理行列を表現できるが、$A,B,C$ はいずれも完全復号不能である。
2. 二領域の相対エントロピーは論理相対エントロピーと一致する。二つの論理状態の台が包含されない場合も扱え。
3. $AB$ と $BC$ の復号可能性から二つの独立した論理qutritの複製を結論してはいけない理由を述べよ。
4. この計算から、一般の重力のentanglement wedge再構成とRT面積公式が証明されたと言えない理由を、必要な追加仮定とともに述べよ。

<!-- solution-start -->
**詳細解答。**

**(1)** 第4節の $X_R,Z_R$ は各二領域に局在し、$X_RV=VX_L,Z_RV=VZ_L$ を満たす。$X_L^mZ_L^n$ の9個が行列空間を張るので、線形結合で任意の $O_L$ に対応する $O_R$ が作れる。状態回復については第3節の $U_R$ が $V|j\rangle$ を $|j\rangle|\Phi_3\rangle$ へ写すため、補助系の廃棄を経て任意の $\rho$ を戻せる。一方、単一領域の縮約は第2節の非対角成分の消滅計算によりすべて $I_3/3$。たとえば異なる $|0\rangle\langle0|,|1\rangle\langle1|$ を区別できず完全復号不能。

**(2)** 上の $U_R$ から $\mathcal E_R(\rho)$ は $\rho\otimes I_3/3$ とユニタリ同値である。$\sigma$ についても同じ $U_R$ が使える。従って

$$
D(\mathcal E_R(\rho)\Vert\mathcal E_R(\sigma))
=D(\rho\otimes I_3/3\Vert\sigma\otimes I_3/3)
=D(\rho\Vert\sigma).
$$

最後は台包含の下で $\log(\sigma\otimes I_3/3)=\log\sigma\otimes I_3-(\log3)I$ を代入し、同じ $\log3$ を打ち消したもの。台が包含されない場合、$\operatorname{supp}(\rho\otimes I_3/3)=\operatorname{supp}\rho\otimes\mathbb C^3$ で同様に $\sigma$ と比較でき、両方とも $+\infty$。

**(3)** $AB$ と $BC$ は $B$ を共有する。二つの復号写像を独立の二組の物理qutritに同時適用できるわけではない。重なりのない $A$ と $C$ だけでは各縮約が $I_3/3$ であり、独立した完全コピーを作る根拠がない。三つのshareのうち2つを回復可能な集合とする純粋秘密分散は複製禁止に反しない。

**(4)** この模型は有限個のqutritの厳密な等長符号で、Lorentz時空・重力の拘束・面積・量子極値曲面を持たない。重力側の対応を述べるには、共通の状態族・コード部分空間、適切なUV正則化、特定境界領域とその[エンタングルメントくさび](../HOLO25/index.md#def-holo25-entanglement-wedge)の幾何学的対応、大 $N$ と半古典展開、[JLMSの適用条件](../HOLO28/index.md#def-holo28-jlms-dictionary)などが必要。したがってここで証明したのは「消失訂正が部分領域再構成の機構を与える」ことであり、一般のRT/HRT公式やentanglement wedge再構成定理ではない。
<!-- solution-end -->

## 7. 次講へ：なぜ直和と中心が必要か

本講では一つの論理qutritの**全演算子**が二領域のそれぞれに載り、一定の $\log3$ がエントロピーに現れました。しかし重力の面積は状態によって変わり得ます。すると「どの演算子が回復されるか」を、全行列代数だけで記述するのは十分でしょうか。

次のHOLO30では、[HOLO28の直和セクターと面積型中心作用素](../HOLO28/index.md#def-holo28-sector-area)を出発点に、すべての論理演算子ではなく**部分代数だけを回復する**状況を調べます。有限次元で中心とセクターを組み立て、現実の重力に持ち込む際の条件をさらに明確にします。
