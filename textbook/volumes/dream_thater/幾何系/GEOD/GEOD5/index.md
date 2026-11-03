# GEOD5 測地座標・地心座標・局所座標

地図に記録された緯度・経度と高さを、衛星が使う三次元の $X,Y,Z$ に直すには何が必要でしょうか。緯度・経度は方向を示しますが、高さを単純に地球中心からの距離へ足すだけでは、扁平な地球で誤ります。さらに、観測者から見た「東に3 m、北に2 m」という変位は、地心の $X,Y,Z$ 軸と一般には一致しません。

[GEOD3 の楕円体表面表示](../GEOD3/index.md#prop-geod3-surface-parameterization)と[GEOD4 の東・北・法線方向](../GEOD4/index.md#prop-geod4-tangent-vectors)を使い、三つの座標表示を同じ幾何から組み立てます。

1. 楕円体高の意味から、測地座標 $(\phi,\lambda,h)$ の地心直交座標への順変換を導く。
2. 楕円体の表面・外部にある点で、一意性が保証された逆変換を構成し、特異点と停止基準を説明する。
3. 東・北・上（ENU）座標の基底と回転行列を作り、直交性・右手系・逆変換を確かめる。
4. 緯度・経度・高さの微小変化がENU変位へどう移るかを、Jacobianで検算する。
5. 楕円体、軸順序、角度単位、基準座標系・座標時点の取り違えを識別する。

以下の各座標は**同じ地心直交座標系、同じ基準楕円体、同じ座標時点**で表すものとします。[座標参照系](../GEOD2/index.md#def-geod2-crs)と[座標時点](../GEOD2/index.md#def-geod2-coordinate-epoch)が異なる点どうしには、ここで導く単純な座標換算をそのまま適用できません。距離・高さは同じ長さの単位（通常m）で、三角関数に渡す角度はラジアンです。

<!-- definition-example-audit: strict -->

---

## 1. 楕円体の法線に沿って高さを測る

赤道半径 $a$、極半径 $b$ を $a\ge b>0$ とし、[形状定数](../GEOD3/index.md#def-geod3-shape-parameters)から $e^2=1-b^2/a^2$、$q=1-e^2=b^2/a^2$ と置きます。[卯酉線曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)は

$$
N(\phi)=\frac{a}{\sqrt{1-e^2\sin^2\phi}}
$$

です。$-\pi/2\le\phi\le\pi/2$ は測地緯度、$\lambda$ は東正の経度です。楕円体表面の点と単位外向き法線は、既習の結果から

$$
\begin{aligned}
\boldsymbol r_0(\phi,\lambda)
&=(N\cos\phi\cos\lambda,\ N\cos\phi\sin\lambda,\ qN\sin\phi),\\
\boldsymbol\nu(\phi,\lambda)
&=(\cos\phi\cos\lambda,\ \cos\phi\sin\lambda,\ \sin\phi).
\end{aligned}
$$

楕円体表面からの位置を示すためには、中心から放射状に延ばすのではなく、**その表面点の外向き法線方向**へ符号付き距離 $h$ だけ進みます。この $h$ が楕円体高です。外側なら正、内側なら負ですが、内側へ延ばした法線は交差する場合があります。次章で扱う重力に基づく標高とも区別します。

<a id="def-geod5-geodetic-coordinates"></a>
<!-- formal-statement-start -->
> **定義（楕円体高を持つ測地座標）**
> $a\ge b>0$ の回転楕円体、$-\pi/2\le\phi\le\pi/2$、$\lambda\in\mathbb R$、符号付きの高さ $h\in\mathbb R$ をとる。測地座標 $(\phi,\lambda,h)$ が表す点を、[表面表示](../GEOD3/index.md#prop-geod3-surface-parameterization) $\boldsymbol r_0$ とその単位外向き法線 $\boldsymbol\nu$ によって

$$
\boldsymbol P(\phi,\lambda,h)
=\boldsymbol r_0(\phi,\lambda)+h\boldsymbol\nu(\phi,\lambda)
$$

> と定め、$h$ を**楕円体高**と呼ぶ。$h>0$ は外側、$h=0$ は表面、$h<0$ は内側の法線方向を表す。ただし内側では異なる法線表示が同一点を表すことがある。極 $\phi=\pm\pi/2$ では全ての $\lambda$ が同一点を表す。本章の逆変換定理では一意性を保証できる $h\ge0$ を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod5-geodetic-coordinates -->
**定義の確認**　$a=5,b=4$、赤道上の $\phi=0,\lambda=0$ では、[表面表示](../GEOD3/index.md#prop-geod3-surface-parameterization)より $\boldsymbol r_0=(5,0,0)$、法線は $\boldsymbol\nu=(1,0,0)$ で長さは1です。$h=2$ なら $\boldsymbol P=(7,0,0)$ となり、$\boldsymbol P-\boldsymbol r_0=2\boldsymbol\nu$、$\|\boldsymbol P-\boldsymbol r_0\|=2$ が確かめられます。一方、中緯度では法線と地心方向が一致しないので、中心からの距離を $h$ としてはなりません。
<!-- definition-example-end -->

### 三次元の地心直交座標への順変換

地心直交座標は、原点を楕円体の中心とし、赤道面を $XY$ 平面、北極方向を $+Z$ とする右手系の三成分 $(X,Y,Z)$ です。$X$ の基準経線から東向きに $\lambda$ を測ります。楕円体高を足す成分は、表面位置と法線位置を**同じ軸ごとに**足して求めます。

<a id="thm-geod5-forward"></a>
<!-- formal-statement-start -->
> **定理（測地座標から地心直交座標への順変換）**
> $a\ge b>0$、$e^2=1-b^2/a^2$、$\phi\in[-\pi/2,\pi/2]$、$\lambda\in\mathbb R$、$h\in\mathbb R$ とする。[楕円体高を持つ測地座標](#def-geod5-geodetic-coordinates)が表す点の地心直交座標は、$N=a/\sqrt{1-e^2\sin^2\phi}$ を用いて

$$
\boxed{\begin{aligned}
X&=(N+h)\cos\phi\cos\lambda,\\
Y&=(N+h)\cos\phi\sin\lambda,\\
Z&=(N(1-e^2)+h)\sin\phi
\end{aligned}}
$$

> となる。非極点では $\lambda$ を $2\pi$ の整数倍だけ変えても同じ点を表す。
<!-- formal-statement-end -->

**証明の見取り図。** 表面表示の $X,Y$ 成分にある係数は $N$、$Z$ 成分の係数は $qN$ です。[法線方向](../GEOD3/index.md#def-geod3-geodetic-latitude)の各成分へ $h$ を掛けて足せば、水平には $N+h$、鉛直には $qN+h$ が現れます。

<!-- proof-start -->
### 証明

[楕円体表面表示](../GEOD3/index.md#prop-geod3-surface-parameterization)と[外向き法線](../GEOD3/index.md#def-geod3-geodetic-latitude)を[定義](#def-geod5-geodetic-coordinates)へ代入すると

$$
\begin{aligned}
\boldsymbol P
&=(N\cos\phi\cos\lambda,N\cos\phi\sin\lambda,qN\sin\phi)\\
&\quad+h(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)\\
&=((N+h)\cos\phi\cos\lambda,\
(N+h)\cos\phi\sin\lambda,\
(qN+h)\sin\phi).
\end{aligned}
$$

各成分を $X,Y,Z$ と読めばよい。$\sin,\cos$ は $2\pi$ 周期であるため、経度の周期性も従います。
<!-- proof-end -->

**赤道・極・球の検算。** $a=5,b=4$ で $\phi=0,\lambda=\pi/2,h=2$ なら $(X,Y,Z)=(0,7,0)$ です。北極では $(0,0,b+h)$ で経度は消えます。球 $a=b=R$ では $N=R$ なので

$$
(X,Y,Z)=(R+h)(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)
$$

となり、球に限って法線と地心からの放射方向が一致します。

---

## 2. $X,Y,Z$ から逆に緯度・経度・高さを求める

順変換では緯度が既知でした。逆変換では $N(\phi)$ 自体に未知の緯度が含まれます。$\tan\phi=Z/\sqrt{X^2+Y^2}$ とするだけでは**地心緯度**になり、測地緯度にはなりません。ここでは楕円体の表面・外部にある点を考え、まず「法線がどの表面点から伸びたか」を一変数の方程式で求めます。

与えられた点を $\boldsymbol P=(X,Y,Z)$、水平半径を $\rho=\sqrt{X^2+Y^2}$ とします。表面の方程式は

$$
\frac{Q_X^2+Q_Y^2}{a^2}+\frac{Q_Z^2}{b^2}=1
$$

です。表面の外向き法線は $(Q_X/a^2,Q_Y/a^2,Q_Z/b^2)$ と平行です。[GEOD3 の法線の定義](../GEOD3/index.md#def-geod3-geodetic-latitude)にある楕円体方程式の勾配を、ここでは正規化せず使っています。

点 $\boldsymbol P$ がこの法線上にあれば、ある $t\ge0$（長さの二乗の単位）に対して

$$
\boldsymbol P
=\boldsymbol Q+t\left(\frac{Q_X}{a^2},\frac{Q_Y}{a^2},\frac{Q_Z}{b^2}\right).
$$

各座標について解くと、候補となる表面点は

$$
\boldsymbol Q(t)=\left(
\frac{a^2X}{a^2+t},
\frac{a^2Y}{a^2+t},
\frac{b^2Z}{b^2+t}
\right).
$$

$\boldsymbol Q(t)$ が楕円体上にある条件を代入して、**未知数が一つ**の方程式を作れます。

<a id="thm-geod5-exterior-inverse"></a>
<!-- formal-statement-start -->
> **定理（楕円体の表面・外部における逆変換の存在と一意性）**
> $a\ge b>0$ とし、地心直交点 $\boldsymbol P=(X,Y,Z)$ が

$$
s=\frac{X^2+Y^2}{a^2}+\frac{Z^2}{b^2}\ge1
$$

> を満たすとする。$\rho^2=X^2+Y^2$ と置くと、$t\ge0$ に関する方程式

$$
F(t)=\frac{a^2\rho^2}{(a^2+t)^2}
+\frac{b^2Z^2}{(b^2+t)^2}-1=0
$$

> は一意な解 $t_*$ を持つ。$\boldsymbol Q=\boldsymbol Q(t_*)$ と

$$
\boldsymbol w=
\left(\frac{Q_X}{a^2},\frac{Q_Y}{a^2},\frac{Q_Z}{b^2}\right),
\qquad h=t_*\|\boldsymbol w\|
$$

> を定めると、$h\ge0$ は唯一の楕円体高であり、測地緯度は

$$
\phi=\operatorname{atan2}(w_Z,\sqrt{w_X^2+w_Y^2})
$$

> で一意に定まる。$\rho>0$ なら経度は $\lambda=\operatorname{atan2}(Y,X)$（$2\pi$ を法として一意）である。$\rho=0$ なら極であり、$\phi=\operatorname{sgn}(Z)\pi/2$、$h=|Z|-b$ だが経度は定まらない。これらを[順変換](#thm-geod5-forward)に戻すと $\boldsymbol P$ が得られる。
<!-- formal-statement-end -->

**証明の見取り図。** $F(0)=s-1\ge0$ から出発し、$t$ を大きくすると $F$ は必ず減って $-1$ へ向かいます。したがって表面点 $\boldsymbol Q$ が一意に定まります。$\boldsymbol P-\boldsymbol Q$ は外向き法線の非負倍で、まさに楕円体高の定義を満たします。

<!-- proof-start -->
### 証明

$s\ge1$ だから $\boldsymbol P\ne\boldsymbol0$ です。$t\ge0$ では分母が正であり、

$$
F'(t)=-\frac{2a^2\rho^2}{(a^2+t)^3}
-\frac{2b^2Z^2}{(b^2+t)^3}<0
$$

です。$\rho^2$ と $Z^2$ は同時には零でないため、不等号は厳密です。また $F(0)=s-1\ge0$、$\lim_{t\to\infty}F(t)=-1$ なので、連続性と狭義単調性から一意な $t_*\ge0$ が存在します。

各成分の式 $Q_X=a^2X/(a^2+t_*)$ などを表面の方程式に代入すると、左辺は $F(t_*)+1=1$ です。よって $\boldsymbol Q$ は楕円体上にあります。さらに

$$
\boldsymbol P-\boldsymbol Q
=t_*\left(\frac{Q_X}{a^2},\frac{Q_Y}{a^2},\frac{Q_Z}{b^2}\right)
=t_*\boldsymbol w.
$$

$\boldsymbol w\ne0$ は楕円体の外向き法線と平行で、その長さで割ったものが単位法線です。従って $\boldsymbol P=\boldsymbol Q+h\boldsymbol\nu$、$h=t_*\|\boldsymbol w\|\ge0$ となります。[測地緯度の定義](../GEOD3/index.md#def-geod3-geodetic-latitude)より法線の水平・鉛直成分から表示式の $\phi$ が得られます。

$\rho>0$ なら $Q_X,Q_Y$ は $X,Y$ と同じ正の比例係数を持ち、$\lambda=\operatorname{atan2}(Y,X)$ です。$\rho=0$ なら外部条件より $|Z|\ge b>0$、$\boldsymbol Q=(0,0,\operatorname{sgn}(Z)b)$ で、$\phi$ は符号つき極緯度、$h=|Z|-b$ になります。

逆に、表面点 $\widetilde{\boldsymbol Q}$ と $h\ge0$ が同じ $\boldsymbol P$ を表すなら、$\boldsymbol P-\widetilde{\boldsymbol Q}=h\widetilde{\boldsymbol w}/\|\widetilde{\boldsymbol w}\|$ より $t=h/\|\widetilde{\boldsymbol w}\|\ge0$ が上の $F(t)=0$ を満たします。解の一意性から $\widetilde{\boldsymbol Q}=\boldsymbol Q$、$h$ と非極点での角度も一意です。最後に $\boldsymbol Q+h\boldsymbol\nu=\boldsymbol P$ を[順変換](#thm-geod5-forward)で成分へ戻せば往復が確かめられます。
<!-- proof-end -->

**逆変換の直接検算。** $a=5,b=4$、$\boldsymbol P=(7,0,0)$ とすると $s=49/25>1$、$\rho=7$ です。

$$
F(10)=\frac{25\cdot49}{(25+10)^2}-1=0.
$$

一意解は $t_*=10$、$\boldsymbol Q=(25\cdot7/35,0,0)=(5,0,0)$、$\boldsymbol w=(1/5,0,0)$ なので $h=10/5=2$、$\phi=\lambda=0$ です。順変換に戻せば $(7,0,0)$ に一致します。

### 単調方程式を数値的に解く

閉じた一般式をむやみに使う代わりに、上の単調性を利用した**二分法**なら、楕円体外部の全点で符号をはさむ区間を作れます。

1. $s$ を計算し、$s<1$ ならこの定理の適用範囲外として停止する。丸めで $s$ が1に近い場合は、入力精度と目的に応じて判定を保留する。
2. $s=1$ なら $t_*=0$。$s>1$ なら下端 $L=0$ とし、上端 $U=a^2$ を起点に $F(U)<0$ になるまで $U$ を2倍にする。
3. $m=(L+U)/2$ を求め、$F(m)>0$ なら $L=m$、$F(m)<0$ なら $U=m$ と更新する。$F(m)=0$ なら終了する。
4. 区間幅が計算機精度まで縮んだとき、または設定した精度を満たしたときに $t\approx(L+U)/2$ とする。回数上限や非有限値に達したら未収束として報告する。
5. $\boldsymbol Q,\phi,\lambda,h$ を再構成し、**順変換した点 $\widehat{\boldsymbol P}$ と入力点の残差** $\|\widehat{\boldsymbol P}-\boldsymbol P\|$ を測る。要求精度を満たさなければ成功扱いしない。

例えば地上付近のm単位の入力なら、往復残差の要求を $10^{-6}$ m とするのは一つの検証例です。入力の有効桁、浮動小数点精度、演算範囲に応じて要求値を決めます。幅の停止条件として $U-L\le 2^{-48}\max(a^2,U)$ などを設定でき、約48回以上の二分で尺度に対する相対幅を十分小さくできます。ただし、この幅条件**だけ**で任意の大きさの入力に対するm単位の精度を保証するわけではありません。中点が丸めで端点と一致した場合もそれ以上分割せず、必ず往復残差を評価します。

境界の注意点は次の通りです。

- **両極**：$X=Y=0$ なら $\lambda$ は定義されない。任意の代表経度を返しても、物理的に測定した経度とは主張しない。
- **楕円体内部**：$s<1$ では本章の外向き法線・非負高さの逆変換は適用されない。内部では法線表示の一意性を別途検討する必要があり、地球中心では方向すら選べない。
- **負の楕円体高**：順変換の式自体は $h<0$ でも成立するが、内側へ延ばした法線は交差しうる。このため、外部逆変換を符号だけ変えて内点へ適用してはいけない。
- **単位・丸め**：$a,b,X,Y,Z$ の単位を揃え、二乗や巨大な値でオーバーフローしない範囲で計算する。$s$ が1に近い場合、測定誤差と浮動小数点の丸めを区別する。

---

## 3. 地心の軸から観測者の東・北・上へ

局所的な位置差を読みやすくするため、基準点の測地座標 $(\phi_0,\lambda_0,h_0)$ を固定します。対応する地心直交点を $\boldsymbol P_0$ とします。方向を表すベクトルには、既習の[東・北・外向き法線の正規直交三つ組](../GEOD4/index.md#prop-geod4-tangent-vectors)をこの基準点で評価して使います。

経度方向に進むのを東、測地緯度方向に進むのを北、楕円体法線に沿うのを上とします。これらは一般に地球中心からの放射・鉛直（重力）方向を意味しません。局所座標は**基準点における直交軸への差ベクトルの射影**です。

<a id="def-geod5-enu"></a>
<!-- formal-statement-start -->
> **定義（基準点のENU局所直交座標）**
> $a\ge b>0$、$|\phi_0|<\pi/2$、$\lambda_0\in\mathbb R$、$h_0\ge0$ の基準点 $\boldsymbol P_0=\boldsymbol P(\phi_0,\lambda_0,h_0)$ を固定する。$s_0=\sin\phi_0$、$c_0=\cos\phi_0$、$S_0=\sin\lambda_0$、$C_0=\cos\lambda_0$ と置く。東・北・上の単位方向を

$$
\begin{aligned}
\boldsymbol e_{\mathrm E}&=(-S_0,C_0,0),\\
\boldsymbol e_{\mathrm N}&=(-s_0C_0,-s_0S_0,c_0),\\
\boldsymbol e_{\mathrm U}&=(c_0C_0,c_0S_0,s_0)
\end{aligned}
$$

> と定める。同じ地心直交座標系で表した点 $\boldsymbol P$ に対して、差 $\boldsymbol d=\boldsymbol P-\boldsymbol P_0$ のENU成分を $E=\boldsymbol e_{\mathrm E}\cdot\boldsymbol d$、$N_{\mathrm{loc}}=\boldsymbol e_{\mathrm N}\cdot\boldsymbol d$、$U=\boldsymbol e_{\mathrm U}\cdot\boldsymbol d$ と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod5-enu -->
**定義の確認**　基準点が $\phi_0=\lambda_0=0$ なら

$$
\boldsymbol e_{\mathrm E}=(0,1,0),\quad
\boldsymbol e_{\mathrm N}=(0,0,1),\quad
\boldsymbol e_{\mathrm U}=(1,0,0).
$$

$\boldsymbol d=(2,3,4)$ を代入すると $(E,N_{\mathrm{loc}},U)=(3,4,2)$ です。各基底の長さは1で二つずつの内積は0、ゆえに三つの射影値は差ベクトルを欠損なく記述します。北は $+Z$ ですが、上は $+X$ であり、軸の名称と地心成分名を混同できません。
<!-- definition-example-end -->

### ENU行列と逆回転

三つの単位ベクトルを**行**に並べれば、差ベクトルの各基底への射影を一度に計算できます。列に並べた行列は逆向きの変換になるので、行・列の区別が重要です。

<a id="thm-geod5-enu-rotation"></a>
<!-- formal-statement-start -->
> **定理（ENU回転行列の直交性と右手系）**
> [ENU局所直交座標](#def-geod5-enu)の仮定の下で

$$
R=
\begin{pmatrix}
-S_0&C_0&0\\
-s_0C_0&-s_0S_0&c_0\\
c_0C_0&c_0S_0&s_0
\end{pmatrix}
$$

> と置くと、$R^{\mathsf T}R=RR^{\mathsf T}=I_3$、$\det R=1$ である。地心直交座標とENU座標の関係は

$$
\begin{pmatrix}E\\N_{\mathrm{loc}}\\U\end{pmatrix}
=R(\boldsymbol P-\boldsymbol P_0),
\qquad
\boldsymbol P=\boldsymbol P_0+R^{\mathsf T}
\begin{pmatrix}E\\N_{\mathrm{loc}}\\U\end{pmatrix}.
$$

> さらに二点の差のEuclid距離は回転前後で等しい。
<!-- formal-statement-end -->

**証明の見取り図。** 行は[測地緯度・経度の偏微分から得られる正規直交方向](../GEOD4/index.md#prop-geod4-tangent-vectors)です。三次元の向きを表す $\boldsymbol e_{\mathrm E}\times\boldsymbol e_{\mathrm N}$ が上を向くことを成分で確かめると、長さだけでなく左右の向きも保存されます。

<!-- proof-start -->
### 証明

$S_0^2+C_0^2=s_0^2+c_0^2=1$ です。三行の長さの二乗は順に

$$
S_0^2+C_0^2=1,\quad
s_0^2(C_0^2+S_0^2)+c_0^2=1,\quad
c_0^2(C_0^2+S_0^2)+s_0^2=1.
$$

行の異なる組の内積は

$$
\begin{aligned}
\boldsymbol e_{\mathrm E}\cdot\boldsymbol e_{\mathrm N}
&=s_0(S_0C_0-C_0S_0)=0,\\
\boldsymbol e_{\mathrm E}\cdot\boldsymbol e_{\mathrm U}
&=c_0(-S_0C_0+C_0S_0)=0,\\
\boldsymbol e_{\mathrm N}\cdot\boldsymbol e_{\mathrm U}
&=-s_0c_0(C_0^2+S_0^2)+c_0s_0=0.
\end{aligned}
$$

よって $RR^{\mathsf T}=I_3$ であり、正方行列なので $R^{-1}=R^{\mathsf T}$、$R^{\mathsf T}R=I_3$ です。右手系を表す三次元の積を成分で求めれば

$$
\begin{aligned}
\boldsymbol e_{\mathrm E}\times\boldsymbol e_{\mathrm N}
&=(C_0c_0,\ S_0c_0,\ s_0(S_0^2+C_0^2))\\
&=(c_0C_0,c_0S_0,s_0)=\boldsymbol e_{\mathrm U}.
\end{aligned}
$$

第3成分は $(-S_0)(-s_0S_0)-C_0(-s_0C_0)=s_0(S_0^2+C_0^2)$ と求めました。

従って行ベクトルの順番は右手系で、$\det R=+1$ です。定義からENU成分は $R\boldsymbol d$ であり、$R^{\mathsf T}R=I_3$ を左から掛けると逆回転式が得られます。距離は

$$
\|R\boldsymbol d\|^2
=\boldsymbol d^{\mathsf T}R^{\mathsf T}R\boldsymbol d
=\boldsymbol d^{\mathsf T}\boldsymbol d.
$$

<!-- proof-end -->

この直交回転は[GEOD2 の座標軸間の表示](../GEOD2/index.md#prop-geod2-rigid-frame)の具体例です。ただし、基準点 $\boldsymbol P_0$ の引き算を忘れると「点の絶対座標」を東西・南北の変位と読み違えます。またENUの $U$ は楕円体法線方向の成分であり、重力による水準測量の高低差と一般には同じではありません。

### 基準点付近の微小な緯度・経度・高さ

ENUの式は任意に離れた二点の**地心直交差ベクトル**を正確に表します。しかし、緯度差から $(M+h)\Delta\phi$ のように変位を見積もる式は基準点付近の一次近似です。両者を分けます。

<a id="prop-geod5-local-jacobian"></a>
<!-- formal-statement-start -->
> **命題（測地座標からENUへの局所一次変換）**
> $a\ge b>0$ の回転楕円体で $|\phi_0|<\pi/2$、$h_0\ge0$ とする。$\Delta\phi,\Delta\lambda$ はラジアンとし、$\Delta h$ は長さとする。基準点における[曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)を $M_0,N_0$ と書くと、測地座標の微分によるENUの一次成分は

$$
\boxed{\begin{aligned}
dE&=(N_0+h_0)\cos\phi_0\,d\lambda,\\
dN_{\mathrm{loc}}&=(M_0+h_0)\,d\phi,\\
dU&=dh.
\end{aligned}}
$$

> 従って $(\phi,\lambda,h)$ の順に並べた座標差の一次近似は

$$
\begin{pmatrix}\Delta E\\\Delta N_{\mathrm{loc}}\\\Delta U\end{pmatrix}
\simeq
\begin{pmatrix}
0&(N_0+h_0)\cos\phi_0&0\\
M_0+h_0&0&0\\
0&0&1
\end{pmatrix}
\begin{pmatrix}\Delta\phi\\\Delta\lambda\\\Delta h\end{pmatrix}.
$$

> このJacobianは非極点で可逆である。
<!-- formal-statement-end -->

**証明の見取り図。** 表面位置の偏微分を[GEOD4](../GEOD4/index.md#prop-geod4-tangent-vectors)から取り、法線の偏微分を直接計算して、方向ごとの係数を $h$ だけ増やします。得られた三本のベクトルをENU基底に射影します。

<!-- proof-start -->
### 証明

[順変換](#thm-geod5-forward)を $\boldsymbol P=\boldsymbol r_0+h\boldsymbol\nu$ と書く。[GEOD4 の測地緯度・経度の偏微分](../GEOD4/index.md#prop-geod4-tangent-vectors)より

$$
\frac{\partial\boldsymbol r_0}{\partial\phi}=M\boldsymbol e_{\mathrm N},
\qquad
\frac{\partial\boldsymbol r_0}{\partial\lambda}
=N\cos\phi\,\boldsymbol e_{\mathrm E}.
$$

法線 $\boldsymbol\nu=(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)$ を微分すると

$$
\frac{\partial\boldsymbol\nu}{\partial\phi}
=(-\sin\phi\cos\lambda,-\sin\phi\sin\lambda,\cos\phi)
=\boldsymbol e_{\mathrm N},
$$

$$
\frac{\partial\boldsymbol\nu}{\partial\lambda}
=(-\cos\phi\sin\lambda,\cos\phi\cos\lambda,0)
=\cos\phi\,\boldsymbol e_{\mathrm E}.
$$

$h$ を他の偏微分では固定すると、従って

$$
\boldsymbol P_\phi=(M+h)\boldsymbol e_{\mathrm N},\quad
\boldsymbol P_\lambda=(N+h)\cos\phi\,\boldsymbol e_{\mathrm E},\quad
\boldsymbol P_h=\boldsymbol\nu=\boldsymbol e_{\mathrm U}.
$$

基準点でこれらを[ENUの三行](#def-geod5-enu)へ射影すると、東・北・上の各成分は表示式に一致します。$M_0,N_0>0$、$h_0\ge0$、$\cos\phi_0>0$ だからJacobianの行列式は

$$
-(M_0+h_0)(N_0+h_0)\cos\phi_0\ne0.
$$

負号は入力の並びを $(\phi,\lambda,h)$、出力を $(E,N_{\mathrm{loc}},U)$ としたことによるもので、ENU基底の右手性を否定しません。
<!-- proof-end -->

---

## 4. GIS・測量の座標換算で検算すべきこと

例えば同一基準座標系の地心座標が $(X,Y,Z)$ と記録されていても、別の楕円体パラメータ $a,b$ を代入すれば、逆変換で得られる $\phi,h$ が変わります。**数値三つだけでは座標系は確定しません**。[座標換算と座標変換の違い](../GEOD2/index.md#def-geod2-coordinate-conversion)を思い出してください。

| 読み違い | どの仮定・操作が壊れるか | 検算 |
|---|---|---|
| 地心緯度を測地緯度として入れる | 法線方向と地心方向が扁平楕円体の中緯度で異なる | $\boldsymbol\nu$ と $\boldsymbol P$ の向きを比較 |
| $h$ を重力基準の標高とみなす | 楕円体法線から測る長さという定義を外れる | 高さの種類と基準を確認（次章GEOD6） |
| 緯度・経度を度のまま三角関数へ渡す | ラジアンで記述した公式と単位が一致しない | $90^\circ=\pi/2$ rad を確認 |
| $(\lambda,\phi)$ と $(\phi,\lambda)$ の順を交換する | 北東の位置と符号が入れ替わる | 軸順序と東正・北正を明記 |
| ENUに点座標をそのまま回転する | 原点 $\boldsymbol P_0$ の平行移動を失う | $R(\boldsymbol P-\boldsymbol P_0)$ とする |
| 楕円体、frame、epochが違う | 同じ幾何の中での座標換算という仮定を失う | CRS・座標時点を照合し、必要なら別の座標変換を行う |

---

## 5. 演習：測地座標・地心座標・ENUを往復する

### Level A：意味と端点を確認する

#### A1. 赤道の順変換

$a=5,b=4$、$\phi=0,\lambda=0,h=2$ を地心直交座標へ換算し、楕円体高の定義を検算せよ。

- Level: A
- ID: GEOD5-A1

<!-- solution-start -->
**詳細解答。** $e^2=1-16/25=9/25$、$N(0)=a=5$ です。[順変換](#thm-geod5-forward)から $(X,Y,Z)=(7,0,0)$。楕円体表面は $\boldsymbol r_0=(5,0,0)$、外向き法線は $(1,0,0)$ だから、差は $(2,0,0)=2\boldsymbol\nu$ で、[楕円体高の定義](#def-geod5-geodetic-coordinates)に一致します。
<!-- solution-end -->

#### A2. 極の経度

$a=5,b=4$、$\phi=\pi/2,h=3$ の地心直交座標を求めよ。$\lambda$ を $0$ と $\pi/3$ にしたらどうなるか。

- Level: A
- ID: GEOD5-A2

<!-- solution-start -->
**詳細解答。** 極では $\cos\phi=0,\sin\phi=1$ なので、[順変換](#thm-geod5-forward)の $X=Y=0$ です。$N(\pi/2)=a^2/b=25/4$、$q=16/25$ より $qN=b=4$、従って $Z=(4+3)=7$。二つの経度はどちらも $(0,0,7)$ を表し、極の経度は一意に復元できません。
<!-- solution-end -->

#### A3. 逆変換の適用範囲

$a=5,b=4$ に対し、$\boldsymbol P_1=(5,0,0)$ と $\boldsymbol P_2=(3,0,0)$ の $s=(X^2+Y^2)/a^2+Z^2/b^2$ を計算し、本章の外部逆変換が使える点を判定せよ。

- Level: A
- ID: GEOD5-A3

<!-- solution-start -->
**詳細解答。** $\boldsymbol P_1$ では $s_1=25/25=1$ だから[外部逆変換定理](#thm-geod5-exterior-inverse)が使え、$t=0,h=0,\phi=\lambda=0$ です。$\boldsymbol P_2$ では $s_2=9/25<1$ だから適用範囲外です。「内部の測地座標が一切存在しない」と結論するのではなく、**非負高さによる外部一意性の証明が使えない**というのが正確です。
<!-- solution-end -->

#### A4. 基準経度90度のENU

$\phi_0=0,\lambda_0=\pi/2$ で、地心差ベクトル $\boldsymbol d=(2,3,4)$ のENU成分を求め、各軸の向きを示せ。

- Level: A
- ID: GEOD5-A4

<!-- solution-start -->
**詳細解答。** $s_0=0,c_0=1,S_0=1,C_0=0$ を[ENUの定義](#def-geod5-enu)へ代入すると、東 $=(-1,0,0)$、北 $=(0,0,1)$、上 $=(0,1,0)$ です。内積により

$$
E=-2,\qquad N_{\mathrm{loc}}=4,\qquad U=3.
$$

長さの二乗も $(-2)^2+4^2+3^2=29=2^2+3^2+4^2$ で一致します。
<!-- solution-end -->

#### A5. 同じ経緯度で高さだけ変える

$a=5,b=4$、$\phi=0,\lambda=\pi/2$ で $h=0$ と $h=2$ の二点を比べ、地心差の長さと、低い点を原点とするENU成分を求めよ。

- Level: A
- ID: GEOD5-A5

<!-- solution-start -->
**詳細解答。** [順変換](#thm-geod5-forward)で二点は $(0,5,0)$ と $(0,7,0)$。差は $(0,2,0)$ で長さ $2$ です。基準点の上ベクトルは $(0,1,0)$、東・北はこれに直交するので[ENUの定義](#def-geod5-enu)から $(E,N_{\mathrm{loc}},U)=(0,0,2)$。高さ差が上成分へ入るのは同じ法線上だからです。
<!-- solution-end -->

### Level B：逆変換と局所微分を導く

#### B1. 法線から順変換の3式へ

$a\ge b>0$、$q=b^2/a^2$ とする。表面点 $(N\cos\phi\cos\lambda,N\cos\phi\sin\lambda,qN\sin\phi)$ と単位法線 $(\cos\phi\cos\lambda,\cos\phi\sin\lambda,\sin\phi)$ から、$h$ の順変換を各成分について導け。

- Level: B
- ID: GEOD5-B1

<!-- solution-start -->
**詳細解答。** [楕円体高の定義](#def-geod5-geodetic-coordinates)による加算を成分ごとに行います。

$$
\begin{aligned}
X&=N\cos\phi\cos\lambda+h\cos\phi\cos\lambda=(N+h)\cos\phi\cos\lambda,\\
Y&=N\cos\phi\sin\lambda+h\cos\phi\sin\lambda=(N+h)\cos\phi\sin\lambda,\\
Z&=qN\sin\phi+h\sin\phi=(qN+h)\sin\phi.
\end{aligned}
$$

水平方向と鉛直方向で表面側の係数が異なるのは楕円体が扁平だからで、$qN$ を $N$ に置き換えるのは球の場合以外は誤りです。
<!-- solution-end -->

#### B2. 二分法がはさむ解

$a=5,b=4$、$\boldsymbol P=(7,0,0)$ に対し、$F(t)$ と $F'(t)$ を求めよ。$L=0,U=25$ の区間で符号を確認し、解 $t$、表面点、測地緯度、楕円体高を求めよ。

- Level: B
- ID: GEOD5-B2

<!-- solution-start -->
**詳細解答。** $\rho^2=49,Z=0$ なので[外部逆変換定理](#thm-geod5-exterior-inverse)の式は

$$
F(t)=\frac{1225}{(25+t)^2}-1,\qquad
F'(t)=-\frac{2450}{(25+t)^3}<0.
$$

$F(0)=49/25-1=24/25>0$、$F(25)=1225/2500-1=-51/100<0$ だから区間に唯一の解があります。分母は正なので $F(t)=0$ は $25+t=35$、すなわち $t=10$ と同値です。表面点は $\boldsymbol Q=(25\cdot7/35,0,0)=(5,0,0)$、$\boldsymbol w=(1/5,0,0)$、$h=t\|\boldsymbol w\|=2$、$\phi=\lambda=0$。往復すると $(7,0,0)$ です。
<!-- solution-end -->

#### B3. 高さによる局所換算率の変化

$a\ge b>0$、非極点 $(\phi,\lambda,h)$、$h\ge0$ で、$\boldsymbol P=\boldsymbol r_0+h\boldsymbol\nu$ を三変数で偏微分し、ENU方向の変化率とJacobianの行列式を導け。

- Level: B
- ID: GEOD5-B3

<!-- solution-start -->
**詳細解答。** [表面の偏微分](../GEOD4/index.md#prop-geod4-tangent-vectors)と法線の成分微分を組み合わせ、

$$
\begin{aligned}
\boldsymbol P_\phi&=M\boldsymbol e_{\mathrm N}+h\boldsymbol e_{\mathrm N}=(M+h)\boldsymbol e_{\mathrm N},\\
\boldsymbol P_\lambda&=N\cos\phi\,\boldsymbol e_{\mathrm E}+h\cos\phi\,\boldsymbol e_{\mathrm E}
=(N+h)\cos\phi\,\boldsymbol e_{\mathrm E},\\
\boldsymbol P_h&=\boldsymbol\nu=\boldsymbol e_{\mathrm U}.
\end{aligned}
$$

この三本をENUの行へ射影すると、入力順 $(\phi,\lambda,h)$、出力順 $(E,N_{\mathrm{loc}},U)$ のJacobianは

$$
\begin{pmatrix}0&(N+h)\cos\phi&0\\M+h&0&0\\0&0&1\end{pmatrix}
$$

です。行列式は $-(M+h)(N+h)\cos\phi\ne0$。符号が負なのは入力が北・東・上の順だからです。
<!-- solution-end -->

#### B4. ENUの逆回転と距離保存

$\phi_0=\lambda_0=0$ とする。ENUベクトル $(E,N_{\mathrm{loc}},U)=(3,4,2)$ の地心直交差を求め、往復と距離の保存を数値で検算せよ。

- Level: B
- ID: GEOD5-B4

<!-- solution-start -->
**詳細解答。** 基準点では $R$ の行が $(0,1,0),(0,0,1),(1,0,0)$ です。[ENU回転行列の定理](#thm-geod5-enu-rotation)の逆式から

$$
\boldsymbol d=R^{\mathsf T}(3,4,2)^{\mathsf T}
=(2,3,4)^{\mathsf T}.
$$

順向きに戻すと $R(2,3,4)^{\mathsf T}=(3,4,2)^{\mathsf T}$。さらに $\|\boldsymbol d\|^2=4+9+16=29$、ENU側も $9+16+4=29$ で、回転は長さを保存します。
<!-- solution-end -->

### Level C：局所測量の一連の換算と監査

#### C1. 外部の地心点を測地座標へ戻しENUで読む

$a=5,b=4$ の楕円体と同一の基準・時点で、基準点は $(\phi_0,\lambda_0,h_0)=(0,0,1)$、目標点は地心直交座標 $\boldsymbol P=(6,3,2)$ とする。

1. 基準点 $\boldsymbol P_0$ と、目標点の $s$ を求め、外部逆変換を適用できることを示せ。
2. 目標点に対する $F(t)$ を作り、その単調性と符号のある区間を示せ。$t$ が求まったときの $\boldsymbol Q,\phi,\lambda,h$ の再構成式を示せ。
3. 基準点から目標点への正確なENU差と、その長さを求めよ。
4. 目標点がどちらも同じ楕円体・座標時点にあるという条件を外したら、どの結論の解釈が壊れるか述べよ。

- Level: C
- ID: GEOD5-C1

<!-- solution-start -->
**詳細解答。**

1. [順変換](#thm-geod5-forward)で $N(0)=5$ なので $\boldsymbol P_0=(6,0,0)$ です。目標点の $s$ は

   $$
   s=\frac{6^2+3^2}{5^2}+\frac{2^2}{4^2}
   =\frac{45}{25}+\frac4{16}=\frac{41}{20}>1.
   $$

   よって目標点はこの楕円体の外部にあり、[逆変換の一意性](#thm-geod5-exterior-inverse)を使えます。

2. $\rho^2=45,Z^2=4$ ですから

   $$
   F(t)=\frac{1125}{(25+t)^2}+\frac{64}{(16+t)^2}-1,\qquad
   F'(t)=-\frac{2250}{(25+t)^3}-\frac{128}{(16+t)^3}<0.
   $$

   $F(0)=21/20>0$、$F(25)=1125/2500+64/1681-1<0$ なので $[0,25]$ に一意な解 $t_*$ があります。解を二分法で求めた後は

   $$
   \boldsymbol Q=\left(\frac{25\cdot6}{25+t_*},
   \frac{25\cdot3}{25+t_*},\frac{16\cdot2}{16+t_*}\right)
   $$

   とし、$\boldsymbol w=(Q_X/25,Q_Y/25,Q_Z/16)$、$h=t_*\|\boldsymbol w\|$、$\phi=\operatorname{atan2}(w_Z,\sqrt{w_X^2+w_Y^2})$、$\lambda=\operatorname{atan2}(3,6)=\arctan(1/2)$ として再構成します。数値的には $t_*\simeq10.2203854$、$\boldsymbol Q\simeq(4.2588972,2.1294486,1.2204245)$、$\phi\simeq0.3809185$ rad、$\lambda\simeq0.4636476$ rad、$h\simeq2.0969113$ です。$\boldsymbol Q$ が楕円体方程式を満たすことと、$\boldsymbol Q+t_*\boldsymbol w=\boldsymbol P$ を往復残差で検算します。

3. 基準点のENU基底は東 $(0,1,0)$、北 $(0,0,1)$、上 $(1,0,0)$ です。差は $\boldsymbol d=\boldsymbol P-\boldsymbol P_0=(0,3,2)$ なので

   $$
   (E,N_{\mathrm{loc}},U)=(3,2,0),\qquad
   \|\boldsymbol d\|=\sqrt{3^2+2^2}=\sqrt{13}.
   $$

   $U=0$ は**基準点の接平面での上成分が0**という意味であって、両点の楕円体高が等しいことを意味しません。有限距離では表面法線の向きが変わるためです。

4. 基準楕円体が違えば $s,F(t)$ と復元される $(\phi,h)$ は変わり、基準座標系や座標時点が違えば $\boldsymbol P-\boldsymbol P_0$ 自体を同じ空間の正しい差として解釈できません。[座標参照系](../GEOD2/index.md#def-geod2-crs)と[座標時点](../GEOD2/index.md#def-geod2-coordinate-epoch)を揃え、必要なら[座標変換](../GEOD2/index.md#def-geod2-coordinate-transformation)を先に行います。
<!-- solution-end -->

---

## 6. 次の章へ

楕円体高を法線方向として定義すると、測地座標の順変換、外部での一意な逆変換、ENUへの直交回転は一つの幾何から導けます。数値実装では極・内部の適用範囲と、往復の残差を必ず区別します。

GEOD6 では、ここで使った楕円体高 $h$ と、地球の重力場を用いて定まる高さの基準とを区別します。
