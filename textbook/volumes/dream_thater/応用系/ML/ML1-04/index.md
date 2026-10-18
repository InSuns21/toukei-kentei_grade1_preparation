# ML1-04 最小二乗法・正規方程式・非一意性

<!-- definition-example-audit: strict -->

## 1. 訓練誤差の最小化を、具体的な係数の計算にする

[前講の経験リスク最小化](../ML1-03/index.md#def-ml1-03-erm)では、予測器を候補集合から選んだ。今度は予測器を数値パラメータで表そう。たとえば、入力 $x$ から $\beta_0+\beta_1x$ を予測する直線なら、学習すべき未知数は切片と傾きである。各点での予測と観測との差を二乗して足せば、誤差の正負が相殺されない。

しかし、誤差の二乗和を小さくするという方針だけでは、係数をどう求めるか、計算した係数が本当に最小か、同じ予測をする係数が複数ないかが分からない。特に説明変数の列が重複すると、係数を別々に決定できなくなる。

この章では、実数の有限標本を固定して、行列による計算から最小二乗解の存在・最適性・一意性を調べる。標本の独立同分布性や雑音の正規性は仮定しない。ここでの結論は**観測されたデータを固定した最適化の定理**であり、推定量の統計的性質とは区別する。

使う線形代数は、[実行列の特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)、[階数と非零特異値の関係](../../../基礎科目/F0/F0-00F2/index.md#prop-f0-00f2-rank-singular-values)、および[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)である。以下の行列はすべて有限次元実行列とする。

## 2. 設計行列と平方損失

$n\ge1$ 個の観測を $(x_i,y_i)$ とし、$y_i\in\mathbb R$、各 $x_i$ からあらかじめ作った特徴ベクトルを $\phi(x_i)=(\phi_1(x_i),\ldots,\phi_p(x_i))^{\mathsf T}\in\mathbb R^p$ とする。ここで $p\ge1$、特徴量を選ぶ操作は固定済みとする。係数 $\beta=(\beta_1,\ldots,\beta_p)^{\mathsf T}$ に対する予測は $\phi(x_i)^{\mathsf T}\beta$ である。

行番号に観測、列番号に特徴量を並べると、$n\times p$ 行列 $X$ の第 $i$ 行が $\phi(x_i)^{\mathsf T}$ になる。$y=(y_1,\ldots,y_n)^{\mathsf T}$ とすれば、全予測をひとまとめにしたベクトルは $X\beta\in\mathbb R^n$。切片を学習する場合は特徴の一つを常に1にする。

<a id="def-ml1-04-design-matrix"></a>

<!-- formal-statement-start -->
> **定義（設計行列と線形予測）**  
> $n,p\ge1$、特徴写像 $\phi:\mathcal X\to\mathbb R^p$、固定標本 $(x_i,y_i)_{i=1}^n$（$y_i\in\mathbb R$）を与える。設計行列 $X\in\mathbb R^{n\times p}$ と応答ベクトル $y\in\mathbb R^n$ を

$$
X_{ij}=\phi_j(x_i),\qquad
y=(y_1,\ldots,y_n)^{\mathsf T}
$$

> と定義する。係数 $\beta\in\mathbb R^p$ による線形予測ベクトルを $X\beta$ とする。これは特徴量に関して非線形な写像 $\phi$ に対しても、係数 $\beta$ に関して線形である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-04-design-matrix -->
**定義の確認**。入力 $x=0,1,2$ の3観測で $\phi(x)=(1,x)^{\mathsf T}$、$y=(1,2,2)^{\mathsf T}$ とする。特徴の第1成分が1、第2成分が入力なので

$$
X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},\qquad
X\begin{pmatrix}a\\b\end{pmatrix}
=\begin{pmatrix}a\\a+b\\a+2b\end{pmatrix}.
$$

確かに $X$ は $3\times2$、$\beta$ は $2\times1$、予測は $3\times1$ である。$a$ が切片、$b$ が傾きに対応する。
<!-- definition-example-end -->

[経験リスク](../ML1-01/index.md#def-ml1-01-risks)で損失を $(\widehat y-y)^2$ とすれば二乗誤差の平均になる。以下では微分を簡単にするため、その半分を目的関数に採用する。正の定数 $1/2$ は最小点を変えない。

<a id="def-ml1-04-least-squares"></a>

<!-- formal-statement-start -->
> **定義（最小二乗問題）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$n,p\ge1$ を固定する。平方残差目的

$$
L(\beta)=\frac1{2n}\|X\beta-y\|_2^2
=\frac1{2n}\sum_{i=1}^n\left(\sum_{j=1}^pX_{ij}\beta_j-y_i\right)^2
$$

> を $\beta\in\mathbb R^p$ 上で最小化することを最小二乗法という。最小値を達成する $\widehat\beta$ を最小二乗解と呼ぶ。残差ベクトルを $r=y-X\widehat\beta$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-04-least-squares -->
**定義の確認**。上の直線模型で $\beta=(1,1/2)^{\mathsf T}$ を選ぶと $X\beta=(1,3/2,2)^{\mathsf T}$、残差は $(0,1/2,0)^{\mathsf T}$ なので

$$
L(\beta)=\frac1{2\cdot3}\left(0^2+(1/2)^2+0^2\right)=\frac1{24}.
$$

三つの観測が固定されているので、この値に独立性や確率分布は関与しない。定義の残差 $r$ は $y-X\widehat\beta$ であるが、目的に現れる $X\beta-y$ はその符号を反転したものである。二乗のため値は変わらない。
<!-- definition-example-end -->

最小二乗法は通常の[正則化付きERM](../ML1-03/index.md#def-ml1-03-regularized-erm)で $\lambda=0$ とした場合に当たるが、候補空間は有限集合ではなく $\mathbb R^p$ である。したがって前講の「候補が有限だから最小値がある」という議論は使えない。

## 3. 微分から正規方程式を導く

各成分について偏微分する。係数 $\beta_j$ は第 $i$ 行の予測に $X_{ij}\beta_j$ の形で入っているので、和の連鎖律により

$$
\begin{aligned}
\frac{\partial L}{\partial\beta_j}
&=\frac1{2n}\sum_{i=1}^n
2\left(\sum_{k=1}^pX_{ik}\beta_k-y_i\right)X_{ij}\\
&=\frac1n\sum_{i=1}^nX_{ij}(X\beta-y)_i\\
&=\frac1n\bigl[X^{\mathsf T}(X\beta-y)\bigr]_j.
\end{aligned}
$$

したがって各 $j$ に対して勾配の成分は最後の有限和である。$X^{\mathsf T}$ は $p\times n$、$X\beta-y$ は $n\times1$ で、勾配は $p\times1$ である。

<a id="thm-ml1-04-normal-equations"></a>

<!-- formal-statement-start -->
> **定理（正規方程式と最小二乗最適性）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$n,p\ge1$ とし、$L(\beta)=\|X\beta-y\|_2^2/(2n)$ とする。$\widehat\beta\in\mathbb R^p$ が最小二乗解であることと、次の正規方程式を満たすことは同値である。

$$
X^{\mathsf T}X\widehat\beta=X^{\mathsf T}y.
$$

> 正規方程式の解が存在することは次節で証明する。
<!-- formal-statement-end -->

### 証明の見取り図

必要条件は偏微分が0になることから得る。十分条件は、正規方程式を満たす候補 $\widehat\beta$ からずれ $h$ だけ移動したとき、交差項が消えて二乗だけ増えることから示せる。したがって停留条件を満たすだけで大域的最小になる。

<!-- proof-start -->
### 証明

$L$ は $\mathbb R^p$ 上で微分可能で、上の各偏微分をまとめると

$$
\nabla L(\beta)=\frac1nX^{\mathsf T}(X\beta-y).
$$

$\widehat\beta$ が最小点なら、任意の座標方向 $e_j$ に沿う関数 $t\mapsto L(\widehat\beta+te_j)$ は $t=0$ に局所最小値を持つ。一次元の微分の必要条件より各偏微分が0である。ゆえに $\nabla L(\widehat\beta)=0$、すなわち正規方程式が成り立つ。

逆に $X^{\mathsf T}(X\widehat\beta-y)=0$ とする。任意の $h\in\mathbb R^p$ に対して平方を展開すると

$$
\begin{aligned}
2nL(\widehat\beta+h)
&=\|X\widehat\beta-y+Xh\|_2^2\\
&=\|X\widehat\beta-y\|_2^2
+2(Xh)^{\mathsf T}(X\widehat\beta-y)+\|Xh\|_2^2\\
&=\|X\widehat\beta-y\|_2^2
+2h^{\mathsf T}X^{\mathsf T}(X\widehat\beta-y)+\|Xh\|_2^2\\
&=2nL(\widehat\beta)+\|Xh\|_2^2.
\end{aligned}
$$

第3行の $h^{\mathsf T}X^{\mathsf T}$ は行列積の転置公式 $(Xh)^{\mathsf T}=h^{\mathsf T}X^{\mathsf T}$ による。正規方程式で交差項は0、最後の二乗は非負なので $L(\widehat\beta+h)\ge L(\widehat\beta)$。$h$ は任意だから大域的最小である。$\square$
<!-- proof-end -->

この等式は、最小点のまわりで目的関数がどう変わるかも教える。$\|Xh\|_2^2>0$ なら厳密に増えるが、$Xh=0$ の方向では目的関数は全く変わらない。この「見えない方向」が非一意性の原因になる。

## 4. フルランクなら係数を一つに決められる

$X$ の列が線形独立であるとは、$Xh=0$ となる係数の組が $h=0$ に限ることだ。一般の $n\times p$ 行列では、この条件は $p\le n$ を必要とする。「観測数が係数数以上」だけでは不十分で、列の独立性まで必要である。

<a id="thm-ml1-04-full-rank-solution"></a>

<!-- formal-statement-start -->
> **定理（列フルランク最小二乗解）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ とし、$\operatorname{rank}X=p$ を仮定する。このとき $X^{\mathsf T}X$ は可逆で、最小二乗解はただ一つ存在し、

$$
\widehat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y
$$

> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

$X^{\mathsf T}X$ の二次形式は $\|Xh\|^2$ そのものである。列独立なら $h\ne0$ に対して正となり、核が0になるから逆行列が存在する。逆行列で正規方程式を解き、前節の同値性で最小性を確かめる。

<!-- proof-start -->
### 証明

$G=X^{\mathsf T}X$ は $p\times p$ の実対称行列であり、任意の $h\in\mathbb R^p$ について

$$
h^{\mathsf T}Gh=h^{\mathsf T}X^{\mathsf T}Xh=(Xh)^{\mathsf T}(Xh)=\|Xh\|_2^2.
$$

$\operatorname{rank}X=p$ なら $Xh=0$ から $h=0$ が従うため、$h\ne0$ では右辺が正になる。もし $Gh=0$ なら $0=h^{\mathsf T}Gh=\|Xh\|_2^2$ だから $h=0$。したがって正方行列 $G$ の核は0であり、有限次元の可逆性判定により逆行列を持つ。

正規方程式 $G\beta=X^{\mathsf T}y$ は $\widehat\beta=G^{-1}X^{\mathsf T}y$ をただ一つの解として持つ。[正規方程式と最適性](#thm-ml1-04-normal-equations)から、これがただ一つの最小二乗解である。$\square$
<!-- proof-end -->

**数値で確認**。第2節の3点では

$$
X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad X^{\mathsf T}y=\begin{pmatrix}5\\6\end{pmatrix}.
$$

二列 $(1,1,1)^{\mathsf T}$ と $(0,1,2)^{\mathsf T}$ は独立で、$\det(X^{\mathsf T}X)=15-9=6\ne0$。連立方程式 $3a+3b=5,\ 3a+5b=6$ の差を取ると $2b=1$、したがって $b=1/2$、$a=(5-3/2)/3=7/6$ である。予測と残差は

$$
X\widehat\beta=
\begin{pmatrix}7/6\\5/3\\13/6\end{pmatrix},\qquad
r=y-X\widehat\beta=
\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}.
$$

検算すると $X^{\mathsf T}r=(-1/6+1/3-1/6,\ 1/3-2/6)^{\mathsf T}=0$。$r$ が説明変数の各列に直交するという意味は、次節で整理する。

実装で上の逆行列の式をそのまま計算することと、数学的な解の公式を知っていることは別である。$X^{\mathsf T}X$ は条件が悪くなりやすいため、数値実装ではQR分解や特異値分解に基づく計算を優先する。

## 5. 階数が落ちても、最小点は存在する

列が重複すれば $X^{\mathsf T}X$ は特異になるので、前節の逆行列の式は使えない。だが、「逆行列がない」と「最小値がない」は全く異なる。実際、$X$ が作れる予測ベクトルの集合は $\mathbb R^n$ の部分空間であり、$y$ をその空間の最も近い点へ移すことはできる。

この近い点への移動を直交射影と考えよう。$X$ の列空間とは全ての $X\beta$ の集合 $\operatorname{Im}X$ であり、残差が全ての列に直交するとき、これ以上予測を列空間内で動かしても二乗距離を縮められない。

<a id="thm-ml1-04-existence-fit-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（最小二乗解の存在と適合値の一意性）**  
> 任意の $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$（$n,p\ge1$）に対して最小二乗解は少なくとも一つ存在する。どの最小二乗解 $\widehat\beta$ に対しても、適合値 $X\widehat\beta$ と残差 $r=y-X\widehat\beta$ は一意に定まる。さらに

$$
X^{\mathsf T}r=0
$$

> が成り立ち、適合値は $y$ の列空間 $\operatorname{Im}X$ への直交射影である。
<!-- formal-statement-end -->

### 証明の見取り図

[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)で、$X$ を「入力側の座標変更・方向別の伸縮・出力側の座標変更」に分ける。非零特異値に対応する方向では最適な係数を割り算で決められ、零特異値の方向は予測に全く影響しない。こうして一つ解を構成する。適合値の一意性は、二つの最小点の差が $X$ の核に入ることから従う。

<!-- proof-start -->
### 証明

$X$ の階数を $q$ とし、[実特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)を $X=U\Sigma V^{\mathsf T}$ と取る。$U\in\mathbb R^{n\times n}$、$V\in\mathbb R^{p\times p}$ は直交行列、$\Sigma\in\mathbb R^{n\times p}$ の対角に正の値 $s_1,\ldots,s_q$ があり、残りは0である。$c=U^{\mathsf T}y$、$b=V^{\mathsf T}\beta$ と置くと、直交行列は長さを保つので

$$
\begin{aligned}
\|X\beta-y\|_2^2
&=\|U\Sigma V^{\mathsf T}\beta-y\|_2^2\\
&=\|\Sigma b-U^{\mathsf T}y\|_2^2\\
&=\sum_{j=1}^{q}(s_jb_j-c_j)^2+\sum_{j=q+1}^{n}c_j^2.
\end{aligned}
$$

各 $1\le j\le q$ に対して $b_j=c_j/s_j$ とすれば最初の和は0になる。$q< p$ の余剰座標は任意に選べる。例えば $b_{q+1}=\cdots=b_p=0$ とすれば $\beta=Vb$ が定義でき、目的値は $\sum_{j=q+1}^n c_j^2/(2n)$ となる。したがって最小解が存在する。$q=0$ の場合も $\beta=0$ で同じ主張が成り立つ。

任意の最小解は[正規方程式](#thm-ml1-04-normal-equations)を満たすので、$X^{\mathsf T}(y-X\widehat\beta)=0$。また二つの最小解 $\widehat\beta_1,\widehat\beta_2$ について、前節の二乗差恒等式を $\widehat\beta=\widehat\beta_1,\ h=\widehat\beta_2-\widehat\beta_1$ に使うと

$$
0=L(\widehat\beta_2)-L(\widehat\beta_1)
=\frac1{2n}\|X(\widehat\beta_2-\widehat\beta_1)\|_2^2.
$$

よって $X\widehat\beta_2=X\widehat\beta_1$。適合値と残差は一意である。

適合値 $z=X\widehat\beta$ は列空間の元であり、任意の $w=Xh$ との内積は $r^{\mathsf T}w=r^{\mathsf T}Xh=(X^{\mathsf T}r)^{\mathsf T}h=0$。任意の $w\in\operatorname{Im}X$ について

$$
\|y-(z+w)\|_2^2=\|r-w\|_2^2
=\|r\|_2^2+\|w\|_2^2\ge\|r\|_2^2
$$

である。したがって $z$ は $y$ から列空間への唯一の最近点、すなわち直交射影である。$\square$
<!-- proof-end -->

**ここが重要**。最小二乗法の出力を「係数」と見るか「訓練点上の予測」と見るかで一意性の結論が異なる。係数が一意でなくても、学習標本上の予測は一意である。ただし未観測の入力での予測まで一意とは限らない。異なる係数の差が訓練行列の核にあっても、新しい特徴ベクトルとの内積が0とは限らないためである。

## 6. 解集合と最小ノルム解

適合値が決まっても、それを作る係数は多数あるかもしれない。最小ノルム解は、その中から係数のEuclidノルムが最も小さい一つを選ぶ規則である。これは追加の選択基準であって、母集団リスクが最小になるという主張ではない。

<a id="thm-ml1-04-solution-set-minimum-norm"></a>

<!-- formal-statement-start -->
> **定理（解集合と最小ノルム解）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$n,p\ge1$ とし、$\beta_0$ を一つの最小二乗解とする。最小二乗解全体は

$$
\mathcal M=\beta_0+\ker X
=\{\beta_0+v:v\in\mathbb R^p,\ Xv=0\}
$$

> である。その中で $\|\beta\|_2$ を最小化する係数 $\beta^\dagger$ は一意に存在する。$X=U\Sigma V^{\mathsf T}$、正の特異値 $s_1,\ldots,s_q$ と $c=U^{\mathsf T}y$ を用いれば

$$
\beta^\dagger=V
\begin{pmatrix}
c_1/s_1\\ \vdots\\ c_q/s_q\\0\\ \vdots\\0
\end{pmatrix}.
$$

> これは $X$ のMoore–Penrose擬似逆を $X^\dagger=V\Sigma^\dagger U^{\mathsf T}$ と置いたときの $X^\dagger y$ に等しい。$\Sigma^\dagger\in\mathbb R^{p\times n}$ は非零特異値だけを逆数にした行列である。
<!-- formal-statement-end -->

### 証明の見取り図

どの最小解も同じ適合値を生むので、差は核の元になる。特異値分解の入力側座標 $b$ では、正の特異値の座標は固定され、零の方向だけが自由である。長さの二乗は座標の二乗和だから、自由成分をすべて0にした係数が唯一最小になる。

<!-- proof-start -->
### 証明

前節の[適合値の一意性](#thm-ml1-04-existence-fit-uniqueness)から、任意の最小解 $\beta$ には $X\beta=X\beta_0$ が成り立つ。したがって $X(\beta-\beta_0)=0$、つまり $\beta-\beta_0\in\ker X$。逆に $v\in\ker X$ なら $X(\beta_0+v)=X\beta_0$ なので同じ最小値を取る。これで解集合を尽くした。

前節のSVD表示では、最小解であるために $b_j=c_j/s_j$（$1\le j\le q$）が必要で十分である。直交行列 $V$ は長さを保存するので

$$
\|\beta\|_2^2=\|b\|_2^2
=\sum_{j=1}^q\frac{c_j^2}{s_j^2}
+\sum_{j=q+1}^{p}b_j^2.
$$

第1項は全最小二乗解に共通で、第2項は非負である。第2項が0となる必要十分条件は $b_{q+1}=\cdots=b_p=0$ だから、最小ノルム解が一意に存在する。擬似逆の定義から $V\Sigma^\dagger U^{\mathsf T}y$ はまさにこの座標を持つ。$\square$
<!-- proof-end -->

ここで $\beta^\dagger$ と書いた上付き記号は転置ではなく、最小ノルム解・擬似逆を示す記号である。$X$ が列フルランクなら自由な方向はなく、前節の逆行列による解と一致する。一方、$X$ が零行列なら、どの係数も同じ予測0を返すが、最小ノルム解は0ベクトルだけである。

## 7. 重複する特徴量で何が起きるか

列が互いに同じ $X=\begin{pmatrix}1&1\\2&2\end{pmatrix}$、応答 $y=(1,3)^{\mathsf T}$ を考える。この模型では予測は $\beta_1+\beta_2=t$ だけに依存する。したがって二変数の最小化は一変数の

$$
2nL(\beta)=(t-1)^2+(2t-3)^2
=5t^2-14t+10
=5\left(t-\frac75\right)^2+\frac15
$$

に帰着する。$n=2$ だから最小値は $L_{\min}=(1/5)/4=1/20$、最小解全体は

$$
\mathcal M=\left\{(\beta_1,\beta_2)^{\mathsf T}:
\beta_1+\beta_2=\frac75\right\}.
$$

この集合は一本の直線であり、例えば $(7/5,0)^{\mathsf T}$ と $(0,7/5)^{\mathsf T}$ は異なる最小解である。しかし適合値は常に $(7/5,14/5)^{\mathsf T}$、残差は $(-2/5,1/5)^{\mathsf T}$ と一意になる。実際 $X^{\mathsf T}r=(0,0)^{\mathsf T}$ である。

最小ノルムを直接確認するには $t$ を固定して $\beta_2=t-\beta_1$ と代入する。

$$
\beta_1^2+\beta_2^2
=\beta_1^2+(t-\beta_1)^2
=2\left(\beta_1-\frac t2\right)^2+\frac{t^2}{2}.
$$

したがって $t=7/5$ で自由な二係数を等分した

$$
\beta^\dagger=\begin{pmatrix}7/10\\7/10\end{pmatrix}
$$

だけが最小ノルム解になる。この結論は[解集合と最小ノルム解の定理](#thm-ml1-04-solution-set-minimum-norm)とも一致する。係数を表示する際にどの選択規則を使ったかを明示しないと、同じデータから違う係数を返す実装同士を誤って比較してしまう。

階数欠損は「変数が多すぎる場合」だけではない。ここでは $n=p=2$ なのに二列が従属している。一方、観測数より特徴量数が多い $p>n$ では、列フルランクは不可能なので、必ず何らかの係数の自由度が残る。

## 8. 数値実験：階数・外れ値・係数の自由度

固定標本に対する式の証明と、数値計算を区別して確かめる。以下の[最小二乗・階数の対話ラボ](../../../../../../simulation/ml1-04.html)では、3点の座標を動かして切片と傾きを当てはめ、列を重複させて階数を落とせる。入力が変わるたびに $X^{\mathsf T}X$、最小ノルム係数、残差、$X^{\mathsf T}r$ を実計算する。描画上の線は計算された予測関数であり、記録動画ではない。

まず通常の3点 $x=(-1,0,1)$、$y=(-1,0,1)$ を試す。切片を含む2列の設計行列は階数2で、最小ノルム係数は $(0,1)^{\mathsf T}$、残差は0。最後の $y$ だけを4にすれば、計算上の切片と傾きはそれぞれ $1$ と $5/2$ となり、外れ値が最小二乗直線を引っ張る。

次に特徴量を $[x_i,x_i]$ に切り替える。二列が常に同じなので階数は最大1、$\beta_1-\beta_2$ 方向の変化を観測データが区別できない。係数の和が一定でも予測が同じであることと、最小ノルムを採用すると二係数が等しくなることを確認する。ラボは小規模な実対称 $2\times2$ Gram 行列の固有分解を使い、階数判定には浮動小数点の閾値を設けている。閾値近傍での判定は厳密な階数の証明ではない。

必要なら下のPython計算ラボでも、SVDから構成した解の残差を独立に検算できる。固定された小さなデータを入力とし、目的関数・階数・非一意性を区別する。

~~~python-lab
# lab-id: ml1-04-least-squares
# lab-title: 最小二乗と最小ノルムをSVDで検証
# lab-mode: exercise
# timeout-ms: 10000
import numpy as np
X = np.array([[1., 1.], [2., 2.]])
y = np.array([1., 3.])
U, s, VT = np.linalg.svd(X, full_matrices=True)
q = np.linalg.matrix_rank(X)
# ヒント: 非零特異値方向では (U.T @ y)[j] / s[j]
b = np.zeros(X.shape[1])
for j in range(q):
    b[j] = ___
beta = VT.T @ b
residual = y - X @ beta
print("rank", q, "beta", beta, "fitted", X @ beta)
print("orthogonality", X.T @ residual, "loss", residual @ residual / (2 * len(y)))
~~~

~~~python-solution
import numpy as np
X = np.array([[1., 1.], [2., 2.]])
y = np.array([1., 3.])
U, s, VT = np.linalg.svd(X, full_matrices=True)
q = np.linalg.matrix_rank(X)
b = np.zeros(X.shape[1])
for j in range(q):
    b[j] = (U.T @ y)[j] / s[j]
beta = VT.T @ b
residual = y - X @ beta
print("rank", q, "beta", beta, "fitted", X @ beta)
print("orthogonality", X.T @ residual, "loss", residual @ residual / (2 * len(y)))
~~~

~~~python-test
assert q == 1
assert np.allclose(beta, [0.7, 0.7])
assert np.allclose(X @ beta, [1.4, 2.8])
assert np.allclose(X.T @ residual, np.zeros(2), atol=1e-10)
assert np.isclose(residual @ residual / (2 * len(y)), 0.05)
~~~

## 演習

### ML1-04-A01 設計行列と予測の次元
- Level: A
- 目安時間: 10分

3個の入力 $x=(-1,0,2)$、特徴 $\phi(x)=(1,x)^{\mathsf T}$、応答 $y=(0,1,3)^{\mathsf T}$ を用いる。$X$ と $X(1,2)^{\mathsf T}$ を書き、$X$、$\beta$、予測の次元を答えよ。

<!-- solution-start -->
#### 詳細解答

[設計行列の定義](#def-ml1-04-design-matrix)により各行は $(1,x_i)$ なので

$$
X=\begin{pmatrix}1&-1\\1&0\\1&2\end{pmatrix}.
$$

$X$ は $3\times2$、係数 $(1,2)^{\mathsf T}$ は $2\times1$、積は $3\times1$ である。行ごとに計算すれば

$$
X\begin{pmatrix}1\\2\end{pmatrix}
=\begin{pmatrix}1-2\\1+0\\1+4\end{pmatrix}
=\begin{pmatrix}-1\\1\\5\end{pmatrix}.
$$

応答 $y$ と同じ3次元なので残差と二乗損失が定義できる。
<!-- solution-end -->

### ML1-04-A02 平方損失を計算する
- Level: A
- 目安時間: 10分

$X=\begin{pmatrix}1&0\\1&1\end{pmatrix}$、$y=(1,3)^{\mathsf T}$、$\beta=(1,1)^{\mathsf T}$ とする。残差 $r=y-X\beta$、平方残差目的 $L(\beta)$、勾配 $\nabla L(\beta)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$X\beta=(1,2)^{\mathsf T}$ なので $r=(0,1)^{\mathsf T}$。したがって

$$
L(\beta)=\frac{0^2+1^2}{2\cdot2}=\frac14.
$$

[勾配公式](#thm-ml1-04-normal-equations)の導出を使うと

$$
\nabla L(\beta)=\frac12X^{\mathsf T}(X\beta-y)
=\frac12\begin{pmatrix}1&1\\0&1\end{pmatrix}
\begin{pmatrix}0\\-1\end{pmatrix}
=\begin{pmatrix}-1/2\\-1/2\end{pmatrix}.
$$

勾配が0でないため、この係数は最小二乗解ではない。
<!-- solution-end -->

### ML1-04-A03 列フルランクの検査
- Level: A
- 目安時間: 10分

$X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$ で $Xh=0$ の解が0だけであることを示し、$X^{\mathsf T}X$ の行列式と逆行列が存在するかを判定せよ。

<!-- solution-start -->
#### 詳細解答

$h=(a,b)^{\mathsf T}$ と置くと $Xh=(a,a+b,a+2b)^{\mathsf T}$。第1成分が0なら $a=0$、第2成分も0なら $b=0$ なので列は独立である。計算すると

$$
X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad \det(X^{\mathsf T}X)=3\cdot5-3\cdot3=6.
$$

6は0でないから可逆である。[列フルランク解の定理](#thm-ml1-04-full-rank-solution)の仮定も満たす。
<!-- solution-end -->

### ML1-04-A04 残差の直交性
- Level: A
- 目安時間: 10分

$X=(1,2)^{\mathsf T}$、$y=(2,1)^{\mathsf T}$ とし、係数が一つの模型 $X\beta$ を最小二乗で当てはめる。正規方程式から $\widehat\beta$、適合値、残差を求め、$X^{\mathsf T}r=0$ を検算せよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=1^2+2^2=5$、$X^{\mathsf T}y=1\cdot2+2\cdot1=4$ なので正規方程式は $5\widehat\beta=4$、すなわち $\widehat\beta=4/5$。適合値と残差は

$$
X\widehat\beta=\begin{pmatrix}4/5\\8/5\end{pmatrix},
\quad r=y-X\widehat\beta=\begin{pmatrix}6/5\\-3/5\end{pmatrix}.
$$

よって

$$
X^{\mathsf T}r=1\cdot\frac65+2\left(-\frac35\right)=0.
$$

これは[適合値の一意性と射影の定理](#thm-ml1-04-existence-fit-uniqueness)の直交条件である。
<!-- solution-end -->

### ML1-04-B01 正規方程式と平方の差
- Level: B
- 目安時間: 20分

$L(\beta)=\|X\beta-y\|^2/(2n)$ で、$X^{\mathsf T}X\widehat\beta=X^{\mathsf T}y$ と仮定する。任意の $h$ について $L(\widehat\beta+h)-L(\widehat\beta)$ を導出し、零になる方向を必要十分条件で示せ。

<!-- solution-start -->
#### 詳細解答

差を取るため $\widehat r=X\widehat\beta-y$ とおくと

$$
\begin{aligned}
2n[L(\widehat\beta+h)-L(\widehat\beta)]
&=\|\widehat r+Xh\|^2-\|\widehat r\|^2\\
&=2\widehat r^{\mathsf T}Xh+\|Xh\|^2\\
&=2(X^{\mathsf T}\widehat r)^{\mathsf T}h+\|Xh\|^2\\
&=\|Xh\|^2.
\end{aligned}
$$

最後の等式は正規方程式が $X^{\mathsf T}\widehat r=0$ と同値だからである。分母 $2n>0$ なので差は非負であり、0になる必要十分条件は $\|Xh\|^2=0$、すなわち $Xh=0$、または $h\in\ker X$ である。
<!-- solution-end -->

### ML1-04-B02 ランク欠損の全解集合
- Level: B
- 目安時間: 20分

$X=\begin{pmatrix}1&1\\2&2\end{pmatrix}$、$y=(1,3)^{\mathsf T}$ とする。最小二乗解全体、唯一の適合値、残差、最小ノルム解を求め、ノルム最小性を平方完成で証明せよ。

<!-- solution-start -->
#### 詳細解答

$t=\beta_1+\beta_2$ と置くと

$$
\|X\beta-y\|^2=(t-1)^2+(2t-3)^2
=5\left(t-\frac75\right)^2+\frac15.
$$

したがって $\beta_1+\beta_2=7/5$ の任意の係数が最小二乗解である。適合値は $(7/5,14/5)^{\mathsf T}$、残差は $(-2/5,1/5)^{\mathsf T}$。$t=7/5$ を固定すると

$$
\|\beta\|^2
=\beta_1^2+(t-\beta_1)^2
=2(\beta_1-t/2)^2+t^2/2.
$$

これは $\beta_1=t/2=7/10$ の場合にのみ最小となり、そのとき $\beta_2=t-\beta_1=7/10$。よって最小ノルム解は $(7/10,7/10)^{\mathsf T}$ である。
<!-- solution-end -->

### ML1-04-B03 訓練点だけで同じ予測をする
- Level: B
- 目安時間: 20分

標本点が $x=0,1$、特徴が $\phi(x)=(1,x,x^2)^{\mathsf T}$ とする。$\beta=(0,1,0)^{\mathsf T}$ と $\widetilde\beta=(0,0,1)^{\mathsf T}$ は訓練点で同じ予測をするか。新しい点 $x=2$ でどうなるか。係数を一意に定めないことの具体的な問題を述べよ。

<!-- solution-start -->
#### 詳細解答

設計行列と差は

$$
X=\begin{pmatrix}1&0&0\\1&1&1\end{pmatrix},
\qquad \widetilde\beta-\beta=\begin{pmatrix}0\\-1\\1\end{pmatrix}.
$$

差に $X$ を掛けると $(0,-1+1)^{\mathsf T}=(0,0)^{\mathsf T}$ で、二係数は訓練点上で同じ適合値 $(0,1)^{\mathsf T}$ を持つ。だが $x=2$ ではそれぞれ $2$ と $2^2=4$ を予測する。このように $\ker X$ の方向は訓練損失を変えない一方、未観測の入力では違う値を作り得る。係数の非一意性は単なる表示上の問題とは限らず、標本外予測に影響する。
<!-- solution-end -->

### ML1-04-C01 SVDから全解を再構成する
- Level: C
- 目安時間: 30分

実行列 $X\in\mathbb R^{n\times p}$ と応答 $y\in\mathbb R^n$ に対し、階数 $q$、特異値分解 $X=U\Sigma V^{\mathsf T}$（正の特異値 $s_1,\ldots,s_q$）を与える。

1. $b=V^{\mathsf T}\beta$、$c=U^{\mathsf T}y$ と置き、最小二乗目的を成分ごとに展開せよ。
2. 正規方程式を満たす全ての $\beta$ を $b$ の条件で記述し、最小損失を導出せよ。
3. 全解が同じ適合値を持つこと、最小ノルム解の一意性を証明せよ。
4. $X=0$ の場合にも式が有効か、また $\operatorname{rank}X=p$ の場合の逆行列公式とどう対応するか述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $U,V$ は直交行列なのでノルムを保ち、$U^{\mathsf T}X\beta=\Sigma b$ が成り立つ。$\Sigma b$ の第 $j$ 成分は $j\le q$ なら $s_jb_j$、$j>q$ なら0である。したがって

$$
2nL(\beta)
=\|\Sigma b-c\|^2
=\sum_{j=1}^q(s_jb_j-c_j)^2
+\sum_{j=q+1}^n c_j^2.
$$

**2.** 最初の和の各項は非負で、$b_j=c_j/s_j$（$j\le q$）とすれば全て0にできる。$j>q$ の $b_j$ は目的に現れないから任意でよい。最小損失は $\sum_{j=q+1}^{n}c_j^2/(2n)$。この条件の係数は最小値を達成するため[正規方程式と最適性](#thm-ml1-04-normal-equations)から正規方程式の全解でもある。

**3.** 全解では $\Sigma b=(c_1,\ldots,c_q,0,\ldots,0)^{\mathsf T}$ が共通なので、適合値 $X\beta=U\Sigma b$ も同じ。ノルムは

$$
\|\beta\|^2=\|b\|^2
=\sum_{j=1}^{q}(c_j/s_j)^2+\sum_{j=q+1}^{p}b_j^2.
$$

前半は固定、後半は自由成分の平方和。後半が0となるには全自由成分が0でなければならず、その選択は一意である。

**4.** $X=0$ なら $q=0$ なので全ての $\beta$ が最小解となり、最小損失は $\|y\|^2/(2n)$。最小ノルム解は $\beta=0$。一方 $q=p$ なら自由成分はなく、係数は一意である。この場合 $X^{\mathsf T}X$ が可逆となり、[フルランクの公式](#thm-ml1-04-full-rank-solution)に一致する。行列の階数が落ちたときだけ、逆行列を無理に作らずSVDで零方向を分離する。
<!-- solution-end -->

---

## 次に進む

正規方程式は最小二乗の最適性を表すが、逆行列公式が使えるのは列フルランクの場合だけだと分かった。階数が落ちても予測ベクトルは一意に決まり、最小ノルム解という係数の選択もできる。

次のML1-05では、目的に係数の二乗ペナルティを加えるRidge回帰を学ぶ。特に $\lambda>0$ が係数の非一意性をどう変えるか、縮小によって標本上の予測と統計的な誤差がどう変わるかを区別する。
