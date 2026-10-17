# MF5 Hecke作用素・固有形式

[MF2 の $q$ 展開](../MF2/index.md#def-mf2-q-expansion)によって、モジュラー形式は係数列 $a_0,a_1,\ldots$ として読むことができました。[MF4 の合同部分群](../MF4/index.md#def-mf4-congruence-subgroups)を使えば、レベルを指定した形式も扱えます。しかし、一般の正則関数の係数はばらばらで、素数 $p$ の係数から別の係数を予測できません。

格子には「基底を変える」以外に「有限指数の部分格子を選ぶ」操作があります。この操作をすべて足し合わせると Hecke 作用素になり、形式の対称性を保ったまま係数を動かせます。さらに同時固有形式を選ぶと、係数に乗法法則が生まれます。まずレベル1ですべての正規化と合成則を証明し、次にレベル $N$ で $p\nmid N$ と $p\mid N$ の違いを調べます。

<!-- definition-example-audit: strict -->

## 1. 行列式1の対称性から行列式$n$の対応へ

[MF1 の分数線形作用](../MF1/index.md#def-mf1-fractional-action)では、整数行列の行列式は1でした。行列式が $n>0$ の整数行列も上半平面を上半平面へ写します。ただし、もはや格子の基底変更ではなく、指数 $n$ の部分格子の選択を記述します。

重さ $k$ の関数に行列を作用させる際、$c\tau+d$ だけを掛けると、同じ分数線形写像を与えるスカラー倍の行列で値が変わってしまいます。そこで行列式を含む因子を入れます。

<a id="def-mf5-slash"></a>
<!-- formal-statement-start -->
> **定義（正の行列式を持つ行列のslash作用）**  
> 整数 $k\ge 0$、実行列 $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$、$\det A>0$、正則関数 $f:\mathbb H\to\mathbb C$ に対し
>
$$
(f|_k A)(\tau)
=(\det A)^{k/2}(c\tau+d)^{-k}
f\left(\frac{a\tau+b}{c\tau+d}\right)
$$
>
> と置く。ここで実数 $\det A>0$ の正の実数べきを用いる。
<!-- formal-statement-end -->

これは新しい座標へ移した関数を、重さに応じて補正する操作です。実際、$A,B$ の行列式が正なら、行列式の積と
$$
(c_A(B\tau)+d_A)(c_B\tau+d_B)=c_{AB}\tau+d_{AB}
$$
を使い、$(f|_k A)|_k B=f|_k(AB)$ が成り立ちます（右作用）。また $t>0$ について
$$
f|_k(tA)=\frac{(t^2\det A)^{k/2}}{(t(c\tau+d))^k}f(A\tau)=f|_k A.
$$
従って行列の正のスカラー倍に依存しません。行列式1では[MF2 の変換則](../MF2/index.md#def-mf2-modular-form)に戻ります。

<!-- definition-example-start: def-mf5-slash -->
**定義の確認**。$A=\begin{pmatrix}p&0\\0&1\end{pmatrix}$ と $B_b=\begin{pmatrix}1&b\\0&p\end{pmatrix}$（$p$ は素数、$0\le b<p$）を代入すると
$$
(f|_k A)(\tau)=p^{k/2}f(p\tau),\qquad
(f|_k B_b)(\tau)=p^{-k/2}f\left(\frac{\tau+b}{p}\right).
$$
両行列とも行列式は $p$ です。第2式で $p^{-k/2}$ になるのは、分母が $p$ だからです。これが後の係数 $p^{k-1}$ を決定します。
<!-- definition-example-end -->

整数行列のうち行列式 $n$ のものを $\mathcal M_n$ と記します。$\Gamma=SL_2(\mathbb Z)$ を左から掛けて同一視すると、整数の基本変形で各類を一意な形へ整理できます。

<a id="lem-mf5-hermite"></a>
<!-- formal-statement-start -->
> **補題（整数行列の左剰余類代表）**  
> $n\ge1$ と $\mathcal M_n=\{A\in M_2(\mathbb Z):\det A=n\}$ に対し、$\Gamma\backslash\mathcal M_n$ の完全代表系は
>
$$
A_{a,b,d}=\begin{pmatrix}a&b\\0&d\end{pmatrix},
\qquad ad=n,\quad a,d>0,\quad 0\le b<d
$$
>
> で与えられる。
<!-- formal-statement-end -->

なぜこれでよいのでしょうか。任意の $A$ の第1列 $(u,v)^t$ は、整数行基本変形（行交換・加減）で $(a,0)^t$ にでき、$a=\gcd(u,v)>0$ です。行列式は不変なので下右成分は $d=n/a$ となり、上右成分は、上行へ下行の整数倍を加える操作で $0\le b<d$ にできます。

<!-- proof-start -->
### 証明

Bezout の等式で $ru+sv=a$ を満たす $r,s\in\mathbb Z$ を取る。行列
$$
\gamma=\begin{pmatrix}r&s\\-v/a&u/a\end{pmatrix}\in SL_2(\mathbb Z)
$$
の行列式は $(ru+sv)/a=1$ であり、第1列を $(a,0)^t$ にする。$\det(\gamma A)=n$ より下右成分は $d=n/a$。左から $\begin{pmatrix}1&t\\0&1\end{pmatrix}$ を掛け、上右成分を $b\pmod d$ の区間 $[0,d)$ に移す。

一意性も確かめる。二つの代表が左から $\gamma\in\Gamma$ で結ばれるなら、第1列の最大公約数が等しく $a=a'$。第1列を固定する $\gamma$ は $\begin{pmatrix}1&t\\0&1\end{pmatrix}$ である（第1列が正であり、行列式1）。よって $d=d'$、$b'=b+td$ である。$b,b'\in[0,d)$ から $b=b'$ が従う。
<!-- proof-end -->

ここには行列式が $n$ であるすべての行列を使います。$n$ が合成数のとき、$\Gamma\operatorname{diag}(1,n)\Gamma$ という**一つの**二重剰余類だけでは、すべてを含むとは限りません。例えば $\operatorname{diag}(2,2)$ は行列式4ですが、その成分の最大公約数は2です。この区別が $T_{p^2}$ の補正項に効きます。

## 2. レベル1の Hecke 作用素と$q$係数

[MF2 のレベル1モジュラー形式](../MF2/index.md#def-mf2-modular-form)の空間を $M_k$、その[カスプ形式](../MF2/index.md#def-mf2-q-expansion)の空間を $S_k$ とします。$\mathcal M_n$ の代表全体を、適切な重みで平均します。

<a id="def-mf5-hecke-level-one"></a>
<!-- formal-statement-start -->
> **定義（レベル1のHecke作用素）**  
> 整数 $k\ge0$、$n\ge1$ と $f\in M_k$ に対し、線形作用素 $T_n$ を
>
$$
(T_nf)(\tau)=n^{k/2-1}
\sum_{\substack{ad=n\\a,d>0}}\ \sum_{b=0}^{d-1}
(f|_k A_{a,b,d})(\tau)
=n^{k-1}\sum_{ad=n}d^{-k}
\sum_{b=0}^{d-1}f\left(\frac{a\tau+b}{d}\right)
$$
>
> と定める。特に $T_1$ は恒等作用素である。
<!-- formal-statement-end -->

この定義が意味を持つ理由を確かめます。$f|_k\gamma=f$（$\gamma\in\Gamma$）なので左剰余類の代表を変えても項は変わりません。さらに右から $\gamma$ を掛けると代表の左剰余類が置換されるため
$$
(T_nf)|_k\gamma=n^{k/2-1}\sum_{[A]}f|_k(A\gamma)=T_nf.
$$
従って変換則が保たれます。上半平面での正則性は有限和から従います。残るカスプでの正則性は、次の係数計算で確認します。

<!-- definition-example-start: def-mf5-hecke-level-one -->
**定義の確認**。$n=2$ では代表は $A_{2,0,1},A_{1,0,2},A_{1,1,2}$ の3個です。行列式を確認すると、いずれも2であり、上の補題の条件 $ad=2$、$0\le b<d$ を満たします。したがって
$$
T_2f=2^{k-1}f(2\tau)
+\frac12\left(f\left(\frac\tau2\right)+f\left(\frac{\tau+1}{2}\right)\right).
$$
$f=1$、$k=0$ なら $T_2(1)=\tfrac12+\tfrac12(1+1)=\tfrac32$ となり、定数形式が重さ0の形式へ写ることも直接確かめられます。
<!-- definition-example-end -->

<a id="thm-mf5-coefficient"></a>
<!-- formal-statement-start -->
> **定理（Hecke作用素のFourier係数公式）**  
> $k\ge0$、$n\ge1$、$f(\tau)=\sum_{m\ge0}a_mq^m\in M_k$、$q=e^{2\pi i\tau}$ とする。このとき $T_nf\in M_k$ で、その $q^m$ 係数は
>
$$
[q^m](T_nf)=
\sum_{d\mid\gcd(m,n)}d^{k-1}a_{mn/d^2}\qquad(m\ge0).
$$
>
> 特に素数 $p$ について、$a_{m/p}=0$（$p\nmid m$ の場合）と約束すれば
>
$$
T_pf=\sum_{m\ge0}\left(a_{pm}+p^{k-1}a_{m/p}\right)q^m.
$$
>
> 定数項は $a_0\sum_{d\mid n}d^{k-1}$ であり、$T_n(S_k)\subseteq S_k$ も成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\sum_{b=0}^{d-1}e^{2\pi i mb/d}$ は $d\mid m$ なら $d$、そうでなければ0です。和の中の分数べきがこれで消え、整数べきの $q$ だけが残ります。$q^r$ の係数を読む際には $ad=n$ と $a\mid r$ の両方を課します。

<!-- proof-start -->
### 証明

[周期正則関数の$q$表示](../MF2/index.md#thm-mf2-q-coordinate)から得た級数を $\operatorname{Im}\tau$ が十分大きい領域で代入する。そこでは各級数が絶対収束する。$ad=n$ を固定し、$\zeta_d=e^{2\pi i/d}$ とすると
$$
\begin{aligned}
\sum_{b=0}^{d-1} f\left(\frac{a\tau+b}{d}\right)
&=\sum_{m\ge0}a_m q^{am/d}\sum_{b=0}^{d-1}\zeta_d^{bm}\\
&=d\sum_{s\ge0}a_{ds}q^{as}.
\end{aligned}
$$
第2行は有限等比級数の和を用いた。これを定義に代入して
$$
T_nf=n^{k-1}\sum_{ad=n}d^{1-k}\sum_{s\ge0}a_{ds}q^{as}
=\sum_{ad=n}a^{k-1}\sum_{s\ge0}a_{ds}q^{as}.
$$
$q^m$ に寄与するには $a\mid m$ であり、$s=m/a$、$d=n/a$ なので
$$
[q^m](T_nf)=\sum_{a\mid(m,n)}a^{k-1}a_{(n/a)(m/a)}
$$
となる。指数は非負の整数であり、負の $q$ 冪は現れないから $\infty$ で正則である。レベル1には[カスプ軌道がただ一つ](../MF1/index.md#thm-mf1-one-cusp-orbit)なので全カスプで正則、すなわち $T_nf\in M_k$。$m=0$ では $\gcd(0,n)=n$ と定め、定数項の公式を得る。$a_0=0$ ならその定数項も0なので $S_k$ も保たれる。
<!-- proof-end -->

**使用例：$E_4$ と $\Delta$**。[Eisenstein級数の展開](../MF2/index.md#thm-mf2-eisenstein-q)から
$$
E_4=1+240q+2160q^2+\cdots
$$
です。重さ4では[full modular groupの次元公式](../MF3/index.md#thm-mf3-dimension)から $\dim M_4=1$ です。定数項を比べると $T_2E_4$ の固有値は $1+2^3=9$ なので
$$
T_2E_4=9E_4.
$$
一方、$\Delta=q-24q^2+252q^3+\cdots$ は重さ12のカスプ形式です。同じ[full modular groupの次元公式](../MF3/index.md#thm-mf3-dimension)から $\dim S_{12}=1$ なので、$q$ の一次係数を比較して
$$
T_2\Delta=-24\Delta
$$
が従います。後の第5節では、この係数と固有値の一致を一般に証明します。

## 3. レベルがあるとき：$T_p$ と $U_p$ を区別する

レベル $N$ では [MF4 の全カスプ正則性](../MF4/index.md#def-mf4-level-form)を満たす $M_k(\Gamma_0(N))$ を使います。ここでは整数重さ、**自明指標**に限定します。行列の右作用を保つ合同条件のため、素数 $p$ が $N$ を割るか否かで二重剰余類の代表が変わります。

<a id="def-mf5-level-operators"></a>
<!-- formal-statement-start -->
> **定義（レベル付きHecke作用素）**  
> $N\ge1$、$k\ge0$、$f\in M_k(\Gamma_0(N))$ とする。素数 $p\nmid N$ に対して
>
$$
T_pf=p^{k-1}f(p\tau)+\frac1p\sum_{b=0}^{p-1}f\left(\frac{\tau+b}{p}\right)
$$
>
> と定める。一方、素数 $p\mid N$ に対して
>
$$
U_pf=\frac1p\sum_{b=0}^{p-1}f\left(\frac{\tau+b}{p}\right)
$$
>
> と定める。どちらも同じレベル・同じ重さの形式の空間上の作用素である。
<!-- formal-statement-end -->

この分岐は名前だけではありません。行列式 $p$ の二重剰余類を $\Gamma_0(N)$ で分解すると、$p\nmid N$ の場合は $p$ 個の $\begin{pmatrix}1&b\\0&p\end{pmatrix}$ と1個の $\begin{pmatrix}p&0\\0&1\end{pmatrix}$、$p\mid N$ の場合は前者の $p$ 個だけが現れます。後者では下左成分に $N$ の倍数を要求すると、後半の行列類を移せないためです。定義の $1/p$ は $p^{k/2-1}$ と slash 因子 $p^{-k/2}$ の積であり、恣意的な係数ではありません。

実際にこれらが形式を保つことも確認しておきます。各代表に右から $\gamma\in\Gamma_0(N)$ を掛けると、同じ二重剰余類の左 $\Gamma_0(N)$-類へ並べ替えられるので変換則を満たします。各カスプでは [MF4 のスケーリング座標](../MF4/index.md#def-mf4-cusp-width)で調べます。行列 $A$ がカスプを別のカスプへ送るとき、局所座標は根付きの正の冪 $q_s\mapsto \zeta q_{s'}^{\,r}$（$r>0$）の形で対応します。全カスプで負の冪を持たない関数の有限和は、対応する各幅での周期性も使えば再び負の冪を持ちません。定数項が零なら各項の定数項も零であり、カスプ形式も保たれます。$\infty$ の係数だけを見て全カスプの保存を主張しているわけではありません。

<!-- definition-example-start: def-mf5-level-operators -->
**定義の確認**。$N=2,p=2$ なら $p\mid N$ なので $T_2$ の最初の項は使わず、$U_2$ を適用します。例えば $\Delta(2\tau)=q^2-24q^4+252q^6+\cdots$ は重さ12のレベル2のカスプ形式です。$\Delta(\tau)$ の[レベル1変換則](../MF2/index.md#def-mf2-modular-form)から、$\gamma=\begin{pmatrix}a&b\\2c&d\end{pmatrix}\in\Gamma_0(2)$ について $2\gamma\tau=\begin{pmatrix}a&2b\\c&d\end{pmatrix}(2\tau)$ と書けるので変換則も確認できます。第3節で導く係数の式により $U_2(\Delta(2\tau))=\Delta(\tau)$ です。$T_2$ と誤って同じ式を使えば余計な $2^{11}\Delta(4\tau)$ が現れます。
<!-- definition-example-end -->

<a id="prop-mf5-level-q"></a>
<!-- formal-statement-start -->
> **命題（合同部分群上の素数作用素の係数）**  
> $f=\sum_{m\ge0}a_mq^m\in M_k(\Gamma_0(N))$、素数 $p$ とする。$p\nmid N$ なら
>
$$
[q^m]T_pf=a_{pm}+p^{k-1}a_{m/p},
$$
>
> $p\mid N$ なら
>
$$
[q^m]U_pf=a_{pm}.
$$
>
> ここでも $p\nmid m$ なら $a_{m/p}=0$ とする。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上で行った根の和を $d=p$ に適用すると
$$
\frac1p\sum_{b=0}^{p-1}\sum_{m\ge0}a_m q^{m/p}e^{2\pi i bm/p}
=\sum_{r\ge0}a_{pr}q^r.
$$
$p\nmid N$ では、もう一つの項が
$$
p^{k-1}f(p\tau)=p^{k-1}\sum_{r\ge0}a_rq^{pr}
$$
であり、$q^m$ に寄与するのは $p\mid m$ のときだけである。両者を加えて結論を得る。
<!-- proof-end -->

非自明な Dirichlet 指標 $\chi$ を扱う場合はこの定義をそのまま流用できません。$p\nmid N$ の第2項に $\chi(p)$ が入り、パリティ条件 $\chi(-1)=(-1)^k$ も要ります。以降の証明は自明指標だけを対象にします。

## 4. 可換性と素数冪の漸化式

係数操作としての $T_p$ を使うと、演算子の合成を行列の巨大な積なしで検算できます。形式的 $q$ 級数に二つの補助操作を置きます。これは独立したモジュラー形式上の作用素であるとは主張せず、**係数計算の道具**です。

$$
(U_pF)(q)=\sum_{m\ge0}a_{pm}q^m,\qquad
(V_pF)(q)=F(q^p)=\sum_{m\ge0}a_mq^{pm}.
$$

$U_pV_pF=F$ は、$V_pF$ の指数を $p$ 倍し、$U_p$ がちょうど元の係数を選ぶことから従います。一方 $V_pU_p$ は一般には恒等作用ではなく、$p$ の倍数の指数だけを残す射影です。たとえば $F=q+q^p$ で区別できます。

<a id="prop-mf5-uv-identities"></a>
<!-- formal-statement-start -->
> **命題（係数操作の恒等式）**  
> レベル1の重さ $k$ に対する Hecke 作用素は、形式的 $q$ 級数上では
>
$$
T_{p^r}=\sum_{j=0}^{r}p^{j(k-1)}V_p^{\,j}U_p^{\,r-j}\quad(r\ge0)
$$
>
> と表示できる（右辺は $M_k$ から得られた $q$ 展開へ作用させる）。異なる素数 $p\ne\ell$ に関する $U_p,V_p$ と $U_\ell,V_\ell$ は互いに可換である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[係数公式](#thm-mf5-coefficient)の $n=p^r$ では、$d=p^j$、$0\le j\le\min(r,v_p(m))$ の項だけが残り、$q^m$ 係数は $p^{j(k-1)}a_{p^{r-2j}m}$ である。右辺の $V_p^jU_p^{r-j}F$ の $q^m$ 係数も、$p^j\mid m$ のとき
$$
[q^m]V_p^jU_p^{r-j}F
=a_{p^{r-j}(m/p^j)}
=a_{p^{r-2j}m}
$$
で、そうでなければ零となる。$p\ne\ell$ のとき、指数の $p$ による割り切れ方は $\ell$ 倍しても変わらないので、たとえば
$$
U_pV_\ell F=\sum_{m\ge0}a_{pm/\ell}\,\mathbf1_{\ell\mid m}\,q^m
=V_\ell U_pF
$$
である。他の組合せも係数の添字を同様に直接比較して従う。
<!-- proof-end -->

<a id="thm-mf5-hecke-algebra"></a>
<!-- formal-statement-start -->
> **定理（レベル1のHecke合成則）**  
> $k\ge0$、$m,n\ge1$ に対する $M_k$ 上の作用素について
>
$$
T_mT_n=\sum_{d\mid\gcd(m,n)}d^{k-1}T_{mn/d^2}.
$$
>
> 従ってすべての $T_m,T_n$ は可換であり、特に $(m,n)=1$ なら $T_mT_n=T_{mn}$、素数 $p$ と $r\ge1$ なら
>
$$
T_pT_{p^r}=T_{p^{r+1}}+p^{k-1}T_{p^{r-1}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

素数ごとに分ければよいことを、先ほどの $U_p,V_p$ が保証します。同じ素数では $U_pV_p=I$ が1回の「打ち消し」に対応し、その度に $p^{k-1}$ が残ります。

<!-- proof-start -->
### 証明

$c=p^{k-1}$、$U=U_p$、$V=V_p$ とする。[補助操作の表示](#prop-mf5-uv-identities)より $T_p=U+cV$ かつ
$$
T_{p^r}=\sum_{j=0}^{r}c^jV^jU^{r-j}.
$$
$UV=I$ を使い、第1項の $U$ に関して $j=0$ を分離すると
$$
\begin{aligned}
(U+cV)T_{p^r}
&=U^{r+1}+\sum_{j=1}^{r}c^jV^{j-1}U^{r-j}
+\sum_{j=0}^{r}c^{j+1}V^{j+1}U^{r-j}\\
&=T_{p^{r+1}}+cT_{p^{r-1}}.
\end{aligned}
$$
従って素数冪の漸化式が出る。また異なる素数の $U,V$ は可換なので、$(m,n)=1$ のときは [係数公式](#thm-mf5-coefficient)を素因数ごとに分けて $T_{mn}=T_mT_n$ を得る。厳密には $m,n$ の各素因数に関する $U,V$ を並び替えると、各 $d\mid(mn,r)$ の項が $m$ 側と $n$ 側の一意の積に対応する。

一般の素数冪について、上の漸化式から $a,b$ に関する帰納法をすると
$$
T_{p^a}T_{p^b}=\sum_{j=0}^{\min(a,b)}c^jT_{p^{a+b-2j}}
$$
となる。基底 $b=0,1$ は $T_1=I$ と今証明した漸化式である。$b+1$ の場合は $T_{p^{b+1}}=T_pT_{p^b}-cT_{p^{b-1}}$ を代入すると、中間項が相殺され、端の和だけが残る。素因数ごとの式を掛け合わせると、各素数の $p^j$ の積が $d\mid\gcd(m,n)$ を一意に走り、係数の積は $d^{k-1}$ である。これで最初の式が従い、右辺は $m,n$ を交換しても同じなので可換性も従う。
<!-- proof-end -->

係数での反証テストとして $T_p^2$ を計算すると
$$
[q^m]T_p^2f=a_{p^2m}+p^{k-1}a_m
+\mathbf1_{p\mid m}p^{k-1}a_m+p^{2(k-1)}a_{m/p^2}.
$$
中央の **常に現れる** $p^{k-1}a_m$ が、$T_{p^2}$ にはない補正項です。$T_p^2=T_{p^2}$ としてしまうと、この項が消えてしまいます。

## 5. Petersson内積と共通固有ベクトル

線形代数で、可換な自己随伴作用素の族は共通固有ベクトルを持ちます。ここでの有限次元空間は [MF3 の次元公式](../MF3/index.md#thm-mf3-dimension)が与える $S_k$ です。固有形式を作るには、作用素が内積に関して自己随伴であることが重要です。

<a id="def-mf5-petersson"></a>
<!-- formal-statement-start -->
> **定義（レベル1のPetersson内積）**  
> $k\ge2$、$f,g\in S_k(SL_2(\mathbb Z))$ に対し、$\Gamma$ の基本領域 $\mathcal F$ 上で
>
$$
\langle f,g\rangle_{\mathrm{Pet}}
=\int_{\mathcal F}f(\tau)\overline{g(\tau)}\,y^k\,\frac{dx\,dy}{y^2},
\qquad \tau=x+iy
$$
>
> と定める。第1変数を線形、第2変数を共役線形とする。
<!-- formal-statement-end -->

[MF1 の上半平面作用](../MF1/index.md#thm-mf1-imaginary-action)によれば、$\gamma=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in\Gamma$ に対して
$$
\operatorname{Im}(\gamma\tau)=\frac{y}{|c\tau+d|^2},
\qquad d\mu=\frac{dx\,dy}{y^2}
$$
であり、$d\mu$ は不変です。$f,g$ の重さ $k$ の変換則が生む $|c\tau+d|^{2k}$ と $y^k$ の変化は打ち消し合います。そのため被積分式は $\Gamma$ 不変で、積分値は基本領域の選択に依存しません。

カスプ形式では、上半平面の高さ $y$ が大きいとき $f,g=O(e^{-2\pi y})$ です。したがって絶対値で評価した被積分式は
$$
O(e^{-4\pi y}y^{k-2})\,dx\,dy
$$
となり、カスプで積分可能です。また $f\ne0$ なら正則性から $|f|>0$ となる開集合があるため $\langle f,f\rangle>0$ です。

一般の Eisenstein 級数には定数項があり、同じ収束論法は使えません。

<!-- definition-example-start: def-mf5-petersson -->
**定義の確認**。$\Delta\in S_{12}$ なら
$$
|\Delta(x+iy)|^2y^{12}\frac{dx\,dy}{y^2}
=O(e^{-4\pi y}y^{10})\,dx\,dy.
$$
これは $y\to\infty$ で積分可能です。$E_4$ はカスプで定数項1を持つので、$|E_4|^2y^4/y^2$ は $y^2$ 程度になり、この同じ積分は発散します。
<!-- definition-example-end -->

<a id="thm-mf5-self-adjoint"></a>
<!-- formal-statement-start -->
> **定理（レベル1のHecke作用素の自己随伴性）**  
> $k\ge2$ に対し、$S_k(SL_2(\mathbb Z))$ 上の $T_n$ は Petersson 内積について自己随伴である：
>
$$
\langle T_nf,g\rangle_{\mathrm{Pet}}
=\langle f,T_ng\rangle_{\mathrm{Pet}}
\qquad(f,g\in S_k,\ n\ge1).
$$
<!-- formal-statement-end -->

### 証明の見取り図

各正の行列式行列 $A$ の逆作用は $A^\vee=(\det A)A^{-1}$ で表せます。スカラー倍がslash作用を変えないので $f|A^\vee$ は $f|A$ の逆操作です。対応する基本領域を変数変換すると、左側の作用が右側へ移ります。**カスプ形式の急減少**により、途中で積分領域を切り取ってから極限を取る操作も正当化できます。

<!-- proof-start -->
### 証明

まず $\det A>0$ のとき、$A\tau=w$ とおく。$\operatorname{Im}w=(\det A)y/|c\tau+d|^2$ と双曲面積要素の不変性から
$$
|(f|_k A)(\tau)|^2y^k\,d\mu(\tau)
=|f(w)|^2(\operatorname{Im}w)^k\,d\mu(w),
\qquad d\mu=\frac{dx\,dy}{y^2}.
$$
同様に異なる二関数の積についても成り立つ。$\mathcal M_n$ の左剰余類を用いて積分を展開し、それぞれの領域 $A\mathcal F$ へ変数変換する。積分の左右で使う領域の重なりは $\Gamma$ による同一視で処理でき、各対応項は $A^{-1}$ を用いる逆向きの作用と対応する。$\det A=n$ のとき $A^\vee=nA^{-1}$ は整数行列かつ行列式 $n$ である。写像
$$
A\longmapsto A^\vee
$$
は積の順序を逆にし、左剰余類と右剰余類を交換する。また $(A^\vee)^\vee=A$ である。よって対応する有限和は同じ $\mathcal M_n$ の代表全体を走り、共通の係数 $n^{k/2-1}$ を掛けても等式を保つ。

正当化を明記する。まず高さ $y\le Y$ で積分し、有限個の対応する領域を変数変換する。カスプでの $q$ 展開から両関数は指数的に減少し、境界の切断位置を戻すときの差は $Y\to\infty$ で零へ収束する。従って極限後に示した随伴等式が成立する。
<!-- proof-end -->

レベル $N$ の $p\mid N$ における $U_p$ には、ここで使った二重剰余類の逆向きの対称性が一般にはありません。**すべての $U_p$ まで自己随伴だと結論してはいけません。** 非自明指標の随伴性も別の条件を必要とします。

<a id="thm-mf5-eigenforms"></a>
<!-- formal-statement-start -->
> **定理（同時固有形式と乗法的Fourier係数）**  
> 偶数 $k\ge2$ と、零でない $f=\sum_{n\ge1}a_nq^n\in S_k(SL_2(\mathbb Z))$ を考える。すべての $n\ge1$ について $T_nf=\lambda_nf$ なら $a_1\ne0$ である。$a_1=1$ に正規化すると
>
$$
\lambda_n=a_n,\qquad
a_{mn}=a_ma_n\quad((m,n)=1),
$$
$$
a_{p^{r+1}}=a_pa_{p^r}-p^{k-1}a_{p^{r-1}}\quad(r\ge1),\qquad a_1=1.
$$
>
> また有限次元空間 $S_k$ は同時固有形式から成る直交基底を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

鍵は [係数公式](#thm-mf5-coefficient)の $q^1$ 係数が $a_n$ そのものであることです。これで固有値とFourier係数が結び付きます。続いて [合成則](#thm-mf5-hecke-algebra)を固有形式へ作用させるだけで乗法と素数冪の法則が出ます。

<!-- proof-start -->
### 証明

$f$ が固有形式なら、$T_nf=\lambda_nf$ の $q^1$ 係数は
$$
a_n=[q](T_nf)=\lambda_n a_1
$$
である。もし $a_1=0$ ならすべての $a_n=0$ となり、[周期正則関数の$q$表示の一意性](../MF2/index.md#thm-mf2-q-coordinate)から $f=0$。矛盾である。従って $a_1\ne0$ であり、定数倍して $a_1=1$ とすれば $\lambda_n=a_n$。

$(m,n)=1$ のとき、[Hecke合成則](#thm-mf5-hecke-algebra)から
$$
a_ma_nf=(T_mT_n)f=T_{mn}f=a_{mn}f.
$$
$f\ne0$ だから $a_{mn}=a_ma_n$。同様に素数冪の合成則を $f$ に作用させると
$$
a_pa_{p^r}f
=(T_pT_{p^r})f
=(T_{p^{r+1}}+p^{k-1}T_{p^{r-1}})f,
$$
よって所望の漸化式を得る。

最後に $S_k$ の有限次元性は[full modular groupの次元公式](../MF3/index.md#thm-mf3-dimension)から従います。[Hecke合成則](#thm-mf5-hecke-algebra)によって作用素 $T_n$ は可換であり、[Petersson自己随伴性](#thm-mf5-self-adjoint)によって自己随伴です。

まず有限次元複素内積空間 $W$ 上の自己随伴作用素 $T$ の固有ベクトルの存在を導きます。単位球面はコンパクトなので、実数値の連続関数 $\langle Tv,v\rangle$ はある単位ベクトル $v$ で最大値 $\lambda$ を取ります。$w\perp v$ を取り、実数 $t$ で次の変分を計算します。
$$
R(t)=\frac{\langle T(v+tw),v+tw\rangle}{\|v+tw\|^2}
=\frac{\lambda+2t\operatorname{Re}\langle Tw,v\rangle+t^2\langle Tw,w\rangle}{1+t^2\|w\|^2}
$$
を考える。最大点 $t=0$ で $R'(0)=2\operatorname{Re}\langle Tw,v\rangle=0$。$w$ を $iw$ に置き換えると虚部も零である。従って $\langle w,Tv\rangle=0$ がすべての $w\perp v$ について成り立ち、$Tv=\lambda v$。自己随伴性より $v^\perp$ は $T$ で不変なので、次元に関する帰納法で $T$ の直交固有基底を構成できる。

次に可換族を同時対角化する。$T_2$ の固有空間へ直交分解すると、可換性から各固有空間はすべての $T_n$ で不変であり、制限作用素も自己随伴である。固有空間が次元2以上なら、その内部で別の $T_n$ の固有空間分解を行う。各段階で共通不変部分空間が真に分割される場合は次元が減るから、有限次元性により有限回で止まる。最後にすべての $T_n$ がスカラー倍として作用する共通固有空間だけが残り、同時固有ベクトルから成る直交基底が得られる。
<!-- proof-end -->


**具体例：$\Delta$**。$S_{12}$ は1次元なので $\Delta$ はすべての $T_n$ の固有形式であり、先頭係数が1です。$a_2=-24$、$a_3=252$ を用いると
$$
a_6=a_2a_3=-6048,\qquad
a_4=a_2^2-2^{11}=576-2048=-1472.
$$
前者は互いに素な2と3、後者は同じ素数2の二乗なので、**別の公式**を使っています。


正規化固有形式の係数の乗法性は、普通の $q$ 級数すべての性質ではありません。たとえば二つの固有形式を足したものは、固有値が異なれば共通固有形式ではなく、同じ法則を期待できません。これが次章の Euler 積を許す特別な仕組みです。

## 6. 演習と詳細解答

### A1. slash因子を自分で復元する

重さ4、$A=\begin{pmatrix}3&0\\0&1\end{pmatrix}$、$B=\begin{pmatrix}1&2\\0&3\end{pmatrix}$ とする。行列式を確認し、$f|_4A$ と $f|_4B$ を求めよ。$tA$（$t>0$）で答えが変わらないことも示せ。

- Level: A
- ID: MF5-A1

<!-- solution-start -->
**詳細解答**　$\det A=\det B=3$。前者は $c=0,d=1$ なので
$$
(f|_4A)(\tau)=3^{4/2}f(3\tau)=9f(3\tau).
$$
後者は $c=0,d=3$ なので
$$
(f|_4B)(\tau)=3^{4/2}3^{-4}f((\tau+2)/3)
=\frac19f((\tau+2)/3).
$$
$tA$ では $\det(tA)=t^2\det A$、下行も $t$ 倍なので、因子は $(t^2\det A)^2/(t(c\tau+d))^4=(\det A)^2/(c\tau+d)^4$ となる。分数線形写像も同じなので、値は不変である。
<!-- solution-end -->

### A2. $T_2$の係数表

$k=4$ と $F=1+2q+3q^2+4q^3+5q^4+\cdots$ を形式的級数とする。$T_2$ の定数項、$q$、$q^2$ 係数を定理で導いた式から計算せよ。この $F$ がモジュラー形式だと仮定してよいかも答えよ。

- Level: A
- ID: MF5-A2

<!-- solution-start -->
**詳細解答**　形式的係数作用 $[q^m]T_2F=a_{2m}+2^3a_{m/2}$ を使う。$m=0$ のとき $a_0+8a_0=9$。$m=1$ のとき $2\nmid1$ なので $a_2=3$。$m=2$ では $a_4+8a_1=5+8\cdot2=21$。従って $9+3q+21q^2+\cdots$。ただし任意の級数はモジュラー変換則を満たさない。ここで計算したのは係数操作であって、$F\in M_4$ という主張ではない。
<!-- solution-end -->

### A3. $U_3$の係数を拾う

レベル3の形式 $f=\sum_{m\ge0}a_mq^m$ について $U_3f$ の $q^0,q^1,q^2$ 係数を求めよ。さらに $F=q^3+2q^6$ を形式的に作用させよ。

- Level: A
- ID: MF5-A3

<!-- solution-start -->
**詳細解答**　$p=3$ はレベルを割るため、[合同部分群上の素数作用素の係数](#prop-mf5-level-q)からそれぞれ $a_0,a_3,a_6$ である。形式的級数 $F$ では $a_3=1,a_6=2$、他の係数は0なので $U_3F=q+2q^2$。追加の $3^{k-1}F(3\tau)$ は $U_3$ の定義に存在しない。
<!-- solution-end -->

### A4. 内積の収束条件

重さ $k\ge2$ のカスプ形式 $f,g$ が $\operatorname{Im}\tau=y\to\infty$ で $O(e^{-2\pi y})$ と評価できるとき、Petersson 被積分関数を上から評価せよ。定数項が1なら同じ議論が使えない理由を述べよ。

- Level: A
- ID: MF5-A4

<!-- solution-start -->
**詳細解答**　$|f\overline g|\le Ce^{-4\pi y}$ であるから
$$
|f(\tau)\overline{g(\tau)}|y^k\frac{dx\,dy}{y^2}
\le Ce^{-4\pi y}y^{k-2}\,dx\,dy.
$$
$x$ 方向の幅は1であり、$y$ 方向は指数減衰なので任意の固定 $k$ で可積分である。定数項1の形式同士では積の絶対値が $\infty$ で1へ近づき、$y^{k-2}$ の積分は $k\ge2$ で発散する。従って収束を保証していたカスプ消失の仮定が失われた。
<!-- solution-end -->

### B1. $T_2^2$と$T_4$の差

重さ $k$ のレベル1形式 $f$ に対し、$q^m$ 係数を直接追い、$T_2^2f-T_4f=2^{k-1}f$ を証明せよ。

- Level: B
- ID: MF5-B1

<!-- solution-start -->
**詳細解答**　$h=T_2f$ として $h_m=a_{2m}+2^{k-1}a_{m/2}$ と置く。さらに作用させると
$$
\begin{aligned}
[q^m]T_2h
&=h_{2m}+2^{k-1}h_{m/2}\\
&=a_{4m}+2^{k-1}a_m
+\mathbf1_{2\mid m}2^{k-1}a_m+2^{2(k-1)}a_{m/4}.
\end{aligned}
$$
ただし割り切れない添字の係数は零とする。一方 [Hecke作用素のFourier係数公式](#thm-mf5-coefficient)から
$$
[q^m]T_4f=a_{4m}+\mathbf1_{2\mid m}2^{k-1}a_m+2^{2(k-1)}a_{m/4}.
$$
差は $2^{k-1}a_m$ であり、すべての $m\ge0$ で一致する。$q$ 展開の一意性から作用素等式が従う。
<!-- solution-end -->

### B2. 互いに素な添字の積

レベル1の同時固有カスプ形式 $f=q+a_2q^2+a_3q^3+\cdots$ について $a_6,a_{10},a_{15}$ を $a_2,a_3,a_5$ で表せ。$a_4$ に同じ積法則を適用してはならない理由を述べよ。

- Level: B
- ID: MF5-B2

<!-- solution-start -->
**詳細解答**　$(2,3)=(2,5)=(3,5)=1$ なので、[固有形式の乗法性](#thm-mf5-eigenforms)を適用して
$$
a_6=a_2a_3,\quad a_{10}=a_2a_5,\quad a_{15}=a_3a_5.
$$
一方 $(2,2)=2$ だから $T_2T_2=T_4+2^{k-1}T_1$ であり、$a_4=a_2^2-2^{k-1}$ となる。素数が重複するため追加項が必要である。
<!-- solution-end -->

### B3. レベル2で誤ったHecke作用を見抜く

$f(\tau)=\Delta(2\tau)$（重さ12、レベル2）について $U_2f$ と、誤ってレベル1の $T_2$ の式を形式的に適用した結果の差を求めよ。どの条件を失念したか説明せよ。

- Level: B
- ID: MF5-B3

<!-- solution-start -->
**詳細解答**　$f=\sum_{n\ge1}\tau(n)q^{2n}$ なので、$U_2f=\sum_{n\ge1}\tau(n)q^n=\Delta(\tau)$。誤った式では
$$
\widetilde T_2 f=U_2f+2^{11}f(2\tau)
=\Delta(\tau)+2048\Delta(4\tau).
$$
したがって差は $2048\Delta(4\tau)$ である。正しい $U_2$ は $p=2\mid N=2$ の分岐であり、レベル1の $p^{k-1}f(p\tau)$ 項を付けるのは二重剰余類代表を誤って一つ多く数える操作である。
<!-- solution-end -->

### B4. 係数と固有値を混同しない

重さ4の $E_4=1+240q+2160q^2+\cdots$ について、$T_2$ の固有値と $q^2$ 係数を区別して求めよ。正規化 $a_1=1$ の固有カスプ形式の議論を、そのまま $E_4$ に適用してよいか。

- Level: B
- ID: MF5-B4

<!-- solution-start -->
**詳細解答**　$M_4$ は1次元で、$T_2$ は定数項に $1+2^3=9$ 倍を施すので $T_2E_4=9E_4$。$q^2$ 係数は $2160$ であり、固有値9ではない。$E_4$ は定数項1を持つ非カスプ形式で、$a_1=240$ だから $q^1$ 係数を比較すると $a_2=2160=9\cdot240$。定理の仮定は $f\in S_k$ で $a_1=1$ であり、$E_4$ 自体には満たされない。$E_4/240$ は $a_1=1$ でもなおカスプ形式ではないので、仮定の区別が必要である。
<!-- solution-end -->

### C1. $\Delta$の係数を素数から構成する

$\Delta=q-24q^2+252q^3+\cdots\in S_{12}(SL_2(\mathbb Z))$ と $\dim S_{12}=1$ を用い、(i) $\Delta$ が同時 Hecke 固有形式であること、(ii) $a_4,a_6,a_8,a_{12}$ を $a_2=-24,a_3=252$ から計算すること、(iii) $a_2,a_3$ だけでは $a_5$ を決定できない理由、(iv) レベル2の $U_2$ の公式との違いを説明せよ。

- Level: C
- ID: MF5-C1

<!-- solution-start -->
**詳細解答**　(i) [full modular groupの次元公式](../MF3/index.md#thm-mf3-dimension)から $S_{12}$ は1次元であり、[Hecke作用素がカスプ形式を保つ](#thm-mf5-coefficient)ので、各 $T_n$ は $\Delta$ を定数倍する。先頭係数 $a_1=1$ だから [同時固有形式と乗法的Fourier係数](#thm-mf5-eigenforms)により固有値は $a_n$ である。

(ii) $k-1=11$、$2^{11}=2048$ である。素数冪の漸化式と互いに素な添字の乗法性から
$$
\begin{aligned}
a_4&=a_2^2-2^{11}=576-2048=-1472,\\
a_6&=a_2a_3=(-24)\cdot252=-6048,\\
a_8&=a_2a_4-2^{11}a_2=(-24)(-1472)-2048(-24)\\
&=35328+49152=84480,\\
a_{12}&=a_4a_3=(-1472)\cdot252=-370944.
\end{aligned}
$$
最後は $(4,3)=1$ を利用する。$a_{12}$ に $a_2a_6$ を適用すると $(2,6)\ne1$ なので誤る。

(iii) 素数5は2,3とは異なり、$T_5$ の固有値を $T_2,T_3$ の固有値から決める合成関係はない。個々の新しい素数の係数が必要である（$\Delta$ の場合は別に $q$ 展開を計算すれば求まる）。

(iv) ここでは $2\nmid N=1$ なので $T_2$ の第2項 $2^{11}a_{m/2}$ が漸化式を生む。レベル2で $2\mid N$ なら作用素は $U_2$ で、係数は $a_{2m}$ のみ。従ってこの漸化式を悪い素数へ無条件に移してはならない。
<!-- solution-end -->

## 7. 次章への接続

正規化同時固有形式の係数は、互いに素な添字で乗法的であり、同じ素数の冪では2項漸化式を満たします。次章MF6ではこの事実から素数ごとの Euler 因子を組み立て、Mellin 変換を通じた解析的性質へ進みます。レベルを割る素数の因子が別扱いになる点も保持します。
