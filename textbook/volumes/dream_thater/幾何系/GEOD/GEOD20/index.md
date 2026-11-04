# GEOD20 Equal Earth 図法と等積性

[GEOD19の正積緯度と正積球半径](../GEOD19/index.md#def-geod19-authalic)により、回転楕円体を面積を変えずに球へ移せました。しかし、球を単に横長の長方形へ写すLambert正積円筒では、高緯度の形が大きく横へ伸びます。一方、世界図を穏やかな輪郭に整えるだけでは、地域の相対面積が保たれる保証がありません。

**Equal Earth（イコールアース）** は、Robinson図法に似た外観を目指しながら等積性を厳密に保つ、Šavrič・Patterson・Jennyが2018年に発表した全球向けの**擬円筒図法**です。擬円筒とは緯線が水平線分、中央子午線が直線で、ほかの経線が曲線になる形を指します。この章では輪郭を形容するだけでなく、平面のJacobianを計算して「面積が保たれる」を確かめます。

到達目標は五つです。

1. 中間角、多項式とその導関数から球面・楕円体の順変換を組み立てる。
2. 単調性とJacobianを証明し、微小面積と有限領域の等積性を確かめる。
3. Newton反復と二分法を併用して逆変換し、切れ目・極・定義域外を判別する。
4. Tissot指示楕円により、等積でも形と距離が変わることを数量で示す。
5. EPSG参照値で計算を検算し、地域の等角図と世界の等積図を使い分ける。

以下、測地緯度 $\phi\in[-\pi/2,\pi/2]$ と経度 $\lambda$ はラジアンとし、中央子午線 $\lambda_0$ からの差を $\ell=\lambda-\lambda_0\in[-\pi,\pi]$ の切断された範囲で扱います。回転楕円体は $a\ge b>0$、第一離心率 $e=\sqrt{1-b^2/a^2}\in[0,1)$、[正積緯度](../GEOD19/index.md#def-geod19-authalic) $\beta=\arcsin(q(\phi)/q_p)$、正積球半径 $R_q=a\sqrt{q_p/2}$ とします。球の場合は $R_q=R,\ \beta=\phi$ です。投影平面の東を $E$、北を $N_p$、原点の平行移動を $E_0,N_0$ と書きます。

<!-- definition-example-audit: strict -->

---

## 1. 世界図の輪郭を設計する

### 1.1 緯度に応じた横幅と縦座標

球の面積要素は $R_q^2\cos\beta\,d\beta\,d\lambda$ です。緯線を水平にするため、投影を

$$
E=E_0+R_q\ell\,h(\beta),\qquad
N_p=N_0+R_q\,p(\beta)
$$

の形にします。横幅を決める $h$ と縦位置を決める $p$ を自由に選ぶと、[面積のJacobian判定](../GEOD13/index.md#thm-geod13-preservation-tests)で

$$
\det\frac{\partial(E,N_p)}{\partial(\lambda,\beta)}
=R_q^2h(\beta)p'(\beta)
$$

だから、等積となる条件は $h(\beta)p'(\beta)=\cos\beta$ です。つまり**横幅を設計したら縦方向の伸びを調節する**必要があります。Equal Earthは、この調整を多項式の導関数で自動的に成立させます。

球上の緯度 $\beta$ と区別して、$\sin\beta$ を $\sqrt3/2$ 倍してから逆正弦を取った**中間角** $\theta$ を使います。係数は図法の形を調整する固定の無次元数であり、楕円体定数やCRSの原点ではありません。

<a id="def-geod20-intermediate"></a>
<!-- formal-statement-start -->
> **定義（Equal Earth の中間角と多項式）**  
> 正積球の緯度 $\beta\in[-\pi/2,\pi/2]$ に対し、次の中間角 $\theta$、奇多項式 $P$ と導関数 $D$ を定める。

$$
\boxed{\theta=\arcsin\!\left(\frac{\sqrt3}{2}\sin\beta\right),
\quad -\frac\pi3\le\theta\le\frac\pi3.}
$$

$$
\begin{aligned}
P(\theta)&=A_1\theta+A_2\theta^3+A_3\theta^7+A_4\theta^9,\\
D(\theta)&=P'(\theta)
=A_1+3A_2\theta^2+7A_3\theta^6+9A_4\theta^8,\\
(A_1,A_2,A_3,A_4)&=(1.340264,-0.081106,0.000893,0.003796).
\end{aligned}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod20-intermediate -->
**定義の確認**（赤道・両極）。赤道の $\beta=0$ では $\theta=0$、$P(0)=0$、$D(0)=A_1=1.340264$ です。北極の $\beta=\pi/2$ では $\sin\theta=\sqrt3/2$、指定値域内の解は $\theta=\pi/3$、南極では $\theta=-\pi/3$ です。$P$ が奇関数、$D$ が偶関数なので縦座標は赤道に対し反対称、横幅係数は対称になります。すべての角度を**ラジアン**で多項式へ代入します。
<!-- definition-example-end -->

### 1.2 緯線幅が縦座標の微分で決まる

中間角の連鎖律から、両極以外では

$$
\cos\theta\,\frac{d\theta}{d\beta}
=\frac{\sqrt3}{2}\cos\beta,
\qquad
\frac{d\theta}{d\beta}
=\frac{\sqrt3\cos\beta}{2\cos\theta}.
$$

縦座標に $P(\theta)$ を使えば $p'(\beta)=D(\theta)\,\theta'(\beta)$ です。さきほどの等積条件を満たすには

$$
h(\beta)=\frac{\cos\beta}{D(\theta)\theta'(\beta)}
=\frac{2\cos\theta}{\sqrt3\,D(\theta)}
$$

と選べばよいことが分かります。このため分母に**$P$ そのものではなく導関数 $D$** が現れます。横幅と縦の形を別々に決めたのではありません。

<a id="def-geod20-forward"></a>
<!-- formal-statement-start -->
> **定義（Equal Earth の順変換）**  
> 半径 $R_q>0$ の正積球上で、[中間角と多項式](#def-geod20-intermediate)を使い、経度差 $\ell\in[-\pi,\pi]$、正積緯度 $\beta\in[-\pi/2,\pi/2]$ のEqual Earth投影を次で定める。$E_0,N_0$ は平面の指定した平行移動量である。

$$
\boxed{
\begin{aligned}
E&=E_0+\frac{2R_q\ell\cos\theta}{\sqrt3\,D(\theta)},\\
N_p&=N_0+R_qP(\theta).
\end{aligned}}
$$

> 楕円体上の点では、最初に[GEOD19の正積緯度変換](../GEOD19/index.md#def-geod19-authalic)を行い、元の測地緯度 $\phi$ を $\beta$ に置き換えてから上式を使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod20-forward -->
**定義の確認**（赤道の経度差）。$R_q=1,\ E_0=N_0=0,\ \beta=0,\ \ell=\pi/6$ とすると $\theta=0$ より

$$
E=\frac{2(\pi/6)}{\sqrt3(1.340264)}
\simeq0.451105,\qquad N_p=0.
$$

経度差を $-\pi/6$ に変えると $E$ のみ符号が反転します。$R_q$ をメートルで与えれば $E,N_p$ はメートルです。$\beta$ を使わず楕円体の測地緯度を代入すると、この条件を満たしていても楕円体上の面積保存は壊れます。
<!-- definition-example-end -->

## 2. 数式の正当性：単調性と面積保存

### 2.1 分母は零にならない

逆変換や面積計算で $D(\theta)$ で割るため、$[-\pi/3,\pi/3]$ で正であることが不可欠です。これは数値の試し打ちでなく、係数の符号から全域で保証できます。

<a id="thm-geod20-monotonic"></a>
<!-- formal-statement-start -->
> **定理（Equal Earth 多項式の単調性と定義域）**  
> [Equal Earthの係数](#def-geod20-intermediate)を持つ $P,D$ について、$|\theta|\le\pi/3$ では

$$
D(\theta)\ge A_1+3A_2\frac{\pi^2}{9}
=1.340264-\frac{0.243318\pi^2}{9}>1.073>0.
$$

> 従って $P$ は区間内で厳密単調増加し、$P:[-\pi/3,\pi/3]\to[-P(\pi/3),P(\pi/3)]$ は連続な逆写像を持つ。$P(\pi/3)\simeq1.317362759$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 負の二次項が最も小さくなるのは両端であり、六次・八次項は非負です。導関数が正なら単調増加し、端点は奇関数の対称性で決まります。

<!-- proof-start -->
### 証明

$|\theta|\le\pi/3$ では $\theta^2\le\pi^2/9$、$3A_2=-0.243318<0$ なので

$$
3A_2\theta^2\ge3A_2\frac{\pi^2}{9}.
$$

また $7A_3\theta^6\ge0,\ 9A_4\theta^8\ge0$ です。四項を足すと主張の下界を得ます。$\pi^2/9\simeq1.096623$ から右端は約 $1.07345$ であり、確かに正です。任意の $\theta_1<\theta_2$ に対し

$$
P(\theta_2)-P(\theta_1)
=\int_{\theta_1}^{\theta_2}D(t)\,dt>0
$$

となり厳密単調増加です。$P$ は連続で奇関数なので、中間値の定理から値域は主張の閉区間であり逆写像が一意です。端点値は $P$ に $\pi/3$ を代入して直接算出できます。
<!-- proof-end -->

### 2.2 Jacobianを出発点から計算する

球面上の局所座標 $(\lambda,\beta)$ の面積は $R_q^2\cos\beta\,d\lambda\,d\beta$ です。平面の面積はJacobian行列式の絶対値で変わります。[GEOD13の面積判定](../GEOD13/index.md#thm-geod13-preservation-tests)を、今回はこの具体式に適用します。

<a id="thm-geod20-area"></a>
<!-- formal-statement-start -->
> **定理（Equal Earth のJacobianと等積性）**  
> $R_q>0$、$|\beta|<\pi/2$、$|\ell|<\pi$ とし、[Equal Earth順変換](#def-geod20-forward)に対して、平面の東・北座標 $(E,N_p)$ を球面座標 $(\lambda,\beta)$ で偏微分すると

$$
\boxed{
\det\frac{\partial(E,N_p)}{\partial(\lambda,\beta)}
=R_q^2\cos\beta>0.}
$$

> 従って局所面積縮尺は1である。さらに経度の切れ目をまたがない単射な領域の平面像は、正積球、ひいては元の回転楕円体上の領域と同じ面積を持つ。境界の極と切れ目では、重複像を数えず極限で扱う。
<!-- formal-statement-end -->

**証明の見取り図。** $N_p$ は緯度だけの関数なので $(N_p)_\lambda=0$ です。従って必要なのは $(E)_\lambda(N_p)_\beta$ の積だけで、分母 $D$ と微分で現れる $D$ が打ち消し合います。楕円体との接続は[正積緯度の面積保存定理](../GEOD19/index.md#thm-geod19-authalic-area)が担います。

<!-- proof-start -->
### 証明

$c=2/\sqrt3$ と置くと、[分母の正値性](#thm-geod20-monotonic)より次の偏微分が可能です。

$$
\begin{aligned}
(E)_\lambda&=R_qc\frac{\cos\theta}{D(\theta)},\\
(N_p)_\lambda&=0,\\
(N_p)_\beta&=R_qD(\theta)\frac{d\theta}{d\beta}
=R_qD(\theta)\frac{\sqrt3\cos\beta}{2\cos\theta}.
\end{aligned}
$$

$\cos\theta\ge1/2>0$ なので割り算が定義されます。Jacobianの行列式を展開すると

$$
\begin{aligned}
J&=(E)_\lambda(N_p)_\beta-(E)_\beta(N_p)_\lambda\\
&=\frac{2R_q\cos\theta}{\sqrt3D(\theta)}
\frac{R_qD(\theta)\sqrt3\cos\beta}{2\cos\theta}\\
&=R_q^2\cos\beta.
\end{aligned}
$$

一方、[GEOD19の面積保存](../GEOD19/index.md#thm-geod19-authalic-area)から、楕円体の曲率半径 $M,N$ に対して

$$
MN\cos\phi\,d\phi\,d\lambda
=R_q^2\cos\beta\,d\beta\,d\lambda
=dE\,dN_p
$$

です。両極以外では $\beta\mapsto\theta\mapsto N_p$ は厳密単調、各 $\beta$ 固定では $\ell\mapsto E$ が正の傾きを持つため、切れ目をまたがない開領域で投影は単射です。そこで変数変換公式を積分すれば有限領域の面積も一致します。北極・南極と切断線は面積零の境界で、面積の等式は極限へ拡張されます。
<!-- proof-end -->

**有限帯の確認。** $-\beta_0\le\beta\le\beta_0$、$-\Delta/2\le\ell\le\Delta/2$（$0<\beta_0<\pi/2,\ 0<\Delta<2\pi$）の像では、各 $\beta$ の水平幅は $R_qc\Delta\cos\theta/D$ です。縦方向の微小幅は $R_qD\theta'\,d\beta$ なので

$$
\begin{aligned}
A_{\rm map}
&=\int_{-\beta_0}^{\beta_0}
\frac{R_qc\Delta\cos\theta}{D(\theta)}
\bigl(R_qD(\theta)\theta'(\beta)\bigr)\,d\beta\\
&=R_q^2\Delta\int_{-\beta_0}^{\beta_0}\cos\beta\,d\beta
=2R_q^2\Delta\sin\beta_0.
\end{aligned}
$$

これは球の該当する帯の面積です。**外枠が似ていること**ではなく、この積分が主張の意味です。

## 3. 平面座標から緯度・経度へ戻す

### 3.1 北座標を先に反転する

北座標は経度に依存しません。$Y=(N_p-N_0)/R_q$ と置くと、最初に解く方程式は

$$
P(\theta)=Y,\qquad -\pi/3\le\theta\le\pi/3
$$

です。測地緯度 $\phi$ を一度にNewton法で求める必要はありません。[多項式の単調性](#thm-geod20-monotonic)により $\theta$ を先に一意に求め、それから正積緯度 $\beta$ と測地緯度 $\phi$ を順に復元できます。

<a id="thm-geod20-inverse"></a>
<!-- formal-statement-start -->
> **定理（Equal Earth の逆変換と解の一意性）**  
> $R_q>0$ と[Equal Earthの順変換](#def-geod20-forward)を固定し、$|Y|<P(\pi/3)$ とする。方程式 $P(\theta)=Y$ は $(-\pi/3,\pi/3)$ 内に唯一の解を持ち、その解から

$$
\boxed{
\begin{aligned}
\beta&=\arcsin\!\left(\frac{2\sin\theta}{\sqrt3}\right),\\
\ell&=\frac{\sqrt3(E-E_0)D(\theta)}
{2R_q\cos\theta},\qquad\lambda=\lambda_0+\ell
\end{aligned}}
$$

> と戻せる。ただし指定された切断範囲内の点には $|\ell|<\pi$ を課す。楕円体の場合はさらに $q(\phi)=q_p\sin\beta$ の唯一の $\phi\in(-\pi/2,\pi/2)$ を求める。$|Y|>P(\pi/3)$ は像の外であり、両極 $|Y|=P(\pi/3)$ は経度が地理的に一意でない境界として別扱いにする。
<!-- formal-statement-end -->

**証明の見取り図。** 北座標から単調な $P$ を反転し、中間角の定義から $\beta$ を戻します。横座標を経度について解くのは線形ですが、経度の切れ目・極での座標の退化には注意が必要です。

<!-- proof-start -->
### 証明

[単調性定理](#thm-geod20-monotonic)により $Y$ が開値域にあれば $\theta$ が一意です。$|\theta|<\pi/3$ なので $|2\sin\theta/\sqrt3|<1$ で、逆正弦の指定主値により $\beta$ も一意です。

順変換の横座標で $E-E_0=2R_q\ell\cos\theta/(\sqrt3D)$ と置きます。$D>0$ かつ $\cos\theta\ge1/2$ より両辺に $\sqrt3D/(2R_q\cos\theta)$ を掛けられ、上の $\ell$ を得ます。$|\ell|<\pi$ なら切断区間内で一意です。

楕円体では[正積緯度の単調性](../GEOD19/index.md#thm-geod19-authalic-area)から、$q$ は $(-\pi/2,\pi/2)$ で厳密単調増加、端点値は $\pm q_p$。$q_p\sin\beta\in(-q_p,q_p)$ なので中間値の定理で $\phi$ が存在し、一意です。端点と経度切れ目では局所座標としての一意性を主張しません。
<!-- proof-end -->

### 3.2 頑健なNewton・二分法

$F(t)=P(t)-Y$ として根を囲む区間を最初に $[L,U]=[-\pi/3,\pi/3]$ と置きます。初期値 $t_0=Y/A_1$ は $|Y|\le P(\pi/3)<A_1\pi/3$ より区間内です。各段階で

$$
t_{\rm new}=t-\frac{F(t)}{D(t)}
$$

を提案し、現在の $[L,U]$ の外なら代わりに中点 $(L+U)/2$ を選びます。採用した点 $s$ について $F(s)<0$ なら $L=s$、$F(s)>0$ なら $U=s$、$F(s)=0$ なら終了です。Newton候補が区間端へ寄りすぎる場合も中点を優先すれば、二分法の収束保証を保てます。$D(t)>1.073$ を使うと、求めた角度の誤差には

$$
|s-\theta_*|\le\frac{|F(s)|}{1.073}
$$

という上界があり、残差と区間幅の両方を停止判定に使えます。値域外の $Y$ を無理に内側へ丸めてはいけません。

楕円体の $\phi$ は $q(\phi)-q_p\sin\beta=0$ を $[-\pi/2,\pi/2]$ で二分します。$n$ 回二分した中点の誤差は最大 $\pi/2^{n+1}$ radです。度への変換は最後にします。

**極での注意。** $\beta=\pm\pi/2$ なら $\theta=\pm\pi/3$、$N_p$ は一定でも、式の $E-E_0$ は $\ell$ に比例して変化します。地理的にはどの経度も同じ北極または南極なので、地図の水平な極辺は一対一の座標ではありません。面積が零の境界を無視して局所の等積性を言うことと、極に一意な逆経度があることは別です。

## 4. 等積でも形や距離は保たれない

### 4.1 地表で単位長さの東・北方向を選ぶ

[GEOD13のTissot指示楕円](../GEOD13/index.md#def-geod13-tissot)は、地表の微小円が地図上でどのような楕円になるかを見る道具です。正積球の両極以外で、東向き単位変位は $(R_q\cos\beta)^{-1}\partial_\lambda$、北向き単位変位は $R_q^{-1}\partial_\beta$ です。[計量比較と縮尺](../GEOD13/index.md#thm-geod13-metric-comparison)の具体化として、これらを列に持つ変形行列を作ります。

$c=2/\sqrt3$、$H(\theta)=\cos\theta/D(\theta)$ と置きます。$H$ の導関数は

$$
\begin{aligned}
H'(\theta)
&=\frac{-\sin\theta\,D(\theta)-\cos\theta\,D'(\theta)}{D(\theta)^2},\\
D'(\theta)
&=6A_2\theta+42A_3\theta^5+72A_4\theta^7.
\end{aligned}
$$

球面の東・北単位基底から地図への変形行列は

$$
\boxed{T=
\begin{pmatrix}
\dfrac{cH(\theta)}{\cos\beta}&c\ell H'(\theta)\theta'(\beta)\\
0&D(\theta)\theta'(\beta)
\end{pmatrix}.}
$$

第1列は東方向の像、第2列は北方向の像です。中央子午線でないとき右上成分が現れるため、東・北方向の直交性は一般に保存されません。

<a id="thm-geod20-distortion"></a>
<!-- formal-statement-start -->
> **定理（Equal Earth の局所縮尺と等積ひずみ）**  
> 半径 $R_q>0$ の球面上の両極以外の点について、[Equal Earth投影](#def-geod20-forward)の変形行列 $T$ は $\det T=1$。そのTissot指示楕円の主縮尺 $\sigma_1\ge\sigma_2>0$ は $\sigma_1\sigma_2=1$ を満たす。中央子午線 $\ell=0$ では東西・南北方向が主軸となり、

$$
\boxed{k_{\rm E}=\frac{2\cos\theta}{\sqrt3D(\theta)\cos\beta},
\qquad k_{\rm N}=\frac1{k_{\rm E}}.}
$$

> 特に赤道・中央子午線の交点で $k_{\rm E}=2/(\sqrt3A_1)\simeq0.861547$、$k_{\rm N}=\sqrt3A_1/2\simeq1.160703$ である。従ってその点でさえ等角でも全方向等距離でもない。
<!-- formal-statement-end -->

**証明の見取り図。** 球面上の単位長さに正規化したJacobianを使うと、面積保存は行列式1と同じです。しかし行列式は二つの主縮尺の積だけを決めるので、各縮尺を1にするわけではありません。

<!-- proof-start -->
### 証明

[上三角行列の行列式](../../../基礎科目/LA/LA3C/index.md#thm-la3c-triangular-determinant)を、球面の東・北単位基底に関する上の $2\times2$ 行列 $T$ へ適用すると

$$
\det T
=\frac{c\cos\theta}{D(\theta)\cos\beta}
\cdot D(\theta)\frac{\sqrt3\cos\beta}{2\cos\theta}=1.
$$

[Tissot指示楕円の主軸定理](../GEOD13/index.md#prop-geod13-tissot-axes)を $T$ に適用します。$T^\mathsf TT$ の正の固有値の平方根 $\sigma_1,\sigma_2$ が主縮尺で、$\sigma_1\sigma_2=|\det T|=1$ です。$\ell=0$ では $T$ は正の対角行列となり、対角成分が東西・南北縮尺です。赤道では $\theta=0,\ D(0)=A_1,\ \theta'(0)=\sqrt3/2$ を代入して表示値を得ます。二つの縮尺が異なるため、[等角・等積の判定](../GEOD13/index.md#thm-geod13-preservation-tests)により等角ではなく、両方が1でないので全方向等距離でもありません。
<!-- proof-end -->

**数値例（中央子午線の高緯度）。** 球上の $\beta=60^\circ$ では $\theta\simeq0.848062079,\ D\simeq1.176733848$。従って $k_{\rm E}\simeq1.298106,\ k_{\rm N}\simeq0.770353$ です。局所的な円の東西半径が約1.30倍、南北半径が約0.77倍になっても、面積は1倍のままです。

### 4.2 楕円体上での方向別縮尺

先ほどの $T$ は**正積球の単位円**を基準とした値です。楕円体上の実距離を基準にすると、[GEOD4の計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)の東西長 $N(\phi)\cos\phi\,d\lambda$、南北長 $M(\phi)\,d\phi$ を使います。$B=d\beta/d\phi$ とすると、両極以外での行列は

$$
T_{\rm ell}=
\begin{pmatrix}
\dfrac{R_qcH(\theta)}{N(\phi)\cos\phi}
&\dfrac{R_qc\ell H'(\theta)\theta'(\beta)B}{M(\phi)}\\
0&\dfrac{R_qD(\theta)\theta'(\beta)B}{M(\phi)}
\end{pmatrix}.
$$

[正積緯度の面積微分式](../GEOD19/index.md#thm-geod19-authalic-area)を代入すれば

$$
\det T_{\rm ell}
=\frac{R_q^2\cos\beta\,B}{MN\cos\phi}=1.
$$

楕円体でも面積は保存されますが、方向別縮尺は正積球の値とは完全には同じでありません。$B$ を1と置くと楕円体の距離の判定を誤ります。

**Gauss–Krügerとの比較。** [GEOD18の点縮尺・子午線収差](../GEOD18/index.md#thm-geod18-convergence-scale)は局所等角図法の角度と縮尺を扱います。Gauss–Krügerでは小円は円へ写りますが面積比は原則 $k^2$、Equal Earthでは小円が楕円に変わっても面積比は1です。前者は地域の測量・大縮尺図、後者は面積を比較する全球主題図に向きます。いずれも測地基準系や観測の時点を自動で決めるものではありません。

## 5. 数値例・公的定義との照合

### 5.1 EPSG method 1078 の検算点

[EPSGのEqual Earth method 1078](https://epsg.io/1078-method)の例を、WGS84楕円体 $a=6378137\ \mathrm m$、$1/f=298.257223563$、$\lambda_0=-90^\circ$、$E_0=N_0=0$ で再計算します。入力は

$$
\phi=34^\circ03'27.169''\ {\rm N},\qquad
\lambda=117^\circ11'48.349''\ {\rm W}.
$$

$e^2=f(2-f)$、[GEOD19の $q,q_p$](../GEOD19/index.md#def-geod19-authalic)を使い、緯度・経度をラジアンへ変換してから順変換します。

| 中間量 | 計算値 |
| --- | ---: |
| $q_p$ | $1.99553108750$ |
| $R_q$ | $6\,371\,007.1809\ \mathrm m$ |
| $\beta$ | $0.5923399644\ \mathrm{rad}$ |
| $\theta$ | $0.5046548375\ \mathrm{rad}$ |
| $\ell$ | $-0.4746730709\ \mathrm{rad}$ |
| $E$ | 約 $-2\,390\,749.043\ \mathrm m$ |
| $N_p$ | 約 $4\,242\,849.758\ \mathrm m$ |

EPSG掲載の値は $E=-2\,390\,749.042\ \mathrm m$、$N_p=4\,242\,849.758\ \mathrm m$ です。入力角度や中間値の丸め方によって最後のミリメートル程度が異なるので、この表示値との比較では**両成分0.01 m以内**を採用します。単なる往復一致ではなく、外部参照値との照合を行います。

[PROJのEqual Earth実装](https://proj.org/en/stable/operations/projections/eqearth.html)も球面・楕円体の両形式を提供します。楕円体指定と球半径指定を混同しないこと、中央子午線・false easting / northing・度とラジアンを揃えることが検算の前提です。

### 5.2 対称性と入力異常のテスト

| 入力 | 数学的に期待される値 | 実装の扱い |
| --- | --- | --- |
| $\beta=0,\ \ell=0$ | $E=E_0,\ N_p=N_0$ | 原点と単位 |
| $\ell\mapsto-\ell$ | 東座標差だけ符号反転 | 東西軸 |
| $\beta\mapsto-\beta$ | 北座標差だけ符号反転 | 南北軸 |
| $\beta=\pm\pi/2$ | $N_p-N_0=\pm R_qP(\pi/3)$ | 極の経度は一意でない |
| $|Y|>P(\pi/3)$ | 逆変換の解がない | 範囲外エラー |
| $|Y|<P(\pi/3)$ でも $|\ell|>\pi$ | 選んだ切断範囲外 | 経度切れ目を再検討 |
| $e\to0$ | $\beta\to\phi,\ R_q\to R$ | 球面極限 |

Equal Earthは**等積であって無歪みではありません**。森林面積・人口総数の全球分布の比較には有益ですが、地図上の短い線分をそのまま測地距離と解釈したり、局所角度を読み取ったりしてはいけません。

---

## 6. 演習と詳細解答

### Level A：公式の意味と境界を判定する

<a id="ex-geod20-a01"></a>
#### A1. 導関数と全域の正値性

$P(t)=1.340264t-0.081106t^3+0.000893t^7+0.003796t^9$ とする。$P'(t)$ を求め、$|t|\le\pi/3$ で $P'(t)>1.073$ を証明せよ。

- Level: A
- ID: GEOD20-A1

<!-- solution-start -->
**詳細解答。** べき関数を項別微分すると

$$
P'(t)=1.340264-0.243318t^2+0.006251t^6+0.034164t^8.
$$

$t^6,t^8\ge0$ です。負の二次項について $t^2\le\pi^2/9$ から

$$
P'(t)\ge1.340264-0.243318\frac{\pi^2}{9}
\simeq1.07345>1.073.
$$

従って零除算は起こらず、$P$ は全域で厳密単調増加です。[単調性定理](#thm-geod20-monotonic)の数値下界の由来も確認できました。
<!-- solution-end -->

<a id="ex-geod20-a02"></a>
#### A2. 赤道の方向別縮尺

半径 $R>0$ の球のEqual Earth投影において、$\beta=0,\ \ell=0$ の東・北縮尺を計算せよ。面積比と等角性を判定せよ。

- Level: A
- ID: GEOD20-A2

<!-- solution-start -->
**詳細解答。** $D(0)=A_1$、$\theta'(0)=\sqrt3/2$ です。[縮尺式](#thm-geod20-distortion)へ代入すると

$$
k_{\rm E}=\frac{2}{\sqrt3A_1}\simeq0.861547,
\qquad k_{\rm N}=\frac{\sqrt3A_1}{2}\simeq1.160703.
$$

中央子午線では交差成分が0なので面積比は積 $k_{\rm E}k_{\rm N}=1$。一方、二縮尺は異なり、[等角判定](../GEOD13/index.md#thm-geod13-preservation-tests)の $T^\mathsf TT=k^2I$ を満たさず非等角です。
<!-- solution-end -->

<a id="ex-geod20-a03"></a>
#### A3. 極での中間角と水平辺

$R_q=1,\ E_0=N_0=0$ のEqual Earth投影において、北極の $\theta,N_p$ と、$\ell=0$ と $\ell=\pi/2$ の東座標を表せ。北極の逆経度が地理的に一意か説明せよ。

- Level: A
- ID: GEOD20-A3

<!-- solution-start -->
**詳細解答。** $\sin\beta=1$ なので $\theta=\arcsin(\sqrt3/2)=\pi/3$、$N_p=P(\pi/3)\simeq1.317362759$ です。$\cos(\pi/3)=1/2$ だから

$$
E(\ell=0)=0,\qquad
E(\ell=\pi/2)=\frac{\pi}{2\sqrt3D(\pi/3)}.
$$

$D(\pi/3)\simeq1.131087680>0$ なので後者は正です。地球上の北極では両入力は同一地点です。経度が地理的に定義できないという**極座標の退化**を失うと、横座標から物理的に一意な経度を逆算できると誤解します。
<!-- solution-end -->

<a id="ex-geod20-a04"></a>
#### A4. 符号・単位・中央子午線

球の半径 $R=1000\ \mathrm m$、$\lambda_0=30^\circ$、$\lambda=0^\circ$、$\beta=0$、$E_0=500\ \mathrm m,\ N_0=-200\ \mathrm m$ とする。順変換の座標を式で求め、東西・南北の向きを確認せよ。

- Level: A
- ID: GEOD20-A4

<!-- solution-start -->
**詳細解答。** ラジアンに換算すると $\ell=(0-30)\pi/180=-\pi/6$、$\theta=0$ です。[順変換](#def-geod20-forward)へ代入して

$$
E=500-\frac{1000\pi}{3\sqrt3A_1}\ \mathrm m,\qquad
N_p=-200\ \mathrm m.
$$

$E-E_0<0$ なので点は中央子午線より西です。赤道なので北座標は $N_0$ のままです。度の数値 $-30$ を多項式や横座標式へ直接代入すると、係数の設計で想定したラジアンと異なる巨大な値になります。
<!-- solution-end -->

<a id="ex-geod20-a05"></a>
#### A5. 逆変換できない平面座標

$R_q=1,\ E_0=N_0=0$ とする。$(E,N_p)=(0,1.4)$ がEqual Earthの全球像に入るか判定せよ。さらに $N_p=0$ のとき許される $|E|$ の範囲を、経度切断 $|\ell|\le\pi$ で表せ。

- Level: A
- ID: GEOD20-A5

<!-- solution-start -->
**詳細解答。** [単調性定理](#thm-geod20-monotonic)により $|P(\theta)|\le P(\pi/3)\simeq1.317363<1.4$ で、北座標 $1.4$ には解がありません。$N_p=0$ なら $P(\theta)=0$ の唯一の解は $\theta=0$ です。よって $\beta=0$、$E=2\ell/(\sqrt3A_1)$ であり

$$
|E|\le\frac{2\pi}{\sqrt3A_1}.
$$

北座標の範囲内であっても横座標の経度切断を別途検査する必要があります。
<!-- solution-end -->

### Level B：微分・反復・縮尺を再構成する

<a id="ex-geod20-b01"></a>
#### B1. 中間角を用いた等積条件の逆設計

球面の緯度 $\beta$ に対して $\theta=\arcsin(\sqrt3\sin\beta/2)$ と置く。$P$ は $[-\pi/3,\pi/3]$ で $P'>0$ を満たす微分可能な奇関数とする。$E=R\ell h(\theta)$、$N_p=RP(\theta)$ が等積となるための $h(\theta)$ を導け。Equal Earthの公式がその形を満たすことを検証せよ。

- Level: B
- ID: GEOD20-B1

<!-- solution-start -->
**詳細解答。** 緯度方向の微分は $d\theta/d\beta=\sqrt3\cos\beta/(2\cos\theta)$ です。横座標は経度差 $\ell$ に比例するので

$$
\frac{\partial E}{\partial\lambda}=Rh(\theta),\qquad
\frac{\partial N_p}{\partial\lambda}=0,\qquad
\frac{\partial N_p}{\partial\beta}=RP'(\theta)\theta'(\beta).
$$

行列式は $R^2h(\theta)P'(\theta)\theta'(\beta)$ であり、球の面積要素は $R^2\cos\beta$ です。[面積の判定](../GEOD13/index.md#thm-geod13-preservation-tests)に等置して

$$
h(\theta)=\frac{\cos\beta}{P'(\theta)\theta'(\beta)}
=\frac{2\cos\theta}{\sqrt3P'(\theta)}.
$$

$P'=D$ を入れると[Equal Earth順変換](#def-geod20-forward)の横幅と一致します。$P'>0$ と $\cos\theta>0$ は除算と向きの保存に必要です。任意の $h$ を選んで等積を宣言できるわけではありません。
<!-- solution-end -->

<a id="ex-geod20-b02"></a>
#### B2. Newton反復の2段を手計算で検証する

$Y=P(0.5)$（多項式の係数は本章のもの）を与え、$P(\theta)=Y$ を解く。$\theta_0=Y/A_1$ としてNewtonの $\theta_1,\theta_2$ を式と近似値で求め、解の一意性と残差による誤差上界を示せ。

- Level: B
- ID: GEOD20-B2

<!-- solution-start -->
**詳細解答。** まず多項式へ $t=0.5$ を代入し

$$
\begin{aligned}
Y&=1.340264(0.5)-0.081106(0.5)^3\\
&\quad+0.000893(0.5)^7+0.003796(0.5)^9\\
&=0.660008140625.
\end{aligned}
$$

従って $\theta_0=Y/1.340264\simeq0.4924463692$。$F(t)=P(t)-Y$、$F'(t)=D(t)$ に対し[逆変換の反復](#thm-geod20-inverse)で

$$
\begin{aligned}
\theta_1&=\theta_0-\frac{P(\theta_0)-Y}{D(\theta_0)}
\simeq0.4999947068,\\
\theta_2&=\theta_1-\frac{P(\theta_1)-Y}{D(\theta_1)}
\simeq0.499999999997.
\end{aligned}
$$

$|P(\theta_1)-Y|\simeq6.77\times10^{-6}$ より $\theta_1$ の真の解との差は $6.77\times10^{-6}/1.073<6.32\times10^{-6}$ radです。実際の根は $0.5$、[厳密単調性](#thm-geod20-monotonic)によりほかの根はありません。この例は収束を示しますが、一般入力では区間を保つ安全策も必要です。
<!-- solution-end -->

<a id="ex-geod20-b03"></a>
#### B3. 楕円体の有限面積がそのまま残るか

$a>b>0$ の回転楕円体上で、$0\le\phi\le\phi_1<\pi/2$、$-\Delta/2\le\ell\le\Delta/2$（$0<\Delta<2\pi$）を取る。Equal Earthへ写した像の面積を $a,q(\phi_1),\Delta$ だけで表せ。なぜ球面の公式へ $\phi$ を直接代入してはいけないか説明せよ。

- Level: B
- ID: GEOD20-B3

<!-- solution-start -->
**詳細解答。** 楕円体の面積は[正積緯度の面積保存](../GEOD19/index.md#thm-geod19-authalic-area)により

$$
A_{\rm ell}=\frac{a^2\Delta}{2}[q(\phi_1)-q(0)]
=\frac{a^2\Delta}{2}q(\phi_1).
$$

Equal Earthの像は[Jacobian定理](#thm-geod20-area)と正積球の面積要素から

$$
\begin{aligned}
A_{\rm map}
&=R_q^2\Delta\int_0^{\beta_1}\cos\beta\,d\beta
=R_q^2\Delta\sin\beta_1\\
&=\frac{a^2q_p}{2}\Delta\frac{q(\phi_1)}{q_p}
=\frac{a^2\Delta}{2}q(\phi_1).
\end{aligned}
$$

球面の公式へ測地緯度を直接入れると、途中で $\cos\phi\,d\phi$ を使うことになります。しかし楕円体の真の面積要素は $MN\cos\phi\,d\phi\,d\lambda$ で、通常 $MN\ne R_q^2$ です。$\beta(\phi)$ の導関数こそ、その違いを補償する要素です。
<!-- solution-end -->

<a id="ex-geod20-b04"></a>
#### B4. 中央子午線を外れたTissot指示楕円

半径1の球面で $\beta=30^\circ,\ \ell=\pi/2$ のEqual Earth投影を考える。東・北単位基底での変形行列 $T$ を数値計算し、面積比、主縮尺と等角性を判定せよ。中央子午線と違う点を明示せよ。

- Level: B
- ID: GEOD20-B4

<!-- solution-start -->
**詳細解答。** [局所縮尺の導出](#thm-geod20-distortion)により、$\theta=\arcsin(\sqrt3/4)\simeq0.447832397$、$\theta'=\sqrt3\cos30^\circ/(2\cos\theta)\simeq0.832050294$ です。多項式を微分して $D\simeq1.291571332$、$D'\simeq-0.216268443$、従って

$$
H=\frac{\cos\theta}{D}\simeq0.697900144,\qquad
H'=\frac{-\sin\theta D-\cos\theta D'}{D^2}\simeq-0.218399803.
$$

$c=2/\sqrt3$、$\ell=\pi/2$ を代入すると

$$
T\simeq
\begin{pmatrix}
0.930533526&-0.329602932\\
0&1.074652307
\end{pmatrix},
\qquad \det T\simeq1.
$$

主縮尺は $T^\mathsf TT$ の固有値の平方根です。行列の跡 $\operatorname{tr}(T^\mathsf TT)\simeq2.13$ と行列式 $\det(T^\mathsf TT)=1$ を使い、固有値を

$$
\mu_\pm=\frac{\operatorname{tr}(T^\mathsf TT)
\pm\sqrt{\operatorname{tr}(T^\mathsf TT)^2-4}}2
$$

で求めると、$\sigma_1\simeq1.195914,\ \sigma_2\simeq0.836180$ です。$\sigma_1\sigma_2=1$ でも $\sigma_1\ne\sigma_2$ なので非等角です。中央子午線 $\ell=0$ と異なり右上の成分が非零で、地理的な東・北方向そのものは主軸ではありません。
<!-- solution-end -->

### Level C：定義から数値検算と地図の選択まで

<a id="ex-geod20-c01"></a>
#### C1. WGS84のEqual Earthを独立に検証する

WGS84楕円体 $a=6378137\ \mathrm m,\ 1/f=298.257223563$ を用い、Equal Earthの中央子午線を $90^\circ$ W、平行移動を零とする。点 $P$ は $\phi=34^\circ03'27.169''$ N、$\lambda=117^\circ11'48.349''$ W にある。

1. $e^2,q_p,R_q$、$\beta,\theta$ を定義から求め、順変換の $E,N_p$ をメートル単位で計算し、EPSG method 1078の参照値と照合せよ。
2. 計算した座標から中間角、正積緯度、経度差を逆変換し、さらに $q(\phi)=q_p\sin\beta$ を解く手順と残差・定義域の検査を述べよ。
3. 同じ楕円体の緯度 $0$ から $\phi_P$、経度幅 $\Delta=\pi/6$ の帯について、楕円体面積とEqual Earth像の面積を同じ式で示せ。
4. 世界の森林面積比較図と、日本の基準点近傍で測角・測距する地域図に、Equal EarthとGauss–Krügerのどちらを採用するか。等積・等角・縮尺・datumの観点から説明せよ。

- Level: C
- ID: GEOD20-C1

<!-- solution-start -->
**詳細解答。**

**1. 楕円体から順に計算する。** $f=1/298.257223563$、$e^2=f(2-f)$ とし、

$$
\begin{aligned}
e^2&\simeq0.00669437999014,\\
q_p&=1+\frac{1-e^2}{e}\operatorname{artanh}e
\simeq1.99553108750,\\
R_q&=a\sqrt{q_p/2}\simeq6371007.1809\ \mathrm m.
\end{aligned}
$$

角度をラジアンにして $q(\phi)$ を[正積緯度の定義](../GEOD19/index.md#def-geod19-authalic)へ代入します。

$$
\begin{aligned}
\phi_P&\simeq0.5944163293,\qquad \lambda_P\simeq-2.0454693977,\\
\beta_P&=\arcsin\frac{q(\phi_P)}{q_p}\simeq0.5923399644,\\
\theta_P&=\arcsin\left(\frac{\sqrt3}{2}\sin\beta_P\right)
\simeq0.5046548375,\\
\ell_P&=\lambda_P-(-\pi/2)\simeq-0.4746730709.
\end{aligned}
$$

これらを[順変換式](#def-geod20-forward)へ入れると

$$
\begin{aligned}
E&=\frac{2R_q\ell_P\cos\theta_P}{\sqrt3D(\theta_P)}
\simeq-2390749.043\ \mathrm m,\\
N_p&=R_qP(\theta_P)\simeq4242849.758\ \mathrm m.
\end{aligned}
$$

EPSGの参照値は約 $(-2390749.042,\ 4242849.758)\ \mathrm m$。両成分は、入力を秒の小数3桁へ丸めていることも考慮した0.01 mの照合許容内です。単なる自分自身への逆変換一致だけを外部検算の代わりにしていません。

**2. 逆変換と異常検査。** まず $Y=N_p/R_q$ が $|Y|<P(\pi/3)$ を満たすか判定し、$P(t)-Y=0$ を $[-\pi/3,\pi/3]$ 内で括ったNewton法・二分法で解きます。残差 $|P(t)-Y|/1.073$ が角度誤差の上界です。得た $t$ から

$$
\beta=\arcsin\frac{2\sin t}{\sqrt3},
\qquad \ell=\frac{\sqrt3 E D(t)}{2R_q\cos t},
\qquad\lambda=-\frac\pi2+\ell
$$

を計算します。$|\ell|<\pi$ を確認し、最後に $q(\phi)-q_p\sin\beta=0$ を $\phi\in[-\pi/2,\pi/2]$ で二分します。戻った $\phi,\lambda$ を順変換し直し座標残差を確認します。北極・南極では逆経度を一意に返しません。

**3. 有限領域の面積。** $\beta_P=\beta(\phi_P)$ とすると、[GEOD19の有限帯面積](../GEOD19/index.md#thm-geod19-authalic-area)より

$$
A_{\rm ell}=\frac{a^2}{2}\frac\pi6 q(\phi_P).
$$

[Equal EarthのJacobian](#thm-geod20-area)で球上の $\beta\in[0,\beta_P]$ を積分すれば

$$
\begin{aligned}
A_{\rm map}
&=R_q^2\frac\pi6\int_0^{\beta_P}\cos\beta\,d\beta\\
&=R_q^2\frac\pi6\sin\beta_P
=\frac{a^2q_p}{2}\frac\pi6\frac{q(\phi_P)}{q_p}\\
&=A_{\rm ell}.
\end{aligned}
$$

積分での一致は平面像と元領域の面積比1を意味しますが、線分距離の一致は主張していません。

**4. 目的を区別する。** 森林面積の全球比較には面積比を保つEqual Earthを選びます。ただし面積集計方法・統計単位を別に決め、図法の等積性を統計の正しさと混同しません。地域での測角・測距には局所等角なGauss–Krüger系を採用し、[GEOD18の縮尺](../GEOD18/index.md#thm-geod18-convergence-scale)で距離の補正を確認します。両方とも使用楕円体、測地基準系、経緯度の軸順序・時点を別途指定する必要があります。
<!-- solution-end -->

---

## 7. 次章へ：日本の投影座標は何を規定するか

Equal Earthでは、緯度の等積変換、投影による面積保存、経度の切れ目、局所的な形状歪みが別の論点だと分かりました。次のGEOD21では、地域図のためのGauss–Krügerを実務の座標参照系として読むために、中央子午線・縮尺原点・軸順序・系番号・datum・epochを区別します。
