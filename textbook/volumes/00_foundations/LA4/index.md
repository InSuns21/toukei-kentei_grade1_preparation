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
**定義の確認**：$p(t)=t^2-3t+2$ なら
$$
p(T)=T^2-3T+2I.
$$
固有ベクトル $Tv=\lambda v$ に対しては
$$
p(T)v=p(\lambda)v
$$
となります。
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

<!-- definition-example-start: def-la4-characteristic-polynomial, def-la4-minimal-polynomial -->
**定義の確認**：
$$
A=\begin{pmatrix}2&1\\0&2\end{pmatrix}
$$
なら
$$
\chi_A(t)=(t-2)^2.
$$
また $A-2I\ne0$ だが $(A-2I)^2=0$ なので
$$
m_A(t)=(t-2)^2.
$$
一方 $A=2I$ なら特性多項式は同じ $(t-2)^2$ でも最小多項式は $t-2$ です。
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
最小性から $r=0$。したがって
$$
m_T\mid p.
$$

---

## 3. Cayley–Hamilton定理

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

基底を選び $T$ の行列を $A$ とします。多項式行列 $tI-A$ に対する余因子行列を $\operatorname{adj}(tI-A)$ とすると
$$
(tI-A)\operatorname{adj}(tI-A)=\chi_A(t)I.
$$
ここで
$$
\operatorname{adj}(tI-A)=B_0+B_1t+\cdots+B_{n-1}t^{n-1}
$$
と書き、両辺の $t$ の係数を比較します。得られた係数関係をそれぞれ $I,A,A^2,\dots$ で重み付けして足し合わせると中間項が望ましく相殺し
$$
\chi_A(A)=0
$$
を得ます。したがって座標に戻して $\chi_T(T)=0$ です。

最小多項式は全ての消去多項式を割るので $m_T\mid\chi_T$。$\square$
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

対角化可能なら固有基底を取り、固有値を $\lambda_1,\dots,\lambda_r$ とすれば
$$
\prod_j(T-\lambda_jI)=0.
$$
したがって $m_T$ は相異なる一次因子の積を割り、重根を持ちません。

逆に $m_T=\prod_j(t-\lambda_j)$ とします。因子は互いに素なので、Lagrange補間により多項式 $q_j$ を取って
$$
1=\sum_j q_j(t)\prod_{k\ne j}(t-\lambda_k)
$$
とできます。$t=T$ を代入すると任意の $v$ が各 $\ker(T-\lambda_jI)$ 成分の和に分解されます。異なる固有空間の和は直和なので、固有ベクトルだけで $V$ を張れます。$\square$
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

<!-- definition-example-start: def-la4-generalized-eigenspace -->
**定義の確認**：
$$
A=\begin{pmatrix}2&1\\0&2\end{pmatrix}
$$
では通常の固有空間は
$$
\ker(A-2I)=\operatorname{span}(e_1)
$$
の1次元ですが
$$
(A-2I)^2=0
$$
なので一般化固有空間は $\mathbb R^2$ 全体です。$e_2$ は固有ベクトルではないものの
$$
(A-2I)e_2=e_1
$$
と固有ベクトルへ送られます。
<!-- definition-example-end -->

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

$p_j(t)=(t-\lambda_j)^{s_j}$ と置くと $p_j$ は互いに素です。中国剰余定理またはBézoutの等式から、多項式 $e_j(t)$ を取って
$$
1=e_1(t)+\cdots+e_r(t),
$$
かつ $e_j(T)V\subset\ker p_j(T)$ となるようにできます。したがって任意の $v$ は
$$
v=\sum_j e_j(T)v
$$
と一般化固有空間の和に分解されます。

さらに異なる因子が互いに素であることを再びBézoutに使うと交わりが0と分かり、和は直和です。$\square$
<!-- proof-end -->

複素数上では特性多項式が必ず一次因子へ分解するので、全ての有限次元作用素にこの分解が使えます。

---

## 6. Jordan鎖とJordanブロック

一般化固有空間 $G_\lambda$ 上では
$$
N=T-\lambda I
$$
は冪零です。つまりある $k$ で $N^k=0$ になります。

<a id="def-la4-jordan-chain"></a>
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

<!-- definition-example-start: def-la4-jordan-chain -->
**定義の確認**：上の $2\times2$ 行列では $v_1=e_1$, $v_2=e_2$ とすると
$$
(A-2I)v_1=0,
\qquad
(A-2I)v_2=v_1.
$$
したがって $(e_1,e_2)$ は長さ2のJordan鎖です。
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
Tv_1=\lambda v_1,
\qquad
Tv_2=v_1+\lambda v_2,
$$
なので基底 $(v_1,v_2)$ での行列は
$$
\begin{pmatrix}\lambda&1\\0&\lambda\end{pmatrix}.
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

<!-- proof-start -->
### 証明

複素数上では特性多項式が一次因子へ分解するので、[一般化固有空間分解](#thm-la4-generalized-decomposition)により各 $G_\lambda$ を別々に扱えば十分です。

$G_\lambda$ 上で $N=T-\lambda I$ は冪零です。核の列
$$
0\subset\ker N\subset\ker N^2\subset\cdots\subset\ker N^s=G_\lambda
$$
を考えます。各段階で $\ker N^{j-1}$ にまだ入っていない方向を選び、その代表を $N$ で順に下へ送ると
$$
v_j\mapsto v_{j-1}\mapsto\cdots\mapsto v_1\mapsto0
$$
という鎖が得られます。各商空間
$$
\ker N^j/\ker N^{j-1}
$$
の基底を上から整合的に持ち上げれば、これらの鎖を合わせて $G_\lambda$ の基底にできます。

各鎖上の行列はJordanブロックなので、全一般化固有空間を合わせればJordan標準形を得ます。ブロックサイズは
$$
\dim\ker N,\ \dim\ker N^2,\dots
$$
の増分から復元できるため一意です。$\square$
<!-- proof-end -->

### ブロックサイズから何が読めるか

固有値 $\lambda$ に対し

- Jordanブロックの個数 = $\dim\ker(T-\lambda I)$
- 最大ブロックサイズ = 最小多項式中の $(t-\lambda)$ の指数
- ブロックサイズ総和 = $G_\lambda$ の次元

です。

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
**解答**：特性多項式は $(t-1)^2$。$A-I\ne0$ だが $(A-I)^2=0$ なので最小多項式も $(t-1)^2$。
<!-- solution-end -->

<a id="ex-la4-a03"></a>
#### LA4-A03 対角化判定
- Level: A

最小多項式が $(t-1)(t+2)$ の作用素は対角化可能か。

<!-- solution-start -->
**解答**：相異なる一次因子の積なので対角化可能。
<!-- solution-end -->

<a id="ex-la4-a04"></a>
#### LA4-A04 Jordan鎖
- Level: A

$J_3(0)$ に対し標準基底 $e_1,e_2,e_3$ がJordan鎖になることを確認せよ。

<!-- solution-start -->
**解答**：$J_3(0)e_1=0$, $J_3(0)e_2=e_1$, $J_3(0)e_3=e_2$。したがって長さ3のJordan鎖。
<!-- solution-end -->

### Level B

<a id="ex-la4-b01"></a>
#### LA4-B01 最小多項式からJordanブロックを読む
- Level: B

4次元複素空間上の作用素 $T$ が特性多項式 $(t-2)^4$、最小多項式 $(t-2)^3$ を持つとする。可能なJordanブロックサイズを求めよ。

<!-- solution-start -->
**解答**：全ブロックサイズの和は4、最大サイズは3。したがって分割は $3+1$ のみ。Jordan形は $J_3(2)\oplus J_1(2)$。
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
**解答**：ブロック数は2。$\dim\ker N^2-\dim\ker N=2$ なので長さ2以上のブロックも2個。$\dim\ker N^3-\dim\ker N^2=1$ なので長さ3以上は1個。総和5よりサイズは3と2。
<!-- solution-end -->

<a id="ex-la4-b03"></a>
#### LA4-B03 Cayley–Hamiltonで高冪を落とす
- Level: B

$2\times2$ 行列 $A$ の特性多項式が $t^2-3t+2$ であるとする。$A^4$ を $I,A$ の線形結合へ簡約せよ。

<!-- solution-start -->
**解答**：[Cayley–Hamilton定理](#thm-la4-cayley-hamilton)から $A^2=3A-2I$。よって
$$
A^3=3A^2-2A=7A-6I,
$$
$$
A^4=7A^2-6A=15A-14I.
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
**解答**：Bézout式に $T$ を代入して $P_\lambda+P_\mu=I$。また $(T-\lambda I)^rP_\lambda=0$ は $m_T(T)=0$ から従うので $\operatorname{Im}P_\lambda\subset G_\lambda$。同様に $\operatorname{Im}P_\mu\subset G_\mu$。$v\in G_\lambda$ では $(T-\lambda I)^rv=0$ なので Bézout式から $P_\lambda v=v$、$P_\mu v=0$。$G_\mu$ でも逆。したがって両者は対応する直和成分への射影。
<!-- solution-end -->

---

## 9. 次に進む

一般の作用素の代数的構造をJordan形まで記述できました。次は複素ベクトル空間に幾何を入れ、**複素内積・共役転置・随伴・Hermitian・unitary・normal operator** を統一します。
