# YAU1-03 複素Monge–Ampère方程式の幾何

## 1. 体積を指定するには、どの関数でもよいのか

[既習のRicci指定と体積方程式の同値性](../../CYG/CYG1-10/index.md#prop-cyg1-10-monge-ampere-reduction)と前章の正規化の計算によって、境界のないコンパクト連結Kähler多様体 $X$（複素次元 $n\ge1$）上で、基準Kähler形式 $\omega$ を固定し、既知の滑らかな実関数 $F$ に対して

$$
(\omega+i\partial\bar\partial\varphi)^n=e^F\omega^n
$$

を解く問いに至った。左辺に現れる未知の $\varphi$ は滑らかな実関数だが、**任意の実関数を代入できるわけではない**。新しい形式 $\omega_\varphi=\omega+i\partial\bar\partial\varphi$ が正値でなければKähler計量を表さず、体積比の正の対数も楕円型の方程式も保証されない。

本章ではまず正値な関数の範囲を定め、その内部で左辺を行列式として計算し、微小な関数の変更が方程式をどう変えるかを導く。後続の連続性の方法で使うのは、この**線形化が正の楕円型作用素になる**という性質である。ここでは特定の $F$ に対する一般的な解の存在・一意性までは主張しない。

正則座標 $z^j=x^j+iy^j$ で $\partial_j=\partial/\partial z^j$、$\partial_{\bar k}=\partial/\partial\bar z^k$ と書く。$j,k$ は $1,\ldots,n$ を動く添字である。

$$
\omega=i\sum_{j,k=1}^n g_{j\bar k}\,dz^j\wedge d\bar z^k,
\qquad G=(g_{j\bar k})>0
$$

と書く。$\varphi_{j\bar k}=\partial_j\partial_{\bar k}\varphi$ は $\varphi$ の複素混合二階微分で、実関数の混合微分の交換と共役から $\overline{\varphi_{j\bar k}}=\varphi_{k\bar j}$ となり、$\Phi=(\varphi_{j\bar k})$ はHermite行列である。ここで $v=\sum_jv^j\partial_j$ を $(1,0)$ 接ベクトルとすると、[正の実 $(1,1)$ 形式の定義](../../KAH/KAH1-02/index.md#def-kah1-02-positive-form)と[係数行列の判定命題](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)により

$$
-i\,\omega_\varphi(v,\bar v)
=\sum_{j,k}(g_{j\bar k}+\varphi_{j\bar k})v^j\overline{v^k}>0
\quad(v\ne0)
$$

が正値性の正確な意味である。実 $(1,1)$ 形式の評価 $\omega_\varphi(v,\bar v)$ 自体は純虚数なので、不等号で比較するのは $-i$ を掛けた実数値である。以下では「$>0$」をこの正値Hermite形式という意味で用いる。

### 最初の実験：平坦な楕円曲線

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$、$\omega_0=i\,dz\wedge d\bar z$ とする。実数 $a$ に対し

$$
\varphi_a(x)=\frac{a}{\pi^2}\cos(2\pi x)
$$

は周期的な滑らかな実関数である。[Wirtinger微分](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)の $\partial_z=(\partial_x-i\partial_y)/2$、$\partial_{\bar z}=(\partial_x+i\partial_y)/2$ を合成し、混合微分を交換すると $\partial_z\partial_{\bar z}=(\partial_x^2+\partial_y^2)/4$ だから

$$
(\varphi_a)_{z\bar z}
=\frac14\frac{d^2}{dx^2}\left(\frac a{\pi^2}\cos2\pi x\right)
=-a\cos(2\pi x),
$$

従って

$$
\omega_{\varphi_a}=(1-a\cos2\pi x)\omega_0.
$$

$\cos2\pi x$ は $[-1,1]$ の値をすべて取るので、**全点で正値**なのは $|a|<1$ の場合に限る。$a=1$ では $x=0$ で退化し、$a>1$ ではそこで負となる。これが方程式の定義域を制限する最小例である。

## 2. 正値領域と固定Kähler類

局所座標では正値行列 $G$ にHermite行列 $\Phi$ を足している。点ごとに $G^{-1/2}\Phi G^{-1/2}$ を作ると、これはHermite行列であり、$G+\Phi=G^{1/2}(I+G^{-1/2}\Phi G^{-1/2})G^{1/2}$ である。したがって、後者の固有値を $\lambda_j$ とすれば、正値判定は $1+\lambda_j>0$（全 $j$）になる。単に行列式が正という条件では足りない。

この条件を全点で満たす実関数だけを、同じKähler類の計量を表す候補として集めよう。これで体積方程式を解く関数の範囲を一つの集合にできる。

<a id="def-yau1-03-positive-domain"></a>

<!-- formal-statement-start -->
> **定義（Kählerポテンシャルの正値領域）**
>
> $X$ を境界のないコンパクトKähler多様体、$\omega$ をそのKähler形式とする。滑らかな実関数の集合を

$$
\mathcal H_\omega
:=\{\varphi\in C^\infty(X;\mathbb R):
\omega_\varphi:=\omega+i\partial\bar\partial\varphi>0\}
$$

> と定める。正値性は $X$ の各点での実 $(1,1)$ 形式の正値性を意味する。$\mathcal H_\omega$ の元を、$\omega$ に関する許容Kählerポテンシャルとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-03-positive-domain -->
**定義の確認**（楕円曲線）。第1節の $\varphi_a$ は $T$ 上で実かつ滑らか、$i\partial\bar\partial\varphi_a$ は実 $(1,1)$ 形式である。係数を直接計算すると $1-a\cos2\pi x$ で、その最小値は $1-|a|$。従って $\varphi_a\in\mathcal H_{\omega_0}$ と $|a|<1$ は同値である。$|a|=1$ は非負値ではあるが、**正値ではない**ため含まれない。
<!-- definition-example-end -->

### 凸性と開性を区別する

ここでいう「開」は滑らかな関数の集合に $C^2$ ノルム（関数・一階・二階微分の一様ノルム）を入れたときの開性であり、正値性が小さな二階微分の変化で保たれるという意味である。「凸」は、二つの許容関数を直線的に補間しても正値性を失わないという別の性質である。

<a id="prop-yau1-03-domain"></a>

<!-- formal-statement-start -->
> **命題（許容領域の凸性・開性と類の不変性）**
>
> $X$ を境界のないコンパクトKähler多様体、$\omega$ をKähler形式とする。集合 $\mathcal H_\omega$ は空でなく、実定数の加算で不変、凸であり、$C^\infty(X;\mathbb R)$ の $C^2$ 位相で開いている。任意の $\varphi\in\mathcal H_\omega$ について $\omega_\varphi$ は $\omega$ と同じde Rham類のKähler形式である。
<!-- formal-statement-end -->

### 証明の見取り図

正値Hermite行列の集合は凸である。コンパクト性は、ある許容関数を固定したとき固有値の正の下限を一様に取るために使う。類の不変性は、$\partial\bar\partial\varphi$ が完全形式であることから従う。

<!-- proof-start -->
### 証明

$\omega_0=\omega>0$ だから $0\in\mathcal H_\omega$。定数 $c$ には $\partial\bar\partial c=0$ なので $\omega_{\varphi+c}=\omega_\varphi$ である。

$\varphi_0,\varphi_1\in\mathcal H_\omega$ と $0\le t\le1$ に対し、微分の線形性から

$$
\omega_{(1-t)\varphi_0+t\varphi_1}
=(1-t)\omega_{\varphi_0}+t\omega_{\varphi_1}.
$$

右辺を任意の非零 $(1,0)$ 接ベクトル $v$ で評価し、$-i$ を掛けると、$-i\,\omega_{\varphi_0}(v,\bar v)$ と $-i\,\omega_{\varphi_1}(v,\bar v)$ という二つの正の実数を非負の重み $1-t,t$ で足した値になる。従って凸性が従う。

次に $\varphi\in\mathcal H_\omega$ を固定する。$\omega$ で測った $\omega_\varphi$ の最小固有値は $X$ 上の連続な正関数であり、コンパクト性からある $m>0$ に対して全点で $\omega_\varphi\ge m\omega$ となる。ある定数 $C>0$ を座標被覆・固定計量 $\omega$ に応じて選べば、任意の滑らかな実関数 $\psi$ で

$$
|-i\,(i\partial\bar\partial\psi)(v,\bar v)|
\le C\|\psi\|_{C^2}[-i\,\omega(v,\bar v)]
$$

がすべての $v$ に対して成立する。これは有限個の座標近傍で二階成分を評価し、コンパクトな被覆を取ることで得られる。$C\|\psi\|_{C^2}<m$ なら、任意の非零 $(1,0)$ 接ベクトル $v$ に対して

$$
-i\,\omega_{\varphi+\psi}(v,\bar v)
\ge(m-C\|\psi\|_{C^2})[-i\,\omega(v,\bar v)]>0
$$

であり、$C^2$ 開性が示された。

最後に $d=\partial+\bar\partial$、$\partial\bar\partial+\bar\partial\partial=0$ なので、実1形式 $\theta=\frac i2(\bar\partial\varphi-\partial\varphi)$ は

$$
d\theta=\frac i2(\partial\bar\partial\varphi-\bar\partial\partial\varphi)
=i\partial\bar\partial\varphi.
$$

ゆえに $\omega_\varphi-\omega=d\theta$ は実完全形式である。[大域ポテンシャルによる類の不変性](../../KAH/KAH1-13/index.md#prop-kah1-13-global-potential-exact)とも一致し、$[\omega_\varphi]=[\omega]$。また $d\omega_\varphi=0$ は $d\omega=0$ と $d^2\theta=0$ から、正値性は定義から従う。$\square$
<!-- proof-end -->

ここで得た開性の半径は**固定した** $\varphi$ に依存する。正値領域全体に共通の固有値下限があるという意味ではない。第1節の $\varphi_a$ では $a\to1^-$ とすると最小固有値 $1-a\to0$ になる。

## 3. 複素Monge–Ampère作用素を行列式で読む

局所的な正値行列の体積は行列式で測れる。$G_\varphi=G+\Phi$ と書けば、最高次外積で現れる共通の座標体積要素と $n!$ が相殺されるため

$$
\frac{\omega_\varphi^n}{\omega^n}
=\frac{\det(G+\Phi)}{\det G}
=\det(I+G^{-1}\Phi)>0.
$$

最後の $G^{-1}\Phi$ は一般にはHermite行列ではないが、$G^{-1/2}\Phi G^{-1/2}$ と相似で固有値は実である。$\det(I+G^{-1}\Phi)=\prod_{j=1}^n(1+\lambda_j)$ となるのはこのためである。比は正則座標を取り替えたときの同じJacobi因子が分子と分母から消えるので大域的な正関数である。これは[既習の体積比とRicci差](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)で使った比と同じものだ。

体積方程式は右辺が指数関数なので、正値領域の内部では両辺の対数を取れる。こうして非線形な最高次外積を、実数値関数を返す作用素として扱う。

<a id="def-yau1-03-log-ma"></a>

<!-- formal-statement-start -->
> **定義（対数複素Monge–Ampère作用素）**
>
> $X$ を境界のないコンパクトKähler多様体（複素次元 $n\ge1$）、$\omega$ をKähler形式とする。許容領域 $\mathcal H_\omega$ 上で、実関数値作用素 $\mathcal M_\omega$ を

$$
\mathcal M_\omega(\varphi)
:=\log\frac{\omega_\varphi^n}{\omega^n}
=\log\det(G+\Phi)-\log\det G
$$

> と定める。右端は任意の正則座標での表式である。滑らかな実関数 $F$ を与えた複素Monge–Ampère方程式とは、$\varphi\in\mathcal H_\omega$ に対して $\mathcal M_\omega(\varphi)=F$ を要求する方程式である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-03-log-ma -->
**定義の確認**（楕円曲線）。$|a|<1$ の $\varphi_a$ では $G=1$、$\Phi=-a\cos2\pi x$ と計算済みだから、$G+\Phi>0$ と実数対数の定義域を満たす。従って

$$
\mathcal M_{\omega_0}(\varphi_a)=\log(1-a\cos2\pi x).
$$

これは $T$ 上の滑らかな実関数で、$\exp\mathcal M_{\omega_0}(\varphi_a)\,\omega_0=\omega_{\varphi_a}$ を満たす。$a=1$ では $x=0$ に零が現れ、対数が定義できない。
<!-- definition-example-end -->

### 二次元では行列式だけを見てはいけない

$\mathbb C^2$ の開集合で $\omega_0=i\sum_{j=1}^2dz^j\wedge d\bar z^j$ とし、実関数

$$
\varphi=|z^1|^2+2|z^2|^2
+c z^1\bar z^2+\bar c\,z^2\bar z^1
$$

を考える（$c\in\mathbb C$）。二階微分で各係数がどう生じるかを確認すると

$$
G_\varphi=
\begin{pmatrix}2&c\\\bar c&3\end{pmatrix},
\qquad\det G_\varphi=6-|c|^2.
$$

任意の $(1,0)$ 接ベクトル $v=v^1\partial_1+v^2\partial_2$ について、形式の定義に従う二次形式を平方完成すると

$$
-i\,\omega_\varphi(v,\bar v)
=\sum_{j,k}(G_\varphi)_{j\bar k}v^j\overline{v^k}
=2\left|v^1+\frac{\bar c}{2}v^2\right|^2
+\left(3-\frac{|c|^2}{2}\right)|v^2|^2.
$$

従って $G_\varphi>0$ と $|c|^2<6$ は同値である。例えば $c=1$ なら行列式比は $5$、$\mathcal M_{\omega_0}(\varphi)=\log5$ である。ただしこの $\varphi$ は局所例であり、コンパクトなトーラス上の大域周期関数だと主張していない。

## 4. 線形化：非線形作用素の一次変化

方程式を解くためには、許容な $\varphi$ のまわりで小さな実関数 $\psi$ を足したとき、$\mathcal M_\omega$ がどれだけ動くかを知りたい。正値領域が開いているので、固定した $\varphi,\psi$ に対し十分小さな $|t|$ では $\varphi+t\psi$ は許容のままである。

ここで $t$ は実パラメータ、$\psi_{j\bar k}=\partial_j\partial_{\bar k}\psi$ とし、$G_\varphi=(g_{j\bar k}+\varphi_{j\bar k})$ と置く。縮約に使う逆係数 $g_\varphi^{j\bar k}$ は $\sum_k g_\varphi^{j\bar k}(g_\varphi)_{\ell\bar k}=\delta^j_\ell$ で定める。添字を通常の行列の行・列へ並べると $(g_\varphi^{j\bar k})=(G_\varphi^{-1})^{\mathsf T}$ であり、$\sum_{j,k}g_\varphi^{j\bar k}\psi_{j\bar k}=\operatorname{tr}(G_\varphi^{-1}\Psi)$（$\Psi=(\psi_{j\bar k})$）となる。**複素Laplacian** はこの縮約であるが、[前章で定めた実Laplacian](../YAU1-02/index.md#prop-yau1-02-real-potential)は $\Delta_{\omega_\varphi}=2\sum g_\varphi^{j\bar k}\partial_j\partial_{\bar k}$ である。両者の係数2を混同しない。

<a id="prop-yau1-03-linearization"></a>

<!-- formal-statement-start -->
> **命題（Monge–Ampère作用素の線形化と外積表示）**
>
> $X$ を境界のないコンパクトKähler多様体、$\omega$ をKähler形式、$\varphi\in\mathcal H_\omega$、$\psi\in C^\infty(X;\mathbb R)$ とする。$\mathcal M_\omega$ の $\varphi$ での方向 $\psi$ の微分は

$$
D\mathcal M_\omega|_\varphi(\psi)
=\left.\frac d{dt}\right|_{t=0}\mathcal M_\omega(\varphi+t\psi)
=\sum_{j,k}g_\varphi^{j\bar k}\psi_{j\bar k}
=\frac12\Delta_{\omega_\varphi}\psi.
$$

> さらに、任意の十分小さな $t$ に対して最高次外積の変化は

$$
\frac d{dt}\omega_{\varphi+t\psi}^n
=n\,i\partial\bar\partial\psi\wedge\omega_{\varphi+t\psi}^{n-1}
$$

> であり、二つの式は同じ線形化を表す。
<!-- formal-statement-end -->

### 証明の見取り図

局所行列式を微分するには[Jacobiの行列式微分公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)を使う。外積の側では積の微分により $n$ 個の等しい項が現れ、正規直交基底で対角成分を集めると同じ跡になる。

<!-- proof-start -->
### 証明

$A(t):=G_\varphi+t\Psi$、$\Psi=(\psi_{j\bar k})$ と置く。正値性の開性から $A(t)>0$ は $|t|$ が小さい間保たれる。従って微分可能な行列式の対数について、[Jacobiの公式](../../KAH/KAH1-11/index.md#lem-kah1-11-jacobi)を $A'(t)=\Psi$ に適用すると

$$
\frac d{dt}\log\det A(t)
=\frac{\det A(t)\operatorname{tr}(A(t)^{-1}\Psi)}{\det A(t)}
=\operatorname{tr}(A(t)^{-1}\Psi).
$$

$\log\det G$ は $t$ に依存しないため、$t=0$ で

$$
D\mathcal M_\omega|_\varphi(\psi)
=\operatorname{tr}(G_\varphi^{-1}\Psi)
=\sum_{j,k}g_\varphi^{j\bar k}\psi_{j\bar k}.
$$

前述の逆係数の添字規約により、最右辺は座標によらない跡である。前章と同じ実Laplacian規約 $\Delta_{\omega_\varphi}\psi=2\sum g_\varphi^{j\bar k}\psi_{j\bar k}$ を代入すると係数 $1/2$ が得られる。

外積については $\omega_{\varphi+t\psi}=\omega_\varphi+t\,i\partial\bar\partial\psi$ だから、二形式は偶数次数で可換であり、積の微分は

$$
\frac d{dt}\omega_{\varphi+t\psi}^n
=\sum_{r=1}^n\omega_{\varphi+t\psi}^{r-1}
\wedge i\partial\bar\partial\psi
\wedge\omega_{\varphi+t\psi}^{n-r}
=n\,i\partial\bar\partial\psi\wedge\omega_{\varphi+t\psi}^{n-1}.
$$

その点で $\omega_{\varphi+t\psi}$ を正規直交化して係数行列を単位行列にすれば、$n\,i\partial\bar\partial\psi\wedge\omega_{\varphi+t\psi}^{n-1}$ の最高次体積に対する比は $\sum_j\psi_{j\bar j}$ である。非対角項は同じ添字の微分形式を重複させて零になる。一般の基底へ戻すとこの比は $\operatorname{tr}(G_{\varphi+t\psi}^{-1}\Psi)$ になる。正値体積で割る微分の公式

$$
\frac d{dt}\log\frac{\omega_{\varphi+t\psi}^n}{\omega^n}
=\frac{(d/dt)\omega_{\varphi+t\psi}^n}{\omega_{\varphi+t\psi}^n}
$$

から、外積側でも同じ式が得られる。$\square$
<!-- proof-end -->

**直接検算。** 第1節の楕円曲線で $\varphi=\varphi_a$、$\psi=\cos(2\pi x)/\pi^2$ とする。$\varphi_a+t\psi=\varphi_{a+t}$ なので左辺を $a$ で微分すると

$$
\frac d{da}\log(1-a\cos2\pi x)
=-\frac{\cos2\pi x}{1-a\cos2\pi x}.
$$

右辺の複素Laplacianも $\psi_{z\bar z}=-\cos2\pi x$、$g_\varphi^{z\bar z}=1/(1-a\cos2\pi x)$ なので完全に一致する。実Laplacianをそのまま使うと二倍になってしまう。

## 5. なぜ楕円型で、なぜ凹なのか

線形化の最高階の係数は $G_\varphi^{-1}$ である。正値Hermite行列の逆行列も正値だから、二階微分を取るどの実方向にも正の係数が付く。これが**楕円性**であり、値が滑らかに変わる解を解析的に扱える理由になる。一方、$\log\det$ は正値行列の直線に沿って下向きに曲がる。これが**凹性**である。

<a id="prop-yau1-03-ellipticity"></a>

<!-- formal-statement-start -->
> **命題（正値領域での楕円性と凹性）**
>
> $X$ を境界のないコンパクトKähler多様体、$\omega$ をKähler形式とする。任意の $\varphi\in\mathcal H_\omega$ に対して線形作用素 $L_\varphi=D\mathcal M_\omega|_\varphi$ は二階楕円型であり、固定した $\varphi$ についてコンパクトな $X$ 上で一様楕円型である。また任意の $\psi\in C^\infty(X;\mathbb R)$ について許容区間内で

$$
\left.\frac{d^2}{dt^2}\right|_{t=0}
\mathcal M_\omega(\varphi+t\psi)
=-\operatorname{tr}(G_\varphi^{-1}\Psi G_\varphi^{-1}\Psi)\le0.
$$

> 従って $\mathcal M_\omega$ は凸な許容領域 $\mathcal H_\omega$ 上で各点ごとに凹である。ここで $\Psi=(\psi_{j\bar k})$ であり、行列表式は任意の正則座標で解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

楕円性は正値Hermite行列の対角化から実座標で確認する。凹性は逆行列の微分 $\frac d{dt}A^{-1}=-A^{-1}A'A^{-1}$ をJacobiの公式に代入し、正値行列の平方根を使って二乗和へ直す。

<!-- proof-start -->
### 証明

任意の点 $p$ で $G_\varphi(p)$ を正則な線形座標変換によって対角正値行列 $\operatorname{diag}(\mu_1,\dots,\mu_n)$ にする（$\mu_j>0$）。そこで $L_\varphi$ の最高階部分は

$$
L_\varphi\psi
=\sum_j\mu_j^{-1}\partial_j\partial_{\bar j}\psi
=\frac14\sum_j\mu_j^{-1}
(\partial_{x^j}^2+\partial_{y^j}^2)\psi.
$$

実共変数 $\xi=(\xi_{x^1},\xi_{y^1},\dots)$ が零でなければ、二階部分の正符号での主記号は

$$
\sigma_{L_\varphi}(\xi)
=\frac14\sum_j\mu_j^{-1}
(\xi_{x^j}^2+\xi_{y^j}^2)>0.
$$

従って楕円型である（Fourier変換の $\partial\mapsto i\xi$ 規約では主記号全体に負号が付くが、非退化性は同じ）。固定した $\varphi$ では、$G_\varphi$ の相対固有値はコンパクトな $X$ 上で正の下限と有限な上限を持つ。有限座標被覆上で上式の係数を共通定数で挟めるので一様楕円型となる。$\varphi$ を正値領域の境界へ動かすと、これらの定数を一様に選べるとは限らない。

次に $A(t)=G_\varphi+t\Psi$ と置く。$A(t)^{-1}A(t)=I$ を微分し、左から $A(t)^{-1}$ を掛ければ

$$
\frac d{dt}A(t)^{-1}=-A(t)^{-1}\Psi A(t)^{-1}.
$$

前の[線形化命題](#prop-yau1-03-linearization)を再び微分すると

$$
\frac{d^2}{dt^2}\log\det A(t)
=-\operatorname{tr}(A(t)^{-1}\Psi A(t)^{-1}\Psi).
$$

$t=0$ で $B:=G_\varphi^{-1/2}\Psi G_\varphi^{-1/2}$ と置けば $B$ はHermite行列であり、跡の循環性から

$$
\operatorname{tr}(G_\varphi^{-1}\Psi G_\varphi^{-1}\Psi)
=\operatorname{tr}(B^2)
=\sum_{j,k}|B_{j\bar k}|^2\ge0.
$$

従って二階変分は非正。任意の $\varphi_0,\varphi_1\in\mathcal H_\omega$ の線分は[凸性](#prop-yau1-03-domain)により許容なので、その線分に沿った二階微分が非正であることから点ごとの凹性が従う。$\square$
<!-- proof-end -->

この凹性は $F$ に依存しない作用素側の性質である。さらに $\Psi=0$ なら二階変分は零なので、例えば定数方向では厳密な凹性ではない。**楕円性があるから直ちに解が存在する**わけでもない。大域的な解の構成と一様事前評価はこれからの課題である。

## 6. 体積条件と定数のゲージ

$\omega_\varphi$ と $\omega$ が同じKähler類に属する以上、コンパクト境界なしの $X$ 上では体積が等しい。これは $F$ に制約を与える。また $\varphi$ に定数を足しても二階微分は変わらないので、方程式はポテンシャルの定数部分を見ない。

<a id="prop-yau1-03-compatibility"></a>

<!-- formal-statement-start -->
> **命題（体積整合条件と定数ゲージ）**
>
> $X$ を境界のないコンパクト連結Kähler多様体、$\omega$ をKähler形式、$F\in C^\infty(X;\mathbb R)$ とする。$\varphi\in\mathcal H_\omega$ が $\mathcal M_\omega(\varphi)=F$ を満たすなら、必ず

$$
\int_Xe^F\omega^n=\int_X\omega^n=:V.
$$

> また任意の実定数 $c$ に対して $\mathcal M_\omega(\varphi+c)=\mathcal M_\omega(\varphi)$、$L_\varphi(c)=0$ が成り立つ。この体積整合条件は必要条件であって、本命題だけで解の存在を結論するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

体積差を $\omega_\varphi-\omega$ で因数分解し、完全形式として積分する。定数方向では複素二階微分が零となる。

<!-- proof-start -->
### 証明

二形式は可換なので $A^n-B^n=(A-B)\sum_{r=0}^{n-1}A^rB^{n-1-r}$ を $A=\omega_\varphi$、$B=\omega$ に適用する。$S:=\sum_{r=0}^{n-1}\omega_\varphi^r\wedge\omega^{n-1-r}$ は両Kähler形式が閉じるため $dS=0$ であり、前の[類の不変性](#prop-yau1-03-domain)で構成した実1形式 $\theta$ について

$$
\omega_\varphi^n-\omega^n
=d\theta\wedge S=d(\theta\wedge S).
$$

境界のないコンパクト多様体の[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)から

$$
\int_X\omega_\varphi^n-\int_X\omega^n
=\int_Xd(\theta\wedge S)=0.
$$

$\mathcal M_\omega(\varphi)=F$ を指数化すると $\omega_\varphi^n=e^F\omega^n$ なので、代入して体積整合条件を得る。最後に $\partial\bar\partial c=0$ より $\omega_{\varphi+c}=\omega_\varphi$、従って $\mathcal M_\omega(\varphi+c)=\mathcal M_\omega(\varphi)$。線形化公式に $\psi=c$ を代入しても $L_\varphi(c)=\frac12\Delta_{\omega_\varphi}c=0$ となる。$\square$
<!-- proof-end -->

例えば $F\equiv\log2$ なら右辺の積分は $2V\ne V$ だから解はない。一方、$\varphi=0$ と $F=0$ は整合条件を満たし、実際の解を一つ与える。前章の実Ricciポテンシャル $u$ に対して $F=C-u$ と置けば、[既習の指定Ricci形式と体積方程式の同値性](../../CYG/CYG1-10/index.md#prop-cyg1-10-monge-ampere-reduction)の正規化計算によって $e^C\int_Xe^{-u}\omega^n=V$ となる。ここでも正規化と正値解の存在は別問題である。

## 7. 正値性を外すと何が壊れるか

- **行列式が正でも足りない。** $\mathbb C^3$ の標準基準計量の局所二階係数を $G_\varphi=\operatorname{diag}(-1,-1,1)$ にすると $\det G_\varphi=1>0$ だが、形式は正値ではない。例えば $\varphi=-2|z^1|^2-2|z^2|^2$ でこの行列が得られる。逆行列の二階作用素は $-\partial_1\partial_{\bar1}-\partial_2\partial_{\bar2}+\partial_3\partial_{\bar3}$ となり、正の楕円型主記号ではなく、非零の実方向で主記号が零にもなる。積の符号だけでは必要な条件を復元できない。
- **境界で退化する。** 楕円曲線の $\varphi_1$ は $x=0$ で $1-\cos2\pi x=0$。行列式の対数と逆行列が定義できず、線形化公式をそこへ延長できない。$a\to1^-$ では逆係数 $1/(1-a\cos2\pi x)$ が一様には有界でなくなる。
- **コンパクト性を外す。** $\mathbb C$ 上で $\omega_0=i\,dz\wedge d\bar z$、$\varphi=-|z|^2/2$ とすると $\omega_\varphi=\omega_0/2>0$ で局所的な楕円性は保たれるが、$\int_{\mathbb C}\omega_0=\infty$。体積整合条件を有限な等式として用いる証明は止まる。
- **正値性だけでは体積指定を満たさない。** $\varphi\in\mathcal H_\omega$ であっても任意の外部データ $F$ に対して $\mathcal M_\omega(\varphi)=F$ とは限らない。与えた $F$ を実現する許容関数を見つけることが、まだ残る非線形の問題である。

## 8. 演習：正値領域から線形化まで

<a id="ex-yau1-03-a01"></a>
#### YAU1-03-A01 正値領域の境界
- Level: A

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$\varphi_a=(a/\pi^2)\cos(2\pi x)$ とする。$\omega_{\varphi_a}$ を計算し、$\varphi_a\in\mathcal H_{\omega_0}$ となる $a\in\mathbb R$ の範囲を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ であり $\varphi_a$ は $y$ に依存しないので、

$$
\partial_z\partial_{\bar z}\varphi_a
=\frac14\frac{a}{\pi^2}(-4\pi^2)\cos2\pi x
=-a\cos2\pi x.
$$

従って $\omega_{\varphi_a}=(1-a\cos2\pi x)\omega_0$。係数の最小値は $1-|a|$ で、全点で厳密に正なのは $|a|<1$。$|a|=1$ は係数零の点があるため許容されない。
<!-- solution-end -->

<a id="ex-yau1-03-a02"></a>
#### YAU1-03-A02 二次元の正値行列
- Level: A

$\omega_0=i(dz^1\wedge d\bar z^1+dz^2\wedge d\bar z^2)$ とし、局所的に $\varphi=a|z^1|^2+b|z^2|^2$（$a,b\in\mathbb R$）とする。$G_\varphi$、正値条件、体積比を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_j\partial_{\bar k}|z^\ell|^2=\delta_{j\ell}\delta_{k\ell}$ から $\Phi=\operatorname{diag}(a,b)$、$G_\varphi=\operatorname{diag}(1+a,1+b)$。任意の複素ベクトルの値は $(1+a)|v_1|^2+(1+b)|v_2|^2$ なので、正値条件は $1+a>0$ かつ $1+b>0$。この範囲で $\det G_\varphi/\det G=(1+a)(1+b)$ となる。
<!-- solution-end -->

<a id="ex-yau1-03-a03"></a>
#### YAU1-03-A03 対数方程式への変換
- Level: A

$\varphi\in\mathcal H_\omega$、$F\in C^\infty(X;\mathbb R)$ とする。$\omega_\varphi^n=e^F\omega^n$ と $\mathcal M_\omega(\varphi)=F$ が同値であることを示し、正値性を仮定しない場合に何が困るか説明せよ。

<!-- solution-start -->
**詳細解答。** $\omega_\varphi$ と $\omega$ は正値なので、その最高次外積の比 $R=\omega_\varphi^n/\omega^n$ は滑らかな正関数である。体積方程式は $R=e^F$、両辺の実対数を取れば $\log R=F$。逆に指数を取れば元に戻る。正値性がなければ比は零や負になり得て実対数が定義できず、さらに形式がKähler計量を表すとも限らない。
<!-- solution-end -->

<a id="ex-yau1-03-a04"></a>
#### YAU1-03-A04 二つのLaplacian規約
- Level: A

複素次元1で $G_\varphi=(h)$（$h>0$）、$\psi(x,y)=x^2+y^2$ とする。$D\mathcal M_\omega|_\varphi(\psi)$ と $\Delta_{\omega_\varphi}\psi$ を計算せよ。$\Delta_{\omega_\varphi}=2h^{-1}\partial_z\partial_{\bar z}$ とする。

<!-- solution-start -->
**詳細解答。** $\partial_z\partial_{\bar z}\psi=\frac14(2+2)=1$。線形化は $h^{-1}\psi_{z\bar z}=1/h$、実Laplacianは $2h^{-1}\psi_{z\bar z}=2/h$。従って $D\mathcal M_\omega|_\varphi(\psi)=\Delta_{\omega_\varphi}\psi/2$ である。
<!-- solution-end -->

<a id="ex-yau1-03-a05"></a>
#### YAU1-03-A05 定数方向と体積
- Level: A

境界のないコンパクトKähler多様体で $\varphi\in\mathcal H_\omega$ とし、$c\in\mathbb R$ を定数とする。$\mathcal M_\omega(\varphi+c)$ と $L_\varphi(c)$ を求めよ。また $F\equiv\log3$ を右辺とする方程式に解がない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $\partial\bar\partial c=0$ だから $\omega_{\varphi+c}=\omega_\varphi$。従って $\mathcal M_\omega(\varphi+c)=\mathcal M_\omega(\varphi)$、$L_\varphi(c)=\frac12\Delta_{\omega_\varphi}c=0$。$F\equiv\log3$ なら $\int_Xe^F\omega^n=3V$、しかし同じKähler類の $\omega_\varphi$ はStokesにより体積 $V>0$ を持つ。$3V=V$ は矛盾である。
<!-- solution-end -->

<a id="ex-yau1-03-b01"></a>
#### YAU1-03-B01 行列式の微分と非対角成分
- Level: B

$\mathbb C^2$ の標準基準計量で、実二階係数を持つ局所ポテンシャルから

$$
G_\varphi=\begin{pmatrix}2&c\\\bar c&3\end{pmatrix},
\qquad |c|^2<6
$$

を得たとする。$\psi=|z^1|^2$ 方向の $D\mathcal M_\omega|_\varphi(\psi)$ を、行列式の直接微分と逆行列の跡から別々に計算せよ。

<!-- solution-start -->
**詳細解答。** $\psi_{j\bar k}=\operatorname{diag}(1,0)$ なので $G_{\varphi+t\psi}=\begin{pmatrix}2+t&c\\\bar c&3\end{pmatrix}$。行列式は $6+3t-|c|^2>0$（$t$ が小さい範囲）であり、

$$
\left.\frac d{dt}\right|_0\log(6+3t-|c|^2)
=\frac3{6-|c|^2}.
$$

一方、逆行列は

$$
G_\varphi^{-1}=\frac1{6-|c|^2}
\begin{pmatrix}3&-c\\-\bar c&2\end{pmatrix}.
$$

$\Psi$ を掛けて跡を取れば第一対角成分だけが残り、$\operatorname{tr}(G_\varphi^{-1}\Psi)=3/(6-|c|^2)$。一致する。
<!-- solution-end -->

<a id="ex-yau1-03-b02"></a>
#### YAU1-03-B02 凹性を二変数で検算
- Level: B

点で $G_\varphi=\operatorname{diag}(p,q)$（$p,q>0$）、$\Psi=\begin{pmatrix}u&w\\\bar w&v\end{pmatrix}$（$u,v\in\mathbb R$）とする。$t=0$ での $\log\det(G_\varphi+t\Psi)$ の二階微分を求め、非正であることを示せ。

<!-- solution-start -->
**詳細解答。** 行列式は

$$
D(t)=(p+tu)(q+tv)-t^2|w|^2
=pq+t(pv+qu)+t^2(uv-|w|^2).
$$

従って $D(0)=pq$、$D'(0)=pv+qu$、$D''(0)=2(uv-|w|^2)$。対数の二階微分は

$$
\frac{D''(0)}{D(0)}-\left(\frac{D'(0)}{D(0)}\right)^2
=\frac{2(uv-|w|^2)}{pq}
-\left(\frac up+\frac vq\right)^2
=-\frac{u^2}{p^2}-\frac{v^2}{q^2}-\frac{2|w|^2}{pq}\le0.
$$

非対角の $w$ も負の二乗項を与え、凹性が見える。
<!-- solution-end -->

<a id="ex-yau1-03-b03"></a>
#### YAU1-03-B03 線分に沿った差の積分
- Level: B

$\varphi_0,\varphi_1\in\mathcal H_\omega$、$h=\varphi_1-\varphi_0$、$\varphi_t=\varphi_0+th$ とする。$\mathcal M_\omega(\varphi_1)-\mathcal M_\omega(\varphi_0)$ を $0\le t\le1$ のLaplacianの積分として表せ。なぜ途中で作用素が未定義にならないか示せ。

<!-- solution-start -->
**詳細解答。** [正値領域の凸性](#prop-yau1-03-domain)から $\omega_{\varphi_t}=(1-t)\omega_{\varphi_0}+t\omega_{\varphi_1}>0$ であり、全区間で作用素が定義される。[線形化命題](#prop-yau1-03-linearization)の $\varphi$ を $\varphi_t$、方向 $\psi$ を $h$ とする。点 $x\in X$ を固定して $f_x(t)=\mathcal M_\omega(\varphi_t)(x)$ と置くと、その微分は

$$
f_x'(t)=D\mathcal M_\omega|_{\varphi_t}(h)(x)
=\frac12\Delta_{\omega_{\varphi_t}}h(x).
$$

この $f_x$ は $[0,1]$ 上で滑らかだから、[微積分学の基本定理II](../../../基礎科目/RA/RA4/index.md#thm-ra4-ftc2)を $a=0,b=1$ で適用し、$f_x(1)-f_x(0)=\int_0^1f_x'(t)\,dt$ を代入すると

$$
\mathcal M_\omega(\varphi_1)-\mathcal M_\omega(\varphi_0)
=\int_0^1\frac12\Delta_{\omega_{\varphi_t}}h\,dt.
$$

この式は二解の差を調べる出発点になるが、これだけで一意性は主張していない。
<!-- solution-end -->

<a id="ex-yau1-03-b04"></a>
#### YAU1-03-B04 体積保存の微分形
- Level: B

$X$ を境界のないコンパクトKähler多様体、$\varphi\in\mathcal H_\omega$、$\psi\in C^\infty(X;\mathbb R)$ とする。$t$ が十分小さい範囲で $\int_X\omega_{\varphi+t\psi}^n$ が一定であることを、外積の微分公式とStokesから導け。

<!-- solution-start -->
**詳細解答。** 開性から十分小さな $t$ で $\omega_{\varphi+t\psi}$ はKähler形式。[前節で導いた外積変分](#prop-yau1-03-linearization)に $\varphi+t\psi$ を代入すると

$$
\frac d{dt}\int_X\omega_{\varphi+t\psi}^n
=n\int_X i\partial\bar\partial\psi\wedge\omega_{\varphi+t\psi}^{n-1}.
$$

固定されたコンパクト $X$ 上の滑らかな $t$ 依存形式なので積分と微分を交換できる。実1形式 $\theta_\psi=\frac i2(\bar\partial\psi-\partial\psi)$ に対し $d\theta_\psi=i\partial\bar\partial\psi$、また $d\omega_{\varphi+t\psi}=0$ だから

$$
i\partial\bar\partial\psi\wedge\omega_{\varphi+t\psi}^{n-1}
=d(\theta_\psi\wedge\omega_{\varphi+t\psi}^{n-1}).
$$

[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分は零となり、体積は $t$ に依存しない。
<!-- solution-end -->

<a id="ex-yau1-03-c01"></a>
#### YAU1-03-C01 楕円曲線で解・線形化・体積を一括検算
- Level: C

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$\varphi_a=(a/\pi^2)\cos2\pi x$ とし、$|a|<1$ とする。

1. $F_a:=\log(1-a\cos2\pi x)$ に対する方程式の許容解が $\varphi_a$ であることを確認せよ。
2. $a$ を変化させたときの $\partial_aF_a$ と、方向 $\psi=\cos2\pi x/\pi^2$ における線形化が一致することを示せ。
3. $\int_Te^{F_a}\omega_0=\int_T\omega_0=2$ を直接積分で確かめ、$a\to1^-$ で一様楕円性に何が起こるか述べよ。

<!-- solution-start -->
**詳細解答。** $\varphi_a$ は周期的な滑らかな実関数で、$\partial_z\partial_{\bar z}\varphi_a=-a\cos2\pi x$。ゆえに $\omega_{\varphi_a}=(1-a\cos2\pi x)\omega_0$。$|a|<1$ から係数は少なくとも $1-|a|>0$、許容解である。複素次元1だから

$$
\mathcal M_{\omega_0}(\varphi_a)
=\log\frac{\omega_{\varphi_a}}{\omega_0}
=\log(1-a\cos2\pi x)=F_a.
$$

$\partial_aF_a=-\cos2\pi x/(1-a\cos2\pi x)$。他方 $\psi_{z\bar z}=-\cos2\pi x$ であり、逆行列の係数は $1/(1-a\cos2\pi x)$ なので

$$
L_{\varphi_a}\psi
=\frac{\psi_{z\bar z}}{1-a\cos2\pi x}
=-\frac{\cos2\pi x}{1-a\cos2\pi x}
=\partial_aF_a.
$$

$\omega_0=2dx\wedge dy$ で基本領域 $0\le x,y\le1$ を積分すると

$$
\int_Te^{F_a}\omega_0
=2\int_0^1\!\int_0^1(1-a\cos2\pi x)\,dy\,dx
=2(1-a[\sin2\pi x/(2\pi)]_0^1)=2.
$$

従って体積整合は満たす。$a\to1^-$ では $x=0$ で最小固有値 $1-a\to0$ となり、$L_{\varphi_a}$ の係数 $1/(1-a\cos2\pi x)$ が上に有界な一つの定数では抑えられない。各 $a<1$ での楕円性と、系列に共通する一様な楕円性は別である。
<!-- solution-end -->

<a id="ex-yau1-03-c02"></a>
#### YAU1-03-C02 正値行列の三つの判定を接続する
- Level: C

$\mathbb C^2$ の標準基準計量上の局所ポテンシャル

$$
\varphi_{s,c}=s|z^1|^2+2|z^2|^2
+c z^1\bar z^2+\bar c\,z^2\bar z^1,
\qquad s\in\mathbb R,\ c\in\mathbb C
$$

を考える。

1. 正値領域の条件を $s,c$ で求め、$\mathcal M_{\omega_0}(\varphi_{s,c})$ を表示せよ。
2. $s$ 方向の一階・二階変分を行列式から求め、線形化と凹性の公式と照合せよ。
3. 体積比が正でも許容でない具体例を挙げ、そこで証明のどの正値性の段階が失敗するかを述べよ。三問とも局所計算として扱い、コンパクト多様体上の大域解は主張しない。

<!-- solution-start -->
**詳細解答。** $\partial_j\partial_{\bar k}\varphi_{s,c}$ を取ると $G_{\varphi_{s,c}}=\begin{pmatrix}1+s&c\\\bar c&3\end{pmatrix}$。任意の $(1,0)$ 接ベクトル $v=v^1\partial_1+v^2\partial_2$ に対する正値性の判定式を平方完成すると

$$
-i\,\omega_{\varphi_{s,c}}(v,\bar v)
=\sum_{j,k}(G_{\varphi_{s,c}})_{j\bar k}v^j\overline{v^k}
=(1+s)\left|v^1+\frac{\bar c}{1+s}v^2\right|^2
+\left(3-\frac{|c|^2}{1+s}\right)|v^2|^2
$$

であり、これは $1+s>0$ の下での式である。ゆえに正値条件は $s>-1$ かつ $D:=3(1+s)-|c|^2>0$。この範囲では

$$
\mathcal M_{\omega_0}(\varphi_{s,c})=\log D,
\quad\partial_s\mathcal M=\frac3D,
\quad\partial_s^2\mathcal M=-\frac9{D^2}<0.
$$

$s$ 方向は $\psi=|z^1|^2$、$\Psi=\operatorname{diag}(1,0)$。逆行列は $D^{-1}\begin{pmatrix}3&-c\\-\bar c&1+s\end{pmatrix}$ なので $\operatorname{tr}(G^{-1}\Psi)=3/D$。二階変分の跡は $\operatorname{tr}(G^{-1}\Psi G^{-1}\Psi)=9/D^2$、符号を付ければ $-9/D^2$ と一致する。

例えば $s=-2,c=0$ なら $G=\operatorname{diag}(-1,3)$ で正値ではなく、体積比も負なので対数が定義できない。一方、**体積比が正でも許容でない**例は複素次元2で $G=\operatorname{diag}(-1,-1)$（$\varphi=-2|z^1|^2-2|z^2|^2$）であり、$\det G=1>0$ だが $v=(1,0)$ で $v^*Gv=-1<0$。正値Hermite行列の平方根・正値逆行列を使う楕円性の証明へ入力できない。後者は指定した $\varphi_{s,c}$ の部分族の例ではなく、同じ局所基準計量に対する別のポテンシャルである。
<!-- solution-end -->

## 9. 次章へ：正値な解が二つあったら

本章で得た基本構造は、許容領域 $\mathcal H_\omega$ の凸性、$\mathcal M_\omega=\log(\omega_\varphi^n/\omega^n)$ の線形化

$$
D\mathcal M_\omega|_\varphi=\frac12\Delta_{\omega_\varphi},
$$

および正値領域内での楕円性・凹性である。正規化された $F$ に対して解の存在を示すのは後の解析的議論だが、**もし二つの許容解があればその差はどうなるか**は、線分上の線形化と最大値原理から調べられる。次章ではこの一意性とゲージ固定を扱う。

### 参考文献

- [V. V. Datar, *Lecture Notes on Calabi’s Conjectures and Kähler–Einstein Metrics*](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf) — 対数行列式、線形化と連続性の方法。
- [Z. Błocki, *The Complex Monge–Ampère Equation on Compact Kähler Manifolds*](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf) — 正値領域、楕円性と凹性の解析的意味。
