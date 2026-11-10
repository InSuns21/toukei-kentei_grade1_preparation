# GMT21 多変数BVと分布微分

<!-- definition-example-audit: strict -->

[MT4の1変数の有界変動](../../MT/MT4/index.md#def-mt4-bv)は、区間を細分したときの関数値の振れを足し合わせて測りました。しかし多変数では、折れ線のような一次元の分割だけでは、曲面を横切る跳躍の大きさを捉えられません。たとえば正方形の内側で1、外側で0となる関数は、内部のほとんどすべての点で通常の勾配が0なのに、境界を横切れば値が飛びます。

[GPDE2の超関数微分](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)なら、その跳躍も微分として記録できます。この講義で解きたい問いは、**超関数としての微分が、積分できる密度より広い「有限な測度」として表されるのはいつか**、そしてその大きさをどう測るかです。[GPDE3のSobolev空間](../../GPDE/GPDE3/index.md#def-gpde3-sobolev-space)との違いも明確にします。

以下、$d\ge1$、$\Omega\subset\mathbb R^d$ は空でない開集合、$dx$ は $d$ 次元Lebesgue測度とします。$C_c^\infty(\Omega;\mathbb R^d)$ は、各成分が滑らかで、台が $\Omega$ 内のコンパクト集合であるベクトル場の空間です。ベクトル場 $\varphi=(\varphi_1,\ldots,\varphi_d)$ の発散は $\operatorname{div}\varphi=\sum_{i=1}^d\partial_i\varphi_i$、$|\varphi|$ はEuclidノルムを表します。関数はLebesgue a.e.で一致すれば同じ $L^1$ 元とみなします。

## 1. 多変数の変動をテストベクトル場で測る

滑らかな $u$ なら、コンパクト台の $\varphi$ に対する部分積分は

$$
\int_\Omega u\operatorname{div}\varphi\,dx
=-\int_\Omega\nabla u\cdot\varphi\,dx.
$$

右辺では $|\varphi|\le1$ の範囲で勾配の向きを試せます。したがって、滑らかでない $u$ にも左辺をそのまま使えば、通常の勾配がない場所の変動も拾えるはずです。テスト場の符号は自由に反転できるので、上限には絶対値を付けても同じです。

<a id="def-gmt21-bv"></a>

<!-- formal-statement-start -->
> **定義（多変数BVと双対変動量）**  
> 開集合 $\Omega\subset\mathbb R^d$ と $u\in L^1(\Omega)$ に対し、次の拡張実数を $u$ の $\Omega$ 上の双対変動量と定める。

$$
V_\Omega(u)=\sup\left\{\int_\Omega u\operatorname{div}\varphi\,dx:\ \varphi\in C_c^\infty(\Omega;\mathbb R^d),\ |\varphi(x)|\le1\ \text{for all }x\right\}.
$$

> $V_\Omega(u)<\infty$ のとき $u$ は $\Omega$ 上の**有界変動関数**であるといい、$BV(\Omega)=\{u\in L^1(\Omega):V_\Omega(u)<\infty\}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt21-bv -->
### 直接例：定数と一次関数

任意の $u\equiv c$ が $L^1(\Omega)$ に属する場合、コンパクト台の $\varphi$ について $\int_\Omega\operatorname{div}\varphi=0$ なので $V_\Omega(u)=0$ です。一方、$\Omega=(0,1)^2$ と $u(x)=x_1+2x_2$ を取ると、通常の勾配は $(1,2)$ です。部分積分とCauchy–Schwarzから、$|\varphi|\le1$ に対して

$$
\int_\Omega u\operatorname{div}\varphi\,dx
=-\int_\Omega(1,2)\cdot\varphi\,dx\le\sqrt5.
$$

逆向きには、$0\le\eta_n\le1$、$\eta_n\in C_c^\infty(\Omega)$、$\eta_n\to1$ a.e.となる切断関数列を取り、$\varphi_n=-\eta_n(1,2)/\sqrt5$ とすれば、積分は $\sqrt5\int_\Omega\eta_n\,dx\to\sqrt5$ です。従って定義から直接 $V_\Omega(u)=\sqrt5$ と確定します。

**定義の確認**：$u\in L^1(\Omega)$ は有界領域上の多項式なので成立し、双対変動量の上界と、それへ近づく許容テスト場の両方を示しました。したがって $V_\Omega(u)<\infty$ で、実際に $u\in BV(\Omega)$ です。**成分の絶対値を足した3ではなく、ベクトルの長さ**を測る点に注意してください。
<!-- definition-example-end -->

## 2. 有限変動なら分布微分はRadon測度になる

超関数としての各偏微分 $D_i u$ は、[超関数微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)からテスト関数 $\psi$ に

$$
\langle D_i u,\psi\rangle=-\int_\Omega u\,\partial_i\psi\,dx
$$

を対応させます。一般の超関数微分が測度になるとは限りません。しかし $V_\Omega(u)$ が有限なら、右辺を $\psi$ の一様ノルムだけで抑えられます。

空間の $d$ 方向に符号付きの質量を割り当てるには、[MT6の有限符号付きRadon測度](../../MT/MT6/index.md#def-mt6-finite-signed-radon)を $d$ 個まとめます。各成分はそれぞれ正負を持ち、全体では変動の方向を表します。

<a id="def-gmt21-vector-radon"></a>

<!-- formal-statement-start -->
> **定義（有限ベクトル値Radon測度）**  
> 開集合 $\Omega\subset\mathbb R^d$ 上の有限ベクトル値Radon測度とは、有限符号付きRadon測度 $\mu_1,\ldots,\mu_d$ の組 $\mu=(\mu_1,\ldots,\mu_d)$ をいう。ベクトル場 $\varphi\in C_c(\Omega;\mathbb R^d)$ への積分を次で定める。

$$
\int_\Omega\varphi\cdot d\mu=\sum_{i=1}^d\int_\Omega\varphi_i\,d\mu_i.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt21-vector-radon -->
例えば $\mathbb R^2$ の点 $p$ に対し $\mu=(2\delta_p,-\delta_p)$ はこの定義を満たします。二成分はいずれも有限符号付きRadon測度で、その作用は $2\varphi_1(p)-\varphi_2(p)$ です。測度を座標ごとに確認する方法が、定義から直接読めます。

**定義の確認**：$\delta_p$ は1点に総質量1を持つ有限Radon測度で、定数倍 $2\delta_p$ と $-\delta_p$ も有限符号付きRadon測度です。二成分の和としての積分が上の式で具体的に計算できるため、定義の成分条件と作用の両方を検証しました。
<!-- definition-example-end -->

<a id="thm-gmt21-measure-derivative"></a>

<!-- formal-statement-start -->
> **定理（BVと測度値分布微分の同値）**  
> $\Omega\subset\mathbb R^d$ は開集合、$u\in L^1(\Omega)$ とする。次は同値である。
>
> 1. $V_\Omega(u)<\infty$ である。
> 2. 一意な有限ベクトル値Radon測度 $\mu=(\mu_1,\ldots,\mu_d)$ が存在し、任意の $\varphi\in C_c^\infty(\Omega;\mathbb R^d)$ に対して次が成り立つ。

$$
\int_\Omega\varphi\cdot d\mu=-\int_\Omega u\operatorname{div}\varphi\,dx.
$$

> この測度を $Du$（$u$ の測度値分布微分）と書く。
<!-- formal-statement-end -->

### 証明の見取り図

各座標方向だけにテスト場を置くと、有限変動から一様ノルムに関する有界汎関数が得られます。[MT6の実数値Riesz–Markov定理](../../MT/MT6/index.md#thm-mt6-riesz-markov-c0)で各成分を測度へ移せばよいのです。逆向きは測度の全変動で積分を抑えます。

<!-- proof-start -->
### 証明

$V=V_\Omega(u)<\infty$ とします。$\psi\in C_c^\infty(\Omega)$ に対して $T_i(\psi)=-\int u\partial_i\psi$ と置くと、$\psi\ne0$ についてテスト場 $\varphi=\psi e_i/\|\psi\|_\infty$（$e_i$ は第 $i$ 座標単位ベクトル）を定義に代入できます。$\varphi$ と $-\varphi$ の両方が許されるので

$$
|T_i(\psi)|\le V\|\psi\|_\infty.
$$

$C_c^\infty(\Omega)$ は $C_0(\Omega)$ で一様稠密です。具体的には $C_c$ 関数をまずコンパクト台を保って平滑化でき、[MT6の $C_c$ の $C_0$ 稠密性](../../MT/MT6/index.md#thm-mt6-cc-dense-c0)で一般の $C_0$ 関数へ進めます。よって $T_i$ は $C_0(\Omega)$ の有界実線形汎関数に一意に延長されます。

[MT6のRiesz–Markov定理](../../MT/MT6/index.md#thm-mt6-riesz-markov-c0)を局所コンパクトHausdorff空間 $\Omega$ に適用すると、有限符号付きRadon測度 $\mu_i$ が一意に存在し

$$
T_i(\psi)=\int_\Omega\psi\,d\mu_i
\quad(\psi\in C_c^\infty(\Omega))
$$

となります。$\mu=(\mu_1,\ldots,\mu_d)$ とすれば、有限和を取って主張の等式を得ます。二つの測度が同じ等式を満たせば各座標で $C_c^\infty$ 上の積分が一致し、稠密性と同じRiesz–Markov定理の一意性から成分ごとに一致します。

逆に有限測度 $\mu$ があるとします。各 $\mu_i$ の全変動測度 $|\mu_i|$ を使うと、$|\varphi|\le1$ から $|\varphi_i|\le1$ なので

$$
\left|\int_\Omega u\operatorname{div}\varphi\,dx\right|
=\left|\sum_{i=1}^d\int_\Omega\varphi_i\,d\mu_i\right|
\le\sum_{i=1}^d|\mu_i|(\Omega)<\infty.
$$

テスト場の全体で上限を取れば $V_\Omega(u)<\infty$ です。$\square$
<!-- proof-end -->

重要なのは、$Du$ が**値を持つ関数ではなく測度でもよい**ことです。いま示した不等式の右辺は成分別の粗い上界であり、変動の正確な大きさは次節でベクトルのEuclidノルムを用いて求めます。

## 3. どの方向へ変動するか：ベクトル値測度の全変動

ベクトル値測度 $\mu$ には座標ごとの正負だけでなく、各点で変動が向く方向があります。有限正測度 $\lambda=\sum_i|\mu_i|$ を基準に取れば、各 $\mu_i$ は $\lambda$ に絶対連続です。[MT3の符号付きRadon–Nikodym定理](../../MT/MT3/index.md#thm-mt3-rn-signed)がそれぞれの密度 $g_i$ を与えます。

$$
g_i=\frac{d\mu_i}{d\lambda},\qquad
g=(g_1,\ldots,g_d),\qquad
\mu=g\,\lambda.
$$

この $g$ は $\lambda$-a.e.で非零です。実際、$|\mu_i|=|g_i|\lambda$ だから、$\lambda=\sum_i|\mu_i|$ を代入すると $\sum_i|g_i|=1$ が $\lambda$-a.e.で成り立ちます。従って $|g|>0$ です。

<a id="def-gmt21-vector-variation"></a>

<!-- formal-statement-start -->
> **定義（ベクトル値測度の全変動と極分解）**  
> 開集合 $\Omega\subset\mathbb R^d$ 上の有限ベクトル値Radon測度 $\mu=(\mu_1,\ldots,\mu_d)$ に対し、$\lambda=\sum_i|\mu_i|$、$g_i=d\mu_i/d\lambda$ とする。正のRadon測度 $|\mu|$ と $|\mu|$-a.e.で単位長の可測ベクトル $\sigma_\mu$ を次で定める。

$$
|\mu|(A)=\int_A|g|\,d\lambda,\qquad
\sigma_\mu=\frac{g}{|g|},\qquad
\mu=\sigma_\mu\,|\mu|.
$$

> $A$ は任意のBorel集合である。$|\mu|$ を**全変動測度**、最後の表示を**ベクトル値測度の極分解**と呼ぶ。特に $u\in BV(\Omega)$ のとき $|Du|$ がその全変動測度である。
<!-- formal-statement-end -->

この定義は基準測度 $\lambda$ の選び方に依存しません。そのことを次の双対表示が保証します。なお、記号 $|Du|(A)$ は集合 $A$ に割り当てる非負の量、$V_\Omega(u)$ は領域全体に対する数です。

<!-- definition-example-start: def-gmt21-vector-variation -->
### 直接例：同じ点へ集まる二成分

$d=2$、点 $p=(0,0)$ とし、ベクトル値測度 $\mu=(3\delta_p,4\delta_p)$ を考えます。このとき $\lambda=7\delta_p$、$g=(3/7,4/7)$、$|g|=5/7$ なので

$$
|\mu|=5\delta_p,\qquad \sigma_\mu=(3/5,4/5).
$$

したがって $|\mu|(\mathbb R^2)=5$ であり、成分の変動を単純に足した7とは異なります。この例は一般のベクトル測度の例であり、$\mu$ が何らかの $BV$ 関数の勾配であるとは主張していません。

**定義の確認**：$\lambda=|3\delta_p|+|4\delta_p|=7\delta_p$ は有限正Radon測度で、$g$ はそのRadon–Nikodym密度です。$|\sigma_\mu|=\sqrt{9+16}/5=1$、また $\sigma_\mu|\mu|=(3\delta_p,4\delta_p)=\mu$ なので、全変動測度の正性・有限性と極分解の方向・再構成の条件を直接確かめました。
<!-- definition-example-end -->

<a id="thm-gmt21-variation-duality"></a>

<!-- formal-statement-start -->
> **定理（全変動測度の双対表示）**  
> $\Omega\subset\mathbb R^d$ を開集合、$\mu$ を有限ベクトル値Radon測度とする。任意の開集合 $U\subset\Omega$ に対し

$$
|\mu|(U)=\sup\left\{\int_U\varphi\cdot d\mu:\ \varphi\in C_c^\infty(U;\mathbb R^d),\ |\varphi|\le1\right\}.
$$

> 特に $u\in BV(\Omega)$ なら $V_\Omega(u)=|Du|(\Omega)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

単位ベクトル $\sigma_\mu$ と同じ方向を向いたテスト場を選べば、変動をすべて拾えます。ただし $\sigma_\mu$ は可測であり滑らかとは限らないので、測度に関する $L^1$ 近似でテスト場へ戻すのが核心です。

<!-- proof-start -->
### 証明

[ベクトル値測度の極分解](#def-gmt21-vector-variation)から、$|\varphi|\le1$ なら

$$
\int_U\varphi\cdot d\mu
=\int_U\varphi\cdot\sigma_\mu\,d|\mu|
\le\int_U|\varphi||\sigma_\mu|\,d|\mu|
\le|\mu|(U).
$$

逆向きは $U$ が開集合であることを使います。制限した有限Radon測度 $\nu=|\mu|\llcorner U$ に関し、[MT7の $C_c$ の $L^1$ 稠密性](../../MT/MT7/index.md#thm-mt7-cc-dense)を各成分に適用し、$\sigma_\mu$ を $L^1(\nu;\mathbb R^d)$ でコンパクト台連続場 $h_n$ に近似します。

閉単位球への射影 $P(z)=z/\max\{1,|z|\}$ は1-Lipschitzで $P(0)=0$ なので、$k_n=P(h_n)$ はコンパクト台連続かつ $|k_n|\le1$ であり

$$
\int_U|k_n-\sigma_\mu|\,d\nu
\le\int_U|h_n-\sigma_\mu|\,d\nu\longrightarrow0.
$$

$k_n$ の台は $U$ 内にコンパクトに入るため、十分小さい半径の非負・積分1の平滑化核と畳み込んで $\varphi_n\in C_c^\infty(U;\mathbb R^d)$ を作れます。連続性の一様性と畳み込みの凸結合性により、平滑化半径を順次選べば

$$
\|\varphi_n-k_n\|_\infty\le1/n,
\qquad |\varphi_n|\le1.
$$

よって $\varphi_n\to\sigma_\mu$ が $L^1(\nu)$ で成り立ち

$$
\lim_{n\to\infty}\int_U\varphi_n\cdot d\mu
=\int_U\sigma_\mu\cdot\sigma_\mu\,d|\mu|
=|\mu|(U).
$$

これで等号が示されました。$\mu=Du$ には[測度値微分の定理](#thm-gmt21-measure-derivative)を使い、$\varphi$ を $-\varphi$ に取り替えれば定義中の符号と一致します。$\square$
<!-- proof-end -->

## 4. Sobolevの勾配と、ジャンプで現れる測度

[Sobolev空間 $W^{1,1}$ の定義](../../GPDE/GPDE3/index.md#def-gpde3-sobolev-space)では、超関数微分が $L^1$ 関数として表されることを要求しました。BVはその条件を**有限測度で表されること**へ緩めたものです。

<a id="prop-gmt21-w11-inclusion"></a>

<!-- formal-statement-start -->
> **命題（W11関数とBVの比較）**  
> 開集合 $\Omega\subset\mathbb R^d$ に対し、$u\in W^{1,1}(\Omega)$ なら $u\in BV(\Omega)$ であり、弱勾配 $\nabla u\in L^1(\Omega;\mathbb R^d)$ について

$$
Du=(\nabla u)\,dx,\qquad
|Du|(A)=\int_A|\nabla u|\,dx
\quad(A\subset\Omega\text{ Borel}).
$$

> 逆に $u\in BV(\Omega)$ で $Du$ がLebesgue測度に絶対連続なら $u\in W^{1,1}(\Omega)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

弱微分のテスト関数等式と測度値微分の等式を同じテスト場で照合します。逆向きでは、有限測度のRadon–Nikodym密度が $L^1$ になることを使います。

<!-- proof-start -->
### 証明

$u\in W^{1,1}$ とし、$v_i=\partial_i u\in L^1$ を弱微分とします。[GPDE2の弱微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-weak-derivative)を各 $\varphi_i$ に適用して足し合わせると

$$
-\int_\Omega u\operatorname{div}\varphi\,dx
=\sum_i\int_\Omega v_i\varphi_i\,dx
=\int_\Omega\varphi\cdot v\,dx.
$$

$v\,dx$ は各成分が有限符号付きRadon測度なので、[測度値微分の一意性](#thm-gmt21-measure-derivative)により $Du=v\,dx$ です。[全変動測度の定義](#def-gmt21-vector-variation)では、実際の基準測度は

$$
\lambda=\sum_i|D_i u|=\left(\sum_i|v_i|\right)dx
$$

です。$s=\sum_i|v_i|$ と置けば、$s>0$ の集合で $g=v/s$ だから $|g|\lambda=(|v|/s)s\,dx=|v|dx$ です。$s=0$ の集合では両辺が0であり、$dx$ が無限測度でも $v\in L^1$ なので $\lambda$ は有限です。従って $|Du|=|v|dx$、特に全変動質量は有限です。

逆に $u\in BV$ かつ $Du\ll dx$ とします。[符号付きRadon–Nikodym定理](../../MT/MT3/index.md#thm-mt3-rn-signed)を有限符号付き測度の各成分と $dx$ に適用すると $D_i u=v_i dx$ で、各 $v_i\in L^1(\Omega)$ です。したがって任意の $\psi\in C_c^\infty(\Omega)$ について

$$
-\int_\Omega u\partial_i\psi\,dx
=\int_\Omega\psi\,dD_i u
=\int_\Omega v_i\psi\,dx.
$$

これは $v_i$ が $u$ の弱偏微分であるという定義そのものなので、$u\in W^{1,1}(\Omega)$ です。$\square$
<!-- proof-end -->

### 直接例：超平面を横切る一回のジャンプ

$\Omega=(-1,1)^d$、$d\ge2$、$a,b\in\mathbb R$ とし、$u=a$（$x_1<0$）、$u=b$（$x_1>0$）とします。ジャンプ面を $S=\{x\in\Omega:x_1=0\}$ とし、$\lambda_S$ を $S$ 上の残り $d-1$ 座標のLebesgue測度とします（面全体の質量は $2^{d-1}$）。任意のテスト場に対し、一変数 $x_1$ で先に積分すると

$$
-\int_\Omega u\partial_1\varphi_1\,dx
=-\int_{(-1,1)^{d-1}}\left(a\varphi_1(0,x')-b\varphi_1(0,x')\right)dx'
=(b-a)\int_S\varphi_1\,d\lambda_S.
$$

他の座標 $i\ge2$ では $u$ が $x_i$ に依存しないため、同じ部分積分で0です。従って

$$
Du=(b-a)e_1\lambda_S,\qquad
|Du|=|b-a|\lambda_S,\qquad
V_\Omega(u)=2^{d-1}|b-a|.
$$

ジャンプの符号は、**左から右へ $a\to b$** という向きで $b-a$ になります。$a\ne b$ の場合、この測度は $dx$ に特異なので、[W11関数とBVの比較](#prop-gmt21-w11-inclusion)から $u\notin W^{1,1}(\Omega)$ です。ここがBVの真の広がりです。

### 直接例：長方形の四辺と角

$Q=(0,1)^2$、$u=\boldsymbol{1}_Q$ を $\mathbb R^2$ 上で考えます。$\boldsymbol{1}_Q$ は特性関数で、集合内で1、外で0です。Fubiniで $x_1$ と $x_2$ を順に積分すると、すべての $\varphi\in C_c^\infty(\mathbb R^2;\mathbb R^2)$ について

$$
\int_{\mathbb R^2}\varphi\cdot dDu
=\int_0^1\left[\varphi_1(0,t)-\varphi_1(1,t)\right]dt
+\int_0^1\left[\varphi_2(t,0)-\varphi_2(t,1)\right]dt.
$$

左辺の符号は、領域の左辺・下辺で正、右辺・上辺で負です。四辺の開線分は互いに素な測度の台を持つ（角は各辺の一次元測度で零）ので、各辺のベクトルの長さ1を足して

$$
|Du|(\mathbb R^2)=1+1+1+1=4.
$$

角点にDirac質量は現れません。面や辺の法線方向は後の有限周長集合で使いますが、ここではテスト積分だけで符号・測度を確定できました。

## 5. 領域に依存する境界と滑らかな積公式

同じ $u=\boldsymbol{1}_{(0,1)^2}$ を今度は $\Omega=(0,1)^2$ の関数として見ると、$u\equiv1$ であり $Du=0$、$V_\Omega(u)=0$ です。領域の外のテスト関数を許さないため、**$\Omega$ の境界上のジャンプは $\Omega$ 内の変動には数えません**。一般に $U\subset\Omega$ を開集合とすると、$Du$ の $U$ への制限は $D(u|_U)$ です。この局所性はテスト関数の台が $U$ 内にあることから従います。

一方、滑らかな関数を掛けるときは普通の積の微分と測度値微分が足し合わされます。この公式は後の局所近似にも必要です。

<a id="prop-gmt21-product"></a>

<!-- formal-statement-start -->
> **命題（BVの滑らかな乗数積公式）**  
> $\Omega\subset\mathbb R^d$ は開集合、$u\in BV(\Omega)$、$\eta\in C_c^\infty(\Omega)$ とする。このとき $\eta u\in BV(\Omega)$ であり

$$
D(\eta u)=\eta\,Du+u\nabla\eta\,dx,
$$

> また

$$
|D(\eta u)|(\Omega)\le\|\eta\|_\infty|Du|(\Omega)
+\int_\Omega|u||\nabla\eta|\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

テスト場 $\varphi$ に対して、積の発散 $\operatorname{div}(\eta\varphi)$ を展開します。符号を確かめて $Du$ と $u\nabla\eta\,dx$ を得たあと、測度の双対表示で上界を示します。

<!-- proof-start -->
### 証明

$\varphi\in C_c^\infty(\Omega;\mathbb R^d)$ とすると、各座標で積の微分を足して

$$
\operatorname{div}(\eta\varphi)=\eta\operatorname{div}\varphi+\nabla\eta\cdot\varphi.
$$

この等式を $-\int u(\cdot)$ に代入すると

$$
\begin{aligned}
-\int_\Omega\eta u\operatorname{div}\varphi\,dx
&=-\int_\Omega u\operatorname{div}(\eta\varphi)\,dx
+\int_\Omega u\nabla\eta\cdot\varphi\,dx\\
&=\int_\Omega\eta\varphi\cdot dDu
+\int_\Omega\varphi\cdot(u\nabla\eta)\,dx.
\end{aligned}
$$

右辺は二つの有限ベクトル値Radon測度の和がテスト場へ作用したものであり、[測度値微分の一意性](#thm-gmt21-measure-derivative)から積公式を得ます。さらに $|\varphi|\le1$ なら

$$
\left|\int_\Omega\varphi\cdot dD(\eta u)\right|
\le\int_\Omega|\eta|\,d|Du|+\int_\Omega|u||\nabla\eta|\,dx.
$$

[ベクトル値測度の双対公式](#thm-gmt21-variation-duality)で上限を取ると評価が従い、$\eta u\in L^1$ と合わせてBV所属も示されます。$\square$
<!-- proof-end -->

## 6. 演習：符号・密度・境界を紙上で確かめる

### Level A：基本的な変動とジャンプ

<a id="ex-gmt21-a01"></a>
### GMT21-A01 滑らかな関数の変動

- Level: A

$\Omega=(0,1)^2$、$u(x_1,x_2)=2x_1-3x_2$ とする。$Du$ と $V_\Omega(u)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$u$ は有界領域上の滑らかな関数なので $u\in W^{1,1}(\Omega)$ です。偏微分は $\partial_1u=2$、$\partial_2u=-3$ であり、[W11とBVの比較](#prop-gmt21-w11-inclusion)を $u$ に適用します。

$$
Du=(2,-3)\,dx,\qquad
V_\Omega(u)=\int_{(0,1)^2}\sqrt{2^2+(-3)^2}\,dx=\sqrt{13}.
$$

面積が1であることを最後の等号に用いました。成分絶対値の和5を答えにしてはいけません。
<!-- solution-end -->

<a id="ex-gmt21-a02"></a>
### GMT21-A02 跳躍の符号

- Level: A

$\Omega=(-1,1)^2$、$u(x)=2\boldsymbol{1}_{\{x_1>0\}}(x)-1$ とする。テスト関数の積分から $Du$ と $|Du|(\Omega)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$u=-1$（左）、$u=1$（右）です。$\varphi\in C_c^\infty(\Omega;\mathbb R^2)$ に対して、第一成分を $x_1$ について左右に分けて積分すると

$$
-\int_{-1}^1u(x_1,x_2)\partial_1\varphi_1\,dx_1
=-\left[-\varphi_1(0,x_2)-\varphi_1(0,x_2)\right]
=2\varphi_1(0,x_2).
$$

ここで右側の積分 $\int_0^1\partial_1\varphi_1=-\varphi_1(0,x_2)$、左側の積分 $\int_{-1}^0\partial_1\varphi_1=\varphi_1(0,x_2)$ を別々に計算しました。第二成分では $u$ が $x_2$ に依存しないため0です。従って $Du=2e_1\lambda_S$、$S=\{0\}\times(-1,1)$、$|Du|(\Omega)=2\cdot2=4$ です。
<!-- solution-end -->

<a id="ex-gmt21-a03"></a>
### GMT21-A03 定義域を変えると境界項が変わる

- Level: A

$u=\boldsymbol{1}_{(0,1)}$ とする。$u$ を $\mathbb R$ 上の関数と見た場合と、$\Omega=(0,1)$ 上の関数と見た場合の分布微分を、それぞれテスト関数から求めよ。

<!-- solution-start -->
#### 詳細解答

$\psi\in C_c^\infty(\mathbb R)$ なら

$$
\langle Du,\psi\rangle=-\int_0^1\psi'(x)\,dx
=\psi(0)-\psi(1).
$$

従って $Du=\delta_0-\delta_1$、$|Du|(\mathbb R)=2$ です。一方 $\psi\in C_c^\infty((0,1))$ は両端の近傍で0だから、$-\int_0^1\psi'=0$ です。よって $Du=0$、$|Du|((0,1))=0$ です。どちらも同じ点wise式ですが、テスト関数の許される台が違います。
<!-- solution-end -->

<a id="ex-gmt21-a04"></a>
### GMT21-A04 正方形の各面の符号

- Level: A

$Q=(0,1)^2$、$u=\boldsymbol{1}_Q$ を $\mathbb R^2$ 上で考える。四辺に現れる $D_1u,D_2u$ の符号を求め、$|Du|(\mathbb R^2)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

第一成分について $\int_0^1\partial_1\varphi_1(x_1,t)dx_1=\varphi_1(1,t)-\varphi_1(0,t)$ です。分布微分には先頭にマイナスがあるので、左辺に正、右辺に負の測度が生じます。第二成分も $x_2$ 方向へ同じ積分を行い、下辺に正、上辺に負が生じます。すなわち

$$
\begin{aligned}
D_1u&=(\delta_0-\delta_1)(dx_1)\otimes\boldsymbol{1}_{(0,1)}(x_2)dx_2,\\
D_2u&=\boldsymbol{1}_{(0,1)}(x_1)dx_1\otimes(\delta_0-\delta_1)(dx_2).
\end{aligned}
$$

四つの開辺上での向きの長さはどれも1、各辺長は1です。角点は線分測度零なので $|Du|(\mathbb R^2)=4$ です。
<!-- solution-end -->

<a id="ex-gmt21-a05"></a>
### GMT21-A05 尖点と跳躍の違い

- Level: A

$\Omega=(-1,1)^2$、$u(x_1,x_2)=|x_1|$ とする。$Du$ と全変動質量を求め、$\{x_1=0\}$ 上の原子的寄与の有無を答えよ。

<!-- solution-start -->
#### 詳細解答

一変数の絶対値関数は局所絶対連続であり、そのa.e.導関数は $\operatorname{sgn}(x_1)$ です。$u\in W^{1,1}(\Omega)$ なので[W11とBVの比較](#prop-gmt21-w11-inclusion)より

$$
Du=(\operatorname{sgn}(x_1),0)\,dx,\qquad
|Du|(\Omega)=\int_{-1}^1\int_{-1}^1 1\,dx_2dx_1=4.
$$

$u$ は $x_1=0$ で連続であり、測度はLebesgue密度を持ちます。直線 $\{x_1=0\}$ は二次元Lebesgue測度零だから、そこに質量はありません。
<!-- solution-end -->

### Level B：複数の変動を接続する

<a id="ex-gmt21-b01"></a>
### GMT21-B01 交差するジャンプ

- Level: B

$\Omega=(-1,1)^2$、$u=\boldsymbol{1}_{\{x_1>0\}}+2\boldsymbol{1}_{\{x_2>0\}}$ とする。$Du$ と $|Du|(\Omega)$ を求め、原点に質量が付かない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

線形性と各変数の一次元部分積分を使います。$\lambda_v$ を垂直線分 $\{0\}\times(-1,1)$ 上の $x_2$ 座標Lebesgue測度、$\lambda_h$ を水平線分 $(-1,1)\times\{0\}$ 上の $x_1$ 座標Lebesgue測度と定義します。すると

$$
Du=e_1\lambda_v+2e_2\lambda_h.
$$

二つの直線の交点は原点だけで、各線分測度は点集合に質量0を与えます。従って二つの測度は互いに特異であり、$|Du|$ は垂直線上の長さ1の密度と水平線上の長さ2の密度をそれぞれ持ちます。各線分の長さは2なので

$$
|Du|(\Omega)=1\cdot2+2\cdot2=6.
$$

交点があるというだけで、そこにDirac質量は生じません。
<!-- solution-end -->

<a id="ex-gmt21-b02"></a>
### GMT21-B02 一般の長方形

- Level: B

$a,b>0$、$Q=(0,a)\times(0,b)$、$u=\boldsymbol{1}_Q$ を $\mathbb R^2$ 上で考える。$Du$ をテスト場との作用で書き、全変動が $2(a+b)$ であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

任意の $\varphi\in C_c^\infty(\mathbb R^2;\mathbb R^2)$ に対して、まず発散を成分ごとに積分します。

$$
\begin{aligned}
-\int_Q\partial_1\varphi_1\,dx
&=\int_0^b[\varphi_1(0,t)-\varphi_1(a,t)]dt,\\
-\int_Q\partial_2\varphi_2\,dx
&=\int_0^a[\varphi_2(s,0)-\varphi_2(s,b)]ds.
\end{aligned}
$$

よって $Du$ は左辺で $+e_1$、右辺で $-e_1$、下辺で $+e_2$、上辺で $-e_2$ の面測度です。互いに異なる開辺の測度は交差せず、角点も零集合です。左・右辺の長さは $b$、下・上辺の長さは $a$ であり

$$
|Du|(\mathbb R^2)=b+b+a+a=2(a+b).
$$

これは長方形の幾何学的周長と一致しますが、ここでは分布微分から導出しました。
<!-- solution-end -->

<a id="ex-gmt21-b03"></a>
### GMT21-B03 ベクトル測度の大きさと方向

- Level: B

$p=(0,0)\in\mathbb R^2$、$\mu=(3\delta_p,4\delta_p)$ とする。定義から $\lambda,g,\sigma_\mu,|\mu|$ を求め、$\sup_{|\varphi|\le1}\int\varphi\cdot d\mu$ の値とその達成方向を説明せよ。上限のテスト場は $C_c^\infty(\mathbb R^2;\mathbb R^2)$ とする。

<!-- solution-start -->
#### 詳細解答

成分変動は $3\delta_p$ と $4\delta_p$ なので $\lambda=7\delta_p$ です。Radon–Nikodym密度は $g=(3/7,4/7)$、そのノルムは $5/7$ です。[ベクトル値測度の極分解](#def-gmt21-vector-variation)の定義に代入すると

$$
|\mu|=\frac57(7\delta_p)=5\delta_p,\qquad
\sigma_\mu=\frac{(3/7,4/7)}{5/7}=(3/5,4/5).
$$

任意の $|\varphi(p)|\le1$ に対し Cauchy–Schwarz で $3\varphi_1(p)+4\varphi_2(p)\le5$ です。$p$ の近傍で値が $(3/5,4/5)$ の滑らかなコンパクト台の場を取ればその値は5となります。従って上限は5です。
<!-- solution-end -->

<a id="ex-gmt21-b04"></a>
### GMT21-B04 切断関数を掛けた変動

- Level: B

$u\in BV(\Omega)$、$\eta\in C_c^\infty(\Omega)$ とする。テスト関数から $D(\eta u)$ の積公式を導き、$|D(\eta u)|(\Omega)$ の上界を示せ。

<!-- solution-start -->
#### 詳細解答

テスト場 $\varphi$ に対し $\operatorname{div}(\eta\varphi)=\eta\operatorname{div}\varphi+\nabla\eta\cdot\varphi$ を各成分の積の微分から得ます。これを分布微分の定義へ代入すると

$$
\begin{aligned}
\langle D(\eta u),\varphi\rangle
&=-\int_\Omega u\eta\operatorname{div}\varphi\,dx\\
&=-\int_\Omega u\operatorname{div}(\eta\varphi)\,dx
+\int_\Omega u\nabla\eta\cdot\varphi\,dx\\
&=\int_\Omega\eta\varphi\cdot dDu
+\int_\Omega\varphi\cdot(u\nabla\eta)\,dx.
\end{aligned}
$$

従って $D(\eta u)=\eta Du+u\nabla\eta dx$ です。$|\varphi|\le1$ ならそれぞれの項は $\|\eta\|_\infty|Du|(\Omega)$ と $\int|u||\nabla\eta|dx$ で抑えられます。[ベクトル値測度の双対公式](#thm-gmt21-variation-duality)で上限を取って

$$
|D(\eta u)|(\Omega)\le\|\eta\|_\infty|Du|(\Omega)+\int_\Omega|u||\nabla\eta|dx.
$$
<!-- solution-end -->

### Level C：密度とジャンプを統合する

<a id="ex-gmt21-c01"></a>
### GMT21-C01 重み付き長方形の全変動

- Level: C

$Q=(0,1)^2$、$u(x_1,x_2)=(1+x_1)\boldsymbol{1}_Q(x_1,x_2)$ を $\mathbb R^2$ 上の関数とする。分布微分を内部のLebesgue密度部分と四辺の測度部分に分けて求め、$|Du|(\mathbb R^2)$ を計算せよ。角点と境界の符号も確認せよ。

<!-- solution-start -->
#### 詳細解答

$\eta\in C_c^\infty(\mathbb R^2)$ を $\overline Q$ の近傍で $1+x_1$ と一致させて取れます。$u=\eta\boldsymbol{1}_Q$ であるから、[積公式](#prop-gmt21-product)と[正方形の特性関数の分布微分](#ex-gmt21-a04)により

$$
Du=\boldsymbol{1}_Q e_1\,dx+(1+x_1)D\boldsymbol{1}_Q.
$$

内部では勾配が $(1,0)$ です。境界では左辺 $x_1=0$ で $+e_1$、右辺 $x_1=1$ で $-2e_1$、下辺 $x_2=0$ で $+(1+x_1)e_2$、上辺 $x_2=1$ で $-(1+x_1)e_2$ が現れます。テスト場への作用を完全に書けば

$$
\begin{aligned}
\int\varphi\cdot dDu
&=\int_Q\varphi_1\,dx
+\int_0^1\varphi_1(0,t)dt-2\int_0^1\varphi_1(1,t)dt\\
&\quad+\int_0^1(1+s)\varphi_2(s,0)ds
-\int_0^1(1+s)\varphi_2(s,1)ds.
\end{aligned}
$$

内部Lebesgue測度と四辺の一次元測度は互いに特異で、四辺どうしの交点はそれぞれの測度で零です。よって各部分の全変動を加えられます。内部は $\int_Q1dx=1$、左右は $1+2=3$、上下は各 $\int_0^1(1+s)ds=3/2$ なので

$$
|Du|(\mathbb R^2)=1+1+2+\frac32+\frac32=7.
$$

角点にはDirac質量を追加しません。右辺で符号が負になるのは、特性関数が $x_1=1$ を越えると $1+x_1$ から0へ下がるためです。
<!-- solution-end -->

## 7. 何ができるようになったか

通常の弱勾配が存在しない跳躍関数でも、$Du$ を有限なベクトル値Radon測度として扱えます。$|Du|$ は内部の滑らかな勾配と面を横切るジャンプの両方を一つの測度に集め、しかもテスト場の上限から再構成できます。

次は、平滑化と $L^1$ 収束に対する全変動の下半連続性を扱います。**$L^1$ 収束だけでは全変動が収束するとは限らない**ので、両者の区別が次の主題です。
