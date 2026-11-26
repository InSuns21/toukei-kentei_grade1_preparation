# MQFC21 Wilson格子ゲージ測度

[MQFC19 の格子の群値辺接続](../MQFC19/index.md#def-mqfc19-link) は有限個の群元で接続を表し、[MQFC20 の格子の積Haar測度のゲージ不変性](../MQFC20/index.md#prop-mqfc20-product-gauge) はそれらに一様な確率分布を与えた。しかし独立な一様分布だけでは隣り合う辺の関係を指定できない。曲率の小さい配置を優先する重みを導入し、対称性を保った確率測度を作ろう。

## 1. 正方形の周回積から作用を作る

格子間隔 $a>0$、次元 $d\ge2$ の有限長方形格子を MQFC19 と同じ向きで取る。境界を越える辺を置かず、境界上の辺も積分する自由境界とする。正向き辺集合を $E_+$、基本正方形の集合を $P$ とし、各正方形を一度だけ数える。群はコンパクト部分群 $G\subset U(N)$、配置空間は $\mathcal U=G^{E_+}$ とする。

各 $p\in P$ の周回積 $U_p$ は、[格子の基本正方形と周回積](../MQFC19/index.md#def-mqfc19-plaquette) の規約に従い、後から通る辺を左に掛ける。平坦な配置では正方形を一周しても何も変わらない。そこで $U_p$ と単位行列の隔たりを測りたい。ユニタリ行列の共役転置を $\dagger$ と書き、行列の二乗ノルムを $\|M\|_{\mathrm F}^2=\operatorname{tr}(M^\dagger M)$（全成分の絶対値二乗の和）とする。

$$
\begin{aligned}
\|I-U_p\|_{\mathrm F}^2
&=\operatorname{tr}(2I-U_p-U_p^\dagger)\\
&=2N-2\operatorname{Re}\operatorname{tr}U_p.
\end{aligned}
$$

従って規格化した実トレースから非負の隔たりを作れる。各正方形の寄与を足して全体の重みを定める。

<a id="def-mqfc21-action"></a>

<!-- formal-statement-start -->
> **定義（Wilson格子作用）**
> 有限格子の正方形集合 $P$ とコンパクト行列群 $G\subset U(N)$ に対し、各配置 $U$ の正方形寄与 $s_p$ と総和 $H$ を

$$
s_p(U)=1-\frac1N\operatorname{Re}\operatorname{tr}U_p,
\qquad H(U)=\sum_{p\in P}s_p(U)
$$

> とする。実数 $\beta\ge0$ に対する Wilson格子作用は $S_\beta(U)=\beta H(U)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc21-action -->
**定義の確認**：一つの正方形と $G=U(1)$ を取る。下辺に $e^{i\theta}$、残りの正向き三辺に1を置き、逆向き辺は逆元で補う。全て絶対値1なので許された配置である。下辺から反時計回りに進むと $U_p=e^{i\theta}$。従って $H=1-\cos\theta$、$S_\beta=\beta(1-\cos\theta)$ である。例えば $\theta=0,\pi/2,\pi$ では作用はそれぞれ $0,\beta,2\beta$。同じ $\beta>0$ でも周回積が単位元から離れると作用が大きくなる。
<!-- definition-example-end -->

<a id="prop-mqfc21-action-invariance"></a>

<!-- formal-statement-start -->
> **命題（Wilson格子作用の不変性と有界性）**
> 上記の Wilson格子作用は正方形の向き・基点の選択および任意の頂点ゲージ変換に関して不変で、任意の配置に対して

$$
0\le H(U)\le2|P|
$$

> が成立する。$H(U)=0$ と全正方形で $U_p=I$ となることは同値である。
<!-- formal-statement-end -->

周回積は行列としては基点の枠に依存するが、実トレースは変わらない。また二乗ノルムの表示により、非負性と零点を同時に確認できる。

<!-- proof-start -->
### 証明

[基本正方形の共役変換と二経路比較](../MQFC19/index.md#prop-mqfc19-plaquette) により、基点を $x$ とする正方形のゲージ変換後の積は $g_xU_pg_x^{-1}$ である。トレースの巡回性から元のトレースに等しい。基点を一辺進めた場合、最初に通る辺を $V$、残りの積を $B$ とすると旧周回積は $BV$、新周回積は $VB=V(BV)V^{-1}$ なので同じ結論を得る。逆向きは [格子路の端点変換と逆路](../MQFC19/index.md#thm-mqfc19-path-covariance) により $U_p^{-1}=U_p^\dagger$。トレースが複素共役になるため実部は不変である。

上の二乗ノルム表示から $s_p\ge0$ であり、$s_p=0$ は全成分で $I-U_p=0$ と同値である。またユニタリ行列の各列は単位長なので各対角成分の絶対値は1以下。従って $\operatorname{Re}\operatorname{tr}U_p\ge-N$ であり $s_p\le2$。有限和を取れば上界を得る。非負な有限和が零になるのは全項が零のときに限る。
<!-- proof-end -->

## 2. 有限格子上の確率測度

各正向き辺に [正規化Haar積分](../MQFC20/index.md#prop-mqfc20-haar-transform) を用い、積確率測度を $\mu_0$ とする。作用の大きい配置を指数的に抑えるため、密度を $e^{-\beta H}$ に比例させる。全体の確率を1にする割り算が必要である。

<a id="def-mqfc21-measure"></a>

<!-- formal-statement-start -->
> **定義（Wilson格子ゲージ測度）**
> 自由境界の有限格子とコンパクト行列群 $G\subset U(N)$ に対し、正向き辺の積Haar確率測度を $\mu_0$、Wilson格子作用を $S_\beta$ とする。分配関数と確率測度を

$$
Z_\beta=\int_{\mathcal U}e^{-\beta H(U)}\,d\mu_0(U),
\qquad
d\mu_\beta(U)=\frac{e^{-\beta H(U)}}{Z_\beta}\,d\mu_0(U)
$$

> で与える（$\beta\ge0$）。可積分な複素関数 $f$ の期待値は $\langle f\rangle_\beta=\int f\,d\mu_\beta$ と書く。
<!-- formal-statement-end -->

<a id="thm-mqfc21-measure"></a>

<!-- formal-statement-start -->
> **定理（有限格子でのWilson測度の構成とゲージ不変性）**
> 上記の有限格子と群に対して

$$
0<e^{-2\beta|P|}\le Z_\beta\le1
$$

> であり、$\mu_\beta$ は確率測度となる。任意の頂点ゲージ変換 $g$ と $\mu_\beta$ 可積分な関数 $f$ について

$$
\langle f(g\cdot U)\rangle_\beta=\langle f(U)\rangle_\beta.
$$
<!-- formal-statement-end -->

作用の有界性で正規化が保証される。次に作用と基準測度の両方の不変性を使えば、重みを掛けた後も対称性が残る。

<!-- proof-start -->
### 証明

$H$ は有限個の群元の積・逆元・トレースの連続関数なので Borel 可測である。[Wilson格子作用の不変性と有界性](#prop-mqfc21-action-invariance) から

$$
e^{-2\beta|P|}\le e^{-\beta H(U)}\le1.
$$

$\mu_0$ の全質量が1なので積分して分配関数の上下界を得る。密度は正かつ可測で、全空間上の積分が $Z_\beta/Z_\beta=1$ だから確率測度である。

[格子の積Haar測度のゲージ不変性](../MQFC20/index.md#prop-mqfc20-product-gauge) を可積分な関数 $f(V)e^{-\beta H(V)}$ に適用する。$H(g\cdot U)=H(U)$ を使うと

$$
\begin{aligned}
\langle f(g\cdot U)\rangle_\beta
&=\frac1{Z_\beta}\int f(g\cdot U)e^{-\beta H(g\cdot U)}\,d\mu_0(U)\\
&=\frac1{Z_\beta}\int f(V)e^{-\beta H(V)}\,d\mu_0(V).
\end{aligned}
$$

これが元の期待値である。絶対値を取った関数に同じ変数変換を施せば、変換後も可積分であることが分かる。
<!-- proof-end -->

<!-- definition-example-start: def-mqfc21-measure -->
**定義の確認**：一つの正方形で $G=\{1,-1\}\subset U(1)$ とする。四本の正向き辺は各々二値なので $\mu_0$ は16配置に各 $1/16$ を与える。逆元は自身で、三辺を固定すれば最後の辺を二通りに変えて $U_p=1,-1$ を一度ずつ得る。従って各周回積に8配置ずつあり、

$$
Z_\beta=\frac{1+e^{-2\beta}}2,\qquad
\mu_\beta(U_p=-1)=\frac{e^{-2\beta}}{1+e^{-2\beta}}.
$$

各配置への確率は $1/(16Z_\beta)$ または $e^{-2\beta}/(16Z_\beta)$。どちらも正で、8個ずつ足せば1になる。実際に $\beta=0$ では元の一様分布に戻る。
<!-- definition-example-end -->

境界条件は測度の一部である。例えば一部の辺を値 $b_e\in G$ に固定するなら、自由辺だけに積Haar測度を入れ、同じ $H$ を固定値を含む配置上で計算する。上下界はそのまま成り立つ。一方、固定辺を動かすゲージ変換はその配置空間を保たない。固定辺 $e=(x,y)$ で $g_yb_eg_x^{-1}=b_e$ を満たす変換だけが同じ境界条件を保つ。例えば固定辺の値が $I$ なら両端の $g$ が等しい必要がある。自由境界と固定境界の対称性を混同しない。

## 3. 観測量と結合の変化

測度がゲージ不変でも、個別配置での辺の値が不変になるわけではない。[格子 Wilson loop の不変性](../MQFC19/index.md#thm-mqfc19-wilson-invariance) によって閉路 $\gamma$ の規格化トレース $W_\gamma$ はゲージ不変である。期待値は上の密度に $f=W_\gamma$ を入れて計算する。

一正方形の二値模型では

$$
\langle U_p\rangle_\beta
=\frac{1-e^{-2\beta}}{1+e^{-2\beta}}=\tanh\beta.
$$

各辺だけの平均は0でも、この四辺の積の平均は $\beta>0$ で正になる。実際、一つの頂点のゲージ変換を $-1$ とし、他頂点では1とすればその頂点に接する辺の符号が反転する。[有限格子でのWilson測度の構成とゲージ不変性](#thm-mqfc21-measure) により、その辺の平均は自身の負に等しい。四辺が独立なら積の期待値は個別平均の積0となるので、この例では相互作用が独立性を壊している。

$U(1)$ の一正方形でも同様に三辺を固定すれば残る辺のHaar積分が周回積のHaar積分になる。[正規化Haar積分の変数変換](../MQFC20/index.md#prop-mqfc20-haar-transform) を使って

$$
Z_\beta=\frac{e^{-\beta}}{2\pi}\int_0^{2\pi}e^{\beta\cos\theta}\,d\theta.
$$

平均の変化を調べるには、$\beta$ について分配関数を微分すればよい。

<a id="prop-mqfc21-derivative"></a>

<!-- formal-statement-start -->
> **命題（分配関数の微分と作用の平均）**
> 上記の有限格子Wilson測度について、$\beta>0$ で

$$
\frac{d}{d\beta}\log Z_\beta=-\langle H\rangle_\beta,\qquad
\frac{d^2}{d\beta^2}\log Z_\beta
=\langle H^2\rangle_\beta-\langle H\rangle_\beta^2\ge0.
$$

> さらに $\beta=0$ で右微分として成立する。
<!-- formal-statement-end -->

右辺の差は $H$ の分散である。従って結合を強める方向へ $\beta$ を増すと、平均の $H$ は増えない。

<!-- proof-start -->
### 証明

$0\le H\le2|P|$ なので、$\beta$ の任意の有界区間（負の実数も含めて密度の積分を延長する）で $e^{-\beta H}$ とその最初の二階微分は定数で一様に抑えられる。例えば $|\beta|\le R$ では第 $k$ 階微分の絶対値は $(2|P|)^ke^{2R|P|}$ 以下（$k=1,2$）。平均値の定理で差商にも同種の上界が付くため、確率測度 $\mu_0$ に関する優収束によって積分内で微分できる。従って

$$
Z_\beta'=-\int H e^{-\beta H}\,d\mu_0,\qquad
Z_\beta''=\int H^2e^{-\beta H}\,d\mu_0.
$$

$Z_\beta>0$ なので対数の微分は

$$
(\log Z_\beta)'=\frac{Z_\beta'}{Z_\beta},
\qquad
(\log Z_\beta)''=\frac{Z_\beta''}{Z_\beta}
-\left(\frac{Z_\beta'}{Z_\beta}\right)^2.
$$

[Wilson格子ゲージ測度](#def-mqfc21-measure) の密度を代入すると主張の等式を得る。最後の差は $\langle(H-\langle H\rangle_\beta)^2\rangle_\beta$ なので非負である。
<!-- proof-end -->

## 4. 滑らかな接続から作る配置の古典的展開

有限格子の定義だけで確率測度は構成できた。次はなぜこの作用を連続ゲージ理論に結び付けるのかを調べる。ここではコンパクト行列 Lie 群の滑らかな接続を固定し、その平行移動で辺を作る。場そのものを確率的に極限へ送る議論ではない。

局所表示で接続を $A=\sum_\mu A_\mu dx^\mu$ とする。各 $A_\mu$ は反Hermitian行列（$A_\mu^\dagger=-A_\mu$）である。[局所曲率公式](../../../幾何系/GBG/GBG10/index.md#thm-gbg10-local-formula) の成分表示は

$$
F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu+[A_\mu,A_\nu],
\quad [X,Y]=XY-YX.
$$

微分と交換子はいずれも反Hermitianなので $F_{\mu\nu}^\dagger=-F_{\mu\nu}$。周回積がこの曲率をどの次数で検出するかを計算する。

<a id="thm-mqfc21-classical"></a>

<!-- formal-statement-start -->
> **定理（Wilson格子作用の古典的展開）**
> コンパクトな長方形領域を含む開集合上に $C^2$ 級の反Hermitian行列値接続 $A$ があり、各辺の輸送を $V'=-A_\mu V$ の規約で作るとする。点 $x$ から正の $\mu,\nu$ 方向（$\mu<\nu$）へ順に進んで戻る一辺長 $a$ の正方形について、$a\to0$ で

$$
U_p=I-a^2F_{\mu\nu}(x)+O(a^3),
$$

$$
s_p(U)=\frac{a^4}{2N}\operatorname{tr}(F_{\mu\nu}^\dagger F_{\mu\nu})(x)+O(a^5).
$$

> 誤差は領域内の正方形に関して一様である。領域を $[0,L]^d$ とし $a=L/n$、$n\to\infty$ とする場合、

$$
a^{d-4}S_\beta(U)
\longrightarrow
\frac{\beta}{2N}\int_{[0,L]^d}
\sum_{\mu<\nu}\operatorname{tr}(F_{\mu\nu}^\dagger F_{\mu\nu})\,dx
$$

> が固定した $\beta\ge0$ について成立する。
<!-- formal-statement-end -->

辺に沿う輸送の二次までを求め、順番どおりに四行列を掛ける。一次項は全て打ち消され、二次項に曲率が現れる。作用については実トレースの四次まで直接展開する必要はなく、二乗ノルムの恒等式を使える。

<!-- proof-start -->
### 証明

正向き $\mu$ 辺の輸送 $V(t)$ は $V(0)=I$、$V'(t)=-A_\mu(x+t\hat\mu)V(t)$ を満たす（[MQFC19 の連続接続からの辺の構成](../MQFC19/index.md#def-mqfc19-link) の規約）。微分すると

$$
V''(t)=-(\partial_\mu A_\mu)V-A_\mu V'
=(A_\mu^2-\partial_\mu A_\mu)V.
$$

右辺の係数は辺上で評価する。$V'(0)=-A_\mu(x)$、$V''(0)=A_\mu(x)^2-\partial_\mu A_\mu(x)$。$A$ は $C^2$ で、その導関数はコンパクト領域上で有界である。$V$ はユニタリで有界、上の微分式から三階微分も一様に有界となるので Taylor の剰余は $O(a^3)$ となる。

点 $x$ で $X=A_\mu(x),Y=A_\nu(x)$ と略記する。下辺から順に通る四辺の輸送を $V_1,V_2,V_3,V_4$ とする。まず

$$
V_1=I-aX+\frac{a^2}{2}(X^2-\partial_\mu X)+O(a^3).
$$

第2辺は $x+a\hat\mu$ からの正向き $\nu$ 辺なので、そこでの $Y$ は $Y+a\partial_\mu Y+O(a^2)$。従って

$$
V_2=I-aY+a^2\left(\frac{Y^2-\partial_\nu Y}{2}-\partial_\mu Y\right)+O(a^3).
$$

第3辺は $x+a\hat\nu$ からの正向き $\mu$ 辺の逆である。$(I+aB+a^2C)^{-1}=I-aB+a^2(B^2-C)+O(a^3)$ は積を二次まで展開すれば確認できる。これと $X(x+a\hat\nu)=X+a\partial_\nu X+O(a^2)$ から

$$
V_3=I+aX+a^2\left(\frac{X^2+\partial_\mu X}{2}+\partial_\nu X\right)+O(a^3).
$$

第4辺は $x$ からの正向き $\nu$ 辺の逆なので

$$
V_4=I+aY+\frac{a^2}{2}(Y^2+\partial_\nu Y)+O(a^3).
$$

[格子路の輸送積](../MQFC19/index.md#def-mqfc19-path) の順序で $U_p=V_4V_3V_2V_1$。一次係数の和は $-X-Y+X+Y=0$。各辺の二次係数の和は

$$
X^2+Y^2-\partial_\mu Y+\partial_\nu X.
$$

異なる二辺の一次係数の積は、後の辺を左に置いて六項を足す。すなわち

$$
YX-X^2-XY-YX-Y^2+YX
=YX-XY-X^2-Y^2.
$$

両方を加えると $-\partial_\mu Y+\partial_\nu X+YX-XY=-F_{\mu\nu}$。よって周回積の主張を得る。

第1節で導いた二乗ノルム表示を使う。$I-U_p=a^2F_{\mu\nu}+O(a^3)$ なので

$$
\begin{aligned}
2N s_p
&=\operatorname{tr}((I-U_p)^\dagger(I-U_p))\\
&=a^4\operatorname{tr}(F_{\mu\nu}^\dagger F_{\mu\nu})+O(a^5).
\end{aligned}
$$

交差項は $O(a^5)$、誤差同士の積は $O(a^6)$。曲率も一様有界なので誤差は一様である。

各方向対の正方形数は $n^2(n+1)^{d-2}$。従って $a^{d-4}$ を掛けた誤差の総和は $O(a^{d-4}a^5a^{-d})=O(a)$。正方形の基点のうち全座標が $0,\ldots,n-1$ のものは各方向対につき $n^d$ 個であり、$a^d$ を掛けた曲率二乗の和は連続関数の Riemann 和である。残る基点は横方向の端面にあり、その個数は $n^2((n+1)^{d-2}-n^{d-2})=O(n^{d-1})$（$d=2$ では0）。有界な被積分関数に対する寄与は $O(a^dn^{d-1})=O(a)$ で消える。全方向対を足すと結論を得る。
<!-- proof-end -->

例えば $U(1)$ で二次元の $A_1=0,A_2=iBx_1$（実定数 $B$）なら $F_{12}=iB$。下辺と上辺の輸送は1、右辺は $e^{-iB(x_1+a)a}$、左辺は $e^{iBx_1a}$。積は $e^{-iBa^2}$ である。従って

$$
s_p=1-\cos(Ba^2)=\frac{B^2a^4}{2}+O(a^8),
$$

となり係数と符号が確認できる。

$d=4$ では $a^{d-4}=1$ となる。$G=SU(N)$ に対し反Hermitian曲率を用いた規約で連続作用を $g_0^{-2}\int\sum_{\mu<\nu}\operatorname{tr}(F_{\mu\nu}^\dagger F_{\mu\nu})$ と書くなら、格子側の係数は $\beta=2N/g_0^2$ で一致する。ここで $g_0>0$ は裸の結合定数であり、曲率に結合を含める別の規約とは係数の置き場所が異なる。

この展開は固定した滑らかな接続の配置に対するもの。確率測度の典型的な配置が一様に滑らかだとは言えないため、分配関数や相関の連続極限を導いたことにはならない。

## 5. 演習

### 演習 MQFC21-A1：作用の値と零点
- Level: A

一正方形、$G=SU(2)$ で周回積を $\operatorname{diag}(e^{it},e^{-it})$ とする。$s_p$ を計算し、零になる $t$ を求めよ。

<!-- solution-start -->
**詳細解答**：対角成分は絶対値1、積は1なので行列は $SU(2)$ に属する。[Wilson格子作用](#def-mqfc21-action) に代入するとトレースは $2\cos t$ なので $s_p=1-\cos t$。零になるのは $\cos t=1$、すなわち $t=2k\pi$（整数 $k$）。そのとき対角成分はいずれも1で $U_p=I$ となる。
<!-- solution-end -->

### 演習 MQFC21-A2：確率の比
- Level: A

一正方形、$G=\{1,-1\}$、$\beta=(\log3)/2$ のとき周回積が $-1$ となる確率と $Z_\beta$ を求めよ。

<!-- solution-start -->
**詳細解答**：四辺の16通りのうち8通りずつが各周回積を与える。$H=0,2$ なので重みは1と $e^{-2\beta}=1/3$。[Wilson格子ゲージ測度](#def-mqfc21-measure) の分配関数は $(1+1/3)/2=2/3$。負の周回積の確率は $(1/2)(1/3)/(2/3)=1/4$。
<!-- solution-end -->

### 演習 MQFC21-A3：定数を引いた作用
- Level: A

$S'_\beta=-\beta\sum_p\operatorname{Re}\operatorname{tr}U_p/N$ としたとき分配関数と測度はどう変わるか。

<!-- solution-start -->
**詳細解答**：[Wilson格子作用](#def-mqfc21-action) との差は $S'_\beta=S_\beta-\beta|P|$。従って $e^{-S'_\beta}=e^{\beta|P|}e^{-S_\beta}$ であり、分配関数は $Z'_\beta=e^{\beta|P|}Z_\beta$。密度の分子と分母で同じ定数が消えるので確率測度は全く同じである。
<!-- solution-end -->

### 演習 MQFC21-A4：固定境界の対称性
- Level: A

$G=U(1)$ の正方形の下辺の値を1に固定する。下辺の始点と終点のゲージ変換を $e^{i\alpha},e^{i\delta}$ とすると、固定条件を保つ必要十分条件は何か。

<!-- solution-start -->
**詳細解答**：[格子の頂点ゲージ変換](../MQFC19/index.md#def-mqfc19-vertex-gauge) で変換後の下辺は $e^{i\delta}1e^{-i\alpha}=e^{i(\delta-\alpha)}$。これが1に等しい条件は $\delta-\alpha\in2\pi\mathbb Z$。従って両端で同じ群元を選ぶ必要があり、それで十分である。他の辺が自由なら追加の固定条件はない。
<!-- solution-end -->

### 演習 MQFC21-B1：開いた辺の平均と相互作用
- Level: B

自由境界の一正方形、$G=\{1,-1\}$ について各辺の平均が零であることを示し、$\beta>0$ のとき四辺が独立でないことを証明せよ。

<!-- solution-start -->
**詳細解答**：辺の片方の端点だけに $-1$ のゲージ変換を置くと、対象の辺は符号反転し周回積は保存される。[有限格子でのWilson測度の構成とゲージ不変性](#thm-mqfc21-measure) により $\langle U_e\rangle_\beta=\langle-U_e\rangle_\beta$。従って0である。四辺の積は逆辺でも同じ値のため $U_p$ に等しい。8通りずつの重みから

$$
\langle U_p\rangle_\beta=\frac{1-e^{-2\beta}}{1+e^{-2\beta}}>0.
$$

独立なら積の平均は四つの個別平均の積0となる。矛盾するため独立ではない。
<!-- solution-end -->

### 演習 MQFC21-B2：二値模型の分散
- Level: B

一正方形の二値模型で $H$ の平均と分散を計算し、対数分配関数の微分公式と照合せよ。

<!-- solution-start -->
**詳細解答**：$q=e^{-2\beta}$ とおく。$H=2$ の確率は $q/(1+q)$、$H=0$ の確率は $1/(1+q)$。従って

$$
\langle H\rangle=\frac{2q}{1+q},\qquad
\langle H^2\rangle=\frac{4q}{1+q}.
$$

差を取ると分散は $4q/(1+q)^2$。一方 $Z=(1+q)/2$、$q'=-2q$ なので

$$
(\log Z)'=-\frac{2q}{1+q},\qquad
(\log Z)''=-\frac{2q'}{(1+q)^2}=\frac{4q}{(1+q)^2}.
$$

[分配関数の微分と作用の平均](#prop-mqfc21-derivative) の二つの式と一致する。
<!-- solution-end -->

### 演習 MQFC21-B3：非可換な定数接続
- Level: B

$G=SU(2)$、$A_1=X=\begin{pmatrix}0&i\\i&0\end{pmatrix}$、$A_2=Y=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ を定数とする。曲率と作用の先頭項を求めよ。

<!-- solution-start -->
**詳細解答**：両行列は共役転置が自身の負で、トレース零。従って指数はユニタリかつ行列式1になる（ここでは $X^2=Y^2=-I$ なので指数は $I\cos a-X\sin a$ などと直接計算できる）。定数なので [局所曲率公式](../../../幾何系/GBG/GBG10/index.md#thm-gbg10-local-formula) の微分項は零。行列積は

$$
XY=\begin{pmatrix}-i&0\\0&i\end{pmatrix},
\qquad
YX=\begin{pmatrix}i&0\\0&-i\end{pmatrix}.
$$

従って $F_{12}=[X,Y]=\operatorname{diag}(-2i,2i)$。$F_{12}^\dagger F_{12}=4I$、トレースは8である。[Wilson格子作用の古典的展開](#thm-mqfc21-classical) に $N=2$ を入れると $s_p=2a^4+O(a^5)$。定数接続でも非可換なら曲率は零とは限らない。
<!-- solution-end -->

### 演習 MQFC21-B4：開路の積分と固定境界
- Level: B

自由境界の有限格子、$G=U(1)$ で、異なる二頂点を結ぶ路の輸送積の期待値が零になることを示せ。両端の枠を固定した場合にも同じ証明が使えるか。

<!-- solution-start -->
**詳細解答**：[格子路の端点変換と逆路](../MQFC19/index.md#thm-mqfc19-path-covariance) により始点 $x$、終点 $y$ の輸送積 $T$ は $g_yTg_x^{-1}$ に変わる。$g_y=-1$、他頂点1を選べば $x\ne y$ なので $-T$ となる。$|T|=1$ で可積分であり、[有限格子でのWilson測度の構成とゲージ不変性](#thm-mqfc21-measure) から $\langle T\rangle=-\langle T\rangle$。従って0である。両端の枠を固定して $g_x=g_y=1$ の変換のみ許す場合には $g_y=-1$ を選べず、同じ符号反転の証明は使えない。例えば全辺を1に固定すれば $T=1$ である。
<!-- solution-end -->

### 演習 MQFC21-C1：隣接二正方形と分配関数
- Level: C

自由境界で横に二つ並んだ正方形を考え、群を $\{1,-1\}$ とする。共有辺を $v$、左右それぞれの外側三辺の積を $l,r$ と書く。周回積 $p=lv,q=rv$ の同時分布、分配関数、外周の積の期待値を求めよ。さらに格子の辺変数が独立であるとの主張を検討せよ。

<!-- solution-start -->
**詳細解答**：正向き辺は7本で、積Haar測度は $2^7$ 通りに等しい確率を割り当てる。共有辺 $v$ を固定すると、左右の外側の辺は別々である。各三辺の積は二辺を自由に選んで最後の辺を決められるので、$l$ の各符号は4通り、$r$ の各符号も4通り。固定した $(p,q)$ には $l=pv,r=qv$ が必要十分である。$v$ の二通りを合わせると $2\cdot4\cdot4=32$ 配置となり、基準測度での $(p,q)$ の確率は $32/128=1/4$。

作用は [Wilson格子作用](#def-mqfc21-action) により $H=2-p-q$。$w=e^{-2\beta}$ とすれば周回積一個の重みは正なら1、負なら $w$。従って

$$
Z_\beta=\frac{1+2w+w^2}{4}=\frac{(1+w)^2}{4}.
$$

$p,q$ がともに正の確率は $1/(1+w)^2$、異符号の各確率は $w/(1+w)^2$、ともに負の確率は $w^2/(1+w)^2$。それぞれ一個の周回積の確率の積になっており、この設定では二つの周回積は独立である。

外周の積は $lr$ であり、$pq=lv\,rv=lr$（$v^2=1$）に一致する。従って

$$
\langle lr\rangle_\beta
=\frac{1-2w+w^2}{(1+w)^2}
=(\tanh\beta)^2.
$$

しかし各辺の平均は頂点一箇所での符号反転と [Wilson測度のゲージ不変性](#thm-mqfc21-measure) から零である。もし辺が全て独立なら、左側の四辺の積の平均も零でなければならない。実際には $\langle p\rangle_\beta=(1-w)/(1+w)>0$（$\beta>0$）なので矛盾する。周回積の独立性は辺の独立性とは異なる。外周期待値の面積依存は、この境界条件を持つ二値の二次元模型において得た結果である。
<!-- solution-end -->

## 6. 次の講義

有限格子でWilson測度が存在しゲージ不変であることを示した。次の MQFC22 では、通常の確率測度としての正値性より強い、時間反射を用いた反射陽性を調べる。これは確率測度の存在だけでは従わない性質である。
