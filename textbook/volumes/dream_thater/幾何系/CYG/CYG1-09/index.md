# CYG1-09 完全交叉の随伴公式と計算が壊れる境界

## 1. 一つの方程式から複数の方程式へ

[前章の五次三次元超曲面](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)では、滑らかな一つの五次方程式から標準束、Euler標数、Hodge数を求めた。しかし、複素三次元で標準束が自明な射影多様体は、五次超曲面だけではない。例えば射影五次元空間で**三次方程式を二つ**課すと、次元は $5-2=3$ になるはずである。この「二つ」が独立かどうかを確かめ、超曲面の計算を一般化したい。

以下では $N=n+r$ とし、$\mathbb P^N_{\mathbb C}$ の斉次座標を $[Z_0:\cdots:Z_N]$ と書く。$r$ 個の斉次多項式 $F_i$ の次数を正整数 $d_i$ とし、それらの共通零点を $X$ とする。$H=c_1(\mathcal O_{\mathbb P^N}(1)|_X)$ は超平面類であり、$H^j$ は実コホモロジー次数 $2j$ の類である。

**完全交叉**とは、共通零点の複素余次元が方程式の個数 $r$ に等しい状況をいう。したがって同じ方程式を二度書いても、余次元が一なら二つの方程式からなる完全交叉にはならない。さらに**滑らかであること**は別の条件である。各点の局所アフィン座標 $x_1,\ldots,x_N$ で、$r$ 行 $N$ 列の微分行列の階数が $r$ になることを確かめる。

<a id="def-cyg1-09-smooth-ci"></a>

<!-- formal-statement-start -->
> **定義（滑らかな射影完全交叉）**
>
> $1\le r\le N$、$d_i\ge1$ とし、$F_1,\ldots,F_r$ を $\mathbb P^N_{\mathbb C}$ 上の次数 $d_i$ の斉次方程式とする。非空の共通零点 $X$ が余次元 $r$ の完全交叉であり、かつ $X$ の各点で局所方程式 $f_1,\ldots,f_r$ のJacobian

$$
J_x=\left(\frac{\partial f_i}{\partial x_j}(x)\right)_{1\le i\le r,\,1\le j\le N}
$$

> の階数が $r$ なら、$X$ を**滑らかな射影完全交叉**と呼ぶ。このとき複素次元は $n=N-r$ である。
<!-- formal-statement-end -->

Jacobianの各行は一つの方程式の微分を表す。階数が $r$ なら、列を $r$ 本選んだ小行列式が非零になる。その座標について[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を使えば、局所的に $r$ 変数を残りの $N-r$ 変数で解ける。複素正則関数の場合はこの局所解も正則になる。これが**行列の階数と元の滑らかさ条件を結ぶ理由**である。[超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)は $r=1$ の場合に当たる。

## 2. 手で検証する滑らかな $(3,3)$ の例

射影五次元空間の斉次三次式を

$$
F=\sum_{j=0}^{5}Z_j^3,\qquad
G=\sum_{j=0}^{5}jZ_j^3
$$

とし、$X=\{F=G=0\}\subset\mathbb P^5_{\mathbb C}$ を考える。ここで $(3,3)$ は両方の方程式の**次数**を表すのであり、複素次元ではない。

まず $X$ は非空である。$u^3=-2$ を満たす複素数 $u$ を取れば $[1:u:1:0:0:0]\in X$ である。次に斉次偏微分の二行は

$$
\left(3Z_0^2,\ldots,3Z_5^2\right),\qquad
\left(0,3Z_1^2,\ldots,15Z_5^2\right).
$$

もし $X$ 上の点でこの二行の階数が $2$ 未満なら、非零の座標 $Z_j$ が存在する添字すべてについて行の比が同じでなければならない。しかし比は相異なる整数 $j=0,\ldots,5$ なので、非零座標は高々一つである。その場合 $F=Z_j^3\ne0$ となり、$X$ 上の点という仮定に矛盾する。

斉次式の等式 $F_i(tZ)=t^{d_i}F_i(Z)$ を $t=1$ で微分すると $\sum_jZ_j\partial F_i/\partial Z_j=d_iF_i$ を得る。よって $X$ 上では放射方向が両行の核に入る。$Z_a\ne0$ のアフィンチャートへ移れば斉次微分の行階数は局所Jacobianの行階数に一致するため、上の判定は各チャートで有効である。よって $X$ は滑らかな余次元二、複素次元三の完全交叉であり、射影閉部分集合なのでコンパクトである。[射影多様体のKähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)も使える。

ここで**次数二つが等しくても、微分の二行は独立**になり得ることを確認した。一方 $G=F$ と置けば二行は一致して階数一になり、完全交叉の仮定を失う。

<!-- definition-example-start: def-cyg1-09-smooth-ci -->
**定義の確認**（三次二式の全条件）。[滑らかな射影完全交叉の定義](#def-cyg1-09-smooth-ci)を、今の $X$ へ一項ずつ当てはめる。

1. **方程式と次数：** 周囲は $\mathbb P^5_{\mathbb C}$、方程式は $F,G$ の二本で、いずれも斉次次数 $3>0$。従って $N=5,r=2$ で $1\le r\le N$。
2. **非空性：** $u^3=-2$ のとき $[1:u:1:0:0:0]$ は双方の共通零点にある。
3. **期待余次元：** 各共通零点でJacobianの二行が独立なので、二変数を局所的に解ける。残りの三変数が局所座標となり、余次元はちょうど $2$、複素次元は $3$。
4. **滑らかさ：** どの共通零点でも二行の階数が $2$ と検証済みなので、定義が要求する全点での滑らかさ条件を満たす。

この例では単に $5-2=3$ と引き算したのではなく、二つの方程式の**独立性を各点で確かめたこと**が次元判定の根拠になっている。
<!-- definition-example-end -->

## 3. 法束完全列から随伴公式を導く

[前々章の超曲面の法束完全列](../CYG1-07/index.md#prop-cyg1-07-normal)では、微分 $df$ が接ベクトルの法方向成分を取り出した。完全交叉の場合は $r$ 個の微分を並べるだけだが、**全射性**は滑らかさのJacobian階数条件によって初めて保証される。

<a id="prop-cyg1-09-normal"></a>

<!-- formal-statement-start -->
> **命題（滑らかな完全交叉の法束完全列）**
>
> $X=X_{d_1,\ldots,d_r}\subset\mathbb P^N_{\mathbb C}$ を非空の滑らかな射影完全交叉とする。包含を $i:X\hookrightarrow\mathbb P^N$ とすると、正則ベクトル束の短完全列

$$
0\longrightarrow TX\longrightarrow i^*T\mathbb P^N
\xrightarrow{\,(dF_1,\ldots,dF_r)\,}
\bigoplus_{a=1}^{r}\mathcal O_X(d_a)\longrightarrow0
$$

> が存在する。右端の束が $X$ の法束である。
<!-- formal-statement-end -->

### 証明の見取り図

微分行列の核は $r$ 本の方程式を一次で保つ方向、すなわち $TX$ である。階数 $r$ が全射性を与え、チャート間の斉次次数 $d_a$ の変換が $\mathcal O_X(d_a)$ を作る。

<!-- proof-start -->
### 証明

$Z_i\ne0$ のチャートで $f_a=F_a/Z_i^{d_a}$ とする。接ベクトル $v=\sum_{j\ne i}v_j\partial_{x_j}$ に対し

$$
v\longmapsto\bigl(df_1(v),\ldots,df_r(v)\bigr),\qquad
df_a(v)=\sum_{j\ne i}\frac{\partial f_a}{\partial x_j}v_j
$$

を考える。Jacobianの階数が $r$ なので、非零な $r\times r$ 小行列 $A$ が存在する。任意の $w\in\mathbb C^r$ に対して、対応する $r$ 個の $v_j$ を $A^{-1}w$、残りを零とすれば $df(v)=w$ となる。よってこの写像は各ファイバーで全射する。

[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)を、階数 $r$ の小行列が非零となる $r$ 変数に適用し、$f_1,\ldots,f_r$ を局所座標の最初の $r$ 個として取る。その座標では $X$ の接方向は $df_a(v)=0$（全 $a$）であり、核はちょうど階数 $N-r$ の $TX$ である。

チャートを $Z_k\ne0$ へ替えると $f_a^{(k)}=(Z_i/Z_k)^{d_a}f_a^{(i)}$ である。$X$ 上では $f_a^{(i)}=0$ だから、積の微分を用いて

$$
df_a^{(k)}=(Z_i/Z_k)^{d_a}df_a^{(i)}\quad\text{on }X.
$$

これは $\mathcal O_X(d_a)$ の遷移係数なので、各局所全射が直和束への写像として貼り合わされる。従って短完全列を得る。$\square$
<!-- proof-end -->

標準束 $K_X$ は複素次元 $n$ の正則余接束の最高外冪 $\det T^*X$ である。[超曲面の随伴公式](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)の証明と同様に、短完全列の行列式を取って一般形を得る。

<a id="prop-cyg1-09-adjunction"></a>

<!-- formal-statement-start -->
> **命題（滑らかな完全交叉の随伴公式）**
>
> $X=X_{d_1,\ldots,d_r}\subset\mathbb P^{n+r}_{\mathbb C}$ が非空の滑らかな射影完全交叉なら

$$
K_X\simeq\mathcal O_X\left(\sum_{a=1}^rd_a-n-r-1\right).
$$

> 特に $n\ge1$ のとき、$K_X$ が正則自明であるための必要十分条件は $\sum_a d_a=n+r+1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

法束の行列式は $\mathcal O_X(\sum d_a)$。射影空間の $K_{\mathbb P^N}=\mathcal O(-N-1)$ と結び付ける。逆向きには正の超平面類を積分して $\mathcal O_X(k)$ の非自明性を判定する。

<!-- proof-start -->
### 証明

[法束完全列](#prop-cyg1-09-normal)の行列式を取ると

$$
\det TX\otimes\bigotimes_{a=1}^r\mathcal O_X(d_a)
\simeq\det(i^*T\mathbb P^N).
$$

双対化し、$\det T^*\mathbb P^N=K_{\mathbb P^N}\simeq\mathcal O(-N-1)$ を使えば

$$
\begin{aligned}
K_X&\simeq i^*K_{\mathbb P^N}\otimes\bigotimes_{a=1}^r\mathcal O_X(d_a)\\
&\simeq\mathcal O_X(-N-1+\sum_{a=1}^rd_a).
\end{aligned}
$$

$N=n+r$ を代入すると主張の指数になる。指数が零なら明らかに $\mathcal O_X$ である。逆に $n\ge1$ で $\mathcal O_X(k)$ が自明なら、その第一Chern類 $kH$ は零であり

$$
0=\int_X(kH)H^{n-1}=k\int_XH^n
=k\prod_{a=1}^rd_a.
$$

最後の等式は、各方程式の因子の基本類が $d_aH$ であることと、周囲の $\int_{\mathbb P^N}H^N=1$ から出る。すべての $d_a>0$ なので $k=0$。従って指数零は必要条件でもある。$\square$
<!-- proof-end -->

この定理に $n=3,r=2,d_1=d_2=3$ を入れると $3+3-3-2-1=0$。第2節の $X$ は確かに $K_X\simeq\mathcal O_X$ である。標準束が自明という**代数的判定**から、Ricci平坦Kähler計量が存在すると結論するには、次章で扱うYauの定理という別の入力が要る。

## 4. Chern類とEuler標数の積公式

法束の階数が一から $r$ へ増えたので、[射影空間のEuler列とChern類](../CYG1-07/index.md#prop-cyg1-07-euler)、[Whitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)を同じ短完全列に適用する。

<a id="prop-cyg1-09-chern-euler"></a>

<!-- formal-statement-start -->
> **命題（滑らかな完全交叉のChern類とEuler標数）**
>
> $X=X_{d_1,\ldots,d_r}\subset\mathbb P^{n+r}_{\mathbb C}$ を非空の滑らかな射影完全交叉（$n\ge1$）とし、$H=c_1(\mathcal O_X(1))$ とする。全Chern類、超平面類のトップ積分、および位相的Euler標数はそれぞれ

$$
c(TX)=\frac{(1+H)^{n+r+1}}{\prod_{a=1}^r(1+d_aH)},
\qquad \int_XH^n=\prod_{a=1}^rd_a,
$$

$$
\chi_{\mathrm{top}}(X)=\left(\prod_{a=1}^rd_a\right)
\cdot[H^n]\frac{(1+H)^{n+r+1}}{\prod_{a=1}^r(1+d_aH)}.
$$

> ここで $[H^n]$ は形式的展開の係数を取り出す記号であり、式は $H^{n+1}=0$ で打ち切る。
<!-- formal-statement-end -->

### 証明の見取り図

法束の $r$ 本の線束のChern多項式が分母を作り、周囲の射影空間の接束が分子を作る。次数の積は周囲での交叉類を積分して得る。Euler標数には**滑らかでコンパクト**という仮定を照合してからトップChern類の定理を使う。

<!-- proof-start -->
### 証明

[$\mathbb P^N$ のEuler列による全Chern類](../CYG1-07/index.md#prop-cyg1-07-euler)を制限すると $c(i^*T\mathbb P^N)=(1+H)^{N+1}$。線束 $\mathcal O_X(d_a)$ の全Chern類は $1+d_aH$。[法束完全列](#prop-cyg1-09-normal)へWhitney積公式を適用し

$$
c(TX)\prod_{a=1}^r(1+d_aH)=(1+H)^{N+1}
$$

を得る。各分母は定数項1なので、$H^{n+1}=0$ のコホモロジー環で有限逆元を持つ。

正しい余次元 $r$ の交叉では、$\mathbb P^N$ の中の基本類は $[X]=(\prod_a d_a)H^r$。従って積分の押し出しにより

$$
\int_XH^n=\int_{\mathbb P^N}H^n\smile[X]
=\left(\prod_a d_a\right)\int_{\mathbb P^N}H^{n+r}
=\prod_a d_a.
$$

最後に $X$ は滑らかで射影的ゆえ、境界のないコンパクト複素 $n$ 次元多様体。[トップChern類とEuler標数の定理](../CYG1-07/index.md#thm-cyg1-07-gauss-bonnet)を $Y=X$ に適用して

$$
\chi_{\mathrm{top}}(X)=\int_Xc_n(TX)
=\left([H^n]c(TX)\right)\int_XH^n
$$

を得て、式を代入する。$\square$
<!-- proof-end -->

## 5. $(3,3)$ の数字をすべて確かめる

第2節でJacobian階数を検査した滑らかな三次・三次交叉 $X$ に、直前の一般式を $N=5$、$r=2$、$n=3$ として適用する。$H^4=0$ なので四次以上は捨ててよい。

$$
\begin{aligned}
(1+H)^6&=1+6H+15H^2+20H^3,\\
(1+3H)^{-2}&=1-6H+27H^2-108H^3.
\end{aligned}
$$

後者は $(1+3H)^{-1}=1-3H+9H^2-27H^3$ を二乗し、同じ次数の係数を集めても検算できる。したがって

$$
\begin{aligned}
[H^1]&:6-6=0,\\
[H^2]&:15-36+27=6,\\
[H^3]&:20-90+162-108=-16.
\end{aligned}
$$

よって

$$
c(TX)=1+6H^2-16H^3,
\quad \int_XH^3=3\cdot3=9,
\quad \chi_{\mathrm{top}}(X)=-16\cdot9=-144.
$$

ここでは $c_3=-16H^3$ が**類**、$-144$ がその**積分値**である。$ c_1=0$ から上の係数を一気に決めたのではなく、分母の二因子を三次まで展開している。

### 5.1 Hodge数に必要なもう一つの入力

位相的Euler標数だけでは $h^{1,1}$ や $h^{2,1}$ は確定しない。滑らかな射影完全交叉には、前章の[弱Lefschetzの考え方](../CYG1-08/index.md#thm-cyg1-08-weak-lefschetz)を一般化した外部定理を使う。

<a id="thm-cyg1-09-weak-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（滑らかな射影完全交叉の弱Lefschetz：外部入力）**
>
> $X\subset\mathbb P^N_{\mathbb C}$ が非空の滑らかな正次数の完全交叉で、複素次元 $n=N-r\ge1$ とする。包含 $i:X\hookrightarrow\mathbb P^N$ の整数係数コホモロジーへの引戻し

$$
i^*:H^k(\mathbb P^N;\mathbb Z)\longrightarrow H^k(X;\mathbb Z)
$$

> は $k<n$ で同型、$k=n$ で単射である。
<!-- formal-statement-end -->

これはこの章では証明しないLefschetz型の外部入力である。第2節の例では、まず $F=0$ が滑らかな四次元の三次超曲面で、次にその上の $G=0$ が滑らかな正の因子を与える。そこで弱Lefschetzを二回使うと、$\mathbb P^5\to\{F=0\}\to X$ の引戻しが次数 $k<3$ で同型であることを確認できる。$k=3$ の単射を同型と読み替えてはいけない。

<a id="prop-cyg1-09-33-hodge"></a>

<!-- formal-statement-start -->
> **命題（滑らかな三次二式の三次元完全交叉のHodge数）**
>
> $X\subset\mathbb P^5_{\mathbb C}$ を滑らかな二つの三次式の完全交叉とする。$X$ は連結コンパクトKähler三次元多様体で、標準束は正則自明であり、Euler標数と主要なHodge数は次の値を取る。

$$
K_X\simeq\mathcal O_X,\qquad
\chi_{\mathrm{top}}(X)=-144,\qquad
h^{1,1}(X)=1,\quad h^{2,1}(X)=73.
$$
<!-- formal-statement-end -->

### 証明の見取り図

弱Lefschetzは $b_0=1,b_1=0,b_2=1$ を決め、Kähler類の $(1,1)$ 型が二次のHodge分解を固定する。標準束の自明性が $h^{3,0}=1$ を与え、Euler標数の交代和から中央Betti数を復元する。

<!-- proof-start -->
### 証明

上の[弱Lefschetz定理](#thm-cyg1-09-weak-lefschetz)の $k=0,1,2$ と $H^k(\mathbb P^5;\mathbb Z)$ を対応させると

$$
b_0=1,\qquad b_1=0,\qquad b_2=1.
$$

$b_0=1$ から連結。滑らかな射影多様体だからコンパクトKählerで、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と[共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)が使える。

Kähler形式 $\omega$ の類は $(1,1)$ 型かつ非零である。もし $[\omega]=0$ なら $\omega=d\eta$ と書ける。閉性 $d\omega=0$ と[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)を使うと

$$
\int_X\omega^3=\int_Xd(\eta\wedge\omega^2)=0
$$

となるが、Kähler体積は正なので矛盾する。よって $h^{1,1}\ge1$。これを次数一・二のHodge分解に入れると

$$
0=b_1=2h^{1,0},\qquad
1=b_2=2h^{2,0}+h^{1,1}
$$

から $h^{1,0}=h^{2,0}=0,h^{1,1}=1$。一方[随伴公式](#prop-cyg1-09-adjunction)で $K_X\simeq\mathcal O_X$、連結かつコンパクトなので[正則体積形式と最高Hodge数](../CYG1-06/index.md#prop-cyg1-06-top-hodge)から $h^{3,0}=h^{0,3}=1$。

[Poincaré双対性](../../HOD/HOD1-07/index.md#thm-hod1-07-betti-constraints)でBetti数列は $(1,0,1,b_3,1,0,1)$。第5節の $\chi=-144$ を交代和へ代入すると

$$
-144=1+1-b_3+1+1=4-b_3,
\qquad b_3=148.
$$

よって $148=b_3=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}=2+2h^{2,1}$。従って $h^{2,1}=73$。$\square$
<!-- proof-end -->

[Hodge対称性](../CYG1-06/index.md#prop-cyg1-06-threefold-skeleton)を合わせると、この例の $p$ 行・$q$ 列のHodge数は

$$
(h^{p,q})_{0\le p,q\le3}=
\begin{pmatrix}
1&0&0&1\\
0&1&73&0\\
0&73&1&0\\
1&0&0&1
\end{pmatrix}.
$$

五次三次元超曲面の $1,101$ と比べると、$h^{1,1}$ は同じでも $h^{2,1}$ は異なる。標準束自明という条件だけでHodge数すべてが固定されるわけではない。

## 6. 計算が壊れる三つの境界

### 6.1 特異な五次式

$Y=\{Z_0^5+Z_1^5+Z_2^5+Z_3^5=0\}\subset\mathbb P^4$ は $P=[0:0:0:0:1]$ を含み、そこで五つの斉次偏微分がすべて零になる。従って $P$ で[滑らかな超曲面の法束列](../CYG1-07/index.md#prop-cyg1-07-normal)の右向きの微分は全射でない。滑らかな階数3の接束から $c_3(TY)$ を作り、$\int_Yc_3(TY)$ を通常のEuler標数と同一視する推論は使えない。Hodge分解の滑らかなコンパクトKähler版も直接適用できない。

ただし、**随伴公式の文字列まで全て消えるわけではない**。滑らかな標準束の代わりに、特異な代数多様体にも扱える**双対化層** $\omega_Y$ という正則層を用いる理論がある。例えば局所的に一つの零因子でない方程式で切り出される超曲面では、双対化層に対する随伴同型が残る。さらに複数の方程式が各段階で零因子でない列をなし、期待余次元を保つ場合を**局所完全交叉**という。この場合にも双対化層への随伴公式が成立することは外部の代数幾何の結果として用いる。これは滑らかな点での正則最高次微分形式の束 $K_Y$ と同じ意味で全域を扱える、という主張ではない。したがって数値 $\sum d_i-N-1$ が零でも、滑らかなCalabi–Yau三次元多様体だとは結論できない。

### 6.2 非コンパクト化

滑らかな五次 $X\subset\mathbb P^4$ から超平面切断 $D=X\cap\{Z_0=0\}$ を取り除き、$U=X\setminus D$ とする。$U$ は開部分多様体で、$K_U\simeq K_X|_U$ だから標準束の自明性は残る。しかし $U$ はコンパクトでない。第5節で使った「有限次元のHodge分解とPoincaré双対性」「境界項なしのトップChern類積分」は、そのままの形では適用できない。

最小例として $\mathbb C$ は $b_1=0$ であるが、正則一形式 $f(z)\,dz$（$f$ は任意の整関数）が無限次元に存在する。コンパクトKähler多様体の $b_1=h^{1,0}+h^{0,1}$ をこの非コンパクト例へ移すと誤る。非コンパクトの場合は、コンパクト台コホモロジーや境界の解析等、別の条件設定が要る。

### 6.3 方程式が接する、重複する

二変数の局所方程式 $f(x,y)=x$、$g(x,y)=x+y^2$ は、それぞれ滑らかな曲線を表す。しかし原点で微分は $df=(1,0)$、$dg=(1,0)$ で独立でない。原点付近で収束する二変数の冪級数全体を $\mathbb C\{x,y\}$ と書き、二つの方程式を零として課すために $(f,g)$ で割った環を考える。その交叉の局所環は

$$
\mathbb C\{x,y\}/(x,x+y^2)
\simeq\mathbb C\{y\}/(y^2)
$$

となり、二重の厚みを持つ。**零点集合が点に見えること**と、微分が全射する滑らかな零次元多様体であることは別である。局所完全交叉としての交叉数（重複度2）は残り得るが、その数を滑らかな接束のEuler計算へ無条件に置き換えられない。

さらに $F_1=F_2$ と同じ斉次式を二度並べると、二つの方程式でも余次元は一しかない。これは初めから余次元二の完全交叉ではなく、次数の積 $d_1d_2$ をその零点の次数として使う前提を失う。前者は**滑らかさ**、後者は**期待余次元**の破綻であり、混同しない。

| 対象 | 残るもの | 追加確認なしに使えないもの |
| --- | --- | --- |
| 滑らかな射影完全交叉 | 法束列、随伴、Chern類、トップ積分、コンパクトKählerのHodge理論 | Hodge数の個別値（Lefschetz等が必要） |
| 特異な局所完全交叉 | 双対化層の随伴公式、重複度付き交叉理論 | 滑らかな接束のChern–Gauss–Bonnet、通常のHodge分解 |
| 非コンパクトな滑らかな開部分 | 接束、標準束の制限と局所微分幾何 | コンパクト型のHodge対称性、境界なしのEuler積分 |
| 期待余次元を失った重複方程式 | 方程式そのもの | 余次元 $r$ の法束列、次数積の幾何的解釈 |

## 7. 演習：仮定を確認してから式を使う

<a id="ex-cyg1-09-a01"></a>
#### CYG1-09-A01 二行Jacobianと非空性
- Level: A

$F=\sum_{j=0}^{5}Z_j^3$、$G=\sum_{j=0}^{5}jZ_j^3$ の共通零点 $X\subset\mathbb P^5$ について、非空な点を一つ与え、$X$ 上でJacobianの階数が二になることを説明せよ。

<!-- solution-start -->
**詳細解答。** $u^3=-2$ と取る。点 $P=[1:u:1:0:0:0]$ では

$$
F(P)=1-2+1=0,\qquad G(P)=0-2+2=0.
$$

偏微分の行は $(3Z_j^2)_j$ と $(3jZ_j^2)_j$ である。これらが従属なら、非零の $Z_j$ を持つ添字では二行の成分比がすべて同じ整数 $j$ となる。異なる添字は同じ比を持たないので、非零座標は高々一つ。

しかし射影点に非零座標は少なくとも一つあり、一つだけなら $F=Z_j^3\ne0$ となって矛盾する。よって階数は二である。斉次性 $F(tZ)=t^3F(Z)$、$G(tZ)=t^3G(Z)$ を $t=1$ で微分すれば、共通零点では放射方向が両微分の核に入る。局所Jacobianも階数二を保ち、複素次元は $5-2=3$ である。
<!-- solution-end -->

<a id="ex-cyg1-09-a02"></a>
#### CYG1-09-A02 標準束の指数
- Level: A

滑らかな $(2,4)\subset\mathbb P^5$、$(3,3)\subset\mathbb P^5$、$(2,2,2,2)\subset\mathbb P^7$ はいずれも複素三次元の完全交叉とする。それぞれの $K_X$ を求めよ。

<!-- solution-start -->
**詳細解答。** [完全交叉の随伴公式](#prop-cyg1-09-adjunction)の指数は $\sum d_i-N-1$。順に $2+4-5-1=0$、$3+3-5-1=0$、$2+2+2+2-7-1=0$。よっていずれも $K_X\simeq\mathcal O_X$。各 $X$ は滑らかな完全交叉という仮定があり、複素次元も $N-r=3$ と合う。ただし三つのHodge数が等しいという結論は出ない。
<!-- solution-end -->

<a id="ex-cyg1-09-a03"></a>
#### CYG1-09-A03 逆数の三次展開
- Level: A

$H^4=0$ の可換環で $(1+3H)^{-2}$ を三次まで求め、$(1+3H)^2$ を掛けて $1$ に戻ることを確認せよ。

<!-- solution-start -->
**詳細解答。** $(1+t)^{-2}=1-2t+3t^2-4t^3$ に $t=3H$ を代入し、$1-6H+27H^2-108H^3$。乗数は $(1+3H)^2=1+6H+9H^2$ なので、$H$ の係数 $-6+6=0$、$H^2$ は $27-36+9=0$、$H^3$ は $-108+162-54=0$。積は $1$（四次以上は零）である。
<!-- solution-end -->

<a id="ex-cyg1-09-a04"></a>
#### CYG1-09-A04 次数の積は何の値か
- Level: A

滑らかな $(2,4)\subset\mathbb P^5$ の超平面類を $H$ とする。$\int_XH^3$ を求め、$H^3=8$ と書くことが不適切な理由を述べよ。

<!-- solution-start -->
**詳細解答。** 期待余次元二で滑らかだから、周囲で $[X]=(2H)(4H)=8H^2$。[滑らかな完全交叉のChern類とEuler標数](#prop-cyg1-09-chern-euler)に含まれる積分の等式より $\int_XH^3=\int_{\mathbb P^5}H^3(8H^2)=8$。$H^3$ は $H^6(X;\mathbb Z)$ のコホモロジー類、$8$ は基本類への評価値という別の型なので等号でつなげない。
<!-- solution-end -->

<a id="ex-cyg1-09-a05"></a>
#### CYG1-09-A05 接する方程式の核
- Level: A

$\mathbb C^2$ で $f=x$、$g=x+y^2$ とする。原点で二行のJacobianの階数を求め、商環が $\mathbb C\{y\}/(y^2)$ になる理由を示せ。

<!-- solution-start -->
**詳細解答。** 行は $(1,0)$ と $(1,2y)$、原点では二行とも $(1,0)$ で階数一。$f=0$ から $x=0$ として $g$ へ代入すれば $y^2=0$。従って商環は $\mathbb C\{x,y\}/(x,x+y^2)\simeq\mathbb C\{y\}/(y^2)$ である。$y$ は零でないが $y^2=0$ なので被約な点の局所環ではなく、滑らかな余次元二のJacobian条件に失敗する。
<!-- solution-end -->

<a id="ex-cyg1-09-b01"></a>
#### CYG1-09-B01 $(2,4)$ のEuler標数とHodge数
- Level: B

滑らかな完全交叉 $X_{2,4}\subset\mathbb P^5$ に対して $c_1,c_2,c_3,\chi_{\mathrm{top}},h^{1,1},h^{2,1}$ を求めよ。弱LefschetzとHodge分解を利用してよいが適用条件を挙げること。

<!-- solution-start -->
**詳細解答。** 複素次元三、滑らかな射影完全交叉なので $H^4=0$、$K_X\simeq\mathcal O_X$、弱Lefschetzが適用できる。全Chern類は

$$
\frac{(1+H)^6}{(1+2H)(1+4H)}.
$$

分母は $1+6H+8H^2$。その逆元を $1+aH+bH^2+cH^3$ と置き、係数比較すると $a=-6$、$b=-8-6a=28$、$c=-6b-8a=-120$。分子 $1+6H+15H^2+20H^3$ と掛けて

$$
c_1=(6-6)H=0,\quad
c_2=(15-36+28)H^2=7H^2,
$$

$$
c_3=(20-90+168-120)H^3=-22H^3.
$$

$\int_XH^3=2\cdot4=8$ だから $\chi=-22\cdot8=-176$。弱Lefschetzで $b_1=0,b_2=1$、非零の $(1,1)$ Kähler類とHodge分解で $h^{1,1}=1,h^{2,0}=0$。連結かつ $K_X$ 自明なので $h^{3,0}=1$。Poincaré双対性で $b_3=4-\chi=180$、$b_3=2+2h^{2,1}$ から $h^{2,1}=89$。
<!-- solution-end -->

<a id="ex-cyg1-09-b02"></a>
#### CYG1-09-B02 四本の二次式
- Level: B

滑らかな $X_{2,2,2,2}\subset\mathbb P^7$ を考える。全Chern類の三次まで、$\chi_{\mathrm{top}}$、$h^{2,1}$ を求め、標準束も確認せよ。

<!-- solution-start -->
**詳細解答。** $N=7,r=4,n=3$、$\sum d_a=8=N+1$ なので[随伴公式](#prop-cyg1-09-adjunction)で $K_X$ 自明。全Chern類の分子は $1+8H+28H^2+56H^3$。分母は $(1+2H)^4=1+8H+24H^2+32H^3$。逆元を $1+aH+bH^2+cH^3$ と置いて積の各正次数を零とすると

$$
a=-8,\quad b=-24-8a=40,\quad
c=-32-24a-8b=-160.
$$

従って

$$
(1+2H)^{-4}=1-8H+40H^2-160H^3.
$$

係数を掛けると $c_1=0$、$c_2=(28-64+40)H^2=4H^2$、$c_3=(56-224+320-160)H^3=-8H^3$。次数積は $\int_XH^3=2^4=16$、従って $\chi=-128$。滑らかな射影三次元完全交叉なので弱Lefschetz・非零Kähler類・Hodge分解から $h^{1,1}=1$、標準束から $h^{3,0}=1$。$-128=2(1-h^{2,1})$ を解くと $h^{2,1}=65$。
<!-- solution-end -->

<a id="ex-cyg1-09-b03"></a>
#### CYG1-09-B03 弱LefschetzとHard Lefschetzの役割
- Level: B

滑らかな $(3,3)\subset\mathbb P^5$ の $b_2=1$ を、Hard Lefschetzだけから結論できるか。使う写像の定義域と行き先をそれぞれ示し、どちらを用いて $h^{1,1}=1$ を確定するか説明せよ。

<!-- solution-start -->
**詳細解答。** [Hard Lefschetz](../CYG1-06/index.md#prop-cyg1-06-kahler-constraints)は複素次元三の $X$ **内部**で

$$
L:H^2(X;\mathbb C)\longrightarrow H^4(X;\mathbb C),
\qquad\alpha\longmapsto[\omega]\smile\alpha
$$

が同型と述べる。これは両群の次元の一致であって、値が一という情報ではない。

これに対し[完全交叉の弱Lefschetz](#thm-cyg1-09-weak-lefschetz)は包含 $i:X\hookrightarrow\mathbb P^5$ について

$$
i^*:H^2(\mathbb P^5;\mathbb Z)\xrightarrow{\simeq}H^2(X;\mathbb Z)
$$

を与える。周囲の $H^2(\mathbb P^5;\mathbb Z)\simeq\mathbb Z$ から $b_2=1$ が決まる。Kähler類は非零の $(1,1)$ 型なので $h^{1,1}\ge1$。Hodge分解と共役対称性で

$$
1=b_2=2h^{2,0}+h^{1,1}
$$

と分ければ、$h^{1,1}=1$ である。
<!-- solution-end -->

<a id="ex-cyg1-09-b04"></a>
#### CYG1-09-B04 三種類の失敗を区別する
- Level: B

次の対象について、滑らかな完全交叉用のどの推論が使えなくなるか説明せよ。

1. 特異点 $[0:0:0:0:1]$ を持つ $Y=\{Z_0^5+\cdots+Z_3^5=0\}\subset\mathbb P^4$。
2. 滑らかな射影五次 $X$ の非コンパクト開部分 $X\setminus\{Z_0=0\}$。
3. $\mathbb P^5$ で同じ三次式 $F$ を二度並べた $F=F=0$。

<!-- solution-start -->
**詳細解答。**

1. 指定点では全偏微分が零。法方向への微分は全射でないため滑らかな接束の法束列とトップChern積分を適用できない。Cartier因子として双対化層の随伴公式が残ることと、滑らかな正則最高次形式の束が使えることを区別する。
2. 開部分では接束と標準束の局所構成は使えるが、コンパクト性を失う。従ってコンパクトKählerのHodge分解、Poincaré双対性の通常形、境界なしのChern–Gauss–Bonnet積分を無条件には使えない。
3. 二つの微分の行は等しく階数一、また零点の余次元は一である。二本の独立した方程式を要求する法束列も、余次元二の交叉の次数積も、この対象の表示からは成立しない。

どの場合も「次数が正しい」ことだけを滑らかさ・コンパクト性・期待余次元の代わりにしてはいけない。
<!-- solution-end -->

<a id="ex-cyg1-09-c01"></a>
#### CYG1-09-C01 $(3,3)$ 三次元を出発点から
- Level: C

$F=\sum_{j=0}^5Z_j^3$、$G=\sum_{j=0}^5jZ_j^3$ の共通零点 $X\subset\mathbb P^5$ について、滑らかさ・複素次元・標準束・$c_1,c_2,c_3$・Euler標数・$b_3$・$h^{1,1},h^{2,1}$ をすべて導出せよ。利用した外部定理とその適用条件も述べよ。

<!-- solution-start -->
**詳細解答。** $F=G=0$ は $[1:u:1:0:0:0]$（$u^3=-2$）を含む。斉次Jacobianの二行は $(3Z_j^2)$ と $(3jZ_j^2)$ で、階数が一以下なら非零座標は高々一つになり $F=0$ と矛盾する。よって各局所Jacobianは階数二で、$X$ は滑らかな複素三次元完全交叉。射影閉部分なのでコンパクトKählerである。

[随伴公式](#prop-cyg1-09-adjunction)で $K_X=\mathcal O_X(3+3-5-1)=\mathcal O_X$。[滑らかな完全交叉のChern類とEuler標数](#prop-cyg1-09-chern-euler)を適用すると

$$
\begin{aligned}
c(TX)&=(1+6H+15H^2+20H^3)(1-6H+27H^2-108H^3)\\
&=1+(6-6)H+(15-36+27)H^2\\
&\quad +(20-90+162-108)H^3\\
&=1+6H^2-16H^3.
\end{aligned}
$$

積分値は $\int_XH^3=3\cdot3=9$。滑らか・境界なし・コンパクトという条件を確認した上で[トップChern類の定理](../CYG1-07/index.md#thm-cyg1-07-gauss-bonnet)を使うと $\chi=-16\cdot9=-144$。

[弱Lefschetz](#thm-cyg1-09-weak-lefschetz)の $k<3$ の同型を射影空間のコホモロジーへ適用し、$b_0=1,b_1=0,b_2=1$ を得る。[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と非零Kähler類の $(1,1)$ 型から

$$
h^{1,0}=0,\qquad h^{2,0}=0,\qquad h^{1,1}=1.
$$

標準束が正則自明かつ $X$ が連結コンパクトなので、[最高Hodge数](../CYG1-06/index.md#prop-cyg1-06-top-hodge)は $h^{3,0}=h^{0,3}=1$ となる。Poincaré双対性でBetti数列は $(1,0,1,b_3,1,0,1)$。Euler標数の交代和と共役対称性から

$$
-144=4-b_3,\qquad b_3=148,
$$

$$
148=1+h^{2,1}+h^{1,2}+1=2+2h^{2,1}.
$$

従って $h^{2,1}=73$ であり、$2(1-73)=-144$ と戻して検算できる。
<!-- solution-end -->

<a id="ex-cyg1-09-c02"></a>
#### CYG1-09-C02 形は似ていてもHodge数が違う
- Level: C

滑らかな $(2,4)$ と $(3,3)$ をともに $\mathbb P^5$ 内の複素三次元完全交叉とする。標準束が両方自明であることを確認した後、Chern類の三次係数、次数、Euler標数、$h^{2,1}$ の違いを導け。もし同じ式を二度書いて「$(3,3)$」と称したら、どこから失敗するかも述べよ。

<!-- solution-start -->
**詳細解答。** 随伴公式の指数は両方とも $\sum d_i-6=0$ なので標準束自明。$(3,3)$ は $(1+H)^6(1+3H)^{-2}$ で三次係数 $20-90+162-108=-16$、次数は $9$、$\chi=-144$。$(2,4)$ は $(1+H)^6(1+2H)^{-1}(1+4H)^{-1}$ で、逆元 $1-6H+28H^2-120H^3$ を使うと三次係数 $20-90+168-120=-22$、次数は $8$、$\chi=-176$。

どちらも滑らかな射影完全交叉なので弱Lefschetzで $b_2=1$、Kähler類の型から $h^{1,1}=1$、標準束から $h^{3,0}=1$。従って $h^{2,1}=1-\chi/2$ に代入し、それぞれ $73$、$89$。もし二方程式が同じならJacobianの二行が独立でなく、零点の余次元も一になる。最初の法束完全列の仮定が崩れ、見かけの次数 $(3,3)$ をこの計算に代入すること自体が不正となる。
<!-- solution-end -->

## 8. 次は計量の存在を問う

完全交叉の次数とJacobianを確かめれば、標準束とChern数の多くは有限の代数計算で決まる。ただし $K_X\simeq\mathcal O_X$ という線束の情報は、**どのKähler類にRicci平坦な計量が存在するか**という解析的な存在問題とは別である。次章ではその間を埋めるYauの定理の仮定と結論を精密に述べる。
