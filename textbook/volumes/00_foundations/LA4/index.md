# LA4 標準線形代数 IV：作用素多項式・最小多項式・Jordan構造

[F0-00F](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) では固有値・固有空間・対角化を扱いました。しかし「対角化できない」で終わると、一般の線形自己写像の構造はまだ見えていません。

この章では自己写像 $T$ に多項式を代入し、**最小多項式が作用素の構造を圧縮して記録する**ことから、一般化固有空間とJordan標準形まで進みます。

---

## 1. 多項式を作用素に代入する

<a id="def-la4-operator-polynomial"></a>
<!-- formal-statement-start -->
> **定義（作用素多項式）**  
> 線形自己写像 $T:V\to V$ と多項式
$$
p(t)=a_0+a_1t+\cdots+a_kt^k
$$
> に対し
$$
p(T)=a_0I+a_1T+\cdots+a_kT^k
$$
> を作用素多項式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la4-operator-polynomial -->
**定義の確認**：$p(t)=t^2-3t+2$ なら、定義に $a_2=1,a_1=-3,a_0=2$ を代入して
$$
p(T)=T^2-3T+2I.
$$
さらに固有ベクトル $Tv=\lambda v$ なら
$$
T^2v=T(\lambda v)=\lambda^2v
$$
なので
$$
p(T)v=(\lambda^2-3\lambda+2)v=p(\lambda)v.
$$
<!-- definition-example-end -->

多項式同士の積は
$$
(pq)(T)=p(T)q(T)
$$
を満たします。同じ $T$ の多項式なので、これらの作用素は互いに可換です。

---

## 2. 特性多項式と最小多項式

<a id="def-la4-characteristic-polynomial"></a>
<!-- formal-statement-start -->
> **定義（特性多項式）**  
> $V$ を $n$ 次元、$T:V\to V$ を線形自己写像とする。
$$
\chi_T(t)=\det(tI-T)
$$
> を $T$ の特性多項式という。
<!-- formal-statement-end -->

基底を選んだ表現行列を $A$ とすれば
$$
\chi_T(t)=\det(tI-A)
$$
です。行列式は相似変換で変わらないため、基底に依存しません。

<a id="def-la4-minimal-polynomial"></a>
<!-- formal-statement-start -->
> **定義（最小多項式）**  
> $T$ に対して
$$
p(T)=0
$$
> を満たす0でない多項式のうち、次数最小の首一多項式を $T$ の最小多項式といい $m_T(t)$ と書く。
<!-- formal-statement-end -->

有限次元では、この定義に必要な「$T$ を0にする0でない多項式」が必ず存在します。$\dim V=n$ とし基底を一つ選ぶと、線形自己写像全体は $n\times n$ 行列全体と同一視できるので次元は $n^2$ です。したがって $n^2+1$ 個の自己写像
$$
I,T,T^2,\dots,T^{n^2}
$$
は一次従属です。よって全ては0でない係数 $a_0,\dots,a_{n^2}$ が存在して
$$
a_0I+a_1T+\cdots+a_{n^2}T^{n^2}=0.
$$
つまり
$$
p(t)=a_0+a_1t+\cdots+a_{n^2}t^{n^2}
$$
と置けば $p(T)=0$ です。後のCayley–Hamilton定理は、さらに次数 $n$ の特性多項式そのものが $T$ を0にすることを示します。

<!-- definition-example-start: def-la4-characteristic-polynomial, def-la4-minimal-polynomial -->
**定義の確認**：
$$
A=\begin{pmatrix}2&1\\0&2\end{pmatrix}
$$
なら
$$
tI-A=
\begin{pmatrix}t-2&-1\\0&t-2\end{pmatrix}
$$
なので
$$
\chi_A(t)=\det(tI-A)=(t-2)^2.
$$
一方
$$
A-2I=\begin{pmatrix}0&1\\0&0\end{pmatrix}\ne0,
\qquad
(A-2I)^2=0.
$$
したがって次数1の $t-2$ では $A$ を0にできず、次数2の $(t-2)^2$ では0にできるため
$$
m_A(t)=(t-2)^2.
$$
一方 $A=2I$ なら $(A-2I)=0$ なので、特性多項式は同じ $(t-2)^2$ でも最小多項式は $t-2$ です。
<!-- definition-example-end -->

最小多項式は「この作用素を0にする最短の多項式関係」です。

### 最小多項式は全ての消去多項式を割る

$p(T)=0$ とします。多項式の除法で
$$
p=qm_T+r,
\qquad \deg r<\deg m_T
$$
と書くと
$$
0=p(T)=q(T)m_T(T)+r(T)=r(T).
$$
もし $r\ne0$ なら、$r$ の最高次係数で割って首一多項式に直せば、$m_T$ より低次数で $T$ を0にする多項式が得られ、$m_T$ の最小性に反します。したがって $r=0$ で
$$
m_T\mid p.
$$

---

## 3. Cayley–Hamilton定理

証明では「多項式 $t$ をいきなり行列 $A$ に代入する」のではなく、まず多項式行列の恒等式から**係数ごとの行列等式**を取り出し、その等式を最後に組み合わせます。

<a id="lem-la4-adjugate-identity"></a>
<!-- formal-statement-start -->
> **補題（余因子行列の恒等式）**  
> 任意の $n\times n$ 行列 $M=(m_{ij})$ に対し、$(i,j)$ 余因子を $C_{ij}$ と書き
$$
\operatorname{adj}(M)_{kj}=C_{jk}
$$
> で余因子行列を定める。このとき
$$
M\operatorname{adj}(M)=\det(M)I.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積の $(i,j)$ 成分は
$$
(M\operatorname{adj}(M))_{ij}
=\sum_{k=1}^n m_{ik}C_{jk}
$$
です。$i=j$ なら、これは第 $j$ 行に関するLaplace展開そのものなので
$$
\sum_{k=1}^n m_{jk}C_{jk}=\det M.
$$
一方 $i\ne j$ なら、上の和は「$M$ の第 $j$ 行を第 $i$ 行で置き換えた行列」を第 $j$ 行でLaplace展開した値です。その行列には第 $i$ 行と第 $j$ 行という同じ2行があるため行列式は0です。したがって
$$
(M\operatorname{adj}(M))_{ij}
=
\begin{cases}
\det M,&i=j,\\
0,&i\ne j,
\end{cases}
$$
となり
$$
M\operatorname{adj}(M)=\det(M)I
$$
が示されました。$\square$
<!-- proof-end -->

<a id="thm-la4-cayley-hamilton"></a>
<!-- formal-statement-start -->
> **定理（Cayley-Hamilton定理）**  
> 有限次元線形自己写像 $T$ は自分自身の特性多項式を満たす：
$$
\chi_T(T)=0.
$$
> 特に
$$
m_T(t)\mid\chi_T(t).
$$
<!-- formal-statement-end -->


<!-- proof-start -->
### 証明

基底を選び $T$ の表現行列を $A$ とします。特性多項式を
$$
\chi_A(t)=t^n+c_{n-1}t^{n-1}+\cdots+c_1t+c_0
$$
と書きます。

上の[余因子行列の恒等式](#lem-la4-adjugate-identity)は、成分が多項式でも同じLaplace展開で成り立つので $M=tI-A$ に使えます。

そこで多項式行列 $tI-A$ に補題を適用すると
$$
(tI-A)\operatorname{adj}(tI-A)=\det(tI-A)I=\chi_A(t)I.
$$
$\operatorname{adj}(tI-A)$ の各成分は $(n-1)\times(n-1)$ 小行列の行列式なので次数高々 $n-1$ の多項式です。したがって、ある定数行列 $B_0,\dots,B_{n-1}$ を用いて
$$
\operatorname{adj}(tI-A)
=B_0+B_1t+\cdots+B_{n-1}t^{n-1}
$$
と書けます。

左辺を展開すると
$$
\begin{aligned}
(tI-A)\operatorname{adj}(tI-A)
&=t\sum_{k=0}^{n-1}B_kt^k-A\sum_{k=0}^{n-1}B_kt^k\\
&=\sum_{k=0}^{n-1}B_kt^{k+1}-\sum_{k=0}^{n-1}AB_kt^k.
\end{aligned}
$$
これを
$$
\chi_A(t)I
=t^nI+c_{n-1}t^{n-1}I+\cdots+c_1tI+c_0I
$$
と係数比較します。$t^n$ の係数、$t^k$（$1\le k\le n-1$）の係数、定数項をそれぞれ比較すると
$$
B_{n-1}=I,
$$
$$
B_{k-1}-AB_k=c_kI
\qquad(k=1,\dots,n-1),
$$
$$
-AB_0=c_0I
$$
を得ます。

ここから $\chi_A(A)=0$ を直接作ります。途中の等式
$$
B_{k-1}-AB_k=c_kI
$$
に左から $A^k$ を掛けると
$$
A^kB_{k-1}-A^{k+1}B_k=c_kA^k.
$$
これを $k=1,\dots,n-1$ について足し、さらに定数項の等式 $-AB_0=c_0I$ を加えます。左辺を省略せず並べると
$$
\begin{aligned}
&-AB_0
+(AB_0-A^2B_1)
+(A^2B_1-A^3B_2)\\
&\qquad+\cdots
+(A^{n-1}B_{n-2}-A^nB_{n-1}).
\end{aligned}
$$
ここでは $-AB_0$ と $+AB_0$、$-A^2B_1$ と $+A^2B_1$、以下同様に各中間項が符号を反対にしてちょうど1回ずつ現れるため、残るのは
$$
-A^nB_{n-1}=-A^n
$$
だけです。一方右辺は
$$
c_0I+c_1A+\cdots+c_{n-1}A^{n-1}
$$
です。したがって
$$
c_0I+c_1A+\cdots+c_{n-1}A^{n-1}=-A^n,
$$
すなわち
$$
A^n+c_{n-1}A^{n-1}+\cdots+c_1A+c_0I=0.
$$
左辺は $\chi_A(A)$ なので
$$
\chi_A(A)=0.
$$
表現行列で成り立つ等式は元の線形写像でも成り立つため
$$
\chi_T(T)=0.
$$
最後に、$m_T$ は $T$ を0にする全ての多項式を割るので
$$
m_T\mid\chi_T.
$$
$\square$
<!-- proof-end -->

これにより、$n$ 次元空間上の作用素は必ず次数高々 $n$ の非自明な多項式関係を持ちます。

---

## 4. 最小多項式で対角化を判定する

<a id="thm-la4-diagonalizable-criterion"></a>
<!-- formal-statement-start -->
> **定理（最小多項式による対角化判定）**  
> 有限次元ベクトル空間上の線形自己写像 $T$ が対角化可能であるための必要十分条件は、最小多項式がスカラー体上で
$$
m_T(t)=\prod_{j=1}^r(t-\lambda_j)
$$
> と相異なる一次因子の積に分解することである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $T$ が対角化可能だとします。固有基底を取り、現れる相異なる固有値を $\lambda_1,\dots,\lambda_r$ とします。多項式
$$
p(t)=\prod_{j=1}^r(t-\lambda_j)
$$
を考えると、固有ベクトル $v$ が固有値 $\lambda_i$ に属するとき
$$
p(T)v=p(\lambda_i)v=0.
$$
固有基底の全てのベクトルを0にするので $p(T)=0$。よって最小多項式は $p$ を割ります。$p$ は相異なる一次因子だけを持つため、$m_T$ も重根を持ちません。

逆に
$$
m_T(t)=\prod_{j=1}^r(t-\lambda_j)
$$
と相異なる一次因子に分解するとします。各 $j$ に対してLagrange補間多項式
$$
e_j(t)
=
\prod_{k\ne j}
\frac{t-\lambda_k}{\lambda_j-\lambda_k}
$$
を定めます。これは
$$
e_j(\lambda_i)=
\begin{cases}
1,&i=j,\\
0,&i\ne j
\end{cases}
$$
を満たし、次数は高々 $r-1$ です。したがって多項式
$$
1-\sum_{j=1}^re_j(t)
$$
は次数高々 $r-1$ なのに $r$ 個の相異なる点 $\lambda_1,\dots,\lambda_r$ で0になるため、恒等的に0です。よって
$$
1=\sum_{j=1}^re_j(t).
$$
$t=T$ を代入すると
$$
I=\sum_{j=1}^re_j(T).
$$
したがって任意の $v\in V$ は
$$
v=\sum_{j=1}^re_j(T)v
$$
と分解されます。

ここで各成分が本当に固有空間に入ることを確認します。定義から
$$
(t-\lambda_j)e_j(t)
=
\frac{m_T(t)}{\prod_{k\ne j}(\lambda_j-\lambda_k)}.
$$
したがって
$$
(T-\lambda_jI)e_j(T)
=
\frac{m_T(T)}{\prod_{k\ne j}(\lambda_j-\lambda_k)}
=0.
$$
ゆえに
$$
e_j(T)v\in\ker(T-\lambda_jI).
$$
つまり全ての $v$ は固有ベクトル成分の和に書けます。

最後に和が直和であることを確認します。$v_j\in\ker(T-\lambda_jI)$ が
$$
v_1+\cdots+v_r=0
$$
を満たすとします。固有ベクトル上では多項式作用素はスカラー代入になるので
$$
e_i(T)v_j=e_i(\lambda_j)v_j=\delta_{ij}v_j.
$$
両辺に $e_i(T)$ を作用させると $v_i=0$。これは全ての $i$ で成り立つため、異なる固有空間の和は直和です。

よって $V$ は固有空間の直和であり、各固有空間の基底を合わせれば固有基底になります。したがって $T$ は対角化可能です。$\square$
<!-- proof-end -->

対角化不能の原因は、最小多項式に
$$
(t-\lambda)^2,\ (t-\lambda)^3,\dots
$$
のような重複因子が必要になることです。

---

## 5. 一般化固有空間

<a id="def-la4-generalized-eigenspace"></a>
<!-- formal-statement-start -->
> **定義（一般化固有空間）**  
> 固有値 $\lambda$ に対して
$$
G_\lambda
=
\ker(T-\lambda I)^N
$$
> を、$N$ を十分大きく取ったときの一般化固有空間という。有限次元では核の増大列
$$
\ker(T-\lambda I)
\subset
\ker(T-\lambda I)^2
\subset\cdots
$$
> は有限回で安定するので定義できる。
<!-- formal-statement-end -->

「十分大きい $N$」が本当に意味を持つことを確認します。$S=T-\lambda I$ と置くと
$$
K_j=\ker S^j
$$
は
$$
K_1\subset K_2\subset\cdots
$$
という増大列です。$V$ が $n$ 次元なら $\dim K_j\le n$ なので、どこかで
$$
K_j=K_{j+1}
$$
となります。さらに一度等しくなれば、その後も増えません。実際 $x\in K_{j+2}$ なら
$$
Sx\in K_{j+1}=K_j
$$
なので $S^{j+1}x=0$、すなわち $x\in K_{j+1}$。よって $K_{j+2}=K_{j+1}$ です。同じ議論を繰り返せば以後ずっと一定です。

<!-- definition-example-start: def-la4-generalized-eigenspace -->
**定義の確認**：
$$
A=\begin{pmatrix}2&1\\0&2\end{pmatrix}
$$
では
$$
A-2I=\begin{pmatrix}0&1\\0&0\end{pmatrix},
$$
したがって
$$
\ker(A-2I)=\operatorname{span}(e_1).
$$
一方
$$
(A-2I)^2=0
$$
なので
$$
\ker(A-2I)^2=\mathbb R^2.
$$
よって核の列は2段目で全空間に達し、一般化固有空間は $\mathbb R^2$ 全体です。また
$$
(A-2I)e_2=e_1,
\qquad
(A-2I)e_1=0
$$
なので、$e_2$ は固有ベクトルではないものの1回作用させると固有ベクトルへ移ります。
<!-- definition-example-end -->

<a id="lem-la4-polynomial-bezout"></a>
<!-- formal-statement-start -->
> **補題（多項式のBézout等式）**  
> 多項式 $f,g$ が互いに素なら、ある多項式 $a,b$ が存在して
$$
af+bg=1
$$
> と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Euclidの互除法を
$$
r_{-1}=f,\qquad r_0=g,
$$
$$
r_{k-1}=q_kr_k+r_{k+1},
\qquad \deg r_{k+1}<\deg r_k
$$
と続けます。最後の非零余りは $\gcd(f,g)$ の定数倍です。$f,g$ は互いに素なので、この最後の余りを定数倍して1とできます。

各式を
$$
r_{k+1}=r_{k-1}-q_kr_k
$$
と書き直し、最後の式から順に逆代入します。各余りはその一つ前と二つ前の余りの多項式係数線形結合なので、逆代入を最初まで続けると、最後の1は最初の $f,g$ の多項式係数線形結合になります。従ってある多項式 $a,b$ が存在して
$$
1=af+bg.
$$
$\square$
<!-- proof-end -->

<a id="lem-la4-coprime-product-divisibility"></a>
<!-- formal-statement-start -->
> **補題（互いに素な因子の積による整除）**  
> $f_1,\dots,f_r$ が2つずつ互いに素で、多項式 $h$ が全ての $f_i$ で割り切れるなら
$$
f_1\cdots f_r\mid h.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず2因子の場合を示します。$h=f_1c$ かつ $f_2\mid h$ とします。[多項式のBézout等式](#lem-la4-polynomial-bezout)から
$$
af_1+bf_2=1
$$
と書けます。両辺に $c$ を掛けると
$$
c=af_1c+bf_2c=ah+bf_2c.
$$
右辺の2項はいずれも $f_2$ で割り切れるので $f_2\mid c$。従って $c=f_2d$ と書け
$$
h=f_1f_2d.
$$
よって $f_1f_2\mid h$ です。

次にこの2因子の場合を繰り返します。$f_1,\dots,f_r$ が2つずつ互いに素なら、積 $f_1\cdots f_{j-1}$ と $f_j$ も互いに素です。実際、両者に共通する既約因子があれば、その因子は $f_j$ といずれかの $f_i$（$i<j$）の共通因子になり、仮定に反します。従って
$$
f_1f_2\mid h,
$$
次に
$$
f_1f_2f_3\mid h,
$$
と順に進め、最後に
$$
f_1\cdots f_r\mid h
$$
を得ます。$\square$
<!-- proof-end -->

<a id="thm-la4-generalized-decomposition"></a>
<!-- formal-statement-start -->
> **定理（一般化固有空間分解）**  
> 最小多項式が
$$
m_T(t)=\prod_{j=1}^r(t-\lambda_j)^{s_j}
$$
> と相異なる一次因子の冪へ分解するとき
$$
V=G_{\lambda_1}\oplus\cdots\oplus G_{\lambda_r}.
$$
<!-- formal-statement-end -->


<!-- proof-start -->
### 証明

各 $j$ について
$$
p_j(t)=(t-\lambda_j)^{s_j},
\qquad
q_j(t)=\frac{m_T(t)}{p_j(t)}
$$
と置きます。証明の核心は、互いに素な多項式から「ある成分では1、他の成分では0」となる作用素を作ることです。そのために、使う多項式の事実を先に確認します。

この証明では、直前に示した[多項式のBézout等式](#lem-la4-polynomial-bezout)と[互いに素な因子の積による整除](#lem-la4-coprime-product-divisibility)を使います。

#### 最小多項式の指数と一般化固有空間を結ぶ

ここで、証明中に使う
$$
G_{\lambda_j}=\ker p_j(T)
$$
を先に示します。

$\ker p_j(T)\subset G_{\lambda_j}$ は、$p_j(T)=(T-\lambda_jI)^{s_j}$ であり、一般化固有空間が十分大きい冪の核として安定した空間だから従います。

逆向きを示します。$x\in G_{\lambda_j}$ とすると、ある十分大きい $N$ について
$$
(T-\lambda_jI)^Nx=0.
$$
$q_j$ は $(t-\lambda_j)$ を因子に持たないので
$$
\gcd\bigl(q_j(t),(t-\lambda_j)^N\bigr)=1.
$$
[多項式のBézout等式](#lem-la4-polynomial-bezout)から多項式 $\alpha,\beta$ が存在して
$$
\alpha(t)q_j(t)+\beta(t)(t-\lambda_j)^N=1.
$$
$t=T$ を代入して $x$ に作用させると、第2項は0になるため
$$
x=\alpha(T)q_j(T)x.
$$
両辺に $p_j(T)$ を作用させると、作用素多項式同士は可換なので
$$
\begin{aligned}
p_j(T)x
&=p_j(T)\alpha(T)q_j(T)x\\
&=\alpha(T)p_j(T)q_j(T)x\\
&=\alpha(T)m_T(T)x\\
&=0.
\end{aligned}
$$
従って $x\in\ker p_j(T)$ です。以上で
$$
G_{\lambda_j}=\ker p_j(T)
$$
が示されました。

#### Bézout等式から射影成分を作る

$p_j$ と $q_j$ は共通因子を持たないので、[多項式のBézout等式](#lem-la4-polynomial-bezout)により多項式 $a_j,b_j$ が存在して
$$
a_j(t)p_j(t)+b_j(t)q_j(t)=1
$$
とできます。ここで
$$
e_j(t)=b_j(t)q_j(t)
$$
と定めます。

Bézout式を移項すると
$$
e_j(t)=1-a_j(t)p_j(t),
$$
従って
$$
e_j(t)\equiv1\pmod{p_j(t)}.
$$
また $k\ne j$ なら $q_j$ は因子 $p_k$ を含むので
$$
e_j(t)\equiv0\pmod{p_k(t)}.
$$

そこで
$$
h(t)=1-\sum_{j=1}^re_j(t)
$$
と置きます。固定した $k$ について見ると、$e_k\equiv1\pmod{p_k}$ であり、$j\ne k$ の $e_j$ は全て $p_k$ で割り切れるので
$$
h(t)\equiv1-1-0-\cdots-0\equiv0\pmod{p_k(t)}.
$$
つまり $h$ は全ての $p_k$ で割り切れます。$p_1,\dots,p_r$ は2つずつ互いに素なので[互いに素な因子の積による整除](#lem-la4-coprime-product-divisibility)から
$$
p_1(t)\cdots p_r(t)=m_T(t)\mid h(t).
$$
よってある多項式 $c$ が存在して
$$
1-\sum_{j=1}^re_j(t)=c(t)m_T(t).
$$
$t=T$ を代入し $m_T(T)=0$ を使うと
$$
I=\sum_{j=1}^re_j(T).
$$
したがって任意の $v\in V$ は
$$
v=\sum_{j=1}^re_j(T)v
$$
と書けます。

各項が対応する一般化固有空間に入ることを示します。$e_j=b_jq_j$ なので
$$
\begin{aligned}
p_j(T)e_j(T)
&=p_j(T)b_j(T)q_j(T)\\
&=b_j(T)p_j(T)q_j(T)\\
&=b_j(T)m_T(T)\\
&=0.
\end{aligned}
$$
従って
$$
e_j(T)v\in\ker p_j(T)=G_{\lambda_j}.
$$
これで $V$ が一般化固有空間の和で張られることが分かりました。

最後に和が直和であることを確認します。$v_j\in G_{\lambda_j}$ が
$$
v_1+\cdots+v_r=0
$$
を満たすとします。$e_i=1-a_ip_i$ なので $p_i(T)v_i=0$ から
$$
e_i(T)v_i=v_i-a_i(T)p_i(T)v_i=v_i.
$$
一方 $j\ne i$ なら $e_i$ は $p_j$ で割り切れます。すなわちある多項式 $d_{ij}$ が存在して
$$
e_i(t)=d_{ij}(t)p_j(t).
$$
従って
$$
e_i(T)v_j=d_{ij}(T)p_j(T)v_j=0.
$$
元の等式に $e_i(T)$ を作用させると
$$
0=e_i(T)(v_1+\cdots+v_r)=v_i.
$$
これは全ての $i$ について成り立つので和は直和です。よって
$$
V=G_{\lambda_1}\oplus\cdots\oplus G_{\lambda_r}.
$$
$\square$
<!-- proof-end -->

複素数上では特性多項式が必ず一次因子へ分解し、[Cayley–Hamilton定理](#thm-la4-cayley-hamilton)から最小多項式も特性多項式を割るので、全ての有限次元複素作用素にこの分解が使えます。

---

## 6. Jordan鎖とJordanブロック

一般化固有空間 $G_\lambda$ 上では
$$
N=T-\lambda I
$$
は冪零です。実際 $G_\lambda=\ker(T-\lambda I)^{s}$ と書けるので、$G_\lambda$ 上では $N^s=0$ です。

<a id="def-la4-jordan-sequence"></a>
<!-- formal-statement-start -->
> **定義（Jordan鎖）**  
> ベクトル列 $v_1,\dots,v_k$ が
$$
(T-\lambda I)v_1=0,
$$
$$
(T-\lambda I)v_j=v_{j-1}\qquad(j=2,\dots,k)
$$
> を満たすとき、これを固有値 $\lambda$ に対するJordan鎖という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la4-jordan-sequence -->
**定義の確認**：上の $2\times2$ 行列では $v_1=e_1$, $v_2=e_2$ とすると
$$
(A-2I)v_1=0,
\qquad
(A-2I)v_2=v_1.
$$
定義の2条件をともに満たすので $(e_1,e_2)$ は長さ2のJordan鎖です。
<!-- definition-example-end -->

<a id="def-la4-jordan-block"></a>
<!-- formal-statement-start -->
> **定義（Jordanブロック）**  
> 固有値 $\lambda$ と正整数 $k$ に対し
$$
J_k(\lambda)=
\begin{pmatrix}
\lambda&1&&0\\
&\lambda&\ddots&\\
&&\ddots&1\\
0&&&\lambda
\end{pmatrix}
$$
> を $k$ 次Jordanブロックという。
<!-- formal-statement-end -->

Jordan鎖を基底として並べると、$T$ のその鎖上の表現行列がちょうど $J_k(\lambda)$ になります。

<!-- definition-example-start: def-la4-jordan-block -->
**定義の確認**：長さ2のJordan鎖 $v_1,v_2$ では
$$
(T-\lambda I)v_1=0,
\qquad
(T-\lambda I)v_2=v_1,
$$
すなわち
$$
Tv_1=\lambda v_1,
\qquad
Tv_2=v_1+\lambda v_2.
$$
表現行列の第1列・第2列はそれぞれこの係数なので、基底 $(v_1,v_2)$ での行列は
$$
\begin{pmatrix}\lambda&1\\0&\lambda\end{pmatrix}=J_2(\lambda).
$$
<!-- definition-example-end -->

---

## 7. Jordan標準形

<a id="thm-la4-jordan-form"></a>
<!-- formal-statement-start -->
> **定理（Jordan標準形定理）**  
> 有限次元複素ベクトル空間上の任意の線形自己写像 $T$ には、Jordan鎖を並べた基底が存在し、その基底での表現行列は
$$
J_{k_1}(\lambda_1)\oplus\cdots\oplus J_{k_m}(\lambda_m)
$$
> というJordanブロックの直和になる。ブロックの順序を除けば、各固有値に対するブロックサイズの多重集合は一意である。
<!-- formal-statement-end -->

証明は二段階です。まず一般化固有空間分解で固有値ごとに分けます。その後、各一般化固有空間上の冪零作用素
$$
N=T-\lambda I
$$
に対して「Jordan鎖からなる基底が存在する」ことを示します。

<!-- proof-start -->
### 証明

複素数上では特性多項式が一次因子へ分解するので、[一般化固有空間分解](#thm-la4-generalized-decomposition)により
$$
V=\bigoplus_\lambda G_\lambda.
$$
したがって各 $G_\lambda$ 上で $N=T-\lambda I$ のJordan鎖基底を作れば、それらを全部合わせて $V$ の基底にできます。以下では一つの $G_\lambda$ を固定し、そこを改めて $V$ と書き、$N$ を冪零作用素とします。

#### 冪零作用素にはJordan鎖基底がある

$\dim V$ に関する帰納法で示します。

$N=0$ なら、任意の基底 $z_1,\dots,z_n$ が全て長さ1のJordan鎖です。したがって主張は成り立ちます。

$N\ne0$ とし
$$
W=\operatorname{Im}N
$$
と置きます。$w\in W$ ならある $x$ があって $w=Nx$ と書けるので
$$
Nw=N^2x\in\operatorname{Im}N=W.
$$
従って $N(W)\subset W$ で、$N$ は $W$ 上の作用素でもあり、しかも冪零です。

また $N$ が冪零である以上、$N$ は非零空間上で全射にはなれません。実際、もし全射なら $N^k$ も全射ですが、十分大きい $k$ で $N^k=0$ となり、非零な $V$ への零写像が全射という矛盾になります。したがって
$$
\dim W<\dim V.
$$
よって帰納法の仮定を $N|_W$ に使えます。

帰納法により $W$ にはJordan鎖からなる基底が存在します。それを鎖ごとに
$$
w_{i,1},\dots,w_{i,k_i}
\qquad(i=1,\dots,c)
$$
と書きます。つまり
$$
Nw_{i,1}=0,
\qquad
Nw_{i,j}=w_{i,j-1}
\quad(j=2,\dots,k_i),
$$
であり、全ての $w_{i,j}$ を合わせると $W$ の基底です。

各鎖の最上段 $w_{i,k_i}$ は $W=\operatorname{Im}N$ に属するので、像の定義から、ある $v_i\in V$ が存在して
$$
Nv_i=w_{i,k_i}
$$
とできます。すると
$$
w_{i,1},\dots,w_{i,k_i},v_i
$$
は $V$ 上で1段長いJordan鎖になります。

ただし、これらを延長しただけでは $V$ の全てを埋めるとは限りません。そこで長さ1の鎖を必要な分だけ追加します。

まず
$$
\ker(N|_W)=W\cap\ker N
$$
の基底が各鎖の先頭だけで与えられることを確認します。$w\in W$ を
$$
w=\sum_{i=1}^c\sum_{j=1}^{k_i}a_{i,j}w_{i,j}
$$
と書くと
$$
Nw=\sum_{i=1}^c\sum_{j=2}^{k_i}a_{i,j}w_{i,j-1}.
$$
$\{w_{i,j}\}$ は $W$ の基底なので $Nw=0$ なら
$$
a_{i,j}=0\qquad(j\ge2)
$$
です。逆に各 $w_{i,1}$ は $Nw_{i,1}=0$ を満たします。従って
$$
\ker(N|_W)=\operatorname{span}(w_{1,1},\dots,w_{c,1}),
$$
しかもこれらは元の基底の一部なので一次独立です。よって
$$
w_{1,1},\dots,w_{c,1}
$$
は $W\cap\ker N$ の基底です。

この基底を $\ker N$ の基底へ延長し
$$
w_{1,1},\dots,w_{c,1},z_1,\dots,z_r
$$
を $\ker N$ の基底とします。各 $z_\ell$ は $Nz_\ell=0$ なので、それ自体が長さ1のJordan鎖です。

ここで候補となるベクトル族
$$
\mathcal B
=
\{w_{i,j}\}_{i,j}
\cup\{v_1,\dots,v_c\}
\cup\{z_1,\dots,z_r\}
$$
を考えます。これが基底であることを確認します。

まず一次独立性です。
$$
\sum_i\left(
\sum_{j=1}^{k_i}a_{i,j}w_{i,j}
+b_iv_i
\right)
+\sum_{\ell=1}^r c_\ell z_\ell
=0
$$
とします。両辺に $N$ を作用させると $Nz_\ell=0$ であり
$$
Nv_i=w_{i,k_i},
\qquad
Nw_{i,j}=w_{i,j-1}\ (j\ge2),
\qquad
Nw_{i,1}=0
$$
なので
$$
\sum_i\left(
\sum_{j=2}^{k_i}a_{i,j}w_{i,j-1}
+b_iw_{i,k_i}
\right)=0.
$$
左辺は $W$ の基底 $\{w_{i,j}\}$ の線形結合です。各固定した $i$ について、$w_{i,k_i}$ の係数は $b_i$、$w_{i,k_i-1}$ の係数は $a_{i,k_i}$、以下順に $w_{i,1}$ の係数は $a_{i,2}$ です。他の鎖の基底ベクトルとは重ならないので、基底の一次独立性から
$$
b_i=0,
\qquad
a_{i,j}=0\quad(j\ge2)
$$
を得ます。

元の関係式は
$$
\sum_i a_{i,1}w_{i,1}
+\sum_\ell c_\ell z_\ell=0
$$
まで簡約されます。しかし
$$
w_{1,1},\dots,w_{c,1},z_1,\dots,z_r
$$
は $\ker N$ の基底なので、残りの係数も全て0です。よって $\mathcal B$ は一次独立です。

次に本数を数えます。$\{w_{i,j}\}$ は $W$ の基底なのでその本数は $\dim W$。また鎖の本数 $c$ は
$$
c=\dim(W\cap\ker N).
$$
そして $z_1,\dots,z_r$ を加えて $\ker N$ の基底にしたので
$$
r=\dim\ker N-c.
$$
したがって $\mathcal B$ の本数は
$$
\dim W+c+r
=\dim W+\dim\ker N.
$$
ここで $W=\operatorname{Im}N$ なので、[rank-nullity theorem](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)から
$$
\dim W+\dim\ker N
=\dim\operatorname{Im}N+\dim\ker N
=\dim V.
$$
一次独立な $\dim V$ 本のベクトルなので $\mathcal B$ は $V$ の基底です。しかも構成上、全てJordan鎖を並べたものです。これで冪零作用素にJordan鎖基底が存在することが示されました。

各Jordan鎖
$$
v_1,\dots,v_k
$$
上では
$$
Nv_1=0,
\qquad
Nv_j=v_{j-1}
$$
なので
$$
Tv_1=\lambda v_1,
\qquad
Tv_j=v_{j-1}+\lambda v_j.
$$
したがってその鎖に対応する表現行列は $J_k(\lambda)$ です。各一般化固有空間のJordan鎖基底を合わせれば、$T$ の行列はJordanブロックの直和になります。

#### ブロックサイズの一意性

最後にブロックサイズが基底の選び方に依存しないことを示します。固定した固有値 $\lambda$ について $N=T-\lambda I$ とし、Jordanブロックのサイズを
$$
k_1,\dots,k_c
$$
とします。1個の冪零Jordanブロック $J_{k_i}(0)$ では、鎖基底 $v_1,\dots,v_{k_i}$ に対して
$$
N^jv_\ell=
\begin{cases}
0,&\ell\le j,\\
v_{\ell-j},&\ell>j
\end{cases}
$$
となります。従って、そのブロックの $\ker N^j$ は
$$
v_1,\dots,v_{\min(j,k_i)}
$$
で張られ、次元は $\min(j,k_i)$ です。ブロック直和では核の次元も各ブロックの核の次元の和になるため
$$
\dim\ker N^j
=\sum_{i=1}^c\min(j,k_i).
$$
よって差
$$
d_j
=
\dim\ker N^j-\dim\ker N^{j-1}
$$
を取ると、各ブロック $i$ からの寄与は
$$
\min(j,k_i)-\min(j-1,k_i)
=
\begin{cases}
1,&k_i\ge j,\\
0,&k_i<j.
\end{cases}
$$
従って
$$
d_j
=\#\{i:k_i\ge j\},
$$
すなわち「長さ $j$ 以上のJordanブロックの個数」です。したがって長さがちょうど $j$ のブロック数は
$$
d_j-d_{j+1}
$$
で復元できます。

$\dim\ker N^j$ は作用素 $N$ 自身から決まり、基底に依存しません。よって全てのブロックサイズの個数も一意に決まります。ブロックの並べ順だけが自由です。$\square$
<!-- proof-end -->

#### 最小多項式の指数と最大Jordanブロックサイズ

ここまででJordanブロックの存在と一意性は示せました。次に、後で使う
$$
\text{「最小多項式中の }(t-\lambda)\text{ の指数」}
=
\text{「固有値 }\lambda\text{ の最大Jordanブロックサイズ」}
$$
を式から確認します。

まず1個のJordanブロック $J_k(\lambda)$ を考え、
$$
N=J_k(\lambda)-\lambda I
$$
と置きます。Jordan鎖基底を $v_1,\dots,v_k$ とすると
$$
Nv_1=0,
\qquad
Nv_j=v_{j-1}\quad(j=2,\dots,k).
$$
従って
$$
N^kv_j=0\qquad(j=1,\dots,k)
$$
なので $N^k=0$、すなわち
$$
(J_k(\lambda)-\lambda I)^k=0.
$$
一方、鎖の最上段 $v_k$ に作用させると
$$
N^{k-1}v_k=v_1\ne0
$$
なので $N^{k-1}\ne0$ です。したがって $(t-\lambda)^k$ はこのブロックを消しますが、$(t-\lambda)^{k-1}$ では消せません。

ここで「別の形の低次数多項式なら消せるかもしれない」という可能性も潰します。$p(J_k(\lambda))=0$ を満たす任意の多項式 $p$ を、$(t-\lambda)^k$ で割って
$$
p(t)=q(t)(t-\lambda)^k+r(t),
\qquad
\deg r<k
$$
と書きます。すでに $(J_k(\lambda)-\lambda I)^k=0$ なので
$$
0=p(J_k(\lambda))=r(J_k(\lambda)).
$$
$\deg r<k$ だから、$t-\lambda$ の冪を基底にして
$$
r(t)=a_0+a_1(t-\lambda)+\cdots+a_{k-1}(t-\lambda)^{k-1}
$$
と一意に書けます。これを $v_k$ に作用させると
$$
\begin{aligned}
0=r(J_k(\lambda))v_k
&=a_0v_k+a_1Nv_k+\cdots+a_{k-1}N^{k-1}v_k\\
&=a_0v_k+a_1v_{k-1}+\cdots+a_{k-1}v_1.
\end{aligned}
$$
$v_1,\dots,v_k$ は基底なので一次独立です。従って
$$
a_0=a_1=\cdots=a_{k-1}=0,
$$
すなわち $r=0$。よって、このブロックを消す任意の多項式は $(t-\lambda)^k$ で割り切れます。したがって
$$
m_{J_k(\lambda)}(t)=(t-\lambda)^k.
$$

次にJordanブロックの直和
$$
T=J_{k_1}(\lambda_1)\oplus\cdots\oplus J_{k_m}(\lambda_m)
$$
を考えます。作用素多項式もブロックごとに作用するので
$$
p(T)=0
$$
であることと、全ての $i$ について
$$
p(J_{k_i}(\lambda_i))=0
$$
であることは同値です。従って $T$ の最小多項式は、各ブロックの最小多項式の最小公倍多項式です。

固定した固有値 $\lambda$ に属するブロックサイズを $k_1,\dots,k_c$ とすれば、その部分の最小公倍多項式は
$$
\operatorname{lcm}\bigl((t-\lambda)^{k_1},\dots,(t-\lambda)^{k_c}\bigr)
=(t-\lambda)^{\max_i k_i}.
$$
従って、最小多項式中の $(t-\lambda)$ の指数は、固有値 $\lambda$ に対応する最大Jordanブロックのサイズそのものです。

### ブロックサイズから何が読めるか

固有値 $\lambda$ に対し

- Jordanブロックの個数 = $\dim\ker(T-\lambda I)$
- 最大ブロックサイズ = 最小多項式中の $(t-\lambda)$ の指数
- ブロックサイズ総和 = $G_\lambda$ の次元

です。

さらに
$$
\dim\ker(T-\lambda I)^j
-
\dim\ker(T-\lambda I)^{j-1}
$$
は「サイズ $j$ 以上のJordanブロックの個数」です。したがって核の次元列を追えば、Jordanブロックの形を段階的に復元できます。

対角化可能とは、全てのJordanブロックが $1\times1$ であることに他なりません。

---

## 8. 演習

### Level A

<a id="ex-la4-a01"></a>
#### LA4-A01 作用素多項式
- Level: A

$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ について $(A-I)^2$ を求めよ。

<!-- solution-start -->
**解答**：
$$
A-I=\begin{pmatrix}0&1\\0&0\end{pmatrix},
\qquad
(A-I)^2=0.
$$
<!-- solution-end -->

<a id="ex-la4-a02"></a>
#### LA4-A02 最小多項式
- Level: A

A01の行列の特性多項式と最小多項式を求めよ。

<!-- solution-start -->
**解答**：
$$
\chi_A(t)=\det\begin{pmatrix}t-1&-1\\0&t-1\end{pmatrix}=(t-1)^2.
$$
また
$$
A-I=\begin{pmatrix}0&1\\0&0\end{pmatrix}\ne0,
\qquad
(A-I)^2=0.
$$
したがって次数1では消えず次数2で消えるので
$$
m_A(t)=(t-1)^2.
$$
<!-- solution-end -->

<a id="ex-la4-a03"></a>
#### LA4-A03 対角化判定
- Level: A

最小多項式が $(t-1)(t+2)$ の作用素は対角化可能か。

<!-- solution-start -->
**解答**：$(t-1)$ と $(t+2)$ は相異なる一次因子で重複がありません。[最小多項式による対角化判定](#thm-la4-diagonalizable-criterion)から対角化可能です。
<!-- solution-end -->

<a id="ex-la4-a04"></a>
#### LA4-A04 Jordan鎖
- Level: A

$J_3(0)$ に対し標準基底 $e_1,e_2,e_3$ がJordan鎖になることを確認せよ。

<!-- solution-start -->
**解答**：
$$
J_3(0)=
\begin{pmatrix}
0&1&0\\
0&0&1\\
0&0&0
\end{pmatrix}
$$
なので
$$
J_3(0)e_1=0,
\qquad
J_3(0)e_2=e_1,
\qquad
J_3(0)e_3=e_2.
$$
Jordan鎖の定義を順に満たすため $(e_1,e_2,e_3)$ は長さ3のJordan鎖です。
<!-- solution-end -->

### Level B

<a id="ex-la4-b01"></a>
#### LA4-B01 最小多項式からJordanブロックを読む
- Level: B

4次元複素空間上の作用素 $T$ が特性多項式 $(t-2)^4$、最小多項式 $(t-2)^3$ を持つとする。可能なJordanブロックサイズを求めよ。

<!-- solution-start -->
**解答**：特性多項式の次数から、固有値2に属するJordanブロックのサイズ総和は4です。最小多項式中の $(t-2)$ の指数3は最大ブロックサイズが3であることを意味します。したがってサイズ3のブロックを少なくとも1個含み、残りの次元は1。よって分割は
$$
4=3+1
$$
のみで、Jordan形は
$$
J_3(2)\oplus J_1(2).
$$
<!-- solution-end -->

<a id="ex-la4-b02"></a>
#### LA4-B02 核の次元からJordan形を読む
- Level: B

冪零作用素 $N$ on $\mathbb C^5$ が
$$
\dim\ker N=2,
\quad
\dim\ker N^2=4,
\quad
\dim\ker N^3=5
$$
を満たす。Jordanブロックサイズを求めよ。

<!-- solution-start -->
**解答**：
$$
d_1=\dim\ker N=2
$$
なのでブロックは2個です。さらに
$$
d_2=\dim\ker N^2-\dim\ker N=4-2=2
$$
なので長さ2以上のブロックも2個、
$$
d_3=\dim\ker N^3-\dim\ker N^2=5-4=1
$$
なので長さ3以上は1個です。従って一方は長さ3以上、もう一方は長さ2以上です。全次元が5なのでサイズは3と2です。
<!-- solution-end -->

<a id="ex-la4-b03"></a>
#### LA4-B03 Cayley–Hamiltonで高冪を落とす
- Level: B

$2\times2$ 行列 $A$ の特性多項式が $t^2-3t+2$ であるとする。$A^4$ を $I,A$ の線形結合へ簡約せよ。

<!-- solution-start -->
**解答**：[Cayley–Hamilton定理](#thm-la4-cayley-hamilton)から
$$
A^2-3A+2I=0,
$$
したがって
$$
A^2=3A-2I.
$$
これを順に使うと
$$
A^3=A(3A-2I)=3A^2-2A
=3(3A-2I)-2A
=7A-6I,
$$
$$
A^4=A(7A-6I)=7A^2-6A
=7(3A-2I)-6A
=15A-14I.
$$
<!-- solution-end -->

### Level C

<a id="ex-la4-c01"></a>
#### LA4-C01 CRT型射影を作る
- Level: C

$m_T(t)=(t-\lambda)^r(t-\mu)^s$、$\lambda\ne\mu$ とする。多項式 $a,b$ が
$$
a(t)(t-\lambda)^r+b(t)(t-\mu)^s=1
$$
を満たすとき
$$
P_\lambda=b(T)(T-\mu I)^s,
\qquad
P_\mu=a(T)(T-\lambda I)^r
$$
が $V=G_\lambda\oplus G_\mu$ の射影になることを示せ。

<!-- solution-start -->
**解答**：Bézout式に $T$ を代入すると
$$
P_\mu+P_\lambda=I.
$$
また
$$
(T-\lambda I)^rP_\lambda
=b(T)(T-\lambda I)^r(T-\mu I)^s
=b(T)m_T(T)=0,
$$
したがって
$$
\operatorname{Im}P_\lambda\subset G_\lambda.
$$
同様に
$$
\operatorname{Im}P_\mu\subset G_\mu.
$$

$v\in G_\lambda$ なら、この章で示した $G_\lambda=\ker(T-\lambda I)^r$ から
$$
(T-\lambda I)^rv=0
$$
なので
$$
P_\mu v=a(T)(T-\lambda I)^rv=0.
$$
さらに $P_\lambda+P_\mu=I$ から
$$
P_\lambda v=v.
$$
同様に $v\in G_\mu$ なら $P_\lambda v=0$, $P_\mu v=v$。よって $P_\lambda,P_\mu$ はそれぞれ対応する直和成分への射影です。
<!-- solution-end -->

---

## 9. 次に進む

一般の作用素の代数的構造をJordan形まで記述できました。次は複素ベクトル空間に幾何を入れ、**複素内積・共役転置・随伴・Hermitian・unitary・normal operator** を統一します。
