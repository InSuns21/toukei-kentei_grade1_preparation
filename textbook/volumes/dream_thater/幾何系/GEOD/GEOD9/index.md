# GEOD9 GNSS・衛星測地学の基礎

[GEOD8の測量網の平差](../GEOD8/index.md#thm-geod8-weighted-normal)では、観測値と未知座標を結ぶ式から設計行列を作り、残差と不確かさを求めました。しかし衛星から届く信号には、測量器から点までの距離に加えて、**衛星と受信機の時計のずれ**が入ります。時計が $1\ \mu\mathrm s$ ずれると、光速を $c=299792458\ \mathrm{m/s}$ として距離換算で約 $300$ mも変わります。

そこで、衛星の位置が既知でも、受信機の三次元位置だけでなく時計差を同時に未知量にします。本章では次を自分で導けるようにします。

1. 信号の送受信時刻から擬似距離を組み立て、時計差・大気遅延・軌道誤差を分ける。
2. 距離の微分から測位の Jacobian を作り、4機以上でも配置によって解けない場合を見抜く。
3. 位置・時計の共分散と衛星配置による DOP（精度低下率）を検算する。
4. 搬送波位相と整数アンビギュイティ、二重差による時計項の相殺を計算する。
5. 単独測位と相対測位、測地基準系の実現・座標時点・地殻変動を区別する。

幾何を明確にするため、計算例の衛星配置・観測値は**架空の模型**です。実際のGNSS処理では衛星の送信時刻の軌道位置、地球自転、相対論的補正、アンテナ位相中心、信号ごとのハードウェア遅延等も処理します。これらを無視した架空の数値から実用精度を宣言することはしません。

[測地学ラボC（GNSS・DOP）](https://insuns21.github.io/toukei-kentei_grade1_preparation/simulation/geod.html#lab-C)の「GNSS：衛星配置・時計差・DOP」では、衛星方向や受信機時計差を動かし、数値表のDOPと推定位置を比較できます。3Dの衛星は等距離の視線模式図で、実衛星の軌道や実測精度ではありません。

<!-- definition-example-audit: strict -->

---

## 1. 電波の伝播時間はなぜ「距離そのもの」ではないか

衛星 $s$ の送信事象の真の座標時を $t_s$、受信機 $r$ の受信事象の座標時を $t_r$ とします。真空中を速度 $c$ で進み、補正済みの送受信位置から見た直線距離が $\rho_r^s$ なら、理想化した飛行時間は $t_r-t_s=\rho_r^s/c$ です。

しかし受信機の時計の読みは $t_r+\delta t_r$、衛星の時計の読みは $t_s+\delta t^s$ です。時計差をいずれも「その時計の表示時刻 − 採用した座標時」と定めると、その差を $c$ 倍した観測量は

$$
c\{(t_r+\delta t_r)-(t_s+\delta t^s)\}
=\rho_r^s+c(\delta t_r-\delta t^s).
$$

信号符号（コード）の相関による伝播時間測定には電離圏・対流圏遅延なども重なります。衛星位置 $\boldsymbol s^s$ は**送信時刻**の軌道から決め、地球固定座標を使うなら受信時刻と共通の軸へ地球自転を考慮してそろえたものとします。受信機位置を $\boldsymbol r\in\mathbb R^3$ と置き、両者が同一の基準枠・単位 mで表されることを要求します。

<a id="def-geod9-pseudorange"></a>
<!-- formal-statement-start -->
> **定義（GNSS の擬似距離観測式）**  
> 同一基準枠にそろえた受信機位置 $\boldsymbol r$ と衛星送信位置 $\boldsymbol s^s$ に対して $\rho_r^s=\|\boldsymbol s^s-\boldsymbol r\|$ とする。衛星・受信機時計の差を $\delta t^s,\delta t_r$（秒）、電離圏・対流圏のコード遅延を $I_r^s,T_r^s$（m）、その他の模型化された補正を $d_r^s$（m）、偶然誤差を $\varepsilon_{P,r}^s$（m）としたとき、コードによる**擬似距離** $P_r^s$ の基本模型は

$$
P_r^s=\rho_r^s+c(\delta t_r-\delta t^s)
+I_r^s+T_r^s+d_r^s+\varepsilon_{P,r}^s.
$$

> 擬似距離はこれらを含む観測量であり、幾何学的な真の距離 $\rho_r^s$ と同一ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod9-pseudorange -->
**定義の確認**。ある衛星の幾何距離を $20000000$ m、受信機時計を $+2\ \mu\mathrm s$、衛星時計を $+1\ \mu\mathrm s$、電離圏遅延を4 m、対流圏遅延を2 m、その他の補正と偶然誤差を0とします。時計の差は $+1\ \mu\mathrm s$ なので

$$
P=20000000+299792458\times10^{-6}+4+2
=20000305.792458\ \mathrm m.
$$

この値が幾何距離を $305.792458$ m上回るのは、時計項と伝播遅延が同じ単位 mで**加算**されたためです。受信機・衛星の時計差が逆なら時計項の符号も逆になります。
<!-- definition-example-end -->

実観測では、衛星時計・電離圏・対流圏・ハードウェア遅延の模型を適用した残りにも不確かさがあります。衛星軌道の誤差は $\boldsymbol s^s$ の誤差として幾何距離へ入り、補正を二重に足してはいけません。以降は既知補正を取り除いて

$$
\widetilde P^s=P_r^s+c\delta t^s-I_r^s-T_r^s-d_r^s
=\|\boldsymbol s^s-\boldsymbol r\|+B+\varepsilon^s,
\qquad B=c\delta t_r
$$

と書きます。$B$ は秒ではなく**距離単位 mに換算した受信機時計偏り**です。幾何・時計と区別できず補正しきれなかった偏りは $\varepsilon^s$ に残るので、平均0の仮定は別途吟味が必要です。

---

## 2. 三次元位置と時計偏りの4未知量

受信機の暫定位置 $\boldsymbol r_0$ と時計偏り $B_0$ を持つとします。衛星位置 $\boldsymbol s^s$ はこの一次化では固定し、衛星と暫定受信機が一致しないと仮定します。暫定点から衛星へ向かう長さ1のベクトルを

$$
\boldsymbol u^s=\frac{\boldsymbol s^s-\boldsymbol r_0}{\rho_0^s},
\qquad \rho_0^s=\|\boldsymbol s^s-\boldsymbol r_0\|>0
$$

とします。小さな受信機移動 $\delta\boldsymbol r$ が衛星**へ近づく方向**なら距離は短くなるので、Jacobianの位置3列には負号が付きます。

<a id="prop-geod9-range-jacobian"></a>
<!-- formal-statement-start -->
> **命題（擬似距離の一次化と設計行列）**  
> $m$ 個の衛星位置 $\boldsymbol s^s\ne\boldsymbol r_0$ が同一基準枠で固定され、補正済み擬似距離の模型が $\widetilde P^s=\|\boldsymbol s^s-\boldsymbol r\|+B+\varepsilon^s$ であるとする。未知修正量を $\boldsymbol\delta=(\delta x,\delta y,\delta z,\delta B)^{\mathsf T}$ と置くと、暫定点 $(\boldsymbol r_0,B_0)$ での観測差 $b_s=\widetilde P^s-(\rho_0^s+B_0)$ は一次まで

$$
\boldsymbol b=H\boldsymbol\delta+\boldsymbol\varepsilon,
\qquad H_{s,:}=(-u_x^s,-u_y^s,-u_z^s,1)
$$

> となる。ここで $H$ は $m\times4$ 行列である。
<!-- formal-statement-end -->

**証明の見取り図。** 距離を二乗して微分すれば、座標の変化率は衛星への単位方向の反対向きです。時計偏りは式にそのまま $+B$ と入るので偏微分が1になります。

<!-- proof-start -->
### 証明

一つの衛星 $s$ を固定し、この証明中だけ $\boldsymbol s=\boldsymbol s^s$、$\rho(\boldsymbol r)=\|\boldsymbol s-\boldsymbol r\|$、$\rho_0=\rho(\boldsymbol r_0)$ と略記します。$r_k,s_k$ は同じ直交座標系での第 $k$ 成分（$k=1,2,3$）で、衛星位置と時計偏りを固定して $r_k$ で偏微分します。

$\rho(\boldsymbol r)^2=(\boldsymbol s-\boldsymbol r)^{\mathsf T}(\boldsymbol s-\boldsymbol r)$ の両辺を $r_k$ で微分すると

$$
2\rho\frac{\partial\rho}{\partial r_k}
=-2(s_k-r_k),\qquad
\left.\frac{\partial\rho}{\partial r_k}\right|_{\boldsymbol r_0}
=-\frac{s_k-r_{0,k}}{\rho_0}=-u_k.
$$

$\rho_0>0$ なので除算できます。また $\partial(\rho+B)/\partial B=1$。したがって $f_s(\boldsymbol r_0+\delta\boldsymbol r,B_0+\delta B)=\rho_0^s+B_0-\boldsymbol u^s\cdot\delta\boldsymbol r+\delta B+o(\|\boldsymbol\delta\|)$。これを $m$ 行並べれば主張です。これは[GEOD8の線形化観測式](../GEOD8/index.md#def-geod8-linearization)の具体例になっています。
<!-- proof-end -->

**直接計算。** 暫定受信機から衛星へ向かう単位方向が $(3/5,4/5,0)$ のとき、対応する行は $(-3/5,-4/5,0,1)$ です。$\delta\boldsymbol r=(1,-2,0)$ m、$\delta B=0.3$ mなら予測される擬似距離の変化は $-0.6+1.6+0.3=+1.3$ mです。時計の秒への換算をこのJacobianへ紛れ込ませてはいけません。

### 2.1 「4機あれば足りる」の正確な条件

4未知量に4本の行があるだけでは一意性は保証されません。$H$ が列階数4であることが必要です。幾何学的には、衛星方向ベクトルの端点が同一平面に載らないことに対応します。

<a id="thm-geod9-geometry-rank"></a>
<!-- formal-statement-start -->
> **定理（4機の局所的な測位可能条件）**  
> 4個の異なる衛星に向かう単位方向 $\boldsymbol u^1,\ldots,\boldsymbol u^4\in\mathbb R^3$ を用い、$4\times4$ 設計行列の第 $s$ 行を $(-\boldsymbol u^{s\mathsf T},1)$ とする。この行列が可逆であることと、3本の差ベクトル $\boldsymbol u^2-\boldsymbol u^1,\boldsymbol u^3-\boldsymbol u^1,\boldsymbol u^4-\boldsymbol u^1$ が一次独立であることは同値である。従って4方向の端点が同一平面上にあるとき、位置3成分と時計偏りの一次修正量は一意に決まらない。
<!-- formal-statement-end -->

**証明の見取り図。** 他の3行から第1行を引くと、最後の時計列が0になり、位置の差方向だけが残ります。この操作は行列の階数を変えません。

<!-- proof-start -->
### 証明

$H$ の第 $2,3,4$ 行から第1行を引くと

$$
H\sim\begin{pmatrix}
-\boldsymbol u^{1\mathsf T}&1\\
-(\boldsymbol u^2-\boldsymbol u^1)^{\mathsf T}&0\\
-(\boldsymbol u^3-\boldsymbol u^1)^{\mathsf T}&0\\
-(\boldsymbol u^4-\boldsymbol u^1)^{\mathsf T}&0
\end{pmatrix}.
$$

第4列で展開した行列式は符号を除いて、3本の差を行とする $3\times3$ 行列式です。よって $\det H\ne0$ と差ベクトルの一次独立性は同値です。同一平面上の4点では3差はその平面に平行な2次元以下の空間にあるので従属します。逆に非共面なら3差が独立です。
<!-- proof-end -->

これは**局所線形化の識別可能性**の条件であり、雑音のある非線形測位の大域的な一意性、収束、衛星が地平線より上にあることまで保証しません。実際の計算では、[GEOD8の重み付き最小二乗](../GEOD8/index.md#thm-geod8-weighted-normal)で修正量を求めて暫定値を更新し、衛星の送信時刻・補正も必要に応じて再計算します。収束後には元の非線形式で残差を確かめます。

---

## 3. 衛星配置が精度を変える：DOP

行列が可逆でも、衛星方向がほぼ同じなら観測誤差が大きな座標誤差に増幅されます。[GEOD8の推定共分散](../GEOD8/index.md#prop-geod8-adjustment-covariance)を GNSS の4未知量へ適用します。各補正済み擬似距離誤差が独立・平均0・同じ分散 $\sigma_P^2$（m²）を持ち、設計行列を固定した一次模型で考えると、$H$ の列階数4に対して

$$
\operatorname{Cov}(\widehat{\boldsymbol\delta})
=\sigma_P^2(H^{\mathsf T}H)^{-1}.
$$

括弧内は無次元の幾何学的係数であり、ここから DOP を定義します。最後の未知量は**秒でなく $B$（m）**なので、時間精度は得られた $B$ の標準偏差を $c$ で割ります。

<a id="def-geod9-dop"></a>
<!-- formal-statement-start -->
> **定義（GNSS の位置・時計の DOP）**  
> $H\in\mathbb R^{m\times4}$ の第 $s$ 行を $(-\boldsymbol u^{s\mathsf T},1)$ とし、$H$ は列階数4とする。$Q=(H^{\mathsf T}H)^{-1}=(q_{ij})$ に対して、地心直交座標系の位置精度低下率 PDOP、時計距離換算精度低下率 TDOP、両者を合わせた GDOP を

$$
\mathrm{PDOP}=\sqrt{q_{11}+q_{22}+q_{33}},\qquad
\mathrm{TDOP}=\sqrt{q_{44}},\qquad
\mathrm{GDOP}=\sqrt{\operatorname{tr}Q}
$$

> と定める。$Q$ は独立・等分散の測距誤差を仮定した**衛星配置だけ**の無次元係数であり、単独で位置誤差の実際の大きさを与えるものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod9-dop -->
**定義の確認**。計算の見通しを優先した架空の4衛星方向を

$$
\boldsymbol u^1=(1,0,0),\quad
\boldsymbol u^2=(-1,0,0),\quad
\boldsymbol u^3=(0,1,0),\quad
\boldsymbol u^4=(0,0,1)
$$

とします。これは同じ受信機からの方向を抽象的に指定した模型で、実際の地上点での可視性を表してはいません。各方向は長さ1です。[擬似距離の一次化](#prop-geod9-range-jacobian)で得た行 $(-u_x^s,-u_y^s,-u_z^s,1)$ に方向成分を代入して並べると、設計行列 $H$ は次のとおりです。右側は4本の観測差から未知修正量を解いて得る逆行列です。

$$
H=\begin{pmatrix}-1&0&0&1\\1&0&0&1\\0&-1&0&1\\0&0&-1&1\end{pmatrix},\quad
H^{-1}=\begin{pmatrix}
-1/2&1/2&0&0\\
1/2&1/2&-1&0\\
1/2&1/2&0&-1\\
1/2&1/2&0&0
\end{pmatrix}.
$$

第1・2行の和と差で時計と $x$ の修正を解き、その時計を第3・4行へ代入すれば逆行列を直接得られます。実際に $H^{-1}H=I_4$ となるため $H$ は列階数4で、DOP の定義条件を満たします。また、この正方かつ可逆な行列について

$$
(H^{\mathsf T}H)\bigl(H^{-1}(H^{-1})^{\mathsf T}\bigr)
=H^{\mathsf T}(H^{-1})^{\mathsf T}=I_4
$$

となるので、$(H^{\mathsf T}H)^{-1}=H^{-1}(H^{-1})^{\mathsf T}$ です。これにより

$$
Q=H^{-1}(H^{-1})^{\mathsf T}
=\begin{pmatrix}
1/2&0&0&0\\
0&3/2&1/2&1/2\\
0&1/2&3/2&1/2\\
0&1/2&1/2&1/2
\end{pmatrix}.
$$

対角和から $\mathrm{PDOP}=\sqrt{7/2}\simeq1.871$、$\mathrm{TDOP}=1/\sqrt2\simeq0.707$、$\mathrm{GDOP}=2$ となります。$\sigma_P=1$ mなら位置3成分の**分散の和**は $3.5\ \mathrm m^2$、時計距離換算の分散は $0.5\ \mathrm m^2$ です。
<!-- definition-example-end -->

地上の「水平・鉛直」へ分けるときは、[GEOD5のENU回転](../GEOD5/index.md#thm-geod5-enu-rotation)で位置3成分の共分散を局所東北上へ移してから HDOP（東・北2成分）と VDOP（上成分）を作ります。地心 $X,Y,Z$ の第1・2成分をそのまま「水平」と呼んではいけません。

### 3.1 共分散公式をどこまで信用するか

上の式は[GEOD8の共分散命題](../GEOD8/index.md#prop-geod8-adjustment-covariance)に $A=H$、$P=I$、$\sigma_0=\sigma_P$ を入れた結果です。重み付きなら誤差共分散 $\Sigma$ が正定値で正しく分かっている場合に $(H^{\mathsf T}\Sigma^{-1}H)^{-1}$ とします。電離圏の残差・マルチパス・衛星軌道などの相関や偏りは、この単純模型の外です。

例えば4方向がすべて $xy$ 平面にあると、行列の $z$ 列は全て0となって階数が4より小さく、$Q$ は定義できません。方向が**ほぼ**同じ平面にあると $Q$ は存在しても大きくなる場合があります。したがって「衛星数が多いから精度がよい」という判断ではなく、方向・重み・誤差模型を併せて確認します。

---

## 4. 搬送波位相：微細な長さと整数の不定性

コードの相関に対し、電波の搬送波の位相変化は波長より細かい変化を追えます。しかし受信機が追尾を始めた瞬間までに**何周期分が進んだか**は、その位相の小数部だけでは分かりません。周波数 $f>0$ Hz の信号の公称波長を $\lambda=c/f$ mとします。

単一周波数・単一信号の位相観測を周期数 $\Phi_r^s$ で表し、mに換算した $L_r^s=\lambda\Phi_r^s$ とします。コードと同じ幾何距離・時計項・対流圏遅延を用いる一方、電離圏の**一次効果はコードで正、搬送波位相で負**となります。

<a id="def-geod9-carrier-phase"></a>
<!-- formal-statement-start -->
> **定義（搬送波位相の距離換算模型と整数アンビギュイティ）**  
> 同一周波数 $f>0$、波長 $\lambda=c/f$ の位相観測 $L_r^s=\lambda\Phi_r^s$（m）を考える。衛星・受信機時計差と一次電離圏効果を明示した基本模型は

$$
L_r^s=\rho_r^s+c(\delta t_r-\delta t^s)
+T_r^s-I_r^s+\lambda N_r^s+\beta_r^s+\varepsilon_{L,r}^s
$$

> である。$N_r^s\in\mathbb Z$ は同じ追尾区間・位相規約での**整数アンビギュイティ**、$\beta_r^s$ はアンテナ・機器位相バイアス等の残余（m）、$\varepsilon_{L,r}^s$ は偶然誤差（m）とする。$N_r^s$ は追尾が途切れ周期の飛び（サイクルスリップ）が起きれば変わり得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod9-carrier-phase -->
**定義の確認**。計算用の架空の波長を $\lambda=0.20$ mとすると、周期数の不明分が5周期なら $\lambda N=+1.00$ mです。同じ $\rho=1000$ m、$I=+5$ m、$T=+2$ m、時計・機器・偶然誤差は0なら、コードは $P=1000+5+2=1007$ m、搬送波位相は $L=1000-5+2+1=998$ mです。符号の異なる電離圏寄与と整数1 mを見分けられます。
<!-- definition-example-end -->

この整数は**単独受信機の生の位相値から直ちに決められるわけではありません**。時計、ハードウェア位相バイアス、波長、周波数間・衛星系間の規約をそろえる必要があります。アンビギュイティの整数推定や精密な軌道推定は発展内容とし、ここでは差分でどの項が消えるかまでを確かめます。

---

## 5. 二重差：二つの時計を差し引く

近い2受信局 $A,B$ が同時期に同じ衛星 $s,t$ を追跡する状況を考えます。位相に付く受信機時計差は**同じ受信機について衛星に共通**であり、衛星時計差は**同じ衛星について受信機に共通**です。そこでまず受信機間、次に衛星間の差を取ります。

<a id="def-geod9-double-difference"></a>
<!-- formal-statement-start -->
> **定義（受信機間・衛星間の二重差）**  
> 同一時点における同じ信号の観測量 $Y_A^s,Y_B^s,Y_A^t,Y_B^t$ に対して、受信機間の一重差を $\Delta_{AB}Y^s=Y_B^s-Y_A^s$ と置く。さらに衛星 $s,t$ の間で差を取った

$$
\nabla_{st}\Delta_{AB}Y
=(Y_B^s-Y_A^s)-(Y_B^t-Y_A^t)
$$

> を二重差と呼ぶ。観測量がmなら二重差もmである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod9-double-difference -->
**定義の確認**。同じ単位mで $Y_A^s=20,Y_B^s=26,Y_A^t=30,Y_B^t=34$ なら、受信機差は $26-20=6$ mと $34-30=4$ m、二重差は $6-4=+2$ mです。$Y_A^s-Y_B^s$ を使えば全体の符号が反転するので、差の順序を固定します。
<!-- definition-example-end -->

<a id="prop-geod9-clock-cancellation"></a>
<!-- formal-statement-start -->
> **命題（二重差による受信機・衛星時計項の相殺）**  
> 同一時点・同一信号で2受信機 $A,B$ と2衛星 $s,t$ を観測し、各観測量が

$$
Y_r^j=\rho_r^j+c\delta t_r-c\delta t^j+D_r^j
$$

> と表されるとする（$r\in\{A,B\},j\in\{s,t\}$、$D_r^j$ はその他の項）。同じ受信機の時計項は衛星によらず、同じ衛星の時計項は受信機によらないと仮定すると、

$$
\nabla_{st}\Delta_{AB}Y
=\nabla_{st}\Delta_{AB}\rho+\nabla_{st}\Delta_{AB}D
$$

> が成り立ち、両種類の時計項は代数的に相殺される。
<!-- formal-statement-end -->

**証明の見取り図。** 最初の差で衛星時計を、次の差で受信機時計を消します。どちらの差でも、幾何距離や大気遅延は一般に残ります。

<!-- proof-start -->
### 証明

固定した衛星 $j$ について受信機間の差を取ると

$$
\begin{aligned}
Y_B^j-Y_A^j
&=(\rho_B^j-\rho_A^j)+c(\delta t_B-\delta t_A)\\
&\quad+(-c\delta t^j+c\delta t^j)+(D_B^j-D_A^j)\\
&=\Delta_{AB}\rho^j+c(\delta t_B-\delta t_A)+\Delta_{AB}D^j.
\end{aligned}
$$

これを $j=s$ と $j=t$ で引くと、共通の $c(\delta t_B-\delta t_A)$ も消え、主張が従います。相殺するのは**同じ時点に共通な時計項**であり、非同時観測の時計変動や受信機ごとに異なる衛星時計相当の補正を無条件に消してよいわけではありません。
<!-- proof-end -->

搬送波位相なら $D_r^j=T_r^j-I_r^j+\lambda N_r^j+\beta_r^j+\varepsilon_{L,r}^j$ です。同じ波長 $\lambda$ を使って上で定めた[二重差](#def-geod9-double-difference)を4観測に適用すると、機器バイアス等が残る可能性を保ったまま整数部分は

$$
N_{AB}^{st}=(N_B^s-N_A^s)-(N_B^t-N_A^t)\in\mathbb Z
$$

となり、位相観測の二重差は

$$
\begin{aligned}
\nabla_{st}\Delta_{AB}L
&=\nabla_{st}\Delta_{AB}\rho+\nabla_{st}\Delta_{AB}(T-I)\\
&\quad+\lambda N_{AB}^{st}+\nabla_{st}\Delta_{AB}(\beta+\varepsilon_L)
\end{aligned}
$$

です。ここでは二重差の衛星・受信機添字を省略せず、差を取る順序を固定しています。

単独測位は一般に受信機の位置・時計を直接推定し、相対測位は局間のベースラインに差分観測を結び付けます。近接局なら大気・軌道の共通部分が**近似的**に小さくなることがありますが、差分が常に大気遅延を完全相殺するわけではありません。差を取れば観測誤差間に相関が生じることもあり、[GEOD8の重み行列](../GEOD8/index.md#def-geod8-weight)を無修正で再利用してはいけません。

---

## 6. 数字だけの位置ではなく、基準枠と時点も持つ

GNSSから得る地心直交座標は、衛星軌道・地上基準局を結ぶ基準枠の中で意味を持ちます。[GEOD2の基準座標系の実現](../GEOD2/index.md#def-geod2-reference-frame)と[座標時点](../GEOD2/index.md#def-geod2-coordinate-epoch)を思い出してください。ITRS は地球を対象とする国際的な参照の定義体系であり、ITRF はその実現の一つです。ITRF の解では位置だけでなく局の速度や時系列も扱います。異なる実現（realization）と座標時点（epoch）の数値を、同じ物理点の同時点座標として比べてはいけません。

短い期間・安定した局では、基準時点 $t_0$ の座標 $\boldsymbol r_0$（m）と速度 $\boldsymbol v$（m/年）から、年単位の経過時間 $t-t_0$ による**線形位置模型**を用いることがあります。

ここでプライムは時点 $t$ に関する通常の微分で、成分ごとの Leibniz 記法とは次のように対応します（$k=1,2,3$）。

$$
\boldsymbol r'(t)=\frac{d\boldsymbol r(t)}{dt},\qquad
r_k'(t)=\frac{dr_k}{dt}.
$$

第2節の位置成分 $r_k$ による偏微分 $\partial\rho/\partial r_k$ とは、微分する変数が異なります。

<a id="prop-geod9-coordinate-epoch"></a>
<!-- formal-statement-start -->
> **命題（同じ基準枠内の等速位置時点模型）**  
> 一つの基準枠の下で、期間 $[t_0,t_1]$ 中の地上点位置 $\boldsymbol r(t)\in\mathbb R^3$ が微分可能で、速度が一定 $\boldsymbol r'(t)=\boldsymbol v$（m/年）であると仮定する。$t$ は年単位の連続した時点とする。このとき任意の $t\in[t_0,t_1]$ に対して

$$
\boldsymbol r(t)=\boldsymbol r(t_0)+\boldsymbol v(t-t_0)
$$

> が成り立つ。これは基準枠の**変換式ではなく**、同じ枠における一つの点の運動模型である。
<!-- formal-statement-end -->

**証明の見取り図。** 各座標成分の時間微分が定数なら、その積分は「初期位置＋速度×経過時間」です。

<!-- proof-start -->
### 証明

各成分 $k=1,2,3$ で $dr_k/dt=v_k$ です。積分変数を $\tau$ として両辺を $t_0$ から $t$ まで積分し、左辺を原始関数の差で評価すると

$$
r_k(t)-r_k(t_0)=\int_{t_0}^t r_k'(\tau)\,d\tau
=\int_{t_0}^t v_k\,d\tau=v_k(t-t_0).
$$

3成分を並べれば主張が得られます。途中で速度が変化するなら積分の中を定数として外へ出せません。
<!-- proof-end -->

**直接計算。** 架空の点の速度が $\boldsymbol v=(0.02,-0.01,0)$ m/年、基準時点から5年後なら、変位は $(0.10,-0.05,0)$ mです。これは測位誤差ではなく、同じ点が動いたという**模型上の座標差**です。実際の地殻変動には地震時の不連続、余効変動、非線形な変化があり、上式が常に成り立つとは限りません。

衛星測位の座標が楕円体高を持つ場合、[GEOD6の高さ関係](../GEOD6/index.md#prop-geod6-height-relation)に従って物理的な標高と区別します。GISで測位結果を重ねるときは、少なくとも[測地基準系](../GEOD2/index.md#def-geod2-reference-system)・その実現・座標時点・楕円体・高さの種類を確認します。

### 6.1 誤差と測位法の見取り図

| 要因 | コード擬似距離 | 搬送波位相 | この章での扱い |
|---|---|---|---|
| 受信機・衛星時計 | $+c(\delta t_r-\delta t^s)$ | 同じ符号 | 単独測位では未知時計を推定、理想二重差では相殺 |
| 電離圏の一次項 | $+I$ | $-I$ | 周波数依存、補正残差を残す |
| 対流圏 | $+T$ | $+T$ | 局間で完全には消えない |
| 軌道・地球自転・相対論的項 | 幾何・時刻模型へ影響 | 同じ幾何・時刻模型へ影響 | 一貫した補正が必要 |
| マルチパス・機器偏り | 観測と補正に影響 | 位相バイアス、追尾断に注意 | 偶然誤差と系統偏りを分離 |
| 受信機間の相対位置 | 差分観測から推定可能 | 整数項を含む差分から推定可能 | 共分散と基準局のdatumが必要 |

実務では多周波の組合せや精密衛星軌道・時計を用いた測位もありますが、ここで導出した単純な式だけでその精度を保証することはできません。測位成果を保存する際は、誤差統計に加えて使用した観測・補正の種類と基準の情報を添えます。

---

## 7. 演習：観測式から精度・相対位置・座標時点まで

### Level A：符号と単位を一つずつ確認する

#### A1. 時計差を距離へ換算

受信機時計が座標時より $+2\ \mu\mathrm s$ 進み、衛星時計が座標時と一致し、幾何距離と伝播遅延が既知である。時計差が擬似距離へ加える値を求めよ。$c=299792458\ \mathrm{m/s}$ とする。

- Level: A
- ID: GEOD9-A1

<!-- solution-start -->
**詳細解答。** [擬似距離の定義](#def-geod9-pseudorange)にある時計項は $c(\delta t_r-\delta t^s)$ です。$\delta t_r=2\times10^{-6}$ s、$\delta t^s=0$ sと置くと

$$
c(\delta t_r-\delta t^s)=299792458\times2\times10^{-6}
=+599.584916\ \mathrm m.
$$

受信機時計が進んでいるため符号は正です。$2\ \mu\mathrm s$ を $2$ sとして代入してはいけません。
<!-- solution-end -->

#### A2. 1行の測位 Jacobian

暫定受信機位置を $(0,0,0)$ m、衛星位置を $(3000,4000,0)$ mとする（同じ直交座標系）。幾何距離、単位方向、設計行列の1行を導け。さらに修正量 $\delta\boldsymbol r=(1,-2,0)$ m、$\delta B=0.3$ mの擬似距離変化の一次予測を求めよ。

- Level: A
- ID: GEOD9-A2

<!-- solution-start -->
**詳細解答。** 差ベクトルは $(3000,4000,0)$ mであり、$\rho_0=\sqrt{3000^2+4000^2}=5000$ mです。$\boldsymbol u=(3/5,4/5,0)$。距離の勾配は衛星へ向かう方向の負なので、[擬似距離の一次化と設計行列](#prop-geod9-range-jacobian)から $H_{s,:}=(-3/5,-4/5,0,1)$。よって

$$
H_{s,:}\boldsymbol\delta=-(3/5)(1)-(4/5)(-2)+0.3
=-0.6+1.6+0.3=+1.3\ \mathrm m.
$$

この変化は一次近似であり、衛星から3000–4000 mという数値も説明用の模型です。
<!-- solution-end -->

#### A3. 4方向から修正量を求める

4衛星の設計行列を

$$
H=\begin{pmatrix}-1&0&0&1\\1&0&0&1\\0&-1&0&1\\0&0&-1&1\end{pmatrix}
$$

とし、補正済みの観測差を $(5,1,2,3)^{\mathsf T}$ mとする。未知修正量 $(\delta x,\delta y,\delta z,\delta B)$ を解き、元の4式へ戻して検算せよ。

- Level: A
- ID: GEOD9-A3

<!-- solution-start -->
**詳細解答。** 1行目と2行目から $-\delta x+\delta B=5$、$\delta x+\delta B=1$ です。加えると $2\delta B=6$ だから $\delta B=3$ m、引くと $2\delta x=-4$ だから $\delta x=-2$ m。3行目より $-\delta y+3=2$ なので $\delta y=1$ m、4行目より $-\delta z+3=3$ なので $\delta z=0$ m。

$$
\widehat{\boldsymbol\delta}=(-2,1,0,3)^{\mathsf T}\ \mathrm m,
\qquad H\widehat{\boldsymbol\delta}=(5,1,2,3)^{\mathsf T}\ \mathrm m.
$$

第4成分3 mは時計距離換算で、秒なら $3/299792458\simeq1.00069\times10^{-8}$ sです。
<!-- solution-end -->

#### A4. コードと位相の電離圏符号

ある一周波の理想化観測で $\rho=1000$ m、$I=5$ m、$T=2$ m、時計・機器・偶然誤差は0、波長 $\lambda=0.20$ m、整数アンビギュイティ $N=5$ とする。擬似距離 $P$ と位相距離 $L$ をそれぞれ求めよ。

- Level: A
- ID: GEOD9-A4

<!-- solution-start -->
**詳細解答。** [擬似距離](#def-geod9-pseudorange)には $+I$、[搬送波位相](#def-geod9-carrier-phase)には $-I$ が入ります。まず $\lambda N=0.20\times5=1$ mを得ます。従って

$$
P=1000+5+2=1007\ \mathrm m,\qquad
L=1000-5+2+1=998\ \mathrm m.
$$

コードと位相の電離圏符号を同じに置くと両者の差を再現できません。
<!-- solution-end -->

#### A5. 位置の時点をそろえる

一つの固定された基準枠で、2015.0年の地上点位置が $\boldsymbol r_0$、速度が $(0.02,-0.01,0)$ m/年と一定である模型を考える。2020.0年の座標差と、単位をcmに直した値を求めよ。

- Level: A
- ID: GEOD9-A5

<!-- solution-start -->
**詳細解答。** [等速時点模型](#prop-geod9-coordinate-epoch)で $t-t_0=2020.0-2015.0=5.0$ 年を代入します。

$$
\boldsymbol r(2020.0)-\boldsymbol r(2015.0)
=5(0.02,-0.01,0)=(0.10,-0.05,0)\ \mathrm m
=(10,-5,0)\ \mathrm{cm}.
$$

同じ点でも時点が異なれば数値座標が変わり得ます。これは別の基準枠への変換ではありません。
<!-- solution-end -->

### Level B：階数・共分散・差分を導出する

#### B1. DOPを逆行列から求める

A3の $H$ と、独立・平均0・分散 $\sigma_P^2$ が共通の測距誤差を用いる。$H^{-1}$ と $Q=(H^{\mathsf T}H)^{-1}$ を計算し、PDOP、TDOP、GDOPを求めよ。$\sigma_P=0.50$ mなら $x,y,z,B$ の各標準偏差も示せ。

- Level: B
- ID: GEOD9-B1

<!-- solution-start -->
**詳細解答。** $\boldsymbol b=H\boldsymbol\delta$ の第1・2行から $\delta x=(b_2-b_1)/2$、$\delta B=(b_1+b_2)/2$。続いて $\delta y=(b_1+b_2)/2-b_3$、$\delta z=(b_1+b_2)/2-b_4$ です。これが逆行列の各行であり

$$
H^{-1}=\begin{pmatrix}-1/2&1/2&0&0\\1/2&1/2&-1&0\\1/2&1/2&0&-1\\1/2&1/2&0&0\end{pmatrix}.
$$

$Q=H^{-1}(H^{-1})^{\mathsf T}$ の対角要素は各行の二乗和です。位置には $1/2,3/2,3/2$、時計には $1/2$ が得られ、非対角成分は第2・3成分間、第2・4成分間、第3・4成分間でそれぞれ $1/2$ です。よって

$$
Q=\begin{pmatrix}1/2&0&0&0\\0&3/2&1/2&1/2\\0&1/2&3/2&1/2\\0&1/2&1/2&1/2\end{pmatrix}.
$$

[GNSS の位置・時計の DOP](#def-geod9-dop)の定義から $\mathrm{PDOP}=\sqrt{7/2}$、$\mathrm{TDOP}=\sqrt{1/2}$、$\mathrm{GDOP}=\sqrt4=2$。各標準偏差は $\sigma_P\sqrt{q_{ii}}$ なので $x,B$ は $0.5/\sqrt2\simeq0.3536$ m、$y,z$ は $0.5\sqrt{3/2}\simeq0.6124$ mです。時計偏りの秒での標準偏差は $0.3536/c\simeq1.18$ nsです。
<!-- solution-end -->

#### B2. 4機でも解けない配置

単位衛星方向が $(1,0,0),(-1,0,0),(0,1,0),(0,-1,0)$ の4本であるとする。設計行列を作り、その階数を求めよ。どの未知修正量が識別不能か、[4機の条件](#thm-geod9-geometry-rank)との関係を示せ。

- Level: B
- ID: GEOD9-B2

<!-- solution-start -->
**詳細解答。** 4本の行をそのまま並べると

$$
H=\begin{pmatrix}-1&0&0&1\\1&0&0&1\\0&-1&0&1\\0&1&0&1\end{pmatrix}.
$$

第3列は零なので $H(0,0,1,0)^{\mathsf T}=0$ です。第1・2列と第4列は独立です。実際に第1・2行の和で時計列、第1・2行の差で $x$ 列、第3・4行の差で $y$ 列が取り出せ、階数3です。従って $z$ 方向の修正は任意に変えても観測の一次予測が変わりません。4方向は $z=0$ 平面に載り、[非共面条件](#thm-geod9-geometry-rank)を満たしません。
<!-- solution-end -->

#### B3. 二重差と整数の再構成

2受信機 $A,B$ と2衛星 $s,t$ の同時・同信号の位相距離 $L$ を考える。各観測に同じ形式の時計項 $c\delta t_r-c\delta t^j$ があることから、二重差で消える項を4式から導け。波長と位相整数を

$$
\lambda=0.20\ \mathrm m,\quad
(N_A^s,N_B^s,N_A^t,N_B^t)=(2,5,1,1)
$$

としたとき、二重差の整数と距離寄与を求めよ。大気・機器残差の相殺は仮定しない。

- Level: B
- ID: GEOD9-B3

<!-- solution-start -->
**詳細解答。** [二重差](#def-geod9-double-difference)の順で4時計項を列挙すると

$$
\begin{aligned}
&(c\delta t_B-c\delta t^s)-(c\delta t_A-c\delta t^s)\\
&\quad-(c\delta t_B-c\delta t^t)+(c\delta t_A-c\delta t^t)\\
&=c\delta t_B-c\delta t_A-c\delta t_B+c\delta t_A
-c\delta t^s+c\delta t^s+c\delta t^t-c\delta t^t=0.
\end{aligned}
$$

一方整数項は $N_{AB}^{st}=(5-2)-(1-1)=3\in\mathbb Z$ なので、距離寄与は $\lambda N_{AB}^{st}=0.20\times3=+0.60$ mです。[相殺の命題](#prop-geod9-clock-cancellation)は幾何・大気・機器バイアスまで零とする主張ではありません。
<!-- solution-end -->

#### B4. 冗長な観測の最小二乗

A3の4行 $H_1,H_2,H_3,H_4$ に加え、$H_5=H_1$ をもう一度独立に観測する。5本の観測差を $(5,1,2,3,7)^{\mathsf T}$ m、全観測の分散を等しい既知値 $\sigma_P^2$ とする。最小二乗による $(\delta x,\delta y,\delta z,\delta B)$ と5残差 $H\widehat{\boldsymbol\delta}-\boldsymbol b$、自由度を求めよ。

- Level: B
- ID: GEOD9-B4

<!-- solution-start -->
**詳細解答。** 最小化する二乗和は

$$
S=(-\delta x+\delta B-5)^2+(\delta x+\delta B-1)^2
+(-\delta y+\delta B-2)^2+(-\delta z+\delta B-3)^2
+(-\delta x+\delta B-7)^2.
$$

$\delta y,\delta z$ はそれぞれ $\delta y=\delta B-2$、$\delta z=\delta B-3$ と選べば対応する二乗項が0になります。$a=-\delta x+\delta B$ と $d=\delta x+\delta B$ を新たな変数とすると、残りは $(a-5)^2+(d-1)^2+(a-7)^2$。微分して $2(a-5)+2(a-7)=4a-24=0$、$2(d-1)=0$ より $a=6,d=1$ です。従って

$$
\delta B=(a+d)/2=3.5,\quad
\delta x=(d-a)/2=-2.5,\quad
\delta y=1.5,\quad\delta z=0.5\quad(\mathrm m).
$$

予測は $(6,1,2,3,6)$ m、残差は $(+1,0,0,0,-1)$ m、二乗和は $2\ \mathrm m^2$ です。独立な列数4・観測数5だから自由度は $m-n=1$。[GEOD8の残差共分散](../GEOD8/index.md#prop-geod8-adjustment-covariance)における「冗長観測がある」の具体例ですが、残差2本は独立ではありません。
<!-- solution-end -->

### Level C：測位・精度・位相・時点の統合

#### C1. 4衛星模型を最後まで点検する

同一基準枠で補正済み擬似距離を線形化したとする。衛星方向は

$$
\boldsymbol u^1=(1,0,0),\quad \boldsymbol u^2=(-1,0,0),\quad
\boldsymbol u^3=(0,1,0),\quad \boldsymbol u^4=(0,0,1),
$$

観測差は $\boldsymbol b=(5,1,2,3)^{\mathsf T}$ mで、4観測の偶然誤差は独立・平均0・共通標準偏差 $\sigma_P=0.50$ mとする。地球上の可視性や系統誤差を主張しない合成模型である。次を求めよ。

1. 4未知量の設計行列と階数、最小二乗修正量（時計はm換算）、一次残差。
2. 位置・時計の共分散の対角成分、PDOP・TDOP・GDOPと、$x$ 座標・時計秒の標準偏差。
3. 第4衛星が欠けた場合の識別可能性。測距の標準偏差が同じでも位置の精度が必ず同じとは限らない理由。
4. 同じ信号・同時の2局2衛星の位相二重差について、幾何二重差が $1.2$ m、測定位相二重差が $1.8$ m、大気・機器残差・雑音の二重差が0、波長が $0.20$ mなら、二重差整数を求めよ。
5. 別途、ある基準点が同じ枠で速度 $(0.02,0,0)$ m/年と一定と仮定するとき、観測から5年後の同じ点のモデル上の座標変位を求め、1の時計修正や2の測位共分散と混同しない理由を述べよ。

- Level: C
- ID: GEOD9-C1

<!-- solution-start -->
**詳細解答。** はじめに衛星方向と誤差模型が既知で固定されていることを確認します。実測の軌道・基準枠の整合をこの問題だけから保証することはできません。

1. [擬似距離のJacobian](#prop-geod9-range-jacobian)から

   $$
   H=\begin{pmatrix}-1&0&0&1\\1&0&0&1\\0&-1&0&1\\0&0&-1&1\end{pmatrix}.
   $$

   第1・2行の和・差、さらに第3・4行を使って順に時計、$x,y,z$ を解けるため $\operatorname{rank}H=4$ です。最初の2行を加減すると

   $$
   -\delta x+\delta B=5,\quad \delta x+\delta B=1
   \quad\Longrightarrow\quad \delta B=3,\ \delta x=-2.
   $$

   残りの行から $\delta y=1$ m、$\delta z=0$ mです。従って $\widehat{\boldsymbol\delta}=(-2,1,0,3)^{\mathsf T}$ m、$H\widehat{\boldsymbol\delta}=\boldsymbol b$ で一次残差は零です。**観測数と未知数が等しいため、残差が零でも誤差がない証拠になりません。**

2. [GNSS の位置・時計の DOP](#def-geod9-dop)の定義で $Q=(H^{\mathsf T}H)^{-1}$ を作ります。逆行列に対応する4つの解は

   $$
   \begin{aligned}
   \delta x&=(b_2-b_1)/2,&\delta y&=(b_1+b_2)/2-b_3,\\
   \delta z&=(b_1+b_2)/2-b_4,&\delta B&=(b_1+b_2)/2.
   \end{aligned}
   $$

   その係数行列を $H^{-1}$ とし、$Q=H^{-1}(H^{-1})^{\mathsf T}$ から対角 $(1/2,3/2,3/2,1/2)$ を得ます。$\sigma_P^2=0.25\ \mathrm m^2$ を掛けて共分散の対角は

   $$
   (0.125,0.375,0.375,0.125)\ \mathrm m^2.
   $$

   その和から $\mathrm{PDOP}=\sqrt{7/2}$、$\mathrm{TDOP}=1/\sqrt2$、$\mathrm{GDOP}=2$。$x$ の標準偏差は $\sqrt{0.125}\simeq0.3536$ m、時計秒の標準偏差は $\sqrt{0.125}/c\simeq1.18\times10^{-9}$ sです。

3. 第4行を除くと行数3なので階数は高々3、4未知量を一意に決められません。たとえば $\delta z$ は残った3行に現れず、任意です。反対に行数が4以上あっても[衛星配置の階数条件](#thm-geod9-geometry-rank)が悪ければ位置分散は大きくなります。同じ $\sigma_P$ でも $Q$ が幾何に依存するため、位置共分散は異なります。

4. [二重差](#def-geod9-double-difference)と[時計相殺](#prop-geod9-clock-cancellation)の後、理想化した位相式は $1.8=1.2+0.20N_{AB}^{st}$ mとなります。よって $0.20N=0.60$ m、$N_{AB}^{st}=3\in\mathbb Z$。実務で同じ差が得られても、位相バイアス・大気残差が無視できなければ、この引き算だけで整数確定とは言えません。

5. [等速時点模型](#prop-geod9-coordinate-epoch)の経過時間5年を代入し、$\Delta\boldsymbol r=(0.10,0,0)$ mを得ます。1の $\delta B=3$ mは受信機時計への**同一観測時点の補正**、2の共分散は偶然観測誤差に基づく**推定不確かさ**、5の $0.10$ mは異なる座標時点間の**運動模型上の変位**です。これらを足し合わせて「測位誤差」と呼ぶのは量の意味が違うため誤りです。
<!-- solution-end -->

---

## 8. 何を測った値なのかを最後に言い直す

GNSS が直接返す基本観測量は、時計や伝播の影響を含むコードの擬似距離と搬送波位相です。位置は、軌道・時計・大気等の模型、衛星幾何、観測の重み、そして基準枠を結んで**推定**します。衛星の数と残差だけでは、座標の正しさや基準時点の一致を保証できません。

本章の位置は地心直交座標で扱いました。測地緯度・経度・楕円体高への変換は[GEOD5の順変換](../GEOD5/index.md#thm-geod5-forward)と逆問題、高さの意味は[GEOD6の高さ関係](../GEOD6/index.md#prop-geod6-height-relation)へ戻って点検できます。次に重力・高さを扱うときは、幾何学的な高さと重力に基づく高さを区別したまま進みましょう。

参考となる一次資料：[ESA Navipedia「GNSS Basic Observables」](https://gssc.esa.int/navipedia/index.php/GNSS_Basic_Observables)、[「GNSS Measurements Modelling」](https://gssc.esa.int/navipedia/index.php/GNSS_Measurements_Modelling)、[「Positioning Error」](https://gssc.esa.int/navipedia/index.php/Positioning_Error)、[IERS ITRF](https://www.iers.org/iers/en/dataproducts/itrf/itrf)。これらは物理模型と用語の照合先であり、本章の架空の数値例の観測データ元ではありません。
