# LREP15 Spin群とガンマ行列

<!-- definition-example-audit: strict -->

前講の[四次元複素Clifford代数の行列模型](../LREP14/index.md#thm-lrep14-matrix-model)によって、ベクトルの二乗を時空計量に一致させる積ができました。LREP10では二次複素行列からLorentz変換を作りました。今回はこの二つの構成を接続します。四次行列の共役だけで時空の回転とboost（時間軸と空間軸を混ぜるLorentz変換）を実現し、同じ時空変換に二つの持ち上げがある理由を調べます。

$V=\mathbb R^4$、基底 $e_0,e_1,e_2,e_3$、計量 $\eta=\operatorname{diag}(-1,1,1,1)$ とします。時空添字 $\mu,\nu$ は $0,1,2,3$、空間添字 $j,k,\ell$ は $1,2,3$ を走ります。

計量の成分と逆行列の成分をそれぞれ

$$
\eta_{\mu\nu}=\eta(e_\mu,e_\nu),
\qquad
(\eta^{\mu\nu})=(\eta_{\mu\nu})^{-1}
$$

と書きます。この基底では $\eta^2=I_4$ なので両者の数値は同じです。

能動変換 $x\mapsto\Lambda x$ を使い、$\Lambda^\nu{}_\mu$ は第 $\mu$ 列の第 $\nu$ 成分です。

[Clifford代数](../LREP14/index.md#def-lrep14-clifford)ではベクトルの像を元のベクトルと同じ記号で書き、実スカラー $a$ と代数の元 $a1$ も同一視します。積の二乗は計量の値を表します。

## 1. Weyl基底でのガンマ行列

[左右Weylスピノル](../LREP12/index.md#def-lrep12-weyl)に対応する二つの二成分空間を上下のブロックに置きます。この配置をWeyl基底と呼びます。ベクトルの各基底方向に対応する四次行列の組に反交換関係を課し、前講の模型を具体的に使います。$I=I_2$、$I_4$ は四次単位行列、$\sigma_j$ は[LREP5のPauli行列](../LREP5/index.md#def-lrep5-pauli-model)です。

<a id="def-lrep15-gamma"></a>

<!-- formal-statement-start -->
> **定義（ガンマ行列）**  
> Minkowski計量 $\eta=\operatorname{diag}(-1,1,1,1)$ に対して、次の反交換関係を満たす四次複素行列の組をガンマ行列とする。

$$
\{\gamma^\mu,\gamma^\nu\}
:=\gamma^\mu\gamma^\nu+\gamma^\nu\gamma^\mu
=2\eta^{\mu\nu}I_4.
$$

> ここで $\mu,\nu=0,1,2,3$ であり、$\eta^{\mu\nu}$ は逆計量の成分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep15-gamma -->
**定義の確認**。 本講では前講と同じ模型を選びます。

$$
\gamma^0=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\qquad
\gamma^j=\begin{pmatrix}0&\sigma_j\\\sigma_j&0\end{pmatrix}
\quad(j=1,2,3).
$$

[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)より $\sigma_j^2=I$ であり、異なる空間添字では $\sigma_j\sigma_k=-\sigma_k\sigma_j$ です。ブロックを掛けると

$$
(\gamma^0)^2=-I_4,\qquad
(\gamma^j)^2=I_4,
$$

$$
\gamma^0\gamma^j=
\begin{pmatrix}\sigma_j&0\\0&-\sigma_j\end{pmatrix},
\qquad
\gamma^j\gamma^0=
\begin{pmatrix}-\sigma_j&0\\0&\sigma_j\end{pmatrix}.
$$

最後に空間同士は

$$
\gamma^j\gamma^k+\gamma^k\gamma^j=
\begin{pmatrix}
\sigma_j\sigma_k+\sigma_k\sigma_j&0\\
0&\sigma_j\sigma_k+\sigma_k\sigma_j
\end{pmatrix}.
$$

$j=k$ なら $2I_4$、$j\ne k$ なら零です。時間同士は $-2I_4$、時間と空間の組は零なので全条件を確認できました。
<!-- definition-example-end -->

以後、[前講の行列模型](../LREP14/index.md#thm-lrep14-matrix-model)を実Clifford代数に制限した単射な単位的代数準同型を $\rho$ とします。$\rho(e_\mu)=\gamma^\mu$ であり、上付きの $\mu$ はここでは基底行列の番号です。

ベクトルとその像をそれぞれ

$$
x=\sum_\mu x^\mu e_\mu,
\qquad
\Gamma(x)=\rho(x)=\sum_\mu x^\mu\gamma^\mu
$$

と書きます。逆計量と計量の行列はこの基底では同じですが、一般座標で添字を自由に上げ下げできるという意味ではありません。

## 2. 偶数個のベクトルの積

一個の基底行列は非対角ブロックだけを持ち、二個掛けると対角ブロックだけになります。従って二個ずつ掛けることで上下の二成分空間を保つ変換が作れそうです。そこで偶数長の積に着目した部分代数を取り出します。一般の有限次元実ベクトル空間についても、[双線形形式](../../../基礎科目/LA/LA3E/index.md#def-la3e-bilinear-form)が対称、すなわち $\eta(v,w)=\eta(w,v)$ なら、[Clifford代数](../LREP14/index.md#def-lrep14-clifford)の同じ構成を使えます。

<a id="def-lrep15-even"></a>

<!-- formal-statement-start -->
> **定義（偶Clifford代数）**  
> 有限次元実ベクトル空間 $V$ と対称双線形形式 $\eta$ のClifford代数 $\mathrm{Cl}(V,\eta)$ の中で、偶数個のベクトルの積（単位元を含む）の実線形結合全体を偶Clifford代数 $\mathrm{Cl}^0(V,\eta)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep15-even -->
**定義の確認**。 $b=e_0e_3$ は二因子の積です。[Clifford反交換関係](../LREP14/index.md#prop-lrep14-anticommutator)から

$$
b^2=-e_0^2e_3^2=1
$$

となります。よって任意の実数 $a,c$ に対し $a+cb$ は偶部分に属します。

二つの偶長の語を連結すれば偶長であり、有限和に分配律を適用すると積について閉じます。単位元も含むので部分代数です。
<!-- definition-example-end -->

積を逆順にする操作を導入します。これは逆元そのものではなく、[テンソル代数](../LREP14/index.md#def-lrep14-tensor-algebra)で作った語の順番を反対にする操作です。商で同じ元を表す異なる語にも同じ値が対応する必要があります。

<a id="def-lrep15-reversion"></a>

<!-- formal-statement-start -->
> **定義（Clifford逆順写像）**  
> 有限次元実ベクトル空間 $V$ と対称双線形形式 $\eta$ のClifford代数 $\mathrm{Cl}(V,\eta)$ 上で、各ベクトルと実スカラーを固定し、語を逆順にする実線形写像を $s\mapsto\widetilde s$ と書く。すなわち

$$
\widetilde{v_1\cdots v_k}=v_k\cdots v_1.
$$
<!-- formal-statement-end -->

テンソル代数上で語を逆順にする実線形写像を $R$ とします。積の順序が反転し、$R(ab)=R(b)R(a)$ です。[Clifford代数の定義](../LREP14/index.md#def-lrep14-clifford)の生成関係 $d(v)=v^2-\eta(v,v)1$ 自体は不変なので、

$$
R(a d(v)b)=R(b)d(v)R(a)
$$

も商を定める両側イデアルの元です。線形性からイデアルの任意の元についても同様です。従って代表元の差がイデアルに属せば逆順にした差も属し、商でこの写像が定まります。二回逆順にすれば元に戻り、$\widetilde{st}=\widetilde t\,\widetilde s$ です。

<!-- definition-example-start: def-lrep15-reversion -->
**定義の確認**。 $\widetilde{e_0e_3}=e_3e_0=-e_0e_3$ です。$s=2+e_0e_3$ なら $\widetilde s=2-e_0e_3$、再度逆順にすると $s$ に戻ります。$s\widetilde s=4-(e_0e_3)^2=3$ であり、一般には $\widetilde s$ は $s^{-1}$ ではありません。
<!-- definition-example-end -->

## 3. 偶部分を二次行列で読む

二次行列に対して余因子を転置した行列を随伴行列と呼び、次のように書きます。

$$
B=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\qquad
\operatorname{adj}B=\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
$$

直接積を取ると、

$$
B\operatorname{adj}B=(\det B)I=\operatorname{adj}B\,B
$$

です。二次の場合、この操作は成分について線形です。

記号 $\dagger$ は複素共役転置であり、$\operatorname{adj}$ とは異なります。$M_2(\mathbb C)$ は二次複素正方行列全体、$\operatorname{tr}B$ は対角成分の和です。

<a id="thm-lrep15-even-model"></a>

<!-- formal-statement-start -->
> **定理（実偶Clifford代数の行列模型）**  
> $V=\mathbb R^4$、$\eta=\operatorname{diag}(-1,1,1,1)$ とし、第1節のWeyl基底での行列表現を $\rho$ とする。実偶Clifford代数の像は

$$
\rho(\mathrm{Cl}^0(V,\eta))
=\left\{\begin{pmatrix}B&0\\0&(\operatorname{adj}B)^\dagger\end{pmatrix}: B\in M_2(\mathbb C)\right\}.
$$

> この表示で逆順写像の上側ブロックは $\operatorname{adj} B$ となる。
<!-- formal-statement-end -->

**証明の見取り図。** 偶数長の順序付き積は8個です。その上側ブロックが二次複素行列全体の実基底になること、下側ブロックと逆順写像が上側だけから決まることを確認します。

<!-- proof-start -->
### 証明

[前講の順序付きClifford単項式による生成](../LREP14/index.md#prop-lrep14-spanning)と[行列模型の独立性](../LREP14/index.md#thm-lrep14-matrix-model)から、偶部分は単位元、六つの二因子積、四因子積を実基底に持ち、$\rho$ は単射です。$j,k,\ell$ が $1,2,3$ の巡回順のとき、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)で $\sigma_j\sigma_k=i\sigma_\ell$ です。従って基底として次の8個を選べます。

| 元 | 上側ブロック | 下側ブロック |
| --- | --- | --- |
| $1$ | $I$ | $I$ |
| $e_0e_j$（3個） | $\sigma_j$ | $-\sigma_j$ |
| $e_je_k$（巡回3組） | $i\sigma_\ell$ | $i\sigma_\ell$ |
| $e_0e_1e_2e_3$ | $iI$ | $-iI$ |

最後の行は $(\gamma^0\gamma^1)(\gamma^2\gamma^3)$ の上側が $\sigma_1(i\sigma_1)=iI$、下側が $-\sigma_1(i\sigma_1)=-iI$ となることによります。

$I,\sigma_1,\sigma_2,\sigma_3$ は二次複素行列の複素基底です。実際、線形結合の対角成分は $b_0\pm b_3$、非対角成分は $b_1\mp ib_2$ なので、四成分が零なら全係数が零です。複素次元が4だから基底であり、各行列とその $i$ 倍は実基底です。

二次行列では $\operatorname{adj}B=(\operatorname{tr} B)I-B$。従って $\operatorname{adj}I=I$、$\operatorname{adj}\sigma_j=-\sigma_j$、$\operatorname{adj}(i\sigma_j)=-i\sigma_j$、$\operatorname{adj}(iI)=iI$ です。共役転置を取ると、表の下側が一行ずつ得られます。この対応は実線形なので任意の実線形結合にも成立します。

逆順写像は二因子積に符号 $-1$、四因子積に符号 $(-1)^6=1$ を与えます。従って上側ブロックで $I,iI$ を固定し、$\sigma_j,i\sigma_j$ の符号を反転します。これは上で計算した $\operatorname{adj}$ と一致します。$\square$
<!-- proof-end -->

例えば $s=2+e_0e_3$ の上側は $\operatorname{diag}(3,1)$、下側は $\operatorname{diag}(1,3)$ です。その逆順写像の上側は $\operatorname{diag}(1,3)$。積はどちらのブロックも $3I$ となり、第2節の計算と一致します。

## 4. Spin群と共役作用

時空変換の持ち上げを構成するため、[偶Clifford代数](#def-lrep15-even)の元のうち、[逆順写像](#def-lrep15-reversion)が逆元になるものを選びます。ここで持ち上げとは、もとの時空変換を共役で実現する代数の元を指します。[Lorentz群の単位元成分](../LREP9/index.md#def-lrep9-lorentz-group)を $SO^+(1,3)$ と書きます。四次元のこの符号では、これによって時間の向きと空間の向きを保つLorentz変換の持ち上げが得られます。一般の符号や次元で同じ条件だけを無検証で使ってはいけません。

<a id="def-lrep15-spin"></a>

<!-- formal-statement-start -->
> **定義（Spin群）**  
> $V=\mathbb R^4$、$\eta=\operatorname{diag}(-1,1,1,1)$ とする。逆順写像を $s\mapsto\widetilde s$ とする。本講で扱う連結Spin群は

$$
\operatorname{Spin}^+(1,3)=
\{s\in\mathrm{Cl}^0(V,\eta):s\widetilde s=1\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep15-spin -->
**定義の確認**。 $b=e_0e_3$ とし $s=\cosh u+b\sinh u$（$u\in\mathbb R$）を取ります。偶部分に属し、$\widetilde b=-b$、$b^2=1$ なので

$$
s\widetilde s=(\cosh u+b\sinh u)(\cosh u-b\sinh u)
=\cosh^2u-\sinh^2u=1.
$$

逆の順でも積は1です。従って $s^{-1}=\widetilde s$ です。

[実偶Clifford代数の行列模型](#thm-lrep15-even-model)の基底表では $1$ と $b=e_0e_3$ の上側はそれぞれ $I$ と $\sigma_3$ なので、$s$ の上側は

$$
\begin{aligned}
B&=\cosh u\,I+\sinh u\,\sigma_3\\
&=\operatorname{diag}(e^u,e^{-u}).
\end{aligned}
$$

例えば $u=\log 2$ なら $B=\operatorname{diag}(2,1/2)$ です。逆順の上側は $\operatorname{adj}B=\operatorname{diag}(1/2,2)$ なので $B\operatorname{adj}B=I$ となり、代数での積1を行列でも確認できます。上側だけで元が一意に決まるため、この判定で十分です。
<!-- definition-example-end -->

なぜこの条件がちょうどLorentz変換を生むのでしょうか。[実偶Clifford代数の行列模型](#thm-lrep15-even-model)によって、二次行列の行列式1という条件に帰着できます。その行列の群を $SL(2,\mathbb C)=\{A\in M_2(\mathbb C):\det A=1\}$ と書きます。

<a id="thm-lrep15-spin-cover"></a>

<!-- formal-statement-start -->
> **定理（Spin群とLorentz二重被覆）**  
> 四次元Minkowski空間 $V$ と上の $\operatorname{Spin}^+(1,3)$ に対し、上側ブロックを取る写像は群同型

$$
\operatorname{Spin}^+(1,3)\cong SL(2,\mathbb C)
$$

> を与える。上側ブロックを $A$ とすれば

$$
S(A):=\rho(s)=
\begin{pmatrix}A&0\\0&(A^\dagger)^{-1}\end{pmatrix}.
$$

> 共役 $x\mapsto sxs^{-1}$ は $V$ を保ち、$SO^+(1,3)$ への二重被覆を与える。ここで $SO^+(1,3)$ は行列式1で未来向きを保つLorentz群である。核は $\{1,-1\}$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 逆順写像との積を上側ブロックで読むと行列式になります。次にベクトル行列の上側非対角ブロックを共役して、LREP10で構成したエルミート行列の作用と同じになることを示します。

<!-- proof-start -->
### 証明

[実偶Clifford代数の行列模型](#thm-lrep15-even-model)により上側ブロックが $B$ のとき、$s\widetilde s$ の上側は

$$

B\operatorname{adj}B=(\det B)I

$$

です。上側ブロックが元を一意に決めるので、

$$

s\widetilde s=1\quad\Longleftrightarrow\quad\det B=1.

$$

この場合 $\operatorname{adj} B=B^{-1}$ です。上側ブロックは積で通常の行列積を取り、単位元の上側は $I$、逆元は上側 $B^{-1}$ の元です。

したがって定義した集合は群で、上側ブロックは $SL(2,\mathbb C)$ との群同型を与えます。この写像と逆写像は実線形な座標対応の制限なので連続で滑らかです。[SL(2,C)の道連結性](../LREP10/index.md#lem-lrep10-polar-connectivity)から群は連結です。

[LREP10の四元ベクトルのエルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)を用います。

$$
H(x)=x^0 I+\sum_j x^j\sigma_j
$$

$H(x)$ の跡は $2x^0$ なので、第3節で確認した公式に代入すると、

$$
\begin{aligned}
\operatorname{adj}H(x)&=(\operatorname{tr}H(x))I-H(x)\\
&=x^0I-\sum_j x^j\sigma_j
\end{aligned}
$$

となります。従って

$$
\Gamma(x)=
\begin{pmatrix}0&H(x)\\-\operatorname{adj}H(x)&0\end{pmatrix}.
$$

$A\in SL(2,\mathbb C)$ に対しブロック積を取ると

$$
S(A)\Gamma(x)S(A)^{-1}
=\begin{pmatrix}
0&AH(x)A^\dagger\\
-(A^\dagger)^{-1}\operatorname{adj}H(x)A^{-1}&0
\end{pmatrix}.
$$

任意の二次行列 $H$ について

$$
\operatorname{adj}(AHA^\dagger)
=(A^\dagger)^{-1}\operatorname{adj}(H)A^{-1}.
$$

$H$ が可逆なら、左辺は $\det(AHA^\dagger)(AHA^\dagger)^{-1}$ であり、$\det A=1$ と $\det A^\dagger=\overline{\det A}=1$ を使うと、

$$
\begin{aligned}
\operatorname{adj}(AHA^\dagger)
&=(\det H)(A^\dagger)^{-1}H^{-1}A^{-1}\\
&=(A^\dagger)^{-1}\operatorname{adj}(H)A^{-1}.
\end{aligned}
$$

となります。$H$ が特異なら $H+\varepsilon I$ に置き換えます。その行列式は $\varepsilon$ の二次多項式なので零点は高々二つです。それを避けて $\varepsilon\to0$ とすれば随伴行列の成分は連続なので同じ式が成立します。

[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)によるLorentz変換を $\Lambda=\Phi(A)$ と書くと $AH(x)A^\dagger=H(\Lambda x)$ です。下側も上の随伴行列の式によって $-\operatorname{adj}H(\Lambda x)$ になるので

$$
S(A)\Gamma(x)S(A)^{-1}=\Gamma(\Lambda x).
$$

$\rho$ は単射なので $sxs^{-1}=\Lambda x\in V$ です。[SL(2,C)からSO^+(1,3)への二重被覆](../LREP10/index.md#thm-lrep10-double-cover)を上側ブロックの同型で移せば、全射性、二重被覆性、核 $\{\pm1\}$ が得られます。$\square$
<!-- proof-end -->

この群は実際に単位長のベクトルの偶数個の積で作れます。次節で具体的な回転とboostを作り、その後に全ての元がその積になることを確認します。

## 5. ガンマ行列の共変変換則

ベクトルの基底ごとに前節の共役を使えば、ガンマ行列がどのように混ざるかを読み取れます。

<a id="prop-lrep15-gamma-covariance"></a>

<!-- formal-statement-start -->
> **命題（ガンマ行列の共変変換則）**  
> $s\in\operatorname{Spin}^+(1,3)$、$S=\rho(s)$、$\Lambda$ をその像の能動Lorentz変換とする。第1節の基底行列について

$$
S\gamma^\mu S^{-1}
=\sum_{\nu=0}^3\Lambda^\nu{}_\mu\gamma^\nu.
$$

> 逆の共役では $\Lambda$ を $\Lambda^{-1}$ に置き換える。
<!-- formal-statement-end -->

**証明の見取り図。** ベクトル全体の変換式で $x=e_\mu$ を選びます。

<!-- proof-start -->
### 証明

[Spin群とLorentz二重被覆](#thm-lrep15-spin-cover)の共役作用で $x=e_\mu$ とすると左辺は $S\Gamma(e_\mu)S^{-1}=S\gamma^\mu S^{-1}$。右辺は線形性から

$$
\Gamma(\Lambda e_\mu)=
\Gamma\left(\sum_\nu\Lambda^\nu{}_\mu e_\nu\right)
=\sum_\nu\Lambda^\nu{}_\mu\gamma^\nu.
$$

$s^{-1}$ の像は $\Lambda^{-1}$ なので同じ公式を適用すれば逆の共役の式を得ます。$\square$
<!-- proof-end -->

例えば $\Lambda$ の時間軸の像が $\cosh\chi\,e_0+\sinh\chi\,e_3$ であれば、時間方向のガンマ行列はその係数で二つの行列の和に移ります。この係数を実際の積から求めましょう。

## 6. 回転とboostを積から作る

回転角を $\theta$、boostの双曲線角（ラピディティ）を $\chi$ とします。正の $z$ 方向の能動boostでは、時間軸と空間軸の像はそれぞれ

$$
\begin{aligned}
e_0&\longmapsto\cosh\chi\,e_0+\sinh\chi\,e_3,\\
e_3&\longmapsto\sinh\chi\,e_0+\cosh\chi\,e_3
\end{aligned}
$$

となります。これは [LREP10の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)で使った実パラメータを $\chi$ と書いたものです。

<a id="prop-lrep15-rotation-boost"></a>

<!-- formal-statement-start -->
> **命題（回転とboostのSpin持ち上げ）**  
> 実数 $\theta,\chi$ に対し、四次元Minkowski空間のClifford代数で

$$
r=\cos(\theta/2)-e_1e_2\sin(\theta/2),
\quad
h=\cosh(\chi/2)+e_0e_3\sinh(\chi/2)
$$

> と置く。これらは $\operatorname{Spin}^+(1,3)$ の元である。共役作用はそれぞれ $z$ 軸の能動回転（角度 $\theta$）と正の $z$ 方向の能動boost（ラピディティ $\chi$）を与える。
<!-- formal-statement-end -->

**証明の見取り図。** 回転用の二因子積の二乗は $-1$、boost用の二因子積の二乗は $1$ です。これが三角関数と双曲線関数の違いを生みます。

<!-- proof-start -->
### 証明

[Clifford反交換関係](../LREP14/index.md#prop-lrep14-anticommutator)と[逆順写像の定義](#def-lrep15-reversion)から、

$$
\begin{aligned}
p=e_1e_2,&\qquad p^2=-1,\qquad \widetilde p=-p,\\
q=e_0e_3,&\qquad q^2=1,\qquad \widetilde q=-q
\end{aligned}
$$

となります。回転の係数とboostの係数をそれぞれ

$$
\begin{aligned}
c&=\cos(\theta/2),& d&=\sin(\theta/2),\\
a&=\cosh(\chi/2),& b&=\sinh(\chi/2)
\end{aligned}
$$

とおくと、$r\widetilde r=c^2+d^2=1$、$h\widetilde h=a^2-b^2=1$ です。

両方とも偶部分なので[Spin群の定義](#def-lrep15-spin)を満たします。逆元は

$$
r^{-1}=\widetilde r=c+dp,
\qquad
h^{-1}=\widetilde h=a-bq
$$

です。

$p e_1=-e_2$、$e_1p=e_2$、$p e_2=e_1$、$e_2p=-e_1$ です。また $p e_1p=e_1$、$p e_2p=e_2$ です。従って

$$
\begin{aligned}
r e_1r^{-1}
&=(c-dp)e_1(c+dp)\\
&=c^2e_1+cd(e_1p-pe_1)-d^2pe_1p\\
&=(c^2-d^2)e_1+2cd e_2\\
&=\cos\theta\,e_1+\sin\theta\,e_2.
\end{aligned}
$$

$$
\begin{aligned}
r e_2r^{-1}
&=c^2e_2+cd(e_2p-pe_2)-d^2pe_2p\\
&=(c^2-d^2)e_2-2cd e_1\\
&=-\sin\theta\,e_1+\cos\theta\,e_2.
\end{aligned}
$$

$p$ は $e_0,e_3$ と二回交換するのでそれらと可換です。従って共役でその二方向は固定されます。

$q e_0=e_3$、$e_0q=-e_3$、$q e_3=e_0$、$e_3q=-e_0$ です。また $q e_0q=-e_0$、$q e_3q=-e_3$ です。従って

$$
\begin{aligned}
h e_0h^{-1}
&=(a+bq)e_0(a-bq)\\
&=a^2e_0+ab(qe_0-e_0q)-b^2qe_0q\\
&=(a^2+b^2)e_0+2ab e_3\\
&=\cosh\chi\,e_0+\sinh\chi\,e_3.
\end{aligned}
$$

$$
\begin{aligned}
h e_3h^{-1}
&=a^2e_3+ab(qe_3-e_3q)-b^2qe_3q\\
&=(a^2+b^2)e_3+2ab e_0\\
&=\sinh\chi\,e_0+\cosh\chi\,e_3.
\end{aligned}
$$

$q$ は $e_1,e_2$ と可換なのでその二方向は固定されます。$\square$
<!-- proof-end -->

行列表示でも検算できます。[偶代数の行列模型](#thm-lrep15-even-model)から上側ブロックは

$$
A_r=\begin{pmatrix}e^{-i\theta/2}&0\\0&e^{i\theta/2}\end{pmatrix},
\qquad
A_h=\begin{pmatrix}e^{\chi/2}&0\\0&e^{-\chi/2}\end{pmatrix}.
$$

回転では $S(A_r)=\operatorname{diag}(A_r,A_r)$、boostでは $S(A_h)=\operatorname{diag}(A_h,A_h^{-1})$ です。例えば $A_r\sigma_1 A_r^{-1}$ の非対角成分は $e^{-i\theta},e^{i\theta}$ なので $\cos\theta\,\sigma_1+\sin\theta\,\sigma_2$ になります。従って

$$
S(A_r)\gamma^1 S(A_r)^{-1}
=\cos\theta\,\gamma^1+\sin\theta\,\gamma^2.
$$

boostでは $\gamma^0$ の上側非対角ブロックが $A_h^2=\cosh\chi\,I+\sinh\chi\,\sigma_3$、下側非対角ブロックが $-A_h^{-2}=-\cosh\chi\,I+\sinh\chi\,\sigma_3$ になるので

$$
S(A_h)\gamma^0 S(A_h)^{-1}
=\cosh\chi\,\gamma^0+\sinh\chi\,\gamma^3.
$$

これは[共変変換則](#prop-lrep15-gamma-covariance)と一致します。角度 $2\pi$ の回転では $r=-1$ となり、共役は恒等変換ですが四成分列への行列作用は $-I_4$ です。角度 $4\pi$ で $r=1$ に戻ります。

<a id="prop-lrep15-even-products"></a>

<!-- formal-statement-start -->
> **命題（単位ベクトル積によるSpin群の構成）**  
> $V=\mathbb R^4$、$\eta=\operatorname{diag}(-1,1,1,1)$ とする。$\operatorname{Spin}^+(1,3)$ は、次の条件を満たす偶数個のベクトルの積全体に等しい。

$$

s=v_1\cdots v_{2m},\qquad
\eta(v_k,v_k)\in\{-1,1\},\qquad
\prod_{k=1}^{2m}\eta(v_k,v_k)=1.

$$

> ここで $m$ は非負整数、各 $v_k$ は $V$ の元とし、空積も含める。
<!-- formal-statement-end -->

**証明の見取り図。** 一方の包含は逆順に掛ければ得られます。逆は[SL(2,C)の左極分解](../LREP10/index.md#lem-lrep10-polar-connectivity)を使い、回転とboostをそれぞれ二本の単位空間的ベクトル（計量による二乗が1のベクトル）の積として構成します。

<!-- proof-start -->
### 証明

$s=v_1\cdots v_{2m}$ に対し、逆順との積の中央から $v_{2m}^2$、$v_{2m-1}^2$ と順にスカラーを取り出すと

$$
s\widetilde s=\prod_{k=1}^{2m}\eta(v_k,v_k).
$$

これが1なら偶部分の元であり、Spin群に入ります。

逆に任意のSpin群の元の上側ブロック $A\in SL(2,\mathbb C)$ を取ります。[SL(2,C)の極分解](../LREP10/index.md#lem-lrep10-polar-connectivity)より $A=PU$、$P$ は正定値エルミートで行列式1、$U\in SU(2)$ です。

[スペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)で二次のエルミート行列を対角化すれば、$P$ の固有値は正で積1なので $e^t,e^{-t}$ と書けます。

固有基底を列に並べたユニタリ行列を $W_0$ とします。$\delta=\det W_0$ は絶対値1なので、

$$
W=W_0\operatorname{diag}(\overline\delta,1)
$$

とすれば固有ベクトルの長さも固有値も変わらず、

$$
\det W=\delta\overline\delta=1
$$

となります。従って

$$
P=W\operatorname{diag}(e^t,e^{-t})W^{-1},
\qquad W\in SU(2).
$$

任意の $U\in SU(2)$ は[LREP5の軸角表示](../LREP5/index.md#prop-lrep5-rodrigues)の形で

$$
U=\cos u\,I-i\sin u\sum_j n^j\sigma_j
$$

と表せます。ここで $n$ は単位空間的ベクトルです。

実際、第一列を $(\alpha,\beta)^{\mathsf T}$ とすれば、ユニタリ性と行列式1から第二列は $(-\overline\beta,\overline\alpha)^{\mathsf T}$ です。$\alpha=a+ib_3$、$\beta=-b_2+ib_1$ と実成分に分けると

$$
U=aI+i\sum_{j=1}^3 b_j\sigma_j,\qquad
a^2+\sum_{j=1}^3 b_j^2=1.
$$

そこで $a=\cos u$ とし、$\sin u\ne0$ なら $n^j=-b_j/\sin u$ と選びます。$\sum_j(n^j)^2=1$ です。$\sin u=0$ のときは軸は任意です。

$n$ に垂直な単位ベクトル $v$ を選び、$w=n\times v$ とすると、$v,w$ は直交単位ベクトルで $v\times w=n$ です。

空間ベクトル $v=\sum_j v^j e_j$ に対して $X(v)=\sum_jv^j\sigma_j$ と書けば、

$$
\rho(v)=\begin{pmatrix}0&X(v)\\X(v)&0\end{pmatrix}
$$

です。従って $\rho(vw)$ の上側は $X(v)X(w)$ となり、[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)により

$$
X(v)X(w)=(v\cdot w)I+iX(v\times w)=iX(n)
$$

です。そこで

$$
v(\cos u\,v-\sin u\,w)
=\cos u-vw\sin u
$$

は上側 $U$ の元です。第二因子の二乗は、[Clifford反交換関係](../LREP14/index.md#prop-lrep14-anticommutator)と $v^2=w^2=1$、$vw+wv=0$ から

$$
(\cos u\,v-\sin u\,w)^2=\cos^2u+\sin^2u=1
$$

です。従って二本とも単位空間的ベクトルです。

また

$$
e_3(\cosh t\,e_3-\sinh t\,e_0)
=\cosh t+e_0e_3\sinh t
$$

の上側は $\operatorname{diag}(e^t,e^{-t})$ です。第二因子の二乗は $e_3^2=1$、$e_0^2=-1$、$e_3e_0+e_0e_3=0$ を使って、

$$
(\cosh t\,e_3-\sinh t\,e_0)^2=\cosh^2t-\sinh^2t=1
$$

となります。従って

$$
A=W\operatorname{diag}(e^t,e^{-t})W^{-1}U
$$

の四つの因子は全て二本の単位空間的ベクトルの積から得られます。積を取った元の上側は $A$ であり、[偶代数の行列模型](#thm-lrep15-even-model)の一意性から元のSpin群の元に一致します。$\square$
<!-- proof-end -->

ここまでで偶Clifford積の構成と二次複素行列による構成を結び付けました。次講では上下の二成分空間がそれぞれどの表現を担うかを詳しく調べます。

## 7. 演習

### Level A

<a id="ex-lrep15-a01"></a>

#### LREP15-A01 時間・空間の反交換
- Level: A
- ID: LREP15-A01

第1節の行列から $(\gamma^0\gamma^2)^2$ と $(\gamma^1\gamma^2)^2$ を求めよ。

<!-- solution-start -->
**詳細解答。** [ガンマ行列の定義](#def-lrep15-gamma)より $\gamma^0\gamma^2=-\gamma^2\gamma^0$、$\gamma^1\gamma^2=-\gamma^2\gamma^1$ です。

$$
(\gamma^0\gamma^2)^2=-(\gamma^0)^2(\gamma^2)^2=I_4,
$$

$$
(\gamma^1\gamma^2)^2=-(\gamma^1)^2(\gamma^2)^2=-I_4.
$$

第一の積は二乗が正、第二の積は負なので、それぞれ双曲線関数と三角関数による変換に対応します。
<!-- solution-end -->

<a id="ex-lrep15-a02"></a>

#### LREP15-A02 逆順写像と逆元
- Level: A
- ID: LREP15-A02

$s=3+2e_1e_2$ の逆順写像と逆元を求め、Spin群に入るか調べよ。

<!-- solution-start -->
**詳細解答。** [Clifford逆順写像](#def-lrep15-reversion)より $\widetilde s=3-2e_1e_2$。$p=e_1e_2$ と置くと $p^2=-1$ なので

$$
s\widetilde s=\widetilde s s=9-4p^2=13.
$$

よって $s^{-1}=(3-2p)/13$。偶部分ですが、[Spin群の条件](#def-lrep15-spin)の積1を満たさないため $s$ 自体は属しません。$s/\sqrt{13}$ なら積は1です。
<!-- solution-end -->

<a id="ex-lrep15-a03"></a>

#### LREP15-A03 ブロックの復元
- Level: A
- ID: LREP15-A03

$A=\begin{pmatrix}1&1+i\\0&1\end{pmatrix}$ に対応する $S(A)$ の下側ブロックを求めよ。

<!-- solution-start -->
**詳細解答。** $\det A=1$ なので [Spin群とLorentz二重被覆](#thm-lrep15-spin-cover)を適用できます。

$$
A^\dagger=\begin{pmatrix}1&0\\1-i&1\end{pmatrix},
\qquad
(A^\dagger)^{-1}=\begin{pmatrix}1&0\\-1+i&1\end{pmatrix}.
$$

積を取ると左下成分は $(1-i)+(-1+i)=0$、対角は1です。従って後者が下側ブロックです。
<!-- solution-end -->

<a id="ex-lrep15-a04"></a>

#### LREP15-A04 半角と二重被覆
- Level: A
- ID: LREP15-A04

角度 $\theta=\pi,2\pi,4\pi$ での $z$ 軸回転の持ち上げ $r$ と $e_1$ の像を求めよ。

<!-- solution-start -->
**詳細解答。** [回転とboostのSpin持ち上げ](#prop-lrep15-rotation-boost)に代入します。$\theta=\pi$ なら $\cos(\pi/2)=0,\sin(\pi/2)=1$ なので、

$$
r=-e_1e_2,\qquad re_1r^{-1}=-e_1
$$

です。$\theta=2\pi$ と $\theta=4\pi$ では、それぞれ

$$
\begin{array}{c|cc}
\theta& r&re_1r^{-1}\\
\hline
2\pi&-1&e_1\\
4\pi&1&e_1
\end{array}
$$

となります。後二者はベクトルへの作用が同一でも群の元としては異なります。
<!-- solution-end -->

### Level B

<a id="ex-lrep15-b01"></a>

#### LREP15-B01 実偶部分の条件
- Level: B
- ID: LREP15-B01

上側が $B=I+i\sigma_1+2\sigma_3$ の実偶Clifford元を基底の積で表し、逆順との積の上側と下側を求めよ。

<!-- solution-start -->
**詳細解答。** [実偶Clifford代数の行列模型](#thm-lrep15-even-model)の表から上側 $i\sigma_1$ は $e_2e_3$、$2\sigma_3$ は $2e_0e_3$ なので $s=1+e_2e_3+2e_0e_3$ です。

$$
B=\begin{pmatrix}3&i\\i&-1\end{pmatrix},
\qquad
\operatorname{adj}B=\begin{pmatrix}-1&-i\\-i&3\end{pmatrix}.
$$

積の対角成分は $-3-i^2=-2$、非対角成分は $-3i+3i=0$ と $-i+i=0$。従って $B\operatorname{adj}B=-2I$ であり、下側も $(\operatorname{adj}(-2I))^\dagger=-2I$ です。従って $s\widetilde s=-2$ でSpin群には入りません。
<!-- solution-end -->

<a id="ex-lrep15-b02"></a>

#### LREP15-B02 boostの行列積
- Level: B
- ID: LREP15-B02

$\chi=\log 4$ の正の $z$ 方向boostについて $S\gamma^3S^{-1}$ をブロック積で求めよ。

<!-- solution-start -->
**詳細解答。** [回転とboostのSpin持ち上げ](#prop-lrep15-rotation-boost)の上側は $A=\operatorname{diag}(2,1/2)$、下側は $A^{-1}$ です。従って

$$
S\gamma^3S^{-1}
=\begin{pmatrix}0&A\sigma_3 A\\ A^{-1}\sigma_3 A^{-1}&0\end{pmatrix}.
$$

上側非対角は $\operatorname{diag}(4,-1/4)$、下側非対角は $\operatorname{diag}(1/4,-4)$ です。上側を $\alpha I+\beta\sigma_3$ と置くと $\alpha+\beta=4,\alpha-\beta=-1/4$ なので $\alpha=15/8,\beta=17/8$。下側は $-\alpha I+\beta\sigma_3$ です。従って

$$
S\gamma^3S^{-1}=\frac{15}{8}\gamma^0+\frac{17}{8}\gamma^3.
$$

$\sinh(\log 4)=15/8$、$\cosh(\log 4)=17/8$ と一致し、二乗は $-(15/8)^2+(17/8)^2=1$ です。
<!-- solution-end -->

<a id="ex-lrep15-b03"></a>

#### LREP15-B03 光的ベクトルでも共役できる
- Level: B
- ID: LREP15-B03

$x=e_0+e_3$ に対し、$A=\operatorname{diag}(2,1/2)$ の共役で $\Gamma(x)$ の像を求めよ。$\Gamma(x)$ 自体の可逆性は必要か。

<!-- solution-start -->
**詳細解答。** $H(x)=\operatorname{diag}(2,0)$、$\operatorname{adj}H(x)=\operatorname{diag}(0,2)$ です。[Spin群とLorentz二重被覆](#thm-lrep15-spin-cover)のブロック積に代入すると

$$
AH(x)A^\dagger=\operatorname{diag}(8,0),
$$

$$
(A^\dagger)^{-1}\operatorname{adj}H(x)A^{-1}
=\operatorname{diag}(0,8).
$$

両方とも元のブロックの4倍なので像は $4\Gamma(x)$ です。[ガンマ行列の反交換関係](#def-lrep15-gamma)から $\Gamma(x)^2=(-1+1)I_4=0$、$\Gamma(x)\ne0$。従って $\Gamma(x)$ は可逆ではありませんが、共役に必要なのは $S$ の可逆性だけなので計算は成立します。
<!-- solution-end -->

<a id="ex-lrep15-b04"></a>

#### LREP15-B04 単位ベクトルの積
- Level: B
- ID: LREP15-B04

$x$ 軸回転角 $\pi/2$ の持ち上げを二本の単位空間的ベクトルの積で作り、上側ブロックを求めよ。

<!-- solution-start -->
**詳細解答。** [単位ベクトル積によるSpin群の構成](#prop-lrep15-even-products)で $v=e_2,w=e_3,u=\pi/4$ と選びます。$v\times w$ は正の $x$ 方向です。

$$
s=e_2\frac{e_2-e_3}{\sqrt2}
=\frac{1-e_2e_3}{\sqrt2}.
$$

第二因子の二乗は $(1+1-e_2e_3-e_3e_2)/2=1$。第一因子の二乗も1です。上側は [実偶Clifford代数の行列模型](#thm-lrep15-even-model)により $(I-i\sigma_1)/\sqrt2$ です。$p=e_2e_3$ とすると $pe_2=-e_3$、$e_2p=e_3$、$pe_2p=e_2$ です。従って

$$

s e_2s^{-1}
=\frac{e_2+e_2p-pe_2-pe_2p}{2}
=\frac{2e_3}{2}=e_3.

$$

さらに $pe_3=e_2$、$e_3p=-e_2$、$pe_3p=e_3$ なので

$$
s e_3s^{-1}
=\frac{e_3+e_3p-pe_3-pe_3p}{2}
=-e_2.
$$

$p$ は $e_0,e_1$ と可換なのでこれらの方向は固定されます。従って $e_2\mapsto e_3$、$e_3\mapsto-e_2$ の正の $x$ 軸回転です。
<!-- solution-end -->

### Level C

<a id="ex-lrep15-c01"></a>

#### LREP15-C01 回転とboostの合成順序
- Level: C
- ID: LREP15-C01

$z$ 軸の角度 $\pi/2$ の能動回転を $r$、正の $x$ 方向のラピディティ $\chi$ のboostを $h_x=\cosh(\chi/2)+e_0e_1\sinh(\chi/2)$ とする。$h_x r$ と $r h_x$ の共役で $e_0,e_1$ がどこへ移るか求め、$\chi\ne0$ なら両作用が異なることを示せ。

<!-- solution-start -->
**詳細解答。** $h_x$ について $q=e_0e_1$ と置けば、[Clifford反交換関係](../LREP14/index.md#prop-lrep14-anticommutator)と[逆順写像](#def-lrep15-reversion)より $q^2=1$、$\widetilde q=-q$ です。

偶部分に属し、

$$
h_x\widetilde h_x=\cosh^2(\chi/2)-\sinh^2(\chi/2)=1
$$

なので [Spin群の条件](#def-lrep15-spin)を満たします。$a=\cosh(\chi/2),b=\sinh(\chi/2)$ とすると、

$$
qe_0=e_1,\qquad e_0q=-e_1,\qquad qe_0q=-e_0
$$

なので

$$
h_xe_0h_x^{-1}=(a^2+b^2)e_0+2ab e_1
=\cosh\chi\,e_0+\sinh\chi\,e_1.
$$

また $qe_1=e_0,e_1q=-e_0,qe_1q=-e_1$ なので

$$
h_xe_1h_x^{-1}=\sinh\chi\,e_0+\cosh\chi\,e_1.
$$

$q$ は $e_2$ と可換なので $h_xe_2h_x^{-1}=e_2$。[回転のSpin持ち上げ](#prop-lrep15-rotation-boost)より $r e_0r^{-1}=e_0,r e_1r^{-1}=e_2$。積の逆元は $(h_xr)^{-1}=r^{-1}h_x^{-1}$ なので

$$
(h_xr)x(h_xr)^{-1}=h_x(rx r^{-1})h_x^{-1}.
$$

従って積の共役では右側の元が先に作用し、

$$
\begin{aligned}
(h_xr)e_0(h_xr)^{-1}&=\cosh\chi\,e_0+\sinh\chi\,e_1,\\
(h_xr)e_1(h_xr)^{-1}&=e_2.
\end{aligned}
$$

反対の順序では

$$
\begin{aligned}
(rh_x)e_0(rh_x)^{-1}&=\cosh\chi\,e_0+\sinh\chi\,e_2,\\
(rh_x)e_1(rh_x)^{-1}&=\sinh\chi\,e_0+\cosh\chi\,e_2.
\end{aligned}
$$

$\chi\ne0$ なら $\sinh\chi\ne0$ なので時間軸の像だけでも二つの変換が異なると分かります。例えば第一の時間軸の像の二乗は

$$
-\cosh^2\chi+\sinh^2\chi=-1
$$

です。第二も同じ二乗なので、変換順序は異なっても時空計量を保存します。

[ガンマ行列の共変変換則](#prop-lrep15-gamma-covariance)で各 $e_\mu$ を $\gamma^\mu$ に置き換えれば、同じ合成順序の行列共役の結果が得られます。
<!-- solution-end -->

## 8. まとめと次講

ガンマ行列は計量を反交換関係に組み込みます。実偶Clifford代数の上側二次ブロックを読むと、逆順との積が1である条件は行列式1に一致しました。こうしてSpin群は $SL(2,\mathbb C)$ と同型になり、四元ベクトルをガンマ行列の共役として変換できます。次講LREP16「Diracスピノルとchirality」では、上下の二成分空間の表現と、それらを分ける射影を構成します。
