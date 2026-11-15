# MIR1-11 正則周期と超幾何級数

<!-- definition-example-audit: strict -->

## 1. 方程式の正則解と実際の周期は同じか

[前講のPicard–Fuchs作用素](../MIR1-10/index.md#thm-mir1-10-quintic-pf)は、Dwork型quinticの対角群不変部分の周期を消す。

$$
\mathcal L=\theta^4-5z(5\theta+1)(5\theta+2)(5\theta+3)(5\theta+4),
\quad\theta=z\frac{d}{dz},\quad z=(5\psi)^{-5}.
$$

しかし、微分方程式だけでは「どの解が幾何学的な周期か」は決まらない。まず $z=0$ で値1の正則解を構成し、最後に実際の積分と一致することを確かめる。

[族の判別式](../MIR1-06/index.md#prop-mir1-06-z-discriminant)から、$z=0$ は $\psi=\infty$ の退化境界であって滑らかなファイバーそのものではない。「原点での値」は、周囲からの正則延長の値である。

## 2. 階乗係数を漸化式から導く

[前講の係数漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)は $\omega=\sum_{d\ge0}a_dz^d$ に対して

$$
d^4a_d=5(5d-4)(5d-3)(5d-2)(5d-1)a_{d-1}\quad(d\ge1)
$$

である。$d=0$ では $0=0$ しか得られないので $a_0$ は自由であり、ここでは1に固定する。

<a id="thm-mir1-11-regular-period"></a>

<!-- formal-statement-start -->
> **定理（原点で正則な規格化解）**
>
> $\theta=z\,d/dz$、$\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ とする。$z=0$ に正則で $\omega(0)=1$ を満たす $\mathcal L\omega=0$ の解は局所的にただ一つ存在し、次の級数で与えられる。

$$
\boxed{\omega_0(z)=\sum_{d=0}^\infty\frac{(5d)!}{(d!)^5}z^d},
\qquad |z|<\frac1{3125}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

階乗係数の隣接比が漸化式に一致することを確認する。比の極限から収束を証明して初めて、形式計算を実際の正則関数の方程式にできる。

<!-- proof-start -->
### 証明

$b_d=(5d)!/(d!)^5$ と置く。$b_0=1$ であり、$d\ge1$ では

$$
\begin{aligned}
\frac{b_d}{b_{d-1}}
&=\frac{(5d)!}{(5d-5)!}\frac{((d-1)!)^5}{(d!)^5}\\
&=\frac{(5d)(5d-1)(5d-2)(5d-3)(5d-4)}{d^5}\\
&=\frac{5(5d-4)(5d-3)(5d-2)(5d-1)}{d^4}.
\end{aligned}
$$

よって $b_d$ は漸化式を満たす。$d^4\ne0$ なので $a_0=1$ から帰納的に $a_d=b_d$ が強制される。さらに

$$
\lim_{d\to\infty}\frac{b_d}{b_{d-1}}
=5\prod_{j=1}^4\lim_{d\to\infty}\frac{5d-5+j}{d}
=3125.
$$

比の判定法より級数は $|z|<1/3125$ の任意の閉小円板で一様絶対収束し、そこで項別微分できる。[係数漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)から $\mathcal L\omega_0=0$ が正則関数として成立する。別の原点正則解も $a_0=1$ なら全Taylor係数が一致するため、二つの関数は原点近傍で同じ Taylor 級数で表されるので、局所的に一致する。$\square$
<!-- proof-end -->

最初の項は

$$
\omega_0(z)=1+120z+113400z^2+168168000z^3+305540235000z^4+\cdots.
$$

例えば $a_2=10!/(2!)^5=3628800/32=113400$ である。[原点の指標根](../MIR1-10/index.md#prop-mir1-10-regular-singular)は四重の0だが、正則Taylor級数の自由度は $a_0$ の一つしかない。残りの局所解で必要となる対数項は次講で扱う。

## 3. 上昇階乗と超幾何級数

係数を $(5d)!$ のまま扱うより、連続積の組合せを使うと方程式の形が読み取りやすい。複素数 $\alpha$ と整数 $d\ge0$ に対し、$(\alpha)_0=1$、$d\ge1$ なら

$$
(\alpha)_d=\alpha(\alpha+1)\cdots(\alpha+d-1)
$$

という積を**上昇階乗**と呼ぶ。これは $\alpha$ の多項式であり、Gamma関数を前提にせず定義できる。隣接係数比が次数の有理式となる級数を記述する代表的な形が、一般化超幾何級数である。

<a id="def-mir1-11-hypergeometric"></a>

<!-- formal-statement-start -->
> **定義（本講の一般化超幾何級数）**
>
> $\alpha_1,\ldots,\alpha_4\in\mathbb C$、$\beta_1,\ldots,\beta_3\in\mathbb C\setminus\{0,-1,-2,\ldots\}$ とする。右辺が収束する範囲で、次の和を一般化超幾何級数と呼び、記号 $\;{}_4F_3$ で表す。

$$
{}_4F_3\left(\begin{matrix}\alpha_1,\alpha_2,\alpha_3,\alpha_4\\
\beta_1,\beta_2,\beta_3\end{matrix};x\right)
=\sum_{d=0}^\infty
\frac{(\alpha_1)_d(\alpha_2)_d(\alpha_3)_d(\alpha_4)_d}
{(\beta_1)_d(\beta_2)_d(\beta_3)_d}\frac{x^d}{d!}.
$$

> 分母パラメータの条件により $(\beta_j)_d\ne0$ であり、解析接続はこの定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-11-hypergeometric -->

**定義の確認**。 $\alpha_j=j/5$（$j=1,2,3,4$）、$\beta_1=\beta_2=\beta_3=1$ とすると $(1)_d=d!$ で、定義の分母が零にならない。$d=0$ の項は1、$d=1$ の項は

$$
\frac{(1/5)(2/5)(3/5)(4/5)}{1\cdot1\cdot1}x
=\frac{24}{625}x.
$$

$x=3125z$ なら $120z$ となり、正則解の一次係数と一致する。

<!-- definition-example-end -->

<a id="prop-mir1-11-hypergeometric"></a>

<!-- formal-statement-start -->
> **命題（quintic正則解の超幾何表示）**
>
> $|z|<1/3125$ において、先の正則解は次の収束級数と一致する。

$$
\boxed{\omega_0(z)={}_4F_3\left(
\begin{matrix}1/5,2/5,3/5,4/5\\1,1,1\end{matrix};3125z\right)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$1,\ldots,5d$ を5で割った余りにより並べ、五つの上昇階乗のうち $(1)_d=d!$ を相殺すると四つの分子因子が残る。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
(5d)!
&=\prod_{k=0}^{d-1}\prod_{j=1}^{5}(5k+j)
=5^{5d}\prod_{j=1}^5\prod_{k=0}^{d-1}(k+j/5)\\
&=3125^d(1/5)_d(2/5)_d(3/5)_d(4/5)_d(1)_d.
\end{aligned}
$$

$(1)_d=d!$ を使えば

$$
\frac{(5d)!}{(d!)^5}
=3125^d\frac{(1/5)_d(2/5)_d(3/5)_d(4/5)_d}{(d!)^4}.
$$

定義の $\beta_1=\beta_2=\beta_3=1$ は分母に $(d!)^3$、末尾の $1/d!$ がもう一つを与える。従って係数がすべて一致し、収束円板上の正則関数として同じである。$\square$
<!-- proof-end -->

$3125z$ という引数は単なる略記ではない。[前講で求めた方程式の正則特異となる点](../MIR1-10/index.md#prop-mir1-10-regular-singular)の $z=1/3125$ を、超幾何変数 $x=3125z$ では $x=1$ に移すためである。

## 4. 収束円板の境界では何が起こるか

比の判定法だけでは $|z|=1/3125$ 上の収束を判定できない。以下、$\omega_0'(r)$ は正の実軸上の点 $z=r$ における $z$ 微分 $d\omega_0/dz$ の値を表す。実数 $r$ を動かす極限と、$z$ に作用する Euler 作用素 $\theta=z\,d/dz$ を区別する。ここで [Stirling 公式](../../../解析系/CA/CA11/index.md#thm-ca11-stirling) $n!\sim\sqrt{2\pi n}(n/e)^n$ を使う（$u_n\sim v_n$ は $u_n/v_n\to1$ の意味）。

<a id="prop-mir1-11-boundary"></a>

<!-- formal-statement-start -->
> **命題（境界での収束と導関数の発散）**
>
> 係数列と半径を次のように置く。

$$
a_d=\frac{(5d)!}{(d!)^5}\quad(d\ge0),
\qquad R=\frac1{3125}.
$$

> このとき冪級数は境界 $|z|=R$ でも絶対収束する。しかし、実数 $r$ を下から $R$ に近づけると

$$
\lim_{r\uparrow R}\omega_0'(r)=+\infty
$$

> となる。従ってこの解は $z=R$ を含む開近傍へ正則延長できない。
<!-- formal-statement-end -->

### 証明の見取り図

Stirling の平方根因子まで残すと $a_dR^d$ は $d^{-2}$ に比例し、一回微分した係数は $d^{-1}$ 型になる。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
a_d&\sim
\frac{\sqrt{10\pi d}(5d/e)^{5d}}
{(2\pi d)^{5/2}(d/e)^{5d}}
=\frac{\sqrt5}{4\pi^2}\frac{3125^d}{d^2}.
\end{aligned}
$$

従って $a_dR^d\sim\sqrt5/(4\pi^2d^2)$ で境界上も絶対収束する。一方、$0\le r<R$ では項別微分により

$$
\omega_0'(r)=\sum_{d=1}^\infty d a_dr^{d-1}.
$$

各項は非負であり、$r\uparrow R$ とすると $d a_dR^{d-1}\sim3125\sqrt5/(4\pi^2d)$ に近づく。各有限部分和を下界として先に $r\uparrow R$、次に項数を増やせば調和級数の発散から $\omega_0'(r)\to+\infty$。もし $R$ の近傍に正則延長が存在すれば導関数がそこで有限となり矛盾する。$\square$
<!-- proof-end -->

**注意。** 境界で級数の値が有限でも正則延長はできない。また、微分方程式の最高階係数が零になる点でも、全ての個別解が発散するとは限らない。

## 5. 幾何学的な留数周期を積分で確かめる

正則級数解が見つかっただけでは、これが実際のサイクルを積分した周期であるとは限らない。[留数周期の定義](../MIR1-07/index.md#def-mir1-07-period)に戻り、$|\psi|>1$ でコンパクトな実4トーラスを積分する。

射影チャート $x_0=1$ で $u_i=x_i/x_0$（$i=1,2,3,4$）とすると、[消去変数による局所留数表示](../MIR1-07/index.md#prop-mir1-07-local-form)は

$$
f_\psi(u)=1+\sum_{i=1}^4u_i^5-5\psi u_1u_2u_3u_4,
\qquad
\frac{\Omega}{F_\psi}
=\frac{du_1\wedge du_2\wedge du_3\wedge du_4}{f_\psi}.
$$

実4トーラス $T=\{|u_1|=\cdots=|u_4|=1\}$ の向きを、四つの円を $u_1,u_2,u_3,u_4$ の順に正向きに回る積の向きとして固定する。$|u_i|=1$ なら

$$
\left|\frac{1+\sum_{i=1}^4u_i^5}
{5\psi u_1u_2u_3u_4}\right|
\le\frac5{5|\psi|}<1.
$$

したがって $f_\psi$ は $T$ 上で零にならず、分母は一様に幾何級数展開できる。

<a id="prop-mir1-11-torus-period"></a>

<!-- formal-statement-start -->
> **命題（トーラス留数積分による正則周期）**
>
> $|\psi|>1$、$z=(5\psi)^{-5}$ とする。上で定めた向きの実4トーラス $T$ で

$$
\Pi_T(\psi)=\frac1{2\pi i}\int_T\frac{\Omega}{F_\psi}
$$

> と置く。この積分は、滑らかなDwork型超曲面 $X_\psi$ 上の閉3サイクルに対する留数形式の周期に対応する。対応する3サイクルは、下の証明で構成する $(u_1,u_2,u_3)$ の円の積の向きと**逆向き**に取る。さらに

$$
\boxed{-\frac5{(2\pi i)^3}\psi\,\Pi_T(\psi)
=\sum_{d=0}^\infty\frac{(5d)!}{(d!)^5}(5\psi)^{-5d}
=\omega_0(z)}.
$$

> 右辺の $\omega_0$ は前節の正則級数解である。定数 $-5/(2\pi i)^3$ はここで固定した向きと積分の規約による。
<!-- formal-statement-end -->

### 証明の見取り図

四つの円積分はLaurent級数の定数項だけを拾う。五つの単項式を各 $d$ 回選ぶとちょうど定数項になり、係数 $(5d)!/(d!)^5$ が現れる。最後に4トーラスが実際の3周期を囲むことを確認する。

<!-- proof-start -->
### 証明

$A(u)=1+\sum_{i=1}^4u_i^5$、$V=u_1u_2u_3u_4$ とする。先ほど確かめた $|A(u)/(5\psi V)|\le1/|\psi|<1$ から

$$
\frac{du_1\wedge\cdots\wedge du_4}{f_\psi}
=-\frac1{5\psi}
\left(\frac{du_1}{u_1}\wedge\frac{du_2}{u_2}
\wedge\frac{du_3}{u_3}\wedge\frac{du_4}{u_4}\right)
\sum_{n=0}^\infty\frac{A(u)^n}{(5\psi)^nV^n}
$$

が $T$ 上で一様収束し、積分と和を交換できる。$A(u)^n$ の展開で定数項 $1$ を $k_0$ 回、単項式 $u_i^5$ を $k_i$ 回選ぶと、$\sum_{i=0}^4k_i=n$ であり、$V^n$ で割った後の各 $u_i$ の指数は $5k_i-n$ となる。

整数 $m$ について

$$
\frac1{2\pi i}\int_{|u|=1}u^m\frac{du}{u}
=\begin{cases}1&(m=0),\\0&(m\ne0)\end{cases}
$$

だから、四つの円積分で残るには $5k_i=n$（$i=1,2,3,4$）が必要である。従って $n=5d$、四つの $k_i=d$、残りも $k_0=n-4d=d$。五種類の選択位置を順番に割り当てる方法の数は、まず $5d$ 個の位置から $d$ 個、次に残り $4d$ 個から $d$ 個、という選択を繰り返すので

$$
\frac{(5d)!}{k_0!k_1!k_2!k_3!k_4!}
=\frac{(5d)!}{(d!)^5}.
$$

四つの円積分が与える $(2\pi i)^4$ と、$\Pi_T$ の定義にある $(2\pi i)^{-1}$ を合わせて

$$
\Pi_T(\psi)=-\frac{(2\pi i)^3}{5\psi}
\sum_{d=0}^\infty\frac{(5d)!}{(d!)^5}(5\psi)^{-5d}.
$$

これを $-5\psi/(2\pi i)^3$ 倍すれば所望の級数になる。

さらに4トーラスが単なる形式的な積分路ではないことを示す。以下の $\partial f_\psi/\partial u_4$ は $\psi,u_1,u_2,u_3$ を固定して $u_4$ のみを微分する記号である。$|u_1|=|u_2|=|u_3|=1$ を固定し、$U=u_1u_2u_3$ とすると $f_\psi=0$ の $u_4$ 方程式は

$$
u_4=\Phi(u_4):=
\frac{1+u_1^5+u_2^5+u_3^5+u_4^5}{5\psi U}.
$$

$|v|\le1$ なら $|\Phi(v)|\le1/|\psi|<1$ であり、$|v|,|w|\le1$ なら因数分解 $v^5-w^5=(v-w)(v^4+v^3w+v^2w^2+vw^3+w^4)$ により

$$
|\Phi(v)-\Phi(w)|\le\frac{|v-w|}{|\psi|}.
$$

したがって任意の初期値からの反復 $v_{n+1}=\Phi(v_n)$ は差が幾何級数的に減少し、閉円板内のただ一つの固定点 $u_4^*$ に収束する。さらに

$$
\frac{\partial f_\psi}{\partial u_4}(u_4^*)
=5(u_4^*)^4-5\psi U\ne0,
$$

なぜなら $|u_4^*|<1<|\psi|$ だからである。よって零点は $(u_1,u_2,u_3)$ に沿って滑らかに動き、超曲面内のコンパクトな実3トーラス $\gamma_\psi$ を作る。$u_4$ 円積分は、各固定した $(u_1,u_2,u_3)$ に対して唯一の単純零点を囲むので、小円へ縮めて [管状サイクルの留数公式](../MIR1-07/index.md#prop-mir1-07-tube)を適用できる。向きを明示的に照合する。[消去変数による局所留数表示](../MIR1-07/index.md#prop-mir1-07-local-form)で $f_4=\partial f_\psi/\partial u_4\ne0$ とすると、$\gamma_\psi$ 上では

$
\operatorname{Res}_{X_\psi}\!\left(\frac{\Omega}{F_\psi}\right)
=-\frac{du_1\wedge du_2\wedge du_3}{f_4}
$

である。これは $df_\psi\wedge du_1\wedge du_2\wedge du_3=-f_4\,du_1\wedge\cdots\wedge du_4$ による。4トーラスの積の向きは $(u_1,u_2,u_3,u_4)$ の順だが、[管状サイクルの留数公式](../MIR1-07/index.md#prop-mir1-07-tube)の規約は法方向の円を先にする。$du_1\wedge du_2\wedge du_3\wedge du_4=-du_4\wedge du_1\wedge du_2\wedge du_3$ なので、$\gamma_\psi$ を $(u_1,u_2,u_3)$ の積の向きとは逆に向き付ければ、両者の規約が一致する。従って $\Pi_T=\int_{\gamma_\psi}\operatorname{Res}_{X_\psi}(\Omega/F_\psi)$ となる。$\square$
<!-- proof-end -->

[前講のPicard–Fuchs定理](../MIR1-10/index.md#thm-mir1-10-quintic-pf)で必要だったのは $\omega=\psi\Pi$ という変数依存の規格化である。ここでさらに掛けた $-5/(2\pi i)^3$ は定数なので、作用素に消される性質は変わらない。一つの正則周期を構成しても、残りの独立周期の対数分枝や積分周期格子が自動的に決まったわけではない。

## 6. 演習：級数と周期を自力で再構成する

### Level A：定義と係数の確認

<a id="ex-mir1-11-a01"></a>
#### MIR1-11-A01 Euler作用素と係数比較
- Level: A

$\theta=z\,d/dz$、$\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ に $\omega=\sum_{d\ge0}a_dz^d$ を代入し、$d=0$ と $d\ge1$ の係数条件を分けて求めよ。

<!-- solution-start -->
**詳細解答。** $\theta z^d=dz^d$ を4回使うと $\theta^4\omega$ の $z^d$ 係数は $d^4a_d$。$z$ を掛けた項では $z^{d-1}$ の係数が $z^d$ に移るため、$d\ge1$ での係数は $5\prod_{j=1}^4(5(d-1)+j)a_{d-1}$。ゆえに

$$
d^4a_d=5(5d-4)(5d-3)(5d-2)(5d-1)a_{d-1}.
$$

$d=0$ では左辺は $0^4a_0=0$、右辺は $z$ を因子に持つので零。従って $a_0$ は自由である。
<!-- solution-end -->

<a id="ex-mir1-11-a02"></a>
#### MIR1-11-A02 初項を二通りで計算する
- Level: A

$a_0=1$ として漸化式から $a_1,a_2,a_3$ を求め、階乗式の値と比較せよ。

<!-- solution-start -->
**詳細解答。** $a_1=5(1)(2)(3)(4)=120$。$d=2$ では

$$
16a_2=5\cdot6\cdot7\cdot8\cdot9\cdot120=1814400,
\quad a_2=113400.
$$

$d=3$ では $81a_3=5\cdot11\cdot12\cdot13\cdot14\cdot113400$ から $a_3=168168000$。階乗でも $5!=120$、$10!/(2!)^5=3628800/32=113400$、$15!/(3!)^5=168168000$ となる。
<!-- solution-end -->

<a id="ex-mir1-11-a03"></a>
#### MIR1-11-A03 上昇階乗の代入
- Level: A

$(1/5)_2$ と $(1)_3$ を計算し、定義の $\;{}_4F_3(1/5,2/5,3/5,4/5;1,1,1;x)$ の一次係数を求めよ。

<!-- solution-start -->
**詳細解答。** $(1/5)_2=(1/5)(6/5)=6/25$、$(1)_3=1\cdot2\cdot3=6$。一次係数は

$$
\frac{(1/5)(2/5)(3/5)(4/5)}{(1)(1)(1)\cdot1!}=\frac{24}{625}.
$$

$x=3125z$ と置いた場合の $z$ 係数は $3125\cdot24/625=120$ である。
<!-- solution-end -->

<a id="ex-mir1-11-a04"></a>
#### MIR1-11-A04 収束円板とパラメータ
- Level: A

$a_d=(5d)!/(d!)^5$ の隣接比の極限を求め、級数の絶対収束する開円板と、$z=(5\psi)^{-5}$ で対応する $|\psi|$ の条件を求めよ。

<!-- solution-start -->
**詳細解答。** 隣接比は

$$
\frac{a_d}{a_{d-1}}
=\frac{5(5d-4)(5d-3)(5d-2)(5d-1)}{d^4}
\longrightarrow3125.
$$

従って $|z|<1/3125$ で絶対収束する。$|z|=1/(3125|\psi|^5)$ なので、この条件は $|\psi|>1$ と同値である。境界の収束はこの判定だけからは言えない。
<!-- solution-end -->

### Level B：一意性・境界・留数

<a id="ex-mir1-11-b01"></a>
#### MIR1-11-B01 正則解の自由度と四重指標根
- Level: B

正則解 $\omega=\sum a_dz^d$ において $a_0=c$ とすると全係数はどうなるか。指標根が四重の0でも正則解が4本あるとはいえない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** [漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)は $d\ge1$ で $d^4\ne0$ なので $a_d$ を $a_{d-1}$ から一意に決める。階乗係数も同じ比を持つため $a_d=c(5d)!/(d!)^5$。従って正則解の空間は $\omega_0$ の定数倍だけの一次元である。[指標多項式](../MIR1-10/index.md#prop-mir1-10-regular-singular)の重根は互いに独立な通常のTaylor級数が4本あることを意味しない。ほかの解には対数項を含む形が必要になる。
<!-- solution-end -->

<a id="ex-mir1-11-b02"></a>
#### MIR1-11-B02 境界の級数と導関数
- Level: B

$R=1/3125$ とし、[Stirling 公式](../../../解析系/CA/CA11/index.md#thm-ca11-stirling)から $a_dR^d$ と $d a_dR^{d-1}$ の漸近形を求めよ。境界値が有限でも正則延長できないことを示せ。

<!-- solution-start -->
**詳細解答。** 分子に $(5d)!$、分母に $(d!)^5$ の Stirling 近似を適用すると

$$
a_d\sim\frac{\sqrt5}{4\pi^2}\frac{3125^d}{d^2},
\qquad a_dR^d\sim\frac{\sqrt5}{4\pi^2d^2},
\qquad d a_dR^{d-1}\sim\frac{3125\sqrt5}{4\pi^2d}.
$$

最初の境界級数は $\sum d^{-2}$ 型で収束する。一方 $0\le r<R$ で $\omega_0'(r)=\sum_{d\ge1}d a_dr^{d-1}$ となる。各項が非負なので任意の部分和を下界にして $r\uparrow R$ とすると、境界の部分和は調和級数型で任意に大きくなる。従って導関数は発散し、$R$ を含む近傍の正則延長は存在しない。
<!-- solution-end -->

<a id="ex-mir1-11-b03"></a>
#### MIR1-11-B03 多項定理と定数項
- Level: B

$(1+u_1^5+u_2^5+u_3^5+u_4^5)^n/(u_1u_2u_3u_4)^n$ のLaurent展開に定数項が現れる $n$ の条件を求め、その係数を計算せよ。

<!-- solution-start -->
**詳細解答。** 定数1を選ぶ回数を $k_0$、$u_i^5$ を選ぶ回数を $k_i$ とし、$\sum_{i=0}^4k_i=n$ とする。各 $u_i$ の指数は $5k_i-n$ であるから、すべて0になるには $5k_i=n$（$i=1,\ldots,4$）が必要。従って $n=5d$、$k_1=\cdots=k_4=d$、$k_0=5d-4d=d$。多項定理で係数は $(5d)!/(d!)^5$。$n$ が5の倍数でなければ定数項はない。
<!-- solution-end -->

<a id="ex-mir1-11-b04"></a>
#### MIR1-11-B04 積分の一様収束と規格化
- Level: B

$|\psi|>1$、$|u_i|=1$ として $f_\psi=1+\sum_{i=1}^4u_i^5-5\psi\prod_i u_i$ を考える。$1/f_\psi$ の幾何級数がトーラス上で一様収束する理由と、$\Pi_T=(2\pi i)^{-1}\int_T\Omega/F_\psi$ の正規化倍率を求めよ。

<!-- solution-start -->
**詳細解答。** $A=1+\sum u_i^5$、$V=\prod_i u_i$ とすれば $|A/(5\psi V)|\le1/|\psi|<1$ なので $\sum_{n\ge0}(A/(5\psi V))^n$ は一様な幾何級数の上界を持ち、積分と交換できる。[トーラスの定数項計算](#prop-mir1-11-torus-period)から

$$
\Pi_T=-\frac{(2\pi i)^3}{5\psi}\sum_{d\ge0}\frac{(5d)!}{(d!)^5}(5\psi)^{-5d}.
$$

したがって正則解は $\omega_0(z)=-5\psi\Pi_T/(2\pi i)^3$。$\psi$ の因子は [前講の変数依存の規格化](../MIR1-10/index.md#thm-mir1-10-quintic-pf)に相当し、$-5/(2\pi i)^3$ は向きに依存する定数倍率である。
<!-- solution-end -->

### Level C：係数と幾何を同時に確かめる

<a id="ex-mir1-11-c01"></a>
#### MIR1-11-C01 正則周期を積分から再構成
- Level: C

$|\psi|>1$、$z=(5\psi)^{-5}$、$f_\psi=1+\sum_{i=1}^4u_i^5-5\psi\prod_i u_i$ とする。実4トーラス $T=\{|u_i|=1\}$ は積順序で向き付け、$\Pi_T=(2\pi i)^{-1}\int_Tdu_1\wedge\cdots\wedge du_4/f_\psi$ とする。次を示せ。

1. 分母の展開から $\omega_0=-5\psi\Pi_T/(2\pi i)^3$ の全係数を導け。
2. その係数がPicard–Fuchs漸化式を満たすこと、収束半径を確かめよ。
3. $T$ が滑らかな超曲面上の3周期を囲む理由を示せ。

<!-- solution-start -->
**詳細解答。**

(1) $|1+\sum u_i^5|\le5<5|\psi|$ だから $f_\psi$ は $T$ 上で零にならない。$A=1+\sum u_i^5$、$V=\prod_i u_i$ として

$$
\frac1{f_\psi}=-\frac1{5\psi V}
\sum_{n\ge0}\frac{A^n}{(5\psi V)^n}
$$

を一様展開する。$A^n$ で五つの項をそれぞれ $k_0,\ldots,k_4$ 回選ぶと、円積分を生き残る指数零条件は $5k_i=n$（$i=1,\ldots,4$）である。$n=5d$、全 $k_i=d$ と決まる。五種類の項が各 $d$ 回現れる並べ方は、$5d$ 個の位置から順に各 $d$ 個を選ぶことで $(5d)!/(d!)^5$ 通りとなる。四円積分が与える $(2\pi i)^4$ を計上すると

$$
\Pi_T=-\frac{(2\pi i)^3}{5\psi}
\sum_{d\ge0}\frac{(5d)!}{(d!)^5}z^d.
$$

従って正規化した $\omega_0$ の係数は $a_d=(5d)!/(d!)^5$ となる。

(2) 直接階乗を割ると

$$
\frac{a_d}{a_{d-1}}
=\frac{(5d)(5d-1)(5d-2)(5d-3)(5d-4)}{d^5}
=\frac{5\prod_{j=1}^4(5d-5+j)}{d^4}.
$$

これは [係数漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)と一致し、$a_0=1$。比の極限が3125だから収束半径は $1/3125$、初項は $1+120z+113400z^2+\cdots$ となる。

(3) $|u_1|=|u_2|=|u_3|=1$ を固定すると、$u_4$ に関する方程式は

$$
u_4=\frac{1+u_1^5+u_2^5+u_3^5+u_4^5}
{5\psi u_1u_2u_3}.
$$

右辺は単位閉円板を自分へ写し、二点の距離を高々 $1/|\psi|<1$ 倍に縮める。反復の収束から円板内に唯一の根があり、導関数 $5u_4^4-5\psi u_1u_2u_3$ は根で非零である。よって基底の3トーラス上で根が連続に動いて超曲面の閉3サイクルを作る。[管状サイクルの留数公式](../MIR1-07/index.md#prop-mir1-07-tube)によって $u_4$ の円積分はこの3サイクルの留数積分に対応する。ただし $T$ は $(u_1,u_2,u_3,u_4)$ の積の向きで、公式の管状サイクルは法方向の円を先に取るため、3サイクルには $(u_1,u_2,u_3)$ の積と逆の向きを付ける。[局所留数表示](../MIR1-07/index.md#prop-mir1-07-local-form)の $-du_1\wedge du_2\wedge du_3/f_4$ とも整合する。$z=0$ は $\psi=\infty$ の退化境界であって、滑らかなファイバーでの積分点ではない。
<!-- solution-end -->

## 7. 次講へ

本講で、**Picard–Fuchsの係数漸化式 → 正則周期の階乗級数 → 超幾何表示 → 収束と境界 → 実際のトーラス留数周期**が一続きの計算になった。得られた $\omega_0(0)=1$ は以後の周期比の基準となる。

次の **MIR1-12「Frobenius法と対数周期」**では、四重指標根から対数を含む局所解を構成し、分枝と周期比の規格化を扱う。現段階でミラー写像や積分周期基底まで決定できたわけではない。

**参考文献**：[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Candelasほか（1991）](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf)。主要な係数・収束・積分の計算は本文で示した。
