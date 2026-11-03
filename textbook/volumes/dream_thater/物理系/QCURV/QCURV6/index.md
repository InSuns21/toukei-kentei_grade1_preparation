# QCURV6 粒子数とUnruh–DeWitt検出器の応答

<!-- definition-example-audit: strict -->

[QCURV3の粒子数](../QCURV3/index.md#prop-qcurv3-number)は、**どの正振動数モードを選んだか**に依存します。[QCURV5](../QCURV5/index.md#def-qcurv5-adiabatic-data)では背景の時間変化を用いて状態を選びました。しかし実験器が測るのは、空間全体のモード分解ではなく、実験器自身の時計に沿う相互作用の結果です。

本章では、内部に二つのエネルギー準位を持つ小さな検出器を自由実スカラー場へ弱く結合し、**励起確率を場の二点分布から導く**ことを中心にします。道筋は「世界線と切替 → 一次摂動 → 二点分布の引戻し → Minkowski真空での有限時間応答 → 長時間遷移率」です。Rindler座標と一様加速による温度の計算は次の主題へ譲ります。

時空の標準規約は計量 $(-,+,+,+)$、$\Box_g=g^{ab}\nabla_a\nabla_b$、$P_g=-\Box_g+m^2+\xi R_g$ です（[Lorentz計量の規約](../../../../../dream-theater-lorentz-conventions.md)）。以下は自然単位 $\hbar=c=1$ とします。

## 1. 「粒子がある」と「検出器が鳴る」はなぜ違うか

あるモード選択に関する粒子数は[正準変換と粒子数の命題](../QCURV3/index.md#prop-qcurv3-number)で決まります。一方、検出器を有限時間だけオンにする操作には外部から仕事がなされ得ます。したがって、真空中で検出器が励起しても、それだけでは「真空に粒子が存在した」とは結論できません。

まず観測器の時計を決めます。$x:I\to M$ は滑らかな未来向き時間的世界線で、$\tau$ はその**固有時間**、すなわち $g(\dot x,\dot x)=-1$ を満たすパラメータです。検出器の内部状態は基底 $|g\rangle$ と励起状態 $|e\rangle$ の二準位で、エネルギー差を $\Omega=E_e-E_g>0$ とします。基底を $E_g=0$ としてよく、自由ハミルトニアンは $H_D=\Omega|e\rangle\langle e|$ です。

検出器と場を結ぶ「単極子演算子」は、内部状態を反転させる $\sigma^+=|e\rangle\langle g|$、$\sigma^-=|g\rangle\langle e|$ から作ります。相互作用表示では

$$
\mu(\tau)=e^{i\Omega\tau}\sigma^++e^{-i\Omega\tau}\sigma^-.
$$

これは $e^{iH_D\tau}(\sigma^++\sigma^-)e^{-iH_D\tau}$ を各行列要素に作用させた結果です。相互作用を有限時間に制限するには、実数値で滑らかな切替関数 $\chi$ を用います。$\lambda$ は小さい実結合定数です。

<a id="def-qcurv6-detector"></a>

<!-- formal-statement-start -->
> **定義（Unruh–DeWitt検出器と切替）**  
> 時間向き付きの4次元大域双曲Lorentz時空 $(M,g)$ 上の自由実スカラー場 $\phi$ と、固有時間でパラメータ付けた滑らかな未来向き時間的世界線 $x:I\to M$ を考える。二準位 $|g\rangle,|e\rangle$ のエネルギー差を $\Omega>0$ とし、実切替 $\chi\in C_c^\infty(I)$、実結合 $\lambda$ を固定する。相互作用表示の点状Unruh–DeWitt結合を、形式的に

$$
H_I(\tau)=\lambda\chi(\tau)\mu(\tau)\otimes\phi(x(\tau)),
\qquad
\mu(\tau)=e^{i\Omega\tau}\sigma^++e^{-i\Omega\tau}\sigma^-
$$

> と書く。$\phi(x(\tau))$ は演算子値分布の世界線への制限を表す略記であり、**各時刻の点演算子が単独で存在する**という意味ではない。以下の検出確率は切替を含む二点分布の引戻しによって定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv6-detector -->
### 直接例：慣性軌道と滑らかなオン・オフ

Minkowski時空で $x(\tau)=(\tau,0,0,0)$ と置くと、$\dot x=(1,0,0,0)$ は未来向きで $g(\dot x,\dot x)=-1$、従って $\tau$ は固有時間です。$T>0$ として

$$
\chi_T(\tau)=
\begin{cases}
\exp\!\left(-\dfrac{1}{1-(\tau/T)^2}\right),&|\tau|<T,\\
0,&|\tau|\ge T
\end{cases}
$$

は実数値、無限回微分可能、支持が $[-T,T]$ に収まります。境界で全ての導関数が0へ近づくので、接続後も滑らかです。$\Omega>0$ を選べば、軌道・二準位・切替という定義の全条件を満たします。後のガウス切替は積分を手で評価するための別模型であり、コンパクト支持というこの定義の条件を自動的には満たしません。

**定義の確認**：世界線の時間的単位接線、二準位の正の間隔、切替の実数値・滑らかさ・コンパクト支持をそれぞれ上で検算しました。
<!-- definition-example-end -->

## 2. 場を観測しないのに二点分布が現れる理由

[QFT5のWightman二点分布](../../QFT/QFT5/index.md#def-qft5-wightman)を、[QCURV2で曲がった背景のFock真空へ拡張した構成](../QCURV2/index.md#def-qcurv2-wightman)に従い、場の状態 $\omega$ に対して $W_\omega(X,Y)=\omega(\phi(X)\phi(Y))$ と書きます。点での値ではなく $M\times M$ 上の分布です。世界線上での略記は $W_x(\tau,\tau')=W_\omega(x(\tau),x(\tau'))$ とし、次節でこの引戻しが可能な条件を確かめます。

検出器が $|g\rangle$ から $|e\rangle$ へ移る際、前式の $\sigma^+$ だけが働くので、時間の位相は $e^{+i\Omega\tau}$ です。他方、応答公式に現れる位相は $e^{-i\Omega(\tau-\tau')}$。これは内積を取る際の演算子の**順序と変数名の交換**から生じるので、符号を飛ばさずに導きます。

この二点積分量を**検出器の応答**として定義します。確率の正値性を保ちながら場の状態と検出器の軌道を比較するための数です。

<a id="def-qcurv6-response"></a>

<!-- formal-statement-start -->
> **定義（二点分布による検出器応答関数）**  
> [検出器](#def-qcurv6-detector)を固定し、自由実スカラー場の状態 $\omega$ がHadamard二点分布 $W_\omega$ を持つとする。世界線への分布引戻しを $W_x$ とし、実 $\chi\in C_c^\infty(I)$ と実エネルギー差 $E$ に対し

$$
\mathcal F_{\omega,\chi,x}(E)
=\left\langle W_x,\,
\chi(\tau)\chi(\tau')e^{-iE(\tau-\tau')}\right\rangle
$$

> を**検出器の応答**と呼ぶ。山括弧は分布と試験関数の対であり、形式的には

$$
\mathcal F_{\omega,\chi,x}(E)
=\int_I d\tau\int_I d\tau'\,
\chi(\tau)\chi(\tau')e^{-iE(\tau-\tau')}
W_\omega(x(\tau),x(\tau'))
$$

> と書ける。$E=+\Omega$ は基底から励起状態、$E=-\Omega$ は励起状態から基底への遷移を記述する。$\mathcal F$ 自体には結合定数 $\lambda^2$ を含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv6-response -->
### 直接例：正規化された一つのモード

一つの正振動数モードの真空二点量が世界線上で $W_x(\tau,\tau')=q\,e^{-i\omega(\tau-\tau')}$、$\omega>0$、$q>0$ だとします。これは正値のモード寄与の例です。$\widehat\chi(\nu)=\int_\mathbb R\chi(\tau)e^{-i\nu\tau}d\tau$ と置けば

$$
\mathcal F(E)
=q\left(\int\chi(\tau)e^{-i(E+\omega)\tau}d\tau\right)
\left(\int\chi(\tau')e^{i(E+\omega)\tau'}d\tau'\right)
=q|\widehat\chi(E+\omega)|^2\ge0.
$$

定義の確認として、$W_x$ が滑らかなので引戻しに問題はなく、$\chi$ のコンパクト支持で積分は有限、実 $E$ で応答は非負です。$E=+\Omega$ でも切替のFourier尾が零とは限りません。$E=-\Omega$ なら $E+\omega=0$ の共鳴が可能です。

**定義の確認**：ここでは実切替、実ギャップ、二点核の分布引戻しと積分の存在を直接確かめています。
<!-- definition-example-end -->

<a id="prop-qcurv6-perturbation"></a>

<!-- formal-statement-start -->
> **命題（一次摂動からの応答公式）**  
> [上の検出器](#def-qcurv6-detector)の初期状態を $|g\rangle\otimes|0\rangle$ とし、自由場の正規化真空 $|0\rangle$ の二点分布が上の応答を定義するとする。摂動展開の最低非自明次数で、場の最終状態は観測せず、検出器が励起した確率は

$$
P_{g\to e}=\lambda^2\mathcal F_{\chi,x}(\Omega)+O(\lambda^4)
$$

> となる。ここで検出器の非対角単極子行列要素は $\langle e|\sigma^+|g\rangle=1$ とした。$O(\lambda^4)$ は真空の奇数点関数が消える自由場の準自由真空での摂動次数を表し、任意の結合・任意の時間で一様な誤差保証ではない。一般の初期状態については一次振幅の二乗に対応する $\lambda^2$ 項だけを主張する。
<!-- formal-statement-end -->

### 証明の見取り図

一次のDyson展開から各終状態への振幅を作ります。場の終状態の完全系を和に取ると $\phi$ が二個並び、二点分布が現れます。複素共役を取った側の位相と演算子順序を確かめてから、積分変数を入れ替えます。

<!-- proof-start -->
### 証明

相互作用表示の時間発展を一次まで取ると

$$
U_I=1-i\int_I H_I(\tau)d\tau+O(\lambda^2).
$$

場の正規直交完全系を $\{|n\rangle\}$ とします。検出器が $|e\rangle$ になったとき、終状態 $|e,n\rangle$ の一次振幅は

$$
\mathcal A_n^{(1)}
=-i\lambda\int_I d\tau\,\chi(\tau)e^{i\Omega\tau}
\langle n|\phi(x(\tau))|0\rangle.
$$

これを二乗し、場の終状態を区別せず和に取ると

$$
\begin{aligned}
\sum_n|\mathcal A_n^{(1)}|^2
&=\lambda^2\int_I d\tau\,d\tau'\,
\chi(\tau)\chi(\tau')e^{i\Omega(\tau-\tau')}\\
&\quad\times
\sum_n\langle0|\phi(x(\tau'))|n\rangle
\langle n|\phi(x(\tau))|0\rangle\\
&=\lambda^2\int_I d\tau\,d\tau'\,
\chi(\tau)\chi(\tau')e^{i\Omega(\tau-\tau')}
W_\omega(x(\tau'),x(\tau)).
\end{aligned}
$$

最後の等号は $\sum_n|n\rangle\langle n|=1$ と場のHermitian性を使いました。$\tau\leftrightarrow\tau'$ と積分変数を入れ替えると、位相は $e^{-i\Omega(\tau-\tau')}$、二点分布は $W_\omega(x(\tau),x(\tau'))$ になり、[応答関数](#def-qcurv6-response)に一致します。正値性は[QCURV2の二点分布の正値性](../QCURV2/index.md#prop-qcurv2-wightman-properties)からも従います。

自由準自由真空では場の奇数点関数が零であり、励起振幅の一次項と三次項の干渉は四次、二次項が励起に寄与する交差項は奇数点関数を含んで消えます。従って表示した確率の次の次数は形式的に四次です。
<!-- proof-end -->

この公式は**検出器が状態を変えた**確率であって、ある粒子数演算子の期待値ではありません。状態、軌道、切替、エネルギー間隔の四つを指定して初めて数値が決まります。

## 3. 二点分布を世界線へ代入してよいのか

前節では $W(x(\tau),x(\tau'))$ と書きましたが、Hadamard二点分布は同一点付近で特異です。分布を任意の部分多様体へ制限できるわけではありません。ここで必要なのは**二点の世界線への同時引戻し**であり、$W(x,x)$ という対角評価ではありません。

[MICA13のHadamard波面集合条件](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc)によれば、$W$ の波面集合に現れる各非零余接方向は零（光的）です。[MICA7の分布引戻し定理](../../../解析系/MICA/MICA7/index.md#thm-mica7-pullback)では、写像の微分が消してしまう余接方向が波面集合にないことが十分条件でした。時間的ベクトルの直交補空間には非零の光的共変ベクトルがないため、ここでは条件が満たされます。

<a id="prop-qcurv6-pullback"></a>

<!-- formal-statement-start -->
> **命題（Hadamard二点分布の世界線引戻し）**  
> 4次元時間向き付き大域双曲Lorentz時空 $(M,g)$ 上の自由実Klein–Gordon場のHadamard二点分布 $W$ を取り、$x:I\to M$ を滑らかな未来向き時間的世界線とする。写像

$$
F:I\times I\longrightarrow M\times M,\qquad
F(\tau,\tau')=(x(\tau),x(\tau'))
$$

> に対して、分布引戻し $F^*W\in\mathcal D'(I\times I)$ が存在する。したがって実 $\chi\in C_c^\infty(I)$ で[応答関数](#def-qcurv6-response)が定義できる。ただし $F^*W$ が滑らか、または生の $W$ が時空の対角上へ制限できる、とは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

引戻しの障害となる余法方向は各因子で $k(\dot x)=0$ というものです。一方、Hadamard波面方向の $k$ は非零の光的方向。時間的ベクトルを零化する共変ベクトルは空間的であり、光的にはなれません。

<!-- proof-start -->
### 証明

任意の $(\tau,\tau')$ に対し、写像 $F$ の微分の転置は

$$
dF^T_{(\tau,\tau')}(k,l)
=\big(k(\dot x(\tau)),\,l(\dot x(\tau'))\big)
$$

です。従って余法集合の元は、両成分が0となる $(k,l)$ です。

時間的ベクトル $v$ を選び、ある点で正規直交基底を取り $v=(v^0,0,0,0)$、$v^0\ne0$ と書きます。$k(v)=k_0v^0=0$ なら $k_0=0$。計量符号 $(-,+,+,+)$ なので光的条件

$$
g^{-1}(k,k)=-k_0^2+k_1^2+k_2^2+k_3^2=0
$$

は $k_1=k_2=k_3=0$ を強制します。つまり非零の光的共変ベクトル $k$ は時間的 $v$ を零化できません。$l$ も同様です。

[Hadamard波面集合条件](../../../解析系/MICA/MICA13/index.md#def-mica13-wfsc)に属する $(k,l)$ の両成分は非零の光的共変ベクトルです。従って $WF(W)$ と $F$ の余法集合は交わらず、[分布引戻し定理](../../../解析系/MICA/MICA7/index.md#thm-mica7-pullback)を適用できます。最後に $\chi(\tau)\chi(\tau')e^{-iE(\tau-\tau')}$ は $I\times I$ 上の滑らかなコンパクト支持試験関数なので分布との対が存在します。
<!-- proof-end -->

**鋭いオン・オフは別問題です。** 例えば区間の指示関数は滑らかな試験関数ではありません。$s=\tau-\tau'$ の $1/(s-i0)^2$ 型特異性に、切替の跳びをそのまま掛けても上の分布定理の仮定は満たせません。点状検出器の極限と切替の鋭さを同時に扱うなら追加の正則化・極限順序が必要です。

## 4. Minkowski真空の慣性検出器はなぜ有限時間だけ鳴るか

4次元Minkowski時空の**質量零**実自由スカラー場をMinkowski真空に置き、先の静止軌道 $x(\tau)=(\tau,\boldsymbol0)$ を取ります。正振動数平面波の二点分布は

$$
W_0(x,x')=\int_{\mathbb R^3}
\frac{d^3\boldsymbol k}{(2\pi)^3\,2|\boldsymbol k|}
e^{-i|\boldsymbol k|(t-t')+i\boldsymbol k\cdot(\boldsymbol x-\boldsymbol x')}.
$$

これは[QFT5のモード二点関数表示](../../QFT/QFT5/index.md#thm-qft5-wightman-positive)を、質量零のMinkowski真空で連続モードのデルタ規格化を用いて書いたものです。QFT5は時間方向を正とする旧計量規約で質量正を扱います（[計量規約の対照](../../../../../dream-theater-lorentz-conventions.md)）。ただし、ここで使う正エネルギー位相 $e^{-i\omega(t-t')}$ と場の演算子順序は同じです。質量零への拡張は $|\boldsymbol k|=0$ 近傍の $d^3\boldsymbol k/(2|\boldsymbol k|)$ が局所可積分であることから成り立ちます。球面積分 $d^3\boldsymbol k=4\pi\omega^2d\omega$ と $\omega=|\boldsymbol k|$ により、軌道上では分布として

$$
w_0(s)=W_0(x(\tau),x(\tau'))=
\frac{1}{4\pi^2}\int_0^\infty\omega e^{-i\omega s}\,d\omega
=-\frac{1}{4\pi^2(s-i0)^2},
\qquad s=\tau-\tau'.
$$

最後の等号は $\varepsilon>0$ を入れ、$\int_0^\infty \omega e^{-(\varepsilon+is)\omega}d\omega=(\varepsilon+is)^{-2}$ から $\varepsilon\downarrow0$ とした境界値です。右辺を普通の関数として $s=0$ へ代入してはいけません。

<a id="prop-qcurv6-inertial-spectrum"></a>

<!-- formal-statement-start -->
> **命題（慣性検出器の切替スペクトル）**  
> 上の4次元質量零Minkowski真空、静止世界線、実 $\chi\in C_c^\infty(\mathbb R)$、実 $E$ に対して、Fourier変換

$$
\widehat\chi(\nu)=\int_{\mathbb R}\chi(\tau)e^{-i\nu\tau}\,d\tau
$$

> を用いると、[応答関数](#def-qcurv6-response)は

$$
\boxed{\mathcal F_{\chi}(E)
=\frac{1}{4\pi^2}\int_0^\infty
\omega\,|\widehat\chi(E+\omega)|^2\,d\omega}
$$

> となる。$\chi$ が実で非零なら、任意の有限な $E$ について $\mathcal F_\chi(E)>0$。これは有限時間の切替を含む応答であり、無限時間の定常励起率ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$w_0$ の正周波数表示を応答積分へ入れると、二つの時間積分が互いに複素共役のFourier積分になります。有限の切替で励起が可能なのは、$\widehat\chi$ が周波数を一つに絞らないためです。

<!-- proof-start -->
### 証明

まず前式の $w_0(s)$ に $e^{-\varepsilon\omega}$ を掛けた正則化を用います。すると

$$
\begin{aligned}
\mathcal F_{\chi,\varepsilon}(E)
&=\frac{1}{4\pi^2}\int_0^\infty d\omega\,
\omega e^{-\varepsilon\omega}
\int d\tau\,\chi(\tau)e^{-i(E+\omega)\tau}
\int d\tau'\,\chi(\tau')e^{i(E+\omega)\tau'}\\
&=\frac{1}{4\pi^2}\int_0^\infty d\omega\,
\omega e^{-\varepsilon\omega}
|\widehat\chi(E+\omega)|^2.
\end{aligned}
$$

$\chi$ の滑らかさとコンパクト支持から $\widehat\chi$ は任意の冪より速く減衰します。従って $\omega|\widehat\chi(E+\omega)|^2$ は可積分で、優収束により $\varepsilon\downarrow0$ として表示式を得ます。

積分核は非負です。さらに非零のコンパクト支持関数のFourier変換は複素変数の整関数へ延長でき、もし半直線 $(E,\infty)$ 上で零なら恒等的に零となってしまいます。$\chi\ne0$ に矛盾するので、積分が正となる $\omega>0$ の開区間が存在し、$\mathcal F_\chi(E)>0$ です。
<!-- proof-end -->

### 手計算できる有限時間の例：ガウス切替

積分を明示するため、ここだけ $\chi_\sigma(\tau)=\exp[-\tau^2/(2\sigma^2)]$、$\sigma>0$ を取ります。これはコンパクト支持ではなくSchwartz関数ですが、$\widehat\chi_\sigma(\nu)=\sigma\sqrt{2\pi}e^{-\sigma^2\nu^2/2}$ は急減少なので上の正値積分が収束し、滑らかな切替の極限として同じ計算ができます。$z=\sigma E$ と書けば

$$
\begin{aligned}
\mathcal F_{\chi_\sigma}(E)
&=\frac{\sigma^2}{2\pi}\int_0^\infty
\omega e^{-\sigma^2(E+\omega)^2}\,d\omega\\
&=\frac{1}{2\pi}\int_z^\infty(y-z)e^{-y^2}\,dy\\
&=\frac1{4\pi}\left[
e^{-z^2}-\sqrt\pi z\,\operatorname{erfc}(z)\right],
\end{aligned}
$$

ここで $\operatorname{erfc}(z)=(2/\sqrt\pi)\int_z^\infty e^{-y^2}dy$ です。$E>0$ でも有限の $\sigma$ で厳密に正です。$\sigma E\gg1$ では括弧はおよそ $e^{-z^2}/(2z^2)$ となり、ゆっくり切り替えるほど励起は抑制されます。

## 5. 長時間の「率」を確率と取り違えない

定常な軌道と状態では、引戻した二点分布が $w(s)$、$s=\tau-\tau'$ だけで決まります。**定常**とは、この時間差依存性が成立するという意味です。$\chi$ が有限時間なら応答は依然として切替に依存します。無限時間の率には、切替を伸ばす規約と極限が必要です。

<a id="def-qcurv6-stationary-rate"></a>

<!-- formal-statement-start -->
> **定義（定常世界線の遷移率）**  
> 滑らかな時間的世界線と状態の組について $W_x(\tau,\tau')=w(\tau-\tau')$ が分布として成立するとき、これを定常な組と呼ぶ。非零の実 $\chi\in C_c^\infty(\mathbb R)$ を固定し、長時間切替 $\chi_T(\tau)=\chi(\tau/T)$、$T>0$ に対して、存在する場合の正規化遷移率を

$$
\dot{\mathcal F}(E)
=\lim_{T\to\infty}
\frac{\mathcal F_{\chi_T}(E)}
{T\int_{\mathbb R}|\chi(u)|^2\,du}
$$

> と定義する。極限が存在しない背景・状態では、この定義だけで一定の遷移率は得られない。$E>0$ は励起、$E<0$ は脱励起を表す。分母は切替の有効持続時間であり、実験器の励起確率そのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv6-stationary-rate -->
### 直接例：時間差と切替の役割

静止Minkowski真空の $w_0(s)$ は時間差だけに依存します。先の非零の滑らかな $\chi$ なら $\int\chi^2>0$ かつ有限で、$\chi_T$ は長さ $O(T)$ のコンパクト支持を持ちます。従って定常性と分母の条件が満たされます。ただし**率の値**は次の命題の極限計算で初めて確定し、定義だけでは決まりません。

**定義の確認**：定常性、非零切替、有効時間の分母の正値性をここで確認し、極限の存在と値は直後の命題で別途証明します。
<!-- definition-example-end -->

<a id="prop-qcurv6-long-time"></a>

<!-- formal-statement-start -->
> **命題（Minkowski慣性検出器の長時間遷移率）**  
> 4次元質量零Minkowski真空の静止検出器に対し、上の実非零 $\chi\in C_c^\infty(\mathbb R)$ で切替を伸ばすと、全ての実 $E$ で極限が存在し、

$$
\boxed{
\dot{\mathcal F}(E)=
\frac{-E}{2\pi}\,\Theta(-E)}
$$

> を得る。$\Theta(-E)$ は $E<0$ で1、$E>0$ で0とし、$E=0$ では右辺全体を0と定める。特に $\Omega>0$ の励起率は0、$-\Omega$ の脱励起率は $\Omega/(2\pi)$ である。有限時間の励起確率が零だという結論ではない。
<!-- formal-statement-end -->

### 証明の見取り図

切替を $T$ 倍に伸ばすとそのFourier変換は $T\widehat\chi(T\nu)$ になります。これを[切替スペクトル](#prop-qcurv6-inertial-spectrum)へ入れ、$\omega$ 積分で $y=T(E+\omega)$ と置きます。$E>0$ では積分領域が高周波側へ逃げ、$E<0$ では共鳴 $\omega=-E$ が積分領域に残ります。

<!-- proof-start -->
### 証明

変数変換 $u=\tau/T$ で $\widehat{\chi_T}(\nu)=T\widehat\chi(T\nu)$ です。[切替スペクトル](#prop-qcurv6-inertial-spectrum)に代入して

$$
\frac{\mathcal F_{\chi_T}(E)}{T}
=\frac{T}{4\pi^2}\int_0^\infty
\omega|\widehat\chi(T(E+\omega))|^2\,d\omega.
$$

$y=T(E+\omega)$ なら $\omega=y/T-E$、$d\omega=dy/T$ なので

$$
\frac{\mathcal F_{\chi_T}(E)}{T}
=\frac1{4\pi^2}\int_{TE}^\infty
\left(\frac yT-E\right)|\widehat\chi(y)|^2\,dy.
$$

$E>0$ では下端 $TE\to+\infty$ です。急減少性により、$|y/T-E|\le |y|/T+|E|$ と比較すると積分は0へ収束します。

$E<0$ では下端が $-\infty$ へ移り、$y/T$ の項は、$|y||\widehat\chi(y)|^2$ の可積分性から0へ収束します。残るのは

$$
\lim_{T\to\infty}\frac{\mathcal F_{\chi_T}(E)}T
=\frac{-E}{4\pi^2}\int_{\mathbb R}
|\widehat\chi(y)|^2dy
=\frac{-E}{2\pi}\int_{\mathbb R}|\chi(u)|^2du.
$$

最後はこのFourier変換規約でのPlancherel等式 $\int|\widehat\chi|^2=2\pi\int|\chi|^2$ を使いました。$E=0$ では

$$
\frac{\mathcal F_{\chi_T}(0)}T
=\frac1{4\pi^2T}\int_0^\infty
y|\widehat\chi(y)|^2dy\longrightarrow0.
$$

正の $\int\chi^2$ で割れば主張が出ます。
<!-- proof-end -->

### どこまでが温度の主張か

一般の定常状態で形式的に $\dot{\mathcal F}(E)=\int_{\mathbb R}e^{-iEs}w(s)\,ds$ となることは、二点分布の時間差Fourier変換を意味します。上のMinkowski真空で正のエネルギー間隔への励起率が0なのは、選んだ**慣性時間**に対する正周波数だけが存在するためです。

一様加速した世界線では、同じMinkowski真空でも別の $w(s)$ が現れます。その応答が熱的かは、正負エネルギー間隔の遷移率の比を検算して初めて言えます。有限の切替について**熱スペクトルそのもの**を宣言したり、検出器の励起を全時空の粒子数と同一視したりしません。

## 6. 状態を変えると何が変わるか

同じ背景・同じKG作用素で二つのHadamard状態の二点分布 $W_1,W_2$ を取ると、[MICA13の滑らかな差の命題](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)によって $D=W_1-W_2$ は滑らかです。従って同じ軌道・切替について

$$
\mathcal F_1(E)-\mathcal F_2(E)
=\int d\tau\,d\tau'\,
\chi(\tau)\chi(\tau')e^{-iE(\tau-\tau')}
D(x(\tau),x(\tau'))
$$

は普通の滑らかな核の積分として差を求められます。差の符号は一般に非負とも非正とも限りません。**Hadamard性は同じ局所特異構造を保証するが、個々の検出確率を一意に決めない**のです。

本章で厳密に計算したのは静止軌道とMinkowski真空の有限切替・長時間極限です。背景を変えたときの熱平衡、加速軌道での励起率と脱励起率の比、ブラックホールからの流束はまだ導出していません。

## 演習

### Level A：世界線・位相・分布の条件

<a id="ex-qcurv6-a01"></a>
#### QCURV6-A01 固有時間と切替を判定する

- Level: A
- 問題: 計量 $(-,+,+,+)$ のMinkowski時空で $|v|<1$、$\gamma=(1-v^2)^{-1/2}$ とし、$x(\tau)=(\gamma\tau,\gamma v\tau,0,0)$ を取る。$\dot x$ のノルムを調べ、$\chi_T(\tau)=\exp[-1/(1-\tau^2/T^2)]$（$|\tau|<T$、それ以外0）が[検出器の定義](#def-qcurv6-detector)に使える理由を述べよ。

<!-- solution-start -->
**詳細解答**：$\dot x=(\gamma,\gamma v,0,0)$ なので $g(\dot x,\dot x)=-\gamma^2+\gamma^2v^2=-\gamma^2(1-v^2)=-1$ です。$\gamma>0$ により未来向きです。関数の内部は滑らかで、境界 $|\tau|=T$ に近づくと指数は任意の冪より速く0へ減衰するため、各階微分が境界で0になります。従って零延長は $C^\infty$、実数値、支持 $[-T,T]$ のコンパクト支持関数です。さらに $\Omega>0$ と二準位を指定すれば定義の条件を満たします。
<!-- solution-end -->

<a id="ex-qcurv6-a02"></a>
#### QCURV6-A02 単極子の位相を出す

- Level: A
- 問題: $H_D=\Omega|e\rangle\langle e|$、$\sigma^+=|e\rangle\langle g|$、$\sigma^-=|g\rangle\langle e|$、$\Omega>0$ とする。$e^{iH_D\tau}\sigma^\pm e^{-iH_D\tau}$ を各基底への作用から導け。

<!-- solution-start -->
**詳細解答**：$e^{-iH_D\tau}|g\rangle=|g\rangle$、$e^{iH_D\tau}|e\rangle=e^{i\Omega\tau}|e\rangle$。従って $e^{iH_D\tau}\sigma^+e^{-iH_D\tau}|g\rangle=e^{i\Omega\tau}|e\rangle$ で、$|e\rangle$ には双方0を与えます。よって $e^{iH_D\tau}\sigma^+e^{-iH_D\tau}=e^{i\Omega\tau}\sigma^+$。同様に $|e\rangle$ へ作用させると $\sigma^-$ は $e^{-i\Omega\tau}$ を得ます。従って $\mu(\tau)=e^{i\Omega\tau}\sigma^++e^{-i\Omega\tau}\sigma^-$ です。
<!-- solution-end -->

<a id="ex-qcurv6-a03"></a>
#### QCURV6-A03 一モードの応答の正値性

- Level: A
- 問題: $W_x(\tau,\tau')=q e^{-i\omega(\tau-\tau')}$、$q,\omega>0$、実 $\chi\in C_c^\infty(\mathbb R)$ とする。[応答関数](#def-qcurv6-response)を $\widehat\chi$ で表し、$E>0$ でも零が保証されない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$e^{-iE(\tau-\tau')}$ と $W_x$ の積は $q e^{-i(E+\omega)\tau}e^{i(E+\omega)\tau'}$。二つの積分を分けると $\mathcal F(E)=q\widehat\chi(E+\omega)\overline{\widehat\chi(E+\omega)}=q|\widehat\chi(E+\omega)|^2\ge0$ です。有限時間の $\chi$ のFourier変換には一般に正の周波数尾があり、$E+\omega>0$ でも零とは限りません。
<!-- solution-end -->

<a id="ex-qcurv6-a04"></a>
#### QCURV6-A04 世界線の引戻しと対角評価

- Level: A
- 問題: $(M,g)$ 上の未来向き単位時間的接ベクトル $v$ を一点で正規直交基底により $v=(1,0,0,0)$ とする。$k(v)=0$ かつ $g^{-1}(k,k)=0$ なら $k=0$ を示せ。また、この事実が $W(x,x)$ の定義まで保証するか答えよ。

<!-- solution-start -->
**詳細解答**：$k(v)=k_0=0$ です。$0=g^{-1}(k,k)=-k_0^2+\sum_{j=1}^3k_j^2=\sum k_j^2$ より全ての $k_j=0$。従ってHadamard波面の非零光的方向と時間的世界線の余法方向が交わらず、[引戻し命題](#prop-qcurv6-pullback)の条件を満たします。ただし対角写像 $x\mapsto(x,x)$ の余法方向には $(k,-k)$ があり、Hadamard波面に現れます。従って生の $W(x,x)$ という対角値はこの議論からは得られません。
<!-- solution-end -->

<a id="ex-qcurv6-a05"></a>
#### QCURV6-A05 励起と脱励起で符号を確認する

- Level: A
- 問題: $\Omega>0$ とし、二点分布の一モード成分 $q e^{-i\omega s}$、$q,\omega>0$ を考える。励起と脱励起の応答がそれぞれ $\widehat\chi$ のどの引数を使うか示し、長時間で脱励起の共鳴が起きる条件を求めよ。

<!-- solution-start -->
**詳細解答**：励起は $E=+\Omega$ なので $\mathcal F(+\Omega)=q|\widehat\chi(\Omega+\omega)|^2$。脱励起は $E=-\Omega$ なので $\mathcal F(-\Omega)=q|\widehat\chi(\omega-\Omega)|^2$ です。長時間切替のFourier変換は零周波数へ集中するので、脱励起では $\omega-\Omega=0$、すなわち $\omega=\Omega$ が共鳴条件です。励起の $\Omega+\omega$ は正なので同じ共鳴を持ちません。
<!-- solution-end -->

### Level B：計算の中間式を再現する

<a id="ex-qcurv6-b01"></a>
#### QCURV6-B01 場の完全系から二点分布を戻す

- Level: B
- 問題: 初期 $|g,0\rangle$ と結合 $H_I(\tau)=\lambda\chi(\tau)(e^{i\Omega\tau}\sigma^++e^{-i\Omega\tau}\sigma^-)\phi(x(\tau))$ を取り、一次Dyson項から $|e,n\rangle$ への振幅を求めよ。$\sum_n|n\rangle\langle n|=1$ を使い、確率の $\lambda^2$ 係数が[応答関数](#def-qcurv6-response)に等しいことを示せ。

<!-- solution-start -->
**詳細解答**：$U_I^{(1)}=-i\int H_I d\tau$ で、$\langle e|\sigma^+|g\rangle=1$、$\langle e|\sigma^-|g\rangle=0$ により $\mathcal A_n=-i\lambda\int d\tau\,\chi(\tau)e^{i\Omega\tau}\langle n|\phi(x(\tau))|0\rangle$。二乗すると位相は $e^{i\Omega(\tau-\tau')}$、共役振幅は $\langle0|\phi(x(\tau'))|n\rangle$ です。完全系の和は $\langle0|\phi(x(\tau'))\phi(x(\tau))|0\rangle=W(x(\tau'),x(\tau))$。最後に $\tau$ と $\tau'$ を交換すると $\lambda^2\int d\tau d\tau'\chi(\tau)\chi(\tau')e^{-i\Omega(\tau-\tau')}W(x(\tau),x(\tau'))$ となります。分布の意味では滑らかな切替で対を取るため、[引戻し命題](#prop-qcurv6-pullback)の条件で正当化されます。
<!-- solution-end -->

<a id="ex-qcurv6-b02"></a>
#### QCURV6-B02 ガウス切替を最初から積分する

- Level: B
- 問題: 4次元質量零Minkowski真空の慣性検出器で、$\chi_\sigma(\tau)=e^{-\tau^2/(2\sigma^2)}$ とする（$\sigma>0$）。$\widehat\chi_\sigma(\nu)=\sigma\sqrt{2\pi}e^{-\sigma^2\nu^2/2}$ を使い、$z=\sigma E$ として $\mathcal F(E)$ を $\operatorname{erfc}(z)$ で表せ。コンパクト支持との違いにも触れよ。

<!-- solution-start -->
**詳細解答**：[スペクトルの命題](#prop-qcurv6-inertial-spectrum)の積分は、急減少切替に対しても絶対収束します。代入して $\mathcal F(E)=\sigma^2(2\pi)^{-1}\int_0^\infty\omega e^{-\sigma^2(E+\omega)^2}d\omega$。$y=\sigma(E+\omega)$ では $\omega=(y-z)/\sigma$、$d\omega=dy/\sigma$ なので $\mathcal F(E)=(2\pi)^{-1}[\int_z^\infty y e^{-y^2}dy-z\int_z^\infty e^{-y^2}dy]$ です。第1項は $e^{-z^2}/2$、第2項の積分は $\sqrt\pi\operatorname{erfc}(z)/2$。従って $\mathcal F(E)=[e^{-z^2}-\sqrt\pi z\operatorname{erfc}(z)]/(4\pi)$。ガウス関数は全実線で非零なので $C_c^\infty$ ではなくSchwartz級ですが、分布との対と積分はその急減少性で定義できます。
<!-- solution-end -->

<a id="ex-qcurv6-b03"></a>
#### QCURV6-B03 長時間極限の二つの符号

- Level: B
- 問題: 実非零 $\chi\in C_c^\infty(\mathbb R)$ と $\chi_T(\tau)=\chi(\tau/T)$ を取る。[慣性スペクトル](#prop-qcurv6-inertial-spectrum)を使って、$E>0$ と $E<0$ それぞれの $\lim_{T\to\infty}\mathcal F_{\chi_T}(E)/T$ を求めよ。Fourierの $2\pi$ を明示せよ。

<!-- solution-start -->
**詳細解答**：$\widehat{\chi_T}(\nu)=T\widehat\chi(T\nu)$ を代入し、$y=T(E+\omega)$ で $\mathcal F/T=(4\pi^2)^{-1}\int_{TE}^\infty(y/T-E)|\widehat\chi(y)|^2dy$ です。$E>0$ なら積分領域は $TE\to+\infty$ となり急減少から0へ行きます。$E<0$ なら下端は $-\infty$、$y/T$ の寄与は可積分性から0。従って極限は $(-E)/(4\pi^2)\int_{\mathbb R}|\widehat\chi(y)|^2dy=(-E)/(2\pi)\int_{\mathbb R}\chi(u)^2du$ です。分母 $T\int\chi^2$ で割った[遷移率](#def-qcurv6-stationary-rate)は $E<0$ で $-E/(2\pi)$、$E>0$ で0です。
<!-- solution-end -->

<a id="ex-qcurv6-b04"></a>
#### QCURV6-B04 二つのHadamard状態の差を評価する

- Level: B
- 問題: 同一の背景・同一の自由KG作用素を持つ二つのHadamard二点分布 $W_1,W_2$ について、$D=W_1-W_2$ とする。$\chi$ が実でコンパクト支持のとき、$\Delta\mathcal F(E)$ を滑らかな二重積分で書ける理由を述べよ。さらに $D(x,y)=c\,f(x)f(y)$、$c\ge0$、$f$ が滑らかな実KG解の場合を計算せよ。

<!-- solution-start -->
**詳細解答**：[Hadamard二点分布の滑らかな差](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)より $D$ は $M\times M$ 上で滑らかです。世界線への通常の関数合成が存在し、$\Delta\mathcal F(E)=\int d\tau d\tau'\chi(\tau)\chi(\tau')e^{-iE(\tau-\tau')}D(x(\tau),x(\tau'))$。指定の分離形では二つの積分を分けられ、$\Delta\mathcal F(E)=c|\int\chi(\tau)f(x(\tau))e^{-iE\tau}d\tau|^2\ge0$ です。ただし一般の $D$ がこの非負形とは限らず、差の符号を固定してはいけません。
<!-- solution-end -->

### Level C：切替から観測の意味までつなぐ

<a id="ex-qcurv6-c01"></a>
#### QCURV6-C01 同じ真空で有限時間の励起と定常率を比較する

- Level: C
- 問題: 4次元質量零Minkowski真空、$x(\tau)=(\tau,\boldsymbol0)$、二準位間隔 $\Omega>0$ の点状検出器を考える。実非零 $\chi\in C_c^\infty(\mathbb R)$ を用い、次の4点を示せ。

  1. 一次摂動から場の終状態を和に取って応答を導出せよ。
  2. モード積分から有限切替の $\mathcal F_{\chi}(+\Omega)$ が正であることを示せ。
  3. $\chi_T(\tau)=\chi(\tau/T)$ について励起・脱励起の長時間率を求めよ。
  4. 第2問と第3問が矛盾しない理由と、加速観測者の温度をまだ導けない理由を答えよ。

<!-- solution-start -->
**詳細解答**：

**(1)** $\mu(\tau)$ の励起成分は $e^{i\Omega\tau}\sigma^+$ です。一次振幅は $\mathcal A_n=-i\lambda\int d\tau\chi(\tau)e^{i\Omega\tau}\langle n|\phi(x(\tau))|0\rangle$。完全系を入れて二乗・総和すれば $\sum_n|\mathcal A_n|^2=\lambda^2\int d\tau d\tau'\chi(\tau)\chi(\tau')e^{i\Omega(\tau-\tau')}W(x(\tau'),x(\tau))$ です。二変数を交換して $\lambda^2\mathcal F_\chi(+\Omega)$ を得ます。

**(2)** 静止軌道では $w_0(s)=\int_0^\infty\omega e^{-i\omega s}d\omega/(4\pi^2)$ です。角度積分により $4\pi\omega^2/[(2\pi)^3\,2\omega]=\omega/(4\pi^2)$ を確認できます。よって $\mathcal F_\chi(+\Omega)=\int_0^\infty\omega|\widehat\chi(\Omega+\omega)|^2d\omega/(4\pi^2)>0$。最後の不等号は非零 $\chi$ のFourier変換が開いた半直線で恒等的に零になれないためです。

**(3)** $\widehat{\chi_T}(\nu)=T\widehat\chi(T\nu)$ から $y=T(E+\omega)$ と変換すると $\mathcal F_{\chi_T}(E)/T=(4\pi^2)^{-1}\int_{TE}^\infty(y/T-E)|\widehat\chi(y)|^2dy$ です。$E=+\Omega$ の場合は下限が正の無限大へ行くため0。$E=-\Omega$ の場合は $y/T$ が消え、残りは $\Omega\int|\widehat\chi|^2/(4\pi^2)=\Omega\int\chi^2/(2\pi)$ です。従って[正規化率](#def-qcurv6-stationary-rate)はそれぞれ $0,\Omega/(2\pi)$ です。

**(4)** (2) は有限時間のオン・オフによる全確率の最低次数で、(3) は持続時間で割って $T\to\infty$ とする率です。各有限 $T$ で正でも、確率を $T$ で割った極限は0になれます。さらにここで使ったのは慣性軌道の $w_0(s)$ だけです。加速軌道では $W_0(x(\tau),x(\tau'))$ を引き戻し直し、正負ギャップの定常遷移率の比を計算する必要があり、未計算の温度を主張できません。
<!-- solution-end -->
