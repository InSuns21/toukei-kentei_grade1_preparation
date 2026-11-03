# QFT42 QCDの漸近自由性の適用域・静的ポテンシャル・閉じ込めの境界

<!-- definition-example-audit: strict -->

[QFT41の一ループQCD β関数](../QFT41/index.md#thm-qft41-qcd-beta)から、高エネルギーほど強結合が小さくなることを学びました。では、その式を低エネルギーへ延長するとハドロンができると証明できるのでしょうか。**答えは否**です。結合が大きくなる場所は、まさに有限次数の摂動展開を信用できなくなる場所です。

今回は二つの独立した計算を行います。高尺度側では一ループ流を積分し、色一重項の短距離ポテンシャルを計算します。低尺度を考えるためには、自由な色付き外線に頼らない観測量が必要です。そこで格子の閉路に沿って色を運ぶゲージ不変量を構成し、純ゲージ理論の強結合展開を有限格子上で直接計算します。二つの展開の間に未解決の領域があることを、計算結果と仮定から見分けます。

前半は四次元QCD、$\hbar=c=1$、$SU(3)$ の基本生成子 $t^A$ に $\operatorname{tr}(t^At^B)=\delta^{AB}/2$ を用います。後半は間隔 $a>0$ の有限Euclid格子、**動的クォークを含まない純 $SU(3)$ ゲージ理論**を対象とします。両者は同じ近似でも、同一の極限でもありません。

## 1. 一ループ流から尺度が生まれる理由

[QFT41の走る結合の定義](../QFT41/index.md#def-qft41-running-alpha)は、結合を固定値でなくくりこみ尺度 $Q$ の関数として扱いました。固定フレーバー数 $n_f$、質量閾値を跨がない区間で

$$
\frac{d\alpha_s}{d\log Q}
=-\frac{b_0}{2\pi}\alpha_s^2+O(\alpha_s^3),
\qquad b_0=11-\frac23n_f
$$

です。$b_0>0$、$\alpha_s>0$ とします。右辺の主要項が小さいのは $\alpha_s\ll1$ のときで、低尺度までの無条件な外挿は許されません。

ここで **一ループの $\Lambda$ 尺度**を、正の結合の値と参照尺度を組み合わせた積分定数として導入します。物理的な粒子の質量を定義するものではありません。また、高次の補正を変えると $\Lambda$ の数値的な方式依存が現れます。

<a id="def-qft42-lambda"></a>

<!-- formal-statement-start -->
> **定義（一ループQCDのΛ尺度と摂動域）**  
> 質量閾値から離れた四次元 $SU(3)$ QCDの固定 $n_f$ 区間を考え、$b_0=11-2n_f/3>0$、参照尺度 $Q_0>0$、$\alpha_s(Q_0)=a_0>0$ とする。一ループ近似の積分定数 $\Lambda_{n_f}^{(1)}$ を

$$
\Lambda_{n_f}^{(1)}
=Q_0\exp\left(-\frac{2\pi}{b_0a_0}\right)
$$

> と定義する。この一ループ近似での **摂動域**とは、適用する全尺度で $\alpha_s(Q)\ll1$ であり、捨てた高次項と大きな未再和対数が評価可能な範囲を指す。$Q>\Lambda_{n_f}^{(1)}$ だけでは十分ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft42-lambda -->
### 例：三フレーバーの尺度比較

**定義の確認**：$n_f=3$ なら $b_0=9>0$ です。$Q_0/\Lambda=e^5$ と選ぶと、定義式を逆に解いた $a_0=2\pi/45\simeq0.140$ は正かつ小さめです。一方 $Q_0/\Lambda=e^2$ では $a_0=\pi/9\simeq0.349$ で高次補正がより重要になります。両方とも $Q_0>\Lambda$ ですが、それだけで同じ精度の摂動計算ができるわけではありません。この例は三フレーバーを固定した形式的な比較で、重いクォーク閾値を含む実測値の当てはめではありません。
<!-- definition-example-end -->

<a id="prop-qft42-lambda-flow"></a>

<!-- formal-statement-start -->
> **命題（一ループ流の積分定数と尺度依存）**  
> 上記の固定 $n_f$、$b_0>0$ の一ループ微分方程式で $O(\alpha_s^3)$ を切り捨て、正の初期値 $a_0$ を指定する。解が正で有限な区間では

$$
\alpha_s(Q)=\frac{2\pi}{b_0\log(Q/\Lambda_{n_f}^{(1)})},
\qquad Q>\Lambda_{n_f}^{(1)}.
$$

> $Q\downarrow\Lambda_{n_f}^{(1)}$ でこの**近似式**は発散するが、そこが物理的な極・閉じ込め尺度の厳密な値であるとは結論できない。$Q\to\infty$ では一ループ解は零へ近づく。
<!-- formal-statement-end -->

### 証明の見取り図

微分方程式を $\alpha_s^{-1}$ について積分します。その積分定数を定義の指数式で書き直したのち、正値条件と両端の極限を調べます。

<!-- proof-start -->
### 証明

[QFT41の一ループβ関数](../QFT41/index.md#thm-qft41-qcd-beta)を、一ループで厳密な微分方程式として扱うと

$$
\frac{d}{d\log Q}\left(\frac1{\alpha_s}\right)
=-\frac1{\alpha_s^2}\frac{d\alpha_s}{d\log Q}
=\frac{b_0}{2\pi}.
$$

$Q_0$ から $Q$ へ積分して

$$
\frac1{\alpha_s(Q)}
=\frac1{a_0}+\frac{b_0}{2\pi}\log\frac Q{Q_0}
=\frac{b_0}{2\pi}\log\frac Q{\Lambda_{n_f}^{(1)}}.
$$

最後の等号には $\log(Q_0/\Lambda)=2\pi/(b_0a_0)$ を代入しました。$b_0>0$ で $\alpha_s>0$ を維持するため $\log(Q/\Lambda)>0$ が必要です。$Q\to\infty$ で分母は発散し $\alpha_s\to0$、$Q\downarrow\Lambda$ で分母は正側から零へ寄ります。しかし微分方程式自体が $O(\alpha_s^3)$ を捨てたものなので、後者の極限は元のQCDへの正当な極限操作ではありません。
<!-- proof-end -->

**大きな対数の注意**：尺度を $Q_0$ から大きく変えて $\alpha_s(Q_0)\log(Q/Q_0)$ が大きくなれば、固定次数での対数展開は崩れます。[QFT25のくりこみ群方程式と走る結合](../QFT25/index.md#def-qft25-rg-equation)を解く目的は、その対数を体系的にまとめ直すことです。これも $\alpha_s\sim1$ の強結合領域を自動的に解く方法ではありません。

## 2. 短距離で色一重項の二体力を計算する

色付きクォークを遠くまで独立な漸近粒子として追うのは危険です。しかし十分短い距離 $r$ では、重いクォーク $Q$ と反クォーク $\bar Q$ を外部の静的源として置き、一グルーオン交換による**相互作用部分**を計算できます。静的近似とは源が重く、その運動エネルギーや反跳をこの次数で無視することです。

反クォークの色生成子は $T_{\bar Q}^A=-(t^A)^*$、クォークでは $T_Q^A=t^A$ です。二体色空間 $\mathbf3\otimes\overline{\mathbf3}$ における、規格化された色一重項を $|S\rangle=\sum_i|i\bar i\rangle/\sqrt3$ とします。この状態は同時の $SU(3)$ 変換 $U\otimes U^*$ で不変です。

一グルーオン交換の運動量空間Coulomb核は $1/\mathbf k^2$ を持ちます。したがって相互作用の符号は $\sum_AT_Q^AT_{\bar Q}^A$ の固有値で決まります。

<a id="def-qft42-static-potential"></a>

<!-- formal-statement-start -->
> **定義（静的色源の相互作用ポテンシャル）**  
> 四次元QCDの静的・非相対論的Born近似で、相対位置 $\mathbf r$（$r=|\mathbf r|>0$）にある基本表示の重いクォークと反基本表示の反クォークの交換核を

$$
\widetilde V(\mathbf k)
=\frac{4\pi\alpha_s}{\mathbf k^2}
\sum_{A=1}^8T_Q^A\otimes T_{\bar Q}^A
$$

> とする。その三次元逆Fourier変換を本章の**短距離静的相互作用ポテンシャル** $V(\mathbf r)$ と定義する。$\alpha_s$ はこの次数では一定のくりこみ済み結合とし、自己エネルギーに由来する位置非依存定数は除く。長距離の厳密な閉じ込めポテンシャルの定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft42-static-potential -->
### 例：色一重項で引力になる条件

**定義の確認**：$T^A_{\rm total}=T_Q^A\otimes I+I\otimes T_{\bar Q}^A$ が $|S\rangle$ を消すことを成分で見ると、$t^A_{ji}$ で回転するクォーク側と $-(t^A)^*_{ji}$ で回転する反クォーク側が相殺します。従って $(T_{\rm total})^2|S\rangle=0$ です。[QFT41の $C_F=4/3$](../QFT41/index.md#lem-qft41-su3-completeness)を両方の脚に適用すると

$$
0=\langle S|(T_{\rm total})^2|S\rangle
=2C_F+2\left\langle S\left|\sum_AT_Q^AT_{\bar Q}^A\right|S\right\rangle.
$$

したがって色因子は $-C_F=-4/3$。逆Fourier変換した正の $1/r$ 核へ負号が掛かるため、**この一重項チャネル**は引力です。色配置を指定せずに全チャネルが引力と言ったわけではありません。
<!-- definition-example-end -->

<a id="prop-qft42-short-potential"></a>

<!-- formal-statement-start -->
> **命題（短距離色一重項ポテンシャル）**  
> $SU(3)$ QCDの基本–反基本静的源を色一重項に射影し、$r>0$、一グルーオン交換のBorn近似、固定された小さい $\alpha_s>0$ を仮定する。前の定義に従う相互作用部分は

$$
V_S(r)=-\frac{C_F\alpha_s}{r}
=-\frac{4\alpha_s}{3r}.
$$

> $r^{-1}$ を代表尺度とした $\alpha_s(1/r)$ の使用は高次対数を整理するRG改善であり、$r\to\infty$ までの厳密式を与えない。
<!-- formal-statement-end -->

### 証明の見取り図

色演算子は一重項で $-4/3$ 倍の恒等作用になります。残りの三次元Fourier積分は収束因子を入れて角度積分し、最後に因子を外します。

<!-- proof-start -->
### 証明

[色一重項とCasimirの関係](#def-qft42-static-potential)より、投影した運動量核は $\widetilde V_S(\mathbf k)=-4\pi C_F\alpha_s/\mathbf k^2$ です。$r>0$ に固定し、紫外収束因子 $e^{-\varepsilon |\mathbf k|}$（$\varepsilon>0$）を入れます。$\mathbf k$ の極角の軸を $\mathbf r$ に合わせると

$$
\begin{aligned}
I_\varepsilon(r)
&=\int\frac{d^3\mathbf k}{(2\pi)^3}
\frac{e^{i\mathbf k\cdot\mathbf r-\varepsilon |\mathbf k|}}{\mathbf k^2}\\
&=\frac1{(2\pi)^3}\int_0^\infty dk\,e^{-\varepsilon k}
\left(2\pi\int_{-1}^1e^{ikr x}dx\right)\\
&=\frac1{2\pi^2r}\int_0^\infty e^{-\varepsilon k}
\frac{\sin(kr)}k\,dk.
\end{aligned}
$$

最後の積分を $F(r)$ とおくと、$F(0)=0$、$F'(r)=\int_0^\infty e^{-\varepsilon k}\cos(kr)dk=\varepsilon/(\varepsilon^2+r^2)$ なので $F(r)=\arctan(r/\varepsilon)$ です。従って $\varepsilon\downarrow0$ で

$$
I_\varepsilon(r)=\frac{\arctan(r/\varepsilon)}{2\pi^2r}
\longrightarrow\frac1{4\pi r}.
$$

これを $-4\pi C_F\alpha_s$ 倍すれば結論です。ここで $r>0$ を固定したので接触項・自己エネルギーの定数については主張していません。
<!-- proof-end -->

この $1/r$ の引力から $V(r)\propto r$ を推論することはできません。近似の条件が変わるからです。遠い二つの源を調べるには、経路の途中で色の向きを運ぶ**並進ではなくゲージ並行移動**を使います。

## 3. 色の向きを一周させるWilsonループ

[QFT28の有限ゲージ変換](../QFT28/index.md#thm-qft28-gauge-covariance)では、ゲージ場と色基底の選び方が同時に変わります。離れた点の色ベクトルをそのまま内積すると、別々の局所変換のせいで不変になりません。**リンク変数** $U_{xy}$ は格子の隣接点 $y$ から $x$ へ色ベクトルを運ぶ $SU(3)$ 行列であり、変換則 $U_{xy}\mapsto V_xU_{xy}V_y^{-1}$ を持つように置きます。逆向きリンクは $U_{yx}=U_{xy}^{-1}$ です。

閉路 $C=(x_0,x_1,\dots,x_m=x_0)$ に沿ってリンクを順に掛けると、最初の色空間へ戻ります。順序を交換してはいけません。そこでトレースを取り、起点での基底選択を消します。

<a id="def-qft42-wilson-loop"></a>

<!-- formal-statement-start -->
> **定義（格子のWilsonループ）**  
> 有限Euclid格子の各向き付き最近接辺 $(x,y)$ に $U_{xy}\in SU(3)$、$U_{yx}=U_{xy}^{-1}$ を割り当てる。閉じた向き付き辺列 $C=(x_0,x_1,\ldots,x_m=x_0)$ に対し、基本表示のWilsonループを

$$
W(C)=\frac13\operatorname{tr}
\bigl(U_{x_0x_1}U_{x_1x_2}\cdots U_{x_{m-1}x_0}\bigr)
$$

> と定義する。物理的な期待値 $\langle W(C)\rangle$ を用いる際には、ゲージ不変な重みとリンク変数の積分測度を別途指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft42-wilson-loop -->
### 例：一つの正方形の向きとトレース

**定義の確認**：四辺を順に $U_1=\operatorname{diag}(e^{i\theta},e^{-i\theta},1)$、$U_2=U_3=U_4=I_3$ と置きます。全てユニタリで行列式1、逆向きには逆行列を与えるので条件を満たします。一周積は $U_1$、したがって $W(C)=(1+2\cos\theta)/3$ です。$\theta=0$ で $W=1$。逆向きに一周すれば $W(C^{-1})=W(C)^*$ となり、この例では実数のままです。変換後も同じ値になることは次の命題で検算します。
<!-- definition-example-end -->

<a id="prop-qft42-wilson-invariant"></a>

<!-- formal-statement-start -->
> **命題（Wilsonループのゲージ不変性）**  
> 上の定義の有限格子・閉路 $C$ において、各頂点 $x$ に任意の $V_x\in SU(3)$ を取り、全向き付きリンクを次のように変換する。

$$
U_{xy}'=V_xU_{xy}V_y^{-1}.
$$

> このとき $W'(C)=W(C)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

隣り合う二リンクで中間頂点の $V_{x_i}^{-1}V_{x_i}$ が消え、残る起点の共役はトレースの巡回性で消えます。

<!-- proof-start -->
### 証明

[格子Wilsonループの定義](#def-qft42-wilson-loop)の積へ変換則を代入すると、最初の二項は

$$
(V_{x_0}U_{x_0x_1}V_{x_1}^{-1})
(V_{x_1}U_{x_1x_2}V_{x_2}^{-1})
=V_{x_0}U_{x_0x_1}U_{x_1x_2}V_{x_2}^{-1}.
$$

この相殺を最後まで繰り返し、$x_m=x_0$ を使うと全周積 $U_C$ は $U_C'=V_{x_0}U_CV_{x_0}^{-1}$ へ移ります。従って

$$
W'(C)=\frac13\operatorname{tr}(V_{x_0}U_CV_{x_0}^{-1})
=\frac13\operatorname{tr}(U_CV_{x_0}^{-1}V_{x_0})=W(C).
$$

閉路でなければ始点と終点の変換が違い、この議論は成立しません。
<!-- proof-end -->

長方形の空間幅を $R$、Euclid時間長を $T$ とします。正の転送行列が構成でき、Wilsonループが基底静的二体状態に非零の重なりを持つ格子理論では、スペクトル分解 $\langle W(R,T)\rangle=\sum_n c_n(R)e^{-E_n(R)T}$ から、$T\to\infty$ の対数傾きが静的二体の最低エネルギーを選びます。静的源の自己エネルギーを減算した量が距離依存のポテンシャルです。例えば $\langle W\rangle\sim e^{-\sigma RT-\kappa(R+T)}$ なら面積項の係数 $\sigma>0$ は線形エネルギー $\sigma R$ に対応します。ただしこの漸近式自体をまだ証明したわけではありません。

## 4. 強結合で有限矩形ループを計算する

高エネルギーでは $g_s$ を小さい量として展開しました。これと別の方法として、**有限格子**で裸結合 $g_0$ を大きくしたときの $\beta=6/g_0^2$ を小さい量として展開できます。両者の展開変数は逆向きです。ここでは動的クォークを含めません。各リンクの行列を平均するには、積分の規格化と色基底の取り替えで値が変わらない性質を先に指定する必要があります。

<a id="def-qft42-haar-measure"></a>

<!-- formal-statement-start -->
> **定義（SU(3)上のHaar確率測度）**  
> コンパクト群 $SU(3)$ 上の確率測度 $dU$ が、任意の固定した $V,W\in SU(3)$ と任意の可積分関数 $F$ に対し、全質量1と左右不変性

$$
\int_{SU(3)}1\,dU=1,
\qquad
\int_{SU(3)}F(VUW)\,dU
=\int_{SU(3)}F(U)\,dU
$$

> を満たす測度を対象とする。以下ではその存在をコンパクト群の基本事実として使用し、必要な積分値はこの二条件から導く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft42-haar-measure -->
### 例：中心元を掛ける積分操作

**定義の確認**：$F(U)=1$ は可積分で、左右から任意の $V,W$ を掛けても1のままなので、定義の規格化条件と不変性は整合します。非定数の例として $F(U)=\operatorname{tr}U$ を取り、$z=e^{2\pi i/3}$ とすると $zI_3\in SU(3)$ です。左不変性により $\int F(U)dU=\int F(zU)dU=z\int F(U)dU$ で、$z\ne1$ より積分は0です。後の補題で同じ計算を各行列要素に適用します。これは測度を具体的な座標密度で構成した証明ではなく、定義条件が与える直接の判定例です。
<!-- definition-example-end -->

<a id="def-qft42-wilson-action"></a>

<!-- formal-statement-start -->
> **定義（純ゲージWilson格子作用）**  
> 有限の四次元Euclid正方格子の全向き付き辺に $U_{yx}=U_{xy}^{-1}\in SU(3)$ を割り当てる。各基本正方形 $p$ の境界積 $U_p$ を同じ向きで取る。正の裸結合 $g_0$ と $\beta=6/g_0^2$ に対して

$$
S_W[U]=-\frac{\beta}{3}\sum_p\operatorname{Re}\operatorname{tr}U_p,
\qquad
\langle F\rangle_\beta
=\frac{\int(\prod_{\ell}dU_\ell)F(U)e^{-S_W[U]}}
{\int(\prod_{\ell}dU_\ell)e^{-S_W[U]}}
$$

> と定義する。積は独立な向き付き辺を各一回だけ含み、逆向きは逆行列で表す。境界条件は有限矩形を含む領域で選び、外周に非自明な同一視を持ち込まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft42-wilson-action -->
### 例：単一plaquetteの重みを確認する

**定義の確認**：四辺の積が $U_p=I_3$ なら $\operatorname{Re}\operatorname{tr}U_p=3$、このplaquetteの作用への寄与は $-\beta$ です。一辺だけ $U=\operatorname{diag}(e^{i\theta},e^{-i\theta},1)$、残りが単位行列なら寄与は $-(\beta/3)(1+2\cos\theta)$ です。両者の差は $2\beta(1-\cos\theta)/3\ge0$。リンクを[局所ゲージ変換](#prop-qft42-wilson-invariant)しても $\operatorname{tr}U_p$ は変わらず、$dU$ の左右不変性は積分も不変にします。
<!-- definition-example-end -->

積分を始める前に二つの恒等式を導きます。特に $\int dU\,U_{ij}=0$ は「色の向きを一つだけ残した線」が平均で消えること、二つを逆向きに組にすると $1/3$ が出ることを表します。

<a id="lem-qft42-haar"></a>

<!-- formal-statement-start -->
> **補題（SU(3)Haar積分の基本直交性）**  
> [上で定義した確率測度](#def-qft42-haar-measure) $dU$ について、基本表示の任意の添字 $i,j,k,l\in\{1,2,3\}$ で

$$
\int dU\,U_{ij}=0,
\qquad
\int dU\,U_{ij}U_{kl}^*=\frac13\delta_{ik}\delta_{jl}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最初の式は $SU(3)$ の非自明な中心元を掛けます。二番目の式は左・右からの対角位相変換で零になる添字を選び、残った対角項は行・列の対称性と $U^\dagger U=I$ から規格化します。

<!-- proof-start -->
### 証明

$z=e^{2\pi i/3}$ とすると $zI_3\in SU(3)$、$z\ne1$ です。[定義した測度の左不変性](#def-qft42-haar-measure)により $\int U_{ij}dU=\int(zU)_{ij}dU=z\int U_{ij}dU$。従って第一式は零です。

第二式の積分を $M_{ij;kl}$ とします。左から $D=\operatorname{diag}(e^{i\theta_1},e^{i\theta_2},e^{-i(\theta_1+\theta_2)})$ を掛けると、$M$ には位相 $D_{ii}D_{kk}^*$ が掛かります。任意の $D$ で不変だから $i\ne k$ では $M=0$ です。右から独立な対角行列を掛けても同じ議論ができ、$j\ne l$ で $M=0$ です。従って $M_{ij;kl}=c_{ij}\delta_{ik}\delta_{jl}$。

行・列の置換を実現する行列（必要なら対角の位相で行列式を1にする）を左右から掛けても測度は同じなので、$c_{ij}$ は全て一つの $c$ に等しいです。各固定列 $j$ について $\sum_i|U_{ij}|^2=1$ を積分して $\sum_i c=1$、すなわち $c=1/3$ です。
<!-- proof-end -->

この補題から一つの基本正方形 $p$ について、$\int(\prod dU_\ell)\operatorname{tr}U_p\,\operatorname{tr}U_p^*=1$ です。実際、一辺ずつ共役な行列要素を縮約すると、最後にトレースの内積が1になります。次の命題ではこの縮約を隣接する正方形にも適用します。

<a id="prop-qft42-strong-leading"></a>

<!-- formal-statement-start -->
> **命題（有限矩形Wilsonループの強結合先頭項）**  
> 四次元の有限 $SU(3)$ **純ゲージ**格子で上のWilson重みを用いる。自己交差しない平面上の $n\times m$ 基本正方形を囲む矩形閉路 $C$ を取り、$A=nm\ge1$ を格子単位の面積とする。格子・$n,m$ を固定して $\beta\downarrow0$ とすれば

$$
\langle W(C)\rangle_\beta
=\left(\frac{\beta}{18}\right)^A+O(\beta^{A+1}).
$$

> これは**固定された有限ループ**の先頭次数であり、$n,m\to\infty$ と連続極限 $a\to0$ を含むQCDの閉じ込め証明ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\exp[(\beta/3)\operatorname{Re}\operatorname{tr}U_p]$ から、ループの向きと逆の各plaquetteトレースを一回ずつ選びます。その $A$ 個の面を使った項が最小次数です。隣接する内部辺をHaar積分で縫い合わせ、最後に周囲のループと縮約します。

<!-- proof-start -->
### 証明

各plaquetteの重みは

$$
e^{(\beta/3)\operatorname{Re}\operatorname{tr}U_p}
=1+\frac\beta6(\operatorname{tr}U_p+\operatorname{tr}U_p^*)+O(\beta^2)
$$

です。$\beta=0$ では[Haar直交性](#lem-qft42-haar)により、閉路に沿う一つだけの基本行列成分を含む辺の積分が零です。非零にするには、ループを境界とするplaquette群の境界で各辺を逆向きに組にする必要があります。平面矩形では最少のplaquette数は内側の $A=nm$ 枚です。これを選んだ寄与は、重みから $(\beta/6)^A$ を受けます。

まず $A=1$。$\operatorname{tr}U_p$ と $\operatorname{tr}U_p^*$ の積のHaar平均は1であり、Wilsonループの $1/3$ を合わせて

$$
\langle W(\partial p)\rangle_\beta
=\frac13\cdot\frac\beta6\cdot1+O(\beta^2)
=\frac\beta{18}+O(\beta^2).
$$

二枚の隣接plaquette $p_1,p_2$ では、共有辺 $U$ について[補題の成分積分](#lem-qft42-haar)を用いると

$$
\int dU\,\operatorname{tr}(AU)\operatorname{tr}(U^\dagger B)
=\frac13\operatorname{tr}(AB).
$$

ここで $A,B$ はその他の辺の順序積です。この式を繰り返して $A$ 枚の逆向きplaquetteトレースを一つの外周トレースに縫い合わせると、内部辺ごとに因子 $1/3$、最後の境界縮約も合わせて $3^{-A}$ となります。従って係数は $(\beta/6)^A3^{-A}=(\beta/18)^A$ です。期待値を定義する積分の分母は $Z(\beta)=1+O(\beta^2)$ と規格化され、固定 $A$ の先頭次数を変えません。有限個のリンクで被積分関数は解析的なので、残りは固定格子・固定閉路において高次数です。
<!-- proof-end -->

重要な限定が二つあります。第一に、$O(\beta^{A+1})$ の定数は $A$ と格子サイズに依存しえます。**固定 $A$ の展開式をそのまま $A\to\infty$ に代入してはいけません。** 十分強結合側の純ゲージ模型で面積則を大きいループへ正当化するには、面積に一様な高次の制御が別に必要です。第二に $\beta\ll1$ は裸結合 $g_0\gg1$ であり、格子間隔 $a\to0$ へ向かう連続極限の取り方を示したわけではありません。

## 5. 「色一重項」と「閉じ込め」は同じ定理ではない

純ゲージ模型で大きな矩形Wilsonループが面積則 $\langle W(R,T)\rangle\sim e^{-\sigma RT}$ を示すなら、静的な基本色源を遠くへ引き離すエネルギーが線形に増大するという**閉じ込めの診断**になります。しかし、前節で実際に証明したのは固定ループの最低次係数だけです。

現実のQCDには動的な基本表示クォークもあります。重い外部 $Q\bar Q$ の間の色電場が伸びると、軽い $q\bar q$ の対を作って二つの色一重項重軽中間子 $Q\bar q$、$q\bar Q$ に組み直せます。これは **string breaking（弦の切断）** と呼ばれる機構です。十分離れた静的源の最低エネルギーが二中間子状態へ移れば、厳密な漸近線形ポテンシャルは続きません。Wilsonループ単独がこの状態と弱くしか重ならないこともあるため、有限の $T$ での面積らしい振舞いと真の最低エネルギーを区別します。

また、[QFT41の色一重項の例](../QFT41/index.md#def-qft41-qcd-action)のように局所色変換に不変な演算子を作れることは、全ての色付き孤立状態が物理スペクトルから排除されるという**動力学的主張**を証明しません。ゲージ不変性は記述の冗長性に関する条件であり、閉じ込めや正の質量ギャップは相関関数の長距離振舞い・非摂動スペクトルに関する追加の問題です。

見通しを整理すると、次の三つは別の主張です。

1. 高尺度 $Q$ で $\alpha_s(Q)$ が小さくなる：一ループβ関数と摂動論の適用条件に依存する。
2. 強結合格子純ゲージ模型の有限Wilsonループに $(\beta/18)^A$ が現れる：有限次元Haar積分による結果である。
3. 四次元連続QCDの全ての物理状態と低エネルギースペクトルを構成し、閉じ込めと質量ギャップを厳密に証明する：上の二つからは従わない。

**反例となる推論**：「$\alpha_s$ が一ループで無限大になるから、静的ポテンシャルも線形になる」は成り立ちません。失われた仮定は $\alpha_s\ll1$ で、二体力のBorn核も有限次数展開に依存します。「有限格子の強結合面積則が出たから連続QCDでも証明済み」も誤りで、ループ面積と連続極限に対して展開の余項を一様に制御する段階が欠けています。

## 6. 演習：二つの展開を自分で分離する

特記なければ $SU(3)$、$C_F=4/3$、$b_0=11-2n_f/3$、$\operatorname{tr}(t^At^B)=\delta^{AB}/2$、自然単位系です。格子の問題は有限領域の純ゲージ模型、$\beta\downarrow0$ の固定閉路を扱います。

### 演習 QFT42-A1：一ループ結合の符号と適用域

- Level: A
- 問題：固定 $n_f=3$ の一ループ模型で $Q=e^4\Lambda$ と $Q=e\Lambda$ における $\alpha_s(Q)$ を求め、どちらの摂動展開がより不確かか理由を述べよ。

<!-- solution-start -->
### 詳細解答

[一ループ流の解](#prop-qft42-lambda-flow)に $b_0=9$ と $\log(Q/\Lambda)=4,1$ を代入すると、それぞれ $\alpha_s=2\pi/(9\cdot4)=\pi/18\simeq0.175$、$\alpha_s=2\pi/9\simeq0.698$ です。捨てた次次数は相対的に $O(\alpha_s)$ 程度なので後者の不確かさが大きいです。$Q>\Lambda$ で式が有限だからといって摂動域であるとは限りません。
<!-- solution-end -->

### 演習 QFT42-A2：Λの基準尺度依存を検算

- Level: A
- 問題：$b_0>0$ の固定フレーバー一ループ流で $Q_0\to Q_1$ と参照尺度を変えても、$\Lambda=Q\exp[-2\pi/(b_0\alpha_s(Q))]$ が変わらないことを直接計算せよ。

<!-- solution-start -->
### 詳細解答

[流れの積分式](#prop-qft42-lambda-flow)から $1/\alpha_s(Q_1)=1/\alpha_s(Q_0)+(b_0/(2\pi))\log(Q_1/Q_0)$。両辺に $-2\pi/b_0$ を掛けて指数を取ると $\exp[-2\pi/(b_0\alpha_s(Q_1))]=\exp[-2\pi/(b_0\alpha_s(Q_0))]\,(Q_0/Q_1)$ です。左辺を $Q_1$ 倍すると右辺は $Q_0\exp[-2\pi/(b_0\alpha_s(Q_0))]$ になり等しいです。等式は同一方式・同一 $n_f$ の一ループ流内の不変性で、高次方式変更への不変性は主張しません。
<!-- solution-end -->

### 演習 QFT42-A3：色一重項の係数

- Level: A
- 問題：基本と反基本の二体色空間で $|S\rangle=\sum_i|i\bar i\rangle/\sqrt3$ とし、$T_Q^A+T_{\bar Q}^A$ が $|S\rangle$ を消すとする。$T_Q^2=T_{\bar Q}^2=C_FI$ から $\langle S|\sum_AT_Q^AT_{\bar Q}^A|S\rangle$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\sum_A(T_Q^A+T_{\bar Q}^A)^2$ を展開すると、異なるテンソル因子上の演算子は可換なので $T_Q^2+T_{\bar Q}^2+2\sum_AT_Q^AT_{\bar Q}^A$ です。左辺の $|S\rangle$ における期待値は零、右辺の最初の二項は各 $C_F=4/3$。従って $0=8/3+2X$、$X=-4/3$ です。符号は反基本生成子に負号があることに由来します。
<!-- solution-end -->

### 演習 QFT42-A4：閉路の起点と逆方向

- Level: A
- 問題：閉路 $C$ の順序積を $U_C=U_1U_2U_3$ とし、各 $U_i\in SU(3)$ とする。起点を次の頂点へ移したときのトレースと、逆向きに回った $W(C^{-1})$ を求めよ。

<!-- solution-start -->
### 詳細解答

起点移動で積は $U_2U_3U_1=U_1^{-1}(U_1U_2U_3)U_1$ なのでトレースは巡回性で同じです。逆向きリンクは逆行列だから積は $U_3^{-1}U_2^{-1}U_1^{-1}=(U_1U_2U_3)^{-1}$。ユニタリ性より $U_C^{-1}=U_C^\dagger$、従って $W(C^{-1})=\operatorname{tr}(U_C^\dagger)/3=W(C)^*$ です。両方とも[Wilsonループの定義](#def-qft42-wilson-loop)に従います。
<!-- solution-end -->

### 演習 QFT42-A5：一つのplaquetteの平均

- Level: A
- 問題：各リンクに[定義した確率測度](#def-qft42-haar-measure)を独立に使う純 $SU(3)$ 格子で $W(\partial p)=\operatorname{tr}U_p/3$ とする。重み $e^{(\beta/3)\operatorname{Re}\operatorname{tr}U_p}$ を一次展開して $\langle W(\partial p)\rangle=\beta/18+O(\beta^2)$ を導け。

<!-- solution-start -->
### 詳細解答

$e^{(\beta/3)\operatorname{Re}\operatorname{tr}U_p}=1+(\beta/6)(\operatorname{tr}U_p+\operatorname{tr}U_p^*)+O(\beta^2)$。零次の $\int\operatorname{tr}U_p=0$ は[Haar補題](#lem-qft42-haar)から従います。一次で $\operatorname{tr}U_p\operatorname{tr}U_p$ は中心元で $z^2$ 倍され、$z^2\ne1$ なので積分が零です。他方 $\int\operatorname{tr}U_p\operatorname{tr}U_p^*=1$。したがって分子は $(1/3)(\beta/6)=\beta/18$、分母は $1+O(\beta^2)$ で先頭項を変えません。
<!-- solution-end -->

### 演習 QFT42-B1：Coulomb核から引力まで

- Level: B
- 問題：色一重項の交換核 $\widetilde V_S(\mathbf k)=-4\pi C_F\alpha_s/\mathbf k^2$ を考える。$r>0$、$\varepsilon>0$ で $e^{-\varepsilon|\mathbf k|}$ を掛けて逆Fourier変換し、$\varepsilon\downarrow0$ の極限と符号を求めよ。

<!-- solution-start -->
### 詳細解答

角度積分は $\int_{S^2}e^{ikr\cos\theta}d\Omega=4\pi\sin(kr)/(kr)$。従って逆変換は

$$
-\frac{4\pi C_F\alpha_s}{2\pi^2r}\int_0^\infty e^{-\varepsilon k}\frac{\sin(kr)}k\,dk.
$$

積分を $F(r)$ とすると、$F(0)=0$、$F'(r)=\varepsilon/(\varepsilon^2+r^2)$ なので $F(r)=\arctan(r/\varepsilon)$ です。$r>0$ 固定で $F(r)\to\pi/2$、逆変換の係数は $-(4\pi C_F\alpha_s)/(2\pi^2r)\cdot\pi/2=-C_F\alpha_s/r$。$C_F=4/3$ なら $-4\alpha_s/(3r)$。この結果は[短距離ポテンシャルの命題](#prop-qft42-short-potential)の仮定を超えて大距離まで延長できません。
<!-- solution-end -->

### 演習 QFT42-B2：二plaquetteを縫い合わせる

- Level: B
- 問題：隣接する二つの正方形 $p_1,p_2$ を囲む $1\times2$ 矩形を考える。共有辺 $U$ を逆向きに含む二つのplaquetteトレースを $\operatorname{tr}(AU)$、$\operatorname{tr}(U^\dagger B)$ と書けるとする。共有辺の積分を計算し、$\beta^2$ の先頭係数が $1/18^2$ になることを示せ。

<!-- solution-start -->
### 詳細解答

添字を展開し、[Haar補題](#lem-qft42-haar)の $\int U_{ji}U^*_{kl}=\delta_{jk}\delta_{il}/3$ を使うと

$$
\begin{aligned}
\int dU\,\operatorname{tr}(AU)\operatorname{tr}(U^\dagger B)
&=\sum_{i,j,k,l}A_{ij}B_{kl}\int U_{ji}U^*_{kl}\,dU\\
&=\frac13\sum_{i,j}A_{ij}B_{ji}
=\frac13\operatorname{tr}(AB).
\end{aligned}
$$

二つのplaquetteの向きを外周と逆に選ぶ係数は $(\beta/6)^2$。共有辺の上式で $1/3$、残りの外周とWilsonループの縮約でさらに $1/3$ となり、$\langle W\rangle=(\beta/6)^2(1/3)^2+O(\beta^3)=\beta^2/324+O(\beta^3)$ です。二枚の重みは別々のplaquetteなので指数の $1/2!$ を追加しません。
<!-- solution-end -->

### 演習 QFT42-B3：面積則を宣言する前の不足条件

- Level: B
- 問題：各固定面積 $A$ で次の漸近展開が成り立つとする。

$$
W_A(\beta)=\left(\frac\beta{18}\right)^A+O_A(\beta^{A+1}).
$$

1. これだけで $A\to\infty$ の量 $-\log W_A/A$ を確定できない理由を述べよ。
2. どのような追加の一様性があれば面積に比例する自由エネルギーを論じられるか。

<!-- solution-start -->
### 詳細解答

1. $O_A$ の係数は面積 $A$ ごとに異なることが許されます。例えば固定面積では次の形も許されます。

$$
W_A(\beta)=\left(\frac\beta{18}\right)^A
\left[1+A^2\beta+O(\beta^2)\right].
$$

ここで $A^2\beta$ は $A\to\infty$ で小さくありません。従って固定面積での $\beta\to0$ と大面積の極限を、この情報だけで交換できません。

2. 例えば十分小さい $\beta$ で大きな矩形に一様に次を示すような、高次の収束評価が必要です。

$$
\log W_A(\beta)
=-A\sigma_{\rm lat}(\beta)+O(\operatorname{perimeter}(C)).
$$

これは[有限矩形の先頭項](#prop-qft42-strong-leading)だけから出ず、別の解析的制御です。
<!-- solution-end -->

### 演習 QFT42-B4：動的クォークで弦が切れる

- Level: B
- 問題：重い外部 $Q\bar Q$ の弦状態の模型エネルギーを $E_{\rm string}(R)=2M_Q+\sigma R+c$、二つの重軽中間子を $E_{\rm pair}=2M_{Q\bar q}$ と置く。$\sigma>0$ とする。両者の交差距離を求め、最低エネルギーが単純な $\sigma R$ のまま増えない仕組みを述べよ。

<!-- solution-start -->
### 詳細解答

等式 $2M_Q+\sigma R_*+c=2M_{Q\bar q}$ を解くと $R_*=[2M_{Q\bar q}-2M_Q-c]/\sigma$ です。右辺が正の設定では、$R>R_*$ で $E_{\rm string}>E_{\rm pair}$。混合がなければ最低エネルギーは二曲線の小さい方、混合があれば回避交差を経て二中間子寄りになります。いずれにせよ最終的に線形増大し続ける必要はありません。これは動的基本クォークを入れることによる追加チャネルであり、**純ゲージ**の[強結合先頭項](#prop-qft42-strong-leading)の計算を否定するものではありません。
<!-- solution-end -->

### 演習 QFT42-C1：二つの極限を混同しない総合演習

- Level: C
- 問題：固定 $n_f=3$ の一ループQCDで $Q_h=e^6\Lambda$、$Q_l=e^2\Lambda$ とし、短距離一重項Bornポテンシャルを $V_S(r)=-C_F\alpha_s(1/r)/r$ で近似する。一方、有限純 $SU(3)$ 格子の $n\times m$ Wilson矩形では先頭の強結合項が $(\beta/18)^{nm}$ とする。次を求めよ。
  1. $\alpha_s(Q_h)$ と $\alpha_s(Q_l)$ を計算し、摂動の制御がより良い方を述べよ。
  2. $r_h=1/Q_h$、$r_l=1/Q_l$ での $rV_S(r)$ のBorn評価とその信頼度を比較せよ。
  3. $1\times3$ 矩形の強結合先頭項を計算し、固定面積の式から大面積・連続QCDの閉じ込めへ至る際に欠ける論証を二つ挙げよ。

<!-- solution-start -->
### 詳細解答

1. [一ループ流](#prop-qft42-lambda-flow)へ $b_0=9$ と対数 $6,2$ を入れると

$$
\alpha_s(Q_h)=\frac{2\pi}{54}=\frac\pi{27}\simeq0.116,
\qquad
\alpha_s(Q_l)=\frac{2\pi}{18}=\frac\pi9\simeq0.349.
$$

高尺度側の方が小さい展開パラメータを持つため、通常は低次摂動の制御が良いです。いずれも固定 $n_f$ の模型計算で、物理的な閾値を跨ぐ場合は式をそのまま使えません。

2. [一重項の短距離ポテンシャル](#prop-qft42-short-potential)は $rV_S=-C_F\alpha_s(1/r)$ を与えます。$C_F=4/3$ を掛けて

$$
r_hV_S(r_h)=-\frac{4\pi}{81}\simeq-0.155,
\qquad
r_lV_S(r_l)=-\frac{4\pi}{27}\simeq-0.465.
$$

後者は数値的に強い引力でも、次次数の寄与が主項と比べて大きくなるので**精密な長距離予言に近づいた**ことにはなりません。ここで $\alpha_s(1/r)$ としたこと自体も高次対数をまとめる近似であり、係数や定数項を全次数で決めていません。

3. 格子面積は $A=1\cdot3=3$ なので[先頭項](#prop-qft42-strong-leading)は

$$
\langle W_{1\times3}\rangle_\beta
=\left(\frac\beta{18}\right)^3+O(\beta^4)
=\frac{\beta^3}{5832}+O(\beta^4).
$$

不足する論証の第一は、矩形を無限に大きくするとき余項を面積に一様に制御して長方形の静的エネルギーを正当化すること。第二は、裸強結合の有限格子から $a\to0$ の連続極限へ移り、量子場の状態・スペクトルを構成することです。さらに現実の動的クォークを含むQCDでは、重軽中間子への弦の切断も別途扱う必要があります。従ってQCDの閉じ込めを証明したとの結論は出ません。
<!-- solution-end -->

## 7. まとめと次の問い

- 一ループの $\Lambda$ は固定フレーバー・近似方式で定義される尺度であり、近似式の極を物理的な閉じ込めの証明にはできません。
- 短距離の静的色一重項は $V_S(r)=-4\alpha_s/(3r)$ というCoulomb型引力を持ちます。長距離の線形ポテンシャルとは別の有効領域です。
- Wilsonループは、リンクの順序積をトレースして作るゲージ不変量です。純ゲージ格子の固定有限矩形では $\langle W\rangle=(\beta/18)^A+O(\beta^{A+1})$ がHaar積分で得られます。
- 大面積・連続極限・動的クォークの存在には追加の議論が必要です。色一重項の記法上の条件と、閉じ込め・質量ギャップという非摂動的な物理命題も区別します。

次は、色付きpartonの短距離計算を実際に測るハドロンの深非弾性散乱へ接続します。そのためにはPDFの定義、硬い尺度と長距離成分の分離、因子化の条件を学ぶ必要があります。
