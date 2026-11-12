# GMT33 平面Córdoba型tube評価

<!-- definition-example-audit: strict -->

## 1. 面積零の集合で管の交差をどこまで抑えられるか

前講では、[tubeの重複度と二乗積分](../GMT32/index.md#prop-gmt32-tube-volume)により、管の体積の和が一定程度あっても、重なりが大きければ合併面積は小さくなると分かりました。しかし、[測度零のBesicovitch集合](../GMT31/index.md#thm-gmt31-null-existence)が存在するという事実と、各方向の管の二乗積分が発散するという事実だけでは、近傍の面積が**どんな速さ**で小さくなるかは分かりません。

今回の問いは、「異なる方向を向いた2本の細い管は、いったいどの程度重なれるか」です。角度が離れるほど交差できる領域が小さくなることを行列式で測り、その上界をすべての方向の組について足します。得られるのは、対数1個だけ損失する合併面積下界です。

以下では $0<\delta<1/8$ とし、$|\cdot|$ はEuclidノルム、$|E|=\mathcal L^2(E)$ は平面のLebesgue面積です。前講の[長さ1・半径$\delta$のtube](../GMT32/index.md#def-gmt32-tube)を

$$
T_\delta(a,v)=\{x:\operatorname{dist}(x,\{a+tv:0\le t\le1\})<\delta\}
$$

と書きます。線分の位置 $a$ は任意で、同じ点を通るとは仮定しません。

## 2. 無向方向の角度と二管の交差

一本の線分の向きを $v$ から $-v$ に変えても、幾何的な方向は同じです。ただし、始点を固定して $v$ だけを反転すると別の線分になるため、同じ線分を逆向きに表すには $a$ を $a+v$ へ移し、$T_\delta(a,v)=T_\delta(a+v,-v)$ とします。平面の無向方向を $e_\theta=(\cos\theta,\sin\theta)$、$0\le\theta<\pi$ で表します。二つの無向方向には、直線のなす**鋭角側の角度**を割り当てます。これは $0$ から $\pi/2$ までの数であり、向きがほぼ正反対の二つのベクトルを「大きく離れている」と誤認しないために必要です。

<a id="def-gmt33-projective-angle"></a>

<!-- formal-statement-start -->
> **定義（無向方向の角距離）**  
> $\theta,\phi\in[0,\pi)$ に対し、無向方向の円周上の距離 $\rho$ と鋭角側の角度 $\alpha$ を

$$
\rho(\theta,\phi)=\min\{|\theta-\phi|,\ \pi-|\theta-\phi|\},
\qquad 0\le\rho\le\pi/2,
$$

$$
\alpha=\rho(\theta,\phi)
$$

> とする。有限な方向集合 $\Theta\subset[0,\pi)$ が**角距離 $\delta$-分離**であるとは、相異なる $\theta,\phi\in\Theta$ について $\rho(\theta,\phi)\ge\delta$ が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt33-projective-angle -->
### 直接確認：端点をまたぐ方向は近い

$\theta=0$、$\phi=\pi-\varepsilon$（$0<\varepsilon<\pi/2$）なら、普通の差は $\pi-\varepsilon$ ですが、無向方向の距離は

$$
\rho(0,\pi-\varepsilon)=\min\{\pi-\varepsilon,\varepsilon\}=\varepsilon.
$$

従って $\varepsilon<\delta$ ならこの2方向を一緒に選ぶことはできません。一方 $\theta=0,\phi=\pi/2$ なら $\rho=\pi/2$ なので任意の $\delta<1/8$ で分離します。定義の二つの分岐を実際に確かめました。

前講の[球面上の弦長による分離](../GMT32/index.md#def-gmt32-separated)との関係を確認します。$\sigma\in\{1,-1\}$ を二つの代表ベクトルの内積が非負となるように選ぶと、$e_\theta\cdot(\sigma e_\phi)=|\cos(\theta-\phi)|=\cos\rho$ です。両ベクトルが単位長なので

$
|e_\theta-\sigma e_\phi|^2
=2-2\cos\rho
=4\sin^2(\rho/2).
$

従って符号反転後の弦長は $2\sin(\rho/2)$ になります。$0\le\rho\le\pi/2$ では

$$
\frac{2}{\pi}\rho\le2\sin(\rho/2)\le\rho.
$$

したがって両者は定数倍の尺度で同等ですが、**向きを反転してよい無向方向**を扱う本講では $\rho$ を固定して用います。

**定義の確認**：$0$ と $\pi-\varepsilon$ の組では円周の端をまたぐ短い方の差 $\varepsilon$、$0$ と $\pi/2$ では直接の差 $\pi/2$ を計算しました。各組について $\rho\ge\delta$ の真偽も判定したので、距離の二つの分岐と分離条件を別々に確かめています。
<!-- definition-example-end -->

二本のtubeを長さに沿って見る代わりに、それぞれの中心線を挟む幅 $2\delta$ の無限帯を見ます。管は必ずこの帯の内側にあります。帯同士の交差は平行四辺形であり、その面積は二つの法線を並べた行列の行列式で決まります。

<a id="lem-gmt33-two-tubes"></a>

<!-- formal-statement-start -->
> **補題（二tubeの交差面積）**  
> $0<\delta<1/8$、$a,b\in\mathbb R^2$、$\theta,\phi\in[0,\pi)$ とする。$T=T_\delta(a,e_\theta)$、$S=T_\delta(b,e_\phi)$ とおく。$\alpha=\rho(\theta,\phi)>0$ なら

$$
|T\cap S|
\le\min\left\{2\delta+\pi\delta^2,\frac{4\delta^2}{\sin\alpha}\right\}
\le\min\left\{(2+\pi)\delta,\frac{2\pi\delta^2}{\alpha}\right\}.
$$

> $\alpha=0$ のときも $|T\cap S|\le2\delta+\pi\delta^2$ である。定数は中心線の位置に依存しない。
<!-- formal-statement-end -->

### 直接例：直交する中央配置

中心を原点とし、水平・鉛直方向の単位線分をそれぞれ $[-1/2,1/2]\times\{0\}$、$\{0\}\times[-1/2,1/2]$ とします。$\delta<1/8$ では、両tubeの共通部分に入る点は $|x|<\delta$ かつ $|y|<\delta$ を満たし、逆も成立します。従って

$$
T\cap S=(-\delta,\delta)^2,
\qquad |T\cap S|=4\delta^2.
$$

$\alpha=\pi/2$、$\sin\alpha=1$ なので、補題の $4\delta^2/\sin\alpha$ はこの配置では**等号**です。一般の交差の上界は単なる尺度の思い付きではなく、帯の交差という実際の幾何から得られます。

### 証明の見取り図

各中心線に垂直な単位ベクトルを $n_\theta,n_\phi$ とし、点 $x$ に二つの符号付き距離を対応させます。帯は二つの距離がともに $\delta$ 未満という条件なので、値域では一辺 $2\delta$ の正方形です。二つの法線がなす角の行列式が $\sin\alpha$ であり、正方形の面積をその絶対値で割ると元の平行四辺形の面積が出ます。

<!-- proof-start -->
### 証明

$n_\theta=(-\sin\theta,\cos\theta)$、$n_\phi=(-\sin\phi,\cos\phi)$ とおきます。$T$ の中心線上の任意の点は $a+te_\theta$ です。$x\in T$ なら、ある $t\in[0,1]$ があって $|x-(a+te_\theta)|<\delta$ なので、

$$
|n_\theta\cdot(x-a)|
=|n_\theta\cdot(x-a-te_\theta)|
\le|x-a-te_\theta|<\delta.
$$

同じ議論で $x\in S$ なら $|n_\phi\cdot(x-b)|<\delta$ です。従って交差は二つの無限帯の共通部分に含まれます。

アフィン写像

$$
F(x)=\begin{pmatrix}
n_\theta\cdot(x-a)\\
n_\phi\cdot(x-b)
\end{pmatrix}
$$

を取ると、線形部分の行列 $A$ は $n_\theta,n_\phi$ を行とし、

$$
\det A
=(-\sin\theta)\cos\phi-\cos\theta(-\sin\phi)
=\sin(\phi-\theta).
$$

$\alpha>0$ なら $|\det A|=\sin\alpha>0$ なので $F$ は可逆です。二つの帯の交差は正方形 $(-\delta,\delta)^2$ の $F$ による逆像です。線形変換の面積倍率が $|\det A|$ であることから、逆像の面積は

$$
\frac{|(-\delta,\delta)^2|}{|\det A|}
=\frac{(2\delta)^2}{\sin\alpha}
=\frac{4\delta^2}{\sin\alpha}.
$$

管の交差はこの集合に含まれるため、これが第一の上界です。また $T\cap S\subset T$ と[平面tubeの正確な面積](../GMT32/index.md#prop-gmt32-tube-volume)から

$$
|T\cap S|\le|T|=2\delta+\pi\delta^2\le(2+\pi)\delta
$$

を得ます。最後に $0<\alpha\le\pi/2$ で $\sin\alpha\ge2\alpha/\pi$（単位円での $\sin$ の凹性）を使うと

$$
\frac{4\delta^2}{\sin\alpha}\le\frac{2\pi\delta^2}{\alpha}.
$$

$\alpha=0$ では $F$ が可逆でなくなり帯の交差は無限に延び得るため、管自身の面積による上界だけを残します。$\square$
<!-- proof-end -->

**落とし穴：位置が違う場合。** 二管の中心線が実際に交わらなくても補題は適用できます。位置を表すのは $F$ の定数項だけで、行列式は方向だけで決まるためです。また角度が零のとき $\delta^2/\sin\alpha$ を使うことはできません。平行な二管は一致し得て、交差面積が $\delta$ の一次になります。

## 3. 方向別の交差を足すと調和級数が現れる

二管の上界には角距離の逆数 $1/\rho$ が現れます。方向を少なくとも $\delta$ ずつ離しておけば、基準方向から距離が $k\delta$ 程度の方向は高々定数個です。したがって交差を足すと、$1+1/2+\cdots+1/N$ が自然に現れます。

<a id="lem-gmt33-angular-sum"></a>

<!-- formal-statement-start -->
> **補題（分離方向の逆角度和）**  
> $0<\delta<1/8$ とし、$\Theta=\{\theta_1,\ldots,\theta_N\}\subset[0,\pi)$ を角距離 $\delta$-分離な相異なる $N\ge2$ 方向とする。任意の $i$ について

$$
\sum_{j\ne i}\frac{1}{\sin\rho(\theta_i,\theta_j)}
\le \frac{2\pi}{\delta}\bigl(1+\log N\bigr).
$$

> また $N\le\pi/\delta$ である。ここで $\log$ は自然対数である。
<!-- formal-statement-end -->

### 直接例：等間隔方向での調和和

$N\ge4$ として $\theta_j=j\pi/N$（$j=0,\ldots,N-1$）を選ぶと、隣同士の円周方向の隔たりは $h=\pi/N$、従って $h$-分離です。基準方向 $0$ から見た $k$ 番目の角距離は

$$
\rho(0,\theta_k)=\frac{\pi}{N}\min\{k,N-k\}.
$$

従って

$$
\sum_{k=1}^{N-1}\frac1{\rho(0,\theta_k)}
=\frac{N}{\pi}\sum_{k=1}^{N-1}\frac1{\min\{k,N-k\}}.
$$

$k\le N/2$ と $k>N/2$ は対になるので、この和は $N(1+\log N)$ の程度です。例えば $N=6$ なら分母の整数は $1,2,3,2,1$、和は $(6/\pi)(1+1/2+1/3+1/2+1)$ と具体的に確認できます。遠い方向も少しずつ交差に寄与するため、対数が生まれます。

### 証明の見取り図

円周 $[0,\pi)$ の端と端をつないで順に方向を並べます。分離条件から、隣り合う円弧の長さも $\delta$ 以上です。基準方向から円周順に $k$ 個進んだ角度差は $k\delta$ 以上、逆回りは $(N-k)\delta$ 以上。この二つの短い方が無向角距離です。

<!-- proof-start -->
### 証明

角度の代表を $0\le\theta_1<\cdots<\theta_N<\pi$ と並べます。隣り合う差 $\theta_{i+1}-\theta_i$ と、端をまたぐ差 $\pi-\theta_N+\theta_1$ は、いずれも $\delta$ 以上です。実際、各差が $\delta$ 未満なら対応する二方向の $\rho$ も $\delta$ 未満となり、分離条件に反します。これら $N$ 個の角度幅の合計は $\pi$ なので $N\delta\le\pi$ です。

一つの方向 $\theta_i$ から円周上で前方に $k$ 個進んだ方向を $\theta_{i+k}$（添字は $N$ で循環）とし、その前向きの角度幅を $s_k$ とします。$k$ 個の隣接弧を通るので $s_k\ge k\delta$、残りの逆向きの角度幅も $\pi-s_k\ge(N-k)\delta$ です。従って

$$
\rho(\theta_i,\theta_{i+k})
=\min\{s_k,\pi-s_k\}
\ge\delta\min\{k,N-k\}.
$$

$\sin t\ge2t/\pi$ を $0<t\le\pi/2$ で適用すると、

$$
\sum_{j\ne i}\frac1{\sin\rho(\theta_i,\theta_j)}
\le\frac{\pi}{2\delta}
\sum_{k=1}^{N-1}\frac1{\min\{k,N-k\}}.
$$

後者の和は各 $m=1,\ldots,\lfloor N/2\rfloor$ が高々二回現れることから

$$
\sum_{k=1}^{N-1}\frac1{\min\{k,N-k\}}
\le2\sum_{m=1}^{\lfloor N/2\rfloor}\frac1m
\le2(1+\log N).
$$

従って実際には $\pi(1+\log N)/\delta$ で抑えられ、主張の定数 $2\pi$ でも成立します。$\square$
<!-- proof-end -->

**反例：無向方向の端を無視すると破綻する。** 角度 $0$ と $\pi-\varepsilon$ を、普通の差が約 $\pi$ だから「離れている」と扱うと、二本の帯はほぼ平行で $1/\sin\varepsilon$ が巨大になります。$(0,\pi)$ の端をつないで分離する条件は、角度和を有限な定数で一様に抑えるための実質的仮定です。

## 4. Córdoba型の平面tube合併評価

ここまでの二つの補題を、[前講の重複度とCauchy--Schwarz](../GMT32/index.md#prop-gmt32-tube-volume)へ代入します。管の位置を制限しないことが重要です。全方向の線分がどこに置かれていても使える評価になります。

<a id="thm-gmt33-cordoba"></a>

<!-- formal-statement-start -->
> **定理（平面Córdoba型tube評価）**  
> $0<\delta<1/8$、$N\ge2$ とし、角距離 $\delta$-分離な無向方向 $\theta_1,\ldots,\theta_N\in[0,\pi)$ を取る。各方向に、位置が任意の長さ1・半径 $\delta$ のtube $T_j=T_\delta(a_j,e_{\theta_j})$ を一本ずつ置き、

$$
m_\delta=\sum_{j=1}^N\mathbf1_{T_j},
\qquad U_\delta=\bigcup_{j=1}^N T_j
$$

> とする。このとき絶対定数 $C,c>0$ が存在し

$$
\int_{\mathbb R^2}m_\delta^2\,dx
\le C N\delta\bigl(1+\log N\bigr),
$$

$$
|U_\delta|\ge c\,\frac{N\delta}{1+\log N}.
$$

> 特に $N\ge c_0/\delta$（$c_0>0$ は $\delta$ に依存しない）なら、$c_0$ にだけ依存する $c_1>0$ が存在し

$$
|U_\delta|\ge\frac{c_1}{\log(e/\delta)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二乗積分を対角と非対角に分けます。対角は $N$ 本分の管面積で $O(N\delta)$。非対角は[二tubeの交差面積](#lem-gmt33-two-tubes)から $\delta^2$ と角度逆数の和の積です。[逆角度和補題](#lem-gmt33-angular-sum)を一本ごとに使うと、全体は $O(N\delta\log N)$ に留まります。一次積分が $N\delta$ に比例するため、Cauchy--Schwarzで合併面積を下から押さえます。

<!-- proof-start -->
### 証明

[管面積の公式](../GMT32/index.md#prop-gmt32-tube-volume)から各管の面積は $A_\delta=2\delta+\pi\delta^2$ であり、

$$
2N\delta
\le\int m_\delta\,dx=N(2\delta+\pi\delta^2)
\le(2+\pi)N\delta.
$$

[二乗積分の展開](../GMT32/index.md#prop-gmt32-tube-volume)により

$$
\int m_\delta^2\,dx
=\sum_{i=1}^N|T_i|+\sum_{i=1}^N\sum_{j\ne i}|T_i\cap T_j|.
$$

第一項は $NA_\delta\le(2+\pi)N\delta$ です。$i\ne j$ では分離性から $\rho(\theta_i,\theta_j)\ge\delta>0$ なので、[二tubeの交差面積](#lem-gmt33-two-tubes)の帯による上界を適用できます。各 $i$ に[逆角度和補題](#lem-gmt33-angular-sum)を代入すると

$$
\begin{aligned}
\sum_{i=1}^N\sum_{j\ne i}|T_i\cap T_j|
&\le4\delta^2\sum_{i=1}^N\sum_{j\ne i}
\frac1{\sin\rho(\theta_i,\theta_j)}\\
&\le4\delta^2 N\frac{2\pi}{\delta}(1+\log N)\\
&=8\pi N\delta(1+\log N).
\end{aligned}
$$

よって $C=(2+\pi)+8\pi$ とすれば

$$
\int m_\delta^2\,dx
\le C N\delta(1+\log N).
$$

すべての管は正の面積を持ち $N\ge2$ です。[Cauchy--Schwarzを用いた合併下界](../GMT32/index.md#prop-gmt32-tube-volume)をこの $m_\delta$ に適用すれば

$$
\begin{aligned}
|U_\delta|
&\ge\frac{(\int m_\delta\,dx)^2}{\int m_\delta^2\,dx}\\
&\ge\frac{(2N\delta)^2}{C N\delta(1+\log N)}
=\frac4C\,\frac{N\delta}{1+\log N}.
\end{aligned}
$$

最後に $N\ge c_0/\delta$ なら分子 $N\delta\ge c_0$。一方、[逆角度和補題](#lem-gmt33-angular-sum)から $N\le\pi/\delta$ なので

$$
1+\log N\le1+\log(\pi/\delta)
=\log(e\pi/\delta)
\le(1+\log\pi)\log(e/\delta).
$$

最後の不等号は $\log(e/\delta)\ge1$ によります。これを代入すると $c_1=4c_0/[C(1+\log\pi)]$ と選べます。$\square$
<!-- proof-end -->

**なぜ平方根の損失ではなく対数の損失か。** $N\asymp\delta^{-1}$ なら $\int m_\delta^2\lesssim\log(1/\delta)$、従って $L^2$ ノルム $\|m_\delta\|_2\lesssim\sqrt{\log(1/\delta)}$ です。しかし合併面積を求めるときは一次積分を**二乗**して二乗積分で割るため、分母の損失は $\log(1/\delta)$ となります。

**定理の適用不能例。** 同じ水平管を $N$ 回選べば $\int m_\delta^2=N^2|T|$ です。$N\asymp\delta^{-1}$ とすると右辺は $\asymp\delta^{-1}$ に発散し、定理の $O(\log(1/\delta))$ には入りません。失った仮定は方向の分離性であり、証明中の逆角度和が零の角度で使えなくなります。

## 5. 面積零でもMinkowski次元は2になる

[GMT31の存在定理](../GMT31/index.md#thm-gmt31-null-existence)は、コンパクトで面積零、すべての無向方向に長さ1の線分を含む集合を作りました。ここで $K_\delta=\{x\in\mathbb R^2:\operatorname{dist}(x,K)<\delta\}$ は前講の[開いた $\delta$-近傍](../GMT32/index.md#def-gmt32-tube)です。$K$ の各線分の $\delta$-tube はこの $K_\delta$ に入り、今回の定理はその位置を問わず合併面積を下から抑えます。従って面積が零へ近づく**速さ**に制約を与えられます。

<a id="cor-gmt33-kakeya-minkowski"></a>

<!-- formal-statement-start -->
> **系（平面Besicovitch集合のfull Minkowski次元）**  
> 有界集合 $K\subset\mathbb R^2$ がすべての無向方向に長さ1の線分を含むとする。このとき、ある絶対定数 $c>0$ と十分小さいすべての $\delta>0$ について

$$
|K_\delta|\ge\frac{c}{\log(e/\delta)}.
$$

> 特に上・下Minkowski次元はともに2である。

$$
\underline{\dim}_{\mathrm M}K
=\overline{\dim}_{\mathrm M}K=2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

等間隔の方向を $N=\lfloor1/\delta\rfloor$ 個選び、それぞれの管を $K_\delta$ の中へ入れます。円周上の隣接角は $\pi/N\ge\delta$ なので定理の分離条件を満たし、$N\delta$ は下から定数で抑えられます。得た近傍面積下界を、[前講の被覆数と近傍体積の比較](../GMT32/index.md#lem-gmt32-neighborhood-cover)へ入れ、対数の対数は $\log(1/\delta)$ より遅く増えると確認します。

<!-- proof-start -->
### 証明

$0<\delta<1/8$ を固定し、$N=\lfloor1/\delta\rfloor\ge7$ とおきます。$\theta_j=j\pi/N$（$j=0,\ldots,N-1$）の円周角距離の最小値は $\pi/N\ge\pi\delta>\delta$ です。各方向に $K$ に含まれる長さ1の線分を一本選び、そのtubeを $T_j$ とします。$T_j$ の任意の点は $K$ 内の選んだ線分から距離 $\delta$ 未満なので $T_j\subset K_\delta$ です。

$N\delta>\,1-\delta>7/8$、また $N\le1/\delta$ なので、[Córdoba型tube評価](#thm-gmt33-cordoba)を使って

$$
|K_\delta|\ge|U_\delta|
\ge c\frac{N\delta}{1+\log N}
\ge\frac{c'}{\log(e/\delta)}
$$

を得ます。$K$ が有界なので $K_\delta$ は十分小さい $\delta$ に対して共通の有界球に含まれ、従って面積は有限で上からも定数で抑えられます。$\delta\to0$ のとき

$$
-\log\log(e/\delta)+\log c'
\le\log|K_\delta|\le C_0
$$

が成り立ちます。$\log\delta<0$ で割ると不等号の向きに注意して

$$
\frac{C_0}{\log\delta}
\le\frac{\log|K_\delta|}{\log\delta}
\le
\frac{-\log\log(e/\delta)+\log c'}{\log\delta}.
$$

左右はともに0へ収束します。右辺の極限は $t=\log(1/\delta)\to\infty$ と置けば $(\log(1+t)-\log c')/t\to0$ で確かめられます。従って

$$
\lim_{\delta\downarrow0}\frac{\log|K_\delta|}{\log\delta}=0.
$$

[近傍面積と上下Minkowski次元の対応](../GMT32/index.md#lem-gmt32-neighborhood-cover)を $d=2$ へ適用すれば両方の次元が2です。$\square$
<!-- proof-end -->

**測度零との両立。** $K$ を[GMT31で構成したコンパクト零面積集合](../GMT31/index.md#thm-gmt31-null-existence)に選ぶと、コンパクト性から $K_\delta$ は $\delta\downarrow0$ で $K$ に縮み、[測度の上からの連続性](../../MT/MT1/index.md#thm-mt1-continuity-from-above-finite)により $|K_\delta|\to|K|=0$ です。一方、今回の系は

$$
\frac{c}{\log(e/\delta)}
\le |K_\delta|\longrightarrow0
$$

を主張します。下界自体が0へ収束するため矛盾しません。それでもこの速度はどの $\delta^\varepsilon$（$\varepsilon>0$）より遅く減り、Minkowski次元は2に固定されます。

**Hausdorff次元への飛躍は禁止。** [Hausdorff次元とMinkowski次元の比較](../GMT32/index.md#thm-gmt32-dimension-comparison)は $\dim_{\mathrm H}K\le\underline{\dim}_{\mathrm M}K$ の向きです。Minkowski次元2だけからHausdorff次元2を証明したことにはなりません。平面Kakeya集合のHausdorff次元2は別の追加論証を要する事実であり、ここでは導出していません。

## 6. 演習：角度、交差、対数を紙上で再現する

各問題では平面のLebesgue面積を $|\cdot|$ と書き、$0<\delta<1/8$ とします。

### Level A：個々の幾何と和

<a id="ex-gmt33-a01"></a>

**A01　無向方向の端点をまたぐ距離**

- Level: A
- 問題: $\theta=\pi/12$、$\phi=11\pi/12$ とする。[無向角距離](#def-gmt33-projective-angle) $\rho(\theta,\phi)$ と $\sin\rho$ を求めよ。さらに角距離の条件のみから得る $\delta$ の範囲と、本章の共通仮定 $0<\delta<1/8$ も課した範囲を区別せよ。

<!-- solution-start -->
#### 詳細解答

通常の差は $|\theta-\phi|=10\pi/12=5\pi/6$ です。円周の反対側を通る差は $\pi-5\pi/6=\pi/6$ なので

$$
\rho(\theta,\phi)=\min\{5\pi/6,\pi/6\}=\pi/6,
\qquad \sin\rho=\frac12.
$$

定義の条件は $\rho\ge\delta$ です。この条件だけなら $0<\delta\le\pi/6$ です。一方、本章で扱う $0<\delta<1/8$ については $1/8<\pi/6$ なので、その**すべての $\delta$** で二方向は分離しています。共通仮定を課した答えは $0<\delta<1/8$ です。大きい方の普通の角度差で分離を判定してはいけません。
<!-- solution-end -->

<a id="ex-gmt33-a02"></a>

**A02　帯を決める二つの法線の行列式**

- Level: A
- 問題: $\theta=0$、$\phi=\pi/3$ の二つのtubeを考える。各法線ベクトルを実際に書き、法線を行とする $2\times2$ 行列の行列式、交差帯の面積上界を計算せよ。

<!-- solution-start -->
#### 詳細解答

定義に従い

$$
n_0=(0,1),
\qquad n_{\pi/3}=(-\sqrt3/2,1/2).
$$

行列と行列式は

$$
A=\begin{pmatrix}0&1\\-\sqrt3/2&1/2\end{pmatrix},
\qquad\det A=0\cdot\frac12-1\cdot\left(-\frac{\sqrt3}{2}\right)=\frac{\sqrt3}{2}.
$$

二つの法線方向の符号付き距離がともに $\delta$ 未満の正方形は面積 $4\delta^2$ です。[交差面積補題](#lem-gmt33-two-tubes)の証明の変数変換を適用すると

$$
|T\cap S|\le\frac{4\delta^2}{|\det A|}
=\frac{8}{\sqrt3}\delta^2.
$$

位置の定数項は行列式に入らないので、二管が離れた場所にあっても同じ上界です。
<!-- solution-end -->

<a id="ex-gmt33-a03"></a>

**A03　直交する管とその交差**

- Level: A
- 問題: 水平・鉛直な長さ1の線分をともに原点中心に置いたとき、二管の交差面積を厳密に求めよ。また二乗重複度の積分を求めよ。

<!-- solution-start -->
#### 詳細解答

水平管に入るためには、線分中心近くで $|y|<\delta$、鉛直管には $|x|<\delta$ が必要です。両方の条件を満たすと $|x|,|y|<\delta<1/8<1/2$ で、両線分への垂線の足は線分内部です。よって共通部分は $(-\delta,\delta)^2$、その面積は $4\delta^2$ です。

各管面積は[GMT32の公式](../GMT32/index.md#prop-gmt32-tube-volume)で $A=2\delta+\pi\delta^2$。二管の重複度 $m=\mathbf1_T+\mathbf1_S$ を二乗して積分すると

$$
\int m^2\,dx
=|T|+|S|+2|T\cap S|
=2(2\delta+\pi\delta^2)+8\delta^2.
$$

交差が $(i,j)$ と $(j,i)$ の二回数えられることに注意します。
<!-- solution-end -->

<a id="ex-gmt33-a04"></a>

**A04　有限調和和の上界**

- Level: A
- 問題: 整数 $M\ge1$ に対し $H_M=\sum_{k=1}^M1/k$ と置く。積分比較で $H_M\le1+\log M$ を示し、$M=3$ で数値比較せよ。

<!-- solution-start -->
#### 詳細解答

$k\ge2$ では $1/x$ が減少するため、区間 $[k-1,k]$ 上で $1/x\ge1/k$。従って

$$
\frac1k\le\int_{k-1}^k\frac{dx}{x}.
$$

$k=2,\ldots,M$ を足すと

$$
H_M=1+\sum_{k=2}^M\frac1k
\le1+\int_1^M\frac{dx}{x}
=1+\log M.
$$

$M=1$ では空和と $\log1=0$ により等号です。$M=3$ では $H_3=1+1/2+1/3=11/6\approx1.833$、$1+\log3\approx2.099$ で確かに上界です。
<!-- solution-end -->

<a id="ex-gmt33-a05"></a>

**A05　等間隔の方向と本数**

- Level: A
- 問題: $N=\lfloor1/\delta\rfloor$、$\theta_j=j\pi/N$（$0\le j<N$）とする。最小の無向角距離を求め、$\delta$-分離性と $N\delta>1-\delta$ を証明せよ。

<!-- solution-start -->
#### 詳細解答

角度は長さ $\pi$ の円周上に等間隔 $h=\pi/N$ で並びます。二点間の円周短距離は $h\min\{k,N-k\}$ なので最小値は $h$ です。$N=\lfloor1/\delta\rfloor\le1/\delta$ より

$$
h=\frac\pi N\ge\pi\delta>\delta
$$

であり、分離性が成立します。また床関数の定義から $N>1/\delta-1$ なので

$$
N\delta>1-\delta>7/8.
$$

本数が多いだけでは足りず、下界 $N\delta>7/8$ も合併評価に必要です。
<!-- solution-end -->

### Level B：証明と誤った含意

<a id="ex-gmt33-b01"></a>

**B01　2方向だけを選んだときの配置に依らない下界**

- Level: B
- 問題: 方向差が $\alpha\in(0,\pi/2]$ の二つの長さ1のtube $T,S$ について、交差面積の上界を求めよ。さらに $|T\cup S|\ge2(2\delta+\pi\delta^2)-4\delta^2/\sin\alpha$ を証明し、この下界が負なら何を意味するか説明せよ。

<!-- solution-start -->
#### 詳細解答

法線の行列式は絶対値 $\sin\alpha$ です。各管を対応する幅 $2\delta$ の帯に含めると、[二tubeの交差面積](#lem-gmt33-two-tubes)により

$$
|T\cap S|\le\min\left\{2\delta+\pi\delta^2,\frac{4\delta^2}{\sin\alpha}\right\}.
$$

和集合について有限加法性から

$$
|T\cup S|=|T|+|S|-|T\cap S|.
$$

両管の面積は $A=2\delta+\pi\delta^2$ なので

$$
|T\cup S|\ge2A-\frac{4\delta^2}{\sin\alpha}.
$$

この数が負になる場合は、非負な面積に対する真だが役に立たない下界になっただけです。実際には $|T\cap S|\le A$ も併用して、常に $|T\cup S|\ge A>0$ と言えます。帯を無限に延長した上界は鋭角が小さすぎると粗くなる、という機構が分かります。
<!-- solution-end -->

<a id="ex-gmt33-b02"></a>

**B02　一般の非一様方向配置で対数が残る理由**

- Level: B
- 問題: $\Theta=\{\theta_1,\ldots,\theta_N\}$ を無向角距離 $\delta$-分離とする。角度間隔が等しいとは仮定せず、$\sum_{i\ne j}1/\rho(\theta_i,\theta_j)\le 4N(1+\log N)/\delta$ を導け。

<!-- solution-start -->
#### 詳細解答

角度を $0\le\theta_1<\cdots<\theta_N<\pi$ と円周順に並べます。隣同士および端をまたぐすべての弧の長さが $\delta$ 以上であるのは、そうでなければ対応する二方向が分離条件に反するためです。

$i$ を固定し、円周順に $k$ 個進む角度幅を $s_k$ とすれば

$$
s_k\ge k\delta,\qquad \pi-s_k\ge(N-k)\delta,
$$

従って

$$
\frac1{\rho(\theta_i,\theta_{i+k})}
=\frac1{\min(s_k,\pi-s_k)}
\le\frac1{\delta\min(k,N-k)}.
$$

和を取り、$1/m$ の各項を高々二度数えると

$$
\sum_{j\ne i}\frac1{\rho(\theta_i,\theta_j)}
\le\frac2\delta\sum_{m=1}^{\lfloor N/2\rfloor}\frac1m
\le\frac{2(1+\log N)}{\delta}.
$$

$i=1,\ldots,N$ を合計すれば $2N(1+\log N)/\delta$ というさらに強い評価が出るので、問題で指定した係数4の上界も成立します。等間隔性を使った行はありません。
<!-- solution-end -->

<a id="ex-gmt33-b03"></a>

**B03　同方向の管を繰り返すと二乗評価は壊れる**

- Level: B
- 問題: 一本の管 $T$ を $N$ 回繰り返した多重度 $m=N\mathbf1_T$ を考える。$N=\lfloor1/\delta\rfloor$ とすると、$\int m$、$\int m^2$、$|U|$ はどのオーダーか。Córdoba型評価が適用できない理由を証明の使用箇所から説明せよ。

<!-- solution-start -->
#### 詳細解答

管面積は $A_\delta=2\delta+\pi\delta^2\asymp\delta$ です。$m=N\mathbf1_T$ より

$$
\int m\,dx=NA_\delta\asymp N\delta\asymp1,
$$

$$
\int m^2\,dx=N^2A_\delta\asymp N^2\delta\asymp\delta^{-1}.
$$

合併は一本の管だけなので $|U|=A_\delta\asymp\delta$ です。もし分離性なしに[定理](#thm-gmt33-cordoba)を適用すれば $\int m^2\lesssim\log(1/\delta)$ と誤ってしまいます。失われたのは相異なる方向の角距離 $\rho\ge\delta$ という仮定です。[交差補題](#lem-gmt33-two-tubes)で $\sin\rho$ によって割る段階は $\rho=0$ では行えず、[逆角度和補題](#lem-gmt33-angular-sum)も適用不能です。
<!-- solution-end -->

<a id="ex-gmt33-b04"></a>

**B04　対数近傍下界から次元を判定する**

- Level: B
- 問題: 有界集合 $E\subset\mathbb R^2$ について、十分小さい $\delta$ で $|E_\delta|\ge c/\log(e/\delta)$ が成り立つとする。近傍体積の式を用いて上下Minkowski次元が2と示せ。またこの仮定だけで $\dim_{\mathrm H}E=2$ は従うか。

<!-- solution-start -->
#### 詳細解答

有界性から $|E_\delta|\le M$ という $\delta$ に依らない上界が取れます。従って

$$
\log c-\log\log(e/\delta)\le\log|E_\delta|\le\log M.
$$

$\log\delta<0$ で割り、$\delta\downarrow0$ とすると、両端が0に収束するため

$$
\lim_{\delta\downarrow0}\frac{\log|E_\delta|}{\log\delta}=0.
$$

[前講の被覆数と近傍体積の比較](../GMT32/index.md#lem-gmt32-neighborhood-cover)を使い、上・下とも $2-0=2$ です。一方、Hausdorff次元については下から押さえる情報がありません。例えば有理点の稠密可算集合 $E=\mathbb Q^2\cap[0,1]^2$ は任意の $\delta>0$ で $|E_\delta|\ge1$ なので仮定を満たしますが、可算性から $\dim_{\mathrm H}E=0$ です。従ってこの仮定**だけ**からHausdorff次元2は言えません。
<!-- solution-end -->

### Level C：すべてをつなぐ

<a id="ex-gmt33-c01"></a>

**C01　Córdoba評価から零面積Besicovitch集合のfull Minkowski次元まで**

- Level: C
- 問題: $\mathbb R^2$ のコンパクトな測度零Besicovitch集合 $K$ を一つ取る。$0<\delta<1/8$、$N=\lfloor1/\delta\rfloor$ とし、方向 $\theta_j=j\pi/N$ に含まれる単位線分のtubeを $T_j\subset K_\delta$ とする。以下を順に証明せよ。
  1. $\int m_\delta\ge2N\delta$、$\int m_\delta^2\le C N\delta(1+\log N)$ を示す。
  2. $|K_\delta|\ge c/\log(e/\delta)$ を導く。
  3. $|K_\delta|\to0$ を別の理由で示し、(2)との両立を説明する。
  4. 上下Minkowski次元を計算し、Hausdorff次元に対してこの方法が証明した範囲を述べる。

<!-- solution-start -->
#### 詳細解答

**1. 分離性と二乗積分。** $\theta_j$ は円周長 $\pi$ に等間隔で配置されています。最小無向角距離は $\pi/N\ge\pi\delta>\delta$ なので $\delta$-分離です。[前講の管面積](../GMT32/index.md#prop-gmt32-tube-volume)から

$$
\int m_\delta\,dx
=N(2\delta+\pi\delta^2)\ge2N\delta.
$$

二乗を展開した対角項は $N(2\delta+\pi\delta^2)\le(2+\pi)N\delta$ です。非対角項は[交差補題](#lem-gmt33-two-tubes)で各 $4\delta^2/\sin\rho_{ij}$ 以下なので、[逆角度和補題](#lem-gmt33-angular-sum)を使って

$$
\sum_{i\ne j}|T_i\cap T_j|
\le4\delta^2N\frac{2\pi}{\delta}(1+\log N)
=8\pi N\delta(1+\log N).
$$

従って指定した上界が絶対定数 $C=2+9\pi$ で成立します。

**2. 合併から近傍へ。** $m_\delta$ は $U_\delta=\bigcup_jT_j$ の外で零であり、[Cauchy--Schwarzによる合併下界](../GMT32/index.md#prop-gmt32-tube-volume)から

$$
|K_\delta|\ge|U_\delta|
\ge\frac{(\int m_\delta)^2}{\int m_\delta^2}
\ge\frac{4N\delta}{C(1+\log N)}.
$$

$N\delta>1-\delta>7/8$、$N\le1/\delta$ を代入すれば

$$
|K_\delta|\ge\frac{7/(2C)}{\log(e/\delta)}.
$$

**3. 零への収束。** $K$ はコンパクトで測度零です。$K_{1/n}$ は減少する有界な可測集合で、共通部分は $K$ です。従って[測度の上からの連続性](../../MT/MT1/index.md#thm-mt1-continuity-from-above-finite)から $|K_{1/n}|\downarrow|K|=0$。近傍の単調性で一般の $\delta\downarrow0$ でも $|K_\delta|\to0$。一方、$1/\log(e/\delta)$ も0へ減るため、(2)はこの極限と矛盾しません。

**4. 次元。** 有界性から $|K_\delta|\le M$。すると

$$
\log c-\log\log(e/\delta)\le\log|K_\delta|\le\log M
$$

であり、$\log\delta$ で割った比は0へ収束します。[前講のMinkowski次元判定](../GMT32/index.md#lem-gmt32-neighborhood-cover)により

$$
\underline{\dim}_{\mathrm M}K
=\overline{\dim}_{\mathrm M}K=2.
$$

[Hausdorff次元との比較定理](../GMT32/index.md#thm-gmt32-dimension-comparison)が与えるのは $\dim_{\mathrm H}K\le2$ という上界だけです。今回の交差評価だけではHausdorff次元2の下界を導いていません。
<!-- solution-end -->

## 7. 次講への橋：平面の角度1個だけで足りるのか

平面では、二本の管の交差面積を $\delta^2/\sin\alpha$ で抑えられました。方向が円周を1列に並び、角度逆数の和が調和級数になることも決定的でした。

しかし高次元になると、方向が球面上で多方向に配置され、二管だけでなく多数の管が一か所へ集中する幾何が問題になります。次講GMT34では高次元のtube交差・hairbrush配置を調べ、平面の証明のどこが高次元では足りなくなるのかを特定します。
