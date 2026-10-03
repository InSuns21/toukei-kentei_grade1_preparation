# F0-00F 線形写像・表現行列・基底変換・対角化

F0-00E で、ベクトル空間・基底・次元・座標を準備しました。基底を選べば一つのベクトルを座標ベクトルで表せますが、まだ「空間から空間への操作」そのものを、基底に依存しない形では整理していません。

たとえば同じ変換でも、基底を変えると行列の数字は変わります。数字だけを本体だと思うと、「別の行列になったのに、なぜ同じ変換と言えるのか」「なぜ固有ベクトルを基底にすると対角行列になるのか」がつながりません。

そこで、まず**加法と実数倍を保つ写像**を線形写像として取り出し、その写像を基底で座標化して行列を作ります。さらに基底を替えたとき行列がどう変わるかを追い、最後に写像の作用が倍率だけになる方向を固有ベクトルとして捉えます。中心線は

**線形写像 → 核・像 → 核・像の次元関係 → 表現行列 → 基底変換 → 相似 → 固有空間 → 対角化**

です。

## 0. 具体例を先に見る：同じ写像が対角行列になるまで

抽象記号へ入る前に、この講義全体で何をするのかを $\mathbb R^2$ の一例で見ます。

$$
T(x,y)=(2x+y,x+2y)
$$

とします。標準基底

$$
e_1=(1,0)^T,
\qquad
e_2=(0,1)^T
$$

では

$$
T(e_1)=(2,1)^T,
\qquad
T(e_2)=(1,2)^T
$$

なので、表現行列は

$$
A=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

ところが

$$
v_1=(1,1)^T,
\qquad
v_2=(1,-1)^T
$$

を使うと

$$
T(v_1)=3v_1,
\qquad
T(v_2)=v_2.
$$

したがって新しい基底

$$
\mathcal B'=(v_1,v_2)
$$

では同じ写像が

$$
D=
\begin{pmatrix}
3&0\\
0&1
\end{pmatrix}
$$

と対角行列で表されます。

新基底のベクトルを旧基底の座標で列に並べると

$$
P=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}.
$$

このとき

$$
AP=PD,
$$

したがって

$$
D=P^{-1}AP.
$$

ここで起きたことを言葉にすると、

<pre>
抽象的な線形写像 T
  ↓ 基底を選ぶ
行列 A が現れる
  ↓ 固有ベクトルを基底に選び直す
同じ T の行列が D へ変わる
  ↓
D は対角なので作用が「方向ごとの倍率」に分解される
</pre>

です。

### 0.1 直感：何が本体で、何が座標表示か

| 本体 | 基底を選ぶと見えるもの |
|---|---|
| 線形写像 $T$ | 表現行列 $[T]$ |
| ベクトル $x$ | 座標ベクトル $[x]$ |
| 同じ写像を別基底で見る | 相似変換 $P^{-1}AP$ |
| 固有方向 | 固有ベクトルの座標 |
| 固有ベクトル基底が存在する | 対角化可能 |

この章の一般式は、すべてこの一例を任意のベクトル空間・任意の基底へ拡張したものです。まずこの図を持ち、必要になったところで一般式へ戻ってください。

---

## 1. 線形写像

ベクトル空間を用意しただけでは、空間から空間への写像のうち、線形構造を保つものを区別できません。加法とスカラー倍を保つ写像に絞ると、基底ベクトルへの作用から任意のベクトルへの作用を復元できます。

<a id="def-f0-00f-linear-map"></a>

<!-- formal-statement-start -->
> **定義（線形写像）**  
> ベクトル空間 $V,W$ の間の写像 $T:V\to W$ が、任意の $x,y\in V$ と $a,b\in\mathbb R$ に対して

$$
T(ax+by)=aT(x)+bT(y)
$$

> を満たすとき、$T$ を **線形写像** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f-linear-map -->
### 1.1 例：$\mathbb R^2$ 上の線形写像を定義から確認する

**定義の確認**

$$
T(x_1,x_2)=(2x_1+x_2, x_1+2x_2)
$$

とします。$x=(x_1,x_2)$、$y=(y_1,y_2)$、$a,b\in\mathbb R$ に対して

$$
\begin{aligned}
T(ax+by)
&=
T(ax_1+by_1, ax_2+by_2)\\
&=
\bigl(2(ax_1+by_1)+(ax_2+by_2),\
(ax_1+by_1)+2(ax_2+by_2)\bigr)\\
&=
aT(x)+bT(y).
\end{aligned}
$$

任意の $x,y,a,b$ で定義式が成り立つので、$T$ は線形写像です。
<!-- definition-example-end -->

加法とスカラー倍を保存する写像です。

特に

$$
T(0)=0
$$

が必ず成り立ちます。

---

## 2. 核と像

線形写像を一つ得たら、次に知りたいのは「どの入力が0へ潰れるか」と「出力側のどこまで到達できるか」です。この二つを部分空間として記録すると、方程式の解の自由度と写像の到達範囲を同じ枠組みで扱えます。

<a id="def-f0-00f-kernel-image"></a>

<!-- formal-statement-start -->
> **定義（核と像）**  
> 線形写像 $T:V\to W$ に対して

$$
\ker T
=
\{x\in V:T(x)=0\},
\qquad
\operatorname{Im}T
=
\{T(x):x\in V\}
$$

> をそれぞれ **核（kernel）**、**像（image）** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f-kernel-image -->
### 2.1 例：核と像を集合として直接求める

**定義の確認**

$$
T:\mathbb R^2\to\mathbb R^2,
\qquad
T(u,v)=(u,0)
$$

を考えます。$T(u,v)=0$ となるのは $u=0$ のときなので

$$
\ker T
=
\{(0,v):v\in\mathbb R\}
=
\operatorname{span}\{(0,1)\}.
$$

一方、出力は常に $(u,0)$ の形で、任意の $(u,0)$ は実際に $T(u,0)$ として得られるため

$$
\operatorname{Im}T
=
\{(u,0):u\in\mathbb R\}
=
\operatorname{span}\{(1,0)\}.
$$

これは核と像の定義をそのまま集合として確認しています。
<!-- definition-example-end -->

どちらも線形部分空間です。

- $\ker T$：写像によって0へ潰れる方向
- $\operatorname{Im}T$：出力として到達できる方向

という意味です。

---

## 3. 階数・退化次数の定理

有限次元の線形写像では、「入力の自由度」がどこへ行ったかを次の式で数えられます。

<a id="thm-f0-00f-01"></a>
 
<!-- formal-statement-start -->
> **定理（階数・退化次数の定理）**  
> 有限次元ベクトル空間 $V$ と線形写像 $T:V\to W$ に対して
$$
\boxed{
\dim V
=
\dim\ker T
+
\dim\operatorname{Im}T
}
$$
> が成り立つ。
<!-- formal-statement-end -->

### 3.1 意味：潰れた方向 + 生き残った方向 = 入力の次元

- $\dim\ker T$ は、$T$ によって0へ潰れる独立な方向の本数。
- $\dim\operatorname{Im}T$ は、出力側へ実際に届く独立な方向の本数。

したがって定理は

> **入力の自由度 = 消えた自由度 + 出力として残った自由度**

と読めます。

### 3.2 具体例：射影では1方向が潰れる

$$
T:\mathbb R^2\to\mathbb R^2,
\qquad
T(x,y)=(x,0)
$$

なら

$$
\ker T=\operatorname{span}((0,1)^T),
\qquad
\operatorname{Im}T=\operatorname{span}((1,0)^T).
$$

したがって

$$
2=1+1
$$

です。行列のrankを単なる掃き出し計算として覚えるより、何本の方向が残ったかを数えていると理解できます。

### 3.3 証明の見取り図

$\ker T$ の基底を取り、それを $V$ 全体の基底へ延長します。追加した基底ベクトルの像が、ちょうど $\operatorname{Im}T$ の基底になることを示せば次元を数えられます。

<!-- proof-start -->
### 証明

$V$ を有限次元とし

$$
\dim V=n
$$

とします。

$\ker T$ の基底を

$$
u_1,\dots,u_r
$$

と取ります。

[F0-00Eの基底延長定理](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#thm-basis-extension)により、これを $V$ の基底

$$
u_1,\dots,u_r,v_1,\dots,v_{n-r}
$$

へ延長できます。

任意の $x\in V$ は

$$
x
=
\sum_{i=1}^r a_i u_i
+
\sum_{j=1}^{n-r} b_j v_j
$$

と書けるので

$$
T(x)
=
\sum_{j=1}^{n-r}b_jT(v_j).
$$

したがって

$$
\operatorname{Im}T
=
\operatorname{span}(T(v_1),\dots,T(v_{n-r})).
$$

さらに $T(v_1),\dots,T(v_{n-r})$ は一次独立です。

もし

$$
\sum_{j=1}^{n-r} c_jT(v_j)=0
$$

なら、線形性から

$$
T\left(\sum_{j=1}^{n-r}c_jv_j\right)
=
\sum_{j=1}^{n-r} c_jT(v_j)
=
0.
$$

したがって

$$
\sum_{j=1}^{n-r}c_jv_j\in\ker T.
$$

$u_1,\dots,u_r$ は $\ker T$ の基底なので、ある係数 $d_1,\dots,d_r$ が存在して

$$
\sum_{j=1}^{n-r}c_jv_j
=
\sum_{i=1}^{r}d_i u_i.
$$

両辺を移項すると

$$
\sum_{i=1}^{r}(-d_i)u_i
+
\sum_{j=1}^{n-r}c_jv_j
=
0.
$$

ところが

$$
u_1,\dots,u_r,v_1,\dots,v_{n-r}
$$

は $V$ の基底なので一次独立です。よって

$$
d_1=\cdots=d_r=0,
\qquad
c_1=\cdots=c_{n-r}=0.
$$

したがって $T(v_1),\dots,T(v_{n-r})$ は一次独立です。

よって

$$
\dim\operatorname{Im}T=n-r.
$$

したがって

$$
\dim V
=
\dim\ker T
+
\dim\operatorname{Im}T.
$$

$\square$
<!-- proof-end -->

---

## 4. 表現行列：行列は基底を選んだ後に現れる

線形写像 $T:V\to W$ は、抽象的には「ベクトルを別のベクトルへ送る規則」です。このままでは数値計算に使いにくいので、入力側と出力側で基底を選び、**基底ベクトルがどこへ送られるかを座標で記録して、任意の入力の像を行列積で計算できる形にしたい**と考えます。

$V$ の基底を

$$
\mathcal B=(v_1,\dots,v_n),
$$

$W$ の基底を

$$
\mathcal C=(w_1,\dots,w_m)
$$

とします。

各 $T(v_j)$ は $W$ の基底 $\mathcal C$ で一意に

$$
T(v_j)
=
\sum_{i=1}^m a_{ij}w_i
$$

と書けます。

<a id="def-f0-00f-representation-matrix"></a>

<!-- formal-statement-start -->
> **定義（表現行列）**  
> $V$ の基底 $\mathcal B=(v_1,\dots,v_n)$、$W$ の基底 $\mathcal C=(w_1,\dots,w_m)$ を選び、各 $T(v_j)$ の $\mathcal C$ 座標を列に並べた行列

$$
[T]_{\mathcal C\leftarrow\mathcal B}
=
\begin{pmatrix}
|&&|\\
[T(v_1)]_{\mathcal C}&\cdots&[T(v_n)]_{\mathcal C}\\
|&&|
\end{pmatrix}
$$

> を、基底 $\mathcal B,\mathcal C$ に関する $T$ の **表現行列** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f-representation-matrix -->
### 4.1 例：標準基底で表現行列を列から作る

**定義の確認**

冒頭の

$$
T(x,y)=(2x+y, x+2y)
$$

に対して、入力・出力の基底をともに標準基底
$mathcal E=(e_1,e_2)$ とします。このとき

$$
T(e_1)=(2,1)^T,
\qquad
T(e_2)=(1,2)^T.
$$

したがって定義どおり、この二つの座標ベクトルを列に並べれば

$$
[T]_{\mathcal E\leftarrow\mathcal E}
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

実際、$[x]_{\mathcal E}=(x,y)^T$ に掛けると

$$
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
\begin{pmatrix}x\\y\end{pmatrix}
=
\begin{pmatrix}2x+y\\x+2y\end{pmatrix}
=
[T(x,y)]_{\mathcal E}.
$$
<!-- definition-example-end -->

この定義が任意のベクトルにどう作用するかを確認します。$x\in V$ を

$$
x=c_1v_1+\cdots+c_nv_n
$$

と書くと、

$$
[x]_{\mathcal B}
=
\begin{pmatrix}
c_1\\
\vdots\\
c_n
\end{pmatrix}.
$$

線形性と

$$
T(v_j)=\sum_{i=1}^m a_{ij}w_i
$$

を順に使えば

$$
\begin{aligned}
T(x)
&=
T\left(\sum_{j=1}^n c_jv_j\right)\\
&=
\sum_{j=1}^n c_jT(v_j)\\
&=
\sum_{j=1}^n c_j
\left(\sum_{i=1}^m a_{ij}w_i\right)\\
&=
\sum_{i=1}^m
\left(\sum_{j=1}^n a_{ij}c_j\right)w_i.
\end{aligned}
$$

したがって $\mathcal C$ 座標は

$$
[T(x)]_{\mathcal C}
=
\begin{pmatrix}
\sum_j a_{1j}c_j\\
\vdots\\
\sum_j a_{mj}c_j
\end{pmatrix}
=
[T]_{\mathcal C\leftarrow\mathcal B}
[x]_{\mathcal B}.
$$

つまり

$$
\boxed{
[T(x)]_{\mathcal C}
=
[T]_{\mathcal C\leftarrow\mathcal B}
[x]_{\mathcal B}
}
$$

であり、行列は抽象的な線形写像そのものではなく

> **入力基底と出力基底を選んだときの座標表示**

です。

### 4.1 最初の具体例へ戻る

$T(x,y)=(2x+y,x+2y)$ では、標準基底を選んだため

$$
[T]_{\mathcal E\leftarrow\mathcal E}
=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

となりました。もし基底を変えれば数値の並びは変わりますが、抽象的な写像 $T$ 自体は変わりません。

この「本体と座標表示を分ける」視点が、基底変換と相似の混乱を防ぎます。

---

## 5. なぜ行列の第 $j$ 列が $T(v_j)$ なのか

基底ベクトル $v_j$ の座標は

$$
[v_j]_{\mathcal B}=e_j
$$

です。

したがって

$$
[T(v_j)]_{\mathcal C}
=
[T]_{\mathcal C\leftarrow\mathcal B}e_j.
$$

行列に $e_j$ を掛けると第 $j$ 列が取り出されるので、表現行列の第 $j$ 列は $T(v_j)$ の座標になります。

標準基底の場合に「行列の各列が基底ベクトルの行き先」と習ったのは、この一般論の特殊例です。

---

## 6. 合成と行列積

$$
T:V\to W,
\qquad
S:W\to U
$$

を線形写像とします。

基底を

$$
\mathcal B\text{ on }V,
\quad
\mathcal C\text{ on }W,
\quad
\mathcal D\text{ on }U
$$

とすると

$$
[(S\circ T)(x)]_{\mathcal D}
=
[S]_{\mathcal D\leftarrow\mathcal C}
[T]_{\mathcal C\leftarrow\mathcal B}
[x]_{\mathcal B}.
$$

右辺は任意の $x\in V$ の $\mathcal B$ 座標を、まず $T$ によって $\mathcal C$ 座標へ、次に $S$ によって $\mathcal D$ 座標へ送っています。したがって合成写像 $S\circ T$ の表現行列は

$$
\boxed{
[S\circ T]_{\mathcal D\leftarrow\mathcal B}
=
[S]_{\mathcal D\leftarrow\mathcal C}
[T]_{\mathcal C\leftarrow\mathcal B}
}
$$

です。

行列積の順序が「右から作用する」理由は、写像の合成そのものです。

---

## 7. 基底変換行列

同じベクトル空間 $V$ に二つの基底

$$
\mathcal B=(v_1,\dots,v_n),
\qquad
\mathcal B'=(v'_1,\dots,v'_n)
$$

を取ります。

新基底の座標から旧基底の座標へ移す行列を

$$
P
=
[I]_{\mathcal B\leftarrow\mathcal B'}
$$

とします。

すると任意の $x\in V$ について

$$
\boxed{
[x]_{\mathcal B}
=P[x]_{\mathcal B'}
}
$$

です。

$P$ の第 $j$ 列は

$$
[v'_j]_{\mathcal B}
$$

です。

逆向きの恒等写像の表現行列を

$$
R=[I]_{\mathcal B'\leftarrow\mathcal B}
$$

と置きます。恒等写像を往復させると $I\circ I=I$ なので、合成と行列積の対応から

$$
RP=I,
\qquad
PR=I.
$$

したがって $P$ は正則で

$$
R=P^{-1}.
$$

よって逆向きの座標変換は

$$
[x]_{\mathcal B'}
=P^{-1}[x]_{\mathcal B}
$$

です。

### 7.1 具体例：固有ベクトル基底への座標変換

最初の例では

$$
P=
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

の列が新基底 $v_1=(1,1)^T,v_2=(1,-1)^T$ でした。

旧座標 $[x]_{\mathcal E}$ と新座標 $[x]_{\mathcal B'}$ の関係は

$$
[x]_{\mathcal E}=P[x]_{\mathcal B'}.
$$

つまり $P$ は「新しい座標値を、標準基底で見たベクトルへ組み立てる行列」です。向きを暗記するより、**列に何を並べたか**から判断できます。

---

## 8. 同じ線形写像の行列表現は相似になる

今度は自己写像

$$
T:V\to V
$$

を考えます。

基底 $\mathcal B$ に関する行列を

$$
A=[T]_{\mathcal B\leftarrow\mathcal B},
$$

基底 $\mathcal B'$ に関する行列を

$$
A'=[T]_{\mathcal B'\leftarrow\mathcal B'}
$$

とします。

$$
[x]_{\mathcal B}=P[x]_{\mathcal B'}
$$

なので

$$
[T(x)]_{\mathcal B}
=A[x]_{\mathcal B}
=AP[x]_{\mathcal B'}.
$$

一方

$$
[T(x)]_{\mathcal B}
=P[T(x)]_{\mathcal B'}
=PA'[x]_{\mathcal B'}.
$$

全ての座標ベクトルについて等しいので

$$
AP=PA'.
$$

したがって

<a id="def-f0-00f-similarity"></a>

<!-- formal-statement-start -->
> **定義（相似）**  
> 正方行列 $A,A'$ に対し、ある正則行列 $P$ が存在して

$$
A'=P^{-1}AP
$$

> と書けるとき、$A$ と $A'$ は **相似** であるといいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f-similarity -->
### 8.1 例：同じ写像の二つの表現行列が相似であることを確認する

**定義の確認**

冒頭の

$$
A=
\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
P=
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

では

$$
P^{-1}
=
\frac12
\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

したがって

$$
\begin{aligned}
P^{-1}AP
&=
\frac12
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
\begin{pmatrix}2&1\\1&2\end{pmatrix}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}\\
&=
\begin{pmatrix}3&0\\0&1\end{pmatrix}
=:D.
\end{aligned}
$$

正則行列 $P$ が存在して $D=P^{-1}AP$ と書けたので、定義より $A$ と $D$ は相似です。
<!-- definition-example-end -->

相似な行列は違う行列に見えても、同じ線形写像を別の基底で見ているだけです。

---

## 9. 固有値・固有ベクトル・固有空間

表現行列を作れても、そのままでは作用の本質的な方向が見えにくいことがあります。そこで、作用させても向きが変わらず、倍率だけが変わる非零ベクトルを探し、その倍率と対応する方向を記録します。

<a id="def-f0-00f-eigen-data"></a>

<!-- formal-statement-start -->
> **定義（固有値・固有ベクトル・固有空間）**  
> 自己写像 $T:V\to V$ に対して、$v\ne0$ が

$$
T(v)=\lambda v
$$

> を満たすとき、$\lambda$ を **固有値**、$v$ を **固有ベクトル** といいます。また

$$
E_\lambda=\ker(T-\lambda I)
$$

> を固有値 $\lambda$ に対応する **固有空間** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f-eigen-data -->
### 9.1 例：固有値・固有ベクトル・固有空間を同時に確認する

**定義の確認**

$$
A=
\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
v=
\begin{pmatrix}1\\1\end{pmatrix}
$$

とすると

$$
Av=
\begin{pmatrix}3\\3\end{pmatrix}
=
3v.
$$

$v\ne0$ なので、定義より $3$ は固有値、$v$ は固有値 $3$ に属する固有ベクトルです。また

$$
A-3I
=
\begin{pmatrix}-1&1\\1&-1\end{pmatrix}
$$

だから

$$
E_3
=
\ker(A-3I)
=
\operatorname{span}
\left\{
\begin{pmatrix}1\\1\end{pmatrix}
\right\}.
$$

これで固有空間の定義 $E_\lambda=\ker(A-\lambda I)$ まで直接確認できました。
<!-- definition-example-end -->

固有ベクトルは「写像を掛けても向きが変わらず、倍率だけが $\lambda$ になる方向」です。

行列 $A$ で固有値を求めるときは、定義

$$
Av=\lambda v
$$

をまず

$$
(A-\lambda I)v=0
$$

へ移します。固有ベクトルは $v\ne0$ なので、この同次方程式には非零解が必要です。正方行列 $A-\lambda I$ について

$$
(A-\lambda I)v=0
\text{ が非零解を持つ}
\iff
A-\lambda I\text{ が正則でない}
$$

です。ここで F0-00 で使った正方行列の判定 $M\text{ が正則}\iff\det M\ne0$ を $M=A-\lambda I$ に適用すると

$$
A-\lambda I\text{ が正則でない}
\iff
\det(A-\lambda I)=0.
$$

したがって

$$
\boxed{
\det(A-\lambda I)=0
}
$$

を解けば固有値の候補を得られます。

---

## 10. 異なる固有値の固有ベクトルは一次独立

<a id="thm-f0-00f-distinct-eigenvectors-independent"></a>

<!-- formal-statement-start -->
> **定理（異なる固有値に属する固有ベクトルは一次独立）**  
> ベクトル空間 $V$ の線形自己写像 $T:V\to V$ が互いに異なる固有値
>
> $$
> \lambda_1,\dots,\lambda_k
> $$
>
> を持ち、それぞれに対応する固有ベクトルを $v_1,\dots,v_k$ とする。このとき
>
> $$
> v_1,\dots,v_k
> $$
>
> は一次独立である。
<!-- formal-statement-end -->

### 10.1 証明の見取り図

異なる固有値 $\lambda_i$ の固有ベクトルを一次結合して0になったと仮定します。最後の固有値 $\lambda_k$ を消すために

$$
T-\lambda_kI
$$

を作用させると、$v_k$ の項だけが消え、残りは係数 $\lambda_i-\lambda_k\ne0$ を伴います。これを帰納法で繰り返すと全係数が0になります。

「固有値が違う」ことを、$T-\lambda I$ で一方向ずつ分離する証明です。

<!-- proof-start -->
### 証明

$k$ に関する帰納法で示します。

まず $k=1$ の場合、$a_1v_1=0$ とすると固有ベクトルは $v_1\ne0$ なので $a_1=0$ です。

次に $k-1$ 個までの場合に主張が成り立つと仮定し、

$$
a_1v_1+\cdots+a_kv_k=0
$$

とします。両辺に $T-\lambda_kI$ を作用させます。各 $i$ について $T(v_i)=\lambda_i v_i$ だから

$$
\begin{aligned}
0
&=
(T-\lambda_kI)
\left(
\sum_{i=1}^k a_iv_i
\right)\\
&=
\sum_{i=1}^k
a_i(T(v_i)-\lambda_kv_i)\\
&=
\sum_{i=1}^k
a_i(\lambda_i-\lambda_k)v_i\\
&=
\sum_{i=1}^{k-1}
a_i(\lambda_i-\lambda_k)v_i.
\end{aligned}
$$

$v_1,\dots,v_{k-1}$ は互いに異なる固有値に属するので、帰納法の仮定より一次独立です。したがって各 $i=1,\dots,k-1$ について

$$
a_i(\lambda_i-\lambda_k)=0.
$$

さらに $\lambda_i\ne\lambda_k$ なので

$$
a_1=\cdots=a_{k-1}=0.
$$

これを元の関係式へ戻すと

$$
a_kv_k=0.
$$

$v_k\ne0$ だから $a_k=0$ です。よって全ての係数が0であり、$v_1,\dots,v_k$ は一次独立です。

<!-- proof-end -->
---

## 11. 対角化とは何か

固有ベクトルが少数見つかるだけでは、写像全体を簡単な形にはできません。もし固有ベクトルだけで空間の基底を作れれば、その基底では各基底ベクトルが独立に倍率を受けるだけになり、表現行列は対角行列になります。

<a id="def-f0-00f-diagonalizable"></a>

<!-- formal-statement-start -->
> **定義（対角化可能）**  
> 自己写像 $T:V\to V$ が **対角化可能** であるとは、ある基底 $\mathcal B$ が存在して

$$
[T]_{\mathcal B\leftarrow\mathcal B}
=
\operatorname{diag}(\lambda_1,\dots,\lambda_n)
$$

> となることです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f-diagonalizable -->
### 11.1 例：固有ベクトル基底で対角化可能性を定義から確認する

**定義の確認**

冒頭の

$$
v_1=(1,1)^T,
\qquad
v_2=(1,-1)^T
$$

は一次独立で $\mathbb R^2$ の基底をなし、

$$
T(v_1)=3v_1,
\qquad
T(v_2)=v_2
$$

を満たします。したがって基底
$\mathcal B'=(v_1,v_2)$ に関する表現行列は

$$
[T]_{\mathcal B'\leftarrow\mathcal B'}
=
\begin{pmatrix}
3&0\\
0&1
\end{pmatrix}.
$$

ある基底で表現行列が対角行列になったので、定義より $T$ は対角化可能です。
<!-- definition-example-end -->

対角行列の第 $i$ 列は

$$
\lambda_i e_i
$$

なので、これは基底ベクトル $v_i$ が全て固有ベクトルであることと同値です。

したがって

> **対角化 = 固有ベクトルだけからなる基底を見つけること**

です。

行列 $A$ については

$$
\boxed{
A=PDP^{-1}
}
$$

と書けることに対応します。

$P$ の列は固有ベクトル、$D$ の対角成分は対応する固有値です。

---

## 12. 対角化可能性の基本判定

「対角化できる」とは、対角行列そのものを探すことではなく、**固有ベクトルを十分な本数そろえて基底にできること**です。その条件を、固有空間の言葉でも同じ内容として言い換えます。

<a id="thm-f0-00f-diagonalization-equivalences"></a>

<!-- formal-statement-start -->
> **定理（対角化可能性と固有空間直和の同値）**  
> $V$ を $n$ 次元ベクトル空間、$T:V\to V$ を線形自己写像とする。$T$ の固有値全体について対応する固有空間を $E_\lambda$ と書く。このとき次は同値である。
>
> 1. $T$ は対角化可能である。
> 2. $V$ は固有空間の直和
>    $$
>    V=\bigoplus_\lambda E_\lambda
>    $$
>    と書ける。
> 3. 固有ベクトルからなる $V$ の基底が存在する。
> 4. 固有空間の次元の和が
>    $$
>    \sum_\lambda \dim E_\lambda=n
>    $$
>    となる。
<!-- formal-statement-end -->

### 証明の見取り図

対角行列の各列は「対応する基底ベクトルを定数倍する」ことを表します。したがって 1 と 3 は同じ内容です。固有ベクトル基底を固有値ごとにまとめれば 2 が得られ、直和では次元が足し算になるので 4 へ進めます。逆に 4 なら各固有空間の基底を全部合わせた本数が $n$ になり、異なる固有空間のベクトルは互いに独立なので固有ベクトル基底が得られます。

<!-- proof-start -->
### 証明

**1 $\Rightarrow$ 3.**  
$T$ が対角化可能なら、ある基底

$$
\mathcal B=(v_1,\dots,v_n)
$$

について

$$
[T]_{\mathcal B\leftarrow\mathcal B}
=
\operatorname{diag}(\lambda_1,\dots,\lambda_n)
$$

です。表現行列の第 $i$ 列は $[T(v_i)]_{\mathcal B}$ なので

$$
[T(v_i)]_{\mathcal B}
=
\lambda_i e_i
=
[\lambda_i v_i]_{\mathcal B}.
$$

座標表示の一意性から

$$
T(v_i)=\lambda_i v_i.
$$

したがって各 $v_i$ は固有ベクトルであり、固有ベクトルからなる基底が存在します。

**3 $\Rightarrow$ 1.**  
逆に $\mathcal B=(v_1,\dots,v_n)$ が固有ベクトルからなる基底で、

$$
T(v_i)=\lambda_i v_i
$$

なら、表現行列の第 $i$ 列は $\lambda_i e_i$ です。よって

$$
[T]_{\mathcal B\leftarrow\mathcal B}
=
\operatorname{diag}(\lambda_1,\dots,\lambda_n),
$$

したがって $T$ は対角化可能です。

**3 $\Rightarrow$ 2.**  
固有ベクトル基底を、同じ固有値に属するベクトルごとにまとめます。基底ベクトル $v_i$ の固有値を $\mu_i$ と書きます。

固有値 $\lambda$ に属する基底ベクトルたちの線形包を $F_\lambda$ とします。各ベクトルは $E_\lambda$ に属するので

$$
F_\lambda\subseteq E_\lambda.
$$

逆に $x\in E_\lambda$ を基底展開して

$$
x=\sum_{i=1}^n c_iv_i
$$

と書きます。$T(x)=\lambda x$ だから

$$
0
=
(T-\lambda I)x
=
\sum_{i=1}^n c_i(\mu_i-\lambda)v_i.
$$

$v_1,\dots,v_n$ は基底なので一次独立です。したがって各 $i$ について

$$
c_i(\mu_i-\lambda)=0.
$$

$\mu_i\ne\lambda$ なら $c_i=0$ なので、$x$ に残るのは固有値 $\lambda$ に属する基底ベクトルだけです。よって

$$
E_\lambda\subseteq F_\lambda,
$$

したがって $E_\lambda=F_\lambda$ です。

もとの固有ベクトル基底は、これらの $E_\lambda$ の基底を固有値ごとにまとめたものです。基底展開の一意性から異なる $E_\lambda$ の成分の和も一意なので

$$
V=\bigoplus_\lambda E_\lambda.
$$

**2 $\Rightarrow$ 4.**  
直和の次元公式を繰り返し使うと

$$
\dim V
=
\sum_\lambda \dim E_\lambda.
$$

$\dim V=n$ なので 4 が従います。

**4 $\Rightarrow$ 3.**  
各固有空間 $E_\lambda$ から基底

$$
B_\lambda
=
\{v_{\lambda,1},\dots,v_{\lambda,d_\lambda}\},
\qquad
d_\lambda=\dim E_\lambda
$$

を取ります。これらを全て合わせた集合が一次独立であることを確認します。

有限個の固有値について

$$
\sum_\lambda x_\lambda=0,
\qquad
x_\lambda\in E_\lambda
$$

とします。$x_\lambda\ne0$ である項だけを残すと、それぞれは互いに異なる固有値に属する固有ベクトルです。前節の定理よりそれらは一次独立なので、全て

$$
x_\lambda=0
$$

です。

各 $x_\lambda$ は $B_\lambda$ の線形結合であり、$B_\lambda$ 自身も一次独立なので、元の全係数が0になります。したがって

$$
\bigcup_\lambda B_\lambda
$$

は一次独立です。その本数は

$$
\sum_\lambda d_\lambda
=
\sum_\lambda \dim E_\lambda
=
n.
$$

$n$ 次元空間の一次独立な $n$ 本のベクトルは基底なので、固有ベクトルからなる基底が得られます。以上で4条件は同値です。$\square$
<!-- proof-end -->

特に、相異なる固有値が $n$ 個ある場合は各固有値から固有ベクトルを1本ずつ取れます。前節の定理によりその $n$ 本は一次独立で、したがって基底になるので $T$ は対角化可能です。

ただし固有値に重複がある場合は、同じ固有値に属する独立な固有ベクトルが十分な本数あるかを別に確認する必要があります。

---

## 13. 代数的重複度と幾何学的重複度

固有値が特性多項式の根として何回現れるかと、その固有値に属する独立な固有方向が何本あるかは同じとは限りません。対角化できるかを判断するには、この二種類の「重なり方」を別々に数える必要があります。

<a id="def-f0-00f-multiplicities"></a>

<!-- formal-statement-start -->
> **定義（代数的重複度・幾何学的重複度）**  
> 行列 $A$ の特性多項式 $\chi_A(t)=\det(tI-A)$ において、固有値 $\lambda$ が根として現れる重複度を **代数的重複度** といいます。一方、固有空間 $E_\lambda$ の次元

$$
\dim E_\lambda
$$

> を **幾何学的重複度** といいます。
<!-- formal-statement-end -->

固有値 $\lambda$ に対して、幾何学的重複度は代数的重複度を超えません。

<a id="prop-f0-00f-geometric-le-algebraic"></a>

<!-- formal-statement-start -->
> **命題（幾何学的重複度は代数的重複度以下）**  
> $A$ を $n\times n$ 実行列、$\lambda$ を $A$ の固有値とする。$\lambda$ の固有空間を $E_\lambda$ とすると
>
> 代数的重複度を $m_{\mathrm{alg}}(\lambda)$ と書く。このとき
>
> $$
> 1\le \dim E_\lambda\le m_{\mathrm{alg}}(\lambda)
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$E_\lambda$ の基底を空間全体の基底へ延長します。その基底では、最初の $r=\dim E_\lambda$ 本に $A$ を作用させると全て $\lambda$ 倍になるため、特性多項式に $(t-\lambda)^r$ が因子として現れます。

<!-- proof-start -->
### 証明

$$
r=\dim E_\lambda
$$

とし、$E_\lambda$ の基底を

$$
v_1,\dots,v_r
$$

とします。基底延長定理により、これを空間全体の基底

$$
\mathcal B=(v_1,\dots,v_r,v_{r+1},\dots,v_n)
$$

へ延長します。

各 $i=1,\dots,r$ について

$$
Av_i=\lambda v_i
$$

なので、この基底での $A$ の表現行列は左下ブロックが0になり、

$$
[A]_{\mathcal B}
=
\begin{pmatrix}
\lambda I_r & *\\
0 & C
\end{pmatrix}
$$

という形です。したがって

$$
tI-[A]_{\mathcal B}
=
\begin{pmatrix}
(t-\lambda)I_r & *\\
0 & tI-C
\end{pmatrix}.
$$

この行列の最初の $r$ 列では、第 $j$ 列の非零成分は第 $j$ 行の $t-\lambda$ だけです。したがって最初の $r$ 列を順に展開すると、そのたびに $t-\lambda$ が1個ずつ外へ出て

$$
\begin{aligned}
\chi_A(t)
&=
\det\bigl(tI-[A]_{\mathcal B}\bigr)\\
&=
(t-\lambda)^r\det(tI-C).
\end{aligned}
$$

よって $\lambda$ は特性多項式の根として少なくとも $r$ 重に現れます。したがって幾何学的重複度 $r$ は代数的重複度以下です。$\lambda$ が固有値なら $E_\lambda$ は非零なので $r\ge1$ です。$\square$
<!-- proof-end -->

対角化可能であるためには、各固有値について十分な本数の固有ベクトルが必要です。

<!-- definition-example-start: def-f0-00f-multiplicities -->
### 13.1 例：代数的重複度2、幾何学的重複度1

**定義の確認**

$$
A=
\begin{pmatrix}
1&1\\
0&1
\end{pmatrix}
$$

とします。特性多項式は

$$
\chi_A(t)
=
\det(tI-A)
=
\det
\begin{pmatrix}
t-1&-1\\
0&t-1
\end{pmatrix}
=
(t-1)^2.
$$

したがって固有値 $1$ の代数的重複度は $2$ です。一方

$$
A-I
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

なので

$$
E_1
=
\ker(A-I)
=
\operatorname{span}
\left\{
\begin{pmatrix}1\\0\end{pmatrix}
\right\}.
$$

従って

$$
\dim E_1=1,
$$

すなわち幾何学的重複度は $1$ です。同じ固有値でも二つの重複度が一致しない例になっています。
<!-- definition-example-end -->

したがって固有ベクトルを2本取れず、対角化できません。

---

## 14. 対角化すると何が嬉しいか

$$
A=PDP^{-1}
$$

なら

$$
A^k
=PD^kP^{-1}.
$$

対角行列なら

$$
D^k
=
\operatorname{diag}(\lambda_1^k,\dots,\lambda_n^k)
$$

なので、行列累乗がほぼスカラーの累乗へ落ちます。

さらに多項式

$$
p(t)=a_0+a_1t+\cdots+a_mt^m
$$

なら

$$
\begin{aligned}
p(A)
&=
a_0I+a_1A+\cdots+a_mA^m\\
&=
P\bigl(a_0I+a_1D+\cdots+a_mD^m\bigr)P^{-1}\\
&=
Pp(D)P^{-1}.
\end{aligned}
$$

対角行列 $D$ では $p(D)$ は各対角成分へ $p$ を適用するだけです。この考え方は後に、線形微分方程式で $e^{tA}$ を計算するときの土台になります。

---

## 15. もう一つの具体例：多項式の微分写像

$V=P_2$ とし、基底を

$$
\mathcal B=(1,x,x^2)
$$

とします。

微分写像

$$
D:P_2\to P_2,
\qquad
D(f)=f'
$$

を考えます。

$$
D(1)=0,
\qquad
D(x)=1,
\qquad
D(x^2)=2x.
$$

したがって

$$
[D]_{\mathcal B\leftarrow\mathcal B}
=
\begin{pmatrix}
0&1&0\\
0&0&2\\
0&0&0
\end{pmatrix}.
$$

ここで重要なのは、$D$ は関数を関数へ送る抽象的な写像であり、この行列は **基底 $1,x,x^2$ を選んだ後の座標表示** だということです。

### 15.1 意味：行列は $\mathbb R^n$ の写像だけのものではない

微分という「関数から関数への操作」も、有限次元部分空間と基底を選べば行列として表せます。

したがって表現行列の考え方は、数ベクトルの計算テクニックではなく、**抽象的な線形作用を有限個の座標へ翻訳する仕組み**です。

---

## 16. 演習

### F0-00F-A01 表現行列

- Level: A
- 目安時間: 12分

$T:\mathbb R^2\to\mathbb R^2$ を

$$
T(x,y)=(x+y,x-y)
$$

とする。

定義域・値域とも標準基底を使ったときの表現行列を求めよ。

<!-- solution-start -->
#### 詳細解答
標準基底を $e_1=(1,0)^T,e_2=(0,1)^T$ とする。

$$
T(e_1)=(1,1)^T,
\qquad
T(e_2)=(1,-1)^T.
$$

したがって列に並べて

$$
[T]
=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}.
$$

<!-- solution-end -->

### F0-00F-B01 対角化判定

- Level: B
- 目安時間: 15分

$$
A=
\begin{pmatrix}
2&1\\
0&2
\end{pmatrix}
$$

について、固有値・固有空間を求め、対角化可能か判定せよ。

<!-- solution-start -->
#### 詳細解答

まず固有値方程式を作ります。

$$
A-\lambda I
=
\begin{pmatrix}
2-\lambda&1\\
0&2-\lambda
\end{pmatrix},
$$

したがって

$$
\det(A-\lambda I)
=
(2-\lambda)^2.
$$

よって固有値は $\lambda=2$ のみで、特性多項式の根として2重に現れるため代数的重複度は2です。

次に固有空間を求めます。

$$
A-2I
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}.
$$

$v=(x,y)^T$ とすると

$$
(A-2I)v=0
$$

は

$$
y=0
$$

と同値なので

$$
E_2
=
\left\{
\begin{pmatrix}x\\0\end{pmatrix}
:x\in\mathbb R
\right\}
=
\operatorname{span}
\left\{
\begin{pmatrix}1\\0\end{pmatrix}
\right\}.
$$

したがって

$$
\dim E_2=1.
$$

$\mathbb R^2$ を対角化するには固有ベクトルからなる2本の基底が必要ですが、固有値2の固有空間から得られる独立な方向は1本だけです。よって $A$ は対角化できません。

<!-- solution-end -->


### F0-00F-A02 核・像・階数

- Level: A
- 目安時間: 12分

線形写像

$$
T:\mathbb R^3\to\mathbb R^2,
\qquad
T(x,y,z)=(x+y,y+z)
$$

について、$\ker T$、$\operatorname{Im}T$、rank、nullity を求め、rank-nullity theorem を確認せよ。

<!-- solution-start -->
#### 詳細解答

$T(x,y,z)=0$ は

$$
x+y=0,
\qquad
y+z=0
$$

と同値です。$y=t$ と置けば

$$
(x,y,z)=t(-1,1,-1),
$$

したがって

$$
\ker T
=
\operatorname{span}\{(-1,1,-1)^{\mathsf T}\},
\qquad
\dim\ker T=1.
$$

標準基底の像は

$$
T(e_1)=(1,0)^{\mathsf T},
\quad
T(e_2)=(1,1)^{\mathsf T},
\quad
T(e_3)=(0,1)^{\mathsf T}.
$$

$T(e_1),T(e_3)$ が $\mathbb R^2$ の基底なので

$$
\operatorname{Im}T=\mathbb R^2,
\qquad
\operatorname{rank}T=2.
$$

従って

$$
\dim\mathbb R^3
=
3
=
1+2
=
\dim\ker T+\dim\operatorname{Im}T,
$$

となり rank-nullity theorem を直接確認できます。
<!-- solution-end -->

### F0-00F-A03 固有基底での表現行列

- Level: A
- 目安時間: 12分

$$
T(x,y)=(2x+y,x+2y)
$$

とし、

$$
v_1=(1,1)^{\mathsf T},
\qquad
v_2=(1,-1)^{\mathsf T}
$$

とする。$\mathcal B=(v_1,v_2)$ が基底であることを確認し、$[T]_{\mathcal B\leftarrow\mathcal B}$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$v_1,v_2$ を列に並べた行列は

$$
P=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix},
\qquad
\det P=-2\ne0.
$$

従って $v_1,v_2$ は一次独立で、$\mathbb R^2$ の基底です。

さらに

$$
T(v_1)
=
T(1,1)
=
(3,3)
=
3v_1,
$$

$$
T(v_2)
=
T(1,-1)
=
(1,-1)
=
v_2.
$$

したがって $\mathcal B$ 座標では

$$
[T]_{\mathcal B\leftarrow\mathcal B}
=
\begin{pmatrix}
3&0\\
0&1
\end{pmatrix}.
$$

基底ベクトルがそれぞれ固有ベクトルなので、表現行列が対角行列になっています。
<!-- solution-end -->

### F0-00F-A04 固有空間と対角化

- Level: A
- 目安時間: 12分

$$
A=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}
$$

の固有値と各固有空間を求め、対角化可能であることを示せ。

<!-- solution-start -->
#### 詳細解答

固有値方程式は

$$
\det(A-\lambda I)
=
\begin{vmatrix}
1-\lambda&1\\
1&1-\lambda
\end{vmatrix}
=
(1-\lambda)^2-1
=
\lambda(\lambda-2).
$$

従って固有値は $0,2$ です。

$\lambda=2$ では

$$
A-2I=
\begin{pmatrix}
-1&1\\
1&-1
\end{pmatrix},
$$

なので

$$
E_2
=
\operatorname{span}\{(1,1)^{\mathsf T}\}.
$$

$\lambda=0$ では

$$
Ax=0
$$

より $x_1+x_2=0$ だから

$$
E_0
=
\operatorname{span}\{(1,-1)^{\mathsf T}\}.
$$

異なる固有値に属する二つの固有ベクトルは一次独立なので、これらは $\mathbb R^2$ の基底を作ります。従って $A$ は対角化可能です。
<!-- solution-end -->

### F0-00F-B02 相異なる固有値から対角化を導く

- Level: B
- 目安時間: 15分

$n$ 次元ベクトル空間 $V$ の線形自己写像 $T$ が、互いに異なる $n$ 個の固有値

$$
\lambda_1,\dots,\lambda_n
$$

を持つとする。$T$ が対角化可能であることを示せ。

<!-- solution-start -->
#### 詳細解答

各 $\lambda_i$ に対応する非零固有ベクトル $v_i$ を一つずつ取ります。

この章で証明した「異なる固有値に属する固有ベクトルは一次独立」より、

$$
v_1,\dots,v_n
$$

は一次独立です。

$V$ は $n$ 次元で、一次独立なベクトルが $n$ 本あるので、これらは $V$ の基底です。この基底を

$$
\mathcal B=(v_1,\dots,v_n)
$$

とすると

$$
T(v_i)=\lambda_i v_i
$$

だから、表現行列の第 $i$ 列は $\lambda_i e_i$ です。従って

$$
[T]_{\mathcal B\leftarrow\mathcal B}
=
\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

よって $T$ は対角化可能です。
<!-- solution-end -->

### F0-00F-B03 微分作用素の核・像・対角化

- Level: B
- 目安時間: 18分

$P_2$ を次数2以下の実多項式全体とし、

$$
D:P_2\to P_2,
\qquad
D(f)=f'
$$

とする。

1. $\ker D$ と $\operatorname{Im}D$ を求めよ。
2. rank-nullity theorem を確認せよ。
3. $D$ の固有値を求め、対角化可能か判定せよ。

<!-- solution-start -->
#### 詳細解答

一般の元を

$$
f(x)=a+bx+cx^2
$$

と書くと

$$
D(f)=b+2cx.
$$

従って $D(f)=0$ となるのは $b=c=0$ のときで、

$$
\ker D
=
\operatorname{span}\{1\},
\qquad
\dim\ker D=1.
$$

また任意の一次以下の多項式 $u+vx$ は

$$
D\left(ux+\frac v2x^2\right)=u+vx
$$

と書けるので

$$
\operatorname{Im}D
=
P_1
=
\operatorname{span}\{1,x\},
\qquad
\dim\operatorname{Im}D=2.
$$

従って

$$
3
=
\dim P_2
=
1+2
=
\dim\ker D+\dim\operatorname{Im}D.
$$

次に $Df=\lambda f$ とします。基底 $(1,x,x^2)$ での表現行列は

$$
[D]
=
\begin{pmatrix}
0&1&0\\
0&0&2\\
0&0&0
\end{pmatrix},
$$

なので特性多項式は

$$
(-\lambda)^3.
$$

固有値は $0$ だけです。その固有空間は

$$
E_0=\ker D=\operatorname{span}\{1\}
$$

で1次元です。

$P_2$ は3次元ですが固有ベクトルから得られる独立な方向は1本しかないため、$D$ は対角化できません。
<!-- solution-end -->

### F0-00F-C01 重複固有値・rank-nullity・行列累乗

- Level: C
- 目安時間: 30分

実数 $a$ に対して

$$
A_a=
\begin{pmatrix}
1&a&0\\
0&1&0\\
0&0&2
\end{pmatrix}
$$

とする。

1. 固有値とその代数的重複度を求めよ。
2. 各固有空間を求め、$A_a$ が対角化可能となる $a$ の条件を求めよ。
3. $a\ne0$ のとき $A_a-I$ の核・像・rank・nullity を求め、rank-nullity theorem を確認せよ。
4. $a\ne0$ のとき $A_a^k$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$A_a$ は上三角行列なので

$$
\det(A_a-\lambda I)
=
(1-\lambda)^2(2-\lambda).
$$

従って固有値は $1,2$ で、代数的重複度はそれぞれ $2,1$ です。

$\lambda=2$ では

$$
A_a-2I
=
\begin{pmatrix}
-1&a&0\\
0&-1&0\\
0&0&0
\end{pmatrix}.
$$

第2行から $y=0$、第1行から $x=0$ なので

$$
E_2
=
\operatorname{span}\{e_3\}.
$$

$\lambda=1$ では

$$
A_a-I
=
\begin{pmatrix}
0&a&0\\
0&0&0\\
0&0&1
\end{pmatrix}.
$$

$a=0$ なら条件は $z=0$ だけなので

$$
E_1
=
\operatorname{span}\{e_1,e_2\},
\qquad
\dim E_1=2.
$$

このとき $E_1$ の基底2本と $e_3$ を合わせて固有基底を作れるため、$A_0$ は対角化可能です。

一方 $a\ne0$ なら

$$
ay=0,
\qquad
z=0
$$

より $y=z=0$ で、

$$
E_1
=
\operatorname{span}\{e_1\},
\qquad
\dim E_1=1.
$$

独立な固有ベクトルは $E_1$ から1本、$E_2$ から1本の合計2本しか得られないため、3次元空間の固有基底を作れません。従って

$$
\boxed{A_a\text{ が対角化可能 }\Longleftrightarrow a=0}.
$$

$a\ne0$ のとき

$$
(A_a-I)(x,y,z)
=
(ay,0,z).
$$

従って

$$
\ker(A_a-I)
=
\operatorname{span}\{e_1\},
$$

$$
\operatorname{Im}(A_a-I)
=
\operatorname{span}\{e_1,e_3\}.
$$

よって nullity は1、rankは2で、

$$
3=1+2
$$

と rank-nullity theorem が成り立ちます。

最後に左上 $2\times2$ ブロックを

$$
B=
\begin{pmatrix}
1&a\\
0&1
\end{pmatrix}
=
I+N,
\qquad
N=
\begin{pmatrix}
0&a\\
0&0
\end{pmatrix}
$$

と置きます。$N^2=0$ なので二項展開で

$$
B^k
=
(I+N)^k
=
I+kN
=
\begin{pmatrix}
1&ka\\
0&1
\end{pmatrix}.
$$

第3成分は $2^k$ 倍されるので

$$
\boxed{
A_a^k
=
\begin{pmatrix}
1&ka&0\\
0&1&0\\
0&0&2^k
\end{pmatrix}
}.
$$
<!-- solution-end -->

---

## 17. 次に進む

一般の線形写像と対角化まで準備できました。

次は内積を入れ、正規直交基底・Gram--Schmidt・射影・QRを構成します。その後、実対称行列ではなぜ必ず正規直交固有基底が存在するのかをスペクトル定理として証明します。

**次：[F0-00E1 内積・Gram--Schmidt・直交射影・QR](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)**
