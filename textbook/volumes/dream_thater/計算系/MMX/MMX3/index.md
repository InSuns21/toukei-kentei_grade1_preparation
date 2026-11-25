# MMX3 上下界の古典史：Biniの補間、Schönhage漸近和不等式、laser法・手法限定障壁の量化

[MMX2](../MMX2/index.md) では小さいテンソルの分解を繰り返して行列積の指数を評価しました。今回は、厳密な分解が短くならなくても近似的な分解を利用できる理由と、複数の行列積を一度に取り出すときの費用を調べます。最後に、特定の取り出し方の限界が一般の指数下界とどのように異なるかを確認します。

直接前提：[MMX2](../MMX2/index.md)、[ACOMP21](../../ACOMP/ACOMP21/index.md)、[ACOMP22](../../ACOMP/ACOMP22/index.md)。スペクトル点の計算には既習の [TSP11](../../TSP/TSP11/index.md)、[TSP12](../../TSP/TSP12/index.md)、[TSP14](../../TSP/TSP14/index.md) を使います。本講の補間は複素数体上で行い、漸近和不等式の証明は任意の体 $K$ で述べます。$M_{a,b,c}$ は [行列積テンソル](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication)、$M_n=M_{n,n,n}$ とします。$R_K(t)$ は体 $K$ 上の [テンソル階数](../../TSP/TSP2/index.md#def-tsp2-tensor-rank)、$\omega_K$ は [行列積指数](../../TSP/TSP14/index.md#def-tsp14-omega) です。体が文脈で定まるときは階数の添字 $K$ を省きます。

## 1. Biniの補間：誤差を係数として分離する

[境界階数](../../TSP/TSP8/index.md#def-tsp8-border-rank) は低階数のテンソルの集合の Zariski 閉包を利用します。ここでは具体的な多項式による近似が与えられる場合を考えます。極を許す形式的な計算と出力の正則性を区別する考え方は [回路の形式的退化](../../ACOMP/ACOMP22/index.md#def-acomp22-degeneration) と共通です。

三つの二次元空間の基底を $e_0,e_1$、$f_0,f_1$、$g_0,g_1$ とします。次の二項の差を考えます。

$$
P(z)=(e_0+ze_1)\otimes(f_0+zf_1)\otimes(g_0+zg_1)
-e_0\otimes f_0\otimes g_0.
$$

展開すると

$$
P(z)=zw+z^2h+z^3k,
$$

$$
w=e_1\otimes f_0\otimes g_0+
e_0\otimes f_1\otimes g_0+
e_0\otimes f_0\otimes g_1,
$$

$$
h=e_1\otimes f_1\otimes g_0+
e_1\otimes f_0\otimes g_1+
e_0\otimes f_1\otimes g_1,
\qquad k=e_1\otimes f_1\otimes g_1.
$$

$z\ne0$ なら $A(z)=P(z)/z=w+zh+z^2k$ は高々二項の分解を持ちます。$z^{-1}$ は [形式Laurent級数](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent) としては極を持ちますが、出力の係数に負の次数は残りません。テンソルの各基底係数は正則な多項式です。[定数項への特殊化](../../ACOMP/ACOMP21/index.md#thm-acomp21-specialization) を各係数に適用すると、定数項として $w$ が得られます。ただし $z=0$ を二項分解そのものに代入することはできません。実際、[三因子の階数と境界階数が異なる例](../../TSP/TSP8/index.md#thm-tsp8-w-border-rank) により $R_{\mathbb C}(w)=3$ です。

ここで $A(z)^{\boxtimes N}$ を作ります。[Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) は各因子位置をまとめる積です。各回で次数0、1、2のいずれかを選ぶので全次数は高々 $2N$、定数項は $w^{\boxtimes N}$ です。

[多項式の係数回収](../../TSP/TSP9/index.md#lem-tsp9-coefficient-recovery) により、相異なる非零の $2N+1$ 点での評価の線形結合からこの定数項を厳密に得られます。各点で二項の分解を $N$ 回展開するので高々 $2^N$ 項です。したがって

$$
R_{\mathbb C}(w^{\boxtimes N})\le(2N+1)2^N.
$$

一般の次数上界 $L$ と分解長上界 $r$ についての厳密な結果は [多項式退化による漸近階数上界](../../TSP/TSP9/index.md#thm-tsp9-degeneration-asymptotic) です。$t,h_j$ は同じ有限次元複素テンソル積空間の元、$L$ は非負整数、$r$ は正整数とします。上の定理で最低次数を0とした場合、$A(z)=t+\sum_{j=1}^L z^jh_j$ がすべての非零複素数 $z$ で $R(A(z))\le r$ を満たすなら、任意の正整数 $N$ について

$$
R(t^{\boxtimes N})\le(NL+1)r^N,\qquad
\widetilde R(t)\le r.
$$

ここで $\widetilde R$ は [漸近階数](../../TSP/TSP9/index.md#def-tsp9-asymptotic-rank) です。追加係数の対数を $N$ で割ると $\log(NL+1)/N\to0$ となります。近似の精度を数値的に高めるのではなく、冪を取った後で必要な係数を厳密に抽出するところが Bini の手法の要点です。有限体で任意個の相異なる評価点を直接選ぶことはできないため、ここでの補間の証明をそのまま有限体へ移してはいけません。

特に正方行列積 $t=M_b$（$b\ge2$）に対してこの分解を構成できれば、[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) により $\omega_{\mathbb C}\le\log_b r$ です。

## 2. 一つの資源から複数の行列積を取り出す

[テンソルの直和](../../TSP/TSP5/index.md#def-tsp5-direct-sum) では各因子を互いに独立な部分空間に分け、対応する三つの部分空間のテンソルだけを足します。[行列積テンソルの定義](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication) における三つの基底は添字対 $(i,j),(j,k),(i,k)$ で番号付けされるので、$M_{a,b,c}$ の各因子の次元は順に $ab,bc,ac$ です。例えば $M_{2,1,1}\oplus M_{1,2,1}$ は第1の積の左入力二成分、右入力一成分、出力二成分と、第2の積の左入力二成分、右入力二成分、出力一成分をそれぞれ別の座標に置きます。各因子の総次元は順に4、3、3です。片方の入力をもう片方と混ぜる項は存在しません。

各積の三つのサイズの積を $v=abc$ と書きます。これは通常の三重和に現れる項数です。二つの独立な積があるとき、それぞれの $v^{\omega_K/3}$ を足した量が、全体の漸近階数を超えないことを示します。

そのためには異なるサイズを同時に評価する一つの道具が必要です。[スペクトル点](../../TSP/TSP11/index.md#def-tsp11-spectral-point) はテンソルの制限同値類に非負実数を対応させ、直和を和、Kronecker積を積に移し、制限の向きに単調です。この半環では相互に制限できるテンソルを同一視します（[制限同値](../../TSP/TSP5/index.md#def-tsp5-restriction-equivalence)）。零テンソルと $M_1$ はそれぞれ和と積の単位で、スペクトル点はそれらを0と1に写します。以下、同値類の括弧を省いて $\phi(t)$ と書きます。$\widetilde R_K$ は第1節と同じ冪の階数の $N$ 乗根の極限を体 $K$ 上で取ったもので、任意の体での存在は [三因子テンソルのスペクトル極値公式](../../TSP/TSP12/index.md#thm-tsp12-three-tensor) で確認済みです。

<a id="lem-mmx3-common-square-evaluation"></a>

<!-- formal-statement-start -->
> **補題（全正方サイズを同時に評価するスペクトル点）**
>
> 任意の体 $K$ について、一つのスペクトル点 $\phi$ が存在し、全正整数 $n$ について
>
$$
\phi(M_n)=n^{\omega_K}
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

サイズ2で最大値を達成する点を固定します。他のサイズの冪を二の冪で上下から挟むと、同じ点で全サイズの値が決まります。

<!-- proof-start -->
### 証明

[行列積指数のスペクトル表示](../../TSP/TSP14/index.md#thm-tsp14-spectrum) を $b=2$ に適用し、$\phi(M_2)=2^{\omega_K}$ となる点を一つ選びます。最大値は達成されます。任意の整数 $n\ge2$ と正整数 $N$ に対して $k=\lfloor N\log_2 n\rfloor$ と置くと

$$
2^k\le n^N<2^{k+1}.
$$

小さい行列を零で埋め込み、出力の対応する成分だけを残せば大きい行列積から小さい行列積を [制限](../../TSP/TSP4/index.md#def-tsp4-restriction) できます。[行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product) によって $M_{2^k}\simeq M_2^{\boxtimes k}$、$M_{n^N}\simeq M_n^{\boxtimes N}$ です。$\simeq$ は各因子の線形同型による一致を表します。$s\preceq t$ は $t$ から $s$ が制限で得られることを意味する記号です。よって

$$
M_2^{\boxtimes k}\preceq M_n^{\boxtimes N}
\preceq M_2^{\boxtimes(k+1)}.
$$

[スペクトル点の単調性](../../TSP/TSP11/index.md#def-tsp11-spectral-point) と [スペクトル点の自然数値と冪](../../TSP/TSP11/index.md#thm-tsp11-normalization-powers) により

$$
2^{k\omega_K}
\le\phi(M_n)^N
\le2^{(k+1)\omega_K}.
$$

$N$ 乗根を取ると左辺と右辺はともに $n^{\omega_K}$ に収束します。これは $k/N\le\log_2 n<(k+1)/N$ だからです。中央の値は $N$ によらないので等号を得ます。$n=1$ では $M_1$ が半環の単位であり正規化により $\phi(M_1)=1$ です。
<!-- proof-end -->

例えば $n=3,N=2$ では $8\le9<16$ です。冪を増やすほど対数を $N$ で割ったときの幅が狭まります。

<a id="thm-mmx3-asymptotic-sum"></a>

<!-- formal-statement-start -->
> **定理（Schönhage漸近和不等式）**
>
> 体 $K$ と正整数 $s$、各 $i=1,\ldots,s$ に対する正整数 $a_i,b_i,c_i$ を取る。互いに独立な行列積テンソルの直和を $S=\bigoplus_{i=1}^s M_{a_i,b_i,c_i}$ とする。このとき
>
$$
\sum_{i=1}^s (a_ib_ic_i)^{\omega_K/3}
\le\widetilde R_K(S).
$$
<!-- formal-statement-end -->

### 証明の見取り図

一つの長方形積を三通りに巡回させて掛ければ正方形積になります。直和全体の階数は因子の巡回で変わりません。三通りのスペクトル評価を正規化し、相加平均と相乗平均の不等式で足し合わせます。

<!-- proof-start -->
### 証明

$r=\widetilde R_K(S)$ と置きます。$S$ は非零なので $r\ge1$ です。[全正方サイズを同時に評価するスペクトル点](#lem-mmx3-common-square-evaluation) を一つ固定します。各 $i$ について

$$
x_i=\phi(M_{a_i,b_i,c_i}),\quad
y_i=\phi(M_{b_i,c_i,a_i}),\quad
z_i=\phi(M_{c_i,a_i,b_i})
$$

と置きます。巡回したテンソルがなぜ別の行列積になるのかを確認します。一つの積 $M_{a,b,c}$ について、三つの因子の基底を $e_{pq},f_{qh},g_{ph}$ とし、添字 $p,q,h$ はそれぞれ1から $a,b,c$ まで動くものとします。[行列積テンソルの定義](../../TSP/TSP7/index.md#def-tsp7-matrix-multiplication) による係数展開は

$$
M_{a,b,c}=\sum_{p=1}^{a}\sum_{q=1}^{b}\sum_{h=1}^{c}
e_{pq}\otimes f_{qh}\otimes g_{ph}.
$$

三因子を第2、第3、第1の順に並べ、各因子内の基底を次のように付け替えます（プライムは新しい基底）。

$$
f_{qh}\mapsto e'_{qh},\qquad
g_{ph}\mapsto f'_{hp},\qquad
e_{pq}\mapsto g'_{qp}.
$$

各添字対の対応は全単射なので線形同型です。この操作で得られる係数展開は

$$
\sum_{q=1}^{b}\sum_{h=1}^{c}\sum_{p=1}^{a}
e'_{qh}\otimes f'_{hp}\otimes g'_{qp}
=M_{b,c,a}.
$$

もう一度同じ巡回を行えば $M_{c,a,b}$ となります。直和の場合も各ブロックの基底をこのように付け替えればよく、別ブロックの座標を混ぜません。因子の巡回は単純テンソルを単純テンソルに移し、逆巡回も同じなので階数を保存します。冪を取っても巡回と積の操作は対応し、漸近階数も保存します。

[三因子テンソルのスペクトル極値公式](../../TSP/TSP12/index.md#thm-tsp12-three-tensor) を元の直和と二つの巡回した直和に適用し、スペクトル点の加法性を使うと

$$
\sum_i x_i\le r,\qquad
\sum_i y_i\le r,\qquad
\sum_i z_i\le r.
$$

一方 [行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product) により三つの長方形のサイズは各位置で掛け合わされます。$v_i=a_ib_ic_i$ とすると

$$
M_{a_i,b_i,c_i}\boxtimes M_{b_i,c_i,a_i}
\boxtimes M_{c_i,a_i,b_i}\simeq M_{v_i}.
$$

乗法性と [全正方サイズを同時に評価するスペクトル点](#lem-mmx3-common-square-evaluation) から

$$
x_iy_iz_i=\phi(M_{v_i})=v_i^{\omega_K}
$$

です。三つの非負実数 $x_i/r,y_i/r,z_i/r$ の三乗根をそれぞれ $p,q,t$ と置きます。展開して確かめられる恒等式

$$
p^3+q^3+t^3-3pqt
=\frac{p+q+t}{2}
\bigl((p-q)^2+(q-t)^2+(t-p)^2\bigr)\ge0
$$

にこれらの値を代入すれば $3(x_iy_iz_i)^{1/3}\le x_i+y_i+z_i$ です。従って

$$
\frac{v_i^{\omega_K/3}}{r}
\le\frac{x_i+y_i+z_i}{3r}.
$$

全 $i$ で和を取ると右辺は高々 $(r+r+r)/(3r)=1$ です。両辺に $r$ を掛ければ結論です。通常階数が直和について加法的であるという仮定は使っていません。
<!-- proof-end -->

例えば二つの独立な $M_2$ の直和について、仮に漸近階数の上界 $12$ が得られたなら、

$$
2\cdot8^{\omega_K/3}=2\cdot2^{\omega_K}\le12,
\qquad \omega_K\le\log_2 6.
$$

この12は仮定の値であり、分解を構成したわけではありません。逆にこの不等式を利用して、候補となる上界と必要な分解長の関係を調べられます。複素数上で具体的な多項式近似が与えられるなら、第1節の補間で $\widetilde R_{\mathbb C}(S)$ の上界を作ってから本定理を適用できます。

## 3. laser法：共有された座標から独立な積を選ぶ

[Schönhage漸近和不等式](#thm-mmx3-asymptotic-sum) を使うには、各因子で座標が互いに独立であることが必要です。一つのテンソルには、同じ座標を共有する項が多数あることがあります。まず因子ごとに空間を直和分解し、三つの部分空間の組に属する成分をブロックと呼びます。ブロックの添字を選び、一部の部分空間を零へ送れば、残りの組に属する成分だけが残ります。

Strassenの laser 法では、この操作をテンソル冪の上で組織的に行い、残った成分が互いに独立な行列積になるように選びます。ここではその中核である座標の選択を手計算します。

基底 $e_0,e_1$、$f_0,f_1$、$g_0,g_1$ に対し

$$
T=e_0\otimes f_0\otimes g_0+
e_1\otimes f_1\otimes g_1+
e_0\otimes f_1\otimes g_1
$$

とします。三つの添字の組は $(0,0,0),(1,1,1),(0,1,1)$ です。最初の二組だけを残したくても、元の因子で両方の添字を許すと第三の組も残ります。

ところが [Kronecker積](../../TSP/TSP5/index.md#def-tsp5-kronecker) を取った $T^{\boxtimes2}$ では基底の添字が長さ2の列になります。例えば $e_{01}=e_0\otimes e_1$ であり、$f,g$ についても同じ記法を用います。各因子で $01,10$ の二つだけを残し、$00,11$ を零へ送ります。各位置で許された組は $j=k$ かつ $i\le j$ を満たします（添字は0または1）。残る項の三因子の添字列を $I,J,H$ と書きます。各位置 $\ell=1,2$ で $J_\ell=H_\ell$ かつ $I_\ell\le J_\ell$ です。両列 $I,J$ の1の個数は1なので

$$
\sum_{\ell=1}^2(J_\ell-I_\ell)=1-1=0.
$$

各差は非負整数だからすべて零であり、$I=J=H$ となります。従って残るテンソルは

$$
e_{01}\otimes f_{01}\otimes g_{01}
+e_{10}\otimes f_{10}\otimes g_{10}.
$$

二つの項は三因子とも別の座標を使い、$M_1\oplus M_1$ です。これは [テンソルの制限](../../TSP/TSP4/index.md#def-tsp4-restriction) による取り出しであり、近似や極限を使っていません。一般の冪では列の長さと各ブロックの出現回数を調整して多くの独立な積を取り出すことが目標です。上の例では各積がサイズ1なので指数の改善までは得られません。

## 4. 取り出し方の限界を量化する

あるテンソル $T$ の各因子の次元が高々 $d$ で、漸近階数に対して既に上界 $r$ があるとします。$T^{\boxtimes N}$ の制限から行列積の直和 $S_N$ を得たなら、[漸近階数と漸近劣階数の単調性・冪の公式](../../TSP/TSP9/index.md#thm-tsp9-asymptotic-monotonicity) により $\widetilde R(S_N)\le r^N$ です。以下では複素数体上でこの操作だけを考えます。

候補指数 $u$ を証明するため、取り出した積のサイズ $v_i$ について $\sum_i v_i^{u/3}\ge r^N$ を確認する方法があります。少なくとも一つの $v_i>1$ があれば左辺は実数 $u$ の狭義増加関数です。[Schönhage漸近和不等式](#thm-mmx3-asymptotic-sum) と合わせれば $\omega_{\mathbb C}\le u$ と結論できます。では固定した $d,r$ で、この方法が到達できる値はどこまででしょうか。

<a id="prop-mmx3-dimension-barrier"></a>

<!-- formal-statement-start -->
> **命題（固定した費用上界と次元による取り出しの限界）**
>
> 複素三因子テンソル $T$ の各因子の次元は高々整数 $d\ge2$ とする。実数 $r>d$ を固定した漸近階数の上界とする。正整数 $N$ に対して $T^{\boxtimes N}$ の制限で得られる任意の非空な行列積の直和のサイズ積を $v_i=a_ib_ic_i$ とする。実数 $u\ge2$ について
>
$$
\sum_i v_i^{u/3}\le d^{Nu/2}.
$$
>
> よって $2\le u<2\log_d r$ なら、条件 $\sum_i v_i^{u/3}\ge r^N$ はどの $N$ とどの制限でも成立しない。
<!-- formal-statement-end -->

### 証明の見取り図

三因子の行列積の座標数は $ab,bc,ca$ です。直和なので各因子の必要な座標数を足せます。この次元上界からサイズ積の和を制約します。

<!-- proof-start -->
### 証明

行列積 $M_{a,b,c}$ の各因子に必要な次元を、制限で増えない行列階数として測ります。[平坦化](../../TSP/TSP3/index.md#def-tsp3-flattening) $F_{1|23}(M_{a,b,c})$ は第1因子の基底添字を行、残り二因子の基底添字を列にして係数を並べた行列です。第2、第3因子を行とする場合は $F_{2|13},F_{3|12}$ と書きます。

第2節と同様に添字 $p,q,h$ をそれぞれ1から $a,b,c$ まで動かします。第1因子の平坦化で、行 $(p,q)$ に対して列 $((q,1),(p,1))$ を選びます。$\delta_{xy}$ は $x=y$ なら1、異なれば0とします。任意の行 $(p',q')$ での係数は

$$
F_{1|23}(M_{a,b,c})_{(p',q'),((q,1),(p,1))}
=\delta_{p'p}\delta_{q'q}.
$$

従って選んだ $ab$ 本の列は標準基底そのものであり、行数も $ab$ なので階数はちょうど $ab$ です。

第2因子では行 $(q,h)$ に列 $((1,q),(1,h))$、第3因子では行 $(p,h)$ に列 $((p,1),(1,h))$ を選びます。任意の行 $(q',h')$ または $(p',h')$ における係数はそれぞれ $\delta_{q'q}\delta_{h'h}$ と $\delta_{p'p}\delta_{h'h}$ となるため、同じ理由で行列階数はちょうど $bc,ca$ です。

直和の三因子の平坦化は、これらの行列が互いに別の行・列に置かれたものなので階数が加わります。制限は各因子の線形写像によるため、平坦化行列の左右に線形写像の行列を掛ける操作です。[制限による階数の単調性](../../TSP/TSP4/index.md#thm-tsp4-restriction-bounds) によって平坦化の行列階数は増えません。元の冪の各因子の次元は高々 $d^N$ です。従って

$$
\sum_i a_ib_i\le d^N,\qquad
\sum_i b_ic_i\le d^N,\qquad
\sum_i c_ia_i\le d^N.
$$

三つの数 $a_ib_i,b_ic_i,c_ia_i$ の積は $v_i^2$ です。ここで $p=(a_ib_i)^{1/3}$、$q=(b_ic_i)^{1/3}$、$t=(c_ia_i)^{1/3}$ と置きます。

$$
p^3+q^3+t^3-3pqt
=\frac{p+q+t}{2}
\bigl((p-q)^2+(q-t)^2+(t-p)^2\bigr)\ge0.
$$

左辺の最初の三項は $a_ib_i+b_ic_i+c_ia_i$、$pqt=v_i^{2/3}$ です。従って

$$
v_i^{2/3}\le\frac{a_ib_i+b_ic_i+c_ia_i}{3}.
$$

和を取れば $\sum_i v_i^{2/3}\le d^N$。従って各 $v_i^{2/3}$ も $d^N$ 以下です。$u/2-1\ge0$ なので

$$
v_i^{u/3}
=v_i^{2/3}(v_i^{2/3})^{u/2-1}
\le v_i^{2/3}d^{N(u/2-1)}.
$$

和を取り、先ほどの評価を代入すると $\sum_i v_i^{u/3}\le d^{Nu/2}$。$u<2\log_d r$ なら $d^{u/2}<r$ であり、$N$ 乗して結論を得ます。
<!-- proof-end -->

具体例として $T=M_2$ の各因子は4次元であり、[Strassenの7回乗算による上界](../../TSP/TSP7/index.md#thm-tsp7-strassen) から $r=7$ を費用上界として使えます。この固定上界で直和の取り出しだけを行う方法では $2\log_4 7=\log_2 7$ より小さい指数を証明できません。逆に [行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product) により $M_2^{\boxtimes N}\simeq M_{2^N}$ なので $u=\log_2 7$ のとき $(2^{3N})^{u/3}=7^N$ となり、この例では限界値に達します。

ここで否定したのは指定された証明条件の成立です。漸近階数のより良い上界を別に発見することや、他のテンソルを選ぶこと、別の計算モデルで証明することは排除していません。

## 5. 古典史と研究上の障壁

1969年の Strassen の七積、1979年の Biniらの近似算法、1981年の Schönhage の直和評価、1987年の Strassen の laser 法、1990年の Coppersmith–Winograd の構成は、有限サイズの分解から冪・退化・直和へと利用できる構造を広げた流れです。

この発展に対して、特定のテンソル族から特定の方法で算法を作ることの限界も研究されています。例えば Alman（2021）は Coppersmith–Winograd テンソル $CW_q$ に Universal Method を適用して得られる指数上界は $2.16805$ より小さくできないことを示しています。Universal Method は laser 法より広く、一般の退化による直和の取り出しも許す枠組みです。この結果の証明には漸近 slice rank（各項の一因子と残りの因子への分割を許して測る階数の反復版）の上界が必要です。本講で証明した次元による限界はこれとは異なる簡単な模型です。Alman の数値は原論文の結果として紹介し、証明は同論文に委ねます。

方法が出す上界の集合を $B$ と書くと、各 $u\in B$ について $\omega_K\le u$ が成立します。方法の障壁 $\inf B\ge c$ が証明されても、$\omega_K\ge c$ は従いません。例えば $B=\{5/2,3\}$ と $\omega_K=2$ はこの二つの不等式を同時に満たします。一般の指数下界には [冪に沿った指数下界の判定](../MMX2/index.md#prop-mmx2-exponent-lower) のように、全ての分解に対する量化が必要です。

歴史的な上界や方法限定の下界と、後続講で読む研究上の主張は別々に評価します。次講では多項式乗算テンソルの次数ごとの構造から評価を組み立てます。

### 参考文献

- Bini, Lotti, Romani, [Approximate Solutions for the Bilinear Form Computational Problem](https://doi.org/10.1137/0209053), 1980.
- Schönhage, [Partial and Total Matrix Multiplication](https://doi.org/10.1137/0210032), 1981.
- Alman, [Limits on the Universal Method for Matrix Multiplication](https://theoryofcomputing.org/articles/v017a001/), 2021.

## 6. 演習

### Level A

<a id="ex-mmx3-a01"></a>

#### MMX3-A01 定数係数の回収
- Level: A
- ID: MMX3-A01

複素ベクトル値多項式 $P(z)=u+zv+z^2w$ の定数係数を $P(1),P(-1),P(2)$ から回収せよ。

<!-- solution-start -->
##### 詳細解答

係数を $\alpha,\beta,\gamma$ とすると定数項には $\alpha+\beta+\gamma=1$、一次項には $\alpha-\beta+2\gamma=0$、二次項には $\alpha+\beta+4\gamma=0$ が必要です。第三式から第一式を引くと $3\gamma=-1$、従って $\gamma=-1/3$。第一式から $\alpha+\beta=4/3$、第二式から $\alpha-\beta=2/3$ なので $\alpha=1,\beta=1/3$ です。

$$
u=P(1)+\tfrac13P(-1)-\tfrac13P(2).
$$

相異なる非零点であり、[多項式の係数回収](../../TSP/TSP9/index.md#lem-tsp9-coefficient-recovery) の具体例です。
<!-- solution-end -->

<a id="ex-mmx3-a02"></a>

#### MMX3-A02 冪と補間の費用
- Level: A
- ID: MMX3-A02

$A(z)=t+zh_1+z^2h_2+z^3h_3$ が非零複素数 $z$ で階数5以下とする。$t^{\boxtimes4}$ の補間による階数上界を求めよ。

<!-- solution-start -->
##### 詳細解答

[多項式退化による漸近階数上界](../../TSP/TSP9/index.md#thm-tsp9-degeneration-asymptotic) で $N=4,L=3,r=5$ とすると次数は高々12、必要な点数は13、各点での分解長は高々 $5^4=625$ です。よって上界は $13\cdot625=8125$ です。漸近的には同定理から上界5を得ます。
<!-- solution-end -->

<a id="ex-mmx3-a03"></a>

#### MMX3-A03 長方形の巡回
- Level: A
- ID: MMX3-A03

$M_{2,3,4}$ の巡回した三つを Kronecker積で掛けるとどの正方行列積になるか。各因子の次元も確認せよ。

<!-- solution-start -->
##### 詳細解答

三つのサイズは $(2,3,4),(3,4,2),(4,2,3)$ です。[行列積テンソルの積と階数評価](../../TSP/TSP7/index.md#thm-tsp7-product) により合成サイズは $(24,24,24)$、すなわち $M_{24}$ です。各因子の次元は第1で $6\cdot12\cdot8=576$、第2で $12\cdot8\cdot6=576$、第3で $8\cdot6\cdot12=576$。いずれも $24^2$ と一致します。
<!-- solution-end -->

<a id="ex-mmx3-a04"></a>

#### MMX3-A04 直和からの上界
- Level: A
- ID: MMX3-A04

仮に独立な $M_3$ が三つある直和の漸近階数が高々60だとする。この条件から指数上界を求めよ。

<!-- solution-start -->
##### 詳細解答

一つのサイズ積は27であり、[Schönhage漸近和不等式](#thm-mmx3-asymptotic-sum) に代入すると

$$
3\cdot27^{\omega_K/3}\le60,\quad
3^{\omega_K}\le20.
$$

底3の対数は増加関数なので $\omega_K\le\log_3 20$ です。これは漸近階数上界60が得られた場合の含意であって、その上界の証明ではありません。
<!-- solution-end -->

### Level B

<a id="ex-mmx3-b01"></a>

#### MMX3-B01 二種類の積をまとめる
- Level: B
- ID: MMX3-B01

$S=M_{2,2,2}\oplus M_{4,2,1}$ とする。仮に $\widetilde R_K(S)\le14$ なら得られる指数上界を求めよ。また三因子の次元を求めよ。

<!-- solution-start -->
##### 詳細解答

どちらのサイズ積も8なので [Schönhage漸近和不等式](#thm-mmx3-asymptotic-sum) は $2\cdot2^{\omega_K}\le14$ を与えます。従って $\omega_K\le\log_2 7$。第1の三次元はそれぞれ $4,4,4$、第2は $8,2,4$ なので直和の各因子の次元は $12,6,8$ です。サイズ積が同じでも因子ごとの次元は異なり、これが座標の配置を考える理由になります。
<!-- solution-end -->

<a id="ex-mmx3-b02"></a>

#### MMX3-B02 三回の冪から独立な項を残す
- Level: B
- ID: MMX3-B02

第3節の $T^{\boxtimes3}$ について、各因子で1がちょうど二個ある長さ3の添字列だけを残す。取り出されるテンソルを求めよ。

<!-- solution-start -->
##### 詳細解答

残す基底の添字は $011,101,110$ です。第3節の添字の条件により、残る項の三因子の列 $I,J,H$ は $J=H$ であり、各位置 $\ell=1,2,3$ で差 $J_\ell-I_\ell$ は非負です。両列に1が二つあるので差の和は $2-2=0$。よって各差が零で $I=J=H$ です。

$$
\sum_{I\in\{011,101,110\}}
e_I\otimes f_I\otimes g_I
$$

が残ります。三つの同じ添字を持つ項は元の冪にそれぞれ一度だけ現れ係数1です。三因子とも添字が異なるため $M_1\oplus M_1\oplus M_1$ です。
<!-- solution-end -->

<a id="ex-mmx3-b03"></a>

#### MMX3-B03 固定した費用による障壁
- Level: B
- ID: MMX3-B03

各因子の次元が高々9、固定した費用上界が20である複素三因子テンソルについて、第4節の証明条件では指数 $5/2$ を証明できないことを、整数の比較で示せ。

<!-- solution-start -->
##### 詳細解答

[固定した費用上界と次元による取り出しの限界](#prop-mmx3-dimension-barrier) で $d=9,r=20,u=5/2$ とすると、サイズ積の和は高々 $(9^{5/4})^N$。$9^{5/4}<20$ を確かめるため正の両辺を4乗します。

$$
9^5=59049<160000=20^4.
$$

従って任意の $N\ge1$ で $(9^{5/4})^N<20^N$ となり、必要な証明条件は満たされません。より低い費用上界や別の出発テンソルを用いる方法はこの推論の対象外です。
<!-- solution-end -->

<a id="ex-mmx3-b04"></a>

#### MMX3-B04 有限体での補間の注意
- Level: B
- ID: MMX3-B04

二元体上で次数2の多項式を非零点で評価して定数係数を回収する手続きが一般に不可能なことを、具体的な二つの多項式で示せ。

<!-- solution-start -->
##### 詳細解答

非零点は1だけです。次数がちょうど2の二つの多項式 $P(z)=z^2$ と $Q(z)=z^2+z+1$ を取ります。二元体では $1+1=0$ なので $P(1)=1$、$Q(1)=1+1+1=1$ です。しかし定数係数はそれぞれ0と1で異なります。評価値だけから決まる関数は二つを区別できません。複素数体上での [多項式の係数回収](../../TSP/TSP9/index.md#lem-tsp9-coefficient-recovery) の証明は次数2なら3個の相異なる評価点を要求します。ここでは非零評価点が一つしかなく、その仮定が失われています。体拡大などの別の議論なしに適用することはできません。
<!-- solution-end -->

### Level C

<a id="ex-mmx3-c01"></a>

#### MMX3-C01 近似と漸近和不等式を接続する
- Level: C
- ID: MMX3-C01

複素数体上で $S=M_2\oplus M_2$ に対し $A(z)=S+zh_1+z^2h_2$ が存在し、全非零 $z$ で $R(A(z))\le10$ と仮定する。$S^{\boxtimes N}$ の厳密な階数上界を導き、行列積指数の上界を求めよ。さらにある特定の方法では指数 $9/4$ 未満を証明できないと分かったとき、それだけで $\omega_{\mathbb C}=9/4$ を示せるか答えよ。

<!-- solution-start -->
##### 詳細解答

冪の展開で各位置の次数は0、1、2なので次数は高々 $2N$ です。定数係数にはすべての位置で $S$ を選ぶ一項だけが現れます。[多項式の係数回収](../../TSP/TSP9/index.md#lem-tsp9-coefficient-recovery) によって相異なる非零 $2N+1$ 点の線形結合で $S^{\boxtimes N}$ が得られます。各評価の階数は10以下の分解を $N$ 回掛けるので高々 $10^N$。全評価の分解を連結すれば

$$
R(S^{\boxtimes N})\le(2N+1)10^N.
$$

$N$ 乗根を取ると右辺は $(2N+1)^{1/N}10\to10$ です。従って [多項式退化による漸近階数上界](../../TSP/TSP9/index.md#thm-tsp9-degeneration-asymptotic) と同じく $\widetilde R(S)\le10$ を得ます。

[Schönhage漸近和不等式](#thm-mmx3-asymptotic-sum) に代入すると

$$
2\cdot 8^{\omega_{\mathbb C}/3}\le10,\qquad
\omega_{\mathbb C}\le\log_2 5.
$$

この仮定は分解の存在を別途示さなければ実際の上界にはなりません。また $\log_2 5>9/4$ は $5^4=625>2^9=512$ から分かります。指定された方法が出す上界を $u$ としたとき $u\ge9/4$ であっても、$\omega_{\mathbb C}\le u$ という関係しかありません。従って $\omega_{\mathbb C}\ge9/4$ も $\omega_{\mathbb C}\le9/4$ も、この方法限定の下界だけからは導けません。
<!-- solution-end -->
