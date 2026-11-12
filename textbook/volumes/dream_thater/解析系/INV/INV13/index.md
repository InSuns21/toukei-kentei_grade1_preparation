# INV13 投影データからどう反転するか

[INV12 の平面Radon変換](../INV12/index.md#def-inv12-radon)では、直線ごとの積分値を一次元 Fourier 変換すると、元の画像の二次元 Fourier 変換が一本の直線上で得られると分かりました。完全角度データから元画像が一意に決まることも証明しました。しかし、一意性だけでは実際に画像へ戻す手順も、測定誤差が拡大する仕組みも分かりません。

本講では「どう戻すか」を扱います。周波数平面の面積要素を極座標で書くと、直線上の周波数には $|\omega|$ という重みが付きます。この重みを投影データへ与えてから各方向へ戻すのが **フィルタ補正逆投影（FBP）**です。高周波を強める代償を確認した上で、周波数切断による正則化まで一続きに導きます。

## 1. 投影値をそのまま足しても画像にはならない

法線と接線の単位ベクトルを

$$
\theta_\varphi=(\cos\varphi,\sin\varphi),
\qquad
\theta_\varphi^\perp=(-\sin\varphi,\cos\varphi)
$$

とします。$0\le\varphi<\pi$ と $s\in\mathbb R$ について、[INV12 のRadon変換](../INV12/index.md#def-inv12-radon)は

$$
(Rf)(\varphi,s)=\int_{\mathbb R}
f(s\theta_\varphi+t\theta_\varphi^\perp)\,dt
$$

でした。ある点 $x$ が属する法線 $\theta_\varphi$ の測定線は $s=x\cdot\theta_\varphi$ にあります。全角度で「その点を通る線の測定値」を足す操作は自然ですが、それだけでは周波数ごとの重み付けがありません。

<a id="def-inv13-backprojection"></a>

<!-- formal-statement-start -->
> **定義（単純逆投影）**  
> $g:[0,\pi)\times\mathbb R\to\mathbb C$ が各 $x\in\mathbb R^2$ で $\varphi\mapsto g(\varphi,x\cdot\theta_\varphi)$ を可積分にするものとする。このとき **単純逆投影** $Bg$ を

$$
(Bg)(x)=\int_0^\pi g(\varphi,x\cdot\theta_\varphi)\,d\varphi
$$

> で定める。これは各角度の投影値を、その値が測られた直線上の全点へ配り直して重ねる操作である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv13-backprojection -->

**定義の確認**：$a>0$、$f_a(x)=e^{-a|x|^2}$ の測定データ $g=Rf_a$ を考えます。$\theta_\varphi,\theta_\varphi^\perp$ が正規直交するため、線上の座標表示で $|s\theta_\varphi+t\theta_\varphi^\perp|^2=s^2+t^2$ です。[FOU3 のGaussian Fourier公式](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を周波数0で使うと

$$
\begin{aligned}
g(\varphi,s)
&=\int_{\mathbb R}e^{-a(s^2+t^2)}\,dt\\
&=e^{-as^2}\int_{\mathbb R}e^{-at^2}\,dt
=\sqrt{\pi/a}\,e^{-as^2}.
\end{aligned}
$$

各 $x$ について $\varphi\mapsto g(\varphi,x\cdot\theta_\varphi)$ は連続かつ $\sqrt{\pi/a}$ 以下なので可積分です。原点 $x=0$ では $x\cdot\theta_\varphi=0$ となり、

$$
(Bg)(0)=\int_0^\pi\sqrt{\pi/a}\,d\varphi
=\pi\sqrt{\pi/a}.
$$

一方 $f_a(0)=1$ は $a$ に依存しません。従って、全ての $a>0$ に同じ定数を掛けて $BRf_a(0)=f_a(0)$ とすることはできません。

<!-- definition-example-end -->

逆投影は「点を通る直線を集める」操作であって、そのまま逆変換ではありません。Gaussian の幅を変えるだけでこの違いが数値として現れました。正しい補正を知るには、周波数平面の面積を数え直す必要があります。

## 2. 周波数平面を角度と符号付き半径で埋める

前講と同じ Fourier 規約を使います。$f\in\mathcal S(\mathbb R^2)$ に対して

$$
\widehat f_2(\xi)=\int_{\mathbb R^2}f(x)e^{-ix\cdot\xi}\,dx,
\qquad
f(x)=\frac1{(2\pi)^2}\int_{\mathbb R^2}
\widehat f_2(\xi)e^{ix\cdot\xi}\,d\xi.
$$

二つ目は [Schwartz級の二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)です。投影データ $g=Rf$ の位置 $s$ に関する Fourier 変換は

$$
G(\varphi,\omega)
=\mathcal F_s g(\varphi,\omega)
=\int_{\mathbb R}g(\varphi,s)e^{-i\omega s}\,ds
$$

と書きます。[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)より

$$
G(\varphi,\omega)=\widehat f_2(\omega\theta_\varphi).
$$

周波数 $\xi\ne0$ は、$0\le\varphi<\pi$ と符号付き周波数 $\omega\in\mathbb R\setminus\{0\}$ によって、境界の測度零の違いを除き一意に $\xi=\omega\theta_\varphi$ と表せます。$\omega>0$ が上半分の方向、$\omega<0$ がその反対方向を担当します。角度を $[0,2\pi)$ にして同時に $\omega$ の正負も使うと同じ非零周波数を二度ずつ数えてしまいます。

$\xi_1=\omega\cos\varphi$、$\xi_2=\omega\sin\varphi$ をそれぞれ $\omega$ と $\varphi$ で偏微分し、前者を第一列、後者を第二列に置きます。この変数変換の微分行列は

$$
\frac{\partial(\xi_1,\xi_2)}{\partial(\omega,\varphi)}
=
\begin{pmatrix}
\cos\varphi&-\omega\sin\varphi\\
\sin\varphi&\omega\cos\varphi
\end{pmatrix},
\qquad
\det=\omega.
$$

面積要素は符号を除いた

$$
d\xi_1\,d\xi_2=|\omega|\,d\omega\,d\varphi
$$

です。原点では微分行列が退化しますが、原点は平面測度零の集合です。$f$ が Schwartz 級なら $\widehat f_2$ は急減少なので、以下の積分は絶対収束し、原点を除いて変数変換した後に極限を取れます。

<a id="thm-inv13-inversion"></a>

<!-- formal-statement-start -->
> **定理（Radonデータの反転積分公式）**  
> $f\in\mathcal S(\mathbb R^2)$ とし、全ての $\varphi\in[0,\pi)$、$s\in\mathbb R$ について $g(\varphi,s)=(Rf)(\varphi,s)$ が与えられるとする。上の Fourier 規約の下で、任意の $x\in\mathbb R^2$ に対して

$$
\boxed{
f(x)=\frac1{(2\pi)^2}\int_0^\pi
\int_{\mathbb R}|\omega|\,G(\varphi,\omega)
e^{i\omega x\cdot\theta_\varphi}\,d\omega\,d\varphi
}
$$

> が成り立つ。ただし $G=\mathcal F_sg$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二次元 Fourier 反転の $\xi$ を、角度 $\varphi$ と符号付き周波数 $\omega$ に書き換えます。面積要素の $|\omega|$ と [Fourier slice theorem](../INV12/index.md#thm-inv12-slice) の代入が核心です。

<!-- proof-start -->
### 証明

[二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)により

$$
f(x)=\frac1{(2\pi)^2}
\int_{\mathbb R^2}\widehat f_2(\xi)e^{ix\cdot\xi}\,d\xi.
$$

$|\widehat f_2(\xi)|$ は可積分です。極座標と符号付き半径への変数変換を、まず $|\xi|>\varepsilon$ の部分で行うと

$$
\begin{aligned}
&\int_{|\xi|>\varepsilon}\widehat f_2(\xi)e^{ix\cdot\xi}\,d\xi\\
&\quad=\int_0^\pi\int_{|\omega|>\varepsilon}
\widehat f_2(\omega\theta_\varphi)
e^{i\omega x\cdot\theta_\varphi}
|\omega|\,d\omega\,d\varphi.
\end{aligned}
$$

右辺は絶対可積分です。実際、$\widehat f_2$ の急減少性と同じ変数変換から

$$
\int_0^\pi\int_{\mathbb R}
|\omega|\,|\widehat f_2(\omega\theta_\varphi)|\,d\omega\,d\varphi
=\int_{\mathbb R^2}|\widehat f_2(\xi)|\,d\xi<\infty.
$$

よって $\varepsilon\downarrow0$ とでき、[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)を $\xi=\omega\theta_\varphi$ に適用して

$$
\widehat f_2(\omega\theta_\varphi)=G(\varphi,\omega)
$$

を代入すれば、主張の式を得ます。全角度は $[0,\pi)$、符号付き周波数は $\mathbb R$ なので追加の $1/2$ は不要です。
<!-- proof-end -->

この公式は、周波数面積を正しく勘定すれば**一意性の証明を具体的な再構成式へ変えられる**ことを示します。次は積分の順序を「投影ごとの処理」と「角度ごとの集約」に分解します。

## 3. 周波数を補正してから逆投影する

単純逆投影では $|\omega|$ が足りません。そこで角度ごとの投影 $g(\varphi,\cdot)$ を Fourier 変換し、$|\omega|$ 倍してから一次元反転する操作を導入します。$|\omega|$ はゼロ周波数を通さず高周波を強めるため、倍率の形が坂になっています。

<a id="def-inv13-ramp"></a>

<!-- formal-statement-start -->
> **定義（ramp filter）**  
> 各 $\varphi\in[0,\pi)$ に対して $G(\varphi,\omega)=\mathcal F_sg(\varphi,\omega)$ が定義され、$\omega\mapsto|\omega|G(\varphi,\omega)$ が絶対可積分であるとする。投影ごとの **ramp filter** $\Lambda$ を

$$
(\Lambda g)(\varphi,s)
=\frac1{2\pi}\int_{\mathbb R}
|\omega|\,G(\varphi,\omega)e^{i\omega s}\,d\omega
$$

> と定める。$f\in\mathcal S(\mathbb R^2)$ に対する $g=Rf$ はこの条件を満たす。
<!-- formal-statement-end -->

この $|\omega|$ の周波数倍率が坂状になることから、ramp（ランプ）という名前が付いています。

<!-- definition-example-start: def-inv13-ramp -->

**定義の確認**：$f_a(x)=e^{-a|x|^2}$、$a>0$ に対し

$$
g(\varphi,s)=\sqrt{\pi/a}\,e^{-as^2},
\qquad
G(\varphi,\omega)
=\sqrt{\pi/a}\int_{\mathbb R}e^{-as^2}e^{-i\omega s}\,ds
=\frac\pi a e^{-\omega^2/(4a)}.
$$

ここで $G$ の積分には [FOU3 のGaussian Fourier公式](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)を適用しました。指数減衰により $|\omega|G$ は絶対可積分で、$s=0$ では

$$
\begin{aligned}
(\Lambda g)(\varphi,0)
&=\frac1{2\pi}\frac\pi a
\int_{\mathbb R}|\omega|e^{-\omega^2/(4a)}\,d\omega\\
&=\frac1{2\pi}\frac\pi a
\left(2\int_0^\infty\omega e^{-\omega^2/(4a)}\,d\omega\right)\\
&=\frac1{2\pi}\frac\pi a(4a)=2.
\end{aligned}
$$

最後は $u=\omega^2/(4a)$、$\omega\,d\omega=2a\,du$ と置いています。単純逆投影では $a$ 依存の余分な倍率がありましたが、補正後の原点値は $a$ に依存しなくなります。

<!-- definition-example-end -->

<a id="thm-inv13-fbp"></a>

<!-- formal-statement-start -->
> **定理（フィルタ補正逆投影公式）**  
> $f\in\mathcal S(\mathbb R^2)$、$g=Rf$ とする。[単純逆投影](#def-inv13-backprojection) $B$ と [ramp filter](#def-inv13-ramp) $\Lambda$ に対して

$$
\boxed{\quad f(x)=\frac1{2\pi}(B\Lambda g)(x)
=\frac1{2\pi}\int_0^\pi
(\Lambda g)(\varphi,x\cdot\theta_\varphi)\,d\varphi\quad}
$$

> が全ての $x\in\mathbb R^2$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$B$ に渡す入力を $\Lambda g$ とすると、角度積分の内側には既に $|\omega|$ と Fourier 反転の $1/(2\pi)$ が入っています。残る $1/(2\pi)$ を外に掛ければ、前節の二次元反転公式と一致します。

<!-- proof-start -->
### 証明

定義を順に代入すると

$$
\begin{aligned}
(B\Lambda g)(x)
&=\int_0^\pi(\Lambda g)(\varphi,x\cdot\theta_\varphi)\,d\varphi\\
&=\frac1{2\pi}\int_0^\pi\int_{\mathbb R}
|\omega|\,G(\varphi,\omega)
e^{i\omega x\cdot\theta_\varphi}\,d\omega\,d\varphi.
\end{aligned}
$$

$g=Rf$ では前節で示した絶対可積分性により式が正当化されます。[Radon反転積分公式](#thm-inv13-inversion)の右辺はこの最後の式の $1/(2\pi)$ 倍なので、$f=(2\pi)^{-1}B\Lambda g$ が従います。
<!-- proof-end -->

**Gaussian の再確認**：前の例で $(\Lambda Rf_a)(\varphi,0)=2$ を計算しました。従って

$$
\frac1{2\pi}(B\Lambda Rf_a)(0)
=\frac1{2\pi}\int_0^\pi2\,d\varphi=1=f_a(0).
$$

反転公式は理想的な完全角度・連続位置のデータについての数学的等式です。有限角度・有限画素で同じ式を離散化すると、補間・標本化・積分近似の誤差が別に生じます。それらは次講 INV14 で扱います。

## 4. なぜ高周波ノイズを強めるのか

$ramp$ の周波数倍率は $|\omega|$ です。$\omega$ 付近の投影の Fourier 誤差を $N(\varphi,\omega)$ と書くと、フィルタ後には $|\omega|N(\varphi,\omega)$ になります。周波数が大きいほど同じ測定誤差が強調されます。

ただし「投影の周波数振幅が $|\omega|$ 倍になる」という話と、「再構成画像の二乗ノルムがどう変わるか」は別です。二次元周波数平面の面積要素にも $|\omega|$ が入ります。これを区別すると、ノイズ増幅と正則化の定量式が得られます。

高周波を捨てる最も単純な方法が、半径 $\Omega>0$ より外の周波数を使わない **周波数切断**です。

<a id="def-inv13-cutoff"></a>

<!-- formal-statement-start -->
> **定義（周波数切断FBP）**  
> $\Omega>0$、$g\in L^2([0,\pi)\times\mathbb R)$ とする。$s$ についての $L^2$ Fourier 変換を $G(\varphi,\omega)$ とし、**周波数切断FBP** $Q_\Omega g$ を

$$
(Q_\Omega g)(x)=\frac1{(2\pi)^2}
\int_0^\pi\int_{-\Omega}^{\Omega}
|\omega|\,G(\varphi,\omega)
e^{i\omega x\cdot\theta_\varphi}\,d\omega\,d\varphi
$$

> で定める。積分は $L^2$ の代表元について定義でき、同じ $L^2$ 同値類なら同じ再構成関数になる。
<!-- formal-statement-end -->

ここで $L^2$ とは、絶対値の二乗を角度と位置で積分して有限となる関数の空間です。[FOU4 の Plancherel の定理](../../FOU/FOU4/index.md#thm-fou4-l2-extension)と [Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使えば、有限 $\Omega$ に対して右辺は各 $x$ で絶対収束します。具体的には

$$
\begin{aligned}
&\int_0^\pi\int_{-\Omega}^{\Omega}|\omega|\,|G(\varphi,\omega)|\,d\omega\,d\varphi\\
&\ \le
\left(\int_0^\pi\int_{-\Omega}^{\Omega}\omega^2\,d\omega\,d\varphi\right)^{1/2}
\left(\int_0^\pi\int_{-\Omega}^{\Omega}|G|^2\,d\omega\,d\varphi\right)^{1/2}<\infty.
\end{aligned}
$$

<!-- definition-example-start: def-inv13-cutoff -->

**定義の確認**：$f_a(x)=e^{-a|x|^2}$ では $G=(\pi/a)e^{-\omega^2/(4a)}$ であり、有限帯域内で絶対可積分です。原点の切断再構成は

$$
\begin{aligned}
(Q_\Omega Rf_a)(0)
&=\frac1{(2\pi)^2}\pi\frac\pi a
\int_{-\Omega}^{\Omega}|\omega|e^{-\omega^2/(4a)}\,d\omega\\
&=\frac1{4a}\cdot4a\left(1-e^{-\Omega^2/(4a)}\right)\\
&=1-e^{-\Omega^2/(4a)}.
\end{aligned}
$$

$\Omega$ を大きくすると原点値は $f_a(0)=1$ へ近づきますが、有限の $\Omega$ では $e^{-\Omega^2/(4a)}$ だけの切断バイアスが残ります。

<!-- definition-example-end -->

## 5. 雑音誤差と切断バイアスを分けて評価する

この節では、[FOU4 の一次元Plancherel等式](../../FOU/FOU4/index.md#thm-fou4-l2-extension)を二つの座標へ順に適用して得られる、次の二次元版も用います。まず $h\in\mathcal S(\mathbb R^2)$ で $x_1$ だけ Fourier 変換すると、$x_2$ について積分したノルムは $2\pi$ 倍です。さらに $x_2$ の変換にも同じ等式を適用すれば

$$
\int_{\mathbb R^2}|\widehat h_2(\xi)|^2\,d\xi
=(2\pi)^2\int_{\mathbb R^2}|h(x)|^2\,dx.
$$

[FOU4 のGaussian Fourier coreの稠密性](../../FOU/FOU4/index.md#thm-fou4-core-density)の証明では、近似元を $h*k_\varepsilon$（$h\in C_c(\mathbb R)$）に選べます。$h$ は有界な台を持ち、Gaussian 核の各階導関数は多項式と Gaussian の積なので、$h*k_\varepsilon$ は [Schwartz級](../INV12/index.md#def-inv12-schwartz)に属します。このことから一変数の Schwartz 級は $L^2$ に稠密です。二変数でも各座標の近似を組み合わせ、一次元 Fourier 変換の連続な $L^2$ 延長を順に適用すれば、二次元版を $L^2$ 全体へ延長できます。以下で使う $\|h\|_2^2=(2\pi)^{-2}\|\widehat h_2\|_2^2$ はこの意味です。

以降、画像のノルムは $\|h\|_{L^2(\mathbb R^2)}$、投影データのノルムは $\|g\|_{L^2([0,\pi)\times\mathbb R)}$ を使います。$f\in\mathcal S(\mathbb R^2)$ に対する正しいデータ $g=Rf$ と、雑音つきデータ $g^\delta$ に

$$
\|g^\delta-g\|_{L^2([0,\pi)\times\mathbb R)}\le\delta
$$

を仮定します。この $\delta$ は連続データ空間のノルムでの上限です。標本化した各画素の誤差を、そのまま同じ $\delta$ と見なすことはできません。

<a id="thm-inv13-cutoff-error"></a>

<!-- formal-statement-start -->
> **定理（周波数切断FBPの誤差分解）**  
> $f\in\mathcal S(\mathbb R^2)$、$g=Rf$、$g^\delta\in L^2([0,\pi)\times\mathbb R)$ とし、$\|g^\delta-g\|_{L^2}\le\delta$ とする。任意の $\Omega>0$ に対し

$$
\boxed{
\|Q_\Omega g^\delta-f\|_{L^2(\mathbb R^2)}
\le
\frac1{2\pi}\left(\int_{|\xi|>\Omega}
|\widehat f_2(\xi)|^2\,d\xi\right)^{1/2}
+\delta\sqrt{\frac{\Omega}{2\pi}}
}
$$

> が成り立つ。第1項は周波数切断バイアス、第2項は投影の $L^2$ 雑音から生じる上界である。
<!-- formal-statement-end -->

### 証明の見取り図

$\widehat f_2$ を半径 $\Omega$ の円板の内外に分けます。内側は Fourier slice theorem で観測され、外側は切断されます。雑音の内側成分を周波数平面へ移すとき、極座標の $|\omega|$ を $\Omega$ で抑え、投影データには一次元 Plancherel を使います。

<!-- proof-start -->
### 証明

まず $f_\Omega=Q_\Omega g$ とおきます。[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)と符号付き極座標の変数変換により

$$
f_\Omega(x)=\frac1{(2\pi)^2}
\int_{|\xi|\le\Omega}\widehat f_2(\xi)e^{ix\cdot\xi}\,d\xi.
$$

よって $\widehat{f_\Omega}_2=1_{\{|\xi|\le\Omega\}}\widehat f_2$（ほとんど至る所）です。二次元 Plancherel をこの Fourier 規約で適用すると

$$
\|f-f_\Omega\|_2^2
=\frac1{(2\pi)^2}
\int_{|\xi|>\Omega}|\widehat f_2(\xi)|^2\,d\xi.
$$

次に $n=g^\delta-g$、$N=\mathcal F_s n$ とします。$Q_\Omega$ は線形なので

$$
Q_\Omega g^\delta-f=(Q_\Omega g-f)+Q_\Omega n.
$$

この主張を $L^2$ データについて確かめます。原点以外の $\xi=\omega\theta_\varphi$（ほとんど至る所で一意）に対し、

$$
H_\Omega(\xi)=1_{\{|\omega|\le\Omega\}}N(\varphi,\omega)
$$

と置きます。符号付き極座標の Jacobian から

$$
\begin{aligned}
\int_{\mathbb R^2}|H_\Omega(\xi)|^2\,d\xi
&=\int_0^\pi\int_{-\Omega}^{\Omega}
|\omega|\,|N(\varphi,\omega)|^2\,d\omega\,d\varphi\\
&\le\Omega\int_0^\pi\int_{\mathbb R}|N(\varphi,\omega)|^2\,d\omega\,d\varphi<\infty.
\end{aligned}
$$

$H_\Omega$ は有限面積の円板に台を持つため Cauchy–Schwarz により $L^1$ にも属します。その二次元逆 Fourier 積分を符号付き極座標に変換したものが $Q_\Omega n$ です。[FOU4 の $L^2$ Fourier反転](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)を二つの座標へ順に適用すれば、$\widehat{Q_\Omega n}_2=H_\Omega$ がほとんど至る所で成り立ちます。従って二次元 Plancherel と Jacobian から

$$
\begin{aligned}
\|Q_\Omega n\|_2^2
&=\frac1{(2\pi)^2}
\int_0^\pi\int_{-\Omega}^{\Omega}
|\omega|\,|N(\varphi,\omega)|^2\,d\omega\,d\varphi\\
&\le\frac{\Omega}{(2\pi)^2}
\int_0^\pi\int_{\mathbb R}|N(\varphi,\omega)|^2\,d\omega\,d\varphi.
\end{aligned}
$$

角度ごとに一次元 Plancherel を使うと

$$
\int_0^\pi\int_{\mathbb R}|N(\varphi,\omega)|^2\,d\omega\,d\varphi
=2\pi\int_0^\pi\int_{\mathbb R}|n(\varphi,s)|^2\,ds\,d\varphi
\le2\pi\delta^2.
$$

従って $\|Q_\Omega n\|_2\le\delta\sqrt{\Omega/(2\pi)}$。最初の誤差分解へ三角不等式とバイアスの等式を入れれば結論です。
<!-- proof-end -->

切断幅を増やすとバイアスは減りますが、データ誤差の保証は $\sqrt\Omega$ に比例して悪化します。[INV4 の正則化の誤差分解](../INV4/index.md#thm-inv4-error-splitting)と同じ「切断で失う成分と雑音増幅の綱引き」が、Radon変換の具体的な積分で見えるようになりました。

### 周波数側の滑らかさが分かればバイアスにも速度が付く

$\widehat f_2$ の高周波がどれだけ小さいかを仮定しなければ、一般の一律な減衰率は主張できません。$p>0$ に対して次の有限量を持つ場合だけ、明示的な上界が得られます。

<a id="prop-inv13-bias-rate"></a>

<!-- formal-statement-start -->
> **命題（周波数モーメントによるバイアス評価）**  
> $f\in\mathcal S(\mathbb R^2)$、$p>0$ とし、次の量を置く。

$$
M_p(f)=\frac1{2\pi}
\left(\int_{\mathbb R^2}
|\xi|^{2p}|\widehat f_2(\xi)|^2\,d\xi\right)^{1/2}.
$$

> すると $\Omega>0$ で

$$
\|f-Q_\Omega Rf\|_2\le M_p(f)\,\Omega^{-p}
$$

> が成り立つ。特に、前定理の雑音誤差は $M_p(f)\Omega^{-p}+\delta\sqrt{\Omega/(2\pi)}$ 以下である。
<!-- formal-statement-end -->

### 証明の見取り図

切断された領域は $|\xi|>\Omega$ なので、そこで $1\le|\xi|^{2p}/\Omega^{2p}$ を使うだけです。どの領域にこの不等式を使えるかを明記します。

<!-- proof-start -->
### 証明

前定理で得た正確なバイアスの二乗に、$|\xi|>\Omega$ 上の不等式 $1\le|\xi|^{2p}\Omega^{-2p}$ を入れると

$$
\begin{aligned}
\|f-Q_\Omega Rf\|_2^2
&=\frac1{(2\pi)^2}\int_{|\xi|>\Omega}|\widehat f_2(\xi)|^2\,d\xi\\
&\le\frac{\Omega^{-2p}}{(2\pi)^2}
\int_{|\xi|>\Omega}|\xi|^{2p}|\widehat f_2(\xi)|^2\,d\xi\\
&\le\Omega^{-2p}M_p(f)^2.
\end{aligned}
$$

両辺の非負平方根を取り、前定理の雑音項を足すと主張を得ます。
<!-- proof-end -->

$M_p(f)$ を一様に抑える関数族で $\Omega(\delta)\to\infty$ かつ $\delta\sqrt{\Omega(\delta)}\to0$ と選べば、誤差上界は0へ近づきます。例えば $\Omega(\delta)=\delta^{-2/(2p+1)}$（$0<\delta<1$）では、二つの上界はともに $\delta^{2p/(2p+1)}$ の定数倍になります。$p>0$ という情報なしに同じ収束速度を主張してはいけません。

### Gaussian ではバイアスを正確に計算できる

$f_a(x)=e^{-a|x|^2}$ の二次元 Fourier 変換は

$$
\widehat f_{a,2}(\xi)=\frac\pi a e^{-|\xi|^2/(4a)}.
$$

このとき周波数切断の二乗バイアスは

$$
\begin{aligned}
\|f_a-Q_\Omega Rf_a\|_2^2
&=\frac1{(2\pi)^2}\frac{\pi^2}{a^2}
\int_{|\xi|>\Omega}e^{-|\xi|^2/(2a)}\,d\xi\\
&=\frac1{4\pi^2}\frac{\pi^2}{a^2}
2\pi\int_\Omega^\infty r e^{-r^2/(2a)}\,dr\\
&=\frac{\pi}{2a}e^{-\Omega^2/(2a)}.
\end{aligned}
$$

従って $L^2$ バイアスは $\sqrt{\pi/(2a)}\,e^{-\Omega^2/(4a)}$ です。原点での点ごとのバイアス $e^{-\Omega^2/(4a)}$ とは別の量なので、混同しないでください。

## 6. 無切断の復元は雑音に対して安定か

前節の上界だけから、無切断の逆変換が必ず不安定だとは論理的に結論できません。実際に小さな $L^2$ 投影誤差が大きな再構成誤差を作る例を用意します。

$a>0$ を固定し、$k\ge1$ に対して周波数側のデータ誤差を、全ての $\varphi\in[0,\pi)$ で

$$
N_k(\varphi,\omega)
=a\left(1_{[k,k+1]}(\omega)+1_{[-k-1,-k]}(\omega)\right)
$$

とします。これは実偶関数なので、一次元逆 Fourier 変換した $n_k(\varphi,s)$ も実数値です。区間の指示関数は $L^2$ であり、[一次元 Plancherel](../../FOU/FOU4/index.md#thm-fou4-l2-extension)から

$$
\|n_k\|_{L^2([0,\pi)\times\mathbb R)}^2
=\frac1{2\pi}\cdot\pi\cdot2a^2=a^2.
$$

周波数の極座標表示から、無切断公式による像の Fourier 変換は $N_k(\varphi,\omega)$ です。ゆえに

$$
\begin{aligned}
\|Q_\infty n_k\|_{L^2(\mathbb R^2)}^2
&=\frac1{(2\pi)^2}\pi\cdot2a^2
\int_k^{k+1}\omega\,d\omega\\
&=\frac{a^2}{2\pi}\left(k+\frac12\right).
\end{aligned}
$$

ここで $Q_\infty$ はこの有限帯域例についてのみ、周波数切断の上限を取り除いた再構成式を表します。**データ誤差ノルムは常に $a$ なのに、再構成誤差ノルムは $\sqrt{k}$ の速さで発散します。** 小さな $a$ に固定しても $k$ を十分大きく選べば任意に大きくなります。これが高周波雑音に対する不安定性の具体例です。

この失敗は Radon の完全角度データが一意であることと矛盾しません。一意性は雑音なしの二つの画像が同じ全データを持たないこと、安定性はデータの近さが画像の近さを保証することです。

## 7. 演習：反転と正則化を自力で再構成する

### Level A：係数・直接例・ノルム

<a id="ex-inv13-a01"></a>

### INV13-A01 符号付き極座標の Jacobian

- Level: A

$\xi=\omega(\cos\varphi,\sin\varphi)$、$0\le\varphi<\pi$、$\omega\in\mathbb R$ とする。Jacobian の行列式を計算し、面積要素に $\omega$ ではなく $|\omega|$ が現れる理由、角度区間を $[0,2\pi)$ に変えるときの注意を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\xi_1=\omega\cos\varphi$、$\xi_2=\omega\sin\varphi$ を $\omega,\varphi$ で偏微分すると

$$
J=\begin{pmatrix}
\cos\varphi&-\omega\sin\varphi\\
\sin\varphi&\omega\cos\varphi
\end{pmatrix}.
$$

従って $\det J=\omega(\cos^2\varphi+\sin^2\varphi)=\omega$。積分の変数変換では向きの反転で面積が負にならないよう、行列式の絶対値を取って $d\xi=|\omega|d\omega d\varphi$ です。$[0,\pi)$ では負の $\omega$ が反対側の半直線を担当します。角度を $[0,2\pi)$ に広げ、$\omega$ の正負を維持すると各非零周波数を二度数えるので、補正が必要です。
<!-- solution-end -->

<a id="ex-inv13-a02"></a>

### INV13-A02 単純逆投影は逆変換か

- Level: A

$a>0$、$f_a(x)=e^{-a|x|^2}$ とする。$Rf_a(\varphi,s)$ と $(BRf_a)(0)$ を求め、$f_a(0)$ と比較して、全ての $a$ に共通な定数倍だけでは復元できないことを示せ。

<!-- solution-start -->
#### 詳細解答

直交座標 $x=s\theta_\varphi+t\theta_\varphi^\perp$ では $|x|^2=s^2+t^2$ です。従って

$$
Rf_a(\varphi,s)=e^{-as^2}\int_{\mathbb R}e^{-at^2}dt
=\sqrt{\pi/a}\,e^{-as^2}.
$$

原点では全角度にわたり $s=0$ なので

$$
(BRf_a)(0)=\int_0^\pi\sqrt{\pi/a}\,d\varphi
=\pi\sqrt{\pi/a}.
$$

一方 $f_a(0)=1$。もし $cBRf_a(0)=f_a(0)$ が全ての $a$ で成り立てば $c=\sqrt a/(\pi\sqrt\pi)$ が全ての $a$ に依存せず一定でなければならず、矛盾します。
<!-- solution-end -->

<a id="ex-inv13-a03"></a>

### INV13-A03 Gaussian の ramp filter

- Level: A

$f_a(x)=e^{-a|x|^2}$、$g=Rf_a$ に対し、$G(\varphi,\omega)$ を求め、$(\Lambda g)(\varphi,0)=2$ と $\frac1{2\pi}(B\Lambda g)(0)=1$ を直接計算せよ。

<!-- solution-start -->
#### 詳細解答

[Gaussianの一次元 Fourier 公式](../../FOU/FOU3/index.md#lem-fou3-gaussian-transform)に係数 $a>0$ を代入して

$$
G=\sqrt{\pi/a}\sqrt{\pi/a}\,e^{-\omega^2/(4a)}
=\frac\pi a e^{-\omega^2/(4a)}.
$$

$ramp$ の定義から

$$
(\Lambda g)(\varphi,0)
=\frac1{2\pi}\frac\pi a
\left(2\int_0^\infty\omega e^{-\omega^2/(4a)}d\omega\right).
$$

$u=\omega^2/(4a)$ により括弧内は $4a\int_0^\infty e^{-u}du=4a$ なので、値は2です。逆投影で $\int_0^\pi 2\,d\varphi=2\pi$、最後に $1/(2\pi)$ を掛けて1になります。
<!-- solution-end -->

<a id="ex-inv13-a04"></a>

### INV13-A04 Gaussian の切断バイアス

- Level: A

$a,\Omega>0$ に対して $(Q_\Omega Rf_a)(0)$ と、その点でのバイアスを求めよ。$f_a(0)=1$ と比較すること。

<!-- solution-start -->
#### 詳細解答

前問の $G=(\pi/a)e^{-\omega^2/(4a)}$ を使い、$x=0$ とすると

$$
(Q_\Omega Rf_a)(0)
=\frac1{4\pi^2}\pi\frac\pi a
\,2\int_0^\Omega\omega e^{-\omega^2/(4a)}d\omega.
$$

$u=\omega^2/(4a)$ と置けば

$$
2\int_0^\Omega\omega e^{-\omega^2/(4a)}d\omega
=4a\int_0^{\Omega^2/(4a)}e^{-u}du
=4a(1-e^{-\Omega^2/(4a)}).
$$

従って再構成値は $1-e^{-\Omega^2/(4a)}$、真値との差は $e^{-\Omega^2/(4a)}$ です。有限帯域を捨てたことによるバイアスで、$\Omega\to\infty$ で0になります。
<!-- solution-end -->

<a id="ex-inv13-a05"></a>

### INV13-A05 データ雑音上界の数値照合

- Level: A

投影誤差が $L^2$ ノルムで $\delta=0.1$ 以下、切断周波数が $\Omega=2\pi$ のとき、$Q_\Omega$ による再構成の **雑音由来の** $L^2$ 誤差上界だけを求めよ。バイアスまで評価できるかも答えよ。

<!-- solution-start -->
#### 詳細解答

[周波数切断FBPの誤差定理](#thm-inv13-cutoff-error)の雑音項に代入すると

$$
\delta\sqrt{\frac{\Omega}{2\pi}}
=0.1\sqrt{\frac{2\pi}{2\pi}}
=0.1.
$$

これは雑音由来の誤差だけです。$f$ の高周波エネルギー $\int_{|\xi|>2\pi}|\widehat f_2(\xi)|^2d\xi$ が不明なので、総誤差を0.1以下とは結論できません。
<!-- solution-end -->

### Level B：反転導出・ノイズ増幅・フィルタ設計

<a id="ex-inv13-b01"></a>

### INV13-B01 Fourier slice からFBPを導出する

- Level: B

$f\in\mathcal S(\mathbb R^2)$、$g=Rf$ とする。二次元 Fourier 反転を出発点に、角度を $[0,\pi)$ とした符号付き極座標の Jacobian、[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)、一次元反転の係数を順に使い、$f=(2\pi)^{-1}B\Lambda g$ を導け。

<!-- solution-start -->
#### 詳細解答

[二次元 Fourier 反転](../INV12/index.md#lem-inv12-fourier2-inversion)から

$$
f(x)=\frac1{4\pi^2}\int_{\mathbb R^2}
\widehat f_2(\xi)e^{ix\cdot\xi}d\xi.
$$

$\xi=\omega\theta_\varphi$ と書き、Jacobian の絶対値は $|\omega|$、角度 $[0,\pi)$ と符号付き $\omega\in\mathbb R$ でほとんど全ての $\xi$ を一度ずつ数えるため

$$
f(x)=\frac1{4\pi^2}\int_0^\pi\int_{\mathbb R}
|\omega|\widehat f_2(\omega\theta_\varphi)
e^{i\omega x\cdot\theta_\varphi}d\omega d\varphi.
$$

$f$ は Schwartz 級で、[Fourier slice theorem](../INV12/index.md#thm-inv12-slice)より $\widehat f_2(\omega\theta_\varphi)=G(\varphi,\omega)$。この値を代入し、内側の $\omega$ 積分を $2\pi$ で割ったものを [ramp filter](#def-inv13-ramp)の定義と照合すると

$$
\frac1{2\pi}\int_{\mathbb R}|\omega|G(\varphi,\omega)e^{i\omega s}d\omega
=(\Lambda g)(\varphi,s).
$$

$s=x\cdot\theta_\varphi$ を代入し、外側に残る $1/(2\pi)$ で角度積分すれば

$$
f(x)=\frac1{2\pi}\int_0^\pi
(\Lambda g)(\varphi,x\cdot\theta_\varphi)d\varphi
=\frac1{2\pi}B\Lambda g(x).
$$

全ての積分交換は $\int_{\mathbb R^2}|\widehat f_2|<\infty$ と極座標変換から正当化されます。
<!-- solution-end -->

<a id="ex-inv13-b02"></a>

### INV13-B02 切断の誤差を一から評価する

- Level: B

$f\in\mathcal S(\mathbb R^2)$、$g=Rf$、$\|g^\delta-g\|_{L^2}\le\delta$ とする。周波数切断FBPの再構成誤差を、バイアスと雑音の二項へ分解し、二次元 Plancherel・極座標の Jacobian・一次元 Plancherel を使って

$$
\|Q_\Omega g^\delta-f\|_2
\le\|Q_\Omega g-f\|_2+\delta\sqrt{\Omega/(2\pi)}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$g^\delta=g+n$ とおくと線形性から $Q_\Omega g^\delta-f=(Q_\Omega g-f)+Q_\Omega n$。三角不等式で二項に分けます。

$N=\mathcal F_s n$ とし、周波数平面上で $H_\Omega(\omega\theta_\varphi)=1_{\{|\omega|\le\Omega\}}N(\varphi,\omega)$ と置きます。$|\omega|\le\Omega$ と一次元 Plancherel から $\|H_\Omega\|_2^2\le2\pi\Omega\|n\|_2^2$ なので、円板に台を持つ $H_\Omega$ は $L^1\cap L^2$ に属します。二次元 Fourier 反転を各座標に適用すれば、$Q_\Omega n$ の二次元 Fourier 変換は $H_\Omega$ です。二次元 Plancherel と $d\xi=|\omega|d\omega d\varphi$ から

$$
\|Q_\Omega n\|_2^2
=\frac1{4\pi^2}\int_0^\pi\int_{-\Omega}^{\Omega}
|\omega||N(\varphi,\omega)|^2d\omega d\varphi.
$$

積分区間で $|\omega|\le\Omega$ とし、一次元 Plancherel を $\varphi$ ごとに適用すると

$$
\|Q_\Omega n\|_2^2
\le\frac{\Omega}{4\pi^2}\,2\pi\|n\|_2^2
\le\frac{\Omega\delta^2}{2\pi}.
$$

平方根を取って目標の雑音項を得ます。真のデータには [Fourier slice theorem](../INV12/index.md#thm-inv12-slice) が使えるので

$$
\|Q_\Omega g-f\|_2^2
=\frac1{4\pi^2}\int_{|\xi|>\Omega}|\widehat f_2(\xi)|^2d\xi.
$$

これを第一項に残せば総誤差上界となります。
<!-- solution-end -->

<a id="ex-inv13-b03"></a>

### INV13-B03 固定ノルムの高周波雑音

- Level: B

$a>0$、整数 $k\ge1$ とし、$N_k(\varphi,\omega)=a(1_{[k,k+1]}(\omega)+1_{[-k-1,-k]}(\omega))$ を投影データ雑音 $n_k$ の $s$-Fourier 変換とする。$\|n_k\|_{L^2}$ と、無切断の再構成像の $L^2$ ノルムを求めよ。前者が有界なのに後者が発散する理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

区間は互いに素で長さがそれぞれ1です。一次元 Plancherel を角度で積分すると

$$
\|n_k\|_2^2
=\frac1{2\pi}\int_0^\pi\int_{\mathbb R}|N_k|^2d\omega d\varphi
=\frac1{2\pi}(\pi)(2a^2)=a^2.
$$

再構成後の二次元周波数平面では、二つの半径帯域を足す際に $|\omega|$ を掛けるため

$$
\begin{aligned}
\|Q_\infty n_k\|_2^2
&=\frac1{4\pi^2}\int_0^\pi\int_{\mathbb R}
|\omega||N_k|^2d\omega d\varphi\\
&=\frac1{4\pi^2}\pi(2a^2)\int_k^{k+1}\omega\,d\omega\\
&=\frac{a^2}{2\pi}(k+\tfrac12).
\end{aligned}
$$

従って $\|Q_\infty n_k\|_2=a\sqrt{(k+1/2)/(2\pi)}\to\infty$。周波数区間の幅とデータノルムは固定でも、その区間が大きな半径へ移ると周波数平面で占める面積が増えることが機構です。
<!-- solution-end -->

<a id="ex-inv13-b04"></a>

### INV13-B04 滑らかな窓を掛ける場合

- Level: B

滑らかな実数値の偶関数 $m_\Omega\in C^\infty(\mathbb R)$ が $|m_\Omega(\omega)|\le1$、$|\omega|>\Omega$ で0を満たすとする。$Q_\Omega$ の積分に現れる $|\omega|G$ を $|\omega|m_\Omega(\omega)G$ に置き換えた再構成 $Q_{m_\Omega}$ を考える。雑音誤差の上界と、真の画像に残るバイアスの二乗を導出せよ。鋭い切断と何が違うか述べよ。

<!-- solution-start -->
#### 詳細解答

真のデータに [Fourier slice theorem](../INV12/index.md#thm-inv12-slice) を使うと、再構成像の二次元 Fourier 変換は

$$
\widehat{Q_{m_\Omega}Rf}_2(\xi)
=m_\Omega(\omega)\widehat f_2(\xi),
\qquad \xi=\omega\theta_\varphi.
$$

$m_\Omega$ が偶関数なので $\omega$ の符号を変えても同じ値になり、半径方向の周波数窓として解釈できます。二次元 Plancherel から

$$
\|f-Q_{m_\Omega}Rf\|_2^2
=\frac1{4\pi^2}\int_{\mathbb R^2}
|1-m_\Omega(|\xi|)|^2|\widehat f_2(\xi)|^2d\xi.
$$

雑音についても同様に

$$
\begin{aligned}
\|Q_{m_\Omega}n\|_2^2
&=\frac1{4\pi^2}\int_0^\pi\int_{\mathbb R}
|\omega|\,|m_\Omega(\omega)|^2|N|^2d\omega d\varphi\\
&\le\frac{\Omega}{4\pi^2}\int_0^\pi\int_{\mathbb R}|N|^2d\omega d\varphi
\le\frac{\Omega\delta^2}{2\pi}.
\end{aligned}
$$

鋭い切断では $m_\Omega=1$ が内側全域で成り立ち、内側のバイアスは0です。滑らかな窓では内側でも $m_\Omega\ne1$ となりうるので、その分のバイアスが生じます。窓が滑らかという事実だけでは、全ての $f$ に対して誤差が必ず減るとはいえません。
<!-- solution-end -->

### Level C：ノイズと再構成幅の統合評価

<a id="ex-inv13-c01"></a>

### INV13-C01 GaussianのFBP・切断・ノイズを一つに結ぶ

- Level: C

$f(x)=e^{-|x|^2}$、$g=Rf$、$\|g^\delta-g\|_{L^2([0,\pi)\times\mathbb R)}\le0.1$ とする。

1. [Fourier slice theorem](../INV12/index.md#thm-inv12-slice) から $\widehat f_2$ を求め、FBP の外側の係数と $|\omega|$ を明記せよ。
2. 正しいデータだけを使う切断再構成 $Q_\Omega g$ の原点値と $L^2$ バイアスを求めよ。
3. $\Omega=2$ と $\Omega=4$ で総 $L^2$ 誤差の上界を数値近似して比較せよ。
4. この比較から「$\Omega=4$ があらゆる画像と雑音について最適」と結論できない理由、無切断を採用しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** [INV12-A02 の尺度付きGaussianの計算](../INV12/index.md#ex-inv12-a02)に $a=1$ を代入すると $g(\varphi,s)=\sqrt\pi e^{-s^2}$ です。一次元 Gaussian Fourier 積分により

$$
G(\varphi,\omega)=\pi e^{-\omega^2/4}.
$$

[Fourier slice theorem](../INV12/index.md#thm-inv12-slice) から $\widehat f_2(\omega\theta_\varphi)=\pi e^{-\omega^2/4}$。全方向を動かすと $|\xi|=|\omega|$ なので $\widehat f_2(\xi)=\pi e^{-|\xi|^2/4}$ です。従って

$$
f(x)=\frac1{4\pi^2}\int_0^\pi\int_{\mathbb R}
|\omega|\pi e^{-\omega^2/4}
e^{i\omega x\cdot\theta_\varphi}d\omega d\varphi
=\frac1{2\pi}B\Lambda g(x).
$$

**2.** 原点では指数因子が1となり、

$$
Q_\Omega g(0)
=\frac1{4\pi^2}\pi^2\,2\int_0^\Omega\omega e^{-\omega^2/4}d\omega
=1-e^{-\Omega^2/4}.
$$

一方、二次元 Plancherel で高周波の二乗ノルムを積分すると

$$
\begin{aligned}
\|f-Q_\Omega g\|_2^2
&=\frac1{4\pi^2}\pi^2\cdot2\pi
\int_\Omega^\infty r e^{-r^2/2}dr\\
&=\frac\pi2 e^{-\Omega^2/2}.
\end{aligned}
$$

従ってバイアスのノルムは $\sqrt{\pi/2}\,e^{-\Omega^2/4}$ です。

**3.** [切断誤差定理](#thm-inv13-cutoff-error)から

$$
\|Q_\Omega g^\delta-f\|_2
\le\sqrt{\pi/2}\,e^{-\Omega^2/4}
+0.1\sqrt{\Omega/(2\pi)}.
$$

$\Omega=2$ では第1項が約 $0.4611$、第2項が約 $0.0564$、合計は約 $0.5175$。$\Omega=4$ では第1項が約 $0.0230$、第2項が約 $0.0798$、合計は約 $0.1028$ です。このGaussianの保証上界では $\Omega=4$ の方が小さくなります。

**4.** この結果は特定の Gaussian と、雑音ノルムの上界 $0.1$ を使った **上界の比較**です。実際の雑音の周波数分布や別の画像の高周波量が違えば、最適な $\Omega$ も変わります。無切断では $|\omega|$ の重みで高周波雑音が増幅され、前節の固定ノルム雑音列では再構成誤差が発散します。従って、正確な完全データの反転式をそのまま誤差のある測定に適用するのは一般に安定ではありません。
<!-- solution-end -->

## 8. 次講への接続

反転公式の $|\omega|$ は人為的な補正ではなく、**二次元の面積を一次元の投影周波数の集まりへ変換した Jacobian** から生じました。FBP は正しい連続完全角度データに対する逆公式ですが、同じ重みが高周波ノイズを増幅します。周波数切断はバイアスを許す代わりに有限の雑音増幅上界を与えます。

次の **INV14「不完全観測で何が見えなくなるか」** では、測れる角度そのものが不足する場合、有限角度の標本化や missing wedge によって周波数平面のどこが失われるかを区別します。完全角度で成立した一意性と、現実の有限・部分観測における識別可能性を混同しないことが出発点です。
