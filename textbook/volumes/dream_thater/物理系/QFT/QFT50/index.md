# QFT50 二次元の正則共形変換・複素応力テンソルと局所Ward恒等式

<!-- definition-example-audit: strict -->

[QFT49の共形保存流](../QFT49/index.md#thm-qft49-conformal-current)では、共形Killingベクトル場から保存流を作りました。ところが二次元では、共形Killing方程式の局所解が有限個のパラメータでは尽くせません。局所的な正則関数がそのまま変換を与えるためです。今回はこの特別な事情を**複素微分 → 正則ベクトル場 → 応力テンソル → 挿入点のWard恒等式**の順に追います。

舞台は向きを固定した平坦Euclid平面の開集合 $U\subset\mathbb R^2$ です。$d=2$ のEuclid計量は $dx^2+dy^2$ とし、実時間の符号規約 $(-,+,+,+)$ をそのまま用いません。複素解析の正則性・[Cauchy積分公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-integral-formula)は既習とします。相関関数では挿入点の重なりを避け、必要ならUV正則化した合成場を用います。

## 1. 二つの実座標を一つの複素座標にする

実座標 $x,y$ の組を $z=x+iy$ と書くと、正則関数の微分がそのまま局所的な回転と拡大縮小を表します。ただし $\bar z=x-iy$ は $z$ と独立な複素変数ではありません。実微分を整理するため、$z,\bar z$ について形式的に偏微分する記法を導入します。

<a id="def-qft50-wirtinger"></a>

<!-- formal-statement-start -->
> **定義（二次元の複素座標とWirtinger微分）**  
> $U\subset\mathbb R^2$ を開集合とし、$C^1$ 複素値関数 $F(x,y)$ に対して

$$
z=x+iy,\quad \bar z=x-iy,\qquad
\partial_z=\frac12(\partial_x-i\partial_y),\quad
\partial_{\bar z}=\frac12(\partial_x+i\partial_y)
$$

> と置く。$F$ が正則であることは $\partial_{\bar z}F=0$ と同値である。これは $F$ の実部・虚部に対するCauchy–Riemann条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft50-wirtinger -->
**定義の確認** $F=z^2=x^2-y^2+2ixy$ では $\partial_xF=2x+2iy$、$\partial_yF=-2y+2ix$ です。従って $\partial_{\bar z}F=\tfrac12[(2x+2iy)+i(-2y+2ix)]=0$、$\partial_zF=2z$。他方 $F=\bar z$ では $\partial_{\bar z}F=1$ であり、正則ではありません。
<!-- definition-example-end -->

微分演算子を逆に解くと $\partial_x=\partial_z+\partial_{\bar z}$、$\partial_y=i(\partial_z-\partial_{\bar z})$ なので、互いに可換な二階微分について

$$
\partial_x^2+\partial_y^2=4\partial_z\partial_{\bar z}.
$$

また $dz=dx+i\,dy$、$d\bar z=dx-i\,dy$ から

$$
ds^2=dx^2+dy^2=dz\,d\bar z,\qquad
dx\wedge dy=\frac i2\,dz\wedge d\bar z.
$$

最後の式は $dz\wedge d\bar z=-2i\,dx\wedge dy$ を展開したものです。これは面積の向きの式であり、$dz\,d\bar z$ という計量の対称積とは区別します。

## 2. 二次元では共形Killing方程式が正則性になる

[QFT48の共形写像](../QFT48/index.md#def-qft48-conformal-map)はJacobianが局所的な尺度倍と直交変換に分かれる写像でした。二次元で向きを保つ場合、正則関数の複素微分がまさにこの分解を担います。

<a id="def-qft50-local-conformal"></a>

<!-- formal-statement-start -->
> **定義（局所正則共形変換）**  
> 開集合 $U\subset\mathbb C$ の点 $z_0$ の近傍で正則な関数 $f$ を考える。条件

$$
f'(z_0)\ne0
$$

> を満たすとき、$w=f(z)$ をその点での向きを保つ局所正則共形変換という。局所尺度因子は

$$
\Omega(z)=|f'(z)|
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft50-local-conformal -->
**定義の確認** $f(z)=z^2$ では $f'=2z$。$z_0\ne0$ の小さい近傍で局所逆写像があり、$|dw|^2=4|z|^2|dz|^2$ だから $\Omega=2|z|$ です。しかし原点では $f'=0$ でJacobianの階数が落ちるので、**原点を含む局所共形座標変換ではありません**。
<!-- definition-example-end -->

実Jacobianを直接書くと、$f=u+iv$ の正則性により

$$
Df=\begin{pmatrix}u_x&u_y\\v_x&v_y\end{pmatrix}
=\begin{pmatrix}a&-b\\b&a\end{pmatrix},
\quad a=u_x=v_y,\quad b=v_x=-u_y.
$$

従って $(Df)^{\mathsf T}Df=(a^2+b^2)I_2$、$\det Df=a^2+b^2=|f'|^2>0$。これが正定値計量に対する定義の全条件と対応します。反正則な $f(\bar z)$ は向きを反転する別の場合です。

次に無限小変換を見ます。$v=u(x,y)\partial_x+v_2(x,y)\partial_y$ を実ベクトル場とし、前章の[共形Killing方程式](../QFT49/index.md#def-qft49-conformal-killing)を二次元へ書き下します。前章の自由場の改良定理は $d\ge3$ のものでしたが、方程式自体は二次元でも定義できます。

<a id="prop-qft50-cr-killing"></a>

<!-- formal-statement-start -->
> **命題（共形Killing条件とCauchy–Riemann条件）**  
> $U\subset\mathbb R^2$ で $u,v_2$ が $C^1$ のとき、$v=u\partial_x+v_2\partial_y$ が

$$
\partial_\mu v_\nu+\partial_\nu v_\mu
=(\partial_\rho v_\rho)\delta_{\mu\nu}
$$

> を満たすことと、複素関数 $\epsilon(z)=u(x,y)+iv_2(x,y)$ が正則であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

対角二成分が実部・虚部の対応する微分を等しくし、非対角一成分が残るCauchy–Riemann条件を与えます。

<!-- proof-start -->
### 証明

$(\mu,\nu)=(x,x)$ の式は $2u_x=u_x+(v_2)_y$、$(y,y)$ は $2(v_2)_y=u_x+(v_2)_y$、$(x,y)$ は $(v_2)_x+u_y=0$ です。従って

$$
u_x=(v_2)_y,\qquad u_y=-(v_2)_x.
$$

これは $\partial_{\bar z}(u+iv_2)=0$ を実部と虚部に分けた二式そのものです。逆方向にはこの二式を三成分へ代入すれば全成分の共形Killing方程式が成立します。
<!-- proof-end -->

例えば $\epsilon=z^2$ は $(u,v_2)=(x^2-y^2,2xy)$ を与え、$u_x=2x=(v_2)_y$、$u_y=-2y=-(v_2)_x$。局所的な正則 $\epsilon$ が無限にあるため、二次元の局所共形変換は有限次元の群に収まりません。ただし **局所**と**大域**を混同してはいけません。$z^2$ は原点で可逆でなく、$1/z$ は平面の原点で定義できません。全平面上での可逆な正則座標変換と、穿孔領域だけの無限小変換は異なる集合です。

この豊富な局所変換を計算するため、穿孔平面上の正則ベクトル場の基底を使います。

<a id="prop-qft50-witt"></a>

<!-- formal-statement-start -->
> **命題（正則ベクトル場のWitt括弧）**  
> 穿孔平面 $\mathbb C^\times$ 上で $n\in\mathbb Z$ とし、複素化したベクトル場 $\ell_n=-z^{n+1}\partial_z$ を置く。ベクトル場の交換子は

$$
[\ell_m,\ell_n]=(m-n)\ell_{m+n}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

交換子を試験関数へ二度作用させ、二階微分項を相殺します。

<!-- proof-start -->
### 証明

任意の $C^2$ 関数 $F$ に対して

$$
\begin{aligned}
\ell_m\ell_nF
&=z^{m+1}\partial_z(z^{n+1}\partial_zF)\\
&=(n+1)z^{m+n+1}\partial_zF+z^{m+n+2}\partial_z^2F,\\
\ell_n\ell_mF
&=(m+1)z^{m+n+1}\partial_zF+z^{m+n+2}\partial_z^2F.
\end{aligned}
$$

差は $(n-m)z^{m+n+1}\partial_zF=(m-n)\ell_{m+n}F$ です。これは**古典的なベクトル場のLie代数**であり、量子の中心項を含むVirasoro代数との同一視はしません。
<!-- proof-end -->

## 3. 保存とトレース零から正則カレントが生まれる

二次元自由実boson $\phi$ の古典Euclid作用を、正の定数 $g$ について

$$
S_E[\phi]=\frac{g}{4\pi}\int_U
\bigl((\partial_x\phi)^2+(\partial_y\phi)^2\bigr)\,dx\,dy
$$

とします。コンパクト台変分で $\Delta\phi=0$ を得ます。$d=2$ では前章の $d\ge3$ の改良係数の議論を流用せず、応力テンソルをこの作用から作り直します。

<a id="def-qft50-complex-stress"></a>

<!-- formal-statement-start -->
> **定義（複素応力テンソルと正則カレント）**  
> $U\subset\mathbb R^2$、$g>0$、$C^3$ 実場 $\phi$ に対して、作用 $S_E$ の対称な古典応力テンソルを

$$
\tau_{\mu\nu}=\frac{g}{2\pi}\partial_\mu\phi\partial_\nu\phi
-\delta_{\mu\nu}\frac{g}{4\pi}|\nabla\phi|^2
$$

> とし、その複素成分を

$$
\tau_{zz}=\frac14(\tau_{xx}-\tau_{yy}-2i\tau_{xy}),
\quad
\tau_{z\bar z}=\frac14(\tau_{xx}+\tau_{yy}),
\quad
\tau_{\bar z\bar z}=\overline{\tau_{zz}}
$$

> と置く。正則側の規格化されたカレントを $t(z)=-2\pi\tau_{zz}$、反正則側を $\bar t(\bar z)=-2\pi\tau_{\bar z\bar z}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft50-complex-stress -->
**定義の確認** $\phi=ax$ とすると $\tau_{xx}=ga^2/(4\pi)$、$\tau_{yy}=-ga^2/(4\pi)$、$\tau_{xy}=0$。従って $\tau_{z\bar z}=0$、$\tau_{zz}=ga^2/(8\pi)$、$t=-ga^2/4$。一方 $\partial_z\phi=a/2$ なので $-g(\partial_z\phi)^2=-ga^2/4$ と一致します。$\Delta\phi=0$ も満たし、非定数の場でも正則側が定数になる例です。
<!-- definition-example-end -->

<a id="thm-qft50-holomorphic-stress"></a>

<!-- formal-statement-start -->
> **定理（二次元自由場応力テンソルの正則性）**  
> 上記の $U,g,\phi$ で $\Delta\phi=0$ とする。このとき

$$
\tau_{z\bar z}=0,\qquad
t(z)=-g(\partial_z\phi)^2,\qquad
\partial_{\bar z}t=0
$$

> が成り立つ。複素共役の $\bar t$ は $\partial_z\bar t=0$ を満たす。これは古典場の局所結論であり、量子の接触項や合成場の特異性まで消す主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二次元だけでトレースが零になることを成分から確認し、保存方程式を複素座標へ変換します。自由場では直接微分して同じことを検算できます。

<!-- proof-start -->
### 証明

定義から $\tau_{xx}+\tau_{yy}=0$ です。また

$$
\begin{aligned}
\tau_{zz}
&=\frac14\left[
\frac{g}{2\pi}(\phi_x^2-\phi_y^2)
-2i\frac{g}{2\pi}\phi_x\phi_y\right]\\
&=\frac{g}{8\pi}(\phi_x-i\phi_y)^2
=\frac{g}{2\pi}(\partial_z\phi)^2,
\end{aligned}
$$

よって $t=-g(\partial_z\phi)^2$。場の方程式は $4\partial_z\partial_{\bar z}\phi=0$ ですから

$$
\partial_{\bar z}t
=-2g(\partial_z\phi)(\partial_{\bar z}\partial_z\phi)=0.
$$

応力テンソルの保存も直接確かめると $\partial_\mu\tau_{\mu\nu}=(g/2\pi)(\Delta\phi)\partial_\nu\phi=0$ です。これを複素成分へ変換すれば $\partial_{\bar z}\tau_{zz}+\partial_z\tau_{z\bar z}=0$ となり、トレース零の $\tau_{z\bar z}=0$ と組み合わせても同じ結論を得ます。
<!-- proof-end -->

量子場では裸の $\phi(x)$ は分布で、$t$ の平方は正規順序や点分離などで定義し直す必要があります。また二次元質量零自由bosonの**場そのもの**は平面全体で赤外零モードを持ち、真空二点関数を単純な一次場として扱えません。微分場や電荷中性の演算子では定義できる量があり、接触項の外での正則性と挿入点での特異性を分けて扱います。

## 4. 一次場のウェイトを正則と反正則に分ける

[QFT48のスカラー一次場](../QFT48/index.md#def-qft48-scalar-primary)では次元 $\Delta$ を使いました。二次元では局所座標変換 $w=f(z)$ の正則・反正則微分が別々に働くため、二つの指数を持つ場が自然です。以下では局所的に非零の $f'$ のべきの枝を選ぶものとします。

<a id="def-qft50-weights"></a>

<!-- formal-statement-start -->
> **定義（二次元一次場の共形ウェイト）**  
> 二次元Euclid理論の局所場 $\mathcal O(z,\bar z)$ が、許された局所正則座標変換 $f$ のもとで

$$
\mathcal U_f\mathcal O(z,\bar z)
=f'(z)^h\,\overline{f'(z)}^{\,\bar h}
\mathcal O(f(z),\overline{f(z)})
$$

> と変換するとき、$(h,\bar h)$ を共形ウェイトとする。$h,\bar h$ は定めた場の表現に適合する数で、尺度次元は $\Delta=h+\bar h$、回転スピンは $s=h-\bar h$ とする。$\mathcal U_f$ はここでは場の座標輸送の作用であり、すべての局所正則写像が固定した量子状態の大域的対称性であると仮定するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft50-weights -->
**定義の確認** 古典スカラー $\phi$ の座標輸送を $\phi(f(z),\overline{f(z)})$ とすれば $(h,\bar h)=(0,0)$ です。その $z$ 方向の微分 $J=\partial_z\phi$ には連鎖律から $\partial_z\phi(f(z),\overline{f(z)})=f'(z)(\partial_w\phi)(w,\bar w)$ が働くので、微分場 $J$ は $(1,0)$ の変換則を持ちます。$\bar J=\partial_{\bar z}\phi$ は $(0,1)$。したがって $J$ の $\Delta=1,s=1$ も直接確かめられます。零モードのため $\phi$ 自体を量子的一次場と断定するものではありません。
<!-- definition-example-end -->

小さい正則 $\epsilon$ に対する $f(z)=z+\eta\epsilon(z)+O(\eta^2)$ を考え、$\eta$ で微分すると

$$
\mathcal D_\epsilon\mathcal O
=\left.\frac{d}{d\eta}\mathcal U_f\mathcal O\right|_{\eta=0}
=\epsilon\partial_z\mathcal O+h(\partial_z\epsilon)\mathcal O.
$$

これは正則側の式で、反正則側には $\bar\epsilon\partial_{\bar z}+\bar h\,\partial_{\bar z}\bar\epsilon$ を足します。有限変換の二つの因子を展開してから一次の係数を取ったため、$h\epsilon'$ の項がどこから来たかも明確です。

## 5. 輪郭積分が局所Ward恒等式を読む

保存したカレントは、挿入点を避ければ正則です。従って小円上の積分は、円内にある挿入点での特異項だけを読み取ります。これが二次元で局所Ward恒等式を複素解析の計算へ変える理由です。

<a id="def-qft50-contour-charge"></a>

<!-- formal-statement-start -->
> **定義（共形輪郭電荷）**  
> 正則カレント $t(z)$ が閉曲線 $\gamma$ の近傍で、指定した挿入点以外では正則であるとする。正則な試験ベクトル場係数 $\epsilon(z)$ に対して

$$
Q_\epsilon(\gamma)
=\frac{1}{2\pi i}\oint_\gamma\epsilon(z)t(z)\,dz
$$

> を正則側の共形輪郭電荷という。曲線は反時計回りとし、挿入点を横切る変形は許さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft50-contour-charge -->
**定義の確認** $t(z)=a/(z-w)^2+b/(z-w)$、$\epsilon(z)=1+(z-w)c$ とし、$\gamma$ を $w$ の小円にすると、積は $a/(z-w)^2+(ac+b)/(z-w)+bc$。よって[Cauchy積分公式とその微分版](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)により $Q_\epsilon=ac+b$。二重極は $\epsilon'$、単純極は $\epsilon$ を測ります。
<!-- definition-example-end -->

量子論の局所相関関数 $G=\langle\prod_{j=1}^N\mathcal O_j(w_j,\bar w_j)\rangle$ について、挿入点は相異なり、各 $\mathcal O_j$ は正則ウェイト $h_j$ の一次場であるとします。さらに[QFT49の局所並進Ward恒等式](../QFT49/index.md#thm-qft49-translation-ward)に相当する正則化済みの局所Ward恒等式が成立し、他に異常な接触項がないと仮定します。この仮定は単なる古典的保存からは出ません。

<a id="thm-qft50-primary-ward"></a>

<!-- formal-statement-start -->
> **定理（一次場の局所共形Ward核）**  
> 上記の正則化・一次場・局所Ward恒等式の仮定のもと、$z$ が挿入点 $w_j$ に近づくとき、$t$ を挿入した相関関数の特異部分は

$$
\left\langle t(z)\prod_{k=1}^N\mathcal O_k\right\rangle_{\rm sing}
=\sum_{j=1}^N\left[
\frac{h_jG}{(z-w_j)^2}
+\frac{\partial_{w_j}G}{z-w_j}
\right].
$$

> 各点の近くの正則な剰余はこの式に含めない。小円 $\gamma_j$ による電荷作用は

$$
\frac{1}{2\pi i}\oint_{\gamma_j}\epsilon(z)
\left\langle t(z)\prod_k\mathcal O_k\right\rangle dz
=\bigl(\epsilon(w_j)\partial_{w_j}
+h_j\epsilon'(w_j)\bigr)G.
$$

> 分布としては $\partial_{\bar z}(z-w)^{-1}=\pi\delta^{(2)}(z-w)$、$\partial_{\bar z}(z-w)^{-2}=-\pi\partial_z\delta^{(2)}(z-w)$ に対応する。二重極は通常の局所可積分関数でなく、$-(\partial_z 1/(z-w))$ として定める分布である。
<!-- formal-statement-end -->

### 証明の見取り図

一次場の微小座標輸送は $\epsilon\partial+h\epsilon'$ です。$1/(z-w)$ と $1/(z-w)^2$ は[Cauchy公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-integral-formula)でちょうどその二つを生み、複素微分の分布等式を使うと同じ事実が接触項になります。

<!-- proof-start -->
### 証明

まず挿入点 $w_j$ を固定し、その近くの二重極と単純極を

$$
\frac{A_j}{(z-w_j)^2}+\frac{B_j}{z-w_j}
$$

と置きます。[Cauchyの高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)による輪郭積分は

$$
A_j\epsilon'(w_j)+B_j\epsilon(w_j)
$$

です。一方、[一次場の変換則](#def-qft50-weights)を微小パラメータで微分すると、挿入点 $j$ の変化は

$$
\bigl(h_j\epsilon'(w_j)+\epsilon(w_j)\partial_{w_j}\bigr)G
$$

となります。局所Ward恒等式がこの輪郭電荷を実装する仮定の下、任意の $\epsilon$ の値と一階微分の係数を比較して

$$
A_j=h_jG,\qquad B_j=\partial_{w_j}G
$$

が決まります。

次に分布等式を滑らかなコンパクト台の試験関数 $\psi$ で検算します。円板から半径 $\rho$ の小円を除き、$\partial_{\bar z}(1/(z-w))=0$ を部分積分します。内周を反時計回りの小円へ向き直した境界積分は、$\rho\to0$ でCauchy積分の $2\pi i\,\psi(w)$ へ収束します。複素Green公式の面積と境界の係数は $\int_D\partial_{\bar z}F\,dx\,dy=(2i)^{-1}\oint_{\partial D}F\,dz$ なので、$2\pi i/(2i)=\pi$ から

$$
\partial_{\bar z}\frac1{z-w}=\pi\delta^{(2)}(z-w).
$$

さらに $1/(z-w)^2=-\partial_z[1/(z-w)]$ と分布微分の交換から

$$
\partial_{\bar z}\frac1{(z-w)^2}
=-\pi\partial_z\delta^{(2)}(z-w).
$$

従って $t$ を挿入した相関関数の $\partial_{\bar z}$ は、挿入点で

$$
\pi\sum_j\left[
(\partial_{w_j}G)\delta^{(2)}(z-w_j)
-h_jG\,\partial_z\delta^{(2)}(z-w_j)\right]
$$

という接触分布を持ちます。$\epsilon$ は一般にはコンパクト台でないので、各 $w_j$ の近傍で1となる滑らかなカットオフ $\chi_j$ を掛けて $\chi_j\epsilon$ を試験関数にします。接触分布の支持は $w_j$ だけなので、$-\langle\partial_z\delta,\chi_j\epsilon\rangle=\epsilon'(w_j)$ から先の輪郭積分と同じ式になります。挿入点以外で $\partial_{\bar z}t=0$ であることと、挿入点で接触項があることは矛盾しません。
<!-- proof-end -->

この特異部分は $t(z)\mathcal O(w)$ の短距離展開の入口ですが、**$t(z)t(w)$ の中心項や正規順序の量子補正**までは導いていません。次の講義で自由bosonの収縮から検算します。

<a id="prop-qft50-two-point"></a>

<!-- formal-statement-start -->
> **命題（一次場二点関数のWard検算）**  
> 等しい正則ウェイト $h$ を持つ二つの一次場について、相異なる $u,v$ で正則側の二点因子が $G(u,v)=C(u-v)^{-2h}$ とする。この $G$ に[局所共形Ward核](#thm-qft50-primary-ward)を作用させると

$$
\sum_{w=u,v}\left[
\frac{hG}{(z-w)^2}
+\frac{\partial_wG}{z-w}\right]
=\frac{h(u-v)^2G}{(z-u)^2(z-v)^2}.
$$

> 反正則側の因子がある場合も、$\partial_u,\partial_v$ はそれを固定して計算する。
<!-- formal-statement-end -->

### 証明の見取り図

両挿入点の一次極を合計すると二次極の混合項を打ち消すので、式は左右の挿入点に対称な形になります。

<!-- proof-start -->
### 証明

枝を固定した領域で $\partial_uG=-2hG/(u-v)$、$\partial_vG=2hG/(u-v)$。$A=z-u$、$B=z-v$ とすると左辺を $hG$ で割ったものは

$$
\frac1{A^2}+\frac1{B^2}
-\frac2{u-v}\left(\frac1A-\frac1B\right).
$$

$B-A=u-v$ だから $\frac1A-\frac1B=(u-v)/(AB)$。従って

$$
\frac{A^2+B^2-2AB}{A^2B^2}
=\frac{(A-B)^2}{A^2B^2}
=\frac{(u-v)^2}{A^2B^2}.
$$

これは全体並進・拡大縮小に対する二点相関の制約とも整合します。$h=0$ なら右辺は零です。
<!-- proof-end -->

## 6. どこまで計算できたか

- 二次元の局所共形Killing場は正則関数で記述できるが、全平面で一価の逆写像を持つ変換とは別です。
- $d=2$ の古典質量零自由場の応力テンソルはトレース零で、保存則から $t(z)$ が正則になります。量子の同一点積には正則化が必要です。
- 一次場の二つのウェイトからWard核の二重極・単純極が決まり、試験関数・輪郭積分・接触項の三つの表示が一致します。
- $t(z)t(w)$ の量子中心項、Virasoro表現、自由bosonの零モードの完全な構成は、ここで証明した範囲を越えます。

## 演習：局所共形変換から相関関数の極を読む

### 演習 QFT50-A1：複素座標の微分

- Level: A
- 問題: $F=z^3+2\bar z$ について $\partial_zF,\partial_{\bar z}F,\Delta F$ を求め、正則性を判定せよ。また $dx\wedge dy=(i/2)dz\wedge d\bar z$ を直接展開せよ。

**詳細解答**：$\partial_z z=1,\partial_z\bar z=0$ とその共役から $\partial_zF=3z^2$、$\partial_{\bar z}F=2$。従って $F$ は正則でない。$\Delta F=4\partial_z\partial_{\bar z}F=4\partial_z2=0$ なので、調和であることは正則であることを意味しない。反対称な微分形式の積では $dx\wedge dx=dy\wedge dy=0$、$dy\wedge dx=-dx\wedge dy$ だから、$(dx+i\,dy)\wedge(dx-i\,dy)=-i\,dx\wedge dy+i\,dy\wedge dx=-2i\,dx\wedge dy$ となり、指定式を得る。

### 演習 QFT50-A2：局所尺度因子と退化点

- Level: A
- 問題: $f(z)=z^2+1$ の局所尺度因子と実Jacobian行列式を求め、どの点で局所正則共形座標変換でなくなるか説明せよ。

**詳細解答**：$f'=2z$ だから $\Omega=2|z|$。$f=(x^2-y^2+1)+i(2xy)$ のJacobianは

$$
\begin{pmatrix}2x&-2y\\2y&2x\end{pmatrix},
\qquad \det Df=4(x^2+y^2)=|f'|^2.
$$

$z=0$ では行列式零で逆写像定理の条件を欠き、尺度因子も零になる。$z\ne0$ なら行列式正で、各点の十分小さい近傍に局所逆写像がある。異なる点 $z,-z$ が同じ値へ写るため、全平面で単射という結論は出ない。

### 演習 QFT50-A3：正則ベクトル場の実成分

- Level: A
- 問題: $\epsilon(z)=iz^2$ が与える実ベクトル場 $(u,v_2)$ を求め、共形Killing方程式の三成分を検算せよ。

**詳細解答**：$iz^2=-2xy+i(x^2-y^2)$ より $u=-2xy,v_2=x^2-y^2$。$u_x=-2y=(v_2)_y$、$u_y=-2x=-(v_2)_x$ を満たす。従って対角二成分 $2u_x=u_x+(v_2)_y$、$2(v_2)_y=u_x+(v_2)_y$ と、非対角 $(v_2)_x+u_y=2x-2x=0$ がすべて成立する。

### 演習 QFT50-A4：二次元の応力テンソル

- Level: A
- 問題: $\phi(x,y)=a(x^2-y^2)$ とする。$\Delta\phi$、$t(z)$、$\partial_{\bar z}t$ を計算し、線形場とは違う正則カレントの例を作れ。

**詳細解答**：$\phi_{xx}=2a,\phi_{yy}=-2a$ より $\Delta\phi=0$。$\partial_z\phi=\tfrac12(2ax-i(-2ay))=a(x+iy)=az$ なので $t=-g a^2z^2$。$\partial_{\bar z}z=0$ だから $\partial_{\bar z}t=-2ga^2z\partial_{\bar z}z=0$。$a\ne0$ では $t$ は非定数である。

### 演習 QFT50-A5：微分場のウェイト

- Level: A
- 問題: $w=f(z)$ で古典スカラー $\phi$ が座標輸送されるとする。$J=\partial_z\phi$ と $\bar J=\partial_{\bar z}\phi$ の $(h,\bar h)$ と $\Delta,s$ を連鎖律から求めよ。

**詳細解答**：$\partial_z\phi(f(z),\overline{f(z)})=f'(z)\partial_w\phi$ で、正則 $f$ は $\partial_z\overline{f(z)}=0$。従って $J$ は $(1,0)$、$\Delta=1,s=1$。共役について $\partial_{\bar z}\phi(f,\bar f)=\overline{f'}\partial_{\bar w}\phi$ だから $\bar J$ は $(0,1)$、$\Delta=1,s=-1$。これは座標変換則の判定であって、量子真空の存在を証明するものではない。

### 演習 QFT50-B1：Witt括弧の独立検算

- Level: B
- 問題: $\ell_{-1},\ell_0,\ell_1$ を具体的に書き、$[\ell_1,\ell_{-1}]$ と $[\ell_0,\ell_1]$ を任意の関数へ作用させて計算せよ。この三つに限って閉じることを示せ。

**詳細解答**：$\ell_{-1}=-\partial_z,\ell_0=-z\partial_z,\ell_1=-z^2\partial_z$。例えば

$$
\begin{aligned}
\ell_1\ell_{-1}F&=z^2F'',\\
\ell_{-1}\ell_1F&=2zF'+z^2F'',\\
[\ell_1,\ell_{-1}]F&=-2zF'=2\ell_0F.
\end{aligned}
$$

また $\ell_0\ell_1F=2z^2F'+z^3F''$、$\ell_1\ell_0F=z^2F'+z^3F''$ なので $[\ell_0,\ell_1]F=z^2F'=-\ell_1F$。$[\ell_{-1},\ell_0]=-\ell_{-1}$ も同じ積微分から従う。従って三つの括弧はこの三つの線形結合に閉じるが、一般の $\ell_n$ 全体は無限次元である。

### 演習 QFT50-B2：Ward核とデルタ微分

- Level: B
- 問題: 一点挿入の $G(w)$ に対して $H(z)=hG(w)/(z-w)^2+\partial_wG(w)/(z-w)$ と置く。$\partial_{\bar z}H$ を分布として求め、$w$ の近傍で正則な $\epsilon(z)$ に局所カットオフを掛けた試験関数への作用を計算せよ。

**詳細解答**：$G(w)$ と $\partial_wG(w)$ は $z$ の微分では定数なので、

$$
\partial_{\bar z}H
=-\pi hG(w)\partial_z\delta^{(2)}(z-w)
+\pi(\partial_wG(w))\delta^{(2)}(z-w).
$$

滑らかな $\chi$ を $w$ の近傍で1となるコンパクト台関数に取り、$\chi\epsilon$ を試験関数とする。分布微分の定義で $\langle\partial_z\delta_w,\chi\epsilon\rangle=-\partial_z(\chi\epsilon)(w)=-\epsilon'(w)$ だから、$\pi^{-1}\langle\partial_{\bar z}H,\chi\epsilon\rangle=h\epsilon'(w)G+\epsilon(w)\partial_wG$ となる。輪郭積分と同じ係数を与え、接触点以外では $\partial_{\bar z}H=0$ である。

### 演習 QFT50-B3：二点関数への局所Ward作用

- Level: B
- 問題: $G=C(u-v)^{-2h}$ に $t(z)$ の二つのWard核を足したとき、$(z-u)^{-1}$ の係数と $(z-v)^{-1}$ の係数を明示し、本文の対称な有理式へまとめよ。

**詳細解答**：$u,v$ の単純極係数はそれぞれ $-2hG/(u-v)$、$+2hG/(u-v)$。$A=z-u,B=z-v$ と置けば

$$
hG\left[\frac1{A^2}+\frac1{B^2}
-\frac2{u-v}\left(\frac1A-\frac1B\right)\right].
$$

$1/A-1/B=(B-A)/(AB)=(u-v)/(AB)$ を先に用いると $hG(1/A^2+1/B^2-2/(AB))=hG(A-B)^2/(A^2B^2)$。$A-B=v-u$ なので結論は $hG(u-v)^2/[(z-u)^2(z-v)^2]$。$u$ と $v$ の交換で不変である。

### 演習 QFT50-B4：輪郭電荷と局所変換

- Level: B
- 問題: $w\ne0$ の近傍で $\epsilon(z)=z^2$ とする。ウェイト $h$ の一次場一挿入について、Ward核の小円積分を直接求め、$\mathcal D_\epsilon\mathcal O$ と照合せよ。また小円を別の挿入点を越えて拡大してはいけない理由を述べよ。

**詳細解答**：他の挿入点を小円の外に固定した相関関数を $G(w)$ として

$$
\frac1{2\pi i}\oint_w
z^2\left[\frac{hG}{(z-w)^2}
+\frac{\partial_wG}{z-w}\right]dz
=2hwG+w^2\partial_wG.
$$

二重極に[Cauchy高階導関数公式](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-derivatives)を $f(z)=z^2$ で適用すると $f'(w)=2w$、単純極は $f(w)=w^2$ を与えるためです。一次場の微小変換 $\epsilon\partial_w+h\epsilon'$ も同じ $w^2\partial_w+2hw$。輪郭を別の挿入点の上へ移動すれば、その点の極と接触項の寄与が新たに入り、元の一挿入点だけの電荷ではなくなる。

### 演習 QFT50-C1：正則変換・保存・接触項の総合検算

- Level: C
- 問題: $U=\mathbb C\setminus\{0\}$ 上の古典質量零自由bosonと、相異なる点の一次場二点因子を考える。二点因子は

$$
G(u,v)=C(u-v)^{-2h},\qquad u\ne v
$$

とする。次の四つを検算せよ。

1. $\epsilon(z)=z^{-1}$ が局所共形Killing場を与えることを確かめ、原点を含む大域的な滑らかな変換と区別せよ。
2. 自由場の $\tau_{\mu\nu}$ のトレース零と保存から $\partial_{\bar z}t=0$ を導け。
3. 二点Ward核の $z=u$ 周りの輪郭積分を計算し、局所変換と一致することを示せ。
4. $\partial_{\bar z}$ を取ったときの接触分布を書き、量子の $t(z)t(w)$ に中心項がないとまで結論できるか答えよ。

**詳細解答**：

(1) $z\ne0$ では $\epsilon'= -z^{-2}$ が存在して $\partial_{\bar z}\epsilon=0$ です。[共形Killing条件](#prop-qft50-cr-killing)により局所共形Killing場です。ただし $z=0$ に極があり、その点を含む平面上では微分可能な有限値のベクトル場ではありません。

(2) $\tau_{xx}+\tau_{yy}=(g/2\pi)|\nabla\phi|^2-2(g/4\pi)|\nabla\phi|^2=0$。$\Delta\phi=0$ で $\partial_\mu\tau_{\mu\nu}=(g/2\pi)(\Delta\phi)\partial_\nu\phi=0$。複素成分では $\tau_{z\bar z}=0$、$\partial_{\bar z}\tau_{zz}+\partial_z\tau_{z\bar z}=0$ だから $\partial_{\bar z}t=-2\pi\partial_{\bar z}\tau_{zz}=0$。これは挿入点のない古典的結論です。

(3) $z=u$ の小円は $v$ を囲まないように取り、$v$ 側のWard核はその円内で正則なので積分が零です。$u$ 側には二重極 $hG/(z-u)^2$ と単純極 $(\partial_uG)/(z-u)$ があり、

$$
\begin{aligned}
\frac1{2\pi i}\oint_u\frac{dz}{z}
\left[\frac{hG}{(z-u)^2}+\frac{\partial_uG}{z-u}\right]
&=-\frac{hG}{u^2}+\frac1u\partial_uG\\
&=-\frac{hG}{u^2}-\frac{2hG}{u(u-v)}.
\end{aligned}
$$

一方 $\epsilon(u)=1/u$、$\epsilon'(u)=-1/u^2$ を $\epsilon\partial_uG+h\epsilon'G$ に代入すると同じ式になります。$u,v\ne0$ であることが必要です。

(4) $z=u,v$ で分布微分すると

$$
\partial_{\bar z}\langle t(z)\mathcal O(u)\mathcal O(v)\rangle_{\rm sing}
=\pi\sum_{w=u,v}
\left[\partial_wG\,\delta^{(2)}(z-w)
-hG\,\partial_z\delta^{(2)}(z-w)\right].
$$

離れた挿入点では正則ですが、局所的な分布としては零になりません。$t(z)t(w)$ は合成場同士で追加の短距離収縮やくりこみを伴うため、ここで得た**古典Witt括弧**や一次場Ward核だけから中心項が零とは結論できません。中心電荷を決めるにはその二点収縮を別途計算する必要があります。

## この章で確認したこと

二次元では「共形変換」は局所的に正則関数として扱えます。応力テンソルの保存・トレース零を複素座標に翻訳すると正則カレントが現れ、その輪郭電荷は一次場のウェイトと微分を読み取ります。この**局所**の構造が、次に学ぶ応力テンソルの短距離展開とVirasoro代数の土台です。
