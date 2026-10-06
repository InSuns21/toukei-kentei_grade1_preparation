# QM4 非可換観測量と不確定性関係

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[QM2 の Born 則](../QM2/index.md#axiom-qm2-born-rule)、[QM2 の理想射影測定後の状態更新](../QM2/index.md)、[QM3 のスペクトル定理](../QM3/index.md#thm-qm3-bounded-self-adjoint-spectral)、[QM3 の PVM](../QM3/index.md#def-qm3-pvm)、[LA5 の複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)を使います。

QM3 までで、一つの有界自己共役観測量 $A$ について

$$
A=\int_{\sigma(A)}\lambda\,dE_A(\lambda)
$$

とスペクトル分解し、状態 $\psi$ における測定値分布を

$$
\Pr_\psi(A\in B)
=
\langle\psi,E_A(B)\psi\rangle
$$

で記述できるようになりました。

しかし量子力学で本当に特徴的な問題は、**二つの観測量を同時に考えたとき**に現れます。

古典的な数値なら

$$
ab=ba
$$

なので、掛ける順番は問題になりません。ところが作用素では

$$
AB\ne BA
$$

が起こり得ます。

QM1 の逐次 Stern--Gerlach 型実験では、途中で別の軸を測ると、その後の測定統計が変わる現象を見ました。QM2 ではこれを射影測定後の状態更新で計算しました。本章では、その現象を

$$
\boxed{
\text{作用素の非可換性}
\longleftrightarrow
\text{共通固有基底の不在}
\longleftrightarrow
\text{逐次測定の順序依存}
}
$$

という数学へ整理します。

さらに、測定値のばらつきを標準偏差で測ると、二つの観測量について積の順序を入れ替えた差が

$$
\Delta_\psi A\,\Delta_\psi B
\ge
\frac12
\left|
\langle\psi,[A,B]\psi\rangle
\right|
$$

という下限を与えます。この標準偏差の下限を、積の順序差を定義した後に本章後半で厳密に証明します。

ここで重要なのは、**不確定性関係を「最初の測定が次の測定を乱す」という説明だけに還元しないこと**です。逐次測定の順序依存と不確定性関係は関連していますが、同じ主張ではありません。

本章では QM5 以降の定義域問題を避けるため、Robertson 型不等式はまず**自己共役有界作用素**について扱います。位置 $Q$ と運動量 $P$ のような非有界作用素は QM5--QM8 で改めて厳密化します。

---

## 1. まず二つの行列を掛けてみる

$\mathbb C^2$ 上の Pauli 行列

$$
\sigma_x
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
\sigma_y
=
\begin{pmatrix}
0&-i\\
i&0
\end{pmatrix},
\qquad
\sigma_z
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
$$

を考えます。

まず

$$
\begin{aligned}
\sigma_x\sigma_y
&=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
\begin{pmatrix}
0&-i\\
i&0
\end{pmatrix}\\
&=
\begin{pmatrix}
i&0\\
0&-i
\end{pmatrix}\\
&=
i\sigma_z.
\end{aligned}
$$

逆順では

$$
\begin{aligned}
\sigma_y\sigma_x
&=
\begin{pmatrix}
0&-i\\
i&0
\end{pmatrix}
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}\\
&=
\begin{pmatrix}
-i&0\\
0&i
\end{pmatrix}\\
&=
-i\sigma_z.
\end{aligned}
$$

従って

$$
\sigma_x\sigma_y
\ne
\sigma_y\sigma_x.
$$

差を取ると

$$
\sigma_x\sigma_y-\sigma_y\sigma_x
=
2i\sigma_z.
$$

この「積の順序を入れ替えたときの差」を独立の記号で持っておくと、非可換性を一つの作用素として測れます。

---

## 2. 積の順序差を作用素として記録する

二つの作用素が可換するかどうかを、毎回 $AB=BA$ と比較するだけでは、この差そのものを後の計算へ持ち運べません。そこで、積の順序を入れ替えたときに残る差を一つの作用素として記録します。これにより、可換性は「その作用素が零かどうか」で判定でき、不確定性関係の下限にも同じ量を使えます。

<a id="def-qm4-commutator"></a>

<!-- formal-statement-start -->
### 定義（交換子）

同じ Hilbert 空間 $H$ 上の有界作用素 $A,B\in\mathcal B(H)$ に対し、

$$
[A,B]
=
AB-BA
$$

を $A$ と $B$ の **交換子**という。
<!-- formal-statement-end -->

### 直接例：Pauli 行列の交換子

<!-- definition-example-start: def-qm4-commutator -->

**定義の確認**

前節の計算から

$$
[\sigma_x,\sigma_y]
=
2i\sigma_z.
$$

同様に直接行列積を計算すると

$$
[\sigma_y,\sigma_z]
=
2i\sigma_x,
$$

$$
[\sigma_z,\sigma_x]
=
2i\sigma_y.
$$

従って三つの Pauli 行列は互いに可換ではありません。

一方、

$$
[\sigma_z,\sigma_z]
=
\sigma_z^2-\sigma_z^2
=
0.
$$

一般に任意の作用素 $A$ について

$$
[A,A]=0
$$

です。

<!-- definition-example-end -->

交換子にはすぐ分かる代数的性質があります。

$$
[A,B]=-[B,A],
$$

$$
[A,B+C]=[A,B]+[A,C],
$$

$$
[A,BC]=[A,B]C+B[A,C].
$$

最後の式は

$$
\begin{aligned}
[A,BC]
&=
ABC-BCA\\
&=
ABC-BAC+BAC-BCA\\
&=
(AB-BA)C+B(AC-CA)\\
&=
[A,B]C+B[A,C]
\end{aligned}
$$

と一段ずつ展開すれば確認できます。

自己共役 $A=A^*$、$B=B^*$ に対しては

$$
[A,B]^*
=
(AB-BA)^*
=
BA-AB
=
-[A,B].
$$

従って交換子は反自己共役です。このため

$$
\langle\psi,[A,B]\psi\rangle
$$

は純虚数になります。後で Robertson 型不等式の右辺に絶対値を付ける理由の一つがここにあります。

---

## 3. 可換する観測量

交換子が0なら、作用素の積の順序を入れ替えられます。

量子力学ではこの性質が、二つの観測量が同じ固有空間分解と両立するかどうかに直結します。

<a id="def-qm4-commuting-observables"></a>

<!-- formal-statement-start -->
### 定義（可換する観測量）

同じ複素 Hilbert 空間上の有界自己共役観測量 $A,B$ が

$$
[A,B]=0
$$

すなわち

$$
AB=BA
$$

を満たすとき、$A$ と $B$ は **可換する観測量**であるという。
<!-- formal-statement-end -->

### 直接例：同じ基底で対角な観測量

<!-- definition-example-start: def-qm4-commuting-observables -->

**定義の確認**

$$
A=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&-2
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
4&0&0\\
0&-3&0\\
0&0&5
\end{pmatrix}
$$

とします。

両方とも対角行列なので

$$
AB
=
\begin{pmatrix}
4&0&0\\
0&-3&0\\
0&0&-10
\end{pmatrix}
=
BA.
$$

従って

$$
[A,B]=0.
$$

この例では標準基底が $A$ と $B$ の共通固有基底です。

<!-- definition-example-end -->

この直接例は偶然ではありません。有限次元の自己共役作用素では、可換性は「共通の正規直交固有基底を選べること」とちょうど同値です。

---

## 4. 可換性と同時対角化

まず、なぜ $AB=BA$ が固有空間を保つのかを確認します。

$A$ の固有値 $\lambda$ に属する固有ベクトル $v$ を取り、

$$
Av=\lambda v
$$

とします。

$A$ と $B$ が可換するなら

$$
\begin{aligned}
A(Bv)
&=
(AB)v\\
&=
(BA)v\\
&=
B(Av)\\
&=
B(\lambda v)\\
&=
\lambda Bv.
\end{aligned}
$$

従って $Bv$ も $A$ の固有空間

$$
E_\lambda(A)
=
\ker(A-\lambda I)
$$

に入ります。

つまり各 $A$-固有空間は $B$ で不変です。

ここで $B$ を各 $E_\lambda(A)$ に制限します。$B$ は自己共役なので、その制限も自己共役です。従って各固有空間の中で $B$ を対角化できます。

<a id="thm-qm4-simultaneous-diagonalization"></a>

<!-- formal-statement-start -->
### 定理（有限次元の同時対角化）

$H$ を有限次元複素 Hilbert 空間とし、$A,B:H\to H$ を自己共役作用素とする。

このとき次は同値である。

1. $A$ と $B$ は可換する。
2. $H$ には $A$ と $B$ の両方の固有ベクトルからなる正規直交基底が存在する。
3. あるユニタリ作用素 $U$ が存在して、$U^*AU$ と $U^*BU$ がともに対角行列になる。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ を先に対角化し、その各固有空間が $B$ で不変であることを使います。各固有空間の内部で $B$ をさらに対角化すれば、両方の固有ベクトルからなる基底が得られます。

逆向きは、同じ基底で二つとも対角なら対角行列同士が可換するだけです。

<!-- proof-start -->
### 証明

まず 1 から 2 を示します。

$A$ は自己共役なので、[LA5 の複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)により

$$
H
=
\bigoplus_{\lambda\in\sigma(A)}
E_\lambda(A)
$$

と直交分解できます。

$AB=BA$ とします。

任意の

$$
v\in E_\lambda(A)
$$

に対して

$$
Av=\lambda v.
$$

上で計算したように

$$
A(Bv)
=
B(Av)
=
\lambda Bv.
$$

従って

$$
Bv\in E_\lambda(A).
$$

よって各 $E_\lambda(A)$ は $B$ で不変です。

次に $B$ の制限

$$
B_\lambda
=
B|_{E_\lambda(A)}
$$

を考えます。

$x,y\in E_\lambda(A)$ に対し、$B=B^*$ なので

$$
\langle B_\lambda x,y\rangle
=
\langle Bx,y\rangle
=
\langle x,By\rangle
=
\langle x,B_\lambda y\rangle.
$$

従って $B_\lambda$ は $E_\lambda(A)$ 上で自己共役です。

再び [LA5 の複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)を使うと、各 $E_\lambda(A)$ は $B_\lambda$ の正規直交固有基底を持ちます。

それらの基底をすべての $\lambda$ について合わせれば、$H$ 全体の正規直交基底になります。

その各ベクトルは $E_\lambda(A)$ に属するので $A$ の固有ベクトルであり、同時に $B_\lambda$ の固有ベクトルなので $B$ の固有ベクトルでもあります。

従って 2 が成り立ちます。

2 から 3 は、共通正規直交固有基底を列に並べた unitary 行列 $U$ を取れば直ちに従います。

最後に 3 から 1 を示します。

$$
D_A=U^*AU,
\qquad
D_B=U^*BU
$$

がともに対角行列なら

$$
D_AD_B=D_BD_A.
$$

両辺を $U$ と $U^*$ で戻すと

$$
AB=BA.
$$

従って 1, 2, 3 は同値です。
<!-- proof-end -->

この定理から、有限次元では

$$
\boxed{
\text{可換}
\iff
\text{共通固有基底を持つ}
}
$$

と考えてよいことが分かります。

ただし無限次元では「固有ベクトルを並べる」だけでは不十分です。QM3 で見たように、連続スペクトルを持つ作用素には固有基底が存在しない場合があるからです。

そこで一般の有界自己共役作用素では、固有空間の代わりに**スペクトル射影**を使います。

---

## 5. PVM で見た両立性

QM3 により、有界自己共役作用素 $A,B$ にはスペクトル PVM

$$
E_A,
\qquad
E_B
$$

があります。

有限次元なら

$$
E_A(S)
$$

は「固有値が $S$ に入る固有空間への射影」でした。

したがって二つの観測量が同じ分解と両立するなら、任意の Borel 集合 $S,T$ に対して

$$
E_A(S)E_B(T)
=
E_B(T)E_A(S)
$$

となるはずです。

<a id="prop-qm4-spectral-projection-compatibility"></a>

<!-- formal-statement-start -->
### 命題（可換観測量のスペクトル射影）

$A,B$ を同じ複素 Hilbert 空間上の有界自己共役作用素とし、$E_A,E_B$ をそれぞれのスペクトル PVM とする。

このとき

$$
AB=BA
$$

なら、任意の Borel 集合 $S\subset\sigma(A)$、$T\subset\sigma(B)$ に対して

$$
E_A(S)E_B(T)
=
E_B(T)E_A(S)
$$

が成り立つ。

逆に、すべての $S,T$ についてスペクトル射影が可換するなら

$$
AB=BA
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

$AB=BA$ なら、$B$ は $A$ の多項式と可換します。多項式を連続関数へ一様近似し、さらにスペクトル射影を Borel 関数計算として得ることで、$B$ は $E_A(S)$ とも可換します。同様に $E_B(T)$ まで進めます。

逆向きは

$$
A=\int \lambda\,dE_A(\lambda),
\qquad
B=\int \mu\,dE_B(\mu)
$$

を単関数近似し、各有限射影和が可換することから極限へ移します。

<!-- proof-start -->
### 証明

まず $AB=BA$ とします。

$A$ の任意の多項式 $p(A)$ に対して

$$
Bp(A)=p(A)B
$$

です。実際、$BA^n=A^nB$ を帰納法で示し、線形結合を取ればよいからです。

QM3 の連続関数計算では、任意の連続関数 $f\in C(\sigma(A))$ に対して多項式列 $p_n$ を

$$
\|p_n-f\|_\infty\to0
$$

と取ると

$$
\|p_n(A)-f(A)\|\to0.
$$

各 $p_n(A)$ は $B$ と可換するので、

$$
\begin{aligned}
Bf(A)-f(A)B
&=
B\{f(A)-p_n(A)\}\\
&\quad+
\{p_n(A)-f(A)\}B.
\end{aligned}
$$

従って

$$
\|Bf(A)-f(A)B\|
\le
2\|B\|
\|f(A)-p_n(A)\|
\to0.
$$

よって

$$
Bf(A)=f(A)B.
$$

ここからスペクトル射影へ進むときは、指示関数を連続関数で一様近似することはできないので、**強収束**を使います。

まず閉集合 $F\subset\sigma(A)$ を固定します。距離関数を用いて

$$
f_n(\lambda)
=
\max\left\{
0,\,
1-n\,\operatorname{dist}(\lambda,F)
\right\}
$$

と置きます。

各 $f_n$ は連続で、

$$
0\le f_n\le1,
$$

かつ各 $\lambda\in\sigma(A)$ について

$$
f_n(\lambda)\to\mathbf 1_F(\lambda).
$$

任意の $x\in H$ に対し、QM3 のスペクトル確率測度の構成と同じ計算から

$$
\begin{aligned}
\|
\{f_n(A)-E_A(F)\}x
\|^2
&=
\int_{\sigma(A)}
|f_n(\lambda)-\mathbf 1_F(\lambda)|^2
\,d\mu_x^A(\lambda).
\end{aligned}
$$

被積分関数は0へ各点収束し、常に1以下です。従って優収束により

$$
f_n(A)x\to E_A(F)x.
$$

つまり

$$
f_n(A)\to E_A(F)
$$

が強作用素位相で成り立ちます。

各 $f_n(A)$ は $B$ と可換します。$B$ は有界なので、任意の $x$ について

$$
\begin{aligned}
BE_A(F)x
&=
B\lim_{n\to\infty}f_n(A)x\\
&=
\lim_{n\to\infty}Bf_n(A)x\\
&=
\lim_{n\to\infty}f_n(A)Bx\\
&=
E_A(F)Bx.
\end{aligned}
$$

従って $B$ はすべての閉集合 $F$ に対する $E_A(F)$ と可換します。

ここで

$$
\mathcal C
=
\{
S\in\mathcal B(\sigma(A)):
BE_A(S)=E_A(S)B
\}
$$

と置きます。

$\mathcal C$ は閉集合をすべて含みます。また

$$
E_A(S^c)=I-E_A(S)
$$

から補集合で閉じ、PVM の積の規則から有限交叉で閉じます。さらに互いに素な $S_n\in\mathcal C$ については

$$
E_A\left(\bigcup_nS_n\right)x
=
\sum_nE_A(S_n)x
$$

が強収束し、$B$ の有界性により極限と $B$ の作用を交換できるので、可算互いに素和でも閉じます。

一般の可算和は互いに素な差集合へ分解できるため、$\mathcal C$ は σ代数です。

閉集合が生成する σ代数は Borel σ代数なので、

$$
\mathcal C=\mathcal B(\sigma(A)).
$$

従って任意の Borel 集合 $S$ について

$$
BE_A(S)=E_A(S)B.
$$

同じ議論を $B$ のスペクトル PVM に適用すると、$E_A(S)$ は $E_B(T)$ と可換し、

$$
E_A(S)E_B(T)
=
E_B(T)E_A(S).
$$

逆に、すべての $S,T$ でスペクトル射影が可換するとします。

有界単関数

$$
s(\lambda)
=
\sum_j a_j\mathbf 1_{S_j}(\lambda),
\qquad
t(\mu)
=
\sum_k b_k\mathbf 1_{T_k}(\mu)
$$

に対して

$$
s(A)
=
\sum_j a_jE_A(S_j),
$$

$$
t(B)
=
\sum_k b_kE_B(T_k).
$$

仮定により各 $E_A(S_j)$ と $E_B(T_k)$ は可換するので、

$$
s(A)t(B)=t(B)s(A).
$$

座標関数 $\lambda,\mu$ を有界単関数で一様近似すると、

$$
s_n(A)\to A,
\qquad
t_n(B)\to B
$$

が作用素ノルムで成り立ちます。

したがって積の連続性から

$$
s_n(A)t_n(B)\to AB,
$$

$$
t_n(B)s_n(A)\to BA.
$$

各 $n$ で両者は等しいので極限も等しく、

$$
AB=BA.
$$
<!-- proof-end -->

この命題により、無限次元でも

$$
\boxed{
\text{可換性}
\iff
\text{すべてのスペクトル射影が互いに可換}
}
$$

という形で「共通の測定分解」を表せます。

---

## 6. 可換する射影は共通事象を表す

直交射影 $P,Q$ が可換するとします。

このとき

$$
PQ=QP
$$

で、さらに

$$
(PQ)^*
=
Q^*P^*
=
QP
=
PQ
$$

です。

また

$$
(PQ)^2
=
PQPQ
=
P^2Q^2
=
PQ.
$$

従って $PQ$ 自身も直交射影です。

その像は

$$
\operatorname{Ran}(PQ)
=
\operatorname{Ran}(P)
\cap
\operatorname{Ran}(Q).
$$

実際、$x=PQy$ なら

$$
Px=P^2Qy=PQy=x,
$$

$$
Qx=QPQy=PQQy=PQy=x
$$

なので $x$ は両方の像に入ります。

逆に $Px=x$、$Qx=x$ なら

$$
PQx=Px=x.
$$

従って可換する射影の積は、「両方の条件を同時に満たす部分空間」への射影です。

QM3 の PVM に戻ると、

$$
E_A(S)E_B(T)
$$

は

- $A$ の値が $S$ に入る。
- 同時に $B$ の値が $T$ に入る。

という共通部分に対応する射影として読めます。

---

## 7. 逐次射影測定の確率

次に、二つの射影測定を順番に行ったときの確率を計算します。

有限次元で、最初の測定の結果 $a_j$ に対応する射影を $P_j$、二番目の測定の結果 $b_k$ に対応する射影を $Q_k$ とします。

初期状態を単位ベクトル $\psi$ とします。

最初に $a_j$ が出る確率は Born 則から

$$
p_j
=
\|P_j\psi\|^2.
$$

$p_j>0$ とすると、QM2 の理想射影測定後の状態は

$$
\psi_j'
=
\frac{P_j\psi}{\|P_j\psi\|}.
$$

その後に $b_k$ が出る条件付き確率は

$$
\begin{aligned}
\Pr(b_k\mid a_j)
&=
\|Q_k\psi_j'\|^2\\
&=
\frac{\|Q_kP_j\psi\|^2}
{\|P_j\psi\|^2}.
\end{aligned}
$$

従って積の法則から逐次測定の同時確率は

$$
\begin{aligned}
\Pr(a_j\text{ の後に }b_k)
&=
\Pr(a_j)\Pr(b_k\mid a_j)\\
&=
\|P_j\psi\|^2
\frac{\|Q_kP_j\psi\|^2}
{\|P_j\psi\|^2}\\
&=
\boxed{
\|Q_kP_j\psi\|^2
}.
\end{aligned}
$$

逆順なら

$$
\boxed{
\Pr(b_k\text{ の後に }a_j)
=
\|P_jQ_k\psi\|^2
}.
$$

ここに作用素の積の順番がそのまま現れます。

<a id="prop-qm4-sequential-commuting-order"></a>

<!-- formal-statement-start -->
### 命題（可換な射影測定では順序を入れ替えられる）

二つの有限次元射影測定

$$
\{P_j\}_j,
\qquad
\{Q_k\}_k
$$

について、すべての $j,k$ で

$$
P_jQ_k=Q_kP_j
$$

とする。

このとき任意の単位ベクトル $\psi$ に対し、

$$
\Pr(a_j\text{ の後に }b_k)
=
\Pr(b_k\text{ の後に }a_j)
$$

が成り立ち、その共通値は

$$
\|P_jQ_k\psi\|^2
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

逐次測定の式から

$$
\Pr(a_j\text{ の後に }b_k)
=
\|Q_kP_j\psi\|^2,
$$

$$
\Pr(b_k\text{ の後に }a_j)
=
\|P_jQ_k\psi\|^2.
$$

仮定

$$
P_jQ_k=Q_kP_j
$$

により、ノルムの中のベクトルが一致します。

従って

$$
\|Q_kP_j\psi\|^2
=
\|P_jQ_k\psi\|^2.
$$
<!-- proof-end -->

非可換の場合、二つの逐次確率が必ず異なるとは限りません。特定の状態では偶然同じになることもあります。

したがって

$$
[A,B]\ne0
$$

は「ある状態・ある結果について順序効果が起こり得る」という構造上の性質であって、「すべての状態ですべての確率が必ず違う」という意味ではありません。

---

## 8. Stern--Gerlach 型の順序効果

初期状態を

$$
|z+\rangle
=
\begin{pmatrix}
1\\
0
\end{pmatrix}
$$

とします。

### 8.1 そのまま $\sigma_z$ を再測定する

$\sigma_z$ の $+1$ 射影を

$$
P_{z+}
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix}
$$

とすると

$$
P_{z+}|z+\rangle
=
|z+\rangle.
$$

従って再び $z+$ が出る確率は1です。

### 8.2 間に $\sigma_x$ 測定を挟む

$\sigma_x$ の固有状態は

$$
|x+\rangle
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\
1
\end{pmatrix},
\qquad
|x-\rangle
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\
-1
\end{pmatrix}.
$$

$|z+\rangle$ から $\sigma_x$ を測ると

$$
|\langle x+|z+\rangle|^2
=
\frac12,
$$

$$
|\langle x-|z+\rangle|^2
=
\frac12.
$$

$x+$ が出た場合、状態は $|x+\rangle$ になります。この状態から $z+$ を測る確率は

$$
|\langle z+|x+\rangle|^2
=
\frac12.
$$

$x-$ が出た場合も

$$
|\langle z+|x-\rangle|^2
=
\frac12.
$$

従って全確率は

$$
\begin{aligned}
\Pr(\text{最後に }z+)
&=
\frac12\cdot\frac12
+
\frac12\cdot\frac12\\
&=
\frac12.
\end{aligned}
$$

最初は $z+$ が確率1だったのに、途中で $x$ 軸測定を挟むと最後の $z+$ は確率 $1/2$ になります。

これは

$$
[\sigma_z,\sigma_x]\ne0
$$

という非可換性が、逐次射影測定で具体的な順序効果として現れた例です。

ただしここで「不確定性関係を証明した」わけではありません。今行ったのは**状態更新を伴う逐次測定**の計算です。

次に、単一の状態について二つの測定値分布の標準偏差を比較します。

---

## 9. 分散を作用素のノルムとして書く

有界自己共役観測量 $A$ と単位ベクトル $\psi$ を取ります。

QM2・QM3 で、期待値は

$$
\langle A\rangle_\psi
=
\langle\psi,A\psi\rangle
$$

と書けました。

自己共役性からこの値は実数です。

平均を引いた中心化作用素を

$$
\widetilde A_\psi
=
A-\langle A\rangle_\psi I
$$

とします。

[QM2 の分散の作用素表示](../QM2/index.md#prop-qm2-variance-operator)から

$$
\operatorname{Var}_\psi(A)
=
\langle\psi,\widetilde A_\psi^2\psi\rangle.
$$

$\widetilde A_\psi$ も自己共役なので、

$$
\begin{aligned}
\operatorname{Var}_\psi(A)
&=
\langle\psi,
\widetilde A_\psi^*
\widetilde A_\psi
\psi\rangle\\
&=
\langle
\widetilde A_\psi\psi,
\widetilde A_\psi\psi
\rangle\\
&=
\|\widetilde A_\psi\psi\|^2.
\end{aligned}
$$

従って標準偏差を

$$
\Delta_\psi A
=
\sqrt{\operatorname{Var}_\psi(A)}
$$

と書けば、

$$
\boxed{
\Delta_\psi A
=
\|\widetilde A_\psi\psi\|
}
$$

です。

この形にすると、二つの標準偏差の積に Hilbert 空間の Cauchy--Schwarz の不等式を直接使えます。

---

## 10. Robertson 型不確定性関係

二つの有界自己共役観測量 $A,B$ を取り、

$$
a
=
\langle\psi,A\psi\rangle,
\qquad
b
=
\langle\psi,B\psi\rangle
$$

とします。

中心化した作用素を

$$
A'=A-aI,
\qquad
B'=B-bI
$$

と置きます。

すると

$$
\Delta_\psi A=\|A'\psi\|,
\qquad
\Delta_\psi B=\|B'\psi\|.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\Delta_\psi A\,\Delta_\psi B
=
\|A'\psi\|
\|B'\psi\|
\ge
|\langle A'\psi,B'\psi\rangle|.
$$

ここで右辺の複素数の絶対値は、その虚部の絶対値以上なので

$$
|\langle A'\psi,B'\psi\rangle|
\ge
\left|
\operatorname{Im}
\langle A'\psi,B'\psi\rangle
\right|.
$$

あとは虚部を交換子へ書き換えます。

本系列の内積は第1変数で共役線形、第2変数で線形です。従って

$$
\langle A'\psi,B'\psi\rangle
=
\langle\psi,A'B'\psi\rangle.
$$

また

$$
\overline{
\langle A'\psi,B'\psi\rangle
}
=
\langle B'\psi,A'\psi\rangle
=
\langle\psi,B'A'\psi\rangle.
$$

よって

$$
\begin{aligned}
2i\,
\operatorname{Im}
\langle A'\psi,B'\psi\rangle
&=
\langle A'\psi,B'\psi\rangle
-
\overline{
\langle A'\psi,B'\psi\rangle
}\\
&=
\langle\psi,
(A'B'-B'A')\psi
\rangle\\
&=
\langle\psi,[A',B']\psi\rangle.
\end{aligned}
$$

中心化で引いた $aI,bI$ はすべての作用素と可換するため

$$
[A',B']
=
[A,B].
$$

従って

$$
\left|
\operatorname{Im}
\langle A'\psi,B'\psi\rangle
\right|
=
\frac12
\left|
\langle\psi,[A,B]\psi\rangle
\right|.
$$

以上をまとめると、次の不等式が得られます。

<a id="thm-qm4-robertson"></a>

<!-- formal-statement-start -->
### 定理（Robertson 型不確定性関係）

$H$ を複素 Hilbert 空間、$A,B\in\mathcal B(H)$ を有界自己共役作用素、$\psi\in H$ を単位ベクトルとする。

標準偏差を

$$
\Delta_\psi A
=
\sqrt{
\langle\psi,
(A-\langle\psi,A\psi\rangle I)^2
\psi\rangle
},
$$

$$
\Delta_\psi B
=
\sqrt{
\langle\psi,
(B-\langle\psi,B\psi\rangle I)^2
\psi\rangle
}
$$

で定める。

このとき

$$
\boxed{
\Delta_\psi A\,
\Delta_\psi B
\ge
\frac12
\left|
\langle\psi,[A,B]\psi\rangle
\right|
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

平均を引いたベクトル

$$
u=(A-\langle A\rangle_\psi I)\psi,
\qquad
v=(B-\langle B\rangle_\psi I)\psi
$$

を作ります。

標準偏差は $\|u\|,\|v\|$ です。

Cauchy--Schwarz で

$$
\|u\|\|v\|
\ge
|\langle u,v\rangle|
$$

とし、その右辺を虚部だけに弱めます。虚部は

$$
\langle u,v\rangle-\langle v,u\rangle
$$

で取り出せ、これが交換子期待値になります。

<!-- proof-start -->
### 証明

$$
a=\langle\psi,A\psi\rangle,
\qquad
b=\langle\psi,B\psi\rangle
$$

と置き、

$$
u=(A-aI)\psi,
\qquad
v=(B-bI)\psi
$$

とします。

第9節の分散表示から

$$
\|u\|=\Delta_\psi A,
\qquad
\|v\|=\Delta_\psi B.
$$

[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
\Delta_\psi A\,\Delta_\psi B
=
\|u\|\|v\|
\ge
|\langle u,v\rangle|.
$$

任意の複素数 $z$ について

$$
|z|
\ge
|\operatorname{Im}z|
$$

なので

$$
\Delta_\psi A\,\Delta_\psi B
\ge
|\operatorname{Im}\langle u,v\rangle|.
$$

内積規約と自己共役性から

$$
\langle u,v\rangle
=
\langle\psi,(A-aI)(B-bI)\psi\rangle,
$$

$$
\langle v,u\rangle
=
\langle\psi,(B-bI)(A-aI)\psi\rangle.
$$

従って

$$
\begin{aligned}
2i\,\operatorname{Im}\langle u,v\rangle
&=
\langle u,v\rangle-\langle v,u\rangle\\
&=
\langle\psi,
[(A-aI),(B-bI)]
\psi\rangle.
\end{aligned}
$$

$I$ はすべての作用素と可換するため

$$
[(A-aI),(B-bI)]
=
[A,B].
$$

よって

$$
2i\,\operatorname{Im}\langle u,v\rangle
=
\langle\psi,[A,B]\psi\rangle.
$$

絶対値を取ると $|i|=1$ なので

$$
|\operatorname{Im}\langle u,v\rangle|
=
\frac12
\left|
\langle\psi,[A,B]\psi\rangle
\right|.
$$

したがって

$$
\Delta_\psi A\,\Delta_\psi B
\ge
\frac12
\left|
\langle\psi,[A,B]\psi\rangle
\right|.
$$
<!-- proof-end -->

---

## 11. 「非可換なら必ず両方ばらつく」ではない

Robertson 型不等式を

$$
[A,B]\ne0
\quad\Longrightarrow\quad
\Delta_\psi A\,\Delta_\psi B>0
$$

と読んではいけません。

右辺に現れるのは作用素 $[A,B]$ そのものではなく、**その状態 $\psi$ における期待値**

$$
\langle\psi,[A,B]\psi\rangle
$$

だからです。

非零作用素でも、特定の状態に対する期待値が0になることはあります。

たとえば

$$
A=\sigma_x,
\qquad
B=\sigma_z
$$

なら

$$
[\sigma_x,\sigma_z]
=
-2i\sigma_y
\ne0.
$$

しかし $\sigma_x$ の $+1$ 固有状態 $|x+\rangle$ では

$$
\Delta_{x+}\sigma_x=0.
$$

一方、

$$
\langle x+,\sigma_yx+\rangle=0
$$

なので Robertson の右辺も0です。

従って

$$
0
=
\Delta_{x+}\sigma_x\,\Delta_{x+}\sigma_z
\ge
0
$$

となります。

これは矛盾ではありません。

**非可換性は観測量の組の性質、標準偏差は観測量と状態の組の性質**です。

この二つを区別することが、本章で最も重要な注意点の一つです。

---

## 12. spin $1/2$ で不確定性下限を計算する

物理的 spin 成分を

$$
S_x=\frac{\hbar}{2}\sigma_x,
\qquad
S_y=\frac{\hbar}{2}\sigma_y,
\qquad
S_z=\frac{\hbar}{2}\sigma_z
$$

とします。

Pauli 行列の交換関係から

$$
[\sigma_x,\sigma_y]
=
2i\sigma_z
$$

なので

$$
\begin{aligned}
[S_x,S_y]
&=
\frac{\hbar^2}{4}
[\sigma_x,\sigma_y]\\
&=
\frac{\hbar^2}{4}
2i\sigma_z\\
&=
i\hbar
\frac{\hbar}{2}\sigma_z\\
&=
i\hbar S_z.
\end{aligned}
$$

従って Robertson 型不等式は

$$
\boxed{
\Delta_\psi S_x
\,
\Delta_\psi S_y
\ge
\frac{\hbar}{2}
\left|
\langle S_z\rangle_\psi
\right|
}
$$

となります。

### $|z+\rangle$ では等号になる

$|z+\rangle$ は $S_z$ の固有値 $\hbar/2$ の固有状態なので

$$
\langle S_z\rangle_{z+}
=
\frac{\hbar}{2}.
$$

また

$$
\langle\sigma_x\rangle_{z+}=0,
\qquad
\sigma_x^2=I
$$

なので

$$
\operatorname{Var}_{z+}(\sigma_x)
=
\langle\sigma_x^2\rangle
-
\langle\sigma_x\rangle^2
=
1.
$$

従って

$$
\Delta_{z+}S_x
=
\frac{\hbar}{2}.
$$

同様に

$$
\Delta_{z+}S_y
=
\frac{\hbar}{2}.
$$

左辺は

$$
\Delta_{z+}S_x
\Delta_{z+}S_y
=
\frac{\hbar^2}{4}.
$$

右辺は

$$
\frac{\hbar}{2}
\left|
\frac{\hbar}{2}
\right|
=
\frac{\hbar^2}{4}.
$$

従ってこの状態では等号が成立します。

---

## 13. Robertson の証明でどこを弱めたか

この導出では二段階の不等式を使いました。

$$
\|u\|\|v\|
\ge
|\langle u,v\rangle|
\ge
|\operatorname{Im}\langle u,v\rangle|.
$$

最初は Cauchy--Schwarz、二番目は複素数の絶対値が虚部の絶対値以上という事実です。

したがって Robertson 型不等式で等号になるには、少なくとも

1. $u$ と $v$ が複素線形従属で Cauchy--Schwarz が等号になる。
2. $\langle u,v\rangle$ の実部が0である。

必要があります。

つまり

$$
u
=
ic\,v
$$

のように、実数 $c$ を用いて純虚数倍で結ばれる状況が典型的です。

この視点は「いつ不確定性下限が鋭いか」を調べるときに役立ちます。

より強い Schrödinger--Robertson 型の関係では、ここで捨てた実部も保持します。本章の目的は非可換性と最初の不確定性下限を結ぶことなので、主定理は Robertson 型までとします。

---

## 14. 不確定性関係は測定器の精度限界そのものではない

本章の

$$
\Delta_\psi A
$$

は、同じ状態 $\psi$ を多数回準備して観測量 $A$ を測ったときの**測定値分布の標準偏差**です。

したがって Robertson 型不等式は

> 同一状態における二つの観測量の分布の広がりには、交換子期待値が与える下限がある。

という主張です。

一方、実験装置の

- 分解能
- 校正誤差
- ノイズ
- 最初の測定が次の状態へ与える擾乱

は別の概念です。

逐次測定の順序効果は第7--8節で扱いました。Robertson 型不等式は第9--12節で、**一つの状態に対する分散**から導きました。

両者を結び付ける高度な測定誤差・擾乱の理論もありますが、本章の定理そのものはそこを仮定していません。

---

## 15. 可換なら Robertson の下限は0になる

$A$ と $B$ が可換なら

$$
[A,B]=0.
$$

従って Robertson 型不等式は

$$
\Delta_\psi A\,\Delta_\psi B
\ge0
$$

となります。

これは正しいですが、それだけでは

$$
\Delta_\psi A=0,
\qquad
\Delta_\psi B=0
$$

を意味しません。

状態が共通固有ベクトルなら両方0にできますが、共通固有基底の複数成分を重ね合わせた状態なら、両方の分散が正になることがあります。

たとえば

$$
A=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
2&0\\
0&5
\end{pmatrix}
$$

は可換します。

しかし

$$
\psi
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

では $A$ も $B$ も二つの固有値が確率 $1/2$ で現れるため、両方の分散は正です。

可換性が保証するのは**共通固有基底が存在すること**であって、任意の状態でばらつきが消えることではありません。

---

## 16. 非可換性から作用素環へ

一つの観測量だけを見ると、主役はそのスペクトルでした。

二つ以上の観測量を見ると、

$$
A+B,
\qquad
AB,
\qquad
A^*,
\qquad
[A,B]
$$

のように、作用素同士の演算が自然に現れます。

特に非可換な積

$$
AB\ne BA
$$

は、量子系の観測量全体を「単なる関数の集合」としてではなく、**非可換な代数**として見る動機を与えます。

ただし、その前に位置・運動量・Hamiltonian のような重要な観測量を扱うには、非有界作用素へ進まなければなりません。

次の QM5 では

$$
A:D(A)\subset H\to H
$$

という定義域つき作用素を扱い、

- symmetric と self-adjoint の違い
- 閉作用素・closable operator
- 位置作用素
- 運動量作用素

へ進みます。

本章の交換子

$$
[A,B]=AB-BA
$$

も、非有界作用素では「積 $AB$ と $BA$ がどのベクトルで定義されるか」を先に確認しなければなりません。

有限次元では見えなかったこの問題が、QM5 以降の中心になります。

---

## 17. 演習

### Level A

<a id="ex-qm4-a01"></a>
#### QM4-A01 Pauli 行列の交換子
- Level: A

$$
\sigma_x
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
\sigma_z
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
$$

とする。

1. $\sigma_x\sigma_z$ と $\sigma_z\sigma_x$ を計算せよ。
2. $[\sigma_x,\sigma_z]$ を $\sigma_y$ で表せ。
3. $\sigma_x$ と $\sigma_z$ が可換しないことを確認せよ。

<!-- solution-start -->
**解答・解説**

まず

$$
\begin{aligned}
\sigma_x\sigma_z
&=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}\\
&=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
\end{aligned}
$$

次に

$$
\begin{aligned}
\sigma_z\sigma_x
&=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}\\
&=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}.
\end{aligned}
$$

従って

$$
\begin{aligned}
[\sigma_x,\sigma_z]
&=
\sigma_x\sigma_z-\sigma_z\sigma_x\\
&=
\begin{pmatrix}
0&-2\\
2&0
\end{pmatrix}.
\end{aligned}
$$

一方、

$$
\sigma_y
=
\begin{pmatrix}
0&-i\\
i&0
\end{pmatrix}
$$

なので

$$
-2i\sigma_y
=
\begin{pmatrix}
0&-2\\
2&0
\end{pmatrix}.
$$

よって

$$
\boxed{
[\sigma_x,\sigma_z]
=
-2i\sigma_y
}.
$$

これは零作用素ではないため、

$$
\sigma_x\sigma_z\ne\sigma_z\sigma_x.
$$

従って $\sigma_x$ と $\sigma_z$ は可換しません。
<!-- solution-end -->

<a id="ex-qm4-a02"></a>
#### QM4-A02 共通対角基底
- Level: A

$$
A=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&-2
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
3&0&0\\
0&-4&0\\
0&0&5
\end{pmatrix}
$$

とする。

1. $AB=BA$ を直接確認せよ。
2. 標準基底が $A,B$ の共通固有基底であることを確認せよ。
3. $A$ の固有値1が縮退していても、$B$ によりその二次元固有空間内をさらに分解できることを説明せよ。

<!-- solution-start -->
**解答・解説**

対角行列同士なので

$$
AB
=
\begin{pmatrix}
3&0&0\\
0&-4&0\\
0&0&-10
\end{pmatrix}
=
BA.
$$

従って $A,B$ は可換します。

標準基底を $e_1,e_2,e_3$ とすると

$$
Ae_1=e_1,
\qquad
Ae_2=e_2,
\qquad
Ae_3=-2e_3,
$$

$$
Be_1=3e_1,
\qquad
Be_2=-4e_2,
\qquad
Be_3=5e_3.
$$

従って各 $e_j$ は両方の固有ベクトルです。

$A$ の固有値1の固有空間は

$$
E_1(A)
=
\operatorname{span}\{e_1,e_2\}.
$$

この二次元空間を $B$ は保ち、その制限は

$$
\begin{pmatrix}
3&0\\
0&-4
\end{pmatrix}
$$

です。

従って $B$ の固有ベクトル $e_1,e_2$ により、$A$ だけでは区別できなかった二方向をさらに分解できます。これが同時対角化定理の証明で行っている操作です。
<!-- solution-end -->

<a id="ex-qm4-a03"></a>
#### QM4-A03 $|z+\rangle$ における Pauli 行列の分散
- Level: A

$$
|z+\rangle
=
\begin{pmatrix}
1\\
0
\end{pmatrix}
$$

とする。

1. $\langle\sigma_x\rangle$、$\langle\sigma_y\rangle$、$\langle\sigma_z\rangle$ を求めよ。
2. $\sigma_x^2=\sigma_y^2=\sigma_z^2=I$ を使って各分散を求めよ。
3. $\sigma_x,\sigma_y$ に対する Robertson 型不等式を確認せよ。

<!-- solution-start -->
**解答・解説**

まず

$$
\sigma_x|z+\rangle
=
\begin{pmatrix}
0\\
1
\end{pmatrix},
$$

なので

$$
\langle z+,\sigma_x z+\rangle
=
0.
$$

同様に

$$
\sigma_y|z+\rangle
=
\begin{pmatrix}
0\\
i
\end{pmatrix}
$$

だから

$$
\langle\sigma_y\rangle_{z+}=0.
$$

一方、

$$
\sigma_z|z+\rangle
=
|z+\rangle
$$

なので

$$
\langle\sigma_z\rangle_{z+}=1.
$$

各 Pauli 行列は

$$
\sigma_j^2=I
$$

を満たします。

従って

$$
\operatorname{Var}_{z+}(\sigma_x)
=
\langle I\rangle-0^2
=
1,
$$

$$
\operatorname{Var}_{z+}(\sigma_y)
=
1,
$$

$$
\operatorname{Var}_{z+}(\sigma_z)
=
1-1^2
=
0.
$$

よって

$$
\Delta\sigma_x=1,
\qquad
\Delta\sigma_y=1,
\qquad
\Delta\sigma_z=0.
$$

さらに

$$
[\sigma_x,\sigma_y]
=
2i\sigma_z
$$

なので Robertson の右辺は

$$
\frac12
\left|
\langle z+,2i\sigma_z z+\rangle
\right|
=
\frac12|2i|
=
1.
$$

左辺も

$$
\Delta\sigma_x\Delta\sigma_y
=
1.
$$

従って

$$
1\ge1
$$

で、等号が成立します。
<!-- solution-end -->

<a id="ex-qm4-a04"></a>
#### QM4-A04 $x$ 測定を挟んだ $z$ 再測定
- Level: A

初期状態を $|z+\rangle$ とする。

1. 直接 $\sigma_z$ を測れば $z+$ が確率1で出ることを示せ。
2. 先に $\sigma_x$ を測ると $x+$ と $x-$ がそれぞれ確率 $1/2$ で出ることを示せ。
3. その後 $\sigma_z$ を測ると、最終的な $z+$ の確率が $1/2$ になることを示せ。

<!-- solution-start -->
**解答・解説**

$|z+\rangle$ は $\sigma_z$ の固有値 $+1$ の固有状態なので、Born 則から直接の $z+$ 測定確率は1です。

次に

$$
|z+\rangle
=
\frac1{\sqrt2}
\left(
|x+\rangle+|x-\rangle
\right)
$$

なので

$$
|\langle x+|z+\rangle|^2
=
\frac12,
$$

$$
|\langle x-|z+\rangle|^2
=
\frac12.
$$

$x+$ が出た後の状態は $|x+\rangle$ です。

$$
|x+\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right)
$$

なので

$$
\Pr(z+\mid x+)
=
\frac12.
$$

同様に

$$
|x-\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle-|z-\rangle
\right)
$$

から

$$
\Pr(z+\mid x-)
=
\frac12.
$$

全確率の公式より

$$
\begin{aligned}
\Pr(\text{最後に }z+)
&=
\Pr(x+)\Pr(z+\mid x+)\\
&\quad+
\Pr(x-)\Pr(z+\mid x-)\\
&=
\frac12\cdot\frac12
+
\frac12\cdot\frac12\\
&=
\frac12.
\end{aligned}
$$

途中の非可換な $x$ 測定によって、最初に確定していた $z$ 測定の統計が変わりました。
<!-- solution-end -->

<a id="ex-qm4-a05"></a>
#### QM4-A05 非可換でも Robertson の右辺が0になる状態
- Level: A

$$
A=\sigma_x,
\qquad
B=\sigma_z,
\qquad
\psi=|x+\rangle
$$

とする。

1. $[A,B]\ne0$ を確認せよ。
2. $\Delta_\psi A=0$ を示せ。
3. Robertson 型不等式の右辺も0であることを示せ。
4. この例から「非可換」と「特定状態で正の下限を持つ」が同じ意味ではないことを説明せよ。

<!-- solution-start -->
**解答・解説**

QM4-A01 から

$$
[A,B]
=
[\sigma_x,\sigma_z]
=
-2i\sigma_y
\ne0.
$$

一方、$|x+\rangle$ は $\sigma_x$ の固有値 $+1$ の固有状態なので

$$
A|x+\rangle
=
|x+\rangle.
$$

従って測定値は確率1で $+1$ に決まり、

$$
\Delta_\psi A=0.
$$

Robertson の右辺は

$$
\frac12
\left|
\langle x+,-2i\sigma_y x+\rangle
\right|.
$$

直接計算すると

$$
\langle x+,\sigma_yx+\rangle=0
$$

なので右辺も0です。

従って不等式は

$$
0\ge0
$$

となります。

$[A,B]\ne0$ は作用素の組の非可換性を表します。一方、Robertson の右辺は状態依存の量

$$
\langle\psi,[A,B]\psi\rangle
$$

です。非零作用素でも特定の状態では期待値が0になり得るため、両者は区別しなければなりません。
<!-- solution-end -->

### Level B

<a id="ex-qm4-b01"></a>
#### QM4-B01 同時対角化定理を固有空間から再証明する
- Level: B

有限次元複素 Hilbert 空間上の自己共役作用素 $A,B$ が

$$
AB=BA
$$

を満たすとする。

次を順に示し、$A,B$ が共通正規直交固有基底を持つことを証明せよ。

1. $A$ の各固有空間 $E_\lambda(A)$ が $B$ で不変である。
2. $B|_{E_\lambda(A)}$ が自己共役である。
3. 各 $E_\lambda(A)$ の中で $B$ を対角化し、それらの基底を合わせればよい。

<!-- solution-start -->
**解答・解説**

$v\in E_\lambda(A)$ とします。

$$
Av=\lambda v.
$$

可換性から

$$
\begin{aligned}
A(Bv)
&=
ABv\\
&=
BAv\\
&=
B(\lambda v)\\
&=
\lambda Bv.
\end{aligned}
$$

従って

$$
Bv\in E_\lambda(A).
$$

よって各 $E_\lambda(A)$ は $B$ で不変です。

次に $x,y\in E_\lambda(A)$ とします。$B=B^*$ なので

$$
\langle Bx,y\rangle
=
\langle x,By\rangle.
$$

第1問から $Bx,By$ はともに $E_\lambda(A)$ に属します。従って制限作用素

$$
B_\lambda
=
B|_{E_\lambda(A)}
$$

は $E_\lambda(A)$ 上で自己共役です。

有限次元自己共役作用素は正規直交固有基底を持つので、各 $E_\lambda(A)$ の中で $B_\lambda$ の正規直交固有基底を選べます。

$A$ は $E_\lambda(A)$ 上で

$$
A=\lambda I
$$

として作用するため、その基底の各ベクトルは自動的に $A$ の固有ベクトルでもあります。

最後に

$$
H
=
\bigoplus_\lambda E_\lambda(A)
$$

は直交直和なので、各固有空間で選んだ基底をすべて合わせれば $H$ の正規直交基底になります。

その各ベクトルは $A$ と $B$ の共通固有ベクトルです。
<!-- solution-end -->

<a id="ex-qm4-b02"></a>
#### QM4-B02 可換する二つの射影の積
- Level: B

直交射影 $P,Q$ が

$$
PQ=QP
$$

を満たすとする。

1. $PQ$ が自己共役であることを示せ。
2. $(PQ)^2=PQ$ を示せ。
3. $\operatorname{Ran}(PQ)=\operatorname{Ran}(P)\cap\operatorname{Ran}(Q)$ を示せ。
4. この結果を二つの可換する射影測定の「共通事象」と解釈せよ。

<!-- solution-start -->
**解答・解説**

直交射影なので

$$
P^*=P,
\qquad
Q^*=Q.
$$

従って

$$
(PQ)^*
=
Q^*P^*
=
QP
=
PQ.
$$

よって $PQ$ は自己共役です。

また可換性を使うと

$$
\begin{aligned}
(PQ)^2
&=
PQPQ\\
&=
PPQQ\\
&=
P^2Q^2\\
&=
PQ.
\end{aligned}
$$

従って $PQ$ も直交射影です。

$x\in\operatorname{Ran}(PQ)$ とします。ある $y$ が存在して

$$
x=PQy.
$$

すると

$$
Px
=
P^2Qy
=
PQy
=
x.
$$

また

$$
Qx
=
QPQy
=
PQQy
=
PQy
=
x.
$$

従って $x$ は $\operatorname{Ran}(P)$ と $\operatorname{Ran}(Q)$ の両方に入ります。

逆に

$$
Px=x,
\qquad
Qx=x
$$

なら

$$
PQx
=
Px
=
x.
$$

従って

$$
x\in\operatorname{Ran}(PQ).
$$

以上から

$$
\operatorname{Ran}(PQ)
=
\operatorname{Ran}(P)
\cap
\operatorname{Ran}(Q).
$$

射影 $P,Q$ を二つの測定結果に対応する射影とみなすと、$PQ$ は「両方の結果条件を同時に満たす成分」への射影です。可換性があるからこそ、積が再び直交射影になり、共通事象として読めます。
<!-- solution-end -->

<a id="ex-qm4-b03"></a>
#### QM4-B03 Robertson 型不等式の等号条件を追う
- Level: B

Robertson 型不等式の証明で

$$
u=(A-\langle A\rangle_\psi I)\psi,
\qquad
v=(B-\langle B\rangle_\psi I)\psi
$$

と置いた。

1. 証明中の二つの不等式を書け。
2. Robertson 型不等式で等号が成立するために必要な条件を、それぞれの不等式の等号条件から説明せよ。
3. $u=icv$ を満たす実数 $c$ が存在するとき、二つの条件を同時に満たすことを確認せよ。

<!-- solution-start -->
**解答・解説**

証明で使った不等式は

$$
\|u\|\|v\|
\ge
|\langle u,v\rangle|
$$

と

$$
|\langle u,v\rangle|
\ge
|\operatorname{Im}\langle u,v\rangle|
$$

です。

最初は Cauchy--Schwarz の不等式です。等号が成立するには、$u$ と $v$ が複素線形従属であることが必要です。

二番目は複素数

$$
z=\langle u,v\rangle
$$

について

$$
|z|
\ge
|\operatorname{Im}z|
$$

を使ったものです。等号には

$$
\operatorname{Re}z=0
$$

が必要です。

ここで

$$
u=icv,
\qquad
c\in\mathbb R
$$

とします。

$u$ と $v$ は明らかに複素線形従属なので、Cauchy--Schwarz は等号です。

また本系列の内積は第1変数で共役線形なので

$$
\langle u,v\rangle
=
\langle icv,v\rangle
=
-ic\langle v,v\rangle.
$$

$\langle v,v\rangle=\|v\|^2$ は実数なので、$\langle u,v\rangle$ は純虚数です。

従って実部は0で、二番目の不等式も等号になります。

したがって $u=icv$ は Robertson 型不等式が鋭くなる典型的な条件です。
<!-- solution-end -->

### Level C

<a id="ex-qm4-c01"></a>
#### QM4-C01 非可換性・逐次測定・不確定性を一つの spin 系で結ぶ
- Level: C

spin $1/2$ の

$$
S_x=\frac{\hbar}{2}\sigma_x,
\qquad
S_y=\frac{\hbar}{2}\sigma_y,
\qquad
S_z=\frac{\hbar}{2}\sigma_z
$$

を考え、初期状態を $|z+\rangle$ とする。

次を行え。

1. $[S_x,S_y]=i\hbar S_z$ を行列計算から導け。
2. $|z+\rangle$ における $\Delta S_x$、$\Delta S_y$、$\langle S_z\rangle$ を求め、Robertson 型不等式で等号が成立することを示せ。
3. $|z+\rangle$ から $S_x$ を測り、その結果を選別せずに再び $S_z$ を測ると、最後の $z+$ と $z-$ がそれぞれ確率 $1/2$ になることを示せ。
4. 第2問と第3問がそれぞれ何を述べており、「不確定性関係＝測定による擾乱」と同一視してはいけない理由を説明せよ。

<!-- solution-start -->
**解答・解説**

まず

$$
[\sigma_x,\sigma_y]
=
2i\sigma_z
$$

なので

$$
\begin{aligned}
[S_x,S_y]
&=
\left[
\frac{\hbar}{2}\sigma_x,
\frac{\hbar}{2}\sigma_y
\right]\\
&=
\frac{\hbar^2}{4}
[\sigma_x,\sigma_y]\\
&=
\frac{\hbar^2}{4}
2i\sigma_z\\
&=
i\hbar
\frac{\hbar}{2}\sigma_z\\
&=
i\hbar S_z.
\end{aligned}
$$

次に $|z+\rangle$ では

$$
\langle\sigma_x\rangle=0,
\qquad
\langle\sigma_y\rangle=0,
\qquad
\langle\sigma_z\rangle=1.
$$

また

$$
\sigma_x^2=\sigma_y^2=I.
$$

従って

$$
\operatorname{Var}(S_x)
=
\left(\frac{\hbar}{2}\right)^2,
$$

$$
\operatorname{Var}(S_y)
=
\left(\frac{\hbar}{2}\right)^2.
$$

よって

$$
\Delta S_x
=
\frac{\hbar}{2},
\qquad
\Delta S_y
=
\frac{\hbar}{2}.
$$

また

$$
\langle S_z\rangle
=
\frac{\hbar}{2}.
$$

Robertson の左辺は

$$
\Delta S_x\Delta S_y
=
\frac{\hbar^2}{4}.
$$

右辺は

$$
\begin{aligned}
\frac12
\left|
\langle[S_x,S_y]\rangle
\right|
&=
\frac12
\left|
i\hbar\langle S_z\rangle
\right|\\
&=
\frac12
\hbar
\frac{\hbar}{2}\\
&=
\frac{\hbar^2}{4}.
\end{aligned}
$$

従って等号です。

次に逐次測定を考えます。

$$
|z+\rangle
=
\frac1{\sqrt2}
\left(
|x+\rangle+|x-\rangle
\right)
$$

なので、$S_x$ の二つの結果はそれぞれ確率 $1/2$ です。

$x+$ が出た後は $|x+\rangle$、$x-$ が出た後は $|x-\rangle$ になります。

どちらについても

$$
|\langle z+|x\pm\rangle|^2
=
\frac12,
$$

$$
|\langle z-|x\pm\rangle|^2
=
\frac12.
$$

従って中間の $S_x$ の結果を選別しない場合、

$$
\Pr(\text{最後に }z+)
=
\frac12\cdot\frac12
+
\frac12\cdot\frac12
=
\frac12,
$$

$$
\Pr(\text{最後に }z-)
=
\frac12.
$$

第2問は、**一つの固定した状態 $|z+\rangle$ における $S_x$ と $S_y$ の測定値分布の標準偏差**を比較しています。測定を実際に一度行って状態を変更する手続きは証明に入っていません。

第3問は、**実際に $S_x$ の理想射影測定を途中に挟み、その状態更新後に $S_z$ を測る逐次測定**を計算しています。

どちらも非可換性に由来する量子構造を反映しますが、

- 第2問は preparation uncertainty。
- 第3問は measurement order / state update。

という別の数学的主張です。

従って Robertson 型不確定性関係を「最初の測定器が次の測定器を乱すから」とだけ説明すると、定理が実際に述べている分散の関係を取り違えてしまいます。
<!-- solution-end -->

---

## 18. この章で何を得たか

QM3 では、一つの観測量を PVM で分解しました。

本章では二つの観測量を同時に扱い、

$$
[A,B]=AB-BA
$$

という交換子を導入しました。

その結果、

- 有限次元自己共役作用素では
  $$
  [A,B]=0
  \iff
  \text{共通正規直交固有基底が存在する}
  $$
  ことを証明した。
- 一般の有界自己共役作用素では、可換性がスペクトル射影同士の可換性として表されることを見た。
- 可換する射影の積が共通部分への射影になることを確認した。
- 逐次射影測定の確率が
  $$
  \|Q_kP_j\psi\|^2
  $$
  と作用素の順序を直接含むことを導いた。
- 標準偏差を中心化作用素のノルムで表し、Cauchy--Schwarz から
  $$
  \Delta_\psi A\,\Delta_\psi B
  \ge
  \frac12
  |\langle\psi,[A,B]\psi\rangle|
  $$
  を証明した。
- 非可換性と、特定状態で不確定性下限が正になることは同じではないと確認した。
- Robertson 型不確定性関係と、逐次測定による状態更新・順序効果を区別した。

ここまでは有界作用素なら、積 $AB$ も $BA$ も Hilbert 空間全体で定義されるため、交換子は安全に書けました。

次の QM5 では、位置・運動量・Hamiltonian のような非有界観測量へ進みます。

そこでは

$$
A:D(A)\subset H\to H
$$

と定義域を明示しなければならず、

$$
AB,
\qquad
BA,
\qquad
[A,B]
$$

の各式が**どのベクトル上で意味を持つのか**が本質になります。

有限次元で隠れていた「symmetric と self-adjoint は同じではない」という問題も、ここから表面化します。
