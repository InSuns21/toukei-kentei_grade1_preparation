# LREP9 Lorentz Lie環の回転とboost

## 1. 回転だけでは時空の対称性を記述できない

[角運動量の交換関係](../LREP7/index.md#lem-lrep7-commutators)では、空間の回転を三つの生成子で記述しました。ところが異なる速度の慣性系を結ぶには、時間と空間を混ぜる **boost（速度変換）** も必要です。回転とboostを一緒に微小変換として扱うと、両者を続けた際に何が生じるでしょうか。

本章では、実四次元ベクトル空間 $V=\mathbb R^{1,3}$ の列ベクトルを $x=(x^0,x^1,x^2,x^3)^{\mathsf T}=(ct,x,y,z)^{\mathsf T}$ と書きます。[Minkowski計量](../../../物理系/SREL/SREL2/index.md#def-srel2-minkowski-metric)の行列は

$$
\eta=\operatorname{diag}(-1,1,1,1),\qquad
g(u,v)=u^{\mathsf T}\eta v
$$

です。行列は左から列ベクトルに**能動的**に作用させます。時間・空間の添字は $\mu,\nu,\rho,\sigma=0,1,2,3$、空間添字は $i,j,k=1,2,3$。繰り返された添字の総和は明記しない限り取らず、$\varepsilon_{ijk}$ は $\varepsilon_{123}=1$ の完全反対称記号とします。

変換の大小にかかわらず、保存したい量は $g(x,x)$ です。したがって、まず計量を保存する行列群を定めます。

<a id="def-lrep9-lorentz-group"></a>

<!-- formal-statement-start -->
> **定義（Lorentz群と単位元成分）**  
> $\eta=\operatorname{diag}(-1,1,1,1)$ とするとき、実線形同型全体のうち
>
$$
O(1,3)=\{\Lambda\in GL_4(\mathbb R)\mid
\Lambda^{\mathsf T}\eta\Lambda=\eta\}
$$
>
> を Lorentz群と呼ぶ。その単位行列 $I_4$ を含む連結成分を $SO^+(1,3)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep9-lorentz-group -->
**定義の確認。** $I_4^{\mathsf T}\eta I_4=\eta$ であるから $I_4\in O(1,3)$ です。空間反転 $P=\operatorname{diag}(1,-1,-1,-1)$ についても $P^{\mathsf T}\eta P=\eta$ ですが、$\det P=-1$。他方 $I_4$ の行列式は $1$ です。$O(1,3)$ の行列式は $\pm1$ であり、連続曲線上で符号は変わらないため、$P$ は $I_4$ の成分に属しません。このように、計量保存と単位元成分への所属を区別します。
<!-- definition-example-end -->

## 2. 計量保存を微分して六つの方向を取り出す

群の曲線 $\Lambda(t)$ が $I_4$ を通るとき、初速度 $X=\Lambda'(0)$ がどの行列を取り得るかを考えます。[群の微分とLie環](../../LIE/LIE1/index.md#def-lie1-lie-algebra)に従い、行列Lie群の括弧は $[X,Y]=XY-YX$ です。

<a id="thm-lrep9-lie-algebra"></a>

<!-- formal-statement-start -->
> **定理（Lorentz Lie環の行列条件）**  
> $G=SO^+(1,3)$ とし、$\eta=\operatorname{diag}(-1,1,1,1)$ とする。$G$ の単位元での実Lie環は
>
$$
\mathfrak{so}(1,3)
=\{X\in M_4(\mathbb R)\mid X^{\mathsf T}\eta+\eta X=0\}
$$
>
> であり、実ベクトル空間として次元は $6$ である。括弧は行列交換子である。
<!-- formal-statement-end -->

**証明の見取り図。** 計量保存式を $t=0$ で微分して必要条件を得ます。逆に条件を満たす $X$ を指数関数に入れると、計量保存式がすべての $t$ で成立します。最後に $\eta X$ が反対称行列であることから次元を数えます。

<!-- proof-start -->
### 証明

$\Lambda(0)=I_4$、$\Lambda'(0)=X$、$\Lambda(t)^{\mathsf T}\eta\Lambda(t)=\eta$ とすると、積の微分則で

$$
\left.\frac{d}{dt}\right|_{0}
\bigl(\Lambda(t)^{\mathsf T}\eta\Lambda(t)\bigr)
=X^{\mathsf T}\eta+\eta X=0
$$

です。逆に $X^{\mathsf T}\eta+\eta X=0$ なら、$F(t)=(e^{tX})^{\mathsf T}\eta e^{tX}$ について

$$
F'(t)=(e^{tX})^{\mathsf T}
(X^{\mathsf T}\eta+\eta X)e^{tX}=0,\qquad F(0)=\eta.
$$

ゆえに $e^{tX}\in O(1,3)$ です。$t\mapsto e^{tX}$ は $I_4$ からの連続な道なので、その像は $SO^+(1,3)$ にあります。[行列指数による1パラメータ部分群](../../LIE/LIE2/index.md#thm-lie2-one-parameter-subgroup)の定義とも一致します。

$\eta^{\mathsf T}=\eta$ だから条件は $(\eta X)^{\mathsf T}=-\eta X$ と同値です。$\eta$ は可逆であり、$X\mapsto \eta X$ は実線形同型です。$4$ 次反対称行列では対角成分が零、上三角の $\binom42=6$ 成分が自由に決まり、下三角はその負で決まります。したがって次元は $6$ です。

最後に条件を満たす $X,Y$ について

$$
\begin{aligned}
[X,Y]^{\mathsf T}\eta
&=(Y^{\mathsf T}X^{\mathsf T}-X^{\mathsf T}Y^{\mathsf T})\eta\\
&=-Y^{\mathsf T}\eta X+X^{\mathsf T}\eta Y\\
&=\eta YX-\eta XY=-\eta[X,Y]
\end{aligned}
$$

となり、交換子で閉じています。$\square$
<!-- proof-end -->

具体的な生成子を行列の各成分から作ります。$E_{\mu\nu}$ は第 $\mu$ 行・第 $\nu$ 列（行列番号は $0$ 始まり）だけが $1$ の $4\times4$ 行列です。

<a id="def-lrep9-rotation-boost"></a>

<!-- formal-statement-start -->
> **定義（回転生成子とboost生成子）**  
> $\eta=\operatorname{diag}(-1,1,1,1)$ とし、$E_{\mu\nu}$ を標準行列単位とする。$i=1,2,3$ に対し、実 $4\times4$ 行列
>
$$
\begin{aligned}
B_i&=E_{0i}+E_{i0},\\
R_1&=E_{32}-E_{23},\\
R_2&=E_{13}-E_{31},\\
R_3&=E_{21}-E_{12}
\end{aligned}
$$
>
> を、それぞれ $x^i$ 方向のboost生成子、$x^i$ 軸まわりの右手系回転生成子とする。$R_i,B_i$ は $\mathfrak{so}(1,3)$ の元である。
<!-- formal-statement-end -->

成分表示と条件の橋渡しを確認します。例えば $B_1$ は第 $0,1$ 成分と第 $1,0$ 成分が $1$ の行列なので、$\eta B_1=-E_{01}+E_{10}$ は反対称です。同様に $R_3$ は空間ブロックの反対称行列で、$\eta R_3=R_3$ も反対称です。他の四つも添字の置換で検証できます。六つはそれぞれ独立した行列成分を持つので、[六次元性](#thm-lrep9-lie-algebra)より基底を成します。

<!-- definition-example-start: def-lrep9-rotation-boost -->
**定義の確認：$x$ 方向のboostと $z$ 軸回転。**

$$
B_1=
\begin{pmatrix}
0&1&0&0\\1&0&0&0\\0&0&0&0\\0&0&0&0
\end{pmatrix},\qquad
R_3=
\begin{pmatrix}
0&0&0&0\\0&0&-1&0\\0&1&0&0\\0&0&0&0
\end{pmatrix}.
$$

両方とも $X^{\mathsf T}\eta+\eta X=0$ を満たします。前者は時間と $x$ を混ぜ、後者は $x,y$ のみを混ぜることが列・行を見れば分かります。
<!-- definition-example-end -->

### 有限変換を実際に作る

$B_1$ の $0,1$ ブロックは $\begin{psmallmatrix}0&1\\1&0\end{psmallmatrix}$ で、偶数乗が単位行列、奇数乗が元の行列です。指数級数の偶数次・奇数次を分けると

$$
e^{\chi B_1}=
\begin{pmatrix}
\cosh\chi&\sinh\chi&0&0\\
\sinh\chi&\cosh\chi&0&0\\
0&0&1&0\\0&0&0&1
\end{pmatrix}.
$$

実数 $\chi$ は無次元の**ラピディティ**です。$x=(1,0,0,0)^{\mathsf T}$ を $\chi>0$ で変換すると $(\cosh\chi,\sinh\chi,0,0)^{\mathsf T}$ になるので、これは能動的には正の $x$ 方向へのboostです。既存の[SREL2の受動的な座標変換](../../../物理系/SREL/SREL2/index.md#thm-srel2-interval-invariance)では $x'^0=\gamma(x^0-\beta x^1)$ と書くため、同じ物理状況の座標変換には逆行列 $e^{-\chi B_1}$ を使います（$\beta=\tanh\chi$）。

同じ級数計算で $R_3^2=-I$ が作用する $x,y$ ブロックには

$$
e^{\theta R_3}=
\begin{pmatrix}
1&0&0&0\\0&\cos\theta&-\sin\theta&0\\
0&\sin\theta&\cos\theta&0\\0&0&0&1
\end{pmatrix}
$$

が現れます。前者では双曲線関数、後者では三角関数になるのが計量の符号差の最初の現れです。

## 3. boost二回の交換子は回転になる

六つの生成子が作るLie環を計算しましょう。一般計算を一度行うと、27通りの組み合わせを暗記せずに済みます。

<a id="lem-lrep9-matrix-bracket"></a>

<!-- formal-statement-start -->
> **補題（計量付き生成子の交換式）**  
> $\eta=\operatorname{diag}(-1,1,1,1)$、$M_{\mu\nu}=E_{\mu\nu}\eta_{\nu\nu}-E_{\nu\mu}\eta_{\mu\mu}$（$M_{\nu\mu}=-M_{\mu\nu}$）とする。ただし $\mu\ne\nu$ とし、$M_{\mu\mu}=0$ と置く。このとき
>
$$
\begin{aligned}
[M_{\mu\nu},M_{\rho\sigma}]
={}&\eta_{\nu\rho}M_{\mu\sigma}
-\eta_{\mu\rho}M_{\nu\sigma}\\
&+\eta_{\mu\sigma}M_{\nu\rho}
-\eta_{\nu\sigma}M_{\mu\rho}.
\end{aligned}
$$
<!-- formal-statement-end -->

**証明の見取り図。** 行列単位の積 $E_{ab}E_{cd}=\delta_{bc}E_{ad}$ から展開し、$\eta$ が対角であることを使います。

<!-- proof-start -->
### 証明

$(M_{\mu\nu})^a{}_b=\delta^a_\mu\eta_{\nu b}-\delta^a_\nu\eta_{\mu b}$ と書けます。積の成分は

$$
\begin{aligned}
(M_{\mu\nu}M_{\rho\sigma})^a{}_b
={}&\delta^a_\mu(\eta_{\nu\rho}\eta_{\sigma b}
-\eta_{\nu\sigma}\eta_{\rho b})\\
&-\delta^a_\nu(\eta_{\mu\rho}\eta_{\sigma b}
-\eta_{\mu\sigma}\eta_{\rho b}).
\end{aligned}
$$

同じ式で $(\mu,\nu)$ と $(\rho,\sigma)$ を入れ替えて引き、$\delta^a_\alpha\eta_{\beta b}-\delta^a_\beta\eta_{\alpha b}=(M_{\alpha\beta})^a{}_b$ ごとに集めます。その結果は提示した四項です。成分ごとの等式なので行列等式が成立します。$\square$
<!-- proof-end -->

<a id="thm-lrep9-commutators"></a>

<!-- formal-statement-start -->
> **定理（Lorentz Lie環の回転・boost交換関係）**  
> $\eta=\operatorname{diag}(-1,1,1,1)$ の実Lie環 $\mathfrak{so}(1,3)$ に、[回転・boost生成子](#def-lrep9-rotation-boost) $R_i,B_i$ を取る。$\varepsilon_{123}=1$ の完全反対称記号を用いると、$1\le i,j\le3$ について
>
$$
\begin{aligned}
[R_i,R_j]&=\sum_{k=1}^3\varepsilon_{ijk}R_k,\\
[R_i,B_j]&=\sum_{k=1}^3\varepsilon_{ijk}B_k,\\
[B_i,B_j]&=-\sum_{k=1}^3\varepsilon_{ijk}R_k.
\end{aligned}
$$
<!-- formal-statement-end -->

**証明の見取り図。** $R_1=-M_{23}$、$R_2=-M_{31}$、$R_3=-M_{12}$ と $B_i=M_{0i}$ を[補題](#lem-lrep9-matrix-bracket)へ代入します。最後の負号だけが時間成分 $\eta_{00}=-1$ に由来します。

<!-- proof-start -->
### 証明

$[R_1,R_2]=[M_{23},M_{31}]$ に補題を代入すると $\eta_{33}M_{21}=-M_{12}=R_3$ です。また $[R_3,B_1]=[-M_{12},M_{01}]$ については

$$
[M_{12},M_{01}]=\eta_{11}M_{20}=-M_{02},
\qquad [R_3,B_1]=M_{02}=B_2.
$$

boostどうしでは

$$
[B_1,B_2]=[M_{01},M_{02}]
=-\eta_{00}M_{12}=M_{12}=-R_3.
$$

この三式の添字 $(1,2,3)$ を巡回置換すれば相異なる添字の全組について成立します。$[X,X]=0$ と $[X,Y]=-[Y,X]$ を使えば残りも含めて三つの一般式を得ます。$\square$
<!-- proof-end -->

同じ空間回転だけなら[角運動量の交換子](../LREP7/index.md#lem-lrep7-commutators)を回復しますが、boostどうしは閉じず、回転を作ることに注意してください。

### 物理で用いる $i$ 付き生成子

<a id="def-lrep9-physics-generators"></a>

<!-- formal-statement-start -->
> **定義（物理記法の生成子）**  
> $\mathfrak{so}(1,3)$ の上記の実 $4\times4$ 行列を複素行列として見て、
>
$$
J_i=iR_i,\qquad K_i=iB_i
$$
>
> と置く。群の能動作用は $e^{-i\theta J_i}=e^{\theta R_i}$ および $e^{-i\chi K_i}=e^{\chi B_i}$ と書ける。この $J_i,K_i$ は複素行列であり、実Lorentz Lie環の基底そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep9-physics-generators -->
**定義の確認。** $J_3=i(E_{21}-E_{12})$ は $J_3^\dagger=J_3$、$K_1=i(E_{01}+E_{10})$ は $K_1^\dagger=-K_1$ です。よってこの四元ベクトル表現でのboost生成子を自己共役演算子と見なすことはできません。
<!-- definition-example-end -->

[交換関係](#thm-lrep9-commutators)に $i^2=-1$ を代入すれば

$$
[J_i,J_j]=i\varepsilon_{ijk}J_k,\qquad
[J_i,K_j]=i\varepsilon_{ijk}K_k,\qquad
[K_i,K_j]=-i\varepsilon_{ijk}J_k
$$

です（ここだけ重複添字 $k$ を総和）。$J_i$ を扱う[前講までのSU(2)表現](../LREP7/index.md#def-lrep7-angular-momentum)ではユニタリ性から自己共役性が従いましたが、非コンパクトなLorentz群の有限次元四元ベクトル表現に同じ結論を移してはいけません。

## 4. 複素化すると回転とboostが二組へ分かれる

$\mathfrak{so}(1,3)$ は**実**六次元Lie環です。複素係数まで許すと、その複素化

$$
\mathfrak g_{\mathbb C}
=\mathfrak{so}(1,3)\otimes_{\mathbb R}\mathbb C
$$

は複素六次元になります。これは元の実Lie環を単に $\mathbb C$ 上の行列として見ることと異なり、実基底の六つを複素独立な基底として延長する操作です。

<a id="def-lrep9-chiral-split"></a>

<!-- formal-statement-start -->
> **定義（複素化した二組の生成子）**  
> 実Lie環 $\mathfrak{so}(1,3)$ の基底 $R_i,B_i$ を複素化した $\mathfrak g_{\mathbb C}$ において、$i=1,2,3$ ごとに
>
$$
A_i=\frac{R_i+iB_i}{2},\qquad
C_i=\frac{R_i-iB_i}{2}
$$
>
> と定める。逆に $R_i=A_i+C_i$、$B_i=-i(A_i-C_i)$ と復元できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep9-chiral-split -->
**定義の確認。** $A_1+C_1=R_1$、$A_1-C_1=iB_1$ なので二組は独立な情報を持ちます。さらに $A_i,C_i$ を元の実行列の複素線形結合として書いたため、複素共役作用 $\kappa$ は $\kappa(A_i)=C_i$、$\kappa(C_i)=A_i$ です。この対応は後で実構造を回復する条件になります。
<!-- definition-example-end -->

<a id="thm-lrep9-two-sl2"></a>

<!-- formal-statement-start -->
> **定理（複素化の二つの $\mathfrak{sl}_2$ への分解）**  
> $\mathfrak g_{\mathbb C}=\mathfrak{so}(1,3)\otimes_{\mathbb R}\mathbb C$ とし、$A_i,C_i$ を[上の定義](#def-lrep9-chiral-split)で取る。このとき
>
$$
\begin{aligned}
[A_i,A_j]&=\varepsilon_{ijk}A_k,&
[C_i,C_j]&=\varepsilon_{ijk}C_k,&
[A_i,C_j]&=0
\end{aligned}
$$
>
> が成立する（$k$ を総和）。複素Lie環として
>
$$
\mathfrak g_{\mathbb C}
\cong\mathfrak{sl}_2(\mathbb C)\oplus
\mathfrak{sl}_2(\mathbb C).
$$
>
> ただし、右辺の二因子は元の実Lie群の二つの独立な実部分群を意味しない。
<!-- formal-statement-end -->

**証明の見取り図。** [三種類の交換関係](#thm-lrep9-commutators)を代入して各括弧を計算します。それぞれの三次元部分環を[Pauli行列](../LREP5/index.md#lem-lrep5-pauli-product)で具体化し、次元と逆変換で直和を証明します。

<!-- proof-start -->
### 証明

$[R_i+iB_i,R_j+iB_j]$ を四つに分けると、[既出の交換式](#thm-lrep9-commutators)より

$$
\begin{aligned}
[R_i+iB_i,R_j+iB_j]
&=[R_i,R_j]+i[R_i,B_j]
+i[B_i,R_j]-[B_i,B_j]\\
&=\varepsilon_{ijk}(2R_k+2iB_k)
=4\varepsilon_{ijk}A_k.
\end{aligned}
$$

両辺を $4$ で割り $[A_i,A_j]=\varepsilon_{ijk}A_k$ を得ます。$i$ を $-i$ に置き換えると $C$ 側も同じです。混合項は

$$
\begin{aligned}
4[A_i,C_j]
&=[R_i+iB_i,R_j-iB_j]\\
&=\varepsilon_{ijk}(R_k-iB_k+iB_k-R_k)=0.
\end{aligned}
$$

$\sigma_i$ を[Pauli行列](../LREP5/index.md#def-lrep5-pauli-model)とし、$T_i=-i\sigma_i/2$ とすると

$$
[T_i,T_j]=-\frac14[\sigma_i,\sigma_j]
=-\frac i2\varepsilon_{ijk}\sigma_k
=\varepsilon_{ijk}T_k.
$$

$T_1,T_2,T_3$ はトレース零の複素 $2\times2$ 行列空間 $\mathfrak{sl}_2(\mathbb C)$ の複素基底です。したがって $A_i\mapsto(T_i,0)$、$C_i\mapsto(0,T_i)$ と定めた写像は各組の交換子を保ちます。$R_i=A_i+C_i$、$B_i=-i(A_i-C_i)$ から六つは複素基底なので、写像は全単射です。よって複素Lie環の同型が得られます。$\square$
<!-- proof-end -->

### 実Lie環はどう戻るか

複素化に付随する共役 $\kappa$ は実係数の $R_i,B_i$ を固定し、$i$ を $-i$ に変えます。$z_i,w_i\in\mathbb C$ とすると

$$
\kappa\left(\sum_i z_iA_i+w_iC_i\right)
=\sum_i\overline{z_i}C_i+\overline{w_i}A_i.
$$

したがって固定点条件は $w_i=\overline{z_i}$ です。$z_i=a_i-ib_i$（$a_i,b_i\in\mathbb R$）と書けば

$$
\sum_i(z_iA_i+\overline{z_i}C_i)
=\sum_i(a_iR_i+b_iB_i).
$$

これこそ元の**実六次元** $\mathfrak{so}(1,3)$ です。二つの $\mathfrak{sl}_2$ は複素化の中では別々ですが、実構造により交換される組です。次のLREP10ではこの区別を保って $SL(2,\mathbb C)$ の被覆作用へ進みます。

## 5. 直交するboostの順序が重要になる理由

正の小さい実数 $a,b$ に対し、$x,y$ 方向の能動boostを一つずつ適用してから逆向きに戻す群の交換子を考えます。

<a id="prop-lrep9-boost-loop"></a>

<!-- formal-statement-start -->
> **命題（微小boostループの回転）**  
> $B_1,B_2,R_3\in\mathfrak{so}(1,3)$ を[回転・boost生成子](#def-lrep9-rotation-boost)とする。実数 $a,b$ がともに零へ近づくとき、行列の任意の固定ノルムについて
>
$$
e^{aB_1}e^{bB_2}e^{-aB_1}e^{-bB_2}
=I_4-abR_3+O\bigl((|a|+|b|)^3\bigr)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 指数関数を二次まで展開すると、単独boostの一次・二次寄与が消え、異なる順序の積 $B_1B_2-B_2B_1$ だけが残ります。

<!-- proof-start -->
### 証明

行列指数のTaylor展開は $e^{aB_1}=I+aB_1+\tfrac12a^2B_1^2+O(a^3)$ です。まず $e^{aB_1}e^{bB_2}e^{-aB_1}$ を全次数二まで掛けると

$$
\begin{aligned}
e^{aB_1}e^{bB_2}e^{-aB_1}
&=I+bB_2+ab(B_1B_2-B_2B_1)
+\tfrac12b^2B_2^2\\
&\quad+O\bigl((|a|+|b|)^3\bigr).
\end{aligned}
$$

さらに $e^{-bB_2}=I-bB_2+\tfrac12b^2B_2^2+O(b^3)$ を右から掛けると、$bB_2$ と $b^2B_2^2$ の寄与は打ち消され、

$$
I+ab[B_1,B_2]+O\bigl((|a|+|b|)^3\bigr)
=I-abR_3+O\bigl((|a|+|b|)^3\bigr)
$$

です。最後は[boostの交換式](#thm-lrep9-commutators)を使いました。$\square$
<!-- proof-end -->

この微小な回転は、異なる方向のboostが非可換であることの直接の証拠です。有限変換の正確な回転角をこの二次近似だけから決めることはできません。物理でのThomas–Wigner回転を理解する出発点です。

## 6. 演習

### Level A

<a id="ex-lrep9-a01"></a>
#### LREP9-A01 Lie環の条件を行列で確認する
- Level: A

$\eta=\operatorname{diag}(-1,1,1,1)$ とする。$X=E_{01}+E_{10}$ と $D=E_{00}$ について $X^{\mathsf T}\eta+\eta X$ と $D^{\mathsf T}\eta+\eta D$ を求め、どちらが $\mathfrak{so}(1,3)$ に属するか判定せよ。

<!-- solution-start -->
**詳細解答。** [Lie環の行列条件](#thm-lrep9-lie-algebra)に代入します。$X^{\mathsf T}=X$、$\eta E_{01}=-E_{01}$、$\eta E_{10}=E_{10}$ より

$$
\eta X=-E_{01}+E_{10},\qquad
X^{\mathsf T}\eta=(\eta X)^{\mathsf T}=-E_{10}+E_{01}.
$$

和は零なので $X\in\mathfrak{so}(1,3)$。一方 $D^{\mathsf T}=D$、$\eta D=D\eta=-E_{00}$ から

$$
D^{\mathsf T}\eta+\eta D=-2E_{00}\ne0.
$$

よって $D$ は属しません。単位行列の一成分を変える「時間方向の拡大」は計量を保存しないという違いです。
<!-- solution-end -->

<a id="ex-lrep9-a02"></a>
#### LREP9-A02 boostの有限変換とノルム
- Level: A

$B_1=E_{01}+E_{10}$ と $\chi\in\mathbb R$ に対し、$e^{\chi B_1}(1,0,0,0)^{\mathsf T}$ を求め、そのMinkowskiノルムが $-1$ のままであることを示せ。

<!-- solution-start -->
**詳細解答。** $B_1e_0=e_1$、$B_1e_1=e_0$ より $B_1^{2n}e_0=e_0$、$B_1^{2n+1}e_0=e_1$。指数級数の偶数次・奇数次を分けて

$$
e^{\chi B_1}e_0
=\sum_{n=0}^\infty\frac{\chi^{2n}}{(2n)!}e_0+
\sum_{n=0}^\infty\frac{\chi^{2n+1}}{(2n+1)!}e_1
=(\cosh\chi,\sinh\chi,0,0)^{\mathsf T}.
$$

[Minkowski計量](../../../物理系/SREL/SREL2/index.md#def-srel2-minkowski-metric)で二乗すると $-\cosh^2\chi+\sinh^2\chi=-1$。従って保存されます。
<!-- solution-end -->

<a id="ex-lrep9-a03"></a>
#### LREP9-A03 回転の符号
- Level: A

$R_3=E_{21}-E_{12}$ とする。$R_3e_1$、$R_3e_2$ を計算し、$e^{(\pi/2)R_3}e_1$ を求めよ。ここで $e_1,e_2$ は座標の第 $1,2$ 基底ベクトルとする。

<!-- solution-start -->
**詳細解答。** 行列単位 $E_{\mu\nu}e_\rho=\delta_{\nu\rho}e_\mu$ から $R_3e_1=e_2$、$R_3e_2=-e_1$ です。従って $\operatorname{span}(e_1,e_2)$ 上で $R_3^2=-I$。偶数項と奇数項を分けて

$$
e^{\theta R_3}e_1=\cos\theta\,e_1+\sin\theta\,e_2.
$$

$\theta=\pi/2$ で $e_2$ です。正の角度で $x$ 軸から $y$ 軸へ移るので、右手系の符号とも一致します。
<!-- solution-end -->

<a id="ex-lrep9-a04"></a>
#### LREP9-A04 二つのboostの交換子
- Level: A

$B_1=E_{01}+E_{10}$、$B_2=E_{02}+E_{20}$ とする。$E_{ab}E_{cd}=\delta_{bc}E_{ad}$ を用い、$[B_1,B_2]$ を求めよ。

<!-- solution-start -->
**詳細解答。** 行列単位の積を四項ずつ展開すると

$$
B_1B_2=E_{10}E_{02}=E_{12},\qquad
B_2B_1=E_{20}E_{01}=E_{21}.
$$

他の積は添字が一致せず零です。よって

$$
[B_1,B_2]=E_{12}-E_{21}=-R_3.
$$

[回転生成子](#def-lrep9-rotation-boost)は $R_3=E_{21}-E_{12}$ なので最後の負号を確認できます。
<!-- solution-end -->

### Level B

<a id="ex-lrep9-b01"></a>
#### LREP9-B01 六自由度を全行列から復元する
- Level: B

実 $4\times4$ 行列 $X$ が $X^{\mathsf T}\eta+\eta X=0$ を満たすとする。$X$ の一般形を実数 $r_1,r_2,r_3,b_1,b_2,b_3$ で表し、$\sum_i(r_iR_i+b_iB_i)$ と一致することを示せ。

<!-- solution-start -->
**詳細解答。** $Y=\eta X$ と置くと、条件は $Y^{\mathsf T}=-Y$。したがって $Y_{00}=Y_{11}=Y_{22}=Y_{33}=0$ で、$Y_{0i}=-Y_{i0}$、$Y_{ij}=-Y_{ji}$。$\eta$ が第0行だけ符号を反転するので、$X_{0i}=X_{i0}=:b_i$、空間ブロックは反対称となります。その独立成分を $X_{32}=-X_{23}=:r_1$、$X_{13}=-X_{31}=:r_2$、$X_{21}=-X_{12}=:r_3$ と定めれば

$$
X=\begin{pmatrix}
0&b_1&b_2&b_3\\
b_1&0&-r_3&r_2\\
b_2&r_3&0&-r_1\\
b_3&-r_2&r_1&0
\end{pmatrix}.
$$

[六つの生成子の定義](#def-lrep9-rotation-boost)に代入すると $X=\sum_i(r_iR_i+b_iB_i)$ です。六つの係数は各独立成分から一意に復元されるので、基底であることも分かります。
<!-- solution-end -->

<a id="ex-lrep9-b02"></a>
#### LREP9-B02 微小boostループの二次項
- Level: B

$P=e^{aB_1}e^{bB_2}e^{-aB_1}e^{-bB_2}$ を、$a,b$ の総次数二まで求めよ。$P$ を $e_1$ に作用させたときの $e_2$ 成分を二次まで求め、順序を逆にしたループではどうなるかを述べよ。

<!-- solution-start -->
**詳細解答。** 各指数を二次で止めると、一次の $aB_1,-aB_1$ と $bB_2,-bB_2$ は相殺します。$a^2$ 項は $\tfrac12a^2B_1^2+\tfrac12a^2B_1^2-a^2B_1^2=0$、$b^2$ 項も同様に零です。交差項のみ

$$
ab(B_1B_2-B_2B_1)=ab[B_1,B_2]=-abR_3
$$

が残ります。[交換関係](#thm-lrep9-commutators)を用いて

$$
Pe_1=e_1-abR_3e_1+O((|a|+|b|)^3)
=e_1-ab e_2+O((|a|+|b|)^3).
$$

したがって $e_2$ 成分は二次で $-ab$。ループを $e^{bB_2}e^{aB_1}e^{-bB_2}e^{-aB_1}$ とすれば $[B_2,B_1]=+R_3$ になり、二次の符号が逆転します。
<!-- solution-end -->

<a id="ex-lrep9-b03"></a>
#### LREP9-B03 二組の交換関係を自分で導く
- Level: B

$A_i=(R_i+iB_i)/2$、$C_i=(R_i-iB_i)/2$ とする。$[A_1,A_2]$、$[A_1,C_2]$ を計算し、$Z=(2-i)A_1+(2+i)C_1$ が元の実Lie環に属することを示して $R_1,B_1$ で表せ。

<!-- solution-start -->
**詳細解答。** [回転・boostの交換関係](#thm-lrep9-commutators)より $[R_1,R_2]=R_3$、$[R_1,B_2]=B_3$、$[B_1,R_2]=B_3$、$[B_1,B_2]=-R_3$。これらを四項に分けて

$$
\begin{aligned}
4[A_1,A_2]&=R_3+iB_3+iB_3-(-R_3)
=2(R_3+iB_3)=4A_3,\\
4[A_1,C_2]&=R_3-iB_3+iB_3+(-R_3)=0.
\end{aligned}
$$

また [複素化の逆変換](#def-lrep9-chiral-split)を使うと

$$
Z=2(A_1+C_1)-i(A_1-C_1)=2R_1+B_1.
$$

係数がどちらも実数なので実Lie環の元です。複素共役で二組の係数が交換される条件 $(2+i)=\overline{(2-i)}$ からも同じ結論になります。
<!-- solution-end -->

<a id="ex-lrep9-b04"></a>
#### LREP9-B04 $i$ 付き生成子と正定値ユニタリ性
- Level: B

四元ベクトル表現で $J_3=iR_3$、$K_1=iB_1$ と置く。$[J_3,K_1]$ を計算し、$J_3^\dagger=J_3$、$K_1^\dagger=-K_1$ を確かめ、$e^{\chi B_1}$ が標準正定値内積に関して一般にはユニタリでない理由を示せ。

<!-- solution-start -->
**詳細解答。** [交換関係](#thm-lrep9-commutators)から $[R_3,B_1]=B_2$。$i^2=-1$ を掛けると

$$
[J_3,K_1]=-[R_3,B_1]=-B_2=iK_2.
$$

$R_3$ は実反対称行列なので $J_3^\dagger=\overline{iR_3}^{\mathsf T}=-i(-R_3)=J_3$ です。一方 $B_1$ は実対称なので $K_1^\dagger=-iB_1=-K_1$。実数 $\chi\ne0$ に対し

$$
\|e^{\chi B_1}e_0\|_{\mathbb C^4}^2
=\cosh^2\chi+\sinh^2\chi
=\cosh(2\chi)>1=\|e_0\|^2.
$$

したがって標準正定値内積を保存しません。保存するのは[不定なMinkowski計量](../../../物理系/SREL/SREL2/index.md#def-srel2-minkowski-metric)です。
<!-- solution-end -->

### Level C

<a id="ex-lrep9-c01"></a>
#### LREP9-C01 回転とboostを合成したLie環元を追う
- Level: C

$\eta=\operatorname{diag}(-1,1,1,1)$、$R_3=E_{21}-E_{12}$、$B_1=E_{01}+E_{10}$ とし、$a,b\in\mathbb R$ に対して $X=aR_3+bB_1$ と置く。次を示せ。

1. $X$ の $4\times4$ 行列を求め、$X^{\mathsf T}\eta+\eta X=0$ を直接確認せよ。
2. $[X,B_2]$ を $R_3,B_1$ で表せ。ただし $B_2=E_{02}+E_{20}$ とする。
3. $A_i=(R_i+iB_i)/2$、$C_i=(R_i-iB_i)/2$ に関して $X$ を分解し、実構造の固定点条件を確認せよ。
4. 任意の実数 $t$ に対し $e^{tX}$ がMinkowski計量を保存することを、微分方程式から示せ。

<!-- solution-start -->
**詳細解答。**

**設問1。** $R_3$ は $(1,2)$ 成分に $-1$、$(2,1)$ 成分に $1$、$B_1$ は $(0,1),(1,0)$ 成分に $1$ を持つので

$$
X=\begin{pmatrix}
0&b&0&0\\
b&0&-a&0\\
0&a&0&0\\
0&0&0&0
\end{pmatrix}.
$$

左から $\eta$ を掛けると

$$
\eta X=
\begin{pmatrix}
0&-b&0&0\\
b&0&-a&0\\
0&a&0&0\\
0&0&0&0
\end{pmatrix},
\quad
(\eta X)^{\mathsf T}=-\eta X.
$$

よって $X^{\mathsf T}\eta+\eta X=0$ です。[Lie環条件](#thm-lrep9-lie-algebra)を満たします。

**設問2。** 交換子の双線形性と[三種類の交換式](#thm-lrep9-commutators)から

$$
[X,B_2]=a[R_3,B_2]+b[B_1,B_2]
=-aB_1-bR_3,
$$

です。ここで $\varepsilon_{321}=-1$ なので $[R_3,B_2]=-B_1$、$\varepsilon_{123}=1$ なので $[B_1,B_2]=-R_3$ です。

**設問3。** [逆変換](#def-lrep9-chiral-split)で $R_3=A_3+C_3$、$B_1=-i(A_1-C_1)$。したがって

$$
X=(-ib)A_1+aA_3+(ib)C_1+aC_3.
$$

$A$ 側の係数 $(-ib,0,a)$ と $C$ 側の係数 $(ib,0,a)$ は共役の組です。よって[実構造の固定条件](#thm-lrep9-two-sl2)に合致します。

**設問4。** $G(t)=e^{tX}$ とすれば $G'(t)=XG(t)$。$F(t)=G(t)^{\mathsf T}\eta G(t)$ の微分は

$$
\begin{aligned}
F'(t)&=G(t)^{\mathsf T}X^{\mathsf T}\eta G(t)
+G(t)^{\mathsf T}\eta XG(t)\\
&=G(t)^{\mathsf T}(X^{\mathsf T}\eta+\eta X)G(t)=0.
\end{aligned}
$$

$F(0)=\eta$ だから $F(t)=\eta$。すべての $t$ に対し $e^{tX}\in SO^+(1,3)$ であり、単位元と連続な曲線でつながっています。
<!-- solution-end -->

## 7. まとめと次講

計量保存式の微分から実六次元のLorentz Lie環が得られ、三つの回転と三つのboostが基底になります。回転・boostの交換関係のうち、$[B_i,B_j]$ の負号は $\eta_{00}=-1$ から生じます。その複素化は二つの $\mathfrak{sl}_2(\mathbb C)$ に分かれますが、元の実Lie環では二組が共役で結ばれています。

次の **LREP10「SL(2,C)によるLorentz群の被覆」** では、これらの微小変換を $2\times2$ 複素行列から具体的に作ります。
