# AQFT13 巡回性・分離性・局所性

[AQFT12のReeh–Schlieder定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)では、正エネルギー・真空不変性・弱加法性・全域巡回性を仮定すると、どんな非空有界double coneでも局所演算子を真空に作用させて全Hilbert空間を稠密に生成できると分かりました。しかし、**演算子が真空を零に送ったら、その演算子自体が零なのか**は、これとは別の問いです。

この問いに答える性質を「分離性」と呼びます。巡回性だけでは分離性を導けません。一方、別の場所にある演算子が元の演算子と交換し、そこで真空が巡回的なら、零作用素であることを証明できます。ここでは、局所性がまさにその橋を架けることを、定義・有限次元計算・一般の証明・反例を通じて学びます。

舞台は計量符号 $(-,+,+,+)$ の四次元Minkowski時空です。複素Hilbert空間の内積は第2変数線形、$\Omega$ は単位ベクトルとします。[AQFT9の局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net)を $\mathcal M(O)\subset B(\mathcal H)$ と書きます。領域 $O$ の[開いた因果補集合](../AQFT1/index.md#def-aqft1-causal-complement)は $O^\perp$ と記します。局所von Neumann環の分離性とHaag双対性は異なるので、等号の問題は次講で扱います。

## 1. 巡回的なのに分離的でないことがある

[AQFT12の巡回ベクトル](../AQFT12/index.md#def-aqft12-cyclic-vector)とは、$\overline{\mathcal N\Omega}=\mathcal H$ を満たすベクトルです。これは **$A\Omega$ として作れるベクトルが多い** という性質です。対して、$A\Omega=0$ を満たす作用素 $A\in\mathcal N$ が零以外にもあるかを調べたいのです。

まず $\mathcal H=\mathbb C^2$ の標準正規直交基底 $e_1=(1,0)$、$e_2=(0,1)$ を取り、$\Omega=e_1$、$\mathcal N=B(\mathbb C^2)$ とします。この基底では $B(\mathbb C^2)$ の元は任意の $2\times2$ 複素行列で、$e_1$ に作用させると行列の第1列が得られます。従って任意の $v=(v_1,v_2)$ に対し
$$
A_v=\begin{pmatrix}v_1&0\\v_2&0\end{pmatrix},
\qquad A_v\Omega=v
$$
なので $\mathcal N\Omega=\mathbb C^2$ です。しかし $P_2=\operatorname{diag}(0,1)$ は $e_2$ 方向への直交射影で、$P_2\ne0$ なのに $P_2e_1=0$ です。この違いを定義にします。

<a id="def-aqft13-separating-vector"></a>

<!-- formal-statement-start -->
> **定義（分離ベクトル）**  
> $\mathcal H$ を複素Hilbert空間、$\mathcal N\subset B(\mathcal H)$ を単位元を含む作用素環とする。$\Omega\in\mathcal H$ が $\mathcal N$ に対して **分離的（separating）** であるとは、
>
$$
A\in\mathcal N,\quad A\Omega=0
\quad\Longrightarrow\quad A=0
$$
>
> が成り立つことをいう。局所von Neumann環 $\mathcal M(O)$ に対して成り立つとき、$O$ において局所分離的という。**巡回性** $\overline{\mathcal N\Omega}=\mathcal H$ と **分離性** は、別々に判定する条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft13-separating-vector -->
### 直接例：三つの環は二つの性質を区別する

**定義の確認**として、まず分離性の含意を行列成分で調べ、次に巡回性の閉包を求めます。

同じ $\mathbb C^2$ で、まず $\Omega=(1,1)/\sqrt2$ とし、対角行列環 $D=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$ を使います。
$$
\operatorname{diag}(a,b)\Omega=(a,b)/\sqrt2.
$$
**分離性の確認**：右辺が零なら $a=b=0$ なので、元の行列も零です。**巡回性の確認**：任意の $(u,v)$ は $a=\sqrt2u,b=\sqrt2v$ と選んで作れます。よって $D$ について両方が成立します。

これに対し、$\Omega=e_1$、$\mathcal N=B(\mathbb C^2)$ とすると、先ほどの $A_v$ が任意のベクトルを作るので巡回的ですが、非零な $P_2$ が $\Omega$ を零に送るので分離的ではありません。

最後に $\Omega=e_1$、$\mathcal N=\mathbb CI_2$ とすると、$\lambda I_2\Omega=0$ から $\lambda=0$ なので分離的です。しかし $\mathcal N\Omega=\mathbb Ce_1$ であり、$e_2$ は作れないので巡回的ではありません。**どちらか一方だけから他方は出ない**ことが、作用素とベクトルの具体計算で確かめられました。
<!-- definition-example-end -->

$B(\mathbb C^2)$ の例では、真空に作用する方法が多数ありすぎて、ある非零作用素はその真空を消してしまいます。分離性は「局所測定操作の真空への作用から、操作そのものを識別できる」という忠実性の要請です。ただし状態を測定によって万能に操作できる、という主張ではありません。

## 2. 分離性は可換子の巡回性と表裏一体

分離性を調べるには、$\mathcal N$ 自身だけでなく、$\mathcal N$ の全ての元と交換する演算子全体を使います。[可換子](../../VN/VN2/index.md#def-vn2-commutant)により
$$
\mathcal N'=\{B\in B(\mathcal H):BA=AB\text{ for all }A\in\mathcal N\}
$$
です。ここで可換子は **同一Hilbert空間上の $B(\mathcal H)$ の中**で取ります。作用素が交換すれば、$A\Omega=0$ から $AB\Omega=BA\Omega=0$ が導けます。したがって $\mathcal N'\Omega$ が稠密なら $A$ は零作用素です。

<a id="thm-aqft13-commutant-cyclic-separating"></a>

<!-- formal-statement-start -->
> **定理（可換子の巡回性と分離性の同値）**  
> $\mathcal H$ を複素Hilbert空間、$\mathcal N\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega\in\mathcal H$ とする。このとき
>
> 1. $\Omega$ が $\mathcal N$ に対して分離的であることと、$\Omega$ が $\mathcal N'$ に対して巡回的であることは同値である。
> 2. $\Omega$ が $\mathcal N$ に対して巡回的であることと、$\Omega$ が $\mathcal N'$ に対して分離的であることは同値である。
>
> この同値に $\Omega$ の正規化、正エネルギー、時空構造、局所性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

「可換子が巡回的 $\Rightarrow$ 元の環が分離的」は、交換 $AB=BA$ と稠密性から直ちに作用素の零性を証明します。逆向きには、可換子が真空から作る閉部分空間への直交射影 $P$ を考えます。この部分空間と直交補は可換子で不変なので $P$ は元のvon Neumann環に属し、$P\Omega=\Omega$ と分離性から $P=I$ です。

<!-- proof-start -->
### 証明

**(1) 巡回性から分離性。** $\overline{\mathcal N'\Omega}=\mathcal H$ とし、$A\in\mathcal N$ が $A\Omega=0$ を満たすとします。任意の $B\in\mathcal N'$ について $AB=BA$ なので
$$
A(B\Omega)=B(A\Omega)=0.
$$
よって $A$ は稠密集合 $\mathcal N'\Omega$ 上で零です。$A$ は有界だから任意の $\xi\in\mathcal H$ に対し、$B_\lambda\Omega\to\xi$ とする近似を選べば $A\xi=\lim_\lambda AB_\lambda\Omega=0$。従って $A=0$、すなわち分離的です。

**(1) 分離性から巡回性。** $K=\overline{\mathcal N'\Omega}$ とし、$P$ を $K$ への直交射影とします。$\mathcal N'$ は単位的な $*$-代数です。$B\in\mathcal N'$ に対し
$$
B(C\Omega)=(BC)\Omega\in\mathcal N'\Omega
\qquad(C\in\mathcal N')
$$
なので $BK\subset K$ です。$B^*\in\mathcal N'$ についても同様に $B^*K\subset K$ です。従って $\eta\in K^\perp,\zeta\in K$ なら
$$
\langle B\eta,\zeta\rangle
=\langle\eta,B^*\zeta\rangle=0
$$
であり、$BK^\perp\subset K^\perp$ も従います。つまり $P$ は $K$ と $K^\perp$ の双方を保つ各 $B$ と可換し、
$$
P\in(\mathcal N')'=\mathcal N
$$
です。最後の等号は $\mathcal N$ がvon Neumann環であることによる[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)です。$I\in\mathcal N'$ より $\Omega\in K$、したがって $(I-P)\Omega=0$。$I-P\in\mathcal N$ と分離性から $I-P=0$、つまり $P=I$ となり、$K=\mathcal H$ です。

**(2)。** 可換子 $\mathcal N'$ もvon Neumann環であり $(\mathcal N')'=\mathcal N$ です。(1)の同値に $\mathcal N'$ を代入すれば、「$\mathcal N'$ に分離的 $\Leftrightarrow$ $\mathcal N$ に巡回的」となります。$\square$
<!-- proof-end -->

**例に戻る。** 第1節の対角環 $D$ の可換子を行列で確かめます。$T=(t_{ij})$ が $P=\operatorname{diag}(1,0)\in D$ と可換なら、$TP=PT$ の $(1,2)$、$(2,1)$ 成分から $t_{12}=t_{21}=0$。よって $T$ は対角行列で、対角行列同士は可換なので $D'=D$ です。第1節で両方の性質が成立したことと整合します。

一方、$B(\mathbb C^2)$ の全ての元と可換な $T$ は、特に $P$ と可換なので $T=\operatorname{diag}(a,b)$ です。さらに行列単位 $E_{12}$ と可換なら $TE_{12}=aE_{12}$、$E_{12}T=bE_{12}$ より $a=b$。従って $B(\mathbb C^2)'=\mathbb CI_2$ です。$\Omega=e_1$ はこの可換子環に巡回的ではありません。この観点からも元の環への分離性が失敗すると分かります。

## 3. 空間的補領域が分離性を運ぶ

局所量の因果構造へ戻ります。[Einstein局所性](../AQFT2/index.md#def-aqft2-locality)は、空間的に分離した二つの領域の演算子が交換する条件でした。[AQFT9の局所von Neumann環への局所性の継承](../AQFT9/index.md#thm-aqft9-isotony-locality)により、C*環から弱閉包を取ってもこの交換関係は保たれます。

<a id="prop-aqft13-causal-complement-commutant"></a>

<!-- formal-statement-start -->
> **命題（局所von Neumann環の補領域包含）**  
> 四次元Minkowski時空の開領域に定義された単位的な局所von Neumann net $O\mapsto\mathcal M(O)\subset B(\mathcal H)$ がEinstein局所性を満たすとする。$O$ が開領域で、$O^\perp$ がその開いた因果補集合なら
>
$$
\mathcal M(O^\perp)\subset\mathcal M(O)'.
$$
>
> 特に $Q\subset O^\perp$ が開領域なら $\mathcal M(Q)\subset\mathcal M(O)'$ である。**一般には等号を主張しない**。
<!-- formal-statement-end -->

### 証明の見取り図

補集合の定義で「任意の二点が空間的に分離」を確認し、局所性を全演算子へ適用した後、可換子の定義へ戻します。小領域の包含にはisotonyを使います。

<!-- proof-start -->
### 証明

$p\in O^\perp$、$q\in O$ を任意に取ります。[因果補集合](../AQFT1/index.md#def-aqft1-causal-complement)における「全ての点対が空間的に分離」の条件より $g(p-q,p-q)>0$ です。従って $O^\perp$ と $O$ は空間的に分離しています。

[局所von Neumann netの局所性](../AQFT9/index.md#thm-aqft9-isotony-locality)により、全ての $B\in\mathcal M(O^\perp)$ と $A\in\mathcal M(O)$ に対し $BA=AB$ です。[可換子](../../VN/VN2/index.md#def-vn2-commutant)の定義から $B\in\mathcal M(O)'$。$B$ の任意性により最初の包含が成立します。

さらに $Q\subset O^\perp$ なら[包含単調性](../AQFT9/index.md#thm-aqft9-isotony-locality)から $\mathcal M(Q)\subset\mathcal M(O^\perp)$ であり、二つの包含を合成すれば結論です。$\square$
<!-- proof-end -->

### 具体的な配置：補集合が本当に非空かを確かめる

座標 $(t,\boldsymbol x)$ で $D_R=\{(t,\boldsymbol x):|t|+|\boldsymbol x|<R\}$ とし、別のdouble cone $Q=D_r+(0,L,0,0)$ を置きます。$r,R>0$、$L>R+r$ とします。点 $p=(t,\boldsymbol x)\in D_R$、$q=(s,(L,0,0)+\boldsymbol y)\in Q$ について
$$
|\boldsymbol x|<R-|t|,\qquad
|\boldsymbol y|<r-|s|
$$
です。空間座標の差は $\boldsymbol q-\boldsymbol p=(L,0,0)+\boldsymbol y-\boldsymbol x$ です。この和に[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を、$\boldsymbol y-\boldsymbol x$ に三角不等式を適用すると
$
\begin{aligned}
|\boldsymbol q-\boldsymbol p|
&\ge L-|\boldsymbol y-\boldsymbol x|\\
&\ge L-|\boldsymbol y|-|\boldsymbol x|\\
&> L-R-r+|t|+|s|\\
&>|t-s|.
\end{aligned}
$
よって $g(q-p,q-p)=|\boldsymbol q-\boldsymbol p|^2-(s-t)^2>0$、すなわち $Q\subset D_R^\perp$ です。このように**有界double coneには必ず非空の空間的補領域を選べる**ことを、外部定理に頼らず座標で確認できました。任意の並進中心のdouble coneにも同じ議論を移せます。

## 4. 真空はいつ局所分離的か

第3節の命題だけでは「元の環に属する作用素が真空を消したら零」とはまだ分かりません。必要なのは、**補領域に属する演算子が真空から全空間を稠密に作る**という追加情報です。

<a id="thm-aqft13-complement-cyclicity-separating"></a>

<!-- formal-statement-start -->
> **定理（空間的補領域の巡回性から局所分離性へ）**  
> $\mathcal H$ 上の二つの単位的von Neumann環 $\mathcal M,\mathcal N$ が $\mathcal N\subset\mathcal M'$ を満たすとする。$\Omega\in\mathcal H$ が $\mathcal N$ に対して巡回的なら、$\Omega$ は $\mathcal M$ に対して分離的である。
>
> 特に、Einstein局所性を満たす局所von Neumann netで、開領域 $Q\subset O^\perp$ があり $\overline{\mathcal M(Q)\Omega}=\mathcal H$ なら、$\Omega$ は $\mathcal M(O)$ に対して分離的である。
<!-- formal-statement-end -->

### 証明の見取り図

$A\Omega=0$ と仮定し、補領域側の任意の $B$ と交換させて $AB\Omega=0$ とします。補領域側の巡回性による稠密性と $A$ の有界性から、$A$ は全Hilbert空間上で零です。**補領域の巡回性は、この証明の最後で作用素の零性を保証する役目**を担います。

<!-- proof-start -->
### 証明

$A\in\mathcal M$ かつ $A\Omega=0$ とします。任意の $B\in\mathcal N$ について、$\mathcal N\subset\mathcal M'$ なので $AB=BA$ です。従って
$$
A(B\Omega)=AB\Omega=BA\Omega=B0=0.
$$
$\overline{\mathcal N\Omega}=\mathcal H$ だから任意の $\xi\in\mathcal H$ に対し $B_\lambda\Omega\to\xi$ となるネットを選べます。有界作用素の連続性より
$$
A\xi=\lim_\lambda A(B_\lambda\Omega)=0.
$$
$\xi$ は任意なので $A=0$。すなわち $\Omega$ は $\mathcal M$ に分離的です。

局所netの場合は、[前節の補領域包含](#prop-aqft13-causal-complement-commutant)で $\mathcal M(Q)\subset\mathcal M(O)'$ を得ます。抽象定理の $\mathcal M$ を $\mathcal M(O)$、$\mathcal N$ を $\mathcal M(Q)$ と取れば結論が従います。$\square$
<!-- proof-end -->

<a id="cor-aqft13-vacuum-local-standard"></a>

<!-- formal-statement-start -->
> **系（Reeh–Schlieder真空の局所巡回・分離性）**  
> [AQFT12のReeh–Schlieder定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)の全仮定、すなわち四次元Minkowski時空での包含単調な単位的局所von Neumann net、強連続な平行移動共変表現 $U$ の未来閉光円錐スペクトル条件、不変単位ベクトル $\Omega$、$\Omega$ の全域環に対する巡回性、弱加法性を仮定し、**さらにEinstein局所性**を仮定する。
>
> このとき、任意の非空有界double cone $O$ について
$$
\overline{\mathcal M(O)\Omega}=\mathcal H,
\qquad
A\in\mathcal M(O),\ A\Omega=0\Longrightarrow A=0
$$
> が同時に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

局所巡回性には既習のReeh–Schlieder定理をそのまま適用します。分離性には $O$ から空間的に離れた別の非空double cone $Q$ を座標で選び、$Q$ の巡回性と局所性を使います。二つの主張の依存条件は異なります。

<!-- proof-start -->
### 証明

任意の非空有界double cone $O$ を固定します。[Reeh–Schlieder定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)の仮定が満たされるので、$\overline{\mathcal M(O)\Omega}=\mathcal H$ です。

次に、[AQFT1の標準double cone](../AQFT1/index.md#def-aqft1-double-cone)の定義に従って $O=a+D_R$（$R>0$、$a$ は時空の並進中心）と書きます。第3節の座標計算を中心 $a$ に平行移動し、$r>0$ と $L>R+r$ を選んで $Q=a+D_r+(0,L,0,0)$ とすれば、非空有界double cone $Q\subset O^\perp$ が得られます。**同じReeh–Schlieder定理を今度は $Q$ に適用**すると
$$
\overline{\mathcal M(Q)\Omega}=\mathcal H
$$
です。追加仮定のEinstein局所性から[補領域包含](#prop-aqft13-causal-complement-commutant)を使って $\mathcal M(Q)\subset\mathcal M(O)'$ を得ます。従って[補領域巡回性からの分離性](#thm-aqft13-complement-cyclicity-separating)を適用でき、$\Omega$ は $\mathcal M(O)$ に分離的です。$\square$
<!-- proof-end -->

ここまでの結論は **有界なdouble cone** に対するものです。たとえば時空全体 $O=M$ には非空な空間的補領域が存在しないため、この証明を適用できません。仮定なしに「任意の開領域で真空は分離的」と拡張してはいけません。また、真空の一意性、局所代数の中心がスカラーだけであるという条件、Haag双対性は証明中で使っていません。

## 5. 忠実な局所ベクトル状態と、双対性ではない包含

ベクトル状態で正の演算子 $A^*A$ の期待値を測れば、作用素 $A$ が真空を零に送るかを判定できます。そこで期待値が零なら作用素自体も零だといえる条件を考え、先ほどの分離性と結び付けます。この性質を**状態の忠実性**と呼びます。環 $\mathcal N$ 上の状態 $\omega$ が忠実とは、任意の $A\in\mathcal N$ について $\omega(A^*A)=0$ なら $A=0$ となることです。どの環で判定するかを明示する必要があります。

<a id="prop-aqft13-local-state-faithful"></a>

<!-- formal-statement-start -->
> **命題（分離ベクトルとベクトル状態の忠実性）**  
> $\mathcal N\subset B(\mathcal H)$ を単位的von Neumann環、$\Omega$ を単位ベクトルとする。$\omega_\Omega(A)=\langle\Omega,A\Omega\rangle$ と置く。この状態が **忠実**、すなわち任意の $A\in\mathcal N$ について
$$
\omega_\Omega(A^*A)=0\Longrightarrow A=0
$$
> となることと、$\Omega$ が $\mathcal N$ に対して分離的であることは同値である。また $\omega_\Omega$ は $\mathcal N$ 上の正規状態である。
<!-- formal-statement-end -->

### 証明の見取り図

$A^*A$ の期待値を $\|A\Omega\|^2$ に書き直します。正規性はベクトル状態が正規であるという既習の事実から得られます。

<!-- proof-start -->
### 証明

任意の $A\in\mathcal N$ について、内積の随伴関係から
$$
\omega_\Omega(A^*A)
=\langle\Omega,A^*A\Omega\rangle
=\langle A\Omega,A\Omega\rangle
=\|A\Omega\|^2.
$$
従って期待値が零であることと $A\Omega=0$ は同値です。どの $A$ についてもこれから $A=0$ が従う条件が、定義した分離性と忠実性そのものです。

また $\omega_\Omega(I)=\|\Omega\|^2=1$、$\omega_\Omega(A^*A)=\|A\Omega\|^2\ge0$ なので状態です。[AQFT9のGNSベクトル状態の正規性](../AQFT9/index.md#prop-aqft9-local-normal-state)と同じく、固定ベクトルによる行列要素は弱作用素連続であり、von Neumann環への制限は正規です。$\square$
<!-- proof-end -->

### 直接例：同じベクトル状態でも環で判定が変わる

第1節の $\mathcal H=\mathbb C^2$、$\Omega=e_1$ を再び使います。スカラー環 $\mathcal N=\mathbb CI_2$ の任意の元 $A=\lambda I_2$ に対して
$
\omega_\Omega(A^*A)=\|(\lambda I_2)e_1\|^2=|\lambda|^2.
$
期待値が零なら $\lambda=0$、すなわち $A=0$ なので、この環への制限は忠実です。一方、全作用素環 $B(\mathbb C^2)$ には非零射影 $P_2=\operatorname{diag}(0,1)$ があり、
$
\omega_\Omega(P_2^*P_2)=\|P_2e_1\|^2=0
$
ですから忠実ではありません。状態は同じでも、**量化する $A$ の所属先**が異なります。

[真空の局所巡回・分離性の系](#cor-aqft13-vacuum-local-standard)から、真空状態はどの非空有界double coneの局所von Neumann環でも忠実な正規状態になります。ただし、周囲の $B(\mathcal H)$ 上でも忠実という主張ではありません。

また [Einstein局所性](../AQFT2/index.md#def-aqft2-locality)から得られるのは $\mathcal M(O^\perp)\subset\mathcal M(O)'$ という包含です。真空の巡回・分離性を追加しても、この包含が等号になる **Haag双対性** は従いません。

例えば $\mathcal H=\mathbb C^2$、$D$ を対角環、$\Omega=(1,1)/\sqrt2$ とし、二つの互いに空間的分離した領域に、それぞれ $\mathcal M(O)=\mathbb CI_2$、$\mathcal M(Q)=D$ を割り当てるとします。

この二つの環は交換し、$\Omega$ は $D$ に巡回的、$\mathbb CI_2$ に分離的です。しかし
$$
D=\mathcal M(Q)\subsetneq(\mathbb CI_2)'=B(\mathbb C^2).
$$
この局所的な代数の組だけで、巡回・分離と可換性は**可換子全体の生成**を要求しないと分かります。この例は完全なPoincaré共変netの構成ではなく、包含と等号の論理的差を切り分ける小模型です。

## 6. 仮定がないと、どの段階で証明が止まるか

**局所性を欠く場合。** $\mathcal H=\mathbb C^2$、$\Omega=e_1$ とし、全ての非空開領域へ $\mathcal M(O)=B(\mathbb C^2)$、空集合へ $\mathcal M(\varnothing)=\mathbb CI_2$ を割り当て、$U(x)=I_2$ とします。

包含単調性・平行移動共変性・正エネルギー・真空不変性・全域巡回性・弱加法性・全ての非空領域での巡回性は満たします。一方、離れた二領域の演算子として $E_{12}$、$E_{21}$ を選ぶと
$$
E_{12}E_{21}=E_{11}\ne E_{22}=E_{21}E_{12}
$$
ですから、**局所性は破れます**。また $P_2\Omega=0$ なのに $P_2\ne0$ です。補領域の演算子を元の $A$ と交換させる一手が壊れるため、分離性は導けません。

**補領域の巡回性を欠く場合。** $\mathcal H=\mathbb C^2\otimes\mathbb C^2$、$\Omega=e_1\otimes e_1$ とします。離れた二領域の環を $\mathcal M=B(\mathbb C^2)\otimes I_2$、$\mathcal N=I_2\otimes B(\mathbb C^2)$ とすれば、任意の $A\in\mathcal M,B\in\mathcal N$ は交換します。しかし
$$
\mathcal N\Omega=e_1\otimes\mathbb C^2
\ne\mathbb C^2\otimes\mathbb C^2
$$
で補領域側は巡回的ではありません。$P_2\otimes I_2\in\mathcal M$ は非零なのに $(P_2\otimes I_2)\Omega=0$ です。**可換性から零を伝えられるのは補領域が作る真部分空間まで**なので、分離性に至りません。この例も、二領域の可換性だけを取り出した比較模型です。

## 7. 演習と詳細解答

### Level A：基本の性質を個別に判定する

<a id="ex-aqft13-a01"></a>
#### AQFT13-A01 非零作用素がベクトルを消す
- Level: A

$\mathcal H=\mathbb C^2$、$\Omega=e_1$、$\mathcal N=B(\mathbb C^2)$ とする。$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ について $A\Omega=0$ の必要十分条件を求め、$\Omega$ の巡回性・分離性を判定せよ。

<!-- solution-start -->
**詳細解答。** 行列とベクトルを掛けると $A e_1=(a,c)$ です。ゆえに $A\Omega=0$ と $a=c=0$ は同値であり、$b,d$ は任意に残ります。例えば $b=0,d=1$ は非零行列 $P_2$ なので分離的ではありません。一方、任意の $v=(u,w)$ は $A=\begin{pmatrix}u&0\\w&0\end{pmatrix}$ により $A\Omega=v$ と書けます。従って $\mathcal N\Omega=\mathbb C^2$ で巡回的です。
<!-- solution-end -->

<a id="ex-aqft13-a02"></a>
#### AQFT13-A02 対角環で両条件を確認
- Level: A

$\mathcal H=\mathbb C^2$、$D$ を対角行列環、$\Omega=(\alpha,\beta)$ を単位ベクトルとする。$\Omega$ が $D$ に巡回的・分離的となる必要十分条件を求めよ。

<!-- solution-start -->
**詳細解答。** $A=\operatorname{diag}(a,b)$ とすると $A\Omega=(a\alpha,b\beta)$ です。$\alpha\beta\ne0$ なら、任意の $(u,v)$ を $a=u/\alpha,b=v/\beta$ で作れるので巡回的です。また $A\Omega=0$ なら $a\alpha=b\beta=0$ から $a=b=0$、従って分離的です。逆に $\alpha=0$ なら $\operatorname{diag}(1,0)\Omega=0$ は非零作用素が消す例で、$D\Omega\subset\mathbb Ce_2$ なので巡回的でもありません。$\beta=0$ の場合は $\operatorname{diag}(0,1)$ と $\mathbb Ce_1$ を使って同様に判定できます。従って両条件とも $\alpha\beta\ne0$ と同値です。
<!-- solution-end -->

<a id="ex-aqft13-a03"></a>
#### AQFT13-A03 可換子を行列で求める
- Level: A

$D=\{\operatorname{diag}(a,b)\}\subset B(\mathbb C^2)$ とする。$D'$ と $(\mathbb CI_2)'$ を計算し、$\Omega=e_1$ について定理の両同値を確かめよ。

<!-- solution-start -->
**詳細解答。** $T=(t_{ij})$ が $P=\operatorname{diag}(1,0)\in D$ と可換なら
$$
TP=\begin{pmatrix}t_{11}&0\\t_{21}&0\end{pmatrix},
\qquad
PT=\begin{pmatrix}t_{11}&t_{12}\\0&0\end{pmatrix}.
$$
よって $t_{12}=t_{21}=0$。対角行列同士は可換だから $D'=D$ です。全ての $T$ はスカラー行列と可換なので $(\mathbb CI_2)'=B(\mathbb C^2)$ です。$\Omega=e_1$ は $D$ に対し $D\Omega=\mathbb Ce_1$ で巡回的でなく、$\operatorname{diag}(0,1)\Omega=0$ で分離的でもありません。$D'=D$ 側も同じ判定です。$\mathbb CI_2$ については $\lambda I_2\Omega=0\Rightarrow\lambda=0$ なので分離的、$\mathbb CI_2\Omega=\mathbb Ce_1$ なので非巡回的です。その可換子 $B(\mathbb C^2)$ では逆に巡回的で非分離的となり、二つの同値が成立します。
<!-- solution-end -->

<a id="ex-aqft13-a04"></a>
#### AQFT13-A04 空間的補領域の距離
- Level: A

四次元Minkowski時空で $D_2=\{(t,\boldsymbol x):|t|+|\boldsymbol x|<2\}$ と $Q=D_1+(0,5,0,0)$ を考える。任意の $p\in D_2,q\in Q$ について $g(q-p,q-p)>0$ を示せ。

<!-- solution-start -->
**詳細解答。** $p=(t,\boldsymbol x)$、$q=(s,(5,0,0)+\boldsymbol y)$ と書くと $|\boldsymbol x|<2-|t|$ と $|\boldsymbol y|<1-|s|$ です。従って
$$
\begin{aligned}
|\boldsymbol q-\boldsymbol p|
&\ge5-|\boldsymbol x|-|\boldsymbol y|\\
&>5-(2-|t|)-(1-|s|)\\
&=2+|t|+|s|>|s-t|.
\end{aligned}
$$
両辺非負なので二乗しても不等号は保たれ、$g(q-p,q-p)=|\boldsymbol q-\boldsymbol p|^2-(s-t)^2>0$ です。したがって $Q\subset D_2^\perp$ です。
<!-- solution-end -->

### Level B：代数・幾何・仮定を接続する

<a id="ex-aqft13-b01"></a>
#### AQFT13-B01 巡回部分空間の射影の所属
- Level: B

$\mathcal N\subset B(\mathcal H)$ は単位的von Neumann環、$\Omega\in\mathcal H$ とする。$K=\overline{\mathcal N'\Omega}$ への直交射影を $P$ とする。$P\in\mathcal N$ を示し、$\Omega$ が $\mathcal N$ に分離的なら $P=I$ となることを証明せよ。

<!-- solution-start -->
**詳細解答。** $B,C\in\mathcal N'$ について、$B(C\Omega)=(BC)\Omega\in\mathcal N'\Omega$ です。従って $BK\subset K$。$B^*\in\mathcal N'$ についても $B^*K\subset K$ です。

$\eta\in K^\perp,\zeta\in K$ なら、随伴の定義によって
$$
\langle B\eta,\zeta\rangle
=\langle\eta,B^*\zeta\rangle=0
$$
なので $BK^\perp\subset K^\perp$ です。従って $B$ は $K\oplus K^\perp$ に関してブロック対角となり、$BP=PB$ です。

全ての $B\in\mathcal N'$ と $P$ が可換なので $P\in(\mathcal N')'=\mathcal N$。ここで[von Neumann の二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)を使いました。$I\in\mathcal N'$ なので $\Omega\in K$ であり、$P\Omega=\Omega$ です。従って $(I-P)\Omega=0$、かつ $I-P\in\mathcal N$。分離性を適用すると $I-P=0$、すなわち $P=I$。その値域 $K$ は $\mathcal H$ 全体です。
<!-- solution-end -->

<a id="ex-aqft13-b02"></a>
#### AQFT13-B02 反例の壊れた一行を特定する
- Level: B

$\mathcal H=\mathbb C^2,\Omega=e_1$ とし、全ての非空領域で $\mathcal M(O)=B(\mathbb C^2)$、$U(x)=I_2$ とする。(i) 弱加法性と正エネルギー、全領域での巡回性を確認し、(ii) 分離性が成り立たない理由を求め、(iii) 補領域の巡回性を用いる定理のどの仮定が失われたか述べよ。

<!-- solution-start -->
**詳細解答。** (i) 任意の非空double cone $Q$ の全並進に割り当てられた環は全て $B(\mathbb C^2)$ なので、生成環の二重可換子は $B(\mathbb C^2)$、すなわち全域環と一致します。$U(x)=I_2$ は強連続で共同スペクトルは $\{0\}\subset\overline V_+$、$\Omega$ は不変です。

任意の $v=(v_1,v_2)$ に対して
$$
A_v=\begin{pmatrix}v_1&0\\v_2&0\end{pmatrix},
\qquad A_v\Omega=v
$$
なので、各非空局所環で巡回的です。

(ii) $P_2=\operatorname{diag}(0,1)$ は非零なのに $P_2\Omega=0$ です。

(iii) 互いに離れた領域の行列単位 $E_{12},E_{21}$ について
$$
E_{12}E_{21}=E_{11}\ne E_{22}=E_{21}E_{12}
$$
ですから、局所性が破れています。したがって $\mathcal M(Q)\subset\mathcal M(O)'$ を使えず、$A(B\Omega)=B(A\Omega)$ と書けないのです。
<!-- solution-end -->

<a id="ex-aqft13-b03"></a>
#### AQFT13-B03 局所性だけでは足りない
- Level: B

$\mathcal H=\mathbb C^2\otimes\mathbb C^2$、$\Omega=e_1\otimes e_1$、$\mathcal M=B(\mathbb C^2)\otimes I_2$、$\mathcal N=I_2\otimes B(\mathbb C^2)$ とする。$\mathcal N\subset\mathcal M'$ を直接確認し、$\mathcal N\Omega$ の線形包と $\mathcal M$ における非零の零化作用素を求めよ。

<!-- solution-start -->
**詳細解答。** $A_1,B_2\in B(\mathbb C^2)$ に対し
$$
(A_1\otimes I_2)(I_2\otimes B_2)=A_1\otimes B_2
=(I_2\otimes B_2)(A_1\otimes I_2)
$$
です。有限次元の二因子の線形結合にも成立するため $\mathcal N\subset\mathcal M'$ です。$B_2 e_1$ は任意の $\mathbb C^2$ ベクトルにできるので $\mathcal N\Omega=e_1\otimes\mathbb C^2$。これは4次元Hilbert空間の2次元部分空間にすぎず、$\mathcal N$ に対し非巡回的です。一方 $A=P_2\otimes I_2$ は非零で、$A\Omega=(P_2e_1)\otimes e_1=0$。従って $\mathcal M$ への分離性はありません。交換だけでは $A$ が零になるのは2次元部分空間上までで、その直交補への作用は制御できないことが失敗の機構です。
<!-- solution-end -->

<a id="ex-aqft13-b04"></a>
#### AQFT13-B04 局所状態の忠実性と全作用素環
- Level: B

$\mathcal H=\mathbb C^2$、$\Omega=(1,1)/\sqrt2$、$D$ を対角行列環とする。$\omega_\Omega(A)=\langle\Omega,A\Omega\rangle$ の $D$ 上での忠実性を計算で証明し、同じ $\omega_\Omega$ が $B(\mathbb C^2)$ では忠実でないことを示せ。

<!-- solution-start -->
**詳細解答。** $A=\operatorname{diag}(a,b)\in D$ なら $A^*A=\operatorname{diag}(|a|^2,|b|^2)$、よって
$$
\omega_\Omega(A^*A)
=\frac{|a|^2+|b|^2}{2}.
$$
これが零なら各非負項が零なので $a=b=0$、すなわち $A=0$ です。従って $D$ への制限は忠実です。一方 $\eta=(1,-1)/\sqrt2$ とし、$P_\eta=|\eta\rangle\langle\eta|$ と置くと $\|\eta\|=1$ なので $P_\eta$ は非零の直交射影です。$\langle\eta,\Omega\rangle=(1-1)/2=0$ より $P_\eta\Omega=0$。従って $\omega_\Omega(P_\eta^*P_\eta)=\|P_\eta\Omega\|^2=0$ にもかかわらず $P_\eta\ne0$ で、全作用素環では忠実ではありません。
<!-- solution-end -->

### Level C：二つの講義の定理を一つの証明へ統合する

<a id="ex-aqft13-c01"></a>
#### AQFT13-C01 真空の巡回・分離性を最初から導く
- Level: C

四次元Minkowski時空で、単位的局所von Neumann netが包含単調・平行移動共変・Einstein局所的であるとする。強連続ユニタリ平行移動表現の共同スペクトルが未来閉光円錐に含まれ、不変単位ベクトル $\Omega$ が全域環に巡回的で、netが任意の非空有界double coneについて弱加法性を満たすとする。$O=D_R$（$R>0$）で $\Omega$ が (i) 巡回的、(ii) 分離的、(iii) ベクトル状態として忠実であることを証明せよ。$Q=D_r+(0,L,0,0)$（$r>0,L>R+r$）を使ってよい。最後に、(ii) に追加で使った仮定を特定せよ。

<!-- solution-start -->
**詳細解答。** (i) まず $O=D_R$ は非空有界double coneです。問題文の包含単調性・平行移動共変性・強連続性・正エネルギー・真空不変性・全域巡回性・弱加法性は[AQFT12のReeh–Schlieder定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)の仮定に一致します。従って $\overline{\mathcal M(O)\Omega}=\mathcal H$ です。

(ii) $p=(t,\boldsymbol x)\in D_R$、$q=(s,(L,0,0)+\boldsymbol y)\in Q$ とします。$|\boldsymbol x|<R-|t|$、$|\boldsymbol y|<r-|s|$ なので
$$
|\boldsymbol q-\boldsymbol p|
\ge L-|\boldsymbol x|-|\boldsymbol y|
>L-R-r+|t|+|s|
>|s-t|.
$$
従って $Q\subset O^\perp$ で、局所性と[補領域包含](#prop-aqft13-causal-complement-commutant)により $\mathcal M(Q)\subset\mathcal M(O)'$ です。$Q$ も非空有界double coneなので、(i) と同じ[AQFT12の定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)を $Q$ に再適用して $\overline{\mathcal M(Q)\Omega}=\mathcal H$ を得ます。

$A\in\mathcal M(O)$ が $A\Omega=0$ を満たすと仮定します。任意の $B\in\mathcal M(Q)$ について、交換性から
$$
A(B\Omega)=B(A\Omega)=0
$$
です。任意の $\xi\in\mathcal H$ は $B_\lambda\Omega\to\xi$ で近似でき、有界性により $A\xi=\lim_\lambda A(B_\lambda\Omega)=0$。よって $A=0$。これが分離性です。(i) の証明で局所性は要りませんが、(ii) では **Einstein局所性** と **補領域が非空である幾何学的条件** が新しく必要でした。

(iii) $A\in\mathcal M(O)$ に対し
$$
\omega_\Omega(A^*A)=\langle A\Omega,A\Omega\rangle=\|A\Omega\|^2
$$
なので左辺が零なら $A\Omega=0$、(ii) により $A=0$。$\omega_\Omega(I)=1$、正性は上式から成立し、[局所ベクトル状態の正規性](../AQFT9/index.md#prop-aqft9-local-normal-state)より正規です。従って忠実な正規状態です。
<!-- solution-end -->

## 8. 何が分かり、次に何が残るか

巡回性は「作用素を真空に作用させると稠密なベクトルが作れる」、分離性は「真空を零にするその領域の作用素は零」という別の性質です。可換子の巡回性と分離性は同値で、局所netでは因果補領域の巡回性と局所性が分離性を保証します。Reeh–Schlieder定理の全仮定に局所性を加えれば、非空有界double coneで真空は **巡回的かつ分離的** となり、局所ベクトル状態は忠実です。

しかし $\mathcal M(O^\perp)\subset\mathcal M(O)'$ が等号になるか、また中心が自明かは別問題です。次講のAQFT14では、局所代数の双対性と中心の問題をさらに調べます。
