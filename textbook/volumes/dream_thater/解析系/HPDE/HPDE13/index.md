# HPDE13 Hadamard係数とtransport方程式

[HPDE12の3+1次元遅延点源基本解](../HPDE12/index.md#thm-hpde12-three-dimensional)は、光円錐面だけに支えられていました。ところが時空を曲げたり質量項を加えたりすると、光円錐の内側にも応答が残り得ます。点源の応答を最初から解く代わりに、**円錐面の特異項と内部の補正項を順番に決定する**方法を考えます。その順番を決めるのがHadamard係数の輸送方程式です。

以下では時空次元を $d$ と書き、主計算は $d=4$（空間3次元）で行います。時間向き付きLorentz計量の符号は $(-,+,+,+)$、$\Box_g=\operatorname{tr}_g\nabla^2$、波動型作用素は

$$
P=-\operatorname{tr}_g\nabla^2+B
$$

とします。$E\to M$ は有限ランクの実または複素ベクトル束、$\nabla$ は接続、$B\in\Gamma(\operatorname{End}E)$ は滑らかな零次項です。これは[HPDE5の接続分解](../HPDE5/index.md#thm-hpde5-unique-connection)に基づく表示です。束の形式的自己随伴性は仮定しません。点源と束値超関数には[HPDE3の点源](../HPDE3/index.md#def-hpde3-point-source)と[HPDE4の分布への延長](../HPDE4/index.md#prop-hpde4-distribution-extension)を使います。

## 1. 曲がった時空で「二点の距離の二乗」をどう測るか

平坦時空の点源を原点から $y$ に移したとき、光円錐は $(t-s)^2-|x-z|^2=0$ で決まりました。曲がった時空では二点の座標差そのものに幾何学的意味がありません。そこで、二点を結ぶ**一意な短い測地線の初速度**を使います。[LORG5の凸正規近傍](../../../幾何系/LORG/LORG5/index.md#def-lorg5-convex-normal)を選べば、近傍 $U$ 内の任意の二点 $x,y$ は $U$ 内のただ一つの測地線で結ばれます。[指数写像](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-lorentz-exponential)で $x=\exp_y(v)$ と表せます。

<a id="def-hpde13-world-function"></a>
<!-- formal-statement-start -->
> **定義（Syngeの世界関数と放射ベクトル場）**  
> $U$ を時間向き付きLorentz多様体 $(M,g)$ の測地的凸正規近傍とする。$x,y\in U$ に対し $x=\exp_y(v)$ を満たす一意な $v\in T_yM$ を取り、世界関数とその第一変数方向の放射ベクトル場を

$$
\sigma(x,y)=\frac12g_y(v,v),
\qquad
Z=\operatorname{grad}_x\sigma
$$

> と定める。微分 $\nabla_x$、$\Box_x$ は $x$ のみを動かす。$\sigma<0$、$\sigma=0$、$\sigma>0$ はそれぞれ測地線初速度の時間的・光的・空間的な因果型に対応する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde13-world-function -->
**定義の確認**。最小例としてMinkowski時空の $y=0$ を取れば

$$
\sigma(t,x;0)=\frac12(-t^2+|x|^2),\qquad
Z=t\partial_t+\sum_{i=1}^{d-1}x^i\partial_{x^i}.
$$

この例では $\sigma=0$ が通常の光円錐、$\sigma<0$ がその内部です。曲がった場合にも測地線の速度の因果型が保存されることは[測地線の因果型保存](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)によります。
<!-- definition-example-end -->

<a id="lem-hpde13-eikonal"></a>
<!-- formal-statement-start -->
> **補題（世界関数のアイコナール恒等式）**  
> $U$ を上記の凸正規近傍とする。任意の $x,y\in U$ で

$$
g_x(Z,Z)=2\sigma(x,y),\qquad
Z_{\gamma(s)}=s\dot\gamma(s)
$$

> が成り立つ。ただし $\gamma(s)=\exp_y(sv)$、$0\le s\le1$、$\gamma(1)=x$ とし、$Z$ は第一変数で評価する。
<!-- formal-statement-end -->

### 証明の見取り図

短い測地線を伸縮すると、世界関数は伸縮率の二乗で変わります。$x$ に関する微分が測地線終端の速度に等しいことは[LORG5のGaussの補題](../../../幾何系/LORG/LORG5/index.md#thm-lorg5-gauss-lemma)から得られます。

<!-- proof-start -->
### 証明

$w\in T_xM$ に対して $x$ を $w$ 方向に変化させ、その変化を測地線の滑らかな変分 $\gamma_\varepsilon(s)$ で表します。エネルギー $E(\gamma_\varepsilon)=\frac12\int_0^1g(\dot\gamma_\varepsilon,\dot\gamma_\varepsilon)\,ds$ は測地線の速さが一定なので $\sigma(x_\varepsilon,y)$ です。接続が計量と両立し、各 $\gamma_\varepsilon$ が測地線であるため、変分場 $W=\partial_\varepsilon\gamma_\varepsilon|_0$ を用いると

$$
\begin{aligned}
d_x\sigma(w)
&=\int_0^1g(\nabla_sW,\dot\gamma)\,ds\\
&=[g(W,\dot\gamma)]_0^1
-\int_0^1g(W,\nabla_s\dot\gamma)\,ds\\
&=g_x(w,\dot\gamma(1)).
\end{aligned}
$$

始点を固定したので $W(0)=0$、[Lorentz測地線方程式](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-geodesic-causal-type)から $\nabla_s\dot\gamma=0$ です。したがって $Z_x=\dot\gamma(1)$。また $\exp_y(sv)$ を終点とする区間 $[0,1]$ 上の測地線は $u\mapsto\exp_y(usv)$ であり、終端速度は $s\dot\gamma(s)$。最後に

$$
g_x(Z_x,Z_x)=g_y(v,v)=2\sigma(x,y)
$$

です。$s=0$ では両辺とも連続的に零へ延長されます。$\square$
<!-- proof-end -->

## 2. Riesz分布：光円錐の「面」と「内部」を一つの系列で扱う

ここでは一度平坦時空へ戻り、$q=t^2-|x|^2=-2\sigma$ と置きます。$H(t-|x|)$ は未来の光円錐内部と境界の指示関数を表す階段関数です。[HPDE12の基本解](../HPDE12/index.md#thm-hpde12-three-dimensional)は $q=0$ 上のデルタであり、積分核の正規化も確定しています。

<a id="def-hpde13-riesz"></a>
<!-- formal-statement-start -->
> **定義（平坦時空の未来向きRiesz分布）**  
> $d=4$ のMinkowski時空で $P_0=-\Box_g=\partial_t^2-\Delta$ とする。$R_+(0)=\delta_0$、$R_+(2)$ を

$$
R_+(2)=\frac{H(t)\delta(\sigma)}{4\pi}
$$

> とし、$k\ge1$ に対して

$$
R_+(2k+2)=
\frac{q^{k-1}H(t-|x|)}
{8\pi\,4^{k-1}(k-1)!\,k!}
$$

> を局所可積分関数が定める分布とする。$R_+(2)$ の式は円錐頂点を含め、[球面積分による分布定義](../HPDE12/index.md#thm-hpde12-three-dimensional)で解釈する。$R_-(2k)$ は時間反転した過去向きの系列である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde13-riesz -->
**定義の確認**。$k=1$ で $R_+(4)=H(t-|x|)/(8\pi)$、$k=2$ で $R_+(6)=qH(t-|x|)/(64\pi)$。前者は内部で定数、後者は内部で $q$ に比例し、いずれも円錐の内側で零ではありません。一方、$R_+(2)$ は円錐面上にしか台を持ちません。デルタの係数を確かめるには $r=|x|>0$ において

$$
\delta(\sigma)=\delta((r^2-t^2)/2)
=\frac{\delta(t-r)+\delta(t+r)}{r}
$$

を使い、$H(t)$ により未来側だけを残します。頂点ではこの変形自体で定義したのではなく、先行章の球面積分に戻ります。
<!-- definition-example-end -->

<a id="thm-hpde13-riesz-recurrence"></a>
<!-- formal-statement-start -->
> **定理（4次元のRiesz再帰）**  
> 上の $d=4$ の未来向き・過去向きRiesz分布に対し、各整数 $k\ge0$ で

$$
P_0R_\pm(2k+2)=R_\pm(2k)
$$

> が分布の意味で成り立つ。従って $R_\pm(2)$ は点源基本解であり、各 $R_\pm(2k)$ の台は対応する閉因果円錐に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

$R_+(4)$ を微分すると円錐面のデルタが出ます。より高次では $q$ のべき乗の波動微分が前の次数を生み、境界項は $q=0$ のために消えます。最後の $R_+(2)\mapsto\delta_0$ だけは頂点での正規化が必要です。

<!-- proof-start -->
### 証明

空間半径 $r>0$ で分布微分を直接計算すると

$$
\begin{aligned}
P_0H(t-r)
&=\partial_t\delta(t-r)-\partial_r^2H(t-r)
-\frac2r\partial_rH(t-r)\\
&=\delta'(t-r)-\delta'(t-r)+\frac2r\delta(t-r)\\
&=\frac2r\delta(t-r).
\end{aligned}
$$

したがって $P_0R_+(4)=\delta(t-r)/(4\pi r)=R_+(2)$。頂点の追加点源項は現れません。これを確認するには $H(t-r)/(8\pi)$ を時空試験関数と対にし、$r\ge\varepsilon$ で二度部分積分した境界項を調べます。$r=\varepsilon$ の面積は $4\pi\varepsilon^2$、$H$ は有界で法線方向の一階微分の積分は $O(\varepsilon)$ なので、$\varepsilon\downarrow0$ の寄与は零です。

次に $q=t^2-r^2$ について、円錐内部では

$$
P_0q=8,\qquad
(\partial_tq)^2-|\nabla_xq|^2=4q.
$$

ゆえに積の微分から、整数 $j\ge1$ に対して

$$
P_0q^j=8jq^{j-1}+4j(j-1)q^{j-1}
=4j(j+1)q^{j-1}.
$$

$j\ge1$ の $q^jH(t-r)$ を微分したとき、$\partial_tq\,\partial_tH-\nabla q\cdot\nabla H$ は円錐上で $2(t-r)\delta(t-r)=0$ となり、$q^jP_0H$ も零です。従って $P_0(q^jH)=4j(j+1)q^{j-1}H$。$j=k-1$ として上の係数へ代入すると

$$
\frac{4(k-1)k}{8\pi\,4^{k-1}(k-1)!\,k!}
=\frac{1}{8\pi\,4^{k-2}(k-2)!\,(k-1)!}.
$$

これは $k\ge2$ で前の $R_+(2k)$ の係数です。最後に $P_0R_+(2)=\delta_0$ は[HPDE12の点源方程式](../HPDE12/index.md#thm-hpde12-three-dimensional)です。時間反転により過去側も従います。$\square$
<!-- proof-end -->

### 時空次元が変わると支持はどう変わるか

4次元に限らない形を確認します。$d\ge2$ の平坦時空で、最初は積分可能な $\operatorname{Re}\alpha>d-2$ に対して

$$
R_+^{(d)}(\alpha)=C(\alpha,d)\,
q^{(\alpha-d)/2}H(t-|x|),
\qquad
C(\alpha,d)=
\frac{2^{1-\alpha}\pi^{(2-d)/2}}
{\Gamma(\alpha/2)\Gamma((\alpha-d+2)/2)}
$$

です。Gamma関数は、実部が正の複素数 $z$ について

$$
\Gamma(z)=\int_0^\infty u^{z-1}e^{-u}\,du,\qquad
\Gamma(k)=(k-1)!\quad(k=1,2,\ldots)
$$

で定める関数です。二つ目の等式は部分積分による $\Gamma(z+1)=z\Gamma(z)$ と $\Gamma(1)=1$ から得られます。$d=2,\alpha=2$ で $R_+^{(2)}(2)=H(t-|x|)/2$、$d=4,\alpha=4$ で $R_+^{(4)}(4)=H(t-|x|)/(8\pi)$。下位のパラメータは試験関数に対する積分を境界近くでTaylor展開し、引き算した有限な剰余とGamma因子の零で延長する分布族として解釈します。この延長では $R_+^{(d)}(0)=\delta_0$ と正規化します。ただし一般の複素パラメータへの分布族の解析接続そのものはここで証明せず、以下で必要な $d=2,4$ の偶数パラメータの再帰は直接検算します。この延長を単に負のべき乗の「普通の関数」と読むことはできません。

<a id="prop-hpde13-dimension"></a>
<!-- formal-statement-start -->
> **命題（次元依存と一般のRiesz再帰）**  
> $d=2$ と $d=4$ で、上記の未来向き分布族の整数パラメータは

$$
P_0R_+^{(d)}(2k+2)=R_+^{(d)}(2k),
\quad k\ge0
$$

> を満たす。$d=2$ の $R_+^{(2)}(2)$ は円錐内部で非零であり、$d=4$ の $R_+^{(4)}(2)$ は円錐面上に集中する。$d=4$ では $k\ge1$ の $R_+^{(4)}(2k+2)$ は内部にも非零の値を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$d=2$ は係数が $(k-1)!$ の二乗となり、波動作用素が $q^j$ の次数を一つ下げます。$d=4$ はすでに証明しました。次元による円錐面と内部の違いは同じ $R_+(2)$ を比較すれば分かります。

<!-- proof-start -->
### 証明

$d=2$ では $q=t^2-x^2$、$P_0q=4$、$(\partial_tq)^2-(\partial_xq)^2=4q$ より

$$
P_0q^j=4j^2q^{j-1}.
$$

ここで $j\ge1$ の $q^jH(t-|x|)$ は円錐上で $q^j=0$ です。分布の積の微分に現れる境界項は、$q^j\delta(t-|x|)$ および $q^{j-1}(t-|x|)\delta(t-|x|)$ を含むため零となり、円錐頂点にも追加の点源項は生じません。従って分布として

$$
P_0\{q^jH(t-|x|)\}=4j^2q^{j-1}H(t-|x|).
$$

$R_+^{(2)}(2k)=q^{k-1}H(t-|x|)/[2^{2k-1}((k-1)!)^2]$（$k\ge1$）なので、$k\ge2$ で $4(k-1)^2$ を掛けると $R_+^{(2)}(2k-2)$ の係数が得られます。$k=1$ の点源関係は[HPDE12の1+1次元基本解](../HPDE12/index.md#thm-hpde12-one-dimensional)です。両次元の支持の違いは $H(t-r)$ と $\delta(t-r)$ の定義から直ちに従います。$\square$
<!-- proof-end -->

高い偶数次元では低次Riesz分布が円錐面上のデルタの導関数として現れ、奇数時空次元では円錐内部の冪型分布が現れます。**強いHuygens性が成立するかどうかは作用素の低階項にも依存する**ため、次元だけで任意の波動型作用素の尾の有無は判定できません。

## 3. van Vleck因子：測地線束の広がりを補正する

平坦時空では点源の球面積が $4\pi r^2$ と分かりました。曲がった時空では測地線束の体積が座標の放射伸縮と一致せず、Riesz核にそのまま滑らかな係数を掛けるだけでは余分な一次微分項が出ます。このずれを補正する因子を次に定義します。

$x=\exp_y(v)$ の**正規座標** $v^a$ を取り、$g_{ab}(x)$ をこの座標で表示します。$J_y(v)=\sqrt{|\det g_{ab}(v)|}/\sqrt{|\det g_{ab}(0)|}$ は測地線の始点で規格化した体積のJacobianです。比較しているのは同じ正規座標の座標体積 $dv^1\cdots dv^d$ と幾何学的体積密度であり、任意の座標行列式を無条件に不変量と呼んでいるのではありません。

<a id="def-hpde13-van-vleck"></a>
<!-- formal-statement-start -->
> **定義（van Vleck–Morette因子）**  
> $U$ を測地的凸正規近傍、$\sigma$ を世界関数とする。第一・第二変数の座標添字をそれぞれ $a,b'$ と書き、二点関数

$$
\Delta(x,y)=
\frac{\left|\det(-\partial_{x^a}\partial_{y^{b'}}\sigma(x,y))\right|}
{\sqrt{|\det g(x)|}\sqrt{|\det g(y)|}}
$$

> をvan Vleck–Morette因子とする。凸正規近傍では $\Delta>0$、対角上で $\Delta(y,y)=1$ である。$U_0(x,y)=\Delta(x,y)^{1/2}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde13-van-vleck -->
**定義の確認**（判定への橋渡し）。混合二階微分の行列は、指数写像の微分が始点の初速度の変化を終点の変化へ写すことの双対表示です。したがって行列式の分子を計算する意味は、測地線束の広がりを体積で比較することにあります。凸正規近傍では指数写像の微分が可逆なので、行列式は零になりません。混合微分では二つの変数を独立に扱います。すなわち、いったん基点 $y$ を固定して $x$ 側の正規座標 $v$ を選び、$y$ の微分では実際の終点 $x$ を固定します（$y$ を変えるたびに $x$ 側の座標原点まで動かす微分ではありません）。そのうえで測地線のエネルギーを始点 $y$ で変分すると、前の終点変分と同じ部分積分の始点境界項から

$$
\partial_{y^{b'}}\sigma(x,y)=-g_{b'c'}(y)v^{c'}
$$

を得ます。ここで $x$ の座標として $y$ を基点とする正規座標 $v^a$ を使えば、$\partial_{v^a}v^{c'}=\delta_a^{c'}$ です。従って混合二階微分行列は

$$
-\partial_{v^a}\partial_{y^{b'}}\sigma=g_{b'a}(y),
$$

その行列式の絶対値は $|\det g(y)|$ です。定義式の分母を同じ座標で評価して

$$
\Delta(x,y)=\frac{|\det g(y)|}{\sqrt{|\det g(v)|}\sqrt{|\det g(y)|}}
=J_y(v)^{-1},\qquad
U_0(x,y)=J_y(v)^{-1/2}
$$

を得ます。混合微分を「なぜ体積の逆Jacobianとして計算できるか」がここで具体的につながりました。

Minkowski時空の直交座標なら $-\partial_x\partial_y\sigma=g$、$\sqrt{|\det g|}=1$、$J=1$ です。定義の分子・分母と正値性・対角値を個別に確かめると $\Delta=U_0=1$ となります。
<!-- definition-example-end -->

<a id="lem-hpde13-van-vleck-transport"></a>
<!-- formal-statement-start -->
> **補題（体積Jacobianと先頭の輸送方程式）**  
> $d$ 次元の凸正規近傍で $Z=\operatorname{grad}_x\sigma$ とすると

$$
\Box_x\sigma=d+Z(\log J_y),\qquad
2Z(U_0)+(\Box_x\sigma-d)U_0=0,
\qquad U_0(y,y)=1.
$$

> また最後の一階方程式を満たす滑らかなスカラー関数は $U_0$ に一意である。
<!-- formal-statement-end -->

### 証明の見取り図

正規座標で放射ベクトル場が $v^a\partial_{v^a}$ になることと、密度付き発散公式を組み合わせます。密度の対数微分がそのまま $\Box\sigma-d$ を与えます。

<!-- proof-start -->
### 証明

[世界関数の補題](#lem-hpde13-eikonal)より、正規座標 $v$ では $Z=v^a\partial_{v^a}$。任意のベクトル場 $X$ に対する[密度付き発散](../HPDE4/index.md#def-hpde4-divergence)を $Z$ に使うと

$$
\begin{aligned}
\Box_x\sigma
&=\operatorname{div}_gZ\\
&=\frac1{\sqrt{|g(v)|}}\partial_{v^a}
  (\sqrt{|g(v)|}v^a)\\
&=d+v^a\partial_{v^a}\log\sqrt{|g(v)|}\\
&=d+Z(\log J_y).
\end{aligned}
$$

定義直後に正規座標で求めた $\Delta=J_y^{-1}$ を用います。従って $U_0=J_y^{-1/2}$ を代入すると

$$
2Z(U_0)=-U_0Z(\log J_y)
=-(\Box_x\sigma-d)U_0.
$$

$J_y(0)=1$ より対角値は $1$。逆に任意の解 $W$ で $W(y,y)=1$ とすると $W/U_0$ は $Z(W/U_0)=0$ を満たします。各放射線 $\gamma(s)=\exp_y(sv)$ で $Z=s\,d/ds$ なので $s>0$ では $W/U_0$ は一定で、$s\downarrow0$ の連続性からその定数は $1$ です。$\square$
<!-- proof-end -->

## 4. 束の平行移動と先頭Hadamard係数

スカラー係数 $U_0$ だけでは、点源の値が $E_y$ のベクトルで解の値が $E_x$ のベクトルであることを扱えません。[HPDE4の束接続](../HPDE4/index.md#def-hpde4-connection)を測地線沿いに積分して、$E_y$ の値を $E_x$ へ運ぶ平行移動 $\Pi(x,y):E_y\to E_x$ を使います。

<a id="def-hpde13-leading-coefficient"></a>
<!-- formal-statement-start -->
> **定義（先頭Hadamard係数）**  
> $P=-\operatorname{tr}_g\nabla^2+B$、$U$ を凸正規近傍とする。各 $x,y\in U$ を結ぶ測地線沿いの $\nabla$ 平行移動を $\Pi(x,y)$ とし、束写像

$$
V_0(x,y)=\Delta(x,y)^{1/2}\Pi(x,y)
\in\operatorname{Hom}(E_y,E_x)
$$

> を先頭Hadamard係数とする。
<!-- formal-statement-end -->

この定義の非自明な条件は、$\Pi$ が逆写像を持つこと、$V_0(y,y)=\operatorname{id}_{E_y}$、および束写像としての輸送式です。$y$ から $x$ への平行移動を逆向きに置き換えると、出発するファイバーが違うので積そのものが成立しません。

<a id="thm-hpde13-leading-transport"></a>
<!-- formal-statement-start -->
> **定理（束値先頭係数の輸送と一意性）**  
> 上記の $V_0$ は

$$
\left(2\nabla_Z+\Box_x\sigma-d\right)V_0=0,
\qquad V_0(y,y)=\operatorname{id}_{E_y}
$$

> を満たし、凸正規近傍上の滑らかな束写像の中で、この初期条件を持つ唯一の解である。
<!-- formal-statement-end -->

### 証明の見取り図

スカラー側の余分な発散は $\Delta^{1/2}$ が消し、束の接続微分は $\Pi$ が消します。一意性は各測地線上の常微分方程式へ戻して調べます。

<!-- proof-start -->
### 証明

[体積Jacobianの輸送式](#lem-hpde13-van-vleck-transport)と $\nabla_Z\Pi=0$ に対し積の微分を行うと

$$
\begin{aligned}
2\nabla_ZV_0+(\Box\sigma-d)V_0
&=\{2Z(U_0)+(\Box\sigma-d)U_0\}\Pi\\
&\quad+2U_0\nabla_Z\Pi=0.
\end{aligned}
$$

対角では $\Pi(y,y)=\operatorname{id}$ と $U_0(y,y)=1$。他の解 $W$ を取り、$A=V_0^{-1}W\in\operatorname{End}(E_y)$ として測地線上に制限すると、前の式を両者から引いて $s\,dA/ds=0$ が得られます。$A(0)=\operatorname{id}$ より $A(s)=\operatorname{id}$ です。$V_0$ の可逆性は $U_0>0$ と平行移動の可逆性によります。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-hpde13-leading-coefficient -->
**定義の確認**。平坦時空、$E=\mathbb R^r\times M$、通常微分接続なら $\Pi=\operatorname{id}$、$J=1$ なので $V_0=\operatorname{id}$。$Z$ に沿う導関数は零、$\Box\sigma=d$、対角値も恒等写像です。定義と輸送方程式の条件をすべて確認できます。
<!-- definition-example-end -->

## 5. なぜ係数に輸送方程式が必要になるのか

ここから主計算では $d=4$ に固定します。曲がった時空では **分布に使う密度も固定する必要があります**。$y$ からの一意な測地線の初速度が未来向き時間的である点の集合を $\Omega_y^+\subset U$ と書きます（過去向きは $\Omega_y^-$）。正の計量密度 $d\mathrm{vol}_g$ に対し、$k\ge1$ の局所Riesz分布を

$$
\begin{aligned}
&\big\langle R_+(2k+2,\cdot;y),\varphi\,d\mathrm{vol}_g\big\rangle\\
&\qquad=
\frac{1}{8\pi\,4^{k-1}(k-1)!\,k!}
\int_{\Omega_y^+}(-2\sigma(x,y))^{k-1}
\varphi(x)\,d\mathrm{vol}_g(x)
\end{aligned}
$$

で定めます（$\varphi$ は $U$ にコンパクト台を持つ滑らかな試験関数）。$R_-(2k+2)$ は $\Omega_y^-$ を使う時間反転の類似物です。これは **正規座標の平坦核をJacobian補正なしに押し出す定義ではなく**、世界関数の式を幾何学的体積密度で積分する定義です。実際、正規座標では $d\mathrm{vol}_g(x)=J_y(v)\sqrt{|\det g(y)|}\,|dv|$ となり、体積の変化は分布への作用に残ります。

$R_+(2)$ は同じ密度に関し、*頂点から離れた場所では* $H_+(x,y)\delta(\sigma)/(4\pi)$ と書ける円錐面分布で、頂点を含む正規化は[3+1次元の点源基本解](../HPDE12/index.md#thm-hpde12-three-dimensional)と一致するよう定めます。$R_+(0)=\delta_y$ は[基準密度に関する点源](../HPDE3/index.md#def-hpde3-point-source)を $d\mathrm{vol}_g$ に関して取ったものです。$H_+$ は $y$ の局所未来を選ぶ記号であり、一般の座標時刻への無条件な置換ではありません。

一変数分布の恒等式 $\sigma\delta'(\sigma)=-\delta(\sigma)$ とRieszの正規化から、任意の $k\ge1$ で

$$
\partial_\sigma R_\pm(2k+2)
=-\frac1{2k}R_\pm(2k)
$$

です。$k=1$ では $H(-\sigma)'=-\delta(\sigma)$ と $R_\pm(4)=H_\pm H(-\sigma)/(8\pi)$ を代入すれば直接確認できます。$k\ge2$ では前節のべき乗を微分します。

<a id="lem-hpde13-product-formula"></a>
<!-- formal-statement-start -->
> **補題（Riesz分布への波動作用素の積公式）**  
> $d=4$ の凸正規近傍で $V(x,y)\in\operatorname{Hom}(E_y,E_x)$ を滑らかとする。$k\ge1$ なら局所束値分布として

$$
\begin{aligned}
P_x(VR_\pm(2k+2))
&=(P_xV)R_\pm(2k+2)\\
&\quad+\frac1{2k}
\left(2\nabla_Z+\Box_x\sigma+2k-4\right)
V\,R_\pm(2k)
\end{aligned}
$$

> が成立する。ここで $P_xV$ は各 $E_y$ の入力を固定し第一変数へ $P$ を作用させた束写像である。
<!-- formal-statement-end -->

### 証明の見取り図

分布にも成立するLeibniz則で二階作用素を展開します。$V$ の一次微分の項は $\partial_\sigma R$ の係数となり、前のRiesz次数へ変わります。

<!-- proof-start -->
### 証明

$R=R_\pm(2k+2)$ と略します。作用素の接続表示に[積の微分規則](../HPDE5/index.md#thm-hpde5-unique-connection)を使うと

$$
P_x(VR)=(P_xV)R-2\nabla_{\operatorname{grad}R}V
 -V\Box_xR.
$$

$R=R(\sigma)$ と書き、[世界関数のアイコナール恒等式](#lem-hpde13-eikonal)を適用します。

$$
\begin{aligned}
\operatorname{grad}R&=R'(\sigma)Z,\\
\Box_xR&=(\Box_x\sigma)R'(\sigma)
+g(Z,Z)R''(\sigma)\\
&=(\Box_x\sigma)R'(\sigma)+2\sigma R''(\sigma).
\end{aligned}
$$

平坦な $d=4$ の式 $-4R'-2\sigma R''=R_\pm(2k)$ を差し引けば

$$
P_x(VR)=(P_xV)R+VR_\pm(2k)
-\{2\nabla_ZV+(\Box_x\sigma-4)V\}R'.
$$

最後に $R'=-R_\pm(2k)/(2k)$ を代入します。これらの等式はまず円錐内部の滑らかな箇所で成り立ち、Riesz分布の正規化された延長に対して分布微分としても成り立ちます。$k=1$ の境界デルタは $H(-\sigma)'=-\delta(\sigma)$ で明示的に扱っています。$\square$
<!-- proof-end -->

頂点に関係する最初の項には別の計算があります。[先頭係数の輸送式](#thm-hpde13-leading-transport)を使うと

$$
P_x(V_0R_\pm(2))=\delta_y\operatorname{id}_{E_y}
+(P_xV_0)R_\pm(2).
$$

この等式の点源係数が $1$ なのは $V_0(y,y)=\operatorname{id}$ と[平坦核の正規化](../HPDE12/index.md#thm-hpde12-three-dimensional)によります。曲がった体積密度から生じる一次のずれは $V_0$ の輸送式で消えます。頂点を除く円錐面では、$\delta'(\sigma)$ の係数が $(2\nabla_Z+\Box\sigma-4)V_0=0$ となります。頂点での正規化も密度を含めて確認します。正規座標で $J_y(0)=1$、$\Pi(y,y)=\operatorname{id}$ だから、円錐面の試験関数との積分に現れる $V_0J_y=J_y^{1/2}\Pi$ は頂点へ近づくと恒等写像に収束します。従って頂点での点源係数は平坦時空の球面分布と同じ $1$ になり、余分なJacobian係数は付きません。

<a id="def-hpde13-hadamard-coefficients"></a>
<!-- formal-statement-start -->
> **定義（Hadamard係数と輸送再帰）**  
> $d=4$、$P=-\operatorname{tr}_g\nabla^2+B$、$U$ を凸正規近傍とする。上記の先頭係数 $V_0=\Delta^{1/2}\Pi$ に続き、$k\ge1$ の滑らかな束写像 $V_k(x,y):E_y\to E_x$ を輸送方程式

$$
\left(2\nabla_Z+\Box_x\sigma+2k-4\right)V_k
=-2k\,P_xV_{k-1}
$$

> の対角で滑らかな解として定める。この $V_0,V_1,\ldots$ をHadamard係数という。
<!-- formal-statement-end -->

<a id="thm-hpde13-hadamard-integral"></a>
<!-- formal-statement-start -->
> **定理（輸送方程式の解の存在・一意性）**  
> 上記の条件で $V_k$ は帰納的に一意な滑らかな束写像として定まる。$\gamma(s)=\exp_y(s\exp_y^{-1}(x))$、$0\le s\le1$、$T(x,y)=V_0(x,y)$ と置けば

$$
V_k(x,y)=-k\,T(x,y)\int_0^1 s^{k-1}
T(\gamma(s),y)^{-1}
(P_xV_{k-1})(\gamma(s),y)\,ds
$$

> で与えられる。特に $V_k(y,y)=-(P_xV_{k-1})(y,y)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

先頭係数で割ると体積項と接続項が消え、放射方向の常微分方程式に変わります。滑らかな対角値を要求すると、自由な積分定数は残りません。

<!-- proof-start -->
### 証明

$V_k=T W_k$ と書き、$W_k(x,y)\in\operatorname{End}(E_y)$ とします。$T$ は可逆で[先頭の輸送式](#thm-hpde13-leading-transport)を満たします。従って

$$
\begin{aligned}
&(2\nabla_Z+\Box\sigma+2k-4)(TW_k)\\
&\qquad=2T Z(W_k)+2kTW_k.
\end{aligned}
$$

$\gamma(s)$ 上では $Z=s\,d/ds$ なので、$F_{k-1}(s)=T(\gamma(s),y)^{-1}(P_xV_{k-1})(\gamma(s),y)$ とおくと

$$
sW_k'(s)+kW_k(s)=-kF_{k-1}(s).
$$

両辺に $s^{k-1}$ を掛けると

$$
\frac d{ds}(s^kW_k(s))=-ks^{k-1}F_{k-1}(s).
$$

滑らかな $W_k$ なら $s^kW_k(s)\to0$。$0$ から $1$ まで積分して表示式を得ます。逆にこの積分は滑らかな被積分関数を $s$ の固定区間で積分するので、$x,y$ に関して滑らかです。二つの解の差は $(s^kW)'=0$ を満たし、対角で有界だから積分定数は零となります。$x=y$ では $\int_0^1 s^{k-1}ds=1/k$、$T(y,y)=\operatorname{id}$ より対角公式が出ます。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-hpde13-hadamard-coefficients -->
**定義の確認**。Minkowski時空の自明な実スカラー束で $P=P_0+m^2$（$m^2\ge0$ は定数）とします。$T=1$、$\Box\sigma=4$、$P1=m^2$ なので輸送式は

$$
2s\frac d{ds}V_1+2V_1=-2m^2.
$$

滑らかな解は $V_1=-m^2$ です。帰納的に $PV_{k-1}=m^2(-m^2)^{k-1}$ を代入すると

$$
V_k=(-m^2)^k.
$$

対角値、方程式、滑らかさをそれぞれ確認しました。質量零なら $V_k=0$（$k\ge1$）となり、平坦massless模型では内部補正が消えます。
<!-- definition-example-end -->

## 6. 形式的Hadamard展開は、まだ基本解ではない

<a id="prop-hpde13-truncated-defect"></a>
<!-- formal-statement-start -->
> **命題（有限和の残差恒等式）**  
> $d=4$ の凸正規近傍で上記のHadamard係数と局所Riesz分布を用い、

$$
S_{\pm,N}(x,y)=\sum_{k=0}^{N}V_k(x,y)R_\pm(2k+2,x;y)
$$

> と置く。各整数 $N\ge0$ について局所分布として

$$
P_xS_{\pm,N}
=\delta_y\operatorname{id}_{E_y}
+(P_xV_N)R_\pm(2N+2)
$$

> が成り立つ。各項の支持は $y$ の対応する局所因果円錐に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

$V_0R_2$ の残余 $(PV_0)R_2$ を $V_1R_4$ の輸送項で打ち消し、次の $R_4$ の残余を $V_2R_6$ で打ち消します。有限和では最後の残差が残ります。

<!-- proof-start -->
### 証明

[積公式](#lem-hpde13-product-formula)へ[輸送再帰](#def-hpde13-hadamard-coefficients)を代入すると、$k\ge1$ で

$$
P_x(V_kR_\pm(2k+2))
=(P_xV_k)R_\pm(2k+2)-(P_xV_{k-1})R_\pm(2k).
$$

$k=0$ の式を $P(V_0R_2)=\delta_y+(PV_0)R_2$ として加えると、$R_2$ から $R_{2N}$ までの残差が隣接項と相殺され、最後に $(PV_N)R_{2N+2}$ だけ残ります。滑らかな係数との積は分布の台を広げないので、支持包含も従います。$\square$
<!-- proof-end -->

光円錐上で集中するのは主項 $V_0R_2$、内部の尾を担うのは $V_1R_4,V_2R_6,\ldots$ です。平坦な質量模型で最初の数項を代入すると

$$
S_{+,2}=
\frac{\delta(t-r)}{4\pi r}
-\frac{m^2}{8\pi}H(t-r)
+\frac{m^4(t^2-r^2)}{64\pi}H(t-r).
$$

$m>0$ なら円錐内部で $-m^2/(8\pi)$ という非零の最初の尾が現れます。ただしこの有限和に $P$ を掛けても、一般には点源以外の残差が残ります。**形式記号**

$$
F_\pm\sim\sum_{k=0}^{\infty}V_kR_\pm(2k+2)
$$

は無限和の収束も、真の基本解の存在も意味しません。滑らかな係数が増大し得るので項別に微分して無限和を交換することも保証されません。次のHPDE14では有限和に適切な切断・平滑化を施した近似核を構成し、その誤差を補正するという別の議論が必要です。

## 7. 演習：分布の正規化から輸送式まで

### Level A

<a id="ex-hpde13-a01"></a>
#### HPDE13-A01 世界関数とアイコナール恒等式
- Level: A

1+1次元Minkowski時空で $y=(s,z)$ とする。$\sigma$ と $Z$ を計算し、$g(Z,Z)=2\sigma$ を直接確認せよ。

<!-- solution-start -->
**詳細解答**。$\exp_y(v)=y+v$ なので $v=(t-s,x-z)$ です。計量は $g=-dt^2+dx^2$ より

$$
\sigma=\frac12\{-(t-s)^2+(x-z)^2\}.
$$

偏微分は $\partial_t\sigma=-(t-s)$、$\partial_x\sigma=x-z$。逆計量の時間成分は $-1$ だから

$$
Z=g^{ab}\partial_b\sigma\,\partial_a
=(t-s)\partial_t+(x-z)\partial_x.
$$

従って $g(Z,Z)=-(t-s)^2+(x-z)^2=2\sigma$ です。
<!-- solution-end -->

<a id="ex-hpde13-a02"></a>
#### HPDE13-A02 $R_+(6)$ の再帰と係数
- Level: A

4次元Minkowski時空で $q=t^2-r^2$ とする。$R_+(6)=qH(t-r)/(64\pi)$ が $P_0R_+(6)=R_+(4)$ を満たすことを確かめよ。

<!-- solution-start -->
**詳細解答**。$P_0q=8$。$P_0(qH)=qP_0H+H P_0q+2(\partial_tq\partial_tH-\nabla q\cdot\nabla H)$ です。円錐上 $q=0$ なので第一項は零。さらに $\partial_tq=2t$、$\nabla q=-2x$、$\partial_tH=\delta(t-r)$、$\nabla H=-x\delta(t-r)/r$ より交差項は $4(t-r)\delta(t-r)=0$。従って $P_0(qH)=8H$、これを $64\pi$ で割ると $H/(8\pi)=R_+(4)$ です。
<!-- solution-end -->

<a id="ex-hpde13-a03"></a>
#### HPDE13-A03 平坦な先頭係数
- Level: A

4次元Minkowski時空の自明なランク2束と通常微分接続で $\Delta$、$\Pi$、$V_0$ を計算し、輸送式を確認せよ。

<!-- solution-start -->
**詳細解答**。$\sigma=\frac12g_{ab}(x-y)^a(x-y)^b$ なので混合微分の負号を付けた行列は $g_{ab}$ です。$\det g=-1$、分子の絶対値も $1$ だから $\Delta=1$。通常接続の平行移動は $\Pi=I_2$。ゆえに $V_0=I_2$、$\nabla_ZV_0=0$。$\Box\sigma=4$ なので $(2\nabla_Z+\Box\sigma-4)V_0=0$。対角では $V_0(y,y)=I_2$ です。
<!-- solution-end -->

<a id="ex-hpde13-a04"></a>
#### HPDE13-A04 輸送方程式の対角値
- Level: A

4次元で $V_1$ の輸送式を $x=y$ に制限し、$V_1(y,y)=-(P_xV_0)(y,y)$ を導け。さらに平坦な $P=P_0+m^2$ で値を求めよ。

<!-- solution-start -->
**詳細解答**。対角では $\sigma=0$、$Z=0$、$\Box_x\sigma=4$ です。$k=1$ の式

$$
(2\nabla_Z+\Box\sigma-2)V_1=-2PV_0
$$

の左辺は $2V_1(y,y)$ になるので、$V_1(y,y)=-(PV_0)(y,y)$ です。平坦模型では $V_0=1$ で $P_0 1=0$、$P1=m^2$。従って $V_1(y,y)=-m^2$ です。
<!-- solution-end -->

### Level B

<a id="ex-hpde13-b01"></a>
#### HPDE13-B01 体積Jacobianの補正を再導出する
- Level: B

凸正規近傍の正規座標で $Z=v^a\partial_a$ かつ $J_y(v)=\sqrt{|g(v)|}/\sqrt{|g(0)|}$ とする。$U_0=J^{-1/2}$ が $(2Z+\Box\sigma-d)U_0=0$ を満たすことを、発散公式から導け。

<!-- solution-start -->
**詳細解答**。$\Box\sigma=\operatorname{div}Z$。密度による発散は

$$
\operatorname{div}Z
=|g|^{-1/2}\partial_a(|g|^{1/2}v^a)
=d+v^a\partial_a\log |g|^{1/2}
=d+Z\log J.
$$

$U_0=J^{-1/2}$ を微分すると $Z U_0=-\frac12 J^{-1/2}Z\log J$。従って

$$
2ZU_0+(\Box\sigma-d)U_0
=-U_0Z\log J+U_0Z\log J=0.
$$

また $J(0)=1$ なので $U_0(y,y)=1$ です。
<!-- solution-end -->

<a id="ex-hpde13-b02"></a>
#### HPDE13-B02 質量付き模型の全係数
- Level: B

$P=P_0+m^2$（定数 $m\ge0$）について4次元平坦時空のHadamard係数をすべて求め、$m=0$ と $m>0$ の内部の尾を比較せよ。

<!-- solution-start -->
**詳細解答**。$V_0=1$、$T=1$。$V_{k-1}$ が定数なら $PV_{k-1}=m^2V_{k-1}$ です。[積分表示](#thm-hpde13-hadamard-integral)の $s$ 積分は $1/k$ なので

$$
V_k=-k\,m^2V_{k-1}\int_0^1s^{k-1}\,ds
=-m^2V_{k-1}.
$$

$V_0=1$ から帰納法で $V_k=(-m^2)^k$。$m=0$ なら $k\ge1$ は零で光円錐面項だけが残ります。$m>0$ では $V_1R_4=-m^2H(t-r)/(8\pi)$ が円錐内部で非零です。有限和に残差があるため、これだけで厳密な大域Green核の全形を確定したわけではありません。
<!-- solution-end -->

<a id="ex-hpde13-b03"></a>
#### HPDE13-B03 時空次元と分布の支持
- Level: B

$d=2$ の $R_+^{(2)}(2)$ と $d=4$ の $R_+^{(4)}(2)$ を比較し、両方が遅延支持を持つのに、強いHuygens性について異なることを説明せよ。さらに $d=4$ の $R_+(4)$ の支持を述べよ。

<!-- solution-start -->
**詳細解答**。$d=2$ では $R_+^{(2)}(2)=H(t-|x|)/2$ だから内部 $t>|x|$ でも値が $1/2$ です。$d=4$ では

$$
R_+^{(4)}(2)=\frac{\delta(t-r)}{4\pi r}
$$

で、$r>0$ では $t=r$ の円錐面上だけに集中します。どちらも $t\ge r$ の外側に支持を持たないので有限伝播には反しません。しかし内部に尾が残るかどうかは違います。さらに $R_+^{(4)}(4)=H(t-r)/(8\pi)$ は閉じた未来円錐**全体**を台に持つので、Riesz再帰の後続項を「すべて円錐面」とは解釈できません。
<!-- solution-end -->

<a id="ex-hpde13-b04"></a>
#### HPDE13-B04 有限打切りの残差を導く
- Level: B

$S_{+,2}=V_0R_+(2)+V_1R_+(4)+V_2R_+(6)$ に $P_x$ を作用させ、輸送再帰で消える項と残る項をそれぞれ書け。

<!-- solution-start -->
**詳細解答**。先頭項の微分は $\delta_y+(PV_0)R_2$。[積公式](#lem-hpde13-product-formula)へ $k=1,2$ の輸送式を入れると

$$
\begin{aligned}
P(V_1R_4)&=(PV_1)R_4-(PV_0)R_2,\\
P(V_2R_6)&=(PV_2)R_6-(PV_1)R_4.
\end{aligned}
$$

三式を加えると $R_2$ と $R_4$ の残余が互いに相殺し、

$$
PS_{+,2}=\delta_y+(PV_2)R_6.
$$

従って $PV_2$ が零でない限り点源方程式を厳密には満たしません。
<!-- solution-end -->

### Level C

<a id="ex-hpde13-c01"></a>
#### HPDE13-C01 曲率とポテンシャルが作る最初の尾
- Level: C

4次元Lorentz多様体の凸正規近傍における実スカラー作用素 $P=-\Box_g+W(x)$ を考える。正規座標 $v$ で

$$
\sqrt{|g(v)|}/\sqrt{|g(0)|}
=1-\frac16\operatorname{Ric}_{ab}(y)v^av^b+O(|v|^3)
$$

が成り立つとする。次を証明せよ。(i) $V_0=1+\frac1{12}\operatorname{Ric}_{ab}(y)v^av^b+O(|v|^3)$。(ii) $V_1(y,y)=\operatorname{Scal}(y)/6-W(y)$。(iii) $S_{+,1}=V_0R_2+V_1R_4$ は一般には厳密な基本解ではない。最後に平坦な定数 $W=m^2$ へ戻して符号を検算せよ。

<!-- solution-start -->
**詳細解答**。(i) $V_0=\Delta^{1/2}=J^{-1/2}$ です。$J=1+a$、$a=-\operatorname{Ric}_{ab}v^av^b/6+O(|v|^3)$ と置き、$(1+a)^{-1/2}=1-a/2+O(a^2)$ を使うと

$$
V_0=1+\frac1{12}\operatorname{Ric}_{ab}(y)v^av^b
+O(|v|^3).
$$

(ii) 正規座標の原点では $g^{ab}(0)=g_y^{ab}$、Christoffel記号は零です。$V_0$ の二階偏導関数は

$$
\partial_a\partial_bV_0(y,y)=\frac16\operatorname{Ric}_{ab}(y).
$$

よって

$$
\begin{aligned}
(\Box_gV_0)(y,y)
&=g_y^{ab}\partial_a\partial_bV_0(y,y)\\
&=\frac16g_y^{ab}\operatorname{Ric}_{ab}(y)
=\frac16\operatorname{Scal}(y).
\end{aligned}
$$

$PV_0=-\Box V_0+WV_0$ と $V_0(y,y)=1$ から $(PV_0)(y,y)=W(y)-\operatorname{Scal}(y)/6$。[対角の輸送式](#thm-hpde13-hadamard-integral)で $V_1=-(PV_0)$ を使い

$$
V_1(y,y)=\frac16\operatorname{Scal}(y)-W(y)
$$

が得られます。(iii) [有限和の残差命題](#prop-hpde13-truncated-defect)へ $N=1$ を代入すると

$$
P_xS_{+,1}=\delta_y+(P_xV_1)R_+(4).
$$

右端が一般には零とは限らないため、厳密な基本解を主張できません。平坦で $W=m^2$ 定数なら $\operatorname{Scal}=0$、$V_1=-m^2$、従って内部項は $-m^2H(t-r)/(8\pi)$ です。正の質量項に対し負の先頭尾となり、前節の模型とも一致します。
<!-- solution-end -->

## 8. 何を構成できて、何がまだ残っているか

一意な短い測地線から世界関数を定め、体積のJacobianと平行移動を先頭係数に組み込み、Riesz分布の各次数に現れる余分な項を一次の輸送方程式で打ち消しました。これで局所的な光円錐面の特異項と、内部を埋めるHadamard係数の列を**各次数まで決定**できます。

ただしこの章で成立したのは、各係数の滑らかな存在・一意性と**有限打切りの厳密な残差恒等式**です。無限級数の収束、切断による残差の平滑化、誤差を消した局所遅延・先進基本解の存在はまだ証明していません。それらは次のHPDE14の問題です。
