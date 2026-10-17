# GA6 Hodge Laplacian・調和形式・de Rham

[GA4のスペクトル理論](../GA4/index.md#thm-ga4-spectral-basis)では、関数のLaplacianの零固有関数は連結なコンパクト多様体で定数だけでした。一方、穴のあいた空間には、局所的に微分の形をしていても大域的には原始関数を持たない微分形式があります。[GEO9のde Rhamコホモロジー](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)は、この「閉じているが完全ではない」差を測りました。そこで**微分形式にも非負のLaplacianを作り、その零固有空間が穴の情報を運ぶか**を問います。

到達順序は、**計量から形式の内積を作る → 外微分の随伴を作る → 微分形式のLaplacianを作る → 楕円型評価とスペクトル分解 → 調和・完全・余完全への直交分解 → de Rhamとの同型**です。関数の場合の固有関数展開を引用するだけでは、形式の作用素が楕円型かどうかも、その核が有限次元かどうかも分かりません。必要な橋渡しを本章で証明します。

以下、特に断らない限り $(M,g)$ は**滑らか・連結・向き付けられた・コンパクト・境界なし**の $n$ 次元Riemann多様体（$n\ge1$）です。実数値の滑らかな $k$ 次[微分形式](../../GEO/GEO7/index.md#def-geo7-differential-form)全体を $\Omega^k(M)$ とし、$0\le k\le n$ とします。[外微分](../../GEO/GEO7/index.md#def-geo7-exterior-derivative)を $d:\Omega^k\to\Omega^{k+1}$ と書きます。$k<0$ または $k>n$ の形式は $0$ と約束します。計量の[体積形式](../../GEO/GEO12/index.md#def-geo12-volume)は $dV_g$、実数値 $L^2$ 内積は $(\cdot,\cdot)_2$ とします。

## 1. 外微分を内積の側から逆向きにする

外微分は次数を $1$ 上げます。直交分解を考えるには、次数を $1$ 下げる演算も要ります。まず各接空間の内積が外積空間 $\Lambda^kT_x^*M$ に誘導する内積を使います。向きに整合した正規直交余標構 $(e^1,\ldots,e^n)$ を選ぶと、添字が昇順の $e^{i_1}\wedge\cdots\wedge e^{i_k}$ はこの内積の正規直交基底です。

ある $k$ 形式に残りの $(n-k)$ 個の余標構を符号付きで補い、体積形式にする演算が必要です。これは[外積の交代性](../../GEO/GEO7/index.md#prop-geo7-wedge-laws)と向き、計量の三者から決まります。

<a id="def-ga6-hodge-star"></a>

<!-- formal-statement-start -->
> **定義（Hodge星作用素）**  
> 向き付けられた $n$ 次元Riemann多様体 $(M,g)$ の各 $x\in M$ で、$\alpha,\beta\in\Lambda^kT_x^*M$ に対し
>
$$
\alpha\wedge(*\beta)=\langle\alpha,\beta\rangle_g\,dV_g
$$
>
> を満たす線形写像 $*:\Lambda^kT_x^*M\to\Lambda^{n-k}T_x^*M$ を **Hodge星作用素** と呼ぶ。これを点ごとに適用して形式の演算 $*:\Omega^k(M)\to\Omega^{n-k}(M)$ を得る。
<!-- formal-statement-end -->

実際、上の正規直交基底 $e^I$ に対して $*e^I=\varepsilon(I,I^c)e^{I^c}$ と置けば定義式が成立します。$\varepsilon(I,I^c)$ は $e^I\wedge e^{I^c}=\varepsilon(I,I^c)dV_g$ の符号です。$e^J\wedge*e^I$ は $J=I$ のときだけ体積形式になるので、一意性も従います。補集合を二度取って順序を戻すと

$$
*(*\alpha)=(-1)^{k(n-k)}\alpha.
$$

<!-- definition-example-start: def-ga6-hodge-star -->
**定義の確認**（平坦二次元トーラス）：$\mathbb T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ に計量 $dx^2+dy^2$ と向き $dx\wedge dy$ を入れます。$\langle dx,dx\rangle=\langle dy,dy\rangle=1$、$\langle dx,dy\rangle=0$ で、$dx\wedge dy=dV_g$ です。したがって $*dx=dy$、$*dy=-dx$、$*1=dx\wedge dy$、$*(dx\wedge dy)=1$ です。具体的には $dy\wedge*dy=dy\wedge(-dx)=dV_g$、$dx\wedge*dy=dx\wedge(-dx)=0$ です。各基底で内積・向き・符号の三条件を検証でき、$*^2=-1$ が1形式で成立します。
<!-- definition-example-end -->

積分した形式の内積は

$$
(\alpha,\beta)_2=\int_M\alpha\wedge*\beta.
$$

$M$ に境界がないので、[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により $\int_Md\eta=0$（$\eta\in\Omega^{n-1}$）。この事実から、外微分 $d$ の $L^2$ 随伴に相当する演算を求めます。随伴は、$\alpha$ に外微分をかけてから内積を取ることと、相手に別の演算をかけてから内積を取ることが等しい、という関係で定めます。

<a id="def-ga6-codifferential"></a>

<!-- formal-statement-start -->
> **定義（余微分）**  
> $k$ 形式（$1\le k\le n$）に作用する **余微分** $\delta:\Omega^k(M)\to\Omega^{k-1}(M)$ を
>
$$
\delta=(-1)^{n(k+1)+1}*d*
$$
>
> と定める。$0$ 形式に対しては $\delta=0$ とする。これは外微分の**形式的随伴**である。
<!-- formal-statement-end -->

「形式的」と付けるのは、今は滑らかな形式について積分公式を述べているだけで、$L^2$ 全体で演算ができるかという作用素の定義域まで指定していないからです。後で弱形式から閉じた $L^2$ 作用素を構成します。

<a id="prop-ga6-adjoint"></a>

<!-- formal-statement-start -->
> **命題（余微分の随伴関係と二乗零）**  
> 上の閉多様体で $\alpha\in\Omega^{k-1}(M)$、$\beta\in\Omega^k(M)$（$1\le k\le n$）なら
>
$$
(d\alpha,\beta)_2=(\alpha,\delta\beta)_2,\qquad \delta^2=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$d(\alpha\wedge*\beta)$ を次数付きLeibniz則で展開します。境界積分が消えた後に残る符号を $*^2$ で移せば、余微分の式に一致します。

<!-- proof-start -->
### 証明

[次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を次数 $k-1$ の $\alpha$ と次数 $n-k$ の $*\beta$ に使うと

$$
d(\alpha\wedge*\beta)=d\alpha\wedge*\beta+(-1)^{k-1}\alpha\wedge d(*\beta).
$$

[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分は $0$ なので

$$
(d\alpha,\beta)_2=(-1)^k\int_M\alpha\wedge d(*\beta).
$$

一方、$\delta\beta=(-1)^{n(k+1)+1}*d*\beta$ に再び $*$ を作用させると、$d*\beta$ の次数が $n-k+1$ であるため

$$
*\delta\beta=(-1)^{n(k+1)+1+(n-k+1)(k-1)}d*\beta=(-1)^k d*\beta.
$$

最後の指数は $k$ と合同（mod $2$）です。従って右辺は $(\alpha,\delta\beta)_2$。また $\delta^2$ には $*d**d*$ が現れ、中間の $**$ は次数に応じた定数符号なので、[外微分の二乗零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)から $\delta^2=0$ です。
<!-- proof-end -->

<!-- definition-example-start: def-ga6-codifferential -->
**定義の確認**（平坦トーラスで直接計算）：$\alpha=f\,dx+g\,dy$ に上の星作用素を使うと $*\alpha=f\,dy-g\,dx$、従って $d(*\alpha)=(\partial_x f+\partial_y g)\,dx\wedge dy$。$n=2,k=1$ の符号は $(-1)^5=-1$ なので

$$
\delta(f\,dx+g\,dy)=-(\partial_x f+\partial_y g).
$$

さらに $q\,dx\wedge dy$ には $n=2,k=2$ で符号 $(-1)^7=-1$ を適用し、$\delta(q\,dx\wedge dy)=\partial_yq\,dx-\partial_xq\,dy$。両式は次数を一つ下げます。例えば $\alpha=\sin x\,dy$ なら $\delta\alpha=0$、$d\alpha=\cos x\,dx\wedge dy$ です。
<!-- definition-example-end -->

## 2. 形式のLaplacianが測る二つのずれ

関数 $f$ では $df$ が零でなければ定数からずれています。$1$ 形式以上では、$d\omega=0$ だけでは十分ではありません。例えば $df$ は常に $d(df)=0$ ですが、$df$ 自体が零とは限りません。そこで $d$ とその随伴 $\delta$ の両方のずれを測る作用素を導入します。

<a id="def-ga6-hodge-laplacian"></a>

<!-- formal-statement-start -->
> **定義（Hodge Laplacian）**  
> $\Omega^k(M)$ 上の **Hodge Laplacian** を
>
$$
\Delta_H=d\delta+\delta d:\Omega^k(M)\longrightarrow\Omega^k(M)
$$
>
> と定義する。$d$、$\delta$ の定義域外の次数の項は $0$ とみなす。
<!-- formal-statement-end -->

<a id="thm-ga6-energy"></a>

<!-- formal-statement-start -->
> **定理（エネルギー恒等式と調和性の判定）**  
> 滑らか・向き付けられたコンパクト境界なし多様体上の任意の $\omega\in\Omega^k(M)$ について
>
$$
(\Delta_H\omega,\omega)_2=\|d\omega\|_2^2+\|\delta\omega\|_2^2\ge0.
$$
>
> 従って $\Delta_H\omega=0$ と $d\omega=\delta\omega=0$ は同値である。$0$ 形式では $\Delta_Hf=-\Delta_gf$ が成り立つ。ただし $\Delta_g=\operatorname{div}_g\nabla_g$ は非正の関数Laplacianである。
<!-- formal-statement-end -->

### 証明の見取り図

二つの項に先ほどの随伴関係を一度ずつ適用します。非負の平方和が零なら両方とも零です。関数では $\delta f=0$ のため $\delta df$ だけが残ります。

<!-- proof-start -->
### 証明

[随伴関係](#prop-ga6-adjoint)から

$$
(d\delta\omega,\omega)_2=(\delta\omega,\delta\omega)_2,\qquad
(\delta d\omega,\omega)_2=(d\omega,d\omega)_2.
$$

足すと表示式を得ます。$\Delta_H\omega=0$ なら左辺は $0$ なので二つの非負ノルムはともに零であり、滑らかな形式のため各形式は零です。逆に $d\omega=\delta\omega=0$ なら $\Delta_H\omega=0$ です。

関数 $f$ に対し $df$ は勾配の1形式表示で、局所座標で $\delta df=-|g|^{-1/2}\partial_i(|g|^{1/2}g^{ij}\partial_jf)$。これは[GA1のLaplace--Beltramiの座標公式](../GA1/index.md#thm-ga1-divergence)で定めた $-\Delta_g f$ です。
<!-- proof-end -->

<!-- definition-example-start: def-ga6-hodge-laplacian -->
**定義の確認**（平坦トーラスの1形式）：先の $\alpha=\sin x\,dy$ は $d\alpha=\cos x\,dx\wedge dy$、$\delta\alpha=0$ でした。余微分の2形式の式へ $q=\cos x$ を代入すると

$$
\Delta_H\alpha=\delta d\alpha=(-\partial_x\cos x)\,dy=\sin x\,dy=\alpha.
$$

1形式の各成分に非負の $-\partial_x^2-\partial_y^2$ が作用したことを直接確認できました。一方 $dx$ は $d(dx)=0$、$\delta(dx)=0$ なので $\Delta_Hdx=0$ です。係数が一定か否かが違いを生みます。
<!-- definition-example-end -->

## 3. 調和形式と楕円型評価

滑らかな形式のうちLaplacianで零になるものを集め、その空間を調べます。関数では定数でしたが、トーラスの $dx$ は定数関数ではない1形式の例です。

<a id="def-ga6-harmonic-form"></a>

<!-- formal-statement-start -->
> **定義（調和形式）**  
> 閉多様体 $(M,g)$ 上の次数 $k$ の **調和形式** の空間を
>
$$
\mathcal H^k(M)=\{\omega\in\Omega^k(M):\Delta_H\omega=0\}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga6-harmonic-form -->
**定義の確認**（トーラスの座標形式）：平坦 $\mathbb T^2$ で $dx$ は大域的な1形式です。$d(dx)=0$ は[外微分の二乗零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)から、$\delta(dx)=-\partial_x1-\partial_y0=0$ は前節の座標式から出ます。[エネルギー判定](#thm-ga6-energy)を使うまでもなく $\Delta_Hdx=d0+\delta0=0$。同じく $dy$ と $dx\wedge dy$ も調和形式です。ただし $x$ という角度座標そのものは大域的な実数値関数ではないので、$dx=d(x)$ と大域的に書けると考えてはいけません。
<!-- definition-example-end -->

### なぜ零固有空間は有限次元か

[GA4で使ったコンパクトレゾルベント](../GA4/index.md#thm-ga4-compact-resolvent)を形式にも適用するには、まず $\Delta_H$ が楕円型であることを確認します。ここでの **主記号** は、局所的な微分作用素の最高階部分で、Fourier変換の規約に従い $\partial_j$ を $i\xi_j$ に置き換えた線形写像です。形式 $v$ に対して、外微分 $d$ の主記号は $i\xi\wedge v$、余微分 $\delta$ の主記号は $-i\iota_{\xi^\sharp}v$ です。従って二つの合成 $d\delta+\delta d$ の主記号は $|\xi|_g^2I$ になります。$\iota$ は[内部積](../../GEO/GEO7/index.md#def-geo7-interior-product)、$\xi^\sharp$ は[計量による同型](../../GEO/GEO12/index.md#def-geo12-musical)で得るベクトルを表します。

<a id="lem-ga6-elliptic"></a>

<!-- formal-statement-start -->
> **補題（Hodge作用素の楕円型評価）**  
> $M$ を滑らかなコンパクト境界なしRiemann多様体とする。各次数の滑らかな形式 $\omega$ に対し定数 $C_m$ が存在して
>
$$
\|\omega\|_{H^1}\le C_0\bigl(\|d\omega\|_2+\|\delta\omega\|_2+\|\omega\|_2\bigr),
$$
>
$$
\|\omega\|_{H^{m+2}}\le C_m\bigl(\|\Delta_H\omega\|_{H^m}+\|\omega\|_2\bigr)\quad(m=0,1,\ldots)
$$
>
> が成り立つ。特に $\Delta_H$ の主記号は $|\xi|_g^2 I$（微分作用素の記号の符号を $-\partial^2\leftrightarrow\xi^2$ とする）であり、強楕円型である。
<!-- formal-statement-end -->

### 証明の見取り図

正規直交基底で $\xi=|\xi|e^1$ とすると、任意の $k$ 形式は $v=e^1\wedge a+b$（$a,b$ は $e^1$ を含まない）に分けられます。この分解で「外積で増える成分」と「内部積で減る成分」が正確に補い合うことが核心です。その後、局所Fourier評価を小さな座標近傍と1の分割で大域化します。

<!-- proof-start -->
### 証明

$\xi\ne0$ で $\xi^\sharp$ を第一軸とする正規直交基底を選び、$v=e^1\wedge a+b$ と書きます。$a,b$ は互いに直交し、$\xi\wedge v=|\xi|e^1\wedge b$、$\iota_{\xi^\sharp}v=|\xi|a$ なので

$$
|\xi\wedge v|^2+|\iota_{\xi^\sharp}v|^2
=|\xi|^2(|b|^2+|a|^2)=|\xi|^2|v|^2.
$$

これは $\iota_{\xi^\sharp}(\xi\wedge v)+\xi\wedge\iota_{\xi^\sharp}v=|\xi|^2v$ も示します。従って $d\delta+\delta d$ の二階主記号は $|\xi|^2I$ です。

まずEuclid座標の**定数係数**の場合を確認します。コンパクト台をもつ係数ベクトル $u$ のFourier変換に上の等式を $\xi$ ごとに適用し、Parsevalで積分すると

$$
\|\nabla u\|_2^2=\|du\|_2^2+\|\delta_0u\|_2^2,
$$

ここで $\delta_0=-\sum_i\iota_{\partial_i}\partial_i$ は平坦計量の余微分です。一般の計量では各点で余標構を正規直交化できます。点 $x_0$ で計量行列を単位行列にした座標を選び、十分小さい近傍で二つの一階作用素の最高階係数を凍結した係数との差が $\varepsilon$ 以下になるように取ります。局所化した $u$ について凍結係数の作用素と元の作用素を比較すれば

$$
\|\nabla u\|_2\le C\bigl(\|du\|_2+\|\delta u\|_2+\|u\|_2\bigr)+C\varepsilon\|\nabla u\|_2.
$$

$\varepsilon$ を $C\varepsilon<1/2$ と選び最後の項を左辺へ吸収します。[1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)で有限個の局所化を足します。$d(\chi\omega)=\chi\,d\omega+d\chi\wedge\omega$、$\delta(\chi\omega)=\chi\,\delta\omega-\iota_{\nabla\chi}\omega$ だから、切断関数の微分が作る項は $C\|\omega\|_2$ 以下です。[GA2の座標ノルム同値](../GA2/index.md#thm-ga2-chart-equivalence)により最初の不等式になります。

二階評価も同じ最高階記号に基づきます。凍結した作用素は各係数に作用する $-\sum_i\partial_i^2$ なので、Fourier変換で

$$
\|u\|_{H^2}\le C\bigl(\|-\sum_i\partial_i^2u\|_2+\|u\|_2\bigr).
$$

一般係数を小近傍で凍結すると二階係数の誤差は $\varepsilon\|u\|_{H^2}$、一次以下の項は $C\|u\|_{H^1}$ です。前述の一次評価と、Fourier係数ごとの $1+|\xi|^2\le \eta(1+|\xi|^2)^2+C_\eta$ による補間で、$\|u\|_{H^1}\le\eta\|u\|_{H^2}+C_\eta\|u\|_2$ として吸収します。滑らかな可変係数に対し $\partial^\gamma$ を作用させると、最高階項は $\Delta_H(\partial^\gamma u)$、残りは係数の微分と $u$ の高々 $|\gamma|+1$ 階微分の積です。これを一階低いノルムへ帰着して $m$ を帰納させると二番目の評価が得られます。弱解の場合は差分商でこの操作を行ってから極限を取り、同じ評価で弱 $H^{m+2}$ 正則性を得ます。コンパクト性による有限近傍と係数の有界性が全体の定数を保証します。
<!-- proof-end -->

<a id="thm-ga6-finite-harmonic"></a>

<!-- formal-statement-start -->
> **定理（Hodge Laplacianの非負自己共役実現と有限次元核）**  
> 上記の $M$ と次数 $k$ について、$\Delta_H$ には $L^2\Omega^k(M)$ 上の非負自己共役実現があり、そのレゾルベント $(I+\Delta_H)^{-1}$ はコンパクトである。零固有空間 $\mathcal H^k(M)$ は有限次元で滑らかな形式からなり、直交補空間には正のスペクトルギャップがある。
<!-- formal-statement-end -->

### 証明の見取り図

先ほどの一次評価で $\|u\|_2^2+\|du\|_2^2+\|\delta u\|_2^2$ が $H^1$ を制御します。これを双線形形式にして $I+\Delta_H$ の弱逆作用素を作れば、[GA2のRellich埋め込み](../GA2/index.md#thm-ga2-rellich)からコンパクトになります。正の固有値が0へ集まる逆作用素のスペクトルを反転し、零固有空間の有限次元性を得ます。

<!-- proof-start -->
### 証明

$H^1\Omega^k$ は局所余標構の各係数を $H^1$ にすることで定義し、[GA2の貼り合わせ](../GA2/index.md#thm-ga2-chart-equivalence)により座標に依らないHilbert空間です。この上に

$$
a(u,v)=(u,v)_2+(du,dv)_2+(\delta u,\delta v)_2
$$

を置きます。$d,\delta$ は滑らかな係数の一階作用素なので $a$ は有界です。[楕円型評価](#lem-ga6-elliptic)と $(A+B+C)^2\le3(A^2+B^2+C^2)$ により $a(u,u)\ge c\|u\|_{H^1}^2$。よって[GA3で用いたLax--Milgramの定理](../GA3/index.md#thm-ga3-poisson-existence)と同じ弱形式の論法で、任意の $f\in L^2$ に一意の $u=Rf\in H^1$ が存在し

$$
a(Rf,v)=(f,v)_2\quad\text{for all }v\in H^1\Omega^k
$$

を満たします。$v=Rf$ とすると $\|Rf\|_2^2\le\|f\|_2\|Rf\|_2$、従って $\|R\|_{2\to2}\le1$ です。$f,h\in L^2$ なら

$$
(Rf,h)_2=a(Rf,Rh)=(f,Rh)_2,
$$

ゆえに $R$ は自己共役かつ非負です。$Rf=0$ なら上の弱形式より $(f,v)_2=0$ がすべての $H^1$ 形式で成り立ち、滑らかな形式の $L^2$ 密度から $f=0$。つまり $R$ は単射です。

$f$ の有界列に対して $Rf$ は $H^1$ で有界です。[GA2のRellich埋め込み](../GA2/index.md#thm-ga2-rellich)を有限個の局所係数に適用すると $L^2$ で収束部分列が取れるので $R$ はコンパクトです。[FA7のコンパクト自己共役作用素のスペクトル定理](../../../解析系/FA/FA7/index.md#thm-fa7-compact-self-adjoint-spectral)と同様、$R$ は正の固有値 $\mu_j\downarrow0$ と完全正規直交固有形式を持ちます。$R^{-1}-I$ を $D(R^{-1})=\operatorname{Ran}R$ 上で定義すると、固有値は $\lambda_j=\mu_j^{-1}-1\ge0$。この作用素が非負自己共役実現であり、滑らかな形式では随伴公式によって $\Delta_H=d\delta+\delta d$ と一致します。

$Ru=\mu u$ なら弱い意味で $\Delta_Hu=(\mu^{-1}-1)u$ です。[楕円型評価](#lem-ga6-elliptic)の弱解版を $m=0,2,\ldots$ と繰り返すと $u\in H^s$ がすべての $s$ で成立し、[GA2のSobolev埋め込み](../GA2/index.md#thm-ga2-embedding)で滑らかです。$\lambda_j=0$ は $\mu_j=1$ に相当し、正の非零固有値の重複度はコンパクト作用素では有限です。従って零固有空間は有限次元。次の正固有値は $0$ より離れます。零固有空間が滑らかな[調和形式の定義](#def-ga6-harmonic-form)と一致することもここで確定しました。
<!-- proof-end -->

ここまでで、形式のLaplacianにも関数の場合と同じスペクトル上の道具が使えるようになりました。ただし、形式には外微分 $d$ と余微分 $\delta$ という**二種類の方向**があるため、得たい分解は単なる固有空間分解より細かいものです。

## 4. 調和・完全・余完全に分ける

[完全形式](../../GEO/GEO9/index.md#def-geo9-closed-exact)は $d\eta$ と書ける形式です。同様に、ある形式 $\zeta$ に余微分をかけた $\delta\zeta$ という方向の成分も区別します。$d^2=\delta^2=0$ と随伴関係により、外微分から得る成分と余微分から得る成分は直交します。その間に残る成分を調和形式として取り出せることがHodge分解です。

<a id="def-ga6-coexact"></a>

<!-- formal-statement-start -->
> **定義（余完全形式）**  
> $k$ 形式 $\omega$ がある $\zeta\in\Omega^{k+1}(M)$ に対し $\omega=\delta\zeta$ と書けるとき、$\omega$ を **余完全形式** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga6-coexact -->
**定義の確認**（平坦二次元トーラス）：$\zeta=\cos x\,dx\wedge dy$ を選ぶと、[余微分の座標式](#def-ga6-codifferential)から $\delta\zeta=\sin x\,dy$ です。この1形式は明示した滑らかな2形式の余微分なので余完全です。さらに $\delta(\sin x\,dy)=0$ を同じ式から確認でき、$\delta^2=0$ とも整合します。
<!-- definition-example-end -->

零固有空間への $L^2$ 直交射影を $P_k$ と書きます。正固有値部分では $\Delta_H$ を逆にできるので、$\mathcal H^k$ と直交する各固有形式の係数を固有値で割った作用素を一つの逆作用素として次のように定義します。

<a id="def-ga6-green-operator"></a>

<!-- formal-statement-start -->
> **定義（Hodge Green作用素）**  
> 非負自己共役Hodge Laplacianの正規直交固有形式を $e_j$、正固有値を $\lambda_j>0$ とし、$\mathcal H^k(M)$ への直交射影を $P_k$ とする。$f\in L^2\Omega^k(M)$ に対し
>
$$
G_kf=\sum_{\lambda_j>0}\frac{(f,e_j)_2}{\lambda_j}e_j
$$
>
> を $k$ 形式に対する逆作用素とする。零固有成分には $G_kf=0$ を対応させる。
<!-- formal-statement-end -->

これはスペクトルギャップ $\lambda_j\ge\lambda_*>0$ があるため $L^2$ で有界です。固有関数と固有値は存在だけでなく、逆を取れる理由が必要でした。

<!-- definition-example-start: def-ga6-green-operator -->
**定義の確認**（標準円）：1形式 $\omega=\cos\theta\,d\theta$ は $\Delta_H\omega=\omega$（$\delta\omega=\sin\theta$、$d\delta\omega=\cos\theta\,d\theta$）なので、正固有値 $\lambda=1$ の固有形式です。従って $G_1\omega=\omega$ です。定数形式 $d\theta$ は調和で、定義から $G_1(d\theta)=0$。さらに $\Delta_H G_1\omega=\omega-P_1\omega=\omega$ を確認できます。
<!-- definition-example-end -->

<a id="thm-ga6-hodge-decomposition"></a>

<!-- formal-statement-start -->
> **定理（閉多様体のHodge直交分解）**  
> $(M,g)$ を滑らかな向き付けられたコンパクト境界なしRiemann多様体とする。任意の滑らかな $k$ 形式 $\omega$ は、一意に定まる互いに $L^2$ 直交する三成分へ
>
$$
\omega=h+d\alpha+\delta\beta,
\quad h\in\mathcal H^k(M),\
\alpha\in\Omega^{k-1}(M),\
\beta\in\Omega^{k+1}(M)
$$
>
> と分解される。ただし **三つの成分** $h,d\alpha,\delta\beta$ は一意であり、原始形式 $\alpha,\beta$ 自身の一意性は主張しない。具体的には
>
$$
h=P_k\omega,\qquad \alpha=\delta G_k\omega,\qquad \beta=dG_k\omega.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正固有空間上で $\Delta_H G_k=I-P_k$ と書けます。$d\delta+\delta d$ をこの等式に代入すれば三成分が現れます。直交性は二乗零と[随伴関係](#prop-ga6-adjoint)を使って内積をゼロと計算します。この逆作用素で得た原始形式が本当に滑らかかも確認します。

<!-- proof-start -->
### 証明

[非負自己共役実現](#thm-ga6-finite-harmonic)の固有形式展開から、すべての $f\in L^2$ に対し $\Delta_HG_kf=f-P_kf$ が作用素領域で成り立ちます（正固有値係数に $\lambda_j$ を掛けると $f-P_kf$ の係数列に戻るため）。$f=\omega$ が滑らかなら右辺は滑らかです。[楕円型評価](#lem-ga6-elliptic)の弱解版で $G_k\omega\in H^2$、右辺を $H^m$ に上げて繰り返せば $G_k\omega\in H^s$（任意の $s$）、従って滑らかです。

ここで

$$
\omega=P_k\omega+\Delta_HG_k\omega
=P_k\omega+d(\delta G_k\omega)+\delta(dG_k\omega)
$$

なので分解が成立します。[随伴関係](#prop-ga6-adjoint)、[外微分の二乗零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)、$\delta^2=0$ を順に使うと

$$
(d\alpha,\delta\beta)_2=(dd\alpha,\beta)_2=0,
$$

$$
(h,d\alpha)_2=(\delta h,\alpha)_2=0,\qquad
(h,\delta\beta)_2=(dh,\beta)_2=0.
$$

$\delta h=dh=0$ は[エネルギー判定](#thm-ga6-energy)です。さらに二つの表示を引いたとき、調和・完全・余完全の三成分がそれぞれ直交するので、差の $L^2$ ノルム平方は各差のノルム平方の和になります。合計が $0$ なら各成分が $0$、よって三成分は一意です。$\alpha\mapsto\alpha+d\gamma$ などは同じ完全成分を与えるので、原始形式の一意性はありません。
<!-- proof-end -->

## 5. de Rhamコホモロジーは調和形式で代表できる

[de Rhamコホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)では、$d\omega=0$ を満たす閉形式を、完全形式の違いだけ同一視します。Hodge分解があれば、各同値類の中から調和形式をただ一つ選べそうです。余完全成分が消えることと、調和形式が完全でもあるなら零であることの二点を示します。

<a id="thm-ga6-hodge-de-rham"></a>

<!-- formal-statement-start -->
> **定理（Hodge--de Rham同型）**  
> $(M,g)$ を滑らかな向き付けられたコンパクト境界なしRiemann多様体とする。各次数 $0\le k\le n$ に対し、調和形式のde Rham類への写像
>
$$
\mathcal H^k(M)\longrightarrow H_{\mathrm{dR}}^k(M;\mathbb R),
\qquad h\longmapsto[h]
$$
>
> は線形同型である。従って各de Rham類は一意の調和代表を持ち、その次元は有限である。
<!-- formal-statement-end -->

### 証明の見取り図

調和形式は閉形式です。閉形式 $\omega$ のHodge分解を作り、余完全成分 $\delta\beta$ と $\omega$ の内積を二通りに求めます。一方は直交性による $\|\delta\beta\|^2$、他方は $d\omega=0$ により零です。

<!-- proof-start -->
### 証明

[調和性の判定](#thm-ga6-energy)で $dh=0$ なので $[h]$ は定義できます。任意の閉形式 $\omega$ に[Hodge分解](#thm-ga6-hodge-decomposition)を適用して

$$
\omega=h+d\alpha+\delta\beta,\qquad d\omega=0
$$

とします。直交性から $(\omega,\delta\beta)_2=\|\delta\beta\|_2^2$ です。他方、[随伴関係](#prop-ga6-adjoint)により

$$
(\omega,\delta\beta)_2=(d\omega,\beta)_2=0.
$$

従って $\delta\beta=0$ で、$\omega=h+d\alpha$。ゆえに $[\omega]=[h]$、写像は全射です。調和形式 $h$ の類が $0$ なら、ある $\eta$ について $h=d\eta$ です。同じ随伴関係と $\delta h=0$ から

$$
\|h\|_2^2=(h,d\eta)_2=(\delta h,\eta)_2=0.
$$

従って $h=0$、写像は単射です。[有限次元核の定理](#thm-ga6-finite-harmonic)で $\dim\mathcal H^k<\infty$、同型により $\dim H_{\mathrm{dR}}^k<\infty$ です。
<!-- proof-end -->

この次元を $b_k=\dim H_{\mathrm{dR}}^k(M;\mathbb R)$ と書くと、**Betti数**は解析的には「Hodge Laplacianの零固有値の重複度」です。[GEO9では位相・積分から計算した量](../../GEO/GEO9/index.md#thm-geo9-h1-circle)を、本章では偏微分作用素の核としても数えられるようになりました。

## 6. 円・トーラス・球面と仮定の境界

**円**：標準円では $0$ 形式 $f(\theta)$ に $\Delta_H f=-f''$、1形式 $a(\theta)d\theta$ に $\Delta_H(a\,d\theta)=-a''\,d\theta$ が作用します。両者の調和条件は周期関数の二階微分が零であること。$f=A\theta+B$ の周期性は $A=0$ を強制するため、$\mathcal H^0(S^1)=\mathbb R\cdot1$、$\mathcal H^1(S^1)=\mathbb R\cdot d\theta$ です。これは[GEO9の円の一次コホモロジー](../../GEO/GEO9/index.md#thm-geo9-h1-circle)と一致します。

**平坦二次元トーラス**：任意の滑らかな $k$ 形式を $\omega=\sum_I f_I(x,y)\,dx^I$ と書き、前節の平坦余微分を各係数に用いると

$$
\Delta_H\omega=\sum_I(-\partial_x^2-\partial_y^2)f_I\,dx^I.
$$

調和なら[Greenの第一公式](../GA1/index.md#thm-ga1-green-first)で $\sum_I\int_{\mathbb T^2}(|\partial_x f_I|^2+|\partial_y f_I|^2)=0$、各 $f_I$ は定数です。よって

$$
\mathcal H^0=\operatorname{span}\{1\},\quad
\mathcal H^1=\operatorname{span}\{dx,dy\},\quad
\mathcal H^2=\operatorname{span}\{dx\wedge dy\}.
$$

次数ごとのBetti数は $(1,2,1)$ です。円と異なり、独立な1形式が二つあるため1次の次元が2になります。

**球面 $S^2$**：$0$ 形式は連結性とエネルギーから定数だけです。$2$ 形式は $f\,dV_g$ と書け、$d(f\,dV_g)=0$ は次数のため自動的に成り立ち、$\delta(f\,dV_g)=\pm*df$ です。$\delta=0$ なら $df=0$ なので $f$ は定数。従って $\dim\mathcal H^0=\dim\mathcal H^2=1$。1次については、北極と南極を除いた二つの開集合 $U_N,U_S$ はそれぞれ $\mathbb R^2$ に微分同相です。[Poincaréの補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)で閉1形式はそれぞれ $df_N,df_S$ と書けます。共通部分は連結なので $d(f_N-f_S)=0$ から $f_N-f_S$ は定数、片方に定数を足して二つの原始関数を一致させられます。大域的に $\omega=df$ となり $H^1_{\mathrm{dR}}(S^2)=0$。[Hodge--de Rham同型](#thm-ga6-hodge-de-rham)より $b(S^2)=(1,0,1)$ です。

**仮定を外すと**：境界がある場合は $\int_Md(\alpha\wedge*\beta)=\int_{\partial M}\alpha\wedge*\beta$ という項が残るので、前節の随伴関係を境界条件なしで用いることはできません。形式には絶対型・相対型など、次数に合わせた境界条件が必要です。非コンパクトでは、局所楕円型評価は残っても有限被覆による大域定数とRellichのコンパクト性が失われることがあります。$\mathbb R$ 上の $dx$ は形式的には調和ですが $L^2(\mathbb R)$ には属しません。従って「すべての調和形式が有限次元の $L^2$ 核を作る」「すべてのde Rham類が $L^2$ 調和代表を持つ」という結論を無条件に拡張してはいけません。

## 7. 演習

### Level A：符号と定義を自分の手で検証する

<a id="ex-ga6-a01"></a>
#### GA6-A01 Hodge星と余微分を平坦座標で確かめる
- Level: A

標準平坦トーラス $\mathbb T^2$ に向き $dx\wedge dy$ を入れる。1形式 $\alpha=\cos x\,dx+\sin y\,dy$ に対し、$*\alpha$、$d\alpha$、$\delta\alpha$、$\Delta_H\alpha$ を求めよ。$*\alpha$ について定義式を内積から確認すること。

<!-- solution-start -->
**詳細解答**

[星作用素の定義](#def-ga6-hodge-star)より $*dx=dy$、$*dy=-dx$。よって

$$
*\alpha=\cos x\,dy-\sin y\,dx,
$$

$$
\alpha\wedge*\alpha
=(\cos^2x+\sin^2y)\,dx\wedge dy
=\langle\alpha,\alpha\rangle_g\,dV_g.
$$

これで定義式を確認しました。[外微分の定義](../../GEO/GEO7/index.md#def-geo7-exterior-derivative)では

$$
d\alpha=d(\cos x)\wedge dx+d(\sin y)\wedge dy
=-\sin x\,dx\wedge dx+\cos y\,dy\wedge dy=0.
$$

[余微分の定義](#def-ga6-codifferential)で $n=2,k=1$ の符号は $-1$ なので

$$
\delta\alpha=-*d*\alpha
=-(\partial_x\cos x+\partial_y\sin y)
=\sin x-\cos y.
$$

従って $d\delta\alpha=\cos x\,dx+\sin y\,dy$、$\delta d\alpha=0$。結局 $\Delta_H\alpha=\alpha$ です。$d\alpha=0$ でも $\delta\alpha\ne0$ なので調和とは限らないことも確認できました。
<!-- solution-end -->

<a id="ex-ga6-a02"></a>
#### GA6-A02 円上の調和・完全成分
- Level: A

標準円の1形式 $\omega=(2+\cos\theta)\,d\theta$ について $d\omega$、$\delta\omega$、$\Delta_H\omega$ を計算し、調和成分と完全成分を明示せよ。

<!-- solution-start -->
**詳細解答**

円は1次元なので2形式がなく $d\omega=0$。向き $d\theta$、計量 $d\theta^2$ なら $*(a\,d\theta)=a$、$*f=f\,d\theta$ です。$n=k=1$ の符号 $(-1)^3=-1$ により

$$
\delta(a\,d\theta)=-*d(a)=-a'(\theta).
$$

$a=2+\cos\theta$ を代入して $\delta\omega=\sin\theta$、さらに

$$
\Delta_H\omega=d\delta\omega+\delta d\omega
=d(\sin\theta)=\cos\theta\,d\theta.
$$

$\omega=2\,d\theta+d(\sin\theta)$ です。$d(2\,d\theta)=0$、$\delta(2\,d\theta)=0$ なので $2\,d\theta$ が調和、$d(\sin\theta)$ が完全です。円上で2形式は零なので余完全1形式は零です。
<!-- solution-end -->

<a id="ex-ga6-a03"></a>
#### GA6-A03 星作用素は形式の長さを保存する
- Level: A

平坦 $\mathbb T^2$ 上で $\alpha=dx+2dy$ とする。$*\alpha$、$*(*\alpha)$、$\|\alpha\|_2^2$ を求め、$\alpha\wedge*\alpha=\langle\alpha,\alpha\rangle_gdV_g$ を確認せよ。各座標の周期は $2\pi$ とする。

<!-- solution-start -->
**詳細解答**

[星作用素の基底表示](#def-ga6-hodge-star)から $*\alpha=dy-2dx$ です。もう一度星作用素をかけると

$$
*(*\alpha)=*dy-2*dx=-dx-2dy=-\alpha,
$$

これは $k=1,n=2$ の $*^2=(-1)^{1\cdot1}=-1$ と一致します。また

$$
\alpha\wedge*\alpha=(dx+2dy)\wedge(dy-2dx)
=dx\wedge dy-4dy\wedge dx=5\,dx\wedge dy.
$$

従って点ごとのノルム平方は $5$ です。体積は $(2\pi)^2$ なので

$$
\|\alpha\|_2^2=\int_0^{2\pi}\int_0^{2\pi}5\,dx\,dy=20\pi^2.
$$

この計算では交差項が消え、$dy\wedge dx=-dx\wedge dy$ の符号に注意が必要です。
<!-- solution-end -->

<a id="ex-ga6-a04"></a>
#### GA6-A04 零次形式では非負符号になる
- Level: A

標準円上の関数 $f(\theta)=2+\cos\theta$ に対し、$\Delta_Hf$、$\|df\|_2^2$、$(\Delta_Hf,f)_2$ を求め、[エネルギー恒等式](#thm-ga6-energy)を直接確認せよ。

<!-- solution-start -->
**詳細解答**

$df=-\sin\theta\,d\theta$、$\delta f=0$ です。先ほどの1形式の式 $\delta(a\,d\theta)=-a'$ を $a=-\sin\theta$ に適用すると

$$
\Delta_Hf=\delta df=-\frac{d}{d\theta}(-\sin\theta)=\cos\theta.
$$

一方

$$
\|df\|_2^2=\int_0^{2\pi}\sin^2\theta\,d\theta=\pi.
$$

内積も

$$
(\Delta_Hf,f)_2=\int_0^{2\pi}\cos\theta(2+\cos\theta)\,d\theta
=2\cdot0+\pi=\pi.
$$

両辺が一致し、$\Delta_H=-\partial_\theta^2\ge0$ です。通常の[関数Laplacianの符号](../GA1/index.md#thm-ga1-green-first) $\Delta_g=\partial_\theta^2\le0$ とは反対になります。
<!-- solution-end -->

### Level B：解析的道具とコホモロジーをつなぐ

<a id="ex-ga6-b01"></a>
#### GA6-B01 三成分の直交性を基礎から証明する
- Level: B

向き付けられたコンパクト境界なし多様体で、滑らかな $(k-1)$ 形式 $\alpha$、$(k+1)$ 形式 $\beta$、調和 $k$ 形式 $h$ に対し、$d\alpha$、$\delta\beta$、$h$ が二つずつ $L^2$ 直交することを証明せよ。境界ありで同じ計算を無条件に使えない箇所も示せ。

<!-- solution-start -->
**詳細解答**

[外微分の二乗零](../../GEO/GEO7/index.md#thm-geo7-d-square-zero)と[随伴関係](#prop-ga6-adjoint)を順に使うと

$$
(d\alpha,\delta\beta)_2=(d(d\alpha),\beta)_2=(0,\beta)_2=0.
$$

ここで $\delta\beta$ は $d$ の随伴を $\beta$ 側へ移した結果であり、次数もそれぞれ $k,k+1$ で合っています。

また[調和性の判定](#thm-ga6-energy)から $dh=\delta h=0$。従って

$$
(h,d\alpha)_2=(\delta h,\alpha)_2=0,\qquad
(h,\delta\beta)_2=(dh,\beta)_2=0.
$$

三つの内積が零になりました。境界があれば[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分したときの境界項が残り、$(d\alpha,\beta)=(\alpha,\delta\beta)$ が任意の形式では成立しません。そのため境界条件・作用素領域の指定が必要です。
<!-- solution-end -->

<a id="ex-ga6-b02"></a>
#### GA6-B02 Green作用素を固有値ごとに使う
- Level: B

標準円上の1形式 $\omega=(3+2\sin\theta+\cos2\theta)\,d\theta$ について、調和射影 $P_1\omega$、$G_1\omega$、$\Delta_HG_1\omega$ を計算せよ。固有値ごとに係数を割る理由も明記せよ。

<!-- solution-start -->
**詳細解答**

円上の $\Delta_H(a\,d\theta)=-a''\,d\theta$ なので、定数・$\sin\theta$・$\cos2\theta$ の固有値はそれぞれ $0,1,4$ です。異なる波数は円で直交するので、零固有空間への射影は

$$
P_1\omega=3\,d\theta.
$$

[Green作用素の定義](#def-ga6-green-operator)では正固有値 $\lambda$ の固有成分に $\lambda^{-1}$ を掛けるため

$$
G_1\omega=\left(2\sin\theta+\frac14\cos2\theta\right)d\theta.
$$

実際、$\Delta_H$ を作用させると

$$
\Delta_HG_1\omega
=\left(2\sin\theta+\frac44\cos2\theta\right)d\theta
=\omega-P_1\omega.
$$

定数成分へ $1/0$ を掛けてはいけません。正固有値部分のみ逆にして調和成分は零へ送ることが定義上の要点です。
<!-- solution-end -->

<a id="ex-ga6-b03"></a>
#### GA6-B03 球面の閉1形式には原始関数がある
- Level: B

$S^2$ の任意の滑らかな閉1形式 $\omega$ は完全であることを、北極・南極をそれぞれ除いた二つの開集合と[Poincaréの補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)から示せ。これと[Hodge--de Rham同型](#thm-ga6-hodge-de-rham)から調和1形式の次元を求めよ。

<!-- solution-start -->
**詳細解答**

$U_N=S^2\setminus\{N\}$ と $U_S=S^2\setminus\{S\}$ はそれぞれ立体射影で $\mathbb R^2$ と微分同相であり、星型な座標へ移せます。$d\omega=0$ だから、[Poincaréの補題](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)を各開集合に適用し、$\omega|_{U_N}=df_N$、$\omega|_{U_S}=df_S$ を得ます。

交わり $U_N\cap U_S=S^2\setminus\{N,S\}$ は連結です。そこで

$$
d(f_N-f_S)=df_N-df_S=\omega-\omega=0
$$

です。関数の微分が零で連結なら定数なので $f_N-f_S=c$。$f_S$ を $f_S+c$ に置き換えれば二つの原始関数が交わりで一致します。よって一つの滑らかな大域関数 $f$ へ貼り合わさり、$\omega=df$。すべての閉1形式が完全なので $H_{\mathrm{dR}}^1(S^2)=0$、同型から $\mathcal H^1(S^2)=\{0\}$、次元は $0$ です。ここではまだBochner公式や球面の曲率は使っていません。
<!-- solution-end -->

<a id="ex-ga6-b04"></a>
#### GA6-B04 楕円性を保証する外積と内部積
- Level: B

Euclid空間の正規直交余標構 $(e^1,e^2,e^3)$ を取り、$\xi=a e^1$（$a\ne0$）、2形式 $v=b\,e^1\wedge e^2+c\,e^2\wedge e^3$ とする。$\xi\wedge v$、$\iota_{\xi^\sharp}v$、そのノルムの二乗和を求め、$\Delta_H$ の主記号が非退化になる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$\xi\wedge(e^1\wedge e^2)=0$ は $e^1\wedge e^1=0$ によります。もう一つの項は

$$
\xi\wedge v=ac\,e^1\wedge e^2\wedge e^3.
$$

内部積では $\iota_{\partial_1}(e^1\wedge e^2)=e^2$、$\iota_{\partial_1}(e^2\wedge e^3)=0$ なので

$$
\iota_{\xi^\sharp}v=ab\,e^2.
$$

それぞれの基底形式はノルム1、$v$ の二つの項も直交します。従って

$$
|\xi\wedge v|^2+|\iota_{\xi^\sharp}v|^2
=a^2(c^2+b^2)=|\xi|^2|v|^2.
$$

$\xi\ne0$ なら右辺は $v\ne0$ で正です。一般の形式も $\xi$ 方向を含む項と含まない項に直交分解できるため、[楕円型評価の証明](#lem-ga6-elliptic)と同じ等式が成り立ちます。$d$ だけでは $b$ 成分を検出できませんが、$\delta$ の主記号がその成分を検出します。この補完が楕円性の本質です。
<!-- solution-end -->

### Level C：分解・位相・作用素を統合する

<a id="ex-ga6-c01"></a>
#### GA6-C01 トーラスのHodge分解を実際に構成する
- Level: C

平坦 $\mathbb T^2$（周期 $2\pi$）で

$$
\omega=(2+\cos x)\,dx+(3+\sin x)\,dy
$$

を考える。(i) $d\omega,\delta\omega$ を求める。(ii) 調和・完全・余完全の直交分解を具体的な原始形式を添えて作る。(iii) $\omega$ がde Rham類を定めるか判定する。(iv) 閉形式 $\widetilde\omega=(2+\cos x)\,dx+3\,dy$ の調和代表と類を求め、Betti数との関係を述べよ。

<!-- solution-start -->
**詳細解答**

(i) [外微分の定義](../../GEO/GEO7/index.md#def-geo7-exterior-derivative)と[余微分の定義](#def-ga6-codifferential)に係数を代入すると

$$
d\omega=d(3+\sin x)\wedge dy=\cos x\,dx\wedge dy,
$$

$$
\delta\omega=-\partial_x(2+\cos x)-\partial_y(3+\sin x)=\sin x.
$$

(ii) 調和成分は係数の定数部分 $h=2dx+3dy$ です。$d h=\delta h=0$ が直接確認できます。残りを

$$
d(\sin x)=\cos x\,dx,\qquad
\delta(\cos x\,dx\wedge dy)=\sin x\,dy
$$

と書けるため

$$
\omega=(2dx+3dy)+d(\sin x)+\delta(\cos x\,dx\wedge dy).
$$

最初は調和、次は完全、最後は余完全です。[三成分の直交性](#thm-ga6-hodge-decomposition)で互いに直交することも保証され、例えば調和1形式との積分では正弦・余弦の積分が零です。

(iii) $d\omega=\cos x\,dx\wedge dy$ は恒等的に零ではありません。従って $\omega$ は閉形式でなく、[de Rhamコホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)から $[\omega]$ を作ることはできません。Hodge分解は非閉形式にも成立する点を区別します。

(iv) $\widetilde\omega=2dx+3dy+d(\sin x)$ なので閉形式であり、[Hodge--de Rham同型](#thm-ga6-hodge-de-rham)による一意な調和代表は $2dx+3dy$。従って $[\widetilde\omega]=2[dx]+3[dy]$ です。$dx,dy$ は直交する非零の調和形式で、他の調和1形式は係数の調和関数性から定数係数に限られるので、$b_1(\mathbb T^2)=2$。零次・二次も定数係数だけで $b_0=b_2=1$ です。
<!-- solution-end -->

ここで得たのは、計量に依存して選ばれる調和形式の空間と、計量によらないde Rhamコホモロジーが**自然な代表元の対応で同型になる**という事実です。次のGA7では、調和形式が存在するかどうかに曲率がどう介入するかを、Bochner--Weitzenböck公式で調べます。
