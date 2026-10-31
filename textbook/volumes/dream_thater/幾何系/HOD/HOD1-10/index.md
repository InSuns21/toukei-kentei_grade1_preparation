# HOD1-10 調和形式上のLefschetz作用

<!-- definition-example-audit: strict -->

## 1. 点ごとの外積を、位相的な情報へ移したい

前章では、複素トーラスや射影直線の[調和代表とHodge数](../HOD1-09/index.md#thm-hod1-09-torus-numbers)を実際に数えた。一方、[Lefschetz作用素](../HOD1-02/index.md#def-hod1-02-lefschetz) $L\alpha=\omega\wedge\alpha$ は、微分形式の次数を二つ上げる。問題は、$L$ が**コホモロジー類の作用**にもなるか、さらにその類の一意な調和代表を直接移すか、という二段階に分かれる。

- $d\omega=0$ は、外積を閉形式・完全形式と両立させる条件である。
- [Kähler上のLaplacian可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz) は、$L$ が調和性を保つ条件である。
- [Hodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition) は、調和形式とコホモロジー類を結び付ける。

これらは別々の主張なので、順に接続していく。以下では特に断らなければ、$X$ は**複素次元 $n\ge1$ の滑らか・コンパクト・境界なしのKähler多様体**、$\omega$ はその実基本 $(1,1)$ 形式、微分形式は複素数値で滑らかなものとする。連結性は要求しない。$0\le k\le2n$ とし、範囲外の次数の形式空間・コホモロジーは零と約束する。

微分形式の次数は $\deg\alpha$、閉形式のde Rham類は $[\alpha]_d$、その次数 $k$ の群は $H^k_{\mathrm{dR}}(X;\mathbb C)$ と記す。[閉形式・完全形式](../../GEO/GEO9/index.md#def-geo9-closed-exact)および[de Rhamコホモロジー](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)は既習である。

作用素の高冪については $L^0=I$ と約束し、整数 $r\ge1$ に対して

$$
L^r\alpha=\omega^r\wedge\alpha
$$

と書く。ここで $\omega^r$ は基本2形式の $r$ 回の外積を表し、スカラーのべきとは区別する。

## 2. なぜ閉形式の外積でコホモロジーの積を作れるか

**最小例。** 平坦な二次元実トーラス $T=\mathbb R^2/\mathbb Z^2$ では、$dx,dy$ は大域的な閉1形式であり、$dx\wedge dy$ は閉2形式となる。その積分は、標準向きで $\int_Tdx\wedge dy=1$。もしこれが完全形式なら[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分は零になるため、非零の二次類を表す。こうして**一次類を二つ掛けて二次類を作る**操作が見えてくる。

ところが同じ類には $dx+df$ のように多数の代表がある。代表を変えるたび積が変わってしまえば、コホモロジー上の演算にならない。まずこの代表非依存性を定義と計算で確かめる。

<a id="def-hod1-10-de-rham-product"></a>

<!-- formal-statement-start -->
> **定義（de Rham類の積）**
> $X$ を滑らかな多様体とし、$[\alpha]_d\in H^p_{\mathrm{dR}}(X;\mathbb C)$、$[\beta]_d\in H^q_{\mathrm{dR}}(X;\mathbb C)$ を閉形式の類とする。**de Rham類の積**を

$$
[\alpha]_d\smile[\beta]_d:=[\alpha\wedge\beta]_d
\in H^{p+q}_{\mathrm{dR}}(X;\mathbb C)
$$

> と定める。$\smile$ はコホモロジーのcup積を表す記号である。この定義では右辺が代表の選び方によらないことを次の命題で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-10-de-rham-product -->
**定義の確認**（平坦な二次元トーラス）。先ほどの $T$ 上で $\alpha=dx$、$\beta=dy$ とすると、どちらも閉形式で $[dx]_d\smile[dy]_d=[dx\wedge dy]_d\ne0$ となる。さらに $f(x,y)=\sin(2\pi x)/(2\pi)$ とし、$\alpha'=dx+df$ と置く。$f$ は周期的だから $df$ は大域的な完全1形式である。$d\alpha'=d\beta=0$、$[\alpha']_d=[dx]_d$ を直接確認できる。積の差は

$$
\alpha'\wedge\beta-\alpha\wedge\beta
=df\wedge dy=d(f\,dy)
$$

で完全である。従って $[\alpha']_d\smile[\beta]_d=[dx\wedge dy]_d$ で、非零性も積分から変わらない。閉性・代表非依存性・積の次数という定義の要点を一つの例で検査した。
<!-- definition-example-end -->

<a id="prop-hod1-10-product-well-defined"></a>

<!-- formal-statement-start -->
> **命題（外積によるde Rham積のwell-defined性）**
> 滑らかな多様体 $X$ の閉 $p$ 形式 $\alpha$ と閉 $q$ 形式 $\beta$ に対し、$[\alpha\wedge\beta]_d$ は各代表の選び方によらず定まる。得られる積は複素双線形、結合的で、次数付き交換則

$$
[\alpha]_d\smile[\beta]_d
=(-1)^{pq}[\beta]_d\smile[\alpha]_d
$$

> を満たす。次数0の定数形式 $1$ の類は単位元である。
<!-- formal-statement-end -->

### 証明の見取り図

[外微分の次数付きLeibniz則](../../CM/CM2-02/index.md#prop-cm2-02-graded-leibniz) を閉形式とその完全な差へ適用する。代表をどちら側で変えても、その変化が完全形式に吸収されることが核心である。

<!-- proof-start -->
### 証明

まず $d\alpha=d\beta=0$ と $\deg\alpha=p$ から

$$
d(\alpha\wedge\beta)
=d\alpha\wedge\beta+(-1)^p\alpha\wedge d\beta=0.
$$

従って積は閉形式を与える。$\alpha$ の代表を $\alpha+d\sigma$（$\deg\sigma=p-1$）へ変えた場合、$d\beta=0$ を使うと

$$
\begin{aligned}
(\alpha+d\sigma)\wedge\beta-\alpha\wedge\beta
&=d\sigma\wedge\beta\\
&=d(\sigma\wedge\beta)-(-1)^{p-1}\sigma\wedge d\beta\\
&=d(\sigma\wedge\beta).
\end{aligned}
$$

一方、$\beta$ の代表を $\beta+d\tau$（$\deg\tau=q-1$）へ変えれば

$$
\begin{aligned}
\alpha\wedge(\beta+d\tau)-\alpha\wedge\beta
&=\alpha\wedge d\tau\\
&=(-1)^p d(\alpha\wedge\tau),
\end{aligned}
$$

ここでも $d\alpha=0$ を用いた。両側を変える場合も、先に第一代表、次に第二代表と変えればよく、途中の $\beta+d\tau$ も閉形式である。従って代表非依存性が成立する。

外積の双線形性・結合性から類の積にもそれぞれの性質が移る。$\alpha\wedge\beta=(-1)^{pq}\beta\wedge\alpha$ を取れば次数付き交換則を得る。また $1\wedge\alpha=\alpha=\alpha\wedge1$ である。$\square$
<!-- proof-end -->

この積は微分形式を用いた **de Rham コホモロジー環**の積である。位相的な特異コホモロジーのcup積とは、積を保つde Rham同型を通して対応する。ただし本章の作用を定義・計算するためには、その比較定理を黒箱として使う必要はなく、上の外積と代表非依存性だけで足りる。

## 3. Kähler類を掛ける作用素と調和代表

[Kähler類の定義](../../KAH/KAH1-13/index.md#def-kah1-13-class)により、基本形式 $\omega$ が $d\omega=0$ を満たすので $[\omega]_d\in H^2_{\mathrm{dR}}(X;\mathbb R)$ は定義できる。ここでは実類を複素係数へ自然に写し、同じ $[\omega]_d$ と書く。以下の $L$ は**$[\omega]_d$ 自身を掛ける**もので、$[\omega/(2\pi)]_d$ を掛ける作用と取り違えない。

まず代表をコホモロジーへ移す写像を明示しよう。$[\alpha]_d$ に対して $[\omega\wedge\alpha]_d$ を対応させる。これは前節の積であり、$\alpha$ がどの閉代表でも同じ類を与える。次に $\alpha$ を調和代表 $h$ に取ったとき、$\omega\wedge h$ も調和になるかを調べる。

<a id="thm-hod1-10-harmonic-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（調和代表とコホモロジー上のLefschetz作用）**
> $X$ を複素次元 $n\ge1$ の滑らか・コンパクト・境界なしのKähler多様体、$\omega$ をその基本形式とする。各 $0\le k\le2n$ に対し $L\alpha=\omega\wedge\alpha$ とおく。
>
> **（1）** $L$ は $\mathcal H^k(X)$ を $\mathcal H^{k+2}(X)$ に写す。
>
> **（2）** コホモロジー上の複素線形写像を

$$
L_H:H^k_{\mathrm{dR}}(X;\mathbb C)
\longrightarrow H^{k+2}_{\mathrm{dR}}(X;\mathbb C),
\qquad L_H[\alpha]_d=[\omega]_d\smile[\alpha]_d
$$

> と定められる。$h$ が $[\alpha]_d$ の一意な調和代表なら、$Lh$ は $L_H[\alpha]_d$ の一意な調和代表である。
>
> **（3）** $r\ge0$ に対し、次数の範囲内で

$$
L^rh=\omega^r\wedge h\in\mathcal H^{k+2r}(X),
\qquad L_H^r[\alpha]_d=[\omega]_d^r\smile[\alpha]_d
$$

> が成り立つ。$k+2r>2n$ の場合は両辺を零とする。
<!-- formal-statement-end -->

### 証明の見取り図

$d\omega=0$ はコホモロジー上の作用を定義する。[Laplacianとの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz) は調和性を保つ。最後に[調和代表の一意性](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を使い、二つの経路が同じ類を与えることを確認する。

<!-- proof-start -->
### 証明

**（1）調和性。** $h\in\mathcal H^k(X)$ なら $\Delta_dh=0$ である。[Kähler上の可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を、次数 $k$ の滑らかな形式 $h$ に適用すると

$$
\Delta_d(Lh)=L(\Delta_dh)=L0=0.
$$

$\omega$ が2形式なので $Lh$ の次数は $k+2$。従って $Lh\in\mathcal H^{k+2}(X)$ である。次数上限を超えたときは零形式となる。

**（2）類の作用と代表の一致。** $d\omega=0$ と、[調和形式の閉・余閉判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)から $dh=0$ を得る。よって[次数付きLeibniz則](../../CM/CM2-02/index.md#prop-cm2-02-graded-leibniz)で

$$
d(\omega\wedge h)=d\omega\wedge h+(-1)^2\omega\wedge dh=0.
$$

任意の閉代表 $\alpha$ を別の閉代表 $\alpha+d\beta$ に変えると

$$
\omega\wedge(\alpha+d\beta)-\omega\wedge\alpha
=\omega\wedge d\beta=d(\omega\wedge\beta),
$$

最後の等号では $d\omega=0$ を使った。従って $[\omega\wedge\alpha]_d$ は代表によらず、[de Rham積](#prop-hod1-10-product-well-defined)により $[\omega]_d\smile[\alpha]_d$ と等しい。これで $L_H$ はwell-definedで複素線形である。

[実Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)を複素線形に延長すれば、$[\alpha]_d$ に対し $h\in\mathcal H^k(X)$ がただ一つ存在し、ある滑らかな $(k-1)$ 形式 $\beta$ によって $\alpha=h+d\beta$ と書ける。そこで

$$
\begin{aligned}
[\omega\wedge\alpha]_d
&=[\omega\wedge h+\omega\wedge d\beta]_d\\
&=[Lh+d(\omega\wedge\beta)]_d\\
&=[Lh]_d.
\end{aligned}
$$

（1）より $Lh$ は調和形式なので、一意性から $L_H[\alpha]_d$ の**まさにその調和代表**である。$k=0$ の場合の $\beta$ は不要で、$\alpha=h$ として同じ結論が成り立つ。

**（3）高冪。** $r=0$ は恒等写像。$L^rh$ が調和であると仮定すると、（1）を次数 $k+2r$ の $L^rh$ に適用して $L^{r+1}h$ も調和である。また外積の結合性と[類の積](#prop-hod1-10-product-well-defined)から

$$
\begin{aligned}
L_H^{r+1}[\alpha]_d
&=[\omega]_d\smile\bigl([\omega]_d^r\smile[\alpha]_d\bigr)\\
&=[\omega]_d^{r+1}\smile[\alpha]_d\\
&=[\omega^{r+1}\wedge h]_d.
\end{aligned}
$$

従って帰納法で全ての $r$ に成立する。$\square$
<!-- proof-end -->

この定理の役割は「微分形式の $L$ → 調和形式の $L$ → 類上の $L_H$」の三段階をつなぐことにある。**$L_H$ がどの次数で単射・全射・同型になるかは、まだこの証明からは出ていない。** それが次章の中心問題となる。

## 4. Hodge型と随伴作用も同じ調和空間で扱える

$\omega$ は $(1,1)$ 型なので、[型の外積規則](../HOD1-02/index.md#prop-hod1-02-bidegree)により $(p,q)$ 形式 $h$ に $L$ を作用させると $(p+1,q+1)$ 型になる。これと前節の調和性を合わせると、各型のHodge成分でも作用を追える。

<a id="prop-hod1-10-hodge-type-shift"></a>

<!-- formal-statement-start -->
> **命題（Lefschetz作用とHodge型）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。$0\le p,q\le n$ なら、調和形式上の作用 $L=\omega\wedge(-)$ は

$$
L:\mathcal H^{p,q}(X)\longrightarrow
\mathcal H^{p+1,q+1}(X)
$$

> を与え、[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)によりコホモロジーの型成分にも同じ $(1,1)$ の移動を誘導する。$p=n$ または $q=n$ の場合、行き先は零空間である。
<!-- formal-statement-end -->

### 証明の見取り図

型の変化と調和性の保存は異なる入力である。前者は $\omega$ の型、後者は[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)に基づく[Laplacian可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を使い、最後にHodge分解の同型へ渡す。

<!-- proof-start -->
### 証明

$h\in\mathcal H^{p,q}(X)$ とする。局所的に $h$ は $p$ 個の $dz$ と $q$ 個の $d\bar z$ の外積和である。一方 $\omega$ は各項に $dz^j$ と $d\bar z^k$ を一つずつ含む。従って $\omega\wedge h$ の各非零項は $p+1$ 個と $q+1$ 個を含み、型は $(p+1,q+1)$ である。[調和代表の作用定理](#thm-hod1-10-harmonic-lefschetz)（1）により $\Delta_d(Lh)=0$ だから、指定の型別調和空間に入る。

[Hodge分解による型部分空間](../HOD1-06/index.md#def-hod1-06-hodge-summand)は純型調和代表の類で定義される。$[h]_d$ へ $L_H$ を作用させると $[Lh]_d$ で、代表が $(p+1,q+1)$ 型の調和形式だから、行き先は対応するHodge型部分空間となる。$p=n$ なら $n+1$ 個の $dz$ を外積できず零であり、$q=n$ も同様である。$\square$
<!-- proof-end -->

[随伴作用素](../HOD1-02/index.md#def-hod1-02-lambda) $\Lambda=L^*$ は二次下げる。ここでは $\Lambda$ が閉形式すべてを閉形式へ写すとは言えない点に注意したい。調和形式上なら、[Laplacianとの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)によって $\Lambda:\mathcal H^{p,q}\to\mathcal H^{p-1,q-1}$ が成り立ち、Hodge–de Rham同型を通して**調和代表を経由する作用**としてのみ類上に移せる。

実際、平坦な複素一次元トーラスで、非定数の周期関数 $f(x)=1+\frac12\cos2\pi x$ と閉2形式 $\alpha=f\omega$ を取る。[次数交換子公式](../HOD1-02/index.md#thm-hod1-02-commutator)を次数0の定数 $1$ に使えば $\Lambda\omega=1$ なので、$\Lambda\alpha=f$ となる。しかし $df\ne0$ だから $\Lambda\alpha$ は閉0形式でない。従って任意の閉代表 $\alpha$ に $[\Lambda\alpha]_d$ と書くのは一般に不適切である。

<a id="prop-hod1-10-harmonic-sl2"></a>

<!-- formal-statement-start -->
> **命題（調和形式上のLefschetz三作用素）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。全次数の有限次元複素調和形式空間 $\mathcal H^\bullet(X)$ 上で、$L$、$\Lambda=L^*$、$H=[\Lambda,L]$ は調和形式を保ち、$h\in\mathcal H^k(X)$ に対して

$$
Hh=(n-k)h,
\qquad[H,\Lambda]h=2\Lambda h,
\qquad[H,L]h=-2Lh
$$

> が成り立つ。これは調和形式上の作用素関係であって、ここではその同型性をまだ主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ と $\Lambda$ が調和形式を保てば、その合成と差 $H$ も保つ。[点ごとの $\mathfrak{sl}_2$ 関係](../HOD1-03/index.md#thm-hod1-03-sl2)を調和形式へ制限するだけである。

<!-- proof-start -->
### 証明

[調和性と両作用素の可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を調和 $k$ 形式 $h$ に適用すると

$$
\Delta_d(Lh)=L(\Delta_dh)=0,
\qquad
\Delta_d(\Lambda h)=\Lambda(\Delta_dh)=0.
$$

従って $\Lambda Lh$ と $L\Lambda h$ も調和であり、その差 $Hh$ も調和である。任意の点 $x\in X$ で、次数 $k$ の外積代数の元 $h_x$ に[次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)を当てると

$$
(Hh)_x=(n-k)h_x.
$$

$x$ は任意なので大域の式となる。また[点ごとの交換関係](../HOD1-03/index.md#thm-hod1-03-sl2)を各点の $h_x$ に適用すれば、二つの交換子式が全体で成り立つ。$\square$
<!-- proof-end -->

## 5. 低次元で作用と係数を手計算する

### 楕円曲線：ゼロ次類から体積類へ

$E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$、$\tau=a+ib$、$b>0$ に標準Euclid計量を降ろす。[平坦Kähler構造](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)の基本形式は、$z=x+iy$ として

$$
\omega=dx\wedge dy=\frac{i}{2}dz\wedge d\bar z.
$$

これは $\omega=i\,g_{z\bar z}dz\wedge d\bar z$ という規約で $g_{z\bar z}=1/2$ に対応する。格子の二つの生成元 $1,\tau$ が張る平行四辺形を $(s,t)\mapsto(s+at,bt)$（$0\le s,t\le1$）で置くと

$$
\int_{E_\tau}\omega
=\int_0^1\!\int_0^1 b\,ds\,dt=b>0.
$$

調和0形式 $1$ は $L1=\omega$ へ写り、$[\omega]_d\ne0$ はこの積分で確かめられる。次数1の任意の $h$ は $Lh$ が次数3となって零、次数2の $\omega$ も $L\omega=0$ である。[楕円曲線のHodge数](../HOD1-09/index.md#prop-hod1-09-elliptic-periods)と矛盾しない。

### 射影直線：$2\pi$ は消えない

[Fubini–Study形式の面積公式](../../KAH/KAH1-07/index.md#thm-kah1-07-area)では $\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$ である。積分が $1$ となる類 $u=[\omega_{\mathrm{FS}}/(2\pi)]_d$ を基底にすると

$$
L_H[1]_d=[\omega_{\mathrm{FS}}]_d=2\pi u,
\qquad L_Hu=0.
$$

ここで $2\pi$ を落とすと、Lefschetz作用を別のクラスによる積へ無断で変更してしまう。$u$ が次数2であるため第二式は次数4の零群への写像である。

### 射影直線の積：中央次数には核もある

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ には[積Kähler形式](../../KAH/KAH1-05/index.md#thm-kah1-05-product) $\omega=\pi_1^*\omega_{\mathrm{FS}}+\pi_2^*\omega_{\mathrm{FS}}$ を入れる。$u=[\pi_1^*\omega_{\mathrm{FS}}/(2\pi)]_d$、$v=[\pi_2^*\omega_{\mathrm{FS}}/(2\pi)]_d$ とする。$u^2=v^2=0$ は各因子が実次元2であるため、$uv$ は積分 $\int_Q u\smile v=1$ の非零四次類である。[積のHodge数](../HOD1-09/index.md#thm-hod1-09-product-hodge)は $\dim H^2=2$、$\dim H^4=1$ を与える。そこで

$$
\begin{aligned}
L_H[1]_d&=2\pi(u+v),\\
L_Hu&=2\pi(u^2+vu)=2\pi uv,\\
L_Hv&=2\pi(uv+v^2)=2\pi uv,\\
L_H^2[1]_d&=(2\pi)^2(u+v)^2=2(2\pi)^2uv.
\end{aligned}
$$

と計算できる。従って $L_H(u-v)=0$ だが $u-v\ne0$。**中央次数 $2$ から次数 $4$ の $L_H$ が単射とは限らない**ことを示す例である。次章で検証する同型は $k\le n$ での特定の冪 $L_H^{n-k}$ なので、これと矛盾しない。

## 6. 閉性と調和性を混同すると何が壊れるか

閉2形式 $\eta$ があれば、[外積によるde Rham積のwell-defined性](#prop-hod1-10-product-well-defined)により $[\eta]$ との外積は類上でwell-definedである。しかし、**任意の閉2形式で調和代表がそのまま調和へ移るわけではない**。

標準平坦トーラス $T=\mathbb R^2/\mathbb Z^2$ の固定したEuclid計量に対して、$0<\varepsilon<1$ として

$$
\eta=(1+\varepsilon\cos2\pi x)\,dx\wedge dy
$$

と置く。実次元2では全ての2形式が閉じているので $d\eta=0$。ただし $\eta$ はこの**固定計量の基本形式 $\omega=dx\wedge dy$ ではない**。先行章の[平坦Laplacian計算](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)を係数 $f(x)=1+\varepsilon\cos2\pi x$ に適用すると

$$
\Delta_d\eta=-(\partial_x^2f)\,dx\wedge dy
=4\pi^2\varepsilon\cos2\pi x\,dx\wedge dy\ne0.
$$

一方 $1$ は固定計量で調和なので、$\eta\wedge1=\eta$ は**閉だが調和ではない**。実際 $\eta-\omega=d\bigl((\varepsilon/2\pi)\sin2\pi x\,dy\bigr)$ だから、類は同じで調和代表だけが異なる。失われたのは $d\eta=0$ ではなく、固定したKähler計量との整合性および $[\eta\wedge(-),\Delta_d]=0$ である。

さらに、実四次元トーラス上の $\zeta=\cos(2\pi x_1)\,dx_2\wedge dy_2$ なら

$$
d\zeta=-2\pi\sin(2\pi x_1)\,dx_1\wedge dx_2\wedge dy_2\ne0.
$$

この場合は $\zeta\wedge1$ 自体が閉じておらず、コホモロジー類への作用を定義する最初の段階で失敗する。**閉性**は類を作る条件、**KählerとLaplacianの可換性**は調和代表を保つ条件、と区別しよう。

## 7. 演習：代表、型、係数を自分でつなぐ

### Level A：一つずつ作用を確認する

<a id="ex-hod1-10-a01"></a>
#### HOD1-10-A01 閉形式の積と次数
- Level: A

$T=\mathbb R^2/\mathbb Z^2$ の $\alpha=dx$、$\beta=dy$ を考える。$[\alpha]_d\smile[\beta]_d$ の次数、積分、逆順の積を求め、$[\alpha]_d$ と $[\beta]_d$ がそれぞれ定義できる理由も述べよ。

<!-- solution-start -->
### 詳細解答

$d(dx)=d(dy)=0$ だから両者は[閉形式のde Rham類](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)を定める。両者は次数1なので[積の定義](#def-hod1-10-de-rham-product)により積は次数2である。標準向きで

$$
[\alpha]_d\smile[\beta]_d=[dx\wedge dy]_d,
\qquad\int_Tdx\wedge dy=1.
$$

従って非零類である。外積の次数付き交換則で $dy\wedge dx=-dx\wedge dy$ だから、逆順は $[dy]_d\smile[dx]_d=-[dx\wedge dy]_d$、その積分は $-1$ になる。
<!-- solution-end -->

<a id="ex-hod1-10-a02"></a>
#### HOD1-10-A02 楕円曲線のLefschetz像
- Level: A

$E=\mathbb C/(\mathbb Z+2i\mathbb Z)$ に標準Euclid計量を入れる。$\omega=dx\wedge dy$ として $\int_E\omega$、$L_H[1]_d$、$L_H[dx]_d$ を計算せよ。

<!-- solution-start -->
### 詳細解答

格子の二つの生成元 $1,2i$ が張る平行四辺形を $z=s+2it$ とおけば $x=s,y=2t$ であり、$dx\wedge dy=2\,ds\wedge dt$。従って

$$
\int_E\omega=\int_0^1\!\int_0^1 2\,ds\,dt=2.
$$

[調和代表とコホモロジー上のLefschetz作用](#thm-hod1-10-harmonic-lefschetz)から $L_H[1]_d=[\omega]_d$ であり、積分が $2$ なので非零。$dx$ は一次形式で $\omega\wedge dx=dx\wedge dy\wedge dx=0$（$dx$ が二度現れる）。ゆえに $L_H[dx]_d=0$。複素次元1では次数3のコホモロジー群自体が零であることとも一致する。
<!-- solution-end -->

<a id="ex-hod1-10-a03"></a>
#### HOD1-10-A03 Fubini–Study類の規格化
- Level: A

$X=\mathbb{CP}^1$ とし、$u=[\omega_{\mathrm{FS}}/(2\pi)]_d$ とする。$L_H[1]_d$ を $u$ で表し、$\int_X u$ と $L_Hu$ を求めよ。

<!-- solution-start -->
### 詳細解答

[Fubini–Study面積](../../KAH/KAH1-07/index.md#thm-kah1-07-area)が $\int_X\omega_{\mathrm{FS}}=2\pi$ なので、$\int_Xu=1$ である。基本形式そのものによる[類上の作用](#thm-hod1-10-harmonic-lefschetz)を使うため

$$
L_H[1]_d=[\omega_{\mathrm{FS}}]_d=2\pi u.
$$

$u$ は次数2で $L_Hu$ は次数4へ移るが、$X$ の実次元は2だから $H^4_{\mathrm{dR}}(X;\mathbb C)=0$。従って $L_Hu=0$ である。$2\pi$ を捨てて $u$ と答えるのは作用を取り違えたことになる。
<!-- solution-end -->

<a id="ex-hod1-10-a04"></a>
#### HOD1-10-A04 型の移動と境界
- Level: A

複素次元 $n=2$ のコンパクトKähler多様体で、$h\in\mathcal H^{1,0}(X)$、$g\in\mathcal H^{2,0}(X)$ とする。$Lh$ と $Lg$ の型および調和性を述べ、どちらが必ず零か説明せよ。

<!-- solution-start -->
### 詳細解答

$\omega$ は $(1,1)$ 型なので[型の移動](#prop-hod1-10-hodge-type-shift)を当てれば $Lh\in\mathcal H^{2,1}(X)$、$Lg\in\mathcal H^{3,1}(X)$ である。いずれも[可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)で調和的となる。ただし複素次元2では $(3,1)$ 型の形式は、三つの正則一次形式を楔積する時点で零になる。従って $Lg=0$ は必然だが、$Lh$ が零であることは型・調和性だけからは従わない。
<!-- solution-end -->

### Level B：仮定と証明を組み合わせる

<a id="ex-hod1-10-b01"></a>
#### HOD1-10-B01 二つの代表を同時に変える
- Level: B

滑らかな多様体上の閉 $p$ 形式 $\alpha$、閉 $q$ 形式 $\beta$、$(p-1)$ 形式 $\sigma$、$(q-1)$ 形式 $\tau$ を取る。$\alpha'=\alpha+d\sigma$、$\beta'=\beta+d\tau$ に対し、$\alpha'\wedge\beta'-\alpha\wedge\beta$ が完全となる原始形式を符号込みで構成せよ。

<!-- solution-start -->
### 詳細解答

外積を四項に展開する。

$$
\alpha'\wedge\beta'-\alpha\wedge\beta
=d\sigma\wedge\beta+\alpha\wedge d\tau+d\sigma\wedge d\tau.
$$

[次数付きLeibniz則](../../CM/CM2-02/index.md#prop-cm2-02-graded-leibniz)と $d\alpha=d\beta=d^2\tau=0$ により、各項は

$$
\begin{aligned}
d\sigma\wedge\beta&=d(\sigma\wedge\beta),\\
\alpha\wedge d\tau&=d\bigl((-1)^p\alpha\wedge\tau\bigr),\\
d\sigma\wedge d\tau&=d(\sigma\wedge d\tau).
\end{aligned}
$$

従って $\gamma=\sigma\wedge\beta+(-1)^p\alpha\wedge\tau+\sigma\wedge d\tau$ と置けば、差は $d\gamma$ に等しい。$\gamma$ の次数は各項とも $p+q-1$ であり、両側を変えても[de Rham積](#def-hod1-10-de-rham-product)が同じ類になることを直接示した。
<!-- solution-end -->

<a id="ex-hod1-10-b02"></a>
#### HOD1-10-B02 閉性だけでは調和性を保てない
- Level: B

固定した平坦計量の $T=\mathbb R^2/\mathbb Z^2$ で $\eta=(1+\frac12\cos2\pi x)dx\wedge dy$ とする。$d\eta=0$、$[\eta]_d=[dx\wedge dy]_d$、$\Delta_d\eta\ne0$ を順に示せ。この反例でどの仮定を失ったか説明せよ。

<!-- solution-start -->
### 詳細解答

$\eta$ は実二次元多様体上の最高次形式なので、$d\eta$ は三次形式となり零である。$\theta=\sin(2\pi x)dy/(4\pi)$ と置けば

$$
d\theta=\frac12\cos(2\pi x)dx\wedge dy,
\qquad\eta=dx\wedge dy+d\theta.
$$

従って同じde Rham類を定める。他方、[平坦Laplacianの係数公式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)は非負符号で $\Delta_d(f\,dx\wedge dy)=-\partial_x^2f\,dx\wedge dy$ だから

$$
\Delta_d\eta=2\pi^2\cos(2\pi x)dx\wedge dy\ne0.
$$

失ったのは閉性ではない。$\eta$ は固定Euclid計量の基本形式 $\omega=dx\wedge dy$ ではなく、[Kähler形式のLaplacian可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を $\eta\wedge(-)$ へ適用できない。従って調和な $1$ の像 $\eta$ は調和でなくても、類上の積は定義できる。
<!-- solution-end -->

<a id="ex-hod1-10-b03"></a>
#### HOD1-10-B03 調和代表で計算する順序
- Level: B

コンパクトKähler多様体 $X$ で閉 $k$ 形式 $\alpha=h+d\beta$ と書け、$h$ は調和とする。$\omega\wedge\alpha$ が閉形式で $[\omega\wedge\alpha]_d=[\omega\wedge h]_d$ となることを示し、なぜ $\omega\wedge h$ がその類の調和代表と言えるか述べよ。

<!-- solution-start -->
### 詳細解答

$d\omega=0$ と $d\alpha=0$ を[外微分のLeibniz則](../../CM/CM2-02/index.md#prop-cm2-02-graded-leibniz)へ入れると、$d(\omega\wedge\alpha)=d\omega\wedge\alpha+\omega\wedge d\alpha=0$。さらに

$$
\omega\wedge\alpha
=\omega\wedge h+\omega\wedge d\beta
=\omega\wedge h+d(\omega\wedge\beta).
$$

二項の差は完全形式なので同じ類を定める。[Laplacianとの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)から $\Delta_d(\omega\wedge h)=\omega\wedge\Delta_dh=0$。最後に[コンパクト境界なしのHodge–de Rham同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)の一意性を用いるので、単に閉形式だというだけで調和代表と呼んだのではない。
<!-- solution-end -->

<a id="ex-hod1-10-b04"></a>
#### HOD1-10-B04 随伴作用を代表へ直接適用できるか
- Level: B

$X$ をコンパクトKähler多様体とし、$\Lambda=L^*$ とする。調和形式 $h$ に $\Lambda$ が作用できる理由を述べよ。一方、任意の閉形式 $\alpha$ に対して $[\Lambda\alpha]_d$ と書いてコホモロジー作用を定義してよいか検討せよ。

<!-- solution-start -->
### 詳細解答

[Laplacianと $\Lambda$ の交換関係](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)により $\Delta_dh=0$ なら

$$
\Delta_d(\Lambda h)=\Lambda(\Delta_dh)=0.
$$

従って $\Lambda h$ は調和で、コンパクト境界なしなら[エネルギー判定](../HOD1-05/index.md#thm-hod1-05-harmonic-types)により閉形式である。一方、一般の閉形式を $\Lambda$ が閉形式へ送る保証はない。

平坦複素一次元トーラスで非定数周期関数 $f(x)=1+\frac12\cos2\pi x$ を取り、閉2形式 $\alpha=f\omega$ を作る。[次数公式](../HOD1-02/index.md#thm-hod1-02-commutator)から $\Lambda\omega=1$ なので

$$
\Lambda\alpha=f,
\qquad d(\Lambda\alpha)=df=-\pi\sin2\pi x\,dx\ne0.
$$

従って $[\Lambda\alpha]_d$ は定義できない。類 $[\alpha]_d$ に対してまず[一意な調和代表](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition) $h$ を選び、その後 $[\Lambda h]_d$ とする必要がある。この操作は $[\omega]\smile(-)$ と違って任意代表への外積式ではない。
<!-- solution-end -->

### Level C：複数の作用を一度につなぐ

<a id="ex-hod1-10-c01"></a>
#### HOD1-10-C01 複素二次元トーラスの一次類を追跡する
- Level: C

$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ の標準Euclid計量で、$\omega=dx_1\wedge dy_1+dx_2\wedge dy_2$ とする。$h=dx_1$ について、次を示せ。

1. $h$ と $Lh$ が調和形式である。
2. $L_H[h]_d$ の非零性を、$dy_1$ との外積の全積分から示す。
3. $dz^1=dx_1+i\,dy_1$ に替えたときの像のHodge型を述べる。

<!-- solution-start -->
### 詳細解答

**1.** $h=dx_1$ と $\omega$ は定数係数である。[平坦トーラスの調和形式の特徴付け](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)から $h$ は調和であり、[Kähler上のLefschetz可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)から $Lh$ も調和である。外積を直接展開すると

$$
Lh=(dx_1\wedge dy_1+dx_2\wedge dy_2)\wedge dx_1
=dx_2\wedge dy_2\wedge dx_1.
$$

**2.** 標準向き $dx_1\wedge dy_1\wedge dx_2\wedge dy_2$ での全積分は $1$ である。$Lh\wedge dy_1$ の因子順を直すと、$dx_2,dy_2$ を $dx_1,dy_1$ の後ろへ移す4回の交換なので正符号となり

$$
\int_TLh\wedge dy_1
=\int_Tdx_1\wedge dy_1\wedge dx_2\wedge dy_2=1.
$$

もし $Lh$ が完全ならこの積は $d(\beta\wedge dy_1)$ と書け、[Stokes](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分は零になる。従って $L_H[dx_1]_d=[Lh]_d\ne0$。

**3.** $dz^1$ は $(1,0)$ 型で調和的だから、[型の移動](#prop-hod1-10-hodge-type-shift)より $L(dz^1)\in\mathcal H^{2,1}(T)$。実際

$$
L(dz^1)=dx_2\wedge dy_2\wedge dz^1
=\frac i2 dz^2\wedge d\bar z^2\wedge dz^1,
$$

と $(2,1)$ 型の外積になる。ここでも正規化 $\omega_j=(i/2)dz^j\wedge d\bar z^j$ を使った。
<!-- solution-end -->

<a id="ex-hod1-10-c02"></a>
#### HOD1-10-C02 射影直線の積で核と二乗を調べる
- Level: C

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ に積Fubini–Study計量を入れ、$u=[\pi_1^*\omega_{\mathrm{FS}}/(2\pi)]_d$、$v=[\pi_2^*\omega_{\mathrm{FS}}/(2\pi)]_d$ とする。$H^2$ の基底が $u,v$ で、$\int_Q u\smile v=1$、$u^2=v^2=0$ とする。

1. $L_H:H^2\to H^4$ の行列表現を、基底 $(u,v)$ と $(uv)$ で求めよ。
2. $\ker L_H$ を求め、$u-v$ が零類ではないことも説明せよ。
3. $L_H^2:H^0\to H^4$ の $[1]_d$ に対する値を求め、$L_H$ で使う基本形式の係数を検算せよ。

<!-- solution-start -->
### 詳細解答

**1.** [積Kähler形式](../../KAH/KAH1-05/index.md#thm-kah1-05-product)は $\omega=2\pi(\pi_1^*\omega_{\mathrm{FS}}/(2\pi)+\pi_2^*\omega_{\mathrm{FS}}/(2\pi))$ だから、類として $[\omega]_d=2\pi(u+v)$ である。[de Rham積](#def-hod1-10-de-rham-product)の結合則と仮定 $u^2=v^2=0$ により

$$
L_Hu=2\pi(u^2+vu)=2\pi uv,
\qquad L_Hv=2\pi(uv+v^2)=2\pi uv.
$$

よって行列は $\begin{pmatrix}2\pi&2\pi\end{pmatrix}$ である。

**2.** 任意の $au+bv$ は $2\pi(a+b)uv$ へ写る。$uv$ は積分が $1$ なので非零であり、核条件は $a+b=0$。従って $\ker L_H=\mathbb C(u-v)$ となる。$u,v$ は与えられた基底だから $u-v\ne0$ である。

**3.** $L_H[1]_d=2\pi(u+v)$ なので

$$
\begin{aligned}
L_H^2[1]_d
&=(2\pi)^2(u+v)^2\\
&=(2\pi)^2(u^2+uv+vu+v^2)\\
&=2(2\pi)^2uv.
\end{aligned}
$$

次数2同士の積は $(-1)^{2\cdot2}=+1$ で交換するため、中項が消えず2倍になる。$u,v$ を規格化済みとしたことと $L_H$ が規格化前の $[\omega]_d$ を掛けることを区別できた。
<!-- solution-end -->

## 8. 何が準備できたか

- [de Rham積](#prop-hod1-10-product-well-defined)は閉形式の外積で計算でき、代表の変更は完全形式の差しか生まない。
- [調和代表とLefschetz作用](#thm-hod1-10-harmonic-lefschetz)は可換に対応する。$L^rh$ は調和で、類は $[\omega]^r\smile[h]$、型は $(p+r,q+r)$ へ移る。
- $d\omega=0$ と $[L,\Delta_d]=0$ は異なる責務を持つ。単に閉な2形式との積だけでは調和性を保てない。

次は[点ごとのLefschetz同型](../HOD1-03/index.md#thm-hod1-03-pointwise-isomorphism)を、今作った**有限次元の調和空間上の作用**へ移して、どの冪がコホモロジーの同型になるかを厳密に示す。
