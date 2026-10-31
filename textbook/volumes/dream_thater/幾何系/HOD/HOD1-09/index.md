# HOD1-09 具体例とHodgeダイヤモンドI

[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)は、コンパクトKähler多様体の実位相的な情報を複素型ごとに分けた。[Hodge数の対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)も分かった。しかし対称性だけでは、例えば複素曲面の中央の数が $2$ なのか $4$ なのかは決められない。**具体的な調和形式を作って、各型を何個数えられるか**が今回の問いである。

最初に楕円曲線を計算し、格子の形に依存しない高次元複素トーラスの公式を証明する。次に複素射影直線との違いを見て、積多様体の全型を組み立てる。最後に、逆向きの問い――**複素多様体にKähler計量が存在しないと、数字だけで判定できる場合はあるか**――まで進む。

## 1. 数を並べる：Hodgeダイヤモンドと多項式

[Hodge数の定義](../HOD1-07/index.md#def-hod1-07-hodge-numbers)によれば、コンパクトKähler多様体 $X$ の $h^{p,q}(X)$ は調和 $(p,q)$ 形式の複素次元であり、$p,q$ はともに $0$ から複素次元 $n$ まで動く。次数 $p+q$ が小さいものを上に並べると、数の左右対称性や中央の大きさが一目で分かる。

<a id="def-hod1-09-hodge-diamond"></a>

<!-- formal-statement-start -->
> **定義（Hodgeダイヤモンド）**
> $X$ を複素次元 $n$ の滑らか・コンパクト・境界なしのKähler多様体とする。
> 各Hodge数を全次数の小さい順に上から並べ、同じ次数の行では第一添字の大きい順に並べた三角形状の数表を **Hodgeダイヤモンド** という。範囲外の型は配置しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-09-hodge-diamond -->
**定義の確認**。正方格子の楕円曲線 $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ は[平坦Kähler](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)である。[全Dolbeault群の計算](../../CM/CM2-05/index.md#thm-cm2-05-torus-four-groups)によれば四つのHodge数は全て $1$。

この曲線は複素次元 $1$ なので、総次数 $0$ の行は型 $(0,0)$ だけである。総次数 $1$ では $(1,0)$ と $(0,1)$ を第一添字の大きい順に並べる。最後の総次数 $2$ では $(1,1)$ だけが残る。従って、数字を直接入れたダイヤモンドは

$$
\begin{array}{ccc}
&1&\\
1&&1\\
&1&
\end{array}
$$

となる。左右の値が等しいことは[共役対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)によるが、両方が $1$ であることは楕円曲線についての計算から得た。
<!-- definition-example-end -->

ダイヤモンドの行を目で足す代わりに、指数に型 $(p,q)$ を記録しておくと積に便利である。その記録を多項式と呼ぼう。

<a id="def-hod1-09-hodge-polynomial"></a>

<!-- formal-statement-start -->
> **定義（Hodge多項式）**
> 滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体 $X$ について、二つの形式変数 $u,v$ を用い、**Hodge多項式**を

$$
P_X(u,v)=\sum_{p=0}^{n}\sum_{q=0}^{n}h^{p,q}(X)u^pv^q
$$

> と定める。$u,v$ は形式的な文字であり、座標や微分形式ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-09-hodge-polynomial -->
**定義の確認**。直前の楕円曲線 $E$ では $n=1$ で四つのHodge数が全て $1$ なので、定義の二重和を実際に取ると $P_E(u,v)=1+u+v+uv$。例えば $uv$ の係数 $1$ は $(1,1)$ 型の次元を表す。$u=v=t$ を代入すれば、[Betti数に対するKähler制約](../HOD1-07/index.md#thm-hod1-07-betti-constraints)から

$$
P_X(t,t)=\sum_{k=0}^{2n}b_k(X)t^k
$$

となる。この例では $P_E(t,t)=1+2t+t^2$、したがって $b_0=b_2=1,b_1=2$ も確かめられる。これは二変数から一変数への情報圧縮であって、逆にBetti数だけから全Hodge数を復元できるという意味ではない。
<!-- definition-example-end -->

## 2. 複素トーラス：なぜ全ての調和形式が定数係数なのか

複素トーラスは、複素空間 $\mathbb C^n$ を並進で割って作る。$\Lambda\subset\mathbb C^n$ を実線形独立な $2n$ 個のベクトルの整数係数結合でできる**全格子**とし、$T=\mathbb C^n/\Lambda$ とおく。全格子であるため、実 $2n$ 次元の基本平行多面体はコンパクトであり、その向かい合う面を同一視した $T$ もコンパクトとなる。[商の複素構造](../../CM/CM1-09/index.md#thm-cm1-09-quotient-atlas)と[平坦Kähler計量](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)を持つ。

一定の実計量を降ろすと、その局所的な微分は普通のユークリッド微分になる。**平行な余標構**とは、被覆空間で係数一定の1形式からなる基底で、Levi–Civita接続による共変微分が零のものをいう。これが、無限個ある滑らかな周期関数の中から調和形式だけを取り出す近道である。

<a id="lem-hod1-09-flat-harmonic"></a>

<!-- formal-statement-start -->
> **補題（平坦トーラスの調和形式の定数性）**
> 全格子 $\Gamma\subset\mathbb R^m$ と、$\mathbb R^m$ 上の定数係数正定値計量を降ろした平坦トーラス $T_{\mathbb R}=\mathbb R^m/\Gamma$ を考える。任意の $0\le k\le m$ について、滑らかな複素 $k$ 形式 $\alpha$ が $\Delta_d\alpha=0$ を満たすための必要十分条件は、被覆空間 $\mathbb R^m$ 上の平行な余標構で $\alpha$ の係数が全て定数であることである。
<!-- formal-statement-end -->

### 証明の見取り図

定数計量で正規直交な実座標を選ぶと、Hodge Laplacianは各係数に同じ非負のスカラーLaplacianを作用させる。全格子による周期境界条件で部分積分し、勾配の二乗積分が零なら各係数が定数と分かる。

<!-- proof-start -->
### 証明

被覆空間で定数の正規直交余標構 $e^1,\ldots,e^m$ を選び、その双対である定数ベクトル場 $e_a$（$e^a(e_b)=\delta_{ab}$）の方向微分を $\partial_a$ と書く。$\iota_{e_a}$ は微分形式の第一引数に $e_a$ を代入する縮約である。昇順の添字集合 $I$ に対し $e^I$ を楔積基底とし、

$$
\alpha=\sum_{|I|=k}f_I e^I
$$

と一意に書く。各 $f_I$ は $\Gamma$ 周期的な滑らかな関数である。$de^a=0$ なので、係数へのLeibniz則から外微分の表示が得られる。また $d^*$ は[余微分](../../GA/GA6/index.md#def-ga6-codifferential) $\delta$ と同じ作用素である。周期境界条件による部分積分では $\partial_a$ の形式的随伴は $-\partial_a$、正規直交余標構では楔積作用 $e^a\wedge$ の随伴は $\iota_{e_a}$ だから、

$$
d=\sum_a e^a\wedge\partial_a,\qquad
d^*=-\sum_a\iota_{e_a}\partial_a.
$$

$e^a\wedge\iota_{e_b}+\iota_{e_b}(e^a\wedge\cdot)=\delta_{ab}I$ は、基底 $e^I$ が $e^a$ を含む場合と含まない場合を分ければ確かめられる。よって二つの積 $dd^*+d^*d$ の交差項が消え、

$$
\Delta_d\alpha
=-\sum_{|I|=k}\sum_{a=1}^m(\partial_a^2 f_I)e^I.
$$

$\alpha$ が調和なら、[非負Laplacianのエネルギー恒等式](../../GA/GA6/index.md#thm-ga6-energy)と上の直交基底表示から

$$
0=(\alpha,\Delta_d\alpha)_2
=\sum_{|I|=k}\sum_{a=1}^m\int_{T_{\mathbb R}}|\partial_a f_I|^2\,dV.
$$

非負の連続関数の積分が零なので各 $\partial_a f_I=0$。連結な被覆空間 $\mathbb R^m$ 上で全方向の微分が零ゆえ各 $f_I$ は定数。逆に定数係数なら $d\alpha=d^*\alpha=0$ で、$\Delta_d\alpha=0$ となる。$\square$
<!-- proof-end -->

例えば $n=1$ では $1,dz,d\bar z,dz\wedge d\bar z$ はいずれも定数係数で調和的である。一方、非定数な周期関数 $f$ を掛けた $f\,dz$ は、補題により一般には調和ではない。この区別により、単に閉じた形式を列挙して次元を数える際の過大計上を防げる。

<a id="thm-hod1-09-torus-numbers"></a>

<!-- formal-statement-start -->
> **定理（複素トーラスのHodge数）**
> $\Lambda\subset\mathbb C^n$ を実ランク $2n$ の全格子とする。滑らか・コンパクト・境界なしの複素トーラス $T=\mathbb C^n/\Lambda$ に定数正定値Hermite計量から誘導されるKähler計量を入れる。このとき $0\le p,q\le n$ について

$$
h^{p,q}(T)=\binom np\binom nq,\qquad
P_T(u,v)=(1+u)^n(1+v)^n.
$$

> さらに $0\le k\le2n$ で $b_k(T)=\binom{2n}{k}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

格子の形は調和形式の次元に影響しない。[平坦トーラスの定数性](#lem-hod1-09-flat-harmonic)を使い、$n$ 個の $dz^j$ から $p$ 個、$n$ 個の $d\bar z^j$ から $q$ 個選ぶ。[型別調和代表](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)がそれぞれ異なるDolbeault類を与えるので、組合せの数がHodge数になる。

<!-- proof-start -->
### 証明

複素座標 $z^j=x^j+i y^j$ の微分 $dz^j,d\bar z^j$ は、格子並進の下で不変だから $T$ 上へ降りる。$dz^j=dx^j+i\,dy^j$、$d\bar z^j=dx^j-i\,dy^j$ の変換行列は行列式 $-2i\ne0$ なので、実余標構の複素化の基底である。したがって

$$
dz^I\wedge d\bar z^J
=dz^{i_1}\wedge\cdots\wedge dz^{i_p}
\wedge d\bar z^{j_1}\wedge\cdots\wedge d\bar z^{j_q}
$$

（$I,J$ は各々狭義単調増加、$|I|=p,|J|=q$）は定数係数 $(p,q)$ 形式の基底である。各基底形式は[平坦調和形式の特徴付け](#lem-hod1-09-flat-harmonic)で調和的であり、逆に調和 $(p,q)$ 形式はその線形結合に限る。

コンパクトKählerであるから[Dolbeault群と型別調和形式の同型](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)が適用できる。よって

$$
\begin{aligned}
h^{p,q}(T)
&=\dim_{\mathbb C}\mathcal H^{p,q}(T)\\
&=\#\{I:|I|=p\}\#\{J:|J|=q\}
=\binom np\binom nq.
\end{aligned}
$$

二項定理で $P_T=(\sum_p\binom np u^p)(\sum_q\binom nq v^q)$。また [Betti数の和](../HOD1-07/index.md#thm-hod1-07-betti-constraints)に代入し、$u=v=t$ とすれば $(1+t)^{2n}$ の $t^k$ の係数が $b_k=\binom{2n}{k}$ である。$\square$
<!-- proof-end -->

**複素二次元の具体例。** $T=\mathbb C^2/\Lambda$ の $(1,1)$ 型調和形式は

$$
dz^1\wedge d\bar z^1,\quad dz^1\wedge d\bar z^2,\quad
dz^2\wedge d\bar z^1,\quad dz^2\wedge d\bar z^2
$$

の四つであり、$(2,0)$ と $(0,2)$ は各一つずつ。従って $h^{1,1}=4$、$b_2=1+4+1=6$ である。ダイヤモンドは

$$
\begin{array}{ccccc}
&&1&&\\
&2&&2&\\
1&&4&&1\\
&2&&2&\\
&&1&&
\end{array}
$$

となる。「中央の $4$」は対称性だけではなく、四つの調和基底を数えて得た値である。

## 3. 楕円曲線の周期を実際に積分する

複素一次元のトーラスを楕円曲線の平坦模型として使う。$\tau=a+ib$（$b>0$）とし、$E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ と置く。$1,\tau$ は実線形独立であるため全格子を作る。二本の基本閉路を $\gamma_1(t)=[t]$、$\gamma_\tau(t)=[t\tau]$（$0\le t\le1$）とする。**周期**とは、閉1形式をこのような閉路に沿って積分した値である。

<a id="prop-hod1-09-elliptic-periods"></a>

<!-- formal-statement-start -->
> **命題（楕円曲線の周期とHodgeダイヤモンド）**
> $\operatorname{Im}\tau>0$ とし $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ に平坦Kähler計量を与える。閉1形式 $dz,d\bar z$ と基本閉路 $\gamma_1,\gamma_\tau$ について

$$
\begin{array}{c|cc}
&\gamma_1&\gamma_\tau\\ \hline
\displaystyle\int dz&1&\tau\\
\displaystyle\int d\bar z&1&\bar\tau
\end{array}
$$

> となる。$h^{0,0}=h^{1,0}=h^{0,1}=h^{1,1}=1$、$b_0=b_2=1,b_1=2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

各閉路を直線で持ち上げれば $dz$ の積分は終点差となる。Hodge数は、全格子を仮定する[前定理](#thm-hod1-09-torus-numbers)へ $n=1$ を代入する。周期積分はその調和代表が実際に消えないことの独立な確認になる。

<!-- proof-start -->
### 証明

被覆空間で $\gamma_1$ を $z(t)=t$ として持ち上げると $dz=dt$、$\gamma_\tau$ の持ち上げ $z(t)=\tau t$ では $dz=\tau\,dt$。従って

$$
\int_{\gamma_1}dz=\int_0^1dt=1,\qquad
\int_{\gamma_\tau}dz=\int_0^1\tau\,dt=\tau.
$$

複素共役をとれば $d\bar z$ の二つの周期も $1,\bar\tau$ と得られる。形式を行、閉路を列とした周期行列 $\left(\begin{smallmatrix}1&\tau\\1&\bar\tau\end{smallmatrix}\right)$ の行列式は $\bar\tau-\tau=-2ib\ne0$ なので、二つの調和一次形式は独立である。

[複素トーラスのHodge数](#thm-hod1-09-torus-numbers)で $n=1$ と置くと四つのHodge数はすべて $\binom10^2$ または $\binom11^2$ に等しく $1$ となる。[Betti数の和](../HOD1-07/index.md#thm-hod1-07-betti-constraints)で $b_1=1+1=2$、端点はそれぞれ $1$。$\square$
<!-- proof-end -->

**面積の検算。** 格子ベクトル $1,\tau$ が張る平行四辺形の実面積は $b=\operatorname{Im}\tau$ である。$dz\wedge d\bar z=-2i\,dx\wedge dy$ なので

$$
\omega=\frac{i}{2b}dz\wedge d\bar z
=\frac1b\,dx\wedge dy,\qquad \int_{E_\tau}\omega=1.
$$

この $\omega$ は $H=(2b)^{-1}>0$ という定数Hermite係数の基本形式で、$d\omega=0$ でもあるから、[平坦トーラスのKähler構造](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)の仮定を満たす。$b=0$ なら $1,\tau$ は実線形従属となって全格子を作らない。$b<0$ でも全格子は作れるが、ここで選んだ $H=(2b)^{-1}$ は正値でなくなる。格子の生成元 $\tau$ を $-\tau$ に替えれば同じ格子を正の虚部で表せる。

楕円曲線のHodgeダイヤモンドは上下左右が全て $1$ で、$P_{E_\tau}=(1+u)(1+v)$ となる。格子の形は周期の値 $\tau$ には反映されるが、四つのHodge数には反映されない。

## 4. 複素射影直線：同じ複素次元でも数字が違う

$\mathbb{CP}^1$ は[二つの複素座標チャート](../../CM/CM1-10/index.md#def-cm1-10-projective-space)で覆われる連結なコンパクト複素曲線であり、[大域Fubini–Study形式](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)によりKählerである。一方、トーラスのような大域定数の正則1形式はない。[既習の二チャートによるDolbeault計算](../../CM/CM2-05/index.md#thm-cm2-05-projective-line-four-groups)が、その欠如も定量化する。

<a id="prop-hod1-09-projective-line"></a>

<!-- formal-statement-start -->
> **命題（射影直線のHodgeダイヤモンド）**
> $\mathbb{CP}^1$ にFubini–Study Kähler計量を入れると、唯一の非零Hodge数は $h^{0,0}=h^{1,1}=1$ であり、

$$
P_{\mathbb{CP}^1}(u,v)=1+uv,\qquad
(b_0,b_1,b_2)=(1,0,1).
$$

> $z=Z_1/Z_0$ チャート上の $\omega_{\mathrm{FS}}=i\,dz\wedge d\bar z/(1+|z|^2)^2$ は大域に延び、$\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$ である。
<!-- formal-statement-end -->

### 証明の見取り図

四つのDolbeault群は既に計算済みなので、その次元だけ読み取る。形式の型と [Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)からBetti数を出し、面積の $2\pi$ は局所式から再積分して確認する。

<!-- proof-start -->
### 証明

[射影直線のDolbeault群の計算](../../CM/CM2-05/index.md#thm-cm2-05-projective-line-four-groups)の仮定に $\mathbb{CP}^1$ は一致し、

$$
H_{\bar\partial}^{0,0}\cong\mathbb C,\quad
H_{\bar\partial}^{1,0}=H_{\bar\partial}^{0,1}=0,\quad
H_{\bar\partial}^{1,1}\cong\mathbb C.
$$

Kähler性から[調和代表によるHodge数の定義](../HOD1-07/index.md#def-hod1-07-hodge-numbers)へ移せるので係数は $1,0,0,1$。[Betti数の和](../HOD1-07/index.md#thm-hod1-07-betti-constraints)で $b_0=1$、$b_1=0$、$b_2=1$。

面積は $z=re^{i\theta}$（$r\ge0$、$0\le\theta<2\pi$）と置いて求める。この変数変換で $dz=e^{i\theta}(dr+ir\,d\theta)$、$d\bar z=e^{-i\theta}(dr-ir\,d\theta)$ だから、楔積の反対称性より $i\,dz\wedge d\bar z=2r\,dr\wedge d\theta$ となる。無限遠の一点を外して積分してよいのは、この点が二次元体積零で形式が滑らかに延長するからである。従って

$$
\begin{aligned}
\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
&=\int_0^{2\pi}\int_0^\infty\frac{2r}{(1+r^2)^2}\,dr\,d\theta\\
&=2\pi\left[-\frac1{1+r^2}\right]_{0}^{\infty}=2\pi.
\end{aligned}
$$

これは[既習のFubini–Study面積公式](../../KAH/KAH1-07/index.md#thm-kah1-07-area)とも一致する。$\square$
<!-- proof-end -->

ダイヤモンドは

$$
\begin{array}{ccc}
&1&\\
0&&0\\
&1&
\end{array}
$$

である。楕円曲線と $\mathbb{CP}^1$ はともに複素次元 $1$ なのに、前者の $b_1=2$ に対し後者は $0$。面積形式 $\omega_{\mathrm{FS}}$ は非零の $(1,1)$ 類を与え、規格化した $\omega_{\mathrm{FS}}/(2\pi)$ は全体積分が $1$ となる。これは次の積で便利な標準代表となる。

## 5. 積の型はなぜ掛け算で数えられるか

二つのコンパクトKähler多様体 $X,Y$ の積 $X\times Y$ に、射影 $\pi_X,\pi_Y$ を使う[積Kähler計量](../../KAH/KAH1-05/index.md#thm-kah1-05-product)を入れる。$X$ の $(a,b)$ 形式 $\alpha$ と $Y$ の $(c,d)$ 形式 $\beta$ の外積

$$
\alpha\boxtimes\beta
=\pi_X^*\alpha\wedge\pi_Y^*\beta
$$

は $(a+c,b+d)$ 形式である。ここで $\boxtimes$ はこの外積を表す記号であり、単なる数値の積ではない。全ての型がこの形の有限和で表されることを局所余標構で確認できるが、**調和性がどのように保存・検出されるか**を示さないと次元の掛け算は証明できない。

<a id="lem-hod1-09-product-laplacian"></a>

<!-- formal-statement-start -->
> **補題（積上のHodge Laplacianの分解）**
> $X,Y$ を滑らか・コンパクト・境界なしのRiemann多様体とし、$X\times Y$ に積計量を入れる。滑らかな $r$ 形式 $\alpha\in\Omega^r(X;\mathbb C)$ と $s$ 形式 $\beta\in\Omega^s(Y;\mathbb C)$ に対し、

$$
\Delta_{X\times Y}(\alpha\boxtimes\beta)
=(\Delta_X\alpha)\boxtimes\beta
+\alpha\boxtimes(\Delta_Y\beta)
$$

> が成り立つ。$\Delta$ はいずれも非負のde Rham Hodge Laplacianである。
<!-- formal-statement-end -->

### 証明の見取り図

積の外微分には、第一因子の次数 $r$ から $(-1)^r$ が現れる。余微分も積計量の正規直交基底で展開して同じ符号を得る。$dd^*+d^*d$ では、二つの因子をまたぐ交差項が反対符号で打ち消し合う。

<!-- proof-start -->
### 証明

外微分の次数付きLeibniz則を $\pi_X^*\alpha,\pi_Y^*\beta$ に適用すると

$$
d(\alpha\boxtimes\beta)
=(d_X\alpha)\boxtimes\beta
+(-1)^r\alpha\boxtimes(d_Y\beta).
$$

積計量の各因子から得た直交余標構を連結し、[余微分の定義](../../GA/GA6/index.md#def-ga6-codifferential)を適用する。任意の点で各因子の正規直交枠を選ぶと、その点では $d^*=-\sum_j\iota_{E_j}\nabla_{E_j}$ と書ける。積接続は第一・第二因子の方向を混ぜないため、第一因子の方向の縮約は $\alpha$ に作用し、第二因子の方向の縮約は $r$ 個の第一因子の余標構を通過して $(-1)^r$ を得る。従って

$$
d^*(\alpha\boxtimes\beta)
=(d_X^*\alpha)\boxtimes\beta
+(-1)^r\alpha\boxtimes(d_Y^*\beta).
$$

二式を合成して $\Delta=dd^*+d^*d$ を展開する。例えば $d_Xd_Y^*$ を含む項は、$dd^*$ に $(-1)^r(d_X\alpha)\boxtimes(d_Y^*\beta)$、$d^*d$ に $(-1)^{r+1}(d_X\alpha)\boxtimes(d_Y^*\beta)$ が現れ零になる。$d_X^*d_Y$ の組も、第一因子の次数が $r-1$ に変わる符号を追うと消える。残るのは

$$
(d_Xd_X^*+d_X^*d_X)\alpha\boxtimes\beta
+\alpha\boxtimes(d_Yd_Y^*+d_Y^*d_Y)\beta,
$$

つまり主張の右辺である。$\square$
<!-- proof-end -->

<a id="thm-hod1-09-product-hodge"></a>

<!-- formal-statement-start -->
> **定理（積のHodge数とHodge多項式）**
> $X,Y$ をそれぞれ複素次元 $n,m$ の滑らか・コンパクト・境界なしのKähler多様体とする。$X\times Y$ に積Kähler計量を入れると、全ての $p,q$ について

$$
h^{p,q}(X\times Y)
=\sum_{\substack{a+c=p,\ b+d=q\\0\le a,b\le n,\ 0\le c,d\le m}}
h^{a,b}(X)h^{c,d}(Y),
$$

> また $P_{X\times Y}(u,v)=P_X(u,v)P_Y(u,v)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

調和形式同士の外積が調和的であるだけでは、積に**他の**調和形式がないことを示せない。[非負Laplacianの離散スペクトル](../../GA/GA6/index.md#thm-ga6-finite-harmonic)を使うと、因子の固有値 $\lambda,\mu$ の組は積上で $\lambda+\mu$ を持つ。和が零であるのは両者とも零の場合に限る。

<!-- proof-start -->
### 証明

各因子の複素形式の $L^2$ 空間に、[Hodge Laplacianのコンパクトレゾルベントとスペクトル分解](../../GA/GA6/index.md#thm-ga6-finite-harmonic)およびその証明から、次数別の滑らかな正規直交固有形式基底を取れる。$X$ の $r$ 形式の固有形式を $\alpha_i$、$Y$ の $s$ 形式の固有形式を $\beta_j$ とし、

$$
\Delta_X\alpha_i=\lambda_i\alpha_i,\qquad
\Delta_Y\beta_j=\mu_j\beta_j,\qquad
\lambda_i,\mu_j\ge0
$$

と置く。局所的な積余標構の楔積が直交基底を与え、Fubiniの積分公式で内積が因子の内積の積に分かれるため、$\alpha_i\boxtimes\beta_j$ は $X\times Y$ の因子次数 $(r,s)$ を持つ形式の $L^2$ 正規直交基底をなす。

[前補題](#lem-hod1-09-product-laplacian)へ固有値の式を代入すれば

$$
\Delta_{X\times Y}(\alpha_i\boxtimes\beta_j)
=(\lambda_i+\mu_j)(\alpha_i\boxtimes\beta_j).
$$

この展開の零固有成分は $\lambda_i=\mu_j=0$ の組のみ。したがって任意次数の積上の調和形式は、因子の調和形式の外積の有限次元線形結合に限る。

さらにKähler性から[Hodge Laplacianの型保存](../HOD1-06/index.md#lem-hod1-06-green-types)が成り立つ。型ごとの直交射影はLaplacianと交換するので、前段の零固有成分を $(a,b)$ と $(c,d)$ に分けて投影できる。型 $(p,q)$ の零固有空間は

$$
\mathcal H^{p,q}(X\times Y)
\cong\bigoplus_{\substack{a+c=p\\b+d=q}}
\mathcal H^{a,b}(X)\otimes_{\mathbb C}\mathcal H^{c,d}(Y).
$$

[Dolbeault群の調和代表](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)により各項の複素次元がそれぞれ $h^{a,b}(X)h^{c,d}(Y)$ なので和公式を得る。式に $u^pv^q$ を掛けて全 $p,q$ を足すと、指数の加法 $u^{a+c}v^{b+d}=(u^av^b)(u^cv^d)$ により多項式の積公式になる。$\square$
<!-- proof-end -->

**例1：射影直線二つの積。** $Q=\mathbb{CP}^1\times\mathbb{CP}^1$ では

$$
P_Q=(1+uv)^2=1+2uv+u^2v^2.
$$

従って $h^{1,1}=2$、それ以外の非零Hodge数は $h^{0,0}=h^{2,2}=1$ のみ。特に $b_2=2$。$(1,1)$ 類の二つの独立な代表は二つの射影 $\pi_1,\pi_2$ による $\pi_1^*\omega_{\mathrm{FS}}$ と $\pi_2^*\omega_{\mathrm{FS}}$ であり、それぞれ別の因子に積分して区別できる。

**例2：楕円曲線と射影直線。** $Z=E_\tau\times\mathbb{CP}^1$ では

$$
\begin{aligned}
P_Z&=(1+u)(1+v)(1+uv)\\
&=1+u+v+2uv+u^2v+uv^2+u^2v^2.
\end{aligned}
$$

従って $h^{1,0}=h^{0,1}=1$、$h^{1,1}=2$、$h^{2,0}=h^{0,2}=0$。Betti数は $(1,2,2,2,1)$ となる。複素二次元トーラスの $(1,4,6,4,1)$ とは数字が異なる。

## 6. 奇数の第一Betti数はKähler計量を排除する

ここまではKähler計量が既にある場合の計算だった。反対に、複素多様体の位相が先に分かれば、Kähler計量の**不存在**を判定できる場合がある。

<a id="cor-hod1-09-odd-b1"></a>

<!-- formal-statement-start -->
> **系（奇数の第一Betti数による非Kähler障害）**
> $Y$ を滑らか・コンパクト・境界なしの複素多様体とする。第一Betti数 $b_1(Y)=\dim_{\mathbb R}H^1_{\mathrm{dR}}(Y;\mathbb R)$ が奇数なら、$Y$ にはKähler計量が存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

仮にKähler計量があれば、[Betti数に対するKähler制約](../HOD1-07/index.md#thm-hod1-07-betti-constraints)で $b_1=2h^{1,0}$ となり、奇数と矛盾する。これは必要条件であり、偶数なら存在すると逆向きに結論してはいけない。

<!-- proof-start -->
### 証明

Kähler計量が存在すると仮定する。コンパクト・境界なしの仮定と合わせ、[Hodge分解と共役対称性](../HOD1-07/index.md#thm-hod1-07-betti-constraints)を次数 $1$ に適用できる。$p+q=1$ の非負整数解は $(1,0),(0,1)$ の二つだけなので、

$$
b_1(Y)=h^{1,0}(Y)+h^{0,1}(Y)
=2h^{1,0}(Y)\in2\mathbb Z.
$$

これは奇数という仮定に反する。従ってKähler計量は存在しない。$\square$
<!-- proof-end -->

奇数 $b_1$ の**複素多様体が実際に存在するか**を確かめる。複素次元 $2$ で、原点を除く $\mathbb C^2$ を実数倍 $2$ の繰り返しで割る。

<a id="prop-hod1-09-hopf"></a>

<!-- formal-statement-start -->
> **命題（一次Hopf曲面の位相と非Kähler性）**
> $\mathbb C^2\setminus\{0\}$ 上の双正則写像 $F(z_1,z_2)=(2z_1,2z_2)$ が生成する整数群の作用で作る商

$$
S=(\mathbb C^2\setminus\{0\})/\langle F\rangle
$$

> は滑らか・連結・コンパクト・境界なしの複素曲面であり、実多様体として $S^3\times S^1$ に微分同相である。特に $b_1(S)=1$ であるからKähler計量を持たない。
<!-- formal-statement-end -->

### 証明の見取り図

各非零ベクトルを「向き $z/\|z\|$ と半径の対数」に分ける。$F$ は向きを保ち、半径の対数に $1$ を足すだけなので、商は三次元球面と円周の積になる。局所的には正則な離散群作用なので複素チャートも降りる。

<!-- proof-start -->
### 証明

ユークリッド長 $\|z\|=(|z_1|^2+|z_2|^2)^{1/2}$ を用いると、

$$
\Phi:\mathbb C^2\setminus\{0\}\longrightarrow S^3\times\mathbb R,\qquad
\Phi(z)=\left(\frac z{\|z\|},\log_2\|z\|\right)
$$

は滑らかな全単射で、逆写像 $(u,t)\mapsto2^tu$ も滑らかである。$\Phi(Fz)=(u,t+1)$ なので、商に降りる微分同相は

$$
S\cong S^3\times(\mathbb R/\mathbb Z)\cong S^3\times S^1.
$$

右辺は連結・コンパクト・境界なしである。$\langle F\rangle$ の作用は自由である。実際 $2^kz=z$、$z\ne0$ なら $k=0$。また $\Phi$ によれば商を取る前の作用は $t\mapsto t+k$ という適切不連続な並進なので、各点にはその異なる整数平行移動と重ならない小近傍がある。$F$ と $F^{-1}$ は正則であり、その近傍の複素座標は重なりで正則な遷移を持つ。したがって商は複素次元 $2$ の滑らかな複素多様体となる。

$S^3$ 上の任意の滑らかな閉路は、その像が通らない点を選べる。滑らかな一次元の像は三次元球面全体を埋めないからである。その点を北極 $(0,0,0,1)$ に選び直すと、立体射影

$$
S^3\setminus\{(0,0,0,1)\}\longrightarrow\mathbb R^3,\qquad
(x,t)\longmapsto\frac{x}{1-t}
$$

が使える（$x\in\mathbb R^3$、$|x|^2+t^2=1$）。この写像は滑らかな逆を持つため、閉路を $\mathbb R^3$ の中で直線ホモトピーによって点へ縮められる。従って $S^3\times S^1$ の閉路は、円周方向の巻き数 $k\in\mathbb Z$ だけを残して縮められる。

円周の座標を $t$（$\bmod 1$）とし、大域的な閉1形式 $dt$ を考える。任意の閉1形式 $\eta$ について、固定した $u_0\in S^3$ での円周積分を $c=\int_{\{u_0\}\times S^1}\eta$ とおく。閉形式の積分は閉路のホモトピーで変わらないため、$\eta-c\,dt$ の任意の閉路上の積分は $kc-kc=0$。基点から点 $x$ への経路積分を $f(x)=\int_{x_0}^{x}(\eta-c\,dt)$ と定めると、経路によらず、$df=\eta-c\,dt$ である。従って全ての一次de Rham類は $[dt]$ の実数倍であり、一方 $\int_{\{u_0\}\times S^1}dt=1$ なので $[dt]\ne0$。よって

$$
H^1_{\mathrm{dR}}(S;\mathbb R)\cong\mathbb R[dt].
$$

ゆえに $b_1(S)=1$。[前系](#cor-hod1-09-odd-b1)の仮定が成立するので、$S$ にKähler計量はない。$\square$
<!-- proof-end -->

この例で失われたのは**複素構造でもコンパクト性でもなくKähler計量の存在**である。したがって $(p,q)$ 型やDolbeault群自体は定義できても、[KählerのHodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を使って $b_1=2h^{1,0}$ とする段階が成立しない。「$b_1$ が偶数ならKähler」という逆命題は、この障害の論理からは得られない。

## 7. 演習：実例から全型を再構成する

### Level A：定義と一つの計算をつなぐ

<a id="ex-hod1-09-a01"></a>
#### HOD1-09-A01 複素三次元トーラスの二項係数
- Level: A

$T=\mathbb C^3/\Lambda$ を全格子による複素トーラスとし、平坦Kähler計量を入れる。$h^{2,1}(T)$、$h^{3,0}(T)$ と $b_3(T)$ を求め、それぞれ何個の $dz^I,d\bar z^J$ を選ぶか説明せよ。

<!-- solution-start -->
### 詳細解答

[トーラスのHodge数公式](#thm-hod1-09-torus-numbers)を $n=3$、$(p,q)=(2,1)$ に適用する。$dz^1,dz^2,dz^3$ から二つ選ぶのは $\binom32=3$ 通り、$d\bar z^j$ から一つ選ぶのは $\binom31=3$ 通りである。従って

$$
h^{2,1}=\binom32\binom31=3\cdot3=9.
$$

$(3,0)$ では全ての $dz^j$ を選び、$d\bar z^j$ は選ばないため $h^{3,0}=\binom33\binom30=1$。全次数 $3$ の型は $(3,0),(2,1),(1,2),(0,3)$ だから

$$
b_3=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}
=1+9+9+1=20.
$$

別法として $\binom63=20$ としても一致するが、最初の和はどの型が寄与したかを示す。
<!-- solution-end -->

<a id="ex-hod1-09-a02"></a>
#### HOD1-09-A02 斜めの格子で周期を測る
- Level: A

$E=\mathbb C/(\mathbb Z+(1+2i)\mathbb Z)$ とし、閉路 $\gamma_1(t)=[t]$、$\gamma_2(t)=[(1+2i)t]$ を取る。$dz,d\bar z$ の四つの周期と、二つの一次形式の周期行列の行列式を求めよ。

<!-- solution-start -->
### 詳細解答

$\tau=1+2i$ は虚部 $2>0$ なので全格子の条件を満たす。[楕円曲線の周期公式](#prop-hod1-09-elliptic-periods)の持ち上げをそれぞれ $z=t$、$z=(1+2i)t$ に取ると

$$
\int_{\gamma_1}dz=1,\quad\int_{\gamma_2}dz=1+2i,\quad
\int_{\gamma_1}d\bar z=1,\quad\int_{\gamma_2}d\bar z=1-2i.
$$

閉路を列、形式を行とした行列は

$$
M=\begin{pmatrix}1&1+2i\\1&1-2i\end{pmatrix},
\qquad \det M=(1-2i)-(1+2i)=-4i\ne0.
$$

従って二つの一次形式の周期ベクトルは独立である。
<!-- solution-end -->

<a id="ex-hod1-09-a03"></a>
#### HOD1-09-A03 射影直線の面積を規格化する
- Level: A

$\mathbb{CP}^1$ 上の $\omega_{\mathrm{FS}}$ を前節の規約で取り、$\eta=\omega_{\mathrm{FS}}/(2\pi)$ とする。$\int_{\mathbb{CP}^1}\eta$、$h^{1,0}$、$b_2$ を求めよ。$\eta$ のde Rham類が零でない理由も答えよ。

<!-- solution-start -->
### 詳細解答

[射影直線の面積とHodge数](#prop-hod1-09-projective-line)により

$$
\int_{\mathbb{CP}^1}\eta
=\frac1{2\pi}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}
=\frac{2\pi}{2\pi}=1.
$$

同じ命題から $h^{1,0}=0$、$h^{1,1}=1$ であり、全次数 $2$ に許される型は $(1,1)$ だけなので $b_2=1$。もし $[\eta]=0$ なら $\eta=d\beta$ と大域的に書け、[Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分は零になる。しかし実際の積分は $1$ なので矛盾し、$[\eta]\ne0$ である。
<!-- solution-end -->

<a id="ex-hod1-09-a04"></a>
#### HOD1-09-A04 射影直線二つの積の中央
- Level: A

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ に積Kähler計量を入れる。$P_Q(u,v)$ と $h^{1,1}(Q)$ を求め、中央の二つの代表を挙げよ。

<!-- solution-start -->
### 詳細解答

各因子は[射影直線のHodgeダイヤモンド](#prop-hod1-09-projective-line)から得る $1+uv$ を持つ。[積のHodge数とHodge多項式](#thm-hod1-09-product-hodge)から

$$
P_Q(u,v)=(1+uv)(1+uv)=1+2uv+u^2v^2.
$$

$uv$ の係数が $h^{1,1}(Q)=2$ である。一つ目の因子の $(1,1)$ と二つ目の $(0,0)$ から $\pi_1^*\omega_{\mathrm{FS}}$、逆の組から $\pi_2^*\omega_{\mathrm{FS}}$ が得られる。両者はそれぞれの因子 $\mathbb{CP}^1\times\{y\}$ と $\{x\}\times\mathbb{CP}^1$ への積分で $(2\pi,0)$、$(0,2\pi)$ を与えるため独立である。
<!-- solution-end -->

### Level B：証明機構と仮定の境界

<a id="ex-hod1-09-b01"></a>
#### HOD1-09-B01 Fourierモードはいつ調和か
- Level: B

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ に計量 $dx^2+dy^2$ を入れ、整数 $m,\ell$ に対して $f_{m,\ell}(x,y)=e^{2\pi i(mx+\ell y)}$ とする。$\alpha=f_{m,\ell}\,d\bar z$ に $\Delta_d$ を作用させ、その零固有値条件を導け。

<!-- solution-start -->
### 詳細解答

[平坦トーラスのLaplacianの係数表示](#lem-hod1-09-flat-harmonic)によって、定数の $d\bar z$ に掛かる関数だけを微分すればよい。導関数は

$$
\partial_xf_{m,\ell}=2\pi imf_{m,\ell},\quad
\partial_x^2f_{m,\ell}=-(2\pi m)^2f_{m,\ell},
$$

$$
\partial_y^2f_{m,\ell}=-(2\pi\ell)^2f_{m,\ell}.
$$

ゆえに

$$
\Delta_d\alpha
=-(\partial_x^2+\partial_y^2)f_{m,\ell}\,d\bar z
=4\pi^2(m^2+\ell^2)\alpha.
$$

$m,\ell$ は整数なので $m^2+\ell^2=0$ は $m=\ell=0$ と同値。この場合 $\alpha=d\bar z$ は定数係数で調和的、他は正固有値を持つ。複素型が $(0,1)$ という事実だけでは調和性を意味しない。
<!-- solution-end -->

<a id="ex-hod1-09-b02"></a>
#### HOD1-09-B02 楕円曲線と射影直線の積
- Level: B

$Z=E_\tau\times\mathbb{CP}^1$（$\operatorname{Im}\tau>0$）の $h^{p,q}$ を全て求め、$b_0,\ldots,b_4$ およびEuler標数を計算せよ。

<!-- solution-start -->
### 詳細解答

[楕円曲線](#prop-hod1-09-elliptic-periods)の $P_E=1+u+v+uv$ と[射影直線](#prop-hod1-09-projective-line)の $P_{\mathbb{CP}^1}=1+uv$ を、両者がコンパクトKählerであることを確認して[積公式](#thm-hod1-09-product-hodge)に適用する。

$$
\begin{aligned}
P_Z&=(1+u+v+uv)(1+uv)\\
&=1+u+v+2uv+u^2v+uv^2+u^2v^2.
\end{aligned}
$$

従って $h^{0,0}=h^{1,0}=h^{0,1}=h^{2,1}=h^{1,2}=h^{2,2}=1$、$h^{1,1}=2$、残る $h^{2,0}=h^{0,2}=0$ である。全次数 $k=p+q$ で係数を足すと

$$
\begin{aligned}
b_0&=1,\quad b_1=1+1=2,\quad b_2=0+2+0=2,\\
b_3&=1+1=2,\quad b_4=1.
\end{aligned}
$$

Euler標数は $1-2+2-2+1=0$。$b_3=b_1$ と奇数次Betti数の偶数性も成立している。
<!-- solution-end -->

<a id="ex-hod1-09-b03"></a>
#### HOD1-09-B03 積のLaplacianの交差項
- Level: B

積多様体上で $\alpha$ を第一因子の $r$ 形式、$\beta$ を第二因子の $s$ 形式とする。$d^*d(\alpha\boxtimes\beta)$ のうち $(d_X\alpha)\boxtimes(d_Y^*\beta)$ を含む項の符号を求め、$dd^*$ の対応項と打ち消し合うことを示せ。

<!-- solution-start -->
### 詳細解答

[積上のHodge Laplacianの分解](#lem-hod1-09-product-laplacian)の証明にある二つの作用素表示を使う。まず $d$ では第一因子を微分した項 $(d_X\alpha)\boxtimes\beta$ を取る。この第一因子の次数は元の $r$ から $r+1$ に増えた。そこへ $d^*$ の**第二因子**側の項を作用させると、符号は $(-1)^{r+1}$ となり

$$
(-1)^{r+1}(d_X\alpha)\boxtimes(d_Y^*\beta)
$$

を得る。一方、$dd^*$ では先に第二因子を余微分する項が $(-1)^r\alpha\boxtimes(d_Y^*\beta)$、次に第一因子を外微分して

$$
(-1)^r(d_X\alpha)\boxtimes(d_Y^*\beta)
$$

が現れる。両者の係数和 $(-1)^r+(-1)^{r+1}=0$ により消える。$r+1$ への次数変化を無視すると、誤って交差項が残ってしまう。
<!-- solution-end -->

<a id="ex-hod1-09-b04"></a>
#### HOD1-09-B04 非Kähler性と逆方向の誤解
- Level: B

連結・滑らか・コンパクト・境界なしの複素曲面 $Y$ に $b_1(Y)=5$ と分かっているとき、Kähler計量の存在はどうなるか。また $b_1(Y)=4$ なら存在を証明できるか。論理的な違いを述べよ。

<!-- solution-start -->
### 詳細解答

もし $b_1(Y)=5$ でKähler計量があれば、[奇数第一Betti数の障害](#cor-hod1-09-odd-b1)の証明で用いた [Hodge分解と共役対称性](../HOD1-07/index.md#thm-hod1-07-betti-constraints)により

$$
5=b_1(Y)=2h^{1,0}(Y)
$$

となる。しかし $h^{1,0}$ は非負整数なので右辺は偶数、矛盾する。従ってKähler計量は存在しない。

$b_1=4$ なら $4=2\cdot2$ は矛盾を生まないが、これは**一つの必要条件を満たす**だけである。閉な正値 $(1,1)$ 形式を構成したことにはならないため、Kähler計量の存在は結論できない。
<!-- solution-end -->

### Level C：複数の原理を組み合わせる

<a id="ex-hod1-09-c01"></a>
#### HOD1-09-C01 三次元の積から全Betti数を出す
- Level: C

$W=E_\tau\times\mathbb{CP}^1\times\mathbb{CP}^1$（$\operatorname{Im}\tau>0$）に積Kähler計量を与える。$P_W(u,v)$ を全展開し、全 $h^{p,q}$ の非零項と $b_0,\ldots,b_6$、Euler標数を求めよ。Hodge対称性とも照合せよ。

<!-- solution-start -->
### 詳細解答

三因子はコンパクトKählerなので[積のHodge多項式公式](#thm-hod1-09-product-hodge)を二度適用できる。[楕円曲線](#prop-hod1-09-elliptic-periods)の $(1+u)(1+v)$ と二つの[射影直線](#prop-hod1-09-projective-line)の $(1+uv)$ を掛ける。

$$
\begin{aligned}
P_W&=(1+u+v+uv)(1+2uv+u^2v^2)\\
&=1+u+v+3uv+2u^2v+2uv^2+3u^2v^2\\
&\quad+u^3v^2+u^2v^3+u^3v^3.
\end{aligned}
$$

従って非零Hodge数は $h^{0,0}=h^{1,0}=h^{0,1}=1$、$h^{1,1}=3$、$h^{2,1}=h^{1,2}=2$、$h^{2,2}=3$、$h^{3,2}=h^{2,3}=h^{3,3}=1$ であり、残りは零である。

各単項式の総次数 $p+q$ ごとに係数を足すと

$$
(b_0,b_1,b_2,b_3,b_4,b_5,b_6)
=(1,2,3,4,3,2,1).
$$

Euler標数は $1-2+3-4+3-2+1=0$。$h^{p,q}=h^{q,p}$ は $u$ と $v$ の入替不変性、$h^{p,q}=h^{3-p,3-q}$ は係数表の上下対称性として確認できる。さらに $b_1,b_3,b_5$ は偶数であり、[既習のKähler制約](../HOD1-07/index.md#thm-hod1-07-betti-constraints)と整合する。
<!-- solution-end -->

<a id="ex-hod1-09-c02"></a>
#### HOD1-09-C02 複素次元で変わる拡大商の位相
- Level: C

整数 $n\ge1$ について、$S_n=(\mathbb C^n\setminus\{0\})/\langle z\mapsto2z\rangle$ を考える。

1. $S_n$ が実多様体として $S^{2n-1}\times S^1$ に微分同相となる写像を構成せよ。
2. $n=1$ と $n=2$ で第一Betti数を求め、どちらに奇数Betti数による障害を適用できるか述べよ。
3. この障害が適用できない方について、複素トーラスとの関係を説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 商の構成。** $z\ne0$ に対して

$$
z\longmapsto\left(\frac z{\|z\|},\log_2\|z\|\right)
\in S^{2n-1}\times\mathbb R
$$

を取る。逆写像は $(u,t)\mapsto2^tu$ で滑らかである。$z\mapsto2z$ は第二成分だけを $t\mapsto t+1$ と変えるから、商は $S^{2n-1}\times(\mathbb R/\mathbb Z)$。ゆえに $S_n\cong S^{2n-1}\times S^1$ である。

**2. 第一Betti数。** $n=1$ では、実多様体として二つの円周の積を得る。

$$
S_1\cong S^1\times S^1.
$$

この実二次元トーラスに標準平坦計量を選ぶ。[平坦トーラスの調和形式の定数性](#lem-hod1-09-flat-harmonic)から調和一次形式の基底は二つの円周方向の $d\theta_1,d\theta_2$ である。[実Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)により $b_1(S_1)=2$。

$n=2$ では積は $S_2\cong S^3\times S^1$ である。三次元球面上の閉路を縮める[Hopf曲面の証明](#prop-hod1-09-hopf)の経路積分を使うと、一次de Rham群は円周方向だけで

$$
b_1(S_2)=1.
$$

従って[奇数第一Betti数の障害](#cor-hod1-09-odd-b1)が適用でき、Kähler計量の存在を否定する。

**3. $n=1$ の場合。** $\mathbb C^*=\mathbb C\setminus\{0\}$ を指数写像 $w\mapsto e^w$ で覆うと、核は $2\pi i\mathbb Z$ であり、$z\mapsto2z$ は被覆座標で $w\mapsto w+\log2$ になる。従って

$$
S_1\cong\mathbb C/(\log2\,\mathbb Z+2\pi i\,\mathbb Z)
$$

という複素一次元トーラスで、[平坦Kähler構造](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)を持つ。$n=1$ で障害が現れないのは偶然ではなく、実際にKählerの例だからである。
<!-- solution-end -->

## 8. 結論と次に使うこと

- 複素トーラスでは、平坦計量の調和形式が**定数係数に限られる**ことから全Hodge数を二項係数で数えられた。周期は調和一次形式を幾何的に測る。
- $\mathbb{CP}^1$ では $(1,0),(0,1)$ 型が消え、面積形式が唯一の二次類を与える。積のHodge数はLaplacianの非負性を通じて多項式の積で計算できる。
- 奇数の第一Betti数はKähler計量の不存在を証明するが、偶数であることは存在の証明ではない。Hopf曲面で、複素構造があってもKählerとは限らないことを確かめた。

次は[既習のLefschetz作用素](../HOD1-02/index.md#def-hod1-02-lefschetz)が、このような**調和代表そのものにどう作用するか**を調べる。例えば $\mathbb{CP}^1\times\mathbb{CP}^1$ の二つの $(1,1)$ 類の違いは、次の理論で交叉積と結び付く。
