# F0-00D3A π–λ定理：π-system・Dynkin族・測度の一意性

Carathéodory拡張定理や積測度の証明では、しばしば

> ある性質が「長方形」や「algebra上」では分かっている。それを、その集合族が生成する **σ代数全体** に広げたい。

という場面が現れます。

このとき使う代表的な道具が **π–λ定理（Dynkinのπ–λ定理）** です。

このページでは、後続の測度論で π-system・Dynkin族・π–λ定理が出てきても止まらないよう、必要な部分だけ先に整備します。

---

## 1. π-system：有限交差で閉じた集合族

<a id="def-f0-00d3a-pi-system"></a>

<!-- formal-statement-start -->
**定義（π-system）**  
全体集合 $\Omega$ の部分集合からなる族 $\mathcal P$ が **π-system** であるとは、任意の $A,B\in\mathcal P$ に対して

$$
A\cap B\in\mathcal P
$$

が成り立つことです。
<!-- formal-statement-end -->

要するに、**二つ取って交わりを作っても同じ集合族から出ない**、という条件です。

<!-- definition-example-start: def-f0-00d3a-pi-system -->
### 例：可測長方形はπ-system

**定義の確認**

$\mathcal A,\mathcal B$ をそれぞれ $X,Y$ 上のσ代数とし、

$$
\mathcal P
=\{A\times B:A\in\mathcal A,\ B\in\mathcal B\}
$$

とします。二つの長方形について

$$
(A_1\times B_1)\cap(A_2\times B_2)
=(A_1\cap A_2)\times(B_1\cap B_2).
$$

σ代数は有限交差で閉じるので $A_1\cap A_2\in\mathcal A$、$B_1\cap B_2\in\mathcal B$ です。したがって右辺も $\mathcal P$ に属し、$\mathcal P$ はπ-systemです。
<!-- definition-example-end -->

この例が積測度でそのまま出てきます。

---

## 2. Dynkin族（λ-system）

<a id="def-f0-00d3a-dynkin-system"></a>

<!-- formal-statement-start -->
**定義（Dynkin族 / λ-system）**  
全体集合 $\Omega$ の部分集合からなる族 $\mathcal D$ が **Dynkin族（λ-system）** であるとは、次の3条件を満たすことです。

1. $\Omega\in\mathcal D$。
2. $A\in\mathcal D$ なら $A^c\in\mathcal D$。
3. $A_1,A_2,\ldots\in\mathcal D$ が互いに素なら

   $$
   \bigcup_{n=1}^{\infty}A_n\in\mathcal D.
   $$
<!-- formal-statement-end -->

σ代数にかなり似ていますが、Dynkin族が仮定する可算和の閉性は **互いに素な集合列だけ** です。そのぶんσ代数より弱い概念です。

<!-- definition-example-start: def-f0-00d3a-dynkin-system -->
### 例：一つの集合とその補集合からなるDynkin族

**定義の確認**

固定した $A\subset\Omega$ に対して

$$
\mathcal D=\{\varnothing,A,A^c,\Omega\}
$$

を考えます。$\Omega\in\mathcal D$ で、補集合を取っても $\mathcal D$ 内に残ります。

また、$\mathcal D$ の互いに素な集合を可算個並べても、非空なものは高々 $A$ と $A^c$ なので、その和集合は $\varnothing,A,A^c,\Omega$ のいずれかです。したがって $\mathcal D$ はDynkin族です。
<!-- definition-example-end -->

---

## 3. なぜπ-systemとDynkin族を組み合わせるのか

測度の一意性証明では、二つの測度 $\mu,\nu$ が一致する集合全体

$$
\mathcal D
=\{A:\mu(A)=\nu(A)\}
$$

を考えるのが典型です。

有限測度の状況では、この $\mathcal D$ がDynkin族になることは、測度の補集合・互いに素な可算和の性質から示しやすいです。

一方、最初から一致が分かっている集合族は、区間・長方形・algebraなどで、有限交差に強いことが多い。そこで

- 出発点：π-system
- 一致が保存される大きな集合族：Dynkin族
- 目標：生成σ代数全体

をつなぐのがπ–λ定理です。

---

## 4. π–λ定理

<a id="thm-f0-00d3a-pi-lambda"></a>

<!-- formal-statement-start -->
**定理（π–λ定理 / Dynkinのπ–λ定理）**  
$\mathcal P$ を $\Omega$ 上のπ-system、$\mathcal D$ を $\Omega$ 上のDynkin族とします。もし

$$
\mathcal P\subset\mathcal D
$$

なら

$$
\boxed{\sigma(\mathcal P)\subset\mathcal D}
$$

が成り立ちます。
<!-- formal-statement-end -->

ここで $\sigma(\mathcal P)$ は $\mathcal P$ を含む最小のσ代数です。

つまり、**π-system上で確認した性質がDynkin族として閉じているなら、その性質は生成σ代数全体まで広がる**、という定理です。

### 証明の見取り図

$\lambda(\mathcal P)$ を $\mathcal P$ を含む最小のDynkin族とします。示したいのは

$$
\lambda(\mathcal P)=\sigma(\mathcal P)
$$

です。

ポイントは、π-systemの有限交差閉性を使って、$\lambda(\mathcal P)$ 自身も有限交差で閉じることを示すことです。Dynkin族が有限交差でも閉じればσ代数になります。

<!-- proof-start -->
### 証明

$\lambda(\mathcal P)$ を $\mathcal P$ を含む最小のDynkin族とします。

まず固定した $A\in\mathcal P$ に対し

$$
\mathcal D_A
=\{B\in\lambda(\mathcal P):A\cap B\in\lambda(\mathcal P)\}
$$

と置きます。Dynkin族の3条件を確認すると $\mathcal D_A$ もDynkin族です。

さらに $B\in\mathcal P$ なら、$\mathcal P$ はπ-systemなので

$$
A\cap B\in\mathcal P\subset\lambda(\mathcal P).
$$

したがって $\mathcal P\subset\mathcal D_A$ です。$\lambda(\mathcal P)$ の最小性から

$$
\lambda(\mathcal P)\subset\mathcal D_A.
$$

よって

$$
A\in\mathcal P,\ B\in\lambda(\mathcal P)
\quad\Longrightarrow\quad
A\cap B\in\lambda(\mathcal P).
$$

次に固定した $B\in\lambda(\mathcal P)$ に対して

$$
\mathcal E_B
=\{A\in\lambda(\mathcal P):A\cap B\in\lambda(\mathcal P)\}
$$

と置きます。同じ計算で $\mathcal E_B$ はDynkin族です。上で示した結果により $\mathcal P\subset\mathcal E_B$ なので、再び最小性から

$$
\lambda(\mathcal P)\subset\mathcal E_B.
$$

従って $\lambda(\mathcal P)$ は有限交差で閉じています。

Dynkin族は補集合で閉じ、さらに互いに素な可算和で閉じています。有限交差閉性も得たので、任意の可算和を互いに素な和へ分解でき、$\lambda(\mathcal P)$ はσ代数です。

よって $\mathcal P$ を含む最小のσ代数 $\sigma(\mathcal P)$ について

$$
\sigma(\mathcal P)\subset\lambda(\mathcal P).
$$

逆にσ代数はDynkin族なので、$\lambda(\mathcal P)$ の最小性から

$$
\lambda(\mathcal P)\subset\sigma(\mathcal P).
$$

従って

$$
\boxed{\lambda(\mathcal P)=\sigma(\mathcal P)}.
$$

特に、$\mathcal P\subset\mathcal D$ で $\mathcal D$ がDynkin族なら

$$
\sigma(\mathcal P)
=\lambda(\mathcal P)
\subset\mathcal D.
$$
<!-- proof-end -->

---

## 5. 後続章でどう使うか

### 5.1 Carathéodory拡張の一意性

D4で定義する集合のalgebra上で一致する二つの測度について

$$
\mathcal D=\{A:\mu(A)=\nu(A)\}
$$

を作り、$\mathcal D$ がDynkin族であることを示します。出発点のalgebraは有限交差で閉じるのでπ-systemです。

したがって[π–λ定理](#thm-f0-00d3a-pi-lambda)により、そのalgebraが生成するσ代数全体で二つの測度が一致します。

### 5.2 積測度

可測長方形

$$
A\times B
$$

の族はπ-systemです。断面積分の公式が成立する集合全体がDynkin族になることを示せば、π–λ定理によって積σ代数全体へ公式を拡張できます。

この「**長方形で確認 → Dynkin族を作る → 生成σ代数へ拡張**」が積測度・Tonelli・Fubiniの証明で繰り返し現れる型です。

---

## 演習

### F0-00D3A-A01 π-systemの確認

- Level: A
- 目安時間: 8分

$\mathcal A$ を $\Omega$ 上のσ代数とする。$\mathcal A$ がπ-systemであることを示せ。

<!-- solution-start -->
#### 詳細解答
σ代数は可算和と補集合で閉じるので、De Morgan則から有限交差でも閉じる。従って $A,B\in\mathcal A$ なら $A\cap B\in\mathcal A$ であり、π-systemの定義を満たす。
#### 本番答案
$A\cap B=(A^c\cup B^c)^c$。σ代数の可算和・補集合閉性より右辺は $\mathcal A$ に属する。従って $\mathcal A$ はπ-system。
#### 採点基準（20点）
- σ代数の閉性を使う: 8点
- De Morgan則で交差閉性を示す: 8点
- π-systemと結論する: 4点
<!-- solution-end -->

### F0-00D3A-B01 一致集合族から一意性へ

- Level: B
- 目安時間: 15分

有限測度 $\mu,\nu$ がπ-system $\mathcal P$ 上で一致し、$\mu(\Omega)=\nu(\Omega)<\infty$ とする。

$$
\mathcal D=\{A\in\sigma(\mathcal P):\mu(A)=\nu(A)\}
$$

がDynkin族であることを示し、$\mu=\nu$ on $\sigma(\mathcal P)$ を結論せよ。

<!-- solution-start -->
#### 詳細解答
$\Omega\in\mathcal D$ は仮定から従う。$A\in\mathcal D$ なら有限性より $\mu(A^c)=\mu(\Omega)-\mu(A)=\nu(\Omega)-\nu(A)=\nu(A^c)$ なので $A^c\in\mathcal D$。互いに素な $A_n\in\mathcal D$ については可算加法性から $\mu(\cup_nA_n)=\sum_n\mu(A_n)=\sum_n\nu(A_n)=\nu(\cup_nA_n)$。従って $\mathcal D$ はDynkin族で、$\mathcal P\subset\mathcal D$。[π–λ定理](#thm-f0-00d3a-pi-lambda)より $\sigma(\mathcal P)\subset\mathcal D$、よって両測度は $\sigma(\mathcal P)$ 上で一致する。
#### 本番答案
$\Omega$、補集合、互いに素な可算和について測度の一致が保存されるので $\mathcal D$ はDynkin族。$\mathcal P\subset\mathcal D$ [だからπ–λ定理](#thm-f0-00d3a-pi-lambda)より $\sigma(\mathcal P)\subset\mathcal D$。従って $\mu=\nu$ on $\sigma(\mathcal P)$。
#### 採点基準（20点）
- Dynkin族3条件: 12点
- $\mathcal P\subset\mathcal D$: 3点
- π–λ定理の適用と結論: 5点
<!-- solution-end -->

---

## 次に進む

**次：[F0-00D4 Lebesgue測度・Borel集合・拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)**