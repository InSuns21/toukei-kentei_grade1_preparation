# NA11 数値解析 XI：Perron--Frobenius 理論と PageRank

NA10 では、一般の固有値問題に対して冪乗法・逆反復法・Rayleigh 商反復・QR 法を扱いました。そこでは「支配固有値がほかの固有値から分離しているなら、冪乗反復で対応する固有ベクトルを取り出せる」という立場でした。

しかし、一般の行列では支配固有値が正であるとも、その固有ベクトルの成分が同符号であるとも、絶対値最大の固有値が一つだけであるとも限りません。そこでこの章では、**行列の成分が0以上であることから、固有値問題にどこまで追加の構造が生まれるか**を調べます。

中心となる問いは次のものです。

- 長期反復を支配する固有値を、行列の構造だけから特定できるか。
- その固有ベクトルを正に選び、一意性まで保証できるか。
- 疎な有向グラフでは、正行列より弱いどの条件が必要か。
- 確率分布を反復したとき、いつ一つの定常状態へ収束するか。
- その理論を、Web ページの重要度を決める PageRank にどうつなげるか。

成分が非負である行列では、

$$
A\ge 0
$$

という順序構造が使えます。この構造から正の固有ベクトルを取り出し、最後に確率行列と PageRank を

~~~text
成分が0以上という順序構造
  ↓
Perron--Frobenius 理論
  ↓
到達可能性と周期性
  ↓
列和1の遷移行列
  ↓
遷移で不変な確率ベクトル
  ↓
PageRank
  ↓
1-ノルム誤差・停止判定・感度
~~~

という一本の流れで結びます。

直接の前提は、[NA9 の行列に対するスペクトル半径と Jordan 標準形による反復解析](../NA9/index.md#thm-na9-stationary-convergence)と、[NA10 の冪乗法](../NA10/index.md#def-na10-power-method)です。

この章では確率ベクトルを列ベクトルで表します。そのため確率遷移に使う行列も **列和が1** の規約で統一します。

---

## 0. 非負性は固有値問題へ順序を持ち込む

まず、一般の固有値問題にはなかった武器を一つ確認します。

行列の成分が0以上なら、ベクトルの各成分の大小関係を行列作用の後にも比較できます。これが「正の固有ベクトル」を作る出発点です。逆にいえば、この章で非負性を仮定するのは、単に扱いやすい特殊行列へ制限するためではありません。**固有値問題へ成分ごとの順序を持ち込み、大小比較からスペクトル情報を引き出すため**です。

<a id="def-na11-nonnegative-positive-matrix"></a>
<!-- formal-statement-start -->
### 定義（非負行列・正行列）

実行列 $A=(a_{ij})\in\mathbb R^{n\times n}$ について、

$$
a_{ij}\ge 0
\qquad
(1\le i,j\le n)
$$

がすべての成分で成り立つとき、$A$ を **非負行列**といい、

$$
A\ge 0
$$

と書く。

さらに

$$
a_{ij}>0
\qquad
(1\le i,j\le n)
$$

がすべての成分で成り立つとき、$A$ を **正行列**といい、

$$
A>0
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-nonnegative-positive-matrix -->
### 例：非負と正を成分で確認する

**定義の確認**。

$$
A=
\begin{pmatrix}
0&2\\
1&3
\end{pmatrix}
$$

では全成分が0以上なので $A\ge0$ です。しかし $(1,1)$ 成分が0なので $A>0$ ではありません。

一方、

$$
B=
\begin{pmatrix}
1&2\\
4&3
\end{pmatrix}
$$

では全成分が正なので $B>0$ です。
<!-- definition-example-end -->

非負性が強い理由は、複素ベクトル $z$ に対して成分ごとに

$$
\boxed{
|Az|\le A|z|
}
$$

が成り立つことです。実際、

$$
\begin{aligned}
|(Az)_i|
&=
\left|
\sum_j a_{ij}z_j
\right|\\
&\le
\sum_j a_{ij}|z_j|\\
&=
(A|z|)_i.
\end{aligned}
$$

ここで $|z|$ は成分ごとの絶対値です。負の成分がある一般行列では、この比較は使えません。

---

## 1. 行列冪の指数成長率を固有値から読む

非負性からは

$$
Ay\ge cy
$$

のような**成分ごとの不等式**が自然に現れます。しかし Perron--Frobenius 理論で最終的に知りたいのは、スペクトル半径 $\rho(A)$ という**固有値の情報**です。

そこで最初に、

> 「ベクトルを少なくとも毎回 $c$ 倍に押し広げる」ことから、「固有値の最大絶対値も少なくとも $c$ である」とどう結び付けるか

を整理します。その橋渡しが、行列冪 $A^k$ の長期的な増え方とスペクトル半径を結ぶ次の公式です。NA9 の Jordan 標準形による反復解析を、ここで使いやすい形にまとめます。

<a id="prop-na11-spectral-radius-power-limit"></a>
<!-- formal-statement-start -->
### 命題（有限次元行列の冪の指数成長率公式）

$A\in\mathbb C^{n\times n}$ とし、$\|\cdot\|$ を任意のベクトルノルムから誘導される行列ノルムとする。

このとき

$$
\boxed{
\lim_{k\to\infty}
\|A^k\|^{1/k}
=
\rho(A)
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

下からの評価は、絶対値最大の固有値に対応する固有ベクトルへ $A^k$ を作用させます。

上からの評価は [NA9](../NA9/index.md#thm-na9-stationary-convergence) と同様に、Jordan ブロックの冪を「指数減衰または指数増加 × 多項式」として評価します。

<!-- proof-start -->
### 証明

$Av=\lambda v$、$v\ne0$、$|\lambda|=\rho(A)$ となる固有対を取ります。すると

$$
A^kv=\lambda^kv
$$

なので

$$
\|A^kv\|
\le
\|A^k\|\,\|v\|
$$

であり、

$$
\|A^k\|
\ge
\frac{\|A^kv\|}{\|v\|}
=
|\lambda|^k
=
\rho(A)^k.
$$

従って

$$
\liminf_{k\to\infty}
\|A^k\|^{1/k}
\ge
\rho(A).
$$

次に上から評価します。

Jordan 標準形を

$$
A=SJS^{-1}
$$

とします。各 Jordan ブロックを

$$
J_\lambda=\lambda I+N,
\qquad
N^m=0
$$

と書けば、

$$
J_\lambda^k
=
\sum_{j=0}^{m-1}
\binom{k}{j}\lambda^{k-j}N^j.
$$

任意の $\varepsilon>0$ に対して

$$
q=\rho(A)+\varepsilon
$$

と置きます。すべての固有値について $|\lambda|<q$ です。

固定した $j$ について、$k^j(|\lambda|/q)^k\to0$ なので、ある定数 $C_j$ が存在して

$$
\binom{k}{j}|\lambda|^{k-j}
\le
C_jq^k
$$

とできます。Jordan ブロックは有限個しかないため、ある $C>0$ が存在して

$$
\|J^k\|\le Cq^k.
$$

従って

$$
\|A^k\|
\le
\|S\|\,\|S^{-1}\|\,Cq^k.
$$

$k$ 乗根を取れば

$$
\limsup_{k\to\infty}
\|A^k\|^{1/k}
\le q.
$$

$\varepsilon>0$ は任意なので

$$
\limsup_{k\to\infty}
\|A^k\|^{1/k}
\le \rho(A).
$$

下からの評価と合わせて結論を得ます。
<!-- proof-end -->

特に $y>0$ かつ

$$
Ay\ge cy
$$

なら、帰納的に

$$
A^ky\ge c^ky.
$$

例えば無限大ノルムを使えば

$$
\|A^k\|_\infty
\ge
\frac{\|A^ky\|_\infty}{\|y\|_\infty}
\ge
c^k
$$

なので、[有限次元行列の冪の指数成長率公式](#prop-na11-spectral-radius-power-limit)から

$$
\boxed{
\rho(A)\ge c
}
$$

が従います。

---

## 2. 正行列では Perron 固有値が単独で支配する

<a id="thm-na11-positive-perron-frobenius"></a>
<!-- formal-statement-start -->
### 定理（正行列に対する Perron--Frobenius 定理）

$A\in\mathbb R^{n\times n}$ を正行列 $A>0$ とする。

このとき次が成り立つ。

1. $\rho(A)>0$ は $A$ の実固有値である。
2. ある $x>0$ が存在して
   $$
   Ax=\rho(A)x
   $$
   を満たす。
3. $\rho(A)$ の固有空間は1次元で、正の固有ベクトルは定数倍を除いて一意である。
4. $\rho(A)$ は代数的に単純である。
5. $\lambda\ne\rho(A)$ が $A$ の固有値なら
   $$
   |\lambda|<\rho(A).
   $$

さらに、ある $y>0$ が存在して

$$
y^{\mathsf T}A
=
\rho(A)y^{\mathsf T}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A>0$ なので $\operatorname{tr}(A)>0$ です。従って全固有値が0ではなく、

$$
\rho(A)>0.
$$

$Az=\lambda z$、$z\ne0$、$|\lambda|=\rho(A)$ を満たす複素固有対を取ります。

$$
x=|z|\ge0
$$

と置くと、非負性から

$$
Ax
\ge
|Az|
=
\rho(A)x.
$$

ここで

$$
d=Ax-\rho(A)x\ge0
$$

とします。

もし $d\ne0$ なら $A>0$ なので $Ad>0$ です。また $u=Ax>0$ と置けば

$$
Au
=
A^2x
=
\rho(A)Ax+Ad
>
\rho(A)u.
$$

従って

$$
\delta
=
\min_i
\left(
\frac{(Au)_i}{u_i}-\rho(A)
\right)
>0
$$

と取れて、

$$
Au\ge(\rho(A)+\delta)u.
$$

前節の評価から

$$
\rho(A)\ge\rho(A)+\delta
$$

となり矛盾です。よって

$$
Ax=\rho(A)x.
$$

さらに $A>0$、$x\ne0$ なので $Ax>0$、従って $x>0$ です。

次に $Au=\rho(A)u$ を満たす実ベクトル $u$ を任意に取ります。

$$
t
=
\max_i\frac{u_i}{x_i}
$$

と置けば

$$
w=tx-u\ge0
$$

であり、少なくとも一つの成分は0です。

$w\ne0$ なら $Aw>0$ ですが、

$$
Aw=\rho(A)w
$$

なので、$w$ の0成分に対応する成分は0でなければならず矛盾です。従って $u=tx$ です。符号を変えれば任意の実固有ベクトルが $x$ の定数倍だと分かります。

複素固有ベクトルについても実部・虚部へ同じ議論を適用できるため、$\rho(A)$ の固有空間は1次元です。

次に $Az=\lambda z$、$|\lambda|=\rho(A)$ とします。上と同じ議論から

$$
A|z|=\rho(A)|z|.
$$

したがって各行で

$$
\left|
\sum_j a_{ij}z_j
\right|
=
\sum_j a_{ij}|z_j|
$$

が成立します。$a_{ij}>0$ なので、三角不等式の等号条件より全 $z_j$ は同じ複素偏角を持ちます。従って $z=cx$ と書け、

$$
Az=\rho(A)z.
$$

よって $\lambda=\rho(A)$ です。従って他の固有値はすべて

$$
|\lambda|<\rho(A).
$$

最後に $A^{\mathsf T}>0$ へ同じ存在論を適用し、

$$
y^{\mathsf T}A=\rho(A)y^{\mathsf T},
\qquad
y>0
$$

を取ります。

もし $\rho(A)$ に大きさ2以上の Jordan ブロックがあれば、ある $w$ が存在して

$$
(A-\rho(A)I)w=x
$$

となります。左から $y^{\mathsf T}$ を掛けると

$$
0
=
y^{\mathsf T}(A-\rho(A)I)w
=
y^{\mathsf T}x,
$$

しかし $x>0$、$y>0$ だから $y^{\mathsf T}x>0$ であり矛盾です。

従って $\rho(A)$ は代数的に単純です。
<!-- proof-end -->

NA10 の一般の冪乗法では

$$
|\lambda_1|>|\lambda_2|
$$

を仮定しました。正行列では、この支配固有値の分離が行列構造から自動的に得られます。

---

## 3. 既約性は「どこからでも全体へ届く」ことを表す

正行列は0を一つも許しません。しかし疎なグラフ行列では0が大量に現れます。

<a id="def-na11-irreducible"></a>
<!-- formal-statement-start -->
### 定義（既約非負行列）

非負行列 $A=(a_{ij})\in\mathbb R^{n\times n}$ に対し、頂点集合 $\{1,\dots,n\}$ を持ち、

$$
a_{ij}>0
$$

のとき有向辺

$$
j\longrightarrow i
$$

を引く。

この有向グラフで任意の頂点から任意の頂点へ有向路が存在するとき、$A$ を **既約**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-irreducible -->
### 例：2周期の行列は既約である

**定義の確認**。

$$
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

では

$$
1\to2,
\qquad
2\to1
$$

という辺があります。従って $P$ は既約です。

一方、

$$
P^2=I
$$

なので、後で見るように冪乗反復は一般には収束しません。

つまり **既約性だけでは周期性は消えません**。
<!-- definition-example-end -->

---

## 4. 既約非負行列にも正の Perron 固有ベクトルがある

<a id="thm-na11-irreducible-perron-frobenius"></a>
<!-- formal-statement-start -->
### 定理（既約非負行列に対する Perron--Frobenius 定理）

$A\in\mathbb R^{n\times n}$ を既約な非負行列とする。

このとき次が成り立つ。

1. $\rho(A)$ は $A$ の実固有値である。
2. ある $x>0$ が存在して
   $$
   Ax=\rho(A)x
   $$
   を満たす。
3. 正の固有ベクトルは定数倍を除いて一意である。
4. $\rho(A)$ は代数的に単純である。

ただし、$\rho(A)$ と同じ絶対値を持つ別の固有値が存在することはあり得る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n=1$ では主張は直接確認できるので、以下 $n\ge2$ とします。

$$
B=I+A
$$

と置きます。

$A$ が既約なので、任意の頂点 $j$ から任意の頂点 $i$ へ、重複頂点を除けば長さ高々 $n-1$ の有向路があります。

$B$ は各頂点に自己ループを追加した行列です。短い路は自己ループで長さを $n-1$ まで延ばせるため、

$$
C=B^{n-1}>0
$$

です。

正行列 $C$ に前節の定理を適用し、

$$
Cx=\tau x,
\qquad
x>0,
$$

$$
y^{\mathsf T}C=\tau y^{\mathsf T},
\qquad
y>0
$$

とします。$\tau=\rho(C)$ の固有空間は1次元です。

$B$ と $C=B^{n-1}$ は可換なので

$$
C(Bx)=B(Cx)=\tau Bx.
$$

また $B\ge I$、$x>0$ だから $Bx>0$ です。従って $Bx$ は $C$ の Perron 固有空間に属し、

$$
Bx=\mu x
$$

となる $\mu>0$ が存在します。

同様に

$$
y^{\mathsf T}B=\nu y^{\mathsf T}
$$

となる $\nu>0$ が存在します。

両式から

$$
y^{\mathsf T}Bx
=
\mu y^{\mathsf T}x
=
\nu y^{\mathsf T}x.
$$

$y^{\mathsf T}x>0$ なので $\mu=\nu$ です。

よって

$$
Ax=(\mu-1)x,
$$

$$
y^{\mathsf T}A=(\mu-1)y^{\mathsf T}.
$$

$$
r=\mu-1
$$

と置きます。$A\ge0$、$x>0$ だから $r\ge0$ です。

任意の固有対 $Az=\lambda z$ に対して

$$
A|z|\ge|\lambda||z|.
$$

左から $y^{\mathsf T}$ を掛けると

$$
r\,y^{\mathsf T}|z|
=
y^{\mathsf T}A|z|
\ge
|\lambda|\,y^{\mathsf T}|z|.
$$

$y>0$、$z\ne0$ なので $y^{\mathsf T}|z|>0$、従って

$$
|\lambda|\le r.
$$

$r$ 自身が固有値だから

$$
r=\rho(A).
$$

これで正の Perron 固有ベクトルの存在が示されました。

固有空間の1次元性も $C$ を使えば直ちに従います。$Au=\rho(A)u$ を満たす任意の複素固有ベクトル $u$ に対して

$$
Bu=\mu u,
$$

従って

$$
Cu=B^{n-1}u=\mu^{n-1}u.
$$

また $Cx=\mu^{n-1}x$ です。正行列 $C$ の Perron 固有空間は複素数体上でも1次元なので、

$$
u\in\operatorname{span}_{\mathbb C}\{x\}.
$$

従って $A$ の $\rho(A)$-固有空間も1次元であり、特に正固有ベクトルは定数倍を除いて一意です。

最後に代数的単純性を示します。固有空間が1次元なので、もし $\rho(A)$ の代数的重複度が2以上なら Jordan 鎖

$$
(A-\rho(A)I)w=x
$$

があれば、$B=I+A$ について

$$
(B-\mu I)w=x
$$

です。

$m=n-1$ とすると、$Bx=\mu x$ から

$$
(B^m-\mu^mI)w
=
m\mu^{m-1}x
\ne0
$$

が従います。したがって $C=B^m$ の Perron 固有値 $\mu^m$ にも非自明な Jordan 鎖が生じます。

しかし $C>0$ の Perron 固有値は代数的に単純なので矛盾です。

従って $\rho(A)$ は代数的に単純です。
<!-- proof-end -->

既約性は正の Perron 固有ベクトルを一意にします。しかし、まだ

$$
|\lambda|<\rho(A)
$$

を他の全固有値に対して保証してはいません。

---

## 5. ある冪が正になる条件が周期固有値を排除する

<a id="def-na11-eventual-positive-matrix"></a>
<!-- formal-statement-start -->
### 定義（原始行列）

非負行列 $A\ge0$ に対し、ある正整数 $m$ が存在して

$$
\boxed{
A^m>0
}
$$

となるとき、$A$ を **原始行列**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-eventual-positive-matrix -->
### 例：2乗すると正行列になる

**定義の確認**。

$$
A=
\begin{pmatrix}
1&1\\
1&0
\end{pmatrix}
$$

は非負ですが正行列ではありません。

しかし

$$
A^2
=
\begin{pmatrix}
2&1\\
1&1
\end{pmatrix}
>0.
$$

従って $A$ は原始行列です。
<!-- definition-example-end -->

一方、

$$
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

では

$$
P^{2k}=I,
\qquad
P^{2k+1}=P
$$

なので、どの冪にも0が残ります。従って $P$ は既約ですが原始ではありません。

<a id="prop-na11-dominant-gap"></a>
<!-- formal-statement-start -->
### 命題（原始行列の Perron 固有値のスペクトルギャップ）

$A\ge0$ を原始行列とする。

このとき $\rho(A)>0$ は代数的に単純な固有値で、ある $x>0$ が存在して

$$
Ax=\rho(A)x
$$

を満たす。

さらに $\lambda\ne\rho(A)$ が $A$ の固有値なら

$$
\boxed{
|\lambda|<\rho(A)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

ある $m$ で $A^m>0$ です。従って $A$ は既約であり、前節から正の Perron 固有ベクトル $x$ が存在し、$\rho(A)$ は代数的に単純です。

もし

$$
Az=\lambda z,
\qquad
|\lambda|=\rho(A)
$$

なら

$$
A^mz=\lambda^mz.
$$

従って $\lambda^m$ は $|\lambda^m|=\rho(A^m)$ を満たす正行列 $A^m$ の固有値です。

[正行列に対する前節の結果](#thm-na11-positive-perron-frobenius)より、そのような固有値は

$$
\rho(A^m)=\rho(A)^m
$$

だけで、対応固有空間も1次元です。

一方 $A^mx=\rho(A)^mx$ なので $z=cx$ です。すると

$$
Az=\rho(A)z,
$$

従って $\lambda=\rho(A)$ です。

よって他の固有値はすべて絶対値が $\rho(A)$ より小さい領域にあります。
<!-- proof-end -->

---

## 6. 列和1の非負行列では Perron 固有値が1である

ここまでで「非負行列のどの固有値が支配的になるか」を調べました。次は、その固有ベクトルに**確率分布としての意味**を持たせます。

確率ベクトル $x$ の第 $j$ 成分を「現在、状態 $j$ にいる確率」とします。行列 $P$ の第 $j$ 列を「状態 $j$ から次にどこへ移るかという確率分布」にすれば、

$$
x\longmapsto Px
$$

は一時刻分の確率分布の更新になります。このため各列の和は1でなければなりません。

そして、何回更新しても変わらない分布は

$$
P\pi=\pi
$$

を満たします。つまり**定常状態を探す問題は、固有値1の固有ベクトル問題そのもの**です。ここで前半の Perron--Frobenius 理論が、確率分布の長期挙動へ接続します。

<a id="def-na11-column-stochastic-stationary"></a>
<!-- formal-statement-start -->
### 定義（列確率行列・定常確率ベクトル）

非負行列 $P=(p_{ij})\in\mathbb R^{n\times n}$ が

$$
\sum_{i=1}^n p_{ij}=1
\qquad
(j=1,\dots,n)
$$

を満たすとき、$P$ を **列確率行列**という。

確率ベクトル

$$
\pi\ge0,
\qquad
\mathbf1^{\mathsf T}\pi=1
$$

が

$$
\boxed{
P\pi=\pi
}
$$

を満たすとき、$\pi$ を $P$ の **定常確率ベクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-column-stochastic-stationary -->
### 例：2状態の定常確率ベクトル

**定義の確認**。

$$
P=
\begin{pmatrix}
1/2&1/4\\
1/2&3/4
\end{pmatrix}
$$

では各列の和が1なので列確率行列です。

$$
P\pi=\pi
$$

を解くと

$$
\frac12\pi_1+\frac14\pi_2=\pi_1,
$$

従って $\pi_2=2\pi_1$ です。

$$
\pi_1+\pi_2=1
$$

で正規化すると

$$
\boxed{
\pi=
\begin{pmatrix}
1/3\\
2/3
\end{pmatrix}
}.
$$
<!-- definition-example-end -->

列確率行列では

$$
\mathbf1^{\mathsf T}P=\mathbf1^{\mathsf T}.
$$

従って1は $P^{\mathsf T}$ の固有値であり、$P$ と $P^{\mathsf T}$ は同じ特性多項式を持つので1は $P$ の固有値です。

また誘導1-ノルムは

$$
\|P\|_1
=
\max_j\sum_i|p_{ij}|
=
1.
$$

従って

$$
\rho(P)\le1.
$$

1が固有値なので

$$
\boxed{
\rho(P)=1
}.
$$

<a id="prop-na11-irreducible-stationary"></a>
<!-- formal-statement-start -->
### 命題（既約列確率行列の定常確率ベクトル）

$P$ を既約な列確率行列とする。

このとき、成分がすべて正の定常確率ベクトル $\pi>0$ がただ一つ存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\rho(P)=1$ なので、[既約非負行列に対する前節の結果](#thm-na11-irreducible-perron-frobenius)から、ある $x>0$ が存在して

$$
Px=x.
$$

正固有ベクトルは定数倍を除いて一意です。

そこで

$$
\pi
=
\frac{x}{\mathbf1^{\mathsf T}x}
$$

と正規化すれば

$$
\pi>0,
\qquad
\mathbf1^{\mathsf T}\pi=1,
\qquad
P\pi=\pi.
$$

正規化が定数倍の自由度を消すため、$\pi$ は一意です。
<!-- proof-end -->

---

## 7. 一意な定常確率ベクトルがあっても反復は収束しないことがある

既約性と原始性を混同すると、最も小さい反例で破綻します。

### 反例：2周期で振動する既約行列

$$
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

は既約な列確率行列です。

定常確率ベクトルは

$$
\pi
=
\frac12
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

で一意です。

しかし

$$
x_0=
\begin{pmatrix}
1\\
0
\end{pmatrix}
$$

なら

$$
Px_0=
\begin{pmatrix}
0\\
1
\end{pmatrix},
\qquad
P^2x_0=x_0.
$$

従って $P^kx_0$ は振動して収束しません。

固有値は

$$
1,\qquad -1
$$

です。壊れたのは既約性ではなく、**原始性が排除するはずの絶対値1の周期固有値が残っていること**です。

---

## 8. 原始列確率行列では冪乗反復が定常確率ベクトルへ収束する

前節の反例から、一意な定常確率ベクトルが存在することと、反復

$$
x_{k+1}=Px_k
$$

がそこへ収束することは別問題だと分かりました。

原始性を仮定すると、固有値1だけが単位円上に残ります。これは NA10 の冪乗法で必要だった「支配固有値の分離」が、ここでは**行列の非負性と周期性の排除から自動的に得られる**ということです。確率ベクトルでは各反復後の成分和が1に保たれるため、冪乗法の正規化も最初から組み込まれています。

<a id="thm-na11-stochastic-power-convergence"></a>
<!-- formal-statement-start -->
### 定理（原始列確率行列の冪収束）

$P$ を原始な列確率行列とし、$\pi>0$ をその定常確率ベクトルとする。

このとき

$$
\boxed{
P^k
\longrightarrow
\pi\mathbf1^{\mathsf T}
}
$$

である。

従って任意の確率ベクトル $x_0$ に対して

$$
\boxed{
P^kx_0\longrightarrow\pi
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列確率行列なので Perron 固有値は1です。

原始性から、1以外の全固有値は

$$
|\lambda|<1
$$

を満たし、1は代数的に単純です。

Jordan 標準形で1に対応する1次元ブロックと、それ以外のブロックへ分けます。1以外のブロックでは [NA9](../NA9/index.md#thm-na9-stationary-convergence) と同じく

$$
k^j|\lambda|^k\to0
$$

なので、その寄与は0へ消えます。

固有値1の右固有ベクトルは $\pi$、左固有ベクトルは $\mathbf1$ で、

$$
\mathbf1^{\mathsf T}\pi=1.
$$

従って固有値1への射影は

$$
\pi\mathbf1^{\mathsf T}.
$$

よって

$$
P^k\to\pi\mathbf1^{\mathsf T}.
$$

確率ベクトル $x_0$ では $\mathbf1^{\mathsf T}x_0=1$ だから

$$
P^kx_0
\to
\pi\mathbf1^{\mathsf T}x_0
=
\pi.
$$
<!-- proof-end -->

---

## 9. Web グラフから列確率行列を作る

ここで PageRank の問題へ移ります。

Web ページの重要度を「受け取ったリンクの本数」だけで決めると、どのページからのリンクも同じ重みになります。PageRank の基本発想は、**重要なページから受け取るリンクほど大きな重みを持たせる**ことです。すると重要度は自己参照的に決まります。

ページ $j$ の重要度を、そのページから出るリンクへ等分して渡すとします。ページ重要度を成分和1に正規化したベクトルを $r$、リンク構造から作った列確率行列を $P$ とすれば、リンクを一回たどった後の重要度は

$$
Pr
$$

です。リンク評価と整合する重要度なら

$$
\boxed{
Pr=r
}
$$

を満たすはずです。

つまり PageRank の原型は、突然現れる検索アルゴリズムではありません。**Web グラフ上の重要度を自己整合的に定めようとすると、定常確率ベクトル、すなわち固有値1の固有ベクトル問題が現れる**のです。

ただし、実際の Web グラフからそのまま $P$ を作ると問題があります。

1. 出リンクがないページでは、次の移動先を定義できない。
2. グラフが既約とは限らず、閉じた部分グラフごとに定常状態が分かれることがある。
3. 既約でも周期性があれば、反復が振動して収束しないことがある。

まず1番目の問題を処理して、リンク構造から列確率行列を作ります。

ページ $j$ から出るリンク数を $d_j$ とします。

$d_j>0$ なら

$$
p_{ij}
=
\begin{cases}
1/d_j, & j\text{ から }i\text{ へのリンクがある},\\
0, & \text{それ以外}
\end{cases}
$$

と置けば第 $j$ 列の和は1です。

問題は $d_j=0$ のページです。

<a id="def-na11-dangling-node"></a>
<!-- formal-statement-start -->
### 定義（出リンクなし頂点）

Web グラフの頂点 $j$ が

$$
d_j=0
$$

を満たす、すなわちページ $j$ から出るリンクが一つもないとき、$j$ を **出リンクなし頂点（dangling node）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-dangling-node -->
### 例：零列から出リンクなし頂点を判定する

**定義の確認**。

リンク行列を作る前の隣接情報で、第3ページに対応する列が

$$
\begin{pmatrix}
0\\
0\\
0
\end{pmatrix}
$$

なら、第3ページから出るリンク数は

$$
d_3=0
$$

です。従ってページ3は出リンクなし頂点です。
<!-- definition-example-end -->

その列を0のままにすると確率質量が失われるので、確率ベクトル $v$ を一つ選び、その列を $v$ で置き換えます。これで出リンクなし頂点を含むグラフからも列確率行列 $P$ が得られます。

---

## 10. PageRank は正行列の Perron 固有ベクトルである

出リンクなし頂点を補えば列確率行列 $P$ は作れます。しかし、それだけでは閉じた部分グラフや周期性は残ります。したがって

$$
Pr=r
$$

をそのまま解くだけでは、「一意な重要度が存在し、どんな初期値から反復してもそこへ収束する」とは保証できません。

そこで、各ステップで

- 確率 $\alpha$ ではリンクに従って移動する。
- 確率 $1-\alpha$ ではリンクを無視し、あらかじめ決めた確率分布 $v$ に従ってページを選んで移動する。

という更新を考えます。後者が **teleportation** です。

確率分布 $x$ に対する一回の更新は

$$
x
\longmapsto
\alpha Px+(1-\alpha)v
$$

になります。確率ベクトルでは $\mathbf1^{\mathsf T}x=1$ なので、これは一つの行列

$$
G
=
\alpha P+(1-\alpha)v\mathbf1^{\mathsf T}
$$

による更新 $x\mapsto Gx$ と同じです。

$v>0$ とすれば、元のリンク行列 $P$ がどれほど疎でも $G$ の全成分は正になります。つまり teleportation は、前半で証明した**正行列版 Perron--Frobenius 定理を任意の Web グラフへ適用可能にする仕掛け**です。

<a id="def-na11-pagerank"></a>
<!-- formal-statement-start -->
### 定義（PageRank 行列・PageRank ベクトル）

$P$ を列確率行列、$v>0$ を

$$
\mathbf1^{\mathsf T}v=1
$$

を満たす確率ベクトル、$0<\alpha<1$ とする。

$$
\boxed{
G
=
\alpha P
+
(1-\alpha)v\mathbf1^{\mathsf T}
}
$$

を **PageRank 行列**とする。

確率ベクトル $r$ が

$$
\boxed{
Gr=r
}
$$

を満たすとき、$r$ を **PageRank ベクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-pagerank -->
### 例：3ページの PageRank を解く

**定義の確認**。

$$
P=
\begin{pmatrix}
0&0&1\\
1/2&0&0\\
1/2&1&0
\end{pmatrix},
\qquad
\alpha=\frac12,
\qquad
v=
\frac13
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
$$

とします。

各列和は1なので $P$ は列確率行列です。

PageRank 方程式は

$$
r
=
\frac12Pr+\frac12v,
$$

すなわち

$$
\left(I-\frac12P\right)r
=
\frac16
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}.
$$

これを解くと

$$
\boxed{
r=
\begin{pmatrix}
14/39\\
10/39\\
5/13
\end{pmatrix}
}.
$$

全成分は正で、成分和は1です。
<!-- definition-example-end -->

<a id="thm-na11-pagerank-wellposedness"></a>
<!-- formal-statement-start -->
### 定理（PageRank の存在・一意性）

$P$ を任意の列確率行列、$v>0$ を確率ベクトル、$0<\alpha<1$ とする。

このとき

$$
G
=
\alpha P
+
(1-\alpha)v\mathbf1^{\mathsf T}
$$

は正の列確率行列である。

従って一意な PageRank ベクトル $r>0$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各成分は

$$
g_{ij}
=
\alpha p_{ij}
+
(1-\alpha)v_i.
$$

$v_i>0$、$1-\alpha>0$ なので

$$
g_{ij}>0.
$$

従って $G>0$ です。

また第 $j$ 列の和は

$$
\begin{aligned}
\sum_i g_{ij}
&=
\alpha\sum_i p_{ij}
+
(1-\alpha)\sum_i v_i\\
&=
\alpha+(1-\alpha)\\
&=1.
\end{aligned}
$$

従って $G$ は正の列確率行列です。

[正行列に対する前節の結果](#thm-na11-positive-perron-frobenius)により、固有値1に対応する正固有ベクトルは定数倍を除いて一意です。成分和を1へ正規化すれば、一意な PageRank ベクトル $r>0$ が得られます。
<!-- proof-end -->

ここで teleportation は「検索アルゴリズム上の小細工」ではなく、任意のリンク行列を **正の列確率行列**へ変える数学的機構になっています。

Perron--Frobenius 理論によって、これで PageRank ベクトルの存在と一意性は保証されました。ただし数値計算としては、さらに

> 実際に反復したとき、どれくらいの速さで PageRank へ近づくのか

を知りたいところです。ここでは固有値を一つずつ調べる代わりに、PageRank の更新そのものを固定点写像として見ます。

---

## 11. PageRank 反復の1-ノルム誤差は毎回 $\alpha$ 倍以下になる

PageRank 方程式を

$$
T(x)
=
\alpha Px+(1-\alpha)v
$$

の固定点問題とみます。

<a id="prop-na11-pagerank-l1-distance"></a>
<!-- formal-statement-start -->
### 命題（PageRank 写像の1-ノルム縮小性）

$P$ を列確率行列、$v$ を確率ベクトル、$0<\alpha<1$ とし、

$$
T(x)=\alpha Px+(1-\alpha)v
$$

とする。

任意の確率ベクトル $x,y$ に対して

$$
\boxed{
\|T(x)-T(y)\|_1
\le
\alpha\|x-y\|_1
}
$$

が成り立つ。

従って PageRank 反復

$$
x_{k+1}=T(x_k)
$$

は一意な PageRank ベクトル $r$ に対して

$$
\boxed{
\|x_k-r\|_1
\le
\alpha^k\|x_0-r\|_1
}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意のベクトル $z$ に対して

$$
\begin{aligned}
\|Pz\|_1
&=
\sum_i
\left|
\sum_j p_{ij}z_j
\right|\\
&\le
\sum_i\sum_jp_{ij}|z_j|\\
&=
\sum_j|z_j|\sum_ip_{ij}\\
&=
\|z\|_1.
\end{aligned}
$$

従って

$$
\|P\|_1=1.
$$

また

$$
T(x)-T(y)=\alpha P(x-y)
$$

だから

$$
\|T(x)-T(y)\|_1
\le
\alpha\|x-y\|_1.
$$

$r=T(r)$ を使えば

$$
\|x_{k+1}-r\|_1
\le
\alpha\|x_k-r\|_1.
$$

帰納的に結論を得ます。
<!-- proof-end -->

この評価は、固有値を実際に計算しなくても収束率を保証します。

---

## 12. PageRank は線形方程式としても解ける

固定点方程式を移項すると

$$
\boxed{
(I-\alpha P)r
=
(1-\alpha)v
}
$$

です。

<a id="prop-na11-pagerank-neumann"></a>
<!-- formal-statement-start -->
### 命題（PageRank の線形方程式表示と Neumann 級数）

$P$ を列確率行列、$0<\alpha<1$ とする。

このとき $I-\alpha P$ は可逆で、

$$
\boxed{
(I-\alpha P)^{-1}
=
\sum_{k=0}^{\infty}\alpha^kP^k
}
$$

が成り立つ。

従って PageRank ベクトルは

$$
\boxed{
r
=
(1-\alpha)
\sum_{k=0}^{\infty}
\alpha^kP^kv
}
$$

と表される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列確率行列では

$$
\|\alpha P\|_1=\alpha<1.
$$

有限和

$$
S_m
=
\sum_{k=0}^m(\alpha P)^k
$$

に対し

$$
(I-\alpha P)S_m
=
I-(\alpha P)^{m+1}.
$$

また

$$
\|(\alpha P)^{m+1}\|_1
\le
\alpha^{m+1}
\to0.
$$

従って $S_m$ は収束し、

$$
(I-\alpha P)
\sum_{k=0}^{\infty}(\alpha P)^k
=
I.
$$

右から掛けても同様なので、級数は $(I-\alpha P)^{-1}$ です。

PageRank 方程式へ代入して結論を得ます。
<!-- proof-end -->

この表示は PageRank を

> $v$ から出発して0回、1回、2回、…リンクをたどった分布を、幾何級数の重みで平均したもの

と読めることを示します。

---

## 13. 反復差だけで停止誤差を保証できる

真の $r$ は未知なので、計算中に $\|x_k-r\|_1$ を直接測れません。

<a id="prop-na11-pagerank-stopping"></a>
<!-- formal-statement-start -->
### 命題（PageRank 反復の停止判定）

PageRank 反復

$$
x_{k+1}=T(x_k)
$$

に対して

$$
d_k
=
\|x_{k+1}-x_k\|_1
$$

と置く。

このとき

$$
\boxed{
\|x_k-r\|_1
\le
\frac{d_k}{1-\alpha}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

縮小性から

$$
\|x_{k+j+1}-x_{k+j}\|_1
\le
\alpha^jd_k.
$$

また $x_{k+m}\to r$ なので

$$
r-x_k
=
\sum_{j=0}^{\infty}
(x_{k+j+1}-x_{k+j}).
$$

三角不等式より

$$
\begin{aligned}
\|r-x_k\|_1
&\le
\sum_{j=0}^{\infty}
\|x_{k+j+1}-x_{k+j}\|_1\\
&\le
d_k\sum_{j=0}^{\infty}\alpha^j\\
&=
\frac{d_k}{1-\alpha}.
\end{aligned}
$$
<!-- proof-end -->

目標誤差を $\varepsilon$ とするなら、

$$
d_k\le(1-\alpha)\varepsilon
$$

を停止条件にすれば十分です。

---

## 14. ダンピング係数は収束速度と感度にも効く

$\alpha$ が大きいほどリンク行列 $P$ の影響が強くなります。一方、縮小率も $\alpha$ なので、$\alpha$ が1へ近いほど反復は遅くなります。

さらにリンク行列の摂動に対しても $1-\alpha$ が現れます。

<a id="prop-na11-pagerank-perturbation"></a>
<!-- formal-statement-start -->
### 命題（PageRank のリンク行列に対する1-ノルム感度評価）

$P,Q$ を列確率行列とし、同じ $v>0$ と $0<\alpha<1$ を用いて得られる PageRank ベクトルをそれぞれ $r_P,r_Q$ とする。

このとき

$$
\boxed{
\|r_P-r_Q\|_1
\le
\frac{\alpha}{1-\alpha}
\|P-Q\|_1
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定点方程式を引くと

$$
r_P-r_Q
=
\alpha P(r_P-r_Q)
+
\alpha(P-Q)r_Q.
$$

1-ノルムを取り、

$$
\|Pz\|_1\le\|z\|_1,
\qquad
\|r_Q\|_1=1
$$

を使うと

$$
\|r_P-r_Q\|_1
\le
\alpha\|r_P-r_Q\|_1
+
\alpha\|P-Q\|_1.
$$

従って

$$
(1-\alpha)\|r_P-r_Q\|_1
\le
\alpha\|P-Q\|_1.
$$

$1-\alpha>0$ で割れば結論を得ます。
<!-- proof-end -->

これは上界ですから、実際の変化が必ずこの大きさになるわけではありません。しかし

$$
\frac{\alpha}{1-\alpha}
$$

が現れることで、$\alpha\to1$ では最悪時の感度も悪化することが分かります。

---

## 15. 数値計算では密な PageRank 行列を作らなくてよい

PageRank は固有値問題

$$
Gr=r
$$

ですが、大規模 Web グラフで $G$ を密行列として保持する必要はありません。

確率ベクトル $x$ なら

$$
\mathbf1^{\mathsf T}x=1
$$

なので

$$
Gx
=
\alpha Px+(1-\alpha)v.
$$

従って疎な $P$ の行列ベクトル積だけで反復できます。

一方、

$$
(I-\alpha P)r=(1-\alpha)v
$$

と見れば NA8・NA9 の線形方程式解法も候補です。

どちらを使うかは、

- 行列サイズ
- 疎性
- 必要精度
- 1回だけ解くか、複数の $v$ で解くか
- 前処理や因数分解を作るコスト

で決まります。

---

## 16. 仮定を外すと何が壊れるか

### 16.1 非負性を失う

負の成分があると

$$
|Az|\le A|z|
$$

という成分比較が使えません。Perron--Frobenius の順序論的な証明機構が壊れます。

### 16.2 既約性を失う

閉じた部分が複数あると、固有値1に対応する非負固有ベクトルが複数存在し、定常確率ベクトルの一意性が壊れることがあります。

### 16.3 原始性を失う

既約でも周期性が残ると、絶対値1の固有値として $-1$ などが残り、$P^kx_0$ が振動できます。

### 16.4 teleportation を失う

$\alpha=1$ では $G=P$ です。元の $P$ が既約・原始でなければ、一意性と反復収束を一括保証できません。

### 16.5 $v>0$ を失う

$v$ に0成分があると $G$ が正行列になるとは限りません。「任意の $P$ に正行列版 Perron--Frobenius を適用する」という証明は使えなくなります。

---

## 17. 演習

### NA11-A01 既約性と原始性を見分ける

- Level: A
- 目安時間: 15分

$$
A=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
1&1\\
1&0
\end{pmatrix}
$$

とする。

1. $A,B$ が非負行列であることを確認せよ。
2. $A$ が既約であることを確認せよ。
3. $A$ が原始でないことを示せ。
4. $B^2$ を計算し、$B$ が原始であることを示せ。

<!-- solution-start -->
#### 詳細解答

両行列の成分はすべて0以上なので $A,B\ge0$ です。

$A$ の有向グラフには

$$
1\to2,
\qquad
2\to1
$$

があるので既約です。

一方、

$$
A^2=I
$$

なので

$$
A^{2k}=I,
\qquad
A^{2k+1}=A.
$$

どの冪にも0が残るため $A$ は原始ではありません。

次に

$$
B^2
=
\begin{pmatrix}
2&1\\
1&1
\end{pmatrix}
>0.
$$

従って $B$ は原始です。
<!-- solution-end -->

### NA11-A02 列確率行列の定常確率ベクトル

- Level: A
- 目安時間: 15分

$$
P=
\begin{pmatrix}
1/2&1/4\\
1/2&3/4
\end{pmatrix}
$$

とする。

1. $P$ が列確率行列であることを確認せよ。
2. $P\pi=\pi$、$\mathbf1^{\mathsf T}\pi=1$ を満たす $\pi$ を求めよ。
3. $\pi$ が一意である理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

第1列の和は

$$
\frac12+\frac12=1,
$$

第2列の和は

$$
\frac14+\frac34=1.
$$

従って $P$ は列確率行列です。

$$
\pi=
\begin{pmatrix}
\pi_1\\
\pi_2
\end{pmatrix}
$$

と置くと、

$$
\frac12\pi_1+\frac14\pi_2=\pi_1
$$

より

$$
\pi_2=2\pi_1.
$$

さらに $\pi_1+\pi_2=1$ なので

$$
\boxed{
\pi=
\begin{pmatrix}
1/3\\
2/3
\end{pmatrix}
}.
$$

$P>0$ なので[正行列に対する前節の結果](#thm-na11-positive-perron-frobenius)から固有値1の正固有ベクトルは定数倍を除いて一意です。成分和1の条件で定数倍も固定されるため、$\pi$ は一意です。
<!-- solution-end -->

### NA11-A03 3ページの PageRank

- Level: A
- 目安時間: 20分

$$
P=
\begin{pmatrix}
0&0&1\\
1/2&0&0\\
1/2&1&0
\end{pmatrix},
\qquad
\alpha=\frac12,
\qquad
v=
\frac13
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
$$

とする。

1. $P$ が列確率行列であることを確認せよ。
2. PageRank 方程式を連立一次方程式へ書き直せ。
3.
   $$
   r=
   \begin{pmatrix}
   14/39\\
   10/39\\
   5/13
   \end{pmatrix}
   $$
   が PageRank ベクトルであることを直接確認せよ。

<!-- solution-start -->
#### 詳細解答

各列の和はそれぞれ

$$
1,\qquad1,\qquad1
$$

なので $P$ は列確率行列です。

PageRank 方程式は

$$
r=\frac12Pr+\frac12v,
$$

従って

$$
\boxed{
\left(I-\frac12P\right)r
=
\frac16
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
}.
$$

候補を

$$
r=
\begin{pmatrix}
14/39\\
10/39\\
15/39
\end{pmatrix}
$$

と書けば

$$
Pr=
\begin{pmatrix}
15/39\\
7/39\\
17/39
\end{pmatrix}.
$$

従って

$$
\frac12Pr+\frac12v
=
\begin{pmatrix}
15/78\\
7/78\\
17/78
\end{pmatrix}
+
\begin{pmatrix}
13/78\\
13/78\\
13/78
\end{pmatrix}
=
r.
$$

さらに

$$
\mathbf1^{\mathsf T}r
=
\frac{14+10+15}{39}
=
1.
$$

よって確かに PageRank ベクトルです。
<!-- solution-end -->

### NA11-A04 反復差から停止誤差を保証する

- Level: A
- 目安時間: 10分

$\alpha=0.85$ とする。

ある反復で

$$
d_k
=
\|x_{k+1}-x_k\|_1
=
3\times10^{-9}
$$

となった。

1. $\|x_k-r\|_1$ の上界を求めよ。
2. $\|x_k-r\|_1\le10^{-7}$ を保証するための十分な $d_k$ の上限を求めよ。

<!-- solution-start -->
#### 詳細解答

停止判定から

$$
\|x_k-r\|_1
\le
\frac{d_k}{1-\alpha}.
$$

ここで $1-\alpha=0.15$ なので

$$
\|x_k-r\|_1
\le
\frac{3\times10^{-9}}{0.15}
=
\boxed{
2\times10^{-8}
}.
$$

次に

$$
\frac{d_k}{0.15}\le10^{-7}
$$

とすればよいので

$$
\boxed{
d_k\le1.5\times10^{-8}
}
$$

で十分です。
<!-- solution-end -->

### NA11-B01 既約でも冪乗反復が収束しないことを示す

- Level: B
- 目安時間: 20分

$$
P=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

とする。

1. $P$ が既約な列確率行列であることを示せ。
2. 定常確率ベクトルを求めよ。
3. $x_0=(1,0)^{\mathsf T}$ からの反復 $x_{k+1}=Px_k$ が収束しないことを示せ。
4. 固有値を求め、不足している仮定を説明せよ。

<!-- solution-start -->
#### 詳細解答

各列和が1で、グラフには $1\to2$ と $2\to1$ があるので、$P$ は既約な列確率行列です。

$$
P\pi=\pi,
\qquad
\mathbf1^{\mathsf T}\pi=1
$$

を解けば

$$
\boxed{
\pi=
\frac12
\begin{pmatrix}
1\\
1
\end{pmatrix}
}.
$$

一方、

$$
x_0=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
x_1=
\begin{pmatrix}
0\\
1
\end{pmatrix},
\qquad
x_2=x_0.
$$

従って偶数回と奇数回で交互に振動し、収束しません。

特性方程式は

$$
\lambda^2-1=0
$$

なので固有値は $1,-1$ です。

$-1$ が Perron 固有値1と同じ絶対値を持つため周期振動が残ります。不足しているのは **原始性**です。
<!-- solution-end -->

### NA11-B02 Neumann 級数の打切り誤差

- Level: B
- 目安時間: 25分

$$
r
=
(1-\alpha)
\sum_{k=0}^{\infty}
\alpha^kP^kv
$$

とし、

$$
r^{(m)}
=
(1-\alpha)
\sum_{k=0}^{m}
\alpha^kP^kv
$$

とする。

1.
   $$
   \|r-r^{(m)}\|_1
   \le
   \alpha^{m+1}
   $$
   を示せ。
2. $\alpha=0.8$ のとき、この上界を $10^{-6}$ 以下にする十分な $m$ を求めよ。

<!-- solution-start -->
#### 詳細解答

差は

$$
r-r^{(m)}
=
(1-\alpha)
\sum_{k=m+1}^{\infty}
\alpha^kP^kv.
$$

列確率行列では

$$
\|P^kv\|_1\le\|v\|_1=1
$$

なので

$$
\begin{aligned}
\|r-r^{(m)}\|_1
&\le
(1-\alpha)
\sum_{k=m+1}^{\infty}\alpha^k\\
&=
\boxed{
\alpha^{m+1}
}.
\end{aligned}
$$

$\alpha=0.8$ では

$$
0.8^{m+1}\le10^{-6}
$$

を要求します。

$$
m+1
\ge
\frac{\log 10^{-6}}{\log 0.8}
\approx61.9
$$

なので

$$
\boxed{
m\ge61
}
$$

で十分です。
<!-- solution-end -->

### NA11-B03 ダンピング係数と感度

- Level: B
- 目安時間: 20分

二つの列確率行列 $P,Q$ が

$$
\|P-Q\|_1=0.01
$$

を満たすとする。

1. $\alpha=0.5$ のとき PageRank ベクトル差の上界を求めよ。
2. $\alpha=0.9$ のとき同じ上界を求めよ。
3. $\alpha$ を大きくすることの数値的トレードオフを説明せよ。

<!-- solution-start -->
#### 詳細解答

感度評価は

$$
\|r_P-r_Q\|_1
\le
\frac{\alpha}{1-\alpha}
\|P-Q\|_1
$$

です。

$\alpha=0.5$ なら係数は1なので

$$
\boxed{
\|r_P-r_Q\|_1\le0.01
}.
$$

$\alpha=0.9$ なら係数は9なので

$$
\boxed{
\|r_P-r_Q\|_1\le0.09
}.
$$

$\alpha$ を大きくすると元のリンク構造を強く反映する一方、

- 固定点反復の縮小率 $\alpha$ が1へ近づいて収束が遅くなる
- 最悪時感度係数 $\alpha/(1-\alpha)$ が大きくなる

という代償があります。
<!-- solution-end -->

### NA11-C01 dangling node を含む PageRank を構成する

- Level: C
- 目安時間: 35分

3ページからなる有向グラフを考える。

- ページ1はページ2だけへリンクする。
- ページ2はページ1とページ3へリンクする。
- ページ3には出リンクがない。

dangling node の置換と teleportation の両方に

$$
v=
\frac13
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
$$

を使い、

$$
\alpha=\frac12
$$

とする。

1. dangling node を修正した列確率行列 $P$ を作れ。
2. PageRank 行列 $G$ が正の列確率行列であることを確認せよ。
3. PageRank 方程式を解き、
   $$
   r=
   \begin{pmatrix}
   5/16\\
   3/8\\
   5/16
   \end{pmatrix}
   $$
   を得よ。
4. 任意の確率ベクトル $x_0$ に対して
   $$
   \|x_k-r\|_1
   \le
   2^{-k}\|x_0-r\|_1
   $$
   を説明せよ。
5. $\alpha=1$ とすると、どの保証が失われるか説明せよ。

<!-- solution-start -->
#### 詳細解答

ページ1の列は

$$
\begin{pmatrix}
0\\
1\\
0
\end{pmatrix},
$$

ページ2の列は

$$
\begin{pmatrix}
1/2\\
0\\
1/2
\end{pmatrix}
$$

です。

ページ3は dangling node なので $v$ で置き換えます。従って

$$
\boxed{
P=
\begin{pmatrix}
0&1/2&1/3\\
1&0&1/3\\
0&1/2&1/3
\end{pmatrix}
}.
$$

各列和は1です。

PageRank 行列は

$$
G
=
\frac12P
+
\frac12v\mathbf1^{\mathsf T}.
$$

第2項の各列は

$$
\frac16
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
$$

なので、$G$ の全成分は正です。また二つの項の列和はそれぞれ $1/2$ なので、$G$ の列和は1です。

PageRank 方程式

$$
r
=
\frac12Pr
+
\frac16
\begin{pmatrix}
1\\
1\\
1
\end{pmatrix}
$$

を

$$
r=
\begin{pmatrix}
r_1\\
r_2\\
r_3
\end{pmatrix}
$$

で書くと

$$
r_1
=
\frac14r_2+\frac16r_3+\frac16,
$$

$$
r_2
=
\frac12r_1+\frac16r_3+\frac16,
$$

$$
r_3
=
\frac14r_2+\frac16r_3+\frac16.
$$

第1式と第3式から $r_1=r_3=a$ と置けます。$r_2=b$ と置けば

$$
2a+b=1
$$

かつ

$$
b=\frac23a+\frac16.
$$

従って

$$
a=\frac5{16},
\qquad
b=\frac38.
$$

よって

$$
\boxed{
r=
\begin{pmatrix}
5/16\\
3/8\\
5/16
\end{pmatrix}
}.
$$

$\alpha=1/2$ なので縮小性から

$$
\|x_{k+1}-r\|_1
\le
\frac12\|x_k-r\|_1.
$$

帰納的に

$$
\boxed{
\|x_k-r\|_1
\le
2^{-k}\|x_0-r\|_1
}.
$$

最後に $\alpha=1$ とすると teleportation が消え、$G=P$ になります。一般の $P$ について

- 正行列である保証
- 既約性
- 原始性
- 縮小率 $\alpha<1$

を一括して得られなくなります。従って一意な正 PageRank ベクトルと任意初期値からの幾何収束を保証していた仕組みが失われます。
<!-- solution-end -->

---

## 18. この章の要点

1. 非負行列では $|Az|\le A|z|$ という成分比較が使える。
2. 行列冪の指数成長率は $\rho(A)$ で決まる。
3. 正行列では $\rho(A)$ は正の単純固有値で、正固有ベクトルは一意であり、他の固有値は絶対値が $\rho(A)$ より小さい領域にある。
4. 既約非負行列でも正の Perron 固有ベクトルは一意だが、絶対値が $\rho(A)$ に等しい別固有値が残ることがある。
5. 原始性 $A^m>0$ は周期性を排除し、他の固有値の絶対値を $\rho(A)$ より厳密に小さくする。
6. 列確率行列では $\rho(P)=1$ である。
7. 既約列確率行列は一意な正の定常確率ベクトルを持つ。
8. 原始列確率行列では
   $$
   P^k\to\pi\mathbf1^{\mathsf T}.
   $$
9. PageRank の teleportation は任意の列確率行列を正行列へ変える。
10. PageRank 反復は
    $$
    \|T(x)-T(y)\|_1
    \le
    \alpha\|x-y\|_1
    $$
    という明示的な縮小率を持つ。
11. PageRank は
    $$
    (I-\alpha P)r=(1-\alpha)v
    $$
    という線形方程式でもあり、Neumann 級数で表せる。
12. 反復差から停止誤差を評価でき、リンク行列摂動への感度には $\alpha/(1-\alpha)$ が現れる。

次の NA12 では、NA9 で線形方程式の Krylov 法として導入した共役勾配法を、実対称正定値二次関数の最小化法として読み直します。
