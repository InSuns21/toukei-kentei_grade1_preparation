# TSP9 漸近階数・漸近劣階数・Fekete補題と指数

一回の計算を安くすることと、同じ計算を大量に並行して行うときの一回当たりの費用を安くすることは別です。[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)では、二つの計算を掛けると階数は積以下、劣階数は積以上になると分かりました。反復すればこの不等式の差は指数的な差になる可能性があります。

本講では反復回数を無限に増やしても増大率が確定することを示し、前講の[多項式パラメータによる境界階数上界](../TSP8/index.md#prop-tsp8-polynomial-degeneration)で扱った退化から厳密な計算の増大率を評価します。体は複素数体に固定し、因子数 $d\ge2$、各因子は有限次元とします。$R(t)=R_{\mathbb C}(t)$ は[テンソル階数](../TSP2/index.md#def-tsp2-tensor-rank)、$Q(t)=Q_{\mathbb C}(t)$ は[テンソル劣階数](../TSP4/index.md#def-tsp4-subrank)です。

## 1. 反復回数と費用

[テンソルのKronecker積](../TSP5/index.md#def-tsp5-kronecker)は因子位置を保って掛ける操作です。$t^{\boxtimes n}$ は同じテンソルを $n$ 回掛けたものとします。

因子番号を $a=1,\ldots,d$、反復回数を正整数 $n$ とします。第 $a$ 因子の次元が $v_a$ なら、冪の第 $a$ 因子の次元は $v_a^n$ です。

括弧の付け方によらず、各因子の基底は長さ $n$ の添字列で対応するので、因子ごとの基底同型で同一視できます。階数と劣階数はこの同型で変わりません（[制限による階数の単調性](../TSP4/index.md#thm-tsp4-restriction-bounds)と[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)を両向きに適用）。

非零 $t$ の非零成分を一つ選ぶと、その成分の $n$ 乗が冪の成分に現れるので、すべての冪も非零です。従って

$$
1\le Q(t^{\boxtimes n})\le R(t^{\boxtimes n})\le R(t)^n.
$$

最初の二つは[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)、最後は[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)を繰り返して得ます。

例えば $R(t)=3$ でも、仮に二回分の階数が8であれば、偶数回分を二回ずつ組にして $R(t^{\boxtimes 2k})\le8^k$ とできます。

偶数回分の一回当たりの費用の尺度は $R(t^{\boxtimes 2k})^{1/(2k)}\le\sqrt8$ となり、上界は3より小さくなります。ここで用いる尺度は費用そのものではなく、その $n$ 乗根です。

## 2. 増大率の極限を保証する

正の数列の積の不等式は、自然対数を取ると和の不等式になります。$a_{m+n}\le a_m+a_n$ を満たす実数列を劣加法的、逆向きの不等式を満たすものを優加法的といいます。例えば $a_n=2n+1$ は、$a_{m+n}=2m+2n+1$ に対して $a_m+a_n=2m+2n+2$ なので劣加法的です。

ここでは実数の[下限](../../../基礎科目/F0/F0-00A1/index.md#def-f0-00a1-infimum)（最大の下界）を $\inf$、[上限](../../../基礎科目/F0/F0-00A1/index.md#def-f0-00a1-supremum)（最小の上界）を $\sup$ と書きます。収束の判定には[上極限・下極限](../../../基礎科目/RA/RA1/index.md#def-ra1-limsup)を使います。

任意の長い反復を固定長のブロックと余りに分ければ、固定長の一回当たりの費用と全体の増大率を比較できます。

<a id="lem-tsp9-fekete"></a>

<!-- formal-statement-start -->
> **補題（Fekete補題）**
>
> 実数列 $(a_n)_{n\ge1}$ がすべての正整数 $m,n$ について劣加法性を満たし、$\inf_{n\ge1}a_n/n$ が有限であるとする。このとき

$$
\lim_{n\to\infty}\frac{a_n}{n}
=\inf_{k\ge1}\frac{a_k}{k}.
$$

> すべての正整数 $m,n$ について優加法性を満たし、$\sup_{n\ge1}a_n/n$ が有限である場合には

$$
\lim_{n\to\infty}\frac{a_n}{n}
=\sup_{k\ge1}\frac{a_k}{k}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定した長さ $k$ で $n$ を割り、商の個数だけ長さ $k$ のブロックを並べます。残る $k-1$ 以下の部分は、$n$ が大きくなると一回当たりの寄与が消えます。

<!-- proof-start -->
### 証明

劣加法の場合、$c=\inf_{j\ge1}a_j/j$ と置けば全ての $n$ で $a_n/n\ge c$ です。

$k\ge1$ を固定し、整数の除法で $n=qk+r$、$0\le r<k$ と書きます。便宜上 $a_0=0$ と置きます。$q\ge1$ なら劣加法性の反復によって

$$
a_{qk}\le a_{(q-1)k}+a_k\le\cdots\le qa_k
$$

となります（$q=1$ では等号）。余りが正ならさらに $a_n\le a_{qk}+a_r$、零なら $a_n=a_{qk}$ です。$q=0$ の場合も $a_n\le qa_k+a_r$ は等号で成立します。

$M_k=\max_{0\le j<k}|a_j|$ と置くと

$$
\frac{a_n}{n}\le\frac{qk}{n}\frac{a_k}{k}+\frac{M_k}{n}.
$$

$0\le r<k$ から $qk/n=1-r/n\to1$、$M_k/n\to0$ です。

従って $\limsup_{n\to\infty}a_n/n\le a_k/k$。これは任意の $k$ で成立するので、上極限は $c$ 以下です。

一方、すべての項が $c$ 以上なので下極限は $c$ 以上です。

両者が一致するので、[limsup・liminfによる収束判定](../../../基礎科目/RA/RA1/index.md#thm-ra1-limsup-criterion)を列 $a_n/n$ に適用すると極限は $c$ です。

優加法の場合は $b_n=-a_n$ と置きます。$b_{m+n}\le b_m+b_n$ であり、$\inf b_n/n=-\sup a_n/n$ は有限です。前半から $b_n/n$ の極限はこの下限です。符号を戻せば後半が従います。
<!-- proof-end -->

先ほどの $a_n=2n+1$ では $a_n/n=2+1/n$ なので、下限も極限も2です。最小値を達成する有限の $n$ がなくても、補題は成立します。

## 3. 漸近階数と漸近劣階数

非零テンソルの階数の対数は劣加法的、劣階数の対数は優加法的です。そこで対数で増大率を確定し、元の尺度に戻します。

<a id="thm-tsp9-limit-existence"></a>

<!-- formal-statement-start -->
> **定理（テンソル冪の階数と劣階数の増大率）**
>
> 複素数体上の有限次元空間の $d$ 因子（$d\ge2$）の非零テンソル $t$ に対し、次の極限が存在する。

$$
\lim_{n\to\infty}R(t^{\boxtimes n})^{1/n}
=\inf_{k\ge1}R(t^{\boxtimes k})^{1/k},
$$

$$
\lim_{n\to\infty}Q(t^{\boxtimes n})^{1/n}
=\sup_{k\ge1}Q(t^{\boxtimes k})^{1/k}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

第1節の評価によって対数は非負かつ線形増大以下になります。乗法評価を対数の加法評価に移せば、[Fekete補題](#lem-tsp9-fekete)を使えます。

<!-- proof-start -->
### 証明

$a_n=\log R(t^{\boxtimes n})$、$b_n=\log Q(t^{\boxtimes n})$ と置きます。非零性によって対数が定義され、第1節の評価から

$$
0\le b_n\le a_n\le n\log R(t).
$$

[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)を $t^{\boxtimes m},t^{\boxtimes n}$ に適用すると

$$
a_{m+n}\le a_m+a_n,\qquad
b_{m+n}\ge b_m+b_n.
$$

$a_n/n$ の下限も $b_n/n$ の上限も有限なので、[Fekete補題](#lem-tsp9-fekete)により

$$
\lim_{n\to\infty}\frac{a_n}{n}=\inf_{k\ge1}\frac{a_k}{k},
\qquad
\lim_{n\to\infty}\frac{b_n}{n}=\sup_{k\ge1}\frac{b_k}{k}.
$$

指数関数は連続で狭義単調増加です。

例えば有限な下限 $c$ に対して、各項は $c$ 以上、任意の $\delta>0$ について $c+\delta$ 未満の項が存在するので、指数を取った列の下限は $e^c$ です。

上限の場合は $c=\sup_{k\ge1}b_k/k$ と置きます。全ての $b_k/k$ は $c$ 以下で、任意の $\delta>0$ に対して $c-\delta<b_k/k$ となる $k$ が存在します。従って指数を取った列の上限は $e^c$ です。

$e^{a_n/n}=R(t^{\boxtimes n})^{1/n}$ および $e^{b_n/n}=Q(t^{\boxtimes n})^{1/n}$ なので主張を得ます。
<!-- proof-end -->

この二つの極限を、一回当たりの漸近的な作成費用（漸近階数）と取り出し能力（漸近劣階数）と呼びます。非零の場合は[テンソル冪の階数と劣階数の増大率](#thm-tsp9-limit-existence)で存在が保証され、零の場合は各冪の階数・劣階数が0です。

<a id="def-tsp9-asymptotic-rank"></a>

<!-- formal-statement-start -->
> **定義（漸近階数と漸近劣階数）**
>
> 複素数体上の有限次元空間の $d$ 因子（$d\ge2$）のテンソル $t$ に対して、漸近階数 $\widetilde R(t)$ と漸近劣階数 $\widetilde Q(t)$ をそれぞれ

$$
\widetilde R(t)=\lim_{n\to\infty}R(t^{\boxtimes n})^{1/n},
$$

$$
\widetilde Q(t)=\lim_{n\to\infty}Q(t^{\boxtimes n})^{1/n}
$$

> とする。零テンソルの場合はすべての正整数冪が零なので、両者を0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp9-asymptotic-rank -->
**定義の確認**。[対角テンソル](../TSP4/index.md#def-tsp4-diagonal) $D_3$ を考えます。[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations)により $D_3^{\boxtimes n}$ は $D_{3^n}$ と[制限同値](../TSP5/index.md#def-tsp5-restriction-equivalence)（互いに制限できる関係）です。階数・劣階数の単調性を両方向に使えるので、二つのテンソルの階数・劣階数はそれぞれ一致します。

[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction)で $r=3^n$ とすると $R(D_{3^n})=3^n$ です。恒等写像によって $D_{3^n}\preceq D_{3^n}$ なので、[劣階数の定義](../TSP4/index.md#def-tsp4-subrank)から $Q(D_{3^n})\ge3^n$ です。[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)で $Q\le R$ も成り立つため、両者は $3^n$ に一致します。

従って両方の $n$ 乗根は常に3で、二つの極限も3です。零テンソルでは全ての冪が零で、両極限は0になることも直接確認できます。一般の非零テンソルでも

$$
1\le Q(t)\le\widetilde Q(t)\le\widetilde R(t)\le R(t)
$$

となります。両端は[テンソル冪の階数と劣階数の増大率](#thm-tsp9-limit-existence)で $k=1$ を選んで得られ、中間は各冪の不等式を極限へ移したものです。
<!-- definition-example-end -->

次に、[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) $s\preceq t$（各因子に線形写像を作用させて $t$ から $s$ を作ること）を反復するときの評価を調べます。一定の長さの冪を新しい一回分としたときにも増大率を比較できます。

<a id="thm-tsp9-asymptotic-monotonicity"></a>

<!-- formal-statement-start -->
> **定理（漸近階数と漸近劣階数の単調性・冪の公式）**
>
> 同じ因子数 $d\ge2$ の複素有限次元テンソル $s,t$ が $s\preceq t$ を満たすなら

$$
\widetilde R(s)\le\widetilde R(t),\qquad
\widetilde Q(s)\le\widetilde Q(t).
$$

> また任意の正整数 $k$ について

$$
\widetilde R(t^{\boxtimes k})=\widetilde R(t)^k,\qquad
\widetilde Q(t^{\boxtimes k})=\widetilde Q(t)^k.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity)を繰り返せば $s^{\boxtimes n}\preceq t^{\boxtimes n}$ です。[制限による階数の単調性](../TSP4/index.md#thm-tsp4-restriction-bounds)と[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)を各冪に適用し、各冪で得られる不等式は

$$
R(s^{\boxtimes n})\le R(t^{\boxtimes n}),\qquad
Q(s^{\boxtimes n})\le Q(t^{\boxtimes n}).
$$

非負数の $n$ 乗根は単調増加なので不等号の向きは変わりません。[漸近階数と漸近劣階数の定義](#def-tsp9-asymptotic-rank)により極限を取れば前半です。零テンソルを含む場合も対数を使わないので成立します。

後半では $(t^{\boxtimes k})^{\boxtimes n}$ と $t^{\boxtimes kn}$ が因子ごとの基底同型で対応するため

$$
R((t^{\boxtimes k})^{\boxtimes n})^{1/n}
=\left(R(t^{\boxtimes kn})^{1/(kn)}\right)^k.
$$

右辺の括弧内は[増大率の極限](#thm-tsp9-limit-existence)で得た収束列の、添字が $kn$ の部分列なので $\widetilde R(t)$ に収束します（零の場合も定義により0です）。固定した正整数 $k$ に対する $k$ 乗の連続性から右辺全体の極限は $\widetilde R(t)^k$ です。劣階数についても

$$
Q((t^{\boxtimes k})^{\boxtimes n})^{1/n}
=\left(Q(t^{\boxtimes kn})^{1/(kn)}\right)^k
\to\widetilde Q(t)^k.
$$
<!-- proof-end -->

対数を取れば、非零テンソルの指数は $\log\widetilde R(t)$ と $\log\widetilde Q(t)$ です。例えば $\widetilde R(t)=2$ なら $\log R(t^{\boxtimes n})/n\to\log 2$ です。これは有限回で階数が $2^n$ になるという主張とは異なります。

例えば $D_2^{\boxtimes3}$ を新しい一回分とすると、[漸近階数と漸近劣階数の単調性・冪の公式](#thm-tsp9-asymptotic-monotonicity)により両漸近量は $2^3=8$ です。

これは[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations)により $D_2^{\boxtimes3}$ が $D_8$ と制限同値であることから直接求めても同じです。

元の一回当たりの指数に戻すには $\log8$ を3で割り、$\log2$ を得ます。反復の単位を変えたとき、指数と一回当たりの費用の両方がどう変わるかを区別しましょう。

## 4. 多項式退化から厳密な計算へ

[多項式パラメータによる境界階数上界](../TSP8/index.md#prop-tsp8-polynomial-degeneration)では、近似計算の先頭係数から目標を作りました。近似のままではなく正確な計算を行うために、異なるパラメータでの値を線形結合して係数だけを回収します。

ここでベクトル空間 $E$ に値を取る多項式とは、固定した係数ベクトル $p_j\in E$ を用いて $P(z)=\sum_{j=0}^N z^j p_j$ と書ける写像です。$z\in\mathbb C$ が動く変数、$N$ は非負整数で次数の上界、$j$ は係数の番号です。基底で展開すれば各座標は通常の複素数値多項式になります。

<a id="lem-tsp9-coefficient-recovery"></a>

<!-- formal-statement-start -->
> **補題（多項式の係数回収）**
>
> 複素有限次元ベクトル空間 $E$ に値を取る次数 $N$ 以下の多項式 $P(z)$ と、相異なる複素数 $z_0,\ldots,z_N$ を取る。任意の整数 $j$（$0\le j\le N$）に対し、$P$ の $z^j$ の係数は $P(z_0),\ldots,P(z_N)$ の線形結合で表せる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各評価点の番号 $i=0,\ldots,N$ に対し、$i$ 番目以外の全評価点の番号 $h$ を走らせて補間多項式

$$
L_i(z)=\prod_{\substack{0\le h\le N\\h\ne i}}\frac{z-z_h}{z_i-z_h}
$$

を作ります。$N=0$ では空積を1とします。

と置きます。$z_i$ は相異なるので分母は零でなく、$L_i(z_i)=1$、$h\ne i$ なら $L_i(z_h)=0$ です。従って

$$
P(z)-\sum_{i=0}^N P(z_i)L_i(z)
$$

は次数 $N$ 以下で $N+1$ 個の相異なる点で零です。

差の各座標をスカラー多項式 $f(z)$ とします。$f(z_i)=0$ なので、まず $f(z)=(z-z_0)g(z)$ と書けます。$i\ne0$ では $z_i-z_0\ne0$ だから $g(z_i)=0$ です。この操作を繰り返すと $\prod_{i=0}^N(z-z_i)$ が $f(z)$ を割ります。非零なら次数が $N+1$ 以上となって矛盾します。各座標が零多項式なので差も零多項式です。

$L_i$ の $z^j$ の係数を $\lambda_{ij}$（$i$ は評価点、$j$ は次数の番号）とすれば、両辺の係数比較により求める係数は $\sum_{i=0}^N\lambda_{ij}P(z_i)$ です。
<!-- proof-end -->

例えば $P(z)=u+zv+z^2w$ なら $P(1)-P(-1)=2v$ で、一次係数だけが回収されます。次はこの考えを任意回のKronecker積に使います。

<a id="thm-tsp9-degeneration-asymptotic"></a>

<!-- formal-statement-start -->
> **定理（多項式退化による漸近階数上界）**
>
> 複素有限次元空間の $d$ 因子（$d\ge2$）のテンソル $t$ を取る。非負整数 $m,L$ と正整数 $r$ に対し、同じテンソル積空間の係数 $h_j$（$1\le j\le L$）を持つテンソル値多項式 $P(z)$ が

$$
P(z)=z^m t+\sum_{j=1}^L z^{m+j}h_j
$$

> を満たし、すべての非零複素数 $z$ で $R(P(z))\le r$ とする。このとき任意の正整数 $n$ について

$$
R(t^{\boxtimes n})\le (nL+1)r^n,
\qquad
\widetilde R(t)\le r.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$z^m$ を割ってから $n$ 回掛けると、定数係数が $t^{\boxtimes n}$ になります。補間の点数は $nL+1$ で済むので、費用の追加因子は指数的ではなく一次式です。

<!-- proof-start -->
### 証明

$A(z)=t+\sum_{j=1}^L z^j h_j$ と置きます。非零 $z$ なら $A(z)=z^{-m}P(z)$ であり、各単純テンソルの第1因子にスカラーを掛ければ階数は高々 $r$ です。

$u_0=t$、$u_j=h_j$（$1\le j\le L$）と置きます。[Kronecker積の定義](../TSP5/index.md#def-tsp5-kronecker)の双線形性を各回に使うと

$$
B(z)=A(z)^{\boxtimes n}
=\sum_{j_1,\ldots,j_n=0}^L z^{j_1+\cdots+j_n}
(u_{j_1}\boxtimes\cdots\boxtimes u_{j_n}).
$$

各 $j_\ell$ は非負で $L$ 以下なので、次数は $nL$ 以下です。次数0となるのは全ての $j_\ell=0$ のときだけであり、定数係数は $t^{\boxtimes n}$ です。

非零で相異なる $nL+1$ 個の複素数 $z_i=i+1$（$0\le i\le nL$）を選びます。[多項式の係数回収](#lem-tsp9-coefficient-recovery)を $B$ の定数係数に適用すると、ある複素数 $\lambda_i$ により

$$
t^{\boxtimes n}=\sum_{i=0}^{nL}\lambda_i B(z_i).
$$

各 $A(z_i)$ の単純テンソル分解を $n$ 回展開すると、各項は因子位置を組にした単純テンソルであり、項数は高々 $r^n$ です。

$\lambda_i$ を各項の第1因子に吸収し、全ての分解を連結すると高々 $(nL+1)r^n$ 項です。従って階数の上界を得ます。

両辺の $n$ 乗根を取ると $R(t^{\boxtimes n})^{1/n}\le(nL+1)^{1/n}r$ です。$L=0$ では追加因子は1。$L>0$ では、任意の $\eta>0$ と $n\ge2$ に対して二項展開から

$$
(1+\eta)^n\ge \frac{n(n-1)}{2}\eta^2.
$$

右辺を $n$ で割ると $(n-1)\eta^2/2$ は無限大へ発散するので、十分大きな $n$ では右辺が $nL+1$ を超えます。従って

$$
1\le(nL+1)^{1/n}<1+\eta.
$$

従って追加因子の $n$ 乗根は1へ収束します。[テンソル冪の階数と劣階数の増大率](#thm-tsp9-limit-existence)により非零 $t$ で極限を取れ、零テンソルなら漸近階数は0なので、正整数 $r$ に対して結論は成立します。
<!-- proof-end -->

ここでは実際にパラメータ付きテンソル値多項式が与えられる場合を証明しました。前講の[境界階数](../TSP8/index.md#def-tsp8-border-rank)は Zariski 閉包を用いて定めた量です。閉包への所属だけからここで必要な形の多項式を構成するには別の議論が必要です。

## 5. 三因子で通常の階数と漸近階数が異なる例

第2講・第8講の三因子テンソルを再利用します。各因子の基底を $e_1,e_2$、$f_1,f_2$、$g_1,g_2$ として

$$
w=e_2\otimes f_1\otimes g_1+
e_1\otimes f_2\otimes g_1+
e_1\otimes f_1\otimes g_2.
$$

[三因子の階数と境界階数が異なる例](../TSP8/index.md#thm-tsp8-w-border-rank)では $R(w)=3$、境界階数は2でした。$P(z)$ を

$$
(e_1+ze_2)\otimes(f_1+zf_2)\otimes(g_1+zg_2)
-e_1\otimes f_1\otimes g_1
$$

と置くと、展開は $P(z)=zw+z^2h+z^3k$ です。ここで二次係数は添字2が二つある三項の和

$$
h=e_2\otimes f_2\otimes g_1+
e_2\otimes f_1\otimes g_2+
e_1\otimes f_2\otimes g_2
$$

で、三次係数は $k=e_2\otimes f_2\otimes g_2$ です。

二つの単純テンソルの差なので、全ての $z$ で階数は高々2。[多項式退化による漸近階数上界](#thm-tsp9-degeneration-asymptotic)に $m=1,L=2,r=2$ を入れて

$$
R(w^{\boxtimes n})\le(2n+1)2^n,\qquad
\widetilde R(w)\le2.
$$

下界は[平坦化による階数下界](../TSP3/index.md#thm-tsp3-flattening-bound)から得ます。[平坦化の定義](../TSP3/index.md#def-tsp3-flattening)に従い、$w$ の基底成分 $w_{ijk}$ を行 $i$、列 $(j,k)$ に置きます。非零成分は $w_{211}=w_{121}=w_{112}=1$ だけです。行を $1,2$、列を $(1,1),(1,2),(2,1),(2,2)$ の順にすると

$$
M=\begin{pmatrix}0&1&1&0\\1&0&0&0\end{pmatrix}.
$$

最初の二列は二次元の標準基底です。冪の平坦化では行添字が長さ $n$ の組 $I=(i_1,\ldots,i_n)$、列添字が $J=(j_1,\ldots,j_n),K=(k_1,\ldots,k_n)$ です。Kronecker積で因子位置をまとめるため、行列の各成分は

$$
M^{(n)}_{I,(J,K)}
=\prod_{\ell=1}^n w_{i_\ell j_\ell k_\ell}
=\prod_{\ell=1}^n M_{i_\ell,(j_\ell,k_\ell)}.
$$

従って行数は $2^n$、列数は $4^n$ です。

各回で最初の二列のどちらかを選んで作る $2^n$ 列は、各行添字列に対して一つだけ1を持つ標準基底を全て一回ずつ与えます。よって独立です。

行数も $2^n$ なので平坦化の階数は $2^n$、従って

$$
2^n\le R(w^{\boxtimes n})\le(2n+1)2^n.
$$

$n$ 乗根の両端は2へ収束するため $\widetilde R(w)=2<3=R(w)$ です。劣階数については、別の方向に対角テンソルを取り出す問題なのでこの等式から同じ値とは結論できません。

## 6. 演習

### Level A

<a id="ex-tsp9-a01"></a>

#### TSP9-A01 下限と極限
- Level: A
- ID: TSP9-A01

$a_n=3n+2$ は劣加法的か。$a_n/n$ の極限と下限を求めよ。

<!-- solution-start -->
##### 詳細解答

$a_{m+n}=3m+3n+2$、$a_m+a_n=3m+3n+4$ なので劣加法的です。

$a_n/n=3+2/n$ は3より大きく、任意の $\delta>0$ に対して $n>2/\delta$ なら $3+\delta$ 未満になります。

従って下限は3、極限も3です。[Fekete補題](#lem-tsp9-fekete)の下限有限という仮定を満たします。
<!-- solution-end -->

<a id="ex-tsp9-a02"></a>

#### TSP9-A02 有限回での評価
- Level: A
- ID: TSP9-A02

非零テンソル $t$ で $R(t)=5$、$R(t^{\boxtimes 2})\le21$、$Q(t^{\boxtimes 3})\ge27$ とする。漸近階数の上界と漸近劣階数の下界を求めよ。

<!-- solution-start -->
##### 詳細解答

[テンソル冪の階数と劣階数の増大率](#thm-tsp9-limit-existence)の下限の式で $k=2$ を選ぶと

$$
\widetilde R(t)\le R(t^{\boxtimes2})^{1/2}\le\sqrt{21}<5.
$$

上限の式で $k=3$ を選ぶと

$$
\widetilde Q(t)\ge Q(t^{\boxtimes3})^{1/3}\ge27^{1/3}=3.
$$

これは極限の上界・下界であって、等号までは主張していません。
<!-- solution-end -->

<a id="ex-tsp9-a03"></a>

#### TSP9-A03 定数係数の回収
- Level: A
- ID: TSP9-A03

同じ複素有限次元ベクトル空間の係数 $u,v,w$ に対し、$P(z)=u+zv+z^2w$ とする。$P(1),P(2),P(3)$ だけから $u$ を回収せよ。

<!-- solution-start -->
##### 詳細解答

[多項式の係数回収](#lem-tsp9-coefficient-recovery)に $N=2$、$z_0=1,z_1=2,z_2=3$ を入れ、補間多項式を $z=0$ で評価すると

$$
L_0(0)=\frac{(-2)(-3)}{(-1)(-2)}=3,\quad
L_1(0)=\frac{(-1)(-3)}{1(-1)}=-3,
$$

$$
L_2(0)=\frac{(-1)(-2)}{2\cdot1}=1.
$$

よって $u=3P(1)-3P(2)+P(3)$ です。直接展開しても、$u$ の係数は $3-3+1=1$、$v$ の係数は $3-6+3=0$、$w$ の係数は $3-12+9=0$ になります。
<!-- solution-end -->

<a id="ex-tsp9-a04"></a>

#### TSP9-A04 対角テンソルの指数
- Level: A
- ID: TSP9-A04

三因子の対角テンソル $D_4$ について、漸近階数、漸近劣階数と自然対数での増大指数を求めよ。

<!-- solution-start -->
##### 詳細解答

[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations)によって冪は $D_{4^n}$ と制限同値です。

[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction)に $r=4^n$ を代入すると階数は $4^n$ です。これは $4^n$ 項の分解と、平坦化に現れる $4^n$ 本の独立な標準基底列による下界が一致した結果です。

恒等写像により $D_{4^n}$ 自身が取り出せるため[劣階数の定義](../TSP4/index.md#def-tsp4-subrank)から $Q(D_{4^n})\ge4^n$ です。[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)で $Q\le R$ なので劣階数も $4^n$ です。

両方の $n$ 乗根は4で、自然対数を取った指数はともに $\log4$ です。
<!-- solution-end -->

### Level B

<a id="ex-tsp9-b01"></a>

#### TSP9-B01 優加法性がある場合
- Level: B
- ID: TSP9-B01

$b_n=5n-3$ は優加法的か。$e^{b_n/n}$ の上限と極限を求めよ。上限は有限の $n$ で達成されるか。

<!-- solution-start -->
##### 詳細解答

$b_{m+n}=5m+5n-3$ は $b_m+b_n=5m+5n-6$ 以上なので優加法的です。$b_n/n=5-3/n<5$ であり $n\to\infty$ で5へ近づくので上限は5です。[Fekete補題](#lem-tsp9-fekete)の優加法の場合とも一致します。

指数関数の連続性・狭義単調性から $e^{5-3/n}<e^5$ で $e^{5-3/n}\to e^5$。従って上限・極限は $e^5$、有限の $n$ では達成されません。
<!-- solution-end -->

<a id="ex-tsp9-b02"></a>

#### TSP9-B02 反復をブロックにまとめる
- Level: B
- ID: TSP9-B02

$R(t)=4$、$R(t^{\boxtimes3})\le50$ とする。$n=3q+r$（$0\le r<3$）に対する階数の上界を導き、漸近階数の上界を求めよ。

<!-- solution-start -->
##### 詳細解答

[直和・Kronecker積の階数と劣階数の評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)を $q$ 個の三回分のブロックに適用すると、その階数は高々 $50^q$ です。残り $r$ 個はそれぞれ4項以下の分解を持つので全体で

$$
R(t^{\boxtimes n})\le 50^q4^r.
$$

$q=0$ または $r=0$ のときは空の積を1として、存在するブロックだけを掛けます。$q/n=(1-r/n)/3\to1/3$、$r/n\to0$ です。従って

$$
(50^q4^r)^{1/n}=50^{q/n}4^{r/n}
\longrightarrow50^{1/3}.
$$

ゆえに漸近階数は高々 $50^{1/3}$ です。$50<64=4^3$ なので4より厳しい上界です。
<!-- solution-end -->

<a id="ex-tsp9-b03"></a>

#### TSP9-B03 零テンソルと制限
- Level: B
- ID: TSP9-B03

非零テンソル $t$ と同じ因子空間の零テンソル $s$ を取る。$s\preceq t$ と漸近量の単調性を確かめ、逆方向が不可能な理由を述べよ。

<!-- solution-start -->
##### 詳細解答

第1因子に零写像、残りの因子に恒等写像を作用させると全ての単純テンソルが零になります。従って [制限の定義](../TSP4/index.md#def-tsp4-restriction)から $s\preceq t$ です。

全ての正整数冪が零なので $s$ の漸近階数・漸近劣階数は0です。$t$ は非零なので[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)を各冪に適用すると両漸近量は1以上です。これは[漸近階数と漸近劣階数の単調性・冪の公式](#thm-tsp9-asymptotic-monotonicity)と一致します。

逆にどの線形写像のテンソル積も零を零へ写すので非零 $t$ を $s$ から得ることはできません。対数を直接取る議論では零を除外した理由もここにあります。
<!-- solution-end -->

<a id="ex-tsp9-b04"></a>

#### TSP9-B04 退化の次数と費用
- Level: B
- ID: TSP9-B04

非零テンソル $t$ に対し $P(z)=z^3t+z^4h+z^5k$ があり、非零 $z$ で $R(P(z))\le3$ とする。五回分の階数上界と漸近階数上界を求めよ。

<!-- solution-start -->
##### 詳細解答

非零 $z$ では $z^{-3}P(z)=t+zh+z^2k$ です。このスカラー倍は各分解項の第1因子に吸収できるので階数は高々3です。右辺を多項式として扱うと五回のKronecker積の次数は高々10、定数係数は $t^{\boxtimes5}$ です。

相異なる非零11点での値から[多項式の係数回収](#lem-tsp9-coefficient-recovery)で定数係数を回収できます。[Kronecker積の階数評価](../TSP5/index.md#thm-tsp5-rank-subrank-operations)から各点で五回分は高々 $3^5=243$ 項なので、階数上界は $11\cdot243=2673$ です。

一般の $n$ では[多項式退化による漸近階数上界](#thm-tsp9-degeneration-asymptotic)に $m=3,L=2,r=3$ を入れて $(2n+1)3^n$。

$n$ 乗根を取ると追加因子は1へ収束するので漸近階数は高々3です。
<!-- solution-end -->

### Level C

<a id="ex-tsp9-c01"></a>

#### TSP9-C01 三因子テンソルの劣階数を反復で改善する
- Level: C
- ID: TSP9-C01

第5節の $w$ について、二回のKronecker積から $D_2$ を制限で取り出し、漸近劣階数の下界を示せ。第1因子には添字組 $(2,2),(1,1)$、第2因子には $(1,1),(2,1)$、第3因子には $(1,1),(1,2)$ のみを残す射影を使え。

<!-- solution-start -->
##### 詳細解答

各位置の二つの添字組を順に新しい標準基底の第1、第2ベクトルへ写し、他の基底ベクトルは零へ写します。これは各位置の4次元空間から2次元空間への線形写像です。

$w$ の三項を、添字2が第1、第2、第3因子にある順に $A,B,C$ とします。$w^{\boxtimes2}$ の九項は二文字の選択列に対応します。第1因子の射影で残るのは、両方が $A$ の $AA$、またはどちらも $A$ でない $BB,BC,CB,CC$ です。

$AA$ の添字組は各位置で $(2,2),(1,1),(1,1)$ なので新しい第1ベクトルの三重積に写ります。

残る四項の第2、第3因子の添字組は次です。

| 選択 | 第2因子 | 第3因子 |
| --- | --- | --- |
| $BB$ | $(2,2)$ | $(1,1)$ |
| $BC$ | $(2,1)$ | $(1,2)$ |
| $CB$ | $(1,2)$ | $(2,1)$ |
| $CC$ | $(1,1)$ | $(2,2)$ |

$BC$ だけが両方の射影で残り、第1因子の組は $(1,1)$ なので新しい第2ベクトルの三重積に写ります。従って像は二つの対角成分を係数1で足した $D_2$ です。

[テンソル劣階数](../TSP4/index.md#def-tsp4-subrank)から $Q(w^{\boxtimes2})\ge2$。[テンソル冪の階数と劣階数の増大率](#thm-tsp9-limit-existence)の上限公式で $k=2$ を取ると

$$
\sqrt2\le\widetilde Q(w)\le\widetilde R(w)=2.
$$

一回の $w$ の劣階数は1です。実際、第5節の行列 $M$ と同じく、第2、第3因子を行としても、添字2が一つの三成分が対称な位置にあるため階数2です。従って[劣階数の基本評価](../TSP4/index.md#thm-tsp4-subrank-bounds)より $1\le Q(w)\le2$ です。

仮に $D_2\preceq w$ なら、[制限の定義](../TSP4/index.md#def-tsp4-restriction)によって各因子に線形写像 $A_1,A_2,A_3:\mathbb C^2\to\mathbb C^2$ が存在します（基底で各空間を同一視します）。第1因子を行にした平坦化の各列は、$w$ の第1因子のベクトルの像を線形結合したものです。実際、$w=\sum_{i,j,k=1}^2w_{ijk}e_i\otimes f_j\otimes g_k$ と展開すれば、出力の列 $(b,c)$ は

$$
\sum_{i,j,k=1}^2 w_{ijk}(A_2)_{bj}(A_3)_{ck}A_1e_i
\in\operatorname{im}A_1.
$$

ここで $b,c$ は出力側の第2、第3因子の基底番号で、$(A_2)_{bj},(A_3)_{ck}$ はそれぞれ入力基底 $f_j,g_k$ の像の第 $b,c$ 成分です。$D_2$ の平坦化には標準基底の二列が現れるため、その列空間は2次元全体です。従って $\operatorname{im}A_1=\mathbb C^2$ です。第2、第3因子を行にする場合も、対応する因子の像に全列が含まれ、$D_2$ の平坦化が階数2であるため $\operatorname{im}A_2=\operatorname{im}A_3=\mathbb C^2$ です。

局所写像は2次元から2次元への全射なので可逆となり、逆写像によって $w\preceq D_2$ が従います。

[制限による階数の単調性](../TSP4/index.md#thm-tsp4-restriction-bounds)から $R(w)\le2$ となりますが、[三因子の階数と境界階数が異なる例](../TSP8/index.md#thm-tsp8-w-border-rank)の $R(w)=3$ と矛盾します。従って $Q(w)=1$ です。

このように反復により一回当たりの取り出し能力が改善します。ただし今回の構成は漸近劣階数の正確な値までは決めません。
<!-- solution-end -->

## 7. 次講への接続

階数は対角テンソルから作る費用、劣階数は対角テンソルを取り出す能力を表し、反復するとそれぞれ下限・上限による極限が得られます。次講では直和、Kronecker積、制限による比較を一つの代数的な枠組みで整理します。
