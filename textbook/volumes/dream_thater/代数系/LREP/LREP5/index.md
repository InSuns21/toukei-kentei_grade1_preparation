# LREP5 SU(2)からSO(3)への二重被覆

<!-- definition-example-audit: strict -->

[LREP3の被覆表現の降下](../LREP3/index.md#def-lrep3-descent)では、同じ回転を表す被覆群の二つの元に別々の行列を割り当てると、元の群の表現を作れないと学びました。では三次元の回転に対して、実際にそのような「二つの持ち上げ」はどこから現れるのでしょうか。

本講は、二成分の複素ベクトルに作用する $SU(2)$ と、三次元の実ベクトルを回す $SO(3)$ の間に具体的な写像を作ります。鍵は、三次元ベクトルを二次の複素行列として表し、ユニタリ行列による共役で動かすことです。長さの保存だけでなく、像の全体、核、局所的な逆写像を調べ、最後に一周の回転が二成分ベクトルの符号を変える理由を確かめます。

ここで $\mathbb C^2$ の複素線形作用と $\mathbb R^3$ の実線形作用は異なる表現空間です。群 $SU(2)=\{U\in M_2(\mathbb C):U^\dagger U=I_2,\det U=1\}$、$SO(3)=\{R\in M_3(\mathbb R):R^{\mathsf T}R=I_3,\det R=1\}$ は、[特殊ユニタリ群](../../LIE/LIE3/index.md#def-lie3-unitary-groups)と[特殊直交群](../../LIE/LIE3/index.md#def-lie3-orthogonal-groups)の具体例です。$\dagger$ は共役転置、$I_n$ は $n$ 次単位行列を表します。

## 1. 三次元ベクトルを行列へ移す

回転の作用を $2\times2$ 行列で表すため、まず実ベクトルを**エルミートかつ跡が零**の複素行列に対応させます。エルミートとは $X^\dagger=X$ を意味します。このような行列の実次元は3であり、三次元の座標をちょうど収められます。

次の三つの行列を用います。以下の定義でそれらを **Pauli行列** と名付けます。

<a id="def-lrep5-pauli-model"></a>
<!-- formal-statement-start -->
> **定義（Pauli行列と三次元の行列模型）**  
> 行列 $\sigma_1,\sigma_2,\sigma_3$ を
>
$$
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$
>
> と定める。実ベクトル $\boldsymbol x=(x_1,x_2,x_3)\in\mathbb R^3$ に対し
>
$$
X(\boldsymbol x)=\boldsymbol x\cdot\boldsymbol\sigma
=x_1\sigma_1+x_2\sigma_2+x_3\sigma_3
=\begin{pmatrix}x_3&x_1-ix_2\\x_1+ix_2&-x_3\end{pmatrix}
$$
>
> と置く。この実線形写像を三次元ベクトルの **Pauli行列模型** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep5-pauli-model -->
**定義の確認**。 $\boldsymbol x=(1,2,-1)$ を代入すると
$$
X(\boldsymbol x)=\begin{pmatrix}-1&1-2i\\1+2i&1\end{pmatrix}.
$$
対角成分は実数、非対角成分は互いに複素共役なので $X^\dagger=X$ です。また対角和は零です。

逆に、エルミートかつ跡零の行列は次の形です。
$$
\begin{pmatrix}r&z\\\bar z&-r\end{pmatrix},
\qquad r\in\mathbb R,\ z\in\mathbb C.
$$
実座標を $\boldsymbol x=(\operatorname{Re}z,-\operatorname{Im}z,r)$ と読めば一意に $X(\boldsymbol x)$ に戻せます。これで実線形同型が確かめられました。

さらに行列式を直接計算すると、
$$
\begin{aligned}
\det X(\boldsymbol x)
&=x_3(-x_3)-(x_1-ix_2)(x_1+ix_2)\\
&=-x_3^2-(x_1^2+x_2^2)
=-\|\boldsymbol x\|^2
\end{aligned}
$$
となります。これは「エルミートかつ跡零」の定義条件とは別に、この模型が三次元ベクトルの長さをどう記録するかを示す恒等式です。今の例でも $\det X=-1-|1-2i|^2=-6=-\|\boldsymbol x\|^2$ と確かめられます。
<!-- definition-example-end -->

行列を掛けると $\sigma_j^2=I_2$、$\sigma_1\sigma_2=i\sigma_3$、$\sigma_2\sigma_3=i\sigma_1$、$\sigma_3\sigma_1=i\sigma_2$ です。逆順ではそれぞれ符号が反転します。例えば
$$
\sigma_1\sigma_2=
\begin{pmatrix}i&0\\0&-i\end{pmatrix}=i\sigma_3,\qquad
\sigma_2\sigma_1=-i\sigma_3.
$$
これらからベクトルの内積と外積が行列積に現れます。外積 $\boldsymbol x\times\boldsymbol y$ の向きは $\boldsymbol e_1\times\boldsymbol e_2=\boldsymbol e_3$ とします。

<a id="lem-lrep5-pauli-product"></a>
<!-- formal-statement-start -->
> **補題（Pauli行列の積公式）**  
> 任意の実ベクトル $\boldsymbol x,\boldsymbol y\in\mathbb R^3$ について
>
$$
X(\boldsymbol x)X(\boldsymbol y)
=(\boldsymbol x\cdot\boldsymbol y)I_2
+iX(\boldsymbol x\times\boldsymbol y)
$$
>
> が成り立つ。特に
>
$$
X(\boldsymbol x)^2=\|\boldsymbol x\|^2I_2,\qquad
\frac12\operatorname{tr}\bigl(X(\boldsymbol x)X(\boldsymbol y)\bigr)
=\boldsymbol x\cdot\boldsymbol y.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 対角の三項は内積を、添字の異なる六項は外積を作ります。跡を取るとPauli行列の跡がすべて零なので外積の項は消えます。

<!-- proof-start -->
### 証明

$X(\boldsymbol x)X(\boldsymbol y)=\sum_{j,k}x_jy_k\sigma_j\sigma_k$ を展開します。$j=k$ の和は $(x_1y_1+x_2y_2+x_3y_3)I_2$ です。添字の異なる項を二つずつ合わせると
$$
\begin{aligned}
&x_1y_2\sigma_1\sigma_2+x_2y_1\sigma_2\sigma_1
=i(x_1y_2-x_2y_1)\sigma_3,\\
&x_2y_3\sigma_2\sigma_3+x_3y_2\sigma_3\sigma_2
=i(x_2y_3-x_3y_2)\sigma_1,\\
&x_3y_1\sigma_3\sigma_1+x_1y_3\sigma_1\sigma_3
=i(x_3y_1-x_1y_3)\sigma_2.
\end{aligned}
$$
これらが $iX(\boldsymbol x\times\boldsymbol y)$ です。$\boldsymbol y=\boldsymbol x$ では外積は零となり、二乗公式を得ます。最後に積公式の跡を取り、$\operatorname{tr}I_2=2$ と $\operatorname{tr}\sigma_j=0$ を使うと跡公式が従います。$\square$
<!-- proof-end -->

## 2. ユニタリ共役が回転を作る

$U\in SU(2)$ なら $U^\dagger=U^{-1}$ です。エルミートな $X$ を $UXU^\dagger$ に移すと、エルミート性と跡が保たれます。そこで先ほどの実線形同型を逆に使い、共役後の行列がどのベクトルに対応するかを読み取ります。

<a id="def-lrep5-conjugation-map"></a>
<!-- formal-statement-start -->
> **定義（共役による三次元作用）**  
> 任意の $U\in SU(2)$ と $\boldsymbol x\in\mathbb R^3$ に対し、唯一の実ベクトル $R_U\boldsymbol x$ を
>
$$
X(R_U\boldsymbol x)=UX(\boldsymbol x)U^\dagger
$$
>
> によって定める。対応 $\Phi:SU(2)\to GL_3(\mathbb R)$、$\Phi(U)=R_U$ を **共役作用から定まる写像** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep5-conjugation-map -->
**定義の確認**。$\boldsymbol e_1,\boldsymbol e_2,\boldsymbol e_3$ を三次元の標準基底とします。[Pauli行列模型](#def-lrep5-pauli-model)では $X(\boldsymbol e_j)=\sigma_j$ です。そこで各基底行列の共役を
$$
U\sigma_jU^\dagger=\sum_{k=1}^3 r_{kj}\sigma_k
$$
と一意に展開すれば、定義式の右辺は $\sum_j x_jU\sigma_jU^\dagger=X(\sum_jx_jR_U\boldsymbol e_j)$ となります。つまり係数 $r_{kj}$ が $R_U$ の第 $j$ 列の第 $k$ 成分であり、三つの基底像だけで全ての $\boldsymbol x$ に対する作用を判定できます。

$U=I_2$ なら $R_U\boldsymbol x=\boldsymbol x$ です。もう一つ、$\theta\in\mathbb R$ に対し
$$
U_z(\theta)=\begin{pmatrix}e^{-i\theta/2}&0\\0&e^{i\theta/2}\end{pmatrix}
$$
とします。各対角成分の絶対値が1で、積は1だから $U_z(\theta)\in SU(2)$ です。行列積を計算すると
$$
\begin{aligned}
U_z(\theta)\sigma_1U_z(\theta)^\dagger
&=\begin{pmatrix}0&e^{-i\theta}\\e^{i\theta}&0\end{pmatrix}
=\cos\theta\,\sigma_1+\sin\theta\,\sigma_2,\\
U_z(\theta)\sigma_2U_z(\theta)^\dagger
&=-\sin\theta\,\sigma_1+\cos\theta\,\sigma_2,\\
U_z(\theta)\sigma_3U_z(\theta)^\dagger&=\sigma_3.
\end{aligned}
$$
従って $R_{U_z(\theta)}(x_1,x_2,x_3)=(x_1\cos\theta-x_2\sin\theta,\ x_1\sin\theta+x_2\cos\theta,\ x_3)$。定義の「どのベクトルへ移るか」が、$z$ 軸回りの回転として直接確認できました。
<!-- definition-example-end -->

<a id="thm-lrep5-orthogonal-homomorphism"></a>
<!-- formal-statement-start -->
> **定理（共役作用は特殊直交表現）**  
> $X(R_U\boldsymbol x)=UX(\boldsymbol x)U^\dagger$ で定めた $\Phi(U)=R_U$ は、滑らかな群準同型 $SU(2)\to SO(3)$ である。すなわち任意の $U,V\in SU(2)$ に対し
>
$$
R_{UV}=R_UR_V,\qquad
R_U^{\mathsf T}R_U=I_3,\qquad
\det R_U=1
$$
>
> が成立する。
<!-- formal-statement-end -->

**証明の見取り図。** 共役を二回重ねれば群法則が出ます。内積は[Pauli行列の跡公式](#lem-lrep5-pauli-product)で計算し、行列式の符号は $SU(2)$ の連結性から決めます。

<!-- proof-start -->
### 証明

任意の $U\in SU(2)$ に対し、$UX(\boldsymbol x)U^\dagger$ はエルミートです。跡は $\operatorname{tr}(UXU^\dagger)=\operatorname{tr}(XU^\dagger U)=\operatorname{tr}X=0$ なので、Pauli行列模型に一意に対応します。共役作用は実線形で、$R_U$ も実線形です。可逆性は $R_{U^{-1}}$ が逆写像となることから分かります。

二つの群元について
$$
\begin{aligned}
X(R_{UV}\boldsymbol x)
&=(UV)X(\boldsymbol x)(UV)^\dagger\\
&=U\{VX(\boldsymbol x)V^\dagger\}U^\dagger\\
&=UX(R_V\boldsymbol x)U^\dagger
=X(R_UR_V\boldsymbol x).
\end{aligned}
$$
模型が単射だから $R_{UV}=R_UR_V$、また $R_{I_2}=I_3$ です。

実ベクトル $\boldsymbol x,\boldsymbol y$ の内積について、[跡公式](#lem-lrep5-pauli-product)と跡の巡回性から
$$
\begin{aligned}
(R_U\boldsymbol x)\cdot(R_U\boldsymbol y)
&=\frac12\operatorname{tr}\bigl(UX(\boldsymbol x)U^\dagger
UX(\boldsymbol y)U^\dagger\bigr)\\
&=\frac12\operatorname{tr}\bigl(UX(\boldsymbol x)X(\boldsymbol y)U^\dagger\bigr)\\
&=\frac12\operatorname{tr}(X(\boldsymbol x)X(\boldsymbol y))
=\boldsymbol x\cdot\boldsymbol y.
\end{aligned}
$$
標準基底にこれを適用すると $R_U^{\mathsf T}R_U=I_3$、従って $\det R_U=\pm1$ です。

最後に連結性を確認します。任意の $U\in SU(2)$ は、ユニタリ性と行列式1から
$$
U=\begin{pmatrix}\alpha&\beta\\-\overline\beta&\overline\alpha\end{pmatrix},
\qquad |\alpha|^2+|\beta|^2=1
$$
の形を持ちます。$\alpha,\beta$ の実部・虚部は実4座標をなし、その平方和が1です。逆に、これを満たす4座標から同じ形の行列を作れるので、$SU(2)$ と単位球面 $S^3$ は互いに連続な対応を持ちます。

$S^3$ の二点 $p,q$ が対蹠点でなければ、分母が零にならない道
$$
c(t)=\frac{(1-t)p+tq}{\|(1-t)p+tq\|},\qquad 0\le t\le1
$$
で結べます。対蹠点なら第三の点を経由するので、$SU(2)$ は道連結です。

連続関数 $U\mapsto\det R_U$ は $\{+1,-1\}$ に値を持ち、単位元では $+1$ です。したがって連結性から全体で $\det R_U=1$ となります。

滑らかさを成分ごとに確かめます。$X(\boldsymbol e_j)=\sigma_j$ と[跡公式](#lem-lrep5-pauli-product)により、行列 $R_U=(r_{kj})_{k,j=1}^3$ の各成分は
$$
r_{kj}=\frac12\operatorname{tr}(\sigma_k U\sigma_jU^\dagger)
$$
です。右辺は $U$ と $\overline U$ の成分の多項式なので $\Phi$ は滑らかです。$\square$
<!-- proof-end -->

ここまでで「回転を作る」ことは分かりました。しかし、三次元の全ての回転が得られるのか、異なる $U$ が同じ回転になるのかは別に調べなければなりません。

## 3. 軸と角度で像と核を決める

単位ベクトル $\boldsymbol n$ と実角 $\theta$ を取ります。[二乗公式](#lem-lrep5-pauli-product)から $N=X(\boldsymbol n)$ は $N^2=I_2$、$N^\dagger=N$、$\operatorname{tr}N=0$ です。従って行列指数を偶数次と奇数次に分けると
$$
\begin{aligned}
U(\boldsymbol n,\theta)
&=\exp(-i\theta N/2)\\
&=\cos(\theta/2)I_2-i\sin(\theta/2)N.
\end{aligned}
$$
$N^2=I_2$ より、その固有値は $\pm1$ に限られます。跡が零で二次元なので、両方が一つずつ現れます。

$c=\cos(\theta/2)$、$s=\sin(\theta/2)$ と書くと、$N^\dagger=N$ だから
$$
U^\dagger U=(cI_2+isN)(cI_2-isN)
=(c^2+s^2)I_2=I_2.
$$
さらに $N$ の二つの固有値に $c-isN$ を作用させると $U$ の固有値は $e^{-i\theta/2},e^{i\theta/2}$ です。その積は $1$ なので $\det U=1$ となり、$U\in SU(2)$ が定義の両条件から確認できました。

<a id="prop-lrep5-rodrigues"></a>
<!-- formal-statement-start -->
> **命題（軸角表示と三次元回転）**  
> 任意の単位ベクトル $\boldsymbol n\in\mathbb R^3$ と実数 $\theta$ に対し、$U(\boldsymbol n,\theta)=\exp(-i\theta X(\boldsymbol n)/2)\in SU(2)$ とおく。その共役作用は
>
$$
R_{U(\boldsymbol n,\theta)}\boldsymbol x
=\cos\theta\,\boldsymbol x
+\sin\theta\,(\boldsymbol n\times\boldsymbol x)
+(1-\cos\theta)(\boldsymbol n\cdot\boldsymbol x)\boldsymbol n
$$
>
> である。これは右手系で $\boldsymbol n$ 軸を固定し、その直交平面を角度 $\theta$ 回転させる。
<!-- formal-statement-end -->

**証明の見取り図。** 行列指数に現れた半角が、共役を展開すると倍角に変わります。平行成分は固定され、垂直成分に通常の二次元回転が現れます。

<!-- proof-start -->
### 証明

$c=\cos(\theta/2)$、$s=\sin(\theta/2)$、$X=X(\boldsymbol x)$ とすると
$$
(cI_2-isN)X(cI_2+isN)
=c^2X+ics(XN-NX)+s^2NXN.
$$
[積公式](#lem-lrep5-pauli-product)から
$$
NX-XN=2iX(\boldsymbol n\times\boldsymbol x),\qquad
NX+XN=2(\boldsymbol n\cdot\boldsymbol x)I_2.
$$
二番目の式へ左から $N$ を掛け、$N^2=I_2$ を使うと
$$
X+NXN=2(\boldsymbol n\cdot\boldsymbol x)N,\qquad
NXN=2(\boldsymbol n\cdot\boldsymbol x)N-X.
$$
従って共役の右辺は
$$
(c^2-s^2)X+2csX(\boldsymbol n\times\boldsymbol x)
+2s^2(\boldsymbol n\cdot\boldsymbol x)N.
$$
$c^2-s^2=\cos\theta$、$2cs=\sin\theta$、$2s^2=1-\cos\theta$ を代入し、模型の単射性を使えば結論です。

また $\boldsymbol x=\boldsymbol n$ なら右辺は $\boldsymbol n$ です。$\boldsymbol x\perp\boldsymbol n$ なら第三項が消え、$\boldsymbol x$ と $\boldsymbol n\times\boldsymbol x$ は等長で直交するので、向きを含めて角度 $\theta$ の回転となります。$\square$
<!-- proof-end -->

<a id="thm-lrep5-kernel-surjectivity"></a>
<!-- formal-statement-start -->
> **定理（像と核）**  
> 共役作用 $\Phi:SU(2)\to SO(3)$ は全射であり、その核は
>
$$
\ker\Phi=\{I_2,-I_2\}.
$$
>
> 従って任意の $R\in SO(3)$ はちょうど二つの元 $U,-U\in SU(2)$ を持ち上げに持つ。
<!-- formal-statement-end -->

**証明の見取り図。** 全射性は、三次元の向きを保つ直交変換が固定軸と回転角を持つことを示し、[軸角表示](#prop-lrep5-rodrigues)でその角度を作ることで得ます。核は、全てのPauli行列と可換な行列を直接解いて求めます。

<!-- proof-start -->
### 証明

**核。** $R_U=I_3$ なら $U\sigma_jU^\dagger=\sigma_j$ ($j=1,2,3$) なので、$U\sigma_j=\sigma_jU$ です。$\sigma_3=\operatorname{diag}(1,-1)$ と可換であるため、$U=\operatorname{diag}(a,d)$ の形に限られます。さらに
$$
U\sigma_1=\begin{pmatrix}0&a\\d&0\end{pmatrix},\qquad
\sigma_1U=\begin{pmatrix}0&d\\a&0\end{pmatrix}
$$
だから $a=d$、従って $U=aI_2$ です。$\det U=a^2=1$ より $a=\pm1$ です。逆に $\pm I_2$ は全行列と可換なので核に入ります。

**全射性。** 任意の $R\in SO(3)$ を取ります。実三次行列の特性多項式は奇数次なので、少なくとも一つ実固有値を持ちます。直交変換は長さを保つから、実固有値の候補は $+1$ または $-1$ に限られます。

実固有値が一つだけなら、残りの二つは非実の共役対です。直交行列の固有値の絶対値は1なので、その共役対の積は1です。三固有値の積も行列式に等しく1だから、実固有値は $+1$ です。

固有値が三つとも実数なら全て符号が $\pm1$ であり、その積は1です。三つとも $-1$ では積が $-1$ となるため、少なくとも一つは $+1$ です。いずれの場合も回転の固定軸が存在します。

その単位固有ベクトルを $\boldsymbol n$ とします。$R\boldsymbol n=\boldsymbol n$ であり、任意の $\boldsymbol x\perp\boldsymbol n$ について
$$
(R\boldsymbol x)\cdot\boldsymbol n
=\boldsymbol x\cdot R^{\mathsf T}\boldsymbol n
=\boldsymbol x\cdot\boldsymbol n=0
$$
なので垂直平面は不変です。固定軸上の固有値は1なので、$\det R=1$ よりこの平面への制限も行列式1の直交変換です。

平面内の単位ベクトル $\boldsymbol u$ を取り、$\boldsymbol v=\boldsymbol n\times\boldsymbol u$ と置きます。このとき $(\boldsymbol u,\boldsymbol v,\boldsymbol n)$ は右手系の正規直交基底です。制限行列の第一列を $(a,b)^{\mathsf T}$ とすると、直交性と行列式1から第二列は $(-b,a)^{\mathsf T}$ です。したがって
$$
R|_{\boldsymbol n^\perp}=
\begin{pmatrix}a&-b\\b&a\end{pmatrix},\qquad
a^2+b^2=1.
$$
よって $a=\cos\theta$、$b=\sin\theta$ となる実角 $\theta$ が存在し、
$$
R\boldsymbol u=\cos\theta\,\boldsymbol u+\sin\theta\,\boldsymbol v,\qquad
R\boldsymbol v=-\sin\theta\,\boldsymbol u+\cos\theta\,\boldsymbol v.
$$
[軸角表示](#prop-lrep5-rodrigues)で作った $R_{U(\boldsymbol n,\theta)}$ は、$\boldsymbol n,\boldsymbol u,\boldsymbol v$ の全てに同じ値を与えるため、$R=R_{U(\boldsymbol n,\theta)}$ です。

最後に $\Phi(V)=\Phi(U)$ なら $\Phi(U^{-1}V)=I_3$ です。核の結果より $V=U$ または $V=-U$ となり、両者は異なります。$\square$
<!-- proof-end -->

核が二元であることは、単に「二対一」と言うだけの事実ではありません。**被覆**と呼ぶには各回転の近くで二つの枝を連続かつ滑らかに選べる必要があります。

## 4. なぜ二重被覆と呼べるのか

[LREP3で導入した被覆写像](../LREP3/index.md#def-lrep3-descent)は、底空間の十分小さい近傍の逆像が、互いに交わらない複数の開集合に分かれ、それぞれが底空間の近傍へ同相に写るものです。今回は二枚の局所的な枝が存在することを証明します。

<a id="thm-lrep5-double-cover"></a>
<!-- formal-statement-start -->
> **定理（SU(2)からSO(3)への二重被覆）**  
> $\Phi:SU(2)\to SO(3)$ を $X(R_U\boldsymbol x)=UX(\boldsymbol x)U^\dagger$ で定める写像とする。$\Phi$ は滑らかな全射 Lie 群準同型で、任意の $R\in SO(3)$ の十分小さい開近傍 $V$ は
>
$$
\Phi^{-1}(V)=V_+\sqcup V_-
$$
>
> と二つの開集合に分かれ、各制限 $\Phi|_{V_\pm}:V_\pm\to V$ は微分同相である。従って $\Phi$ は二重被覆である。
<!-- formal-statement-end -->

**証明の見取り図。** [像と核](#thm-lrep5-kernel-surjectivity)から逆像は二元です。単位元での微分が同型であることを外積で検査し、局所逆写像を作ります。コンパクト性により、その二つ以外から突然近づいてくる枝がないことも確かめます。

<!-- proof-start -->
### 証明

[SU(2)のLie環の具体形](../../LIE/LIE3/index.md#thm-lie3-unitary)より、単位元での接空間は反エルミートかつ跡零の行列です。その任意の元を、$\boldsymbol a\in\mathbb R^3$ によって
$$
A=-\frac i2X(\boldsymbol a)
$$
と一意に表せます。

$\boldsymbol x$ を固定して $U(t)=e^{tA}$ と動かします。接写像 $d\Phi_{I_2}(A)$ は、曲線 $\Phi(U(t))=R_{U(t)}$ を実変数 $t$ で微分し、$t=0$ で評価したものです。このとき
$$
e^{tA}=I_2+tA+O(t^2),\qquad
e^{-tA}=I_2-tA+O(t^2)
$$
なので、積の一次項は $AX-XA$ です。これを模型 $X$ で表すと
$$
\begin{aligned}
X\left(\left.\frac{d}{dt}\right|_{t=0}R_{U(t)}\boldsymbol x\right)
&=\left.\frac{d}{dt}\right|_{t=0}
e^{tA}X(\boldsymbol x)e^{-tA}\\
&=[A,X(\boldsymbol x)]\\
&=-\frac i2[X(\boldsymbol a),X(\boldsymbol x)]\\
&=X(\boldsymbol a\times\boldsymbol x),
\end{aligned}
$$
最後は[積公式](#lem-lrep5-pauli-product)です。したがって微分 $d\Phi_{I_2}$ は、$\boldsymbol a$ を実線形作用素 $\boldsymbol x\mapsto\boldsymbol a\times\boldsymbol x$ に移します。その表示行列は
$$
[\boldsymbol a]_\times=
\begin{pmatrix}0&-a_3&a_2\\a_3&0&-a_1\\-a_2&a_1&0\end{pmatrix}.
$$
標準基底の像 $\boldsymbol a\times\boldsymbol e_j$ を第 $j$ 列へ並べたものが、この行列です。[特殊直交群のLie環](../../LIE/LIE3/index.md#thm-lie3-orthogonal)より、余域 $T_{I_3}SO(3)=\mathfrak{so}(3)$ は反対称行列全体です。

上の行列が零なら、第二列と第三列から $a_1=a_2=a_3=0$ となります。したがって微分の核は零です。定義域 $\mathfrak{su}(2)$ と余域 $\mathfrak{so}(3)$ はともに実次元3なので、この単射は全射でもあり、微分は同型です。

逆関数定理を $I_2$ で使うと、その近傍 $W_+$ が単位回転の近傍へ微分同相に写ります。$W_+$ を小さくして $W_+\cap(-W_+)=\varnothing$ とできます。$W_-=-W_+$ とすると、[核の結果](#thm-lrep5-kernel-surjectivity)から両者の像は同じで、各制限は同じ近傍に対して微分同相です。

この二つ以外の逆像が残らないよう、像の近傍をさらに縮めます。どれほど小さくしても二つの枝の外から単位回転へ写る点があると仮定しましょう。すると次の条件を満たす列を選べます。
$$
\Phi(U_k)\longrightarrow I_3,\qquad
U_k\notin W_+\cup W_-.
$$
$SU(2)$ は実4次元の単位球面と同一視できるため、各元の実座標は区間 $[-1,1]$ に入ります。有界実数列の収束部分列を第一座標から第四座標へ順に選ぶと、共通の部分列が得られます。単位球面の方程式は連続なので、極限 $U_\infty$ も球面上、したがって $SU(2)$ の元です。

写像の連続性から極限は核に属します。
$$
\Phi(U_\infty)=I_3,\qquad
U_\infty\in\{I_2,-I_2\}.
$$
ところが両点は $W_+\cup W_-$ の内部にあります。外側の点列がそのいずれかへ収束するのは矛盾です。従って十分小さい開近傍 $V$ を選べば、その逆像は二つの集合
$$
W_+\cap\Phi^{-1}(V),\qquad W_-\cap\Phi^{-1}(V)
$$
だけからなり、それぞれ $V$ に微分同相に写ります。

任意の $R=\Phi(U_0)$ に対しては、左から $U_0$ を掛ける操作と左から $R$ を掛ける操作によって、単位元近傍の構成を移せます。[群準同型性](#thm-lrep5-orthogonal-homomorphism)により二枚とも同じ近傍へ微分同相に写ります。これで全ての $R$ で被覆条件が成立します。$\square$
<!-- proof-end -->

結論を群として表すと、$U$ と $-U$ を同一視した商群が $SO(3)$ に同型です。以下で $[U]$ は、二つの代表元からなる同値類 $\{U,-U\}$ を表します。ただし二つの群の元を同一視する操作と、二成分複素ベクトルに作用させる操作は区別しなければなりません。

<a id="cor-lrep5-quotient"></a>
<!-- formal-statement-start -->
> **系（回転群の商表示）**  
> 群 $SU(2)$ の中心部分群 $\{I_2,-I_2\}$ による商群は
>
$$
SU(2)/\{I_2,-I_2\}\cong SO(3)
$$
>
> である。この同型は $[U]\mapsto R_U$ で与えられる。
<!-- formal-statement-end -->

[核と全射性](#thm-lrep5-kernel-surjectivity)を使えば、代表元を $-U$ に替えても $R_U$ は同じです。また $R_{UV}=R_UR_V$ で積を保ち、一対一かつ全射です。局所的な滑らかさは[二重被覆](#thm-lrep5-double-cover)で確認済みです。

## 5. 一周の回転はどちらの群元か

$\boldsymbol n$ を固定したまま角度を増やします。$SO(3)$ 側の回転は $2\pi$ ごとに元へ戻ります。しかし $SU(2)$ 側では式に半角があるため、元へ戻るのは $4\pi$ のときです。

<a id="prop-lrep5-two-pi"></a>
<!-- formal-statement-start -->
> **命題（2π回転と表現の降下）**  
> 単位軸 $\boldsymbol n$ に沿う $SU(2)$ の経路 $U(\boldsymbol n,\theta)=\exp(-i\theta X(\boldsymbol n)/2)$ は
>
$$
U(\boldsymbol n,0)=I_2,\quad
U(\boldsymbol n,2\pi)=-I_2,\quad
U(\boldsymbol n,4\pi)=I_2.
$$
>
> 一方 $R_{U(\boldsymbol n,2\pi)}=I_3$ である。$SU(2)$ の $\mathbb C^2$ 上の標準表現 $D(U)=U$ は $SO(3)$ の通常の線形表現に降下せず、三次元の共役表現 $U\mapsto R_U$ は降下する。
<!-- formal-statement-end -->

**証明の見取り図。** 半角の三角関数へ $0,2\pi,4\pi$ を代入し、核の二元が $\mathbb C^2$ と $\mathbb R^3$ にどう作用するかを比べます。

<!-- proof-start -->
### 証明

[指数の軸角表示](#prop-lrep5-rodrigues)より $U(\boldsymbol n,\theta)=\cos(\theta/2)I_2-i\sin(\theta/2)X(\boldsymbol n)$ です。$\theta=0,2\pi,4\pi$ を代入すると主張の三式です。$R_{-I_2}=I_3$ は[核の計算](#thm-lrep5-kernel-surjectivity)から従います。

降下の必要条件を直接確かめます。もし $SO(3)$ の表現 $d$ が存在して $D=d\circ\Phi$ なら、$-I_2$ について $D(-I_2)=d(I_3)=I_2$ であるはずです。しかし標準表現では $D(-I_2)=-I_2$ なので矛盾します。一方、三次元表現 $R$ は $\Phi(U)=R_U$ そのもので、$\Phi(U)=\Phi(-U)$ ですから $SO(3)$ の恒等表現 $d(R)=R$ を経由します。$\square$
<!-- proof-end -->

これは[LREP3の被覆核による降下判定](../LREP3/index.md#thm-lrep3-descent-criterion)を、具体的な二元の核で検算したものです。二成分のベクトルを $2\pi$ 回すと符号が変わりますが、三次元の位置ベクトルやその回転行列は元へ戻ります。次講以降では、どの有限次元 $SU(2)$ 表現がこの核を自明に作用させるかを調べます。

## 6. 演習

### Level A

<a id="ex-lrep5-a01"></a>
#### LREP5-A01 Pauli行列から長さを復元する
- Level: A

$\boldsymbol x=(2,-1,2)$ について $X(\boldsymbol x)$、$X(\boldsymbol x)^2$、$\det X(\boldsymbol x)$ を直接計算し、長さの二乗との関係を確かめよ。

<!-- solution-start -->
**詳細解答。** [Pauli行列模型](#def-lrep5-pauli-model)に $x_1=2,x_2=-1,x_3=2$ を代入すると
$$
X=\begin{pmatrix}2&2+i\\2-i&-2\end{pmatrix}.
$$
行列積の $(1,1)$ 成分は $2^2+(2+i)(2-i)=4+5=9$、$(1,2)$ 成分は $2(2+i)+(2+i)(-2)=0$ です。$(2,1)$ も零で、$(2,2)$ は $(2-i)(2+i)+(-2)^2=9$ なので
$$
X^2=\begin{pmatrix}9&0\\0&9\end{pmatrix}=9I_2.
$$
また行列式は $2(-2)-(2+i)(2-i)=-4-5=-9$ です。実ベクトルの長さは $\|\boldsymbol x\|^2=4+1+4=9$ なので、[積公式](#lem-lrep5-pauli-product)の二乗公式と、[Pauli模型の行列式の計算](#def-lrep5-pauli-model)で得た $\det X=-\|\boldsymbol x\|^2$ の両方に一致します。
<!-- solution-end -->

<a id="ex-lrep5-a02"></a>
#### LREP5-A02 z軸回りの90度
- Level: A

$U=\operatorname{diag}(e^{-i\pi/4},e^{i\pi/4})$ が $SU(2)$ に属すことを確かめ、$R_U$ が $\boldsymbol e_1$ と $\boldsymbol e_2$ に及ぼす作用を求めよ。

<!-- solution-start -->
**詳細解答。** $U^\dagger U=\operatorname{diag}(1,1)=I_2$、$\det U=e^{-i\pi/4}e^{i\pi/4}=1$ なので $U\in SU(2)$ です。対角行列による共役を[定義の具体例](#def-lrep5-conjugation-map)と同じように行うと
$$
U\sigma_1U^\dagger
=\begin{pmatrix}0&e^{-i\pi/2}\\e^{i\pi/2}&0\end{pmatrix}
=\begin{pmatrix}0&-i\\i&0\end{pmatrix}=\sigma_2,
$$
また
$$
U\sigma_2U^\dagger
=\begin{pmatrix}0&-i e^{-i\pi/2}\\i e^{i\pi/2}&0\end{pmatrix}
=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}=-\sigma_1.
$$
模型の単射性から $R_U\boldsymbol e_1=\boldsymbol e_2$、$R_U\boldsymbol e_2=-\boldsymbol e_1$。従って $xy$ 平面で正の90度回転です。
<!-- solution-end -->

<a id="ex-lrep5-a03"></a>
#### LREP5-A03 核の二元が見えない理由
- Level: A

$U\in SU(2)$、$\boldsymbol x\in\mathbb R^3$ とする。$R_{-U}=R_U$ を行列積で示し、$U\ne-U$ であることを確認せよ。

<!-- solution-start -->
**詳細解答。** $-U$ もユニタリで、$\det(-U)=(-1)^2\det U=1$ なので $SU(2)$ に属します。任意の $X=X(\boldsymbol x)$ について
$$
(-U)X(-U)^\dagger=(-U)X(-U^\dagger)=UXU^\dagger.
$$
[Pauli模型の単射性](#def-lrep5-pauli-model)から $R_{-U}\boldsymbol x=R_U\boldsymbol x$ であり、任意の $\boldsymbol x$ に対する作用が等しいので $R_{-U}=R_U$ です。もし $U=-U$ なら $2U=0$ となり、可逆な $U$ に矛盾します。
<!-- solution-end -->

<a id="ex-lrep5-a04"></a>
#### LREP5-A04 角度を倍にするとどうなるか
- Level: A

単位 $\boldsymbol n$ に対し $U(\boldsymbol n,\pi)$、$U(\boldsymbol n,2\pi)$、$U(\boldsymbol n,4\pi)$ を求め、$\pi$ 回転に対応する $SU(2)$ 元の二乗が何かを調べよ。

<!-- solution-start -->
**詳細解答。** $N=X(\boldsymbol n)$ で $N^2=I_2$ です。[軸角表示と三次元回転](#prop-lrep5-rodrigues)を使います。そこで示した指数表示に角度を代入すると
$$
\begin{aligned}
U(\boldsymbol n,\pi)&=\cos(\pi/2)I_2-i\sin(\pi/2)N=-iN,\\
U(\boldsymbol n,2\pi)&=\cos\pi\,I_2-i\sin\pi\,N=-I_2,\\
U(\boldsymbol n,4\pi)&=\cos2\pi\,I_2-i\sin2\pi\,N=I_2.
\end{aligned}
$$
そして $(-iN)^2=(-i)^2N^2=-I_2$ です。三次元で180度回転を二回すると恒等回転ですが、その持ち上げの二乗は核の非自明な元になります。
<!-- solution-end -->

### Level B

<a id="ex-lrep5-b01"></a>
#### LREP5-B01 軸角公式を直交分解から再構成する
- Level: B

$U(\boldsymbol n,\theta)=\cos(\theta/2)I_2-i\sin(\theta/2)X(\boldsymbol n)$ とし、$\|\boldsymbol n\|=1$ とする。任意の $\boldsymbol x$ を $\boldsymbol x_\parallel=(\boldsymbol n\cdot\boldsymbol x)\boldsymbol n$、$\boldsymbol x_\perp=\boldsymbol x-\boldsymbol x_\parallel$ に分け、共役で平行成分が固定され垂直成分が角度 $\theta$ 回ることを証明せよ。

<!-- solution-start -->
**詳細解答。** まず $N=X(\boldsymbol n)$、$\alpha=\boldsymbol n\cdot\boldsymbol x$、$c=\cos(\theta/2)$、$s=\sin(\theta/2)$ と置きます。平行成分は $X(\boldsymbol x_\parallel)=\alpha N$ です。

[Pauli行列の積公式](#lem-lrep5-pauli-product)から $N^2=I_2$ です。したがって $U=cI_2-isN$ は $N$ と可換で、ユニタリ性から
$$
U(\alpha N)U^\dagger
=\alpha N(UU^\dagger)
=\alpha N
$$
となります。共役は平行成分を固定します。

垂直成分には $\boldsymbol n\cdot\boldsymbol x_\perp=0$ です。$Y=X(\boldsymbol x_\perp)$ とすると
$$
NY+YN=2(\boldsymbol n\cdot\boldsymbol x_\perp)I_2=0,\qquad
NYN=-Y.
$$
また $NY-YN=2iX(\boldsymbol n\times\boldsymbol x_\perp)$ です。先に定めた $c,s$ に対して
$$
\begin{aligned}
(cI_2-isN)Y(cI_2+isN)
&=c^2Y+ics(YN-NY)+s^2NYN\\
&=(c^2-s^2)Y+2csX(\boldsymbol n\times\boldsymbol x_\perp)\\
&=X\{\cos\theta\,\boldsymbol x_\perp+\sin\theta(\boldsymbol n\times\boldsymbol x_\perp)\}.
\end{aligned}
$$
外積は $\boldsymbol x_\perp$ に垂直で同じ長さを持つため、これは $\boldsymbol n^\perp$ で角度 $\theta$ の回転です。平行成分を加えると[軸角公式](#prop-lrep5-rodrigues)を復元できます。
<!-- solution-end -->

<a id="ex-lrep5-b02"></a>
#### LREP5-B02 微分とLie環の括弧
- Level: B

$A_j=-i\sigma_j/2$ ($j=1,2,3$) を $SU(2)$ のLie環の基底とする。交換子 $[A_1,A_2]$ を求め、$d\Phi_{I_2}(A_j)\boldsymbol x=\boldsymbol e_j\times\boldsymbol x$ が括弧を保つことを、$j=1,k=2$ について行列で確かめよ。

<!-- solution-start -->
**詳細解答。** [Pauli行列の積公式](#lem-lrep5-pauli-product)から $[\sigma_1,\sigma_2]=2i\sigma_3$ です。従って
$$
[A_1,A_2]=(-i/2)^2[\sigma_1,\sigma_2]
=-\frac14(2i\sigma_3)=-\frac i2\sigma_3=A_3.
$$
[二重被覆定理の微分計算](#thm-lrep5-double-cover)によれば $d\Phi_{I_2}(A_j)=[\boldsymbol e_j]_\times$ です。具体的に
$$
J_1=\begin{pmatrix}0&0&0\\0&0&-1\\0&1&0\end{pmatrix},\quad
J_2=\begin{pmatrix}0&0&1\\0&0&0\\-1&0&0\end{pmatrix},\quad
J_3=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}.
$$
行列積を計算すると
$$
J_1J_2=\begin{pmatrix}0&0&0\\1&0&0\\0&0&0\end{pmatrix},\qquad
J_2J_1=\begin{pmatrix}0&1&0\\0&0&0\\0&0&0\end{pmatrix}.
$$
よって $[J_1,J_2]=J_3=d\Phi_{I_2}([A_1,A_2])$ です。これは[LREP3で証明した微分の括弧保存](../LREP3/index.md#thm-lrep3-differentiation)の具体例です。
<!-- solution-end -->

<a id="ex-lrep5-b03"></a>
#### LREP5-B03 標準表現とテンソル二乗の降下
- Level: B

$SU(2)$ の標準表現 $D(U)=U$ を $\mathbb C^2$ 上に取る。$D$ は $SO(3)$ に降下しないが、$\mathbb C^2\otimes\mathbb C^2$ 上の $D\otimes D$ は降下することを、核での作用と群の積から説明せよ。

<!-- solution-start -->
**詳細解答。** [被覆の核](#thm-lrep5-kernel-surjectivity)は $K=\{\pm I_2\}$ です。標準表現では $D(-I_2)=-I_2\ne I_2$ なので、同じ回転を表す $U,-U$ の作用が一致せず降下しません。

一方、[テンソル積表現の群法則と次元](../LREP4/index.md#thm-lrep4-tensor-representation)より $D\otimes D$ は四次元複素ベクトル空間上の表現です。核の非自明元の作用を単純テンソルで計算すると
$$
(D\otimes D)(-I_2)(v\otimes w)
=(-v)\otimes(-w)=v\otimes w.
$$
単純テンソルが全空間を張るので $(D\otimes D)(-I_2)=I_4$ です。従って $R\in SO(3)$ の持ち上げ $U$ を選んで $d(R)=U\otimes U$ と置けば、$-U$ を選んでも
$$
(-U)\otimes(-U)=U\otimes U
$$
で well-defined です。積について $d(R_1R_2)=(U_1U_2)\otimes(U_1U_2)=d(R_1)d(R_2)$ が成り立ちます。[二重被覆の局所逆](#thm-lrep5-double-cover)を使えば滑らかさも分かります。
<!-- solution-end -->

<a id="ex-lrep5-b04"></a>
#### LREP5-B04 向きを失うと何が壊れるか
- Level: B

$S=\operatorname{diag}(1,1,-1)$ とする。$S$ は長さを保つが、$S=R_U$ となる $U\in SU(2)$ は存在しないことを示せ。さらに、[全射性の証明](#thm-lrep5-kernel-surjectivity)で向き保存がどこに必要だったかを説明せよ。

<!-- solution-start -->
**詳細解答。** $S^{\mathsf T}S=I_3$ だから長さを保ちますが、$\det S=1\cdot1\cdot(-1)=-1$ です。一方、[共役作用の定理](#thm-lrep5-orthogonal-homomorphism)は全ての $U\in SU(2)$ に対し $\det R_U=+1$ と述べます。従って $S=R_U$ は不可能です。

全射性の証明では $R$ の固有値に $+1$ があることを $\det R=+1$ から導き、その固有ベクトルを回転軸にしました。$S$ には確かに $+1$ 固有ベクトルが二本ありますが、その軸に直交する平面の行列式は $-1$ となり、平面上の変換は反射を含みます。従って「軸を固定して垂直平面を角度だけ回す」という[軸角公式](#prop-lrep5-rodrigues)の段階が壊れます。長さ保存だけでは $SO(3)$ の全射性と同じ結論は言えません。
<!-- solution-end -->

### Level C

<a id="ex-lrep5-c01"></a>
#### LREP5-C01 120度回転・二重被覆・不変交代形式
- Level: C

$N=(\sigma_1+\sigma_2+\sigma_3)/\sqrt3$、$U=\tfrac12I_2-\tfrac{i\sqrt3}{2}N$ とする。

1. $U\in SU(2)$ を示し、$\Phi(U)$ の $\boldsymbol e_1,\boldsymbol e_2,\boldsymbol e_3$ への作用を求めよ。
2. $U^3$ と $\Phi(U)^3$ を求め、標準表現とそのテンソル二乗の降下を判定せよ。
3. $w=e_1\otimes e_2-e_2\otimes e_1\in\mathbb C^2\otimes\mathbb C^2$ が $U\otimes U$ で固定されることを、$U$ の成分を用いて示せ。

<!-- solution-start -->
**詳細解答。**

**設問1。** $\boldsymbol n=(1,1,1)/\sqrt3$ は単位ベクトルで、[二乗公式](#lem-lrep5-pauli-product)より $N^2=I_2$ です。$U=\cos(\pi/3)I_2-i\sin(\pi/3)N=U(\boldsymbol n,2\pi/3)$ なので、固有値は $e^{\pm i\pi/3}$、従って $U^\dagger U=I_2$ かつ $\det U=1$ です。

[軸角公式](#prop-lrep5-rodrigues)へ $\theta=2\pi/3$、$\cos\theta=-1/2$、$\sin\theta=\sqrt3/2$、$1-\cos\theta=3/2$ を代入します。例えば $\boldsymbol x=\boldsymbol e_1$ なら
$$
\boldsymbol n\times\boldsymbol e_1
=(0,1/\sqrt3,-1/\sqrt3),\qquad
(\boldsymbol n\cdot\boldsymbol e_1)\boldsymbol n
=(1,1,1)/3.
$$
これを用いると
$$
R_U\boldsymbol e_1=(-1/2,0,0)+(0,1/2,-1/2)+(1/2,1/2,1/2)
=\boldsymbol e_2.
$$
同じ代入で
$$
\begin{aligned}
R_U\boldsymbol e_2&=(0,-1/2,0)+(-1/2,0,1/2)+(1/2,1/2,1/2)=\boldsymbol e_3,\\
R_U\boldsymbol e_3&=(0,0,-1/2)+(1/2,-1/2,0)+(1/2,1/2,1/2)=\boldsymbol e_1.
\end{aligned}
$$
従って $R_U$ は三つの座標軸を巡回させる120度回転です。

**設問2。** 同じ $N$ で指数を三回掛けると
$$
U^3=\exp(-i(3\cdot2\pi/3)N/2)=\exp(-i\pi N)
=\cos\pi\,I_2-i\sin\pi\,N=-I_2.
$$
[群準同型性](#thm-lrep5-orthogonal-homomorphism)から $R_U^3=R_{U^3}=R_{-I_2}=I_3$ です。標準表現では核元 $-I_2$ が $-I_2$ として作用し、降下しません。テンソル二乗では $(-I_2)\otimes(-I_2)=I_4$ となり、[B03で示した降下](#ex-lrep5-b03)が可能です。

**設問3。** 一般の $2\times2$ 行列を $U=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と置きます。$Ue_1=ae_1+ce_2$、$Ue_2=be_1+de_2$ だから、[表現のテンソル積](../LREP4/index.md#def-lrep4-tensor-product)の定義を用いて
$$
\begin{aligned}
(U\otimes U)w
&=(ae_1+ce_2)\otimes(be_1+de_2)\\
&\quad-(be_1+de_2)\otimes(ae_1+ce_2)\\
&=(ad-bc)(e_1\otimes e_2-e_2\otimes e_1)\\
&=(\det U)w=w.
\end{aligned}
$$
最後に $\det U=1$ を使いました。この反対称直線の不変性は、[LREP4の二次元交代形式と行列式](../LREP4/index.md#prop-lrep4-epsilon)とも整合します。$\square$
<!-- solution-end -->

## 7. まとめと次講

実三次元の回転は、二次元複素行列の共役で具体的に作れました。$SU(2)$ の二元 $U,-U$ が同じ回転を生み、局所的に二枚へ分かれるので $SU(2)\to SO(3)$ は二重被覆です。回転そのものは $2\pi$ で戻りますが、二成分複素ベクトルへの作用は $4\pi$ で初めて戻ります。

次の LREP6 では、この二成分の標準表現だけでなく **全ての有限次元複素既約 $SU(2)$ 表現** を構成します。そこで核の $-I_2$ がどう作用するかを計算し、どの表現が $SO(3)$ へ降下するかを分類します。
