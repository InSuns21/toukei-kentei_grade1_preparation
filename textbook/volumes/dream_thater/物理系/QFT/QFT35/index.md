# QFT35 標準模型のゲージ群・フェルミオン表現・超電荷とHiggs結合

[QFT34のAbelian Higgs機構](../QFT34/index.md#thm-qft34-unitary-proca)では、一つの局所位相と複素スカラーから質量あるベクトル場を作りました。現実の電弱・強相互作用には、一つの位相だけでなく、色を混ぜる変換と、左巻きフェルミオンの二成分を混ぜる変換があります。それぞれの場が「どの変換を受けるか」を決めないと、相互作用の式そのものを一意に書けません。

本講では標準模型のゲージ群、表現、超電荷を定め、全フェルミオンを一枚の表で整理します。さらに共変微分の共変性、Higgs二重項の電荷と共役表示、三種類のYukawa結合の不変性を計算します。$W$・$Z$・光子の質量行列の対角化は、この表現を確定した後の問題です。

時空は $3+1$ 次元Minkowski空間、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、$\hbar=c=1$ とします。古典場は滑らかで、変分・積分は境界項が消える条件で行います。ゲージ結合 $g_s,g,g'>0$ は実数とし、ここでは**古典作用と木レベルの表現・結合**だけを確かめます。量子異常の不在や量子論の非摂動的存在は、この一覧だけからは従いません。

## 1. 三つの内部変換は何に作用するか

[QFT28の基本表現](../QFT28/index.md#def-qft28-covariant-derivative)では、$SU(N)$ は $N$ 成分複素列ベクトルにユニタリ行列として作用しました。標準模型で使うのは次の三因子です。

- $SU(3)_c$：三つの**色**成分に作用する。添字 $a=1,2,3$ を使う。
- $SU(2)_L$：左巻きの**弱二重項**の二成分に作用する。添字 $i=1,2$ を使う。
- $U(1)_Y$：場全体に超電荷に比例した位相を掛ける。

記号 $c,L,Y$ は群の役割を示すラベルで、時空添字ではありません。「左巻き」は回転する向きではなく、[QFT32の射影 $P_L=(1-\gamma^5)/2$](../QFT32/index.md#def-qft32-chirality)で選んだカイラリティを意味します。右巻きは $P_R=(1+\gamma^5)/2$ です。質量を持つ粒子のヘリシティとカイラリティを混同しません。

ここで複素共役な基本表示 $\overline{\mathbf3}$ は、$v\mapsto U_3^*v$ で変換する三成分を表します。元の $\mathbf3$ と同じ「三成分」であっても、群の作用が違います。$\mathbf1$ は変換しない一成分です。複数因子の表示を並べるときは、各因子がそれぞれの添字へ作用する**テンソル積表現**として扱います。

<a id="def-qft35-representation"></a>

<!-- formal-statement-start -->
> **定義（標準模型のゲージ表現ラベル）**
> 局所ゲージ変換の三因子を $SU(3)_c\times SU(2)_L\times U(1)_Y$ とする。場 $X$ の表現ラベル $(R_3,R_2)_Y$ とは、$SU(3)$ の表示 $R_3$、$SU(2)$ の表示 $R_2$、超電荷数 $Y$ により、その場が積群の作用を受けることを意味する。特に基本表示の場 $X^{ai}$ に対し

$$
X'^{ai}=e^{iY\beta(x)}(U_3(x))^a{}_{b}(U_2(x))^i{}_{j}X^{bj},
$$

> ここで $U_3\in SU(3)$、$U_2\in SU(2)$ は滑らかな行列値関数、$\beta$ は局所実パラメータである。表示が $\mathbf1$ の因子は作用から除く。$\mathbf3$ などの太字はベクトル空間の次元だけでなく群の作用を指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft35-representation -->
### 例：六成分なのに二種類の添字を持つ

$(\mathbf3,\mathbf2)_{1/6}$ の場 $X^{ai}$ は $3\times2=6$ 個の複素成分を持ちます。$U_3=I_3$、$U_2=\operatorname{diag}(e^{it/2},e^{-it/2})$、$\beta=0$ を選べば、すべての色 $a$ で $X^{a1}\mapsto e^{it/2}X^{a1}$、$X^{a2}\mapsto e^{-it/2}X^{a2}$ です。逆に $U_2=I_2$ として色変換すると、同じ $i$ の三成分だけが混ざります。表現ラベルの**三つの因子と作用する添字**を直接確認しました。
<!-- definition-example-end -->

**超電荷の正規化の注意。** 物理で使う $Y=1/6$ などの分数を、周期 $2\pi$ の $U(1)$ 座標 $\beta$ に無条件で代入すると、$\beta\mapsto\beta+2\pi$ で同じ変換になりません。厳密な大域群の座標としては $q=6Y\in\mathbb Z$ とおき、周期 $2\pi$ の $\alpha$ に $e^{iq\alpha}$ と作用させればよいです。以下の $e^{iY\beta}$ は $\beta=6\alpha$ とした**局所Lie代数側の慣用規約**です。大域群の中心による商の選択まで、この局所作用だけで決めたわけではありません。

## 2. 超電荷から電荷が出る理由

電弱対称性のうち $SU(2)_L$ の第三生成子を、基本二重項の基底で

$$
T_3=\frac12\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

と選びます。$SU(2)$ 一重項では三生成子は零行列です。実験で測る電磁電荷は、電子を $-1$ とする単位で表し、この規約における超電荷と $T_3$ の和として同定します。この同定は標準模型の電弱対称性がHiggs真空により残す生成子の選択に対応します。

<a id="def-qft35-hypercharge"></a>

<!-- formal-statement-start -->
> **定義（超電荷と電荷演算子）**
> $SU(2)_L$ の表現空間において、第三Hermitian生成子を $T_3$、その場の $U(1)_Y$ 超電荷数を $Y$ とする。電磁電荷演算子は

$$
Q=T_3+YI
$$

> と定める。$Q$ の固有値が、陽電子の電荷を $+1$ とする単位で測った成分の電磁電荷である。$SU(2)$ 一重項では $T_3=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft35-hypercharge -->
### 例：レプトン二重項の中性と負電荷

$L_L=(\nu_L,e_L)^T$ の表示を $(\mathbf1,\mathbf2)_{-1/2}$ とすると、$T_3$ の上側固有値は $1/2$、下側は $-1/2$ です。$YI=-I/2$ を加えると $Q=\operatorname{diag}(0,-1)$。これで**上側が中性、下側が負電荷**という定義の各条件を行列の作用で直接判定できます。
<!-- definition-example-end -->

<a id="prop-qft35-doublet-charges"></a>

<!-- formal-statement-start -->
> **命題（弱二重項の電荷固有値）**
> $SU(2)_L$ の基本二重項 $X=(X_1,X_2)^T$ に同じ超電荷 $Y$ が作用し、第三生成子を $T_3=\operatorname{diag}(1/2,-1/2)$ とする。電荷演算子の固有値は

$$
Q=T_3+YI_2=\operatorname{diag}(Y+1/2,Y-1/2)
$$

> であり、上成分・下成分が順にこの二値を持つ。一重項 $x$ の電荷は $Y$ に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

弱変換が作る二成分と、両方へ同じ位相を掛ける超電荷を区別し、対角行列として足します。

<!-- proof-start -->
### 証明

[電荷の定義](#def-qft35-hypercharge)より

$$
Q\binom{X_1}{X_2}
=\left[\begin{pmatrix}1/2&0\\0&-1/2\end{pmatrix}
+Y\begin{pmatrix}1&0\\0&1\end{pmatrix}\right]\binom{X_1}{X_2}
=\binom{(Y+1/2)X_1}{(Y-1/2)X_2}.
$$

よって基底ベクトル $(1,0)^T$ と $(0,1)^T$ が電荷固有ベクトルです。一重項は $T_3$ の作用が零なので $Q=Y$ です。
<!-- proof-end -->

この命題を三色のクォーク二重項 $Q_L^a=(u_L^a,d_L^a)^T$ に $Y=1/6$ として適用すると、

$$
Q(u_L^a)=\frac12+\frac16=\frac23,\qquad
Q(d_L^a)=-\frac12+\frac16=-\frac13.
$$

電荷は色添字 $a$ に依存しません。$SU(3)$ は色を入れ替えますが、電磁電荷まで混ぜるわけではないためです。

## 3. 一世代の場を表現として確定する

**世代**とは、同じゲージ表現を持ち、質量や相互の混合の係数などが異なるフェルミオンの組を指します。まず一世代の**粒子側の左・右カイラル場**を表にします。各 $L,R$ は[カイラリティの定義](../QFT32/index.md#def-qft32-chirality)による射影を表し、$SU(2)_L$ の「$L$」は、弱二重項が左カイラル場へ作用するという意味です。

| 場 | 表示 $(SU(3),SU(2))_Y$ | 成分の電荷 | 複素内部成分数 |
| --- | --- | --- | ---: |
| $Q_L=(u_L,d_L)^T$ | $(\mathbf3,\mathbf2)_{1/6}$ | $(2/3,-1/3)$ | 6 |
| $u_R$ | $(\mathbf3,\mathbf1)_{2/3}$ | $2/3$ | 3 |
| $d_R$ | $(\mathbf3,\mathbf1)_{-1/3}$ | $-1/3$ | 3 |
| $L_L=(\nu_L,e_L)^T$ | $(\mathbf1,\mathbf2)_{-1/2}$ | $(0,-1)$ | 2 |
| $e_R$ | $(\mathbf1,\mathbf1)_{-1}$ | $-1$ | 1 |
| $H=(H^+,H^0)^T$ | $(\mathbf1,\mathbf2)_{1/2}$ | $(1,0)$ | 2 |

最後の $H$ はフェルミオンではなく**複素スカラーHiggs二重項**です。各表の成分数にはスピンや粒子・反粒子の自由度を掛けていません。例えば $Q_L$ の「6」は色3×弱2であり、六種類のDiracフェルミオンを意味しません。

右巻きクォーク $u_R,d_R$ は色の基本表示ですが弱一重項です。右巻き荷電レプトン $e_R$ も弱一重項です。**最小標準模型には独立な右巻きニュートリノ $\nu_R$ は含めません**。追加するなら $(\mathbf1,\mathbf1)_0$ というゲージ一重項が候補ですが、その追加とニュートリノ質量の機構は別の模型の選択です。

この表と同じ表示は三世代に反復されます。世代添字 $r=1,2,3$ を付ければ、$Q_{Lr},u_{Rr},d_{Rr},L_{Lr},e_{Rr}$ です。第一世代 $(u,d,\nu_e,e)$、第二世代 $(c,s,\nu_\mu,\mu)$、第三世代 $(t,b,\nu_\tau,\tau)$ と対応します。ニュートリノのフレーバー表示と質量固有状態が一般に同一とは限りません。

**反粒子と共役表示**を区別します。例えば右カイラルの $u_R$ を電荷共役して左カイラルの場 $u_R^c$ で記すと、色表示と超電荷は複素共役され、$(\overline{\mathbf3},\mathbf1)_{-2/3}$ となります。$u_R^c$ と $u_R$ を同じ表に同一場として二重計数してはいけません。量子異常を左カイラル場だけで数えるときにはこの置き換えが重要になります。

## 4. 表示ごとの共変微分と運動項

三種類のゲージ場を導入します。色の場 $G_\mu^A$（$A=1,\ldots,8$）、弱の場 $W_\mu^I$（$I=1,2,3$）、超電荷の場 $B_\mu$ です。$t^A$ と $\tau^I$ を、当該表示でのHermitian生成子とします。基本表示なら $\operatorname{tr}(t^At^B)=\delta^{AB}/2$、$\tau^I=\sigma^I/2$ とします。添字 $A,I$ はゲージ生成子、$a,i$ は物質場の成分で、混同しません。

<a id="def-qft35-product-derivative"></a>

<!-- formal-statement-start -->
> **定義（標準模型の積群共変微分）**
> $3+1$ 次元の滑らかな場 $X$ が内部表示 $(R_3,R_2)_Y$ に属し、各因子のHermitian生成子を $t^A_{R_3},\tau^I_{R_2}$ とする。$g_s,g,g'>0$ とゲージ場 $G_\mu^A,W_\mu^I,B_\mu$ に対し、共変微分を

$$
D_\mu X=\left[\partial_\mu
-ig_sG_\mu^A t^A_{R_3}
-igW_\mu^I\tau^I_{R_2}
-ig'YB_\mu I\right]X
$$

> と定める。一重項に対応する生成子は零とする。各行列は当該テンソル因子にのみ作用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft35-product-derivative -->
### 例：弱二重項と右巻き電子の違い

色一重項のレプトン二重項 $L_L$ には $t^A=0$、$\tau^I=\sigma^I/2$、$Y=-1/2$ を代入するので

$$
D_\mu L_L=\left(\partial_\mu-\frac{ig}{2}W_\mu^I\sigma^I
+\frac{ig'}2B_\mu\right)L_L.
$$

右巻き電子 $e_R$ は色・弱ともに一重項で $Y=-1$ だから、$D_\mu e_R=(\partial_\mu+ig'B_\mu)e_R$ です。**表現の三つの因子を一つずつ零にする操作**によって、同じ定義から二通りの微分が得られます。
<!-- definition-example-end -->

積群の三因子は異なるテンソル因子に作用するので相互に交換します。局所変換を $V(x)=U_3(x)\otimes U_2(x)\,e^{iY\beta(x)}$ と書き、存在する因子だけを残します。[QFT28のゲージ変換則](../QFT28/index.md#thm-qft28-gauge-covariance)を各非可換因子へ適用し、Abelian因子では $B'_\mu=B_\mu+\partial_\mu\beta/g'$ とします。

<a id="thm-qft35-kinetic-covariance"></a>

<!-- formal-statement-start -->
> **定理（積群共変微分と運動項のゲージ共変性）**
> [積群共変微分](#def-qft35-product-derivative)を持つ滑らかな場 $X$ に $X'=VX$ を作用させる。$SU(3)$、$SU(2)$ のポテンシャルがそれぞれ[非可換変換則](../QFT28/index.md#thm-qft28-gauge-covariance)に従い、$U(1)_Y$ のポテンシャルが $B'_\mu=B_\mu+\partial_\mu\beta/g'$ に従えば、

$$
D'_\mu X'=V D_\mu X.
$$

> 各表示はユニタリであるため、複素スカラーの $(D_\mu X)^\dagger D^\mu X$ は不変である。$V$ がスピノル添字には作用しない内部変換なら、フェルミオンの $\overline X\,i\gamma^\mu D_\mu X$ も不変である。
<!-- formal-statement-end -->

### 証明の見取り図

三つの因子の非斉次な勾配は、それぞれ対応するゲージ場の変換で相殺されます。運動項では $V^\dagger V=I$ を使い、$\gamma^\mu$ は内部行列と交換します。

<!-- proof-start -->
### 証明

各因子の生成子は他因子の変換行列と交換するので、$D_\mu=\partial_\mu-i\mathcal A_\mu$、$\mathcal A_\mu=g_sG_\mu^At^A+gW_\mu^I\tau^I+g'YB_\mu I$ とまとめられます。各因子における[QFT28の変換則](../QFT28/index.md#thm-qft28-gauge-covariance)を合成すると

$$
\mathcal A'_\mu
=V\mathcal A_\mu V^{-1}-i(\partial_\mu V)V^{-1}.
$$

Abelian因子だけを取り出しても、$V_Y=e^{iY\beta}$ なので

$$
-i(\partial_\mu V_Y)V_Y^{-1}=Y\partial_\mu\beta,
\qquad g'YB'_\mu=g'YB_\mu+Y\partial_\mu\beta
$$

と一致します。従って積の微分から

$$
\begin{aligned}
D'_\mu(VX)&=(\partial_\mu V)X+V\partial_\mu X-i\mathcal A'_\mu VX\\
&=(\partial_\mu V)X+V\partial_\mu X
-iV\mathcal A_\mu X-(\partial_\mu V)X\\
&=V D_\mu X.
\end{aligned}
$$

ユニタリ性から $(D'X')^\dagger D'X'=(DX)^\dagger V^\dagger V(DX)=(DX)^\dagger DX$ です。Dirac共役について $\overline{VX}=\overline X V^\dagger$（$V$ は内部添字に作用し $\gamma^0$ と交換）なので、$\overline{X'}i\gamma^\mu D'_\mu X'=\overline X V^\dagger i\gamma^\mu V D_\mu X=\overline X i\gamma^\mu D_\mu X$ です。
<!-- proof-end -->

ただしこの不変性は**古典的な運動項**の話です。量子化したカイラル理論で正則化を含む測度まで不変かどうかは、別途、ゲージ異常を検査しなければなりません。

## 5. 二重項Higgsの中性成分と共役二重項

先の表で $H=(H^+,H^0)^T$ は $(\mathbf1,\mathbf2)_{1/2}$ です。[弱二重項の電荷固有値](#prop-qft35-doublet-charges)から $Q(H^+)=1$、$Q(H^0)=0$ が出ます。$H^0$ の方向に非零の真空代表を選ぶと、$Q$ はその真空を動かさず、電磁的な局所対称性が残ることが分かります。

$$
\langle H\rangle_0=\frac1{\sqrt2}\binom0v,\quad v>0,\qquad
Q\langle H\rangle_0
=\begin{pmatrix}1&0\\0&0\end{pmatrix}\frac1{\sqrt2}\binom0v=0.
$$

この段階で $W_\mu^3$ と $B_\mu$ のどの組合せが光子になるか、どんな質量になるかはまだ計算していません。ここで確かめたのは**残る生成子が真空を消す**という代数的条件です。

上型クォークに対しては $H$ をそのまま使うと超電荷が合いません。そこで $SU(2)$ の二重項を複素共役から再構成する操作が必要です。$\epsilon=i\sigma^2=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とおきます。

<a id="def-qft35-higgs-yukawa"></a>

<!-- formal-statement-start -->
> **定義（Higgs共役二重項とYukawa結合）**
> Higgs場 $H=(H^+,H^0)^T$ が $(\mathbf1,\mathbf2)_{1/2}$ で変換するとき、共役二重項を

$$
\widetilde H=\epsilon H^*
=\binom{H^{0*}}{-H^{+*}},
\qquad \epsilon=i\sigma^2
$$

> と定める。左巻き場 $Q_L,L_L$、右巻き場 $u_R,d_R,e_R$ に対し、世代添字を省いたYukawa結合とは、複素係数 $y_u,y_d,y_e$ とその複素共役を用いる三つの三重積

$$
\mathcal L_Y=-y_d\overline Q_L H d_R
-y_u\overline Q_L\widetilde H u_R
-y_e\overline L_L H e_R+\mathrm{h.c.}
$$

> の和である。色・弱の添字は各積の中で縮約する。$\mathrm{h.c.}$ は直前の三項全体のHermitian共役を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft35-higgs-yukawa -->
### 例：共役二重項の成分と超電荷

$H=(h_1,h_2)^T$ に対して $\epsilon H^*=(h_2^*,-h_1^*)^T$ です。$U(1)_Y$ の位相 $e^{i\beta/2}$ を掛けた $H$ は、複素共役後に $e^{-i\beta/2}$ を持ちます。従って $\widetilde H$ の超電荷は $-1/2$。上下の電荷は[弱二重項の電荷固有値](#prop-qft35-doublet-charges)から $0,-1$ で、実際 $(H^{0*},-H^{+*})$ と一致します。
<!-- definition-example-end -->

<a id="prop-qft35-conjugate-higgs"></a>

<!-- formal-statement-start -->
> **命題（共役Higgs二重項の変換）**
> $U\in SU(2)$、$H'=e^{i\beta/2}UH$ とする。$\epsilon=i\sigma^2$、$\widetilde H=\epsilon H^*$ なら

$$
\widetilde H'=e^{-i\beta/2}U\widetilde H.
$$

> したがって $\widetilde H$ は $(\mathbf1,\mathbf2)_{-1/2}$ として変換する。
<!-- formal-statement-end -->

### 証明の見取り図

単に $H^*$ を取ると $U^*$ で変換します。$SU(2)$ の基本表示に固有な $\epsilon U^*=U\epsilon$ を行列成分で確認し、同じ二重項表示へ戻します。

<!-- proof-start -->
### 証明

任意の $U\in SU(2)$ は複素数 $a,b$、$|a|^2+|b|^2=1$ により

$$
U=\begin{pmatrix}a&b\\-b^*&a^*\end{pmatrix}
$$

と書けます。ユニタリ性で第二列が第一列の直交補空間に入り、行列式を1に固定するとこの符号が決まります。実際

$$
\epsilon U^*
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}a^*&b^*\\-b&a\end{pmatrix}
=\begin{pmatrix}-b&a\\-a^*&-b^*\end{pmatrix}
=U\epsilon.
$$

ゆえに

$$
\widetilde H'=\epsilon(H')^*
=e^{-i\beta/2}\epsilon U^*H^*
=e^{-i\beta/2}U\epsilon H^*
=e^{-i\beta/2}U\widetilde H.
$$

位相の符号は複素共役で反転しますが、弱二重項の行列は $U$ に戻ることが示されました。
<!-- proof-end -->

<a id="thm-qft35-yukawa-invariance"></a>

<!-- formal-statement-start -->
> **定理（標準模型Yukawa項のゲージ不変性）**
> 一世代の $Q_L:(\mathbf3,\mathbf2)_{1/6}$、$u_R:(\mathbf3,\mathbf1)_{2/3}$、$d_R:(\mathbf3,\mathbf1)_{-1/3}$、$L_L:(\mathbf1,\mathbf2)_{-1/2}$、$e_R:(\mathbf1,\mathbf1)_{-1}$、$H:(\mathbf1,\mathbf2)_{1/2}$ を考える。$SU(2)$ の基本表示がユニタリであり、$\widetilde H=\epsilon H^*$ とすると、[定義の三つのYukawa項](#def-qft35-higgs-yukawa)はそれぞれ $SU(3)_c\times SU(2)_L\times U(1)_Y$ の局所変換で不変である。
<!-- formal-statement-end -->

### 証明の見取り図

色と弱の添字は $\overline{\mathbf3}\otimes\mathbf3$、$\overline{\mathbf2}\otimes\mathbf2$ の内積として消えます。最後に、共役場には**反対符号**の超電荷を置いて各三項の和が零かを確認します。

<!-- proof-start -->
### 証明

色添字 $a$、弱添字 $i$ を明記すると、第一項は $\overline Q_{L\,ai}H^i d_R^a$ です。色変換では $\overline Q_{L\,ai}\mapsto\overline Q_{L\,bj}(U_3^\dagger)^b{}_a(U_2^\dagger)^j{}_i e^{-i\beta/6}$、$d_R^a\mapsto(U_3)^a{}_c e^{-i\beta/3}d_R^c$、$H^i\mapsto(U_2)^i{}_k e^{i\beta/2}H^k$ となります。$U_3^\dagger U_3=I_3$、$U_2^\dagger U_2=I_2$ なので二つの行列は縮約で消え、位相の指数の和も

$$
-\frac16+\frac12-\frac13=0.
$$

第二項は[共役二重項の変換](#prop-qft35-conjugate-higgs)を使うと同じ色・弱のユニタリ縮約を持ち、その超電荷の総和は

$$
-\frac16-\frac12+\frac23=0.
$$

第三項は色一重項、弱で $\overline L_{L\,i}H^i$ が不変で、位相の和は

$$
-(-\tfrac12)+\frac12-1=0.
$$

すべての局所変換で各積が元の値に戻るため、三項の係数とHermitian共役を加えた作用密度も不変です。
<!-- proof-end -->

三世代では $y_u,y_d,y_e$ が一般に $3\times3$ の複素行列になります。ゲージ変換は世代添字には作用しないため、上の不変性は行列の各成分に対して成立します。一方、質量行列の対角化、混合行列、CP位相は、ゲージ表現の一覧だけでは決まりません。

## 6. 何が決まり、何がまだ決まらないか

- 群の表現が決まると、[共変微分](#def-qft35-product-derivative)の**どの生成子がどの場に作用するか**が決まり、フェルミオンの電磁電荷とYukawa三重積の許否を検算できます。
- $Q\langle H\rangle_0=0$ はHiggs真空に残る生成子を示しますが、弱混合角や $W,Z$ の質量は、二重項の運動項を二次展開してから求めます。
- ゲージ対称性だけでは数値的なYukawa係数・世代間混合・Higgsポテンシャルの係数は決まりません。
- 古典的に不変な作用を量子化してもカイラルゲージ対称性が保たれるには、量子異常の相殺が必要です。たとえば左カイラル場だけで数えるときは右カイラル場を共役表示で数える点に注意します。異常係数の導出は別途扱います。
- 中性のゲージ一重項 $\nu_R$、ニュートリノ質量演算子、強結合の非摂動現象は、この最小場一覧へ無条件に含めません。

## 7. 演習：表示を読んで不変量を作る

### 演習 QFT35-A1：六成分場の添字

- Level: A
- 問題：滑らかな場 $X^{ai}$、$a=1,2,3$、$i=1,2$ が $(\mathbf3,\mathbf2)_{1/6}$ に属するとする。$U_3=I_3$、$U_2=\operatorname{diag}(e^{it/2},e^{-it/2})$、$\beta=0$ のとき各成分の変換を書き、独立な複素内部成分数を求めよ。

<!-- solution-start -->
**詳細解答**

[表現の定義](#def-qft35-representation)に代入すると、$X'^{a1}=e^{it/2}X^{a1}$、$X'^{a2}=e^{-it/2}X^{a2}$ です。$a$ は三通り、$i$ は二通りなので $3\cdot2=6$ 成分です。弱行列は色添字を変えません。$X^{a1}$ と $X^{a2}$ に逆向きの位相を掛けるため、弱二重項全体が一つの同じ位相を受けるわけではありません。
<!-- solution-end -->

### 演習 QFT35-A2：二重項の超電荷を逆算する

- Level: A
- 問題：$SU(2)$ 二重項 $X=(x_+,x_0)^T$ の電荷がそれぞれ $1,0$ で、$Q=T_3+YI$、$T_3=\operatorname{diag}(1/2,-1/2)$ とする。共通超電荷 $Y$ を上成分・下成分の両方から求め、整合性を確かめよ。

<!-- solution-start -->
**詳細解答**

[弱二重項の電荷固有値](#prop-qft35-doublet-charges)より $1=1/2+Y$ から $Y=1/2$、$0=-1/2+Y$ からも $Y=1/2$ です。二つの値が一致するので同一二重項に共通の超電荷を割り当てられます。電荷差 $1-0=1$ は $T_3$ の固有値差に等しいことも確認できます。
<!-- solution-end -->

### 演習 QFT35-A3：右巻き場の電荷

- Level: A
- 問題：右カイラルの $SU(2)$ 一重項 $u_R,d_R,e_R$ がそれぞれ超電荷 $2/3,-1/3,-1$ を持つ。電磁電荷を求め、$u_R$ と $d_R$ に三色があっても電磁電荷が三種類へ分裂しない理由を述べよ。

<!-- solution-start -->
**詳細解答**

一重項では $T_3=0$ なので、[電荷の定義](#def-qft35-hypercharge)から $Q(u_R)=2/3$、$Q(d_R)=-1/3$、$Q(e_R)=-1$ です。色の行列は電荷演算子 $YI_3$ と交換し、各色に同じ固有値を与えるので、三色は電磁電荷の三種類を表しません。
<!-- solution-end -->

### 演習 QFT35-A4：整数化されたU(1)ラベル

- Level: A
- 問題：$Q_L,L_L,e_R,H$ の超電荷がそれぞれ $1/6,-1/2,-1,1/2$ である。$q=6Y$ を計算せよ。周期 $2\pi$ の $\alpha$ による変換 $e^{iq\alpha}$ が $\alpha\mapsto\alpha+2\pi$ で変わらないことを確認せよ。

<!-- solution-start -->
**詳細解答**

順に $q=1,-3,-6,3$ です。各 $q$ は整数なので

$$
e^{iq(\alpha+2\pi)}=e^{iq\alpha}e^{2\pi iq}=e^{iq\alpha}.
$$

慣用の局所記法 $e^{iY\beta}$ と比較すると $\beta=6\alpha$ です。分数の超電荷をそのまま周期 $2\pi$ の座標に入れるとこの確認が成立しないので、正規化の選択を明示する必要があります。
<!-- solution-end -->

### 演習 QFT35-A5：局所超電荷位相

- Level: A
- 問題：実定数 $Y$ の複素場 $\phi$ に $D_\mu=\partial_\mu-ig'YB_\mu$ が作用する。$\phi'=e^{iY\beta(x)}\phi$、$B'_\mu=B_\mu+\partial_\mu\beta/g'$ とする。$D'_\mu\phi'=e^{iY\beta}D_\mu\phi$ を積の微分から求めよ。

<!-- solution-start -->
**詳細解答**

$$
\begin{aligned}
D'_\mu\phi'
&=\partial_\mu(e^{iY\beta}\phi)
-ig'Y(B_\mu+\partial_\mu\beta/g')e^{iY\beta}\phi\\
&=e^{iY\beta}\bigl[\partial_\mu\phi+iY(\partial_\mu\beta)\phi
-ig'YB_\mu\phi-iY(\partial_\mu\beta)\phi\bigr]\\
&=e^{iY\beta}(\partial_\mu-ig'YB_\mu)\phi.
\end{aligned}
$$

余分な勾配の二項は符号が逆なので相殺します。これは[積群共変性](#thm-qft35-kinetic-covariance)のAbelian部分の直接検算です。
<!-- solution-end -->

### 演習 QFT35-B1：Higgs共役二重項の規則

- Level: B
- 問題：$H=(h_1,h_2)^T$、$Y(H)=1/2$ とする。$U=\begin{pmatrix}a&b\\-b^*&a^*\end{pmatrix}\in SU(2)$、$\epsilon=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ について、(i) $\epsilon U^*=U\epsilon$ を掛け算で確認し、(ii) $\widetilde H=\epsilon H^*$ の二成分と超電荷、(iii) 二成分の電磁電荷を求めよ。

<!-- solution-start -->
**詳細解答**

(i) $\epsilon U^*=\begin{pmatrix}-b&a\\-a^*&-b^*\end{pmatrix}=U\epsilon$ です。(ii) $\widetilde H=(h_2^*,-h_1^*)^T$ で、$H'=e^{i\beta/2}UH$ より $\widetilde H'=e^{-i\beta/2}\epsilon U^*H^*=e^{-i\beta/2}U\widetilde H$。超電荷は $-1/2$ です。(iii) [電荷固有値の命題](#prop-qft35-doublet-charges)に $Y=-1/2$ を代入し、上成分 $1/2-1/2=0$、下成分 $-1/2-1/2=-1$ となります。共役後に上下を入れ替える $\epsilon$ の役割が重要です。
<!-- solution-end -->

### 演習 QFT35-B2：Yukawaを超電荷だけから仕分ける

- Level: B
- 問題：$Y(Q_L)=1/6$、$Y(L_L)=-1/2$、$Y(u_R)=2/3$、$Y(d_R)=-1/3$、$Y(e_R)=-1$、$Y(H)=1/2$、$Y(\widetilde H)=-1/2$ とする。$\overline Q_L H u_R$、$\overline Q_L \widetilde H u_R$、$\overline L_L H e_R$ の位相指数の超電荷の和をそれぞれ求め、$U(1)_Y$ に不変な項を選べ。色・弱の縮約についても述べよ。

<!-- solution-start -->
**詳細解答**

Dirac共役 $\overline Q_L,\overline L_L$ の超電荷は、それぞれ $-1/6,+1/2$ です。三項の和は順に

$$
-\frac16+\frac12+\frac23=1,\qquad
-\frac16-\frac12+\frac23=0,\qquad
+\frac12+\frac12-1=0.
$$

第一項は位相 $e^{i\beta}$ を受けるため不変ではありません。後二項は超電荷が相殺します。加えて $\overline Q_L$ は色の反基本、$u_R$ は基本なので色添字を縮約でき、$\overline Q_L$ と $\widetilde H$ は弱の双対二重項と二重項なので縮約できます。$\overline L_LH$ も同じ弱の縮約です。$U(1)$ の和だけが零でも非可換因子の縮約がなければ不十分です。
<!-- solution-end -->

### 演習 QFT35-B3：Higgs真空が残す生成子

- Level: B
- 問題：$H$ は $SU(2)$ 二重項で $Y=1/2$、$T_3=\operatorname{diag}(1/2,-1/2)$ とする。真空代表 $H_0=(0,v/\sqrt2)^T$、$v>0$ に対し、$Q=T_3+YI$ が $QH_0=0$ を満たすことを計算せよ。$T_1=\sigma^1/2$、$T_2=\sigma^2/2$ を単独で作用させるとどうなるか。これだけでゲージ場の質量固有値を得たと言えるか。

<!-- solution-start -->
**詳細解答**

$Q=\operatorname{diag}(1,0)$ なので $QH_0=(0,0)^T$。一方

$$
T_1H_0=\frac{v}{2\sqrt2}\binom10,\qquad
T_2H_0=\frac{-iv}{2\sqrt2}\binom10
$$

で零ではありません。$T_3H_0=-H_0/2$、$YH_0=+H_0/2$ の相殺だけが $Q$ に起きます。これは不変生成子の代数的判定であって、ゲージ場の質量行列はまだ $(D_\mu H)^\dagger D^\mu H$ の二次項を展開しないと得られません。
<!-- solution-end -->

### 演習 QFT35-B4：右巻き場を左巻き共役表示に直す

- Level: B
- 問題：$u_R$ が $(\mathbf3,\mathbf1)_{2/3}$ で局所変換 $u_R'=e^{2i\beta/3}U_3u_R$ を受けるとする。電荷共役した左カイラル場 $u_R^c$ は内部群に関してどのように変換するか。色・超電荷の表示を求め、$u_R^c$ を独立の追加粒子と数えてはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**

荷電共役は場の内部係数を複素共役するので、変換行列は $e^{-2i\beta/3}U_3^*$ です。従って $(\overline{\mathbf3},\mathbf1)_{-2/3}$ となります。$SU(2)$ は元から一重項で変わりません。電荷共役は同一の元の自由度に対する別記述なので、$u_R$ と $u_R^c$ を**二つの独立な新粒子種**として足すのは二重計数です。右巻きを左巻きで数える量子異常の整理などで使う記法です。
<!-- solution-end -->

### 演習 QFT35-C1：一世代のゲージ不変性の総合検算

- Level: C
- 問題：四次元で $Q_L:(\mathbf3,\mathbf2)_{1/6}$、$u_R:(\mathbf3,\mathbf1)_{2/3}$、$d_R:(\mathbf3,\mathbf1)_{-1/3}$、$L_L:(\mathbf1,\mathbf2)_{-1/2}$、$e_R:(\mathbf1,\mathbf1)_{-1}$、$H:(\mathbf1,\mathbf2)_{1/2}$ を与える。$D_\mu=\partial_\mu-ig_sG_\mu^At^A-igW_\mu^I\tau^I-ig'YB_\mu$（一重項生成子は零）を用いて、(i) $Q_L$ と $e_R$ の共変微分、(ii) 左右クォーク・レプトンの電磁電荷、(iii) $\widetilde H=i\sigma^2H^*$ の超電荷と変換、(iv) $\overline Q_LHd_R$、$\overline Q_L\widetilde H u_R$、$\overline L_LHe_R$ の三因子すべてでの不変性、(v) $H_0=(0,v/\sqrt2)^T$ が電磁電荷生成子で不変なこと、を計算せよ。最後に、何がまだ量子論の主張として未確認かを一つ挙げよ。

<!-- solution-start -->
**詳細解答**

1. $Q_L^{ai}$ は色基本・弱基本なので

   $$
   (D_\mu Q_L)^{ai}=\partial_\mu Q_L^{ai}
   -ig_sG_\mu^A(t^A)^a{}_{b}Q_L^{bi}
   -igW_\mu^I(\sigma^I/2)^i{}_{j}Q_L^{aj}
   -\frac{ig'}6B_\mu Q_L^{ai}.
   $$

   一重項の $e_R$ は $Y=-1$ のみが作用するので $D_\mu e_R=(\partial_\mu+ig'B_\mu)e_R$ です。
2. [電荷の定義](#def-qft35-hypercharge)を各場へ適用します。$Q_L$ の上・下は $1/2+1/6=2/3$、$-1/2+1/6=-1/3$、$L_L$ は $1/2-1/2=0$、$-1/2-1/2=-1$。弱一重項は $T_3=0$ なので $u_R=2/3,d_R=-1/3,e_R=-1$。色変換はこれらを変えません。
3. $\epsilon=i\sigma^2=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ から $\widetilde H=(H^{0*},-H^{+*})^T$ です。$U\in SU(2)$ に対して[共役二重項の命題](#prop-qft35-conjugate-higgs)の行列恒等式 $\epsilon U^*=U\epsilon$ を適用し、$\widetilde H'=e^{-i\beta/2}U\widetilde H$。表示は $(\mathbf1,\mathbf2)_{-1/2}$ です。
4. 第一項を $\overline Q_{L\,ai}H^i d_R^a$ と書くと、色の縮約は $(U_3^\dagger)^b{}_a(U_3)^a{}_c=\delta^b_c$、弱の縮約は $(U_2^\dagger)^j{}_i(U_2)^i{}_k=\delta^j_k$ です。超電荷和は $-1/6+1/2-1/3=0$。第二項も色・弱の縮約は同じで、$-1/6-1/2+2/3=0$。第三項は色一重項で弱の内積が残り、$+1/2+1/2-1=0$。従って各積が局所ゲージ変換で不変です。
5. $H$ の $Y=1/2$ から $Q=T_3+YI=\operatorname{diag}(1,0)$。従って $QH_0=(0,0)^T$ です。ただしゲージ場の混合・質量はこの式だけでは求まりません。

最後に、以上は**古典作用の局所不変性**の検証であり、量子カイラルゲージ理論の測度を不変に保つためのゲージ異常相殺はまだ証明していません。ループ計算や非摂動的存在も、ここからは導けません。
<!-- solution-end -->

## 8. まとめと次の問い

- 標準模型の一世代は、色・弱・超電荷の表現を割り当てることで、左右の場を取り違えずに整理できます。
- $Q=T_3+Y$ を各表示へ作用させると、クォークの分数電荷、レプトンの整数電荷、Higgsの中性成分が同じ規約から出ます。
- 三つのゲージ因子の共変微分と、$\widetilde H=i\sigma^2H^*$ を使ったYukawa結合は、行列のユニタリ縮約と超電荷の和から局所不変性を検算できます。
- 次に $H$ の中性方向の真空代表を $(D_\mu H)^\dagger D^\mu H$ へ代入すれば、電弱ゲージ場の質量行列、混合角、$W$・$Z$・光子が求まります。
