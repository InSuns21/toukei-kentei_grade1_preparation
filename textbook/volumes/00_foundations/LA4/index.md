# LA4 標準線形代数 IV：作用素多項式・最小多項式・Jordan構造

[F0-00F](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) では固有値・固有空間・対角化を扱いました。しかし「対角化できない」で終わると、一般の線形自己写像の構造はまだ見えていません。

この章では自己写像 $T$ に多項式を代入し、**最小多項式が作用素の構造を圧縮して記録する**ことから、一般化固有空間とJordan標準形まで進みます。スカラー体は特に断らない限り $\mathbb F=\mathbb R$ または $\mathbb C$ とします。

LA3B–LA3Cでは通常の $n\times n$ 行列式をスカラー行列について構成しました。本章では特性多項式の成分が $\mathbb F[t]$ に入るため、$\det(tI-A)$ を記号的に流用せず、**多項式行列の行列式をLeibniz公式から改めて構成してから** Cayley–Hamiltonへ進みます。

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
**定義の確認**：$p(t)=t^2-3t+2$ なら
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

多項式
$$
p(t)=\sum_{i=0}^ra_it^i,
\qquad
q(t)=\sum_{j=0}^sb_jt^j
$$
に対して
$$
p(T)q(T)
=\sum_{i,j}a_ib_jT^{i+j}
=(pq)(T).
$$
従って
$$
(pq)(T)=p(T)q(T)=q(T)p(T).
$$
同じ作用素 $T$ の多項式同士は可換です。後でBézout等式を $t=T$ に代入するとき、この可換性を使います。

---

## 2. 特性多項式を定義するための多項式代数

### 2.1 多項式の除法

<a id="lem-la4-polynomial-division"></a>
<!-- formal-statement-start -->
> **補題（多項式の除法）**  
> $f,g\in\mathbb F[t]$、$g\ne0$ とする。このとき一意な多項式 $q,r$ が存在して
$$
f=qg+r,
\qquad
r=0\ \text{または}\ \deg r<\deg g
$$
> と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず存在を $\deg f$ に関して示します。$f=0$ または $\deg f<\deg g$ なら
$$
q=0,
\qquad
r=f
$$
でよいです。

$\deg f=m\ge n=\deg g$ とします。最高次係数をそれぞれ $a,b$ とすると $b\ne0$ で、体なので $a/b$ が存在します。
$$
f_1(t)
=f(t)-\frac{a}{b}t^{m-n}g(t)
$$
と置けば最高次項が相殺され
$$
\deg f_1<m.
$$
帰納法の仮定により
$$
f_1=q_1g+r,
\qquad
\deg r<\deg g
$$
と書けます。従って
$$
f
=\left(q_1+\frac{a}{b}t^{m-n}\right)g+r.
$$
これで存在が示されました。

一意性を示します。
$$
f=qg+r=q'g+r',
\qquad
\deg r,\deg r'<\deg g
$$
とします。差を取ると
$$
(q-q')g=r'-r.
$$
もし $q-q'\ne0$ なら左辺の次数は少なくとも $\deg g$ ですが、右辺は0でない限り次数が $\deg g$ 未満です。矛盾なので $q=q'$、従って $r=r'$ です。$\square$
<!-- proof-end -->

<a id="lem-la4-polynomial-root-bound"></a>
<!-- formal-statement-start -->
> **補題（非零多項式の根の個数）**  
> 0でない次数 $d$ の多項式は、$\mathbb F$ の中に高々 $d$ 個しか相異なる根を持たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$d$ に関する帰納法で示します。$d=0$ の非零定数多項式には根がありません。

$d\ge1$ とし、$p$ が根 $a$ を持つとします。[多項式の除法](#lem-la4-polynomial-division)で $t-a$ により割ると
$$
p(t)=(t-a)q(t)+r
$$
と書け、余り $r$ は定数です。$t=a$ を代入して
$$
0=p(a)=r,
$$
従って
$$
p(t)=(t-a)q(t),
\qquad
\deg q=d-1.
$$
$a$ と異なる根 $b$ があれば
$$
0=p(b)=(b-a)q(b).
$$
$b-a\ne0$ であり体では割れるので $q(b)=0$ です。従って $a$ 以外の根は全て $q$ の根です。帰納法の仮定からその個数は高々 $d-1$、$a$ を加えても高々 $d$ 個です。$\square$
<!-- proof-end -->

この補題から、次数高々 $d$ の二つの多項式が $d+1$ 個以上の相異なる点で一致すれば、それらの差は恒等的に0だと分かります。

### 2.2 多項式行列の行列式

<a id="def-la4-polynomial-matrix-determinant"></a>
<!-- formal-statement-start -->
> **定義（多項式行列の行列式）**  
> 多項式行列
$$
M(t)=(m_{ij}(t))\in\mathbb F[t]^{n\times n}
$$
> に対して
$$
\det M(t)
=
\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^n m_{\sigma(j),j}(t)
$$
> と定める。
<!-- formal-statement-end -->

右辺は $\mathbb F[t]$ の元の有限和・有限積なので、確かに一つの多項式です。ここではLA3B–LA3Cのスカラー行列式の性質を「多項式でも同じ」と仮定していません。Leibniz公式そのものを $\mathbb F[t]$ 上で定義に採用しています。

<!-- definition-example-start: def-la4-polynomial-matrix-determinant -->
**定義の確認**：
$$
M(t)=
\begin{pmatrix}
t-a&b\\
c&t-d
\end{pmatrix}
$$
なら $S_2$ の二つの置換から
$$
\det M(t)
=(t-a)(t-d)-bc.
$$
<!-- definition-example-end -->

<a id="lem-la4-polynomial-det-evaluation"></a>
<!-- formal-statement-start -->
> **補題（多項式行列式とスカラー代入）**  
> $s\in\mathbb F$ とし、各成分に $t=s$ を代入した通常のスカラー行列を $M(s)$ と書く。このとき
$$
\left.\det M(t)\right|_{t=s}
=\det M(s).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定義へ $t=s$ を代入すると
$$
\begin{aligned}
\left.\det M(t)\right|_{t=s}
&=
\sum_{\sigma\in S_n}
\operatorname{sgn}(\sigma)
\prod_{j=1}^n m_{\sigma(j),j}(s)\\
&=\det M(s).
\end{aligned}
$$
最後の式はLA3Bで定義した通常の行列式のLeibniz公式です。$\square$
<!-- proof-end -->

<a id="lem-la4-polynomial-laplace"></a>
<!-- formal-statement-start -->
> **補題（多項式行列のLaplace展開）**  
> $M(t)\in\mathbb F[t]^{n\times n}$ とする。行 $i$ と列 $j$ を除いた小行列を $M_{ij}(t)$、余因子を
$$
C_{ij}(t)=(-1)^{i+j}\det M_{ij}(t)
$$
> と置く。このとき固定した行 $i$ について
$$
\det M(t)
=\sum_{j=1}^n m_{ij}(t)C_{ij}(t).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Leibniz和を、固定した行 $i$ がどの列から選ばれるかで分けます。
$$
\det M(t)
=
\sum_{j=1}^n
\sum_{\sigma:\sigma(j)=i}
\operatorname{sgn}(\sigma)
\prod_{k=1}^n m_{\sigma(k),k}(t).
$$
固定した $j$ の内側では $m_{ij}(t)$ をくくれます。行 $i$ と列 $j$ を削除し、残った添字を昇順に詰めると $S_{n-1}$ の置換 $\bar\sigma$ が得られます。

行 $i$ を端まで動かす交換回数と列 $j$ を端まで動かす交換回数の和の偶奇から
$$
\operatorname{sgn}(\sigma)
=(-1)^{i+j}\operatorname{sgn}(\bar\sigma).
$$
従って固定した $j$ の内側の和は
$$
\begin{aligned}
&m_{ij}(t)(-1)^{i+j}
\sum_{\bar\sigma\in S_{n-1}}
\operatorname{sgn}(\bar\sigma)
\prod m_{\bar\sigma(\cdot),\cdot}(t)\\
&\qquad
=m_{ij}(t)(-1)^{i+j}\det M_{ij}(t)
=m_{ij}(t)C_{ij}(t).
\end{aligned}
$$
$j$ について足せば主張を得ます。$\square$
<!-- proof-end -->

<a id="lem-la4-adjugate-identity"></a>
<!-- formal-statement-start -->
> **補題（多項式行列の余因子行列の恒等式）**  
> $M(t)\in\mathbb F[t]^{n\times n}$ に対して
$$
\operatorname{adj}(M(t))_{kj}=C_{jk}(t)
$$
> と定める。このとき
$$
M(t)\operatorname{adj}(M(t))
=\det(M(t))I.
$$
> $n=1$ の場合は $0\times0$ 小行列の行列式を1とする。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積の $(i,j)$ 成分は
$$
\bigl(M\operatorname{adj}(M)\bigr)_{ij}
=\sum_{k=1}^n m_{ik}(t)C_{jk}(t).
$$
$i=j$ なら[多項式行列のLaplace展開](#lem-la4-polynomial-laplace)から
$$
\sum_{k=1}^n m_{jk}(t)C_{jk}(t)
=\det M(t).
$$

$i\ne j$ とします。$M(t)$ の第 $j$ 行を第 $i$ 行で置き換えた行列を $N(t)$ とします。第 $j$ 行を削除した小行列は元の $M(t)$ と同じなので、第 $j$ 行の余因子は $C_{jk}(t)$ のままです。従って[多項式行列のLaplace展開](#lem-la4-polynomial-laplace)を第 $j$ 行へ適用すると
$$
\det N(t)
=\sum_{k=1}^n m_{ik}(t)C_{jk}(t).
$$
$N(t)$ には等しい二行があります。Leibniz和で置換 $\sigma$ の項と、行の値 $i,j$ を入れ替えた置換 $(i\ j)\circ\sigma$ の項を対にします。等しい二行なので二つの積は同じですが、互換を一回合成したため符号は反対です。固定点のない対が全て相殺し
$$
\det N(t)=0.
$$
従って積の非対角成分は0、対角成分は $\det M(t)$ であり、主張が従います。$\square$
<!-- proof-end -->

---

## 3. 特性多項式と最小多項式

<a id="def-la4-characteristic-polynomial"></a>
<!-- formal-statement-start -->
> **定義（特性多項式）**  
> $V$ を $n$ 次元、$T:V\to V$ を線形自己写像とする。基底 $\mathcal B$ を一つ選び、表現行列を
$$
A=[T]_{\mathcal B}
$$
> とする。このとき多項式行列の行列式として
$$
\chi_{T,\mathcal B}(t)=\det(tI-A)
$$
> と置く。次の定理で基底に依存しないことを示した後は $\chi_T(t)$ と書く。
<!-- formal-statement-end -->

<a id="thm-la4-characteristic-basis-independent"></a>
<!-- formal-statement-start -->
> **定理（特性多項式の基底不変性）**  
> 二つの基底 $\mathcal B,\mathcal C$ に対して
$$
\chi_{T,\mathcal B}(t)
=\chi_{T,\mathcal C}(t).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A=[T]_{\mathcal B}$、$B=[T]_{\mathcal C}$ とします。ある可逆行列 $P$ により
$$
B=P^{-1}AP.
$$
任意の $s\in\mathbb F$ に対して
$$
sI-B=P^{-1}(sI-A)P.
$$
ここでは $s$ はスカラーなので両辺は通常のスカラー行列です。[行列式の相似不変性](../LA3C/index.md#thm-la3c-det-similarity-invariant)から
$$
\det(sI-B)=\det(sI-A).
$$
[多項式行列式とスカラー代入](#lem-la4-polynomial-det-evaluation)により
$$
\chi_{T,\mathcal C}(s)=\det(sI-B),
\qquad
\chi_{T,\mathcal B}(s)=\det(sI-A).
$$
従って差
$$
h(t)=\chi_{T,\mathcal B}(t)-\chi_{T,\mathcal C}(t)
$$
は全ての $s\in\mathbb F$ で0になります。

$\mathbb R,\mathbb C$ は無限体です。もし $h\ne0$ なら[非零多項式の根の個数](#lem-la4-polynomial-root-bound)に反して無限個の根を持つことになります。従って $h=0$ で、特性多項式は基底に依存しません。$\square$
<!-- proof-end -->

<a id="thm-la4-characteristic-monic"></a>
<!-- formal-statement-start -->
> **定理（特性多項式は首一 $n$ 次）**  
> $\dim V=n$ なら
$$
\chi_T(t)
=t^n+c_{n-1}t^{n-1}+\cdots+c_1t+c_0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

基底を選び $A=(a_{ij})$ とします。Leibniz公式で恒等置換に対応する項は
$$
\prod_{j=1}^n(t-a_{jj}),
$$
その最高次項は係数1の $t^n$ です。

一方 $\sigma\ne\mathrm{id}$ なら、ある列 $j$ で $\sigma(j)\ne j$ です。その列から選ばれる成分は
$$
(tI-A)_{\sigma(j),j}
=-a_{\sigma(j),j},
$$
したがって少なくとも一因子が $t$ を含みません。その置換の積の次数は高々 $n-1$ です。よって $t^n$ を生むのは恒等置換だけで、$\chi_T$ は首一 $n$ 次です。$\square$
<!-- proof-end -->

<a id="thm-la4-eigenvalue-characteristic-root"></a>
<!-- formal-statement-start -->
> **定理（固有値と特性多項式の根）**  
> $\lambda\in\mathbb F$ に対して
$$
\lambda\text{ が }T\text{ の固有値}
\iff
\chi_T(\lambda)=0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

基底を選び $A=[T]_{\mathcal B}$ とします。
$$
\lambda\text{ が固有値}
\iff
\ker(T-\lambda I)\ne\{0\}.
$$
有限次元の自己写像では[rank-nullity theorem](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)により、非単射であることと不可逆であることは同値です。従って
$$
\lambda\text{ が固有値}
\iff
A-\lambda I\text{ が不可逆}.
$$
[行列式による可逆性判定](../LA3C/index.md#thm-la3c-det-invertible)から
$$
A-\lambda I\text{ が不可逆}
\iff
\det(A-\lambda I)=0.
$$
各列から $-1$ をくくると
$$
\det(A-\lambda I)
=(-1)^n\det(\lambda I-A).
$$
従って0になる条件は
$$
\det(\lambda I-A)=0
$$
と同じです。[多項式行列式とスカラー代入](#lem-la4-polynomial-det-evaluation)から
$$
\det(\lambda I-A)=\chi_T(\lambda),
$$
よって結論を得ます。$\square$
<!-- proof-end -->

<a id="ref-la4-fta-boundary"></a>
### 外部証明境界：FTA

> **証明境界**  
> 「複素係数の非定数多項式は複素数の根を持ち、従って一次因子の積へ分解できる」という事実は**代数学の基本定理**です。本章ではこの定理そのものは証明しません。以後「複素数上では特性多項式が一次因子へ分解する」と使う箇所は、ここで明示した外部事実を使用しています。分解が得られた後の一般化固有空間・Jordan構造は本章内の論証で閉じます。

<a id="def-la4-minimal-polynomial"></a>
<!-- formal-statement-start -->
> **定義（最小多項式）**  
> $T$ に対して
$$
p(T)=0
$$
> を満たす0でない多項式のうち、次数最小の首一多項式を $T$ の最小多項式といい $m_T(t)$ と書く。
<!-- formal-statement-end -->

有限次元では、この定義に必要な消去多項式が必ず存在します。$\dim V=n$ とすると線形自己写像全体 $\operatorname{End}(V)$ の次元は $n^2$ です。従って $n^2+1$ 個の自己写像
$$
I,T,T^2,\dots,T^{n^2}
$$
は一次従属で、すべてが0ではない係数 $a_0,\dots,a_{n^2}$ が存在して
$$
a_0I+a_1T+\cdots+a_{n^2}T^{n^2}=0.
$$
従って
$$
p(t)=a_0+a_1t+\cdots+a_{n^2}t^{n^2}
$$
は $p(T)=0$ を満たします。最高次係数で割れば首一にできるので、次数最小のものを選べます。

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
\chi_A(t)=(t-2)^2.
$$
一方
$$
A-2I=\begin{pmatrix}0&1\\0&0\end{pmatrix}\ne0,
\qquad
(A-2I)^2=0.
$$
従って
$$
m_A(t)=(t-2)^2.
$$
$A=2I$ なら $A-2I=0$ なので、特性多項式は同じ $(t-2)^2$ でも最小多項式は $t-2$ です。
<!-- definition-example-end -->

<a id="lem-la4-minimal-divides-annihilator"></a>
<!-- formal-statement-start -->
> **補題（最小多項式は消去多項式を割る）**  
> $p(T)=0$ なら
$$
m_T\mid p.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[多項式の除法](#lem-la4-polynomial-division)で
$$
p=qm_T+r,
\qquad
r=0\ \text{または}\ \deg r<\deg m_T
$$
と書きます。$t=T$ を代入すると
$$
0=p(T)=q(T)m_T(T)+r(T)=r(T).
$$
もし $r\ne0$ なら最高次係数で割って首一にすれば、$m_T$ より低次数の消去多項式が得られ、最小性に反します。従って $r=0$ で $m_T\mid p$ です。$\square$
<!-- proof-end -->

---

## 4. Cayley–Hamilton定理

証明の危険箇所は、$t$ を行列 $A$ に直接「代入」することです。$tI-A$ の成分は多項式であり、行列同士は一般に可換しません。そこで、まず $\mathbb F[t]$ 上の[多項式行列の余因子行列の恒等式](#lem-la4-adjugate-identity)から**係数ごとの定数行列等式**を取り出し、その後で $A$ の冪を掛けて相殺します。

<a id="thm-la4-cayley-hamilton"></a>
<!-- formal-statement-start -->
> **定理（Cayley–Hamilton定理）**  
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

基底を選び $T$ の表現行列を $A$ とします。[特性多項式は首一 $n$ 次](#thm-la4-characteristic-monic)なので
$$
\chi_A(t)
=t^n+c_{n-1}t^{n-1}+\cdots+c_1t+c_0.
$$

直前に $\mathbb F[t]$ 上で証明した[多項式行列の余因子行列の恒等式](#lem-la4-adjugate-identity)を
$$
M(t)=tI-A
$$
へ適用すると
$$
(tI-A)\operatorname{adj}(tI-A)
=\det(tI-A)I
=\chi_A(t)I.
$$
$\operatorname{adj}(tI-A)$ の各成分は $(n-1)\times(n-1)$ 小行列の行列式です。各因子の次数は高々1なので、[多項式行列の行列式](#def-la4-polynomial-matrix-determinant)の定義式から各成分の次数は高々 $n-1$ です。従って定数行列 $B_0,\dots,B_{n-1}$ が存在して
$$
\operatorname{adj}(tI-A)
=B_0+B_1t+\cdots+B_{n-1}t^{n-1}
$$
と書けます。

左辺を展開すると
$$
\begin{aligned}
(tI-A)\operatorname{adj}(tI-A)
&=t\sum_{k=0}^{n-1}B_kt^k
-A\sum_{k=0}^{n-1}B_kt^k\\
&=\sum_{k=0}^{n-1}B_kt^{k+1}
-\sum_{k=0}^{n-1}AB_kt^k.
\end{aligned}
$$
これと
$$
\chi_A(t)I
=t^nI+c_{n-1}t^{n-1}I+\cdots+c_1tI+c_0I
$$
の係数を比較すると
$$
B_{n-1}=I,
$$
$$
B_{k-1}-AB_k=c_kI
\qquad(k=1,\dots,n-1),
$$
$$
-AB_0=c_0I.
$$

中央の等式へ左から $A^k$ を掛けると
$$
A^kB_{k-1}-A^{k+1}B_k=c_kA^k.
$$
これを $k=1,\dots,n-1$ について足し、定数項の等式も加えます。左辺は
$$
\begin{aligned}
&-AB_0
+(AB_0-A^2B_1)
+(A^2B_1-A^3B_2)\\
&\quad+\cdots
+(A^{n-1}B_{n-2}-A^nB_{n-1}).
\end{aligned}
$$
中間項は一つずつ相殺され、$B_{n-1}=I$ なので
$$
-A^n
$$
だけが残ります。右辺は
$$
c_0I+c_1A+\cdots+c_{n-1}A^{n-1}.
$$
従って
$$
A^n+c_{n-1}A^{n-1}+\cdots+c_1A+c_0I=0,
$$
すなわち
$$
\chi_A(A)=0.
$$
表現行列での多項式等式は元の作用素でも成り立つので
$$
\chi_T(T)=0.
$$
最後に[最小多項式は消去多項式を割る](#lem-la4-minimal-divides-annihilator)から
$$
m_T\mid\chi_T.
$$
$\square$
<!-- proof-end -->

これにより、$n$ 次元空間上の作用素は必ず次数 $n$ の特性多項式という非自明な多項式関係を満たします。

---

## 5. 最小多項式で対角化を判定する

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

まず $T$ が対角化可能だとします。固有基底を取り、現れる相異なる固有値を $\lambda_1,\dots,\lambda_r$ とします。
$$
p(t)=\prod_{j=1}^r(t-\lambda_j)
$$
と置きます。固有ベクトル $v$ が固有値 $\lambda_i$ に属するとき
$$
p(T)v=p(\lambda_i)v=0.
$$
固有基底の全てを0にするので $p(T)=0$ です。[最小多項式は消去多項式を割る](#lem-la4-minimal-divides-annihilator)から
$$
m_T\mid p.
$$
そこで
$$
p=m_Tq,
\qquad
d=\deg m_T
$$
と書きます。$p$ は $r$ 次なので $\deg q=r-d$ です。各 $\lambda_j$ について
$$
0=p(\lambda_j)=m_T(\lambda_j)q(\lambda_j).
$$
従って各 $\lambda_j$ は $m_T$ または $q$ の少なくとも一方の根です。[非零多項式の根の個数](#lem-la4-polynomial-root-bound)から $q$ の相異なる根は高々 $r-d$ 個なので、$r$ 個の $\lambda_j$ のうち少なくとも $d$ 個は $m_T$ の根です。一方、$m_T$ の次数は $d$ なので相異なる根は高々 $d$ 個です。従って $m_T$ はちょうど $d$ 個の相異なる $\lambda_j$ を根に持ちます。

それらを $\lambda_{j_1},\dots,\lambda_{j_d}$ とします。[多項式の除法](#lem-la4-polynomial-division)を根ごとに繰り返すと
$$
\prod_{a=1}^d(t-\lambda_{j_a})\mid m_T(t).
$$
左辺も $m_T$ も首一 $d$ 次なので、商は首一0次、すなわち1です。よって
$$
m_T(t)=\prod_{a=1}^d(t-\lambda_{j_a}),
$$
相異なる一次因子の積になっています。

逆に
$$
m_T(t)=\prod_{j=1}^r(t-\lambda_j)
$$
と相異なる一次因子へ分解するとします。各 $j$ についてLagrange多項式
$$
e_j(t)
=
\prod_{k\ne j}
\frac{t-\lambda_k}{\lambda_j-\lambda_k}
$$
を定めます。分母は $\lambda_j\ne\lambda_k$ なので0ではありません。定義から
$$
e_j(\lambda_i)
=\begin{cases}
1,&i=j,\\
0,&i\ne j.
\end{cases}
$$
多項式
$$
h(t)=1-\sum_{j=1}^re_j(t)
$$
は次数高々 $r-1$ で、相異なる $r$ 点 $\lambda_1,\dots,\lambda_r$ で0です。[非零多項式の根の個数](#lem-la4-polynomial-root-bound)から
$$
h(t)=0,
$$
従って
$$
1=\sum_{j=1}^re_j(t).
$$
$t=T$ を代入すると
$$
I=\sum_{j=1}^re_j(T).
$$
従って任意の $v\in V$ は
$$
v=\sum_{j=1}^re_j(T)v
$$
と分解されます。

各成分について
$$
(t-\lambda_j)e_j(t)
=
\frac{m_T(t)}{\prod_{k\ne j}(\lambda_j-\lambda_k)}.
$$
よって
$$
(T-\lambda_jI)e_j(T)
=0,
$$
すなわち
$$
e_j(T)v\in\ker(T-\lambda_jI).
$$
従って $V$ は固有空間の和です。

直和性も確認します。$v_j\in\ker(T-\lambda_jI)$ が
$$
v_1+\cdots+v_r=0
$$
を満たすとします。固有ベクトル上では
$$
e_i(T)v_j=e_i(\lambda_j)v_j=\delta_{ij}v_j.
$$
元の等式へ $e_i(T)$ を作用させると $v_i=0$。全ての $i$ について成り立つので和は直和です。各固有空間の基底を合わせれば固有基底になり、$T$ は対角化可能です。$\square$
<!-- proof-end -->

対角化不能の代数的原因は、最小多項式に
$$
(t-\lambda)^2,
(t-\lambda)^3,\dots
$$
のような重複因子が必要になることです。

---

## 6. 一般化固有空間とBézout分解

<a id="def-la4-generalized-eigenspace"></a>
<!-- formal-statement-start -->
> **定義（一般化固有空間）**  
> 固有値 $\lambda$ に対して
$$
G_\lambda
=\ker(T-\lambda I)^N
$$
> を、$N$ を十分大きく取ったときの一般化固有空間という。
<!-- formal-statement-end -->

「十分大きい」が意味を持つことを示します。$S=T-\lambda I$、
$$
K_j=\ker S^j
$$
と置くと
$$
K_1\subset K_2\subset\cdots.
$$
$\dim V=n$ なので $\dim K_j\le n$、従ってどこかで
$$
K_j=K_{j+1}
$$
となります。一度等しくなれば、$x\in K_{j+2}$ に対して
$$
Sx\in K_{j+1}=K_j
$$
だから $S^{j+1}x=0$、従って $x\in K_{j+1}$ です。よって
$$
K_{j+2}=K_{j+1},
$$
同じ議論で以後ずっと安定します。

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
\ker(A-2I)^2=\mathbb F^2.
$$
従って $G_2=\mathbb F^2$ です。また
$$
(A-2I)e_2=e_1,
\qquad
(A-2I)e_1=0.
$$
$e_2$ 自身は固有ベクトルではありませんが、一回作用させると固有ベクトルへ移ります。
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

[多項式の除法](#lem-la4-polynomial-division)を繰り返してEuclidの互除法を行います。
$$
r_{-1}=f,
\qquad
r_0=g,
$$
$$
r_{k-1}=q_kr_k+r_{k+1},
\qquad
\deg r_{k+1}<\deg r_k.
$$
非零余りの次数は厳密に下がるので有限回で終わります。

各段で
$$
r_{k+1}=r_{k-1}-q_kr_k
$$
なので、$r_{k-1},r_k$ の共通因子は $r_k,r_{k+1}$ も割ります。逆に
$$
r_{k-1}=q_kr_k+r_{k+1}
$$
から、$r_k,r_{k+1}$ の共通因子は $r_{k-1}$ も割ります。従って隣接する二つの余りの共通因子は各段で変わりません。最後の非零余りを $d$ とすると、その次の余りは0なので $d$ は直前の二つを割り、逆向きの議論をたどれば $f,g$ を割ります。また $f,g$ の任意の共通因子は各余りを割るので $d$ も割ります。従って $d$ は最大公約多項式の定数倍です。$f,g$ は互いに素なので $d$ は0でない定数であり、定数倍して1とできます。

さらに各式を最後から逆代入すると、各余りは最初の $f,g$ の多項式係数線形結合です。特に最後の1もその形に書けるので、ある多項式 $a,b$ が存在して
$$
1=af+bg.
$$
$\square$
<!-- proof-end -->

<a id="lem-la4-distinct-linear-powers-coprime"></a>
<!-- formal-statement-start -->
> **補題（相異なる一次因子の冪は互いに素）**  
> $\lambda\ne\mu$、$r,s\ge1$ なら
$$
(t-\lambda)^r
\quad\text{と}\quad
(t-\mu)^s
$$
> は互いに素である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず
$$
\frac{1}{\mu-\lambda}(t-\lambda)
-
\frac{1}{\mu-\lambda}(t-\mu)
=1.
$$
両辺を $r+s-1$ 乗します。左辺の各展開項は
$$
(t-\lambda)^k(t-\mu)^{r+s-1-k}
$$
の定数倍です。$k\ge r$ なら $(t-\lambda)^r$ で割り切れます。$k<r$ なら
$$
r+s-1-k\ge s
$$
なので $(t-\mu)^s$ で割り切れます。全項を二群にまとめれば、ある多項式 $a,b$ が存在して
$$
a(t)(t-\lambda)^r
+b(t)(t-\mu)^s
=1.
$$
従って二つの冪は互いに素です。$\square$
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

まず2因子の場合です。
$$
h=f_1c,
\qquad
f_2\mid h
$$
とします。Bézout等式
$$
af_1+bf_2=1
$$
へ $c$ を掛けると
$$
c=ah+bf_2c.
$$
右辺は両項とも $f_2$ で割り切れるので $f_2\mid c$。従って
$$
h=f_1f_2d
$$
と書けます。

次に、積 $f_1\cdots f_{j-1}$ と $f_j$ が互いに素であることを、既約分解を仮定せず示します。各 $i<j$ について
$$
a_if_i+b_if_j=1
$$
というBézout等式を取ります。これらを全て掛け合わせます。展開した項のうち $f_j$ を一度も選ばない項は
$$
\left(\prod_{i<j}a_i\right)
\left(\prod_{i<j}f_i\right)
$$
だけで、それ以外は全て $f_j$ を因子に持ちます。従ってある $A,B$ が存在して
$$
A\prod_{i<j}f_i+Bf_j=1.
$$
よって $\prod_{i<j}f_i$ と $f_j$ は互いに素です。

以上より2因子の場合を
$$
f_1,f_2;
\quad f_1f_2,f_3;
\quad\dots
$$
と順に適用でき、最後に
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
と置きます。

#### 最小多項式の指数と一般化固有空間を結ぶ

まず
$$
G_{\lambda_j}=\ker p_j(T)
$$
を示します。

$\ker p_j(T)\subset G_{\lambda_j}$ は定義から直ちに従います。逆に $x\in G_{\lambda_j}$ とします。十分大きい $N$ について
$$
(T-\lambda_jI)^Nx=0.
$$
$q_j$ は $k\ne j$ の
$$
(t-\lambda_k)^{s_k}
$$
の積です。[相異なる一次因子の冪は互いに素](#lem-la4-distinct-linear-powers-coprime)なので各因子は $(t-\lambda_j)^N$ と互いに素であり、[互いに素な因子の積による整除](#lem-la4-coprime-product-divisibility)の証明で使ったBézout等式の積構成から、積 $q_j$ も $(t-\lambda_j)^N$ と互いに素です。

従ってBézout等式から多項式 $\alpha,\beta$ が存在して
$$
\alpha(t)q_j(t)+\beta(t)(t-\lambda_j)^N=1.
$$
$t=T$ を代入して $x$ に作用させると第2項は0なので
$$
x=\alpha(T)q_j(T)x.
$$
両辺へ $p_j(T)$ を作用させると、作用素多項式の可換性から
$$
\begin{aligned}
p_j(T)x
&=p_j(T)\alpha(T)q_j(T)x\\
&=\alpha(T)m_T(T)x\\
&=0.
\end{aligned}
$$
従って $x\in\ker p_j(T)$ で、等号が示されました。

#### Bézout等式から成分射影を作る

$p_j$ と各 $p_k$（$k\ne j$）は互いに素です。上の積構成から $p_j$ と
$$
q_j=\prod_{k\ne j}p_k
$$
も互いに素なので、多項式 $a_j,b_j$ が存在して
$$
a_jp_j+b_jq_j=1.
$$
ここで
$$
e_j=b_jq_j
$$
と置きます。すると
$$
e_j=1-a_jp_j,
$$
従って
$$
e_j\equiv1\pmod{p_j}.
$$
また $k\ne j$ なら $q_j$ は $p_k$ を因子に持つので
$$
e_j\equiv0\pmod{p_k}.
$$

多項式
$$
h(t)=1-\sum_{j=1}^re_j(t)
$$
を考えます。固定した $k$ に対し、$e_k\equiv1\pmod{p_k}$、他の $e_j\equiv0\pmod{p_k}$ なので
$$
p_k\mid h.
$$
全ての $k$ で成り立ち、$p_1,\dots,p_r$ は2つずつ互いに素なので[互いに素な因子の積による整除](#lem-la4-coprime-product-divisibility)から
$$
m_T=p_1\cdots p_r\mid h.
$$
従ってある $c(t)$ が存在して
$$
1-\sum_{j=1}^re_j(t)=c(t)m_T(t).
$$
$t=T$ を代入して $m_T(T)=0$ を使うと
$$
I=\sum_{j=1}^re_j(T).
$$
任意の $v\in V$ は
$$
v=\sum_{j=1}^re_j(T)v
$$
と書けます。

各項について
$$
\begin{aligned}
p_j(T)e_j(T)
&=p_j(T)b_j(T)q_j(T)\\
&=b_j(T)m_T(T)\\
&=0,
\end{aligned}
$$
従って
$$
e_j(T)v\in\ker p_j(T)=G_{\lambda_j}.
$$
よって $V$ は一般化固有空間の和です。

最後に直和性を示します。
$$
v_1+\cdots+v_r=0,
\qquad
v_j\in G_{\lambda_j}
$$
とします。$e_i=1-a_ip_i$ と $p_i(T)v_i=0$ から
$$
e_i(T)v_i=v_i.
$$
$j\ne i$ なら $e_i$ は $p_j$ で割り切れるので
$$
e_i(T)v_j=0.
$$
元の等式へ $e_i(T)$ を作用させると
$$
0=v_i.
$$
全ての $i$ について成り立つので和は直和です。$\square$
<!-- proof-end -->

複素数上では[代数学の基本定理という証明境界](#ref-la4-fta-boundary)により特性多項式が一次因子へ分解します。Cayley–Hamiltonから $m_T\mid\chi_T$ なので最小多項式も一次因子の冪へ分解し、全ての有限次元複素作用素にこの定理を適用できます。

---

## 7. Jordan鎖とJordanブロック

一般化固有空間 $G_\lambda$ 上では
$$
N=T-\lambda I
$$
は冪零です。実際、上の証明により
$$
G_\lambda=\ker(T-\lambda I)^s
$$
で、$G_\lambda$ 上では $N^s=0$ です。

<a id="def-la4-jordan-sequence"></a>
<!-- formal-statement-start -->
> **定義（Jordan鎖）**  
> ベクトル列 $v_1,\dots,v_k$ が
$$
(T-\lambda I)v_1=0,
$$
$$
(T-\lambda I)v_j=v_{j-1}
\qquad(j=2,\dots,k)
$$
> を満たすとき、これを固有値 $\lambda$ に対するJordan鎖という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la4-jordan-sequence -->
**定義の確認**：
$$
A=\begin{pmatrix}2&1\\0&2\end{pmatrix}
$$
では $v_1=e_1,v_2=e_2$ とすると
$$
(A-2I)v_1=0,
\qquad
(A-2I)v_2=v_1.
$$
従って $(e_1,e_2)$ は長さ2のJordan鎖です。
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

<!-- definition-example-start: def-la4-jordan-block -->
**定義の確認**：長さ2のJordan鎖 $v_1,v_2$ では
$$
Tv_1=\lambda v_1,
\qquad
Tv_2=v_1+\lambda v_2.
$$
表現行列の第1列・第2列はこの係数なので
$$
[T]_{(v_1,v_2)}
=\begin{pmatrix}\lambda&1\\0&\lambda\end{pmatrix}
=J_2(\lambda).
$$
<!-- definition-example-end -->

---

## 8. Jordan標準形

<a id="thm-la4-jordan-form"></a>
<!-- formal-statement-start -->
> **定理（Jordan標準形定理）**  
> 有限次元複素ベクトル空間上の任意の線形自己写像 $T$ には、Jordan鎖を並べた基底が存在し、その基底での表現行列は
$$
J_{k_1}(\lambda_1)\oplus\cdots\oplus J_{k_m}(\lambda_m)
$$
> というJordanブロックの直和になる。ブロックの順序を除けば、各固有値に対するブロックサイズの多重集合は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[代数学の基本定理という証明境界](#ref-la4-fta-boundary)により複素数上では特性多項式が一次因子へ分解し、Cayley–Hamiltonから最小多項式も一次因子の冪へ分解します。[一般化固有空間分解](#thm-la4-generalized-decomposition)により
$$
V=\bigoplus_\lambda G_\lambda.
$$
従って各 $G_\lambda$ 上の冪零作用素
$$
N=T-\lambda I
$$
についてJordan鎖基底を作れば十分です。

### 冪零作用素にはJordan鎖基底がある

$\dim V$ に関する帰納法で示します。$N=0$ なら任意の基底が全て長さ1のJordan鎖なので終了です。

$N\ne0$ とし
$$
W=\operatorname{Im}N
$$
と置きます。$w=Nx\in W$ なら
$$
Nw=N^2x\in W,
$$
従って $W$ は $N$ で不変です。また冪零作用素 $N$ は非零空間上で全射になれません。もし全射なら全ての $N^k$ も全射ですが、十分大きい $k$ で $N^k=0$ となり、非零空間への零写像が全射という矛盾です。従って
$$
\dim W<\dim V.
$$
帰納法の仮定を $N|_W$ に使えます。

$W$ のJordan鎖基底を鎖ごとに
$$
w_{i,1},\dots,w_{i,k_i}
\qquad(i=1,\dots,c)
$$
と書きます。すなわち
$$
Nw_{i,1}=0,
\qquad
Nw_{i,j}=w_{i,j-1}
\quad(j\ge2),
$$
で、全ての $w_{i,j}$ を合わせると $W$ の基底です。

各鎖の最上段 $w_{i,k_i}\in W=\operatorname{Im}N$ なので、ある $v_i\in V$ を選んで
$$
Nv_i=w_{i,k_i}
$$
とできます。従って
$$
w_{i,1},\dots,w_{i,k_i},v_i
$$
は一段長いJordan鎖です。

これだけで $V$ 全体を埋めるとは限らないので、長さ1の鎖を追加します。まず
$$
\ker(N|_W)=W\cap\ker N
$$
の基底が
$$
w_{1,1},\dots,w_{c,1}
$$
であることを示します。$w\in W$ を
$$
w=\sum_{i=1}^c\sum_{j=1}^{k_i}a_{i,j}w_{i,j}
$$
と書くと
$$
Nw
=\sum_{i=1}^c\sum_{j=2}^{k_i}a_{i,j}w_{i,j-1}.
$$
$\{w_{i,j}\}$ は $W$ の基底なので $Nw=0$ なら
$$
a_{i,j}=0
\qquad(j\ge2).
$$
逆に各 $w_{i,1}$ は核に入ります。従って上の $c$ 本が $W\cap\ker N$ の基底です。

これを $\ker N$ の基底へ延長して
$$
w_{1,1},\dots,w_{c,1},z_1,\dots,z_r
$$
を取ります。各 $z_\ell$ は $Nz_\ell=0$ なので長さ1のJordan鎖です。

候補族
$$
\mathcal B
=
\{w_{i,j}\}_{i,j}
\cup\{v_1,\dots,v_c\}
\cup\{z_1,\dots,z_r\}
$$
が基底であることを確認します。

まず一次独立性です。
$$
\sum_i\left(
\sum_{j=1}^{k_i}a_{i,j}w_{i,j}+b_iv_i
\right)
+\sum_{\ell=1}^r c_\ell z_\ell
=0
$$
とします。$N$ を作用させると
$$
\sum_i\left(
\sum_{j=2}^{k_i}a_{i,j}w_{i,j-1}
+b_iw_{i,k_i}
\right)=0.
$$
これは $W$ の基底 $\{w_{i,j}\}$ の線形結合です。各鎖について最高段 $w_{i,k_i}$ の係数は $b_i$、その下から順に $a_{i,k_i},\dots,a_{i,2}$ なので
$$
b_i=0,
\qquad
a_{i,j}=0\quad(j\ge2).
$$
元の関係は
$$
\sum_i a_{i,1}w_{i,1}
+\sum_\ell c_\ell z_\ell=0
$$
となりますが、これは $\ker N$ の基底の線形結合なので残りの係数も0です。従って $\mathcal B$ は一次独立です。

次に本数を数えます。$\{w_{i,j}\}$ は $W$ の基底なので本数は $\dim W$。鎖数
$$
c=\dim(W\cap\ker N).
$$
また
$$
r=\dim\ker N-c.
$$
従って $\mathcal B$ の本数は
$$
\dim W+c+r
=\dim W+\dim\ker N.
$$
$W=\operatorname{Im}N$ なので[rank-nullity theorem](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01)から
$$
\dim W+\dim\ker N=\dim V.
$$
一次独立な $\dim V$ 本のベクトルなので $\mathcal B$ は基底です。構成上、全てJordan鎖からなります。

各鎖 $v_1,\dots,v_k$ では
$$
Nv_1=0,
\qquad
Nv_j=v_{j-1},
$$
従って
$$
Tv_1=\lambda v_1,
\qquad
Tv_j=v_{j-1}+\lambda v_j.
$$
よってその鎖の表現行列は $J_k(\lambda)$ です。各一般化固有空間の鎖基底を合わせれば、$T$ の表現行列はJordanブロックの直和になります。

### ブロックサイズの一意性

固定した固有値 $\lambda$ について
$$
N=T-\lambda I
$$
とし、Jordanブロックサイズを $k_1,\dots,k_c$ とします。1個の冪零Jordanブロックの鎖基底 $v_1,\dots,v_{k_i}$ では
$$
N^jv_\ell
=\begin{cases}
0,&\ell\le j,\\
v_{\ell-j},&\ell>j.
\end{cases}
$$
従ってそのブロックの $\ker N^j$ の次元は
$$
\min(j,k_i).
$$
ブロック直和では核の次元が加法的なので
$$
\dim\ker N^j
=\sum_{i=1}^c\min(j,k_i).
$$
差
$$
d_j
=\dim\ker N^j-\dim\ker N^{j-1}
$$
を取ると、ブロック $i$ の寄与は
$$
\min(j,k_i)-\min(j-1,k_i)
=\begin{cases}
1,&k_i\ge j,\\
0,&k_i<j.
\end{cases}
$$
従って
$$
d_j=\#\{i:k_i\ge j\}.
$$
つまり $d_j$ は「長さ $j$ 以上のブロック数」です。長さがちょうど $j$ のブロック数は
$$
d_j-d_{j+1}
$$
で復元できます。

$\dim\ker N^j$ は作用素そのものから決まり基底に依存しないため、全てのブロックサイズも一意に決まります。自由なのはブロックの並べ順だけです。$\square$
<!-- proof-end -->

### 最小多項式の指数と最大Jordanブロック

1個のJordanブロック $J_k(\lambda)$ を考え
$$
N=J_k(\lambda)-\lambda I
$$
とします。鎖基底 $v_1,\dots,v_k$ では
$$
N^k=0,
\qquad
N^{k-1}v_k=v_1\ne0.
$$
従って $(t-\lambda)^k$ はブロックを消しますが、$(t-\lambda)^{k-1}$ は消しません。

任意の $p$ が
$$
p(J_k(\lambda))=0
$$
を満たすとします。[多項式の除法](#lem-la4-polynomial-division)で
$$
p(t)=q(t)(t-\lambda)^k+r(t),
\qquad
\deg r<k
$$
と書きます。$(J_k(\lambda)-\lambda I)^k=0$ なので
$$
0=r(J_k(\lambda)).
$$
$r$ を $(t-\lambda)$ の冪で
$$
r(t)=a_0+a_1(t-\lambda)+\cdots+a_{k-1}(t-\lambda)^{k-1}
$$
と書き、$v_k$ に作用させると
$$
0
=a_0v_k+a_1v_{k-1}+\cdots+a_{k-1}v_1.
$$
鎖基底は一次独立なので全ての $a_j=0$、従って $r=0$ です。よってこのブロックを消す任意の多項式は $(t-\lambda)^k$ で割り切れ
$$
m_{J_k(\lambda)}(t)=(t-\lambda)^k.
$$

Jordanブロック直和では
$$
p(T)=0
$$
であることと各ブロックで $p$ が0になることが同値です。従って全体の最小多項式は各ブロックの最小多項式の最小公倍多項式です。固定した固有値 $\lambda$ に対するブロックサイズを $k_1,\dots,k_c$ とすれば
$$
\operatorname{lcm}
\bigl((t-\lambda)^{k_1},\dots,(t-\lambda)^{k_c}\bigr)
=(t-\lambda)^{\max_i k_i}.
$$
従って
$$
\boxed{
\text{最小多項式中の }(t-\lambda)\text{ の指数}
=
\text{最大Jordanブロックサイズ}
}.
$$

次に特性多項式を多項式行列式の定義から計算します。
$$
tI-J_k(\lambda)
$$
は対角成分がすべて $t-\lambda$、その上の超対角成分が $-1$、対角より下が0の上三角多項式行列です。[多項式行列式のLeibniz公式](#def-la4-polynomial-matrix-determinant)を考えます。恒等置換の項は
$$
(t-\lambda)^k.
$$
一方、$\sigma\ne\mathrm{id}$ なら、ある列 $j$ で $\sigma(j)>j$ となります。実際、もし全ての $j$ で $\sigma(j)\le j$ なら、$\sum_j\sigma(j)=\sum_jj$ なので全て等号となり $\sigma=\mathrm{id}$ です。$\sigma(j)>j$ の列では選ばれる成分が対角より下にあり0なので、その置換の項全体が0です。従って
$$
\chi_{J_k(\lambda)}(t)
=\det(tI-J_k(\lambda))
=(t-\lambda)^k.
$$

さらにJordan形がブロック対角行列
$$
J=J_{k_1}(\lambda_1)\oplus\cdots\oplus J_{k_m}(\lambda_m)
$$
なら、$tI-J$ も同じブロック分割を持ちます。Leibniz和で異なるブロック間をまたぐ置換の項にはブロック外の0成分が現れるため消え、生き残る置換は各ブロック内の置換を独立に選ぶものだけです。従って有限和は各ブロックのLeibniz和の積としてまとまり
$$
\chi_J(t)
=\prod_{a=1}^m\chi_{J_{k_a}(\lambda_a)}(t)
=\prod_{a=1}^m(t-\lambda_a)^{k_a}.
$$
よって固定した固有値 $\lambda$ に属する全ブロックのサイズ総和は、特性多項式中の $(t-\lambda)$ の指数、すなわち代数的重複度です。ここではスカラー行列の三角行列式を多項式行列へ無言で延長していません。

### ブロックサイズから何が読めるか

固有値 $\lambda$ に対し

- Jordanブロックの個数 = $\dim\ker(T-\lambda I)$
- 最大ブロックサイズ = 最小多項式中の $(t-\lambda)$ の指数
- ブロックサイズ総和 = $G_\lambda$ の次元 = 特性多項式中の代数的重複度
- $\dim\ker(T-\lambda I)^j-\dim\ker(T-\lambda I)^{j-1}$ = サイズ $j$ 以上のブロック数

です。対角化可能とは、全てのJordanブロックが $1\times1$ であることに他なりません。

---

## 9. 演習

### Level A

<a id="ex-la4-a01"></a>
#### LA4-A01 作用素多項式
- Level: A

$$
A=\begin{pmatrix}1&1\\0&1\end{pmatrix}
$$
について $(A-I)^2$ を求めよ。

<!-- solution-start -->
**解答**：
$$
A-I=\begin{pmatrix}0&1\\0&0\end{pmatrix},
\qquad
(A-I)^2=0.
$$
作用素多項式 $p(t)=(t-1)^2$ を代入した計算です。
<!-- solution-end -->

<a id="ex-la4-a02"></a>
#### LA4-A02 最小多項式
- Level: A

A01の行列の特性多項式と最小多項式を求めよ。

<!-- solution-start -->
**解答**：多項式行列の行列式から
$$
\chi_A(t)
=\det\begin{pmatrix}t-1&-1\\0&t-1\end{pmatrix}
=(t-1)^2.
$$
また
$$
A-I\ne0,
\qquad
(A-I)^2=0.
$$
従って次数1の $t-1$ では消えず、次数2の $(t-1)^2$ で消えるので
$$
m_A(t)=(t-1)^2.
$$
<!-- solution-end -->

<a id="ex-la4-a03"></a>
#### LA4-A03 対角化判定
- Level: A

最小多項式が $(t-1)(t+2)$ の作用素は対角化可能か。

<!-- solution-start -->
**解答**：二つの一次因子は相異なり重複がありません。[最小多項式による対角化判定](#thm-la4-diagonalizable-criterion)から対角化可能です。
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
Jordan鎖の定義を全て満たします。
<!-- solution-end -->

<a id="ex-la4-a05"></a>
#### LA4-A05 固有値と特性多項式の根
- Level: A

実行列
$$
A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$
を、まず $\mathbb R$ 上、次に $\mathbb C$ 上の線形写像とみなす。それぞれの固有値を特性多項式から求めよ。

<!-- solution-start -->
**解答**：
$$
\chi_A(t)
=\det\begin{pmatrix}t&1\\-1&t\end{pmatrix}
=t^2+1.
$$
[固有値と特性多項式の根](#thm-la4-eigenvalue-characteristic-root)により、固有値はスカラー体の中の特性根と一致します。

$\mathbb R$ では $t^2+1$ に根がないので実固有値はありません。$\mathbb C$ では
$$
t^2+1=(t-i)(t+i)
$$
なので固有値は $i,-i$ です。同じ行列でもスカラー体により分解可能性が変わることを確認できます。
<!-- solution-end -->

### Level B

<a id="ex-la4-b01"></a>
#### LA4-B01 最小多項式からJordanブロックを読む
- Level: B

4次元複素空間上の作用素 $T$ が特性多項式 $(t-2)^4$、最小多項式 $(t-2)^3$ を持つとする。可能なJordanブロックサイズを求めよ。

<!-- solution-start -->
**解答**：特性多項式中の $(t-2)$ の指数4は、固有値2に属するブロックサイズ総和が4であることを意味します。最小多項式中の指数3は最大ブロックサイズが3であることを意味します。従ってサイズ3のブロックが少なくとも一つあり、残りは1次元です。
$$
4=3+1.
$$
よってJordan形は
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
なのでブロックは2個です。
$$
d_2=4-2=2
$$
なので長さ2以上のブロックも2個、
$$
d_3=5-4=1
$$
なので長さ3以上は1個です。全次元が5なのでサイズは3と2です。
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
従って
$$
A^2=3A-2I.
$$
順に
$$
A^3=A(3A-2I)
=3A^2-2A
=7A-6I,
$$
$$
A^4=A(7A-6I)
=7A^2-6A
=15A-14I.
$$
ここで使ったのはCayley–Hamiltonによる二次以上の冪の還元です。
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
また作用素多項式同士は可換なので
$$
\begin{aligned}
(T-\lambda I)^rP_\lambda
&=b(T)(T-\lambda I)^r(T-\mu I)^s\\
&=b(T)m_T(T)\\
&=0.
\end{aligned}
$$
従って
$$
\operatorname{Im}P_\lambda\subset G_\lambda.
$$
同様に
$$
\operatorname{Im}P_\mu\subset G_\mu.
$$
$v\in G_\lambda$ なら一般化固有空間分解の証明で示した
$$
G_\lambda=\ker(T-\lambda I)^r
$$
から
$$
P_\mu v=0.
$$
さらに $P_\lambda+P_\mu=I$ なので
$$
P_\lambda v=v.
$$
同様に $v\in G_\mu$ では $P_\lambda v=0$, $P_\mu v=v$。従って各 $P$ は対応する直和成分への射影です。
<!-- solution-end -->

---

## 10. 次に進む

一般の作用素の代数的構造をJordan形まで記述できました。次は複素ベクトル空間に幾何を入れ、**複素内積・共役転置・随伴・Hermitian・unitary・normal operator** を統一します。