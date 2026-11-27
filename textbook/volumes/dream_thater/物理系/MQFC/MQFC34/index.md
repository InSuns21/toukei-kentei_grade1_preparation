# MQFC34 局所反項の自由度

前講では[スケーリング次数を保つ延長](../MQFC33/index.md#thm-mqfc33-extension)を構成した。例えば四次元の原点外で定まる核 $|x|^{-4}$ は、全空間への延長にデルタ超関数を足してもスケーリング次数が変わらない。では、同じ原点外の核と同じ次数を与える全ての延長を列挙できるだろうか。

今回は差が原点の有限個の微分値だけを読むことを証明し、許される係数の数を求める。さらに対称性と減算尺度を使って、その自由度がどのように制限され、変化するかを計算する。二点の相対座標 $x$ では原点は二点が一致する場所なので、この計算は時間順序積の短距離くりこみの準備となる。

以下 $d\ge1$ は整数、$U=\mathbb R^d\setminus\{0\}$、$\mathcal D(V)=C_c^\infty(V)$、$\mathcal D'(V)$ は複素線形な分布の空間とする。$|x|$ はEuclidノルムであり、時空計量は $(-,+,+,+)$ とする。今回の回転対称性はEuclid空間の例で、Lorentz対称性とは区別する。

## 1. 原点だけに残る作用

二つの延長を引くと、原点から離れた試験関数への作用は零になる。デルタ超関数はその最も簡単な例である。原点の近くを調べる場合にだけ値が現れる分布を考えよう。

<a id="def-mqfc34-point-support"></a>

<!-- formal-statement-start -->
> **定義（原点に支持を持つ分布）**  
> $D\in\mathcal D'(\mathbb R^d)$ とする。原点を含まない台を持つ全ての $\varphi\in\mathcal D(\mathbb R^d)$ に対して
>
$$
\langle D,\varphi\rangle=0
$$
>
> が成立するとき、$D$ は原点に支持を持つという（零分布も含め、支持は $\{0\}$ に含まれる）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc34-point-support -->
### 直接例：デルタの一次導関数

**定義の確認**。[Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac)と[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)により、$d=1$ の $D=\delta'$ の作用は

$$
\langle D,\varphi\rangle=-\varphi'(0)
$$

である。固定コンパクト台上では一階微分の上限で抑えられるから、[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)により分布である。台が原点を避けるなら $\varphi$ は原点の近傍で恒等的に零であり、$\varphi'(0)=0$ となる。一方、原点近傍で1となる滑らかなコンパクト台関数 $\chi$ を使い $\varphi=x\chi$ とすれば作用は $-1$ である。従って零分布ではない。
<!-- definition-example-end -->

一般の分布は試験関数の有限階の微分上限で評価できる。ただしその階数は台に依存してよい。原点に支持を持つ場合は、原点を含む一つの固定コンパクト集合でこの評価を取り、他の部分を切り捨てられる。これが有限個の微分値だけに依存する理由である。

## 2. 原点支持の構造

[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha$ に対し $|\alpha|=\sum_i\alpha_i$、$\alpha!=\prod_i\alpha_i!$ と書く。原点での微分値 $\partial^\alpha\varphi(0)$ はデルタの導関数で取り出せる。符号は $(-1)^{|\alpha|}$ である。

<a id="thm-mqfc34-point-structure"></a>

<!-- formal-statement-start -->
> **定理（原点支持分布の構造）**  
> $D\in\mathcal D'(\mathbb R^d)$ の支持が $\{0\}$ に含まれるための必要十分条件は、ある整数 $N\ge0$ と複素係数 $c_\alpha$ を用いて
>
$$
D=\sum_{|\alpha|\le N}c_\alpha\partial^\alpha\delta
$$
>
> と書けることである。零係数を除けば表示は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

$N$ を固定コンパクト台での有限階評価から取る。$N$ 階までの原点微分値が全て零の関数は、原点を中心とする小球に切り詰めると、$N$ 階以下の微分上限も零に近づく。従ってその関数への作用は零である。残るのはTaylor多項式の有限個の係数だけになる。

<!-- proof-start -->
### 証明

$\chi$ を $|x|\le1$ で1、$|x|\ge2$ で0となる滑らかな関数とし、$K=\{|x|\le2\}$ とする。[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)により、この $K$ 上である $C>0$ と整数 $N\ge0$ が取れ、台が $K$ に含まれる $\psi$ について

$$
|\langle D,\psi\rangle|
\le C\max_{|\beta|\le N}\sup_K|\partial^\beta\psi|
$$

となる。

任意の試験関数 $\varphi$ について、$g=W_N\varphi$ を[原点Taylor減算](../MQFC33/index.md#def-mqfc33-subtraction)で作る。$|\gamma|\le N$ のとき $\partial^\gamma g(0)=0$ である。$0<\varepsilon\le1$ とし $\chi_\varepsilon(x)=\chi(x/\varepsilon)$ と置く。$(1-\chi_\varepsilon)g$ は原点近傍で零であるから

$$
\langle D,g\rangle=\langle D,\chi_\varepsilon g\rangle.
$$

右辺の試験関数の台は $K$ に含まれる。$|\gamma|\le N$ では、前講のTaylor減算の評価（[原点Taylor減算](../MQFC33/index.md#def-mqfc33-subtraction)の後の導出）により

$$
|\partial^\gamma g(x)|
\le C_g |x|^{N+1-|\gamma|}
\qquad (|x|\le2)
$$

である。積の微分を取ると、$|\beta|\le N$ に対して

$$
\partial^\beta(\chi_\varepsilon g)(x)
=\sum_{\gamma\le\beta}\binom{\beta}{\gamma}
\varepsilon^{-|\beta-\gamma|}
(\partial^{\beta-\gamma}\chi)(x/\varepsilon)
\partial^\gamma g(x).
$$

各項が非零になり得るのは $|x|\le2\varepsilon$ である。従って各項の絶対値は、定数倍を除けば

$$
\varepsilon^{-|\beta-\gamma|}
\varepsilon^{N+1-|\gamma|}
=\varepsilon^{N+1-|\beta|}
\le\varepsilon
$$

以下となる（$|\beta|\le N$、$\varepsilon\le1$）。有限和なので $|\langle D,\chi_\varepsilon g\rangle|\le C'_g\varepsilon$ を得る。左辺の作用は $\langle D,g\rangle$ に等しく $\varepsilon$ に依存しないので、$\varepsilon\downarrow0$ として $\langle D,g\rangle=0$ となる。

$\varphi$ をTaylor減算の式に戻し、線形性を使うと

$$
\langle D,\varphi\rangle
=\sum_{|\alpha|\le N}
\frac{\langle D,\chi x^\alpha\rangle}{\alpha!}
\partial^\alpha\varphi(0).
$$

[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)によれば

$$
\langle\partial^\alpha\delta,\varphi\rangle
=(-1)^{|\alpha|}\partial^\alpha\varphi(0).
$$

従って $c_\alpha=(-1)^{|\alpha|}\langle D,\chi x^\alpha\rangle/\alpha!$ で主張の表示が成立する。

一意性は $\varphi_\beta(x)=\chi(x)x^\beta/\beta!$ で試す。$\chi=1$ の近傍でこの関数は単項式であるから、任意の $\alpha$ について $\partial^\alpha\varphi_\beta(0)$ は $\alpha=\beta$ なら1、それ以外なら0である。よって

$$
\langle D,\varphi_\beta\rangle=(-1)^{|\beta|}c_\beta.
$$

作用から各係数が一意に定まる。逆に任意の有限和は[超関数微分の安定性](../../../解析系/GPDE/GPDE2/index.md#prop-gpde2-derivative-is-distribution)によって分布であり、原点を避ける試験関数の全ての原点微分値が零であるから原点に支持を持つ。
<!-- proof-end -->

例えば一次元では $D=2\delta-3\delta'$ は $\varphi(0)$ と $\varphi'(0)$ だけを読み、作用は $2\varphi(0)+3\varphi'(0)$ となる。二つの係数を求めたければ $\chi$ と $x\chi$ を入力すればよい。$N$ は初めは評価から得た上界に過ぎない。次にスケーリング次数から、実際に必要な最高階を特定する。

## 3. 次数を保つ延長の全自由度

前節の表示で $D\ne0$ とし、非零係数の最大階を $n$ とする。[デルタ導関数のスケーリング次数](../MQFC32/index.md#prop-mqfc32-delta-degree)によれば各項の次数は $d+|\alpha|$ である。最高階の項が複数あっても次数が打ち消されないことを先に確認する。$|\beta|=n$ かつ $c_\beta\ne0$ を選び、先の $\varphi_\beta$ で試すと、[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)の下で

$$
\langle D_\lambda,\varphi_\beta\rangle
=(-1)^n c_\beta\lambda^{-d-n}
$$

となる。$\lambda^\omega$ を掛けた値は $\omega\le d+n$ なら零に収束しない。他の試験関数では各項が高々 $\lambda^{-d-n}$ の定数倍なので、$\omega>d+n$ なら零に収束する。従って $\operatorname{sd}(D)=d+n$ である。

原点を除いた核の延長を一つ固定し、そこへ原点だけに支持を持つ分布を足す。この加える項は局所反項である。短距離の強さを変えないという条件から、追加できる反項を全て分類できる。

<a id="thm-mqfc34-counterterm-freedom"></a>

<!-- formal-statement-start -->
> **定理（局所反項の自由度）**  
> $U=\mathbb R^d\setminus\{0\}$、$t\in\mathcal D'(U)$、$s=\operatorname{sd}_U(t)<+\infty$ とする。$T_0$ を $t$ のスケーリング次数 $s$ を保つ延長とする。$s<d$ ならそのような延長は $T_0$ だけである。$d\le s<+\infty$ なら $m=\lfloor s-d\rfloor$ として、そのような延長はちょうど
>
$$
T=T_0+\sum_{|\alpha|\le m}c_\alpha\partial^\alpha\delta,
\qquad c_\alpha\in\mathbb C
$$
>
> で尽くされる。各係数は独立に選べ、係数の個数は $\binom{d+m}{m}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

延長同士の差は原点に支持を持つので前節の構造定理を適用できる。最高階 $n$ に対して $d+n\le s$ が必要になり、逆にこの範囲の項を足しても次数は増えない。

<!-- proof-start -->
### 証明

存在は[スケーリング次数を保つ延長](../MQFC33/index.md#thm-mqfc33-extension)によって保証される。別の次数保存延長 $T$ を取り、$D=T-T_0$ とする。[原点を越える分布の延長](../MQFC33/index.md#def-mqfc33-extension)の条件から $D$ の原点外への作用は零である。[原点支持分布の構造](#thm-mqfc34-point-structure)により有限和で書ける。

任意の実数 $\omega>s$ で $\lambda^\omega T_\lambda$ と $\lambda^\omega(T_0)_\lambda$ は分布として零に収束する。差も零に収束するので $\operatorname{sd}(D)\le s$ である。$D\ne0$ なら先ほどの計算より $\operatorname{sd}(D)=d+n$、従って $d+n\le s$ である。$s<d$（$s=-\infty$ を含む）では不可能だから $D=0$。$s\ge d$ では $n\le\lfloor s-d\rfloor$ である。

逆にこの階数の有限和を $T_0$ に足すと、原点外への作用は変わらない。各項の次数が $d+|\alpha|\le s$ だから任意の $\omega>s$ で規格化した各作用が零に収束し、和の次数は $s$ 以下である。延長の次数は原点外の次数以上である（[原点を越える分布の延長](../MQFC33/index.md#def-mqfc33-extension)の後の下界の導出）。従って正確に $s$ になる。

係数の一意性は構造定理から従う。$|\alpha|\le m$ の多重指数は、余り $\alpha_{d+1}=m-|\alpha|$ を付ければ和が $m$ の非負整数 $d+1$ 個と一対一に対応する。$m$ 個の印と $d$ 本の仕切りを並べ、各区間の印の数を各成分とすれば、その並べ方は $\binom{m+d}{d}=\binom{m+d}{m}$ 通りである。
<!-- proof-end -->

例えば $d=4$ で $s=6.7$ なら $m=2$ であり、零階1個、一次4個、二次10個、合計15個の係数を選べる。$s=6$ ちょうどでも15個であり、$s<6$ なら二階の10個は許されない。これは対称性などを課す前の個数である。

## 4. 対称性で反項を絞る

同じ反射対称性を持つ二つの延長の差もその対称性を持つ。例えば一次元で $\varphi(-x)$ に対する作用が $\varphi(x)$ に対する作用と等しいなら、奇数階のデルタ導関数の係数は零でなければならない。一般には直交変換 $Q$ に対して $\langle D,\varphi(Q\,\cdot)\rangle=\langle D,\varphi\rangle$ を課す。

Euclid空間の全ての直交変換で不変な反項では、二階微分は座標のどれか一つに偏れない。実際に全階数を分類してみよう。ここで $\Delta=\sum_{j=1}^d\partial_j^2$ はEuclid空間のLaplacianである。

<a id="thm-mqfc34-orthogonal-counterterms"></a>

<!-- formal-statement-start -->
> **定理（直交変換で不変な局所反項）**  
> $d\ge1$、$m\ge0$ を整数とする。原点に支持を持つ $D\in\mathcal D'(\mathbb R^d)$ が $\operatorname{sd}(D)\le d+m$ を満たすとする。全ての直交行列 $Q\in O(d)$ と試験関数 $\varphi$ に対して $\langle D,\varphi(Q\,\cdot)\rangle=\langle D,\varphi\rangle$ となるための必要十分条件は、複素係数 $a_k$ によって
>
$$
D=\sum_{k=0}^{\lfloor m/2\rfloor}a_k\Delta^k\delta
$$
>
> と書けることである。係数は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

微分作用素の係数を多項式に並べ、原点近傍で指数関数となる試験関数で測ると、直交変換の問題は多項式が球面上で一定になる条件に置き換わる。半径の偶数冪だけが残り、微分作用素へ戻すとLaplacianの冪になる。

<!-- proof-start -->
### 証明

[原点支持分布の構造](#thm-mqfc34-point-structure)と第3節の最高階の次数計算から

$$
D=\sum_{|\alpha|\le m}c_\alpha\partial^\alpha\delta
$$

と書ける。係数をまとめた多項式を $P(z)=\sum_{|\alpha|\le m}c_\alpha z^\alpha$ とする。$z\in\mathbb R^d$ に対して、$\psi_z(x)=\chi(x)\exp(-z\cdot x)$ を試験関数とする。原点近傍では指数関数そのものなので $\partial^\alpha\psi_z(0)=(-1)^{|\alpha|}z^\alpha$。従ってデルタ導関数の作用は $z^\alpha$ となり、$\langle D,\psi_z\rangle=P(z)$ である。

$\psi_z(Qx)$ は原点近傍で $\exp(-(Q^{\mathsf T}z)\cdot x)$ となる。よって同じ計算から

$$
\langle D,\psi_z(Q\,\cdot)\rangle=P(Q^{\mathsf T}z).
$$

不変性により $P(Q^{\mathsf T}z)=P(z)$ を得る。逆にこの多項式の等式が全ての実 $z$ で成り立つとする。$D_Q$ を $\langle D_Q,\varphi\rangle=\langle D,\varphi(Q\,\cdot)\rangle$ と定める。連鎖律から有限階の微分値の線形結合なので分布であり原点支持である。上の計算で $D_Q-D$ の指数関数型試験関数への作用が全 $z$ で零となる。構造定理によりその作用は係数を並べた多項式である。零多項式の各係数は原点で対応する偏微分を取り $\alpha!$ で割れば零と分かるので $D_Q=D$ である。

任意の $z\ne0$ に対し $z/|z|$ を第一座標の単位ベクトルへ移す直交行列が存在する（単位ベクトルを正規直交基底に補えば構成できる）。よって $P(z)=P(|z|e_1)$ である。一次元多項式 $q(u)=P(ue_1)$ は第一座標の符号反転により $q(-u)=q(u)$ となる。奇数次係数は零であるから

$$
q(u)=\sum_{k=0}^{\lfloor m/2\rfloor}a_k u^{2k},
\qquad
P(z)=\sum_{k=0}^{\lfloor m/2\rfloor}a_k
\left(\sum_{j=1}^d z_j^2\right)^k.
$$

最後の式は $z=0$ でも成立する。逆にこの形の多項式は $|Q^{\mathsf T}z|=|z|$ によって不変である。

多項式の各単項式 $z^\alpha$ を $\partial^\alpha\delta$ に戻すと、偏微分が可換なので $\left(\sum_j z_j^2\right)^k$ は $\Delta^k\delta$ に対応する。一意性は $q(u)$ の係数の一意性から従う。
<!-- proof-end -->

$d=4$、$m=2$ では15個の係数が2個へ減り、差は $a_0\delta+a_1\Delta\delta$ に限られる。ただしこの定理は**すでに不変な延長を一つ固定できる場合の差の分類**である。任意の核にこの対称性があると主張しているわけではない。次節の動径核では不変な延長を直接構成できる。

## 5. 対数発散と尺度の変更

次数が次元に等しい核で、減算する領域を半径 $R$ で指定しよう。$R$ は正の長さ（同じ座標単位で測る）である。半径を変えると原点外の核は同じまま、引く定数項の領域だけが変わる。

<a id="prop-mqfc34-log-scale"></a>

<!-- formal-statement-start -->
> **命題（臨界核の対数尺度変更）**  
> $d\ge1$、$R>0$、$t(x)=|x|^{-d}$ ($x\ne0$) とする。$\sigma_{d-1}$ を単位球面の面積（$d=1$ では2）とする。全試験関数への作用を
>
$$
\langle T_R,\varphi\rangle
=\int_{\mathbb R^d}|x|^{-d}
\bigl(\varphi(x)-\mathbf 1_{\{|x|<R\}}\varphi(0)\bigr)\,d^dx
$$
>
> と定めると、$T_R$ は $t$ の直交変換不変な次数 $d$ の延長であり、任意の $R,S>0$ について
>
$$
T_S-T_R=-\sigma_{d-1}\log(S/R)\,\delta.
$$
>
> また $\lambda>0$ について
>
$$
(T_R)_\lambda
=\lambda^{-d}(T_R+\sigma_{d-1}\log\lambda\,\delta).
$$
<!-- formal-statement-end -->

### 証明の見取り図

減算関数はここでは滑らかでないが、核との積を積分するため、球面での跳躍は支障にならない。原点近くの差は一次の大きさである。尺度を変えた差は二つの球面に挟まれた領域の積分だけであり、動径方向に $dr/r$ が残る。

<!-- proof-start -->
### 証明

$|x|<\min(R,1)$ では線分上の微分を積分して

$$
\varphi(x)-\varphi(0)
=\int_0^1\sum_{j=1}^d x_j\partial_j\varphi(ux)\,du.
$$

$M=\max_j\sup_{|y|\le1}|\partial_j\varphi(y)|$ とすれば、絶対値は $\sqrt d M|x|$ 以下である。$a=\min(R,1)$ と置き極座標を使うと、原点近傍の絶対積分は

$$
\sqrt d M\sigma_{d-1}\int_0^a r^{d-1-d+1}\,dr
=\sqrt d M\sigma_{d-1}a
$$

以下となる。$d=1$ では正負の半直線で同じ式を得る。外側では原点から離れ、被積分関数は試験関数の台と半径 $R$ の球の合併に含まれるので、固定コンパクト台上の零階微分上限で抑えられる。従って線形作用は[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)を満たす。原点を避ける試験関数では $\varphi(0)=0$ だから元の核の積分に戻る。直交変換 $y=Qx$ では $|x|=|y|$、Jacobianの絶対値は1であり、$\varphi(Q0)=\varphi(0)$ だから不変性も成立する。

$S>R$ の場合に二つの収束積分を引くと

$$
\begin{aligned}
\langle T_S-T_R,\varphi\rangle
&=-\varphi(0)\int_{R\le |x|<S}|x|^{-d}\,d^dx\\
&=-\sigma_{d-1}\varphi(0)\int_R^S\frac{dr}{r}\\
&=-\sigma_{d-1}\log(S/R)\varphi(0).
\end{aligned}
$$

$S=R$ なら零、$S<R$ なら $R,S$ を交換して符号を反転すると同じ式となる。デルタの作用を用いて第一の関係式を得る。

[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)に従い、$x=\lambda y$ と変数変換する。

$$
\begin{aligned}
\langle(T_R)_\lambda,\varphi\rangle
&=\lambda^{-d}\int |y|^{-d}
(\varphi(y)-\mathbf 1_{\{|y|<R/\lambda\}}\varphi(0))\,d^dy\\
&=\lambda^{-d}\langle T_{R/\lambda},\varphi\rangle.
\end{aligned}
$$

既に示した尺度変更式へ $S=R/\lambda$ を入れると $-\log(S/R)=\log\lambda$ となり、第二の関係式が従う。$\omega>d$ なら $\lambda^{\omega-d}$ と $\lambda^{\omega-d}\log\lambda$ はともに零へ収束するので、次数は $d$ 以下である。原点外の核は非零かつ斉次次数 $-d$ であり、[斉次分布のスケーリング次数](../MQFC32/index.md#thm-mqfc32-homogeneous-degree)から次数は $d$。延長の下界と合わせて等号となる。
<!-- proof-end -->

例えば $d=1$ で $S=2R$ とすれば $T_{2R}=T_R-2\log2\,\delta$。一方、逆長さ $\mu=1/R$ を尺度として使う場合は $T_{1/\mu'}-T_{1/\mu}=\sigma_{d-1}\log(\mu'/\mu)\delta$ である。長さと逆長さの取り違えは符号を反転させる。

[局所反項の自由度](#thm-mqfc34-counterterm-freedom)によると次数 $d$ を保つ延長は $T_R+c\delta$ だけである。どの $c$ を選んでも、デルタ自体は斉次次数 $-d$ だから

$$
(T_R+c\delta)_\lambda
=\lambda^{-d}(T_R+c\delta+\sigma_{d-1}\log\lambda\,\delta).
$$

従ってこの核には厳密な斉次性を保つ延長は存在しない。次数保存と厳密な斉次性は異なる条件なのである。

## 6. 演習

### 演習 MQFC34-A1：符号と係数の復元
- Level: A

一次元で $D=2\delta+3\delta'-4\delta''$ とする。$\chi$ は原点近傍で1の滑らかなコンパクト台関数とする。$\chi,x\chi,x^2\chi/2$ への作用とスケーリング次数を求めよ。

<!-- solution-start -->
**詳細解答**

[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)より、作用は $2\varphi(0)-3\varphi'(0)-4\varphi''(0)$ である。各試験関数の零、一、二階の原点微分値は順に $(1,0,0),(0,1,0),(0,0,1)$。よって作用値は $2,-3,-4$ である。

最高階は2で係数が非零である。第3節の計算では最後の試験関数への $D_\lambda$ の作用が $-4\lambda^{-3}$ となるから、$\omega\le3$ では $\lambda^\omega$ を掛けても零にならない。他の試験関数に対しても各項は $\lambda^{-1},\lambda^{-2},\lambda^{-3}$ の定数倍なので $\omega>3$ で零になる。次数は3である。
<!-- solution-end -->

### 演習 MQFC34-A2：階数と個数
- Level: A

$d=3$ とし、原点外の核の次数が $2.9,3,4.9,5$ のとき、次数保存延長で選べる係数の個数をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**

[局所反項の自由度](#thm-mqfc34-counterterm-freedom)では $s<3$ のとき一意なので $2.9$ では0個である。$s=3$ では $m=\lfloor3-3\rfloor=0$ となり、デルタの1個だけ。$s=4.9$ では $m=1$ で、零階1個と一次3個の計4個。$s=5$ では $m=2$ であり、二次は純二階3個と異なる座標の混合微分3個なので計 $1+3+6=10$ 個となる。これは $\binom{3+2}{2}=10$ とも一致する。
<!-- solution-end -->

### 演習 MQFC34-A3：支持条件の確認
- Level: A

$d=2$ で $D=\partial_1\partial_2\delta$ とする。原点に支持を持つことを確認し、$\varphi=(1+2x_1+3x_1x_2+x_2^2)\chi$ への作用を求めよ。ここで $\chi$ は原点近傍で1の滑らかなコンパクト台関数とする。

<!-- solution-start -->
**詳細解答**

[超関数微分の安定性](../../../解析系/GPDE/GPDE2/index.md#prop-gpde2-derivative-is-distribution)により $D$ は分布である。[超関数の微分](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)を二回適用すると $\langle D,\psi\rangle=\partial_1\partial_2\psi(0)$。原点を避ける台なら原点近傍で恒等的に零なので、この微分値も零となり支持条件を満たす。

指定された $\varphi$ は原点近傍で多項式そのものだから、$\partial_2\varphi=3x_1+2x_2$、さらに $\partial_1\partial_2\varphi=3$ となる。作用は3である。
<!-- solution-end -->

### 演習 MQFC34-A4：反射の制約
- Level: A

一次元で $D=a\delta+b\delta'+c\delta''$ とする。全試験関数に対して $\langle D,\varphi(-\,\cdot)\rangle=\langle D,\varphi\rangle$ となる条件を求めよ。

<!-- solution-start -->
**詳細解答**

$\psi(x)=\varphi(-x)$ とすると $\psi(0)=\varphi(0)$、$\psi'(0)=-\varphi'(0)$、$\psi''(0)=\varphi''(0)$。従って $\langle D,\psi\rangle=a\varphi(0)+b\varphi'(0)+c\varphi''(0)$ となる。元の作用との差は $2b\varphi'(0)$ である。$\varphi=x\chi$（$\chi=1$ が原点近傍で成立）を選べば $\varphi'(0)=1$ なので必要条件は $b=0$。逆に $b=0$ なら差は全ての試験関数で零だから十分でもある。$a,c$ は任意である。
<!-- solution-end -->

### 演習 MQFC34-B1：有限階評価から消失を示す
- Level: B

原点に支持を持つ一次元の分布 $D$ が、台が $[-2,2]$ に含まれる全試験関数 $\psi$ について $|\langle D,\psi\rangle|\le C\max_{j\le1}\sup|\psi^{(j)}|$ を満たすとする。$\varphi(0)=\varphi'(0)=0$ なら $\langle D,\varphi\rangle=0$ となることを、原点近くへの切り詰めで直接示せ。

<!-- solution-start -->
**詳細解答**

$\chi$ を $[-1,1]$ で1、$[-2,2]$ の外で0の滑らかな関数として $\psi_\varepsilon=\chi(x/\varepsilon)\varphi(x)$ とする。$0<\varepsilon\le1$ とすれば台は $[-2,2]$ に含まれる。支持条件から $\langle D,\varphi\rangle=\langle D,\psi_\varepsilon\rangle$ である。

$M=\sup_{[-2,2]}|\varphi''|$ とすれば、原点での消失条件と積分によって $|\varphi'(x)|\le M|x|$、$|\varphi(x)|\le Mx^2/2$ となる。$|x|\le2\varepsilon$ で後者は $2M\varepsilon^2$ 以下である。従って $\sup|\psi_\varepsilon|\le2M\|\chi\|_\infty\varepsilon^2$。

積の微分から

$$
\psi_\varepsilon'
=\varepsilon^{-1}\chi'(x/\varepsilon)\varphi
+\chi(x/\varepsilon)\varphi'
$$

なので $\sup|\psi_\varepsilon'|\le2M(\|\chi'\|_\infty+\|\chi\|_\infty)\varepsilon$ である。仮定の評価に代入すると作用の絶対値は定数倍の $\varepsilon$ 以下となる。左辺は切り詰めの尺度に依存しないから極限で零となる。
<!-- solution-end -->

### 演習 MQFC34-B2：二階の回転不変反項
- Level: B

$d=2$ で次数が4以下の原点支持分布を考える。座標ごとの符号反転と、座標を交換する変換で不変と仮定する。この条件から $D=a\delta+b\Delta\delta$ を導き、逆にこれが全直交変換で不変であることを確認せよ。

<!-- solution-start -->
**詳細解答**

[原点支持分布の構造](#thm-mqfc34-point-structure)と最高階の次数計算により次数4以下では二階までである。係数を明示すると

$$
D=a\delta+u\partial_1\delta+v\partial_2\delta
+b_1\partial_1^2\delta+c\partial_1\partial_2\delta+b_2\partial_2^2\delta.
$$

第1座標だけ符号を反転すると一次の $u$ と混合の $c$ の項だけが符号反転する。デルタ導関数の表示の一意性より $u=c=0$。第2座標の符号反転では $v=0$。座標交換は二つの純二階項を交換するので $b_1=b_2=b$。従って $D=a\delta+b\Delta\delta$ である。

直交行列 $Q$ に対する連鎖律では

$$
\sum_i\partial_i^2[\varphi(Qx)]
=\sum_{j,k}\left(\sum_i Q_{ji}Q_{ki}\right)
(\partial_j\partial_k\varphi)(Qx).
$$

括弧内は $QQ^{\mathsf T}$ の成分、すなわち $j=k$ なら1、他は0である。原点で評価すると $\Delta\varphi(0)$ に戻る。デルタの作用も原点の値で不変なので全直交変換で不変である。
<!-- solution-end -->

### 演習 MQFC34-B3：尺度と規格化条件
- Level: B

$d=1$ の臨界核について、第5節の $T_R$ を使う。原点近傍で1の固定試験関数 $\eta$ に対し、$\langle T_R+c_R\delta,\eta\rangle=0$ を要求する。$c_R$ の一意性と $c_{2R}-c_R$ を求め、規格化後の分布が尺度変更で変わらないことを示せ。

<!-- solution-start -->
**詳細解答**

$\eta(0)=1$ だから条件は $\langle T_R,\eta\rangle+c_R=0$ であり、$c_R=-\langle T_R,\eta\rangle$ と一意に決まる。

[臨界核の対数尺度変更](#prop-mqfc34-log-scale)で $\sigma_0=2,S=2R$ を入れると

$$
T_{2R}-T_R=-2\log2\,\delta.
$$

$\eta$ へ作用させて差の符号を反転すると $c_{2R}-c_R=2\log2$。従って

$$
(T_{2R}+c_{2R}\delta)-(T_R+c_R\delta)
=(-2\log2+2\log2)\delta=0.
$$

同じ規格化条件を保持したまま減算尺度だけを変えると、局所反項の係数が変わってその差を相殺する。
<!-- solution-end -->

### 演習 MQFC34-C1：角度に依存する臨界核
- Level: C

$d=2$、$x=(r\cos\theta,r\sin\theta)$、$r>0$ とし、$t_b(x)=r^{-2}(1+b\cos2\theta)$ ($b\in\mathbb R$) とする。半径 $R>0$ の球による第5節と同じ減算で $T_{b,R}$ を作る。

(1) 分布としての延長であり次数2を保つことを示せ。(2) 尺度変更の係数を計算せよ。(3) 全直交変換で不変な延長が存在するための条件を求めよ。

<!-- solution-start -->
**詳細解答**

(1) $|1+b\cos2\theta|\le1+|b|$ だから、原点近傍での積分の絶対値は第5節と同じ線分積分を使って評価できる。具体的に $a=\min(1,R)$、$M=\max_j\sup_{|y|\le1}|\partial_j\varphi(y)|$ とすれば

$$
\int_{|x|<a}|t_b(x)(\varphi(x)-\varphi(0))|\,d^2x
\le2\pi(1+|b|)\sqrt2 M\int_0^a dr.
$$

有限であり、外側もコンパクト台と零階微分上限で抑えられるので[超関数の局所有限階評価](../../../解析系/GPDE/GPDE1/index.md#prop-gpde1-local-finite-order)から分布となる。原点を避ける試験関数では減算項が零であるため延長条件を満たす。

(2) $S>R$ のとき差は

$$
\begin{aligned}
\langle T_{b,S}-T_{b,R},\varphi\rangle
&=-\varphi(0)\int_R^S\frac{dr}{r}
\int_0^{2\pi}(1+b\cos2\theta)\,d\theta\\
&=-2\pi\log(S/R)\varphi(0).
\end{aligned}
$$

余弦の積分は $[\sin2\theta/2]_0^{2\pi}=0$ である。$S<R$ の場合も交換して同じ関係式を得る。よって係数は $-2\pi\log(S/R)$ で、$b$ に依存しない。

[分布のスケール変換](../MQFC32/index.md#def-mqfc32-dilation)では $x=\lambda y$、$\lambda>0$ により角度は不変、核は $\lambda^{-2}$ 倍となる。従って $(T_{b,R})_\lambda=\lambda^{-2}T_{b,R/\lambda}$ であり、尺度変更式から

$$
(T_{b,R})_\lambda
=\lambda^{-2}(T_{b,R}+2\pi\log\lambda\,\delta).
$$

$\omega>2$ なら両項に $\lambda^\omega$ を掛けて零に収束する。元の核は斉次次数 $-2$ で非零である（角度の平均が1）。[斉次分布のスケーリング次数](../MQFC32/index.md#thm-mqfc32-homogeneous-degree)より原点外で次数2。延長の下界と合わせて正確に2となる。

(3) $b=0$ なら第5節の直交変換不変な延長を得る。$b\ne0$ のとき、$\pi/2$ 回転では $\cos(2\theta+\pi)=-\cos2\theta$ となり、元の核は変わる。例えば $(1,0)$ の近くでは $\cos2\theta$ は正なので、その近傍に台を持つ非負かつ非零の試験関数に作用させれば、回転前後の核の差 $2b r^{-2}\cos2\theta$ の積分は非零になる。原点外の作用が異なるため、どのような延長も全直交変換不変にはなれない。

特に[局所反項の自由度](#thm-mqfc34-counterterm-freedom)によれば次数2を保つ延長は $T_{b,R}+c\delta$ だけである。反項は原点外での非対称性を修正できない。対数係数が角度の平均だけで決まることと、核全体が回転不変であることは別の条件である。
<!-- solution-end -->

## 7. 次の講義

原点外の核と短距離の次数が決まれば、延長の差は有限個のデルタ導関数に限られることが分かった。次講ではFeynman核の具体例について、対角へ延長する際の減算と局所反項を実際に計算する。

## 8. 直接前提講座

- [MQFC33](../MQFC33/index.md)
- [MQFC32](../MQFC32/index.md)
- [GPDE1](../../../解析系/GPDE/GPDE1/index.md)
- [GPDE2](../../../解析系/GPDE/GPDE2/index.md)
