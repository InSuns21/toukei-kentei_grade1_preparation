# MFL25 不変化・等変層の構成原理

<!-- definition-example-audit: strict -->

## 1. 対称性を「学習できたらよい性質」から構成上の性質へ

[MFL24 の絡作用素](../MFL24/index.md#def-mfl24-intertwiner)は、線形層の重みが入出力の表現と両立する条件を与えた。ただし一般の重み行列がその条件を満たすとは限らない。また、線形層を何段も重ねるだけでは非線形な関係を表せないため、[ML2-13 の多層パーセプトロン](../../ML/ML2-13/index.md#def-ml2-13-mlp)のように活性化関数を挟みたい。

問題は二つある。自由に選んだ関数・重みを**対称性と両立するものへ直す**にはどうするか。そして、正しい線形層の後へ非線形性を挟んでも対称性は残るのか。

最初に有限群 $G$ と集合 $X$ への左作用を考える。単位元と積は次を満たす。これは[GRP3 の群作用](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)と同じ約束である。

$$
ex=x,\qquad (gh)x=g(hx).
$$

後半では $X=\mathbb R^m$ とし、入出力の実有限次元表現を $\rho_{\mathrm{in}},\rho_{\mathrm{out}}$ と書く。[前章の表現](../MFL24/index.md#def-mfl24-representation)は、群の積を行列積へ送る写像である。

全群の元を一度ずつ走査する有限和だけを使う。平均する対象は関数値であり、**群の作用を受ける入力の向きと出力を戻す向き**を明確に区別する。

## 2. 出力を変えない関数を群平均で作る

まず出力が普通の実数、または群作用を持たないベクトルの場合を考える。任意の関数 $f:X\to\mathbb R^q$ の入力を各 $g$ で動かし、その出力を平均すれば、軌道上で同じ値が得られそうである。この操作を**不変化の群平均**と呼ぶ。

<a id="def-mfl25-invariant-average"></a>

<!-- formal-statement-start -->
> **定義（有限群による不変化平均）**  
> 有限群 $G$ が集合 $X$ に左作用し、$f:X\to\mathbb R^q$ ($q\ge1$) を任意の関数とする。関数 $Qf:X\to\mathbb R^q$ を

$$
(Qf)(x)=\frac1{|G|}\sum_{g\in G}f(gx)
\quad(x\in X)
$$

> で定める。出力 $\mathbb R^q$ には自明な群作用を課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl25-invariant-average -->
**定義の確認**。$G=C_2=\{e,s\}$ が $X=\mathbb R$ に $sx=-x$ と作用し、$f(x)=x^2+x+1$ とする。各群元で評価した $f(ex)=x^2+x+1$、$f(sx)=x^2-x+1$ を足すと

$$
(Qf)(x)=\frac{(x^2+x+1)+(x^2-x+1)}2=x^2+1.
$$

実際、$(Qf)(-x)=(-x)^2+1=(Qf)(x)$ である。元の関数では $f(1)=3$ と $f(-1)=1$ が異なるが、平均後は両方とも $2$ になる。

軌道内の違いが失われる点は[MFL23 の不変写像の商への分解](../MFL23/index.md#prop-mfl23-factorization)とも一致する。
<!-- definition-example-end -->

<a id="thm-mfl25-invariant-projection"></a>

<!-- formal-statement-start -->
> **定理（不変化平均の不変性と射影性）**  
> 有限群 $G$ が集合 $X$ に左作用する。任意の関数 $f:X\to\mathbb R^q$ に対し、$Qf$ は全 $h\in G$ と $x\in X$ で不変性を満たす。

$$
(Qf)(hx)=(Qf)(x).
$$

> また $Q$ は関数の加法・実数倍について線形で、次の冪等性を満たす。既に不変な $f$ に対しては $Qf=f$ である。

$$
Q(Qf)=Qf.
$$
<!-- formal-statement-end -->

**証明の見取り図**。$g$ を全群で動かすと、右から固定元 $h$ を掛けた $gh$ も全群を一度ずつ動く。この「添字の付け替え」が不変性の根拠である。続けて、既に不変な関数を再び平均しても変化しないことを使う。

<!-- proof-start -->
### 証明

$h\in G$ を固定し、$k=gh$ と置く。右から $h$ を掛ける写像 $g\mapsto k$ は逆写像 $k\mapsto kh^{-1}$ を持つので、$G$ の全単射である。左作用の積の約束より

$$
\begin{aligned}
(Qf)(hx)
&=\frac1{|G|}\sum_{g\in G}f(g(hx))\\
&=\frac1{|G|}\sum_{g\in G}f((gh)x)\\
&=\frac1{|G|}\sum_{k\in G}f(kx)=(Qf)(x).
\end{aligned}
$$

各項 $f(gx)$ の加法・実数倍を和の外へ出せるので $Q(af+bu)=aQf+bQu$（$a,b\in\mathbb R$）である。既に不変な $f$ なら各 $g$ で $f(gx)=f(x)$ だから、$|G|$ 項を平均して $Qf=f$。最初の結論から $Qf$ 自身が不変なので、同じ議論を $Qf$ に適用すると $Q(Qf)=Qf$。$\square$
<!-- proof-end -->

線形な操作を二回繰り返しても一回と同じになる性質を、この文脈では**射影性**と呼ぶ。ただし「射影」は入力 $x$ をどこかへ近づける操作ではなく、関数の空間で不変関数へ写すという意味である。適切な確率測度や内積を指定していないので、ここで直交射影だとは主張しない。

## 3. 出力も変換するなら、平均前に出力の向きを戻す

矢印のような出力は、入力を回転したら一緒に回転することが必要であり、単純な不変化平均では一般に消えてしまう。欲しい性質は[MFL22 の等変性](../MFL22/index.md#def-mfl22-equivariant)、すなわち $F(gx)=\rho_{\mathrm{out}}(g)F(x)$ である。

各 $g$ で評価した $f(gx)$ は「変換後の出力座標」にある。平均前に $\rho_{\mathrm{out}}(g)^{-1}$ を掛け、元の出力座標へ戻す。逆行列が存在するのは $\rho_{\mathrm{out}}$ が表現であるためである。

<a id="def-mfl25-equivariant-average"></a>

<!-- formal-statement-start -->
> **定義（有限群の等変化平均）**  
> 有限群 $G$ が集合 $X$ に左作用し、$\rho_{\mathrm{out}}:G\to\operatorname{GL}_q(\mathbb R)$ ($q\ge1$) を実行列表現とする。任意の関数 $f:X\to\mathbb R^q$ に対し、等変化平均 $Sf$ を

$$
(Sf)(x)=\frac1{|G|}\sum_{g\in G}
\rho_{\mathrm{out}}(g^{-1})f(gx)
$$

> と定める。$g^{-1}$ は $g$ の逆元であり、$\rho_{\mathrm{out}}(g^{-1})=\rho_{\mathrm{out}}(g)^{-1}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl25-equivariant-average -->
**定義の確認**。再び $C_2$ の $sx=-x$ と $f(x)=x^2+x+1$ を使う。ただし今度は出力も符号型で、$\rho_{\mathrm{out}}(s)=-1$ とする。$s^{-1}=s$ なので

$$
(Sf)(x)=\frac12\{f(x)-f(-x)\}
=\frac12\{(x^2+x+1)-(x^2-x+1)\}=x.
$$

$(Sf)(-x)=-x=\rho_{\mathrm{out}}(s)(Sf)(x)$ である。前節の $Qf=x^2+1$ と違って、こちらは**符号反転を保存する成分**だけを残した。出力の表現が自明なら $S=Q$ となることも定義から分かる。
<!-- definition-example-end -->

<a id="thm-mfl25-equivariant-projection"></a>

<!-- formal-statement-start -->
> **定理（等変化平均は等変関数への射影）**  
> 有限群 $G$ が集合 $X$ に左作用し、$\rho_{\mathrm{out}}:G\to\operatorname{GL}_q(\mathbb R)$ を実行列表現とする。任意の関数 $f:X\to\mathbb R^q$ に対し $Sf$ は

$$
(Sf)(hx)=\rho_{\mathrm{out}}(h)(Sf)(x)
\quad(h\in G,x\in X)
$$

> を満たす。$S$ は関数の加法・実数倍について線形で $S(Sf)=Sf$。元の $f$ が同じ表現に関して等変なら $Sf=f$ である。
<!-- formal-statement-end -->

**証明の見取り図**。$k=gh$ へ添字を換えると $g^{-1}=hk^{-1}$。出力を戻す行列に $\rho_{\mathrm{out}}(h)$ が左から現れ、求める等変性になる。

<!-- proof-start -->
### 証明

$h\in G$ と $x\in X$ を任意に固定し、和の添字を $k=gh$ と置く。このとき $g=kh^{-1}$、$g^{-1}=hk^{-1}$ であり、$k$ は $G$ の全元を一度ずつ走る。

[表現の積の法則](../MFL24/index.md#def-mfl24-representation)と左作用の法則をそれぞれ使うと

$$
\begin{aligned}
(Sf)(hx)
&=\frac1{|G|}\sum_{g\in G}
  \rho_{\mathrm{out}}(g^{-1})f(g(hx))\\
&=\frac1{|G|}\sum_{k\in G}
  \rho_{\mathrm{out}}(hk^{-1})f(kx)\\
&=\rho_{\mathrm{out}}(h)\frac1{|G|}
  \sum_{k\in G}\rho_{\mathrm{out}}(k^{-1})f(kx)\\
&=\rho_{\mathrm{out}}(h)(Sf)(x).
\end{aligned}
$$

和の線形性は $\rho_{\mathrm{out}}(g^{-1})$ が線形行列であることから従う。既に等変な $f$ なら

$$
\rho_{\mathrm{out}}(g^{-1})f(gx)
=\rho_{\mathrm{out}}(g^{-1})\rho_{\mathrm{out}}(g)f(x)
=f(x)
$$

なので $Sf=f$。上で $Sf$ は等変と示したから、その同じ事実を $Sf$ に使えば $S(Sf)=Sf$ である。$\square$
<!-- proof-end -->

この平均は**有限群の全元を使うことが本質**である。任意に選んだ一部の元では $g\mapsto gh$ の置換後も同じ添字集合を走査するとは限らず、証明が成立しない。また、出力の逆行列を付けずに $\rho_{\mathrm{out}}(g)f(gx)$ と平均すると、上の三行目の $\rho_{\mathrm{out}}(h)$ が同じ向きで出るとは限らない。

## 4. 行列とバイアスを許される層へ射影する

入力 $V_{\mathrm{in}}=\mathbb R^m$ は $\rho_{\mathrm{in}}$ によって、出力 $V_{\mathrm{out}}=\mathbb R^q$ は $\rho_{\mathrm{out}}$ によって変換されるものとする。

自由な $q\times m$ 行列 $A$ が絡作用素でなくても、線形関数 $f(x)=Ax$ を[等変化平均](#def-mfl25-equivariant-average)に通せば、線形性を保った等変関数が作れる。

<a id="def-mfl25-linear-average"></a>

<!-- formal-statement-start -->
> **定義（重み・バイアスの群平均）**  
> 有限群 $G$、その実表現 $\rho_{\mathrm{in}}:G\to\operatorname{GL}_m(\mathbb R)$、$\rho_{\mathrm{out}}:G\to\operatorname{GL}_q(\mathbb R)$、任意の行列 $A\in\mathbb R^{q\times m}$ とベクトル $b\in\mathbb R^q$ について、

$$
\begin{aligned}
\mathcal P(A)&=\frac1{|G|}\sum_{g\in G}
\rho_{\mathrm{out}}(g^{-1})A\rho_{\mathrm{in}}(g),\\
\mathcal B(b)&=\frac1{|G|}\sum_{g\in G}
\rho_{\mathrm{out}}(g^{-1})b
\end{aligned}
$$

> と定める。$\mathcal P(A)$ は $q\times m$ 行列、$\mathcal B(b)$ は $q$ 成分ベクトルである。
<!-- formal-statement-end -->

行列積の右側は「入力を $g$ で動かす」、左側は「出力を逆向きに戻す」。この対応は $Ax$ を平均へ代入して

$$
(Sf)(x)=\frac1{|G|}\sum_g\rho_{\mathrm{out}}(g^{-1})A\rho_{\mathrm{in}}(g)x
=\mathcal P(A)x
$$

となることから直接確認できる。

<!-- definition-example-start: def-mfl25-linear-average -->
**定義の確認**（$C_2$ の符号型）。入力・出力とも $\rho(s)=D=\operatorname{diag}(1,-1)$ とし、$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とする。$D^{-1}=D$ なので

$$
DAD=\begin{pmatrix}a&-b\\-c&d\end{pmatrix},\qquad
\mathcal P(A)=\frac12(A+DAD)=\begin{pmatrix}a&0\\0&d\end{pmatrix}.
$$

単位元と $s$ の全元で平均した。結果は $D\mathcal P(A)=\mathcal P(A)D$ を満たし、[MFL24 の符号型の選択則](../MFL24/index.md#prop-mfl24-sign-selection)どおり異なる型の混合が消える。

また $b=(u,v)^T$ を群平均すると

$$
\mathcal B(b)=\frac12\left\{\begin{pmatrix}u\\v\end{pmatrix}
+\begin{pmatrix}u\\-v\end{pmatrix}\right\}
=\begin{pmatrix}u\\0\end{pmatrix}
$$

となる。$D\mathcal B(b)=\mathcal B(b)$ も直接確認できる。
<!-- definition-example-end -->

<a id="thm-mfl25-affine-projection"></a>

<!-- formal-statement-start -->
> **定理（群平均によるアフィン等変層の構成）**  
> 有限群 $G$ の実有限次元表現 $\rho_{\mathrm{in}},\rho_{\mathrm{out}}$ と任意の行列 $A\in\mathbb R^{q\times m}$、ベクトル $b\in\mathbb R^q$ に対し、$W=\mathcal P(A)$、$c=\mathcal B(b)$ とおく。このとき

$$
W\rho_{\mathrm{in}}(h)=\rho_{\mathrm{out}}(h)W,
\qquad \rho_{\mathrm{out}}(h)c=c \quad(h\in G)
$$

> が成り立ち、$L(x)=Wx+c$ は等変である。また $\mathcal P$ と $\mathcal B$ はそれぞれ線形かつ冪等（$\mathcal P^2=\mathcal P$、$\mathcal B^2=\mathcal B$）であり、既にこれらの条件を満たす $W,c$ は平均で変わらない。
<!-- formal-statement-end -->

**証明の見取り図**。$Ax+b$ を[等変化平均の射影定理](#thm-mfl25-equivariant-projection)へ適用するだけで線形・定数項がそれぞれ等変になる。行列・バイアスの条件を項ごとに取り出すと、[前章のアフィン条件](../MFL24/index.md#prop-mfl24-affine-equivariance)へ帰着する。

<!-- proof-start -->
### 証明

$f(x)=Ax+b$ を $X=\mathbb R^m$ 上で考える。入力の群作用は $gx=\rho_{\mathrm{in}}(g)x$ なので、定義式へ代入すると

$$
\begin{aligned}
(Sf)(x)
&=\frac1{|G|}\sum_g\rho_{\mathrm{out}}(g^{-1})
\{A\rho_{\mathrm{in}}(g)x+b\}\\
&=\mathcal P(A)x+\mathcal B(b)=Wx+c.
\end{aligned}
$$

[等変化平均は等変関数への射影](#thm-mfl25-equivariant-projection)という定理により、任意の $h,x$ で

$$
W\rho_{\mathrm{in}}(h)x+c
=\rho_{\mathrm{out}}(h)Wx+\rho_{\mathrm{out}}(h)c.
$$

まず $x=0$ とすれば $c=\rho_{\mathrm{out}}(h)c$。これを差し引くと、全 $x$ で二つの行列の作用が一致する。

$$
W\rho_{\mathrm{in}}(h)x=\rho_{\mathrm{out}}(h)Wx.
$$

任意の入力で一致する二行列は等しいから、[前章のアフィン等変条件](../MFL24/index.md#prop-mfl24-affine-equivariance)も満たす。

$\mathcal P,\mathcal B$ の線形性は有限和と行列積の分配法則による。条件を既に満たす $W$ には、各 $g$ で

$$
\rho_{\mathrm{out}}(g^{-1})W\rho_{\mathrm{in}}(g)
=\rho_{\mathrm{out}}(g^{-1})\rho_{\mathrm{out}}(g)W=W
$$

が成立するから $\mathcal P(W)=W$。固定された $c$ についても $\rho_{\mathrm{out}}(g^{-1})c=c$ で $\mathcal B(c)=c$。初めの結論で $\mathcal P(A),\mathcal B(b)$ は条件を満たすので、それぞれをもう一度平均しても変わらない。$\square$
<!-- proof-end -->

**回転の計算例**。$C_4$ の $90^\circ$ 回転 $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ を入出力の両方に使い、$A=\operatorname{diag}(2,0)$ とする。$R^{-k}=R^{4-k}$ で、$k=0,1,2,3$ の共役を計算すると

$$
\begin{aligned}
R^0AR^0&=\operatorname{diag}(2,0),\\
R^{-1}AR&=\operatorname{diag}(0,2),\\
R^{-2}AR^2&=\operatorname{diag}(2,0),\\
R^{-3}AR^3&=\operatorname{diag}(0,2).
\end{aligned}
$$

ゆえに $\mathcal P(A)=I_2$。任意の $b\in\mathbb R^2$ について $\sum_{k=0}^3R^{-k}b=0$（$I+R+R^2+R^3=0$）なので $\mathcal B(b)=0$。任意の重み・バイアスを平均しても非零の多様な層が得られるとは限らない。入力と出力の特徴型が許す自由度だけが残る。

## 5. 非線形性と層の合成はいつ等変性を保つか

等変な重みを用意しても、その後に任意の活性化関数を掛けたら等変だとは限らない。[ML2-13 の ReLU](../../ML/ML2-13/index.md#def-ml2-13-relu)を各成分へ掛ける操作は、座標を入れ替える作用には自然だが、符号を反転する作用には一般に適さない。

まず、特徴空間 $V=\mathbb R^q$ の表現 $\rho:G\to\operatorname{GL}_q(\mathbb R)$ に対し、**表現と可換な非線形性**とは、関数 $\sigma:V\to V$ が $\sigma(\rho(g)v)=\rho(g)\sigma(v)$ を全 $g,v$ について満たすことをいう。入力と出力が同じ特徴型の等変写像という意味である。

<a id="def-mfl25-equivariant-activation"></a>

<!-- formal-statement-start -->
> **定義（表現に整合する活性化関数）**  
> 有限群 $G$ の実有限次元表現 $\rho:G\to\operatorname{GL}_q(\mathbb R)$ に対し、関数 $\sigma:\mathbb R^q\to\mathbb R^q$ が

$$
\sigma(\rho(g)v)=\rho(g)\sigma(v)
\quad(g\in G,v\in\mathbb R^q)
$$

> を満たす場合、その $\sigma$ は群変換と処理順序を交換できるため、この表現の活性化として使用できる。連続性・微分可能性はこの定義の要件ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl25-equivariant-activation -->
**定義の確認**。$C_2$ が $\mathbb R^2$ の成分を交換する $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ によって作用するとする。成分ごとの ReLU を $\sigma(v_1,v_2)=(\max(0,v_1),\max(0,v_2))$ とすれば

$$
\sigma(Pv)=(\max(0,v_2),\max(0,v_1))=P\sigma(v).
$$

$P^2=I$ だから、単位元と $P$ の両方で条件を満たす。一方 $C_2$ の符号表現 $\rho(s)=-1$ では、$v=1$ に対し $\sigma(-1)=0$ だが $-\sigma(1)=-1$ であり、同じ ReLU は整合しない。必要なのは成分数ではなく**特徴の変換規則**である。
<!-- definition-example-end -->

<a id="thm-mfl25-composition"></a>

<!-- formal-statement-start -->
> **定理（等変層の合成と活性化の十分条件）**  
> 有限群 $G$ の実表現 $\rho_i$ が各 $V_i$（$i=0,1,2$）に与えられているとする。写像 $F:V_0\to V_1$ と $H:V_1\to V_2$ がそれぞれ等変なら、合成 $H\circ F$ は次の等変性を持つ。

$$
(H\circ F)(\rho_0(g)x)=\rho_2(g)(H\circ F)(x).
$$

> 特に、アフィン写像 $L:V_0\to V_1$ が等変で、活性化 $\sigma:V_1\to V_1$ が $\rho_1$ に整合すれば、$\sigma\circ L$ も等変である。このような層を有限個合成しても等変性が保たれる。
<!-- formal-statement-end -->

**証明の見取り図**。中間表現 $\rho_1(g)$ で変換した特徴へ $H$ を適用し、$H$ の等変性をもう一度使う。

<!-- proof-start -->
### 証明

任意の $g\in G,x\in V_0$ を取る。$F$ の等変性の条件は $F(\rho_0(g)x)=\rho_1(g)F(x)$。この等式の両辺へ $H$ を作用させ、次に $H$ の等変性を $v=F(x)$ に適用すると

$$
\begin{aligned}
(H\circ F)(\rho_0(g)x)
&=H(F(\rho_0(g)x))\\
&=H(\rho_1(g)F(x))\\
&=\rho_2(g)H(F(x))
=\rho_2(g)(H\circ F)(x).
\end{aligned}
$$

活性化の主張は $F=L,H=\sigma,\rho_2=\rho_1$ と置いた場合である。有限段の合成については、この二層の計算を一段ずつ繰り返す帰納法で従う。$\square$
<!-- proof-end -->

### 5.1 使える非線形性と使えない非線形性

**自明型**のスカラーには任意の一変数関数を使える。**符号型** $t\mapsto-t$ には奇関数（$\sigma(-t)=-\sigma(t)$）を使える。**置換型**の複数スカラーには同一の成分別関数を使える。これらは定義式を直接代入して確かめられる。

平面の回転型を扱うときは、表現の各行列が**直交行列**なら、長さを用いた非線形性が使える。実数値関数 $a:[0,\infty)\to\mathbb R$ を任意に選び、$\sigma(v)=a(\|v\|^2)v$ と定める。直交性の意味は $\|\rho(g)v\|^2=\|v\|^2$ であるから

$$
\begin{aligned}
\sigma(\rho(g)v)
&=a(\|\rho(g)v\|^2)\rho(g)v\\
&=a(\|v\|^2)\rho(g)v
=\rho(g)\sigma(v).
\end{aligned}
$$

これは回転に整合する**長さゲート**で、例えば $a(t)=1+t$ を使えば非線形である。直交性を確認せずに任意の可逆表現で同じ等式を使うことはできない。

他方、$C_4$ の四分の一回転 $R$ に成分別 ReLU は一般に整合しない。$v=(1,1)^T$ とすると $Rv=(-1,1)^T$ なので

$$
\sigma(Rv)=(0,1)^T,
\qquad R\sigma(v)=(-1,1)^T.
$$

両者は違う。誤りは重みの絡作用条件ではなく、**活性化が回転と可換でない**ことにある。非線形性の選択は[MFL24 の特徴型](../MFL24/index.md#def-mfl24-feature-type)と組にして行う。

## 6. 不変な読み出しと、平均で保証しないもの

中間層まで等変な特徴 $F(x)$ が得られたとき、最終出力を不変な量にしたければ、表現 $\rho_{\mathrm{out}}$ に対して不変な読み出し $p$（$p(\rho_{\mathrm{out}}(g)v)=p(v)$）を使えばよい。例えば直交表現では $p(v)=\|v\|^2$ が使える。

<a id="prop-mfl25-invariant-readout"></a>

<!-- formal-statement-start -->
> **命題（等変特徴から不変出力への読み出し）**  
> 有限群 $G$ の実表現 $\rho_{\mathrm{in}},\rho_{\mathrm{out}}$ に対し、写像 $F:V_{\mathrm{in}}\to V_{\mathrm{out}}$ が等変とする。読み出し $p:V_{\mathrm{out}}\to\mathbb R$ は全 $g\in G$ と $v\in V_{\mathrm{out}}$ で次の条件を満たすとする。

$$
p(\rho_{\mathrm{out}}(g)v)=p(v).
$$

> そのとき $p\circ F$ は入力の $G$ 作用に関して不変である。
<!-- formal-statement-end -->

**証明の見取り図と確認**。等変性で $F(\rho_{\mathrm{in}}(g)x)=\rho_{\mathrm{out}}(g)F(x)$ と変形した後、読み出しの不変性を適用する。

<!-- proof-start -->
### 証明

任意の $g,x$ に対し

$$
\begin{aligned}
(p\circ F)(\rho_{\mathrm{in}}(g)x)
&=p(F(\rho_{\mathrm{in}}(g)x))\\
&=p(\rho_{\mathrm{out}}(g)F(x))\\
&=p(F(x))=(p\circ F)(x).
\end{aligned}
$$

これが不変性の定義そのものである。$\square$
<!-- proof-end -->

**計算例**。$G=C_4$、入力・中間特徴が通常の平面回転型とし、$L(x)=x$、$\sigma(v)=(1+\|v\|^2)v$、$p(v)=\|v\|^2$ を組み合わせると

$$
(p\circ\sigma\circ L)(x)=(1+\|x\|^2)^2\|x\|^2.
$$

回転で長さが変わらないため、入力の四分の一回転にも不変である。$\sigma$ には非線形性があり、$p$ は方向を捨てる。

**保証の範囲**。ここで証明したのは**全群での厳密な関数等式**である。平均する前の関数がどれほどよい近似器か、学習が望む重みを発見するか、群平均が識別に必要な方向情報を捨てないか、訓練分布の外でも予測が正しいかは別問題である。[MFL23 の軌道内情報損失](../MFL23/index.md#prop-mfl23-orbit-loss)により、真の目標が不変でないのに不変化を強制すれば、区別できない入力が生じる。非線形等変性の構成は一般の表現力定理の代わりにはならない。

## 7. 全群平均と不完全な平均を数値で比べる

[`group_average_lab.py`](group_average_lab.py) は $C_2,C_4$ の平面作用について、元関数のスカラー/ベクトル出力を選び、全群または一部の群元で平均した結果と等変残差を比べる決定論的な実験である。

```bash
python textbook/volumes/dream_thater/応用系/MFL/MFL25/group_average_lab.py --self-test
python textbook/volumes/dream_thater/応用系/MFL/MFL25/group_average_lab.py --group C4 --output vector --activation relu
python textbook/volumes/dream_thater/応用系/MFL/MFL25/group_average_lab.py --group C4 --output scalar --average partial
```

最後の例では $G$ 全体でなく $\{e,r\}$ の2元で平均する。すると $g\mapsto gh$ が平均の添字集合を保たず、変換残差は一般にゼロにならない。対照実験では元関数の残差と平均後の残差を同一の入力点・群元について計算し、偶然ゼロになる個別点の値ではなく全テスト点の最大値を比較する。数値上のゼロは丸め誤差の範囲として読み、全実数入力での等変性は上の代数的証明によって保証される。

## 8. 演習――群平均を手で構成し、破れる条件を特定する

<a id="ex-mfl25-a01"></a>

### MFL25-A01 偶関数への不変化

- Level: A
- 問題: $C_2=\{e,s\}$ が $\mathbb R$ に $sx=-x$ と作用し、出力には自明表現を与える。$f(x)=3x^3+2x^2-x+5$ を不変化平均 $Q$ に通せ。$Qf(-x)=Qf(x)$ を式で確認せよ。

<a id="ex-mfl25-a02"></a>

### MFL25-A02 符号型への等変化

- Level: A
- 問題: A01 と同じ入力作用で出力を符号表現 $\rho(s)=-1$ とする。$f(x)=3x^3+2x^2-x+5$ の等変化平均 $Sf$ を求め、$Sf(-x)=-Sf(x)$ を確認せよ。

<a id="ex-mfl25-a03"></a>

### MFL25-A03 重みとバイアスの選別

- Level: A
- 問題: $C_2$ の入力・出力表現をともに $D=\operatorname{diag}(1,-1)$ とし、$A=\begin{pmatrix}1&4\\-2&3\end{pmatrix}$、$b=(2,5)^T$ とする。$\mathcal P(A)$、$\mathcal B(b)$ を求め、$D\mathcal P(A)=\mathcal P(A)D$ と $D\mathcal B(b)=\mathcal B(b)$ を確認せよ。

<a id="ex-mfl25-a04"></a>

### MFL25-A04 活性化関数の相性

- Level: A
- 問題: $C_2$ が二成分を交換する $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ では成分別 ReLU が等変であることを任意の $(u,v)^T$ で示せ。対照として一次元符号型の入力 $t=-2$ に ReLU を適用し、等変性が失敗することを示せ。

<a id="ex-mfl25-b01"></a>

### MFL25-B01 有限集合上の群平均

- Level: B
- 問題: $X=\{0,1,2\}$ に $C_3=\{e,r,r^2\}$ が $rj=j+1\pmod3$ と作用する。$f(0)=1,f(1)=2,f(2)=6$ とする。$Qf$ の全入力値を求め、$Q(Qf)=Qf$ を検証せよ。さらに、単位元と $r$ の2項だけを平均した $Tf(j)=(f(j)+f(rj))/2$ は不変でないことを値で示せ。

<a id="ex-mfl25-b02"></a>

### MFL25-B02 四分の一回転の重み射影

- Level: B
- 問題: $C_4$ の入力・出力を回転型 $\rho(r)=R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とする。$A=\operatorname{diag}(4,0)$、$b=(2,-3)^T$ の $\mathcal P(A)$ と $\mathcal B(b)$ を全4項から計算し、得られるアフィン層が等変であることを確認せよ。

<a id="ex-mfl25-b03"></a>

### MFL25-B03 回転に整合する非線形性

- Level: B
- 問題: $C_4$ の平面回転型に対し $\sigma(v)=(1+\|v\|^2)v$ が等変であることを内積から証明せよ。$v=(1,1)^T$ で成分別 ReLU の両経路を計算し、失敗の機構を説明せよ。

<a id="ex-mfl25-b04"></a>

### MFL25-B04 部分平均が壊す不変性

- Level: B
- 問題: $C_4$ が平面上で $R$ により作用し、$f(x_1,x_2)=x_1$ は実数値である。$T f(x)=(f(x)+f(Rx))/2$ とする。$x=(1,0)^T$ について $Tf(x)$ と $Tf(Rx)$ を求めよ。全4元の平均 $Qf$ も求め、$T$ の証明ではどの添字の付け替えが使えないか説明せよ。

<a id="ex-mfl25-c01"></a>

### MFL25-C01 等変層から不変予測器を設計する

- Level: C
- 問題: $C_4$ が平面上で四分の一回転 $R$ により作用する。入力・中間特徴とも同じ回転型とし、以下を行え。

  1. $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、初期重み $A=\operatorname{diag}(2,0)$、初期バイアス $b=(1,-1)^T$ から、$W=\mathcal P(A)$ と $c=\mathcal B(b)$ を構成せよ。
  2. $\sigma(v)=(1+\|v\|^2)v$、$p(v)=\|v\|^2$ を用い、$F(x)=p(\sigma(Wx+c))$ の全入力での不変性を証明し、$x=(1,1)^T$ で値を検算せよ。
  3. $\sigma$ を成分別 ReLU へ置き換えた $\widetilde F$ が不変でないことを同じ入力とその回転像で示し、どの構成条件が破れたか述べよ。

## 9. 演習の詳細解答

### Level A の解答

<!-- solution-start -->
**MFL25-A01 解答**。[不変化平均](#def-mfl25-invariant-average)で $f(-x)=-3x^3+2x^2+x+5$ を代入する。

$$
Qf(x)=\frac{(3x^3+2x^2-x+5)+(-3x^3+2x^2+x+5)}2=2x^2+5.
$$

$Qf(-x)=2(-x)^2+5=2x^2+5=Qf(x)$。奇数次の項が全て相殺された。

**MFL25-A02 解答**。符号表現の逆元の値は $\rho(s^{-1})=-1$ である。[等変化平均](#def-mfl25-equivariant-average)により

$$
Sf(x)=\frac{f(x)-f(-x)}2=\frac{6x^3-2x}2=3x^3-x.
$$

したがって $Sf(-x)=3(-x)^3-(-x)=-(3x^3-x)$ となり、符号型の等変条件を満たす。偶数次と定数項が相殺される。

**MFL25-A03 解答**。$D^2=I_2$ なので $D^{-1}=D$。$DA D=\begin{pmatrix}1&-4\\2&3\end{pmatrix}$ から

$$
\mathcal P(A)=\frac12(A+DAD)=\begin{pmatrix}1&0\\0&3\end{pmatrix},\quad
\mathcal B(b)=\frac12\left\{\begin{pmatrix}2\\5\end{pmatrix}+\begin{pmatrix}2\\-5\end{pmatrix}\right\}=\begin{pmatrix}2\\0\end{pmatrix}.
$$

両側から $D$ を掛けると $D\mathcal P(A)=\mathcal P(A)D=\operatorname{diag}(1,-3)$。また $D\mathcal B(b)=(2,0)^T$ である。非対角成分は違う符号型を結ぶため消えた。

**MFL25-A04 解答**。任意の $v=(u,v_2)^T$ について $Pv=(v_2,u)^T$ であり、

$$
\sigma(Pv)=(\max(0,v_2),\max(0,u))^T=P\sigma(v).
$$

$e$ では両辺が同じなので全群で成り立つ。一方符号型に $t=-2$ を代入すると、$\sigma(-t)=\sigma(2)=2$、$-\sigma(t)=-\sigma(-2)=0$。符号反転と ReLU は可換でない。
<!-- solution-end -->

### Level B の解答

<!-- solution-start -->
**MFL25-B01 解答**。各 $j$ の軌道は $\{0,1,2\}$ 全体であり、$r$ の冪は各点を一度ずつ巡る。ゆえに

$$
Qf(0)=Qf(1)=Qf(2)=\frac{1+2+6}{3}=3.
$$

定数関数3を再び平均すると $Q(Qf)(j)=(3+3+3)/3=3=Qf(j)$ である。一方 $Tf(0)=(1+2)/2=3/2$、$Tf(1)=(2+6)/2=4$ なので、$Tf(r0)\ne Tf(0)$。二元集合 $\{e,r\}$ は右から $r$ を掛けると $\{r,r^2\}$ になり、元の添字集合に一致しない。

**MFL25-B02 解答**。$R^2=-I_2$ と $R^{-1}=R^3$ を使い、共役の4項は順に

$$
\operatorname{diag}(4,0),\quad\operatorname{diag}(0,4),\quad
\operatorname{diag}(4,0),\quad\operatorname{diag}(0,4).
$$

したがって $W=\mathcal P(A)=\operatorname{diag}(2,2)=2I_2$。$I+R^{-1}+R^{-2}+R^{-3}=0$ より $c=\mathcal B(b)=0$。全 $h=r^k$ で

$$
L(R^kx)=2R^kx=R^k(2x)=R^kL(x).
$$

よって層は等変。入力の異方的な重み $(4,0)$ は平均で等方的な倍率2に変わった。

**MFL25-B03 解答**。$R^TR=I_2$ より $\|Rv\|^2=v^TR^TRv=v^Tv=\|v\|^2$。$R^k$ も直交だから各 $g=r^k$ で

$$
\sigma(R^kv)=(1+\|R^kv\|^2)R^kv
=R^k(1+\|v\|^2)v=R^k\sigma(v).
$$

$v=(1,1)^T$ では $Rv=(-1,1)^T$。成分別 ReLU なら $\operatorname{ReLU}(Rv)=(0,1)^T$、$R\operatorname{ReLU}(v)=(-1,1)^T$。線形層 $W=I_2$ が等変でも、活性化の条件が壊れるため合成の等変性は保証されない。

**MFL25-B04 解答**。$Rx=(-x_2,x_1)^T$、$R^2x=(-x_1,-x_2)^T$、$R^3x=(x_2,-x_1)^T$ である。したがって

$$
Tf(x)=\frac{x_1-x_2}{2},\qquad
Tf(Rx)=\frac{-x_2-x_1}{2}.
$$

$x=(1,0)^T$ を入れると $Tf(x)=1/2$、$Tf(Rx)=-1/2$。全群平均では

$$
Qf(x)=\frac{x_1-x_2-x_1+x_2}{4}=0
$$

となり、全入力で不変である。$\{e,r\}$ を右から $r$ で移した集合は $\{r,r^2\}$ で、元と同じではない。そのため[不変化の証明](#thm-mfl25-invariant-projection)の添字付け替えを部分和に適用できない。
<!-- solution-end -->

### Level C の解答

<!-- solution-start -->
**MFL25-C01 解答**。[重み・バイアス平均](#def-mfl25-linear-average)を用いる。$A=\operatorname{diag}(2,0)$ の共役4項は $\operatorname{diag}(2,0)$ と $\operatorname{diag}(0,2)$ が交互に現れるので

$$
W=\frac14\{2\operatorname{diag}(2,0)+2\operatorname{diag}(0,2)\}=I_2.
$$

$R^2=-I_2$ を使って $I+R+R^2+R^3=0$ なので $c=0$。$W=I_2$ は全 $R^k$ と可換で、$c$ は固定されるから $L(x)=x$ は等変である。

次に $R^TR=I_2$ から $\|Rx\|^2=\|x\|^2$。長さが不変なので、活性化は

$$
\sigma(Rx)=(1+\|x\|^2)Rx=R\sigma(x)
$$

を満たし、同じ理由で $R^k$ にも成立する。[等変層の合成と活性化の十分条件](#thm-mfl25-composition)から $\sigma\circ L$ は等変となる。

さらに $p(R^kv)=\|R^kv\|^2=\|v\|^2$ である。[等変特徴から不変出力への読み出し](#prop-mfl25-invariant-readout)を適用すると $F$ は不変である。実際、任意の $x$ で

$$
F(x)=\|(1+\|x\|^2)x\|^2=(1+\|x\|^2)^2\|x\|^2.
$$

$x=(1,1)^T$ なら $\|x\|^2=2$ で $F(x)=3^2\cdot2=18$、$Rx=(-1,1)^T$ でも同じ18である。

一方、成分別 ReLU に置き換えると $\widetilde F(x)=\|\operatorname{ReLU}(x)\|^2$。同じ二点で

$$
\widetilde F((1,1)^T)=\|(1,1)^T\|^2=2,
\quad\widetilde F((-1,1)^T)=\|(0,1)^T\|^2=1.
$$

よって不変ではない。群平均した重みの条件は満たしているが、ReLU が回転型に整合しないため、[合成定理](#thm-mfl25-composition)の活性化条件を失ったことが原因である。
<!-- solution-end -->

## 10. まとめ――対称性の作り方を次の対象へ持ち込む

有限群の**全元**を平均すると、不変な関数または指定した特徴型へ等変な関数が得られる。行列・バイアスではこの平均が絡作用素と固定ベクトルへの射影になる。ただし、その後の活性化関数は中間表現と可換でなければならない。条件を満たす層は何段合成しても等変で、適切な読み出しから不変予測器を作れる。

次は格子上のデータで、平均を毎回あからさまに計算する代わりに、**重み共有と畳み込み**の形で同じ群作用を実現する方法を考える。
