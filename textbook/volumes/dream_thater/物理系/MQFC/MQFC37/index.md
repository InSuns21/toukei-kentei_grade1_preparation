# MQFC37 汎関数微分と局所汎関数

[結合定数の形式展開](../MQFC31/index.md#def-mqfc31-formal-coupling)では相互作用の挿入回数を数えた。しかし、何を一回の挿入とするかを場の関数として指定しなければ、挿入を微分して新しい観測量を作ることはできない。本講では、場を少し変えたときの観測量の変化を計算し、その係数が時空上の分布になる理由を調べる。

時空は $M=\mathbb R^4$、計量は $(-,+,+,+)$、体積要素は $d^4x$ とする。実スカラー場は滑らかな実関数 $\phi\in C^\infty(M,\mathbb R)$ とし、運動方程式はまだ課さない。以下では有限階の導関数の多項式を積分した汎関数と、その有限和・積を主に扱う。

## 1. 場を変化させる

数値関数 $p(u)$ の微分では $u$ を $u+th$ に変える。場の場合は $h$ が数ではなく時空上の滑らかな関数になる。例えば、滑らかなコンパクト支持関数 $f$ に対して

$$
L_f(\phi)=\int_M f(x)\phi(x)\,d^4x
$$

は場全体を受け取り一つの実数を返す。このような写像を汎関数として扱う。$\phi$ 自体にコンパクト支持を要求しなくても、$f$ の台がコンパクトだから積分できる。

一つの方向に沿った微分だけでなく、複数の方向を独立に動かす。[多重線形写像](../../../計算系/TSP/TSP1/index.md#def-tsp1-multilinear-map) の条件は、一つの入力以外を固定するとその入力について線形になることである。ここでは方向ごとにこの条件を課す。高階の微分の値を、多点の分布で記録したい。

$t_1,\ldots,t_n$ は場を変化させる実数パラメータであり、時空の時間座標とは別である。$\partial_{t_j}$ は基点と全方向を固定して第 $j$ パラメータだけを微分し、$t=0$ は全パラメータを零に戻すことを表す。一方向では通常の一変数微分 $d/dt_1$ と一致する。

$C_c^\infty$ は滑らかなコンパクト支持の試験関数の空間、$\mathcal D'$ は試験関数への連続線形作用である [分布（超関数）](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-distribution) の空間である。場そのものの空間とは区別する。独立な時空変数ごとに方向関数を掛けた分離積を

$$
(h_1\otimes\cdots\otimes h_n)(x_1,\ldots,x_n)
=\prod_{j=1}^n h_j(x_j)
$$

と書く。分布核は、この試験関数への作用によって方向微分を記録する分布である。

<a id="def-mqfc37-functional-derivative"></a>

<!-- formal-statement-start -->
> **定義（汎関数微分）**
> $E=C^\infty(M,\mathbb R)$、$F:E\to\mathbb R$、整数 $n\ge1$ とする。任意の $\phi,h_1,\ldots,h_n\in E$ に対する混合微分

$$
D^nF(\phi)[h_1,\ldots,h_n]
=\left.\partial_{t_1}\cdots\partial_{t_n}
F\left(\phi+\sum_{j=1}^nt_jh_j\right)\right|_{t=0}
$$

> を考える。すべての階数で微分が存在し、方向について多重線形で、基点と方向について共同連続であるものを本講で滑らかな汎関数として扱う。$E$ の収束は各コンパクト集合上で全階の導関数が一様収束することを意味する。分布 $K_n(\phi)\in\mathcal D'(M^n)$ が存在して

$$
D^nF(\phi)[h_1,\ldots,h_n]
=\langle K_n(\phi),h_1\otimes\cdots\otimes h_n\rangle
\quad(h_j\in C_c^\infty(M))
$$

> を満たすとき、これを第 $n$ 汎関数微分の分布核とし、$F^{(n)}(\phi)$ と表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc37-functional-derivative -->
### 直接例：線形の観測量

$L_f(\phi+th)=L_f(\phi)+tL_f(h)$ なので

$$
DL_f(\phi)[h]=\int_M f(x)h(x)\,d^4x,
\qquad D^nL_f(\phi)=0\quad(n\ge2).
$$

**定義の確認**。微分は全階で存在し、一次は方向に線形で、二次以上は零の多重線形写像である。$K=\operatorname{supp} f$ とすれば

$$
|DL_f(\phi)[h]|
\le \left(\int_K|f|\,d^4x\right)\sup_K|h|.
$$

従って指定した収束に関して共同連続である。一次の核は滑らかな密度 $f$ であり、試験関数への作用は上の積分そのものになる。二次以上の核は零分布である。
<!-- definition-example-end -->

[分布のテンソル積](../../../解析系/MICA/MICA6/index.md#def-mica6-tensor-product) の構成で用いた分離積の有限和の稠密性は、多点の場合にも一変数群ずつ分けて適用できる。二つの核の差がすべての分離積に零を与えれば、その有限和にも零を与え、試験関数位相で近似して連続性を使えば任意の試験関数にも零を与える。従って分布核が存在すれば一意である。本講では一般の核の存在定理に頼らず、扱う汎関数の核を具体的に構成する。

## 2. 局所的な相互作用とその台

例えば四次の相互作用を場の値だけから作るとき、結合定数を除いた一回の挿入は

$$
V_f(\phi)=\frac1{4!}\int_M f(x)\phi(x)^4\,d^4x
$$

となる。$f$ を使って相互作用を入れる領域を制御する。より一般に場の有限階の導関数を同じ時空点で組み合わせることもできる。これと、離れた二点の値を同時に掛ける観測量を区別したい。

座標を $x=(x^0,x^1,x^2,x^3)$、$x^0=t$ とし、$\partial_\mu=\partial/\partial x^\mu$ と書く。[多重指数](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha=(\alpha_0,\ldots,\alpha_3)$ は各座標での微分回数を表し、

$$
|\alpha|=\sum_{\mu=0}^3\alpha_\mu,\qquad
\partial^\alpha=\partial_0^{\alpha_0}\cdots\partial_3^{\alpha_3}
$$

とする。$\alpha=0$ のときは微分しない。場の値を含めて同じ点の $r$ 階以下の偏導関数を並べた組を $j^r\phi(x)$ と書く。これを多項式の独立変数 $z_\alpha$ の値として代入する。

<a id="def-mqfc37-local-functional"></a>

<!-- formal-statement-start -->
> **定義（局所汎関数）**
> $r$ を非負整数とし、$j^r\phi(x)=(\partial^\alpha\phi(x))_{|\alpha|\le r}$ とする。$P(x,z)$ は有限個の実変数 $z_\alpha$ の多項式で、係数は $x\in M$ の滑らかな関数とする。$f\in C_c^\infty(M,\mathbb R)$ に対し

$$
F(\phi)=\int_M f(x)P(x,j^r\phi(x))\,d^4x
$$

> の形の汎関数を本講で扱う多項式型の局所汎関数とする。$j^r\phi$ は同一点における $r$ 階以下の偏導関数の組である。より一般の滑らかな密度を許す局所汎関数のうち、この多項式型を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc37-local-functional -->
### 直接例：四次相互作用と導関数を含む密度

**定義の確認**。$V_f$ は $r=0$、$P(x,z)=z_{(0,0,0,0)}^4/24$ であり、実係数の多項式を同一点で評価している。$f$ は滑らかでコンパクト支持なので全ての場に対して積分が有限になる。

また $r=1$、$P(x,z)=z_{(1,0,0,0)}^2/2$ とすれば時間方向の偏導関数の二乗を積分する汎関数になる。四座標を $(t,x^1,x^2,x^3)$ の順に数えているため、この成分は $\partial_t\phi$ である。別の点の値は入力していない。これは時間微分だけを選んだ模型であり、Lorentz 不変な作用全体ではない。
<!-- definition-example-end -->

場の値がどこで変われば観測量に影響するかも定めよう。関数の台と違って汎関数には時空変数が表に出ていないため、方向を局所化して判定する。

<a id="def-mqfc37-functional-support"></a>

<!-- formal-statement-start -->
> **定義（汎関数の台）**
> $F:E\to\mathbb R$ に対し、点 $x\in M$ が $\operatorname{supp}F$ に属するとは、$x$ の任意の開近傍 $U$ に対し $\phi\in E$ と $h\in C_c^\infty(U)$ が存在して

$$
F(\phi+h)\ne F(\phi)
$$

> となることである。$\operatorname{supp}F$ がコンパクトである汎関数をコンパクト支持汎関数とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc37-functional-support -->
### 直接例：線形の観測量の台

**定義の確認**。$L_f$ について $\operatorname{supp}L_f=\operatorname{supp}f$ を定義から確かめる。$x$ が右辺に入らないなら $f$ が零となる開近傍 $U$ があり、その内部で場を変えても積分差は零である。

逆に $x\in\operatorname{supp}f$ なら任意の開近傍 $U$ に $f(y)\ne0$ となる点 $y$ がある。その周囲で非負の滑らかなコンパクト支持関数 $\chi$ を選び、$\chi(y)>0$ として $h=\chi f$ と置くと

$$
L_f(\phi+h)-L_f(\phi)=\int_M\chi(x)f(x)^2\,d^4x>0.
$$

積分は非負で $y$ の近くで正になる。よって台の定義の両向きが成り立ち、コンパクト支持も確認できた。
<!-- definition-example-end -->

<a id="prop-mqfc37-local-additivity"></a>

<!-- formal-statement-start -->
> **命題（局所汎関数の加法性）**
> 上の多項式型局所汎関数 $F$ は滑らかであり、$\operatorname{supp}F\subset\operatorname{supp}f$ である。また $\phi,h,k\in E$ で $\operatorname{supp}h$ と $\operatorname{supp}k$ が交わらないなら

$$
F(\phi+h+k)=F(\phi+h)+F(\phi+k)-F(\phi).
$$
<!-- formal-statement-end -->

### 証明の見取り図

同一点では二つの変化のうち高々一方しか現れない。多項式の各係数はコンパクト集合上の有限階の導関数だけで決まるため、連続性もその集合で評価できる。

<!-- proof-start -->
### 証明

[局所汎関数](#def-mqfc37-local-functional) の定義に従い $K=\operatorname{supp}f$ と置く。各多重指数 $\alpha$ について

$$
\partial^\alpha\left(\phi+\sum_jt_jh_j\right)
=\partial^\alpha\phi+\sum_jt_j\partial^\alpha h_j.
$$

これを $P$ に代入すると $t_j$ の有限多項式になる。$t_1\cdots t_n$ の係数を積分すれば混合微分が得られる。各項では各方向が一度ずつ現れるので多重線形で、混合微分は対称である。

各積分の絶対値は、係数と $f$ の $K$ 上の上限、$K$ の体積、および有限個の $\sup_K|\partial^\alpha\phi|$ と $\sup_K|\partial^\beta h_j|$ の積で抑えられる。収束列ではこれらの導関数は一様に収束し有界だから、積の差を一因子ずつ取り替えれば積も一様に収束する。積分も収束するので共同連続性が得られる。

$x\notin K$ なら $K$ と交わらない開近傍 $U$ がある。$h\in C_c^\infty(U)$ なら $h$ と全導関数は $K$ の近くで零になるので $F(\phi+h)=F(\phi)$。従って [汎関数の台](#def-mqfc37-functional-support) の定義から $\operatorname{supp}F\subset K$ である。台の外の点にはどの方向変化にも応答しない開近傍があり、その近傍内の点も台の外にある。従って台の補集合は開集合であり、台は閉集合である。コンパクト集合 $K$ の閉部分集合なのでコンパクトである。

最後に $\operatorname{supp}h\cap\operatorname{supp}k=\varnothing$ とする。任意の点 $x$ で少なくとも一方の台を含まない開近傍が存在する。例えば $x\notin\operatorname{supp}k$ なら $j^rk(x)=0$ である。その点では

$$
P(x,j^r(\phi+h+k)(x))=P(x,j^r(\phi+h)(x)),
$$

$$
P(x,j^r(\phi+k)(x))=P(x,j^r\phi(x)).
$$

二つの式を合わせれば加法性の被積分関数の等式となる。$x\notin\operatorname{supp}h$ の場合も、$j^rh(x)=0$ を代入すると左辺が $P(x,j^r(\phi+k)(x))$、右辺の第一項と第三項が相殺される。全点で成立するから積分して結論を得る。
<!-- proof-end -->

加法性は局所性の必要条件として使える。例えば $H=L_fL_g$ とし、$f,g$ は互いに素な台を持つ非零の実試験関数とする。$h=f,k=g$ とすると

$$
H(h+k)-H(h)-H(k)+H(0)
=\left(\int_M f^2\right)\left(\int_M g^2\right)>0.
$$

ここでは交差積分 $\int fg=0$ を使った。$H$ はコンパクトな領域の場だけに依存するが、一つの局所密度を積分した形にはならない。コンパクト支持と局所性は別の性質である。

## 3. 局所汎関数の微分を多点分布で書く

四次相互作用を二度微分すると二つの方向 $h_1,h_2$ が同じ点で掛け合わされる。二点の独立な変数を用いる分布でこの操作を表すと、[挿入点の配置空間と衝突対角](../MQFC31/index.md#def-mqfc31-collision) の全対角に集中する。

以下で $\partial_{x_j}^{\alpha_j}$ は第 $j$ 点の四座標だけを微分する演算子であり、$\partial/\partial z_\alpha$ は多項式の一つの独立変数だけを微分する演算子である。対角への代入は独立変数の微分をすべて済ませてから行う。

<a id="prop-mqfc37-diagonal-derivatives"></a>

<!-- formal-statement-start -->
> **命題（局所微分核の対角表示）**
> $F$ を前節の多項式型局所汎関数とする。整数 $n\ge1$ と多重指数の組 $\boldsymbol\alpha=(\alpha_1,\ldots,\alpha_n)$（各 $|\alpha_i|\le r$）に対し

$$
a_{\boldsymbol\alpha}(x)
=f(x)\frac{\partial^n P}{\partial z_{\alpha_1}\cdots\partial z_{\alpha_n}}
(x,j^r\phi(x))
$$

> と置く。このとき第 $n$ 微分の分布核は任意の $\psi\in C_c^\infty(M^n)$ に対し

$$
\langle F^{(n)}(\phi),\psi\rangle
=\sum_{\boldsymbol\alpha}\int_M a_{\boldsymbol\alpha}(x)
(\partial_{x_1}^{\alpha_1}\cdots\partial_{x_n}^{\alpha_n}\psi)(x,\ldots,x)\,d^4x
$$

> で与えられる。核の台は

$$
\{(x,\ldots,x):x\in\operatorname{supp}f\}
$$

> に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

多項式を方向ごとに微分すると、各方向の偏導関数が一つずつ現れる。それらの積は、独立変数を持つ試験関数の偏導関数を最後に対角へ代入したものと一致する。

<!-- proof-start -->
### 証明

$z_\alpha(t)=\partial^\alpha\phi(x)+\sum_jt_j\partial^\alpha h_j(x)$ とする。ここで $x$ を固定すると $\partial_{t_j}z_\alpha(t)=\partial^\alpha h_j(x)$ である。$P_{z_\alpha}$ は $\partial P/\partial z_\alpha$ の略記であり、一次の連鎖律は

$$
\partial_{t_1}P(x,z(t))
=\sum_{|\alpha_1|\le r}
P_{z_{\alpha_1}}(x,z(t))\partial^{\alpha_1}h_1(x).
$$

さらに $t_2$ で微分すると $\partial^{\alpha_1}h_1$ は $t$ に依存しないので

$$
\partial_{t_2}\partial_{t_1}P(x,z(t))
=\sum_{\alpha_1,\alpha_2}
P_{z_{\alpha_2}z_{\alpha_1}}(x,z(t))
\partial^{\alpha_1}h_1(x)\partial^{\alpha_2}h_2(x).
$$

同じ操作を繰り返す帰納法では、既に出た方向の因子は定数であり、残る $P$ の導関数を $t_{j+1}$ で微分するたびに $\alpha_{j+1}$ の和と方向因子が一つ加わる。$t=0$ として積分すれば [汎関数微分](#def-mqfc37-functional-derivative) は

$$
D^nF(\phi)[h_1,\ldots,h_n]
=\sum_{\boldsymbol\alpha}\int_M a_{\boldsymbol\alpha}(x)
\prod_{j=1}^n\partial^{\alpha_j}h_j(x)\,d^4x.
$$

ここで積分と微分の交換は有限多項式の係数を積分する操作であり、無限和の交換を含まない。

命題の右辺は $\psi$ に線形である。$K=\operatorname{supp}f$、$K_\Delta=\{(x,\ldots,x):x\in K\}$ と置く。$K_\Delta$ はコンパクトで、

$$
|\langle F^{(n)}(\phi),\psi\rangle|
\le \sum_{\boldsymbol\alpha}\|a_{\boldsymbol\alpha}\|_{L^1}
\sup_{K_\Delta}|\partial_{x_1}^{\alpha_1}\cdots\partial_{x_n}^{\alpha_n}\psi|.
$$

右辺は有限個の導関数の上限であるため、試験関数の固定台上の全導関数の一様収束に対して連続になる。よって分布を定める。$\psi=h_1\otimes\cdots\otimes h_n$ とすれば各偏導関数は対応する $h_j$ のみに作用するので上の混合微分に一致する。分布核の一意性からこの分布が求める核となる。$\psi$ が $K_\Delta$ と交わらない台を持つならその近くで全導関数が零なので作用も零。これが台の包含を示す。
<!-- proof-end -->

具体的に $V_f$ の一次から四次の微分を求める。$u^4/24$ の微分係数は $u^3/6,u^2/2,u,1$ となる。したがって $1\le n\le4$ では

$$
\langle V_f^{(n)}(\phi),\psi\rangle
=\int_M \frac{f(x)\phi(x)^{4-n}}{(4-n)!}
\psi(x,\ldots,x)\,d^4x.
$$

五次以上は零である。ここで全対角上の積分を表す分布 $\Delta_n$ を導入する。任意の試験関数に対し

$$
\langle\Delta_n,\psi\rangle=\int_M\psi(x,\ldots,x)\,d^4x
$$

と定める。試験関数の台の対角への逆像はコンパクトで、固定台のもとでは積分はその逆像の体積と $\sup|\psi|$ の積で抑えられるので分布となる。二点の場合は $\Delta_2=\delta^{(4)}(x-y)$ と書く。$y$ についての点デルタの作用が $\psi(x,x)$ になるためである。例えば $n=2$ の場合の記号表示は

$$
V_f^{(2)}(\phi)(x,y)
=\frac12 f(x)\phi(x)^2\delta^{(4)}(x-y).
$$

この等式は通常の関数としての等式ではなく、上の試験関数に対する作用を意味する。導関数を含まない場合の一次核は滑らかなコンパクト支持関数になる。導関数がある場合も一次核は滑らかである。実際、$n=1$ の式で各項を部分積分すると

$$
F^{(1)}(\phi)=\sum_{|\alpha|\le r}(-1)^{|\alpha|}
\partial^\alpha a_\alpha.
$$

境界項が零なのは $a_\alpha$ がコンパクト支持を持つためである。

## 4. 対角に集中しても許される波面方向

対角に集中する分布が出たので、次の講義で伝播関数と組み合わせるためには、特異な方向を知らなければならない。[波面集合](../../../解析系/MICA/MICA3/index.md#def-mica3-wavefront) は、位置と局所Fourier変換が急減少しない非零の周波数方向の組である。

全対角 $D_n=\{(x,\ldots,x):x\in M\}$ は閉じた線形部分空間で、接方向は $(v,\ldots,v)$ である。これは曲線 $s\mapsto(x+sv,\ldots,x+sv)$ を微分して得られる。余ベクトル $(k_1,\ldots,k_n)$ の接方向への評価は

$$
\sum_{j=1}^nk_j(v)=\left(\sum_{j=1}^nk_j\right)(v).
$$

任意の $v\in\mathbb R^4$ に対して零となることは $\sum_jk_j=0$ と同値である。[余法束の局所座標と自然性](../../../解析系/MICA/MICA5/index.md#prop-mica5-conormal-coordinates) に従い、これが全対角の余法束の条件になる。

<a id="thm-mqfc37-local-wavefront"></a>

<!-- formal-statement-start -->
> **定理（局所微分核の波面集合評価）**
> $F$ を多項式型局所汎関数、$\phi$ を滑らかな場とする。$F^{(1)}(\phi)$ の波面集合は空であり、整数 $n\ge2$ に対し

$$
WF(F^{(n)}(\phi))
\subset
\left\{(x,\ldots,x;k_1,\ldots,k_n):
\sum_{j=1}^nk_j=0,\ (k_1,\ldots,k_n)\ne0\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず全対角上の積分を一つの分布として扱う。その波面集合は余法方向だけにある。滑らかな係数との積と分布微分を繰り返しても、新しい波面方向は生まれない。

<!-- proof-start -->
### 証明

一次核は前節の部分積分表示によって滑らかなので、[波面集合の射影と特異支持](../../../解析系/MICA/MICA3/index.md#thm-mica3-projection) により波面集合は空である。$n\ge2$ では前節の全対角分布 $\Delta_n$ を用いる。全対角は閉じた埋め込み部分多様体である。実際、座標変換 $(x_1,\ldots,x_n)\mapsto(x_1,x_2-x_1,\ldots,x_n-x_1)$ は線形で、逆は第1点に各差を足す操作である。全対角は差がすべて零となる集合であり、次元は $4$、周囲の次元 $4n$ より小さい。その座標 $x$ から入る体積 $d^4x$ は滑らかな正の密度、周囲の基準密度は $d^{4n}x$ である。[部分多様体デルタの波面集合](../../../解析系/MICA/MICA5/index.md#thm-mica5-submanifold-delta) をこれらに適用すると、前述の接方向の消滅条件から

$$
WF(\Delta_n)
=\{(x,\ldots,x;k_1,\ldots,k_n):
\textstyle\sum_j k_j=0,\ (k_1,\ldots,k_n)\ne0\}.
$$

$a_{\boldsymbol\alpha}(x)$ を $M^n$ 上の滑らかな関数 $a_{\boldsymbol\alpha}(x_1)$ に延長する。[局所微分核の対角表示](#prop-mqfc37-diagonal-derivatives) の各項は

$$
(-1)^{\sum_j|\alpha_j|}
\partial_{x_1}^{\alpha_1}\cdots\partial_{x_n}^{\alpha_n}
\big(a_{\boldsymbol\alpha}(x_1)\Delta_n\big)
$$

である。[分布微分の定義](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative) により試験関数側に移すと一階ごとにマイナスを生じるので、前の符号と相殺して命題の作用を再現する。[滑らかな係数との積](../../../解析系/MICA/MICA3/index.md#thm-mica3-smooth-multiplier) で $WF(a_{\boldsymbol\alpha}\Delta_n)\subset WF(\Delta_n)$。[微分による波面集合の非増大](../../../解析系/MICA/MICA3/index.md#thm-mica3-derivative) により各偏微分後もこの包含を保つ。最後に [和の波面集合の包含](../../../解析系/MICA/MICA3/index.md#prop-mica3-sum) を有限回適用すれば、和である微分核にも同じ包含が成立する。
<!-- proof-end -->

例えば $\phi=1$ における $V_f^{(2)}$ は $f(x)\Delta_2/2$ である。$f(x)\ne0$ の近傍では $2/f$ という滑らかな逆係数を掛けて $\Delta_2$ を回復できるので、波面方向はちょうど $(k,-k)$（$k\ne0$）となる。一方 $f$ が近傍で零なら核もその近傍で零である。

## 5. 未来・過去方向だけの組を除く

波面方向には時空の因果構造が関係する。共変ベクトルを座標表示 $k=(k_0,\boldsymbol k)$ と書き、本講では閉じた二つの錐を

$$
C_+=\{k:k_0\ge|\boldsymbol k|\},
\qquad C_-=-C_+
$$

と置く。$|\boldsymbol k|$ は空間三成分の Euclid ノルムである。零ベクトルも含める。$C_\pm^n$ は各成分がそれぞれ同じ錐に属する $n$ 個の余ベクトルの組を表す。ここで時刻成分の符号で錐の名前を選んだ。計量によるベクトルへの変換では時間成分の符号が逆になるが、以下の条件は二つの錐を同時に除くので命名の交換に依存しない。

全ての共変ベクトルが同じ錐に入る組では、非零なら時刻成分の和は零にならない。これを使って、相互作用の微分核に適した条件を置く。

<a id="def-mqfc37-microcausal"></a>

<!-- formal-statement-start -->
> **定義（マイクロ因果的汎関数）**
> $F:E\to\mathbb R$ を滑らかなコンパクト支持汎関数で、各階の微分の分布核が存在するものとする。全ての $\phi\in E$ と整数 $n\ge1$ について

$$
WF(F^{(n)}(\phi))\cap
\big(M^n\times(C_+^n\cup C_-^n)\big)=\varnothing
$$

> が成り立つとき、$F$ をマイクロ因果的汎関数とする。波面集合自身は全成分が零の余ベクトルを含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc37-microcausal -->
### 直接例：線形の観測量

**定義の確認**。$L_f$ は [汎関数微分の直接例](#def-mqfc37-functional-derivative) で滑らかさを確認し、[汎関数の台の直接例](#def-mqfc37-functional-support) でコンパクト支持を確認した。第1階の核は滑らかな $f$、高階の核は零なので全階で波面集合は空である。従って任意の $\phi$ と $n$ で上の交わりも空であり、マイクロ因果的である。
<!-- definition-example-end -->

<a id="prop-mqfc37-local-microcausal"></a>

<!-- formal-statement-start -->
> **命題（局所汎関数のマイクロ因果性）**
> 前節までの多項式型局所汎関数はマイクロ因果的である。
<!-- formal-statement-end -->

### 証明の見取り図

同一点への集中が作る特異方向は、全ての成分を足すと零になる。その一方で同じ向きの因果錐では、成分を足して零になることは全成分が零の場合に限られる。

<!-- proof-start -->
### 証明

[局所汎関数の加法性](#prop-mqfc37-local-additivity) で滑らかさとコンパクト支持を示し、[局所微分核の対角表示](#prop-mqfc37-diagonal-derivatives) で核の存在を示した。[局所微分核の波面集合評価](#thm-mqfc37-local-wavefront) から一次の波面集合は空であり、$n\ge2$ で波面集合に入る組は $\sum_jk_j=0$ を満たす。

もし全ての $k_j$ が $C_+$ に入るなら

$$
0=\sum_j k_{j0}\ge\sum_j|\boldsymbol k_j|\ge0.
$$

各 $\boldsymbol k_j$ は零となる。さらに各 $k_{j0}\ge0$ の和が零なので各 $k_{j0}=0$。従って全余ベクトルが零となり波面集合の条件に反する。全て $C_-$ に入る場合は $-k_j\in C_+$ に同じ議論を適用する。これで全階に対して [マイクロ因果的汎関数](#def-mqfc37-microcausal) の条件が成立した。
<!-- proof-end -->

点での評価 $E_a(\phi)=\phi(a)$ は対照的である。一次微分は $h(a)$、核は $\delta_a$ で、高階微分は零。台は $\{a\}$ であり、滑らかさは次の評価から従う。

$$
|h(a)|\le\sup_{\{a\}}|h|.
$$

しかし [点デルタの波面集合](../../../解析系/MICA/MICA4/index.md#prop-mica4-point-delta) は点 $a$ における全非零方向を含む。例えば $k=(1,0,0,0)$ が $C_+$ に入るため、この汎関数はマイクロ因果的でない。場を試験関数で平均することと、一点で取り出すことの差がここに現れる。

また滑らかな核を持つ非局所汎関数も許される。第2節の $H=L_fL_g$ では、一次核は $L_g(\phi)f+L_f(\phi)g$、二次核は $f\otimes g+g\otimes f$、高階核は零であり、全て滑らかである。

二つの実数値観測量の掛け算を微分すると、各方向に線形な式が得られる。第1節の上限評価をそれぞれの積分に適用すれば共同連続性を得る。台は $\operatorname{supp}f\cup\operatorname{supp}g$ に含まれるのでコンパクトである。よってマイクロ因果的だが局所的ではない。

次講では [Hörmanderの分布積の存在定理](../../../解析系/MICA/MICA6/index.md#thm-mica6-product-existence) とこの方向条件を用いて自由場の積を構成する。ここでは伝播関数との全ての収縮が存在するとはまだ主張していない。

## 6. 演習

### 演習 MQFC37-A1：三次相互作用を微分する
- Level: A

$f\in C_c^\infty(M)$ を実関数とし、$F(\phi)=\int f\phi^3/6$ の一次から四次の方向微分を求めよ。

<!-- solution-start -->
**詳細解答**

[汎関数微分](#def-mqfc37-functional-derivative) に従い $\phi+\sum_jt_jh_j$ を代入する。一次微分は $3\phi^2h_1/6$ の積分である。次に $\phi^2$ を $t_2$ で微分すると $2\phi h_2$、さらに $\phi$ を $t_3$ で微分すると $h_3$ となる。よって

$$
DF(\phi)[h_1]=\frac12\int f\phi^2h_1,
$$

$$
D^2F(\phi)[h_1,h_2]=\int f\phi h_1h_2,
$$

$$
D^3F(\phi)[h_1,h_2,h_3]=\int fh_1h_2h_3.
$$

各積分は $M$ 上の $d^4x$ に関する積分である。三次の式には $\phi$ が現れないので四次は零になる。
<!-- solution-end -->

### 演習 MQFC37-A2：微分核と対角
- Level: A

$F(\phi)=\int f\phi^2/2$（$f$ は実試験関数）とする。二次微分の核の作用を書き、試験関数が全対角を避けるときに零になることを示せ。

<!-- solution-start -->
**詳細解答**

$\phi+t_1h_1+t_2h_2$ の二乗を展開すると $t_1t_2$ の係数は $2h_1h_2$ なので、$1/2$ と相殺する。従って $D^2F[h_1,h_2]=\int fh_1h_2$ である。[局所微分核の対角表示](#prop-mqfc37-diagonal-derivatives) に $r=0,n=2$ を代入すると

$$
\langle F^{(2)},\psi\rangle=\int_M f(x)\psi(x,x)\,d^4x.
$$

試験関数の台が全対角と交わらないなら任意の $x$ で $\psi(x,x)=0$。積分が零となるので、分布の台は全対角に含まれる。
<!-- solution-end -->

### 演習 MQFC37-A3：錐と三点の波面方向
- Level: A

時刻成分だけを記して $(k_1,k_2,k_3)=((2,0,0,0),(-1,0,0,0),(-1,0,0,0))$ を考える。全対角の余法条件とマイクロ因果条件を調べよ。$k_2,k_3$ の時刻成分をそれぞれ $1$ に変えた場合も調べよ。

<!-- solution-start -->
**詳細解答**

最初の組は和が $(2-1-1,0,0,0)=0$ であり全体は非零である。よって全対角の余法条件を満たす。$k_1\in C_+$ だが $k_2,k_3\in C_-$ であるため、全てが同じ錐には入らない。[マイクロ因果的汎関数](#def-mqfc37-microcausal) の条件が排除する組ではない。

変更後は和が $(4,0,0,0)\ne0$ で余法条件を満たさず、全てが $C_+$ に入るため、この組が波面集合にあればマイクロ因果条件に違反する。
<!-- solution-end -->

### 演習 MQFC37-A4：点評価を平均する
- Level: A

非零の実試験関数 $f$ に対し $E_a(\phi)=\phi(a)$ と $L_f(\phi)=\int f\phi$ の一次核を求め、マイクロ因果性を比較せよ。

<!-- solution-start -->
**詳細解答**

場を $\phi+th$ に変えると一次係数はそれぞれ $h(a)$ と $\int fh$。したがって核は $\delta_a$ と $f$ である。両方とも線形なので二次以上は零になる。点評価の台は $\{a\}$（$a$ の近傍に $h(a)\ne0$ となる試験関数を取れるが、$a$ を避ける近傍では評価は変化しない）。$L_f$ の台は第2節の例から $\operatorname{supp}f$。一次微分は各台上の上限で評価できるので両者は滑らかである。

[点デルタの波面集合](../../../解析系/MICA/MICA4/index.md#prop-mica4-point-delta) には $(a;1,0,0,0)$ があり、$C_+$ に入る。点評価は条件を満たさない。一方、滑らかな $f$ の波面集合は空なので平均した観測量は全階の条件を満たす。
<!-- solution-end -->

### 演習 MQFC37-B1：時間微分を含む相互作用
- Level: B

$f\in C_c^\infty(M)$、$F(\phi)=\int f(\partial_t\phi)^2/2$ とする。一次微分の滑らかな核と二次微分の分布核を求め、二次核の符号を確認せよ。

<!-- solution-start -->
**詳細解答**

$\partial_t(\phi+sh)=\partial_t\phi+s\partial_th$ である。二乗を展開すると一次微分は

$$
DF(\phi)[h]=\int_M f(\partial_t\phi)(\partial_th)\,d^4x
=-\int_M\partial_t(f\partial_t\phi)h\,d^4x.
$$

$f\partial_t\phi$ はコンパクト支持で境界項が零なので、一次核は $-\partial_t(f\partial_t\phi)$ となる。これは滑らかである。$\phi+sh+uk$ を代入すると二乗の混合係数は $2(\partial_th)(\partial_tk)$ なので、二方向の混合微分では

$$
D^2F[h,k]=\int_M f(\partial_th)(\partial_tk)\,d^4x.
$$

[局所微分核の対角表示](#prop-mqfc37-diagonal-derivatives) から二次核は試験関数 $\psi$ に対して

$$
\int_M f(x)(\partial_{x^0}\partial_{y^0}\psi)(x,x)\,d^4x
$$

と作用する。従って記号表示は $\partial_{x^0}\partial_{y^0}(f(x)\Delta_2)$ である。ここで $x^0,y^0$ は二点の時間座標であり、場の変化パラメータ $s$ ではない。[分布微分の定義](../../../解析系/GPDE/GPDE2/index.md#def-gpde2-distributional-derivative) で二度試験関数へ移すと $(-1)^2=1$ となり、符号が正になる。三次以上は零である。[局所微分核の波面集合評価](#thm-mqfc37-local-wavefront) によれば二次核の波面方向は $(k,-k)$ に限られる。
<!-- solution-end -->

### 演習 MQFC37-B2：二点に広がる観測量
- Level: B

$f,g$ は互いに素な台を持つ非零の実試験関数とする。$H(\phi)=L_f(\phi)L_g(\phi)$ の一次核・二次核を求め、局所汎関数ではないがマイクロ因果的であることを示せ。

<!-- solution-start -->
**詳細解答**

$A=L_f(\phi),B=L_g(\phi)$ と書く。方向 $h$ に沿う展開は

$$
(A+sL_f(h))(B+sL_g(h))
=AB+s(BL_f(h)+AL_g(h))+s^2L_f(h)L_g(h).
$$

よって一次核は $Bf+Ag$。二方向 $h,k$ を入れれば混合係数は

$$
D^2H[h,k]=L_f(h)L_g(k)+L_f(k)L_g(h).
$$

二つの積分を別々の変数 $x,y$ で書けば二次核は $f(x)g(y)+g(x)f(y)$ である。三次以上は零。これらは滑らかで波面集合は空になる。各方向の積分は固定台上の上限で評価でき、積も共同連続である。台の外側の近傍で場を変えても二つの積分が変わらないので台は $\operatorname{supp}f\cup\operatorname{supp}g$ に含まれ、コンパクトである。従って [マイクロ因果的汎関数](#def-mqfc37-microcausal) の条件を満たす。

一方 $\phi=0,h=f,k=g$ では $L_f(g)=L_g(f)=0$、$H(f)=H(g)=H(0)=0$ だが

$$
H(f+g)=\left(\int f^2\right)\left(\int g^2\right)>0.
$$

[局所汎関数の加法性](#prop-mqfc37-local-additivity) に反するので、多項式型局所汎関数ではない。
<!-- solution-end -->

### 演習 MQFC37-B3：三次微分の余法方向
- Level: B

実試験関数 $f$ に対し $F(\phi)=\int f\phi^3/6$ とし、$f(a)\ne0$ とする。点 $(a,a,a)$ の上の三次核の波面集合を等号で求め、三成分すべてが未来側の錐に入れない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

三次の混合係数は $6h_1h_2h_3/6$ なので、[局所微分核の対角表示](#prop-mqfc37-diagonal-derivatives) により分布核は $f(x_1)\Delta_3$ である。三点対角の接方向は $(v,v,v)$。余ベクトルの評価は $(k_1+k_2+k_3)(v)$ なので全接方向を消す条件は $k_1+k_2+k_3=0$ である。[部分多様体デルタの波面集合](../../../解析系/MICA/MICA5/index.md#thm-mica5-submanifold-delta) より $\Delta_3$ の波面方向はこの和が零で全体が非零の組に一致する。

$f(a)\ne0$ だから $a$ の近くで $1/f$ は滑らかである。[滑らかな係数との積](../../../解析系/MICA/MICA3/index.md#thm-mica3-smooth-multiplier) を $f\Delta_3$ と、逆係数を掛けて戻した $\Delta_3$ の両方に適用すれば、点 $(a,a,a)$ で二つの波面集合は一致する。全て $k_j\in C_+$ なら

$$
0=\sum_j k_{j0}\ge\sum_j|\boldsymbol k_j|\ge0.
$$

よって空間成分は全て零、非負の時刻成分も全て零になる。全体が非零という条件に反する。
<!-- solution-end -->

### 演習 MQFC37-C1：コンパクト支持作用の微分
- Level: C

$m\ge0$、$\lambda\in\mathbb R$、$f\in C_c^\infty(M,\mathbb R)$ とし、$\eta^{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ とする。

$$
S_f(\phi)=\int_M f(x)
\left(\frac12\eta^{\mu\nu}\partial_\mu\phi\partial_\nu\phi
+\frac{m^2}{2}\phi^2+\frac{\lambda}{24}\phi^4\right)d^4x.
$$

繰り返し添字 $\mu,\nu$ は $0$ から $3$ の和を表す。この符号を採った作用について、以下を求めよ。

1. 一次核
2. 二次核の試験関数への作用
3. 三次・四次核
4. 台と波面条件

<!-- solution-start -->
**詳細解答**

(1) $\phi+sh$ を代入する。運動項で $s$ の係数を取り出すと

$$
\frac f2\sum_{\mu,\nu=0}^3\eta^{\mu\nu}
(\partial_\mu h\,\partial_\nu\phi+
\partial_\mu\phi\,\partial_\nu h).
$$

第一項の和で $\mu,\nu$ を交換すると第二項に一致する。これは $\eta^{\mu\nu}=\eta^{\nu\mu}$ だからである。従って運動項の一次係数は $f\eta^{\mu\nu}\partial_\mu\phi\,\partial_\nu h$ となる。質量項の一次係数は $fm^2\phi h$、四次項は $f\lambda\phi^3h/6$ である。運動項を $\nu$ 座標について部分積分すると

$$
S_f^{(1)}(\phi)
=-\partial_\nu(f\eta^{\mu\nu}\partial_\mu\phi)
+f(m^2\phi+\lambda\phi^3/6).
$$

係数 $f\eta^{\mu\nu}\partial_\mu\phi$ はコンパクト支持なので境界項は消える。特に $f=1$ となる開領域では第一項は $-\Box\phi$、$\Box=-\partial_t^2+\sum_{i=1}^3\partial_i^2$ である。

(2) $\phi+sh+uk$ を代入し、$s,u$ の混合係数を取る。$s,u$ は時空座標と独立である。運動項で生じる二項は

$$
\frac f2\eta^{\mu\nu}
(\partial_\mu h\,\partial_\nu k+\partial_\mu k\,\partial_\nu h).
$$

添字を交換して対称性を使うと運動項の混合係数は $f\eta^{\mu\nu}\partial_\mu h\,\partial_\nu k$、質量項は $fm^2hk$、四次項は $f\lambda\phi^2hk/2$ である。分離積に対するこの式を [局所微分核の対角表示](#prop-mqfc37-diagonal-derivatives) により一般の試験関数 $\psi(x,y)$ に拡張すると

$$
\langle S_f^{(2)}(\phi),\psi\rangle
=\int_M f(x)\left[
\eta^{\mu\nu}(\partial_{x^\mu}\partial_{y^\nu}\psi)(x,x)
+(m^2+\lambda\phi(x)^2/2)\psi(x,x)
\right]d^4x.
$$

この運動項を分布微分で表した場合、二階微分なので試験関数側の符号は正となる。

(3) 二次の方向微分のうち $\phi$ が残るのは $\lambda f\phi^2hk/2$ だけである。第三方向 $l$ で微分すると $\lambda f\phi hkl$、第四方向 $q$ で微分すると $\lambda f hklq$ となる。従って三次核と四次核はそれぞれ $\lambda f(x_1)\phi(x_1)\Delta_3$ と $\lambda f(x_1)\Delta_4$。五次以上は零である。

(4) $r=1$ の有限変数多項式を同一点で評価しているため [局所汎関数の加法性](#prop-mqfc37-local-additivity) で滑らかさと台の包含 $\operatorname{supp}S_f\subset\operatorname{supp}f$ が得られる。一次核は滑らかなので波面集合は空。二次から四次は滑らかな係数を掛けた全対角分布とその偏導関数の有限和である。[局所微分核の波面集合評価](#thm-mqfc37-local-wavefront) により特異方向は $\sum_jk_j=0$ に限られる。全ての $k_j$ が $C_+$ に属するなら時刻成分の和は零で各成分は非負、従って各時刻成分は零であり、錐の不等式から空間成分も零になる。$C_-$ も符号を反転して同じ結論を得る。ゆえに [局所汎関数のマイクロ因果性](#prop-mqfc37-local-microcausal) の結論が成り立つ。
<!-- solution-end -->

## 7. 次の講義

MQFC38「Peierls括弧と自由場の積」では、ここで作った微分核と自由場の Green 作用素を組み合わせ、場の観測量の括弧と量子的な積を定める。

## 8. 直接前提講座

- [MQFC31 相互作用をなぜ形式冪級数で扱うか](../MQFC31/index.md)
- [MICA6 分布の積](../../../解析系/MICA/MICA6/index.md)
- [TSP1 多重線形写像・テンソル積・基底表示と普遍性](../../../計算系/TSP/TSP1/index.md)
