# FCG7 格子と粒子のどちらで水を動かすか

[FCG5の時間分割ソルバー](../FCG5/index.md#def-fcg5-split-step)では速度を固定格子へ置き、[FCG6の固体マスク](../FCG6/index.md#def-fcg6-solid-mask)では境界の位置と流れを分離して扱った。固定格子は圧力差分を計算しやすいが、水滴のように移動する物質を追い続けるには、染料や界面を何度も格子へ補間する必要がある。一方、動く粒子に速度を持たせると水の移動を見やすいが、[MAC格子上の圧力射影](../FCG4/index.md#def-fcg4-gradient-projection)のような規則正しい差分計算は粒子だけでは難しい。

そこで、速度を持つ粒子を格子へ集めて計算し、格子の更新を粒子へ戻す。これが粒子・格子併用法の出発点である。粒子速度を「格子の新しい速度で**置き換える**」のがPIC、「格子で**変わった分だけ足す**」のがFLIPであり、両者の違いは計算の途中式から確かめられる。

**この講で解く問題の範囲。** 領域を $[0,1)^2$ [m²] とし、対辺を同一視する**周期境界**を採用する。実験では $8\times8$ の**節点格子**に各節点の2成分速度を置き、質量1 kgの粒子16個を扱う。FCG5の水平・鉛直面に速度を分けるMAC格子とは格子上の置き場が異なる。これは**転送機構だけ**を独立に調べるための選択であり、MAC上の非圧縮性射影、重力による自由表面、水槽の固体壁衝突、実際の液体の体積保存まで解くものではない。

## 1. 粒子を格子のどこへ預けるか

格子間隔を $h=1/N$ [m]、節点を $(ih,jh)$（$i,j=0,\ldots,N-1$）とする。周期境界では節点番号 $N$ は0と同じ位置である。粒子 $p$ の位置 $(x_p,y_p)$ は $0\le x_p,y_p<1$ に正規化しておく。

格子の4点へ粒子を割り振るには、まず粒子位置を格子間隔で割って、隣の節点番号と節点間の割合を求めればよい。節点を越えた粒子も4つの重みの和が1になるようにする。

<a id="def-fcg7-weights"></a>

<!-- formal-statement-start -->
> **定義（粒子・格子双線形転送重み）**  
> $N\ge2$、$h=1/N$ とし、粒子位置 $(x_p,y_p)\in[0,1)^2$ に対して

$$
X_p=x_p/h,\quad Y_p=y_p/h,\quad
i=\lfloor X_p\rfloor,\quad j=\lfloor Y_p\rfloor,
$$

$$
a=X_p-i,\qquad b=Y_p-j,\qquad 0\le a,b<1
$$

> と置く。粒子 $p$ から隣接する周期節点 $(i,j),(i+1,j),(i,j+1),(i+1,j+1)$ へ与える重み $w_{Ip}$ は、順に

$$
(1-a)(1-b),\qquad a(1-b),\qquad (1-a)b,\qquad ab
$$

> である。節点添字は各軸で $N$ を法として解釈し、その他の節点への重みは0とする。全ての重みは非負で、各粒子について $\sum_Iw_{Ip}=1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg7-weights -->
**直接例。** $N=8,h=1/8$、粒子を $(0.95,0.25)$ [m] に置く。格子座標は $X=7.6,Y=2$ だから $(i,j)=(7,2)$、$(a,b)=(0.6,0)$ となる。4つの重みは $0.4,0.6,0,0$。右隣節点 $(8,2)$ は周期境界により $(0,2)$ である。

$$
w_{(7,2),p}=0.4,\qquad w_{(0,2),p}=0.6,\qquad
\sum_Iw_{Ip}=0.4+0.6=1.
$$

**定義の確認**：実際に求めた4重みは非負、合計1であり、対辺を越える節点を捨てずに0番へ折り返した。粒子が格子境界の外へ消えたわけではない。
<!-- definition-example-end -->

一般にも4重みの和は

$$
(1-a)(1-b)+a(1-b)+(1-a)b+ab
=(1-b)((1-a)+a)+b((1-a)+a)=1
$$

となる。この等式が後の運動量保存と定数場再現の鍵である。

## 2. 粒子から格子へ運動量を運ぶ

粒子には位置と速度に加えて質量を持たせる。節点速度を粒子速度の単純平均で決めると、粒子の質量が違う場合には運動量の重み付けが失われる。そこで**質量も一緒に**節点へ集める。

<a id="def-fcg7-p2g"></a>

<!-- formal-statement-start -->
> **定義（質量重み付き粒子から格子への転送）**  
> 有限個の粒子 $p$ が正の質量 $m_p>0$ [kg] と速度 $\boldsymbol v_p\in\mathbb R^2$ [m/s] を持つとする。[双線形転送重み](#def-fcg7-weights)で節点 $I$ の質量 $M_I$ と速度 $\boldsymbol g_I$ を

$$
M_I=\sum_p m_pw_{Ip},\qquad
\boldsymbol P_I=\sum_p m_pw_{Ip}\boldsymbol v_p
$$

$$
\boldsymbol g_I=
\begin{cases}
\boldsymbol P_I/M_I & M_I>0,\\
\boldsymbol 0 & M_I=0
\end{cases}
$$

> と定める。$\boldsymbol P_I$ は節点に集めた運動量 [kg m/s] であり、速度そのものではない。$M_I=0$ の節点の速度0は計算上の取り決めである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg7-p2g -->
**直接例。** 同じ節点 $(2,2)$ に質量各1 kgの粒子を二つ置き、水平速度をそれぞれ $+1,-1$ [m/s] とする。どちらも $(2,2)$ への重みが1で、他は0である。

$$
M_{(2,2)}=1+1=2,\qquad P^x_{(2,2)}=1-1=0,\qquad g^x_{(2,2)}=0.
$$

他の節点は質量0で、取り決め通り速度も0とする。**定義の確認**：節点質量2 kgと運動量0 kg m/sを別々に積み上げてから割っており、粒子が消えたのではなく**互いに逆の速度が格子上で相殺**された。
<!-- definition-example-end -->

## 3. 格子から粒子へ何を戻すか

格子速度 $\boldsymbol g_I^{\mathrm{old}}$ を得た後、格子上で外力・粘性・射影などの更新を行うと $\boldsymbol g_I^{\mathrm{new}}$ ができる。本章のラボは機構を切り分けるため、圧力射影を実装せず、速度減衰と既知の位置依存加速度だけを加える。

PICは新速度を補間し、FLIPは格子の速度**差**を補間する。どちらも重みは旧粒子位置で評価する。ここで「粒子の新位置」で重みを作ってしまうと、更新前後の位置が混じって増分の意味が変わる。

<a id="def-fcg7-picflip"></a>

<!-- formal-statement-start -->
> **定義（PICとFLIPの粒子速度更新）**  
> 同じ粒子位置と重み $w_{Ip}$ に対し、P2Gの旧格子速度 $\boldsymbol g_I^{\mathrm{old}}$ と、格子計算後の新速度 $\boldsymbol g_I^{\mathrm{new}}$ が与えられるとする。PICとFLIPの候補速度を

$$
\boldsymbol v_p^{\mathrm{PIC}}
=\sum_I w_{Ip}\boldsymbol g_I^{\mathrm{new}},
$$

$$
\boldsymbol v_p^{\mathrm{FLIP}}
=\boldsymbol v_p^{\mathrm{old}}
+\sum_Iw_{Ip}(\boldsymbol g_I^{\mathrm{new}}-\boldsymbol g_I^{\mathrm{old}})
$$

> と定める。P2Gで質量0だった節点は粒子から正の重みを受けないため、粒子速度への寄与は0である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg7-picflip -->
**直接例。** 前節の反対速度2粒子について、格子側で何も変更せず $g_{(2,2)}^{\mathrm{new}}=g_{(2,2)}^{\mathrm{old}}=0$ とする。粒子は共にその節点への重み1なので、PICでは両方の速度が0になる。一方FLIPでは増分が0のため、各粒子の速度は $+1,-1$ [m/s] のままである。

**定義の確認**：PICでは新しい格子速度への置換、FLIPでは旧粒子速度への差分加算を実際に行った。格子が捨てた粒子間の速度差をFLIPは保持する。
<!-- definition-example-end -->

実装上は、PICとFLIPの中間を選ぶ係数を設けることが多い。ここでは $\alpha=0$ をPIC、$\alpha=1$ をFLIPとし、係数が増えるほどFLIP寄りになる。

<a id="def-fcg7-mixing"></a>

<!-- formal-statement-start -->
> **定義（PIC/FLIP混合と粒子位置更新）**  
> $0\le\alpha\le1$、$\Delta t>0$ [s] とし、同じ旧粒子の二つの候補速度から

$$
\boldsymbol v_p^{n+1}=(1-\alpha)\boldsymbol v_p^{\mathrm{PIC}}
+\alpha\boldsymbol v_p^{\mathrm{FLIP}}
$$

> を定める。陽的な位置更新と周期境界の折返しは各成分について

$$
\boldsymbol x_p^{n+1}=
\operatorname{frac}\!\left(\boldsymbol x_p^{n}
+\Delta t\,\boldsymbol v_p^{n+1}\right),
\qquad \operatorname{frac}(z)=z-\lfloor z\rfloor
$$

> とする。位置の単位をm、領域の一辺を1 mとして数値的に正規化した式である。$\operatorname{frac}$ は成分ごとに施す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg7-mixing -->
**直接例。** PIC候補 $(0.2,0.1)$、FLIP候補 $(0.6,-0.1)$ [m/s]、$\alpha=1/4$、旧位置 $(0.5,0.5)$ [m]、$\Delta t=0.08$ [s] とする。

$$
\boldsymbol v^{n+1}
=\tfrac34(0.2,0.1)+\tfrac14(0.6,-0.1)
=(0.30,0.05)\ [\mathrm{m/s}].
$$

$$
\boldsymbol x^{n+1}
=(0.5,0.5)+0.08(0.30,0.05)
=(0.524,0.504)\ [\mathrm m].
$$

**定義の確認**：係数の和1、速度の2成分、時間刻みとの積、領域内なので折返し不要であることを確認した。
<!-- definition-example-end -->

## 4. 何が保存され、何が減るのか

粒子を格子へ移し、何も更新せず格子から戻す**純転送**で何が起きるかを先に証明する。これは全時間ステップに外力や境界を加えた場合と混同してはならない。

<a id="prop-fcg7-momentum"></a>

<!-- formal-statement-start -->
> **命題（定数速度の再現と運動量保存）**  
> 有限個の粒子について $m_p>0$、$w_{Ip}\ge0$、$\sum_Iw_{Ip}=1$ とし、[P2G](#def-fcg7-p2g)で旧格子速度を作る。
>
> **（1）** 全粒子の旧速度が同一の定数ベクトル $\boldsymbol c$ なら、純転送PICでも各粒子速度は $\boldsymbol c$ になる。
>
> **（2）** 格子更新がない純転送PICについて、質量重み付き粒子運動量は保存する。

$$
\sum_pm_p\boldsymbol v_p^{\mathrm{PIC}}
=\sum_pm_p\boldsymbol v_p^{\mathrm{old}}.
$$

> **（3）** 任意の新格子速度を用いても、同じ旧位置の重みでPICとFLIPを更新すれば、両方式の総粒子運動量は一致し、その値は $\sum_IM_I\boldsymbol g_I^{\mathrm{new}}$ となる。この値が旧運動量と一致するとは、新格子更新自体が運動量を保存する場合に限る。
<!-- formal-statement-end -->

**証明の見取り図。** 格子への和と粒子への和を交換し、同じ $w_{Ip}$ を二方向に使う。質量0の節点には粒子の正の重みがないので、零除算は起きない。

<!-- proof-start -->
### 証明

（1）各粒子の速度が $\boldsymbol c$ なら、質量が正の節点では

$$
\boldsymbol P_I=\sum_pm_pw_{Ip}\boldsymbol c=M_I\boldsymbol c,
\qquad \boldsymbol g_I^{\mathrm{old}}=\boldsymbol c.
$$

粒子 $p$ が正の重みを与える節点には必ず $M_I\ge m_pw_{Ip}>0$ が成り立つ。したがってその粒子のPIC更新は

$$
\sum_Iw_{Ip}\boldsymbol g_I^{\mathrm{old}}
=\sum_Iw_{Ip}\boldsymbol c=\boldsymbol c
$$

となる。

（2）格子を変更しなければ新格子速度は旧格子速度である。有限和の順序を交換すると

$$
\sum_pm_p\boldsymbol v_p^{\mathrm{PIC}}
=\sum_pm_p\sum_Iw_{Ip}\boldsymbol g_I^{\mathrm{old}}
=\sum_I\left(\sum_pm_pw_{Ip}\right)\boldsymbol g_I^{\mathrm{old}}
=\sum_IM_I\boldsymbol g_I^{\mathrm{old}}.
$$

$M_I>0$ なら $M_I\boldsymbol g_I^{\mathrm{old}}=\boldsymbol P_I$、質量0ならどちらも0である。ゆえに

$$
\sum_IM_I\boldsymbol g_I^{\mathrm{old}}
=\sum_I\sum_pm_pw_{Ip}\boldsymbol v_p^{\mathrm{old}}
=\sum_pm_p\left(\sum_Iw_{Ip}\right)\boldsymbol v_p^{\mathrm{old}}
=\sum_pm_p\boldsymbol v_p^{\mathrm{old}}.
$$

（3）PIC側で上と同じ和の交換を新格子速度に対して行えば、総運動量は $\sum_IM_I\boldsymbol g_I^{\mathrm{new}}$ である。FLIP側では

$$
\sum_pm_p\boldsymbol v_p^{\mathrm{FLIP}}
=\sum_pm_p\boldsymbol v_p^{\mathrm{old}}
+\sum_IM_I(\boldsymbol g_I^{\mathrm{new}}-\boldsymbol g_I^{\mathrm{old}}).
$$

（2）の恒等式 $\sum_pm_p\boldsymbol v_p^{\mathrm{old}}=\sum_IM_I\boldsymbol g_I^{\mathrm{old}}$ を代入すると、右辺は $\sum_IM_I\boldsymbol g_I^{\mathrm{new}}$ となる。したがって新格子更新に運動量の外力効果があれば、その増分は両方式に伝わる。
<!-- proof-end -->

質量と運動量が保存されても、**運動エネルギーまで保存されるとは限らない**。運動量は速度の線形和だが、エネルギーは速度の二乗を含むためである。

<a id="prop-fcg7-energy"></a>

<!-- formal-statement-start -->
> **命題（純転送PICの運動エネルギー非増大）**  
> [定数速度の再現と運動量保存の命題](#prop-fcg7-momentum)と同じ有限個の粒子・重みを考え、格子速度を更新せずP2Gの直後にPICのG2Pを行う。粒子質量を固定してエネルギー

$$
E_{\mathrm{old}}=\frac12\sum_pm_p\|\boldsymbol v_p^{\mathrm{old}}\|^2,\qquad
E_{\mathrm{PIC}}=\frac12\sum_pm_p\|\boldsymbol v_p^{\mathrm{PIC}}\|^2
$$

> を定めれば $E_{\mathrm{PIC}}\le E_{\mathrm{old}}$ である。この結論は外力、格子での速度更新、境界での速度変更が**ない純転送**についてのものである。
<!-- formal-statement-end -->

**証明の見取り図。** 平方ノルムの凸性、すなわち平均速度の二乗は速度の二乗の平均以下であることを、P2GとG2Pの各段階で使う。係数が非負で総和1であることが必要である。

<!-- proof-start -->
### 証明

まず $M_I>0$ の節点について $\lambda_{pI}=m_pw_{Ip}/M_I$ と置くと、$\lambda_{pI}\ge0$ かつ $\sum_p\lambda_{pI}=1$ である。[質量重み付き粒子から格子への転送](#def-fcg7-p2g)から $\boldsymbol g_I^{\mathrm{old}}=\sum_p\lambda_{pI}\boldsymbol v_p^{\mathrm{old}}$。二乗ノルムの凸性で

$$
M_I\|\boldsymbol g_I^{\mathrm{old}}\|^2
\le M_I\sum_p\lambda_{pI}\|\boldsymbol v_p^{\mathrm{old}}\|^2
=\sum_pm_pw_{Ip}\|\boldsymbol v_p^{\mathrm{old}}\|^2.
$$

$M_I=0$ の節点は左辺が0なので同じ不等式を満たす。全節点で足し、粒子ごとに $\sum_Iw_{Ip}=1$ を使うと

$$
\frac12\sum_IM_I\|\boldsymbol g_I^{\mathrm{old}}\|^2
\le\frac12\sum_pm_p\|\boldsymbol v_p^{\mathrm{old}}\|^2=E_{\mathrm{old}}.
$$

次にG2Pの重みも各粒子で非負・総和1なので、

$$
\|\boldsymbol v_p^{\mathrm{PIC}}\|^2
=\left\|\sum_Iw_{Ip}\boldsymbol g_I^{\mathrm{old}}\right\|^2
\le\sum_Iw_{Ip}\|\boldsymbol g_I^{\mathrm{old}}\|^2.
$$

両辺に $m_p/2$ を掛けて粒子について和を取る。$\sum_pm_pw_{Ip}=M_I$ だから

$$
E_{\mathrm{PIC}}
\le\frac12\sum_IM_I\|\boldsymbol g_I^{\mathrm{old}}\|^2
\le E_{\mathrm{old}}.
$$

全ての不等式は**転送による平均化**だけから生じる。したがって主張を得る。
<!-- proof-end -->

上の[直接例の反対速度2粒子](#def-fcg7-p2g)は、質量各1 kgなら旧運動エネルギーが $(1^2+(-1)^2)/2=1$ Jで、PIC後は0 Jとなる。これは「PICはいつでも厳密に散逸する」という主張ではない。同じ速度の粒子では等号になる。また、格子に加速度を与えれば外力でエネルギーは増えることもある。

<a id="prop-fcg7-flip-hold"></a>

<!-- formal-statement-start -->
> **命題（FLIP増分ゼロ時の速度保持）**  
> [PICとFLIPの定義](#def-fcg7-picflip)の仮定で、格子更新が $\boldsymbol g_I^{\mathrm{new}}=\boldsymbol g_I^{\mathrm{old}}$ を全節点で満たすなら、全粒子で $\boldsymbol v_p^{\mathrm{FLIP}}=\boldsymbol v_p^{\mathrm{old}}$ が成り立つ。PICとの混合係数を $\alpha$ とすれば、この場合

$$
\boldsymbol v_p^{n+1}
=(1-\alpha)\boldsymbol v_p^{\mathrm{PIC}}
+\alpha\boldsymbol v_p^{\mathrm{old}}
$$

> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各節点で格子速度の差が零であるから、FLIP更新の補間項は

$$
\sum_Iw_{Ip}(\boldsymbol g_I^{\mathrm{new}}-\boldsymbol g_I^{\mathrm{old}})
=\sum_Iw_{Ip}\boldsymbol0=\boldsymbol0.
$$

よって粒子旧速度はそのまま保たれる。[混合速度の定義](#def-fcg7-mixing)にこの等式を代入して結論を得る。
<!-- proof-end -->

この保持能力は利点でもあり、弱点でもある。格子に表現できない粒子速度の細かい差を残せる反面、不要な高周波の速度差や粒子ノイズも残す。**FLIPのエネルギーがPIC以上という普遍的な不等式はない。** 外力、粒子配置、反復の仕方で変化するので、同じ初期条件で数値値を比較する。

## 5. 粒子が箱の端へ来たとき

周期境界で粒子の $x=0.98$ [m]、右向き速度 $v_x=0.5$ [m/s]、時間刻み $0.08$ [s] なら未補正位置は $1.02$ [m] である。周期境界の新しい位置は $0.02$ [m]。一方、**右端が固体壁**なら $0.02$ への折返しは正しくない。例えば壁位置で粒子を止めて法線速度を零にする方法や、反射させる方法は別の衝突モデルを必要とする。

[FCG6の非貫通境界条件](../FCG6/index.md#def-fcg6-moving-normal)は、流体と固体の法線速度が壁上で一致することを要求した。本章の周期境界には固体壁そのものがないため、その境界条件を満たす「壁付き水槽」だとは解釈できない。自由表面の位置と質量誤差は次のFCG8で扱う。

## 6. JS・GLSLを編集してPIC/FLIPを比較する

<iframe src="simulation/wgl-lab.html?lesson=FCG7" title="FCG7 PIC/FLIPの粒子・格子転送、JavaScriptとGLSL編集、CPU・GPU照合ラボ" loading="lazy" style="width:100%;height:1050px;border:1px solid #64748b;border-radius:7px;" allow="fullscreen"></iframe>

この**3タブラボ**は「実験条件・課題／ソース編集／結果」の順に利用する。実際の時間更新は [particle.js](particle.js)、頂点shaderは [particle.vert](particle.vert)、断片shaderは [particle.frag](particle.frag) にある。初期ソースのままなら、独立に計算するCPU基準値とWebGL2の実画素を照合できる。GLSLだけを編集すれば物理的な粒子速度は変わらず、JSの $0\le\alpha\le1$、減衰率、加速度を変更すればCPU基準との不一致は**教材を壊した証拠ではなく**、基準条件を変更した結果として再解釈する必要がある。

計算の標準設定は $N=8$、16粒子を各1 kg、$\Delta t=0.08$ sである。粒子初期位置は $x=0.24+0.24i,\ y=0.16+0.24j$（$i,j=0,1,2,3$）で、速度には滑らかな成分と格子では平均化されやすい交互符号の摂動を加えている。ラボではPIC群とFLIP群をそれぞれ**独立のP2G→格子更新→G2P→位置更新**で計算するので、最初は同じ粒子配置でも時間が進むと格子上の速度も異なり得る。

格子速度更新は節点ごとに

$$
g_{I,x}^{\mathrm{new}}=0.995\,g_{I,x}^{\mathrm{old}}
+\Delta t\,(0.08)\sin(2\pi(j+1/2)/8),
$$

$$
g_{I,y}^{\mathrm{new}}=0.995\,g_{I,y}^{\mathrm{old}}
-\Delta t\,(0.08)\cos(2\pi(i+1/2)/8)
$$

とする（質量0の節点では旧・新とも零に設定）。ここで0.08の単位は m/s²。これは学習用の**既知加速度と人工的な格子減衰**であってNavier–Stokes方程式の物理的圧力解ではない。PIC/FLIPの運動エネルギーを比べても、第4節の**純転送だけの非増大命題**をこの全更新へそのまま適用してはいけない。

表示は左がPIC粒子位置（水色の円）、中央がFLIP粒子位置（橙色の円）、右がPIC群のP2G後の節点速度の大きさを0.7 m/sで割ってR8テクスチャにした格子値である。円はGLSL内の距離判定で描く**表示記号**であり、物理的な水滴半径ではない。粒子質量、運動量、両群の運動エネルギー、周期境界を越えた粒子数、定数速度の転送誤差はJSと独立CPU診断で確認する。

**試すべき変更。** まずstep0、step1、step8、step24を比較し、PIC群の模様の平滑化、FLIP群の速度差保持、周期境界での座標折返しを観察する。次に [particle.js](particle.js) の混合係数を変えて再実行する。最後に [particle.frag](particle.frag) の背景色または円半径を変え、画素基準との差だけが変わることを確かめる。GLSLに構文エラーを入れた場合はコンパイル失敗を検出できる。

## 7. 演習と詳細解答

### Level A

<a id="ex-fcg7-a1"></a>
**A1. 境界をまたぐ転送重み。** $N=8$、$p=(0.95,0.25)$ とする。4重み、実際の周期節点、非負性、総和1を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [粒子・格子双線形転送重み](#def-fcg7-weights)から $X=8(0.95)=7.6$、$Y=8(0.25)=2$。したがって $i=7,j=2,a=0.6,b=0$ である。

$$
(1-a)(1-b)=0.4,\quad a(1-b)=0.6,\quad
(1-a)b=0,\quad ab=0.
$$

節点は $(7,2),(0,2),(7,3),(0,3)$。どの重みも0以上で、$0.4+0.6+0+0=1$。節点8を切り捨てると重みが0.4しか残らないので、周期境界の規則が必要である。
<!-- solution-end -->

<a id="ex-fcg7-a2"></a>
**A2. P2Gの分母。** 同じ格子節点に質量2 kg・速度 $(1,0)$ [m/s] と質量1 kg・速度 $(-1,0)$ [m/s] の2粒子を置く。節点質量、運動量、速度を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 両方ともその節点への重み1である。[P2G](#def-fcg7-p2g)を用いると節点質量は $M=2+1=3$ kg、運動量は $\boldsymbol P=2(1,0)+1(-1,0)=(1,0)$ [kg m/s]。したがって

$$
\boldsymbol g=\boldsymbol P/M=(1/3,0)\ [\mathrm{m/s}].
$$

速度を単純平均して0とするのは、質量比2:1を無視している。
<!-- solution-end -->

<a id="ex-fcg7-a3"></a>
**A3. 定数速度の検査。** 粒子全員が $(0.2,-0.1)$ [m/s] で動く。P2G後、質量が正の節点の速度と、純転送PICで戻る各粒子速度を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 質量が正の節点では、粒子の全速度が同じなので運動量は $\boldsymbol P_I=M_I(0.2,-0.1)$。従って $\boldsymbol g_I=(0.2,-0.1)$。粒子の重みが正の節点には質量が必ず正なので、[定数速度再現命題](#prop-fcg7-momentum)の証明と同じ式で

$$
\boldsymbol v_p^{\mathrm{PIC}}=\sum_Iw_{Ip}(0.2,-0.1)
=(0.2,-0.1).
$$

質量0の節点に0を代入しても、そこへの粒子重みも0だから結論は変わらない。
<!-- solution-end -->

<a id="ex-fcg7-a4"></a>
**A4. 境界粒子。** 粒子の旧位置は $(0.98,0.40)$ [m]、速度は $(0.5,-0.1)$ [m/s]、$\Delta t=0.08$ [s]。周期境界での新位置を求め、固体壁がある場合との違いを述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** まず折返し前に $x=0.98+0.08(0.5)=1.02$、$y=0.40+0.08(-0.1)=0.392$ [m] を得る。[位置更新の定義](#def-fcg7-mixing)から $x$ 成分だけ小数部を取るので

$$
\boldsymbol x^{n+1}=(1.02-\lfloor1.02\rfloor,\ 0.392-\lfloor0.392\rfloor)
=(0.02,0.392)\ [\mathrm m].
$$

これは対辺を同一視する周期境界での答えである。固体壁が $x=1$ にあるなら対辺へ出現させず、非貫通条件・衝突後の速度・粒子位置の補正を別途決める必要がある。
<!-- solution-end -->

<a id="ex-fcg7-a5"></a>
**A5. 混合係数と位置。** PIC候補 $(0.2,0.1)$、FLIP候補 $(0.6,-0.1)$ [m/s]、$\alpha=0.25$、旧位置 $(0.5,0.5)$ [m]、$\Delta t=0.08$ [s]。速度と位置を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [混合更新](#def-fcg7-mixing)でPIC係数は $1-\alpha=0.75$、FLIP係数は0.25。水平速度は $0.75(0.2)+0.25(0.6)=0.30$、鉛直速度は $0.75(0.1)+0.25(-0.1)=0.05$ [m/s]。

$$
\boldsymbol x^{n+1}=(0.5+0.08\cdot0.30,\ 0.5+0.08\cdot0.05)
=(0.524,0.504)\ [\mathrm m].
$$

両座標は $[0,1)$ に入るので今回の折返しは不要である。
<!-- solution-end -->

### Level B

<a id="ex-fcg7-b1"></a>
**B1. 質量の違いとPICの散逸。** 同じ節点に質量2 kg、速度 $+1$ [m/s] の粒子と質量1 kg、速度 $-1$ [m/s] の粒子がある。格子更新をせずにPICで戻すとき、総運動量と運動エネルギーの前後を求め、保存と散逸を区別せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** 旧総運動量は $2(1)+1(-1)=1$ [kg m/s]。P2Gで節点質量は3 kg、運動量は1 [kg m/s] だから節点速度は $1/3$ [m/s]。[PIC更新](#def-fcg7-picflip)後の粒子速度はいずれも $1/3$ となる。新運動量は

$$
2\cdot\frac13+1\cdot\frac13=1\ [\mathrm{kg\,m/s}]
$$

で旧値と等しく、[運動量保存命題](#prop-fcg7-momentum)に合う。一方エネルギーは

$$
E_{\mathrm{old}}=\frac12(2\cdot1^2+1\cdot(-1)^2)=\frac32\ \mathrm J,
$$

$$
E_{\mathrm{PIC}}=\frac12\left(2\cdot\frac19+1\cdot\frac19\right)
=\frac16\ \mathrm J.
$$

差は $3/2-1/6=4/3$ Jで、平均化により減っている。運動量の線形和が保たれることは、二乗の和の保存を意味しない。
<!-- solution-end -->

<a id="ex-fcg7-b2"></a>
**B2. 不等式を二回使う理由。** 質量 $m_p>0$、重み $w_{Ip}\ge0$、$\sum_Iw_{Ip}=1$ の下で、純転送PICの運動エネルギーが増えないことを、P2GとG2Pの二段階に分けて証明せよ。仮定を落とすと何が壊れるかも述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [質量重み付き粒子から格子への転送](#def-fcg7-p2g)で質量が正の節点 $I$ では $\lambda_{pI}=m_pw_{Ip}/M_I$ が非負で和1だから、二乗ノルムの凸性を適用して

$$
M_I\|\boldsymbol g_I\|^2
=M_I\left\|\sum_p\lambda_{pI}\boldsymbol v_p\right\|^2
\le\sum_pm_pw_{Ip}\|\boldsymbol v_p\|^2.
$$

節点を総和すると、右辺は $\sum_pm_p(\sum_Iw_{Ip})\|\boldsymbol v_p\|^2=\sum_pm_p\|\boldsymbol v_p\|^2$ である。次に粒子 $p$ に対するG2Pでも同じ凸性から

$$
m_p\|\boldsymbol v_p^{\mathrm{PIC}}\|^2
\le m_p\sum_Iw_{Ip}\|\boldsymbol g_I\|^2.
$$

粒子を総和して右辺の和を交換すれば $\sum_IM_I\|\boldsymbol g_I\|^2$ になる。二式を連結して1/2を掛ければ[エネルギー命題](#prop-fcg7-energy)の結論となる。

負の重みがあれば非負重みによる平均でなくなり、平均の二乗に関する不等式を適用できない。重み和が1でなければ、右辺を元のエネルギーへ戻す最後の等式と定数速度再現が失われる。格子更新があればこの証明の中間の「旧格子速度のまま戻す」部分が成立しない。
<!-- solution-end -->

<a id="ex-fcg7-b3"></a>
**B3. FLIPの差分と混合。** ある粒子の旧速度が水平方向に $0.5$ [m/s]、参照節点2個への重みが $0.25,0.75$、旧格子速度が $0.2,0.4$、新格子速度が $0.3,0.2$ [m/s] である。PICとFLIP候補、$\alpha=0.6$ の混合速度を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [PIC/FLIPの定義](#def-fcg7-picflip)で新速度をそのまま補間すると

$$
v^{\mathrm{PIC}}=0.25(0.3)+0.75(0.2)=0.075+0.15=0.225.
$$

旧新差分は第1節点 $0.3-0.2=+0.1$、第2節点 $0.2-0.4=-0.2$。従って

$$
v^{\mathrm{FLIP}}=0.5+0.25(0.1)+0.75(-0.2)
=0.5+0.025-0.15=0.375.
$$

[混合定義](#def-fcg7-mixing)のPIC側係数は0.4なので

$$
v^{n+1}=0.4(0.225)+0.6(0.375)=0.09+0.225=0.315\ [\mathrm{m/s}].
$$

新格子速度の補間値0.225と、格子増分の補間値 $-0.125$ は別の量であり、両方式を同じ更新式として扱えない。
<!-- solution-end -->

<a id="ex-fcg7-b4"></a>
**B4. 物理エネルギーと画素を混同しない。** 格子速度の大きさが $0.35$ [m/s] の節点を $|\boldsymbol g|/0.7$ でR8に符号化し、GLSLで $(v,0.2,1-v,1)$ として表示する。最近接整数丸めのRGBA8を求めよ。またshaderの緑成分0.2を0.4に変えたとき、PIC/FLIPの粒子エネルギーは変わるか。

- Level: B

<!-- solution-start -->
**詳細解答。** 物理速度から表示用の無次元値を作ると $0.35/0.7=0.5$。R8テクスチャへ入る整数は $\operatorname{round}(255\cdot0.5)=128$。GLSLが読み取る正規化値は $v=128/255$ なので、

$$
R=128,\quad G=\operatorname{round}(255\cdot0.2)=51,\quad
B=\operatorname{round}(255(1-128/255))=127,\quad A=255.
$$

従って $(R,G,B,A)=(128,51,127,255)$。GLSLだけで緑成分を0.4にすると $G=\operatorname{round}(102)=102$ に変わる。しかし粒子エネルギーはJSで計算した $\tfrac12\sum_pm_p\|\boldsymbol v_p\|^2$ で、shaderの色を参照しない。よって物理速度もエネルギーも同じである。GPU画素の一致判定は色表示の検査であり、物理の保存則の証明ではない。
<!-- solution-end -->

### Level C

<a id="ex-fcg7-c1"></a>
**C1. P2G・PIC/FLIP・混合・境界まで通す。** 1次元の周期格子の二節点A,Bだけに寄与する2粒子を考え、各質量を1 kg、粒子1の重みを $(1/4,3/4)$、粒子2の重みを $(3/4,1/4)$、旧速度を $v_1=+1,\ v_2=-1$ [m/s] とする。格子更新はせず、位置更新にのみ $\Delta t=0.08$ [s] を使う。以下を行え。

1. 節点質量と格子速度をP2Gで求める。
2. PIC、FLIP、$\alpha=0.4$ の混合で二粒子の新速度を求める。
3. 旧・PIC後・FLIP後・混合後の総運動量と運動エネルギーを比較する。
4. もし混合後速度が $+0.55$ の粒子1の旧位置が $x_1=0.98$ [m] なら、周期境界での新位置を求める。
5. この計算から、現実の水槽における壁の非貫通や自由表面の保存を結論できるか述べよ。

- Level: C

<!-- solution-start -->
**詳細解答。** （1）[P2G](#def-fcg7-p2g)では各節点に2粒子の質量を重み付けして集める。節点Aの質量・運動量は

$$
M_A=1\cdot\tfrac14+1\cdot\tfrac34=1,\qquad
P_A=\tfrac14(1)+\tfrac34(-1)=-\tfrac12.
$$

節点Bは

$$
M_B=\tfrac34+\tfrac14=1,\qquad
P_B=\tfrac34(1)+\tfrac14(-1)=\tfrac12.
$$

従って格子速度は $g_A=-1/2,g_B=1/2$ [m/s] である。全質量2 kg、全運動量0が節点の合計からも分かる。

（2）[PICとFLIPの粒子速度更新](#def-fcg7-picflip)から

$$
v_1^{\mathrm{PIC}}=\tfrac14(-\tfrac12)+\tfrac34(\tfrac12)
=-\tfrac18+\tfrac38=\tfrac14,
$$

$$
v_2^{\mathrm{PIC}}=\tfrac34(-\tfrac12)+\tfrac14(\tfrac12)
=-\tfrac38+\tfrac18=-\tfrac14.
$$

格子更新なしなので全節点の速度増分は0。[FLIP増分ゼロ時の速度保持](#prop-fcg7-flip-hold)から $(v_1^{\mathrm{FLIP}},v_2^{\mathrm{FLIP}})=(1,-1)$。[混合式](#def-fcg7-mixing)へ $\alpha=0.4$ を代入すると

$$
v_1^{n+1}=0.6(\tfrac14)+0.4(1)=0.15+0.4=0.55,
$$

$$
v_2^{n+1}=0.6(-\tfrac14)+0.4(-1)=-0.15-0.4=-0.55.
$$

（3）旧運動量は $1+(-1)=0$。PIC後は $1/4-1/4=0$、FLIP後は $1-1=0$、混合後も $0.55-0.55=0$ [kg m/s] である。[運動量の命題](#prop-fcg7-momentum)と一致する。

各質量が1 kgなのでエネルギーは速度二乗和の半分であり、

$$
E_{\mathrm{old}}=\tfrac12(1^2+(-1)^2)=1\ \mathrm J,
$$

$$
E_{\mathrm{PIC}}=\tfrac12((\tfrac14)^2+(-\tfrac14)^2)
=\tfrac1{16}=0.0625\ \mathrm J,
$$

$$
E_{\mathrm{FLIP}}=1\ \mathrm J,\qquad
E_{\alpha=0.4}=\tfrac12(0.55^2+(-0.55)^2)=0.3025\ \mathrm J.
$$

純転送PICの非増大とFLIPの旧速度保持が具体的に確認できる。

（4）[周期位置更新](#def-fcg7-mixing)の未補正位置は $0.98+0.08(0.55)=1.024$。小数部を取って $x_1^{n+1}=0.024$ [m] となる。これは右端の壁に反射したのではない。

（5）答えは**否**。この設定は1次元の転送だけを取り出し、対辺を同一視する周期境界を採った。実際の壁を持つ水槽なら[非貫通境界条件](../FCG6/index.md#def-fcg6-moving-normal)を別に課す必要がある。さらにこの実験では圧力Poisson方程式、流体密度場、自由表面、粒子再配置による体積保存を検証していない。運動量とエネルギーに関する有限和の等式を、連続的な水の質量保存や実測の飛沫形状の保証へ置き換えてはならない。
<!-- solution-end -->

## 8. 次の講義

FCG7では、**格子で速度を計算する利点と、粒子の運動情報を保持する利点**がどこで衝突するかを式と実行コードで確認した。次のFCG8「動く自由表面をどう追跡するか」では、液体領域そのものの輪郭をLevel Setなどで追い、面積誤差と粒子追跡との差を検査する。
