# GEOD15 球面メルカトルと球面横メルカトル

地表を平面へ写すとき、経線を縦の直線にするのが正軸メルカトルです。しかし高緯度ほど長さが大きく伸び、極は有限の地図へ入りません。地域を南北に細長く描くなら、**伸びが最小になる線を赤道から中央子午線へ移す**発想が自然です。それが横メルカトルの出発点です。

[GEOD14の等角座標](../GEOD14/index.md#thm-geod14-isometric-integral)では、球面上の緯度を無次元の直線座標へ変える方法を学びました。ここでは実際の投影を作り、[GEOD13の縮尺判定](../GEOD13/index.md#thm-geod13-preservation-tests)で長さと面積の歪みを数値まで確かめます。到達目標は次の五つです。

1. 正軸メルカトルの順逆変換・縮尺・極での発散を求める。
2. 球面を回転して横メルカトルの順変換と逆変換を導く。
3. 東・北の単位接方向に対するJacobianを計算し、等角性と面積縮尺を検算する。
4. 中央子午線では距離が保存され、横へ離れると伸びることを式で説明する。
5. 球面と楕円体の投影式の違いを判定する。

球面の半径を $R>0$ とします。地理緯度は $-\pi/2<\phi<\pi/2$、東を正とする経度は $\lambda$ です。中央子午線を $\lambda_0$ とし、経度差 $\delta=\lambda-\lambda_0$ は指定した切れ目から選ぶ**ラジアン**の実数です。

平面では東向きを正とする座標 $E$、北向きを正とする座標 $N_p$ を用い、原点を赤道と中央子午線の交点に置きます。添字 $p$ は[GEOD13の投影座標](../GEOD13/index.md#def-geod13-projection-jacobian)と同じく、楕円体の卯酉線曲率半径 $N(\phi)$ との区別です。投影座標 $E,N_p$ は長さの単位を持ち、角度 $\phi,\delta$ と区別します。

---

## 1. 正軸メルカトル：緯度だけ目盛りを伸ばす

### 1.1 なぜ緯度をそのまま縦軸にできないか

球面の微小距離は[GEOD4の計量の球面極限](../GEOD4/index.md#thm-geod4-ellipsoid-metric)によって

$$
ds^2=R^2(d\phi^2+\cos^2\phi\,d\delta^2)
$$

です。同じ経度増分でも緯線上の長さは $R\cos\phi\,d\delta$ となります。横軸を $E=R\delta$ と選ぶなら、角度を保つため縦軸の微分も $dN_p=R\,d\phi/\cos\phi$ だけ伸ばす必要があります。これを赤道から積分したものが、[GEOD14の球面等角座標](../GEOD14/index.md#thm-geod14-isometric-integral)です。

<a id="def-geod15-normal-mercator"></a>
<!-- formal-statement-start -->
> **定義（球面正軸メルカトル投影）**
> 半径 $R>0$ の球面で、$-\pi/2<\phi<\pi/2$、切れ目を選んだ開区間内の経度差 $\delta$ に対し、赤道・中央子午線を原点とする正軸メルカトル投影を

$$
\boxed{E=R\delta,\qquad N_p=R\psi(\phi),\qquad
\psi(\phi)=\operatorname{atanh}(\sin\phi)
=\log\tan\left(\frac\pi4+\frac\phi2\right)}
$$

> で定義する。$\operatorname{atanh}t=\frac12\log((1+t)/(1-t))$ は $|t|<1$ で用いる。$\delta$ は一価な枝として選んだ実数であり、経度の周期性はこの式だけでは処理しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod15-normal-mercator -->
**定義の確認**。赤道と中央子午線の交点 $\phi=\delta=0$ は、定義式により $E=N_p=0$ に写ります。赤道上を東へ $\delta=\pi/6$ 進めると

$$
E=\frac{\pi R}{6}>0,\qquad N_p=R\operatorname{atanh}(0)=0
$$

です。一方、中央子午線上の北緯 $\phi=\pi/6$ では $\sin\phi=1/2$ なので

$$
E=0,\qquad N_p=\frac R2\log3>0.
$$

どちらも $|\phi|<\pi/2$ の定義域に入り、原点・東北の向き・緯度に応じた伸びを定義の式から確認できました。
<!-- definition-example-end -->

<a id="thm-geod15-normal-scale"></a>
<!-- formal-statement-start -->
> **定理（正軸メルカトルの等角性・縮尺・逆変換）**
> 前定義の球面の非極点と一つの経度枝で、正軸メルカトルは向きを保つ局所等角投影である。方向によらない局所縮尺 $k$ と面積縮尺 $A_p$ は

$$
\boxed{k=\sec\phi=\frac1{\cos\phi},\qquad A_p=\sec^2\phi}
$$

> となる。選んだ枝の像上で逆変換は

$$
\boxed{\delta=\frac ER,\qquad
\phi=\arcsin\left(\tanh\frac{N_p}{R}\right)}
$$

> で与えられ、$\phi\to\pm\pi/2$ で $N_p\to\pm\infty$ かつ $k\to+\infty$ となる。
<!-- formal-statement-end -->

**証明の見取り図。** 正軸の縦・横方向の微分が、球面の対応する二方向を同じ倍率で伸ばすことを確認します。逆変換は $\operatorname{atanh}$ と $\tanh$ を打ち消し、極限は $\sin\phi\to\pm1$ を使います。

<!-- proof-start -->
### 証明

$\psi'(\phi)=d\psi/d\phi=1/\cos\phi$ と、微分する変数が $\phi$ であることを明記します。定義式を微分して $dE=R\,d\delta$、$dN_p=R\,d\phi/\cos\phi$ です。平面の長さと球面の長さを比較すると

$$
\begin{aligned}
dE^2+dN_p^2
&=R^2\left(d\delta^2+\frac{d\phi^2}{\cos^2\phi}\right)\\
&=\frac1{\cos^2\phi}
R^2\left(\cos^2\phi\,d\delta^2+d\phi^2\right)
=\frac1{\cos^2\phi}\,ds^2.
\end{aligned}
$$

向きと縮尺を同じ基底で判定します。入力の東・北の物理的な単位変位は $(R\cos\phi\,d\delta,\ R\,d\phi)$ です。この東・北順の基底に関する正規化Jacobianは

$$
B_{\mathrm{normal}}
=\begin{pmatrix}
\frac{E_\delta}{R\cos\phi}&\frac{E_\phi}{R}\\
\frac{(N_p)_\delta}{R\cos\phi}&\frac{(N_p)_\phi}{R}
\end{pmatrix}
=\begin{pmatrix}\sec\phi&0\\0&\sec\phi\end{pmatrix}.
$$

ここで下付き添字 $\delta,\phi$ は他方の角度を固定した偏微分を表します。$B_{\mathrm{normal}}^\mathsf TB_{\mathrm{normal}}=\sec^2\phi\,I$ で、$\det B_{\mathrm{normal}}=\sec^2\phi>0$ です。[GEOD13の物理的単位方向への正規化](../GEOD13/index.md#thm-geod13-metric-comparison)と[等角・面積判定](../GEOD13/index.md#thm-geod13-preservation-tests)から、向き保存、$k=\sec\phi$、$A_p=k^2$ が従います。

$N_p/R=\operatorname{atanh}(\sin\phi)$ の両辺に $\tanh$ を作用させると $\sin\phi=\tanh(N_p/R)$。$-\pi/2<\phi<\pi/2$ なので $\arcsin$ で一意に戻せます。$E$ の式も $\delta=E/R$ と解けます。

最後に $\phi\to\pm\pi/2$ では $\sin\phi\to\pm1$、$\operatorname{atanh}(\sin\phi)\to\pm\infty$、$\cos\phi\to0^+$。よって主張の二つの発散が従います。
<!-- proof-end -->

**数値の意味。** 赤道で $k=1$、緯度 $60^\circ$ では $k=2$、面積縮尺は $4$ です。縮尺とは極からの距離を4倍にする意味ではなく、**その点の十分小さい面積**が4倍になる意味です。地理経度を同じ数値に固定しても、極に近づくほど地表の緯線方向の長さが縮む一方、地図の横幅は一定なのが原因です。

---

## 2. 球を回して伸びの少ない線を中央子午線にする

正軸では縮尺 $1$ の線は赤道でした。今度は赤道と中央子午線の交点を地図の中心に保ちつつ、**中央子午線を伸びない線**にします。そのため球の座標軸を90度回し、元の東西方向を新しい「緯度」の方向に取ります。

地心から見た単位球面上の位置を、中央子午線から測った直交成分で

$$
(x,y,z)=(\cos\phi\cos\delta,\ \cos\phi\sin\delta,\ \sin\phi)
$$

と置きます。$x$ は中央子午線に向いた赤道方向、$y$ は赤道上の東方向、$z$ は北極方向です。$x^2+y^2+z^2=1$。この三成分は長さではなく無次元で、実際の位置ベクトルは $R(x,y,z)$ です。

新しい緯度 $\alpha$ は東方向の成分 $y$ を $\sin\alpha$ とする角、新しい経度 $\beta$ は $x$-$z$ 平面で $x$ から北向きに測る角とします。$x>0$ の半球を選べば $\beta\in(-\pi/2,\pi/2)$ となり、枝が一意です。この半球は地理的な座標で $|\phi|<\pi/2,\ |\delta|<\pi/2$ を含みます（地理的な極はその境界上）。

<a id="def-geod15-transverse"></a>
<!-- formal-statement-start -->
> **定義（回転球面座標と球面横メルカトル投影）**
> 半径 $R>0$ の球面の開半球

$$
H=\{(x,y,z):x^2+y^2+z^2=1,\ x>0\}
$$

> で、回転球面座標とその等角な子午座標を

$$
\alpha=\arcsin y,\qquad
\beta=\operatorname{atan2}(z,x)\in(-\pi/2,\pi/2),
\qquad \eta=\operatorname{atanh}(\sin\alpha)=\operatorname{atanh}y
$$

> とする。これらによる**球面横メルカトル投影**を、東・北座標の順に

$$
\boxed{E=R\eta,\qquad N_p=R\beta}
$$

> と定義する。$\operatorname{atan2}(u,v)$ は $(v,u)$ の方向角を指定枝で返す関数であり、ここでは $x>0$ のため $-\pi/2<\beta<\pi/2$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod15-transverse -->
**定義の確認**。$\phi=\delta=0$ では $(x,y,z)=(1,0,0)$、$\alpha=\beta=\eta=0$ となり地図原点です。赤道を東へ $30^\circ$ 進むと $(x,y,z)=(\sqrt3/2,1/2,0)$ で $x>0$。$\eta=\operatorname{atanh}(1/2)=\frac12\log3>0$、$\beta=0$ なので $E>0,N_p=0$ です。一方、中央子午線上で北緯 $30^\circ$ なら $(x,y,z)=(\sqrt3/2,0,1/2)$、$\eta=0,\beta=\pi/6$。$E=0,N_p=\pi R/6$ となり、東・北の向きと原点の両方が合います。
<!-- definition-example-end -->

**なぜ等角になるか。** 回転球面の位置表示と、半径 $R$ を掛けた位置ベクトルは

$$
(x,y,z)=(\cos\alpha\cos\beta,\ \sin\alpha,\ \cos\alpha\sin\beta),
\qquad \boldsymbol r=R(x,y,z)
$$

です。この表示が定義の成分と一致するのは、$y=\sin\alpha$、$x^2+z^2=\cos^2\alpha$、および $x>0$ で選んだ $\beta$ の枝によります。$\alpha,\beta$ の一方を固定して他方で偏微分すると

$$
\begin{aligned}
\boldsymbol r_\alpha&=R(-\sin\alpha\cos\beta,\ \cos\alpha,\ -\sin\alpha\sin\beta),\\
\boldsymbol r_\beta&=R(-\cos\alpha\sin\beta,\ 0,\ \cos\alpha\cos\beta).
\end{aligned}
$$

両者の内積を計算すれば交差項が消え、

$$
\boldsymbol r_\alpha\cdot\boldsymbol r_\beta=0,\qquad
\|\boldsymbol r_\alpha\|^2=R^2,\qquad
\|\boldsymbol r_\beta\|^2=R^2\cos^2\alpha.
$$

従って第一基本形式は

$$
ds^2=R^2(d\alpha^2+\cos^2\alpha\,d\beta^2).
$$

また $x>0$ では $|\alpha|<\pi/2$ で $\cos\alpha>0$ です。$\eta=\operatorname{atanh}(\sin\alpha)$ を微分すると

$$
\frac{d\eta}{d\alpha}
=\frac{\cos\alpha}{1-\sin^2\alpha}
=\frac1{\cos\alpha}>0,\qquad
d\alpha=\cos\alpha\,d\eta.
$$

これを先ほどの計量へ代入し、

$$
\boxed{ds^2=R^2\cos^2\alpha(d\eta^2+d\beta^2)}
$$

を得ます。これは[前節の正軸メルカトルの等角計量](#thm-geod15-normal-scale)を、球を回した座標で使ったものです。地理緯度 $\phi$ をそのまま $\alpha$ の場所へ代入したのではありません。

---

## 3. 横メルカトルの順変換と逆変換

### 3.1 緯度・経度から東・北へ

$y=\cos\phi\sin\delta$ と $\beta=\operatorname{atan2}(\sin\phi,\cos\phi\cos\delta)$ を[回転座標の定義](#def-geod15-transverse)へ代入すれば、実務で使える順変換が得られます。$|\delta|<\pi/2$ なら $\cos\delta>0$ なので、非極点では分母を失うことなく $\beta=\arctan(\tan\phi/\cos\delta)$ とも書けます。

<a id="thm-geod15-transverse-inverse"></a>
<!-- formal-statement-start -->
> **定理（球面横メルカトルの順逆変換と定義域）**
> $R>0$、$-\pi/2<\phi<\pi/2$、$-\pi/2<\delta<\pi/2$ とする。前定義の球面横メルカトルは、この領域と平面帯 $E\in\mathbb R,\ -\pi R/2<N_p<\pi R/2$ との間の滑らかな一対一対応であり、順変換は

$$
\boxed{\begin{aligned}
E&=R\operatorname{atanh}(\cos\phi\sin\delta),\\
N_p&=R\arctan\left(\frac{\tan\phi}{\cos\delta}\right)
\end{aligned}}
$$

> となる。逆変換では $\eta=E/R,\ \beta=N_p/R$ と置き、

$$
\boxed{\begin{aligned}
\phi&=\arcsin\left(\frac{\sin\beta}{\cosh\eta}\right),\\
\delta&=\operatorname{atan2}(\sinh\eta,\cos\beta)
\end{aligned}}
$$

> を用いる。すべての逆三角関数は指定した角度枝で評価する。別の半球へ同じ逆関数の枝を無条件に延長しない。
<!-- formal-statement-end -->

**証明の見取り図。** $\eta=\operatorname{atanh}y$ から $y$ を戻し、残る $x,z$ は単位球面条件と方向角 $\beta$ から復元します。その後、元の $\sin\phi=z$ と $\tan\delta=y/x$ に戻ります。

<!-- proof-start -->
### 証明

順変換は $y=\cos\phi\sin\delta$ および $\tan\beta=z/x=\tan\phi/\cos\delta$ を定義へ代入した式です。$x>0$ なので $\beta$ は必ず $(-\pi/2,\pi/2)$ に入ります。

逆方向では $\eta=\operatorname{atanh}y$ から

$$
y=\tanh\eta,\qquad
\sqrt{x^2+z^2}=\sqrt{1-y^2}
=\sqrt{1-\tanh^2\eta}=\frac1{\cosh\eta}.
$$

$x>0$ と $\beta=\operatorname{atan2}(z,x)$ を使えば、符号まで確定して

$$
x=\frac{\cos\beta}{\cosh\eta},\qquad
z=\frac{\sin\beta}{\cosh\eta}.
$$

地理緯度は $z=\sin\phi$ で範囲 $(-\pi/2,\pi/2)$ にあるから、$\phi=\arcsin(\sin\beta/\cosh\eta)$ です。さらに $x=\cos\phi\cos\delta>0$、$y=\cos\phi\sin\delta$ より

$$
\delta=\operatorname{atan2}(y,x)
=\operatorname{atan2}\left(\tanh\eta,\frac{\cos\beta}{\cosh\eta}\right)
=\operatorname{atan2}(\sinh\eta,\cos\beta).
$$

逆に任意の $\eta\in\mathbb R$、$\beta\in(-\pi/2,\pi/2)$ からこの $x,y,z$ を作ると、$x>0$、$x^2+y^2+z^2=1$ が成り立ちます。従って与えた経緯度範囲へ戻り、順変換も元の $\eta,\beta$ を返します。各段階は分母が0にならない開領域で滑らかなので、一対一の滑らかな逆写像です。
<!-- proof-end -->

**境界を読み違えない。** 赤道上で $\delta\to\pm\pi/2$ とすると、$y=\sin\delta\to\pm1$、従って $E\to\pm\infty$。そこは回転後の新しい極、つまり横メルカトルの発散点です。地理的な北極・南極とは異なります。また $x=0$ はこの章で選んだ半球の境界であり、半球の外へ投影を拡張する問題と経度の枝の選択は別問題です。

---

## 4. 中央子午線から離れるほど何が伸びるか

地図上の数値の増え方と、実際の地表距離の増え方を同じものと思ってはいけません。[GEOD13の物理的単位方向への正規化](../GEOD13/index.md#thm-geod13-metric-comparison)を球面に適用します。地表上の東・北の単位接方向は

$$
\boldsymbol e_{\mathrm E}=\frac1{R\cos\phi}\partial_\delta,\qquad
\boldsymbol e_{\mathrm N}=\frac1R\partial_\phi
$$

です。$\partial_\delta$ は $\phi$ を固定した経度方向の微分を表します。中央子午線 $\lambda_0$ を固定すれば $\delta=\lambda-\lambda_0$ から $\partial_\delta=\partial_\lambda$ です。$\partial_\phi$ は $\delta$ を固定した緯度方向の微分です。

球面計量から東の長さ増分は $R\cos\phi\,d\delta$、北は $R\,d\phi$ となります。この係数でJacobianの東列・北列をそれぞれ割ってから比較します。

<a id="thm-geod15-transverse-distortion"></a>
<!-- formal-statement-start -->
> **定理（横メルカトルのJacobianと局所歪み）**
> 前定理の領域で

$$
D=1-\cos^2\phi\sin^2\delta
=\cos^2\delta+\sin^2\phi\sin^2\delta>0
$$

> と置く。球面横メルカトルは向きを保ち、全接方向に同じ局所縮尺を持つ。その縮尺 $k$ と面積縮尺 $A_p$ は

$$
\boxed{k=\frac1{\sqrt D},\qquad A_p=\frac1D}.
$$

> 特に中央子午線 $\delta=0$ では $E=0,\ N_p=R\phi,\ k=A_p=1$。固定した $|\delta|<\pi/2$ について

$$
1\le k\le\frac1{\cos\delta},
$$

> 右端の値は赤道 $\phi=0$ で達成される。
<!-- formal-statement-end -->

**証明の見取り図。** [GEOD13の計量比較](../GEOD13/index.md#thm-geod13-preservation-tests)を、球面の単位東・北接方向に適用します。Jacobianの二列が互いに直交し、同じ長さを持つことを直接計算します。

<!-- proof-start -->
### 証明

以下、$\eta_\delta=\partial\eta/\partial\delta$ は $\phi$ を固定した偏微分、$\eta_\phi=\partial\eta/\partial\phi$ は $\delta$ を固定した偏微分と書き、$\beta$ と平面成分 $E,N_p$ の下付き添字にも同じ規則を使います。まず $\eta=\operatorname{atanh}(\cos\phi\sin\delta)$ について連鎖律を使うと

$$
\eta_\delta=\frac{\cos\phi\cos\delta}{D},\qquad
\eta_\phi=-\frac{\sin\phi\sin\delta}{D}.
$$

次に $\beta=\arctan(\tan\phi/\cos\delta)$ です。$\arctan u$ の微分 $u'/(1+u^2)$ に $u=\tan\phi/\cos\delta$ を入れると

$$
\begin{aligned}
\beta_\phi
&=\frac{\sec^2\phi/\cos\delta}{1+\tan^2\phi/\cos^2\delta}
=\frac{\cos\delta}{D},\\
\beta_\delta
&=\frac{\tan\phi\sin\delta/\cos^2\delta}
{1+\tan^2\phi/\cos^2\delta}
=\frac{\sin\phi\cos\phi\sin\delta}{D}.
\end{aligned}
$$

分母を整理したのは次の恒等式によります。

$$
\cos^2\phi\cos^2\delta+\sin^2\phi
=1-\cos^2\phi\sin^2\delta=D.
$$

平面の $(E,N_p)$ を東・北の**単位**変位に関して微分した行列は、$\eta,\beta$ の偏導関数に $R$ を掛けた後、東列を $R\cos\phi$、北列を $R$ で割って

$$
B=
\begin{pmatrix}
\frac{E_\delta}{R\cos\phi}&\frac{E_\phi}{R}\\
\frac{(N_p)_\delta}{R\cos\phi}&\frac{(N_p)_\phi}{R}
\end{pmatrix}
=\frac1D
\begin{pmatrix}
\cos\delta&-\sin\phi\sin\delta\\
\sin\phi\sin\delta&\cos\delta
\end{pmatrix}.
$$

二列の内積は0、各列の長さの二乗は

$$
\frac{\cos^2\delta+\sin^2\phi\sin^2\delta}{D^2}
=\frac1D.
$$

行列式も $\det B=D/D^2=1/D>0$ なので、[等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)から $k=1/\sqrt D$、面積縮尺は $\det B=1/D=k^2$ です。これは前節の回転計量から得る $1/\cos\alpha$ とも一致します。実際、$\sin\alpha=\cos\phi\sin\delta$ だから $\cos^2\alpha=D$ です。

$\delta=0$ なら $\eta=0$、$\beta=\arctan(\tan\phi)=\phi$（選んだ枝内）です。ゆえに $E=0,N_p=R\phi,k=1$。最後に $0\le\cos^2\phi\le1$ を使うと

$$
\cos^2\delta\le D=1-\cos^2\phi\sin^2\delta\le1.
$$

すべて正なので平方根と逆数を取ると所望の不等式になります。$\phi=0$ で $D=\cos^2\delta$ だから上限が達成されます。
<!-- proof-end -->

**比較例。** 赤道上で中央子午線から $30^\circ$ 東へ進むと、$D=3/4$、$k=2/\sqrt3\simeq1.1547$、$A_p=4/3$。これに対し同じ経度差で緯度 $60^\circ$ なら $D=15/16$、$k=4/\sqrt{15}\simeq1.0328$、$A_p=16/15$ です。東へ30度離れたという数値が同じでも、**中央子午線から球面上でどれほど横へ離れたか**は緯度によって異なります。

---

## 5. 楕円体では中央子午線の距離条件が変わる

ここまでの式は半径一定の**球面**で導いたものです。[GEOD14の等角緯度 $\chi$](../GEOD14/index.md#def-geod14-conformal-latitude)を楕円体に導入すれば球面型の角度計算は再利用できます。しかし楕円体の子午線上の距離は $M(\phi)d\phi$ であって、一般に $R\,d\chi$ ではありません。

<a id="prop-geod15-ellipsoid-warning"></a>
<!-- formal-statement-start -->
> **命題（等角球面式を楕円体へ適用したときの縮尺）**
> 長半径 $a\ge b>0$ の回転楕円体で、非極点の測地緯度 $\phi$ と[等角緯度](../GEOD14/index.md#def-geod14-conformal-latitude) $\chi(\phi)$ を用いる。任意の定数 $R>0$ に対して、前節の球面横メルカトル順変換へ緯度として $\chi$、経度差として $\delta$ を代入すると、楕円体に対する局所縮尺は

$$
\boxed{k_{\mathrm{ell}}=
\frac{R}{h(\phi)}
\frac1{\sqrt{1-\cos^2\chi\sin^2\delta}},
\qquad h(\phi)=\frac{N(\phi)\cos\phi}{\cos\chi}}.
$$

> 中央子午線では $k_{\mathrm{ell}}=R/h(\phi)$ となり、一般の楕円体では定数 $R$ の選択だけで全緯度にわたり $k_{\mathrm{ell}}=1$ とすることはできない。
<!-- formal-statement-end -->

**証明の見取り図。** 角度は保存するが、[GEOD14の等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)の倍率 $h(\phi)$ が球面の半径 $R$ と一致するとは限りません。両者の微小長さを割って縮尺を求めます。

<!-- proof-start -->
### 証明

[等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)により、楕円体の距離は

$$
ds_{\mathrm{ell}}^2
=h(\phi)^2(d\chi^2+\cos^2\chi\,d\delta^2).
$$

一方、[球面横メルカトルの等角性](#thm-geod15-transverse-distortion)を緯度 $\chi$ の単位球面計量へ適用すると、平面距離は

$$
dE^2+dN_p^2
=\frac{R^2}{1-\cos^2\chi\sin^2\delta}
(d\chi^2+\cos^2\chi\,d\delta^2).
$$

同じ括弧を持つ二式の比を取れば主張の $k_{\mathrm{ell}}$ です。$\delta=0$ では平方根の分母が1です。さらに中央子午線では $N_p=R\chi$ なので

$$
\frac{dN_p}{M(\phi)d\phi}
=\frac R{M(\phi)}\frac{d\chi}{d\phi}
=\frac{R\cos\chi}{N(\phi)\cos\phi}
=\frac R{h(\phi)},
$$

ここで中間式は[等角球面を用いた計量表示](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)の証明にある微分式から得ました。非球面で $h$ が定数でないことを赤道付近で確認します。第一離心率 $e$ を用いると

$$
e^2=1-\frac{b^2}{a^2},\qquad
\chi'(0)=\left.\frac{d\chi}{d\phi}\right|_{\phi=0}
=\frac{M(0)}{N(0)}=1-e^2.
$$

[GEOD14の等角座標の積分公式](../GEOD14/index.md#thm-geod14-isometric-integral)より $\psi$ は奇関数で、[等角緯度の定義](../GEOD14/index.md#def-geod14-conformal-latitude)の $\sin\chi=\tanh\psi$ から $\chi$ も奇関数です。そのため二次の項が消え、

$$
\chi(\phi)=(1-e^2)\phi+O(\phi^3)
$$

となります。さらに曲率半径と余弦を赤道周りで展開すると

$$
N(\phi)=a\left(1+\tfrac12e^2\phi^2+O(\phi^4)\right),\qquad
\cos\phi=1-\tfrac12\phi^2+O(\phi^4)
$$

なので

$$
\frac{h(\phi)}a
=\frac{(1+\tfrac12e^2\phi^2+O(\phi^4))
(1-\tfrac12\phi^2+O(\phi^4))}
{1-\tfrac12(1-e^2)^2\phi^2+O(\phi^4)}
=1-\frac12e^2(1-e^2)\phi^2+O(\phi^4).
$$

$0<e<1$ なら $\phi^2$ の係数は負です。従って $h(0)=a$ ですが、その近くで $h$ は変わり、一つの定数 $R$ で全緯度の縮尺を1にはできません。
<!-- proof-end -->

これが次章で**楕円体の中央子午線の弧長に合わせた補正**を構成する理由です。球面横メルカトルは角度保存を理解するための正確な模型ですが、楕円体 Gauss–Krüger の最終式そのものではありません。

---

## 6. 演習

### Level A：式の意味と単独の計算

<a id="ex-geod15-a01"></a>
**A1　正軸の往復計算**（Level A）
- Level: A

半径 $R$ の球面で $\phi=30^\circ,\delta=60^\circ$ の正軸メルカトル座標を求め、その座標から元の $\phi,\delta$ を復元せよ。

<!-- solution-start -->
**詳細解答。** [正軸の定義](#def-geod15-normal-mercator)へ $\sin\phi=1/2$、$\delta=\pi/3$ を入れて

$$
E=\frac{\pi R}{3},\qquad
N_p=R\operatorname{atanh}(1/2)=\frac R2\log3.
$$

[正軸メルカトルの逆式](#thm-geod15-normal-scale)では $\delta=E/R=\pi/3$ です。$\tanh(\frac12\log3)=(3-1)/(3+1)=1/2$ なので $\phi=\arcsin(1/2)=\pi/6$ へ戻ります。
<!-- solution-end -->

<a id="ex-geod15-a02"></a>
**A2　緯度による正軸縮尺**（Level A）
- Level: A

赤道と緯度 $60^\circ$ で、正軸メルカトルの線縮尺・面積縮尺を比較せよ。面積縮尺4の意味も述べよ。

<!-- solution-start -->
**詳細解答。** [正軸の縮尺式](#thm-geod15-normal-scale)は $k=1/\cos\phi$、$A_p=k^2$ です。赤道と緯度 $60^\circ$ にそれぞれ代入すると

$$
\begin{array}{c|cc}
\phi & k & A_p\\ \hline
0 & 1 & 1\\
\pi/3 & 2 & 4
\end{array}
$$

を得ます。面積縮尺4とは、緯度60度での十分小さい地表面積 $dA$ の像が $4\,dA$ になる意味です。二点間の有限距離がすべて2倍になる主張ではありません。
<!-- solution-end -->

<a id="ex-geod15-a03"></a>
**A3　回転球面座標の向き**（Level A）
- Level: A

赤道上で $\delta=30^\circ$ の点について $(x,y,z)$、$(\alpha,\beta)$、$(E,N_p)$ を求め、どちらが東に対応するか確認せよ。

<!-- solution-start -->
**詳細解答。** $\phi=0,\delta=\pi/6$ を[回転座標](#def-geod15-transverse)へ代入すると

$$
(x,y,z)=(\sqrt3/2,1/2,0),\quad
\alpha=\arcsin(1/2)=\pi/6,\quad\beta=0.
$$

従って $\eta=\operatorname{atanh}(1/2)=\frac12\log3$、$E=\frac R2\log3>0$、$N_p=0$。元の東向き増分が平面の東向き座標を正にすることを、定義の各段階で確認しました。
<!-- solution-end -->

<a id="ex-geod15-a04"></a>
**A4　中央子午線の距離**（Level A）
- Level: A

$\delta=0$ の子午線上で横メルカトルの $E,N_p,k$ を求め、二点 $\phi_1<\phi_2$ の像の距離が球面の子午線弧長と一致することを示せ。

<!-- solution-start -->
**詳細解答。** [横メルカトルの順変換](#thm-geod15-transverse-inverse)へ $\sin\delta=0,\cos\delta=1$ を代入します。領域内の $\phi\in(-\pi/2,\pi/2)$ では $\arctan(\tan\phi)=\phi$ だから

$$
E=0,\qquad N_p=R\phi,\qquad
D=1,\quad k=1
$$

となります。最後の縮尺は[縮尺定理](#thm-geod15-transverse-distortion)からも確認できます。二点 $\phi_1<\phi_2$ の像は同じ縦軸上にあるので、平面距離は $R(\phi_2-\phi_1)$ です。球面の子午線弧長も $ds=R\,d\phi$ より

$$
\int_{\phi_1}^{\phi_2}R\,d\phi=R(\phi_2-\phi_1)
$$

で一致します。
<!-- solution-end -->

<a id="ex-geod15-a05"></a>
**A5　発散する場所**（Level A）
- Level: A

横メルカトルで $\phi=0$ としたまま $\delta\to\pi/2$ とする。$E,N_p$ と $k$ の極限を求め、地理的な北極での発散と混同しないよう説明せよ。

<!-- solution-start -->
**詳細解答。** 赤道上では $E=R\operatorname{atanh}(\sin\delta)$、$N_p=0$。$\sin\delta\to1^-$ より $E\to+\infty$ です。$D=1-\sin^2\delta=\cos^2\delta$ なので $k=1/\cos\delta\to+\infty$。この位置は $\phi=0,\delta=\pi/2$、すなわち回転軸の東側の極 $(x,y,z)=(0,1,0)$ であり、地理緯度 $\phi=\pi/2$ の北極ではありません。
<!-- solution-end -->

### Level B：逆写像・Jacobian・比較を再構成する

<a id="ex-geod15-b01"></a>
**B1　逆変換を球面座標から再導出**（Level B）
- Level: B

横メルカトルの $\eta=E/R,\beta=N_p/R$ が与えられるとき、$x,y,z$ を単位球面条件から求めて $\phi,\delta$ の逆変換を導出せよ。$x>0$ が必要な箇所を明記せよ。

<!-- solution-start -->
**詳細解答。** [回転座標の定義](#def-geod15-transverse)から $y=\tanh\eta$、ゆえに $x^2+z^2=1-\tanh^2\eta=\operatorname{sech}^2\eta$ です。$\beta=\operatorname{atan2}(z,x)$ と $x>0$ により $\cos\beta>0$、したがって

$$
x=\frac{\cos\beta}{\cosh\eta}>0,\qquad
z=\frac{\sin\beta}{\cosh\eta}.
$$

$z=\sin\phi$ から $\phi=\arcsin(\sin\beta/\cosh\eta)$。$x=\cos\phi\cos\delta>0$、$y=\cos\phi\sin\delta$ なので

$$
\delta=\operatorname{atan2}(y,x)
=\operatorname{atan2}(\sinh\eta,\cos\beta).
$$

$x>0$ を外すと $\beta$ と $\delta$ の枝を一つに固定できず、別半球の点を混ぜる危険があります。
<!-- solution-end -->

<a id="ex-geod15-b02"></a>
**B2　物理的な単位方向から等角性を判定**（Level B）
- Level: B

横メルカトルの $\eta_\delta,\eta_\phi,\beta_\delta,\beta_\phi$ を求め、単位東・北方向を列に持つ $2\times2$ Jacobian $B$ を組み立てよ。$B^\mathsf TB$ と $\det B$ を求めて縮尺を検証せよ。

<!-- solution-start -->
**詳細解答。** $D=1-\cos^2\phi\sin^2\delta$ とすると、連鎖律・$\arctan$ の微分から

$$
\eta_\delta=\frac{\cos\phi\cos\delta}{D},\quad
\eta_\phi=-\frac{\sin\phi\sin\delta}{D},\quad
\beta_\delta=\frac{\sin\phi\cos\phi\sin\delta}{D},\quad
\beta_\phi=\frac{\cos\delta}{D}.
$$

[GEOD13の正規化Jacobian](../GEOD13/index.md#thm-geod13-metric-comparison)に従い、地表の東・北の長さ増分 $R\cos\phi\,d\delta$ と $R\,d\phi$ を基準に、Jacobianの東列を $R\cos\phi$、北列を $R$ で割ります。

$$
B=\frac1D\begin{pmatrix}\cos\delta&-\sin\phi\sin\delta\\
\sin\phi\sin\delta&\cos\delta\end{pmatrix}.
$$

列の内積は0、列の長さはともに $\sqrt D/D$ です。従って $B^\mathsf TB=I/D$、$\det B=1/D>0$。よって等角かつ向き保存で、線縮尺 $1/\sqrt D$、面積縮尺 $1/D$ です。
<!-- solution-end -->

<a id="ex-geod15-b03"></a>
**B3　同じ経度差で緯度を変える**（Level B）
- Level: B

$\delta=30^\circ$ の球面横メルカトルについて、$\phi=0$ と $\phi=60^\circ$ の線縮尺・面積縮尺を厳密な値で求めよ。また $1\le k\le\sec\delta$ を直接検証せよ。

<!-- solution-start -->
**詳細解答。** $\sin^2\delta=1/4$ なので $D=1-\cos^2\phi/4$ です。各緯度で分母をまず計算すると

$$
\begin{array}{c|ccc}
\phi & D & k=1/\sqrt D & A_p=1/D\\ \hline
0 & 3/4 & 2/\sqrt3 & 4/3\\
\pi/3 & 15/16 & 4/\sqrt{15} & 16/15
\end{array}
$$

となります。ともに $k\ge1$ で、最大は $\sec30^\circ=2/\sqrt3$ です。一般にも $0\le\cos^2\phi\le1$ から $3/4\le D\le1$ と挟めるため、$1\le k\le2/\sqrt3$ を直接確認できます。
<!-- solution-end -->

<a id="ex-geod15-b04"></a>
**B4　楕円体の等角球面にそのまま代入した場合**（Level B）
- Level: B

楕円体の計量 $ds^2=h(\phi)^2(d\chi^2+\cos^2\chi\,d\delta^2)$ に、半径 $R$ の球面横メルカトル式を $\chi$ で適用する。中央子午線上の縮尺を二通り（計量の比、$dN_p/(M\,d\phi)$）で求めて一致させよ。

<!-- solution-start -->
**詳細解答。** [等角球面計量](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)の倍率は $h=N\cos\phi/\cos\chi$ です。一方、[球面横メルカトルの計量比](#thm-geod15-transverse-distortion)では $\delta=0$ なら平面長さは $R\sqrt{d\chi^2+\cos^2\chi\,d\delta^2}$。従って楕円体長さとの比は $R/h$ です。

中央子午線上では $N_p=R\chi$、実距離は $M\,d\phi$ です。ここで $\chi'=d\chi/d\phi$ は測地緯度 $\phi$ に関する一変数微分であり、[GEOD14の等角緯度微分](../GEOD14/index.md#thm-geod14-conformal-sphere-metric)から $\chi'=M\cos\chi/(N\cos\phi)$ なので

$$
\frac{dN_p}{M\,d\phi}
=\frac{R\chi'}M
=\frac{R\cos\chi}{N\cos\phi}=\frac Rh.
$$

両者は一致しますが、$h$ が緯度に依存すれば縮尺は1に固定されません。球面式の流用が楕円体の中央子午線の距離条件を自動で満たす、という推論が誤りです。
<!-- solution-end -->

### Level C：順逆変換と歪みを一つの点で統合する

<a id="ex-geod15-c01"></a>
**C1　北緯30度・中央子午線の東30度を往復する**（Level C）
- Level: C

半径 $R$ の球面で $\phi=\delta=30^\circ$ とする。

1. 回転成分 $(x,y,z)$、横メルカトル座標 $(E,N_p)$ を厳密に求めよ。
2. 得た平面座標から逆変換で $\phi,\delta$ を復元せよ。逆三角関数の枝にも言及せよ。
3. 物理的な単位東・北に対するJacobian $B$ を計算し、線縮尺と面積縮尺を二通りで確かめよ。
4. 同じ点の正軸メルカトルの縮尺・面積縮尺と比較し、中央子午線上の基準に照らして説明せよ。

<!-- solution-start -->
**詳細解答。**

**1．順変換。** $\sin\phi=\sin\delta=1/2$、$\cos\phi=\cos\delta=\sqrt3/2$ を[回転成分](#def-geod15-transverse)へ代入して

$$
(x,y,z)=\left(\frac34,\frac{\sqrt3}4,\frac12\right),\quad
\eta=\operatorname{atanh}\frac{\sqrt3}4,\quad
\beta=\arctan\frac{z}{x}=\arctan\frac23.
$$

よって $E=R\operatorname{atanh}(\sqrt3/4)$、$N_p=R\arctan(2/3)$。$x=3/4>0$ なので、採用した半球に入ります。

**2．逆変換。** $\tanh\eta=\sqrt3/4$ から

$$
\cosh\eta=\frac4{\sqrt{13}},\quad
\sinh\eta=\frac{\sqrt3}{\sqrt{13}},\quad
\sin\beta=\frac2{\sqrt{13}},\quad
\cos\beta=\frac3{\sqrt{13}}.
$$

従って[球面横メルカトルの順逆式](#thm-geod15-transverse-inverse)で

$$
\sin\phi=\frac{\sin\beta}{\cosh\eta}=\frac12,\qquad
\tan\delta=\frac{\sinh\eta}{\cos\beta}=\frac1{\sqrt3}.
$$

$\phi,\delta\in(-\pi/2,\pi/2)$ を用いて $\phi=\delta=\pi/6$ と一意に戻ります。$\arctan$ の値へ無条件に $\pi$ を足すことはできません。

**3．歪み。** $D=1-(3/4)(1/4)=13/16$ です。[単位方向のJacobian](#thm-geod15-transverse-distortion)は

$$
B=\frac{16}{13}
\begin{pmatrix}\sqrt3/2&-1/4\\1/4&\sqrt3/2\end{pmatrix}.
$$

二列の内積は $(\sqrt3/2)(-1/4)+(1/4)(\sqrt3/2)=0$。列の長さの二乗は

$$
\left(\frac{16}{13}\right)^2
\left(\frac34+\frac1{16}\right)
=\frac{16}{13},
$$

なので $k=4/\sqrt{13}$。行列式から求める面積縮尺は

$$
\det B=\left(\frac{16}{13}\right)^2
\left(\frac34+\frac1{16}\right)
=\frac{16}{13}=k^2.
$$

この二計算は独立に、[GEOD13の等角・面積判定](../GEOD13/index.md#thm-geod13-preservation-tests)とも整合します。

**4．正軸との対照。** [正軸メルカトル縮尺](#thm-geod15-normal-scale)では $k_{\mathrm{normal}}=\sec30^\circ=2/\sqrt3$、$A_{\mathrm{normal}}=4/3$。横メルカトルでは $k_{\mathrm{transverse}}=4/\sqrt{13}$、$A_{\mathrm{transverse}}=16/13$。どちらもこの点では拡大ですが、前者は赤道を、後者は中央子午線を縮尺1の基準にしています。どの投影がよいかは、対象地域がその基準線の近くにあるかで変わります。
<!-- solution-end -->

---

## 7. 次に楕円体へ進むとき

球面なら $\eta=\operatorname{atanh}(\cos\phi\sin\delta)$、$\beta=\arctan(\tan\phi/\cos\delta)$ から一意な順逆変換と局所歪みまで計算できました。中央子午線上では $N_p=R\phi$ なので、距離保存も直接証明できました。

楕円体では緯度を等角緯度 $\chi$ に替えると角度保存は続きますが、中央子午線の長さが一致しません。次は**等角性を保ちつつ、楕円体の子午線弧長に縮尺を合わせる**補正の数学を組み立てます。
