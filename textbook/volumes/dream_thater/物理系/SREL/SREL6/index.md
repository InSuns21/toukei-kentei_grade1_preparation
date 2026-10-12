# SREL6 電磁場のLorentz変換・エネルギー運動量テンソル

<!-- definition-example-audit: strict -->

[SREL5の電磁場テンソル](../SREL5/index.md#def-srel5-field-tensor)では、電場と磁場の六成分を一つの対象にまとめ、[Maxwell方程式のLorentz共変性](../SREL5/index.md#thm-srel5-covariance)を証明しました。しかし、方程式の形が保存されることだけでは、**電磁場が観測者ごとにどれほどのエネルギーと運動量を持ち、物質とどう受け渡すか**は分かりません。

この章ではまず、静止系では電場だけの配置が移動系では磁場も持つことを、混合の符号まで計算します。次に観測者によらない二つの量を取り出し、電磁場のエネルギー密度、流束、運動量密度、応力を一つの二階テンソルにまとめます。最後に、[Maxwell方程式](../SREL5/index.md#principle-srel5-maxwell-si)から局所収支を導きます。ここまでの計算は平坦な時空の滑らかな真空場に限ります。

## 1. 単位・記号とLorentz変換の再確認

時空座標を $x^\mu=(ct,x,y,z)$、計量を $\eta_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)$ とします。光速 $c>0$、真空定数 $\varepsilon_0,\mu_0>0$ は $\varepsilon_0\mu_0c^2=1$ を満たすSI単位系です。$F$ は少なくとも $C^1$ 級で、局所収支には $C^2$ 級の $F$ と $C^1$ 級の四元電流 $J^\mu=(c\rho,\boldsymbol j)$ を仮定します。分布的な点電荷や媒質の内部は扱いません。

[既出の電磁場テンソルの定義](../SREL5/index.md#def-srel5-field-tensor)を繰り返し使います。

$$
F^{0i}=-E_i/c,\qquad F^{ij}=-\epsilon_{ijk}B_k,\qquad
F_{0i}=E_i/c,\qquad F_{ij}=-\epsilon_{ijk}B_k.
$$

$x$ 方向の受動的なboost $x'^0=\gamma(x^0-\beta x^1)$、$x'^1=\gamma(x^1-\beta x^0)$ に対し、$\beta=v/c$、$|\beta|<1$、$\gamma=(1-\beta^2)^{-1/2}$ とします。ここでは「観測者が正の $x$ 方向へ動く」ときのプライム系を採用します。

<a id="prop-srel6-boost-fields"></a>

<!-- formal-statement-start -->
> **命題（電磁場のboost成分式）**  
> 上記規約と二階テンソルの変換法則 $F'^{\mu\nu}=\Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta F^{\alpha\beta}$ の下で、$x$ 方向boostは次の電磁場を与える。

$$
\begin{aligned}
E'_x&=E_x,&B'_x&=B_x,\\
E'_y&=\gamma(E_y-vB_z),&
E'_z&=\gamma(E_z+vB_y),\\
B'_y&=\gamma(B_y+vE_z/c^2),&
B'_z&=\gamma(B_z-vE_y/c^2).
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

この成分則は[SREL5のLorentz変換命題](../SREL5/index.md#prop-srel5-field-boost)で証明した結果です。ここでは、後の例で誤りやすい $E'_y$ と $B'_z$ の符号を、変換行列を代入して検算します。

<!-- proof-start -->
### 証明（代表成分と残りの成分）

非零のboost行列要素は $\Lambda^0{}_0=\Lambda^1{}_1=\gamma$、$\Lambda^0{}_1=\Lambda^1{}_0=-\beta\gamma$、$\Lambda^2{}_2=\Lambda^3{}_3=1$ です。したがって

$$
\begin{aligned}
F'^{02}&=\gamma F^{02}-\beta\gamma F^{12}
=-\gamma E_y/c+\beta\gamma B_z,\\
F'^{12}&=-\beta\gamma F^{02}+\gamma F^{12}
=\beta\gamma E_y/c-\gamma B_z.
\end{aligned}
$$

$E'_y=-cF'^{02}$、$B'_z=-F'^{12}$ から主張の $y,z$ 成分を得ます。他方

$$
\begin{aligned}
F'^{03}&=\gamma(-E_z/c)-\beta\gamma B_y
=-\gamma(E_z+vB_y)/c,\\
F'^{13}&=-\beta\gamma(-E_z/c)+\gamma B_y
=\gamma(B_y+vE_z/c^2).
\end{aligned}
$$

$F^{13}=B_y$ と $F^{03}=-E_z/c$ を使いました。最後に $F'^{01}=\gamma^2(1-\beta^2)F^{01}=F^{01}$、$F'^{23}=F^{23}$ から縦成分が不変です。
<!-- proof-end -->

### 直接例：電場だけの系から磁場が現れる

$\boldsymbol E=(0,E_0,0)$、$\boldsymbol B=\boldsymbol0$（$E_0>0$）なら

$$
\boldsymbol E'=(0,\gamma E_0,0),\qquad
\boldsymbol B'=(0,0,-\gamma vE_0/c^2).
$$

$E'_y B'_z<0$ なので、変換後のエネルギー流は負の $x$ 向きです。観測者が場に対して正方向へ動くため、場の流れが逆に見えるのです。この符号は後でテンソルの非対角成分から再確認します。

## 2. 変換しても変わらない二つの場の量

二つの観測者で電場と磁場そのものは混ざる一方、場の配置に固有な数値を取り出せます。その第一の量はテンソルの添字を二つ縮約した量です。

<a id="prop-srel6-field-invariants"></a>

<!-- formal-statement-start -->
> **命題（電磁場の二つのLorentz不変量）**  
> 上記の符号規約で $F_{\mu\nu}F^{\mu\nu}$ と $\boldsymbol E\cdot\boldsymbol B$ は、空間回転および固有で時間の向きを保つLorentz変換に対して不変である。特に

$$
I:=\frac12F_{\mu\nu}F^{\mu\nu}
=|\boldsymbol B|^2-\frac{|\boldsymbol E|^2}{c^2},\qquad
K:=\boldsymbol E\cdot\boldsymbol B
$$

> である。空間反転では $K$ の符号の扱いが変わるため、ここでは連続的なboostと回転に限る。
<!-- formal-statement-end -->

### 証明の見取り図

$I$ は二階テンソルの縮約によって求めます。$K$ はboost成分を代入して交差項が消えることを確認します。任意の方向のboostは座標軸を空間回転でその方向へ合わせれば $x$ 方向boostに帰着します。

<!-- proof-start -->
### 証明

空間成分は $F^{ij}=F_{ij}$ であり、独立な空間対 $(12),(23),(31)$ は磁場の三成分に対応します。時間空間成分は $F_{0i}=-F^{0i}$ なので

$$
\begin{aligned}
F_{\mu\nu}F^{\mu\nu}
&=2\sum_iF_{0i}F^{0i}
 +2\sum_{i<j}F_{ij}F^{ij}\\
&=2\left(-\sum_i E_i^2/c^2+\sum_i B_i^2\right)=2I.
\end{aligned}
$$

[計量のLorentz不変性](../SREL2/index.md#thm-srel2-interval-invariance)を各添字に適用すると、$F'_{\mu\nu}F'^{\mu\nu}=F_{\alpha\beta}F^{\alpha\beta}$ となります。また、直接検算として対になった $E_y,B_z$ には

$$
\begin{aligned}
B_z'^2-E_y'^2/c^2
&=\gamma^2\left\{(B_z-vE_y/c^2)^2
 -(E_y-vB_z)^2/c^2\right\}\\
&=\gamma^2(1-\beta^2)(B_z^2-E_y^2/c^2)
=B_z^2-E_y^2/c^2
\end{aligned}
$$

が成立します。$E_z,B_y$ の対も同じ差になり、$x$ 成分は変わりません。

次に $K$ の横成分を展開します。

$$
\begin{aligned}
E'_yB'_y+E'_zB'_z
=\gamma^2\big[&
(E_y-vB_z)(B_y+vE_z/c^2)\\
&+(E_z+vB_y)(B_z-vE_y/c^2)\big].
\end{aligned}
$$

右辺の $vE_yE_z/c^2$ は正負で打ち消し、$vB_yB_z$ も打ち消すので、$\gamma^2(1-\beta^2)(E_yB_y+E_zB_z)=E_yB_y+E_zB_z$ です。$E'_xB'_x=E_xB_x$ を加えて $K'=K$ となります。空間回転は内積と長さを保存し、時間向きを保つ固有Lorentz変換は回転とboostの合成で表せるため主張が従います。
<!-- proof-end -->

**不変量の使い方**：$I=K=0$ は平面電磁波が満たす関係です。ただし、この二条件だけから場がMaxwell方程式の解だとは結論できません。微分方程式と点ごとの代数条件は別の要請です。

## 3. エネルギー密度とエネルギー流を一つにする

三次元の電磁気学では、場のエネルギー密度が $u=(\varepsilon_0|\boldsymbol E|^2+|\boldsymbol B|^2/\mu_0)/2$、エネルギー流密度が $\boldsymbol S=\boldsymbol E\times\boldsymbol B/\mu_0$ でした。これらは別々に変換するのではなく、四元のエネルギーと運動量を運ぶテンソルの成分として扱うと整理できます。

<a id="def-srel6-em-energy-momentum"></a>

<!-- formal-statement-start -->
> **定義（電磁場のエネルギー運動量テンソル）**  
> 平坦時空、SI単位系、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$ において、電磁場テンソル $F$ から対称二階テンソルを

$$
T^{\mu\nu}
=\frac1{\mu_0}\left(
-F^{\mu\alpha}F^\nu{}_\alpha
+\frac14\eta^{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}
\right)
$$

> と定める。$F^\nu{}_\alpha=\eta_{\alpha\beta}F^{\nu\beta}$ とし、$\alpha,\beta$ は $0$ から $3$ まで縮約する。
<!-- formal-statement-end -->

前の式の最初のマイナスは計量の符号に依存します。この符号規約では、電磁場が零でないときのエネルギー密度が負にならないために必要です。

<!-- definition-example-start: def-srel6-em-energy-momentum -->
### 直接例：一方向だけの静電場

$\boldsymbol E=(0,E_0,0)$、$\boldsymbol B=\boldsymbol0$ とします。$F^{02}=-E_0/c$、$F^{20}=E_0/c$ だけが非零です。従って

$$
F^{0\alpha}F^0{}_\alpha=-E_0^2/c^2,\qquad
F_{\alpha\beta}F^{\alpha\beta}=-2E_0^2/c^2.
$$

これを定義の $(0,0)$ 成分へ入れると

$$
T^{00}=\frac1{\mu_0}\left(
E_0^2/c^2-E_0^2/(2c^2)\right)
=\frac{\varepsilon_0E_0^2}{2}>0.
$$

$T^{01}=0$ ですが $T^{11}=\varepsilon_0E_0^2/2$ は零ではありません。流れがなくても空間方向の応力が存在することが分かります。
<!-- definition-example-end -->

<a id="thm-srel6-components"></a>

<!-- formal-statement-start -->
> **定理（エネルギー密度・Poynting流・Maxwell応力）**  
> 上記定義の $T$ は対称で、成分は次で与えられる。

$$
\begin{aligned}
T^{00}&=u=\frac12\left(\varepsilon_0|\boldsymbol E|^2+\frac{|\boldsymbol B|^2}{\mu_0}\right),\\
T^{0i}&=T^{i0}=\frac{S_i}{c},
\qquad \boldsymbol S=\frac{\boldsymbol E\times\boldsymbol B}{\mu_0},\\
T^{ij}&=u\delta_{ij}
-\varepsilon_0E_iE_j-\frac1{\mu_0}B_iB_j.
\end{aligned}
$$

> 特に場の運動量密度は $T^{i0}/c=S_i/c^2$ である。三次元Maxwell応力テンソルは次の成分で与えられ、

$
\sigma_{ij}
=\varepsilon_0\left(E_iE_j-\frac12\delta_{ij}|\boldsymbol E|^2\right)
+\frac1{\mu_0}\left(B_iB_j-\frac12\delta_{ij}|\boldsymbol B|^2\right).
$

> エネルギー運動量テンソルの空間成分との関係は $T^{ij}=-\sigma_{ij}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ の時間成分を掛ければエネルギー、時間と空間の混合成分を掛ければPoynting流が得られます。空間成分では $\sum_k\epsilon_{ik\ell}\epsilon_{jkm}=\delta_{ij}\delta_{\ell m}-\delta_{im}\delta_{j\ell}$ を使って成分を崩します。

<!-- proof-start -->
### 証明

まず $F^{0i}=-E_i/c$、$F^0{}_i=E_i/c$、$F^{00}=0$ です。従って

$$
-F^{0\alpha}F^0{}_\alpha
=-\sum_i(-E_i/c)(E_i/c)=|\boldsymbol E|^2/c^2.
$$

[前節の不変量](#prop-srel6-field-invariants)により $F_{\alpha\beta}F^{\alpha\beta}=2(|\boldsymbol B|^2-|\boldsymbol E|^2/c^2)$ なので、$T^{00}=(|\boldsymbol E|^2/c^2+|\boldsymbol B|^2)/(2\mu_0)=u$ です。

次に $\eta^{0i}=0$ より、空間添字 $i$ について

$$
\begin{aligned}
T^{0i}
&=-\frac1{\mu_0}\sum_jF^{0j}F^i{}_j
=-\frac1{\mu_0}\sum_j(-E_j/c)(+\epsilon_{ijk}B_k)\\
&=\frac1{\mu_0c}\sum_{jk}\epsilon_{ijk}E_jB_k
=\frac{S_i}{c}.
\end{aligned}
$$

ここでは $F^i{}_j=-F^{ij}=+\epsilon_{ijk}B_k$ としており、添字を一つ下げる符号を省略していません。$F^{\mu\alpha}F^\nu{}_\alpha$ は $F$ の二つの行を計量で内積したものなので $\mu,\nu$ の交換で対称です。計量項も対称であるため $T^{i0}=T^{0i}$ です。

空間二成分については

$$
\begin{aligned}
F^{i\alpha}F^j{}_\alpha
&=F^{i0}F^j{}_0+\sum_kF^{ik}F^j{}_k\\
&=\frac{E_iE_j}{c^2}
-\sum_{k,\ell,m}\epsilon_{ik\ell}\epsilon_{jkm}B_\ell B_m\\
&=\frac{E_iE_j}{c^2}-\delta_{ij}|\boldsymbol B|^2+B_iB_j.
\end{aligned}
$$

$\eta^{ij}=-\delta_{ij}$ を代入すると

$$
\begin{aligned}
\mu_0 T^{ij}
&=-E_iE_j/c^2+\delta_{ij}|\boldsymbol B|^2-B_iB_j\\
&\quad-\frac12\delta_{ij}(|\boldsymbol B|^2-|\boldsymbol E|^2/c^2)\\
&=\delta_{ij}\left(|\boldsymbol B|^2+|\boldsymbol E|^2/c^2\right)/2
-E_iE_j/c^2-B_iB_j.
\end{aligned}
$$

$\varepsilon_0=1/(\mu_0c^2)$ で主張を得ます。$\sigma_{ij}$ の式を展開すると $-\sigma_{ij}$ が同じ $T^{ij}$ に一致します。
<!-- proof-end -->

この定理は、エネルギーの輸送と物体を押す力が別の現象ではなく、一つの $T$ の時間空間成分と空間空間成分として組になることを示します。なお $T^{ij}$ 自体と、工学で使うMaxwell応力 $\sigma_{ij}$ とは符号が反対です。

## 4. テンソルとしての性質と観測者依存

$T$ は二階テンソルなので、[Lorentz変換の計量保存](../SREL2/index.md#thm-srel2-interval-invariance)により $T'^{\mu\nu}=\Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta T^{\alpha\beta}$ と変わります。エネルギー密度だけを一つ取り出し、不変なスカラーと思ってはいけません。

<a id="thm-srel6-tensor-properties"></a>

<!-- formal-statement-start -->
> **定理（エネルギー運動量テンソルの共変性・対称性・零トレース）**  
> 第3節の $T$ は任意の一定Lorentz変換に対して二階反変テンソルとして変換し、$T^{\mu\nu}=T^{\nu\mu}$、$\eta_{\mu\nu}T^{\mu\nu}=0$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

二階テンソルの各添字の変換則と、上下添字の縮約でLorentz行列が打ち消されることを用います。残る対称性と零トレースも添字を入れ替えて直接計算します。零トレースの係数 $1/4$ は時空が四次元であることを使います。

<!-- proof-start -->
### 証明

[電磁場テンソルの変換規則](../SREL5/index.md#prop-srel5-field-boost)と $\Lambda^T\eta\Lambda=\eta$ により、$F'^{\mu\alpha}F'^\nu{}_\alpha$ の内部の $\alpha$ に付いた二つの行列が縮約し、外側の $\mu,\nu$ にだけ $\Lambda$ が残ります。$F_{\alpha\beta}F^{\alpha\beta}$ は[前節の不変量](#prop-srel6-field-invariants)で証明したスカラー、$\eta'^{\mu\nu}=\Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta\eta^{\alpha\beta}$ です。ゆえに $T'$ は主張の二階変換法則に従います。

対称性について、$F^{\mu\alpha}F^\nu{}_\alpha=\eta_{\alpha\beta}F^{\mu\alpha}F^{\nu\beta}$ と書くと $\eta_{\alpha\beta}=\eta_{\beta\alpha}$ の下で二つの因子を入れ替えられます。トレースは

$$
\begin{aligned}
\mu_0\eta_{\mu\nu}T^{\mu\nu}
&=-\eta_{\mu\nu}F^{\mu\alpha}F^\nu{}_\alpha
+\tfrac14(\eta_{\mu\nu}\eta^{\mu\nu})F_{\alpha\beta}F^{\alpha\beta}\\
&=-F_{\mu\alpha}F^{\mu\alpha}+\tfrac44F_{\alpha\beta}F^{\alpha\beta}=0.
\end{aligned}
$$

ここで $\eta_{\mu\nu}\eta^{\mu\nu}=4$ を使用しました。
<!-- proof-end -->

### 直接検算：純電場をboostしたとき

第1節の例で $u_0=\varepsilon_0E_0^2/2$ とします。第3節の成分式から元の系で $T^{00}=T^{11}=u_0$、$T^{01}=0$ です。よって $x$ boostでは

$$
\begin{aligned}
T'^{00}&=\gamma^2(T^{00}-2\beta T^{01}+\beta^2T^{11})
=\gamma^2u_0(1+\beta^2),\\
T'^{01}&=\gamma^2[-\beta T^{00}+(1+\beta^2)T^{01}-\beta T^{11}]
=-2\beta\gamma^2u_0.
\end{aligned}
$$

他方、変換後の場は $E'_y=\gamma E_0$、$B'_z=-\gamma vE_0/c^2$ なので

$$
\begin{aligned}
u'&=\tfrac12\varepsilon_0\gamma^2E_0^2
+\tfrac1{2\mu_0}\gamma^2v^2E_0^2/c^4
=\gamma^2u_0(1+\beta^2),\\
S'_x/c&=\frac{E'_yB'_z}{\mu_0c}
=-\gamma^2\beta\varepsilon_0E_0^2
=-2\beta\gamma^2u_0.
\end{aligned}
$$

このように、場成分の変換と $T$ の二階テンソル変換は数値・符号とも一致します。

## 5. Maxwell方程式から局所的な受け渡しを導く

電磁場は物質があるとその電荷・電流に仕事と力を及ぼします。局所保存を議論するためには、電磁場単独の収支と、物質を含む全系の収支を区別する必要があります。

<a id="thm-srel6-field-balance"></a>

<!-- formal-statement-start -->
> **定理（電磁場のエネルギー運動量収支）**  
> $F\in C^2$ が[非斉次Maxwell方程式](../SREL5/index.md#thm-srel5-inhomogeneous-maxwell)と[斉次Maxwell方程式](../SREL5/index.md#thm-srel5-homogeneous-maxwell)を満たし、$J\in C^1$ を四元電流とする。このとき

$$
\boxed{\partial_\mu T^{\mu\nu}=-f^\nu,\qquad
f^\nu=F^{\nu\alpha}J_\alpha}
$$

> が成立する。$f^0=\boldsymbol j\cdot\boldsymbol E/c$、$\boldsymbol f=\rho\boldsymbol E+\boldsymbol j\times\boldsymbol B$ は場が物質へ渡すエネルギー率とLorentz力密度を四元にまとめたものである。
<!-- formal-statement-end -->

### 証明の見取り図

$T$ を積の微分で展開すると、非斉次Maxwell方程式が源の項に変わります。残る二項は、斉次Maxwell方程式を $F^{\mu\alpha}$ で縮約した恒等式で相殺されます。

<!-- proof-start -->
### 証明

定義を微分し、計量が一定であることを用います。縮約不変量を $Q=F_{\alpha\beta}F^{\alpha\beta}$ とおくと

$$
\begin{aligned}
\mu_0\partial_\mu T^{\mu\nu}
&=-(\partial_\mu F^{\mu\alpha})F^\nu{}_\alpha
-F^{\mu\alpha}\partial_\mu F^\nu{}_\alpha
+\tfrac14\partial^\nu Q.
\end{aligned}
$$

[非斉次式](../SREL5/index.md#thm-srel5-inhomogeneous-maxwell)は $\partial_\mu F^{\mu\alpha}=\mu_0J^\alpha$ です。もう一方の微分項を消すため、[斉次式](../SREL5/index.md#thm-srel5-homogeneous-maxwell)を添字 $(\mu,\alpha,\lambda)$ で書きます。

$$
\partial_\mu F_{\alpha\lambda}
+\partial_\alpha F_{\lambda\mu}
+\partial_\lambda F_{\mu\alpha}=0.
$$

この式へ $F^{\mu\alpha}$ を掛けて $\mu,\alpha$ を縮約します。第二項は、$\mu$ と $\alpha$ を交換すると第一項と一致します。また積の微分で $F^{\mu\alpha}\partial_\lambda F_{\mu\alpha}=\tfrac12\partial_\lambda Q$ です。従って

$$
2F^{\mu\alpha}\partial_\mu F_{\alpha\lambda}
+\tfrac12\partial_\lambda Q=0.
$$

$F_{\alpha\lambda}=-F_{\lambda\alpha}$ と計量での添字上げを適用すれば

$$
F^{\mu\alpha}\partial_\mu F^\nu{}_\alpha
=\tfrac14\partial^\nu Q.
$$

これを最初の積の微分式へ戻すと後二項が消えて

$$
\partial_\mu T^{\mu\nu}
=-J^\alpha F^\nu{}_\alpha
=-F^{\nu\alpha}J_\alpha.
$$

さらに $J_0=c\rho$、$J_i=-j_i$、$F^{0i}=-E_i/c$、$F^{i0}=E_i/c$、$F^{ij}=-\epsilon_{ijk}B_k$ だから

$$
\begin{aligned}
f^0&=\sum_i(-E_i/c)(-j_i)=\boldsymbol j\cdot\boldsymbol E/c,\\
f^i&=(E_i/c)(c\rho)+\sum_j(-\epsilon_{ijk}B_k)(-j_j)
=\rho E_i+(\boldsymbol j\times\boldsymbol B)_i.
\end{aligned}
$$

必要な各符号が確かめられました。
<!-- proof-end -->

$\nu=0$ を $c$ 倍すれば、[成分定理](#thm-srel6-components)によって

$$
\boxed{\partial_tu+\nabla\cdot\boldsymbol S
=-\boldsymbol j\cdot\boldsymbol E}
$$

が出ます。これはPoyntingのエネルギー収支式です。$\nu=i$ は

$$
\boxed{\partial_t(\boldsymbol S/c^2)_i
+\sum_j\partial_jT^{ji}
=-(\rho E_i+(\boldsymbol j\times\boldsymbol B)_i)}
$$

です。電磁場が物質へ正の仕事をするとき、場のエネルギーはその分減ります。逆符号で足し合わせる物質側のエネルギー運動量は、**物質の運動方程式**が与えられたときに初めて閉じます。

### 例：源がない電磁波は光速でエネルギーを輸送する

$\xi=x-ct$、十分滑らかな実関数 $g$ に対して、真空の場を

$$
\boldsymbol E=(0,g(\xi),0),\qquad
\boldsymbol B=(0,0,g(\xi)/c),\qquad J=0
$$

とします。$-\partial_xB_z=-g'(\xi)/c$、$-(1/c^2)\partial_tE_y=+g'(\xi)/c$ が打ち消すためAmpère–Maxwell則の $y$ 成分を満たします。また $\partial_x E_y=g'(\xi)$、$\partial_t B_z=-g'(\xi)$ なのでFaraday則の $z$ 成分も満たし、二つのGauss則も零です。

このとき $u=\varepsilon_0g(\xi)^2$、$S_x=cu$ です。したがって

$$
\partial_t u=-c\,\frac{d}{d\xi}(\varepsilon_0g^2),
\qquad
\partial_xS_x=c\,\frac{d}{d\xi}(\varepsilon_0g^2),
\qquad \partial_tu+\partial_xS_x=0.
$$

$I=K=0$ も成り立ちます。対して、たとえ $I=K=0$ を満たすだけの任意の場でも、この波動解の条件や収支が自動的に得られるわけではありません。

## 6. 何を次章へ持ち越すか

本章の電磁場は、場が物質へ及ぼす力密度を収支の右辺に置くことで閉じた記述になりました。物質や流体の $T^{\mu\nu}$ を加えるには、その物質の構成則と運動方程式が必要です。次章では、局所保存から連続体の四元速度・密度・圧力をどう接続するかを調べます。

---

## 演習

### Level A

### A1. 純電場のboost

$\boldsymbol E=(0,E_0,0)$、$\boldsymbol B=0$、$E_0\ne0$、$0<v<c$ とする。$x$ boost後の非零成分と磁場の向きを求め、$B'_z/E'_y$ を計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[boost成分式](#prop-srel6-boost-fields)へ $E_y=E_0$、$B_z=E_z=B_y=0$ を代入します。

$$
E'_y=\gamma(E_0-v\cdot0)=\gamma E_0,\qquad
B'_z=\gamma(0-vE_0/c^2)=-\gamma vE_0/c^2.
$$

他はすべて零です。したがって磁場は負の $z$ 向きであり、$B'_z/E'_y=-v/c^2$ です。
<!-- solution-end -->

### A2. 不変量の直接計算

A1の系で $I$ と $K$ を変換の前後で計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[不変量の定義](#prop-srel6-field-invariants)で元の系は $I=-E_0^2/c^2$、$K=0$ です。変換後も電場は $y$、磁場は $z$ 方向なので $K'=0$ です。また

$$
\begin{aligned}
I'&=(B'_z)^2-(E'_y)^2/c^2\\
&=\gamma^2v^2E_0^2/c^4-\gamma^2E_0^2/c^2\\
&=-\gamma^2(1-v^2/c^2)E_0^2/c^2=-E_0^2/c^2=I.
\end{aligned}
$$

$\gamma^2(1-v^2/c^2)=1$ を最後に使いました。
<!-- solution-end -->

### A3. 静電場の応力

$\boldsymbol E=(0,E_0,0)$、$\boldsymbol B=0$ に対し $T^{00},T^{11},T^{22},T^{33}$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$u_0=\varepsilon_0E_0^2/2$ とおきます。[成分定理](#thm-srel6-components)を使うと $T^{00}=u_0$ です。空間成分は $T^{ii}=u_0-\varepsilon_0E_i^2-B_i^2/\mu_0$ なので

$$
T^{11}=u_0,\qquad
T^{22}=u_0-\varepsilon_0E_0^2=-u_0,\qquad
T^{33}=u_0.
$$

したがって $T^{00}-T^{11}-T^{22}-T^{33}=u_0-u_0+u_0-u_0=0$ とトレースも確かめられます。
<!-- solution-end -->

### A4. 平面波の流れ

$\boldsymbol E=(0,E_0\cos k(x-ct),0)$、$\boldsymbol B=(0,0,E_0\cos k(x-ct)/c)$、$k>0$ とする。$u$、$\boldsymbol S$、運動量密度を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\xi=k(x-ct)$ とおくと $\varepsilon_0=1/(\mu_0c^2)$ です。従って

$$
u=\tfrac12\varepsilon_0E_0^2\cos^2\xi
+\tfrac1{2\mu_0c^2}E_0^2\cos^2\xi
=\varepsilon_0E_0^2\cos^2\xi.
$$

$\boldsymbol E\times\boldsymbol B$ は正の $x$ 向きなので

$$
\boldsymbol S=(cu,0,0),\qquad
\boldsymbol g=\boldsymbol S/c^2=(u/c,0,0).
$$

場のエネルギー密度を $u$、運動量密度を $u/c$ と取り違えないよう、$c$ の因子を残しました。
<!-- solution-end -->

### Level B

### B1. 純電場のエネルギーと流れの二通りの検算

A1の系で、変換後の $u',S'_x$ を (i) 電場磁場の式から、(ii) 元の $T^{\mu\nu}$ をboostする方法から求め、結果を比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$u_0=\varepsilon_0E_0^2/2$、$\beta=v/c$ とします。場の直接計算では

$$
\begin{aligned}
u'&=\tfrac12\varepsilon_0\gamma^2E_0^2
+\tfrac1{2\mu_0}\gamma^2v^2E_0^2/c^4
=\gamma^2u_0(1+\beta^2),\\
S'_x&=E'_yB'_z/\mu_0
=-\gamma^2vE_0^2/(\mu_0c^2)
=-2v\gamma^2u_0.
\end{aligned}
$$

次に[エネルギー・応力の成分定理](#thm-srel6-components)で元の系は $T^{00}=T^{11}=u_0$、$T^{01}=0$ です。二つの添字へ $\Lambda$ を掛けると

$$
\begin{aligned}
T'^{00}&=\gamma^2(T^{00}-2\beta T^{01}+\beta^2T^{11})
=\gamma^2u_0(1+\beta^2),\\
T'^{01}&=\gamma^2[-\beta T^{00}+(1+\beta^2)T^{01}-\beta T^{11}]
=-2\beta\gamma^2u_0.
\end{aligned}
$$

$u'=T'^{00}$、$S'_x=cT'^{01}=-2v\gamma^2u_0$ で二つの方法が一致します。
<!-- solution-end -->

### B2. 対称性とトレース

$T^{\mu\nu}$ の定義だけから対称性と零トレースを示し、なぜ $1/4$ が必要か説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[テンソルの定義](#def-srel6-em-energy-momentum)で $A^{\mu\nu}=F^{\mu\alpha}F^\nu{}_\alpha=\eta_{\alpha\beta}F^{\mu\alpha}F^{\nu\beta}$ とおきます。二因子を交換し、ダミー添字 $\alpha,\beta$ を入れ替えると

$$
A^{\nu\mu}=\eta_{\alpha\beta}F^{\nu\alpha}F^{\mu\beta}
=\eta_{\beta\alpha}F^{\mu\beta}F^{\nu\alpha}
=A^{\mu\nu}.
$$

$\eta^{\mu\nu}$ も対称なので $T^{\mu\nu}=T^{\nu\mu}$ です。一方 $Q=F_{\alpha\beta}F^{\alpha\beta}$ と置けば

$$
\eta_{\mu\nu}T^{\mu\nu}
=\frac1{\mu_0}\left(-Q+\tfrac14\cdot 4Q\right)=0.
$$

四次元では $\eta_{\mu\nu}\eta^{\mu\nu}=4$ なので係数が $1/4$ です。次元数が変わればこの打ち消しの計算も変わります。
<!-- solution-end -->

### B3. 場が物質へ渡す力の符号

$J^\mu=(c\rho,\boldsymbol j)$ とする。$f^\nu=F^{\nu\alpha}J_\alpha$ を四成分で展開し、$\partial_\mu T^{\mu\nu}=-f^\nu$ からPoynting収支式を導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

[四元電流](../SREL5/index.md#def-srel5-four-current)を下げると $J_0=c\rho$、$J_i=-j_i$ です。[電磁場テンソルの定義](../SREL5/index.md#def-srel5-field-tensor)を用いて

$$
\begin{aligned}
f^0&=\sum_iF^{0i}J_i
=\sum_i(-E_i/c)(-j_i)=\boldsymbol E\cdot\boldsymbol j/c,\\
f^i&=F^{i0}J_0+\sum_jF^{ij}J_j\\
&=(E_i/c)(c\rho)
+\sum_{jk}(-\epsilon_{ijk}B_k)(-j_j)
=\rho E_i+(\boldsymbol j\times\boldsymbol B)_i.
\end{aligned}
$$

[収支定理](#thm-srel6-field-balance)の $\nu=0$ 成分で $\partial_0=\partial_t/c$、$T^{00}=u$、$T^{i0}=S_i/c$ だから

$$
\frac1c\partial_tu+\sum_i\partial_i(S_i/c)
=-\boldsymbol E\cdot\boldsymbol j/c.
$$

両辺を $c$ 倍し、$\partial_tu+\nabla\cdot\boldsymbol S=-\boldsymbol j\cdot\boldsymbol E$ を得ます。場から物質へ仕事が流れるので右辺は負です。
<!-- solution-end -->

### Level C

### C1. 電磁波・不変量・応力・boostの総合計算

$g\in C^2(\mathbb R)$、$\xi=x-ct$ とし、真空で $\boldsymbol E=(0,g(\xi),0)$、$\boldsymbol B=(0,0,g(\xi)/c)$、$J=0$ を考える。(1) Maxwell方程式を成分で確かめ、(2) 不変量 $I,K$ を計算し、(3) 非零の $T^{\mu\nu}$ 成分を求め、(4) $0<v<c$ の $x$ boost後に $u'/u$ を $g(\xi)\ne0$ の点で求め、(5) $\partial_\mu T^{\mu\nu}=0$ を成分で確認せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $g'(\xi)=dg/d\xi$ と書きます。$\boldsymbol E$ は $y$ 成分だけを、$\boldsymbol B$ は $z$ 成分だけを持ち、いずれも $x,t$ にしか依存しないので二つの発散は零です。curlの非零成分は

$$
(\nabla\times\boldsymbol B)_y=-\partial_x B_z=-g'(\xi)/c,\quad
-\partial_tE_y/c^2=+g'(\xi)/c
$$

で相殺します。Faraday側は

$$
(\nabla\times\boldsymbol E)_z=\partial_xE_y=g'(\xi),\quad
\partial_tB_z=-g'(\xi)
$$

で相殺するので、四本すべて成立します。

(2) $|\boldsymbol B|^2=g(\xi)^2/c^2$、$|\boldsymbol E|^2/c^2=g(\xi)^2/c^2$、両ベクトルは直交するので、[不変量](#prop-srel6-field-invariants)は $I=0$、$K=0$ です。

(3) [成分定理](#thm-srel6-components)で $u=\varepsilon_0g^2$、$S_x=cu$ です。空間対角成分は

$$
T^{11}=u,\quad
T^{22}=u-\varepsilon_0g^2=0,\quad
T^{33}=u-\frac{g^2}{\mu_0c^2}=0.
$$

また $T^{01}=T^{10}=S_x/c=u$ であり、残りの成分は零です。したがって $(0,1)$ 部分は

$$
\begin{pmatrix}T^{00}&T^{01}\\T^{10}&T^{11}\end{pmatrix}
=\begin{pmatrix}u&u\\u&u\end{pmatrix}.
$$

(4) [boost成分式](#prop-srel6-boost-fields)で $E'_y=\gamma[g-vg/c]=\gamma(1-\beta)g$、$B'_z=\gamma[g/c-vg/c^2]=E'_y/c$ です。従って

$$
\frac{u'}u=\gamma^2(1-\beta)^2
=\frac{(1-\beta)^2}{1-\beta^2}=\frac{1-\beta}{1+\beta}.
$$

$g(\xi)=0$ では両エネルギー密度が零で比が定義されないため、問題の条件が必要です。

(5) $u(x,t)=\varepsilon_0g(x-ct)^2$ なので $\partial_tu=-c\partial_xu$ です。$\nu=0$ では

$$
\partial_\mu T^{\mu0}
=(\partial_tu)/c+\partial_xu=-\partial_xu+\partial_xu=0.
$$

$\nu=1$ でも $T^{01}=T^{11}=u$ なので同じ計算です。$\nu=2,3$ は $T^{\mu2}=T^{\mu3}=0$ のため零です。こうして全四成分の局所保存が直接確認できました。
<!-- solution-end -->
