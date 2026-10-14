# HA11 Fourier restrictionとKakeyaへの入口

[FOU3のFourier変換](../../FOU/FOU3/index.md#def-fou3-fourier-transform)は空間全体の周波数を記録し、[HA10の球面測度のFourier減衰](../HA10/index.md#thm-ha10-sphere)は曲率のある曲面で振動が相殺されることを示しました。では、周波数を球面の上だけで観測したい場合はどうでしょうか。

一般の $L^2(\mathbb R^d)$ 関数のFourier変換は、測度零の球面上では値が定まりません。**球面への制限を単純な点値代入として定義できない**のが出発点です。代わりに、十分積分可能な関数では制限が意味を持ち、双対的には球面上のデータから空間全体へ波を重ね合わせることができます。曲率がどこで効くか、必要な指数をなぜ幾何学から読み取れるかを順に証明します。

以下 $d\ge2$、$S=S^{d-1}$ は単位球面、$\sigma$ は[HA10で定義した球面面積測度](../HA10/index.md#def-ha10-sphere-measure)です。Fourier変換の正規化は

$$
\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx,\qquad
f(x)=(2\pi)^{-d}\int_{\mathbb R^d}e^{ix\cdot\xi}\widehat f(\xi)\,d\xi
$$

とします。計算は最初 $f,g$ を滑らかな関数として行い、最後にノルム評価を使って適切な空間へ拡張します。

## 1. 制限と拡張はどのような作用素か

$L^2$ 関数は零集合上の値を変更しても同一視されます。球面は $d$ 次元Lebesgue測度では零集合なので、$\widehat f$ の $L^2$ 同値類から $\widehat f|_S$ を直接取り出すことはできません。そこで、まずSchwartz関数について定義し、後で制限写像のノルム評価によって一意に延長します。

<a id="def-ha11-restriction"></a>
<!-- formal-statement-start -->
> **定義（球面へのFourier制限）**  
> $f\in\mathcal S(\mathbb R^d)$ について、球面へのFourier制限作用素 $R$ を
>
$$
Rf(\omega)=\widehat f(\omega),\qquad \omega\in S
$$
>
> で定める。$\mathcal S$ は全ての導関数が任意の多項式より速く減衰するSchwartz関数の空間である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha11-restriction -->
**定義の確認**　$f(x)=e^{-|x|^2/2}$ では座標ごとの積に分け、[FOU3のGauss関数のFourier変換](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を各変数へ適用すると、

$$
\widehat f(\xi)=(2\pi)^{d/2}e^{-|\xi|^2/2},\qquad
Rf(\omega)=(2\pi)^{d/2}e^{-1/2}.
$$

これは滑らかな関数なので点値が使えます。反対に $\widehat f$ の同値類の球面上の値だけを別の数へ変更しても $L^2(\mathbb R^d)$ 関数は変化しません。後者は点値による制限が $L^2$ 全体では未定義であることを示します。
<!-- definition-example-end -->

球面上の振幅 $g$ を与え、それぞれの方向 $\omega$ の波 $e^{ix\cdot\omega}$ を足した関数も考えます。球面の測度は有限なので、[Cauchy–Schwarzの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)を $|g|$ と定数関数1に適用して

$$
\int_S|g|\,d\sigma\le\sigma(S)^{1/2}\left(\int_S|g|^2\,d\sigma\right)^{1/2}<\infty
$$

となり、$g\in L^2(S)$ なら $g\in L^1(S)$ です。

<a id="def-ha11-extension"></a>
<!-- formal-statement-start -->
> **定義（球面Fourier拡張）**  
> $g\in L^2(S,d\sigma)$ に対して、球面Fourier拡張作用素 $E$ を
>
$$
Eg(x)=\int_S e^{ix\cdot\omega}g(\omega)\,d\sigma(\omega),
\qquad x\in\mathbb R^d
$$
>
> で定める。積分は各 $x$ で絶対収束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha11-extension -->
**定義の確認**　$g=1$ とすると $Eg(x)=\widehat\sigma(-x)$ です。面積測度は反転に関して対称なので、[HA10の球面減衰](../HA10/index.md#thm-ha10-sphere)から

$$
|E1(x)|\le C_d(1+|x|)^{-(d-1)/2}
$$

を得ます。ただしこれは一つの特別な $g$ に対する評価であって、任意の $L^2(S)$ 振幅について同じ点ごとの減衰を主張するものではありません。
<!-- definition-example-end -->

$R$ と $E$ は対になる作用素です。$f\in\mathcal S(\mathbb R^d)$、$g\in L^2(S)$ について、$f\in L^1$ と $g\in L^1(S)$ なので積分の絶対値は $\|f\|_1\|g\|_{L^1(S)}<\infty$ です。ゆえに[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用できます。

$$
\begin{aligned}
\int_{\mathbb R^d}f(x)\overline{Eg(x)}\,dx
&=\int_S\left(\int_{\mathbb R^d}f(x)e^{-ix\cdot\omega}\,dx\right)
\overline{g(\omega)}\,d\sigma(\omega)\\
&=\int_S Rf(\omega)\overline{g(\omega)}\,d\sigma(\omega).
\end{aligned}
$$

<a id="prop-ha11-duality"></a>
<!-- formal-statement-start -->
> **命題（制限と拡張の双対性）**  
> $1<p<2$、$p'=p/(p-1)$ とする。$R$ がSchwartz関数について
>
$$
\|Rf\|_{L^2(S)}\le C\|f\|_{L^p(\mathbb R^d)}
$$
>
> を満たすことと、$E$ が
>
$$
\|Eg\|_{L^{p'}(\mathbb R^d)}\le C\|g\|_{L^2(S)}
$$
>
> を満たすことは同値である。前者の成立時には $R$ は $L^p$ 全体へ一意に有界延長される。
<!-- formal-statement-end -->

### 証明の見取り図

積分恒等式と $L^p$ の双対性を両方向で使います。制限を $L^p$ に広げる順序は、「定義してから評価」ではなく「稠密集合上で評価してから延長」です。

<!-- proof-start -->
### 証明

前者を仮定し、任意の $g\in L^2(S)$ を固定します。上の積分恒等式より

$$
|\langle f,Eg\rangle|
=|\langle Rf,g\rangle|
\le C\|f\|_p\|g\|_2.
$$

[MT7の稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)と[ $L^p$ 双対定理](../../MT/MT7/index.md#thm-mt7-lp-duality)により、$f\mapsto\langle f,Eg\rangle$ は $L^p$ 上の連続汎関数へ延び、$Eg$ を表す $L^{p'}$ 関数とそのノルム評価が従います。Schwartz関数による積分の表示と比較すれば、この関数は元の $Eg$ にほとんど至る所で一致します。逆向きは $Rf\in L^2(S)$ のHilbert空間の双対ノルム表示を使い、

$$
\|Rf\|_2=\sup_{\|g\|_2\le1}|\langle Rf,g\rangle|
=\sup_{\|g\|_2\le1}|\langle f,Eg\rangle|
\le C\|f\|_p
$$

とすればよいです。最後に $L^p$ でCauchyなSchwartz列に対応する制限像も $L^2(S)$ でCauchyとなるため、極限を取れば一意な延長が得られます。
<!-- proof-end -->

## 2. 球面の曲率から必要指数を見付ける：Knappの例

球面の北極付近は $d-1$ 変数 $u$ を使って

$$
\omega(u)=(u,\sqrt{1-|u|^2}),\qquad
d\sigma(\omega(u))=(1-|u|^2)^{-1/2}\,du
$$

と書けます。面積要素はグラフ $x_d=h(u)=\sqrt{1-|u|^2}$ の接ベクトル $\partial_{u_j}(u,h(u))=(e_j,\partial_{u_j}h)$ から求まります。[HA10の面積要素の構成](../HA10/index.md#ref-ha10-area-element)を使うと、Gram行列は $G=I_{d-1}+(\nabla h)(\nabla h)^\mathsf T$ であり、$\det G=1+|\nabla h|^2$。ここで $\nabla h=-u/\sqrt{1-|u|^2}$ なので

$$
\sqrt{\det G}=\sqrt{1+\frac{|u|^2}{1-|u|^2}}=(1-|u|^2)^{-1/2}.
$$

この因子が先ほどの $d\sigma$ と対応します。小さい $\delta>0$ に対し $|u|\le\delta$ の部分を**角半径 $\delta$ のcap**（球面上の小領域）と呼びます。

このcap上では $\sqrt{1-|u|^2}=1-|u|^2/2+O(|u|^4)$ です。したがって、$Eg(x)$ の位相から共通因子 $e^{ix_d}$ を除いた残りは

$$
x\cdot(\omega(u)-e_d)
=x'\cdot u+x_d\bigl(\sqrt{1-|u|^2}-1\bigr)
$$

です。$|x'|\lesssim\delta^{-1}$、$|x_d|\lesssim\delta^{-2}$ なら、この位相はcap全体でほぼ一定です。二次曲率のため、横方向の幅は $\delta^{-1}$、長手方向の長さは $\delta^{-2}$ と異なります。

<a id="def-ha11-cap-tube"></a>
<!-- formal-statement-start -->
> **定義（capと対応するtube）**  
> $0<\delta<1/10$ に対し、北極capとその観測tubeを
>
$$
\Theta_\delta=\{\omega(u):|u|\le\delta\},\qquad
\mathcal T_\delta=\{(x',x_d):|x'|\le c\delta^{-1},\quad |x_d|\le c\delta^{-2}\}
$$
>
> と定める。ただし $c>0$ は次の位相評価を満たす十分小さい固定定数とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha11-cap-tube -->
**定義の確認**　$d=3$ ならcap面積は $\asymp\delta^2$ で、tubeの体積は「半径 $\delta^{-1}$ の円盤 × 長さ $\delta^{-2}$」により $\asymp\delta^{-4}$ です。各点で $|x'\cdot u|\le c$、また

$$
\left|\sqrt{1-|u|^2}-1\right|
=\frac{|u|^2}{1+\sqrt{1-|u|^2}}\le |u|^2
$$

なので $|x_d(\sqrt{1-|u|^2}-1)|\le c$。$c$ を例えば $1/20$ とすれば位相変動は $1/10$ 以下です。
<!-- definition-example-end -->

<a id="prop-ha11-knapp"></a>
<!-- formal-statement-start -->
> **命題（Knapp型の必要条件）**  
> $d\ge2$ とし、ある有限定数 $C$ について全 $g\in L^2(S)$ で
>
$$
\|Eg\|_{L^q(\mathbb R^d)}\le C\|g\|_{L^2(S)},\qquad 2\le q<\infty
$$
>
> が成り立つなら、必ず
>
$$
q\ge q_c:=\frac{2(d+1)}{d-1}
$$
>
> が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

cap上で値1の $g$ を選び、対応するtube内で波が打ち消されないことを示します。入力の球面面積と出力のtube体積で $\delta$ の冪を比較します。

<!-- proof-start -->
### 証明

$g_\delta=\boldsymbol1_{\Theta_\delta}$ とします。面積Jacobianは $|u|\le\delta$ で1と定数倍の間にあるため、

$$
c_d\delta^{d-1}\le\sigma(\Theta_\delta)
\le C_d\delta^{d-1},\qquad
\|g_\delta\|_2=\sigma(\Theta_\delta)^{1/2}\asymp\delta^{(d-1)/2}.
$$

$x\in\mathcal T_\delta$ では上で確認した位相差は絶対値 $1/10$ 以下です。$e^{-ix_d}Eg_\delta(x)$ の実部を取ると

$$
\operatorname{Re}(e^{-ix_d}Eg_\delta(x))
=\int_{\Theta_\delta}\cos(x\cdot(\omega-e_d))\,d\sigma(\omega)
\ge \cos(1/10)\sigma(\Theta_\delta).
$$

tube体積は二つの方向の幅から

$$
|\mathcal T_\delta|\asymp
(\delta^{-1})^{d-1}\delta^{-2}
=\delta^{-(d+1)}.
$$

ゆえに

$$
\|Eg_\delta\|_q
\ge c_d\,\delta^{d-1}|\mathcal T_\delta|^{1/q}
\ge c_{d,q}\delta^{d-1-(d+1)/q}.
$$

仮定の評価と比較して

$$
\delta^{d-1-(d+1)/q}\lesssim \delta^{(d-1)/2}
$$

が全ての十分小さい $\delta$ で成り立つには、左辺の指数が右辺以上、すなわち $(d-1)/2-(d+1)/q\ge0$ でなければなりません。これが必要条件です。
<!-- proof-end -->

必要条件は十分条件ではありません。次節では臨界指数 $q_c$ で**実際に**評価が成立することを示します。

## 3. 球面制限の核心：$TT^*$ と複素補間

$E$ は双対的には $R^*$ です。滑らかな $f$ について

$$
ERf(x)=\int_S e^{ix\cdot\omega}\widehat f(\omega)\,d\sigma(\omega)
=\int_{\mathbb R^d}\widecheck\sigma(x-y)f(y)\,dy
$$

と書けます。ただし $\widecheck\sigma(x)=\int_S e^{ix\cdot\omega}\,d\sigma(\omega)$ と記します。[HA10の球面減衰](../HA10/index.md#thm-ha10-sphere)によって核は遠方で $|x|^{-(d-1)/2}$ 程度ですが、減衰をそのままYoungの不等式に入れるだけでは臨界の $L^p\to L^{p'}$ 評価を得られません。

ここでは球面を半径方向に厚くした関数から、球面に集中する分布へ連続的に移る**解析族**を構成します。この発想は[三線定理](../HA2/index.md#lem-ha2-three-lines)を使うHA2の補間と共通ですが、ここでは作用素自体が複素パラメータで動きます。

### 3.1 球面測度に近付く解析族

Gamma関数を正の実部では $\Gamma(w)=\int_0^\infty e^{-t}t^{w-1}\,dt$ で定め、$\Gamma(w+1)=w\Gamma(w)$ で解析接続します。後で使うのは $\Gamma(w)$ が零点を持たず、$1/\Gamma(w)$ が整関数であること、および反射公式 $\Gamma(w)\Gamma(1-w)=\pi/\sin(\pi w)$ です。$s_+=\max(s,0)$ と書きます。

球面へ集中する極限は、通常の関数としての収束では記述できません。そこで、**分布**を「試験関数 $\varphi\in C_c^\infty(\mathbb R^d)$ を入力して数 $\langle M,\varphi\rangle$ を返す連続線形汎関数」として使います。例えば球面測度は $\langle d\sigma,\varphi\rangle=\int_S\varphi\,d\sigma$、Dirac分布は $\langle\delta_0,\psi\rangle=\psi(0)$ です。分布の等式は、すべての試験関数に作用させた結果が一致することを意味します。$z$ に関して**解析的な分布族**とは、各試験関数への作用 $z\mapsto\langle M_z,\varphi\rangle$ が正則な族です。後で示す $M_z$ は台が単位閉球に含まれるため、Schwartz関数 $\widehat f$ を掛けても分布として定義でき、逆Fourier変換によって $T_zf$ を作れます。

<a id="def-ha11-analytic-family"></a>
<!-- formal-statement-start -->
> **定義（球面集中型の解析族）**  
> $\operatorname{Re}z>-1$ では
>
$$
M_z(\xi)=\frac{(1-|\xi|^2)_+^z}{\Gamma(z+1)}
$$
>
> を局所可積分関数として定義する。その分布としての解析接続を同じ記号で表し、Schwartz関数 $f$ に対し
>
$$
T_zf=\mathcal F^{-1}(M_z\widehat f)
$$
>
> と置く。解析接続した積 $M_z\widehat f$ は緩増加分布として解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha11-analytic-family -->
**定義の確認**　$z=0$ では $M_0=\boldsymbol1_{\{|\xi|<1\}}$ であり、$T_0$ は球内への周波数射影です。$z=-1$ では下で示すように $M_{-1}=\delta(1-|\xi|^2)$ であり、球面上の積分に切り替わります。この二つの対象が同一の族につながることが構成の目的です。$z=0$ は通常の可積分関数であり、$z=-1$ の解釈では、点値でなく試験関数への作用 $\langle M_{-1},\varphi\rangle$ を調べる必要があります。
<!-- definition-example-end -->

<a id="lem-ha11-distribution"></a>
<!-- formal-statement-start -->
> **補題（解析接続と球面集中）**  
> $z\mapsto M_z$ はコンパクト台を持つ分布に値を取る整関数族へ一意に延長され、$z=-1$ で
>
$$
\langle M_{-1},\varphi\rangle
=\frac12\int_S\varphi(\omega)\,d\sigma(\omega),
\qquad \varphi\in C_c^\infty(\mathbb R^d)
$$
>
> を満たす。したがってSchwartz関数 $f$ について
>
$$
T_{-1}f=\frac{1}{2(2\pi)^d}ERf.
$$
<!-- formal-statement-end -->

### 証明の見取り図

半径方向に $s=1-r^2$ と変数変換すれば、一次元分布 $s_+^z/\Gamma(z+1)$ の問題になります。$z\to-1$ の極限は点 $s=0$ での評価、すなわちDirac測度です。

<!-- proof-start -->
### 証明

一次元で $\psi\in C_c^\infty(\mathbb R)$ とし、$\operatorname{Re}z>-1$ なら

$$
F_z(\psi)=\frac1{\Gamma(z+1)}
\int_0^\infty s^z\psi(s)\,ds
$$

を考えます。境界項が消える範囲で部分積分すると

$$
F_z(\psi)=-\frac1{\Gamma(z+2)}
\int_0^\infty s^{z+1}\psi'(s)\,ds.
$$

右辺は $\operatorname{Re}z>-2$ に正則に延長され、$z=-1$ に代入すれば

$$
F_{-1}(\psi)=-\int_0^\infty\psi'(s)\,ds=\psi(0).
$$

同じ操作を繰り返すと任意の左半平面へ延長でき、定義が重なる範囲で一致するため整関数族となります。極座標を使うと

$$
\begin{aligned}
\langle M_z,\varphi\rangle
&=\frac1{\Gamma(z+1)}
\int_0^1r^{d-1}(1-r^2)^z
\left(\int_S\varphi(r\omega)\,d\sigma(\omega)\right)dr\\
&=\frac1{2\Gamma(z+1)}
\int_0^1s^z(1-s)^{(d-2)/2}
\left(\int_S\varphi(\sqrt{1-s}\,\omega)\,d\sigma(\omega)\right)ds.
\end{aligned}
$$

$s=1$ の項は滑らかな分割によって $s=0$ の近傍と分離でき、そこでの関数は $z=-1$ に正則です。$s=0$ 近傍に一次元の結論を適用すると、極限は $(1/2)\int_S\varphi\,d\sigma$ になります。Fourier反転の $(2\pi)^{-d}$ を掛ければ最後の等式です。
<!-- proof-end -->

### 3.2 解析族の二つの端点評価

複素指数の核を評価するときは、半径積分をBessel関数の級数へ書き換えると、Gamma関数と微分方程式だけで必要な一様評価を証明できます。

<a id="lem-ha11-kernel"></a>
<!-- formal-statement-start -->
> **補題（解析族の端点評価）**  
> $a=(d+1)/2$ と置く。任意の実数 $t$ について、$\operatorname{Re}z=0$ の直線では
>
$$
\|T_{it}f\|_2\le C e^{C(1+t^2)}\|f\|_2,
$$
>
> また $\operatorname{Re}z=-a$ の直線では
>
$$
\|T_{-a+it}f\|_\infty
\le C e^{C(1+t^2)}\|f\|_1.
$$
>
> 定数 $C$ は次元 $d$ のみに依存する。後者は最初Schwartz関数について解釈し、核表示により $L^1$ へ延長する。
<!-- formal-statement-end -->

### 証明の見取り図

最初の直線では乗数の絶対値を測り、[HA9の$L^2$乗数評価](../HA9/index.md#prop-ha9-l2)を使います。もう一方では核のBessel関数表示を導出し、Bessel関数が満たす二階微分方程式を級数から導き、積分方程式へ直して上界を示します。複素パラメータ $t$ の定数が増加しても、次の補間でGaussian因子によって抑えられます。

<!-- proof-start -->
### 証明

$z=it$ では $|1-|\xi|^2|^{it}=1$（$|\xi|<1$）なので

$$
|M_{it}(\xi)|\le|\Gamma(1+it)|^{-1}.
$$

[HA9の$L^2$乗数評価](../HA9/index.md#prop-ha9-l2)から

$$
\|T_{it}f\|_2\le|\Gamma(1+it)|^{-1}\|f\|_2.
$$

Gammaの反射公式と漸化式により

$$
|\Gamma(1+it)|^2=\frac{\pi|t|}{\sinh(\pi|t|)}
$$

（$t=0$ では連続的に1）なので、右辺の逆平方根は $Ce^{C|t|}$ 以下です。

次に $K_z=\mathcal F^{-1}M_z$ を計算します。$\operatorname{Re}z>-1$ では極座標と指数関数の偶数次項の球面積分を使い、

$$
\int_S(\omega\cdot e_1)^{2k}\,d\sigma(\omega)
=\frac{2\pi^{d/2}(2k)!}{4^k k!\,\Gamma(k+d/2)}
$$

を得ます。係数の由来を確かめます。$u=\omega\cdot e_1\in(-1,1)$ とし、緯度の断面を積分すると、$d=2$ の場合も $S^0$ を2点の測度として扱って

$$
\begin{aligned}
\int_S(\omega\cdot e_1)^{2k}\,d\sigma
&=\sigma(S^{d-2})\int_{-1}^1u^{2k}(1-u^2)^{(d-3)/2}\,du\\
&=\frac{2\pi^{(d-1)/2}}{\Gamma((d-1)/2)}
\frac{\Gamma(k+1/2)\Gamma((d-1)/2)}{\Gamma(k+d/2)}.
\end{aligned}
$$

ここでは $v=u^2$ でBeta積分へ変換しました。$\Gamma(k+1/2)=\sqrt\pi\,(2k)!/(4^k k!)$ を代入すると上記の球面モーメントになります。また $e^{ir\omega\cdot x/|x|}$ の奇数次の項は対称性で零、偶数次項は $(-1)^k(r|x|)^{2k}/(2k)!$ なので、球面モーメントと分母の $(2k)!$ が相殺されます。さらに $s=r^2$ を用いると

$$
\int_0^1r^{d-1+2k}(1-r^2)^z\,dr
=\frac{\Gamma(k+d/2)\Gamma(z+1)}
{2\Gamma(k+d/2+z+1)}.
$$

したがって指数関数の級数を項別積分し、$\nu=d/2+z$ と置くと

$$
K_z(x)=\frac{\pi^{d/2}}{(2\pi)^d}
\sum_{k=0}^\infty
\frac{(-1)^k(|x|^2/4)^k}{k!\,\Gamma(k+\nu+1)}.
$$

この級数が任意の $z$ に整関数として延長されるので、分布の解析接続と一致します。Bessel関数を同じ級数により

$$
J_\nu(r)=\sum_{k=0}^\infty
\frac{(-1)^k(r/2)^{2k+\nu}}{k!\Gamma(k+\nu+1)}
$$

と定義すれば、$r=|x|>0$ で

$$
K_z(x)=\frac{\pi^{d/2}}{(2\pi)^d}
(2/r)^\nu J_\nu(r).
$$

$z=-a+it$ では $\nu=-1/2+it$ です。$0\le r\le1$ について、Gammaの漸化式と

$$
|\Gamma(1/2+it)|^2=\frac{\pi}{\cosh(\pi t)}
$$

を使えば

$$
|\Gamma(k+1/2+it)|^{-1}
\le \frac{C e^{\pi|t|/2}}{\Gamma(k+1/2)}.
$$

従って上の級数は $|K_z(r)|\le Ce^{C|t|}$ を与えます。級数を一回項別微分した値も $r=1$ で同様に抑えられます。

$r\ge1$ の評価を示します。級数の $r^{2k+\nu}$ の係数を $c_k=(-1)^k2^{-2k-\nu}/(k!\Gamma(k+\nu+1))$ とします。$r^2J_\nu''+rJ_\nu'-\nu^2J_\nu$ による第 $k$ 項の係数は

$$
((2k+\nu)^2-\nu^2)c_k=4k(k+\nu)c_k=-c_{k-1}\quad(k\ge1)
$$

です（$k=0$ なら零）。これは $r^2J_\nu$ の一つ前の項と打ち消し合うので

$$
r^2J_\nu''+rJ_\nu'+(r^2-\nu^2)J_\nu=0
$$

が分かります。$y(r)=r^{1/2}J_\nu(r)$ と置くと

$$
y''(r)+y(r)=\frac{\nu^2-1/4}{r^2}y(r).
$$

初期値 $y(1),y'(1)$ は先の級数評価で $Ce^{C|t|}$ 以下です。定数係数方程式の解を使って

$$
y(r)=y(1)\cos(r-1)+y'(1)\sin(r-1)
+(\nu^2-1/4)\int_1^r\frac{\sin(r-s)}{s^2}y(s)\,ds.
$$

右辺の絶対値を取り、$B=|y(1)|+|y'(1)|$、$A=|\nu^2-1/4|$、$H(r)=B+A\int_1^r s^{-2}|y(s)|\,ds$ と置きます。$|y(r)|\le H(r)$ と $H'(r)\le Ar^{-2}H(r)$ から $H(r)\le B\exp(A\int_1^r s^{-2}ds)$ なので

$$
|y(r)|\le Ce^{C|t|}
\exp\left((|t|+t^2)\int_1^\infty s^{-2}ds\right)
\le Ce^{C(1+t^2)}.
$$

従って $|J_\nu(r)|\le Ce^{C(1+t^2)}r^{-1/2}$ です。$\operatorname{Re}\nu=-1/2$ より $|(2/r)^\nu|=(r/2)^{1/2}$ だから

$$
\sup_{r\ge1}|(2/r)^\nu J_\nu(r)|\le Ce^{C(1+t^2)}.
$$

小さい $r$ の評価と合わせて $\|K_{-a+it}\|_\infty\le Ce^{C(1+t^2)}$。$T_zf=K_z*f$ なので絶対値を積分すれば $L^1\to L^\infty$ の結論です。
<!-- proof-end -->

ここまでの計算では、球面を半径方向に集中させると、実部0では $L^2$ の射影、実部 $-(d+1)/2$ では有界な畳込み核になることを証明しました。二つの端点の間の実部 $-1$ が球面に対応します。

<a id="thm-ha11-stein-tomas"></a>
<!-- formal-statement-start -->
> **定理（球面のStein–Tomas型restriction・extension）**  
> $d\ge2$ とし、$S^{d-1}$ に標準面積測度を入れる。指数
>
$$
p_c=\frac{2(d+1)}{d+3},\qquad
q_c=\frac{2(d+1)}{d-1},\qquad
\frac1{p_c}+\frac1{q_c}=1
$$
>
> に対して定数 $C_d<\infty$ が存在し、すべての $f\in\mathcal S(\mathbb R^d)$ と $g\in L^2(S)$ に対し
>
$$
\|Rf\|_{L^2(S)}\le C_d\|f\|_{L^{p_c}(\mathbb R^d)},\qquad
\|Eg\|_{L^{q_c}(\mathbb R^d)}
\le C_d\|g\|_{L^2(S)}
$$
>
> が成立する。前者の $R$ は有界性によって $L^{p_c}$ 全体へ一意に延長される。
<!-- formal-statement-end -->

### 証明の見取り図

[解析族の端点補題](#lem-ha11-kernel)を複素補間します。球面に当たる $z=-1$ が二直線の間のどこにあるかで指数が決まります。その $T_{-1}$ の二次形式は[球面集中補題](#lem-ha11-distribution)で $\|Rf\|_2^2$ と一致します。これがいわゆる $TT^*$ の核心です。

<!-- proof-start -->
### 証明

$a=(d+1)/2$ とし、幅 $a$ の帯 $-a\le\operatorname{Re}z\le0$ を考えます。両端での作用素評価は[端点補題](#lem-ha11-kernel)により成立しますが、定数が $e^{Ct^2}$ のように増加します。$A>C$ を十分大きく取って

$$
\widetilde T_z=e^{A(z+1)^2}T_z
$$

とすれば、各端点直線 $z=b+it$ における因子の絶対値は

$$
|e^{A(z+1)^2}|=e^{A((b+1)^2-t^2)}
$$

です。したがって $\widetilde T_z$ の $L^2\to L^2$、$L^1\to L^\infty$ 端点ノルムはそれぞれ $t$ に一様に有界になります。しかも $\widetilde T_{-1}=T_{-1}$ です。

ここで $w=-z/a$ と取り、$w=0$ を $L^2\to L^2$、$w=1$ を $L^1\to L^\infty$ の端点へ対応させます。$K_z$ の級数は有限の $x$ と $z$ のコンパクト集合上で正規収束するので、コンパクト台の有界関数 $u,v$ に対する $\langle T_z u,v\rangle=\iint K_z(x-y)u(y)\overline{v(x)}\,dy\,dx$ は $z$ に正則です。これにより、以下の補間用単関数から作る補助関数に[三線定理](../HA2/index.md#lem-ha2-three-lines)を適用するための解析性を確認できます。$\theta=1/a=2/(d+1)$ とすると $z=-1$ は $w=\theta$ です。補間指数は

$$
\frac1p=\frac{1-\theta}{2}+\theta
=\frac{d+3}{2(d+1)},\qquad
\frac1q=\frac{1-\theta}{2}
=\frac{d-1}{2(d+1)}.
$$

複素補間を適用する手順も確かめます。まずSchwartz関数 $f,h$ を、それぞれ台上で絶対値が正の有限個の値を取り、台が有限測度に含まれる単純関数で $L^p$ 近似し、$\|f\|_p=\|h\|_p=1$ と規格化します。零集合上は次の $f_w,h_w$ を0と定めます（[MT7の単関数稠密性](../../MT/MT7/index.md#thm-mt7-simple-dense)）。複素指数を

$$
f_w=e^{i\arg f}|f|^{p((1-w)/2+w)},\qquad
h_w=e^{i\arg h}|h|^{p((1-w)/2+w)}
$$

と置きます。$\operatorname{Re}w=0$ では二つの $L^2$ ノルムが1、$\operatorname{Re}w=1$ では二つの $L^1$ ノルムが1です。解析的なスカラー関数

$$
\Phi(w)=\int_{\mathbb R^d}
(\widetilde T_{-aw}f_w)(x)\overline{h_{\bar w}(x)}\,dx
$$

を考えます（$h_{\bar w}$ の複素共役によって $w$ に関して解析的になります）。[端点評価](#lem-ha11-kernel)を境界直線上の $\Phi$ へ適用します。どちらの直線でも絶対値は定数以下なので、[三線定理](../HA2/index.md#lem-ha2-three-lines)から $|\Phi(\theta)|\le C_d$。正規化と単純関数近似を外すと

$$
\|T_{-1}f\|_{p'}\le C_d\|f\|_p,
\qquad p=p_c,\quad p'=q_c.
$$

ここで $\widetilde T_{-1}=T_{-1}$、$f_\theta=f$、$h_\theta=h$ を使いました。解析接続と三線補題を単純関数から一般の関数へ移す際は、有限台・有限値で近似し、上の一様評価と $L^p$ の完備性で極限を取ります。

最後に[球面集中補題](#lem-ha11-distribution)を代入します。$T_{-1}=(2(2\pi)^d)^{-1}ER$ なので

$$
\begin{aligned}
\|Rf\|_{L^2(S)}^2
&=2(2\pi)^d\int_{\mathbb R^d}(T_{-1}f)(x)\overline{f(x)}\,dx\\
&\le 2(2\pi)^d\|T_{-1}f\|_{q_c}\|f\|_{p_c}\\
&\le C_d\|f\|_{p_c}^2.
\end{aligned}
$$

最初の等式は、$f\in\mathcal S$ に対して[制限と拡張の双対性](#prop-ha11-duality)と[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)で積分を交換すると $\langle ERf,f\rangle=\langle Rf,Rf\rangle$ となることから従い、$T_{-1}f$ を先に $L^2$ 関数と仮定しているわけではありません。平方根を取ってrestriction評価を得、[双対命題](#prop-ha11-duality)からextension評価を得ます。
<!-- proof-end -->

**指数の検算**　$d=2$ では $(p_c,q_c)=(6/5,6)$、$d=3$ では $(p_c,q_c)=(4/3,4)$ です。[Knappの必要条件](#prop-ha11-knapp)が示した最小指数と一致しています。重要なのは、**減衰だけでは証明できなかった臨界指数の評価を、分布の解析族と補間で証明した**ことです。

## 4. スケールを変えると何が起こるか

定理は半径1の球面について述べました。半径 $\rho>0$ の球面 $S_\rho$ 上の面積測度 $\sigma_\rho$ を考えると、$\omega=\rho\eta$ によって $d\sigma_\rho(\rho\eta)=\rho^{d-1}d\sigma(\eta)$ となります。$g(\rho\eta)=h(\eta)$ と置けば

$$
E_\rho g(x)=\rho^{d-1}Eh(\rho x),\qquad
\|g\|_{L^2(S_\rho)}=\rho^{(d-1)/2}\|h\|_{L^2(S)}.
$$

一方 $x\mapsto\rho x$ によるLebesgue測度の変換から

$$
\|E_\rho g\|_{L^{q_c}(\mathbb R^d)}
\le C_d\,\rho^{(d-1)/2-d/q_c}
\|g\|_{L^2(S_\rho)}.
$$

この $\rho$ の冪が現れるので、球面の半径を変えたときに定数が無条件に同じとは言えません。

## 5. wave packetとKakeya幾何への接続

capを狭くした波は、対応する長いtube内で互いに位相が揃います。これが**wave packet（波束）**の最も簡単なモデルです。実際の波束分解では、空間窓と周波数窓を複数組み合わせ、重なりと誤差を定量化する必要があります。ここではその一般分解定理を仮定せず、cap一つに対する厳密な評価だけを用います。

半径 $R\gg1$ の大きな球を観測する場合、$\delta=R^{-1/2}$ と取ると、capの角幅 $R^{-1/2}$ に対応するtubeの横幅が $R^{1/2}$、長さが $R$ となります。capの中心を $e_d$ から別の単位ベクトル $\omega_0$ へ回転するとtubeの長手方向も $\omega_0$ に回転します。この**方向と長い細管の対応**がKakeya問題の解析的な入口です。

異なる方向の細管がどれだけ重なるかを扱うには、面積・体積だけでは足りません。細管の集まりの幾何的な制約を定量化することが必要になります。この接続の先は幾何学的測度論のKakeya・Besicovitch集合の章で扱います。本章の結果は球面の古典的な $L^2$ restriction 定理とKnapp必要条件までであり、一般のrestriction予想やKakeya予想を証明したものではありません。

**曲率がない場合との比較**　平面上の有界な開領域 $U\subset\mathbb R^{d-1}$ を、$(u,0)$ として $\mathbb R^d$ に埋め込み、$g\in C_c^\infty(U)$ を零でない関数とします。この曲面のextensionは

$$
E_{\mathrm{flat}}g(x',x_d)
=\int_U e^{ix'\cdot u}g(u)\,du
$$

で、$x_d$ に全く依存しません。$E_{\mathrm{flat}}g$ が零でない $x'$ の近傍を固定すると、$x_d$ 方向の積分が無限大になります。したがって有限の $q$ について一般に $E_{\mathrm{flat}}g\notin L^q(\mathbb R^d)$ です。球面の結論を曲率のない曲面へそのまま持ち込めない理由が、具体的に見えます。

## 6. 演習：定義・指数・証明の機構を自力で組み立てる

### Level A：制限の意味と幾何的尺度

<a id="ex-ha11-a01"></a>
**演習 HA11-A01（$L^2$ 点値制限の失敗）**  
- Level: A

$\chi\in C_c^\infty(\mathbb R)$ が $\chi(0)=1$ かつ $\operatorname{supp}\chi\subset[-1,1]$ を満たすとする。$n\ge2$ に対し $h_n(\xi)=\chi(n(|\xi|-1))$ と置く。$h_n\to0$ が $L^2(\mathbb R^d)$ で成立する一方、$h_n|_S=1$ であることを証明せよ。

<!-- solution-start -->
**詳細解答**　$h_n$ の台は $1-1/n\le|\xi|\le1+1/n$ の殻です。$\chi$ は有界なので、極座標より

$$
\|h_n\|_2^2\le\|\chi\|_\infty^2\sigma(S)
\int_{1-1/n}^{1+1/n}r^{d-1}\,dr
\le C_d\|\chi\|_\infty^2 n^{-1}\to0.
$$

一方 $|\omega|=1$ なら $n(|\omega|-1)=0$ なので $h_n(\omega)=\chi(0)=1$。$h_n$ は球面から離れた原点の近傍で零であり滑らかなコンパクト台関数なので、逆Fourier変換はSchwartz関数です。従ってこれはSchwartz関数のFourier像ですら、全空間の $L^2$ 収束が球面上の点値収束を保証しない例です。
<!-- solution-end -->

<a id="ex-ha11-a02"></a>
**演習 HA11-A02（双対性と定数）**  
- Level: A

$f\in\mathcal S(\mathbb R^d)$ とする。$\langle ERf,f\rangle=\|Rf\|_2^2$ を確かめ、[解析族の球面集中](#lem-ha11-distribution)を使って $T_{-1}$ の係数を求めよ。

<!-- solution-start -->
**詳細解答**　定義を展開し、$\int|f(x)|\,dx<\infty$、$\int_S|\widehat f(\omega)|\,d\sigma<\infty$ から[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用します。

$$
\begin{aligned}
\langle ERf,f\rangle
&=\int_{\mathbb R^d}\int_S
e^{ix\cdot\omega}\widehat f(\omega)\,d\sigma(\omega)\,
\overline{f(x)}\,dx\\
&=\int_S\widehat f(\omega)
\overline{\int_{\mathbb R^d}e^{-ix\cdot\omega}f(x)\,dx}\,d\sigma(\omega)\\
&=\int_S|\widehat f(\omega)|^2\,d\sigma(\omega).
\end{aligned}
$$

$M_{-1}=\tfrac12d\sigma$ をFourier側の乗数分布と解釈し、逆変換には $(2\pi)^{-d}$ が付くので $T_{-1}f=[2(2\pi)^d]^{-1}ERf$ です。従って $\|Rf\|_2^2=2(2\pi)^d\langle T_{-1}f,f\rangle$。
<!-- solution-end -->

<a id="ex-ha11-a03"></a>
**演習 HA11-A03（一次元の集中極限）**  
- Level: A

$\psi\in C_c^\infty(\mathbb R)$ に対して $\Gamma(z+1)^{-1}\int_0^\infty s^z\psi(s)\,ds$ が $z=-1$ で $\psi(0)$ へ延長されることを、積分を一回だけ部分積分して導け。

<!-- solution-start -->
**詳細解答**　最初 $\operatorname{Re}z>-1$ では原点の境界項は零です。$\Gamma(z+2)=(z+1)\Gamma(z+1)$ に注意すると

$$
\frac1{\Gamma(z+1)}\int_0^\infty s^z\psi(s)\,ds
=-\frac1{\Gamma(z+2)}\int_0^\infty s^{z+1}\psi'(s)\,ds.
$$

右辺は $\operatorname{Re}z>-2$ で絶対収束し、$z=-1$ を代入すると $-\int_0^\infty\psi'(s)\,ds=\psi(0)$。極限値は $\int\delta_0(s)\psi(s)\,ds$ と一致します。
<!-- solution-end -->

<a id="ex-ha11-a04"></a>
**演習 HA11-A04（$d=2$ のcapとtube）**  
- Level: A

$d=2$、cap角幅 $\delta$ の場合、cap測度、tube面積、波の位相変動の大きさを求め、$q\ge6$ が必要となる計算を再現せよ。

<!-- solution-start -->
**詳細解答**　$\omega(u)=(u,\sqrt{1-u^2})$ で $|u|\le\delta$ とすると、面積要素は $(1-u^2)^{-1/2}du$ なのでcap長は $\asymp\delta$ です。tubeは $|x_1|\le c\delta^{-1}$、$|x_2|\le c\delta^{-2}$ なので面積は $\asymp\delta^{-3}$。位相差は

$$
|x_1u+x_2(\sqrt{1-u^2}-1)|
\le c\delta^{-1}\delta+c\delta^{-2}\delta^2
=2c.
$$

$g=\boldsymbol1_{\Theta_\delta}$ では $\|g\|_2\asymp\delta^{1/2}$、$\|Eg\|_q\gtrsim\delta\delta^{-3/q}$。ゆえに $1-3/q\ge1/2$、すなわち $q\ge6$ です。
<!-- solution-end -->

<a id="ex-ha11-a05"></a>
**演習 HA11-A05（球面半径のスケーリング）**  
- Level: A

半径 $\rho$ の球面について $\|E_\rho g\|_q\le C\rho^{(d-1)/2-d/q}\|g\|_2$ を、単位球面上の同じ $q$ の評価から導け。

<!-- solution-start -->
**詳細解答**　$\omega=\rho\eta$、$h(\eta)=g(\rho\eta)$ とすれば

$$
E_\rho g(x)
=\rho^{d-1}\int_S e^{i(\rho x)\cdot\eta}h(\eta)\,d\sigma(\eta)
=\rho^{d-1}Eh(\rho x).
$$

$y=\rho x$ と置換すると $\|Eh(\rho\cdot)\|_q=\rho^{-d/q}\|Eh\|_q$。また

$$
\|g\|_{L^2(S_\rho)}^2
=\rho^{d-1}\int_S|h(\eta)|^2\,d\sigma(\eta)
=\rho^{d-1}\|h\|_2^2.
$$

従って、単位球面で $\|Eh\|_q\le C\|h\|_2$ が成り立つなら

$$
\|E_\rho g\|_q
=\rho^{d-1-d/q}\|Eh\|_q
\le C\rho^{(d-1)/2-d/q}\|g\|_{L^2(S_\rho)}.
$$

出力側の変数変換と入力側の面積要素の冪が両方必要です。
<!-- solution-end -->

### Level B：解析族と曲率を検算する

<a id="ex-ha11-b01"></a>
**演習 HA11-B01（核の原点と級数）**  
- Level: B

$\operatorname{Re}z>-1$ で $K_z(0)$ を球の積分から直接求め、[核補題](#lem-ha11-kernel)の級数の $r=0$ の項と一致することを確かめよ。

<!-- solution-start -->
**詳細解答**　指数因子は $x=0$ で1です。$s=r^2$ に変数変換すると

$$
\begin{aligned}
K_z(0)
&=\frac{\sigma(S)}{(2\pi)^d\Gamma(z+1)}
\int_0^1r^{d-1}(1-r^2)^z\,dr\\
&=\frac{\sigma(S)}{2(2\pi)^d\Gamma(z+1)}
\int_0^1s^{d/2-1}(1-s)^z\,ds\\
&=\frac{\sigma(S)\Gamma(d/2)}
{2(2\pi)^d\Gamma(d/2+z+1)}
=\frac{\pi^{d/2}}{(2\pi)^d\Gamma(d/2+z+1)}.
\end{aligned}
$$

最後は $\sigma(S)=2\pi^{d/2}/\Gamma(d/2)$ を使いました。一方核の級数で $r=0$ と置くと $k=0$ のみ残り、$\nu=d/2+z$ に対してまったく同じ値を与えます。
<!-- solution-end -->

<a id="ex-ha11-b02"></a>
**演習 HA11-B02（Bessel関数の二階微分方程式から大域的評価へ）**  
- Level: B

$\nu=-1/2+it$ に対し $y(r)=r^{1/2}J_\nu(r)$ が満たす積分方程式を導き、$r\ge1$ の上界が $e^{C(1+t^2)}$ でよい理由を説明せよ。

<!-- solution-start -->
**詳細解答**　$J_\nu=r^{-1/2}y$ を二回微分すると

$$
J_\nu'=r^{-1/2}y'-\tfrac12r^{-3/2}y,\qquad
J_\nu''=r^{-1/2}y''-r^{-3/2}y'
+\tfrac34r^{-5/2}y.
$$

これを $J_\nu''+r^{-1}J_\nu'+(1-\nu^2r^{-2})J_\nu=0$ に代入すると

$$
y''+y=(\nu^2-\tfrac14)r^{-2}y.
$$

右辺を外力と見た初期値問題の解は

$$
y(r)=y(1)\cos(r-1)+y'(1)\sin(r-1)
+(\nu^2-\tfrac14)\int_1^r\sin(r-s)s^{-2}y(s)\,ds.
$$

$\nu^2-\tfrac14=-t^2-it$、$|\nu^2-\tfrac14|\le t^2+|t|$ と $\int_1^\infty s^{-2}ds=1$ を使います。$B=|y(1)|+|y'(1)|$、$A=t^2+|t|$ とおき、$H(r)=B+A\int_1^r s^{-2}|y(s)|\,ds$ とすれば $|y(r)|\le H(r)$ と $H'(r)\le Ar^{-2}H(r)$ が成立します。$H(r)\le B\exp(A\int_1^r s^{-2}ds)\le Be^A$ を得ます。初期値は級数から $B\le Ce^{C|t|}$ なので、$|y(r)|\le Ce^{C(1+t^2)}$ です。
<!-- solution-end -->

<a id="ex-ha11-b03"></a>
**演習 HA11-B03（複素補間の指数）**  
- Level: B

解析族の幅 $a=(d+1)/2$ に対し $z=-1$ の補間比 $\theta$ を求め、$d=3$ で作用素 $T_{-1}:L^{4/3}\to L^4$ が得られることを証明せよ。$L^2\to L^2$ と $L^1\to L^\infty$ のどちらの端点を $\theta$ 側に置くかも明記せよ。

<!-- solution-start -->
**詳細解答**　$z=-a\theta$ なので $\theta=1/a=2/(d+1)$ です。$\theta=0$ 側が $L^2\to L^2$、$\theta=1$ 側が $L^1\to L^\infty$ です。$d=3$ なら $\theta=1/2$ で

$$
\frac1p=\frac{1-\theta}{2}+\theta=\frac14+\frac12=\frac34,
\quad p=\frac43;
\qquad
\frac1q=\frac{1-\theta}{2}=\frac14,\quad q=4.
$$

補間した作用素のパラメータは $z=-a\theta=-2(1/2)=-1$ です。$T_{-1}$ が球面集中作用素であることは[分布補題](#lem-ha11-distribution)から従います。
<!-- solution-end -->

<a id="ex-ha11-b04"></a>
**演習 HA11-B04（平坦面で何が壊れるか）**  
- Level: B

$U\subset\mathbb R^{d-1}$ を非空有界開集合、$0\ne g\in C_c^\infty(U)$ とする。超平面上の $E_{\mathrm{flat}}g$ がどの有限 $q$ についても $L^q(\mathbb R^d)$ に入らないことを証明し、球面版のどの機構が失われるか説明せよ。

<!-- solution-start -->
**詳細解答**　$g$ のFourier変換を $\widehat g(x')=\int_Ue^{-ix'\cdot u}g(u)\,du$ とすると

$$
E_{\mathrm{flat}}g(x',x_d)=\widehat g(-x').
$$

Fourier変換の一意性により $\widehat g$ は恒等的に零ではありません。また連続なので、ある球 $B\subset\mathbb R^{d-1}$ と $\varepsilon>0$ が存在して $|\widehat g(-x')|\ge\varepsilon$ が $x'\in B$ で成立します。従って

$$
\int_{\mathbb R^d}|E_{\mathrm{flat}}g(x)|^qdx
\ge \varepsilon^q|B|\int_\mathbb R dx_d=\infty.
$$

この面は法線方向に位相が全く変化せず、球面での接方向の非退化Hessian、従って[HA10の球面減衰](../HA10/index.md#thm-ha10-sphere)の機構が失われます。
<!-- solution-end -->

### Level C：主定理をつなぎ直す

<a id="ex-ha11-c01"></a>
**演習 HA11-C01（$d=3$ のStein–Tomas評価を再構成）**  
- Level: C

$d=3$ で次を順に証明せよ。

1. $z=-1$ が $\operatorname{Re}z=0$ と $\operatorname{Re}z=-2$ の補間比 $1/2$ に対応すること。
2. [端点補題](#lem-ha11-kernel)と[三線定理](../HA2/index.md#lem-ha2-three-lines)から $T_{-1}:L^{4/3}\to L^4$ を得ること。複素パラメータに伴う成長はGaussian因子で制御すること。
3. $M_{-1}$ の係数を求めて $\|Rf\|_2\lesssim\|f\|_{4/3}$ を導き、双対性から $\|Eg\|_4\lesssim\|g\|_2$ を得ること。
4. $d=3$ のKnapp例から $q\ge4$ が必要と分かること。

<!-- solution-start -->
**詳細解答**　$d=3$ なら $a=(d+1)/2=2$ で、$-1=(1-\theta)0+\theta(-2)$ より $\theta=1/2$ です。

端点は $T_{it}:L^2\to L^2$、$T_{-2+it}:L^1\to L^\infty$。どちらもノルム増加が高々 $Ce^{Ct^2}$ なので、$A>C$ を選び $\widetilde T_z=e^{A(z+1)^2}T_z$ とします。端点の $z=b+it$ では

$$
|e^{A(z+1)^2}|=e^{A((b+1)^2-t^2)}
$$

だから成長は抑えられます。$z=-1$ では因子が1なので、正規化した単純関数 $f,h$ を使って三線補間し、

$$
\frac1p=\frac12\cdot\frac12+\frac12\cdot1=\frac34,
\qquad
\frac1q=\frac12\cdot\frac12+\frac12\cdot0=\frac14
$$

から $\|T_{-1}f\|_4\le C\|f\|_{4/3}$ を得ます。

球面集中補題により $M_{-1}=\tfrac12d\sigma$ です。Fourier反転の定数を含めると

$$
T_{-1}=\frac1{2(2\pi)^3}ER.
$$

よってSchwartz関数 $f$ について、[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)と[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)から

$$
\|Rf\|_2^2
=2(2\pi)^3\langle T_{-1}f,f\rangle
\le 2(2\pi)^3\|T_{-1}f\|_4\|f\|_{4/3}
\le C\|f\|_{4/3}^2.
$$

平方根を取り、$L^{4/3}$ の稠密性で $R$ を延長し、[双対命題](#prop-ha11-duality)により $\|Eg\|_4\le C\|g\|_2$ を得ます。

最後に三次元のcapの測度は $\asymp\delta^2$、tube体積は $\asymp\delta^{-4}$ であり、

$$
\|Eg_\delta\|_q\gtrsim\delta^{2-4/q},
\qquad
\|g_\delta\|_2\asymp\delta.
$$

もし一様な $L^2\to L^q$ 評価が成り立つなら $2-4/q\ge1$、従って $q\ge4$。主定理の指数はこの必要条件と一致します。
<!-- solution-end -->

## 7. 何が分かり、どこから先が未解決なのか

[Stein–Tomas型定理](#thm-ha11-stein-tomas)は、曲率を持つ単位球面について $L^2(S)\to L^{2(d+1)/(d-1)}(\mathbb R^d)$ のextension評価を与えます。[Knapp型の必要条件](#prop-ha11-knapp)は、この入力空間を固定したとき、出力指数をそれより小さくできないと示します。capがtubeを作る計算は、大域的な重なりの幾何がKakeya問題につながることも説明しました。

ただし、これは全ての入力指数・任意の曲面に関するrestriction予想でも、Kakeya集合の次元を決定する結果でもありません。本章の証明で正確に使ったのは球面、標準面積測度、$d\ge2$、および上記の指数です。曲率のない面では最後の比較例のように全く異なることが起こります。