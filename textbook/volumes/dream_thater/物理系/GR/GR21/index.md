# GR21 線形化重力とゲージ変換

<!-- definition-example-audit: strict -->

[GR12のEinstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)は計量そのものを未知量とする非線形方程式です。[GR13のNewton極限](../GR13/index.md#thm-gr13-poisson-limit)では、弱い静的な重力場を取り出しました。しかし、光速で時間変化する小さな重力場や、近似式に現れる「座標の見かけの変化」を扱うには、静的なポテンシャルだけでは足りません。

そこで平坦時空からの小さな計量のずれを未知量に選び、Einstein方程式を**一次の偏微分方程式**へ変えます。その途中で、同じ幾何学を異なる座標で表す自由度が現れます。これがゲージ変換です。本章では、この自由度を取り除いたときに現れる波動方程式まで導きます。波の物理的偏極と観測者の応答は次のGR22で扱います。

全体を通し、4次元のMinkowski背景を固定し、直交座標 $x^\mu=(ct,x,y,z)$ と符号 $(-,+,+,+)$ を使用します。ギリシャ添字は $0,1,2,3$、空間添字は $1,2,3$ を走り、重複する上下添字は和を取ります。背景計量とその逆は

$$
\eta_{\mu\nu}=\operatorname{diag}(-1,1,1,1),
\qquad \eta^{\mu\nu}=\operatorname{diag}(-1,1,1,1).
$$

偏微分を $\partial_\mu=\partial/\partial x^\mu$、背景による添字上げを $\partial^\mu=\eta^{\mu\nu}\partial_\nu$ とし、背景の波動演算子を

$$
\Box:=\eta^{\mu\nu}\partial_\mu\partial_\nu
=-\frac{1}{c^2}\frac{\partial^2}{\partial t^2}
+\partial_x^2+\partial_y^2+\partial_z^2
$$

とします。曲率は[GR6の成分規約](../GR6/index.md#prop-gr6-coordinate-curvature)、Einsteinテンソルは[GR7の定義](../GR7/index.md#def-gr7-einstein-tensor)と同じものです。ここでは背景が平坦なので、$\eta$ による添字操作と偏微分は交換できます。

## 1. 計量のどの部分を一次として残すか

たとえば小さな数 $\epsilon$ に対し、$g_{\mu\nu}=\eta_{\mu\nu}+\epsilon k_{\mu\nu}$ と書ければ、$g$ を直接扱う代わりに $k$ の係数だけを計算できます。しかし値が小さいだけでは不十分です。$k$ が非常に速く振動すれば、二階微分が大きくなってしまいます。

以後、固定した長さ尺度 $L>0$ の座標領域で、$g(\epsilon)$ は $\epsilon$ に関して滑らかな計量族とし、$k_{\mu\nu}$ およびその一階・二階の座標微分は $\epsilon\to0$ で一様に有界とします。典型的には $k=O(1)$、$L\partial k=O(1)$、$L^2\partial\partial k=O(1)$ です。$O(\epsilon^2)$ は同じ微分尺度で評価する二次以上の項を指します。こうして初めて接続・曲率でも一次と二次を分けられます。

<a id="def-gr21-linear-perturbation"></a>

<!-- formal-statement-start -->
> **定義（Minkowski背景の線形計量摂動）**  
> 上記の4次元座標領域で、$C^2$ 級の対称テンソル $k_{\mu\nu}=k_{\nu\mu}$ と計量族 $g(\epsilon)$ が
>
$$
g_{\mu\nu}(\epsilon)=\eta_{\mu\nu}+\epsilon k_{\mu\nu}+O(\epsilon^2)
$$
>
> を満たすとき、$h_{\mu\nu}:=\epsilon k_{\mu\nu}$ を **計量摂動** と呼ぶ。$h=O(\epsilon)$ とし、$O(h^2)$ は $O(\epsilon^2)$ を表す。一次の式では $h$ を含む項を一つだけ残し、積 $h\partial h$、$(\partial h)^2$ などを捨てる。背景との跡を
>
$$
h:=\eta^{\mu\nu}h_{\mu\nu}
$$
>
> とする。背景の逆計量で上げた $h^{\mu\nu}:=\eta^{\mu\alpha}\eta^{\nu\beta}h_{\alpha\beta}$ と、未知の全計量の逆成分 $g^{\mu\nu}$ は区別する。
<!-- formal-statement-end -->

ここで $h$ の跡はスカラー、$h_{\mu\nu}$ は二階テンソルです。同じ文字でも添字の有無を見てください。逆計量の一次式は

$$
\boxed{g^{\mu\nu}=\eta^{\mu\nu}-h^{\mu\nu}+O(\epsilon^2)}
$$

です。実際に $g_{\mu\alpha}g^{\alpha\nu}=\delta_\mu^\nu$ に代入すると、一次の二項が相殺します。

<!-- definition-example-start: def-gr21-linear-perturbation -->
**定義の確認（対角の小さな変化）。** 定数 $a$ について $h_{00}=-2\epsilon a$、他成分が零の例を考えます。$h_{\mu\nu}$ は対称で、微分は零、$g_{00}=-1-2\epsilon a<0$（$|\epsilon a|$ が小さいとき）なので、計量はLorentz型です。背景による跡は $h=\eta^{00}h_{00}=2\epsilon a$、上げた成分は $h^{00}=-2\epsilon a$ です。一方、厳密な逆成分は $g^{00}=-(1+2\epsilon a)^{-1}=-1+2\epsilon a+O(\epsilon^2)$。これが $\eta^{00}-h^{00}$ と一致し、定義中の「背景で添字を上げる」操作と「全計量を逆にする」操作の差が確認できます。
<!-- definition-example-end -->

## 2. 接続から一次曲率まで計算する

[GR6の曲率成分](../GR6/index.md#prop-gr6-coordinate-curvature)は接続係数の微分と積から構成されます。いま背景のChristoffel係数は零で、未知量の一次の接続係数は一階微分だけで表せます。積 $\Gamma\Gamma$ は二次なので、曲率の一次項を得る際には残りません。この順序が非線形方程式の簡略化の核心です。

<a id="prop-gr21-linear-curvature"></a>

<!-- formal-statement-start -->
> **命題（接続・Ricci・スカラー曲率の一次式）**  
> [線形計量摂動](#def-gr21-linear-perturbation)の仮定の下で、一次の接続係数、Ricciテンソル、スカラー曲率は
>
$$
\Gamma^{(1)\rho}_{\mu\nu}
=\frac12\eta^{\rho\lambda}
(\partial_\mu h_{\lambda\nu}+\partial_\nu h_{\lambda\mu}
-\partial_\lambda h_{\mu\nu}),
$$
>
$$
\boxed{
R^{(1)}_{\mu\nu}=\frac12\left(
\partial_\rho\partial_\mu h^\rho{}_\nu+
\partial_\rho\partial_\nu h^\rho{}_\mu
-\Box h_{\mu\nu}-\partial_\mu\partial_\nu h
\right),
}
$$
>
$$
\boxed{\mathcal R^{(1)}
=\partial_\mu\partial_\nu h^{\mu\nu}-\Box h}
$$
>
> である。上付き $(1)$ は摂動パラメータについて一次の部分を意味する。
<!-- formal-statement-end -->

### 証明の見取り図

全計量の逆成分の零次項だけを接続の定義に入れます。曲率では接続の積を捨て、偏微分を二回取り、最後に背景計量で縮約します。とくにRicciの縮約添字を見失わないことが重要です。

<!-- proof-start -->
### 証明

[LORG4のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)の座標式へ $\partial_\alpha\eta_{\mu\nu}=0$ および $g^{\rho\lambda}=\eta^{\rho\lambda}+O(\epsilon)$ を入れると

$$
\begin{aligned}
\Gamma^\rho_{\mu\nu}
&=\frac12 g^{\rho\lambda}
(\partial_\mu g_{\lambda\nu}+\partial_\nu g_{\lambda\mu}
-\partial_\lambda g_{\mu\nu})\\
&=\frac12\eta^{\rho\lambda}
(\partial_\mu h_{\lambda\nu}+\partial_\nu h_{\lambda\mu}
-\partial_\lambda h_{\mu\nu})+O(\epsilon^2/L).
\end{aligned}
$$

[GR6のRiemann成分公式](../GR6/index.md#prop-gr6-coordinate-curvature)では $\Gamma\Gamma=O(\epsilon^2/L^2)$ です。したがって

$$
R^{(1)\rho}{}_{\sigma\mu\nu}
=\partial_\mu\Gamma^{(1)\rho}_{\nu\sigma}
-\partial_\nu\Gamma^{(1)\rho}_{\mu\sigma}.
$$

Ricci成分は $R_{\sigma\nu}=R^\rho{}_{\sigma\rho\nu}$ ですから、添字を $\sigma\mapsto\mu$ と読み替えると

$$
R^{(1)}_{\mu\nu}
=\partial_\rho\Gamma^{(1)\rho}_{\nu\mu}
-\partial_\nu\Gamma^{(1)\rho}_{\rho\mu}.
$$

最初の項と二番目の項を**別々に**展開します。

$$
\begin{aligned}
\partial_\rho\Gamma^{(1)\rho}_{\nu\mu}
&=\frac12\left(
\partial_\nu\partial_\rho h^\rho{}_\mu
+\partial_\mu\partial_\rho h^\rho{}_\nu
-\Box h_{\mu\nu}\right),\\
\Gamma^{(1)\rho}_{\rho\mu}
&=\frac12\left(
\partial_\rho h^\rho{}_\mu
+\partial_\mu h^\rho{}_\rho
-\partial^\rho h_{\rho\mu}\right)
=\frac12\partial_\mu h.
\end{aligned}
$$

最後の等号は $h^\rho{}_\mu=\partial^\rho$ と置いたのではなく、**$\partial_\rho h^\rho{}_\mu=\partial^\rho h_{\rho\mu}$** で第1項と第3項が相殺するためです。よって定理のRicci式を得ます。

スカラー曲率は $\mathcal R=g^{\mu\nu}R_{\mu\nu}$。背景のRicciは零なので、逆計量の一次補正とRicci一次の積は二次です。従って

$$
\begin{aligned}
\mathcal R^{(1)}
&=\eta^{\mu\nu}R^{(1)}_{\mu\nu}\\
&=\frac12\bigl(
2\partial_\rho\partial_\mu h^{\rho\mu}
-\Box(\eta^{\mu\nu}h_{\mu\nu})
-\eta^{\mu\nu}\partial_\mu\partial_\nu h\bigr)\\
&=\partial_\mu\partial_\nu h^{\mu\nu}-\Box h.
\end{aligned}
$$

$\square$
<!-- proof-end -->

**直接の検算。** $h_{00}=f(x)$、他成分零とします。静的な場合 $h=-f$、$R^{(1)}_{00}=-f''/2$、$\mathcal R^{(1)}=f''$ です。$f=-2\Phi/c^2$ なら $R^{(1)}_{00}=\Phi''/c^2$ となり、[GR13のNewton極限](../GR13/index.md#prop-gr13-einstein-00-check)の時間成分と整合します。ただし**この例は空間成分の場の方程式まで満たすとは限りません**。

## 3. Einsteinテンソルと一次の保存恒等式

Ricci曲率だけでは物質と結び付ける方程式になりません。スカラー曲率を引いた[Einsteinテンソル](../GR7/index.md#def-gr7-einstein-tensor)の一次式を求めると、微分の順序だけで発散が零になることも直接確認できます。

<a id="prop-gr21-linear-einstein"></a>

<!-- formal-statement-start -->
> **命題（線形化Einsteinテンソル）**  
> Minkowski背景の $C^2$ 級線形摂動に対し、Einsteinテンソル $G_{\mu\nu}=R_{\mu\nu}-g_{\mu\nu}\mathcal R/2$ の一次項は
>
$$
\boxed{
G^{(1)}_{\mu\nu}=\frac12\left[
\partial_\rho\partial_\mu h^\rho{}_\nu+
\partial_\rho\partial_\nu h^\rho{}_\mu
-\Box h_{\mu\nu}-\partial_\mu\partial_\nu h
-\eta_{\mu\nu}\partial_\rho\partial_\sigma h^{\rho\sigma}
+\eta_{\mu\nu}\Box h\right].}
$$
>
> $h$ が $C^3$ 級なら $\partial^\mu G^{(1)}_{\mu\nu}=0$ が恒等的に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Ricci一次式から $\eta_{\mu\nu}\mathcal R^{(1)}/2$ を引きます。発散を取ると四種類の項が対で相殺するので、物質を仮定する以前に零です。

<!-- proof-start -->
### 証明

[一次Ricciとスカラー曲率](#prop-gr21-linear-curvature)および $g_{\mu\nu}\mathcal R=\eta_{\mu\nu}\mathcal R^{(1)}+O(\epsilon^2/L^2)$ を組み合わせて表示式を得ます。

発散の計算では $A_\nu:=\partial^\mu h_{\mu\nu}$、$B:=\partial^\nu A_\nu=\partial^\mu\partial^\nu h_{\mu\nu}$ と記します。すると

$$
2G^{(1)}_{\mu\nu}
=\partial_\mu A_\nu+\partial_\nu A_\mu-\Box h_{\mu\nu}
-\partial_\mu\partial_\nu h-\eta_{\mu\nu}B+\eta_{\mu\nu}\Box h.
$$

$\partial^\mu$ を作用させて各項を書き出すと

$$
\begin{aligned}
2\partial^\mu G^{(1)}_{\mu\nu}
&=\Box A_\nu+\partial_\nu B-\Box A_\nu
-\Box\partial_\nu h-\partial_\nu B
+\partial_\nu\Box h=0.
\end{aligned}
$$

偏微分の交換には $C^3$ 級の仮定を使いました。これは[縮約Bianchi恒等式](../GR7/index.md#thm-gr7-contracted-bianchi)の線形版でもあります。$\square$
<!-- proof-end -->

なお、これは**普通の偏微分**での発散です。曲がった全計量の $\nabla^\mu G_{\mu\nu}=0$ を、誤差の評価なしで $\partial^\mu G_{\mu\nu}=0$ と置いたわけではありません。

## 4. なぜ座標変換で計量摂動が変わるのか

一般相対論では、座標だけを変えても同じ時空を記述できます。しかし背景計量 $\eta$ を固定して摂動 $h$ を比較すると、同じ幾何を表す二つの $h$ が異なって見えます。この違いが**ゲージ自由度**です。実際に座標変換のJacobianを二つ掛ければ変換則が導けます。

小さい滑らかなベクトル場 $\xi^\mu=O(\epsilon L)$ とその微分 $\partial\xi=O(\epsilon)$ を取り、一次の座標変更 $x'^\mu=x^\mu+\xi^\mu(x)$ を考えます。$\xi_\mu=\eta_{\mu\nu}\xi^\nu$ と書きます。$x$ と $x'$ は異なる座標ですが、一次近似では同じ背景点に引き戻して比較するので、$h(x'-\xi)=h(x')+O(\epsilon^2)$ となります。

実際、逆のJacobianは

$$
\frac{\partial x^\alpha}{\partial x'^\mu}
=\delta^\alpha_\mu-\partial_\mu\xi^\alpha+O(\epsilon^2).
$$

二階共変テンソルとしての計量の座標変換則に入れると

$$
\begin{aligned}
g'_{\mu\nu}(x')
&=\frac{\partial x^\alpha}{\partial x'^\mu}
  \frac{\partial x^\beta}{\partial x'^\nu}g_{\alpha\beta}(x)\\
&=(\delta^\alpha_\mu-\partial_\mu\xi^\alpha)
(\delta^\beta_\nu-\partial_\nu\xi^\beta)
(\eta_{\alpha\beta}+h_{\alpha\beta})+O(\epsilon^2)\\
&=\eta_{\mu\nu}+h_{\mu\nu}
-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu+O(\epsilon^2).
\end{aligned}
$$

背景 $\eta$ を同じ固定行列と比較しているので、残りを $h'_{\mu\nu}$ と読めます。ここで変わっているのは幾何学的な計量そのものでなく、その**成分表示**です。

<a id="def-gr21-gauge-equivalence"></a>

<!-- formal-statement-start -->
> **定義（線形ゲージ変換・純ゲージ摂動）**  
> Minkowski背景上の線形摂動 $h_{\mu\nu}$ と、$\xi^\mu$ およびその一次・二次微分が弱場の尺度で $O(\epsilon)$ となる微小座標変更 $x'^\mu=x^\mu+\xi^\mu(x)$ を取る。これに誘導される一次変換
>
$$
\boxed{h'_{\mu\nu}=h_{\mu\nu}
-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu}
$$
>
> を **線形ゲージ変換** と呼ぶ。二つの摂動がこの形で結ばれるとき一次までゲージ同値である。特に、$h_{\mu\nu}=-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu$ と表せる摂動を **純ゲージ摂動** と呼ぶ。
<!-- formal-statement-end -->

微小座標変換の符号は、ここで $x'=x+\xi$ と約束したことによります。$x'=x-\xi$ を採れば変化の符号も反転しますが、曲率が不変という結論は同じです。

<!-- definition-example-start: def-gr21-gauge-equivalence -->
**定義の確認（揺れて見える平坦計量）。** $L>0$ として、$\xi^1=\epsilon L\sin(x^0/L)$、他の $\xi^\mu=0$ を取ります。滑らかで、$\xi^1=O(\epsilon L)$、$\partial_0\xi_1=\epsilon\cos(x^0/L)$ です。$h=0$ から変換すると

$$
h'_{01}=h'_{10}=-\epsilon\cos(x^0/L),
\qquad h'_{00}=h'_{ij}=0.
$$

この摂動は非零でも、Jacobianから構成したもので定義の純ゲージ条件を満たします。例えば一次接続係数は $\Gamma^{(1)1}_{00}=\epsilon L^{-1}\sin(x^0/L)$ と非零になり、次節では曲率がなお零であることを確かめます。「Christoffel係数が零でない」だけで重力波とは判定できません。
<!-- definition-example-end -->

<a id="prop-gr21-gauge-invariance"></a>

<!-- formal-statement-start -->
> **命題（一次曲率のゲージ不変性）**  
> Minkowski背景の $C^3$ 級線形摂動が上のゲージ変換を受け、$\xi$ が必要な微分について $C^3$ 級とする。このとき一次のRiemannテンソル、Ricciテンソル、スカラー曲率、Einsteinテンソルはいずれも変わらない。純ゲージ摂動の一次曲率は零である。
<!-- formal-statement-end -->

### 証明の見取り図

摂動を変えたとき、Christoffel係数は二階微分 $-\partial_\mu\partial_\nu\xi^\rho$ だけ変わります。曲率ではこの式を反対称な二方向で微分するので消えます。

<!-- proof-start -->
### 証明

変化を $\delta h_{\mu\nu}=-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu$ と書き、[一次接続係数](#prop-gr21-linear-curvature)へ代入します。

$$
\begin{aligned}
2\delta\Gamma^{(1)\rho}_{\mu\nu}
&=\eta^{\rho\lambda}\bigl[
-\partial_\mu\partial_\lambda\xi_\nu
-\partial_\mu\partial_\nu\xi_\lambda
-\partial_\nu\partial_\lambda\xi_\mu
-\partial_\nu\partial_\mu\xi_\lambda\\
&\qquad+\partial_\lambda\partial_\mu\xi_\nu
+\partial_\lambda\partial_\nu\xi_\mu\bigr]\\
&=-2\partial_\mu\partial_\nu\xi^\rho.
\end{aligned}
$$

そこで[一次曲率](#prop-gr21-linear-curvature)の差を取ると

$$
\begin{aligned}
\delta R^{(1)\rho}{}_{\sigma\mu\nu}
&=\partial_\mu\delta\Gamma^{(1)\rho}_{\nu\sigma}
-\partial_\nu\delta\Gamma^{(1)\rho}_{\mu\sigma}\\
&=-\partial_\mu\partial_\nu\partial_\sigma\xi^\rho
+\partial_\nu\partial_\mu\partial_\sigma\xi^\rho=0.
\end{aligned}
$$

背景で縮約するとRicciとスカラー曲率の差も零になり、[線形化Einsteinテンソル](#prop-gr21-linear-einstein)の差も零です。$h=0$ なら元の一次曲率は零なので、純ゲージの曲率も零です。$\square$
<!-- proof-end -->

**何が物理的か。** 摂動の個々の成分はゲージで変わりますが、背景曲率が零のとき一次の潮汐を決めるRiemann成分は変わりません。この違いを識別して初めて、次章の波から物理的効果を読み取れます。

## 5. トレース反転で場の方程式を整理する

[線形化Einsteinテンソル](#prop-gr21-linear-einstein)には $h_{\mu\nu}$ の波動演算子に加え、跡 $h$ と発散の微分が混じっています。これを一つの組合せにまとめるのが**トレース反転**です。

<a id="def-gr21-trace-reverse"></a>

<!-- formal-statement-start -->
> **定義（4次元のトレース反転摂動）**  
> 4次元Minkowski背景に対する対称線形摂動 $h_{\mu\nu}$ について
>
$$
\boxed{\bar h_{\mu\nu}:=
h_{\mu\nu}-\frac12\eta_{\mu\nu}h}
$$
>
> を **トレース反転摂動** と呼ぶ。ここで $h=\eta^{\alpha\beta}h_{\alpha\beta}$ である。
<!-- formal-statement-end -->

定義の名前は跡を取ると意味が分かります。4次元では $\eta^{\mu\nu}\eta_{\mu\nu}=4$ なので

$$
\bar h:=\eta^{\mu\nu}\bar h_{\mu\nu}
=h-\frac12(4)h=-h.
$$

従って逆変換は $h_{\mu\nu}=\bar h_{\mu\nu}-\eta_{\mu\nu}\bar h/2$。**4次元ではトレース反転を二回行うと元へ戻る**という構造です。

<!-- definition-example-start: def-gr21-trace-reverse -->
**定義の確認（時間成分だけが残る例）。** $\varphi=\Phi/c^2$ を小さい静的関数とし、$h_{00}=-2\varphi$、$h_{0i}=0$、$h_{ij}=-2\varphi\delta_{ij}$ とします。跡は $h=2\varphi-6\varphi=-4\varphi$ です。すると

$$
\bar h_{00}=-2\varphi-\frac12(-1)(-4\varphi)=-4\varphi,
\quad
\bar h_{ij}=-2\varphi\delta_{ij}-\frac12\delta_{ij}(-4\varphi)=0,
\quad \bar h_{0i}=0.
$$

$\bar h=-\bar h_{00}=4\varphi=-h$ となり、逆変換も元の $h$ を再現します。この計量は[GR13の等方的な弱場模型](../GR13/index.md#prop-gr13-einstein-00-check)と同じです。
<!-- definition-example-end -->

<a id="prop-gr21-trace-gauge"></a>

<!-- formal-statement-start -->
> **命題（トレース反転のゲージ変換）**  
> [線形ゲージ変換](#def-gr21-gauge-equivalence)の下で
>
$$
\boxed{\bar h'_{\mu\nu}
=\bar h_{\mu\nu}-\partial_\mu\xi_\nu
-\partial_\nu\xi_\mu+\eta_{\mu\nu}\partial_\rho\xi^\rho}
$$
>
> が成り立つ。さらに
>
$$
\boxed{\partial^\mu\bar h'_{\mu\nu}
=\partial^\mu\bar h_{\mu\nu}-\Box\xi_\nu}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$h$ の跡の変化を先に求め、トレース反転の式へ代入します。最後に自由添字 $\nu$ を残して発散を取ります。

<!-- proof-start -->
### 証明

$h'_{\mu\nu}-h_{\mu\nu}=-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu$ から

$$
h'-h=\eta^{\mu\nu}(h'_{\mu\nu}-h_{\mu\nu})
=-2\partial_\rho\xi^\rho.
$$

[トレース反転の定義](#def-gr21-trace-reverse)に代入すると

$$
\begin{aligned}
\bar h'_{\mu\nu}-\bar h_{\mu\nu}
&=(h'_{\mu\nu}-h_{\mu\nu})
-\tfrac12\eta_{\mu\nu}(h'-h)\\
&=-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu
+\eta_{\mu\nu}\partial_\rho\xi^\rho.
\end{aligned}
$$

発散を取り、$\eta$ が定数であることを用いると

$$
\begin{aligned}
\partial^\mu(\bar h'_{\mu\nu}-\bar h_{\mu\nu})
&=-\Box\xi_\nu
-\partial_\nu(\partial^\mu\xi_\mu)
+\partial_\nu(\partial_\rho\xi^\rho)\\
&=-\Box\xi_\nu.
\end{aligned}
$$

$\square$
<!-- proof-end -->

## 6. 調和ゲージで見える波動方程式

トレース反転の発散を零にできると、6種類の微分項がまとめて消えます。次に**調和ゲージ（Lorenzゲージ）**を正式に定義します。名称が似ていますが、Lorentz計量の「Lorentz」と混同しないでください。

<a id="def-gr21-harmonic-gauge"></a>

<!-- formal-statement-start -->
> **定義（線形化した調和ゲージ）**  
> Minkowski背景上の $C^2$ 級トレース反転摂動 $\bar h_{\mu\nu}$ が
>
$$
\boxed{\partial^\mu\bar h_{\mu\nu}=0
\qquad(\nu=0,1,2,3)}
$$
>
> を満たすとき、調和ゲージにあるという。
<!-- formal-statement-end -->

条件は四つの方程式です。元の対称摂動は十成分を持ちますが、四条件を課しただけで独立な物理成分が六つと確定するわけではありません。条件を保つ変換がまだ残ります。

<!-- definition-example-start: def-gr21-harmonic-gauge -->
**定義の確認（静的Newton模型）。** 前節の $\bar h_{00}=-4\Phi/c^2$、$\bar h_{0i}=\bar h_{ij}=0$ を用い、$\partial_0\Phi=0$ とします。$\nu=0$ のとき $\partial^\mu\bar h_{\mu0}=-\partial_0\bar h_{00}=0$、$\nu=i$ のときすべての $\bar h_{\mu i}=0$ なので零です。四条件を個別に検証でき、静的であることが使用された位置も明確です。
<!-- definition-example-end -->

<a id="thm-gr21-linear-wave"></a>

<!-- formal-statement-start -->
> **定理（調和ゲージの線形化Einstein方程式）**  
> 4次元Minkowski背景で $\Lambda=0$ とし、$C^3$ 級の計量族 $g(\epsilon)=\eta+h+O(\epsilon^2)$ が[線形摂動の微分尺度条件](#def-gr21-linear-perturbation)を満たすとする。物質テンソルも $T_{\mu\nu}(\epsilon)=T_{\mu\nu}^{(1)}+O(\epsilon^2)$ と展開でき、背景の物質テンソルは零とする。[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)の一次項において、調和ゲージを選べば
>
$$
\boxed{\Box\bar h_{\mu\nu}=-\frac{16\pi G}{c^4}T_{\mu\nu}^{(1)}}
$$
>
> が成り立つ。整合条件として $\partial^\mu T_{\mu\nu}^{(1)}=0$ が必要である。さらに調和ゲージにある摂動へのゲージ変換が調和条件を保つ必要十分条件は
>
$$
\boxed{\Box\xi_\nu=0}
$$
>
> である。一般の摂動からこのゲージへ移すには $\Box\xi_\nu=\partial^\mu\bar h_{\mu\nu}$ を解く必要があり、指定領域・初期境界条件での可解性は別途確認する。
<!-- formal-statement-end -->

### 証明の見取り図

Einsteinテンソルを $\bar h$ で書き直し、発散を含む項をゲージ条件で消します。次に場の方程式と線形Bianchi恒等式を突き合わせます。最後に前節のゲージ変換則から、調和条件を保つ自由度を読みます。

<!-- proof-start -->
### 証明

[トレース反転](#def-gr21-trace-reverse)から $h_{\mu\nu}=\bar h_{\mu\nu}-\eta_{\mu\nu}\bar h/2$、$h=-\bar h$。これらを[線形化Einsteinテンソル](#prop-gr21-linear-einstein)に代入します。$D_\nu:=\partial^\rho\bar h_{\rho\nu}$ と置けば、まず

$$
\partial^\rho h_{\rho\nu}=D_\nu-\tfrac12\partial_\nu\bar h,
\qquad
\partial_\rho\partial_\sigma h^{\rho\sigma}
=\partial^\rho D_\rho-\tfrac12\Box\bar h.
$$

従って各項の $\partial_\mu\partial_\nu\bar h$ と $\eta_{\mu\nu}\Box\bar h$ が相殺し

$$
\boxed{
G_{\mu\nu}^{(1)}
=-\frac12\left(
\Box\bar h_{\mu\nu}-\partial_\mu D_\nu
-\partial_\nu D_\mu+\eta_{\mu\nu}\partial^\rho D_\rho
\right).
}
$$

調和条件は $D_\nu=0$ なので $G^{(1)}_{\mu\nu}=-\Box\bar h_{\mu\nu}/2$。[Einstein場の方程式](../GR12/index.md#thm-gr12-einstein-equation)で $\Lambda=0$、$\kappa=8\pi G/c^4$ と置き、背景が真空Minkowskiであるため零次の両辺が零であることを用いると

$$
-\frac12\Box\bar h_{\mu\nu}
=\frac{8\pi G}{c^4}T_{\mu\nu}^{(1)},
\qquad
\Box\bar h_{\mu\nu}=-\frac{16\pi G}{c^4}T_{\mu\nu}^{(1)}.
$$

[線形Bianchi恒等式](#prop-gr21-linear-einstein)で左辺の発散が零なので、$\kappa>0$ より $\partial^\mu T_{\mu\nu}^{(1)}=0$ が必要です。これは背景平坦座標での**一次の**保存条件であり、非線形な全物質テンソルの普通の偏微分発散が常に零という意味ではありません。

[トレース反転のゲージ変換](#prop-gr21-trace-gauge)から $D'_\nu=D_\nu-\Box\xi_\nu$。一般の場合は $D'_\nu=0$ とするには $\Box\xi_\nu=D_\nu$ が必要十分です。最初から $D_\nu=0$ なら、$D'_\nu=0$ の必要十分条件は $\Box\xi_\nu=0$ です。$\square$
<!-- proof-end -->

**可解性の射程。** $\Box\xi_\nu=D_\nu$ は時間を含む二階双曲型方程式です。滑らかなデータと適切な初期値で解く、という問題を別に持ちます。単に「四つの自由度があるから必ず解ける」と数え上げるのは論証になりません。たとえば定義例の純ゲージ $h'=-\partial\xi-\partial\xi$ は、逆変換の $-\xi$ を取れば明示的に零に戻り、調和条件を実現できます。一方、空間全域・無限遠・境界に条件を課すと許される変換が制限されます。

**真空の場合。** $T^{(1)}_{\mu\nu}=0$ なら $\Box\bar h_{\mu\nu}=0$ であり、波の形を持つ解が現れます。ただし、波動方程式を満たす全ての成分変化が物理的な重力波とは限りません。残余ゲージ $\Box\xi_\nu=0$ があるためです。

## 7. 静的Newton極限へ戻して係数を検算する

時間変化を許す一般式が正しいかは、[GR13のPoisson方程式](../GR13/index.md#thm-gr13-poisson-limit)に戻して検算できます。$|\Phi|/c^2\ll1$、空間・時間微分も弱場の尺度条件に従い、物質は低速・低圧とします。

<a id="prop-gr21-newton-check"></a>

<!-- formal-statement-start -->
> **命題（静的等方弱場のPoisson極限）**  
> 調和ゲージの弱場計量について
>
$$
h_{00}=-2\Phi/c^2,\qquad h_{0i}=0,\qquad
h_{ij}=-2\Phi\delta_{ij}/c^2
$$
>
> とし、$\partial_0\Phi=0$、$\Lambda=0$、物質の時間成分が $T_{00}^{(1)}=\rho c^2$（一次精度の主項）であるとする。このとき線形場の方程式の $00$ 成分は
>
$$
\boxed{\Delta\Phi=4\pi G\rho}
$$
>
> を与える。
<!-- formal-statement-end -->

### 証明の見取り図

トレース反転によって $00$ 成分以外が消えるのがこの模型の特徴です。波動演算子の時間微分を静的条件で消してから、係数を比較します。

<!-- proof-start -->
### 証明

[トレース反転の直接例](#def-gr21-trace-reverse)と同じ計算で、$h=-4\Phi/c^2$、$\bar h_{00}=-4\Phi/c^2$、$\bar h_{0i}=\bar h_{ij}=0$ となります。静的なので $D_\nu=0$、かつ

$$
\Box\bar h_{00}=\Delta(-4\Phi/c^2)
=-\frac4{c^2}\Delta\Phi.
$$

[調和ゲージの波動方程式](#thm-gr21-linear-wave)の $00$ 成分へ代入すると

$$
-\frac4{c^2}\Delta\Phi
=-\frac{16\pi G}{c^4}(\rho c^2)
=-\frac{16\pi G}{c^2}\rho.
$$

$-c^2/4$ を掛けて $\Delta\Phi=4\pi G\rho$ を得ます。空間成分・運動量流を一次で無視する仮定も必要です。$\square$
<!-- proof-end -->

**注意。** $\rho$ が空間で変わる現実的な静的物質模型では、厳密には圧力と境界条件も検討する必要があります。上の命題は低圧・弱場の支配的次数を比較するものであり、任意の $\rho$ について静的な厳密解が存在するという主張ではありません。また質量源があっても $h_{00}$ だけを変えて空間計量を零次に固定すると、[GR13で指摘した係数の不一致](../GR13/index.md#prop-gr13-einstein-00-check)を生みます。

## 8. 演習：座標の見かけと一次曲率を見分ける

### Level A

<a id="ex-gr21-a01"></a>
#### GR21-A01 逆計量と跡
- Level: A

$h_{00}=2a$、$h_{11}=b$、他成分零の4次元摂動を考える。$a,b=O(\epsilon)$ とし、$g^{00},g^{11},h,\bar h_{00},\bar h_{11}$ を一次まで求めよ。

<!-- solution-start -->
**詳細解答。** $\eta^{00}=-1$、$\eta^{11}=1$ なので $h=-2a+b$ です。[逆計量の一次式](#def-gr21-linear-perturbation)を使うと $h^{00}=2a$、$h^{11}=b$ より

$$
g^{00}=-1-2a+O(\epsilon^2),\qquad
g^{11}=1-b+O(\epsilon^2).
$$

[トレース反転](#def-gr21-trace-reverse)から

$$
\bar h_{00}=2a-\tfrac12(-1)(-2a+b)=a+\tfrac b2,
\quad
\bar h_{11}=b-\tfrac12(-2a+b)=a+\tfrac b2.
$$

同じ値でも二つの成分の由来は異なります。
<!-- solution-end -->

<a id="ex-gr21-a02"></a>
#### GR21-A02 一次の接続係数
- Level: A

$h_{00}=f(x^1)$、他成分零とする。$\Gamma^{(1)1}_{00}$、$\Gamma^{(1)0}_{01}$、$R^{(1)}_{00}$ を求めよ。

<!-- solution-start -->
**詳細解答。** [一次接続係数](#prop-gr21-linear-curvature)で $\partial_0h=0$ ですから

$$
\Gamma^{(1)1}_{00}=-\tfrac12\partial_1 h_{00}=-\tfrac12 f',
\quad
\Gamma^{(1)0}_{01}=\tfrac12\eta^{00}\partial_1h_{00}=-\tfrac12 f'.
$$

[Ricci一次式](#prop-gr21-linear-curvature)では $\partial_0$ を含む三項が零で、$-\Box h_{00}/2=-f''/2$ が残ります。したがって $R^{(1)}_{00}=-f''/2$ です。
<!-- solution-end -->

<a id="ex-gr21-a03"></a>
#### GR21-A03 座標変更の符号
- Level: A

$\xi^1=\alpha x^0$、他の $\xi^\mu=0$（$\alpha=O(\epsilon)$）とし、$h=0$ から得られる $h'_{01}$ とその一次曲率を求めよ。

<!-- solution-start -->
**詳細解答。** $\xi_1=\alpha x^0$、$\xi_0=0$。[ゲージ変換](#def-gr21-gauge-equivalence)から $h'_{01}=-\partial_0\xi_1-\partial_1\xi_0=-\alpha$、その他は零です。各成分は定数なので一次接続係数のすべてが零、従って一次Riemannも零です。さらに[ゲージ不変性](#prop-gr21-gauge-invariance)から、これはMinkowski背景と一次の幾何が同じであることを示します。
<!-- solution-end -->

<a id="ex-gr21-a04"></a>
#### GR21-A04 トレース反転を二度行う
- Level: A

任意の4次元対称 $h_{\mu\nu}$ について、$\bar{\bar h}_{\mu\nu}=h_{\mu\nu}$ を跡から示せ。

<!-- solution-start -->
**詳細解答。** [トレース反転](#def-gr21-trace-reverse)を一度行うと $\bar h=\eta^{\mu\nu}(h_{\mu\nu}-\eta_{\mu\nu}h/2)=h-4h/2=-h$。したがって

$$
\bar{\bar h}_{\mu\nu}
=\bar h_{\mu\nu}-\tfrac12\eta_{\mu\nu}\bar h
=(h_{\mu\nu}-\tfrac12\eta_{\mu\nu}h)
+\tfrac12\eta_{\mu\nu}h=h_{\mu\nu}.
$$

次元が4であるため係数 $1/2$ で元に戻ることに注意します。
<!-- solution-end -->

<a id="ex-gr21-a05"></a>
#### GR21-A05 調和条件の四成分
- Level: A

$\bar h_{00}=F(x^1)$、その他の $\bar h_{\mu\nu}=0$ とする。$\partial^\mu\bar h_{\mu\nu}$ の各成分と $\Box\bar h_{00}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\nu=0$ では $\partial^\mu\bar h_{\mu0}=\partial^0\bar h_{00}=-\partial_0F=0$。$\nu=1,2,3$ では $\bar h_{\mu i}=0$ なので発散は零です。[調和条件](#def-gr21-harmonic-gauge)が成り立ち、波動演算子は $\Box F=-\partial_0^2F+\partial_1^2F=F''(x^1)$ です。従って源が零なら $F''=0$ が必要で、調和条件だけでは真空場の方程式になりません。
<!-- solution-end -->

### Level B

<a id="ex-gr21-b01"></a>
#### GR21-B01 変動する純ゲージを検算する
- Level: B

$\xi^1=\epsilon L\sin(x^0/L)$、その他零とし、$h=0$ からの摂動について $h'_{01}$、$\Gamma^{(1)1}_{00}$、$R^{(1)1}{}_{001}$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [ゲージ変換](#def-gr21-gauge-equivalence)から $h'_{01}=-\epsilon\cos(x^0/L)$、他成分零です。[一次接続公式](#prop-gr21-linear-curvature)を $1,0,0$ に代入すると

$$
\Gamma^{(1)1}_{00}
=\partial_0h'_{10}=\frac{\epsilon}{L}\sin(x^0/L).
$$

また $\Gamma^{(1)1}_{10}=\tfrac12(\partial_1h_{10}+\partial_0h_{11}-\partial_1h_{10})=0$。したがって

$$
R^{(1)1}{}_{001}
=\partial_0\Gamma^{(1)1}_{10}
-\partial_1\Gamma^{(1)1}_{00}=0-0=0.
$$

この成分が零という計算だけでは全曲率零を証明したことにはなりません。[全成分のゲージ不変性](#prop-gr21-gauge-invariance)を使い、Minkowskiから変換したためすべてが零と結論します。
<!-- solution-end -->

<a id="ex-gr21-b02"></a>
#### GR21-B02 線形化Bianchi恒等式を独力で確かめる
- Level: B

$A_\nu=\partial^\mu h_{\mu\nu}$、$B=\partial^\nu A_\nu$ を用い、線形化Einsteinテンソルの発散が零になることを項ごとの打消しで示せ。必要な滑らかさも述べよ。

<!-- solution-start -->
**詳細解答。** [一次Einsteinテンソル](#prop-gr21-linear-einstein)の式を二倍すると

$$
2G^{(1)}_{\mu\nu}
=\partial_\mu A_\nu+\partial_\nu A_\mu-\Box h_{\mu\nu}
-\partial_\mu\partial_\nu h-\eta_{\mu\nu}B+\eta_{\mu\nu}\Box h.
$$

発散を取り、$\partial^\mu h_{\mu\nu}=A_\nu$、$\partial^\mu A_\mu=B$ を代入して

$$
2\partial^\mu G^{(1)}_{\mu\nu}
=\underbrace{\Box A_\nu-\Box A_\nu}_{0}
+\underbrace{\partial_\nu B-\partial_\nu B}_{0}
+\underbrace{-\Box\partial_\nu h+\partial_\nu\Box h}_{0}=0.
$$

偏微分の順序交換を使うので $h$ は少なくとも $C^3$ 級とすれば足ります。
<!-- solution-end -->

<a id="ex-gr21-b03"></a>
#### GR21-B03 残余ゲージと平面関数
- Level: B

定ベクトル $a_\nu$ と定共変ベクトル $k_\mu$ を取り、$\xi_\nu=a_\nu\cos(k_\mu x^\mu)$ とする。調和ゲージを保つ条件を求め、$k^\mu k_\mu$ の符号と波の伝播の関係を述べよ。

<!-- solution-start -->
**詳細解答。** $\partial_\alpha\xi_\nu=-a_\nu k_\alpha\sin(k_\mu x^\mu)$、二回微分して $\partial_\beta\partial_\alpha\xi_\nu=-a_\nu k_\alpha k_\beta\cos(k_\mu x^\mu)$。背景で縮約して

$$
\Box\xi_\nu=-k^\mu k_\mu\,a_\nu\cos(k_\rho x^\rho).
$$

非零の $a_\nu$ について[残余ゲージ条件](#thm-gr21-linear-wave)は $k^\mu k_\mu=0$、すなわち $-(k_0)^2+(k_1)^2+(k_2)^2+(k_3)^2=0$ です。$x^0=ct$ で $k_0=-\omega/c$ と置くと $\omega^2=c^2|\boldsymbol k|^2$。これは光速で位相が進む条件ですが、**$\xi$ 自体は座標変換の自由度**であり、純ゲージの波を物理的な重力波と同一視しません。
<!-- solution-end -->

<a id="ex-gr21-b04"></a>
#### GR21-B04 調和ゲージへ移す具体例
- Level: B

$h_{\mu\nu}=0$ から $\xi^1=\epsilon L\sin(x^0/L)$ によって作った純ゲージ $h'_{\mu\nu}$ を考える。$D'_\nu=\partial^\mu\bar h'_{\mu\nu}$ を計算し、どの微小変換を追加すれば調和ゲージへ移せるか示せ。

<!-- solution-start -->
**詳細解答。** 先の例では $h'_{01}=-\epsilon\cos(x^0/L)$、跡が零なので $\bar h'=h'$ です。$\nu=1$ に限り

$$
D'_1=\partial^0h'_{01}
=-\partial_0[-\epsilon\cos(x^0/L)]
=-\frac{\epsilon}{L}\sin(x^0/L),
$$

他の $D'_\nu$ は零。[ゲージ変換後の発散](#prop-gr21-trace-gauge)から、追加の微小座標変更を $\zeta=-\xi$ に選べば $\Box\zeta_1=-\epsilon L\Box\sin(x^0/L)=-\epsilon L(+L^{-2}\sin(x^0/L))=-\epsilon L^{-1}\sin(x^0/L)=D'_1$ です。よって $D''_1=D'_1-\Box\zeta_1=0$、他成分も零。実際に追加変換で $h''=h'+\partial\xi+\partial\xi=0$ と戻ります。
<!-- solution-end -->

### Level C

<a id="ex-gr21-c01"></a>
#### GR21-C01 接続から静的な物質源まで
- Level: C

$\Lambda=0$ の4次元Minkowski背景に、静的な滑らかな $\Phi(\boldsymbol x)$ による小さい摂動

$$
h_{00}=-2\Phi/c^2,\quad h_{0i}=0,\quad
h_{ij}=-2\Phi\delta_{ij}/c^2
$$

を与える。弱場微分の尺度条件を仮定する。

1. 跡とトレース反転摂動を求め、調和条件を四成分で確認せよ。
2. $R^{(1)}_{00}$、$\mathcal R^{(1)}$、$G^{(1)}_{00}$ を接続または一次曲率式から直接求めよ。
3. 低速物質で $T_{00}^{(1)}=\rho c^2$、$T_{0i}^{(1)}=T_{ij}^{(1)}=0$ を先頭次数に用い、場の方程式がPoisson方程式に帰着することを示せ。
4. この計量へ任意の十分滑らかな微小ゲージ変換を加えた場合、(2)の曲率はどうなるか。$\Phi$ に空間依存があることだけで物理的重力波とは言えない理由を述べよ。

<!-- solution-start -->
**詳細解答。** **(1)** $\varphi=\Phi/c^2$ と書くと $h=\eta^{00}(-2\varphi)+\delta^{ij}(-2\varphi\delta_{ij})=2\varphi-6\varphi=-4\varphi$。したがって

$$
\bar h_{00}=-2\varphi-\tfrac12(-1)(-4\varphi)=-4\varphi,\quad
\bar h_{ij}=-2\varphi\delta_{ij}+2\varphi\delta_{ij}=0,\quad
\bar h_{0i}=0.
$$

$\nu=0$ の発散は $D_0=-\partial_0\bar h_{00}=0$（静的条件）、$\nu=i$ の発散はすべての $\bar h_{\mu i}$ が零なので $D_i=0$ です。

**(2)** [一次Ricci](#prop-gr21-linear-curvature)に代入します。静的なので $R^{(1)}_{00}=-\Box h_{00}/2=\Delta\varphi$。スカラー曲率では

$$
\begin{aligned}
\partial_\mu\partial_\nu h^{\mu\nu}
&=\partial_i\partial_j(-2\varphi\delta^{ij})=-2\Delta\varphi,\\
\Box h&=\Delta(-4\varphi)=-4\Delta\varphi,\\
\mathcal R^{(1)}
&=-2\Delta\varphi-(-4\Delta\varphi)=2\Delta\varphi.
\end{aligned}
$$

[Einsteinテンソルの定義](../GR7/index.md#def-gr7-einstein-tensor)を一次まで使い

$$
G^{(1)}_{00}=R^{(1)}_{00}-\tfrac12\eta_{00}\mathcal R^{(1)}
=\Delta\varphi+\Delta\varphi=2\Delta\Phi/c^2.
$$

**(3)** [場の方程式](../GR12/index.md#thm-gr12-einstein-equation)を $00$ 成分に適用すると $2\Delta\Phi/c^2=(8\pi G/c^4)\rho c^2$。両辺に $c^2/2$ を掛けて $\Delta\Phi=4\pi G\rho$ です。静的で非零の任意の $\rho$ が厳密な零圧物質解になるという意味ではなく、指定した近似次数の整合を確かめています。

**(4)** [一次曲率のゲージ不変性](#prop-gr21-gauge-invariance)によって $R^{(1)}_{\mu\nu\rho\sigma}$、その縮約、$G^{(1)}$ は変わりません。$\Phi$ の勾配は測地線の座標加速度に影響しますが、純ゲージ成分は曲率を作らず、また静的な潮汐場は伝播する重力波とは異なります。波の物理的部分を取り出すには、波動方程式だけでなくゲージと観測量を併せて調べる必要があります。
<!-- solution-end -->

---

本章で得たのは、非線形な重力の方程式が**弱い摂動では波動方程式に落ちる**という結果と、**座標変換で消せる揺れは物理的な曲率を生まない**という判定法です。次のGR22では、真空の波動解から残余ゲージを整理し、観測者が測る潮汐と二つの偏極へ進みます。
