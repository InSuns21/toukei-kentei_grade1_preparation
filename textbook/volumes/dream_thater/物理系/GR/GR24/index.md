# GR24 GR I 総合演習：計量から観測まで

GR I では、計量から自由落下・潮汐・時計・光路を求め、Einstein方程式からSchwarzschild解や線形重力波へ進みました。講義ごとの公式を覚えるだけでは、座標成分を観測値と取り違えることがあります。最終講では同じ計算を、**仮定 → 計量 → 接続・曲率 → 保存量・運動 → 観測者の測定**という順序で組み直します。

本章は新しい大規模理論を追加する講義ではありません。既習結果をつないで、それらの適用条件・符号・次元を自分で点検するための講義です。特に、**Rindler座標の見かけの重力とSchwarzschild外部の真の潮汐は別物**であること、静止時計と光の局所周波数を混同しないこと、重力波の一次振幅と二次エネルギーを区別することを繰り返し扱います。

全章を通して、計量符号は $(-,+,+,+)$、曲率は[GR6の成分規約](../GR6/index.md#prop-gr6-coordinate-curvature)と同じ
$R^\rho{}_{\sigma\mu\nu}=\partial_\mu\Gamma^\rho_{\nu\sigma}-\partial_\nu\Gamma^\rho_{\mu\sigma}+\Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma}-\Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}$ とします。$x^0=ct$、$G$ はNewton定数、$c>0$ は光速、$\tau$ は時間的世界線の固有時です。添字 $0$ と座標時刻 $t$ に関する微分は $\partial_0=c^{-1}\partial_t$ で区別します。特記しなければ4次元、$\Lambda=0$ です。

## 1. 静的計量から何を、どの順序で読み取るか

最初に、直交する時間方向と一つの空間方向だけを取り出した局所計量を考えます。$x$ を長さの単位を持つ座標、$N(x),A(x)$ を正の $C^2$ 関数とし、

$$
ds^2=-N(x)^2(dx^0)^2+A(x)^2dx^2
$$

とします。これは2次元部分の計算用模型であり、4次元での真空Einstein方程式を表しているわけではありません。$N>0$ である領域では $x=\mathrm{const}$ の世界線は時間的であり、時計が測る時間は

$$
d\tau=N(x)\,dt.
$$

同じ計量から、自由落下の加速度を求める接続と、座標の取り方を変えても消せない曲率を**別々に**計算します。

<a id="prop-gr24-static-diagnostic"></a>

<!-- formal-statement-start -->
> **命題（静的二次元ブロックの接続と曲率の検算）**  
> 開区間 $J$ 上の正の $C^2$ 関数 $N,A$ から作ったLorentz計量 $g=-N^2(dx^0)^2+A^2dx^2$ について、Levi-Civita接続の非零になり得る係数は

$$
\Gamma^0_{0x}=\Gamma^0_{x0}=\frac{N'}N,\qquad
\Gamma^x_{00}=\frac{NN'}{A^2},\qquad
\Gamma^x_{xx}=\frac{A'}A.
$$

> [GR6の曲率規約](../GR6/index.md#prop-gr6-coordinate-curvature)で計算した成分は

$$
\boxed{
R_{x0x0}
=AN\left(\frac{N'}A\right)'
}
$$

> である。ここでプライムは $x$ による微分とする。この2次元計量が平坦であるための必要十分条件は $(N'/A)'=0$ である。また $x=\mathrm{const}$ の静止観測者の四元加速度の大きさは $c^2|N'|/(AN)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

計量とその逆行列を先に書き、Christoffelの定義へ代入します。曲率では接続の微分項と二次項が打ち消し合う部分を見逃さないようにします。2次元ではRiemannテンソルの独立成分が一つなので、その成分が零なら全曲率が零です。

<!-- proof-start -->
### 証明

$g_{00}=-N^2$、$g_{xx}=A^2$、$g^{00}=-N^{-2}$、$g^{xx}=A^{-2}$ で、時間微分と混合計量成分は零です。[GR3の測地線方程式の導出](../GR3/index.md#thm-gr3-stationary-action)に使う公式を直接展開すると、

$$
\begin{aligned}
\Gamma^0_{0x}
&=\frac12g^{00}\partial_xg_{00}
=\frac12(-N^{-2})(-2NN')=\frac{N'}N,\\
\Gamma^x_{00}
&=-\frac12g^{xx}\partial_xg_{00}=\frac{NN'}{A^2},\\
\Gamma^x_{xx}
&=\frac12g^{xx}\partial_xg_{xx}=\frac{A'}A.
\end{aligned}
$$

曲率式へ $(\rho,\sigma,\mu,\nu)=(x,0,x,0)$ を代入します。他の係数が零であることを使うと

$$
\begin{aligned}
R^x{}_{0x0}
&=\partial_x\Gamma^x_{00}
+\Gamma^x_{xx}\Gamma^x_{00}
-\Gamma^x_{00}\Gamma^0_{x0}\\
&=\frac{N'^2+NN''}{A^2}
-\frac{2NN'A'}{A^3}
+\frac{NN'A'}{A^3}-\frac{N'^2}{A^2}\\
&=\frac{N}{A^2}\left(N''-\frac{N'A'}A\right).
\end{aligned}
$$

$g_{xx}=A^2$ で第一添字を下げれば

$$
R_{x0x0}=A^2R^x{}_{0x0}
=AN\left(\frac{N'}A\right)'.
$$

$A,N>0$ よりこの成分の消失と $(N'/A)'=0$ は同値です。2次元のRiemannテンソルは反対称性と対交換対称性から独立成分が $R_{x0x0}$ だけです。したがって平坦性についての主張が従います。

静止観測者の四元速度は $u^0=dx^0/d\tau=c/N$、$u^x=0$。四元加速度 $a^\mu=u^\nu\nabla_\nu u^\mu$ は $a^x=\Gamma^x_{00}(c/N)^2=c^2N'/(A^2N)$、$a^0=0$ です。よって大きさは $\sqrt{g_{xx}(a^x)^2}=c^2|N'|/(AN)$。$\square$
<!-- proof-end -->

**定義を計算で使う理由。** Christoffel係数は座標に依存するので、$\Gamma^x_{00}\neq0$ は単独では重力の潮汐を意味しません。一方、曲率はテンソルであり、成分が一つでも非零ならその点で平坦ではありません。加速度の大きさは「その場所に留まる観測者が加速しているか」であり、「自由落下の相対加速度があるか」とも異なります。

### 直接例A：Rindler時計

$a>0$ とし、$N(x)=1+ax/c^2$、$A=1$、$x>-c^2/a$ の計量を考えます。[GR1のRindler計量の導出](../GR1/index.md#prop-gr1-rindler-metric)を見直し、上の命題に代入すると

$$
\Gamma^x_{00}=\frac{a}{c^2}N,\qquad
R_{x0x0}=N N''=0,\qquad
|a_{\mathrm{proper}}|=\frac aN.
$$

したがって非零の接続と固有加速度があっても、曲率は零です。$N=0$ の場所をこの静止時計の有効領域へ含めてはいけません。

### 直接例B：Schwarzschild外部

[GR16のSchwarzschild解](../GR16/index.md#thm-gr16-schwarzschild)で $r_s=2GM/c^2$、$f=1-r_s/r$ と置き、$M>0$、$r>r_s$ に限ります。角度を固定した時間・半径ブロックでは $N=\sqrt f$、$A=1/\sqrt f$ なので

$$
\frac{N'}A=\frac{f'}2,\qquad
R_{r0r0}=\frac{f''}2=-\frac{r_s}{r^3},\qquad
|a_{\mathrm{proper}}|=\frac{c^2f'}{2\sqrt f}
=\frac{GM}{r^2\sqrt f}.
$$

ここで $f'=r_s/r^2$、$f''=-2r_s/r^3$ を代入しました。$R_{r0r0}\neq0$ なので、4次元の時空も平坦ではありません。ただしこの計算だけで4次元Riemannテンソルの全成分を決めたわけではありません。また $r\downarrow r_s$ は本章の静止座標領域の境界への極限であり、そこで曲率特異性があると結論する検査ではありません。

## 2. 静止時計、自由粒子、光子を一つの計量で区別する

Schwarzschild外部の $f(r)$ を使い続けます。座標 $t$ は遠方で規格化した静的時間で、半径 $r$ に留まる時計は $d\tau=\sqrt f\,dt$ を刻みます。[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)を**アフィン測地線**に適用すると、時間並進の保存量が得られます。加速して留まる観測者の世界線に、そのまま測地線の保存則を適用してはいけません。

質量正の自由粒子について、動径運動なら $e=f\,dt/d\tau$ を無次元の単位質量当たりの保存エネルギーとします。$e$ は局所で測った粒子エネルギーそのものではありません。固有時による規格化と結び付けると

$$
-c^2=-fc^2\left(\frac{dt}{d\tau}\right)^2
+\frac1f\left(\frac{dr}{d\tau}\right)^2
$$

から

$$
\boxed{
\left(\frac{dr}{d\tau}\right)^2=c^2(e^2-f).
}
$$

初期に半径 $r_0>r_s$ で静止座標に対して瞬間的に静止した自由粒子は、初期条件 $dr/d\tau=0$ から $e^2=f(r_0)$、未来向きなので $e=\sqrt{f(r_0)}$ です。これは自由落下開始時の条件であり、落下中の粒子は静止観測者ではありません。

同じ時空を伝播する光では、[GR17の周波数比](../GR17/index.md#thm-gr17-redshift)により、半径 $r_A$ での局所周波数を $\nu_A$、半径 $r_B$ での局所周波数を $\nu_B$ として

$$
\boxed{
\frac{\nu_B}{\nu_A}=\sqrt{\frac{f(r_A)}{f(r_B)}}.
}
$$

この式の前提は、両端が静止観測者で、同じ光線が散乱なしに光的アフィン測地線を通ることです。波の波数に結び付くKilling量は保存しても、各観測者の局所周波数は保存しません。

半径方向の光に限れば、零条件から

$$
0=-fc^2dt^2+f^{-1}dr^2,\qquad
\frac{dt}{dr}=\pm\frac1{cf}.
$$

$r_B>r_A>r_s$ に向かう外向き光の片道**座標時間**は

$$
\boxed{
t_B-t_A=\frac{r_B-r_A}{c}
+\frac{r_s}{c}\log\frac{r_B-r_s}{r_A-r_s}.
}
$$

$1/f=r/(r-r_s)=1+r_s/(r-r_s)$ を積分した結果です。これは[GR20の走時計算](../GR20/index.md#prop-gr20-null-time-integral)の動径の場合であり、この値をそのまま発信者の固有時間と呼ぶことはできません。静止する発信者が同じ半径で往復を受け取るなら、その時計の経過時間は $\sqrt{f(r_A)}$ 倍です。

**弱場への接続。** $r_s/r\ll1$ のとき $f=1+2\Phi/c^2$、$\Phi=-GM/r$。[GR13のNewton極限](../GR13/index.md#prop-gr13-newton-acceleration)に適用すると、遅い粒子の座標加速度は先頭次数で $d^2r/dt^2\simeq-\partial_r\Phi=-GM/r^2$。静止観測者の固有加速度は上向き $+GM/(r^2\sqrt f)$ であり、自由粒子の落下加速度とは向きも物理的役割も異なります。

## 3. 近似波形が観測量へ届くまで

背景がMinkowskiに近い弱場真空で、$h_{\mu\nu}$ の一次までを扱う場合、[GR21の線形方程式](../GR21/index.md#thm-gr21-linear-wave)を使います。ただし座標の微小変換は成分 $h_{\mu\nu}$ を変えるため、全成分をそのまま観測可能な波と解釈できません。[GR22のTT成分](../GR22/index.md#def-gr22-tt-wave)で $+z$ に進む波は

$$
(h_{ij}^{\mathrm{TT}})
=\begin{pmatrix}
h_+&h_\times&0\\
h_\times&-h_+&0\\
0&0&0
\end{pmatrix}.
$$

$x$、$y$ に沿う十分短い自由鏡の腕では、一次で $\delta L_x/L=h_+/2$、$\delta L_y/L=-h_+/2$。二腕の差動伸びは $\delta(L_x-L_y)/L=h_+$ です。[GR22の干渉計応答](../GR22/index.md#thm-gr22-michelson-response)を測定位相へ翻訳するには、さらに $\omega L/c\ll1$、等長直交腕、自由鏡、TTゲージという条件が要ります。

源側では、孤立・低速・弱い自己重力の円軌道二体系を先頭近似で考えます。質量 $m_1,m_2>0$、全質量 $M=m_1+m_2$、換算質量 $\mu=m_1m_2/M$、相対距離 $a$、角周波数 $\Omega$、遠方距離 $D$ とします。$a\Omega/c\ll1$、$GM/(ac^2)\ll1$、$D\gg a$、$\Omega D/c\gg1$ です。[GR23の四重極公式](../GR23/index.md#prop-gr23-circular-binary)より軌道面の法線方向では、適当な位相原点を選ぶと

$$
h_+=-H\cos(2\Omega t_D),\qquad
h_\times=-H\sin(2\Omega t_D),\qquad
H=\frac{4G\mu a^2\Omega^2}{c^4D},
\quad t_D=t-D/c.
$$

波の角周波数は $2\Omega$ です。一方、[GR23の放射パワー](../GR23/index.md#thm-gr23-luminosity)では振幅の**時間微分の二乗**を方向積分し、

$$
P=\frac{32G}{5c^5}\mu^2a^4\Omega^6.
$$

従って $H\propto D^{-1}$ でも総パワー $P$ は遠方距離に依存しません。$H$ と $P$ を同じ摂動次数の量として足し合わせたり、軌道エネルギー減少と無条件に同一視したりしないでください。後者を言うには、放射反作用についてのバランス則を追加で仮定する必要があります。

## 4. 公式に飛びつく前の条件一覧

計算時は、まず何を固定し何を変化させたかを言葉で述べてください。異なる問題の前提が似ていても交換可能とは限りません。

| 対象 | 最初に必要な条件 | 出てくる量 | よくある取り違え |
|---|---|---|---|
| Rindler | $N>0$ の非慣性座標領域 | $\Gamma\neq0$、曲率零 | 接続非零を曲率と誤認 |
| Schwarzschild | 静的・球対称・真空・$r>r_s$ | 時計比・保存量・潮汐 | 真空なら曲率零と思う |
| Newton極限 | 弱場・遅い粒子・準静的 | $\Phi$ と加速度 | $O(\Phi^2/c^4)$ を混ぜる |
| 光の赤方偏移 | 光的測地線・両端静止 | $\nu_B/\nu_A$ | 座標周波数と局所周波数を混同 |
| TT波 | 弱場・線形・真空・TT条件 | $h_+,h_\times$ | ゲージ成分を物理成分と誤認 |
| 四重極放射 | 局在・低速・遠方・保存の近似 | $h\propto D^{-1},P\propto\Omega^6$ | 一次の波形を局所エネルギー密度とみなす |

以下の演習では単なる式の代入を避け、「適用可能な領域と使った近似」を解答の一部とします。

## 5. 総合演習

### Level A：基本的な検算を独立して行う

<a id="ex-gr24-a01"></a>
#### GR24-A01 接続係数の計算
- Level: A

$ds^2=-N(x)^2(dx^0)^2+dx^2$、$N(x)=1+bx$、$b>0$、$1+bx>0$ とする。$\Gamma^x_{00}$、$\Gamma^0_{0x}$ と、$x$ 一定の観測者の固有加速度の大きさを求めよ。

<!-- solution-start -->
**詳細解答。** $g_{00}=-N^2$、$g^{00}=-1/N^2$、$g_{xx}=g^{xx}=1$。従って

$$
\Gamma^x_{00}=-\frac12\partial_x(-N^2)=NN'=b(1+bx),
$$

$$
\Gamma^0_{0x}
=\frac12\left(-\frac1{N^2}\right)(-2NN')
=\frac b{1+bx}.
$$

静止線では $d\tau=N\,dt$、$u^0=c/N$。従って $a^x=\Gamma^x_{00}(u^0)^2=c^2b/N$ で、$g_{xx}=1$ なので大きさも $c^2b/(1+bx)$。$N>0$ を使って除算を正当化しました。
<!-- solution-end -->

<a id="ex-gr24-a02"></a>
#### GR24-A02 接続非零でも曲率零
- Level: A

A01の計量について $R_{x0x0}$ を求め、接続が非零なのに平坦である理由を説明せよ。

<!-- solution-start -->
**詳細解答。** [静的ブロックの曲率公式](#prop-gr24-static-diagnostic)で $A=1$、$N'=b$、$N''=0$ だから

$$
R_{x0x0}=N N''=0.
$$

同じ結果を接続から確認すると $\partial_x\Gamma^x_{00}=b^2$、$-\Gamma^x_{00}\Gamma^0_{x0}=-b^2$ で相殺します。2次元の独立曲率成分はこれだけです。接続は座標依存で、静止観測者は加速していますが、空間の曲がりとは別です。
<!-- solution-end -->

<a id="ex-gr24-a03"></a>
#### GR24-A03 赤方偏移の分母と弱場符号
- Level: A

$M>0$、$r_s=2GM/c^2$、$r_B>r_A>r_s$ とする。AからBへ到達した同じ光を静止観測者が測るときの $\nu_B/\nu_A$ を求め、$r_s/r_A,r_s/r_B\ll1$ の先頭補正を出せ。

<!-- solution-start -->
**詳細解答。** [GR17の静止観測者間の赤方偏移](../GR17/index.md#thm-gr17-redshift)の仮定を使います。$f=1-r_s/r$ と置くと

$$
\frac{\nu_B}{\nu_A}=\sqrt{\frac{f_A}{f_B}}.
$$

$\sqrt{1-\epsilon}=1-\epsilon/2+O(\epsilon^2)$ と $(1-\epsilon)^{-1/2}=1+\epsilon/2+O(\epsilon^2)$ をそれぞれに適用すると

$$
\frac{\nu_B}{\nu_A}
=1-\frac{r_s}{2r_A}+\frac{r_s}{2r_B}
+O\left(\frac{r_s^2}{r_A^2}+\frac{r_s^2}{r_B^2}\right).
$$

$r_B>r_A$ なので一次項は負で、上方で周波数が下がります。$r_s/2=GM/c^2$ だから補正は $(\Phi_A-\Phi_B)/c^2$ とも書けます。
<!-- solution-end -->

<a id="ex-gr24-a04"></a>
#### GR24-A04 動径光線の走時
- Level: A

Schwarzschild静的外部 $r_B>r_A>r_s$ で、外向き光線の片道座標時間を計算せよ。$r_s\to0$ の極限も確認せよ。

<!-- solution-start -->
**詳細解答。** 角度一定・光的条件を $ds^2=0$ に入れると

$$
c^2f\,dt^2=f^{-1}dr^2,\qquad \frac{dt}{dr}=\frac1{cf}.
$$

外向きなので正符号を選び、$1/f=1+r_s/(r-r_s)$ で積分すると

$$
t_B-t_A
=\frac1c\int_{r_A}^{r_B}\left(1+\frac{r_s}{r-r_s}\right)dr
=\frac{r_B-r_A}{c}
+\frac{r_s}{c}\log\frac{r_B-r_s}{r_A-r_s}.
$$

積分区間で $r-r_s>0$ なので対数は定義されます。$r_s\to0$ では対数項は零へ収束し、Minkowskiの $(r_B-r_A)/c$ が戻ります。これは静止観測者の固有時ではありません。
<!-- solution-end -->

<a id="ex-gr24-a05"></a>
#### GR24-A05 TT射影で残る成分
- Level: A

進行方向 $\boldsymbol n=(0,0,1)$ に対して $S=\operatorname{diag}(3q,q,2q)$（$q$ は定数）をTT射影せよ。跡零と横断性を確認せよ。

<!-- solution-start -->
**詳細解答。** [GR22のTT射影](../GR22/index.md#def-gr22-tt-projector)を用い、$P=\operatorname{diag}(1,1,0)$ とします。$PSP=\operatorname{diag}(3q,q,0)$、$P_{ij}S_{ij}=4q$ なので

$$
\Lambda S=PSP-\frac12P(4q)
=\operatorname{diag}(q,-q,0).
$$

跡は $q-q+0=0$。また $z$ 成分を含む列と行は零なので $(\Lambda S)_{ij}n_j=0$。もとの $S$ の単なる三次元無跡化とは異なります。
<!-- solution-end -->

### Level B：異なる結果をつなげる

<a id="ex-gr24-b01"></a>
#### GR24-B01 自由落下の初期条件と静止時計
- Level: B

$M>0$ のSchwarzschild外部 $r>r_s$ で、半径 $r_0>r_s$ から動径方向に自由落下を開始する質点を考える。質点は初期時刻だけ静止座標に対して静止している。保存量 $e=f\,dt/d\tau$ と初期条件から $(dr/d\tau)^2$ を導出し、半径 $r<r_0$ での速さを求めよ。

<!-- solution-start -->
**詳細解答。** 静的計量の時間並進が[Killing場](../GR14/index.md#def-gr14-killing-field)であり、時間的測地線が固有時でアフィン表示されるので、[Killing保存量の定理](../GR14/index.md#thm-gr14-killing-charge)を適用できます。時間成分から $e=f\,dt/d\tau$ が一定です。規格化に $dt/d\tau=e/f$ を入れると

$$
-c^2=-fc^2\frac{e^2}{f^2}
+f^{-1}\left(\frac{dr}{d\tau}\right)^2.
$$

両辺に $f$ を掛け、$(dr/d\tau)^2=c^2(e^2-f)$。$r=r_0$ で静止だから $e=\sqrt{f(r_0)}$（未来向き）。従って

$$
\left|\frac{dr}{d\tau}\right|
=c\sqrt{f(r_0)-f(r)}
=c\sqrt{r_s\left(\frac1r-\frac1{r_0}\right)}.
$$

内向き落下では $dr/d\tau<0$ を選びます。これは座標速度 $dr/dt$ ではなく、固有時に対する動径座標の変化率です。$r_s<r<r_0$ では根号内は正です。
<!-- solution-end -->

<a id="ex-gr24-b02"></a>
#### GR24-B02 Poisson極限と時計の弱場近似
- Level: B

半径 $R$ の球内部 $0\le r<R$ に一定の密度 $\rho>0$ を持つNewtonの静的球対称源を考える。$\Phi$ が原点で滑らかで $\nabla^2\Phi=4\pi G\rho$ を満たすとして $\Phi'(r)$ を求めよ。さらに $|\Phi|/c^2\ll1$ の弱場時計比 $d\tau/dt$ の先頭項を求め、座標加速度との関係を説明せよ。

<!-- solution-start -->
**詳細解答。** [GR13のPoisson極限](../GR13/index.md#thm-gr13-poisson-limit)で静的・低圧・弱場が前提です。球対称のラプラシアンを使うと

$$
\frac1{r^2}\frac{d}{dr}(r^2\Phi')=4\pi G\rho.
$$

$r>0$ で一度積分して $r^2\Phi'=(4\pi G\rho/3)r^3+C$。原点で $\Phi'$ が有限になるには $C=0$ なので

$$
\Phi'(r)=\frac{4\pi G\rho}{3}r,\qquad
\Phi(r)=\Phi(0)+\frac{2\pi G\rho}{3}r^2.
$$

[弱場計量のポテンシャル表示](../GR13/index.md#def-gr13-newton-potential)では $g_{00}\simeq-(1+2\Phi/c^2)$。静止時計は

$$
\frac{d\tau}{dt}
=\sqrt{1+\frac{2\Phi}{c^2}}
=1+\frac{\Phi}{c^2}+O(\Phi^2/c^4).
$$

遅い自由粒子の先頭座標加速度は $-\nabla\Phi$ なので内部では $d^2r/dt^2\simeq-(4\pi G\rho/3)r$。$\Phi$ に定数を加えても力は変わりませんが、遠方時計に対する絶対的な時計比には境界条件による規格化が必要です。
<!-- solution-end -->

<a id="ex-gr24-b03"></a>
#### GR24-B03 見かけの重力を局所的に合わせても潮汐は一致しない
- Level: B

Schwarzschild外部の $r=r_0>r_s$ で静止観測者の固有加速度を $a_0$ とする。Rindler計量 $ds^2=-(1+a_0x/c^2)^2(dx^0)^2+dx^2$ の $x=0$ にある観測者と加速度の大きさを一致させよ。両者の曲率成分と、何が一致しないかを明示せよ。

<!-- solution-start -->
**詳細解答。** まずSchwarzschildの $N=\sqrt{f}$、$A=1/\sqrt f$ を[本章の命題](#prop-gr24-static-diagnostic)へ入れると

$$
a_0=\frac{c^2f'(r_0)}{2\sqrt{f(r_0)}}
=\frac{GM}{r_0^2\sqrt{1-r_s/r_0}}.
$$

Rindler側では $N(0)=1$、$N'=a_0/c^2$、$A=1$ だから固有加速度の大きさは $c^2N'/N=a_0$。よって一致します。

しかしRindlerの曲率は $N''=0$ なので $R_{x0x0}=0$。Schwarzschildの時間・半径ブロックでは

$$
R_{r0r0}(r_0)
=\frac12f''(r_0)=-\frac{r_s}{r_0^3}\ne0.
$$

比較しているのは各計量の指定した座標基底での曲率成分であり、その数値自体が任意の座標変換で不変だという意味ではありません。**零テンソルかどうか**が不変な違いです。一点で静止観測者の加速度を合わせても、近傍の潮汐は一致しません。
<!-- solution-end -->

<a id="ex-gr24-b04"></a>
#### GR24-B04 円軌道から波形と放射パワーまで
- Level: B

等質量 $m>0$ の二質点が相対距離 $2a$（$a>0$）のNewton円軌道にあり、重心を原点とする。十分遠い軌道面法線方向の観測者までの距離を $D$ とする。$\Omega^2=G(2m)/(2a)^3$、$a\Omega/c\ll1$、$Gm/(ac^2)\ll1$ とし、先頭四重極近似で波の角周波数、二偏極の共通振幅 $H$、総放射パワー $P$ を求めよ。

<!-- solution-start -->
**詳細解答。** 相対距離は $R=2a$、総質量は $M=2m$、換算質量は $\mu=m^2/(2m)=m/2$ です。[GR23の円軌道四重極式](../GR23/index.md#prop-gr23-circular-binary)へこの三量を代入すると角周波数は $2\Omega$、振幅は

$$
H=\frac{4G\mu R^2\Omega^2}{c^4D}
=\frac{4G(m/2)(2a)^2\Omega^2}{c^4D}
=\frac{8Gma^2\Omega^2}{c^4D}.
$$

適切な位相原点では $h_+=-H\cos(2\Omega t_D)$、$h_\times=-H\sin(2\Omega t_D)$ です。パワーは

$$
\begin{aligned}
P&=\frac{32G}{5c^5}\mu^2R^4\Omega^6\\
&=\frac{32G}{5c^5}\left(\frac m2\right)^2(2a)^4\Omega^6\\
&=\frac{128Gm^2a^4\Omega^6}{5c^5}.
\end{aligned}
$$

与えられた円軌道条件 $\Omega^2=Gm/(4a^3)$ を用いれば $P=2G^4m^5/(5c^5a^5)$ です。最後の換算では $128/4^3=2$。波形は $D^{-1}$、パワーは $D$ に依らず、$H$ は無次元、$P$ はエネルギー毎秒の次元です。弱い自己重力・低速の先頭近似なので、厳密な永続円軌道解を主張しません。
<!-- solution-end -->

### Level C：計量・保存則・測定・曲率を一題で統合する

<a id="ex-gr24-c01"></a>
#### GR24-C01 同じ静的外部にいる二人の観測者は何を測るか
- Level: C

$M>0$ のSchwarzschild外部で $r_B>r_A>r_s=2GM/c^2$ に静止するA、Bを考える。Aから半径方向に出した光をBが鏡で直ちに反射し、Aが再受信する（鏡の反射による局所周波数の変更はないものとする）。重力場を固定し、光線と観測装置の反作用を無視する。

1. 二人の静止時計の $d\tau/dt$ を求め、AからBへの局所周波数比を求めよ。
2. Aの時計で測る往復時間を、光的条件を積分して求めよ。
3. Aの静止を保つのに必要な固有加速度を求め、Aで瞬間的に静止して解放した粒子の運動と区別せよ。
4. 時間・半径ブロックの $R_{r0r0}$ を計算し、Rindler座標で同じ固有加速度を再現できても曲率まで同じにならない理由を示せ。
5. $r_A,r_B\gg r_s$ で、周波数比と片道走時の先頭弱場補正の符号を確認せよ。

<!-- solution-start -->
**詳細解答。** まず指定領域で $f(r)=1-r_s/r>0$。時空は静的ですが光は測地線上、二人の静止世界線は一般に加速世界線であり、適用する定理を分けます。

**（1）** 静止世界線は $dr=d\theta=d\varphi=0$ なので $-c^2d\tau^2=-fc^2dt^2$、未来向き時計について

$$
\frac{d\tau_A}{dt}=\sqrt{f_A},\qquad
\frac{d\tau_B}{dt}=\sqrt{f_B}.
$$

[GR14のKilling保存量](../GR14/index.md#thm-gr14-killing-charge)をアフィン光的測地線へ適用すると、時間並進に対応する光子の量は保存します。一方、静止観測者の局所周波数はその量を $\sqrt f$ で割ったものなので[GR17の赤方偏移](../GR17/index.md#thm-gr17-redshift)から

$$
\frac{\nu_B}{\nu_A}
=\sqrt{\frac{f_A}{f_B}}<1.
$$

Bで反射した光のBでの局所周波数が変わらないとすれば、戻りでは比が逆になり、Aに戻った周波数は出発時と同じです。周波数の「局所測定」と保存量の「光線に沿った一定」を区別しました。

**（2）** 外向き光は $dt/dr=1/(cf)$、戻りは $dt/dr=-1/(cf)$ です。静的なので二方向の座標走時は等しく、Aでの往復固有時間は

$$
\begin{aligned}
\Delta\tau_A
&=2\sqrt{f_A}\int_{r_A}^{r_B}\frac{dr}{cf(r)}\\
&=\frac{2\sqrt{f_A}}c\left[(r_B-r_A)
+r_s\log\frac{r_B-r_s}{r_A-r_s}\right].
\end{aligned}
$$

鏡の反射時間は零と仮定しました。Bが測る片道の「時計経過時間」をこの同じ式から無条件に取り出すことはできません。別々の場所の時計の同期規約と往復の測定を区別する必要があります。

**（3）** $N=\sqrt f$、$A=1/\sqrt f$ を[静的計量の命題](#prop-gr24-static-diagnostic)に代入し、静止しているAの加速度の大きさは

$$
a_A=\frac{c^2f'(r_A)}{2\sqrt{f_A}}
=\frac{GM}{r_A^2\sqrt{f_A}}.
$$

向きは外向きです。解放された自由粒子は四元加速度 $a^\mu=0$ の測地線を進み、静止座標では下向きに落ちます。静止を保つための加速度と自由落下粒子の座標加速度は同じ量ではありません。

**（4）** $N'/A=f'/2$、$AN=1$ だから

$$
R_{r0r0}
=\frac{f''}2=-\frac{r_s}{r^3}\ne0.
$$

Rindlerなら $A=1$、$N$ が空間座標の一次関数で $N''=0$、ゆえにRiemannテンソルが零です。Aの一点で静止加速度を合わせることはできても、曲率テンソルが零か非零かは変えられません。

**（5）** [GR17の周波数式](../GR17/index.md#thm-gr17-redshift)を両点で一次展開すると

$$
\frac{\nu_B}{\nu_A}
=1+\frac{r_s}{2}\left(\frac1{r_B}-\frac1{r_A}\right)
+O(r_s^2/r_A^2+r_s^2/r_B^2).
$$

$r_B>r_A$ だから先頭補正は負です。一方、片道座標時間について固定した二端点で $r_s/r_A\ll1$ とすると

$$
\begin{aligned}
t_B-t_A
&=\frac{r_B-r_A}c
+\frac{r_s}c\log\frac{r_B}{r_A}
+O\left(\frac{r_s^2}{cr_A}\right).
\end{aligned}
$$

$r_B/r_A>1$ なので対数の先頭補正は正、すなわち平坦時空の同じ座標半径差による走時より長くなります。**局所周波数比は減少、座標伝播時間は増加**であり、符号を一つの直感で決めつけないことが検算になります。
<!-- solution-end -->

## 6. GR I から GR II へ

ここまでで、計量成分から局所時計・測地線・曲率・光の走時・重力波の測定を再構成しました。次の[GR25「Schwarzschild地平線と曲率特異性」](../GR25/index.md)以降では、ここで $r>r_s$ に限定した座標記述を越え、座標の見かけの発散と時空の大域的性質を区別します。GR I で使えた静止観測者やKilling時間が、すべての領域で同じように使えると先取りしないことが出発点です。
