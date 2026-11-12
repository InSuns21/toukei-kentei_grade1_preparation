# AQFT17 splitの帰結とnuclearityへの入口

[AQFT16のsplit包含](../AQFT16/index.md#def-aqft16-split-inclusion)では、少し離した二つの領域の間にType I因子を挟み、内側と外側の可換子を別々のテンソル因子で表しました。しかしそこで作ったのは、**ある一組の積ベクトル状態**だけでした。内側で準備した任意の正規状態と、外側で準備した任意の正規状態を、両方の期待値を変えずに一つの状態へ延長できるでしょうか。

もう一つの問題は、そのような中間因子の**存在を物理的な模型からどう確かめるか**です。局所性は可換性を与えますが、splitを保証しません。自由場のエネルギーの大きい励起を抑えると、局所的に準備できる状態の数を定量的に制御できるという方向から、nuclearity（核性）へ進みます。

本講で完全に示すのは、splitから正規積状態の延長を構成する論証、核写像からコンパクト性を導く論証、そして有限体積自由場のエネルギー減衰の計算です。nuclearityからsplitへの深い一般定理は、成立条件と文献を付して紹介し、ここで証明した定理とは区別します。計量の規約は $(-,+,+,+)$ です。

## 1. 正規状態を別々に指定するとは

固定されたHilbert空間 $H$ 上の二つの単位的von Neumann環 $M_1,M_2$ を考えます。[VN5の正規状態](../../VN/VN5/index.md#def-vn5-normal-state)は、正かつ単位元を $1$ に送る ultraweak 連続な汎関数です。任意の状態ではなく正規状態に限定するのは、局所環を弱閉包して得た表示と整合する延長を要求したいからです。

[AQFT16の内外テンソル積表示](../AQFT16/index.md#thm-aqft16-split-tensor-inclusion)では $M_1$ と $M_2'$ が、ユニタリ座標変換によってそれぞれ左側 $A\otimes I_L$、右側 $I_K\otimes B$ に入ります。ここで $M_2'$ は[可換子](../../VN/VN2/index.md#def-vn2-commutant)であり、外側の局所代数そのものと必ずしも等しいわけではありません。

内側の状態 $\varphi$ と外側の状態 $\psi$ に対し、結合環 $M_1\vee M_2'$ 上で

$$
\omega(xy)=\varphi(x)\psi(y)
\qquad(x\in M_1,\ y\in M_2')
$$

を満たす $\omega$ を**積状態の延長**と呼びたい。問題はこの式を単なる積の上で宣言するだけでなく、**正で正規な状態として結合環の全体に定義する**ことです。

<a id="def-aqft17-normal-product-extension"></a>

<!-- formal-statement-start -->
> **定義（正規積状態延長）**  
> $H$ を複素Hilbert空間、$P,Q\subset B(H)$ を単位元を共有し互いに可換なvon Neumann環とする。$P$ の正規状態 $\varphi$ と $Q$ の正規状態 $\psi$ に対する**正規積状態延長**とは、$P\vee Q$ 上の正規状態 $\omega$ であって、すべての $x\in P$ と $y\in Q$ について
>
$$
\omega(xy)=\varphi(x)\psi(y)
$$
>
> を満たすものをいう。$\omega(x)=\varphi(x)$、$\omega(y)=\psi(y)$ は、それぞれ $y=I$、$x=I$ と置いた場合に含まれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft17-normal-product-extension -->
### 直接例：二つの量子ビットの混合状態

$H=\mathbb C^2\otimes\mathbb C^2$、$P=M_2(\mathbb C)\otimes I_2$、$Q=I_2\otimes M_2(\mathbb C)$ とします。両者は作用先が異なるので可換です。次の密度作用素を選びます。

$$
D=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\qquad
E=\begin{pmatrix}2/5&0\\0&3/5\end{pmatrix}.
$$

固有値はすべて非負で、それぞれのトレースは $1$ です。[VN5の密度作用素の定義](../../VN/VN5/index.md#def-vn5-density-operator)を満たします。[VN5の状態との対応](../../VN/VN5/index.md#thm-vn5-density-state-correspondence)に従って

$$
\varphi(a\otimes I)=\operatorname{Tr}(Da),
\qquad
\psi(I\otimes b)=\operatorname{Tr}(Eb)
$$

と置きます。$D\otimes E$ は正で、トレースは $1\cdot1=1$。したがって $\omega(T)=\operatorname{Tr}((D\otimes E)T)$ は $B(H)$ 上の正規状態です。基底 $e_i\otimes e_j$ で対角和を取ると

$$
\begin{aligned}
\omega((a\otimes I)(I\otimes b))
&=\operatorname{Tr}((D\otimes E)(a\otimes b))\\
&=\sum_{i,j}D_{ii}E_{jj}a_{ii}b_{jj}\\
&=\left(\sum_iD_{ii}a_{ii}\right)
  \left(\sum_jE_{jj}b_{jj}\right)\\
&=\varphi(a\otimes I)\psi(I\otimes b).
\end{aligned}
$$

**定義の確認**：可換性、各周辺状態の正規性、延長の正規性・正性・規格化、積の式をそれぞれ確かめました。ベクトル状態とは限らない混合状態でもよいことが、前講との差です。
<!-- definition-example-end -->

## 2. splitなら任意の正規状態を独立に準備できる

ここで一つだけ、作用素環の標準的な準備事実を明示します。一般の部分環では、正規状態が選んだ表現の $B(K)$ に一意に延長されるとは限りませんが、**正規な正の延長は存在**します。

<a id="lem-aqft17-normal-state-lift"></a>

<!-- formal-statement-start -->
> **準備補題（具体的von Neumann環の正規状態の正の持ち上げ）**  
> $K$ を複素Hilbert空間、$A\subset B(K)$ を単位元を共有するvon Neumann環とする。$A$ の任意の正規状態 $\varphi$ に対して、正のtrace class作用素 $D\in S_1(K)$ が存在し、
>
$$
\operatorname{Tr}(D)=1,
\qquad
\varphi(a)=\operatorname{Tr}(Da)\quad(a\in A)
$$
>
> が成立する。$D$ の一意性は主張しない。
<!-- formal-statement-end -->

**この補題の位置付け**：具体的von Neumann環上の正規正汎関数が、$\sum_j\langle\xi_j,(\cdot)\xi_j\rangle$（$\sum_j\|\xi_j\|^2<\infty$）で表せるという正のpredual表示を使います。[VN4の具体的von Neumann環のpredual](../../VN/VN4/index.md#thm-vn4-von-neumann-predual)は正規汎関数をtrace class作用素の制限で捉えますが、「代表を正に選べる」という強化は正規正汎関数の標準延長定理です。これは任意の状態を正規に延長できるという主張ではありません。正のpredual表示そのものの一般証明はこの章では用いる基礎補題として扱い、以下の**積状態延長の構成・正性・正規性の検証は省略しません**。

具体的には $\xi_j$ を上の表示から選べば

$$
D=\sum_{j\ge1}|\xi_j\rangle\langle\xi_j|,
\quad
\|D\|_1=\operatorname{Tr}(D)
=\sum_j\|\xi_j\|^2=\varphi(I)=1
$$

となります。和はtrace normで収束し、任意の $a\in A$ に対するトレースの連続性から補題の式を得ます。有限次元の場合は正の密度行列の部分トレースという通常の構成に還元します。

<a id="thm-aqft17-normal-product-extension"></a>

<!-- formal-statement-start -->
> **定理（split包含における任意の正規積状態延長）**  
> $M_1\subset M_2\subset B(H)$ を単位的von Neumann環の包含とし、Type I因子 $N$ が存在して $M_1\subset N\subset M_2$ を満たすとする。任意の $M_1$ 上の正規状態 $\varphi$ と、$M_2'$ 上の正規状態 $\psi$ に対し、$M_1\vee M_2'$ 上の正規積状態延長 $\omega$ が存在する。さらに $\omega$ は $B(H)$ 上の正規状態の制限として取れる。
<!-- formal-statement-end -->

### 証明の見取り図

[AQFT16の空間的テンソル積表示](../AQFT16/index.md#thm-aqft16-split-tensor-inclusion)を使うと、内側と外側は別のHilbert空間上の環になります。指定した正規状態を準備補題で各 $B(K)$、$B(L)$ へ正の密度作用素として持ち上げ、その**テンソル積密度作用素**を作ります。最後に元の $H$ へ戻して制限します。

<!-- proof-start -->
### 証明

まず[AQFT16の定理](../AQFT16/index.md#thm-aqft16-split-tensor-inclusion)の各仮定を確認します。$M_1\subset N\subset M_2$ で $N$ はType I因子ですから、Hilbert空間 $K,L$ とユニタリ $U:H\to K\otimes L$、部分von Neumann環 $A\subset B(K)$、$B\subset B(L)$ があり、

$$
UM_1U^*=A\otimes I_L,
\qquad
UM_2'U^*=I_K\otimes B
$$

です。$a\in A$、$b\in B$ に対して

$$
\widetilde\varphi(a)=\varphi(U^*(a\otimes I_L)U),
\qquad
\widetilde\psi(b)=\psi(U^*(I_K\otimes b)U)
$$

と定めます。ユニタリ共役および $a\mapsto a\otimes I_L$、$b\mapsto I_K\otimes b$ は正規な*-同型なので、これらはそれぞれ $A,B$ 上の正規状態です。

[準備補題](#lem-aqft17-normal-state-lift)を $A\subset B(K)$ と $B\subset B(L)$ に適用すると、正のtrace class作用素 $D_K,D_L$ が存在して

$$
\operatorname{Tr}(D_K)=\operatorname{Tr}(D_L)=1,
\qquad
\widetilde\varphi(a)=\operatorname{Tr}(D_Ka),
\quad
\widetilde\psi(b)=\operatorname{Tr}(D_Lb)
$$

を満たします。各密度作用素を非負固有値で展開します。

$$
D_K=\sum_i p_i|k_i\rangle\langle k_i|,
\quad
D_L=\sum_j q_j|l_j\rangle\langle l_j|,
\qquad
\sum_i p_i=\sum_jq_j=1.
$$

$K\otimes L$ 上の作用素

$$
D=D_K\otimes D_L
=\sum_{i,j}p_iq_j
|k_i\otimes l_j\rangle\langle k_i\otimes l_j|
$$

は正のtrace class作用素であり、非負項の級数から

$$
\operatorname{Tr}(D)
=\sum_{i,j}p_iq_j
=\left(\sum_i p_i\right)\left(\sum_jq_j\right)=1.
$$

[VN5の密度作用素・正規状態の対応](../../VN/VN5/index.md#thm-vn5-density-state-correspondence)により

$$
\widehat\omega(T)=\operatorname{Tr}(D\,UTU^*)
\qquad(T\in B(H))
$$

は $B(H)$ 上の正規状態です。これを $M_1\vee M_2'$ に制限して $\omega$ と呼びます。$x\in M_1$、$y\in M_2'$ なら、それぞれ $UxU^*=a\otimes I_L$、$UyU^*=I_K\otimes b$ なので

$$
\begin{aligned}
\omega(xy)
&=\operatorname{Tr}(D(a\otimes b))\\
&=\sum_{i,j}p_iq_j
\langle k_i,ak_i\rangle
\langle l_j,bl_j\rangle\\
&=\left(\sum_i p_i\langle k_i,ak_i\rangle\right)
\left(\sum_jq_j\langle l_j,bl_j\rangle\right)\\
&=\widetilde\varphi(a)\widetilde\psi(b)
=\varphi(x)\psi(y).
\end{aligned}
$$

最後の和の分離は、絶対値の合計が $\|a\|\|b\|\sum_{i,j}p_iq_j<\infty$ であるため正当です。制限先はvon Neumann環なので正規性も保たれます。これで与えた二状態の積延長を構成できました。$\square$
<!-- proof-end -->

重要なのは、**任意の二状態に対して少なくとも一つ**の積延長が存在することです。延長の一意性、もとの真空の積性、あるいは緩衝幅を0にした極限での延長の存在は含まれません。

### 領域の外側で使う場合

[AQFT9の局所性](../AQFT9/index.md#thm-aqft9-isotony-locality)のもとで、$O_1\Subset O_2$ の包含がsplitとします。$Q$ が $O_2$ と空間的に分離していれば $M(Q)\subset M(O_2)'$。与えた $M(O_1)$ と $M(Q)$ の正規状態をそれぞれ前定理へ入力するには、後者を $M(O_2)'$ 上へ正規に延長してから制限すればよい。その延長は[準備補題](#lem-aqft17-normal-state-lift)を $M(Q)\subset B(H)$ に適用して $B(H)$ 上へ正に延長し、$M(O_2)'$ に制限することで得られます。Haag双対性は使いません。

## 3. 積状態は真空の特徴でも、唯一の結合状態でもない

二つの量子ビットの例で周辺状態をどちらも $I_2/2$ とします。積延長は $I_4/4$ です。一方、$|0\rangle,|1\rangle$ を標準基底として

$$
|\Phi\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2},
\qquad
\rho_{\mathrm{ent}}=|\Phi\rangle\langle\Phi|
$$

も正規状態を与えます。任意の $2\times2$ 行列 $a$ について

$$
\langle\Phi,(a\otimes I)\Phi\rangle
=\frac12(\langle0,a0\rangle+\langle1,a1\rangle)
=\frac12\operatorname{Tr}(a)
$$

であり、右側についても同じです。ところが $z=\operatorname{diag}(1,-1)$ とすると

$$
\operatorname{Tr}((I_4/4)(z\otimes z))=0,
\qquad
\langle\Phi,(z\otimes z)\Phi\rangle=1.
$$

**同じ周辺状態でも、結合状態には相関のあるものと積状態の双方があり得ます**。splitは相関の不在を強制せず、独立な準備の**可能性**を保証します。Type IIIの局所環をType Iに変えるという主張でもありません。

また、単なる可換性だけで積状態延長が存在するとは限りません。[AQFT16の極大可換環の反例](../AQFT16/index.md#prop-aqft16-commutation-not-split)で $P=Q=D$ とし、同じ $D$ に対する異なる正規状態 $\varphi\ne\psi$ を指定すると、積の式へ $x=I$ と $y=I$ を代入して得る周辺条件が矛盾します。例えば $D$ の射影 $p=M_{\mathbf1_{[0,1/2]}}$ に $\varphi(p)=1$、$\psi(p)=0$ を割り当てれば、延長 $\omega(p)$ は同時に $1$ と $0$ にはなれません。可換であるというだけでは二つの環の共通部分の整合性さえ保証しないのです。

## 4. エネルギーを抑えた局所ベクトル

splitを**仮定する**だけでなく、成立を模型から判定するには何が必要でしょうか。真空 $\Omega$ と時間並進生成子 $H_{\mathrm{en}}\ge0$ を持つ正エネルギー表現を考えます。ここで $H_{\mathrm{en}}$ はHilbert空間の記号 $H$ と区別するため、エネルギー作用素に添字を付けています。[AQFT3のスペクトル条件](../AQFT3/index.md#def-aqft3-spectrum)と[AQFT8のFock真空の正エネルギー](../AQFT8/index.md#thm-aqft8-vacuum-spectrum)を土台とします。真空の正規化は $\|\Omega\|=1$、不変性は $H_{\mathrm{en}}\Omega=0$ です。

有界領域 $O$ の観測量 $x\in M(O)$ を真空へ作用させれば $x\Omega$ ができます。ただし高エネルギー成分まで無制限に数えるのは適切でありません。スペクトル計算で定まる $e^{-\beta H_{\mathrm{en}}}$（$\beta>0$）を作用させ、エネルギー $E$ の成分に重み $e^{-\beta E}$ を与えます。

核性を定義する前に、写像の**定義域はBanach空間、値域はHilbert空間**である点を確認します。有限次元行列のtrace classと同じ言葉を、作用先を確かめずに同一視してはいけません。

<a id="def-aqft17-nuclear-map"></a>

<!-- formal-statement-start -->
> **定義（Banach空間からHilbert空間への核写像）**  
> $X$ を複素Banach空間、$Y$ を複素Hilbert空間とする。有界線形写像 $T:X\to Y$ が**核写像**（nuclear map）であるとは、連続線形汎関数 $f_j\in X^*$ とベクトル $\xi_j\in Y$ を用いて、全ての $x\in X$ で
>
$$
T(x)=\sum_{j\ge1}f_j(x)\xi_j,
\qquad
\sum_{j\ge1}\|f_j\|\,\|\xi_j\|<\infty
$$
>
> と書けることをいう。このような表示に対する右辺の和の下限を核ノルム $\|T\|_1$ とする。ここでの $\|\cdot\|_1$ は、Hilbert空間上のtrace class作用素だけに付ける記号ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft17-nuclear-map -->
### 直接例：二つの減衰モード

$X=\mathbb C^2$ に $\|(z_1,z_2)\|_\infty=\max(|z_1|,|z_2|)$、$Y=\mathbb C^2$ にEuclidノルムを入れます。$\varepsilon_1,\varepsilon_2\ge0$、$\beta>0$ として

$$
T_\beta(z_1,z_2)=
(e^{-\beta\varepsilon_1}z_1,e^{-\beta\varepsilon_2}z_2)
$$

を考えます。座標評価 $f_j(z)=z_j$ は $\|f_j\|=1$。$Y$ の標準基底を $e_j$ と置けば

$$
T_\beta(z)
=f_1(z)e^{-\beta\varepsilon_1}e_1
+f_2(z)e^{-\beta\varepsilon_2}e_2.
$$

この表示で必要な和は

$$
\sum_{j=1}^{2}\|f_j\|\,
\|e^{-\beta\varepsilon_j}e_j\|
=e^{-\beta\varepsilon_1}+e^{-\beta\varepsilon_2}<\infty.
$$

従って定義を実際に満たし、$\|T_\beta\|_1\le e^{-\beta\varepsilon_1}+e^{-\beta\varepsilon_2}$ です。**上界を与えただけで、核ノルムがこの和に等しいとは主張していません**。有限モードなら自動的に有限ですが、無限個のモードでは和の収束が問題になります。
<!-- definition-example-end -->

<a id="prop-aqft17-nuclear-compact"></a>

<!-- formal-statement-start -->
> **命題（核写像はコンパクトである）**  
> $X$ をBanach空間、$Y$ をHilbert空間とする。定義に従って核表示できる $T:X\to Y$ はコンパクト写像である。すなわち $X$ の単位球の像は $Y$ で相対コンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

核表示を第 $n$ 項までで打ち切ると有限ランク写像になります。残りのノルムは、核表示の絶対収束する尾で支配されます。

<!-- proof-start -->
### 証明

核表示 $T(x)=\sum_jf_j(x)\xi_j$ を取り、

$$
T_n(x)=\sum_{j=1}^{n}f_j(x)\xi_j
$$

と置きます。$T_n$ の像は $\operatorname{span}\{\xi_1,\ldots,\xi_n\}$ に含まれるため有限ランクです。$\|x\|_X\le1$ なら、連続汎関数の評価と三角不等式から

$$
\begin{aligned}
\|(T-T_n)x\|_Y
&\le\sum_{j>n}|f_j(x)|\,\|\xi_j\|_Y\\
&\le\sum_{j>n}\|f_j\|\,\|x\|_X\,\|\xi_j\|_Y\\
&\le\sum_{j>n}\|f_j\|\,\|\xi_j\|.
\end{aligned}
$$

核性の仮定により右端は $n\to\infty$ で0へ収束するので $\|T-T_n\|_{\mathrm{op}}\to0$。有限ランク写像の単位球像は有限次元有界集合なので相対コンパクトで、コンパクト写像の作用素ノルム極限もコンパクトです。$\square$
<!-- proof-end -->

核性はコンパクト性より強い制約です。有限ランクで近似できるだけでなく、近似項の大きさを**絶対総和**で支配するからです。

<a id="def-aqft17-energy-nuclearity"></a>

<!-- formal-statement-start -->
> **定義（Buchholz–Wichmann型のエネルギー核性写像）**  
> $O$ を有界なMinkowski領域、$M(O)\subset B(H)$ を固定した表現の局所von Neumann環、$\Omega\in H$ を単位真空ベクトル、$H_{\mathrm{en}}\ge0$ を自己共役な時間並進生成子とする。$\beta>0$ に対して
>
$$
\Theta_{\beta,O}:
(M(O),\|\cdot\|_{\mathrm{op}})\longrightarrow H,
\qquad
\Theta_{\beta,O}(x)=e^{-\beta H_{\mathrm{en}}}x\Omega
$$
>
> を**エネルギー減衰写像**と呼ぶ。各 $\beta>0$ についてこれが核写像になることを**定性的エネルギー核性**と呼ぶ。splitの十分条件に使うBuchholz–Wichmann型の核性条件では、さらに小さな $\beta$ における $\|\Theta_{\beta,O}\|_1$ の増大に定量的上界を課す。
<!-- formal-statement-end -->

作用素指数は $H_{\mathrm{en}}\ge0$ により有界で $\|e^{-\beta H_{\mathrm{en}}}\|\le1$、また $\|x\Omega\|\le\|x\|$ なので $\|\Theta_{\beta,O}(x)\|\le\|x\|$。核性はこの**有界性より強い別条件**です。

<!-- definition-example-start: def-aqft17-energy-nuclearity -->
### 定義の確認：二水準のエネルギー減衰

$H=\mathbb C^2$、$H_{\mathrm{en}}=\operatorname{diag}(0,\varepsilon)$（$\varepsilon>0$）、$\Omega=e_1$ とし、局所代数の代わりに模型の代数 $M=M_2(\mathbb C)$ を使います。$x=(x_{ij})$ なら

$$
x\Omega=(x_{11},x_{21})^T,\qquad
e^{-\beta H_{\mathrm{en}}}x\Omega
=(x_{11},e^{-\beta\varepsilon}x_{21})^T.
$$

行列要素汎関数 $f_1(x)=x_{11}$、$f_2(x)=x_{21}$ はどちらも作用素ノルムに関してノルム $1$ です。標準基底を $\xi_1=e_1$、$\xi_2=e^{-\beta\varepsilon}e_2$ と取れば核表示ができ、

$$
\|\Theta_{\beta,M}\|_1\le1+e^{-\beta\varepsilon}.
$$

定義域がBanach空間、値域がHilbert空間、$H_{\mathrm{en}}\ge0$、真空の規格化、指数による減衰と核表示の和をすべて確認しました。ただしこの二水準模型は**共変なMinkowski局所netではない**ので、相対論的split propertyを証明した例ではありません。
<!-- definition-example-end -->

## 5. 自由場のモードを実際に数える

自由スカラー場の一粒子エネルギーは[AQFT8の正周波数表示](../AQFT8/index.md#def-aqft8-positive-frequency)と同じ分散関係

$$
\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}
$$

を満たします。局所netの厳密な核性を一足飛びに結論する代わりに、まず空間を一辺 $L>0$ の周期箱とした**比較模型**を計算します。$m>0$ として零エネルギーのモードを避けます。

空間運動量は $\boldsymbol p_{\boldsymbol n}=2\pi\boldsymbol n/L$（$\boldsymbol n\in\mathbb Z^3$）です。一粒子空間 $\ell^2(\mathbb Z^3)$ 上で

$$
h e_{\boldsymbol n}
=\omega_{\boldsymbol n}e_{\boldsymbol n},
\qquad
\omega_{\boldsymbol n}
=\sqrt{m^2+(2\pi/L)^2|\boldsymbol n|^2}.
$$

$a=2\pi\beta/(L\sqrt3)>0$、$q=e^{-a}\in(0,1)$ と置きます。Cauchy–Schwarz不等式から

$$
|\boldsymbol n|_1=|n_1|+|n_2|+|n_3|
\le\sqrt3|\boldsymbol n|
$$

なので、$\omega_{\boldsymbol n}\ge(2\pi/L)|\boldsymbol n|\ge(2\pi/(L\sqrt3))|\boldsymbol n|_1$ です。従って

$$
\begin{aligned}
\operatorname{Tr}(e^{-\beta h})
&=\sum_{\boldsymbol n\in\mathbb Z^3}
e^{-\beta\omega_{\boldsymbol n}}\\
&\le\sum_{n_1,n_2,n_3\in\mathbb Z}
q^{|n_1|+|n_2|+|n_3|}\\
&=\left(\sum_{k\in\mathbb Z}q^{|k|}\right)^3
=\left(1+2\sum_{k\ge1}q^k\right)^3\\
&=\left(\frac{1+q}{1-q}\right)^3<\infty.
\end{aligned}
$$

したがって $e^{-\beta h}$ は周期箱内の一粒子空間上で正のtrace class作用素です。自由ボースFock空間で真空エネルギーを0に正規化した $d\Gamma(h)$ を取ると、各モードの占有数 $r=0,1,2,\ldots$ から

$$
Z_L(\beta):=\operatorname{Tr}(e^{-\beta d\Gamma(h)})
=\prod_{\boldsymbol n\in\mathbb Z^3}
\left(\sum_{r=0}^{\infty}e^{-\beta r\omega_{\boldsymbol n}}\right)
=\prod_{\boldsymbol n\in\mathbb Z^3}
(1-e^{-\beta\omega_{\boldsymbol n}})^{-1}
$$

を得ます。無限積が有限値へ収束することも確認します。$0\le x\le e^{-\beta m}<1$ に対し

$$
-\log(1-x)=\sum_{r\ge1}\frac{x^r}{r}
\le\sum_{r\ge1}x^r
=\frac{x}{1-x}
\le\frac{x}{1-e^{-\beta m}}
$$

なので

$$
0\le\log Z_L(\beta)
\le\frac{1}{1-e^{-\beta m}}
\sum_{\boldsymbol n}e^{-\beta\omega_{\boldsymbol n}}
<\infty.
$$

この証明は、無限個のモードがあっても固定された $L,m,\beta>0$ ではエネルギー減衰の下で状態数を制御できる、という**有限体積模型の主張**です。

### 無限体積へ移すとどこが壊れるか

無限空間の一粒子空間 $L^2(\mathbb R^3,d^3p)$ では、$e^{-\beta h}$ は $e^{-\beta\sqrt{|\boldsymbol p|^2+m^2}}$ を掛ける作用素です。$|\boldsymbol p|\le1$ の球内に互いに直交する正規化関数 $f_j$ を無限個取れます。この球上で減衰係数は $c=e^{-\beta\sqrt{1+m^2}}>0$ 以上なので

$$
\|e^{-\beta h}f_i-e^{-\beta h}f_j\|
\ge c\|f_i-f_j\|=c\sqrt2
\qquad(i\ne j).
$$

よって単位球像には収束部分列がなく、$e^{-\beta h}$ は**コンパクトでさえありません**。ましてtrace classとは言えません。一粒子の運動量積分

$$
\int_{\mathbb R^3}e^{-\beta|\boldsymbol p|}\,d^3p
=4\pi\int_0^\infty r^2e^{-\beta r}\,dr
=\frac{8\pi}{\beta^3}
$$

が有限であることだけから、連続運動量表示の乗法作用素がtrace classになる、と推論してはいけません。

局所nuclearityは、**局所代数の単位球から作る** $\Theta_{\beta,O}$ を調べる条件です。全空間の $e^{-\beta H_{\mathrm{en}}}$ のtrace class性と混同しない点こそ、位相空間の議論へ進む入口です。

## 6. nuclearityからsplitを得る発展定理の適用境界

定性的な核性だけで済ませず、エネルギー減衰を弱くする $\beta\downarrow0$ での核ノルムの増大を制御する必要があります。よく用いるBuchholz–Wichmann型の定量的条件では、各有界領域 $O$ ごとに定数 $C_O,s_O,\beta_O>0$ を選び、

$$
\|\Theta_{\beta,O}\|_1
\le\exp(C_O\beta^{-s_O}),
\qquad 0<\beta<\beta_O
$$

のような上界を要求します。これは**核写像の定義から導かれる式ではなく、模型ごとに検証する追加仮定**です。

<a id="ref-aqft17-nuclearity-split-literature"></a>

<!-- formal-statement-start -->
> **発展定理（Buchholz–Wichmann型核性からsplitへ：文献結果、ここでは証明しない）**  
> 四次元Minkowski時空上の標準的な局所可観測量netについて、局所性と包含単調性、強連続な時空並進共変性、正エネルギー条件、不変真空を持つ真空表現を仮定する。さらに全ての有界な局所領域に対し、Buchholz–Wichmannのエネルギー核性条件（核写像性に加え、十分な定量的核ノルム上界）および原定理で要請する領域族の正則性を満たすとする。このとき正の緩衝領域を持つ適切なdouble coneの対 $O_1\Subset O_2$ について
>
$$
M(O_1)\subset N\subset M(O_2)
$$
>
> となるType I中間因子 $N$ が存在する。したがって当該包含はsplitである。
<!-- formal-statement-end -->

この含意は本章の前節までの計算から**証明されたわけではありません**。適用するには、対象netの共変表現と局所環を確定し、$\Theta_{\beta,O}$ 自体の核表示と必要な**定量的**上界を確かめ、原論文の幾何学的分離条件と照合します。有限箱の $Z_L(\beta)<\infty$ だけでは十分ではありません。

一次文献は D. Buchholz and E. H. Wichmann, [“Causal Independence and the Energy-Level Density of States in Local Quantum Field Theory”](https://doi.org/10.1007/BF01454978), *Communications in Mathematical Physics* **106** (1986), 321–344 です。核性・splitの一般的な作用素環構造と変種には D. Buchholz, C. D'Antoni and R. Longo, [“Nuclear Maps and Modular Structures. II”](https://lqp2.org/node/940), *Communications in Mathematical Physics* **129** (1990), 115–138 も参照します。ここでの条件表示は代表的な核性条件の見取り図であり、論文中の厳密な対象領域・一様性の条件を省略して独立に適用するためのチェックリストではありません。

前節の自由スカラーの周期箱は、**なぜエネルギー減衰によって自由度を数えやすくなるか**を示す例です。相対論的自由場netでの $\Theta_{\beta,O}$ の核ノルム評価は局所化された一粒子部分空間やFock空間の解析を必要とし、その本格的証明は上記一次文献の射程です。

## 7. 演習と詳細解答

### Level A：状態・核写像・減衰を判定する

<a id="ex-aqft17-a01"></a>
#### AQFT17-A01 混合状態の積の期待値

$D=\operatorname{diag}(3/4,1/4)$、$E=\operatorname{diag}(2/5,3/5)$ とし、$a=\operatorname{diag}(1,-1)$、$b=\operatorname{diag}(2,0)$ とする。$D,E$ が密度作用素であることを確認し、$\operatorname{Tr}((D\otimes E)(a\otimes b))$ を積の形と直接の対角和の双方から求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $D,E$ の対角成分は非負で、$\operatorname{Tr}D=3/4+1/4=1$、$\operatorname{Tr}E=2/5+3/5=1$ です。[密度作用素の定義](../../VN/VN5/index.md#def-vn5-density-operator)を満たします。

$$
\operatorname{Tr}(Da)=\frac34-\frac14=\frac12,
\qquad
\operatorname{Tr}(Eb)=\frac25\cdot2+\frac35\cdot0=\frac45.
$$

積からは $(1/2)(4/5)=2/5$。直接には $D\otimes E$ の固有重みは $3/10,9/20,1/10,3/20$、$a\otimes b$ の対角成分は $2,0,-2,0$ なので

$$
\operatorname{Tr}((D\otimes E)(a\otimes b))
=\frac3{10}\cdot2+\frac1{10}\cdot(-2)=\frac25.
$$

両方が一致し、[積状態の定義](#def-aqft17-normal-product-extension)の具体的な式を確かめました。
<!-- solution-end -->

<a id="ex-aqft17-a02"></a>
#### AQFT17-A02 核表示の総和の検査

$X=(\mathbb C^3,\|\cdot\|_\infty)$、$Y=(\mathbb C^3,\|\cdot\|_2)$ とする。$T(z_1,z_2,z_3)=(z_1,z_2/2,z_3/4)$ が核写像であることを、座標評価汎関数を使って確かめ、核ノルムの上界を与えよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $f_j(z)=z_j$ は $|f_j(z)|\le\|z\|_\infty$ で、$z=e_j$ により等号を達成するため $\|f_j\|=1$。$Y$ の標準基底を $e_j$ とすると

$$
T(z)=f_1(z)e_1+f_2(z)\frac{e_2}{2}
+f_3(z)\frac{e_3}{4}.
$$

各ベクトルのノルムは $1,1/2,1/4$ です。したがって核表示の総和は

$$
1+\frac12+\frac14=\frac74<\infty.
$$

[核写像の定義](#def-aqft17-nuclear-map)から $T$ は核写像で $\|T\|_1\le7/4$。この表示の和を計算しており、核ノルムの最小性までは証明していません。
<!-- solution-end -->

<a id="ex-aqft17-a03"></a>
#### AQFT17-A03 エネルギー減衰の二水準例

$H=\mathbb C^2$、$H_{\mathrm{en}}=\operatorname{diag}(0,\log2)$、$\Omega=e_1$、$x=\begin{pmatrix}1&0\\3&0\end{pmatrix}$、$\beta=1$ とする。$\Theta_{\beta}(x)$ とそのノルムを求め、$\|\Theta_\beta(x)\|\le\|x\|$ を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $x\Omega=(1,3)^T$ で、対角指数は

$$
e^{-H_{\mathrm{en}}}=\operatorname{diag}(1,e^{-\log2})
=\operatorname{diag}(1,1/2).
$$

従って

$$
\Theta_1(x)=(1,3/2)^T,
\quad
\|\Theta_1(x)\|=\sqrt{1+9/4}=\frac{\sqrt{13}}2.
$$

$x$ は $(u,v)\mapsto u(1,3)$ の階数1作用素なので、$\|x\|=\sqrt{1+9}=\sqrt{10}$。$13/4\le10$ から $\sqrt{13}/2\le\sqrt{10}$。これは作用素指数の収縮性による一般評価と一致します。
<!-- solution-end -->

<a id="ex-aqft17-a04"></a>
#### AQFT17-A04 一次元格子の減衰和

$q\in(0,1)$ として $\sum_{n\in\mathbb Z}q^{|n|}$ を求め、その3乗が有限である理由を示せ。この式が周期箱模型のどの評価に使われたか説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 正負の整数を分けると

$$
\sum_{n\in\mathbb Z}q^{|n|}
=1+\sum_{n=1}^\infty q^n+\sum_{n=1}^\infty q^n
=1+\frac{2q}{1-q}
=\frac{1+q}{1-q}.
$$

$0<q<1$ なので分母は正で有限です。3座標について各々非負項の和を取れば

$$
\sum_{(n_1,n_2,n_3)\in\mathbb Z^3}
q^{|n_1|+|n_2|+|n_3|}
=\left(\frac{1+q}{1-q}\right)^3<\infty.
$$

これは $\omega_{\boldsymbol n}\ge(2\pi/(L\sqrt3))|\boldsymbol n|_1$ から得た $e^{-\beta\omega_{\boldsymbol n}}$ の上界の総和です。エネルギーの実際の総和との**等号**ではなく上界です。
<!-- solution-end -->

### Level B：構成を組み合わせる

<a id="ex-aqft17-b01"></a>
#### AQFT17-B01 四因子の非純粋な周辺状態

$H=\bigotimes_{j=1}^4H_j$、各 $H_j=\mathbb C^2$ とする。$M_1=B(H_1)\otimes I_{234}$、$M_2=B(H_1\otimes H_2\otimes H_3)\otimes I_4$ とし、$N=B(H_1\otimes H_2)\otimes I_{34}$ を中間因子とする。$H_1$ 上の密度作用素 $D_1$ と $H_4$ 上の密度作用素 $D_4$ を任意に選んだとき、$M_1$ と $M_2'$ の正規積状態延長を一つ構成し、積の式を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $M_1\subset N\subset M_2$ はテンソル因子の追加だけで従い、$N$ は全行列環の増幅なので[Type I因子の空間的表示](../AQFT16/index.md#thm-aqft16-typei-spatial-form)に合います。$M_2'=I_{123}\otimes B(H_4)$。$H_2,H_3$ の単位ベクトル $u_2,u_3$ を選び、

$$
D=D_1\otimes|u_2\rangle\langle u_2|
\otimes|u_3\rangle\langle u_3|\otimes D_4
$$

と置きます。各因子は正でトレース1、したがって $D$ も正でトレース1です。[密度作用素・正規状態の対応](../../VN/VN5/index.md#thm-vn5-density-state-correspondence)より $\omega(T)=\operatorname{Tr}(DT)$ は正規状態になります。

$x=a\otimes I_{234}$、$y=I_{123}\otimes b$ とすると

$$
\begin{aligned}
\omega(xy)
&=\operatorname{Tr}(D_1a)\,
\operatorname{Tr}(|u_2\rangle\langle u_2|)\,
\operatorname{Tr}(|u_3\rangle\langle u_3|)\,
\operatorname{Tr}(D_4b)\\
&=\operatorname{Tr}(D_1a)\operatorname{Tr}(D_4b).
\end{aligned}
$$

二つの真ん中の因子は各々1です。従って与えた周辺状態の積延長になっています。$D_1,D_4$ を階数1に限る必要はありません。
<!-- solution-end -->

<a id="ex-aqft17-b02"></a>
#### AQFT17-B02 相関のある延長と積延長を区別する

$H=\mathbb C^2\otimes\mathbb C^2$ で $\rho_{\mathrm{prod}}=I_4/4$、$\rho_{\mathrm{ent}}=|\Phi\rangle\langle\Phi|$、$|\Phi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とする。双方の左右の周辺状態を求め、$z=\operatorname{diag}(1,-1)$ に対する $z\otimes z$ の期待値を比較し、splitが真空の積性を保証しない理由を説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $a\in M_2(\mathbb C)$ について、積状態の周辺は

$$
\operatorname{Tr}((I_4/4)(a\otimes I))
=\frac14\operatorname{Tr}(a)\operatorname{Tr}(I_2)
=\frac12\operatorname{Tr}(a).
$$

Bellベクトルでは交差項が左右の直交性によって消えて

$$
\langle\Phi,(a\otimes I)\Phi\rangle
=\frac12(\langle0,a0\rangle+\langle1,a1\rangle)
=\frac12\operatorname{Tr}(a).
$$

右側でも同じ計算が成り立ち、双方の周辺状態は $I_2/2$ です。一方、$\operatorname{Tr}(z)=0$ なので積状態は

$$
\operatorname{Tr}((I_4/4)(z\otimes z))
=\frac14\operatorname{Tr}(z)^2=0.
$$

Bellベクトルでは $(z\otimes z)|00\rangle=|00\rangle$、$(z\otimes z)|11\rangle=|11\rangle$ なので期待値は $1$。splitの結論は[積状態延長定理](#thm-aqft17-normal-product-extension)による**存在**であり、指定済みの状態を積状態へ変化させる主張ではありません。
<!-- solution-end -->

<a id="ex-aqft17-b03"></a>
#### AQFT17-B03 核表示から有限ランク近似の誤差を作る

$X$ をBanach空間、$Y$ をHilbert空間とし、$T(x)=\sum_{j\ge1}f_j(x)\xi_j$ で $\|f_j\|\|\xi_j\|\le 3^{-j}$ とする。$T_n=\sum_{j=1}^nf_j(\cdot)\xi_j$ のrankと $\|T-T_n\|_{\mathrm{op}}$ の上界を求め、$T$ のコンパクト性を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $T_nx$ は $\xi_1,\ldots,\xi_n$ の線形結合なので $\operatorname{rank}T_n\le n$ です。$\|x\|_X\le1$ に対して

$$
\|(T-T_n)x\|
\le\sum_{j>n}|f_j(x)|\|\xi_j\|
\le\sum_{j>n}\|f_j\|\|\xi_j\|
\le\sum_{j=n+1}^{\infty}3^{-j}.
$$

等比級数を展開すると

$$
\sum_{j=n+1}^{\infty}3^{-j}
=\frac{3^{-(n+1)}}{1-1/3}
=\frac{1}{2\cdot3^n}.
$$

従って $\|T-T_n\|_{\mathrm{op}}\le1/(2\cdot3^n)\to0$。有限ランク写像はコンパクトで、その作用素ノルム極限もコンパクトです。[核写像のコンパクト性](#prop-aqft17-nuclear-compact)の核心を具体的な誤差で再構成しました。
<!-- solution-end -->

<a id="ex-aqft17-b04"></a>
#### AQFT17-B04 周期箱のFock分配関数の収束

$m,L,\beta>0$、$\omega_{\boldsymbol n}=\sqrt{m^2+(2\pi/L)^2|\boldsymbol n|^2}$ とする。$q=e^{-2\pi\beta/(L\sqrt3)}$ と置き、$\sum_{\boldsymbol n}e^{-\beta\omega_{\boldsymbol n}}$ の有限な上界を与えよ。さらに

$$
Z_L(\beta)=\prod_{\boldsymbol n\in\mathbb Z^3}
(1-e^{-\beta\omega_{\boldsymbol n}})^{-1}
$$

が有限であることを、対数と級数評価から示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 三次元のCauchy–Schwarz不等式で $|\boldsymbol n|_1\le\sqrt3|\boldsymbol n|$。従って

$$
e^{-\beta\omega_{\boldsymbol n}}
\le e^{-\beta (2\pi/L)|\boldsymbol n|}
\le q^{|n_1|+|n_2|+|n_3|}.
$$

3本の等比級数を掛けて

$$
\sum_{\boldsymbol n}e^{-\beta\omega_{\boldsymbol n}}
\le\left(\frac{1+q}{1-q}\right)^3<\infty.
$$

$x_{\boldsymbol n}=e^{-\beta\omega_{\boldsymbol n}}$ と置くと $0<x_{\boldsymbol n}\le e^{-\beta m}<1$。正項級数の展開から

$$
-\log(1-x_{\boldsymbol n})
=\sum_{r\ge1}\frac{x_{\boldsymbol n}^r}{r}
\le\frac{x_{\boldsymbol n}}{1-x_{\boldsymbol n}}
\le\frac{x_{\boldsymbol n}}{1-e^{-\beta m}}.
$$

これを $\boldsymbol n$ について足せば $\log Z_L(\beta)$ は有限の非負値に収まります。従って $1\le Z_L(\beta)<\infty$。$m>0$ は $x_{\boldsymbol n}<1$ をすべてのモードで保証するために使われました。
<!-- solution-end -->

### Level C：二つの独立性を混同しない

<a id="ex-aqft17-c01"></a>
#### AQFT17-C01 split・正規積延長・エネルギー核性の境界

四次元Minkowski時空上の局所von Neumann net $O\mapsto M(O)\subset B(H)$ と、$O_1\Subset O_2$ を考える。$M(O_1)\subset N\subset M(O_2)$ となるType I因子 $N$ が存在し、$Q$ は $O_2$ と空間的に分離しているとする。

1. $M(Q)\subset M(O_2)'$ を導き、$M(O_1)$ と $M(Q)$ の任意の正規状態の積延長を構成するための順序を記せ。
2. 両方の周辺状態が指定されても、もとの真空が積状態であるとは限らないことを二量子ビットの例で説明せよ。
3. 正エネルギー真空 $\Omega$ と生成子 $H_{\mathrm{en}}\ge0$ を追加しても、それだけでは $\Theta_{\beta,O}$ の核性が出ない理由を、$\Theta_{\beta,O}$ の有界性と核性の違いから説明せよ。
4. 周期箱の一粒子トレースが有限であることが、無限体積の局所netでのsplit証明にならない理由を、定義域と作用素の違いから述べよ。

- Level: C

<!-- solution-start -->
**詳細解答。**

**(1)** [AQFT9の局所性](../AQFT9/index.md#thm-aqft9-isotony-locality)を $O_2,Q$ へ適用して $M(Q)\subset M(O_2)'$ を得ます。$M(Q)$ 上に与えた正規状態を[正の持ち上げ補題](#lem-aqft17-normal-state-lift)で $B(H)$ 上へ延長し、$M(O_2)'$ に制限します。内側の正規状態はそのまま使います。この二状態を[split下の積状態延長定理](#thm-aqft17-normal-product-extension)へ入力すると $M(O_1)\vee M(O_2)'$ 上に正規積状態が得られます。最後にこれを $M(O_1)\vee M(Q)$ に制限すれば求める延長です。局所性による**包含**だけを使い、Haag双対性による等号は必要ありません。

**(2)** $P=M_2(\mathbb C)\otimes I$、$Q=I\otimes M_2(\mathbb C)$ では中間Type I因子を明示でき、splitのテンソル形式が成立します。$I_4/4$ とBell状態 $\rho_{\mathrm{ent}}=|\Phi\rangle\langle\Phi|$ の周辺は双方とも $I_2/2$ ですが、$z=\operatorname{diag}(1,-1)$ についてそれぞれ $z\otimes z$ の期待値は $0$ と $1$ です。したがって積延長の**存在**から、任意に指定した状態（例えば真空）が積であるとは結論できません。

**(3)** $H_{\mathrm{en}}\ge0$ から $\|e^{-\beta H_{\mathrm{en}}}\|\le1$、$\|\Omega\|=1$ から

$$
\|\Theta_{\beta,O}(x)\|
=\|e^{-\beta H_{\mathrm{en}}}x\Omega\|
\le\|x\|
$$

です。しかし[核写像の定義](#def-aqft17-nuclear-map)は、それだけでなく $\sum_j\|f_j\|\|\xi_j\|<\infty$ となる表現を要請します。単なる有界性では有限ランク近似も絶対和評価も作れません。局所性・正エネルギー性だけから核性を結論するのは誤りです。

**(4)** 周期箱で示したのは一粒子Hilbert空間 $\ell^2(\mathbb Z^3)$ 上の $e^{-\beta h}$ のtrace class性と、そのFock空間の $Z_L(\beta)$ の有限性です。一方、無限体積の局所nuclearityで問うのは、$M(O)$ を**作用素ノルムを持つBanach空間**とした $\Theta_{\beta,O}:M(O)\to H$ の核性です。両者は定義域から異なります。無限体積の $e^{-\beta h}$ は実際にコンパクトですらありません。従って有限箱の計算から、無限体積でのエネルギー核性ましてsplit propertyは導けません。一般のnuclearityからsplitへの含意には、本章第6節の文献結果が課す定量的・幾何学的仮定が別途必要です。
<!-- solution-end -->

## 8. 到達点と次講

split包含を**仮定**すると、任意の内側・外側正規状態を、正規な積状態として同時に実現できました。核写像の定義・有限ランク近似・自由スカラーの周期箱計算から、エネルギー減衰が自由度の制御にどう関わるかを学びました。一方、**局所核性の定量的評価とnuclearity⇒splitの一般証明はこの計算の外**にあり、その境界を明示しました。

次講AQFT18では局所環の巡回・分離ベクトルから **Tomita作用素** を定義し、$S_0(x\Omega)=x^*\Omega$ がwell-definedで可閉になる条件を追います。
