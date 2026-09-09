# FA6 標準関数解析 VI：コンパクト作用素

<!-- definition-example-audit: strict -->

FA5 では、無限次元では spectrum が固有値集合だけでは捉えられないことを見ました。本章では、その無限次元性をある意味で「有限次元へ圧縮する」作用素として **コンパクト作用素** を導入します。

本章の流れは次です。

```text
有界列の像から収束部分列を抜ける
  ↓
単位球像の閉包がコンパクト
  ↓
Rieszの補題 → 無限次元の恒等作用素は非コンパクト
  ↓
有限ランク作用素はコンパクト
  ↓
和・スカラー倍・前後からの有界作用素合成で保存
  ↓
作用素ノルム極限でも保存（値域Banach）
  ↓
ell2対角作用素・連続核積分作用素
```

全章を通じて $X,Y,Z$ は実または複素 Banach 空間とします。コンパクト作用素そのものには複素数体は不要です。最後の演習で spectrum を調べるときだけ [FA5 の定義](../FA5/index.md#def-fa5-resolvent-spectrum) を使います。

また、FA7 の Fredholm alternative や compact self-adjoint operator の spectral theorem は本章では使いません。「compact だから非零 spectrum は固有値になる」といった一般定理も、ここではまだ仮定しません。

---

## 1. コンパクト作用素：有界列を「収束部分列が取れる列」へ送る

<a id="def-fa6-compact-operator"></a>
<!-- formal-statement-start -->
### 定義（コンパクト作用素）

$T\in\mathcal B(X,Y)$ が **コンパクト作用素** であるとは、$X$ の任意の有界列 $(x_n)$ に対して、ある部分列 $(x_{n_k})$ が存在し、

$$
(Tx_{n_k})_{k\ge1}
$$

が $Y$ で収束することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa6-compact-operator -->
**定義の確認**：零作用素はコンパクト。

$T=0$ なら任意の有界列 $(x_n)$ に対して $Tx_n=0$ です。元の列からどの部分列を取っても像は定数列なので収束します。

一方、無限次元空間上の恒等作用素は一般にコンパクトではありません。後で Riesz の補題を使って、単位球の中に互いに一定距離以上離れた列を実際に作ります。
<!-- definition-example-end -->

「$T$ が有界作用素だから有界列を有界列へ送る」と「コンパクトだから収束部分列を持つ」は別物です。有界性は

$$
\|Tx_n\|\le \|T\|\sup_m\|x_m\|
$$

までしか言いません。コンパクト性は、その有界列からさらに **収束する部分列を抽出できる**ことを要求しています。

---

## 2. 単位球だけ見れば十分

$B_X:=\{x\in X:\|x\|\le1\}$ とします。教科書によっては「$T(B_X)$ の閉包がコンパクト」をコンパクト作用素の定義にします。Banach 空間は距離空間なので、[TOP5 の距離空間でのコンパクト性と点列コンパクト性の同値](../TOP5/index.md#thm-top5-metric-sequential)により、上の定義と同値です。

<a id="thm-fa6-unit-ball-characterization"></a>
<!-- formal-statement-start -->
### 定理（コンパクト作用素の単位球像による特徴付け）

$T\in\mathcal B(X,Y)$ について、次は同値である。

1. $T$ はコンパクト作用素である。
2. $\overline{T(B_X)}$ は $Y$ のコンパクト部分集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず 2 を仮定します。$(x_n)$ を $X$ の有界列とし、

$$
M:=\max\left(1,\sup_n\|x_n\|\right)
$$

と置きます。すると $x_n/M\in B_X$ なので

$$
T(x_n/M)\in T(B_X)\subseteq \overline{T(B_X)}.
$$

右辺はコンパクトです。距離空間ではコンパクト集合内の任意の列から収束部分列を取れるので、ある $n_k$ に対して

$$
T(x_{n_k}/M)
$$

が収束します。$M$ 倍すれば $Tx_{n_k}$ も収束するので、$T$ はコンパクトです。

逆に 1 を仮定します。$\overline{T(B_X)}$ の任意の列 $(y_n)$ を取ります。各 $n$ について $y_n\in\overline{T(B_X)}$ だから、ある $x_n\in B_X$ を選んで

$$
\|y_n-Tx_n\|<\frac1n
$$

とできます。$(x_n)$ は有界なので、コンパクト性からある部分列 $(x_{n_k})$ が存在して

$$
Tx_{n_k}\to y
$$

となります。このとき

$$
\|y_{n_k}-y\|
\le
\|y_{n_k}-Tx_{n_k}\|+\|Tx_{n_k}-y\|
\to0.
$$

従って $\overline{T(B_X)}$ の任意の列から収束部分列を取れました。距離空間でのコンパクト性と点列コンパクト性の同値から、$\overline{T(B_X)}$ はコンパクトです。$\square$
<!-- proof-end -->

ここで閉包を外して「$T(B_X)$ 自身がコンパクト」と言ってはいけません。$T(B_X)$ が閉集合であるとは限らないからです。必要なのは **相対コンパクト性、すなわち閉包がコンパクト**であることです。

---

## 3. Riesz の補題：無限次元の単位球には離れた点を無限に作れる

無限次元で恒等作用素がコンパクトでないことを、単なる直感ではなく具体的な列で示します。その道具が次です。

<a id="lem-fa6-riesz"></a>
<!-- formal-statement-start -->
### 補題（Rieszの補題）

$M$ をノルム空間 $X$ の真の閉部分空間とし、$0<\alpha<1$ とする。このとき $\|z\|=1$ かつ

$$
\operatorname{dist}(z,M)>\alpha
$$

を満たす $z\in X$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$M\ne X$ なので $x\in X\setminus M$ を一つ取ります。$M$ は閉だから

$$
d:=\operatorname{dist}(x,M)
=\inf_{m\in M}\|x-m\|>0.
$$

もし $d=0$ なら $x$ は $M$ の閉包に入り、$M$ が閉なので $x\in M$ となって矛盾するからです。

$\alpha<1$ なので $d/\alpha>d$ です。$d$ は infimum だから、ある $y\in M$ を取って

$$
\|x-y\|<\frac d\alpha
$$

とできます。そこで

$$
z:=\frac{x-y}{\|x-y\|}
$$

と置けば $\|z\|=1$ です。

任意の $m\in M$ に対して、$y+\|x-y\|m\in M$ なので、$d$ の定義から

$$
\begin{aligned}
\|z-m\|
&=
\frac{\|x-y-\|x-y\|m\|}{\|x-y\|}\\
&=
\frac{\|x-(y+\|x-y\|m)\|}{\|x-y\|}\\
&\ge
\frac d{\|x-y\|}
>\alpha.
\end{aligned}
$$

$m$ は任意だから $\operatorname{dist}(z,M)>\alpha$ です。$\square$
<!-- proof-end -->

<a id="thm-fa6-identity-finite-dimensional"></a>
<!-- formal-statement-start -->
### 定理（恒等作用素のコンパクト性と有限次元性）

Banach 空間 $X$ について、恒等作用素 $I_X$ がコンパクトであることと $X$ が有限次元であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $X$ が有限次元とします。有限次元ノルム空間の有界列を基底で座標表示すると、各座標は有界な実数列または複素数列です。有限個の座標について順に部分列を取り直せば、全座標が収束する部分列が得られます。従って任意の有界列は収束部分列を持ち、$I_X$ はコンパクトです。

逆に $X$ を無限次元とします。$\alpha=1/2$ と固定します。まず単位ベクトル $x_1$ を一つ取ります。

$x_1,\dots,x_n$ を選んだとき

$$
M_n:=\operatorname{span}\{x_1,\dots,x_n\}
$$

は有限次元なので閉であり、$X$ は無限次元だから $M_n\ne X$ です。[Rieszの補題](#lem-fa6-riesz)により単位ベクトル $x_{n+1}$ を

$$
\operatorname{dist}(x_{n+1},M_n)>\frac12
$$

となるように選べます。

$m>n$ なら $x_n\in M_{m-1}$ なので

$$
\|x_m-x_n\|>\frac12.
$$

従って $(x_n)$ は単位球内の有界列ですが、どの部分列も Cauchy 列になれません。特に収束部分列を持ちません。恒等作用素では $I_Xx_n=x_n$ なので、$I_X$ はコンパクトではありません。$\square$
<!-- proof-end -->

この定理は「有限次元では有界性とコンパクト性が近いが、無限次元では単位球そのものが大きすぎる」ことを明確にします。

---

## 4. 有限ランク作用素はコンパクト

<a id="def-fa6-finite-rank"></a>
<!-- formal-statement-start -->
### 定義（有限ランク作用素）

$T\in\mathcal B(X,Y)$ が **有限ランク作用素** であるとは、

$$
\operatorname{Ran}T:=T(X)
$$

が有限次元部分空間であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa6-finite-rank -->
**定義の確認**：rank-one operator。

$f\in X^*$、$y_0\in Y$ に対して

$$
Tx=f(x)y_0
$$

と置くと、$T(X)\subseteq\operatorname{span}\{y_0\}$ なので rank は高々1です。また

$$
\|Tx\|\le\|f\|\,\|y_0\|\,\|x\|
$$

だから $T$ は有界です。
<!-- definition-example-end -->

<a id="thm-fa6-finite-rank-compact"></a>
<!-- formal-statement-start -->
### 定理（有限ランク作用素はコンパクト）

有限ランク作用素 $T\in\mathcal B(X,Y)$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(x_n)$ を $X$ の有界列とします。$T$ は有界なので $(Tx_n)$ は $Y$ で有界です。しかも全ての $Tx_n$ は有限次元部分空間

$$
E:=\operatorname{Ran}T
$$

に入ります。

$E$ の基底 $e_1,\dots,e_r$ を固定し

$$
Tx_n=\sum_{j=1}^r a_{n,j}e_j
$$

と書きます。有限次元では座標とノルムが同時に有界になるので、各 $(a_{n,j})_n$ は有界です。まず第1座標が収束する部分列を取り、そこから第2座標が収束する部分列を取り、これを有限回繰り返します。最後に得られた部分列では全座標が収束するので $Tx_{n_k}$ が $E$、従って $Y$ で収束します。

よって $T$ はコンパクトです。$\square$
<!-- proof-end -->

有限ランク作用素は「像が最初から有限次元に閉じ込められている」ためコンパクトです。しかしコンパクト作用素は有限ランクである必要はありません。後の対角作用素が最も簡単な反例です。

---

## 5. 線形結合と有界作用素との合成で壊れない

<a id="thm-fa6-ideal-property"></a>
<!-- formal-statement-start -->
### 定理（コンパクト作用素の線形性とideal性）

1. $K_1,K_2\in\mathcal B(X,Y)$ がコンパクトなら $K_1+K_2$ もコンパクトである。
2. $a$ がスカラーで $K$ がコンパクトなら $aK$ もコンパクトである。
3. $K\in\mathcal B(X,Y)$ がコンパクト、$B\in\mathcal B(W,X)$、$A\in\mathcal B(Y,Z)$ なら

$$
KB\in\mathcal B(W,Y),
\qquad
AK\in\mathcal B(X,Z)
$$

はいずれもコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(x_n)$ を $X$ の有界列とします。$K_1$ がコンパクトなので、ある部分列 $(x_{n_k})$ を取って $K_1x_{n_k}$ を収束させられます。その部分列に $K_2$ のコンパクト性を適用し、さらに部分列 $(x_{n_{k_j}})$ を取って $K_2x_{n_{k_j}}$ も収束させます。

部分列をさらに取っても $K_1x_{n_{k_j}}$ の収束は保たれるので

$$
(K_1+K_2)x_{n_{k_j}}
=K_1x_{n_{k_j}}+K_2x_{n_{k_j}}
$$

も収束します。従って $K_1+K_2$ はコンパクトです。スカラー倍は、$Kx_{n_k}$ が収束すれば $aKx_{n_k}$ も収束するので直ちに従います。

次に $(w_n)$ を $W$ の有界列とします。$B$ は有界だから $(Bw_n)$ は $X$ の有界列です。$K$ のコンパクト性から $KBw_{n_k}$ が収束する部分列を取れるので $KB$ はコンパクトです。

最後に $(x_n)$ を $X$ の有界列とします。$K$ のコンパクト性から $Kx_{n_k}\to y$ となる部分列を取れます。$A$ は有界、従って連続なので

$$
AKx_{n_k}\to Ay.
$$

よって $AK$ もコンパクトです。$\square$
<!-- proof-end -->

特に $X=Y=Z$ なら、$\mathcal B(X)$ の中でコンパクト作用素全体は左右から有界作用素を掛けても閉じています。この意味で operator ideal と呼ばれます。

---

## 6. 作用素ノルム極限でもコンパクト性は保たれる

有限ランク作用素をどんどん細かくして極限を取る例を扱うため、次の閉性が重要です。

<a id="thm-fa6-norm-closed"></a>
<!-- formal-statement-start -->
### 定理（コンパクト作用素全体の作用素ノルム閉性）

$Y$ を Banach 空間とし、$K_m\in\mathcal B(X,Y)$ をコンパクト作用素とする。

$$
\|K_m-K\|\to0
$$

となる $K\in\mathcal B(X,Y)$ が存在するなら、$K$ もコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(x_n)$ を $X$ の任意の有界列とし、

$$
M:=\sup_n\|x_n\|<\infty
$$

と置きます。

まず $K_1$ のコンパクト性から、$(x_n)$ の部分列で $K_1x_n$ が収束するものを取ります。その部分列からさらに $K_2x_n$ が収束する部分列を取ります。これを繰り返し、入れ子の部分列

$$
(x_n)\supset (x_n^{(1)})\supset (x_n^{(2)})\supset\cdots
$$

で、各 $m$ について $K_mx_n^{(m)}$ が収束するようにします。

対角列

$$
y_j:=x_j^{(j)}
$$

を取ります。固定した $m$ に対し、$j\ge m$ の $y_j$ は第 $m$ 段階の部分列に属するので

$$
(K_my_j)_{j\ge m}
$$

は収束し、特に Cauchy 列です。

$M=0$ なら $x_n=0$ で自明です。$M>0$ とします。任意の $\varepsilon>0$ に対して、作用素ノルム収束から $m$ を十分大きく取り

$$
2M\|K-K_m\|<\frac{2\varepsilon}{3}
$$

とできます。さらに $K_my_j$ が Cauchy なので、十分大きい $p,q$ について

$$
\|K_my_p-K_my_q\|<\frac\varepsilon3.
$$

従って

$$
\begin{aligned}
\|Ky_p-Ky_q\|
&\le
\|(K-K_m)y_p\|+
\|K_my_p-K_my_q\|+
\|(K_m-K)y_q\|\\
&\le
2M\|K-K_m\|+\frac\varepsilon3
<\varepsilon.
\end{aligned}
$$

よって $(Ky_j)$ は $Y$ の Cauchy 列です。ここで **$Y$ の完備性** を使って、ある $y\in Y$ に収束します。従って元の任意の有界列から像が収束する部分列を取れたので、$K$ はコンパクトです。$\square$
<!-- proof-end -->

証明中で Banach 性を使った場所は最後の「Cauchy 列が $Y$ 内で収束する」です。作用素ノルム近似だけで極限点が $Y$ の外へ逃げないことを保証しています。

<a id="cor-fa6-finite-rank-closure"></a>
<!-- formal-statement-start -->
### 系（有限ランク作用素の作用素ノルム極限はコンパクト）

有限ランク作用素 $F_m\in\mathcal B(X,Y)$ が

$$
\|F_m-K\|\to0
$$

を満たすなら $K$ はコンパクトである。
<!-- formal-statement-end -->

[有限ランク作用素のコンパクト性](#thm-fa6-finite-rank-compact)と[作用素ノルム閉性](#thm-fa6-norm-closed)を順に適用するだけです。

ただし **逆向きを一般の Banach 空間で無条件に使ってはいけません**。任意のコンパクト作用素が有限ランク作用素で作用素ノルム近似できるかは、空間の approximation property と関係する別問題です。本章で必要なのは「有限ランク近似が作れたなら compact」とする一方向だけです。

---

## 7. ell2 の対角作用素：compact だが有限ランクとは限らない

$a=(a_n)$ を有界スカラー列とし、$\ell^2$ 上で

$$
D_a(x_1,x_2,\dots)
=(a_1x_1,a_2x_2,\dots)
$$

と置きます。$\|D_a\|=\sup_n|a_n|$ です。

<a id="thm-fa6-diagonal-criterion"></a>
<!-- formal-statement-start -->
### 定理（ell2対角作用素のコンパクト性判定）

有界列 $a=(a_n)$ に対する対角作用素 $D_a$ は、

$$
D_a\text{ がコンパクト}
\quad\Longleftrightarrow\quad
a_n\to0
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $a_n\to0$ とします。$N\ge1$ に対し

$$
D_a^{(N)}(x_1,x_2,\dots)
=(a_1x_1,\dots,a_Nx_N,0,0,\dots)
$$

と置きます。値域は $\operatorname{span}\{e_1,\dots,e_N\}$ に入るので $D_a^{(N)}$ は有限ランクです。

また

$$
\|D_a-D_a^{(N)}\|
=\sup_{n>N}|a_n|\to0.
$$

従って [有限ランク作用素の作用素ノルム極限はコンパクト](#cor-fa6-finite-rank-closure) から $D_a$ はコンパクトです。

逆に $a_n\not\to0$ とします。するとある $\varepsilon>0$ と相異なる添字 $n_1<n_2<\cdots$ が存在して

$$
|a_{n_k}|\ge\varepsilon
$$

となります。標準基底列 $(e_{n_k})$ は有界ですが、$j\ne k$ なら

$$
\begin{aligned}
\|D_ae_{n_j}-D_ae_{n_k}\|^2
&=|a_{n_j}|^2+|a_{n_k}|^2\\
&\ge2\varepsilon^2.
\end{aligned}
$$

従って像列の任意の二点は距離 $\sqrt2\varepsilon$ 以上離れ、Cauchy 部分列を持ちません。よって収束部分列も持たず、$D_a$ はコンパクトではありません。$\square$
<!-- proof-end -->

たとえば $a_n=1/n$ なら $D_a$ はコンパクトですが全ての座標で $a_n\ne0$ なので値域は無限次元です。従って compact と finite rank は同義ではありません。

---

## 8. 連続核積分作用素：Arzela-Ascoliを使わず有限ランク近似する

$K:[0,1]^2\to\mathbb F$ を連続関数とし、$C([0,1])$ に一様ノルムを入れます。

$$
(Tf)(s):=\int_0^1 K(s,t)f(t)\,dt
$$

と定めます。まず

$$
|Tf(s)|
\le
\|f\|_\infty\int_0^1|K(s,t)|\,dt
\le
\|K\|_\infty\|f\|_\infty
$$

なので $T$ は有界です。

<a id="thm-fa6-continuous-kernel"></a>
<!-- formal-statement-start -->
### 定理（連続核積分作用素のコンパクト性）

連続核 $K\in C([0,1]^2)$ による上の積分作用素

$$
T:C([0,1])\to C([0,1])
$$

はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$K$ は compact な正方形 $[0,1]^2$ 上で連続なので一様連続です。任意の $\varepsilon>0$ に対し、$|s-s'|<\delta$ なら全ての $t\in[0,1]$ について

$$
|K(s,t)-K(s',t)|<\varepsilon
$$

となる $\delta>0$ を取れます。

$0=s_0<s_1<\cdots<s_m=1$ を mesh が $\delta$ 未満の等分割とします。各区間 $[s_j,s_{j+1}]$ で

$$
\theta=\frac{s-s_j}{s_{j+1}-s_j}
$$

と置き、$s$ 方向の区分線形補間

$$
K_m(s,t)
:=(1-\theta)K(s_j,t)+\theta K(s_{j+1},t)
$$

を定めます。$|s-s_j|<\delta$ かつ $|s-s_{j+1}|<\delta$ なので

$$
\begin{aligned}
|K(s,t)-K_m(s,t)|
&\le
(1-\theta)|K(s,t)-K(s_j,t)|\\
&\quad+
\theta|K(s,t)-K(s_{j+1},t)|\\
&<\varepsilon.
\end{aligned}
$$

従って

$$
\|K-K_m\|_\infty<\varepsilon.
$$

$K_m$ に対応する作用素を

$$
(T_mf)(s):=\int_0^1K_m(s,t)f(t)\,dt
$$

とします。$T_mf$ は節点 $s_j$ で

$$
c_j(f):=\int_0^1K(s_j,t)f(t)\,dt
$$

という値を持つ区分線形関数です。従って $T_mf$ は、固定した分割に関する連続区分線形関数全体の有限次元空間に入ります。よって $T_m$ は有限ランクです。

さらに $\|f\|_\infty\le1$ なら

$$
\begin{aligned}
|(T-T_m)f(s)|
&\le
\int_0^1|K(s,t)-K_m(s,t)|\,|f(t)|\,dt\\
&\le
\|K-K_m\|_\infty.
\end{aligned}
$$

従って

$$
\|T-T_m\|
\le
\|K-K_m\|_\infty
\to0.
$$

各 $T_m$ は有限ランクなのでコンパクトであり、[作用素ノルム閉性](#thm-fa6-norm-closed)から $T$ もコンパクトです。$\square$
<!-- proof-end -->

この証明では関数族の compactness theorem を先取りしていません。連続核を **明示的な有限ランク核へ一様近似する**ことで閉じています。RA8 の関数族のコンパクト性・近似は後で独立に扱えます。

---

## 9. 本章で証明したこと／まだ証明していないこと

本章で得たのは、コンパクト作用素の「作り方」と「壊れにくさ」です。

- 有限ランクなら compact。
- compact の作用素ノルム極限は compact。
- compact の前後に有界作用素を合成しても compact。
- 無限次元恒等作用素は compact ではない。
- 対角係数が0へ行く対角作用素は compact。

一方、次は **まだ使ってはいけません**。

- compact operator の非零 spectrum が必ず固有値になる。
- 非零固有値の固有空間が有限次元になる。
- 非零 spectrum の集積点が0だけになる。
- compact self-adjoint operator が固有ベクトルの正規直交基底で対角化できる。
- Fredholm alternative。

これらは FA7 で証明する内容です。FA6 では、具体例の spectrum を必要なら [FA5 の定義](../FA5/index.md#def-fa5-resolvent-spectrum)へ戻って直接計算します。

---

## 10. 章末演習

### Level A

<a id="ex-fa6-a01"></a>
#### FA6-A01 単位球から半径Rの球へ
- Level: A

$K\in\mathcal B(X,Y)$ がコンパクトとする。任意の $R>0$ に対して

$$
\overline{K(\{x:\|x\|\le R\})}
$$

がコンパクトであることを示せ。

<!-- solution-start -->
**解答・解説**

$B_X=\{x:\|x\|\le1\}$ とすると

$$
\{x:\|x\|\le R\}=RB_X
$$

なので線形性から

$$
K(RB_X)=R K(B_X).
$$

[単位球像による特徴付け](#thm-fa6-unit-ball-characterization)より $\overline{K(B_X)}$ はコンパクトです。スカラー倍写像 $y\mapsto Ry$ は連続なので、その像

$$
R\overline{K(B_X)}
$$

もコンパクトです。またスカラー倍は同相写像なので

$$
\overline{RK(B_X)}=R\overline{K(B_X)}.
$$

従って半径 $R$ の閉球の像も相対コンパクトです。
<!-- solution-end -->

<a id="ex-fa6-a02"></a>
#### FA6-A02 rank-one operator
- Level: A

$f\in X^*$、$y_0\in Y$ とし

$$
Kx=f(x)y_0
$$

と定める。

1. $\|K\|=\|f\|\,\|y_0\|$ を示せ。
2. $K$ がコンパクトであることを示せ。

<!-- solution-start -->
**解答・解説**

任意の $x$ について

$$
\|Kx\|=|f(x)|\,\|y_0\|
\le\|f\|\,\|y_0\|\,\|x\|
$$

だから $\|K\|\le\|f\|\|y_0\|$ です。

一方、$\|f\|$ は単位球上の $|f(x)|$ の supremum なので、任意の $\eta>0$ に対し $\|x\|\le1$ かつ

$$
|f(x)|>\|f\|-\eta
$$

となる $x$ を取れます。従って

$$
\|K\|\ge(\|f\|-\eta)\|y_0\|.
$$

$\eta\downarrow0$ として等号を得ます。$y_0=0$ の場合も両辺0です。

また $K(X)\subseteq\operatorname{span}\{y_0\}$ なので rank は高々1です。[有限ランク作用素はコンパクト](#thm-fa6-finite-rank-compact)より $K$ はコンパクトです。
<!-- solution-end -->

<a id="ex-fa6-a03"></a>
#### FA6-A03 compact operator の合成
- Level: A

$K:X\to Y$ がコンパクト、$B:W\to X$ が有界とする。$(w_n)$ が $W$ の有界列なら $(KBw_n)$ が収束部分列を持つことを、定義から直接示せ。

<!-- solution-start -->
**解答・解説**

$B$ は有界なので、ある $M$ に対し $\|w_n\|\le M$ なら

$$
\|Bw_n\|\le\|B\|M.
$$

従って $(Bw_n)$ は $X$ の有界列です。$K$ のコンパクト性をこの列に適用すれば、ある部分列 $w_{n_k}$ に対して

$$
KBw_{n_k}
$$

が $Y$ で収束します。したがって $KB$ はコンパクトです。
<!-- solution-end -->

<a id="ex-fa6-a04"></a>
#### FA6-A04 compact でない対角作用素
- Level: A

$\ell^2$ 上で

$$
D(x_1,x_2,\dots)
=(x_1,-x_2,x_3,-x_4,\dots)
$$

とする。$D$ がコンパクトでないことを示せ。

<!-- solution-start -->
**解答・解説**

係数列は $a_n=(-1)^{n+1}$ であり $a_n\to0$ ではありません。[対角作用素のコンパクト性判定](#thm-fa6-diagonal-criterion)から直ちに非コンパクトです。

定義から見ても、標準基底 $e_n$ は有界で

$$
De_n=\pm e_n.
$$

$m\ne n$ なら

$$
\|De_m-De_n\|=\sqrt2,
$$

なので像列は Cauchy 部分列を持たず、収束部分列もありません。
<!-- solution-end -->

### Level B

<a id="ex-fa6-b01"></a>
#### FA6-B01 無限次元部分空間上の恒等作用
- Level: B

$X$ を無限次元 Banach 空間、$M\subseteq X$ を無限次元閉部分空間とする。$P\in\mathcal B(X)$ が

$$
Px=x\qquad(x\in M)
$$

を満たすとき、$P$ はコンパクトではないことを示せ。

<!-- solution-start -->
**解答・解説**

もし $P$ がコンパクトなら、制限

$$
P|_M:M\to X
$$

もコンパクトです。しかし $M$ 上では $P|_M=I_M$ です。

$M$ は閉部分空間なので Banach 空間であり、無限次元です。[恒等作用素のコンパクト性と有限次元性](#thm-fa6-identity-finite-dimensional)から $I_M$ はコンパクトではありません。矛盾です。従って $P$ はコンパクトではありません。
<!-- solution-end -->

<a id="ex-fa6-b02"></a>
#### FA6-B02 compact operator の作用素ノルム閉性で完備性を追う
- Level: B

[作用素ノルム閉性の証明](#thm-fa6-norm-closed)で、$Y$ の完備性を使う直前までに何が分かっているかを書き、その仮定を外すと論証のどこが止まるか説明せよ。

<!-- solution-start -->
**解答・解説**

対角部分列 $(y_j)$ を作った後、任意の $\varepsilon>0$ に対して十分大きい $p,q$ なら

$$
\|Ky_p-Ky_q\|<\varepsilon
$$

が示せます。つまり $(Ky_j)$ が **Cauchy 列である**ところまでは、値域の完備性なしで到達できます。

しかし compact operator の定義には「像部分列が $Y$ の点へ収束する」ことが必要です。$Y$ が完備でなければ Cauchy 列の極限が completion の中には存在しても $Y$ 自身に存在するとは限りません。したがって最後の

$$
(Ky_j)\text{ Cauchy}\Longrightarrow(Ky_j)\text{ convergent in }Y
$$

が正当化できず、証明がそこで止まります。
<!-- solution-end -->

<a id="ex-fa6-b03"></a>
#### FA6-B03 指数核を有限ランクで近似する
- Level: B

$C([0,1])$ 上で

$$
(Tf)(s)=\int_0^1 e^{st}f(t)\,dt
$$

とする。Taylor 多項式

$$
p_N(s,t)=\sum_{k=0}^N\frac{s^kt^k}{k!}
$$

を使って $T$ がコンパクトであることを示せ。

<!-- solution-start -->
**解答・解説**

$p_N$ に対応する作用素を

$$
(T_Nf)(s)
:=\int_0^1p_N(s,t)f(t)\,dt
$$

とすると

$$
T_Nf(s)
=
\sum_{k=0}^N
\frac{s^k}{k!}
\int_0^1t^kf(t)\,dt.
$$

従って $T_Nf$ は常に

$$
\operatorname{span}\{1,s,\dots,s^N\}
$$

に入り、$T_N$ は有限ランクです。

$0\le s,t\le1$ では $0\le st\le1$ なので指数級数は一様収束し、たとえば

$$
\sup_{s,t\in[0,1]}|e^{st}-p_N(s,t)|
\le
\sum_{k=N+1}^{\infty}\frac1{k!}
\to0.
$$

$\|f\|_\infty\le1$ に対して

$$
\|(T-T_N)f\|_\infty
\le
\sup_{s,t}|e^{st}-p_N(s,t)|
$$

だから $\|T-T_N\|\to0$ です。よって [有限ランク作用素の作用素ノルム極限はコンパクト](#cor-fa6-finite-rank-closure)から $T$ はコンパクトです。
<!-- solution-end -->

### Level C

<a id="ex-fa6-c01"></a>
#### FA6-C01 compact 対角作用素の spectrum を定義から求める
- Level: C

複素 Hilbert 空間 $\ell^2$ 上で

$$
D(x_1,x_2,\dots)
=\left(x_1,\frac{x_2}{2},\frac{x_3}{3},\dots\right)
$$

とする。

1. $D$ がコンパクトであることを示せ。
2. [FA5 の spectrum の定義](../FA5/index.md#def-fa5-resolvent-spectrum)だけを使って

$$
\sigma(D)=\{0\}\cup\left\{\frac1n:n\in\mathbb N\right\}
$$

を示せ。
3. $0$ は $D$ の固有値ではないが spectrum に属することを確認せよ。

<!-- solution-start -->
**解答・解説**

係数 $a_n=1/n$ は0へ収束するので、[対角作用素のコンパクト性判定](#thm-fa6-diagonal-criterion)から $D$ はコンパクトです。

まず $\lambda=1/n$ なら

$$
De_n=\frac1n e_n
$$

だから $\lambda I-D$ は単射でなく、$1/n\in\sigma(D)$ です。

次に $\lambda=0$ を考えます。$D$ は単射ですが全射ではありません。実際

$$
y=\left(1,\frac12,\frac13,\dots\right)\in\ell^2
$$

に対して $Dx=y$ を満たすなら各座標から $x_n=1$ となり、$x=(1,1,\dots)\notin\ell^2$ です。従って $0I-D=-D$ は可逆でなく、$0\in\sigma(D)$ です。一方 $Dx=0$ なら $(1/n)x_n=0$ だから全ての $x_n=0$ で、0は固有値ではありません。

最後に

$$
\lambda\notin\{0\}\cup\{1/n:n\in\mathbb N\}
$$

とします。$\lambda\ne0$ なので十分大きい $N$ を取り、$n>N$ なら

$$
\frac1n<\frac{|\lambda|}{2}
$$

とできます。すると

$$
\left|\lambda-\frac1n\right|
\ge\frac{|\lambda|}{2}
\qquad(n>N).
$$

一方、有限個 $1\le n\le N$ については $\lambda\ne1/n$ なので

$$
\delta_0:=\min_{1\le n\le N}\left|\lambda-\frac1n\right|>0.
$$

従って

$$
\delta:=\min\left(\delta_0,\frac{|\lambda|}{2}\right)>0
$$

とすれば

$$
\left|\lambda-\frac1n\right|\ge\delta
\qquad(\forall n).
$$

そこで

$$
R_\lambda(y_1,y_2,\dots)
=
\left(
\frac{y_1}{\lambda-1},
\frac{y_2}{\lambda-1/2},
\frac{y_3}{\lambda-1/3},
\dots
\right)
$$

と置くと

$$
\|R_\lambda y\|_2
\le\frac1\delta\|y\|_2.
$$

さらに座標ごとの計算から

$$
R_\lambda(\lambda I-D)
=(\lambda I-D)R_\lambda=I.
$$

従って $\lambda\in\rho(D)$ です。以上より

$$
\sigma(D)=\{0\}\cup\{1/n:n\in\mathbb N\}.
$$

ここでは compact operator の一般 spectral theorem を使っていません。各 $\lambda$ について $\lambda I-D$ の可逆性を直接判定しただけです。この具体例が FA7 の一般論の予告になります。
<!-- solution-end -->

---

## 11. まとめ

コンパクト作用素の本質は、「無限次元の有界集合をそのまま有限次元にする」ことではなく、**有界列の像から必ず収束部分列を抜ける程度まで圧縮する**ことです。

特に覚えるべき論証の鎖は

$$
\text{finite rank}
\Longrightarrow
\text{compact}
\Longrightarrow
\text{bounded},
$$

および

$$
K_m\text{ compact},\quad
\|K_m-K\|\to0,\quad
Y\text{ Banach}
\Longrightarrow
K\text{ compact}
$$

です。後者では、対角部分列で各近似作用素を同時に制御し、最後に値域の完備性で Cauchy 列を収束させました。

次の FA7 では、この compactness が $\lambda I-K$ の可逆性と固有空間にどう強い制約を与えるかを証明し、Fredholm alternative と compact self-adjoint spectral theorem へ進みます。
