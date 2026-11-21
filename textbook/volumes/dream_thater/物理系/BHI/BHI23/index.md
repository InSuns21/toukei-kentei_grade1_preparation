# BHI23 islandなしの放射エントロピー

<!-- definition-example-audit: strict -->

## 1. 同じ浴でも「どこまで集めた放射か」で答えが変わる

[BHI22の透過接合](../BHI22/index.md#def-bhi22-transmission)では、重力側から来た右向きの物質波を非重力浴へ通す条件を定め、[出射流束](../BHI22/index.md#prop-bhi22-anomalous-flux)を境界時計のSchwarzian微分と結び付けました。しかし流束はエネルギーの移動を数える量であり、**放射領域の精細エントロピー**ではありません。本講では、出射状態の相関を浴の二端点で評価して、islandを加えない候補を実際に計算します。

[BHI17の放射領域の台帳](../BHI17/index.md#def-bhi17-radiation-ledger)と[BHI18の二端点CFT公式](../BHI18/index.md#prop-bhi18-conformal-bath)を出発点にします。浴は平坦で、計量は $ds^2=-dt^2+dx^2$、光速・$\hbar$・$k_{\rm B}$ は1、エントロピーは自然対数によるnatです。物質は左右それぞれ中心電荷 $c=\bar c>0$ のユニタリ二次元CFTとします。計算は指定した滑らかな共形真空状態についての**固定背景上の主要項**であり、JTの全量子状態を微視的に解いたという主張ではありません。

浴の接合面は $x=0$、観測区間は時刻 $t$ の同一空間断面にある

$$
R(t)=[b,L],\qquad 0<b<L,\qquad \ell_R=L-b>0
$$

です。**座標 $b,L$ は時間を変えても動かしません。** 両端に同じ正の物理的短距離cutoff $a\ll\ell_R$ を置き、接合面からの反射を含まない透過的な延長で二点twist相関を計算できる状態だけを扱います。右向き光線の座標を $u=t-x$、左向きを $v=t+x$ とします。

一定長の区間に放射が流入する場合と、過去の放射を遠方まで**蓄積**する領域とは異なります。有限の $L$ について時間を無限に進めれば区間を波が通り過ぎ、エントロピー変化は飽和します。一方、遠方端点を十分遠くに置いてから観測時刻を進めれば、流れ込んだ放射をまだ失わないHawking型の枝が現れます。二つの極限の順序を区別します。

## 2. 真空基準との差を同じ正則化で取る

量子場の区間エントロピーには両端の紫外発散と、端点規格化に依存する定数があります。異なるcutoffの絶対値を比較せず、**同じ $R(t)$、同じcutoffとtwist演算子の規格化**で、出射状態と平坦真空を比べます。

<a id="def-bhi23-no-island-ledger"></a>

<!-- formal-statement-start -->
> **定義（islandなしの放射エントロピーと真空差）**
>
> 平坦浴の区間 $R(t)=[b,L]$、$0<b<L$、cutoff $a>0$、中心電荷 $c=\bar c>0$、透過的な延長で指定した量子場の状態 $\omega$ を固定する。[正則化された区間の台帳](../BHI18/index.md#def-bhi18-cft-ledger)に従う精細エントロピーを
>
$$
S_{\rm no\text{-}island}^{(a)}(R,t;\omega)
:=S_{\rm matter}^{(a)}(R(t);\omega)
$$
>
> と呼ぶ。重力領域の新たな区間 $I$ と、その端点の幾何エントロピーは加えない。同じ端点規格化を使う平坦真空 $\omega_0$ との差は
>
$$
\Delta S_L(t):=
S_{\rm no\text{-}island}^{(a)}(R,t;\omega)
-S_{\rm no\text{-}island}^{(a)}(R,t;\omega_0)
$$
>
> とする。以下の共形スケーリング公式では、共通のcutoff発散と共通の端点定数を差し引いた普遍項を計算する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi23-no-island-ledger -->
**定義の確認**：$b=1$、$L=4$、$a=10^{-2}$、$c=1$、$t=0$、状態を平坦真空とします。$0<b<L$、$\ell_R=3\gg a$ で、観測区間は完全に浴にあり、端点もcutoffも指定しました。[透過的な平坦浴での真空区間普遍項](../BHI18/index.md#prop-bhi18-vacuum-bath)から

$$
S_{\rm no\text{-}island}^{(a)}=\frac13\ln300+k+o(1),
\qquad \Delta S_L(0)=0
$$

です。最後の差は**同じ真空状態を同じ領域で**引いたため厳密に零です。$L$ を変えることや、cutoffだけ変えて $k$ を固定することは、この差の定義には含めません。
<!-- definition-example-end -->

この差は、cutoffを除去して得る通常の相対エントロピーとは別の量です。有限cutoffでの差から、共通の端点処方における普遍項を取り出します。状態依存の非普遍的な定数や有限cutoff補正が残る一般の模型では、それらの差を別途評価する必要があります。

## 3. 右向きの出射状態を滑らかな光線写像で指定する

[BHI22の出射真空写像](../BHI22/index.md#def-bhi22-outgoing-state)では、浴の時間座標を $u$、右向き光線のラベルを $w=u-x$ と書き、$U=p(w)$ で真空を指定しました。本講では浴の時間座標を $t$ と呼ぶので、**前講の光線ラベル $w$ が本講の $u=t-x$ に当たります**。本講の $f(u)$ は前講の一般的な光線写像の具体例です。

記号 $f'(u)=df(u)/du$ は光線ラベルについての一変数導関数です。連鎖律により、位置 $x$ を固定する時間偏微分と、時刻 $t$ を固定する空間偏微分は

$$
\partial_t f(t-x)=f'(u),\qquad
\partial_x f(t-x)=-f'(u)
$$

となります。ここでは初期にはほぼ平坦真空、後期にはほぼ指数赤方偏移となる**滑らかな試験写像**を選びます。

$\kappa>0$ を逆長さの定数とし、

$$
f(u)=u-\frac1\kappa\ln(1+e^{\kappa u}),
\qquad g(v)=v
$$

とします。$f'(u)=1/(1+e^{\kappa u})>0$ なので、$f$ は全実軸上で滑らかかつ狭義単調増加します。$u\to-\infty$ では $f(u)-u\to0$、$u\to+\infty$ では $f(u)\to0$、$f'(u)\sim e^{-\kappa u}$ です。右向きの出射だけを変え、入射する左向き成分は平坦真空のままにします。

<a id="def-bhi23-smooth-outgoing-map"></a>

<!-- formal-statement-start -->
> **定義（滑らかな立上りを持つ出射CFT模型）**
>
> $\kappa>0$ と平坦浴の $u=t-x,v=t+x$ を取る。中心電荷 $c=\bar c>0$ のCFTの状態を、$U=f(u),V=g(v)$ の真空二点twist相関から引き戻して指定する。ただし
>
$$
f(u)=u-\kappa^{-1}\ln(1+e^{\kappa u}),
\qquad g(v)=v.
$$
>
> 両端で正の導関数を持つこの写像を、**滑らかな立上りを持つ出射CFT模型**と呼ぶ。共形二点公式の成立とレプリカ $n\to1$ の微分制御を仮定し、反射境界のBCFT相関には適用しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi23-smooth-outgoing-map -->
**定義の確認**：$\kappa=2$ を取ると $f(0)=-\ln2/2$、$f'(0)=1/2>0$ です。任意の実 $u$ で $e^{2u}>0$ だから $0<f'(u)<1$ が成り立ち、座標差は同符号で非零になります。$u=-5$ では $f'(u)=1/(1+e^{-10})$ でほぼ1、$u=5$ では $f'(u)=1/(1+e^{10})$ で指数的に小さくなります。$g'(v)=1>0$ も確認でき、二つのnull成分の状態指定が完了します。
<!-- definition-example-end -->

この模型は、一定温度の永遠の熱浴とは異なります。初期と後期を滑らかにつないだ**状態の選択**であり、$f$ がJTのバックリアクションを含む運動方程式を満たすかはここでは要求しません。有限の熱放射時間やエネルギーの減少を導くには、[BHI22の境界エネルギー収支](../BHI22/index.md#prop-bhi22-energy-decay)を追加して時計を解く必要があります。

## 4. 二端点のtwist相関から時間依存を計算する

二端点を $P_b=(t,b)$、$P_L=(t,L)$ とすれば、

$$
u_b=t-b,\quad u_L=t-L,\qquad
v_b=t+b,\quad v_L=t+L.
$$

記号を短くするため $q=e^{\kappa(t-b)}>0$、$H=e^{\kappa(L-b)}>1$ と置きます。このとき $e^{\kappa u_L}=q/H$ です。前節の $f$ を**両端へ別々に**代入すると、

$$
\begin{aligned}
f(u_b)-f(u_L)
&=(L-b)-\frac1\kappa
\ln\frac{1+q}{1+q/H}\\
&=\frac1\kappa\ln\frac{H+q}{1+q}>0,\\
f'(u_b)&=\frac1{1+q},\qquad
f'(u_L)=\frac1{1+q/H}.
\end{aligned}
$$

したがって[BHI18の端点尺度](../BHI18/index.md#def-bhi18-endpoint-scale)は

$$
D_f(t)=\frac1\kappa\ln\frac{H+q}{1+q}
\sqrt{(1+q)(1+q/H)},\qquad D_g=L-b=\ell_R.
$$

<a id="prop-bhi23-finite-interval"></a>

<!-- formal-statement-start -->
> **命題（固定有限区間のislandなしエントロピー）**
>
> [滑らかな出射模型](#def-bhi23-smooth-outgoing-map)で $0<b<L$、$a\ll\ell_R=L-b$ を固定し、[BHI18の共形二端点公式](../BHI18/index.md#prop-bhi18-conformal-bath)のスケーリング・レプリカ微分条件を課す。共通の端点定数 $k$ と補正を明示して、islandなしの普遍項は
>
$$
S_{\rm no\text{-}island}^{(a)}(R,t)
=\frac c6\ln\frac{D_f(t)\ell_R}{a^2}
+k+o(1)
$$
>
> である。同一処方の平坦真空との差の普遍項は
>
$$
\Delta S_L^{\rm univ}(t)
=\frac c6\ln\frac{D_f(t)}{\ell_R}.
$$
>
> $D_f$ は上で定めた正の尺度であり、端点 $b,L$ は $t$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[BHI18の共形相関公式](../BHI18/index.md#prop-bhi18-conformal-bath)へ、左右それぞれの端点尺度を代入します。入射側は真空なので $D_g=\ell_R$。真空基準では両方が $\ell_R$ となり、差でcutoffと共通端点定数が消えます。

<!-- proof-start -->
### 証明

[共形二端点命題](../BHI18/index.md#prop-bhi18-conformal-bath)に必要な $f',g'>0$ と非零の座標差は前節で確認しました。等時刻二点の光円錐差は $|u_b-u_L|=|v_b-v_L|=\ell_R$ です。入射写像 $g(v)=v$ では

$$
D_g=\frac{|g(v_L)-g(v_b)|}{\sqrt{g'(v_b)g'(v_L)}}=\ell_R.
$$

出射側の端点差・導関数を先の計算から代入すれば $D_f$ の表示を得ます。twistの二点核に対応した既出の式は

$$
S_{\rm matter}^{(a)}
=\frac c6\ln\frac{D_fD_g}{a^2}+k+o(1)
=\frac c6\ln\frac{D_f\ell_R}{a^2}+k+o(1).
$$

平坦真空では $f(u)=u,g(v)=v$ なので $D_f=D_g=\ell_R$ となり、基準の普遍項は $(c/3)\ln(\ell_R/a)+k$ です。両者を**同じ $a,b,L$ と端点定数**で引くと

$$
\frac c6\ln\frac{D_f\ell_R}{a^2}
-\frac c6\ln\frac{\ell_R^2}{a^2}
=\frac c6\ln\frac{D_f}{\ell_R}.
$$

これが主張です。一般の非普遍的な状態差まで零としたのではありません。$\square$
<!-- proof-end -->

**例：** $\kappa=1$、$\ell_R=20$、$t-b=0$、$c=1$ とすると $q=1,H=e^{20}$ です。指数を数値化する前に対数を取ると、

$$
\begin{aligned}
D_f&=\bigl[20-\ln2+\ln(1+e^{-20})\bigr]
\sqrt{2(1+e^{-20})}\simeq27.3040,\\
\Delta S_L^{\rm univ}&=\frac16\ln\frac{D_f}{20}
\simeq0.051884\ \mathrm{nat}.
\end{aligned}
$$

これは真空からの**差**であり、区間エントロピー全体の絶対値ではありません。

## 5. 有限区間は飽和する：極限の順序を確かめる

固定した $b,L$ で十分初期、つまり $t-b\to-\infty$ とすると $q\to0$ です。このとき $D_f\to\ell_R$ なので $\Delta S_L^{\rm univ}\to0$ になります。一方、同じ**有限区間**で $t\to+\infty$ とすると $q\to\infty$、かつ $q/H\to\infty$ です。端点差とJacobianを別々に極限評価すると、

$$
\begin{aligned}
f(u_b)-f(u_L)&\sim\frac{H-1}{\kappa q},\\
\sqrt{(1+q)(1+q/H)}&\sim\frac q{\sqrt H},\\
D_f(t)&\longrightarrow\frac{H-1}{\kappa\sqrt H}
=\frac2\kappa\sinh\frac{\kappa\ell_R}{2}.
\end{aligned}
$$

<a id="prop-bhi23-saturation"></a>

<!-- formal-statement-start -->
> **命題（固定有限区間の初期極限と後期飽和）**
>
> [固定有限区間の命題](#prop-bhi23-finite-interval)の仮定の下で $\kappa,\ell_R,c>0$ を固定する。このとき出射状態と平坦真空との差の普遍項は
>
$$
\lim_{t\to-\infty}\Delta S_L^{\rm univ}(t)=0,
\qquad
\lim_{t\to+\infty}\Delta S_L^{\rm univ}(t)
=\frac c6\ln\left[
\frac{2\sinh(\kappa\ell_R/2)}{\kappa\ell_R}
\right].
$$
>
> よって固定した有限浴区間から、任意に長い時間の線形成長は導けない。
<!-- formal-statement-end -->

### 証明の見取り図

初期には写像が真空の恒等写像に近付きます。後期には両端が同じ指数赤方偏移領域に入り、$q$ の因子が端点差とJacobianの間で打ち消されます。

<!-- proof-start -->
### 証明

$q\to0$ では上記の $D_f$ の式を直接代入し、$\ln H=\kappa\ell_R$ により

$$
D_f\to \kappa^{-1}\ln H=\ell_R.
$$

$q\to\infty$ では、$\ln[(H+q)/(1+q)]=\ln[1+(H-1)/(1+q)]$ と書くと、$z\to0$ で $\ln(1+z)/z\to1$ により

$$
q\ln\frac{H+q}{1+q}\to H-1.
$$

また $\sqrt{(1+q)(1+q/H)}/q\to H^{-1/2}$ です。したがって $D_f\to(H-1)/(\kappa\sqrt H)$。$H=e^{\kappa\ell_R}$ を使い $(H-1)/\sqrt H=2\sinh(\kappa\ell_R/2)$ と変形し、[有限区間の差の式](#prop-bhi23-finite-interval)へ代入します。$\square$
<!-- proof-end -->

ここで飽和するのは**固定した空間区間のエントロピー差**です。右向きの出射流束が後期まで存在することと矛盾しません。放射は $R$ に入り、やがてその外側へ進みます。すべての既放出光線を含む観測領域を取りたいなら、遠方端点の赤外処方を変えて考える必要があります。

## 6. 遠方端点を先に送るとHawking型の増大枝が現れる

有限時刻 $t$ と内側端点 $b$ を固定したまま、外側端点 $L\to\infty$ とします。この順序なら $u_L=t-L\to-\infty$ はまだ入射前の真空領域です。真空エントロピー自体は $\ln L$ で発散しますが、**同じ $L$ で先に差を取った** $\Delta S_L^{\rm univ}$ は有限極限を持ちます。

実際、$H\to\infty$ かつ $q$ は固定なので、

$$
\begin{aligned}
f(u_b)-f(u_L)
&=\ell_R-\frac1\kappa\ln(1+q)
+\frac1\kappa\ln(1+q/H),\\
\frac{f(u_b)-f(u_L)}{\ell_R}&\longrightarrow1,\\
f'(u_L)&\longrightarrow1,\qquad
f'(u_b)=\frac1{1+q}.
\end{aligned}
$$

従って $D_f/\ell_R\to\sqrt{1+q}$ です。

<a id="prop-bhi23-hawking-branch"></a>

<!-- formal-statement-start -->
> **命題（赤外差引き後のislandなしHawking型枝）**
>
> [滑らかな出射模型](#def-bhi23-smooth-outgoing-map)で $\kappa,c>0$、内側端点 $b>0$、時刻 $t$ を固定し、**同一有限区間で真空差を取ってから** $L\to\infty$ とする。このとき普遍的な差の極限は
>
$$
\Delta S_\infty^{\rm univ}(t)
=\lim_{L\to\infty}\Delta S_L^{\rm univ}(t)
=\frac c{12}\ln\bigl(1+e^{\kappa(t-b)}\bigr).
$$
>
> $s=\kappa(t-b)$ と置いた初期・後期近似は
>
$$
\Delta S_\infty^{\rm univ}(t)
=\begin{cases}
\dfrac c{12}e^s+O(e^{2s})&(s\to-\infty),\\[3pt]
\dfrac c{12}s+O(e^{-s})&(s\to+\infty).
\end{cases}
$$
>
> とくに後期の増加率は $c\kappa/12$ であり、これは重力のisland端点を加えない候補枝である。
<!-- formal-statement-end -->

### 証明の見取り図

遠方側の端点は真空のまま、近い端点の赤方偏移 $f'(t-b)$ だけが残ります。赤外長さと紫外cutoffは同一領域の真空との差で消し、残る $1+q$ の対数を初期と後期で展開します。

<!-- proof-start -->
### 証明

[有限区間の差の式](#prop-bhi23-finite-interval)を $D_f/\ell_R$ で書き、

$$
\frac{D_f}{\ell_R}
=\left[
1-\frac{\ln(1+q)}{\kappa\ell_R}
+\frac{\ln(1+q/H)}{\kappa\ell_R}
\right]\sqrt{(1+q)(1+q/H)}
$$

を得ます。$L\to\infty$ で $\ell_R\to\infty,H\to\infty$ なので、角括弧は1、最後の平方根は $\sqrt{1+q}$ に収束します。従って

$$
\Delta S_\infty^{\rm univ}
=\frac c6\ln\sqrt{1+q}
=\frac c{12}\ln(1+e^s).
$$

$s<0$ で $e^s\to0$ のときは $\ln(1+e^s)=e^s-e^{2s}/2+O(e^{3s})$。$s>0$ では

$$
\ln(1+e^s)=s+\ln(1+e^{-s})
=s+e^{-s}+O(e^{-2s}).
$$

各式へ $c/12$ を掛けて結論を得ます。$\square$
<!-- proof-end -->

**有限の赤外距離でどこまで近似できるか。** 上の $D_f/\ell_R$ の式を見ると、遠方極限への誤差を小さくするには

$$
\frac{\ln(1+q)}{\kappa\ell_R}\ll1,
\qquad \frac qH=e^{\kappa(t-L)}\ll1
$$

が必要です。つまり観測時間が $L$ へ近付きすぎると、単純な線形枝を有限の $R$ へ転用できません。

**数値検算**：$\kappa=c=1$、$\ell_R=100$ とし、$\Delta S_L^{\rm univ}$ と赤外極限式を比べます（単位nat）。

| $\kappa(t-b)$ | 有限区間の差 | 赤外極限の差 |
| ---: | ---: | ---: |
| $-4$ | $0.001482$ | $0.001512$ |
| $0$ | $0.056603$ | $0.057762$ |
| $2$ | $0.173661$ | $0.177244$ |
| $5$ | $0.408666$ | $0.417226$ |
| $10$ | $0.815777$ | $0.833337$ |

数表は $q=e^s$ を一度求めた後、巨大な $H$ を直接作らず $\ell_R+\kappa^{-1}[\ln(1+e^{s-\kappa\ell_R})-\ln(1+e^s)]$ で端点差を評価して再計算できます。$L\to\infty$ の順序を逆にすると、先の飽和命題へ戻ります。

## 7. エントロピーの傾きとエネルギー流束を別々に検算する

右向きに熱的な定常出射が始まると、[BHI22のSchwarzian流束命題](../BHI22/index.md#prop-bhi22-anomalous-flux)によって局所エネルギー流束が求まります。ただしその流束から区間エントロピー全体を積分で定義したわけではありません。**ここではtwist相関による結果と流束による結果を照合**します。

本節では出射流束を $F(u)$ と書きます（[BHI22の流束](../BHI22/index.md#prop-bhi22-anomalous-flux)の $P(u)$ と同じ量です）。計算を簡潔にするため $p(u)=e^{\kappa u}/(1+e^{\kappa u})$ と置きます。この $p$ は本節の計算に用いる無次元の補助量であり、前講で $U=p(w)$ と書いた光線写像ではありません。$p'=dp/du=\kappa p(1-p)$、$f''/f'=-\kappa p$ なので、

$$
\frac{f'''}{f'}=-\kappa^2p(1-2p),
\qquad
\{f,u\}
=\frac{f'''}{f'}-\frac32\left(\frac{f''}{f'}\right)^2
=-\kappa^2\left(p-\frac{p^2}{2}\right).
$$

<a id="prop-bhi23-flux-consistency"></a>

<!-- formal-statement-start -->
> **命題（出射エントロピーの傾きとSchwarzian流束）**
>
> [出射模型](#def-bhi23-smooth-outgoing-map)について、右向き真空のエネルギー流束を[BHI22の出射真空規約](../BHI22/index.md#prop-bhi22-anomalous-flux)に従い $F(u)=-c\{f,u\}/(24\pi)$ とする。このとき
>
$$
F(u)=\frac{c\kappa^2}{24\pi}
\left[p(u)-\frac{p(u)^2}{2}\right],
\qquad p(u)=\frac{e^{\kappa u}}{1+e^{\kappa u}}.
$$
>
> 赤外差引き後の放射エントロピーの時間変化率は
>
$$
\frac{d}{dt}\Delta S_\infty^{\rm univ}(t)
=\frac{c\kappa}{12}\,p(t-b).
$$
>
> 後期 $u,t-b\to+\infty$ にそれぞれ $F\to c\kappa^2/(48\pi)$、$d\Delta S_\infty^{\rm univ}/dt\to c\kappa/12$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

Schwarzianの計算には $f',f'',f'''$ を使います。一方、エントロピーの導関数は**赤外差を計算した後**に $t$ で微分します。後期の定常値は温度 $T=\kappa/(2\pi)$ の片向き熱成分と一致します。

<!-- proof-start -->
### 証明

$p(u)=e^{\kappa u}/(1+e^{\kappa u})$ とし、$f'=1-p$、$p'=\kappa p(1-p)$ です。まず

$$
\frac{f''}{f'}=\frac{-p'}{1-p}=-\kappa p.
$$

恒等式 $f'''/f'=(f''/f')'+(f''/f')^2$ を使うと、

$$
\frac{f'''}{f'}=-\kappa p'+\kappa^2p^2
=-\kappa^2p(1-p)+\kappa^2p^2
=-\kappa^2p(1-2p).
$$

ここからSchwarzianの表示が従い、[BHI22の流束公式](../BHI22/index.md#prop-bhi22-anomalous-flux)へ代入して $F$ を得ます。さらに[Hawking型枝の命題](#prop-bhi23-hawking-branch)の $s=\kappa(t-b)$ について

$$
\frac d{dt}\left[\frac c{12}\ln(1+e^s)\right]
=\frac{c\kappa}{12}\frac{e^s}{1+e^s}
=\frac{c\kappa}{12}p(t-b).
$$

$p(u)\to1$ を両式へ入れて後期の値が確定します。$\square$
<!-- proof-end -->

**係数を比べる。** $T=\kappa/(2\pi)$ と書けば後期の片向き流束は $\pi c T^2/12$、エントロピー増加率は $\pi cT/6$ です。これは出射が熱的な漸近領域での係数比較です。任意の非定常状態に $dS/dt=F/T$ を置く理由にはなりません。

## 8. この枝は何を予測し、どこまでか

本講の計算では、出射成分の一端にある赤方偏移が、twist二点相関のJacobianを介して赤外差の増大を作りました。有限の観測区間では飽和し、**先に赤外端点を遠ざけて放射を収集する処方**でHawking型の線形成長が現れます。

この計算で求めたのは、**islandを含めない候補の物質エントロピー**です。[BHI20のJT幾何エントロピー項](../BHI20/index.md#def-bhi20-horizon-dilaton)は加算していません。Page曲線の折返しも、無限に続く蒸発も、ここだけからは導けません。次講では浴の $R$ に加えて重力領域の候補 $I$ を指定し、物質の $R\cup I$ と幾何端点項を同じ台帳で組み立てます。

## 9. 演習：二端点・極限・流束を再構成する

すべての問題で $\kappa>0$、$c=\bar c>0$、$0<b<L$、$\ell_R=L-b$ とします。出射写像は断りがなければ本講の $f(u)=u-\kappa^{-1}\ln(1+e^{\kappa u})$、$g(v)=v$ です。数式は普遍的なスケーリング項として扱います。

### Level A：定義と一段の計算

<a id="ex-bhi23-a01"></a>
#### BHI23-A01 どの区間が固定されるか

- Level: A

時刻 $t=6$、$b=2$、$L=9$ のとき $u_b,u_L,v_b,v_L$ を求め、区間長を確かめよ。また $t$ を1増やしたときに動くものと固定されるものを区別せよ。

<!-- solution-start -->
**詳細解答**：$u=t-x$、$v=t+x$ を実際の二端点へ代入します。

$$
u_b=6-2=4,\quad u_L=6-9=-3,\quad
v_b=6+2=8,\quad v_L=6+9=15.
$$

$\ell_R=9-2=7$ で、$|u_b-u_L|=|v_L-v_b|=7$ です。時刻を7へ変えると四つのnull座標はそれぞれ1増えます。しかし空間端点 $b=2,L=9$、区間長7、同じ規約のcutoff $a$ は動かしません。時間依存は選んだ**状態の** $f(u)$ が受け取る入力から生じます。
<!-- solution-end -->

<a id="ex-bhi23-a02"></a>
#### BHI23-A02 微分の正値

- Level: A

$\kappa>0$ で $f'(u)$、$f''(u)/f'(u)$ を求め、$f$ が全実軸で単調か判定せよ。

<!-- solution-start -->
**詳細解答**：$q_u=e^{\kappa u}$ とおくと $dq_u/du=\kappa q_u$ です。連鎖律から

$$
f'(u)=1-\frac{q_u}{1+q_u}=\frac1{1+q_u},
\qquad
f''(u)=-\frac{\kappa q_u}{(1+q_u)^2}.
$$

よって

$$
\frac{f''}{f'}=-\frac{\kappa q_u}{1+q_u}.
$$

$q_u>0$ なので $f'(u)>0$ が全実軸で成り立ち、任意の $u_1<u_2$ で $f(u_1)<f(u_2)$ です。端点尺度の非零差が保証されます。
<!-- solution-end -->

<a id="ex-bhi23-a03"></a>
#### BHI23-A03 左向き成分が真空であること

- Level: A

$g(v)=v$ を固定し、等時刻区間の $D_g$ を計算せよ。$D_g=0$ にならない条件を示せ。

<!-- solution-start -->
**詳細解答**：[BHI18の端点尺度定義](../BHI18/index.md#def-bhi18-endpoint-scale)の $g'(v_b)=g'(v_L)=1$ と $v_L-v_b=L-b$ を代入します。

$$
D_g=\frac{|v_L-v_b|}{\sqrt{1\cdot1}}=L-b=\ell_R.
$$

$0<b<L$ なので $\ell_R>0$、従って $D_g$ は正で消えません。これは左向き入射成分の状態が平坦真空であることを反映します。
<!-- solution-end -->

<a id="ex-bhi23-a04"></a>
#### BHI23-A04 真空の差引き

- Level: A

$a_1=a_2=a$、$D_f=D_g=\ell_R$ のとき、区間の普遍エントロピーと同じ真空との差を求めよ。cutoff項の消失を式で確認せよ。

<!-- solution-start -->
**詳細解答**：[共形区間公式](../BHI18/index.md#prop-bhi18-conformal-bath)に代入して

$$
S_{\rm vac}^{\rm univ}=\frac c6\ln\frac{\ell_R^2}{a^2}
=\frac c3\ln\frac{\ell_R}{a}.
$$

同じ領域・同じcutoffの真空から自身を引くので

$$
\Delta S^{\rm univ}
=\frac c6\ln\frac{\ell_R^2}{a^2}
-\frac c6\ln\frac{\ell_R^2}{a^2}=0.
$$

差で $a$ と共通端点定数が消えます。異なるcutoffなら同じ式の相殺を使えません。
<!-- solution-end -->

<a id="ex-bhi23-a05"></a>
#### BHI23-A05 初期・後期の対数

- Level: A

$s\in\mathbb R$ に対して $h(s)=\ln(1+e^s)$ を考える。$s\to-\infty$ と $s\to+\infty$ の先頭二項を求めよ。

<!-- solution-start -->
**詳細解答**：$s\to-\infty$ では $z=e^s\to0$ なので

$$
h(s)=\ln(1+z)=z-\frac{z^2}{2}+O(z^3)
=e^s-\frac12e^{2s}+O(e^{3s}).
$$

$s\to+\infty$ では $1+e^s=e^s(1+e^{-s})$ を用いて

$$
h(s)=s+\ln(1+e^{-s})
=s+e^{-s}-\frac12e^{-2s}+O(e^{-3s}).
$$

単に $h(s)\sim s$ と書く前に、$s$ が正の後期であることを確認する必要があります。
<!-- solution-end -->

### Level B：公式と極限をつなぐ

<a id="ex-bhi23-b01"></a>
#### BHI23-B01 二端点の全導出

- Level: B

$q=e^{\kappa(t-b)}$、$H=e^{\kappa(L-b)}$ を使い、出射の $D_f$ と、真空との差の普遍項を**端点の代入から**導け。

<!-- solution-start -->
**詳細解答**：まず $u_b=t-b$、$u_L=t-L$ なので指数は $q,q/H$ です。写像の差を直接引くと

$$
\begin{aligned}
f(u_b)-f(u_L)
&=(u_b-u_L)-\kappa^{-1}
\ln\frac{1+e^{\kappa u_b}}{1+e^{\kappa u_L}}\\
&=\ell_R-\kappa^{-1}\ln\frac{1+q}{1+q/H}
=\kappa^{-1}\ln\frac{H+q}{1+q}.
\end{aligned}
$$

導関数の両端積は $[(1+q)(1+q/H)]^{-1}$。従って[BHI18の端点尺度](../BHI18/index.md#def-bhi18-endpoint-scale)から

$$
D_f=\kappa^{-1}\ln\frac{H+q}{1+q}
\sqrt{(1+q)(1+q/H)}.
$$

$g(v)=v$ から $D_g=\ell_R$ です。[BHI18の共形区間公式](../BHI18/index.md#prop-bhi18-conformal-bath)による $S=c\ln(D_f\ell_R/a^2)/6+k$ と、真空の $S_0=c\ln(\ell_R^2/a^2)/6+k$ の差を取れば

$$
\Delta S_L^{\rm univ}
=\frac c6\ln(D_f/\ell_R).
$$

各対数の引数は正で、共通の紫外規約が必要です。
<!-- solution-end -->

<a id="ex-bhi23-b02"></a>
#### BHI23-B02 二つの順序の極限

- Level: B

$L$ 固定で $t\to\infty$ を先に行う場合と、$t$ 固定で $L\to\infty$ を先に行う場合の $\Delta S_L^{\rm univ}$ を計算し、その後の $t\to\infty$ まで比較せよ。

<!-- solution-start -->
**詳細解答**：まず $L$ 固定で $q\to\infty$ とすると、[有限区間飽和命題](#prop-bhi23-saturation)の中間式より

$$
D_f\to\frac{H-1}{\kappa\sqrt H}
=\frac2\kappa\sinh\frac{\kappa\ell_R}{2}.
$$

よって $\Delta S_L^{\rm univ}$ は $t$ と無関係の有限定数へ収束します。一方、$t$ を固定して $L\to\infty$ なら $q$ 固定、$q/H\to0$、$D_f/\ell_R\to\sqrt{1+q}$ なので

$$
\lim_{L\to\infty}\Delta S_L^{\rm univ}
=\frac c{12}\ln(1+q).
$$

さらに赤外極限を取った関数について $t\to\infty$ とすると、$q=e^{\kappa(t-b)}$ が増え、

$$
\Delta S_\infty^{\rm univ}(t)
=\frac{c\kappa}{12}(t-b)+o(1)
$$

と線形成長します。他方、有限 $L$ で先に後期極限を取った飽和定数も、その後 $L\to\infty$ とすれば双曲線正弦の増加により発散します。つまり、反復極限を拡張実数値で比較すると

$$
\lim_{L\to\infty}\lim_{t\to\infty}\Delta S_L^{\rm univ}(t)
=\lim_{t\to\infty}\lim_{L\to\infty}\Delta S_L^{\rm univ}(t)
=+\infty
$$

です。**固定した有限区間の時間変化は飽和し、赤外極限を先に取った関数は後期に線形成長する**という違いは、二重極限の値だけからは分かりません。$L\to\infty$ で真空エントロピー単体は発散するため、比較の前に差引きが必要です。
<!-- solution-end -->

<a id="ex-bhi23-b03"></a>
#### BHI23-B03 流束の係数

- Level: B

$p=e^{\kappa u}/(1+e^{\kappa u})$ を使い、$f'''/f'$ とSchwarzian微分を導出せよ。$u\to\pm\infty$ の流束と、後期の温度 $T=\kappa/(2\pi)$ との対応を示せ。

<!-- solution-start -->
**詳細解答**：$p'=\kappa p(1-p)$、$f'=1-p$、$f''=-\kappa p(1-p)$ より

$$
\frac{f''}{f'}=-\kappa p.
$$

比の微分を使うと

$$
\frac{f'''}{f'}=
\left(\frac{f''}{f'}\right)'
+\left(\frac{f''}{f'}\right)^2
=-\kappa^2p(1-p)+\kappa^2p^2
=-\kappa^2p(1-2p).
$$

従って

$$
\{f,u\}=-\kappa^2p(1-2p)-\frac32\kappa^2p^2
=-\kappa^2(p-p^2/2).
$$

[透過浴のSchwarzian出射流束](../BHI22/index.md#prop-bhi22-anomalous-flux)を使えば

$$
F(u)=\frac{c\kappa^2}{24\pi}(p-p^2/2).
$$

$u\to-\infty$ で $p\to0$ より $F\to0$、$u\to+\infty$ で $p\to1$ より $F\to c\kappa^2/(48\pi)$。$\kappa=2\pi T$ を代入すれば $c(2\pi T)^2/(48\pi)=\pi cT^2/12$ となり、片向きの熱流束係数と一致します。
<!-- solution-end -->

<a id="ex-bhi23-b04"></a>
#### BHI23-B04 早期・後期と有限赤外誤差

- Level: B

$s=\kappa(t-b)$、$K=\kappa\ell_R$ とする。$K\gg1$、$e^{s-K}\ll1$、$\ln(1+e^s)/K\ll1$ のもとで $\Delta S_L^{\rm univ}-\Delta S_\infty^{\rm univ}$ の先頭補正を求めよ。

<!-- solution-start -->
**詳細解答**：[赤外差引き命題の証明](#prop-bhi23-hawking-branch)から

$$
\frac{D_f}{\ell_R}=
\left(1-\frac{\ln(1+e^s)}K
+\frac{\ln(1+e^{s-K})}K\right)
\sqrt{(1+e^s)(1+e^{s-K})}.
$$

$A=\ln(1+e^s)$、$r=e^{s-K}$ と書くと、$\ln(1+r)=r+O(r^2)$、$\ln(1+z)=z+O(z^2)$ により

$$
\begin{aligned}
\Delta S_L^{\rm univ}-\Delta S_\infty^{\rm univ}
&=\frac c6\left[
\ln\left(1-\frac AK+\frac{\ln(1+r)}K\right)
+\frac12\ln(1+r)\right]\\
&=\frac c6\left[
-\frac AK+\frac rK+\frac r2
+O\left(\frac{A^2}{K^2}+\frac{r^2}{K}+r^2\right)
\right].
\end{aligned}
$$

この近似は $\frac AK\ll1$ と $r\ll1$ が両方必要です。$s$ を $K$ に近づけると $r$ が小さくなくなり、有限区間の後期飽和へ移るので、この展開を使い続けることはできません。
<!-- solution-end -->

### Level C：一つの放射計算の条件を監査する

<a id="ex-bhi23-c01"></a>
#### BHI23-C01 出射状態からHawking枝まで

- Level: C

平坦浴の出射写像を $f(u)=u-\kappa^{-1}\ln(1+e^{\kappa u})$、入射写像を $g(v)=v$ とする。$R(t)=[b,L]$、$0<b<L$ で、共通cutoff $a$ の二端点CFT相関を使用できると仮定する。

1. 両端の共形尺度を求め、$S_{\rm no\text{-}island}$ と真空差を表示せよ。
2. 真空との差を取った後に $L\to\infty$ とし、初期・後期の時間依存を示せ。
3. Schwarzian流束を計算し、後期の流束とエントロピー増加率を比較せよ。
4. この計算を「固定有限区間も永遠に線形成長する」「Page曲線の折返しを示した」と解釈してはいけない理由を、失われた仮定とともに説明せよ。

<!-- solution-start -->
**詳細解答**：

**1.** 光円錐端点は $u_b=t-b,u_L=t-L,v_b=t+b,v_L=t+L$ です。$q=e^{\kappa(t-b)}$、$H=e^{\kappa(L-b)}$ を代入すると、$f$ の差と導関数は

$$
f(u_b)-f(u_L)=\frac1\kappa\ln\frac{H+q}{1+q},
\quad f'(u_b)=\frac1{1+q},
\quad f'(u_L)=\frac1{1+q/H}.
$$

よって[共形写像の端点間有効尺度](../BHI18/index.md#def-bhi18-endpoint-scale)と[共形変換で指定した浴状態の区間普遍項](../BHI18/index.md#prop-bhi18-conformal-bath)から

$$
\begin{aligned}
D_f&=\frac1\kappa\ln\frac{H+q}{1+q}\sqrt{(1+q)(1+q/H)},\\
D_g&=L-b=\ell_R,\\
S_{\rm no\text{-}island}^{(a)}
&=\frac c6\ln\frac{D_f\ell_R}{a^2}+k+o(1),\\
\Delta S_L^{\rm univ}&=\frac c6\ln(D_f/\ell_R).
\end{aligned}
$$

最初の式は端点規格化の定数とcutoff補正を含むスケーリング表示で、最後の差には同じ端点定数を使いました。

**2.** 固定した $t$ に対して $L\to\infty$ とすれば、$q$ は固定、$H\to\infty$ です。対数差の項を $\ell_R$ で割った寄与は零、$f'(u_L)\to1$ なので

$$
\lim_{L\to\infty}\frac{D_f}{\ell_R}=\sqrt{1+q},
\quad
\Delta S_\infty^{\rm univ}
=\frac c{12}\ln(1+e^{\kappa(t-b)}).
$$

$t-b\to-\infty$ では $(c/12)e^{\kappa(t-b)}+O(e^{2\kappa(t-b)})$、$t-b\to+\infty$ では $(c\kappa/12)(t-b)+O(e^{-\kappa(t-b)})$。ここで**真空差を先に取る**ことで $\ln L$ と $\ln a$ の共通成分を除いています。

**3.** $p(u)=q_u/(1+q_u)$、$q_u=e^{\kappa u}$ とすると $f''/f'=-\kappa p$、$f'''/f'=-\kappa^2p(1-2p)$。従って[Schwarzianによる出射流束](../BHI22/index.md#prop-bhi22-anomalous-flux)は

$$
F(u)=-\frac c{24\pi}\{f,u\}
=\frac{c\kappa^2}{24\pi}(p-p^2/2).
$$

後期の $p\to1$ で $F\to c\kappa^2/(48\pi)$ です。一方、[本章の増大枝](#prop-bhi23-hawking-branch)を微分すれば

$$
\frac{d\Delta S_\infty^{\rm univ}}{dt}
=\frac{c\kappa}{12}p(t-b)\longrightarrow\frac{c\kappa}{12}.
$$

これらは同じ温度 $T=\kappa/(2\pi)$ の片向き熱CFTと整合する**別種の量**です。

**4.** $L$ 固定の $t\to\infty$ では両端とも指数領域に入り、$D_f\to(2/\kappa)\sinh(\kappa\ell_R/2)$ で飽和します。赤外極限は**$t$ を固定してから**取ったので順序交換できません。またislandを入れる場合の重力端点項・物質の $R\cup I$・極値化・候補選択はまだ計算していません。後期の増大枝だけではPage曲線の折返しを証明できず、後期まで固定の $\kappa$ を保つ状態は完全蒸発のエネルギー減少も表しません。
<!-- solution-end -->

最後に、現実の蒸発ブラックホールの放射エントロピーを得るには、境界時計・量子状態・時間依存エネルギー収支・放射収集領域の選択をさらに結び付ける必要があります。ここで得た式は、その比較の**islandなし候補**として次講で再利用します。
