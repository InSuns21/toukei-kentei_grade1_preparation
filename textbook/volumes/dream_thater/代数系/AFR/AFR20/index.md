# AFR20 theta対応とunitary／orthogonal群

[前講の実Weil表現の構成](../AFR19/index.md#thm-afr19-real-weil) では、位置と周波数の交代形式を保つ変換を試験関数の作用として実現しました。また [theta和汎関数](../AFR19/index.md#def-afr19-theta-functional) によって試験関数から数を取り出しました。今度は一つの作用空間に二つの群を入れます。一方の群で変換の仕方を指定すると、他方の群の表現や保型関数を取り出せるのはなぜでしょうか。

<!-- definition-example-audit: strict -->

## 1. 二つの群が同じ交代形式を保存する

実ベクトル空間 $W$ 上の双線形形式 $\Omega$ を考えます。任意のベクトルについて

$$
\Omega(w,w)=0,\qquad
[\Omega(w,z)=0\ \text{for all }z\in W]\Longrightarrow w=0
$$

が成り立つとします。これが [非退化交代形式](../../../幾何系/SYM/SYM1/index.md#def-sym1-nondegenerate-form) です。

この形式を保つ可逆線形写像の群（[シンプレクティック群](../../../幾何系/SYM/SYM1/index.md#def-sym1-symplectic-map)）を $\mathrm{Sp}(W,\Omega)$ と書きます。積で保存性が保たれ、逆写像についても

$$
\Omega(A^{-1}w,A^{-1}z)=\Omega(w,z)
$$

が従います。

例えば $\mathbb R^2$ の形式 $\Omega((u,v),(u',v'))=uv'-vu'$ は、$(u',v')=(0,1),(1,0)$ を入れて非退化性を確認できます。前講の [Weyl作用の積公式](../AFR19/index.md#prop-afr19-weyl-product) に現れた形式です。$2$ 次行列 $S$ に対し $\Omega(Sw,Sz)=\det(S)\Omega(w,z)$ なので、この場合の保存群は $SL_2(\mathbb R)$ です。

群 $K$ の部分群 $H$ の中心化群 $C_K(H)$ は、$H$ の全元と交換する $K$ の元全体です。単に二群が交換するだけでなく、交換可能な元を互いにすべて集めた組を考えます。

<a id="def-afr20-dual-pair"></a>

<!-- formal-statement-start -->
> **定義（双対対）**
> 非退化交代形式を持つ有限次元実ベクトル空間 $(W,\Omega)$ と、その保存群 $K=\mathrm{Sp}(W,\Omega)$ の部分群 $G,H$ に対して、

$$
C_K(G)=H,\qquad C_K(H)=G
$$

> を満たす組 $(G,H)$ を双対対とする。本講ではこのうち直交群・シンプレクティック群、およびユニタリ群からなる簡約型の例を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr20-dual-pair -->
**定義の確認**

$W=\mathbb R^2$、$\Omega$ は上の行列式形式とします。$H=\{I,-I\}$、$G=SL_2(\mathbb R)$ なら $C_G(H)=G$ です。逆に $T$ が $G$ の全元と交換するなら、まず $\mathrm{diag}(2,1/2)$ との交換から $T$ の非対角成分が0になります。次に $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ との交換から二つの対角成分は等しくなります。従って $T=aI$ であり、$\det T=a^2=1$ から $T=\pm I$ です。逆に両者はすべての行列と交換するため、二つの中心化群の条件をともに満たします。
<!-- definition-example-end -->


## 2. 直交群とシンプレクティック群

実ベクトル空間 $V$ の非退化対称双線形形式 $B$ を保つ可逆写像の群を $O(V,B)$ と書きます。二次形式 $Q(v)=B(v,v)/2$ を保存することと同値です。実際、$Q(x+y)-Q(x)-Q(y)=B(x,y)$ を使えば二次形式の保存から双線形形式の保存が従います。例えば $V=\mathbb R^r$、$B(x,y)=x^Ty$ なら、基底ベクトルを代入することで保存条件は $h^Th=I$ と同値になります。

一方、二次元の位置・周波数の組を $r$ 個並べたいとします。テンソル積 $V\otimes_{\mathbb R}U$ は、$v\otimes u$ が各変数で線形となるように作った空間です。$V,U$ の基底をそれぞれ $e_i,f_j$ とすれば $e_i\otimes f_j$ が基底となり、形式を基底の組で指定して双線形に延長できます。

<a id="def-afr20-orthogonal-tensor"></a>

<!-- formal-statement-start -->
> **定義（直交型テンソル交代形式）**
> $V$ を非零有限次元実ベクトル空間、$B$ を非退化対称双線形形式とし、$U$ を非零有限次元実ベクトル空間、$J$ を非退化交代形式とする。$W=V\otimes_{\mathbb R}U$ 上の直交型テンソル交代形式を

$$
\Omega(v\otimes u,v'\otimes u')=B(v,v')J(u,u')
$$

> の双線形延長で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr20-orthogonal-tensor -->
**定義の確認**

$V=\mathbb R^2$ に内積、$U=\mathbb R^2$ に行列式形式を取ります。$U$ の基底を $f_1,f_2$ とすれば、$W$ の元は $x\otimes f_1+y\otimes f_2$ と書けるので $W=V\oplus V$ とみなせます。形式は

$$
\Omega((x,y),(x',y'))=x^Ty'-y^Tx'
$$

です。同じ元を二度入れると0になり、すべての $x',y'$ について0なら $x'=0$ として $x=0$、$y'=0$ として $y=0$ が得られます。従って交代かつ非退化です。一般の基底でも形式の行列は $B$ の行列と $J$ の行列の Kronecker 積になります。その逆はそれぞれの逆行列の Kronecker 積です（成分の和が二つの単位行列の成分の積に分離します）。従って非退化性が保たれます。対称形式と交代形式の積を転置すると符号が反転するため、交代性も保たれます。
<!-- definition-example-end -->


二群を $(h\otimes I)$、$(I\otimes s)$ として作用させます。純テンソルについて

$$
\begin{aligned}
&\Omega((h\otimes s)(v\otimes u),(h\otimes s)(v'\otimes u'))\\
&=B(hv,hv')J(su,su')
\end{aligned}
$$

であるので、$h,s$ が各形式を保存すれば元の値に戻ります。純テンソルが張る空間全体でも保存されます。

積についても

$$
(h\otimes I)(I\otimes s)=h\otimes s=(I\otimes s)(h\otimes I)
$$

です。ただし積群からの写像は一般に単射ではありません。例えば $(-I,-I)$ は $W$ 上で恒等作用となります。

以下では具体的な相互中心化まで証明します。

<a id="thm-afr20-orthogonal-centralizers"></a>

<!-- formal-statement-start -->
> **定理（直交型の相互中心化）**
> $V=\mathbb R^r$（$r\ge1$）に標準内積を、$U=\mathbb R^2$ に行列式形式を取る。$W=V\oplus V$ に [直交型テンソル交代形式](#def-afr20-orthogonal-tensor) を入れる。$O(r)$ の作用を $(x,y)\mapsto(hx,hy)$、$SL_2(\mathbb R)$ の作用を

$$
(x,y)\longmapsto(ax+by,cx+dy),
\qquad s=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$

> とする。これらの像は $\mathrm{Sp}(W,\Omega)$ の中で互いに中心化群をなし、双対対となる。
<!-- formal-statement-end -->

### 証明の見取り図

$W$ 上の作用素を $r$ 次正方行列4個に分けます。$SL_2$ の二種類の行列と交換する条件から、同一の作用素が二つの座標に作用することが分かります。逆向きでは $O(r)$ の符号反転と座標置換が、各ブロックをスカラー行列に限定します。

<!-- proof-start -->
### 証明

まず $T=\begin{pmatrix}A&B_0\\C&D\end{pmatrix}$ が $SL_2$ の像と交換するとします。$\mathrm{diag}(2I,I/2)$ との交換は $B_0/2=2B_0$、$2C=C/2$ を与えるので $B_0=C=0$。さらに $\begin{pmatrix}I&I\\0&I\end{pmatrix}$ と交換すると右上ブロックの比較から $A=D$ です。交代形式の保存は

$$
\Omega(T(x,0),T(0,y'))=x^TA^TAy'=x^Ty'
$$

を要求するため $A^TA=I$。逆に $A\in O(r)$ ならすべての $SL_2$ の像と交換し形式を保存するので、中心化群は $O(r)$ の像です。

次に $T$ が $\mathrm{diag}(h,h)$ と全ての $h\in O(r)$ について交換するとします。ブロックごとに $h$ と交換します。

一つのブロック $M$ に対して、第 $i$ 成分のみ符号を反転する行列との交換を考えると

$$
-M_{ij}=M_{ij}\qquad(i\ne j)
$$

が従います。従って $M$ は対角行列です。座標 $i,j$ を交換する行列との交換から $M_{ii}=M_{jj}$。$r=1$ でも各ブロックはスカラーです。

よって $T$ は4個のスカラー $a,b,c,d$ による上の形です。

交代形式へ代入すると

$$
\begin{aligned}
\Omega(T(x,y),T(x',y'))&=(ax+by)^T(cx'+dy')\\
&\quad-(cx+dy)^T(ax'+by')\\
&=(ad-bc)(x^Ty'-y^Tx').
\end{aligned}
$$

形式の保存から $ad-bc=1$ です。逆にこの条件を満たすものは形式を保存し全ての $O(r)$ の像と交換します。両方向が得られました。
<!-- proof-end -->


この証明は実正定値の場合です。非退化だが不定値の対称形式でもテンソル構成は成立します。一般の局所体や高次元の相互中心化は、ここで使った実直交群の符号・置換だけで片付けないようにします。

## 3. Hermitian形式を使うとユニタリ群になる

複素ベクトル空間上で第一変数を共役線形、第二変数を線形とする形式を考えます。Hermitian 形式は

$$
h(w,z)=\overline{h(z,w)}
$$

を満たすものです。非退化性は、すべての $w$ について $h(z,w)=0$ なら $z=0$ という条件です。

非退化 Hermitian 形式 $h$ を保つ複素線形可逆写像の群を $U(h)$ と書きます。正定値に限らず、例えば

$$
h(z,w)=\bar z_1w_1-\bar z_2w_2
$$

の保存群は $U(1,1)$ です。$D=\mathrm{diag}(1,-1)$ とすると $h(z,w)=z^*Dw$ ですから、基底を代入することで行列条件

$$
A^*DA=D
$$

が得られます。

二つの複素空間 $V_1,V_2$ の Hermitian 形式を $h_1,h_2$ とします。複素テンソル積上でその積を使えば再び Hermitian 形式が得られ、その虚部が実交代形式になります。

<a id="def-afr20-unitary-tensor"></a>

<!-- formal-statement-start -->
> **定義（ユニタリ型テンソル交代形式）**
> 非零有限次元複素ベクトル空間 $V_1,V_2$ に非退化 Hermitian 形式 $h_1,h_2$ を入れる。複素テンソル積 $W=V_1\otimes_{\mathbb C}V_2$ 上の Hermitian 形式 $h$ を

$$
h(v_1\otimes v_2,w_1\otimes w_2)
=h_1(v_1,w_1)h_2(v_2,w_2)
$$

> の半双線形延長とし、$W$ を実ベクトル空間と見たときのユニタリ型テンソル交代形式を $\Omega=\operatorname{Im}h$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr20-unitary-tensor -->
**定義の確認**

$V_1=\mathbb C$、$h_1(z,w)=\bar zw$、$V_2=\mathbb C^2$、$h_2(z,w)=z^*Dw$ とします。$z\otimes v\mapsto zv$ により $W$ は $\mathbb C^2$ と同一視でき、$h$ は $h_2$ に一致します。第一・第二変数での複素線形性の違いは積の形でも保存されます。基底での形式の行列は二つの可逆行列の Kronecker 積なので非退化です。

実数倍・和について虚部は双線形で、$h(z,z)$ は実数なので $\Omega(z,z)=0$。すべての $w$ に対し $\Omega(z,w)=0$ とすると $iw$ も代入でき、

$$
0=\operatorname{Im}h(z,iw)=\operatorname{Re}h(z,w).
$$

従って $h(z,w)=0$ が全 $w$ について成立し、$z=0$ です。この議論は一般の $h_1,h_2$ にも適用できます。$U(h_1)$ と $U(h_2)$ のテンソル作用は各因子の形式を保つので積と虚部を保存し、互いに交換します。
<!-- definition-example-end -->


この実モデルは、二次拡大を持つ局所体で Hermitian 形式と skew-Hermitian 形式（共役して交換すると符号が反転する形式）を組み合わせる一般のユニタリ型に対応します。複素数では $ih_2$ が skew-Hermitian 形式であり、$\operatorname{Tr}_{\mathbb C/\mathbb R}(ih)=-2\operatorname{Im}h$ なので、実非零定数倍を除いて同じ交代形式です。ここでは複素数のモデルで中心化群を確認します。

<a id="thm-afr20-unitary-centralizers"></a>

<!-- formal-statement-start -->
> **定理（ユニタリ型の相互中心化）**
> $W=\mathbb C^2$ を実空間とみなす。次の Hermitian 形式と交代形式を入れる。

$$
D=\mathrm{diag}(1,-1),\qquad h(z,w)=z^*Dw,
\qquad \Omega=\operatorname{Im}h.
$$

> $U(1)$ を絶対値1の複素スカラーによる作用とする。$U(1,1)$ を $h$ の複素線形保存群とする。
> この二群は $\mathrm{Sp}(W,\Omega)$ 内で [双対対](#def-afr20-dual-pair) となる。
<!-- formal-statement-end -->

### 証明の見取り図

複素数 $i$ による乗法と交換すれば実線形写像が複素線形になります。その場合は虚部から実部も復元できます。逆方向では対角位相と二つの座標を混ぜる行列を使います。

<!-- proof-start -->
### 証明

$T$ がスカラー $U(1)$ と交換するなら $T(iz)=iT(z)$ です。実線形性と合わせれば任意の $a+ib$ について複素線形性が従います。また

$$
\operatorname{Re}h(Tz,Tw)=\Omega(Tz,iTw)
=\Omega(Tz,T(iw))=\Omega(z,iw)
=\operatorname{Re}h(z,w).
$$

虚部も保存するので $T\in U(1,1)$。逆に $U(1,1)$ の元は複素線形で $h$ を保存するため $U(1)$ と交換し $\Omega$ を保存します。

今度は $T$ が $U(1,1)$ の全元と交換するとします。スカラー $iI$ もこの群に入るので $T$ は複素線形です。$\mathrm{diag}(-1,1)$ との交換から非対角成分は0になります。さらに実数 $t$ に対し

$$
A_t=\begin{pmatrix}\cosh t&\sinh t\\
\sinh t&\cosh t\end{pmatrix}
$$

は $A_t^*DA_t=D$ を満たします。実際、対角成分は $\cosh^2 t-\sinh^2 t=1$ とその負、非対角成分は

$$
\cosh t\sinh t-\sinh t\cosh t=0
$$

です。$t=1$ として $T=\mathrm{diag}(a,b)$ との交換を取ると

$$
a\sinh 1=b\sinh 1
$$

なので $a=b$ です。

$\Omega$ の保存条件に $z=(1,0)$、$w=(i,0)$ を入れると $|a|^2=1$ が得られます。逆にこの条件のスカラーは全ての $U(1,1)$ と交換し、形式を保存します。
<!-- proof-end -->


ここまでで二種類の双対対の違いが明確になりました。直交型では実対称形式と実交代形式を掛け、ユニタリ型では複素 Hermitian 形式の積の虚部を取ります。どちらも出力は実交代形式です。

## 4. 一つの試験関数空間で二つの作用を交換する

直交型の模型 $V=\mathbb R^r$ を使います。$x\in V$ とし、急減少滑らかな関数の空間 $\mathcal S(V)$ に [振動子作用の基本変換](../AFR19/index.md#def-afr19-generators) の多次元版を入れます。$b\in\mathbb R$、$a\in\mathbb R^\times$、$h\in O(r)$ に対して

$$
N_bf(x)=e^{\pi ib|x|^2}f(x),\qquad
D_af(x)=|a|^{r/2}f(ax),
$$

$$
Ff(y)=\int_V f(x)e^{-2\pi ix^Ty}\,dx,\qquad
R_hf(x)=f(h^{-1}x).
$$

前二者と $R_h$ は微分と線形変数変換から急減少性を保ち、$F$ は各座標での Fourier 変換（微分と部分積分）により保ちます。$R_hR_k f(x)=f(k^{-1}h^{-1}x)=R_{hk}f(x)$ です。$h^Th=I$ から $|\det h|=1$ なので $R_h$ は $L^2$ ノルムも保存します。

<a id="thm-afr20-orthogonal-commutation"></a>

<!-- formal-statement-start -->
> **定理（直交型基本変換の交換性）**
> $\mathcal S(\mathbb R^r)$ 上の上記四作用に対し、任意の $h\in O(r)$、$b\in\mathbb R$、$a\ne0$ について

$$
R_hN_b=N_bR_h,\quad
R_hD_a=D_aR_h,\quad R_hF=FR_h
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

二次位相は長さだけに依存し、スカラー倍は線形写像と交換します。Fourier 核には内積が入っているので、直交写像で積分変数を変えれば同じ核に戻ります。

<!-- proof-start -->
### 証明

長さの保存から

$$
R_hN_bf(x)=e^{\pi ib|h^{-1}x|^2}f(h^{-1}x)
=N_bR_hf(x).
$$

また $R_hD_af(x)=|a|^{r/2}f(ah^{-1}x)=D_aR_hf(x)$ です。Fourier 積分は絶対収束し、$x=ht$ による絶対 Jacobian は1なので

$$
FR_hf(y)=\int_V f(t)e^{-2\pi it^Th^Ty}\,dt
=Ff(h^{-1}y)=R_hFf(y).
$$

従って有限個の基本変換の合成とその逆も $R_h$ と交換します。
<!-- proof-end -->


例えば $r=1$ で $h=-1$ を取ると、$R_h$ は偶関数を $+1$ 倍、奇関数を $-1$ 倍します。三つの振動子変換は偶・奇を混ぜないので、それぞれの空間に制限して作用できます。前講の [実Weil表現](../AFR19/index.md#thm-afr19-real-weil) をこの二つの空間へ制限できます。これは一方の群の表現を指定すると他方の群の作用空間が得られる最初の例です。

## 5. 局所の持ち上げ：どの成分が現れるか

一つの局所体上の二つの群を考える場合、Weil表現は一般にはシンプレクティック群の二重被覆上の表現です。以下の代数的構成では、必要な被覆群を使うか、選んだ分裂（被覆群への準同型による持ち上げ）によって二群の交換する作用を得ていると仮定します。特にユニタリ型では分裂の選択が規格化に関わります。単に基礎の行列が交換することだけで任意の持ち上げが交換するとは結論しません。

表現 $(\pi,E)$ を固定すると、双対空間には反変表現 $\pi^\vee(h)\ell=\ell\circ\pi(h^{-1})$ が作用します。非アルキメデス局所体上の滑らかな表現では、双対空間のうち開部分群で固定されるベクトルを取ります。テンソル空間で $h$ によって動かしたベクトルと元の差を0とみなす商を作ると、一方の作用が消えて他方が残ります。

<a id="def-afr20-local-theta-quotient"></a>

<!-- formal-statement-start -->
> **定義（局所theta持ち上げ）**
> 群 $G,H$ の交換する作用を持つ複素表現空間 $\mathcal W$ と $H$ の表現 $(\pi,E)$ に対し、代数的な局所theta持ち上げの模型を

$$
\Theta_{\mathrm{alg}}(\pi)
=(\mathcal W\otimes E^\vee)/L,\qquad
L=\operatorname{span}_{\mathbb C}\{h\xi-\xi:h\in H,\ \xi\in\mathcal W\otimes E^\vee\}
$$

> とする。ここで $h$ はテンソル積に対角的に作用し、$G$ は $\mathcal W$ のみに作用する。Weil表現と既約滑らかな $\pi$ を用いる非アルキメデス局所体の場合には、この滑らかな反変表現を用いた余不変商が大theta持ち上げの標準模型となる。実局所体の一般論では表現空間に入れる位相を指定し、連続な作用を持つ適切な商を取る必要がある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr20-local-theta-quotient -->
**定義の確認**

$H=\{1,-1\}$ とし、$E$ は符号指標の一次元表現とします。$\mathcal W=\mathcal S(\mathbb R)$ に反転作用を入れます。テンソル積を $\mathcal W$ と同一視したとき、非自明元の対角作用は $-R_{-1}$ です。

この作用と恒等作用の差は

$$
-R_{-1}f-f=-2f_{\mathrm{even}},\qquad
f_{\mathrm{even}}(x)=\frac{f(x)+f(-x)}2.
$$

従って $L$ は偶関数全体です。各偶関数はこの差の $-1/2$ 倍として実際に得られます。商は奇関数空間と同型です。

$G$ が前節の振動子作用なら [直交型基本変換の交換性](#thm-afr20-orthogonal-commutation) により $L$ を保ち、商に作用します。一般にも

$$
g(h\xi-\xi)=h(g\xi)-g\xi
$$

なので商上の作用は代表元に依存しません。
<!-- definition-example-end -->


コンパクト群の場合は商を具体的に射影で調べられます。ここでは有限群の平均または円周群の角度平均を使います。一般のコンパクト群では左右不変な Haar 確率測度を用います。$\chi:H\to\mathbb C^\times$ を絶対値1の一次元指標とし、$H$ の連続なユニタリ作用を $R_h$ とします。$\chi$ 成分とは全ての $k$ について $R_kv=\chi(k)v$ となるベクトル全体です。

<a id="thm-afr20-compact-projection"></a>

<!-- formal-statement-start -->
> **定理（コンパクト指標射影）**
> コンパクト群 $H$ の Hilbert 空間上の連続ユニタリ表現 $R$ と連続なユニタリ指標 $\chi$ を取る。$dh$ を Haar 確率測度とする。ノルム収束するベクトル積分

$$
P_\chi v=\int_H\overline{\chi(h)}R_hv\,dh
$$

> は $\chi$ 成分への直交射影である。$R_h$ の全てと交換する有界線形作用素は $P_\chi$ とも交換する。
<!-- formal-statement-end -->

### 証明の見取り図

積分変数を左にずらすと、取り出した成分の変換則が出ます。成分に既に属するベクトルでは積分が元のベクトルになるので射影です。

<!-- proof-start -->
### 証明

積分の被積分関数は連続でノルムが $\|v\|$ のため、確率測度上で積分できます。$t=kh$、$dh=dt$ とすると

$$
R_kP_\chi v=\int_H\overline{\chi(k^{-1}t)}R_tv\,dt
=\chi(k)P_\chi v.
$$

逆に $R_hv=\chi(h)v$ なら $P_\chi v=\int_Hv\,dh=v$。従って $P_\chi^2=P_\chi$ かつ像は指定成分です。随伴はユニタリ性から

$$
P_\chi^*v=\int_H\chi(h)R_{h^{-1}}v\,dh
=\int_H\overline{\chi(t)}R_tv\,dt=P_\chi v.
$$

ここで $t=h^{-1}$ とし、コンパクト群の Haar 確率測度の反転不変性を使いました。自己随伴な射影なので直交射影です。有界作用素 $A$ が $R_h$ と交換すると、積分を通して $AP_\chi v=P_\chi Av$ が得られます。
<!-- proof-end -->


有限群 $H=\{\pm1\}$ では $P_\pm f=(f(x)\pm f(-x))/2$ です。円周群ではもっと多くの成分があります。$\mathbb R^2\simeq\mathbb C$ の回転作用を $R_\theta f(z)=f(e^{-i\theta}z)$ とし、$\chi_m(e^{i\theta})=e^{im\theta}$（$m\in\mathbb Z$）とします。$f(z)=z e^{-\pi|z|^2}$ なら

$$
R_\theta f=e^{-i\theta}f,\qquad
P_{\chi_m}f=\frac1{2\pi}\int_0^{2\pi}e^{-i(m+1)\theta}\,d\theta\, f.
$$

積分は $m=-1$ で1、それ以外は指数の原始関数を両端に代入すると0です。よって重み $-1$ の成分だけが残ります。これは直交型の $SO(2)$ への制限でもあり、円周群 $U(1)$ の指標選択の模型でもあります。$U(1,1)$ の Weil 表現の全分解を計算したという意味ではありません。

一般の局所 theta 対応では、大theta持ち上げが非零のとき、その既約商を小theta持ち上げとして取り出します。標数0の非アルキメデス局所体上の古典的双対対について、Howe双対性は非零の場合の既約商の一意性（同型を除く）と異なる既約入力に対する対応の単射性を与える深い結果です。本講で証明したのは商の作用とコンパクト指標による取り出しであり、この一般定理は外部入力です。既約性・非消滅・どのランクで初めて非消滅するかは別の問題です。

## 6. 大域の持ち上げ：有理点の和から保型関数へ

[有理基本変換に対するtheta和の不変性](../AFR19/index.md#thm-afr19-rational-invariance) は、アデール上の試験関数の有理点総和が有理変換を吸収することを示しました。大域ではこの汎関数を二つの群の作用で動かし、片側の変数を積分します。

ここでは数体を $\mathbb Q$ とし、$\mathbb A$ はそのアデール環です。$X$ は有理数上の有限次元ベクトル空間とします。

Schrödinger 模型の試験関数空間 $\mathcal S(X(\mathbb A))$ に二群の交換する作用 $\omega(g,h)$ があるとします。必要な被覆と有理点の持ち上げを選び、その上で作用は表現となり、theta和汎関数 $\lambda$ は有理点の作用で不変であると仮定します。

被覆が必要な場合、以下の $G(\mathbb A),H(\mathbb A)$ と有理部分群は選んだ作用群・有理点の像を表すものとします。

一般の大域Weil表現や有理分裂の存在の証明はここでは外部入力とし、この仮定から何が従うかを切り分けます。

<a id="def-afr20-global-theta-kernel"></a>

<!-- formal-statement-start -->
> **定義（大域theta核）**
> $X$ を有限次元有理ベクトル空間とし、$\omega$ を上記の交換する大域作用、$\varphi\in\mathcal S(X(\mathbb A))$ とする。大域theta核を

$$
K_\varphi(g,h)=\sum_{x\in X(\mathbb Q)}(\omega(g,h)\varphi)(x)
=\lambda(\omega(g,h)\varphi)
$$

> とする。$\lambda$ は有理点に沿った総和であり、ここでは各 $g,h$ における絶対収束と有理点の作用に対する不変性を仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr20-global-theta-kernel -->
**定義の確認**

$X=\mathbb Q$、$g,h$ を単位元とし、$\varphi$ の実成分を $e^{-\pi x^2}$、有限素点を $\mathbf1_{\mathbb Z_p}$ とします。有限素点で全て1となる有理数は整数です。実際、既約分数の分母に素因数 $p$ があれば $p$ 進整数ではありません。従って

$$
K_\varphi(1,1)=\sum_{n\in\mathbb Z}e^{-\pi n^2}.
$$

$n\ge1$ では $n^2\ge n$ なので両側の尾部は等比級数で抑えられ、絶対収束し、項 $n=0$ が1なので正です。$H=O(1)$ の局所の符号作用を有限素点と実素点に入れても $\varphi$ は不変です。$H(\mathbb Q)=\{\pm1\}$ の斜めの符号反転は、一般の試験関数でも総和の添字 $x\mapsto-x$ の全単射によって $\lambda$ を保ちます。
<!-- definition-example-end -->


左から有理点 $\gamma\in G(\mathbb Q)$、$\delta\in H(\mathbb Q)$ を掛けると、表現性と有理点不変性から

$$
K_\varphi(\gamma g,\delta h)
=\lambda(\omega(\gamma,\delta)\omega(g,h)\varphi)
=K_\varphi(g,h).
$$

従って核は各左商上の関数となります。$[H]=H(\mathbb Q)\backslash H(\mathbb A)$ とし、その右 $H(\mathbb A)$ 作用で不変な商測度 $dh$ を取ります。$h$ の関数 $f$ を核に掛けて積分することで、$g$ の関数を作ります。複素共役を付けるのは、入力の変換成分を取り出すためです。

<a id="def-afr20-global-theta-lift"></a>

<!-- formal-statement-start -->
> **定義（大域theta持ち上げ）**
> 上記の大域theta核と右不変な商測度 $dh$ を持つ $[H]$ を取る。$f:[H]\to\mathbb C$ を可測関数とし、各 $g$ について次の積分が絶対収束すると仮定する。大域theta持ち上げを

$$
T_\varphi f(g)=\int_{[H]}K_\varphi(g,h)\overline{f(h)}\,dh
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr20-global-theta-lift -->
**定義の確認**

$H=O(1)$ なら $H(\mathbb A)$ は各素点での $\{\pm1\}$ の直積です。各局所群全体が整数点であり、制限直積は直積になります。各因子の一様確率測度の積は左右不変で、有限な斜め部分群で割る商写像による像測度を、確率測度として使えます。前の Gauss 試験関数と $f=1$ では $K_\varphi(1,h)$ は一定で、上で示した有限値です。積分の絶対値の積分もその有限値なので

$$
T_\varphi 1(1)=K_\varphi(1,1)>0.
$$

$g$ を一般に動かしても、交換する作用の下では $H$ が $\varphi$ を固定するので $K_\varphi(g,h)=K_\varphi(g,1)$ です。核の絶対収束の仮定のもとで各 $g$ の積分が存在します。
<!-- definition-example-end -->


<a id="thm-afr20-theta-lift-invariance"></a>

<!-- formal-statement-start -->
> **定理（持ち上げの左不変性と右作用）**
> [大域theta持ち上げ](#def-afr20-global-theta-lift) の仮定に加え、核の有理点不変性を仮定する。任意の $\gamma\in G(\mathbb Q)$、$g,g_0\in G(\mathbb A)$ に対して

$$
T_\varphi f(\gamma g)=T_\varphi f(g),\qquad
T_\varphi f(gg_0)=T_{\omega(g_0,1)\varphi}f(g)
$$

> が成り立つ。ただし右辺の試験関数にも核の構成を適用する。
<!-- formal-statement-end -->

### 証明の見取り図

左から掛ける有理点は汎関数に吸収されます。右から掛ける元は表現性と二群の交換性により、試験関数への作用として取り出せます。

<!-- proof-start -->
### 証明

左不変性は $K_\varphi(\gamma g,h)=K_\varphi(g,h)$ を絶対収束積分に代入すれば得られます。右作用については

$$
\begin{aligned}
K_\varphi(gg_0,h)
&=\lambda(\omega(g,1)\omega(g_0,1)\omega(1,h)\varphi)\\
&=\lambda(\omega(g,h)\omega(g_0,1)\varphi)\\
&=K_{\omega(g_0,1)\varphi}(g,h).
\end{aligned}
$$

同じ被積分関数なので絶対収束も左辺から従います。積分すれば結論が得られます。
<!-- proof-end -->


従って試験関数を動かして得られる持ち上げの張る空間は右作用に対して不変です。一方、左不変性だけで保型形式に必要な滑らかさ、有限性、増大条件、カスプ性がすべて従うわけではありません。非コンパクトな $[H]$ での収束・正則化も独立に検証する必要があります。

### 非消滅と消滅を同じ模型で比べる

先ほどの $O(1)$ の例で二つの素点 $\infty,2$ の符号の積を

$$
\chi(h)=h_\infty h_2
$$

とします。斜めの $-1$ を掛けても積は変わらず、$[H]$ の非自明な指標です。実素点だけ $-1$ の元 $k$ では $\chi(k)=-1$ です。

右不変測度による置換 $h\mapsto hk$ から

$$
\int_{[H]}\overline{\chi(h)}dh=-\int_{[H]}\overline{\chi(h)}dh
$$

となり、この積分は0です。

同じ偶な試験関数で $f=\chi$ を選ぶと全ての $g$ で $T_\varphi\chi(g)=0$ になります。局所で非零の成分を取り出せること、大域の総和が非零になること、積分で指定した成分が残ることは別々の条件です。次講の seesaw 配置では、二通りの持ち上げや周期積分を同一の核から比較します。

### 参考文献と一般理論への入口

- Stephen S. Kudla, [Notes on the local theta correspondence](https://www.math.toronto.edu/~skudla/castle.pdf).
- Chen-Bo Zhu, [Lectures on local theta correspondence](https://arxiv.org/abs/2511.07849).

両資料は双対対・Weil表現・局所theta対応の一般論への入口です。本講の有限次元中心化群とコンパクト群の計算は上で証明しました。一般のHowe双対性と大域分裂の証明はこれらの理論への接続点として扱います。

## 7. 演習

<a id="ex-afr20-a1"></a>

### A1. 交代形式の保存

$V=\mathbb R^2$、$h=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とする。$(x,y)\mapsto(hx,hy)$ が第2節の交代形式を保つことを行列と内積で確かめよ。

- Level: A
- ID: AFR20-A1

<!-- solution-start -->
**詳細解答**

$h^Th=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\begin{pmatrix}0&-1\\1&0\end{pmatrix}=I$ です。従って [直交型テンソル交代形式](#def-afr20-orthogonal-tensor) に対し

$$
(hx)^T(hy')-(hy)^T(hx')
=x^Th^Thy'-y^Th^Thx'
=x^Ty'-y^Tx'.
$$

逆行列は $h^T$ なので可逆性も満たします。
<!-- solution-end -->


<a id="ex-afr20-a2"></a>

### A2. 交換するブロックの絞り込み

$W=\mathbb R^r\oplus\mathbb R^r$ の作用素 $T=\begin{pmatrix}A&B_0\\C&D\end{pmatrix}$ が $\mathrm{diag}(3I,I/3)$ と交換するなら $B_0=C=0$ を示せ。

- Level: A
- ID: AFR20-A2

<!-- solution-start -->
**詳細解答**

積の右上成分は $T\mathrm{diag}(3I,I/3)$ で $B_0/3$、逆順で $3B_0$ です。左下成分はそれぞれ $3C$ と $C/3$。従って $(3-1/3)B_0=(3-1/3)C=0$。実数 $8/3$ は非零なので両方が0です。この条件だけでは $A=D$ は従いません。
<!-- solution-end -->


<a id="ex-afr20-a3"></a>

### A3. 複素形式から交代形式へ

$h(z,w)=\bar z_1w_1-\bar z_2w_2$ とし、$z=(1,i)$、$w=(i,2)$ とする。$h(z,w)$、$\operatorname{Im}h(z,w)$、$\operatorname{Im}h(w,z)$ を求めよ。

- Level: A
- ID: AFR20-A3

<!-- solution-start -->
**詳細解答**

$h(z,w)=1\cdot i-(-i)\cdot2=3i$。従って虚部は3です。逆順は $(-i)\cdot1-2\cdot i=-3i$ で虚部は $-3$。これは [ユニタリ型テンソル交代形式](#def-afr20-unitary-tensor) の交換で符号が反転する条件と一致します。
<!-- solution-end -->


<a id="ex-afr20-a4"></a>

### A4. 偶奇成分の抽出

$f(x)=(1+x)e^{-\pi x^2}$ とする。$H=\{\pm1\}$ の反転作用に対する二つの指標射影を求めよ。

- Level: A
- ID: AFR20-A4

<!-- solution-start -->
**詳細解答**

[コンパクト指標射影](#thm-afr20-compact-projection) の有限平均を使います。$R_{-1}f=(1-x)e^{-\pi x^2}$ なので

$$
P_+f=\tfrac12(1+x+1-x)e^{-\pi x^2}=e^{-\pi x^2},
$$

$$
P_-f=\tfrac12(1+x-1+x)e^{-\pi x^2}=xe^{-\pi x^2}.
$$

和は元の $f$、反転作用は前者で $+1$、後者で $-1$ です。
<!-- solution-end -->


<a id="ex-afr20-b1"></a>

### B1. 不定値でも保存は成立する

$D=\mathrm{diag}(1,-1)$、$B(x,y)=x^TDy$ とし、$s=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ とする。$T_s(x,y)=(2x+y,x+y)$ が $\Omega((x,y),(x',y'))=B(x,y')-B(y,x')$ を保存することを直接示せ。

- Level: B
- ID: AFR20-B1

<!-- solution-start -->
**詳細解答**

$B$ の双線形性から

$$
\begin{aligned}
\Omega(T_sw,T_sw')&=B(2x+y,x'+y')\\
&\quad-B(x+y,2x'+y')\\
&=2B(x,x')+2B(x,y')+B(y,x')+B(y,y')\\
&\quad-2B(x,x')-B(x,y')-2B(y,x')-B(y,y')\\
&=B(x,y')-B(y,x').
\end{aligned}
$$

$\det s=2-1=1$ なので可逆です。正定値性を使わず保存が従いました。これは一般の相互中心化の証明ではなく、テンソル作用の保存の確認です。
<!-- solution-end -->


<a id="ex-afr20-b2"></a>

### B2. ユニタリ群の非コンパクトな元

$A=\frac14\begin{pmatrix}5&3\\3&5\end{pmatrix}$ とする。$A^*DA=D$ を計算し、$A$ と交換する複素対角行列がスカラーであることを示せ。

- Level: B
- ID: AFR20-B2

<!-- solution-start -->
**詳細解答**

行列は実対称なので

$$
A^*DA=\tfrac1{16}
\begin{pmatrix}5&3\\3&5\end{pmatrix}
\begin{pmatrix}5&3\\-3&-5\end{pmatrix}
=\tfrac1{16}\begin{pmatrix}16&0\\0&-16\end{pmatrix}=D.
$$

従って可逆です（行列式は $(25-9)/16=1$）。対角行列 $\mathrm{diag}(a,b)$ と $A$ の積の右上成分は順に $3a/4$、$3b/4$ です。交換から $a=b$ となります。これは [ユニタリ型の相互中心化](#thm-afr20-unitary-centralizers) で二つの座標を混ぜる行列を利用した理由です。
<!-- solution-end -->


<a id="ex-afr20-b3"></a>

### B3. 円周群で二つの重みを分離する

$R_\theta f(z)=f(e^{-i\theta}z)$、$f(z)=(z^2+\bar z)e^{-\pi|z|^2}$ とする。$\chi_m(e^{i\theta})=e^{im\theta}$ に対する $P_{\chi_m}f$ を全ての整数 $m$ について求めよ。

- Level: B
- ID: AFR20-B3

<!-- solution-start -->
**詳細解答**

回転による長さの保存と複素共役から

$$
R_\theta f(z)=(e^{-2i\theta}z^2+e^{i\theta}\bar z)e^{-\pi|z|^2}.
$$

[コンパクト指標射影](#thm-afr20-compact-projection) の積分に代入すると二項の係数は

$$
\frac1{2\pi}\int_0^{2\pi}e^{-i(m+2)\theta}d\theta,\qquad
\frac1{2\pi}\int_0^{2\pi}e^{-i(m-1)\theta}d\theta.
$$

整数 $k$ について $\int_0^{2\pi}e^{ik\theta}d\theta$ は $k=0$ なら $2\pi$、それ以外は $(e^{2\pi ik}-1)/(ik)=0$。従って $m=-2$ で $z^2e^{-\pi|z|^2}$、$m=1$ で $\bar ze^{-\pi|z|^2}$、それ以外で0になります。
<!-- solution-end -->


<a id="ex-afr20-b4"></a>

### B4. 大域積分における入力の右移動

第6節の仮定のもと $R(k)f(h)=f(hk)$ とする。$T_\varphi(R(k)f)(g)$ が絶対収束するとき、$T_{\omega(1,k^{-1})\varphi}f(g)$ に等しいことを示せ。

- Level: B
- ID: AFR20-B4

<!-- solution-start -->
**詳細解答**

右不変測度で $t=hk$ と置きます。$h=tk^{-1}$ なので

$$
T_\varphi(R(k)f)(g)
=\int_{[H]}\lambda(\omega(g,tk^{-1})\varphi)\overline{f(t)}\,dt.
$$

二群の作用は交換し表現性が成立するので $\omega(g,tk^{-1})=\omega(g,t)\omega(1,k^{-1})$。よって被積分関数は $K_{\omega(1,k^{-1})\varphi}(g,t)\overline{f(t)}$ です。変数変換で絶対収束も保たれ、指定された等式が成立します。$k^{-1}$ が必要なのは $t=hk$ の逆変換からです。
<!-- solution-end -->


<a id="ex-afr20-c1"></a>

### C1. 二つの局所符号を持つ大域模型

$X=\mathbb Q$、$H=O(1)$、実成分 $\varphi_\infty(x)=xe^{-\pi x^2}$、$2$ 進成分 $\varphi_2(x)=\mathbf1_{1+4\mathbb Z_2}(x)-\mathbf1_{-1+4\mathbb Z_2}(x)$、他の有限素点で $\varphi_p=\mathbf1_{\mathbb Z_p}$ とする。$g=1$ における核の絶対収束、$\chi(h)=h_\infty h_2$ による変換則、$T_\varphi\chi(1)$ の非消滅と $T_\varphi 1(1)=0$ を示せ。測度は第6節の確率測度とする。

- Level: C
- ID: AFR20-C1

<!-- solution-start -->
**詳細解答**

まず有限素点の台はすべて整数点に含まれるので、有理点の総和は整数に限られます。$\varphi_2(n)$ は $n\equiv1\pmod4$ で1、$n\equiv-1\pmod4$ で $-1$、偶数で0です。従って

$$
K_\varphi(1,1)=2\sum_{j=0}^\infty(-1)^j(2j+1)e^{-\pi(2j+1)^2}.
$$

負の整数と正の整数の寄与は、実成分と $2$ 進成分がともに奇であるため一致します。

絶対値は $2\sum_{n\ge1}ne^{-\pi n^2}$ 以下です。不等式 $e^{-\pi n^2}\le e^{-\pi n}$ と等比級数の微分から、この上界は有限です。

$$
a_j=(2j+1)e^{-\pi(2j+1)^2}
$$

は正で、$t\ge1$ に対して

$$
(te^{-\pi t^2})'=e^{-\pi t^2}(1-2\pi t^2)<0
$$

が成り立ちます。従って $a_0>a_1>\cdots>0$。絶対収束する級数を

$$
(a_0-a_1)+(a_2-a_3)+\cdots
$$

と組にすると全て正で、最初の差も正なので核は正です。

実と $2$ 進の符号反転でそれぞれ $-1$ 倍、他の有限素点では不変です。従って $R_h\varphi=\chi(h)\varphi$、また斜めの有理符号では $\chi=1$ です。核は $K_\varphi(1,h)=\chi(h)K_\varphi(1,1)$。絶対値は一定有限なので積分が絶対収束し、

$$
T_\varphi\chi(1)=K_\varphi(1,1)\int_{[H]}|\chi(h)|^2dh=K_\varphi(1,1)>0.
$$

一方、実素点だけ符号を反転する元 $k$ では $\chi(k)=-1$ です。測度の右不変性により $\int\chi(h)dh=\int\chi(hk)dh=-\int\chi(h)dh$、従って積分は0で $T_\varphi1(1)=0$。局所指標の組と大域の有理点不変性、核の非消滅、持ち上げの選択性がこの一例でそろいました。
<!-- solution-end -->

