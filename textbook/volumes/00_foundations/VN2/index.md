# VN2 可換子・二重可換子・von Neumann 環

<!-- definition-example-audit: strict -->

> **既出概念**：[VN1 の強作用素位相・弱作用素位相](../VN1/index.md#def-vn1-sot)、[OA3 の単位的 $C^*$-環と $*$-構造](../OA3/index.md)、[Hilbert 随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md)を使います。

VN1 では、$B(H)$ の作用素をノルムだけでなく、各ベクトルへの作用を見る強作用素位相 SOT と、各行列係数を見る弱作用素位相 WOT で近づけることを学びました。

ここで次の問いが生まれます。

$$
\text{ある } *\text{-部分代数 } \mathcal A\subset B(H)
$$

から出発して、SOT や WOT で極限を全て取り込むと、何が得られるのでしょうか。

毎回「全てのネットの極限」を追うのは大変です。代わりに、作用素がどの対称性と両立するかを調べます。集合 $S\subset B(H)$ に対し、$S$ の全ての作用素と可換する作用素全体を $S'$ と書き、さらに同じ操作をもう一度施した集合を $S''$ と書きます。名称と正確な定義は順に導入します。

本章では、単位を含む $*$-部分代数 $\mathcal A$ について

$$
\boxed{
\overline{\mathcal A}^{\mathrm{SOT}}
=
\overline{\mathcal A}^{\mathrm{WOT}}
=
\mathcal A''
}
$$

を示します。

左辺は「弱い作用素位相で極限を付け足す」という位相的操作、右辺は「可換関係を二回取る」という代数的操作です。本章では、この二つが一致する理由を証明します。

---

## 1. 可換子：どの作用素と両立するかを見る

行列 $A$ と $X$ が

$$
AX=XA
$$

を満たすとき、$X$ は $A$ が持つ分解や対称性を壊しません。

作用素を一個だけでなく集合として扱います。

<a id="def-vn2-commutant"></a>

<!-- formal-statement-start -->
### 定義（可換子）

$H$ を複素 Hilbert 空間、$S\subset B(H)$ とする。

$S$ の全ての元と可換する作用素全体

$$
\boxed{
S'
=
\{T\in B(H):TA=AT\ \text{for all }A\in S\}
}
$$

を $S$ の **可換子** と呼ぶ。
<!-- formal-statement-end -->

条件は「$S$ のどれか一つと可換」ではなく、**全ての $A\in S$ と同時に可換**することです。

<!-- definition-example-start: def-vn2-commutant -->

### 直接例：一つの射影の可換子

$P$ を $H$ 上の直交射影とし、

$$
H=PH\oplus(I-P)H
$$

と直交分解します。

この分解に関して作用素 $T$ を

$$
T=
\begin{pmatrix}
T_{11}&T_{12}\\
T_{21}&T_{22}
\end{pmatrix},
\qquad
P=
\begin{pmatrix}
I&0\\
0&0
\end{pmatrix}
$$

と書きます。

すると

$$
TP=
\begin{pmatrix}
T_{11}&0\\
T_{21}&0
\end{pmatrix},
\qquad
PT=
\begin{pmatrix}
T_{11}&T_{12}\\
0&0
\end{pmatrix}.
$$

従って $TP=PT$ であるための必要十分条件は

$$
T_{12}=T_{21}=0
$$

です。よって

$$
\boxed{
\{P\}'
=
B(PH)\oplus B((I-P)H).
}
$$

**定義の確認**：$\{P\}'$ は「$P$ と可換するすべての作用素」の集合であり、上の計算で $TP=PT\iff T_{12}=T_{21}=0$ を示したので、表示したブロック対角作用素全体が可換子の定義と一致します。

つまり $P$ と可換する作用素は、$P$ が作る二つの部分空間を混ぜません。

<!-- definition-example-end -->

可換子には順序を反転する性質があります。

<a id="prop-vn2-commutant-order"></a>

<!-- formal-statement-start -->
### 命題（可換子の基本的な順序関係）

$S,T\subset B(H)$ とする。

1. $S\subset T$ なら $T'\subset S'$。
2. $S\subset S''$。
3. $S'''=S'$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1. $X\in T'$ とする。$S\subset T$ なので、$X$ は特に全ての $A\in S$ と可換する。従って $X\in S'$ であり、$T'\subset S'$。

2. $A\in S$ を取る。任意の $X\in S'$ は定義により $XA=AX$ を満たす。従って $A$ は $S'$ の全ての元と可換し、$A\in(S')'=S''$。

3. 2 を $S'$ に適用すると

$$
S'\subset S'''.
$$

一方 2 の $S\subset S''$ に 1 を適用すると

$$
(S'')'\subset S',
$$

すなわち $S'''\subset S'$。両方を合わせて $S'''=S'$。
<!-- proof-end -->

---

## 2. 可換子は WOT で閉じている

後で証明する中心定理では、可換関係が弱作用素極限で壊れないことが重要です。

<a id="prop-vn2-commutant-wot-closed"></a>

<!-- formal-statement-start -->
### 命題（可換子の WOT 閉性）

任意の $S\subset B(H)$ に対して $S'$ は単位元 $I$ を含む部分代数であり、WOT で閉じている。

さらに $S$ が随伴で閉じている、すなわち

$$
A\in S\Longrightarrow A^*\in S
$$

を満たすなら、$S'$ も随伴で閉じている。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $I$ は全ての作用素と可換するので $I\in S'$ です。

$X,Y\in S'$、$\alpha,\beta\in\mathbb C$ とすると、任意の $A\in S$ に対して

$$
(\alpha X+\beta Y)A
=
\alpha XA+\beta YA
=
\alpha AX+\beta AY
=
A(\alpha X+\beta Y),
$$

また

$$
(XY)A
=
X(YA)
=
X(AY)
=
(XA)Y
=
A(XY).
$$

従って $S'$ は部分代数です。

次に WOT 閉性を示します。ネット $(X_\lambda)\subset S'$ が

$$
X_\lambda\xrightarrow{\mathrm{WOT}}X
$$

と収束したとします。

$A\in S$ を固定します。VN1 で示した通り、固定作用素による左右乗法は WOT 連続です。従って

$$
X_\lambda A\xrightarrow{\mathrm{WOT}}XA,
\qquad
AX_\lambda\xrightarrow{\mathrm{WOT}}AX.
$$

各 $\lambda$ で $X_\lambda A=AX_\lambda$ なので、任意の $\xi,\eta\in H$ について $\langle\xi,XA\eta\rangle$ と $\langle\xi,AX\eta\rangle$ は同じスカラー net の極限です。したがって

$$
XA=AX.
$$

これは任意の $A\in S$ について成り立つので $X\in S'$ です。

最後に $S$ が随伴で閉じているとします。$X\in S'$、$A\in S$ とすると、$A^*\in S$ なので

$$
XA^*=A^*X.
$$

随伴を取れば

$$
AX^*=X^*A.
$$

従って $X^*\in S'$ です。
<!-- proof-end -->

ここで条件を見落とさないでください。一般の集合 $S$ では、$S'$ が自動的に $*$-閉とは限りません。随伴を取ると $S$ ではなく $S^*$ との可換関係が現れるからです。

---

## 3. 二重可換子：同じ対称性を保つ作用素を回収する

一回目の可換子 $S'$ は「$S$ と両立する全作用素」を集めます。

もう一度可換子を取ると

$$
S''
=
(S')'
$$

は「$S$ と両立する全ての作用素と両立する作用素」を集めます。

<a id="def-vn2-bicommutant"></a>

<!-- formal-statement-start -->
### 定義（二重可換子）

$S\subset B(H)$ に対して

$$
\boxed{
S''=(S')'
}
$$

を $S$ の **二重可換子** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn2-bicommutant -->

### 直接例：一つの射影の二重可換子

前節の射影 $P$ について

$$
\{P\}'
=
B(PH)\oplus B((I-P)H)
$$

でした。

$\{P\}'$ の全ての作用素と可換する作用素は、各ブロック上でスカラー倍でなければなりません。従って

$$
\boxed{
\{P\}''
=
\{\alpha P+\beta(I-P):\alpha,\beta\in\mathbb C\}.
}
$$

特に $H=\mathbb C^2$、$P=\operatorname{diag}(1,0)$ なら

$$
\{P\}''
=
\left\{
\begin{pmatrix}
\alpha&0\\
0&\beta
\end{pmatrix}
:\alpha,\beta\in\mathbb C
\right\}.
$$

**定義の確認**：二重可換子は $\{P\}''=(\{P\}')'$ であり、$\{P\}'$ の全要素と可換する条件を各ブロックで課すと $\alpha P+\beta(I-P)$ に限られるため、上の集合は二重可換子の定義どおりです。

一つの射影から、その射影が定める二つの部分空間上で独立にスカラーを掛ける代数が回収されました。

<!-- definition-example-end -->

### 有限次元の確認：全行列代数

$H=\mathbb C^n$ とします。

全行列代数 $M_n(\mathbb C)=B(H)$ と可換する行列はスカラー行列だけなので

$$
B(H)'=\mathbb CI.
$$

従って

$$
B(H)''
=
(\mathbb CI)'
=
B(H).
$$

有限次元では全ての線形部分空間がノルムでも SOT でも WOT でも閉じています。この例は、後で証明する中心定理の最も単純な形になっています。

---

## 4. von Neumann 環：弱作用素極限を取り込んだ作用素代数

$C^*$-環ではノルム閉性が基本でした。

一方、VN1 では有限ランク作用素が $B(H)$ を SOT で近似できることを見ました。無限次元では、ノルム閉包より SOT/WOT 閉包の方がはるかに多くの自然な極限を取り込みます。

<a id="def-vn2-von-neumann-algebra"></a>

<!-- formal-statement-start -->
### 定義（von Neumann 環）

複素 Hilbert 空間 $H$ 上の **von Neumann 環**とは、$B(H)$ の単位元 $I$ を含む $*$-部分代数 $M$ であって、WOT で閉じているものをいう。
<!-- formal-statement-end -->

この定義では、抽象的な $C^*$-環ではなく、**ある Hilbert 空間上に具体的に表現された作用素代数**として扱っています。

<!-- definition-example-start: def-vn2-von-neumann-algebra -->

### 直接例：射影が生成する有限次元 von Neumann 環

直交射影 $P$ に対し

$$
M
=
\{\alpha P+\beta(I-P):\alpha,\beta\in\mathbb C\}
$$

と置きます。

$I=P+(I-P)\in M$ です。また

$$
(\alpha P+\beta(I-P))^*
=
\overline\alpha P+\overline\beta(I-P)\in M
$$

なので $*$-部分代数です。

さらに $M$ は高々2次元の線形空間なので有限次元、従って WOT でも閉じています。

**定義の確認**：$I\in M$ で、$(\alpha P+\beta(I-P))(\gamma P+\delta(I-P))=\alpha\gamma P+\beta\delta(I-P)\in M$、随伴でも閉じ、さらに WOT 閉なので、$M$ は von Neumann 環の定義を満たします。

<!-- definition-example-end -->

$B(H)$ 自身と $\mathbb CI$ も von Neumann 環です。

---

## 5. 二重可換子定理の前半：閉包は二重可換子を越えない

単位を含む $*$-部分代数 $\mathcal A\subset B(H)$ を考えます。

まず簡単な包含を確認します。

<a id="prop-vn2-closures-in-bicommutant"></a>

<!-- formal-statement-start -->
### 命題（SOT/WOT 閉包は二重可換子に含まれる）

$\mathcal A\subset B(H)$ を単位を含む $*$-部分代数とする。

このとき

$$
\boxed{
\overline{\mathcal A}^{\mathrm{SOT}}
\subset
\overline{\mathcal A}^{\mathrm{WOT}}
\subset
\mathcal A''.
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

VN1 より SOT は WOT より細かいので、SOT 閉包は WOT 閉包に含まれます。

次に $\mathcal A\subset\mathcal A''$ は可換子の基本性質から成り立ちます。

さらに $\mathcal A$ は随伴で閉じているため、[前節の命題](#prop-vn2-commutant-wot-closed)から $\mathcal A'$ も随伴で閉じています。$S=\mathcal A'$ として[同じ命題](#prop-vn2-commutant-wot-closed)を適用すれば

$$
\mathcal A''
=
(\mathcal A')'
$$

は WOT 閉です。

$\mathcal A''$ は $\mathcal A$ を含む WOT 閉集合なので、最小の WOT 閉集合である WOT 閉包について

$$
\overline{\mathcal A}^{\mathrm{WOT}}
\subset
\mathcal A''
$$

を得ます。
<!-- proof-end -->

難しいのは逆向き

$$
\mathcal A''
\subset
\overline{\mathcal A}^{\mathrm{SOT}}
$$

です。

ここで「有限個のベクトルを同時に近似する」という SOT 近傍の形が効きます。

---

## 6. 一つのベクトルなら、巡回部分空間への射影で近似できる

まず一つのベクトル $\xi\in H$ だけを近似する場合を考えます。

$$
K_\xi
=
\overline{\{A\xi:A\in\mathcal A\}}
$$

と置きます。

$\mathcal A$ は単位を含むので

$$
\xi=I\xi\in K_\xi.
$$

また $\mathcal A$ は積で閉じているため $K_\xi$ は各 $A\in\mathcal A$ で不変です。さらに $A^*\in\mathcal A$ なので $A^*$ でも不変です。

従って $K_\xi$ は各 $A$ に対する reducing subspace であり、$K_\xi$ への直交射影 $P_\xi$ は全ての $A\in\mathcal A$ と可換します。つまり

$$
P_\xi\in\mathcal A'.
$$

ここで $T\in\mathcal A''$ とします。$T$ は $\mathcal A'$ の全ての元と可換するので

$$
TP_\xi=P_\xi T.
$$

$\xi=P_\xi\xi$ だから

$$
T\xi
=
TP_\xi\xi
=
P_\xi T\xi
\in K_\xi.
$$

従って、任意の $\varepsilon>0$ に対しある $A\in\mathcal A$ が存在して

$$
\|(T-A)\xi\|<\varepsilon
$$

となります。

これで一つのベクトルなら近似できます。

しかし SOT の基本近傍は有限個のベクトル

$$
\xi_1,\ldots,\xi_n
$$

を**同じ一つの作用素 $A$**で同時に近似することを要求します。一つずつ別の $A_j$ を選んでは足りません。

そこで $H$ を $H^n$ へ増幅します。

---

## 7. 行列増幅：有限個のベクトルを一つにまとめる

$A\in B(H)$ に対し

$$
A^{(n)}
=
\operatorname{diag}(A,\ldots,A)
\in B(H^n)
$$

と置きます。

ベクトル

$$
\boldsymbol\xi
=
(\xi_1,\ldots,\xi_n)\in H^n
$$

を一つだけ近似すれば、

$$
\|(A^{(n)}-T^{(n)})\boldsymbol\xi\|^2
=
\sum_{j=1}^n
\|(A-T)\xi_j\|^2
$$

なので、元の有限個のベクトルを同時に近似できます。

ここで必要になるのが、対角に増幅した代数と可換する作用素の形です。

<a id="lem-vn2-amplification-commutant"></a>

<!-- formal-statement-start -->
### 補題（対角増幅の可換子）

$\mathcal A\subset B(H)$ を部分代数とし、

$$
\mathcal A^{(n)}
=
\{A^{(n)}:A\in\mathcal A\}
\subset B(H^n)
$$

とする。

$X\in B(H^n)$ を作用素行列

$$
X=(X_{ij})_{1\le i,j\le n},
\qquad
X_{ij}\in B(H)
$$

で表すと、

$$
X\in(\mathcal A^{(n)})'
$$

であることと、全ての $i,j$ について

$$
X_{ij}\in\mathcal A'
$$

であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A^{(n)}$ は対角成分が全て $A$ の作用素行列です。

作用素行列の積を成分ごとに見ると

$$
(XA^{(n)})_{ij}
=
X_{ij}A,
$$

一方

$$
(A^{(n)}X)_{ij}
=
AX_{ij}.
$$

従って

$$
XA^{(n)}=A^{(n)}X
$$

が全ての $A\in\mathcal A$ について成り立つことは、

$$
X_{ij}A=AX_{ij}
$$

が全ての $i,j$ と $A\in\mathcal A$ について成り立つことと同値です。

これはちょうど $X_{ij}\in\mathcal A'$ です。
<!-- proof-end -->

この補題により、$T\in\mathcal A''$ なら $T^{(n)}$ は $(\mathcal A^{(n)})'$ の全ての元と可換します。

実際 $X=(X_{ij})\in(\mathcal A^{(n)})'$ なら $X_{ij}\in\mathcal A'$ なので

$$
TX_{ij}=X_{ij}T.
$$

従って成分ごとに

$$
T^{(n)}X=XT^{(n)}.
$$

---

## 8. von Neumann の二重可換子定理

準備が整いました。

<a id="thm-vn2-bicommutant"></a>

<!-- formal-statement-start -->
### 定理（von Neumann の二重可換子定理）

$H$ を複素 Hilbert 空間とし、$\mathcal A\subset B(H)$ を単位元 $I$ を含む $*$-部分代数とする。

このとき

$$
\boxed{
\overline{\mathcal A}^{\mathrm{SOT}}
=
\overline{\mathcal A}^{\mathrm{WOT}}
=
\mathcal A''.
}
$$

従って次は同値である。

1. $\mathcal A$ は WOT で閉じている。
2. $\mathcal A$ は SOT で閉じている。
3. $\mathcal A=\mathcal A''$。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

すでに

$$
\overline{\mathcal A}^{\mathrm{SOT}}
\subset
\overline{\mathcal A}^{\mathrm{WOT}}
\subset
\mathcal A''
$$

を示しました。

残りは

$$
\mathcal A''
\subset
\overline{\mathcal A}^{\mathrm{SOT}}
$$

です。

$T\in\mathcal A''$ を取ります。

$T$ が SOT 閉包に入ることを示すには、任意の SOT 基本近傍に $\mathcal A$ の元が入ることを示せば十分です。

そこで

$$
\xi_1,\ldots,\xi_n\in H,
\qquad
\varepsilon>0
$$

を任意に固定します。

$H^n$ 上で

$$
\boldsymbol\xi
=
(\xi_1,\ldots,\xi_n)
$$

とし、

$$
K
=
\overline{
\{A^{(n)}\boldsymbol\xi:A\in\mathcal A\}
}
\subset H^n
$$

と置きます。

$\mathcal A$ は単位を含むので

$$
\boldsymbol\xi=I^{(n)}\boldsymbol\xi\in K.
$$

また $A,B\in\mathcal A$ なら

$$
B^{(n)}A^{(n)}\boldsymbol\xi
=
(BA)^{(n)}\boldsymbol\xi\in K
$$

です。さらに $\mathcal A$ は随伴を取っても $\mathcal A$ に留まるため $B^*\in\mathcal A$ であり、$(B^{(n)})^*=(B^*)^{(n)}$ についても $K$ は不変です。

従って $K$ は全ての $A^{(n)}$ に対する reducing subspace です。

$P$ を $K$ への直交射影とすると

$$
P\in(\mathcal A^{(n)})'.
$$

補題より $P=(P_{ij})$ の各成分は

$$
P_{ij}\in\mathcal A'.
$$

$T\in\mathcal A''$ なので

$$
TP_{ij}=P_{ij}T
$$

が全ての $i,j$ で成り立ちます。従って

$$
T^{(n)}P=PT^{(n)}.
$$

しかも $\boldsymbol\xi\in K$ だから $P\boldsymbol\xi=\boldsymbol\xi$ です。よって

$$
T^{(n)}\boldsymbol\xi
=
T^{(n)}P\boldsymbol\xi
=
PT^{(n)}\boldsymbol\xi
\in K.
$$

$K$ は $\{A^{(n)}\boldsymbol\xi:A\in\mathcal A\}$ の閉包なので、ある $A\in\mathcal A$ を選んで

$$
\|
A^{(n)}\boldsymbol\xi
-
T^{(n)}\boldsymbol\xi
\|_{H^n}
<
\varepsilon
$$

とできます。

左辺の二乗は

$$
\sum_{j=1}^n
\|(A-T)\xi_j\|^2
$$

です。従って各 $j$ について

$$
\|(A-T)\xi_j\|<\varepsilon.
$$

つまり $A$ は、$T$ の任意の SOT 基本近傍に入ります。

従って

$$
T\in\overline{\mathcal A}^{\mathrm{SOT}}.
$$

$T\in\mathcal A''$ は任意だったので

$$
\mathcal A''
\subset
\overline{\mathcal A}^{\mathrm{SOT}}.
$$

先の包含と合わせて

$$
\overline{\mathcal A}^{\mathrm{SOT}}
=
\overline{\mathcal A}^{\mathrm{WOT}}
=
\mathcal A''
$$

を得ます。

最後に三条件の同値性は、この等式から従います。
<!-- proof-end -->

### 証明のどこで仮定を使ったか

この定理では仮定がはっきり働いています。

- **単位元 $I\in\mathcal A$**：$\boldsymbol\xi\in K$ を保証する。
- **積で閉じる**：$K$ を $\mathcal A^{(n)}$ で不変にする。
- **随伴で閉じる**：$K$ を $A^{(n)}$ だけでなく $(A^{(n)})^*$ でも不変にし、$K$ を reducing にする。
- **Hilbert 空間**：閉部分空間 $K$ への直交射影 $P$ を使う。
- **二重可換条件 $T\in\mathcal A''$**：$T^{(n)}$ が射影 $P$ と可換することを保証する。
- **SOT の有限個ベクトル近傍**：$H^n$ への増幅で有限個を一つのベクトルにまとめられる。

証明は「SOT と WOT が似ているから」成立するのではありません。Hilbert 空間の直交射影と $*$-構造を使って、有限個のベクトルを同時に近似できることが核心です。

---

## 9. 仮定を落とすと何が壊れるか

### 単位性を落とす：零代数

$$
\mathcal A=\{0\}
$$

とします。これは $*$-部分代数ですが単位を含みません。

$$
\mathcal A'
=
B(H)
$$

なので

$$
\mathcal A''
=
B(H)'
=
\mathbb CI.
$$

一方

$$
\overline{\mathcal A}^{\mathrm{SOT}}
=
\{0\}.
$$

従って

$$
\overline{\mathcal A}^{\mathrm{SOT}}
\ne
\mathcal A''.
$$

証明では $I\notin\mathcal A$ のため、一般に $\boldsymbol\xi$ が

$$
K=\overline{\{A^{(n)}\boldsymbol\xi:A\in\mathcal A\}}
$$

へ入るとは限りません。実際この例では $K=\{0\}$ です。

### $*$-閉性を落とす：上三角行列

$H=\mathbb C^2$ とし、

$$
\mathcal T
=
\left\{
\begin{pmatrix}
a&b\\
0&d
\end{pmatrix}
:a,b,d\in\mathbb C
\right\}
$$

を考えます。

$\mathcal T$ は単位を含む部分代数ですが、一般には随伴で閉じません。

$\mathcal T$ と可換する行列を直接計算するとスカラー行列だけなので

$$
\mathcal T'=\mathbb CI,
\qquad
\mathcal T''=M_2(\mathbb C).
$$

一方有限次元では $\mathcal T$ 自身が SOT/WOT で閉じています。従って

$$
\mathcal T
\ne
\mathcal T''.
$$

証明では $K$ が $A^{(n)}$ で不変でも $(A^{(n)})^*$ で不変とは限らず、$K$ への直交射影が可換子に入るという核心が壊れます。

---

## 10. von Neumann 環の三つの見方

[von Neumann の二重可換子定理](#thm-vn2-bicommutant)により、単位を含む $*$-部分代数 $M\subset B(H)$ について次の三つは同じ概念になります。

$$
\boxed{
M\text{ は WOT 閉}
\Longleftrightarrow
M\text{ は SOT 閉}
\Longleftrightarrow
M=M''
}
$$

したがって von Neumann 環は、

- 行列係数の極限を全て取り込んだ作用素代数
- 各ベクトル上の極限を全て取り込んだ作用素代数
- 二重可換子で閉じた作用素代数

のどの立場から見ても同じ対象です。

これは $C^*$-環との違いを明確にします。

**$C^*$-環**は作用素ノルムで閉じます。これに対し、**von Neumann 環**は SOT/WOT で閉じます。

同じ生成元から出発しても、どの位相で閉じるかにより得られる代数は変わり得ます。

---

## 11. 生成された von Neumann 環

任意の集合 $S\subset B(H)$ から von Neumann 環を作るときは、随伴も一緒に生成する必要があります。

<a id="def-vn2-generated-von-neumann-algebra"></a>

<!-- formal-statement-start -->
### 定義（生成された von Neumann 環）

$S\subset B(H)$ に対し、$S\cup S^*$ と単位元 $I$ を含む最小の von Neumann 環を、$S$ が生成する von Neumann 環と呼び、

$$
W^*(S)
$$

と書く。

同値に、$\operatorname{alg}^*(S,I)$ を $S\cup S^*\cup\{I\}$ が生成する単位的 $*$-部分代数とすると、

$$
\boxed{
W^*(S)
=
\overline{\operatorname{alg}^*(S,I)}^{\mathrm{SOT}}
=
\overline{\operatorname{alg}^*(S,I)}^{\mathrm{WOT}}
=
\operatorname{alg}^*(S,I)''
}
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vn2-generated-von-neumann-algebra -->

### 直接例：射影一個が生成する von Neumann 環

直交射影 $P$ は $P=P^*=P^2$ を満たします。

$P$ と $I$ から作る任意の多項式は

$$
\alpha P+\beta(I-P)
$$

の形に整理できます。従って

$$
W^*(P)
=
\{\alpha P+\beta(I-P):\alpha,\beta\in\mathbb C\}.
$$

**定義の確認**：右辺 $M=\{\alpha P+\beta(I-P)\}$ は先の例で von Neumann 環であり、$P$ を含む任意の von Neumann 環は $I-P$ とその線形結合も含むので $M$ を含みます。したがって $M$ は $P$ を含む最小の von Neumann 環、すなわち $W^*(P)$ です。

これは先に計算した $\{P\}''$ と一致します。

<!-- definition-example-end -->

次章 VN3 では、von Neumann 環の中で特に重要な射影を主役にし、部分等長作用素と極分解へ進みます。

---

# 演習

## Level A

### A1. $2\times2$ 対角行列の可換子

$$
D=
\begin{pmatrix}
1&0\\
0&2
\end{pmatrix}
$$

とする。$X\in M_2(\mathbb C)$ が $XD=DX$ を満たすための条件を求め、$\{D\}'$ を決定せよ。

- Level: A

#### 詳細解答

$$
X=
\begin{pmatrix}
a&b\\
c&d
\end{pmatrix}
$$

と置きます。

すると

$$
XD
=
\begin{pmatrix}
a&2b\\
c&2d
\end{pmatrix},
\qquad
DX
=
\begin{pmatrix}
a&b\\
2c&2d
\end{pmatrix}.
$$

従って $XD=DX$ は

$$
2b=b,
\qquad
c=2c
$$

と同値です。よって

$$
b=c=0.
$$

したがって

$$
\boxed{
\{D\}'
=
\left\{
\begin{pmatrix}
a&0\\
0&d
\end{pmatrix}
:a,d\in\mathbb C
\right\}.
}
$$

固有値 $1,2$ が異なるため、可換する作用素は二つの固有空間を混ぜられません。

---

### A2. 可換子が順序を反転すること

$S\subset T\subset B(H)$ とする。$T'\subset S'$ を定義から証明せよ。

- Level: A

#### 詳細解答

$X\in T'$ を任意に取ります。

$X\in T'$ とは

$$
XA=AX
$$

が全ての $A\in T$ について成り立つという意味です。

$S\subset T$ なので、任意の $A\in S$ も $T$ の元です。従って同じ等式が全ての $A\in S$ について成り立ちます。

これは $X\in S'$ を意味します。

よって

$$
\boxed{
T'\subset S'.
}
$$

---

### A3. $S\subset S''$ と $S'''=S'$

任意の $S\subset B(H)$ に対し

$$
S\subset S'',
\qquad
S'''=S'
$$

を証明せよ。

- Level: A

#### 詳細解答

まず $A\in S$ を取ります。

$X\in S'$ なら定義により $XA=AX$ です。従って $A$ は $S'$ の全ての元と可換します。

よって

$$
A\in(S')'=S''.
$$

従って

$$
S\subset S''.
$$

次にこれを $S'$ に適用すると

$$
S'\subset S'''.
$$

一方 $S\subset S''$ に可換子の順序反転を適用すると

$$
(S'')'\subset S',
$$

すなわち

$$
S'''\subset S'.
$$

両方から

$$
\boxed{
S'''=S'.
}
$$

---

### A4. 射影一個が生成する代数

直交射影 $P$ に対し、$P$ と $I$ から有限回の和・積・スカラー倍・随伴で作られる作用素が全て

$$
\alpha P+\beta(I-P)
$$

の形になることを示せ。

- Level: A

#### 詳細解答

$P$ は

$$
P^2=P,
\qquad
P^*=P
$$

を満たします。

従って $P$ の高い冪は全て

$$
P^k=P
\qquad(k\ge1)
$$

に等しくなります。

また $I-P$ を使えば

$$
I=P+(I-P),
\qquad
P(I-P)=0,
\qquad
(I-P)^2=I-P.
$$

したがって $P$ と $I$ から作る任意の多項式は

$$
\alpha P+\beta(I-P)
$$

へ整理できます。

随伴を取っても

$$
(\alpha P+\beta(I-P))^*
=
\overline\alpha P+\overline\beta(I-P)
$$

で同じ形です。

よって生成される単位的 $*$-部分代数は

$$
\boxed{
\{\alpha P+\beta(I-P):\alpha,\beta\in\mathbb C\}.
}
$$

---

## Level B

### B1. 可換子の WOT 閉性を行列係数で直接示す

$(X_\lambda)\subset S'$ が $X_\lambda\xrightarrow{\mathrm{WOT}}X$ とする。固定した $A\in S$ と $\xi,\eta\in H$ に対し、

$$
\langle\eta,(XA-AX)\xi\rangle=0
$$

を直接示せ。

- Level: B

#### 詳細解答

$X_\lambda\in S'$ なので

$$
X_\lambda A=AX_\lambda.
$$

従って

$$
\langle\eta,X_\lambda A\xi\rangle
=
\langle\eta,AX_\lambda\xi\rangle.
$$

左辺では $A\xi$ が固定ベクトルなので、WOT 収束から

$$
\langle\eta,X_\lambda A\xi\rangle
\to
\langle\eta,XA\xi\rangle.
$$

右辺は Hilbert 随伴を使って

$$
\langle\eta,AX_\lambda\xi\rangle
=
\langle A^*\eta,X_\lambda\xi\rangle.
$$

$A^*\eta$ も固定ベクトルなので

$$
\langle A^*\eta,X_\lambda\xi\rangle
\to
\langle A^*\eta,X\xi\rangle
=
\langle\eta,AX\xi\rangle.
$$

両辺の極限を比較して

$$
\langle\eta,XA\xi\rangle
=
\langle\eta,AX\xi\rangle.
$$

従って

$$
\langle\eta,(XA-AX)\xi\rangle=0.
$$

これは任意の $\xi,\eta$ について成り立つので

$$
XA=AX.
$$

$A\in S$ は任意だから $X\in S'$ です。

---

### B2. 対角増幅の可換子

$\mathcal A\subset B(H)$ とし、$H^2=H\oplus H$ 上で

$$
A^{(2)}
=
\begin{pmatrix}
A&0\\
0&A
\end{pmatrix}
$$

とする。

$$
X=
\begin{pmatrix}
X_{11}&X_{12}\\
X_{21}&X_{22}
\end{pmatrix}
$$

が全ての $A^{(2)}$ と可換するための必要十分条件が

$$
X_{ij}\in\mathcal A'
\qquad(1\le i,j\le2)
$$

であることを示せ。

- Level: B

#### 詳細解答

行列積を計算すると

$$
XA^{(2)}
=
\begin{pmatrix}
X_{11}A&X_{12}A\\
X_{21}A&X_{22}A
\end{pmatrix},
$$

一方

$$
A^{(2)}X
=
\begin{pmatrix}
AX_{11}&AX_{12}\\
AX_{21}&AX_{22}
\end{pmatrix}.
$$

従って

$$
XA^{(2)}=A^{(2)}X
$$

が成り立つことと、

$$
X_{ij}A=AX_{ij}
$$

が全ての $i,j$ で成り立つことは同値です。

さらにこれを全ての $A\in\mathcal A$ に要求すると、

$$
X_{ij}\in\mathcal A'
$$

と同値になります。

よって各成分が可換子に入ることが確認できました。

---

### B3. 単位性を落とした反例

$\mathcal A=\{0\}\subset B(H)$ とする。$\mathcal A'$、$\mathcal A''$、$\overline{\mathcal A}^{\mathrm{SOT}}$ を求め、二重可換子定理の結論が失敗することを確認せよ。

- Level: B

#### 詳細解答

零作用素は全ての作用素と可換するので

$$
\mathcal A'
=
B(H).
$$

従って

$$
\mathcal A''
=
B(H)'.
$$

$B(H)$ の全ての作用素と可換する作用素はスカラー作用素だけなので

$$
\mathcal A''
=
\mathbb CI.
$$

一方 $\mathcal A=\{0\}$ は既に SOT 閉集合なので

$$
\overline{\mathcal A}^{\mathrm{SOT}}
=
\{0\}.
$$

従って

$$
\boxed{
\overline{\mathcal A}^{\mathrm{SOT}}
=
\{0\}
\ne
\mathbb CI
=
\mathcal A''.
}
$$

単位元を含まないため、二重可換子定理の仮定を満たしていません。

---

### B4. 上三角行列で $*$-閉性の必要性を見る

$$
\mathcal T
=
\left\{
\begin{pmatrix}
a&b\\
0&d
\end{pmatrix}
:a,b,d\in\mathbb C
\right\}
\subset M_2(\mathbb C)
$$

とする。

1. $\mathcal T'=\mathbb CI$ を示せ。
2. $\mathcal T''=M_2(\mathbb C)$ を求めよ。
3. $\mathcal T$ は有限次元なので WOT 閉であることから、二重可換子定理の結論が失敗することを確認せよ。

- Level: B

#### 詳細解答

$X=\begin{pmatrix}x&y\\ z&w\end{pmatrix}$ と置きます。

まず全ての対角行列

$$
D_{\alpha,\delta}
=
\begin{pmatrix}
\alpha&0\\
0&\delta
\end{pmatrix}
\in\mathcal T
$$

と可換する必要があります。

$XD_{\alpha,\delta}=D_{\alpha,\delta}X$ を比較すると、$\alpha\ne\delta$ を選べるので

$$
y=z=0.
$$

従って $X$ は対角行列

$$
X=
\begin{pmatrix}
x&0\\
0&w
\end{pmatrix}
$$

でなければなりません。

次に

$$
N=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
\in\mathcal T
$$

と可換する条件を使います。

$$
XN
=
\begin{pmatrix}
0&x\\
0&0
\end{pmatrix},
\qquad
NX
=
\begin{pmatrix}
0&w\\
0&0
\end{pmatrix}.
$$

従って $x=w$ です。

よって

$$
\mathcal T'=\mathbb CI.
$$

したがって

$$
\mathcal T''
=
(\mathbb CI)'
=
M_2(\mathbb C).
$$

一方 $\mathcal T$ は有限次元線形部分空間なので WOT で閉じています。

従って

$$
\boxed{
\overline{\mathcal T}^{\mathrm{WOT}}
=
\mathcal T
\ne
M_2(\mathbb C)
=
\mathcal T''.
}
$$

$\mathcal T$ は随伴で閉じていないため、二重可換子定理の仮定から外れています。

---

## Level C

### C1. 二重可換子定理の核心を再構成する

$\mathcal A\subset B(H)$ を単位を含む $*$-部分代数、$T\in\mathcal A''$ とする。

有限個のベクトル

$$
\xi_1,\ldots,\xi_n\in H
$$

と $\varepsilon>0$ が与えられたとき、ある $A\in\mathcal A$ が存在して

$$
\|(T-A)\xi_j\|<\varepsilon
\qquad(1\le j\le n)
$$

となることを、次の順で示せ。

1. $H^n$ と $\boldsymbol\xi=(\xi_1,\ldots,\xi_n)$ を導入する。
2. $K=\overline{\{A^{(n)}\boldsymbol\xi:A\in\mathcal A\}}$ を定め、$K$ が $\mathcal A^{(n)}$ に対する reducing subspace であることを示す。
3. $K$ への直交射影 $P$ の各成分 $P_{ij}$ が $\mathcal A'$ に入ることを示す。
4. $T^{(n)}P=PT^{(n)}$ を示し、$T^{(n)}\boldsymbol\xi\in K$ を導く。
5. $K$ の定義から同時近似を結論する。

- Level: C

#### 詳細解答

$H^n$ に

$$
\boldsymbol\xi=(\xi_1,\ldots,\xi_n)
$$

を置きます。

各 $A\in\mathcal A$ の対角増幅を

$$
A^{(n)}=\operatorname{diag}(A,\ldots,A)
$$

とし、

$$
K
=
\overline{\{A^{(n)}\boldsymbol\xi:A\in\mathcal A\}}
$$

と定めます。

まず $\mathcal A$ は単位を含むので

$$
\boldsymbol\xi
=
I^{(n)}\boldsymbol\xi
\in K.
$$

次に $B\in\mathcal A$ を固定します。

集合を作る元 $A^{(n)}\boldsymbol\xi$ に対し

$$
B^{(n)}A^{(n)}\boldsymbol\xi
=
(BA)^{(n)}\boldsymbol\xi.
$$

$BA\in\mathcal A$ なので右辺は $K$ に入ります。連続性から $B^{(n)}K\subset K$ です。

さらに $\mathcal A$ は随伴を取っても $\mathcal A$ に留まるため $B^*\in\mathcal A$ です。従って同じ議論で

$$
(B^{(n)})^*K
=
(B^*)^{(n)}K
\subset K.
$$

よって $K$ は $B^{(n)}$ とその随伴の双方で不変、すなわち reducing subspace です。

$P$ を $K$ への直交射影とします。reducing であることから

$$
PB^{(n)}=B^{(n)}P
$$

が全ての $B\in\mathcal A$ について成り立ちます。

$P=(P_{ij})$ と作用素行列表示すると、[対角増幅の可換子補題](#lem-vn2-amplification-commutant)から

$$
P_{ij}\in\mathcal A'
$$

です。

いま $T\in\mathcal A''$ なので、全ての $P_{ij}\in\mathcal A'$ と可換します。

従って成分ごとに

$$
T^{(n)}P=PT^{(n)}.
$$

また $\boldsymbol\xi\in K$ なので

$$
P\boldsymbol\xi=\boldsymbol\xi.
$$

したがって

$$
T^{(n)}\boldsymbol\xi
=
T^{(n)}P\boldsymbol\xi
=
PT^{(n)}\boldsymbol\xi
\in K.
$$

$K$ は $\{A^{(n)}\boldsymbol\xi:A\in\mathcal A\}$ の閉包です。よってある $A\in\mathcal A$ が存在して

$$
\|
A^{(n)}\boldsymbol\xi
-
T^{(n)}\boldsymbol\xi
\|_{H^n}
<
\varepsilon.
$$

左辺を成分へ戻すと

$$
\sum_{j=1}^n
\|(A-T)\xi_j\|^2
<
\varepsilon^2.
$$

各項は非負なので全ての $j$ について

$$
\|(A-T)\xi_j\|^2<\varepsilon^2,
$$

従って

$$
\boxed{
\|(A-T)\xi_j\|<\varepsilon
\qquad(1\le j\le n).
}
$$

これは $T$ の任意の SOT 基本近傍が $\mathcal A$ と交わることを意味します。従って

$$
T\in\overline{\mathcal A}^{\mathrm{SOT}}.
$$

二重可換子定理の難しい包含が再構成できました。
