# FA7 標準関数解析 VII：コンパクト自己共役作用素・Fredholm alternative

<!-- definition-example-audit: strict -->

FA6 ではコンパクト作用素を定義し、有限ランク近似・作用素ノルムでの閉性・具体例までを扱いました。本章では、そのコンパクト性が **方程式の可解性** と **spectrum の構造** をどこまで有限次元的にするかを調べます。

本章の流れは次です。

```text
K compact
  ↓
I-K の核は有限次元
  ↓
I-K の像は閉
  ↓
単射 ⇔ 全射
  ↓
λ≠0 の spectrum 点は固有値
  ↓
非零固有値は有限重複度・0以外に集積しない
  ↓
Hilbert空間 + 自己共役
  ↓
ノルムを実現する固有ベクトル
  ↓
非零固有空間の直交和 ⊕ 核
```

前半は実・複素 Banach 空間 $X$ 上の $K\in\mathcal B(X)$ を扱います。spectrum に言及する箇所だけ $X$ を複素 Banach 空間とします。後半では実または複素 Hilbert 空間 $H$ に移ります。

重要なのは、FA6 の内容を「compact なら固有値分解できる」と読み替えないことです。一般のコンパクト作用素は自己共役とは限らず、固有ベクトルが直交基底を作るとも限りません。本章では、一般 Banach 空間で成立する部分と、自己共役性を追加して初めて成立する部分を分けます。

---

## 1. コンパクト摂動で何が有限次元になるか

$K\in\mathcal B(X)$ をコンパクトとし

$$
T:=I-K
$$

と置きます。まず同次方程式 $Tx=0$ の解空間を調べます。

<a id="thm-fa7-kernel-finite"></a>
<!-- formal-statement-start -->
### 定理（I-Kの核の有限次元性）

$X$ を Banach 空間、$K\in\mathcal B(X)$ をコンパクト作用素とする。このとき

$$
N:=\ker(I-K)
$$

は有限次元である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$N$ は有界線形作用素 $I-K$ の核なので閉部分空間です。従って $N$ 自身も Banach 空間です。

$x\in N$ なら $(I-K)x=0$、すなわち

$$
Kx=x
$$

です。従って $K$ の $N$ への制限は恒等作用素そのものです：

$$
K|_N=I_N.
$$

$N$ の有界列は $X$ の有界列でもあるので、$K|_N$ はコンパクトです。従って $I_N$ がコンパクトです。[恒等作用素のコンパクト性と有限次元性](../FA6/index.md#thm-fa6-identity-finite-dimensional)より $N$ は有限次元です。$\square$
<!-- proof-end -->

この証明の要点は「核の上では $K$ が恒等作用素になる」ことです。無限次元の単位球をコンパクトにできないという FA6 の事実が、そのまま同次解空間の有限次元性へ変換されました。

同じ議論を $\lambda I-K$ に適用すると、$\lambda\ne0$ に対する固有空間

$$
\ker(\lambda I-K)
$$

も有限次元になります。実際、そこで $K/\lambda$ は恒等作用素として働きます。この帰結は第4節で正式にまとめます。

---

## 2. 像が閉じる仕組み

次は $T=I-K$ の像です。有限次元では線形写像の像は自動的に閉ですが、無限次元では一般にそうではありません。ここでコンパクト性が再び効きます。

まず核からの距離を使います。

<a id="lem-fa7-quotient-estimate"></a>
<!-- formal-statement-start -->
### 補題（核からの距離による下側評価）

$N=\ker(I-K)$ とする。このとき、ある $c>0$ が存在して任意の $x\in X$ に対し

$$
\|(I-K)x\|
\ge
c\,\operatorname{dist}(x,N)
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

そのような $c$ が存在しないと仮定します。すると各 $n$ について

$$
\operatorname{dist}(x_n,N)=1,
\qquad
\|(I-K)x_n\|<\frac1n
$$

を満たす $x_n$ を選べます。

距離は infimum なので、各 $n$ について $v_n\in N$ を

$$
\|x_n-v_n\|<1+\frac1n
$$

となるように取れます。$z_n:=x_n-v_n$ と置くと

$$
\operatorname{dist}(z_n,N)=1,
\qquad
\|z_n\|<2,
$$

かつ $(I-K)v_n=0$ だから

$$
\|(I-K)z_n\|<\frac1n.
$$

$(z_n)$ は有界で $K$ はコンパクトなので、部分列を取り直して

$$
Kz_n\to w
$$

とできます。すると

$$
z_n=(I-K)z_n+Kz_n\to w.
$$

$I-K$ は連続なので

$$
(I-K)w=0,
$$

従って $w\in N$ です。一方、距離関数 $x\mapsto\operatorname{dist}(x,N)$ は 1-Lipschitz なので

$$
\operatorname{dist}(w,N)
=
\lim_n\operatorname{dist}(z_n,N)
=1,
$$

となり $w\in N$ に矛盾します。よって所望の $c>0$ が存在します。$\square$
<!-- proof-end -->

この補題を使うと像の閉性が短く示せます。

<a id="thm-fa7-closed-range"></a>
<!-- formal-statement-start -->
### 定理（I-Kの像の閉性）

$X$ を Banach 空間、$K\in\mathcal B(X)$ をコンパクト作用素とする。このとき

$$
\operatorname{Ran}(I-K)
$$

は $X$ の閉部分空間である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T:=I-K$、$N:=\ker T$ と置きます。$Tx_n\to y$ とします。$y$ が再び $T$ の像に入ることを示せば十分です。

[核からの距離による下側評価](#lem-fa7-quotient-estimate)により

$$
\operatorname{dist}(x_n,N)
\le
c^{-1}\|Tx_n\|.
$$

右辺は収束列なので有界です。各 $n$ について $v_n\in N$ を

$$
\|x_n-v_n\|
\le
2\operatorname{dist}(x_n,N)+\frac1n
$$

となるように取ります。$z_n:=x_n-v_n$ と置けば $(z_n)$ は有界で

$$
Tz_n=Tx_n\to y.
$$

$K$ のコンパクト性から、部分列を取り直して $Kz_n$ を収束させられます。すると

$$
z_n=Tz_n+Kz_n
$$

も収束します。その収束先を $z$ とすれば、$T$ の連続性から

$$
Tz=y.
$$

従って $y\in\operatorname{Ran}T$ です。よって $\operatorname{Ran}(I-K)$ は閉です。$\square$
<!-- proof-end -->

ここで Banach 性は、閉部分空間や収束先を $X$ の内部で扱う基盤として使われています。単に「$K$ が小さい」から像が閉じるのではなく、核方向を除いた代表元を有界に保ち、残りをコンパクト性で収束させるのが本質です。

---

## 3. 単射と全射が同時に決まる

ここが前半の中心です。有限次元線形代数では単射と全射が同値ですが、無限次元 Banach 空間では一般には同値ではありません。$I-K$ という特別な形では、コンパクト性がその同値を復活させます。

準備として

$$
T:=I-K,
\qquad
R_j:=T^jX,
\qquad
N_j:=\ker T^j
$$

と置きます。$T$ と $K$ は $K=I-T$ の関係にあるので可換です。従って各 $R_j$ は $K$ で不変です。

また $R_0=X$ は閉です。[I-Kの像の閉性](#thm-fa7-closed-range)を $R_j$ 上の制限

$$
T|_{R_j}=I_{R_j}-K|_{R_j}
$$

へ順に適用すると、すべての $R_j$ が閉部分空間であることが分かります。$K|_{R_j}$ がコンパクトなのは、$R_j$ の有界列が $X$ の有界列でもあり、像の収束先も閉性により $R_j$ に残るからです。

<a id="thm-fa7-fredholm-alternative"></a>
<!-- formal-statement-start -->
### 定理（コンパクト作用素のFredholm alternative）

$X$ を Banach 空間、$K\in\mathcal B(X)$ をコンパクト作用素とする。$T:=I-K$ とおくと、次は同値である。

1. $T$ は単射である。
2. $T$ は全射である。
3. $T$ は有界な逆作用素を持つ。

従って、方程式

$$
(I-K)x=y
$$

について次の二つのうち一方が起こる。

- 同次方程式 $(I-K)x=0$ が非零解を持つ。
- 任意の $y\in X$ に対して解が一意に存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず「単射なら全射」を示します。$T$ が単射だが全射でないと仮定します。すると

$$
R_1\subsetneq R_0.
$$

さらにすべての $j$ で

$$
R_{j+1}\subsetneq R_j
$$

です。実際、もしある $j$ で $R_{j+1}=R_j$ なら、任意の $x\in X$ に対して

$$
T^jx\in R_j=R_{j+1}
$$

なので、ある $u\in X$ が存在して $T^jx=T^{j+1}u$ となります。$T$ が単射なら $T^j$ も単射なので $x=Tu$、従って $T$ は全射となり矛盾します。

各 $R_j$ は閉部分空間です。[Rieszの補題](../FA6/index.md#lem-fa6-riesz)を $R_{j+1}\subsetneq R_j$ に適用し、$u_j\in R_j$ を

$$
\|u_j\|=1,
\qquad
\operatorname{dist}(u_j,R_{j+1})>\frac12
$$

となるように選びます。

$m>j$ とします。$u_m\in R_m\subseteq R_{j+1}$ で、$R_{j+1}$ は $K$ で不変だから $Ku_m\in R_{j+1}$ です。また $Tu_j\in R_{j+1}$ です。従って

$$
Ku_j-Ku_m
=
u_j-(Tu_j+Ku_m).
$$

括弧内は $R_{j+1}$ に属するので

$$
\|Ku_j-Ku_m\|>\frac12.
$$

よって $(Ku_j)$ は収束部分列を持ちません。しかし $(u_j)$ は有界で $K$ はコンパクトです。矛盾です。従って $T$ が単射なら全射です。

次に「全射なら単射」を示します。$T$ が全射だが単射でないと仮定します。$N_0:=\{0\}$ とします。$N_1\ne N_0$ です。

$0\ne x_1\in N_1$ を取ります。$T$ は全射なので $Tx_{j+1}=x_j$ となる $x_{j+1}$ を順に選べます。すると

$$
x_j\in N_j\setminus N_{j-1}
$$

が帰納的に成り立ちます。従って

$$
N_0\subsetneq N_1\subsetneq N_2\subsetneq\cdots.
$$

各 $N_j$ は有界作用素 $T^j$ の核なので閉です。[Rieszの補題](../FA6/index.md#lem-fa6-riesz)により $u_j\in N_j$ を

$$
\|u_j\|=1,
\qquad
\operatorname{dist}(u_j,N_{j-1})>\frac12
$$

となるように取ります。

$m>j$ なら $Tu_m\in N_{m-1}$ です。また $u_j\in N_j\subseteq N_{m-1}$ かつ $Tu_j\in N_{j-1}\subseteq N_{m-1}$ なので

$$
Ku_j=u_j-Tu_j\in N_{m-1}.
$$

従って

$$
Ku_m-Ku_j
=
u_m-(Tu_m+Ku_j).
$$

括弧内は $N_{m-1}$ に属するため

$$
\|Ku_m-Ku_j\|>\frac12.
$$

再び $(Ku_j)$ が収束部分列を持たず、$K$ のコンパクト性に矛盾します。よって全射なら単射です。

以上で 1 と 2 は同値です。1 または 2 が成り立てば $T$ は全単射です。Banach 空間上の [有界逆定理](../FA2/index.md#thm-fa2-bounded-inverse)により $T^{-1}$ は有界です。逆に有界な逆作用素を持てば全単射なので 3 も同値です。$\square$
<!-- proof-end -->

この定理は「無限次元でも有限次元と同じ」と言っているのではありません。一般の作用素では単射と全射は一致しません。**恒等作用素からの差がコンパクト**という構造が、Riesz の補題で作った離れた列と衝突するために同値が復活します。

任意の $\lambda\ne0$ について

$$
\lambda I-K
=
\lambda\left(I-\frac1\lambda K\right)
$$

であり、$K/\lambda$ もコンパクトです。従って同じ二者択一は $\lambda I-K$ にも適用できます。

---

## 4. 0でない spectrum の構造

ここから $X$ を複素 Banach 空間とします。FA5 では spectrum を「$\lambda I-K$ が有界作用素として可逆でない点」と定義しました。[resolvent集合・spectrumの定義](../FA5/index.md#def-fa5-resolvent-spectrum)と前節の結果を組み合わせると、コンパクト作用素では $0$ 以外の spectrum が固有値へ戻ります。

<a id="cor-fa7-nonzero-spectrum-eigenvalue"></a>
<!-- formal-statement-start -->
### 系（コンパクト作用素の非零spectrumの固有値化）

$K\in\mathcal B(X)$ をコンパクト作用素とする。$\lambda\ne0$ なら

$$
\lambda\in\sigma(K)
\quad\Longleftrightarrow\quad
\ker(\lambda I-K)\ne\{0\}.
$$

すなわち、$0$ でない spectrum 点はすべて固有値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

右から左は一般の有界作用素で成り立ちます。非零ベクトル $x$ が $(\lambda I-K)x=0$ を満たせば $\lambda I-K$ は単射でないので可逆ではありません。従って $\lambda\in\sigma(K)$ です。

逆に $\lambda\in\sigma(K)$ とします。$\lambda\ne0$ なので

$$
\lambda I-K
=
\lambda\left(I-\frac K\lambda\right).
$$

$K/\lambda$ はコンパクトです。[コンパクト作用素のFredholm alternative](#thm-fa7-fredholm-alternative)により $I-K/\lambda$ は単射であることと全射であることが同値です。もし単射なら全射でもあり、[有界逆定理](../FA2/index.md#thm-fa2-bounded-inverse)により可逆です。これは $\lambda\in\sigma(K)$ に矛盾します。従って単射ではなく

$$
\ker(\lambda I-K)\ne\{0\}.
$$

$\square$
<!-- proof-end -->

0だけは別扱いです。たとえば無限次元 $X$ 上でコンパクトな $K$ が可逆なら、[コンパクト作用素のideal性](../FA6/index.md#thm-fa6-ideal-property)から

$$
I=K^{-1}K
$$

もコンパクトになり、[恒等作用素のコンパクト性と有限次元性](../FA6/index.md#thm-fa6-identity-finite-dimensional)に反します。従って無限次元では常に $0\in\sigma(K)$ です。しかし $0$ が固有値、つまり $\ker K\ne\{0\}$ であるとは限りません。

さらに非零固有値には強い離散性があります。

<a id="thm-fa7-nonzero-eigenvalues-discrete"></a>
<!-- formal-statement-start -->
### 定理（非零固有値の有限重複度と0以外での非集積）

$K\in\mathcal B(X)$ をコンパクト作用素とする。

1. 任意の非零固有値 $\lambda$ に対して固有空間 $\ker(\lambda I-K)$ は有限次元である。
2. 任意の $\varepsilon>0$ に対して
   $$
   \{\lambda:\lambda\text{ は }K\text{ の固有値},\ |\lambda|\ge\varepsilon\}
   $$
   は有限集合である。

従って、非零固有値が無限個ある場合、それらを重複なしで並べれば絶対値は 0 に近づく部分しか持ち得ない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず 1 を示します。$E_\lambda:=\ker(\lambda I-K)$ と置きます。$E_\lambda$ は閉部分空間です。$x\in E_\lambda$ では

$$
Kx=\lambda x,
$$

従って

$$
I_{E_\lambda}
=
\frac1\lambda K|_{E_\lambda}.
$$

右辺はコンパクトなので $I_{E_\lambda}$ もコンパクトです。[恒等作用素のコンパクト性と有限次元性](../FA6/index.md#thm-fa6-identity-finite-dimensional)より $E_\lambda$ は有限次元です。

次に 2 を示します。反対に、互いに異なる固有値 $\lambda_1,\lambda_2,\dots$ が

$$
|\lambda_n|\ge\varepsilon>0
$$

を満たすと仮定します。各 $\lambda_n$ の固有ベクトル $v_n\ne0$ を選び

$$
M_n:=\operatorname{span}\{v_1,\dots,v_n\}
$$

と置きます。異なる固有値に属する固有ベクトルは一次独立なので

$$
M_1\subsetneq M_2\subsetneq\cdots
$$

です。各 $M_n$ は有限次元なので閉です。

[Rieszの補題](../FA6/index.md#lem-fa6-riesz)により $u_n\in M_n$ を

$$
\|u_n\|=1,
\qquad
\operatorname{dist}(u_n,M_{n-1})>\frac12
$$

となるように選びます。ただし $M_0:=\{0\}$ とします。

$M_n$ は $K$ で不変で、さらに

$$
(K-\lambda_nI)M_n\subseteq M_{n-1}
$$

です。実際、$v_j$ に作用させると $j<n$ では $(\lambda_j-\lambda_n)v_j\in M_{n-1}$、$j=n$ では 0 になります。

$n>m$ とすると $Ku_m\in M_m\subseteq M_{n-1}$ です。また

$$
z_n:=(K-\lambda_nI)u_n\in M_{n-1}.
$$

従って

$$
Ku_n-Ku_m
=
\lambda_nu_n+(z_n-Ku_m).
$$

括弧内は $M_{n-1}$ に属するので

$$
\|Ku_n-Ku_m\|
\ge
|\lambda_n|\operatorname{dist}(u_n,M_{n-1})
>
\frac\varepsilon2.
$$

よって $(Ku_n)$ は収束部分列を持ちません。しかし $(u_n)$ は有界で $K$ はコンパクトです。矛盾です。従って 2 が成り立ちます。$\square$
<!-- proof-end -->

この結果と [コンパクト作用素の非零spectrumの固有値化](#cor-fa7-nonzero-spectrum-eigenvalue)を合わせると、コンパクト作用素の非零 spectrum は有限重複度の固有値から成り、0 だけが特別な点として残ります。

---

## 5. 自己共役性がもたらす直交構造

ここから $H$ を実または複素 Hilbert 空間とします。内積は、どちらの変数を線形とする流儀でも以下の結論は同じです。

<a id="def-fa7-self-adjoint"></a>
<!-- formal-statement-start -->
### 定義（自己共役有界作用素）

$T\in\mathcal B(H)$ が **自己共役** であるとは、任意の $x,y\in H$ に対して

$$
\langle Tx,y\rangle
=
\langle x,Ty\rangle
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fa7-self-adjoint -->
**定義の確認**：実数列による $\ell^2$ 対角作用素。

有界な実数列 $(a_n)$ に対し

$$
D_a(x_1,x_2,\dots)
=(a_1x_1,a_2x_2,\dots)
$$

と置くと

$$
\langle D_ax,y\rangle
=
\sum_n a_nx_n\overline{y_n}
=
\langle x,D_ay\rangle.
$$

従って $D_a$ は自己共役です。さらに $a_n\to0$ なら FA6 の対角作用素判定によりコンパクトです。
<!-- definition-example-end -->

自己共役性から二つの基本事実が直ちに従います。

まず $Tx=\lambda x$、$x\ne0$ とします。すると

$$
\langle Tx,x\rangle
=
\langle x,Tx\rangle
$$

なので $\lambda\|x\|^2$ はその複素共役と等しく、$\lambda\in\mathbb R$ です。実 Hilbert 空間ではもちろん最初から実数です。

次に $Tx=\lambda x$、$Ty=\mu y$ で $\lambda\ne\mu$ とします。両固有値は実数なので

$$
\lambda\langle x,y\rangle
=
\langle Tx,y\rangle
=
\langle x,Ty\rangle
=
\mu\langle x,y\rangle.
$$

従って $\langle x,y\rangle=0$ です。つまり **異なる固有値の固有空間は直交**します。

この二事実は有限次元の Hermitian 行列と同じですが、無限次元では「固有ベクトルが十分たくさん存在する」こと自体がまだ未証明です。そこをコンパクト性で埋めます。

---

## 6. ノルムを実現する固有ベクトル

自己共役作用素では二次形式

$$
q_T(x):=\langle Tx,x\rangle
$$

が作用素ノルムを完全に捉えます。

<a id="lem-fa7-rayleigh-norm"></a>
<!-- formal-statement-start -->
### 補題（自己共役作用素のRayleigh商によるノルム評価）

$T\in\mathcal B(H)$ を自己共役とする。このとき

$$
\|T\|
=
\sup_{\|x\|=1}|\langle Tx,x\rangle|.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

右辺を $M$ とします。[Cauchy–Schwarz 不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|\langle Tx,x\rangle|
\le\|Tx\|\,\|x\|
\le\|T\|
$$

なので $M\le\|T\|$ です。

逆向きを示します。$\|x\|=\|y\|=1$ とします。複素 Hilbert 空間では $y$ に絶対値1のスカラーを掛け、$\langle Tx,y\rangle$ が非負実数になるようにできます。実 Hilbert 空間では必要なら $y$ の符号を変えます。そのうえで自己共役性を使うと

$$
4\langle Tx,y\rangle
=
\langle T(x+y),x+y\rangle
-
\langle T(x-y),x-y\rangle.
$$

従って

$$
\begin{aligned}
4|\langle Tx,y\rangle|
&\le
M\|x+y\|^2+M\|x-y\|^2\\
&=4M,
\end{aligned}
$$

ここで最後に[平行四辺形法則](../F0_02C1_ノルム空間_Banach_Hilbert/index.md#ref-parallelogram-identity)を使いました。よって

$$
|\langle Tx,y\rangle|\le M
$$

です。$y$ について supremum を取ると $\|Tx\|\le M$、さらに $x$ について supremum を取って $\|T\|\le M$ を得ます。従って等号です。$\square$
<!-- proof-end -->

コンパクト性を追加すると、この supremum が実際の固有値として実現します。

<a id="thm-fa7-norm-eigenvalue"></a>
<!-- formal-statement-start -->
### 定理（コンパクト自己共役作用素のノルム固有値）

$T\in\mathcal B(H)$ を 0 でないコンパクト自己共役作用素とする。このとき

$$
\lambda\in\{-\|T\|,\|T\|\}
$$

のいずれかが $T$ の固有値である。特に、絶対値が $\|T\|$ に等しい固有値が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$M:=\|T\|>0$ とします。[自己共役作用素のRayleigh商によるノルム評価](#lem-fa7-rayleigh-norm)により、単位ベクトル $x_n$ を

$$
|\langle Tx_n,x_n\rangle|\to M
$$

となるように選べます。値は実数なので、必要なら部分列を取り、ある

$$
\lambda\in\{-M,M\}
$$

について

$$
\langle Tx_n,x_n\rangle\to\lambda
$$

とできます。

$\lambda=M$ の場合、自己共役性から

$$
\begin{aligned}
\|(T-MI)x_n\|^2
&=\|Tx_n\|^2-2M\langle Tx_n,x_n\rangle+M^2\\
&\le 2M\bigl(M-\langle Tx_n,x_n\rangle\bigr)
\to0.
\end{aligned}
$$

$\lambda=-M$ の場合も同様に

$$
\|(T+MI)x_n\|^2
\le 2M\bigl(M+\langle Tx_n,x_n\rangle\bigr)
\to0.
$$

従ってどちらの場合も

$$
(T-\lambda I)x_n\to0.
$$

$(x_n)$ は有界で $T$ はコンパクトなので、部分列を取り直して $Tx_n$ を収束させられます。そして

$$
\lambda x_n
=Tx_n-(T-\lambda I)x_n
$$

も収束します。$\lambda\ne0$ なので $x_n$ 自身がある $x$ に収束します。$\|x_n\|=1$ だから $\|x\|=1$ です。

$T$ の連続性から

$$
Tx=\lambda x.
$$

従って $x\ne0$ は固有ベクトルで、$|\lambda|=\|T\|$ です。$\square$
<!-- proof-end -->

ここでコンパクト性を使った場所は一点だけです。**近似固有ベクトル列 $(x_n)$ から $Tx_n$ の収束部分列を抜いたこと**です。自己共役性だけでは、この収束を保証できません。

---

## 7. Hilbert空間を固有空間で分解する

いよいよ後半の結論です。$T$ の非零固有値を重複なしで $\lambda_1,\lambda_2,\dots$ とし

$$
E_j:=\ker(T-\lambda_jI)
$$

と置きます。非零固有値が有限個なら列は途中で終わるものとします。

第4節により各 $E_j$ は有限次元で、無限個ある場合は任意の $\varepsilon>0$ に対し $|\lambda_j|\ge\varepsilon$ となるものは有限個しかありません。従って非零固有値全体は高々可算です。第5節により $E_j$ は互いに直交します。

<a id="thm-fa7-compact-self-adjoint-spectral"></a>
<!-- formal-statement-start -->
### 定理（コンパクト自己共役作用素のスペクトル定理）

$H$ を実または複素 Hilbert 空間、$T\in\mathcal B(H)$ をコンパクト自己共役作用素とする。$T$ の互いに異なる非零固有値を $(\lambda_j)$、対応する固有空間を

$$
E_j=\ker(T-\lambda_jI)
$$

とする。このとき次が成り立つ。

1. 各 $\lambda_j$ は実数で、各 $E_j$ は有限次元である。
2. $j\ne k$ なら $E_j\perp E_k$ である。
3. 非零固有値が無限個なら $|\lambda_j|\to0$ となるように並べられる。
4. Hilbert空間は直交分解
   $$
   H
   =
   \ker T
   \oplus
   \overline{\bigoplus_j E_j}
   $$
   を持つ。
5. 各 $E_j$ の正規直交基底を $(e_{j,r})_{1\le r\le d_j}$ とすれば、任意の $x\in H$ に対して
   $$
   Tx
   =
   \sum_j\lambda_j
   \sum_{r=1}^{d_j}
   \langle x,e_{j,r}\rangle e_{j,r},
   $$
   ここで級数は $H$ のノルムで収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1 と 2 は第4節・第5節で示しました。3 は [非零固有値の有限重複度と0以外での非集積](#thm-fa7-nonzero-eigenvalues-discrete)から従います。

4 を示します。

$$
M:=\overline{\bigoplus_jE_j}
$$

と置きます。$M^\perp$ が $T$ で不変であることを示します。$x\in M^\perp$、$e\in E_j$ とすると

$$
\langle Tx,e\rangle
=
\langle x,Te\rangle
=
\lambda_j\langle x,e\rangle
=0.
$$

従って $Tx$ はすべての $E_j$ に直交し、閉包 $M$ にも直交します。よって

$$
T(M^\perp)\subseteq M^\perp.
$$

制限

$$
S:=T|_{M^\perp}
$$

は再びコンパクトかつ自己共役です。もし $S\ne0$ なら、[コンパクト自己共役作用素のノルム固有値](#thm-fa7-norm-eigenvalue)により $M^\perp$ の中に非零固有値 $\mu$ に属する単位固有ベクトル $u$ が存在します。しかし $u\in E_\mu\subseteq M$ でもあるので

$$
u\in M\cap M^\perp=\{0\},
$$

単位ベクトルであることに矛盾します。従って $S=0$、すなわち

$$
M^\perp\subseteq\ker T.
$$

逆に $x\in\ker T$、$e\in E_j$ なら

$$
0
=
\langle Tx,e\rangle
=
\langle x,Te\rangle
=
\lambda_j\langle x,e\rangle.
$$

$\lambda_j\ne0$ なので $\langle x,e\rangle=0$ です。よって $x\in M^\perp$ で

$$
\ker T=M^\perp.
$$

したがって

$$
H=M\oplus M^\perp
=
\overline{\bigoplus_jE_j}\oplus\ker T.
$$

5 を示します。各 $E_j$ は有限次元なので正規直交基底 $(e_{j,r})$ を選べます。4 の[直交分解](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-f0-02c1a-orthogonal-decomposition)により、任意の $x\in H$ は

$$
x=x_0+\sum_jP_jx,
\qquad
x_0\in\ker T,
$$

とノルム収束する形に書けます。ここで $P_j$ は $E_j$ への直交射影です。有限部分和に $T$ を作用させると

$$
T\left(x_0+\sum_{j=1}^NP_jx\right)
=
\sum_{j=1}^N\lambda_jP_jx.
$$

左辺の括弧内は $x$ に収束し、$T$ は有界なので左辺は $Tx$ に収束します。従って

$$
Tx=\sum_j\lambda_jP_jx.
$$

さらに

$$
P_jx
=
\sum_{r=1}^{d_j}\langle x,e_{j,r}\rangle e_{j,r}
$$

だから所望の表示を得ます。$\square$
<!-- proof-end -->

この定理は有限次元の実対称行列・Hermitian 行列のスペクトル定理に非常によく似ています。ただし違いが二つあります。

- 非零固有値は有限個とは限らず、無限個なら 0 へ近づきます。
- $\ker T$ は無限次元でもよく、非零固有値に対応する部分だけがコンパクト性により強く制御されます。

---

## 8. 典型例で境界を見る

### 8.1 $\ell^2$ の対角作用素

$$
D_a(x_n)=(a_nx_n),
\qquad
a_n\in\mathbb R,
\qquad
a_n\to0
$$

とします。FA6 より $D_a$ はコンパクトで、第5節の計算から自己共役です。

標準基底 $e_n$ について

$$
D_ae_n=a_ne_n.
$$

従って $a_n\ne0$ は固有値です。同じ値が複数回現れれば、その固有空間の次元は出現回数に対応します。非零の同じ値が無限回現れることは $a_n\to0$ に反するためありません。

特に

$$
a_n=\frac1n
$$

なら $D_a$ は単射なので $0$ は固有値ではありません。それでも無限次元上のコンパクト作用素なので $0\in\sigma(D_a)$ です。これは「コンパクト作用素では spectrum がすべて固有値」という誤読への最小反例です。正しい主張は **0でない spectrum 点が固有値になる**です。

### 8.2 rank-one の自己共役作用素

$\|u\|=1$、$\alpha\in\mathbb R$ として

$$
Kx=\alpha\langle x,u\rangle u
$$

と置きます。$K$ は rank one なのでコンパクトで、直接計算から自己共役です。

$$
Ku=\alpha u,
\qquad
Kx=0\quad(x\perp u).
$$

従って非零 spectrum は $\alpha\ne0$ のとき $\{\alpha\}$ だけです。また

$$
(I-K)u=(1-\alpha)u,
\qquad
(I-K)x=x\quad(x\perp u).
$$

よって $\alpha=1$ なら同次方程式に $u$ という非零解があり、$\alpha\ne1$ なら $I-K$ は全単射です。第3節の二者択一が目で見える例です。

### 8.3 コンパクトでも自己共役でなければ直交分解は出ない

$\mathbb C^2$ 上の

$$
K=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

は有限次元なのでコンパクトですが自己共役ではありません。spectrum は $\{0\}$ だけで、固有空間は1次元です。固有ベクトルだけでは空間全体の基底を作れません。

有限次元のこの例だけでも、スペクトル分解に必要なのが「コンパクト性だけ」ではなく **自己共役性との組合せ**であることが分かります。

---

## 9. 演習

### Level A

<a id="ex-fa7-a01"></a>
#### FA7-A01 非零固有空間は有限次元
- Level: A

$K\in\mathcal B(X)$ をコンパクトとし、$\lambda\ne0$ を固有値とする。

$$
E_\lambda=\ker(\lambda I-K)
$$

が有限次元であることを、FA6 の恒等作用素判定へ直接帰着して示せ。

<!-- solution-start -->
**解答・解説**

$E_\lambda$ は $\lambda I-K$ の核なので閉です。$x\in E_\lambda$ では $Kx=\lambda x$ だから

$$
I_{E_\lambda}
=\lambda^{-1}K|_{E_\lambda}.
$$

$K|_{E_\lambda}$ はコンパクトで、スカラー倍もコンパクトです。従って $I_{E_\lambda}$ はコンパクトです。[恒等作用素のコンパクト性と有限次元性](../FA6/index.md#thm-fa6-identity-finite-dimensional)より $E_\lambda$ は有限次元です。
<!-- solution-end -->

<a id="ex-fa7-a02"></a>
#### FA7-A02 異なる固有値の直交性
- Level: A

$T$ を自己共役とし

$$
Tx=\lambda x,
\qquad
Ty=\mu y,
\qquad
\lambda\ne\mu
$$

とする。$x\perp y$ を示せ。

<!-- solution-start -->
**解答・解説**

自己共役作用素の固有値は実数です。従って

$$
\lambda\langle x,y\rangle
=
\langle Tx,y\rangle
=
\langle x,Ty\rangle
=
\mu\langle x,y\rangle.
$$

$\lambda\ne\mu$ なので $\langle x,y\rangle=0$、従って $x\perp y$ です。
<!-- solution-end -->

<a id="ex-fa7-a03"></a>
#### FA7-A03 対角方程式と二者択一
- Level: A

$\ell^2$ 上で

$$
K(x_n)=\left(\frac{x_n}{n}\right)
$$

とする。

1. $I-K$ が単射であることを示せ。
2. 任意の $y=(y_n)\in\ell^2$ に対し $(I-K)x=y$ の解を具体的に書け。
3. その解作用素が有界であることを示せ。

<!-- solution-start -->
**解答・解説**

$(I-K)x=0$ なら

$$
\left(1-\frac1n\right)x_n=0.
$$

$n=1$ では係数が0なので、このままでは単射ではありません。したがって設問の $K$ では 1 は **偽** です。$e_1$ が核に入ります。

この演習は係数の一点を見落とすと Fredholm alternative を機械的に誤用する例です。実際 $I-K$ は全射でもありません。第一成分について

$$
0\cdot x_1=y_1
$$

なので $y_1\ne0$ なら解がありません。

一方、$K(x_n)=x_n/(n+1)$ と読み替えれば

$$
x_n=\frac{n+1}{n}y_n
$$

で一意に解け、係数 $(n+1)/n\le2$ だから逆作用素は有界です。
<!-- solution-end -->

<a id="ex-fa7-a04"></a>
#### FA7-A04 rank-one の閾値
- Level: A

$\|u\|=1$、$\alpha\in\mathbb R$ とし

$$
Kx=\alpha\langle x,u\rangle u
$$

とする。$I-K$ が可逆であるための必要十分条件を求め、可逆な場合の逆作用素を明示せよ。

<!-- solution-start -->
**解答・解説**

$x=\beta u+z$、$z\perp u$ と書くと

$$
(I-K)x=(1-\alpha)\beta u+z.
$$

従って $\alpha=1$ なら $u$ が核に入り可逆ではありません。

$\alpha\ne1$ なら、$y=\gamma u+w$、$w\perp u$ に対して

$$
x=\frac{\gamma}{1-\alpha}u+w
$$

が一意解です。従って

$$
(I-K)^{-1}y
=
y+\frac{\alpha}{1-\alpha}\langle y,u\rangle u.
$$

有限ランク作用素を足した形なので有界です。必要十分条件は $\alpha\ne1$ です。
<!-- solution-end -->

### Level B

<a id="ex-fa7-b01"></a>
#### FA7-B01 像の閉性で必要な代表元
- Level: B

$T=I-K$ とし、$Tx_n$ が収束しているとする。単に $(x_n)$ が有界とは限らない理由を説明し、核からの距離を使うと何が有界になるか述べよ。

<!-- solution-start -->
**解答・解説**

$N=\ker T$ が非零なら、$v\in N$ を固定して

$$
x_n=x_0+nv
$$

と置いても

$$
Tx_n=Tx_0
$$

なので像は定数列ですが $(x_n)$ は有界ではありません。従ってコンパクト性を $x_n$ に直接適用できません。

必要なのは核方向を取り除くことです。[核からの距離による下側評価](#lem-fa7-quotient-estimate)から

$$
\operatorname{dist}(x_n,N)
\le c^{-1}\|Tx_n\|
$$

が有界になります。$v_n\in N$ をほぼ最近点として選び

$$
z_n=x_n-v_n
$$

とすれば $(z_n)$ を有界にでき、しかも $Tz_n=Tx_n$ を保てます。
<!-- solution-end -->

<a id="ex-fa7-b02"></a>
#### FA7-B02 0 は spectrum だが固有値でない
- Level: B

$\ell^2$ 上で

$$
K(x_n)=\left(\frac{x_n}{n+1}\right)
$$

とする。

1. $K$ がコンパクトであることを示せ。
2. $K$ が単射であることを示せ。
3. $0\in\sigma(K)$ であることを示せ。
4. 以上から、なぜ第4節の系で $\lambda\ne0$ が必要か説明せよ。

<!-- solution-start -->
**解答・解説**

係数 $a_n=1/(n+1)$ は0へ収束するので、FA6 の $\ell^2$ 対角作用素判定から $K$ はコンパクトです。

すべての係数が非零なので $Kx=0$ なら各 $x_n=0$、従って $K$ は単射です。よって0は固有値ではありません。

一方、$K$ が可逆なら $I=K^{-1}K$ がコンパクトになり、無限次元 $\ell^2$ 上の恒等作用素がコンパクトでないことに反します。従って $K$ は可逆でなく $0\in\sigma(K)$ です。

したがって「spectrum点なら固有値」という主張は0では破れます。非零という条件は本質的です。
<!-- solution-end -->

<a id="ex-fa7-b03"></a>
#### FA7-B03 固有値の非集積を再構成する
- Level: B

コンパクト作用素 $K$ が互いに異なる固有値 $\lambda_n$ と固有ベクトル $v_n$ を持ち、$|\lambda_n|\ge\varepsilon>0$ と仮定する。

$$
M_n=\operatorname{span}\{v_1,\dots,v_n\}
$$

と置いたとき、なぜ

$$
(K-\lambda_nI)M_n\subseteq M_{n-1}
$$

が成り立つかを示し、この包含がコンパクト性との矛盾を作る役割を説明せよ。

<!-- solution-start -->
**解答・解説**

任意の

$$
x=\sum_{j=1}^nc_jv_j\in M_n
$$

に対して

$$
(K-\lambda_nI)x
=
\sum_{j=1}^{n-1}(\lambda_j-\lambda_n)c_jv_j
\in M_{n-1}.
$$

最後の $v_n$ 成分が消えるのが要点です。

Riesz の補題で $u_n\in M_n$ を $M_{n-1}$ から一定距離だけ離して選ぶと

$$
Ku_n=\lambda_nu_n+z_n,
\qquad z_n\in M_{n-1}.
$$

$m<n$ なら $Ku_m\in M_{n-1}$ なので

$$
\|Ku_n-Ku_m\|
\ge |\lambda_n|\operatorname{dist}(u_n,M_{n-1})
$$

となります。$|\lambda_n|\ge\varepsilon$ により像どうしが一様に離れ、コンパクト性が要求する収束部分列と矛盾します。
<!-- solution-end -->

### Level C

<a id="ex-fa7-c01"></a>
#### FA7-C01 非零固有空間の直交補上で作用素が消える理由
- Level: C

$T$ をコンパクト自己共役作用素とし、非零固有空間の代数的直和の閉包を

$$
M=\overline{\bigoplus_{\lambda\ne0}E_\lambda}
$$

とする。次を順に示せ。

1. $M^\perp$ は $T$ で不変である。
2. $S=T|_{M^\perp}$ はコンパクト自己共役である。
3. $S\ne0$ と仮定すると $M^\perp$ に非零固有ベクトルが生まれて矛盾する。
4. $M^\perp=\ker T$ を結論せよ。

<!-- solution-start -->
**解答・解説**

$x\in M^\perp$、$e\in E_\lambda$、$\lambda\ne0$ とすると

$$
\langle Tx,e\rangle
=
\langle x,Te\rangle
=
\lambda\langle x,e\rangle
=0.
$$

従って $Tx$ は全非零固有空間に直交し、その閉包 $M$ にも直交します。よって $M^\perp$ は不変です。

閉部分空間への制限なので $S$ は有界です。$T$ の自己共役性は $M^\perp$ 上でも同じ内積恒等式を満たし、コンパクト性も有界列への部分列抽出からそのまま継承されます。

もし $S\ne0$ なら [コンパクト自己共役作用素のノルム固有値](#thm-fa7-norm-eigenvalue)により、$M^\perp$ 内に $Su=\mu u$、$\mu\ne0$ を満たす単位ベクトル $u$ が存在します。しかしこれは $T$ の非零固有ベクトルなので $u\in M$ でもあり、$u\in M\cap M^\perp=\{0\}$ に矛盾します。従って $S=0$ で $M^\perp\subseteq\ker T$ です。

逆に $x\in\ker T$ と $e\in E_\lambda$、$\lambda\ne0$ に対して

$$
0=\langle Tx,e\rangle=\langle x,Te\rangle=\lambda\langle x,e\rangle
$$

だから $x\perp E_\lambda$ です。従って $\ker T\subseteq M^\perp$ で、両者は一致します。
<!-- solution-end -->

---

## 10. この章で何を得たか

コンパクト作用素は有限ランク作用素ではありません。しかし、恒等作用素との差 $I-K$ を見ると

- 核は有限次元になる。
- 像は閉じる。
- 単射と全射が同値になる。
- 0でない spectrum は有限重複度の固有値へ還元される。

という有限次元的な性質が復活します。

さらに Hilbert 空間で自己共役性を加えると

- 固有値は実数。
- 異なる固有空間は直交。
- 0でない固有空間の直交和と核で空間全体を記述できる。
- 作用素は固有空間への直交射影の重み付き和として表せる。

ところまで進みます。

FA6 では「コンパクト作用素そのもの」を構成し、本章では「コンパクト作用素が方程式と spectrum をどう有限次元化するか」を閉じました。ここから先の関数解析で、compact resolvent・Sturm–Liouville型問題・楕円型作用素へ進むときの基本骨格がこれです。
