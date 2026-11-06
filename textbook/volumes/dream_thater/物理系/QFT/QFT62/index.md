# QFT62 相対エントロピーの領域単調性と平均ヌルエネルギーへの橋

[QFT61の相対エントロピーとモジュラーエネルギーの差](../QFT61/index.md#prop-qft61-relative-balance)は、ある領域で二つの状態を比べる量を与えました。しかし観測する領域を小さくすると、その区別はどう変化するのでしょうか。たとえば広い区間では区別できた二つの状態が、その一部分では同じに見えることがあります。

この問いは、量子情報では[QINF20のデータ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)として証明済みです。ここではその定理を領域の包含関係へ正確に適用し、エントロピー差とエネルギー差の不等式へ変形します。最後に、特殊な真空のモジュラー流について**追加の幾何学的入力**があれば、平均ヌルエネルギーの非負性にどう接続するかを調べます。

前半は有限cutoffでHilbert空間がテンソル積に分かれる模型についての厳密な行列計算です。後半の連続場の主張は、そのまま有限次元の結果と同一視せず、成立条件を明記します。対数は自然対数、単位は $c=\hbar=k_B=1$、二次元Minkowski計量は $(-,+)$ とします。

## 1. 大きい領域から小さい領域へ：失われる区別

有限格子の領域 $B$ を二つの部分 $A,C$ に分け、$H_B=H_A\otimes H_C$ とします。状態 $\rho_B$、参照状態 $\sigma_B$ を同じ部分トレースで縮約し、

$$
\rho_A=\operatorname{Tr}_C\rho_B,\qquad
\sigma_A=\operatorname{Tr}_C\sigma_B
$$

と書きます。**同じ参照の同じ制限を使う**ことが重要で、$A$ と $B$ で無関係な参照状態を選んでは比較できません。

たとえば $\sigma_B=I_4/4$、$\rho_B=\operatorname{diag}(1/2,0,0,1/2)$ を $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ の基底で取ります。ここで $|ij\rangle=|i\rangle_A\otimes|j\rangle_C$ です。[QINF3の部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)により

$$
\operatorname{Tr}_C(|ij\rangle\langle k\ell|)
=\langle\ell|j\rangle\,|i\rangle\langle k|
=\delta_{j\ell}|i\rangle\langle k|.
$$

したがって $A$ の対角成分は、$C$ の添字 $j=0,1$ を足したものになります。$B$ の全状態は異なりますが、どちらも $A$ へ縮約すると $I_2/2$ です。$C$ の記録を捨てると、相関にあった差は見えなくなります。

QINF20では情報量に底2の対数を使用しました。本講の自然対数による $D$ は $D_{\mathrm{nat}}=(\ln2)D_{\mathrm{bit}}$ です。$\ln2>0$ なので不等号の向きは変わりません。

<a id="thm-qft62-region-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（有限格子の領域相対エントロピー単調性）**
> 有限次元Hilbert空間が $H_B=H_A\otimes H_C$ と分解され、$\rho_B,\sigma_B$ が $H_B$ 上の密度演算子であるとする。両状態を同じ $C$ について部分トレースした $\rho_A,\sigma_A$ に対し、自然対数で定義した量子相対エントロピーは

$$
D(\rho_A\Vert\sigma_A)\le D(\rho_B\Vert\sigma_B).
$$

> 右辺が有限なら左辺も有限である。右辺が無限大の場合は拡張実数の不等式とする。
<!-- formal-statement-end -->

### 証明の見取り図

小領域への制限は環境 $C$ を捨てる量子チャネルです。零固有値も含めて証明された[QINF20の部分トレース単調性](../../../応用系/QINF/QINF20/index.md#lem-qinf20-partial-trace)を、$X=A,Y=C$ として用い、対数の底だけを換算します。

<!-- proof-start -->
### 証明

$\Phi:L(H_A\otimes H_C)\to L(H_A)$ を $\Phi(X)=\operatorname{Tr}_C X$ とします。[QINF3の部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)の基底表示で $V_j=I_A\otimes\langle e_j|$ と置けば

$$
\Phi(X)=\sum_jV_jXV_j^\dagger,\qquad
\sum_jV_j^\dagger V_j=I_B.
$$

よって $\Phi$ は完全正・トレース保存であり、両状態に作用させると $\Phi(\rho_B)=\rho_A$、$\Phi(\sigma_B)=\sigma_A$ です。[QINF20のデータ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)をこの二状態とチャネル $\Phi$ に適用すれば、底2について

$$
D_{\mathrm{bit}}(\rho_A\Vert\sigma_A)
\le D_{\mathrm{bit}}(\rho_B\Vert\sigma_B).
$$

有限値の場合は両辺に $\ln2$ を掛けます。$D_{\mathrm{bit}}(\rho_B\Vert\sigma_B)<\infty$ なら[台の包含の保存](../../../応用系/QINF/QINF20/index.md#lem-qinf20-partial-trace)で左辺も有限です。右辺が $+\infty$ なら不等式は自明です。これで自然対数の主張が得られます。
<!-- proof-end -->

**直接計算**：上の二量子ビットでは $\rho_B$ の非零固有値が二つとも $1/2$、$\sigma_B$ の固有値は四つとも $1/4$ です。したがって

$$
\begin{aligned}
D(\rho_B\Vert\sigma_B)
&=2\cdot\frac12\ln\frac{1/2}{1/4}=\ln2,\\
D(\rho_A\Vert\sigma_A)
&=D(I_2/2\Vert I_2/2)=0.
\end{aligned}
$$

この例では $D_B>D_A$ と等号にならず、捨てた部分にあった区別が失われました。一方で $\rho_B=\rho_A\otimes\tau_C$、$\sigma_B=\sigma_A\otimes\tau_C$ と共通の補助状態 $\tau_C$ を付けた場合は等号です。なぜ等号になるかは後の演習で確かめます。

## 2. モジュラーエネルギーとエントロピーの差に直す

領域包含の不等式を、物理的に測りたいエネルギー密度へつなぐには何が必要でしょうか。まず状態の**差**を確実に分離します。以下では $\sigma_A,\sigma_B$ を忠実な参照密度演算子とします。$\rho_A,\rho_B$ は零固有値を持っても構いません。

[QFT61の規格化モジュラーハミルトニアン](../QFT61/index.md#def-qft61-modular-hamiltonian) $K_X=-\log\sigma_X$ を $X=A,B$ について定めます。同じ参照を制限したとはいえ、一般には $K_A$ は $K_B$ の単なる部分積分ではありません。特に $K_A=\operatorname{Tr}_C K_B$ とは定義しません。

比較状態と参照状態の期待値差を $\Delta\langle K_X\rangle=\operatorname{Tr}[(\rho_X-\sigma_X)K_X]$、エントロピー差を $\Delta S_X=S(\rho_X)-S(\sigma_X)$ と書きます。

<a id="prop-qft62-modular-difference"></a>

<!-- formal-statement-start -->
> **命題（包含領域のモジュラーエネルギー差の制約）**
> 有限次元 $H_B=H_A\otimes H_C$ 上の状態 $\rho_B$ と忠実な参照状態 $\sigma_B>0$ を取り、両者の部分トレースを添字 $A$ で表す。$K_B=-\log\sigma_B$、$K_A=-\log\sigma_A$ とすると、自然対数で

$$
\Delta\langle K_B\rangle-\Delta\langle K_A\rangle
\ge \Delta S_B-\Delta S_A.
$$

> この不等式は**モジュラーエネルギー差**について述べるもので、一般の局所エネルギー密度の点ごとの符号を述べない。
<!-- formal-statement-end -->

### 証明の見取り図

大領域と小領域それぞれで[相対エントロピーとモジュラーエネルギーの差](../QFT61/index.md#prop-qft61-relative-balance)を使います。二つの式を引いた差が、[前節の単調性](#thm-qft62-region-monotonicity)により非負です。

<!-- proof-start -->
### 証明

$\sigma_B>0$ なら、任意の非零 $a\in H_A$ について、$C$ の正規直交基底を $e_j$ と置いたとき

$$
\langle a,\sigma_Aa\rangle
=\sum_j\langle a\otimes e_j,\sigma_B(a\otimes e_j)\rangle>0
$$

です。したがって $\sigma_A>0$ で両領域の行列対数が定義できます。[QFT61の恒等式](../QFT61/index.md#prop-qft61-relative-balance)をそれぞれの $X=A,B$ に適用すると

$$
D(\rho_X\Vert\sigma_X)
=\Delta\langle K_X\rangle-\Delta S_X.
$$

よって差を取って

$$
\begin{aligned}
0&\le D(\rho_B\Vert\sigma_B)-D(\rho_A\Vert\sigma_A)\\
&=(\Delta\langle K_B\rangle-\Delta\langle K_A\rangle)
-(\Delta S_B-\Delta S_A).
\end{aligned}
$$

これを移項して主張を得ます。
<!-- proof-end -->

**忠実でない参照について**：$\sigma_X$ に零固有値がある場合でも、$\operatorname{supp}\rho_X\subseteq\operatorname{supp}\sigma_X$ なら、対数を参照の支持空間上で定義し、その支持にある状態の期待値として同じ計算を行えます。ただし全空間上の有界な $K_X$ が存在するとは言えません。以下で複数の領域を比べる際は、各相対エントロピーが有限であることも仮定に入れます。

### 小さい具体模型：捨てた側だけを変える

$\sigma_A=I_2/2$、$\sigma_C=\operatorname{diag}(3/4,1/4)$ とし、$\sigma_B=\sigma_A\otimes\sigma_C$ に対して $\rho_B=\sigma_A\otimes I_2/2$ とします。$A$ だけを見ると比較状態と参照は同じなので $D_A=0$ ですが、$C$ を含む領域では違いが残ります。

$$
\begin{aligned}
\Delta\langle K_B\rangle-\Delta\langle K_A\rangle
&=\frac14\ln3,\\
\Delta S_B-\Delta S_A&=\frac34\ln3-\ln2,\\
D_B-D_A&=\ln2-\frac12\ln3=\frac12\ln\frac43>0.
\end{aligned}
$$

最初の式では $K_B=K_A\otimes I+I\otimes K_C$ とテンソル積を対数へ適用しました。二番目は $S(I_2/2)=\ln2$ と $S(\operatorname{diag}(3/4,1/4))=\ln4-\frac34\ln3$ から得ます。三式の差が命題と一致します。この等号の**分解**は参照が積状態だから可能なのであり、一般の相関した真空にそのまま使えません。

## 3. 純粋状態なら補領域からもう一つの不等式が出る

領域 $A\subseteq B$ の包含を考えると、補領域の向きは逆転して $B^c\subseteq A^c$ となります。ここで $X^c$ は全系のうち $X$ 以外を意味します。

全系で比較状態 $\rho$ と参照 $\sigma$ がともに**純粋状態**なら、[QINF6のSchmidt縮約スペクトル定理](../../../応用系/QINF/QINF6/index.md#thm-qinf6-reduced-spectrum)により $X$ と $X^c$ の非零固有値は一致します。零固有値はエントロピーに寄与しないため、

$$
S(\rho_X)=S(\rho_{X^c}),\qquad
S(\sigma_X)=S(\sigma_{X^c}).
$$

参照の支持空間上での対数の期待値が有限と仮定すると、補領域のモジュラーハミルトニアンも使えます。相対エントロピーが有限なら $\operatorname{supp}\rho_X\subseteq\operatorname{supp}\sigma_X$ であるため、零固有値を持つ参照にも、支持上の対数を用いて

$$
\begin{aligned}
D(\rho_X\Vert\sigma_X)
&=-S(\rho_X)+\operatorname{Tr}(\rho_XK_X),\\
S(\sigma_X)&=\operatorname{Tr}(\sigma_XK_X),\\
D(\rho_X\Vert\sigma_X)
&=\Delta\langle K_X\rangle-\Delta S_X
\end{aligned}
$$

と直接計算できます。これは[QFT61の忠実な参照に対する恒等式](../QFT61/index.md#prop-qft61-relative-balance)の支持上への拡張です。符号を間違えないため、差として用いる量を次のように明示します。

<a id="def-qft62-full-modular"></a>

<!-- formal-statement-start -->
> **定義（純粋参照状態の全モジュラーハミルトニアン）**
> 有限次元の全系 $H$ に純粋な参照状態 $\sigma$ があり、その領域 $X$ と補領域 $X^c$ への縮約を $\sigma_X,\sigma_{X^c}$ とする。両者の支持空間上で $K_X=-\log\sigma_X$、$K_{X^c}=-\log\sigma_{X^c}$ を定める。各期待値が有限な状態に対して

$$
\widehat K_X:=K_X\otimes I_{X^c}-I_X\otimes K_{X^c}
$$

> の期待値差を全モジュラーハミルトニアンの期待値差と呼ぶ。零固有値を含む場合は式を支持空間上の期待値として解釈し、全Hilbert空間での有界演算子性は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft62-full-modular -->
**定義の確認**：二量子ビットの純粋な参照

$$
|\Omega\rangle=\sqrt{3/4}|00\rangle+\sqrt{1/4}|11\rangle
$$

を取ります。係数の二乗和は $3/4+1/4=1$ なので規格化されています。$X$ と $X^c$ の計算基底をそれぞれ $|0\rangle,|1\rangle$ とし、[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を $|\Omega\rangle\langle\Omega|$ に適用すると、交差項は $\langle0|1\rangle=0$ により消え、

$$
\sigma_X=\sigma_{X^c}
=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|
=\operatorname{diag}\left(\frac34,\frac14\right).
$$

ここで行列は指定した正規直交基底での表示です。固有値 $3/4,1/4$ は正で和が1なので、両縮約は忠実な密度演算子です。[QFT61の規格化モジュラーハミルトニアンの定義](../QFT61/index.md#def-qft61-modular-hamiltonian)から

$$
K_X=K_{X^c}=\operatorname{diag}\left(\ln\frac43,\ln4\right)
$$

と有限行列で計算できます。テンソル積の差を各基底ベクトルへ作用させれば

$$
\widehat K_X|00\rangle=0,\qquad
\widehat K_X|11\rangle=0,\qquad
\widehat K_X|01\rangle=-\ln3\,|01\rangle.
$$

従って参照 $|\Omega\rangle$ での期待値は0で、$|01\rangle$ では負です。これは差の定義であり、任意の状態で正の演算子だという主張ではありません。
<!-- definition-example-end -->

<a id="thm-qft62-full-modular-order"></a>

<!-- formal-statement-start -->
> **定理（純粋状態の包含領域に対する全モジュラー差の非負性）**
> 有限個の格子自由度からなる全系上で、純粋状態 $\rho,\sigma$ を取り、$A\subseteq B$ とする。$A,B,A^c,B^c$ に制限したすべての $D(\rho_X\Vert\sigma_X)$ が有限で、参照の対数の支持上の期待値差が定義できると仮定する。このとき

$$
\Delta\langle\widehat K_B-\widehat K_A\rangle\ge0.
$$

> ここで $\Delta$ は比較状態 $\rho$ での期待値から参照状態 $\sigma$ での期待値を引くことを表す。
<!-- formal-statement-end -->

### 証明の見取り図

$B\to A$ と $A^c\to B^c$ の両方に単調性を使います。純粋性によって向かい合う領域のエントロピー差が等しく、**二つの単調性を足したときに打ち消される**のが核心です。

<!-- proof-start -->
### 証明

$D_X=D(\rho_X\Vert\sigma_X)$ と書きます。[有限格子の単調性](#thm-qft62-region-monotonicity)を $A\subseteq B$ に適用すれば $D_B-D_A\ge0$ です。補領域は $B^c\subseteq A^c$ なので、もう一度適用して $D_{A^c}-D_{B^c}\ge0$ を得ます。全相対エントロピーは有限と仮定したため、差の計算が可能です。

上で導出した支持上の $D_X=\Delta\langle K_X\rangle-\Delta S_X$ を四領域に適用して加えます。以下の $K_X$ は各領域から全系へ恒等演算子とのテンソル積で拡張しているものとすると、

$$
\begin{aligned}
0&\le (D_B-D_A)+(D_{A^c}-D_{B^c})\\
&=\Delta\langle K_B-K_A+K_{A^c}-K_{B^c}\rangle\\
&\quad-(\Delta S_B-\Delta S_A+\Delta S_{A^c}-\Delta S_{B^c}).
\end{aligned}
$$

全状態 $\rho,\sigma$ がそれぞれ純粋なので、Schmidt分解から $\Delta S_X=\Delta S_{X^c}$ です。従って第二行のエントロピーの括弧は0であり、残る演算子の組合せは $\widehat K_B-\widehat K_A$ そのものです。結論を得ます。
<!-- proof-end -->

この非負性は**全モジュラーハミルトニアンそのものが正である**という意味ではありません。領域包含と参照状態を固定して作った**差の期待値**に関する主張です。また混合した全状態では $S_X=S_{X^c}$ が成立せず、エントロピー項を消せません。

## 4. 平均ヌルエネルギーに到達するための追加条件

二次元Minkowski時空の光円錐座標 $x^+=t+x$、$x^-=t-x$ を導入します。逆変換は $t=(x^++x^-)/2$、$x=(x^+-x^-)/2$ であり、$ds^2=-dx^+dx^-$ です。連鎖律から、もう一方のヌル座標を固定して微分する演算子は

$$
\partial_+:=\left.\frac{\partial}{\partial x^+}\right|_{x^-}
=\frac12(\partial_t+\partial_x),\qquad
\partial_-:=\left.\frac{\partial}{\partial x^-}\right|_{x^+}
=\frac12(\partial_t-\partial_x).
$$

[QFT2の正準エネルギー運動量テンソル](../QFT2/index.md#def-qft2-stress)と同様、二つの時空方向を入力するテンソルを $T_{\mu\nu}$ と書き、その二つの $\partial_+$ 方向の成分を $T_{++}=T_{\mu\nu}(\partial_+)^\mu(\partial_+)^\nu$ とします。以下の量子場では、必要な改良と繰り込みを施した応力テンソルを用いるので、正準テンソルと無条件に同じものとはしません。

局所エネルギーには負の値が現れ得ます。例えば[QFT55の円筒真空応力テンソル](../QFT55/index.md#prop-qft55-cylinder-stress)を用いる二次元CFTの円周真空では、平面真空との差で負の一様エネルギー密度が得られます。これは後で扱う平坦な直線時空の完全ヌル線とは別の設定です。単調性だけから $T_{00}(x)\ge0$ や $T_{++}(x)\ge0$ を点ごとに導いてはいけません。

<a id="def-qft62-anec"></a>

<!-- formal-statement-start -->
> **定義（完全ヌル線上の平均ヌルエネルギー）**
> 二次元Minkowski時空の直線 $x^-=0$ 上で、繰り込まれた応力テンソル $T_{++}(x^+,0)$ の期待値が状態 $\rho$ において $x^+$ に関して可積分であるとする。その完全ヌル線に沿う形式的なエネルギー演算子と期待値を

$$
\mathcal E_+:=\int_{-\infty}^{\infty}T_{++}(s,0)\,ds,
\qquad
\langle\mathcal E_+\rangle_\rho
:=\int_{-\infty}^{\infty}\langle T_{++}(s,0)\rangle_\rho\,ds
$$

> と書く。**平均ヌルエネルギー条件**（ANEC）は、この期待値が非負であるという条件である。演算子の意味と積分の存在には状態・正則化・領域についての条件が必要である。真空を差し引く規約なら、真空期待値を引いた積分について述べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft62-anec -->
**定義の確認**（真空の等号例）：まず真空差し引きの規約を取り、同じMinkowski真空を比較状態 $\rho=\sigma$ とします。このときヌル線上のすべての $s\in\mathbb R$ で

$$
\langle T_{++}(s,0)\rangle_\rho
-\langle T_{++}(s,0)\rangle_\sigma=0,
\qquad
\Delta\langle\mathcal E_+\rangle=\int_{\mathbb R}0\,ds=0.
$$

従って積分は有限に存在し、ANECの非負条件を等号で満たします。この例は真空の差に限り、励起状態での非負性の証明ではありません。

**積分条件と点ごとの符号を比較する関数模型**：関数 $f(s)=e^{-s^2}(s^2-1/4)$ を試験的なエネルギー密度の形とします。$|f(s)|\le e^{-s^2}(s^2+1/4)$ で右辺は実数全体で可積分なので、完全線積分が定義できます。$f(0)=-1/4<0$ ですが

$$
\int_{-\infty}^{\infty}f(s)\,ds
=\frac{\sqrt\pi}{2}-\frac{\sqrt\pi}{4}
=\frac{\sqrt\pi}{4}>0.
$$

$I(\alpha)=\int_{\mathbb R}e^{-\alpha s^2}ds=\sqrt{\pi/\alpha}$（$\alpha>0$）を、Gaussianの減衰で微分と積分を交換して微分すると、

$$
-I'(\alpha)=\int_{\mathbb R}s^2e^{-\alpha s^2}ds
=\frac{\sqrt\pi}{2\alpha^{3/2}},\qquad
-I'(1)=\frac{\sqrt\pi}{2}.
$$

これは**点ごとの符号と積分の符号が異なる**ことを示す関数模型です。積分可能性と符号は実際に確認しましたが、量子状態 $\rho$ と繰り込まれた $T_{++}$ がこの $f$ を実現することまでは示しておらず、任意のCFT状態で実現可能という主張でもありません。
<!-- definition-example-end -->

どこで幾何が入るかを明示するため、右向きの楔領域のヌル平行移動族を

$$
W(u):=\{(t,x):x^+>u,\ x^-<0\}
$$

とします。$u<v$ なら $W(v)\subset W(u)$ です。真空の**全モジュラーハミルトニアン**が、これらの楔で幾何学的なboost流を実現し、その差が完全ヌル線に沿うエネルギーの定数倍になる、というのが有限次元の定理にはない入力です。この幾何学的同定は一般論としてこの章では証明せず、成立条件を定理の仮定へ入れます。

<a id="prop-qft62-conditional-anec"></a>

<!-- formal-statement-start -->
> **命題（楔領域の幾何学的モジュラー流を仮定した平均ヌルエネルギー）**
> 二次元Minkowski時空上のユニタリな局所量子場理論でPoincaré不変な真空 $\sigma$ と純粋な有限エネルギー状態 $\rho$ を考える。$u<v$ に対して次を仮定する。
>
> **（1）** $W(v)\subset W(u)$ と補領域の相対エントロピーが定義され、領域単調性が成立し、各相対エントロピー差とエントロピー差の極限操作が正当化できる。
>
> **（2）** 純粋性から生じる補領域エントロピー差の相殺が、選んだ正則化・極限の下で保たれる。
>
> **（3）** 真空の全モジュラーハミルトニアンが楔の幾何学的boost生成子に一致し、同じ規約のヌル線積分について

$$
\widehat K_{W(u)}-\widehat K_{W(v)}
=2\pi(v-u)\mathcal E_+
$$

> が状態に依存しない定数を除いて成り立つ。$\mathcal E_+$ は真空を差し引いた $T_{++}$ の完全ヌル線積分で、その期待値は有限とする。
>
> このとき、真空との差としての平均ヌルエネルギーは

$$
\Delta\langle\mathcal E_+\rangle\ge0.
$$

> とくに真空の積分値を0とする規約では、$\langle\mathcal E_+\rangle_\rho\ge0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

有限格子で証明した[全モジュラー差の非負性](#thm-qft62-full-modular-order)の**代数的部分**を、仮定（1）（2）の下で楔へ移します。次に仮定（3）の幾何学的同定を代入し、$v-u>0$ で割ります。

<!-- proof-start -->
### 証明

包含 $W(v)\subset W(u)$ と補領域の逆包含に対する相対エントロピーの単調性を加えます。仮定（1）（2）は[有限格子での証明](#thm-qft62-full-modular-order)に現れた四つの相対エントロピーの差と二組のエントロピー差の相殺を、連続極限でも正当化するものです。したがって

$$
0\le\Delta\langle\widehat K_{W(u)}-\widehat K_{W(v)}\rangle.
$$

ここで仮定（3）を代入すると

$$
0\le 2\pi(v-u)\Delta\langle\mathcal E_+\rangle.
$$

$2\pi(v-u)>0$ ですから、両辺をこれで割って結論が得られます。幾何学的同定と極限の存在はこの代数計算からは導かれず、仮定として残っています。
<!-- proof-end -->

**幾何の符号の確認**：楔のboostベクトル場は光円錐座標で $\xi_u=2\pi[(x^+-u)\partial_+-x^-\partial_-]$ と書けます。$u<v$ に対して

$$
\xi_u-\xi_v=2\pi(v-u)\partial_+.
$$

従って対応する保存荷の差が正の係数のヌル方向並進荷となる、というのが仮定（3）の符号の由来です。ただし**ベクトル場の差を計算しただけでは**、量子論のモジュラー生成子がその保存荷に等しいこと、境界項が消えること、無限ヌル線積分が存在することは証明できません。これらは真空の幾何学的モジュラー流と応力テンソルの正則性に関する別個の主張です。

一般の相対論的場の理論に対する楔のモジュラー流の同定には、通常Bisognano–Wichmann型の仮定・定理や局所代数の扱いが必要です。有限格子の部分トレースの定理だけで連続場の同定を得たのではありません。またこの結論は**完全なヌル線の積分**であって、任意点の $T_{++}\ge0$ や区間の $\int_a^b T_{++}\ge0$、量子ヌルエネルギー条件（QNEC）を直ちに含みません。

## 5. 演習：包含、補領域、ヌル方向の符号

<a id="ex-qft62-a01"></a>

### QFT62-A01 対数の底を換算する

- Level: A
- 対応目標: 相対エントロピーの単位と不等号

有限次元の二状態の相対エントロピーが底2で $D_{\mathrm{bit}}(\rho\Vert\sigma)=3/2$ と求まった。自然対数の値を求め、部分トレースの不等号が変わらないことを説明せよ。

<!-- solution-start -->
### 詳細解答

$\log_2x=(\ln x)/(\ln2)$ なので、相対エントロピーのトレース式の各対数へ適用して

$$
D_{\mathrm{nat}}(\rho\Vert\sigma)
=(\ln2)D_{\mathrm{bit}}(\rho\Vert\sigma)
=\frac32\ln2.
$$

$\ln2>0$ だから、$D_{A,\mathrm{bit}}\le D_{B,\mathrm{bit}}$ の両辺を掛けても $D_{A,\mathrm{nat}}\le D_{B,\mathrm{nat}}$ です。$\operatorname{supp}\rho\not\subseteq\operatorname{supp}\sigma$ による $+\infty$ も底の変更では有限値になりません。二つの台が一致しなくても、前者が後者に含まれれば相対エントロピーは有限です。
<!-- solution-end -->

<a id="ex-qft62-a02"></a>

### QFT62-A02 相関だけで区別される二状態

- Level: A
- 対応目標: 領域単調性の厳密な例

二量子ビットの計算基底 $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ で $\sigma_{AC}=I_4/4$、$\rho_{AC}=\operatorname{diag}(1/2,0,0,1/2)$ とする。$C$ を部分トレースして両状態の $A$ 上の縮約を求め、$D_{AC}$ と $D_A$ を自然対数で比較せよ。

<!-- solution-start -->
### 詳細解答

[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)では $C$ の添字ごとの対角成分を足すため、

$$
\begin{aligned}
(\rho_A)_{00}&=\rho_{00,00}+\rho_{01,01}=\frac12+0=\frac12,\\
(\rho_A)_{11}&=\rho_{10,10}+\rho_{11,11}=0+\frac12=\frac12,\\
(\sigma_A)_{00}&=(\sigma_A)_{11}=\frac14+\frac14=\frac12.
\end{aligned}
$$

非対角成分は0なので $\rho_A=\sigma_A=I_2/2$ となります。全系では $\sigma_{AC}>0$ であり、零固有値を持つ $\rho_{AC}$ の $0\ln0$ を0とすると

$$
\begin{aligned}
D_{AC}&=\frac12\ln\frac{1/2}{1/4}
+\frac12\ln\frac{1/2}{1/4}=\ln2,\\
D_A&=\operatorname{Tr}(I_2/2)(\ln(I_2/2)-\ln(I_2/2))=0.
\end{aligned}
$$

差 $\ln2>0$ は、捨てた $C$ との相関だけにあった区別です。
<!-- solution-end -->

<a id="ex-qft62-a03"></a>

### QFT62-A03 補領域の包含を逆にする

- Level: A
- 対応目標: 二つの単調性の向き

三つの格子自由度が $1,2,3$ と並ぶ全系で、$A=\{1\}$、$B=\{1,2\}$ とする。$A^c,B^c$ を列挙し、四領域の相対エントロピーが有限なとき、領域と補領域それぞれの単調性を記せ。

<!-- solution-start -->
### 詳細解答

$A\subset B$ ですが $A^c=\{2,3\}$、$B^c=\{3\}$ なので $B^c\subset A^c$ です。[領域相対エントロピー単調性](#thm-qft62-region-monotonicity)をそれぞれの包含へ適用し

$$
D_A\le D_B,\qquad D_{B^c}\le D_{A^c}
$$

を得ます。後者を $D_{A^c}\le D_{B^c}$ と書くのは包含の逆転を見落とした誤りです。
<!-- solution-end -->

<a id="ex-qft62-a04"></a>

### QFT62-A04 ヌル座標の計量と楔の包含

- Level: A
- 対応目標: Lorentz符号とヌル平行移動

二次元Minkowski空間の $ds^2=-dt^2+dx^2$ に $x^+=t+x,x^-=t-x$ を導入する。線素を書き直し、$u=0,v=2$ について $W(v)\subset W(u)$ を確認せよ。

<!-- solution-start -->
### 詳細解答

$dt=(dx^++dx^-)/2$、$dx=(dx^+-dx^-)/2$ です。代入して

$$
\begin{aligned}
-dt^2+dx^2
&=-\frac{(dx^++dx^-)^2}{4}
+\frac{(dx^+-dx^-)^2}{4}\\
&=-dx^+dx^-.
\end{aligned}
$$

$W(2)$ の点は $x^+>2,x^-<0$ を満たすので必ず $x^+>0,x^-<0$ も満たし、$W(2)\subset W(0)$ です。逆は $x^+=1,x^-=-1$ が反例です。
<!-- solution-end -->

<a id="ex-qft62-a05"></a>

### QFT62-A05 点ごとの負と積分の正

- Level: A
- 対応目標: 平均と局所エネルギー条件の区別

可積分関数 $f(s)=e^{-s^2}(s^2-a)$（$a\in\mathbb R$）について、$f(0)<0$ かつ $\int_{\mathbb R}f(s)\,ds>0$ の両方を満たす $a$ の範囲を求めよ。Gaussian積分 $\int_{\mathbb R}e^{-s^2}ds=\sqrt\pi$ を使ってよい。

<!-- solution-start -->
### 詳細解答

$f(0)=-a$ なので局所で負となる条件は $a>0$ です。Gaussian積分を $\alpha$ で微分した $\int s^2e^{-\alpha s^2}ds=\sqrt\pi/(2\alpha^{3/2})$ に $\alpha=1$ を代入すると

$$
\int_{\mathbb R}f(s)\,ds
=\frac{\sqrt\pi}{2}-a\sqrt\pi
=\sqrt\pi\left(\frac12-a\right).
$$

正となる条件は $a<1/2$ です。従って $0<a<1/2$。この関数計算はCFTの状態が実在する証明ではありません。
<!-- solution-end -->

<a id="ex-qft62-b01"></a>

### QFT62-B01 参照が積状態の場合の単調性の等号

- Level: B
- 対応目標: 情報が失われない例の再構成

有限次元系 $A,C$ 上の密度演算子 $\rho_A,\sigma_A,\tau_C$ を取り、$\operatorname{supp}\rho_A\subseteq\operatorname{supp}\sigma_A$ とする。$\rho_B=\rho_A\otimes\tau_C$、$\sigma_B=\sigma_A\otimes\tau_C$ と定める。零固有値を許して $D_B=D_A$ を示せ。

<!-- solution-start -->
### 詳細解答

$\rho_A,\sigma_A$ と $\tau_C$ の固有値をそれぞれ $r_i,s_j,t_k$ とし、対応する固有ベクトルを $|i_\rho\rangle,|j_\sigma\rangle,|k_\tau\rangle$ とします。

台の包含条件から、$r_i>0$ なら $|i_\rho\rangle$ は $\sigma_A$ の支持空間に属し、$s_j=0$ の固有ベクトルとの重なりは0です。**$r_i>0$ から全 $s_j>0$ が従うわけではありません。** 対数の項は $r_i,s_j,t_k$ が正の範囲に限って評価し、零固有値の項は $0\ln0=0$ の極限として扱います。

テンソル積の正固有値は $r_it_k,s_jt_k$ です。$\rho_A,\sigma_A$ の固有基底が異なっても、非可換な項のトレースには重なり係数が入るため、支持空間上で

$$
\begin{aligned}
D_B&=\sum_{\substack{i:r_i>0\\j:s_j>0\\k:t_k>0}}\bigl|\langle i_\rho|j_\sigma\rangle\bigr|^2r_it_k
\left(\ln r_i+\ln t_k-\ln s_j-\ln t_k\right)\\
&=\sum_{\substack{i:r_i>0\\j:s_j>0}}\bigl|\langle i_\rho|j_\sigma\rangle\bigr|^2r_i
(\ln r_i-\ln s_j)\sum_{k:t_k>0} t_k\\
&=D_A.
\end{aligned}
$$

$\rho_A$ と $\sigma_A$ は非可換でもよいので、重なり係数を残しました。$t_k=0$ の項は両方の状態に寄与しません。したがって共通の $C$ の情報を捨てても区別は減りません。
<!-- solution-end -->

<a id="ex-qft62-b02"></a>

### QFT62-B02 モジュラーエネルギーとエントロピーを別々に計算する

- Level: B
- 対応目標: 領域差の等式と数値的な厳密性

$\sigma_A=I_2/2$、$\sigma_C=\operatorname{diag}(3/4,1/4)$、$\sigma_B=\sigma_A\otimes\sigma_C$、$\rho_B=\sigma_A\otimes I_2/2$ とする。$\Delta\langle K_B\rangle-\Delta\langle K_A\rangle$、$\Delta S_B-\Delta S_A$ を求め、相対エントロピーの差と一致することを示せ。

<!-- solution-start -->
### 詳細解答

$\rho_A=\sigma_A$ より $\Delta\langle K_A\rangle=\Delta S_A=0$ です。[規格化モジュラーハミルトニアン](../QFT61/index.md#def-qft61-modular-hamiltonian)を使い、積状態の対数を対角基底で取ると $K_B=K_A\otimes I+I\otimes K_C$ です。$K_C=\operatorname{diag}(\ln(4/3),\ln4)$ に対し

$$
\Delta\langle K_B\rangle
=\left(\frac12-\frac34\right)\ln\frac43
+\left(\frac12-\frac14\right)\ln4
=\frac14\ln3.
$$

エントロピーの積状態加法性より

$$
\begin{aligned}
\Delta S_B&=S(I_2/2)-S(\operatorname{diag}(3/4,1/4))\\
&=\ln2+\frac34\ln\frac34+\frac14\ln\frac14\\
&=\frac34\ln3-\ln2.
\end{aligned}
$$

差を引くと $\frac14\ln3-(\frac34\ln3-\ln2)=\ln2-\frac12\ln3=\frac12\ln(4/3)$。直接 $D_B=D(I_2/2\Vert\operatorname{diag}(3/4,1/4))=\frac12\ln(2/3)+\frac12\ln2$ と計算した値と一致します。
<!-- solution-end -->

<a id="ex-qft62-b03"></a>

### QFT62-B03 補領域のエントロピーが消える理由

- Level: B
- 対応目標: 全モジュラー差の非負性の再証明

有限系全体の $\rho,\sigma$ を純粋状態とし、$A\subseteq B$ とその補領域に対する四つの相対エントロピーが有限とする。$D_B-D_A+D_{A^c}-D_{B^c}$ をモジュラー期待値差とエントロピー差で表し、非負性を示せ。また全系が混合状態ならどの等式を使えないか述べよ。

<!-- solution-start -->
### 詳細解答

[領域単調性](#thm-qft62-region-monotonicity)を $A\subseteq B$ と $B^c\subseteq A^c$ に使って

$$
D_B-D_A\ge0,\qquad D_{A^c}-D_{B^c}\ge0.
$$

[相対エントロピーとモジュラーエネルギーの差](../QFT61/index.md#prop-qft61-relative-balance)を各領域に適用すると、和は

$$
\begin{aligned}
&\Delta\langle K_B-K_A+K_{A^c}-K_{B^c}\rangle\\
&\qquad-\Delta S_B+\Delta S_A-\Delta S_{A^c}+\Delta S_{B^c}.
\end{aligned}
$$

[Schmidt縮約スペクトル定理](../../../応用系/QINF/QINF6/index.md#thm-qinf6-reduced-spectrum)により純粋状態の $S_B=S_{B^c}$、$S_A=S_{A^c}$ が比較状態・参照状態それぞれで成り立つので、第二行が0になります。残る項は[全モジュラーハミルトニアンの定義](#def-qft62-full-modular)より $\Delta\langle\widehat K_B-\widehat K_A\rangle\ge0$。混合状態では一般に $S_X=S_{X^c}$ は成立せず、この消去はできません。
<!-- solution-end -->

<a id="ex-qft62-b04"></a>

### QFT62-B04 楔の並進差と未証明の入力

- Level: B
- 対応目標: 幾何学的条件と代数的条件の分離

光円錐座標 $x^\pm=t\pm x$ と楔 $W(u)=\{x^+>u,x^-<0\}$ を取る。boost流のベクトル場が $\xi_u=2\pi[(x^+-u)\partial_+-x^-\partial_-]$ であると仮定し、$u<v$ の差を計算せよ。この計算だけでは ANEC を証明できない理由を二つ挙げよ。

<!-- solution-start -->
### 詳細解答

$\partial_\pm$ はそれぞれ $x^\pm$ 方向の偏微分です。二つのベクトル場で $-x^-\partial_-$ は相殺されるので

$$
\begin{aligned}
\xi_u-\xi_v
&=2\pi\{(x^+-u)-(x^+-v)\}\partial_+\\
&=2\pi(v-u)\partial_+.
\end{aligned}
$$

$v-u>0$ ですが、これは幾何ベクトルの等式に過ぎません。まず、量子真空の全モジュラー生成子がこのboost生成子に一致することは別の場の理論的入力です。次に、補領域を含む相対エントロピーとエントロピー差の連続極限・完全ヌル線積分の有限性も未証明です。[条件付きANEC命題](#prop-qft62-conditional-anec)はこれらを明示した場合にのみ適用できます。
<!-- solution-end -->

<a id="ex-qft62-c01"></a>

### QFT62-C01 二つの単調性から完全ヌル線の条件へ

- Level: C
- 対応目標: 領域・補領域・モジュラー差・幾何学的条件の統合

有限格子の純粋状態 $\rho,\sigma$ と $A\subseteq B$ を考え、四つの領域・補領域で相対エントロピーが有限であるとする。続いて二次元Minkowski時空の楔 $W(u)$、$W(v)$（$u<v$）へ移るときは、連続理論側で純粋性に基づくエントロピー差の相殺、相対エントロピー単調性、幾何学的同定 $\widehat K_{W(u)}-\widehat K_{W(v)}=2\pi(v-u)\mathcal E_+$ と積分の有限性を仮定してよい。

1. 有限格子で、領域と補領域の相対エントロピーの不等式を二つ導け。
2. $D_X=\Delta\langle K_X\rangle-\Delta S_X$ から、全モジュラー差の不等式へ至る消去をすべて示せ。
3. 楔の包含を確認し、追加仮定を代入して $\Delta\langle\mathcal E_+\rangle\ge0$ を導け。
4. これが点ごとのヌルエネルギー条件、一般のQNEC、無条件の連続QFT定理を証明したことにならない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 二つの包含。** $A\subseteq B$ に[有限格子の領域単調性](#thm-qft62-region-monotonicity)を適用して $D_A\le D_B$。補領域は $B^c\subseteq A^c$ なので同じ定理をもう一度使い、$D_{B^c}\le D_{A^c}$ となります。四つの値が有限なので差が定義できます。

**(2) エントロピーの相殺。** [QFT61の差の恒等式](../QFT61/index.md#prop-qft61-relative-balance)を各 $X$ に適用して

$$
\begin{aligned}
0&\le(D_B-D_A)+(D_{A^c}-D_{B^c})\\
&=(\Delta\langle K_B\rangle-\Delta S_B)
-(\Delta\langle K_A\rangle-\Delta S_A)\\
&\quad+(\Delta\langle K_{A^c}\rangle-\Delta S_{A^c})
-(\Delta\langle K_{B^c}\rangle-\Delta S_{B^c})\\
&=\Delta\langle K_B-K_A+K_{A^c}-K_{B^c}\rangle
-\Delta S_B+\Delta S_A-\Delta S_{A^c}+\Delta S_{B^c}.
\end{aligned}
$$

純粋性と[Schmidt縮約スペクトル定理](../../../応用系/QINF/QINF6/index.md#thm-qinf6-reduced-spectrum)により $\Delta S_B=\Delta S_{B^c}$ と $\Delta S_A=\Delta S_{A^c}$。従って最後の四つのエントロピー項が消え、[全モジュラー差の定理](#thm-qft62-full-modular-order)の $\Delta\langle\widehat K_B-\widehat K_A\rangle\ge0$ を再現します。

**(3) 楔の同定。** $u<v$ なら条件 $x^+>v$ は $x^+>u$ を含意するので $W(v)\subset W(u)$ です。仮定された連続理論で同じ相殺を使って

$$
0\le\Delta\langle\widehat K_{W(u)}-\widehat K_{W(v)}\rangle
=2\pi(v-u)\Delta\langle\mathcal E_+\rangle.
$$

正数 $2\pi(v-u)$ で割れば $\Delta\langle\mathcal E_+\rangle\ge0$ です。真空の繰り込まれた積分値が0なら $\langle\mathcal E_+\rangle_\rho\ge0$ になります。

**(4) 証明した範囲。** 完全線上の積分が非負でも被積分関数は符号を変え得るので点ごとの非負性は出ません。QNECはエントロピーの形状二階微分等を含む別の不等式で、ここで示したのはその証明ではありません。さらに、有限格子の部分トレースと連続場の局所代数は一般に同一ではなく、楔の真空モジュラー流の幾何学的同定・相対エントロピーの有限性・極限と境界項は**追加仮定**です。従って任意のQFTへ仮定なしに一般化はできません。
<!-- solution-end -->

## 6. 何が保証され、何がまだ入力なのか

有限格子では、[QINF20のデータ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)が領域相対エントロピーの単調性を与えます。忠実な参照の下でその差はモジュラーエネルギー差とエントロピー差に分けられ、全状態が純粋なら補領域の単調性と組み合わせてエントロピー項が消えます。

連続場で平均ヌルエネルギーまで進むには、楔の幾何学的モジュラー流、正則化後の相対エントロピー単調性と差の有限性、応力テンソルのヌル積分の同定が必要です。これらの前提を明示したときに得られるのは**全線にわたる積分の非負性**であり、局所的なエネルギー密度の非負性とは異なります。

次は高次元CFTや大 $N$ の近似、境界理論と共形データの関係を検討し、共形場と量子情報の計算を広げます。
