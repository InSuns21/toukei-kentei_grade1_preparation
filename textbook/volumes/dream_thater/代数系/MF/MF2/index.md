# MF2 モジュラー形式・q展開・Eisenstein級数

[MF1の整数モジュラー群](../MF1/index.md#def-mf1-modular-group)は、格子の基底を取り替えても同じ格子を表すという事実から現れました。しかし格子ごとに関数や不変量を割り当てる場合、その値は格子基底の取り替えで不変とは限りません。たとえば [Weierstrass不変量の相似則](../../../解析系/CA/CA9/index.md#prop-ca9-scaling)では、格子を $\alpha$ 倍すると $g_2$ は $\alpha^{-4}$ 倍、$g_3$ は $\alpha^{-6}$ 倍されます。**変換のたびに決まった累乗だけ変わる関数を、一つの理論として扱えないでしょうか。**

その問いから「重さ（weight）」を持つモジュラー形式を定義します。さらに、[基本領域の無限遠の端](../MF1/index.md#thm-mf1-fundamental-domain)での振る舞いを、通常の冪級数に翻訳します。この翻訳によって格子の不変量が整数の約数和と結び付き、最後には楕円曲線の判別式と $j$ 不変量が同じ関数から現れます。

本章で扱う群は終始 $SL_2(\mathbb Z)$ です。一般の合同部分群のカスプやモジュラー曲線は後続章で扱います。

<!-- definition-example-audit: strict -->

## 1. 格子基底の取り替えと重さ

$\tau\in\mathbb H$ に対し $\Lambda_\tau=\mathbb Z+\tau\mathbb Z$ とします。[格子の相似と群作用](../MF1/index.md#thm-mf1-lattice-orbit)より、$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ について

$$
\Lambda_{\gamma\cdot\tau}=(c\tau+d)^{-1}\Lambda_\tau.
$$

たとえば格子から作る関数 $F(\Lambda)$ が $F(\alpha\Lambda)=\alpha^{-k}F(\Lambda)$ を満たすなら、$f(\tau)=F(\Lambda_\tau)$ は

$$
f(\gamma\cdot\tau)=(c\tau+d)^k f(\tau)
$$

を満たします。この指数 $k$ が「重さ」です。しかし変換則だけでは無限遠で発散する関数も許してしまいます。そこで正則性と無限遠の条件を追加します。

まず $T\cdot\tau=\tau+1$ なので、整数 $k$ について上の変換則を満たす関数は $f(\tau+1)=f(\tau)$ です。周期1の正則関数を調べるには、複素指数関数

$$
q=e^{2\pi i\tau},\qquad |q|=e^{-2\pi\operatorname{Im}\tau}<1
$$

が便利です。$\tau$ と $\tau+n$ は同じ $q$ を与えるので、周期性を使えば $f(\tau)=F(q)$ と書けます。上半平面の高さを無限大へ送る操作は $q\to0$ に対応します。

<a id="def-mf2-modular-form"></a>
<!-- formal-statement-start -->
> **定義（重さkのモジュラー形式）**  
> 整数 $k\ge0$ に対し、正則関数 $f:\mathbb H\to\mathbb C$ が $SL_2(\mathbb Z)$ に関する重さ $k$ のモジュラー形式であるとは、次の二条件を満たすことである。
>
> (i) 全ての $\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ と $\tau\in\mathbb H$ に対し
>
$$
f(\gamma\cdot\tau)=(c\tau+d)^k f(\tau).
$$
>
> (ii) 周期性から得られる $F(q)$ が $q=0$ で正則に延長できる（無限遠のカスプで正則）。
>
> このような関数全体を $M_k(SL_2(\mathbb Z))$、略して $M_k$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf2-modular-form -->
**定義の確認**。定数関数 $f(\tau)=1$ は正則であり、重さ $0$ では変換則 $1=(c\tau+d)^0$ が成立します。対応する $F(q)=1$ は $q=0$ まで正則です。従って $1\in M_0$ です。他方 $f(\tau)=q^{-1}=e^{-2\pi i\tau}$ は周期1ですが、$q=0$ に極を持ち、さらに一般の $S$ に対する変換則も保証されません。「周期性だけ」ではモジュラー形式になりません。
<!-- definition-example-end -->

無限遠の正則性は $F(q)$ の冪級数が負冪を含まない、という判定に置き換えられます。ここで必要なのは「周期関数から $F$ がきちんと作れる」ことです。

<a id="thm-mf2-q-coordinate"></a>
<!-- formal-statement-start -->
> **定理（周期正則関数のq表示）**  
> $f:\mathbb H\to\mathbb C$ が正則で $f(\tau+1)=f(\tau)$ を満たすなら、穿孔円板 $0<|q|<1$ 上の一意的な正則関数 $F$ が存在し、$f(\tau)=F(e^{2\pi i\tau})$ となる。また、$F$ が $q=0$ に正則に延長することと、$\operatorname{Im}\tau\to\infty$ で $f(\tau)$ が一様に有界となることは同値である。このとき
>
$$
f(\tau)=\sum_{n=0}^{\infty}a_nq^n
$$
>
> が $|q|<1$ で成り立ち、係数は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

複素指数関数で同じ値を取る二点の差は整数です。これで $F$ が一意に定まり、局所的な対数を使って正則性を確認できます。零点 $q=0$ は除去可能特異点の定理で扱います。

<!-- proof-start -->
### 証明

$q\ne0$ に対し $e^{2\pi i\tau}=q$ を満たす $\tau\in\mathbb H$ を一つ取ります。別の $\tau'$ も同じ $q$ を与えるなら $e^{2\pi i(\tau'-\tau)}=1$ であり、$\tau'-\tau\in\mathbb Z$ です。周期性から $f(\tau')=f(\tau)$ なので $F(q)=f(\tau)$ は well-defined です。$q_0\ne0$ の近傍では正則な対数 $\log q$ を選べて

$$
F(q)=f\left(\frac{\log q}{2\pi i}\right)
$$

と局所表示できるため、$F$ は穿孔円板上で正則です。

上半平面で虚部が大きい領域は、$q$ 座標では原点近くの領域に対応します。実際、任意の実数 $Y>0$ に対して

$$
\operatorname{Im}\tau\ge Y
\quad\Longleftrightarrow\quad
0<|q|\le e^{-2\pi Y}.
$$

従って、虚部を十分大きくした領域で $f$ が一様に有界であることと、$F$ が原点近くで有界であることは同値です。[有界な孤立特異点は可除](../../../解析系/CA/CA4/index.md#cor-ca4-removable-bounded)を $q=0$ に適用すれば、これは $F$ が原点へ正則延長できることと同値です。

延長した正則関数の Taylor 展開を $q=0$ で行うと

$$
F(q)=\sum_{n=0}^{\infty}a_nq^n
$$

が得られます。係数の一意性は Taylor 係数の一意性によります。
<!-- proof-end -->

<a id="def-mf2-q-expansion"></a>
<!-- formal-statement-start -->
> **定義（q展開とカスプ形式）**  
> $f\in M_k$ の上記冪級数を $q$ 展開といい、$a_0$ を定数項という。$a_0=0$ を満たすモジュラー形式をカスプ形式と呼び、その空間を $S_k$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf2-q-expansion -->
**定義の確認**。$f=0$ は任意の重さでモジュラー形式かつカスプ形式です。重さ0の定数関数 $1$ は $q$ 展開が $1+0q+\cdots$ なのでカスプ形式ではありません。定数項が零なら $F(q)=q(a_1+a_2q+\cdots)$ と書け、$q\to0$ で $f(\tau)\to0$ となります。
<!-- definition-example-end -->

<a id="prop-mf2-basic-properties"></a>
<!-- formal-statement-start -->
> **命題（重さ・積・奇数重さ）**  
> 整数 $k,\ell\ge0$ に対し、$f\in M_k$、$g\in M_\ell$ なら $fg\in M_{k+\ell}$ である。どちらかがカスプ形式なら積もカスプ形式である。また、奇数 $k$ に対して $M_k=\{0\}$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f(\gamma\tau)g(\gamma\tau)=(c\tau+d)^k(c\tau+d)^\ell f(\tau)g(\tau)$ です。積は上半平面で正則、$q=0$ でも二つの正則関数 $F,G$ の積なので正則です。定数項は $a_0b_0$ であり、少なくとも一方が零なら積も零です。奇数重さについて、$-I$ は [MF1の群作用](../MF1/index.md#thm-mf1-imaginary-action)では全ての $\tau$ を固定します。一方 $c=0,d=-1$ なので

$$
f(\tau)=f((-I)\cdot\tau)=(-1)^k f(\tau)=-f(\tau),
$$

従って各 $\tau$ で $f(\tau)=0$ です。
<!-- proof-end -->

## 2. 格子の Eisenstein 級数

変換則を満たす非零関数を実際に作りましょう。CA9で登場した[格子 Eisenstein 級数](../../../解析系/CA/CA9/index.md#def-ca9-eisenstein-invariants)を正規化格子 $\Lambda_\tau$ に適用します。整数対 $(m,n)\ne(0,0)$ と格子点 $m\tau+n$ は一対一に対応します。

<a id="def-mf2-eisenstein-series"></a>
<!-- formal-statement-start -->
> **定義（重さkのEisenstein級数）**  
> 偶数 $k\ge4$ に対し
>
$$
G_k(\tau)=\sum_{(m,n)\in\mathbb Z^2\setminus\{(0,0)\}}\frac{1}{(m\tau+n)^k},
\qquad
E_k(\tau)=\frac{G_k(\tau)}{2\zeta(k)}
$$
>
> と置く。ここで $\zeta(k)=\sum_{n\ge1}n^{-k}$ である。$E_k$ を正規化 Eisenstein 級数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf2-eisenstein-series -->
**定義の確認**。$\tau=i$、$k=4$ を選ぶと $(m,n)=(0,1),(0,-1),(1,0)$ の項はそれぞれ $1,1,1$ です。また全ての非零整数対で $mi+n\ne0$ です。絶対値について、$r=\max(|m|,|n|)$ の殻は $8r$ 点で、$|mi+n|^4=(m^2+n^2)^2\ge r^4$ なので、絶対値の総和は $8\sum_{r\ge1}r^{-3}$ 以下で有限です。分母の非零性と収束の両方を直接確認しました。
<!-- definition-example-end -->

定義が実際に成立するには、分母が零にならないことと収束することの両方が必要です。$\tau\in\mathbb H$ では $m\tau+n=0$ が整数 $m,n$ について成立するのは $(m,n)=(0,0)$ の場合だけです。

<a id="thm-mf2-eisenstein-modularity"></a>
<!-- formal-statement-start -->
> **定理（Eisenstein 級数の収束とモジュラー性）**  
> 偶数 $k\ge4$ について $G_k$ は $\mathbb H$ 上局所一様に絶対収束する正則関数であり、
>
$$
G_k(\gamma\cdot\tau)=(c\tau+d)^kG_k(\tau)
$$
>
> を全ての $\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z)$ に対し満たす。さらに
>
$$
\lim_{y\to\infty}G_k(x+iy)=2\zeta(k)
$$
>
> は $x$ を法1で動かしても一様である。従って $E_k\in M_k$ であり、その $q$ 展開の定数項は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

局所一様収束には「格子が零から一定の距離だけ離れている」ことを使います。変換則は整数対の全単射による添字の入れ替えです。カスプでは $m=0$ の行が定数項を作り、$m\ne0$ の行は虚部の増大で消えます。

<!-- proof-start -->
### 証明

$\tau=x+iy$ とし、上半平面のコンパクト集合 $K$ を固定します。$(m,n)\in\mathbb R^2$ に対する線形写像 $(m,n)\mapsto(m x+n,my)$ は $y>0$ で可逆です。$K$ 上でその逆行列の作用素ノルムは有界なので、ある $A_K>0$ が存在し、

$$
|m\tau+n|\ge A_K\sqrt{m^2+n^2}
$$

が全ての $\tau\in K$ と整数対に成立します。従って級数の絶対値は

$$
A_K^{-k}\sum_{(m,n)\ne(0,0)}(m^2+n^2)^{-k/2}
$$

で抑えられます。整数対を $\max(|m|,|n|)=r$ ごとの殻に分けると各殻に $8r$ 個の点があるので、右辺は $8A_K^{-k}\sum_{r\ge1}r^{1-k}<\infty$ です。これで正則関数の局所一様極限として $G_k$ の正則性も得られます。

[格子の基底の取り替え](../MF1/index.md#thm-mf1-lattice-orbit)から $\Lambda_{\gamma\tau}=(c\tau+d)^{-1}\Lambda_\tau$ です。$\gamma$ の行列式が1なので整数基底は全単射に移り、絶対収束により順序を入れ替えられます。各格子点が $(c\tau+d)^{-1}$ 倍されるため、逆数の $k$ 乗を足すと変換則が成立します。

次に $m=0$ の項は、$k$ が偶数なので

$$
\sum_{n\ne0}n^{-k}=2\sum_{n\ge1}n^{-k}=2\zeta(k).
$$

残りを見積もります。$A=|m|y$（$y\ge1$）とすると、横軸上の整数を $-mx$ からの距離順に並べた積分比較によって

$$
\sum_{n\in\mathbb Z}\frac1{\big((mx+n)^2+A^2\big)^{k/2}}
\le A^{-k}+2\int_0^\infty(t^2+A^2)^{-k/2}\,dt+C_k A^{-k}
\le C'_k A^{1-k}
$$

となります。最後の不等式は $t=Au$ と置き、$A\ge1$ を使いました。従って $m\ne0$ の項の絶対値の総和は

$$
\sum_{m\ne0}\sum_{n\in\mathbb Z}|m\tau+n|^{-k}
\le C'_k y^{1-k}\sum_{m\ne0}|m|^{1-k}
=O(y^{1-k}).
$$

$k\ge4$ なので右辺は $y\to\infty$ で零へ収束し、見積りは $x$ に依存しません。周期性と[定理（$q$ 表示）](#thm-mf2-q-coordinate)により $G_k$ は $q=0$ まで正則に延長します。極限が $2\zeta(k)$ なので、正規化 $E_k$ の定数項は1です。
<!-- proof-end -->

この構成から $E_4$ と $E_6$ は単なる記号ではなく、それぞれ絶対収束する具体的な級数だと分かります。次は係数を整数論の式に変換します。

## 3. 周期方向を先に足すと約数和が現れる

$G_k$ の格子和で $n$ を先に足すには、周期正則関数

$$
H_k(z)=\sum_{n\in\mathbb Z}(z+n)^{-k}
\qquad(\operatorname{Im}z>0)
$$

を調べます。これは $z\mapsto z+1$ に関して周期的です。$\sin(\pi z)$ の対数微分 $\pi\cot(\pi z)$ を使えば、その Fourier 級数を直接計算できます。

<a id="lem-mf2-periodic-lattice-sum"></a>
<!-- formal-statement-start -->
> **補題（周期方向の格子和）**  
> 偶数 $k\ge4$、$\operatorname{Im}z>0$ に対して
>
$$
\sum_{n\in\mathbb Z}\frac1{(z+n)^k}
=\frac{(2\pi i)^k}{(k-1)!}
\sum_{r=1}^{\infty}r^{k-1}e^{2\pi i r z}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\pi\cot(\pi z)$ は各整数で留数1を持ちます。この関数の高階導関数が $H_k$ を与えることを[留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)で確認し、上半平面では等比級数から $\cot$ の指数展開を得ます。

<!-- proof-start -->
### 証明

$z\notin\mathbb Z$ を固定します。$w$ 平面で、頂点 $\pm(N+\tfrac12)\pm i(N+\tfrac12)$ の正方形上に

$$
R_N(w)=\frac{\pi\cot(\pi w)}{(w-z)^k}
$$

を積分します。辺上の $\cot(\pi w)$ は $N$ に依存しない定数で有界です（縦辺は半整数の実部、横辺は虚部の絶対値が大きい）。分母の絶対値は辺上で $cN^k$ 以上、周長は $O(N)$ なので、積分は $O(N^{1-k})\to0$ です。

$w=n$（整数）での留数は $(n-z)^{-k}$ です。$w=z$ は $k$ 位の極で、留数は

$$
\frac1{(k-1)!}\left(\frac{d}{dz}\right)^{k-1}\bigl(\pi\cot(\pi z)\bigr).
$$

留数定理と偶数 $k$ による $(n-z)^{-k}=(z-n)^{-k}$ を使い、

$$
H_k(z)=-\frac1{(k-1)!}\left(\frac{d}{dz}\right)^{k-1}\bigl(\pi\cot(\pi z)\bigr)
$$

を得ます（$k$ は偶数なので $(-1)^{k-1}=-1$）。ここで $u=e^{2\pi iz}$、$|u|<1$ に対して

$$
\pi\cot(\pi z)=\pi i\frac{u+1}{u-1}
=-\pi i-2\pi i\sum_{r\ge1}u^r.
$$

局所一様収束する級数を $k-1$ 回微分すると

$$
H_k(z)=\frac{2\pi i}{(k-1)!}
\sum_{r\ge1}(2\pi i r)^{k-1}u^r
=\frac{(2\pi i)^k}{(k-1)!}\sum_{r\ge1}r^{k-1}u^r.
$$

となります。これが主張です。
<!-- proof-end -->

<a id="thm-mf2-eisenstein-q"></a>
<!-- formal-statement-start -->
> **定理（Eisenstein級数のq展開）**  
> 偶数 $k\ge4$ に対し、約数和
>
$$
\sigma_{k-1}(N)=\sum_{\substack{d\mid N\\d>0}}d^{k-1}
$$
>
> を置くと、
>
$$
G_k(\tau)=2\zeta(k)+\frac{2(2\pi i)^k}{(k-1)!}
\sum_{N\ge1}\sigma_{k-1}(N)q^N.
$$
>
> 特に
>
$$
E_4=1+240\sum_{N\ge1}\sigma_3(N)q^N,
\qquad
E_6=1-504\sum_{N\ge1}\sigma_5(N)q^N.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$m\ne0$ の格子点を $m>0$ と $m<0$ に分け、偶数重さの対称性で二倍にします。補題を $z=m\tau$ に適用すると指数が $q^{mr}$ となり、同じ指数 $N$ を作る正整数の組 $(m,r)$ が $N$ の約数に対応します。

<!-- proof-start -->
### 証明

絶対収束から和を入れ替えられるので、$m=0$ を分離して、$m<0$ の組 $(m,n)$ を $(-m,-n)$ に写すと

$$
G_k(\tau)
=2\zeta(k)+2\sum_{m\ge1}\sum_{n\in\mathbb Z}(m\tau+n)^{-k}.
$$

[周期方向の格子和](#lem-mf2-periodic-lattice-sum)を $z=m\tau$ に適用し、

$$
G_k(\tau)=2\zeta(k)+
\frac{2(2\pi i)^k}{(k-1)!}\sum_{m\ge1}\sum_{r\ge1}r^{k-1}q^{mr}.
$$

$|q|<1$ のもと、二重級数の絶対収束は、たとえば $\sum_{m,r\ge1}r^{k-1}|q|^{mr}\le \sum_{r\ge1}r^{k-1}|q|^r/(1-|q|^r)<\infty$ から従います。$N=mr$ と置けば、$r$ が $N$ の正の約数をちょうど一巡するので係数は $\sigma_{k-1}(N)$ です。

正規化の定数を具体化します。$\sin,\cos$ の Taylor 展開を割ると

$$
\pi\cot(\pi z)=\frac1z-\frac{\pi^2}{3}z-\frac{\pi^4}{45}z^3-\frac{2\pi^6}{945}z^5+O(z^7).
$$

一方、整数の極を対称に足した部分分数表示は、$|z|<1$ で幾何級数を展開すると

$$
\begin{aligned}
\pi\cot(\pi z)
&=\frac1z+\sum_{n\ge1}\left(\frac1{z-n}+\frac1{z+n}\right)\\
&=\frac1z-2\sum_{n\ge1}\sum_{j\ge1}\frac{z^{2j-1}}{n^{2j}}
=\frac1z-2\sum_{j\ge1}\zeta(2j)z^{2j-1}.
\end{aligned}
$$

この部分分数表示は上の留数計算と同じ正方形積分を $\pi\cot(\pi w)/(w-z)$ に直接用いる代わりに、収束を保証するよう $1/(w-z)-1/w$ と差を取って適用して得られます。係数 $z^3,z^5$ の比較から

$$
2\zeta(4)=\frac{\pi^4}{45},\qquad
2\zeta(6)=\frac{2\pi^6}{945}.
$$

従って $k=4$ では $2(2\pi i)^4/3!=16\pi^4/3$ なので、その値を $\pi^4/45$ で割って $240$。$k=6$ では $2(2\pi i)^6/5!=-16\pi^6/15$ なので、$2\pi^6/945$ で割って $-504$ です。
<!-- proof-end -->

ここまでで、複素格子を走る解析的な和から整数の約数和が出現する理由が分かりました。最初の係数を実際に計算すると

$$
E_4=1+240q+2160q^2+6720q^3+\cdots,
$$

$$
E_6=1-504q-16632q^2-122976q^3+\cdots.
$$

たとえば $\sigma_3(2)=1+2^3=9$ なので $q^2$ の係数は $240\cdot9=2160$ です。

## 4. 判別式をカスプ形式へ移す

[CA9の格子不変量](../../../解析系/CA/CA9/index.md#def-ca9-eisenstein-invariants)は $g_2=60G_4$、$g_3=140G_6$ でした。今求めた正規化から

$$
g_2(\Lambda_\tau)=\frac{4\pi^4}{3}E_4(\tau),
\qquad
g_3(\Lambda_\tau)=\frac{8\pi^6}{27}E_6(\tau).
$$

これらは同じ格子の値ですが重さが4と6で異なります。重さを12へ合わせるため、$E_4^3$ と $E_6^2$ を組み合わせます。定数項は両方1なので差を取ればカスプ形式が現れます。

<a id="def-mf2-discriminant"></a>
<!-- formal-statement-start -->
> **定義（モジュラー判別式）**  
> 次の重さ12の関数をモジュラー判別式といい、$\Delta$ と記す。
>
$$
\Delta(\tau)=\frac{E_4(\tau)^3-E_6(\tau)^2}{1728}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf2-discriminant -->
**定義の確認**。分子の両項は[積の命題](#prop-mf2-basic-properties)により重さ12のモジュラー形式です。各定数項が1なので差の定数項は零です。$q$ の係数は $3\cdot240-2(-504)=720+1008=1728$ なので $\Delta=q+O(q^2)$ となり、$\Delta$ は非零のカスプ形式です。この確認は重さだけでなくカスプ正則性と定数項の条件も検査しています。
<!-- definition-example-end -->

<a id="thm-mf2-discriminant-nonzero"></a>
<!-- formal-statement-start -->
> **定理（判別式の非零性と格子判別式）**  
> 全ての $\tau\in\mathbb H$ に対して $\Delta(\tau)\ne0$ であり、
>
$$
g_2(\Lambda_\tau)^3-27g_3(\Lambda_\tau)^2
=4096\pi^{12}\Delta(\tau).
$$
>
> また $\Delta$ は重さ12のカスプ形式であり、$q=0$ において1位の零点を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

重さをそろえた $g_2,g_3$ の関係式へ具体的な係数を代入します。非零性そのものは先の Fourier 展開からは直ちに分からないため、[CA9の楕円関数の判別式非零性](../../../解析系/CA/CA9/index.md#thm-ca9-discriminant-nonzero)を、同じ格子 $\Lambda_\tau$ に適用します。

<!-- proof-start -->
### 証明

上に得た $g_2,g_3$ の正規化式から

$$
g_2^3=\frac{64\pi^{12}}{27}E_4^3,\qquad
27g_3^2=27\frac{64\pi^{12}}{729}E_6^2
=\frac{64\pi^{12}}{27}E_6^2.
$$

従って

$$
g_2^3-27g_3^2
=\frac{64\pi^{12}}{27}(E_4^3-E_6^2)
=\frac{64\cdot1728}{27}\pi^{12}\Delta
=4096\pi^{12}\Delta.
$$

[CA9の判別式非零定理](../../../解析系/CA/CA9/index.md#thm-ca9-discriminant-nonzero)は、実線形独立な二周期からなる任意の格子で $g_2^3-27g_3^2\ne0$ と主張します。$\tau\in\mathbb H$ なら $1,\tau$ は実線形独立なので $\Lambda_\tau$ はこの仮定を満たし、係数 $4096\pi^{12}$ も非零です。よって $\Delta(\tau)\ne0$ です。

最後に $E_4^3=1+720q+O(q^2)$、$E_6^2=1-1008q+O(q^2)$ より

$$
\Delta(q)=\frac{1728q+O(q^2)}{1728}=q+O(q^2).
$$

非零の一次係数を持つため $q=0$ の零点の位数は1です。積の命題と定数項の消去からカスプ形式であることも確認済みです。
<!-- proof-end -->

カスプ形式とは「上半平面で零になる」関数ではありません。$\Delta$ は **上半平面内では一度も零にならず、無限遠のカスプでのみ零になる**という際立った例です。ここを取り違えると次の商が定義できなくなります。

## 5. $j$ 不変量と格子の同一視

$E_4^3$ と $\Delta$ はともに重さ12です。したがって商の重さは0となり、格子基底の変更に対して値が不変になります。$\Delta$ が上半平面で零にならないと先に証明したからこそ、この商は全ての $\mathbb H$ で正則です。

<a id="def-mf2-j-invariant"></a>
<!-- formal-statement-start -->
> **定義（j不変量）**  
> $\tau\in\mathbb H$ に対し
>
$$
j(\tau)=\frac{E_4(\tau)^3}{\Delta(\tau)}
=\frac{1728E_4(\tau)^3}{E_4(\tau)^3-E_6(\tau)^2}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf2-j-invariant -->
**定義の確認**。$\Delta(\tau)\ne0$ は[判別式非零定理](#thm-mf2-discriminant-nonzero)で保証されるため全ての $\tau\in\mathbb H$ で定義されます。たとえば $S\cdot i=i$ に重さ6の変換則を適用すると $E_6(i)=i^6E_6(i)=-E_6(i)$ で、$E_6(i)=0$ です。判別式非零性から $E_4(i)\ne0$ なので、$j(i)=1728$ と直接判定できます。分母の非零性と重さの打ち消しが重要な条件です。
<!-- definition-example-end -->

<a id="thm-mf2-j-properties"></a>
<!-- formal-statement-start -->
> **定理（jの不変性・カスプでの極・格子との対応）**  
> $j$ は $\mathbb H$ 上正則で、任意の $\gamma\in SL_2(\mathbb Z)$ に対し $j(\gamma\cdot\tau)=j(\tau)$ を満たす。また
>
$$
j(\tau)=q^{-1}+744+O(q)
$$
>
> であり、$q=0$ に1位の極を持つ。さらに
>
$$
j(\tau)=1728\frac{g_2(\Lambda_\tau)^3}
{g_2(\Lambda_\tau)^3-27g_3(\Lambda_\tau)^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

変換則は分子と分母の重さ12を相殺します。$q$ 展開の定数項744には分母 $\Delta$ の $q^2$ 項まで必要です。最後の式は正規化定数を消去すると得られます。

<!-- proof-start -->
### 証明

$\Delta$ は $\mathbb H$ で零にならず、$E_4$ も正則なので $j$ は正則です。変換則は

$$
j(\gamma\tau)=\frac{(c\tau+d)^{12}E_4(\tau)^3}
{(c\tau+d)^{12}\Delta(\tau)}=j(\tau)
$$

となります。$q^2$ まで計算すると

$$
E_4^3=(1+240q+2160q^2+\cdots)^3
=1+720q+179280q^2+O(q^3),
$$

$$
E_6^2=(1-504q-16632q^2+\cdots)^2
=1-1008q+220752q^2+O(q^3).
$$

よって

$$
\Delta=\frac{E_4^3-E_6^2}{1728}
=q-24q^2+O(q^3).
$$

分母を $q(1-24q+O(q^2))$ とくくり、

$$
\begin{aligned}
j&=q^{-1}(1+720q+O(q^2))(1-24q+O(q^2))^{-1}\\
&=q^{-1}(1+720q+O(q^2))(1+24q+O(q^2))\\
&=q^{-1}+744+O(q).
\end{aligned}
$$

最後の等式は[格子判別式の関係](#thm-mf2-discriminant-nonzero)と $g_2^3=(64\pi^{12}/27)E_4^3$ から

$$
1728\frac{g_2^3}{g_2^3-27g_3^2}
=1728\frac{(64\pi^{12}/27)E_4^3}
{(64\pi^{12}/27)(E_4^3-E_6^2)}
=\frac{1728E_4^3}{E_4^3-E_6^2}
$$

で確認できます。
<!-- proof-end -->

したがって $j$ は[格子相似類の同一視](../MF1/index.md#thm-mf1-lattice-orbit)に対する不変量です。ただし「値が同じなら格子が相似」という逆方向の完全な分類は本章の変換則だけからは出ません。後続の MF3 で零点の数え上げと構造を学んだ後、逆方向を扱います。

## 6. 演習と詳細解答

**Level A：定義と係数を直接確認する**

#### A1. 重さの変換則

重さ4の関数 $f$ が $SL_2(\mathbb Z)$ の変換則を満たすと仮定する。$S\cdot\tau=-1/\tau$ と $T\cdot\tau=\tau+1$ について式を書け。また重さ0ならどう変わるか。

- Level: A
- ID: MF2-A1

<!-- solution-start -->
**詳細解答**　[一次分数変換](../MF1/index.md#def-mf1-fractional-action)の行列 $S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ では $(c,d)=(1,0)$、$T=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ では $(c,d)=(0,1)$ です。[重さ4の定義](#def-mf2-modular-form)を代入すれば

$$
f(-1/\tau)=\tau^4 f(\tau),\qquad f(\tau+1)=f(\tau).
$$

重さ0では右辺の係数はいずれも1で、二つの変換に対して関数値が不変です。正則性とカスプの条件は変換則とは別に確認する必要があります。
<!-- solution-end -->

#### A2. カスプにおける正則性

周期正則関数が $F(q)=3+2q+q^2$ で表されるとき、$q=0$ での正則性と定数項を判定せよ。また $F(q)=q^{-2}+1$ の場合はどうか。一般のモジュラー変換則まで成立すると主張してよいか。

- Level: A
- ID: MF2-A2

<!-- solution-start -->
**詳細解答**　多項式は零点で正則で、$F(0)=3$、定数項は3です。二番目は $q=0$ に2位の極があるので正則に延長できません。どちらも $\tau\mapsto\tau+1$ に関する周期性はありますが、[モジュラー形式の定義](#def-mf2-modular-form)の $S$ などの変換則を確認していないため、これだけでモジュラー形式とは主張できません。
<!-- solution-end -->

#### A3. 約数和を計算する

$\sigma_3(2),\sigma_3(3),\sigma_5(2)$ を計算し、$E_4$ の $q^2,q^3$ 係数と $E_6$ の $q^2$ 係数を求めよ。

- Level: A
- ID: MF2-A3

<!-- solution-start -->
**詳細解答**　2の正の約数は1と2、3の正の約数は1と3です。従って

$$
\sigma_3(2)=1^3+2^3=9,\quad
\sigma_3(3)=1^3+3^3=28,\quad
\sigma_5(2)=1^5+2^5=33.
$$

[Eisenstein級数のq展開](#thm-mf2-eisenstein-q)より $E_4$ の係数は $240\cdot9=2160$、$240\cdot28=6720$、$E_6$ の係数は $-504\cdot33=-16632$ です。
<!-- solution-end -->

#### A4. 奇数重さが消える理由

正則関数 $f$ が重さ5の変換則を全ての $SL_2(\mathbb Z)$ に対し満たすとする。$f$ が恒等的に零であることを示せ。

- Level: A
- ID: MF2-A4

<!-- solution-start -->
**詳細解答**　$-I=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}\in SL_2(\mathbb Z)$ は $\tau$ を固定します。変換則で $c=0,d=-1,k=5$ を代入すると

$$
f(\tau)=f((-I)\tau)=(-1)^5 f(\tau)=-f(\tau).
$$

したがって $2f(\tau)=0$、各 $\tau\in\mathbb H$ で $f(\tau)=0$ です。この結論はカスプ条件なしでも成り立ちます。
<!-- solution-end -->

**Level B：証明の技法と仮定を使う**

#### B1. カスプ形式の積

$f\in S_{12}$ と $g\in M_6$ がそれぞれ $f=a_1q+a_2q^2+\cdots$、$g=b_0+b_1q+\cdots$ と展開されるとき、$fg$ の重さと初項を求め、$fg\in S_{18}$ を証明せよ。また $f=\Delta$ のとき零関数でない例になる理由を述べよ。

- Level: B
- ID: MF2-B1

<!-- solution-start -->
**詳細解答**　[積の命題](#prop-mf2-basic-properties)の仮定 $f\in M_{12}$ と $g\in M_6$ が成立するので $fg\in M_{18}$ です。Cauchy積を定数項から計算すると

$$
fg=(a_1q+a_2q^2+\cdots)(b_0+b_1q+\cdots)
=a_1b_0q+(a_1b_1+a_2b_0)q^2+\cdots.
$$

定数項が零なので $fg\in S_{18}$ です。特に $f=\Delta$ と $g=E_6$ はどちらも本章で構成済みです。積の $q$ 展開は $(q+O(q^2))(1+O(q))=q+O(q^2)$ となるため零関数ではありません。
<!-- solution-end -->

#### B2. 収束の臨界指数

$k>2$ の実数に対し $\sum_{(m,n)\ne(0,0)}(m^2+n^2)^{-k/2}$ が収束することを殻によって証明せよ。$k=2$ で同じ級数が発散することも示せ。

- Level: B
- ID: MF2-B2

<!-- solution-start -->
**詳細解答**　$r=\max(|m|,|n|)$ の殻には $(2r+1)^2-(2r-1)^2=8r$ 点があります。殻上では $r^2\le m^2+n^2\le2r^2$ なので、各殻の和は

$$
8r(2r^2)^{-k/2}\le
\sum_{\max(|m|,|n|)=r}(m^2+n^2)^{-k/2}
\le8r(r^2)^{-k/2}.
$$

すなわち定数倍の $r^{1-k}$ で上下から挟めます。$k>2$ なら指数 $1-k<-1$ で級数は収束します。$k=2$ なら各殻の和は少なくとも $8r/(2r^2)=4/r$ で、調和級数の発散から元の級数も発散します。したがって $k=2$ の格子和を本章と同じ絶対収束の方法で定義することはできません。
<!-- solution-end -->

#### B3. 対称点での消滅

$S\cdot i=i$、$\rho=e^{2\pi i/3}$、$(ST)\cdot\rho=\rho$ を利用し、$E_6(i)=0$ と $E_4(\rho)=0$ を証明せよ。また $j(i)$ と $j(\rho)$ を求めよ。

- Level: B
- ID: MF2-B3

<!-- solution-start -->
**詳細解答**　$S$ の下段は $(1,0)$ なので、[Eisenstein級数の変換則](#thm-mf2-eisenstein-modularity)を $\tau=i,k=6$ に適用すると

$$
E_6(i)=i^6 E_6(i)=-E_6(i),
$$

よって $E_6(i)=0$ です。$ST=\begin{pmatrix}0&-1\\1&1\end{pmatrix}$ で、$\rho^2+\rho+1=0$ なので $-1/(\rho+1)=\rho$。さらに $\rho+1=e^{\pi i/3}$ なので

$$
E_4(\rho)=(\rho+1)^4 E_4(\rho)
=e^{4\pi i/3}E_4(\rho).
$$

係数 $e^{4\pi i/3}\ne1$ より $E_4(\rho)=0$ です。[判別式の非零性](#thm-mf2-discriminant-nonzero)により分母 $E_4^3-E_6^2$ はこの二点で零ではありません。従って

$$
j(i)=1728\frac{E_4(i)^3}{E_4(i)^3}=1728,
\qquad j(\rho)=\frac{E_4(\rho)^3}{\Delta(\rho)}=0.
$$
<!-- solution-end -->

#### B4. 周期方向の二重和

$\sum_{m\ge1}\sum_{r\ge1}r^3q^{mr}$ の $q^4$ の係数を、約数の列挙によって求めよ。この二重和で和の順序を入れ替えられる理由も説明せよ。

- Level: B
- ID: MF2-B4

<!-- solution-start -->
**詳細解答**　$mr=4$ となる正整数対は $(m,r)=(1,4),(2,2),(4,1)$ なので、係数は $4^3+2^3+1^3=64+8+1=73=\sigma_3(4)$ です。$|q|<1$ で

$$
\sum_{m,r\ge1}r^3|q|^{mr}
=\sum_{r\ge1}r^3\frac{|q|^r}{1-|q|^r}
\le\frac1{1-|q|}\sum_{r\ge1}r^3|q|^r<\infty.
$$

右辺は多項式増大と幾何減衰の積なので収束します。従って二重和は絶対収束し、項の並べ替えが許されます。
<!-- solution-end -->

**Level C：解析・代数・整数論をつなぐ**

#### C1. 判別式と不変量を独立に再構成する

$E_4=1+240q+2160q^2+O(q^3)$、$E_6=1-504q-16632q^2+O(q^3)$ と、CA9の $g_2=60G_4,g_3=140G_6$ を出発点に、(i) $\Delta$ の最初の2項と重さ・カスプ条件、(ii) $\Delta$ の上半平面内の非零性、(iii) $j$ の変換不変性と $q^{-1}$・定数項を、使用する仮定を明示して証明せよ。

- Level: C
- ID: MF2-C1

<!-- solution-start -->
**詳細解答**　(i) [積の命題](#prop-mf2-basic-properties)より $E_4^3,E_6^2\in M_{12}$ です。係数を二次まで展開すると

$$
\begin{aligned}
E_4^3&=1+3(240)q+\{3(2160)+3(240)^2\}q^2+O(q^3)\\
&=1+720q+179280q^2+O(q^3),\\
E_6^2&=1+2(-504)q+\{2(-16632)+(-504)^2\}q^2+O(q^3)\\
&=1-1008q+220752q^2+O(q^3).
\end{aligned}
$$

従って

$$
\Delta=\frac{E_4^3-E_6^2}{1728}
=\frac{1728q-41472q^2+O(q^3)}{1728}
=q-24q^2+O(q^3).
$$

差も重さ12の形式で、定数項が零なので $\Delta\in S_{12}$ です。一次係数1より零関数ではなく、カスプで1位の零点を持ちます。

(ii) [Eisenstein級数の定義](#def-mf2-eisenstein-series)と $\zeta(4)=\pi^4/90,\zeta(6)=\pi^6/945$ から

$$
g_2=60\cdot2\zeta(4)E_4=\frac{4\pi^4}{3}E_4,
\qquad
g_3=140\cdot2\zeta(6)E_6=\frac{8\pi^6}{27}E_6.
$$

よって $g_2^3-27g_3^2=(64\pi^{12}/27)(E_4^3-E_6^2)=4096\pi^{12}\Delta$。[CA9の判別式非零定理](../../../解析系/CA/CA9/index.md#thm-ca9-discriminant-nonzero)の仮定は、$\Lambda_\tau=\mathbb Z+\tau\mathbb Z$ が実線形独立な二周期の格子であることです。$\operatorname{Im}\tau>0$ からこの条件を確認できるので、左辺は零にならず、$\Delta(\tau)\ne0$ です。

(iii) 分子・分母がともに重さ12なので、任意の $\gamma\in SL_2(\mathbb Z)$ に対して $(c\tau+d)^{12}$ が相殺され、$j(\gamma\tau)=j(\tau)$ です。$\Delta$ は上半平面で零にならず、商はその全域で正則です。一方 $q=0$ では

$$
j=\frac{1+720q+O(q^2)}{q(1-24q+O(q^2))}
=q^{-1}(1+720q+O(q^2))(1+24q+O(q^2))
=q^{-1}+744+O(q).
$$

したがって $j$ はカスプに1位の極を持ち、**カスプで正則というモジュラー形式の条件は満たしません**。重さ0の変換不変性と「重さ0のモジュラー形式であること」を混同しない点が最後の判定です。
<!-- solution-end -->

## 7. 次章への接続

重さ4・6の非零モジュラー形式、重さ12のカスプ形式 $\Delta$、重さ0でカスプに極を持つ不変関数 $j$ が構成できました。ここでは変換則、収束、Fourier係数、判別式の非零性までを証明しましたが、「全てのモジュラー形式を $E_4,E_6$ で作れるか」はまだ示していません。次のMF3では基本領域における零点を数える公式を導き、その問いを環の構造として解きます。
