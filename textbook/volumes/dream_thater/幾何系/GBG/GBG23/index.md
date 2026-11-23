# GBG23 Chern類・Chern指標はどの式で正規化するか

[GBG21の閉性定理](../GBG21/index.md#thm-gbg21-chern-weil-closed)と[GBG22の接続非依存性](../GBG22/index.md#cor-gbg22-class-independence)によって、Ad不変多項式を曲率へ代入すると、接続によらない de Rham 類が得られることを学んだ。しかし不変多項式は無数にある。複素ベクトル束に対して、どの多項式を、どの係数で選べばよいだろうか。

一つの答えが行列式から得る **Chern類の代表形式**、もう一つが行列の指数関数と跡から得る **Chern指標**である。どちらも同じ曲率を入力するが、前者は直和で積になり、後者は直和で和になる。次数4では両者の符号まで違い得る。

**本講の設定**。$M$ は境界のない滑らかな有限次元多様体、$P\to M$ は滑らかな右主 $U(r)$ 束（$r\ge1$）とする。

[結合束の構成](../GBG4/index.md#def-gbg4-associated-bundle)により、標準表現から階数 $r$ の Hermite 複素ベクトル束 $E=P\times_{U(r)}\mathbb C^r$ を作る。[結合束の局所共変微分](../GBG9/index.md#thm-gbg9-local-formula)に従って接続 $\nabla$ を取る。

その局所曲率を $F\in\Omega^2(U;\mathfrak u(r))$ と書く。$\mathfrak u(r)$ は反Hermite行列のLie環である。従って本講では一貫して

$$
C=\frac{i}{2\pi}F
$$

と正規化する。$C$ の各成分は複素数値2形式であり、一般には数値行列ではない。**行列の積には外積を使う**。二つの2形式は $(-1)^{2\cdot2}=+1$ で可換なので、行列式の係数を計算する際には、交換可能な係数に対する通常の行列式の展開規則を使える。行列が同時に対角化できるという仮定は置かない。

<!-- definition-example-audit: strict -->

## 1. 行列式からChern形式を作る

曲率は局所ゲージの変更で[共役変換](../GBG10/index.md#thm-gbg10-gauge-transform)する。そこで、共役で変わらない量として行列式を使う。

$I_r$ は $r$ 次単位行列、$t$ は形式的な変数である。$\det(I_r+tC)$ を $t$ の多項式として展開する。

次数 $k$ の係数は、基底上の $2k$ 形式になる。これらの係数を一つずつ取り出すだけでなく、すべてをまとめた多項式も扱えるよう、次の定義を置く。

<a id="def-gbg23-total-chern"></a>

<!-- formal-statement-start -->
> **定義（全Chern形式）**  
> 滑らかな多様体 $M$ 上の階数 $r$ の Hermite 複素ベクトル束 $E$ と、その $U(r)$ 接続 $\nabla$ を取る。局所曲率 $F$ を $C=iF/(2\pi)$ と正規化する。$c_0(E,\nabla)=1$ とし、各 $k=1,\ldots,r$ に対し、局所的に

$$
\det(I_r+tC)=\sum_{k=0}^r t^k c_k(E,\nabla)
$$

> と定める。右辺の係数は重なりで一致して大域的な微分形式になる。$c(E,\nabla)=\sum_{k=0}^r c_k(E,\nabla)$ を全Chern形式と呼ぶ。$k>r$ では $c_k(E,\nabla)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg23-total-chern -->
**定義の確認**。$\mathbb R^4$ の積 $U(2)$ 束では、標準基底から定まる全域のユニタリ枠を選べる。この枠で[共変微分の局所公式](../GBG9/index.md#thm-gbg9-local-formula)は $\nabla=d+A$ と表され、$A$ は反Hermite行列値1形式である。従って、この枠で $A^\dagger=-A$ を確かめれば $U(2)$ 接続の局所表示として適格であり、[曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula)で $F=dA+A\wedge A$ を計算できる。ここで $d$ は基底 $\mathbb R^4$ の座標変数に関する外微分である。

座標を $(x,y,z,w)$ とし、全域接続表示を

$$
A=\begin{pmatrix}-2\pi i x\,dy&0\\0&-2\pi i z\,dw\end{pmatrix}
$$

と取る。$A^\dagger=-A$ を満たし、対角行列ゆえ $A\wedge A=0$ である。[曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula)より

$$
F=dA=\begin{pmatrix}-2\pi i\,dx\wedge dy&0\\0&-2\pi i\,dz\wedge dw\end{pmatrix}.
$$

$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$ と置けば $C=\operatorname{diag}(\eta,\zeta)$。従って

$$
\det(I_2+tC)=(1+t\eta)(1+t\zeta)
=1+t(\eta+\zeta)+t^2\eta\wedge\zeta.
$$

よって $c_1=\eta+\zeta$、$c_2=\eta\wedge\zeta$ はそれぞれ2形式・4形式となる。$\eta\wedge\zeta=\zeta\wedge\eta$ という偶数次数の符号も実際に確認した。積束上の局所表示を全域へ使っているが、一般の場合の貼り合わせは後の定理で確かめる。
<!-- definition-example-end -->

### 第一次・第二次の係数を対角化なしに展開する

$C=(C_{ab})$ の成分はすべて2形式なので、$C_{ab}\wedge C_{cd}=C_{cd}\wedge C_{ab}$。$t$ の一次係数は対角成分の和である。二次係数は、異なる二つの行と列を選ぶ行列式の項から

$$
c_1=\operatorname{tr}C,\qquad
c_2=\sum_{a<b}(C_{aa}\wedge C_{bb}-C_{ab}\wedge C_{ba})
$$

となる。一方、$\operatorname{tr}(C\wedge C)=\sum_{a,b}C_{ab}\wedge C_{ba}$ と $(\operatorname{tr}C)^2=\sum_{a,b}C_{aa}\wedge C_{bb}$ を引き算すると、対角の二乗が消え、異なる添字の各項が2回ずつ残る。

<a id="prop-gbg23-low-chern"></a>

<!-- formal-statement-start -->
> **命題（低次Chern形式の跡表示）**  
> 階数 $r\ge1$ の Hermite 複素ベクトル束と $U(r)$ 接続の曲率を $F$ とする。$C=iF/(2\pi)$ に対して

$$
\boxed{\begin{aligned}
c_1(E,\nabla)&=\operatorname{tr}C=\frac{i}{2\pi}\operatorname{tr}F,\\
c_2(E,\nabla)&=\frac12\left((\operatorname{tr}C)^2-\operatorname{tr}(C\wedge C)\right)\\
&=\frac{1}{8\pi^2}\left(\operatorname{tr}(F\wedge F)-\operatorname{tr}F\wedge\operatorname{tr}F\right).
\end{aligned}}
$$

> ここで $r=1$ では $c_2=0$。跡および積は局所行列で計算し、得られた形式は大域的に貼り合わさる。
<!-- formal-statement-end -->

**証明の見取り図**。二次の行列式係数を $a<b$ の小行列式の和に直し、跡の二つの二次式との差を取る。最後に $i^2=-1$ を代入する。

<!-- proof-start -->
### 証明

$\det(I+tC)$ の一次係数は $\sum_a C_{aa}$。二次係数では添字 $a<b$ を二つ固定したときに $C_{aa}\wedge C_{bb}-C_{ab}\wedge C_{ba}$ が現れる。このため

$$
\begin{aligned}
(\operatorname{tr}C)^2-\operatorname{tr}(C\wedge C)
&=\sum_{a,b}(C_{aa}\wedge C_{bb}-C_{ab}\wedge C_{ba})\\
&=2\sum_{a<b}(C_{aa}\wedge C_{bb}-C_{ab}\wedge C_{ba})\\
&=2c_2.
\end{aligned}
$$

二行目では $a=b$ の項が零となり、$a,b$ を交換した項は2形式同士の可換性により一致する。さらに $C=iF/(2\pi)$ を代入すると

$$
(\operatorname{tr}C)^2=-\frac{1}{4\pi^2}\operatorname{tr}F\wedge\operatorname{tr}F,\qquad
\operatorname{tr}(C\wedge C)=-\frac{1}{4\pi^2}\operatorname{tr}(F\wedge F).
$$

引き算して2で割れば主張の係数 $1/(8\pi^2)$ が得られる。$r=1$ では両二次式が等しいので $c_2=0$。
<!-- proof-end -->

**SU(2)への準備**。構造群が $SU(2)$ なら $F$ は跡零の反Hermite行列値2形式なので、次を得る。

$$
c_1=0,\qquad
c_2=\frac{1}{8\pi^2}\operatorname{tr}(F\wedge F).
$$

ここでの正号は、$C=iF/(2\pi)$ と定めた結果である。向き付き4多様体上で積分するときの全体の符号は、さらに向きの選択にも依存する。

## 2. Chern指標はなぜ指数関数で作るか

全Chern形式は直和を取ると掛け算になる。これに対し、直和に対して足し算になる量を作りたい。ブロック対角行列について跡は和になり、指数関数は各ブロックで計算できる。そこで、行列の指数関数を形式的な冪級数でなく**微分形式の次数で打ち切った有限和**として定義する。

<a id="def-gbg23-chern-character"></a>

<!-- formal-statement-start -->
> **定義（Chern指標形式）**  
> 滑らかな有限次元多様体 $M$ 上の階数 $r$ の Hermite 複素ベクトル束 $E$ と $U(r)$ 接続 $\nabla$ の曲率を $F$、$C=iF/(2\pi)$ とする。$C^0=I_r$、$C^k=C\wedge\cdots\wedge C$（$k$ 個）と置き、

$$
\operatorname{ch}(E,\nabla)=\operatorname{tr}\exp(C)
=\sum_{k\ge0}\operatorname{ch}_k(E,\nabla),\qquad
\operatorname{ch}_k(E,\nabla)=\frac1{k!}\operatorname{tr}(C^k)
$$

> と定める。次数 $2k>\dim M$ の項は零なので和は有限である。各項は大域的な $2k$ 形式で、$k=0$ の項は定数関数 $r$ である。各項の閉性は第3節で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg23-chern-character -->
**定義の確認**。階数2の平坦な積束で $F=0$ とすると $C=0$、$\exp(C)=I_2$ だから $\operatorname{ch}_0=2$、$\operatorname{ch}_{k\ge1}=0$。先ほどの $\mathbb R^4$ の例なら $C=\operatorname{diag}(\eta,\zeta)$、$\eta^2=\zeta^2=0$ であり、

$$
\operatorname{tr}\exp(C)
=(1+\eta)+(1+\zeta)=2+\eta+\zeta.
$$

跡は階数を含むので、全Chern形式 $1+(\eta+\zeta)+\eta\wedge\zeta$ とは異なる。共役変換で指数と跡が保たれ、各次数が微分形式になる条件も満たす。
<!-- definition-example-end -->

<a id="prop-gbg23-chern-character-degrees"></a>

<!-- formal-statement-start -->
> **命題（Chern指標と低次Chern形式の関係）**  
> 上記の階数 $r$ の Hermite 複素ベクトル束とその接続に対し、

$$
\boxed{\begin{aligned}
\operatorname{ch}_0&=r,\\
\operatorname{ch}_1&=c_1,\\
\operatorname{ch}_2&=\frac12\left(c_1\wedge c_1-2c_2\right)
=-\frac{1}{8\pi^2}\operatorname{tr}(F\wedge F).
\end{aligned}}
$$

> 特に、$SU(r)$ 接続のときは $\operatorname{ch}_2=-c_2$ となる。
<!-- formal-statement-end -->

**証明の見取り図**。指数の $k=0,1,2$ の係数を出し、前節の行列式の二次係数へ代入する。$c_2$ と $\operatorname{ch}_2$ の違いを外積の次数と符号の両方から追う。

<!-- proof-start -->
### 証明

指数展開の最初の三項は

$$
\exp(C)=I_r+C+\frac12 C\wedge C+\text{次数6以上の項}
$$

である。従って $\operatorname{ch}_0=\operatorname{tr}I_r=r$、$\operatorname{ch}_1=\operatorname{tr}C=c_1$、$\operatorname{ch}_2=\frac12\operatorname{tr}(C\wedge C)$。一方、[低次Chern形式の跡表示](#prop-gbg23-low-chern)を整理すると

$$
2c_2=c_1^2-\operatorname{tr}(C\wedge C)
\quad\Longrightarrow\quad
\operatorname{tr}(C\wedge C)=c_1^2-2c_2.
$$

これを代入すれば二つ目の式を得る。また $C^2=i^2 F\wedge F/(4\pi^2)$ だから

$$
\operatorname{ch}_2=\frac12\frac{i^2}{4\pi^2}\operatorname{tr}(F\wedge F)
=-\frac{1}{8\pi^2}\operatorname{tr}(F\wedge F).
$$

$SU(r)$ なら $\operatorname{tr}F=0$ なので $c_1=0$。関係式へ代入して $\operatorname{ch}_2=-c_2$ が従う。
<!-- proof-end -->

線束 $L$ では $c_2(L,\nabla)=0$ だが $\operatorname{ch}_2(L,\nabla)=\frac12c_1(L,\nabla)^2$ は、基底が4次元以上なら零とは限らない。「階数が1なので指標の高次項も零」という推測は正しくない。

## 3. 正規化された類はなぜ接続に依存しないか

局所表示の $F$ は[曲率のゲージ共変性](../GBG10/index.md#thm-gbg10-gauge-transform)によって、重なりで $F_j=g^{-1}F_i g$ を満たす。これから $C_j=g^{-1}C_i g$、さらに

$$
\det(I+tC_j)=\det(g^{-1}(I+tC_i)g)=\det(I+tC_i)
$$

となる。$g$ は0形式の行列なので、通常の共役と行列式の計算に符号の問題は生じない。同じく $\operatorname{tr}(C_j^k)=\operatorname{tr}(C_i^k)$。従って、前節までの各局所表示は大域的に貼り合わさる。

外微分が零になることと接続非依存性を示すには、行列式・跡の各次数成分が曲率のAd不変多項式であることを使う。[GBG20の対称Ad不変多重線形形式](../GBG20/index.md#def-gbg20-invariant-polynomial)を適用するため、共役不変な次数 $k$ の斉次多項式 $q(X)$ を $k$ 重線形形式へ戻す操作を *偏極* と呼ぶ。具体的には、$X_1,\ldots,X_k$ を固定したLie環の元、$t_1,\ldots,t_k$ を互いに独立な実パラメータとし、他の $t_j$ を固定して $t_i$ について偏微分することで

$$
p(X_1,\ldots,X_k)=\frac{1}{k!}
\left.\frac{\partial^k}{\partial t_1\cdots\partial t_k}
q(t_1X_1+\cdots+t_kX_k)\right|_{t_1=\cdots=t_k=0}.
$$

$t_1\cdots t_k$ の係数を $k!$ で割るので、$p(X,\ldots,X)=q(X)$ となる。$q(\operatorname{Ad}_gX)=q(X)$ ならこの係数も不変である。曲率は2形式なので、行列積を外積へ読み替えた式は同じ多重線形規則で評価できる。

<a id="thm-gbg23-classes"></a>

<!-- formal-statement-start -->
> **定理（Chern形式・Chern指標形式の閉性と接続非依存性）**  
> 滑らかな有限次元多様体 $M$ 上の階数 $r$ の Hermite 複素ベクトル束 $E$ に、二つの $U(r)$ 接続 $\nabla_0,\nabla_1$ を入れる。任意の整数 $k\ge1$ に対して、第 $k$ Chern形式 $c_k(E,\nabla_j)$ および Chern指標の次数 $2k$ の成分 $\operatorname{ch}_k(E,\nabla_j)$ は閉形式であり、

$$
\begin{aligned}
[c_k(E,\nabla_0)]&=[c_k(E,\nabla_1)],\\
[\operatorname{ch}_k(E,\nabla_0)]&=[\operatorname{ch}_k(E,\nabla_1)]
\end{aligned}
$$

> が複素係数 de Rham コホモロジーで成立する。各係数は実数値形式でもある。$k=0$ では $c_0=1$、$\operatorname{ch}_0=r$ が接続に依存しない。
<!-- formal-statement-end -->

**証明の見取り図**。まず各係数が共役不変な斉次多項式であることを示し、偏極して既習の Chern–Weil 定理へ渡す。特別な接続や局所座標を固定したまま結論へ飛ばない。

<!-- proof-start -->
### 証明

局所曲率の係数を $\mathfrak u(r)$ に取る。$\det(I+t(iX/2\pi))$ の $t^k$ 係数 $q_k(X)$ は $X$ の斉次 $k$ 次多項式であり、行列式の共役不変性より $q_k(g^{-1}Xg)=q_k(X)$。同じく $h_k(X)=\operatorname{tr}((iX/2\pi)^k)/k!$ は斉次で共役不変である。$q_k,h_k$ を上の偏極公式で対称Ad不変 $k$ 重線形形式に直す。

[曲率多項式の大域への降下](../GBG20/index.md#thm-gbg20-basic-descent)により、それぞれを $F$ へ適用した微分形式は大域的に定義される。$\mathfrak u(r)$ の係数を成分ごとに展開して外積に戻せば、その形式は定義した $c_k$ と $\operatorname{ch}_k$ の係数に一致する。ここで次数2の曲率因子の置換には符号が付かない。

[GBG21の閉性定理](../GBG21/index.md#thm-gbg21-chern-weil-closed)をそれぞれの対称Ad不変形式へ適用すると $dc_k=d\operatorname{ch}_k=0$ となる。同じ束の二接続には[GBG22の transgression 恒等式](../GBG22/index.md#thm-gbg22-transgression)を適用できるため、対応する二つの形式の差は完全形式である。[de Rham コホモロジーの定義](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)から同じ類を表す。

最後に値が実であることを確認する。反Hermite曲率 $F^\dagger=-F$ に対し、外積された2形式の共役転置でも2形式の順序交換は正符号だから $C^\dagger=C$。$\operatorname{tr}(C^k)$ は実係数の形式であり、行列式の係数も複素共役で不変である。従って各形式は実数値である。
<!-- proof-end -->

この定理で構成したのは、**微分形式が表す実／複素係数の de Rham 類**である。従来の位相的な整数係数 Chern 類 $c_k^{\mathbb Z}(E)\in H^{2k}(M;\mathbb Z)$ が全ての複素ベクトル束について存在し、その実係数への像が上の類に一致するという主張には、整数係数コホモロジーなどの追加の位相的理論を要する。ここではその一般定理を証明済みとしない。

[GBG19の $U(1)$ 磁束整数性](../GBG19/index.md#thm-gbg19-general-integrality)は、その区別を実際に検証できる特別な場合である。$S^2$ 上の線束なら $c_1$ の積分が遷移関数の巻き数に等しく、整数になる。しかし一般の $4$ 次元束の第二Chern数まで、この球面上の一次の議論だけで証明することはできない。また、整数係数コホモロジーのねじれ元は実係数へ送ると零になるため、de Rham 形式だけでは検出できない。

## 4. 直和で何が足し算・掛け算になるか

複素ベクトル束 $E,E'$ に $U(r),U(s)$ 接続を取り、それらの直和にブロック対角接続を入れる。局所曲率と正規化形式は

$$
F_{E\oplus E'}=\begin{pmatrix}F_E&0\\0&F_{E'}\end{pmatrix},\qquad
C_{E\oplus E'}=\begin{pmatrix}C_E&0\\0&C_{E'}\end{pmatrix}.
$$

この形は、直和の各局所成分に共変微分を別々に作用させれば得られる。行列式はブロックごとに掛け算になり、指数関数の跡は足し算になる。

<a id="prop-gbg23-direct-sum"></a>

<!-- formal-statement-start -->
> **命題（直和に対するChern形式とChern指標）**  
> 滑らかな多様体 $M$ 上の二つの Hermite 複素ベクトル束 $E,E'$ にそれぞれ $U(r),U(s)$ 接続を取り、直和接続を $E\oplus E'$ に入れる。このとき

$$
c(E\oplus E')=c(E)\wedge c(E'),\qquad
\operatorname{ch}(E\oplus E')=\operatorname{ch}(E)+\operatorname{ch}(E').
$$

> ここでは接続を付けた形式の等式であり、対応する de Rham 類についても成立する。
<!-- formal-statement-end -->

**証明の見取り図**。曲率がブロック対角になるところを確認し、行列式の積と行列の冪の跡の和を直接適用する。

<!-- proof-start -->
### 証明

直和の局所共変微分は $d+\operatorname{diag}(A_E,A_{E'})$ であり、その二乗の曲率は $\operatorname{diag}(F_E,F_{E'})$。よって

$$
\begin{aligned}
\det(I+tC_{E\oplus E'})
&=\det(I+tC_E)\det(I+tC_{E'}),\\
\operatorname{tr}\exp(C_{E\oplus E'})
&=\operatorname{tr}\exp(C_E)+\operatorname{tr}\exp(C_{E'}).
\end{aligned}
$$

一つ目の式で $t^k$ 係数を比較すれば

$$
c_k(E\oplus E')=\sum_{a+b=k}c_a(E)\wedge c_b(E')
$$

となる。二つ目は各冪 $C^k$ がブロック対角であることから従う。両者とも各パッチでの等式であり、前節の大域性により $M$ 全体で成立する。
<!-- proof-end -->

**線束の直和**。$L_1,L_2$ が線束なら、[低次Chern形式の跡表示](#prop-gbg23-low-chern)から $c_2(L_j)=0$ であり、

$$
c_1(L_1\oplus L_2)=c_1(L_1)+c_1(L_2),\qquad
c_2(L_1\oplus L_2)=c_1(L_1)\wedge c_1(L_2).
$$

一方、線束のChern指標は $\operatorname{ch}(L)=\exp(c_1(L))$ である。したがって $\operatorname{ch}_2(L_1\oplus L_2)=\tfrac12(c_1(L_1)^2+c_1(L_2)^2)$ となり、交差項は現れない。

### 球面の積で交差項を確かめる

$M=S^2\times S^2$ に積の向きを入れる。各因子から引き戻した、積分が1の閉2形式を $x,y$ とする。[GBG19の $n=1$ monopole](../GBG19/index.md#thm-gbg19-curvature-flux)の正規化曲率を各因子へ引き戻せばよい。$x$ は第一因子の2形式なので $x\wedge x=0$、同様に $y\wedge y=0$。一方、積の向きに関して

$$
\int_{S^2\times S^2}x\wedge y
=\left(\int_{S^2}x\right)\left(\int_{S^2}y\right)=1.
$$

第一因子から引き戻した線束 $L_x$ と第二因子の線束 $L_y$ の直和 $E=L_x\oplus L_y$ では

$$
c_1(E)=x+y,\qquad c_2(E)=x\wedge y,\qquad
\operatorname{ch}_2(E)=\tfrac12(x^2+y^2)=0.
$$

つまり $\int_Mc_2(E)=1$ でありながら、$\int_M\operatorname{ch}_2(E)=0$ である。積分の値が違うのは正規化の失敗ではなく、**別々の不変多項式**を評価したためである。

## 5. 演習と詳細解答

### Level A：正規化・行列式・指数の基本

<a id="ex-gbg23-a01"></a>
#### GBG23-A01 線束の曲率からChern形式を作る
- Level: A

$\mathbb R^4$ 上の積 $U(1)$ 束で $A=-2\pi i(x\,dy+z\,dw)$ とする。$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$ と置き、$F,C,c_1,c_2,\operatorname{ch}_0,\operatorname{ch}_1,\operatorname{ch}_2$ を求めよ。

<!-- solution-start -->
**詳細解答**。[局所曲率式](../GBG10/index.md#thm-gbg10-local-formula)では可換群 $U(1)$ に対して $F=dA$ だから

$$
F=-2\pi i(\eta+\zeta),\qquad
C=\frac{i}{2\pi}F=\eta+\zeta.
$$

線束は階数1なので $\det(1+tC)=1+tC$ であり、$c_1=\eta+\zeta$、$c_2=0$。指数を使うと $\operatorname{ch}_0=1$、$\operatorname{ch}_1=C$。$\eta^2=\zeta^2=0$ で、2形式同士は可換だから

$$
\operatorname{ch}_2=\frac12C^2
=\frac12(\eta^2+2\eta\wedge\zeta+\zeta^2)=\eta\wedge\zeta.
$$

階数1なのに $\operatorname{ch}_2$ が非零となることを直接確認した。
<!-- solution-end -->

<a id="ex-gbg23-a02"></a>
#### GBG23-A02 非対角の行列式と跡
- Level: A

複素数値2形式 $a,b,c,d$ に対して $C=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とする。$\det(I_2+tC)$ を展開し、$c_2=\tfrac12((\operatorname{tr}C)^2-\operatorname{tr}(C^2))$ を成分計算で確かめよ。

<!-- solution-start -->
**詳細解答**。2形式同士は可換なので

$$
\det(I_2+tC)=(1+ta)(1+td)-t^2b\wedge c
=1+t(a+d)+t^2(a\wedge d-b\wedge c).
$$

一方、行列積で対角成分を求めると $(C^2)_{11}=a^2+b\wedge c$、$(C^2)_{22}=c\wedge b+d^2$ である。$c\wedge b=b\wedge c$ より

$$
\begin{aligned}
(\operatorname{tr}C)^2&=a^2+2a\wedge d+d^2,\\
\operatorname{tr}(C^2)&=a^2+d^2+2b\wedge c.
\end{aligned}
$$

差を2で割ると $a\wedge d-b\wedge c$ となり、行列式の二次係数に一致する。
<!-- solution-end -->

<a id="ex-gbg23-a03"></a>
#### GBG23-A03 平坦接続の零次項
- Level: A

階数 $r$ の積 Hermite 束に $F=0$ の接続を入れる。全Chern形式とChern指標を求め、両者の零次項が異なる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$C=iF/(2\pi)=0$ なので $\det(I_r+tC)=\det(I_r)=1$。よって $c_0=1$、$c_{k\ge1}=0$ である。一方 $\exp(C)=I_r$ より

$$
\operatorname{ch}=\operatorname{tr}I_r=r,\qquad
\operatorname{ch}_0=r,\quad\operatorname{ch}_{k\ge1}=0.
$$

零次の行列式は単位行列の行列式 $1$、零次の跡は単位行列の跡 $r$ だから異なる。
<!-- solution-end -->

<a id="ex-gbg23-a04"></a>
#### GBG23-A04 跡零の場合の符号
- Level: A

$SU(2)$ 接続の曲率 $F$ に対して $c_1,c_2,\operatorname{ch}_2$ を $\operatorname{tr}(F\wedge F)$ で表せ。$i^2=-1$ がどの行に現れるかを示せ。

<!-- solution-start -->
**詳細解答**。$F$ は $\mathfrak{su}(2)$ 値なので $\operatorname{tr}F=0$。従って[低次Chern形式の跡表示](#prop-gbg23-low-chern)から

$$
c_1=\frac{i}{2\pi}\operatorname{tr}F=0,\qquad
c_2=\frac{1}{8\pi^2}\operatorname{tr}(F\wedge F).
$$

一方 $C=iF/(2\pi)$ なので

$$
\operatorname{ch}_2=\frac12\operatorname{tr}(C^2)
=\frac12\frac{i^2}{4\pi^2}\operatorname{tr}(F\wedge F)
=-\frac{1}{8\pi^2}\operatorname{tr}(F\wedge F)=-c_2.
$$

最後の負号は $i^2=-1$ に由来し、$SU(2)$ については $\operatorname{tr}F=0$ が $c_2$ のもう一つの項を消す。
<!-- solution-end -->

### Level B：接続非依存性と直和計算

<a id="ex-gbg23-b01"></a>
#### GBG23-B01 R4上の二つの線接続の直和
- Level: B

$\mathbb R^4$ 上で $L_1,L_2$ の接続を $A_1=-2\pi i x\,dy$、$A_2=-2\pi i z\,dw$ とする。直和接続の $c_1,c_2,\operatorname{ch}_1,\operatorname{ch}_2$ を計算し、$\operatorname{ch}_2=\frac12(c_1^2-2c_2)$ を確かめよ。

<!-- solution-start -->
**詳細解答**。$F_1=-2\pi i\eta$、$F_2=-2\pi i\zeta$（$\eta=dx\wedge dy$、$\zeta=dz\wedge dw$）である。直和曲率は対角で、正規化した $C=\operatorname{diag}(\eta,\zeta)$。[直和命題](#prop-gbg23-direct-sum)または行列式の直接展開によって

$$
c_1=\eta+\zeta,\quad c_2=\eta\wedge\zeta,\quad
\operatorname{ch}_1=\eta+\zeta,\quad
\operatorname{ch}_2=\tfrac12(\eta^2+\zeta^2)=0.
$$

$\eta^2=\zeta^2=0$ だが $c_1^2=2\eta\wedge\zeta$ なので

$$
\tfrac12(c_1^2-2c_2)=
\tfrac12(2\eta\wedge\zeta-2\eta\wedge\zeta)=0
$$

となり、[指標とChern形式の関係](#prop-gbg23-chern-character-degrees)に一致する。
<!-- solution-end -->

<a id="ex-gbg23-b02"></a>
#### GBG23-B02 二接続の二次代表形式の差
- Level: B

同じ主 $U(r)$ 束の二接続の局所表示を $A_0,A_1$、$a=A_1-A_0$、$A_t=A_0+ta$、曲率を $F_t$ とする。$\operatorname{ch}_2(A_1)-\operatorname{ch}_2(A_0)$ が完全形式であることを、微分公式から明示的に示せ。

<!-- solution-start -->
**詳細解答**。ここで $\dot F_t=\frac{dF_t}{dt}$ は補間変数 $t$ に関する通常の微分（基底点は固定）を表し、単独の $d$ は基底 $M$ の外微分を表す。[補間曲率の変化率](../GBG22/index.md#lem-gbg22-curvature-variation)より $\dot F_t=da+[A_t\wedge a]=d_{A_t}a$。$\operatorname{tr}(XY)=\operatorname{tr}(YX)$ は Ad不変二次式なので、[Ad不変性と次数1の因子の外微分](../GBG22/index.md#lem-gbg22-invariant-derivative)に $p(X,Y)=\operatorname{tr}(XY)$ を適用できる。また[局所Bianchi恒等式](../GBG11/index.md#thm-gbg11-bianchi-local)より $d_{A_t}F_t=0$。このとき、微分形式の次数 $\deg a=1$、$\deg F_t=2$ を用いると

$$
\begin{aligned}
d\,\operatorname{tr}(a\wedge F_t)
&=\operatorname{tr}\bigl((d_{A_t}a)\wedge F_t-a\wedge d_{A_t}F_t\bigr)\\
&=\operatorname{tr}(\dot F_t\wedge F_t).
\end{aligned}
$$

従って

$$
\begin{aligned}
\frac{d}{dt}\operatorname{tr}(F_t\wedge F_t)
&=2\operatorname{tr}(\dot F_t\wedge F_t)\\
&=2d\,\operatorname{tr}(a\wedge F_t).
\end{aligned}
$$

[Chern指標と低次Chern形式の関係](#prop-gbg23-chern-character-degrees)を使い、$t$ について0から1まで積分すると

$$
\begin{aligned}
\operatorname{ch}_2(A_1)-\operatorname{ch}_2(A_0)
&=-\frac{1}{8\pi^2}
\int_0^1 2d\,\operatorname{tr}(a\wedge F_t)\,dt\\
&=d\left(-\frac{1}{4\pi^2}\int_0^1
\operatorname{tr}(a\wedge F_t)\,dt\right).
\end{aligned}
$$

$a,F_t$ はゲージ変換でともに共役するので、括弧内の3形式は大域的に貼り合わさる。これは二次の接続非依存性を具体式で確かめたものである。
<!-- solution-end -->

<a id="ex-gbg23-b03"></a>
#### GBG23-B03 Chern形式の二次のtransgression
- Level: B

GBG23-B02と同じ二接続について、$c_2(A_1)-c_2(A_0)$ の大域的原始3形式を、$\operatorname{tr}(a\wedge F_t)$ と $\operatorname{tr}a\wedge\operatorname{tr}F_t$ の積分で求めよ。

<!-- solution-start -->
**詳細解答**。[低次Chern形式の跡表示](#prop-gbg23-low-chern)で

$$
c_2(F_t)=\frac{1}{8\pi^2}
\bigl(\operatorname{tr}(F_t\wedge F_t)
-\operatorname{tr}F_t\wedge\operatorname{tr}F_t\bigr).
$$

第一項の微分は[前問で導出した式](#ex-gbg23-b02)から $2d\,\operatorname{tr}(a\wedge F_t)$。第二項は $\operatorname{tr}\dot F_t=d\operatorname{tr}a$（跡は括弧項を消す）であり、[主束曲率の Bianchi 恒等式・局所形式](../GBG11/index.md#thm-gbg11-bianchi-local)から $d\operatorname{tr}F_t=0$。ここで補間変数 $t$ での微分は $\frac{d}{dt}$、基底上の外微分は $d$ と区別する。積の微分と $\deg(\operatorname{tr}a)=1$ を使えば

$$
\begin{aligned}
\frac{d}{dt}
(\operatorname{tr}F_t\wedge\operatorname{tr}F_t)
&=2d\operatorname{tr}a\wedge\operatorname{tr}F_t\\
&=2d(\operatorname{tr}a\wedge\operatorname{tr}F_t).
\end{aligned}
$$

両者を差し引き、パラメータで積分すれば

$$
c_2(A_1)-c_2(A_0)=dQ,\quad
Q=\frac{1}{4\pi^2}\int_0^1
\bigl(\operatorname{tr}(a\wedge F_t)
-\operatorname{tr}a\wedge\operatorname{tr}F_t\bigr)\,dt.
$$

各跡は共役不変だから $Q$ は大域的である。$\operatorname{tr}F_t=0$ の場合は第二項が消える。
<!-- solution-end -->

<a id="ex-gbg23-b04"></a>
#### GBG23-B04 S2上の線束直和と整数性の範囲
- Level: B

向き付けられた $S^2$ 上の [monopole線束](../GBG19/index.md#thm-gbg19-curvature-flux) $L_n,L_m$ を、任意の整数 $n,m$ について取る。$u$ を積分が1の正規化面積2形式とし、$E=L_n\oplus L_m$ の $c_1,c_2,\operatorname{ch}_0,\operatorname{ch}_1,\operatorname{ch}_2$ を求めよ。どの整数性が既習定理だけで示せるかも述べよ。

<!-- solution-start -->
**詳細解答**。[GBG19の曲率計算](../GBG19/index.md#thm-gbg19-curvature-flux)から各線束の正規化曲率は $nu$、$mu$ である。[直和命題](#prop-gbg23-direct-sum)より

$$
c(E)=(1+nu)(1+mu)=1+(n+m)u+nm\,u^2.
$$

$S^2$ には4形式がないので $u^2=0$。従って $c_1=(n+m)u$、$c_2=0$。同じく

$$
\operatorname{ch}(E)=e^{nu}+e^{mu}
=(1+nu)+(1+mu)=2+(n+m)u.
$$

ゆえに $\operatorname{ch}_0=2$、$\operatorname{ch}_1=(n+m)u$、$\operatorname{ch}_2=0$。$S^2$ では[赤道の巻き数による整数性](../GBG19/index.md#thm-gbg19-general-integrality)から $\int_{S^2}c_1=n+m\in\mathbb Z$ を示せる。一方、これを一般の複素束の高次Chern類の整数性の証明と取り違えてはならない。
<!-- solution-end -->

### Level C：大域的な二次Chern形式とChern指標を照合する

<a id="ex-gbg23-c01"></a>
#### GBG23-C01 S2×S2上の符号付き線束直和
- Level: C

$M=S^2\times S^2$ に積の向きを入れる。第一因子の monopole線束 $L_2$、第二因子の $L_{-1}$ をそれぞれ $M$ へ引き戻し、その直和を $E$ とする。各因子から引き戻した積分1の正規化2形式を $x,y$ とする。次を解け。

1. $E$ の曲率を、局所的に対角な行列として表し、$c_1,c_2,\operatorname{ch}_1,\operatorname{ch}_2$ を求めよ。
2. $\int_M c_2$、$\int_M \operatorname{ch}_2$ と $\int_M c_1^2$ を比較して、$\operatorname{ch}_2=\frac12(c_1^2-2c_2)$ を確認せよ。
3. 接続を変更したとき各積分がどうなるかを示し、整数性についてどこまでを直接計算したか述べよ。

<!-- solution-start -->
**詳細解答**。

(1) [GBG19の局所曲率](../GBG19/index.md#thm-gbg19-curvature-flux)を各因子から引き戻すと、第一線束の曲率は $F_1=-2\pi i(2x)$、第二線束の曲率は $F_2=-2\pi i(-y)$ となる。引き戻しは外微分と可換なので、これらはそれぞれ引き戻した局所接続の曲率である。直和の局所接続はブロック対角であり、

$$
F_E=\begin{pmatrix}-4\pi i\,x&0\\0&2\pi i\,y\end{pmatrix},
\qquad
C_E=\frac{i}{2\pi}F_E=
\begin{pmatrix}2x&0\\0&-y\end{pmatrix}.
$$

よって行列式から

$$
\det(I_2+tC_E)=(1+2tx)(1-ty)
=1+t(2x-y)-2t^2x\wedge y
$$

となる。従って

$$
c_1=2x-y,\qquad c_2=-2x\wedge y.
$$

指数関数から、次数4までの和は

$$
\operatorname{ch}=e^{2x}+e^{-y}
=2+(2x-y)+\tfrac12(4x^2+y^2).
$$

ここで $x^2=0$、$y^2=0$。各2形式が一方の2次元球面因子だけから引き戻され、同じ因子上では4形式が零だからである。従って $\operatorname{ch}_1=2x-y$、$\operatorname{ch}_2=0$。

(2) 積の向きと $\int_{S^2}x=\int_{S^2}y=1$ の規約から、$\int_M x\wedge y=1$。ゆえに

$$
\int_M c_2=-2,\qquad
\int_M\operatorname{ch}_2=0.
$$

また2形式の可換性を使うと

$$
c_1^2=(2x-y)^2=4x^2-4x\wedge y+y^2=-4x\wedge y,
\qquad \int_M c_1^2=-4.
$$

よって $\frac12(-4-2(-2))=0=\int_M\operatorname{ch}_2$ となる。実は積分する前の形式としても関係式が成立する。

(3) 二接続の差について[GBG22の transgression 恒等式](../GBG22/index.md#thm-gbg22-transgression)を $c_1,c_2,\operatorname{ch}_2$ の各不変多項式へ適用すると、代表形式の差は完全形式となる。$M$ はコンパクトで境界がないため、[一般 Stokes の定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)により差の積分は零である。$c_1^2$ の差も

$$
c_{1,1}^2-c_{1,0}^2
=(c_{1,1}-c_{1,0})\wedge(c_{1,1}+c_{1,0})
=d\lambda\wedge(c_{1,1}+c_{1,0})
=d\bigl(\lambda\wedge(c_{1,1}+c_{1,0})\bigr)
$$

と書ける。最後の等号では二つの $c_1$ が閉じていることを使った。

$-2$ という整数は、ここでは各線束の曲率を具体的に選んで積分することで得た。この計算だけから「任意の複素ベクトル束の第二Chern数は整数」という一般定理を証明したことにはならない。
<!-- solution-end -->

## 6. まとめ：次講で必要になる区別

曲率の正規化を $C=iF/(2\pi)$ に固定すると、行列式と跡の低次成分は次のとおりである。

$$
\begin{aligned}
c_1&=\frac{i}{2\pi}\operatorname{tr}F,\\
c_2&=\frac{\operatorname{tr}(F\wedge F)-\operatorname{tr}F\wedge\operatorname{tr}F}{8\pi^2},\\
\operatorname{ch}_2&=-\frac{\operatorname{tr}(F\wedge F)}{8\pi^2}
=\frac{c_1^2-2c_2}{2}.
\end{aligned}
$$

これらの**閉性と接続非依存性**は前講までの Chern–Weil 理論で説明できる。一方、**整数係数特性類の存在や一般の特性数の整数性**は別の位相的主張であり、正規化の式を得ただけでは証明されない。次講の Pontryagin・Euler 形式では、複素束の行列式だけでなく実束の複素化と Pfaffian を使い分ける。
