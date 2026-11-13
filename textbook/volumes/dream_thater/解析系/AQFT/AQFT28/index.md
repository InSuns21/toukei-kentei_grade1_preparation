# AQFT28 局所Type III₁性の適用境界

[AQFT27の自由スカラー場のBisognano–Wichmann定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)により、真空の**右wedge**に付随するモジュラー時間はLorentz boostであると分かりました。しかし、その作用素のスペクトルを計算できても、**局所環の型**まで自動的には決まりません。まして、別の領域であるdouble coneの環へ結果を移すには独立の論拠が必要です。

本講の問いは「**何のスペクトルを測ればType III₁を判定できるか**」「**局所環の普遍的な形を述べるとき何を仮定するか**」です。以下では「その場で証明する計算」「既習定理の適用」「深い文献定理（本講では証明しない）」を区別します。

計量は $(-,+,+,+)$、$c=\hbar=1$ とします。wedgeの具体計算では質量 $m>0$ の実Klein–Gordon自由場の真空Fock表現を用い、一般局所netの分類はその模型から独立の仮定付きの話として扱います。

## 1. 型の細分化には一つの状態では足りない

[AQFT15のType I/II/IIIの判定](../AQFT15/index.md#thm-aqft15-typeiii-no-nsf-trace)は、環の内部に非零の有限射影や忠実・正規・半有限トレースが存在するかを調べます。Type IIIの中にもさらに三つの異なる型があります。その区別には、[AQFT19のモジュラー作用素](../AQFT19/index.md#def-aqft19-modular-operator)の**特定の状態に対するスペクトル**ではなく、状態・重みを変えても残る部分が必要です。

まず「重み」を導入します。状態 $\varphi$ は $\varphi(1)=1$ ですが、無限次元で自然なトレースは $\operatorname{Tr}(1)=\infty$ となる場合があります。そこで正の元について無限値を許します。以下、$M_+$ はvon Neumann環 $M$ の正元全体です。

<a id="def-aqft28-nsf-weight"></a>

<!-- formal-statement-start -->
> **定義（忠実・正規・半有限な重み）**  
> von Neumann環 $M$ 上の重みとは、$\varphi:M_+\to[0,\infty]$ で、正の元の加法性と非負実数倍に関する斉次性を満たす写像である。$\varphi$ は
>
> 1. **忠実**：$\varphi(x)=0,\ x\in M_+$ なら $x=0$、
> 2. **正規**：有界な増大ネット $x_i\uparrow x$ に対して $\varphi(x)=\sup_i\varphi(x_i)$、
> 3. **半有限**：$0\ne x\in M_+$ には $0\ne y\le x$ で $\varphi(y)<\infty$ となる $y$ が存在する
>
> とき、忠実・正規・半有限（n.s.f.）と呼ぶ。さらに $\varphi(ab)=\varphi(ba)$ が意味を持つ有限な積について成り立つ正の線形トレースの場合は、半有限トレースと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft28-nsf-weight -->
### 直接例：行列トレースと無限次元の通常トレース

$M=M_2(\mathbb C)$ で $\tau(x)=\operatorname{Tr}x$ とします。正行列 $x$ の固有値を $\lambda_1,\lambda_2\ge0$ とすれば $\tau(x)=\lambda_1+\lambda_2$。これが0なら二つとも0なので忠実です。有限次元では行列要素と固有値の極限で増大ネットの正規性が従い、$\tau(x)<\infty$ なので $y=x$ として半有限性も確認できます。

$M=B(\ell^2(\mathbb N_0))$ で正作用素の通常トレースを $\tau(x)=\sum_{n\ge0}\langle e_n,xe_n\rangle$ とすると $\tau(1)=\infty$ ですが、$0\ne x\ge0$ には $\langle v,xv\rangle>0$ を満たす $v$ が存在し、$x$ の適切なスペクトル切断を有限次元へ圧縮して有限トレースの非零正元を得られます。したがって正規・忠実・半有限です。有限な**状態**に限定すると、このトレースを候補から落としてしまいます。
<!-- definition-example-end -->

重み $\varphi$ からはGNS型のHilbert空間を作れます。$\mathfrak n_\varphi=\{a:\varphi(a^*a)<\infty\}$ 上の写像 $\Lambda_\varphi$ について

$$
\langle\Lambda_\varphi(a),\Lambda_\varphi(b)\rangle
=\varphi(a^*b)
$$

とし、$a,a^*\in\mathfrak n_\varphi$ の稠密な核で $S_{\varphi,0}\Lambda_\varphi(a)=\Lambda_\varphi(a^*)$ と置きます。[AQFT18のTomita作用素の閉包](../AQFT18/index.md#thm-aqft18-tomita-closable)と同じ仕組みの重み版から、閉包 $S_\varphi$ と正作用素 $\Delta_\varphi=S_\varphi^*S_\varphi$ を得ます。一般のn.s.f.重みでこの構成が正しく機能することは、重み付きTomita–Takesaki理論の既知の定理として用います。これは任意の重みに対する構成の証明をここで済ませたという意味ではありません。

単に $\Delta_\varphi$ の大きなスペクトルを見るのでなく、**すべての重みについて共通するスペクトル値**を取るのが次の定義です。

<a id="def-aqft28-connes-s"></a>

<!-- formal-statement-start -->
> **定義（Connesの $S$ 不変量）**  
> $M$ をvon Neumann環とし、その忠実・正規・半有限重み全体を $\mathcal W_{\mathrm{nsf}}(M)$ とする。各重みの標準モジュラー作用素を $\Delta_\varphi$ として
>
> $$
> S(M)=\bigcap_{\varphi\in\mathcal W_{\mathrm{nsf}}(M)}
> \operatorname{Sp}(\Delta_\varphi)\subset[0,\infty)
> $$
>
> と定める。$\operatorname{Sp}$ は閉作用素の**全スペクトル**（点スペクトルに限定しない）である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft28-connes-s -->
### 直接例：$M_2(\mathbb C)$ と重みを変えたときの違い

$M_2(\mathbb C)$ をHilbert–Schmidt空間に左乗算で表し、忠実な状態 $\varphi_\rho(a)=\operatorname{Tr}(\rho a)$、$\rho=\operatorname{diag}(2/3,1/3)$ を使います。[AQFT20の標準表現の計算](../AQFT20/index.md#thm-aqft20-modular-formula)から $\Delta_\rho=L_\rho R_{\rho^{-1}}$ です。行列単位 $E_{ij}$ に対して

$$
\Delta_\rho E_{ij}=\rho E_{ij}\rho^{-1}
=\frac{p_i}{p_j}E_{ij},\qquad
(p_1,p_2)=(2/3,1/3).
$$

従って $\operatorname{Sp}(\Delta_\rho)=\{1,2,1/2\}$。一方、忠実なトレース状態 $\varphi_{\rm tr}(a)=\frac12\operatorname{Tr}a$ なら $\Delta_{\rm tr}=I$ なので、$S(M_2)\subset\{1\}$。どの忠実な状態でも $\rho^{1/2}$ は $\Delta_\rho$ の固有値1のベクトルであり、有限次元のn.s.f.重みはすべて忠実な正行列で表せるため $1\in S(M_2)$。よって $S(M_2)=\{1\}$ です。**同じ環の中で、一つのモジュラースペクトルは変わっても $S(M)$ は変わりません**。
<!-- definition-example-end -->

<a id="prop-aqft28-spectrum-inclusion"></a>

<!-- formal-statement-start -->
> **命題（一つの状態のスペクトルから分かるのは包含だけ）**  
> $M$ をvon Neumann環とし、$\varphi$ をその忠実・正規・半有限重みとする。このとき
>
> $$
> S(M)\subset\operatorname{Sp}(\Delta_\varphi).
> $$
>
> 特に $\operatorname{Sp}(\Delta_\varphi)=[0,\infty)$ であっても、逆の包含、従って $S(M)=[0,\infty)$ は一般には従わない。
<!-- formal-statement-end -->

### 証明の見取り図

共通部分を取る集合のうち、指定した一つの集合に含まれるという前半は定義の論理です。後半は次節で**Type Iの明示的反例**を作って確かめます。

<!-- proof-start -->
### 証明

$\varphi\in\mathcal W_{\mathrm{nsf}}(M)$ なので、共通部分を作る族の中に $\operatorname{Sp}(\Delta_\varphi)$ が現れます。任意の $x\in S(M)$ はすべての族の要素に属し、特に $x\in\operatorname{Sp}(\Delta_\varphi)$。従って包含が従います。逆包含については $x$ が一つの集合に含まれるだけでは、他の集合にも含まれる根拠がないので、論理的に得られません。実際に失敗する例を次に示します。
<!-- proof-end -->

Connesによる深い分類定理を用いると、**Type III因子**の細分類は次の通りです。これは本講で証明する命題ではなく、以後の適用先を指定するための文献結果です。

<a id="thm-aqft28-connes-classification-literature"></a>

<!-- formal-statement-start -->
> **文献定理（ConnesのType III細分類：証明は本講の範囲外）**  
> $M$ が因子でType IIIであるとき
>
> $$
> \begin{array}{c|c}
> \text{型}&S(M)\\ \hline
> \mathrm{III}_0&\{0,1\}\\
> \mathrm{III}_\lambda\ (0<\lambda<1)&\{0\}\cup\{\lambda^n:n\in\mathbb Z\}\\
> \mathrm{III}_1&[0,\infty)
> \end{array}
> $$
>
> によりType IIIの細分類が定まる。$M$ が半有限因子（Type I/II）なら $S(M)=\{1\}$ である。
<!-- formal-statement-end -->

ここで $\lambda=1/2$ の場合の集合は $\{0,\ldots,1/4,1/2,1,2,4,\ldots\}$ で、$[0,\infty)$ とは異なります。**Type IIIであること**、**Type III₁であること**、**ある状態のモジュラースペクトルが全正半直線であること**は、それぞれ異なる主張です。

## 2. 反例：Type I因子にも「全正半直線」のモジュラースペクトルがある

一つの状態だけから型を読もうとすると、どこで論理が壊れるでしょうか。有限次元ではスペクトルが離散的なので不十分です。そこでType I$_\infty$因子で、無限個の行列単位を使います。

<a id="prop-aqft28-typei-full-modular-spectrum"></a>

<!-- formal-statement-start -->
> **命題（Type I$_\infty$の全モジュラースペクトル反例）**  
> $H=\ell^2(\mathbb N_0^2)$、$M=B(H)$ とする。正規化定数
>
> $$
> Z=\sum_{n,m\ge0}e^{-(n+\sqrt2m)}
> =\frac1{(1-e^{-1})(1-e^{-\sqrt2})}
> $$
>
> を用いて、$H$ 上の忠実な密度作用素を
>
> $$
> \rho e_{n,m}=p_{n,m}e_{n,m},\qquad
> p_{n,m}=Z^{-1}e^{-(n+\sqrt2m)}
> $$
>
> と定める。この状態の標準モジュラー作用素は
>
> $$
> \operatorname{Sp}(\Delta_\rho)=[0,\infty)
> $$
>
> を満たすが、$M$ はType I$_\infty$因子であり $S(M)=\{1\}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

対角密度作用素の標準モジュラー作用は行列単位ごとに固有値の**比**を掛けます。指数の差に整数 $k+\sqrt2\,l$ が現れ、その集合は実数直線で稠密です。一方、環そのものは $B(H)$ で、通常トレースが存在します。

<!-- proof-start -->
### 証明

まず二つの幾何級数は収束するため $0<Z<\infty$。各 $p_{n,m}>0$、$\sum p_{n,m}=1$ なので、$\rho$ は正のトレース級作用素、$\ker\rho=\{0\}$ で忠実な正規状態を定めます。

Hilbert–Schmidt空間の行列単位を $E_{(n,m),(r,s)}=|e_{n,m}\rangle\langle e_{r,s}|$ と書きます。[AQFT20のモジュラー作用素公式](../AQFT20/index.md#thm-aqft20-modular-formula)に従い、$L_\rho R_{\rho^{-1}}$ の自然な定義域の核上で

$$
\begin{aligned}
\Delta_\rho E_{(n,m),(r,s)}
&=\rho E_{(n,m),(r,s)}\rho^{-1}\\
&=\frac{p_{n,m}}{p_{r,s}}E_{(n,m),(r,s)}\\
&=e^{-[(n-r)+\sqrt2(m-s)]}
E_{(n,m),(r,s)}.
\end{aligned}
$$

$n,r,m,s\ge0$ を動かすと差 $n-r=k,\ m-s=l$ は任意の整数 $k,l$ を実現します。従ってこの閉じた正作用素の点スペクトルには $\{e^{-(k+\sqrt2l)}:k,l\in\mathbb Z\}$ が含まれます。

$\sqrt2$ が無理数だから、$G=\mathbb Z+\sqrt2\mathbb Z$ は $\mathbb R$ で稠密です。確認として、無理数 $\alpha$ の整数倍の小数部分は $[0,1]$ で稠密です。もし近接する小数部分を2つ選べば任意に小さい非零の $q\alpha-p$（$p,q\in\mathbb Z$）が得られ、その整数倍で任意の実数を望む精度で近似できます。$e^{-x}$ は連続に $(0,\infty)$ へ写すので固有値集合は $(0,\infty)$ に稠密です。さらに $k\to+\infty$ で固有値は0へ収束します。

スペクトルは閉集合で、$\Delta_\rho$ は正なので $\operatorname{Sp}(\Delta_\rho)\subset[0,\infty)$。以上の二つの包含から $\operatorname{Sp}(\Delta_\rho)=[0,\infty)$ です。なお $0$ は固有値ではなくスペクトルの集積点です。

他方 $M=B(H)$ は階数1射影を持つType I$_\infty$因子です。通常のトレース $\tau=\operatorname{Tr}$ は忠実・正規・半有限であり、その標準モジュラー作用素は恒等作用素、$\operatorname{Sp}(\Delta_\tau)=\{1\}$ です。従って $S(M)\subset\{1\}$。半有限因子についての[Connes分類の文献定理](#thm-aqft28-connes-classification-literature)と合わせ $S(M)=\{1\}$ です。
<!-- proof-end -->

**失われた仮定は何か。** $\operatorname{Sp}(\Delta_\rho)=[0,\infty)$ は**一つの状態**の性質ですが、Type III₁は**すべてのn.s.f.重み**を通して残る不変量による分類です。この反例は両者の差を実際の行列単位で示します。

## 3. 自由スカラー場のwedgeで実際に計算できること

[右wedgeとboost](../AQFT26/index.md#def-aqft26-boost)について、[AQFT27の定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)は次を与えます。

$$
\Delta_{W_R}^{it}=U(\Lambda(-2\pi t)).
$$

ここから $\Delta_{W_R}$ のスペクトルを計算します。定理が対象とするのは**質量 $m>0$ の実自由スカラー場の真空Fock表示**、**右wedge**です。

<a id="prop-aqft28-wedge-modular-spectrum"></a>

<!-- formal-statement-start -->
> **命題（自由スカラー場のwedgeのモジュラースペクトル）**  
> 四次元Minkowski時空の $m>0$ の実自由Klein–Gordon場を真空Fock表現に置く。右wedge $W_R$ の真空標準対 $(\mathcal M(W_R),\Omega)$ に対し
>
> $$
> \operatorname{Sp}(\log\Delta_{W_R})=\mathbb R,
> \qquad
> \operatorname{Sp}(\Delta_{W_R})=[0,\infty).
> $$
>
> ただし、この二つの等式**だけ**から $\mathcal M(W_R)$ のConnes不変量や任意のdouble coneの型を同定することはできない。
<!-- formal-statement-end -->

### 証明の見取り図

rapidity $\theta$ へのユニタリな座標変換ではboostは平行移動です。Fourier変換するとその生成作用素は実数を走る乗算作用素となります。Fock空間には一粒子成分が直和因子として含まれるので、その全実スペクトルがFock生成作用素にも含まれます。最後に指数関数のスペクトル写像を適用します。

<!-- proof-start -->
### 証明

[AQFT27の質量殻測度の計算](../AQFT27/index.md#ex-aqft27-a01)に従って

$$
p^0=\mu_\perp\cosh\theta,\quad
p^1=\mu_\perp\sinh\theta,\quad
\mu_\perp=\sqrt{m^2+|p_\perp|^2}
$$

と置くと、一粒子空間 $\mathfrak h=L^2(\mathbb R^3,d^3p)$ は

$$
L^2(\mathbb R_\theta\times\mathbb R^2_{p_\perp},
d\theta\,d^2p_\perp)
$$

へ $\psi=\sqrt{p^0}h$ によりユニタリに写ります。スカラー場のboostはこの表示で $u(s)\psi(\theta,p_\perp)=\psi(\theta-s,p_\perp)$。$u(s)=e^{isK_1}$ と定義すれば

$$
K_1=i\partial_\theta
$$

（Sobolev定義域上の自己共役作用素）です。$\theta$ のFourier変換の下では $K_1$ は $-\xi$ の乗算となります。

任意の $\lambda\in\mathbb R$ と任意の規格化した $g\in C_c^\infty((-1,1))$、$\|g\|_2=1$ および規格化した $h(p_\perp)$ を選び、Fourier側で

$$
\widehat\psi_N(\xi,p_\perp)=\sqrt N\,
g(N(\xi+\lambda))\,h(p_\perp)
$$

と置きます。このとき $\|\widehat\psi_N\|=1$ で、$|\xi+\lambda|\le N^{-1}$ 上に支持があるため

$$
\|(K_1-\lambda)\psi_N\|^2
=\int|-\xi-\lambda|^2|\widehat\psi_N|^2
\,d\xi\,d^2p_\perp\le N^{-2}.
$$

任意の $\lambda$ に近似固有ベクトルがあるので $\operatorname{Sp}(K_1)=\mathbb R$ です。

Fock boost $U(s)=\Gamma(u(s))=e^{isK_F}$ の生成作用素は、有限粒子の自然な定義域上で $K_F=d\Gamma(K_1)$ と一致します。一粒子成分へ制限すると $K_F|_{\mathfrak h}=K_1$ であるため $\operatorname{Sp}(K_F)$ は $\mathbb R$ を含み、自己共役性から逆も成り立ちます。

[AQFT27の定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)と一意なStone生成作用素により

$$
e^{it\log\Delta_{W_R}}
=\Delta_{W_R}^{it}
=U(-2\pi t)
=e^{-2\pi itK_F}
\quad\Longrightarrow\quad
\log\Delta_{W_R}=-2\pi K_F.
$$

よって $\operatorname{Sp}(\log\Delta_{W_R})=\mathbb R$。正作用素に対するスペクトル写像から

$$
\operatorname{Sp}(\Delta_{W_R})
=\overline{\{e^{-2\pi\lambda}:\lambda\in\mathbb R\}}
=[0,\infty).
$$

$0$ は指数の極限点であり、$\Delta_{W_R}$ が単射であることと矛盾しません。
<!-- proof-end -->

前節のType I反例も**同じ全正半直線のモジュラースペクトル**を持ちました。従って今回のwedge計算で証明したのは $\operatorname{Sp}(\Delta_{W_R})$ の等式であり、

$$
S(\mathcal M(W_R))
=\bigcap_\varphi \operatorname{Sp}(\Delta_\varphi)
$$

の値そのものではありません。wedgeのType III₁性を確定するには、重みを変えても残るスペクトルやそれと同値な追加の構造判定を行う**別の定理**が要ります。

## 4. double coneの型はどこで別の問題になるか

[AQFT9の局所環の定義](../AQFT9/index.md#def-aqft9-local-vn-net)で、double cone $O$ に対して $\mathcal M(O)$ が定まります。$O\subset W_R$ なら[AQFT2の包含公理](../AQFT2/index.md#def-aqft2-isotony)によって $\mathcal M(O)\subset\mathcal M(W_R)$ ですが、**環の包含から因子型は保存されません**。例えば $B(\mathbb C^2)$ には、中心が2次元で因子でない対角環が含まれます。だから包含だけでは、まず因子であることすら保証できません。

一方、[AQFT16のsplit包含](../AQFT16/index.md#def-aqft16-split-inclusion)は $O_1\Subset O_2$ の間にType I因子 $N$ を挟むという性質です。これは**内側の局所環自身がType I**という意味ではありません。[AQFT17のnuclearityからsplitへの文献定理](../AQFT17/index.md#thm-aqft17-nuclearity-split-literature)も、短距離の型分類と区別する必要があります。

型の細分類と「hyperfinite（超有限）」も別の性質です。hyperfiniteとは有限次元部分 *-環で近似できることをいいます。Type III₁かどうかはこの性質だけでは判定できません。

<a id="def-aqft28-hyperfinite"></a>

<!-- formal-statement-start -->
> **定義（hyperfinite von Neumann環）**  
> von Neumann環 $M\subset B(H)$ がhyperfiniteであるとは、有限次元の単位的 *-部分環 $F_1\subset F_2\subset\cdots\subset M$ を選べて、
>
> $$
> M=\left(\bigcup_{n\ge1}F_n\right)''
> $$
>
> となることをいう（ここでは可分に作用する場合を扱う）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft28-hyperfinite -->
### 直接例：$B(\ell^2)$ はhyperfiniteだがType IIIではない

$H=\ell^2(\mathbb N_0)$、$P_n$ を最初の $n$ 個の基底への直交射影とし

$$
F_n=P_nB(H)P_n+\mathbb C(I-P_n)
$$

と置きます。$F_n$ は単位元 $I$ を含む有限次元 *-環です。$n$ を増やすと上左の有限行列ブロックが拡大するため $F_n\subset F_{n+1}$。任意の $A\in B(H)$ について $P_nAP_n$ は $F_n$ に属し、$P_n\to I$ が強作用素収束するので

$$
\|P_nAP_nx-Ax\|
\le\|A\|\|(P_n-I)x\|+\|(P_n-I)Ax\|\longrightarrow0
$$

が全 $x\in H$ で成立します。従って和集合は強作用素稠密です。しかし $B(H)$ は階数1射影を持つType I$_\infty$因子であり、Type IIIではありません。**近似可能性とConnes細分類は独立の問い**です。
<!-- definition-example-end -->

条件の必要性を最小例でも見ます。$H=\mathbb C$ とし、任意の非空領域 $O$ に $\mathcal M(O)=\mathbb C I$ を割り当てる「自明なnet」は包含と局所可換性を満たします。真空は $1$、時空変換は恒等表示で正エネルギーです。任意の $O_1\Subset O_2$ についてType I因子 $N=\mathbb C I$ を選べるのでsplitでもありますが、局所環はType I$_1$です。これは有意な自由場の代わりにはなりませんが、**これらの公理だけからType III₁は出ない**という反例にはなります。

ここで文献上の構造定理の典型的な仮定を整理します。短距離での特定の非自明なスケーリング挙動と、相空間の核性（またはそれが与えるfunnel/split型の近似性）は、それぞれ違う役割を果たします。「スケーリング挙動」とは、局所領域を縮めた際の場・相関・netが**非自明な極限構造**を保つという、単なる共変性より強い条件です。

<a id="thm-aqft28-local-typeiii1-literature"></a>

<!-- formal-statement-start -->
> **文献定理（局所環の普遍的な形：本講では証明しない）**  
> Minkowski真空表現の局所netが、局所可換性・正エネルギー・適切な加法性／内側からの連続性などの標準条件に加えて、**該当する文献定理で指定された相空間核性（funnel/split近似を保証する強さ）**と、**短距離の非自明な漸近的スケール不変性またはそれに代わる所定のスケーリング極限条件**を満たすとする。Buchholz–D’Antoni–FredenhagenおよびFredenhagen等の結果の適用範囲では、double coneの局所環はhyperfinite Type III₁因子 $R_\infty$ とその中心 $Z(\mathcal M(O))$ を用いて
>
> $$
> \mathcal M(O)\simeq
> R_\infty\ \overline\otimes\ Z(\mathcal M(O))
> $$
>
> という形を持つ。特に別途 $\mathcal M(O)$ が**因子**と確かめられれば中心は $\mathbb C I$ であり $\mathcal M(O)\simeq R_\infty$ となる。
>
> この文献定理の仮定は互換な一つの簡単な公理系を意味するものではなく、採用する原論文の定理ごとに正確に照合する必要がある。
<!-- formal-statement-end -->

この結果の完全証明にはスケーリング理論、Connes分類、超有限性の深い結果が必要であり、本講では主張しません。出典と射程は、[Yngvasonの総説](https://arxiv.org/abs/math-ph/0411058)、[Fewster–RejznerのAQFT入門](https://arxiv.org/abs/1904.04051)の局所環の型の節、およびBuchholz–D’Antoni–Fredenhagenの構造結果に従います。たとえば「nuclearity $\Rightarrow$ split」は独立の結論で、**単独で**Type III₁を導くものではありません。

「普遍的」とは、**抽象的な一つの局所因子が同型**という意味です。異なる領域の包含 $\mathcal M(O_1)\subset\mathcal M(O_2)$、真空状態、net全体の配置まで同じになるわけではありません。これは、同じ種類の積木を持っていても組み方が異なれば模型が異なるのと同じです。

## 5. 誤用を避けるための判定表

| 手元にある情報 | そこから言えること | それだけでは言えないこと |
| --- | --- | --- |
| [AQFT27のwedgeのboost等式](../AQFT27/index.md#thm-aqft27-bisognano-wichmann) | 指定した自由場のwedgeのモジュラー群 | 一般netやdouble coneのモジュラー群 |
| [本講のwedgeスペクトル](#prop-aqft28-wedge-modular-spectrum) | $\operatorname{Sp}(\Delta_{W_R})=[0,\infty)$ | $S(\mathcal M(W_R))=[0,\infty)$ |
| 一つの忠実状態の $\operatorname{Sp}(\Delta_\varphi)$ が全正半直線 | Connes不変量の上界としての集合包含 | Type III₁判定（Type I反例あり） |
| [split包含](../AQFT16/index.md#def-aqft16-split-inclusion) | 緩衝領域にType I中間因子がある | 鋭い局所環がType Iであること |
| nuclearityの十分な判定と追加のsplit定理 | 所定のsplit近似・独立性 | 単独でType III₁性 |
| 局所因子性 + 適切な短距離型判定 + 超有限性 | 文献定理の条件内で局所因子が $R_\infty$ と同型 | net全体が一意になること |

特に、Type III局所環での「エントロピーを密度行列で計算できない」という警告は、[AQFT15のトレース障害](../AQFT15/index.md#thm-aqft15-typeiii-no-nsf-trace)を指します。周囲のFock空間にベクトル密度作用素 $|\Omega\rangle\langle\Omega|$ があることとは矛盾しません。これが次講以降で**相対モジュラー作用素**を使う動機になります。

## 6. 演習と詳細解答

### Level A：定義とスペクトルを一つずつ読む

<a id="ex-aqft28-a01"></a>
#### AQFT28-A01 二次元行列のモジュラースペクトル

- Level: A
- 問題：$\rho=\operatorname{diag}(3/4,1/4)$ に対し $\Delta_\rho(E_{ij})$ とその全スペクトルを求めよ。同じ行列環でトレース状態を使うと何が変わるか。

<!-- solution-start -->
**詳細解答。** $p_1=3/4,\ p_2=1/4$ とし、[AQFT20の公式](../AQFT20/index.md#thm-aqft20-modular-formula)を $E_{ij}$ に適用すると $\Delta_\rho E_{ij}=(p_i/p_j)E_{ij}$ です。対角の $E_{11},E_{22}$ は固有値1、$E_{12}$ は3、$E_{21}$ は $1/3$。よって $\operatorname{Sp}(\Delta_\rho)=\{1,3,1/3\}$。トレース状態 $\rho_{\rm tr}=I/2$ では全ての比が1で、$\operatorname{Sp}(\Delta_{\rm tr})=\{1\}$。同じ $M_2$ でも一つの状態のスペクトルは変わりますが、定義による $S(M_2)=\{1\}$ は不変です。
<!-- solution-end -->

<a id="ex-aqft28-a02"></a>
#### AQFT28-A02 n.s.f.重みの三条件

- Level: A
- 問題：$M_2(\mathbb C)$ 上の $\tau(x)=\operatorname{Tr}x$ が忠実・正規・半有限であることを、正行列の固有値を使って一つずつ確認せよ。また $B(\ell^2)$ の通常トレースが状態でない理由を示せ。

<!-- solution-start -->
**詳細解答。** 正行列 $x$ の固有値を $\lambda_1,\lambda_2\ge0$ とすると $\tau(x)=\lambda_1+\lambda_2$ なので $\tau(x)=0\Rightarrow x=0$。行列の正元の増大ネットは有限次元でノルム収束するため、トレースの連続性で $\tau(\sup x_i)=\sup\tau(x_i)$。全ての正行列に有限トレースがあるので、非零 $x$ に $y=x$ を選べます。$B(\ell^2)$ の通常トレースでは $\operatorname{Tr}I=\sum_{n=0}^\infty 1=\infty$ で、状態の規格化 $\varphi(I)=1$ を満たしません。無限値を認める重みとしては利用できます。
<!-- solution-end -->

<a id="ex-aqft28-a03"></a>
#### AQFT28-A03 rapidityとスペクトルの向き

- Level: A
- 問題：$u(s)\psi(\theta)=\psi(\theta-s)$、$u(s)=e^{isK_1}$ とする。$K_1$ を求め、Fourier波 $e^{i\xi\theta}$ 上の形式固有値を調べ、$\Delta^{it}=U(-2\pi t)$ から $\log\Delta$ の符号を決めよ。

<!-- solution-start -->
**詳細解答。** $s=0$ で微分すると $\frac d{ds}u(s)\psi|_{s=0}=-\partial_\theta\psi$。一方 $e^{isK_1}$ の微分は $iK_1\psi$ だから $K_1=i\partial_\theta$。形式的に $K_1e^{i\xi\theta}=-\xi e^{i\xi\theta}$ です（平面波は $L^2$ には入らず、厳密なスペクトルは波束で検証します）。$\Delta^{it}=e^{-2\pi itK_F}$ より $i\log\Delta=-2\pi iK_F$、従って $\log\Delta=-2\pi K_F$。符号を $+2\pi$ に取り替えてはいけません。
<!-- solution-end -->

<a id="ex-aqft28-a04"></a>
#### AQFT28-A04 自明なnetの型とsplit

- Level: A
- 問題：$H=\mathbb C$、$\mathcal M(O)=\mathbb CI$、真空 $\Omega=1$、時空変換 $U(g)=I$ としたとき、包含、局所可換性、正エネルギー、splitを判定し、局所環の型を答えよ。

<!-- solution-start -->
**詳細解答。** $O_1\subset O_2$ のとき $\mathcal M(O_1)=\mathcal M(O_2)$ で包含を満たします。全ての元はスカラーなので空間的に分離した領域間でも可換です。並進生成作用素は0なのでエネルギースペクトルは $\{0\}$、将来光円錐に入ります。$O_1\Subset O_2$ ではType I因子 $N=\mathbb CI$ 自身が $\mathcal M(O_1)\subset N\subset\mathcal M(O_2)$ を満たします。しかし $\mathbb CI\simeq B(\mathbb C)$ はType I$_1$でありType III₁ではありません。従って列挙した仮定だけで局所Type III₁性を証明する試みは破綻します。
<!-- solution-end -->

### Level B：一つの状態と環全体を区別する

<a id="ex-aqft28-b01"></a>
#### AQFT28-B01 Type I反例の正規化と固有値比

- Level: B
- 問題：$p_{n,m}=Z^{-1}e^{-(n+\sqrt2m)}$、$n,m\ge0$ を用い、(i) $Z$ の有限性、(ii) 行列単位上の $\Delta_\rho$ の固有値、(iii) 全正半直線のスペクトルがあってもType III₁でない理由を示せ。

<!-- solution-start -->
**詳細解答。** **(i)** $\sum_n e^{-n}=1/(1-e^{-1})$、$\sum_m e^{-\sqrt2m}=1/(1-e^{-\sqrt2})$ なので $Z$ はこの二つの積で有限です。正の固有値を持つため $\rho$ は忠実です。**(ii)** [Hilbert–Schmidt標準表現の公式](../AQFT20/index.md#thm-aqft20-modular-formula)を添字 $(n,m),(r,s)$ に代入し
$$
\frac{p_{n,m}}{p_{r,s}}
=e^{-[(n-r)+\sqrt2(m-s)]}.
$$
各差は整数全体を走ります。$\mathbb Z+\sqrt2\mathbb Z$ は実数に稠密なので、比の閉包は $[0,\infty)$。**(iii)** 対象環 $B(\ell^2(\mathbb N_0^2))$ は階数1射影を持つType I因子で、忠実・正規・半有限の通常トレースを持ちます。このトレースのモジュラー作用素は $I$ であるため、**全ての重みの共通部分**は一つの状態の全スペクトルとは異なります。
<!-- solution-end -->

<a id="ex-aqft28-b02"></a>
#### AQFT28-B02 Connesの三つの細分類を判定する

- Level: B
- 問題：因子 $M$ がType IIIであることは別途示されたとする。$S(M)$ が (i) $\{0,1\}$、(ii) $\{0\}\cup\{2^n:n\in\mathbb Z\}$、(iii) $[0,\infty)$ の場合の細分類を述べ、(ii) が (iii) でないことを具体的な数で示せ。

<!-- solution-start -->
**詳細解答。** [Connesの分類（文献定理）](#thm-aqft28-connes-classification-literature)で (i) はType III$_0$、(ii) は $\lambda=1/2$ のType III$_{1/2}$（$\{(1/2)^n\}=\{2^n\}$）、(iii) はType III$_1$ です。例えば3は $2^n$（$n\in\mathbb Z$）でなく、0でもないので (ii) の集合に含まれません。一方3は (iii) に含まれます。Type IIIという大分類だけでは(i)–(iii)を区別できません。
<!-- solution-end -->

<a id="ex-aqft28-b03"></a>
#### AQFT28-B03 超有限性を有限ブロックから再構成する

- Level: B
- 問題：$H=\ell^2(\mathbb N_0)$ と $P_n$ に対し $F_n=P_nB(H)P_n+\mathbb C(I-P_n)$ を考える。(i) $F_n\subset F_{n+1}$、(ii) $P_nAP_n\to A$ が強作用素収束、(iii) これからType III性が従わないことを証明せよ。

<!-- solution-start -->
**詳細解答。** **(i)** $F_n$ の元は最初の $n$ 成分への任意の作用と残りへのスカラー作用の直和です。$(n+1)$ 成分を行列ブロックへ含め、残りを同じスカラーにすれば $F_{n+1}$ に入ります。**(ii)** 任意の $x\in H$ について
$$
P_nAP_nx-Ax=P_nA(P_n-I)x+(P_n-I)Ax
$$
だからノルムは $\|A\|\|(P_n-I)x\|+\|(P_n-I)Ax\|\to0$。従って $\bigcup_nF_n$ の強閉包は $B(H)$ 全体です。**(iii)** $B(H)$ に階数1射影がありType I$_\infty$なので、超有限性からType III、ましてType III$_1$を導くことはできません。超有限性とConnes不変量は別に判定します。
<!-- solution-end -->

<a id="ex-aqft28-b04"></a>
#### AQFT28-B04 二つの領域の型を混同しない

- Level: B
- 問題：$O\subset W_R$ で、$\mathcal M(O)\subset\mathcal M(W_R)$ が分かり、さらに $\operatorname{Sp}(\Delta_{W_R})=[0,\infty)$ とする。$\mathcal M(O)$ がType III$_1$因子だと結論するための論証で不足する段階を、少なくとも三つに分けよ。

<!-- solution-start -->
**詳細解答。** 第1に、包含は一般に**中心の自明性**を保存しないので、$\mathcal M(O)$ が因子か確かめる必要があります。第2に、右wedgeはboost不変ですがdouble coneは一般に不変でなく、$\Delta_O$ を $\Delta_{W_R}$ から同定する根拠はありません。第3に、仮に $\operatorname{Sp}(\Delta_O)=[0,\infty)$ が得られても、[一つの重みからの包含命題](#prop-aqft28-spectrum-inclusion)しか分からず、$S(\mathcal M(O))=[0,\infty)$ の証明が要ります。さらにhyperfiniteまで述べるなら、核性等による近似可能性の別の検証が必要です。
<!-- solution-end -->

### Level C：証明した内容と文献上の定理を統合する

<a id="ex-aqft28-c01"></a>
#### AQFT28-C01 wedgeの計算から局所型への「誤った証明」を修正する

- Level: C
- 問題：「自由場のBisognano–Wichmann定理から $\operatorname{Sp}(\Delta_{W_R})=[0,\infty)$、ゆえに全double cone局所環がhyperfinite Type III$_1$である」という主張を検討せよ。(i) 正しい部分を証明し、(ii) Type Iの反例で論理の破綻を示し、(iii) double coneの結論に追加すべき性質とその役割を整理せよ。

<!-- solution-start -->
**詳細解答。** **(i)** 指定された $m>0$ の実自由場では[AQFT27のBisognano–Wichmann定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)が成立します。一粒子boostをrapidity表示にすれば $K_1=i\partial_\theta$、Fourier変換で $-\xi$ の乗算です。従って $\operatorname{Sp}(K_1)=\mathbb R$。Fockの一粒子成分を通して $\operatorname{Sp}(K_F)=\mathbb R$ となり、$\log\Delta_{W_R}=-2\pi K_F$ だから
$$
\operatorname{Sp}(\Delta_{W_R})
=\overline{e^{-2\pi\mathbb R}}=[0,\infty).
$$
ここまでは正しい計算です。

**(ii)** $B(\ell^2(\mathbb N_0^2))$ の忠実状態 $p_{n,m}\propto e^{-(n+\sqrt2m)}$ については[Type I反例](#prop-aqft28-typei-full-modular-spectrum)により全正半直線が同じく得られます。それでも通常トレースが存在するType I因子です。従って「一つのモジュラースペクトルが全正半直線 $\Rightarrow$ Type III$_1$」は偽です。

**(iii)** $\mathcal M(O)$ の因子性、Connes不変量を同定するに足る**短距離の型判定**、超有限性を与える相空間の核性／split近似は別々の役割を持ちます。double coneはboost不変でないためwedgeのモジュラー群を代入できず、包含だけから型を移すこともできません。[局所型の文献定理](#thm-aqft28-local-typeiii1-literature)の**該当する定理の正確な仮定**が整って初めて、中心を含む一般式から因子の場合の $R_\infty$ 同型まで進めます。今回はその深い分類定理の証明自体は行っていません。
<!-- solution-end -->

<a id="ex-aqft28-c02"></a>
#### AQFT28-C02 仮定が一つ欠ける場合の判定

- Level: C
- 問題：あるnetのdouble cone $O$ に対し (i) splitだけ、(ii) 非自明な短距離極限によるType III$_1$の文献判定だけ、(iii) さらに因子性と適切な核性による超有限性、の順に情報が増えるとする。それぞれについて「Type III$_1$」「hyperfinite」「唯一のhyperfinite Type III$_1$因子との同型」のうち何が言えるか。証明した事実と文献依存の部分を区別せよ。

<!-- solution-start -->
**詳細解答。** **(i)** [splitの定義](../AQFT16/index.md#def-aqft16-split-inclusion)は $\mathcal M(O_1)\subset N\subset\mathcal M(O_2)$ というType I中間因子の存在で、鋭い局所環の型を保証しません。実際に本講の自明netはsplitで局所環がType Iです。**(ii)** 採用したスケーリング極限定理のすべての仮定を点検したうえで型判定が適用できれば、その定理が主張するType III$_1$性は得られます。ただしこれだけでhyperfiniteや因子性が得られるという一般論は使えません。**(iii)** 局所因子性により中心は $\mathbb CI$、核性等から超有限性が別途文献定理で成立し、Type III$_1$の判定も満たすなら、可分前双対のhyperfinite Type III$_1$因子の一意性（深い文献結果）で $\mathcal M(O)\simeq R_\infty$。その同型は局所環の抽象的な同型であってnet全体の一致ではありません。欠けた仮定の代わりにwedgeの一状態のスペクトルを使うことはできません。
<!-- solution-end -->

## 7. 次講へ：一つの状態から二状態の比較へ

鋭い局所環がType IIIになり得る以上、局所部分系の密度行列を前提にした部分トレースやvon Neumannエントロピーは、そのままでは一般の局所環の内部操作になりません。[Type IIIのトレース障害](../AQFT15/index.md#thm-aqft15-typeiii-no-nsf-trace)がその理由です。

次のAQFT29では、**二つの忠実な正規状態を比較する相対Tomita作用素**を標準表現から構成します。今回の $\Delta_\varphi$ は一状態のモジュラー作用素でしたが、次には $\Delta_{\sigma\mid\rho}$ の**順序**が重要になります。

### 参考資料

- [J. Yngvason, *The Role of Type III Factors in Quantum Field Theory*](https://arxiv.org/abs/math-ph/0411058)（2005）：局所因子の型、短距離仮定とhyperfiniteな構造結果の適用境界。
- [C. J. Fewster・K. Rejzner, *Algebraic Quantum Field Theory — an introduction*](https://arxiv.org/abs/1904.04051)（2019）：局所環の型、split、nuclearityと模型に依存する結論の区別。
- [A. Connes, *Une classification des facteurs de type III*](https://doi.org/10.24033/asens.1247)（1973）：$S(M)$ を用いるType III分類の原典。
- [D. Buchholz・C. D’Antoni・K. Fredenhagen, *The universal structure of local algebras*](https://doi.org/10.1007/BF01211050)（1987）：相空間・短距離条件を伴う局所環構造の文献結果。
