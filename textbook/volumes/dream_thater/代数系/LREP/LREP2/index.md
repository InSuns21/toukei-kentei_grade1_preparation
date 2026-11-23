# LREP2 既約分解とSchurの補題

<!-- definition-example-audit: strict -->

[LREP1の既約表現](../LREP1/index.md#def-lrep1-irreducible)は、非零の真の不変部分空間を持たない表現でした。しかし同講の[上三角行列の例](../LREP1/index.md#prop-lrep1-nonsplit)では、不変直線があるのに、それと合わせて全空間を作る**不変な**補直線が存在しませんでした。したがって「可約」と「既約表現の直和に分けられる」は別の性質です。

本講では、まず[絡作用素](../LREP1/index.md#def-lrep1-intertwiner)が既約表現の間でどれほど制限されるかを証明します。次に群がコンパクトで表現が連続なら、群の作用を平均して不変な内積を作り、その内積の直交補空間を使って分解できることを示します。有限群では平均を実際の有限和として計算し、$SU(2)$ では球面上の測度から平均の具体模型を見ます。

## 1. 既約表現の間の写像は零か同型になる

前講の[絡作用素の核と像の不変性](../LREP1/index.md#prop-lrep1-intertwiner-kernel-image)は、既約性と組み合わせると強力です。核は「情報が消える場所」、像は「写し取れる場所」であり、既約空間にはそのどちらも中途半端に残せません。

<a id="thm-lrep2-schur"></a>
<!-- formal-statement-start -->
> **定理（Schur の補題）**  
> $G$ を任意の群、$(V,D)$、$(W,E)$ をそれぞれ非零・有限次元の**複素**既約表現とする。
>
> (i) 絡作用素 $T:V\to W$ は零写像であるか、線形同型である。
>
> (ii) $V=W$ かつ $D=E$ なら、すべての自己絡作用素はある $\lambda\in\mathbb C$ に対して $T=\lambda I_V$ となる。
<!-- formal-statement-end -->

(i) は体を複素数に限定せず証明できます。(ii) で複素数体と有限次元性が効きます。自己絡作用素に固有値を一つ見つけることが核心です。

**証明の見取り図。** (i) は核と像に既約性を適用します。(ii) は $T-\lambda I_V$ が再び絡作用素になることを示して、その核を使います。

<!-- proof-start -->
### 証明

(i) [核と像の不変性](../LREP1/index.md#prop-lrep1-intertwiner-kernel-image)から $\ker T$ は $D$-不変、$\operatorname{im}T$ は $E$-不変です。$V,W$ は既約なので、
$$
\ker T\in\{\{0\},V\},\qquad
\operatorname{im}T\in\{\{0\},W\}.
$$
$T\ne0$ とします。もし $\ker T=V$ なら $T=0$ となるので $\ker T=\{0\}$ です。同様に $\operatorname{im}T=\{0\}$ は $T=0$ を意味するので $\operatorname{im}T=W$ です。したがって $T$ は単射かつ全射で、線形同型です。

(ii) 複素数体上の非零有限次元空間 $V$ の自己写像 $T$ には、特性多項式の複素根 $\lambda$ があるので $0\ne v\in V$ について $Tv=\lambda v$ とできます。$T$ と $I_V$ はいずれも $D(g)$ と可換するから、
$$
(T-\lambda I_V)D(g)
=D(g)(T-\lambda I_V)
\qquad(g\in G).
$$
よって $S=T-\lambda I_V$ は自己絡作用素です。$Sv=0$ なので $\ker S\ne\{0\}$ です。[核の不変性](../LREP1/index.md#prop-lrep1-intertwiner-kernel-image)と既約性により $\ker S=V$、したがって $S=0$ です。結局 $T=\lambda I_V$ です。$\square$
<!-- proof-end -->

これで同値な既約表現同士の絡作用素は、一つの可逆な絡作用素 $S$ を固定するとそのスカラー倍だけだと分かります。実際、別の絡作用素 $T$ に対し $S^{-1}T$ は自己絡作用素で、(ii) から $S^{-1}T=\lambda I_V$ です。

<a id="cor-lrep2-hom"></a>
<!-- formal-statement-start -->
> **系（既約表現の絡作用素空間）**  
> $G$ の非零・有限次元複素既約表現 $(V,D)$ と $(W,E)$ に対し、絡作用素全体を $\operatorname{Hom}_G(V,W)$ と書く。両表現が非同値なら

$$
\operatorname{Hom}_G(V,W)=\{0\}.
$$

> 両表現が同値なら

$$
\dim_{\mathbb C}\operatorname{Hom}_G(V,W)=1.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非同値なら [Schur の補題](#thm-lrep2-schur)(i) により非零絡作用素は存在しません。同値なら可逆な絡作用素 $S:V\to W$ が存在し、任意の $T$ に対して $S^{-1}T$ は自己絡作用素です。(ii) から $S^{-1}T=\lambda I_V$、すなわち $T=\lambda S$ です。したがって $\operatorname{Hom}_G(V,W)=\mathbb CS$ で次元1です。$\square$
<!-- proof-end -->

**具体例：** $C_2=\{e,s\}$ の二つの1次元指標 $\chi_+(s)=1$、$\chi_-(s)=-1$ について、絡作用素を $T(z)=az$ と書けば $a=-a$ なので $a=0$ です。非同値な既約表現の間に非零絡作用素がないことを直接確認できます。

**複素数体という仮定。** 実ベクトル空間 $\mathbb R^2$ に、$C_4$ の生成元 $r$ を次の行列で作用させます。
$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
$$
$J^2=-I_2$、$J^4=I_2$ なので表現になります。非零の実不変直線があれば、その上に $Jv=\lambda v$ を満たす実数 $\lambda$ と非零ベクトル $v$ が存在します。しかし $J^2v=-v=\lambda^2v$ から $\lambda^2=-1$ となり矛盾します。従って実既約です。

一方、$J$ は自分自身と可換する自己絡作用素ですが、実スカラー行列ではありません。[Schur の補題](#thm-lrep2-schur)(ii) の複素数体という仮定を外せない例です。

後の演習でいう **複素化** とは、同じ実行列 $J$ を $\mathbb C^2$ に作用させ、許される係数を実数から複素数へ広げることです。実の不変直線がなくても、複素化すると固有直線が生じます。

## 2. 「既約に分解できる」とは何か

[LREP1の可約性](../LREP1/index.md#def-lrep1-irreducible)は不変部分空間の**存在**を述べるだけでした。求めたいのは、作用を保ったままベクトルを複数成分へ一意に分け、それぞれを既約にすることです。ここでは直和の各成分がすべて不変であることを要求します。

<a id="def-lrep2-completely-reducible"></a>
<!-- formal-statement-start -->
> **定義（完全可約表現）**  
> 群 $G$ の非零有限次元複素線形表現 $(V,D)$ が、非零の既約不変部分空間 $V_1,\ldots,V_m$ を用いて
>
$$
V=V_1\oplus\cdots\oplus V_m
$$
>
> と書けるとき、$(V,D)$ を **完全可約**という。各 $D(g)$ は各 $V_j$ を保つので、適合する基底では $D(g)$ は全ての $g$ について同じ分割幅のブロック対角行列になる。
<!-- formal-statement-end -->

このブロック表示が出る理由も確かめます。各 $V_j$ から基底 $b_{j,1},\ldots,b_{j,n_j}$ を選び、それらを連結して $V$ の基底にします。不変性とは、各 $g\in G$ と各基底ベクトルについて
$$
D(g)b_{j,\alpha}
=\sum_{\beta=1}^{n_j}a^{(j)}_{\beta\alpha}(g)b_{j,\beta}
$$
と **同じ $V_j$ の基底だけ**で展開できることです。従って異なる $V_j$ の間を移す行列成分は零になり、$D(g)$ は $\operatorname{diag}(A_1(g),\ldots,A_m(g))$ と表示されます。行列のブロック性は、元の不変部分空間の条件を基底で書き直したものです。

<!-- definition-example-start: def-lrep2-completely-reducible -->
**定義の確認**： $C_2=\{e,s\}$（$s^2=e$）の $V=\mathbb C^2$ に $D(e)=I_2$、$D(s)=\operatorname{diag}(1,-1)$ を作用させます。$D(s)^2=I_2$ なので、まず群の表現条件を満たします。$V_+=\mathbb Ce_1$、$V_-=\mathbb Ce_2$ について
$$
D(s)e_1=e_1,\qquad D(s)e_2=-e_2
$$
なので両直線は不変です。各直線は1次元で既約であり、$e_1,e_2$ は $V$ の基底なので $V=V_+\oplus V_-$ です。各直線をこの順に基底として並べた行列が $\operatorname{diag}(1,-1)$ で、定義の各条件を満たします。

一方、[上三角ユニポテント表現](../LREP1/index.md#prop-lrep1-nonsplit)は $W=\mathbb Ce_1$ を不変に保ちます。ここで不変直線が他にないことも確かめます。非零ベクトル $u=(x,y)^{\mathsf T}$ が張る直線を $D(t)=\begin{pmatrix}1&t\\0&1\end{pmatrix}$ が保つとします。$y\ne0$ なら $D(1)u=(x+y,y)^{\mathsf T}$ が $u$ の倍数となり、第二成分から比例係数1、第一成分から $y=0$ が必要になって矛盾します。従って不変直線は $W$ だけです。

もしこの2次元空間が既約直和に分かれるなら、可約であるため二つの既約な不変直線が必要ですが、不変直線は $W$ しかありません。よって完全可約ではありません。単に不変部分空間が存在するだけでは、直和分解に必要な別の不変部分空間は得られません。
<!-- definition-example-end -->

## 3. 有限群では平均が不変内積を作る

コンパクト群を扱う前に、有限群で何を平均するかを確かめます。複素内積（正定値 Hermite 内積）は、**第一変数に共役線形、第二変数に線形**で、$h(w,v)=\overline{h(v,w)}$（Hermite 対称性）、$v\ne0$ なら $h(v,v)>0$（正定値性）を満たします。これは実の対称双線形形式とは異なり、複素共役を含みます。標準内積を
$$
\langle v,w\rangle_0=\sum_{j=1}^n\overline{v_j}w_j
$$
とします。一般の表現 $D(g)$ はこの内積を保存するとは限りません。群のすべての元で運んだ内積を平均すれば、元の群がどの方向から作用しても同じ値になることを狙います。

<a id="def-lrep2-invariant-inner-product"></a>
<!-- formal-statement-start -->
> **定義（不変正定値Hermite内積・ユニタリ表現）**  
> 群 $G$ の有限次元複素表現 $(V,D)$ の正定値 Hermite 内積 $h$ が
>
$$
h(D(g)v,D(g)w)=h(v,w)
\quad(g\in G,\ v,w\in V)
$$
>
> を満たすとき **$G$-不変内積**という。この内積を保存する表現を、$h$ に関する **ユニタリ表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep2-invariant-inner-product -->
**定義の確認**： $C_2$ について $D(s)=\operatorname{diag}(1,-1)$、$h(v,w)=\overline{v_1}w_1+2\overline{v_2}w_2$ とします。各項で第一変数の複素共役と第二変数の線形性が成り立ち、$h(w,v)=\overline{h(v,w)}$ も直接確認できます。さらに $h(v,v)=|v_1|^2+2|v_2|^2>0$（$v\ne0$）なので正定値です。$s$ の作用後は
$$
h(D(s)v,D(s)w)
=\overline{v_1}w_1+2\overline{(-v_2)}(-w_2)
=h(v,w).
$$
$e$ についても恒等写像なので条件を満たします。
<!-- definition-example-end -->

<a id="prop-lrep2-finite-averaging"></a>
<!-- formal-statement-start -->
> **命題（有限群の平均化）**  
> $G$ を有限群、$D:G\to GL(V)$ を有限次元複素表現、$h_0$ を $V$ 上の任意の正定値 Hermite 内積とする。このとき
>
$$
h(v,w)=\frac1{|G|}\sum_{g\in G}h_0(D(g)v,D(g)w)
$$
>
> は $G$-不変な正定値 Hermite 内積である。
<!-- formal-statement-end -->

**証明の見取り図。** 正定値性は全ての $D(g)$ が可逆であることから得られます。不変性は $g\mapsto gk$ が群の元の並べ替えになることを使います。

<!-- proof-start -->
### 証明

各項は共役線形・線形・Hermite対称性を満たすので、その実係数の和 $h$ も同じ性質を満たします。$v\ne0$ なら、どの $g$ に対しても $D(g)v\ne0$ ですから
$$
h_0(D(g)v,D(g)v)>0.
$$
その有限個の平均 $h(v,v)$ も正です。

$k\in G$ を固定すると、表現の積の条件により
$$
\begin{aligned}
h(D(k)v,D(k)w)
&=\frac1{|G|}\sum_{g\in G}h_0(D(g)D(k)v,D(g)D(k)w)\\
&=\frac1{|G|}\sum_{g\in G}h_0(D(gk)v,D(gk)w).
\end{aligned}
$$
右からの乗法 $g\mapsto gk$ は $G$ の全単射なので、$a=gk$ と名前を替えれば最後の和は $h(v,w)$ です。$\square$
<!-- proof-end -->

ここから行列による判定へ移る理由を説明します。$V=\mathbb C^n$ の標準基底で $h_0(v,w)=v^*H_0w$ と表示し、$v^*$ は列ベクトル $v$ の共役転置とします。このとき
$$
h_0(D(g)v,D(g)w)=v^*D(g)^*H_0D(g)w
$$
なので、平均後の内積の行列は
$$
H=\frac1{|G|}\sum_{g\in G}D(g)^*H_0D(g)
$$
です。$h(v,v)>0$ は全ての $v\ne0$ で $v^*Hv>0$ と同値であり、不変性 $h(D(k)v,D(k)w)=h(v,w)$ は $D(k)^*HD(k)=H$ と同値です。従って行列の正定値性と共役転置の等式を検算すれば、もとの内積の条件を確認できます。

例えば $C_2$ の入れ替え行列 $D(s)=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ と $h_0(v,w)=\overline v_1w_1+4\overline v_2w_2$ を取ると、$h$ の行列は
$$
H=\frac12\left(
\begin{pmatrix}1&0\\0&4\end{pmatrix}
+
\begin{pmatrix}4&0\\0&1\end{pmatrix}
\right)=\frac52I_2.
$$
この $H$ は正定値で、$D(s)^*HD(s)=H$ です。もとの $h_0$ が不変でなくても、平均後には不変になることが目で追えます。

## 4. コンパクト群では有限和を積分へ置き換える

有限群の平均には「すべての群要素を同じ重みで数える」方法がありました。連続的な群に同じ操作をするためには、**群の左からの移動で変わらない、全体の重みが1の積分**が必要です。群に位相を入れ、乗法と逆元が連続なものを位相群と呼びます。コンパクト Lie 群はこの例です。Hausdorff とは異なる二点を交わらない開近傍で分離できることです。

Haar 測度の一意性を正確に使うため、測度に**正則性**を課します。これは Borel 集合 $A$ の測度を、内側のコンパクト集合 $K$ と外側の開集合 $O$ の測度で近似できるという条件です。つまり
$$
\mu(A)=\sup_{K\subseteq A,\ K\text{ はコンパクト}}\mu(K)
=\inf_{A\subseteq O,\ O\text{ は開集合}}\mu(O)
$$
を全ての Borel 集合 $A$ について満たすという意味です。コンパクト群上では、Haar 測度の存在・一意性にこの正則性を含めて用います。

<a id="def-lrep2-haar-probability"></a>
<!-- formal-statement-start -->
> **定義（正規化左Haar測度）**  
> $G$ をコンパクト Hausdorff 位相群とする。$G$ 上の**正則な** [確率測度](../../../解析系/F0/F0-00P1/index.md#def-f0-00p1-probability-space) $\mu$ がすべての Borel 集合 $A$ と $k\in G$ について
>
$$
\mu(kA)=\mu(A),\qquad \mu(G)=1
$$
>
> を満たすとき、$\mu$ を **正規化左Haar測度**という。ここで $kA=\{kg:g\in A\}$ であり、Borel 集合とは開集合から可算回の和・補集合によって作られる可測集合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep2-haar-probability -->
**定義の確認**：有限群。 $G$ に離散位相を入れ $\mu(A)=|A|/|G|$ と定めます。任意の部分集合は開集合かつコンパクト集合なので Borel 集合であり、内側・外側からその集合自身を取れば正則性も成立します。左乗法 $g\mapsto kg$ は全単射だから $|kA|=|A|$ となり、$\mu(kA)=\mu(A)$ が成り立ちます。また $\mu(G)=1$ で、各集合の確率は非負です。互いに素な可算集合族も有限群上では非空なものが有限個しかなく、可算加法性も満たします。
<!-- definition-example-end -->

**存在を使う範囲。** 測度論における Haar 測度の存在・一意性という結果によれば、任意の局所コンパクト Hausdorff 位相群に左移動不変な非零の正則 Borel 測度が存在し、定数倍を除き一意です。特にコンパクト群では全体の測度が正で有限なので、$\mu(G)=1$ となるよう正規化できます。この一般存在定理の測度論的構成は本講の既習事項には含まれず、ここでは明示的な入力とします。以下で証明するのは、その測度からの内積と分解の構成です。有限群と $SU(2)$ には測度の具体模型を与えます。

上の定義は**左**移動 $g\mapsto kg$ だけを指定していますが、コンパクト群の正規化Haar測度は右移動でも不変です。実際、固定した $k$ に対し $\nu_k(A)=\mu(Ak)$ と置きます。右移動は同相写像なので $\nu_k$ は正則性を保ち、$\nu_k(G)=1$ です。また $\nu_k(aA)=\mu((aA)k)=\mu(a(Ak))=\mu(Ak)=\nu_k(A)$ です。従って $\nu_k$ も正規化左Haar測度であり、一意性から $\nu_k=\mu$、すなわち $\mu(Ak)=\mu(A)$ です。従って連続関数 $f:G\to\mathbb C$ について右移動の変数変換は
$$
\int_G f(gk)\,d\mu(g)=\int_G f(g)\,d\mu(g)
$$
となります。これを平均化の証明に使います。

<a id="thm-lrep2-compact-averaging"></a>
<!-- formal-statement-start -->
> **定理（コンパクト群の平均による不変内積）**  
> $G$ をコンパクト Hausdorff 位相群、$D:G\to GL(V)$ を**連続な**有限次元複素表現、$h_0$ を $V$ 上の任意の正定値 Hermite 内積とする。$\mu$ を正規化Haar測度とすると
>
$$
h(v,w)=\int_G h_0(D(g)v,D(g)w)\,d\mu(g)
$$
>
> は正定値で $G$-不変な Hermite 内積である。
<!-- formal-statement-end -->

**証明の見取り図。** 有限群の証明を積分に移し、正定値性が単に非負で終わらないことを、連続性と開集合の正のHaar測度によって補います。

<!-- proof-start -->
### 証明

$D$ は連続で $G$ はコンパクトなので、各固定 $v,w$ に対する被積分関数 $g\mapsto h_0(D(g)v,D(g)w)$ は連続で有界、したがって積分可能です。積分の線形性と共役性から $h$ は Hermite 内積の各代数的性質を満たします。

$v\ne0$ に対し $D(e)v=v\ne0$ なので $h_0(D(e)v,D(e)v)>0$ です。連続性から、単位元 $e$ を含む開近傍 $U$ と $c>0$ が存在し、$g\in U$ なら
$$
h_0(D(g)v,D(g)v)\ge c
$$
となります。任意の空でない開集合は正のHaar測度を持ちます。実際、$U$ の左移動 $kU$ は $G$ を覆い、コンパクト性から有限個 $k_1U,\ldots,k_mU$ で覆えます。もし $\mu(U)=0$ なら左不変性と劣加法性から
$$
1=\mu(G)\le\sum_{j=1}^{m}\mu(k_jU)=m\mu(U)=0
$$
となって矛盾します。ゆえに
$$
h(v,v)\ge\int_U c\,d\mu=c\,\mu(U)>0.
$$

任意の $k\in G$ を取ります。$D(gk)=D(g)D(k)$ を代入すると
$$
\begin{aligned}
h(D(k)v,D(k)w)
&=\int_G h_0(D(g)D(k)v,D(g)D(k)w)\,d\mu(g)\\
&=\int_G h_0(D(gk)v,D(gk)w)\,d\mu(g)\\
&=\int_G h_0(D(a)v,D(a)w)\,d\mu(a)=h(v,w).
\end{aligned}
$$
最後の等式に正規化Haar測度の右不変性を使いました。$\square$
<!-- proof-end -->

**$SU(2)$ の具体的な測度模型。** $SU(2)$ は $U^*U=I_2$ と $\det U=1$ を満たす複素 $2\times2$ 行列の群です（$U^*$ は共役転置）。その元は
$$
U(a,b)=
\begin{pmatrix}a&b\\-\overline b&\overline a\end{pmatrix},
\qquad |a|^2+|b|^2=1
$$
について $U^*U=I_2$、$\det U=|a|^2+|b|^2=1$ を満たします。

逆に $SU(2)$ の行列の第1列を $(a,c)^{\mathsf T}$ と置くと、列の直交性と行列式1から第2列は $(-\overline c,\overline a)^{\mathsf T}$ と決まります。$b=-\overline c$ と置けば上の形になります。

従って $(\operatorname{Re}a,\operatorname{Im}a,\operatorname{Re}b,\operatorname{Im}b)$ を座標にすると $SU(2)$ は $\mathbb R^4$ の単位球面 $S^3$ と対応します。

$U_0\in SU(2)$ を左から掛けると、$U(a,b)$ の第1列 $(a,-\overline b)^{\mathsf T}$ は $U_0(a,-\overline b)^{\mathsf T}$ に移ります。対応 $(a,b)\mapsto(a,-\overline b)$ は $\mathbb R^4$ 上の実線形な等長変換です。$U_0$ も複素内積を保つため実の長さを保ち、左乗法は $S^3$ の等長変換になります。

ここで $S^3$ の各領域の面積を与える Borel 測度を $\sigma$ とします。球面の面積は等長変換で保たれ、$S^3$ はコンパクトな距離空間なので有限な面積測度は正則です。従って $\sigma$ を全面積で割った確率測度は、左乗法で変わらず、正規化Haar測度の具体例になります。連続な関数 $f$ の平均は
$$
\int_{SU(2)}f(U)\,d\mu(U)
=\frac1{\operatorname{area}(S^3)}
\int_{S^3}f(U(a,b))\,d\sigma(a,b)
$$
です。球面面積の数値を知らなくても、この式と等長性から正規化・不変性を確かめられます。

## 5. 不変内積なら不変直交補空間がある

補空間はどのベクトル空間にも存在しますが、表現の作用で保たれるとは限りません。ところが不変内積 $h$ があれば、不変部分空間 $W$ に直交するベクトル全体 $W^{\perp_h}$ が自然な補空間になります。内積保存と $D(g^{-1})W=W$ を一緒に使う点が重要です。

<a id="prop-lrep2-orthogonal-complement"></a>
<!-- formal-statement-start -->
> **命題（不変直交補空間）**  
> 群 $G$ の有限次元複素表現 $(V,D)$ が正定値 $G$-不変 Hermite 内積 $h$ を持ち、$W\subseteq V$ が不変部分空間なら、$h$ に関する直交補空間 $W^{\perp_h}$ も不変で
>
$$
V=W\oplus W^{\perp_h}
$$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W^{\perp_h}=\{v\in V:h(w,v)=0\ (w\in W)\}$ と置きます。$v\in W^{\perp_h}$、$k\in G$、$w\in W$ を任意に取ります。[不変部分空間の制限](../LREP1/index.md#prop-lrep1-restriction)により $D(k^{-1})w\in W$ であり、内積不変性から
$$
h(w,D(k)v)=h(D(k^{-1})w,v)=0.
$$
従って $D(k)v\in W^{\perp_h}$、すなわち直交補空間も不変です。

正定値内積を持つ有限次元空間で、$W$ の $h$-正規直交基底を全空間の $h$-正規直交基底へ延長します。最初の基底の張る空間が $W$、残りの張る空間が $W^{\perp_h}$ なので、交わりは $\{0\}$ で和は $V$ です。$\square$
<!-- proof-end -->

この直和で $W$ への $h$-直交射影を $P_W$ とすると、$D(g)$ は $W$ と $W^{\perp_h}$ をそれぞれ保つので
$$
P_WD(g)(w+u)=D(g)w=D(g)P_W(w+u)
$$
です。ここで $w\in W,u\in W^{\perp_h}$ です。従って $P_W$ は[自己絡作用素](../LREP1/index.md#def-lrep1-intertwiner)となります。射影の存在は分解の具体的な計算にも役立ちます。

<a id="thm-lrep2-complete-reducibility"></a>
<!-- formal-statement-start -->
> **定理（コンパクト群の有限次元連続複素表現の完全可約性）**  
> $G$ をコンパクト Hausdorff 位相群とし、$(V,D)$ を非零有限次元複素ベクトル空間上の連続な表現とする。このとき $V$ は有限個の非零既約不変部分空間の直和に分解できる。特に全ての有限群の有限次元複素表現は完全可約である。
<!-- formal-statement-end -->

**証明の見取り図。** 不変部分空間が全くなければ既約で終了です。あれば前節の直交補を取り、双方を次元の小さい表現として分解します。次元を下げる帰納法が有限回で止まります。

<!-- proof-start -->
### 証明

[コンパクト群の平均による不変内積](#thm-lrep2-compact-averaging)から $V$ に正定値不変内積 $h$ が存在します。$n=\dim_{\mathbb C}V\ge1$ に関する帰納法を使います。

$n=1$ なら非零の真部分空間がないので既約です。$n>1$ で、$V$ が既約なら直和の成分を $V$ 一つとして終了します。可約なら、ある $G$-不変部分空間 $W$ が $0<\dim W<n$ を満たします。[不変直交補空間命題](#prop-lrep2-orthogonal-complement)により
$$
V=W\oplus W^{\perp_h}.
$$
ここで $\dim W^{\perp_h}=n-\dim W$ であり、両部分空間は非零・不変かつ次元が $n$ 未満です。制限表現も連続ですから、帰納法の仮定によって $W$ と $W^{\perp_h}$ の双方を既約不変部分空間の直和へ分けられます。それらを合わせれば $V$ の既約直和分解です。

有限群には離散位相を入れればコンパクトで、任意の表現は連続です。別の証明として[有限群の平均化](#prop-lrep2-finite-averaging)を使っても同じ帰納法が成立します。$\square$
<!-- proof-end -->

例えば $SU(2)$ の $\mathbb C^2$ 上の標準表現について、既約性を直接確かめられます。二つの行列を取ります。

$$
A=\begin{pmatrix}i&0\\0&-i\end{pmatrix},
\qquad
B=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

両者は $U^*U=I_2$ と $\det U=1$ を満たすので $SU(2)$ に属します。$A$ の固有値は $i$ と $-i$ で相異なり、$A$-不変な複素直線は $\mathbb Ce_1$ または $\mathbb Ce_2$ に限られます。実際、$v=(x,y)^{\mathsf T}$ が固有ベクトルなら

$$
ix=\lambda x,\qquad -iy=\lambda y.
$$

$x,y$ が共に非零なら $\lambda=i=-i$ という矛盾が生じます。他方、

$$
Be_1=-e_2,\qquad Be_2=e_1
$$

なので $B$ は両軸を交換し、いずれも保ちません。従って $A,B$ に共通の不変直線はなく、群全体に不変な真の非零部分空間もありません。[Schur の補題](#thm-lrep2-schur)により、標準表現の自己絡作用素はスカラー行列だけです。

この定理が保証するのは、**既約直和分解の存在**です。重複して現れる同型な既約直和因子の具体的な選び方まで一意になるとは主張していません。

## 6. 非コンパクト群では何が破れるか

前講の非分裂模型 $G=(\mathbb C,+)$、
$$
D(t)=\begin{pmatrix}1&t\\0&1\end{pmatrix}
$$
を再び考えます。$t$ は任意の複素数なので群はコンパクトではありません。$W=\mathbb Ce_1$ は不変で、不変補直線を持たないことは既に証明しました。平均化の結論をこの群へ持ち込めない理由を、不変内積の観点からも確認します。

仮に正定値不変内積 $h$ があったとし、$u=e_1,v=e_2$ とします。$D(t)v=v+tu$ なので不変性から全ての実数 $t$ について
$$
\begin{aligned}
h(v,v)
&=h(v+tu,v+tu)\\
&=h(v,v)+t\,h(v,u)+t\,h(u,v)+t^2h(u,u).
\end{aligned}
$$
左辺は $t$ に依存しません。しかし右辺の二次係数 $h(u,u)$ は $u\ne0$ と正定値性により正です。従って等式は全ての $t$ について成立せず、矛盾です。

つまりこの表現は正定値不変内積を持てず、直交補空間の不変性を得るための道具がありません。非コンパクト群でも**特定の表現**が完全可約であることはありますが、全ての有限次元表現についての保証は失われます。Schur の補題そのものにはコンパクト性が不要である点と対照的です。

## 7. 演習

定義を確認する問題に加え、平均の不変性、複素数体の役割、不変補空間と非コンパクト反例を異なる設定で確かめます。各問の解答では、使う群・表現・内積と作用の順序を意識してください。

### Level A

<a id="ex-lrep2-a01"></a>
#### LREP2-A01 非同値な指標の間の絡作用素
- Level: A
- ID: LREP2-A01

$G=C_3=\langle r:r^3=e\rangle$、$\omega=e^{2\pi i/3}$ とし、$\chi_j(r)=\omega^j$（$j=0,1,2$）とする。$j\ne k$ なら $\operatorname{Hom}_G(\chi_j,\chi_k)=\{0\}$ を直接計算せよ。

<!-- solution-start -->
**詳細解答。** $\mathbb C\to\mathbb C$ の複素線形写像は $T(z)=az$ です。生成元 $r$ についての[絡作用素の条件](../LREP1/index.md#def-lrep1-intertwiner)は
$$
a\omega^j=\omega^k a,\qquad
(\omega^j-\omega^k)a=0.
$$
$j,k\in\{0,1,2\}$ が異なれば $\omega^j\ne\omega^k$ なので $a=0$ です。零写像はどの元についても絡作用素であり、他にはありません。これは[Schur の補題の系](#cor-lrep2-hom)とも一致します。
<!-- solution-end -->

<a id="ex-lrep2-a02"></a>
#### LREP2-A02 二つの生成行列と自己絡作用素
- Level: A
- ID: LREP2-A02

$A=\operatorname{diag}(i,-i)$、$B=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とする。$X\in M_2(\mathbb C)$ が $XA=AX$ と $XB=BX$ を満たすなら、$X=\lambda I_2$ と示せ。

<!-- solution-start -->
**詳細解答。** $X=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と置きます。
$$
XA=\begin{pmatrix}ia&-ib\\ic&-id\end{pmatrix},\qquad
AX=\begin{pmatrix}ia&ib\\-ic&-id\end{pmatrix}.
$$
両者が等しい条件は $2ib=2ic=0$、すなわち $b=c=0$ です。そこで $X=\operatorname{diag}(a,d)$ とすると
$$
XB=\begin{pmatrix}0&a\\-d&0\end{pmatrix},\qquad
BX=\begin{pmatrix}0&d\\-a&0\end{pmatrix}.
$$
等号から $a=d$ です。従って $X=aI_2$ です。これは $SU(2)$ 標準表現についての[Schur の補題](#thm-lrep2-schur)を具体行列で確認したものです。
<!-- solution-end -->

<a id="ex-lrep2-a03"></a>
#### LREP2-A03 入れ替え作用の平均内積
- Level: A
- ID: LREP2-A03

$C_2$ の生成元を $S=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ で表し、$h_0(v,w)=3\overline v_1w_1+\overline v_2w_2$ とする。有限群の平均内積 $h$ の行列を求め、$S^*HS=H$ と正定値性を確かめよ。

<!-- solution-start -->
**詳細解答。** $h_0$ の行列は $H_0=\operatorname{diag}(3,1)$ です。$S=S^*=S^{-1}$ なので、[有限群の平均化](#prop-lrep2-finite-averaging)から
$$
H=\tfrac12(H_0+S^*H_0S)
=\tfrac12\left(
\begin{pmatrix}3&0\\0&1\end{pmatrix}
+\begin{pmatrix}1&0\\0&3\end{pmatrix}
\right)=2I_2.
$$
任意の $v\ne0$ について $v^*Hv=2(|v_1|^2+|v_2|^2)>0$ です。また $S^*HS=2S^2=2I_2=H$ となり不変です。
<!-- solution-end -->

<a id="ex-lrep2-a04"></a>
#### LREP2-A04 Haar測度の有限群模型
- Level: A
- ID: LREP2-A04

位数 $n\ge1$ の有限群 $G$ で $\mu(A)=|A|/n$ とする。$\mu(G)=1$、左移動不変性、$\int_Gf\,d\mu=\frac1n\sum_{g\in G}f(g)$ を説明し、この平均が右移動でも不変と確かめよ。

<!-- solution-start -->
**詳細解答。** $|G|=n$ なので $\mu(G)=n/n=1$ です。$k\in G$ を固定すると $g\mapsto kg$ が逆写像 $g\mapsto k^{-1}g$ を持つ全単射なので $|kA|=|A|$、従って $\mu(kA)=\mu(A)$ です。各一点集合の測度は $1/n$ で、有限集合上の積分は各点の値とその測度の積の和だから
$$
\int_Gf\,d\mu=\sum_{g\in G}f(g)\mu(\{g\})
=\frac1n\sum_{g\in G}f(g).
$$
右移動も $g\mapsto gk$ が逆 $g\mapsto gk^{-1}$ を持つ全単射なので
$$
\frac1n\sum_{g\in G}f(gk)=\frac1n\sum_{a\in G}f(a).
$$
これが右移動不変性です。
<!-- solution-end -->

### Level B

<a id="ex-lrep2-b01"></a>
#### LREP2-B01 実既約表現と複素既約表現の違い
- Level: B
- ID: LREP2-B01

$C_4$ を実二次元に $D(r)=J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ で作用させる。(i) 実既約であること、(ii) $J$ と可換する実行列が全て $aI+bJ$ と書けること、(iii) 複素化後は可約になることを示せ。

<!-- solution-start -->
**詳細解答。** (i) $J^2=-I$、$J^4=I$ なので表現です。実の真の非零部分空間があれば直線です。その直線を $J$ が保てば非零の実ベクトル $v$ に対して $Jv=\lambda v$（$\lambda\in\mathbb R$）が必要ですが、$J^2v=-v=\lambda^2v$ より $\lambda^2=-1$ となり不可能です。従って実既約です。

(ii) $X=\begin{pmatrix}p&q\\r&s\end{pmatrix}$ と置くと
$$
XJ=\begin{pmatrix}q&-p\\s&-r\end{pmatrix},
\qquad
JX=\begin{pmatrix}-r&-s\\p&q\end{pmatrix}.
$$
等号から $q=-r$、$s=p$ です。従って $X=\begin{pmatrix}p&q\\-q&p\end{pmatrix}=pI-qJ$ で、全体は $\{aI+bJ:a,b\in\mathbb R\}$ です。$J$ はこの中の非スカラー元です。

(iii) 複素ベクトル空間 $\mathbb C^2$ では
$$
J(1,-i)^{\mathsf T}=i(1,-i)^{\mathsf T},\qquad
J(1,i)^{\mathsf T}=-i(1,i)^{\mathsf T}.
$$
両固有直線は独立で、その直和が $\mathbb C^2$ です。従って複素化した表現は可約で、複素既約表現に関する[Schur の補題](#thm-lrep2-schur)(ii)を実表現に直接適用できない理由が分かります。
<!-- solution-end -->

<a id="ex-lrep2-b02"></a>
#### LREP2-B02 直交射影も絡作用素である
- Level: B
- ID: LREP2-B02

有限次元複素表現 $(V,D)$ が正定値不変内積 $h$ を持つとする。不変部分空間 $W$ への $h$-直交射影 $P_W$ が全ての $D(g)$ と可換することを、直和分解から示せ。さらに $P_W^2=P_W$、$\ker P_W=W^{\perp_h}$、$\operatorname{im}P_W=W$ を確かめよ。

<!-- solution-start -->
**詳細解答。** [不変直交補空間命題](#prop-lrep2-orthogonal-complement)の仮定を満たすので $V=W\oplus W^{\perp_h}$ です。任意の $v$ を一意に $v=w+u$（$w\in W$、$u\in W^{\perp_h}$）と書き、$P_W(v)=w$ とします。両空間の不変性により
$$
P_WD(g)v=P_W(D(g)w+D(g)u)=D(g)w=D(g)P_Wv.
$$
従って[絡作用素の条件](../LREP1/index.md#def-lrep1-intertwiner)を満たします。また $P_W^2(v)=P_W(w)=w=P_W(v)$、$P_W(v)=0\iff w=0\iff v=u\in W^{\perp_h}$ です。任意の $w\in W$ に対し $P_W(w)=w$ なので像はちょうど $W$ です。
<!-- solution-end -->

<a id="ex-lrep2-b03"></a>
#### LREP2-B03 非コンパクト群で不変内積が破れる
- Level: B
- ID: LREP2-B03

$G=(\mathbb R,+)$、$D(t)=\begin{pmatrix}1&t\\0&1\end{pmatrix}$ を $\mathbb C^2$ に作用させる。(i) 表現であること、(ii) 正定値不変 Hermite 内積が存在しないこと、(iii) この表現が完全可約でないことを示せ。

<!-- solution-start -->
**詳細解答。** (i) $D(0)=I_2$、$D(t)D(u)=\begin{pmatrix}1&t+u\\0&1\end{pmatrix}=D(t+u)$、$D(t)^{-1}=D(-t)$ ですから表現です。

(ii) 不変な正定値内積 $h$ があると仮定します。$v=e_2$、$u=e_1$ に対し $D(t)v=v+tu$ です。実数 $t$ について
$$
0=h(D(t)v,D(t)v)-h(v,v)
=t\bigl(h(v,u)+h(u,v)\bigr)+t^2h(u,u).
$$
左辺が全ての $t$ で零なら、二次多項式の係数から $h(u,u)=0$ が必要ですが、$u\ne0$ に正定値性を適用すると $h(u,u)>0$ となり矛盾です。

(iii) 不変直線 $W=\mathbb Ce_1$ はあります。別の不変直線 $U\ne W$ があれば $U=\mathbb C(e_2+ae_1)$ と書けます。しかし
$$
D(1)(e_2+ae_1)=e_2+(a+1)e_1
$$
が $U$ に入るなら、第二成分から比例係数1、第一成分から $a+1=a$ が必要で矛盾します。よって不変直線は $W$ のみで、既約直和分解は存在しません。失われた仮定はコンパクト性であり、平均による正定値不変内積を作れないことが証明の破綻点です。
<!-- solution-end -->

### Level C

<a id="ex-lrep2-c01"></a>
#### LREP2-C01 巡回群の既約分解を射影から構成する
- Level: C
- ID: LREP2-C01

$G=C_3=\langle r:r^3=e\rangle$、$\omega=e^{2\pi i/3}$、$D:G\to GL(V)$ を有限次元複素表現とする。$A=D(r)$ と置き、$k=0,1,2$ に対して
$$
P_k=\frac13\sum_{j=0}^2\omega^{-kj}A^j
$$
と定める。ここで $\delta_{k\ell}$ は $k=\ell$ なら1、$k\ne\ell$ なら0を表します。

1. $P_kP_\ell=\delta_{k\ell}P_k$ と $P_0+P_1+P_2=I_V$ を示せ。
2. $\operatorname{im}P_k=\ker(A-\omega^kI_V)$ と $V=\bigoplus_{k=0}^2\operatorname{im}P_k$ を示せ。
3. 各非零 $\operatorname{im}P_k$ が1次元指標 $\chi_k(r)=\omega^k$ のコピーの直和であると説明し、これが完全可約性の具体的証明になることを示せ。

<!-- solution-start -->
**詳細解答。** 表現条件 $r^3=e$ から $A^3=I_V$ です。また幾何級数の公式により、整数 $m$ について
$$
\sum_{j=0}^2\omega^{mj}
=\begin{cases}3&(3\mid m),\\0&(3\nmid m)\end{cases}
$$
です。これを以下で繰り返し使います。

(1) まず和をとると
$$
\begin{aligned}
\sum_{k=0}^2P_k
&=\frac13\sum_{j=0}^2
\left(\sum_{k=0}^2\omega^{-kj}\right)A^j
=I_V,
\end{aligned}
$$
です。積を求める際は $A^3=I_V$ により指数を法3で扱えます。$m=j+t$（法3）と置くと
$$
\begin{aligned}
P_kP_\ell
&=\frac19\sum_{j,t=0}^2
\omega^{-kj-\ell t}A^{j+t}\\
&=\frac19\sum_{m=0}^2A^m\omega^{-\ell m}
\sum_{j=0}^2\omega^{(\ell-k)j}\\
&=\delta_{k\ell}\frac13\sum_{m=0}^2
\omega^{-km}A^m
=\delta_{k\ell}P_k.
\end{aligned}
$$
最後の行では、$k=\ell$ なら内側の和が3、そうでなければ0を使いました。

(2) $A$ と $P_k$ は共に $A$ の多項式なので可換です。さらに
$$
AP_k=\frac13\sum_{j=0}^2\omega^{-kj}A^{j+1}
=\omega^kP_k
$$
です（$j+1$ を法3で置き換え、$A^3=I_V$ を使いました）。よって $\operatorname{im}P_k\subseteq\ker(A-\omega^kI_V)$ です。逆に $Av=\omega^kv$ なら
$$
P_kv=\frac13\sum_{j=0}^2
\omega^{-kj}(\omega^k)^jv
=\frac13(1+1+1)v=v,
$$
ゆえに両空間は一致します。任意の $v$ は (1) より $v=P_0v+P_1v+P_2v$ と分かれ、$P_kP_\ell=\delta_{k\ell}P_k$ によって直和性も得られます。具体的に和が零なら $P_\ell$ を作用させて各成分が零になるからです。

(3) $\operatorname{im}P_k$ では $A=\omega^kI$ なので $D(r^j)=A^j=\omega^{kj}I$ です。そこから任意の複素基底を選ぶと、各基底ベクトルの張る直線が群全体で不変となり、対応する1次元表現は $\chi_k$ です。1次元表現は[既約性の定義](../LREP1/index.md#def-lrep1-irreducible)から既約です。全ての $k$ と基底ベクトルにわたる直線の直和が $V$ なので、[完全可約の定義](#def-lrep2-completely-reducible)を直接満たします。これは[一般の完全可約性定理](#thm-lrep2-complete-reducibility)を $C_3$ について射影で具体化したものです。
<!-- solution-end -->

## 8. まとめと次講

[Schur の補題](#thm-lrep2-schur)は任意の群の有限次元複素既約表現に適用でき、既約表現間の絡作用素を強く制限します。一方、[完全可約性定理](#thm-lrep2-complete-reducibility)には、群のコンパクト性と表現の連続性が効きます。Haar 測度による平均で不変正定値内積を作り、直交補空間を繰り返し取ることが分解の構成法です。

次の LREP3 では、Lie環の表現を微分で取り出し、その交換関係を満たす作用素からどの条件で Lie 群の表現に戻せるかを調べます。既約分解を理解したうえで、局所的な交換関係と群の大域的な構造を区別します。
