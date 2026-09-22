# NA8 数値解析 VIII：数値線形代数 I—直接法

NA1 では、線形方程式

$$
Ax=b
$$

そのものの感度と、計算法が生む誤差を分けました。特に

- [2-ノルム行列条件数](../NA1/index.md#def-na1-matrix-condition-number)
- [前方誤差・後方誤差](../NA1/index.md#def-na1-forward-backward-error)
- [残差](../NA1/index.md#def-na1-residual)
- [後方安定性](../NA1/index.md#def-na1-backward-stability)

を導入しました。

この章では、その線形方程式を有限回の演算で解く **直接法**を扱います。中心となる考えは、逆行列を明示的に作ることではありません。

~~~text
Ax=b
 ↓
扱いやすい行列へ分解する
 ↓
三角連立方程式を解く
 ↓
残差と条件数で結果を評価する
~~~

一般の密行列には Gauss 消去法と LU 分解、実対称正定値行列には Cholesky 分解、直交性を生かしたい問題や最小二乗問題には QR 分解という役割分担が現れます。

直接の前提は [NA1](../NA1/index.md)、[F0-00E1 の QR 分解](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#def-f0-00e1-thin-qr)、[F0-00F1 の正定値行列](../F0_00F1_固有空間_スペクトル定理_PSD/index.md) です。

---

## 0. 「解ける」と「数値的に信頼できる」は別問題

可逆行列 $A$ なら、理論上は

$$
x=A^{-1}b
$$

と書けます。しかし数値計算では通常、$A^{-1}$ を先に作ってから掛ける方法を採りません。

理由は三つあります。

1. 連立方程式を解くだけなら逆行列全体は不要である。
2. 分解を一度作れば、右辺 $b$ が変わっても再利用できる。
3. 丸め誤差の解析は「分解＋三角連立方程式」の形の方が追いやすい。

そして、アルゴリズムがどれほど良くても、$A$ 自体が悪条件なら前方誤差は大きくなり得ます。NA1 の

$$
\text{前方誤差}
\lesssim
\text{条件数}
\times
\text{後方誤差}
$$

という構図を、この章では具体的な線形方程式ソルバへ適用します。

---

## 1. 最後に解くのは三角連立方程式

直接法の多くは、最終的に三角行列の連立方程式へ帰着します。

<a id="prop-na8-triangular-substitution"></a>
<!-- formal-statement-start -->
### 命題（三角連立方程式の逐次解法）

下三角行列 $L=(\ell_{ij})\in\mathbb R^{n\times n}$ の対角成分がすべて非零なら、

$$
Lx=b
$$

は一意解を持ち、

$$
\boxed{
x_i
=
\frac{
b_i-\sum_{j=1}^{i-1}\ell_{ij}x_j
}{
\ell_{ii}
}
}
\qquad
(i=1,\dots,n)
$$

によって第1成分から順に求められる。これを **前進代入**という。

同様に、対角成分がすべて非零の上三角行列 $U=(u_{ij})$ に対する

$$
Ux=b
$$

は

$$
\boxed{
x_i
=
\frac{
b_i-\sum_{j=i+1}^{n}u_{ij}x_j
}{
u_{ii}
}
}
\qquad
(i=n,n-1,\dots,1)
$$

によって最終成分から逆順に求められる。これを **後退代入**という。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

下三角の場合、第1行は

$$
\ell_{11}x_1=b_1
$$

です。$\ell_{11}\ne0$ なので $x_1$ は一意に決まります。

$x_1,\dots,x_{i-1}$ が決まったとします。第 $i$ 行は

$$
\sum_{j=1}^{i-1}\ell_{ij}x_j+\ell_{ii}x_i=b_i
$$

なので、

$$
x_i
=
\frac{
b_i-\sum_{j=1}^{i-1}\ell_{ij}x_j
}{
\ell_{ii}
}
$$

と一意に決まります。帰納法により全成分が一意に決まります。

上三角の場合は最終行から同じ議論を逆順に行えばよいです。
<!-- proof-end -->

### 例：前進代入を実行する

$$
L=
\begin{pmatrix}
2&0&0\\
-1&1&0\\
4&2&-2
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
2\\0\\2
\end{pmatrix}
$$

とします。

第1行から

$$
2x_1=2
\quad\Longrightarrow\quad
x_1=1.
$$

第2行から

$$
-x_1+x_2=0
\quad\Longrightarrow\quad
x_2=1.
$$

第3行から

$$
4x_1+2x_2-2x_3=2
$$

なので

$$
4+2-2x_3=2
\quad\Longrightarrow\quad
x_3=2.
$$

従って

$$
x=(1,1,2)^{\mathsf T}.
$$

各 $i$ で高々 $i-1$ 個の既知成分との積和を取るため、演算回数の主要部は

$$
1+2+\cdots+(n-1)
=
\frac{n(n-1)}2
$$

です。従って三角連立方程式は $n^2$ に比例する演算回数で解けます。

---

## 2. Gauss 消去法を分解として読む

Gauss 消去法では、第 $k$ 列の対角成分をピボットとして、その下の成分を0にします。

現在の行列を $A^{(k)}=(a_{ij}^{(k)})$ とし、

$$
a_{kk}^{(k)}\ne0
$$

とします。$i>k$ に対して

$$
m_{ik}
=
\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}
$$

と置き、第 $i$ 行を

$$
R_i
\leftarrow
R_i-m_{ik}R_k
$$

で更新します。

この操作を最後まで行えば上三角行列が得られます。

<a id="def-na8-lu-factorization"></a>
<!-- formal-statement-start -->
### 定義（LU 分解）

正方行列 $A$ が

$$
\boxed{
A=LU
}
$$

と書け、$L$ が対角成分をすべて1とする下三角行列、$U$ が上三角行列であるとき、この表示を **LU 分解**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na8-lu-factorization -->
### 例：実際に $LU=A$ を確認する

$$
A=
\begin{pmatrix}
2&1&1\\
4&-6&0\\
-2&7&2
\end{pmatrix}
$$

に対して

$$
L=
\begin{pmatrix}
1&0&0\\
2&1&0\\
-1&-1&1
\end{pmatrix},
\qquad
U=
\begin{pmatrix}
2&1&1\\
0&-8&-2\\
0&0&1
\end{pmatrix}
$$

とします。

積を計算すると

$$
LU
=
\begin{pmatrix}
2&1&1\\
4&-6&0\\
-2&7&2
\end{pmatrix}
=A.
$$

$L$ は単位下三角、$U$ は上三角なので、これは定義どおりの LU 分解です。
<!-- definition-example-end -->

<a id="thm-na8-gaussian-elimination-lu"></a>
<!-- formal-statement-start -->
### 定理（Gauss 消去法と LU 分解）

行交換を行わない Gauss 消去法が途中で零ピボットに遭遇せず最後まで実行できるとする。

そのとき、消去で用いた乗数 $m_{ik}$ を第 $k$ 列の下側へ並べた単位下三角行列 $L$ と、消去後の上三角行列 $U$ により

$$
\boxed{
A=LU
}
$$

と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第 $k$ 段階で第 $k$ 列の下側を消去する操作は、単位行列の $(i,k)$ 成分に $-m_{ik}$ を入れた下三角の消去行列 $M_k$ を左から掛けることに対応します。

従って全消去後には

$$
U
=
M_{n-1}\cdots M_2M_1A
$$

となります。

各 $M_k$ は単位下三角で可逆であり、逆行列は同じ位置の符号を反転した単位下三角行列です。よって

$$
A
=
M_1^{-1}M_2^{-1}\cdots M_{n-1}^{-1}U.
$$

ここで

$$
L
=
M_1^{-1}M_2^{-1}\cdots M_{n-1}^{-1}
$$

と置けば $L$ は単位下三角です。

さらに、消去の第 $k$ 段階で使った乗数は、それより前の列には影響せず、最終的に $L$ の $(i,k)$ 成分へそのまま入ります。従って $A=LU$ が得られます。
<!-- proof-end -->

先ほどの例では

$$
m_{21}=2,
\qquad
m_{31}=-1,
\qquad
m_{32}=-1
$$

であり、これらがそのまま

$$
L=
\begin{pmatrix}
1&0&0\\
2&1&0\\
-1&-1&1
\end{pmatrix}
$$

の下三角部分になっています。

---

## 3. いつ行交換なしの LU 分解が可能か

行列 $A$ の左上 $k\times k$ 部分を $A_k$ と書きます。

<a id="thm-na8-lu-leading-principal-minors"></a>
<!-- formal-statement-start -->
### 定理（可逆行列に対するピボット選択なし消去の判定と LU 一意性）

$A\in\mathbb R^{n\times n}$ を可逆とする。

行交換を行わない Gauss 消去法が非零ピボットを用いて最後まで進むための必要十分条件は、

$$
\boxed{
\det A_k\ne0
\qquad
(k=1,\dots,n)
}
$$

である。

この条件の下で

$$
A=LU
$$

と $L$ を単位下三角、$U$ を対角成分がすべて非零の上三角に取る LU 分解が得られ、この分解は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず Gauss 消去が零ピボットなしで進み、

$$
A=LU
$$

が得られたとします。

左上 $k\times k$ 部分についても

$$
A_k=L_kU_k
$$

です。$L_k$ は単位下三角なので

$$
\det L_k=1.
$$

$U_k$ は上三角なので

$$
\det U_k
=
u_{11}u_{22}\cdots u_{kk}.
$$

各 $u_{jj}$ は消去時の非零ピボットです。従って

$$
\det A_k
=
u_{11}\cdots u_{kk}
\ne0.
$$

逆に、

$$
\det A_k\ne0
\qquad
(k=1,\dots,n)
$$

とします。

第1ピボットは

$$
u_{11}
=
\det A_1
\ne0.
$$

第 $k-1$ 段階まで消去できたとします。行交換なしの消去では、左上 $k\times k$ 部分にも同じ消去操作が働きます。消去行列の行列式は1なので、

$$
\det A_k
=
u_{11}\cdots u_{k-1,k-1}u_{kk}.
$$

帰納法の仮定により前のピボットはすべて非零で、左辺も非零です。従って

$$
u_{kk}\ne0.
$$

よって必要な各段階で除算するピボットは非零です。最後の対角成分も

$$
u_{nn}
=
\frac{\det A}{u_{11}\cdots u_{n-1,n-1}}
\ne0
$$

なので、得られる $U$ は可逆です。

一意性を示します。

$$
A=LU=\widetilde L\widetilde U
$$

と二通りに書けたとします。$L,\widetilde L$ は単位下三角、$U,\widetilde U$ は可逆な上三角です。

すると

$$
L^{-1}\widetilde L
=
U\widetilde U^{-1}.
$$

左辺は単位下三角、右辺は上三角です。両方を同時に満たす行列は対角行列であり、左辺の対角成分はすべて1なので恒等行列です。

従って

$$
L=\widetilde L,
\qquad
U=\widetilde U.
$$
<!-- proof-end -->

### 3.1 可逆でも行交換が必要なことがある

$$
A=
\begin{pmatrix}
0&1\\
1&1
\end{pmatrix}
$$

は

$$
\det A=-1\ne0
$$

なので可逆です。

しかし最初のピボット $a_{11}=0$ なので、行交換なしの Gauss 消去は開始できません。

「方程式が一意に解ける」ことと「現在の行順のまま LU 分解できる」ことは別です。

---

## 4. 部分ピボット選択と $PA=LU$

零ピボットを避けるだけでなく、小さすぎるピボットによる巨大な消去乗数も避けたいので、通常は行交換を使います。

<a id="def-na8-partial-pivoting"></a>
<!-- formal-statement-start -->
### 定義（部分ピボット選択）

Gauss 消去法の第 $k$ 段階で、未処理行 $i=k,\dots,n$ の中から

$$
\boxed{
|a_{pk}^{(k)}|
=
\max_{i=k,\dots,n}
|a_{ik}^{(k)}|
}
$$

を満たす行 $p$ を選び、第 $k$ 行と第 $p$ 行を交換してから消去する方法を **部分ピボット選択**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na8-partial-pivoting -->
### 例：零ピボットを行交換で避ける

$$
A=
\begin{pmatrix}
0&2\\
1&3
\end{pmatrix}
$$

では、第1列の未処理成分の絶対値は $0,1$ です。最大は第2行なので行交換し、

$$
PA
=
\begin{pmatrix}
1&3\\
0&2
\end{pmatrix},
\qquad
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

とします。

これで非零ピボット $1$ を使って消去できます。定義どおり、「現在列の絶対値最大の成分」を選んでいます。
<!-- definition-example-end -->

<a id="thm-na8-pivoted-lu"></a>
<!-- formal-statement-start -->
### 定理（部分ピボット選択付き LU 分解）

可逆行列 $A\in\mathbb R^{n\times n}$ に部分ピボット選択付き Gauss 消去法を適用すると、ある置換行列 $P$、単位下三角行列 $L$、上三角行列 $U$ が存在して

$$
\boxed{
PA=LU
}
$$

と書ける。

さらに各消去乗数は

$$
\boxed{
|m_{ik}|\le1
}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

第 $k$ 段階で未処理部分の第 $k$ 列がすべて0だと仮定します。

それ以前の消去によって、第1列から第 $k-1$ 列まではそれぞれ異なるピボットを持ち、その下は0になっています。一方、第 $k$ 列の第 $k$ 行以下がすべて0なら、最初の $k$ 列の非零成分は高々最初の $k-1$ 行にしか現れません。

従って最初の $k$ 列は一次従属となり、$A$ の列が一次独立であることに反します。よって可逆行列では各段階で非零の候補が存在し、部分ピボット選択を最後まで続けられます。

$PA=LU$ の形は、消去段階ごとの不変量で追えます。

第 $k$ 段階へ入る時点で、これまでの行交換をまとめた置換行列 $P^{(k)}$、すでに確定した乗数を持つ単位下三角行列 $L^{(k)}$、現在の消去行列 $U^{(k)}$ が

$$
P^{(k)}A
=
L^{(k)}U^{(k)}
$$

を満たしているとします。

新たに第 $k$ 行と第 $p$ 行を交換するときは、$U^{(k)}$ の同じ2行を交換するとともに、$L^{(k)}$ のすでに確定した第1列から第 $k-1$ 列についても同じ2行を交換します。これで等式は保たれます。

その後、第 $k$ 列の消去乗数 $m_{ik}$ を $L$ の第 $k$ 列へ記録し、$U$ 側では

$$
R_i\leftarrow R_i-m_{ik}R_k
$$

を行います。これは通常の LU の消去と同じなので、再び

$$
P^{(k+1)}A
=
L^{(k+1)}U^{(k+1)}
$$

が成り立ちます。

この操作を最後まで繰り返せば、最終的な置換行列 $P$、単位下三角行列 $L$、上三角行列 $U$ に対して

$$
PA=LU
$$

を得ます。

最後に、部分ピボット選択では

$$
|a_{kk}^{(k)}|
=
\max_{i\ge k}|a_{ik}^{(k)}|
$$

なので

$$
|m_{ik}|
=
\left|
\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}
\right|
\le1.
$$
<!-- proof-end -->

ここで重要なのは、

> 乗数が1以下なら、途中の行列要素も必ず小さい

とは限らないことです。

---

## 5. 部分ピボット選択でも要素は成長し得る

<a id="def-na8-element-growth-factor"></a>
<!-- formal-statement-start -->
### 定義（要素成長率）

Gauss 消去法の途中に現れる行列を $A^{(1)},A^{(2)},\dots$ とする。

元の行列の最大絶対値に対して、消去途中の最大絶対値が何倍まで成長したかを

$$
\boxed{
\rho
=
\frac{
\max_{k,i,j}|a_{ij}^{(k)}|
}{
\max_{i,j}|a_{ij}|
}
}
$$

で測り、$\rho$ を **要素成長率**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na8-element-growth-factor -->
### 例：乗数は1以下でも成長率は4

$$
A=
\begin{pmatrix}
1&0&1\\
-1&1&1\\
-1&-1&1
\end{pmatrix}
$$

を考えます。

各列で絶対値最大の候補はすべて1なので、同率の場合に現在行を選ぶとします。

第1列を消去すると

$$
\begin{pmatrix}
1&0&1\\
0&1&2\\
0&-1&2
\end{pmatrix}.
$$

第2列を消去すると

$$
U=
\begin{pmatrix}
1&0&1\\
0&1&2\\
0&0&4
\end{pmatrix}.
$$

消去乗数はいずれも $-1$ で絶対値1ですが、元の最大要素は1、途中の最大要素は4です。

従って

$$
\boxed{\rho=4}.
$$

部分ピボット選択は巨大な乗数を抑えますが、要素成長そのものを一様に小さく保証するわけではありません。
<!-- definition-example-end -->

浮動小数点演算では、消去途中の要素が大きくなれば、その大きさに比例した丸め誤差も生まれます。そのため LU 法の後方誤差解析では、NA1 の単位丸め誤差だけでなく、この要素成長も重要になります。

実務上、部分ピボット選択付き LU は一般の密行列に対して非常に広く使われます。しかし「任意の行列に対して無条件に小さな後方誤差を保証する」という意味ではありません。

---

## 6. LU 分解を一度作れば右辺を何度も解ける

$$
PA=LU
$$

が得られているとします。

$$
Ax=b
$$

は

$$
LUx=Pb
$$

と同値です。

まず

$$
Ly=Pb
$$

を前進代入で解き、次に

$$
Ux=y
$$

を後退代入で解きます。

密な $n\times n$ 行列では、LU 分解の主要演算回数はおよそ

$$
\frac23n^3
$$

に比例します。一方、分解後の前進代入と後退代入は合わせても $n^2$ に比例する程度です。

従って、同じ $A$ に対して多数の右辺

$$
Ax^{(1)}=b^{(1)},
\quad
Ax^{(2)}=b^{(2)},
\quad\dots
$$

を解くなら、分解の再利用が効きます。

---

## 7. 正定値なら Cholesky 分解

実対称正定値行列には、一般の LU より構造を生かした分解があります。

<a id="def-na8-cholesky-factorization"></a>
<!-- formal-statement-start -->
### 定義（Cholesky 分解）

実対称正定値行列 $A\in\mathbb R^{n\times n}$ に対し、

$$
\boxed{
A=LL^{\mathsf T}
}
$$

と書け、$L$ が正の対角成分を持つ下三角行列であるとき、この分解を **Cholesky 分解**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na8-cholesky-factorization -->
### 例：2次行列で定義を確認する

$$
A=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix}
$$

とします。

$$
L=
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}
$$

なら

$$
LL^{\mathsf T}
=
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}
\begin{pmatrix}
2&1\\
0&\sqrt2
\end{pmatrix}
=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix}
=A.
$$

$L$ は下三角で対角成分 $2,\sqrt2$ は正です。従ってこれは Cholesky 分解です。
<!-- definition-example-end -->

<a id="thm-na8-cholesky"></a>
<!-- formal-statement-start -->
### 定理（Cholesky 分解の存在一意性）

実対称正定値行列 $A\in\mathbb R^{n\times n}$ に対して、正の対角成分を持つ下三角行列 $L$ が一意に存在し、

$$
\boxed{
A=LL^{\mathsf T}
}
$$

と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n$ に関する帰納法で示します。

$n=1$ では $A=(a)$、正定値性から $a>0$ なので

$$
A=(\sqrt a)(\sqrt a)
$$

であり一意です。

$n\ge2$ とし、

$$
A=
\begin{pmatrix}
a&r^{\mathsf T}\\
r&B
\end{pmatrix}
$$

と分割します。

正定値性から、$e_1\ne0$ に対して

$$
a=e_1^{\mathsf T}Ae_1>0.
$$

そこで

$$
\ell_{11}=\sqrt a,
\qquad
w=\frac{r}{\sqrt a}
$$

と置きます。

次に Schur 補行列

$$
S
=
B-\frac{rr^{\mathsf T}}a
=
B-ww^{\mathsf T}
$$

が正定値であることを示します。

$y\ne0$ に対し

$$
z=
\begin{pmatrix}
-r^{\mathsf T}y/a\\
y
\end{pmatrix}
$$

と置くと $z\ne0$ なので

$$
z^{\mathsf T}Az>0.
$$

直接計算すると

$$
z^{\mathsf T}Az
=
y^{\mathsf T}
\left(
B-\frac{rr^{\mathsf T}}a
\right)y
=
y^{\mathsf T}Sy.
$$

従って $S$ は正定値です。

帰納法の仮定により、正の対角を持つ下三角行列 $L_2$ が一意に存在して

$$
S=L_2L_2^{\mathsf T}
$$

と書けます。

そこで

$$
L=
\begin{pmatrix}
\sqrt a&0\\
w&L_2
\end{pmatrix}
$$

と置くと

$$
LL^{\mathsf T}
=
\begin{pmatrix}
a&r^{\mathsf T}\\
r&ww^{\mathsf T}+S
\end{pmatrix}
=
\begin{pmatrix}
a&r^{\mathsf T}\\
r&B
\end{pmatrix}
=A.
$$

存在が示されました。

一意性は第1対角成分が必ず $\sqrt a>0$、第1列下側が必ず $r/\sqrt a$ と決まり、残りが Schur 補行列 $S$ の Cholesky 分解へ一意に帰着することから、同じ帰納法で従います。
<!-- proof-end -->

### 7.1 成分公式

$A=LL^{\mathsf T}$ の $(i,j)$ 成分を比較すると、$i\ge j$ に対して

$$
a_{ij}
=
\sum_{k=1}^{j}
\ell_{ik}\ell_{jk}.
$$

特に対角成分は

$$
a_{jj}
=
\sum_{k=1}^{j-1}\ell_{jk}^2+\ell_{jj}^2
$$

なので

$$
\boxed{
\ell_{jj}
=
\sqrt{
a_{jj}
-
\sum_{k=1}^{j-1}\ell_{jk}^2
}
}.
$$

$i>j$ では

$$
\boxed{
\ell_{ij}
=
\frac{
a_{ij}
-
\sum_{k=1}^{j-1}\ell_{ik}\ell_{jk}
}{
\ell_{jj}
}
}.
$$

正定値性が、平方根の中身を正に保つ役割を担っています。

一般の LU 分解が密行列でおよそ $2n^3/3$ の主要演算を要するのに対し、対称性を利用する Cholesky 分解はおよそ $n^3/3$ で済みます。

---

## 8. QR 分解を数値的に作る：Householder 反射

[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#def-f0-00e1-thin-qr) では、Gram--Schmidt 直交化から QR 分解の存在を学びました。

数値計算では、列を1本ずつ直交化する以外に、直交反射で列の下側成分をまとめて0にする方法が重要です。

<a id="def-na8-householder-reflector"></a>
<!-- formal-statement-start -->
### 定義（Householder 反射）

$0\ne v\in\mathbb R^m$ に対し、

$$
\boxed{
H
=
I
-
2\frac{vv^{\mathsf T}}{v^{\mathsf T}v}
}
$$

で定まる行列 $H$ を **Householder 反射**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na8-householder-reflector -->
### 例：2次元で座標を交換する反射

$$
v=
\begin{pmatrix}
1\\-1
\end{pmatrix}
$$

とすると

$$
v^{\mathsf T}v=2
$$

なので

$$
H
=
I-vv^{\mathsf T}
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}.
$$

従って

$$
H
\begin{pmatrix}
x_1\\x_2
\end{pmatrix}
=
\begin{pmatrix}
x_2\\x_1
\end{pmatrix}.
$$

$H$ は直線 $x_1=x_2$ に関する反射になっています。
<!-- definition-example-end -->

<a id="prop-na8-householder-axis-map"></a>
<!-- formal-statement-start -->
### 命題（Householder 反射の直交性と軸への写像）

Householder 反射

$$
H
=
I
-
2\frac{vv^{\mathsf T}}{v^{\mathsf T}v}
$$

は対称かつ直交行列であり、

$$
H^{\mathsf T}H=I.
$$

さらに $0\ne x\in\mathbb R^m$ に対して

$$
\alpha
=
-\operatorname{sgn}(x_1)\|x\|_2
$$

とし、$x_1=0$ のとき $\operatorname{sgn}(x_1)=1$ と約束する。

$$
v=x-\alpha e_1
$$

から作った Householder 反射は

$$
\boxed{
Hx=\alpha e_1
}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
P
=
\frac{vv^{\mathsf T}}{v^{\mathsf T}v}
$$

と置くと

$$
P^{\mathsf T}=P,
\qquad
P^2=P
$$

です。

従って

$$
H^{\mathsf T}=H
$$

かつ

$$
H^2
=
(I-2P)^2
=
I-4P+4P^2
=
I.
$$

よって

$$
H^{\mathsf T}H
=
H^2
=
I.
$$

次に軸への写像を示します。

$\alpha^2=\|x\|_2^2$ なので

$$
v^{\mathsf T}x
=
\|x\|_2^2-\alpha x_1.
$$

一方

$$
\begin{aligned}
v^{\mathsf T}v
&=
\|x-\alpha e_1\|_2^2\\
&=
\|x\|_2^2-2\alpha x_1+\alpha^2\\
&=
2(\|x\|_2^2-\alpha x_1).
\end{aligned}
$$

従って

$$
2\frac{v^{\mathsf T}x}{v^{\mathsf T}v}=1.
$$

よって

$$
Hx
=
x-v
=
\alpha e_1.
$$
<!-- proof-end -->

### 8.1 Householder QR

$A\in\mathbb R^{m\times n}$、$m\ge n$ とします。

第1列 $a_1$ に Householder 反射 $H_1$ を作用させれば、

$$
H_1a_1
=
(\alpha_1,0,\dots,0)^{\mathsf T}
$$

とできます。

次に左上1成分を固定し、残りの $(m-1)$ 次元部分だけへ Householder 反射を作用させて第2列の第3成分以下を0にします。

これを繰り返すと

$$
R
=
H_n\cdots H_2H_1A
$$

は対角より下の成分が0の上台形行列になります。正方行列なら上三角行列です。

各 $H_k$ は直交かつ $H_k^{-1}=H_k$ なので

$$
Q
=
H_1H_2\cdots H_n
$$

と置けば

$$
\boxed{
A=QR,
\qquad
Q^{\mathsf T}Q=I
}
$$

です。

Gram--Schmidt が「列から正規直交基底を作る」のに対し、Householder 法は「直交変換で下側成分を消す」という見方です。

---

## 9. QR が最小二乗で重要な理由

列フルランクの $X\in\mathbb R^{m\times n}$ に対し、この節では

$$
\kappa_2(X)
:=
\frac{\sigma_{\max}(X)}{\sigma_{\min}(X)}
$$

と置きます。正方可逆行列では NA1 の2-ノルム行列条件数と一致します。

この $X$ に対して最小二乗問題

$$
\min_\beta\|y-X\beta\|_2
$$

を正規方程式

$$
X^{\mathsf T}X\beta
=
X^{\mathsf T}y
$$

で解くことは理論上可能です。

しかし条件数の観点では不利です。

<a id="prop-na8-normal-equations-condition"></a>
<!-- formal-statement-start -->
### 命題（正規方程式は2-ノルム条件数を二乗する）

列フルランク行列 $X\in\mathbb R^{m\times n}$ に対し、

$$
\boxed{
\kappa_2(X^{\mathsf T}X)
=
\kappa_2(X)^2
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X$ の最大・最小特異値を

$$
\sigma_{\max},
\qquad
\sigma_{\min}>0
$$

とします。

$X^{\mathsf T}X$ の固有値は $X$ の特異値の二乗なので、実対称正定値行列 $X^{\mathsf T}X$ の最大・最小特異値も

$$
\sigma_{\max}^2,
\qquad
\sigma_{\min}^2
$$

です。

NA1 の [条件数と特異値の関係](../NA1/index.md#prop-na1-condition-singular-values)より

$$
\kappa_2(X^{\mathsf T}X)
=
\frac{\sigma_{\max}^2}{\sigma_{\min}^2}
=
\left(
\frac{\sigma_{\max}}{\sigma_{\min}}
\right)^2
=
\kappa_2(X)^2.
$$
<!-- proof-end -->

一方、薄い QR 分解

$$
X=QR
$$

を使えば

$$
\|y-X\beta\|_2^2
=
\|Q^{\mathsf T}y-R\beta\|_2^2
+
\|(I-QQ^{\mathsf T})y\|_2^2
$$

なので、最小化は

$$
R\beta=Q^{\mathsf T}y
$$

という上三角連立方程式へ帰着します。

数値的には、$X^{\mathsf T}X$ を明示的に作って条件数を二乗するより、QR 分解を直接使う方が有利です。

---

## 10. 残差を必ず元の方程式へ戻す

計算結果を $\widetilde x$ とします。

NA1 で定義した残差は

$$
r=b-A\widetilde x.
$$

[A を固定して右辺だけを摂動するときの後方誤差](../NA1/index.md#prop-na1-residual-backward-error)は

$$
\boxed{
\eta_b
=
\frac{\|r\|_2}{\|b\|_2}
}
$$

です。

さらに [前方誤差と条件数の評価](../NA1/index.md#cor-na1-forward-backward-condition)から

$$
\boxed{
\frac{\|\widetilde x-x\|_2}{\|x\|_2}
\le
\kappa_2(A)
\frac{\|r\|_2}{\|b\|_2}
}
$$

を得ます。

したがって

~~~text
残差が小さい
  ↓
近くの右辺に対しては正しい

条件数も小さい
  ↓
元の解にも近い
~~~

という二段階で評価する必要があります。

小さい残差だけを見て「解は高精度」と結論してはいけません。

---

## 11. どの直接法を使うか

### 11.1 一般の密な正方行列

基本選択は

$$
PA=LU
$$

です。

- 部分ピボット選択で零・小ピボットを避ける
- 分解後は前進代入と後退代入
- 同じ $A$ で右辺が多数あると分解を再利用できる

という利点があります。

### 11.2 実対称正定値行列

基本選択は

$$
A=LL^{\mathsf T}
$$

という Cholesky 分解です。

- 対称性を利用できる
- 一般 LU より計算量・記憶量を減らせる
- ピボット選択なしで進められる

という構造上の利点があります。

### 11.3 最小二乗・直交構造を保ちたい問題

QR 分解を使います。

- Householder 反射は直交変換
- 2-ノルムを保つ
- 正規方程式のように条件数を二乗しない

ことが重要です。

### 11.4 逆行列を作る必要はない

$Ax=b$ を解きたいだけなら、

$$
A^{-1}
$$

全体を計算する必要はありません。

~~~text
一般行列      → PA=LU
対称正定値    → A=LL^T
最小二乗      → A=QR
                    ↓
             三角連立方程式
~~~

という分解の方が、計算量と誤差解析の両面で自然です。

---

## 12. 演習

### NA8-A01 前進代入

- Level: A
- 目安時間: 8分

$$
\begin{pmatrix}
2&0&0\\
-1&1&0\\
4&2&-2
\end{pmatrix}
x
=
\begin{pmatrix}
2\\0\\2
\end{pmatrix}
$$

を前進代入で解け。

<!-- solution-start -->
#### 詳細解答

第1行から

$$
2x_1=2
$$

なので

$$
x_1=1.
$$

第2行は

$$
-x_1+x_2=0
$$

だから

$$
-1+x_2=0,
\qquad
x_2=1.
$$

第3行は

$$
4x_1+2x_2-2x_3=2.
$$

すでに求めた値を代入すると

$$
4+2-2x_3=2.
$$

従って

$$
-2x_3=-4,
\qquad
x_3=2.
$$

よって

$$
\boxed{
x=
\begin{pmatrix}
1\\1\\2
\end{pmatrix}
}.
$$
<!-- solution-end -->

### NA8-A02 Gauss 消去と LU 分解

- Level: A
- 目安時間: 15分

$$
A=
\begin{pmatrix}
2&1&1\\
4&-6&0\\
-2&7&2
\end{pmatrix}
$$

について、行交換なしの Gauss 消去を行い、$A=LU$ を求めよ。

さらに

$$
b=
\begin{pmatrix}
3\\-8\\10
\end{pmatrix}
$$

に対する $Ax=b$ を、その LU 分解を用いて解け。

<!-- solution-start -->
#### 詳細解答

第1ピボットは $2$ です。

第2行の消去乗数は

$$
m_{21}=\frac42=2.
$$

従って

$$
R_2\leftarrow R_2-2R_1
$$

より

$$
R_2=(0,-8,-2).
$$

第3行の消去乗数は

$$
m_{31}=\frac{-2}{2}=-1.
$$

従って

$$
R_3\leftarrow R_3+R_1
$$

より

$$
R_3=(0,8,3).
$$

次のピボットは $-8$ で、

$$
m_{32}
=
\frac{8}{-8}
=
-1.
$$

従って

$$
R_3\leftarrow R_3+R_2
$$

として

$$
R_3=(0,0,1).
$$

よって

$$
U=
\begin{pmatrix}
2&1&1\\
0&-8&-2\\
0&0&1
\end{pmatrix}.
$$

消去乗数を下三角へ並べると

$$
L=
\begin{pmatrix}
1&0&0\\
2&1&0\\
-1&-1&1
\end{pmatrix}.
$$

実際に $LU=A$ です。

次に

$$
Ly=b
$$

を解きます。

第1行から

$$
y_1=3.
$$

第2行から

$$
2y_1+y_2=-8
$$

なので

$$
y_2=-14.
$$

第3行から

$$
-y_1-y_2+y_3=10
$$

なので

$$
-3+14+y_3=10,
\qquad
y_3=-1.
$$

従って

$$
y=
\begin{pmatrix}
3\\-14\\-1
\end{pmatrix}.
$$

最後に

$$
Ux=y
$$

を後退代入します。

第3行から

$$
x_3=-1.
$$

第2行から

$$
-8x_2-2x_3=-14
$$

なので

$$
-8x_2+2=-14,
\qquad
x_2=2.
$$

第1行から

$$
2x_1+x_2+x_3=3
$$

なので

$$
2x_1+2-1=3,
\qquad
x_1=1.
$$

よって

$$
\boxed{
x=
\begin{pmatrix}
1\\2\\-1
\end{pmatrix}
}.
$$
<!-- solution-end -->

### NA8-A03 部分ピボット選択

- Level: A
- 目安時間: 8分

$$
A=
\begin{pmatrix}
0&2\\
1&3
\end{pmatrix}
$$

に部分ピボット選択を適用し、$P,L,U$ を求めよ。

<!-- solution-start -->
#### 詳細解答

第1列の未処理成分は $0,1$ です。

絶対値最大は第2行の $1$ なので、第1行と第2行を交換します。

$$
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}.
$$

すると

$$
PA
=
\begin{pmatrix}
1&3\\
0&2
\end{pmatrix}.
$$

すでに上三角なので消去乗数は0です。

従って

$$
L=I_2,
\qquad
U=
\begin{pmatrix}
1&3\\
0&2
\end{pmatrix}.
$$

よって

$$
\boxed{
PA=LU
}
$$

です。
<!-- solution-end -->

### NA8-A04 Cholesky 分解

- Level: A
- 目安時間: 12分

$$
A=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
6\\5
\end{pmatrix}
$$

について Cholesky 分解を求め、その分解を用いて $Ax=b$ を解け。

<!-- solution-start -->
#### 詳細解答

$$
L=
\begin{pmatrix}
\ell_{11}&0\\
\ell_{21}&\ell_{22}
\end{pmatrix}
$$

と置きます。

$$
LL^{\mathsf T}
=
\begin{pmatrix}
\ell_{11}^2&\ell_{11}\ell_{21}\\
\ell_{11}\ell_{21}&\ell_{21}^2+\ell_{22}^2
\end{pmatrix}
$$

なので

$$
\ell_{11}^2=4.
$$

対角成分を正に取るため

$$
\ell_{11}=2.
$$

次に

$$
2\ell_{21}=2
$$

より

$$
\ell_{21}=1.
$$

最後に

$$
1+\ell_{22}^2=3
$$

より

$$
\ell_{22}=\sqrt2.
$$

従って

$$
L=
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}.
$$

まず

$$
Ly=b
$$

を解きます。

$$
2y_1=6
\quad\Longrightarrow\quad
y_1=3.
$$

$$
y_1+\sqrt2\,y_2=5
$$

より

$$
\sqrt2\,y_2=2,
\qquad
y_2=\sqrt2.
$$

次に

$$
L^{\mathsf T}x=y
$$

を解きます。

第2行から

$$
\sqrt2\,x_2=\sqrt2
$$

なので

$$
x_2=1.
$$

第1行から

$$
2x_1+x_2=3
$$

なので

$$
x_1=1.
$$

従って

$$
\boxed{
x=
\begin{pmatrix}
1\\1
\end{pmatrix}
}.
$$
<!-- solution-end -->

### NA8-B01 首座主小行列式とピボット選択なし消去

- Level: B
- 目安時間: 18分

$$
A(t)
=
\begin{pmatrix}
1&1&0\\
1&t&1\\
0&1&1
\end{pmatrix}
$$

を考える。

1. 行交換なしの Gauss 消去が非零ピボットで完走し、可逆な $U$ を持つ LU ソルバとして使える $t$ の条件を求めよ。
2. $t=1$ では $A(1)$ が可逆であるにもかかわらず行交換なしの消去が失敗することを確認せよ。
3. $t=2$ では何が起きるか。

<!-- solution-start -->
#### 詳細解答

左上の首座主小行列式を順に計算します。

1次では

$$
D_1=1.
$$

2次では

$$
D_2
=
\det
\begin{pmatrix}
1&1\\
1&t
\end{pmatrix}
=
t-1.
$$

3次では

$$
\begin{aligned}
D_3
&=
\det
\begin{pmatrix}
1&1&0\\
1&t&1\\
0&1&1
\end{pmatrix}\\
&=
1\cdot(t-1)
-
1\cdot(1-0)\\
&=
t-2.
\end{aligned}
$$

本文の定理より、行交換なしの Gauss 消去が非零ピボットで完走し、可逆な $U$ を得るための必要十分条件は

$$
D_1D_2D_3\ne0
$$

です。

$D_1=1$ は常に非零なので

$$
\boxed{
t\ne1,\quad t\ne2
}
$$

が条件です。

$t=1$ では

$$
\det A(1)=D_3=-1\ne0
$$

なので行列は可逆です。

しかし第1段階で

$$
R_2\leftarrow R_2-R_1
$$

とすると第2行は

$$
(0,0,1)
$$

となり、第2ピボットが0です。従って行交換なしでは進めません。

これは「可逆性」と「現在の行順での LU 分解可能性」が別である例です。

$t=2$ では

$$
\det A(2)=D_3=0
$$

なので $A(2)$ 自体が特異です。したがって $U$ の最後の対角成分も0となり、一意解を与える正方連立方程式ソルバとしては使えません。

ここで「特異行列には LU 表示が一切存在しない」と主張しているわけではありません。問題にしているのは、非零対角の $U$ を得て連立方程式を一意に解く直接法として完走できるかです。
<!-- solution-end -->

### NA8-B02 Householder QR

- Level: B
- 目安時間: 20分

$$
A=
\begin{pmatrix}
3&1\\
4&2
\end{pmatrix}
$$

について、第一列を $(-5,0)^{\mathsf T}$ へ写す Householder 反射を構成し、それを用いて QR 分解を求めよ。

<!-- solution-start -->
#### 詳細解答

第一列は

$$
x=
\begin{pmatrix}
3\\4
\end{pmatrix},
\qquad
\|x\|_2=5.
$$

$x_1=3>0$ なので

$$
\alpha=-5.
$$

従って

$$
v=x-\alpha e_1
=
\begin{pmatrix}
3\\4
\end{pmatrix}
-
\begin{pmatrix}
-5\\0
\end{pmatrix}
=
\begin{pmatrix}
8\\4
\end{pmatrix}.
$$

$$
v^{\mathsf T}v
=
64+16
=
80.
$$

従って

$$
\begin{aligned}
H
&=
I-2\frac{vv^{\mathsf T}}{v^{\mathsf T}v}\\
&=
I-\frac1{40}
\begin{pmatrix}
64&32\\
32&16
\end{pmatrix}\\
&=
\begin{pmatrix}
-3/5&-4/5\\
-4/5&3/5
\end{pmatrix}.
\end{aligned}
$$

第一列への作用を確認すると

$$
H
\begin{pmatrix}
3\\4
\end{pmatrix}
=
\begin{pmatrix}
-5\\0
\end{pmatrix}.
$$

第二列には

$$
H
\begin{pmatrix}
1\\2
\end{pmatrix}
=
\begin{pmatrix}
-11/5\\
2/5
\end{pmatrix}.
$$

従って

$$
R
=
HA
=
\begin{pmatrix}
-5&-11/5\\
0&2/5
\end{pmatrix}.
$$

Householder 反射は

$$
H^{\mathsf T}=H,
\qquad
H^2=I
$$

なので

$$
A=HR.
$$

したがって一つの QR 分解は

$$
\boxed{
Q=
\begin{pmatrix}
-3/5&-4/5\\
-4/5&3/5
\end{pmatrix},
\qquad
R=
\begin{pmatrix}
-5&-11/5\\
0&2/5
\end{pmatrix}
}.
$$

$Q^{\mathsf T}Q=I$ も成り立ちます。

対角成分を正にそろえたい規約なら、$Q$ の対応する列と $R$ の対応する行の符号を同時に反転すればよいです。
<!-- solution-end -->

### NA8-B03 小さい残差と大きい前方誤差

- Level: B
- 目安時間: 18分

$$
A=
\begin{pmatrix}
1&0\\
0&10^{-4}
\end{pmatrix},
\qquad
b=
\begin{pmatrix}
1\\
10^{-4}
\end{pmatrix}
$$

を考える。

厳密解は $x=(1,1)^{\mathsf T}$ である。

近似解

$$
\widetilde x=
\begin{pmatrix}
1\\0
\end{pmatrix}
$$

について、

1. 相対残差 $\|r\|_2/\|b\|_2$ を求めよ。
2. 相対前方誤差 $\|\widetilde x-x\|_2/\|x\|_2$ を求めよ。
3. $\kappa_2(A)$ を求め、NA1 の前方誤差評価と比較せよ。

<!-- solution-start -->
#### 詳細解答

残差は

$$
r
=
b-A\widetilde x.
$$

まず

$$
A\widetilde x
=
\begin{pmatrix}
1\\0
\end{pmatrix}
$$

なので

$$
r
=
\begin{pmatrix}
0\\10^{-4}
\end{pmatrix}.
$$

従って

$$
\|r\|_2=10^{-4}.
$$

また

$$
\|b\|_2
=
\sqrt{1+10^{-8}}.
$$

よって相対残差は

$$
\boxed{
\frac{\|r\|_2}{\|b\|_2}
=
\frac{10^{-4}}{\sqrt{1+10^{-8}}}
\approx10^{-4}
}.
$$

次に

$$
\widetilde x-x
=
\begin{pmatrix}
0\\-1
\end{pmatrix}
$$

なので

$$
\|\widetilde x-x\|_2=1.
$$

一方

$$
\|x\|_2=\sqrt2.
$$

従って相対前方誤差は

$$
\boxed{
\frac1{\sqrt2}
\approx0.707
}.
$$

残差は約 $10^{-4}$ と小さいのに、解の相対誤差は約70.7%です。

最後に $A$ の特異値は

$$
1,\quad10^{-4}
$$

なので

$$
\boxed{
\kappa_2(A)=10^4
}.
$$

NA1 の評価は

$$
\frac{\|\widetilde x-x\|_2}{\|x\|_2}
\le
\kappa_2(A)
\frac{\|r\|_2}{\|b\|_2}
$$

でした。

右辺は

$$
10^4
\frac{10^{-4}}{\sqrt{1+10^{-8}}}
=
\frac1{\sqrt{1+10^{-8}}}
\approx1.
$$

実際の前方誤差 $1/\sqrt2$ はこの上界の範囲内です。

この例は、悪条件な問題では小さい残差だけから小さい前方誤差を結論できないことを示します。
<!-- solution-end -->

### NA8-C01 部分ピボット選択でも指数的要素成長は起こり得る

- Level: C
- 目安時間: 35分

$n\ge2$ とし、

$$
W_n=
\begin{pmatrix}
1&0&0&\cdots&0&1\\
-1&1&0&\cdots&0&1\\
-1&-1&1&\cdots&0&1\\
\vdots&\vdots&\vdots&\ddots&\vdots&\vdots\\
-1&-1&-1&\cdots&1&1\\
-1&-1&-1&\cdots&-1&1
\end{pmatrix}
$$

を考える。

各段階で絶対値最大の候補が同率なら現在のピボット行を選ぶ、という部分ピボット選択を行う。

1. すべての消去乗数の絶対値が1であることを示せ。
2. 第 $k$ 段階の消去後、未処理行の最終列が $2^k$ になることを帰納法で示せ。
3. 要素成長率が

$$
\boxed{
\rho=2^{n-1}
}
$$

となることを示せ。
4. この例が「部分ピボット選択は無意味」という主張を意味しない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

最初の列では、ピボット候補は

$$
1,-1,\dots,-1
$$

です。すべて絶対値1なので、規約により第1行の $1$ をピボットに使います。

下の各行では

$$
m_{i1}
=
\frac{-1}{1}
=
-1.
$$

従って

$$
R_i
\leftarrow
R_i-(-1)R_1
=
R_i+R_1.
$$

この操作により第1列は0になり、最終列は

$$
1+1=2
$$

になります。

一般に第 $k$ 段階へ入る時点で、第 $k$ 列のピボットは1、その下の未処理成分はすべて $-1$ のままです。

従って

$$
m_{ik}=-1
\qquad(i>k)
$$

であり、すべての消去乗数は

$$
\boxed{|m_{ik}|=1}
$$

です。

次に最終列の成長を示します。

第1段階後、未処理行の最終列は $2=2^1$ でした。

第 $k-1$ 段階後、未処理行の最終列が $2^{k-1}$ だと仮定します。

第 $k$ 段階では乗数が $-1$ なので、下の各未処理行へピボット行を加えます。ピボット行の最終列も $2^{k-1}$ です。

従って新しい最終列は

$$
2^{k-1}+2^{k-1}
=
2^k.
$$

よって帰納法により、第 $k$ 段階後の未処理行の最終列は

$$
\boxed{2^k}
$$

です。

最後の第 $n-1$ 段階後には、右下成分が

$$
2^{n-1}
$$

になります。

元の行列 $W_n$ の成分は $0,\pm1$ だけなので

$$
\max_{i,j}|(W_n)_{ij}|=1.
$$

一方、消去途中の最大絶対値は最終的に

$$
2^{n-1}
$$

へ達します。

従って要素成長率は

$$
\boxed{
\rho
=
\frac{2^{n-1}}1
=
2^{n-1}
}.
$$

この例では、部分ピボット選択によって乗数は確かに1以下へ抑えられています。それでも行の加算によって別の列の要素が積み重なり、指数的な成長が起きました。

したがって分かるのは、

> 部分ピボット選択だけから、すべての行列に対して小さい要素成長を一様保証することはできない

ということです。

一方、部分ピボット選択は零ピボットを避け、極端に小さいピボットに対する巨大な消去乗数を防ぎます。一般の密行列で実用上非常に有効であることと、最悪例で指数的成長があり得ることは両立します。

「最悪例がある」ことと「通常使う価値がない」ことを混同してはいけません。
<!-- solution-end -->

---

## 13. この章の要点

直接法の骨格は

~~~text
一般の正方行列
  ↓
部分ピボット選択
  ↓
PA=LU
  ↓
前進代入 + 後退代入

実対称正定値
  ↓
A=LL^T
  ↓
前進代入 + 後退代入

最小二乗・直交構造
  ↓
Householder QR
  ↓
上三角連立方程式
~~~

です。

そして計算結果は必ず

~~~text
残差
  ↓
後方誤差
  ↓
条件数
  ↓
前方誤差
~~~

という NA1 の枠組みに戻して評価します。

次の NA9 では、行列を分解して有限回で解く直接法から離れ、

- Jacobi 法
- Gauss--Seidel 法
- 共役勾配法
- Krylov 部分空間
- 前処理

という **反復法**へ進みます。
