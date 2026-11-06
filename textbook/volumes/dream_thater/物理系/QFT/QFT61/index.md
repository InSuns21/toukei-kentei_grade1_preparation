# QFT61 局所モジュラーハミルトニアンとエンタングルメント第一法則

<!-- definition-example-audit: strict -->

[QFT60の区間エントロピー](../QFT60/index.md#thm-qft60-conditional-von-neumann)は、真空・熱・円周という異なる状態のエントロピーを具体的に求めました。しかし「状態が少し変わるとエントロピーはいくら変わるか」を、そのたびにレプリカ計算から始めるのは大変です。

この問いに答える道具が**モジュラーハミルトニアン**です。通常のHamiltonianが時間発展を生成するのに対し、モジュラーハミルトニアンは、ある**参照状態の領域への制限**から作る演算子です。一般には空間的に非局所ですが、二次元共形場理論（CFT）の真空の単一区間には、エネルギー密度の積分で書ける特別な場合があります。

本講では、まず有限cutoffの有限次元Hilbert空間で対数・微分を証明し、後半で二次元CFTの真空区間へ移ります。連続場の局所代数を無条件に密度行列で表せるとは仮定しません。計量は $(-,+)$、速度と $k_B$ は1です。

## 1. 参照状態の対数を取る

[QFT57のcutoff付き領域縮約状態](../QFT57/index.md#def-qft57-regulated-reduction)を思い出します。cutoffを固定し、有限次元の $H_A$ 上で $\operatorname{Tr}\rho_A=1$、$\rho_A\ge0$ とします。正の固有値しか持たない密度演算子を**忠実**（full rank）と呼びます。これは $\log\rho_A$ が全空間上の有界なHermitian行列として定義できる条件です。零固有値があれば、通常の行列対数を全空間で取れません。

同じ領域 $A$ における忠実な**参照**密度演算子 $\sigma_A$ を固定します。その対数に負号を付けた演算子を、次の定義で導入します。状態を変えても参照 $\sigma_A$ は固定する点が重要です。

<a id="def-qft61-modular-hamiltonian"></a>

<!-- formal-statement-start -->
> **定義（規格化モジュラーハミルトニアン）**
> 有限次元Hilbert空間 $H_A$ 上の忠実な密度演算子 $\sigma_A>0$、$\operatorname{Tr}\sigma_A=1$ に対して

$$
K_{\sigma,A}:=-\log\sigma_A
$$

> を規格化モジュラーハミルトニアンと呼ぶ。スペクトル分解 $\sigma_A=\sum_jp_j|j\rangle\langle j|$（$p_j>0$、$\sum_jp_j=1$）により $K_{\sigma,A}=\sum_j(-\ln p_j)|j\rangle\langle j|$ と定義する。従って $\sigma_A=e^{-K_{\sigma,A}}$、$\operatorname{Tr}e^{-K_{\sigma,A}}=1$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft61-modular-hamiltonian -->
**定義の確認**：二準位の正規直交基底 $|0\rangle,|1\rangle$ で $\sigma_A=(3/4)|0\rangle\langle0|+(1/4)|1\rangle\langle1|$ とします。この基底での行列表現が $\operatorname{diag}(3/4,1/4)$ です。射影 $|j\rangle\langle j|$ によるスペクトル分解なので、対角成分は固有値そのものです。両固有値が正であることから正定値・忠実性が、和が1であることからトレースの規格化が確かめられます。

$$
K_{\sigma,A}=\operatorname{diag}\left(\ln\frac43,\ln4\right),\qquad
e^{-K_{\sigma,A}}=\operatorname{diag}\left(\frac34,\frac14\right).
$$

指数を成分ごとに取り $\operatorname{Tr}e^{-K}=3/4+1/4=1$ と確かめられます。片方の固有値が0なら $\ln0$ は有限値でないため、この定義の忠実性条件を満たしません。
<!-- definition-example-end -->

しばしば $K=-\log\sigma+\text{定数}$ と書きます。これは $K$ に $bI$ を加えても、$\sigma=e^{-K}/\operatorname{Tr}e^{-K}$ が変わらないという意味です。本講の有限次元定義は $\operatorname{Tr}e^{-K}=1$ で定数を固定します。後半の場の理論ではこの定数がUV正規化に依存しますが、正規化された状態同士の**期待値の差**では定数は消えます。

## 2. 小さな状態変化に対する第一法則

参照状態 $\sigma_A$ を動かさず、別の密度演算子の滑らかな経路 $\rho_A(\varepsilon)$ を考えます。$\rho_A(0)=\sigma_A$ とすると、$\rho_A'(0)=X=X^\dagger$ で $\operatorname{Tr}X=0$ です。$\sigma_A$ が正定値なので、十分小さい $\varepsilon$ では $\rho_A(\varepsilon)$ も正定値に取れます。

領域エントロピー $S(\rho)=-\operatorname{Tr}(\rho\log\rho)$ の一次変化が、なぜ $K_{\sigma,A}$ の期待値変化に一致するかを証明します。「熱力学の $\delta Q=T\delta S$ と似ている」という比喩だけでは、行列が非可換な場合を説明できません。

<a id="thm-qft61-first-law"></a>

<!-- formal-statement-start -->
> **定理（有限次元エンタングルメント第一法則）**
> 有限次元 $H_A$ 上で忠実な参照状態 $\sigma_A>0$ を固定し、$\rho_A(\varepsilon)$ を $\rho_A(0)=\sigma_A$、$\operatorname{Tr}\rho_A(\varepsilon)=1$ を満たす微分可能な密度演算子の経路とする。$X=\rho_A'(0)$ と置くと

$$
\left.\frac{d}{d\varepsilon}S(\rho_A(\varepsilon))\right|_{0}
=\operatorname{Tr}(XK_{\sigma,A})
=\left.\frac{d}{d\varepsilon}
\operatorname{Tr}(\rho_A(\varepsilon)K_{\sigma,A})\right|_0.
$$

> 従って一次の差分記法では $\delta S_A=\delta\langle K_{\sigma,A}\rangle$ である。これは参照 $\sigma_A$ での**一次変化**を述べるもので、有限の状態差に対する等式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

行列対数の微分を扱う際、$\rho$ と $X$ が可換であるとは仮定しません。対数の積分表示を使い、トレースの中で現れる $\operatorname{Tr}(\sigma_A\,d\log\rho)$ が $\operatorname{Tr}X=0$ に等しいことを示します。

<!-- proof-start -->
### 証明

正定値行列 $M$ の対数の積分表示は、正の固有値 $p$ についての

$$
\ln p=\int_0^\infty\left(\frac1{1+t}-\frac1{p+t}\right)dt
$$

をスペクトル分解へ適用したものです。これを $M=\rho_A(\varepsilon)$ で微分し、逆行列の微分 $d(M+tI)^{-1}/d\varepsilon=-(M+tI)^{-1}M'(M+tI)^{-1}$ を用いると

$$
\left.\frac{d}{d\varepsilon}\log\rho_A(\varepsilon)\right|_0
=\int_0^\infty(\sigma_A+tI)^{-1}X(\sigma_A+tI)^{-1}\,dt.
$$

有限次元かつ $\sigma_A>0$ なので、各成分の積分と微分の交換は最小固有値による下界で正当化できます。$\sigma_A$ を対角化して $\sigma_A=\operatorname{diag}(p_1,\ldots,p_d)$、$p_i>0$ とすると、トレースの中では

$$
\begin{aligned}
\operatorname{Tr}\left[\sigma_A\left.\frac{d}{d\varepsilon}\log\rho_A\right|_0\right]
&=\sum_i p_iX_{ii}\int_0^\infty\frac{dt}{(p_i+t)^2}\\
&=\sum_i p_iX_{ii}\left[\frac1{p_i}\right]
=\sum_iX_{ii}=\operatorname{Tr}X=0.
\end{aligned}
$$

$X$ の非対角成分を消してから微分したわけではありません。微分公式は非可換な $X$ にも成立し、トレースを取ったあとに対角成分だけが残ります。積の微分と $\rho_A(0)=\sigma_A$ より

$$
\begin{aligned}
\left.\frac{dS}{d\varepsilon}\right|_0
&=-\operatorname{Tr}(X\log\sigma_A)
-\operatorname{Tr}\left[\sigma_A\left.\frac{d}{d\varepsilon}\log\rho_A\right|_0\right]\\
&=-\operatorname{Tr}(X\log\sigma_A)
=\operatorname{Tr}(XK_{\sigma,A}).
\end{aligned}
$$

右辺は $K_{\sigma,A}$ を固定して $\operatorname{Tr}(\rho_A(\varepsilon)K_{\sigma,A})$ を微分したものそのものです。
<!-- proof-end -->

**最小例**：先ほどの $\sigma=\operatorname{diag}(3/4,1/4)$ に対して

$$
\rho(\varepsilon)=\operatorname{diag}\left(\frac34+\varepsilon,\frac14-\varepsilon\right),
\qquad |\varepsilon|<\frac14
$$

と取ります。直接微分すれば

$$
\left.\frac{dS}{d\varepsilon}\right|_0
=-\left(\ln\frac34+1\right)+\left(\ln\frac14+1\right)
=-\ln3.
$$

一方 $\operatorname{Tr}(XK)=\ln(4/3)-\ln4=-\ln3$ です。**モジュラーエネルギー**とは、この固定した $K_{\sigma,A}$ の期待値を指します。通常のエネルギー $\langle H\rangle$ と必ず同じではありません。

## 3. 有限の差は相対エントロピーで測る

第一法則は「参照状態での微分」についての主張でした。有限の変化では、両辺の差を測る量が必要です。[QINF20の量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)は、状態の支持条件を含めてその役割を担います。

ただしQINF20はビット単位の $\log_2$ で定義していました。本講のエントロピーは自然対数による $S=-\operatorname{Tr}\rho\ln\rho$ なので、相対エントロピーも自然対数に合わせます。QINF20の値を $D_2$、本講の値を $D$ と呼ぶと、換算は

$$
D(\rho\Vert\sigma)=(\ln2)\,D_2(\rho\Vert\sigma)
$$

です。この正の係数は非負性・等号条件を変えません。

参照 $\sigma_A>0$ に対し、任意の有限次元密度演算子 $\rho_A$ の相対エントロピーは

$$
D(\rho_A\Vert\sigma_A)
=\operatorname{Tr}\rho_A(\log\rho_A-\log\sigma_A)
$$

です（ここ以降の $\log$ は自然対数で、$\rho_A$ の零固有値の寄与は $0\ln0=0$ と解釈）。これを $K_{\sigma,A}=-\log\sigma_A$ で書き直すだけで、有限差に関する重要な恒等式になります。

<a id="prop-qft61-relative-balance"></a>

<!-- formal-statement-start -->
> **命題（相対エントロピーとモジュラーエネルギーの差）**
> 有限次元 $H_A$ の忠実な密度演算子 $\sigma_A>0$ と任意の密度演算子 $\rho_A$ に対し、$\Delta S=S(\rho_A)-S(\sigma_A)$、$\Delta\langle K_\sigma\rangle=\operatorname{Tr}[(\rho_A-\sigma_A)K_{\sigma,A}]$ と置く。このとき

$$
D(\rho_A\Vert\sigma_A)=\Delta\langle K_\sigma\rangle-\Delta S\ge0.
$$

> 従って $\Delta S\le\Delta\langle K_\sigma\rangle$。不等号の根拠は[QINF20の相対エントロピー非負性](../../../応用系/QINF/QINF20/index.md#prop-qinf20-nonnegative)であり、等号は $\rho_A=\sigma_A$ の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

相対エントロピーの二つの対数を分けます。参照自身のエントロピーは $\operatorname{Tr}(\sigma K_\sigma)$ なので、定数項が消えます。最後の非負性は既習の有限次元定理を適用します。

<!-- proof-start -->
### 証明

$-\operatorname{Tr}\rho\log\rho=S(\rho)$ と $K_\sigma=-\log\sigma$ から

$$
D(\rho\Vert\sigma)=-S(\rho)+\operatorname{Tr}(\rho K_\sigma).
$$

参照自身では $D(\sigma\Vert\sigma)=0$、かつ $S(\sigma)=\operatorname{Tr}(\sigma K_\sigma)$ なので、差を取ると

$$
D(\rho\Vert\sigma)
=\operatorname{Tr}[(\rho-\sigma)K_\sigma]
-[S(\rho)-S(\sigma)].
$$

$\operatorname{supp}\rho\subseteq H_A=\operatorname{supp}\sigma$ だから[相対エントロピー非負性](../../../応用系/QINF/QINF20/index.md#prop-qinf20-nonnegative)を適用できます。一般の零固有値をもつ参照状態ではこの支持条件が自動ではなく、有限値の式を無条件には書けません。
<!-- proof-end -->

第一法則との関係も確認します。$\rho(\varepsilon)=\sigma+\varepsilon X+o(\varepsilon)$ で $\sigma>0$ なら、[第一法則](#thm-qft61-first-law)より $D(\rho(\varepsilon)\Vert\sigma)$ の一次項は

$$
\frac{dD}{d\varepsilon}\bigg|_0
=\frac{d\langle K_\sigma\rangle}{d\varepsilon}\bigg|_0
-\frac{dS}{d\varepsilon}\bigg|_0=0.
$$

したがって**一次の一致と有限差の不等式は両立**します。非負性だけから任意の $\rho$ で $\Delta S=\Delta\langle K\rangle$ とは言えません。

**二準位での二次差**：第2節の対角経路では

$$
\begin{aligned}
D(\rho(\varepsilon)\Vert\sigma)
&=\left(\frac34+\varepsilon\right)
\ln\left(1+\frac{4\varepsilon}{3}\right)
+\left(\frac14-\varepsilon\right)\ln(1-4\varepsilon)\\
&=\frac83\varepsilon^2+O(\varepsilon^3).
\end{aligned}
$$

$\ln(1+t)=t-t^2/2+O(t^3)$ を各項に使うと一次係数は $\varepsilon-\varepsilon=0$、二次係数は $1/[2(3/4)]+1/[2(1/4)]=8/3$ です。これが有限差を一次法則で置き換えてはいけない最小の反例です。

## 4. 真空区間を直線へ写すと何が起こるか

ここからは有限次元の代数的恒等式とは別の、**二次元CFTの幾何に依存する結果**です。空間直線の真空で $A=(u,v)$、$u<v$ を取ります。Euclid座標 $z=x+i\tau$ を使い、区間の両端をそれぞれ $0,\infty$ に送る分数線形写像と対数を組み合わせます。

$$
w(z)=\log\frac{z-u}{v-z}.
$$

実軸の区間内部 $u<x<v$ では対数の中は正で、$w$ は実数です。cutoffで端点を避けてから

$$
\frac{dw}{dx}
=\frac1{x-u}+\frac1{v-x}
=\frac{v-u}{(x-u)(v-x)}
$$

となり、逆のJacobianは

$$
\frac{dx}{dw}=\frac{(x-u)(v-x)}{v-u}
=:f_{u,v}(x).
$$

これは端点で0、中心で $(v-u)/4$ となる正の重みです。$w$ の虚部を $2\pi$ 回転させるEuclid角度発展を考えると、区間の真空縮約状態に対応するモジュラー流の生成子を考えられます。ただし、ここには**真空のEuclid経路積分の切断・貼り合わせと、共形変換による幾何学的モジュラー流が成立する**という場の理論側の入力が必要です。有限次元の第一法則だけからこの入力は出ません。

<a id="thm-qft61-vacuum-interval"></a>

<!-- formal-statement-start -->
> **定理（二次元CFT真空区間の局所モジュラー重み）**
> 無限直線上の二次元ユニタリCFTのPoincaré不変真空を取り、等時刻区間 $A=(u,v)$（$u<v$）を考える。真空の区間縮約状態が、cutoffを保ったEuclid経路積分の切断と幾何学的モジュラー流で記述でき、共形写像 $w=\log[(z-u)/(v-z)]$ の虚部の $2\pi$ 並進がその流れを生成すると仮定する。このとき真空区間のモジュラーハミルトニアンの状態依存部分は

$$
K_A^{\mathrm{vac}}
=2\pi\int_u^v
\frac{(x-u)(v-x)}{v-u}\,T_{00}(0,x)\,dx+C_A I.
$$

> $T_{00}$ は平坦時空のエネルギー密度、$C_A$ は参照状態の規格化とcutoffで定まる状態に依存しない定数である。式は適切に正則化した演算子またはその期待値差として読む。任意の励起状態や複数区間でモジュラーハミルトニアンが局所になるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

区間を対数座標の直線へ写し、角度を $2\pi$ 動かすEuclid発展の局所生成子を元の $x$ 座標で書きます。Jacobianが上の重みとなり、共形異常の状態非依存項は定数へ入ります。

<!-- proof-start -->
### 証明

まず $\zeta=(z-u)/(v-z)$ で区間内部を正の実軸へ写し、$w=\log\zeta$ でその軸を実直線へ写す。$u<x<v$ で

$$
\partial_xw=\frac1{x-u}+\frac1{v-x}
=\frac{v-u}{(x-u)(v-x)},\qquad
(\partial_xw)^{-1}=f_{u,v}(x).
$$

この正則写像が時間発展の重みになる理由を確認します。$z=x+i\tau$ で $x$ を固定して $\tau$ だけ微小に変えると、正則写像の連鎖律から $\delta w=(dw/dz)i\,\delta\tau$ です。$\tau=0$ の区間内部では $dw/dz=dw/dx=1/f_{u,v}(x)$ は正の実数なので、角度変数 $\theta:=\operatorname{Im}w$ には

$$
\delta\theta=\frac{\delta\tau}{f_{u,v}(x)},\qquad
\left.\frac{\partial\tau}{\partial\theta}\right|_{\tau=0}=f_{u,v}(x)
$$

が成り立ちます。幾何学的モジュラー流の仮定で $\theta$ を $2\pi$ 進める生成子を、Euclid時間 $\tau$ からLorentz時間 $t$ へ解析接続したものが、等時刻切片で

$$
\xi^t(0,x)=2\pi f_{u,v}(x)
=2\pi\frac{(x-u)(v-x)}{v-u},\qquad \xi^x(0,x)=0
$$

を持ちます。ここで $\xi^t$ はLorentz時間 $t$ に沿うベクトル場の成分で、$\xi^x$ は空間成分です。時間成分だけが残る等時刻の保存荷は、境界を除いたcutoff区間で $\int \xi^tT_{00}\,dx$ です。両端から距離 $a$ だけ除く $0<a<(v-u)/2$ の端点cutoffを最後まで保持した荷は

$$
2\pi\int_{u+a}^{v-a}f_{u,v}(x)T_{00}(0,x)\,dx
$$

であり、$a\to0$ の許容される意味で上記の積分へ移る。共形変換に伴うSchwarzianの真空項・経路積分の規格化は、モジュラー演算子の状態非依存な倍数、すなわち $K$ の定数 $C_AI$ に吸収されます。これを $\operatorname{Tr}e^{-K}=1$ に合わせるにはcutoffの指定が必要です。よって式は幾何学的モジュラー流を**入力に持つ**結果であり、一般の場の真空で幾何学的流が成立することを無前提で証明したのではありません。
<!-- proof-end -->

**重みの直接確認**：$u=0,v=\ell$ のとき $f(x)=x(\ell-x)/\ell$ です。$x=\ell/2$ で $f=\ell/4$、$x=0,\ell$ で0、内部では $f>0$。このため端点の近くでのエネルギー密度変化は中心での同じ変化より小さなモジュラー重みで測られます。局所重みは「どこにエネルギーを置くか」に依存し、ただの定数倍の全Hamiltonianではありません。

**適用範囲の注意**：有限次元の一般の $\sigma_A$ に対する $K=-\log\sigma_A$ は必ず存在しますが、そこから $\int_A fT_{00}$ という局所形は導けません。例えば複数区間や一般の励起状態では、モジュラー流が幾何学的な共形写像に対応するとは限りません。また連続QFTの鋭い領域は通常、有限次元の部分トレースとは異なる局所代数の構造を持ちます。本節は二次元CFTの真空と正則化された期待値差の関係を述べるもので、任意の無限次元密度行列の存在証明ではありません。

## 5. QFT60の熱・円周公式を第一法則で検算する

平面の真空区間に対する[局所モジュラー重み](#thm-qft61-vacuum-interval)を使って、空間一様な小さなエネルギー密度差 $\Delta\langle T_{00}\rangle=e$ を考えます。これは任意の有限摂動を一次法則へ代入する操作ではありません。参照真空へ近づく滑らかな状態族があり、固定した区間・cutoffで第一法則と共形極限を適用できる場合の先頭項を比較します。

必要な積分は

$$
\int_0^\ell\frac{x(\ell-x)}{\ell}\,dx
=\frac1\ell\left[\frac{\ell x^2}{2}-\frac{x^3}{3}\right]_0^\ell
=\frac{\ell^2}{2}-\frac{\ell^2}{3}
=\frac{\ell^2}{6}.
$$

従って $\Delta\langle K_A^{\mathrm{vac}}\rangle=(\pi\ell^2/3)e$ です。$e$ が小さいときの一次エントロピー差も同じです。

<a id="prop-qft61-uniform-energy"></a>

<!-- formal-statement-start -->
> **命題（一様エネルギー摂動の短区間照合）**
> [真空区間の局所モジュラー重み](#thm-qft61-vacuum-interval)の成立条件の下、参照真空へ近づく状態族に対し区間内の一次のエネルギー密度差が空間一様に $e$ であり、[第一法則](#thm-qft61-first-law)の正則化・極限交換が正当化できるとする。このとき

$$
\Delta S_A=\frac{\pi\ell^2}{3}e+o(e)
$$

> が成り立つ。二次元CFTで左右中心電荷 $c=\bar c$ の熱状態の $e_\beta=\pi c/(6\beta^2)>0$、空間円周の恒等真空の $e_L=-\pi c/(6L^2)<0$ を平面真空からの小区間エネルギー密度差として使うと、先頭項はそれぞれ $+\pi^2c\ell^2/(18\beta^2)$、$-\pi^2c\ell^2/(18L^2)$ となる。これらは $\ell/\beta\ll1$、$\ell/L\ll1$ の普遍項の照合である。
<!-- formal-statement-end -->

### 証明の見取り図

重みを積分すると $\ell^2/6$ です。熱状態と円周真空のエネルギー密度は符号が異なり、QFT60の $\sinh$ と $\sin$ の短区間補正も同じ符号になります。

<!-- proof-start -->
### 証明

区間 $A=(0,\ell)$ とし、一様な $\Delta\langle T_{00}\rangle=e$ を[局所モジュラー重み](#thm-qft61-vacuum-interval)に代入します。定数 $C_AI$ の期待値差は、状態が規格化されているため $C_A\operatorname{Tr}(\rho-\sigma)=0$ です。よって

$$
\Delta\langle K_A^{\mathrm{vac}}\rangle
=2\pi e\int_0^\ell\frac{x(\ell-x)}{\ell}\,dx
=2\pi e\frac{\ell^2}{6}
=\frac{\pi\ell^2}{3}e.
$$

固定cutoffで状態族を微分でき、連続極限で微分可能な誤差が制御されるとき、[有限次元エンタングルメント第一法則](#thm-qft61-first-law)を適用して $\Delta S_A=(\pi\ell^2/3)e+o(e)$ を得ます。熱状態では $e_\beta=\pi c/(6\beta^2)$ を代入し

$$
\frac{\pi\ell^2}{3}\frac{\pi c}{6\beta^2}
=\frac{\pi^2c\ell^2}{18\beta^2}.
$$

円周真空では[QFT55の円周真空エネルギー](../QFT55/index.md#thm-qft55-cylinder-spectrum) $E_0(L)=-\pi c/(6L)$ を周長 $L$ で割ると $e_L=-\pi c/(6L^2)$ なので $-\pi^2c\ell^2/(18L^2)$ となります。

一方[QFT60の条件付きvon Neumann式](../QFT60/index.md#thm-qft60-conditional-von-neumann)と[短区間展開](../QFT60/index.md#prop-qft60-short-interval)では、平面の $\frac c3\ln(\ell/a)+k_1$ を引いた差の普遍項は

$$
\frac c3\left(\pm\frac{\pi^2\ell^2}{6d^2}
+O\left(\frac{\ell^4}{d^4}\right)\right)
=\pm\frac{\pi^2c\ell^2}{18d^2}
+O\left(\frac{\ell^4}{d^4}\right),
$$

ただし熱で $(+,d=\beta)$、円周で $(-,d=L)$ です。先頭係数が一致しました。この照合は円筒公式の成立条件、規格化の共通性、熱・円周の極限での状態族の制御を別途必要とします。
<!-- proof-end -->

**何が検算できたか**：レプリカから出したエントロピーの小区間二次係数を、**エネルギー密度の一点関数と局所重み**から再現しました。逆に、この一致だけでモジュラーハミルトニアンの局所形や一般の相対エントロピー単調性まで証明できるわけではありません。

## 6. 演習：対数・重み・状態差を独立に計算する

<a id="ex-qft61-a01"></a>

### QFT61-A01 二準位の規格化

- Level: A
- 対応目標: 忠実性・モジュラー対数・指数の規格化

$\sigma=\operatorname{diag}(2/3,1/3)$ に対して $K_\sigma$ を求め、$\operatorname{Tr}e^{-K_\sigma}=1$ を確かめよ。また別の参照状態 $\widetilde\sigma=\operatorname{diag}(1,0)$ で同じ定義が全空間上の有界行列として使えない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$\sigma$ の固有値 $2/3,1/3$ は正で和が1です。[規格化モジュラーハミルトニアン](#def-qft61-modular-hamiltonian)から

$$
K_\sigma=\operatorname{diag}\left(\ln\frac32,\ln3\right),\qquad
e^{-K_\sigma}=\operatorname{diag}\left(\frac23,\frac13\right).
$$

従って $\operatorname{Tr}e^{-K_\sigma}=2/3+1/3=1$。$\widetilde\sigma$ の零固有値について $-\ln0$ は有限値ではなく、忠実性が失われます。支持空間上だけで対数を定義する別の議論は可能ですが、本講の全空間の定義条件には含まれません。
<!-- solution-end -->

<a id="ex-qft61-a02"></a>

### QFT61-A02 対角摂動の第一法則

- Level: A
- 対応目標: エントロピー微分と期待値微分

$\sigma=\operatorname{diag}(2/3,1/3)$、$\rho(\varepsilon)=\operatorname{diag}(2/3+\varepsilon,1/3-\varepsilon)$（$|\varepsilon|<1/3$）に対して $S'(0)$ と $\operatorname{Tr}(\rho'(0)K_\sigma)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$S(\rho)=-p\ln p-(1-p)\ln(1-p)$、$p=2/3+\varepsilon$ と置くと

$$
S'(\varepsilon)=-(\ln p+1)+(\ln(1-p)+1)
=\ln\frac{1-p}{p}.
$$

従って $S'(0)=\ln[(1/3)/(2/3)]=-\ln2$ です。他方 $X=\rho'(0)=\operatorname{diag}(1,-1)$ なので、[定義](#def-qft61-modular-hamiltonian)から

$$
\operatorname{Tr}(XK_\sigma)=\ln\frac32-\ln3=-\ln2.
$$

どちらの計算でも $\operatorname{Tr}X=0$ が $+1$ の項を打ち消しています。
<!-- solution-end -->

<a id="ex-qft61-a03"></a>

### QFT61-A03 区間重みの形

- Level: A
- 対応目標: Jacobianと端点挙動

$u=-r,v=r$、$r>0$ として $w(x)=\ln[(x+r)/(r-x)]$ の導関数、逆Jacobian $f_{-r,r}(x)$ を求め、中心と端点での値を示せ。

<!-- solution-start -->
### 詳細解答

$-r<x<r$ では対数の引数は正です。微分すると

$$
w'(x)=\frac1{x+r}+\frac1{r-x}
=\frac{2r}{r^2-x^2},\qquad
f_{-r,r}(x)=\frac1{w'(x)}=\frac{r^2-x^2}{2r}.
$$

中心 $x=0$ で $f=r/2$、端点への片側極限では $f\to0$、区間内部では $r^2-x^2>0$ なので $f>0$ です。これが区間上の重みとして必要な性質をすべて確認します。
<!-- solution-end -->

<a id="ex-qft61-a04"></a>

### QFT61-A04 一様エネルギーと係数

- Level: A
- 対応目標: 重み付き積分の一次検算

真空区間 $(0,\ell)$ の重みを使い、一次の一様エネルギー密度差を $e>0$ とする。$\Delta\langle K\rangle$ の係数を積分から求めよ。

<!-- solution-start -->
### 詳細解答

[局所モジュラー重み](#thm-qft61-vacuum-interval)から

$$
\begin{aligned}
\Delta\langle K\rangle
&=\frac{2\pi e}{\ell}\int_0^\ell(\ell x-x^2)\,dx\\
&=\frac{2\pi e}{\ell}
\left(\frac{\ell^3}{2}-\frac{\ell^3}{3}\right)
=\frac{\pi e\ell^2}{3}.
\end{aligned}
$$

$e$ がエネルギー密度であるため、長さの二乗の係数が現れます。有限の $e$ で $\Delta S$ と厳密に等しいとは述べていません。
<!-- solution-end -->

<a id="ex-qft61-a05"></a>

### QFT61-A05 有限差と一次変化

- Level: A
- 対応目標: 相対エントロピーの役割

参照 $\sigma>0$、状態 $\rho$ と $K_\sigma=-\log\sigma$ が与えられた。$D(\rho\Vert\sigma)=0.02$、$\Delta\langle K_\sigma\rangle=0.07$ とすると $\Delta S$ はいくらか。第一法則を有限差へ誤用した場合との差も求めよ。

<!-- solution-start -->
### 詳細解答

[相対エントロピーとモジュラーエネルギーの差](#prop-qft61-relative-balance)から $0.02=0.07-\Delta S$ なので $\Delta S=0.05$。一次法則を有限差にそのまま使えば $0.07$ としてしまい、誤差は $0.02$ です。この差こそ $D(\rho\Vert\sigma)$ であり、参照と状態が一致しない有限変化を測っています。
<!-- solution-end -->

<a id="ex-qft61-b01"></a>

### QFT61-B01 非可換摂動と第一法則

- Level: B
- 対応目標: 行列が非可換でも微分できること

$\sigma=\operatorname{diag}(3/4,1/4)$、$X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$\rho(\varepsilon)=\sigma+\varepsilon X$ とする。$|\varepsilon|$ を十分小さくして次を求めよ。$\sigma X\ne X\sigma$ に注意せよ。

1. $\rho(\varepsilon)$ が密度行列になる条件。
2. $S'(0)$。
3. $\operatorname{Tr}(XK_\sigma)$。

<!-- solution-start -->
### 詳細解答

$\operatorname{Tr}\rho=1$、$\rho^\dagger=\rho$ です。計算基底での行列表現から、固有値を特性方程式で求めます。トレースが1、行列式が $3/16-\varepsilon^2$ だから

$$
\det(\rho-\lambda I)=\lambda^2-\lambda+\frac3{16}-\varepsilon^2=0
$$

となり、固有値は

$$
\lambda_\pm(\varepsilon)
=\frac12\pm\sqrt{\frac1{16}+\varepsilon^2}.
$$

正半定値性は小さい方の固有値が非負という条件であり、

$$
\lambda_-\ge0\quad\Longleftrightarrow\quad
\frac1{16}+\varepsilon^2\le\frac14
\quad\Longleftrightarrow\quad |\varepsilon|\le\frac{\sqrt3}4.
$$

従ってこれが**密度行列となる正確な条件**です。等号では固有値の一つが0となり、忠実ではありません。第一法則の微分に使う $\varepsilon=0$ の近傍では狭義不等号として正定値を保ちます。

平方根の中身は $1/16+\varepsilon^2$ なので、$\lambda_\pm'(\varepsilon)=\pm\varepsilon/\sqrt{1/16+\varepsilon^2}$、特に $\lambda_\pm'(0)=0$ です。$S=-\sum_\pm\lambda_\pm\ln\lambda_\pm$ を微分すると $S'(0)=0$。一方[定義](#def-qft61-modular-hamiltonian)の $K_\sigma$ は対角行列で、$X$ の対角成分は0なので $\operatorname{Tr}(XK_\sigma)=0$ です。非可換な摂動でも[第一法則](#thm-qft61-first-law)は成立します。
<!-- solution-end -->

<a id="ex-qft61-b02"></a>

### QFT61-B02 二準位の相対エントロピーを二次まで

- Level: B
- 対応目標: 一次法則の有限差への誤用を反証

$\sigma=\operatorname{diag}(3/4,1/4)$、$\rho(\varepsilon)=\operatorname{diag}(3/4+\varepsilon,1/4-\varepsilon)$ とする。$D(\rho(\varepsilon)\Vert\sigma)$ の $\varepsilon^2$ 係数を、対数のTaylor展開から再導出せよ。

<!-- solution-start -->
### 詳細解答

$p=3/4$、$q=1/4$ と書くと

$$
D=(p+\varepsilon)\ln(1+\varepsilon/p)
+(q-\varepsilon)\ln(1-\varepsilon/q).
$$

それぞれの対数を二次まで開くと

$$
\begin{aligned}
(p+\varepsilon)\ln(1+\varepsilon/p)
&=\varepsilon+\frac{\varepsilon^2}{2p}+O(\varepsilon^3),\\
(q-\varepsilon)\ln(1-\varepsilon/q)
&=-\varepsilon+\frac{\varepsilon^2}{2q}+O(\varepsilon^3).
\end{aligned}
$$

一次が相殺し、$1/(2p)+1/(2q)=2/3+2=8/3$。従って $D=8\varepsilon^2/3+O(\varepsilon^3)$ です。非負の二次差が残るので、有限差の第一法則は一般に成立しません。
<!-- solution-end -->

<a id="ex-qft61-b03"></a>

### QFT61-B03 熱と円周の符号・係数

- Level: B
- 対応目標: Casimirエネルギーと短区間主項の接続

$c=\bar c=1$ のCFTで、平面真空からの一様エネルギー密度差を、(i) 熱状態では $\pi/(6\beta^2)$、(ii) 周長 $L$ の恒等真空では $-\pi/(6L^2)$ とする。局所重みによる一次エントロピー変化を求め、[QFT60の短区間展開](../QFT60/index.md#prop-qft60-short-interval)と照合せよ。

<!-- solution-start -->
### 詳細解答

[一様エネルギー摂動](#prop-qft61-uniform-energy)により $\Delta S=(\pi\ell^2/3)e$ が先頭項です。従って熱では

$$
\Delta S_\beta^{(1)}
=\frac{\pi\ell^2}{3}\frac{\pi}{6\beta^2}
=\frac{\pi^2\ell^2}{18\beta^2},
$$

円周では $\Delta S_L^{(1)}=-\pi^2\ell^2/(18L^2)$ です。[QFT60の短区間展開](../QFT60/index.md#prop-qft60-short-interval)にある $\ln(\sinh y/y)=y^2/6+O(y^4)$ と $\ln(\sin y/y)=-y^2/6+O(y^4)$ に $c/3=1/3$ を掛けると同じ値を得ます。両者の符号差は熱とCasimirのエネルギー密度差の符号に対応します。
<!-- solution-end -->

<a id="ex-qft61-b04"></a>

### QFT61-B04 忠実性を失った参照状態

- Level: B
- 対応目標: 相対エントロピーの台条件と有限次元第一法則の限界

$\sigma=\operatorname{diag}(1,0)$、$\rho_\varepsilon=\operatorname{diag}(1-\varepsilon,\varepsilon)$（$0<\varepsilon<1$）とする。$D(\rho_\varepsilon\Vert\sigma)$ の値、$S(\rho_\varepsilon)$ の $\varepsilon\downarrow0$ での主要挙動を求め、なぜ本章の第一法則が適用できないか述べよ。

<!-- solution-start -->
### 詳細解答

$\rho_\varepsilon$ は第二固有空間にも正の重みを持つのに、$\sigma$ はその空間で0です。[QINF20の台条件](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)は $\operatorname{supp}\rho_\varepsilon\subseteq\operatorname{supp}\sigma$ を要求するため、$D(\rho_\varepsilon\Vert\sigma)=+\infty$ です。エントロピーは

$$
S(\rho_\varepsilon)
=-(1-\varepsilon)\ln(1-\varepsilon)-\varepsilon\ln\varepsilon
=-\varepsilon\ln\varepsilon+\varepsilon+O(\varepsilon^2).
$$

$\varepsilon\downarrow0$ で $S(\rho_\varepsilon)\to0$ ですが、$(S(\rho_\varepsilon)-S(\sigma))/\varepsilon=-\ln\varepsilon+1+O(\varepsilon)$ は発散します。参照の対数が有限行列でなく、微分可能な有限値の $K_\sigma$ を使う第一法則の忠実性条件を落としたのが失敗原因です。
<!-- solution-end -->

<a id="ex-qft61-c01"></a>

### QFT61-C01 参照状態から区間の物理へ

- Level: C
- 対応目標: 定義・第一法則・幾何学的モジュラー流・状態差・適用条件の統合

左右中心電荷 $c=\bar c>0$ の二次元ユニタリCFTの平面真空を参照とし、有限cutoffの区間 $A=(0,\ell)$ を考える。真空の切断付きEuclid経路積分による幾何学的モジュラー流を仮定し、熱状態（逆温度 $\beta\gg\ell$）と周長 $L\gg\ell$ の恒等円周真空の短区間比較を行う。

1. 有限cutoffでの規格化された参照状態 $\sigma_A>0$ から $K_{\sigma,A}$ を定義し、正規化を確認せよ。
2. $w=\log[z/(\ell-z)]$ から $dx/dw$ を求め、局所モジュラー重みの中心値と端点値、積分値を導け。
3. 状態差のエネルギー密度が熱で $\pi c/(6\beta^2)$、円周で $-\pi c/(6L^2)$ と空間一様なら、第一法則の先頭の $\Delta S_A$ を求め、QFT60の $\sinh$ と $\sin$ の式の二次項と比較せよ。
4. 有限差については $D(\rho_A\Vert\sigma_A)$ を使い、$\Delta S$ と $\Delta\langle K\rangle$ の等式が一般に破れることを示せ。また、連続QFTへの移行に必要な追加条件を二つ以上述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 参照の対数。** 有限次元で $\sigma_A=\sum_jp_j|j\rangle\langle j|$、$p_j>0$、$\sum_jp_j=1$ とする。[規格化モジュラーハミルトニアン](#def-qft61-modular-hamiltonian)で

$$
K_{\sigma,A}=-\sum_j(\ln p_j)|j\rangle\langle j|,
\qquad
\operatorname{Tr}e^{-K_{\sigma,A}}=\sum_jp_j=1.
$$

これは参照 $\sigma_A$ を固定した演算子であり、比較対象 $\rho_A$ が変化しても定義し直しません。

**(2) 区間の幾何。** $0<x<\ell$ で

$$
\frac{dw}{dx}=\frac1x+\frac1{\ell-x}
=\frac{\ell}{x(\ell-x)},\qquad
\frac{dx}{dw}=\frac{x(\ell-x)}{\ell}.
$$

中心 $x=\ell/2$ で逆Jacobianは $\ell/4$、端点では0です。積分は

$$
\int_0^\ell\frac{x(\ell-x)}{\ell}\,dx
=\frac1\ell\left(\frac{\ell^3}{2}-\frac{\ell^3}{3}\right)
=\frac{\ell^2}{6}.
$$

従って[二次元CFT真空区間の局所モジュラー重み](#thm-qft61-vacuum-interval)により $K_A^{\rm vac}=2\pi\int_0^\ell x(\ell-x)T_{00}/\ell\,dx+C_AI$ と書けます。これは真空と幾何学的流の仮定に依存します。

**(3) 一様エネルギーの照合。** $C_A$ の期待値差は0で、[一様エネルギー摂動の短区間照合](#prop-qft61-uniform-energy)から $\Delta\langle K\rangle=(2\pi)(\ell^2/6)e=\pi\ell^2e/3$。これに熱・円周の $e$ をそれぞれ代入すると

$$
\Delta S_\beta^{(1)}=\frac{\pi^2c\ell^2}{18\beta^2},
\qquad
\Delta S_L^{(1)}=-\frac{\pi^2c\ell^2}{18L^2}.
$$

QFT60では共通の平面項を引いたあと、$S_\beta-S_{\rm plane}=(c/3)[\ln(\sinh y/y)]$、$y=\pi\ell/\beta$、および $S_L-S_{\rm plane}=(c/3)[\ln(\sin z/z)]$、$z=\pi\ell/L$ です。[短区間展開](../QFT60/index.md#prop-qft60-short-interval)からそれぞれ $(c/3)(y^2/6)$ と $-(c/3)(z^2/6)$ で、上の二係数と一致します。$a\ll\ell\ll\beta,L$ とCFTのスケーリング領域を保つ必要があります。

**(4) 有限差と限界。** [相対エントロピーとモジュラーエネルギーの差](#prop-qft61-relative-balance)により

$$
\Delta\langle K_\sigma\rangle-\Delta S
=D(\rho_A\Vert\sigma_A)\ge0.
$$

$\rho_A\ne\sigma_A$ なら[QINF20の等号条件](../../../応用系/QINF/QINF20/index.md#prop-qinf20-nonnegative)によって不等号は厳密です。第一法則の等式は参照での微分だけです。連続場へ進むには、少なくとも次の条件を確認する必要があります。

1. 領域端点のUV cutoffを固定した状態族と微分の交換可能性。
2. 真空の幾何学的モジュラー流の成立。
3. 演算子値分布 $T_{00}$ の積分・期待値差の正則化。
4. 無限次元極限での相対エントロピーや差の有限性。

有限次元の忠実な行列対数を無限系へそのまま移すことはできません。
<!-- solution-end -->

## 7. 今回の到達点と次の問い

規格化モジュラーハミルトニアン $K_{\sigma,A}=-\ln\sigma_A$ は一般の有限次元参照状態に定義でき、**一次変化**は $\delta S_A=\delta\langle K_{\sigma,A}\rangle$ です。有限の状態差は量子相対エントロピー $D(\rho\Vert\sigma)=\Delta\langle K\rangle-\Delta S$ で測れます。

二次元CFTの**平面真空の単一区間**では、幾何学的モジュラー流を使うことで $2\pi x(\ell-x)/\ell$ という局所重みが現れ、熱・円周のエントロピー補正の符号と係数を独立に検算できました。ただし一般の状態や領域での局所性、無限次元の正則化、相対エントロピーの領域包含に関する単調性からエネルギー条件を導く一般論は、別の仮定と証明を必要とします。

次は、その単調性がどの意味で成立し、どのような正則性・エネルギー条件への橋を与えるかを調べます。
