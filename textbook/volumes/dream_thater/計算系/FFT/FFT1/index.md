# FFT1 体上の巡回Fourier変換・文字の直交性・反転

長さ4の列 $(1,2,1,2)$ には、一定の成分と1項ごとに符号が変わる成分が混ざっています。元の列を眺める代わりに、周期的な基本列の係数へ移すと、この二つの成分を分離できます。しかも係数から元の列を厳密に復元できます。

本講では有限列の変換を複素数に限定せず、有限体を含む一般の体で組み立てます。使うのは有限和と乗法の逆元であり、積分や無限級数は必要ありません。複素数の場合の連続解析との関係については、本講の学習後に [FOU5の離散Fourier変換（DFT）](../../../解析系/FOU/FOU5/index.md#def-fou5-dft) を参照できます。

## 1. 周期を持つ基本列を作る

$N\ge2$ を整数、$K$ を[体](../../../代数系/RNG/RNG1/index.md#def-rng1-zero-divisor-domain-field)とします。整数 $N$ を体の中で使うときは $1_K$ を $N$ 回足した元 $N1_K$ を意味します。

素数 $p$ に対する[有限体](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field) $\mathbb F_p=\mathbb Z/p\mathbb Z$ では、整数を $p$ で割った余りで加法・乗法を計算します。

例えば $\mathbb F_5$ では、$4=4\cdot1_K$ であり、

$$
4\cdot4=16=1\quad(\bmod 5)
$$

なので $4^{-1}=4$ です。添字としての整数4と、体の元としての4を区別します。

以下、$1$ は体の単位元 $1_K$ とも書き、非零元 $a$ の $a^{-1}$ は乗法逆元を表します。

体の非零元全体 $K^\times=K\setminus\{0\}$ は乗法についての群です。二つの非零元の積が零にならないのは[体は整域であること](../../../代数系/RNG/RNG1/index.md#prop-rng1-field-domain)によります。結合則・単位元・逆元は体の演算から引き継ぎます。

周期 $N$ の基本列を作るには、$N$ 回掛けると1に戻り、途中では1に戻らない元が欲しくなります。これは乗法群での[元の位数](../../../代数系/GRP/GRP1/index.md#def-grp1-element-order)がちょうど $N$ という条件です。

<a id="def-fft1-primitive-root"></a>

<!-- formal-statement-start -->
> **定義（原始1のN乗根）**
>
> 体 $K$ と整数 $N\ge2$ に対し、$\zeta\in K$ が次を満たすとき、$\zeta$ を原始 $N$ 乗根とする。

$$
\zeta^N=1,\qquad
\zeta^j\ne1\quad(1\le j<N).
$$

> $\zeta^N=1$ から $\zeta\ne0$ である。負の整数冪は $\zeta^{-1}$ を用いて定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fft1-primitive-root -->
**定義の確認**

複素数体では、虚数単位 $i$ を使って $\zeta=-i$ を取ると、冪は順に $1,-i,-1,i,1$ となり、第4冪で初めて1に戻ります。従って原始4乗根です。一方 $-1$ も4乗すると1ですが、第2冪が1なので原始4乗根ではありません。

$\mathbb F_5$ では $\zeta=2$ の冪が $1,2,4,3,1$ と巡回します。最初の正の指数で1になるのは4なので、これも原始4乗根です。
<!-- definition-example-end -->

整数を $N$ で割った余りによって同一視した加法群を $G=\mathbb Z/N\mathbb Z$ とします。[商群](../../../代数系/GRP/GRP2/index.md#def-grp2-quotient-group)の代表元として $0,\ldots,N-1$ を使い、加法は和を $N$ で割った余りで計算します。加法の順序を交換できるので[可換群](../../../代数系/GRP/GRP1/index.md#def-grp1-group)であり、1を繰り返し足して全ての元を得る[巡回群](../../../代数系/GRP/GRP1/index.md#def-grp1-cyclic-group)でもあります。

加法を1進めるごとに一定の倍率を掛ける関数を作ると、周期列を代数的に記述できます。この加法を $K^\times$ の乗法に移す[群準同型](../../../代数系/GRP/GRP2/index.md#def-grp2-homomorphism)が文字です。

<a id="def-fft1-multiplicative-character"></a>

<!-- formal-statement-start -->
> **定義（体に値を取る群の文字）**
>
> 加法で書いた有限可換群 $G$ と体 $K$ に対し、写像 $\chi:G\to K^\times$ が次を満たすとき、$K$ に値を取る文字という。

$$
\chi(0)=1,\qquad
\chi(g+h)=\chi(g)\chi(h)\quad(g,h\in G).
$$

> すなわち加法群から乗法群への準同型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fft1-multiplicative-character -->
**定義の確認**

$G=\mathbb Z/4\mathbb Z$、$K=\mathbb F_5$ に対して $\chi(j)=2^j$ と置きます。代表元を4の倍数だけ変えても $2^4=1$ なので値は変わりません。値は $1,2,4,3$ で全て非零、$\chi(0)=1$ です。積の因子をまとめると $\chi(a+b)=2^{a+b}=2^a2^b$ です。例えば $3+2=1$（法4）に対し $\chi(3)\chi(2)=3\cdot4=2=\chi(1)$（法5）となります。
<!-- definition-example-end -->

原始 $N$ 乗根 $\zeta$ を固定すると、各 $k=0,\ldots,N-1$ に対し $\chi_k(j)=\zeta^{kj}$ が文字になります。代表元の変更に対し $\zeta^{kN}=1$ であり、積の法則と $\chi_k(0)=1$ が成立するからです。$k=0$ は全ての値が1である文字です。

さらに全ての文字はこの形です。

[群準同型の基本性質](../../../代数系/GRP/GRP2/index.md#prop-grp2-hom-basic)を加法から乗法への写像に用いると、$\chi(j)=\chi(1)^j$ です。群では $N\cdot1=0$ なので $\chi(1)^N=1$ です。

一方、$\zeta^k$ は互いに異なる $N$ 個の根です。実際、

$$
\zeta^k=\zeta^\ell\quad\Longrightarrow\quad\zeta^{k-\ell}=1
$$

です。$k\ne\ell$ なら $1\le |k-\ell|<N$ であり、必要なら両辺の逆元を取ることで $\zeta^{|k-\ell|}=1$ となります。これは[原始性](#def-fft1-primitive-root)に反するので $k=\ell$ です。

ここで $f(T)=T^N-1$（$T$ は多項式の不定元）を考えます。次数 $N$ の非零多項式は高々 $N$ 個の相異なる根しか持ちません。

根 $a$ があれば [体上の多項式の除法](../../../代数系/RNG/RNG4/index.md#thm-rng4-division-algorithm) により、ある商 $Q(T)$ を用いて

$$
f(T)=(T-a)Q(T)+f(a)=(T-a)Q(T)
$$

と書けます。別の根 $b$ を代入すると

$$
0=f(b)=(b-a)Q(b).
$$

$b-a\ne0$ なので $Q(b)=0$ です。これを反復すると残りの次数が1ずつ減るため、根の個数は次数以下です。

従って $\chi(1)$ は $N$ 個の根 $\zeta^k$ のどれかであり、全ての文字が列挙できました。

## 2. 異なる文字を足し合わせると消える

基本列が似ていても、互いに区別できなければ係数を取り出せません。異なる文字の比を一周分足すと0になることが鍵です。ここでいう直交性は文字の値の積と乗法逆元による有限和の関係であり、一般の体に内積や複素共役を仮定するものではありません。整数 $r$ に対し $N\mid r$ は $r$ が $N$ の整数倍であることを表します。

<a id="lem-fft1-character-orthogonality"></a>

<!-- formal-statement-start -->
> **補題（巡回群の文字の直交性）**
>
> 体 $K$ に原始 $N$ 乗根 $\zeta$ が存在するとする（$N\ge2$）。整数 $r$ に対し次が成り立つ。

$$
\sum_{j=0}^{N-1}\zeta^{rj}=
\begin{cases}
N1_K,&N\mid r,\\
0,&N\nmid r.
\end{cases}
$$

> 特に $0\le k,\ell<N$ とし、$\chi_k(j)=\zeta^{kj}$ と置けば

$$
\sum_{j=0}^{N-1}\chi_k(j)\chi_\ell(j)^{-1}
=\begin{cases}
N1_K,&k=\ell,\\
0,&k\ne\ell.
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

公比を $q=\zeta^r$ とすると、一周の終点 $q^N$ は1です。$q\ne1$ なら、和を $1-q$ 倍したとき最初と最後だけが残って消えます。

<!-- proof-start -->
### 証明

公比 $q=\zeta^r$ を置きます。整数 $r$ を $N$ で割り $r=aN+b$、$0\le b<N$ と書くと

$$
q=\zeta^{aN+b}=(\zeta^N)^a\zeta^b=\zeta^b.
$$

[原始性](#def-fft1-primitive-root)から $q=1$ と $b=0$ は同値です。

$q=1$ なら和の各項は1なので総和は $N1_K$ です。$q\ne1$ のとき $S=1+q+\cdots+q^{N-1}$ と置きます。

$$
qS=q+q^2+\cdots+q^N,\qquad
(1-q)S=1-q^N=0.
$$

$1-q\ne0$ であり、体では逆元があるので $S=0$ です。最後の主張は $\chi_k(j)\chi_\ell(j)^{-1}=\zeta^{(k-\ell)j}$ と書き、$r=k-\ell$ と置けば得られます。この差の絶対値は $N$ 未満なので $N$ の倍数になるのは0だけです。
<!-- proof-end -->

ここで $N1_K\ne0$ も必要になる理由は、係数を取り出す際に $N$ で割るためです。実は体に原始 $N$ 乗根が存在すればこの条件は自動的に満たされます。

もし[標数](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field)が素数 $p$ で $N1_K=0$ なら $p\mid N$ です。$N=pm$ とおくと

$$
(\zeta^m-1)^p=\zeta^{mp}-1=\zeta^N-1=0.
$$

標数 $p$ は素数であり、$1\le h<p$ の二項係数について

$$
h!\binom ph=p(p-1)\cdots(p-h+1)
$$

が成り立ちます。$p\nmid h!$ なので二項係数は $p$ の倍数です。従って中間項は体の中で零になります。定数項 $(-1)^p=-1$ は $p$ が奇数なら通常の符号計算、$p=2$ なら $1=-1$ によります。

[体は整域であること](../../../代数系/RNG/RNG1/index.md#prop-rng1-field-domain)から非零元の正の整数冪は非零であるため $\zeta^m=1$ となり、$0<m<N$ に反します。

標数0なら正整数 $N$ は零ではありません。以降は適用時に原始性と $N1_K\ne0$ の両方を明記します。

## 3. 変換行列と逆変換

元の列 $x=(x_0,\ldots,x_{N-1})$ を、各文字との積の和へ移します。$K^N$ は $K$ の元を $N$ 個並べた[体上のベクトル空間](../../../代数系/FLD/FLD0/index.md#def-fld0-vector-space-over-field)で、入出力とも列ベクトルとして扱います。

$j$ は入力の添字、$k$ は出力の添字で、どちらも $0,\ldots,N-1$ を走ります。$\sum_j$ のように範囲を省略した場合もこの範囲です。

ここでは順変換に $\zeta^{kj}$ を用います。複素数で負の指数を採用したいときは $\zeta=e^{-2\pi i/N}$ と取ればよく、根の選択を途中で取り替えません。

<a id="def-fft1-field-dft"></a>

<!-- formal-statement-start -->
> **定義（体上の巡回Fourier変換）**
>
> 体 $K$、整数 $N\ge2$、原始 $N$ 乗根 $\zeta\in K$ を固定する。$x\in K^N$ の変換 $X=D_\zeta x\in K^N$ の各成分を次で定める。

$$
X_k=\sum_{j=0}^{N-1}x_j\zeta^{kj},
\qquad 0\le k<N.
$$

> 行列 $D_\zeta$ の第 $k$ 行第 $j$ 列は $\zeta^{kj}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fft1-field-dft -->
**定義の確認**

行列表示を使う理由を確認します。$e_j$ を第 $j$ 成分だけが1で他は0の列とすると、これらは $K^N$ の[標準基底](../../../代数系/FLD/FLD0/index.md#def-fld0-basis-over-field)です。任意の列は

$$
x=\sum_{j=0}^{N-1} x_j e_j
$$

と書けます。変換の定義式に $e_j$ を代入したとき、第 $k$ 成分は $\zeta^{kj}$ になります。

従ってこの値を第 $k$ 行第 $j$ 列に置けば、通常の行列積の第 $k$ 成分が

$$
(D_\zeta x)_k=\sum_{j=0}^{N-1}(D_\zeta)_{kj}x_j
=\sum_{j=0}^{N-1}\zeta^{kj}x_j
$$

となり、定義式と一致します。つまり第 $j$ 列は $e_j$ の変換であり、基底と成分の対応が定まっています。

$N=4,\ K=\mathbb C,\ \zeta=-i$ では、第1節で原始4乗根であることを確かめました。各行に $1,\zeta^k,\zeta^{2k},\zeta^{3k}$ を並べると

$$
D_\zeta=
\begin{pmatrix}
1&1&1&1\\
1&-i&-1&i\\
1&-1&1&-1\\
1&i&-1&-i
\end{pmatrix}.
$$

入力 $(1,2,1,2)$ に対し、行ごとに積和を作ります。

$$
X_0=1+2+1+2=6,\qquad X_1=1-2i-1+2i=0.
$$

$$
X_2=1-2+1-2=-2,\qquad X_3=1+2i-1-2i=0.
$$

4個の値が得られ、各値は定義通りの4項の和です。
<!-- definition-example-end -->

変換は[体上の線形写像](../../../代数系/FLD/FLD0/index.md#def-fld0-linear-map-over-field)です。実際 $a,b\in K$ と $x,y\in K^N$ に対し、成分 $k$ で

$$
\sum_j(ax_j+by_j)\zeta^{kj}
=a\sum_jx_j\zeta^{kj}+b\sum_jy_j\zeta^{kj}
$$

となります（各和の範囲は $0\le j<N$）。計算方法を工夫する後続講でも、この行列が表す線形写像そのものは変えません。

逆変換では、$D_{\zeta^{-1}}$ は根を $\zeta^{-1}$ に取り替えた行列を、$(D_\zeta)^{-1}$ は行列 $D_\zeta$ の逆行列（存在するとき）を表します。$N^{-1}$ は体の元 $N1_K$ の乗法逆元です。

<a id="thm-fft1-field-inversion"></a>

<!-- formal-statement-start -->
> **定理（体上の巡回Fourier反転）**
>
> 体 $K$、整数 $N\ge2$、$N1_K\ne0$、原始 $N$ 乗根 $\zeta\in K$ とする。$D_\zeta$ を成分 $\zeta^{kj}$ の $N\times N$ 行列とすると

$$
(D_\zeta)^{-1}=N^{-1}D_{\zeta^{-1}}.
$$

> すなわち $X=D_\zeta x$ に対し

$$
x_j=N^{-1}\sum_{k=0}^{N-1}X_k\zeta^{-kj}
\quad(0\le j<N).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$X_k$ に逆向きの冪を掛け、全ての $k$ について足します。[文字の直交性](#lem-fft1-character-orthogonality)によって欲しい入力成分以外の係数が全て消えます。残る係数は $N$ なので、逆元を掛けて1にします。

<!-- proof-start -->
### 証明

$j,m\in\{0,\ldots,N-1\}$ とします。行列積の第 $(j,m)$ 成分は

$$
(D_{\zeta^{-1}}D_\zeta)_{jm}
=\sum_{k=0}^{N-1}\zeta^{-jk}\zeta^{km}
=\sum_{k=0}^{N-1}\zeta^{k(m-j)}.
$$

[巡回群の文字の直交性](#lem-fft1-character-orthogonality)を $r=m-j$ に適用すると、$m=j$ では $N1_K$、$m\ne j$ では0です。従って $D_{\zeta^{-1}}D_\zeta=NI_N$ です。ここで $I_N$ は $N$ 次単位行列です。

$\zeta^{-1}$ も原始 $N$ 乗根です。実際その第 $r$ 冪が1なら $\zeta^r=1$ であり、最小の正整数 $r$ は $N$ です。根を $\zeta^{-1}$ として今の計算をもう一度適用すると $D_\zeta D_{\zeta^{-1}}=NI_N$ です。$N1_K$ の逆元を掛けることで両側の逆行列が得られます。

成分でも確認します。$X_k$ の定義を代入すると

$$
N^{-1}\sum_k X_k\zeta^{-kj}
=N^{-1}\sum_k\sum_m x_m\zeta^{k(m-j)}
$$

です。有限和なので和の順序を交換でき、

$$
=N^{-1}\sum_m x_m\sum_k\zeta^{k(m-j)}
=N^{-1}x_jN=x_j.
$$

全ての和は $0,\ldots,N-1$ を走り、最後に[文字の直交性](#lem-fft1-character-orthogonality)を $r=m-j$ に適用しました。
<!-- proof-end -->

例えば先ほどの $(6,0,-2,0)$ を[反転公式](#thm-fft1-field-inversion)で逆変換すると

$$
x_j=\tfrac14(6-2(-1)^j).
$$

偶数 $j$ では1、奇数 $j$ では2となり、元の列を復元できます。

### 有限体でも実際に戻せる

$\mathbb F_5$、$N=4$、$\zeta=2$ とし、入力 $x=(1,2,0,0)$ を考えます。根の冪は $1,2,4,3$ なので $X_k=1+2\zeta^k$ から

$$
X=(3,0,4,2)
$$

を得ます。$\zeta^{-1}=3$、$4^{-1}=4$ です。[反転公式](#thm-fft1-field-inversion)で使う、逆向きの根に対応する行列（まだ $4^{-1}$ を掛けていないもの）は

$$
D_3=\begin{pmatrix}
1&1&1&1\\
1&3&4&2\\
1&4&1&4\\
1&2&4&3
\end{pmatrix}.
$$

$X=(3,0,4,2)$ との行ごとの積和を整数で書いてから法5で計算します。

$$
\begin{pmatrix}
3+0+4+2\\
3+0+16+4\\
3+0+4+8\\
3+0+16+6
\end{pmatrix}
=
\begin{pmatrix}9\\23\\15\\25\end{pmatrix}
=
\begin{pmatrix}4\\3\\0\\0\end{pmatrix}
\quad(\bmod 5).
$$

これを $4^{-1}=4$ 倍すると $1,2,0,0$ に戻ります。

### 仮定を外すと何が壊れるか

$\mathbb F_3$ で $N=4$ とすると $4=1$ なので割れますが、非零元は1と2のみで $2^2=1$ です。原始4乗根は存在しません。根を無理に2にすると第0行と第2行が同じになり、例えば $x=(1,0,-1,0)$ が零へ移ります。反転は不可能です。

$\mathbb F_2$ で $N=2$ とすると $2=0$ であり、根1しかありません。二つの出力がともに $x_0+x_1$ になり、$(1,1)$ と $(0,0)$ を区別できません。直交性の対角値を1へ戻す操作もできません。

## 4. 正規化と複素数特有の対称性

反転に現れる $N^{-1}$ を逆向きの計算に全て持たせるのが本講の規約です。順変換を $aD_\zeta$、逆変換を $bD_{\zeta^{-1}}$（$a,b\in K$）としたい場合、[反転定理](#thm-fft1-field-inversion)で示した両向きの行列積が $NI_N$ であることを使います。

$$
(bD_{\zeta^{-1}})(aD_\zeta)=abNI_N.
$$

逆の順序でも同じ積になるため、これが単位行列になる条件 $abN=1$ が必要十分です。従って順方向を $N^{-1}D_\zeta$、逆方向を $D_{\zeta^{-1}}$ としてもよいです。

両向きで同じ係数を使うには $c^2N=1$ が必要で、そのような $c$ が体にあるとは限りません。

例えば $\mathbb F_3$ で $N=2,\zeta=-1$ は反転可能ですが、$c^2=2$ は解を持ちません（非零元1と2の平方はどちらも1）。複素数なら $c=1/\sqrt N$ を選べます。

複素数に戻ると、$\zeta^N=1$ より $|\zeta|^N=1$、絶対値は非負の実数なので $|\zeta|=1$ です。$\overline{z}$ は複素数 $z$ の複素共役を表します。

$$
\zeta\overline{\zeta}=|\zeta|^2=1
$$

なので $\overline{\zeta}=\zeta^{-1}$ です。これは一般の体の文字には要求していません。

$(-k)\bmod N$ は整数 $-k$ を $N$ で割った余り（$0,\ldots,N-1$ のいずれか）を表します。実数値の列には次の対称性があります。

<a id="prop-fft1-real-conjugate-symmetry"></a>

<!-- formal-statement-start -->
> **命題（実数値列の共役対称性）**
>
> 整数 $N\ge2$、$x\in\mathbb R^N$、$\zeta=e^{-2\pi i/N}$ とし、各 $0\le k<N$ について

$$
X_k=\sum_{j=0}^{N-1}x_j\zeta^{kj}
$$

> とする。

$$
X_{(-k)\bmod N}=\overline{X_k}
\quad(0\le k<N).
$$

> 特に $X_0$ は実数であり、$N$ が偶数なら $X_{N/2}$ も実数である。
<!-- formal-statement-end -->

### 証明の見取り図

入力が実数なので、共役を取っても入力成分は変わらず、根の冪の符号だけが逆になります。

<!-- proof-start -->
### 証明

各 $x_j$ は実数なので $\overline{x_j}=x_j$ です。複素共役は和と積を保ち、$\overline{\zeta}=\zeta^{-1}$ だから

$$
\overline{X_k}=\sum_j x_j\zeta^{-kj}.
$$

ある整数 $t$ について $(-k)\bmod N=-k+tN$ と書けるので、

$$
\zeta^{(-k+tN)j}
=\zeta^{-kj}(\zeta^N)^{tj}
=\zeta^{-kj}
$$

です。従って右辺は $X_{(-k)\bmod N}$ です。$k=0$ または偶数 $N$ の $k=N/2$ では添字が自分自身に戻り、値が自分の共役と等しいため実数です。
<!-- proof-end -->

例えば $x=(1,2,0,0)$、$\zeta=-i$ なら $X=(3,1-2i,-1,1+2i)$ です。第1成分と第3成分は互いに共役で、第0・第2成分は実数です。$\mathbb F_5$ 上の先ほどの変換にはこの複素共役による関係を課せません。

次講では、巡回群を複数組み合わせて有限可換群へ変換を広げます。今回の「文字の積の和が対角だけを残す」という仕組みが、群を変えても成り立つ条件を調べます。

## 5. 演習

### Level A

<a id="ex-fft1-a01"></a>

#### FFT1-A01 根の位数
- Level: A
- ID: FFT1-A01

$\mathbb F_7$ で $2,3,6$ の乗法の位数を計算し、どれが原始6乗根か答えよ。

<!-- solution-start -->
##### 詳細解答

[原始1のN乗根](#def-fft1-primitive-root)の条件に従い、法7で最初に1となる正の冪を探します。2の冪は $2,4,1$ なので位数3です。3の冪は $3,2,6,4,5,1$ なので位数6です。6の冪は $6,1$ なので位数2です。従って原始6乗根は3だけです。
<!-- solution-end -->

<a id="ex-fft1-a02"></a>

#### FFT1-A02 文字の表と直交性
- Level: A
- ID: FFT1-A02

$\mathbb F_7$ 上で $N=3,\zeta=2$ とする。$\chi_0,\chi_1,\chi_2$ の値を表にし、$\sum_j\chi_1(j)\chi_2(j)^{-1}$ を直接計算せよ。

<!-- solution-start -->
##### 詳細解答

法7で $2^3=1$、$2^1=2\ne1$、$2^2=4\ne1$ なので[原始3乗根の条件](#def-fft1-primitive-root)を満たします。第1節の文字の表示 $\chi_k(j)=\zeta^{kj}$ に従い、各行に値を並べると次になります。

| $k$ | $j=0$ | $j=1$ | $j=2$ |
| --- | --- | --- | --- |
| 0 | 1 | 1 | 1 |
| 1 | 1 | 2 | 4 |
| 2 | 1 | 4 | 2 |

法7で $4^{-1}=2$、$2^{-1}=4$ です。求める和は $1+2\cdot2+4\cdot4=21=0$ です。[文字の直交性](#lem-fft1-character-orthogonality)の非対角の場合と一致します。
<!-- solution-end -->

<a id="ex-fft1-a03"></a>

#### FFT1-A03 4点の順変換
- Level: A
- ID: FFT1-A03

$K=\mathbb C,\ N=4,\zeta=-i$ のとき、$x=(2,1,0,-1)$ の順変換を求めよ。

<!-- solution-start -->
##### 詳細解答

[体上の巡回Fourier変換](#def-fft1-field-dft)の各行を入力に掛けます。

$$
X_0=2+1+0-1=2,\quad X_1=2-i-i=2-2i.
$$

$$
X_2=2-1+0+1=2,\quad X_3=2+i+i=2+2i.
$$

従って $X=(2,2-2i,2,2+2i)$ です。
<!-- solution-end -->

<a id="ex-fft1-a04"></a>

#### FFT1-A04 逆変換の係数
- Level: A
- ID: FFT1-A04

$\mathbb F_7$ 上で $N=3,\zeta=2$ とする。順変換が $(3,3,3)$ であるとき元の列を求めよ。

<!-- solution-start -->
##### 詳細解答

根の条件は[FFT1-A02](#ex-fft1-a02)と同じで、$3^{-1}=5$、$\zeta^{-1}=4$ です。[体上の巡回Fourier反転](#thm-fft1-field-inversion)により

$$
x_0=5(3+3+3)=45=3.
$$

$$
x_1=5(3+3\cdot4+3\cdot2)=105=0.
$$

$$
x_2=5(3+3\cdot2+3\cdot4)=105=0.
$$

従って元の列は $(3,0,0)$ です。順変換では全ての成分に $3\zeta^{k\cdot0}=3$ が現れることからも確認できます。
<!-- solution-end -->

### Level B

<a id="ex-fft1-b01"></a>

#### FFT1-B01 文字の一周和
- Level: B
- ID: FFT1-B01

有限加法可換群 $G$ と体 $K$、恒等的に1ではない文字 $\chi:G\to K^\times$ を考える。$S=\sum_{g\in G}\chi(g)=0$ を、巡回群の冪表示を使わず証明せよ。

<!-- solution-start -->
##### 詳細解答

恒等的に1ではないので、ある $h\in G$ で $\chi(h)\ne1$ です。$g\mapsto g+h$ は逆写像 $g\mapsto g-h$ を持つので全単射です。従って

$$
S=\sum_{g\in G}\chi(g+h).
$$

[文字の定義](#def-fft1-multiplicative-character)を右辺へ代入すると

$$
S=\sum_{g\in G}\chi(g)\chi(h)=S\chi(h).
$$

移項して $(1-\chi(h))S=0$ となります。$1-\chi(h)$ は非零なので体の中で逆元を掛ければ $S=0$ です。
<!-- solution-end -->

<a id="ex-fft1-b02"></a>

#### FFT1-B02 原始性を失う変換
- Level: B
- ID: FFT1-B02

$K=\mathbb C,\ N=6$ とし、$\zeta$ は原始3乗根とする。行列 $D=(\zeta^{kj})_{0\le k,j<6}$ の階数を求め、零へ移る非零入力を一つ作れ。

<!-- solution-start -->
##### 詳細解答

$\zeta^{k(j+3)}=\zeta^{kj}$ なので第 $j$ 列と第 $j+3$ 列（$j=0,1,2$）が一致します。行列の階数は列が張る空間（線形写像の像）の[次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)です。従って列の張る空間は最初の3列で張られ、階数は高々3です。

最初の3行・3列の部分行列は3点の変換行列で、根は原始3乗根、$3\ne0$ です。[体上の巡回Fourier反転](#thm-fft1-field-inversion)により可逆です。従って最初の3列の線形結合が零なら、最初の3成分に制限しても零であるため係数は全て0です。階数は少なくとも3で、結局3です。

第0列と第3列が一致するため、$x=(1,0,0,-1,0,0)$ に対して $(Dx)_k=1-\zeta^{3k}=0$ です。非零入力が零へ移るので逆変換は作れません。
<!-- solution-end -->

<a id="ex-fft1-b03"></a>

#### FFT1-B03 二つの正規化
- Level: B
- ID: FFT1-B03

$\mathbb F_7$ で $N=3,\zeta=2$ とする。順逆両向きに同じ非零係数 $c$ を掛ける正規化が存在するか。存在しなければ、別の順逆係数の組を与えよ。

<!-- solution-start -->
##### 詳細解答

$N=3$ は可逆で根も原始3乗根なので、[反転定理](#thm-fft1-field-inversion)の行列積は $D_{\zeta^{-1}}D_\zeta=3I_3$ です。正規化した積が単位行列になるには $3c^2=1$、すなわち $c^2=5$ が必要です。

法7で非零元 $1,2,3,4,5,6$ の平方は順に $1,4,2,2,4,1$ です。5は含まれず、そのような $c$ は存在しません。順変換係数を1、逆変換係数を5とすれば $1\cdot5\cdot3=15=1$ であり、反転できます。
<!-- solution-end -->

<a id="ex-fft1-b04"></a>

#### FFT1-B04 共役対称性から実数値列を復元する
- Level: B
- ID: FFT1-B04

複素数体で $N=4,\zeta=-i$ とする。$X=(6,2-i,0,2+i)$ は実数値列の順変換になり得るか。逆変換を全成分計算せよ。また $x=(i,0,0,0)$ では共役対称性が成立するか。

<!-- solution-start -->
##### 詳細解答

[実数値列の共役対称性](#prop-fft1-real-conjugate-symmetry)の必要条件は満たします。十分かどうかは[反転公式](#thm-fft1-field-inversion)で確かめます。$4^{-1}=1/4$、逆向きの根は $i$ なので

$$
x_0=\tfrac14(6+2-i+0+2+i)=\tfrac52.
$$

$$
x_1=\tfrac14(6+i(2-i)-i(2+i))
=\tfrac14(6+1+1)=2.
$$

$$
x_2=\tfrac14(6-(2-i)-(2+i))=\tfrac12.
$$

$$
x_3=\tfrac14(6-i(2-i)+i(2+i))
=\tfrac14(6-1-1)=1.
$$

従って実数値列 $(5/2,2,1/2,1)$ が得られます。逆変換は順変換の逆写像なので、この列の順変換は指定された $X$ です。

一方 $x=(i,0,0,0)$ なら $X_k=i$ が全ての $k$ で成立します。$X_0=i\ne-i=\overline{X_0}$ なので共役対称性は成立しません。入力が実数という仮定を落とすと、共役を取ったときに入力値自体が変わります。
<!-- solution-end -->

### Level C

<a id="ex-fft1-c01"></a>

#### FFT1-C01 基本列の係数を抽出する
- Level: C
- ID: FFT1-C01

体 $K$ は原始 $N$ 乗根 $\zeta$ を含み、$N1_K\ne0$ とする（$N\ge2$）。$u^{(r)}_j=\zeta^{-rj}$（$0\le r,j<N$）と置く。

1. $D_\zeta u^{(r)}$ の全成分を求めよ。
2. $u^{(0)},\ldots,u^{(N-1)}$ が $K^N$ の基底になることを示し、任意の列 $x$ の係数を順変換から求めよ。
3. $K=\mathbb C,\ N=4,\zeta=-i,\ x=(1,0,-1,0)$ について係数を全て計算し、復元せよ。

<!-- solution-start -->
##### 詳細解答

1. [文字の直交性](#lem-fft1-character-orthogonality)を使います。成分 $k$ は

$$
(D_\zeta u^{(r)})_k=\sum_{j=0}^{N-1}\zeta^{(k-r)j}.
$$

$k=r$ なら $N$、$k\ne r$ なら0です。

2. 線形結合 $\sum_r a_r u^{(r)}=0$ に $D_\zeta$ を掛け、第 $k$ 成分を調べます。1の結果と[線形写像の性質](../../../代数系/FLD/FLD0/index.md#def-fld0-linear-map-over-field)により

$$
0=\sum_r a_r(D_\zeta u^{(r)})_k=Na_k.
$$

$N$ は可逆なので全ての係数が零となり、[一次独立](../../../代数系/FLD/FLD0/index.md#def-fld0-basis-over-field)です。$K^N$ は標準基底が $N$ 本なので次元 $N$ です。[基底延長の定理](../../../代数系/FLD/FLD0/index.md#thm-fld0-steinitz-basis-extension-over-field)によりこの一次独立な $N$ 本を基底へ延長できますが、基底の本数は $N$ なので追加する元はありません。従って既に基底です。

任意の列 $x$ の基底表示に順変換を掛けると、

$$
x=\sum_r a_r u^{(r)},\qquad X_k=Na_k.
$$

従って $a_k=N^{-1}X_k$ であり、

$$
x_j=\sum_{r=0}^{N-1}a_r\zeta^{-rj}
$$

と復元できます。

3. 順変換の第 $k$ 成分は $1-\zeta^{2k}=1-(-1)^k$ です。従って $X=(0,2,0,2)$ であり係数は $(0,1/2,0,1/2)$ です。復元式は

$$
x_j=\tfrac12 i^j+\tfrac12 i^{3j}.
$$

$j=0$ では1、$j=1$ では $(i-i)/2=0$、$j=2$ では $(-1-1)/2=-1$、$j=3$ では $(-i+i)/2=0$ です。指定された列と一致します。
<!-- solution-end -->

## 参考文献

- E. M. Stein, R. Shakarchi, *Fourier Analysis: An Introduction*, Princeton University Press, 2003, Chapter 7（有限群のFourier解析）。
- C. Van Loan, *Computational Frameworks for the Fast Fourier Transform*, SIAM, 1992, Chapter 1（変換行列と計算）。
