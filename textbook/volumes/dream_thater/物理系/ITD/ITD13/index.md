# ITD13 時間依存Langevin拡散の経路反転：Girsanov密度・ゆらぎ関係・仕事

[ITD11の一定駆動の経路比](../ITD11/index.md#thm-itd11-path-ratio)は、独立なGaussian増分の比を掛けることで得られました。一方、[ITD12の周期ポテンシャル](../ITD12/index.md#def-itd12-potential-ring)の下では、粒子がいる場所で力が変わり、増分の平均も経路に依存します。さらに外から操作を変えると、力自体が時刻にも依存します。**正逆の経路確率比は、どのように計算すればよいのでしょうか。**

今回は、力のある模型と力のないBrown運動を**同じ経路空間上の二つの確率測度**として比較します。これを可能にする道具が[STO10のGirsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)です。計算の鍵は、時間反転すると符号が変わるStratonovich線積分と、変わらない二つの時間積分を正確に分けることです。そこから経路ごとの浴熱、積分型ゆらぎ関係、平均散逸の平方積分、平衡初期条件でのJarzynski等式を一つの鎖にします。

以下で温度 $T>0$ と移動度 $\mu>0$ は一定、$D=\mu k_{\mathrm B}T$、$\beta=(k_{\mathrm B}T)^{-1}$ とします。対数は自然対数で、仕事 $W$ は外部から粒子へ入る向き、浴熱 $Q_{\mathrm{bath}}$ は粒子から浴へ出る向きを正にします。経路は有限時間 $[0,\tau]$、$\tau>0$ のみを扱います。

## 1. 時間を変える操作では何が仕事になるか

長さ $L>0$ の円周を $\mathbb R/L\mathbb Z$ と書き、円周上の位置 $X_t$ と実数値の持ち上げ $Z_t$ を区別します。周期ポテンシャル $U_t(x)$ は粒子の内部エネルギーであり、外力 $F_t$ は一周するごとにも仕事をし得る非保存力です。時間依存のポテンシャルを変える操作も仕事をします。すなわち仕事には、$\partial_tU_t$ から来る**準位の変更**と、$F_t$ から来る**力による移動**の二種類があります。

<a id="def-itd13-driven-protocol"></a>

<!-- formal-statement-start -->
> **定義（時間依存の円周Langevin実験と仕事・浴熱）**  
> $U:[0,\tau]\times\mathbb R\to\mathbb R$ は時刻に関して $C^1$ 級、空間に関して $C^3$ 級で、$U_t(x+L)=U_t(x)$ とする。$F:[0,\tau]\to\mathbb R$ は $C^1$ 級とし、

$$
f_t(x)=F_t-\partial_xU_t(x),\qquad b_t(x)=\mu f_t(x)
$$

> と置く。$Z_0\in[0,L)$ の密度 $\rho_0$ は正の $C^2$ 級周期密度で、$\int_0^L\rho_0\,dx=1$、Brown運動 $B$ と独立とする。[過減衰Langevin経路](../ITD12/index.md#def-itd12-potential-ring)を時間依存に拡張した実験とは

$$
dZ_t=b_t(X_t)\,dt+\sqrt{2D}\,dB_t,
\qquad X_t=Z_t\pmod L
$$

> の解とし、各経路の仕事、浴熱、内部エネルギー変化を

$$
\begin{aligned}
W&=\int_0^\tau\partial_tU_t(X_t)\,dt
  +\int_0^\tau F_t\circ dZ_t,\\
Q_{\mathrm{bath}}&=\int_0^\tau f_t(X_t)\circ dZ_t,\\
\Delta U&=U_\tau(X_\tau)-U_0(X_0)
\end{aligned}
$$

> と定める。$\circ dZ_t$ はStratonovich積分であり、$F_t$ は位置に依存しないので第2項は通常のItô積分と同じである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd13-driven-protocol -->
### 直接例：坂の高さを変えながら粒子を動かす

$U_t(x)=a(t)\cos(kx)$、$k=2\pi/L$、$a\in C^1[0,\tau]$、$F_t=0$ とします。$\partial_tU_t=a'(t)\cos(kx)$、$f_t(x)=ka(t)\sin(kx)$ です。任意の連続経路について

$$
W=\int_0^\tau a'(t)\cos(kX_t)\,dt,
\quad
Q_{\mathrm{bath}}=\int_0^\tau ka(t)\sin(kX_t)\circ dZ_t.
$$

**定義の確認**：$a$ は有限区間上で有界、$U$ は滑らかで周期的なので $f_t$ は一様に有界かつ空間Lipschitz連続です。従ってSDEの解を構成できます。$F_t=0$ でも、坂の高さを変えれば仕事が零とは限りません。[Stratonovich連鎖律](../ITD7/index.md#prop-itd7-stratonovich-balance)で

$$
dU_t(X_t)=\partial_tU_t(X_t)\,dt
 +\partial_xU_t(X_t)\circ dZ_t
$$

なので、$W-Q_{\mathrm{bath}}=\int a'\cos\,dt-\int ka\sin\circ dZ=\Delta U$ です。$F_t$ があっても $F_t-f_t=\partial_xU_t$ により同じ第一法則が成立します。
<!-- definition-example-end -->

## 2. 逆実験は軌道を巻き戻すだけではない

正方向の実験を初期密度 $\rho_0$ とプロトコル $(U_t,F_t)$ で行い、その終端密度を $\rho_\tau$ とします。係数が滑らかで $D>0$ なので、時間 $t>0$ の円周密度は滑らかで正になり、始点も正です。逆実験は**時間順を逆にしたプロトコル** $U^R_s=U_{\tau-s}$、$F^R_s=F_{\tau-s}$ を、初期密度 $\rho_\tau$ から実行する別の確率実験です。このとき力そのものへ負号を付けません。反転するのは記録する**移動方向**です。

円周上の[連続経路空間](../../../解析系/STO/STO3A/index.md#def-sto3a-function-space)を $\Omega=C([0,\tau],\mathbb R/L\mathbb Z)$ とし、$\Theta\omega$ を $s\mapsto\omega(\tau-s)$ と定めます。円周上の経路には周回数の情報が含まれ、$\int f_t\circ dZ_t$ は持ち上げの加法定数に依存しません。

<a id="def-itd13-reverse-experiment"></a>

<!-- formal-statement-start -->
> **定義（時間反転実験と経路エントロピー生成）**  
> [時間依存実験](#def-itd13-driven-protocol)の経路法則を $P$、初期密度 $\rho_\tau$ と逆プロトコル $b^R_s=b_{\tau-s}$ の経路法則を $P_R$ とする。逆実験の経路を時間反転した法則を $Q=\Theta_*P_R$ と書く。$P,Q$ が互いに絶対連続のとき、経路ごとの無次元全エントロピー生成を

$$
\sigma(\omega)=\log\frac{dP}{dQ}(\omega)
$$

> と定義する。$dP/dQ$ は経路全体についてのRadon–Nikodym密度であって、一時刻の位置密度ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd13-reverse-experiment -->
### 直接例：時間依存の一様外力

$U_t=0$、$F_t$ は空間に依存せず、$\rho_0=1/L$ とします。このとき $b_t=\mu F_t$ で、円周上の分布は任意の時刻に $\rho_t=1/L$ のままです。正方向で観測した持ち上げ増分 $dZ_t$ を逆から読むと $-dZ_t$ になり、逆プロトコルの時刻 $s=\tau-t$ に対応する力の値は同じ $F_t$ です。

**定義の確認**：逆実験の初期密度も $1/L$ で正、$b^R_s$ は有界で、$P,Q$ は後に示すように共通のBrown基準測度と同値です。任意の一方向への駆動が正であっても、経路ごとの $\sigma$ の符号を先に決めることはできません。
<!-- definition-example-end -->

## 3. Girsanov密度で正逆の経路を比較する

基準として**初期密度 $1/L$ の外力を持たない円周Brown運動**を考え、その経路法則を $R$ とします。すなわち $X_0$ は密度 $1/L$、$Z_t=Z_0+\sqrt{2D}B_t$ です。この初期密度は保存され、Brown運動の円周遷移密度 $p_h(y\mid x)$ はGaussianを $L$ ごとに足したもので $p_h(y\mid x)=p_h(x\mid y)$ です。したがって有限時刻の結合密度

$$
\frac1L\prod_{j=1}^n p_{t_j-t_{j-1}}(x_j\mid x_{j-1})
$$

は順序を反転しても同じです。連続経路の座標生成（[STO4](../../../解析系/STO/STO4/index.md#lem-sto4-path-borel-coordinates)）により **$\Theta_*R=R$** です。

力を掛けた経路の法則 $P$ をこの $R$ に対する密度として書きます。[Girsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)の指数の二次項は、ドリフトの平方に比例する補正です。以下の $\int b_t\circ dZ_t$ は時間・空間に依存する滑らかな被積分関数のStratonovich積分です。

<a id="thm-itd13-girsanov-reversal"></a>

<!-- formal-statement-start -->
> **定理（Girsanov作用と時間反転の経路確率比）**  
> $L,\tau,\mu,T>0$ とし、[時間依存のLangevin実験](#def-itd13-driven-protocol)の $U,F,\rho_0$ がそこで述べた正則性と正値性を満たすとする。$R$ を一様円周Brown経路法則とする。このとき $P,R,Q$ は互いに同値であり、$R$ に関する正方向の経路密度の対数は

$$
\begin{aligned}
\log\frac{dP}{dR}
={}&\log\{L\rho_0(X_0)\}
+\frac{1}{2D}\int_0^\tau b_t(X_t)\circ dZ_t\\
&-\frac12\int_0^\tau\partial_xb_t(X_t)\,dt
-\frac{1}{4D}\int_0^\tau b_t(X_t)^2\,dt.
\end{aligned}
$$

> 時間反転経路での同じ基準測度 $R$ に対する $Q$ の密度は

$$
\begin{aligned}
\log\frac{dQ}{dR}
={}&\log\{L\rho_\tau(X_\tau)\}
-\frac{1}{2D}\int_0^\tau b_t(X_t)\circ dZ_t\\
&-\frac12\int_0^\tau\partial_xb_t(X_t)\,dt
-\frac{1}{4D}\int_0^\tau b_t(X_t)^2\,dt.
\end{aligned}
$$

> よって、ほとんど全ての経路について

$$
\boxed{\displaystyle
\sigma=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\frac1D\int_0^\tau b_t(X_t)\circ dZ_t
=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\beta Q_{\mathrm{bath}}.}
$$
<!-- formal-statement-end -->

### 証明の見取り図

Brown基準測度は時間反転に不変です。Girsanov密度をまずItô積分で書き、$d[b(X),Z]_t=2D\,\partial_xb_t(X_t)dt$ を使ってStratonovich表示に変えます。逆側では線積分だけが符号を変え、$b'$ と $b^2$ の時間積分は消去されずに**両側に同じだけ現れ、比を取ると相殺する**、という順序を確認します。

<!-- proof-start -->
### 証明

まず基準測度 $R$ の下では $dZ_t=\sqrt{2D}\,dB_t$ です。[Girsanov定理](../../../解析系/STO/STO10/index.md#thm-sto10-girsanov)におけるドリフト変更の係数を $\theta_t=b_t(X_t)/\sqrt{2D}$ とします。$b_t$ はコンパクトな $[0,\tau]\times[0,L]$ 上で有界なので

$$
\mathbb E_R\exp\left\{\frac12\int_0^\tau\theta_t^2\,dt\right\}
\le\exp\left\{\frac{\tau\|b\|_\infty^2}{4D}\right\}<\infty.
$$

従って[Novikov条件](../../../解析系/STO/STO10/index.md#thm-sto10-novikov)が成立し、指数は質量1の密度を与え、その値は厳密に正です。初期分布の置換も独立な $Z_0$ に因子 $L\rho_0(X_0)>0$ を掛けることで行えます。すると

$$
\log\frac{dP}{dR}
=\log\{L\rho_0(X_0)\}
+\frac{1}{2D}\int_0^\tau b_t(X_t)\,dZ_t
-\frac{1}{4D}\int_0^\tau b_t(X_t)^2\,dt.
$$

時刻による係数の変化は二次変動を作らず、空間変数による変化だけが寄与します。[Itô–Stratonovich変換](../ITD12/index.md#thm-itd12-current-and-heat)で

$$
\int_0^\tau b_t(X_t)\,dZ_t
=\int_0^\tau b_t(X_t)\circ dZ_t
-D\int_0^\tau\partial_xb_t(X_t)\,dt.
$$

これを代入すると $dP/dR$ の第一式になります。$\rho_0$ は正で、指数は各連続経路で有限かつ正なので $P\sim R$ です。

逆実験にも同じ議論を適用します。逆側でのStratonovich作用は

$$
\begin{aligned}
&\int_0^\tau b^R_s(X^R_s)\circ dZ^R_s
=\int_0^\tau b_{\tau-s}(X^R_s)\circ dZ^R_s,\\
&\int_0^\tau \partial_xb^R_s(X^R_s)\,ds,
\qquad \int_0^\tau (b^R_s(X^R_s))^2\,ds.
\end{aligned}
$$

この逆記録を $\Theta$ により正方向の経路へ写すと、Stratonovich積分は対称な中点和の逆順で各増分だけが負になるため

$$
\int_0^\tau b^R_s(X^R_s)\circ dZ^R_s
=-\int_0^\tau b_t(X_t)\circ dZ_t.
$$

普通の時間積分は $s=\tau-t$ と置き換わるだけで符号が変わりません。$\Theta_*R=R$ だから $Q=\Theta_*P_R$ の $R$ 密度は、逆側の密度を $\Theta$ で合成したものです。従って定理の第二式が得られます。同様に $Q\sim R$ です。

最後に $\log(dP/dQ)=\log(dP/dR)-\log(dQ/dR)$ を取ると、$b'$ と $b^2$ の二項が相殺して線積分は二倍になります。$b=\mu f$、$D=\mu/\beta$ だから $b/D=\beta f$ であり、[浴熱の定義](#def-itd13-driven-protocol)と一致します。
<!-- proof-end -->

**別の直接検算**：$b(x)=a\sin(kx)$ を固定すると、$b'(x)=ak\cos(kx)$ です。上の作用に現れる三項は $a\int\sin(kX)\circ dZ/(2D)$、$-ak\int\cos(kX)dt/2$、$-a^2\int\sin^2(kX)dt/(4D)$ です。時間反転で第一項だけが符号反転します。単に「Gaussianの平均を位置依存にした一歩の比」を積み上げると、後二項や測度変換の正規化を見落とす危険があるため、ここではGirsanovを使っています。

## 4. 経路のゆらぎ関係と確率流の平方は一致するか

経路比が得られたので、平均の第二法則も調べましょう。単一軌道では $\sigma<0$ があり得ますが、平均では逆経路法則との相対エントロピーになり、非負です。さらに時間ごとの確率流を用いると、**どの時刻・どの位置で散逸したか**を積分として書けます。

時刻 $t$ の密度 $\rho_t(x)$ と確率流 $J_t(x)$ を

$$
J_t=b_t\rho_t-D\,\partial_x\rho_t,
\qquad \partial_t\rho_t=-\partial_xJ_t
$$

とします。これは[ITD12の確率流と保存則](../ITD12/index.md#thm-itd12-current-and-heat)を、係数 $b_t$ に時刻依存があっても各時刻で適用したものです。密度が正であることにより、$\partial_x\log\rho_t$ が定義できます。

<a id="thm-itd13-fluctuation-current"></a>

<!-- formal-statement-start -->
> **定理（ゆらぎ関係と確率流の平均第二法則）**  
> [Girsanov経路比](#thm-itd13-girsanov-reversal)の仮定の下で、系の無次元エントロピーを

$$
H_t=-\int_0^L\rho_t(x)\log\{L\rho_t(x)\}\,dx
$$

> とすれば

$$
\mathbb E_P[e^{-\sigma}]=1,
\quad
\mathbb E_P[\sigma]=D(P\|Q)
=H_\tau-H_0+\beta\mathbb E_P[Q_{\mathrm{bath}}]
=\int_0^\tau\int_0^L\frac{J_t(x)^2}{D\rho_t(x)}\,dx\,dt\ge0.
$$

> 最後の等号が零となるのは $J_t(x)=0$ が全ての $t,x$ で成立するとき、かつそのときに限る。時刻依存の非平衡自由エネルギーを

$$
\mathcal F_t[\rho_t]
=\int_0^L\rho_tU_t\,dx
+k_{\mathrm B}T\int_0^L\rho_t\log(L\rho_t)\,dx
$$

> と置くと、平均仕事は

$$
\mathbb E_P[W]
=\mathcal F_\tau[\rho_\tau]-\mathcal F_0[\rho_0]
+k_{\mathrm B}T\,\mathbb E_P[\sigma].
$$
<!-- formal-statement-end -->

### 証明の見取り図

$P$ と $Q$ は同値なので、逆側の質量が1であることから指数平均が1になります。平均の浴熱率は $\int f_tJ_t$ で、密度エントロピーの微分は $-\int J_t\partial_x\log\rho_t$ です。$D=\mu k_{\mathrm B}T$ を代入すると、二項を足した被積分関数が $J_t^2/(D\rho_t)$ になります。

<!-- proof-start -->
### 証明

[経路比](#thm-itd13-girsanov-reversal)から $e^{-\sigma}=dQ/dP$ であり、相互絶対連続性を使って

$$
\mathbb E_P[e^{-\sigma}]
=\int_\Omega\frac{dQ}{dP}\,dP
=Q(\Omega)=1.
$$

同じ経路比の対数を期待値にすると、初期・終端の密度の分布から

$$
\begin{aligned}
\mathbb E_P\left[\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}\right]
&=\int_0^L\rho_0\log\rho_0\,dx
-\int_0^L\rho_\tau\log\rho_\tau\,dx\\
&=H_\tau-H_0.
\end{aligned}
$$

また、[ITD12の平均浴熱の導出](../ITD12/index.md#thm-itd12-current-and-heat)と同じItô–Stratonovich補正を各時刻の $f_t$ に適用します。$[f_t(X),Z]$ には空間微分だけが寄与するので

$$
\begin{aligned}
\frac{d}{dt}\mathbb E_P[Q_{\mathrm{bath},t}]
&=\mu\int_0^Lf_t^2\rho_t\,dx
+D\int_0^L\partial_xf_t\rho_t\,dx\\
&=\int_0^Lf_t(b_t\rho_t-D\partial_x\rho_t)\,dx
=\int_0^Lf_tJ_t\,dx.
\end{aligned}
$$

一方 $\int\partial_t\rho_t\,dx=0$ と周期境界での部分積分より

$$
\begin{aligned}
\frac{dH_t}{dt}
&=-\int_0^L\partial_t\rho_t\log(L\rho_t)\,dx\\
&=\int_0^L\partial_xJ_t\log(L\rho_t)\,dx
=-\int_0^LJ_t\partial_x\log\rho_t\,dx.
\end{aligned}
$$

二つの率を足し、$D=\mu/\beta$ と $J_t=\mu f_t\rho_t-D\rho_t'$ を代入すると

$$
\begin{aligned}
\frac{dH_t}{dt}+\beta\frac{d}{dt}\mathbb E_P[Q_{\mathrm{bath},t}]
&=\int_0^LJ_t\{\beta f_t-\partial_x\log\rho_t\}\,dx\\
&=\int_0^LJ_t\frac{\mu f_t\rho_t-D\partial_x\rho_t}{D\rho_t}\,dx\\
&=\int_0^L\frac{J_t^2}{D\rho_t}\,dx.
\end{aligned}
$$

時間積分を取って平均 $\sigma$ の平方表示を得ます。$D,\rho_t$ は正で、$J_t$ は滑らかなので平方積分は非負、積分が零なら $J_t$ は全点で零です。定義により $\mathbb E_P[\sigma]=D(P\|Q)$ も成り立ちます。

最後に平均の内部エネルギーを微分します。保存則と周期境界から

$$
\frac{d}{dt}\int_0^L\rho_tU_t\,dx
=\int_0^L\rho_t\partial_tU_t\,dx
+\int_0^L(\partial_xU_t)J_t\,dx.
$$

これと上のエントロピー率を合わせ、$\partial_xU_t=F_t-f_t$ を使うと

$$
\begin{aligned}
\frac{d}{dt}\mathcal F_t[\rho_t]
&=\int_0^L\rho_t\partial_tU_t\,dx
+F_t\int_0^LJ_t\,dx\\
&\quad-k_{\mathrm B}T\int_0^L\frac{J_t^2}{D\rho_t}\,dx.
\end{aligned}
$$

$\int J_tdx=\int b_t\rho_tdx$ は周期境界で $\int\rho_t'=0$ から従い、右辺前半は[仕事の定義](#def-itd13-driven-protocol)の平均率です。$t=0$ から $\tau$ まで積分して自由エネルギー収支を得ます。
<!-- proof-end -->

外力がなく初期密度が一定でない場合も重要です。$U_t=F_t=0$ で $\rho_0(x)\not\equiv1/L$ なら、浴熱は全経路で零ですが、拡散により $H_\tau>H_0$ となり散逸は正です。すなわち「浴へ熱が出ていないから可逆」という判定も誤りです。密度 $1/L$ へ向かう勾配が確率流を作るからです。

## 5. Jarzynski等式では逆実験の初期状態を変える

ここまでの逆実験は正方向の**実際の終端密度** $\rho_\tau$ を初期分布としました。しかしJarzynski等式には、正方向の初期状態が平衡分布であるだけでなく、逆実験の初期状態も**最終パラメータの平衡分布**にする別の比較が必要です。$\rho_\tau$ が平衡だと勝手に仮定してはいけません。

各時刻の正準分布と平衡自由エネルギーを

$$
\pi_t(x)=\frac{e^{-\beta U_t(x)}}{L\mathcal Z_t},\quad
\mathcal Z_t=\frac1L\int_0^Le^{-\beta U_t(x)}\,dx,\quad
F_{\mathrm{eq}}(t)=-k_{\mathrm B}T\log\mathcal Z_t
$$

とします。$\mathcal Z_t$ は基準長さ $L$ で割って無次元化した分配関数で、[非平衡自由エネルギー](#thm-itd13-fluctuation-current)の $\log(L\rho)$ と零点をそろえています。$F_t$（外力）と $F_{\mathrm{eq}}$（自由エネルギー）は別の量です。外力が非保存力でも、$U_t$ を用いるこの正準分布は数式上定義できますが、駆動中の定常状態が持つ密度とは一般に一致しません。

<a id="thm-itd13-jarzynski"></a>

<!-- formal-statement-start -->
> **定理（初期平衡からのJarzynski等式）**  
> [時間依存Langevin実験](#def-itd13-driven-protocol)の仮定の下で $\rho_0=\pi_0$ とする。正方向の経路法則を $P$ とし、逆プロトコルを**初期密度 $\pi_\tau$** から実行した経路法則を $P_R^{\mathrm{eq}}$、$Q_{\mathrm{eq}}=\Theta_*P_R^{\mathrm{eq}}$ とする。このとき $P\sim Q_{\mathrm{eq}}$ であり

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}
=\beta\{W-\Delta F_{\mathrm{eq}}\},\qquad
\boxed{\mathbb E_P[e^{-\beta W}]=e^{-\beta\Delta F_{\mathrm{eq}}}}
$$

> が成り立つ。ここで $\Delta F_{\mathrm{eq}}=F_{\mathrm{eq}}(\tau)-F_{\mathrm{eq}}(0)$、$W$ には時間依存ポテンシャルと外力の双方の仕事を含む。
<!-- formal-statement-end -->

### 証明の見取り図

定理のGirsanov作用の差では、逆実験の初期密度を $\pi_\tau$ に変えても線積分・時間積分の相殺は同じです。始終の正準分布の比は $\beta(\Delta U-\Delta F_{\mathrm{eq}})$ に等しく、これへ $\beta Q_{\mathrm{bath}}$ を加えます。第一法則の $\Delta U+Q_{\mathrm{bath}}=W$ が必要です。

<!-- proof-start -->
### 証明

$U_0,U_\tau$ は連続な周期関数なので $Z_0,Z_\tau$ は有限の正数で、$\pi_0,\pi_\tau$ は厳密に正です。[経路確率比の証明](#thm-itd13-girsanov-reversal)で逆側の始点密度 $\rho_\tau$ を $\pi_\tau$ に置き換えれば、同値性は保たれ

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}
=\log\frac{\pi_0(X_0)}{\pi_\tau(X_\tau)}
+\beta Q_{\mathrm{bath}}.
$$

$\log\pi_t(x)=-\beta U_t(x)-\log L-\log\mathcal Z_t$ だから、始終比では $\log L$ が相殺され

$$
\begin{aligned}
\log\frac{\pi_0(X_0)}{\pi_\tau(X_\tau)}
&=\beta\{U_\tau(X_\tau)-U_0(X_0)\}
+\log\mathcal Z_\tau-\log\mathcal Z_0\\
&=\beta\Delta U-\beta\Delta F_{\mathrm{eq}}.
\end{aligned}
$$

従って[第一法則](#def-itd13-driven-protocol)を代入して

$$
\log\frac{dP}{dQ_{\mathrm{eq}}}
=\beta(\Delta U+Q_{\mathrm{bath}}-\Delta F_{\mathrm{eq}})
=\beta(W-\Delta F_{\mathrm{eq}}).
$$

$Q_{\mathrm{eq}}$ は確率測度なので、そのRadon–Nikodym密度を積分すると

$$
1=\mathbb E_P\left[e^{-\beta(W-\Delta F_{\mathrm{eq}})}\right]
=e^{\beta\Delta F_{\mathrm{eq}}}\mathbb E_P[e^{-\beta W}].
$$

これを整理すれば求める等式です。
<!-- proof-end -->

[ITD2の有限状態のJarzynski等式](../ITD2/index.md#thm-itd2-jarzynski)と論理は対応します。ただし今回は経路測度をGirsanovで比較できたことが追加の根拠です。$\rho_0\ne\pi_0$ のとき同じ等式を無条件に使うことはできません。$\rho_\tau=\pi_\tau$ も定理の仮定ではなく、逆実験を**新しく準備**する条件です。

## 6. この証明を使える境界

- **一定の拡散係数：** $D(x)$ を入れると、Itô–Stratonovich補正と基準測度の反転対称性が変わり、熱の定義にも物理的な解釈の追加が必要です。現在の式で $D$ を $D(x)$ に置き換えるだけでは証明になりません。
- **密度の正値性と有限時間：** $\rho_0,\rho_\tau$ の正値性と有界なドリフトを使って測度の相互同値性を証明しました。初期分布が一部の状態を禁止する場合は逆向きの絶対連続性が壊れ、積分型ゆらぎ関係に絶対不可逆性の補正が必要になり得ます。
- **同じ物理模型の正逆プロトコル：** 逆側だけ力の符号を反転したり、$\rho_\tau$ と $\pi_\tau$ を取り違えたりすると、何の経路比を計算しているかが変わります。
- **古典的・過減衰・単一浴：** 慣性、複数浴、位置依存移動度、測定反作用、量子測定を含む一般結果とはしていません。これらを扱う際は経路の反転規約と浴熱の定義から再設定します。

## 7. 演習：経路比を出発点から作り直す

以下では特記しない限り $L,\tau,\mu,T>0$、$D=\mu k_{\mathrm B}T$、$\beta=(k_{\mathrm B}T)^{-1}$、$k=2\pi/L$ とします。指定された経路の値を計算する場合、零確率の厳密な端点条件を持つ事象に正の確率があるとは主張しません。

### A1. 時間依存ポテンシャルの第一法則

- Level: A
- ID: ITD13-A1
- 問題: $U_t(x)=(a_0+ct)\cos(kx)$、$F_t=F_0$ とする。任意の経路の持ち上げ変位を $Y=Z_\tau-Z_0$、$C=\int_0^\tau\cos(kX_t)dt$ と書く。$W,\Delta U,Q_{\mathrm{bath}}$ を $Y,C,X_0,X_\tau$ で表し、第一法則を確かめよ。

<!-- solution-start -->
**詳細解答**

$\partial_tU_t=c\cos(kx)$、$\partial_xU_t=-k(a_0+ct)\sin(kx)$ なので、[仕事の定義](#def-itd13-driven-protocol)から

$$
W=cC+F_0Y,
\qquad
\Delta U=(a_0+c\tau)\cos(kX_\tau)-a_0\cos(kX_0).
$$

浴熱は $\int\{F_0-\partial_xU_t\}\circ dZ$ です。[Stratonovich連鎖律](../ITD7/index.md#prop-itd7-stratonovich-balance)を $U_t(X_t)$ に適用して

$$
\int_0^\tau\partial_xU_t(X_t)\circ dZ_t
=\Delta U-\int_0^\tau\partial_tU_t(X_t)dt
=\Delta U-cC.
$$

従って $Q_{\mathrm{bath}}=F_0Y-\Delta U+cC=W-\Delta U$、つまり $\Delta U=W-Q_{\mathrm{bath}}$ です。時間依存項 $cC$ を忘れるとこの一致が壊れます。
<!-- solution-end -->

### A2. 正弦ドリフトの作用を三項へ分ける

- Level: A
- ID: ITD13-A2
- 問題: $b_t(x)=a\sin(kx)$、$a\in\mathbb R$ とする。[Girsanov作用](#thm-itd13-girsanov-reversal)の $\log(dP/dR)$ を、始点密度項、Stratonovich線積分、導関数項、二乗項に分けて書け。

<!-- solution-start -->
**詳細解答**

空間微分は $\partial_xb_t(x)=ak\cos(kx)$、平方は $b_t(x)^2=a^2\sin^2(kx)$ です。従って

$$
\begin{aligned}
\log\frac{dP}{dR}
={}&\log(L\rho_0(X_0))
+\frac{a}{2D}\int_0^\tau\sin(kX_t)\circ dZ_t\\
&-\frac{ak}{2}\int_0^\tau\cos(kX_t)dt
-\frac{a^2}{4D}\int_0^\tau\sin^2(kX_t)dt.
\end{aligned}
$$

導関数項は $\int b\,dZ=\int b\circ dZ-D\int b'\,dt$ の補正です。$a=0$ なら作用は初期密度項だけに戻ります。
<!-- solution-end -->

### A3. Novikov条件を定量的に確かめる

- Level: A
- ID: ITD13-A3
- 問題: $|b_t(x)|\le M$ が全時刻・位置で成り立つとする。Brown基準測度で $\theta_t=b_t(X_t)/\sqrt{2D}$ と置き、[Novikov条件](../../../解析系/STO/STO10/index.md#thm-sto10-novikov)が成立することを上界で示せ。

<!-- solution-start -->
**詳細解答**

$\theta_t^2=b_t(X_t)^2/(2D)\le M^2/(2D)$ だから、経路ごとに

$$
\frac12\int_0^\tau\theta_t^2dt
\le\frac{\tau M^2}{4D}.
$$

指数関数は単調増加なので

$$
\mathbb E_R\exp\left(\frac12\int_0^\tau\theta_t^2dt\right)
\le e^{\tau M^2/(4D)}<\infty.
$$

これで密度の指数部分が真のマルチンゲールを与えるための条件が確かめられます。$\tau$ を無限大へ伸ばしたときの同値性は、この有限時間の評価だけでは結論できません。
<!-- solution-end -->

### A4. 無外力でも散逸はある

- Level: A
- ID: ITD13-A4
- 問題: $U_t=F_t=0$、$\rho_0(x)=(1+\varepsilon\cos(kx))/L$、$0<\varepsilon<1$ とする。初期確率流 $J_0$ と初期エントロピー生成率を積分表示で求め、符号を判定せよ。

<!-- solution-start -->
**詳細解答**

$b=0$ で $\rho_0'=-\varepsilon k\sin(kx)/L$ です。[確率流](../ITD12/index.md#def-itd12-probability-current)から

$$
J_0=-D\rho_0'=\frac{D\varepsilon k}{L}\sin(kx).
$$

[平方積分の第二法則](#thm-itd13-fluctuation-current)へ代入すると

$$
\dot\Sigma_{\mathrm{tot}}(0)
=\int_0^L\frac{D^2\varepsilon^2k^2\sin^2(kx)/L^2}
{D(1+\varepsilon\cos(kx))/L}\,dx
=\frac{D\varepsilon^2k^2}{L}\int_0^L
\frac{\sin^2(kx)}{1+\varepsilon\cos(kx)}\,dx>0.
$$

分母は $1-\varepsilon>0$ 以上で、$\sin^2(kx)$ はほとんど至る所で正です。浴熱は零ですが、密度の偏りが消えるため系のエントロピーは増えます。
<!-- solution-end -->

### A5. ポテンシャルの基準を変えても散逸は変わらない

- Level: A
- ID: ITD13-A5
- 問題: $\widetilde U_t(x)=U_t(x)+c(t)$、$c\in C^1[0,\tau]$ とする。$f_t,W,Q_{\mathrm{bath}},\Delta F_{\mathrm{eq}}$ の変化を求め、$W-\Delta F_{\mathrm{eq}}$ が不変であることを示せ。

<!-- solution-start -->
**詳細解答**

$\partial_x\widetilde U_t=\partial_xU_t$ なので $\widetilde f_t=f_t$、経路法則と浴熱は不変です。一方

$$
\widetilde W-W=\int_0^\tau c'(t)dt=c(\tau)-c(0).
$$

正準分配関数は $\widetilde{\mathcal Z}_t=e^{-\beta c(t)}\mathcal Z_t$ ですから

$$
\widetilde F_{\mathrm{eq}}(t)=-\beta^{-1}\log\widetilde{\mathcal Z}_t
=F_{\mathrm{eq}}(t)+c(t).
$$

従って $\Delta\widetilde F_{\mathrm{eq}}-\Delta F_{\mathrm{eq}}=c(\tau)-c(0)$ であり、差 $\widetilde W-\Delta\widetilde F_{\mathrm{eq}}=W-\Delta F_{\mathrm{eq}}$ が成立します。これは自由エネルギーの零点の選択に依存しない結果です。
<!-- solution-end -->

### B1. 時間反転で消える項・残る項

- Level: B
- ID: ITD13-B1
- 問題: $b_t(x)=a(t)\sin(kx)$、$a\in C^1[0,\tau]$、$\rho_0,\rho_\tau>0$ とする。逆プロトコル $b_s^R=b_{\tau-s}$ のStratonovich作用を正方向経路で表し、$\sigma$ を求めよ。$b'$ と $b^2$ を計算から消す理由も述べよ。

<!-- solution-start -->
**詳細解答**

正方向の作用には

$$
\frac{1}{2D}\int_0^\tau a(t)\sin(kX_t)\circ dZ_t,
\quad-\frac{k}{2}\int_0^\tau a(t)\cos(kX_t)dt,
\quad-\frac{1}{4D}\int_0^\tau a(t)^2\sin^2(kX_t)dt
$$

の三項があります。逆側を $s=\tau-t$ で正方向の経路へ引き戻すと、線積分は $dZ$ の向きが逆なので負、後二項は通常の時間積分で符号が変わりません。したがって

$$
\begin{aligned}
\log\frac{dP}{dQ}
&=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\left(\frac1{2D}-\left(-\frac1{2D}\right)\right)
\int_0^\tau a(t)\sin(kX_t)\circ dZ_t\\
&=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\frac1D\int_0^\tau a(t)\sin(kX_t)\circ dZ_t.
\end{aligned}
$$

導関数項と二乗項はそれぞれ前後の経路に**同じ値で存在**するため差が零になります。個別の作用で初めから無視してよい項という意味ではありません。
<!-- solution-end -->

### B2. 一様外力と平均散逸の二通りの検算

- Level: B
- ID: ITD13-B2
- 問題: $U_t=0$、$F_t=F_0\ne0$、$\rho_0=1/L$ とする。$Y=Z_\tau-Z_0$ の分布を求め、$\mathbb E[\sigma]$ を (i) Gaussian平均と (ii) 確率流の平方積分から独立に求めよ。

<!-- solution-start -->
**詳細解答**

$Z_\tau-Z_0=\mu F_0\tau+\sqrt{2D}B_\tau$ だから

$$
Y\sim N(\mu F_0\tau,2D\tau).
$$

円周密度は常に $1/L$ なので境界密度項は零です。[経路比](#thm-itd13-girsanov-reversal)から $\sigma=\beta F_0Y$、従って

$$
\mathbb E[\sigma]=\beta F_0\mu F_0\tau
=\frac{\mu F_0^2\tau}{k_{\mathrm B}T}.
$$

他方 $J_t=\mu F_0/L$、$\rho_t=1/L$ だから

$$
\int_0^\tau\int_0^L\frac{J_t^2}{D\rho_t}\,dxdt
=\tau L\frac{(\mu F_0/L)^2}{D/L}
=\frac{\mu^2F_0^2\tau}{D}
=\beta\mu F_0^2\tau.
$$

二通りの計算は $D=\mu/\beta$ で一致します。$F_0\ne0$ でも一様定常密度だからといって散逸は零ではありません。
<!-- solution-end -->

### B3. 無外力の拡散と自由エネルギー

- Level: B
- ID: ITD13-B3
- 問題: $U_t=F_t=0$、初期密度 $\rho_0$ は正で滑らかとする。時間 $\tau$ 後の密度を $\rho_\tau$ とし、$\mathbb E[Q_{\mathrm{bath}}]$、$\mathbb E[\sigma]$、$\mathcal F_\tau-\mathcal F_0$ を求めよ。特に $\rho_0$ が非一様なら $\mathbb E[\sigma]>0$ を示せ。

<!-- solution-start -->
**詳細解答**

$f=0$ なので全ての経路で $Q_{\mathrm{bath}}=0$ です。[経路比](#thm-itd13-girsanov-reversal)より $\sigma=\log\{\rho_0(X_0)/\rho_\tau(X_\tau)\}$ で、期待値は

$$
\mathbb E[\sigma]=H_\tau-H_0
=\int_0^\tau\int_0^L\frac{D(\partial_x\rho_t)^2}{\rho_t}\,dxdt.
$$

最後の等号は $J_t=-D\rho_t'$ を[平方公式](#thm-itd13-fluctuation-current)へ代入したものです。内部エネルギーは零、$\mathcal F_t=-k_{\mathrm B}TH_t$ なので

$$
\mathcal F_\tau-\mathcal F_0
=-k_{\mathrm B}T(H_\tau-H_0)
=-k_{\mathrm B}T\mathbb E[\sigma].
$$

非一様な滑らかな $\rho_0$ ではどこかで $\rho_0'\ne0$ となります。$J_0=-D\rho_0'$ が零でない開区間を持ち、滑らかな拡散の密度は時刻について連続なので、短い正の時間にも非零です。従って時間空間の非負積分は厳密に正です。
<!-- solution-end -->

### B4. 二種類の逆実験と終端の相対エントロピー

- Level: B
- ID: ITD13-B4
- 問題: 正方向は $\rho_0=\pi_0$ から始める。実際の終端密度 $\rho_\tau$ を使う $Q$ と、最終平衡密度 $\pi_\tau$ を使う $Q_{\mathrm{eq}}$ を区別し、二つの経路対数比 $\sigma,\sigma_{\mathrm{eq}}$ の差とその平均を求めよ。平均仕事との関係も述べよ。

<!-- solution-start -->
**詳細解答**

[二つの経路比](#thm-itd13-girsanov-reversal)と[平衡初期の経路比](#thm-itd13-jarzynski)から、いずれも同じ $\beta Q_{\mathrm{bath}}$ を含むので

$$
\begin{aligned}
\sigma_{\mathrm{eq}}-\sigma
&=\log\frac{\pi_0(X_0)}{\pi_\tau(X_\tau)}
-\log\frac{\pi_0(X_0)}{\rho_\tau(X_\tau)}\\
&=\log\frac{\rho_\tau(X_\tau)}{\pi_\tau(X_\tau)}.
\end{aligned}
$$

$X_\tau\sim\rho_\tau$ なので、この差の平均は

$$
\mathbb E_P[\sigma_{\mathrm{eq}}]-\mathbb E_P[\sigma]
=\int_0^L\rho_\tau\log\frac{\rho_\tau}{\pi_\tau}\,dx
=D(\rho_\tau\|\pi_\tau)\ge0.
$$

また $\sigma_{\mathrm{eq}}=\beta(W-\Delta F_{\mathrm{eq}})$ ですから

$$
\beta\{\mathbb E_P[W]-\Delta F_{\mathrm{eq}}\}
=\mathbb E_P[\sigma]+D(\rho_\tau\|\pi_\tau).
$$

終端が非平衡なら右辺には、経路の不可逆散逸だけでなく、まだ終端分布に残った非平衡自由エネルギーの寄与があります。二種類の逆実験を混同してこの項を落としてはいけません。
<!-- solution-end -->

### C1. 時間依存の外力で三つの等式をつなぐ

- Level: C
- ID: ITD13-C1
- 問題: $U_t(x)=u(t)$（位置に依存しない、$u\in C^1[0,\tau]$）、$F_t\in C^1[0,\tau]$、$\rho_0=1/L$ とする。$A=\int_0^\tau F_t^2dt$、$K=\int_0^\tau F_t\,dB_t$ と置く。(i) $W,Q_{\mathrm{bath}},\Delta F_{\mathrm{eq}}$、(ii) 経路の $\sigma$ の平均・分散、(iii) Gaussian指数平均と確率流積分での $\mathbb E[e^{-\sigma}]$・$\mathbb E[\sigma]$ の検算を行い、$\mathbb E[e^{-\beta W}]=e^{-\beta\Delta F_{\mathrm{eq}}}$ を導け。$F_t$ の符号が途中で変わっても成立するか。

<!-- solution-start -->
**詳細解答**

位置勾配 $\partial_xU_t=0$ より $b_t=\mu F_t$、$dZ_t=\mu F_tdt+\sqrt{2D}dB_t$ です。初期一様密度は時間依存の空間平行移動とBrown拡散の下で一様のままなので $\rho_t=1/L$、境界密度項は零です。$F_t$ は確定的で位置に依存しないためStratonovich積分はItô積分と一致し、

$$
\int_0^\tau F_t\circ dZ_t
=\mu\int_0^\tau F_t^2dt
+\sqrt{2D}\int_0^\tau F_t\,dB_t
=\mu A+\sqrt{2D}K.
$$

仕事・熱は[定義](#def-itd13-driven-protocol)から

$$
Q_{\mathrm{bath}}=\mu A+\sqrt{2D}K,
\qquad W=u(\tau)-u(0)+Q_{\mathrm{bath}}.
$$

一方 $\mathcal Z_t=L^{-1}\int_0^Le^{-\beta u(t)}dx=e^{-\beta u(t)}$ だから

$$
F_{\mathrm{eq}}(t)=u(t),
\qquad \Delta F_{\mathrm{eq}}=u(\tau)-u(0).
$$

[経路比](#thm-itd13-girsanov-reversal)から

$$
\sigma=\beta Q_{\mathrm{bath}}
=\beta\mu A+\beta\sqrt{2D}K.
$$

Brown運動の確定的被積分関数に対するItô積分は $K\sim N(0,A)$ です。従って

$$
\mathbb E[\sigma]=\beta\mu A,
\qquad \operatorname{Var}(\sigma)=2D\beta^2A=2\beta\mu A.
$$

正規変数の指数積率 $\mathbb E[e^{-G}]=\exp\{-\mathbb E[G]+\operatorname{Var}(G)/2\}$ を $G=\sigma$ に適用すると

$$
\mathbb E[e^{-\sigma}]
=\exp\{-\beta\mu A+\beta\mu A\}=1.
$$

独立な平均検算として $J_t=\mu F_t/L$、$\rho_t=1/L$ を[散逸平方公式](#thm-itd13-fluctuation-current)へ代入すると

$$
\int_0^\tau\int_0^L\frac{J_t^2}{D\rho_t}\,dxdt
=\frac{\mu^2}{D}\int_0^\tau F_t^2dt
=\beta\mu A=\mathbb E[\sigma].
$$

$W=\Delta F_{\mathrm{eq}}+\beta^{-1}\sigma$ より

$$
\mathbb E[e^{-\beta W}]
=e^{-\beta\Delta F_{\mathrm{eq}}}\mathbb E[e^{-\sigma}]
=e^{-\beta\Delta F_{\mathrm{eq}}}.
$$

$F_t$ が途中で負でも $A=\int F_t^2dt\ge0$ であり全ての等式は保たれます。$F_t$ が恒等的に零なら $A=0$、$\sigma=0$、仕事は自由エネルギー差と等しくなります。
<!-- solution-end -->

## 8. 何が新しく分かったか

同じ温度・同じ拡散係数・有限時間・正密度という条件では、位置と時間に依存する力であっても、**正逆経路の確率比は境界エントロピーと浴熱の和**に帰着します。Girsanov作用中の導関数・二乗項が相殺されることが、この結論の具体的な機構です。そして経路比を平均すれば確率流の平方積分が現れます。

初期平衡からの仕事を調べるときは、逆実験を実際の終端分布ではなく最終平衡分布から準備し直すことでJarzynski等式が得られます。単なる熱力学式の暗記ではなく、**何を逆実験として比較しているか**が、使える等式を決めるのです。


