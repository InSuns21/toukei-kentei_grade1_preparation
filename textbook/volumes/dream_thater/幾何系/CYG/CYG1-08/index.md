# CYG1-08 五次Calabi–Yau三次元多様体のHodge数1と101

## 1. Euler標数だけでは、二つのHodge数は求まらない

[前章のChern類計算](../CYG1-07/index.md#prop-cyg1-07-quintic)により、滑らかなFermat五次超曲面の位相的Euler標数は $-200$ と分かった。しかし、Euler標数はBetti数の**交代和**である。個々のBetti数やHodge数を求めるには、もう一種類の入力が要る。

今回の目標は、複素射影空間の低次コホモロジーを超曲面へ受け渡す**弱Lefschetz超平面定理**を使って、まず $h^{1,1}=1$ を決めることだ。それから標準束の自明性、Hodge分解、Euler標数をつなぎ、中央の $h^{2,1}=101$ へ到達する。前章の式を単に暗記するのではなく、どの定理がどの数字を決めたのかを一つずつ追おう。

本章で扱うのは、斉次五次式 $F$ の零点が定める**滑らかな**射影超曲面

$$
X=\{[Z_0:\cdots:Z_4]\in\mathbb P^4_{\mathbb C}\mid F(Z_0,\ldots,Z_4)=0\}.
$$

$X$ は複素次元 $3$（実次元 $6$）であり、$i:X\hookrightarrow\mathbb P^4$ は包含写像とする。$H=c_1(\mathcal O_{\mathbb P^4}(1)|_X)$ を超平面類と呼び、$b_k=\dim_{\mathbb C}H^k(X;\mathbb C)$、$h^{p,q}=\dim_{\mathbb C}H^{p,q}_{\bar\partial}(X)$ と記す。$H^k$ は通常のコホモロジー次数 $k$、一方 $H^j$（超平面類の冪）は実次数 $2j$ の類なので、両者の意味を文脈で区別する。

## 2. 最初に滑らかさと標準束を判定する

具体例としてFermat型の斉次式を選ぼう。

$$
F(Z_0,\ldots,Z_4)=Z_0^5+Z_1^5+Z_2^5+Z_3^5+Z_4^5.
$$

多項式の次数が五であるだけでは、後で用いるLefschetz定理やHodge分解の滑らかな対象に関する仮定を満たすとは限らない。そこで[射影超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)に照らして確かめる。

<a id="prop-cyg1-08-smooth-canonical"></a>

<!-- formal-statement-start -->
> **命題（Fermat五次の滑らかさと標準束）**
>
> $F=\sum_{j=0}^4Z_j^5$ の零点で定まる $X\subset\mathbb P^4_{\mathbb C}$ は滑らかなコンパクトKähler三次元多様体で、標準束は正則自明である。

$$
K_X\simeq\mathcal O_X.
$$
<!-- formal-statement-end -->

### 証明の見取り図

偏微分が同時に零になるのは射影空間に存在しない原点だけである。滑らかさを確認した後に、[随伴公式による次数判定](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)へ $d=5,m=4$ を代入する。射影多様体がKählerであることも別の根拠から確かめる。

<!-- proof-start -->
### 証明

斉次偏微分は

$$
\frac{\partial F}{\partial Z_j}=5Z_j^4\qquad(0\le j\le4).
$$

すべてが零なら $Z_0=\cdots=Z_4=0$ だが、零ベクトルは射影点を定めない。さらに平方因子 $G^2$ が $F$ を割れば、正次数の $G$ の零点上で[積の微分公式](../../../基礎科目/RA/RA3/index.md#prop-ra3-product-rule)により $dF=2GQ\,dG+G^2\,dQ=0$ となる。これは先ほどの同時非消滅に矛盾する。したがって[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の平方因子に関する仮定も満たし、$X$ は滑らかである。

$X$ は射影空間の閉部分集合だからコンパクト。滑らかな超曲面であるから、複素次元は $4-1=3$。[射影埋め込みからのKähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)によってKähler計量を持つ。

[滑らかな超曲面の随伴公式](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)の $m=4,d=5$ を使うと

$$
K_X\simeq\mathcal O_X(d-m-1)
=\mathcal O_X(5-4-1)
=\mathcal O_X.
$$

ここではJacobianで**滑らかさ**、射影性で**コンパクト性とKähler性**、随伴公式で**標準束**をそれぞれ確認した。$\square$
<!-- proof-end -->

**局所座標での確認。** $Z_4\ne0$ のチャートで $x_j=Z_j/Z_4$（$0\le j\le3$）とすれば $f=\sum_{j=0}^3x_j^5+1$ で、$df=5\sum_{j=0}^3x_j^4dx_j$。$df=0$ なら $x_0=\cdots=x_3=0$ だが、その点で $f=1$。この一チャートだけでは $Z_4=0$ を調べていないので、上の斉次Jacobian計算が必要である。

**連結性にはまだ注意する。** コンパクトというだけでは連結は保証されない。次の弱Lefschetz定理で $H^0(X;\mathbb Z)\simeq\mathbb Z$ を確認してから、連結性を使う。

## 3. 弱Lefschetzはどの次数を固定するか

射影空間 $\mathbb P^4$ の低次Betti数は $b_0=1,b_1=0,b_2=1$ である。ただし $X$ は $\mathbb P^4$ と同じ空間ではない。包含 $i$ の引戻しが、**どの次数まで同型なのか**を述べるのが弱Lefschetz超平面定理だ。

<a id="thm-cyg1-08-weak-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（滑らかな五次三次元超曲面の弱Lefschetz定理：外部入力）**
>
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな次数五の射影超曲面とし、$i:X\hookrightarrow\mathbb P^4$ を包含とする。整数係数特異コホモロジーへの引戻し

$$
i^*:H^k(\mathbb P^4;\mathbb Z)\longrightarrow H^k(X;\mathbb Z)
$$

> は $k<3$ で同型、$k=3$ で単射である。特に

$$
H^0(X;\mathbb Z)\simeq\mathbb Z,\qquad
H^1(X;\mathbb Z)=0,\qquad
H^2(X;\mathbb Z)\simeq\mathbb Z
$$

> であり、次数二の生成元として超平面類 $H=i^*c_1(\mathcal O_{\mathbb P^4}(1))$ を選べる。
<!-- formal-statement-end -->

この定理は**この章では証明しない外部入力**である。[四次曲面で用いたLefschetz定理](../CYG1-05/index.md#thm-cyg1-05-lefschetz-input)と同じ一般原理を、複素次元 $2$ ではなく $3$ に適用したものだ。次数五の滑らかな超曲面は正（ample）な線束 $\mathcal O_{\mathbb P^4}(5)$ の滑らかな零因子だから適用できる。一般形・証明への入口には [Huybrechtsの講義ノート、§4.1.3](https://www.math.uni-bonn.de/people/huybrech/Dular.pdf) を参照できる。

一つ手を動かす。$\mathbb P^4$ の整数係数コホモロジーは $\mathbb Z[H_{\mathbb P}]/(H_{\mathbb P}^5)$ で、$H_{\mathbb P}$ の次数は $2$。よって $k=0,1,2$ の引戻しを個別に使うと、$X$ の連結性と $b_1=0,b_2=1$ が初めて確定する。$k=3$ では $H^3(\mathbb P^4;\mathbb Z)=0$ からの単射なので、$H^3(X)$ が零とは結論できない。

ここで[Hard LefschetzとKähler類の制約](../CYG1-06/index.md#prop-cyg1-06-kahler-constraints)と混同してはいけない。Hard Lefschetzは**一つのKähler多様体の内部**でKähler類を掛ける同型を述べる。一方、弱Lefschetzは**周囲の空間から超曲面への包含**が誘導するコホモロジー写像を比較する。両者の対象となる写像が違う。

## 4. 二次のBetti数一個から $h^{1,1}=1$ へ

Betti数は複素次数 $p+q=k$ のHodge数の和となる。しかし「$b_2=1$ だから $h^{1,1}=1$」と直行はできない。$H^{2,0}$ と $H^{0,2}$ に一次元が割り当てられる可能性を消さなければならない。

射影空間のFubini–Study形式の制限 $\omega$ はKähler形式で、超平面類 $H$ と同じ実コホモロジー方向にある。Kähler形式は $(1,1)$ 型で、$\int_X\omega^3>0$ となる。もし $[\omega]=0$ なら $\omega=d\eta$ と書けるため、$d\omega=0$ と[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)から

$$
\int_X\omega^3=\int_Xd(\eta\wedge\omega^2)=0
$$

となり矛盾する。従って $H^{1,1}_{\bar\partial}(X)$ に**非零の元が少なくとも一つ**ある。この型と非零性が、抽象的な $b_2=1$ と $h^{1,1}=1$ を結ぶ橋になる。

<a id="prop-cyg1-08-low-hodge"></a>

<!-- formal-statement-start -->
> **命題（五次三次元超曲面の低次Hodge数）**
>
> $X\subset\mathbb P^4_{\mathbb C}$ が滑らかな次数五の超曲面なら、$X$ は連結コンパクトKähler三次元多様体で、

$$
h^{1,0}(X)=h^{2,0}(X)=0,
\qquad h^{1,1}(X)=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[弱Lefschetz定理](#thm-cyg1-08-weak-lefschetz)は $b_1=0,b_2=1$ を与える。[Hodge分解と共役対称性](../CYG1-06/index.md#prop-cyg1-06-kahler-constraints)でこれを非負整数の和に分け、非零Kähler類を $(1,1)$ 成分に置く。

<!-- proof-start -->
### 証明

[滑らかな五次三次元超曲面の弱Lefschetz定理](#thm-cyg1-08-weak-lefschetz)から $H^0(X;\mathbb Z)\simeq\mathbb Z$ なので $X$ は連結であり、$b_1=0,b_2=1$。滑らかな射影多様体であるからKählerであり、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を使える。

次数一について、[共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)は $h^{0,1}=h^{1,0}$ を与える。そこで

$$
0=b_1=h^{1,0}+h^{0,1}=2h^{1,0}
$$

から $h^{1,0}=0$ となる。

次数二では

$$
1=b_2=h^{2,0}+h^{1,1}+h^{0,2}
=2h^{2,0}+h^{1,1}.
$$

Kähler類 $[\omega]\ne0$ は $(1,1)$ 型であるから $h^{1,1}\ge1$。上式の各Hodge数は非負整数なので、$1=2h^{2,0}+h^{1,1}$ を満たすのは

$$
h^{2,0}=0,\qquad h^{1,1}=1
$$

だけである。$\square$
<!-- proof-end -->

**別角度の検算。** $H^2(X;\mathbb C)$ は弱Lefschetzにより $H$ の複素数倍だけからなる。その $H$ 自身は $(1,1)$ 型である。Hodge分解が直和なので、$(2,0)$ 成分と $(0,2)$ 成分は存在し得ない。これは上の数値不等式と同じ結論を、**生成元の型**から読み直したものだ。

## 5. 標準束とChern類はそれぞれ別の数字を決める

次に中央次数 $H^3(X)$ の大きさを求める。まず[正則体積形式と最高Hodge数](../CYG1-06/index.md#prop-cyg1-06-top-hodge)を使う。この結果の仮定は**連結・コンパクト・$K_X$ の正則自明性**であり、第2節と第3節で全て確認したので

$$
h^{3,0}=h^{0,3}=1.
$$

一方、[前章の滑らかな射影超曲面の全Chern類](../CYG1-07/index.md#prop-cyg1-07-total-chern)を $m=4,d=5$ に適用する。この式はFermat型に限らず**どの滑らかな五次超曲面にも**成立する。複素次元3なので $H^4=0$ として

$$
\begin{aligned}
c(TX)&=\frac{(1+H)^5}{1+5H},\\
(1+H)^5&=1+5H+10H^2+10H^3,\\
(1+5H)^{-1}&=1-5H+25H^2-125H^3.
\end{aligned}
$$

係数を順に掛けると

$$
\begin{aligned}
[H]&:5-5=0,\\
[H^2]&:10-25+25=10,\\
[H^3]&:10-50+125-125=-40,
\end{aligned}
$$

従って $c(TX)=1+10H^2-40H^3$ である。次数五の超曲面の基本類は周囲で $5H_{\mathbb P}$ と表され、三つの超平面で切った交点数が五となるため、$\int_XH^3=5$。

ここで初めて[トップChern類とEuler標数の定理](../CYG1-07/index.md#thm-cyg1-07-gauss-bonnet)を適用する。**滑らかなコンパクト複素三次元**が仮定であり、第2節で検証済みである。

$$
\chi_{\mathrm{top}}(X)
=\int_Xc_3(TX)
=-40\int_XH^3
=-40\cdot5=-200.
$$

負号は三次係数に由来する。$c_2=10H^2$ はこの最高次の積分へ直接は入らない。Chern類の**次数**とEuler標数の**符号**を区別しておこう。

## 6. 中央のBetti数204からHodge数101へ

これまで決めた情報を並べると、弱Lefschetzにより $b_0=1,b_1=0,b_2=1$、連結・コンパクトで向き付け可能な実6次元多様体の[Poincaré双対性とBetti数の対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-betti-constraints)から $b_6=b_0=1,b_5=b_1=0,b_4=b_2=1$ となる。残るのは $b_3$ だけである。

Euler標数の交代和を実際に書くと

$$
\begin{aligned}
-200
&=\sum_{k=0}^{6}(-1)^k b_k\\
&=1-0+1-b_3+1-0+1\\
&=4-b_3,
\end{aligned}
$$

よって $b_3=204$ である。ここでHodge分解と共役対称性を**次数三**に適用する。

$$
\begin{aligned}
b_3
&=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}\\
&=1+h^{2,1}+h^{2,1}+1\\
&=2+2h^{2,1}.
\end{aligned}
$$

したがって $204=2+2h^{2,1}$、すなわち $h^{2,1}=101$。これで二つの数字の出所がすべて見えた。

<a id="prop-cyg1-08-hodge-diamond"></a>

<!-- formal-statement-start -->
> **命題（五次三次元超曲面のHodgeダイヤモンド）**
>
> $X\subset\mathbb P^4_{\mathbb C}$ を滑らかな次数五の超曲面とする。この連結コンパクトKähler三次元多様体のHodge数は、行を $p$、列を $q$ として

$$
(h^{p,q}(X))_{0\le p,q\le3}=
\begin{pmatrix}
1&0&0&1\\
0&1&101&0\\
0&101&1&0\\
1&0&0&1
\end{pmatrix}.
$$

> とくに $h^{1,1}=1$、$h^{2,1}=101$、$b_3=204$、$\chi_{\mathrm{top}}=-200$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[低次Hodge数](#prop-cyg1-08-low-hodge)、正則体積形式、Chern類からのEuler標数を上の順番で求め、[三次元のHodge数の数値骨格](../CYG1-06/index.md#prop-cyg1-06-threefold-skeleton)へ代入する。

<!-- proof-start -->
### 証明

第4節より $a=h^{1,0}=0,b=h^{2,0}=0,c=h^{1,1}=1$。第5節より $h^{3,0}=1,\chi_{\mathrm{top}}=-200$。これらを[三次元Hodge数の数値骨格](../CYG1-06/index.md#prop-cyg1-06-threefold-skeleton)の

$$
\chi_{\mathrm{top}}=2(c+2b-2a-d),\qquad d=h^{2,1}
$$

へ入れると $-200=2(1-d)$ だから $d=101$。同じ骨格の行列へ $(a,b,c,d)=(0,0,1,101)$ を代入して表示の表を得る。次数ごとの和は $(b_0,\ldots,b_6)=(1,0,1,204,1,0,1)$ で、交代和は $-200$ に戻る。$\square$
<!-- proof-end -->

**何を使わなかったか。** Ricci平坦Kähler計量の存在や、ホロノミーがちょうど $SU(3)$ であることは、上のHodge数の算出に必要な入力ではない。また、$h^{2,1}=101$ を直ちに「複素構造の実際のモジュライの次元」と断定することもできない。変形の接空間と無障害性の違いは後続で調べる。

## 7. 演習：各数字の根拠を再構成する

<a id="ex-cyg1-08-a01"></a>
#### CYG1-08-A01 Fermat五次の滑らかさ
- Level: A

$F=\sum_{j=0}^4Z_j^5$ とする。五つの斉次偏微分を全て書き、$F=0$ の射影点に特異点がないことを示せ。Jacobian判定の平方因子に関する仮定にも触れよ。

<!-- solution-start -->
**詳細解答。** $\partial F/\partial Z_j=5Z_j^4$（$0\le j\le4$）。全て零なら全成分 $Z_j=0$ となり射影点ではない。もし $F=G^2Q$ と正次数の $G$ で表せたら、$G=0$ の射影点で

$$
dF=2GQ\,dG+G^2\,dQ=0
$$

となり矛盾する。したがって平方因子もなく、[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の仮定が成立して滑らかである。
<!-- solution-end -->

<a id="ex-cyg1-08-a02"></a>
#### CYG1-08-A02 随伴公式の次数
- Level: A

滑らかな次数 $d$ の超曲面 $Y_d\subset\mathbb P^4_{\mathbb C}$ に対して $K_{Y_d}$ を求め、$d=5$ と $d=4$ を比較せよ。

<!-- solution-start -->
**詳細解答。** [随伴公式](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)へ周囲の次元 $m=4$ を代入し

$$
K_{Y_d}\simeq\mathcal O_{Y_d}(d-m-1)
=\mathcal O_{Y_d}(d-5).
$$

$d=5$ では指数零なので正則自明、$d=4$ では $\mathcal O_{Y_4}(-1)$ であり、正の超平面類との積分を使った同次数判定から正則自明ではない。どちらも滑らかな場合に適用した。
<!-- solution-end -->

<a id="ex-cyg1-08-a03"></a>
#### CYG1-08-A03 弱Lefschetzの次数境界
- Level: A

滑らかな五次超曲面 $X\subset\mathbb P^4$ で、包含が誘導する $H^k(\mathbb P^4;\mathbb Z)\to H^k(X;\mathbb Z)$ は $k=0,1,2,3$ の各次数で何を保証するか。$k=3$ の単射を同型と言い換えないこと。

<!-- solution-start -->
**詳細解答。** [弱Lefschetz定理](#thm-cyg1-08-weak-lefschetz)は複素次元 $3$ のため $k<3$ で同型、$k=3$ で単射と述べる。周囲のコホモロジーは $H^0=\mathbb Z,H^1=0,H^2=\mathbb Z,H^3=0$ なので、$X$ でも最初の三つは同じ。$k=3$ は零群から $H^3(X)$ への単射（常に成立する）だけで、$H^3(X)=0$ は従わない。
<!-- solution-end -->

<a id="ex-cyg1-08-a04"></a>
#### CYG1-08-A04 非零Kähler類の役割
- Level: A

連結コンパクトKähler多様体 $X$ で $b_2=1$ が与えられたとする。$h^{1,1}=1,h^{2,0}=0$ を、Kähler類の型と非零性から導け。

<!-- solution-start -->
**詳細解答。** Kähler形式 $\omega$ は $(1,1)$ 型。複素次元 $n\ge1$ なら $\int_X\omega^n>0$ である。仮に $[\omega]=0$ なら $\omega=d\eta$ と書ける。$d\omega=0$ を使うと

$$
\omega^n=d(\eta\wedge\omega^{n-1}).
$$

境界のないコンパクト多様体の[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)から積分は零となって矛盾する。よって $[\omega]\ne0$。その型から $h^{1,1}\ge1$ である。[Hodge分解と共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)を使うと

$$
1=b_2=2h^{2,0}+h^{1,1}.
$$

各項が非負整数だから $h^{2,0}=0,h^{1,1}=1$ となる。
<!-- solution-end -->

<a id="ex-cyg1-08-a05"></a>
#### CYG1-08-A05 五次Chern多項式の係数
- Level: A

滑らかな五次超曲面 $X\subset\mathbb P^4_{\mathbb C}$ の超平面類を $H=c_1(\mathcal O_{\mathbb P^4}(1)|_X)$ とする。複素次元3ゆえ $H^4=0$ である。$(1+H)^5/(1+5H)$ の $H^1,H^2,H^3$ の係数を求めよ。

<!-- solution-start -->
**詳細解答。** 分母の逆元は $1-5H+25H^2-125H^3$。分子は $1+5H+10H^2+10H^3$ と三次で打ち切る。畳み込みで

$$
\begin{aligned}
[H^1]&=5-5=0,\\
[H^2]&=10-25+25=10,\\
[H^3]&=10-50+125-125=-40.
\end{aligned}
$$

したがって $c_1=0,c_2=10H^2,c_3=-40H^3$。複素次元3の最高次は $c_3$ である。
<!-- solution-end -->

<a id="ex-cyg1-08-b01"></a>
#### CYG1-08-B01 Betti数を両側から埋める
- Level: B

$X$ を滑らかな五次超曲面とする。弱Lefschetzから低次Betti数を求め、Poincaré双対性を使って $b_3$ 以外の $b_0,\ldots,b_6$ を決定せよ。

<!-- solution-start -->
**詳細解答。** [弱Lefschetz定理](#thm-cyg1-08-weak-lefschetz)に $k=0,1,2$ を代入すると $b_0=1,b_1=0,b_2=1$。$X$ は滑らか・コンパクト・向き付け可能な実6次元だから[Poincaré双対性](../../HOD/HOD1-07/index.md#thm-hod1-07-betti-constraints)が使える。従って

$$
b_6=b_0=1,\quad b_5=b_1=0,\quad b_4=b_2=1.
$$

以上より数列は $(1,0,1,b_3,1,0,1)$。双対性は中央次数の値そのものを固定しない。
<!-- solution-end -->

<a id="ex-cyg1-08-b02"></a>
#### CYG1-08-B02 低次Hodge数を消す論理
- Level: B

滑らかな五次超曲面 $X$ について、$b_1=0,b_2=1$ から $h^{1,0}=0,h^{2,0}=0,h^{1,1}=1$ へ到達する際、使った定理・追加情報を順に書け。単に $b_2=1$ だけで $h^{1,1}=1$ としてよいか判定せよ。

<!-- solution-start -->
**詳細解答。** 射影的なのでKählerであり、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と共役対称性が使える。まず

$$
0=b_1=2h^{1,0}\quad\Rightarrow\quad h^{1,0}=0.
$$

次に $b_2=1$ の斜め和は

$$
1=b_2=2h^{2,0}+h^{1,1}.
$$

Kähler類が非零の $(1,1)$ 型であることから $h^{1,1}\ge1$。この下限を代入すると $h^{2,0}=0,h^{1,1}=1$ となる。

なお、Kähler性によるHodge分解と共役対称性を**すでに仮定した後なら**、非負整数性と $2h^{2,0}$ の偶数性だけでも同じ数値解が出る。しかし $b_2=1$ だけでHodge分解を無条件に使うことはできず、また幾何的な生成元が $(1,1)$ 型と分かるのはKähler類による説明の利点である。
<!-- solution-end -->

<a id="ex-cyg1-08-b03"></a>
#### CYG1-08-B03 Euler標数から中央次数へ
- Level: B

滑らかな五次超曲面 $X$ で $\chi_{\mathrm{top}}=-200$、Betti数が $(1,0,1,b_3,1,0,1)$、$K_X\simeq\mathcal O_X$ とする。$b_3$ と $h^{2,1}$ を順に求めよ。

<!-- solution-start -->
**詳細解答。** 交代和は $1-0+1-b_3+1-0+1=4-b_3$。$4-b_3=-200$ なので $b_3=204$。連結性と[正則体積形式の一意性](../CYG1-06/index.md#prop-cyg1-06-top-hodge)から $h^{3,0}=1$、共役対称性から $h^{0,3}=1,h^{1,2}=h^{2,1}$。したがって

$$
204=b_3=1+h^{2,1}+h^{2,1}+1
=2+2h^{2,1},
$$

よって $h^{2,1}=(204-2)/2=101$。
<!-- solution-end -->

<a id="ex-cyg1-08-b04"></a>
#### CYG1-08-B04 特異な五次式では何を失うか
- Level: B

$Y=\{Z_0^5+Z_1^5+Z_2^5+Z_3^5=0\}\subset\mathbb P^4_{\mathbb C}$ を考える。点 $P=[0:0:0:0:1]$ でJacobianを調べ、滑らかな五次超曲面のChern数・Hodge数計算をそのまま流用できるか説明せよ。

<!-- solution-start -->
**詳細解答。** $P$ で多項式は零。偏微分は $5Z_0^4,\ldots,5Z_3^4,0$ なので全て零であり、$P$ は特異点。この点では[法束完全列](../CYG1-07/index.md#prop-cyg1-07-normal)の微分写像が全射にならず、滑らかな階数3の接束を用いる計算が破綻する。また[弱Lefschetz定理](#thm-cyg1-08-weak-lefschetz)も**滑らかな**超曲面に対する形なので適用できない。したがって、次数五という情報のみから $\chi=-200$ や $h^{1,1}=1,h^{2,1}=101$ を断定できない。
<!-- solution-end -->

<a id="ex-cyg1-08-c01"></a>
#### CYG1-08-C01 五次のHodgeダイヤモンドを出発点から
- Level: C

$X=\{\sum_{j=0}^4Z_j^5=0\}\subset\mathbb P^4_{\mathbb C}$ とし、$H=c_1(\mathcal O_{\mathbb P^4}(1)|_X)$ を超平面類とする。滑らかさ、$K_X$、弱Lefschetzによる低次Betti数、$h^{1,1}$、トップChern類、Euler標数、中央のHodge数をこの順に導出し、全Hodge数行列とBetti数列を示せ。利用する外部定理と適用条件を挙げること。

<!-- solution-start -->
**詳細解答。** 斉次偏微分 $5Z_j^4$ は非零射影点で同時零にならず、平方因子もないから[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)により滑らか。射影閉部分集合なのでコンパクト、[射影的Kähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)が成立する。複素次元は3、[随伴公式](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)で $K_X=\mathcal O_X(5-5)\simeq\mathcal O_X$。

ここから[弱Lefschetzの外部入力](#thm-cyg1-08-weak-lefschetz)を滑らかな正の超曲面に適用する。$k<3$ で $H^k(\mathbb P^4;\mathbb Z)\simeq H^k(X;\mathbb Z)$ だから $(b_0,b_1,b_2)=(1,0,1)$。連結性も得る。非零Kähler類は $(1,1)$ 型なので $h^{1,1}\ge1$、[Hodge分解と共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)より

$$
b_1=2h^{1,0}=0,\qquad
b_2=2h^{2,0}+h^{1,1}=1.
$$

よって $h^{1,0}=h^{2,0}=0,h^{1,1}=1$。[滑らかな射影超曲面の全Chern類](../CYG1-07/index.md#prop-cyg1-07-total-chern)の公式から

$$
\begin{aligned}
c(TX)&=(1+5H+10H^2+10H^3)(1-5H+25H^2-125H^3)\\
&=1+10H^2-40H^3.
\end{aligned}
$$

$\int_XH^3=5$ と滑らかなコンパクト複素三次元に対する[トップChern類とEuler標数](../CYG1-07/index.md#thm-cyg1-07-gauss-bonnet)から $\chi=-40\cdot5=-200$。[Poincaré双対性](../../HOD/HOD1-07/index.md#thm-hod1-07-betti-constraints)によりBetti数列は $(1,0,1,b_3,1,0,1)$、交代和から $b_3=4-(-200)=204$。[正則体積形式と最高Hodge数](../CYG1-06/index.md#prop-cyg1-06-top-hodge)を $K_X$ 正則自明・連結・コンパクトに適用すると $h^{3,0}=h^{0,3}=1$ で、

$$
204=b_3=1+2h^{2,1}+1
\quad\Rightarrow\quad h^{2,1}=101.
$$

補次数対称性を使った行列は

$$
\begin{pmatrix}
1&0&0&1\\
0&1&101&0\\
0&101&1&0\\
1&0&0&1
\end{pmatrix},
$$

Betti数列は $(1,0,1,204,1,0,1)$。その交代和 $-200$ で検算できる。
<!-- solution-end -->

<a id="ex-cyg1-08-c02"></a>
#### CYG1-08-C02 弱LefschetzをHard Lefschetzで置換する偽証明
- Level: C

ある学生は「滑らかな五次超曲面 $X$ はコンパクトKählerであり、Hard Lefschetzがある。よって $H^2(X)$ は一次元、$h^{1,1}=1$、従って $h^{2,1}=101$」と述べた。この推論の欠落を、実際にHard Lefschetzが述べる写像と弱Lefschetzが述べる写像をそれぞれ示して修正せよ。

<!-- solution-start -->
**詳細解答。** 複素次元3の[Hard Lefschetz](../CYG1-06/index.md#prop-cyg1-06-kahler-constraints)は、Kähler類 $[\omega]$ について

$$
L:H^2(X;\mathbb C)\longrightarrow H^4(X;\mathbb C),
\qquad \alpha\longmapsto[\omega]\smile\alpha
$$

が同型であることを保証する。これは $b_2=b_4$ を与えるが、**両方が一次元であること**は保証しない。対して[弱Lefschetz](#thm-cyg1-08-weak-lefschetz)は包含 $i:X\hookrightarrow\mathbb P^4$ に対し

$$
i^*:H^2(\mathbb P^4;\mathbb Z)\xrightarrow{\simeq}H^2(X;\mathbb Z)
$$

を述べる。周囲の $H^2(\mathbb P^4;\mathbb Z)=\mathbb Z$ から初めて $b_2=1$ を得る。Kähler類が非零の $(1,1)$ 型であることとHodge分解から低次Hodge数を求めると

$$
h^{1,1}=1,\qquad h^{2,0}=0.
$$

さらに五次のChern類・トップChern類の積分で $\chi=-200$、標準束の自明性から $h^{3,0}=1$ を別途示す必要がある。Poincaré双対性と交代和で $b_3=204$ を求め、

$$
204=2+2h^{2,1}\quad\Rightarrow\quad h^{2,1}=101
$$

を得る。誤りは**内部の同型**から**外部との同型**を推論し、Euler標数と最高Hodge数の入力も省いた点である。
<!-- solution-end -->

## 8. 計算をほかの超曲面へ広げる前に

$h^{1,1}=1$ は滑らかな五次だけの偶然ではなく、複素次元3の滑らかな射影超曲面に対する弱Lefschetzの低次同型が大きく働いている。一方、$h^{2,1}=101$ には**五次であること**によるChern係数と標準束自明性が必要だった。次章では、完全交叉や特異な対象へ舞台を変えたとき、どの計算が残り、どの仮定をもう一度確かめる必要があるかを扱う。
