# CYG1-03 整係数・実係数の差とtorsionの反例

<!-- definition-example-audit: strict -->

## 1. 曲率が零でも、なぜ標準束の問題が残るのか

前章では、[大域正則体積形式による標準束の自明化](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)を使い、零にならない正則最高次形式を実際に作れば標準束が自明になると学んだ。しかし曲率やRicci形式から読み取れるのは、まず**実係数**のコホモロジー類である。

[前々章のChern類の含意](../CYG1-01/index.md#prop-cyg1-01-chern-chain)は、滑らかなコンパクトKähler多様体について

$$
K_X\simeq\mathcal O_X
\ \Longrightarrow\
c_1(X)_{\mathbb Z}=0
\ \Longrightarrow\
c_1(X)_{\mathbb R}=0
$$

を与えた。ここで $c_1(X)_{\mathbb Z}\in H^2(X;\mathbb Z)$ は整係数類、$c_1(X)_{\mathbb R}\in H^2(X;\mathbb R)$ は係数変更による像であり、$K_X$ は標準束である。逆向きが失敗する理由は一つではない。

1. 実係数への変更は、有限位数のコホモロジー類を消してしまう。
2. 整係数第一Chern類が零でも、**一般の正則線束**に正則な大域枠があるとは限らない。

本章では二つの欠落を別々に実現する。実係数で失われる情報の例がEnriques曲面の標準束であり、整係数Chern類でも捉えられない正則な貼り合わせの例が楕円曲線上の平坦線束である。後者は**一般の線束**の例であって、楕円曲線自身の標準束が非自明だという主張ではない。

## 2. 有限位数は、実数にすると見えなくなる

加法群 $A$ の元 $a$ がtorsionであるとは、ある正整数 $m$ について $ma=0$ となることだった。零でないtorsion元の**位数**は、このような $m$ の最小値である（零元の位数は $1$）。この意味のtorsionは、接続の捩率テンソルとは別の語である。

まず有限生成Abel群の例

$$
A=\mathbb Z\oplus\mathbb Z/4\mathbb Z\oplus\mathbb Z/9\mathbb Z
$$

を考える。各元を $(r,[s]_4,[t]_9)$ と書く。$a=(0,[2]_4,[3]_9)$ は

$$
2[2]_4=[0]_4,\qquad
3[3]_9=[0]_9,\qquad
6a=(0,[12]_4,[18]_9)=0
$$

を満たし、位数は $2$ と $3$ の最小公倍数 $6$ である。一方 $b=(1,[2]_4,[3]_9)$ は、どの正整数を掛けても第一成分が零にならないのでtorsionでない。

この群の自由成分を実数として残し、有限成分を忘れる準同型を

$$
\iota:A\longrightarrow\mathbb R,\qquad
\iota(r,[s]_4,[t]_9)=r
$$

と書く。これは後で使うコホモロジーの係数変更の群論的な模型である。特に $\iota(a)=0$ であり、$6\iota(a)=\iota(6a)=0$ という式からも確かめられる。実ベクトル空間に非零の有限位数元はないからだ。一方、$b$ の自由成分 $1$ は実数の $1$ として残る。この例は単なる群計算であり、これだけで幾何学的な多様体を構成したことにはならない。

有限CW複体のホモトピー型をもつ空間 $X$ について、$H^2(X;\mathbb Z)$ は有限生成Abel群である。その構造定理と係数変更の比較から、[Chern類の含意を示した命題](../CYG1-01/index.md#prop-cyg1-01-chern-chain)の後半で確認したように、

$$
\ker\bigl(H^2(X;\mathbb Z)\longrightarrow H^2(X;\mathbb R)\bigr)
=\operatorname{Tor}H^2(X;\mathbb Z)
$$

となる。$\operatorname{Tor}A$ は $A$ のすべてのtorsion元からなる部分群である。有限生成群を $\mathbb Z^r\oplus T$（$T$ は有限群）へ分けると、実係数化で $T$ が消え、自由部分 $\mathbb Z^r$ は $\mathbb R^r$ に入る。この最後の比較には有限CW複体での係数変更定理を使うので、任意の抽象群準同型が自由部分で単射になるという誤った一般化はしていない。

**幾何学への橋。** 滑らかなコンパクト多様体は有限CW型をもつ。したがって、その整係数第一Chern類については

$$
c_1(X)_{\mathbb R}=0
\quad\Longleftrightarrow\quad
c_1(X)_{\mathbb Z}\text{ は有限位数}
$$

が成り立つ。ただし右辺は $c_1(X)_{\mathbb Z}=0$ を意味しない。

## 3. 線束の位数とChern類の位数は同じとは限らない

群の位数の議論を正則線束へ移す。線束をテンソル積で掛け合わせたとき、単位元は自明線束 $\mathcal O_X$ である。線束 $L$ の $m$ 回テンソル積 $L^{\otimes m}$ が正則に自明となる性質を、次の定義で扱う。

<a id="def-cyg1-03-torsion-line-bundle"></a>

<!-- formal-statement-start -->
> **定義（有限位数の正則線束）**
> 複素多様体 $X$ 上の正則線束 $L$ が有限位数であるとは、ある整数 $m\ge1$ に対して $L^{\otimes m}\simeq\mathcal O_X$ が**正則線束として**成り立つことをいう。最小のその $m$ を $L$ の位数と呼ぶ。位数 $2$ の非自明な $L$ を非自明な2-torsion正則線束という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cyg1-03-torsion-line-bundle -->
**定義の確認**（自明線束）。 $L=\mathcal O_X$ なら、大域正則枠 $1$ のテンソル積 $1^{\otimes m}$ はどの $m\ge1$ に対しても各点で零にならず、$L^{\otimes m}\simeq\mathcal O_X$ を実現する。最小の正整数は $1$ なので位数は $1$ であり、**非自明な位数2**の例ではない。後に作る線束は $L^{\otimes2}\simeq\mathcal O_X$ だが $L\not\simeq\mathcal O_X$ となり、位数を実際に検査できる。
<!-- definition-example-end -->

[整数係数第一Chern類の遷移関数による定義](../../KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)を $L$ の遷移係数 $t_{\alpha\beta}$ に適用する。$L^{\otimes m}$ の遷移係数は $t_{\alpha\beta}^m$ だから、その対数を $m\ell_{\alpha\beta}$ と選べる。従って三重重なりの整数コサイクルは $m$ 倍になり、

$$
c_1(L^{\otimes m})_{\mathbb Z}=m\,c_1(L)_{\mathbb Z}.
$$

自明線束のChern類は零なので、次が従う。

<a id="prop-cyg1-03-torsion-chern"></a>

<!-- formal-statement-start -->
> **命題（有限位数線束の第一Chern類）**
> $X$ を複素多様体、$L$ をその正則線束とする。整数 $m\ge1$ に対し $L^{\otimes m}\simeq\mathcal O_X$ なら、

$$
m\,c_1(L)_{\mathbb Z}=0,\qquad c_1(L)_{\mathbb R}=0
$$

> となる。従って整係数第一Chern類の位数は $m$ を割り切る。ただし**整係数第一Chern類が零でも、$L$ が正則自明とは限らない**。
<!-- formal-statement-end -->

### 証明の見取り図

テンソル積がChern類で加法に移ることを使う。Chern類の消滅はここでの一方向の帰結であり、それだけで正則枠が存在するとは結論できない。

<!-- proof-start -->
### 証明

[整数係数第一Chern類のČech定義](../../KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)で各遷移係数の対数を $\ell_{\alpha\beta}$ と選ぶ。$L^{\otimes m}$ では対数を $m\ell_{\alpha\beta}$ と選べるから、三重重なりの整数コサイクルは

$$
\frac{m\ell_{\alpha\beta}+m\ell_{\beta\gamma}
+m\ell_{\gamma\alpha}}{2\pi i}
=m\,\frac{\ell_{\alpha\beta}+\ell_{\beta\gamma}
+\ell_{\gamma\alpha}}{2\pi i}.
$$

従ってそのコホモロジー類は $c_1(L^{\otimes m})_{\mathbb Z}=m\,c_1(L)_{\mathbb Z}$ である。

$L^{\otimes m}\simeq\mathcal O_X$ なら左辺は零。$c_1(L)_{\mathbb Z}$ の位数を $d$ とすると、整数の除法 $m=qd+r$、$0\le r<d$ を用いて $0=mc_1(L)=rc_1(L)$。$d$ の最小性より $r=0$、従って $d\mid m$。さらに係数変更写像 $\iota$ は加法的なので $m\,\iota(c_1(L))=0$。実ベクトル空間では $m$ は可逆だから $\iota(c_1(L))=0$。逆の不成立は次節の楕円曲線上の明示例で検証する。$\square$
<!-- proof-end -->

ここで $L^{\otimes2}$ が自明でも $c_1(L)_{\mathbb Z}$ の位数は **$1$ または $2$** であり、必ず $2$ とは限らない。この差が次の二つの幾何例を分ける。

## 4. 楕円曲線：線束は2-torsionでも整係数Chern類は零

[先行章の位相的には自明だが正則非自明な線束](../../../代数系/CAG/CAG1-10/index.md#prop-cag1-10-flat-torus)と同じ貼り合わせを使い、ここではさらにテンソル位数と整係数第一Chern類を検算する。$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、格子の元を $\lambda=a+bi$（$a,b\in\mathbb Z$）と書く。$\chi(\lambda)=(-1)^a$ は

$$
\chi(\lambda+\mu)=\chi(\lambda)\chi(\mu),\qquad
\chi(\lambda)^2=1
$$

を満たす。$\mathbb C\times\mathbb C$ の点 $(z,v)$ を

$$
(z,v)\sim(z+\lambda,\chi(\lambda)v)
$$

で同一視した商を $L$ とする。底空間の商への射影は

$$
[z,v]\longmapsto[z]
$$

である。$E$ の十分小さい座標円板を一つ選ぶと、その逆像の各持ち上げでは $(z,v)$ が正則な局所自明化を与える。持ち上げを $\lambda$ だけ変える際、繊維座標の変換は零にならない定数 $\chi(\lambda)$ なので正則である。

さらに二つの格子移動 $\lambda,\mu$ の合成と一回の $\lambda+\mu$ の移動が同じ繊維変換になる条件は、冒頭で確かめた $\chi(\lambda+\mu)=\chi(\lambda)\chi(\mu)$ である。これが既習の[正則線束の遷移余輪条件](../../CM/CM2-06/index.md#def-cm2-06-transition-cocycle)に当たるので、貼り合わせは整合し、$L$ は正則線束となる。

<a id="prop-cyg1-03-elliptic-flat-line"></a>

<!-- formal-statement-start -->
> **命題（Chern類が零の非自明な2-torsion正則線束）**
> $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で、$\lambda=a+bi$ に対する $\chi(\lambda)=(-1)^a$ の定数遷移で定めた正則線束 $L$ は、次を満たす。

$$
L^{\otimes2}\simeq\mathcal O_E,\qquad
L\not\simeq\mathcal O_E,\qquad c_1(L)_{\mathbb Z}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

遷移の符号を2乗すると $1$ になる。一方、非零大域正則枠が存在すると仮定して普遍被覆へ引き戻すと、ある整周期で符号反転する整関数が必要になる。その2乗は楕円曲線上の正則関数となり、コンパクト性と矛盾する。

<!-- proof-start -->
### 証明

$L^{\otimes2}$ の遷移係数は $\chi(\lambda)^2=1$。従って各局所枠の2乗が重なりで一致し、零でない大域正則枠を与える。[自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)と同じ局所枠の議論により $L^{\otimes2}\simeq\mathcal O_E$ である。

もし $L$ が正則自明なら、零を持たない大域正則切断がある。その普遍被覆 $\mathbb C$ への引戻しは零を持たない整関数 $f$ で表され、切断の値を $[z]\mapsto[z,f(z)]$ と書ける。同じ底点 $[z]=[z+\lambda]$ で切断の値が一致する条件 $[z,f(z)]=[z+\lambda,f(z+\lambda)]$ は、商の同値関係により $f(z+\lambda)=\chi(\lambda)f(z)$ となる。特に

$$
f(z+1)=-f(z),\qquad f(z+i)=f(z)
$$

を満たす。よって $f^2$ は $1$ と $i$ の両周期を持ち、$E$ 上の正則関数を定める。コンパクトで連結な複素多様体上の正則関数は定数だから、$f(z)^2=c$ は定数である。$f$ は連結な $\mathbb C$ から高々二点集合 $\{w:w^2=c\}$ への連続写像なので定数であり、零でない定数なら $f(z+1)=-f(z)$ に矛盾する。従って $L$ は正則非自明である。

最後に $E$ は実2トーラスであり、そのCW分割は0-胞体1個、1-胞体2個、2-胞体1個を持ち、2-胞体の付着語は二つの1-ループの交換子なので、整数鎖群の境界写像は零である。従って $H^2(E;\mathbb Z)\simeq\mathbb Z$ はtorsionを持たない。[有限位数線束の第一Chern類](#prop-cyg1-03-torsion-chern)から $2c_1(L)_{\mathbb Z}=0$ であり、torsionを持たない群では $c_1(L)_{\mathbb Z}=0$ しかない。$\square$
<!-- proof-end -->

**何が失われたか。** この $L$ は位相的にはChern類が零だが、正則な大域枠を選ぶと符号反転条件にぶつかる。**ただし $K_E$ は $dz$ が商へ降りるため正則自明**である。$L$ を楕円曲線の標準束と取り違えない。一般の線束の逆含意失敗を、標準束についての反例だと強めてもいけない。

## 5. Enriques曲面：今度は整係数Chern類そのものが非零

次に**標準束自身**が2-torsionになる実例を考える。Enriques曲面 $S$ は滑らかで連結な射影複素曲面（従ってコンパクトKähler）で、次の性質を持つ。

1. 標準束 $K_S$ は正則非自明だが $K_S^{\otimes2}\simeq\mathcal O_S$。
2. $H^1(S,\mathcal O_S)=0$。

これらはEnriques曲面の存在・分類に属する**外部の幾何学的事実**であり、本章では構成を証明しない。例えば[Enriques曲面の講義ノート（第3章）](https://halgebra.math.msu.su/Lie/2011-2012/corso-k3.pdf)で扱われる。ここでは、与えられた二条件からChern類の結論を導く部分を計算する。

正則線束の同型類をテンソル積でまとめた群を $\operatorname{Pic}(S)$ と書く。これは既習の[解析的Picard群](../../../代数系/CAG/CAG1-10/index.md#def-cag1-10-analytic-picard)であり、$H^1(S,\mathcal O_S^\times)$ と同一視される。ここで $\mathcal O_S$ は正則関数の層、$\mathcal O_S^\times$ は零でない正則関数の層、$H^1$ は[層コホモロジー](../../../代数系/AG/AG3-08/index.md#def-ag3-08-sheaf-cohomology)の第1次を表す。既習の[解析的指数完全列と第一Chern類の定理](../../../代数系/CAG/CAG1-10/index.md#thm-cag1-10-exponential)を $M=S$ に適用する。同定に用いる層の完全列は

$$
0\longrightarrow\mathbb Z
\longrightarrow\mathcal O_S
\xrightarrow{\ f\mapsto e^{2\pi if}\ }\mathcal O_S^\times
\longrightarrow1
$$

から、コホモロジーの完全列の一部として

$$
H^1(S,\mathcal O_S)
\longrightarrow \operatorname{Pic}(S)
\xrightarrow{\ c_1\ }H^2(S;\mathbb Z)
$$

を得る。ここでは既習の長完全列を再証明せず、**完全性の意味**を適用する。$\ker c_1$ は左の写像の像と等しい。従って $H^1(S,\mathcal O_S)=0$ なら $c_1$ は単射になる。これは一般の複素多様体で常に単射だという意味ではない（前節の $E$ はその反例）。

<a id="prop-cyg1-03-enriques-chern"></a>

<!-- formal-statement-start -->
> **命題（Enriques曲面の整係数と実係数の差）**
> $S$ を、$K_S\not\simeq\mathcal O_S$、$K_S^{\otimes2}\simeq\mathcal O_S$、$H^1(S,\mathcal O_S)=0$ を満たす滑らかな連結射影複素曲面とする（Enriques曲面はこの条件を満たす）。このとき

$$
c_1(S)_{\mathbb Z}\ne0,\qquad
2c_1(S)_{\mathbb Z}=0,\qquad
c_1(S)_{\mathbb R}=0.
$$

> それでも $K_S$ は正則自明でなく、零を持たない大域正則2形式は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

$K_S^{\otimes2}$ が自明だから、その整数Chern類は2倍すると零になる。ここまでは前節の線束と同じである。違いは $H^1(\mathcal O_S)=0$ で、指数完全列からChern写像が**単射**になる点である。

<!-- proof-start -->
### 証明

[有限位数線束の第一Chern類](#prop-cyg1-03-torsion-chern)を $L=K_S$、$m=2$ に適用すると

$$
2c_1(K_S)_{\mathbb Z}
=c_1(K_S^{\otimes2})_{\mathbb Z}=0.
$$

一方 $H^1(S,\mathcal O_S)=0$ なので、[解析的指数完全列の完全性](../../../代数系/CAG/CAG1-10/index.md#thm-cag1-10-exponential)を $M=S$ に適用すると $\ker(c_1:\operatorname{Pic}(S)\to H^2(S;\mathbb Z))=\operatorname{im}(H^1(S,\mathcal O_S))=0$、つまり $c_1$ は単射である。$K_S$ は正則非自明、すなわち $\operatorname{Pic}(S)$ の零元でないから、$c_1(K_S)_{\mathbb Z}\ne0$。従ってこの類の位数は正確に $2$ である。

[標準束の符号と第一Chern類](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)より

$$
c_1(S)_{\mathbb Z}=-c_1(K_S)_{\mathbb Z}.
$$

位数2の群元では $-a=a$ なので $c_1(S)_{\mathbb Z}$ も非零の位数2である。実係数への像は $2c_1(S)_{\mathbb R}=0$ を満たし、実ベクトル空間には非零の2-torsionがないから $c_1(S)_{\mathbb R}=0$。最後に[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)の対偶から、正則非自明な $K_S$ に零を持たない大域正則2形式はない。$\square$
<!-- proof-end -->

**曲率についての注意。** [Ricci形式と第一Chern類の同定](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)は、Enriques曲面上でRicci形式のde Rham類が零であることを意味する。しかし任意に固定した計量でRicci形式が零という主張ではない。Ricci平坦計量の**存在**はYauの定理を外部入力として使うと得られる（[前々章の条件比較](../CYG1-01/index.md#prop-cyg1-01-ricci-holonomy)を参照）。

また $K_S^{\otimes2}$ が自明でも $K_S$ は非自明である。大域正則な「2形式の2乗」を表す切断と、大域正則2形式そのものを混同してはならない。

## 6. 周期積分ではtorsionは検出できない

整係数2次コホモロジー類 $a\in H^2(X;\mathbb Z)$ を整数係数2次ホモロジー類 $z\in H_2(X;\mathbb Z)$ に評価する組 $\langle a,z\rangle\in\mathbb Z$ を考える。$ma=0$ なら

$$
m\langle a,z\rangle
=\langle ma,z\rangle=0.
$$

整数には非零の有限位数元がないため、$\langle a,z\rangle=0$ である。**すべての周期が零でも整係数類のtorsionは残り得る**。微分形式の積分がこの差を復元できない理由がここにある。逆に「周期が零だから整係数類も零」と結論するには、torsionの不存在など追加条件が必要である。

三つの判定経路を並べると次のようになる。

| 対象 | 正則線束の自明性 | 整係数第一Chern類 | 実係数第一Chern類 |
|---|---|---|---|
| 楕円曲線 $E$ の標準束 $K_E$ | 自明（$dz$） | $0$ | $0$ |
| 第4節の $E$ 上の線束 $L$ | **非自明**、$L^{\otimes2}$ は自明 | $0$ | $0$ |
| Enriques曲面 $S$ の標準束 $K_S$ | **非自明**、$K_S^{\otimes2}$ は自明 | **非零・位数2** | $0$ |

第2行は「整係数Chern類だけでは正則な貼り合わせを判定できない」こと、第3行は「実係数化によって整係数torsionが消える」ことを、それぞれ別々に示す。

## 7. 演習――どの段階で情報が消えたか

<a id="ex-cyg1-03-a01"></a>
#### CYG1-03-A01 有限生成群で位数を求める
- Level: A

$A=\mathbb Z\oplus\mathbb Z/8\mathbb Z\oplus\mathbb Z/9\mathbb Z$ とし、$a=(0,[4]_8,[3]_9)$、$b=(2,[4]_8,[3]_9)$ とする。各元のtorsion性、有限位数ならその位数、実係数に移した像を求めよ。

<!-- solution-start -->
**詳細解答。** $[4]_8$ の位数は $2$（$2\cdot4=8$）、$[3]_9$ の位数は $3$（$3\cdot3=9$）。直和の元が零になるには両成分が同時に零になる必要があるから

$$
\operatorname{ord}(a)=\operatorname{lcm}(2,3)=6.
$$

$b$ は自由成分が $2$ なので $mb$ の第一成分は $2m\ne0$（$m\ge1$）でありtorsionでない。実係数化は有限成分を零にし、自由成分は実数として残るため $\iota(a)=0$、$\iota(b)=2$ である。
<!-- solution-end -->

<a id="ex-cyg1-03-a02"></a>
#### CYG1-03-A02 線束の2乗とChern類
- Level: A

複素多様体 $X$ の正則線束 $L$ が $L^{\otimes2}\simeq\mathcal O_X$ を満たす。$c_1(L)_{\mathbb Z}$、$c_1(L)_{\mathbb R}$ について必ず成り立つ等式を示し、整係数類が非零と結論できるか答えよ。

<!-- solution-start -->
**詳細解答。** [整数係数第一Chern類の定義](../../KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)で $L$ の遷移係数 $t_{\alpha\beta}$ を2乗すれば、対数も2倍となり、三重重なりの整数コサイクルが2倍になる。従って

$$
2c_1(L)_{\mathbb Z}
=c_1(L^{\otimes2})_{\mathbb Z}
=c_1(\mathcal O_X)_{\mathbb Z}=0.
$$

係数変更後も2倍が零であるが $H^2(X;\mathbb R)$ は実ベクトル空間なので $c_1(L)_{\mathbb R}=0$。整係数類の位数は $1$ または $2$ で、非零とは限らない。第4節の楕円曲線の $L$ は、正則非自明でも整係数類が零になる具体例である。
<!-- solution-end -->

<a id="ex-cyg1-03-a03"></a>
#### CYG1-03-A03 torsion類の周期
- Level: A

$a\in H^2(X;\mathbb Z)$ に $5a=0$ が成り立つとする。任意の $z\in H_2(X;\mathbb Z)$ に対する整数評価 $\langle a,z\rangle$ と、$a$ の実係数像を求めよ。$a=0$ と断定できるか。

<!-- solution-start -->
**詳細解答。** 双線形性で $5\langle a,z\rangle=\langle5a,z\rangle=0$。$\langle a,z\rangle$ は整数なので零である。実係数像も $5\iota(a)=\iota(5a)=0$ より $\iota(a)=0$。ただし $a$ は例えば $\mathbb Z/5\mathbb Z$ 成分の非零元であり得るため、整係数で $a=0$ と断定できない。
<!-- solution-end -->

<a id="ex-cyg1-03-a04"></a>
#### CYG1-03-A04 格子の符号指標
- Level: A

$\Lambda=\mathbb Z+i\mathbb Z$、$\chi(a+bi)=(-1)^a$ とする。$\chi:\Lambda\to\{1,-1\}$ が群準同型であること、$\chi(1)=-1$、$\chi(i)=1$、$\chi^2=1$ を直接確認せよ。なぜこれが線束の貼り合わせに必要かも述べよ。

<!-- solution-start -->
**詳細解答。** $\lambda=a+bi$、$\mu=c+di$ について

$$
\chi(\lambda+\mu)=(-1)^{a+c}
=(-1)^a(-1)^c=\chi(\lambda)\chi(\mu).
$$

従って先に $\lambda$、次に $\mu$ だけ平行移動した繊維作用は、まとめて $\lambda+\mu$ だけ移動する作用と一致する。$\chi(1)=(-1)^1=-1$、$\chi(i)=(-1)^0=1$、$\chi(\lambda)^2=(-1)^{2a}=1$。これがないと商の貼り合わせに経路依存の不整合が生じる。
<!-- solution-end -->

<a id="ex-cyg1-03-b01"></a>
#### CYG1-03-B01 楕円曲線上の非自明な線束
- Level: B

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で $(z,v)\sim(z+\lambda,(-1)^a v)$（$\lambda=a+bi$）と定めた線束 $L$ を考える。$L^{\otimes2}$ が正則自明であること、$L$ は正則非自明であることを示し、$c_1(L)_{\mathbb Z}$ を求めよ。$E$ 自身の標準束と混同しないこと。

<!-- solution-start -->
**詳細解答。** 2乗した繊維係数は $((-1)^a)^2=1$ なので、$L^{\otimes2}$ にはすべての局所枠を貼り合わせた非零大域正則枠がある。もし $L$ に非零大域正則枠があれば、引戻しは整関数 $f$ で $f(z+1)=-f(z)$、$f(z+i)=f(z)$ を満たす。$f^2$ は両周期を持ち、コンパクトな $E$ 上の正則関数だから定数。連結性から $f$ も定数となり、非零定数と符号反転は両立しない。従って $L$ は非自明で位数2である。

$H^2(E;\mathbb Z)\simeq\mathbb Z$ はtorsionを持たないので、[有限位数線束の第一Chern類](#prop-cyg1-03-torsion-chern)の $2c_1(L)_{\mathbb Z}=0$ より $c_1(L)_{\mathbb Z}=0$。これと別に $K_E$ は $dz$ が降りて自明になる。
<!-- solution-end -->

<a id="ex-cyg1-03-b02"></a>
#### CYG1-03-B02 Enriques曲面のChern類を順に判定する
- Level: B

滑らかな射影複素曲面 $S$ が $K_S\not\simeq\mathcal O_S$、$K_S^{\otimes2}\simeq\mathcal O_S$、$H^1(S,\mathcal O_S)=0$ を満たすとする。指数完全列に由来する $\operatorname{Pic}(S)\xrightarrow{c_1}H^2(S;\mathbb Z)$ が単射であることを用いて、$c_1(S)_{\mathbb Z}$ の位数、$c_1(S)_{\mathbb R}$、大域正則非消失2形式の有無を判定せよ。

<!-- solution-start -->
**詳細解答。** [解析的指数完全列と第一Chern類](../../../代数系/CAG/CAG1-10/index.md#thm-cag1-10-exponential)の完全性から $\ker c_1=\operatorname{im}(H^1(S,\mathcal O_S)\to\operatorname{Pic}(S))$。左の群は零なので $\ker c_1=0$。よって $K_S$ が正則非自明なことから $c_1(K_S)_{\mathbb Z}\ne0$。一方

$$
2c_1(K_S)_{\mathbb Z}
=c_1(K_S^{\otimes2})_{\mathbb Z}=0.
$$

従って $c_1(K_S)_{\mathbb Z}$ は非零の位数2。$c_1(S)_{\mathbb Z}=-c_1(K_S)_{\mathbb Z}$ も位数2で非零、実係数像は零。もし非消失正則2形式があれば[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)から $K_S\simeq\mathcal O_S$ となり仮定に反するので、そのような形式は存在しない。
<!-- solution-end -->

<a id="ex-cyg1-03-b03"></a>
#### CYG1-03-B03 曲率零という誤推論
- Level: B

連結コンパクトKähler多様体 $(X,g)$ で、指定した計量のRicci形式 $\rho_g$ が零であるとする。次の推論のどの段階までが正しいか判定し、誤りを反例で修正せよ。

$$
\rho_g=0
\ \Longrightarrow\
c_1(X)_{\mathbb R}=0
\ \Longrightarrow\
c_1(X)_{\mathbb Z}=0
\ \Longrightarrow\
K_X\simeq\mathcal O_X.
$$

<!-- solution-start -->
**詳細解答。** [Ricci形式と第一Chern類の同定](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)で $[\rho_g/(2\pi)]=c_1(X)_{\mathbb R}$ だから、第一矢印は正しい。有限CW型で第二矢印から言えるのは $c_1(X)_{\mathbb Z}$ がtorsionということだけ。Enriques曲面は実係数類が零でも整係数類は非零の位数2である。そこにRicci平坦計量が存在することはYauの定理を使う外部入力であって、実係数類の消滅だけで**指定した** $g$ のRicci形式が零とは言えない。

第三矢印も、実は**標準束について**一般には偽である。これを第4節の一般線束 $L$ だけに依存せず、[既習の平坦な複素トーラスの有限商](../../KAH/KAH1-16/index.md#prop-kah1-16-flat-quotient)を使って直接確かめる。$T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ の座標を $(z,w)$ とし、

$$
\tau:T\longrightarrow T,\qquad
\tau([z,w])=[z+\tfrac12,-w]
$$

と置く。$\tau^2([z,w])=[z+1,w]=[z,w]$ であり、$\tau$ の固定点があれば $\tfrac12\in\mathbb Z+i\mathbb Z$ が必要になるので固定点はない。従って $X=T/\langle\tau\rangle$ は滑らかな連結コンパクトKähler曲面である。$\tau$ は平坦計量の等長変換だから、その商計量 $g$ も $\rho_g=0$ を満たす。

$T$ 上の正則2形式 $\Omega=dz\wedge dw$ は $\tau^*\Omega=-\Omega$。$T$ 上の正則関数は定数なので、正則2形式は定数倍の $\Omega$ しかなく、$X$ へ降りる非零正則2形式はない。[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)から $K_X\not\simeq\mathcal O_X$ である。

一方、$\operatorname{Re}z$ を $z$ の実部とし、滑らかな関数 $h(z,w)=e^{2\pi i\operatorname{Re}z}$ を考える。$h$ は格子移動で不変、$\tau$ では $h(z+\tfrac12,w)=-h(z,w)$ となる。従って

$$
\tau^*(h\Omega)
=(-h)(-\Omega)=h\Omega
$$

で、$h\Omega$ は $X$ の標準束の**零を持たない滑らかな大域枠**へ降りる。ただし $h=e^{\pi i(z+\bar z)}$ は、共役座標 $\bar z$ の方向に微分すると

$$
\frac{\partial h}{\partial\bar z}=\pi i h\ne0
$$

なので正則な枠ではない。滑らかな枠が位相的第一Chern類を消すことは[先行章の平坦線束での判定](../../../代数系/CAG/CAG1-10/index.md#prop-cag1-10-flat-torus)と同じである。従って標準束は位相的に自明であり、[標準束のChern類の符号](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)も合わせて

$$
c_1(K_X)_{\mathbb Z}=0,\qquad c_1(X)_{\mathbb Z}=0
$$

となる。よってこの $X$ は第三矢印への標準束そのものの反例であり、しかも指定した平坦計量について第一矢印の仮定も満たす。なお第4節の $L$ も整係数Chern類零と正則非自明性を区別する例だが、**それ自体は標準束ではない**。
<!-- solution-end -->

<a id="ex-cyg1-03-c01"></a>
#### CYG1-03-C01 二つの2-torsion例の違いを証明する
- Level: C

次の二つの線束を比較する。(I) 楕円曲線 $E$ 上の第4節の符号指標で作った $L$、(II) $K_S$ が非自明かつ2乗自明で $H^1(S,\mathcal O_S)=0$ を満たすEnriques曲面 $S$ の標準束。双方について (a) 正則自明性、(b) 線束の位数、(c) 整係数Chern類の位数、(d) 実係数Chern類を、根拠を示して判定せよ。さらに「$M^{\otimes2}\simeq\mathcal O$ なら $c_1(M)_{\mathbb Z}$ は必ず非零の位数2」という偽命題の誤りを特定せよ。

<!-- solution-start -->
**詳細解答。** (I) の $L$ は遷移符号が2乗で $1$ となるから2乗自明。正則枠があれば引戻し $f$ は $f(z+1)=-f(z)$、$f(z+i)=f(z)$ を満たすが、$f^2$ は $E$ 上の正則関数で定数となり、$f$ 自身も定数となるので非零性と矛盾する。よって正則非自明で線束位数2。$H^2(E;\mathbb Z)\simeq\mathbb Z$ にtorsionはないため $2c_1(L)_{\mathbb Z}=0$ は $c_1(L)_{\mathbb Z}=0$ を意味し、実係数像も零である。

(II) の $K_S$ は仮定から正則非自明で線束位数2。[有限位数線束の第一Chern類](#prop-cyg1-03-torsion-chern)により $2c_1(K_S)_{\mathbb Z}=0$。さらに[指数完全列の定理](../../../代数系/CAG/CAG1-10/index.md#thm-cag1-10-exponential)で $H^1(S,\mathcal O_S)=0$ なので $\operatorname{Pic}(S)\to H^2(S;\mathbb Z)$ は単射。非自明な $K_S$ のChern類は非零、従って位数は2。実係数像は零。

比較すると、どちらの線束も正則非自明で2乗自明、実係数Chern類も零である。違いは整係数類で、(I) では $0$、(II) では非零位数2となる。偽命題は[有限位数線束の第一Chern類](#prop-cyg1-03-torsion-chern)が与える**位数が2を割る**という結論を、**位数が2と等しい**にすり替えている。(I) はまさにこのすり替えの反例であり、(II) で等号になる理由は追加の $H^1(\mathcal O_S)=0$ と指数完全列の単射性である。
<!-- solution-end -->

## 次の講義へ

実係数Chern類・整係数Chern類・正則自明性は、情報の異なる三段階である。次は楕円曲線と高次元複素トーラスの標準束・平坦計量・ホロノミーを同じ座標系で直接計算し、標準束が自明でもホロノミー群がちょうど $SU(n)$ になるとは限らないことを確認する。
