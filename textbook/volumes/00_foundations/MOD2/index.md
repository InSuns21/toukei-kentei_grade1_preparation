# MOD2 抽象代数 X：Smith 標準形・PID 上有限生成加群

<!-- definition-example-audit: strict -->

[MOD1](../MOD1/index.md) では、加群・商加群・自由加群・ねじれを導入し、有限基底を持つ自由加群の間の準同型が行列で表されるところまで進みました。本章ではその行列を「基底を変えてどこまで単純にできるか」という問題へ進めます。

体上なら行基本変形だけで階数を読むことができます。しかし係数環が $\mathbb Z$ や $F[x]$ になると、割れない係数が残ります。その残り方こそが加群の構造です。

本章の流れは

$$
\text{自由加群の準同型}
\longrightarrow
\text{Smith 標準形}
\longrightarrow
\text{余核}
\longrightarrow
\text{PID 上有限生成加群}
$$

です。

この一本の流れから、

- 有限生成 Abel 群、
- 整数格子の商、
- $F[x]$-加群としての線形自己写像、

が同じ構造定理で見えるようになります。

> **この章の停止線**
>
> 本章では可換 PID 上の有限生成加群を扱います。体拡大と代数的元の理論は FLD1 へ送ります。LA4 の Jordan 標準形そのものは再証明せず、最後に加群構造論との対応だけを整理します。

---

## 1. 行列の左右から基底を変える

$R$ を PID とします。[LA3B の行列式](../LA3B/index.md#def-la3b-matrix-determinant)を既知とし、自由加群間の準同型

$$
\varphi:R^n\to R^m
$$

は、基底を選べば $m\times n$ 行列 $A$ で表されます。

始域の基底を変えると $A$ の右から可逆行列が掛かり、終域の基底を変えると左から可逆行列が掛かります。

<a id="def-mod2-matrix-equivalence"></a>
<!-- formal-statement-start -->
> **定義（PID 上行列の同値）**
>
> $A,B\in M_{m,n}(R)$ とする。
>
> ある可逆行列
>
$$
> P\in GL_m(R),
> \qquad
> Q\in GL_n(R)
$$
>
> が存在して
>
$$
> B=PAQ
$$
>
> と書けるとき、$A$ と $B$ は $R$ 上 **同値** であるという。
>
> 行の交換、列の交換、行または列への別の行または列の倍の加算、単元による行または列の乗算を **基本変形** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod2-matrix-equivalence -->
### 1.1 定義の確認：整数行列の一回の行基本変形

$$
A=
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
$$

に対して第2行から第1行の $3$ 倍を引くと

$$
\begin{pmatrix}
1&0\\
-3&1
\end{pmatrix}
A
=
\begin{pmatrix}
2&4\\
0&-4
\end{pmatrix}.
$$

左から掛けた行列は逆行列

$$
\begin{pmatrix}
1&0\\
3&1
\end{pmatrix}
$$

を持つので $\mathbb Z$ 上可逆です。したがってこの変形は基底を変えただけで、準同型そのものの同型類は変えていません。
<!-- definition-example-end -->

基本変形が可逆であることが重要です。例えば「行を $2$ 倍する」は $\mathbb Z$ では逆変形に $1/2$ が必要なので許されません。許される定数倍は $\pm1$ のような単元だけです。

---

## 2. 二つの係数を最大公約元へまとめる

整数の

$$
\gcd(a,b)
$$

に相当するものは PID では $(a,b)$ の生成元です。

[RNG3 の Bézout 等式](../RNG3/index.md)より、$d$ が $(a,b)$ の生成元なら

$$
d=ua+vb
$$

となる $u,v\in R$ が存在します。

<a id="lem-mod2-bezout-two-entry"></a>
<!-- formal-statement-start -->
> **補題（Bézout による二成分簡約）**
>
> $R$ を PID、$a,b\in R$ とする。
>
> $(a,b)=(d)$ とすると、ある $U\in GL_2(R)$ が存在して
>
$$
> U
> \begin{pmatrix}
> a\\
> b
> \end{pmatrix}
> =
> \begin{pmatrix}
> d\\
> 0
> \end{pmatrix}.
$$
>
> 同様に、行ベクトル $(a,b)$ も右から可逆行列を掛けて $(d,0)$ にできる。
<!-- formal-statement-end -->

### 証明の見取り図

$a=da'$, $b=db'$ と書きます。Bézout 等式を $d$ で割ると

$$
ua'+vb'=1.
$$

そこで

$$
U=
\begin{pmatrix}
u&v\\
-b'&a'
\end{pmatrix}
$$

と置けば、行列式は $1$ です。

<!-- proof-start -->
### 証明

$(a,b)=(d)$ なので $d$ は $a,b$ を割り、

$$
a=da',
\qquad
b=db'
$$

と書けます。

また $d=ua+vb$ を満たす $u,v\in R$ があるので、

$$
d
=
u(da')+v(db')
=
d(ua'+vb').
$$

$d=0$ なら $a=b=0$ で主張は明らかです。以下 $d\ne0$ とします。$R$ は整域だから $d$ を消去でき、

$$
ua'+vb'=1.
$$

ここで

$$
U=
\begin{pmatrix}
u&v\\
-b'&a'
\end{pmatrix}
$$

と置くと

$$
\det U
=
ua'+vb'
=
1.
$$

よって $U$ は可逆です。

さらに

$$
U
\begin{pmatrix}
a\\
b
\end{pmatrix}
=
\begin{pmatrix}
ua+vb\\
-b'a+a'b
\end{pmatrix}
=
\begin{pmatrix}
d\\
-d a'b'+d a'b'
\end{pmatrix}
=
\begin{pmatrix}
d\\
0
\end{pmatrix}.
$$

行ベクトル版は転置した変形を右から掛ければ得られます。$\square$
<!-- proof-end -->

この補題は「割り算の余りを小さくする」議論ではありません。PID にある Bézout 等式だけで二つの係数を一つの生成元へ圧縮しています。

---

## 3. Smith 標準形

<a id="def-mod2-smith-normal-form"></a>
<!-- formal-statement-start -->
> **定義（Smith 標準形・不変因子）**
>
> $R$ を PID とする。
>
> $m\times n$ 行列
>
$$
> D=
> \operatorname{diag}(d_1,\dots,d_r,0,\dots,0)
$$
>
> が
>
$$
> d_i\ne0,
> \qquad
> d_1\mid d_2\mid\cdots\mid d_r
$$
>
> を満たすとき、$D$ を **Smith 標準形** という。
>
> 非零対角成分 $d_1,\dots,d_r$ を **不変因子** という。
>
> 一般の PID では不変因子は単元倍を除いて考える。$\mathbb Z$ では正、$F[x]$ では最高次係数が $1$ のものを選べば代表を一意に正規化できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod2-smith-normal-form -->
### 3.1 定義の確認：$\operatorname{diag}(2,4)$

$\mathbb Z$ 上

$$
D=
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}
$$

では

$$
2\mid4.
$$

したがって $D$ は Smith 標準形です。

一方

$$
\operatorname{diag}(4,2)
$$

は $4\nmid2$ なので、その順序のままでは Smith 標準形ではありません。行と列を同じように交換すれば $\operatorname{diag}(2,4)$ へ直せます。
<!-- definition-example-end -->

<a id="thm-mod2-smith-normal-form"></a>
<!-- formal-statement-start -->
> **定理（Smith 標準形定理）**
>
> $R$ を PID、$A\in M_{m,n}(R)$ とする。
>
> このとき $A$ と同値な Smith 標準形
>
$$
> D=
> \operatorname{diag}(d_1,\dots,d_r,0,\dots,0)
$$
>
> が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

証明の核心は三段です。

1. 左上の非零元と他の成分を Bézout 変形で混ぜ、左上の主イデアルを必要なら真に大きくする。
2. PID のイデアル昇鎖停止により、この改善は有限回で止まる。
3. 止まったとき左上成分は行列の全成分を割る。そこで第1行・第1列を消去し、右下部分行列へ帰納する。

「PID だから Euclid の除法ができる」とはしていません。一般の PID は Euclid 整域とは限らないからです。

<!-- proof-start -->
### 証明

$A=0$ なら零行列自身が Smith 標準形です。以下 $A\ne0$ とします。

まず非零成分を行交換・列交換で $(1,1)$ 成分へ移し、その成分を $a$ とします。

第1列の別の成分 $b$ と $a$ に対し、[Bézout による二成分簡約](#lem-mod2-bezout-two-entry)を対応する二行へ適用すると、$(1,1)$ 成分を $(a,b)$ の生成元 $d$ へ変え、同じ列のその成分を $0$ にできます。

同様に第1行の成分について列変形を使えます。

この操作を繰り返して、第1行と第1列の $(1,1)$ 以外を $0$ にした形

$$
\begin{pmatrix}
a&0\\
0&B
\end{pmatrix}
$$

を得たとします。

もし $a$ が $B$ の全成分を割るなら、この段階は完了です。

そうでないとし、$B$ の成分 $b$ で $a\nmid b$ となるものを一つ選びます。対応する行を第1行へ加えると、第1列の先頭は $a$ のままで、第1行のある位置に $b$ が現れます。そこで列方向の Bézout 変形を施すと、新しい左上成分 $d$ は

$$
(a,b)=(d)
$$

の生成元になります。

$a\nmid b$ なので $b\notin(a)$ です。従って

$$
(a)\subsetneq(a,b)=(d).
$$

つまり、この「割れない成分を取り込む」操作が起こるたびに、左上成分が生成する主イデアルは真に大きくなります。

[RNG3 の PID におけるイデアル昇鎖停止](../RNG3/index.md#lem-rng3-pid-acc)により、

$$
(a_1)\subsetneq(a_2)\subsetneq(a_3)\subsetneq\cdots
$$

という真の昇鎖は無限には続きません。

したがって有限回後には、左上成分 $d_1$ が残りの全成分を割る状態に到達します。

再び第1行・第1列を消去して

$$
A\sim
\begin{pmatrix}
d_1&0\\
0&A_1
\end{pmatrix}
$$

とできます。しかも $d_1$ は $A_1$ の全成分を割ります。

ここで $A_1$ の行数と列数は少なくとも一方が1減っています。サイズに関する帰納法により

$$
A_1
\sim
\operatorname{diag}(d_2,\dots,d_r,0,\dots,0)
$$

で

$$
d_2\mid d_3\mid\cdots\mid d_r
$$

とできます。

$d_1$ は $A_1$ の全成分を割っていたので、行列同値変形後の全成分も $d_1$ の倍数です。実際、行・列基本変形は成分の $R$-線形結合しか作らないからです。特に

$$
d_1\mid d_2.
$$

従って

$$
d_1\mid d_2\mid\cdots\mid d_r.
$$

以上で Smith 標準形の存在が示されました。$\square$
<!-- proof-end -->

### 3.2 具体計算

$$
A=
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
$$

を考えます。

第2行から第1行の $3$ 倍を引くと

$$
A
\sim
\begin{pmatrix}
2&4\\
0&-4
\end{pmatrix}.
$$

第2列から第1列の $2$ 倍を引くと

$$
\begin{pmatrix}
2&0\\
0&-4
\end{pmatrix}.
$$

第2行を $-1$ 倍すると

$$
\boxed{
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}
}
$$

です。

したがって不変因子は

$$
2,\ 4
$$

です。

---

## 4. 不変因子はなぜ変形順序に依らないのか

存在だけでは、別の基本変形を選んだとき違う対角成分が出ないか心配です。その一意性を小行列式で固定します。

[LA3B の Leibniz 公式による行列式](../LA3B/index.md#def-la3b-matrix-determinant)を $R$ 上でも同じ有限和・有限積の式で用います。可換環 $R$ 上の $k\times k$ 行列 $C=(c_{ij})$ に対して

$$
\det C
=
\sum_{\sigma\in S_k}
\operatorname{sgn}(\sigma)
\prod_{j=1}^k c_{\sigma(j),j}
$$

と書きます。LA3B の証明は係数の可換性だけを使うので、同じ式から行の交換で符号が変わること、一つの行に関して線形であること、同じ二行を持つ行列式が $0$ になることが従います。以下で必要なのはこの三性質だけです。

<a id="def-mod2-determinantal-ideal"></a>
<!-- formal-statement-start -->
> **定義（小行列式イデアル）**
>
> $A\in M_{m,n}(R)$ とし、$k\ge1$ とする。
>
> $A$ の全ての $k\times k$ 小行列式で生成されるイデアルを
>
$$
> \Delta_k(A)
$$
>
> と書き、$k$ 次 **小行列式イデアル** という。
>
> また
>
$$
> \Delta_0(A)=R
$$
>
> と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod2-determinantal-ideal -->
### 4.1 定義の確認：2×2 整数行列

$$
A=
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
$$

では $1$ 次小行列式は成分そのものなので

$$
\Delta_1(A)
=
(2,4,6,8)
=
(2).
$$

$2$ 次小行列式は行列式一個だけで、

$$
\det A
=
16-24
=
-8.
$$

したがって

$$
\Delta_2(A)=(-8)=(8).
$$
<!-- definition-example-end -->

<a id="prop-mod2-determinantal-invariance"></a>
<!-- formal-statement-start -->
> **命題（小行列式イデアルの行列同値不変性）**
>
> $A,B\in M_{m,n}(R)$ が同値なら、全ての $k$ に対して
>
$$
> \Delta_k(A)=\Delta_k(B).
$$
<!-- formal-statement-end -->

### 証明の見取り図

基本変形一回だけ確認すれば十分です。

- 行・列交換は小行列式の符号を変えるだけ。
- 単元倍は小行列式を単元倍する。
- 行への別行の倍の加算では、新しい小行列式は古い小行列式の $R$-線形結合になる。

逆基本変形も同じ型なので、イデアルの包含が両向きに得られます。

<!-- proof-start -->
### 証明

行基本変形について示します。列についても同様です。

行交換では、各 $k$ 次小行列式は元の小行列式と同じか符号だけが変わるか、選ぶ行集合が入れ替わるだけです。$-1$ は単元なので生成イデアルは変わりません。

一つの行を単元 $u$ 倍する場合、その行を含む小行列式は $u$ 倍され、含まないものは変わりません。逆変形では $u^{-1}$ を掛けるので、生成イデアルは同じです。

最後に第 $i$ 行へ第 $j$ 行の $c$ 倍を加える変形を考えます。

変形後の $k$ 次小行列式で第 $i$ 行を含まないものは変化しません。

第 $i$ 行を含むものは、行列式の一つの行に関する線形性から

$$
M'=M+cN
$$

と書けます。ここで $M,N$ は変形前の $k$ 次小行列式です。第 $j$ 行も同時に選ばれている場合は $N=0$ です。

したがって変形後の全ての小行列式は、変形前の小行列式が生成するイデアルに属します。よって

$$
\Delta_k(B)\subset\Delta_k(A).
$$

この行基本変形の逆は「第 $i$ 行から第 $j$ 行の $c$ 倍を引く」変形なので、同じ議論で

$$
\Delta_k(A)\subset\Delta_k(B).
$$

従って等号です。

有限回の基本変形を合成しても等号は保たれるので、同値な行列について主張が成立します。$\square$
<!-- proof-end -->

<a id="thm-mod2-invariant-factor-uniqueness"></a>
<!-- formal-statement-start -->
> **定理（Smith 不変因子の一意性）**
>
> $A$ の二つの Smith 標準形の非零対角成分を
>
$$
> d_1,\dots,d_r,
> \qquad
> c_1,\dots,c_s
$$
>
> とし、
>
$$
> d_1\mid\cdots\mid d_r,
> \qquad
> c_1\mid\cdots\mid c_s
$$
>
> とする。
>
> このとき $r=s$ であり、各 $i$ について $d_i$ と $c_i$ は同伴である。
<!-- formal-statement-end -->

### 証明の見取り図

Smith 標準形では

$$
\Delta_k=(d_1d_2\cdots d_k)
$$

です。したがって小行列式イデアルから積が順に復元され、整域で消去すれば各因子が単元倍を除いて決まります。

<!-- proof-start -->
### 証明

Smith 標準形

$$
D=\operatorname{diag}(d_1,\dots,d_r,0,\dots,0)
$$

を考えます。

$k\le r$ なら、非零の $k$ 次小行列式は $k$ 個の対角成分の積です。

特に

$$
d_1d_2\cdots d_k
$$

自身が小行列式として現れます。

一方、任意の $k$ 個の非零対角成分

$$
d_{i_1}\cdots d_{i_k}
$$

では

$$
1\le i_1<\cdots<i_k
$$

だから整除鎖より

$$
d_1d_2\cdots d_k
\mid
d_{i_1}\cdots d_{i_k}.
$$

従って

$$
\Delta_k(D)
=
(d_1d_2\cdots d_k).
$$

$k>r$ では全ての $k$ 次小行列式が $0$ なので

$$
\Delta_k(D)=(0).
$$

同様に別の Smith 標準形 $C$ では

$$
\Delta_k(C)
=
(c_1\cdots c_k)
$$

です。

[小行列式イデアルの行列同値不変性](#prop-mod2-determinantal-invariance)から

$$
\Delta_k(D)=\Delta_k(A)=\Delta_k(C).
$$

まず $\Delta_k$ が非零である最大の $k$ が両方で同じなので

$$
r=s.
$$

$k=1$ から

$$
(d_1)=(c_1)
$$

なので $d_1,c_1$ は同伴です。

帰納的に $d_1,\dots,d_{k-1}$ と $c_1,\dots,c_{k-1}$ が対応して同伴だとします。

すると

$$
(d_1\cdots d_k)
=
(c_1\cdots c_k).
$$

したがってある単元 $u$ が存在して

$$
d_1\cdots d_k
=
u\,c_1\cdots c_k.
$$

帰納法の仮定により

$$
d_1\cdots d_{k-1}
=
v\,c_1\cdots c_{k-1}
$$

となる単元 $v$ があります。

代入すると

$$
v(c_1\cdots c_{k-1})d_k
=
u(c_1\cdots c_{k-1})c_k.
$$

$R$ は整域で、ここに現れる因子は非零なので消去でき、

$$
vd_k=uc_k.
$$

よって

$$
d_k=(u v^{-1})c_k
$$

であり、$d_k,c_k$ は同伴です。

帰納法により全ての不変因子が単元倍を除いて一意です。$\square$
<!-- proof-end -->

---

## 5. PID 上では自由加群の部分加群も自由になる

一般の環では、自由加群の部分加群が自由とは限りません。PID はここで強い役割を果たします。

<a id="thm-mod2-submodule-free"></a>
<!-- formal-statement-start -->
> **定理（PID 上自由加群の部分加群は自由）**
>
> $R$ を PID とし、$N\subset R^n$ を部分加群とする。
>
> このとき $N$ は自由 $R$-加群であり、その有限基底の元数は高々 $n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$n$ に関する帰納法です。

第1成分への射影

$$
\pi:R^n\to R
$$

を $N$ に制限すると、像 $\pi(N)$ は $R$ のイデアルです。PID なので一元生成できます。その生成元を第1成分に持つ元を一本選び、残りを第1成分が $0$ の部分へ押し込みます。

<!-- proof-start -->
### 証明

$n$ に関する帰納法で示します。

$n=0$ なら $R^0=0$ で、部分加群は $0$ だけなので自明です。

$n\ge1$ とし、主張が $R^{n-1}$ で成立すると仮定します。

第1成分への射影

$$
\pi:R^n\to R,
\qquad
\pi(x_1,\dots,x_n)=x_1
$$

を考えます。

$\pi(N)$ は $R$ のイデアルです。$R$ は PID なので

$$
\pi(N)=(d)
$$

となる $d\in R$ があります。

### 場合1：$d=0$

このとき $N$ の全ての元は第1成分が $0$ なので

$$
N\subset
\{0\}\oplus R^{n-1}.
$$

右辺を $R^{n-1}$ と同一視すれば、帰納法の仮定により $N$ は自由で階数は高々 $n-1$ です。

### 場合2：$d\ne0$

$d\in\pi(N)$ なので、ある $y\in N$ が存在して

$$
\pi(y)=d.
$$

さらに

$$
N_0
=
N\cap\ker\pi
$$

と置きます。

任意の $x\in N$ を取ると $\pi(x)\in(d)$ だから、ある $r\in R$ が存在して

$$
\pi(x)=rd.
$$

よって

$$
\pi(x-ry)
=
\pi(x)-r\pi(y)
=
rd-rd
=
0.
$$

従って

$$
x-ry\in N_0
$$

であり、

$$
x=ry+(x-ry)
$$

と書けます。

したがって

$$
N=Ry+N_0.
$$

この和が直和であることを示します。

$ry\in N_0$ なら

$$
0=\pi(ry)=rd.
$$

$d\ne0$ で $R$ は整域なので

$$
r=0.
$$

従って

$$
Ry\cap N_0=0.
$$

ゆえに

$$
N=Ry\oplus N_0.
$$

$N_0$ は第1成分が $0$ なので $R^{n-1}$ の部分加群とみなせます。帰納法の仮定により $N_0$ は自由で、階数は高々 $n-1$ です。

$Ry\cong R$ だから $N$ も自由で、その階数は高々 $n$ です。$\square$
<!-- proof-end -->

### 5.1 直接例：$\mathbb Z^2$ の部分加群

$$
N=
\langle(2,0),(1,3)\rangle_{\mathbb Z}
$$

を考えます。

もし

$$
a(2,0)+b(1,3)=(0,0)
$$

なら第2成分から

$$
3b=0
$$

なので $b=0$、続いて $2a=0$ なので $a=0$ です。

したがって二つの生成元は $\mathbb Z$ 上一次独立で、

$$
N\cong\mathbb Z^2
$$

です。

部分加群が自由であるという定理は、こうした格子の現象を任意の PID へ一般化しています。

---

## 6. 有限生成加群を行列の余核として表す

<a id="def-mod2-presentation-cokernel"></a>
<!-- formal-statement-start -->
> **定義（有限表示・余核）**
>
> 加群準同型
>
$$
> \psi:R^m\to R^n
$$
>
> に対して
>
$$
> \operatorname{coker}\psi
> :=
> R^n/\operatorname{Im}\psi
$$
>
> を $\psi$ の **余核** という。
>
> 加群 $M$ が
>
$$
> R^m\xrightarrow{\psi}R^n\to M\to0
$$
>
> という形で
>
$$
> M\cong\operatorname{coker}\psi
$$
>
> と表されるとき、これを $M$ の **有限表示** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod2-presentation-cokernel -->
### 6.1 定義の確認：$\mathbb Z/6\mathbb Z$

写像

$$
\psi:\mathbb Z\to\mathbb Z,
\qquad
\psi(a)=6a
$$

を考えます。

像は

$$
\operatorname{Im}\psi=6\mathbb Z
$$

なので

$$
\operatorname{coker}\psi
=
\mathbb Z/6\mathbb Z.
$$

したがって $\mathbb Z/6\mathbb Z$ は一つの生成元と一つの関係式

$$
6e=0
$$

を持つ有限表示加群です。
<!-- definition-example-end -->

<a id="prop-mod2-equivalence-cokernel"></a>
<!-- formal-statement-start -->
> **命題（行列同値は余核を保つ）**
>
> $A,B\in M_{m,n}(R)$ が同値で
>
$$
> B=PAQ,
> \qquad
> P\in GL_m(R),
> \quad
> Q\in GL_n(R)
$$
>
> とする。
>
> $A,B$ をそれぞれ
>
$$
> R^n\to R^m
$$
>
> の準同型とみなすと、
>
$$
> \operatorname{coker}A
> \cong
> \operatorname{coker}B.
$$
<!-- formal-statement-end -->

### 証明の見取り図

右の $Q$ は始域の自己同型なので像を変えません。左の $P$ は終域の自己同型なので、像を $P(\operatorname{Im}A)$ へ移します。商加群も $P$ で同型に移ります。

<!-- proof-start -->
### 証明

$Q:R^n\to R^n$ は全射なので

$$
\operatorname{Im}(AQ)
=
A(Q(R^n))
=
A(R^n)
=
\operatorname{Im}A.
$$

従って

$$
\operatorname{Im}B
=
\operatorname{Im}(PAQ)
=
P(\operatorname{Im}A).
$$

写像

$$
\overline P:
R^m/\operatorname{Im}A
\to
R^m/\operatorname{Im}B,
\qquad
y+\operatorname{Im}A
\mapsto
Py+\operatorname{Im}B
$$

を定めます。

$y-y'\in\operatorname{Im}A$ なら

$$
P(y-y')
\in
P(\operatorname{Im}A)
=
\operatorname{Im}B
$$

なので良定義です。

$P$ は可逆であり、同じ構成を $P^{-1}$ に対して行うと逆写像が得られます。

従って

$$
R^m/\operatorname{Im}A
\cong
R^m/\operatorname{Im}B.
$$

すなわち余核は同型です。$\square$
<!-- proof-end -->

---

## 7. PID 上有限生成加群の構造定理

<a id="thm-mod2-pid-structure"></a>
<!-- formal-statement-start -->
> **定理（PID 上有限生成加群の構造定理）**
>
> $R$ を PID、$M$ を有限生成 $R$-加群とする。
>
> このとき、ある整数
>
$$
> s\ge0,\qquad r\ge0
$$
>
> と、$0$ でも単元でもない元
>
$$
> d_1,\dots,d_s\in R
$$
>
> が存在して
>
$$
> d_1\mid d_2\mid\cdots\mid d_s
$$
>
> かつ
>
$$
> M
> \cong
> R^r
> \oplus
> R/(d_1)
> \oplus\cdots\oplus
> R/(d_s).
$$
>
> $r$ と各 $d_i$ の同伴類は $M$ から一意に定まる。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の生成元を選び、全射

$$
R^n\twoheadrightarrow M
$$

を作ります。

その核は [PID 上自由加群の部分加群は自由](#thm-mod2-submodule-free) により有限階数自由加群です。核の包含写像を行列で表し、その行列を Smith 標準形にします。対角行列の余核なら一成分ずつ読めます。

<!-- proof-start -->
### 証明

$M$ は有限生成なので、生成元

$$
m_1,\dots,m_n
$$

を取れます。

[MOD1 の自由加群の普遍性](../MOD1/index.md#thm-mod1-free-universal-property)により、

$$
\pi:R^n\to M,
\qquad
\pi(e_i)=m_i
$$

という加群準同型が存在します。

生成元を全て像に含むので $\pi$ は全射です。

核を

$$
K=\ker\pi
$$

と置きます。

[PID 上自由加群の部分加群は自由](#thm-mod2-submodule-free)より、$K$ は有限階数自由加群です。その階数を $q$ とし、基底を選んで

$$
K\cong R^q
$$

とします。

包含写像

$$
\iota:K\hookrightarrow R^n
$$

は基底の下である $n\times q$ 行列 $A$ で表されます。

[MOD1 の加群の第一同型定理](../MOD1/index.md#thm-mod1-first-isomorphism)から

$$
R^n/K
\cong M.
$$

一方

$$
R^n/K
=
R^n/\operatorname{Im}A
=
\operatorname{coker}A.
$$

[Smith 標準形定理](#thm-mod2-smith-normal-form)により

$$
A
\sim
D
=
\operatorname{diag}(a_1,\dots,a_t,0,\dots,0)
$$

で

$$
a_1\mid\cdots\mid a_t
$$

とできます。

[行列同値は余核を保つ](#prop-mod2-equivalence-cokernel)ので

$$
M
\cong
\operatorname{coker}D.
$$

$D$ の像は

$$
a_1R\oplus\cdots\oplus a_tR\oplus0\oplus\cdots\oplus0
$$

ですから、

$$
\operatorname{coker}D
\cong
R/(a_1)
\oplus\cdots\oplus
R/(a_t)
\oplus
R^{n-t}.
$$

$a_i$ が単元なら $R/(a_i)=0$ なので、その成分は捨てられます。$a_i=0$ の成分は最初から自由部分 $R$ として数えています。

したがって、$0$ でも単元でもない成分だけを

$$
d_1,\dots,d_s
$$

と残せば

$$
M
\cong
R^r
\oplus
R/(d_1)
\oplus\cdots\oplus
R/(d_s)
$$

かつ

$$
d_1\mid\cdots\mid d_s
$$

を得ます。

ここまでで分解の存在は示されました。[Smith 不変因子の一意性](#thm-mod2-invariant-factor-uniqueness)は、**一つの表示行列をどの順序で簡約しても同じ不変因子が得られる**ことを保証します。

ただし、加群 $M$ は異なる生成系・異なる関係式から別の表示行列を持ち得ます。したがって構造定理の一意性には、$M$ 自身から自由階数とねじれ因子を復元できることをもう一段示す必要があります。

#### 自由階数の一意性

$K=\operatorname{Frac}(R)$ を $R$ の分数体とします。

標準形を

$$
M
\cong
R^r\oplus T
$$

と書きます。ここで $T$ は有限個の $R/(d_i)$ の直和なのでねじれ加群です。

自由部分の標準基底から、$M$ には $r$ 個の $R$-線形独立な元があります。

逆に $r+1$ 個の元

$$
x_j=(v_j,t_j)
\in
R^r\oplus T
\qquad
(1\le j\le r+1)
$$

を取ります。

各 $t_j$ はねじれ元なので、ある $0\ne a_j\in R$ が

$$
a_jt_j=0
$$

を満たします。$R$ は整域だから

$$
a=a_1a_2\cdots a_{r+1}\ne0
$$

であり、全ての $j$ について

$$
at_j=0
$$

です。

$v_1,\dots,v_{r+1}$ を $K^r$ のベクトルとみなすと、$r+1$ 本なので $K$ 上一次従属です。従って、全てが同時には $0$ でない係数

$$
\lambda_1,\dots,\lambda_{r+1}\in K
$$

が存在して

$$
\lambda_1v_1+\cdots+\lambda_{r+1}v_{r+1}=0.
$$

有限個の分母を払えば、全てが同時には $0$ でない

$$
c_1,\dots,c_{r+1}\in R
$$

で

$$
c_1v_1+\cdots+c_{r+1}v_{r+1}=0
$$

となる関係を得ます。

したがって

$$
(ac_1)x_1+\cdots+(ac_{r+1})x_{r+1}=0.
$$

$a\ne0$ で $R$ は整域なので、少なくとも一つの $ac_j$ は非零です。よって任意の $r+1$ 元は $R$-線形従属です。

従って

$$
r
=
\max\{
\text{$M$ に含まれる $R$-線形独立な元の個数}
\}
$$

であり、$r$ は $M$ だけから一意に決まります。

#### ねじれ因子の一意性

[MOD1 のねじれ部分加群](../MOD1/index.md#prop-mod1-torsion-submodule)

$$
\operatorname{Tor}_R(M)
$$

は $M$ 自身から定まります。上の標準形では $R^r$ はねじれなしで、各 $R/(d_i)$ はねじれ加群なので、

$$
\operatorname{Tor}_R(M)
\cong
R/(d_1)\oplus\cdots\oplus R/(d_s).
$$

従って、残る問題は有限生成ねじれ加群から $d_i$ を一意に復元できることです。

PID は一意分解整域なので、各 $d_i$ を素元冪へ分解し、中国剰余定理を使えば

$$
\operatorname{Tor}_R(M)
\cong
\bigoplus_{p,e}
\left(R/(p^e)\right)^{m_{p,e}}
$$

という基本因子表示が得られます。ここで $p$ は同伴を除いた素元の代表、$m_{p,e}$ は非負整数です。

固定した素元 $p$ に対し、

$$
T_p
=
\left\{
x\in\operatorname{Tor}_R(M):
p^N x=0
\text{ となる }N\ge1\text{ が存在する}
\right\}
$$

と置きます。これは分解の選び方によらず $M$ 自身から定まる部分加群です。

基本因子表示で $q$ が $p$ と同伴でない素元なら、$p^N$ と $q^e$ は互いに素です。Bézout 等式から

$$
up^N+vq^e=1
$$

となる $u,v\in R$ が存在します。

もし $x\in R/(q^e)$ が $p^Nx=0$ を満たすなら、

$$
x
=
(up^N+vq^e)x
=
0
$$

です。従って $T_p$ はちょうど $p$ の冪を法とする巡回因子だけの直和です。

さらに $k\ge1$ に対して

$$
V_{p,k}
=
p^{k-1}T_p/p^kT_p
$$

を考えます。

この商では $p$ が全ての元を消すので、スカラー作用は $R/(p)$ を通じて定まります。また $p$ は PID の素元なので、$a\notin(p)$ なら $(a,p)=R$ です。従って

$$
ua+vp=1
$$

となる $u,v\in R$ が存在し、$[u]$ は $[a]$ の逆元になります。よって $R/(p)$ は体です。

したがって $V_{p,k}$ は $R/(p)$-ベクトル空間です。

一つの巡回因子

$$
C_e=R/(p^e)
$$

だけを見ると、$k\le e$ のとき

$$
p^{k-1}C_e/p^kC_e
\cong
R/(p),
$$

$k>e$ のときは

$$
p^{k-1}C_e=0
$$

です。

実際 $k\le e$ では、写像

$$
R/(p)
\to
p^{k-1}C_e/p^kC_e,
\qquad
[a]\mapsto
a p^{k-1}+p^kC_e
$$

は全射です。核に入るなら

$$
ap^{k-1}\in p^kC_e
$$

なので、ある $b,c\in R$ に対して

$$
ap^{k-1}=p^kb+p^ec.
$$

従って

$$
p^{k-1}
\left(
a-pb-p^{e-k+1}c
\right)
=
0.
$$

$R$ は整域で $p^{k-1}\ne0$ だから

$$
a\in(p),
$$

となり、核は $(p)$ だけです。

よって

$$
b_{p,k}
:=
\dim_{R/(p)}V_{p,k}
$$

は、基本因子 $p^e$ のうち

$$
e\ge k
$$

を満たすものの個数に等しいです。

したがって指数がちょうど $k$ の基本因子の個数は

$$
m_{p,k}
=
b_{p,k}-b_{p,k+1}.
$$

左辺を復元する右辺は $M$ 自身から定まるので、全ての基本因子 $p^e$ の重複度が一意に決まります。

最後に、各素元 $p$ について得られた指数列を小さい順に並べ、因子数の最大値に合わせて左側へ指数 $0$ を補い、列ごとに異なる素元の冪を掛け合わせます。こうして

$$
d_1\mid d_2\mid\cdots\mid d_s
$$

を満たす不変因子列が一意に復元されます。

従って自由階数 $r$ と各 $d_i$ の同伴類は $M$ から一意に定まります。$\square$
<!-- proof-end -->

### 7.1 自由階数は加群自身から読める

上の証明により、構造定理の自由階数 $r$ は表示行列の取り方ではなく、

$$
\boxed{
r=
\max\{
\text{$M$ に含まれる $R$-線形独立な元の個数}
\}
}
$$

として特徴づけられます。

ねじれ成分は非零スカラーで消えるため、この最大個数を増やせません。

### 7.2 具体例：整数格子の商

先ほどの

$$
A=
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
$$

は Smith 標準形

$$
D=
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}
$$

を持ちます。

したがって

$$
\mathbb Z^2/A\mathbb Z^2
\cong
\mathbb Z^2/D\mathbb Z^2
$$

$$
\cong
\mathbb Z/2\mathbb Z
\oplus
\mathbb Z/4\mathbb Z.
$$

行列の基本変形が「関係式の基底を変えただけ」であり、商加群の同型類を保つことがここで具体的に見えます。

---

## 8. 基本因子表示

PID は [RNG3](../RNG3/index.md#thm-rng3-pid-implies-ufd) により一意分解整域です。そこで不変因子を素元冪へ分解できます。

<a id="def-mod2-elementary-divisor"></a>
<!-- formal-statement-start -->
> **定義（基本因子）**
>
> PID 上有限生成加群のねじれ部分を
>
$$
> R/(d_1)\oplus\cdots\oplus R/(d_s)
$$
>
> と不変因子表示し、各 $d_i$ を素元冪へ分解する。
>
> 中国剰余定理により得られる
>
$$
> R/(p^e)
$$
>
> 型の巡回直和因子に現れる $p^e$ を **基本因子** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mod2-elementary-divisor -->
### 8.1 定義の確認：$\mathbb Z/12\mathbb Z\oplus\mathbb Z/18\mathbb Z$

この群はそのままでは

$$
12\nmid18
$$

なので不変因子表示ではありません。

素数ごとに分けると

$$
\mathbb Z/12\mathbb Z
\cong
\mathbb Z/4\mathbb Z\oplus\mathbb Z/3\mathbb Z,
$$

$$
\mathbb Z/18\mathbb Z
\cong
\mathbb Z/2\mathbb Z\oplus\mathbb Z/9\mathbb Z.
$$

したがって基本因子は

$$
4,\ 3,\ 2,\ 9.
$$

$2$-部分と $3$-部分を指数の小さい順に組み直すと

$$
2\cdot3=6,
\qquad
4\cdot9=36
$$

なので

$$
\mathbb Z/12\mathbb Z\oplus\mathbb Z/18\mathbb Z
\cong
\mathbb Z/6\mathbb Z\oplus\mathbb Z/36\mathbb Z.
$$

今度は

$$
6\mid36
$$

であり、これが不変因子表示です。
<!-- definition-example-end -->

不変因子表示は整除鎖を見せるのに向き、基本因子表示は素数ごとの局所構造を見せるのに向きます。同じ加群の二つの座標系です。

---

## 9. 有限生成 Abel 群

[MOD1](../MOD1/index.md#prop-mod1-z-mod-abelian)で、Abel 群と $\mathbb Z$-加群が同じ対象であることを示しました。

$\mathbb Z$ は PID なので、直ちに構造定理を適用できます。

<a id="thm-mod2-fg-abelian"></a>
<!-- formal-statement-start -->
> **定理（有限生成 Abel 群の構造定理）**
>
> 有限生成 Abel 群 $G$ に対して、ある一意な整数 $r\ge0$ と
>
$$
> 1<n_1\mid n_2\mid\cdots\mid n_s
$$
>
> が存在し、
>
$$
> G
> \cong
> \mathbb Z^r
> \oplus
> \mathbb Z/n_1\mathbb Z
> \oplus\cdots\oplus
> \mathbb Z/n_s\mathbb Z.
$$
>
> $r$ と $n_1,\dots,n_s$ は一意に定まる。
>
> 同値に、有限部分は素数冪位数の巡回群の直和へ一意に分解できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$G$ を自然な $\mathbb Z$-加群とみなします。

$\mathbb Z$ は PID なので [PID 上有限生成加群の構造定理](#thm-mod2-pid-structure)を適用でき、

$$
G
\cong
\mathbb Z^r
\oplus
\mathbb Z/(d_1)
\oplus\cdots\oplus
\mathbb Z/(d_s)
$$

で

$$
d_1\mid\cdots\mid d_s
$$

となります。

$\mathbb Z$ の単元は $\pm1$ なので、各 $d_i$ は正整数へ正規化できます。単元に対応する $d_i=1$ は零商なので除き、

$$
1<n_1\mid\cdots\mid n_s
$$

と書けばよいです。

一意性も PID 上構造定理の一意性から従います。

さらに各 $n_i$ を素数冪へ分解し、互いに素な因子に対する [RNG2 の中国剰余定理](../RNG2/index.md)を使えば、有限部分は素数冪位数の巡回群の直和へ分かれます。

逆に基本因子を素数ごとに指数順に並べて互いに異なる素数の成分を掛け合わせれば、不変因子表示へ戻れます。$\square$
<!-- proof-end -->

### 9.1 位数だけでは群は決まらない

位数 $8$ の Abel 群には例えば

$$
\mathbb Z/8\mathbb Z,
$$

$$
\mathbb Z/4\mathbb Z\oplus\mathbb Z/2\mathbb Z,
$$

$$
(\mathbb Z/2\mathbb Z)^3
$$

があります。

三つとも元の個数は $8$ ですが、最大元位数がそれぞれ $8,4,2$ なので互いに同型ではありません。

構造定理は「位数」だけでなく、どの素数冪巡回因子が何個あるかまで記録して初めて群を分類します。

---

## 10. $F[x]$-加群として線形自己写像を読む

MOD1 で、線形自己写像

$$
T:V\to V
$$

から

$$
p(x)\cdot v=p(T)v
$$

という $F[x]$-加群構造を作りました。

$F[x]$ は [RNG4](../RNG4/index.md) により Euclid 整域、したがって PID です。

<a id="prop-mod2-operator-module-torsion"></a>
<!-- formal-statement-start -->
> **命題（線形自己写像の多項式環加群は有限生成ねじれ加群）**
>
> $F$ を体、$V$ を有限次元 $F$-ベクトル空間、$T:V\to V$ を線形自己写像とする。
>
> MOD1 の作用
>
$$
> p(x)\cdot v=p(T)v
$$
>
> で $V$ を $F[x]$-加群とみなす。
>
> このとき $V$ は有限生成ねじれ $F[x]$-加群である。
>
> 従ってある最高次係数が $1$ の多項式
>
$$
> f_1\mid f_2\mid\cdots\mid f_s
$$
>
> が存在して
>
$$
> V
> \cong
> F[x]/(f_1)
> \oplus\cdots\oplus
> F[x]/(f_s)
$$
>
> と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

有限生成性は $F$-基底がそのまま $F[x]$-生成系になることから従います。

ねじれ性は Cayley--Hamilton を使わなくても示せます。各 $v$ について

$$
v,Tv,\dots,T^nv
$$

は $n$ 次元空間の $n+1$ 本のベクトルなので一次従属です。その一次関係が $v$ を消す多項式になります。

<!-- proof-start -->
### 証明

$n=\dim_FV$ とし、$F$-基底

$$
e_1,\dots,e_n
$$

を取ります。

任意の $v\in V$ は

$$
v=a_1e_1+\cdots+a_ne_n
$$

と書けます。各 $a_i\in F$ は定数多項式として $F[x]$ に属するので、この基底は $F[x]$-加群としても $V$ を生成します。

従って $V$ は有限生成 $F[x]$-加群です。

次に任意の $v\in V$ を取ります。

$n+1$ 本のベクトル

$$
v,Tv,T^2v,\dots,T^nv
$$

は $n$ 次元 $F$-ベクトル空間 $V$ の中にあるので一次従属です。

したがって、全てが同時には $0$ でない係数

$$
a_0,\dots,a_n\in F
$$

が存在して

$$
a_0v+a_1Tv+\cdots+a_nT^nv=0.
$$

非零多項式

$$
p(x)=a_0+a_1x+\cdots+a_nx^n
$$

を取れば

$$
p(x)\cdot v
=
p(T)v
=
0.
$$

よって任意の $v$ がねじれ元であり、$V$ はねじれ加群です。

$F[x]$ は PID なので [PID 上有限生成加群の構造定理](#thm-mod2-pid-structure)を適用できます。ねじれ加群なので自由部分はなく、

$$
V
\cong
F[x]/(f_1)
\oplus\cdots\oplus
F[x]/(f_s)
$$

と書けます。

$F[x]$ の単元は非零定数なので、各 $f_i$ は最高次係数が $1$ になるよう正規化でき、整除鎖も保てます。$\square$
<!-- proof-end -->

### 10.1 一つの巡回因子は同伴行列を表す

一つの因子

$$
F[x]/(f)
$$

を考え、$f$ の次数を $d$ とします。

剰余類

$$
[1],[x],\dots,[x^{d-1}]
$$

は $F$-基底になります。

この基底に対して $x$ を掛ける作用は

$$
[1]\mapsto[x],
\quad
[x]\mapsto[x^2],
\quad\dots
$$

と進み、最後の $[x^{d-1}]$ は $f(x)=0$ の関係で低次項へ戻されます。

したがって $x$ の作用、すなわち $T$ は同伴行列で表されます。これが有理標準形の加群論的な中身です。

### 10.2 LA4 の Jordan 構造との接続

ここから先は [LA4](../LA4/index.md) で証明した Jordan 構造と照合します。

もし $F$ 上で基本因子が

$$
(x-\lambda)^e
$$

へ一次因子まで分解するなら、巡回加群

$$
F[x]/((x-\lambda)^e)
$$

における $x$ の作用は、固有値 $\lambda$、大きさ $e$ の Jordan ブロックに対応します。

従って、

$$
\boxed{
\text{Smith / PID 構造定理}
\quad\Longrightarrow\quad
\text{基本因子}
\quad\Longrightarrow\quad
\text{Jordan ブロック}
}
$$

という見方ができます。

LA4 では Jordan 鎖を線形代数の側から構成しました。本章では同じ分類情報を $F[x]$-加群の巡回直和分解として統一的に読みます。Jordan 標準形の存在証明そのものはここでは重複しません。

---

## 11. どの仮定が何をしているか

### 11.1 PID 性は二つの場所で必要

Smith 標準形では、二成分を $(a,b)$ の一つの生成元へまとめるために

$$
(a,b)=(d)
$$

が必要でした。

さらに改善操作が有限回で止まるために PID のイデアル昇鎖停止を使いました。

「UFD なら因数分解できる」だけでは、この行列簡約の証明には足りません。

### 11.2 整域性は消去を可能にする

Bézout 変形で

$$
d(ua'+vb')=d
$$

から

$$
ua'+vb'=1
$$

を出すところ、部分加群自由性で

$$
rd=0
$$

から $r=0$ を出すところに、零因子がないことを使いました。

### 11.3 有限生成性は有限行列へ落とす

有限生成加群 $M$ から

$$
R^n\twoheadrightarrow M
$$

を作れるため、関係式を有限列の行列で表せます。

無限生成加群では、有限サイズの Smith 標準形一枚だけで全構造を記録できません。

### 11.4 Jordan 形には多項式の分解がさらに必要

$F[x]$ 上の構造定理そのものは任意の体 $F$ で成立します。

しかし基本因子が

$$
(x-\lambda)^e
$$

の形まで一次分解するには、関係する多項式が $F$ 上で一次因子へ分解する必要があります。

この追加条件が、一般の有理標準形から Jordan 標準形へ進む場所です。

---

## 12. 演習

### Level A

#### MOD2-A01 Smith 標準形を手で求める
- Level: A

整数行列

$$
A=
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
$$

を行・列基本変形して Smith 標準形にせよ。また不変因子を答えよ。

<!-- solution-start -->
##### 詳細解答

第2行から第1行の $3$ 倍を引きます。

$$
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
\sim
\begin{pmatrix}
2&4\\
0&-4
\end{pmatrix}.
$$

次に第2列から第1列の $2$ 倍を引きます。

$$
\begin{pmatrix}
2&4\\
0&-4
\end{pmatrix}
\sim
\begin{pmatrix}
2&0\\
0&-4
\end{pmatrix}.
$$

最後に第2行を単元 $-1$ 倍します。

$$
\begin{pmatrix}
2&0\\
0&-4
\end{pmatrix}
\sim
\begin{pmatrix}
2&0\\
0&4
\end{pmatrix}.
$$

ここで

$$
2\mid4
$$

なので Smith 標準形です。

したがって不変因子は

$$
\boxed{2,\ 4}
$$

です。
<!-- solution-end -->

#### MOD2-A02 小行列式イデアルから不変因子を読む
- Level: A

整数行列 $A$ の Smith 標準形が階数 $2$ であるとする。

$$
\Delta_1(A)=(6),
\qquad
\Delta_2(A)=(180)
$$

が分かっているとき、不変因子 $d_1,d_2$ を正の整数として求めよ。

<!-- solution-start -->
##### 詳細解答

Smith 標準形では

$$
\Delta_1(A)=(d_1)
$$

なので

$$
d_1=6.
$$

また

$$
\Delta_2(A)=(d_1d_2)
$$

です。

正の生成元を取っているので

$$
d_1d_2=180.
$$

従って

$$
d_2=\frac{180}{6}=30.
$$

さらに

$$
6\mid30
$$

なので整除鎖も満たします。

したがって

$$
\boxed{d_1=6,\qquad d_2=30}
$$

です。
<!-- solution-end -->

#### MOD2-A03 余核を読む
- Level: A

$$
D=
\operatorname{diag}(3,12,0)
$$

を $\mathbb Z^3\to\mathbb Z^3$ の準同型とみなす。

$$
\operatorname{coker}D
$$

を有限生成 Abel 群として同定せよ。

<!-- solution-start -->
##### 詳細解答

$D$ の像は

$$
3\mathbb Z
\oplus
12\mathbb Z
\oplus
\{0\}
$$

です。

したがって

$$
\operatorname{coker}D
=
\frac{\mathbb Z^3}
{3\mathbb Z\oplus12\mathbb Z\oplus\{0\}}.
$$

直和成分ごとに商を取れば

$$
\operatorname{coker}D
\cong
\mathbb Z/3\mathbb Z
\oplus
\mathbb Z/12\mathbb Z
\oplus
\mathbb Z.
$$

従って

$$
\boxed{
\operatorname{coker}D
\cong
\mathbb Z
\oplus
\mathbb Z/3\mathbb Z
\oplus
\mathbb Z/12\mathbb Z
}
$$

です。
<!-- solution-end -->

#### MOD2-A04 基本因子へ分解する
- Level: A

有限 Abel 群

$$
G=
\mathbb Z/20\mathbb Z
\oplus
\mathbb Z/60\mathbb Z
$$

の基本因子を求めよ。

<!-- solution-start -->
##### 詳細解答

素因数分解は

$$
20=2^2\cdot5,
\qquad
60=2^2\cdot3\cdot5.
$$

互いに素な因子について中国剰余定理を使うと

$$
\mathbb Z/20\mathbb Z
\cong
\mathbb Z/4\mathbb Z
\oplus
\mathbb Z/5\mathbb Z,
$$

$$
\mathbb Z/60\mathbb Z
\cong
\mathbb Z/4\mathbb Z
\oplus
\mathbb Z/3\mathbb Z
\oplus
\mathbb Z/5\mathbb Z.
$$

したがって素数冪位数の巡回因子は

$$
4,\ 5,\ 4,\ 3,\ 5.
$$

順序を無視して

$$
\boxed{4,\ 4,\ 3,\ 5,\ 5}
$$

が基本因子です。
<!-- solution-end -->

### Level B

#### MOD2-B01 Bézout 変形を実際に構成する
- Level: B

$\mathbb Z$ 上の列ベクトル

$$
\begin{pmatrix}
18\\
30
\end{pmatrix}
$$

を

$$
\begin{pmatrix}
6\\
0
\end{pmatrix}
$$

へ送る $U\in GL_2(\mathbb Z)$ を一つ構成せよ。

<!-- solution-start -->
##### 詳細解答

まず最大公約元を線形結合で表す Bézout 等式

$$
6=2\cdot18-1\cdot30
$$

を使います。

したがって

$$
u=2,
\qquad
v=-1.
$$

また

$$
18=6\cdot3,
\qquad
30=6\cdot5
$$

なので

$$
a'=3,
\qquad
b'=5.
$$

補題の構成に従って

$$
U=
\begin{pmatrix}
u&v\\
-b'&a'
\end{pmatrix}
=
\begin{pmatrix}
2&-1\\
-5&3
\end{pmatrix}.
$$

行列式は

$$
\det U
=
2\cdot3-(-1)(-5)
=
6-5
=
1,
$$

よって $U\in GL_2(\mathbb Z)$ です。

実際

$$
U
\begin{pmatrix}
18\\
30
\end{pmatrix}
=
\begin{pmatrix}
36-30\\
-90+90
\end{pmatrix}
=
\begin{pmatrix}
6\\
0
\end{pmatrix}.
$$

したがって

$$
\boxed{
U=
\begin{pmatrix}
2&-1\\
-5&3
\end{pmatrix}
}
$$

が一つの答えです。
<!-- solution-end -->

#### MOD2-B02 関係行列から Abel 群を分類する
- Level: B

生成元 $x,y$ と関係式

$$
2x+4y=0,
\qquad
6x+8y=0
$$

で定まる Abel 群 $G$ を分類せよ。

<!-- solution-start -->
##### 詳細解答

自由 Abel 群

$$
\mathbb Z x\oplus\mathbb Z y
\cong
\mathbb Z^2
$$

から始めます。

二つの関係式は行列

$$
A=
\begin{pmatrix}
2&6\\
4&8
\end{pmatrix}
$$

の列が生成する部分加群を潰すことに対応します。転置を使っても Smith 不変因子は同じなので、本文で計算した

$$
\begin{pmatrix}
2&4\\
6&8
\end{pmatrix}
$$

と同じ Smith 標準形

$$
\operatorname{diag}(2,4)
$$

を持ちます。

したがって

$$
G
\cong
\operatorname{coker}A
\cong
\operatorname{coker}\operatorname{diag}(2,4).
$$

よって

$$
\boxed{
G
\cong
\mathbb Z/2\mathbb Z
\oplus
\mathbb Z/4\mathbb Z
}
$$

です。

この問題では、関係式を行列へ移し、Smith 標準形を取って余核を読むという構造定理の流れをそのまま使っています。
<!-- solution-end -->

#### MOD2-B03 不変因子表示と基本因子表示を往復する
- Level: B

有限 Abel 群の基本因子が

$$
2,\ 8,\ 3,\ 9,\ 25
$$

であるとする。

1. 不変因子表示を求めよ。
2. 群の位数を求めよ。
3. 群の元の最大位数を求めよ。

<!-- solution-start -->
##### 詳細解答

素数ごとに分けます。

$2$-部分は

$$
2,\ 8,
$$

$3$-部分は

$$
3,\ 9,
$$

$5$-部分は

$$
25
$$

です。

不変因子を作るときは、各素数について指数の小さい因子から右寄せして列をそろえます。

最大個数は $2$ 個なので、二列を用意します。

$2$-部分は

$$
(2,8),
$$

$3$-部分は

$$
(3,9),
$$

$5$-部分は一個だけなので

$$
(1,25)
$$

と右寄せします。

列ごとに掛けると

$$
d_1=2\cdot3\cdot1=6,
$$

$$
d_2=8\cdot9\cdot25=1800.
$$

実際

$$
6\mid1800.
$$

したがって

$$
G
\cong
\mathbb Z/6\mathbb Z
\oplus
\mathbb Z/1800\mathbb Z.
$$

これが不変因子表示です。

群の位数は直和因子の位数の積なので

$$
|G|
=
6\cdot1800
=
10800.
$$

元の最大位数は不変因子表示の最大因子 $1800$ です。実際、第二成分の生成元は位数 $1800$ を持ち、任意の元の位数は各成分位数の最小公倍数だから $1800$ を超えません。

従って

$$
\boxed{
G\cong\mathbb Z/6\mathbb Z\oplus\mathbb Z/1800\mathbb Z,
\quad
|G|=10800,
\quad
\max\operatorname{ord}=1800
}
$$

です。
<!-- solution-end -->

### Level C

#### MOD2-C01 線形自己写像を $F[x]$-加群から再構成する
- Level: C

$F$ を体とし、$V$ を有限次元 $F$-ベクトル空間、$T:V\to V$ を線形自己写像とする。

$V$ を

$$
p(x)\cdot v=p(T)v
$$

により $F[x]$-加群とみなす。

構造定理により

$$
V
\cong
F[x]/(f_1)
\oplus
F[x]/(f_2),
\qquad
f_1\mid f_2
$$

と分解できたとする。

さらに

$$
f_1(x)=x-\lambda,
\qquad
f_2(x)=(x-\lambda)^3(x-\mu)^2,
\qquad
\lambda\ne\mu
$$

とする。

1. 基本因子を求めよ。
2. $V$ の $F$-次元を求めよ。
3. $T$ の Jordan ブロックの大きさを、LA4 の結果を用いて読み取れ。
4. なぜ本章の構造定理だけでは「全ての体で Jordan ブロックまで分解できる」とは言えないのか説明せよ。

<!-- solution-start -->
##### 詳細解答

### 1. 基本因子

$f_1$ はすでに既約因子冪

$$
x-\lambda
$$

です。

$f_2$ は互いに素な

$$
(x-\lambda)^3
$$

と

$$
(x-\mu)^2
$$

の積です。

したがって中国剰余定理により

$$
F[x]/(f_2)
\cong
F[x]/((x-\lambda)^3)
\oplus
F[x]/((x-\mu)^2).
$$

よって基本因子は

$$
\boxed{
x-\lambda,\quad
(x-\lambda)^3,\quad
(x-\mu)^2
}
$$

です。

### 2. 次元

一般に最高次係数が $1$ の多項式 $f$ の次数を $d$ とすると

$$
F[x]/(f)
$$

は

$$
[1],[x],\dots,[x^{d-1}]
$$

を基底に持つので $F$-次元は $d$ です。

したがって

$$
\dim_FV
=
\deg f_1+\deg f_2.
$$

ここで

$$
\deg f_1=1,
$$

$$
\deg f_2=3+2=5.
$$

よって

$$
\boxed{\dim_FV=6}
$$

です。

### 3. Jordan ブロック

[LA4](../LA4/index.md) の Jordan 構造と照合すると、

$$
F[x]/((x-\alpha)^e)
$$

は固有値 $\alpha$、大きさ $e$ の Jordan ブロック一個に対応します。

したがって

$$
x-\lambda
$$

から固有値 $\lambda$ の大きさ $1$ のブロック、

$$
(x-\lambda)^3
$$

から固有値 $\lambda$ の大きさ $3$ のブロック、

$$
(x-\mu)^2
$$

から固有値 $\mu$ の大きさ $2$ のブロック

が得られます。

つまり Jordan ブロックの大きさは

$$
\boxed{
\lambda:\ 3,1,
\qquad
\mu:\ 2
}
$$

です。

合計次元は

$$
3+1+2=6
$$

で、2 の結果とも一致します。

### 4. 体に関する注意

PID 上構造定理から得られる基本因子は、一般には

$$
p(x)^e
$$

で $p(x)$ が $F[x]$ の既約多項式である形です。

Jordan ブロックに対応させるには

$$
p(x)=x-\lambda
$$

という一次式まで分解している必要があります。

例えば $F=\mathbb R$ では

$$
x^2+1
$$

は既約であり、対応する巡回因子

$$
\mathbb R[x]/(x^2+1)
$$

を実数の Jordan ブロック一個へは分解できません。

したがって本章の構造定理が任意の体で与える標準形は、まず不変因子・基本因子による巡回分解です。Jordan 標準形へ進むには、関係する多項式が体上で一次因子へ分解するという追加条件が必要です。
<!-- solution-end -->

---

## 13. まとめ

本章の中心は、行列を単に対角化する計算法ではありません。

$$
\boxed{
\text{基底変換}
\Longleftrightarrow
\text{行・列基本変形}
}
$$

を出発点に、

$$
\boxed{
A
\sim
\operatorname{diag}(d_1,\dots,d_r,0)
}
$$

という Smith 標準形を作り、その余核を読むことで

$$
\boxed{
M
\cong
R^r
\oplus
R/(d_1)
\oplus\cdots\oplus
R/(d_s)
}
$$

という PID 上有限生成加群の構造定理へ到達しました。

この一つの定理から、

$$
\text{有限生成 Abel 群}
$$

と

$$
\text{有限次元線形自己写像}
$$

が同じ「PID 上加群の分類」の二つの顔として現れます。

次の代数主線 FLD1 では、環 $F[x]$ の商

$$
F[x]/(p)
$$

を今度は体拡大として読み、代数的元の構造へ進みます。
