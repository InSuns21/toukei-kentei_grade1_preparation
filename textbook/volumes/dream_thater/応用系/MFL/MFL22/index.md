# MFL22 幾何的帰納バイアスと不変・等変

<!-- definition-example-audit: strict -->

## 1. 同じ対象を回したとき、答えはどうなるべきか

これまでは有限点群から接線・距離・グラフなどを推定し、観測ノイズと幾何の取り違えを調べた。ここからは、**入力を変換したとき予測がどう変わるべきか**を考える。画像を四分の一回転しても物体の分類は同じかもしれない。一方、その物体の向きを表す矢印は画像と一緒に回らなければならない。

前者の「答えを動かさない」を**不変性**、後者の「定めた規則どおり答えを動かす」を**等変性**という。同一の入力変換でも、何を予測するかによって必要な性質は変わる。[ML1-01の予測器と仮説クラス](../../ML/ML1-01/index.md#def-ml1-01-predictor)の候補を、こうした変換規則と両立するものへ制限する発想が本章の出発点になる。

一般の群作用と表現論はMFL23・MFL24で扱う。本章では具体的な有限回転・反射・二要素の順序交換だけを用い、予測を二つの順序で計算して突き合わせる。

## 2. 入力と出力の変換を別々に指定する

平面の列ベクトル $x=(x_1,x_2)^T$（上付き $T$ は行と列の**転置**）に対して、四分の一回転と第一座標の符号を反転する鏡映を

$$
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
S=\begin{pmatrix}-1&0\\0&1\end{pmatrix}
$$

と置く。これらは標準基底 $e_1=(1,0)^T$、$e_2=(0,1)^T$ に関する[線形写像の表現行列](../../../基礎科目/F0/F0-00F/index.md#def-f0-00f-representation-matrix)であり、各列は基底ベクトルの行き先である。具体的には

$$
Re_1=e_2,\quad Re_2=-e_1,\qquad
Se_1=-e_1,\quad Se_2=e_2.
$$

したがって $x=x_1e_1+x_2e_2$ へ線形性を適用すると

$$
Rx=-x_2e_1+x_1e_2=(-x_2,x_1)^T,\qquad
Sx=-x_1e_1+x_2e_2=(-x_1,x_2)^T.
$$

特に $R(1,2)^T=(-2,1)^T$、$S(1,2)^T=(-1,2)^T$ である。また二要素の順序付き入力 $x=(a,b)$ の交換は $P(a,b)=(b,a)$ と書く。座標の反射とデータ要素の交換は意味が異なるが、どちらも有限変換として計算できる。

入力 $x$ を変える規則を $T_g$、予測値 $y$ を変える規則を $U_g$ と区別する。実数の「長さ」を出すなら出力は全変換で動かさず、ベクトルの「向き」を出すなら四分の一回転とともに出力を回す。例えば

$$
U_g(y)=y\quad\text{（実数出力、全変換）},\qquad
U_r(y)=Ry,\quad U_{r^k}(y)=R^ky\quad\text{（ベクトル出力、回転）}.
$$

ここで添字 $g$ は変換ラベル、$r^k$ は $r$ を $k$ 回合成したラベル、行列のべき $R^k$ は対応する線形写像の合成を表す。出力側の変換を指定しない「回転に強いモデル」では、検証する等式が決まらない。

<a id="def-mfl22-finite-transforms"></a>

<!-- formal-statement-start -->
> **定義（有限対称変換族と入出力の変換）**  
> 入力集合 $X$、出力集合 $Y$、有限個のラベルの集合 $G$ を考える。各 $g\in G$ に全単射 $T_g:X\to X$ と $U_g:Y\to Y$ を対応させる。$G$ には恒等ラベル $e$ と合成 $gh$ を備え、
>
$$
T_e=\operatorname{id}_X,\quad U_e=\operatorname{id}_Y,\quad
T_{gh}=T_g\circ T_h,\quad U_{gh}=U_g\circ U_h
$$
>
> とする。各 $g$ には逆ラベル $g^{-1}$ があり、
>
$$
T_{g^{-1}}\circ T_g=\operatorname{id}_X,\qquad
U_{g^{-1}}\circ U_g=\operatorname{id}_Y
$$
>
> を満たす。この仕組みを**有限対称変換族**という。入力と出力の写像は異なってよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl22-finite-transforms -->
**定義の確認**。$G=\{e,r,r^2,r^3\}$（$e=r^0$）、$X=Y=\mathbb R^2$ をとり、入出力の両方に $r^k$ に対応する行列を

$$
T_{r^k}x=R^kx,\qquad U_{r^k}y=R^ky
$$

として作用させる。前段の座標式を二回適用すると

$$
R^2(x_1,x_2)^T=(-x_1,-x_2)^T,\qquad R^2=-I,\qquad R^4=I.
$$

よって恒等ラベルは $R^0=I$ に対応し、任意の $i,j$ で

$$
T_{r^ir^j}x=R^{i+j}x=R^i(R^jx)=T_{r^i}(T_{r^j}x)
$$

となる（指数は4で割った余り）。出力の $U$ でも同じ式が成り立つ。また

$$
R^{4-i}R^i=I
$$

は入出力それぞれの逆条件を満たし、逆写像が存在するため各 $R^i$ は全単射である。出力だけ $Y=\mathbb R$ として $U_{r^k}(y)=y$ に変更しても、恒等・合成・逆・全単射の条件を満たすが、予測の意味は変わる。
<!-- definition-example-end -->

鏡映を加えると $R^4=S^2=I$、$SR=R^{-1}S$ だから八つの行列 $I,R,R^2,R^3,S,SR,SR^2,SR^3$ は合成・逆で閉じる。順序交換も $P^2=I$ なので $\{I,P\}$ で閉じる。

## 3. 不変性と等変性

まず、入力を動かしてから計算した数値と、元の入力から計算した数値が一致するという条件を考える。

<a id="def-mfl22-invariant"></a>

<!-- formal-statement-start -->
> **定義（不変写像）**  
> 入力集合 $X$ 上の[有限対称変換族](#def-mfl22-finite-transforms) $T_g$（$g\in G$）と出力集合 $Y$ を与える。写像 $f:X\to Y$ が**不変**であるとは、任意の $g\in G$、$x\in X$ について
>
$$
f(T_gx)=f(x)
$$
>
> が成り立つことをいう。出力には恒等変換 $U_g=\operatorname{id}_Y$ を指定している。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl22-invariant -->
**定義の確認**。$X=\mathbb R^2$、四回転族に対して $f(x)=x_1^2+x_2^2$ とする。$Rx=(-x_2,x_1)^T$ なので

$$
f(Rx)=(-x_2)^2+x_1^2=f(x).
$$

この等式を繰り返せば $R^2,R^3$ でも同じで、恒等変換でも等しい。逆に $h(x)=x_1$ は $x=(1,0)^T$ で $h(x)=1$、$h(Rx)=0$ だから不変ではない。
<!-- definition-example-end -->

二要素 $(a,b)$ の合計 $a+b$ は $P$ に不変だが、先頭要素 $a$ は交換してはいけない情報を持つ。次に、出力が変換へ追従する場合を扱う。

<a id="def-mfl22-equivariant"></a>

<!-- formal-statement-start -->
> **定義（等変写像）**  
> 集合 $X,Y$ と[有限対称変換族](#def-mfl22-finite-transforms)の入出力変換 $T_g:X\to X$、$U_g:Y\to Y$（$g\in G$）を与える。写像 $\Phi:X\to Y$ が**等変**であるとは、すべての $g\in G$、$x\in X$ について
>
$$
\boxed{\Phi(T_gx)=U_g\Phi(x)}
$$
>
> が成り立つことをいう。左辺は入力を変換してから予測、右辺は予測してから出力を変換する。不変性は $U_g=\operatorname{id}_Y$ の特別な場合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl22-equivariant -->
**定義の確認**。入出力とも $\mathbb R^2$、変換は四回転族の行列 $Q_g$ を両側に使い、$\Phi(x)=x$ とする。すると全入力・全変換で

$$
\Phi(T_gx)=\Phi(Q_gx)=Q_gx=Q_g\Phi(x)=U_g\Phi(x).
$$

二要素の交換でも、出力を同じ交換で動かし $\Phi(a,b)=(2a,2b)$ とすれば

$$
\Phi(P(a,b))=(2b,2a)=P\Phi(a,b).
$$

どちらも**出力が同じ値にとどまる**のではなく、正しく追従する。
<!-- definition-example-end -->

予測がスカラーなのかベクトルなのかを最初に決める必要がある。物体の分類値なら出力は恒等変換、向きなら回転変換が適切かもしれない。これは変換に対して保つべき**タスク上の意味**に依存する。

## 4. 候補写像に対称性を組み込む

有限の訓練点がない場所で予測がどう振る舞うかは、訓練例だけからは一意に決まらない。そこで変換の前後で一致する写像だけを候補に残す。[ML1-01の仮説クラス](../../ML/ML1-01/index.md#def-ml1-01-predictor)は有限の入出力集合上で導入したが、ここでは同じ「予測写像の非空な候補集合」という意味を、$X=\mathbb R^2$ のような無限集合にも拡張する。

<a id="def-mfl22-bias"></a>

<!-- formal-statement-start -->
> **定義（幾何的帰納バイアス）**  
> 集合 $X,Y$、有限対称変換族 $(T_g,U_g)_{g\in G}$ と、写像 $X\to Y$ の非空な候補集合である仮説クラス $\varnothing\ne\mathcal H\subseteq\{\Phi:X\to Y\}$ を与える。
>
$$
\mathcal H_{\mathrm{eq}}=
\{\Phi\in\mathcal H:\ \Phi(T_gx)=U_g\Phi(x)\ \text{for all }g\in G,\ x\in X\}
$$
>
> のみに候補を制約することを、本章の**幾何的帰納バイアス**の基本例と呼ぶ。不変性を課すときは $U_g=\operatorname{id}_Y$ とする。これは候補への制約であって、予測精度の保証ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl22-bias -->
**定義の確認**。入力は平面点、出力は実数とし、出力の回転変換を恒等にする。候補集合を

$$
\mathcal H=\{f_1,f_2\},\qquad
f_1(x)=\|x\|^2,\quad f_2(x)=x_1
$$

とする。[不変性の確認](#def-mfl22-invariant)から $f_1$ はすべての四回転で成立する。一方、$x=(1,0)^T$ で $f_2(x)=1$、$f_2(Rx)=0$ なので $f_2$ は不成立。したがって

$$
\mathcal H_{\mathrm{eq}}=\{f_1\}.
$$

正しい教師値をどちらがよく予測するかは、別途タスクに照らして確認すべきである。なお、候補をすべて除外すれば $\mathcal H_{\mathrm{eq}}$ が空になることもあり、その場合はこの候補集合から予測器を選べない。
<!-- definition-example-end -->

### 4.1 多段写像の合成

前段と後段が中間特徴に**共通の変換則**を指定していれば、多段にしても等変性が保存される。

<a id="prop-mfl22-composition"></a>

<!-- formal-statement-start -->
> **命題（等変写像の合成）**  
> 集合 $X,Y,Z$ に同一の有限変換族のラベル $g\in G$ に対応する変換 $T_g,U_g,V_g$ が与えられ、合成・逆が整合するとする。写像 $\Phi:X\to Y$、$\Psi:Y\to Z$ が全 $g,x,y$ で
>
$$
\Phi(T_gx)=U_g\Phi(x),\qquad
\Psi(U_gy)=V_g\Psi(y)
$$
>
> を満たせば、合成 $\Psi\circ\Phi$ は入力変換 $T_g$ と出力変換 $V_g$ に関して等変である。
<!-- formal-statement-end -->

**証明の見取り図**。$\Phi$ の等式で一度変換し、同じ $U_g$ を後段の入力として $\Psi$ の等式を適用する。

<!-- proof-start -->
### 証明

任意の $g\in G$、$x\in X$ について、まず $\Phi(T_gx)=U_g\Phi(x)$。次に $y=\Phi(x)\in Y$ を後段の仮定へ代入すると

$$
(\Psi\circ\Phi)(T_gx)
=\Psi(\Phi(T_gx))
=\Psi(U_g\Phi(x))
=V_g\Psi(\Phi(x))
=V_g(\Psi\circ\Phi)(x).
$$

各等号は前段の等変性、後段の等変性、合成の定義による。任意の $g,x$ で成り立った。
<!-- proof-end -->

### 4.2 回転と鏡映で残る量

実行列 $Q$ が $Q^TQ=I$ を満たすとき直交行列という。ここで $Q^T$ は行列の転置、$I$ は単位行列である。ベクトル $x\in\mathbb R^n$ の長さの二乗は

$$
\|x\|^2=x^Tx=\sum_{i=1}^n x_i^2
$$

である。回転と鏡映はともに直交行列なので、どの量が残り、何が追従するかを同じ式で確認できる。

<a id="prop-mfl22-orthogonal"></a>

<!-- formal-statement-start -->
> **命題（直交変換下の長さ不変とベクトル等変）**  
> $n\ge1$ とし、$G$ を積・逆・恒等で閉じた有限個の実 $n\times n$ 直交行列 $Q_g$ からなる集合とする。$X=\mathbb R^n$ に $T_gx=Q_gx$ を作用させる。
> (i) 実数出力 $f(x)=\|x\|^2$ は、出力変換が恒等なら不変である。
> (ii) ベクトル出力 $\Phi(x)=x$ は、$U_gy=Q_gy$ に関して等変である。
<!-- formal-statement-end -->

**証明の見取り図**。長さは内積の行列表示で確認し、ベクトル出力は等変等式の両辺を直接計算する。

<!-- proof-start -->
### 証明

(i) 任意の $g,x$ で $Q_g^TQ_g=I$ だから

$$
f(T_gx)=\|Q_gx\|^2=(Q_gx)^T(Q_gx)
=x^TQ_g^TQ_gx=x^TIx=\|x\|^2=f(x).
$$

(ii) 左辺は $\Phi(T_gx)=\Phi(Q_gx)=Q_gx$。右辺は $U_g\Phi(x)=Q_gx$。任意の $g,x$ で一致する。
<!-- proof-end -->

長さを出す写像は不変、ベクトルを出す写像は等変であり、同じ「回転に強い」で一括りにしない。

## 5. 対称な入力は出力を制限する

四分の一回転でも原点は動かない。もし原点で非零の矢印を出すなら、その矢印だけが回ってしまい、等変性の二つの計算順序が一致しない。

<a id="prop-mfl22-fixed-input"></a>

<!-- formal-statement-start -->
> **命題（動かない入力での出力制約）**  
> 集合 $X,Y$ の有限対称変換族 $(T_g,U_g)$ に関して写像 $\Phi:X\to Y$ が等変とする。ある $g\in G$ と $x\in X$ が $T_gx=x$ を満たせば
>
$$
U_g\Phi(x)=\Phi(x)
$$
>
> である。特に入出力がともに $\mathbb R^2$ で四分の一回転 $R$ に追従する場合、$\Phi(0,0)=(0,0)$ が必要となる。
<!-- formal-statement-end -->

**証明の見取り図**。[等変性の等式](#def-mfl22-equivariant)へ動かない入力を代入し、最後はベクトルの二成分を比較する。

<!-- proof-start -->
### 証明

$T_gx=x$ なら

$$
\Phi(x)=\Phi(T_gx)=U_g\Phi(x).
$$

特別な場合に $\Phi(0,0)=(a,b)^T$ とする。$R(0,0)^T=(0,0)^T$ なので

$$
\begin{pmatrix}a\\b\end{pmatrix}
=R\begin{pmatrix}a\\b\end{pmatrix}
=\begin{pmatrix}-b\\a\end{pmatrix}.
$$

従って $a=-b$ かつ $b=a$、ゆえに $a=-a$ から $a=0$、さらに $b=0$ である。
<!-- proof-end -->

動かない入力の出力は、その**出力側の変換でも固定される**。MFL23ではこの性質を動かない点の変換全体に拡張する。

### 5.1 少数の変換から全変換を検査する

四分の一回転を繰り返せば半回転・三四分回転・恒等も得られる。合成と逆の整合性があれば、それぞれを独立に証明する必要はない。

<a id="prop-mfl22-generators"></a>

<!-- formal-statement-start -->
> **命題（生成変換による等変性の検査）**  
> 集合 $X,Y$ 上の有限対称変換族 $(T_g,U_g)_{g\in G}$ の全ラベルが、部分集合 $A\subseteq G$ のラベルとその逆ラベルの有限回の合成で表せるとする。写像 $\Phi:X\to Y$ がすべての $a\in A$、$x\in X$ で
>
$$
\Phi(T_ax)=U_a\Phi(x)
$$
>
> を満たせば、全 $g\in G$ に対して等変である。
<!-- formal-statement-end -->

**証明の見取り図**。等式を逆変換へ移し、次に二つの等式を合成する。これを必要回数だけ繰り返す。

<!-- proof-start -->
### 証明

任意の $a\in A$、$y\in X$ で $x=T_{a^{-1}}y$ を代入すれば

$$
\Phi(y)=\Phi(T_aT_{a^{-1}}y)=U_a\Phi(T_{a^{-1}}y).
$$

左から $U_{a^{-1}}$ を作用させ、逆変換の定義を使うと

$$
\Phi(T_{a^{-1}}y)=U_{a^{-1}}\Phi(y).
$$

また $g,h$ について等変等式が成立するなら、任意の $x$ で

$$
\Phi(T_{gh}x)=\Phi(T_g(T_hx))
=U_g\Phi(T_hx)
=U_gU_h\Phi(x)=U_{gh}\Phi(x).
$$

従って $A$ と逆ラベルの任意の有限積でも等式が成立する。仮定により全 $G$ に到達する。
<!-- proof-end -->

四回転族なら $A=\{r\}$、回転と鏡映の八変換なら $A=\{r,s\}$ でよい。ただし入力と出力で**合成規則が対応する**ことが必要であり、無関係な操作を並べただけではこの命題を使えない。

## 6. 等変残差とデータ拡張は違う

数値実験では無数の入力を検査できない。そこで一つの入力・変換で、[等変性の左右](#def-mfl22-equivariant)の差を測る。出力を $\mathbb R^m$ に限定すると通常のEuclidノルムで定義できる。

<a id="def-mfl22-residual"></a>

<!-- formal-statement-start -->
> **定義（等変残差）**  
> $Y=\mathbb R^m$、$\Phi:X\to\mathbb R^m$ と有限対称変換族 $(T_g,U_g)$ を与える。$g\in G$、$x\in X$ の**等変残差**を
>
$$
E_g(\Phi;x)=\|\Phi(T_gx)-U_g\Phi(x)\|_2
$$
>
> とする。$E_g(\Phi;x)=0$ はその組 $(g,x)$ で等変等式が成り立つことと同値であり、全 $g,x$ で零なら等変である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl22-residual -->
**定義の確認**。$x=(1,0)^T$、入出力とも $R$ とし、$\Phi(x)=x$ を使う。$\Phi(Rx)=Rx=(0,1)^T$、$R\Phi(x)=(0,1)^T$ だから残差は0。$\Psi(x)=(x_1,0)^T$ なら $\Psi(Rx)=(0,0)^T$、$R\Psi(x)=(0,1)^T$ なので $E_r(\Psi;x)=\sqrt{0^2+(-1)^2}=1$。同じ出力空間の二つのベクトルを比較している。
<!-- definition-example-end -->

データ拡張（augmentation）では、教師付き標本 $(x,y)$ に $(T_gx,U_gy)$ を加える。しかし有限個の拡張標本で正答することは、**任意の入力**で等変なことと異なる。

<a id="prop-mfl22-augmentation"></a>

<!-- formal-statement-start -->
> **命題（有限データ拡張の非保証）**  
> 入出力空間は $\mathbb R^2$ とし、入力・出力を同一の四回転族で動かす。教師写像と元の訓練入力を
>
$$
G=\{I,R,R^2,R^3\},\quad f_*(x)=x,\quad e_1=(1,0)^T
$$
>
> とする。任意の実数 $\varepsilon\ne0$ に対し
>
$$
\Phi_\varepsilon(x)=x+\varepsilon(\|x\|^2-1)e_1
$$
>
> は四つの拡張訓練点 $(R^ke_1,R^ke_1)$（$k=0,1,2,3$）で完全に正答するが、四回転族に等変ではない。
<!-- formal-statement-end -->

**証明の見取り図**。訓練点では長さが1なので追加項が消える。長さ2の入力では追加項の向きが回転と両立しない。

<!-- proof-start -->
### 証明

各 $k$ に対して[直交変換下の長さ不変とベクトル等変](#prop-mfl22-orthogonal)の (i) より $\|R^ke_1\|^2=1$。ゆえに

$$
\Phi_\varepsilon(R^ke_1)
=R^ke_1+\varepsilon(1-1)e_1
=R^ke_1=f_*(R^ke_1).
$$

次に $z=2e_1$ とする。$\|z\|^2=\|Rz\|^2=4$ なので

$$
\Phi_\varepsilon(Rz)=Rz+3\varepsilon e_1,\qquad
R\Phi_\varepsilon(z)=Rz+3\varepsilon Re_1.
$$

$e_1=(1,0)^T$, $Re_1=(0,1)^T$ を代入すると差は $3\varepsilon(1,-1)^T$。従って

$$
E_r(\Phi_\varepsilon;z)=3\sqrt2|\varepsilon|>0.
$$

一組の入力・変換で不一致があったので、全入力での等変性は成立しない。
<!-- proof-end -->

これはデータ拡張が無益という意味ではなく、有限個の訓練損失の小ささを数学的な等変性の証明と取り違えてはいけないという意味である。

## 7. 間違った不変性は情報を消す

入力を同じものと見なしてよいかは目的変数による。左右の向きそのものを答える問題に「左右反転後の答えは変わらない」を強制すると、予測したい差を消してしまう。

<a id="prop-mfl22-wrong-invariance"></a>

<!-- formal-statement-start -->
> **命題（誤った不変性の二点誤差下界）**  
> 入力 $X=\mathbb R^2$ で左右反転を用い、実数出力は動かさない。二点と教師値を
>
$$
T(x_1,x_2)=(-x_1,x_2),\quad
a=(1,0),\ b=Ta=(-1,0),\quad
y_a=1,\ y_b=-1
$$
>
> とする。$T$ に不変な任意の予測器 $f:X\to\mathbb R$ の二点平均二乗誤差は1以上である。一方 $f_*(x)=x_1$ は両点で誤差零である。
<!-- formal-statement-end -->

**証明の見取り図**。不変性は二点の予測を同じ数 $c$ に縛る。この数を変えても正負の教師値へ同時一致できない。

<!-- proof-start -->
### 証明

不変性から $f(b)=f(Ta)=f(a)=c$ と置ける。[ML1-01の経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)と同様に、二乗損失の二点平均は

$$
\frac{(c-1)^2+(c+1)^2}{2}
=\frac{c^2-2c+1+c^2+2c+1}{2}
=c^2+1\ge1.
$$

等号は $c=0$ で成立する。一方 $f_*(a)=1$, $f_*(b)=-1$ なので二点とも誤差は零。
<!-- proof-end -->

ここで失ったのは**教師値が反転で変わる**というタスクの事実である。変換した入力に元のラベルをそのまま付ける拡張は、この問題では誤ラベルを増やす。等変性の残差を零にすることと正しい予測は別の目標である。

## 8. 回転・鏡映・置換の決定論的ラボ

付属の[Pythonラボ](symmetry_lab.py)は二次元入力 $(x_1,x_2)$ に四分の一回転・鏡映・二要素交換を作用させ、入力変換後の予測と出力変換後の予測を比較する。回転・鏡映では座標、交換では順序付き二要素と解釈する。`identity`・`augmented` はベクトル出力を同じ行列で動かす。`norm`・`sum`・`first` はスカラー出力を動かさない。

理論予測は、恒等写像なら全変換で残差零、長さの二乗なら直交三変換で零、合計なら交換で零、先頭要素なら交換・鏡映で一般に非零である。拡張モデルは単位円上の四訓練点で誤差零だが、長さ2の点を回すと $3\sqrt2|\varepsilon|$ の残差が出る。浮動小数点の微小誤差は数学的な破れと区別する。

```bash
python textbook/volumes/dream_thater/応用系/MFL/MFL22/symmetry_lab.py --transform rotate --model identity --x 1 --y 2
python textbook/volumes/dream_thater/応用系/MFL/MFL22/symmetry_lab.py --transform reflect --model first --x 1 --y 2
python textbook/volumes/dream_thater/応用系/MFL/MFL22/symmetry_lab.py --transform swap --model sum --x 1 --y 2
python textbook/volumes/dream_thater/応用系/MFL/MFL22/symmetry_lab.py --transform rotate --model augmented --x 2 --y 0 --epsilon 0.2
python textbook/volumes/dream_thater/応用系/MFL/MFL22/symmetry_lab.py --self-test
```

```python-file-lab
# lab-id: MFL22-SYMMETRY
# lab-title: 不変・等変・拡張の残差
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL22/symmetry_lab.py
# timeout-ms: 60000
# lab-preset: 回転・ベクトル等変 | --transform rotate --model identity --x 1 --y 2
# lab-preset: 鏡映・第一座標の破れ | --transform reflect --model first --x 1 --y 2
# lab-preset: 順序交換・合計不変 | --transform swap --model sum --x 1 --y 2
# lab-preset: 拡張点から外れた残差 | --transform rotate --model augmented --x 2 --y 0 --epsilon 0.2
```

JSONの `transformed_input`、`predict_after_transform`、`transform_after_predict`、`equivariance_residual` を比較する。`augmented_training_max_error` は四つの単位円訓練点での最大誤差で、全空間の残差上界ではない。変換のラベルを同じにしても出力型ごとに異なる $U_g$ を使う。

## 9. 演習と詳細解答

<a id="ex-mfl22-a01"></a>

### MFL22-A01 回転と鏡映の行列積

- Level: A
- 問題: $R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$S=\begin{pmatrix}-1&0\\0&1\end{pmatrix}$ に対し、$R^2,R^4,S^2,SR,R^{-1}S$ を計算し $SR=R^{-1}S$ を検証せよ。

**詳細解答。** 行列積から

$$
R^2=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}=-I,\quad
R^4=(-I)^2=I,\quad S^2=I.
$$

さらに $R^{-1}=R^3=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ であり、

$$
SR=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
R^{-1}S=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}-1&0\\0&1\end{pmatrix}
=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

従って等しい。$S R^k=R^{-k}S$ と $R^4=S^2=I$ により任意の積は $R^k$ または $SR^k$（$k=0,1,2,3$）へ整理できる。

<a id="ex-mfl22-a02"></a>

### MFL22-A02 長さと第一座標

- Level: A
- 問題: $x=(2,1)^T$、$R(x_1,x_2)^T=(-x_2,x_1)^T$ とする。$f(x)=x_1^2+x_2^2$ と $h(x)=x_1$ の回転前後の値を求め、四回転族への不変性を判定せよ。

**詳細解答。** $Rx=(-1,2)^T$ なので

$$
f(x)=2^2+1^2=5,\qquad f(Rx)=(-1)^2+2^2=5.
$$

一方、第一座標は回転前に2、回転後に $-1$ で一致しない。[直交変換下の長さ不変とベクトル等変](#prop-mfl22-orthogonal)の (i) は全入力と全四回転に適用できるので $f$ は不変である。$h$ は反例が一組あるので不変ではない。

<a id="ex-mfl22-a03"></a>

### MFL22-A03 ベクトル予測の残差

- Level: A
- 問題: $x=(1,0)^T$、入力・出力とも四分の一回転 $R$ を用いる。$\Phi(x)=x$ と $\Psi(x)=(x_1,0)^T$ の残差 $E_r(\Phi;x)$、$E_r(\Psi;x)$ を求めよ。

**詳細解答。** $Rx=(0,1)^T$。[等変残差](#def-mfl22-residual)の定義から

$$
E_r(\Phi;x)=\|\Phi(Rx)-R\Phi(x)\|_2
=\|(0,1)^T-(0,1)^T\|_2=0.
$$

$\Psi(Rx)=(0,0)^T$、$R\Psi(x)=(0,1)^T$ より

$$
E_r(\Psi;x)=\|(0,0)^T-(0,1)^T\|_2=\sqrt{0^2+(-1)^2}=1.
$$

一入力で残差零でも全入力の等変性は保証されないが、一入力で非零なら等変でないと断定できる。

<a id="ex-mfl22-a04"></a>

### MFL22-A04 二要素の交換

- Level: A
- 問題: $P(a,b)=(b,a)$、$x=(1,3)$ とする。$f(a,b)=a+b$ の不変性と、出力も $P$ で動かす $\Phi(a,b)=(2a,2b)$ の等変性を確かめよ。

**詳細解答。** $Px=(3,1)$ なので $f(Px)=3+1=4=f(x)$。また $\Phi(Px)=\Phi(3,1)=(6,2)$、$P\Phi(x)=P(2,6)=(6,2)$。一般の $(a,b)$ でも $\Phi(P(a,b))=(2b,2a)=P(2a,2b)$ で一致し、$P^2=I$ だから恒等と交換の両方で条件を満たす。

<a id="ex-mfl22-b01"></a>

### MFL22-B01 動かない点の必要条件

- Level: B
- 問題: $\Phi:\mathbb R^2\to\mathbb R^2$ が入力・出力の四分の一回転 $R$ に等変とする。$\Phi(0)=0$ を示せ。定数写像 $\Psi(x)=(1,0)^T$ は等変か。

**詳細解答。** $R0=0$ なので[固定入力命題](#prop-mfl22-fixed-input)から $\Phi(0)=R\Phi(0)$。$\Phi(0)=(a,b)^T$ と置けば

$$
(a,b)^T=(-b,a)^T\quad\Longrightarrow\quad a=-b,\ b=a
\quad\Longrightarrow\quad a=b=0.
$$

一方、定数写像については

$$
\Psi(R0)=(1,0)^T,\qquad R\Psi(0)=(0,1)^T
$$

で不一致。出力の非零定数ベクトルが回転で固定されないためである。

<a id="ex-mfl22-b02"></a>

### MFL22-B02 一変換から四回転へ

- Level: B
- 問題: $T_r^4=U_r^4=\operatorname{id}$、$\Phi(T_rx)=U_r\Phi(x)$ が全 $x$ で成り立つとする。$k=2,3,0$ に対する $\Phi(T_r^kx)=U_r^k\Phi(x)$ を導き、四回転族で等変となる理由を示せ。

**詳細解答。** $x$ を $T_rx$ に置き換えると

$$
\Phi(T_r^2x)=U_r\Phi(T_rx)=U_r(U_r\Phi(x))=U_r^2\Phi(x).
$$

これをさらに一回進めると

$$
\Phi(T_r^3x)=U_r\Phi(T_r^2x)=U_r^3\Phi(x).
$$

$k=0$ は $\Phi(\operatorname{id}x)=\Phi(x)=\operatorname{id}\Phi(x)$。$T_r^4=U_r^4=\operatorname{id}$ なので指数を4で割った余りに帰着でき、[生成変換命題](#prop-mfl22-generators)の条件を満たす。

<a id="ex-mfl22-b03"></a>

### MFL22-B03 拡張で零、未学習点で非零

- Level: B
- 問題: 四回転、教師 $f_*(x)=x$、$\Phi_\varepsilon(x)=x+\varepsilon(\|x\|^2-1)e_1$、$\varepsilon=1/2$ を考える。拡張訓練点 $R^ke_1$（$k=0,1,2,3$）での最大二乗誤差と $z=2e_1$ の回転残差を求めよ。

**詳細解答。** 各訓練点は長さ1なので $\Phi_{1/2}(R^ke_1)=R^ke_1$。予測と教師値がすべて一致し、最大二乗誤差は0。一方 $\|z\|^2-1=3$ であり、[非保証命題](#prop-mfl22-augmentation)の二つの計算順序の差は

$$
\Phi_{1/2}(Rz)-R\Phi_{1/2}(z)
=\frac32(e_1-Re_1)=\frac32(1,-1)^T.
$$

従って残差は $\frac32\sqrt2=3/\sqrt2>0$。訓練点では消える追加項が半径2の点では消えず、さらにその項の向きが入力とともに回らないのが破れの原因である。

<a id="ex-mfl22-b04"></a>

### MFL22-B04 誤った不変性で達成できる精度

- Level: B
- 問題: 反転で対になる二入力 $a=(1,0)$、$b=(-1,0)$ の教師値を $3,-3$ とする。出力を変換しない不変予測器の二点平均二乗誤差の最小値と、そのときの共通予測値を求めよ。制約を外した場合とも比べよ。

**詳細解答。** 不変性から $f(a)=f(b)=c$ と置ける。損失は

$$
\frac{(c-3)^2+(c+3)^2}{2}
=\frac{c^2-6c+9+c^2+6c+9}{2}
=c^2+9.
$$

$c^2\ge0$ より最小値9は $c=0$ で達する。一方、制約がなければ $f(x)=3x_1$ で二点とも正答し誤差零。教師値の大きさを1から3に替えたため、[二点下界](#prop-mfl22-wrong-invariance)は $3^2=9$ となる。

<a id="ex-mfl22-c01"></a>

### MFL22-C01 三つのタスクの対称性を比較する

- Level: C
- 問題: 次の三タスクを考える。
  1. (i) 平面点 $x\in\mathbb R^2$ から長さの二乗 $\|x\|^2$ を出す。
  2. (ii) 同じ平面点 $x$ 自体をベクトルで出す。
  3. (iii) 順序付き二要素 $(a,b)$ から先頭要素 $a$ を出す。

  (i)(ii) では四分の一回転 $R$、(iii) では交換 $P$ を入力へ作用させる。それぞれ適切な出力変換と、不変・等変の判定を述べよ。
  さらに $x=(2,1)^T$ または $(a,b)=(2,1)$ の残差を計算せよ。(ii) については四つの回転拡張訓練点に正答しながら未学習点で非等変となる写像を構成し、必要な評価項目を提案せよ。

**詳細解答。** 最初にタスクの意味から出力変換を選ぶ。長さは実数なので恒等、ベクトルは回転 $R$、先頭要素は実数なので恒等とする。これは三つとも同じ出力変換にすべきという仮定を置いていない。

1. (i) $Rx=(-1,2)^T$ より $f(x)=2^2+1^2=5$、$f(Rx)=(-1)^2+2^2=5$。$E_r=|5-5|=0$。[直交変換下の長さ不変とベクトル等変](#prop-mfl22-orthogonal)の (i) から全四回転で不変。
2. (ii) $\Phi(x)=x$ とすると $\Phi(Rx)=(-1,2)^T$、$R\Phi(x)=(-1,2)^T$ で $E_r=0$。これは等変であり、出力が動くので一般には不変ではない。
3. (iii) $h(2,1)=2$、$h(P(2,1))=h(1,2)=1$ だから $E_p=|1-2|=1$。交換不変性は先頭要素のタスクに適していない。

(ii) で $\varepsilon\ne0$ とし、$\Phi_\varepsilon(x)=x+\varepsilon(\|x\|^2-1)e_1$ を選ぶ。四つの訓練点 $R^ke_1$ は長さ1なので予測と教師が一致する。一方 $z=2e_1$ では

$$
\Phi_\varepsilon(Rz)-R\Phi_\varepsilon(z)
=3\varepsilon(1,-1)^T,\qquad
E_r(\Phi_\varepsilon;z)=3\sqrt2|\varepsilon|>0.
$$

従って検証表には**変換前後の教師ラベルが整合するか**、**未学習の変換入力に対する予測誤差**、**等変残差**を別々に設ける。(iii) は最初の項目で交換により教師値が変わることが判明する。タスクが不変でないのに不変なモデルを強制すると、[二点誤差下界](#prop-mfl22-wrong-invariance)のように表現できない正解が生じる。等変残差だけを小さくしても正しいタスクを解いたことにはならない。

## 10. 何を得たか

変換 $T_g$ と出力変換 $U_g$ の選択が済めば、不変性・等変性は一つの可換等式で検算できる。候補写像へ等式を課すことと、有限拡張データに正答することは異なる。しかも**どの等式を課すべきかはタスクの真の対称性次第**である。

次のMFL23では有限変換族を群作用として整理し、変換で結ばれる点と動かない点を軌道・安定化群として扱う。
