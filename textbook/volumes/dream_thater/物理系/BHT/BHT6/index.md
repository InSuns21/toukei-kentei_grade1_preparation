# BHT6 物理過程版の第一法則

<!-- definition-example-audit: strict -->

[BHT5のKerr第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)は、二つの**定常解**を結ぶパラメータの微分でした。しかし、物質を地平線へ落としている途中の時空は一般にKerrではありません。「物質の運び込むエネルギーと角運動量が、なぜ最後の地平線面積の変化になるのか」は別に証明しなければなりません。

今回は[GR34の光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)を一次摂動へ線形化し、地平線の面積変化と、外から入る物質のKilling保存流を結びます。その際に **未来の定常状態が境界条件となる** ことが決定的です。事象地平線は物質が到着するより前に膨張し始めても構いません。

4次元、Einstein重力、計量符号 $(-,+,+,+)$、$\Lambda=0$、$G=c=1$ とし、以下は古典論です。$\hbar$ や温度、エントロピーは用いません。小ささを表す無次元パラメータを $\varepsilon$ とし、$O(\varepsilon^2)$ を一貫して捨てる範囲を明記します。

## 1. 定常な状態量から、地平線を横切る流束へ

初期背景は漸近平坦な非極限Kerrブラックホールです。[BHT5で規格化した](../BHT5/index.md#prop-bht5-kerr-data)時間並進・軸回転Killing場を

$$
\xi^a=(\partial_t)^a,\qquad \eta^a=(\partial_\varphi)^a,\qquad
\chi^a=\xi^a+\Omega_H\eta^a
$$

とします。$\xi$ は無限遠で単位時間並進、$\eta$ は周期 $2\pi$ の軸回転で、地平線生成場 $\chi$ の表面重力は $\kappa>0$ です。$\Omega_H,\kappa$ は**初期背景の定数**とし、流入によるこれらの一次変化をすでに一次の物質流束へ掛けることはしません。

物質の応力エネルギーテンソル $T_{ab}(\varepsilon)$ の一次項を

$$
T_{ab}(\varepsilon)=\varepsilon\,\tau_{ab}+O(\varepsilon^2),\qquad
\nabla_a\tau^{ab}=0
$$

とします。初期背景は真空なので $T_{ab}(0)=0$ です。$\nabla$ は背景Kerr計量の共変微分であり、保存式は完全な $\nabla^{(\varepsilon)}_aT^{ab}(\varepsilon)=0$ の一次部分です。物質は地平線に落ち込み、考える過程の初期・終期に地平線外部へ残らないものとします。無限遠へ逃げる一次の物質流束があれば、それを別途収支へ入れなければなりません。

Killing場 $X^a$ について $j^a[X]=\tau^a{}_bX^b$ とおくと、

$$
\nabla_a j^a[X]
=X_b\nabla_a\tau^{ab}+\tau^{ab}\nabla_aX_b
=\tfrac12\tau^{ab}(\nabla_aX_b+\nabla_bX_a)=0.
$$

最後の等式は $\tau^{ab}$ の対称性とKilling方程式によります。したがって、$\xi$ と $\eta$ の保存流がそれぞれエネルギーと軸角運動量の収支を与えます。

地平線上で $\chi^a\nabla_a v=1$ となるKillingパラメータ $v$ を選び、背景の二次元断面の面積要素を $dA_0$ とします。未来向き零生成場 $\chi^a$ による流入の符号を、エネルギーは $+\tau_{ab}\xi^a\chi^b$、軸角運動量は $-\tau_{ab}\eta^a\chi^b$ と取ります。後者の負符号は、軸角運動量が粒子の共変成分 $p_a\eta^a$ として正に数えられる一方、未来向き地平線法線の収支の向きが反転することに対応します。

<a id="def-bht6-killing-flux"></a>

<!-- formal-statement-start -->
> **定義（物理過程の地平線Killing流束）**
> 4次元・漸近平坦・真空・非極限Kerr背景の未来Killing地平線 $\mathcal H^+$ を考える。初期背景の $\xi,\eta,\chi=\xi+\Omega_H\eta$ と、背景計量で保存される対称な一次物質源 $\tau_{ab}$ を用いる。地平線上の $v$ と正則な断面の面積要素 $dA_0$ を固定したとき、一次摂動の全流入量の係数を

$$
\mathcal E_H=\int_{\mathcal H^+}\tau_{ab}\xi^a\chi^b\,dv\,dA_0,\qquad
\mathcal J_H=-\int_{\mathcal H^+}\tau_{ab}\eta^a\chi^b\,dv\,dA_0
$$

> と定める。対応する物理的変化は $\delta M_H=\varepsilon\mathcal E_H$、$\delta J_H=\varepsilon\mathcal J_H$（一次まで）である。積分が収束し、他の境界に一次の正味流束がなく、初期・終期に外部物質が残らない場合、これらは端状態の質量・軸角運動量の一次差 $\delta M,\delta J$ に等しい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht6-killing-flux -->
**定義の確認**：面積 $A_0$ の断面全体で、ある有限の $v$ 区間に一定の成分

$$
\tau_{ab}\xi^a\chi^b=e,\qquad
\tau_{ab}\eta^a\chi^b=-j
$$

が続く模型を考えます。ここで $e,j$ はそれぞれ局所成分の指定で、軸対称な物質テンソルの具体的解の構成を主張するものではありません。継続時間が $\Delta v$ なら定義どおり $\mathcal E_H=A_0e\Delta v$、$\mathcal J_H=A_0j\Delta v$。$\eta$ の収縮に負符号があるので、$j>0$ は正の軸角運動量の流入です。背景Killing場の線形性を使えば

$$
\mathcal E_H-\Omega_H\mathcal J_H
=\int_{\mathcal H^+}\tau_{ab}\chi^a\chi^b\,dv\,dA_0.
$$

これは $e-\Omega_Hj$ が零生成方向のエネルギー密度 $\tau_{\chi\chi}:=\tau_{ab}\chi^a\chi^b$ と一致することも検査しています。$\tau_{\chi\chi}\ge0$ は[GR35の零エネルギー条件](../../GR/GR35/index.md#def-gr35-nec)を物質源へ課した場合に成立します。
<!-- definition-example-end -->

この局所式だけでは面積はまだ現れません。次は、地平線を成す光線束の膨張に応力テンソルがどう作用するかを調べます。

## 2. Killing時間でRaychaudhuri方程式を線形化する

[GR34の光的スクリーン・膨張率](../../GR/GR34/index.md#def-gr34-null-optics)は、地平線の各零生成線に垂直な二次元面積密度 $a(v,x)>0$ の対数微分です。背景の $\chi$ は非アフィン媒介で、

$$
\chi^b\nabla_b\chi^a=\kappa\chi^a,\qquad
\Theta_\chi=\frac1a\frac{da}{dv}.
$$

ここで $x$ は生成線を識別する断面座標で、$d/dv$ はその $x$ を固定した $\partial_v$ と同じ生成線方向の微分です。これは摂動パラメータ $\varepsilon$ による微分とは異なります。膨張率 $\Theta_\chi$ とせん断テンソル $\sigma^{(\chi)}_{ab}$ は生成線の変形を記録します。未来地平線の零法線に対する回転（twist）は零です。[GR34のアフィン媒介による光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)は

$$
\frac{d\theta_k}{d\lambda}
=-\frac12\theta_k^2-\sigma^{(k)}_{ab}\sigma_{(k)}^{ab}
-R_{ab}k^ak^b.
$$

ここで $\theta_k,\sigma^{(k)}_{ab}$ はGR34の $\hat\theta,\hat\sigma_{ab}$ を接線 $k$ に対して表したもので、$\Theta_\chi$ は別の媒介 $v$ についての膨張率です。アフィン零接線 $k^a=dx^a/d\lambda$ に対し、[BHT2のKilling・アフィン媒介の関係](../BHT2/index.md#prop-bht2-affine-parameter)を非極限 $\kappa>0$ の区間で適用すると

$$
\frac{d\lambda}{dv}=\kappa\lambda,\qquad
\chi^a=\kappa\lambda\,k^a,\qquad
\Theta_\chi=\kappa\lambda\,\theta_k.
$$

初期背景の分岐地平線のアフィン原点を $\lambda=0$ に選んだ表示です。$\chi=\kappa\lambda k$ は生成線の開区間 $\lambda>0$ で使い、$\lambda=0$ で $k=\chi/(\kappa\lambda)$ と割ることはしません。

上のRaychaudhuri方程式へ代入し、$d/dv=\kappa\lambda\,d/d\lambda$ を使うと

$$
\begin{aligned}
\frac{d\Theta_\chi}{dv}
&=\kappa\Theta_\chi+(\kappa\lambda)^2\frac{d\theta_k}{d\lambda}\\
&=\kappa\Theta_\chi-\frac12\Theta_\chi^2
-\sigma^{(\chi)}_{ab}\sigma_{(\chi)}^{ab}
-R_{ab}\chi^a\chi^b.
\end{aligned}
$$

**何を一次として残すか。** 摂動した地平線の実際の未来向き零生成ベクトルを $\ell_\varepsilon$ と書き、生成線を滑らかに同定して $\ell_0=\chi$、その非アフィン係数を $\kappa_\varepsilon=\kappa+O(\varepsilon)$ とします。摂動後も背景の $\chi$ 自身が厳密に零・地平線接線であると仮定するのではありません。膨張・せん断を $\Theta_\varepsilon,\sigma^{(\varepsilon)}_{ab}$ と記すと、背景Kerrでは両者が零なので

$$
\Theta_\varepsilon=\varepsilon\vartheta+O(\varepsilon^2),\qquad
\sigma^{(\varepsilon)}_{ab}=\varepsilon s_{ab}+O(\varepsilon^2).
$$

以後、定義式中の $\Theta_\chi(\varepsilon,v,x)$ は、この同定の下で測った $\Theta_\varepsilon$ の略記です。$\Theta_\varepsilon^2$ と $\sigma_\varepsilon^2$ は二次で、$\kappa_\varepsilon\Theta_\varepsilon=\varepsilon\kappa\vartheta+O(\varepsilon^2)$。さらに摂動後の零生成場にEinstein方程式を収縮すると、$g^{(\varepsilon)}(\ell_\varepsilon,\ell_\varepsilon)=0$ により跡の項が消え、

$$
R^{(\varepsilon)}_{ab}\ell_\varepsilon^a\ell_\varepsilon^b
=8\pi T^{(\varepsilon)}_{ab}\ell_\varepsilon^a\ell_\varepsilon^b
=8\pi\varepsilon\tau_{ab}\chi^a\chi^b+O(\varepsilon^2).
$$

従って一次式の係数には背景の $\chi,\kappa,dA_0$ を使えます。

<a id="def-bht6-linearized-expansion"></a>

<!-- formal-statement-start -->
> **定義（線形化された地平線膨張率）**
> 初期背景が非極限・定常Killing地平線で、初期膨張率および初期せん断が零である一次の滑らかな地平線摂動を考える。背景のKillingパラメータ $v$ と生成線ラベル $x$ を固定したとき、

$$
\Theta_\chi(\varepsilon,v,x)=\varepsilon\,\vartheta(v,x)+O(\varepsilon^2)
$$

> の一次係数 $\vartheta$ を線形化された地平線膨張率とする。面積密度を次のように展開した場合、

$$
a(\varepsilon,v,x)=a_0(x)+\varepsilon a_1(v,x)+O(\varepsilon^2),
\qquad \vartheta=\frac{1}{a_0}\partial_v a_1.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht6-linearized-expansion -->
**定義の確認**：$a(\varepsilon,v,x)=a_0(x)[1+\varepsilon h(v,x)]+O(\varepsilon^2)$、$a_0>0$、$h$ は有界かつ滑らかとします。分母と分子を一次で展開して

$$
\Theta_\chi
=\frac{\varepsilon a_0\partial_v h}{a_0(1+\varepsilon h)}+O(\varepsilon^2)
=\varepsilon\partial_v h+O(\varepsilon^2).
$$

したがって $\vartheta=\partial_v h$ です。例えば $h=b(1-e^{-\kappa v})$ を $v\ge0$ で使えば $\vartheta=b\kappa e^{-\kappa v}$。面積密度が時間とともに一定値へ近づいても、途中の膨張は非零であることが分かります。
<!-- definition-example-end -->

<a id="lem-bht6-linear-raychaudhuri"></a>

<!-- formal-statement-start -->
> **補題（非アフィン媒介の線形化Raychaudhuri方程式）**
> 4次元Einstein重力の真空・非極限定常Kerr地平線（$\kappa>0$）の周りの滑らかな一次摂動を考える。背景の $\chi^b\nabla_b\chi^a=\kappa\chi^a$、twist零、背景膨張・せん断零とし、物質源を $T_{ab}=\varepsilon\tau_{ab}+O(\varepsilon^2)$ とする。線形化された膨張率 $\vartheta$ は各生成線で

$$
\boxed{\partial_v\vartheta-\kappa\vartheta=-8\pi f(v,x)},
\qquad f(v,x)=\tau_{ab}\chi^a\chi^b
$$

> を満たす。$f$ と $\vartheta$ は背景の地平線上で評価する。この式は二次の $\vartheta^2,s_{ab}s^{ab}$ を含まず、定常性を失った一般の大きな変形にそのまま適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

アフィンの[Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)をKilling時間へ書き直すと、媒介に由来する $+\kappa\Theta_\chi$ が出ます。背景で膨張・せん断が零だから、それらの二乗は一次に寄与しません。Einstein方程式の零方向収縮が係数 $8\pi$ を決めます。

<!-- proof-start -->
### 証明

摂動地平線上でも局所アフィン接線 $k_\varepsilon$ を取り、$\ell_\varepsilon=b_\varepsilon k_\varepsilon$、$b_\varepsilon=d\lambda_\varepsilon/dv>0$ とします。非アフィン条件から $\partial_v b_\varepsilon=\kappa_\varepsilon b_\varepsilon$ です（背景では $b_0=\kappa\lambda$）。面積輸送の定義により $\Theta_\varepsilon=b_\varepsilon\theta_{k_\varepsilon}$、せん断も $b_\varepsilon$ 倍なので、アフィンの[光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)に積の微分を使うと

$$
\begin{aligned}
\partial_v\Theta_\varepsilon
&=(\partial_v b_\varepsilon)\theta_{k_\varepsilon}
+b_\varepsilon^2\partial_{\lambda_\varepsilon}\theta_{k_\varepsilon}\\
&=\kappa_\varepsilon\Theta_\varepsilon
-\tfrac12\Theta_\varepsilon^2
-\sigma_\varepsilon^{ab}\sigma^{(\varepsilon)}_{ab}
-R^{(\varepsilon)}_{ab}\ell_\varepsilon^a\ell_\varepsilon^b.
\end{aligned}
$$

直前に確認した次数を代入します。膨張・せん断の二乗は $O(\varepsilon^2)$、Ricci縮約は $8\pi\varepsilon f+O(\varepsilon^2)$ です。従って $\varepsilon$ の係数は

$$
\partial_v\vartheta=\kappa\vartheta-8\pi f.
$$

非アフィン係数の補正も $(\kappa_\varepsilon-\kappa)\Theta_\varepsilon=O(\varepsilon^2)$ であり、一次式へ追加の項を作りません。
<!-- proof-end -->

## 3. なぜ未来の境界条件から解くのか

上の微分方程式だけでは、同次解 $Ce^{\kappa v}$ の定数 $C$ は決まりません。未来に落ち込む物質を吸収して**再び定常状態へ落ち着く**なら、同じ地平線生成線の膨張率は未来で零へ向かう必要があります。源 $f$ が十分速く減衰する、特に有限の $v$ 区間だけに支えを持つと仮定し、

$$
\vartheta(v,x)\longrightarrow0\quad(v\to+\infty)
$$

を課します。定常端状態へ向かうことは、途中の任意の切断が定常であることを意味しません。

<a id="prop-bht6-future-response"></a>

<!-- formal-statement-start -->
> **命題（将来定常境界条件と面積応答）**
> [線形化Raychaudhuri方程式](#lem-bht6-linear-raychaudhuri)で $\kappa>0$ を一定とする。各生成線で $f(v,x)$ が連続（区分的連続でも可）かつコンパクト台を持ち、将来定常境界条件 $\vartheta(+\infty,x)=0$ を満たすとき、解は一意で

$$
\boxed{\vartheta(v,x)=8\pi\int_v^\infty e^{-\kappa(s-v)}f(s,x)\,ds}
$$

> である。背景面積要素上で $f$ が絶対積分可能なら、初期・終期の切断の面積差の一次係数 $\mathcal A$ は

$$
\boxed{\mathcal A
=\int_{-\infty}^{\infty}\!\int_{\mathcal S} \vartheta(v,x)\,dA_0\,dv
=\frac{8\pi}{\kappa}
\int_{-\infty}^{\infty}\!\int_{\mathcal S}f(v,x)\,dA_0\,dv}.
$$

> ここで $\delta A=\varepsilon\mathcal A+O(\varepsilon^2)$ であり、$\mathcal S$ は生成線の背景ラベル空間である。
<!-- formal-statement-end -->

### 証明の見取り図

積分因子 $e^{-\kappa v}$ を掛けて、未来から微分方程式を積分します。面積変化については[GR34の面積輸送式](../../GR/GR34/index.md#prop-gr34-volume-area)を一次にし、二重積分の順序を交換します。正の指数減衰核の全積分が $1/\kappa$ です。

<!-- proof-start -->
### 証明

$\partial_v\vartheta-\kappa\vartheta=-8\pi f$ に $e^{-\kappa v}$ を掛け、

$$
\partial_v(e^{-\kappa v}\vartheta)=-8\pi e^{-\kappa v}f.
$$

$v$ から未来 $V$ まで積分すると

$$
e^{-\kappa V}\vartheta(V)-e^{-\kappa v}\vartheta(v)
=-8\pi\int_v^V e^{-\kappa s}f(s)\,ds.
$$

$\vartheta(V)\to0$、$\kappa>0$ によって左辺第1項が消え、表示された未来積分式を得ます。二つの解の差は $Ce^{\kappa v}$ ですが、将来零へ向かうのは $C=0$ だけです。

面積密度 $a=a_0+\varepsilon a_1+O(\varepsilon^2)$ の定義から $\partial_v a_1=a_0\vartheta$。ゆえに背景ラベルの断面を積分して、$\mathcal A=\int\vartheta\,dv\,dA_0$ です。$f$ はコンパクト台を持ち、指数核は絶対積分可能なので、積分順序を交換できます。

$$
\begin{aligned}
\int_{-\infty}^{\infty}\vartheta(v,x)\,dv
&=8\pi\int_{-\infty}^{\infty}
\int_v^\infty e^{-\kappa(s-v)}f(s,x)\,ds\,dv\\
&=8\pi\int_{-\infty}^{\infty}f(s,x)
\left(\int_{-\infty}^s e^{-\kappa(s-v)}\,dv\right)ds\\
&=\frac{8\pi}{\kappa}\int_{-\infty}^{\infty}f(s,x)\,ds.
\end{aligned}
$$

最後の内積分は、$v$ について $\partial_v e^{-\kappa(s-v)}=\kappa e^{-\kappa(s-v)}$ なので、

$$
\int_{-\infty}^{s}e^{-\kappa(s-v)}\,dv
=\left[\frac{e^{-\kappa(s-v)}}{\kappa}\right]_{v=-\infty}^{s}
=\frac1\kappa
$$

です。断面の面積要素をさらに積分して主張を得ます。
<!-- proof-end -->

### 有限時間パルスで、流入より先に地平線が広がる

半径方向の実在物質模型を細部まで解かなくても、線形応答の仕組みは具体的に計算できます。各生成線上で $f(v,x)=F>0$（$0\le v\le T$）、それ以外は零、$T>0$ と仮定します。これは零エネルギー条件に整合する**地平線上の源プロファイル**を指定した試験模型です。命題の積分は

$$
\vartheta(v)=\frac{8\pi F}{\kappa}
\begin{cases}
e^{\kappa v}(1-e^{-\kappa T}),&v<0,\\
1-e^{-\kappa(T-v)},&0\le v\le T,\\
0,&v>T.
\end{cases}
$$

区分式の各値は $v=0,T$ で連続です。$v<0$ でも $\vartheta>0$。これは物質が「過去へ作用」したのではなく、**未来に逃げずに留まる事象地平線**を指定するため、将来定常の境界条件から解いたことの帰結です。局所的に定義された任意の光線束を事象地平線と取り違えないようにします。

断面積を $A_0$ とすれば、全一次変化は

$$
\mathcal A=\frac{8\pi A_0FT}{\kappa},\qquad
\int_{\mathcal H^+} f\,dv\,dA_0=A_0FT.
$$

パルス前だけの面積増分も、次のように直接求められます。

$$
A_0\int_{-\infty}^0\vartheta\,dv
=\frac{8\pi A_0F}{\kappa^2}(1-e^{-\kappa T})>0.
$$

## 4. 二つの積分をつなぐ物理過程版の第一法則

物質流束の積分には $\tau_{\chi\chi}$ が現れました。一方、Raychaudhuri方程式と面積輸送式から、まったく同じ $\tau_{\chi\chi}$ の積分が $\kappa\,\delta A/(8\pi)$ を与えました。この二つを結ぶには、外部へ抜ける一次流束がなく、初期と未来の状態が定常で、線形近似が有効でなければなりません。

また、生成線の焦点（caustic）とは横断Jacobi写像が退化し、同じ滑らかな生成線ラベルでは面積を運べなくなる点です。[GR36の焦点補題](../../GR/GR36/index.md#lem-gr36-negative-expansion)のような事態が起こらず、各切断を同じ生成線で比較できる過程に限ります。

<a id="thm-bht6-physical-process-first-law"></a>

<!-- formal-statement-start -->
> **定理（中性物質流入の物理過程版第一法則）**
> 4次元・漸近平坦・$\Lambda=0$ のEinstein重力で、初期状態を真空・非極限・正則なKerrブラックホール（$\kappa>0$）とする。無限遠で規格化した $\xi,\eta$ と $\chi=\xi+\Omega_H\eta$ を背景値として固定する。一次物質源 $T_{ab}=\varepsilon\tau_{ab}+O(\varepsilon^2)$ は対称かつ背景で保存され、地平線を通る流入は有限であるとする。過程は滑らかな一次摂動であり、線形近似の範囲で生成線の交差・新しいcausticを生まず、初期と未来の端状態は定常で、その間の一次の正味の質量・角運動量の出入りは地平線を通る中性物質流束のみとする。未来で地平線の膨張・せん断は零へ減衰し、必要な面積積分は収束すると仮定する。
>
> 初期と最終の定常端状態の質量・軸角運動量・地平線面積の**一次差**は、

$$
\boxed{\delta M-\Omega_H\delta J=\frac{\kappa}{8\pi}\,\delta A}
$$

> を満たす。$\kappa,\Omega_H$ は初期背景の値である。これは中性物質による物理過程版の第一法則であり、任意に大きい非定常変化・電荷流入・極限地平線への無条件の主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[物理過程の地平線Killing流束](#def-bht6-killing-flux)から $\delta M-\Omega_H\delta J$ を地平線の $\tau_{\chi\chi}$ の積分へ変えます。[将来定常境界条件と面積応答](#prop-bht6-future-response)は同じ積分を $8\pi/\kappa$ 倍したものなので、係数が一致します。重要なのは端状態の保存量と、途中の非定常膨張の区別です。

<!-- proof-start -->
### 証明

背景Killing場 $\xi,\eta$ はそれぞれ保存流を作り、他の境界への一次の正味流束がないことから、端状態の質量と角運動量の変化は[地平線Killing流束](#def-bht6-killing-flux)に一致します。$dA_0$ は背景の面積要素であり、$O(\varepsilon)$ の源と面積要素の $O(\varepsilon)$ の変化の積は二次です。

$$
\begin{aligned}
\delta M-\Omega_H\delta J
&=\varepsilon\left[
\int\tau_{ab}\xi^a\chi^b\,dv\,dA_0
+\Omega_H\int\tau_{ab}\eta^a\chi^b\,dv\,dA_0
\right]+O(\varepsilon^2)\\
&=\varepsilon\int\tau_{ab}(\xi^a+\Omega_H\eta^a)\chi^b\,dv\,dA_0
+O(\varepsilon^2)\\
&=\varepsilon\int\tau_{ab}\chi^a\chi^b\,dv\,dA_0
+O(\varepsilon^2).
\end{aligned}
$$

一方、[線形化Raychaudhuri方程式](#lem-bht6-linear-raychaudhuri)を未来定常境界条件で解いた[面積応答](#prop-bht6-future-response)により

$$
\delta A=\varepsilon\frac{8\pi}{\kappa}
\int\tau_{ab}\chi^a\chi^b\,dv\,dA_0+O(\varepsilon^2).
$$

$\kappa>0$ を掛け、一次の係数を比較すると

$$
\delta M-\Omega_H\delta J=\frac{\kappa}{8\pi}\delta A
$$

を得ます。二次残差は最後の等式では省略しており、厳密には $+O(\varepsilon^2)$ を伴う一次法則です。
<!-- proof-end -->

**エネルギー条件から何が言えるか。** [零エネルギー条件](../../GR/GR35/index.md#def-gr35-nec)を一次源に課せば $\tau_{\chi\chi}\ge0$ なので、

$$
\delta M-\Omega_H\delta J\ge0,\qquad\delta A\ge0
$$

が一次で従います。ただし $\delta M$ 単独が常に非負とは結論できません。回転する地平線では $\Omega_H\delta J$ が効きます。$\kappa>0$ は[面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の全仮定を置き換えるものでもありません。

## 5. 有限区間では、端点の膨張率を捨てられない

「物質が流れていた時刻だけ」積分しても、将来の地平線面積との差がすべて得られるとは限りません。未来から解く性質のため、面積変化はパルス前にも生じるからです。任意の有限区間 $[v_0,v_1]$ について、背景面積要素で積分した

$$
\mathcal F_{01}=\int_{v_0}^{v_1}\!\int_{\mathcal S}f\,dA_0\,dv,\quad
\mathcal A_{01}=\int_{v_0}^{v_1}\!\int_{\mathcal S}\vartheta\,dA_0\,dv,\quad
\mathcal B_i=\int_{\mathcal S}\vartheta(v_i,x)\,dA_0
$$

を用意します。$\mathcal A_{01}$ はその区間の面積差の一次係数、$\mathcal B_i$ は端切断の膨張の面積積分です。

<a id="prop-bht6-finite-cuts"></a>

<!-- formal-statement-start -->
> **命題（有限区間の端点補正）**
> [線形化Raychaudhuri方程式](#lem-bht6-linear-raychaudhuri)が $[v_0,v_1]$ で成立し、積分が収束するとする。上で定義した流束・面積・端切断の量は

$$
\boxed{\frac{\kappa}{8\pi}\mathcal A_{01}
=\mathcal F_{01}+\frac{\mathcal B_1-\mathcal B_0}{8\pi}}
$$

> を満たす。端点項が消える必要十分条件は $\mathcal B_1=\mathcal B_0$ であり、両端が定常（$\mathcal B_0=\mathcal B_1=0$）なら確実に成り立つ。逆に、端点項の消失だけから両端の定常性は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

微分方程式を $v_0$ から $v_1$ まで積分し、左辺の時間微分を端点で評価します。最後に面積要素を積分するだけですが、端点を消すには別の仮定が必要です。

<!-- proof-start -->
### 証明

各生成線で $\partial_v\vartheta-\kappa\vartheta=-8\pi f$ を積分すると

$$
\vartheta(v_1,x)-\vartheta(v_0,x)
-\kappa\int_{v_0}^{v_1}\vartheta\,dv
=-8\pi\int_{v_0}^{v_1}f\,dv.
$$

$dA_0$ で断面積分して、

$$
\mathcal B_1-\mathcal B_0-\kappa\mathcal A_{01}
=-8\pi\mathcal F_{01}.
$$

移項し $8\pi$ で割ると所望の式です。端点量の**差**が非零なら、それを無視した「有限時間の第一法則」は誤りです。両端の端点量が等しい場合には、その共通値が非零でも補正は相殺します。
<!-- proof-end -->

先の矩形パルスを $[0,T]$ だけで積分すると $\mathcal B_1=0$、$\mathcal B_0=A_0(8\pi F/\kappa)(1-e^{-\kappa T})>0$。よって

$$
\frac{\kappa}{8\pi}\mathcal A_{0T}
=A_0FT-\frac{A_0F}{\kappa}(1-e^{-\kappa T}),
$$

となります。失われた分は、パルス開始前 $v<0$ に増えた面積そのものです。有限区間で端点補正を落とせないことが数値式から分かります。

## 6. アフィン時間・線形近似・平衡状態版との境界

**アフィン媒介からの独立検算。** $\chi=\kappa\lambda k$、$dv=d\lambda/(\kappa\lambda)$ を用いると

$$
\int T_{\chi\chi}\,dv\,dA_0
=\kappa\int \lambda T_{kk}\,d\lambda\,dA_0.
$$

アフィン[光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)の一次式は $\partial_\lambda\theta_k=-8\pi T_{kk}$ です。未来で $\theta_k\to0$、端点で $\lambda\theta_k\to0$（$\lambda\to0,\infty$）とし、以下の積分交換に必要な絶対可積分性を仮定します。未来側から積分して

$$
\theta_k(\lambda)=8\pi\int_\lambda^\infty T_{kk}(s)\,ds,
$$

さらに積分順序を交換すると

$$
\begin{aligned}
\int_0^\infty\theta_k(\lambda)\,d\lambda
&=8\pi\int_0^\infty\left(\int_0^s d\lambda\right)T_{kk}(s)\,ds\\
&=8\pi\int_0^\infty sT_{kk}(s)\,ds.
\end{aligned}
$$

よって面積輸送式 $\delta A=\int\theta_k\,d\lambda\,dA_0$ を使っても同じ係数 $8\pi$ が得られます。$\lambda=0$ は非極限分岐地平線の正規化であり、極限 $\kappa=0$ へこの変換を延長できません。

**捨てた二次効果。** $\Theta_\chi^2$ も $\sigma_\chi^{ab}\sigma^{(\chi)}_{ab}$ も一次背景では零ですが、二次では無視できません。特に真空中の重力波の地平線せん断は、物質の $\tau_{\chi\chi}$ が零でも二次の面積増加へ寄与し得ます。一次の証明だけで有限振幅の重力波や合体の面積変化を計算しません。地平線の一時的な変形が大きくなりcausticや新たな生成線が発生すると、今回固定した生成線ラベルもそのまま使えません。

**二つの第一法則は同じ式でも、異なる主張。**

| 観点 | [BHT5：平衡状態版](../BHT5/index.md#thm-bht5-kerr-first-law) | 本講：物理過程版 |
| --- | --- | --- |
| 変分の対象 | 非極限Kerr定常解族の接ベクトル | 実際の非定常な一次物質流入の前後 |
| 数学的な中核 | $M(A,J)$ の全微分 | Killing流束の保存と線形化Raychaudhuri |
| 追加の仮定 | 各解がKerr・境界規格化が共通 | 地平線の正則性、将来定常、一次流束の収支 |
| $\delta A$ の意味 | 定常断面間の状態差 | 地平線を追跡した初期・終期の面積差 |
| 一般化の限界 | Kerr族の外を自動的に含まない | 二次効果、電荷、極限、他境界流束は別途扱う |

電荷を持つEinstein–Maxwell系では電位のゲージと電荷流の仕事を含めた $\Phi_H\delta Q$ が必要ですが、今回の中性・真空Kerr背景の流束証明に何も断らず追加はしません。[BHT5のKerr–Newman定常解族](../BHT5/index.md#prop-bht5-kn-first-law)と、電荷流入を含む物理過程の証明は別の仮定を要します。

## 7. 演習：流束・膨張・端点の三つを同じ式で確かめる

### Level A：一つずつ符号と係数を確かめる

<a id="ex-bht6-a01"></a>

#### BHT6-A01 Killing流の保存

- Level: A

背景で $\nabla_a\tau^{ab}=0$、$\tau^{ab}=\tau^{ba}$、$X^a$ がKilling場とする。$j^a=\tau^a{}_bX^b$ の発散が零になることを、どの仮定をどこで使ったか示して証明せよ。

<!-- solution-start -->
**詳細解答。** 積の微分で $\nabla_a j^a=(\nabla_a\tau^{ab})X_b+\tau^{ab}\nabla_aX_b$。第一項は保存式で零。第二項は対称性により $\tau^{ab}\nabla_aX_b=\tfrac12\tau^{ab}(\nabla_aX_b+\nabla_bX_a)$ と書け、Killing方程式が零にします。どちらかの仮定を外すと、この証明では消せない項が残ります。
<!-- solution-end -->

<a id="ex-bht6-a02"></a>

#### BHT6-A02 回転仕事の符号

- Level: A

背景 $\Omega_H>0$ の地平線で、一次の流入量が $\mathcal E_H=2E_0$、$\mathcal J_H=3E_0/\Omega_H$（$E_0>0$）と測定されたとする。$\int\tau_{\chi\chi}\,dv\,dA_0$ の値を求め、NECと両立するか判定せよ。さらに $\mathcal J_H=-E_0/\Omega_H$ の場合も調べよ。

<!-- solution-start -->
**詳細解答。** [流束定義](#def-bht6-killing-flux)から $\int\tau_{\chi\chi}=\mathcal E_H-\Omega_H\mathcal J_H$。最初は $2E_0-3E_0=-E_0<0$ なのでNECの $\tau_{\chi\chi}\ge0$ と両立しません。二つ目は $2E_0-(-E_0)=3E_0>0$ で、積分の符号に関してはNECと矛盾しません。ただし積分の正値だけで各点のNECや物質解の存在が証明されたわけではありません。
<!-- solution-end -->

<a id="ex-bht6-a03"></a>

#### BHT6-A03 なぜせん断平方を捨てるのか

- Level: A

$\Theta_\chi=\varepsilon\vartheta+O(\varepsilon^2)$、$\sigma^\chi_{ab}=\varepsilon s_{ab}+O(\varepsilon^2)$ とする。非アフィンRaychaudhuri方程式の各項の次数を調べ、$O(\varepsilon)$ の式を書け。背景でせん断が零でない場合は何が変わるか。

<!-- solution-start -->
**詳細解答。** 背景の膨張・せん断が零なので、時間微分、非アフィン項、物質項は一次であり、二乗項は

$$
\tfrac12\Theta_\chi^2=\tfrac12\varepsilon^2\vartheta^2+O(\varepsilon^3),\qquad
\sigma_\chi^2=\varepsilon^2s_{ab}s^{ab}+O(\varepsilon^3)
$$

のように二次から始まります。従って一次係数は $\partial_v\vartheta=\kappa\vartheta-8\pi f$。一方、背景せん断が $\sigma^{(0)}_{ab}\ne0$ なら

$$
\sigma^2=(\sigma^{(0)})^2
+2\varepsilon\sigma^{(0)}_{ab}s^{ab}+O(\varepsilon^2)
$$

という一次の交差項が残り、同じ線形方程式は得られません。
<!-- solution-end -->

<a id="ex-bht6-a04"></a>

#### BHT6-A04 単位と面積変化

- Level: A

$G=c=1$ で質量 $M$、面積 $A$、表面重力 $\kappa$、角速度 $\Omega_H$、角運動量 $J$ の長さ次元を求め、$\delta M=\kappa\delta A/(8\pi)+\Omega_H\delta J$ の各項が同次元か検査せよ。

<!-- solution-start -->
**詳細解答。** 幾何単位 $G=c=1$ では、質量・面積・角運動量・表面重力・角速度の長さ次元は

$$
[M]=L,\quad [A]=[J]=L^2,\quad [\kappa]=[\Omega_H]=L^{-1}.
$$

そのため第一法則の各項は

$$
[\kappa\delta A]=L^{-1}L^2=L,\qquad
[\Omega_H\delta J]=L^{-1}L^2=L=[\delta M]
$$

となり、同次元です。$8\pi$ は無次元です。これは係数の正しさの証明ではありませんが、誤った面積や時間の規格化を検出できます。
<!-- solution-end -->

<a id="ex-bht6-a05"></a>

#### BHT6-A05 有限区間で残る端点項

- Level: A

$[v_0,v_1]$ で $\mathcal B_0=b>0$、$\mathcal B_1=0$、$\mathcal F_{01}=F>0$ とする。面積差 $\mathcal A_{01}$ を求め、$F=b/(8\pi)$ の場合に何が起こるか説明せよ。

<!-- solution-start -->
**詳細解答。** [端点補正命題](#prop-bht6-finite-cuts)から $\kappa\mathcal A_{01}/(8\pi)=F-b/(8\pi)$ なので

$$
\mathcal A_{01}=\frac{8\pi F-b}{\kappa}.
$$

$F=b/(8\pi)$ なら積分恒等式上は $\mathcal A_{01}=0$ です。流束が正でも、区間開始時の膨張が終わりに消える端点項は相殺し得ます。ただし、この数値条件だけでNECと将来定常条件をともに満たす物理的な流入解が実在するとはいえません。全過程の面積変化も零であるとは結論できず、開始前・終了後を含む端状態間の面積差とは区別します。
<!-- solution-end -->

### Level B：微分方程式と収支を自分で結ぶ

<a id="ex-bht6-b01"></a>

#### BHT6-B01 未来境界条件から矩形パルスを解く

- Level: B

$\kappa>0$ とし、$\partial_v\vartheta-\kappa\vartheta=-8\pi f$、$\vartheta(+\infty)=0$、$f(v)=F>0$（$0<v<T$）、それ以外は零とする。三つの時間領域で $\vartheta(v)$ を求め、$v=0,T$ での接続と $\int_{-\infty}^{\infty}\vartheta\,dv$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [未来積分式](#prop-bht6-future-response)を使うと、$v>T$ では積分区間に源がなく $\vartheta=0$。$0\le v\le T$ では

$$
\vartheta(v)=8\pi F\int_v^T e^{-\kappa(s-v)}ds
=\frac{8\pi F}{\kappa}(1-e^{-\kappa(T-v)}).
$$

$v<0$ では積分が $0\le s\le T$ に制限されるので

$$
\vartheta(v)=8\pi F\int_0^T e^{-\kappa(s-v)}ds
=\frac{8\pi F}{\kappa}e^{\kappa v}(1-e^{-\kappa T}).
$$

$v=0$ では左右とも $(8\pi F/\kappa)(1-e^{-\kappa T})$、$v=T$ ではともに零です。区間別に積分すると

$$
\begin{aligned}
\int_{-\infty}^0\vartheta\,dv
&=\frac{8\pi F}{\kappa^2}(1-e^{-\kappa T}),\\
\int_0^T\vartheta\,dv
&=\frac{8\pi F}{\kappa}\left[T-\frac{1-e^{-\kappa T}}{\kappa}\right].
\end{aligned}
$$

和は $8\pi FT/\kappa$ です。時間 $0$ より前の寄与を消すと、この和にはなりません。
<!-- solution-end -->

<a id="ex-bht6-b02"></a>

#### BHT6-B02 アフィンパラメータでも同じ係数か

- Level: B

非極限地平線で $\chi^a=\kappa\lambda k^a$、$dv=d\lambda/(\kappa\lambda)$、$\lambda>0$ とする。未来定常かつ $\lambda\theta_k\to0$（$\lambda\to0,\infty$）を仮定し、$\partial_\lambda\theta_k=-8\pi T_{kk}$ から $\kappa\,\delta A/(8\pi)=\int T_{\chi\chi}dv\,dA_0$ を、境界項を明示して導け。

<!-- solution-start -->
**詳細解答。** $T_{\chi\chi}=(\kappa\lambda)^2T_{kk}$ と $dv=d\lambda/(\kappa\lambda)$ より

$$
\int T_{\chi\chi}dv\,dA_0
=\kappa\int_0^\infty\lambda T_{kk}\,d\lambda\,dA_0.
$$

一方 $\partial_\lambda\theta_k=-8\pi T_{kk}$ に $\lambda$ を掛けて積分し、部分積分すると

$$
-8\pi\int_0^\infty\lambda T_{kk}\,d\lambda
=\int_0^\infty\lambda\partial_\lambda\theta_k\,d\lambda
=[\lambda\theta_k]_0^\infty-\int_0^\infty\theta_k\,d\lambda.
$$

仮定から角括弧の項は零なので、$\int\theta_kd\lambda=8\pi\int\lambda T_{kk}d\lambda$。面積輸送 $\delta A=\int\theta_kd\lambda\,dA_0$ と組み合わせると、所望の $\kappa/(8\pi)$ が得られます。$\lambda=0$ の値で $\chi/(\kappa\lambda)$ を直接計算したのではありません。
<!-- solution-end -->

<a id="ex-bht6-b03"></a>

#### BHT6-B03 時間・回転の流束を同時に検算する

- Level: B

Killing場 $\xi,\eta$ の背景上で、地平線の局所収縮が

$$
\tau_{ab}\xi^a\chi^b=u(v,x),\qquad
\tau_{ab}\eta^a\chi^b=w(v,x)
$$

と与えられ、二つとも積分可能とする。$\mathcal E_H,\mathcal J_H$ を書き、零エネルギー条件により成立する積分不等式を示せ。$\Omega_H=0$ ではどうなるか。

<!-- solution-start -->
**詳細解答。** [定義](#def-bht6-killing-flux)により $\mathcal E_H=\int u\,dv\,dA_0$、$\mathcal J_H=-\int w\,dv\,dA_0$。$\chi=\xi+\Omega_H\eta$ より

$$
\tau_{\chi\chi}
=\tau_{ab}(\xi^a+\Omega_H\eta^a)\chi^b
=u+\Omega_Hw.
$$

NECなら各点で $u+\Omega_Hw\ge0$、従って $\mathcal E_H-\Omega_H\mathcal J_H=\int(u+\Omega_Hw)\ge0$。$\Omega_H=0$ なら $\chi=\xi$、$\mathcal E_H=\int\tau_{\xi\xi}\ge0$ で、回転仕事の項は零です。局所の $u$ が一般のKerrで単独に非負とは仮定していません。
<!-- solution-end -->

<a id="ex-bht6-b04"></a>

#### BHT6-B04 二次せん断の落とし穴

- Level: B

真空摂動で一次物質源 $f=0$、初期背景の膨張とせん断は零とする。

1. 一次のRaychaudhuri方程式と将来定常境界条件から $\vartheta$ を求めよ。
2. $\sigma_\chi=\varepsilon s$ が非零の場合、二次でどの項が残るか書き、一次の面積不変から有限振幅での面積不変を結論できない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** (1) $\partial_v\vartheta-\kappa\vartheta=0$ の一般解は $\vartheta=Ce^{\kappa v}$ です。$\kappa>0$ で未来定常なら $C=0$。したがって一次面積差は零です。

(2) 非アフィン方程式のせん断項は $-\sigma_\chi^{ab}\sigma^{(\chi)}_{ab}=-\varepsilon^2 s^{ab}s_{ab}+O(\varepsilon^3)$ です。二次の膨張率の係数 $\vartheta_2$ を $\Theta_\chi=\varepsilon^2\vartheta_2+\cdots$ と書けば、物質が二次にもなければ

$$
\partial_v\vartheta_2-\kappa\vartheta_2=-s^{ab}s_{ab}.
$$

右辺は一般に非零で、未来境界条件で $\vartheta_2(v)=\int_v^\infty e^{-\kappa(s-v)}s^{ab}s_{ab}(s)\,ds$ となります。従って一次差が零でも二次差は非零となり得ます。これは二次の幾何応答の一項の検算であって、全ての重力波エネルギー収支をこの式一つで評価したわけではありません。
<!-- solution-end -->

### Level C：非定常過程の情報を一つに統合する

<a id="ex-bht6-c01"></a>

#### BHT6-C01 回転地平線に入る有限パルスの完全収支

- Level: C

初期Kerr背景は $\kappa>0,\Omega_H>0$、面積 $A_0$ とする。一次の中性物質流入が $0<v<T$ の間だけ一様で、その時間中

$$
\tau_{ab}\xi^a\chi^b=e,\qquad
-\tau_{ab}\eta^a\chi^b=j,\qquad
F:=e-\Omega_Hj>0
$$

である。その他の時刻では各流束が零、将来定常であり、他境界への一次流束がないとする。

1. $\mathcal E_H,\mathcal J_H$ と $\vartheta(v)$ を三つの時間領域で求めよ。
2. 全面積変化の一次係数 $\mathcal A$ を求め、第一法則とNECに整合することを確認せよ。
3. $[0,T]$ の面積差 $\mathcal A_{0T}$ を求め、$A_0F T$ のみを $\kappa\mathcal A_{0T}/(8\pi)$ と置くことがなぜ誤りか示せ。
4. $e>0$ を固定し $j$ を増やして $e-\Omega_Hj<0$ とした仮想データのどの仮定が破れるか。また $\kappa=0$ にこの計算を代入してよいか判定せよ。

<!-- solution-start -->
**詳細解答。** (1) [地平線Killing流束](#def-bht6-killing-flux)は断面と時間を積分して

$$
\mathcal E_H=A_0eT,\qquad
\mathcal J_H=A_0jT,\qquad
\mathcal E_H-\Omega_H\mathcal J_H=A_0FT.
$$

$f=\tau_{\chi\chi}=e-\Omega_Hj=F$ なので、[未来積分式](#prop-bht6-future-response)へ代入して

$$
\vartheta(v)=\frac{8\pi F}{\kappa}
\begin{cases}
e^{\kappa v}(1-e^{-\kappa T}),&v<0,\\
1-e^{-\kappa(T-v)},&0\le v\le T,\\
0,&v>T.
\end{cases}
$$

(2) $v<0$ と $0\le v\le T$ の積分を分けます。

$$
\begin{aligned}
\int_{-\infty}^0\vartheta\,dv
&=\frac{8\pi F}{\kappa^2}(1-e^{-\kappa T}),\\
\int_0^T\vartheta\,dv
&=\frac{8\pi F}{\kappa}T-\frac{8\pi F}{\kappa^2}(1-e^{-\kappa T}).
\end{aligned}
$$

その和へ $A_0$ を掛け、

$$
\mathcal A=\frac{8\pi A_0FT}{\kappa},\qquad
\frac{\kappa}{8\pi}\mathcal A=A_0FT
=\mathcal E_H-\Omega_H\mathcal J_H.
$$

$F>0$ であるため面積は一次で増え、$\tau_{\chi\chi}=F>0$ という局所NECにも整合します。

(3) パルス中の膨張率だけを積分すると

$$
\mathcal A_{0T}
=\frac{8\pi A_0F}{\kappa}
\left[T-\frac{1-e^{-\kappa T}}{\kappa}\right].
$$

$\mathcal B_0=(8\pi A_0F/\kappa)(1-e^{-\kappa T})$、$\mathcal B_T=0$ なので、[有限区間の端点補正](#prop-bht6-finite-cuts)に代入すると

$$
\frac{\kappa}{8\pi}\mathcal A_{0T}
=A_0FT-\frac{A_0F}{\kappa}(1-e^{-\kappa T}).
$$

差額は $v<0$ の先行膨張に対応します。パルス区間だけの流束を全端状態間の面積差の公式へ入れることは、積分区間を取り違えています。

(4) $e-\Omega_Hj<0$ なら $\tau_{\chi\chi}<0$ で、このパルス模型に課したNECを破ります。これは物理過程の一般的な代数式の否定ではなく、**NECの下での面積非減少**の導出条件に反します。また $\kappa=0$ では未来積分の指数減衰と $1/\kappa$、$\chi=\kappa\lambda k$ の正規化が使えません。非極限を仮定した今回の計算を極限地平線へそのまま代入してはいけません。
<!-- solution-end -->

## 8. 次の講義へ

本講で得たのは、小さな物質流入について初期・終期の状態量を結ぶ一次法則です。面積変化が回転仕事にどのように制約されるかを、過程の中の方程式から理解できました。次の BHT7「Smarr関係・不可逆質量と仕事」では、状態量の同次性と回転エネルギー抽出を調べます。
