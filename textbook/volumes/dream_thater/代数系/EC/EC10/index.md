# EC10 Hasse–Weil L関数と局所因子

[EC8の有限体ゼータ関数](../EC8/index.md#thm-ec8-zeta-rational)は、一つの有限体上で点数をまとめる有理関数でした。一方、[EC9の整数モデルと還元](../EC9/index.md#def-ec9-integral-model)から、同じ $E/\mathbb Q$ を素数 $2,3,5,7,\ldots$ で還元すると、素数ごとに異なる情報が得られることを学びました。これらを一本の関数へ集めたいのですが、特異になる悪い素数へ「非特異な有限体楕円曲線の公式」をそのまま当てはめることはできません。

この章では、**素数ごとの情報を局所因子に翻訳する規則**を最初に確認し、それらを掛け合わせた Hasse–Weil $L$ 関数を構成します。無限積はどこでも収束するわけではありません。どこまでが[ANT2のEuler積](../../ANT/ANT2/index.md#thm-ant2-euler-product)と[EC8のHasse評価](../EC8/index.md#thm-ec8-hasse)から証明でき、解析接続や関数等式にどこから別の大定理が必要なのかを分けて進みます。

以下、$E/\mathbb Q$ は非特異な楕円曲線、$p$ は有理素数とします。$s=\sigma+it$（$\sigma=\operatorname{Re}s$）に対して $p^{-s}=\exp(-s\log p)$ と定め、$\log p$ は実数の自然対数とします。[EC9の導手](../EC9/index.md#def-ec9-conductor)を $N_E$ と書きます。

## 1. 良い素数では点数が二次式を決める

[良い還元の定義](../EC9/index.md#def-ec9-good-reduction)を満たす素数では、非特異な還元曲線 $\widetilde E/\mathbb F_p$ を選べます。これに[有限体の有理点の定義](../EC7/index.md#def-ec7-rational-points)を適用して、無限遠点も含む $\#\widetilde E(\mathbb F_p)$ を数えます。良いモデルを取り替えても同じ楕円曲線の還元として同型になるので、この点数は選んだ良いモデルに依りません。

<a id="def-ec10-good-local-polynomial"></a>

<!-- formal-statement-start -->
> **定義（良い素数の局所係数とEuler多項式）**  
> $E/\mathbb Q$ が素数 $p$ で良い還元を持つとする。$p$-整な良い還元 $\widetilde E/\mathbb F_p$ に対し

$$
a_p(E)=p+1-\#\widetilde E(\mathbb F_p),\qquad
P_p(E,T)=1-a_p(E)T+pT^2
$$

> と定める。$P_p(E,T)$ をその素数の良い局所Euler多項式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec10-good-local-polynomial -->
**定義の確認**。$E:y^2=x^3+x+1$ は判別式 $\Delta=-496$ なので $p=5$ で良い還元です。[EC1の判別式判定](../EC1/index.md#thm-ec1-discriminant-criterion)が、以下の点数計算を非特異曲線に対して行ってよい根拠になります。$\mathbb F_5$ の平方数は $0,1,4$ で、$x=0,1,2,3,4$ を代入すると右辺は順に $1,3,1,1,4$。したがって $y$ の個数は $2,0,2,2,2$ で、無限遠点を加え

$$
\#\widetilde E(\mathbb F_5)=1+2+0+2+2+2=9,\qquad
a_5=5+1-9=-3.
$$

よって $P_5(E,T)=1+3T+5T^2$ です。非特異性、点数の数え方、一次係数、二次係数をそれぞれ確認しました。
<!-- definition-example-end -->

なぜ二次式なのでしょうか。[EC8のFrobeniusの根](../EC8/index.md#def-ec8-frobenius-roots)を $\alpha_p,\beta_p$ と書くと、$\alpha_p+\beta_p=a_p$、$\alpha_p\beta_p=p$ なので

$$
P_p(E,T)=(1-\alpha_pT)(1-\beta_pT).
$$

この式は、[EC8のゼータ関数の有理表示](../EC8/index.md#thm-ec8-zeta-rational)

$$
Z(\widetilde E/\mathbb F_p,T)
=\frac{1-a_pT+pT^2}{(1-T)(1-pT)}
$$

の分子に相当します。有限体の点数という「数え上げ」の情報が、無限積へ入れる多項式になりました。

## 2. 悪い素数は節点と尖点で一次式・定数になる

[EC9の還元型](../EC9/index.md#def-ec9-reduction-types)では、最小モデルの特異な還元を節点型（乗法的）と尖点型（加法的）に分けました。節点ではさらに、二本の接線が $\mathbb F_p$ にあるかどうかが重要でした。良い素数の二次式をそのまま使わず、ここで局所の規則を定義します。EC9では $p\ge5$ の節点・尖点を具体的に判定しました。$p=2,3$ でも一般の局所還元理論により同じ三類型（乗法的還元では分裂・非分裂）を区別しますが、その判定には一般WeierstrassモデルとTateのアルゴリズム等の追加理論が必要です。本章の局所因子の規則はこれら小素数にも適用するものの、その分類を初等判別式の計算だけで導いたとは扱いません。

<a id="def-ec10-bad-local-polynomial"></a>

<!-- formal-statement-start -->
> **定義（悪い素数の局所Euler多項式）**  
> $E/\mathbb Q$ が素数 $p$ で悪い還元を持つとする。[EC9で定義した還元型](../EC9/index.md#def-ec9-reduction-types)に応じて

$$
P_p(E,T)=
\begin{cases}
1-T,&\text{分裂乗法的還元},\\
1+T,&\text{非分裂乗法的還元},\\
1,&\text{加法的還元}
\end{cases}
$$

> と定める。乗法的還元では $\varepsilon_p=1$（分裂）または $-1$（非分裂）と置けば $P_p(E,T)=1-\varepsilon_pT$ である。加法的還元に対しては $\varepsilon_p$ を符号として使わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec10-bad-local-polynomial -->
**定義の確認**。EC9で判別式・最小性・特異点の二次部分を検査した次の三曲線を $p=5$ で使います。

| $E/\mathbb Q$ | 5での還元 | 局所多項式 |
| --- | --- | --- |
| $y^2=x^3+x^2+5$ | 二次部分 $y^2-x^2$、分裂節点 | $1-T$ |
| $y^2=x^3+2x^2+5$ | 二次部分 $y^2-2x^2$、非分裂節点 | $1+T$ |
| $y^2=x^3+5$ | 二次部分 $y^2$、尖点 | $1$ |

最初の二曲線は $v_5(\Delta)=1<12$、三番目は $v_5(\Delta)=2<12$ なので、[EC9の最小性判定](../EC9/index.md#prop-ec9-minimal-criterion)を使えることも重要です。判別式の指数だけで接線の分裂性を決めたのではありません。
<!-- definition-example-end -->

この規則には、直接数えられる意味もあります。特異な射影三次曲線 $C/\mathbb F_p$ の点から特異点を除いた部分を $C^{\mathrm{sm}}$ と書きます。ここで sm は「滑らかな点だけ」という意味です。EC9の節点の曲線

$$
C_c:\quad y^2=x^2(x+c),\qquad c\in\mathbb F_p^\times,\quad p\ne2
$$

では $(0,0)$ を除いた点に $u=y/x$ を用い、$x=u^2-c$、$y=u(u^2-c)$ と復元できます。$u^2=c$ の値は除外し、さらに無限遠点 $O$ を加えます。この「除外する $u$」が $\mathbb F_{p^n}$ の中に二つあるかどうかを数えれば、拡大体上の点数も決まります。

<a id="prop-ec10-singular-smooth-counts"></a>

<!-- formal-statement-start -->
> **命題（節点・尖点の非特異部分の点数）**  
> 奇素数 $p$ と $c\in\mathbb F_p^\times$ に対し $C_c:y^2=x^2(x+c)$ とする。$q=p^n$（$n\ge1$）として、
>
> (i) $c$ が $\mathbb F_p$ の平方なら $\#C_c^{\mathrm{sm}}(\mathbb F_q)=q-1$。
>
> (ii) $c$ が $\mathbb F_p$ の非平方なら $\#C_c^{\mathrm{sm}}(\mathbb F_q)=q-(-1)^n$。
>
> (iii) $D:y^2=x^3$ については $\#D^{\mathrm{sm}}(\mathbb F_q)=q$。
<!-- formal-statement-end -->

### 証明の見取り図

節点では $u=y/x$ と無限遠点を使い、$q+1$ 個から $u^2=c$ の二根を引きます。非平方元は奇数次拡大では非平方、偶数次拡大では平方となります。尖点では $u=y/x$ から $(x,y)=(u^2,u^3)$ と表示し、$u=0$ を除きます。

<!-- proof-start -->
### 証明

節点のアフィン式を $F=y^2-x^3-cx^2$ とすると $(0,0)$ は $F=F_x=F_y=0$ を満たし、$c\ne0$ なので唯一の特異点です。非特異なアフィン点では $x\ne0$、従って

$$
u=\frac yx,\quad u^2=x+c,\quad
x=u^2-c,\quad y=u(u^2-c)
$$

が成り立ちます。逆に $u^2\ne c$ なら右辺は $x\ne0$ の非特異点を一意に作ります。無限遠点は非特異なので、根の個数を $r_q(c)=\#\{u\in\mathbb F_q:u^2=c\}$ として

$$
\#C_c^{\mathrm{sm}}(\mathbb F_q)
=(q-r_q(c))+1=q+1-r_q(c).
$$

$c$ が $\mathbb F_p$ で平方なら $\mathbb F_q$ でも平方で $r_q(c)=2$、(i) が従います。非平方の場合は、[有限体の乗法群の巡回性](../../FLD/FLD3/index.md#thm-fld3-multiplicative-group-cyclic)から平方判定を導きます。奇数 $q$ の乗法群の生成元を $g$ とすると、

$$
\mathbb F_q^\times=\langle g\rangle,\quad
g^{q-1}=1,\quad g^{(q-1)/2}=-1.
$$

任意の $z=g^j$ が平方であることと $j$ が偶数であることは同値なので、

$$
z\text{ が平方}\quad\Longleftrightarrow\quad z^{(q-1)/2}=1
$$

となります。特に $c$ が $\mathbb F_p$ で非平方なら $c^{(p-1)/2}=-1$。この判定を $\mathbb F_{p^n}$ に適用すると

$$
c^{(p^n-1)/2}
=\left(c^{(p-1)/2}\right)^{1+p+\cdots+p^{n-1}}
=(-1)^n
$$

です。$p$ は奇数なので和の $n$ 個の項はすべて奇数であり、指数の偶奇は $n$ と同じです。よって $n$ が偶数なら $r_q(c)=2$、奇数なら $r_q(c)=0$。従って (ii) です。

尖点では $F=y^2-x^3$ の唯一のアフィン特異点は $(0,0)$ で、$x\ne0$ の非特異点は $u=y/x$ によって $(x,y)=(u^2,u^3)$、$u\ne0$ と一意に表示されます。この $q-1$ 点と無限遠点を合わせれば $q$ 点で (iii) が従います。$\square$
<!-- proof-end -->

したがって非特異部分の点数から基準値 $p^n$ を差し引いた数を $d_{p,n}$ と置くと

$$
d_{p,n}=
\begin{cases}
-1,&\text{分裂節点},\\
-(-1)^n,&\text{非分裂節点},\\
0,&\text{尖点}.
\end{cases}
$$

$|z|<1$ の幾何級数 $\sum_{r\ge0}z^r=(1-z)^{-1}$ を0から $z$ まで項別積分すれば $-\log(1-z)=\sum_{n\ge1}z^n/n$ です。この等式を使って

$$
\exp\left(\sum_{n\ge1}\frac{d_{p,n}}nT^n\right)
=\begin{cases}
1-T,&\text{分裂},\\
1+T,&\text{非分裂},\\
1,&\text{加法的}
\end{cases}
$$

が得られます。上の三例なら $p=5$ で非特異部分の点数は順に $4,6,5$ でした。したがって一次係数も順に $-1,+1,0$ と一致します。

**論理の境界と行列式の意味**：この数え上げは、特異モデルでの局所符号を確かめる初等的な説明です。一般の楕円曲線の局所因子には、[EC9のTate加群・慣性群の定義](../EC9/index.md#def-ec9-conductor)で導入した二次元空間 $V_\ell(E)$（$\ell\ne p$）を使います。$W_p=V_\ell(E)^{I_p}$ は慣性群で固定されるベクトルの部分空間です。この空間上に誘導される算術的Frobeniusの作用を $A_p$ と書くと、局所多項式を表す行列式は

$$
P_p(E,T)=\det(I-T A_p\mid W_p)
$$

です。右辺の $I$ は $W_p$ 上の恒等写像であり、基底を選ぶと通常の行列式になります。例えば $\dim W_p=2$ の場合、基底で表した $2\times2$ 行列を $A$ とすれば

$$
\det(I_2-TA)=1-(\operatorname{tr}A)T+(\det A)T^2.
$$

良い還元では固定部分空間の次元は2です。Frobeniusのトレースが $a_p$、行列式が $p$ なので、[EC8のFrobeniusの二次関係式](../EC8/index.md#thm-ec8-frobenius-polynomial)と一致する

$$
P_p(E,T)=1-a_pT+pT^2
$$

を得ます。乗法的還元では固定部分空間は一次元で、Frobeniusは分裂時に $+1$ 倍、非分裂時に $-1$ 倍として作用します。従って局所多項式はそれぞれ

$$
P_p(E,T)=1-T,\qquad P_p(E,T)=1+T
$$

です。加法的還元では固定部分空間は零次元なので、その上の行列式は1と約束し、局所多項式も1です。

**引用範囲**：還元型ごとの $\dim W_p$ は[還元型と局所導手指数の対応定理](../EC9/index.md#thm-ec9-local-conductor-types)を使います。良い還元のTate加群上のFrobeniusとEC8の根の対応、および乗法的還元での一次元固有値と接線の分裂性との対応は、**局所Galois表現に関する外部定理**です。上の点数計算や行列式の展開だけで、これらの対応（特に素数2、3の場合）を証明したとは扱いません。

## 3. 素数を掛け合わせてHasse–Weil L関数を作る

局所多項式 $P_p(E,T)$ が各素数で定まりました。局所Euler因子は、その多項式へ $T=p^{-s}$ を代入した**逆数**です。分子と分母を取り違えないようにします。

<a id="def-ec10-hasse-weil-l"></a>

<!-- formal-statement-start -->
> **定義（Hasse–Weil L関数・局所Euler因子）**  
> 楕円曲線 $E/\mathbb Q$ に対し、全ての素数 $p$ について前二節の $P_p(E,T)$ を用い、

$$
L_p(E,s)=P_p(E,p^{-s})^{-1},
\qquad
L(E,s)=\prod_{p}L_p(E,s)
$$

> と定める。ただし後者は積が収束する領域で定義する。各局所因子を具体的に書けば

$$
L_p(E,s)=
\begin{cases}
(1-a_pp^{-s}+p^{1-2s})^{-1},&\text{良い還元},\\
(1-p^{-s})^{-1},&\text{分裂乗法的還元},\\
(1+p^{-s})^{-1},&\text{非分裂乗法的還元},\\
1,&\text{加法的還元}
\end{cases}
$$

> である。無限積の複素解析上の正確な収束域は次節で示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec10-hasse-weil-l -->
**定義の確認**。最初の節の良い還元例 $y^2=x^3+x+1$ の $p=5$ では $a_5=-3$ なので

$$
L_5(E,s)=\frac1{1+3\cdot5^{-s}+5^{1-2s}}.
$$

一方、EC9の分裂節点例では $L_5(E_{\mathrm{sp}},s)=(1-5^{-s})^{-1}$、非分裂節点例では $L_5(E_{\mathrm{ns}},s)=(1+5^{-s})^{-1}$、尖点例では $L_5(E_{\mathrm{add}},s)=1$ です。ここで四つは**異なる有理数体上の曲線**です。同じ曲線の同じ素数に四つを同時に掛けるのではありません。
<!-- definition-example-end -->

良い素数では二次式、乗法的還元では一次式、加法的還元では定数になることが分かりました。悪い素数の集合は有限個です。[EC9の導手の定義](../EC9/index.md#def-ec9-conductor)で正の指数を持つ素数が有限個に限られるため、無限積の収束を決めるのは良い素数での評価です。

## 4. 絶対収束域はなぜ $\operatorname{Re}s>3/2$ か

有限個の局所因子を掛けるだけなら問題ありません。無限積では、各因子が1へ十分速く近づく必要があります。[EC8のHasse評価](../EC8/index.md#thm-ec8-hasse)を使うと、良い素数で $|a_p|\le2\sqrt p$。この $\sqrt p$ が Euler 積の収束境界に現れます。

<a id="thm-ec10-absolute-convergence"></a>

<!-- formal-statement-start -->
> **定理（Euler積の絶対収束と正則性）**  
> $E/\mathbb Q$ を楕円曲線とする。局所Euler因子の積

$$
L(E,s)=\prod_p P_p(E,p^{-s})^{-1}
$$

> は半平面 $\operatorname{Re}s>3/2$ で絶対かつ局所一様に収束し、その領域で正則かつ零点を持たない関数を定める。この定理は境界線 $\operatorname{Re}s=3/2$ での収束・発散を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

良い素数の $P_p$ を Frobenius の根 $\alpha_p,\beta_p$ で二つの一次式へ分けます。[Hasse評価](../EC8/index.md#thm-ec8-hasse)からどちらの根も大きさ $\sqrt p$ です。したがって積の対数の各素数項は、およそ $p^{1/2-\sigma}$ で抑えられ、指数 $\sigma-1/2>1$ の通常の正項級数との比較で収束します。悪い素数は有限個なので別に確認します。

<!-- proof-start -->
### 証明

良い還元の素数 $p$ について[EC8のFrobeniusの根](../EC8/index.md#def-ec8-frobenius-roots)を用いると

$$
P_p(E,p^{-s})
=(1-\alpha_pp^{-s})(1-\beta_pp^{-s}),
\qquad
|\alpha_p|=|\beta_p|=\sqrt p.
$$

$\sigma>3/2$ なら $|\alpha_pp^{-s}|=|\beta_pp^{-s}|=p^{1/2-\sigma}<1$ なので、両因子は零でありません。$K$ をこの半平面の任意のコンパクト集合とし、$\sigma_0=\inf_{s\in K}\operatorname{Re}s>3/2$ と置きます。十分大きな素数 $p$ について、全ての $s\in K$ で $|\alpha_pp^{-s}|,|\beta_pp^{-s}|\le1/2$ となります。

複素数 $|z|\le1/2$ では、収束級数 $-\log(1-z)=\sum_{r\ge1}z^r/r$ を取り、

$$
|-\log(1-z)|
\le\sum_{r\ge1}|z|^r
=\frac{|z|}{1-|z|}\le2|z|
$$

と評価できます。したがって十分大きな良い素数の局所因子の対数には

$$
\begin{aligned}
|\log L_p(E,s)|
&\le|-\log(1-\alpha_pp^{-s})|
   +|-\log(1-\beta_pp^{-s})|\\
&\le2|\alpha_pp^{-s}|+2|\beta_pp^{-s}|\\
&\le4p^{1/2-\sigma_0}
\end{aligned}
$$

が成り立ちます。$\sigma_0-1/2>1$ なので

$$
\sum_{\substack{p\ \mathrm{prime}\\ p\ \mathrm{good}}}
p^{1/2-\sigma_0}
\le\sum_{n=2}^\infty n^{-(\sigma_0-1/2)}<\infty.
$$

よって良い素数の対数級数は $K$ 上一様絶対収束します。

悪い素数は有限個で、乗法的還元なら $P_p(E,p^{-s})=1\mp p^{-s}$、加法的還元なら1です。$\sigma>3/2$ では $|p^{-s}|<1$ なのでいずれも零でなく、これらの有限個の項を加えても局所一様収束は崩れません。

各局所対数はこの領域で正則であり、その級数は任意のコンパクト集合で一様収束するため、和 $H(s)=\sum_p\log L_p(E,s)$ は正則です。[ANT2の局所一様収束と正則性の原理](../../ANT/ANT2/index.md#thm-ant2-holomorphic-halfplane)と同じ正則関数列の議論を使っています。そこで $L(E,s)=\exp H(s)$ と置くと、有限積の極限に一致し、正則で零になりません。$\square$
<!-- proof-end -->

**何を証明していないか**。$\operatorname{Re}s>3/2$ はここで保証した絶対収束半平面であり、$s=1$ に Euler 積を直接代入する根拠にはなりません。解析接続とは、収束域で一致する別の正則関数をより広い領域へ延長することです。次にその入力を明示します。

## 5. Euler積をDirichlet級数へ展開する

[ANT2のDirichlet級数と積の規則](../../ANT/ANT2/index.md#thm-ant2-euler-product)を使う前に、各素数冪の係数を確認します。$L(E,s)=\sum_{n\ge1}b_E(n)n^{-s}$ と書くときの $b_E(n)$ は、良い素数でも一般には $a_{p^2}=p^2+1-\#E(\mathbb F_{p^2})$ とは異なります。$p^2$ における**Dirichlet係数**と、拡大体 $\mathbb F_{p^2}$ での**点数トレース**は別物です。

<a id="thm-ec10-dirichlet-coefficients"></a>

<!-- formal-statement-start -->
> **定理（素数冪係数と乗法性）**  
> $\operatorname{Re}s>3/2$ で定義した $L(E,s)$ は絶対収束するDirichlet級数

$$
L(E,s)=\sum_{n=1}^\infty \frac{b_E(n)}{n^s},
\qquad b_E(1)=1
$$

> に展開でき、$(m,n)=1$ なら $b_E(mn)=b_E(m)b_E(n)$ が成り立つ。素数冪の係数は、良い還元では

$$
b_E(p^0)=1,\quad b_E(p)=a_p,\quad
b_E(p^r)=a_pb_E(p^{r-1})-p\,b_E(p^{r-2})\quad(r\ge2),
$$

> 乗法的還元では $b_E(p^r)=\varepsilon_p^r$（$r\ge0$）、加法的還元では $b_E(p^0)=1$ かつ $b_E(p^r)=0$（$r\ge1$）である。
<!-- formal-statement-end -->

### 証明の見取り図

局所因子を $T$ の冪級数に展開し、分母を掛け戻して係数を比較します。複数の素数の係数は一意分解によって組み合わせます。無限積とDirichlet級数の交換は、前節の絶対収束によって正当化します。

<!-- proof-start -->
### 証明

良い素数 $p$ について $P_p(E,T)^{-1}=\sum_{r\ge0}c_rT^r$ と置きます。$P_p(E,0)=1$ なので原点近傍でこの冪級数が存在し、

$$
(1-a_pT+pT^2)\sum_{r\ge0}c_rT^r=1.
$$

$T^0,T^1,T^r$（$r\ge2$）の係数を比較すると、順に

$$
c_0=1,\qquad c_1-a_pc_0=0,\qquad
c_r-a_pc_{r-1}+pc_{r-2}=0.
$$

ゆえに $c_1=a_p$、$c_r=a_pc_{r-1}-pc_{r-2}$ です。乗法的還元は $1/(1-\varepsilon_pT)=\sum_{r\ge0}\varepsilon_p^rT^r$、加法的還元は定数1なので、それぞれ記載した係数になります。

素数の有限集合 $S$ に対して積を展開すると、一意分解により

$$
\prod_{p\in S}\left(\sum_{r\ge0}b_E(p^r)p^{-rs}\right)
=\sum_{\substack{n\ge1\\p\mid n\Rightarrow p\in S}}
\frac{\prod_{p^r\parallel n}b_E(p^r)}{n^s}.
$$

良い素数では $|\alpha_p|=|\beta_p|=\sqrt p$ なので冪級数の係数は

$$
|b_E(p^r)|
=\left|\sum_{j=0}^r\alpha_p^j\beta_p^{r-j}\right|
\le(r+1)p^{r/2}.
$$

$\sigma>3/2$ なら各局所級数の絶対値和は

$$
\sum_{r\ge0}|b_E(p^r)|p^{-r\sigma}
\le\sum_{r\ge0}(r+1)p^{-r(\sigma-1/2)}
=(1-p^{-(\sigma-1/2)})^{-2}.
$$

この右辺を良い素数全体で掛けても、$\sum_p p^{-(\sigma-1/2)}<\infty$ により有限です。悪い素数は有限個で、$\sigma>3/2$ なら局所級数の絶対値和も有限です。したがって有限積をすべての素数へ広げて和と積を交換でき、記載したDirichlet級数が絶対収束します。係数の積表示から互いに素な $m,n$ に対する乗法性も従います。$\square$
<!-- proof-end -->

**係数の確認**。$E:y^2=x^3+x+1$ の良い素数 $5$ では $a_5=-3$ でした。従って

$$
b_E(5^2)=a_5^2-5=9-5=4,\qquad
b_E(5^3)=a_5b_E(5^2)-5b_E(5)=-12+15=3.
$$

一方、[EC8の拡大体点数公式](../EC8/index.md#thm-ec8-extension-counts)のトレースは $\alpha_5^2+\beta_5^2=a_5^2-2\cdot5=-1$ であり、$b_E(25)=4$ とは異なります。式の $-p$ と $-2p$ を混同しない例です。
## 6. 解析接続・関数等式とBSD予想の位置

ここまでは無限積が収束する領域から一歩も出ていません。しかし、中心点 $s=1$ での値を算術と結び付けるには、もっと左まで関数を延長する必要があります。この部分を初等的なEuler積の操作で証明済みと扱ってはいけません。

[EC9の導手](../EC9/index.md#def-ec9-conductor) $N_E$ とEulerのガンマ関数 $\Gamma(s)$ を用いて、初めは $\operatorname{Re}s>3/2$ において

$$
\Lambda(E,s)
=N_E^{s/2}(2\pi)^{-s}\Gamma(s)L(E,s)
$$

を考えます。ガンマ関数は $\Gamma(s)=\int_0^\infty e^{-u}u^{s-1}\,du$（$\operatorname{Re}s>0$）から始まる解析関数です。$N_E^{s/2}=\exp((s/2)\log N_E)$ と定めます。

<a id="thm-ec10-modularity-consequences"></a>

<!-- formal-statement-start -->
> **定理（解析接続と関数等式：modularity による引用定理）**  
> $E/\mathbb Q$ を楕円曲線とし、$N_E$ をその導手とする。$L(E,s)$ は複素平面全体へ整関数として解析接続できる。完成L関数

$$
\Lambda(E,s)=N_E^{s/2}(2\pi)^{-s}\Gamma(s)L(E,s)
$$

> も全平面へ整関数として延長され、ある $w_E\in\{+1,-1\}$ に対し

$$
\Lambda(E,s)=w_E\Lambda(E,2-s)
$$

> が全ての $s\in\mathbb C$ で成立する。$w_E$ を関数等式の符号（root number）という。
<!-- formal-statement-end -->

この定理は**外部の大定理 Modularity Theorem**（有理数体上の楕円曲線の modularity）と、重さ2の保型形式の $L$ 関数の解析理論から従います。EC10ではこれらの証明を再現しません。後続のモジュラー形式講座の MF8 が証明済み大定理の記述と接続を担当する設計です。この節は「Euler積の絶対収束から解析接続が出た」という主張ではありません。

関数等式の中心は $s=1$ です。ここに代入すると $\Lambda(E,1)=w_E\Lambda(E,1)$ なので、$w_E=-1$ なら $2\Lambda(E,1)=0$、すなわち $\Lambda(E,1)=0$。係数 $N_E^{1/2}(2\pi)^{-1}\Gamma(1)$ は零でないため、$L(E,1)=0$ が従います。一方 $w_E=+1$ から $L(E,1)\ne0$ は従いません。

中心点で零点がどれだけ重なるかを見るには、正則な関数を次のようにTaylor展開します。

$$
f(1+u)=c_0+c_1u+c_2u^2+\cdots
$$

最初の非零係数 $c_m$ を探すと、その添字 $m$ が零点の重なりの回数を表します。$c_0\ne0$ なら中心点は零点ではありません。次の定義ではこの判定を $L(E,s)$ に適用します。

<a id="def-ec10-analytic-rank"></a>

<!-- formal-statement-start -->
> **定義（解析的rank）**  
> $E/\mathbb Q$ の $L(E,s)$ の $s=1$ における零点の位数を解析的rankといい、

$$
r_{\mathrm{an}}(E)=\operatorname{ord}_{s=1}L(E,s)
$$

> と書く。$L(E,1)\ne0$ なら $r_{\mathrm{an}}(E)=0$ である。零点の位数は、$L(E,s)$ を $s=1$ でTaylor展開したとき最初に零でない係数の次数を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec10-analytic-rank -->
**定義の確認**。$w_E=-1$ なら上の関数等式から $\Lambda(E,1+u)=-\Lambda(E,1-u)$ です。$\Lambda$ を $u=0$ でTaylor展開すると、偶数次係数はすべて0で、最初の非零係数の次数は奇数です。完成因子は $s=1$ で正則かつ零でないので、$r_{\mathrm{an}}(E)$ も奇数、特に1以上です。ここでは符号を仮定した**条件付きの直接確認**であり、具体的な曲線の $w_E$ を無計算で決定したわけではありません。
<!-- definition-example-end -->

[EC6のMordell–Weil定理](../EC6/index.md#thm-ec6-general-mw)では、一般の弱Mordell–Weil定理を外部から引用し、そこから高さ降下によって有理点群の有限生成性を導いています。この結果と[有限生成Abel群の構造定理](../../MOD/MOD2/index.md#thm-mod2-fg-abelian)から

$$
E(\mathbb Q)\simeq\mathbb Z^r\oplus T,\qquad T\text{ は有限アーベル群}
$$

と書けます。この整数 $r$ を代数的rankといいます。

**Birch–Swinnerton-Dyer予想（BSD予想）のrankに関する主張**は

$$
r_{\mathrm{an}}(E)=\operatorname{rank}E(\mathbb Q)
$$

です。これは一般の $E/\mathbb Q$ について**未解決の予想**です。解析接続・関数等式は現在証明済みの定理ですが、rankが一致するという一般主張は別の論理段階にあります。$w_E=-1$ なら解析的rankが奇数だと分かっても、それだけで代数的rankが1だと確定するわけではありません。

## 7. 演習：局所判定から無限積、中心点へ

### A1. 良い素数で点数から局所因子へ

$E:y^2=x^3+x+1$ の $p=3$ について $\Delta=-496$ が3で割れないことを確認し、$x=0,1,2$ に対する $y$ の個数から $a_3$ と $L_3(E,s)$ を求めよ。

- Level: A
- ID: EC10-A1

<!-- solution-start -->
### 詳細解答

$-496\equiv2\pmod3$ なので、[良い還元・悪い還元](../EC9/index.md#def-ec9-good-reduction)より良い還元です。$\mathbb F_3$ の平方数は0,1。右辺 $x^3+x+1$ は $x=0,1,2$ でそれぞれ $1,0,2$ なので、$y$ は順に2通り、1通り、0通りです。無限遠点を加えて $\#E(\mathbb F_3)=1+2+1+0=4$。

従って[局所係数の定義](#def-ec10-good-local-polynomial)から $a_3=3+1-4=0$、$P_3(E,T)=1+3T^2$。[局所因子の定義](#def-ec10-hasse-weil-l)で $T=3^{-s}$ と代入し

$$
L_3(E,s)=\frac1{1+3^{1-2s}}.
$$

を得ます。
<!-- solution-end -->

### A2. 悪い素数では点数が分裂性を教える

$p=5$ で $C_1:y^2=x^2(x+1)$ と $C_2:y^2=x^2(x+2)$ を考える。節点の接線の分裂性、特異点を除いた $\mathbb F_5$-点数、対応する $P_5(T)$ をそれぞれ求めよ。

- Level: A
- ID: EC10-A2

<!-- solution-start -->
### 詳細解答

どちらも特異点は $(0,0)$。最低次数の二次項はそれぞれ $y^2-x^2=(y-x)(y+x)$ と $y^2-2x^2$ です。前者は $\mathbb F_5$ で二本に分裂し、後者は2が非平方なので分裂しません。

[節点・尖点の非特異部分の点数](#prop-ec10-singular-smooth-counts)の $n=1$ を適用すると、$C_1$ は $5-1=4$ 点、$C_2$ は $5-(-1)=6$ 点。直接にも $u=y/x$ で $u^2=1$ の2通りを除くか、$u^2=2$ に解がないかで確認できます。定義により分裂側の $P_5(T)=1-T$、非分裂側は $P_5(T)=1+T$ です。特異点そのものを足すと5点、7点になり、ここで数える非特異部分の点数と混同してしまいます。
<!-- solution-end -->

### A3. 二つの「25の係数」を区別する

良い素数 $p=5$ で $a_5=-3$ とする。$L_5$ の $T^2$ の係数 $b_E(25)$ と、$a_{5^2}^{\mathrm{trace}}=5^2+1-\#E(\mathbb F_{25})$ をそれぞれ求めよ。

- Level: A
- ID: EC10-A3

<!-- solution-start -->
### 詳細解答

[Dirichlet係数の漸化式](#thm-ec10-dirichlet-coefficients)では $b_E(25)=a_5^2-5=9-5=4$ です。一方、[拡大体の点数公式](../EC8/index.md#thm-ec8-extension-counts)では Frobenius の根の和が $a_5=-3$、積が5ですから

$$
\alpha_5^2+\beta_5^2
=(\alpha_5+\beta_5)^2-2\alpha_5\beta_5
=9-10=-1.
$$

よって $a_{25}^{\mathrm{trace}}=-1$、$\#E(\mathbb F_{25})=25+1-(-1)=27$ です。両者は定義が異なります。
<!-- solution-end -->

### A4. 関数等式の符号と中心零点

ある楕円曲線 $E/\mathbb Q$ が関数等式 $\Lambda(E,s)=-\Lambda(E,2-s)$ を満たすとする。$L(E,1)$ を求め、これだけから代数的rankを決められるか述べよ。

- Level: A
- ID: EC10-A4

<!-- solution-start -->
### 詳細解答

$s=1$ で $\Lambda(E,1)=-\Lambda(E,1)$ なので $2\Lambda(E,1)=0$、従って $\Lambda(E,1)=0$。完成因子 $N_E^{1/2}(2\pi)^{-1}\Gamma(1)=\sqrt{N_E}/(2\pi)$ は零でないので $L(E,1)=0$ です。解析的rankは1以上の奇数となりますが、[解析的rankの定義](#def-ec10-analytic-rank)に続いて述べたBSD予想のrankに関する主張は一般には未解決であり、代数的rankをこれだけで決定することはできません。特に「符号が $-1$ だからrankは必ず1」は誤りです。
<!-- solution-end -->

### B1. 拡大体上の節点を数え、形式的な積へ

$p=5$ で $C:y^2=x^2(x+2)$ とする。$\#C^{\mathrm{sm}}(\mathbb F_{5^n})$ を $n=1,2,3$ で求め、$d_n=\#C^{\mathrm{sm}}(\mathbb F_{5^n})-5^n$ から $\exp(\sum_{n\ge1}d_nT^n/n)$ を導け。

- Level: B
- ID: EC10-B1

<!-- solution-start -->
### 詳細解答

2は $\mathbb F_5$ の非平方なので、[節点・尖点の非特異部分の点数](#prop-ec10-singular-smooth-counts)から $N_n=5^n-(-1)^n$ です。順に

$$
N_1=5+1=6,\quad N_2=25-1=24,\quad N_3=125+1=126.
$$

従って $d_1=1,d_2=-1,d_3=1$、一般に $d_n=-(-1)^n$ です。$-\log(1-z)=\sum_{n\ge1}z^n/n$ へ $z=-T$ を入れると

$$
-\log(1+T)
=\sum_{n\ge1}\frac{(-1)^n}{n}T^n,
$$

なので $\sum d_nT^n/n=\log(1+T)$ です。指数を取って $1+T$ を得ます。これは非分裂乗法的局所Euler多項式と一致します。
<!-- solution-end -->

### B2. Hasse評価から収束域を導く

$\sigma=\operatorname{Re}s>3/2$ とする。良い素数について $|a_p|\le2\sqrt p$ のみを用い、$P_p(E,p^{-s})$ が零でないことと、無限個の良い素数の対数の絶対値が総和可能になることを示せ。悪い素数がどう扱われるかも述べよ。

- Level: B
- ID: EC10-B2

<!-- solution-start -->
### 詳細解答

[Hasse評価とFrobeniusの根](../EC8/index.md#def-ec8-frobenius-roots)で $\alpha_p+\beta_p=a_p,\alpha_p\beta_p=p$、$|\alpha_p|=|\beta_p|=\sqrt p$ です。よって $\sigma>3/2$ なら $|\alpha_pp^{-s}|=p^{1/2-\sigma}<1$、$\beta_p$ も同様で、$P_p=(1-\alpha_pp^{-s})(1-\beta_pp^{-s})$ は零でありません。

十分大きい $p$ では両者の絶対値が $1/2$ 以下だから、対数の冪級数を使って

$$
|\log L_p(E,s)|
\le2p^{1/2-\sigma}+2p^{1/2-\sigma}
=4p^{-(\sigma-1/2)}.
$$

$\sigma-1/2>1$ であるため

$$
\sum_p4p^{-(\sigma-1/2)}
\le4\sum_{n=2}^\infty n^{-(\sigma-1/2)}<\infty.
$$

従って総和可能です。悪い素数は有限個で、$1\mp p^{-s}$ または1が分母となります。$\sigma>3/2$ では $|p^{-s}|<1$ なので、それらも零でなく、有限項を加えても収束を損ないません。この比較をコンパクト集合上で $\sigma$ の下限に置き換えると局所一様性も得られます。
<!-- solution-end -->

### B3. Dirichlet係数の素数冪と乗法性

ある $E/\mathbb Q$ の良い素数 $p$ で $a_p=2$、別の良い素数 $q$ で $a_q=-1$ とする。$b_E(p^2)$、$b_E(p^3)$、$b_E(pq)$ を $p,q$ で表せ。また、$p$ が分裂乗法的還元なら最初の二値はどうなるか。

- Level: B
- ID: EC10-B3

<!-- solution-start -->
### 詳細解答

良い素数の[漸化式](#thm-ec10-dirichlet-coefficients)から

$$
b_E(p^2)=a_p^2-p=4-p,
$$

$$
b_E(p^3)=a_p(4-p)-p\,a_p
=2(4-p)-2p=8-4p.
$$

$p,q$ は相異なるので $(p,q)=1$、乗法性を適用して $b_E(pq)=b_E(p)b_E(q)=2(-1)=-2$。もし $p$ が分裂乗法的なら局所多項式は $1-T$ で、$1/(1-T)=1+T+T^2+T^3+\cdots$。従って $b_E(p^2)=b_E(p^3)=1$ となり、良い素数の漸化式を流用してはいけません。
<!-- solution-end -->

### B4. 悪い還元と導手を混同しない

ある曲線が $p=5$ で非分裂乗法的還元を持ち、別の素数 $p=7$ で加法的還元を持つとする。$P_5(E,T),P_7(E,T)$ と、[還元型と局所導手指数の対応定理](../EC9/index.md#thm-ec9-local-conductor-types)を使って $f_5,f_7$ を求めよ。$p=2$ の加法的還元について同じ数値を推定できるか。

- Level: B
- ID: EC10-B4

<!-- solution-start -->
### 詳細解答

還元型から[局所多項式の定義](#def-ec10-bad-local-polynomial)へ代入すると $P_5(E,T)=1+T$、$P_7(E,T)=1$ です。[還元型と局所導手指数の対応定理](../EC9/index.md#thm-ec9-local-conductor-types)の乗法的還元では慣性固定部分の次元1、Swan導手0なので $f_5=2-1+0=1$。$p=7\ge5$ の加法的還元では次元0、Swan導手0で $f_7=2-0+0=2$。

ただし導手指数とEuler多項式の次数は別です。加法的還元では局所多項式が1で次数0ですが、導手指数は2になり得ます。$p=2$ ではSwan導手が正になり得るので、加法的還元という分類だけから $f_2=2$ とは推定できません。
<!-- solution-end -->

### C1. 半安定曲線の局所計算から中心点まで

$E/\mathbb Q$ を

$$
E:\quad y^2+y=x^3-x^2
$$

で与える。EC9で示した $\Delta=-11$ および $11$ で分裂乗法的、他では良い還元という結果を使ってよい。(i) $N_E$ と $L_{11}(E,s)$ を求めよ。(ii) $p=2,3$ の点数を直接求め $a_2,a_3$ を計算せよ。(iii) $b_E(4),b_E(6),b_E(11)$ を求めよ。(iv) Euler積の収束域を述べ、中心値 $L(E,1)$ にこのEuler積を直接代入してよいか説明せよ。さらに $w_E=-1$ と仮定した場合の結論を述べよ。

- Level: C
- ID: EC10-C1

<!-- solution-start -->
### 詳細解答

**(i)** EC9の[半安定曲線の導手](../EC9/index.md#prop-ec9-semistable-conductor)と、唯一の悪い素数が11であることから $N_E=11$ です。11での還元は分裂乗法的なので[局所因子の定義](#def-ec10-hasse-weil-l)により

$$
L_{11}(E,s)=\frac1{1-11^{-s}}.
$$

**(ii)** $\Delta=-11$ は2、3で零にならないため、この両素数で良い還元です。$p=2$ では $x=0,1$ の両方で $x^3-x^2=0$、$y=0,1$ はともに $y^2+y=0$ なので、アフィン4点と $O$ の合計5点。よって $a_2=2+1-5=-2$ です。

$p=3$ では $x=0,1$ の右辺は0で、それぞれ $y=0,2$ の2通りです。$x=2$ では右辺 $8-4=4\equiv1$、左辺 $y^2+y$ は $y=0,1,2$ で順に $0,2,0$ なので解なしです。$O$ を加えて $2+2+0+1=5$ 点、従って $a_3=3+1-5=-1$。

**(iii)** 良い素数2では[Dirichlet係数の漸化式](#thm-ec10-dirichlet-coefficients)から

$$
b_E(4)=a_2^2-2=4-2=2.
$$

2と3は互いに素なので $b_E(6)=b_E(2)b_E(3)=(-2)(-1)=2$。11は分裂乗法的なので局所係数 $b_E(11)=1$ です。

**(iv)** [絶対収束定理](#thm-ec10-absolute-convergence)が保証するのは $\operatorname{Re}s>3/2$ です。$s=1$ はその外側なので、Euler積をそのまま代入することはできません。[解析接続の引用定理](#thm-ec10-modularity-consequences)によって延長された関数の $s=1$ での値を考えます。仮定 $w_E=-1$ なら関数等式の両辺を $s=1$ で比べて $\Lambda(E,1)=0$、完成因子が非零なので $L(E,1)=0$ が従います。しかしこの符号仮定は問題中の局所係数計算から自動的に導出されたものではなく、一般の代数的rankの決定にもなりません。
<!-- solution-end -->

## 8. 次章への接続

素数 $p$ の点数・還元型を一つの多項式 $P_p(E,T)$ にまとめ、Euler積によって $L(E,s)$ を作れました。良い素数の二次式、乗法的還元の一次式、加法的還元の定数1は、それぞれ異なる局所情報を運んでいます。収束域の証明には Hasse 評価で十分ですが、$s=1$ に到達するには modularity に由来する解析接続が必要です。

次のEC11では、モジュラー形式のFourier係数とここで得た $a_p(E)$ を比較し、導手 $N_E$ が level にどう現れるかを整理します。BSDのrankに関する主張は、その接続の先でもなお一般には予想のままです。
