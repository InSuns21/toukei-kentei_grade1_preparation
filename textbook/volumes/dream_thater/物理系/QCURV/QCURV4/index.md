# QCURV4 FLRW宇宙のモード方程式と粒子生成

<!-- definition-example-audit: strict -->

[QCURV3のBogoliubov変換](../QCURV3/index.md#def-qcurv3-bogoliubov)によれば、二つの正振動数の選択が混ざれば、一方の真空で他方の粒子が観測されます。しかし、前章の周波数急変振動子は時空そのものの膨張を記述していませんでした。本章では、宇宙の大きさを表すスケール因子が時間とともに変わるとき、曲率結合場の方程式から**本当に**時間依存振動子が現れることを確かめます。

道筋は **FLRW計量 → 再スケーリング → 保存された規格化とin/out真空 → 滑らかな膨張での粒子生成 → 共形結合の場合の非生成** です。自由場の固定背景量子論を考え、膨張への場の逆作用は扱いません。「粒子」は選択したin/out正振動数モードに対する粒子数であり、一般時刻に一意の瞬間真空が存在するという意味ではありません。

単位は $c=\hbar=1$、計量符号は $(-,+,+,+)$、スカラー曲率の符号は[GR6と整合する規約](../../../../../dream-theater-lorentz-conventions.md)とします。[QCURV1の曲率結合Klein–Gordon作用素](../QCURV1/index.md#def-qcurv1-kg-operator) $P=-\Box_g+m^2+\xi R$（$m\ge0,\ \xi\in\mathbb R$）を用います。

## 1. 膨張する空間で何を「時間」と呼ぶか

宇宙の各空間方向を同じ倍率で拡大する最小の幾何模型を考えます。宇宙とともに動く座標を $\boldsymbol x=(x^1,x^2,x^3)$、その観測者の固有時間を $t$、大きさを表す正の関数を $a(t)$ とします。固有時間では $ds^2=-dt^2+a(t)^2d\boldsymbol x^2$ です。波の伝播を追うには、時間方向にも同じ $a^2$ をくくり出せる座標が便利です。

$a(t)>0$ の間、$d\eta=dt/a(t)$ で新しい時間 $\eta$ を取れます。これを**共形時間**といい、プライム $'$ は以後 $\eta$ に関する通常微分、$\dot a=da/dt$ は固有時間微分です。連鎖律から $a'=a\dot a$ なので、異なる微分を無言で取り替えません。空間は最初、辺の共動長さ $L>0$ の平坦な三次元トーラス $\mathbb T_L^3$ とし、周期境界条件を課します。これにより運動量は $\boldsymbol k=(2\pi/L)\boldsymbol n$（$\boldsymbol n\in\mathbb Z^3$）となり、無限体積のデルタ関数を使わずに規格化を議論できます。

共形座標では空間方向の線素を次のように書きます。

$$
d\boldsymbol x^2=\sum_{i=1}^3(dx^i)^2
=\sum_{i,j=1}^3\delta_{ij}\,dx^i dx^j.
$$

ここで $\delta_{ij}$ はKroneckerのデルタ（$i=j$ なら1、それ以外は0）です。以下、上下に反復する空間添字については $1,2,3$ の和を取ります。したがって計量の座標成分は $g_{\eta\eta}=-a^2$、$g_{\eta i}=0$、$g_{ij}=a^2\delta_{ij}$ です。

<a id="def-qcurv4-flrw"></a>

<!-- formal-statement-start -->
> **定義（平坦FLRW背景と共形時間）**
> 区間 $I\subseteq\mathbb R$、正の滑らかな関数 $a:I\to(0,\infty)$、$L>0$ に対し、$M=I\times\mathbb T_L^3$ に置くLorentz計量

$$
g=a(\eta)^2\left(-d\eta^2+\delta_{ij}dx^i dx^j\right),
\qquad dt=a(\eta)d\eta
$$

> を空間的に平坦なFLRW計量という。$\eta$ は共形時間、$a$ はスケール因子、$t$ は共動観測者の固有時間である。以下、$\mathcal H=a'/a$ は共形Hubble量を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv4-flrw -->
### 直接例：滑らかな膨張の幾何

$a_0,T>0$、$\varepsilon>0$ とし、全実数の共形時間に対して

$$
a(\eta)^2=a_0^2[1+\varepsilon s(\eta)],
\qquad s(\eta)=\frac{1+\tanh(\eta/T)}2
$$

と置きます。$0<s<1$、$s'=\operatorname{sech}^2(\eta/T)/(2T)>0$ ですから $a$ は正で滑らかに増大し、過去に $a_0$、未来に $a_0\sqrt{1+\varepsilon}$ へ近づきます。

定義の計量条件を成分から確かめます。時間方向は負であり、空間切片の零でない接ベクトル $v=v^i\partial_i$ に対しては

$$
g(\partial_\eta,\partial_\eta)=-a^2<0,\qquad
g(v,v)=a^2\sum_{i=1}^3(v^i)^2>0.
$$

ここでは前段で確認した $g_{ij}=a^2\delta_{ij}$ を $v$ の成分に適用しました。時間と空間の交差成分は零なので、Lorentz符号 $(-,+,+,+)$ と空間切片の正定値性が従います。

Cauchy面であることも別に確認します。正の因子 $a^2$ は光円錐を変えません。未来向き因果曲線を $\gamma(\eta)=(\eta,\boldsymbol x(\eta))$ と媒介変数化します。平坦トーラス上の局所的なEuclidノルムを $|\cdot|$ と書くと、因果条件は

$$
g\left(\frac{d\gamma}{d\eta},\frac{d\gamma}{d\eta}\right)
=a^2\left(-1+\left|\frac{d\boldsymbol x}{d\eta}\right|^2\right)
\le0
\quad\Longrightarrow\quad
\left|\frac{d\boldsymbol x}{d\eta}\right|\le1
$$

です。有限の共形時間で曲線が止まるなら、空間座標はこの速度上界によって極限を持ち、平坦トーラス上で因果曲線を延長できてしまいます。ゆえに延長不能な因果曲線はすべての共形時間を走り、各 $\eta=\text{const}$ をちょうど一度通ります。

また $a_0\le a\le a_0\sqrt{1+\varepsilon}$ なので、$t(\eta)=\int_0^\eta a(u)\,du$ も $\eta\to\pm\infty$ に従い正負の無限大へ向かいます。

**定義の確認**：$I=\mathbb R$、$a\in C^\infty(\mathbb R,(0,\infty))$、$L>0$、時間方向の負符号と空間方向の正符号が揃い、$dt=a\,d\eta$ も成立するため、FLRW背景の定義の条件をすべて満たします。
<!-- definition-example-end -->

## 2. 波動方程式は時間依存振動子になる

ここからは $a\in C^\infty(I)$ の一般形を使います。空間Fourier展開で分離できるのは平坦かつ一様な空間計量のおかげです。計量の逆成分と体積密度を[QCURV1の座標作用素公式](../QCURV1/index.md#prop-qcurv1-kg-coordinate)へ代入します。

<a id="prop-qcurv4-mode"></a>

<!-- formal-statement-start -->
> **命題（FLRWの再スケーリング後のモード方程式）**
> 四次元の $g=a(\eta)^2(-d\eta^2+d\boldsymbol x^2)$、$a\in C^\infty(I,(0,\infty))$ と、実場の方程式 $(-\Box_g+m^2+\xi R)\phi=0$ を仮定する。$m\ge0$、$\xi\in\mathbb R$ は定数とする。スカラー曲率と場の方程式は

$$
R=\frac{6a''}{a^3},
\qquad
\phi''+2\mathcal H\phi'-\Delta\phi+a^2(m^2+\xi R)\phi=0.
$$

> $\chi=a\phi$ と置くと

$$
\chi''-\Delta\chi+
\left[m^2a^2+(6\xi-1)\frac{a''}{a}\right]\chi=0.
$$

> 周期空間のFourier表示 $\chi=L^{-3/2}\sum_{\boldsymbol k}\chi_{\boldsymbol k}(\eta)e^{i\boldsymbol k\cdot\boldsymbol x}$ では、各係数は

$$
\boxed{\chi_{\boldsymbol k}''+\Omega_k(\eta)^2\chi_{\boldsymbol k}=0},
\qquad
\Omega_k^2=k^2+m^2a^2+(6\xi-1)\frac{a''}{a},
\quad k=|\boldsymbol k|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず $\sqrt{|g|}=a^4$、$g^{\eta\eta}=-a^{-2}$ を共変波動演算子へ入れます。次に $\phi=\chi/a$ を二回微分すると、一次微分 $2\mathcal H\phi'$ が相殺されます。最後に三次元の平面波に対して $-\Delta e^{i\boldsymbol k\cdot\boldsymbol x}=k^2e^{i\boldsymbol k\cdot\boldsymbol x}$ を用います。

<!-- proof-start -->
### 証明

行列式は $\det g=-a^8$、従って $\sqrt{|g|}=a^4$ です。[QCURV1の座標表示](../QCURV1/index.md#prop-qcurv1-kg-coordinate)に $g^{ij}=a^{-2}\delta^{ij}$ を代入すると

$$
\begin{aligned}
\Box_g\phi
&=\frac1{a^4}\partial_\eta(-a^2\phi')
 +\frac1{a^4}\partial_i(a^2\partial_i\phi)\\
&=\frac1{a^2}[-\phi''-2(a'/a)\phi'+\Delta\phi].
\end{aligned}
$$

曲率を確認します。$\mathcal H=a'/a$、$\partial_i a=0$ を[LORG4のLevi-Civita接続の係数公式](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)へ入れると、非零の成分は $\Gamma^\eta_{\eta\eta}=\mathcal H$、$\Gamma^\eta_{ij}=\mathcal H\delta_{ij}$、$\Gamma^i_{\eta j}=\Gamma^i_{j\eta}=\mathcal H\delta^i_j$ です。[GR6の曲率成分公式](../../GR/GR6/index.md#prop-gr6-coordinate-curvature)をRicciテンソルへ縮約した式は

$$
R_{\mu\nu}
=\partial_\lambda\Gamma^\lambda_{\mu\nu}
-\partial_\nu\Gamma^\lambda_{\mu\lambda}
+\Gamma^\lambda_{\lambda\rho}\Gamma^\rho_{\mu\nu}
-\Gamma^\lambda_{\nu\rho}\Gamma^\rho_{\mu\lambda}.
$$

この式の四項を時間・空間成分ごとに代入すると、$\Gamma^\lambda_{\eta\lambda}=4\mathcal H$ と $\partial_j\mathcal H=0$ により

$$
\begin{aligned}
R_{\eta\eta}
&=\mathcal H'-4\mathcal H'+4\mathcal H^2-4\mathcal H^2
=-3\mathcal H',\\
R_{ij}
&=\mathcal H'\delta_{ij}+4\mathcal H^2\delta_{ij}
-2\mathcal H^2\delta_{ij}
=(\mathcal H'+2\mathcal H^2)\delta_{ij}.
\end{aligned}
$$

よって

$$
R=g^{\eta\eta}R_{\eta\eta}+g^{ij}R_{ij}
=\frac6{a^2}(\mathcal H'+\mathcal H^2)
=\frac{6a''}{a^3}.
$$

ここで $P\phi=0$ に上の $\Box_g$ を代入して $a^2$ を掛ければ、$\phi$ に関する式が得られます。さらに $\phi=\chi/a$ について

$$
\phi'=\frac{\chi'-\mathcal H\chi}{a},
\quad
\phi''=\frac{\chi''-2\mathcal H\chi'
+(\mathcal H^2-\mathcal H')\chi}{a},
$$

なので

$$
\phi''+2\mathcal H\phi'
=\frac{\chi''-(\mathcal H'+\mathcal H^2)\chi}{a}
=\frac{\chi''-(a''/a)\chi}{a}.
$$

$a$ は空間座標に依存しないため $\Delta(\chi/a)=(\Delta\chi)/a$。代入後に $a$ を掛け、$a^2\xi R=6\xi a''/a$ を入れると再スケーリング後の式になります。最後に各 $\boldsymbol k$ のFourier係数を比較すると主張を得ます。
<!-- proof-end -->

一つのモードの「振動数の二乗」$\Omega_k^2$ は時刻によって負になり得ます。その場合も微分方程式は有意味ですが、$\sqrt{\Omega_k^2}$ を実の**瞬間振動数**と呼ぶことはできません。本章のin/out粒子数には、漸近領域で正の一定振動数を確保します。

### 直接計算：Minkowski極限

$a=a_0$ 一定なら $a''=0$ で $\Omega_k^2=k^2+m^2a_0^2$ です。固有時間 $t=a_0\eta$ と物理波数 $k_{\rm phys}=k/a_0$ を使えば、$e^{-i\Omega_k\eta}=e^{-iE_kt}$、$E_k^2=k_{\rm phys}^2+m^2$ となり平坦空間の分散関係を回復します。膨張と質量による項を区別する最初の検算です。

## 3. in/outモードを何に対して規格化するか

[QCURV2の保存KG内積](../QCURV2/index.md#def-qcurv2-kg-pairing)はCauchy面によらずに計算できます。$\eta=\text{const}$ では $g_{\eta\eta}=-a^2$ なので、未来向き単位法線は $n^a=a^{-1}(\partial_\eta)^a$（$g(n,n)=-1$）です。誘導空間計量 $h_{ij}=a^2\delta_{ij}$ の行列式は $a^6$ だから $d\Sigma=\sqrt{\det h}\,d^3x=a^3d^3x$ です。この二式を内積の定義へ代入すると

$$
(u,v)_{\rm KG}=i\int_{\mathbb T_L^3}a^2
(\bar u\,v'-\bar u'\,v)\,d^3x.
$$

$u_{\boldsymbol k}=L^{-3/2}a^{-1}\chi_k(\eta)e^{i\boldsymbol k\cdot\boldsymbol x}$ と置けば、$a'$ の項は差で消え、

$$
(u_{\boldsymbol k},u_{\boldsymbol l})_{\rm KG}
=\delta_{\boldsymbol k\boldsymbol l}\,
i(\bar\chi_k\chi_k'-\bar\chi_k'\chi_k).
$$

単位ノルムには、右辺の括弧に現れる時間部分を $1$ と取ります。実係数の振動子方程式からその値は保存されます。正モード $u_{\boldsymbol k}$ と負モード $\bar u_{\boldsymbol l}$ の内積では、空間積分は $\boldsymbol k=-\boldsymbol l$ のときだけ非零になり得ます。しかし等方的な背景では $\chi_k=\chi_{-k}$ を選べるため、この場合の時間部分は $i(\bar\chi_k\bar\chi_k'-\bar\chi_k'\bar\chi_k)=0$ です。よって正負モードは直交します。

十分速く定数背景へ近づくと、過去と未来それぞれに $e^{-i\omega\eta}$ に漸近する解を選べます。この二つを比較するのがin/out量子化です。一般には遠い過去・未来でどちらの基底を使うかが指定できない場合があり、そのとき自然なin/out粒子数を無条件には主張しません。

<a id="def-qcurv4-in-out"></a>

<!-- formal-statement-start -->
> **定義（FLRWのin/out正振動数モード）**
> $I=\mathbb R$、$m\ge0$、$\xi\in\mathbb R$ の上記FLRW模型で、$a(\eta)\to a_\pm>0$、$a''/a\to0$（$\eta\to\pm\infty$）とし、各対象波数 $k$ の $\omega_\pm=\sqrt{k^2+m^2a_\pm^2}$ は正とする。さらに各漸近正振動数条件を満たす正規化解が存在すると仮定する。その解を $\chi_k^{\rm in/out}$ とし、

$$
\chi_k^{\rm in}(\eta)\sim\frac{e^{-i\omega_-\eta}}{\sqrt{2\omega_-}}
\quad(\eta\to-\infty),\qquad
\chi_k^{\rm out}(\eta)\sim\frac{e^{-i\omega_+\eta}}{\sqrt{2\omega_+}}
\quad(\eta\to+\infty)
$$

> と選ぶ。「$\sim$」には関数値とその一階微分の対応する振動漸近を含める。対応する全時刻の解を

$$
u_{\boldsymbol k}^{\rm in/out}
=L^{-3/2}a^{-1}\chi_k^{\rm in/out}
e^{i\boldsymbol k\cdot\boldsymbol x}
$$

> と置き、これをin/outモードと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv4-in-out -->
### 直接例：定数背景のin/outは一致する

$a(\eta)\equiv a_0>0$、$k^2+m^2a_0^2>0$ なら $\omega_-=\omega_+=\omega>0$、$\chi=e^{-i\omega\eta}/\sqrt{2\omega}$ が全時刻の解です。

$$
i(\bar\chi\chi'-\bar\chi'\chi)
=i\left(\frac{-i\omega}{2\omega}-\frac{i\omega}{2\omega}\right)=1.
$$

時間の両端で同じ正振動数条件を満たし、必要な規格化も満たすので $u^{\rm in}=u^{\rm out}$ です。背景が定数なら、同じ正振動数の選択について粒子数の混合は起こりません。

**定義の確認**：$a_-=a_+=a_0$、$a''/a=0$、$\omega_\pm=\omega>0$、関数値・一階微分ともに所定の振動漸近を満たすため、in/outの存在・規格化条件を直接検証しました。
<!-- definition-example-end -->

<a id="prop-qcurv4-wronskian-number"></a>

<!-- formal-statement-start -->
> **命題（FLRWモードのWronskianと粒子数）**
> [in/outモード](#def-qcurv4-in-out)が存在し、$\Omega_k^2$ が実で $k$ の絶対値だけに依存するとする。各 $\chi_k$ の保存規格化は $i(\bar\chi_k\chi_k'-\bar\chi_k'\chi_k)=1$ である。in解を未来でout解に展開すると

$$
\chi_k^{\rm in}=A_k\chi_k^{\rm out}
+B_k\bar\chi_k^{\rm out},
\qquad |A_k|^2-|B_k|^2=1.
$$

> 全時空モードの展開は

$$
u_{\boldsymbol k}^{\rm in}
=A_ku_{\boldsymbol k}^{\rm out}
+B_k\overline{u_{-\boldsymbol k}^{\rm out}}
$$

> であり、in真空のoutモード $\boldsymbol k$ の粒子数は

$$
\boxed{\langle N_{\boldsymbol k}^{\rm out}\rangle_{\rm in}=|B_k|^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

振動子方程式が実の係数を持つことから $\chi$ と $\bar\chi$ は解です。Wronskianは時間微分すると $\chi''=-\Omega^2\chi$ の項が相殺されます。空間Fourier因子の共役によって $\boldsymbol k$ と $-\boldsymbol k$ が結び付き、[前章の粒子数命題](../QCURV3/index.md#prop-qcurv3-number)を適用できます。

<!-- proof-start -->
### 証明

$W_k=i(\bar\chi_k\chi_k'-\bar\chi_k'\chi_k)$ と置くと、

$$
W_k'=i(\bar\chi_k\chi_k''-\bar\chi_k''\chi_k)
=i[-\Omega_k^2\bar\chi_k\chi_k+\Omega_k^2\bar\chi_k\chi_k]=0.
$$

in/outの漸近解は共に $W_k=1$ を持つので、未来の独立な基底 $\chi_k^{\rm out},\bar\chi_k^{\rm out}$ に展開して

$$
1=W[\chi_k^{\rm in}]
=|A_k|^2W[\chi_k^{\rm out}]
+|B_k|^2W[\bar\chi_k^{\rm out}]
=|A_k|^2-|B_k|^2.
$$

交差項は互いに相殺されます。空間波数が同じな二つの全時空解は $u_{\boldsymbol k}^{\rm out}$ と $\overline{u_{-\boldsymbol k}^{\rm out}}$ です。実際、後者の空間因子は $\overline{e^{-i\boldsymbol k\cdot\boldsymbol x}}=e^{i\boldsymbol k\cdot\boldsymbol x}$ です。逆行列でoutモードをin基底へ戻すと、[QCURV3の係数規約](../QCURV3/index.md#def-qcurv3-bogoliubov)における $\beta$ の大きさは $|B_k|$ です。[QCURV3のin真空のout粒子数](../QCURV3/index.md#prop-qcurv3-number)により、対向波数モードと結び付いた一つの係数だけが寄与し、粒子数は $|B_k|^2$ です。
<!-- proof-end -->

粒子が対向運動量で現れるのは、空間並進対称性を保つ背景では空間運動量の総和が零でなければならないためです。$\boldsymbol k=\boldsymbol0$ はそれ自身と対になりますが、質量零なら $\omega_\pm=0$ で本節の正振動数定義の対象外です。無限体積へ移るときはデルタ規格化と波束化が必要であり、[QCURV3の波束粒子数](../QCURV3/index.md#def-qcurv3-wavepacket-hs)と同様に扱います。

## 4. 滑らかな宇宙膨張は何個の粒子を生むか

**膨張の時間尺度が分かる例**を計算します。第1節の $s=(1+\tanh(\eta/T))/2$ に対して

$$
a(\eta)^2=a_0^2[1+\varepsilon s(\eta)],
\qquad 0<\varepsilon\ll1,\quad a_0,T>0
$$

とし、質量 $m>0$、共形結合 $\xi=1/6$ を固定します。すると $a''$ に依存する項は消え、$\Omega_k^2=k^2+m^2a^2$ は全時刻で正です。$\mu=ma_0>0$、$\omega=\sqrt{k^2+\mu^2}$ と記せば

$$
\Omega_k^2=\omega^2+\varepsilon\mu^2s(\eta),\quad
\omega_-=\omega,\quad
\omega_+=\sqrt{\omega^2+\varepsilon\mu^2}.
$$

時間依存振動子を、各時刻での $\Omega_k>0$ を使った二つの複素指数に分けます。これは計算のための**瞬間基底**で、瞬間基底が各時刻の物理的真空を一意に決めるという定義ではありません。$\theta'=\Omega_k$ として、複素解とその微分の二つの値から係数 $A(\eta),B(\eta)$ を読み取ります。

<a id="def-qcurv4-amplitudes"></a>

<!-- formal-statement-start -->
> **定義（時間依存振動子の瞬間モード係数）**
> 実で滑らかな関数 $\Omega(\eta)>0$ と、$\chi''+\Omega^2\chi=0$ の複素解について、$\theta(\eta)=\int_0^\eta\Omega(s)\,ds$ とする。各 $\eta$ における複素数 $A,B$ を二つの等式

$$
\chi=\frac{Ae^{-i\theta}+Be^{i\theta}}{\sqrt{2\Omega}},
\qquad
\chi'=-i\sqrt{\frac{\Omega}{2}}\left(Ae^{-i\theta}-Be^{i\theta}\right)
$$

> によって定める。これは $(\chi,\chi')$ から $(A,B)$ への可逆な線形変換であり、時間一定の係数を仮定していない。
<!-- formal-statement-end -->

二式の右辺を加減すれば

$$
A=e^{i\theta}\left(\sqrt{\frac\Omega2}\chi+
\frac{i\chi'}{\sqrt{2\Omega}}\right),\quad
B=e^{-i\theta}\left(\sqrt{\frac\Omega2}\chi-
\frac{i\chi'}{\sqrt{2\Omega}}\right)
$$

と逆に一意に決まります。従って、単に任意の二つの係数を記号として導入したのではなく、位置と速度の両方を使う分解です。

<!-- definition-example-start: def-qcurv4-amplitudes -->
### 直接例：一定振動数の正振動数解

$\Omega\equiv\omega>0$、$\theta=\omega\eta$、$\chi=e^{-i\omega\eta}/\sqrt{2\omega}$ なら $\chi'=-i\omega\chi$ です。逆変換で

$$
A=e^{i\omega\eta}(\tfrac12+\tfrac12)e^{-i\omega\eta}=1,
\qquad
B=e^{-i\omega\eta}(\tfrac12-\tfrac12)e^{-i\omega\eta}=0.
$$

二つの定義式を再び満たし、$\Omega'=0$ なので混合がないことを直接確認できました。

**定義の確認**：$\Omega=\omega>0$ は滑らかで、与えた $\chi$ は方程式 $\chi''+\omega^2\chi=0$ を満たします。位置と速度の二式から $A=1,B=0$ が一意に決まることも確かめました。
<!-- definition-example-end -->

<a id="prop-qcurv4-smooth-ramp"></a>

<!-- formal-statement-start -->
> **命題（滑らかな弱い膨張の粒子生成）**
> $m,a_0,T>0$、$0<\varepsilon\ll1$ とし、四次元の空間平坦FLRW背景 $a^2=a_0^2[1+\varepsilon(1+\tanh(\eta/T))/2]$ における $\xi=1/6$ の自由実スカラー場を考える。$\omega=\sqrt{k^2+m^2a_0^2}>0$ を固定する。正規化されたinモードに対応する未来の負振動数振幅 $B_k$ は、位相の選択を除いて

$$
B_k=\frac{\varepsilon\pi m^2a_0^2 T}
{4\omega\sinh(\pi\omega T)}+O(\varepsilon^2),
$$

> 従って各固定波数のin真空におけるout粒子数は

$$
\boxed{\langle N_{\boldsymbol k}^{\rm out}\rangle_{\rm in}
=\frac{\varepsilon^2\pi^2m^4a_0^4T^2}
{16\omega^2\sinh^2(\pi\omega T)}
+O(\varepsilon^3)}.
$$

> 誤差は $k,a_0,m,T$ を固定して $\varepsilon\to0$ とする摂動展開の意味であり、全モードで一様な誤差評価を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

瞬間モード係数が変化するのは $\Omega'/(2\Omega)$ を通じてだけです。初期の負振動数係数を零として一回積分すると、膨張率 $s'$ のFourier変換が負振動数混合を与えます。この模型では $s'$ が $\operatorname{sech}^2$ なので積分を解析的に計算できます。

<!-- proof-start -->
### 証明

[瞬間係数の定義](#def-qcurv4-amplitudes)の第一式を微分し、第二式と比較すると

$$
(A'-\tfrac{\Omega'}{2\Omega}A)e^{-i\theta}
+(B'-\tfrac{\Omega'}{2\Omega}B)e^{i\theta}=0.
$$

次に第二式を微分し、$\chi''=-\Omega^2\chi$ を代入すると

$$
(A'+\tfrac{\Omega'}{2\Omega}A)e^{-i\theta}
-(B'+\tfrac{\Omega'}{2\Omega}B)e^{i\theta}=0.
$$

二式の加減によって**厳密な**連立一次方程式

$$
A'=\frac{\Omega'}{2\Omega}e^{2i\theta}B,
\qquad
B'=\frac{\Omega'}{2\Omega}e^{-2i\theta}A
$$

を得ます。$\Omega^2=\omega^2+\varepsilon\mu^2s$ なので、$\mu=ma_0$ として

$$
\frac{\Omega'}{2\Omega}
=\frac{\varepsilon\mu^2s'}{4\Omega^2}
=\frac{\varepsilon\mu^2s'}{4\omega^2}+O(\varepsilon^2s'),
\qquad
\theta(\eta)=\omega\eta+O(\varepsilon)
$$

が $s'$ の実質的な支持領域で成り立ちます。$s'$ は指数減衰する可積分関数なので、固定した $T,k$ のもとで摂動展開を積分できます。inモードでは $B(-\infty)=0$、$A(-\infty)$ は絶対値1であり、その位相を1に選びます。すると $B=O(\varepsilon)$、$A=1+O(\varepsilon^2)$ で

$$
B(+\infty)
=\frac{\varepsilon\mu^2}{4\omega^2}
\int_{-\infty}^{\infty}s'(\eta)e^{-2i\omega\eta}d\eta
+O(\varepsilon^2).
$$

置換 $x=\eta/T$ により

$$
\begin{aligned}
\int_{-\infty}^{\infty}s'e^{-2i\omega\eta}d\eta
&=\frac12\int_{-\infty}^{\infty}\operatorname{sech}^2x\,
e^{-2i\omega Tx}dx\\
&=\frac{\pi\omega T}{\sinh(\pi\omega T)}.
\end{aligned}
$$

最後の等号は[CA4の留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)で検算できます。$q>0$ とし、実積分と複素被積分関数を

$$
J(q)=\int_{-\infty}^{\infty}\operatorname{sech}^2x\,e^{-iqx}dx,
\qquad F(z)=\operatorname{sech}^2z\,e^{-iqz}
$$

と置きます。$F$ を高さ $i\pi$、実部が $-R$ から $R$ の長方形に沿って積分します。垂直辺では、$0\le y\le\pi$ に一様に

$$
F(\pm R+iy)=O(e^{-2R})\qquad(R\to\infty)
$$

となるので、その辺の寄与は消えます。上辺は向きが反対で、$F(x+i\pi)=e^{q\pi}F(x)$ ですから、上下辺の和は $(1-e^{q\pi})J(q)$ です。

長方形内の唯一の極は $z_0=i\pi/2$ で二位です。$h=z-z_0$ とすると

$$
\cosh(z_0+h)=ih+O(h^3),\qquad
\operatorname{sech}^2(z_0+h)=-h^{-2}+O(1).
$$

ここへ $e^{-iq(z_0+h)}=e^{q\pi/2}(1-iqh+O(h^2))$ を掛けると、$h^{-1}$ の係数（留数）は $iqe^{q\pi/2}$。従って[CA4の留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)から

$$
(1-e^{q\pi})J(q)=2\pi i(iq e^{q\pi/2}),
\qquad J(q)=\frac{\pi q}{\sinh(\pi q/2)}.
$$

最後に $q=2\omega T$ を代入します。

よって $B_k=\varepsilon\pi\mu^2T/[4\omega\sinh(\pi\omega T)]+O(\varepsilon^2)$（漸近基底の位相を除く）。最後に[粒子数命題](#prop-qcurv4-wronskian-number)で $|B_k|^2$ を取ると、交差項は $O(\varepsilon^3)$ であり結論を得ます。
<!-- proof-end -->

この式は緩慢な膨張ほど粒子生成が少ないことを具体的に表します。$\omega T\gg1$ なら $\sinh(\pi\omega T)\sim e^{\pi\omega T}/2$ で粒子数の主要項は指数抑制されます。逆に $\omega T\ll1$ なら

$$
|B_k|^2\sim\frac{\varepsilon^2\mu^4}{16\omega^4},
$$

これは[前章の急変振動子の粒子数](../QCURV3/index.md#prop-qcurv3-quench)を $\omega_{\rm out}=\sqrt{\omega^2+\varepsilon\mu^2}=\omega+\varepsilon\mu^2/(2\omega)+O(\varepsilon^2)$ として展開した結果と一致します。ただしここは**固定した $\omega,T$ の摂動係数に対する** $T\to0$ の比較であり、摂動誤差全体の一様な極限交換を証明したわけではありません。

## 5. 膨張しても粒子が生成しない場合

粒子生成の原因は「$a$ が変わること」そのものではありません。曲率結合による $a''/a$ と、質量項 $m^2a^2$ が組み合わさって実効振動数が変わることです。四次元で $m=0,\xi=1/6$ にすると両方が消えます。そこで、平坦時空への共形変換で選ばれる正振動数に注目します。

<a id="def-qcurv4-conformal-vacuum"></a>

<!-- formal-statement-start -->
> **定義（共形真空）**
> 四次元の空間平坦FLRW背景における質量零・共形結合（$m=0,\xi=1/6$）の自由場について、零でない波数 $k=|\boldsymbol k|>0$ の再スケーリング後の正振動数解 $\chi_k=e^{-ik\eta}/\sqrt{2k}$ を用いて定める消滅演算子がすべて消す状態を、非零モードの**共形真空**という。零波数モードは $k^{-1/2}$ によるこの定義から除外し、別の取り扱いを要する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv4-conformal-vacuum -->
### 直接例：一定スケール因子の共形真空

$a(\eta)=a_0>0$ と置くと、$\chi_k=e^{-ik\eta}/\sqrt{2k}$ は $\chi_k''+k^2\chi_k=0$ を満たし、$i(\bar\chi_k\chi_k'-\bar\chi_k'\chi_k)=1$ です。元の場のモードは $u_{\boldsymbol k}=e^{i\boldsymbol k\cdot\boldsymbol x-ik\eta}/(a_0L^{3/2}\sqrt{2k})$ となり、平坦な背景の通常の正振動数モードです。

**定義の確認**：$m=0,\xi=1/6$、$k>0$、正振動数と保存規格化の各条件が揃い、これに対応する消滅演算子の真空を選ぶので、定義の共形真空に一致します。
<!-- definition-example-end -->

<a id="thm-qcurv4-conformal"></a>

<!-- formal-statement-start -->
> **定理（質量零共形結合場の非生成）**
> 四次元の $M=\mathbb R\times\mathbb T_L^3$ に、滑らかで正の空間平坦FLRW計量 $g=a^2(-d\eta^2+d\boldsymbol x^2)$ を置き、$m=0,\xi=1/6$ の自由実Klein–Gordon場を考える。零でない空間波数 $\boldsymbol k$ について、共形正振動数モードを

$$
u_{\boldsymbol k}(\eta,\boldsymbol x)
=\frac{e^{i\boldsymbol k\cdot\boldsymbol x-ik\eta}}
{a(\eta)L^{3/2}\sqrt{2k}},
\qquad k=|\boldsymbol k|>0
$$

> と選ぶ。これらは任意の滑らかな正の $a$ に対して全時刻で正規化された解であり、共形正振動数と負振動数は混ざらない。さらに $a(\eta)\to a_\pm>0$、$a''/a\to0$ など、[in/outモード](#def-qcurv4-in-out)の存在条件が満たされる場合、共形正振動数による二つの基底は一致し、Bogoliubov負振動数係数は $\beta=0$、[共形真空](#def-qcurv4-conformal-vacuum)でのout粒子数は零である。零波数モードにはこの正振動数規格化を適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

[再スケーリング後の方程式](#prop-qcurv4-mode)では $m=0,\ 6\xi-1=0$ なので $\Omega_k^2=k^2$。$a$ の時間依存は、場を $a^{-1}$ 倍する部分にだけ残り、$\chi_k$ は正負へ混ざりません。規格化は再スケーリングによりKG内積へ引き戻されます。

<!-- proof-start -->
### 証明

[モード方程式](#prop-qcurv4-mode)に $m=0$ と $\xi=1/6$ を代入すると $\chi_k''+k^2\chi_k=0$ です。$k>0$ では $\chi_k=e^{-ik\eta}/\sqrt{2k}$ が全 $\eta$ でこの式を満たし、$i(\bar\chi_k\chi_k'-\bar\chi_k'\chi_k)=1$ です。[KG内積の規格化](../QCURV2/index.md#def-qcurv2-kg-pairing)へ戻せば $(u_{\boldsymbol k},u_{\boldsymbol l})=\delta_{\boldsymbol k\boldsymbol l}$、$(u_{\boldsymbol k},\bar u_{\boldsymbol l})=0$ も従います。

全時刻で $\chi_k$ の正振動数は同じ $k$ です。さらに背景が[本章のin/out条件](#def-qcurv4-in-out)を満たす場合、共形時間に基づく両基底は同じ関数を使えます。[Bogoliubov展開](../QCURV3/index.md#def-qcurv3-bogoliubov)では $A_k=1$、$B_k=0$ なので[粒子数命題](#prop-qcurv4-wronskian-number)から $\langle N_{\boldsymbol k}^{\rm out}\rangle_{\rm in}=0$ です。
<!-- proof-end -->

注意点は三つあります。

1. **零モード**：$k=0$ では $\chi_0''=0$ となり、正振動数規格化の分母 $\sqrt{2k}$ が零です。このモードは別に量子化する必要があります。
2. **真空の選択**：共形真空についての主張です。別の正振動数分解に対する粒子数まで零とするものではありません。
3. **質量と曲率結合**：共形結合 $\xi=1/6$ でも $m>0$ なら、実効振動数に $m^2a^2$ が残り、第4節のような生成が起こり得ます。逆に $m=0$ でも $\xi\ne1/6$ なら、曲率の寄与は一般に残ります。

$$
\Omega_k^2=k^2+(6\xi-1)\frac{a''}{a}.
$$

「曲率が非零なら必ず生成」という推論は、この共形結合の例で破れます。実効振動数の時間変化という、正負混合を引き起こす仕組み自体が消えるためです。

## 6. 観測量と近似の射程

本章で求めたのは、指定した過去と未来の正振動数基底に対する**自由場の粒子数期待値**です。四次元FLRWでの宇宙膨張を場自身が作るという自己無撞着なEinstein方程式は解いていません。粒子数と、有限時間に切り替えた検出器の応答やくりこみ応力テンソルも同じ観測量ではありません。

また「非常に遅い変化なら粒子生成は小さい」という第4節の結論は、正の振動数ギャップを持つ固定波数の弱摂動模型についての結果です。$\Omega_k^2$ が零を横切る模型、質量零零モード、一般の長距離尾を持つ背景に無条件には拡張できません。次の断熱真空・Hadamard性の学習では、二点分布の短距離特異性に対する制約と、ここでの漸近粒子数をさらに区別します。

## 演習

### Level A：定義と基本変形

<a id="ex-qcurv4-a01"></a>
#### QCURV4-A01 共形時間と膨張率
- Level: A

$ds^2=-dt^2+a(t)^2d\boldsymbol x^2$、$a(t)>0$ とする。$d\eta=dt/a$ により計量を直し、$\mathcal H=a'/a$ と $H=\dot a/a$ の関係を求めよ。

<!-- solution-start -->
**詳細解答。** $dt=a\,d\eta$ から $-dt^2=-a^2d\eta^2$、よって $ds^2=a^2(-d\eta^2+d\boldsymbol x^2)$。連鎖律で $a'=(da/dt)(dt/d\eta)=a\dot a$ となるため $\mathcal H=a'/a=\dot a=aH$ です。$H$ と $\mathcal H$ は同じ量ではありません。
<!-- solution-end -->

<a id="ex-qcurv4-a02"></a>
#### QCURV4-A02 FLRWの体積密度と波動演算子
- Level: A

四次元 $g_{\mu\nu}=a(\eta)^2\operatorname{diag}(-1,1,1,1)$ について、$\sqrt{|g|}$ と $\Box_g\phi$ を求めよ。

<!-- solution-start -->
**詳細解答。** 行列式は四方向の $a^2$ を掛けて $\det g=-a^8$、従って $\sqrt{|g|}=a^4$。逆行列は $g^{\eta\eta}=-a^{-2}$、$g^{ij}=a^{-2}\delta^{ij}$。[座標表示公式](../QCURV1/index.md#prop-qcurv1-kg-coordinate)により

$$
\Box_g\phi=\frac1{a^4}\left[-\partial_\eta(a^2\phi')
+\partial_i(a^2\partial_i\phi)\right]
=a^{-2}(-\phi''-2a'\phi'/a+\Delta\phi).
$$
<!-- solution-end -->

<a id="ex-qcurv4-a03"></a>
#### QCURV4-A03 再スケーリングで一次微分を消す
- Level: A

$\phi''+2(a'/a)\phi'-\Delta\phi+a^2(m^2+\xi R)\phi=0$ と $R=6a''/a^3$ を与える。$\chi=a\phi$ の方程式を途中式付きで導け。

<!-- solution-start -->
**詳細解答。** $\mathcal H=a'/a$ として $\phi'=(\chi'-\mathcal H\chi)/a$、$\phi''=(\chi''-2\mathcal H\chi'+(\mathcal H^2-\mathcal H')\chi)/a$。この二式を $\phi''+2\mathcal H\phi'$ へ代入すると $\chi'$ の係数 $-2\mathcal H+2\mathcal H$ が相殺され、

$$
\phi''+2\mathcal H\phi'=\frac{\chi''-(\mathcal H'+\mathcal H^2)\chi}{a}
=\frac{\chi''-a''\chi/a}{a}.
$$

$\Delta\phi=\Delta\chi/a$ と $a^2\xi R=6\xi a''/a$ を代入し、全体に $a$ を掛けると $\chi''-\Delta\chi+[m^2a^2+(6\xi-1)a''/a]\chi=0$ です。
<!-- solution-end -->

<a id="ex-qcurv4-a04"></a>
#### QCURV4-A04 正振動数モードのWronskian
- Level: A

$\chi=e^{-i\omega\eta}/\sqrt{2\omega}$（$\omega>0$）について $i(\bar\chi\chi'-\bar\chi'\chi)$ を計算し、共役解の値も求めよ。

<!-- solution-start -->
**詳細解答。** $\chi'=-i\omega\chi$、$\bar\chi'=i\omega\bar\chi$ なので

$$
i(\bar\chi\chi'-\bar\chi'\chi)
=i(-2i\omega)|\chi|^2=2\omega(2\omega)^{-1}=1.
$$

共役解を第一の正モードと見なして同じ式へ入れると、二項の差が逆向きになり $-1$ です。従って正負モードはKG内積で逆符号になります。
<!-- solution-end -->

<a id="ex-qcurv4-a05"></a>
#### QCURV4-A05 共形結合と質量の判定
- Level: A

四次元平坦FLRWのモード振動数 $\Omega_k^2=k^2+m^2a^2+(6\xi-1)a''/a$ に、(i) $m=0,\xi=1/6$、(ii) $m>0,\xi=1/6$、(iii) $m=0,\xi=0$ を代入し、時間依存する部分を列挙せよ。

<!-- solution-start -->
**詳細解答。** (i) では $m^2a^2=0$、$6\xi-1=0$ のため $\Omega_k^2=k^2$。(ii) では曲率項は零だが $\Omega_k^2=k^2+m^2a^2$ に膨張が残ります。(iii) では質量項は零ですが $\Omega_k^2=k^2-a''/a$ です。(iii) が必ず変化するとは限りません。例えば $a''=0$ の区間なら時間依存項は零です。
<!-- solution-end -->

### Level B：仮定と主要計算の接続

<a id="ex-qcurv4-b01"></a>
#### QCURV4-B01 瞬間モード係数の保存量
- Level: B

$\Omega(\eta)>0$、$\chi''+\Omega^2\chi=0$ について、[瞬間モード係数](#def-qcurv4-amplitudes)が満たす二つの一階方程式を使い、$|A|^2-|B|^2$ が保存されることを証明せよ。$A(-\infty)=1,B(-\infty)=0$ の場合の値も示せ。

<!-- solution-start -->
**詳細解答。** [導出済みの一階方程式](#prop-qcurv4-smooth-ramp)で $\lambda=\Omega'/(2\Omega)\in\mathbb R$ とすると、$A'=\lambda e^{2i\theta}B$、$B'=\lambda e^{-2i\theta}A$。よって

$$
\begin{aligned}
\frac{d}{d\eta}(|A|^2-|B|^2)
&=2\operatorname{Re}(\bar AA'-\bar BB')\\
&=2\lambda\operatorname{Re}(
\bar ABe^{2i\theta}-\bar BAe^{-2i\theta})=0.
\end{aligned}
$$

括弧の第二項は第一項の共役であり、差の実部が零です。初期値で $|A|^2-|B|^2=1$ なので全時刻で1です。
<!-- solution-end -->

<a id="ex-qcurv4-b02"></a>
#### QCURV4-B02 tanh膨張のFourier係数
- Level: B

$s(\eta)=[1+\tanh(\eta/T)]/2$、$T,\omega>0$ とする。$\int_{-\infty}^\infty s'(\eta)e^{-2i\omega\eta}d\eta$ を求めよ。$\int_{\mathbb R}\operatorname{sech}^2x\,e^{-iqx}dx=\pi q/\sinh(\pi q/2)$（$q>0$）を使ってよい。

<!-- solution-start -->
**詳細解答。** $s'=(2T)^{-1}\operatorname{sech}^2(\eta/T)$、$x=\eta/T$ と置けば $d\eta=Tdx$、積分領域は依然として実数全体で

$$
\int_{\mathbb R}s'e^{-2i\omega\eta}d\eta
=\frac12\int_{\mathbb R}\operatorname{sech}^2x\,e^{-i(2\omega T)x}dx
=\frac12\frac{\pi(2\omega T)}{\sinh(\pi\omega T)}.
$$

従って答えは $\pi\omega T/\sinh(\pi\omega T)$ です。$T\to0$ で $1$ へ近づくのは $\int s' d\eta=s(+\infty)-s(-\infty)=1$ とも整合します。
<!-- solution-end -->

<a id="ex-qcurv4-b03"></a>
#### QCURV4-B03 対向波数と粒子数
- Level: B

周期体積 $L^3$ 上で、同じ $k=|\boldsymbol k|>0$ の解が $\chi_k^{\rm in}=A_k\chi_k^{\rm out}+B_k\bar\chi_k^{\rm out}$、$|A_k|^2-|B_k|^2=1$ を満たすとする。実場の全時空モードでは、負振動数部分が $-\boldsymbol k$ の複素共役outモードへ結び付く理由を示し、in真空のout粒子数を求めよ。

<!-- solution-start -->
**詳細解答。** $u_{\boldsymbol k}=L^{-3/2}a^{-1}\chi_k e^{i\boldsymbol k\cdot\boldsymbol x}$ であり、

$$
\overline{u_{-\boldsymbol k}^{\rm out}}
=\frac{\bar\chi_k^{\rm out}e^{i\boldsymbol k\cdot\boldsymbol x}}
{aL^{3/2}},
$$

なので展開は $u_{\boldsymbol k}^{\rm in}=A_ku_{\boldsymbol k}^{\rm out}+B_k\overline{u_{-\boldsymbol k}^{\rm out}}$ です。ここでは $\chi_k=\chi_{-k}$ の等方的選択を仮定しています。[前章のBogoliubov粒子数](../QCURV3/index.md#prop-qcurv3-number)では相手波数だけが負振動数係数を持つので $\langle N_{\boldsymbol k}^{\rm out}\rangle_{\rm in}=|B_k|^2$ です。$|A_k|^2-|B_k|^2=1$ はこの係数が正準規格化と矛盾しないことを保証します。
<!-- solution-end -->

<a id="ex-qcurv4-b04"></a>
#### QCURV4-B04 急変極限と断熱的抑制
- Level: B

$m,a_0,T,\omega>0$、$\mu=ma_0$、$0<\varepsilon\ll1$ とする。[弱い膨張の粒子数](#prop-qcurv4-smooth-ramp)の $\varepsilon^2$ 係数を $x=\pi\omega T$ で表し、$x\to0$ と $x\to\infty$ の主要形を求めよ。

<!-- solution-start -->
**詳細解答。** $\varepsilon^2$ の係数は

$$
C(T)=\frac{\pi^2\mu^4 T^2}{16\omega^2\sinh^2(\pi\omega T)}
=\frac{\mu^4}{16\omega^4}\left(\frac{x}{\sinh x}\right)^2.
$$

$x\to0$ で $\sinh x=x+x^3/6+O(x^5)$、よって $(x/\sinh x)^2\to1$ から $C\to\mu^4/(16\omega^4)$。$x\to\infty$ では $\sinh x=(e^x-e^{-x})/2\sim e^x/2$ なので $C\sim\mu^4x^2e^{-2x}/(4\omega^4)$ です。これは固定 $\omega,\mu$ での係数の極限であり、全誤差の一様性を主張しません。
<!-- solution-end -->

### Level C：時空・真空・近似を統合する

<a id="ex-qcurv4-c01"></a>
#### QCURV4-C01 同じ膨張でも場によって粒子生成は異なる
- Level: C

$M=\mathbb R\times\mathbb T_L^3$、$a^2=a_0^2[1+\varepsilon(1+\tanh(\eta/T))/2]$、$a_0,T>0$、$0<\varepsilon\ll1$ とする。以下の二つの自由実スカラー場について、共に共形時間のin/out基底を用いる。

1. $m=0,\xi=1/6$ の場の非零波数モード。
2. $m>0,\xi=1/6$ の場の任意の固定波数モード。

それぞれの再スケーリング後の方程式、in/outの漸近振動数、生成粒子数を求めよ。第二の場合は $\varepsilon^2$ まで求め、弱摂動の誤差と、第一の場合の零波数への注意を述べよ。

<!-- solution-start -->
**詳細解答。** [FLRWモード方程式](#prop-qcurv4-mode)の $\xi=1/6$ では $a''/a$ の項が消えます。

**第一の場。** $m=0$ なら $\chi_k''+k^2\chi_k=0$ です。$k>0$ について両端の振動数は $\omega_-=\omega_+=k$、正規化モード $\chi_k=e^{-ik\eta}/\sqrt{2k}$ を両端で使えるので $A_k=1,B_k=0$。[非生成定理](#thm-qcurv4-conformal)により $\langle N_k^{\rm out}\rangle_{\rm in}=0$ であり、この結論は $\varepsilon$ の高次を含めて厳密です。一方 $k=0$ は $\omega=0$ で $1/\sqrt{2k}$ が定義できず、この議論からは除きます。

**第二の場。** $\mu=ma_0>0$、$\omega=\sqrt{k^2+\mu^2}$ として

$$
\chi_k''+\left[\omega^2+\varepsilon\mu^2
\frac{1+\tanh(\eta/T)}2\right]\chi_k=0,
$$

$$
\omega_-=\omega,\qquad \omega_+=\sqrt{\omega^2+\varepsilon\mu^2}>0.
$$

一階の混合方程式は[瞬間係数の計算](#prop-qcurv4-smooth-ramp)から

$$
B_k=\frac{\varepsilon\mu^2}{4\omega^2}
\int_{-\infty}^{\infty}\frac{\operatorname{sech}^2(\eta/T)}{2T}
e^{-2i\omega\eta}d\eta+O(\varepsilon^2).
$$

$x=\eta/T$ に替え、[Fourier積分](#prop-qcurv4-smooth-ramp)を使えば

$$
B_k=\frac{\varepsilon\pi\mu^2 T}{4\omega\sinh(\pi\omega T)}
+O(\varepsilon^2).
$$

従って[粒子数公式](#prop-qcurv4-wronskian-number)で

$$
\langle N_{\boldsymbol k}^{\rm out}\rangle_{\rm in}
=\frac{\varepsilon^2\pi^2\mu^4T^2}
{16\omega^2\sinh^2(\pi\omega T)}+O(\varepsilon^3).
$$

誤差は固定した波数・時間尺度での $\varepsilon\to0$ の主張です。二つの場が同じ膨張を受けても、第一では質量項も曲率項も相殺され、第二では質量項 $m^2a^2$ が残ることが相違の原因です。後者の各固定波数の正の係数から、全モード和の収束や観測者によらない粒子概念を直接結論してはいけません。
<!-- solution-end -->
