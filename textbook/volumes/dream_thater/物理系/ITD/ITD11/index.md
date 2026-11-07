# ITD11 連続Langevin経路の時間反転：確率比・ゆらぎ関係・見えない散逸

[ITD7の連続経路の第一法則](../ITD7/index.md#prop-itd7-stratonovich-balance)では、Brown運動で揺れる軌道に対しても、仕事と熱を区別できました。しかし第一法則だけでは、**その軌道と時間反転した軌道がどちらだけ起こりやすいか**は分かりません。[ITD2の積分型ゆらぎ関係](../ITD2/index.md#thm-itd2-ift)を連続状態へ広げるには、確率密度の積を単に書くだけでは足りず、経路全体の確率測度と支持を確かめる必要があります。

本章は、その差を実際に埋めます。一般の非線形Langevin系を一度に扱わず、**円周上を一定の力で駆動する過減衰粒子**という、遷移密度が正規分布で正確に計算できる模型に限定します。この模型で経路確率比、有限時間のゆらぎ関係、平均散逸、経路記録を粗くした際の情報損失を全て導きます。最後に、どの仮定を外すと証明が使えないかを明示します。

記号は $k_{\mathrm B}>0$、温度 $T>0$、$\beta=(k_{\mathrm B}T)^{-1}$、自然対数とします。仕事 $W$ は**外から系に入る**向きを、$Q_{\mathrm{bath}}$ は**浴へ出る**熱を正とし、$\Delta U=W-Q_{\mathrm{bath}}$ です。

## 1. 円周を何周したかを捨てない

半径の値を使う必要はないので、円周を長さ $L>0$ の区間 $[0,L)$ の両端を貼り合わせた空間とみなします。位置 $x$ と $x+L$ は円周上では同じ点ですが、粒子が一周した仕事を求めるには**何周したか**が必要です。

そこで実数上の連続軌道 $Z_t$ を保ち、観測位置を $X_t=Z_t\pmod L$ とします。初期代表点 $Z_0\in[0,L)$ を決めれば、途中で整数周だけ飛ばない連続な持ち上げ $Z_t$ が一意に復元できます。終点だけを見て $Z_\tau$ を $[0,L)$ に戻す操作とは異なります。

移動度 $\mu>0$、一定の外力 $F\in\mathbb R$、拡散係数 $D=\mu k_{\mathrm B}T>0$ とし、[STO4の標準Brown運動](../../../解析系/STO/STO4/index.md#thm-sto4-brownian-construction) $B_t$ を使います。一定の外力は円周上で単一値の周期ポテンシャルからは導けないので、**外部駆動**として仕事を与え続けるものです。

以下の $\circ dZ_t$ は[ITD7で導入したStratonovich積分](../ITD7/index.md#def-itd7-langevin-heat)の記法です。ここでは係数 $F$ が一定なので、積分は単に変位の $F$ 倍になります。

<a id="def-itd11-driven-ring"></a>

<!-- formal-statement-start -->
> **定義（一定駆動の円周Langevin経路と持ち上げ変位）**
> $L,\tau,\mu,T>0$、$F\in\mathbb R$、$D=\mu k_{\mathrm B}T$、$v=\mu F$ とする。$Z_0$ は $[0,L)$ に密度 $\rho_0(x)>0$ を持ち、$B$ と独立とする。区間 $0\le t\le\tau$ において

$$
Z_t=Z_0+vt+\sqrt{2D}\,B_t,
\qquad X_t=Z_t\pmod L
$$

> を円周Langevin経路とする。**持ち上げ変位**を $Y:=Z_\tau-Z_0$ と呼ぶ。位置の始終値 $X_0,X_\tau$ だけからは $Y$ の周回数は決まらない。内部エネルギーを一定の零とし、仕事・浴への熱を次のように数える。

$$
W=F\int_0^\tau\circ dZ_t=FY,
\qquad Q_{\mathrm{bath}}=FY.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd11-driven-ring -->
### 直接例：同じ位置へ戻っても仕事は違う

$L=1$、初期密度 $\rho_0=1$、$Z_0$ と $B$ を独立として定義の確率模型を作ります。この密度は正で、$\int_0^1\rho_0(x)\,dx=1$ です。

次に **$Z_0=1/4$ という標本値をもつ経路を例示** します。連続な経路が一周して $Z_\tau=5/4$ なら、$X_\tau=X_0=1/4$ でも $Y=1$、$W=Q_{\mathrm{bath}}=F$ です。一周せず $Z_\tau=1/4$ なら $Y=0$、$W=Q_{\mathrm{bath}}=0$ です。どちらも $\Delta U=0=W-Q_{\mathrm{bath}}$ を満たします。個々の正確な経路の確率が正だと主張しているわけではありません。

**定義の確認**：$\mu,T>0$ から $D>0$、持ち上げは連続、$F$ は一定なのでStratonovich積分と伊藤積分の被積分関数に補正はなく、どちらも $F(Z_\tau-Z_0)$ です。[ITD7で導入したStratonovich熱](../ITD7/index.md#def-itd7-langevin-heat)と同じ第一法則の符号ですが、ここでは周期ポテンシャルではなく非保存外力がエネルギーを供給します。
<!-- definition-example-end -->

Brown運動の独立な正規増分から、長さ $h>0$ の変位 $Z_{t+h}-Z_t$ は平均 $vh$、分散 $2Dh$ の正規分布です。密度を

$$
g_h(z)=\frac{1}{\sqrt{4\pi Dh}}
\exp\left(-\frac{(z-vh)^2}{4Dh}\right)
$$

と書きます。各 $g_h(z)>0$、$\int_{\mathbb R}g_h(z)\,dz=1$ です。この**正値性**が後の時間反転で重要になります。

## 2. 有限の増分から経路全体の確率比へ

まず円周上の初期密度 $\rho_0$ を連続かつ厳密に正とし、$\int_0^L\rho_0(x)\,dx=1$ と仮定します。終端密度 $\rho_\tau$ は、始点 $u\in[0,L)$ からの実数上の正規密度を、終点 $x$ と同じ円周位置に対応する $x+mL$（$m\in\mathbb Z$）について足して得られます。

$$
\rho_\tau(x)=\int_0^L\rho_0(u)
\sum_{m\in\mathbb Z}\frac{1}{\sqrt{4\pi D\tau}}
\exp\left(-\frac{(x+mL-u-v\tau)^2}{4D\tau}\right)du.
$$

各項は正で、$x\in[0,L)$ について積分すると、和の各区間 $[mL,(m+1)L)$ が実数全体を覆うため、内側の正規密度の積分が1になります。従って $\int_0^L\rho_\tau(x)dx=1$。Gaussianの一様収束から $\rho_\tau$ は連続で正です。$\rho_0$ と $\rho_\tau$ はコンパクトな円周上で連続・厳密に正なので、それぞれ零から離れています。

**正方向の実験**は $\rho_0$ から始めて力 $F$ を作用させます。**逆実験**は $\rho_\tau$ から始め、同じ一定の力 $F$ を作用させます。どちらも円周上の連続関数 $t\mapsto X_t$ を記録し、その全体に確率を割り当てます。

逆実験の経路 $X^R$ を $t\mapsto X^R_{\tau-t}$ と読み直す写像を $\Theta$ と書きます。この反転経路の初期代表点を $[0,L)$ に取り直して連続に持ち上げると、変位は逆実験の持ち上げ変位の **負** になります。

$\Theta_*P_R$ は、任意の経路事象 $A$ に対して $P_R(\Theta X^R\in A)$ を割り当てる測度です。ここで「同じ力を保つこと」と「逆向きの変位を記録すること」を混同しないでください。

二つの経路測度 $P,Q$ に対して、既習の[測度の絶対連続性](../../../解析系/F0/F0-00P2/index.md#def-f0-00p2-absolute-continuity)を経路事象に適用します。つまり $Q(A)=0$ なら $P(A)=0$ という条件です。さらに、全経路事象 $A$ で $P(A)=\int_A r\,dQ$ を満たす関数 $r$ があれば、既習の[Radon--Nikodym微分](../../../解析系/F0/F0-00P2/index.md#def-f0-00p2-rn-density)として $r=dP/dQ$ と書きます。これは一時刻の位置密度比とは異なります。今回は、一般の[Radon--Nikodym定理](../../../解析系/F0/F0-00P2/index.md#thm-f0-00p2-radon-nikodym)に存在を任せるだけでなく、後の定理で経路比を具体的に構成します。

<a id="def-itd11-reversed-path"></a>

<!-- formal-statement-start -->
> **定義（円周拡散の正逆経路測度）**
> [一定駆動の円周Langevin経路](#def-itd11-driven-ring)について、連続経路の確率測度を $P_F$ とする。逆実験は初期密度 $\rho_\tau$、同じ $v,D$ の模型であり、その経路測度を $P_R$ とする。$\Theta X$ を $t\mapsto X_{\tau-t}$ と定め、逆実験の記録を反転した測度を $Q=\Theta_*P_R$ とする。対応する正逆経路の密度比が定義できる場合、

$$
\sigma=\log\frac{dP_F}{dQ}
$$

> を無次元の全エントロピー生成とする。$dP_F/dQ$ は単一時刻の位置密度比ではなく、**経路全体の測度比**である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd11-reversed-path -->
### 直接例：一つの短い増分を逆に読む

$F>0$ とし、一歩で $z>0$ 進む記録を逆から読むと $-z$ 進む記録になります。密度は $g_h(z)$ と $g_h(-z)$ なので、

$$
\log\frac{g_h(z)}{g_h(-z)}
=\frac{(-z-vh)^2-(z-vh)^2}{4Dh}
=\frac{vz}{D}=\beta Fz.
$$

**定義の確認**：$D,h>0$ なので両密度は正で、比は有限です。実験の全区間を一歩 $h=\tau$ とみなすと、始点 $x_0$、終点 $x_\tau=x_0+z\pmod L$ の記録の正逆密度はそれぞれ

$$
\rho_0(x_0)g_\tau(z),\qquad \rho_\tau(x_\tau)g_\tau(-z)
$$

です。従ってその対数比は

$$
\log\frac{\rho_0(x_0)}{\rho_\tau(x_\tau)}+\beta Fz
$$

となり、正の端点密度によって比が定義できます。$z<0$ では一歩の **浴エントロピーへの寄与** $\beta Fz$ は負ですが、全経路の $\sigma$ には境界項も加わります。境界項が零の定常例では、負の全エントロピー生成の経路も正の平均第二法則と両立します。
<!-- definition-example-end -->

<a id="thm-itd11-path-ratio"></a>

<!-- formal-statement-start -->
> **定理（円周Langevin経路の時間反転比）**
> $L,\tau,\mu,T>0$、$F\in\mathbb R$ とし、初期密度 $\rho_0$ は円周上で連続・厳密に正・積分1とする。[正逆経路測度](#def-itd11-reversed-path) $P_F,Q$ は互いに絶対連続であり、ほとんど全ての経路で

$$
\sigma
=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\frac{v}{D}Y
=\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}
+\beta Q_{\mathrm{bath}}.
$$

> 一様初期密度 $\rho_0=1/L$ の場合は $\rho_\tau=1/L$ であり、$\sigma=\beta FY$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の観測時刻を選び、増分の正規密度を掛け合わせます。逆経路では順序が逆になり、各増分に負号が付くので、一歩の比が $e^{vz/D}$ です。積の比は合計変位 $Y$ のみに依存します。最後に、有限時刻の全記録が連続経路の測度を決めることを使います。

<!-- proof-start -->
### 証明

$0=t_0<t_1<\cdots<t_n=\tau$、$h_j=t_j-t_{j-1}$、$z_j=Z_{t_j}-Z_{t_{j-1}}$ とします。始点 $x_0\in[0,L)$ と**持ち上げ増分** $z_1,\ldots,z_n\in\mathbb R$ に関する正方向の結合密度は、[Brown運動の独立増分](../../../解析系/STO/STO4/index.md#thm-sto4-brownian-construction)から

$$
f_F(x_0,z_1,\ldots,z_n)=\rho_0(x_0)\prod_{j=1}^n g_{h_j}(z_j).
$$

時間反転した記録を逆実験で得るとき、逆実験の始点は $x_\tau=x_0+\sum_jz_j\pmod L$、増分は $-z_n,\ldots,-z_1$ です。この変数変換で、増分を固定したまま $x_0$ を動かすと $x_\tau$ は円周上の平行移動（長さを保存）になります。また増分は順序を逆にして各符号を反転するだけです。従って座標 $(x_0,z_1,\ldots,z_n)$ から $(x_\tau,-z_n,\ldots,-z_1)$ へのJacobianの絶対値は、円周の代表点が切り替わる零測度の境界を除いて1です。対応する密度は

$$
f_R(x_\tau,-z_n,\ldots,-z_1)
=\rho_\tau(x_\tau)\prod_{j=1}^n g_{h_j}(-z_j).
$$

一歩の比は[直接例](#def-itd11-reversed-path)と同じ平方の差により

$$
\frac{g_h(z)}{g_h(-z)}
=\exp\left(\frac{(z+vh)^2-(z-vh)^2}{4Dh}\right)
=e^{vz/D}.
$$

従って有限記録の比は

$$
\frac{f_F}{f_R}
=\frac{\rho_0(x_0)}{\rho_\tau(x_\tau)}
\prod_{j=1}^ne^{vz_j/D}
=\frac{\rho_0(x_0)}{\rho_\tau(x_\tau)}e^{vY/D}.
$$

ここまでは任意の分割について**厳密な等式**で、Euler近似の極限ではありません。右辺を $G$ と置くと、$G>0$、$G$ は始点・終点・全変位だけで決まり、分割に依存しません。$P_F$ の有限時刻記録の確率は、どの分割でも $\int G\,dQ$ と一致します。

連続経路は始点と有理時刻の位置（および連続に持ち上げた増分）で決まります。実際、始点の代表点 $Z_0$ と、原点から始まる実数値連続経路 $Z_t-Z_0$ の組に戻せば、[STO4の連続経路の座標生成](../../../解析系/STO/STO4/index.md#lem-sto4-path-borel-coordinates)を後者に適用できます。

円周への射影は連続で、初期代表点を選んだ持ち上げは局所的な円弧上で経路を追うことによりBorel可測に復元できます。従って有限記録の円筒事象は円周経路のBorel事象を生成します。

両辺は有限測度なので、円筒事象での一致を単調族で延長すると、全経路事象 $A$ に対して

$$
P_F(A)=\int_A G\,dQ
$$

が成立します。$\rho_0,\rho_\tau$ は正、$G$ も正であるため逆向きの絶対連続性も成立し、$dP_F/dQ=G$ です。

最後に $v/D=\mu F/(\mu k_{\mathrm B}T)=\beta F$ と[仕事・熱の定義](#def-itd11-driven-ring)の $FY=Q_{\mathrm{bath}}$ を使います。初期密度が一定値 $1/L$ なら、一定ドリフトとBrown増分による平行移動を平均しても円周上の密度は $1/L$ のままなので端点密度比は1です。
<!-- proof-end -->

この定理は「確率積分の第一法則」だけでは証明できない部分を埋めています。**連続経路の測度比が存在する**ことを正のGaussian増分から確かめたうえで、その値が浴熱と境界エントロピーに分かれることを示しました。

## 3. ゆらぎ関係と正負の軌道

以下、$\mathbb E_F$ は正方向の経路測度 $P_F$ に関する期待値、$H(\rho)$ は円周上の密度 $\rho$ のエントロピー $-\int_0^L\rho(x)\log\rho(x)\,dx$ を表します。

<a id="thm-itd11-fluctuation"></a>

<!-- formal-statement-start -->
> **定理（連続経路の積分型ゆらぎ関係と平均第二法則）**
> [円周Langevin経路の時間反転比](#thm-itd11-path-ratio)の仮定の下で

$$
\mathbb E_F[e^{-\sigma}]=1,
\qquad
\mathbb E_F[\sigma]
=H(\rho_\tau)-H(\rho_0)+\beta Fv\tau\ge0,
$$

> ここで $H(\rho)=-\int_0^L\rho(x)\log\rho(x)\,dx$ である。特に一様初期分布なら

$$
\mathbb E_F[\sigma]=\frac{v^2\tau}{D}
=\frac{\mu F^2\tau}{k_{\mathrm B}T}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

指数平均は正規化された逆経路測度の質量そのものです。平均では始終の位置の対数密度がShannonエントロピー差になり、外力がなす平均仕事は $Fv\tau$ です。

<!-- proof-start -->
### 証明

[経路比](#thm-itd11-path-ratio)により $e^{-\sigma}=dQ/dP_F$ です。互いに絶対連続なので、経路全体で積分して

$$
\mathbb E_F[e^{-\sigma}]
=\int\frac{dQ}{dP_F}\,dP_F
=\int dQ=1.
$$

また $X_0\sim\rho_0$、$X_\tau\sim\rho_\tau$ なので、対数密度の期待値は

$$
\mathbb E_F\left[\log\frac{\rho_0(X_0)}{\rho_\tau(X_\tau)}\right]
=\int_0^L\rho_0\log\rho_0\,dx
-\int_0^L\rho_\tau\log\rho_\tau\,dx
=H(\rho_\tau)-H(\rho_0).
$$

$Y=v\tau+\sqrt{2D}B_\tau$ で $\mathbb E[B_\tau]=0$ ですから、$\mathbb E[Y]=v\tau$ です。以上を $\sigma$ の式へ代入して平均の等式を得ます。非負性は[ITD2のJensenによる第二法則](../ITD2/index.md#thm-itd2-ift)と同じく

$$
e^{-\mathbb E[\sigma]}
\le\mathbb E[e^{-\sigma}]=1
$$

から従います。端点密度が一様の場合は $H(\rho_\tau)-H(\rho_0)=0$、$\beta Fv\tau=(v/D)v\tau=v^2\tau/D$ です。
<!-- proof-end -->

平均では不可逆性は非負ですが、$F>0$ でも $Y<0$ の経路は正の確率で発生し、その経路の $\sigma=\beta FY$ は負です。これは[ITD1の逆実験と全エントロピー生成の定義](../ITD1/index.md#def-itd1-reverse-entropy)と矛盾しません。

<a id="prop-itd11-displacement-symmetry"></a>

<!-- formal-statement-start -->
> **命題（一様定常状態の変位の詳細ゆらぎ対称性）**
> [一定駆動模型](#def-itd11-driven-ring)の初期密度を $\rho_0=1/L$ とする。持ち上げ変位 $Y$ は正規分布 $N(v\tau,2D\tau)$ に従い、密度 $f(y)$ は任意の $y\in\mathbb R$ について

$$
\frac{f(y)}{f(-y)}=e^{\beta Fy}.
$$

> 特に $\sigma=\beta FY$ の平均は $v^2\tau/D$、分散は $2v^2\tau/D$ である。
<!-- formal-statement-end -->

### 証明の見取り図

軌道全体を知る代わりに、今回は合計変位だけで経路比が決まります。Gaussian密度の平方の差が、そのまま詳細型のゆらぎ関係になります。

<!-- proof-start -->
### 証明

[Brown運動の正規分布](../../../解析系/STO/STO4/index.md#thm-sto4-brownian-construction)から $Y=v\tau+\sqrt{2D}B_\tau$ の密度は

$$
f(y)=\frac{1}{\sqrt{4\pi D\tau}}
\exp\left(-\frac{(y-v\tau)^2}{4D\tau}\right).
$$

従って

$$
\log\frac{f(y)}{f(-y)}
=\frac{(-y-v\tau)^2-(y-v\tau)^2}{4D\tau}
=\frac{4yv\tau}{4D\tau}
=\frac{v}{D}y=\beta Fy.
$$

線形変換 $\sigma=\beta FY=(v/D)Y$ の平均は $(v/D)v\tau=v^2\tau/D$、分散は $(v/D)^2(2D\tau)=2v^2\tau/D$ です。$F=0$ の場合は $\sigma=0$ が確定し、比の式も $1=1$ のまま成立します。
<!-- proof-end -->

**直接検算：** Gaussianの指数積率を使うと、一様初期条件について

$$
\begin{aligned}
\mathbb E_F[e^{-\sigma}]
&=\exp\left(-\frac{v}{D}v\tau
+\frac12\frac{v^2}{D^2}(2D\tau)\right)\\
&=\exp(-v^2\tau/D+v^2\tau/D)=1.
\end{aligned}
$$

この計算は経路測度の証明を代用しませんが、そこから導いた式の符号・係数・分散を別の方法で点検できます。

## 4. 終点や一ビット観測だけでは散逸が分からない

位置 $X_\tau$ だけの測定は周回数を忘れます。より単純な粗視化として、持ち上げ変位の**正負一ビット** $S=\boldsymbol{1}_{\{Y>0\}}$ だけを保存しましょう。これは $Y>0$ のとき1、それ以外で0となる指示関数です。$F>0$ とし、$a=v\sqrt{\tau/(2D)}>0$、標準正規分布の累積分布関数を $\Phi$ と書きます。

一様初期分布の正方向では $Y\sim N(v\tau,2D\tau)$、時間反転して対応させた逆実験 $Q$ では $Y\sim N(-v\tau,2D\tau)$ です。

[ITD7で用いた相対エントロピー](../ITD7/index.md#thm-itd7-coarse-kl-chain)を連続密度に対して

$$
D(P\|Q)=\int\log\frac{dP}{dQ}\,dP
$$

と書きます。この括弧付きの $D(P\|Q)$ は、拡散係数 $D=\mu k_{\mathrm B}T$ とは別物です。完全記録の平均散逸は $D(P_F\|Q)=\mathbb E_F[\sigma]$ であり、今回は経路比が $Y$ のみで決まるため、変位分布の相対エントロピーとも一致します。観測を一ビットへ圧縮したら、いくら残るでしょうか。

<a id="thm-itd11-sign-coarse-graining"></a>

<!-- formal-statement-start -->
> **定理（変位の符号しか見ないと散逸を過小評価する）**
> [一様定常状態の変位対称性](#prop-itd11-displacement-symmetry)の模型で $F>0$ とし、$S=\boldsymbol{1}_{\{Y>0\}}$ とする。$p=\Phi(a)$、$a=v\sqrt{\tau/(2D)}$ とおけば、正方向と対応逆方向の $S=1$ の確率はそれぞれ $p$ と $1-p$ であり、観測で得られる相対エントロピーは

$$
\Sigma_{\mathrm{sign}}
=(2p-1)\log\frac{p}{1-p}.
$$

> しかも $F>0$、$\tau>0$ のとき、完全記録の平均散逸との間に**厳密な不等号**が成り立つ。

$$
0<\Sigma_{\mathrm{sign}}<\mathbb E_F[\sigma]
=\frac{v^2\tau}{D}=2a^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正の変位か負の変位かを知っても、実際に何周・何メートル進んだかは失われます。各符号の内部の条件付き密度が正逆実験で異なれば、その差に対応する散逸は観測されません。これは[ITD7の有限経路の粗視化分解](../ITD7/index.md#thm-itd7-coarse-kl-chain)を、今回の具体的な正規密度について積分で作り直したものです。

<!-- proof-start -->
### 証明

$Y$ の正方向密度を $f_+(y)$（分布は $N(v\tau,2D\tau)$）、逆方向密度を $f_-(y)$（分布は $N(-v\tau,2D\tau)$）とします。標準化して

$$
P_F(Y>0)=\Phi\left(\frac{v\tau}{\sqrt{2D\tau}}\right)=p,
\qquad Q(Y>0)=\Phi(-a)=1-p.
$$

符号の二値分布は $P_S=(p,1-p)$、$Q_S=(1-p,p)$ なので、直接和を取ると

$$
D(P_S\|Q_S)
=p\log\frac{p}{1-p}
+(1-p)\log\frac{1-p}{p}
=(2p-1)\log\frac{p}{1-p}.
$$

$a>0$ では $1/2<p<1$ よりこれは正です。次に $A_+=(0,\infty)$、$A_-=(-\infty,0)$ と置き、各符号領域で条件付き密度 $f_+(y\mid A)$、$f_-(y\mid A)$ をそれぞれ元の密度を当該領域の確率で割って定めます。各領域で

$$
\log\frac{f_+(y)}{f_-(y)}
=\log\frac{P_F(A)}{Q(A)}
+\log\frac{f_+(y\mid A)}{f_-(y\mid A)}.
$$

これに $f_+(y)$ を掛けて両領域で積分すると

$$
D(f_+\|f_-)
=D(P_S\|Q_S)
+\sum_{A\in\{A_+,A_-\}}P_F(A)
 D(f_+(\cdot\mid A)\|f_-(\cdot\mid A)).
$$

条件付きの相対エントロピーは非負です。実際、確率密度 $r,s$ がほとんど至る所で正のとき、$\log u\le u-1$ を $u=s/r$ に適用して

$$
\int r\log\frac{r}{s}
\ge\int r\left(1-\frac{s}{r}\right)
=\int r-\int s=0
$$

となり、等号は $r=s$ がほとんど至る所で成立するときに限ります。今回 $f_+(y)/f_-(y)=e^{vy/D}$ は各半直線内で定数ではありません。従って各条件付き密度も一致せず、残差は厳密に正です。さらに[経路比](#thm-itd11-path-ratio)と[変位の密度比](#prop-itd11-displacement-symmetry)は共に $(v/D)Y$ のみを与えるので、

$$
D(P_F\|Q)=\mathbb E_F\left[\log\frac{dP_F}{dQ}\right]
=\mathbb E_F\left[\log\frac{f_+(Y)}{f_-(Y)}\right]
=D(f_+\|f_-)=\frac vD\mathbb E_F[Y]
=\frac{v^2\tau}{D}=2a^2.
$$

これを分解式へ代入して結論を得ます。
<!-- proof-end -->

**限界の読み方：** 一ビット観測の相対エントロピーは下限であって、全散逸そのものではありません。周回数を落とした終点記録、時間分解能の低い観測、複数浴のラベル消去では、別の粗視化写像を明示して同じ問いを立てます。無条件に同じ数値の補正を使うことはできません。

## 5. どこから一般Langevin理論になるか

今回の計算が閉じたのは、**加法的・一定拡散、一定の駆動、円周上の正の初期密度、全周回を含む連続経路**だからです。

- $F$ が位置や時刻で変わると $g_h(z)/g_h(-z)$ の単純な積にはなりません。正逆プロトコル、Jacobian・確率積分の規約、必要なら確率測度の変換を改めて証明します。
- $D$ が位置に依存すると、伊藤とStratonovichのドリフト補正、境界と熱の定義をそろえる必要があります。[ITD7の伊藤補正](../ITD7/index.md#prop-itd7-stratonovich-balance)を忘れてはいけません。
- 初期密度に零点がある、拡散が退化する、観測が軌道の一部だけである場合は、正逆経路の支持が一致するかを再検査します。[ITD2の支持欠損](../ITD2/index.md#prop-itd2-support-correction)はその警告です。
- 量子測定では非可換な状態・測定反作用が入り、本章の古典経路密度比がそのまま量子の仕事分布を決めるわけではありません。

## 6. 演習：経路・反転・粗視化を独立に検算する

以下では $L,\tau,\mu,T>0$、$D=\mu k_{\mathrm B}T$、$v=\mu F$、$Y=Z_\tau-Z_0$、$\beta=(k_{\mathrm B}T)^{-1}$ とします。$F>0$ の指定がない場合、$F=0$ や負の力も許します。

### A1. 平均と分散を熱に直す

- Level: A
- ID: ITD11-A1
- 問題: 初期密度が一様な一定駆動模型で $\mathbb E[Y]$、$\operatorname{Var}(Y)$、$\mathbb E[Q_{\mathrm{bath}}]$、$\mathbb E[\sigma]$ を求め、エントロピー生成の単位がないことを確認せよ。

<!-- solution-start -->
**詳細解答**

$Y=v\tau+\sqrt{2D}B_\tau$ で $\mathbb E[B_\tau]=0$、$\operatorname{Var}(B_\tau)=\tau$ だから

$$
\mathbb E[Y]=v\tau,\qquad\operatorname{Var}(Y)=2D\tau.
$$

[一定駆動の円周Langevin経路と持ち上げ変位](#def-itd11-driven-ring)から $Q_{\mathrm{bath}}=FY$、[時間反転比](#thm-itd11-path-ratio)から $\sigma=\beta FY$ です。従って

$$
\mathbb E[Q_{\mathrm{bath}}]=Fv\tau,
\qquad \mathbb E[\sigma]=\beta Fv\tau=v^2\tau/D.
$$

$\beta$ はエネルギーの逆数、$FY$ は力×長さでエネルギーです。従って $\sigma$ は無次元でnat単位です。
<!-- solution-end -->

### A2. Gaussian増分の比の符号

- Level: A
- ID: ITD11-A2
- 問題: $g_h(z)=(4\pi Dh)^{-1/2}\exp(-(z-vh)^2/(4Dh))$ に対し $g_h(z)/g_h(-z)$ を計算し、$F>0,z<0$ で比が1より小さい理由を述べよ。

<!-- solution-start -->
**詳細解答**

分母・分子の規格化係数を消すと

$$
\log\frac{g_h(z)}{g_h(-z)}
=\frac{(z+vh)^2-(z-vh)^2}{4Dh}
=\frac{4zvh}{4Dh}=vz/D=\beta Fz.
$$

$F>0$ なら $v>0$、$z<0$ では指数が負なので $g_h(z)/g_h(-z)<1$ です。逆向きの短い変位は、同じ大きさの順向きの変位より起こりにくいという意味です。
<!-- solution-end -->

### A3. 終点密度の境界項

- Level: A
- ID: ITD11-A3
- 問題: ある経路で $\rho_0(X_0)=2/L$、$\rho_\tau(X_\tau)=1/L$、$\beta FY=3$ とする。$\sigma$ を求めよ。また $\rho_0(X_0)=\rho_\tau(X_\tau)$ なら何が変わるか。これらの値は密度の**点値**であり、円周全体で一様密度が $2/L$ だという仮定ではない。

<!-- solution-start -->
**詳細解答**

[経路確率比の定理](#thm-itd11-path-ratio)の対数密度比は $\log((2/L)/(1/L))=\log2$ です。従って $\sigma=\log2+3$。同じ点値であれば対数項は $\log1=0$ となり、$\sigma=3$ です。密度は単位長さ当たりの確率ですが、**比**には長さの単位が残りません。
<!-- solution-end -->

### A4. ゼロ駆動のゆらぎ

- Level: A
- ID: ITD11-A4
- 問題: 一様初期条件で $F=0$ とした場合、$Y$ の分布、$Q_{\mathrm{bath}}$、$\sigma$、指数平均を求めよ。粒子が動くことと、散逸が起きることを区別せよ。

<!-- solution-start -->
**詳細解答**

$F=0$ なら $v=0$ で、$Y=\sqrt{2D}B_\tau\sim N(0,2D\tau)$ です。$D,\tau>0$ だから変位は非自明に揺らぎますが、[仕事・熱の定義](#def-itd11-driven-ring)では $Q_{\mathrm{bath}}=FY=0$ です。初期一様密度は終端でも一様なので [時間反転比](#thm-itd11-path-ratio)の境界項も零、$\sigma=0$ が確定します。従って $\mathbb E[e^{-\sigma}]=1$ です。
<!-- solution-end -->

### A5. 一ビット観測の確率

- Level: A
- ID: ITD11-A5
- 問題: $a=v\sqrt{\tau/(2D)}>0$、$p=\Phi(a)$ とする。$P_F(Y>0)$、$Q(Y>0)$ と符号観測の相対エントロピーを求め、$a\downarrow0$ の極限を述べよ。

<!-- solution-start -->
**詳細解答**

正方向 $Y$ は平均 $v\tau$、標準偏差 $\sqrt{2D\tau}$ なので

$$
P_F(Y>0)=\Phi(a)=p,\qquad Q(Y>0)=\Phi(-a)=1-p.
$$

二値分布 $(p,1-p)$ と $(1-p,p)$ の相対エントロピーは

$$
p\log\frac{p}{1-p}+(1-p)\log\frac{1-p}{p}
=(2p-1)\log\frac{p}{1-p}.
$$

$a\downarrow0$ で $p\to1/2$ なので、両因子は零へ収束し、相対エントロピーも零へ収束します。
<!-- solution-end -->

### B1. 非一様初期分布で分割を増やす

- Level: B
- ID: ITD11-B1
- 問題: $0=t_0<t_1<t_2=\tau$、増分 $z_1,z_2$、各区間長 $h_1,h_2>0$ とする。正方向の初期密度 $\rho_0$、逆方向の初期密度 $\rho_\tau$ を用い、正逆経路密度比を展開せよ。同じ結果が分割を三つ以上に増やしても変わらないことを示せ。

<!-- solution-start -->
**詳細解答**

正方向の密度は $\rho_0(x_0)g_{h_1}(z_1)g_{h_2}(z_2)$、反転した逆記録の密度は $\rho_\tau(x_\tau)g_{h_2}(-z_2)g_{h_1}(-z_1)$ です。従って

$$
\begin{aligned}
\log\frac{f_F}{f_R}
&=\log\frac{\rho_0(x_0)}{\rho_\tau(x_\tau)}
+\log\frac{g_{h_1}(z_1)}{g_{h_1}(-z_1)}
+\log\frac{g_{h_2}(z_2)}{g_{h_2}(-z_2)}\\
&=\log\frac{\rho_0(x_0)}{\rho_\tau(x_\tau)}
+\frac vD(z_1+z_2).
\end{aligned}
$$

最後の和は $Z_\tau-Z_0=Y$ です。任意の分割でも各 $\log(g_h(z)/g_h(-z))=vz/D$ を足すだけなので、総和 $vY/D$ と端点比は変わりません。
<!-- solution-end -->

### B2. 詳細型と積分型を別々に導く

- Level: B
- ID: ITD11-B2
- 問題: 一様初期条件で $F\ne0$ のとき、$Y$ の正規密度から $f(y)/f(-y)$ を導き、さらに正規分布の指数積率から $\mathbb E[e^{-\beta FY}]=1$ を独立に確かめよ。$\operatorname{Var}(\beta FY)$ と $\mathbb E[\beta FY]$ の関係も示せ。

<!-- solution-start -->
**詳細解答**

$f(y)=(4\pi D\tau)^{-1/2}\exp(-(y-v\tau)^2/(4D\tau))$ なので

$$
\log\frac{f(y)}{f(-y)}
=\frac{(y+v\tau)^2-(y-v\tau)^2}{4D\tau}
=vy/D=\beta Fy.
$$

正規変数 $Y$ の指数積率は $\mathbb E[e^{tY}]=e^{tv\tau+t^2D\tau}$ です。$t=-\beta F=-v/D$ を代入して

$$
\mathbb E[e^{-\beta FY}]
=\exp\left(-\frac{v^2\tau}{D}+\frac{v^2\tau}{D}\right)=1.
$$

$\mathbb E[\beta FY]=v^2\tau/D$ に対して分散は $(v/D)^2(2D\tau)=2v^2\tau/D$、すなわち分散が平均の2倍です。これはこの正規定常模型固有であり、一般系の公式ではありません。
<!-- solution-end -->

### B3. 粗視化で等号が成り立たない理由

- Level: B
- ID: ITD11-B3
- 問題: $F>0$ とし、$Y$ の符号 $S$ だけを記録する。$D(f_+\|f_-)-D(P_S\|Q_S)$ を二つの条件付き相対エントロピーへ分解し、なぜ零にならないかを示せ。

<!-- solution-start -->
**詳細解答**

$A_+=(0,\infty)$、$A_-=(-\infty,0)$ と置きます。$y\in A$ において

$$
f_+(y)=P_F(A)f_+(y\mid A),
\qquad f_-(y)=Q(A)f_-(y\mid A).
$$

比の対数を二項に分け、$f_+$ を掛けて領域別に積分すると

$$
D(f_+\|f_-)-D(P_S\|Q_S)
=\sum_{A\in\{A_+,A_-\}}P_F(A)
D(f_+(\cdot\mid A)\|f_-(\cdot\mid A)).
$$

各項は $\log u\le u-1$ によるGibbs不等式で非負です。条件付き密度が一致するなら領域内で $f_+(y)/f_-(y)$ が定数になるはずですが、その比は $e^{vy/D}$ です。$v>0$ で各半直線にわたって変化するため、双方の条件付き相対エントロピーは正です。従って差は厳密に正です。
<!-- solution-end -->

### B4. 円周の終点から消えた周回

- Level: B
- ID: ITD11-B4
- 問題: $L>0,F>0$、一様初期密度とする。$Z_0=x_0$ から $Z_\tau=x_0$ へ戻る連続経路と、$Z_\tau=x_0+L$ へ一周する連続経路について、観測された $X_\tau$、持ち上げ変位 $Y$、$\sigma$ を比較せよ。なぜ端点位置だけの記録からゆらぎ関係の個々の項を計算できないか。

<!-- solution-start -->
**詳細解答**

どちらも円周位置は $X_\tau=x_0\pmod L$ です。第一の経路は $Y=0$、第二は $Y=L$ なので [一様状態の経路比](#thm-itd11-path-ratio)から

$$
\sigma_1=\beta F\cdot0=0,
\qquad\sigma_2=\beta FL>0.
$$

同じ端点に対応する実数上の持ち上げ終点は $x_0+nL$（$n\in\mathbb Z$）であり、散逸は $\beta FnL$ と変わります。端点の円周位置だけでは整数 $n$ を特定できません。なお連続確率分布では個々の**正確な経路**の確率は零であり、比較しているのは可能な経路記録に付く確率密度比の値です。
<!-- solution-end -->

### C1. 経路の正規化・情報損失・仕事を一つにまとめる

- Level: C
- ID: ITD11-C1
- 問題: $F>0$、一様初期分布の円周Langevin模型で、(i) 正逆全経路比、(ii) 積分型ゆらぎ関係と平均仕事・平均散逸、(iii) 正負一ビット観測による散逸下限を、異なる出発点から計算せよ。$a=v\sqrt{\tau/(2D)}$ として、完全記録と一ビット記録の間に厳密な差が出る原因を数学的に説明せよ。$\Delta U$ と $Q_{\mathrm{bath}}$ の符号も照合せよ。

<!-- solution-start -->
**詳細解答**

**(i) 経路の比。** 一歩のGaussian増分に対して

$$
\log\frac{g_h(z)}{g_h(-z)}=\frac{(z+vh)^2-(z-vh)^2}{4Dh}=\frac{vz}{D}.
$$

全分割の増分を足すと $\sum_jz_j=Y$ です。一様初期密度 $1/L$ は終端でも同じなので境界の密度比は1。従って [経路比の定理](#thm-itd11-path-ratio)の結論を独立に再構成して $\sigma=vY/D=\beta FY$ となります。全経路の絶対連続性は各Gaussian密度と端点密度の正値性、円筒記録からの測度の延長によって保証されます。

**(ii) 平均と指数平均。** $Y\sim N(v\tau,2D\tau)$ なので

$$
\mathbb E[W]=Fv\tau,
\qquad\mathbb E[\sigma]=\beta Fv\tau=\frac{v^2\tau}{D}=2a^2.
$$

また $\mathbb E[e^{tY}]=e^{tv\tau+t^2D\tau}$ に $t=-v/D$ を代入すれば

$$
\mathbb E[e^{-\sigma}]
=e^{-v^2\tau/D+(v^2/D^2)D\tau}=1.
$$

内部エネルギーは常に零で $\Delta U=0$、仕事が入る向きが正なので $Q_{\mathrm{bath}}=W=FY$ です。従って $\Delta U=W-Q_{\mathrm{bath}}=0$、浴エントロピーの平均増加は $\beta Fv\tau$ で非負です。

**(iii) 一ビットへの圧縮。** $P_F(Y>0)=p=\Phi(a)$、$Q(Y>0)=1-p$ なので

$$
\Sigma_{\mathrm{sign}}=(2p-1)\log\frac{p}{1-p}.
$$

正方向・逆方向の連続密度をそれぞれ $f_+,f_-$ と書くと、符号 $A_+$、$A_-$ ごとに対数比を「符号の確率比」と「符号内の条件付き密度比」に分けられます。積分すると

$$
2a^2-\Sigma_{\mathrm{sign}}
=\sum_{A\in\{A_+,A_-\}}P_F(A)
D(f_+(\cdot\mid A)\|f_-(\cdot\mid A))>0.
$$

最後の不等号は $f_+(y)/f_-(y)=e^{vy/D}$ が各半直線内で一定ではないことと、[Gibbs不等式](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)を条件付き密度について積分で示した第4節の論証によります。符号を一ビットで記録しても、**変位の大きさという区別**を失うため、その区別に含まれる不可逆性を回復できません。
<!-- solution-end -->

## 7. 学習のまとめ

有限ジャンプ過程の経路確率比は、今回の一定駆動拡散では**任意の時刻分割で正確なGaussian増分の積**として再導出できました。連続経路の測度の一致へ延長することで、浴熱と境界エントロピーの和、指数平均1、平均第二法則を曖昧な「経路確率密度」の比に頼らず説明できました。

同時に、円周の終点だけでは周回数を、符号観測だけでは変位の大きさを失います。観測者が測った小さい不可逆性を、装置全体で本当に発生した不可逆性と取り違えないことが、[ITD7の隠れた散逸](../ITD7/index.md#def-itd7-coarse-observation)から続く教訓です。
