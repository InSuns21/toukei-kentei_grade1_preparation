# QFT26 Wilson流・関連／無関連／周辺演算子と有効場の理論

[QFT25のくりこみ群方程式](../QFT25/index.md#def-qft25-rg-equation)では、裸の理論を固定したまま補助尺度 $\mu$ を変えました。しかし、低エネルギーだけを測定する実験に、高運動量のすべての自由度を毎回残す必要はあるでしょうか。Wilsonの発想は、**観測しない短波長モードを積分消去し、その効果を残った場の相互作用へ移す**ことです。

この操作では、作用の形そのものが変わり得ます。四次相互作用から高次の場や導関数を含む項も生成されます。そこで、どの項が長距離で重要かを分類し、既習の $\beta$ 関数との符号・尺度の向きを照合します。最後に重い場を消去する小模型で、有効場の理論の「高エネルギーの詳細を低エネルギーの係数へ畳み込む」という意味を計算します。

以下は $d$ 次元Euclid空間の実スカラー場を主に扱い、$\hbar=c=1$ とします。

まず一辺 $L$ の周期箱で、[QFT22の有限Fourierモード](../QFT22/index.md#def-qft22-sharp-cutoff)と同様に体積 $V=L^d$、運動量 $p_i=2\pi n_i/L$ とします。実場の有限Fourier表示は

$$
\phi(x)=V^{-1/2}\sum_p e^{ipx}\phi_p
$$

です。各独立な実Fourier成分を通常の有限次元積分で扱い、無限次元の「測度」を構成済みとは仮定しません。

連続運動量の式は、正の質量と固定カットオフの下で先に $L\to\infty$ として和を積分へ移した摂動的記法です。連続Fourier規約は

$$
\phi(x)=\int\frac{d^dp}{(2\pi)^d}\,e^{ipx}\widetilde\phi(p)
$$

とします。[QFT19の有限次元Gaussian積分](../QFT19/index.md#thm-qft19-gaussian)と[QFT22のカットオフ積分](../QFT22/index.md#thm-qft22-cutoff-integrals)が出発点です。

## 1. 高運動量の場を消しても低運動量の予測を残せるか

周期箱の一辺を $L$ として運動量 $p_i=2\pi n_i/L$ を離散化し、$|p|<\Lambda$ の有限モードだけを残します。実場では有限箱の係数が $\phi_{-p}=\overline{\phi_p}$ を満たします。$b>1$ を固定し、低運動量領域 $|p|<\Lambda/b$ の成分を $\phi_<$、残りの殻 $\Lambda/b\le |p|<\Lambda$ の成分を $\phi_>$ とします。$p$ の支持が交わらないので、自由二次作用の交差項はありません。

有限モードの実独立変数を積分する記号を $D\phi_<$、$D\phi_>$ と書きます。$S_\Lambda[\phi]$ は全モードのEuclid作用です。積分に現れる正規化因子は低運動量の期待値には影響しないため、$\phi_<$ に無関係な定数は作用から除いてよいことにします。

<a id="def-qft26-wilson-action"></a>

<!-- formal-statement-start -->
> **定義（高運動量殻の積分消去とWilson作用）**
> 有限周期箱上の実スカラー場に紫外カットオフ $\Lambda>0$ を設け、$b>1$、$0<\Lambda/b<\Lambda$ とする。有限次元の積分 $\int D\phi\,e^{-S_\Lambda[\phi]}$ が有限かつ正であるとする。$\phi=\phi_<+\phi_>$ を、$|p|<\Lambda/b$ に支持を持つ低モード $\phi_<$ と $\Lambda/b\le |p|<\Lambda$ に支持を持つ高モード $\phi_>$ へ分ける。殻の基準規格化 $N_> >0$ を $\phi_<$ に依存しないよう選び、

$$
e^{-S_{\Lambda/b}^{\mathrm W}[\phi_<]}
=N_>^{-1}\int D\phi_>\,
e^{-S_\Lambda[\phi_<+\phi_>]}
$$

> で定める $S_{\Lambda/b}^{\mathrm W}$ を、低運動量場の**Wilson作用**という。積分消去後のカットオフは $\Lambda/b$ である。必要なら続けて運動量と場を再スケーリングし、カットオフを元の数値 $\Lambda$ へ戻す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft26-wilson-action -->
### 例：自由場なら何が残るか

**定義の確認**：$m^2>0$ として

$$
S_\Lambda[\phi]=\frac12\sum_{|p|<\Lambda}
(p^2+m^2)|\phi_p|^2
$$

を考えます。これは[QFT22の実Fourier正規直交基底](../QFT22/index.md#def-qft22-sharp-cutoff)で書いた自由二次形式です。運動項と質量項を基底展開すると、異なる運動量の内積は零となり、各独立実座標の二乗係数は $p^2+m^2>0$ です。従って二次形式は正定値で、[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)により積分は正かつ有限です。

低モードと高モードが同じ実直交基底の互いに交わらない部分を占めるため、交差項は消え、

$$
S_\Lambda[\phi_<+\phi_>]=S_<[\phi_<]+S_>[\phi_>].
$$

ここで $N_>=\int D\phi_>\,e^{-S_>}$ と選ぶと、定義式は $e^{-S_<}$ そのものです。よって $S_{\Lambda/b}^{\mathrm W}[\phi_<]=S_<[\phi_<]$。これは、高いモードの積分が低いモードへ依存しない定数だけを与え、低モードの作用を変えない例です。
<!-- definition-example-end -->

相互作用があると、例えば $\lambda\phi^4$ を $\phi_<+\phi_>$ で展開した混合項が残るため、作用は単なる「高いFourier係数をゼロにする操作」と違います。

<a id="prop-qft26-low-mode-observables"></a>

<!-- formal-statement-start -->
> **命題（Wilson積分消去と低運動量期待値の保存）**
> [Wilson作用](#def-qft26-wilson-action)の有限次元積分が存在し、$F[\phi_<]$ を低運動量モードだけの可積分な関数とする。このとき元の全モード作用による規格化期待値と、Wilson作用による低モード期待値は等しい。

$$
\frac{\int D\phi_<D\phi_>\,F[\phi_<]e^{-S_\Lambda[\phi_<+\phi_>]}}
{\int D\phi_<D\phi_>\,e^{-S_\Lambda[\phi_<+\phi_>]}}
=
\frac{\int D\phi_<\,F[\phi_<]e^{-S_{\Lambda/b}^{\mathrm W}[\phi_<]}}
{\int D\phi_<\,e^{-S_{\Lambda/b}^{\mathrm W}[\phi_<]}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$F$ は殻の変数に依存しません。まず殻だけを積分すると、分子と分母のどちらにも同じ $N_>$ が現れ、比で相殺します。

<!-- proof-start -->
### 証明

有限次元積分の積分順序を交換できるという仮定の下で、分子を先に $\phi_>$ について積分します。定義式により

$$
\begin{aligned}
&\int D\phi_<\,F[\phi_<]\left(\int D\phi_>\,e^{-S_\Lambda[\phi_<+\phi_>]}\right)\\
&\qquad=N_>\int D\phi_<\,F[\phi_<]e^{-S_{\Lambda/b}^{\mathrm W}[\phi_<]}.
\end{aligned}
$$

分母は $F=1$ と置いた同じ計算で $N_>\int D\phi_<e^{-S_{\Lambda/b}^{\mathrm W}}$ です。$N_> >0$ を約分すれば結論です。
<!-- proof-end -->

この命題が保証するのは、**残した低モードだけで作る観測量の同一性**です。高運動量を直接測る相関関数をそのまま再現する主張ではありません。積分消去後に有限個の項だけへ作用を近似すれば、そこからは打切り誤差が生まれます。

## 2. 同じカットオフへ戻して項の重要度を測る

一段積分消去すると許された運動量は $|p|<\Lambda/b$ へ狭まります。次の段階と比較するため $p'=bp$ と置き、運動量の範囲を元の $|p'|<\Lambda$ に戻します。対応する空間座標は $x'=x/b$ です。

$x_i$ に関する偏微分を $\partial_i$、$x'_i$ に関する偏微分を $\partial'_i$ と書きます。連鎖律とJacobianは

$$
\partial_i=b^{-1}\partial'_i,\qquad d^dx=b^d d^dx'
$$

です。自由運動項の係数を不変にするには

$$
\frac12\int d^dx\,(\partial\phi_<)^2
=\frac12\int d^dx'\,b^{d-2}(\partial'\phi_<(bx'))^2
$$

から、$\phi_<(bx')=b^{-(d-2)/2}\phi'(x')$ と選びます。この指数は自由運動項を規格化するためのもので、相互作用のループ補正はまだ含めていません。

<a id="def-qft26-rescaling"></a>

<!-- formal-statement-start -->
> **定義（再スケーリングと局所演算子のスケーリング指数）**
> $d>2$ 次元Euclid実スカラー場で、自由二次運動項の係数を $1/2$ とする。運動項を規格化する場の**工学的質量次元**を $[\phi]_{\mathrm{eng}}=(d-2)/2$ と定める。$b>1$、$x'=x/b$、$p'=bp$ とし、

$$
\phi'(x')=b^{(d-2)/2}\phi_<(bx'),\qquad
\widetilde\phi'(p')=b^{-(d+2)/2}\widetilde\phi_<(p'/b)
$$

> で場を再スケーリングする。$\widetilde\phi$ を使う第二式は、無限体積での連続Fourier規約に対する式である。第一式のFourier変換で $x=bx'$、$d^dx'=b^{-d}d^dx$ と置けば、係数は $b^{(d-2)/2-d}=b^{-(d+2)/2}$ となる。$n$ 個の場と総計 $s$ 階の空間微分を含む並進不変な局所単項式 $\mathcal O_{n,s}$ を、指数・添字の縮約が定まっているものとする。その作用項 $\int d^dx\,g_{n,s}\mathcal O_{n,s}$ の**木レベルスケーリング指数**を

$$
y_{n,s}=d-\frac{n(d-2)}2-s
$$

> とする。微分演算子であっても、作用に実際に入る総微分数 $s$ を数える。量子補正や演算子混合はこの指数の定義には含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft26-rescaling -->
### 例：四次元の質量と四次項

**定義の確認**：$d=4$ なら $[\phi]_{\mathrm{eng}}=1$（質量次元）です。$\phi^2$ は $n=2,s=0$ なので $y=4-2=2$。$\phi^4$ は $n=4,s=0$ なので $y=4-4=0$。運動項 $(\partial\phi)^2$ は場が2個、微分が2個で $y=4-2-2=0$ です。最後の項は規格化に利用したもので、独立した物理的結合が必ず一つ増えるという意味ではありません。
<!-- definition-example-end -->

どういう「重要度」なのでしょうか。Gaussian固定点とは、相互作用結合を零にして規格化された自由運動項だけが残る点です。その近くで摂動係数が一段ごとに増えるか減るかを見ます。

<a id="def-qft26-relevance"></a>

<!-- formal-statement-start -->
> **定義（関連・無関連・周辺演算子とGaussian固定点）**
> $d>2$ のEuclid実スカラー理論で、Gaussian固定点近くの局所項 $g_{n,s}\mathcal O_{n,s}$ を、[指数 $y_{n,s}$](#def-qft26-rescaling)で分類する。低運動量殻を消して $b>1$ 倍の再スケーリングをしたとき、木レベルの係数変化は次の式で与えられる。

$$
g'_{n,s}=b^{y_{n,s}}g_{n,s}.
$$

> このとき、$y_{n,s}>0$ なら**関連**、$y_{n,s}<0$ なら**無関連**、$y_{n,s}=0$ なら**周辺**という。周辺の場合はループ補正による流れを別に調べる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft26-relevance -->
### 例：四次元の三つの相互作用

**定義の確認**：$d=4$ で $\phi^2$ は $y=2>0$ なので赤外へ拡大する関連項、$\phi^4$ は $y=0$ なので木レベルで周辺、$\phi^6$ は $y=4-6=-2<0$ なので無関連です。例えば $b=2$ なら係数はそれぞれ $4$ 倍、$1$ 倍、$1/4$ 倍になります。ただし質量が大きくなった点で自由質量なし理論の線形分類を無制限に続けられるわけではありません。
<!-- definition-example-end -->

<a id="thm-qft26-tree-scaling"></a>

<!-- formal-statement-start -->
> **定理（局所単項式の木レベルスケーリング）**
> $d>2$ 次元Euclid空間の運動項 $S_{\mathrm{kin}}=\frac12\int d^dx\,(\partial\phi)^2$ を持つ実スカラー模型で、カットオフを下げた後、[再スケーリング](#def-qft26-rescaling)を行う。局所単項式 $\mathcal O_{n,s}$ が $n$ 個の場と総計 $s$ 階の微分だけから成り、作用中の他項との混合と殻積分の量子補正を無視すると、その係数は

$$
g'_{n,s}=b^{d-n(d-2)/2-s}g_{n,s}
$$

> と変わる。これはGaussian固定点の**線形・木レベル**の分類であり、相互作用固定点の臨界指数を断定しない。
<!-- formal-statement-end -->

### 証明の見取り図

$x=bx'$ により体積要素は $b^d$ 倍、場一つは $b^{-(d-2)/2}$ 倍、微分一つは $b^{-1}$ 倍になります。この三つを掛けます。

<!-- proof-start -->
### 証明

$\phi_<(bx')=b^{-(d-2)/2}\phi'(x')$ です。$x=bx'$ で $\partial/\partial x_i=b^{-1}\partial/\partial x_i'$ だから

$$
\partial_{i_1}\cdots\partial_{i_k}\phi_<(bx')
=b^{-k-(d-2)/2}\partial'_{i_1}\cdots\partial'_{i_k}\phi'(x').
$$

よって $n$ 個の場を掛け、全微分数を $s$ とすると $\mathcal O_{n,s}[\phi_<](bx')=b^{-n(d-2)/2-s}\mathcal O_{n,s}[\phi'](x')$。$d^dx=b^d d^dx'$ なので

$$
\int d^dx\,g_{n,s}\mathcal O_{n,s}[\phi_<]
=\int d^dx'\,\bigl(b^{d-n(d-2)/2-s}g_{n,s}\bigr)\mathcal O_{n,s}[\phi'].
$$

運動項には $n=2,s=2$ を代入して指数が零となるので、場の規格化の選択とも整合します。
<!-- proof-end -->

実際のWilson流では結合が混合し、線形化した固有方向は単純な $\phi^n$ とは限りません。特に $\phi^4$ のような**木レベルで周辺の項**は、次の一ループ計算によって赤外での増減が初めて決まります。

## 3. 四次相互作用は殻を消すとどちらへ動くか

四次元の一成分実場で、カットオフ内の作用を

$$
S_\Lambda[\phi]=\int d^4x\left[
\frac12(\partial\phi)^2+\frac12m^2\phi^2+\frac{\lambda}{4!}\phi^4
\right]
$$

とします。$\lambda\ge0$、$m^2>0$ を基準に有限モード積分を定義し、必要な式では質量比 $m^2/\Lambda^2\to0$ の極限を取ります。

薄殻の幅を $b=e^{\delta t}$、$\delta t>0$ と表し、$t=\log(\Lambda_0/\Lambda_{\mathrm{running}})$ を**赤外へ向かって増える**流れの時間とします。

以下の殻積分と $d/dt$ は、固定 $L$ の離散殻を微分したものではありません。固定した正の質量とカットオフの下で先に $L\to\infty$ としてモード和を積分へ移し、次に $\delta t\downarrow0$ を取ります。固定の有限箱では殻のモード数が階段状に変わるため、この順序が必要です。最後に低モードの運動項が $1/2$ に戻るよう再スケーリングします。

定数の背景場 $\varphi$ を低モードに置くと、殻の二次変動核には $\lambda\varphi^2/2$ が加わります。したがって一ループの場依存寄与は、[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)を各殻モードに適用した

$$
\Delta V(\varphi)=\frac12\int_{\Lambda/b<|q|<\Lambda}
\frac{d^4q}{(2\pi)^4}
\log\left(1+\frac{\lambda\varphi^2}{2(q^2+m^2)}\right)
$$

です。場に依存しない $\log(q^2+m^2)$ は除きました。これは背景場について四次までの係数を求める計算で、一般の低モードに対しては非局所核や高次・導関数項も生じます。

<a id="thm-qft26-shell-flow"></a>

<!-- formal-statement-start -->
> **定理（φ⁴模型の一ループ薄殻Wilson流）**
> 四次元Euclidの一成分実 $\phi^4$ 理論を、正の $m^2$、小さい $\lambda\ge0$、鋭い運動量カットオフ $\Lambda>0$ で有限モード正則化する。$b=e^{\delta t}$、$\delta t\downarrow0$ の殻を積分し、零外部運動量の $\phi^2,\phi^4$ 係数を残す一ループ・局所射影を行い、運動項の木レベル規格化を用いて再スケーリングする。$r=m^2/\Lambda^2$ を固定カットオフの無次元質量係数、$t$ を赤外向きの流れの時間とすると、摂動的な先頭次数は

$$
\boxed{\frac{dr}{dt}=2r+\frac{\lambda}{16\pi^2(1+r)}+O(\lambda^2)},
\qquad
\boxed{\frac{d\lambda}{dt}=-\frac{3\lambda^2}{16\pi^2(1+r)^2}+O(\lambda^3)}.
$$

> 特に $r\ll1$ で $\lambda$ の一ループ係数は負である。上式は**指定されたカットオフ・射影・打切りでの近似的な二結合流**であり、すべての生成演算子を含む厳密な閉じた二変数方程式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\log(1+u)=u-u^2/2+\cdots$ を背景場の二次・四次まで展開します。四次元球面積 $2\pi^2$ を使って殻積分を出し、最後に質量項へ $b^2$、四次項へ $b^0$ を掛けます。$\mu$ を上げるQFT25とは逆向きの時間を使う点が重要です。

<!-- proof-start -->
### 証明

$u=\lambda\varphi^2/[2(q^2+m^2)]$ とおくと

$$
\frac12\log(1+u)
=\frac{\lambda\varphi^2}{4(q^2+m^2)}
-\frac{\lambda^2\varphi^4}{16(q^2+m^2)^2}
+O(\lambda^3\varphi^6).
$$

殻積分を

$$
I_1=\int_{\mathrm{shell}}\frac{d^4q}{(2\pi)^4}
\frac1{q^2+m^2},\qquad
I_2=\int_{\mathrm{shell}}\frac{d^4q}{(2\pi)^4}
\frac1{(q^2+m^2)^2}
$$

と書けば、$\Delta V=\lambda I_1\varphi^2/4-\lambda^2I_2\varphi^4/16+\cdots$ です。作用の係数 $m^2\varphi^2/2$ と $\lambda\varphi^4/4!$ と比較すると

$$
\delta m^2=\frac{\lambda}{2}I_1,\qquad
\delta\lambda=-\frac{24\lambda^2}{16}I_2
=-\frac{3\lambda^2}{2}I_2.
$$

この $3/2$ は三つの四点チャネルと収縮の組合せ係数に相当し、[QFT22の四点bubble](../QFT22/index.md#thm-qft22-one-loop-vertices)とも整合します。

四次元の球面積 $2\pi^2$ と $d^4q=2\pi^2q^3dq$ を用いて

$$
I_1=\frac1{8\pi^2}\int_{\Lambda e^{-\delta t}}^\Lambda
\frac{q^3}{q^2+m^2}\,dq,\qquad
I_2=\frac1{8\pi^2}\int_{\Lambda e^{-\delta t}}^\Lambda
\frac{q^3}{(q^2+m^2)^2}\,dq.
$$

薄い区間の幅は $\Lambda(1-e^{-\delta t})=\Lambda\delta t+O(\delta t^2)$ です。被積分関数は $\Lambda$ 近傍で連続なので

$$
\begin{aligned}
I_1&=\frac{\Lambda^4}{8\pi^2(\Lambda^2+m^2)}
\delta t+O(\delta t^2)
=\frac{\Lambda^2}{8\pi^2(1+r)}\delta t+O(\delta t^2),\\
I_2&=\frac{\Lambda^4}{8\pi^2(\Lambda^2+m^2)^2}
\delta t+O(\delta t^2)
=\frac1{8\pi^2(1+r)^2}\delta t+O(\delta t^2).
\end{aligned}
$$

[木レベルスケーリング](#thm-qft26-tree-scaling)により、次の一段の係数は $m'^2=b^2(m^2+\delta m^2)$、$\lambda'=\lambda+\delta\lambda$（四次元の四次項の指数は零）です。無次元質量 $r'=m'^2/\Lambda^2$ を固定した再スケーリング後のカットオフで比較し、

$$
\begin{aligned}
\frac{r'-r}{\delta t}
&=\frac{(1+2\delta t)(m^2+\lambda I_1/2)-m^2}
{\Lambda^2\delta t}+O(\lambda^2,\delta t)\\
&=2r+\frac{\lambda}{16\pi^2(1+r)}
+O(\lambda^2,\delta t),\\
\frac{\lambda'-\lambda}{\delta t}
&=-\frac{3\lambda^2}{2}\frac{I_2}{\delta t}
+O(\lambda^3)
=-\frac{3\lambda^2}{16\pi^2(1+r)^2}+O(\lambda^3,\delta t).
\end{aligned}
$$

$\delta t\to0$ として結論です。運動項の一ループ自己エネルギーは外部運動量に依存しないtadpoleなので、この次数で場の再規格化は不要です。高次作用素への射影誤差と高次ループ補正は宣言した打切りの外にあります。
<!-- proof-end -->

### $\mu$ のβ関数と符号が逆なのは矛盾か

$r\ll1$ なら上式は $d\lambda/dt=-a\lambda^2$、$a=3/(16\pi^2)$ です。一方[QFT25の四次元 $\phi^4$ のβ関数](../QFT25/index.md#thm-qft25-phi4-beta)は $d\lambda/d\log\mu=+a\lambda^2+O(\lambda^3)$ でした。$t=\log(\Lambda_0/Q)$ として低エネルギー尺度 $Q$ を下げると $dt=-d\log Q$。従って、質量と閾値を無視した普遍的な一ループ対数係数の符号は整合します。

さらに初期値 $\lambda(0)=\lambda_0>0$ に対して

$$
\frac{d}{dt}\frac1\lambda=a,\qquad
\lambda(t)=\frac{\lambda_0}{1+a\lambda_0t}.
$$

これは $\mu=Q$ と置いたQFT25の一ループ解と同じ対数です。しかしWilsonの $r$ 方程式にはカットオフに依存する**加法的な二次発散の質量移動**があります。これは $\overline{\mathrm{MS}}$ の $m^2$ β関数と項別に同一ではありません。測定量を整合させるには初期条件、有限な反項、方式、閾値を対応付ける必要があります。

また $r\gg1$ では $\lambda$ の殻寄与は $(1+r)^{-2}$ に抑制されます。これは重い粒子の影響が低エネルギーで小さくなる現象の、この射影での具体例です。ただし質量独立の $\overline{\mathrm{MS}}$ β関数が同じ関数形で自動的に閾値減衰するという意味ではありません。

## 4. 有効場の理論では何を残すか

低エネルギーの相関だけを考えるなら、高い尺度 $M$ を持つ場を消し、残った場の局所演算子を $1/M$ の冪で整理できます。「無関連」は「存在しない」ではありません。精度を上げればその演算子の係数を測定・計算する必要があります。

軽い実場 $\phi$ と重い実場 $\chi$ を有限モードEuclid模型で考え、$\chi$ に関する作用を

$$
S[\phi,\chi]=S_{\mathrm{light}}[\phi]
+\frac12\int d^4x\,\chi(M^2-\partial^2)\chi
+\frac h2\int d^4x\,\chi\phi^2,\qquad M>0
$$

とします。$S_{\mathrm{light}}$ は軽い場の運動項と、消去後も全体を下に有界にする十分な正の四次項を含むとし、境界項が消える周期境界条件を使います。重い場の二次核 $K=M^2-\partial^2$ は、Fourier基底 $e^{ipx}$ に作用すると $K e^{ipx}=(M^2+p^2)e^{ipx}$ となります。各固有値が $M^2+p^2>0$ だから、重い場の実独立Fourier座標では正定値の行列です。このため[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)を適用できます。線形源 $\phi^2$ の全モードが重い場の積分空間に入っているかも確認してから平方完成します。

<a id="prop-qft26-heavy-matching"></a>

<!-- formal-statement-start -->
> **命題（重いGaussian場の消去と低エネルギー展開）**
> 上記有限モードEuclid模型で、$\chi$ のモード集合は $\phi^2$ の全Fourierモードを含み、その支持する運動量の絶対値は $P<M$ 以下であるとする。$K=M^2-\partial^2$ が正定値、$h$ が実数のとき、重い場 $\chi$ を積分した有効作用は、$\phi$ に無関係な定数を除いて

$$
S_{\mathrm{eff}}[\phi]
=S_{\mathrm{light}}[\phi]
-\frac{h^2}{8}\int d^4x\,\phi^2K^{-1}\phi^2.
$$

> ここで $\phi^2$ のFourier支持について $P/M\ll1$ なら、低運動量展開の最初の二項は

$$
S_{\mathrm{eff}}[\phi]
=S_{\mathrm{light}}[\phi]
-\frac{h^2}{8M^2}\int d^4x\,\phi^4
+\frac{h^2}{8M^4}\int d^4x\,|\partial(\phi^2)|^2
+\mathcal R[\phi]
$$

> となる。剰余は固定した有限モード場について次の明示的な評価を満たす。

$$
-\frac{h^2P^4}{8M^6}\int d^4x\,\phi^4
\le \mathcal R[\phi]\le0.
$$

> これは $\phi^2$ の運動量支持を制限した評価であり、任意の高運動量場に対する展開ではない。
<!-- formal-statement-end -->

### 証明の見取り図

重い場の線形源 $J=h\phi^2/2$ を取り、$K$ による平方完成をします。逆核の運動量表示は $(M^2+p^2)^{-1}$ です。$p^2/M^2$ の幾何級数を展開してFourier逆変換すれば、四次相互作用と導関数付き相互作用が出ます。

<!-- proof-start -->
### 証明

$J=h\phi^2/2$ とおくと重い場の部分は

$$
\frac12\langle\chi,K\chi\rangle+\langle\chi,J\rangle
=\frac12\langle\chi+K^{-1}J,K(\chi+K^{-1}J)\rangle
-\frac12\langle J,K^{-1}J\rangle.
$$

$K$ は正定値なので平行移動後のGaussian積分は $\phi$ に依存しない定数です。従って残る作用は $-\frac12\langle J,K^{-1}J\rangle=-h^2\langle\phi^2,K^{-1}\phi^2\rangle/8$ です。

Fourierで $K^{-1}(p)=(M^2+p^2)^{-1}$。$|p|<M$ では

$$
\frac1{M^2+p^2}
=\frac1{M^2}-\frac{p^2}{M^4}
+\frac{p^4}{M^4(M^2+p^2)}
$$

が厳密に成り立ちます。周期境界で $\langle f,-\partial^2 f\rangle=\int d^4x\,|\partial f|^2$ と部分積分し、$f=\phi^2$ を代入すると

$$
-\frac{h^2}{8}\langle f,K^{-1}f\rangle
=-\frac{h^2}{8M^2}\int d^4x\,f^2
+\frac{h^2}{8M^4}\int d^4x\,|\partial f|^2+\mathcal R[\phi],
$$

$$
\mathcal R[\phi]=-\frac{h^2}{8}
\left\langle f,\frac{(-\partial^2)^2}{M^4(M^2-\partial^2)}f\right\rangle.
$$

この剰余演算子のFourier固有値は $p^4/[M^4(M^2+p^2)]$ で、$|p|\le P$ では $0\le p^4/[M^4(M^2+p^2)]\le P^4/M^6$。実直交Fourier基底のParseval等式 $\langle f,f\rangle=\int d^4x\,f^2$ によって命題の剰余評価を得ます。なお $\phi$ が $P$ 以下でも積 $\phi^2$ の支持は一般に $2P$ まで広がるため、命題では **$\phi^2$ の支持** を条件にしたことが重要です。
<!-- proof-end -->

この結果で $\phi^4$ の係数は $-h^2/(8M^2)$ だけずれます。元の四次項が $\lambda\phi^4/4!$ なら $\Delta\lambda=-3h^2/M^2$ です。また連鎖律 $\partial_i(\phi^2)=2\phi\,\partial_i\phi$ より $|\partial(\phi^2)|^2=4\phi^2|\partial\phi|^2$ です。従って導関数付き項は四次元で場四個・微分二個となり、[スケーリング指数](#def-qft26-rescaling)は $y=-2$。従って典型的な外部運動量 $Q\ll M$ では、局所四次項に対する相対補正が $O(Q^2/M^2)$ になります。厳密な打切り精度は係数の相殺や外部場の配置にも依存します。

## 5. 演習：殻積分から低エネルギーの予測へ

### 演習 QFT26-A1：低モードの期待値

- Level: A
- 問題：独立な実数 $x,y$ に対し $S(x,y)=ax^2/2+cy^2/2$（$a,c>0$）とする。$y$ を積分消去して $x$ のWilson作用を定め、元の模型と有効模型の $\langle x^2\rangle$ を比較せよ。$N_>=\int_{\mathbb R}e^{-cy^2/2}dy$ を選ぶ。

<!-- solution-start -->
**詳細解答**

$S=S_x+S_y$ なので

$$
e^{-S^{\mathrm W}(x)}
=N_>^{-1}e^{-ax^2/2}
\int_{\mathbb R}e^{-cy^2/2}dy=e^{-ax^2/2}.
$$

従って $S^{\mathrm W}(x)=ax^2/2$ です。元の模型では $y$ の積分が分子・分母で消えます。ここで $a$ による偏微分 $\partial_a$ は、積分変数 $x$ を固定して係数 $a$ を動かす操作です。$a>0$ なので積分内微分が可能で、[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)から

$$
\begin{aligned}
Z(a)&=\int_{\mathbb R}e^{-ax^2/2}\,dx=\sqrt{\frac{2\pi}{a}},\\
-2\partial_a\log Z(a)
&=\frac{\int_{\mathbb R}x^2e^{-ax^2/2}\,dx}{Z(a)}
=\frac1a.
\end{aligned}
$$

有効模型でも $x$ の重みは同一なので、$\langle x^2\rangle=1/a$ です。
<!-- solution-end -->

### 演習 QFT26-A2：運動項を保つ場の変換

- Level: A
- 問題：$d=4$ で $x=bx'$、$\phi_<(bx')=b^{-1}\phi'(x')$ とする。$\int d^4x\,(\partial\phi_<)^2/2$ が不変であることをJacobianと微分を別々に計算して示せ。

<!-- solution-start -->
**詳細解答**

$d^4x=b^4d^4x'$ です。また $\partial_{x_i}=b^{-1}\partial_{x'_i}$ と $\phi_<(bx')=b^{-1}\phi'$ から $\partial_{x_i}\phi_<(bx')=b^{-2}\partial_{x'_i}\phi'$。二乗は $b^{-4}(\partial'\phi')^2$ だから

$$
\frac12\int d^4x\,(\partial\phi_<)^2
=\frac12\int b^4d^4x'\,b^{-4}(\partial'\phi')^2
=\frac12\int d^4x'\,(\partial'\phi')^2.
$$

場だけを変換して座標のJacobianを忘れると誤った係数になります。
<!-- solution-end -->

### 演習 QFT26-A3：局所項の指数

- Level: A
- 問題：$d=4$ の実スカラー場で $\phi^2,\phi^4,\phi^6,(\partial\phi)^2,\phi^2(\partial\phi)^2$ の各項について $n,s,y_{n,s}$ と関連性を求めよ。

<!-- solution-start -->
**詳細解答**

[木レベル指数](#thm-qft26-tree-scaling)に $d=4$ を代入すると $y_{n,s}=4-n-s$ です。各項の場の個数と総微分数を数えると

$$
\begin{aligned}
\phi^2 &: (n,s,y)=(2,0,2) &&\text{関連},\\
\phi^4 &: (4,0,0) &&\text{周辺},\\
\phi^6 &: (6,0,-2) &&\text{無関連},\\
(\partial\phi)^2 &: (2,2,0) &&\text{周辺},\\
\phi^2(\partial\phi)^2 &: (4,2,-2) &&\text{無関連}.
\end{aligned}
$$

最後の項は、前の $\phi^2$ に場が2個、後の $(\partial\phi)^2$ に場が2個・微分が2個あるので $n=4,s=2$ です。運動項は場の規格化に使用済みで、独立の周辺結合が必ず増えるわけではありません。
<!-- solution-end -->

### 演習 QFT26-A4：四次元の殻積分

- Level: A
- 問題：$m=0$、$b>1$ として $I_1=\int_{\Lambda/b<|q|<\Lambda}d^4q/(2\pi)^4q^{-2}$ と $I_2=\int_{\Lambda/b<|q|<\Lambda}d^4q/(2\pi)^4q^{-4}$ を求めよ。

<!-- solution-start -->
**詳細解答**

$S^3$ の面積は $2\pi^2$ なので $2\pi^2/(2\pi)^4=1/(8\pi^2)$ です。従って

$$
I_1=\frac1{8\pi^2}\int_{\Lambda/b}^{\Lambda}q\,dq
=\frac{\Lambda^2(1-b^{-2})}{16\pi^2},
$$

$$
I_2=\frac1{8\pi^2}\int_{\Lambda/b}^{\Lambda}\frac{dq}{q}
=\frac{\log b}{8\pi^2}.
$$

$b=e^{\delta t}$ なら $I_1=\Lambda^2\delta t/(8\pi^2)+O(\Lambda^2\delta t^2)$、$I_2=\delta t/(8\pi^2)$ です。後者は $\log b=\delta t$ によりこの殻積分で厳密です。
<!-- solution-end -->

### 演習 QFT26-A5：一次・二次のlog展開

- Level: A
- 問題：一定の低モード背景 $\varphi$ で $u=\lambda\varphi^2/[2(q^2+m^2)]$ とし、$\frac12\log(1+u)$ の $\varphi^2$ と $\varphi^4$ の係数を求め、作用の $m^2\varphi^2/2$、$\lambda\varphi^4/24$ と比較せよ。

<!-- solution-start -->
**詳細解答**

$\log(1+u)=u-u^2/2+O(u^3)$ より

$$
\frac12\log(1+u)=\frac{\lambda\varphi^2}{4(q^2+m^2)}
-\frac{\lambda^2\varphi^4}{16(q^2+m^2)^2}+O(\varphi^6).
$$

[殻積分と一ループ流](#thm-qft26-shell-flow)の $I_1,I_2$ を掛け、作用の二次係数・四次係数にそれぞれ合わせると

$$
\frac{\delta m^2}{2}=\frac{\lambda I_1}{4},
\qquad \delta m^2=\frac{\lambda I_1}{2},
$$

$$
\frac{\delta\lambda}{24}=-\frac{\lambda^2I_2}{16},
\qquad \delta\lambda=-\frac{3\lambda^2}{2}I_2.
$$

$4!=24$ を落とすと一ループの係数が誤ります。
<!-- solution-end -->

### 演習 QFT26-B1：赤外向きの四次結合

- Level: B
- 問題：$d=4$、$m^2/\Lambda^2\ll1$、$\delta\lambda=-3\lambda^2I_2/2$ とする。薄殻積分から $d\lambda/dt$ を求め、$\lambda(0)=\lambda_0>0$ で一ループ方程式を積分し、QFT25の紫外向き $\beta_\lambda$ と比較せよ。

<!-- solution-start -->
**詳細解答**

[殻積分](#thm-qft26-shell-flow)の $I_2=\delta t/(8\pi^2)+O(\delta t^2,r\delta t)$ を用い

$$
\frac{\delta\lambda}{\delta t}
=-\frac{3\lambda^2}{2}\frac1{8\pi^2}
=-\frac{3\lambda^2}{16\pi^2}.
$$

$a=3/(16\pi^2)$ とすると $d(1/\lambda)/dt=a$、従って $\lambda(t)=\lambda_0/(1+a\lambda_0t)$。$t=\log(\Lambda_0/Q)$ なら $d/dt=-d/d\log Q$ です。[QFT25の $\beta_\lambda=+a\lambda^2$](../QFT25/index.md#thm-qft25-phi4-beta)と符号が逆なのは同じ尺度を逆向きに動かしたためです。有限質量や方式依存を省いたleading logでの比較です。
<!-- solution-end -->

### 演習 QFT26-B2：質量と閾値

- Level: B
- 問題：$r=m^2/\Lambda^2\ge0$、薄殻の $\delta m^2=(\lambda/2)I_1$ と $\delta\lambda=-(3\lambda^2/2)I_2$ を使い、木レベル再スケーリングを加えて $dr/dt,d\lambda/dt$ の先頭項を求めよ。$r=0$ と $r=9$ で結合流のループ係数の比を求めよ。

<!-- solution-start -->
**詳細解答**

$I_1=\Lambda^2\delta t/[8\pi^2(1+r)]+O(\delta t^2)$、$I_2=\delta t/[8\pi^2(1+r)^2]+O(\delta t^2)$。$m'^2=e^{2\delta t}(m^2+\delta m^2)$ だから

$$
\frac{dr}{dt}=2r+\frac{\lambda}{16\pi^2(1+r)}+O(\lambda^2),\qquad
\frac{d\lambda}{dt}=-\frac{3\lambda^2}{16\pi^2(1+r)^2}+O(\lambda^3).
$$

$r=0$ のループ係数に対し $r=9$ は $(1+9)^{-2}=1/100$ です。これは鋭い殻・零運動量射影での閾値関数で、方式に依存しない普遍的な形そのものではありません。
<!-- solution-end -->

### 演習 QFT26-B3：重い場の平方完成

- Level: B
- 問題：周期境界の有限モード模型で $K=M^2-\partial^2>0$、重い実場 $\chi$ に $S_\chi=\frac12\langle\chi,K\chi\rangle+(h/2)\langle\chi,\phi^2\rangle$ が作用する。$\chi$ のモード集合は $\phi^2$ のFourier支持をすべて含み、その運動量は $|p|\le P\ll M$ とする。$\chi$ を積分して誘導される $\phi^4$ の係数と $|\partial(\phi^2)|^2$ の係数を $1/M$ の展開で求めよ。

<!-- solution-start -->
**詳細解答**

$J=h\phi^2/2$ として $\chi'=\chi+K^{-1}J$ と置けば

$$
S_\chi=\frac12\langle\chi',K\chi'\rangle-\frac12\langle J,K^{-1}J\rangle.
$$

[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)では平行移動した積分は $\phi$ に依存しないので、第二項だけが低場の作用に残り、$\Delta S=-h^2\langle\phi^2,K^{-1}\phi^2\rangle/8$ です。$\phi^2$ の支持が $|p|\le P\ll M$ なので、$K^{-1}(p)=M^{-2}-p^2M^{-4}+O(p^4/M^6)$ を代入でき、$p^2$ を $-\partial^2$ へ戻すと

$$
\Delta S=-\frac{h^2}{8M^2}\int\phi^4
+\frac{h^2}{8M^4}\int|\partial(\phi^2)|^2+\cdots.
$$

標準の $\lambda\phi^4/24$ で書けば $\Delta\lambda=-24h^2/(8M^2)=-3h^2/M^2$ です。計算は $\phi^2$ の運動量が $M$ より十分小さいときに限ります。
<!-- solution-end -->

### 演習 QFT26-B4：無関連でも残すべき項

- Level: B
- 問題：四次元の有効作用に $c_4\phi^4$ と $(c_6/M^2)\phi^2(\partial\phi)^2$ があり、$c_4,c_6$ は無次元とする。典型的な外部運動量 $Q\ll M$ で、それぞれの木レベル指数と、後者の前者に対する相対次数を求めよ。$c_4=0$ の場合にも同じ「相対次数」と言えるか。

<!-- solution-start -->
**詳細解答**

[木レベル指数](#thm-qft26-tree-scaling)から、$\phi^4$ は $(n,s)=(4,0)$ で $y=0$、$\phi^2(\partial\phi)^2$ は $(4,2)$ で $y=-2$ です。典型的な外部運動量が $Q$ のとき、微分二つが $Q^2$ を生むので、四点接触項の係数を比べると

$$
\frac{\text{導関数付き項の大きさ}}{\text{四次項の大きさ}}
=O\!\left(\left|\frac{c_6}{c_4}\right|\frac{Q^2}{M^2}\right)
\qquad(c_4\ne0)
$$

です。$c_4=0$ なら分母にする四次振幅がないので「それに対する相対抑制」は定義できません。無関連項が最初の非零寄与になる可能性があります。
<!-- solution-end -->

### 演習 QFT26-C1：Wilson流と有効場の理論の整合

- Level: C
- 問題：四次元Euclid模型で初期カットオフ $\Lambda_0$ における四次結合を $\lambda_0>0$、質量比を $r\ll1$ とする。一ループの赤外向き流を $d\lambda/dt=-3\lambda^2/(16\pi^2)$、$t=\log(\Lambda_0/Q)$ と近似する。別に、質量 $M$ の重いGaussian実場 $\chi$ が軽い場 $\phi$ に $(h/2)\chi\phi^2$ で結合しており、低エネルギー $Q\ll M$ で消去できるとする。

  1. $\lambda(Q)$ を求め、$Q<\Lambda_0$ の範囲で一ループの変化の符号を判定せよ。
  2. $\chi$ の消去が $\phi^4/24$ の係数へ与える木レベルの差 $\Delta\lambda$ を計算せよ。
  3. $\chi$ の消去で生じる最初の導関数付き項と、$Q/M$ による相対抑制を求めよ。
  4. (1) のWilson流と (2) のmatchingを単純に同じ $\beta$ 関数として加算してよいか。二つの計算で固定するもの・近似の条件を明記して説明せよ。

<!-- solution-start -->
**詳細解答**

(1) $a=3/(16\pi^2)$ と置くと $d(1/\lambda)/dt=a$ なので

$$
\frac1{\lambda(Q)}=\frac1{\lambda_0}+a\log\frac{\Lambda_0}{Q},\qquad
\lambda(Q)=\frac{\lambda_0}{1+a\lambda_0\log(\Lambda_0/Q)}.
$$

$Q<\Lambda_0$ なら分母は $1$ より大きく $\lambda(Q)<\lambda_0$。$a\lambda_0\log(\Lambda_0/Q)$ が過大になる場合、他の生成演算子や閾値を無視した近似の精度を別途点検します。

(2) $J=h\phi^2/2$、$K=M^2-\partial^2$ として平方完成すると有効作用への寄与は $-\frac12\langle J,K^{-1}J\rangle$。$K^{-1}=M^{-2}+\cdots$ より

$$
\Delta S_{\phi^4}=-\frac{h^2}{8M^2}\int d^4x\,\phi^4
=\int d^4x\,\frac{\Delta\lambda}{24}\phi^4,
\qquad \Delta\lambda=-\frac{3h^2}{M^2}.
$$

(3) 逆核の次項は $-p^2/M^4$ なので、符号を含めると

$$
\Delta S_{\partial}
=\frac{h^2}{8M^4}\int d^4x\,|\partial(\phi^2)|^2.
$$

四つの場と二つの微分から $y=4-4-2=-2$ で無関連です。$\phi^4$ に対する大きさは、相殺がない典型的な運動量配置では $Q^2/M^2$ の相対次数となります。

(4) (1) はカットオフにある**軽い場の高運動量殻**を段階的に除き、$Q$ まで走らせた対数の変化です。一方、(2) は質量 $M$ の**重い自由度を取り除くときの境界条件の合わせ込み（matching）**です。そこで得た

$$
\Delta\lambda=-\frac{3h^2}{M^2}
$$

は $\log Q$ 微分の係数ではありません。

例えば $Q<M<\Lambda_0$ なら、まず $M$ 近傍で有効理論の四次結合を対応付け、その下の尺度では軽い自由度の流れを用います。高尺度側の流れ、軽い側の流れ、有限な合わせ込み係数を区別します。

低運動量展開の条件は $\phi^2$ の外部運動量が $M$ より小さいこと、殻流の近似条件は $r\ll1$ と小結合です。単純加算では両者を重複計上しかねません。
<!-- solution-end -->

## 6. 学びの整理

- [Wilson作用](#def-qft26-wilson-action)は、残した低運動量の期待値を保つように高いモードを積分した結果です。有限モードでは[保存命題](#prop-qft26-low-mode-observables)が通常の積分計算で証明できます。
- [関連・無関連・周辺](#def-qft26-relevance)はGaussian固定点近傍の木レベル分類です。[局所単項式の木レベルスケーリング](#thm-qft26-tree-scaling)から四次元の質量は関連、$\phi^4$ は周辺、$\phi^6$ は無関連となります。
- [薄殻の一ループ計算](#thm-qft26-shell-flow)で $\phi^4$ の赤外向き流は負となり、[QFT25の紫外向きβ](../QFT25/index.md#thm-qft25-phi4-beta)とleading logが整合します。質量の加法的なカットオフ依存まで同一視しません。
- [重い場の消去](#prop-qft26-heavy-matching)では四次係数が有限にずれ、導関数付きの無関連項が $Q^2/M^2$ で抑制されます。これは量子補正の走りとは別の**低エネルギー係数の照合**です。

次は赤外の発散と軟光子を扱い、有限の測定分解能があるときに観測できる確率をどう作るかへ進みます。
