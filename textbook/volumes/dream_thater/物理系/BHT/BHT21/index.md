# BHT21 一般化エントロピーと繰り込み

[前講の高階曲率Waldエントロピー](../BHT20/index.md#prop-bht20-fr-wald)は、指定した**重力作用**と定常分岐面から計算する量でした。しかしHawking放射を記述する量子場は、地平線の外と内で相関しています。外だけの情報を捨てずに「ブラックホールと外部を合わせたエントロピー」を考えるには、何を足せばよいのでしょうか。

ここではまず、有限量子系の[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)と[von Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)から出発します。次に外部を連続量子場へ拡張すると現れる短距離の発散を、**4次元の最小結合自由スカラー**の一ループ模型で計算します。最後に重力の面積係数も同じ規約で繰り込むと、なぜ合計で有限量を定義できるかを確かめます。

4次元Lorentz時空の計量符号は $(-,+,+,+)$、$c=\hbar=k_B=1$ とし、$G>0$ の記号は保持します。エントロピーの対数は、熱力学の単位に合わせて**自然対数**です。[QINF17の底2の値](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)を使うなら $\ln2$ 倍します。重力を半古典的に扱い、以下の具体的ループ計算はユークリッド断面・滑らかな面の近傍で行います。**エントロピーの定義と、その時間発展に関する第二法則は別問題**です。

## 1. 外部の量子状態は「どの面の外」か

地平線の空間的な切断面（ある時刻の地平線と空間断面との交わり）を $\Sigma$ とします。$\Sigma$ を含む空間的Cauchy断面を $C$ とし、$C$ のうちブラックホール外部に属する部分を $C_{\rm out}$ と呼びます。切断面が変われば外部領域も変わり得るため、単に「外のエントロピー」と言ってもまだ値は決まりません。

まず有限の二量子ビット $H_{\rm in}\otimes H_{\rm out}$ を考えます。内外の基底を $|0\rangle,|1\rangle$ として、

$$
|\Psi\rangle=\frac{|0\rangle_{\rm in}|0\rangle_{\rm out}
+|1\rangle_{\rm in}|1\rangle_{\rm out}}{\sqrt2}
$$

を作ると、全体は純粋でも外だけの状態は

$$
\rho_{\rm out}
=\operatorname{Tr}_{\rm in}|\Psi\rangle\langle\Psi|
=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|
$$

となります。交差項に付く内側の内積 $\langle0|1\rangle=0$ により非対角項が消えます。固有値は $1/2,1/2$ なので、

$$
-\operatorname{Tr}(\rho_{\rm out}\ln\rho_{\rm out})
=-2\cdot\frac12\ln\frac12=\ln2.
$$

この例は**量子相関による外部の混合**を示します。ただし、これだけではブラックホールの面積公式を導いていません。連続量子場では各位置に独立な量子ビットをそのまま割り当てることもできません。

連続場を扱うために、まず短距離を区別するための長さ $\epsilon>0$ を導入します。格子、モード制限、proper-time の下限など、どの正則化を使うかまで指定した有限の近似模型を考えます。その上で内外に因子分解できる場合だけ部分トレースを使います。**正則化を外した局所量子場の代数には、有限次元の $H_{\rm in}\otimes H_{\rm out}$ 分解がそのまま存在すると仮定しません**。

<a id="def-bht21-regulated-outside"></a>

<!-- formal-statement-start -->
> **定義（カットオフ付き外部エントロピー）**
> 空間断面 $C$、その上の滑らかで面積有限の切断面 $\Sigma$、外部領域 $C_{\rm out}$、全系の量子状態 $\omega$、短距離正則化 $\epsilon>0$ を指定する。正則化されたHilbert空間が $H_{\rm in}^{(\epsilon)}\otimes H_{\rm out}^{(\epsilon)}$ と因子分解し、外部縮約 $\rho_{\rm out}^{(\epsilon)}=\operatorname{Tr}_{\rm in}\rho^{(\epsilon)}$ が密度演算子である場合に

$$
S_{\rm out}^{(\epsilon)}[\Sigma,\omega]
:=-\operatorname{Tr}\!\left(
\rho_{\rm out}^{(\epsilon)}\ln\rho_{\rm out}^{(\epsilon)}
\right)
$$

> を**カットオフ付き外部エントロピー**と呼ぶ。無限次元の場合は右辺の存在も別途仮定する。この定義は $\epsilon\to0$ の有限性を主張せず、切断面・状態・正則化を省略しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht21-regulated-outside -->
**定義の確認**：先ほどのBell対を一つの正則化された境界自由度とします。規格化は $\langle\Psi|\Psi\rangle=(1+1)/2=1$、外部縮約は正値・トレース1の対角行列であることを確認しました。従って定義の全演算が有限次元で存在し、$S_{\rm out}^{(\epsilon)}=\ln2$ です。これは $\epsilon$ に依存しない**一対だけ**の値です。面上の何個もの対を追加していく次の模型と区別してください。
<!-- definition-example-end -->

## 2. 面に沿う短距離相関がなぜ発散するか

面 $\Sigma$ に沿ってほぼ独立な短距離相関の対が並ぶと、各対の寄与が足し合わされます。面積 $A_\Sigma$ に対し間隔 $\epsilon$ の面上セルを $N(\epsilon)$ 個作る模型なら、4次元時空の切断面は2次元なので、端の補正を無視して

$$
N(\epsilon)\simeq\frac{A_\Sigma}{\epsilon^2},
\qquad
S_{\rm out}^{(\epsilon)}
=N(\epsilon)\ln2
\simeq\frac{A_\Sigma\ln2}{\epsilon^2}.
$$

積状態の縮約は各対の $I_2/2$ のテンソル積で、その固有値は $2^{-N}$ が $2^N$ 個。従って $-2^N2^{-N}\ln(2^{-N})=N\ln2$ です。これは**面積に比例する発散を理解する格子玩具模型**であり、Lorentz不変な自由場の普遍係数が $\ln2$ だという主張ではありません。

実際の局所場では、高周波モードと境界面近傍の短距離相関が関与します。一般的に4次元の面積発散を

$$
S_{\rm out}^{(\epsilon)}
=c_{\rm reg}\frac{A_\Sigma}{\epsilon^2}
+(\text{局所曲率・質量に依存する対数項})
+S_{\rm finite}+\cdots
$$

と書くとき、係数 $c_{\rm reg}$ は場の種類・相互作用・正則化などに依存します。特に接触項やゲージ拘束がある場合、単純な「物理的量子ビットの数」と同一視できません。

### 2.1 自由実スカラーの錐模型で係数を確かめる

もう少し物理的な一例を計算します。局所的に平らな面 $\Sigma$ の周囲をユークリッド化し、面に垂直な2方向を角度周期 $2\pi n$ の錐、面に沿う2方向を平面とする模型です。$n$ は最初は正整数の複製数で、エントロピーを計算する際には $n=1$ 近傍へ滑らかに延長すると仮定します。

**熱核**とは正の作用素 $D$ の $e^{-sD}$ のトレースを表す量です。ここでは質量零、最小結合の実スカラー場に対して $D=-\nabla^2$、$s>0$ は長さの二乗の次元を持つ proper-time パラメータとします。錐上の熱核 $K_n(s)$ から平面の $n$ 倍を引いた差の局所係数を入力として用います：

$$
K_n(s)-nK_1(s)
=\frac{A_\Sigma}{4\pi s}\frac{1-n^2}{12n}.
$$

この**錐熱核の公式自体**はスペクトル解析の非自明な入力であり、ここでは証明済みの一般定理と偽らず、平坦な直積錐・自由スカラー・同一の proper-time 正則化に限定して使います。以下では入力からエントロピーを得る微分・係数をすべて計算します。

<a id="prop-bht21-cone-scalar"></a>

<!-- formal-statement-start -->
> **命題（自由スカラーの錐模型の面積発散）**
> 4次元の平坦な直積錐近傍、面積 $A_\Sigma<\infty$ の平面切断面、質量零・最小結合の自由実スカラーを仮定する。錐熱核差が上の式を満たし、複製数 $n=1$ の近傍へ微分可能に延長できるとする。proper-time 下限 $\epsilon^2>0$ と赤外の共通処理を用いる一ループ近似では、外部エントロピーの面積発散は

$$
S_{\rm out}^{(\epsilon)}\big|_{\rm area}
=\frac{A_\Sigma}{48\pi\epsilon^2}.
$$

> これはこの模型の紫外係数であって、任意の相互作用場・非最小結合・ゲージ場へ無条件に適用しない。
<!-- formal-statement-end -->

### 証明の見取り図

正規化した複製分配関数 $Z_n/Z_1^n$ の対数を作り、$n=1$ で微分します。熱核差の面積項だけを残すと、必要な積分は $\int_{\epsilon^2}^{\infty}s^{-2}\,ds=1/\epsilon^2$ です。

<!-- proof-start -->
### 証明

実Gaussian場の形式的な分配関数は $Z_n=(\det D_n)^{-1/2}$ です。熱核正則化では $\ln\det D_n=-\int_{\epsilon^2}^\infty K_n(s)\,ds/s$ と置く（同一の赤外処理を全 $n$ で用いる）ので、

$$
\begin{aligned}
F(n)&:=\ln Z_n-n\ln Z_1\\
&=\frac12\int_{\epsilon^2}^\infty\frac{ds}{s}
  \left(K_n(s)-nK_1(s)\right)\\
&=\frac12\frac{A_\Sigma}{4\pi}\frac{1-n^2}{12n}
   \int_{\epsilon^2}^\infty\frac{ds}{s^2}\\
&=\frac{A_\Sigma}{96\pi\epsilon^2}
   \left(\frac1n-n\right).
\end{aligned}
$$

$F(1)=0$ です。複製公式の $S=-\partial_nF(n)|_{n=1}$ に代入すると、

$$
\begin{aligned}
S_{\rm out}^{(\epsilon)}\big|_{\rm area}
&=-\frac{A_\Sigma}{96\pi\epsilon^2}
  \left(-\frac1{n^2}-1\right)_{n=1}\\
&=\frac{A_\Sigma}{48\pi\epsilon^2}.
\end{aligned}
$$

複製公式は、整数 $n$ に対して $\operatorname{Tr}\rho_{\rm out}^n=Z_n/Z_1^n$ が成立し、$n=1$ で微分可能なとき $\partial_n\operatorname{Tr}\rho^n|_1=\operatorname{Tr}(\rho\ln\rho)$ となることから来ます。この模型での幾何学的複製の正当化と錐熱核係数は入力仮定です。$\square$
<!-- proof-end -->

同じ自由スカラーでも**正則化方式を変えれば係数の表現も変わり得ます**。上の $1/(48\pi)$ を、任意の鋭い格子カットオフへ移植してはいけません。

## 3. 面積の係数にも量子場の発散が入る

何もせずに $A/(4G)$ と $S_{\rm out}^{(\epsilon)}$ を足すと、後者は $\epsilon\to0$ で発散します。ところが量子場を積分消去すると重力の作用そのものにも局所的な発散が生じ、$R$ に掛かる係数、すなわち $G$ の逆数が変わります。

ユークリッド作用のEinstein–Hilbert部分を $I_{E,\rm grav}=-\int R\sqrt g\,d^4x/(16\pi G_{\rm bare})$ と書きます。ここで **bare** は指定した $\epsilon$ に依存してよい未繰り込みの結合、**ren** は同じ規約で有限量を固定した繰り込み後の結合です。計算に現れる4次元の滑らかな背景の熱核の小 $s$ 展開は、境界のない領域で

$$
K_1(s)=\frac{1}{(4\pi s)^2}
\int_M\sqrt g\,d^4x\,
\biggl[1+\frac{sR}{6}+O(s^2)\biggr]
$$

となります。体積積分の外側に $(4\pi s)^{-2}$ を掛けています。$1$ の項は宇宙項の発散、$R/6$ の項はEinstein–Hilbert結合の発散へ対応します。後者だけを取り出すと

$$
\boxed{\displaystyle
K_1(s)\big|_R
=\frac{1}{6(4\pi)^2s}\int_M R\sqrt g\,d^4x}
$$

です。熱核の $R/6$ 係数も標準的な非自明なスペクトル入力で、ここでの証明責務はその**作用への代入と係数の一致**です。

<a id="prop-bht21-newton-ren"></a>

<!-- formal-statement-start -->
> **命題（一ループのNewton定数と面積発散の整合）**
> 4次元の滑らかなユークリッド背景で、質量零・最小結合の自由実スカラーの熱核の曲率一次項が次を満たすと仮定する。

$$
K_1(s)\big|_R
=\frac1{6(4\pi)^2s}\int_M R\sqrt g\,d^4x.
$$

> proper-time 下限を $\epsilon^2$ とし、同じ規約でEinstein–Hilbert結合を定義する。この一ループの曲率一次発散を吸収する結合は

$$
\frac1{G_{\rm ren}}
=\frac1{G_{\rm bare}(\epsilon)}
+\frac1{12\pi\epsilon^2}
$$

> （有限の基準条件・他の局所反項は別途指定）と選べる。また前節の錐模型の面積発散は

$$
\frac{A_\Sigma}{48\pi\epsilon^2}
=\frac{A_\Sigma}{4}
\left(\frac1{G_{\rm ren}}-\frac1{G_{\rm bare}(\epsilon)}\right)
$$

> と一致する。この一致は指定模型の局所紫外部分に関するもので、これだけで全エントロピーの有限性を証明したわけではない。
<!-- formal-statement-end -->

### 証明の見取り図

スカラーの一ループ有効作用 $W=-\frac12\int ds\,K(s)/s$ へ曲率一次項を入れます。係数を $-R/(16\pi G)$ の形へ戻し、前節の面積係数と比較します。

<!-- proof-start -->
### 証明

熱核の曲率項だけを有効作用に代入すると、

$$
\begin{aligned}
W\big|_R
&=-\frac12\int_{\epsilon^2}^{\infty}\frac{ds}{s}
   \frac{1}{6(4\pi)^2s}\int_M R\sqrt g\,d^4x\\
&=-\frac1{12(4\pi)^2}
  \left(\int_{\epsilon^2}^{\infty}\frac{ds}{s^2}\right)
   \int_M R\sqrt g\,d^4x\\
&=-\frac1{192\pi^2\epsilon^2}\int_M R\sqrt g\,d^4x.
\end{aligned}
$$

これを $I_{E,\rm grav}+W$ の $R$ 項でまとめると、

$$
-\frac1{16\pi G_{\rm bare}}\int_M R\sqrt g\,d^4x
-\frac1{192\pi^2\epsilon^2}\int_M R\sqrt g\,d^4x
=-\frac1{16\pi}
\left(\frac1{G_{\rm bare}}+\frac1{12\pi\epsilon^2}\right)
\int_M R\sqrt g\,d^4x.
$$

$16\pi/(192\pi^2)=1/(12\pi)$ ですから、括弧を $1/G_{\rm ren}$ と定めれば第一式を得ます。面積へ掛けると

$$
\frac{A_\Sigma}{4}\frac1{12\pi\epsilon^2}
=\frac{A_\Sigma}{48\pi\epsilon^2},
$$

となり、[錐模型の発散](#prop-bht21-cone-scalar)と係数が一致します。真空エネルギーの体積項や $R^2$ 等の追加発散はこの比較から除外しており、適切な局所反項と境界条件で別途処理します。$\square$
<!-- proof-end -->

**重要な符号の確認**：ここでは $\epsilon$ を小さくすると $1/G_{\rm bare}(\epsilon)$ が相殺のために減り得ます。未繰り込みの量を正の「観測Newton定数」と誤認してはいけません。意味を持つのは同一規約でまとめた有限な観測量です。

## 4. 一般化エントロピーを一つの量として定義する

面積と外部エントロピーの両方に正則化を入れた後で、その**和**の極限を取ります。定常Einstein重力の[面積エントロピーの規格化](../BHT9/index.md#def-bht9-area-normalization)と[Wald公式](../BHT19/index.md#def-bht19-wald-entropy)の違いにも注意しましょう。重力作用に高階曲率項がある場合、その局所エントロピーは単純な $A/(4G)$ だけではありません。正則な定常分岐面では、[BHT20の $f(R)$ 模型](../BHT20/index.md#prop-bht20-fr-wald)のような補正を加えます。

<a id="def-bht21-generalized-entropy"></a>

<!-- formal-statement-start -->
> **定義（繰り込まれた一般化エントロピー）**
> 4次元半古典重力の指定された切断面 $\Sigma$ と外部量子状態 $\omega$ をとる。正則化 $\epsilon$ と同じ反項規約で定めた重力の局所エントロピーを $S_{\rm grav}^{\rm bare}[\Sigma;\epsilon]$、[外部エントロピー](#def-bht21-regulated-outside)を $S_{\rm out}^{(\epsilon)}[\Sigma,\omega]$ とする。すべての必要な局所反項を含め、有限な極限が存在する場合、

$$
\boxed{\displaystyle
S_{\rm gen}[\Sigma,\omega]
:=\lim_{\epsilon\to0}
\left\{S_{\rm grav}^{\rm bare}[\Sigma;\epsilon]
+S_{\rm out}^{(\epsilon)}[\Sigma,\omega]\right\}}
$$

> を**繰り込まれた一般化エントロピー**と呼ぶ。Einstein項だけが有効な近似では、同一規約で

$$
S_{\rm gen}
=\frac{A_\Sigma}{4G_{\rm ren}}
+S_{\rm out}^{\rm ren}[\Sigma,\omega]
$$

> と表せる。高階曲率・境界・接触項が必要なら、それらの局所エントロピーを重力項へ含める。この定義自体は動的切断面での単調性や、任意の量子状態に対する有限性を宣言しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht21-generalized-entropy -->
**定義の確認**：面積 $A_\Sigma>0$ を固定し、最小結合自由スカラーの上の一ループ紫外部分だけを考えます。残りの有限な状態依存部分を $s_\omega$ と書き、

$$
\begin{aligned}
S_{\rm grav}^{\rm bare}&=\frac{A_\Sigma}{4G_{\rm bare}(\epsilon)},\\
S_{\rm out}^{(\epsilon)}
&=\frac{A_\Sigma}{48\pi\epsilon^2}+s_\omega+o(1),\\
\frac1{G_{\rm bare}(\epsilon)}
&=\frac1{G_{\rm ren}}-\frac1{12\pi\epsilon^2}
\end{aligned}
$$

と同じカットオフで指定すれば、和の発散は

$$
-\frac{A_\Sigma}{48\pi\epsilon^2}
+\frac{A_\Sigma}{48\pi\epsilon^2}=0
$$

と相殺され、$S_{\rm gen}=A_\Sigma/(4G_{\rm ren})+s_\omega$ です。切断面と状態を固定し、引き算の**両側で同じ正則化**を使い、残余が実際に $o(1)$ であることまで明示した場合の例です。一般背景では対数発散等を落としたこの一行を完成証明にしません。
<!-- definition-example-end -->

### 4.1 「外側だけを繰り込んだ量」は規約を持つ

$S_{\rm out}^{\rm ren}=S_{\rm out}^{(\epsilon)}-A/(48\pi\epsilon^2)$ と書くとき、引く係数や有限の局所項は規約で変わります。例えば有限な実数 $\delta$ を逆Newton結合へ加え、

$$
\frac1{G_{\rm ren}'}=\frac1{G_{\rm ren}}+\delta,
\qquad
S_{\rm out}^{\rm ren'}=S_{\rm out}^{\rm ren}-\frac{\delta A_\Sigma}{4}
$$

と同時に変更すれば、$A/(4G_{\rm ren}')+S_{\rm out}^{\rm ren'}$ は不変です。重力と場を**別々に**定義した値を、観測可能な唯一の分解とみなしてはいけません。有限な局所幾何反項がある場合はその分も一緒に移し替えます。

## 5. 同じ面の二つの量子状態なら何が比べられるか

繰り込みを学ぶと「個々の無限大より差の方が安定」という発想が役立ちます。ただし状態を変えると紫外構造が必ず同じとは限りません。**短距離の特異性が等しい十分に正則な状態**（通常の自由場では適切なHadamard型状態など）に範囲を絞ります。

<a id="prop-bht21-state-difference"></a>

<!-- formal-statement-start -->
> **命題（同一切断面のUV等価な状態差）**
> 同一の背景幾何・切断面 $\Sigma$・正則化を固定する。二状態 $\omega_1,\omega_2$ の外部エントロピーが共通の局所発散 $D(\epsilon,\Sigma)$ を持ち、

$$
S_{\rm out}^{(\epsilon)}[\Sigma,\omega_i]
=D(\epsilon,\Sigma)+s_i+o(1)
\qquad (i=1,2)
$$

> と展開できると仮定する。この場合、重力局所項を同一に保つ二状態の一般化エントロピー差は

$$
S_{\rm gen}[\Sigma,\omega_2]-S_{\rm gen}[\Sigma,\omega_1]
=s_2-s_1
=\lim_{\epsilon\to0}
\bigl(S_{\rm out}^{(\epsilon)}[\Sigma,\omega_2]
-S_{\rm out}^{(\epsilon)}[\Sigma,\omega_1]\bigr)
$$

> である。状態が異なる短距離特異性を持つ、または背景・切断面が変わるならこの命題の共通発散仮定を再検査する。
<!-- formal-statement-end -->

### 証明の見取り図

二つの式を同じ $\epsilon$ で引き、共通の $D$ を消します。重力部分の相殺には切断面と結合を共通にしたという仮定が必要です。

<!-- proof-start -->
### 証明

指定された二つの展開を同じ $\epsilon$ で引けば、

$$
\begin{aligned}
S_{\rm out}^{(\epsilon)}[\Sigma,\omega_2]
-S_{\rm out}^{(\epsilon)}[\Sigma,\omega_1]
&=\{D+s_2+o(1)\}-\{D+s_1+o(1)\}\\
&=s_2-s_1+o(1).
\end{aligned}
$$

同一の $\Sigma$ と背景・局所反項で $S_{\rm grav}^{\rm bare}[\Sigma;\epsilon]$ は同じなので、[一般化エントロピーの定義](#def-bht21-generalized-entropy)からその差もこの極限に等しい。これは**共通発散を持つ**という仮定からの代数結論であり、すべての場の状態がその仮定を満たすという証明ではありません。$\square$
<!-- proof-end -->

有限模型なら、Bell対が一個増えることで外部エントロピー差は $\ln2$ です。連続場のモデルで同じ差を主張するには、Bell対の導入が短距離の特異性を変えず、同じ面・背景を保つことを確認しなくてはなりません。

## 6. 単純な相殺を拡張できない場合

| 状況 | 何を追加で確かめるか |
| --- | --- |
| 非最小結合 $\xi R\phi^2$ | 場の作用の曲率依存が局所的な**接触項**を生む。外部の単純な部分トレースだけとNewton定数の発散が一致するとは限らない |
| ゲージ場・重力の量子揺らぎ | Gauss拘束・境界自由度・代数的な領域分割と接触項を指定する |
| 曲がった切断面・質量ありの場 | $A/\epsilon^2$ に加えて曲率・質量を含む対数発散などを調べ、高階曲率反項とそのエントロピーを含める |
| 動的または極限地平線 | 定常分岐面に対する[Wald公式](../BHT19/index.md#def-bht19-wald-entropy)を無条件で延長せず、採用する重力エントロピー汎関数を指定する |
| 非Hadamard型の状態 | 状態依存の短距離特異性が変わり、同じ局所反項で有限にならない可能性を検査する |

たとえば非最小結合なら、Euclid作用に $\frac12\xi R\phi^2$ があり、曲率変分の際に $\phi^2$ への寄与が現れます。そのため**一見同じ「外部エンタングルメント」でも、円錐の作用微分から生じる重力側の局所項まで数えた量とは一致しない場合があります**。作用を固定し、その場の拘束・状態・正則化を示さずに「$S_{\rm out}$ がすべての量子補正である」とするのは誤りです。

また、時間の異なる切断面を比較して $S_{\rm gen}$ が増えるとするのが**一般化第二法則（GSL）**です。本講では和の定義と発散の処理を行いましたが、状態・エネルギー・地平線の運動の仮定を置いて単調性を示してはいません。次講BHT22で、Hawking放射と落下物質の収支を具体化します。

## 7. 演習（全問に詳細解答）

### Level A：定義・短距離係数・局所反項

<a id="ex-bht21-a01"></a>

#### BHT21-A01 Bell対と底の変換

- Level: A

状態 $|\Psi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ の外部縮約を求め、エントロピーをビット単位と自然対数単位で計算せよ。全系のエントロピーと同じか。

<!-- solution-start -->
**詳細解答**：$\rho=|\Psi\rangle\langle\Psi|$ を展開すると $|00\rangle\langle00|$ と $|11\rangle\langle11|$ の係数は各 $1/2$、交差項は内側の直交性で部分トレース後に消えます。[部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を使えば $\rho_{\rm out}=\operatorname{diag}(1/2,1/2)$。固有値の和は1、非負なので密度演算子です。[von Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)からビット単位で $-2(1/2)\log_2(1/2)=1$、自然対数では $-2(1/2)\ln(1/2)=\ln2$。全系はrank 1の純粋状態なので $S(\rho)=0$ です。外の混合は全体の古典的不確実性を意味しません。
<!-- solution-end -->

<a id="ex-bht21-a02"></a>

#### BHT21-A02 面上の独立Bell対

- Level: A

面積 $A=L^2$ を一辺 $\epsilon=L/m$（整数 $m\ge1$）の正方格子で埋め、セルごとに独立なBell対を置く。外のエントロピーを求め、$\epsilon\to0$ での発散次数を示せ。

<!-- solution-start -->
**詳細解答**：各辺に $m=L/\epsilon$ セルあるので $N=m^2=A/\epsilon^2$ です。各縮約は $I_2/2$ で、$N$ 対の縮約は $(I_2/2)^{\otimes N}=I_{2^N}/2^N$。$2^N$ 個の固有値はすべて $2^{-N}$ なので、自然対数のエントロピーは $-2^N\cdot2^{-N}\ln(2^{-N})=N\ln2=A\ln2/\epsilon^2$。$A$ 固定で $\epsilon\to0$ とすれば $\epsilon^{-2}$ で増えます。これは正方格子模型の係数で、自由スカラーの $1/(48\pi)$ とは別物です。
<!-- solution-end -->

<a id="ex-bht21-a03"></a>

#### BHT21-A03 錐模型の複製微分

- Level: A

$F(n)=C(n^{-1}-n)$、$C=A/(96\pi\epsilon^2)$ とする。$F(1)$、$-\partial_nF(1)$ を求め、$A>0,\epsilon>0$ での符号を確認せよ。

<!-- solution-start -->
**詳細解答**：$F(1)=C(1-1)=0$。$d(n^{-1})/dn=-n^{-2}$ だから $F'(n)=C(-n^{-2}-1)$。従って $-F'(1)=2C=A/(48\pi\epsilon^2)>0$ です。$n=1$ での微分は規格化した $\ln Z_n-n\ln Z_1$ に行う必要があり、$\ln Z_n$ だけでは体積項が混入します。
<!-- solution-end -->

<a id="ex-bht21-a04"></a>

#### BHT21-A04 熱核から逆Newton結合

- Level: A

$K(s)|_R=[6(4\pi)^2s]^{-1}\int R\sqrt g\,d^4x$ を $W=-\frac12\int_{\epsilon^2}^{\infty}K(s)\,ds/s$ に入れ、$\Delta(1/G)$ を求めよ。

<!-- solution-start -->
**詳細解答**：曲率一次項は

$$
W|_R=-\frac1{12(4\pi)^2}
\left(\int_{\epsilon^2}^{\infty}s^{-2}\,ds\right)\int R\sqrt g\,d^4x
=-\frac1{192\pi^2\epsilon^2}\int R\sqrt g\,d^4x.
$$

ユークリッドEinstein–Hilbert作用の $R$ 項は $-[16\pi G]^{-1}\int R\sqrt g\,d^4x$ なので、係数を比べて $\Delta(1/G)=16\pi/(192\pi^2\epsilon^2)=1/(12\pi\epsilon^2)$ です。符号は両者とも作用で負だから加算になります。
<!-- solution-end -->

<a id="ex-bht21-a05"></a>

#### BHT21-A05 bare 面積項の相殺

- Level: A

$1/G_{\rm bare}=1/G_{\rm ren}-1/(12\pi\epsilon^2)$、$S_{\rm out}^{(\epsilon)}=A/(48\pi\epsilon^2)+s+o(1)$ とする。$A$ を固定して $S_{\rm gen}$ を計算せよ。

<!-- solution-start -->
**詳細解答**：同一 $\epsilon$ で和を作ると

$$
\frac{A}{4G_{\rm bare}}+S_{\rm out}^{(\epsilon)}
=\frac{A}{4G_{\rm ren}}
-\frac{A}{48\pi\epsilon^2}
+\frac{A}{48\pi\epsilon^2}+s+o(1).
$$

面積発散が項ごとに相殺され、$o(1)\to0$ なら $S_{\rm gen}=A/(4G_{\rm ren})+s$ です。$S_{\rm out}^{(\epsilon)}$ 単独の極限は存在しません。
<!-- solution-end -->

### Level B：どの仮定で相殺・比較できるか

<a id="ex-bht21-b01"></a>

#### BHT21-B01 二つのカットオフの比較

- Level: B

同じ $G_{\rm ren}$ と面積 $A$ について、$\epsilon$ と $2\epsilon$ の bare 結合と外部面積発散を比較せよ。どの項が変わり、何が同じになるか。

<!-- solution-start -->
**詳細解答**：第一の正則化では $1/G_{\rm bare}(\epsilon)=1/G_{\rm ren}-1/(12\pi\epsilon^2)$。第二では

$$
\frac1{G_{\rm bare}(2\epsilon)}
=\frac1{G_{\rm ren}}-\frac1{48\pi\epsilon^2}.
$$

従って bare 逆結合の差は $1/(16\pi\epsilon^2)$ です。一方、外部の発散は $A/(48\pi\epsilon^2)$ から $A/(192\pi\epsilon^2)$ に変わり、その差は $-A/(64\pi\epsilon^2)$。重力項の差は $A/4$ に逆結合差を掛けた $+A/(64\pi\epsilon^2)$ なので打ち消します。有限残余 $s$ の正則化規約も同時に整合させると、和の $A/(4G_{\rm ren})+s$ は同じです。個別の bare 値を物理量と呼ばないことが要点です。
<!-- solution-end -->

<a id="ex-bht21-b02"></a>

#### BHT21-B02 状態差と切断面の違い

- Level: B

固定面積 $A$ で $S_i^{(\epsilon)}=cA/\epsilon^2+s_i+o(1)$（$i=1,2$）とする。二状態の差を求めよ。その後、第二の状態だけ面積が $A+\Delta A$ に変わった場合、同じ推論を使えるか述べよ。

<!-- solution-start -->
**詳細解答**：同じ面で共通発散を持つ場合は $S_2^{(\epsilon)}-S_1^{(\epsilon)}=s_2-s_1+o(1)$ なので極限は $s_2-s_1$。重力の面積項も同じで相殺します。面積を変えると外部差に $c\Delta A/\epsilon^2$ が残り、同じ打消しは使えません。面の変化に伴う重力側の $S_{\rm grav}^{\rm bare}[\Sigma_2]-S_{\rm grav}^{\rm bare}[\Sigma_1]$ も含め、同じ繰り込み規約で**全体を比較し直す**必要があります。
<!-- solution-end -->

<a id="ex-bht21-b03"></a>

#### BHT21-B03 非最小結合と普遍化の失敗

- Level: B

自由スカラーの作用に $\frac12\xi R\phi^2$ を加える。$\xi\ne0$ で「外部の部分トレースで得るエントロピーの面積係数は常に $1/G$ の発散と一致する」と断定できるか。どの変分に追加寄与が出るか説明せよ。

<!-- solution-start -->
**詳細解答**：断定できません。作用の $\xi R\phi^2/2$ は曲率を変分すると、計量・場の他の項を固定した形式的な局所変分でも $\xi\phi^2\delta R/2$ を含みます。従って重力有効作用の $R$ 係数、さらに円錐での局所接触項に寄与する可能性があります。一方、指定した因子分解上の部分トレースは $\rho_{\rm out}$ の固有値だけで計算し、この局所曲率変分を自動的には数えません。必要な局所・接触項も含めた定義と同一の正則化を指定して初めて比較できます。$\xi=0$ の[錐模型](#prop-bht21-cone-scalar)の係数を $\xi\ne0$ へ無条件に流用するのは、仮定を落とした操作です。
<!-- solution-end -->

<a id="ex-bht21-b04"></a>

#### BHT21-B04 高階曲率がある重力項

- Level: B

定常分岐面 $\Sigma$ 上で $f(R)=R+\alpha R^2-2\Lambda$ の曲率が $R_0$ 一定であるとする。局所重力エントロピーを計算し、さらに外部量子場を加える際に「$A/(4G_{\rm ren})$ だけで足りる」といえる条件を述べよ。

<!-- solution-start -->
**詳細解答**：[BHT20の定常 $f(R)$ Wald公式](../BHT20/index.md#prop-bht20-fr-wald)を $f'(R)=1+2\alpha R$ に適用すると

$$
S_{\rm grav}=\frac1{4G}\int_\Sigma(1+2\alpha R_0)\,dA
=\frac{A_\Sigma}{4G}(1+2\alpha R_0).
$$

ただし、これは定常分岐面とこの模型の実際の解を仮定した計算です。[定曲率解の条件](../BHT20/index.md#thm-bht20-fr-field-equation)も別途満たさなければなりません。$\alpha R_0\ne0$ なら面積項だけでは既に不足です。量子場の有効作用が曲率二乗などの局所反項を生む場合は、その繰り込まれた係数のWald型寄与も加えます。$A/(4G_{\rm ren})$ だけでよいのは、それ以外の局所寄与が指定精度で消えるか無視できると検査した近似に限ります。
<!-- solution-end -->

### Level C：一ループ模型の統合検算

<a id="ex-bht21-c01"></a>

#### BHT21-C01 錐熱核・重力反項・状態差を一つの計算でつなぐ

- Level: C

4次元の平坦な直積錐近傍、面積 $A>0$、質量零・最小結合自由実スカラーを考える。$K_n(s)-nK_1(s)=[A/(4\pi s)](1-n^2)/(12n)$、$K_1(s)|_R=[6(4\pi)^2s]^{-1}\int R\sqrt g\,d^4x$ とし、どちらも下限 $\epsilon^2$ の proper-time 正則化を用いる。

1. $\ln Z_n-n\ln Z_1$ から面積発散の係数を計算する。
2. $W|_R$ から $1/G_{\rm ren}-1/G_{\rm bare}$ を求め、両係数を照合する。
3. $S_{\rm out}^{(\epsilon)}[\omega_i]=A/(48\pi\epsilon^2)+s_i+o(1)$（$i=1,2$）とし、両状態の一般化エントロピー差を求める。
4. 上の答えだけで、非最小結合場や蒸発中の一般化第二法則まで証明できるか、失われる仮定を列挙する。

<!-- solution-start -->
**詳細解答**：

**1. 複製の面積係数。** $\ln Z_n=-\frac12\ln\det D_n$ と熱核表示 $\ln Z_n=\frac12\int_{\epsilon^2}^\infty K_n(s)\,ds/s$ を使います。正規化した差に代入して

$$
\begin{aligned}
F(n)
&=\frac12\int_{\epsilon^2}^\infty\frac{ds}{s}
   \frac{A}{4\pi s}\frac{1-n^2}{12n}\\
&=\frac{A}{96\pi}
  \left(\frac1n-n\right)
  \left[-\frac1s\right]_{\epsilon^2}^{\infty}\\
&=\frac{A}{96\pi\epsilon^2}\left(n^{-1}-n\right).
\end{aligned}
$$

従って $S=-F'(1)=[A/(96\pi\epsilon^2)](1+1)=A/(48\pi\epsilon^2)$ です。

**2. 重力の係数。** 曲率一次項だけを $W=-\frac12\int K\,ds/s$ に入れます：

$$
\begin{aligned}
W|_R
&=-\frac1{12(4\pi)^2}
\left(\int_{\epsilon^2}^\infty\frac{ds}{s^2}\right)
\int R\sqrt g\,d^4x\\
&=-\frac1{12(4\pi)^2\epsilon^2}\int R\sqrt g\,d^4x\\
&=-\frac1{192\pi^2\epsilon^2}\int R\sqrt g\,d^4x.
\end{aligned}
$$

$-1/(16\pi G_{\rm bare})$ にこの係数を足して同じ形に戻すと

$$
\frac1{G_{\rm ren}}-\frac1{G_{\rm bare}}
=\frac{16\pi}{192\pi^2\epsilon^2}
=\frac1{12\pi\epsilon^2}.
$$

$A/4$ 倍すると $A/(48\pi\epsilon^2)$ となり、1. の面積発散と一致します。

**3. 状態差。** bare 面積項を $A/(4G_{\rm ren})-A/(48\pi\epsilon^2)$ と書き直し、各 $S_{\rm out}^{(\epsilon)}$ と足すと $S_{\rm gen}[\omega_i]=A/(4G_{\rm ren})+s_i$。従って

$$
S_{\rm gen}[\omega_2]-S_{\rm gen}[\omega_1]=s_2-s_1.
$$

共通の幾何・切断面・発散を仮定したので差を取れました。

**4. 射程。** 1. の錐熱核は最小結合・自由・平坦な直積錐を使い、2. の曲率係数は滑らかな背景と一ループを使いました。$\xi R\phi^2$、ゲージ拘束、曲率二乗、有限の状態依存項があれば追加の局所・接触反項が必要になり得ます。さらに3. は**同一切断面の二状態**の比較にすぎず、時間の異なる切断面を含む蒸発の単調性ではありません。エネルギー条件と量子状態の仮定を伴うGSLの証明にはなりません。
<!-- solution-end -->

## 8. まとめと次講への橋

1. $S_{\rm out}$ は切断面・外部領域・状態・正則化を固定しないと値が定まりません。有限次元のエントロピー公式は、連続場へそのまま無限に足せません。
2. 最小結合自由実スカラーの平坦錐・proper-time 模型では、外部エントロピーの面積発散は $A/(48\pi\epsilon^2)$。同じ規約で逆Newton結合が $1/(12\pi\epsilon^2)$ だけ変化し、**面積の4分の1**を通して両者が整合します。
3. 一般化エントロピーは、必要な局所反項も含めて**重力項と外部項の和**として定義します。単独の「外部の繰り込まれた値」の分配は規約依存です。
4. 非最小結合、ゲージ拘束、曲がった面、高階曲率、異なる短距離特異性を持つ状態は別の検証を要求します。**有限な和を定義しただけで、第二法則は証明されません**。

次講 **BHT22「一般化第二法則（GSL）」** では、落下物質とHawking放射に伴う外部エントロピーを、地平線面積の変化と同じ収支へ載せます。

### さらに学ぶための一次資料

- L. Susskind and J. Uglum, [*Black Hole Entropy in Canonical Quantum Gravity and Superstring Theory*](https://arxiv.org/abs/hep-th/9401070)（1994）：エントロピーの紫外発散と重力結合の繰り込み。
- T. Jacobson and A. Satz, [Phys. Rev. D **87**, 084047](https://doi.org/10.1103/PhysRevD.87.084047)（2013）：有効作用とカットオフ分割の意味。
- S. N. Solodukhin, [*One-loop renormalization of black hole entropy due to nonminimally coupled matter*](https://doi.org/10.1103/PhysRevD.52.7046)（1995）：非最小結合での局所項と量子エントロピー。
- S. N. Solodukhin, [*Entanglement Entropy of Black Holes*](https://arxiv.org/abs/1104.3712)（2011）：錐熱核・面積発散・接触項の全体像を論じる総説。
