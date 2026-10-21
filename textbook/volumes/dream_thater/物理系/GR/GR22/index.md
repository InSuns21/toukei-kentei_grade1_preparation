# GR22 重力波のTT成分と検出器応答

<!-- definition-example-audit: strict -->

[GR21の調和ゲージによる線形化Einstein方程式](../GR21/index.md#thm-gr21-linear-wave)を真空で使うと、計量の小さな変化は波動方程式を満たします。しかし、波動方程式の解をすべて「観測できる重力波」と呼ぶことはできません。[GR21の純ゲージ摂動](../GR21/index.md#def-gr21-gauge-equivalence)も波のように変化でき、曲率が零のままだからです。では、座標の取り方で消せない成分は何個あり、離れた自由質点や光による測定では何が変化するのでしょうか。

本章ではまず、源から離れた平坦背景近くの**単一方向へ進む真空平面波**を扱います。ゲージ条件の下で残余変換を実際に構成して二つの横波成分だけを残し、その成分が作る潮汐曲率を計算します。次に、自由質点の相対運動と、波長より十分短い干渉計の読みを区別して導きます。放射源がどの振幅を作るか、波のエネルギーをどう定義するかはGR23の主題です。

以後は4次元Minkowski背景を用い、計量の符号と座標を次のように固定します。

$$
x^\mu=(ct,x,y,z),\qquad
\eta_{\mu\nu}=\operatorname{diag}(-1,1,1,1).
$$

ギリシャ添字は $0,\ldots,3$、ラテン添字は $1,\ldots,3$、$a,b$ は $1,2$ を走ります。添字の上下は背景計量で操作します。時刻微分と波動演算子は

$$
\partial_0=\frac1c\partial_t,\qquad
\Box=-\partial_0^2+\delta^{ij}\partial_i\partial_j
$$

です。宇宙項と背景物質を零とします。摂動族 $g=\eta+h+O(\epsilon^2)$ とその二階までの微分には[GR21の弱場尺度条件](../GR21/index.md#def-gr21-linear-perturbation)を課し、式は特記しない限り一次の $O(\epsilon)$ まで扱います。

実際の計量・観測量には二次の $O(\epsilon^2)$ 誤差が残ります。波長の尺度と振幅の尺度は別々に管理します。

## 1. 真空の波動解はなぜ光速で伝わるか

調和条件 $\partial^\mu\bar h_{\mu\nu}=0$ を満たすと、[GR21の真空方程式](../GR21/index.md#thm-gr21-linear-wave)は $\Box\bar h_{\mu\nu}=0$ です。ここで $\bar h_{\mu\nu}=h_{\mu\nu}-\tfrac12\eta_{\mu\nu}h$ は[トレース反転](../GR21/index.md#def-gr21-trace-reverse)であり、まだ十成分を持ちます。伝播方向と振動数を固定すると、偏微分を代数的な係数に変えられます。

振幅を定数の複素対称行列 $A_{\mu\nu}$ とし、その実部を物理的な小振幅摂動として読むため、指数表示 $e^{i\phi}$ を計算上だけ使います。振動数 $\omega>0$、空間波数 $q>0$、位相 $\phi=qz-\omega t$ の進行波を考えます。背景の四元波数は $k_\mu=(-\omega/c,0,0,q)$ です。

<a id="def-gr22-vacuum-plane-wave"></a>

<!-- formal-statement-start -->
> **定義（調和ゲージの真空平面波）**  
> 4次元Minkowski背景の真空線形化理論で、$A_{\mu\nu}=A_{\nu\mu}$ を一定の複素振幅、$\phi=k_\mu x^\mu$ を実位相として
>
$$
h_{\mu\nu}(x)=\operatorname{Re}\!\left(A_{\mu\nu}e^{i\phi}\right),
\qquad
\bar A_{\mu\nu}=A_{\mu\nu}-\frac12\eta_{\mu\nu}\eta^{\rho\sigma}A_{\rho\sigma}
$$
>
> が $\Box\bar h_{\mu\nu}=0$ と $\partial^\mu\bar h_{\mu\nu}=0$ を満たすとき、調和ゲージの真空平面波とする。ここでは非零の波数 $k_\mu$ の場合に限定する。
<!-- formal-statement-end -->

式が成り立つかどうかは、各成分を微分すれば判断できます。$\partial_\alpha e^{i\phi}=ik_\alpha e^{i\phi}$ なので、$\Box e^{i\phi}=-k^\alpha k_\alpha e^{i\phi}$ です。さらに $\partial^\mu\bar h_{\mu\nu}=\operatorname{Re}(ik^\mu\bar A_{\mu\nu}e^{i\phi})$ です。非定数の位相に対して恒等的に零となる条件は

$$
k^\mu k_\mu=0,\qquad
k^\mu\bar A_{\mu\nu}=0\quad(\nu=0,1,2,3)
$$

です。ただし振幅が全て零の自明解では分散条件は必要ありません。以下は $A\ne0$ を想定します。

<a id="prop-gr22-null-dispersion"></a>

<!-- formal-statement-start -->
> **命題（真空平面波の零分散関係）**  
> 上の非自明な平面波で $\omega>0$、$q>0$ とすると、波動方程式と調和条件は
>
$$
\omega=cq,\qquad
\bar A_{0\nu}+\bar A_{3\nu}=0\quad(\nu=0,1,2,3)
$$
>
> と同値である。振幅の複素数値は位相と偏極を表し、空間伝播方向は $+z$ である。
<!-- formal-statement-end -->

### 証明の見取り図

零分散関係は四元波数のMinkowskiノルムを零とする条件です。調和条件では上げた $k^0$ の符号に注意します。

<!-- proof-start -->
### 証明

$k_\mu=(-\omega/c,0,0,q)$ から

$$
k^\mu=(\omega/c,0,0,q),\qquad
k^\mu k_\mu=-\frac{\omega^2}{c^2}+q^2.
$$

$\omega,q>0$ より $\omega=cq$。これを調和条件に代入すると

$$
k^\mu\bar A_{\mu\nu}
=q(\bar A_{0\nu}+\bar A_{3\nu})=0.
$$

$q>0$ なので各 $\nu$ について表示式を得ます。逆に両条件が成り立てば波動方程式と調和条件に代入して各微分式が零になるので十分です。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-gr22-vacuum-plane-wave -->
**定義の確認**。$H\in\mathbb R$ を十分小さい定数として、$A_{11}=H$、$A_{22}=-H$、他成分零とします。対称性と小振幅条件が成立し、背景計量で縮約した跡は $A=\eta^{11}H+\eta^{22}(-H)=H-H=0$ です。したがって $\bar A=A$。$A_{0\nu}=A_{3\nu}=0$ なので四つの調和条件を満たし、$\omega=cq$ なら波動方程式も満たします。実成分は $h_{11}=H\cos(qz-\omega t)$、$h_{22}=-H\cos(qz-\omega t)$ です。
<!-- definition-example-end -->

この例で $h_{00}=h_{0i}=0$ となったのは、平面波の物理的な部分をすでに選んでいたためです。一般の調和ゲージ解から同じ形を作れるかを次に確かめます。

## 2. 残余ゲージからTT成分を取り出す

[GR21のゲージ変換則](../GR21/index.md#def-gr21-gauge-equivalence)は $h'_{\mu\nu}=h_{\mu\nu}-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu$ です。調和条件を保つには[残余ゲージ条件](../GR21/index.md#thm-gr21-linear-wave) $\Box\xi_\nu=0$ が必要です。今回の零波数でない平面波なら、$\xi_\nu=\operatorname{Re}(B_\nu e^{i\phi})$ を使え、$k^2=0$ のため $\Box\xi_\nu=0$ が自動的に成り立ちます。

縦方向 $z$ に進む波について、時間成分・縦成分を零にし、空間成分の跡を零にできれば、横断面 $x,y$ に二つだけ独立な成分が残ります。これは単なる十成分から四つの条件を引く数え上げではありません。実際のゲージ変換を構成します。

<a id="def-gr22-tt-wave"></a>

<!-- formal-statement-start -->
> **定義（z軸正方向のTT平面波と二つの偏極）**  
> $h_{\mu\nu}=\operatorname{Re}(A_{\mu\nu}e^{iq(z-ct)})$ が対称、$q>0$ で、時間方向の成分が零 $A_{0\mu}=0$、縦方向が零 $A_{3\mu}=0$、空間跡が零 $\delta^{ij}A_{ij}=0$ であるとき、これを **横断・無跡（TT）平面波** とする。このとき横断面の振幅は
>
$$
(A_{ij}^{\mathrm{TT}})=
\begin{pmatrix}
a_+&a_\times&0\\
a_\times&-a_+&0\\
0&0&0
\end{pmatrix},
\qquad
h_{ij}^{\mathrm{TT}}
=h_+ e^+_{ij}+h_\times e^\times_{ij},
$$
>
> $h_+=\operatorname{Re}(a_+e^{i\phi})$、$h_\times=\operatorname{Re}(a_\times e^{i\phi})$ と書く。$e^+_{11}=1,e^+_{22}=-1$ と $e^\times_{12}=e^\times_{21}=1$ 以外の偏極基底成分は零である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr22-tt-wave -->
**定義の確認**。$a_+=H$、$a_\times=K$ を任意の小さな複素定数とすると、行列は明らかに対称で、$A_{0\mu}=A_{3\mu}=0$ です。跡は $A_{11}+A_{22}+A_{33}=H-H+0=0$、伝播方向の縮約は $qA_{3j}=0$。$K$ を非零としても $A_{12}=A_{21}$ 以外の成分は増えず、条件を満たす二つの自由度が独立に残ります。
<!-- definition-example-end -->

<a id="thm-gr22-tt-gauge"></a>

<!-- formal-statement-start -->
> **定理（非零真空平面波のTTゲージ構成）**  
> 4次元Minkowski背景で、次の条件を満たす真空線形化平面波を調和ゲージで考える。
>
$$
\omega=cq,\quad q>0,\qquad
\bar A_{0\nu}+\bar A_{3\nu}=0\quad(\nu=0,1,2,3).
$$
>
> この平面波の位相・波数を保つ残余ゲージ変換によって[TT振幅](#def-gr22-tt-wave)へ移せる。すなわち変換後の振幅は
>
$$
A'_{0\mu}=A'_{3\mu}=0,\qquad
\delta^{ij}A'_{ij}=0
$$
>
> を満たし、残る独立な振幅は $a_+$ と $a_\times$ の二つである.
<!-- formal-statement-end -->

### 証明の見取り図

まず四つの残余ゲージ定数 $B_\mu$ で時間行・時間列を消します。その後で調和条件を成分ごとに使うと、空間跡と縦行・縦列が零だと分かります。横断面の対称かつ無跡な $2\times2$ 行列だけが残ります。

<!-- proof-start -->
### 証明

$q=\omega/c>0$、$k_\mu=(-q,0,0,q)$ として $\xi_\mu=\operatorname{Re}(B_\mu e^{i\phi})$ を取ります。変換による振幅の差は

$$
A'_{\mu\nu}-A_{\mu\nu}
=-i(k_\mu B_\nu+k_\nu B_\mu).
$$

したがって四つの時間成分は

$$
\begin{aligned}
A'_{00}&=A_{00}+2iqB_0,\\
A'_{01}&=A_{01}+iqB_1,\\
A'_{02}&=A_{02}+iqB_2,\\
A'_{03}&=A_{03}+iq(B_3-B_0).
\end{aligned}
$$

$q\ne0$ なので具体的に

$$
B_0=-\frac{A_{00}}{2iq},\quad
B_a=-\frac{A_{0a}}{iq}\ (a=1,2),\quad
B_3=B_0-\frac{A_{03}}{iq}
$$

と選べば $A'_{0\mu}=0$ になります。また $\Box\xi_\mu=-k^\rho k_\rho\xi_\mu=0$ なので、これは調和条件を壊しません。$A_{\mu\nu}=O(\epsilon)$ なら $B_\mu=O(\epsilon/q)$ です。波長に対応する長さ尺度 $q^{-1}$ を取ると、$\xi_\mu=O(\epsilon/q)$ かつその $j$ 階微分は $O(\epsilon q^{j-1})$（$j=1,2,3$）であり、[GR21の微小ゲージ変換の尺度条件](../GR21/index.md#def-gr21-gauge-equivalence)とも整合します。

変換後にも $\bar A'_{0\nu}+\bar A'_{3\nu}=0$。$A':=\eta^{\mu\nu}A'_{\mu\nu}$ とすると、$\nu=0$ の式は

$$
0=\bar A'_{00}+\bar A'_{30}
=A'_{00}-\frac12\eta_{00}A'+A'_{30}
=\frac12A'
$$

となり、$A'=0$。次に $\nu=a$ では

$$
0=\bar A'_{0a}+\bar A'_{3a}
=A'_{3a},
$$

$\nu=3$ では $0=\bar A'_{03}+\bar A'_{33}=A'_{33}$ です。対称性によって $A'_{a3}=0$ でもあり、時間成分も既に零です。$A'=0$ は $\delta^{ij}A'_{ij}=A'_{11}+A'_{22}=0$ に帰着します。従って

$$
(A'_{ij})=
\begin{pmatrix}
a_+&a_\times&0\\
a_\times&-a_+&0\\
0&0&0
\end{pmatrix}.
$$

この形では $A'_{00}=A'_{0i}=0$、調和条件と跡零・縦零が同時に成立します。真空・非零波数・指定方向という本定理の仮定なしに任意の時空全域をTTにできる、と主張したわけではありません。$\square$
<!-- proof-end -->

空間ベクトル $\boldsymbol n$ の向きを変えても、偏極を行列から抽出できます。単位伝播方向に直交する二次元平面への射影 $P_{ij}=\delta_{ij}-n_i n_j$ を使うと、$P^2=P$、$P_{ij}n^j=0$ です。射影するだけでは平面上の跡が残るので、それも引きます。

<a id="def-gr22-tt-projector"></a>

<!-- formal-statement-start -->
> **定義（空間TT射影）**  
> Euclid単位ベクトル $\boldsymbol n\in\mathbb R^3$ と対称空間テンソル $S_{kl}$ に対し
>
$$
P_{ij}=\delta_{ij}-n_i n_j,\qquad
S_{ij}^{\mathrm{TT}}
=\left(P_i{}^kP_j{}^l-\frac12P_{ij}P^{kl}\right)S_{kl}
$$
>
> と定める。係数 $1/2$ は $\operatorname{tr}P=2$、すなわち横断面が二次元であることから決まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr22-tt-projector -->
**定義の確認**。$\boldsymbol n=(0,0,1)$ の場合 $P=\operatorname{diag}(1,1,0)$。$S=\operatorname{diag}(u,v,w)$ とすると、まず $PSP=\operatorname{diag}(u,v,0)$、横断跡は $P^{kl}S_{kl}=u+v$ です。従って $S^{\mathrm{TT}}=\operatorname{diag}((u-v)/2,(v-u)/2,0)$ となり、$n^iS_{ij}^{\mathrm{TT}}=0$ と $\delta^{ij}S_{ij}^{\mathrm{TT}}=0$ の**両方**を確認できます。$w$ は物理的な横偏極へ残りません。
<!-- definition-example-end -->

<a id="prop-gr22-projector-properties"></a>

<!-- formal-statement-start -->
> **命題（TT射影の横断性・無跡性・ゲージ不変性）**  
> $\boldsymbol n$ を単位ベクトルとし、$S$ を対称空間テンソルとする。上のTT射影は対称で、横断性と無跡性
>
$$
n^iS_{ij}^{\mathrm{TT}}=0,\qquad
\delta^{ij}S_{ij}^{\mathrm{TT}}=0
$$
>
> を満たす。また空間波数 $k_i=q n_i$ の平面波で、次のゲージ変化に対してTT射影は不変である。
>
$$
\delta S_{kl}=-i(k_kB_l+k_lB_k).
$$
<!-- formal-statement-end -->

### 証明の見取り図

横断性には $n^iP_i{}^k=0$、無跡性には $P^{kl}P_{kl}=2$ を使います。ゲージ項には波数ベクトルが必ず一個掛かるため、二方向から射影すると消えます。

<!-- proof-start -->
### 証明

$P_{ij}=P_{ji}$ と $S_{kl}=S_{lk}$ より対称性を得ます。さらに

$$
n^iP_i{}^k=n^k-(n^in_i)n^k=0
$$

だから両項とも $\boldsymbol n$ との縮約が零です。$P^2=P$ なので

$$
\delta^{ij}P_i{}^kP_j{}^l=P^{kl},\qquad
\delta^{ij}P_{ij}=3-1=2.
$$

従って跡は $P^{kl}S_{kl}-\tfrac12(2)P^{kl}S_{kl}=0$。最後に $P_i{}^kk_k=qP_i{}^kn_k=0$ なので $P_i{}^kP_j{}^l\delta S_{kl}=0$、また $P^{kl}\delta S_{kl}=0$ です。従ってTT射影も不変です。$\square$
<!-- proof-end -->

**偏極軸は選び方に依存します。** 横断面の $x,y$ 軸を角 $\theta$ 回転すると、$(h_+,h_\times)$ は $2\theta$ の回転によって混ざります。二つの係数それぞれを座標に依存しないスカラーと扱うのではなく、合成した $h^{\mathrm{TT}}_{ij}$ と検出器が測る量を比べます。単位伝播方向を含む縦成分はTT射影で落ちます。

## 3. 変位を作るのは座標加速度ではなく潮汐曲率

TT座標では $h_{00}=h_{0i}=0$ ですから、[GR21の一次接続係数](../GR21/index.md#prop-gr21-linear-curvature)から $\Gamma^{(1)i}_{00}=0$。初め静止している自由質点は、その**TT座標値**を一次まで一定に保てます。しかし「質点が動かない」ことと「二点間の固有距離が一定」なことは別です。座標格子そのものに横断面の計量変化が含まれているからです。

測定者に沿った局所平行直交枠に移せば、[GR5の測地線偏差](../GR5/index.md#thm-gr5-deviation)が相対加速度を与えます。その右辺に[GR21の一次曲率](../GR21/index.md#prop-gr21-linear-curvature)を代入します。

<a id="thm-gr22-tidal-response"></a>

<!-- formal-statement-start -->
> **定理（TT平面波による自由質点の相対加速度）**  
> $\omega=cq$、$q>0$ の小振幅な真空TT平面波が $+z$ 方向へ進み、基準自由落下者は背景で静止するものとする。基準者の近くの自由質点との空間的偏差を、基準者に沿う平行直交枠の成分 $\xi^i(t)$ で表す。質点間隔が波長および曲率半径に比べて十分小さく、背景での相対速度を零（一次の相対速度は許容）とし、摂動と一次補正の積を捨てると
>
$$
\boxed{\frac{d^2\xi^i}{dt^2}
=\frac12\frac{\partial^2 h_{ij}^{\mathrm{TT}}}{\partial t^2}
\,\xi_0^j+O(\epsilon^2)}
$$
>
> となる。ここで $\xi_0^j$ は偏差の零次の一定成分である。特に $\partial_z h^{\mathrm{TT}}$ だけでは縦方向の一次相対加速度は生じない。
<!-- formal-statement-end -->

### 証明の見取り図

GR21の曲率符号規約をそのまま使って $R_{i0j0}^{(1)}$ を計算し、GR5の偏差方程式で符号を一度反転します。$x^0=ct$ の微分から時間の単位も復元します。

<!-- proof-start -->
### 証明

[GR21のRiemann一次式](../GR21/index.md#prop-gr21-linear-curvature)で、TT条件 $h_{0\mu}=0$ の下では

$$
\Gamma^{(1)i}_{0j}=\frac12\partial_0 h_{ij}^{\mathrm{TT}},
\qquad
\Gamma^{(1)i}_{00}=0.
$$

そのためGR6・GR21の曲率規約を用いると

$$
\begin{aligned}
R^{(1)i}{}_{0j0}
&=\partial_j\Gamma^{(1)i}_{00}-\partial_0\Gamma^{(1)i}_{j0}\\
&=-\frac12\partial_0^2 h_{ij}^{\mathrm{TT}}
=-\frac{1}{2c^2}\partial_t^2h_{ij}^{\mathrm{TT}}.
\end{aligned}
$$

等号の途中では $\Gamma\Gamma$ を二次として捨てています。基準者の零次四元速度は $(u^0,u^i)=(c,0,0,0)$ です。[GR5の偏差方程式](../GR5/index.md#thm-gr5-deviation)をこの基準者に適用すると

$$
\frac{d^2\xi^i}{d\tau^2}
=-R^{(1)i}{}_{0j0}u^0u^0\xi_0^j
=\frac12\partial_t^2h_{ij}^{\mathrm{TT}}\xi_0^j.
$$

TT座標基底と基準者の平行直交枠は $O(\epsilon)$ だけ異なりますが、曲率自体が $O(\epsilon)$ なので、枠への成分変換の差は $O(\epsilon^2)$ です。基準者では $dt/d\tau=1+O(\epsilon^2)$ であり、$h_{00}=0$ なので一次で $t=\tau+\text{const}$ としてよいです。背景相対速度零のため $\xi=\xi_0+O(\epsilon)$ であり、曲率の右辺で $\xi$ を $\xi_0$ に置き換えても、捨てた補正は $O(\epsilon^2)$ です。$h_{3i}^{\mathrm{TT}}=0$ より $i=3$ では右辺零です。$\square$
<!-- proof-end -->

**初期条件による積分定数。** 時刻 $t_0$ で $\xi(t_0)=\xi_0$、$\dot\xi(t_0)=0$ と局所枠の成分で指定すると、一次の解は

$$
\xi^i(t)=\xi_0^i+\frac12\left[
h_{ij}^{\mathrm{TT}}(t)-h_{ij}^{\mathrm{TT}}(t_0)
-(t-t_0)\dot h_{ij}^{\mathrm{TT}}(t_0)
\right]\xi_0^j+O(\epsilon^2).
$$

二回微分すると定理の式に戻り、$t=t_0$ で変位・速度の補正が零になります。定常的に波が入射している状況でしばしば使う $\xi=(I+h^{\mathrm{TT}}/2)\xi_{\mathrm{ref}}$ は、**その式に対応する初期速度を選んだ特解**であって、任意の初期条件の解ではありません。

<a id="prop-gr22-local-length"></a>

<!-- formal-statement-start -->
> **命題（長波長近似での自由質点間隔）**  
> $+z$ 方向TT平面波に対し、TT座標で固定された近接自由質点間の背景座標差を $L e^i$（$L>0$、$\delta_{ij}e^ie^j=1$）とする。測定する時刻に波が二点間でほぼ一定、すなわち $qL\ll1$ とする。この時刻のTT座標 $t=\text{const}$ の近接距離は
>
$$
\boxed{\frac{\delta L}{L}
=\frac12e^ie^jh_{ij}^{\mathrm{TT}}(t,\boldsymbol x_0)
+O(\epsilon^2)+O(\epsilon qL)}
$$
>
> である。これは指定された近接同時断面上の距離であって、一般の有限距離に対する同時性に依存しない観測量を定義するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

空間計量の線素を積分してから平方根を一次展開します。質点のTT座標位置が一次で一定であることと、空間線素の変化を区別します。

<!-- proof-start -->
### 証明

TTゲージでは $g_{ij}=\delta_{ij}+h_{ij}^{\mathrm{TT}}$。座標差に沿う短い線分 $\Delta x^i=L e^i$ に対し、$qL\ll1$ の下で空間計量を中心点で評価して

$$
\begin{aligned}
L_{\mathrm{proper}}^2
&=(\delta_{ij}+h_{ij}^{\mathrm{TT}})Le^iLe^j
+O(\epsilon qL^3)\\
&=L^2\left(1+e^ie^jh_{ij}^{\mathrm{TT}}\right)
+O(\epsilon qL^3).
\end{aligned}
$$

$\sqrt{1+s}=1+s/2+O(s^2)$ に $s=e^ie^jh_{ij}^{\mathrm{TT}}=O(\epsilon)$ を代入して結論を得ます。有限距離の線分が厳密な空間測地線に一致するかどうかの差は、この局所の一次評価では高次に入ります。$\square$
<!-- proof-end -->

**直接例（直交する質点）。** $h_\times=0$、$h_+(t,z)=H\cos(qz-\omega t)$ とすると

$$
\frac{\delta L_x}{L}=\frac12h_+,\qquad
\frac{\delta L_y}{L}=-\frac12h_+,\qquad
\frac{\delta L_z}{L}=0.
$$

波が横断面を一方向に伸ばすと同時に直交方向を縮めます。一方、$h_+=0$、$h_\times\ne0$ なら$x,y$ 方向それぞれの長さの一次変化は零ですが、$(\boldsymbol e_x+\boldsymbol e_y)/\sqrt2$ 方向と $(-\boldsymbol e_x+\boldsymbol e_y)/\sqrt2$ 方向は互いに逆符号で変化します。「$\times$ 偏極は効果がない」のではなく、**主軸が45度違う**のです。

## 4. 干渉計は何を比較するか

自由質点の相対距離は波の潮汐を知るための最も簡単な模型です。しかしレーザー干渉計が実際に比較するのは、二方向へ往復する光の到着位相です。二つを結びつけるには、波の振動周期に比べて光の往復時間が短いという追加の近似が必要です。

中央のビームスプリッターと二つの自由鏡が背景では静止し、長さ $L$ の直交する二腕を持つとします。単位腕方向を $\boldsymbol u,\boldsymbol v$ とし、鏡・中央装置の重力波による加速度以外の運動を無視します。次に述べる式は **長波長・腕長同一・直交腕** の理想模型です。

なぜ腕方向のベクトルを二つ組み合わせるのでしょうか。[近接距離の一次式](#prop-gr22-local-length)を同じ時刻の各腕へ適用すると、$qL\ll1$ の下で

$$
\frac{\delta L_u}{L}=\frac12u^iu^jh_{ij}^{\mathrm{TT}},
\qquad
\frac{\delta L_v}{L}=\frac12v^iv^jh_{ij}^{\mathrm{TT}}.
$$

従って、**二腕の伸縮率の差**は

$$
\frac{\delta L_u-\delta L_v}{L}
=\frac12(u^iu^j-v^iv^j)h_{ij}^{\mathrm{TT}}.
$$

この係数を、入射波の各成分から装置の差動応答を取り出すテンソルとして定義します。ここまでの距離比較と、後で計算するレーザー往復時間・位相差とはまだ別の量です。

<a id="def-gr22-detector-tensor"></a>

<!-- formal-statement-start -->
> **定義（長波長Michelson検出器テンソル）**  
> 背景Euclid空間で直交する単位腕ベクトル $\boldsymbol u,\boldsymbol v$ に対し
>
$$
D^{ij}:=\frac12(u^iu^j-v^iv^j),\qquad
h_{\mathrm{det}}:=D^{ij}h_{ij}^{\mathrm{TT}}
$$
>
> とする。$h_{\mathrm{det}}$ をこの理想化された検出器の差動ひずみ応答とする。二つの偏極に対する向き係数は
>
$$
F_+:=D^{ij}e^+_{ij},\qquad
F_\times:=D^{ij}e^\times_{ij},\qquad
h_{\mathrm{det}}=F_+h_++F_\times h_\times.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr22-detector-tensor -->
**定義の確認**。$\boldsymbol u=\boldsymbol e_x$、$\boldsymbol v=\boldsymbol e_y$ はいずれも単位ベクトルで互いに直交します。定義のテンソル積の成分 $u^iu^j-v^iv^j$ をこの直交基底で表示すると、$D=\tfrac12\operatorname{diag}(1,-1,0)$ です。従って $D:e^+=\tfrac12(1+1)=1$、$D:e^\times=0$ なので $h_{\mathrm{det}}=h_+$。

腕を45度回転させ、$\boldsymbol u=(\boldsymbol e_x+\boldsymbol e_y)/\sqrt2$、$\boldsymbol v=(-\boldsymbol e_x+\boldsymbol e_y)/\sqrt2$ とします。内積を取ると $|\boldsymbol u|^2=|\boldsymbol v|^2=1$、$\boldsymbol u\cdot\boldsymbol v=(-1+1)/2=0$ なので、定義に必要な単位長・直交性を保ちます。座標成分から

$$
( u^iu^j )=\frac12\begin{pmatrix}1&1&0\\1&1&0\\0&0&0\end{pmatrix},
\qquad
( v^iv^j )=\frac12\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}
$$

となるため、$D_{xy}=D_{yx}=1/2$、他の成分は零です。$e^+$ との縮約は零、$e^\times$ との縮約は $D_{12}+D_{21}=1$ ですから $F_+=0,F_\times=1$。同じ入射波でも装置の向きで二成分への感度が入れ替わることまで確認できます。
<!-- definition-example-end -->

<a id="thm-gr22-michelson-response"></a>

<!-- formal-statement-start -->
> **定理（長波長・自由鏡Michelson干渉計の差動位相）**  
> 真空TT平面波の振幅を $O(\epsilon)$ とし、腕長 $L$ について $\omega L/c\ll1$ とする。中央ビームスプリッターと二鏡は波に対してTT座標で静止する自由質点とし、二腕は長さが等しく直交する。入射レーザー角周波数を $\Omega_{\mathrm L}>0$ とし、波の一往復中の変化を無視する先頭次数では、二腕の往復時間差の波による一次成分と干渉位相差は
>
$$
\boxed{\delta(T_u-T_v)=\frac{2L}{c}\,h_{\mathrm{det}},
\qquad
\delta(\Phi_u-\Phi_v)=\frac{2\Omega_{\mathrm L}L}{c}\,h_{\mathrm{det}}.}
$$
>
> $h_{\mathrm{det}}=F_+h_++F_\times h_\times$ は[検出器テンソル](#def-gr22-detector-tensor)による応答で、波の時空点は中央近傍の往復時刻で評価する。有限周波数・非等長腕では別途光路積分が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

鏡のTT座標を固定して光の零条件を解き、行きと帰りの時間を足します。長波長近似のとき、腕ごとの往復時間変化は光路方向の空間計量成分に比例します。

<!-- proof-start -->
### 証明

まず光路の一次走時には背景の直線経路を用いてよいことを確かめます。両端のTT座標位置が固定されているので、直線 $\boldsymbol x(s)=\boldsymbol x_0+\boldsymbol e s$ からの一次の経路変化 $\delta\boldsymbol x(s)$ は両端で零です。背景の道のりの一次変化は

$$
\delta\int_0^L|\boldsymbol x'(s)|\,ds
=\int_0^L\boldsymbol e\cdot\delta\boldsymbol x'(s)\,ds
=\boldsymbol e\cdot[\delta\boldsymbol x(L)-\delta\boldsymbol x(0)]=0.
$$

計量摂動 $O(\epsilon)$ と経路修正 $O(\epsilon)$ の積も二次です。従って一次では一定方向 $\boldsymbol e$ の腕に沿って $dx^i=e^i ds$ とし、[光的接ベクトルの条件](../../../幾何系/LORG/LORG1/index.md#def-lorg1-causal-type) $ds_{\mathrm{spacetime}}^2=0$ を使えます。TTゲージでは $g_{00}=-1,g_{0i}=0$ ですから

$$
0=-c^2dt^2+(\delta_{ij}+h_{ij}^{\mathrm{TT}})e^ie^jds^2.
$$

未来向き光線の走時要素は

$$
c\,dt=\sqrt{1+h_{ee}^{\mathrm{TT}}}\,|ds|
=\left(1+\frac12h_{ee}^{\mathrm{TT}}\right)|ds|
+O(\epsilon^2)|ds|,
\qquad
h_{ee}^{\mathrm{TT}}:=e^ie^jh_{ij}^{\mathrm{TT}}.
$$

$\omega L/c\ll1$ かつ $qL\ll1$ なので、片道の積分区間では $h_{ee}^{\mathrm{TT}}$ を一定とする先頭次数を取れます。行きの時間と帰りの時間はそれぞれ

$$
T_{\mathrm{one},e}=\frac{L}{c}
\left(1+\frac12h_{ee}^{\mathrm{TT}}\right),\qquad
T_{\mathrm{round},e}=\frac{2L}{c}+\frac{L}{c}h_{ee}^{\mathrm{TT}}.
$$

したがって

$$
\begin{aligned}
\delta(T_u-T_v)
&=\frac{L}{c}(h_{uu}^{\mathrm{TT}}-h_{vv}^{\mathrm{TT}})\\
&=\frac{2L}{c}\frac12(u^iu^j-v^iv^j)h_{ij}^{\mathrm{TT}}\\
&=\frac{2L}{c}h_{\mathrm{det}}.
\end{aligned}
$$

等しいレーザー角周波数を使う理想干渉計で、差動の往復遅延は位相の一次変化 $\delta\Delta\Phi=\Omega_{\mathrm L}\delta\Delta T$ に対応します。実際のレーザー・制御系や有限光路長による周波数ごとの感度変化を含めた主張ではありません。$\square$
<!-- proof-end -->

**直接例。** $x,y$ 腕と $+z$ からの入射で $h_{\mathrm{det}}=h_+$ なので、$h_\times=0$ のとき $T_x-T_y=(2L/c)h_+$ が一次の信号です。二鏡のTT座標は動かず、$\Gamma^i_{00}=0$ ですが、往復光路の時間が変わります。ここが「重力波は鏡をTT座標内で左右に動かす」という誤解との違いです。

**適用の限界。** $\omega L/c$ が小さくないときは、波が行きと帰りで異なる位相を持つので時間積分を省けません。腕長 $L$ と波長 $\lambda=2\pi c/\omega$ の比も区別します。また、局所自由落下枠での二鏡の相対運動と、TT座標での固定位置は、同じ幾何を異なる座標で記述しています。観測可能なのは信号の比較結果であって、座標値そのものではありません。

## 5. 演習：物理偏極と測定を分けて再現する

### Level A

<a id="ex-gr22-a01"></a>
#### GR22-A01 分散関係と調和条件
- Level: A

$k_\mu=(-\omega/c,0,0,q)$、$\omega,q>0$ の平面波について、$\Box e^{ik_\mu x^\mu}=0$ の条件を導け。また $\omega=cq$ のとき、$\partial^\mu\bar h_{\mu\nu}=0$ を振幅の四条件に直せ。

<!-- solution-start -->
**詳細解答。** 一階微分は $\partial_\alpha e^{ikx}=ik_\alpha e^{ikx}$、二階微分は $\partial_\beta\partial_\alpha e^{ikx}=-k_\beta k_\alpha e^{ikx}$。従って

$$
\Box e^{ikx}
=-\eta^{\alpha\beta}k_\alpha k_\beta e^{ikx}
=\left(\frac{\omega^2}{c^2}-q^2\right)e^{ikx}.
$$

係数零かつ $\omega,q>0$ から $\omega=cq$。このとき $k^\mu=(q,0,0,q)$ なので

$$
\partial^\mu\bar h_{\mu\nu}
=\operatorname{Re}\!\left[iq(\bar A_{0\nu}+\bar A_{3\nu})e^{i\phi}\right]=0.
$$

$\phi$ が変化する開領域で恒等的に零なら $\bar A_{0\nu}+\bar A_{3\nu}=0$（$\nu=0,1,2,3$）です。
<!-- solution-end -->

<a id="ex-gr22-a02"></a>
#### GR22-A02 TT条件を成分で点検する
- Level: A

$A_{11}=a$、$A_{22}=-a$、$A_{12}=A_{21}=b$、他の全成分零とする。対称性、時間・縦方向の零、空間跡零、調和条件を直接確認せよ。

<!-- solution-start -->
**詳細解答。** $A_{12}=A_{21}$ なので対称です。$A_{0\mu}=A_{3\mu}=0$、$\delta^{ij}A_{ij}=a-a+0=0$。全跡 $A=\eta^{\mu\nu}A_{\mu\nu}=0$ により $\bar A=A$ で、$k^\mu\bar A_{\mu\nu}=q(A_{0\nu}+A_{3\nu})=0$。$a,b$ はともに複素数でよく、実部の取り方で二つの偏極の振動が時間的にずれる場合も記述できます。
<!-- solution-end -->

<a id="ex-gr22-a03"></a>
#### GR22-A03 時間成分を消す残余変換
- Level: A

$q>0$ の調和平面波の振幅で $A_{00}=\alpha$、$A_{01}=\beta$、$A_{02}=\gamma$、$A_{03}=\delta$ とする。$B_\mu$ による残余変換で $A'_{0\mu}=0$ とする四成分を求め、なぜ残余ゲージを保つか示せ。

<!-- solution-start -->
**詳細解答。** [TTゲージ構成](#thm-gr22-tt-gauge)と同じ変換 $\delta A_{\mu\nu}=-i(k_\mu B_\nu+k_\nu B_\mu)$ を使います。$k_0=-q,k_3=q$ なので

$$
B_0=-\frac{\alpha}{2iq},\quad B_1=-\frac{\beta}{iq},\quad
B_2=-\frac{\gamma}{iq},\quad B_3=-\frac{\alpha}{2iq}-\frac{\delta}{iq}.
$$

例えば $A'_{03}=\delta+iq(B_3-B_0)=\delta-\delta=0$。他の三成分も同じく零です。$\xi_\mu=\operatorname{Re}(B_\mu e^{i\phi})$ は $\Box\xi_\mu=-k^2\xi_\mu=0$ であり、[GR21の残余条件](../GR21/index.md#thm-gr21-linear-wave)を満たします。
<!-- solution-end -->

<a id="ex-gr22-a04"></a>
#### GR22-A04 二方向と45度方向の伸縮
- Level: A

$h_{ij}^{\mathrm{TT}}$ が $h_+$、$h_\times$ を持つとき、$\boldsymbol e_x,\boldsymbol e_y,(\boldsymbol e_x+\boldsymbol e_y)/\sqrt2$ の長さの一次ひずみをそれぞれ計算せよ。

<!-- solution-start -->
**詳細解答。** [距離の一次式](#prop-gr22-local-length)に各単位ベクトルを代入します。$\boldsymbol e_x$ では $e^ie^jh_{ij}=h_{11}=h_+$、$\boldsymbol e_y$ では $h_{22}=-h_+$。斜め方向では $e^1=e^2=1/\sqrt2$ なので

$$
e^ie^jh_{ij}
=\frac12h_{11}+\frac12h_{22}+2\frac12h_{12}
=\frac12h_+-\frac12h_++h_\times=h_\times.
$$

従って順に $\delta L/L=h_+/2,-h_+/2,h_\times/2$。斜め腕では $\times$ 成分が効きます。
<!-- solution-end -->

<a id="ex-gr22-a05"></a>
#### GR22-A05 潮汐曲率の符号と単位
- Level: A

$h_{11}=H\cos(qz-\omega t)$、$h_{22}=-h_{11}$、他成分零のTT波に対し、$R^{(1)1}{}_{010}$ と $d^2\xi^1/dt^2$ を $\xi_0^1=L$、$\xi_0^2=\xi_0^3=0$ で求め、次元を確認せよ。

<!-- solution-start -->
**詳細解答。** [潮汐曲率の導出](#thm-gr22-tidal-response)より

$$
R^{(1)1}{}_{010}=-\frac{1}{2c^2}\partial_t^2h_{11}
=\frac{\omega^2H}{2c^2}\cos(qz-\omega t).
$$

偏差方程式で $-c^2R^{(1)1}{}_{010}L$ とするので

$$
\frac{d^2\xi^1}{dt^2}=-\frac{\omega^2H}{2}L\cos(qz-\omega t).
$$

$R^{(1)1}{}_{010}$ は $L^{-2}$、右辺の相対加速度は $L\,T^{-2}$ の次元です。符号の逆転は曲率を偏差方程式へ代入する段階に現れます。
<!-- solution-end -->

### Level B

<a id="ex-gr22-b01"></a>
#### GR22-B01 任意の空間振幅からTT部分を抽出する
- Level: B

$\boldsymbol n=(0,0,1)$、$S_{ij}=\begin{pmatrix}a&b&p\\b&d&r\\p&r&s\end{pmatrix}$ とする。[TT射影](#def-gr22-tt-projector)を作用させた結果を導き、$S_{ij}$ に $\delta S_{ij}=n_i v_j+n_j v_i$ を加えても結果が変わらないことを成分でも確かめよ。

<!-- solution-start -->
**詳細解答。** $P=\operatorname{diag}(1,1,0)$ より $PSP=\begin{pmatrix}a&b&0\\b&d&0\\0&0&0\end{pmatrix}$、$P^{ij}S_{ij}=a+d$。従って

$$
S^{\mathrm{TT}}=\begin{pmatrix}
(a-d)/2&b&0\\
b&(d-a)/2&0\\
0&0&0
\end{pmatrix}.
$$

$n_i v_j+n_jv_i$ の横断 $11,12,22$ 成分はいずれも零（$n_1=n_2=0$）で、増えるのは $13,23,33$ 成分だけです。TT射影はそれらを消すので表示行列は不変です。これが波数方向に比例するゲージ変化が横偏極へ影響しない理由です。
<!-- solution-end -->

<a id="ex-gr22-b02"></a>
#### GR22-B02 二つの偏極の向き係数
- Level: B

腕を $\boldsymbol u=(\cos\theta,\sin\theta,0)$、$\boldsymbol v=(-\sin\theta,\cos\theta,0)$ とする。$+z$ 方向の波に対し、$F_+$、$F_\times$、$h_{\mathrm{det}}$ を導け。$\theta=0,\pi/4$ で検算せよ。

<!-- solution-start -->
**詳細解答。** $e^+_{ij}$ との縮約は $u^iu^je^+_{ij}=\cos^2\theta-\sin^2\theta=\cos2\theta$、$v^iv^je^+_{ij}=\sin^2\theta-\cos^2\theta=-\cos2\theta$。従って

$$
F_+=\tfrac12(\cos2\theta-(-\cos2\theta))=\cos2\theta.
$$

同様に $u^iu^je^\times_{ij}=2\cos\theta\sin\theta=\sin2\theta$、$v^iv^je^\times_{ij}=-\sin2\theta$ なので

$$
F_\times=\sin2\theta,\qquad
h_{\mathrm{det}}=h_+\cos2\theta+h_\times\sin2\theta.
$$

$\theta=0$ では $(F_+,F_\times)=(1,0)$、$\theta=\pi/4$ では $(0,1)$ で、[定義の直接例](#def-gr22-detector-tensor)と一致します。
<!-- solution-end -->

<a id="ex-gr22-b03"></a>
#### GR22-B03 波のように見える純ゲージ
- Level: B

$k_\mu=(-q,0,0,q)$、$q>0$ とし、背景摂動 $h=0$ から $\xi_0=\alpha\sin(q(x^3-x^0))$、$\xi_1=\xi_2=\xi_3=0$（定数 $\alpha$ は長さの単位で $|q\alpha|\ll1$）でゲージ変換する。非零の $h'_{\mu\nu}$、調和条件、一次Riemann曲率、空間TT射影を求めよ。

<!-- solution-start -->
**詳細解答。** 位相 $\phi=q(x^3-x^0)$ について $\partial_0\xi_0=-q\alpha\cos\phi$、$\partial_3\xi_0=q\alpha\cos\phi$ です。[GR21のゲージ変換](../GR21/index.md#def-gr21-gauge-equivalence)より

$$
h'_{00}=2q\alpha\cos\phi,\qquad
h'_{03}=h'_{30}=-q\alpha\cos\phi
$$

で、他成分零です。$\Box\xi_0=(-\partial_0^2+\partial_3^2)\xi_0=0$、他の $\xi_\mu$ も零なので[残余ゲージ条件](../GR21/index.md#thm-gr21-linear-wave)を満たします。$|q\alpha|\ll1$ より一次微分は微小で、尺度 $q^{-1}$ での[GR21のゲージ変換の微分条件](../GR21/index.md#def-gr21-gauge-equivalence)にも適合します。[一次曲率のゲージ不変性](../GR21/index.md#prop-gr21-gauge-invariance)から変換前の零曲率のままです。空間振幅 $h'_{ij}$ は全成分零でTT射影も零です。非零の $h'_{00}$ が周期的でも物理的な重力波とは限らない直接反例になっています。
<!-- solution-end -->

<a id="ex-gr22-b04"></a>
#### GR22-B04 潮汐方程式と初期速度
- Level: B

波が同一点で $h_{11}(t)=H\cos(\omega t)$、$h_{22}=-h_{11}$ であるとする。時刻 $t_0=0$ に $\xi^1(0)=L$、$\dot\xi^1(0)=0$、$\xi^2(0)=0$ とした近接自由質点の一次相対変位を導け。なぜ $\xi^1=L(1+h_{11}/2)$ をそのまま初期値にできないか説明せよ。

<!-- solution-start -->
**詳細解答。** [偏差方程式](#thm-gr22-tidal-response)から $\ddot\xi^1=\frac12\ddot h_{11}L=-H\omega^2L\cos(\omega t)/2$。一回積分すると $\dot\xi^1=-(H\omega L/2)\sin(\omega t)+C_1$、$\dot\xi^1(0)=0$ より $C_1=0$。二回目の積分で

$$
\xi^1(t)=\frac{HL}{2}\cos(\omega t)+C_2,\qquad
C_2=L-\frac{HL}{2}
$$

なので $\xi^1(t)=L[1+\frac H2(\cos(\omega t)-1)]$ です。$\xi^1=L(1+h_{11}/2)$ は $t=0$ に $L(1+H/2)$ を与え、指定した $\xi^1(0)=L$ を満たしません。相対運動の解には初期値を合わせる積分定数が必要です。
<!-- solution-end -->

### Level C

<a id="ex-gr22-c01"></a>
#### GR22-C01 伝播・偏極・自由質点・光路差を接続する
- Level: C

真空で $+z$ 方向へ進む次の小振幅波を考える。

$$
h_+(t,z)=H\cos(qz-\omega t),\qquad
h_\times(t,z)=K\sin(qz-\omega t),
\quad \omega=cq>0.
$$

$H,K$ は実で $|H|,|K|\ll1$ とし、他はTTゲージの条件で決める。$z=0$ 近傍に背景腕長 $L>0$、$\omega L/c\ll1$ の理想Michelson干渉計を置く。

1. $h_{\mu\nu}^{\mathrm{TT}}$ の全非零成分を示し、$\Box\bar h=0$ と調和条件を確認せよ。
2. $z=0$ の初期時刻 $t=0$ で、$x$ 方向へ離した自由質点の偏差 $\xi_0=(L,0,0)$ が受ける一次相対加速度を求めよ。
3. 腕が$x,y$ 方向の場合と両腕を45度回転した場合の、差動ひずみ応答 $h_{\mathrm{det}}(t,0)$ を求めよ。
4. それぞれの差動往復時間とレーザー位相の一次変化を求め、$\omega L/c$ が小さくない場合にこの計算のどの段階が失効するか述べよ。

<!-- solution-start -->
**詳細解答。** **(1)** $\phi=qz-\omega t$ と置くと $h_{11}=H\cos\phi$、$h_{22}=-H\cos\phi$、$h_{12}=h_{21}=K\sin\phi$、$h_{0\mu}=h_{3\mu}=0$ です。$\eta^{\mu\nu}h_{\mu\nu}=h_{11}+h_{22}=0$ より $\bar h=h$ です。各正弦・余弦について

$$
\Box f(\phi)=\left(-\frac{\omega^2}{c^2}+q^2\right)f''(\phi)=0,
\qquad
\partial^\mu\bar h_{\mu\nu}
=\partial^0 h_{0\nu}+\partial^3h_{3\nu}=0
$$

で、他の微分方向の波数も零です。

**(2)** [GR22の潮汐定理](#thm-gr22-tidal-response)で $\xi_0^1=L$、$\xi_0^2=0$ と置くと

$$
\ddot\xi^1=\tfrac12L\,\partial_t^2 h_{11}
=-\frac{\omega^2HL}{2}\cos\phi,\qquad
\ddot\xi^2=\tfrac12L\,\partial_t^2 h_{21}
=-\frac{\omega^2KL}{2}\sin\phi.
$$

$t=0,z=0$ では $\phi=0$ なので $(\ddot\xi^1,\ddot\xi^2,\ddot\xi^3)=(-\omega^2HL/2,0,0)$。$\times$ 成分はこの瞬間には零ですが、一般時刻では横方向へ加速度を与えます。

**(3)** $x,y$ 腕なら [検出器テンソルの例](#def-gr22-detector-tensor)から $(F_+,F_\times)=(1,0)$。ゆえに $h_{\mathrm{det}}(t,0)=H\cos(\omega t)$ です（余弦は偶関数）。45度回転した腕なら $(F_+,F_\times)=(0,1)$。$\sin(qz-\omega t)|_{z=0}=-\sin(\omega t)$ に注意して

$$
h_{\mathrm{det}}^{45^\circ}(t,0)=-K\sin(\omega t).
$$

**(4)** [長波長・自由鏡Michelson干渉計の差動位相](#thm-gr22-michelson-response)を適用すると

$$
\begin{aligned}
\delta\Delta T_{xy}&=\frac{2L}{c}H\cos(\omega t),
&\delta\Delta\Phi_{xy}&=\frac{2\Omega_{\mathrm L}L}{c}H\cos(\omega t),\\
\delta\Delta T_{45^\circ}&=-\frac{2L}{c}K\sin(\omega t),
&\delta\Delta\Phi_{45^\circ}&=-\frac{2\Omega_{\mathrm L}L}{c}K\sin(\omega t).
\end{aligned}
$$

これらは中央での位相を腕全体の同じ値として扱った**先頭の長波長近似**です。$\omega L/c$ が大きくなると、光の行き・帰りで波の位相が変わるため、証明で $h_{ee}$ を積分の外へ出した段階が無効になります。有限周波数応答は各光線上の時空依存する $h_{ij}$ を積分して求める必要があります。
<!-- solution-end -->

---

真空平面波の波動方程式だけでは、純ゲージと物理的な潮汐は区別できませんでした。**TTゲージの実構成 → 曲率 → 自由落下者の相対変位 → 光の往復位相**という順に進めると、二つの偏極が測定へつながることが分かります。GR23では、これらの波が遅く動く物質源からどの程度放射されるのかを、四重極近似で調べます。
