# GEOD22 総合演習：観測から測地座標、地域図・世界図まで

ここまで、距離・角度を測り、測量網を平差し、楕円体上の位置を定め、地域の等角図と世界の等積図へ写す道具を一つずつ作りました。ところが現実のGISでは、各工程が正しくても、途中で **標高を楕円体高に取り違える、XとYを交換する、異なるdatumを同じものとみなす** といった誤りが起こります。本章は同じ小さな模擬データを最後まで追い、その誤りを検出できるようにする総合演習です。

到達目標は次の六つです。

1. 拘束された観測の重み付き平差と共分散を求め、何の不確かさを表すか述べる。
2. 楕円体上の局所東北成分から測地緯度・経度、地心座標、高さへ進み、近似の適用範囲を明示する。
3. GRS80・JGD2024・日本の第IX系について、Krüger順逆変換、軸、中央縮尺、点縮尺、子午線収差を区別する。
4. 同一の測地位置を正積緯度経由でEqual Earthへ写し、等角と等積の違いをJacobianで説明する。
5. 観測共分散、投影の打切り・丸め、基準系差と高さの還元誤差を別の欄で管理する。
6. 原点・東西対称性・赤道・極・座標帯境界・datum不一致を含むテストで、往復変換だけでは見逃す故障を検出する。

必要な道具は[GEOD8の重み付き平差](../GEOD8/index.md#thm-geod8-weighted-normal)、[GEOD5の測地・地心変換](../GEOD5/index.md#thm-geod5-forward)、[GEOD10の高さ関係](../GEOD10/index.md#prop-geod10-gnss-height)、[GEOD17のKrüger順変換](../GEOD17/index.md#def-geod17-forward-map)、[GEOD18の逆変換と点縮尺](../GEOD18/index.md#def-geod18-inverse-map)、[GEOD19の正積緯度](../GEOD19/index.md#def-geod19-authalic)、[GEOD20のEqual Earth](../GEOD20/index.md#def-geod20-forward)、[GEOD21の日本の座標系](../GEOD21/index.md#def-geod21-japan-crs)です。式を再発明せず、**入力・適用条件・出力を正確につなぐ**ことに集中します。

以下、角度を式へ入れるときはラジアン、距離と高さはmです。すべての観測値は学習用の **合成データ** であり、実在基準点の測量成果ではありません。

<!-- definition-example-audit: strict -->

---

## 1. どの量を、何の基準に対して得たのか

### 1.1 計算の入口を固定する

基準点Oは、GRS80楕円体上のJGD2024に属する測地経緯度

$$
\phi_0=36^\circ,\qquad \lambda_0=139^\circ50'
$$

を持ち、日本の平面直角座標系第IX系の原点と同じ経緯度とします。観測対象PはOから数十mだけ離れた点です。Oの測地経緯度と座標時点は、**この演習の条件として既知・固定**とし、基準点自体の共分散は以下の数値例には含めません。

観測はすでに器械高・気象・傾斜距離など必要な補正を施して、**Oの楕円体接平面の東（e）・北（n）の距離に還元済み**と仮定します。地表で測った斜距離をいきなり平面距離とする設定ではありません。[ENU基底](../GEOD5/index.md#def-geod5-enu)は東・北・楕円体法線上向きの直交単位基底です。

| 成分 | 独立な観測値（m） | 各観測の既知標準偏差（m） |
| --- | --- | --- |
| 東 e | 10.04, 9.98 | 0.02, 0.04 |
| 北 n | 20.02, 19.98 | 0.02, 0.02 |

観測誤差は平均0、互いに無相関、示した分散が既知であると仮定します。正規分布を仮定しなくても以下の線形不偏推定量と共分散は計算できます。外れ値・共通の系統誤差がないことはデータ自身からは保証できません。

座標の意味を失わないよう、各段階で「入力CRS・datum・epoch・単位・軸順序・高さの種類・演算法・精度」を記録する一式を作ります。これは新しい地球の数学的構造ではなく、既習の[座標参照系](../GEOD2/index.md#def-geod2-crs)と[座標時点](../GEOD2/index.md#def-geod2-coordinate-epoch)を計算へ結び付けるための記録です。

<a id="def-geod22-coordinate-ledger"></a>
<!-- formal-statement-start -->
> **定義（座標処理台帳）**  
> 入力位置と出力位置のそれぞれについて、(i)座標参照系・測地基準系の実現・座標時点、(ii)楕円体と高さの種類、(iii)座標軸の名称・順序・単位、(iv)使用した観測補正・座標変換または座標換算とその有効域、(v)推定共分散と別に扱う数値誤差・系統差、を識別可能に記録したものを、本章の座標処理台帳という。未知の項目は未知と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod22-coordinate-ledger -->
**定義の確認。** 入口の一行は「JGD2024・時点は入力資料の値、GRS80、O固定、接平面ENU、e,nの順、m、補正済みの模擬観測、観測分散は上表」とします。測点の楕円体高を仮に120.0 m、ジオイド高を30.5 mとする場合には、さらに「高さ関係は同一基準における近似」を明記します。時点が未提示なら空欄のまま黙認せず「未指定・実務変換不可」と記録するので、(i)から(v)をそれぞれ照合できます。
<!-- definition-example-end -->

### 1.2 平差の数値を出発点から求める

各成分は未知量一つ、観測二つの線形モデルです。[GEOD8の重み](../GEOD8/index.md#def-geod8-weight)を観測分散の逆数として使い、東の重みは $w_1=0.02^{-2}=2500,\ w_2=0.04^{-2}=625$、北はともに2500です。東について、目的関数を実際に書くと

$$
Q(e)=2500(10.04-e)^2+625(9.98-e)^2.
$$

$Q'(e)=-2[2500(10.04-e)+625(9.98-e)]$ を0とすると

$$
\boxed{\hat e=\frac{2500(10.04)+625(9.98)}{3125}
=10.028\ {\rm m}.}
$$

北は等重みなので $\hat n=(20.02+19.98)/2=20.000$ m です。東の観測残差（観測値−推定値）は $(0.012,-0.048)$ m、北は $(0.020,-0.020)$ mとなり、東の重み付き残差平方和は

$$
2500(0.012)^2+625(-0.048)^2=0.36+1.44=1.80
$$

です。最小二乗だから残差が全てゼロになるのではありません。既知分散で重み付けした残差はモデルの整合を見る一つの情報であって、この4件だけで無バイアス性を証明しません。

観測の座標を $(e,n)$ の順に置くと、互いに無相関なので

$$
\boxed{
\hat{\boldsymbol u}=
\begin{pmatrix}10.028\\20.000\end{pmatrix}{\rm m},
\qquad C_u=
\begin{pmatrix}
1/3125&0\\0&1/5000
\end{pmatrix}{\rm m}^2.}
$$

ここで $\sqrt{1/3125}\simeq0.017889$ mと $\sqrt{1/5000}\simeq0.014142$ mが東北の標準偏差です。**Oを固定した相対位置の分散**であり、O自体の測地成果誤差を含めた絶対位置の分散ではありません。

### 1.3 一般の重み付き平差からこの数値が出る理由

<a id="thm-geod22-adjustment"></a>
<!-- formal-statement-start -->
> **命題（拘束された東北観測の平差と共分散）**  
> 真の局所座標 $u=(e,n)^{\mathsf T}$、観測 $y=Au+\varepsilon$ を考える。$A$ が列フルランク、$E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=\Sigma$ が正定値、かつ基準点Oが固定されているとする。このとき重み付き最小二乗の唯一の解と、その共分散は
>
> $$
> \hat u=(A^{\mathsf T}\Sigma^{-1}A)^{-1}A^{\mathsf T}\Sigma^{-1}y,\qquad
> \operatorname{Cov}(\hat u)=(A^{\mathsf T}\Sigma^{-1}A)^{-1}.
> $$
>
> 前節の4観測を東2件・北2件の順に並べた場合、表示した $\hat u,C_u$ を得る。
<!-- formal-statement-end -->

**証明の見取り図。** 一般公式の核心は[GEOD8の正規方程式](../GEOD8/index.md#thm-geod8-weighted-normal)です。今回は設計行列とその階数、共分散の積を明示し、座標の数値まで落とします。

<!-- proof-start -->
### 証明

行列は

$$
A=\begin{pmatrix}1&0\\1&0\\0&1\\0&1\end{pmatrix},
\qquad
\Sigma^{-1}=\operatorname{diag}(2500,625,2500,2500)
$$

です。$A$ の第1列と第2列は一次独立なので列フルランクです。正定値な $\Sigma^{-1}$ に対して任意の非零 $v$ は

$$
v^{\mathsf T}A^{\mathsf T}\Sigma^{-1}Av=(Av)^{\mathsf T}\Sigma^{-1}(Av)>0
$$

を満たし、正規行列は可逆です。実際、

$$
A^{\mathsf T}\Sigma^{-1}A
=\begin{pmatrix}3125&0\\0&5000\end{pmatrix},\quad
A^{\mathsf T}\Sigma^{-1}y
=\begin{pmatrix}31337.5\\100000\end{pmatrix}.
$$

それぞれを割ると $(10.028,20)^{\mathsf T}$ を得ます。$K=(A^{\mathsf T}\Sigma^{-1}A)^{-1}A^{\mathsf T}\Sigma^{-1}$ と置けば $\hat u-u=K\varepsilon$、$KA=I_2$ で不偏です。さらに

$$
\begin{aligned}
K\Sigma K^{\mathsf T}
&=(A^{\mathsf T}\Sigma^{-1}A)^{-1}
A^{\mathsf T}\Sigma^{-1}\Sigma\Sigma^{-1}A
(A^{\mathsf T}\Sigma^{-1}A)^{-1}\\
&=(A^{\mathsf T}\Sigma^{-1}A)^{-1}
\end{aligned}
$$

です。これは数値例の $C_u$ と一致します。Oが未知の場合は並進の自由度が残り、同じ列フルランクの議論をそのまま使えません。[GEOD8のdatum欠損](../GEOD8/index.md#def-geod8-datum-deficiency)が境界条件になります。
<!-- proof-end -->

---

## 2. 平差した位置を楕円体へ結び付ける

### 2.1 小変位の緯度経度

[GEOD4の計量](../GEOD4/index.md#thm-geod4-ellipsoid-metric)と[GEOD5の局所Jacobian](../GEOD5/index.md#prop-geod5-local-jacobian)を、Oの緯度 $\phi_0$ に適用します。$M_0=M(\phi_0)$ は子午線曲率半径、$N_0=N(\phi_0)$ は卯酉線曲率半径です。GRS80の $a=6378137$ m、$1/f=298.257222101$ から

$$
e^2=f(2-f),\quad
M_0=\frac{a(1-e^2)}{(1-e^2\sin^2\phi_0)^{3/2}}\simeq6357482.44\ {\rm m},
\quad N_0=\frac{a}{\sqrt{1-e^2\sin^2\phi_0}}\simeq6385525.66\ {\rm m}.
$$

接平面の一次関係は $dn=M_0\,d\phi,\ de=N_0\cos\phi_0\,d\lambda$ なので

$$
\Delta\phi\simeq\frac{20}{6357482.44}
=0.648888'' ,\qquad
\Delta\lambda\simeq\frac{10.028}{6385525.66\cos36^\circ}
=0.400392''.
$$

角度を秒へ換算するときの係数は $180\cdot3600/\pi$ です。よって

$$
\boxed{\phi_P\simeq36.000180247^\circ,\quad
\lambda_P\simeq139.833444553^\circ}
$$

となります。**これは局所一次近似であって、厳密な測地座標の逆変換ではありません。** 高精度が必要なら観測点の3次元位置を[GEOD5のENU回転](../GEOD5/index.md#thm-geod5-enu-rotation)で地心系へ移し、[測地座標の逆解](../GEOD5/index.md#thm-geod5-exterior-inverse)で楕円体高を含め反復します。地球曲率、OとPの高さ、観測値の定義を揃えないままこの数値をmm精度と称してはいけません。

### 2.2 楕円体高、ジオイド高、標高

例として測点の楕円体高が $h_P=120.0$ m、同じ位置で同一鉛直基準に整合したジオイド高が $N_g=30.5$ mと別途与えられたとします。[GEOD10の高さ関係](../GEOD10/index.md#prop-geod10-gnss-height)を所定の近似条件で用いると

$$
H_P\simeq h_P-N_g=89.5\ {\rm m}.
$$

この89.5 mをECEFへの変換式の $h$ に代入するのは誤りです。[GEOD5の測地→地心変換](../GEOD5/index.md#thm-geod5-forward)へ入るのは楕円体高120.0 mで、

$$
\boxed{
\begin{aligned}
X_c&=(N(\phi_P)+h_P)\cos\phi_P\cos\lambda_P,\\
Y_c&=(N(\phi_P)+h_P)\cos\phi_P\sin\lambda_P,\\
Z_c&=(N(\phi_P)(1-e^2)+h_P)\sin\phi_P
\end{aligned}}
$$

が地心直交座標です。東北方向の $e,n$ と日本式の $X,Y$ を、地心座標の添字 $X_c,Y_c,Z_c$ と混同しないよう分けました。高さの30.5 mの差を水平方向の観測標準偏差2 cmと比較して「測位誤差が30.5 m」とするのも、物理的に異なる量を混ぜる誤りです。

---

## 3. 地域図へ：第IX系と投影共分散

### 3.1 正規化された順逆変換

第IX系は $\phi_0=36^\circ,\lambda_0=139^\circ50'$、中央縮尺 $k_0=0.9999$、日本式の **X北、Y東** です。[GEOD21の中央子午線原点](../GEOD21/index.md#thm-geod21-central-origin)は

$$
E(\phi_0,\lambda_0)=N_p(\phi_0,\lambda_0)=0,\qquad
N_p(\phi,\lambda_0)=k_0[s(\phi)-s(\phi_0)]
$$

と指定します。ここで $s(\phi)$ は[楕円体の子午線弧長](../GEOD11/index.md#def-geod11-meridian-arc)です。経度差 $\lambda-\lambda_0$ と第三扁平率 $n=f/(2-f)$ を使い、[GEOD17のKrüger順級数](../GEOD17/index.md#def-geod17-kruger-series)を計算し、原点の投影北距を差し引きます。逆方向は[GEOD18の逆級数](../GEOD18/index.md#def-geod18-inverse-map)で同じ楕円体・中央子午線・$k_0$・原点北距を使います。逆写像側だけ偽北距や緯度原点を変更してはいけません。

小変位の一次近似では、原点で楕円体東北長が $e,n$ なら投影東北成分は $(E,N_p)\simeq k_0(e,n)$ です。従ってこの例の日本式の近似値は

$$
\boxed{X\simeq0.9999(20)=19.998000\ {\rm m},\qquad
Y\simeq0.9999(10.028)=10.0269972\ {\rm m}.}
$$

これは正確なKrüger投影値ではなく、上で求めた一次近似の経緯度を、さらに原点で線形化した値です。厳密な投影座標を要する場合、既習の順変換の全必要項を計算し、[点縮尺と子午線収差](../GEOD18/index.md#thm-geod18-convergence-scale)の $k,\gamma$ も同じ位置で求めます。中心線では $k=k_0,\gamma=0$ ですが、Pは中心線から約10 m東にあるため、**Pで厳密に $\gamma=0$ と主張しません**。

### 3.2 不確かさをどの順で変換するか

観測で推定した $(e,n)$ は確率変動する量です。滑らかな写像 $F$ で平面座標に移すとき、微小誤差の一次近似は $\delta F\simeq J_F\,\delta u$ です。この $J_F$ は、入力をどの座標と順序で置いたかにより変わります。

<a id="thm-geod22-covariance"></a>
<!-- formal-statement-start -->
> **命題（固定したdatumにおける局所共分散の伝播）**  
> 楕円体の中央子午線上で、緯度経度が局所座標となる点を考える。その測地緯度と正の中央縮尺は
>
> $$
> |\phi_0|<\pi/2,\qquad k_0>0
> $$
>
> を満たすとする。東北方向の微小変位を $u=(e,n)^{\mathsf T}$、その共分散を $C_u$ とする。
> この点で正則な等角横メルカトルの東北投影座標を $v=(E,N_p)^{\mathsf T}$、日本式座標を $w=(X,Y)^{\mathsf T}$ とする。
> それぞれの一次共分散は
>
> $$
> C_v\simeq k_0^2 C_u,\qquad C_w\simeq PC_vP^{\mathsf T},\qquad
> P=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
> $$
>
> この式は既知かつ固定のdatum上での **局所一次の観測共分散** の伝播であり、打切り・丸め・datumの系統差を含まない。
<!-- formal-statement-end -->

**証明の見取り図。** 地表の物理的な東北単位基底から、中央子午線の局所等角写像へのJacobianは $k_0I_2$ です。その後の日本式への操作は[GEOD21の軸交換](../GEOD21/index.md#thm-geod21-axis-permutation)だけです。

<!-- proof-start -->
### 証明

[GEOD4の第一基本形式](../GEOD4/index.md#thm-geod4-ellipsoid-metric)から

$$
\begin{pmatrix}de\\dn\end{pmatrix}
=\begin{pmatrix}0&N_0\cos\phi_0\\M_0&0\end{pmatrix}
\begin{pmatrix}d\phi\\d\lambda\end{pmatrix}.
$$

中央子午線での等角写像は東・北の正規直交方向を保存し、[中央縮尺](../GEOD16/index.md#thm-geod16-metric-scale)で両方向を $k_0$ 倍するため

$$
\begin{pmatrix}dE\\dN_p\end{pmatrix}
=k_0\begin{pmatrix}de\\dn\end{pmatrix}.
$$

写像の線形近似で $\delta v=k_0\delta u$ とすると、共分散の定義から

$$
\operatorname{Cov}(v)
=E[(k_0\delta u)(k_0\delta u)^{\mathsf T}]
=k_0^2 C_u.
$$

さらに $w=Pv$ なので

$$
C_w=E[(P\delta v)(P\delta v)^{\mathsf T}]
=PC_vP^{\mathsf T}
$$

です。経度差がある点や有限変位では、実際のJacobian $J_F(\hat u)$ を評価し $J_F C_uJ_F^{\mathsf T}$ を使う必要があります。高次項が無視できない場合の共分散を等式で保証するものではありません。
<!-- proof-end -->

数値例では

$$
C_{(E,N_p)}\simeq(0.9999)^2
\begin{pmatrix}0.00032&0\\0&0.00020\end{pmatrix},
\qquad
C_{(X,Y)}\simeq(0.9999)^2
\begin{pmatrix}0.00020&0\\0&0.00032\end{pmatrix}{\rm m}^2.
$$

標準偏差は日本式Xが約0.01414 m、日本式Yが約0.01789 mです。軸交換で物理精度が向上したわけではなく、成分名に対応した行列行・列が入れ替わっただけです。

---

## 4. 世界図へ：Equal Earthと何を保存するか

### 4.1 同じ緯度でも、同じ式に代入しない

地域図の $\phi_P,\lambda_P$ をそのままEqual Earthの球面緯度へ代入すると、楕円体で等積になりません。まず[GEOD19の正積緯度](../GEOD19/index.md#def-geod19-authalic)で

$$
\begin{aligned}
q(\phi)&=(1-e^2)\left[
\frac{\sin\phi}{1-e^2\sin^2\phi}
-\frac{1}{2e}\log\frac{1-e\sin\phi}{1+e\sin\phi}
\right],\\
q_p&=q(\pi/2),\qquad R_q=a\sqrt{q_p/2},
\qquad\beta=\arcsin\frac{q(\phi_P)}{q_p}
\end{aligned}
$$

とします（楕円体の $0<e<1$ の場合。球面極限は連続極限で定義）。GRS80では $R_q\simeq6371007.18$ m、上の局所一次の $\phi_P$ を入れると $\beta\simeq35.878234^\circ$ です。

[GEOD20の多項式](../GEOD20/index.md#def-geod20-intermediate)を $P(t)$、その導関数を $D(t)=P'(t)$ とし、

$$
\theta=\arcsin\left(\frac{\sqrt3}{2}\sin\beta\right),\qquad
\ell=\operatorname{wrap}_{[-\pi,\pi)}(\lambda_P-\lambda_c)
$$

と置きます。ここで世界図の中央子午線を例として $\lambda_c=0^\circ$、偽東・北距を0とします。[Equal Earth順変換](../GEOD20/index.md#def-geod20-forward)は

$$
E_{\rm world}=\frac{2R_q\ell\cos\theta}{\sqrt3D(\theta)},
\qquad N_{\rm world}=R_qP(\theta).
$$

上の一次の位置を使うと $\theta\simeq0.53233524$ radで、$(E_{\rm world},N_{\rm world})\simeq(12164875.19,4467722.77)$ mです。**入力位置が近似なので、この表示桁は計算の追跡用であって観測から保証された精度ではありません。** 同じ一地点に日本式の $(X,Y)$ と世界図の $(E_{\rm world},N_{\rm world})$ を併記するとき、異なる原点・縮尺・保存量を持つ数値を直接差し引いてはいけません。

### 4.2 面積はどう変わるか

<a id="prop-geod22-area-comparison"></a>
<!-- formal-statement-start -->
> **命題（同じ楕円体上の微小領域の地域図・世界図比較）**  
> 楕円体上の極以外の正則な点で、局所的に正則な楕円体横メルカトルの点縮尺を $k>0$ とする。同じ点を正積緯度を経由して、経度の切れ目から離れたEqual Earth図法に写す。楕円体面積要素 $dA$ に対し、地域図の平面面積は $k^2dA$、世界図の平面面積は $dA$ である。日本式のX,Yへの軸交換は、面積の絶対値を変えない。
<!-- formal-statement-end -->

**証明の見取り図。** 地域図の等角条件から面積縮尺は $k^2$、世界図は楕円体から正積球への変換とEqual EarthのJacobianを連結します。軸交換の行列式は $-1$ です。

<!-- proof-start -->
### 証明

楕円体の緯度経度に関する第一基本形式の行列を $g$、地域図のJacobianを $J_r$ とします。[GEOD13の等角条件](../GEOD13/index.md#thm-geod13-metric-comparison)は $J_r^{\mathsf T}J_r=k^2g$ です。両辺の行列式を取り、$k>0,\det g>0$ を使うと

$$
\frac{|\det J_r|}{\sqrt{\det g}}=k^2.
$$

一方、[正積緯度の面積保存](../GEOD19/index.md#thm-geod19-authalic-area)は $\sqrt{\det g}\,d\phi\,d\lambda=R_q^2\cos\beta\,d\beta\,d\lambda$ です。[Equal EarthのJacobian](../GEOD20/index.md#thm-geod20-area)は $R_q^2\cos\beta$ なので、合成した図で $dA$ と平面面積が等しくなります。最後に日本式への交換行列 $P$ は $|\det P|=1$ なので、面積の絶対値を変えません。
<!-- proof-end -->

例えば第IX系の**中央子午線上**だけを比較すれば、局所面積 $10000$ m²は日本の地域図で $10000(0.9999)^2=9998.0001$ m²、Equal Earthでは10000 m²です。Pのように中心線から離れた点では $k(\phi_P,\lambda_P)$ を再計算します。この比較はEqual Earthが**長さや角度も保存する**という意味ではありません。[GEOD20のTissot指示楕円](../GEOD20/index.md#thm-geod20-distortion)では主縮尺の積は1でも個々の主縮尺は一般に1でありません。

---

## 5. 正しさを一種類のテストへ丸投げしない

### 5.1 計算モデルごとの検証

| 対象と試験点 | 数学から決まる検査値・条件 | 検出する不具合 |
| --- | --- | --- |
| 第IX系の原点 $(36^\circ,139^\circ50')$ | 日本式 $X=Y=0$、中心 $k=k_0$、$\gamma=0$ | 緯度原点、偽座標、順序 |
| 原点から経度差 $\pm t$（十分小） | $X(+t)=X(-t)$、$Y(+t)=-Y(-t)$ | 東西符号、軸交換 |
| 原点から緯度差 $t$、経度差0 | $X=k_0[s(\phi_0+t)-s(\phi_0)],Y=0$ | 子午線弧長と縮尺 |
| UTM第54帯の赤道・中央経度141° | 北半球では $(E,N_p)=(500000,0)$ m | UTM偽東距、帯番号 |
| Equal Earthの赤道・中央経度 | $N_{\rm world}=0$、$(E_{\rm world})_\ell=2R_q/(\sqrt3 A_1)$ | 分母の $D$、単位 |
| 正積球の緯度帯 | 面積 $2R_q^2\Delta\sin\beta_0$ を図形積分で再現 | 等積性、緯度混同 |
| 経度帯の端・両極 | 切れ目と座標の退化を明示し、正則逆写像を要求しない | 誤った大域単射の仮定 |
| 楕円体を球面へ近づける | $e\to0,\ \beta\to\phi,\ R_q\to a$ | 球面極限、係数 |

この表は数学的な構造検査です。さらに[国土地理院の平面直角座標計算式](https://vldb.gsi.go.jp/sokuchi/surveycalc/surveycalc/algorithm/bl2xy/bl2xy.htm)と[原点・適用区域の規定](https://www.gsi.go.jp/LAW/heimencho.html)、[PROJの横メルカトル](https://proj.org/en/stable/operations/projections/tmerc.html)、[Equal Earth](https://proj.org/en/stable/operations/projections/eqearth.html)を参照して **別実装・公的定義との比較** を行います。同じプログラムを逆方向に回して戻るだけでは、中央子午線やdatumを間違えていても通過し得ます。

数値実装では事前に、例えば「十分中央子午線に近い試験点は独立実装と投影座標差1 mm以内、同じ設定での順逆往復の角度残差 $10^{-10}$ rad以内」という目標を置き、採用した級数次数・浮動小数点精度・適用域を一緒に記録します。これらは**教材上のテスト設計例**であり、ここであらゆる点・すべての実装の合格を実測したという主張ではありません。極、分岐点、遠い経度差は別の手法・基準を要します。

### 5.2 誤差予算は足し算の仕方も分ける

| 項目 | この例で分かること | 取り扱い |
| --- | --- | --- |
| 観測のランダム誤差 | $\sigma_e\simeq1.79$ cm、$\sigma_n\simeq1.41$ cm（O固定） | Jacobianで共分散伝播 |
| 基準点Oの不確かさ | 本演習では条件として0扱い | 実務では別途共分散・相関を確認 |
| 楕円体への距離還元 | 補正済みという入力条件 | 未補正なら地形・高さ・機器・大気等の誤差を別に評価 |
| Krügerの級数打切り | 次数・点・収束域で変化 | 高次数・独立実装との差を検証 |
| 浮動小数点丸め | 演算の桁・実装に依存 | 精度実験・条件数・数値安定性 |
| datum、実現系、epoch | ここでは条件としてJGD2024と明記 | 別時点・別datumなら必要な変換モデルを指定 |
| 鉛直基準とジオイド高 | $h=120.0$ m、$N_g=30.5$ mは仮定値 | 水平共分散と混ぜず、高さの共分散を別管理 |

独立な平均0の誤差なら分散を加えられますが、**不明な系統差を観測標準偏差の二乗へ機械的に足さない**ことが重要です。例えばdatum不一致による一定の座標差 $b$ があると、推定値の誤差の平均は $b$ となり、中心を移動した分布になります。ランダム共分散が小さくても、真値からの誤差が小さいとは限りません。

---

## 6. 演習と詳細解答

### Level A：各工程を自分の手で再現する

<a id="ex-geod22-a01"></a>
#### A1. 重みを間違えない

真の東距 $e$ の独立観測を $y_1=10.04$ m、$y_2=9.98$ m、標準偏差をそれぞれ0.02 m、0.04 mとする。重み付き最小二乗推定値、残差、推定標準偏差を求めよ。

- Level: A
- ID: GEOD22-A1

<!-- solution-start -->
**詳細解答。** 分散逆数の重みは $w_1=2500,w_2=625$ です。[平差公式](#thm-geod22-adjustment)の1変数版を使うと、

$$
\hat e=\frac{w_1y_1+w_2y_2}{w_1+w_2}
=\frac{25100+6237.5}{3125}=10.028\ {\rm m}.
$$

残差 $y_i-\hat e$ は $(0.012,-0.048)$ m、分散は $1/(w_1+w_2)=0.00032$ m²、標準偏差は $\sqrt{0.00032}\simeq0.017889$ mです。標準偏差が小さい第1観測の重みが4倍であることも確認できます。
<!-- solution-end -->

<a id="ex-geod22-a02"></a>
#### A2. 微小な東北変位を角度へ変える

GRS80の $\phi_0=36^\circ$ で $M_0=6357482.44$ m、$N_0=6385525.66$ mとする。東10.028 m、北20 mの楕円体接平面変位を、測地緯度・経度の一次変化（角秒）で表せ。

- Level: A
- ID: GEOD22-A2

<!-- solution-start -->
**詳細解答。** [局所Jacobian](../GEOD5/index.md#prop-geod5-local-jacobian)の適用対象はOにおける楕円体の東北接基底です。

$$
\Delta\phi\simeq\frac{20}{6357482.44}\frac{648000}{\pi}
=0.648888'',\quad
\Delta\lambda\simeq\frac{10.028}{6385525.66\cos36^\circ}\frac{648000}{\pi}
=0.400392''.
$$

東へ進むと経度、北へ進むと緯度が増えます。有限変位の厳密値ではないこと、$\cos\phi_0=0$ の極でこの式が使えないことも結論の一部です。
<!-- solution-end -->

<a id="ex-geod22-a03"></a>
#### A3. 三種類の「Y」と高さを区別する

日本第IX系原点近傍で投影東北成分が $(E,N_p)=(10.027,19.998)$ mであるとする。日本式 $(X,Y)$ とECEFの $Y_c$ は同じ量か。また楕円体高120.0 m、ジオイド高30.5 mを与え、近似標高を求めよ。

- Level: A
- ID: GEOD22-A3

<!-- solution-start -->
**詳細解答。** [GEOD21の軸交換](../GEOD21/index.md#thm-geod21-axis-permutation)により日本式は $(X,Y)=(19.998,10.027)$ mです。地心座標の $Y_c$ は地球の中心を原点とする直交座標の第2成分なので同じYという記号でも別物です。[高さ関係](../GEOD10/index.md#prop-geod10-gnss-height)により標高は $H\simeq120.0-30.5=89.5$ m。ECEFの式へは $H$ ではなく楕円体高 $h=120.0$ mを使います。
<!-- solution-end -->

<a id="ex-geod22-a04"></a>
#### A4. 中央縮尺を距離と面積へ適用する

日本第IX系中央子午線上の楕円体弧長2000 mと、面積5000 m²の無限小領域について、縮尺 $k_0=0.9999$ による平面値を求めよ。中心線から離れた場所でも同じ数値を厳密値としてよいか。

- Level: A
- ID: GEOD22-A4

<!-- solution-start -->
**詳細解答。** [GEOD21の中央子午線距離](../GEOD21/index.md#thm-geod21-central-origin)により平面距離は $2000(0.9999)=1999.8$ mです。[面積比較命題](#prop-geod22-area-comparison)により局所面積は $5000(0.9999)^2=4999.00005$ m²。中心線外では点縮尺 $k$ は一般に $k_0$ と異なり、有限面積では $k^2$ を面上で積分する必要があります。
<!-- solution-end -->

<a id="ex-geod22-a05"></a>
#### A5. 正積緯度とEqual Earthの赤道

正積球半径 $R_q=6371007.18$ m、Equal Earth多項式の一次係数 $A_1=1.340264$ とする。赤道で中央子午線から経度差30°の点を投影せよ。楕円体の一般緯度でも $\beta=\phi$ としてよいか。

- Level: A
- ID: GEOD22-A5

<!-- solution-start -->
**詳細解答。** 赤道では $\beta=\theta=0$、$D(0)=A_1$ であり、経度差は $\ell=\pi/6$ rad。[Equal Earth順変換](../GEOD20/index.md#def-geod20-forward)より

$$
E=\frac{2R_q(\pi/6)}{\sqrt3 A_1}
\simeq R_q(0.451105),\qquad N_p=R_qP(0)=0.
$$

一般緯度では[正積緯度の定義](../GEOD19/index.md#def-geod19-authalic)で $q(\phi)/q_p$ から $\beta$ を求める必要があります。$\beta=\phi$ としてよいのは球面極限または赤道などの特殊な点です。
<!-- solution-end -->

### Level B：連結式と失敗機構を説明する

<a id="ex-geod22-b01"></a>
#### B1. 日本式の共分散を導く

東北成分の共分散を $\operatorname{diag}(0.00032,0.00020)$ m²とし、第IX系の原点で $k_0=0.9999$ とする。日本式の共分散を行列計算から求め、標準偏差を答えよ。独立でない東北成分の場合には何が変わるか。

- Level: B
- ID: GEOD22-B1

<!-- solution-start -->
**詳細解答。** [局所伝播命題](#thm-geod22-covariance)の $P$ を明示して

$$
\begin{aligned}
C_{XY}&=P(k_0^2C_u)P^{\mathsf T}\\
&=(0.9999)^2
\begin{pmatrix}0&1\\1&0\end{pmatrix}
\begin{pmatrix}0.00032&0\\0&0.00020\end{pmatrix}
\begin{pmatrix}0&1\\1&0\end{pmatrix}\\
&=(0.9999)^2
\begin{pmatrix}0.00020&0\\0&0.00032\end{pmatrix}{\rm m}^2.
\end{aligned}
$$

従って $\sigma_X=0.9999\sqrt{0.00020}\simeq0.014141$ m、$\sigma_Y=0.9999\sqrt{0.00032}\simeq0.017887$ mです。非零の共分散 $\operatorname{Cov}(e,n)=c$ があると、元の行列に非対角成分 $c$ を入れる必要があります。独立と仮定して0に潰してはならず、軸交換の後も非対角成分 $k_0^2c$ が残ります。
<!-- solution-end -->

<a id="ex-geod22-b02"></a>
#### B2. 等角・等積をJacobianで比較する

楕円体の局所計量を $g$、横メルカトルのJacobianを $J_r$ として $J_r^{\mathsf T}J_r=k^2g$ が成立するとする。地域図の面積比を導き、Equal Earthとの違いを示せ。日本式への軸交換が面積符号と絶対値に与える影響も答えよ。

- Level: B
- ID: GEOD22-B2

<!-- solution-start -->
**詳細解答。** 仮定の楕円体計量は正定値なので $\det g>0$、縮尺は $k>0$ です。行列式を取り

$$
(\det J_r)^2=k^4\det g,\qquad
\frac{|\det J_r|}{\sqrt{\det g}}=k^2.
$$

[正積緯度の面積保存](../GEOD19/index.md#thm-geod19-authalic-area)と[Equal EarthのJacobian](../GEOD20/index.md#thm-geod20-area)を合成すれば世界図は面積比1です。交換行列は行列式 $-1$ のため符号付き面積の向きは反転しますが、絶対面積は維持されます。Equal Earthの長さ・角度まで保存する結論は出ません。
<!-- solution-end -->

<a id="ex-geod22-b03"></a>
#### B3. 見かけ上成功する間違ったプログラム

第IX系の順投影と逆投影の両方で中央子午線 $\lambda_0$ を誤って141°と設定したところ、10万点で往復残差が機械精度になった。これで実装が正しいといえるか。独立な試験を3つ設計し、失敗の機構を述べよ。

- Level: B
- ID: GEOD22-B3

<!-- solution-start -->
**詳細解答。** 誤った投影を $F_{141}$ とすれば $F_{141}^{-1}(F_{141}(p))=p$ なので、往復試験だけでは第IX系の正しい $F_{139^\circ50'}$ を実装した証拠になりません。

1. 第IX系の法定原点 $(36^\circ,139^\circ50')$ を入れて $(X,Y)=(0,0)$ を検査します。中央子午線を141°と誤ればこの原点は中心から外れ、一般にYが0になりません。
2. 公的な[第IX系の定義](https://www.gsi.go.jp/LAW/heimencho.html)を読み、CRSの中央経度・原点緯度・縮尺・日本式軸をプログラム設定と比較します。共通実装の別関数を呼ぶだけでは独立検査になりません。
3. 同じ正式パラメータを入れたPROJ/GeographicLibの別実装の順投影と比較します。楕円体・datum・座標時点・軸を揃え、単なる数字二つの一致としません。

「datumが違っていた」場合も両方向で同じ誤設定が相殺され得るため、入力のCRS情報自体を確認する必要があります。
<!-- solution-end -->

<a id="ex-geod22-b04"></a>
#### B4. 観測誤差と系統差を分離する

東北成分の推定誤差が平均0、共分散 $C_u$ である。そこへ未知の固定バイアス $b=(0.30,-0.20)^{\mathsf T}$ mが加わった推定座標を真値の代わりに使ったとする。二乗誤差 $E[\|\hat u+b-u\|^2]$ を導け。共分散だけを見ると何を見落とすか。

- Level: B
- ID: GEOD22-B4

<!-- solution-start -->
**詳細解答。** $\delta=\hat u-u$ と置けば $E[\delta]=0,\ E[\delta^{\mathsf T}\delta]=\operatorname{tr}(C_u)$ です。

$$
\begin{aligned}
E[\|\delta+b\|^2]
&=E[\delta^{\mathsf T}\delta]+2b^{\mathsf T}E[\delta]+b^{\mathsf T}b\\
&=\operatorname{tr}(C_u)+\|b\|^2\\
&=0.00052+0.30^2+(-0.20)^2=0.13052\ {\rm m}^2.
\end{aligned}
$$

$b$ は固定なので $\operatorname{Cov}(\hat u+b)=C_u$ のままです。精密な平差の小さな共分散だけを表示しても、測地datumや補正の系統差による真位置からのずれを捕捉できません。
<!-- solution-end -->

### Level C：観測から2種類の地図までの検証を設計する

<a id="ex-geod22-c01"></a>
#### C1. JGD2024の模擬測点Pを地域図と世界図へ

第1節の全観測とGRS80、第IX系のOの経緯度、さらに測点の楕円体高120.0 m、同一鉛直基準に対応するジオイド高30.5 mを使用する。次を実施せよ。

1. $\hat e,\hat n,C_u$ と高さの近似値を求める。
2. $M_0,N_0$ を使ってPの一次の測地緯度経度を出す。ECEF座標の式で高さが入る位置を示す。
3. 第IX系の日本式X,Yの一次値と共分散を求め、厳密値を出すためのKrüger計算条件、点縮尺と子午線収差の確認方法を示す。
4. 世界図を中央経度0°のEqual Earthとし、正積緯度→中間角→多項式の順に投影式を立て、局所面積保存を検証する。
5. 両投影のパラメータ、軸、単位、datum・epochと、誤差予算、独立試験3件以上を記録する。なぜ往復のみで合格にできないか述べる。

- Level: C
- ID: GEOD22-C1

<!-- solution-start -->
**詳細解答。**

**1. 平差と高さ。** 分散逆数の重みで[平差公式](#thm-geod22-adjustment)を適用し

$$
\hat u=(10.028,20.000)^{\mathsf T}\ {\rm m},\qquad
C_u=\operatorname{diag}(0.00032,0.00020)\ {\rm m}^2.
$$

高さは $H\simeq120.0-30.5=89.5$ mで、楕円体高とは分けます。

**2. 楕円体へ。** $e^2=f(2-f),\ f=1/298.257222101$ から $M_0\simeq6357482.44$ m、$N_0\simeq6385525.66$ mを得ます。[局所Jacobian](../GEOD5/index.md#prop-geod5-local-jacobian)の逆関係を用いて

$$
\begin{aligned}
\phi_P&\simeq36^\circ+\frac{20}{M_0}\frac{180^\circ}{\pi}
\simeq36.000180247^\circ,\\
\lambda_P&\simeq139^\circ50'+\frac{10.028}{N_0\cos36^\circ}\frac{180^\circ}{\pi}
\simeq139.833444553^\circ.
\end{aligned}
$$

[地心変換](../GEOD5/index.md#thm-geod5-forward)には、$N(\phi_P)+120.0$ と $N(\phi_P)(1-e^2)+120.0$ の形で**楕円体高**を代入します。近似緯度経度と仮定の高さを用いた値なので、実成果のcm精度を保証しません。

**3. 第IX系。** $\phi_0=36^\circ,\lambda_0=139^\circ50',k_0=0.9999$、偽座標は0、X北・Y東です。中央近傍の局所一次値は

$$
(X,Y)\simeq(0.9999\hat n,0.9999\hat e)
=(19.998000,10.0269972)\ {\rm m}.
$$

[共分散命題](#thm-geod22-covariance)で $C_{XY}\simeq0.9999^2\operatorname{diag}(0.00020,0.00032)$ m²。厳密な座標では[Krüger順変換](../GEOD17/index.md#def-geod17-forward-map)にGRS80の $n$、原点補正、中央縮尺、経度差を代入し、[逆級数](../GEOD18/index.md#def-geod18-inverse-map)を同条件で検証します。点縮尺と収差は[GEOD18の微分公式](../GEOD18/index.md#thm-geod18-convergence-scale)でその点ごとに評価し、中心線の値をPの厳密値と取り違えません。

**4. Equal Earth。** [正積緯度](../GEOD19/index.md#def-geod19-authalic)から $R_q\simeq6371007.18$ m、$\beta\simeq35.878234^\circ$、$\theta\simeq0.53233524$ radです。世界中央子午線0°に対し $\ell=\lambda_P$（ラジアン）なので

$$
\begin{aligned}
E_{\rm world}&=\frac{2R_q\lambda_P\cos\theta}{\sqrt3D(\theta)}
\simeq12164875.19\ {\rm m},\\
N_{\rm world}&=R_qP(\theta)\simeq4467722.77\ {\rm m}.
\end{aligned}
$$

緯度が一次近似値なので出力の末尾桁は精度の主張ではありません。[正積緯度の面積微分式](../GEOD19/index.md#thm-geod19-authalic-area)と[Equal EarthのJacobian](../GEOD20/index.md#thm-geod20-area)をつなげば $dE_{\rm world}dN_{\rm world}=MN\cos\phi\,d\phi d\lambda$ です。他方、第IX系の局所面積比は $k^2$ なので、地域図は一般に等積でありません。

**5. 台帳と独立検査。** 入力は「JGD2024、GRS80、時点はこの合成問題の固定値、接平面ENUのe,n、m、O固定」。第IX系出力は「同datum、第IX系、X北・Y東、m、$k_0=0.9999$」。世界図出力は「同楕円体から正積球、Equal Earth、中央経度0°、E東・N北、m」です。実務データでepochが未指定ならその時点で確認が必要です。観測分散 $C_u$、原点の未知の不確かさ、距離還元の補正、級数打切り、浮動小数点誤差、datum差、高さ系を別欄に記録します。

独立な検査として (i)第IX系原点の $(0,0)$、(ii)経度差の東西反転でX偶・Y奇、(iii)中央子午線の距離と局所面積比、(iv)正積球上の緯度帯の面積積分、(v)法定パラメータと独立投影エンジンの計算値、を選べます。順逆が同じ誤った中央子午線を使えば往復は一致するため、**往復誤差だけでは独立な検算になりません**。
<!-- solution-end -->

---

## 7. この章の要点

- 最小二乗の共分散が表すのは、宣言した観測モデル・datum拘束のもとでのランダム誤差であり、測地基準系の誤設定や高さ系の差ではありません。
- 地表の観測量は楕円体へ適切に還元し、ENU、測地緯度経度、ECEF、日本式X,Y、世界図E,Nを各段階で区別します。
- 地域の横メルカトルは局所等角で面積比 $k^2$、Equal Earthは正積緯度を経由して面積比1です。保存するものが異なるため用途も異なります。
- 実用精度を主張する前に、級数次数・数値許容・適用域・CRSの版・epochを確定し、独立した正しい値と比較します。
- 最後に問うべきなのは「数字が戻ったか」だけでなく、**どの観測から、どの基準・時点で、何を保存する地図へ写したか**です。
