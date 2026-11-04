# QCURV19 de Sitterの宇宙論的地平線とGibbons–Hawking温度

<!-- definition-example-audit: strict -->

[QCURV11のHawking温度](../QCURV11/index.md#thm-qcurv11-thermal-ratio)は、崩壊ブラックホールの入射真空と後期出射波束を結び付けた結果でした。しかし、宇宙が指数的に膨張する場合には、崩壊する星も、遠方の無限遠領域もありません。それでも、一人の観測者が到達できる領域には地平線があり、場を適切な状態に置けば検出器は熱的に応答します。

この違いを理解するため、**同じde Sitter時空を膨張宇宙の座標と静止観測者の座標で記述し、場の状態を固定してから検出器の応答を計算**します。道筋は「平坦FLRW表示 → 静的パッチ → Bunch–Davies状態 → 二点関数 → 定常検出器の温度 → 観測者と状態の比較」です。

背景は四次元、計量符号は $(-,+,+,+)$、単位は $\hbar=c=k_B=1$ です。背景の膨張率を $H>0$ とします。量子場は固定した背景上の自由な**質量零・共形結合**の実スカラー場に限定して、二点関数と温度を明示的に導出します。温度の存在自体はより広い場にも現れますが、そのための一般的な状態構成と赤外問題をこの可解模型の計算から無条件に推論しません。

## 1. 膨張宇宙の時計と、観測者の地平線

[QCURV4の平坦FLRW計量](../QCURV4/index.md#def-qcurv4-flrw)では、空間の共動座標 $\boldsymbol x$ を固定した時計の固有時間を $t$ とし、正のスケール因子 $a(t)$ が空間距離を拡大しました。今回は $a(t)=e^{Ht}$ と置きます。$H$ は逆時間の次元で一定です。

共形時間 $\eta$ は $d\eta=dt/a(t)$ を満たします。未来の $t\to+\infty$ で $\eta\to0$ となる原点を選ぶと、$\eta=-e^{-Ht}/H<0$、$a(\eta)=-1/(H\eta)$ です。空間は $\mathbb R^3$ とし、ここで使う平坦座標系はde Sitter時空全体ではなく膨張するPoincaréパッチを覆います。

<a id="def-qcurv19-de-sitter-flat"></a>

<!-- formal-statement-start -->
> **定義（de Sitterの平坦FLRW背景）**
> $H>0$ を定数とし、$M_{\rm flat}=\mathbb R_t\times\mathbb R^3_{\boldsymbol x}$ に

$$
ds^2=-dt^2+e^{2Ht}d\boldsymbol x^2
=\frac1{H^2\eta^2}(-d\eta^2+d\boldsymbol x^2),
\qquad \eta=-H^{-1}e^{-Ht}<0
$$

> を置く。これは四次元de Sitter時空の膨張平坦パッチであり、$H$ をde Sitter膨張率という。Ricciスカラーは $R=12H^2$ である。$\boldsymbol x=\text{const}$ の世界線の固有時間は $t$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv19-de-sitter-flat -->
### 直接例：スケール因子と曲率を自分で確かめる

$H=1/L$（$L>0$ は長さ）を選ぶと、$t=0$ で $a=1$、$t=L\log2$ で $a=2$ です。$d\eta/dt=e^{-Ht}=1/a>0$ で、$\eta(0)=-L$、$\eta(L\log2)=-L/2$ となります。[QCURV4の曲率公式](../QCURV4/index.md#prop-qcurv4-mode)に $a(\eta)=-(H\eta)^{-1}$ を代入すると

$$
a'=\frac1{H\eta^2},\qquad
a''=-\frac2{H\eta^3},\qquad
\frac{6a''}{a^3}=12H^2>0.
$$

**定義の確認**：$a>0$、$\eta<0$、時間方向の計量成分 $g_{\eta\eta}=-a^2<0$、空間方向 $g_{ij}=a^2\delta_{ij}>0$ が揃います。また $d\boldsymbol x=0$ なら $ds^2=-dt^2$ です。これで定義に含まれる時間の範囲・計量符号・曲率・時計を直接確認しました。
<!-- definition-example-end -->

### いま光が届く範囲

半径方向の光は $ds^2=0$ より $|d\boldsymbol x/dt|=e^{-Ht}$ を満たします。時刻 $t_0$ から無限の未来まで光が進める共動半径は

$$
\int_{t_0}^{+\infty}e^{-Ht}\,dt
=\frac{e^{-Ht_0}}H,
$$

その時刻での固有距離は $a(t_0)e^{-Ht_0}/H=H^{-1}$ です。この距離は、中心の観測者へ将来信号を送れる範囲の境界を予告します。ただし「時刻一定面上の距離」と「観測者の固有加速度」は別物です。

中心を固定して見るには、共動半径 $\rho=|\boldsymbol x|$ の代わりに固有半径 $r=e^{Ht}\rho$ を用います。中心の時計で測る新しい時間を $T$ と書きます。次の静的表示は $0\le r<H^{-1}$ の内部だけで成り立ちます。

<a id="def-qcurv19-static-patch"></a>

<!-- formal-statement-start -->
> **定義（de Sitter静的パッチと宇宙論的地平線）**
> $H>0$ とし、$f(r):=1-H^2r^2$ と置く。$0\le r<H^{-1}$ での静的座標 $(T,r,\theta,\varphi)$ は

$$
ds^2=-f(r)\,dT^2+\frac{dr^2}{f(r)}
+r^2(d\theta^2+\sin^2\theta\,d\varphi^2).
$$

> $\partial_T$ は時間並進のKillingベクトルで、中心 $r=0$ ではその時計 $T$ が固有時間に等しい。$r=H^{-1}$ は中心観測者の**宇宙論的地平線**であり、静止世界線 $r=\text{const}$ の固有時間は $d\tau=\sqrt{f(r)}\,dT$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv19-static-patch -->
### 直接例：中心と半径 $r=(\sqrt2H)^{-1}$ の時計

中心では $f(0)=1$、$d\tau=dT$ で、静的時刻の規格化が確定します。$r=(\sqrt2H)^{-1}$ は地平線内にあり、$f=1/2$、$d\tau=dT/\sqrt2$ です。いずれも $f>0$ のため $\partial_T$ は時間的です。一方 $r\to H^{-1}$ で $f\to0$ となり、$r$ を固定した観測者の世界線は地平線上まで時間的なまま延ばせません。

**定義の確認**：$g_{TT}=-f<0$、$g_{rr}=1/f>0$、角方向の計量は正です（球座標の軸では別座標を使います）。これで静的パッチの範囲、Lorentz符号、静止時計の条件を確認しました。
<!-- definition-example-end -->

<a id="prop-qcurv19-static-transform"></a>

<!-- formal-statement-start -->
> **命題（平坦表示から静的表示への座標変換）**
> [平坦de Sitter背景](#def-qcurv19-de-sitter-flat)で $\rho=|\boldsymbol x|$ とし、$r=e^{Ht}\rho<H^{-1}$ を取る。座標を

$$
T=t-\frac1{2H}\log(1-H^2r^2)
$$

> で定めると、計量は[静的パッチ](#def-qcurv19-static-patch)の形となる。$r=0$ の共動世界線では $T=t$ である。
<!-- formal-statement-end -->

### 証明の見取り図

膨張する共動半径を固有半径にすると、時間・半径の交差項が生じます。その交差項を消す時間のずらし方が対数項を決めます。

<!-- proof-start -->
### 証明

極座標の角部分を $d\Omega_2^2$ と書きます。$r=e^{Ht}\rho$ の微分は $e^{Ht}d\rho=dr-Hr\,dt$ なので、

$$
\begin{aligned}
ds^2
&=-dt^2+(dr-Hr\,dt)^2+r^2d\Omega_2^2\\
&=-f\,dt^2-2Hr\,dt\,dr+dr^2+r^2d\Omega_2^2.
\end{aligned}
$$

$T=t-(2H)^{-1}\log f$ を微分し、$f'=-2H^2r$ を代入すると

$$
dT=dt+\frac{Hr}{f}\,dr,\qquad
dt=dT-\frac{Hr}{f}\,dr.
$$

計量へ代入すれば $dT\,dr$ の係数は $2Hr-2Hr=0$、$dr^2$ の係数は

$$
-\frac{H^2r^2}{f}
+\frac{2H^2r^2}{f}+1
=\frac{f+H^2r^2}{f}=\frac1f.
$$

したがって $ds^2=-f\,dT^2+f^{-1}dr^2+r^2d\Omega_2^2$ です。変換は $f>0$ で滑らかで、$r=0$ では対数項が零になります。
<!-- proof-end -->

地平線の表面重力は、中心で $\partial_T$ の長さを1に規格化した静的計量では $\kappa=|f'(H^{-1})|/2=H$ です。[QCURV9のSchwarzschild表面重力](../QCURV9/index.md#prop-qcurv9-kappa)とは規格化の基準が異なり、de Sitterには静的パッチの外に漸近平坦な無限遠がありません。

## 2. 状態の選択：どの「真空」を比較するか

膨張していることだけでは量子場の状態は定まりません。[QCURV4の共形真空](../QCURV4/index.md#def-qcurv4-conformal-vacuum)は、共形時間の平面波を正振動数として選ぶ状態です。de Sitterでは、適切な正則性と対称性を持つ**Bunch–Davies（Euclidean）状態**を選びます。

まず四次元実スカラー場の作用素を[QCURV1の曲率結合Klein–Gordon作用素](../QCURV1/index.md#def-qcurv1-kg-operator)に従い $P=-\Box_g+m^2+\xi R$ とします。ここでは $m=0$、$\xi=1/6$ と固定します。$a(\eta)=-1/(H\eta)$、$\chi=a\phi$ です。[FLRWの再スケーリング後のモード方程式](../QCURV4/index.md#prop-qcurv4-mode)により

$$
\chi_{\boldsymbol k}''+
\left[k^2+(6\xi-1)\frac{a''}{a}\right]\chi_{\boldsymbol k}
=\chi_{\boldsymbol k}''+k^2\chi_{\boldsymbol k}=0.
$$

この取消しは、質量零・共形結合という**両方**の仮定を用います。各非零波数 $k=|\boldsymbol k|>0$ に対し、過去の共形時間で $e^{-ik\eta}$ を正周波数として選びます。無限体積 $\mathbb R^3$ のモードはDiracデルタ規格化で解釈します。

<a id="def-qcurv19-bunch-davies"></a>

<!-- formal-statement-start -->
> **定義（共形スカラー場のBunch–Davies状態）**
> $H>0$ の[四次元de Sitter平坦パッチ](#def-qcurv19-de-sitter-flat)、$m=0$、$\xi=1/6$ の自由実スカラー場に対し、各 $\boldsymbol k\in\mathbb R^3\setminus\{\boldsymbol0\}$ の正周波数モードを

$$
u_{\boldsymbol k}(\eta,\boldsymbol x)
=\frac{e^{-ik\eta+i\boldsymbol k\cdot\boldsymbol x}}
{a(\eta)(2\pi)^{3/2}\sqrt{2k}}
$$

> とする。場を次のように展開する。

$$
\phi(x)=\int_{\mathbb R^3}d^3k\,
\left[a_{\boldsymbol k}u_{\boldsymbol k}(x)
+a_{\boldsymbol k}^{\dagger}u_{\boldsymbol k}^{*}(x)\right].
$$

> すべての $\boldsymbol k$ に対して $a_{\boldsymbol k}|0_{\rm BD}\rangle=0$ を満たす準自由Fock状態を、この模型の**Bunch–Davies状態**と呼ぶ。これは共形真空であり、後述するde Sitter不変で短距離Hadamard型の二点関数を与える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv19-bunch-davies -->
### 直接例：波数 $\boldsymbol k=(k,0,0)$ のモード

$k>0$ を固定すると $\chi_{\boldsymbol k}=a u_{\boldsymbol k}$ は $e^{-ik\eta}$ に比例し、$\chi_{\boldsymbol k}''=-k^2\chi_{\boldsymbol k}$ です。複素共役と組にした時間部分 $v=e^{-ik\eta}/\sqrt{2k}$ は

$$
v\,v^{*\prime}-v'\,v^*
=\frac{ik}{2k}+\frac{ik}{2k}=i.
$$

このWronskianが[QCURV2の保存KG内積](../QCURV2/index.md#thm-qcurv2-conservation)によるモード規格化に対応します（連続運動量では空間積分が $(2\pi)^3\delta^3(\boldsymbol k-\boldsymbol k')$ を作ります）。**定義の確認**：$k>0$、$a>0$、波動方程式、正周波数、正規化を確認しました。$k=0$ の単独モードを無理に $1/\sqrt{k}$ へ代入するのでなく、場の二点分布を積分として定義します。
<!-- definition-example-end -->

一般の質量・結合では、Euclid的正則性を用いたBunch–Davies状態の存在条件とモード関数が変わります。とくに**質量零・最小結合 $\xi=0$** では赤外零モードの問題があり、上の共形真空の構成をそのまま転用できません。通常の意味でde Sitter不変なFock真空が存在しないことが知られています（B. Allen, *Phys. Rev. D* **32** (1985), 3136）。この例外は後の演習でも方程式から確認します。

## 3. 二点関数が静的パッチでどう見えるか

検出器に入るのはモードの名前ではなく、[QCURV6の二点関数による応答](../QCURV6/index.md#def-qcurv6-response)です。状態を固定した後で、時空点 $x,x'$ に対するWightman二点関数 $W_{\rm BD}(x,x')=\langle0_{\rm BD}|\phi(x)\phi(x')|0_{\rm BD}\rangle$ を求めます。分布の境界値を指定するため、共形時間差には $\Delta\eta-i\epsilon$（$\epsilon\downarrow0$）を入れます。

<a id="thm-qcurv19-bd-wightman"></a>

<!-- formal-statement-start -->
> **定理（共形スカラー場のBunch–Davies二点関数）**
> [Bunch–Davies状態](#def-qcurv19-bunch-davies)の四次元質量零・共形結合自由場について、$\eta,\eta'<0$、$\boldsymbol x,\boldsymbol x'\in\mathbb R^3$ とする。二点関数は分布の境界値として

$$
W_{\rm BD}(x,x')
=\lim_{\epsilon\downarrow0}
\frac{H^2\eta\eta'}{4\pi^2}
\frac1{|\boldsymbol x-\boldsymbol x'|^2
-(\eta-\eta'-i\epsilon)^2}.
$$

> 非光的分離で $Z:=1+\bigl[(\eta-\eta')^2-|\boldsymbol x-\boldsymbol x'|^2\bigr]/(2\eta\eta')$ とすれば

$$
W_{\rm BD}(x,x')=\frac{H^2}{8\pi^2(1-Z)}
$$

> と書ける（光的・時間的分離では上の $i\epsilon$ 境界値を保持する）。$Z$ はde Sitterの埋込み内積で表せる不変量である。中心の共動世界線 $\boldsymbol x=\boldsymbol0$、固有時差 $s=t-t'$ 上では

$$
\boxed{
W_{\rm BD}(s)
=-\lim_{\epsilon\downarrow0}
\frac{H^2}{16\pi^2\sinh^2[H(s-i\epsilon)/2]}.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

モード積分は、平坦時空の質量零Wightman関数に $1/[a(\eta)a(\eta')]$ を掛けた形です。中心世界線では $\eta(t)$ の指数差が双曲正弦に変わります。対数的な切替や粒子数の概念を追加する必要はありません。

<!-- proof-start -->
### 証明

Fock真空の収縮 $\langle a_{\boldsymbol k}a_{\boldsymbol k'}^\dagger\rangle=\delta^3(\boldsymbol k-\boldsymbol k')$ と定義のモードを用いると

$$
W_{\rm BD}
=\frac1{a(\eta)a(\eta')}
\int_{\mathbb R^3}\frac{d^3k}{(2\pi)^3\,2k}
e^{-ik(\eta-\eta'-i\epsilon)}
e^{i\boldsymbol k\cdot(\boldsymbol x-\boldsymbol x')}.
$$

まず空間距離 $R_x=|\boldsymbol x-\boldsymbol x'|>0$ と置き、角度積分 $\int_{S^2}e^{ikR_x\cos\theta}d\Omega=4\pi\sin(kR_x)/(kR_x)$ を行うと

$$
\begin{aligned}
\int\frac{d^3k}{(2\pi)^3\,2k}e^{-ik(\Delta\eta-i\epsilon)}e^{i\boldsymbol k\cdot\Delta\boldsymbol x}
&=\frac1{4\pi^2R_x}\int_0^\infty e^{-ik(\Delta\eta-i\epsilon)}
\sin(kR_x)\,dk\\
&=\frac1{4\pi^2[R_x^2-(\Delta\eta-i\epsilon)^2]}.
\end{aligned}
$$

最後の積分は $\epsilon>0$ で収束させ、$\sin(kR_x)$ を二つの指数関数へ分けて積分したものです。$R_x\to0$ も分布極限で定義します。$a^{-1}(\eta)a^{-1}(\eta')=H^2\eta\eta'$ を掛ければ第一式です。

$1-Z=[R_x^2-(\Delta\eta)^2]/(2\eta\eta')$ を代入すれば第二式が従います。埋込み五次元Minkowski計量の超曲面 $-X_0^2+\sum_{i=1}^4X_i^2=H^{-2}$ に対して $Z=H^2\eta_{AB}X^A(x)X^B(x')$ であるため、非光的な式はde Sitter等長変換で不変です。$i\epsilon$ は時間順序を区別する境界値です。

中心では $\eta(t)\eta(t')=H^{-2}e^{-H(t+t')}$ および

$$
\eta(t)-\eta(t')
=\frac2H e^{-H(t+t')/2}\sinh\!\left(\frac{H(t-t')}{2}\right).
$$

これを第一式の $R_x=0$ に代入し、正の時間依存因子を打ち消すと最後の双曲正弦表示を得ます。$i\epsilon$ は変換後も正しい正周波数境界値として理解します。
<!-- proof-end -->

### 直接確認：非常に短い固有時間では平坦時空へ戻る

$Hs$ が小さいと $\sinh[H(s-i\epsilon)/2]\sim H(s-i\epsilon)/2$ なので

$$
W_{\rm BD}(s)\sim-\frac1{4\pi^2(s-i\epsilon)^2}.
$$

これは[QCURV6で求めた慣性世界線の真空相関](../QCURV6/index.md#prop-qcurv6-inertial-spectrum)と一致します。$H\to0$ の極限でも同じです。短距離でMinkowski型の特異性を持つことと、有限時差で熱的な性質を持つことは矛盾しません。

## 4. 自由落下している中心の検出器が熱を測る

中心 $r=0$ で静止する観測者は、$t=T=\tau$ と進む共動・測地線観測者です。その固有加速度は零です。それでも[前節で求めた $W_{\rm BD}$](#thm-qcurv19-bd-wightman)は、Minkowski真空の慣性世界線に沿う $W_0$ とは有限時差で異なります。

検出器のエネルギー間隔を $\Omega\in\mathbb R$ とし、$\Omega>0$ を励起、$\Omega<0$ を脱励起とします。[QCURV6の定常遷移率](../QCURV6/index.md#def-qcurv6-stationary-rate)は、長時間にわたり定常世界線へ結合した検出器について、二点分布のFourier変換

$$
\dot{\mathcal F}(\Omega)
=\int_{-\infty}^{+\infty}e^{-i\Omega s}
W_{\rm BD}(s)\,ds
$$

で与えられます。有限時間の切替応答へこの定常率をそのまま代入することはできません。[QCURV8で定義した検出器の励起・脱励起率の関係](../QCURV8/index.md#def-qcurv8-detailed-balance)では、$\dot{\mathcal F}(\Omega)/\dot{\mathcal F}(-\Omega)=e^{-\beta\Omega}$（$\Omega>0$）のとき、検出器の温度を $T=\beta^{-1}$ と読みます。

<a id="thm-qcurv19-gh-detector"></a>

<!-- formal-statement-start -->
> **定理（静的パッチ中心のGibbons–Hawking検出器温度）**
> $H>0$、四次元de Sitter上の質量零・共形結合自由場の[Bunch–Davies状態](#def-qcurv19-bunch-davies)を仮定する。静的パッチ中心 $r=0$ の測地線に沿うUnruh–DeWitt検出器の、定常長時間極限の遷移率は、$\Omega\ne0$ に対して

$$
\boxed{\dot{\mathcal F}(\Omega)
=\frac{\Omega}{2\pi(e^{2\pi\Omega/H}-1)}}
$$

> である。$\Omega=0$ では連続極限 $H/(4\pi^2)$ を用いる。任意の $\Omega>0$ で

$$
\frac{\dot{\mathcal F}(\Omega)}
{\dot{\mathcal F}(-\Omega)}
=e^{-2\pi\Omega/H},
\qquad
\boxed{T_{\rm GH}=\frac{H}{2\pi}=\frac{\kappa}{2\pi}.}
$$

> この温度は指定した状態・観測者・定常極限での検出器の励起率と脱励起率の指数比を表し、遠方へ放射が流れることを仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

中心世界線の二点関数の双曲正弦は、虚数時間方向へ $2\pi/H$ だけずらすと同じ関数形を持ちます。熱性を直接確認するには、その二階極のFourier積分を計算するのが確実です。$\Omega>0$ なら複素平面の下半分へ閉じ、$\Omega<0$ なら上半分へ閉じます。

<!-- proof-start -->
### 証明

[二点関数](#thm-qcurv19-bd-wightman)に $\epsilon>0$ を入れた関数を積分します。$\sinh[H(s-i\epsilon)/2]$ の零点は

$$
s_n=i\epsilon+\frac{2\pi i n}{H},
\qquad n\in\mathbb Z
$$

で、各点は二階極です。$s=s_n+z$ の近くでは

$$
-\frac{H^2}{16\pi^2\sinh^2(Hz/2)}
=-\frac1{4\pi^2z^2}+O(1).
$$

したがって $e^{-i\Omega s}W(s)$ の留数は、指数関数の一次項から

$$
\operatorname{Res}_{s=s_n}
\bigl(e^{-i\Omega s}W(s)\bigr)
=\frac{i\Omega}{4\pi^2}e^{-i\Omega s_n}.
$$

$\Omega>0$ の場合、$e^{-i\Omega s}$ は下半平面で減衰します。下向きに閉じた輪郭は時計回りで、囲む極は $n=-1,-2,\dots$ です。輪郭の大きな水平・垂直部分を避ける通常の極限を取り、$\epsilon\downarrow0$ とすると

$$
\begin{aligned}
\dot{\mathcal F}(\Omega)
&=-2\pi i\sum_{n=-\infty}^{-1}
\frac{i\Omega}{4\pi^2}e^{-i\Omega(2\pi in/H)}\\
&=\frac{\Omega}{2\pi}
\sum_{m=1}^{\infty}e^{-2\pi m\Omega/H}\\
&=\frac{\Omega}{2\pi}
\frac{e^{-2\pi\Omega/H}}{1-e^{-2\pi\Omega/H}}
=\frac{\Omega}{2\pi(e^{2\pi\Omega/H}-1)}.
\end{aligned}
$$

$\Omega<0$ では複素 $s$ 平面の $\operatorname{Im}s>0$ 側へ反時計回りに閉じ、$n=0,1,\dots$ を取ります。同じ二階極の留数から

$$
\dot{\mathcal F}(\Omega)
=\frac{-\Omega}{2\pi}\sum_{n=0}^\infty
e^{2\pi n\Omega/H}
=\frac{-\Omega}{2\pi(1-e^{2\pi\Omega/H})}
=\frac{\Omega}{2\pi(e^{2\pi\Omega/H}-1)}
$$

となります。$\Omega>0$ に対して二式の商は $e^{-2\pi\Omega/H}$ です。[QCURV8で定義した検出器の励起・脱励起率の関係](../QCURV8/index.md#def-qcurv8-detailed-balance)で $\beta=2\pi/H$ と読み、$T_{\rm GH}=1/\beta=H/(2\pi)$ を得ます。$\Omega\to0$ は $e^x-1\sim x$ を使って $H/(4\pi^2)$ です。

最後に地平線表面重力は前節の $\kappa=H$ なので $T_{\rm GH}=\kappa/(2\pi)$ です。検出器の結合定数や行列要素はここでは共通因子として取り除いた応答率を使いました。
<!-- proof-end -->

この計算は[QCURV8のUnruh検出器](../QCURV8/index.md#thm-qcurv8-unruh)と同じ関数形を持ちますが、原因は異なります。Unruhの場合は**平坦時空で加速**する検出器、ここでは**曲がった時空で自由落下**する中心検出器です。温度だけを等しくして「同じ物理状況」としてはいけません。

## 5. 中心以外の静止時計では温度はどう変わるか

半径 $r$ を保つ静止観測者は $d\tau=\sqrt f\,dT$ と進みます。先ほどの温度は中心の時計 $T$ での値でした。[QCURV14のTolman則](../QCURV14/index.md#thm-qcurv14-tolman)を使うには、状態が静的時間に関してKMS性を持ち、かつ $f>0$ の静止世界線を測定するという条件が必要です。この模型では二点関数からも直接確認できます。

de Sitterの五次元平坦空間への埋込みを考えます。五次元の計量を $-dX_0^2+\sum_{i=1}^4dX_i^2$ とし、超曲面 $-X_0^2+\sum_{i=1}^4X_i^2=H^{-2}$ を取ります。静的パッチで $f=1-H^2r^2$、単位方向ベクトル $\boldsymbol n$ に対して

$$
X_0=\frac{\sqrt f}H\sinh(HT),\quad
X_4=\frac{\sqrt f}H\cosh(HT),\quad
(X_1,X_2,X_3)=r\boldsymbol n.
$$

同じ $r,\boldsymbol n$ の二点について不変量 $Z=H^2\eta_{AB}X^A X'^B$ を代入すると

$$
Z=H^2r^2+f\cosh[H(T-T')]
=1+2f\sinh^2[H(T-T')/2].
$$

従って[不変な二点関数](#thm-qcurv19-bd-wightman)を静止世界線へ制限すれば、固有時差 $s=\tau-\tau'=\sqrt f(T-T')$ に対して

$$
W_r(s)=-\frac{H^2}{16\pi^2 f}
\frac1{\sinh^2[H(s-i0)/(2\sqrt f)]}.
$$

中心の式の $H$ を $H/\sqrt f$ に置き換えた形です。なお $r=0$ 以外の静止世界線は測地線ではありません。

<a id="prop-qcurv19-local-temperature"></a>

<!-- formal-statement-start -->
> **命題（静的パッチの局所温度と固有加速度）**
> $H>0$、四次元de Sitterの質量零・共形結合自由場をBunch–Davies状態に置く。静的パッチの $0\le r<H^{-1}$ で静止する検出器の定常温度と固有加速度の大きさは

$$
\boxed{T_{\rm loc}(r)=\frac{H}{2\pi\sqrt{1-H^2r^2}}},
\qquad
\boxed{a_{\rm prop}(r)=\frac{H^2r}{\sqrt{1-H^2r^2}}}.
$$

> 両者は次の関係を満たす。

$$
\boxed{(2\pi T_{\rm loc})^2=H^2+a_{\rm prop}^2.}
$$

> 中心では $a_{\rm prop}(0)=0$ だが $T_{\rm loc}(0)=H/(2\pi)>0$。$r\to H^{-1}$ の発散は地平線へ静止観測者を近付ける極限についてのものであり、地平線上に静止した物理観測者が存在するという意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

温度は世界線の固有時でFourier変換した二点関数から決まります。加速度は静的計量のChristoffel記号と四元速度から計算します。両者が一致するとは限らず、de Sitter曲率に由来する $H^2$ の項が残ります。

<!-- proof-start -->
### 証明

直前の二点関数で $\lambda:=H/\sqrt f>0$ とすると

$$
W_r(s)=-\frac{\lambda^2}{16\pi^2\sinh^2[\lambda(s-i0)/2]}.
$$

[中心のFourier積分](#thm-qcurv19-gh-detector)の $H$ を $\lambda$ に置き換えられるため、$\dot{\mathcal F}_r(\Omega)=\Omega/[2\pi(e^{2\pi\Omega/\lambda}-1)]$ です。従ってこの静止検出器が測る温度は $T_{\rm loc}=\lambda/(2\pi)=H/(2\pi\sqrt f)$。これは[静止KMS状態のTolman則](../QCURV14/index.md#thm-qcurv14-tolman)の $T_{\rm loc}\sqrt f=T_{\rm GH}$ と一致します。

静止世界線の四元速度は $u^T=f^{-1/2}$、$u^r=u^\theta=u^\varphi=0$ です。静的計量の $g_{TT}=-f$、$g^{rr}=f$ を使うと

$$
\Gamma^r_{TT}=-\frac12g^{rr}\partial_r g_{TT}
=\frac12ff'(r),\qquad
a^r=u^T u^T\Gamma^r_{TT}=\frac{f'}2=-H^2r.
$$

よって $a_{\rm prop}^2=g_{rr}(a^r)^2=H^4r^2/f$、$a_{\rm prop}=H^2r/\sqrt f$。最後に

$$
H^2+a_{\rm prop}^2
=\frac{H^2(f+H^2r^2)}f
=\frac{H^2}{f}=(2\pi T_{\rm loc})^2.
$$

$f=1-H^2r^2>0$ を用いたので各平方根は正です。
<!-- proof-end -->

例えば $r=(\sqrt2H)^{-1}$ では $f=1/2$ で、$a_{\rm prop}=H$、$T_{\rm loc}=\sqrt2 H/(2\pi)$ です。加速度だけから予想した $a_{\rm prop}/(2\pi)=H/(2\pi)$ より高くなります。中心 $r=0$ では加速度による寄与は零ですが、曲率に由来する温度は残ります。

### 何を「放射」と呼んでいるのか

質量零共形スカラー場のこのBunch–Davies状態はde Sitter対称性を持ちます。状態と局所共変なくりこみを保つ $\langle T_{ab}\rangle_{\rm ren}$ は対称性のため $g_{ab}$ に比例し、静的な $T$–$r$ 混合成分はありません。すなわち**定常検出器の熱的励起は、ブラックホールから無限遠へ出る正味のエネルギー流束を意味しません**。[QCURV12の灰色体付き遠方流束](../QCURV12/index.md#thm-qcurv12-greybody-flux)をここへ輸入するための漸近平坦な無限遠もありません。

また、[QCURV8の有限時間切替](../QCURV8/index.md#prop-qcurv8-switching)では応答に切替のFourier幅が混入します。上のPlanck分母と厳密な励起・脱励起率の指数比は、定常・長時間極限に関する主張です。

## 6. 演習：座標・状態・検出器をつなぐ

各問では $H>0$、計量符号 $(-,+,+,+)$、自然単位を用います。特に断らない限り、質量零・共形結合の自由実スカラー場をBunch–Davies状態に置きます。

### Level A：時計・曲率・正振動数の入口

<a id="ex-qcurv19-a01"></a>
#### QCURV19-A01 共形時間と光の到達半径
- Level: A
- 問題: [平坦de Sitter背景](#def-qcurv19-de-sitter-flat)で $t_0=H^{-1}\log3$ とする。(a) $\eta(t_0)$、(b) そこから未来無限遠へ進む光の最大共動半径、(c) 時刻 $t_0$ での対応する固有半径を求めよ。

<!-- solution-start -->
**詳細解答**：$a(t)=e^{Ht}$ なので $a(t_0)=3$ です。(a) $\eta(t)=-e^{-Ht}/H$ に $t_0$ を入れ、

$$
\eta(t_0)=-\frac{e^{-\log3}}H=-\frac1{3H}.
$$

(b) 半径方向の零曲線では $0=-dt^2+a(t)^2d\rho^2$ なので $d\rho/dt=e^{-Ht}$（外向き）。よって

$$
\Delta\rho=\int_{t_0}^{\infty}e^{-Ht}dt
=\left[-\frac{e^{-Ht}}H\right]_{t_0}^{\infty}
=\frac1{3H}.
$$

(c) 固有半径は $a(t_0)\Delta\rho=3/(3H)=H^{-1}$。共動距離と固有距離は時刻 $t_0$ の倍率 $a(t_0)$ を入れて初めて比較できます。
<!-- solution-end -->

<a id="ex-qcurv19-a02"></a>
#### QCURV19-A02 静的パッチの時計と座標の条件
- Level: A
- 問題: $r=3/(5H)$ に静止する観測者について、(a) $f(r)$、(b) $d\tau/dT$、(c) 同じ半径での平坦座標の共動半径 $\rho(t)$、(d) 静的計量で $g_{TT},g_{rr}$ の符号を確認せよ。

<!-- solution-start -->
**詳細解答**：(a) $H^2r^2=9/25$ なので $f=1-9/25=16/25>0$。(b) [de Sitter静的パッチと宇宙論的地平線](#def-qcurv19-static-patch)の定義から $d\tau/dT=\sqrt f=4/5$。

(c) $r=e^{Ht}\rho(t)$ を一定に保つので

$$
\rho(t)=r e^{-Ht}=\frac3{5H}e^{-Ht},
\qquad \frac{d\rho}{dt}=-H\rho.
$$

従って静的半径を固定する観測者は、平坦座標での共動観測者ではありません。(d) $g_{TT}=-16/25<0$、$g_{rr}=25/16>0$。$r<H^{-1}$ の範囲が時間的Killing時計の条件です。
<!-- solution-end -->

<a id="ex-qcurv19-a03"></a>
#### QCURV19-A03 共形モードのWronskian
- Level: A
- 問題: $k=2H>0$ のモード $v(\eta)=e^{-ik\eta}/\sqrt{2k}$ について、(a) $v''+k^2v=0$、(b) $v\,v^{*\prime}-v'v^*=i$ を直接示せ。$\xi=1/6$ がなければどの項が残るかも答えよ。

<!-- solution-start -->
**詳細解答**：$v'=-ikv$、$v''=(-ik)^2v=-k^2v$ なので (a) が成立します。複素共役について $v^{*\prime}=ikv^*$。従って

$$
v\,v^{*\prime}-v'v^*
=ik|v|^2+ik|v|^2
=2ik\frac1{2k}=i.
$$

この条件が[定義のモード](#def-qcurv19-bunch-davies)の正規化を支えます。$\xi\ne1/6$ なら[再スケーリング方程式](../QCURV4/index.md#prop-qcurv4-mode)の $(6\xi-1)a''/a$ が残り、単純な平面波は一般には解になりません。
<!-- solution-end -->

<a id="ex-qcurv19-a04"></a>
#### QCURV19-A04 二点関数の短距離展開
- Level: A
- 問題: $s\ne0$、$|Hs|\ll1$ のとき

$$
W(s)=-\frac{H^2}{16\pi^2\sinh^2(Hs/2)}
$$

を $H^2$ の定数項まで展開せよ。$H\to0$ の極限で何が残るか述べよ（分布の特異点 $s=0$ への単純代入はしない）。

<!-- solution-start -->
**詳細解答**：$z=Hs/2$ と置けば $\sinh z=z+z^3/6+O(z^5)$ なので

$$
\frac1{\sinh^2z}
=\frac1{z^2}\left(1+\frac{z^2}6+O(z^4)\right)^{-2}
=\frac1{z^2}-\frac13+O(z^2).
$$

よって

$$
W(s)=-\frac1{4\pi^2s^2}
+\frac{H^2}{48\pi^2}+O(H^4s^2).
$$

固定した非零 $s$ で $H\to0$ とすれば $-1/(4\pi^2s^2)$ です。時間的な境界値としては $s$ を $s-i0$ に戻して、[Minkowski型二点関数](#thm-qcurv19-bd-wightman)の短距離特異性と一致します。
<!-- solution-end -->

<a id="ex-qcurv19-a05"></a>
#### QCURV19-A05 地平線と表面重力
- Level: A
- 問題: $H=2/L$（$L>0$）とする。静的パッチの (a) 地平線半径、(b) 中心で規格化されたKilling場の表面重力 $\kappa=|f'(r_H)|/2$、(c) Gibbons–Hawking温度を求めよ。各量の次元も確認せよ。

<!-- solution-start -->
**詳細解答**：$f=1-H^2r^2=0$ から $r_H=1/H=L/2$（長さ）。$f'=-2H^2r$ なので

$$
\kappa=\frac{|f'(r_H)|}{2}
=\frac{2H^2/H}{2}=H=\frac2L
$$

は逆長さです。[温度定理](#thm-qcurv19-gh-detector)より $T_{\rm GH}=\kappa/(2\pi)=1/(\pi L)$。自然単位では温度もエネルギーも逆長さです。無限遠がないので $f(0)=1$ による時計の規格化を忘れないことが重要です。
<!-- solution-end -->

### Level B：二点関数から温度と限界を検算する

<a id="ex-qcurv19-b01"></a>
#### QCURV19-B01 共形モード積分の符号と係数
- Level: B
- 問題: $\Delta\boldsymbol x=\boldsymbol0$ かつ $\epsilon>0$ のとき

$$
I(\Delta\eta,\epsilon)
=\int\frac{d^3k}{(2\pi)^3\,2k}
e^{-ik(\Delta\eta-i\epsilon)}
$$

を球座標で積分し、$-1/[4\pi^2(\Delta\eta-i\epsilon)^2]$ を得よ。さらに $[a(\eta)a(\eta')]^{-1}=H^2\eta\eta'$ を掛けて中心の時差 $s$ へ変換せよ。

<!-- solution-start -->
**詳細解答**：角度積分は $4\pi$ を与え、$d^3k=k^2dk\,d\Omega$ なので

$$
I=\frac{4\pi}{2(2\pi)^3}
\int_0^\infty k e^{-(\epsilon+i\Delta\eta)k}dk
=\frac1{4\pi^2}\frac1{(\epsilon+i\Delta\eta)^2}.
$$

$\epsilon+i\Delta\eta=i(\Delta\eta-i\epsilon)$ だから $1/(\epsilon+i\Delta\eta)^2=-1/(\Delta\eta-i\epsilon)^2$。これが要求された符号です。

$a(\eta)^{-1}=-H\eta$ より $[a(\eta)a(\eta')]^{-1}=H^2\eta\eta'$。したがって

$$
W=-\frac{H^2\eta\eta'}{4\pi^2(\Delta\eta-i\epsilon)^2}.
$$

最後に[二点関数の証明](#thm-qcurv19-bd-wightman)の

$$
\Delta\eta=\frac2H e^{-H(t+t')/2}\sinh(Hs/2),
\qquad \eta\eta'=H^{-2}e^{-H(t+t')}
$$

を代入すると $W=-H^2/[16\pi^2\sinh^2(H(s-i0)/2)]$ です。$\epsilon$ の取り方は変換後も正周波数の境界値を保持するように解釈します。
<!-- solution-end -->

<a id="ex-qcurv19-b02"></a>
#### QCURV19-B02 極の向きと熱的な率の比
- Level: B
- 問題: $\Omega=H\log2/(2\pi)>0$ とする。(a) $e^{-i\Omega s}$ に対して下半平面にある二点関数の極を列挙し、(b) 定常励起率と脱励起率を計算し、(c) その比から温度を決めよ。極 $s=0$ を励起率の下向き積分に誤って含めた場合の違いも説明せよ。

<!-- solution-start -->
**詳細解答**：$i\epsilon$ で極を実軸の上へ移しているので、$\Omega>0$ で閉じる下半平面の極は $s_{-m}=i\epsilon-2\pi im/H$（$m=1,2,\dots$）です。$m=0$ は入れません。

[留数計算](#thm-qcurv19-gh-detector)により

$$
\dot{\mathcal F}(\Omega)
=\frac{\Omega}{2\pi}\sum_{m=1}^\infty
e^{-2\pi m\Omega/H}
=\frac{\Omega}{2\pi}\sum_{m=1}^\infty2^{-m}
=\frac{\Omega}{2\pi}.
$$

脱励起は $\dot{\mathcal F}(-\Omega)=\Omega e^{2\pi\Omega/H}/[2\pi(e^{2\pi\Omega/H}-1)]=2\Omega/(2\pi)=\Omega/\pi$。よって比は $1/2=e^{-\beta\Omega}$、$\beta=\log2/\Omega=2\pi/H$、$T=H/(2\pi)$。

$m=0$ を下向き輪郭へ含めると励起率に真空の自発脱励起項に相当する $\Omega/(2\pi)$ を余計に足してしまいます。境界値の極の位置は物理的な正周波数の選択を指定しています。
<!-- solution-end -->

<a id="ex-qcurv19-b03"></a>
#### QCURV19-B03 局所温度と加速度の二つの寄与
- Level: B
- 問題: $r=3/(5H)$ で静止する検出器について $T_{\rm loc}$、$a_{\rm prop}$ を別々に計算し、$(2\pi T_{\rm loc})^2=H^2+a_{\rm prop}^2$ を数値係数ごとに確認せよ。「Unruh温度 $a_{\rm prop}/(2\pi)$ だけで十分か」にも答えよ。

<!-- solution-start -->
**詳細解答**：$f=1-H^2r^2=16/25$、$\sqrt f=4/5$ です。[局所温度の命題](#prop-qcurv19-local-temperature)を各変数に代入すると

$$
T_{\rm loc}=\frac{H}{2\pi(4/5)}=\frac{5H}{8\pi},
\qquad
a_{\rm prop}=\frac{H^2(3/(5H))}{4/5}=\frac{3H}4.
$$

左辺は $(2\pi T_{\rm loc})^2=(5H/4)^2=25H^2/16$。右辺は $H^2+(3H/4)^2=(16+9)H^2/16=25H^2/16$ で一致します。一方 $a_{\rm prop}/(2\pi)=3H/(8\pi)$ は $T_{\rm loc}=5H/(8\pi)$ より小さいので不十分です。背景曲率由来の $H$ の寄与を消せません。
<!-- solution-end -->

<a id="ex-qcurv19-b04"></a>
#### QCURV19-B04 共形結合を外すと何が壊れるか
- Level: B
- 問題: 同じde Sitter背景で $m=0$ のまま $\xi=0$ とする。(a) $\chi_k$ のモード方程式、(b) $e^{-ik\eta}/\sqrt{2k}$ を代入した残差、(c) $k=0$ の形式的な二つの解を求めよ。その結果から何を結論でき、何を結論できないか述べよ。

<!-- solution-start -->
**詳細解答**：$a''/a=2/\eta^2$ と[FLRWの再スケーリング後のモード方程式](../QCURV4/index.md#prop-qcurv4-mode)を用いると

$$
\chi_k''+\left(k^2-\frac2{\eta^2}\right)\chi_k=0.
$$

$v=e^{-ik\eta}/\sqrt{2k}$ では $v''+k^2v=0$ なので、残差は $-2v/\eta^2$ で非零です。従って共形平面波を同じ方程式の解として再利用できません。

$k=0$ の形式方程式 $\chi_0''-2\chi_0/\eta^2=0$ に $\chi_0=\eta^p$ を入れると $p(p-1)-2=0$、$p=2,-1$。一般解は $C_1\eta^2+C_2\eta^{-1}$ で、未来 $\eta\to0^-$ では後者が大きくなります。この計算は赤外・零モードの扱いが共形結合とは異なると示します。ただしこれ**だけ**で任意の状態が非Hadamardであるとか、あらゆる量子状態が存在しないとは証明できません。de Sitter不変Fock真空の非存在には別途の状態の正値性・対称性・零モード解析が必要です。
<!-- solution-end -->

### Level C：宇宙論的地平線の温度を一から再構成する

<a id="ex-qcurv19-c01"></a>
#### QCURV19-C01 状態・時計・温度・流束を分ける総合問題
- Level: C
- 問題: 四次元de Sitter、$a(t)=e^{Ht}$、$H>0$、質量零・共形結合自由場のBunch–Davies状態を考える。

  - (a) 共形時間 $\eta$ と $\chi=a\phi$ のモード方程式を導き、正周波数モードを明示せよ。
  - (b) 中心 $r=0$ の固有時差 $s$ に沿うWightman関数を求めよ。
  - (c) $\Omega>0$ の定常検出器について、複素平面に現れる極の位置と留数の幾何級数から励起率、脱励起率、温度を求めよ。
  - (d) $r=(\sqrt2H)^{-1}$ の静止観測者に対して、固有時間、局所温度、固有加速度を求めよ。
  - (e) (c) の温度だけから「無限遠へ流出するHawking粒子の黒体スペクトル」や「有限時間切替の厳密な熱性」を主張できるか。物理的に必要な条件を区別して論ぜよ。

<!-- solution-start -->
**詳細解答**：

(a) $d\eta=e^{-Ht}dt$ を積分して、未来端で零になる定数を選ぶと $\eta=-e^{-Ht}/H$、$a=-(H\eta)^{-1}$ です。$a''/a=2/\eta^2$ で、$m=0$、$\xi=1/6$ の[再スケーリング方程式](../QCURV4/index.md#prop-qcurv4-mode)のポテンシャルは $(6\xi-1)a''/a=0$。よって $\chi_k''+k^2\chi_k=0$ です。正周波数の規格化解 $e^{-ik\eta}/\sqrt{2k}$ に空間平面波 $(2\pi)^{-3/2}e^{i\boldsymbol k\cdot\boldsymbol x}$ を掛け、$a$ で割れば[状態の定義](#def-qcurv19-bunch-davies)の $u_{\boldsymbol k}$ です。

(b) 真空収縮から $W=[aa']^{-1}\int d^3k\,e^{-ik(\eta-\eta'-i0)+i\boldsymbol k\cdot\Delta\boldsymbol x}/[(2\pi)^3\,2k]$。中心では角度積分後に

$$
W=-\frac{H^2\eta\eta'}{4\pi^2(\eta-\eta'-i0)^2}.
$$

$\eta\eta'=H^{-2}e^{-H(t+t')}$ と $\eta-\eta'=(2/H)e^{-H(t+t')/2}\sinh[H(t-t')/2]$ を順に使い、

$$
W(s)=-\frac{H^2}{16\pi^2\sinh^2[H(s-i0)/2]}
$$

を得ます。

(c) $\Omega>0$ のFourier積分は下半平面へ閉じ、$s=-2\pi i m/H+i0$（$m\ge1$）の二階極を取ります。各留数は $i\Omega e^{-2\pi m\Omega/H}/(4\pi^2)$ です。時計回り輪郭の係数 $-2\pi i$ を掛けると

$$
\dot{\mathcal F}(\Omega)
=\frac{\Omega}{2\pi}\sum_{m=1}^\infty e^{-2\pi m\Omega/H}
=\frac{\Omega}{2\pi(e^{2\pi\Omega/H}-1)}.
$$

上向き輪郭の $m=0,1,\dots$ を取る脱励起率は $\dot{\mathcal F}(-\Omega)=\Omega e^{2\pi\Omega/H}/[2\pi(e^{2\pi\Omega/H}-1)]$。比 $e^{-2\pi\Omega/H}$ により $\beta=2\pi/H$、$T_{\rm GH}=H/(2\pi)$ です。ここで温度を読む時計は中心の固有時間 $t=T=\tau$ です。

(d) $f=1-H^2r^2=1/2$ より $d\tau=dT/\sqrt2$。世界線の四元速度を $u^T=f^{-1/2}$ とすると $\Gamma^r_{TT}=ff'/2$、$a^r=f'/2=-H^2r$ なので $a_{\rm prop}=H^2r/\sqrt f=H$。Tolmanの固有時変換、または二点関数の $H\mapsto H/\sqrt f$ により

$$
T_{\rm loc}=\frac{H}{2\pi\sqrt f}
=\frac{\sqrt2 H}{2\pi}.
$$

(e) 主張できません。(c) はBunch–Davies状態の**定常中心検出器**の応答であり、de Sitter静的パッチには漸近平坦な無限遠が存在せず、[Schwarzschildの散乱障壁と灰色体因子](../QCURV12/index.md#thm-qcurv12-greybody-flux)を前提とした遠方流束は定義されません。ここでの状態は対称で、静的な正味半径方向の流束もありません。崩壊時空のUnruh型状態とその遠方光度とは区別が必要です。さらに有限切替 $\chi(\tau)$ では[応答関数](../QCURV6/index.md#def-qcurv6-response)に $\chi$ の周波数幅が入るため、(c) の定常率の比を有限時間の確率比へそのまま移せません。
<!-- solution-end -->

## 7. この章で分かったこと

1. de Sitterの膨張平坦座標と静的パッチは同じ局所幾何を異なる時計で表します。中心で規格化した静的Killing場の地平線半径は $H^{-1}$、表面重力は $H$ です。
2. 四次元の質量零・共形結合スカラー場では、Bunch–Davies状態の正規化モードから二点関数を直接計算できます。中心の測地線に沿う双曲正弦型二点関数は、定常検出器に $T_{\rm GH}=H/(2\pi)$ に対応する励起・脱励起率の比を与えます。
3. 中心以外では $T_{\rm loc}=H/(2\pi\sqrt f)$、$(2\pi T_{\rm loc})^2=H^2+a_{\rm prop}^2$。固有加速度が零でも温度は零とは限りません。
4. 温度は状態・観測者・測定極限に依存する操作的な結論です。質量零最小結合場の赤外問題、有限切替、静的パッチに無限遠の正味流束がないことを外して一般化しません。

次は、膨張FLRW・Rindler・崩壊ブラックホール・二次元共形模型を、同じ「背景・状態・観測者・二点関数・粒子数・流束」の欄に並べて比較します。
