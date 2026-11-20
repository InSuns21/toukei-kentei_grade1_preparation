# PML1-16 群平均はどのように不変モデルを作るか

<!-- definition-example-audit: strict -->

## 1. 対称性を検査するだけでなく、予測器へ組み込む

前講では、粒子配置に対する[剛体変換の群作用](../PML1-15/index.md#def-pml1-15-rigid-action)を作り、ポテンシャルは不変、力は等変であることを調べた。しかし一般の予測器 $f$ は、入力を回してから予測した値と元の予測値が一致するとは限らない。

今回は、**有限個の対称操作の予測値を平均する**ことで、不変なスカラー予測器を構成する。さらに、平均で何が失われるかを二乗誤差で調べ、向きのある力などのベクトル予測には平均の仕方を変える。

使う道具は[群作用](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)、[不変写像](../../MFL/MFL22/index.md#def-mfl22-invariant)、[軌道と安定化群](../../../代数系/GRP/GRP3/index.md#def-grp3-orbit-stabilizer)である。群の要素数を $|G|$、入力への作用を $g\cdot x$ と書く。平均するのは入力そのものではなく、**変換した入力における予測値**である。

最小例は $G=\{e,s\}$、$X=\mathbb R$、$s\cdot x=-x$ である。$f(x)=x^2+3x$ の二つの予測値を平均すると

$$
\frac{f(x)+f(-x)}2
=\frac{x^2+3x+x^2-3x}{2}=x^2.
$$

奇関数の成分が消え、反転しても変わらない関数が残る。この操作が任意の有限群で成立する理由を先に証明しよう。

## 2. 群平均は不変な関数を作る

実数値予測器全体から、不変な予測器だけを取り出す操作を考える。これを**有限群平均**と呼び、線形代数でいう射影と比較する。ここで射影とは、一度適用した結果にもう一度適用しても変わらない線形作用素のことである。直交射影かどうかは、内積を指定した後に確かめる。

<a id="def-pml1-16-averaging"></a>

<!-- formal-statement-start -->
> **定義（有限群平均作用素）**  
> 空でない有限群 $G$ が集合 $X$ に左作用し、$f:X\to\mathbb R$ とする。各 $x\in X$ における群平均を

$$
(P_Gf)(x):=\frac1{|G|}\sum_{g\in G}f(g\cdot x)
$$

> と定める。$P_G$ は実数値関数から実数値関数への**有限群平均作用素**である。$P_Gf$ を $f$ の**不変化**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-16-averaging -->
**定義の確認**。 $G=\{e,s\}$ とし、$s^2=e$、$s\cdot x=-x$ とする。単位元は $x$ を固定し、$s\cdot(s\cdot x)=x$ なので作用公理を満たす。$f(x)=x^2+3x+2$ に対し

$$
(P_Gf)(x)=\frac{f(x)+f(-x)}2=x^2+2.
$$

具体的に $x=1,-1$ では $f(1)=6$、$f(-1)=0$、平均はどちらも $3$。従って $(P_Gf)(-x)=(P_Gf)(x)$ を数値でも確認できる。元の関数の定義域は $\mathbb R$ で、平均後も同じ定義域上の実数値関数である。
<!-- definition-example-end -->

<a id="thm-pml1-16-reynolds"></a>

<!-- formal-statement-start -->
> **定理（有限群平均の不変性と射影性）**  
> 空でない有限群 $G$ が集合 $X$ に左作用するとする。すべての実数値関数 $f:X\to\mathbb R$ について、次が成り立つ。
>
> **（1）** $P_Gf$ は $G$-不変である。
>
> **（2）** $P_G$ は線形であり、$P_G^2=P_G$ を満たす。
>
> **（3）** $f$ が $G$-不変であることと、$P_Gf=f$ であることは同値である。
>
> **（4）** 各軌道 $O=Gx$ 上で $P_Gf$ は、異なる到着点を一度ずつ数えた平均に等しい。

$$
(P_Gf)(x)=\frac1{|O|}\sum_{z\in O}f(z).
$$
<!-- formal-statement-end -->

**証明の見取り図。** 入力を $h$ で動かすと、和の添字 $g$ が $gh$ へ並び替わる。群では右から $h$ を掛ける操作が全単射だから、平均値は変わらない。軌道平均に直す際には、[同じ到着点への重複数](../../MFL/MFL23/index.md#prop-mfl23-fibers)を利用する。

<!-- proof-start -->
### 証明

任意の $h\in G,x\in X$ を固定する。左作用の合成則から $g\cdot(h\cdot x)=(gh)\cdot x$。$g\mapsto gh$ は逆写像 $k\mapsto kh^{-1}$ を持つ $G$ 上の全単射なので

$$
\begin{aligned}
(P_Gf)(h\cdot x)
&=\frac1{|G|}\sum_{g\in G}f(g\cdot(h\cdot x))\\
&=\frac1{|G|}\sum_{g\in G}f((gh)\cdot x)\\
&=\frac1{|G|}\sum_{k\in G}f(k\cdot x)
=(P_Gf)(x).
\end{aligned}
$$

これで（1）を得る。実数 $a,b$ と関数 $f_1,f_2$ について有限和を分配すると

$$
P_G(af_1+bf_2)=aP_Gf_1+bP_Gf_2
$$

だから線形である。（1）を $P_Gf$ に適用すると、各 $g$ に対して $(P_Gf)(g\cdot x)=(P_Gf)(x)$ なので

$$
(P_G^2f)(x)
=\frac1{|G|}\sum_{g\in G}(P_Gf)(g\cdot x)
=\frac{|G|}{|G|}(P_Gf)(x).
$$

これが（2）。$f$ が不変なら各項 $f(g\cdot x)$ は $f(x)$ であるため $P_Gf=f$。逆に $P_Gf=f$ なら（1）より $f$ 自身が不変である。従って（3）。

最後に $G_x=\{g\in G:g\cdot x=x\}$ と置く。[到着点ごとの重複数の命題](../../MFL/MFL23/index.md#prop-mfl23-fibers)によって、軌道 $O$ の各 $z$ に到着する元はちょうど $|G_x|$ 個。従って

$$
\sum_{g\in G}f(g\cdot x)
=|G_x|\sum_{z\in O}f(z).
$$

さらに $|G|=|O||G_x|$ であり、$|G_x|>0$ なので割り算できる。両式を代入すると（4）を得る。
<!-- proof-end -->

$P_G$ は関数空間上の**線形射影**であり、その像は不変関数全体に一致する。これは[不変写像が軌道商を経由する命題](../../MFL/MFL23/index.md#prop-mfl23-factorization)とも整合する。平均後の値は、入力点そのものではなく、その軌道で決まる。

### 2.1 正方形の四回転を平均する

$X=\mathbb R^2$ の点を列ベクトル $\boldsymbol z=(x,y)^{\mathsf T}$ と表す。標準基底 $e_1=(1,0)^{\mathsf T}$、$e_2=(0,1)^{\mathsf T}$ に関する[線形写像の表現行列](../../../基礎科目/F0/F0-00F/index.md#def-f0-00f-representation-matrix)を

$$
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

と置く。この行列の列が $Re_1=e_2$、$Re_2=-e_1$ を表すので、線形性から

$$
R\boldsymbol z=xRe_1+yRe_2=-ye_1+xe_2=(-y,x)^{\mathsf T}.
$$

$R^2=-I_2$、$R^4=I_2$ であるため、$G=C_4=\{I_2,R,R^2,R^3\}$ は行列積による四要素の群となり、$R^k\boldsymbol z$ が入力への作用である。実数値予測器 $f(\boldsymbol z)=x^2+2y^2$ をこれら四つの入力で評価すると

$$
\begin{aligned}
f(R^0\boldsymbol z)&=x^2+2y^2,\\
f(R\boldsymbol z)&=y^2+2x^2,\\
f(R^2\boldsymbol z)&=x^2+2y^2,\\
f(R^3\boldsymbol z)&=y^2+2x^2.
\end{aligned}
$$

したがって[群平均の定義](#def-pml1-16-averaging)により

$$
(P_{C_4}f)(x,y)=\frac32(x^2+y^2).
$$

これは物理的な距離の二乗と同じ回転不変量になった。一方、有限群 $C_4$ で平均しただけでは、**任意の連続角の回転**に対する不変性は一般に保証されない。例えば

$$
f(x,y)=x^4-6x^2y^2+y^4
$$

は $90^\circ$ 回転で不変なので $P_{C_4}f=f$ だが、$(1,0)$ では $1$、$45^\circ$ 回転後の $(1/\sqrt2,1/\sqrt2)$ では $-1$ となる。有限群と連続回転群を混同してはいけない。

## 3. 平均すると二乗誤差は減るのか

「不変化したら必ず予測がよくなる」は正しくない。教師値が同じ軌道内で変わるなら、以前学んだ[軌道内の教師値のばらつきによる誤差下界](../../MFL/MFL23/index.md#prop-mfl23-orbit-loss)が避けられない。一方、教師値と**評価データの重み**がともに群作用と両立するなら、平均化が二乗誤差を増やさないことを正確に示せる。

この節では有限集合 $X$ を扱い、$w(x)>0$、$\sum_{x\in X}w(x)=1$ を評価点の重みとする。群 $G$ は $X$ に作用し、**重みの不変性** $w(g\cdot x)=w(x)$ を要求する。関数 $u,v:X\to\mathbb R$ の内積とノルムを

$$
\langle u,v\rangle_w=\sum_{x\in X}w(x)u(x)v(x),
\qquad
\|u\|_w^2=\langle u,u\rangle_w
$$

と定める。有限和のため積分や極限交換は必要ない。正の重みなので $\|u\|_w=0$ なら全点で $u=0$ である。

<a id="thm-pml1-16-orthogonal"></a>

<!-- formal-statement-start -->
> **定理（不変な評価重みに関する直交射影）**  
> 空でない有限集合 $X$ に有限群 $G$ が左作用し、正の確率重み $w:X\to(0,1]$ は $w(g\cdot x)=w(x)$ を満たすとする。この重み付き内積に関して群平均作用素 $P_G$ は、不変関数からなる部分空間への直交射影である。特に、任意の実数値関数 $f,y:X\to\mathbb R$ について

$$
\|f-y\|_w^2
=\|P_Gf-P_Gy\|_w^2
+\|(I-P_G)(f-y)\|_w^2
$$

> が成り立つ。ここで $I$ は恒等作用素、$(I-P_G)u=u-P_Gu$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 群作用が重みを保つので、和の変数を $x\mapsto g\cdot x$ と置き換えても内積が変わらない。これで $P_G$ が自己共役、すなわち $\langle P_Gu,v\rangle_w=\langle u,P_Gv\rangle_w$ であることを示す。[前節の射影性](#thm-pml1-16-reynolds)と合わせて直交性を導く。

<!-- proof-start -->
### 証明

まず $g\in G$ を固定する。$z=g\cdot x$ と変数を置くと、群作用の逆元から $x=g^{-1}\cdot z$ と一意に戻せる。重みの不変性より $w(x)=w(g^{-1}\cdot z)=w(z)$ である。従って

$$
\begin{aligned}
\langle P_Gu,v\rangle_w
&=\frac1{|G|}\sum_{g\in G}\sum_{x\in X}
w(x)u(g\cdot x)v(x)\\
&=\frac1{|G|}\sum_{g\in G}\sum_{z\in X}
w(z)u(z)v(g^{-1}\cdot z)\\
&=\sum_{z\in X}w(z)u(z)
\left(\frac1{|G|}\sum_{h\in G}v(h\cdot z)\right)\\
&=\langle u,P_Gv\rangle_w.
\end{aligned}
$$

三行目では $h=g^{-1}$ と置き直した。よって $P_G$ は自己共役である。

任意の $u$ に対して、[群平均の射影性](#thm-pml1-16-reynolds)から $P_G^2=P_G$。任意の不変関数 $v$ は $P_Gv=v$ を満たすから、

$$
\langle u-P_Gu,v\rangle_w
=\langle u,v\rangle_w-\langle P_Gu,v\rangle_w
=\langle u,v\rangle_w-\langle u,P_Gv\rangle_w=0.
$$

従って残差 $u-P_Gu$ は不変関数全体に直交する。$P_Gu$ 自身が不変なので、直交射影である。

$u=f-y$ として $u=P_Gu+(I-P_G)u$ を展開する。二項が直交するため

$$
\begin{aligned}
\|u\|_w^2
&=\langle P_Gu+(I-P_G)u,\,
P_Gu+(I-P_G)u\rangle_w\\
&=\|P_Gu\|_w^2+\|(I-P_G)u\|_w^2.
\end{aligned}
$$

$P_G$ の線形性から $P_Gu=P_Gf-P_Gy$ なので、主張の等式を得る。
<!-- proof-end -->

<a id="prop-pml1-16-risk"></a>

<!-- formal-statement-start -->
> **命題（教師値の対称性と群平均後の二乗誤差）**  
> 空でない有限集合 $X$ に有限群 $G$ が左作用し、$w:X\to(0,1]$ が $\sum_{x\in X}w(x)=1$ と $w(g\cdot x)=w(x)$（すべての $g\in G,x\in X$）を満たすとする。教師値 $y:X\to\mathbb R$ が $G$-不変なら、任意の $f:X\to\mathbb R$ について

$$
\|P_Gf-y\|_w^2
\le\|f-y\|_w^2
$$

> が成立し、差は $\|f-P_Gf\|_w^2$ に等しい。一般の教師値 $y$ に対しては

$$
\|P_Gf-y\|_w^2
=\|P_Gf-P_Gy\|_w^2
+\|y-P_Gy\|_w^2.
$$

> 特に不変な予測器の最小二乗誤差は $\|y-P_Gy\|_w^2$ であり、$f=P_Gy$ が達成する。
<!-- formal-statement-end -->

**証明の見取り図。** 前定理で $u=f-y$ とすれば、教師値が不変のときは $P_Gy=y$ となる。一般の教師値では、予測誤差を不変部分と非不変部分へ直交分解する。

<!-- proof-start -->
### 証明

$y$ が不変なら [群平均の固定点条件](#thm-pml1-16-reynolds)で $P_Gy=y$。[直交射影の定理](#thm-pml1-16-orthogonal)を $u=f-y$ に適用すると

$$
\|f-y\|_w^2
=\|P_Gf-y\|_w^2+\|f-P_Gf\|_w^2.
$$

後項は非負なので第一の主張を得る。一般の $y$ では

$$
P_Gf-y=(P_Gf-P_Gy)-(y-P_Gy).
$$

第一項は不変関数であり、第二項は[直交射影の定理](#thm-pml1-16-orthogonal)より不変関数全体と直交する。そのため二乗ノルムを展開すると交差項が0になり第二の等式を得る。第一項を0にするには $P_Gf=P_Gy$ とすればよい。特に $f=P_Gy$ なら [射影性](#thm-pml1-16-reynolds)により $P_Gf=P_Gy$ であり、最小値に達する。
<!-- proof-end -->

**正しい対称性は誤差を減らす。** 二点 $X=\{-1,1\}$ の一様重みで $y(-1)=y(1)=1$、$f(-1)=0$、$f(1)=2$ とすると、元の誤差は $(1+1)/2=1$、群平均後は常に $1$ なので誤差0である。

**教師値が対称でないとき。** 同じ二点で $y(-1)=-1$、$y(1)=1$ とし、$f=y$ なら元の誤差は0だが、$P_Gf=0$ の誤差は1になる。教師値の不変性という仮定を失い、分解で $\|y-P_Gy\|_w^2=1$ が残る。

**評価分布が対称でないとき。** 教師値は両点で0のまま、重みを $w(1)=0.9,w(-1)=0.1$、予測値を $f(1)=0,f(-1)=2$ とする。元の誤差は $0.9\cdot0+0.1\cdot4=0.4$。群平均後は両点で1なので誤差は1。重みの不変性 $w(1)=w(-1)$ が破れ、前定理の変数置換における重みの等式が使えなくなった。

## 4. 力のようなベクトルには等変な平均を使う

前講の[不変なポテンシャルの勾配は等変という定理](../PML1-15/index.md#thm-pml1-15-gradient-equivariance)では、力は回転とともに向きを変える。力の二成分をそのまま平均して不変にしてしまうと、求める変換則を壊す。

入力集合 $X$ に有限群 $G$ が作用し、出力を $V=\mathbb R^d$ の列ベクトルとする。$GL_d(\mathbb R)$ は可逆な $d\times d$ 実行列全体を表し、$I_d$ は単位行列である。各 $g\in G$ が出力ベクトルをどう変換するかを行列 $\rho(g)\in GL_d(\mathbb R)$ で指定する。群の合成と整合する条件は

$$
\rho(gh)=\rho(g)\rho(h),\qquad \rho(e)=I_d.
$$

このような対応 $\rho$ を**線形表現**と呼ぶ。条件から $\rho(g)\rho(g^{-1})=I_d$、すなわち $\rho(g)^{-1}=\rho(g^{-1})$ が従う。したがって出力を元の向きへ戻す操作は逆行列で表せる。予測器 $F:X\to V$ の等変性は、[等変写像の定義](../../MFL/MFL22/index.md#def-mfl22-equivariant)に沿って

$$
F(g\cdot x)=\rho(g)F(x)
$$

を全ての $g,x$ に要求する。予測した後で出力を「元の向きへ戻す」ため、平均前に $\rho(g)^{-1}$ を掛ける。

<a id="thm-pml1-16-equivariant"></a>

<!-- formal-statement-start -->
> **定理（有限群平均による等変化）**  
> 有限群 $G$ が集合 $X$ に左作用し、$\rho:G\to GL_d(\mathbb R)$ は $\rho(gh)=\rho(g)\rho(h)$、$\rho(e)=I_d$ を満たすとする。任意の $F:X\to\mathbb R^d$ に対して

$$
(\mathcal P_\rho F)(x)
:=\frac1{|G|}\sum_{g\in G}\rho(g)^{-1}F(g\cdot x)
$$

> と定めると、すべての $h\in G,x\in X$ で

$$
(\mathcal P_\rho F)(h\cdot x)
=\rho(h)(\mathcal P_\rho F)(x)
$$

> が成り立つ。$\mathcal P_\rho$ は線形で $\mathcal P_\rho^2=\mathcal P_\rho$ であり、$F$ が等変なことと $\mathcal P_\rho F=F$ は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** スカラーの場合と同じ添字替え $k=gh$ を使う。ただし今度は、逆行列を伴う係数 $\rho(g)^{-1}$ を $\rho(h)\rho(k)^{-1}$ へ変形する。

<!-- proof-start -->
### 証明

任意の $h,x$ で

$$
\begin{aligned}
(\mathcal P_\rho F)(h\cdot x)
&=\frac1{|G|}\sum_{g\in G}\rho(g)^{-1}F((gh)\cdot x).
\end{aligned}
$$

$k=gh$ とすれば $g=kh^{-1}$。線形表現の積の規則から

$$
\rho(g)^{-1}
=\bigl(\rho(k)\rho(h)^{-1}\bigr)^{-1}
=\rho(h)\rho(k)^{-1}.
$$

従って

$$
\begin{aligned}
(\mathcal P_\rho F)(h\cdot x)
&=\frac1{|G|}\sum_{k\in G}
\rho(h)\rho(k)^{-1}F(k\cdot x)\\
&=\rho(h)(\mathcal P_\rho F)(x).
\end{aligned}
$$

実数 $a,b$ と写像 $F_1,F_2$ に対し、各 $g$ の項で行列の積を分配すると

$$
\begin{aligned}
&\rho(g)^{-1}(aF_1(g\cdot x)+bF_2(g\cdot x))\\
&\quad=a\rho(g)^{-1}F_1(g\cdot x)
+b\rho(g)^{-1}F_2(g\cdot x).
\end{aligned}
$$

これを群全体で平均すると

$$
\mathcal P_\rho(aF_1+bF_2)
=a\mathcal P_\rho F_1+b\mathcal P_\rho F_2
$$

なので線形である。いま示した等変性をもう一度平均の定義へ代入すると

$$
\begin{aligned}
(\mathcal P_\rho^2F)(x)
&=\frac1{|G|}\sum_{g\in G}
\rho(g)^{-1}(\mathcal P_\rho F)(g\cdot x)\\
&=\frac1{|G|}\sum_{g\in G}
\rho(g)^{-1}\rho(g)(\mathcal P_\rho F)(x)\\
&=(\mathcal P_\rho F)(x).
\end{aligned}
$$

逆に元から $F$ が等変なら $\rho(g)^{-1}F(g\cdot x)=F(x)$ が各項で成り立つので $\mathcal P_\rho F=F$。他方向は最初に証明した等変性と固定点条件から従う。
<!-- proof-end -->

### 4.1 反転で向きが変わるベクトル

$G=\{I_2,-I_2\}$ が $X=\mathbb R^2$ に行列として作用し、出力にも $\rho(-I_2)=-I_2$ を使う。入力を列ベクトル $\boldsymbol z\in\mathbb R^2$ とし、$F(\boldsymbol z)=A\boldsymbol z+b$（$A$ は $2\times2$ 実行列、$b$ は定数ベクトル）なら

$$
\begin{aligned}
(\mathcal P_\rho F)(\boldsymbol z)
&=\tfrac12\{F(\boldsymbol z)-F(-\boldsymbol z)\}\\
&=\tfrac12\{A\boldsymbol z+b-(-A\boldsymbol z+b)\}
=A\boldsymbol z.
\end{aligned}
$$

定数のずれ $b$ は消え、$(\mathcal P_\rho F)(-\boldsymbol z)=-A\boldsymbol z$ は $\rho(-I_2)(\mathcal P_\rho F)(\boldsymbol z)$ に一致する。スカラーの単純平均なら $Ax$ の符号まで失う。出力側の作用を指定することが重要である。

ここで $\rho(g)$ に直交性は要求していない。したがってこの定理が保証するのは**等変性と射影性**であり、ベクトルの通常のユークリッド二乗誤差が減るという主張ではない。誤差について同様の直交射影を示すには、評価重みの不変性に加え、少なくとも $\rho(g)^{\mathsf T}\rho(g)=I_d$ などの内積保存条件が必要になる。

## 5. どの対称性を入れるべきか

群平均は任意の元の予測器から、**指定した有限群に対して**厳密に不変または等変な予測器を作る。訓練点を単に増やすデータ拡張とは違い、すべての入力に対する変換則を構成式から保証する。その代わり、各予測では原則 $|G|$ 個の変換入力を評価する計算費用が掛かる。

どの群を課してよいかは教師値と物理法則次第である。前講の[符号付き面積の変換則](../PML1-15/index.md#prop-pml1-15-oriented-area)では鏡映によって符号が反転した。反転する量を鏡映不変なスカラーに平均すれば、必要な符号情報を捨ててしまう。さらに、有限群の平均だけでは連続回転や並進すべてへの保証を与えない。

## 6. 演習 Level A

<a id="ex-pml1-16-a01"></a>
### PML1-16-A01 反転群で奇成分を除く

- Level: A

$G=\{e,s\}$、$s\cdot x=-x$、$f(x)=x^2+3x+2$ とする。$P_Gf$ を求め、$x=1,-1$ で不変性を確かめよ。

<!-- solution-start -->
#### 詳細解答

[有限群平均作用素の定義](#def-pml1-16-averaging)より

$$
(P_Gf)(x)=\tfrac12(f(x)+f(-x))
=\tfrac12(x^2+3x+2+x^2-3x+2)
=x^2+2.
$$

両点の値は $1^2+2=(-1)^2+2=3$。また任意の実数 $x$ でも $(-x)^2+2=x^2+2$ なので反転不変である。
<!-- solution-end -->

<a id="ex-pml1-16-a02"></a>
### PML1-16-A02 四回転で二次式を平均する

- Level: A

$R(x,y)=(-y,x)$、$G=\{I,R,R^2,R^3\}$、$f(x,y)=x^2+2y^2$ とする。四つの入力での値を書き、群平均を計算せよ。

<!-- solution-start -->
#### 詳細解答

$R^2(x,y)=(-x,-y)$、$R^3(x,y)=(y,-x)$ である。順に代入すると

$$
f(x,y)=f(-x,-y)=x^2+2y^2,
$$

$$
f(-y,x)=f(y,-x)=y^2+2x^2.
$$

四項を足すと $6x^2+6y^2$ なので、[群平均の定義](#def-pml1-16-averaging)に従い4で割って

$$
(P_Gf)(x,y)=\tfrac32(x^2+y^2)
$$

となる。直交回転は $x^2+y^2$ を変えないため不変である。
<!-- solution-end -->

<a id="ex-pml1-16-a03"></a>
### PML1-16-A03 同じ軌道への重複を数える

- Level: A

正方形の四頂点 $X=\{0,1,2,3\}$ に8要素の $D_4$ が通常の回転・鏡映で作用する。$f(0)=2,f(1)=4,f(2)=6,f(3)=8$ とする。各頂点へ到着する群要素が2個であることを使い、$P_{D_4}f$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[到着点の重複数](../../MFL/MFL23/index.md#prop-mfl23-fibers)では、四頂点の各安定化群は2要素なので到着点ごとに2回数える。従って任意の出発点 $j$ について

$$
(P_{D_4}f)(j)
=\frac{2(2+4+6+8)}8
=\frac{40}{8}=5.
$$

四頂点をそれぞれ1回ずつ平均しても $(2+4+6+8)/4=5$ であり、群要素平均と軌道平均が一致する。
<!-- solution-end -->

<a id="ex-pml1-16-a04"></a>
### PML1-16-A04 一度平均した関数を再び平均する

- Level: A

二点 $X=\{a,b\}$ を交換する群 $G=\{e,s\}$ とし、$f(a)=3,f(b)=-1$ とする。$P_Gf$ と $P_G^2f$ をそれぞれ定義から求めよ。

<!-- solution-start -->
#### 詳細解答

各点の軌道は $\{a,b\}$ なので

$$
(P_Gf)(a)=(P_Gf)(b)=\frac{3+(-1)}2=1.
$$

もう一度平均すると、両点で $(1+1)/2=1$。従って $P_G^2f=P_Gf$ であり、[射影性の定理](#thm-pml1-16-reynolds)を直接確認できた。
<!-- solution-end -->

<a id="ex-pml1-16-a05"></a>
### PML1-16-A05 偶平均と奇平均の違い

- Level: A

$X=\mathbb R$、$G=\{e,s\}$、$s\cdot x=-x$ とする。$f(x)=x^3+2x^2+x+1$ について、実数値の不変平均 $P_Gf$ と、出力に $\rho(s)=-1$ を指定した等変平均 $\mathcal P_\rho f$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$ f(-x)=-x^3+2x^2-x+1 $ である。不変平均では

$$
(P_Gf)(x)=\tfrac12(f(x)+f(-x))=2x^2+1.
$$

[等変平均の定義](#thm-pml1-16-equivariant)では $\rho(s)^{-1}=-1$ だから

$$
(\mathcal P_\rho f)(x)
=\tfrac12(f(x)-f(-x))=x^3+x.
$$

前者は反転して不変、後者は反転して符号が変わる。二つは異なる出力作用を指定した結果である。
<!-- solution-end -->

## 7. 演習 Level B

<a id="ex-pml1-16-b01"></a>
### PML1-16-B01 非可換群でも二重平均が変わらない理由

- Level: B

有限群 $G$ が $X$ に左作用し、$P_G$ を群平均とする。$G$ が可換であると仮定せず、$P_G^2f=P_Gf$ を二重和から証明せよ。各 $k\in G$ が何回現れるかを明示せよ。

<!-- solution-start -->
#### 詳細解答

[群平均の定義](#def-pml1-16-averaging)を二回適用する。

$$
\begin{aligned}
(P_G^2f)(x)
&=\frac1{|G|}\sum_{h\in G}(P_Gf)(h\cdot x)\\
&=\frac1{|G|^2}\sum_{h\in G}\sum_{g\in G}
f((gh)\cdot x).
\end{aligned}
$$

$k\in G$ を固定すると、どの $h\in G$ にも $g=kh^{-1}$ が唯一対応し、$gh=k$ を満たす。従って $k$ は二重和にちょうど $|G|$ 回現れる。

$$
(P_G^2f)(x)
=\frac{|G|}{|G|^2}\sum_{k\in G}f(k\cdot x)
=(P_Gf)(x).
$$

使ったのは逆元と積の結合則だけであり、$gh=hg$ は使っていない。
<!-- solution-end -->

<a id="ex-pml1-16-b02"></a>
### PML1-16-B02 直交分解を数値で検算する

- Level: B

$X=\{a,b\}$ の交換作用・一様重みで、教師値 $y(a)=y(b)=1$、予測値 $f(a)=2,f(b)=0$ とする。群平均の前後の二乗誤差と $\|f-P_Gf\|_w^2$ を求め、[誤差の等式](#prop-pml1-16-risk)を検算せよ。

<!-- solution-start -->
#### 詳細解答

両点で $P_Gf=(2+0)/2=1$、また $P_Gy=y$ である。元の誤差は

$$
\|f-y\|_w^2=\tfrac12(2-1)^2+\tfrac12(0-1)^2=1.
$$

群平均後は $\|P_Gf-y\|_w^2=0$。残差は $(f-P_Gf)(a)=1$、$(f-P_Gf)(b)=-1$ だから

$$
\|f-P_Gf\|_w^2
=\tfrac12(1)^2+\tfrac12(-1)^2=1.
$$

従って $1=0+1$ と、[直交射影の等式](#thm-pml1-16-orthogonal)の両辺が一致する。
<!-- solution-end -->

<a id="ex-pml1-16-b03"></a>
### PML1-16-B03 重みが不変でないときの失敗

- Level: B

$X=\{a,b\}$ を交換する群で、教師値は両点で0とする。$f(a)=0,f(b)=2$、重み $w(a)=9/10,w(b)=1/10$ とする。平均前後の重み付き二乗誤差を計算し、どの仮定が欠けているかを述べよ。

<!-- solution-start -->
#### 詳細解答

元の誤差は

$$
\|f-y\|_w^2=\tfrac9{10}(0-0)^2+\tfrac1{10}(2-0)^2=\tfrac25.
$$

群平均では両点の値が1なので

$$
\|P_Gf-y\|_w^2
=\tfrac9{10}(1-0)^2+\tfrac1{10}(1-0)^2=1.
$$

したがって誤差は増えた。教師値は不変だが、交換で $w(a)=9/10$ と $w(b)=1/10$ が入れ替わり、[直交射影の定理](#thm-pml1-16-orthogonal)の $w(g\cdot x)=w(x)$ が成立しない。定理の自己共役性の証明で変数を置き換えたとき、重みを保てないのが破綻箇所である。
<!-- solution-end -->

<a id="ex-pml1-16-b04"></a>
### PML1-16-B04 四回転でベクトルを等変化する

- Level: B

$X=\mathbb R^2$、$G=C_4=\{I_2,R,R^2,R^3\}$、$R(x,y)^{\mathsf T}=(-y,x)^{\mathsf T}$ とする。入力を列ベクトル $\boldsymbol z=(x,y)^{\mathsf T}$ と書き、出力には $\rho(R^k)=R^k$ を使う。$F(\boldsymbol z)=A\boldsymbol z+b$、$A=\operatorname{diag}(2,0)$、$b=(1,0)^{\mathsf T}$ に対し $\mathcal P_\rho F$ を求め、90度回転に対する等変性を確認せよ。

<!-- solution-start -->
#### 詳細解答

[等変平均の定義](#thm-pml1-16-equivariant)に代入すると、$R^{-k}F(R^k\boldsymbol z)=R^{-k}AR^k\boldsymbol z+R^{-k}b$ である。$R^2=-I$ より

$$
R^{-0}AR^0=R^{-2}AR^2=A,
$$

$$
R^{-1}AR=R^{-3}AR^3
=\begin{pmatrix}0&0\\0&2\end{pmatrix}.
$$

四つの行列の和は $2A+2\operatorname{diag}(0,2)=4I$。また

$$
\sum_{k=0}^3 R^{-k}b
=b+R^{-1}b+R^{-2}b+R^{-3}b=0
$$

である（四方向の単位ベクトルの和）。従って

$$
(\mathcal P_\rho F)(\boldsymbol z)
=\tfrac14(4I_2\boldsymbol z+0)=\boldsymbol z.
$$

特に $(\mathcal P_\rho F)(R\boldsymbol z)=R\boldsymbol z=R(\mathcal P_\rho F)(\boldsymbol z)$ となり、[等変平均の定理](#thm-pml1-16-equivariant)を具体的に確認できる。
<!-- solution-end -->

<a id="ex-pml1-16-b05"></a>
### PML1-16-B05 有限回転と連続回転を区別する

- Level: B

$f(x,y)=x^4-6x^2y^2+y^4$ を考える。90度回転 $R(x,y)=(-y,x)$ では $f(R(x,y))=f(x,y)$ となることを直接展開で示せ。一方、45度回転では不変でないことを一点で示し、群平均で保証した範囲を述べよ。

<!-- solution-start -->
#### 詳細解答

$(x,y)$ に $(-y,x)$ を代入すると

$$
f(-y,x)=(-y)^4-6(-y)^2x^2+x^4
=y^4-6x^2y^2+x^4=f(x,y).
$$

従って $R$ の任意の整数乗に対しても不変で、[有限群平均の固定点条件](#thm-pml1-16-reynolds)から $P_{C_4}f=f$。しかし $f(1,0)=1$ であり、45度回転後には

$$
f(1/\sqrt2,1/\sqrt2)
=\tfrac14-6\cdot\tfrac14+\tfrac14=-1.
$$

よって全角度の回転不変性はない。有限個の90度回転で平均したことは、連続回転群すべてで平均したことではない。
<!-- solution-end -->

## 8. 演習 Level C

<a id="ex-pml1-16-c01"></a>
### PML1-16-C01 教師値・重み・群を含めて対称化を評価する

- Level: C

正方形の四頂点 $X=\{0,1,2,3\}$ に $D_4$ が回転と鏡映で作用し、評価重みは各頂点 $1/4$ とする。元の予測値を

$$
(f(0),f(1),f(2),f(3))=(2,1,-1,0)
$$

とし、教師値を $(y(0),y(1),y(2),y(3))=(1,1,-1,-1)$ とする。

1. $P_{D_4}f$ と $P_{D_4}y$ を求め、群平均の不変性を確認せよ。
2. 元の二乗誤差、平均後の二乗誤差、不変予測器の最小誤差を求めよ。平均後に誤差が増える理由を説明せよ。
3. 教師値だけを全頂点で $y_0=1$ に変更したとき、元の二乗誤差と平均後の二乗誤差を求め、直交分解の残差項と照合せよ。
4. 出力を向きのあるベクトルへ変更する場合、スカラー平均の代わりにどのような操作を選ぶべきか、作用の条件を明記せよ。

<!-- solution-start -->
#### 詳細解答

**1.** 正方形の頂点への $D_4$ の作用は一つの軌道を作る。各頂点へ到着する群要素は同じ2個だから、[軌道平均の式](#thm-pml1-16-reynolds)より

$$
(P_{D_4}f)(j)=\frac{2+1-1+0}{4}=\frac12
$$

が全頂点 $j$ で成り立つ。同様に

$$
(P_{D_4}y)(j)=\frac{1+1-1-1}{4}=0.
$$

いずれも定数関数なので、どの群要素で頂点を動かしても変わらない。

**2.** 元の点ごとの差は $(f-y)=(1,0,0,1)$。従って

$$
\|f-y\|_w^2=\tfrac14(1^2+0^2+0^2+1^2)=\tfrac12.
$$

平均後は予測値が全点で $1/2$ だから

$$
\|P_{D_4}f-y\|_w^2
=\tfrac14\bigl[2(\tfrac12-1)^2+2(\tfrac12+1)^2\bigr]
=\tfrac14(\tfrac12+\tfrac92)=\tfrac54.
$$

一方、[教師値の軌道内分散による誤差下界](../../MFL/MFL23/index.md#prop-mfl23-orbit-loss)は平均0から

$$
\|y-P_{D_4}y\|_w^2
=\tfrac14(1^2+1^2+(-1)^2+(-1)^2)=1.
$$

不変予測器の最小誤差1は定数0が達成する。今回の予測器の平均値 $1/2$ は最適定数0からずれているので誤差 $1+(\tfrac12)^2=5/4$。元の予測器は教師値の符号差を利用していたが、不変化でその情報を失った。

**3.** $y_0(j)=1$ はすべての作用で不変。元の差は $(1,0,-2,-1)$ なので

$$
\|f-y_0\|_w^2
=\tfrac14(1+0+4+1)=\tfrac32.
$$

平均後は $P_{D_4}f=1/2$ なので

$$
\|P_{D_4}f-y_0\|_w^2
=\tfrac14\cdot4(\tfrac12-1)^2=\tfrac14.
$$

残差 $f-P_{D_4}f=(3/2,1/2,-3/2,-1/2)$ の二乗ノルムは

$$
\|f-P_{D_4}f\|_w^2
=\tfrac14\left(\tfrac94+\tfrac14+\tfrac94+\tfrac14\right)
=\tfrac54.
$$

従って $3/2=1/4+5/4$ となり、[不変な教師値に対する誤差分解](#prop-pml1-16-risk)を検算できた。

**4.** 出力に群と両立する可逆線形作用 $\rho:G\to GL_d(\mathbb R)$、すなわち $\rho(gh)=\rho(g)\rho(h)$ と $\rho(e)=I_d$ を指定する。ベクトル予測器 $F$ には

$$
(\mathcal P_\rho F)(x)
=\frac1{|G|}\sum_{g\in G}\rho(g)^{-1}F(g\cdot x)
$$

を用いる。[等変化の定理](#thm-pml1-16-equivariant)により $\mathcal P_\rho F(h\cdot x)=\rho(h)(\mathcal P_\rho F)(x)$ を満たす。ただし二乗誤差の減少まで主張するには、教師値の等変性と評価重みの不変性だけでなく、出力の内積を $\rho$ が保存する条件も点検する必要がある。
<!-- solution-end -->

## 9. 次の講義へ

群平均は有限群について変換則を厳密に組み込む構成であり、不変な教師値と不変な評価重みの下では二乗誤差を増やさない。等変な出力には逆表現を掛けてから平均する。しかしこれらの式は、運動系が時間発展の中で量を保存することを直接証明するものではない。

次の **PML1-17** では連続時間の力学で対称性と保存量の関係を扱い、学習したモデルに「対称性がある」ことと「保存量がある」ことの間に必要な条件を調べる。
