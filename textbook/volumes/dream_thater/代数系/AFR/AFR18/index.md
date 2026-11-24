# AFR18 Rankin–Selberg積分と積L関数

[AFR17 のレベル1固有形式の局所データ](../AFR17/index.md#thm-afr17-local-data) では一つの形式に各素数の二つのパラメータを対応させました。今度は二つの形式の係数を同じ添字で掛け合わせます。単独のL関数の積では異なる添字の組も現れますが、同じ添字を取り出せば二つの形式の相関を測れます。AFR7 の [Maass形式のRankin型積分](../AFR7/index.md#thm-afr7-rankin) を正則形式の組に移し、さらにその積分が各素点の4次の因子とどう結び付くかを計算します。

本講の大域模型は有理数体、レベル1、自明中心指標、同じ偶数重さの正則カスプ形式です。局所模型では不分岐の球固定ベクトルを扱います。一般レベル・異なる重さ・一般数体の積L関数の理論とは区別します。

<!-- definition-example-audit: strict -->

## 1. 二つの係数列を一つの積分で読む

偶数 $k\ge2$ とし、$f,g\in S_k(SL_2(\mathbb Z))$ を [レベル1の正則カスプ形式](../../MF/MF4/index.md#def-mf4-level-form) とします。ここではまだ固有形式とは仮定しません。$z=x+iy$、$y>0$、$q=e^{2\pi iz}$ として

$$
f(z)=\sum_{n\ge1}a_nq^n,\qquad
g(z)=\sum_{n\ge1}b_nq^n
$$

と書きます。定数項が0なので、添字は1から始まります。二つの変換則を掛けると $f\overline g$ には $|cz+d|^{2k}$ が掛かります。[虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action) から $y^k$ には逆の因子が掛かるので、

$$
H(z)=y^kf(z)\overline{g(z)}
$$

は群不変です。同じ重さという仮定がここで働きます。標準基本領域を $\mathcal F$、[双曲面積要素](../AFR2/index.md#prop-afr2-metric-invariance) を $d\mu=dx\,dy/y^2$ とします。$H$ に [非正則Eisenstein級数](../AFR5/index.md#def-afr5-eisenstein) を掛けた積分を Rankin–Selberg 積分と呼びます。

係数の尺度をそろえるため $\lambda_f(n)=a_n n^{-(k-1)/2}$、$\lambda_g(n)=b_n n^{-(k-1)/2}$ とします。例えば重さ12のモジュラー判別式では第2係数のこの値は $-24/2^{11/2}$ です。

<a id="thm-afr18-unfolding"></a>

<!-- formal-statement-start -->
> **定理（正則カスプ形式のRankin–Selberg展開）**
> $f,g$ を同じ偶数重さ $k\ge2$ のレベル1正則カスプ形式とし、$\mathcal F$ を全モジュラー群の標準基本領域とする。$\Re s>1$ において次の積分および級数は絶対収束し、

$$
I(s)=\int_{\mathcal F}y^kf(z)\overline{g(z)}E(z,s)d\mu(z)
$$

$$
D(s)=\sum_{n\ge1}\lambda_f(n)\overline{\lambda_g(n)}n^{-s}
$$

> と置けば

$$
I(s)=\frac{\Gamma(s+k-1)}{(4\pi)^{s+k-1}}D(s).
$$
<!-- formal-statement-end -->

### 証明の見取り図

Eisenstein級数の各項に合わせて基本領域を移し、幅1の帯へ展開します。この展開を unfolding と呼びます。帯の横方向の積分で異なる添字を消し、高さ方向のGamma積分で残った係数を $n^{-s}$ で重み付けします。交換の正当化は二乗積分を先に調べて行います。

<!-- proof-start -->
### 証明

$\Gamma=SL_2(\mathbb Z)$ とし、$\Gamma_\infty$ は整数平行移動の行列およびその符号反転からなる部分群とします。[Maass形式のRankin型積分](../AFR7/index.md#thm-afr7-rankin) の剰余類と基本領域の議論により、

$$
E(z,s)=\sum_{\gamma\in\Gamma_\infty\backslash\Gamma}(\Im\gamma z)^s
$$

であり、$\gamma\mathcal F$ は $\Gamma_\infty$ による同一視の下で幅1の帯を境界以外で一度ずつ覆います。

まず $g=f$、実数 $\sigma>1$ とします。非負項に [Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli) を用い、各項で $w=\gamma z$ と変数変換します。$H$ と面積要素の不変性により

$$
\int_{\mathcal F}y^k|f(z)|^2 E(z,\sigma)d\mu
=\int_0^\infty\int_0^1 y^{k+\sigma-2}|f(x+iy)|^2dx\,dy.
$$

[カスプ形式の係数と端点での減衰](../../MF/MF6/index.md#lem-mf6-growth) の証明により $y^{k/2}|f(z)|\le C_f$ は全上半平面で成立します。$0<y\le1$ の積分は $C_f^2/(\sigma-1)$ 以下です。$y\ge1$ では同補題の係数評価から

$$
|f(x+iy)|\le C e^{-2\pi y}
\sum_{n\ge1}n^{k/2}e^{-2\pi(n-1)}
$$

となり、右辺の和は有限で $x,y$ に依存しません。従って高い側も $y^{k+\sigma-2}e^{-4\pi y}$ の積分で抑えられます。$g$ についても同じ有界性と減衰が成り立ちます。

一般の $f,g$ では $2|f\overline g|\le |f|^2+|g|^2$、また $|(\Im\gamma z)^s|=(\Im\gamma z)^\sigma$ です。上の二つの有限な二乗積分により複素積分の絶対収束と交換が保証されます。[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) を実部と虚部に適用して

$$
I(s)=\int_0^\infty y^{k+s-2}
\left(\int_0^1 f(x+iy)\overline{g(x+iy)}dx\right)dy
$$

を得ます。

固定した $y>0$ では係数の多項式評価と指数減衰により両Fourier級数は絶対一様収束します。有限部分和を掛ければ各項に $e^{2\pi i(n-m)x}$ が現れます。$n=m$ の積分は1、$n\ne m$ では $(e^{2\pi i(n-m)}-1)/(2\pi i(n-m))=0$ です。従って極限を取って

$$
\int_0^1f(x+iy)\overline{g(x+iy)}dx
=\sum_{n\ge1}a_n\overline{b_n}e^{-4\pi ny}.
$$

和と高さ積分の交換にはさらに絶対可積分性が要ります。先に $g=f$ の場合の非負項に Tonelli の定理を適用し、$t=4\pi ny$ と置きます。

$$
\int_0^\infty y^{k+\sigma-2}e^{-4\pi ny}dy
=(4\pi n)^{-(k+\sigma-1)}\Gamma(k+\sigma-1).
$$

[Gamma関数の積分表示](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function) は $k+\sigma-1>0$ で有限かつ正です。二乗積分の有限性から

$$
\sum_{n\ge1}|\lambda_f(n)|^2 n^{-\sigma}<\infty
$$

が従い、$g$ でも成立します。有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
\sum_{n\le N}|\lambda_f(n)\lambda_g(n)|n^{-\sigma}
\le
\left(\sum_{n\ge1}|\lambda_f(n)|^2n^{-\sigma}\right)^{1/2}
\left(\sum_{n\ge1}|\lambda_g(n)|^2n^{-\sigma}\right)^{1/2}.
$$

従って交差項の絶対値の級数も収束します。複素 $s$ の高さ積分と和を交換し、同じ置換を使うと

$$
I(s)=\frac{\Gamma(k+s-1)}{(4\pi)^{k+s-1}}
\sum_{n\ge1}a_n\overline{b_n}n^{-(k+s-1)}.
$$

$a_n\overline{b_n}=n^{k-1}\lambda_f(n)\overline{\lambda_g(n)}$ を代入して結論を得ます。
<!-- proof-end -->

$f=g$ の場合、$D(\sigma)$ は実数 $\sigma>1$ で非負です。例えば $f=g=\Delta$ なら初めの項は

$$
D(s)=1+\frac{576}{2^{11}}2^{-s}
+\frac{63504}{3^{11}}3^{-s}+\cdots.
$$

定数項が消えない形式では、帯の大きい高さでの指数減衰が失われます。例えば重さ0の定数関数1を二つ取ると、展開後の積分の高い側は $\int_1^\infty y^{\sigma-2}dy$ となり、$\sigma>1$ で発散します。単に展開という形が書けることと有限値を得られることは別です。

## 2. 素数ごとに四つの積を作る

ここから $f,g$ は第1係数が1の同時Hecke固有形式とします。

[レベル1固有形式の局所データ](../AFR17/index.md#thm-afr17-local-data) による $f$ の素点 $p$ のSatakeパラメータを $\alpha,\beta$、$g$ のものを $\gamma,\delta$ とします。

和はそれぞれ $\lambda_f(p),\lambda_g(p)$、積はいずれも1です。

二つの表現の局所データを組み合わせるには、二つの対角行列のテンソル積を取ります。

例えば $\operatorname{diag}(2,1/2)$ と $\operatorname{diag}(3,1/3)$ の積は4次元の空間で固有値 $6,2/3,3/2,1/6$ を持ちます。

積分では $g$ に複素共役を取ったので、局所データにも共役を取ります。以下の $\pi_f,\pi_g$ は AFR17 で得た [カスプ保型表現](../AFR17/index.md#def-afr17-cuspidal-representation) です。

<a id="def-afr18-pair-factor"></a>

<!-- formal-statement-start -->
> **定義（不分岐積L因子）**
> 同じ素点 $p$ における二つの不分岐の $GL_2$ 表現のSatakeパラメータを $\{\alpha,\beta\}$ と $\{\gamma,\delta\}$ とする。複素共役を取った第二のデータとの積L因子を

$$
L_p(s,\pi_f\times\overline{\pi_g})=
\prod_{u\in\{\alpha,\beta\}}
\prod_{v\in\{\gamma,\delta\}}
(1-u\overline v p^{-s})^{-1}
$$

> と定める。積は重複を含めて4項とし、$p^{-s}=\exp(-s\log p)$ とする。分母の零点は極として扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr18-pair-factor -->
**定義の確認**。 まず局所データの模型として、$p=2$ で $\alpha=i,\beta=-i,\gamma=\delta=1$ を取ります。二組とも非零で積が1、二つのパラメータの順序は区別しません（特定の大域固有形式の存在を主張しているのではありません）。$X=2^{-s}$ と置くと4つの積は $i,i,-i,-i$ です。従って

$$
L_2(s)=\frac{1}{(1-iX)^2(1+iX)^2}
=\frac1{(1+X^2)^2}.
$$

$s=1$ なら $X=1/2$ で分母は非零、値は $16/25$ です。重根を一つにまとめて消してはいけません。

実際の大域形式でも確認します。$f=g=\Delta$ は重さ12の正規化固有カスプ形式で、[レベル1固有形式の局所データ](../AFR17/index.md#thm-afr17-local-data) により素点2で不分岐です。二根は和 $-24/2^{11/2}$、積1を持ち、実係数の二次方程式の根なので共役しても組は変わりません。4つの積は $\alpha^2,1,1,\beta^2$ です。$\alpha^2+\beta^2=9/32-2=-55/32$ より

$$
L_2(s,\pi_\Delta\times\overline{\pi_\Delta})
=\frac{1}{(1-X)^2(1+55X/32+X^2)}.
$$

例えば $s=1$ なら分母は $(1/4)(135/64)$、値は $256/135$ です。二つの表現が不分岐であること、共役の取り方、重複を含む4つの積を全て確認しました。
<!-- definition-example-end -->

一方、$D(s)$ の素数冪係数は $\lambda_f(p^r)\overline{\lambda_g(p^r)}$ です。この列を足しても、最初から上の4次因子に一致するとは限りません。違いを正確に計算します。

<a id="thm-afr18-local-identity"></a>

<!-- formal-statement-start -->
> **定理（積係数の母関数）**
> 複素数 $A,B,C,D$ に対し、$h_r(A,B)=\sum_{j=0}^r A^{r-j}B^j$（$r\ge0$）とする。形式的べき級数として

$$
\sum_{r\ge0}h_r(A,B)h_r(C,D)X^r
=\frac{1-ABCD X^2}
{(1-ACX)(1-ADX)(1-BCX)(1-BDX)}.
$$

> また4つの幾何級数が絶対収束する十分小さい $|X|$ で解析的にも成立する。重根の場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

最初は二つの根が異なるとして等比和を差の商に書き換えます。4つの幾何級数を通分した分子の1次項は相殺され、2次項が残ります。重根では係数が多項式であることを使います。

<!-- proof-start -->
### 証明

$A\ne B,C\ne D$ とします。$(A-B)h_r(A,B)=A^{r+1}-B^{r+1}$ は積を展開すると中間項が相殺されるためです。第二の組も同じ式を満たします。両式を掛けて $X^r$ を掛け、$r\ge0$ で足すと

$$
\begin{aligned}
&(A-B)(C-D)\sum_{r\ge0}h_r(A,B)h_r(C,D)X^r\\
&=\frac{AC}{1-ACX}-\frac{AD}{1-ADX}\\
&\quad-\frac{BC}{1-BCX}+\frac{BD}{1-BDX}.
\end{aligned}
$$

例えば最初の二項の差は

$$
\frac{AC(1-ADX)-AD(1-ACX)}{(1-ACX)(1-ADX)}
=\frac{A(C-D)}{(1-ACX)(1-ADX)}.
$$

残る二項も符号に注意すれば $-B(C-D)/((1-BCX)(1-BDX))$ です。$C-D$ を約分して全体を通分すると分子は

$$
\frac{A(1-BCX)(1-BDX)-B(1-ACX)(1-ADX)}{A-B}.
$$

定数項は $(A-B)/(A-B)=1$、1次項は $-AB(C+D)+AB(C+D)=0$、2次項は

$$
\frac{AB^2CD-BA^2CD}{A-B}X^2=-ABCD X^2.
$$

これで相異なる根の場合が示せました。分母の定数項は1なので形式的逆数が存在し、その係数は根の多項式です。各次数で両辺は連続な多項式だから、相異なる根から極限を取って $A=B$ や $C=D$ にも成立します。解析的には $|ACX|,|ADX|,|BCX|,|BDX|<1$ なら $h_r$ の積の絶対値の和も、最大の積の絶対値の $r$ 乗に $(r+1)^2$ を掛けた級数で抑えられます。
<!-- proof-end -->

[合同部分群上の素数作用素の係数](../../MF/MF5/index.md#prop-mf5-level-q) をレベル1に適用すると

$$
a_{p^{r+1}}=a_p a_{p^r}-p^{k-1}a_{p^{r-1}}
\quad(r\ge1)
$$

です。両辺を $p^{(r+1)(k-1)/2}$ で割ると

$$
\lambda_f(p^{r+1})=(\alpha+\beta)\lambda_f(p^r)
-\alpha\beta\lambda_f(p^{r-1}).
$$

初期値は1と $\alpha+\beta$ です。有限和 $h_r(\alpha,\beta)$ も同じ漸化式と初期値を持ちます。実際 $(\alpha+\beta)h_r$ を展開すると端の項は一度ずつ、中間項は二度ずつ現れ、$\alpha\beta h_{r-1}$ を引くと中間項も一度ずつ残るので $h_{r+1}$ です。帰納法で $\lambda_f(p^r)=h_r(\alpha,\beta)$ となります。$g$ についても同様に $\overline{\lambda_g(p^r)}=h_r(\bar\gamma,\bar\delta)$ です。従って [積係数の母関数](#thm-afr18-local-identity) に $ABCD=1$、$X=p^{-s}$ を代入すると、素数冪の級数には余分な分子 $1-p^{-2s}$ が現れます。

<a id="thm-afr18-euler"></a>

<!-- formal-statement-start -->
> **定理（Rankin–Selbergの有限積L関数）**
> $f,g$ を同じ偶数重さ $k\ge2$ の正規化レベル1同時Hecke固有カスプ形式とする。$\Re s>1$ で

$$
L(s,\pi_f\times\overline{\pi_g})
:=\prod_p L_p(s,\pi_f\times\overline{\pi_g})
=\zeta(2s)D(s)
$$

> が成立する。積は絶対収束し、右辺は正則である。ここで $\zeta$ はRiemann ζ 関数、$D$ は第1節の係数級数である。
<!-- formal-statement-end -->

### 証明の見取り図

互いに素な添字における係数の乗法性により、係数級数を素数冪ごとの積に分けます。各素点の分子を取り除く補正が $\zeta(2s)$ です。

<!-- proof-start -->
### 証明

[同時固有形式と乗法的Fourier係数](../../MF/MF5/index.md#thm-mf5-eigenforms) から $\lambda_f(mn)=\lambda_f(m)\lambda_f(n)$ は $\gcd(m,n)=1$ で成立します。$g$ も同様なので $c(n)=\lambda_f(n)\overline{\lambda_g(n)}$ は乗法的です。

$\sigma=\Re s>1$ とすると [正則カスプ形式のRankin–Selberg展開](#thm-afr18-unfolding) で $\sum_n|c(n)|n^{-\sigma}<\infty$ を示しました。有限素数集合 $P$ に対し、絶対収束する局所級数を掛ければ

$$
\prod_{p\in P}\sum_{r\ge0}c(p^r)p^{-rs}
=\sum_{\substack{n\ge1\\p\mid n\Rightarrow p\in P}}c(n)n^{-s}.
$$

$P$ が全素数へ増大すると、抜ける項の絶対値の和は0へ収束します（まず有限個の整数までの項を全て含め、残りを絶対収束級数の尾部で抑えます）。また $\sum_p\sum_{r\ge1}|c(p^r)|p^{-r\sigma}$ は元の絶対収束級数の部分和で抑えられます。

各局所級数は $X=p^{-s}$ において収束します。[積係数の母関数](#thm-afr18-local-identity) の形式的等式に4次分母を掛けてからこの値を代入できます。右辺 $1-X^2$ は $|X|<1$ なので非零、よって分母も非零です。したがって

$$
\sum_{r\ge0}c(p^r)p^{-rs}=(1-p^{-2s})L_p(s,\pi_f\times\overline{\pi_g}).
$$

$\sum_p p^{-2\sigma}<\infty$ であり、$|1-p^{-2s}|\ge1-2^{-2\sigma}>0$ なので

$$
|L_p-1|
\le \frac{\sum_{r\ge1}|c(p^r)|p^{-r\sigma}+p^{-2\sigma}}
{1-2^{-2\sigma}}.
$$

従って積は絶対収束します。[Riemann ζ 関数のEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product) の素数因子を掛けると主張の等式になります。$D(s)$ は任意の $\Re s\ge1+\epsilon$ で同じ絶対収束級数に支配されるので局所一様収束し、$\zeta(2s)$ とともに正則です。
<!-- proof-end -->

$L(s,\pi_f)L(s,\overline{\pi_g})$ の素数因子は単独の4つの根 $\alpha,\beta,\bar\gamma,\bar\delta$ を使います。それに対して積L関数は4つの**積**を使います。一般には両者は異なります。例えば $f=g$ のとき第1次の局所係数は前者で $2\Re\lambda_f(p)$、後者で $|\lambda_f(p)|^2$ です。

## 3. 局所Whittaker関数を積分する

前節の補正因子は局所積分のどこから生じるのでしょうか。

ここでは $F=\mathbb Q_p$、$O=\mathbb Z_p$、$K=GL_2(O)$、$G=GL_2(F)$ とします。

$N$ は $n(u)=\begin{pmatrix}1&u\\0&1\end{pmatrix}$（$u\in F$）全体です。

加法指標 $\psi$ は $O$ 上自明、$p^{-1}O$ 上非自明とします。

既習の [Whittaker汎関数](../AFR15/index.md#def-afr15-whittaker) を持つ二つの既約許容不分岐表現を考え、中心指標は両方とも自明とします。

ここではこの汎関数が存在することを仮定し、不分岐主系列に対する構成は [主系列の安定Whittaker積分](../AFR15/index.md#thm-afr15-jacquet) を参照してください。

非零の球固定ベクトルから作った Whittaker 関数 $W$ は、[Whittaker関数の変換則](../AFR15/index.md#prop-afr15-model) により $W(n(u)hk)=\psi(u)W(h)$ を満たします。$W'$ は第二の表現の同じ指標による関数です。積 $W\overline{W'}$ は左 $N$ 不変です。$a_m=\operatorname{diag}(p^m,1)$ とします。

<a id="thm-afr18-spherical-whittaker"></a>

<!-- formal-statement-start -->
> **定理（球Whittaker関数の素数冪表示）**
> $G=GL_2(\mathbb Q_p)$、$O=\mathbb Z_p$、$K=GL_2(O)$、$a_m=\operatorname{diag}(p^m,1)$ とする。自明中心指標を持つ $G$ の既約許容不分岐表現に対し、$O$ で自明、$p^{-1}O$ で非自明な加法指標についてのWhittaker汎関数が存在すると仮定する。非零の球固定ベクトルのWhittaker関数を $W(1)=1$ に規格化できる。Satakeパラメータを $\{A,B\}$ とすれば

$$
W(a_m)=
\begin{cases}
0 & m<0,\\
p^{-m/2}h_m(A,B)&m\ge0 .
\end{cases}
$$
<!-- formal-statement-end -->

### 証明の見取り図

右 $K$ 不変性と加法指標の非自明性から負の添字を消します。球Hecke作用を $p+1$ 個の剰余類に分解すると、非負添字の漸化式が出ます。

<!-- proof-start -->
### 証明

$m<0$ とすると $p^mO$ は $p^{-1}O$ を含むので、ある $u\in O$ で $\psi(p^m u)\ne1$ です。$a_m n(u)=n(p^mu)a_m$ と右 $K$ 不変性から

$$
W(a_m)=W(a_m n(u))=\psi(p^mu)W(a_m).
$$

従って $W(a_m)=0$ です。

$W_m=W(a_m)$ と書きます。[指数pの二重剰余類分解](../AFR14/index.md#thm-afr14-p-cosets) の代表元を $r_u=\begin{pmatrix}p&u\\0&1\end{pmatrix}$ と $r_\infty=\operatorname{diag}(1,p)$ とします。$K$ の測度を1とすれば [球Hecke作用](../AFR14/index.md#prop-afr14-action) から、固有値 $\tau$ に対し

$$
\tau W_m=\sum_{u=0}^{p-1}W(a_mr_u)+W(a_m r_\infty).
$$

$m\ge0$ のとき $a_mr_u=n(p^m u)a_{m+1}$ で $\psi(p^mu)=1$ です。また $a_mr_\infty=pI\,a_{m-1}$ なので中心指標の自明性を使えます。従って

$$
\tau W_m=pW_{m+1}+W_{m-1}.
$$

$W_{-1}=0$ なので、仮に $W_0=0$ なら漸化式で全 $W_m=0$ です。[局所三角分解](../AFR13/index.md#thm-afr13-bk) により任意の行列は $n(u)\operatorname{diag}(p^{m+b},p^b)k$ と書けます（対角の単数は右 $K$ に吸収）。中心指標、右不変性、左変換則より全 $W$ が零になり、Whittaker模型の単射性と矛盾します。従って $W_0\ne0$ で規格化可能です。

$U_m=p^{m/2}W_m$ とすると $\tau U_m=p^{1/2}(U_{m+1}+U_{m-1})$ です。[GL_2のSatakeパラメータ](../AFR14/index.md#def-afr14-satake-parameter) の和と積は $A+B=p^{-1/2}\tau,AB=1$ なので

$$
U_{m+1}=(A+B)U_m-AB\,U_{m-1}.
$$

$U_{-1}=0,U_0=1$ より $U_1=A+B$、以降は $h_m(A,B)$ と同じ漸化式です。帰納法で結論を得ます。
<!-- proof-end -->

例えば $p=2,A=B=1$ というSatakeパラメータの模型では $W_0=1,W_1=\sqrt2,W_2=3/2$ です。重根でも $h_m(1,1)=m+1$ となり、式は破綻しません。

今度は二つの関数に試験関数 $\Phi$ を掛けて積分します。

$\Phi=1_{O^2}$ は行ベクトルが整数環に入るとき1となる関数です。

$e_2=(0,1)$ とすると $e_2n(u)=e_2$ なので、$W\overline{W'}\Phi(e_2h)|\det h|_p^s$ は左 $N$ 不変となります。

右 $K$ に対しても不変です。

$dh$ は $K$ の体積1の Haar 測度、$du$ は $O$ の体積1の加法 Haar 測度とし、商測度 $d\dot h$ は $\int_G F(h)dh=\int_{N\backslash G}\int_N F(nh)dn\,d\dot h$ で規格化します。

ここではこの商積分の公式（両群がユニモジュラーの場合の Weil の積分公式）を測度論の外部入力として使います。

必要な各軌道の測度は以下で計算します。

<a id="thm-afr18-local-zeta"></a>

<!-- formal-statement-start -->
> **定理（球Whittaker関数による局所積分）**
> $G=GL_2(\mathbb Q_p)$、$O=\mathbb Z_p$、$K=GL_2(O)$ とする。$N$ は上三角単冪群、$e_2=(0,1)$、商測度は $K$ と $N(O)$ の体積を各1としたHaar測度から定める。自明中心指標を持つ二つの既約許容不分岐 $G$ 表現が、$O$ で自明、$p^{-1}O$ で非自明な同じ加法指標についてのWhittaker汎関数を持つとする。規格化球Whittaker関数を $W,W'$、各Satakeパラメータを $\{A,B\},\{C,D\}$ とする。十分大きな $\Re s$ では

$$
Z_p(s)=\int_{N\backslash G}
W(h)\overline{W'(h)}1_{O^2}(e_2h)|\det h|_p^s\,d\dot h
$$

> は絶対収束し、不分岐積L因子に一致する。

$$
Z_p(s)=\prod_{u\in\{A,B\},v\in\{C,D\}}
(1-u\overline v p^{-s})^{-1}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの整数 $m,b$ で商の軌道を数えます。Whittaker関数が $m\ge0$ を、試験関数が $b\ge0$ を選びます。中心方向の $b$ の和こそが、先ほどの不足分を補う因子です。

<!-- proof-start -->
### 証明

[局所三角分解](../AFR13/index.md#thm-afr13-bk) より代表元を $t_{m,b}=\operatorname{diag}(p^{m+b},p^b)$ とできます。左 $N$ は下段を変えず、右 $K$ は下段の二成分の付値の最小値を保存します（$k,k^{-1}$ とも整数成分なので双方の不等式が成立）。この最小値は $b$ です。行列式の付値は左 $N$、右 $K$ で不変で、$m+2b$ です。従って $m,b$ は軌道ごとに一意です。

$N\cap t_{m,b}Kt_{m,b}^{-1}$ は $u\in p^mO$ に対応します。実際、

$$
t_{m,b}^{-1} n(u)t_{m,b}=n(p^{-m}u)
$$

が $K$ に入る条件は $p^{-m}u\in O$ です。[p進加法Haar測度の規格化](../AFR9/index.md#prop-afr9-local-measure) よりその加法測度は $|p^m|_p=p^{-m}$ です。商積分の公式を $1_{t_{m,b}K}$ に適用すると左辺は1、右辺は軌道 $Nt_{m,b}K$ の商での体積に $p^{-m}$ を掛けた値になります。実際、その軌道上では内側の積分は上の部分群の平行移動の測度であり、外では0です。従って各軌道の商体積は $p^m$ です。

$t_{m,b}=p^b I\,a_m$ なので中心指標の自明性から $W(t_{m,b})=W(a_m)$、第二の関数も同じです。$e_2t_{m,b}=(0,p^b)$ より $\Phi(e_2t_{m,b})=1$ は $b\ge0$ と同値です。また $|\det t_{m,b}|_p^s=p^{-(m+2b)s}$ です。[球Whittaker関数の素数冪表示](#thm-afr18-spherical-whittaker) によって $m<0$ の寄与は消えます。従って

$$
\begin{aligned}
Z_p(s)
&=\sum_{m,b\ge0}p^m p^{-m/2}p^{-m/2}
 h_m(A,B)h_m(\bar C,\bar D)p^{-(m+2b)s}\\
&=\left(\sum_{b\ge0}p^{-2bs}\right)
\left(\sum_{m\ge0}h_m(A,B)h_m(\bar C,\bar D)p^{-ms}\right).
\end{aligned}
$$

$\sigma=\Re s>0$ かつ $p^{-\sigma}\max_{u,v}|u\bar v|<1$ とすれば、後ろの和の絶対値は $(m+1)^2(p^{-\sigma}\max|u\bar v|)^m$ の収束級数に支配されます。前の和は幾何級数なので積分の絶対収束と分離が正当化されます。

自明中心指標なので $AB\bar C\bar D=1$ です。[積係数の母関数](#thm-afr18-local-identity) の分子 $1-p^{-2s}$ は最初の幾何級数 $(1-p^{-2s})^{-1}$ と打ち消し合い、所望の積L因子を得ます。
<!-- proof-end -->

試験関数を省いて中心方向全体を積分すれば、$b$ が負の無限大にも走り $\sigma>0$ では発散します。局所積分で試験関数が必要な理由をこの模型で確認できました。一般の分岐表現で適切なWhittaker関数や試験関数を選び、局所因子を規定する理論はここで証明した不分岐の場合より広いものです。

## 4. 完成形・関数等式・極

有限素点のEuler積だけでは $s$ を $1-s$ に移す対称性が見えません。[完成Eisenstein級数](../AFR5/index.md#def-afr5-completed) を積分に使うと、その対称性が積L関数へ移ります。$\Lambda(w)=\pi^{-w/2}\Gamma(w/2)\zeta(w)$ とします。Petersson内積はここでは

$$
\langle f,g\rangle_k=\int_{\mathcal F}y^kf(z)\overline{g(z)}d\mu
$$

と書きます。第1節の有界性と減衰により有限です。$f=g\ne0$ なら連続性と非零性から正です。

<a id="thm-afr18-completed"></a>

<!-- formal-statement-start -->
> **定理（同重さレベル1の完成積L関数）**
> $f,g$ を同じ偶数重さ $k\ge2$ の正規化レベル1同時Hecke固有カスプ形式とする。$\Re s>1$ で

$$
J(s)=\frac{\pi^{-s}\Gamma(s)\Gamma(s+k-1)}
{(4\pi)^{s+k-1}}L(s,\pi_f\times\overline{\pi_g})
$$

> と定めると、$J$ は全平面に有理型に延長し、$s=0,1$ 以外で正則、これらの点でも高々単純極を持つ。

$$
J(s)=J(1-s),\qquad
\operatorname{Res}_{s=1}J(s)=\tfrac12\langle f,g\rangle_k,\quad
\operatorname{Res}_{s=0}J(s)=-\tfrac12\langle f,g\rangle_k.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$J$ は完成Eisenstein級数を掛けた曲面積分そのものです。Eisenstein級数の関数等式は既に証明済みです。ただし、点ごとの解析接続だけでは積分も解析接続できるとは限りません。基本領域で高さ方向の一様な上界を作り、カスプ形式の減衰と組み合わせます。

<!-- proof-start -->
### 証明

[正則カスプ形式のRankin–Selberg展開](#thm-afr18-unfolding) と [Rankin–Selbergの有限積L関数](#thm-afr18-euler) から $\Re s>1$ で

$$
\begin{aligned}
\int_{\mathcal F}H(z)E^*(z,s)d\mu
&=\Lambda(2s)I(s)\\
&=\pi^{-s}\Gamma(s)\zeta(2s)
\frac{\Gamma(s+k-1)}{(4\pi)^{s+k-1}}D(s)\\
&=J(s).
\end{aligned}
$$

[完成Eisenstein級数のFourier展開](../AFR5/index.md#thm-afr5-fourier) と [Eisenstein級数の解析接続と関数等式](../AFR5/index.md#thm-afr5-functional) を使い、極を除いた任意のコンパクトな $s$ の集合で一様な評価を得ます。基本領域では $y\ge\sqrt3/2$ です。非零周波数 $n$ に対し、$T=2\pi|n|y$ とします。[変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel) の積分表示で $\nu=s-1/2$、$|\Re\nu|\le M$ とすれば

$$
|K_\nu(T)|
\le e^{-T}\int_0^\infty e^{-Tv^2/2+Mv}dv.
$$

ここで $\cosh v\ge1+v^2/2$、$|\cosh(\nu v)|\le e^{Mv}$ を使いました。$T\ge\pi\sqrt3$ なので積分は $T$ に依らない有限な定数で抑えられます。約数和は約数の個数を $|n|$ 以下とし各べきの絶対値を $|n|^{\max(0,\Re(1-2s))}$ 以下とすれば、$s$ のコンパクト集合で一定の多項式で抑えられます。従って非零周波数の和は

$$
C\sqrt y\sum_{n\ge1} n^{M_0} e^{-2\pi ny}
$$

以下です（$M_0$ は十分大きな固定指数）。指数減衰を一つ取り出せば

$$
C\sqrt y\,e^{-2\pi y}
\sum_{n\ge1}n^{M_0} e^{-2\pi(n-1)\sqrt3/2}
$$

となり、$y$ 方向にも一様に指数減衰します。

定数項は $\Lambda(2s)y^s+\Lambda(2s-1)y^{1-s}$ です。$s=1/2$ の見かけの極は相殺されます。実際 $h=s-1/2$ と置けば極の候補は $(y^{1/2+h}-y^{1/2-h})/(2h)$ で、これは

$$
\frac{\sqrt y\log y}{2}\int_{-1}^1 e^{th\log y}dt
$$

と書けます。基本領域の高さの下限は正なので、$h$ の有界集合でこの式は $y$ の固定べきと $1+|\log y|$ の積により抑えられます。残る正則部分も $s$ のコンパクト集合で有界な係数と $y$ の固定べきの積です。従って $s=0,1$ を避けたコンパクト集合では $E^*$ 全体が $C(1+y)^B(1+|\log y|)$ の形の上界を持ちます。

$H$ は $y\ge1$ で $O(y^ke^{-4\pi y})$（第1節の評価）なので、この上界を掛けても $d\mu$ について可積分です。基本領域の高さが1以下の部分はコンパクトで、同じ評価で積分可能です。高さを $Y$ で切った積分は $s$ に関して連続であり、[Cauchyの積分定理](../../../解析系/CA/CA2/index.md#thm-ca2-cauchy-simply-connected) を極を含まない小円板内の三角形境界に適用し、有限領域で積分を交換すると境界積分は0です。[Moreraの定理](../../../解析系/CA/CA7/index.md#lem-ca7-morera) により正則であり、$Y\to\infty$ の尾部は上の可積分関数でコンパクト集合上一様に0となります。従って [正則関数列の局所一様極限定理](../../../解析系/CA/CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit) によって極を除いた積分は正則です。

$s=1$ の近傍では $\Lambda(2s-1)$ の主要部は $1/(2(s-1))$ です。定数項のその部分から $1/(2(s-1))$ を引くと

$$
\frac{y^{1-s}-1}{2(s-1)}
=-\frac{\log y}{2}\int_0^1 y^{-t(s-1)}dt
$$

が残り、上と同じ型の可積分上界が得られます。よって $E^*(z,s)-1/(2(s-1))$ を積分したものは $s=1$ でも正則です。$s=0$ の近傍では $\Lambda(2s)$ の主要部が $-1/(2s)$ であり、

$$
-\frac{y^s-1}{2s}
=-\frac{\log y}{2}\int_0^1 y^{ts}dt
$$

を使えば同じ議論で正則化できます。引いた定数を $H$ と掛けて積分すれば留数が $\pm\langle f,g\rangle_k/2$ となります。

最後に [Eisenstein級数の解析接続と関数等式](../AFR5/index.md#thm-afr5-functional) の $E^*(z,s)=E^*(z,1-s)$ を極でない点で積分すれば $J(s)=J(1-s)$ です。これは有理型関数としても成立します。
<!-- proof-end -->

$g=f\ne0$ なら $s=1$ に実際に単純極があり、留数は正です。反対に $\langle f,g\rangle_k=0$ なら二つの極候補がともに消えます。特に完成形の極が二つの形式の内積を記録しています。有限L関数は上式をGamma因子で割り戻して有理型に延長できますが、収束域外の値を元のDirichlet級数やEuler積の収束値と同一視してはいけません。

## 5. 演習と詳細解答

<a id="ex-afr18-a1"></a>

### A1. 重さを打ち消す

重さ $k$ の形式 $f,g$ に対し $H=y^kf\overline g$ が反転 $z\mapsto-1/z$ で不変となることを確かめよ。$g$ の重さが $k+2$ なら同じ $H$ はどう変わるか。

- Level: A
- ID: AFR18-A1

<!-- solution-start -->
**詳細解答**

[虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action) より、反転の場合は $y'=y/|z|^2$ です。重さ $k$ の変換則から $f(-1/z)=z^kf(z)$、$g(-1/z)=z^kg(z)$ なので

$$
H(-1/z)=y^k|z|^{-2k}z^k\bar z^k f(z)\overline{g(z)}
=H(z).
$$

第二の重さが $k+2$ なら $\bar z^{k+2}$ が現れるので余分な $\bar z^2$ が残り、$H(-1/z)=\bar z^2H(z)$ です。重さをそろえた理由がここにあります。
<!-- solution-end -->

<a id="ex-afr18-a2"></a>

### A2. 横方向の直交性と高さ積分

$f_0=q+2q^2$、$g_0=3q-q^2$ とする（周期関数の模型であり保型性は仮定しない）。$\int_0^1f_0\overline{g_0}dx$ と、これに $y^2$ を掛けて $0<y<\infty$ で積分した値を求めよ。

- Level: A
- ID: AFR18-A2

<!-- solution-start -->
**詳細解答**

積の4項のうち添字が等しいものだけが一周期の積分で残るので、$3e^{-4\pi y}-2e^{-8\pi y}$ です。高さ積分では $t=4\pi y$ と $t=8\pi y$ をそれぞれ使います。$\int_0^\infty t^2e^{-t}dt=\Gamma(3)=2$ なので

$$
\int_0^\infty y^2(3e^{-4\pi y}-2e^{-8\pi y})dy
=\frac6{(4\pi)^3}-\frac4{(8\pi)^3}
=\frac{11}{128\pi^3}.
$$

これは [正則カスプ形式のRankin–Selberg展開](#thm-afr18-unfolding) の帯上での計算部分に対応します。
<!-- solution-end -->

<a id="ex-afr18-a3"></a>

### A3. 四つの積を数える

局所データの模型で $\{A,B\}=\{2,1/2\}$、$\{C,D\}=\{3,1/3\}$ とする。$X=p^{-s}$ として不分岐積L因子とその $X$ の係数を求めよ。

- Level: A
- ID: AFR18-A3

<!-- solution-start -->
**詳細解答**

[不分岐積L因子](#def-afr18-pair-factor) の4つの積は $6,2/3,3/2,1/6$ であるため

$$
L_p=\frac{1}{(1-6X)(1-2X/3)(1-3X/2)(1-X/6)}.
$$

各幾何級数の定数項は1、1次係数はそれぞれの積です。一つだけから1次項を選ぶので係数は $6+2/3+3/2+1/6=25/3$。これは $(2+1/2)(3+1/3)=(5/2)(10/3)=25/3$ とも確認できます。
<!-- solution-end -->

<a id="ex-afr18-a4"></a>

### A4. 重根の局所データ

$A=B=C=D=1$ とする。$h_0,h_1,h_2$ と、二つの係数列の積の母関数の2次までを求め、補正因子を確認せよ。

- Level: A
- ID: AFR18-A4

<!-- solution-start -->
**詳細解答**

$h_r(1,1)=\sum_{j=0}^r1=r+1$ なので $h_0=1,h_1=2,h_2=3$ です。積の母関数は $1+4X+9X^2+\cdots$ です。[積係数の母関数](#thm-afr18-local-identity) の4次因子は $(1-X)^{-4}$ で、2次係数は一つの因子から $X^2$ を選ぶ4通りと、二つの因子から $X$ を選ぶ6通りの和10です。これに $1-X^2$ を掛けると2次係数は $10-1=9$ となり一致します。
<!-- solution-end -->

<a id="ex-afr18-b1"></a>

### B1. 二乗積分から交差項の収束へ

$\sigma>1$ とする。$\sum|\lambda_f(n)|^2n^{-\sigma}=U$、$\sum|\lambda_g(n)|^2n^{-\sigma}=V$ が有限なら、交差項の級数が絶対収束することを示せ。$f$ のみについて有限性を知っているとき同じ結論を導けるか。

- Level: B
- ID: AFR18-B1

<!-- solution-start -->
**詳細解答**

有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を $|\lambda_f(n)|n^{-\sigma/2}$ と $|\lambda_g(n)|n^{-\sigma/2}$ に適用すると、絶対値の部分和は $\sqrt U\sqrt V$ 以下です。非負の部分和は単調増加で一様に有界なので有限な極限を持ちます。

一方、任意の列について一方の有限性だけでは不足します。例えば $\lambda_f(n)=1$、$\lambda_g(n)=n^\sigma$ なら $U=\sum n^{-\sigma}$ は有限ですが交差項の各絶対値は1で発散します。この列を実際の固有形式の係数だと主張しているのではありません。[正則カスプ形式のRankin–Selberg展開](#thm-afr18-unfolding) で両方の二乗積分を確かめた論理上の理由です。
<!-- solution-end -->

<a id="ex-afr18-b2"></a>

### B2. Whittaker関数の負の添字と漸化式

$p=3$、自明中心指標で $A+B=2,AB=1$ とする。球Whittaker関数の $W_{-1},W_0,W_1,W_2$ を求めよ。中心指標が $\omega$ で自明でない場合、規格化前の漸化式のどの係数が変わるか。

- Level: B
- ID: AFR18-B2

<!-- solution-start -->
**詳細解答**

[球Whittaker関数の素数冪表示](#thm-afr18-spherical-whittaker) により負の添字は0、$W_0=1$ です。$\tau=p^{1/2}(A+B)=2\sqrt3$ を漸化式 $\tau W_m=3W_{m+1}+W_{m-1}$ に代入します。

$$
W_1=\frac{2\sqrt3}{3},\qquad
W_2=\frac{2\sqrt3(2/\sqrt3)-1}{3}=1.
$$

中心指標が非自明なら $a_m r_\infty=pI\,a_{m-1}$ の項は $\omega(p)W_{m-1}$ になります。従って $\tau W_m=pW_{m+1}+\omega(p)W_{m-1}$ です。球固定性と同じ加法指標の条件は維持しており、$p$ 個の第一の項の係数は変わりません。
<!-- solution-end -->

<a id="ex-afr18-b3"></a>

### B3. 試験関数を狭める

[球Whittaker関数による局所積分](#thm-afr18-local-zeta) の $\Phi=1_{O^2}$ を $1_{pO^2}$ に替えよ。他の条件は同じとして新しい積分を元の $Z_p(s)$ で表せ。

- Level: B
- ID: AFR18-B3

<!-- solution-start -->
**詳細解答**

右 $K$ は $pO^2$ を保存し、$e_2t_{m,b}=(0,p^b)$ が入る条件は $b\ge1$ です。$W,W'$ の値と軌道の測度 $p^m$ は変わらないので、$m$ の和は元の積分と同じです。中心方向だけが

$$
\sum_{b\ge1}p^{-2bs}=\frac{p^{-2s}}{1-p^{-2s}}
$$

に変わります。十分大きな $\Re s$ で絶対収束しているため項を分離でき、結果は $p^{-2s}Z_p(s)$ です。$b$ の最小値を1だけ上げると行列式の付値が2だけ上がることにも対応します。
<!-- solution-end -->

<a id="ex-afr18-c1"></a>

### C1. 固有係数・局所因子・極を接続する

$f=g=\Delta$（重さ12）とし、$a_1=1,a_2=-24,a_3=252$ とする。第4係数、$D(s)$ の素点2の $X=2^{-s}$ の2次まで、積L因子の2次までを求めよ。最後に $J$ の $s=1$ での留数と有限素点のEuler積を有理型接続したL関数の留数との関係を求めよ。

- Level: C
- ID: AFR18-C1

<!-- solution-start -->
**詳細解答**

[合同部分群上の素数作用素の係数](../../MF/MF5/index.md#prop-mf5-level-q) に $p=m=2,k=12$ を代入すれば

$$
a_4=a_2^2-2^{11}=576-2048=-1472.
$$

従って $\lambda_f(2)=-24/2^{11/2}$、$\lambda_f(4)=-1472/2^{11}$ です。局所係数級数は

$$
1+\frac{576}{2048}X+\frac{1472^2}{2048^2}X^2+O(X^3)
=1+\frac9{32}X+\frac{529}{1024}X^2+O(X^3).
$$

[積係数の母関数](#thm-afr18-local-identity) によれば積L因子を得るにはこれを $1-X^2$ で割ります。$(1-X^2)^{-1}=1+X^2+O(X^4)$ だから

$$
L_2(s)=1+\frac9{32}X+\frac{1553}{1024}X^2+O(X^3).
$$

ここで $O(X^3)$ は $X$ が0に近いときの残りの項です。次に [同重さレベル1の完成積L関数](#thm-afr18-completed) により $J$ の $s=1$ の留数は $\langle\Delta,\Delta\rangle_{12}/2>0$ です。$J(s)=G(s)L(s)$ と書けば

$$
G(1)=\frac{\pi^{-1}\Gamma(1)\Gamma(12)}{(4\pi)^{12}}
=\frac{11!}{\pi(4\pi)^{12}}.
$$

これは非零で $s=1$ の近傍で正則なので、Laurent級数を掛けたときの留数は $G(1)\operatorname{Res}_{s=1}L(s)$ です。従って

$$
\operatorname{Res}_{s=1}L(s,\pi_\Delta\times\overline{\pi_\Delta})
=\frac{\pi(4\pi)^{12}}{2\cdot11!}\langle\Delta,\Delta\rangle_{12}.
$$

局所の最初の数個の係数だけから極を推定したのではなく、Eisenstein級数を使った大域積分により極を確定しました。
<!-- solution-end -->

<a id="ex-afr18-c2"></a>

### C2. 定数項の見かけの極

$s=1/2+h$ とする。完成Eisenstein級数の定数項の主要部 $(y^{1/2+h}-y^{1/2-h})/(2h)$ の極限を求め、$|h|\le1/4$、$y\ge1$ で高さの固定べきにより抑えられることを示せ。カスプ形式の積を掛けたとき積分可能となることを確かめよ。

- Level: C
- ID: AFR18-C2

<!-- solution-start -->
**詳細解答**

$y^{\pm h}=\exp(\pm h\log y)$ を使います。固定した $y>0$ では差の商の極限は $\sqrt y\log y$ です。さらに複素 $h$ でも実変数 $t$ について積分すれば

$$
\frac{y^{1/2+h}-y^{1/2-h}}{2h}
=\frac{\sqrt y\log y}{2}\int_{-1}^1 e^{th\log y}dt.
$$

$|h|\le1/4,y\ge1$ では $|e^{th\log y}|\le y^{1/4}$ なので絶対値は $y^{3/4}\log y$ 以下、さらに $\log y\le y$ から $y^{7/4}$ 以下です。[カスプ形式の係数と端点での減衰](../../MF/MF6/index.md#lem-mf6-growth) を用いた第1節の上界によって $|H|\le C y^k e^{-4\pi y}$ です。双曲面積要素を掛けて $0\le x<1$、$y\ge1$ で積分する絶対値の上界は

$$
C\int_1^\infty y^{k-2+7/4} e^{-4\pi y}dy<\infty.
$$

指数減衰は任意の固定べきに勝るためです。高さが1以下の基本領域はコンパクトで $y$ は正の下限を持つためそこでも一様に有界です。従って [同重さレベル1の完成積L関数](#thm-afr18-completed) の証明で見かけの極を取り除いたまま積分できる理由を再現できました。
<!-- solution-end -->

## 6. 次の講義へ

二つの係数列を同じ添字で結合する大域積分、その有限素点での4次の因子、局所Whittaker積分での中心方向の補正を確認しました。次の AFR19 では、Poisson公式と振動子表現を通じて theta 級数を構成します。これも局所の関数を選んで大域的な保型関数を得るという考え方の別の実例です。

## 参考文献

- Daniel Bump, *Automorphic Forms and Representations*, Cambridge University Press, 1997.
- Jayce R. Getz and Heekyoung Hahn, *An Introduction to Automorphic Representations*, Springer, 2024.
