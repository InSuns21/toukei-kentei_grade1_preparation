# U2-06 平面姿勢と座標系：位置だけでは足りない

前の講義では、確率分布によってロボットの位置の不確かさを表し、[Kalman フィルタの観測更新](../U2-05/index.md#thm-u2-05-update)まで扱いました。しかし、位置が同じ $(2,1)$ m でも、東を向くロボットと北を向くロボットは、前進したとき別の地点に着きます。また、センサーが「前方に目印がある」と報告したとき、その「前方」は地図の右向きとは限りません。

そこで位置に**向き**を加え、世界に固定した座標系とロボット自身に固定した座標系を往復する道具を作ります。角度の $2\pi$ 周期性を無視すると、ほぼ同じ向きに $358^\circ$ の誤差を報告することさえあります。ここでは三次元姿勢の一般理論を前提にせず、平面の三角関数と行列積から公式を導きます。

<!-- definition-example-audit: strict -->

## 1. どの座標が何を測っているか

平面には、地図に固定する**世界座標系** $W$ と、ロボットの車体に固定する**車体座標系** $B$ を置きます。いずれも右手系の直交座標とし、長さの単位を m、角度の単位を rad（ラジアン）に統一します。平面では、$x$ 軸の正方向を反時計回りに $\pi/2$ 回すと $y$ 軸の正方向になる向きが右手系です。

世界では $x$ 軸を右、$y$ 軸を上、車体では $x$ 軸を前、$y$ 軸を左へ向けます。回転の正方向は反時計回りです。

車体が世界の $x$ 正方向を向けば角度は $0$、世界の $y$ 正方向を向けば $\pi/2$ です。

点 $q$ の座標を $q_W$、$q_B$ と書き分けます。どちらも**同一の物理的な点**を別のものさしで数えた列ベクトルです。点と、始点を持たない変位ベクトルも区別します。後者は原点の移動を受けず、回転だけを受けます。

車体原点が世界の $(2,1)$ m にあって、車体が上向きなら、車体から見て「前へ $3$ m」の点は世界の $(2,4)$ m にあります。これを任意の向きで計算できるようにします。

## 2. 平面姿勢は位置と向きの組

姿勢の位置部分を列ベクトル $t=(x,y)^T\in\mathbb R^2$ とし、車体の前向きと世界の $x$ 正方向がなす角度を $\theta\in\mathbb R$ とします。角度は数値として $\theta+2k\pi$（$k$ は整数）でも同じ物理的な向きを表します。したがって実数三成分を並べただけで、角度を普通の直線座標とみなすことはできません。

<a id="def-u2-06-planar-pose"></a>

<!-- formal-statement-start -->
> **定義（平面姿勢）**  
> 平面上の世界座標系を $W$、車体座標系を $B$ とする。世界座標で測った車体の位置と反時計回りを正とする向きの組を**平面姿勢**とし、
>
$$
g_{WB}=(t_{WB},\theta_{WB}),\qquad
t_{WB}=\begin{pmatrix}x\\y\end{pmatrix}\in\mathbb R^2,\quad
\theta_{WB}\in\mathbb R
$$
>
> で表す。位置が等しく、角度が $2k\pi$（$k$ は整数）だけ異なる二つの組は同じ姿勢を表す。位置の単位は m、角度の単位は rad とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-06-planar-pose -->
**定義の確認**：車体原点を $(2,1)^T$ m、車体の前方を世界の上向きとすれば $g_{WB}=((2,1)^T,\pi/2)$ です。位置は $\mathbb R^2$ の列ベクトル、向きは世界 $x$ 軸から反時計回り $\pi/2$ なので定義の各条件を満たします。$((2,1)^T,5\pi/2)$ は角度差が $2\pi$ のため**同じ姿勢**、$((2,1)^T,-\pi/2)$ は下向きなので**異なる姿勢**です。
<!-- definition-example-end -->

まだ観測や誤差を確率分布にしていません。ここで確定するのは、以後の推定で使う姿勢の成分、その幾何と符号規約です。

## 3. 車体の点を世界へ運ぶ

車体の前向き単位ベクトル $(1,0)^T$ は、世界から見ると $(\cos\theta,\sin\theta)^T$ です。車体の左向き $(0,1)^T$ は、これをさらに反時計回りに $\pi/2$ 回した $(-\sin\theta,\cos\theta)^T$ です。この**二つの基底ベクトルを列に並べた行列**で、車体座標の任意の変位を世界座標へ変換できます。

$$
R(\theta)=
\begin{pmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{pmatrix}.
$$

実際、車体内の変位 $v_B=a(1,0)^T+b(0,1)^T$ の世界成分は

$$
v_W=a\begin{pmatrix}\cos\theta\\\sin\theta\end{pmatrix}
+b\begin{pmatrix}-\sin\theta\\\cos\theta\end{pmatrix}
=R(\theta)\begin{pmatrix}a\\b\end{pmatrix}.
$$

二本の基底を列にした行列の列ベクトルを $u=(u_x,u_y)^T$、$v=(v_x,v_y)^T$ とすると、行列式 $u_xv_y-u_yv_x$ は符号付き面積を表します。両列が長さ $1$ で直交する場合、行列式が $+1$ なら二本の軸の向きを保ち、$-1$ なら反転します。これで回転行列が右手系を保つかを確認できます。

点なら、車体原点の世界位置 $t_{WB}$ を加えます。以下では一般の二つの座標系 $A,B$ に対して、$B$ 原点の $A$ 座標を $t_{AB}$、$B$ の $x$ 軸が $A$ の $x$ 軸から反時計回りに回った角度を $\theta_{AB}$ と表します。回転と平行移動を一つの行列積にまとめるため、点 $q_B$ の二成分の末尾に $1$ を付けた三成分列ベクトルを**同次座標**と呼びます。これに対して最終行を $(0,0,1)$ とした $3\times3$ 行列を掛ければ、上二成分が $R(\theta_{AB})q_B+t_{AB}$、最後の成分が $1$ になります。変位なら末尾を $0$ とすることで平行移動を受けません。ブロック行列の $0_{1\times2}$ は長さ2の零行ベクトルです。

<a id="def-u2-06-rigid-transform"></a>

<!-- formal-statement-start -->
> **定義（座標フレーム間の平面剛体変換）**  
> 二つの右手系直交座標系 $A,B$ で長さの単位と反時計回りの正方向を共通とし、$B$ 原点の $A$ 座標を $t_{AB}\in\mathbb R^2$、$B$ の $x$ 正方向と $A$ の $x$ 正方向のなす角度を $\theta_{AB}\in\mathbb R$ とする。$B$ 座標の点 $q_B$ を $A$ 座標へ写す座標変換を

$$
q_A=R(\theta_{AB})q_B+t_{AB}
$$

> とし、同じ変換を表す同次座標行列を

$$
T_{AB}=\begin{pmatrix}R(\theta_{AB})&t_{AB}\\0_{1\times2}&1\end{pmatrix},
\qquad
\begin{pmatrix}q_A\\1\end{pmatrix}
=T_{AB}\begin{pmatrix}q_B\\1\end{pmatrix}
$$

> とする。添字 $AB$ は**$B$ の座標を $A$ の座標へ変換する**向きを意味する。
<!-- formal-statement-end -->

以下では同じ位置と角度の組を $g_{AB}=(t_{AB},\theta_{AB})$ とも書きます。これは第2添字のフレーム $B$ の姿勢を、第1添字のフレーム $A$ から表す記法です。

<!-- definition-example-start: def-u2-06-rigid-transform -->
**定義の確認**：$t_{WB}=(2,1)^T$ m、$\theta_{WB}=\pi/2$ とすると

$$
R(\pi/2)=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
T_{WB}=\begin{pmatrix}0&-1&2\\1&0&1\\0&0&1\end{pmatrix}.
$$

ここで $B$ の二本の軸は世界ではそれぞれ $(0,1)^T$ と $(-1,0)^T$ です。実際、長さの二乗はどちらも $1$、内積は $0\cdot(-1)+1\cdot0=0$、行列式は $0\cdot0-(-1)\cdot1=1$ です。したがって二軸は**単位直交基底をなし、向きを反転しません**。これは上で説明した符号付き面積による判定に対応します。車体の点 $q_B=(3,1)^T$ m を変換すると

$$
q_W=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\begin{pmatrix}3\\1\end{pmatrix}
+\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}1\\4\end{pmatrix}\ {\rm m}.
$$

同じ車体の**変位** $(3,1)^T$ m なら回転した $(-1,3)^T$ m だけであり、原点 $(2,1)^T$ は加えません。点と変位の扱いも定義と一致します。
<!-- definition-example-end -->

世界から車体へ戻すには、長さと角度を保つ回転の逆を使います。三角恒等式 $\cos^2\theta+\sin^2\theta=1$ から

$$
R(\theta)^TR(\theta)=
\begin{pmatrix}
\cos^2\theta+\sin^2\theta&0\\
0&\cos^2\theta+\sin^2\theta
\end{pmatrix}=I_2.
$$

したがって $R(\theta)^{-1}=R(\theta)^T=R(-\theta)$ です。

<a id="prop-u2-06-inverse"></a>

<!-- formal-statement-start -->
> **命題（平面剛体変換の逆変換）**  
> $t_{AB}\in\mathbb R^2$、$\theta_{AB}\in\mathbb R$、$R=R(\theta_{AB})$ で定めた $T_{AB}$ は可逆であり、

$$
T_{AB}^{-1}=T_{BA}=
\begin{pmatrix}R^T&-R^Tt_{AB}\\0_{1\times2}&1\end{pmatrix}
$$

> である。特に任意の点 $q_A\in\mathbb R^2$ について

$$
q_B=R^T(q_A-t_{AB})
$$

> であり、平行移動を先に取り消してから逆回転する。
<!-- formal-statement-end -->

**証明の見取り図**：$q_A=Rq_B+t$ の両辺から $t$ を引き、$R^T$ を左から掛けます。逆行列と同次行列の積がともに単位行列になることも確認します。

<!-- proof-start -->
### 証明

上で確かめた $R^TR=I_2$ に加えて、行ベクトル同士の内積も $\cos^2\theta+\sin^2\theta=1$ と $0$ になるため $RR^T=I_2$ です。これを使います。任意の $q_B$ に対して $q_A=Rq_B+t$ なら、$q_A-t=Rq_B$、ゆえに

$$
R^T(q_A-t)=R^TRq_B=I_2q_B=q_B.
$$

また、二つの同次行列の積を実際に取ると

$$
\begin{pmatrix}R&t\\0_{1\times2}&1\end{pmatrix}
\begin{pmatrix}R^T&-R^Tt\\0_{1\times2}&1\end{pmatrix}
=
\begin{pmatrix}RR^T&-RR^Tt+t\\0_{1\times2}&1\end{pmatrix}
=I_3.
$$

逆順の積も、左上が $R^TR=I_2$、右上が $R^Tt-R^Tt=0$ となり $I_3$ です。したがって双方は互いの逆行列です。
<!-- proof-end -->

**座標を戻す例**：先の $q_W=(1,4)^T$ m と $t_{WB}=(2,1)^T$ m なら、まず差 $(-1,3)^T$ m を取り、

$$
q_B=R(\pi/2)^T\begin{pmatrix}-1\\3\end{pmatrix}
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}-1\\3\end{pmatrix}
=\begin{pmatrix}3\\1\end{pmatrix}\ {\rm m}.
$$

回転と平行移動の順番を取り違えるとこの往復が成立しません。

## 4. 二つの姿勢をつなぐときの順序

三つの座標系 $A,B,C$ がある場合、点 $q_C$ をまず $B$ へ、次に $A$ へ変換します。添字の内側が消える順番です。

<a id="thm-u2-06-composition"></a>

<!-- formal-statement-start -->
> **定理（平面剛体変換の合成則）**  
> 平面の右手系直交座標フレーム $A,B,C$ 間で、$T_{AB}$ と $T_{BC}$ がそれぞれ位置 $t_{AB},t_{BC}\in\mathbb R^2$ と角度 $\theta_{AB},\theta_{BC}\in\mathbb R$ の剛体変換を表すとする。$C$ 座標から $A$ 座標への剛体変換は

$$
T_{AC}=T_{AB}T_{BC}
$$

> であり、その位置・角度は

$$
t_{AC}=t_{AB}+R(\theta_{AB})t_{BC},
\qquad
\theta_{AC}\equiv\theta_{AB}+\theta_{BC}\pmod {2\pi}.
$$
<!-- formal-statement-end -->

**証明の見取り図**：点を二回変換してから、$q_C$ に掛かる行列と原点の項を集めます。二回の回転が角度の和になることは加法定理で確認します。

<!-- proof-start -->
### 証明

まず $q_B=R(\theta_{BC})q_C+t_{BC}$ を $q_A=R(\theta_{AB})q_B+t_{AB}$ に代入します。

$$
\begin{aligned}
q_A
&=R(\theta_{AB})\{R(\theta_{BC})q_C+t_{BC}\}+t_{AB}\\
&=\{R(\theta_{AB})R(\theta_{BC})\}q_C
 +\{t_{AB}+R(\theta_{AB})t_{BC}\}.
\end{aligned}
$$

$\alpha=\theta_{AB},\beta=\theta_{BC}$ とおくと、左上成分は $\cos\alpha\cos\beta-\sin\alpha\sin\beta=\cos(\alpha+\beta)$、左下成分は $\sin\alpha\cos\beta+\cos\alpha\sin\beta=\sin(\alpha+\beta)$ です。右上・右下もそれぞれ $-\sin(\alpha+\beta)$、$\cos(\alpha+\beta)$ なので

$$
R(\alpha)R(\beta)=R(\alpha+\beta).
$$

よって得られた式は $C$ から $A$ への[剛体変換の定義](#def-u2-06-rigid-transform)そのものであり、位置が $t_{AC}$、向きが $\theta_{AC}$ です。ここで $R_{AB}=R(\theta_{AB})$、$R_{BC}=R(\theta_{BC})$ と略記すると、同次行列ではブロック行列積

$$
\begin{pmatrix}R_{AB}&t_{AB}\\0_{1\times2}&1\end{pmatrix}
\begin{pmatrix}R_{BC}&t_{BC}\\0_{1\times2}&1\end{pmatrix}
=
\begin{pmatrix}R_{AB}R_{BC}&R_{AB}t_{BC}+t_{AB}\\0_{1\times2}&1\end{pmatrix}
$$

から同じ結論を得ます。回転は $2\pi$ の整数倍の角度を加えても変わらないため、角度の等号は $2\pi$ を法とする合同です。
<!-- proof-end -->

**直接計算**：$t_{AB}=(3,0)^T$ m、$\theta_{AB}=\pi/2$、$t_{BC}=(1,2)^T$ m、$\theta_{BC}=-\pi/2$ とすると

$$
R(\pi/2)\begin{pmatrix}1\\2\end{pmatrix}
=\begin{pmatrix}-2\\1\end{pmatrix},\quad
t_{AC}=\begin{pmatrix}3\\0\end{pmatrix}+\begin{pmatrix}-2\\1\end{pmatrix}
=\begin{pmatrix}1\\1\end{pmatrix},\quad
\theta_{AC}=0.
$$

$C$ の原点は $A$ から見て $(1,1)$ m、向きは $A$ と同じです。足すのは**向きだけ**ではなく、二番目の変位を先に一番目の座標系へ回してから足します。

## 5. 相対姿勢は世界に依らない

世界の地図を動かしただけで、二台のロボット間の「前方何 m・左方何 m」という関係が変わっては困ります。二つの世界姿勢があれば、[逆行列による座標変換](#prop-u2-06-inverse)を左から合成して、片方から見たもう片方の姿勢を得ます。

<a id="def-u2-06-relative-pose"></a>

<!-- formal-statement-start -->
> **定義（相対姿勢）**  
> 同じ世界座標系 $W$ に対する二つの平面姿勢 $g_{WA}=(t_{WA},\theta_{WA})$、$g_{WB}=(t_{WB},\theta_{WB})$ を与える。それぞれの同次行列を $T_{WA},T_{WB}$ とするとき、**$A$ から見た $B$ の相対姿勢**を

$$
T_{AB}=T_{WA}^{-1}T_{WB}
$$

> で定める。その位置成分は

$$
t_{AB}=R(\theta_{WA})^T(t_{WB}-t_{WA})
$$

> で、角度は $\theta_{WB}-\theta_{WA}$ を $2\pi$ の整数倍の違いまで同一視したものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-06-relative-pose -->
**定義の確認**：世界で $A$ の原点が $(2,1)$ m、向きが $\pi/2$、$B$ の原点が $(2,4)$ m、向きが $\pi$ とします。世界での原点差は $(0,3)^T$ m ですが、$A$ は上を向くので、$A$ 座標では

$$
t_{AB}
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}0\\3\end{pmatrix}
=\begin{pmatrix}3\\0\end{pmatrix}\ {\rm m},\qquad
\theta_{AB}=\pi-\pi/2=\pi/2.
$$

つまり $B$ は $A$ の**前方 $3$ m**、かつ $A$ より反時計回りに $\pi/2$ 回った向きです。[合成則](#thm-u2-06-composition)で戻すと $t_{WB}= (2,1)^T+R(\pi/2)(3,0)^T=(2,4)^T$、角度も $\pi/2+\pi/2=\pi$ となり、元の二姿勢を再現できます。
<!-- definition-example-end -->

<a id="prop-u2-06-frame-invariance"></a>

<!-- formal-statement-start -->
> **命題（相対姿勢の世界座標不変性）**  
> 同一平面上の固定された三つの座標系 $W,A,B$ に対する可逆剛体変換 $T_{WA},T_{WB}$ と、別の世界座標系 $W'$ から $W$ への可逆剛体変換 $T_{WW'}$ を与える。$T_{W'A}=T_{WW'}^{-1}T_{WA}$、$T_{W'B}=T_{WW'}^{-1}T_{WB}$ で両姿勢を表し直しても、

$$
T_{W'A}^{-1}T_{W'B}=T_{WA}^{-1}T_{WB}
$$

> が成り立つ。すなわち物理的な相対姿勢は、同じ世界座標変換を両方に施しても変わらない。
<!-- formal-statement-end -->

**証明の見取り図**：左右に共通して挟まる世界座標変換を、逆行列の積の順序に注意して消します。

<!-- proof-start -->
### 証明

$S=T_{WW'}$、$A_0=T_{WA}$、$B_0=T_{WB}$ と置きます。[逆変換の命題](#prop-u2-06-inverse)によりすべて可逆です。行列積の逆の順序を確かめると、$(S^{-1}A_0)^{-1}=A_0^{-1}S$ です。実際、

$$
(S^{-1}A_0)(A_0^{-1}S)=S^{-1}I_3S=I_3
$$

であり、逆順も同様に $I_3$ になります。そこで

$$
\begin{aligned}
T_{W'A}^{-1}T_{W'B}
&=(S^{-1}A_0)^{-1}(S^{-1}B_0)\\
&=A_0^{-1}SS^{-1}B_0\\
&=A_0^{-1}B_0=T_{WA}^{-1}T_{WB}.
\end{aligned}
$$

これで世界座標系 $W$ の選び方が相対姿勢の数値に影響しないことを示しました。
<!-- proof-end -->

ただし $t_{WA}$ と $t_{WB}$ を**別々の世界フレームで表したまま引く**ことはできません。まず両者を共通の $W$ または $W'$ へ変換する必要があります。

## 6. 角度の差には周期性がある

地図の角度とセンサーの角度の差を、普通の実数の引き算だけで評価すると失敗します。例えば予測向きが $179^\circ$、測定向きが $-179^\circ$ のとき、両者は $-180^\circ$ の境界を挟んでわずか $2^\circ$ しか離れていません。しかし実数として引くと $-358^\circ$ です。

角度 $\alpha$ と $\alpha+2k\pi$ は同じ向きなので、向きの差を一つの区間に戻します。ここでは左端を含み右端を含まない区間 $[-\pi,\pi)$ を選びます。$a\bmod 2\pi$ は $[0,2\pi)$ に入る唯一の剰余（負の $a$ にもこの規約を適用）です。

<a id="def-u2-06-angle-wrap"></a>

<!-- formal-statement-start -->
> **定義（角度の正規化と角度残差）**  
> 任意の実数 $\alpha$ に対し、同じ向きを表す $[-\pi,\pi)$ の代表値を

$$
\operatorname{wrap}(\alpha)=((\alpha+\pi)\bmod 2\pi)-\pi
$$

> と定める。予測角度 $\hat\theta\in\mathbb R$ と観測角度 $z_\theta\in\mathbb R$ が同じ軸と同じ正方向で測られているとき、**観測から予測を引いた角度残差**を

$$
r_\theta=\operatorname{wrap}(z_\theta-\hat\theta)
$$

> とする。ちょうど反対向きの差は $-\pi$ と表記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-06-angle-wrap -->
**定義の確認**：予測 $179^\circ$、観測 $-179^\circ$ の場合、観測−予測は $-358^\circ$。まず $180^\circ$ を加えると $-178^\circ$、これの $360^\circ$ に関する非負剰余は $182^\circ$、最後に $180^\circ$ を引くと

$$
r_\theta=(-358^\circ+180^\circ)\bmod360^\circ-180^\circ
=182^\circ-180^\circ=2^\circ.
$$

$2^\circ\in[-180^\circ,180^\circ)$ であり、$-358^\circ$ と $2^\circ$ は $360^\circ$ 違いで同じ回転です。ちょうど $180^\circ$ の差なら $\operatorname{wrap}(180^\circ)=-180^\circ$ となり、端点の規約にも一致します。ここだけ読みやすく度を併記しましたが、計算プログラムでは rad を用います。
<!-- definition-example-end -->

この関数は**不連続**です。$\pi$ のすぐ手前では値がほぼ $\pi$、少し越すとほぼ $-\pi$ に跳びます。また $\operatorname{wrap}(\alpha)+\operatorname{wrap}(\beta)$ を正規化せずに角度の和の代表値とすることもできません。例えば $170^\circ+30^\circ=200^\circ$ の代表値は $-160^\circ$ です。

角度を含む状態の平均や誤差共分散を扱う後の講義では、この境界を無視して実数ベクトルの公式だけを機械適用できません。一方、**位置**の座標変換には上の回転と平行移動をそのまま使えます。

## 7. よくある失敗と再実行可能な検算

- $T_{AB}$ と $T_{BA}$ を取り違えると、平行移動に**逆回転が必要**という条件を落とします。座標を戻した後に元の点へ戻るかを確認します。
- 点 $q_B$ と変位 $v_B$ を混同すると、変位に原点の位置を足してしまいます。$q_B=0$ のときだけ点は車体原点へ移り、変位 $v_B=0$ は常に零のままです。
- 異なるフレームで書いた $t_A,t_B$ をそのまま引いても、[相対姿勢](#def-u2-06-relative-pose)にはなりません。
- 角度を $\mathbb R$ 上の単純な差として扱うと周期境界で誤ります。測定と予測の同じ角度規約を確認し、差を取った**あと**に正規化します。

数値ラボでは、点の往復、姿勢の合成、相対姿勢の世界座標不変性、角度境界を再計算します。これは手計算と証明の照合手段です。乱数・センサー雑音はまだ導入せず、入力単位は m と rad に固定します。

~~~python-file-lab
# lab-id: U2-06-PLANAR-POSE
# lab-title: 平面姿勢：座標変換・合成・角度wrapの検算
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-06/assets/planar_pose.py
# timeout-ms: 30000
# lab-preset: 点を往復変換 | --scenario frames
# lab-preset: 三姿勢を合成 | --scenario composition
# lab-preset: 角度の境界を確認 | --scenario angles
# lab-preset: 全条件を自己検査 | --self-test
~~~

## 8. 演習と詳細解答

各設問では、座標の添字を省略せず、回転の適用先と順序を記してください。指定がなければ m と rad、反時計回りが正です。

### Level A：向き・点・差を一つずつ計算する

<a id="ex-u2-06-a01"></a>

**A1. 回転だけを受ける変位**

- Level: A

世界と車体が同じ原点を持ち、車体が反時計回りに $\pi/2$ 回転している。車体の変位 $v_B=(2,-1)^T$ m の世界成分を求め、回転前後の長さを確認せよ。

<!-- solution-start -->
**詳細解答**：[座標変換の定義](#def-u2-06-rigid-transform)では変位に平行移動を加えません。$\cos(\pi/2)=0,\sin(\pi/2)=1$ だから

$$
v_W=R(\pi/2)v_B=
\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\begin{pmatrix}2\\-1\end{pmatrix}
=\begin{pmatrix}1\\2\end{pmatrix}\ {\rm m}.
$$

変換前後の長さの二乗は $2^2+(-1)^2=5$ と $1^2+2^2=5$ で等しいです。これは回転行列が直交行列であることとも一致します。
<!-- solution-end -->

<a id="ex-u2-06-a02"></a>

**A2. 車体の点を世界へ**

- Level: A

$t_{WB}=(3,-2)^T$ m、$\theta_{WB}=\pi/2$ のとき、車体上の点 $q_B=(2,1)^T$ m の世界座標を求めよ。

<!-- solution-start -->
**詳細解答**：[剛体変換の定義](#def-u2-06-rigid-transform)より、まず回転成分は

$$
R(\pi/2)\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}-1\\2\end{pmatrix}.
$$

点なので $t_{WB}$ を加えて

$$
q_W=\begin{pmatrix}3\\-2\end{pmatrix}
+\begin{pmatrix}-1\\2\end{pmatrix}
=\begin{pmatrix}2\\0\end{pmatrix}\ {\rm m}.
$$
<!-- solution-end -->

<a id="ex-u2-06-a03"></a>

**A3. 世界の点を車体へ戻す**

- Level: A

A2 と同じ姿勢で、世界の点 $q_W=(2,0)^T$ m を車体座標へ変換せよ。先にどの項を取り消すかも書け。

<!-- solution-start -->
**詳細解答**：[逆変換の命題](#prop-u2-06-inverse)では、まず世界の点から車体原点を引きます。

$$
q_W-t_{WB}=\begin{pmatrix}2-3\\0-(-2)\end{pmatrix}
=\begin{pmatrix}-1\\2\end{pmatrix}.
$$

次に逆回転を左から掛けます。

$$
q_B=R(\pi/2)^T\begin{pmatrix}-1\\2\end{pmatrix}
=\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}-1\\2\end{pmatrix}
=\begin{pmatrix}2\\1\end{pmatrix}\ {\rm m}.
$$

A2 の入力へ戻りました。原点の引き算より先に回転してはいけません。
<!-- solution-end -->

<a id="ex-u2-06-a04"></a>

**A4. 周期境界の観測残差**

- Level: A

予測角度が $179^\circ$、観測角度が $-179^\circ$ のとき、実数の差と $[-180^\circ,180^\circ)$ に正規化した残差を求めよ。残差の符号の意味も述べよ。

<!-- solution-start -->
**詳細解答**：[角度残差の定義](#def-u2-06-angle-wrap)に従い「観測−予測」とすると $-179^\circ-179^\circ=-358^\circ$ です。そこへ $360^\circ$ を足すと $2^\circ$ となり、指定区間へ入ります。正の $2^\circ$ は、予測から観測へ**反時計回りに $2^\circ$** 回すと一致することを意味します。
<!-- solution-end -->

<a id="ex-u2-06-a05"></a>

**A5. 点と変位を区別する**

- Level: A

$t_{WB}=(10,5)^T$ m、$\theta_{WB}=\pi/2$ とする。車体座標で $(1,0)^T$ m と書ける (i) 車体原点から測った点、(ii) 変位ベクトルについて、それぞれの世界座標を計算せよ。

<!-- solution-start -->
**詳細解答**：車体の前向きは $R(\pi/2)(1,0)^T=(0,1)^T$ です。点は原点を持つので

$$
q_W=(10,5)^T+(0,1)^T=(10,6)^T\ {\rm m}.
$$

変位は回転だけを受けるため $v_W=(0,1)^T$ m です。両者を同じ $(10,6)^T$ とするのは、原点を持たない変位に平行移動を加えた誤りです。
<!-- solution-end -->

### Level B：合成と相対姿勢を接続する

<a id="ex-u2-06-b01"></a>

**B1. 合成した後に逆を取る**

- Level: B

$g_{AB}=((1,2)^T,\pi/2)$、$g_{BC}=((2,0)^T,\pi/2)$ とする。$g_{AC}$ を求め、$T_{CA}=T_{AC}^{-1}$ の平行移動と向きを求めよ。

<!-- solution-start -->
**詳細解答**：[合成則](#thm-u2-06-composition)を $A,B,C$ に適用し、$t_{BC}$ を $A$ の基底へ回します。

$$
R(\pi/2)\begin{pmatrix}2\\0\end{pmatrix}
=\begin{pmatrix}0\\2\end{pmatrix},\quad
t_{AC}=\begin{pmatrix}1\\2\end{pmatrix}
+\begin{pmatrix}0\\2\end{pmatrix}
=\begin{pmatrix}1\\4\end{pmatrix},\quad
\theta_{AC}=\pi.
$$

[逆変換の命題](#prop-u2-06-inverse)で $R(\pi)^T=-I_2$ なので

$$
t_{CA}=-R(\pi)^Tt_{AC}
=-(-I_2)\begin{pmatrix}1\\4\end{pmatrix}
=\begin{pmatrix}1\\4\end{pmatrix},\qquad
\theta_{CA}=-\pi.
$$

$\pi$ と $-\pi$ は同じ向きです。逆向きの座標変換の平行移動がたまたま同じ数値になったのは今回の $\pi$ 回転によります。
<!-- solution-end -->

<a id="ex-u2-06-b02"></a>

**B2. 相対姿勢から世界姿勢を再現する**

- Level: B

$A$ の世界姿勢は $t_{WA}=(2,1)^T$ m、$\theta_{WA}=\pi/2$、$B$ は $t_{WB}=(2,4)^T$ m、$\theta_{WB}=\pi$ とする。$g_{AB}$ を求め、その結果を $g_{WA}$ に合成して $g_{WB}$ が戻ることを確認せよ。

<!-- solution-start -->
**詳細解答**：[相対姿勢の定義](#def-u2-06-relative-pose)で原点差を取ると $(0,3)^T$ m です。$A$ の逆回転を掛けるので

$$
t_{AB}=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}0\\3\end{pmatrix}
=\begin{pmatrix}3\\0\end{pmatrix},\qquad
\theta_{AB}=\pi-\frac\pi2=\frac\pi2.
$$

[合成則](#thm-u2-06-composition)で

$$
t_{WA}+R(\pi/2)t_{AB}
=\begin{pmatrix}2\\1\end{pmatrix}
+\begin{pmatrix}0\\3\end{pmatrix}
=\begin{pmatrix}2\\4\end{pmatrix},\qquad
\theta_{WA}+\theta_{AB}=\pi.
$$

したがって位置・角度とも $B$ の世界姿勢と一致します。
<!-- solution-end -->

<a id="ex-u2-06-b03"></a>

**B3. 世界座標系を回しても相対姿勢は同じか**

- Level: B

世界 $W$ で、$W'$ の原点は $(5,1)^T$ m、向きは $\pi/2$ とする。$A$ は $(5,2)^T$ m、向き $\pi/2$、$B$ は $(5,4)^T$ m、向き $\pi$ である。$W$ と $W'$ の両方で $A$ から見た $B$ の相対姿勢を求めて照合せよ。

<!-- solution-start -->
**詳細解答**：$W$ での原点差は $t_{WB}-t_{WA}=(0,2)^T$ m です。[相対姿勢の定義](#def-u2-06-relative-pose)より

$$
t_{AB}=R(\pi/2)^T\begin{pmatrix}0\\2\end{pmatrix}
=\begin{pmatrix}2\\0\end{pmatrix},\qquad
\theta_{AB}=\pi/2.
$$

$W'$ の座標へは[平面剛体変換の逆行列](#prop-u2-06-inverse)を使います。$A$ と $B$ のそれぞれに同じ $t_{WW'}=(5,1)^T$ を引いてから $R(\pi/2)^T$ を掛けるので、

$$
t_{W'A}=R(\pi/2)^T(0,1)^T=(1,0)^T,\quad
t_{W'B}=R(\pi/2)^T(0,3)^T=(3,0)^T.
$$

向きは $W'$ の向き $\pi/2$ を引くため $\theta_{W'A}=0$、$\theta_{W'B}=\pi/2$ です。$W'$ での相対位置は

$$
R(0)^T\{(3,0)^T-(1,0)^T\}=(2,0)^T,
$$

相対角度は $\pi/2-0=\pi/2$。これは $W$ での答えと一致し、[世界座標不変性](#prop-u2-06-frame-invariance)の具体例です。
<!-- solution-end -->

<a id="ex-u2-06-b04"></a>

**B4. 姿勢の表示はどこまで一意か**

- Level: B

二つの平面姿勢 $(t_1,\theta_1)$、$(t_2,\theta_2)$ が、任意の車体座標の点を同じ世界座標へ写すための必要十分条件が $t_1=t_2$ かつ $\theta_1-\theta_2\in2\pi\mathbb Z$ であることを示せ。

<!-- solution-start -->
**詳細解答**：十分性から示します。$t_1=t_2$、$\theta_1-\theta_2=2k\pi$ なら三角関数の周期性で $R(\theta_1)=R(\theta_2)$ となります。[剛体変換の定義](#def-u2-06-rigid-transform)から任意の $q_B$ に対して $R(\theta_1)q_B+t_1=R(\theta_2)q_B+t_2$ です。

必要性では、まず $q_B=(0,0)^T$ を代入すると写った点がそれぞれ $t_1,t_2$ なので $t_1=t_2$ です。次に $q_B=(1,0)^T$ を代入し、共通の平行移動を引くと

$$
\begin{pmatrix}\cos\theta_1\\\sin\theta_1\end{pmatrix}
=
\begin{pmatrix}\cos\theta_2\\\sin\theta_2\end{pmatrix}.
$$

$\delta=\theta_1-\theta_2$ と置いて回転を $-\theta_2$ だけ戻すと $\cos\delta=1,\sin\delta=0$ です。単位円上で両方成り立つ角度は $\delta=2k\pi$（$k\in\mathbb Z$）に限られます。よって必要十分です。
<!-- solution-end -->

### Level C：三つのフレームと角度残差を統合する

<a id="ex-u2-06-c01"></a>

**C1. 三姿勢の合成・点変換・周期残差**

- Level: C

世界 $W$ での $A$ の姿勢が $g_{WA}=((1,2)^T,\pi/2)$ とする。$A$ から見た $B$ の相対姿勢は $g_{AB}=((3,0)^T,\pi/2)$、$B$ から見た $C$ は $g_{BC}=((1,2)^T,-\pi/2)$ である。次をすべて求めよ。

(i) $A$ から見た $C$ の姿勢 $g_{AC}$。(ii) $C$ の世界姿勢 $g_{WC}$。(iii) $C$ 座標で $q_C=(2,-1)^T$ m と表される点の世界座標 $q_W$ を、$C\to W$ と $C\to A\to W$ の二通りで照合。(iv) $C$ の向きのセンサー値が $z_\theta=-3\pi/2$ rad であったとき、(ii) の予測向きとの正規化残差。各向きは $2\pi$ の整数倍の差を同一視する。

<!-- solution-start -->
**詳細解答**：(i) [合成則](#thm-u2-06-composition)に、$t_{AB}=(3,0)^T$、$\theta_{AB}=\pi/2$、$t_{BC}=(1,2)^T$、$\theta_{BC}=-\pi/2$ を入れます。

$$
R(\pi/2)t_{BC}=\begin{pmatrix}-2\\1\end{pmatrix},\quad
t_{AC}=\begin{pmatrix}3\\0\end{pmatrix}+\begin{pmatrix}-2\\1\end{pmatrix}
=\begin{pmatrix}1\\1\end{pmatrix},\quad
\theta_{AC}=\frac\pi2-\frac\pi2=0.
$$

(ii) $g_{WC}=g_{WA}\circ g_{AC}$ に同じ[合成則](#thm-u2-06-composition)を適用します。

$$
R(\pi/2)\begin{pmatrix}1\\1\end{pmatrix}
=\begin{pmatrix}-1\\1\end{pmatrix},\quad
t_{WC}=\begin{pmatrix}1\\2\end{pmatrix}+\begin{pmatrix}-1\\1\end{pmatrix}
=\begin{pmatrix}0\\3\end{pmatrix},\quad
\theta_{WC}=\frac\pi2+0=\frac\pi2.
$$

(iii) 一経路目は[点の変換](#def-u2-06-rigid-transform)より

$$
q_W=t_{WC}+R(\theta_{WC})q_C
=\begin{pmatrix}0\\3\end{pmatrix}
+\begin{pmatrix}1\\2\end{pmatrix}
=\begin{pmatrix}1\\5\end{pmatrix}\ {\rm m}.
$$

もう一経路では $\theta_{AC}=0$ だから

$$
q_A=t_{AC}+R(0)q_C
=\begin{pmatrix}1\\1\end{pmatrix}
+\begin{pmatrix}2\\-1\end{pmatrix}
=\begin{pmatrix}3\\0\end{pmatrix},
$$

さらに

$$
q_W=t_{WA}+R(\pi/2)q_A
=\begin{pmatrix}1\\2\end{pmatrix}
+\begin{pmatrix}0\\3\end{pmatrix}
=\begin{pmatrix}1\\5\end{pmatrix}\ {\rm m}.
$$

両経路が一致しました。(iv) [角度残差の定義](#def-u2-06-angle-wrap)で、観測−予測を取ると

$$
r_\theta=\operatorname{wrap}(-3\pi/2-\pi/2)
=\operatorname{wrap}(-2\pi)=0.
$$

予測と観測は同じ方向です。$-2\pi$ を大きな回転誤差として扱ってはいけません。
<!-- solution-end -->

## 9. 本講のまとめ

位置 $(x,y)$ だけでは「前」がどちらか決まりません。姿勢 $(x,y,\theta)$ と座標フレームを明記すれば、車体の点を世界へ運ぶ $q_W=R(\theta)q_B+t$、逆行列による座標の戻し方、姿勢の合成、二姿勢の相対関係を互いに検算できます。$T_{AB}$ は「$B$ の座標を $A$ へ」の順番とし、角度残差は観測−予測を $[-\pi,\pi)$ に正規化します。

次の U2-07「オドメトリ・速度運動モデルと誤差」では、いま固定した前進方向と回転規約を用いて、移動による姿勢の変化と誤差を扱います。
