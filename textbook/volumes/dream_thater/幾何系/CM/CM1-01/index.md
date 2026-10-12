# CM1-01 複素座標と高次元正則アトラス

<!-- definition-example-audit: strict -->

## 1. Riemann 面の座標を二つ以上並べるには

[CA8 の Riemann 面](../../../解析系/CA/CA8/index.md#def-ca8-riemann-surface)では、各点の近傍を複素平面 $\mathbb C$ の開集合と同一視し、重なりで一変数正則な座標変換が働いた。これで曲面上の正則関数を局所座標から扱えた。しかし、二つの Riemann 面を組み合わせて得る空間では、点を一つの複素数では表せない。局所的に二つ、あるいは $n$ 個の複素数が必要になる。

本章で解決するのは、**$\mathbb C^n$ 値の座標を、どの条件で矛盾なく貼り合わせられるか**という問いである。CA8 の議論を単に「高次元でも同様」と片付けず、次の順に確かめる。

1. 複数の複素変数を持つ座標変換の正則性を判定する。
2. 局所座標と重なりの定義域を明記する。
3. 具体的な非線形変換でも貼り合わせられることを証明する。
4. 異なるアトラスが同じ複素構造を記述する条件を整理する。
5. Riemann 面の直積から複素二次元の例を作る。

ここで扱うのは複素構造の**座標による構成**までである。実接束上の $J^2=-1$、$(1,0)$ 型の分解、Nijenhuis テンソル、積分可能性は後続章で導入する。

## 2. 多変数で「正則」とは何か

複素一変数では、複素数の方向から近づけた差商が一つの極限へ収束することが正則性の出発点だった。$n$ 変数では差分 $h\in\mathbb C^n$ の方向が複数あるため、まず実微分を使い、その微分が複素数の掛け算と両立するか調べる。

$\mathbb C^n$ を実ベクトル空間 $\mathbb R^{2n}$ と同一視する。複素線形写像 $L:\mathbb C^n\to\mathbb C^m$ とは、加法性に加えて、任意の $h$ について $L(ih)=iL(h)$ が成り立つ実線形写像のことである。

<a id="def-cm1-01-holomorphic-map"></a>
<!-- formal-statement-start -->
> **定義（複素線形微分による多変数正則写像）**  
> $U\subset\mathbb C^n$ を開集合、$F:U\to\mathbb C^m$ を写像とする。$F$ が実変数の意味で $C^1$ 級であり、各 $z\in U$ における実微分
>
$$
D_{\mathbb R}F_z:\mathbb R^{2n}\longrightarrow\mathbb R^{2m}
$$
>
> が複素線形、すなわち全ての $h\in\mathbb C^n$ に対して
>
$$
D_{\mathbb R}F_z(ih)=iD_{\mathbb R}F_z(h)
$$
>
> を満たすとき、$F$ は **正則** であるという。この微分を複素線形写像として見たものを $D_{\mathbb C}F_z$ と書く。
<!-- formal-statement-end -->

この $C^1$ 判定は通常の多変数複素解析における正則性と一致する。本章で使うのは上の判定式と実微分の連鎖律だけなので、冪級数展開や多変数の積分定理を暗黙に前提としない。

<!-- definition-example-start: def-cm1-01-holomorphic-map -->
**定義の確認**。$F(z_1,z_2)=(z_1+z_2^2,z_2)$ とする。増分 $h=(h_1,h_2)$ について

$$
F(z+h)-F(z)
=
(h_1+2z_2h_2,h_2)+(h_2^2,0).
$$

最初の項は $h$ に関して複素線形で、残差のノルムは $|h_2|^2\le\|h\|^2$ だから $o(\|h\|)$ である。従って

$$
D_{\mathbb C}F_z(h_1,h_2)
=
(h_1+2z_2h_2,h_2).
$$

係数は $z$ に連続に依存し、$D_{\mathbb C}F_z(ih)=iD_{\mathbb C}F_z(h)$ も成り立つため、$F$ は正則である。
<!-- definition-example-end -->

反対に $K(z_1,\ldots,z_n)=(\overline{z_1},z_2,\ldots,z_n)$ を考える。第一成分に $h=(1,0,\ldots,0)$ を入れると、$DK(ih)$ の第一成分は $-i$、$iDK(h)$ の第一成分は $i$ となる。従って複素線形条件は破れ、$K$ は正則でない。この例では、**実微分可能であることと複素正則であることは異なる**。

次の合成則が、座標を三つ以上貼る場面で必要となる。

<a id="prop-cm1-01-composition"></a>
<!-- formal-statement-start -->
> **命題（正則写像の合成と双正則座標変換）**  
> $U\subset\mathbb C^n$、$V\subset\mathbb C^m$、$W\subset\mathbb C^\ell$ を開集合とする。$F:U\to V$、$G:V\to W$ が正則なら $G\circ F$ は正則である。また $F$ が実 $C^1$ 級微分同相写像で正則なら、逆写像 $F^{-1}:V\to U$ も正則である。
<!-- formal-statement-end -->

### 証明の見取り図

[実微分の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)によって合成の微分は二つの微分の積になる。複素線形写像どうしの合成も複素線形である。逆写像については恒等写像 $F^{-1}\circ F$ を微分し、逆行列を作る。

<!-- proof-start -->
### 証明

$z\in U$、$h\in\mathbb C^n$ を固定する。実 $C^1$ 級写像の連鎖律を $F$ と $G$、評価点 $z$ に適用すると

$$
D_{\mathbb R}(G\circ F)_z
=
D_{\mathbb R}G_{F(z)}\circ D_{\mathbb R}F_z.
$$

両方の微分は複素線形なので

$$
\begin{aligned}
D(G\circ F)_z(ih)
&=DG_{F(z)}\bigl(DF_z(ih)\bigr)\\
&=DG_{F(z)}\bigl(iDF_z(h)\bigr)\\
&=iDG_{F(z)}\bigl(DF_z(h)\bigr)\\
&=iD(G\circ F)_z(h).
\end{aligned}
$$

合成は実 $C^1$ 級でもあるため、定義を満たす。

後半では、$F$ が実 $C^1$ 級微分同相写像という仮定から $F^{-1}$ は実 $C^1$ 級である。$w=F(z)$ とし、$F^{-1}\circ F=\operatorname{id}_U$ を $z$ で微分すると

$$
D(F^{-1})_w\circ DF_z=I_{\mathbb R^{2n}}.
$$

$DF_z$ は可逆な複素線形写像であり、その逆も複素線形である。実際 $k=DF_z(h)$ と書けば

$$
(DF_z)^{-1}(ik)
=(DF_z)^{-1}(DF_z(ih))
=ih=i(DF_z)^{-1}(k).
$$

したがって $D(F^{-1})_w=(DF_z)^{-1}$ は複素線形で、$F^{-1}$ は正則である。$\square$
<!-- proof-end -->

後半は、逆写像の存在・$C^1$ 性を仮定している。**正則であるだけの写像が必ず全域で逆を持つとは主張していない**。たとえば $e^z$ は正則だが、$e^{z+2\pi i}=e^z$ なので単射ではない。

## 3. 高次元の局所座標と正則アトラス

[CA8 の複素座標近傍](../../../解析系/CA/CA8/index.md#def-ca8-complex-chart)では座標像が $\mathbb C$ の開集合だった。ここでは複素数を $n$ 個並べた $\mathbb C^n$ を使う。

<a id="def-cm1-01-chart"></a>
<!-- formal-statement-start -->
> **定義（複素n次元座標近傍）**  
> $X$ を位相空間、$n\ge1$ を整数とする。開集合 $U\subset X$ と $\mathbb C^n$ の開集合 $V$ の間の同相写像
>
$$
\varphi:U\longrightarrow V
$$
>
> の組 $(U,\varphi)$ を **複素 $n$ 次元座標近傍**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-01-chart -->
**定義の確認**。$X=\mathbb C^2$ とし $U=\{(z_1,z_2):|z_1|<1\}$ を取る。$\varphi(z_1,z_2)=(z_1,z_2)$ は $U$ から $\mathbb C^2$ の開集合 $U$ への同相写像なので複素二次元座標近傍となる。$U$ は空間全体でなくてよい。
<!-- definition-example-end -->

複数の座標が重なるとき、元の点を $\varphi_\alpha$ で表してから $\varphi_\beta$ へ移す。そのため、遷移写像の定義域と値域は**全座標像ではなく重なりの像**である。

<a id="def-cm1-01-atlas"></a>
<!-- formal-statement-start -->
> **定義（高次元正則アトラス）**  
> $X$ を Hausdorff かつ第二可算な位相空間とし、$n\ge1$ を整数とする。$X$ を覆う複素 $n$ 次元座標近傍の族
>
$$
\mathcal A=\{(U_\alpha,\varphi_\alpha)\}_{\alpha\in I}
$$
>
> が **正則アトラス** であるとは、重なり $U_\alpha\cap U_\beta\ne\varnothing$ のたびに
>
$$
T_{\beta\alpha}=
\varphi_\beta\circ\varphi_\alpha^{-1}:
\varphi_\alpha(U_\alpha\cap U_\beta)
\longrightarrow
\varphi_\beta(U_\alpha\cap U_\beta)
$$
>
> が多変数の意味で正則であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-01-atlas -->
**定義の確認**。$\mathbb C^2$ 上の恒等座標一つからなる族は、全域を覆い、重なりの遷移は恒等写像である。恒等写像の微分は複素線形恒等行列だから正則アトラスとなる。
<!-- definition-example-end -->

異なる順序の組 $(\alpha,\beta)$ についても条件を課すので、$T_{\beta\alpha}$ と $T_{\alpha\beta}$ の両方が正則である。単に「片方向の写像が正則」なのではなく、**遷移は双正則**となる。また重なりの像が開集合であることは、$U_\alpha\cap U_\beta$ が開で $\varphi_\alpha$ が同相写像であることから従う。

<a id="def-cm1-01-manifold"></a>
<!-- formal-statement-start -->
> **定義（複素n次元多様体）**  
> Hausdorff かつ第二可算な位相空間 $X$ に、複素 $n$ 次元正則アトラスを指定したものを、**複素 $n$ 次元多様体**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-01-manifold -->
**定義の確認**。$\mathbb C^n$ は Euclid 距離から Hausdorff であり、有理数成分の中心と正の有理数半径を持つ球の族が可算基底になる。恒等座標で全体を覆えば、重なりの条件は恒等写像の正則性へ帰着する。したがって $\mathbb C^n$ は複素 $n$ 次元多様体である。
<!-- definition-example-end -->

位相条件を座標の存在から勝手に省略してはいけない。各点に Euclid 空間に同相な近傍があっても、相異なる二点が互いに素な開近傍を持つとは限らず、また全体で可算基底を持つとも限らない。

## 4. 非線形の座標でも貼り合わせられる

一つの恒等座標だけでは、遷移条件が空虚に見える。そこで、$\mathbb C^2$ 上に二種類の座標を置く。

$$
\varphi(z_1,z_2)=(z_1,z_2),\qquad
\psi(z_1,z_2)=(z_1+z_2^2,z_2).
$$

<a id="prop-cm1-01-shear-atlas"></a>
<!-- formal-statement-start -->
> **命題（非線形剪断座標による正則アトラス）**  
> $X=\mathbb C^2$ に上の二つの全域座標を置くと正則アトラスになる。座標遷移は非線形だが双正則であり、複素 Jacobi 行列の行列式は全点で $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

座標 $\psi$ の第二成分は $z_2$ のままなので、まずそこを読み取って第一成分を逆算できる。正方向も逆方向も、微分を増分から計算して複素線形性を確かめる。

<!-- proof-start -->
### 証明

$F=\psi\circ\varphi^{-1}$ は上の非線形写像そのものである。$(w_1,w_2)=F(z_1,z_2)$ なら

$$
w_2=z_2,\qquad w_1=z_1+z_2^2.
$$

従って逆を陽に

$$
F^{-1}(w_1,w_2)=(w_1-w_2^2,w_2)
$$

と書ける。両方向の合成を確認すると

$$
\begin{aligned}
F^{-1}(F(z_1,z_2))
&=(z_1+z_2^2-z_2^2,z_2)\\
&=(z_1,z_2),
\end{aligned}
$$

$$
\begin{aligned}
F(F^{-1}(w_1,w_2))
&=(w_1-w_2^2+w_2^2,w_2)\\
&=(w_1,w_2).
\end{aligned}
$$

どちらも多項式写像だから実 $C^1$ 級で、互いに連続な逆写像を持つため同相である。$F$ の実微分を複素成分で表すと

$$
D_{\mathbb C}F_z=
\begin{pmatrix}
1&2z_2\\
0&1
\end{pmatrix}.
$$

逆方向の微分も

$$
D_{\mathbb C}(F^{-1})_w=
\begin{pmatrix}
1&-2w_2\\
0&1
\end{pmatrix}.
$$

各行列は複素線形写像を定め、係数は連続である。したがって両写像は正則。さらに

$$
\det D_{\mathbb C}F_z=1\cdot1-0\cdot2z_2=1.
$$

$\mathbb C^2$ は Hausdorff かつ第二可算であり、二座標は全域を覆う。重なりは全域なので、調べた二方向の正則性によって正則アトラスを得る。$\square$
<!-- proof-end -->

例の $F$ を複素共役へ取り替えてはいけない。前節の $K$ は同相写像だから座標としては使えるが、恒等座標との間の遷移が正則でない。そのため、恒等座標と $K$ 座標の**組**は正則アトラスをなさない。失った条件は双方向の正則性であり、壊れる機構は微分の複素線形性である。

## 5. アトラスを替えると別の複素多様体になるのか

同じ $\mathbb C^2$ には恒等座標のほか、上の剪断座標のような無数の正則座標がある。一つ座標を追加するだけで別の空間と扱うと、記述が不必要に増殖する。そこで二つの座標系が一緒に使えるかを判定する。

<a id="def-cm1-01-compatible"></a>
<!-- formal-statement-start -->
> **定義（アトラスの両立性）**  
> 同じ位相空間 $X$ 上の複素 $n$ 次元正則アトラス $\mathcal A,\mathcal B$ が **両立** するとは、$\mathcal A\cup\mathcal B$ が正則アトラスであることをいう。言い換えると、一方の座標と他方の座標の任意の重なりにおける遷移写像が正則である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-01-compatible -->
**定義の確認**。恒等座標だけのアトラス $\mathcal A$ と、剪断座標だけのアトラス $\mathcal B$ は両立する。実際、両者の間の遷移は[前節の命題](#prop-cm1-01-shear-atlas)で双正則と確認した。
<!-- definition-example-end -->

<a id="def-cm1-01-maximal"></a>
<!-- formal-statement-start -->
> **定義（極大正則アトラス）**  
> 複素 $n$ 次元正則アトラス $\mathcal M$ が **極大** であるとは、$\mathcal M$ と両立する任意の複素 $n$ 次元座標近傍が、既に $\mathcal M$ に属することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm1-01-maximal -->
**定義の確認**。$\mathbb C^n$ の恒等座標から始め、それと双正則な座標変換を持つ全ての局所座標を集めた族は極大になる。なぜ「全て」を加えても二つの新しい座標が衝突しないかは、次の定理で実際に示す。
<!-- definition-example-end -->

<a id="thm-cm1-01-maximal-extension"></a>
<!-- formal-statement-start -->
> **定理（両立アトラスの極大延長）**  
> $X$ 上の任意の複素 $n$ 次元正則アトラス $\mathcal A$ に対して、$\mathcal A$ を含む極大正則アトラス $\mathcal M(\mathcal A)$ がただ一つ存在する。二つの正則アトラス $\mathcal A,\mathcal B$ が両立することと、それぞれの極大延長が一致することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal A$ と両立する座標を全部集める。追加した座標 $a,c$ の間に直接の遷移条件がないように見えるが、重なりの各点で**もとのアトラスの座標 $b$ を中継**すれば、$a\to b\to c$ の合成として正則性を証明できる。

<!-- proof-start -->
### 証明

$\mathcal A$ と両立する全ての複素 $n$ 次元座標を集めた族を $\mathcal M$ とする。$\mathcal A$ 自身の座標は互いに両立するので $\mathcal A\subset\mathcal M$ であり、$\mathcal M$ は $X$ を覆う。

$\mathcal M$ に属する二座標 $(U,\varphi)$、$(W,\chi)$ を任意に取る。$p\in U\cap W$ を固定する。$\mathcal A$ は $X$ を覆うから、$p\in V$ である座標 $(V,\psi)\in\mathcal A$ を取れる。三重共通部分 $U\cap V\cap W$ 上で

$$
\chi\circ\varphi^{-1}
=
(\chi\circ\psi^{-1})\circ(\psi\circ\varphi^{-1}).
$$

右辺の二写像は、各追加座標が $\mathcal A$ と両立することから正則である。[正則写像の合成](#prop-cm1-01-composition)により左辺は $\varphi(p)$ の近傍で正則となる。$p$ は重なりの任意の点なので、遷移は重なり全体で正則である。逆向きは $\varphi,\chi$ を交換して同じ議論を行う。よって $\mathcal M$ は正則アトラスである。

$\mathcal M$ と両立する座標は、$\mathcal A\subset\mathcal M$ なので $\mathcal A$ とも両立する。従って定義から $\mathcal M$ に属し、極大性が示された。

$\mathcal N$ が $\mathcal A$ を含む別の極大アトラスなら、$\mathcal N$ の各座標は $\mathcal A$ と両立し、$\mathcal N\subset\mathcal M$。逆に $\mathcal M$ の座標は $\mathcal N$ と両立するかを確認する。同じ中継論法を、$p$ を含む $\mathcal A$ の座標を介して適用すれば、$\mathcal M$ と $\mathcal N$ の任意の座標が両立する。$\mathcal N$ の極大性から $\mathcal M\subset\mathcal N$。両者は一致する。

最後に、$\mathcal A,\mathcal B$ が両立すれば、上と同じ中継論法によって $\mathcal M(\mathcal A)$ と $\mathcal M(\mathcal B)$ の各座標が両立し、双方の極大性から一致する。逆に極大延長が一致すれば、$\mathcal A$ と $\mathcal B$ は同じ正則アトラスの部分族だから両立する。$\square$
<!-- proof-end -->

ここでの「極大」は**元のアトラスを最大限に拡張した**という意味であり、座標近傍の数を有限にすることではない。複素多様体を定義する実用上は、少数の座標で構成し、必要なときにその極大延長を同じ複素構造として扱えばよい。

## 6. Riemann 面の直積は複素二次元になる

一変数の知識から新しい高次元例を作る。$X,Y$ を Riemann 面とし、両者に [CA8 の正則アトラス](../../../解析系/CA/CA8/index.md#def-ca8-holomorphic-atlas)を与える。座標 $\varphi:U\to V\subset\mathbb C$ と $\psi:W\to Z\subset\mathbb C$ を組み合わせ、

$$
\Phi:U\times W\longrightarrow V\times Z,\qquad
\Phi(p,q)=(\varphi(p),\psi(q))
$$

と定める。$V\times Z$ は $\mathbb C^2$ の開集合である。

<a id="prop-cm1-01-product"></a>
<!-- formal-statement-start -->
> **命題（複素多様体の有限直積）**  
> $X$ が複素 $m$ 次元多様体、$Y$ が複素 $n$ 次元多様体なら、積位相を持つ $X\times Y$ は積座標によって複素 $(m+n)$ 次元多様体になる。特に二つの Riemann 面の直積は複素二次元多様体である。
<!-- formal-statement-end -->

### 証明の見取り図

位相条件（Hausdorff・第二可算）と座標条件を分けて確認する。重なりの遷移は各因子の正則遷移を並べただけなので、その微分はブロック対角行列になる。

<!-- proof-start -->
### 証明

まず Hausdorff 性を確かめる。$(p,q)\ne(p',q')$ なら $p\ne p'$ または $q\ne q'$。前者なら Hausdorff 性により、$p$ の開近傍 $U$ と $p'$ の開近傍 $U'$ が互いに素になるよう選べる。$U\times Y$ と $U'\times Y$ は積空間内で互いに素な開近傍となる。後者も $X\times W$ と $X\times W'$ を使えばよい。

次に、$X,Y$ の可算基底をそれぞれ $\{B_i\}_{i\in\mathbb N}$、$\{C_j\}_{j\in\mathbb N}$ とする。積位相では $B_i\times C_j$ が基底で、$\mathbb N^2$ は可算であるため第二可算となる。

各因子の局所座標 $\varphi:U\to V\subset\mathbb C^m$ と $\psi:W\to Z\subset\mathbb C^n$ から、積写像 $\Phi=\varphi\times\psi$ は $U\times W$ から $V\times Z\subset\mathbb C^{m+n}$ への同相写像となる。積座標の定義域は $X\times Y$ を覆う。

別の積座標 $\widetilde\Phi=\widetilde\varphi\times\widetilde\psi$ を取ると、重なりは

$$
(U\cap\widetilde U)\times(W\cap\widetilde W)
$$

であり、その像での遷移は

$$
\widetilde\Phi\circ\Phi^{-1}(z,w)
=
\bigl(f(z),g(w)\bigr),
$$

ここで

$$
f=\widetilde\varphi\circ\varphi^{-1},
\qquad
g=\widetilde\psi\circ\psi^{-1}.
$$

$f$、$g$ は因子の正則アトラスの条件から正則である。その実微分を複素線形写像として並べると

$$
D_{\mathbb C}(\widetilde\Phi\circ\Phi^{-1})_{(z,w)}
=
\begin{pmatrix}
D_{\mathbb C}f_z&0\\
0&D_{\mathbb C}g_w
\end{pmatrix}.
$$

このブロック対角行列も複素線形である。逆遷移についても因子を交換した同じ議論が成り立つ。従って積座標は正則アトラスである。$\square$
<!-- proof-end -->

**具体例**。$X=Y=\widehat{\mathbb C}$ を Riemann 球面とする。[CA8 の球面二座標](../../../解析系/CA/CA8/index.md#prop-ca8-riemann-sphere-atlas)は、有限点座標 $z$ と無限遠点側の座標 $\zeta=1/z$ を持つ。$X\times Y$ では各因子を二通りに選ぶから、四つの積座標で全体を覆える。両方の座標を交換する重なりでは

$$
(z,w)\longmapsto\left(\frac1z,\frac1w\right),
\qquad z,w\in\mathbb C^\times.
$$

複素 Jacobi 行列は

$$
\begin{pmatrix}
-1/z^2&0\\
0&-1/w^2
\end{pmatrix}
$$

で、逆向きも同形である。$\widehat{\mathbb C}\times\widehat{\mathbb C}$ は複素二次元だが、全体を一組の $\mathbb C^2$ 座標で覆えるとは主張していない。

## 7. 演習

以下の問題では、正則性を「実 $C^1$ 級で、各点の実微分が複素線形」という条件から確認してよい。計算の途中では、写像・定義域・逆写像の区別を明示すること。

### Level A

<a id="ex-cm1-01-a01"></a>
#### CM1-01-A01 複素線形な定数係数写像
- Level: A

$F:\mathbb C^2\to\mathbb C^2$ を $F(z_1,z_2)=(z_1+iz_2,2z_2)$ とする。正則性と、複素 Jacobi 行列の行列式を調べよ。

<!-- solution-start -->
**詳細解答**。増分 $h=(h_1,h_2)$ に対して

$$
F(z+h)-F(z)=(h_1+ih_2,2h_2).
$$

残差はゼロなので実微分は $DF_z(h)=(h_1+ih_2,2h_2)$。$DF_z(ih)=(ih_1-h_2,2ih_2)=iDF_z(h)$ であり、係数は定数だから実 $C^1$ 級である。従って正則で、

$$
D_{\mathbb C}F_z=\begin{pmatrix}1&i\\0&2\end{pmatrix},
\qquad \det D_{\mathbb C}F_z=2.
$$
<!-- solution-end -->

<a id="ex-cm1-01-a02"></a>
#### CM1-01-A02 剪断座標の逆
- Level: A

$F(z_1,z_2)=(z_1+3z_2^2,z_2)$ の逆写像を書き、$F^{-1}\circ F$ を直接確認せよ。

<!-- solution-start -->
**詳細解答**。$w_2=z_2$、$w_1=z_1+3z_2^2$ なので $z_1=w_1-3w_2^2$。したがって

$$
F^{-1}(w_1,w_2)=(w_1-3w_2^2,w_2).
$$

実際、

$$
F^{-1}(F(z_1,z_2))
=(z_1+3z_2^2-3z_2^2,z_2)
=(z_1,z_2).
$$

逆順も $(w_1-3w_2^2+3w_2^2,w_2)=(w_1,w_2)$。双方の微分は複素線形なので、この二座標は両立する。
<!-- solution-end -->

<a id="ex-cm1-01-a03"></a>
#### CM1-01-A03 複素共役が失う性質
- Level: A

$K(z_1,z_2)=(\overline{z_1},z_2)$ が実 $C^\infty$ 級微分同相写像であるにもかかわらず、正則でないことを示せ。

<!-- solution-start -->
**詳細解答**。実座標 $z_1=x+iy$ では第一成分が $x-iy$ になるので $K$ は実線形で滑らかであり、$K\circ K=\operatorname{id}$ より微分同相写像である。しかし $h=(1,0)$ なら

$$
DK(ih)=(-i,0),\qquad iDK(h)=(i,0).
$$

二つは一致しない。失われたのは複素線形性である。従って恒等座標と $K$ 座標の遷移は正則でなく、両者は正則アトラスに同居できない。
<!-- solution-end -->

<a id="ex-cm1-01-a04"></a>
#### CM1-01-A04 重なりの定義域
- Level: A

$\mathbb C^2$ の開集合 $U=\{|z_1|<2\}$、$W=\{|z_1-1|<2\}$ に恒等座標を置く。遷移写像の正しい定義域と値域を求めよ。

<!-- solution-start -->
**詳細解答**。二つの座標の重なりは

$$
U\cap W=\{|z_1|<2,\ |z_1-1|<2\}.
$$

両方とも恒等座標だから、遷移写像は $U\cap W\to U\cap W$ 上の恒等写像である。全体 $\mathbb C^2\to\mathbb C^2$ と書くのは、局所座標として指定した定義域を無視している。重なりは二開集合の共通部分で開であり、恒等写像は正則である。
<!-- solution-end -->

<a id="ex-cm1-01-a05"></a>
#### CM1-01-A05 複素次元と実次元
- Level: A

二つの Riemann 面 $X,Y$ にそれぞれ $(U,\varphi)$、$(W,\psi)$ という複素座標がある。積座標を書き、複素次元と実座標成分数を数えよ。

<!-- solution-start -->
**詳細解答**。積座標は

$$
(\varphi\times\psi)(p,q)=(\varphi(p),\psi(q))\in\mathbb C^2.
$$

$\varphi(p)=x_1+iy_1$、$\psi(q)=x_2+iy_2$ と展開すると実座標は $(x_1,y_1,x_2,y_2)$ の4成分である。従って複素次元は2、局所座標の実成分数は4である。これは[直積命題](#prop-cm1-01-product)の $m=n=1$ の場合に当たる。
<!-- solution-end -->

### Level B

<a id="ex-cm1-01-b01"></a>
#### CM1-01-B01 非線形座標の合成を再計算
- Level: B

$$
F(z_1,z_2)=(z_1+z_2^2,z_2),\qquad
G(w_1,w_2)=(w_1,w_2+w_1)
$$

とする。$G\circ F$ とその複素 Jacobi 行列を直接求め、行列の連鎖律と照合せよ。

<!-- solution-start -->
**詳細解答**。順に代入して

$$
(G\circ F)(z_1,z_2)
=(z_1+z_2^2,z_2+z_1+z_2^2).
$$

従って成分を $z_1,z_2$ で微分すると

$$
D(G\circ F)_z=
\begin{pmatrix}
1&2z_2\\
1&1+2z_2
\end{pmatrix}.
$$

別に $DG_w=\begin{pmatrix}1&0\\1&1\end{pmatrix}$、$DF_z=\begin{pmatrix}1&2z_2\\0&1\end{pmatrix}$ だから

$$
DG_{F(z)}DF_z
=
\begin{pmatrix}1&0\\1&1\end{pmatrix}
\begin{pmatrix}1&2z_2\\0&1\end{pmatrix}
=
\begin{pmatrix}1&2z_2\\1&1+2z_2\end{pmatrix}.
$$

両方一致する。行列の各成分は複素数係数なので、合成の微分は複素線形で正則である。
<!-- solution-end -->

<a id="ex-cm1-01-b02"></a>
#### CM1-01-B02 両立性の推移性
- Level: B

同じ $X$ 上の正則アトラス $\mathcal A,\mathcal B,\mathcal C$ があり、$\mathcal A$ と $\mathcal B$、$\mathcal B$ と $\mathcal C$ はそれぞれ両立するとする。$\mathcal A$ と $\mathcal C$ も両立することを、重なりの各点で示せ。

<!-- solution-start -->
**詳細解答**。$\mathcal A$ の座標 $(U,\varphi)$ と $\mathcal C$ の座標 $(W,\chi)$ を取り $p\in U\cap W$ を固定する。$\mathcal B$ は被覆だから $p$ を含む $(V,\psi)\in\mathcal B$ がある。三重共通部分の像で

$$
\chi\circ\varphi^{-1}
=(\chi\circ\psi^{-1})\circ(\psi\circ\varphi^{-1}).
$$

前の写像は $\mathcal B$ と $\mathcal C$ の両立性により正則、後ろは $\mathcal A$ と $\mathcal B$ の両立性により正則。[合成命題](#prop-cm1-01-composition)より $\chi\circ\varphi^{-1}$ は $\varphi(p)$ 付近で正則である。$p$ が任意なので全重なりで正則。逆向きは座標を交換して同じ計算を行える。従って $\mathcal A\cup\mathcal C$ も正則アトラスである。
<!-- solution-end -->

<a id="ex-cm1-01-b03"></a>
#### CM1-01-B03 行列式が非零でも大域逆は保証されない
- Level: B

$H:\mathbb C^2\to\mathbb C^2$ を $H(z_1,z_2)=(e^{z_1},z_2)$ とする。複素 Jacobi 行列式を求め、非零なのに $H$ が全域で単射でないことを示せ。

<!-- solution-start -->
**詳細解答**。$e^{z_1}$ の複素微分は $e^{z_1}$ なので

$$
D_{\mathbb C}H_z=
\begin{pmatrix}
e^{z_1}&0\\
0&1
\end{pmatrix},
\qquad
\det D_{\mathbb C}H_z=e^{z_1}\ne0.
$$

一方、任意の $z_1,z_2$ について

$$
H(z_1+2\pi i,z_2)
=(e^{z_1+2\pi i},z_2)
=(e^{z_1},z_2)
=H(z_1,z_2).
$$

$(z_1+2\pi i,z_2)\ne(z_1,z_2)$ なので単射ではない。局所の非退化性と全域の単射性は異なるため、[合成・逆写像命題](#prop-cm1-01-composition)の逆方向で用いた「微分同相」という仮定を省けない。
<!-- solution-end -->

<a id="ex-cm1-01-b04"></a>
#### CM1-01-B04 Riemann 球面二つの積
- Level: B

$\widehat{\mathbb C}\times\widehat{\mathbb C}$ の積アトラスで、一方の因子だけを $z$ 座標から $\zeta=1/z$ 座標に取り替えるとき、遷移とその複素 Jacobi 行列を求めよ。定義域も明記せよ。

<!-- solution-start -->
**詳細解答**。第一因子が重なるのは $z\in\mathbb C^\times$、第二因子は有限点座標 $w\in\mathbb C$ を変えない。従って

$$
T:\mathbb C^\times\times\mathbb C\longrightarrow
\mathbb C^\times\times\mathbb C,\qquad
T(z,w)=(1/z,w).
$$

成分別に微分すると

$$
D_{\mathbb C}T_{(z,w)}
=
\begin{pmatrix}-1/z^2&0\\0&1\end{pmatrix}.
$$

$z\ne0$ なので第一成分も正則で、$T\circ T=\operatorname{id}$。よって逆方向も正則であり、二つの積座標は両立する。
<!-- solution-end -->

### Level C

<a id="ex-cm1-01-c01"></a>
#### CM1-01-C01 三つの座標と不適合座標の総合判定
- Level: C

$X=\mathbb C^2$ に、恒等座標 $\varphi$ と二つの全域座標

$$
\psi(z_1,z_2)=(z_1+z_2^2,z_2),
\qquad
\chi(z_1,z_2)=(z_1,z_2+z_1)
$$

を考える。

1. $\psi,\chi$ それぞれの逆写像を求め、両者が正則であることを示せ。
2. $\chi\circ\psi^{-1}$ を計算し、実際に正則であることを直接確認せよ。
3. $\{\varphi,\psi,\chi\}$ が正則アトラスになることと、そこから一意な極大正則アトラスが得られることを説明せよ。
4. $\kappa(z_1,z_2)=(\overline{z_1},z_2)$ を追加した場合、どの条件が失われるか示せ。

<!-- solution-start -->
**詳細解答**。

**1. 逆の構成**。$\psi$ について $w_2=z_2$、$w_1=z_1+z_2^2$ なので

$$
\psi^{-1}(w_1,w_2)=(w_1-w_2^2,w_2).
$$

$\chi$ について $v_1=z_1$、$v_2=z_2+z_1$ なので

$$
\chi^{-1}(v_1,v_2)=(v_1,v_2-v_1).
$$

両写像とその逆は複素多項式で、増分に関する一次項は複素線形、二次以上の残差は $o(\|h\|)$。従って四つとも正則であり、相互逆を上式から直接確認できる。

**2. 合成の微分**。まず $\psi^{-1}$ を代入すると

$$
(\chi\circ\psi^{-1})(w_1,w_2)
=(w_1-w_2^2,w_2+w_1-w_2^2).
$$

その微分は

$$
D_{\mathbb C}(\chi\circ\psi^{-1})_w
=
\begin{pmatrix}
1&-2w_2\\
1&1-2w_2
\end{pmatrix}.
$$

この複素行列は各点で複素線形写像を定め、成分は連続に依存するので、合成は正則である。逆方向も $(\psi\circ\chi^{-1})(v_1,v_2)=(v_1+(v_2-v_1)^2,v_2-v_1)$ と書けるから同様に複素多項式で正則である。

**3. アトラスと極大化**。$\varphi,\psi,\chi$ はそれぞれ $\mathbb C^2$ から $\mathbb C^2$ への同相であり、全域を覆う。遷移は $\psi\circ\varphi^{-1}=\psi$、$\chi\circ\varphi^{-1}=\chi$、$\chi\circ\psi^{-1}$ とそれぞれの逆で、1・2の検算により全て正則である。$\mathbb C^2$ は Hausdorff・第二可算だから[高次元正則アトラスの定義](#def-cm1-01-atlas)を満たす。[極大延長定理](#thm-cm1-01-maximal-extension)により、このアトラスと両立する全座標を集めた極大正則アトラスが一意に得られる。

**4. 不適合性**。$\kappa$ は実微分同相写像だが、$\kappa\circ\varphi^{-1}=\kappa$ である。$h=(1,0)$ なら $D\kappa(ih)=(-i,0)$、$iD\kappa(h)=(i,0)$ で一致しない。従って恒等座標との遷移が正則でなくなり、四座標の族は正則アトラスではない。失われるのは局所同相性ではなく、複素線形な遷移という条件である。
<!-- solution-end -->

---

## 8. 次章への接続

本章では座標の重なりを $T_{\beta\alpha}$ で記述し、座標変換が正則であることを証明条件とした。次章 CM1-02 では、異なる複素多様体の間の写像を座標表示で定義し、その正則性が座標の選択に依存しないことを調べる。さらにその先で、複素座標から実接束上の構造 $J$ がどう生まれるかへ進む。

章末で再現すべき要点は、**重なりの像の開性、二方向の正則性、連鎖律による貼り合わせ、極大アトラスでの中継座標の役割、直積のブロック対角微分**である。
