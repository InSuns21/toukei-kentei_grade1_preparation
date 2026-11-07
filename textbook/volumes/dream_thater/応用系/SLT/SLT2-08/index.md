# SLT2-08 ニューラルネットの線形化

[前章のkernel補間と核勾配流](../SLT2-07/index.md#thm-slt2-07-kernel-flow-spectrum)では、核行列を固定すると訓練点上の変化を固有方向ごとに計算できた。しかしニューラルネットでは、重みを更新するたびに入力から出力への写像自体が変わる。**学習を始める点の周囲で、その変化を一つの線形模型に置き換えられるか**が本章の問いである。

[ML2-14の逆伝播公式](../../ML/ML2-14/index.md#thm-ml2-14-backprop)は、重みを動かしたときの出力の微分を計算する方法を与える。ここではその微分を、訓練標本全体に並べた行列として調べる。微分が存在すること、一次近似の誤差が小さいこと、学習中も同じ微分が使えることは、それぞれ別の条件を必要とする。

到達目標は次の五つである。

1. 二層網の各パラメータに関する微分を成分ごとに導出する。
2. 初期点まわりの線形化とTaylor剰余を、仮定付きで評価する。
3. 微分ベクトルの内積からGram行列を作り、正半定値性を証明する。
4. 一回の学習更新と接線核の変化を、有限次元の式で比較する。
5. 非微分点・大きい重み移動・時間の経過で何が保証されなくなるかを説明する。

## 1. 二層網をパラメータの関数として見る

入力を $x\in\mathbb R^d$、幅を整数 $m\ge1$ とする。隠れニューロン $r$ は重み $w_r\in\mathbb R^d$、バイアス $b_r\in\mathbb R$、出力係数 $a_r\in\mathbb R$ を持ち、活性化関数 $\sigma:\mathbb R\to\mathbb R$ を通して一つの実数を返す。出力は

$$
f_\theta(x)=\frac1{\sqrt m}\sum_{r=1}^m a_r\sigma(z_r(x)),
\qquad z_r(x)=w_r^{\mathsf T}x+b_r.
$$

ここで $\theta=(a_1,w_1,b_1,\ldots,a_m,w_m,b_m)$ は各ニューロンの順に並べた実数パラメータで、次元は $p=m(d+2)$。この節では $\sigma$ が少なくとも一回連続微分可能とする。出力の $1/\sqrt m$ は**この章で固定したパラメータ化の規約**である。別の幅スケーリングでは以下の係数が変わる。

固定入力 $x_1,\ldots,x_n$（$n\ge1$、重複可）での予測を列ベクトル

$$
F(\theta)=(f_\theta(x_1),\ldots,f_\theta(x_n))^{\mathsf T}\in\mathbb R^n
$$

と置く。[Jacobianの行・列の規約](../../ML/ML2-14/index.md#thm-ml2-14-layer-jacobian)により、$F$ のJacobian $J(\theta)$ は $n\times p$ 行列で、行 $i$ が $\nabla_\theta f_\theta(x_i)^{\mathsf T}$、列がパラメータ成分に対応する。**行は訓練点、列はパラメータ**であり、特徴を並べる行列とは向きを取り違えない。

<a id="thm-slt2-08-parameter-jacobian"></a>

<!-- formal-statement-start -->
> **定理（二層網のパラメータJacobian）**
> 整数 $d,m,n\ge1$、$\sigma\in C^1(\mathbb R)$、$\theta=(a_r,w_r,b_r)_{r=1}^m\in\mathbb R^{m(d+2)}$、$x_1,\ldots,x_n\in\mathbb R^d$ とする。
> 次の実数値二層網の各パラメータブロックに関する勾配を計算する。
>
$$
f_\theta(x)=m^{-1/2}\sum_{r=1}^m a_r\sigma(w_r^{\mathsf T}x+b_r),\qquad
z_r=w_r^{\mathsf T}x+b_r.
$$
>
> このとき
>
$$
\frac{\partial f_\theta(x)}{\partial a_r}
=\frac{\sigma(z_r)}{\sqrt m},\qquad
\nabla_{w_r}f_\theta(x)
=\frac{a_r\sigma'(z_r)}{\sqrt m}\,x,\qquad
\frac{\partial f_\theta(x)}{\partial b_r}
=\frac{a_r\sigma'(z_r)}{\sqrt m}.
$$
>
> これらを指定したパラメータ順に行へ並べれば $J(\theta)\in\mathbb R^{n\times m(d+2)}$ を得る。
<!-- formal-statement-end -->

### 証明の見取り図

他のニューロンの項は、選んだニューロンのパラメータによる微分で零になる。$a_r$ は単純な係数であり、$w_r,b_r$ には中間変数 $z_r$ を通じて連鎖律を使う。

<!-- proof-start -->
### 証明

出力の和のうち $r$ 番目だけを取り出す。$a_r$ を変数とすると $\sigma(z_r)$ は一定だから第一式を得る。重みの第 $j$ 成分に対しては $\partial z_r/\partial (w_r)_j=x_j$ である。[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を外側 $\sigma$、内側 $z_r$ に使い、

$$
\frac{\partial f_\theta(x)}{\partial (w_r)_j}
=\frac{a_r}{\sqrt m}\sigma'(z_r)
 \frac{\partial z_r}{\partial (w_r)_j}
=\frac{a_r\sigma'(z_r)x_j}{\sqrt m}.
$$

$j=1,\ldots,d$ を縦に並べると重み勾配を得る。バイアスでは $\partial z_r/\partial b_r=1$ だから第三式となる。出力 $F_i=f_\theta(x_i)$ のパラメータ微分をそのまま第 $i$ 行に置けば、行数 $n$、列数 $m(d+2)$ の行列になる。$\square$
<!-- proof-end -->

初めてこの行列を使うときは、公式の暗記より「一つの重みの微小変更が、どの入力で何倍の出力変化になるか」と読むとよい。

### 手計算例：幅1でもパラメータについては非線形

$d=m=1$、$\sigma(z)=z$、$\theta_0=(a,w,b)=(2,1,0)$、訓練入力を $(x_1,x_2)=(0,1)$ とする。出力関数は $f_\theta(x)=a(wx+b)$ であり、$f_{\theta_0}(0)=0$、$f_{\theta_0}(1)=2$ である。公式の三つの列を実際に並べると

$$
\nabla_\theta f_{\theta_0}(x)=(x,2x,2)^{\mathsf T},
\qquad
J_0=\begin{pmatrix}0&0&2\\1&2&2\end{pmatrix}.
$$

活性化は入力に対して線形でも、$a$ と $w,b$ の積を含むため、パラメータについての写像は一般に線形ではない。この違いが次節の剰余を生む。

## 2. どこまで一次近似してよいか

初期パラメータ $\theta_0$ を固定し、変化量を $\Delta=\theta-\theta_0\in\mathbb R^p$ とする。有限標本の予測を近似したい場合には、初期出力 $F(\theta_0)$ に $J_0\Delta$ を加える。これは重みを変えて新しい非線形網を再計算することとは異なる、**固定した係数の一次模型**である。

<a id="def-slt2-08-linearization"></a>

<!-- formal-statement-start -->
> **定義（初期点でのニューラルネット線形化）**
> 微分可能な写像 $F:\mathbb R^p\to\mathbb R^n$ と初期点 $\theta_0\in\mathbb R^p$ に対し、$J_0=DF(\theta_0)\in\mathbb R^{n\times p}$ とする。
> 変位 $\Delta\in\mathbb R^p$ における**一次線形化予測**と**一次近似の剰余**を
>
$$
F_{\mathrm{lin}}(\Delta)=F(\theta_0)+J_0\Delta,\qquad
\mathcal R(\Delta)=F(\theta_0+\Delta)-F_{\mathrm{lin}}(\Delta)
$$
>
> と定める。各入力 $x$ における線形化も、次式で定める。
>
$$
f_{\mathrm{lin}}(x;\Delta)=f_{\theta_0}(x)+\nabla_\theta f_{\theta_0}(x)^{\mathsf T}\Delta.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-08-linearization -->
**定義の確認**。前節の幅1の網に $\Delta=(u,v,s)$ を与える。$J_0$ と初期出力を代入すると

$$
F_{\mathrm{lin}}(\Delta)
=\begin{pmatrix}2s\\2+u+2v+2s\end{pmatrix}.
$$

他方、真の網の値は $F(\theta_0+\Delta)=((2+u)s,(2+u)(1+v+s))^{\mathsf T}$ なので、両者の差を成分ごとに取って

$$
\mathcal R(\Delta)=\begin{pmatrix}us\\u(v+s)\end{pmatrix}.
$$

初期点 $\Delta=0$ では剰余が零で、一次の項はすべて線形模型が担う。$u,v,s$ が小さいときの誤差は二次の積であるが、大きいときには無視できない。
<!-- definition-example-end -->

滑らかな網で剰余を評価するには、各出力のパラメータ方向二階微分を調べる。行列 $H_i(\theta)=\nabla_\theta^2 f_\theta(x_i)$ の作用素ノルムを $\|H_i\|_{\mathrm{op}}$ と書く。これは単位方向 $v$ に対する $|v^{\mathsf T}H_iv|$ の最大値であり、二階微分の大きさを測る。

<a id="thm-slt2-08-taylor"></a>

<!-- formal-statement-start -->
> **定理（線形化のTaylor剰余界）**
> $F=(f_1,\ldots,f_n):U\to\mathbb R^n$ は開集合 $U\subset\mathbb R^p$ 上で二回連続微分可能とする。$\theta_0,\theta_0+\Delta\in U$ を結ぶ線分が $U$ に含まれ、その線分上で $\|\nabla^2f_i(\theta_0+t\Delta)\|_{\mathrm{op}}\le M_i$（$0\le t\le1$）がすべての $i$ について成立するとする。このとき
>
$$
|\mathcal R_i(\Delta)|\le \frac{M_i}{2}\|\Delta\|_2^2,\qquad
\|\mathcal R(\Delta)\|_2
\le\frac12\left(\sum_{i=1}^n M_i^2\right)^{1/2}\|\Delta\|_2^2.
$$
>
> 特に $M_i\le M$ なら $\|\mathcal R(\Delta)\|_2\le(\sqrt n M/2)\|\Delta\|_2^2$ である。ここでの評価はその線分に限る。
<!-- formal-statement-end -->

### 証明の見取り図

多変数の変化を $t\mapsto f_i(\theta_0+t\Delta)$ という一変数の曲線に制限する。展開点 $t=0$、評価点 $t=1$、次数1のTaylor公式を適用し、二階項を線分上で抑える。

<!-- proof-start -->
### 証明

$g_i(t)=f_i(\theta_0+t\Delta)$（$0\le t\le1$）とする。$U$ 内の線分上で連鎖律を二回適用できるので、

$$
g_i'(t)=\nabla f_i(\theta_0+t\Delta)^{\mathsf T}\Delta,
\qquad
g_i''(t)=\Delta^{\mathsf T}H_i(\theta_0+t\Delta)\Delta.
$$

[Taylorの定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)の積分剰余形を、この $g_i$ に展開点0、評価点1、一次までとして適用すると

$$
g_i(1)=g_i(0)+g_i'(0)+\int_0^1(1-t)g_i''(t)\,dt.
$$

$g_i(0)=f_i(\theta_0)$、$g_i'(0)=(J_0\Delta)_i$ を代入して

$$
\mathcal R_i(\Delta)
=\int_0^1(1-t)\Delta^{\mathsf T}H_i(\theta_0+t\Delta)\Delta\,dt.
$$

$|\Delta^{\mathsf T}H_i\Delta|\le\|H_i\|_{\mathrm{op}}\|\Delta\|_2^2\le M_i\|\Delta\|_2^2$ と $\int_0^1(1-t)\,dt=1/2$ から第一の不等式を得る。各成分を二乗して足すと

$$
\|\mathcal R\|_2^2=\sum_i|\mathcal R_i|^2
\le\frac14\|\Delta\|_2^4\sum_iM_i^2.
$$

非負の平方根を取って第二の不等式を得る。$\square$
<!-- proof-end -->

### 二層網では何を仮定すればよいか

一般のHessianに頼らず、隠れニューロンの各項からも直接評価できる。$\sigma\in C^2(\mathbb R)$ とし、調べる入力 $x$ に対して $\xi=(x^{\mathsf T},1)^{\mathsf T}\in\mathbb R^{d+1}$ と置く。$v_r=(w_r,b_r)$、$\delta v_r=(\delta w_r,\delta b_r)$ とすると $z_r=v_r^{\mathsf T}\xi$、$u_r=\delta v_r^{\mathsf T}\xi$ である。初期点と更新点を結ぶ各ニューロンの区間で

$$
|\sigma'(z)|\le L_1,\qquad
|\sigma''(z)|\le L_2,\qquad
|a_r+\delta a_r|\le A
$$

が成り立つとする。$A,L_1,L_2$ は有限の非負定数とし、$a_r+\delta a_r$ の条件は更新後の係数についてだけ課している。スカラーTaylor剰余 $q_r=\sigma(z_r+u_r)-\sigma(z_r)-\sigma'(z_r)u_r$ は $|q_r|\le L_2u_r^2/2$ を満たす。出力の一次項を引いた残りは、積を展開して

$$
f_{\theta_0+\Delta}(x)-f_{\mathrm{lin}}(x;\Delta)
=\frac1{\sqrt m}\sum_{r=1}^m
\left\{(a_r+\delta a_r)q_r+\delta a_r\sigma'(z_r)u_r\right\}.
$$

$|u_r|\le\|\xi\|_2\|\delta v_r\|_2$ と、$2|c|\,|d|\le c^2+d^2$ を各項に使うと

$$
\begin{aligned}
|f_{\theta_0+\Delta}(x)-f_{\mathrm{lin}}(x;\Delta)|
&\le\frac1{\sqrt m}\left(
\frac{A L_2\|\xi\|_2^2}{2}\sum_r\|\delta v_r\|_2^2+
L_1\|\xi\|_2\sum_r|\delta a_r|\|\delta v_r\|_2\right)\\
&\le\frac{A L_2\|\xi\|_2^2+L_1\|\xi\|_2}{2\sqrt m}\|\Delta\|_2^2.
\end{aligned}
$$

幅 $m$ が分母に現れても、**幅を大きくしただけでは線形化が正確とは結論できない**。移動量 $\|\Delta\|_2$、係数の上界 $A$、活性化の微分の上界、入力の大きさが幅とともにどう変わるかを同時に調べる必要がある。

## 3. 出力を動かす「接線特徴」から核を作る

固定kernel法では各入力に固定の特徴ベクトルを割り当て、その内積でGram行列を作った。ニューラルネットでも、**初期点における出力の微分ベクトル**を一つの特徴とみなせる。これは入力を微小に動かす微分ではなく、パラメータを微小に動かす微分である。

<a id="def-slt2-08-ntk"></a>

<!-- formal-statement-start -->
> **定義（接線特徴とニューラル接線核）**
> $\theta\in\mathbb R^p$ に関して微分可能な実数値網 $f_\theta:\mathcal X\to\mathbb R$ に対し、各入力 $x\in\mathcal X$ での**接線特徴**を $\phi_\theta(x)=\nabla_\theta f_\theta(x)\in\mathbb R^p$ とする。
> 二入力 $x,x'\in\mathcal X$ の**ニューラル接線核**（neural tangent kernel、NTK）を
>
$$
k_\theta(x,x')=\phi_\theta(x)^{\mathsf T}\phi_\theta(x')
$$
>
> と定める。有限入力 $x_1,\ldots,x_n$ での**接線Gram行列**は次の行列とする。
>
$$
K_\theta=(k_\theta(x_i,x_j))_{i,j=1}^n
=J(\theta)J(\theta)^{\mathsf T}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-08-ntk -->
**定義の確認**。第1節の幅1の網と入力 $0,1$ を使う。両入力の接線特徴はそれぞれ $(0,0,2)^{\mathsf T}$、$(1,2,2)^{\mathsf T}$ であり、内積の三通りを計算すると

$$
k_{\theta_0}(0,0)=4,\quad
k_{\theta_0}(0,1)=4,\quad
k_{\theta_0}(1,1)=1+4+4=9.
$$

ゆえに

$$
K_0=\begin{pmatrix}4&4\\4&9\end{pmatrix}.
$$

これは接線特徴の内積という定義から直接作った行列であり、単に名前をつけたのではない。$K_0$ は対称で、主座小行列式 $4>0$ と行列式 $4\cdot9-4^2=20>0$ から、この二入力では正定値と判定できる。
<!-- definition-example-end -->

<a id="thm-slt2-08-ntk-formula"></a>

<!-- formal-statement-start -->
> **定理（ニューラル接線核の具体式と正半定値性）**
> $d,m\ge1$、$\sigma\in C^1(\mathbb R)$、$\theta=(a_r,w_r,b_r)_{r=1}^m$ とし、二層網と中間値を次のように定める。
>
$$
f_\theta(x)=m^{-1/2}\sum_{r=1}^m a_r\sigma(w_r^{\mathsf T}x+b_r),\qquad
z_r(x)=w_r^{\mathsf T}x+b_r.
$$
>
> このとき任意の $x,x'\in\mathbb R^d$ に対し
>
$$
k_\theta(x,x')=\frac1m\sum_{r=1}^m\left[
\sigma(z_r(x))\sigma(z_r(x'))
+a_r^2\sigma'(z_r(x))\sigma'(z_r(x'))(x^{\mathsf T}x'+1)
\right].
$$
>
> 任意の有限入力 $x_1,\ldots,x_n$ に対して $K_\theta$ は実対称正半定値であり、$\operatorname{rank}K_\theta\le\min(n,m(d+2))$ である。したがって正定値性は一般には保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

各ニューロンのパラメータブロックは互いに異なる座標を占める。接線特徴どうしの内積は、出力係数の微分どうし、重みの微分どうし、バイアスの微分どうしを各ブロックで足すと得られる。有限標本では $K=JJ^{\mathsf T}$ となるので、正半定値性は二乗ノルムで直接分かる。

<!-- proof-start -->
### 証明

[二層網のパラメータJacobian](#thm-slt2-08-parameter-jacobian)の $r$ 番目のブロックを二入力 $x,x'$ について内積に取る。出力係数による項は $m^{-1}\sigma(z_r(x))\sigma(z_r(x'))$、重みによる項は

$$
\left(\frac{a_r\sigma'(z_r(x))}{\sqrt m}x\right)^{\mathsf T}
\left(\frac{a_r\sigma'(z_r(x'))}{\sqrt m}x'\right)
=\frac{a_r^2}{m}\sigma'(z_r(x))\sigma'(z_r(x'))x^{\mathsf T}x',
$$

バイアスによる項は $m^{-1}a_r^2\sigma'(z_r(x))\sigma'(z_r(x'))$ となる。異なるニューロンの成分は異なる座標にあり交差項を持たないので、$r$ で和を取ると具体式を得る。

$J$ の第 $i$ 行を $\phi_\theta(x_i)^{\mathsf T}$ とすると、各成分は

$$
(JJ^{\mathsf T})_{ij}
=\sum_{\alpha=1}^p J_{i\alpha}J_{j\alpha}
=\phi_\theta(x_i)^{\mathsf T}\phi_\theta(x_j)
=(K_\theta)_{ij}.
$$

ゆえに $K_\theta$ は対称で、任意の $c\in\mathbb R^n$ に対して

$$
c^{\mathsf T}K_\theta c
=c^{\mathsf T}JJ^{\mathsf T}c
=\|J^{\mathsf T}c\|_2^2\ge0.
$$

また $K_\theta$ の像は $J$ の列空間に含まれるため $\operatorname{rank}K_\theta\le\operatorname{rank}J\le\min(n,p)$ である。$\square$
<!-- proof-end -->

たとえば $x_1=x_2$ なら $J$ の第1、2行が一致する。$c=(1,-1,0,\ldots,0)^{\mathsf T}$ を取れば $J^{\mathsf T}c=0$、従って $K_\theta c=0$。重複入力では、どんな滑らかな網でも正定値にならない。これは[前章の特異Gram行列での補間判定](../SLT2-07/index.md#thm-slt2-07-minimum-norm)と同じ線形代数であるが、ここでの特徴は**現在のパラメータに依存する**。

## 4. 一回の更新と、変わってしまう接線Gram行列

教師ベクトル $y\in\mathbb R^n$ を固定し、訓練損失を

$$
L(\theta)=\frac12\|F(\theta)-y\|_2^2
$$

とする。ここでは $1/n$ を付けない規格化を採用する。残差を $e(\theta)=F(\theta)-y$ と呼ぶ。[逆伝播の連鎖律](../../ML/ML2-14/index.md#thm-ml2-14-backprop)により、勾配は $\nabla_\theta L=J(\theta)^{\mathsf T}e(\theta)$ である。したがって学習率 $\eta>0$ の一回の勾配降下では、初期点で

$$
\theta_1=\theta_0-\eta J_0^{\mathsf T}e_0,
\qquad e_0=F(\theta_0)-y.
$$

線形模型なら $F_{\mathrm{lin}}$ の更新は厳密に $-\eta K_0e_0$ となる。一方、非線形網の実際の出力にはTaylor剰余が残る。また二回目以降の微分に同じ $J_0$ が使えるとは限らない。そこで**Gram行列の変化量**を別に評価する。

<a id="thm-slt2-08-drift-update"></a>

<!-- formal-statement-start -->
> **定理（接線Gram行列の変動界と一回更新）**
> $F:U\to\mathbb R^n$ を開集合 $U\subset\mathbb R^p$ 上の $C^2$ 写像、$\theta_0,\theta_1\in U$ とし、線分が $U$ に含まれるとする。$J_i=DF(\theta_i)$、$K_i=J_iJ_i^{\mathsf T}$ と置く。
>
> **（1）Gram行列の変動。** $\|J_1-J_0\|_{\mathrm{op}}\le\varepsilon$ なら
>
$$
\|K_1-K_0\|_{\mathrm{op}}
\le 2\|J_0\|_{\mathrm{op}}\varepsilon+\varepsilon^2.
$$
>
> **（2）一回更新。** $L(\theta)=\frac12\|F(\theta)-y\|_2^2$ とし、$e_0=F(\theta_0)-y$、$\theta_1=\theta_0-\eta J_0^{\mathsf T}e_0$（$\eta>0$）とする。線分上で各 $\|\nabla^2F_i\|_{\mathrm{op}}\le M$ なら
>
$$
F(\theta_1)=F(\theta_0)-\eta K_0e_0+r,\qquad
\|r\|_2\le\frac{\sqrt n M}{2}\eta^2\|J_0^{\mathsf T}e_0\|_2^2.
$$
>
> これは有限回・無限時間の核固定性を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$J_1=J_0+E$ と置いてGram行列を展開すると、一次の交差項が二つ、二次の項が一つ出る。一回更新は、先ほどのTaylor剰余界に変位 $\Delta=-\eta J_0^{\mathsf T}e_0$ を代入すればよい。

<!-- proof-start -->
### 証明

$E=J_1-J_0$ と置き、転置を展開すると

$$
\begin{aligned}
K_1-K_0
&=(J_0+E)(J_0+E)^{\mathsf T}-J_0J_0^{\mathsf T}\\
&=J_0E^{\mathsf T}+EJ_0^{\mathsf T}+EE^{\mathsf T}.
\end{aligned}
$$

作用素ノルムの劣乗法性と $\|E^{\mathsf T}\|_{\mathrm{op}}=\|E\|_{\mathrm{op}}$ から

$$
\|K_1-K_0\|_{\mathrm{op}}
\le\|J_0\|_{\mathrm{op}}\|E\|_{\mathrm{op}}
+\|E\|_{\mathrm{op}}\|J_0\|_{\mathrm{op}}
+\|E\|_{\mathrm{op}}^2,
$$

よって（1）を得る。（2）では $F_{\mathrm{lin}}(\Delta)=F(\theta_0)+J_0\Delta$ に $\Delta=-\eta J_0^{\mathsf T}e_0$ を入れ、

$$
J_0\Delta=-\eta J_0J_0^{\mathsf T}e_0=-\eta K_0e_0.
$$

[Taylor剰余界](#thm-slt2-08-taylor)はこの線分上で適用可能なので

$$
\|F(\theta_1)-F_{\mathrm{lin}}(\Delta)\|_2
\le\frac{\sqrt n M}{2}\|\Delta\|_2^2
=\frac{\sqrt n M}{2}\eta^2\|J_0^{\mathsf T}e_0\|_2^2.
$$

これが主張である。$\square$
<!-- proof-end -->

固定した滑らかな勾配流 $\dot\theta(t)=-J(\theta(t))^{\mathsf T}(F(\theta(t))-y)$ が存在する区間では、連鎖律から

$$
\frac{d}{dt}F(\theta(t))
=-K_{\theta(t)}(F(\theta(t))-y)
$$

という瞬間ごとの**厳密な等式**が得られる。しかし $K_{\theta(t)}$ は一般に時刻 $t$ に依存する。$K_{\theta(t)}$ を初期値 $K_0$ で置き換えて解いてよいかは、Jacobianの変動を学習区間全体で抑える別の問題である。次の[固定核の学習](../SLT2-07/index.md#thm-slt2-07-kernel-flow-spectrum)と類似した方程式が現れることと、元の網が同じ解を持つことを同一視してはいけない。

## 5. 成り立たない場合を具体的に見分ける

**大きい移動。** 幅1、$\sigma(z)=z$、バイアスなし、入力 $x=1$ の網 $f_{a,w}(1)=aw$ を $\theta_0=(1,1)$ で線形化すると $f_{\mathrm{lin}}(u,v)=1+u+v$ となる。$(u,v)=(1,1)$ では真の出力は $4$、線形化は $3$、剰余は $uv=1$ である。微分が存在しても、変位が小さいことを確認せずに剰余を捨てられない。失った条件はTaylor界が有用なほど小さい $\|\Delta\|$ である。

**ReLUの折点。** $\sigma(z)=\max(0,z)$、$m=d=1$、$a=1,b=0,x=1$ とし、$w$ だけ動かすと出力は $\max(0,w)$。[ReLU活性化関数の定義](../../ML/ML2-13/index.md#def-ml2-13-relu)から $w=0$ の右微分は1、左微分は0で、古典的なJacobianは存在しない。逆伝播の実装で選ぶ微分値を、$C^1$ や $C^2$ の仮定の代わりにはできない。

**学習中のkernel変化。** 幅1、$\sigma(z)=z$、$\theta_0=(2,1,0)$、入力 $0,1$ の例で、出力係数だけを $a=3$ に変える。新しいJacobianの行は $(0,0,3)$ と $(1,3,3)$ になり、$K_1=\begin{pmatrix}9&9\\9&19\end{pmatrix}$ である。初期の $\begin{pmatrix}4&4\\4&9\end{pmatrix}$ と一致しない。**活性化が線形でも接線核が一定とは限らない**のは、パラメータ化が積を含むためである。

## まとめ：有限幅で証明できたこと

- 出力のJacobianを訓練点で並べると、初期パラメータの周りで固定された線形特徴模型が得られる。
- 二階微分の上界と重みの移動量から、一次近似の誤差を二次で評価できる。
- NTKはパラメータ微分の内積で、有限入力上のGram行列は必ず正半定値だが、必ずしも正定値ではない。
- 実際の非線形網を一歩動かした出力には二次の剰余があり、Jacobianが動けばNTKも動く。幅極限でその変動が消えるかは、初期化・パラメータ化・入力集合・学習時間を固定して別途確かめる必要がある。

## 演習

### SLT2-08-A01 幅1のJacobianと接線Gram行列
- Level: A
- 目安時間: 12分

$f_{a,w,b}(x)=a(wx+b)$、初期点 $(a,w,b)=(2,1,0)$、入力 $x_1=0,x_2=1$ とする。パラメータ順を $(a,w,b)$ として、訓練点JacobianとNTK Gram行列、行列式を求めよ。

<!-- solution-start -->
#### 詳細解答

$\partial f/\partial a=wx+b$、$\partial f/\partial w=ax$、$\partial f/\partial b=a$ である。初期点に代入して

$$
J_0=\begin{pmatrix}0&0&2\\1&2&2\end{pmatrix}.
$$

[ニューラル接線核](#def-slt2-08-ntk)の定義から $K_0=J_0J_0^{\mathsf T}$。行の内積を一つずつ取れば

$$
K_0=\begin{pmatrix}4&4\\4&9\end{pmatrix},
\qquad \det K_0=4\cdot9-4^2=20>0.
$$

対称行列の最初の主座小行列式 $4>0$ も確認できるので、この二入力で正定値である。
<!-- solution-end -->

### SLT2-08-A02 幅2の列の順序と次元
- Level: A
- 目安時間: 12分

$d=1,m=2,\sigma(z)=z$ の網を考える。$\theta=(a_1,w_1,b_1,a_2,w_2,b_2)=(1,1,0,2,-1,0)$、入力 $x=1$ とする。出力、6成分の接線特徴、$k_\theta(1,1)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

二つの中間値は $z_1=1$、$z_2=-1$ だから

$$
f_\theta(1)=\frac{1\cdot1+2\cdot(-1)}{\sqrt2}=-\frac1{\sqrt2}.
$$

[パラメータ微分公式](#thm-slt2-08-parameter-jacobian)に $x=1$、$\sigma'=1$ を代入する。各ニューロンのブロックを $(\sigma(z_r),a_rx,a_r)/\sqrt2$ と並べるため

$$
\phi_\theta(1)=\frac1{\sqrt2}(1,1,1,-1,2,2)^{\mathsf T}.
$$

これは $m(d+2)=2(1+2)=6$ 成分である。[ニューラル接線核](#def-slt2-08-ntk)の定義から

$$
k_\theta(1,1)=\|\phi_\theta(1)\|_2^2
=\frac{1+1+1+1+4+4}{2}=6.
$$
<!-- solution-end -->

### SLT2-08-A03 二次関数のTaylor剰余
- Level: A
- 目安時間: 10分

$f_{a,w,b}(x)=a(wx+b)^2$、初期点 $(a,w,b)=(1,2,0)$、入力 $x=1$ とする。$a,b$ を固定して $w$ だけ $h$ 動かす場合の一次近似と真の出力、剰余を計算せよ。二階微分の上界を使う評価とも照合せよ。

<!-- solution-start -->
#### 詳細解答

この方向の一変数関数を $g(w)=w^2$ と置く。$g(2)=4$、$g'(w)=2w$ だから $g'(2)=4$ であり、一次近似は $4+4h$。真の値は

$$
g(2+h)=4+4h+h^2.
$$

よって剰余は $h^2$。二階導関数は全実数で $g''(w)=2$ なので、[Taylor剰余界](#thm-slt2-08-taylor)をこの一次元方向へ適用すると $|h^2|\le(2/2)h^2$ で等号が成立する。
<!-- solution-end -->

### SLT2-08-A04 重複入力での特異性
- Level: A
- 目安時間: 10分

微分可能な実数値網 $f_\theta$ について $x_1=x_2$ の二つの訓練入力を取る。パラメータ数 $p\ge1$ とする。接線Gram行列 $K\in\mathbb R^{2\times2}$ が特異であることを、Jacobianから示せ。

<!-- solution-start -->
#### 詳細解答

同じ入力で同じ関数を微分するため、Jacobianの二行は同じ $v^{\mathsf T}\in\mathbb R^{1\times p}$ である。したがって

$$
J=\begin{pmatrix}v^{\mathsf T}\\v^{\mathsf T}\end{pmatrix},
\qquad K=JJ^{\mathsf T}
=\|v\|_2^2\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

$c=(1,-1)^{\mathsf T}\ne0$ に $Kc=0$ であるから特異である。$\|v\|_2=0$ でも零行列となり結論は変わらない。
<!-- solution-end -->

### SLT2-08-A05 ReLU折点の微分
- Level: A
- 目安時間: 10分

$f_w(1)=\max(0,w)$ とし、$w=0$ での左・右差商の極限を求めよ。通常のTaylor剰余界をこの点へそのまま適用できるか。

<!-- solution-start -->
#### 詳細解答

$h>0$ なら $(f_h(1)-f_0(1))/h=h/h=1$。$h<0$ なら $f_h(1)=0$ で差商は0。左右が異なるため $w=0$ で導関数は存在しない。[Taylor剰余界](#thm-slt2-08-taylor)は線分上の $C^2$ を仮定するので適用できない。算法上の値を0や1に決めても、左右の極限は変わらない。
<!-- solution-end -->

### SLT2-08-B01 全パラメータを同時に動かす
- Level: B
- 目安時間: 18分

$f_{a,w,b}(x)=a(wx+b)$、初期点 $(2,1,0)$、入力 $0,1$、変位 $\Delta=(u,v,s)$ とする。一次近似、二成分の剰余を出発点から導け。さらに $|\mathcal R_1|,|\mathcal R_2|$ が $\|\Delta\|_2^2$ の定数倍以下になる理由を不等式で示せ。

<!-- solution-start -->
#### 詳細解答

一般のパラメータに対し $f_{2+u,1+v,s}(x)=(2+u)((1+v)x+s)$。$x=0$ と $x=1$ を順に代入すると

$$
F(\theta_0+\Delta)
=\begin{pmatrix}(2+u)s\\(2+u)(1+v+s)\end{pmatrix}
=\begin{pmatrix}2s+us\\2+u+2v+2s+uv+us\end{pmatrix}.
$$

[二層網のパラメータJacobian](#thm-slt2-08-parameter-jacobian)から $J_0=\begin{pmatrix}0&0&2\\1&2&2\end{pmatrix}$ であり、

$$
F_{\mathrm{lin}}(\Delta)=\begin{pmatrix}0\\2\end{pmatrix}
+J_0\begin{pmatrix}u\\v\\s\end{pmatrix}
=\begin{pmatrix}2s\\2+u+2v+2s\end{pmatrix}.
$$

引き算すると $\mathcal R=(us,u(v+s))^{\mathsf T}$。$2|us|\le u^2+s^2\le\|\Delta\|_2^2$ なので $|\mathcal R_1|\le\|\Delta\|_2^2/2$。また Cauchy–Schwarz から

$$
|u(v+s)|\le |u|\sqrt2\sqrt{v^2+s^2}
\le\frac{\sqrt2}{2}(u^2+v^2+s^2)
=\frac1{\sqrt2}\|\Delta\|_2^2.
$$

剰余の二次評価を具体的に確かめた。
<!-- solution-end -->

### SLT2-08-B02 非線形活性化の接線核
- Level: B
- 目安時間: 18分

$d=m=1$、$\sigma(z)=z^2$、$\theta=(a,w,b)=(1,1,0)$ とし、二つの入力 $x_1=1,x_2=-1$ を取る。Jacobian、NTK Gram行列と二つの固有値を求めよ。入力で出力が等しくても接線特徴が等しいとは限らないことを説明せよ。

<!-- solution-start -->
#### 詳細解答

$z=x$、$\sigma(z)=x^2$、$\sigma'(z)=2x$。重み勾配は $a(2x)x=2x^2$、バイアス勾配は $a(2x)=2x$。よって

$$
J=\begin{pmatrix}1&2&2\\1&2&-2\end{pmatrix}.
$$

[接線Gram行列の定理](#thm-slt2-08-ntk-formula)の内積表示に従い

$$
K=JJ^{\mathsf T}=\begin{pmatrix}1+4+4&1+4-4\\1+4-4&1+4+4\end{pmatrix}
=\begin{pmatrix}9&1\\1&9\end{pmatrix}.
$$

$(1,1)^{\mathsf T}$ は固有値10、$(1,-1)^{\mathsf T}$ は固有値8の固有ベクトルである。両入力で出力は $f(1)=f(-1)=1$ だが、$b$ に関する微分はそれぞれ2と $-2$ であり、接線特徴は異なる。したがって出力値の一致からGram行列の行一致を推論できない。
<!-- solution-end -->

### SLT2-08-B03 行列変動界を手で確かめる
- Level: B
- 目安時間: 18分

二つの $2\times2$ 行列 $J_0=I_2$、$J_1=\begin{pmatrix}1&h\\0&1\end{pmatrix}$（$h\in\mathbb R$）について $K_i=J_iJ_i^{\mathsf T}$ を求めよ。$\|J_1-J_0\|_{\mathrm{op}}$ を計算し、一般のGram変動界を適用してみよ。

<!-- solution-start -->
#### 詳細解答

$$
K_0=I_2,\qquad
K_1=\begin{pmatrix}1+h^2&h\\h&1\end{pmatrix},
\qquad K_1-K_0=\begin{pmatrix}h^2&h\\h&0\end{pmatrix}.
$$

$E=J_1-J_0=\begin{pmatrix}0&h\\0&0\end{pmatrix}$ なので $Ev=(hv_2,0)^{\mathsf T}$。単位ベクトルで最大になるのは $v=(0,1)^{\mathsf T}$ で、$\|E\|_{\mathrm{op}}=|h|$。$\|J_0\|_{\mathrm{op}}=1$ として[Gram変動界](#thm-slt2-08-drift-update)は

$$
\|K_1-K_0\|_{\mathrm{op}}\le2|h|+h^2
$$

を与える。$h=0$ では両辺が零になり、それ以外では正の上界になる。$K_1-K_0$ 自体は正半定値とは限らないので、正半定値行列二つの差を正半定値とみなすことはできない。
<!-- solution-end -->

### SLT2-08-B04 一回の勾配降下の二次残差
- Level: B
- 目安時間: 15分

一パラメータ網の訓練点出力を $F(\theta)=\theta^2$、教師を $y=0$、損失を $L(\theta)=\frac12(F(\theta)-y)^2$ とする。$\theta_0=1$ から学習率 $\eta>0$ の勾配降下を一歩行い、真の出力と初期接線核による一次近似を比較せよ。

<!-- solution-start -->
#### 詳細解答

$J_0=F'(1)=2$、$K_0=J_0^2=4$、$e_0=F(1)-0=1$ である。損失の微分は $L'(\theta)=F(\theta)F'(\theta)=2\theta^3$ だから $L'(1)=2$、一歩後は $\theta_1=1-2\eta$ である。真の出力を展開すると

$$
F(\theta_1)=(1-2\eta)^2=1-4\eta+4\eta^2.
$$

[一回更新の定理](#thm-slt2-08-drift-update)の線形部分は $F(\theta_0)-\eta K_0e_0=1-4\eta$。ゆえに剰余は $4\eta^2$ であり、非線形網と固定核の一次予測は一般に一致しない。この例では $F''=2$ だから、Taylor剰余の評価 $|r|\le(2/2)|\theta_1-\theta_0|^2=4\eta^2$ とも一致する。
<!-- solution-end -->

### SLT2-08-C01 Jacobian、更新、核の変動をつなぐ
- Level: C
- 目安時間: 35分

$f_{a,w,b}(x)=a(wx+b)$、初期点 $\theta_0=(a,w,b)=(2,1,0)$、訓練入力 $(0,1)$、教師 $y=(1,0)^{\mathsf T}$ を取る。損失は $L(\theta)=\frac12\|F(\theta)-y\|_2^2$ である。

1. $F_0,J_0,K_0,e_0$ を求め、$K_0$ が正定値であることを確かめよ。
2. 学習率 $\eta>0$ で一歩の勾配降下を行い、$\theta_1$ と固定接線模型の予測を求めよ。
3. 真の非線形予測 $F(\theta_1)$ と一次近似の剰余を求め、$\eta=1/10$ の数値を比較せよ。
4. $\theta_1$ での $J_1,K_1$ を $\eta$ の式で計算し、$\eta=1/10$ で $K_1\ne K_0$ を示せ。正定値な $K_0$ だけから何を結論できないか説明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** $F_0=(0,2)^{\mathsf T}$。各入力の勾配は $(wx+b,ax,a)^{\mathsf T}$ なので、

$$
J_0=\begin{pmatrix}0&0&2\\1&2&2\end{pmatrix},
\quad K_0=\begin{pmatrix}4&4\\4&9\end{pmatrix},
\quad e_0=F_0-y=\begin{pmatrix}-1\\2\end{pmatrix}.
$$

$K_0$ の第一主座小行列式は4、行列式は20で、ともに正だから正定値である。

**2.** [二乗損失の更新式](#thm-slt2-08-drift-update)の出発点から、パラメータ勾配と接線核が残差へ作用したものを別々に計算すると

$$
J_0^{\mathsf T}e_0
=\begin{pmatrix}0&1\\0&2\\2&2\end{pmatrix}\begin{pmatrix}-1\\2\end{pmatrix}
=\begin{pmatrix}2\\4\\2\end{pmatrix},
\qquad
K_0e_0=\begin{pmatrix}4\\14\end{pmatrix}.
$$

したがって

$$
\theta_1=\begin{pmatrix}2-2\eta\\1-4\eta\\-2\eta\end{pmatrix},
\qquad
F_{\mathrm{lin}}=\begin{pmatrix}-4\eta\\2-14\eta\end{pmatrix}.
$$

**3.** 真の網を新しい $(a,w,b)$ で計算し直すと、

$$
\begin{aligned}
F_1&=\begin{pmatrix}(2-2\eta)(-2\eta)\\(2-2\eta)(1-6\eta)\end{pmatrix}\\
&=\begin{pmatrix}-4\eta+4\eta^2\\2-14\eta+12\eta^2\end{pmatrix}.
\end{aligned}
$$

よって一次近似との差は $r=(4\eta^2,12\eta^2)^{\mathsf T}$ であり、正確に二次である。$\eta=1/10$ なら $F_{\mathrm{lin}}=(-0.4,0.6)^{\mathsf T}$、真の予測は $F_1=(-0.36,0.72)^{\mathsf T}$、差は $(0.04,0.12)^{\mathsf T}$ となる。

**4.** 新しい勾配は入力0で $(b,0,a)$、入力1で $(w+b,a,a)$ だから

$$
J_1=\begin{pmatrix}
-2\eta&0&2-2\eta\\
1-6\eta&2-2\eta&2-2\eta
\end{pmatrix}.
$$

行内積を展開すると

$$
K_1=\begin{pmatrix}
4-8\eta+8\eta^2&4-10\eta+16\eta^2\\
4-10\eta+16\eta^2&9-28\eta+44\eta^2
\end{pmatrix}.
$$

$\eta=1/10$ では $K_1=\begin{pmatrix}3.28&3.16\\3.16&6.64\end{pmatrix}$ であり、$K_0$ と異なる。$K_0$ が正定値なのは**初期点の接線特徴が二入力を区別する**という性質である。非線形網の更新経路で $J$ や $K$ が一定であること、任意の時刻まで固定核の解で予測できること、標本外リスクが小さいことまでは意味しない。
<!-- solution-end -->
