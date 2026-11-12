# GMT35 Kakeya最大作用素から集合の次元を読む

<!-- definition-example-audit: strict -->

## 1. 管を一本ずつ数える代わりに、どんな関数でも試す

[GMT33の平面Córdoba型tube評価](../GMT33/index.md#thm-gmt33-cordoba)は、方向が分離した管の合併面積を対数の損失まで抑えました。[GMT34のbush法](../GMT34/index.md#thm-gmt34-bush)は高次元で一点に多くの管が集まる配置を数え直しました。どちらも、管が置かれた**後**で重なりを解析する方法でした。

今度は順番を逆にします。非負関数 $f$ を空間に置き、**各方向で、その関数を最も多く拾う長さ1の管**を探します。この操作を全方向について制御できれば、特定のKakeya集合に限らず、任意の管配置へ同じ評価を適用できます。その代償が、管の太さ $\delta$ に依存する作用素ノルムの「損失」です。

以下、$d\ge2$、$0<\delta<1/100$ とし、$\mathbb R^d$ の体積を $|E|$、球面 $S^{d-1}$ では表面積測度を全体で1になるよう正規化し、$\sigma(S^{d-1})=1$ とします。管は[GMT32の定義](../GMT32/index.md#def-gmt32-tube)と同じく

$$
T_\delta(a,v)=\{x\in\mathbb R^d:\operatorname{dist}(x,\{a+tv:0\le t\le1\})<\delta\},
\quad a\in\mathbb R^d,\ v\in S^{d-1}
$$

です。管の体積は[「tube体積と重複度の積分」](../GMT32/index.md#prop-gmt32-tube-volume)にある円柱・半球の計算から

$$
V_d(\delta):=|T_\delta(a,v)|
=\omega_{d-1}\delta^{d-1}+\omega_d\delta^d
\asymp_d\delta^{d-1}
$$

となります。$\omega_j$ は $j$ 次元単位球の体積です。記号 $A\lesssim_d B$ は $A\le C_dB$ を意味し、$C_d$ は $\delta$ に依存しません。

## 2. Kakeya最大作用素とその正規化

方向 $v$ を固定し、始点 $a$ を動かすと、同じ方向に平行移動したすべての管を探せます。管内の**積分**ではなく**平均**を取るのは、太さを変えたときの体積倍率を取り除くためです。作用素の**定義自体**は任意の管半径 $\delta>0$ で意味を持ちます。一方、後の一様最大評価は $0<\delta<1/100$ に限定します。平面の証明では $2\delta$ の管も使うので、この二つの尺度範囲を区別します。

<a id="def-gmt35-kakeya-maximal"></a>

<!-- formal-statement-start -->
> **定義（δ-Kakeya最大作用素）**  
> $d\ge2$、$\delta>0$ とする。Lebesgue可測関数 $f:\mathbb R^d\to\mathbb C$ に対し、方向 $v\in S^{d-1}$ での $\delta$-Kakeya最大作用素を

$$
\mathcal K_\delta f(v)
:=\sup_{a\in\mathbb R^d}
\frac{1}{V_d(\delta)}
\int_{T_\delta(a,v)}|f(x)|\,dx
$$

> と定める。値は $[0,\infty]$ に属する。$f\in L^p(\mathbb R^d)$、$1\le p<\infty$ なら各 $\delta$ で有限な値を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt35-kakeya-maximal -->
### 直接確認：定数倍と一方向の管

$e_1=(1,0,\ldots,0)$ は第1座標方向の単位ベクトルとし、$f=\boldsymbol{1}_{T_\delta(0,e_1)}$ とします。管 $T_\delta(0,e_1)$ の平均は1なので $\mathcal K_\delta f(e_1)\ge1$ です。一方 $0\le f\le1$ だから、どんな管の平均も1以下であり、**$\mathcal K_\delta f(e_1)=1$** です。

さらに $1\le p<\infty$、$f,g\in L^p(\mathbb R^d)$ と $c\in\mathbb C$ に対し、絶対値の性質 $|cf|=|c||f|$ と $|f+g|\le|f|+|g|$ から

$$
\mathcal K_\delta(cf)=|c|\mathcal K_\delta f,
\qquad
\mathcal K_\delta(f+g)\le\mathcal K_\delta f+\mathcal K_\delta g
$$

を得ます。後者では $|f+g|\le|f|+|g|$ を各管で積分し、最後に始点 $a$ について上限を取る際、$f$ と $g$ の管平均それぞれの上限で抑えました。作用素は一般に線形ではなく**劣線形**です。

**定義の確認**：始点に関する上限、管体積での割り算、絶対値、方向ごとの値をすべて実際に計算しました。
<!-- definition-example-end -->

球面上での関数の大きさには、$\sigma(S^{d-1})=1$ として

$$
\|h\|_{L^q(S^{d-1})}
=\left(\int_{S^{d-1}}|h(v)|^q\,d\sigma(v)\right)^{1/q}
$$

を用います。積分の可測性は、$f\in L^p$ なら管を動かした平均が $a,v$ に連続に依存することから従います。実際、パラメータを収束させると管の指示関数は境界（Lebesgue測度零）を除き各点収束し、管は局所有界領域に入るので、局所 $L^1$ 性と絶対連続性で積分が収束します。従って可算稠密な始点だけで上限を取れて、$v$ に関して可測です。

<a id="def-gmt35-maximal-bound"></a>

<!-- formal-statement-start -->
> **定義（指数(p,q,β)の一様最大評価）**  
> $d\ge2$、$1\le p,q<\infty$、$\beta\ge0$ とする。$\delta$ に依存しない $C$ が存在し、すべての $0<\delta<1/100$ と $f\in L^p(\mathbb R^d)$ について

$$
\|\mathcal K_\delta f\|_{L^q(S^{d-1})}
\le C\delta^{-\beta}\|f\|_{L^p(\mathbb R^d)}
$$

> が成り立つとき、指数 $(p,q,\beta)$ の**一様最大評価**があるという。$\delta^{-\beta}$ が尺度に関する損失であり、$\beta=0$ は冪損失がないことを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt35-maximal-bound -->
### 直接確認：Hölderの不等式から必ず得られる評価

$1\le p<\infty$ とし、$1/p+1/p'=1$ によって $p'$ を定めます（$p=1$ では $p'=\infty$、$1/p'=0$ と約束します）。管 $T=T_\delta(a,v)$ を固定します。

まず $1<p<\infty$ なら $1<p'<\infty$ であり、[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)の仮定を満たします。$\|\boldsymbol1_T\|_{L^{p'}}=|T|^{1/p'}$ を代入すると

$
\int_T|f|=\int_{\mathbb R^d}|f|\boldsymbol1_T
\le\|f\|_{L^p}|T|^{1/p'}
=\|f\|_{L^p}V_d(\delta)^{1-1/p}.
$

一方 $p=1$ は参照したHölderの定理の仮定 $p,p'>1$ の範囲外です。この端点では $0\le\boldsymbol1_T\le1$ から直接

$
\int_T|f|=\int_{\mathbb R^d}|f|\boldsymbol1_T
\le\int_{\mathbb R^d}|f|
=\|f\|_{L^1}
$

を得ます。これは $1/p'=0$、$|T|^{1/p'}=1$ とした上の評価に一致します。従って、すべての $1\le p<\infty$ で次の管平均の上界へ進めます。

両辺を $V_d(\delta)$ で割ると

$$
\frac{1}{V_d(\delta)}\int_{T_\delta(a,v)}|f|
\le V_d(\delta)^{-1/p}\|f\|_{L^p}.
$$

したがって $\mathcal K_\delta f(v)\le C_d\delta^{-(d-1)/p}\|f\|_p$ であり、球面測度が1なので、**任意の有限な $q$ に対し $\beta=(d-1)/p$ の評価が成立**します。指数、対象空間、$\delta$ に依らない定数を確認できました。ただしこの粗い評価では有用な次元下界はほとんど得られず、角度の異なる管の重なりを利用する必要があります。

**定義の確認**：$p,q$ は有限で $1\le p,q<\infty$、$\beta=(d-1)/p\ge0$ であり、定数は $\delta$ と $f$ に依存せず、指定した全尺度の不等式を満たします。
<!-- definition-example-end -->

注意：$\delta^{-\varepsilon}$ が**任意の $\varepsilon>0$** に対して許される評価と、$\beta=0$ の評価は異なります。対数損失 $\sqrt{\log(1/\delta)}$ はどの固定した $\varepsilon>0$ に対しても $C_\varepsilon\delta^{-\varepsilon}$ 以下になりますが、一般に $\delta$ に一様な定数ではありません。

## 3. 平面：二管の交差から最大作用素の評価へ

この節では $d=2$ とします。$\mathcal K_\delta$ は管の位置に関する上限を含むので、固定した管の合併評価をそのまま読み替えてはいけません。**各方向で最適に近い管を一本選んでも、二管の交差上界が位置に依存しない**ことが鍵です。

まず方向を有限個に減らします。方向 $v$ と $-v$ は同じ管の族を定めるので、角度 $\theta\in[0,\pi)$ で無向直線方向を表します。

<a id="lem-gmt35-direction-grid"></a>

<!-- formal-statement-start -->
> **補題（方向格子への還元）**  
> $0<\delta<1/100$、$f\ge0$、$f\in L^2(\mathbb R^2)$ とする。$N=\lceil\pi/\delta\rceil$、$v_j=(\cos(j\pi/N),\sin(j\pi/N))$（$0\le j<N$）とおく。定数 $C$ は $\delta,f$ に依存せず、

$$
\|\mathcal K_\delta f\|_{L^2(S^1)}^2
\le C\delta\sum_{j=0}^{N-1}\bigl(\mathcal K_{2\delta}f(v_j)\bigr)^2
$$

> が成り立つ。$\sigma$ は $S^1$ の正規化弧長測度である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の方向を格子方向へ角度 $O(\delta)$ だけ回転させても、長さ1の線分の各点は $O(\delta)$ しか動きません。そこで細い管を少し太い管へ入れ、各方向セルの長さ $O(\delta)$ を掛けて積分します。

<!-- proof-start -->
### 証明

角度 $\theta$ に最も近い格子点 $j\pi/N$ を、端点 $0,\pi$ を同一視して選びます。格子間隔 $h=\pi/N\le\delta$ なので、無向角距離は $h/2\le\delta/2$ です。このため $|v-v_j|\le\delta/2$ または $|v+v_j|\le\delta/2$ となります。

前者では $a'=a$ と置き、対応する線分上の点を $a'+tv_j$ と $a+tv$ に取ります。後者では向きを反転させ、$a'=a+v$ と置き、$a'+tv_j$ と $a+(1-t)v$ を対応させます。それぞれ $0\le t\le1$ に対し

$$
\begin{aligned}
|(a'+tv_j)-(a+tv)|&=t|v_j-v|\le\delta/2
\quad\text{（前者）},\\
|(a'+tv_j)-(a+(1-t)v)|&=t|v_j+v|\le\delta/2
\quad\text{（後者）}.
\end{aligned}
$$

どちらの場合も二線分の対応する点が距離 $\delta/2$ 以内にあり、線分からの距離を三角不等式で比較すれば $T_\delta(a,v)\subset T_{2\delta}(a',v_j)$ です。体積公式より $V_2(2\delta)/V_2(\delta)\le C$ であるため、非負性から

$$
\mathcal K_\delta f(v)\le C\mathcal K_{2\delta}f(v_j).
$$

各格子方向のVoronoiセルは無向角度で長さ $h$、正規化球面測度で $h/\pi=1/N\le\delta/\pi$ です。$v$ と $-v$ で最大値は等しいので、全方向で二乗して積分し

$$
\|\mathcal K_\delta f\|_{L^2(S^1)}^2
\le\frac{C}{N}\sum_{j=0}^{N-1}(\mathcal K_{2\delta}f(v_j))^2
\le C\delta\sum_{j=0}^{N-1}(\mathcal K_{2\delta}f(v_j))^2.
$$

を得ます。
<!-- proof-end -->

<a id="lem-gmt35-linearized-tubes"></a>

<!-- formal-statement-start -->
> **補題（選択した管に対する離散L2評価）**  
> $0<r<1/50$、$N\asymp r^{-1}$（比較定数は $r$ によらず固定）とし、$v_j=(\cos(j\pi/N),\sin(j\pi/N))$ を取る。各 $j$ で任意の始点 $a_j\in\mathbb R^2$ を選び、$T_j=T_r(a_j,v_j)$ とする。このとき、定数は $a_j,r$ に依存せず、

$$
r\sum_{j=0}^{N-1}\left(\frac{1}{V_2(r)}\int_{T_j}f(x)\,dx\right)^2
\le C\log(2/r)\|f\|_{L^2(\mathbb R^2)}^2
$$

> がすべての非負 $f\in L^2(\mathbb R^2)$ に対して成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各管平均を並べた線形写像の双対を考えます。双対のノルムの二乗はすべての二管交差面積の行列で表せます。[二tubeの交差面積](../GMT33/index.md#lem-gmt33-two-tubes)と[無向方向の角距離](../GMT33/index.md#def-gmt33-projective-angle)を使うと、行列の各行和が $r\log(2/r)$ 以下になるため、最後に離散測度 $r\sum_j$ の重みと打ち消し合います。

<!-- proof-start -->
### 証明

$A:L^2(\mathbb R^2)\to\ell^2_r$ を $(Af)_j=V_2(r)^{-1}\int_{T_j}f$ とします。$\ell^2_r$ の内積は $\langle z,w\rangle_{\ell^2_r}=r\sum_jz_j\overline w_j$ と定めます。管平均を離散空間の内積へ移し、有限和と積分を交換すると

$$
\begin{aligned}
\langle Af,z\rangle_{\ell^2_r}
&=\frac r{V_2(r)}\sum_j\left(\int_{T_j}f(x)\,dx\right)\overline{z_j}\\
&=\int_{\mathbb R^2}f(x)\,\overline{\left(\frac r{V_2(r)}\sum_jz_j\boldsymbol1_{T_j}(x)\right)}\,dx.
\end{aligned}
$$

この計算を使い、$\langle Af,z\rangle_{\ell^2_r}=\langle f,A^*z\rangle_{L^2}$ を満たす写像を $A^*$ と書きます。その具体式は

$$
A^*z(x)=\frac r{V_2(r)}\sum_{j=0}^{N-1}z_j\boldsymbol{1}_{T_j}(x)
$$

です。二乗ノルムの積分で有限和の積を展開し、$\boldsymbol1_{T_i}\boldsymbol1_{T_j}=\boldsymbol1_{T_i\cap T_j}$ を用いると

$$
\|A^*z\|_2^2
=\sum_{i,j=0}^{N-1}z_i\overline z_j B_{ij},
\qquad
B_{ij}=\frac{r^2|T_i\cap T_j|}{V_2(r)^2}.
$$

管体積 $V_2(r)\asymp r$、[二管交差補題](../GMT33/index.md#lem-gmt33-two-tubes)により、無向角距離を $\alpha_{ij}$ として

$$
0\le B_{ij}\le C\frac{r^2}{r+\alpha_{ij}}.
$$

実際 $\alpha_{ij}\le\pi/2$ で $\sin\alpha_{ij}\gtrsim\alpha_{ij}$ なので、交差上界 $\min(Cr,Cr^2/\sin\alpha_{ij})$ は $Cr^2/(r+\alpha_{ij})$ で抑えられます。方向格子で $m=\min(|i-j|,N-|i-j|)$ とすると $\alpha_{ij}=\pi m/N\asymp mr$ です。各 $m\ge1$ には高々2個の $j$ が対応するため

$$
\sum_j B_{ij}
\le Cr\left(1+2\sum_{m=1}^{\lfloor N/2\rfloor}\frac1{1+m}\right)
\le Cr\bigl(1+2\log(N+1)\bigr)
\le Cr\log(2/r).
$$

$B$ は非負対称行列なので $2|z_i z_j|\le|z_i|^2+|z_j|^2$ を使い

$$
\begin{aligned}
\|A^*z\|_2^2
&\le\sum_{i,j}B_{ij}|z_i||z_j|\\
&\le\frac12\sum_{i,j}B_{ij}(|z_i|^2+|z_j|^2)\\
&\le Cr\log(2/r)\sum_i|z_i|^2\\
&=C\log(2/r)\|z\|_{\ell^2_r}^2.
\end{aligned}
$$

これを $A$ のノルムへ戻します。任意の $f\in L^2$ に対して

$$
\|Af\|_{\ell^2_r}
=\sup_{\|z\|_{\ell^2_r}=1}|\langle f,A^*z\rangle|
\le C\sqrt{\log(2/r)}\|f\|_2.
$$

最後の等式は有限次元内積空間の双対表示、最後の不等式は[Cauchy--Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)によります。二乗すれば主張です。
<!-- proof-end -->

<a id="thm-gmt35-planar-maximal"></a>

<!-- formal-statement-start -->
> **定理（平面Kakeya最大作用素の対数評価）**  
> $0<\delta<1/100$ とする。すべての $f\in L^2(\mathbb R^2)$ について、$\delta$ に依存しない $C$ が存在して

$$
\|\mathcal K_\delta f\|_{L^2(S^1)}
\le C\sqrt{\log(2/\delta)}\|f\|_{L^2(\mathbb R^2)}
$$

> が成立する。球面測度は正規化弧長測度とする。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal K_\delta f=\mathcal K_\delta|f|$ なので非負関数だけを扱います。有限個の格子方向について、上限に近い管を一本ずつ選び、先の離散 $L^2$ 補題を使います。選び方に依存しない定数なので上限へ移れます。

<!-- proof-start -->
### 証明

$f\ge0$ とします。各 $\mathcal K_{2\delta}f(v_j)$ は管平均の上限です。任意の $\eta>0$ に対し、各 $j$ で平均が $\mathcal K_{2\delta}f(v_j)-\eta$ 以上になる始点 $a_j$ を選べます。$\mathcal K_{2\delta}f(v_j)$ は[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)から有限です。[離散 $L^2$ 補題](#lem-gmt35-linearized-tubes)を $r=2\delta$ に適用すると

$$
(2\delta)\sum_j
\bigl(\max\{\mathcal K_{2\delta}f(v_j)-\eta,0\}\bigr)^2
\le C\log(1/\delta)\|f\|_2^2.
$$

有限個の $j$ について $\eta\downarrow0$ とすれば同じ上界が $\mathcal K_{2\delta}f(v_j)$ に成立します。[格子還元補題](#lem-gmt35-direction-grid)と結合して

$$
\begin{aligned}
\|\mathcal K_\delta f\|_{L^2(S^1)}^2
&\le C\delta\sum_j(\mathcal K_{2\delta}f(v_j))^2\\
&\le C\log(2/\delta)\|f\|_2^2.
\end{aligned}
$$

平方根を取り、一般の複素値関数については $|f|$ に置き換えれば完成です。
<!-- proof-end -->

ここで得たのは **$L^2(\mathbb R^2)\to L^2(S^1)$ の作用素評価**です。特定の集合に対する[GMT33の合併面積評価](../GMT33/index.md#thm-gmt33-cordoba)と出発点は似ていますが、作用素では任意の $f$ と任意の管の位置を同時に扱えます。

## 4. 作用素評価から管の合併体積へ

平面の具体計算を終えたので、再び $d\ge2$ に戻ります。方向が十分多い管の合併 $U$ に $f=\boldsymbol1_U$ を代入すると、その管が置かれた方向では最大平均が1になります。これを球面上の正の測度の方向に拡げるのが最初の橋渡しです。

<a id="thm-gmt35-maximal-to-union"></a>

<!-- formal-statement-start -->
> **定理（最大評価からtube合併体積への含意）**  
> $d\ge2$、$1\le p,q<\infty$、$\beta\ge0$ とし、指数 $(p,q,\beta)$ の[一様最大評価](#def-gmt35-maximal-bound)が成立すると仮定する。$0<\delta<1/100$ とし、球面上の $c\delta$-分離方向 $v_1,\ldots,v_N$ が $N\ge c\delta^{-(d-1)}$ 本あり、ここで $c>0$ は固定とする。任意の始点 $a_j$ に対する管の合併

$$
U=\bigcup_{j=1}^NT_\delta(a_j,v_j)
$$

> は、$c,d,p,q,\beta$ と最大評価の定数のみに依存する $c'>0$ によって

$$
|U|\ge c'\delta^{p\beta}
$$

> を満たす。ただし $c\delta$-分離は球面の通常の角距離で測り、方向は互いに異なるものとする。
<!-- formal-statement-end -->

### 証明の見取り図

各 $v_j$ のまわりの小さい球面帽を互いに重ならないよう選びます。その帽の方向 $w$ に細い管を置けば、元の管の内部に収まります。ゆえに $\mathcal K_{\rho} \boldsymbol1_U(w)=1$（$\rho$ は $\delta$ の固定割合）で、帽の合計測度は定数以上です。この下界を最大評価へ代入します。

<!-- proof-start -->
### 証明

$0<c_0<\min(1/8,c/8)$ を固定し、$\rho=c_0\delta$ とおきます。各 $v_j$ の角距離 $c_0\delta$ 未満の球面帽 $H_j$ は互いに交わりません。球面帽の体積比較（[方向球面の計数補題](../GMT32/index.md#lem-gmt32-direction-count)で用いた局所座標の体積比較）から

$$
\sigma\left(\bigcup_jH_j\right)
=\sum_j\sigma(H_j)
\ge c_dN(c_0\delta)^{d-1}
\ge c_{d,c}>0.
$$

$w\in H_j$ のとき任意の $t\in[0,1]$ に対し $|tw-tv_j|\le c_0\delta$ です。$\rho=c_0\delta$ だから、$T_\rho(a_j,w)\subset T_\delta(a_j,v_j)$ が成り立ちます（$2c_0<1$ を使います）。したがって $w\in H_j$ では $\mathcal K_\rho\boldsymbol1_U(w)=1$。特に

$$
c_{d,c}^{1/q}
\le\|\mathcal K_\rho\boldsymbol1_U\|_{L^q(S^{d-1})}.
$$

仮定した一様最大評価へ $f=\boldsymbol1_U$、尺度 $\rho$ を代入すると

$$
c_{d,c}^{1/q}
\le C\rho^{-\beta}\|\boldsymbol1_U\|_{L^p}
=C(c_0\delta)^{-\beta}|U|^{1/p}.
$$

両辺を整理して $|U|\ge(c_{d,c}^{1/q}c_0^\beta/C)^p\delta^{p\beta}$ です。
<!-- proof-end -->

この定理は **maximal $\Rightarrow$ tube合併** の向きです。合併評価が一つあるだけでは任意の関数 $f$ に対する $L^p\to L^q$ 評価は示せません。例えば異なる値のある関数を重ねて平均するには、単なる指示関数に関する体積情報だけでなく、強度の違いと上限操作を制御する追加の議論が必要です。

## 5. 全方向線分集合のMinkowski次元とHausdorff次元

有界集合 $K\subset\mathbb R^d$ が**すべての方向に長さ1の線分を一本含む**とします。方向ごとに線分の位置が違って構いません。$K_\delta=\{x:\operatorname{dist}(x,K)<\delta\}$ をその開近傍とします。[Minkowski次元の定義](../GMT32/index.md#def-gmt32-minkowski)では $|K_\delta|$ の減衰指数を使います。

<a id="cor-gmt35-minkowski"></a>

<!-- formal-statement-start -->
> **系（最大評価から上下Minkowski次元へ）**  
> $d\ge2$、$1\le p,q<\infty$、$\beta\ge0$ とし、指数 $(p,q,\beta)$ の一様最大評価があるとする。有界で可測な $K\subset\mathbb R^d$ が全方向の長さ1の線分を含めば、

$$
\underline{\dim}_{\mathrm M}K\ge d-p\beta,
\qquad
\overline{\dim}_{\mathrm M}K\ge d-p\beta
$$

> が成り立つ。右辺が負なら自明な下界として読む。
<!-- formal-statement-end -->

### 証明の見取り図

どの方向 $v$ でも、$K$ 内の対応する線分の太さ $\delta$ の管は $K_\delta$ に含まれます。つまり $f=\boldsymbol1_{K_\delta}$ の最大平均は全方向で1です。体積下界を対数で次元へ変換するとき、$\log\delta<0$ に注意します。

<!-- proof-start -->
### 証明

$K$ の有界性から $K_\delta$ の体積は有限です。任意の $v$ について $K$ に含まれる長さ1の線分 $L_v$ を取り、その管 $T_\delta(L_v)\subset K_\delta$ を使うと

$$
\mathcal K_\delta\boldsymbol1_{K_\delta}(v)=1
\quad(v\in S^{d-1}).
$$

従って $\|\mathcal K_\delta\boldsymbol1_{K_\delta}\|_{L^q}=1$ です。一様最大評価から

$$
1\le C\delta^{-\beta}|K_\delta|^{1/p},
\qquad
|K_\delta|\ge C^{-p}\delta^{p\beta}.
$$

正の体積の対数を取ると $\log|K_\delta|\ge -p\log C+p\beta\log\delta$ です。負の $\log\delta$ で割るので

$$
\frac{\log|K_\delta|}{\log\delta}
\le p\beta-\frac{p\log C}{\log\delta}.
$$

$\delta\downarrow0$ で後項は0へ収束します。[被覆数と近傍体積の比較](../GMT32/index.md#lem-gmt32-neighborhood-cover)を使うと、上下Minkowski次元はいずれも $d-p\beta$ 以上です。
<!-- proof-end -->

ただし、[Hausdorff次元とMinkowski次元の比較](../GMT32/index.md#thm-gmt32-dimension-comparison)は一般に Hausdorff $\le$ 下Minkowski の向きです。**この系単独からHausdorff次元の下界を逆向きに結論してはいけません。** ここでは最大評価が**すべての尺度で一様**に使えることを利用し、異なる太さの被覆を同時に処理します。

<a id="thm-gmt35-maximal-to-hausdorff"></a>

<!-- formal-statement-start -->
> **定理（全尺度最大評価からHausdorff次元へ）**  
> $d\ge2$、$1\le p,q<\infty$、$\beta\ge0$ とし、指数 $(p,q,\beta)$ の一様最大評価があるとする。全方向に長さ1の線分を含む有界集合 $K\subset\mathbb R^d$ について

$$
\dim_{\mathrm H}K\ge d-p\beta
$$

> が成立する。特に $d-p\beta>0$ のとき、任意の $0<s<d-p\beta$ に対して $\mathcal H^s(K)>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

単一の $\delta$ を選ぶのではなく、$K$ を任意に細い球で覆って**半径ごとの群**へ分けます。一つの線分は全群を合わせれば長さ1だけ覆われます。したがって、どれかの尺度の群が、線分のうち $c/(k+1)^2$ 以上の長さを覆います。そこからその尺度での最大関数の下界を得て、各方向集合の測度をすべての尺度で合計します。指数 $d-s-p\beta>0$ がその級数を収束させます。

<!-- proof-start -->
### 証明

$0<s<d-p\beta$ とします。$\mathcal H^s(K)=0$ と仮定して矛盾を導きます。任意の小さい $\eta>0$ に対し、$K$ を覆う開球 $B(x_i,r_i)$ で $0<r_i<1/128$ かつ

$$
\sum_i r_i^s<\eta
$$

となる可算被覆を選べます。これは $\mathcal H^s(K)=0$ から、被覆半径と被覆和を任意に小さくできることによります。各球を $2^{-(k+1)}<r_i\le2^{-k}$（$k\ge7$）によって群 $I_k$ に分け、$h_k=2^{-k}$ とおきます。$I_k$ の各球を $B(x_i,3h_k)$ に拡大した合併を $U_k$ とします。$H_k=\sum_{i\in I_k}r_i^s$ です。各 $i\in I_k$ は $r_i>h_k/2$ を満たすので、$\# I_k\,(h_k/2)^s\le H_k<\eta$ となり、各 $I_k$ は有限です。

$h_k/2<r_i\le h_k$ なので、球体積を一個ずつ足して

$$
|U_k|
\le C_dh_k^d\# I_k
\le C_{d,s}h_k^{d-s}H_k,
\qquad
\sum_{k\ge7}H_k<\eta.
$$

任意の方向 $v$ に対して、$K$ に含まれる単位線分 $L_v=\{a_v+tv:0\le t\le1\}$ を一つ取ります。各 $k$ で、元の球の群 $\bigcup_{i\in I_k}B(x_i,r_i)$ が覆う線分パラメータ $t$ の集合の長さを $\ell_k(v)$ と書きます。全ての球が $K$ を覆うので

$$
\sum_{k\ge7}\ell_k(v)\ge1.
$$

一方 $\sum_{k\ge7}(k+1)^{-2}<1$ です。よって少なくとも一つの $k$ で

$$
\ell_k(v)\ge(k+1)^{-2}
$$

が成り立ちます（全ての $k$ で厳密に小さければ和が1未満となり矛盾）。この $k$ を固定します。線分上の点 $a_v+tv\in B(x_i,r_i)$ と、線分に垂直な半径 $h_k$ の円板の点 $y$ を考えると

$$
|y-x_i|\le|y-(a_v+tv)|+|(a_v+tv)-x_i|
<h_k+r_i\le2h_k<3h_k.
$$

つまり $y\in U_k$ です。長さ $\ell_k(v)$ にわたる直交断面を積分すると、$T_{h_k}(a_v,v)$ 内の $U_k$ の体積は $\omega_{d-1}h_k^{d-1}\ell_k(v)$ 以上です。$V_d(h_k)\le C_dh_k^{d-1}$ より

$$
\mathcal K_{h_k}\boldsymbol1_{U_k}(v)
\ge c_d\ell_k(v)
\ge c_d(k+1)^{-2}.
$$

ここで、どの尺度が選ばれるかを方向ごとに固定する必要はありません。可測な方向集合を

$$
\Omega_k=\{v\in S^{d-1}:
\mathcal K_{h_k}\boldsymbol1_{U_k}(v)
\ge c_d(k+1)^{-2}\}
$$

と定めれば、上の議論から $S^{d-1}=\bigcup_{k\ge7}\Omega_k$ です。最大評価を $f=\boldsymbol1_{U_k}$ に使うと

$$
c_d(k+1)^{-2}\sigma(\Omega_k)^{1/q}
\le C h_k^{-\beta}|U_k|^{1/p}
\le C_{d,s} h_k^{(d-s)/p-\beta} H_k^{1/p}.
$$

両辺を $q$ 乗して

$$
\sigma(\Omega_k)
\le C_{d,s,p,q}(k+1)^{2q}
2^{-k(d-s-p\beta)q/p}H_k^{q/p}.
$$

$H_k\le\eta$、$d-s-p\beta>0$ なので、可算劣加法性から

$$
\begin{aligned}
1=\sigma(S^{d-1})
&\le\sum_{k\ge7}\sigma(\Omega_k)\\
&\le C\eta^{q/p}
\sum_{k\ge7}(k+1)^{2q}
2^{-k(d-s-p\beta)q/p}.
\end{aligned}
$$

右辺の級数は指数減衰により有限で、$\eta\downarrow0$ では右辺全体が0になります。矛盾です。したがって $\mathcal H^s(K)>0$、任意の $s<d-p\beta$ について成立し、$\dim_{\mathrm H}K\ge d-p\beta$ となります。
<!-- proof-end -->

この定理の証明では、全尺度に**同じ定数 $C$ と同じ損失指数 $\beta$** で成り立つ最大評価を使いました。単なる合併体積の下界では、方向集合 $\Omega_k$ を各尺度で制御する箇所がありません。ここがHausdorff次元に進める理由です。

<a id="cor-gmt35-log-and-epsilon"></a>

<!-- formal-statement-start -->
> **系（対数損失と任意のε損失）**  
> (i) 平面では全方向の単位線分を含む有界集合 $K\subset\mathbb R^2$ の Hausdorff次元と上下Minkowski次元はすべて2である。  
> (ii) 一般の $d\ge2$ について、任意の $\varepsilon>0$ ごとに定数 $C_\varepsilon$ が存在し、すべての $0<\delta<1/100$ と $f\in L^d(\mathbb R^d)$ について

$$
\|\mathcal K_\delta f\|_{L^d(S^{d-1})}
\le C_\varepsilon\delta^{-\varepsilon}\|f\|_{L^d(\mathbb R^d)}
$$

> が成立するなら、すべての有界Kakeya集合のHausdorff次元と上下Minkowski次元は $d$ である。ここで(ii)は**条件付きの含意**であり、一般次元でこの評価が証明されたと主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

(i) の対数は任意の正の冪より遅く増大します。(ii) でも任意に小さい $\varepsilon$ を選べます。そこで、次元下界 $d-p\beta$ の $\beta$ を0へ近づけます。

<!-- proof-start -->
### 証明

(i) [平面最大定理](#thm-gmt35-planar-maximal)によって $C\sqrt{\log(2/\delta)}$ の損失です。任意の $\varepsilon>0$ に対し

$$
\sup_{0<\delta<1/100}\delta^\varepsilon\sqrt{\log(2/\delta)}<\infty
$$

が成り立ちます。実際 $t=\log(2/\delta)$ と置けば $\delta^\varepsilon\sqrt t=2^\varepsilon e^{-\varepsilon t}\sqrt t$ で、指数減衰が平方根を上回ります。従って $(p,q,\beta)=(2,2,\varepsilon)$ の最大評価を各 $\varepsilon$ について使えます。[Hausdorff次元定理](#thm-gmt35-maximal-to-hausdorff)と[Minkowski次元系](#cor-gmt35-minkowski)から各次元は $2-2\varepsilon$ 以上。$\varepsilon\downarrow0$ で下界2です。上界は$\mathbb R^2$の部分集合なので2です。

(ii) 仮定をそのまま $(p,q,\beta)=(d,d,\varepsilon)$ として同じ二結果に使えば、各次元は $d-d\varepsilon$ 以上です。任意の $\varepsilon>0$ について成立するため下界は $d$、上界も周囲の空間次元 $d$ です。
<!-- proof-end -->

## 6. どこまでが同値で、どこからは追加証明か

この章で証明した論理は

$$
\text{全関数・全尺度の最大評価}
\Longrightarrow
\begin{cases}
\text{方向分離tube合併の体積下界},\\
\text{Kakeya集合の上下Minkowski次元下界},\\
\text{Kakeya集合のHausdorff次元下界}
\end{cases}
$$

です。Hausdorff次元への矢印では**多尺度被覆**を使います。最初の二つの矢印は指示関数と単一尺度の評価から直接出ます。

逆に、ある集合の次元が大きいことは、任意の $f$ の最大平均を評価する不等式を**論理的に含みません**。一般論として逆方向を述べるには追加条件・別の定理が要ります。特に「full Minkowski次元 $\Rightarrow$ full Hausdorff次元」は一般の集合には偽です。たとえば有界な稠密可算集合 $D\subset[0,1]^d$ は $D_\delta$ が立方体近傍を含むので上下Minkowski次元が $d$ ですが、可算集合ゆえ Hausdorff次元は0です。この $D$ 自体は全方向の単位線分を含まないので、Kakeya集合への反例ではなく**次元比較を逆向きに使えないことの反例**です。

同様に、有限個の管の体積を抑える問題、Hausdorff次元、作用素のendpointノルムは異なる命題です。平面の $\sqrt{\log(2/\delta)}$ は $\delta^{-\varepsilon}$ より小さくても $\delta$ 一様な $L^2\to L^2$ 定数ではありません。高次元の「任意の $\varepsilon$」を要する最大評価と、最良指数をめぐる最新研究の結論を混ぜないでください。

## 7. 演習：関数のノルムと集合の体積を行き来する

### Level A：正規化と最初の代入

<a id="ex-gmt35-a01"></a>

**問題 A01：一本の管の体積と最大平均。** $d\ge2$、$0<\delta<1/100$、$T=T_\delta(0,e_1)$、$f=\boldsymbol1_T$ とする。$V_d(\delta)$、$\|f\|_{L^p(\mathbb R^d)}$（$1\le p<\infty$）、$\mathcal K_\delta f(e_1)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[管体積公式](../GMT32/index.md#prop-gmt32-tube-volume)より、長さ1の円柱と両端の半球を合わせて

$$
V_d(\delta)=\omega_{d-1}\delta^{d-1}+\omega_d\delta^d.
$$

$f^p=\boldsymbol1_T$ だから $\|f\|_p^p=\int\boldsymbol1_T=V_d(\delta)$、よって $\|f\|_p=V_d(\delta)^{1/p}$ です。管そのものを最大作用素の上限候補に選べば、平均は $V_d(\delta)^{-1}\int_T1=1$。他の管では $0\le f\le1$ により平均は1以下。結論 $\mathcal K_\delta f(e_1)=1$ です。
<!-- solution-end -->

<a id="ex-gmt35-a02"></a>

**問題 A02：Hölderによる粗い損失。** $d=3$、$p=q=2$ とする。$f\in L^2(\mathbb R^3)$ に[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)を適用し、$\|\mathcal K_\delta f\|_{L^2(S^2)}\le C\delta^{-1}\|f\|_2$ を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

各管 $T$ にCauchy--Schwarzを適用して $\int_T|f|\le |T|^{1/2}(\int_T|f|^2)^{1/2}\le |T|^{1/2}\|f\|_2$。$V_3(\delta)\ge\omega_2\delta^2$ なので

$$
\frac1{V_3(\delta)}\int_T|f|
\le V_3(\delta)^{-1/2}\|f\|_2
\le\omega_2^{-1/2}\delta^{-1}\|f\|_2.
$$

始点に関して上限を取り、$\sigma(S^2)=1$ を使って方向に積分しても右辺は変わりません。従って所望の評価です。
<!-- solution-end -->

<a id="ex-gmt35-a03"></a>

**問題 A03：指数の移し替え。** ある次元 $d$ で $(p,q,\beta)=(3,2,1/6)$ の一様最大評価が成立すると仮定する。全方向の単位線分を含む有界集合のMinkowski次元とHausdorff次元の下界を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

指数は $p\beta=3\cdot(1/6)=1/2$ です。[Minkowski次元系](#cor-gmt35-minkowski)と[Hausdorff次元定理](#thm-gmt35-maximal-to-hausdorff)はどちらも $d-p\beta$ を与えるので、下界は $d-1/2$ です。$q=2$ は方向集合の測度を $L^q$ で評価する部分に効きますが、最終的な指数は $p\beta$ です。
<!-- solution-end -->

<a id="ex-gmt35-a04"></a>

**問題 A04：対数を冪で押さえる。** $\varepsilon>0$ を固定する。$0<\delta<1/100$ で $\sqrt{\log(2/\delta)}\le C_\varepsilon\delta^{-\varepsilon}$ となる理由を $t=\log(2/\delta)$ の置換で示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$t=\log(2/\delta)$ と置くと $\delta=2e^{-t}$、従って

$$
\delta^\varepsilon\sqrt{\log(2/\delta)}
=2^\varepsilon e^{-\varepsilon t}\sqrt t.
$$

右辺の対数微分は $-\varepsilon+1/(2t)$ だから、$t$ が大きいところで減少し0へ収束します。残る有界区間でも連続なので上限は有限です。これを $C_\varepsilon$ とすれば元の不等式です。$\varepsilon$ に依らない同一の $C$ とする主張ではありません。
<!-- solution-end -->

<a id="ex-gmt35-a05"></a>

**問題 A05：次元公式での不等号。** $|K_\delta|\ge c\delta^\gamma$（$c,\gamma>0$）がすべての十分小さい $\delta$ で成立するとき、$\log|K_\delta|/\log\delta$ への上界と、上下Minkowski次元への下界を示せ。$K$ は空でない有界集合とする。

- Level: A

<!-- solution-start -->
#### 詳細解答

対数を取ると $\log|K_\delta|\ge\log c+\gamma\log\delta$。$\log\delta<0$ なので割ると向きが逆転し

$$
\frac{\log|K_\delta|}{\log\delta}
\le\gamma+\frac{\log c}{\log\delta}.
$$

最後の項は0に収束します。[体積と次元の比較](../GMT32/index.md#lem-gmt32-neighborhood-cover)を用い、$\underline{\dim}_{\mathrm M}K=d-\limsup_{\delta\downarrow0}(\log|K_\delta|/\log\delta)$、$\overline{\dim}_{\mathrm M}K=d-\liminf_{\delta\downarrow0}(\log|K_\delta|/\log\delta)$ として、ともに $d-\gamma$ 以上です。
<!-- solution-end -->

### Level B：位置の上限・方向集合・損失の違い

<a id="ex-gmt35-b01"></a>

**問題 B01：二管行列の行和。** 平面で $r<1/50$、$N=\lceil\pi/r\rceil$、$\theta_j=j\pi/N$ とし、$B_{ij}\le Cr^2/(r+\min(|i-j|,N-|i-j|)\pi/N)$ とする。$\sum_jB_{ij}\lesssim r\log(2/r)$ を示せ。その行和から $\sum_{ij}B_{ij}z_i\overline z_j\le C\log(2/r)\,r\sum_i|z_i|^2$ を導け。ただし $B$ は非負対称行列とする。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\pi/N\asymp r$ だから $B_{ij}\le Cr/(1+m)$、$m=\min(|i-j|,N-|i-j|)$ です。各 $m\ge1$ に高々2方向があるため

$$
\sum_jB_{ij}\le Cr\left(1+2\sum_{m=1}^{\lfloor N/2\rfloor}\frac1{m+1}\right)
\le Cr(1+2\log(N+1))
\le Cr\log(2/r).
$$

複素数 $z_i$ について $|z_i\overline z_j|\le(|z_i|^2+|z_j|^2)/2$ とし、$B_{ij}=B_{ji}\ge0$ を使えば

$$
\sum_{ij}B_{ij}z_i\overline z_j
\le\sum_{ij}B_{ij}|z_i||z_j|
\le\sum_i|z_i|^2\sum_jB_{ij}
\le Cr\log(2/r)\sum_i|z_i|^2.
$$

最後の右辺は $C\log(2/r)\,r\sum_i|z_i|^2$ であり、離散方向積分の重み $r$ が残る点が肝心です。
<!-- solution-end -->

<a id="ex-gmt35-b02"></a>

**問題 B02：分離方向から正測度の帽へ。** $d\ge2$、$0<\delta<1/100$ とする。球面上の互いに角距離 $c\delta$ 以上離れた $N\ge c\delta^{-(d-1)}$ 方向 $v_j$ のまわりに角半径 $c_0\delta$（$0<c_0<\min(c/4,1/4)$）の帽 $H_j$ を置く。$\sigma(\bigcup_jH_j)\ge c'>0$ を証明し、$T_{c_0\delta}(a_j,w)\subset T_\delta(a_j,v_j)$ の成立条件を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

二帽が交われば中心角距離は三角不等式で $2c_0\delta<c\delta$ となり、分離性に矛盾します。従って帽は互いに交わりません。小球面帽の測度は $c_d(c_0\delta)^{d-1}$ 以上なので

$$
\sigma(\bigcup_jH_j)=\sum_j\sigma(H_j)
\ge c_dN(c_0\delta)^{d-1}
\ge c_dc\,c_0^{d-1}>0.
$$

$w\in H_j$ なら線分上の対応点の差は $|t(w-v_j)|\le|w-v_j|\le c_0\delta$ です。細い管の任意の点は新線分から $c_0\delta$ 未満なので、元線分からの距離は $2c_0\delta<\delta$（$c_0<1/2$）です。よって包含が成り立ちます。
<!-- solution-end -->

<a id="ex-gmt35-b03"></a>

**問題 B03：粗い評価と有用な評価。** 次元 $d=4$、$p=q=4$ で、(a) Hölderだけで得られる $\beta$ と次元下界、(b) 仮に $\beta=1/8$ の一様最大評価が得られた場合の次元下界を求め、(c) $\beta$ が $q$ ではなく $p$ と掛け合わされる理由を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(a) $V_4(\delta)\asymp\delta^3$ なのでHölderによる $\beta=3/4$、$p\beta=3$、次元下界は $4-3=1$ です。(b) $\beta=1/8$ なら $p\beta=4/8=1/2$、次元下界は $4-1/2=7/2$ です。(c) 最大関数の下界が球面上で定数以上なら

$$
c\le C\delta^{-\beta}\|\boldsymbol1_U\|_p
=C\delta^{-\beta}|U|^{1/p}.
$$

ここで両辺を $p$ 乗するから $|U|\ge c'\delta^{p\beta}$ となります。$q$ は左辺の正規化された球面測度の $1/q$ 乗を決めるだけです。
<!-- solution-end -->

<a id="ex-gmt35-b04"></a>

**問題 B04：多尺度被覆の級数。** $0<s<d-p\beta$、$h_k=2^{-k}$、$H_k\ge0$、$\sum_{k\ge7}H_k<\eta$ とする。ある定数 $C$ に対し $\sigma(\Omega_k)\le C(k+1)^{2q}h_k^{(d-s-p\beta)q/p}H_k^{q/p}$ なら、$S^{d-1}=\bigcup_{k\ge7}\Omega_k$ と両立しないことを示せ。$1\le p,q<\infty$ とする。

- Level: B

<!-- solution-start -->
#### 詳細解答

非負の $H_k$ には $H_k\le\sum_{\ell\ge7}H_\ell<\eta$ が成り立ちます。$\tau=(d-s-p\beta)q/p>0$ と置くと

$$
\sigma(\Omega_k)\le C\eta^{q/p}(k+1)^{2q}2^{-k\tau}.
$$

比を取れば $a_{k+1}/a_k=((k+2)/(k+1))^{2q}2^{-\tau}\to2^{-\tau}<1$ なので $\sum_{k\ge7}(k+1)^{2q}2^{-k\tau}<\infty$ です。可算劣加法性で

$$
1=\sigma(S^{d-1})\le\sum_k\sigma(\Omega_k)
\le C'\eta^{q/p}.
$$

$\eta$ を任意に小さく取れるので矛盾します。$\tau=0$ ではこの級数は収束せず、同じ証明ではendpointの $\mathcal H^{d-p\beta}$ の正値性を結論できません。
<!-- solution-end -->

### Level C：証明を連結する

<a id="ex-gmt35-c01"></a>

**問題 C01：平面最大定理からHausdorff次元2まで。** $0<\delta<1/100$、$\mathbb R^2$ の単位長・半径$\delta$管、正規化弧長測度 $\sigma$ を使い、次を解け。[二tubeの交差面積](../GMT33/index.md#lem-gmt33-two-tubes)と[Hausdorff次元との比較](../GMT32/index.md#thm-gmt32-dimension-comparison)は使用してよい。

1. $\delta$-間隔の無向方向格子に各一本の管を選んだ際、二管交差上界から作用素の離散 $L^2$ ノルムを評価せよ。
2. 最大作用素に関する上限操作を処理せよ。
3. 全方向の単位線分集合 $K$ が有界であるとき、Hausdorff次元が2となる論理を、多尺度被覆が必要な理由とともに示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1) 行列化。** $N=\lceil\pi/\delta\rceil$、$v_j=(\cos(j\pi/N),\sin(j\pi/N))$、$T_j=T_\delta(a_j,v_j)$ とします。$Af(j)=V_2(\delta)^{-1}\int_{T_j}f$ を離散ノルム $\|z\|_{\ell^2_\delta}^2=\delta\sum|z_j|^2$ に入れます。双対作用素は

$$
A^*z=\frac{\delta}{V_2(\delta)}\sum_jz_j\boldsymbol1_{T_j}.
$$

よって交差行列 $B_{ij}=\delta^2|T_i\cap T_j|/V_2(\delta)^2$ が出ます。[二管交差補題](../GMT33/index.md#lem-gmt33-two-tubes)に $\alpha_{ij}\asymp\delta\min(|i-j|,N-|i-j|)$ を代入して

$$
B_{ij}\le\frac{C\delta}{1+\min(|i-j|,N-|i-j|)},
\quad
\sup_i\sum_jB_{ij}\le C\delta\log(2/\delta).
$$

対称性と $2|z_iz_j|\le|z_i|^2+|z_j|^2$ を使うと

$$
\|A^*z\|_2^2
\le C\delta\log(2/\delta)\sum_j|z_j|^2
=C\log(2/\delta)\|z\|_{\ell^2_\delta}^2.
$$

双対性から $\|Af\|_{\ell^2_\delta}\le C\sqrt{\log(2/\delta)}\|f\|_2$。始点 $a_j$ に依存しない評価です。

**(2) 最大化と方向補間。** $f$ を $|f|$ に替え、各方向で平均が $\mathcal K_{2\delta}f(v_j)-\eta$ 以上の管を選びます。(1) を半径 $2\delta$ で用い $\eta\downarrow0$ とすれば、格子での最大値が同じ対数評価を満たします。[方向格子還元](#lem-gmt35-direction-grid)により、角度差 $O(\delta)$ の細管は半径 $2\delta$ の管に入り

$$
\|\mathcal K_\delta f\|_{L^2(S^1)}^2
\le C\delta\sum_j(\mathcal K_{2\delta}f(v_j))^2
\le C\log(2/\delta)\|f\|_2^2.
$$

**(3) 次元。** 任意の $\varepsilon>0$ について $\sqrt{\log(2/\delta)}\le C_\varepsilon\delta^{-\varepsilon}$。よって $(p,q,\beta)=(2,2,\varepsilon)$ の一様最大評価です。$f=\boldsymbol1_{K_\delta}$ とし、各方向の単位線分から $\mathcal K_\delta f(v)=1$ を得て

$$
1\le C_\varepsilon\delta^{-\varepsilon}|K_\delta|^{1/2},
\qquad
|K_\delta|\ge C_\varepsilon^{-2}\delta^{2\varepsilon}.
$$

これはMinkowski次元2を与えますが、Hausdorff次元へそのまま移してはいけません。Hausdorff側では任意の球被覆 $\sum_i r_i^s<\eta$ を尺度 $h_k=2^{-k}$ ごとに分け、拡大球の合併 $U_k$ を取ります。すると $|U_k|\le Ch_k^{2-s}H_k$、$\sum H_k<\eta$。各単位線分はどこかの尺度で少なくとも $(k+1)^{-2}$ の長さを覆われるので、対応する方向集合 $\Omega_k$ で $\mathcal K_{h_k}\boldsymbol1_{U_k}\ge c(k+1)^{-2}$。最大評価から

$$
\sigma(\Omega_k)\le C(k+1)^4 2^{-k(2-s-2\varepsilon)}H_k
$$

です。$s<2-2\varepsilon$ に選べば右辺を $k$ で足して $1=\sigma(S^1)\le C'\eta$ に矛盾します。[全尺度Hausdorff定理](#thm-gmt35-maximal-to-hausdorff)の中間計算をこれで再現しました。ゆえに $\dim_{\mathrm H}K\ge2-2\varepsilon$。$\varepsilon>0$ は任意で、周囲次元は2なので $\dim_{\mathrm H}K=2$ です。
<!-- solution-end -->

<a id="ex-gmt35-c02"></a>

**問題 C02：強さを混同しない。** $d\ge2$ で任意の $\varepsilon>0$ に対する $(d,d,\varepsilon)$ 一様最大評価を仮定し、次を解け。

1. 指示関数への代入で得る体積・Minkowski次元の式を書け。
2. それだけでHausdorff次元を証明したことにならない理由を述べよ。
3. 同じ最大評価からHausdorff次元を得るには被覆半径 $r_i$ のどんな処理が必要か、収束に使う指数とともに答えよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** 全方向の線分を含む有界 $K$ に対し $\mathcal K_\delta\boldsymbol1_{K_\delta}(v)=1$。仮定より

$$
1\le C_\varepsilon\delta^{-\varepsilon}|K_\delta|^{1/d},
\quad
|K_\delta|\ge C_\varepsilon^{-d}\delta^{d\varepsilon}.
$$

従って上下Minkowski次元は $d-d\varepsilon$ 以上で、$\varepsilon\downarrow0$ により $d$ です。

**(2)** 一般に Hausdorff次元 $\le$ 下Minkowski次元であり、逆向きではありません。例えば立方体内の可算稠密集合はHausdorff次元0とMinkowski次元 $d$ を同時に持つので、体積下界だけでは論理の橋が足りません。

**(3)** $s<d$ を任意に選び、$\varepsilon<(d-s)/d$ として $d-s-d\varepsilon>0$ を確保します。もし $\mathcal H^s(K)=0$ なら $\sum_i r_i^s<\eta$ の球被覆を選び、$h_k=2^{-k}$ ごとに拡大球の合併 $U_k$ と $H_k=\sum_{i\in I_k}r_i^s$ を作ります。$|U_k|\le Ch_k^{d-s}H_k$。各単位線分上の覆われた長さを尺度ごとに数えると、ある $k$ で少なくとも $(k+1)^{-2}$ となります。従って $\sigma(\Omega_k)\le C(k+1)^{2d}2^{-k(d-s-d\varepsilon)}H_k$。指数が正なので

$$
1\le\sum_k\sigma(\Omega_k)
\le C\eta\sum_k(k+1)^{2d}2^{-k(d-s-d\varepsilon)}
\longrightarrow0
\quad(\eta\downarrow0)
$$

と矛盾します。よって $\mathcal H^s(K)>0$。任意の $s<d$ で成立してHausdorff次元は $d$ です。この多尺度論証が(1)からは抜けていた段階です。
<!-- solution-end -->

## 8. 次講へ：Fourier解析では管はどこから現れるか

最大作用素の評価は、任意の関数の平均を全方向で制御する主張でした。一方で、Fourier解析では周波数空間の小さい帽から、物理空間の細長い管状の集中が生じます。次講GMT36では、HA11で導入されたrestriction/extensionとcap/tubeの尺度を具体的に対応させ、wave packetの重なりとKakeya問題をつなぎます。どこまでが証明済みの含意で、どこからが幾何的な見取り図かを区別して進みます。
