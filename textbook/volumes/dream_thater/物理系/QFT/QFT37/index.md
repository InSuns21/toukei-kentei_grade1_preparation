# QFT37 Yukawa質量行列・世代基底の回転とCKM混合

[QFT35のYukawa結合](../QFT35/index.md#def-qft35-higgs-yukawa)は、左カイラルと右カイラルの場をHiggs二重項で結ぶ、ゲージ対称性が許す相互作用でした。[QFT36の電弱質量行列](../QFT36/index.md#thm-qft36-mass-matrix)ではHiggsの真空代表を代入し、$W$・$Z$・光子の質量を求めました。しかし、三世代のクォークの「どれとどれが結合するか」は、まだ決めていません。

質量を測るときは粒子の質量が対角になる基底を使います。他方、弱相互作用は同じ左二重項の上成分と下成分を結びます。**質量を対角にする二つの回転が一致するとは限らない**ため、荷電弱電流に相対回転が残ります。これがCKM混合の出発点です。

時空は $3+1$ 次元Minkowski空間、$\eta=\operatorname{diag}(-1,1,1,1)$、$\hbar=c=1$ とします。世代添字 $i,j=1,2,3$、色添字 $a=1,2,3$ を用い、世代を区別しないゲージ結合 $g_s,g,g'>0$、真空代表 $v>0$ とします。

最小標準模型の荷電フェルミオンと、**質量項・Yukawa相互作用・木レベルの電流**を扱います。右巻きニュートリノやニュートリノ質量項は加えません。行列の複素共役転置を $\dagger$、Dirac共役を上線で表します。Dirac共役は[QFT7の $H=-i\gamma^0$](../QFT7/index.md#def-qft7-adjoint-action)を用います。ゲージ電流の双線形には物理的な実電流を作る $-i$ が掛かりますが、スカラーYukawa質量項には掛かりません。

## 1. 世代をまたぐYukawa結合から質量行列へ

世代ごとに[同じゲージ表現](../QFT35/index.md#def-qft35-representation)が反復されます。左クォーク二重項 $Q_L^i=(u_L^i,d_L^i)^T$、左レプトン二重項 $L_L^i=(\nu_L^i,e_L^i)^T$ と、右一重項 $u_R^j,d_R^j,e_R^j$ を取ります。上・下の二重項成分はそれぞれWeyl成分であり、右一重項は別のカイラル場です。

一世代のYukawa係数を世代番号つきの複素数 $(Y_f)_{ij}$ に置き換えます。$f=u,d,e$ は上型・下型・荷電レプトンの種類です。これは右カイラル場の世代列から左カイラル場の世代列への係数写像であり、$(Y_f f_R)_i=\sum_j(Y_f)_{ij}(f_R)_j$ と成分表示します。弱二重項の二成分や色三成分に作用する行列ではありません。

<a id="def-qft37-yukawa-matrices"></a>

<!-- formal-statement-start -->
> **定義（三世代Yukawa行列と質量行列）**
> 三世代の場 $Q_L^i,u_R^j,d_R^j,L_L^i,e_R^j$ を最小標準模型の表現に置き、$H$ と $\widetilde H=i\sigma^2H^*$ を[QFT35の共役二重項](../QFT35/index.md#def-qft35-higgs-yukawa)とする。任意の複素 $3\times3$ 行列 $Y_u,Y_d,Y_e$ に対し

$$
\mathcal L_Y=-\sum_{i,j=1}^3\left[
 (Y_d)_{ij}\overline Q_L^{\,i}H d_R^j+
 (Y_u)_{ij}\overline Q_L^{\,i}\widetilde H u_R^j+
 (Y_e)_{ij}\overline L_L^{\,i}H e_R^j
\right]+\mathrm{h.c.}
$$

> を三世代Yukawa相互作用という。各クォーク項の色添字は同じ色で縮約する。$H_0=(0,v/\sqrt2)^T$ を真空代表とするとき、対応する世代質量行列を $M_f=vY_f/\sqrt2$ と定義する。$M_f$ は一般にHermitian行列ではなく、対角とも限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft37-yukawa-matrices -->
### 例：世代を混ぜてもゲージ電荷は変わらない

**定義の確認**：$Y_d$ の $(1,2)$ 成分だけを $\lambda\in\mathbb C$ としても、項 $\lambda\overline Q_L^{\,1}H d_R^2$ は許されます。[QFT35のYukawa不変性](../QFT35/index.md#thm-qft35-yukawa-invariance)をこの $(i,j)=(1,2)$ に適用すると、超電荷は $-1/6+1/2-1/3=0$、色は $\overline{\mathbf3}\otimes\mathbf3$、弱は $\overline{\mathbf2}\otimes\mathbf2$ で縮約されます。世代添字は内部ゲージ群で変換されないので、世代が違ってもこの計算は同じです。

例えば二世代だけを抜き出した $Y_d=\begin{pmatrix}a&\lambda\\0&b\end{pmatrix}$ は $a,b,\lambda$ が複素数でも許されます。ただし $\lambda\ne0$ のとき、一般にはこの表示のままでは質量固有状態になりません。ゲージ不変性は世代行列の対角性を要求していません。
<!-- definition-example-end -->

Higgsを真空のまわりで $H=(0,(v+h)/\sqrt2)^T$ と局所的に表示し、$h$ を実の動径揺らぎとします。ここでは物理Higgsとフェルミオンの木レベル結合だけを抽出します。角度方向の扱いとゲージ固定の条件は[QFT34のHiggs機構](../QFT34/index.md#thm-qft34-unitary-proca)に従います。

<a id="thm-qft37-yukawa-mass"></a>

<!-- formal-statement-start -->
> **定理（Higgs真空とYukawa質量の対応）**
> 定義の三世代Yukawa相互作用で $v>0$、$H=(0,(v+h)/\sqrt2)^T$ とし、$\widetilde H=i\sigma^2H^*$ を取る。$f=u,d,e$ について、左・右世代列ベクトル $f_L,f_R$ で書くと、

$$
\mathcal L_Y=-\sum_{f=u,d,e}\left(
\overline f_LM_ff_R+\overline f_RM_f^\dagger f_L
\right)
-\frac{h}{v}\sum_{f=u,d,e}\left(
\overline f_LM_ff_R+\overline f_RM_f^\dagger f_L
\right),\qquad M_f=\frac v{\sqrt2}Y_f.
$$

> ここでは色添字は暗黙に縮約し、ニュートリノ質量項は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

まず二重項の上下成分を直接代入し、上型・下型で別のHiggs成分を選ぶことを確かめます。次にHermitian共役が左右を交換し、質量項を実のラグランジアンにすることを見ます。

<!-- proof-start -->
### 証明

実の $v+h$ に対し、$\sigma^2$ の成分から

$$
H=\frac{v+h}{\sqrt2}\binom01,\qquad
\widetilde H=\frac{v+h}{\sqrt2}\binom10.
$$

ゆえに弱添字の縮約を展開すると

$$
\overline Q_L^{\,i}H d_R^j
=\frac{v+h}{\sqrt2}\overline d_L^{\,i}d_R^j,\qquad
\overline Q_L^{\,i}\widetilde H u_R^j
=\frac{v+h}{\sqrt2}\overline u_L^{\,i}u_R^j.
$$

レプトン項は $(v+h)\overline e_L^{\,i}e_R^j/\sqrt2$ です。世代の和を行列積 $\overline f_LY_ff_R=\sum_{ij}\overline f_L^i(Y_f)_{ij}f_R^j$ にまとめ、$\overline f_LY_ff_R$ のHermitian共役が $\overline f_RY_f^\dagger f_L$ であることを使うと

$$
\mathcal L_Y=-\frac{v+h}{\sqrt2}
\sum_{f=u,d,e}(\overline f_LY_ff_R+\overline f_RY_f^\dagger f_L).
$$

$v+h=v(1+h/v)$ を代入し $M_f=vY_f/\sqrt2$ と置けば結論です。最初の項は質量、$h/v$ を含む項は同じ行列に比例するHiggs結合です。
<!-- proof-end -->

この比例性は後に重要になります。**一つのHiggs二重項**の同じYukawa行列から質量とHiggs結合が生じるので、質量を対角化するとHiggs結合も対角化されます。

## 2. 質量固有基底とCKM行列

一般の複素 $M_f$ に対して $M_f^\dagger M_f$ はHermitian半正定値ですが、$M_f$ 自身はそうとは限りません。したがって一つの相似変換で対角化するのでなく、**入力側の右場と出力側の左場に別々のユニタリ行列**を使います。これは[LA6の複素特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)の適用です。

<a id="def-qft37-mass-basis"></a>

<!-- formal-statement-start -->
> **定義（質量固有基底と左右回転）**
> $M_f\in\mathbb C^{3\times3}$ に対し、ユニタリ行列 $U_L^f,U_R^f$ と非負実対角行列 $D_f=\operatorname{diag}(m_{f1},m_{f2},m_{f3})$ を選び、

$$
(U_L^f)^\dagger M_f U_R^f=D_f,\qquad
f_L^{\,g}=U_L^ff_L^{\,m},\quad f_R^{\,g}=U_R^ff_R^{\,m}
$$

> と書く。上付き $g$ は元のゲージ表現で指定した世代基底、$m$ は質量固有基底を意味する。$m_{fk}\ge0$ は質量行列の特異値である。零質量や縮退があると、質量固有基底の選択には追加の自由がある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft37-mass-basis -->
### 例：二世代の質量行列を実際に分解する

**定義の確認**：二世代で正数 $a,b$ と実角 $\theta$ を選び

$$
R(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta\end{pmatrix},\qquad
M=R(\theta)\begin{pmatrix}a&0\\0&b\end{pmatrix}
$$

とします。$R^TR=I$、$\det R=1$ なので $U_L=R$、$U_R=I$ はユニタリです。行列を掛け戻すと

$$
U_L^\dagger MU_R
=R^TR\operatorname{diag}(a,b)
=\operatorname{diag}(a,b).
$$

したがって定義の非負対角性、左右のユニタリ性、元の質量行列への再構成をすべて確認できます。$a=b$ の場合は左右同時の追加回転でも対角のままであり、固有基底は一意ではありません。
<!-- definition-example-end -->

零質量の自由度は、正の縮退質量の場合と区別できます。二世代で $D=\operatorname{diag}(a,0)$（$a>0$）がすでに質量行列だとすると、任意の実数 $\phi,\psi$ に対して

$$
U_L=\operatorname{diag}(1,e^{i\phi}),\qquad
U_R=\operatorname{diag}(1,e^{i\psi}),\qquad
U_L^\dagger D U_R=D
$$

です。零成分には $e^{-i\phi}0e^{i\psi}=0$ しか現れず、左右の位相は独立です。一方、正の縮退質量 $D=aI_2$ を保つには、$U_L^\dagger D U_R=aU_L^\dagger U_R=D$ から $U_R=U_L$ が必要です。前者は零質量の左右を別々に取り直せる自由度、後者は同じ質量を持つ場を左右同時に回す自由度です。

質量対角化の実際の意味は

$$
\overline f_L^{\,g}M_ff_R^{\,g}
=\overline f_L^{\,m}(U_L^f)^\dagger M_fU_R^ff_R^{\,m}
=\sum_k m_{fk}\overline f_{Lk}^{\,m}f_{Rk}^{\,m}
$$

です。右・左の両方を回転するのに対し、[QFT36の荷電電流](../QFT36/index.md#thm-qft36-fermion-couplings)は左二重項の上成分と下成分だけを結んでいます。

<a id="def-qft37-ckm"></a>

<!-- formal-statement-start -->
> **定義（CKM行列）**
> 三世代の上型と下型クォーク質量行列 $M_u,M_d$ の左ユニタリ回転を $U_L^u,U_L^d$ とする。質量固有基底の間の相対回転

$$
V_{\mathrm{CKM}}=(U_L^u)^\dagger U_L^d
$$

> をCKM行列と呼ぶ。行・列はそれぞれ上型質量固有場 $(u,c,t)$ と下型質量固有場 $(d,s,b)$ の順とする。質量の縮退や零質量によって基底の選択が非一意な場合は、行列要素単独の物理的同定に注意する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft37-ckm -->
### 例：同じ回転なら混合は残らない

**定義の確認**：$U_L^u=U_L^d=R$ とし $R^\dagger R=I$ なら $V_{\mathrm{CKM}}=I$ です。上型と下型のどちらの質量行列がもとのゲージ基底で非対角であっても、左右の質量固有基底が同じ方向へ回っていれば相対回転は消えます。二世代で $U_L^u=I,U_L^d=R(\theta)$ なら $V=R(\theta)$ となり、一般に非対角です。どちらも定義にある二つのユニタリ行列の積を直接計算した例です。
<!-- definition-example-end -->

<a id="thm-qft37-ckm-current"></a>

<!-- formal-statement-start -->
> **定理（質量対角化とCKM荷電電流）**
> 三世代の最小標準模型で、クォークの正準規格化された運動項と質量行列 $M_u,M_d$ があり、電弱荷電電流のゲージ基底表示が

$$
\mathcal L_{\mathrm{cc}}=-\frac{ig}{\sqrt2}W_\mu^+
\sum_{i=1}^3\overline u_{L}^{\,g,i}\gamma^\mu d_{L}^{\,g,i}
+\mathrm{h.c.}
$$

> であるとする。左右の質量対角化後、

$$
\mathcal L_{\mathrm{cc}}=-\frac{ig}{\sqrt2}W_\mu^+
\sum_{\alpha,\beta=1}^3\overline u_{L}^{\,m,\alpha}
\gamma^\mu (V_{\mathrm{CKM}})_{\alpha\beta}d_{L}^{\,m,\beta}
+\mathrm{h.c.},\qquad
V_{\mathrm{CKM}}^\dagger V_{\mathrm{CKM}}=I.
$$

> すなわち荷電電流に二つの左回転の相対差だけが残る。
<!-- formal-statement-end -->

### 証明の見取り図

上型と下型へ異なる左回転を代入し、世代添字を一つずつ縮約します。右場の回転はそもそも左荷電電流に現れません。最後にユニタリ性を両回転の積から確かめます。

<!-- proof-start -->
### 証明

[QFT36の電弱フェルミオン結合](../QFT36/index.md#thm-qft36-fermion-couplings)で弱二重項の昇降行列要素は1ですから、ゲージ基底では上記の $\delta_{ij}$ が世代の収縮を担います。その相互作用の係数 $-ig/\sqrt2$ は、$(-+++)$ のDirac電流 $-i\bar\psi\gamma^\mu\psi$ に由来し、$g$ 自身を虚数にしたのではありません。$\mathrm{h.c.}$ は $W^+$ 項全体のHermitian共役であり、ガンマ行列単独の共役と混同しません。質量基底への置換は

$$
u_L^{\,g,i}=(U_L^u)_{i\alpha}u_L^{\,m,\alpha},
\qquad
d_L^{\,g,i}=(U_L^d)_{i\beta}d_L^{\,m,\beta}.
$$

Dirac共役側の係数は複素共役となり、

$$
\begin{aligned}
\sum_i\overline u_L^{\,g,i}\gamma^\mu d_L^{\,g,i}
&=\sum_{i,\alpha,\beta}
\overline u_L^{\,m,\alpha}(U_L^u)^*_{i\alpha}
\gamma^\mu(U_L^d)_{i\beta}d_L^{\,m,\beta}\\
&=\sum_{\alpha,\beta}\overline u_L^{\,m,\alpha}\gamma^\mu
\big[(U_L^u)^\dagger U_L^d\big]_{\alpha\beta}
d_L^{\,m,\beta}.
\end{aligned}
$$

これが定義の $V$ です。さらに $U_L^u(U_L^u)^\dagger=I$ を中間に挿入すると

$$
V^\dagger V=(U_L^d)^\dagger U_L^u
(U_L^u)^\dagger U_L^d=(U_L^d)^\dagger U_L^d=I.
$$

逆順の $VV^\dagger=I$ も同じ積で確かめられます。証明は木レベルの正準運動項と三世代だけのユニタリ回転に依拠します。
<!-- proof-end -->

**重要な区別。** 真空に入る前の一つの弱二重項 $Q_L$ 全体へ勝手に別々の世代回転をかければ、荷電電流の形が変わります。質量固有基底は自発的対称性の破れの後に上型・下型を別々に識別した記述です。CKMは弱相互作用そのものの破綻ではなく、**二つの相互作用を同時に対角化できない**という事実を記録しています。

## 3. なぜ中性電流には同じ混合が現れないのか

光子と $Z$ は同じ電荷・弱表現に属する三世代を等しく結合します。たとえば上型左場の $T_3=1/2,Q=2/3$、下型左場の $T_3=-1/2,Q=-1/3$ は世代によらず同じです。したがって世代空間での結合行列は各粒子種ごとに恒等行列の定数倍です。

<a id="thm-qft37-neutral-diagonal"></a>

<!-- formal-statement-start -->
> **定理（中性電流とHiggs結合の世代対角性）**
> 最小標準模型の三世代で、同じ粒子種のゲージ結合が世代に依存せず、正準運動項を持ち、Higgs二重項が一つで質量がそのYukawa行列から生じるとする。質量固有基底では光子・$Z$ の木レベル中性電流、および動径Higgsの荷電フェルミオン結合は世代対角である。後者の結合行列は $D_f/v$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

中性ゲージ電流は左・右それぞれの世代空間で恒等行列なのでユニタリ共役を受けても変化しません。Higgsの結合は質量行列自身に比例するので、左右の同じ対角化で対角になります。

<!-- proof-start -->
### 証明

[QFT36の電弱中性電流](../QFT36/index.md#thm-qft36-fermion-couplings)は、各カイラルな粒子種 $f_X$（$X=L,R$）について光子係数 $eQ_{f_X}$、$Z$ 係数 $(g/c_W)(T_{3,f_X}-s_W^2Q_{f_X})$ です。固定した種とカイラリティでこれらは世代 $i$ に依存しない実定数 $c_{f_X}$ です。例えば

$$
c_{u_L}^Z=\frac g{c_W}\left(\frac12-\frac23s_W^2\right),
\qquad
c_{u_R}^Z=-\frac g{c_W}\frac23s_W^2.
$$

質量回転を適用すると

$$
\overline f_X^{\,g}\gamma^\mu(c_{f_X}I)f_X^{\,g}
=\overline f_X^{\,m}\gamma^\mu
(U_X^f)^\dagger(c_{f_X}I)U_X^f f_X^{\,m}
=c_{f_X}\overline f_X^{\,m}\gamma^\mu f_X^{\,m}.
$$

ゆえに異なる世代 $i\ne j$ を結ぶ項はありません。一方、[Higgs真空とYukawa質量の対応](#thm-qft37-yukawa-mass)の $h$ 項には $M_f/v$ があるので、[質量固有基底](#def-qft37-mass-basis)を代入して

$$
\mathcal L_{hff}=-\frac hv\sum_f
\big(\overline f_L^{\,m}D_ff_R^{\,m}
+\overline f_R^{\,m}D_ff_L^{\,m}\big)
=-\sum_{f,k}\frac{m_{fk}}v h\,\overline f_k^{\,m}f_k^{\,m}.
$$

ここでは左右の和が通常のDirac双線形 $\overline f_kf_k$ です。よってHiggs結合も世代対角です。
<!-- proof-end -->

**仮定を失う反例。** 独立な第二スカラー二重項から別のYukawa行列 $N_d$ が生じ、第一の行列 $M_d=\operatorname{diag}(a,b)$（$a\ne b>0$）と同時対角化できないとします。質量基底で例えば

$$
N_d=\begin{pmatrix}0&\lambda\\0&0\end{pmatrix},\qquad\lambda\ne0
$$

なら追加スカラーの $\overline d_{L1}d_{R2}$ 結合が残ります。壊れたのは「Higgsの結合行列が質量行列に比例する」という証明中の段階です。したがって木レベルの世代非対角Higgs結合がないという結論は、一つの二重項の最小模型のもとでの主張です。ループ補正や別の粒子を加えた模型への無条件な外挿でもありません。

## 4. 再位相付けと三世代のCP位相

ここで $C$ は粒子と反粒子を交換する**荷電共役**、$P$ は空間座標を $(t,\boldsymbol x)\mapsto(t,-\boldsymbol x)$ と反転する操作で、両者の合成を $CP$ と呼びます。荷電弱電流のCKM係数は、$CP$ で複素共役 $V_{\alpha\beta}^*$ に対応します（場の位相選択を除く）。正で非縮退な質量を仮定したCKM部門では、場の位相を選んで $V$ を実行列にできるかが、$CP$ 保存を調べる基準になります。

質量固有状態の各場は、正の質量項を変えずに左・右の両方へ同一の複素数 $e^{i\chi}$（$|e^{i\chi}|=1$）を掛け替えられます。この操作を再位相付けと呼びます。$u_\alpha^{\,m}\mapsto e^{i\phi_\alpha}u_\alpha^{\,m}$、$d_\beta^{\,m}\mapsto e^{i\psi_\beta}d_\beta^{\,m}$ とすると、$\overline u_\alpha d_\beta$ の位相因子は $e^{-i\phi_\alpha+i\psi_\beta}$ なので、同じラグランジアンを新しい場で書くCKM係数は

$$
V_{\alpha\beta}\mapsto
e^{i\phi_\alpha}V_{\alpha\beta}e^{-i\psi_\beta}.
$$

全六種に共通の位相は $V$ を変えないので、独立に取り除ける位相は最大5個です。質量が非縮退かつ正ならこれ以外の連続的な基底混合はありません。

<a id="prop-qft37-parameter-count"></a>

<!-- formal-statement-start -->
> **命題（三世代CKMの物理パラメータ数）**
> 三世代の上型・下型クォークの質量が各電荷部門内で正かつ相異なり、標準模型の荷電弱相互作用以外に世代混合を生む相互作用を加えないとする。$3\times3$ ユニタリCKM行列は、質量固有場の再位相付けで同一視すると一般に実パラメータ4個で記述できる。そのうち3個は混合角、1個は複素位相である。二世代では角1個だけで、再位相で消えない複素位相はない。
<!-- formal-statement-end -->

### 証明の見取り図

ユニタリ行列の実次元を数え、左右のクォーク場の再位相の自由度を引きます。一般の $n$ 世代の角と位相の内訳も、直交行列部分の角の数と比較します。

<!-- proof-start -->
### 証明

複素 $n\times n$ 行列には実変数が $2n^2$ 個あります。$V^\dagger V=I$ はHermitian行列の等式なので、対角の実条件 $n$ 個と非対角の複素条件 $n(n-1)/2$ 組、計 $n+2\cdot n(n-1)/2=n^2$ 個の独立実条件を課します。従って $U(n)$ の実次元は $n^2$ です。

正で互いに異なる質量を持つ各Dirac場には共通左右位相の再定義が一つずつあります。上型 $n$、下型 $n$ の計 $2n$ 個のうち全場共通の位相は $V$ に作用しません。一般の混合行列に残る実次元は

$$
n^2-(2n-1)=(n-1)^2.
$$

実直交回転の次元は $n(n-1)/2$ なので、残る複素位相の数は

$$
(n-1)^2-\frac{n(n-1)}2
=\frac{(n-1)(n-2)}2.
$$

$n=3$ では $4=3+1$、$n=2$ では $1=1+0$ です。これは一般位置での計数であり、零混合角などの特殊点では位相の見え方が退化します。
<!-- proof-end -->

CP変換のもとで、適切な場の位相規約を選べばすべてのCKM係数を実にできる場合、CKMが担う複素位相はCP非保存をもたらしません。どの行・列の場にどの位相を付けたかに依存しない判定量が必要です。

<a id="def-qft37-rephasing-quartet"></a>

<!-- formal-statement-start -->
> **定義（CKMの再位相不変四重積）**
> ユニタリ行列 $V\in U(3)$ の異なる行 $\alpha\ne\gamma$、異なる列 $\beta\ne\delta$ に対し

$$
J_{\alpha\gamma;\beta\delta}
=\operatorname{Im}\!\left(
V_{\alpha\beta}V_{\gamma\delta}
V_{\alpha\delta}^*V_{\gamma\beta}^*
\right)
$$

> を再位相不変四重積の虚部という。$\operatorname{Im}$ は複素数の虚部である。添字の並べ替えで符号は変わり得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft37-rephasing-quartet -->
### 例：離散Fourier型の三世代行列

**定義の確認**：$\omega=e^{2\pi i/3}$ は $1+\omega+\omega^2=0$、$|\omega|=1$ を満たします。

$$
F=\frac1{\sqrt3}\begin{pmatrix}
1&1&1\\1&\omega&\omega^2\\1&\omega^2&\omega
\end{pmatrix}.
$$

各列の長さは1で、異なる列の内積は $(1+\omega+\omega^2)/3=0$ なので $F^\dagger F=I$。定義の $\alpha=1,\gamma=2,\beta=1,\delta=2$ を選ぶと

$$
J_{12;12}=\operatorname{Im}
\left(\frac1{\sqrt3}\frac\omega{\sqrt3}
\frac1{\sqrt3}\frac1{\sqrt3}\right)
=\frac{\operatorname{Im}\omega}{9}
=\frac{\sqrt3}{18}\ne0.
$$

ユニタリ性と虚部の非零を直接確かめました。この行列は数学的な検算例であり、実験値を表すものではありません。
<!-- definition-example-end -->

<a id="prop-qft37-cp-quartet"></a>

<!-- formal-statement-start -->
> **命題（再位相不変四重積とCP位相）**
> 三世代の正で非縮退なクォーク質量、正準運動項、ユニタリなCKM行列 $V$ を仮定する。上記の四重積の虚部は質量固有場の再位相付けで不変である。いずれかの $J_{\alpha\gamma;\beta\delta}\ne0$ なら、再位相付けによってすべてのCKM成分を実数にすることはできず、標準模型のCKM相互作用にはCPを破る位相がある。
<!-- formal-statement-end -->

### 証明の見取り図

四つの行列要素の行・列の位相を掛け合わせます。全部が相殺される一方、実行列なら虚部は零なので対偶を使えます。

<!-- proof-start -->
### 証明

行・列の再位相で四重積に掛かる因子は

$$
\begin{aligned}
&e^{i\phi_\alpha-i\psi_\beta}
 e^{i\phi_\gamma-i\psi_\delta}
 e^{-i\phi_\alpha+i\psi_\delta}
 e^{-i\phi_\gamma+i\psi_\beta}\\
&=e^{i(\phi_\alpha+\phi_\gamma-\phi_\alpha-\phi_\gamma
-\psi_\beta-\psi_\delta+\psi_\delta+\psi_\beta)}=1.
\end{aligned}
$$

従って積とその虚部は不変です。ある再位相付けで $V$ のすべての成分が実になれば四つの実数の積も実であるため、すべての $J$ が零です。対偶を取れば一つでも非零の $J$ がある場合は全成分を実にはできません。質量非縮退の仮定により追加の世代回転による再定義も許されず、CP位相を物理的に識別できます。
<!-- proof-end -->

## 5. 最小模型のレプトンと適用範囲

荷電レプトンにも $M_e$ があり、左右回転で対角化します。しかし今の模型ではニュートリノに質量項がありません。したがって三つの質量零ニュートリノの世代基底は任意のユニタリ回転で取り直せます。

ゲージ基底の $\overline\nu_L^{\,g}\gamma^\mu e_L^{\,g}W_\mu^+$ に $e_L^{\,g}=U_L^e e_L^{\,m}$ を代入し、同時に $\nu_L^{\,g}=U_L^e\nu_L^{\,m}$ と定めれば、係数は $(U_L^e)^\dagger U_L^e=I$ になります。ニュートリノに独立の質量行列がないので、この回転はニュートリノ質量項を非対角にしません。**CKMに対応する物理的なレプトン混合行列は、この最小模型からは現れません。** ニュートリノ質量とその混合を導入するなら、質量項の種類と追加の場を先に指定する必要があります。

本章の結論は、木レベル、正準運動項、一つのHiggs二重項、同じゲージ表現を反復する三世代という仮定に依拠します。CKMの数値や質量の値を理論から予言したわけではなく、量子ループのくりこみ、弱崩壊の観測量、ニュートリノ質量、QCDの非摂動的強結合もここでは計算していません。

## 6. 演習：質量対角化から物理的混合へ

### 演習 QFT37-A1：真空代入の係数

- Level: A
- 問題：二世代Yukawa行列とHiggs場を

$$
Y_d=\begin{pmatrix}a&b\\c&d\end{pmatrix},\qquad
H=\frac{v+h}{\sqrt2}\binom01
$$

とする。$d_L^i,d_R^j$ に対する質量項と $h$ 結合の行列をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**：[Higgs真空の代入](#thm-qft37-yukawa-mass)で $\overline Q_L^iHd_R^j=(v+h)\overline d_L^id_R^j/\sqrt2$ です。よって

$$
M_d=\frac v{\sqrt2}\begin{pmatrix}a&b\\c&d\end{pmatrix},\qquad
G_h=\frac1{\sqrt2}\begin{pmatrix}a&b\\c&d\end{pmatrix}
=\frac{M_d}{v}.
$$

ラグランジアンは $-\overline d_LM_dd_R-h\overline d_LG_hd_R+\mathrm{h.c.}$ です。$b,c$ を零と仮定しない限り元の世代基底では両方が非対角ですが、同じ左右回転で対角化されます。
<!-- solution-end -->

### 演習 QFT37-A2：二世代の特異値分解

- Level: A
- 問題：次の二世代質量行列と左右回転を考える。

$$
M=\begin{pmatrix}3/5&-8/5\\4/5&6/5\end{pmatrix},\qquad
U_L=\begin{pmatrix}3/5&-4/5\\4/5&3/5\end{pmatrix},\qquad U_R=I.
$$

質量固有値が $1,2$ となることを確かめよ。

<!-- solution-start -->
**詳細解答**：$U_L^TU_L=I$ は各列の長さ $(9+16)/25=1$ と内積 $-12/25+12/25=0$ から確認できます。[質量固有基底の定義](#def-qft37-mass-basis)で

$$
U_L^TM=\begin{pmatrix}3/5&4/5\\-4/5&3/5\end{pmatrix}
\begin{pmatrix}3/5&-8/5\\4/5&6/5\end{pmatrix}
=\begin{pmatrix}1&0\\0&2\end{pmatrix}.
$$

対角成分が非負で、左右が直交（ユニタリ）なので特異値は $1,2$ です。$M^TM=\operatorname{diag}(1,4)$ としても検算できます。
<!-- solution-end -->

### 演習 QFT37-A3：CKMのユニタリ性

- Level: A
- 問題：$U_L^u,U_L^d$ がそれぞれユニタリなら $V=(U_L^u)^\dagger U_L^d$ の列は互いに正規直交であることを成分表示で示せ。

<!-- solution-start -->
**詳細解答**：[CKM行列](#def-qft37-ckm)の定義から

$$
\sum_\alpha V_{\alpha\beta}^*V_{\alpha\delta}
=(V^\dagger V)_{\beta\delta}
=\big[(U_L^d)^\dagger U_L^u(U_L^u)^\dagger U_L^d\big]_{\beta\delta}
=\delta_{\beta\delta}.
$$

途中で $U_L^u(U_L^u)^\dagger=I$、最後に $(U_L^d)^\dagger U_L^d=I$ を使いました。$\beta=\delta$ で長さ1、異なる場合に直交です。
<!-- solution-end -->

### 演習 QFT37-A4：中性電流の回転

- Level: A
- 問題：二世代の世代一様な中性結合 $cI_2$ と任意のユニタリ $U$ に対し、質量基底の結合を計算せよ。$c_1\ne c_2$ の対角行列に対しても必ず同じ結論となるか。

<!-- solution-start -->
**詳細解答**：[中性電流の世代対角性](#thm-qft37-neutral-diagonal)の計算を繰り返すと

$$
U^\dagger(cI_2)U=cU^\dagger U=cI_2.
$$

一方、$U=R(\theta)$、$C=\operatorname{diag}(c_1,c_2)$ とすれば非対角成分は

$$
(U^TCU)_{12}=(c_2-c_1)\sin\theta\cos\theta.
$$

$c_1\ne c_2$ かつ一般の角では非零です。世代一様性を失うと、ユニタリ回転だけでは非対角結合を排除できません。
<!-- solution-end -->

### 演習 QFT37-A5：Higgs結合と質量

- Level: A
- 問題：$D_e=\operatorname{diag}(m_e,m_\mu,m_\tau)$ を正の荷電レプトン質量行列とする。動径Higgs $h$ に対する各世代の結合係数と、$e$ と $\mu$ を結ぶ木レベル結合を求めよ。

<!-- solution-start -->
**詳細解答**：[Higgs結合の世代対角性](#thm-qft37-neutral-diagonal)から $h$ の行列は $D_e/v$ です。従って

$$
\mathcal L_{hee}=-\frac hv
(m_e\overline ee+m_\mu\overline\mu\mu+m_\tau\overline\tau\tau).
$$

対角行列の $(1,2)$ と $(2,1)$ 成分はともに零なので、$h\overline e\mu$ と $h\overline\mu e$ の係数は零です。この結論は一つのHiggs二重項から質量が出るという仮定を使います。
<!-- solution-end -->

### 演習 QFT37-B1：二つの回転角の差

- Level: B
- 問題：二世代で $M_u=R(\alpha)\operatorname{diag}(a,b)$、$M_d=R(\beta)\operatorname{diag}(c,d)$、$a,b,c,d>0$ とし、右回転はともに $I$ とする。CKM行列と混合が消える条件を導け。

<!-- solution-start -->
**詳細解答**：各行列は $R(\theta)^TR(\theta)=I$ なので、[質量固有基底](#def-qft37-mass-basis)は $U_L^u=R(\alpha)$、$U_L^d=R(\beta)$ です。[CKM行列](#def-qft37-ckm)の定義から

$$
\begin{aligned}
V&=R(\alpha)^TR(\beta)\\
&=\begin{pmatrix}
\cos\alpha\cos\beta+\sin\alpha\sin\beta&
-\cos\alpha\sin\beta+\sin\alpha\cos\beta\\
-\sin\alpha\cos\beta+\cos\alpha\sin\beta&
\sin\alpha\sin\beta+\cos\alpha\cos\beta
\end{pmatrix}\\
&=R(\beta-\alpha).
\end{aligned}
$$

非対角要素は $\sin(\beta-\alpha)$ の符号付き値なので、世代の交換や場の符号の取り替えを除けば混合が消えるのは $\beta-\alpha$ が $\pi$ の整数倍のときです。絶対的な回転角ではなく相対角が物理的に残ります。
<!-- solution-end -->

### 演習 QFT37-B2：三世代と二世代の位相数

- Level: B
- 問題：一般の $n$ 世代でCKMの実次元が $n^2$、再位相の有効自由度が $2n-1$ であるとして、$n=2,3$ の物理パラメータ数とCP位相数を求めよ。共通の位相を二度引いてはいけない理由も述べよ。

<!-- solution-start -->
**詳細解答**：[三世代のパラメータ数](#prop-qft37-parameter-count)の導出を $n$ に戻すと

$$
N_{\mathrm{total}}=n^2-(2n-1)=(n-1)^2,\qquad
N_{\mathrm{phase}}=\frac{(n-1)(n-2)}2.
$$

$n=2$ なら全体1、位相0、角1。$n=3$ なら全体4、位相1、角3です。上型・下型の全 $2n$ 場に共通の位相を掛けると、$V_{\alpha\beta}\mapsto e^{i\chi}V_{\alpha\beta}e^{-i\chi}=V_{\alpha\beta}$ で行列が変わらないため、有効な再位相の次元は $2n-1$ だけです。すでに作用しない共通位相をさらに引くと自由度を過小評価します。
<!-- solution-end -->

### 演習 QFT37-B3：第二のYukawa行列はなぜ危険か

- Level: B
- 問題：二世代の質量基底で $M=\operatorname{diag}(m_1,m_2)$、$m_1\ne m_2>0$ とし、別のスカラーに結合する行列を

$$
N=\begin{pmatrix}0&\lambda\\0&0\end{pmatrix},\qquad\lambda\ne0
$$

とする。結合のどの成分が世代を変えるか示し、$N\propto M$ の場合と比べよ。

<!-- solution-start -->
**詳細解答**：追加スカラー $s$ の項を $-s(\overline f_LNf_R+\overline f_RN^\dagger f_L)$ と書きます。成分を展開すると

$$
-s\left(\lambda\overline f_{L1}f_{R2}
+\lambda^*\overline f_{R2}f_{L1}\right)
$$

です。第1世代と第2世代を結ぶ成分が非零なので世代非対角です。$N=\kappa M$ なら $N=\operatorname{diag}(\kappa m_1,\kappa m_2)$ となり、同じ展開の非対角成分が零です。[最小模型でのHiggs整列](#thm-qft37-neutral-diagonal)の証明はまさにこの比例性を使い、独立な $N$ では成立しません。
<!-- solution-end -->

### 演習 QFT37-B4：質量零ニュートリノの回転

- Level: B
- 問題：三世代の荷電レプトン質量行列を $U_L^e,U_R^e$ で対角化した。ニュートリノには質量項がないとき、弱荷電電流が世代対角になるニュートリノ基底を構成せよ。なぜこの議論を質量のあるニュートリノへそのまま移せないか。

<!-- solution-start -->
**詳細解答**：ゲージ基底の電流は $\overline\nu_L^{\,g}\gamma^\mu e_L^{\,g}$ です。$e_L^{\,g}=U_L^e e_L^{\,m}$ に合わせ、$\nu_L^{\,g}=U_L^e\nu_L^{\,m}$ と選ぶと

$$
\overline\nu_L^{\,g}\gamma^\mu e_L^{\,g}
=\overline\nu_L^{\,m}\gamma^\mu
(U_L^e)^\dagger U_L^e e_L^{\,m}
=\overline\nu_L^{\,m}\gamma^\mu e_L^{\,m}.
$$

ニュートリノ質量項が零なので、選んだ回転で非対角の質量項は現れません。非零のニュートリノ質量がある場合は、その質量行列を対角にする左回転も拘束され、荷電レプトンの左回転と一致するとは限りません。質量項の型も指定せずに「混合はない」とは結論できません。
<!-- solution-end -->

### 演習 QFT37-C1：三世代の質量・混合・CPを同時に検算する

- Level: C
- 問題：$v>0$、三つずつ相異なる正質量を対角に並べた $D_u,D_d$、$\omega=e^{2\pi i/3}$ とし、$F$ を[本章のFourier型行列](#def-qft37-rephasing-quartet)の例に与えたものとする。$Y_u=(\sqrt2/v)D_u$、$Y_d=(\sqrt2/v)FD_d$、右回転 $U_R^u=U_R^d=I$ とする。次を導け。
  1. 真空代入後の質量行列と左右回転、非負の質量固有値。
  2. CKM行列、ユニタリ性、$J_{12;12}$。
  3. 光子と $Z$ の世代非対角結合の有無、および動径Higgs結合の行列。
  4. この模型の非零CP不変量が何を主張し、何を主張しないか。

<!-- solution-start -->
**詳細解答**：まず[真空からの質量生成](#thm-qft37-yukawa-mass)に代入すると

$$
M_u=\frac v{\sqrt2}Y_u=D_u,\qquad
M_d=\frac v{\sqrt2}Y_d=FD_d.
$$

$1+\omega+\omega^2=0$ と $|\omega|=1$ から $F^\dagger F=I$ です。したがって

$$
(U_L^u,U_R^u)=(I,I),\qquad
(U_L^d,U_R^d)=(F,I)
$$

と選べば、$(U_L^u)^\dagger M_uU_R^u=D_u$、$(U_L^d)^\dagger M_dU_R^d=F^\dagger FD_d=D_d$ です。いずれも正対角なので、[LA6の特異値分解](../../../基礎科目/LA/LA6/index.md#thm-la6-complex-svd)の条件を満たし、対角成分が質量です。

次に[質量対角化とCKM荷電電流](#thm-qft37-ckm-current)の定理から

$$
V=(U_L^u)^\dagger U_L^d=F,\qquad
V^\dagger V=F^\dagger F=I.
$$

[四重積の定義](#def-qft37-rephasing-quartet)に四つの成分 $V_{11}=V_{12}=V_{21}=1/\sqrt3$、$V_{22}=\omega/\sqrt3$ を入れれば

$$
J_{12;12}
=\operatorname{Im}\left(V_{11}V_{22}V_{12}^*V_{21}^*\right)
=\frac{\operatorname{Im}\omega}{9}
=\frac{\sqrt3}{18}.
$$

光子・$Z$ の各種・カイラリティへの結合係数は世代空間では $cI$ です。上型は $I^\dagger(cI)I=cI$、下型は $F^\dagger(cI)F=cI$ なので、どちらも世代非対角結合がありません。[Higgsの整列定理](#thm-qft37-neutral-diagonal)で動径Higgsへの係数行列は上型 $D_u/v$、下型 $D_d/v$ となり、これも対角です。

最後に $J\ne0$ と質量非縮退の仮定から、[再位相不変四重積とCP位相](#prop-qft37-cp-quartet)の命題により、場の再位相ではCKM全体を実にできません。ただし $F$ は作った数学模型で、実際のCKM数値を予言せず、崩壊率・量子補正やQCDの非摂動現象まで計算したわけではありません。
<!-- solution-end -->

## 7. まとめと次の問い

三世代Yukawa行列はHiggs真空から $M_f=vY_f/\sqrt2$ を生み、複素特異値分解で正の質量固有値へ移せます。上型と下型の**左回転のずれ**だけが荷電弱電流に $V_{\mathrm{CKM}}=(U_L^u)^\dagger U_L^d$ として残り、三世代では一つの物理的CP位相を持ち得ます。一方、世代一様な中性ゲージ電流と一つのHiggs二重項に由来する結合は木レベルで対角のままです。

ではこの混合を含む $W$ 交換から、実際の弱崩壊をどう計算するのでしょうか。次は低エネルギーのFermi有効相互作用と木レベル崩壊へ進みます。
