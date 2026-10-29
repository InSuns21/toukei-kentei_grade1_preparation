# CAG1-11 標準束と随伴公式を両側で読む

[滑らかな射影超曲面の随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)により、滑らかな射影超曲面の標準束は次数だけで計算できた。一方、複素多様体の標準束は、局所的な**正則微分形式**を座標変更で貼り合わせて作る。同じ $K_X$ という記号でも、二つの圏で作った束が本当に一致することは、式の見た目だけからは分からない。

この章では「方程式を微分して失う一方向」を代数・解析の両側で比べる。まず微分の短完全列を解析化し、次に局所Jacobianを使って正則な最高次形式を貼り合わせる。最後に、双方の随伴公式を結ぶ同型が同じものであることを検証する。

以下、$n\ge2$、$d\ge1$、$P=\mathbb P^n_{\mathbb C}$、$X=X_d=V_+(F)\subset P$ とする。$F$ は次数 $d$ の斉次多項式で、$X$ の各点で斉次勾配が非零、すなわち $X$ は滑らかな超曲面と仮定する。$P^{\mathrm{an}}=\mathbb{CP}^n$ と $X^{\mathrm{an}}$ はそれぞれの解析化である。代数的標準束は $K_X=\det\Omega_X^1$、解析的標準束は $K_{X^{\mathrm{an}}}=\det\Omega_{X^{\mathrm{an}}}^1$ と区別する。

## 1. 方程式の微分が両側の余法方向になる

標準チャート $U_i=\{X_i\ne0\}$ に座標 $z_k^{(i)}=X_k/X_i$（$k\ne i$）を入れ、添字を小さい順に並べる。局所方程式は $f_i=F/X_i^d$ であり、$U_i\cap U_j$ 上で

$$
f_j=(X_i/X_j)^d f_i=:u_{ij}f_i.
$$

ここで $u_{ij}$ は重なりで零にならない正則関数である。$X$ のイデアル層 $\mathcal I$ の商 $\mathcal I/\mathcal I^2$ は、[代数的余法層の計算](../../AG/AG2-10/index.md#prop-ag2-10-conormal-hypersurface)によって $\mathcal O_X(-d)$ に同型で、各チャートの基底は $\overline{f_i}$ である。

解析側でも $f_i$ は正則関数であり、その零点上では $df_i$ が法線方向を検出する。ただし $df_i$ を $X^{\mathrm{an}}$ の余接層の元と誤解してはいけない。周囲の余接層においては非零の法方向だが、$X^{\mathrm{an}}$ の余接層では $df_i=0$ という関係を課すからである。

<a id="prop-cag1-11-analytic-conormal"></a>

<!-- formal-statement-start -->
> **命題（余法完全列と解析化の整合）**  
> 上記の滑らかな射影超曲面 $X\subset P$ に対して、[代数的余法完全列](../../AG/AG2-10/index.md#thm-ag2-10-conormal-sequence)を解析化すると、解析的な局所自由層の短完全列

$$
0\longrightarrow\mathcal O_{X^{\mathrm{an}}}(-d)
\xrightarrow{\ df\ }
\Omega_{P^{\mathrm{an}}}^1|_{X^{\mathrm{an}}}
\longrightarrow\Omega_{X^{\mathrm{an}}}^1
\longrightarrow0
$$

> が得られる。左・中・右項の階数はそれぞれ $1,n,n-1$ であり、左の写像は局所基底 $\overline{f_i}$ を $df_i$ へ送る。
<!-- formal-statement-end -->

### 証明の見取り図

[解析化の平坦性](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)で代数的完全列が保たれることと、滑らかな点では一つの偏微分が零にならず、解析的陰関数定理によって残りの座標が局所座標になることを組み合わせる。

<!-- proof-start -->
### 証明

一つの $U_i$ 上で $z_1,\ldots,z_n$ と座標を略記し、$a_r=\partial f_i/\partial z_r$ とおく。滑らかさより各点で少なくとも一つの $a_r$ が非零であり、その近傍 $W$ では $a_r$ が正則関数の単元になる。解析側の局所環において

$$
df_i=\sum_{s=1}^n a_s\,dz_s
$$

だから、$df_i$ と $dz_s$（$s\ne r$）は $\Omega_{P^{\mathrm{an}}}^1|_W$ の基底をなす。実際、元の座標微分基底からの変換行列の行列式は符号を除き $a_r$ で、逆行列が正則関数の行列として存在する。従って $df_i$ による階数1の部分束を商にすると、$dz_s$（$s\ne r$）の像が階数 $n-1$ の局所基底になる。

また $f_j=u_{ij}f_i$ を微分すれば

$$
df_j=u_{ij}\,df_i+f_i\,du_{ij},
\qquad df_j|_{X^{\mathrm{an}}}=u_{ij}\,df_i|_{X^{\mathrm{an}}}.
$$

従って法方向の基底の変換係数は $u_{ij}$、すなわち $\mathcal O(-d)$ のものと同じである。一方、[代数側の短完全列](../../AG/AG2-10/index.md#thm-ag2-10-conormal-sequence)を[忠実平坦な解析化](../CAG1-03/index.md#thm-cag1-03-analytic-faithful-flatness)でテンソルすると完全性が保たれる。滑らかな座標近傍では $(\Omega_X^1)^{\mathrm{an}}$ の基底 $dz_s$ の像が解析側の $dz_s$ に一致するので、右端は $\Omega_{X^{\mathrm{an}}}^1$ に同型である。ゆえに表示した短完全列を得る。$\square$
<!-- proof-end -->

**直接例。** $\mathbb C^2$ 上の放物線 $f(x,y)=y-x^2$ では $df=-2x\,dx+dy$。$\partial f/\partial y=1$ が単元なので、余接層の基底 $(dx,dy)$ を $(df,dx)$ に替えられ、商では $dy=2x\,dx$ となる。残る一本 $dx$ が曲線の正則余接束の局所基底であり、代数的な関係式を解析化しても変わらない。

## 2. 標準束の比較写像はどこから生じるか

[複素多様体の行列式束](../../../幾何系/CM/CM2-08/index.md#def-cm2-08-determinant-bundle)は局所基底の最高外積で定義される。$X$ の代数的局所座標を解析化すると、その座標関数は正則であり、代数的微分 $dg$ を正則微分 $dg$ に送れる。これが余接束の自然な比較写像で、滑らかさのもとで前節の局所基底同士を対応させる同型になる。

<a id="thm-cag1-11-canonical-comparison"></a>

<!-- formal-statement-start -->
> **定理（滑らかな超曲面の標準束と解析化の可換性）**  
> $X=V_+(F)\subset\mathbb P^n_{\mathbb C}$ を滑らかな射影超曲面とする。代数的微分を正則微分へ送る自然な写像は

$$
(\Omega_X^1)^{\mathrm{an}}\simeq
\Omega_{X^{\mathrm{an}}}^1,
\qquad
(K_X)^{\mathrm{an}}\simeq K_{X^{\mathrm{an}}}
$$

> を誘導する。後者は外積・局所基底変更と両立し、階数はどちらも $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず前節の余接層の局所同型を取り、次に $n-1$ 個の微分の最高外積を取る。局所同型が座標変更と可換であることをJacobianの連鎖律から確かめる。

<!-- proof-start -->
### 証明

前節の $a_r\ne0$ である開集合 $W$ において、$z_s$（$s\ne r$）は $X^{\mathrm{an}}$ 上の局所正則座標である。[余法列の解析化](#prop-cag1-11-analytic-conormal)の右端同型は $dz_s$ を同名の正則微分へ写す。したがって外積を取れば

$$
(dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_n)^{\mathrm{an}}
\longmapsto
dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_n
$$

という局所的な線束同型になる。別の座標 $w_1,\ldots,w_{n-1}$ に替えたときは、代数・解析のどちらでも微分の連鎖律により基底変更行列が $(\partial w_a/\partial z_b)$ であり、最高外積はその行列式倍となる。各成分は同じ代数的座標変換を解析化したものなので、両側の貼り合わせは一致する。局所同型は重なりで一致し、大域同型になる。$\square$
<!-- proof-end -->

この同型は、任意の特異超曲面で $\bigwedge^{n-1}\Omega_X^1$ が線束になるという主張ではない。偏微分がすべて零の点では、上で使った局所基底を作れない。

## 3. 局所Jacobianから正則な随伴形式を作る

前節までは束が抽象的に一致することを示した。実際に正則な $n-1$ 形式を一枚のチャートで書くには、方程式のどの変数を解いたかを記録する。$a_r\ne0$ の近傍では

$$
df_i\wedge dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_n
=(-1)^{r-1}a_r\,dz_1\wedge\cdots\wedge dz_n.
$$

ここで上付きの帽子はその因子を除く記号である。$a_r$ の逆数はこの近傍に限って正則である。そこで周囲の $n$ 形式から法方向 $df_i$ を除いた残りを使う。

<a id="prop-cag1-11-holomorphic-residue"></a>

<!-- formal-statement-start -->
> **命題（局所正則随伴形式）**  
> $X\subset P$ が上記の滑らかな超曲面で、$U_i$ の座標 $z_1,\ldots,z_n$ で $f_i=0$ と書かれているとする。$a_r=\partial f_i/\partial z_r$ が零でない開集合上の $X^{\mathrm{an}}$ で、

$$
\eta_{i,r}=(-1)^{r-1}
\frac{dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_n}{a_r}
$$

> は解析的標準束の零にならない局所正則切断である。同一チャート内で $a_r,a_s$ がともに零でなければ $\eta_{i,r}=\eta_{i,s}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正則性は分母が非零であることから従う。一致は $df_i=0$ を**超曲面の余接層で**用いて楔積を整理する。周囲の $n$ 形式の等式と、超曲面上の $n-1$ 形式の等式を混同しない。

<!-- proof-start -->
### 証明

$a_r$ が正則な単元なので $1/a_r$ は正則であり、他の $n-1$ 個の座標微分は[余法完全列](#prop-cag1-11-analytic-conormal)の商の局所基底になる。したがって $\eta_{i,r}$ は零にならない局所正則切断である。

$a_s$ も単元とする。超曲面上では $\sum_t a_tdz_t=0$ だから、$r,s$ 以外の $n-2$ 個の微分を楔積すると、残る二項から

$$
(-1)^{r-1}a_s\,dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_n
=(-1)^{s-1}a_r\,dz_1\wedge\cdots\wedge\widehat{dz_s}\wedge\cdots\wedge dz_n.
$$

両辺を $a_ra_s$ で割って $\eta_{i,r}=\eta_{i,s}$ を得る。すなわち消去する変数を取り替えても同じ局所形式である。$\square$
<!-- proof-end -->

**直接例。** $f(x,y)=x+y+xy$ の零点曲線を原点近くで見る。$a_x=1+y$、$a_y=1+x$ はともに単元で、

$$
\eta_x=\frac{dy}{1+y},\qquad
\eta_y=-\frac{dx}{1+x}.
$$

$df=(1+y)dx+(1+x)dy=0$ を曲線上で用いると両式は一致する。この計算は分母だけを合わせる操作ではなく、**同じ商余接層の元を二通りに表示**したことを意味する。

## 4. チャートを移すと次数 $d-n-1$ が現れる

同一チャート内の貼り合わせが済んでも、射影空間の異なる標準チャート間での変換がまだ残る。$U_i\cap U_j$ 上で、座標の順番をそれぞれ添字の昇順に固定した体積形式を

$$
\omega_i=\bigwedge_{k\ne i} dz_k^{(i)},
\qquad \omega_j=J_{ji}\,\omega_i,
\qquad J_{ji}=\det\left(\frac{\partial z_k^{(j)}}{\partial z_l^{(i)}}\right)_{k\ne j,\,l\ne i}
$$

と置く。$J_{ji}$ は局所正則座標変更のJacobian行列式で、非零の正則関数である。[射影空間の標準束](../../AG/AG2-09/index.md#thm-ag2-09-canonical-projective)では $\omega_j/\omega_i=J_{ji}$ が $\mathcal O(-n-1)$ の変換になる。

<a id="thm-cag1-11-analytic-adjunction"></a>

<!-- formal-statement-start -->
> **定理（解析的随伴公式と代数的公式との整合）**  
> $X=V_+(F)\subset\mathbb P^n_{\mathbb C}$ が滑らかで $\deg F=d\ge1$ なら、解析的標準束について自然な同型

$$
K_{X^{\mathrm{an}}}\simeq
\bigl(K_{P^{\mathrm{an}}}\otimes\mathcal O_{P^{\mathrm{an}}}(d)\bigr)|_{X^{\mathrm{an}}}
\simeq\mathcal O_{X^{\mathrm{an}}}(d-n-1)
$$

> がある。この同型は[代数的随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)を解析化した同型と、[標準束の比較](#thm-cag1-11-canonical-comparison)の下で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

局所方程式は $f_j=u_{ij}f_i$ と変わり、周囲の体積形式は $\omega_j=J_{ji}\omega_i$ と変わる。したがって法方向を除いた局所形式の係数は $J_{ji}/u_{ij}$ である。これは $K_P\otimes\mathcal O(d)$ の遷移係数そのものである。

<!-- proof-start -->
### 証明

まず[余法完全列の解析化](#prop-cag1-11-analytic-conormal)の局所分裂を用いる。階数が $1,n,n-1$ の短完全列の行列式を取ると、[局所基底の楔積による行列式公式](../../AG/AG2-09/index.md#prop-ag2-09-determinant-exact)と同じ構成で

$$
K_{P^{\mathrm{an}}}|_{X^{\mathrm{an}}}
\simeq\mathcal O_{X^{\mathrm{an}}}(-d)\otimes K_{X^{\mathrm{an}}}.
$$

実際、左項の基底 $df_i$ と商の基底の持ち上げ $v_1,\ldots,v_{n-1}$ の楔積 $df_i\wedge v_1\wedge\cdots\wedge v_{n-1}$ は、持ち上げを $v_s+c_sdf_i$ に替えても変わらない。ゆえにこの同型は分裂の選択に依存しない。$\mathcal O(d)$ をテンソルして第一の同型を得る。

さらに各 $i$ で、[局所随伴形式](#prop-cag1-11-holomorphic-residue) $\eta_i$ を、選んだ $a_r\ne0$ の領域上の $\eta_{i,r}$ とする。前命題で $r$ に依存しない。チャートを替えると

$$
df_j|_X=u_{ij}df_i|_X,
\qquad \omega_j=J_{ji}\omega_i.
$$

両側の局所形式はそれぞれ $df_i\wedge\eta_i=\omega_i$、$df_j\wedge\eta_j=\omega_j$ を満たすという**周囲の最高外積への対応**で定まる（この等式は $X$ の余接層ではなく、法方向を残した周囲の余接層の行列式で読む）。したがって

$$
\eta_j=\frac{J_{ji}}{u_{ij}}\eta_i
=J_{ji}\left(\frac{X_j}{X_i}\right)^d\eta_i.
$$

[ねじり層の基底変換](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf)による $\mathcal O(d)$ の基底 $e_i$ は $e_j=(X_j/X_i)^d e_i$ を満たす。従って $\omega_i\otimes e_i$ と $\eta_i$ の遷移係数が一致し、両者を対応させる局所同型が重なりで貼り合う。

最後に、代数側でも[余法完全列](../../AG/AG2-10/index.md#thm-ag2-10-conormal-sequence)の基底 $\overline{f_i}$ は $d f_i$ に写り、その行列式同型は同じ楔積で構成されている。解析化は局所基底と楔積を保つため、この貼り合わせは代数的随伴公式の解析化と一致する。また $K_P\simeq\mathcal O_P(-n-1)$ の解析化を代入すると $d-n-1$ を得る。$\square$
<!-- proof-end -->

### 二つの標準チャートで符号を手計算する

$n=2$ とし、$U_0$ の座標を $x=X_1/X_0$、$y=X_2/X_0$、$U_1$ の座標を $w=X_0/X_1=1/x$、$v=X_2/X_1=y/x$ とする。座標Jacobianは

$$
\det\frac{\partial(w,v)}{\partial(x,y)}
=\det\begin{pmatrix}-x^{-2}&0\\-yx^{-2}&x^{-1}\end{pmatrix}
=-x^{-3}.
$$

$f_1=x^{-d}f_0$ なので、局所随伴形式の変換は

$$
\eta_1=(-x^{-3})x^d\eta_0=-x^{d-3}\eta_0.
$$

三次曲線では $d=3$ で、正の冪や負の冪の残りはなく、係数は $-1$ だけになる。この符号はチャートの座標順を替えたときの方向の変換であり、線束の同型類を変えない。

## 5. 公式の使用条件を例から読む

**超平面。** $d=1$ の $X\simeq\mathbb P^{n-1}$ なら、公式は $K_X\simeq\mathcal O_X(-n)$ を与える。これは[射影空間の標準束公式](../../AG/AG2-09/index.md#thm-ag2-09-canonical-projective)を次元 $n-1$ に適用したものと一致する。

**平面三次曲線。** $n=2,d=3$ で滑らかなら $K_X\simeq\mathcal O_X$。例えば $F=X_0^3+X_1^3+X_2^3$ の斉次勾配は $(3X_0^2,3X_1^2,3X_2^2)$ で、射影点で同時零にならない。したがって滑らかさの条件を満たす。解析側でも上の遷移係数は $-1$ で、他のチャートとの整合を合わせて非消失の正則1形式が貼り合う。

**平面四次曲線。** $n=2,d=4$ なら $K_X\simeq\mathcal O_X(1)$。三次曲線と同じ「自明」にはならず、次数が一つ残る。

**特異な尖点。** $f(x,y)=y^2-x^3$ では $df=-3x^2dx+2y\,dy$ で、原点で両係数が零になる。従って $df$ は周囲の余接層の局所自由な直和因子にならず、$\Omega_X^1$ を階数1の局所自由層とする証明が壊れる。[AG2-10の特異点での検討](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)と同じ理由で、本章の滑らかな標準束の議論は使えない。特異曲線の双対化層には別の構成が必要である。

射影性は、以上の**局所的な解析化と随伴形式の構成自体**の必要条件ではない。ただし[Picard群のGAGA比較](../CAG1-10/index.md#thm-cag1-10-picard-gaga)や「すべての正則線束を代数化できる」という結論を用いる段階では、射影性（または適切な固有性とその定理）が本質的である。

## 6. 演習と詳細解答

以下、超曲面の滑らかさが必要な問題では明記する。座標微分の楔積は、指定した順序で取る。

### Level A

<a id="ex-cag1-11-a01"></a>
#### CAG1-11-A01 余法層の次数
- Level: A

次数 $5$ の滑らかな超曲面 $X\subset\mathbb P^4_{\mathbb C}$ において、余法層と正規束を $\mathcal O_X(k)$ の形で書き、どちらが微分 $df_i$ で生成されるか答えよ。

<!-- solution-start -->
**詳細解答。** [超曲面の余法層](../../AG/AG2-10/index.md#prop-ag2-10-conormal-hypersurface)は $\mathcal I/\mathcal I^2\simeq\mathcal O_X(-5)$。法方向の微分 $df_i$ がその基底の像である。正規束は双対なので $N_{X/P}\simeq\mathcal O_X(5)$。符号を逆にすると、$f_j=(X_i/X_j)^5f_i$ の変換と一致しなくなる。
<!-- solution-end -->

<a id="ex-cag1-11-a02"></a>
#### CAG1-11-A02 放物線上で残る微分
- Level: A

$f(x,y)=y-x^2$ の零点曲線の原点近傍で、$df$ と $\Omega_C^1$ の局所基底を求め、消去変数を $y$ とするときの局所随伴形式を計算せよ。座標順は $(x,y)$ とする。

<!-- solution-start -->
**詳細解答。** $df=-2x\,dx+dy$ で $f_y=1$ は単元。商では $dy=2x\,dx$ なので $dx$ が基底である。[局所随伴形式](#prop-cag1-11-holomorphic-residue)の $r=2$ を使うと $\eta_y=(-1)^{2-1}dx/1=-dx$。$df\wedge(-dx)=dy\wedge(-dx)=dx\wedge dy$ となり符号も確認できる。
<!-- solution-end -->

<a id="ex-cag1-11-a03"></a>
#### CAG1-11-A03 二つの射影チャートのJacobian
- Level: A

$U_0\cap U_1\subset\mathbb P^2$ で $(x,y)=(X_1/X_0,X_2/X_0)$ と $(w,v)=(X_0/X_1,X_2/X_1)$ のJacobian行列式を求めよ。次数 $d=4$ の方程式では局所随伴形式がどう変わるか。

<!-- solution-start -->
**詳細解答。** $w=x^{-1}$、$v=y/x$ だから、$w_x=-x^{-2}$、$w_y=0$、$v_x=-y/x^2$、$v_y=x^{-1}$。従って $J_{10}=(-x^{-2})(x^{-1})=-x^{-3}$。$f_1=x^{-4}f_0$ である。[解析的随伴公式と代数的公式との整合](#thm-cag1-11-analytic-adjunction)における局所変換式から $\eta_1=(-x^{-3})/(x^{-4})\eta_0=-x\eta_0$。$x\ne0$ の重なり上で係数は正則な単元である。
<!-- solution-end -->

<a id="ex-cag1-11-a04"></a>
#### CAG1-11-A04 超平面の標準束
- Level: A

$H=\{X_2=0\}\subset\mathbb P^2$ の標準束を随伴公式で求め、$H\simeq\mathbb P^1$ の直接計算と比較せよ。

<!-- solution-start -->
**詳細解答。** $F=X_2$ は一次式で勾配が非零なので $H$ は滑らか。$n=2,d=1$ を[随伴公式](#thm-cag1-11-analytic-adjunction)に代入して $K_H\simeq\mathcal O_H(1-2-1)=\mathcal O_H(-2)$。[射影空間の標準束](../../AG/AG2-09/index.md#thm-ag2-09-canonical-projective)を $\mathbb P^1$ に適用しても $\mathcal O_{\mathbb P^1}(-2)$ を得る。
<!-- solution-end -->

<a id="ex-cag1-11-a05"></a>
#### CAG1-11-A05 尖点で局所分裂できない理由
- Level: A

$f(x,y)=y^2-x^3$ に対し原点で $df$ の係数を調べ、滑らかな超曲面についての余法完全列の局所分裂証明のどこが使えないか述べよ。

<!-- solution-start -->
**詳細解答。** $df=-3x^2\,dx+2y\,dy$ で、原点では両係数が零である。従って座標微分から $(df,dz)$ への変換行列式が単元にならず、[余法列の解析化](#prop-cag1-11-analytic-conormal)の証明で用いた逆行列を作れない。$\Omega_C^1$ の原点での余接繊維は $dx,dy$ の二次元を持つ一方、滑らかな近傍での階数は1であり、局所自由階数1と扱えない。
<!-- solution-end -->

### Level B

<a id="ex-cag1-11-b01"></a>
#### CAG1-11-B01 二通りの正則1形式の一致
- Level: B

$C=\{x+y+xy=0\}\subset\mathbb C^2$ の原点近傍で、$x$ を消去した随伴形式と $y$ を消去した随伴形式を求め、曲線上で一致することを示せ。

<!-- solution-start -->
**詳細解答。** $df=(1+y)dx+(1+x)dy$、原点近くで両係数は非零。$x$ を消去すると $r=1$ なので $\eta_x=dy/(1+y)$、$y$ を消去すると $r=2$ なので $\eta_y=-dx/(1+x)$。曲線の余接層で $df=0$ より $(1+x)dy=-(1+y)dx$。両辺を $(1+x)(1+y)$ で割り $dy/(1+y)=-dx/(1+x)$ となる。分母の非零性が割り算の条件である。
<!-- solution-end -->

<a id="ex-cag1-11-b02"></a>
#### CAG1-11-B02 行列式とねじり層の変換を合わせる
- Level: B

$X_d\subset\mathbb P^2$ が滑らかとする。$U_0\cap U_1$ の $x=X_1/X_0\ne0$ で、周囲の体積形式と $\mathcal O(d)$ の局所基底がどう変わるかを別々に求め、解析的標準束の変換係数を導け。

<!-- solution-start -->
**詳細解答。** $w=1/x,v=y/x$ の連鎖律から $dw\wedge dv=-x^{-3}dx\wedge dy$ で、周囲の標準束の係数は $-x^{-3}$。[ねじり層の基底](../../AG/AG2-06/index.md#def-ag2-06-twisting-sheaf)は $e_1=x^de_0$ なので、積の基底は $(dw\wedge dv)\otimes e_1=-x^{d-3}(dx\wedge dy)\otimes e_0$。一方 $f_1=x^{-d}f_0$ のため局所随伴形式の係数は $(-x^{-3})/(x^{-d})=-x^{d-3}$。両側が一致し、[解析的随伴公式](#thm-cag1-11-analytic-adjunction)の貼り合わせが確かめられた。
<!-- solution-end -->

<a id="ex-cag1-11-b03"></a>
#### CAG1-11-B03 標準束の解析化とGAGAを区別する
- Level: B

$X\subset\mathbb P^n_{\mathbb C}$ が滑らかな射影超曲面であるとき、$(K_X)^{\mathrm{an}}\simeq K_{X^{\mathrm{an}}}$ の証明と、任意の解析的正則線束を代数化できるという主張の証明に必要な入力を区別せよ。

<!-- solution-start -->
**詳細解答。** 前者は[余法列の解析化](#prop-cag1-11-analytic-conormal)と[最高外積の自然性](#thm-cag1-11-canonical-comparison)により、局所の微分とJacobianの比較から従う。滑らかさは局所自由性に必要だが、同じ局所計算自体に射影性は要らない。後者は局所座標から任意の正則線束を作り直すだけではなく、[GAGAの連接層代数化](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)と[Picard群の比較](../CAG1-10/index.md#thm-cag1-10-picard-gaga)を用いる。そこでは射影性が定理の仮定となる。
<!-- solution-end -->

<a id="ex-cag1-11-b04"></a>
#### CAG1-11-B04 正則な最高外積の自然性
- Level: B

二次元の複素座標 $(x,y)$ から $(u,v)=(x+y,x-y)$ へ変更するとき、$du\wedge dv$ を $dx\wedge dy$ で表せ。また、この計算が標準束の貼り合わせに使える理由を述べよ。

<!-- solution-start -->
**詳細解答。** $du=dx+dy$、$dv=dx-dy$ なので $du\wedge dv=(dx+dy)\wedge(dx-dy)=-dx\wedge dy+dy\wedge dx=-2dx\wedge dy$。Jacobian行列 $\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ の行列式も $-2$ で一致する。係数が非零だから変換は局所正則座標変更であり、[行列式束の定義](../../../幾何系/CM/CM2-08/index.md#def-cm2-08-determinant-bundle)によって最高外積の基底がJacobian行列式倍で変わる。
<!-- solution-end -->

### Level C

<a id="ex-cag1-11-c01"></a>
#### CAG1-11-C01 平面三次曲線の二つの標準束を照合する
- Level: C

$X=\{X_0^3+X_1^3+X_2^3=0\}\subset\mathbb P^2_{\mathbb C}$ とする。

1. 射影Jacobianで $X$ の滑らかさを確かめよ。
2. 代数的随伴公式で $K_X$ を計算せよ。
3. $U_0$ の $(x,y)$ において $f_0=1+x^3+y^3$ と置き、$f_{0,y}\ne0$ の開集合で局所正則1形式を書け。
4. $U_0\cap U_1$ での形式の変換を計算し、代数的・解析的な標準束の比較と矛盾しないことを示せ。

<!-- solution-start -->
**詳細解答。** 斉次偏微分は $3X_0^2,3X_1^2,3X_2^2$ で、共通零点は原点のみだが射影空間に原点はない。従って $X$ は滑らかである。$n=2,d=3$ を[代数的随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)へ代入して $K_X\simeq\mathcal O_X(3-2-1)=\mathcal O_X$。

$U_0$ では $df_0=3x^2dx+3y^2dy$。$y\ne0$ なら $f_{0,y}=3y^2$ は単元で、AG2-10の[局所随伴形式](../../AG/AG2-10/index.md#prop-ag2-10-local-residue)と整合する[本章の正則形式の局所構成](#prop-cag1-11-holomorphic-residue)により

$$
\eta_0=-\frac{dx}{3y^2}.
$$

もし $x\ne0$ も成り立てば $\eta_0=dy/(3x^2)$ であり、$3x^2dx+3y^2dy=0$ から両者が一致する。$U_1$ の $(w,v)=(1/x,y/x)$ では $f_1=x^{-3}f_0$、$dw\wedge dv=-x^{-3}dx\wedge dy$ なので

$$
\eta_1=\frac{-x^{-3}}{x^{-3}}\eta_0=-\eta_0.
$$

局所基底が $-1$ 倍になるのは座標順による符号で、$K_X\simeq\mathcal O_X$ と矛盾しない。[標準束の解析化比較](#thm-cag1-11-canonical-comparison)の下で、代数的な楔積と解析的な楔積は同じ変換をする。
<!-- solution-end -->

<a id="ex-cag1-11-c02"></a>
#### CAG1-11-C02 同じ局所公式を使えない場合
- Level: C

滑らかな平面四次曲線 $Y\subset\mathbb P^2_{\mathbb C}$ と、アフィン尖点 $Z=\{y^2-x^3=0\}\subset\mathbb C^2$ を比べる。$Y$ の標準束を求め、$Z$ ではなぜ同じ推論で「標準線束」を求められないか説明せよ。また局所的な正則形式の比較とGAGAを混同しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 滑らかな $Y$ は $n=2,d=4$ なので、[随伴公式](#thm-cag1-11-analytic-adjunction)から $K_{Y^{\mathrm{an}}}\simeq\mathcal O_{Y^{\mathrm{an}}}(1)$、代数側でも $K_Y\simeq\mathcal O_Y(1)$ である。$Y$ の各点でどれか一つの偏微分が単元なので局所残余形式が作れ、重なりでは $J/u$ に従って貼り合う。

一方 $Z$ の原点では $f_x=-3x^2=f_y=2y=0$。$df$ を基底の一部にするための可逆Jacobian小行列が存在しないから、$\Omega_Z^1$ は原点で局所自由階数1と扱えず、$\det\Omega_Z^1$ を上記の滑らかな標準**線束**とする議論は破綻する。これは「$d$ が異なるから」ではなく滑らかさを失ったためである。さらに $Y$ の局所微分の解析化比較は座標計算に由来し、任意の正則線束の代数化には別途[射影GAGAの圏同値](../CAG1-08/index.md#thm-cag1-08-projective-equivalence)が必要である。
<!-- solution-end -->

## 7. 次の問い

標準束が両側で一致することは確かめたが、曲線の種数は標準束の局所形式だけでは決まらない。次章では[連接層コホモロジーの比較](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を使い、代数的な $h^1(C,\mathcal O_C)$ と解析的な正則関数層のコホモロジーをつなぐ。
