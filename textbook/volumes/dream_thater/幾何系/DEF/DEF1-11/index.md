# DEF1-11 Calabi–Yauの局所モジュライ

## 1. 障害が消えた後、何を「モジュライ」と呼べるか

[Kuranishiの半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)は、コンパクト複素多様体の十分小さい変形族を有限次元の基底から引き戻せることを述べる。その基底は一般には特異で、冪零元を持つことさえある。一方、[Bogomolov–Tian–Todorov（BTT）の定理](../DEF1-10/index.md#thm-def1-10-btt-smooth)は、コンパクトKähler多様体で標準束が自明なら、Kuranishi基底の正則な障害方程式自体が消え、基底が滑らかになることを示した。

では、この滑らかな基底の座標はいくつ必要だろうか。また、基底の二点が異なれば、それぞれのファイバーは必ず非同型だろうか。ここで別々の答えが現れる。

- **変形を記述する局所座標**：中心ファイバーをどの $X$ と同定するかを固定した、小さい変形族を記述する。
- **標識を忘れた同型類**：ファイバー間に正則同型があれば、異なる座標値であっても同一視する可能性がある。

本章で「Calabi–Yau」と呼ぶとき、特に断らない限り、複素次元 $n\ge2$ の**コンパクトKähler多様体** $X$ で、標準束 $K_X$ が正則に自明であるものを指す。これは単連結性や中間の $H^{p,0}$ の消滅を要求しない広い用法であり、複素トーラスも含む。必要に応じて $H^{p,0}$ の消滅を追加仮定として明示する。

## 2. 標識付き局所座標を定義する

まず[標識付き変形と基底変更](../DEF1-08/index.md#def-def1-08-marked-family)を思い出そう。「標識」は各点の座標名ではなく、中心ファイバー $\mathcal X_0$ を元の $X$ と同定する情報である。基底を小さくした上で、ほかの標識付き変形を引き戻しとして捉えられるかを問う。

<a id="def-def1-11-marked-chart"></a>

<!-- formal-statement-start -->
> **定義（標識付き局所変形座標）**
>
> コンパクト複素多様体 $X$ に対し、原点を含む開集合 $U\subset\mathbb C^m$ と、中心ファイバーの標識 $\mathcal X_0\simeq X$ を持つ固有正則沈め込み $\pi:\mathcal X\to U$ の組を考える。次の両条件を満たすとき、$U$ の原点近傍の座標を $X$ の**標識付き局所変形座標**と呼ぶ。
>
> 1. [Kodaira–Spencer写像](../DEF1-01/index.md#def-def1-01-kodaira-spencer) $\operatorname{KS}_\pi:T_0U\to H^1(X,T_X)$ が同型である。
> 2. 任意の十分小さい基点付き標識付き正則変形は、ある基点を保つ正則写像の芽 $f:(S,s_0)\to(U,0)$ による $\pi$ の引き戻しと標識付き同型である。
>
> この定義は $f$ の一意性も、$U$ の異なる点のファイバーが非同型であることも要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-11-marked-chart -->
**定義の確認**（平坦複素トーラス）。$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ とし、標準座標の複素構造を固定する。小さい定数行列 $B=(b_{ij})\in M_2(\mathbb C)$ について、反正則方向を

$$
\bar D_j=\partial_{\bar z^j}+\sum_{i=1}^2b_{ij}\partial_{z^i}
\qquad(j=1,2)
$$

が張るグラフで置き換える。係数が定数だから $[\bar D_1,\bar D_2]=0$。また $B=0$ の近傍では $I-\bar BB$ が可逆で、グラフと共役は直和になる。従って[Beltramiの可積分性判定](../DEF1-03/index.md#thm-def1-03-maurer-cartan)で実際の複素構造が得られる。

一次係数は四つの $d\bar z^j\otimes\partial_{z^i}$ であり、これらは $H^1(X,T_X)\simeq\mathbb C^4$ の基底になる（第4節で確認する）。従ってKodaira–Spencer写像は同型である。この具体的な族が局所完全であることは、後述の[局所座標定理](#thm-def1-11-local-chart)と[Kuranishi半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)から従う。つまり上の二条件をともに満たす。異なる $B$ のファイバーが大域的にも必ず非同型だとは、ここでは述べていない。
<!-- definition-example-end -->

## 3. Hodge数が局所座標の次元になる

零にならない正則 $n$ 形式 $\Omega$ を一つ選ぶ。これは $K_X\simeq\mathcal O_X$ から存在する。[正則体積形式による収縮](../../CYG/CYG1-12/index.md#def-cyg1-12-contraction)は、接ベクトルから正則 $(n-1)$ 形式を作る。接束値 $(0,1)$ 形式 $\phi$ に対しては

$$
\mathcal I_{\Omega,1}(\phi)=\phi\lrcorner\Omega
\in\mathcal A^{n-1,1}(X)
$$

と書く。$\Omega$ の正則性によって $\bar\partial\mathcal I_{\Omega,1}(\phi)=\mathcal I_{\Omega,2}(\bar\partial_T\phi)$、非消滅性によって収縮の逆写像も存在する。従って[収縮によるDolbeaultコホモロジー同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)が使える。

<a id="thm-def1-11-local-chart"></a>

<!-- formal-statement-start -->
> **定理（Calabi–Yauの滑らかな局所変形座標）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体とし、$K_X\simeq\mathcal O_X$ とする。零にならない大域正則 $n$ 形式 $\Omega$ を選び、$m=h^{n-1,1}(X)$ と置く。このとき十分小さい開近傍 $U\subset\mathbb C^m$ と $X$ の標識付き正則変形族 $\pi:\mathcal X\to U$ が存在し、$U$ は[標識付き局所変形座標](#def-def1-11-marked-chart)を与える。原点の接空間は

$$
T_0U\xrightarrow[\operatorname{KS}_\pi]{\ \simeq\ }
H^1(X,T_X)
\xrightarrow[\ \phi\mapsto\phi\lrcorner\Omega\ ]{\ \simeq\ }
H^{n-1,1}(X)
$$

> と同型である。Kuranishi基底は非被約構造も含めて滑らかな $m$ 次元の複素解析空間の芽である。この結論に $H^2(X,T_X)=0$ は必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

収縮が $H^1(X,T_X)$ と $H^{n-1,1}(X)$ の次元を一致させる。BTTは全ての一次方向が収束する変形へ延び、Kuranishiの障害写像そのものが零になることを保証する。半普遍性によって、その滑らかな基底が小さい標識付き変形をすべて捉える。

<!-- proof-start -->
### 証明

[収縮同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)を $q=1$ に適用し、さらにコンパクトKählerの[Hodge数の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)を使うと

$$
\dim_{\mathbb C}H^1(X,T_X)
=\dim_{\mathbb C}H_{\bar\partial}^{n-1,1}(X)
=h^{n-1,1}(X)=m.
$$

$(n-1,1)$ 型の調和代表 $b_1,\ldots,b_m$ をこの空間の基底として選ぶ。[収束するBTT固定点解](../DEF1-10/index.md#thm-def1-10-convergent)は、十分小さい $t=(t_1,\ldots,t_m)$ に対し

$$
\phi(t)=\mathcal I_{\Omega,1}^{-1}
\left(\sum_{\nu=1}^m t_\nu b_\nu\right)+O(\|t\|^2)
$$

という正則パラメータ依存の可積分Beltrami微分を与える。ここで剰余は固定した十分高いSobolevノルムでの二次以上の項である。[Kodaira–SpencerのDolbeault表示](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)により

$$
\operatorname{KS}_\pi
\left(\left.\frac{\partial}{\partial t_\nu}\right|_0\right)
=\bigl[\mathcal I_{\Omega,1}^{-1}(b_\nu)\bigr]
$$

となる。したがって収縮を続ければ $[b_\nu]$ に写り、接写像は同型である。

さらに[滑らかなKuranishi基底の定理](../DEF1-10/index.md#thm-def1-10-btt-smooth)では、構成した収束族の調和座標を用いて、Kuranishi障害写像 $\kappa$ の芽が正則写像として恒等的に零になると示した。従って基底の局所環は

$$
\mathcal O_{K,0}
=\mathbb C\{t_1,\ldots,t_m\}/(\kappa)
=\mathbb C\{t_1,\ldots,t_m\}.
$$

最後に[Kuranishiの局所完全性と半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)をこの滑らかな $K$ に適用する。任意の小さい標識付き変形は $K$ への正則基底変更で引き戻せる。上記BTT族から $K$ への基底変更の微分は二つのKodaira–Spencer同型を介して複素線形で可逆である。このとき実Jacobianも可逆なので[実多変数の逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を適用できる。局所逆の微分は複素線形写像の逆であり、局所逆も正則となる。ゆえに $U$ 上の族も局所完全であり、定義の二条件がそろう。$H^2(X,T_X)$ の値はこの議論のどこでも零と仮定していない。$\square$
<!-- proof-end -->

ここで $m$ は**標識付き局所変形を記述する滑らかな基底の次元**である。$X$ の正則同型類の空間全体が $\mathbb C^m$ の開集合になる、という結論ではない。後者を主張するには自己同型による同一視をさらに扱わなければならない。

**零でなくてもよい障害群。** $H^2(X,T_X)$ は形式的な障害類の行き先である。一方、この定理は障害写像が恒等的に零だと述べる。行き先のベクトル空間が非零であることと、そこへ写る実際の障害が非零であることは違う。

## 4. 座標は何に依存し、何には依存しないか

第3節で使った同型は $\Omega$ の選択に依存する。コンパクトで連結な $X$ の大域正則関数は定数だから、同じ標準束の非消滅正則体積形式を二つ選ぶと、両者は非零定数倍だけ異なる。さらに $H^{n-1,1}(X)$ の基底を変えると係数も変わる。これを式で固定しておこう。

<a id="prop-def1-11-coordinate-change"></a>

<!-- formal-statement-start -->
> **命題（体積形式とHodge基底による一次座標変換）**
>
> $X$ を連結なコンパクトKähler多様体、$K_X\simeq\mathcal O_X$ とする。非消滅正則 $n$ 形式 $\Omega$ と $H^{n-1,1}(X)$ の基底 $([b_1],\ldots,[b_m])$ により、一次変形類 $[\phi]\in H^1(X,T_X)$ の座標 $t\in\mathbb C^m$ を

$$
[\phi\lrcorner\Omega]=\sum_{\nu=1}^m t_\nu[b_\nu]
$$

> で定める。$\Omega'=c\Omega$（$c\in\mathbb C^*$）、$[b'_\nu]=\sum_\mu[b_\mu]M_{\mu\nu}$（$M\in\operatorname{GL}_m(\mathbb C)$）と取り替えると、同じ一次変形類の新しい座標 $t'$ は

$$
t'=cM^{-1}t
$$

> を満たす。実際の局所変形族同士の正則座標変換については、この式は原点での一次項を与えるものであり、一般に二次以上の項もあり得る。
<!-- formal-statement-end -->

### 証明の見取り図

収縮は $\Omega$ に線形で、基底の列は行列 $M$ によって変わる。変形類そのものは固定し、左右の展開係数を比較する。

<!-- proof-start -->
### 証明

[$\Omega$ による収縮の線形性](../../CYG/CYG1-12/index.md#def-cyg1-12-contraction)から

$$
[\phi\lrcorner\Omega']
=c[\phi\lrcorner\Omega]
=\sum_\mu ct_\mu[b_\mu].
$$

他方、新基底による展開は

$$
\sum_\nu t'_\nu[b'_\nu]
=\sum_{\mu,\nu}M_{\mu\nu}t'_\nu[b_\mu].
$$

$[b_\mu]$ は一次独立だから各係数を比較して $Mt'=ct$。$M$ は可逆なので $t'=cM^{-1}t$。正則な族の基底変更写像 $f$ についても、[Kodaira–Spencerの基底変更公式](../DEF1-01/index.md#prop-def1-01-base-change)を原点で微分すると同じ関係が得られるが、それは $Df(0)$ の式であり $f(t)$ 全体が線形であることまでは従わない。$\square$
<!-- proof-end -->

**手計算：二次元トーラス。** $\Omega=dz^1\wedge dz^2$、$\phi=\sum_{i,j=1}^2b_{ij}\,d\bar z^j\otimes\partial_{z^i}$ とする。[収縮の符号規則](../../CYG/CYG1-12/index.md#def-cyg1-12-contraction)に従うと

$$
\phi\lrcorner\Omega
=\sum_{j=1}^2\bigl(b_{1j}\,dz^2-b_{2j}\,dz^1\bigr)
\wedge d\bar z^j.
$$

したがって四つの行列成分は、$(1,1)$ 型の四つの独立な調和類に移る。$\Omega$ を $2\Omega$ に替え、基底を固定すれば同じ $\phi$ の係数は二倍になる。座標値が変わるだけで $H^1(X,T_X)$ の次元は変わらない。

## 5. 自己同型があっても、なくても注意が必要

自己同型のうち、恒等写像の近くにある連続的な方向は[無限小自己同型](../DEF1-04/index.md#thm-def1-04-infinitesimal-aut)の空間 $H^0(X,T_X)$ に現れる。ここでも体積形式の収縮は有効である。

<a id="prop-def1-11-automorphism-hodge"></a>

<!-- formal-statement-start -->
> **命題（Hodge数と無限小自己同型）**
>
> $X$ を複素次元 $n\ge2$ の連結・コンパクトKähler多様体とし、$K_X\simeq\mathcal O_X$ とする。このとき

$$
H^0(X,T_X)\simeq H^{n-1,0}(X),
\qquad \dim_{\mathbb C}H^0(X,T_X)=h^{n-1,0}(X).
$$

> 特に $h^{n-1,0}(X)=0$ なら、[標識付きKuranishi族](../DEF1-08/index.md#thm-def1-08-semiuniversal)は基点近傍で普遍となる。ただし離散的な正則自己同型の不存在や、標識を忘れた同型類空間の滑らかさまでは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

第3節の収縮同型を次数 $q=0$ へ使う。零次Dolbeault類は大域正則切断そのものなので、零次Hodge数が正則ベクトル場の次元を測る。普遍性の十分条件は既習のKuranishi理論を適用する。

<!-- proof-start -->
### 証明

[収縮による正則束同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-isomorphism)は $T_X\simeq\Omega_X^{n-1}$ を与える。大域正則切断を取ると

$$
H^0(X,T_X)\simeq H^0(X,\Omega_X^{n-1})
=H_{\bar\partial}^{n-1,0}(X).
$$

最後の等号は正則 $(n-1)$ 形式が $\bar\partial$-閉な $(n-1,0)$ 形式と同じであり、$(n-1,-1)$ 型からの完全形式が存在しないことによる。コンパクトKähler性の下で[Hodge数の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)により次元は $h^{n-1,0}(X)$ となる。

これが零なら $H^0(X,T_X)=0$ である。[自己同型と普遍性の十分条件](../DEF1-08/index.md#prop-def1-08-universality)を適用すれば標識付きKuranishi族の基底変更は基点近傍で一意になる。一方 $H^0$ は正則自己同型の**単位元における無限小方向**しか測らないので、離散的な自己同型まで消えたとは言えない。$\square$
<!-- proof-end -->

例えば $n\ge3$ で $0<p<n$ の $h^{p,0}(X)$ がすべて零になる型のCalabi–Yauなら、特に $h^{n-1,0}=0$ であり、標識付き普遍性の十分条件を満たす。K3曲面でも $h^{1,0}=0$ なので同様である。一方、複素二次元トーラスは $h^{1,0}=2$ で、平行移動に由来する二つの正則ベクトル場を持つ。

<a id="cor-def1-11-rigidity"></a>

<!-- formal-statement-start -->
> **系（Hodge数が零のときの局所剛性）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体とし、標準束 $K_X$ は正則自明とする。次のHodge数の条件が成り立つなら、$X$ の十分小さい標識付き正則変形は局所自明である。

$$
h^{n-1,1}(X)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

接空間の零次元性だけでは一般の特異・非被約Kuranishi基底が一点だとは言い切れない。ここではBTTによる**滑らかさ**を先に使える。

<!-- proof-start -->
### 証明

[Calabi–Yauの滑らかな局所変形座標](#thm-def1-11-local-chart)によれば基底は原点近傍の $\mathbb C^m$ で、$m=h^{n-1,1}(X)$。$m=0$ なら基底は一点であり、[局所完全性](../DEF1-08/index.md#thm-def1-08-semiuniversal)によって任意の十分小さい変形はこの一点上の定数族の引き戻しとなる。従って局所自明である。$\square$
<!-- proof-end -->

## 6. 標識を忘れたときの同一視

局所座標 $t$ が異なるファイバーを並べていても、正則同型がその二つを結ぶことはある。[標識付き半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)は、**すべての小変形を捉える**ことを約束するが、**同型類を重複なく一個ずつ数える**ことは約束していない。

**楕円曲線の明示例。** 複素上半平面 $\mathbb H$ の $\tau$ に対し $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ と置く。$\tau'=-1/\tau$ なら、格子を $1/\tau$ 倍することによって

$$
\frac1\tau(\mathbb Z+\tau\mathbb Z)
=\mathbb Z+\frac1\tau\mathbb Z
=\mathbb Z-\frac1\tau\mathbb Z
$$

となるので $E_\tau\simeq E_{-1/\tau}$。$\tau=i$ は $-1/\tau=i$ を満たす固定点だが、その近傍の変換の微分は

$$
\left.\frac{d}{d\tau}\left(-\frac1\tau\right)\right|_{\tau=i}
=\frac1{i^2}=-1.
$$

従って $u=\tau-i$ と書くと、同型な曲線に対応するパラメータが $u$ と $-u+O(u^2)$ に現れる。楕円曲線は複素次元1なので、この例はBTTの $n\ge2$ の証明を使うものではない。しかし、**滑らかな局所変形パラメータがそのまま標識なしの一対一分類にならない**という仕組みは同じである。

**有限群商は特異になることもある。** これは特定のCalabi–Yauのモジュライを主張する例ではなく、同一視の幾何学を理解するための二変数模型である。$\mathbb C^2$ の点 $(x,y)$ を同時に $(-x,-y)$ と同一視する。どちらの点でも値が同じになる三つの量を

$$
a=x^2,\qquad b=xy,\qquad c=y^2
$$

と置くと、常に $ac=b^2$。逆にこの方程式を満たす $(a,b,c)$ は複素数の平方根を選んで $(x,y)$ から得られ、零以外ではちょうど二点 $\{(x,y),(-x,-y)\}$ が対応する。像は複素二次曲面錐

$$
Q=\{(a,b,c)\in\mathbb C^3:ac-b^2=0\}
$$

である。定義式 $F=ac-b^2$ の勾配は $(c,-2b,a)$ で、原点では三成分が全て零になる。従って $Q$ は原点で特異である。元の $\mathbb C^2$ が滑らかであっても、有限群の同一視の結果は滑らかとは限らない。一方、有限群商が必ず特異になるわけでもない。

**三つの区別を保つ。**

1. $H^1(X,T_X)$ は一次変形類を数える。
2. BTTとKuranishiの定理で、その方向が実際の滑らかな標識付き局所変形基底を作る。
3. 正則同型類を大域的に分類するには、自己同型・標識の変更・モノドロミー・必要なら偏極条件など、さらに別の情報が要る。

最後の段階について、任意の非偏極Calabi–Yauの大域的な商空間が存在し、上の有限群模型と同じ形になると断言してはいけない。

## 7. 演習――接方向、滑らかさ、同一視を分ける

### Level A：一つずつ条件を確かめる

<a id="ex-def1-11-a01"></a>
#### DEF1-11-A01 収縮の二つの符号
- Level: A

$\Omega=dz^1\wedge dz^2$ とし、$\phi=(2\,d\bar z^1-d\bar z^2)\otimes\partial_{z^1}+3\,d\bar z^2\otimes\partial_{z^2}$ とする。$\phi\lrcorner\Omega$ を求め、各項の符号を説明せよ。

<!-- solution-start -->
**詳細解答。** [収縮の定義](../../CYG/CYG1-12/index.md#def-cyg1-12-contraction)から、第一引数に $\partial_{z^1}$ を入れると $dz^2$、$\partial_{z^2}$ を入れると $-dz^1$ になる。接束値形式の各成分を収縮し、正則1形式を先に置く順序に従うと

$$
\phi\lrcorner\Omega
=2\,dz^2\wedge d\bar z^1
-dz^2\wedge d\bar z^2
-3\,dz^1\wedge d\bar z^2.
$$

$dz^1$ の前の負号は $\iota_{\partial_{z^2}}(dz^1\wedge dz^2)=-dz^1$ に由来する。$d\bar z^j$ を右に置いているので追加の交換符号を掛けない。
<!-- solution-end -->

<a id="ex-def1-11-a02"></a>
#### DEF1-11-A02 トーラスの二種類の次元
- Level: A

$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ では $T_X\simeq\mathcal O_X^{\oplus2}$、$\dim H^0(X,\mathcal O_X)=1$、$\dim H^1(X,\mathcal O_X)=2$ とする。$\dim H^0(X,T_X)$ と $\dim H^1(X,T_X)$ を求め、それぞれ何を測るかを答えよ。

<!-- solution-start -->
**詳細解答。** 直和の層コホモロジーは成分ごとに計算できるので

$$
H^q(X,T_X)\simeq H^q(X,\mathcal O_X)^{\oplus2}.
$$

従って $\dim H^0(X,T_X)=2\cdot1=2$、$\dim H^1(X,T_X)=2\cdot2=4$。前者は[無限小正則自己同型](../DEF1-04/index.md#thm-def1-04-infinitesimal-aut)で、二つの平行移動ベクトル場が対応する。後者は[一次変形類](../../CYG/CYG1-12/index.md#thm-cyg1-12-first-order-classification)の四方向である。二つの次元をどちらも「モジュライの次元」と呼んではいけない。
<!-- solution-end -->

<a id="ex-def1-11-a03"></a>
#### DEF1-11-A03 体積形式を二倍するとき
- Level: A

一次変形類 $[\phi]$ が $[\phi\lrcorner\Omega]=t[b]$ と表されている。$[b]$ を固定して $\Omega'=2\Omega$ とした場合、同じ変形類の係数 $t'$ を求めよ。さらに $[b']=2[b]$ も同時に変更したらどうなるか。

<!-- solution-start -->
**詳細解答。** 収縮は体積形式に線形だから $[\phi\lrcorner(2\Omega)]=2t[b]$。従って $[b]$ が同じなら $t'=2t$。基底も $[b']=2[b]$ と変えた場合は $2t[b]=t'[b']=2t'[b]$ なので $t'=t$。この相違は[一次座標変換命題](#prop-def1-11-coordinate-change)の $c=2$、$M=1$ または $M=2$ に対応する。
<!-- solution-end -->

<a id="ex-def1-11-a04"></a>
#### DEF1-11-A04 Hodge数から二つの判定
- Level: A

複素次元2のコンパクトKähler多様体 $X$ で $K_X\simeq\mathcal O_X$、$h^{1,0}(X)=0$、$h^{1,1}(X)=20$ と仮定する。標識付き局所変形基底の次元と $H^0(X,T_X)$ の次元を求めよ。

<!-- solution-start -->
**詳細解答。** $n=2$ なので[局所座標定理](#thm-def1-11-local-chart)の次元は $h^{n-1,1}=h^{1,1}=20$。一方[零次の収縮同型](#prop-def1-11-automorphism-hodge)により $\dim H^0(X,T_X)=h^{n-1,0}=h^{1,0}=0$。従って20次元の滑らかな標識付き局所変形基底があり、基点近傍での基底変更は普遍性の十分条件を満たす。しかし離散的な自己同型まで不存在とは結論できない。
<!-- solution-end -->

<a id="ex-def1-11-a05"></a>
#### DEF1-11-A05 楕円曲線の固定点
- Level: A

$S(\tau)=-1/\tau$ とする。$S(i)$ と $S'(i)$ を求め、$E_\tau\simeq E_{S(\tau)}$ が局所座標の一対一性について何を示すか述べよ。

<!-- solution-start -->
**詳細解答。** $S(i)=-1/i=i$。商の微分を行うと $S'(\tau)=\tau^{-2}$ だから $S'(i)=1/i^2=-1$。よって $\tau=i+u$ に対し $S(\tau)=i-u+O(u^2)$。$u$ と $-u+O(u^2)$ は一般には異なるのに、対応する楕円曲線は格子の $1/\tau$ 倍によって正則同型である。標識を忘れると異なる局所パラメータを同一視し得る。
<!-- solution-end -->

### Level B：既習結果を二つ以上つなぐ

<a id="ex-def1-11-b01"></a>
#### DEF1-11-B01 滑らかな基底と零の障害写像
- Level: B

$K=\{\kappa=0\}\subset V\subset\mathbb C^m$ をKuranishi基底とし、$\kappa:V\to H^2(X,T_X)$ を正則写像とする。原点近傍の $U\subset\mathbb C^m$ から $K$ への正則写像 $f$ があり、$g=i\circ f:U\to V$ は $Dg(0)$ が可逆であるとする。$\kappa$ が原点の芽として零になる理由を説明し、単に集合 $K$ が滑らかという情報との違いを述べよ。

<!-- solution-start -->
**詳細解答。** $Dg(0)$ が複素線形で可逆なので実Jacobianも可逆である。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)で $g$ を縮小すると、実 $C^1$ 逆写像を持ち、その微分も複素線形なので逆写像は正則である。従って像は $V$ 内の開近傍となる。$f$ は $K$ に値を取るので $\kappa(g(u))=0$ が全 $u\in U$ で成立する。従って $\kappa$ の各成分は開近傍 $g(U)$ 上で零、すなわち正則写像の芽として恒等的に零である。そのため局所環は

$$
\mathbb C\{t_1,\ldots,t_m\}/(\kappa)
=\mathbb C\{t_1,\ldots,t_m\}.
$$

単に台集合が滑らかだと分かるだけでは、例えば $\mathbb C\{w\}/(w^2)$ の冪零元を排除できない。上の開集合上の正則方程式の消滅が必要であり、[BTTとKuranishiの結合](../DEF1-10/index.md#thm-def1-10-btt-smooth)はこの点まで述べている。
<!-- solution-end -->

<a id="ex-def1-11-b02"></a>
#### DEF1-11-B02 無限小自己同型が零でも終わらない
- Level: B

$X$ は複素次元 $n\ge3$ のコンパクトKähler多様体で $K_X\simeq\mathcal O_X$、かつ $h^{p,0}(X)=0$（$0<p<n$）とする。標識付きKuranishi族の普遍性が従う順序を示せ。また、この仮定から標識なしの大域同型類の空間が滑らかだと結論できるか。

<!-- solution-start -->
**詳細解答。** $n\ge3$ だから $p=n-1$ は $0<p<n$ の範囲にある。従って $h^{n-1,0}=0$。[収縮同型](#prop-def1-11-automorphism-hodge)から

$$
H^0(X,T_X)\simeq H^{n-1,0}(X)=0.
$$

この条件を[自己同型と普遍性の命題](../DEF1-08/index.md#prop-def1-08-universality)に代入すると、中心の標識を保つ局所基底変更が一意になる。ただし $H^0$ は正則自己同型の無限小方向の消滅だけを意味する。離散的な自己同型や遠くのパラメータの同一視は残り得るので、標識なしの大域商空間の存在・滑らかさは従わない。
<!-- solution-end -->

<a id="ex-def1-11-b03"></a>
#### DEF1-11-B03 複素二次曲面錐への有限群商
- Level: B

$(x,y)\mapsto(-x,-y)$ による同一視を考え、$q(x,y)=(x^2,xy,y^2)$ と置く。像が $Q=\{ac=b^2\}$ に等しいこと、零でない点の $q$ のファイバーが二元集合であること、$Q$ が原点で特異であることをそれぞれ示せ。

<!-- solution-start -->
**詳細解答。** $q(x,y)=(a,b,c)$ なら $ac=x^2y^2=(xy)^2=b^2$。逆に $ac=b^2$ で $a\ne0$ なら $x^2=a$ の二つの平方根から一つ $x$ を選び、$y=b/x$ とすれば $y^2=b^2/a=c$。$a=0$ なら $b=0$ なので $x=0$、$y^2=c$ とすればよい。

零でない $(a,b,c)$ では少なくとも $a$ または $c$ が非零で、その平方根は符号違いの二つだけ。$xy=b$ が相対符号を固定するため、原像は $(x,y)$ と $(-x,-y)$ の二点である。最後に $F(a,b,c)=ac-b^2$ の偏微分は

$$
\frac{\partial F}{\partial a}=c,\qquad
\frac{\partial F}{\partial b}=-2b,\qquad
\frac{\partial F}{\partial c}=a.
$$

三つとも原点で零なので、超曲面のJacobian判定により原点は特異点である。$Q$ の次元は2でも、原点の接空間は $\mathbb C^3$ 全体になる。この模型を任意のCalabi–YauのKuranishi商だと同定する追加の根拠はない。
<!-- solution-end -->

<a id="ex-def1-11-b04"></a>
#### DEF1-11-B04 基底行列を最後まで計算する
- Level: B

$H^{n-1,1}(X)$ の二次元部分空間の基底 $([b_1],[b_2])$ を $[b'_1]=[b_1]+[b_2]$、$[b'_2]=[b_2]$ と変更し、さらに $\Omega'=2\Omega$ とする。もとの一次変形座標 $t=(t_1,t_2)^\mathsf T$ から新座標 $t'$ を求めよ。

<!-- solution-start -->
**詳細解答。** 新基底をもとの基底の列で展開すると

$$
M=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\qquad M^{-1}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}.
$$

[一次座標変換命題](#prop-def1-11-coordinate-change)の $c=2$ に代入して

$$
t'=2M^{-1}t
=\begin{pmatrix}2t_1\\2(t_2-t_1)\end{pmatrix}.
$$

実際、$t'_1[b'_1]+t'_2[b'_2]=2t_1[b_1]+2t_2[b_2]$ となり、$[\phi\lrcorner(2\Omega)]$ と一致する。これは局所座標変換の一次項であり、高次補正のないことは主張していない。
<!-- solution-end -->

### Level C：局所変形と同型類の違いをまとめる

<a id="ex-def1-11-c01"></a>
#### DEF1-11-C01 複素二次元トーラスの局所変形を一続きに調べる
- Level: C

$X=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$、$\Omega=dz^1\wedge dz^2$ とする。小さい行列 $B=(b_{ij})$ に対し

$$
\phi_B=\sum_{i,j=1}^2b_{ij}\,d\bar z^j\otimes\partial_{z^i}
$$

を考える。次の問いを一続きに解け。

1. $\bar\partial_T\phi_B$ と $[\phi_B,\phi_B]$ がともに零であることを確認し、小さい $B$ が複素構造を与える理由を述べよ。
2. $\phi_B\lrcorner\Omega$ を明示し、$H^1(X,T_X)$ が四次元であることと照合せよ。
3. $H^0(X,T_X)$ の次元を求め、それだけから四次元基底の点がすべて異なる正則同型類だと結論できるか判断せよ。
4. $B=0$ の周りの滑らかな標識付き局所変形座標が存在する根拠を、既習の二定理を挙げて説明せよ。

<!-- solution-start -->
**詳細解答。**

1. 係数 $b_{ij}$ は $z,\bar z$ に依存しないので $\bar\partial_T\phi_B=0$。また[括弧の座標式](../DEF1-03/index.md#def-def1-03-bracket)は各項に $\partial_{z^p}b_{ij}$ を含み、全て零となるため $[\phi_B,\phi_B]=0$。従ってMaurer–Cartan方程式は満たされる。さらに $B$ が十分小さければ $I-\bar BB$ が可逆で、反正則方向のグラフが共役と直和になる。[可積分性定理](../DEF1-03/index.md#thm-def1-03-maurer-cartan)から複素構造になる。
2. 二つの基本収縮 $\iota_{\partial_{z^1}}\Omega=dz^2$、$\iota_{\partial_{z^2}}\Omega=-dz^1$ を各 $j$ へ適用すると

$$
\begin{aligned}
\phi_B\lrcorner\Omega
={}&b_{11}\,dz^2\wedge d\bar z^1
+b_{12}\,dz^2\wedge d\bar z^2\\
&-b_{21}\,dz^1\wedge d\bar z^1
-b_{22}\,dz^1\wedge d\bar z^2.
\end{aligned}
$$

   これは独立な四つの定数係数 $(1,1)$ 形式の線形結合で、平坦Kähler計量に関して調和である。[収縮のDolbeault同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)と $h^{1,1}(X)=4$ により、四つの $b_{ij}$ が $H^1(X,T_X)$ の全方向を与える。$h^{1,1}=4$ は二つの独立な $dz^i$ と二つの $d\bar z^j$ の外積から直接数えられる。
3. $T_X$ は二つの定数正則ベクトル場 $\partial_{z^1},\partial_{z^2}$ で自明化され、コンパクト連結多様体の正則関数は定数だから $H^0(X,T_X)\simeq\mathbb C^2$。これは平行移動の無限小自己同型を表すが、四次元の一次変形方向とは別の空間である。同型類としての一対一性は、標識を忘れたときの格子の取り替えや自己同型の作用を調べなければ判断できない。
4. [BTTの滑らかさ](../DEF1-10/index.md#thm-def1-10-btt-smooth)によりKuranishi基底は次元 $\dim H^1=4$ の滑らかな芽であり、[Kuranishiの半普遍性](../DEF1-08/index.md#thm-def1-08-semiuniversal)により全ての十分小さい標識付き変形を引き戻しで捕捉する。上の四方向のKodaira–Spencer像は一次独立だから、この具体的な $B$ 族の基底写像も原点で可逆な微分を持つ。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)を実・虚の座標へ適用し、逆写像の正則性を確かめて原点近傍を縮小すれば、$B$ は[標識付き局所変形座標](#def-def1-11-marked-chart)になる。

この結論は「全ての $B$ が大域で異なる同型類を表す」ことも「正則自己同型が恒等写像しかない」ことも意味しない。
<!-- solution-end -->

## 8. 次に何を変動させるか

この章では、$H^{n-1,1}(X)$ のベクトルが局所変形の**接方向**になることと、その方向がBTTによって実際の滑らかな基底へ延長されることを区別して確かめた。$\Omega$ はここまで中心ファイバー上に固定していた。

次は、ファイバー $X_t$ が動くとき各 $H^k(X_t,\mathbb C)$ をどのように比較するかを考える。単に異なるベクトル空間の元を引き算することはできない。[次章のGauss–Manin接続](../DEF1-12/index.md)では、滑らかな固有族の局所系と平坦接続を構成し、その後でHodgeフィルトレーションの変動を調べる。
