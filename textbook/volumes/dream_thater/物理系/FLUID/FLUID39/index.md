# FLUID39 乱流のエネルギーは尺度間をどう移るか

[FLUID37 の速度変動と乱流運動エネルギー](../FLUID37/index.md#def-fluid37-reynolds-decomposition)によって揺らぎの大きさを数え、[FLUID38 の Reynolds 共分散](../FLUID38/index.md#def-fluid38-reynolds-stress)によって平均流から揺らぎへの仕事を捉えた。しかし「揺らぎのエネルギーが増えた」という情報だけでは、大きな渦が小さな渦へエネルギーを渡したのか、粘性で熱へ変わったのかを区別できない。

本講では、**物理空間のエネルギー収支**を厳密に導いてから、**波数空間のエネルギー移送**を定義する。最後に Kolmogorov の 1941 年型仮説（以下 K41）が何を仮定して $-5/3$ 乗則を導くのかを切り分ける。波数の分布が似ていても、それだけで乱流のエネルギーカスケードを観測したことにはならない。

## 0. 流れと平均の仮定を固定する

一定密度 $\rho>0$ [kg/m$^3$]、一定動粘度 $\nu>0$ [m$^2$/s] の三次元[非圧縮 Newton 流体](../../CTM/CTM15/index.md#def-ctm15-incompressible-newtonian)を扱う。速度 $\boldsymbol u(\boldsymbol x,t,\omega)$ [m/s] と圧力 $p(\boldsymbol x,t,\omega)$ [Pa] は、各実現 $\omega$ について [非圧縮 Navier–Stokes 方程式](../../CTM/CTM15/index.md#thm-ctm15-incompressible-navier-stokes)を満たすとする。第1節までは体積力をゼロとする。

空間座標は $\boldsymbol x=(x_1,x_2,x_3)$、時間は $t$ である。微分記号は

$$
\partial_t=\frac{\partial}{\partial t},\qquad
\partial_j=\frac{\partial}{\partial x_j},\qquad
\Delta=\sum_{j=1}^3\partial_j^2
$$

と書く。$\partial_t$ は位置を固定した時間偏微分、$\partial_j$ は時刻を固定した空間偏微分、$\Delta$ は空間 Laplace 演算子である。

$$
\partial_tu_i+u_j\partial_ju_i
=-\frac1\rho\partial_i p+\nu\Delta u_i,
\qquad \partial_i u_i=0
$$

を出発点とする。繰り返した添字 $i,j\in\{1,2,3\}$ は総和を取る。

集合平均を $\overline{(\,\cdot\,)}=\mathbb E_\omega(\,\cdot\,)$ と書き、**位置・時刻を固定した実現の平均**だけを指す。次の平均と変動を区別する。

$$
U_i=\overline{u_i},\qquad v_i=u_i-U_i,\qquad
P=\overline p,\qquad p'=p-P.
$$

$v_i$ は速度変動であり、$u_i'$ と同じものを表す。ここでプライム $'$ は微分ではなく集合平均からの偏差を表し、$\partial_jv_i$ は別に空間微分を意味する。

分散・三次積・勾配二乗が有限で、ここで行う微分・平均・空間積分の交換を正当化する十分な滑らかさ・可積分性があると仮定する。$U$ と $v$ はともに発散ゼロである。

[乱流運動エネルギーの定義](../FLUID37/index.md#def-fluid37-reynolds-decomposition)と[一点共分散](../FLUID38/index.md#def-fluid38-reynolds-stress)は

$$
R_{ij}=\overline{v_iv_j},\qquad
k=\frac12R_{ii}=\frac12\overline{v_iv_i}
$$

である。$k$ の単位は m$^2$/s$^2$。**エネルギー $k$ と波数 $\kappa$ [m$^{-1}$] は別の量**として記す。第2節以降の Fourier 解析では、まず辺長 $L>0$ の周期立方体 $V=[0,L]^3$ を用いる。壁・自由表面がある場合に周期境界の結論をそのまま使わない。

## 1. 変動エネルギーの収支を導く

$y=x_2$ を鉛直座標、$G=dU_1/dy$ を一定の剪断率として、平均流を

$$
U_1(y)=Gy,\qquad U_2=U_3=0
$$

とする。定常な $U_1(y)$ の全微分 $dU_1/dy$ は、第0節の空間偏微分 $\partial_2U_1$ と一致する。

このとき[FLUID38 の剪断生成率](../FLUID38/index.md#prop-fluid38-shear-production)は $\mathcal P=-R_{12}G$ である。$R_{12}<0$、$G>0$ なら生成は正だが、それだけでは $k$ の時間変化を決められない。変動の三乗平均による輸送、圧力の仕事、粘性散逸も同時に数える必要がある。

そのため局所生成率 $\mathcal P$、局所散逸率 $\varepsilon$、物理空間での輸送束 $J_j$ を次で用いる。ここで $\partial_j=\partial/\partial x_j$ である。

<a id="def-fluid39-production-dissipation"></a>

<!-- formal-statement-start -->
> **定義（変動エネルギーの生成・散逸・空間輸送）**  
> 第0節の仮定の下、単位質量当たりの生成率 $\mathcal P$、散逸率 $\varepsilon$、エネルギー流束 $J_j$ を

$$
\mathcal P=-R_{ij}\partial_jU_i,\qquad
\varepsilon=\nu\overline{(\partial_jv_i)(\partial_jv_i)},
$$

$$
J_j=\frac12\overline{v_iv_i v_j}
+\frac1\rho\overline{p'v_j}
-\nu\partial_jk
$$

> で定める。$\mathcal P$ と $\varepsilon$ の単位は m$^2$/s$^3$、$J_j$ は m$^3$/s$^3$。$J$ は空間内の場所から場所への輸送であり、後に扱う波数間輸送とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid39-production-dissipation -->
**定義の確認**：単純剪断 $U_1=Gy$ で $G=2$ s$^{-1}$、$R_{12}=-0.04$ m$^2$/s$^2$、他の平均速度勾配はゼロなら、$\mathcal P=-(-0.04)(2)=0.08$ m$^2$/s$^3$。一方、$\varepsilon$ は $\nu>0$ と各 $\overline{(\partial_jv_i)^2}\ge0$ により必ず非負となる。$\mathcal P$ は逆向きの Reynolds 輸送なら負にもなりうる。両者は同じ「損失」という意味ではない。
<!-- definition-example-end -->

<a id="prop-fluid39-tke-budget"></a>

<!-- formal-statement-start -->
> **命題（乱流運動エネルギーの局所収支）**  
> 第0節の三次元・一定密度・非圧縮流体について、集合平均と微分を交換でき、上記の量が有限なら

$$
\partial_t k+U_j\partial_jk
=\mathcal P-\varepsilon-\partial_jJ_j.
$$

> この式は閉鎖近似ではなく Navier–Stokes 方程式からの厳密な恒等式である。ただし $\mathcal P,J,\varepsilon$ を平均速度だけから決めることは一般にはできない。
<!-- formal-statement-end -->

### 証明の見取り図

[FLUID38 の Reynolds 平均式](../FLUID38/index.md#thm-fluid38-rans)を瞬時式から引き、変動方程式に $v_i$ を掛ける。圧力・三次積・粘性項を**積の微分**として整理すると、空間輸送と正値の散逸が分離する。

<!-- proof-start -->
### 証明

まず瞬時の移流を $u_j\partial_ju_i$、平均移流を $U_j\partial_jU_i$ と書く。[FLUID38 の共分散輸送式](../FLUID38/index.md#prop-fluid38-stress-transport)と同じ減算を、今回はエネルギーへ掛ける前の形で行う。$\overline{v_i}=0$ と $\partial_jU_j=\partial_jv_j=0$ により

$$
\partial_tv_i+U_j\partial_jv_i+v_j\partial_jU_i
+\partial_j(v_iv_j-R_{ij})
=-\rho^{-1}\partial_ip'+\nu\Delta v_i.
$$

ここに $v_i$ を掛けて平均する。最初の二項は

$$
\overline{v_i\partial_tv_i}
=\frac12\partial_t\overline{v_iv_i}=\partial_tk,
\qquad
U_j\overline{v_i\partial_jv_i}=U_j\partial_jk
$$

となる。平均剪断に由来する項は $\overline{v_iv_j}\partial_jU_i=R_{ij}\partial_jU_i=-\mathcal P$。三次項では

$$
v_i\partial_j(v_iv_j)
=v_iv_j\partial_jv_i+v_iv_i\partial_jv_j
=\frac12\partial_j(v_iv_iv_j),
$$

となる。最後の等号では $\partial_jv_j=0$ を使った。また $v_i\partial_jR_{ij}$ を平均すると $\overline{v_i}\partial_jR_{ij}=0$ である。圧力項についても

$$
-\rho^{-1}\overline{v_i\partial_ip'}
=-\rho^{-1}\partial_i\overline{p'v_i}
+\rho^{-1}\overline{p'\partial_iv_i}
=-\rho^{-1}\partial_i\overline{p'v_i}.
$$

粘性項は積の微分を二度使って

$$
\nu\overline{v_i\Delta v_i}
=\nu\partial_j\overline{v_i\partial_jv_i}
-\nu\overline{(\partial_jv_i)^2}
=\nu\Delta k-\varepsilon.
$$

全項を集めると

$$
\partial_tk+U_j\partial_jk
-\mathcal P+\frac12\partial_j\overline{v_iv_iv_j}
=-\rho^{-1}\partial_j\overline{p'v_j}
+\nu\Delta k-\varepsilon.
$$

輸送項を右辺へ移し、定義した $J_j$ にまとめれば主張となる。
<!-- proof-end -->

この導出で **$\varepsilon\ge0$ は証明できる**が、$\mathcal P\ge0$ は証明できない。局所的に $-\partial_jJ_j$ が正なら、その場所の $k$ は空間輸送によっても増える。三次相関が現れるため、[Reynolds 応力の非閉鎖性](../FLUID38/index.md#prop-fluid38-stress-transport)は $k$ の式でも残る。

周期境界で体積平均を $\langle g\rangle_V=L^{-3}\int_Vg\,d^3x$ と書く。$U_j\partial_jk=\partial_j(U_jk)$ であり、周期面の流束が相殺するので

$$
\frac{d}{dt}\langle k\rangle_V
=\langle\mathcal P\rangle_V-\langle\varepsilon\rangle_V.
$$

これは **体積で見れば空間輸送が消える**という主張であり、空間内で $J_j$ がゼロという意味ではない。$\boldsymbol U=0$ かつ外力がない場合は $\frac{d}{dt}\langle k\rangle_V=-\langle\varepsilon\rangle_V\le0$ である。定常な非零散逸を維持するには、平均流や外力などからのエネルギー供給が必要となる。

## 2. 空間の Fourier モードにエネルギーを割り振る

物理空間の輸送 $\partial_jJ_j$ は場所の間の移動だが、大きな渦から小さな渦への受け渡しを調べたいなら、速度を**波数ごとのモード**に分ける。[FLUID37 の Fourier スペクトルと Parseval 関係](../FLUID37/index.md#thm-fluid37-parseval-correlation)を、三次元の発散ゼロ場に適用する。

辺長 $L$ の周期立方体に対し $\boldsymbol n\in\mathbb Z^3$、$\boldsymbol q_{\boldsymbol n}=2\pi\boldsymbol n/L$、波数の大きさ $\kappa_{\boldsymbol n}=|\boldsymbol q_{\boldsymbol n}|$ とする。$\boldsymbol v$ の Fourier 係数は

$$
\widehat{\boldsymbol v}_{\boldsymbol n}
=\frac1{L^3}\int_V\boldsymbol v(\boldsymbol x)
e^{-i\boldsymbol q_{\boldsymbol n}\cdot\boldsymbol x}\,d^3x
$$

である。最初は有限個のモードからなる場で計算し、一般の滑らかな周期場には二乗平均収束と微分の正当化がある場合に拡張する。以下、上付き $^*$ は Fourier 係数の複素共役であり、$|\widehat{\boldsymbol v}_{\boldsymbol n}|^2=\widehat{\boldsymbol v}_{\boldsymbol n}^{\,*}\cdot\widehat{\boldsymbol v}_{\boldsymbol n}$ とする。

有限の周期箱では波数は整数格子上にあり、エネルギーは離散的な殻に集まる。連続的な波数密度は、周期箱を大きくする等の極限で存在条件を確かめるか、初めから連続波数で定めた模型として扱う。

<a id="def-fluid39-energy-spectrum"></a>

<!-- formal-statement-start -->
> **定義（波数殻エネルギーと一側エネルギースペクトル）**  
> 第0節の周期・二乗可積分な速度変動に対し、波数帯 $I\subset[0,\infty)$ の単位質量当たりのエネルギーを

$$
K(I)=\frac12\sum_{\kappa_{\boldsymbol n}\in I}
\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}
$$

> と定める。有限周期箱の非零の殻質量 $K$ は点に集中するため、連続関数の積分では厳密に表せない。
>
> 帯域エネルギーが適切な極限で $K_\infty(I)$ に収束し、その極限について

$$
K_\infty([a,b))=\int_a^b E(\kappa)\,d\kappa
$$

> を満たす非負密度 $E$ が存在する場合、$E$ を一側エネルギースペクトルという。連続波数の模型では、この積分関係を直接採用してもよい。
>
> 有限箱の殻幅 $\Delta\kappa>0$ に対しては、$\Delta\kappa^{-1}K([\kappa,\kappa+\Delta\kappa))$ は密度の近似にとどまる。$K$ の単位は m$^2$/s$^2$、$E$ の単位は m$^3$/s$^2$。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid39-energy-spectrum -->
**定義の確認**：$x=x_1$、$q=2\pi/L>0$、$\boldsymbol q=(q,0,0)$ とする。一様位相 $\Phi\in[0,2\pi)$ と $a>0$ [m/s] に対して、$\boldsymbol v=(0,a\cos(qx+\Phi),0)$ を取る。

$qL=2\pi$ なので周期境界を満たす。$v_x=v_z=0$ で $v_y$ は $y=x_2$ に依存しないから、$\partial_xv_x+\partial_yv_y+\partial_zv_z=0$ である。

位相平均で $\overline{\cos(qx+\Phi)}=0$、したがって $\overline{\boldsymbol v}=0$ となる。余弦を展開すると

$$
v_y=\frac a2 e^{i\Phi}e^{iqx}+\frac a2 e^{-i\Phi}e^{-iqx}.
$$

[周期場の Fourier 係数](../FLUID37/index.md#def-fluid37-periodic-spectrum)の定義と直交性により、非零の係数は $\widehat v_{y,(\pm1,0,0)}=(a/2)e^{\pm i\Phi}$ だけである。従って殻 $|\boldsymbol q|=q$ のエネルギーは

$$
K(\{q\})=\frac12\left(\frac{a^2}4+\frac{a^2}4\right)
=\frac{a^2}4\quad[\mathrm{m^2/s^2}]
$$

となる。他の殻はゼロであり、係数の二乗も有限である。この例は**離散的な殻質量**を確認したもので、連続密度 $E$ を構成したものではない。
<!-- definition-example-end -->

<a id="prop-fluid39-spectral-dissipation"></a>

<!-- formal-statement-start -->
> **命題（Parseval によるエネルギーと散逸の表示）**  
> 第0節の周期境界で Fourier 和と平均・微分を交換できる滑らかな速度変動について、体積平均と集合平均の順序も交換できるとする。このとき

$$
\langle k\rangle_V
=\frac12\sum_{\boldsymbol n}
\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2},
\qquad
\langle\varepsilon\rangle_V
=\nu\sum_{\boldsymbol n}
\kappa_{\boldsymbol n}^2
\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}\ge0.
$$

> さらに波数殻のエネルギー測度が連続密度 $E$ に移り、$\kappa^2$ の重み付き総和についても極限と積分の交換が正当化できる場合に限り、対応して

$$
\langle k\rangle_V=\int_0^\infty E(\kappa)\,d\kappa,\qquad
\langle\varepsilon\rangle_V=2\nu\int_0^\infty\kappa^2E(\kappa)\,d\kappa.
$$

<!-- formal-statement-end -->

### 証明の見取り図

[Parseval 関係](../FLUID37/index.md#thm-fluid37-parseval-correlation)の三次元版を速度の各成分へ適用する。勾配を取ると各 Fourier 係数は $i q_j$ 倍されるので、散逸には $\kappa^2$ の重みが付く。

<!-- proof-start -->
### 証明

有限 Fourier 和で $\boldsymbol v=\sum_{\boldsymbol n}\widehat{\boldsymbol v}_{\boldsymbol n}e^{i\boldsymbol q_{\boldsymbol n}\cdot\boldsymbol x}$ とすると、直交積分は

$$
L^{-3}\int_V e^{i(\boldsymbol q_{\boldsymbol n}-\boldsymbol q_{\boldsymbol m})\cdot\boldsymbol x}\,d^3x
=\begin{cases}1&\boldsymbol n=\boldsymbol m,\\0&\boldsymbol n\ne\boldsymbol m.\end{cases}
$$

実値性により $\widehat{\boldsymbol v}_{-\boldsymbol n}=\widehat{\boldsymbol v}_{\boldsymbol n}^{\,*}$ なので

$$
\langle|\boldsymbol v|^2\rangle_V
=\sum_{\boldsymbol n}|\widehat{\boldsymbol v}_{\boldsymbol n}|^2.
$$

平均して $1/2$ を掛ければ $k$ の式を得る。一方

$$
\widehat{\partial_jv_i}_{\boldsymbol n}
=i q_{\boldsymbol n,j}\widehat v_{i,\boldsymbol n}
$$

だから、再び直交積分を使い、$i,j$ の和を取ると

$$
\langle(\partial_jv_i)(\partial_jv_i)\rangle_V
=\sum_{\boldsymbol n}\sum_{i,j}q_{\boldsymbol n,j}^2
|\widehat v_{i,\boldsymbol n}|^2
=\sum_{\boldsymbol n}\kappa_{\boldsymbol n}^2
|\widehat{\boldsymbol v}_{\boldsymbol n}|^2.
$$

$\nu>0$ を掛けて平均すると有限周期箱での散逸式となる。帯域 $I$ のエネルギーは $K(I)=\frac12\sum_{\kappa_{\boldsymbol n}\in I}\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}$ であり、同じ帯域の散逸は $2\nu\sum_{\kappa_{\boldsymbol n}\in I}\kappa_{\boldsymbol n}^2\frac12\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}$ である。連続密度への極限が存在し、**この $\kappa^2$ 重み付き総和にも極限交換を適用できる場合に限り**、積分表示が従う。エネルギー総和の収束だけでは高波数での散逸積分の収束まで保証しない。
<!-- proof-end -->

上の単一モード例では $\langle k\rangle_V=a^2/4$、$\langle\varepsilon\rangle_V=\nu q^2 a^2/2$ である。同じ $k$ を細かい波数へ配置すると、粘性散逸の重みは $q^2$ 倍に増える。これが**総エネルギー量だけでは散逸量を特定できない**理由である。

## 3. エネルギーはどの波数で交換されるか

ここからは **$U=0$ の周期・発散ゼロ場**を扱い、必要なら平均ゼロの外力 $\boldsymbol f$ [m/s$^2$] を Navier–Stokes 方程式の右辺に加える。$\boldsymbol f$ は指定されたエネルギー入力であり、その統計と速度との相関が存在するとする。第1節で扱った平均剪断の生成と、ここでの外力入力を混同しない。

非線形移流 $\boldsymbol v\cdot\nabla\boldsymbol v$ は Fourier モードを掛け合わせるので、ある波数の係数だけでその波数の時間発展を閉じられない。しかし**全モードで足すと非線形項のエネルギー寄与はゼロ**になる。この事実を、尺度間の受け渡しの符号に利用する。以下の $\widehat{(\boldsymbol v\cdot\nabla\boldsymbol v)}_{\boldsymbol n}$ と $\widehat{\boldsymbol f}_{\boldsymbol n}$ は、第2節と同じ空間積分でそれぞれ非線形項・外力を Fourier 展開した係数、$\operatorname{Re}$ は複素数の実部を表す。

<a id="def-fluid39-spectral-flux"></a>

<!-- formal-statement-start -->
> **定義（波数別の非線形移送と前方フラックス）**  
> 第3節の周期場で Fourier 展開と平均が正当化されるとき、まず各 Fourier モードへの非線形エネルギー移送率 $T_{\boldsymbol n}$ を

$$
T_{\boldsymbol n}
=-\operatorname{Re}\overline{
\widehat{\boldsymbol v}_{\boldsymbol n}^{\,*}\cdot
\widehat{(\boldsymbol v\cdot\nabla\boldsymbol v)}_{\boldsymbol n}}
$$

> と定め、波数帯 $I$ の離散移送率は $T(I)=\sum_{\kappa_{\boldsymbol n}\in I}T_{\boldsymbol n}$ とする。これは殻当たりの総量であり、単位波数幅当たりの連続密度ではない。$\kappa$ 以下の低波数領域から高波数領域への正味の移送率を、離散の場合

$$
\Pi(\kappa)=-\sum_{\kappa_{\boldsymbol n}\le\kappa}T_{\boldsymbol n}
$$

> と定義する。連続波数の極限で帯域移送率が $T(I)\to\int_I T(q)\,dq$ と表せる場合にのみ、連続密度 $T(q)$ と $\Pi(\kappa)=-\int_0^\kappa T(q)\,dq$ を使う。$T_{\boldsymbol n}$ と $\Pi$ の単位は m$^2$/s$^3$、連続密度 $T$ の単位は m$^3$/s$^3$。$\Pi>0$ は**低波数から高波数への正味の移送**を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid39-spectral-flux -->
**定義の確認**：二つの殻だけで $T_1=-0.30$、$T_2=+0.30$ [m$^2$/s$^3$] とし、他はゼロなら、殻1の直後の $\Pi=0.30>0$、殻2まで含むと $\Pi=0$ である。これは**移送率を持つ二殻の算術例**であり、その値を実現する Navier–Stokes 解を構成したわけではない。総和ゼロだけなら、逆方向の移送も起こりうる。
<!-- definition-example-end -->

<a id="prop-fluid39-transfer-conservation"></a>

<!-- formal-statement-start -->
> **命題（非線形移送の総和はゼロ）**  
> 滑らかな実値の周期・非圧縮速度 $\boldsymbol v$ について、有限 Fourier 和または十分な収束を仮定すると

$$
\sum_{\boldsymbol n}T_{\boldsymbol n}=0.
$$

> 外力のモード入力 $F_{\boldsymbol n}=\operatorname{Re}\overline{\widehat{\boldsymbol v}_{\boldsymbol n}^{\,*}\cdot\widehat{\boldsymbol f}_{\boldsymbol n}}$ とする。さらに第2節の $E$、第3節の $T$、外力入力密度 $F$ が連続波数の極限で存在し、時間微分と極限を交換できる場合、スペクトル収支は

$$
\partial_t E(\kappa)
=T(\kappa)+F(\kappa)-2\nu\kappa^2E(\kappa)
$$

> となる（連続密度の表示がある場合）。したがって低波数帯のエネルギーは、上限を越える $\Pi$、外力入力、粘性散逸によって変わる。
<!-- formal-statement-end -->

### 証明の見取り図

非線形項と速度の内積を空間積分すると発散形になり、周期面の寄与が相殺する。個々のモードの符号は定まらないが、**全モード和では消える**。粘性項には第2節の $\kappa^2$ が残る。

<!-- proof-start -->
### 証明

$\partial_jv_j=0$ から、各実現について

$$
v_i v_j\partial_jv_i
=\frac12v_j\partial_j(v_iv_i)
=\frac12\partial_j(v_jv_iv_i).
$$

周期立方体の対向面で積分が相殺するので

$$
\int_V\boldsymbol v\cdot(\boldsymbol v\cdot\nabla\boldsymbol v)\,d^3x=0.
$$

Fourier の直交性を用いると左辺の体積平均は

$$
\sum_{\boldsymbol n}\operatorname{Re}
\left(
\widehat{\boldsymbol v}_{\boldsymbol n}^{\,*}\cdot
\widehat{(\boldsymbol v\cdot\nabla\boldsymbol v)}_{\boldsymbol n}
\right).
$$

期待値を取って負号を付ければ $\sum T_{\boldsymbol n}=0$。各モードの運動方程式に $\widehat{\boldsymbol v}_{\boldsymbol n}^{\,*}$ を掛けて実部を取る。左辺の時間微分は $\frac12\partial_t\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}$。Fourier 空間の圧力勾配は $-i\boldsymbol q_{\boldsymbol n}\widehat p/\rho$ だが、$\boldsymbol q_{\boldsymbol n}\cdot\widehat{\boldsymbol v}_{\boldsymbol n}=0$ によりその実内積はゼロ。粘性項は $-\nu\kappa_{\boldsymbol n}^2\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}$ となる。従って

$$
\frac12\partial_t\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}
=T_{\boldsymbol n}+F_{\boldsymbol n}
-\nu\kappa_{\boldsymbol n}^2\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}.
$$

波数帯 $I$ に含まれるモードについて足すと、有限周期箱では

$$
\partial_t K(I)=T(I)+\sum_{\kappa_{\boldsymbol n}\in I}F_{\boldsymbol n}
-2\nu\sum_{\kappa_{\boldsymbol n}\in I}
\kappa_{\boldsymbol n}^2\frac12
\overline{|\widehat{\boldsymbol v}_{\boldsymbol n}|^2}.
$$

次に第2節の $E$、本節の $T$ および $F$ が連続密度として存在し、時間微分・重み付き和と極限を交換できる場合に、これを各波数での密度の等式として書けば命題のスペクトル収支を得る。
<!-- proof-end -->

$\kappa$ 以下の積分に対しては

$$
\partial_t\int_0^\kappa E(q)\,dq
=-\Pi(\kappa)+\int_0^\kappa F(q)\,dq
-2\nu\int_0^\kappa q^2E(q)\,dq
$$

である。大きな尺度（小さな波数）で注入され、より小さな尺度へ**平均的に前方輸送**され、十分高い波数で粘性に失われる、というのが三次元の典型的なエネルギーカスケード像である。**この向きは上の総和ゼロという命題だけからは証明されない**。逆方向の局所移送、二次元乱流の異なるカスケード、有限 Reynolds 数の非定常現象は区別する。

## 4. Kolmogorov の微細尺度と $-5/3$ 乗則

大きな構造の代表長さを $\ell_L>0$ [m] とし、その逆数を $\kappa_L\sim1/\ell_L$ と書く。小さな粘性尺度では、散逸率 $\varepsilon>0$ と動粘度 $\nu>0$ だけから長さ・速度・時間を作ることを考える。ここで $\varepsilon$ は統計的に一様な流れの**平均散逸率**（単位質量・単位時間当たり）を意味し、局所散逸の瞬時値と混同しない。

<a id="def-fluid39-kolmogorov-scales"></a>

<!-- formal-statement-start -->
> **定義（Kolmogorov の微細尺度）**  
> $\nu>0$、平均散逸率 $\varepsilon>0$ が与えられたとき、長さ $\eta$、速度 $u_\eta$、時間 $\tau_\eta$、対応波数 $\kappa_\eta$ を

$$
\eta=\left(\frac{\nu^3}{\varepsilon}\right)^{1/4},
\quad
u_\eta=(\nu\varepsilon)^{1/4},
\quad
\tau_\eta=\left(\frac{\nu}{\varepsilon}\right)^{1/2},
\quad
\kappa_\eta=\frac1\eta
$$

> と定める。$\eta$ [m] は代表的な微細長さで、最小渦径の厳密な下界ではない。これらの量の定義は、実際の流れが K41 の仮説を満たすとの主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid39-kolmogorov-scales -->
**定義の確認**：$\nu=10^{-6}$ m$^2$/s、$\varepsilon=10^{-3}$ m$^2$/s$^3$ なら、$\nu^3/\varepsilon=10^{-15}$ m$^4$、$\eta=10^{-15/4}\approx1.78\times10^{-4}$ m。$u_\eta=10^{-9/4}\approx5.62\times10^{-3}$ m/s、$\tau_\eta=10^{-3/2}\approx0.0316$ s。積 $u_\eta\tau_\eta=\eta$、比 $u_\eta\eta/\nu=1$ も単位と指数を含めて確認できる。
<!-- definition-example-end -->

K41 の重要部分は、**十分大きい Reynolds 数、近似的な局所等方性、統計的な準定常性、強制・粘性の直接効果が小さい慣性領域**において、スペクトルが主に平均散逸率 $\varepsilon$ と波数 $\kappa$ に支配される、という仮説である。慣性領域は $\kappa_L\ll\kappa\ll\kappa_\eta$ と表す。$\ell_L$ と $\eta$ に十分な尺度の隔たりがない場合はこの領域を広く取れない。

<a id="prop-fluid39-k41-scaling"></a>

<!-- formal-statement-start -->
> **命題（K41 仮説の下での慣性領域スペクトル次元則）**  
> 三次元非圧縮乱流に十分な慣性領域が存在し、そこで一側エネルギースペクトル $E(\kappa)$ が**普遍的な無次元定数** $C_K>0$ と、平均散逸率 $\varepsilon>0$、波数 $\kappa>0$ のみで次元的に決まると仮定する。このとき

$$
E(\kappa)=C_K\varepsilon^{2/3}\kappa^{-5/3}
$$

> という次元形になる。この式は**仮説からの帰結**であり、一般の Navier–Stokes 解に対する無条件の厳密定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギー密度 $E$ の次元は長さの三乗を時間の二乗で割ったもの。$\varepsilon$ と $\kappa$ のべきだけで組むなら、時間の指数から先にべきが決まり、長さの指数から残りが決まる。

<!-- proof-start -->
### 証明

$E=C_K\varepsilon^a\kappa^b$ と仮定する。$[E]=L^3T^{-2}$、$[\varepsilon]=L^2T^{-3}$、$[\kappa]=L^{-1}$ だから

$$
L^3T^{-2}=L^{2a-b}T^{-3a}.
$$

時間指数 $-3a=-2$ より $a=2/3$。長さ指数 $2a-b=3$ に代入して $4/3-b=3$、すなわち $b=-5/3$。従って指定のべき形となる。次元だけでは $C_K$ の数値も、この仮説を適用できる波数範囲も決まらない。
<!-- proof-end -->

$\varepsilon$ は第2節の [散逸積分](#prop-fluid39-spectral-dissipation)に現れる正の量だが、**$E\propto\kappa^{-5/3}$ の見かけだけでは定常な前方フラックス $\Pi$ を測定したことにはならない**。また間欠性による補正、異方性、狭い慣性領域、境界や二次元性があると無条件にこの指数を適用できない。尺度間の物理過程を判断するには、可能なら[非線形フラックスの定義](#def-fluid39-spectral-flux)に対応する情報が必要となる。

## 5. 合成スペクトルのエネルギーと散逸を積分する

次は**数学的に指定した**連続スペクトルであり、時間発展する速度場を解いたものではない。$\kappa_0=1$ m$^{-1}$、$\kappa_1=8$ m$^{-1}$、$A=3$ m$^3$/s$^2$、$\nu=0.01$ m$^2$/s として、

$$
E_{\mathrm{syn}}(\kappa)=
\begin{cases}
A(\kappa/\kappa_0)^{-5/3}&\kappa_0\le\kappa\le\kappa_1,\\
0&\text{それ以外}
\end{cases}
$$

とする。$A$ は $\kappa_0$ でのスペクトル密度であり、速度の振幅ではない。端点で切り落としているため、この模型が滑らかな物理場のスペクトルを厳密に表すと主張しない。

[スペクトル積分](#prop-fluid39-spectral-dissipation)をこの非負関数の形式的な診断量として適用すると

$$
K_{\mathrm{syn}}
=\int_{\kappa_0}^{\kappa_1}E_{\mathrm{syn}}(\kappa)\,d\kappa
=\frac{3A\kappa_0}{2}
\left[1-(\kappa_1/\kappa_0)^{-2/3}\right],
$$

$$
D_{\mathrm{syn}}
=2\nu\int_{\kappa_0}^{\kappa_1}\kappa^2E_{\mathrm{syn}}(\kappa)\,d\kappa
=\frac{3\nu A\kappa_0^3}{2}
\left[(\kappa_1/\kappa_0)^{4/3}-1\right].
$$

今回の数値では $(8)^{-2/3}=1/4$、$8^{4/3}=16$ なので

$$
K_{\mathrm{syn}}=\frac{9}{2}\left(1-\frac14\right)=3.375\ {\rm m^2/s^2},
\qquad
D_{\mathrm{syn}}=\frac{3(0.01)(3)}2(16-1)
=0.675\ {\rm m^2/s^3}.
$$

この $D_{\mathrm{syn}}$ を「実際の乱流で計測した散逸率」や「定常カスケードの一定フラックス」と同一視してはいけない。次の Python は、**同じ合成関数を台形則で積分して解析積分と比較する**。スペクトルの対数軸表示と、低波数から積算したエネルギー・散逸の割合も同じ Python ファイルから生成する。初回はブラウザの Python 環境の読み込みが必要な場合がある。

```python-file-lab
# lab-id: FLUID39-SYNTHETIC-SPECTRAL-INTEGRALS
# lab-title: 合成スペクトルの積分と格子幅検算（DNSではない）
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID39/spectral_cascade_lab.py
# timeout-ms: 30000
# lab-preset: 基準：波数1〜8・128分割 | --q0 1 --q1 8 --grid 128
# lab-preset: 粗い積分：32分割 | --q0 1 --q1 8 --grid 32
# lab-preset: 細かい積分：512分割 | --q0 1 --q1 8 --grid 512
# lab-preset: 高波数まで：波数1〜16 | --q0 1 --q1 16 --grid 256
```

**読み方**：最初の図の傾き $-5/3$ は**コードで指定した指数**であり、自然に発生した指数ではない。二つ目の図では、大きな波数まで積分しないと粘性散逸の相当部分を取り逃がす一方、エネルギーの積算は低波数で先に増える。分割数を増やして解析積分との相対誤差が減ることと、流体の物理模型が正しいことは別の検査である。

## 6. 演習：生成・移送・散逸を別々に検算する

### Level A

#### A1. 生成と散逸の符号
- Level: A

$G=4$ s$^{-1}$、$R_{12}=-0.03$ m$^2$/s$^2$、$\varepsilon=0.08$ m$^2$/s$^3$、$-\partial_jJ_j=0$ とし、$\boldsymbol U\cdot\nabla k=0$ の点で $\partial_tk$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

[生成率の定義](#def-fluid39-production-dissipation)から $\mathcal P=-R_{12}G=-(-0.03)(4)=0.12$ m$^2$/s$^3$。[$k$ の局所収支](#prop-fluid39-tke-budget)に $\boldsymbol U\cdot\nabla k=0$、$-\partial_jJ_j=0$ を代入して

$$
\partial_tk=0.12-0.08=0.04\ {\rm m^2/s^3}.
$$

生成率は正でも、散逸率を引く必要がある。
<!-- solution-end -->

#### A2. 勾配二乗から散逸を出す
- Level: A

一様位相を持つ $\boldsymbol v=(0,a\cos(qx+\Phi),0)$ として、$a=2$ m/s、$q=3$ m$^{-1}$、$\nu=0.01$ m$^2$/s とする。$k$ と $\varepsilon$ を位相平均から求めよ。

<!-- solution-start -->
#### 詳細解答

$\overline{\cos^2(qx+\Phi)}=1/2$ より、$k=\overline{v_y^2}/2=a^2/4=1$ m$^2$/s$^2$。非零の勾配は $\partial_xv_y=-aq\sin(qx+\Phi)$ のみなので

$$
\varepsilon=\nu\overline{(\partial_xv_y)^2}
=\nu a^2q^2\overline{\sin^2(qx+\Phi)}
=0.01\cdot4\cdot9/2=0.18\ {\rm m^2/s^3}.
$$

$k$ と $\varepsilon$ の次元が異なるのは波数二乗と $\nu$ を掛けたためである。
<!-- solution-end -->

#### A3. スペクトル密度の単位
- Level: A

波数帯の幅 $\Delta\kappa=2$ m$^{-1}$ に $K(I)=0.50$ m$^2$/s$^2$ のエネルギーが入っている。一定密度とみなした殻の $E$ を計算し、単位を示せ。

<!-- solution-start -->
#### 詳細解答

[波数殻エネルギーと一側エネルギースペクトル](#def-fluid39-energy-spectrum)から $E\simeq K(I)/\Delta\kappa=0.50/2=0.25$ m$^3$/s$^2$。単位は $(\mathrm{m^2/s^2})/(\mathrm{m^{-1}})=\mathrm{m^3/s^2}$。殻のエネルギーをそのまま密度と呼ぶと $\Delta\kappa$ の因子を落とす。
<!-- solution-end -->

#### A4. 波数の大きいモードほど散逸しやすい
- Level: A

同じエネルギー $K=0.4$ m$^2$/s$^2$ を持つ二つの単一波数モードが、$\kappa=2$ と $\kappa=6$ m$^{-1}$ にそれぞれある。$\nu=0.02$ m$^2$/s のとき、各モードの散逸への寄与 $2\nu\kappa^2K$ とその比を求めよ。

<!-- solution-start -->
#### 詳細解答

[$\kappa^2$ 重みの散逸式](#prop-fluid39-spectral-dissipation)から、低波数側は $2(0.02)(2^2)(0.4)=0.064$、高波数側は $2(0.02)(6^2)(0.4)=0.576$ m$^2$/s$^3$。比は $0.576/0.064=9=(6/2)^2$。同じエネルギーでも高波数側の粘性消費が大きい。
<!-- solution-end -->

#### A5. 微細尺度の粘度感度
- Level: A

平均散逸率 $\varepsilon$ を一定に保ち、動粘度を $\nu/16$ にすると、Kolmogorov 長さ $\eta$ と時間 $\tau_\eta$ は何倍になるか。

<!-- solution-start -->
#### 詳細解答

[微細尺度の定義](#def-fluid39-kolmogorov-scales)より $\eta\propto\nu^{3/4}$、$\tau_\eta\propto\nu^{1/2}$。よって

$$
\frac{\eta_{\rm new}}{\eta_{\rm old}}
=(1/16)^{3/4}=1/8,\qquad
\frac{\tau_{\eta,\rm new}}{\tau_{\eta,\rm old}}
=(1/16)^{1/2}=1/4.
$$

この比は**同じ $\varepsilon$ を与えた**場合の次元的比較であり、現実の装置で粘性だけを変えたとき $\varepsilon$ が不変とは限らない。
<!-- solution-end -->

### Level B

#### B1. 変動方程式から $k$ の項を復元する
- Level: B

$\partial_jv_j=0$、$\overline{v_i}=0$ とし、変動方程式の $v_i\partial_j(v_iv_j-R_{ij})$、$-\rho^{-1}v_i\partial_ip'$、$\nu v_i\Delta v_i$ の平均をそれぞれ発散部分と非発散部分に分解して、局所 $k$ 収支を復元せよ。

<!-- solution-start -->
#### 詳細解答

まず $v_i\partial_j(v_iv_j)=\frac12\partial_j(v_iv_iv_j)$。$\overline{v_i\partial_jR_{ij}}=\overline{v_i}\partial_jR_{ij}=0$ なので、三次項は $\frac12\partial_j\overline{v_iv_iv_j}$。圧力項は積の微分と $\partial_iv_i=0$ から

$$
-\rho^{-1}\overline{v_i\partial_ip'}
=-\rho^{-1}\partial_i\overline{v_ip'}.
$$

粘性項は $\partial_j(v_i\partial_jv_i)=(\partial_jv_i)^2+v_i\Delta v_i$ を用いて

$$
\nu\overline{v_i\Delta v_i}
=\nu\Delta k-\nu\overline{(\partial_jv_i)^2}
=\nu\Delta k-\varepsilon.
$$

他の項は $\partial_tk+U_j\partial_jk+R_{ij}\partial_jU_i$ となる。$R_{ij}\partial_jU_i=-\mathcal P$ として輸送部分を右辺へ移せば

$$
\partial_tk+U_j\partial_jk
=\mathcal P-\varepsilon
-\partial_j\left[
\frac12\overline{v_iv_iv_j}+\rho^{-1}\overline{p'v_j}-\nu\partial_jk
\right].
$$

三次項を「散逸」とは呼ばず、空間輸送として残すことが要点である。
<!-- solution-end -->

#### B2. 非線形移送の総和とフラックス
- Level: B

三つの殻で $T_1=-0.5$、$T_2=+0.2$、$T_3=+0.3$ m$^2$/s$^3$ とする。最初の殻、二つ目の殻までの $\Pi$ と、全殻を含む $\Pi$ を求める。非線形項は総エネルギーを増やすか。

<!-- solution-start -->
#### 詳細解答

[前方フラックスの定義](#def-fluid39-spectral-flux)は含めた殻への移送の負の総和である。従って

$$
\Pi_1=-(-0.5)=0.5,\quad
\Pi_2=-(-0.5+0.2)=0.3,\quad
\Pi_3=-(-0.5+0.2+0.3)=0.
$$

$\sum_jT_j=-0.5+0.2+0.3=0$ であり、[移送総和ゼロの命題](#prop-fluid39-transfer-conservation)と矛盾しない。正の $\Pi$ は低波数域からの正味流出だが、全帯域を足すと移送はエネルギーの総量を変えない。外力・散逸が別に存在すれば総量は変わりうる。
<!-- solution-end -->

#### B3. 切断べきスペクトルを積分する
- Level: B

$E(\kappa)=A(\kappa/\kappa_0)^{-5/3}$ を $\kappa_0\le\kappa\le8\kappa_0$ に与え、それ以外をゼロとする。$K=\int E\,d\kappa$ と $D=2\nu\int\kappa^2E\,d\kappa$ を $A,\kappa_0,\nu$ で表せ。

<!-- solution-start -->
#### 詳細解答

$E=A\kappa_0^{5/3}\kappa^{-5/3}$ なので、原始関数をそれぞれ

$$
\int\kappa^{-5/3}\,d\kappa=-\frac32\kappa^{-2/3},\qquad
\int\kappa^{1/3}\,d\kappa=\frac34\kappa^{4/3}
$$

と求める。上端が $8\kappa_0$ であることから

$$
K=\frac{3A\kappa_0}{2}(1-8^{-2/3})
=\frac{3A\kappa_0}{2}\left(1-\frac14\right)
=\frac98A\kappa_0,
$$

$$
D=2\nu A\kappa_0^{5/3}\frac34
\left[(8\kappa_0)^{4/3}-\kappa_0^{4/3}\right]
=\frac32\nu A\kappa_0^3(16-1)
=\frac{45}{2}\nu A\kappa_0^3.
$$

$K$ の単位は m$^2$/s$^2$、$D$ は m$^2$/s$^3$ となる。
<!-- solution-end -->

#### B4. $-5/3$ 則は何を証明するか
- Level: B

次元 $[E]=L^3T^{-2}$、$[\varepsilon]=L^2T^{-3}$、$[\kappa]=L^{-1}$ とする。$E=C\varepsilon^a\kappa^b$ の $a,b$ を導け。また、合成データがこの指数を満たすだけで $\Pi(\kappa)=\varepsilon$ を示せるか。

<!-- solution-start -->
#### 詳細解答

時間の次元は $-3a=-2$ なので $a=2/3$。長さの次元は $2a-b=3$、従って $b=4/3-3=-5/3$ である。これは[次元仮説の帰結](#prop-fluid39-k41-scaling)の計算にすぎない。

スペクトル $E$ はモードの**二乗振幅**を表す。一方、[$\Pi$ の定義](#def-fluid39-spectral-flux)には非線形項 $\widehat{\boldsymbol v\cdot\nabla\boldsymbol v}$ と速度係数との相関が必要で、モード間の位相・三次相関に依存する。$E$ だけでは一般に決まらず、合成した $-5/3$ 傾きから一定フラックスを証明することはできない。
<!-- solution-end -->

### Level C

#### C1. エネルギーが大きい帯域と散逸が大きい帯域
- Level: C

第5節の合成スペクトル $\kappa_0=1$ m$^{-1}$、$\kappa_1=8$ m$^{-1}$、$A=3$ m$^3$/s$^2$、$\nu=0.01$ m$^2$/s を使う。(i) 全エネルギーと散逸診断量を求める。(ii) 境界 $\kappa_*=\sqrt8$ m$^{-1}$ 以下に含まれる各量の割合を求める。(iii) なぜこの計算では実乱流の前方カスケードを確認できないか、定義から説明せよ。

<!-- solution-start -->
#### 詳細解答

(i) [スペクトル積分](#prop-fluid39-spectral-dissipation)の形で、$E=A\kappa_0^{5/3}\kappa^{-5/3}$ を代入する。原始関数 $\int\kappa^{-5/3}d\kappa=-(3/2)\kappa^{-2/3}$、$\int\kappa^{1/3}d\kappa=(3/4)\kappa^{4/3}$ を使って端点を評価すると

$$
K=\frac{3A\kappa_0}{2}\left(1-8^{-2/3}\right)
=\frac{9}{2}\left(1-\frac14\right)
=3.375\ {\rm m^2/s^2},
$$

$$
D=\frac{3\nu A\kappa_0^3}{2}(8^{4/3}-1)
=\frac{3(0.01)(3)}{2}(16-1)
=0.675\ {\rm m^2/s^3}.
$$

(ii) $\kappa_*/\kappa_0=\sqrt8$ である。$(\sqrt8)^{-2/3}=8^{-1/3}=1/2$ だから、低波数側のエネルギー割合は

$$
\frac{1-(\kappa_*/\kappa_0)^{-2/3}}{1-8^{-2/3}}
=\frac{1-1/2}{1-1/4}=\frac23.
$$

散逸診断量の割合は $(\sqrt8)^{4/3}=8^{2/3}=4$ より

$$
\frac{(\kappa_*/\kappa_0)^{4/3}-1}{8^{4/3}-1}
=\frac{4-1}{16-1}=\frac15.
$$

従って低波数側はエネルギー全体の $2/3$ を含む一方、散逸診断量の $1/5$ だけを含む。

(iii) 指定されたのは非負の $E_{\rm syn}(\kappa)$ と粘度だけであり、時間発展する発散ゼロ速度の Fourier 係数や、その**三次非線形相関**は与えられていない。したがって[非線形フラックス](#def-fluid39-spectral-flux)の $T_{\boldsymbol n}$ と $\Pi$ を計算できない。傾きが $-5/3$ である事実と、前方移送の存在・定常性は論理的に異なる。この実験は積分の検算であって DNS、測定、K41 の実証ではない。
<!-- solution-end -->

## 7. 次へつながる問い

乱流エネルギーの収支では、平均剪断の仕事、場所を横切る輸送、非負の粘性散逸を区別できた。周期領域の Fourier 表示では、非線形相互作用は**全エネルギーを作らず**波数間でやり取りし、粘性は高波数に $\kappa^2$ の重みで作用する。K41 はその上に置く**条件付きの統計仮説**である。

次の FLUID40 では、壁があることで一様性・等方性が破れたときに、摩擦速度・壁座標・対数速度則をどの範囲で使えるかを調べる。
