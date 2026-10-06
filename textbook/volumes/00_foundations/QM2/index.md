# QM2 状態・観測量・Born 則

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[QM1 の Hilbert 空間の ray](../QM1/index.md#def-qm1-hilbert-ray)、[LA5 の複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)、[FA7 の自己共役有界作用素](../FA7/index.md#def-fa7-self-adjoint)を使います。

QM1 では、二重スリットと Stern--Gerlach 型実験を手掛かりに、量子状態を複素 Hilbert 空間で表す動機を作りました。しかし、そこでは意図的に一つの穴を残しました。

$$
\boxed{
\text{状態ベクトルが与えられたとき、実際の測定結果の確率をどう計算するのか}
}
$$

です。

「基底の係数を二乗すればよい」とだけ覚えると、すぐに困ります。測定装置を変えれば使う基底も変わりますし、同じ固有値に複数の固有ベクトルが対応する場合には、どの係数を二乗すべきかが分からなくなるからです。

そこで本章では、有限次元を主舞台にして

$$
\text{状態}
\longrightarrow
\text{観測量}
\longrightarrow
\text{固有空間への射影}
\longrightarrow
\text{Born 則}
\longrightarrow
\text{期待値・分散}
$$

という一続きの測定形式を作ります。

重要なのは、**Born 則は線形代数から証明される定理ではない**という点です。QM1 で見た実験統計を記述するために量子理論が採用する基本公理です。一方、Born 則を採用した後に確率の総和が1になること、期待値が内積で書けること、全体位相が測定統計を変えないことは数学的に導けます。

また本章では、位置・運動量のような非有界作用素をまだ扱いません。非有界観測量では定義域が本質になるため、QM5 で改めて扱います。QM2 の目的は、まず有限次元で測定形式を完全に手で計算できるようにすることです。

---

## 1. 純粋状態：ray を計算用の単位ベクトルへ戻す

QM1 では、非零ベクトル $\psi$ と $c\psi$ が同じ ray を生成すると定義しました。特に全体位相

$$
e^{i\theta}\psi
$$

を掛けても、内積の絶対値二乗は変わりませんでした。

物理状態そのものを ray として扱う一方、実際の計算では ray の代表を一つ選ぶ必要があります。さらに Born 則で確率の総和を1にしたいので、代表ベクトルはノルム1に正規化します。

<a id="def-qm2-normalized-pure-state"></a>

<!-- formal-statement-start -->
### 定義（純粋状態の単位ベクトル代表）

複素 Hilbert 空間 $H$ の純粋状態を ray $[\psi]$ で表す。計算では、その ray に属するベクトルのうち

$$
\|\psi\|=1
$$

を満たすものを一つ選び、**純粋状態の単位ベクトル代表**と呼ぶ。

二つの単位ベクトル $\psi,\phi$ が同じ純粋状態を表すのは、ある $\theta\in\mathbb R$ が存在して

$$
\phi=e^{i\theta}\psi
$$

となるときである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm2-normalized-pure-state -->
### 直接例：同じ ray の中で正規化する

**定義の確認**：まず

$$
v=
\begin{pmatrix}
1\\
i
\end{pmatrix}
$$

とします。ノルムは

$$
\|v\|^2
=
|1|^2+|i|^2
=
2
$$

なので、

$$
\psi
=
\frac{1}{\sqrt2}
\begin{pmatrix}
1\\
i
\end{pmatrix}
$$

は同じ ray に属する単位ベクトルです。

さらに

$$
\phi=e^{i\pi/5}\psi
$$

もノルム1で、$\psi$ と同じ ray を生成します。従って $\psi$ と $\phi$ は同じ純粋状態の異なる単位ベクトル代表です。
<!-- definition-example-end -->

この「状態そのものは ray、計算では単位ベクトル」という二層を分けておくと、後で全体位相を余計な自由度として数えずに済みます。

---

## 2. 観測量：なぜ自己共役作用素なのか

次に測定対象を数学で表します。

Stern--Gerlach 型実験では、装置を固定すると $+$ と $-$ のような実数値の測定結果が現れます。有限次元では、これを「ある線形作用素の固有値が測定値候補になる」とモデル化したいわけです。

しかし一般の複素行列は複素固有値を持ち得ます。測定器の目盛として実数を得たいなら、固有値が実数になるクラスが欲しくなります。

LA5 で学んだ Hermitian 作用素、FA7 の言葉では自己共役作用素がちょうどその役割を果たします。有限次元では両者は同じ条件

$$
A^*=A
$$

です。

<a id="def-qm2-finite-observable"></a>

<!-- formal-statement-start -->
### 定義（有限次元の観測量）

有限次元複素 Hilbert 空間 $H$ 上の **観測量** とは、自己共役線形作用素

$$
A:H\to H,
\qquad
A^*=A
$$

のことである。

$A$ の固有値を、その観測量の測定値候補とみなす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm2-finite-observable -->
### 直接例：$z$ 軸の二準位観測量

$\mathbb C^2$ で

$$
\sigma_z
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix}
$$

とします。

$$
\sigma_z^*
=
\sigma_z
$$

なので $\sigma_z$ は自己共役です。

標準基底

$$
|z+\rangle
=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
|z-\rangle
=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$

に対して

$$
\sigma_z|z+\rangle=|z+\rangle,
\qquad
\sigma_z|z-\rangle=-|z-\rangle.
$$

従って固有値は $+1,-1$ です。実際の spin 成分 $S_z$ を表したいなら

$$
S_z=\frac{\hbar}{2}\sigma_z
$$

とし、測定値候補は $\pm\hbar/2$ になります。
<!-- definition-example-end -->

自己共役作用素の固有値が実数であることは新しい公理ではありません。[LA5 の定理](../LA5/index.md#thm-la5-hermitian-real-eigenvalues)の帰結です。

さらに自己共役作用素は正規作用素なので、有限次元では[複素正規作用素のスペクトル定理](../LA5/index.md#thm-la5-normal-spectral)により正規直交固有基底を持ちます。

従って異なる固有値を

$$
a_1,\dots,a_m
$$

とし、それぞれの固有空間を $E_1,\dots,E_m$ とすると、

$$
H
=
E_1\oplus\cdots\oplus E_m
$$

と直交分解できます。

ここが Born 則へ進む入口です。測定結果 $a_j$ を「一本の固有ベクトル」と結び付けるのではなく、**固有値 $a_j$ に対応する固有空間全体**と結び付けます。

---

## 3. 射影測定：縮退しても同じ定義で扱う

各固有空間 $E_j$ への直交射影を $P_j$ とします。

正規直交固有基底を固有値ごとにまとめれば、射影は

$$
P_j^2=P_j,
\qquad
P_j^*=P_j
$$

を満たし、異なる固有値に対応する射影どうしは

$$
P_jP_k=0
\qquad
(j\ne k)
$$

です。

また全固有空間が $H$ を直交直和分解するので

$$
\sum_{j=1}^m P_j=I.
$$

観測量は

$$
A
=
\sum_{j=1}^m a_jP_j
$$

と書けます。これは有限次元スペクトル分解です。

<a id="def-qm2-projective-measurement"></a>

<!-- formal-statement-start -->
### 定義（固有空間への射影測定）

有限次元の観測量

$$
A=\sum_{j=1}^m a_jP_j
$$

に対し、異なる固有値 $a_j$ とその固有空間への直交射影 $P_j$ の組

$$
\{(a_j,P_j)\}_{j=1}^m
$$

を $A$ の **固有空間への射影測定** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm2-projective-measurement -->
### 直接例：縮退した固有値は固有空間全体へ射影する

$\mathbb C^3$ で

$$
A
=
\begin{pmatrix}
2&0&0\\
0&2&0\\
0&0&-1
\end{pmatrix}
$$

を考えます。

固有値 $2$ の固有空間は

$$
E_2
=
\operatorname{span}
\left\{
\begin{pmatrix}1\\0\\0\end{pmatrix},
\begin{pmatrix}0\\1\\0\end{pmatrix}
\right\}
$$

で二次元です。固有値 $-1$ の固有空間は

$$
E_{-1}
=
\operatorname{span}
\left\{
\begin{pmatrix}0\\0\\1\end{pmatrix}
\right\}.
$$

対応する射影は

$$
P_2
=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&0
\end{pmatrix},
\qquad
P_{-1}
=
\begin{pmatrix}
0&0&0\\
0&0&0\\
0&0&1
\end{pmatrix}.
$$

確かに

$$
A=2P_2-P_{-1}.
$$

ここで測定結果 $2$ に対応するのは、特定の一本の固有ベクトルではなく二次元空間 $E_2$ 全体です。これが縮退固有値を射影で扱う理由です。
<!-- definition-example-end -->

この段階までの内容は有限次元線形代数です。まだ「どの結果が何%で出るか」は決まっていません。

その確率を与えるのが Born 則です。

---

## 4. Born 則：射影成分のノルム二乗を確率にする

同じ状態 $\psi$ を何度も準備し、同じ観測量 $A$ を測ることを考えます。

状態は単位ベクトル代表

$$
\|\psi\|=1
$$

で表し、観測量は

$$
A=\sum_j a_jP_j
$$

とスペクトル分解します。

このとき量子理論は、測定結果 $a_j$ の確率を次で与えると**公理として採用**します。

<a id="axiom-qm2-born-rule"></a>

<!-- formal-statement-start -->
### 公理（有限次元 Born 則）

純粋状態の単位ベクトル代表 $\psi$ と、有限次元の観測量

$$
A=\sum_{j=1}^m a_jP_j
$$

を考える。

$A$ を測定したときに値 $a_j$ が得られる確率を

$$
\Pr_\psi(A=a_j)
=
\|P_j\psi\|^2
=
\langle\psi,P_j\psi\rangle
$$

で与える。
<!-- formal-statement-end -->

二つの表示が一致することを確認しておきます。直交射影では

$$
P_j^*=P_j,
\qquad
P_j^2=P_j
$$

なので、

$$
\begin{aligned}
\|P_j\psi\|^2
&=
\langle P_j\psi,P_j\psi\rangle\\
&=
\langle\psi,P_j^*P_j\psi\rangle\\
&=
\langle\psi,P_j\psi\rangle.
\end{aligned}
$$

ここでは内積が第1変数で共役線形、第2変数で線形という QM1・LA5 の規約を使っています。

### 確率は本当に足して1になるか

各射影の像は互いに直交し、

$$
\psi
=
\sum_{j=1}^m P_j\psi
$$

です。従って Pythagoras の関係から

$$
\|\psi\|^2
=
\sum_{j=1}^m\|P_j\psi\|^2.
$$

$\|\psi\|=1$ なので

$$
\sum_{j=1}^m
\Pr_\psi(A=a_j)
=
1.
$$

各項はノルム二乗なので非負です。つまり Born 則で与えた量は確率分布の条件を満たします。

この「総和1」は Born 則そのものとは別に仮定したものではありません。**状態の正規化、射影の直交性、完全性 $\sum_jP_j=I$ から導かれる数学的帰結**です。

---

## 5. 非縮退測定では「係数の絶対値二乗」に戻る

固有値 $a_j$ が非縮退、つまり対応固有空間が一次元だとします。正規化固有ベクトルを $e_j$ とすれば

$$
P_j\psi
=
e_j\langle e_j,\psi\rangle.
$$

従って

$$
\begin{aligned}
\Pr_\psi(A=a_j)
&=
\|P_j\psi\|^2\\
&=
\left|
\langle e_j,\psi\rangle
\right|^2.
\end{aligned}
$$

もし

$$
\psi
=
\sum_j c_je_j
$$

と展開していれば

$$
c_j=\langle e_j,\psi\rangle
$$

なので、

$$
\Pr_\psi(A=a_j)
=
|c_j|^2.
$$

教科書で頻繁に見る「係数の絶対値二乗が確率」という形は、これが正体です。

ただしこの形だけを定義だと思うと、縮退した場合に困ります。一般の有限次元射影測定では

$$
\boxed{
\Pr_\psi(A=a_j)=\|P_j\psi\|^2
}
$$

を基本形にしておく方が安全です。

---

## 6. spin $1/2$：$\sigma_z$ を測る

一般の正規化二準位状態を

$$
|\psi\rangle
=
\alpha|z+\rangle
+
\beta|z-\rangle,
\qquad
|\alpha|^2+|\beta|^2=1
$$

とします。

$\sigma_z$ のスペクトル分解は

$$
\sigma_z
=
(+1)P_{z+}
+
(-1)P_{z-},
$$

ただし

$$
P_{z+}
=
|z+\rangle\langle z+|
=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
$$

$$
P_{z-}
=
|z-\rangle\langle z-|
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

従って

$$
P_{z+}\psi
=
\alpha|z+\rangle,
\qquad
P_{z-}\psi
=
\beta|z-\rangle.
$$

Born 則から

$$
\Pr_\psi(\sigma_z=+1)
=
|\alpha|^2,
$$

$$
\Pr_\psi(\sigma_z=-1)
=
|\beta|^2.
$$

ここで初めて、QM1 で先取りしていた「基底係数の絶対値二乗」が正式な測定確率になります。

---

## 7. $\sigma_x$ を測ると相対位相が見える

次に

$$
\sigma_x
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

を考えます。

固有値は $+1,-1$、対応する正規化固有ベクトルは

$$
|x+\rangle
=
\frac{1}{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right),
$$

$$
|x-\rangle
=
\frac{1}{\sqrt2}
\left(
|z+\rangle-|z-\rangle
\right).
$$

QM1 で使った $x$ 基底が、ここでは $\sigma_x$ の固有基底として現れます。

特に

$$
|\psi_\varphi\rangle
=
\frac{1}{\sqrt2}
\left(
|z+\rangle
+
e^{i\varphi}|z-\rangle
\right)
$$

を測ります。

まず $x+$ への振幅を計算します。

$$
\begin{aligned}
\langle x+,\psi_\varphi\rangle
&=
\frac12
\left(
1+e^{i\varphi}
\right).
\end{aligned}
$$

従って Born 則から

$$
\begin{aligned}
\Pr_{\psi_\varphi}(\sigma_x=+1)
&=
\frac14
|1+e^{i\varphi}|^2\\
&=
\frac{1+\cos\varphi}{2}.
\end{aligned}
$$

同様に

$$
\Pr_{\psi_\varphi}(\sigma_x=-1)
=
\frac{1-\cos\varphi}{2}.
$$

一方、$\sigma_z$ を測ればどの $\varphi$ でも

$$
\Pr(\sigma_z=\pm1)
=
\frac12.
$$

つまり相対位相は「どの測定でも直接見える座標」ではありません。しかし測定する観測量を変えると、別基底での干渉として測定統計へ現れます。

これは QM1 の

$$
\text{相対位相}
\longrightarrow
\text{別基底での干渉}
$$

という話を Born 則で正式化したものです。

---

## 8. 全体位相は Born 確率を変えない

状態は ray である、と言った以上、代表ベクトルを

$$
\psi
\longmapsto
e^{i\theta}\psi
$$

と変えても、すべての測定予測が同じでなければなりません。

Born 則では実際にそうなります。

<a id="prop-qm2-born-global-phase"></a>

<!-- formal-statement-start -->
### 命題（Born 確率の全体位相不変性）

純粋状態の単位ベクトル代表 $\psi$ と

$$
\psi'=e^{i\theta}\psi
$$

を考える。任意の有限次元射影測定の射影 $P_j$ に対して

$$
\|P_j\psi'\|^2
=
\|P_j\psi\|^2
$$

が成り立つ。

従って $\psi$ と $\psi'$ はすべての Born 確率について同じ予測を与える。
<!-- formal-statement-end -->

### 証明の見取り図

射影 $P_j$ は線形なので、全体位相 $e^{i\theta}$ はそのまま射影後のベクトル全体に掛かります。ノルムを取ると絶対値1の因子は消えます。

<!-- proof-start -->
### 証明

線形性から

$$
P_j\psi'
=
P_j(e^{i\theta}\psi)
=
e^{i\theta}P_j\psi.
$$

従って

$$
\begin{aligned}
\|P_j\psi'\|^2
&=
\|e^{i\theta}P_j\psi\|^2\\
&=
|e^{i\theta}|^2
\|P_j\psi\|^2\\
&=
\|P_j\psi\|^2.
\end{aligned}
$$

Born 則により、両辺はそれぞれ $\psi'$、$\psi$ から同じ結果 $a_j$ を得る確率です。
<!-- proof-end -->

QM1 では「内積の絶対値二乗が不変」という形で全体位相を見ました。QM2 ではそれが**あらゆる有限次元射影測定の確率不変性**として具体化されました。

---

## 9. 理想射影測定の後、状態をどう更新するか

Born 則は「どの結果が出る確率」を与えます。しかし逐次 Stern--Gerlach 型実験を計算するには、結果が得られた後の状態も必要です。

本系列では、理想射影測定について次の状態更新則を採用します。

測定前の状態を $\psi$ とし、結果 $a_j$ が得られ、その確率が

$$
p_j=\|P_j\psi\|^2>0
$$

だったとします。この結果を条件として選別した後の単位ベクトル代表を

$$
\psi_j'
=
\frac{P_j\psi}{\|P_j\psi\|}
$$

とします。

これは Born 則から自動的に証明される式ではなく、理想射影測定のモデル化の一部です。

非縮退なら $P_j\psi$ は対応する固有ベクトル方向にあるため、測定直後に同じ観測量をもう一度測れば、同じ値 $a_j$ が確率1で出ます。

実際、

$$
P_j\psi_j'=\psi_j'
$$

なので

$$
\Pr_{\psi_j'}(A=a_j)
=
\|P_j\psi_j'\|^2
=
1.
$$

この性質が「理想的な再測定では同じ結果が再現される」という測定像に対応します。

---

## 10. 逐次 Stern--Gerlach 型測定を正式に計算する

最初に

$$
|z+\rangle
$$

を準備します。

### 10.1 すぐに $\sigma_z$ を測る

$$
P_{z+}|z+\rangle=|z+\rangle,
\qquad
P_{z-}|z+\rangle=0
$$

なので

$$
\Pr(\sigma_z=+1)=1,
\qquad
\Pr(\sigma_z=-1)=0.
$$

### 10.2 $\sigma_x$ を測る

QM1 の基底変換

$$
|z+\rangle
=
\frac{1}{\sqrt2}
\left(
|x+\rangle+|x-\rangle
\right)
$$

から

$$
\Pr(\sigma_x=+1)
=
\frac12,
\qquad
\Pr(\sigma_x=-1)
=
\frac12.
$$

ここで $x+$ の結果だけを選別すると、状態更新後は

$$
|x+\rangle
$$

です。

### 10.3 再び $\sigma_z$ を測る

今度は

$$
|x+\rangle
=
\frac{1}{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right)
$$

なので、

$$
\Pr(\sigma_z=+1)
=
\frac12,
\qquad
\Pr(\sigma_z=-1)
=
\frac12.
$$

最初は $z+$ が確定していたのに、途中で $x$ 軸の射影測定を行って結果を選別すると、再び $z$ 軸の統計が分かれます。

QM1 ではこれを「装置順序で統計が変わる」という実験的動機として見ました。QM2 では

$$
\boxed{
\text{異なる固有空間への射影}
+
\text{Born 則}
+
\text{測定後の状態更新}
}
$$

として計算できるようになりました。

非可換性そのものと不確定性関係は QM4 で扱います。

---

## 11. 期待値：多数回測定の平均を作用素で書く

同じ状態 $\psi$ を何度も準備し、観測量 $A$ を測るとします。

値 $a_j$ が確率

$$
p_j=\|P_j\psi\|^2
$$

で出るので、この離散確率分布の期待値は

$$
\mathbb E_\psi[A]
=
\sum_{j=1}^m a_jp_j
$$

です。

有限次元スペクトル分解

$$
A=\sum_ja_jP_j
$$

を使うと、この確率論的な平均が Hilbert 空間の内積一つにまとまります。

<a id="prop-qm2-expectation-inner-product"></a>

<!-- formal-statement-start -->
### 命題（期待値の内積表示）

純粋状態の単位ベクトル代表 $\psi$ と有限次元観測量

$$
A=\sum_{j=1}^m a_jP_j
$$

に対して、

$$
\mathbb E_\psi[A]
=
\langle\psi,A\psi\rangle
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Born 則で $p_j=\langle\psi,P_j\psi\rangle$ と書き、期待値の有限和へ代入します。内積の第2変数の線形性を使えば、和がそのまま $A$ に戻ります。

<!-- proof-start -->
### 証明

Born 則から

$$
p_j
=
\langle\psi,P_j\psi\rangle.
$$

従って

$$
\begin{aligned}
\mathbb E_\psi[A]
&=
\sum_{j=1}^m
a_jp_j\\
&=
\sum_{j=1}^m
a_j
\langle\psi,P_j\psi\rangle\\
&=
\left\langle
\psi,
\sum_{j=1}^m
a_jP_j\psi
\right\rangle\\
&=
\langle\psi,A\psi\rangle.
\end{aligned}
$$
<!-- proof-end -->

自己共役性からこの値は実数です。実際

$$
\overline{\langle\psi,A\psi\rangle}
=
\langle A\psi,\psi\rangle
=
\langle\psi,A\psi\rangle.
$$

---

## 12. 分散：測定値の散らばりも作用素で書ける

期待値を

$$
\mu
=
\mathbb E_\psi[A]
$$

とします。

測定値分布の分散は

$$
\operatorname{Var}_\psi(A)
=
\sum_j
(a_j-\mu)^2p_j
$$

です。

これも作用素表示へ戻せます。

<a id="prop-qm2-variance-operator"></a>

<!-- formal-statement-start -->
### 命題（分散の作用素表示）

純粋状態の単位ベクトル代表 $\psi$ と有限次元観測量 $A$ に対し、

$$
\mu=\langle\psi,A\psi\rangle
$$

と置く。このとき

$$
\operatorname{Var}_\psi(A)
=
\langle
\psi,
(A-\mu I)^2\psi
\rangle
$$

であり、さらに

$$
\operatorname{Var}_\psi(A)
=
\langle\psi,A^2\psi\rangle
-
\langle\psi,A\psi\rangle^2
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$A$ の固有空間では $A-\mu I$ の固有値が $a_j-\mu$ になります。従って二乗すれば $(a_j-\mu)^2$ が現れ、Born 確率で平均すれば分散になります。

<!-- proof-start -->
### 証明

スペクトル分解から

$$
A-\mu I
=
\sum_j
(a_j-\mu)P_j.
$$

射影は互いに直交するので

$$
P_jP_k=0
\qquad
(j\ne k),
$$

かつ $P_j^2=P_j$ です。従って

$$
(A-\mu I)^2
=
\sum_j
(a_j-\mu)^2P_j.
$$

期待値の内積表示と同じ計算により

$$
\begin{aligned}
\langle\psi,(A-\mu I)^2\psi\rangle
&=
\sum_j
(a_j-\mu)^2
\langle\psi,P_j\psi\rangle\\
&=
\sum_j
(a_j-\mu)^2p_j\\
&=
\operatorname{Var}_\psi(A).
\end{aligned}
$$

さらに

$$
(A-\mu I)^2
=
A^2-2\mu A+\mu^2I
$$

なので、

$$
\begin{aligned}
\operatorname{Var}_\psi(A)
&=
\langle\psi,A^2\psi\rangle
-
2\mu\langle\psi,A\psi\rangle
+
\mu^2\langle\psi,\psi\rangle\\
&=
\langle\psi,A^2\psi\rangle
-
2\mu^2+\mu^2\\
&=
\langle\psi,A^2\psi\rangle-\mu^2.
\end{aligned}
$$

ここで $\|\psi\|=1$ を使いました。
<!-- proof-end -->

分散の平方根

$$
\Delta_\psi A
=
\sqrt{\operatorname{Var}_\psi(A)}
$$

を標準偏差と呼びます。QM4 では二つの観測量の標準偏差と交換子を結び付けます。

---

## 13. spin $1/2$ の期待値と分散

$\sigma_z$ では

$$
\sigma_z^2=I
$$

です。

状態

$$
|\psi\rangle
=
\alpha|z+\rangle+\beta|z-\rangle
$$

について

$$
\langle\sigma_z\rangle_\psi
=
|\alpha|^2-|\beta|^2.
$$

また

$$
\langle\sigma_z^2\rangle_\psi
=
\langle I\rangle_\psi
=
1.
$$

従って

$$
\operatorname{Var}_\psi(\sigma_z)
=
1-
\left(
|\alpha|^2-|\beta|^2
\right)^2.
$$

たとえば $\psi=|z+\rangle$ なら

$$
\langle\sigma_z\rangle=1,
\qquad
\operatorname{Var}(\sigma_z)=0.
$$

測定値が確率1で $+1$ に決まっているので、散らばりが0なのは当然です。

一方 $\psi=|x+\rangle$ なら

$$
\Pr(\sigma_z=\pm1)=\frac12
$$

なので

$$
\langle\sigma_z\rangle=0,
\qquad
\operatorname{Var}(\sigma_z)=1.
$$

同じ観測量でも、状態によって分布も分散も変わります。

---

## 14. 本章で「公理」と「定理」をもう一度分ける

量子力学では、線形代数の式が多いため、どこまでが数学的に証明され、どこからが物理理論の採用事項なのかが見えにくくなりがちです。

### 理論の公理・モデル化として採用したもの

- 純粋状態を Hilbert 空間の ray で表す。
- 有限次元の観測量を自己共役作用素で表す。
- 測定結果を固有値に対応させる。
- Born 則で射影成分のノルム二乗を確率にする。
- 理想射影測定で結果 $a_j$ を選別した後、状態を正規化した $P_j\psi$ に更新する。

### 既習数学または公理から導いたもの

- 自己共役作用素の固有値は実数である。
- 有限次元自己共役作用素は正規直交固有基底を持つ。
- 射影測定の Born 確率は非負で総和1になる。
- 全体位相はすべての Born 確率を変えない。
- 非縮退測定では確率は固有基底係数の絶対値二乗になる。
- 期待値は $\langle\psi,A\psi\rangle$ と書ける。
- 分散は $\langle\psi,(A-\mu I)^2\psi\rangle$ と書ける。

この区別を保てば、「Born 則を線形代数から証明した」ことにはなりません。線形代数が担うのは、**公理を一度置いた後の一貫した計算構造**です。

---

## 15. どこまで有限次元で、次に何が足りないか

QM2 では

$$
A=\sum_ja_jP_j
$$

という有限和を使いました。

しかし一般の Hilbert 空間上の有界自己共役作用素では、固有ベクトルだけで空間を張れないことがあります。つまり「固有値を全部並べて有限和・可算和を作る」という発想だけでは一般の観測量を扱えません。

そこで次章 QM3 では、個々の固有空間射影を集合ごとの射影へ拡張し、射影値測度 $E_A$ を導入します。

有限次元の式

$$
A=\sum_ja_jP_j
$$

は、

$$
A
=
\int_{\sigma(A)}
\lambda\,dE_A(\lambda)
$$

へ拡張されます。

Born 則も

$$
\Pr_\psi(A\in B)
=
\langle
\psi,
E_A(B)\psi
\rangle
$$

という形になります。

本章はその一般論の前に、**状態・観測量・射影・確率・期待値・分散を全部手計算できる有限次元模型**を完成させる章でした。

---

# 演習

## Level A

### QM2-A01 単位ベクトル代表と全体位相
- Level: A

$$
v=
\begin{pmatrix}
1+i\\
1-i
\end{pmatrix}
$$

とする。

1. $v$ を正規化して単位ベクトル $\psi$ を求めよ。
2. $\phi=-i\psi$ が同じ純粋状態を表すことを説明せよ。
3. 任意の直交射影 $P$ に対して $\|P\phi\|^2=\|P\psi\|^2$ を示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
\begin{aligned}
\|v\|^2
&=
|1+i|^2+|1-i|^2\\
&=
2+2\\
&=
4.
\end{aligned}
$$

従って $\|v\|=2$ であり、

$$
\boxed{
\psi
=
\frac12
\begin{pmatrix}
1+i\\
1-i
\end{pmatrix}
}
$$

が単位ベクトル代表です。

次に

$$
\phi=-i\psi
=
e^{-i\pi/2}\psi.
$$

$|-i|=1$ なので $\phi$ も単位ベクトルであり、$\psi$ と同じ ray を生成します。従って同じ純粋状態を表します。

最後に射影 $P$ の線形性から

$$
P\phi
=
P(-i\psi)
=
-iP\psi.
$$

従って

$$
\|P\phi\|^2
=
|-i|^2\|P\psi\|^2
=
\boxed{\|P\psi\|^2}.
$$

これは Born 確率が全体位相に依存しないことの直接確認です。
<!-- solution-end -->

### QM2-A02 $\sigma_z$ の Born 確率
- Level: A

$$
|\psi\rangle
=
\frac{\sqrt3}{2}|z+\rangle
+
\frac{i}{2}|z-\rangle
$$

とする。

1. $\psi$ が正規化されていることを示せ。
2. $\sigma_z$ を測定したときの $+1,-1$ の確率を求めよ。
3. 期待値 $\mathbb E_\psi[\sigma_z]$ を求めよ。

<!-- solution-start -->
### 詳細解答

正規直交基底なので

$$
\|\psi\|^2
=
\left|\frac{\sqrt3}{2}\right|^2
+
\left|\frac{i}{2}\right|^2
=
\frac34+\frac14
=
1.
$$

従って正規化されています。

Born 則から

$$
\Pr(\sigma_z=+1)
=
\left|\frac{\sqrt3}{2}\right|^2
=
\frac34,
$$

$$
\Pr(\sigma_z=-1)
=
\left|\frac{i}{2}\right|^2
=
\frac14.
$$

期待値は

$$
\begin{aligned}
\mathbb E_\psi[\sigma_z]
&=
(+1)\frac34
+
(-1)\frac14\\
&=
\boxed{\frac12}.
\end{aligned}
$$
<!-- solution-end -->

### QM2-A03 $\sigma_x$ の固有状態と射影
- Level: A

$$
\sigma_x
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

について、

1. $|x+\rangle=(1,1)^{\mathsf T}/\sqrt2$、$|x-\rangle=(1,-1)^{\mathsf T}/\sqrt2$ が固有値 $+1,-1$ の固有ベクトルであることを確認せよ。
2. 対応する射影 $P_{x+},P_{x-}$ を行列で求めよ。
3. $P_{x+}+P_{x-}=I$ を確認せよ。

<!-- solution-start -->
### 詳細解答

直接作用させると

$$
\sigma_x
\frac1{\sqrt2}
\begin{pmatrix}
1\\
1
\end{pmatrix}
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\
1
\end{pmatrix},
$$

$$
\sigma_x
\frac1{\sqrt2}
\begin{pmatrix}
1\\
-1
\end{pmatrix}
=
-\frac1{\sqrt2}
\begin{pmatrix}
1\\
-1
\end{pmatrix}.
$$

従って固有値はそれぞれ $+1,-1$ です。

正規化ベクトル $u$ への直交射影は $uu^*$ なので、

$$
P_{x+}
=
\frac12
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix},
$$

$$
P_{x-}
=
\frac12
\begin{pmatrix}
1&-1\\
-1&1
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
P_{x+}+P_{x-}
&=
\frac12
\begin{pmatrix}
2&0\\
0&2
\end{pmatrix}\\
&=
\boxed{I}.
\end{aligned}
$$
<!-- solution-end -->

### QM2-A04 二値観測量の分散
- Level: A

観測量 $A$ の測定値が $+2,-2$ で、それぞれ確率 $3/4,1/4$ で得られるとする。

1. 期待値を求めよ。
2. 分散を確率分布の定義から求めよ。
3. $A^2=4I$ を用いて $\langle A^2\rangle-\langle A\rangle^2$ から同じ分散を得よ。

<!-- solution-start -->
### 詳細解答

期待値は

$$
\mu
=
2\cdot\frac34
+
(-2)\cdot\frac14
=
1.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(A)
&=
(2-1)^2\frac34
+
(-2-1)^2\frac14\\
&=
\frac34+\frac94\\
&=
\boxed{3}.
\end{aligned}
$$

一方 $A^2=4I$ なので、正規化状態では

$$
\langle A^2\rangle=4.
$$

従って

$$
\langle A^2\rangle-\langle A\rangle^2
=
4-1^2
=
\boxed{3}.
$$

二つの計算が一致しました。
<!-- solution-end -->

### QM2-A05 縮退固有値への射影
- Level: A

$$
A=
\begin{pmatrix}
2&0&0\\
0&2&0\\
0&0&-1
\end{pmatrix},
\qquad
\psi
=
\frac1{\sqrt6}
\begin{pmatrix}
1\\
1\\
2
\end{pmatrix}
$$

とする。

1. $\psi$ が単位ベクトルであることを確認せよ。
2. $A$ の測定値 $2$ と $-1$ の確率を求めよ。
3. 固有値 $2$ の固有空間の中で基底を取り替えても、測定値 $2$ の確率が変わらない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\|\psi\|^2
=
\frac{1+1+4}{6}
=
1.
$$

固有値 $2$ への射影は

$$
P_2
=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&0
\end{pmatrix}
$$

なので

$$
P_2\psi
=
\frac1{\sqrt6}
\begin{pmatrix}
1\\
1\\
0
\end{pmatrix}.
$$

従って

$$
\Pr(A=2)
=
\|P_2\psi\|^2
=
\frac{1+1}{6}
=
\boxed{\frac13}.
$$

同様に

$$
P_{-1}\psi
=
\frac1{\sqrt6}
\begin{pmatrix}
0\\
0\\
2
\end{pmatrix},
$$

従って

$$
\Pr(A=-1)
=
\frac46
=
\boxed{\frac23}.
$$

最後に、測定値 $2$ の確率は特定の基底係数ではなく

$$
\|P_2\psi\|^2
$$

で定義されています。$P_2$ は固有空間 $E_2$ そのものへの直交射影なので、$E_2$ の中で正規直交基底を取り替えても $P_2$ は変わりません。従って確率も変わりません。
<!-- solution-end -->

## Level B

### QM2-B01 相対位相を $\sigma_x$ で読む
- Level: B

$$
|\psi_\varphi\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+e^{i\varphi}|z-\rangle
\right)
$$

とする。

1. $\sigma_x$ の $+1,-1$ の確率を Born 則から導け。
2. $\sigma_x$ の期待値を求めよ。
3. $\varphi=0,\pi/2,\pi$ を比較し、相対位相がどこへ現れたか説明せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\langle x+,\psi_\varphi\rangle
=
\frac12
\left(
1+e^{i\varphi}
\right)
$$

なので

$$
\begin{aligned}
p_+
&=
\left|
\frac{1+e^{i\varphi}}2
\right|^2\\
&=
\frac14
\left(
2+2\cos\varphi
\right)\\
&=
\frac{1+\cos\varphi}{2}.
\end{aligned}
$$

同様に

$$
p_-
=
\frac{1-\cos\varphi}{2}.
$$

従って期待値は

$$
\begin{aligned}
\langle\sigma_x\rangle
&=
(+1)p_+
+
(-1)p_-\\
&=
p_+-p_-\\
&=
\boxed{\cos\varphi}.
\end{aligned}
$$

各位相では

$$
\varphi=0
\Rightarrow
(p_+,p_-)=(1,0),
$$

$$
\varphi=\frac\pi2
\Rightarrow
(p_+,p_-)=\left(\frac12,\frac12\right),
$$

$$
\varphi=\pi
\Rightarrow
(p_+,p_-)=(0,1).
$$

$z$ 基底では二成分の絶対値は常に $1/\sqrt2$ ですが、$x$ 基底へ変換すると二成分が加減算され、その交差項に $\cos\varphi$ が現れます。相対位相はこの干渉項を通じて測定統計へ現れています。
<!-- solution-end -->

### QM2-B02 $z+\to x+\to z$ の逐次射影測定
- Level: B

初期状態を $|z+\rangle$ とする。まず $\sigma_x$ を測り、結果 $+1$ の粒子だけを選別する。その後 $\sigma_z$ を測る。

1. 最初の $\sigma_x=+1$ の確率を求めよ。
2. 選別後の状態を射影と正規化から求めよ。
3. 最後の $\sigma_z=\pm1$ の条件付き確率を求めよ。
4. 最初から $\sigma_z$ を測った場合との違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$\sigma_x=+1$ への射影は

$$
P_{x+}
=
|x+\rangle\langle x+|.
$$

したがって

$$
P_{x+}|z+\rangle
=
|x+\rangle
\langle x+,z+\rangle.
$$

ここで

$$
\langle x+,z+\rangle
=
\frac1{\sqrt2}
$$

なので

$$
P_{x+}|z+\rangle
=
\frac1{\sqrt2}|x+\rangle.
$$

従って Born 確率は

$$
p
=
\left\|
\frac1{\sqrt2}|x+\rangle
\right\|^2
=
\boxed{\frac12}.
$$

選別後は射影結果をそのノルムで割るので

$$
\psi'
=
\frac{
(1/\sqrt2)|x+\rangle
}{
1/\sqrt2
}
=
\boxed{|x+\rangle}.
$$

次に

$$
|x+\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right)
$$

だから

$$
\Pr(\sigma_z=+1\mid x+)
=
\frac12,
$$

$$
\Pr(\sigma_z=-1\mid x+)
=
\frac12.
$$

一方、初期状態 $|z+\rangle$ をそのまま $\sigma_z$ で測れば

$$
\Pr(\sigma_z=+1)=1.
$$

途中の $x$ 射影測定と選別によって状態が $|x+\rangle$ へ更新され、$z$ 基底での確定性が失われました。
<!-- solution-end -->

### QM2-B03 行列から測定分布・期待値・分散まで
- Level: B

$$
A=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix},
\qquad
\psi
=
\frac1{\sqrt5}
\begin{pmatrix}
2\\
i
\end{pmatrix}
$$

とする。

1. $A$ が観測量であることを確認せよ。
2. $A$ の固有値と正規化固有ベクトルを求めよ。
3. Born 則で $A=\pm1$ の確率を求めよ。
4. 確率分布から期待値を求め、$\langle\psi,A\psi\rangle$ と一致することを確認せよ。
5. 分散を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
A^*=A
$$

なので $A$ は自己共役、従って観測量です。

これは $\sigma_x$ なので固有値は $+1,-1$、正規化固有ベクトルは

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

状態との内積は

$$
\begin{aligned}
\langle x+,\psi\rangle
&=
\frac1{\sqrt{10}}
(2+i),\\
\langle x-,\psi\rangle
&=
\frac1{\sqrt{10}}
(2-i).
\end{aligned}
$$

従って

$$
p_+
=
\frac{|2+i|^2}{10}
=
\frac{5}{10}
=
\frac12,
$$

$$
p_-
=
\frac{|2-i|^2}{10}
=
\frac12.
$$

よって期待値は

$$
\mathbb E[A]
=
(+1)\frac12+(-1)\frac12
=
\boxed{0}.
$$

内積でも確認します。

$$
A\psi
=
\frac1{\sqrt5}
\begin{pmatrix}
i\\
2
\end{pmatrix}.
$$

したがって

$$
\begin{aligned}
\langle\psi,A\psi\rangle
&=
\frac15
\left(
\overline2\,i+\overline i\,2
\right)\\
&=
\frac15
(2i-2i)\\
&=
0.
\end{aligned}
$$

確率分布からの期待値と一致しました。

最後に $A^2=I$ なので

$$
\langle A^2\rangle=1.
$$

従って

$$
\operatorname{Var}(A)
=
1-0^2
=
\boxed{1}.
$$
<!-- solution-end -->

## Level C

### QM2-C01 一般二準位状態を二つの観測量で測る
- Level: C

$$
|\psi\rangle
=
\cos\frac{\theta}{2}|z+\rangle
+
e^{i\varphi}
\sin\frac{\theta}{2}|z-\rangle,
\qquad
0\le\theta\le\pi
$$

とする。

観測量

$$
\sigma_z
=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix},
\qquad
\sigma_x
=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

について次を行え。

1. $\psi$ が正規化されていることを示せ。
2. $\sigma_z=\pm1$ の Born 確率を求めよ。
3. $\sigma_x=\pm1$ の Born 確率を途中式から求めよ。
4. $\langle\sigma_z\rangle$、$\langle\sigma_x\rangle$ を求めよ。
5. $\operatorname{Var}(\sigma_z)$、$\operatorname{Var}(\sigma_x)$ を求めよ。
6. $\sigma_x=+1$ を得て選別した直後の状態を求め、その後 $\sigma_z$ を測る確率を求めよ。
7. この計算のどの部分が公理・モデル化で、どの部分が数学的帰結かを整理せよ。

<!-- solution-start -->
### 詳細解答

まず正規化を確認します。

$$
\begin{aligned}
\|\psi\|^2
&=
\cos^2\frac{\theta}{2}
+
\left|e^{i\varphi}\right|^2
\sin^2\frac{\theta}{2}\\
&=
\cos^2\frac{\theta}{2}
+
\sin^2\frac{\theta}{2}\\
&=
1.
\end{aligned}
$$

従って $\psi$ は単位ベクトルです。

$\sigma_z$ の固有基底は $|z+\rangle,|z-\rangle$ なので、Born 則から

$$
\boxed{
p_z(+)
=
\cos^2\frac{\theta}{2}
},
$$

$$
\boxed{
p_z(-)
=
\sin^2\frac{\theta}{2}
}.
$$

次に $\sigma_x$ を測ります。

$$
|x+\rangle
=
\frac{|z+\rangle+|z-\rangle}{\sqrt2}
$$

だから

$$
\begin{aligned}
\langle x+,\psi\rangle
&=
\frac1{\sqrt2}
\left(
\cos\frac{\theta}{2}
+
e^{i\varphi}\sin\frac{\theta}{2}
\right).
\end{aligned}
$$

従って

$$
\begin{aligned}
p_x(+)
&=
\frac12
\left|
\cos\frac{\theta}{2}
+
e^{i\varphi}\sin\frac{\theta}{2}
\right|^2\\
&=
\frac12
\left[
\cos^2\frac{\theta}{2}
+
\sin^2\frac{\theta}{2}
+
2\cos\frac{\theta}{2}\sin\frac{\theta}{2}\cos\varphi
\right]\\
&=
\frac12
\left(
1+\sin\theta\cos\varphi
\right).
\end{aligned}
$$

ここで

$$
2\cos\frac{\theta}{2}\sin\frac{\theta}{2}
=
\sin\theta
$$

を使いました。

同様に

$$
\boxed{
p_x(-)
=
\frac12
\left(
1-\sin\theta\cos\varphi
\right)
}.
$$

期待値は

$$
\begin{aligned}
\langle\sigma_z\rangle
&=
p_z(+)-p_z(-)\\
&=
\cos^2\frac{\theta}{2}
-
\sin^2\frac{\theta}{2}\\
&=
\boxed{\cos\theta},
\end{aligned}
$$

$$
\begin{aligned}
\langle\sigma_x\rangle
&=
p_x(+)-p_x(-)\\
&=
\boxed{\sin\theta\cos\varphi}.
\end{aligned}
$$

Pauli 行列は

$$
\sigma_z^2=\sigma_x^2=I
$$

を満たすので、どちらも

$$
\langle\sigma_\bullet^2\rangle=1.
$$

従って

$$
\boxed{
\operatorname{Var}(\sigma_z)
=
1-\cos^2\theta
=
\sin^2\theta
},
$$

$$
\boxed{
\operatorname{Var}(\sigma_x)
=
1-
\sin^2\theta\cos^2\varphi
}.
$$

次に $\sigma_x=+1$ が得られたとします。射影は

$$
P_{x+}
=
|x+\rangle\langle x+|.
$$

射影後のベクトルは

$$
P_{x+}\psi
=
|x+\rangle
\langle x+,\psi\rangle.
$$

この結果が得られた条件の下では $\langle x+,\psi\rangle\ne0$ なので、正規化すると全体位相を除いて

$$
\boxed{
\psi'=|x+\rangle
}
$$

になります。

そして

$$
|x+\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right)
$$

なので、

$$
\boxed{
\Pr(\sigma_z=+1\mid x+)
=
\Pr(\sigma_z=-1\mid x+)
=
\frac12
}.
$$

最後に層を分けます。

**公理・モデル化**に属するのは、

- 純粋状態を ray で表し単位ベクトル代表を使うこと、
- $\sigma_z,\sigma_x$ を観測量として自己共役作用素で表すこと、
- Born 則で射影ノルム二乗を確率にすること、
- 理想射影測定後に正規化した射影ベクトルへ状態を更新すること

です。

一方、**数学的帰結**に属するのは、

- 基底変換、
- 各 Born 確率の具体式、
- 期待値と分散の式、
- 相対位相 $\varphi$ が $\sigma_x$ の統計へ $\cos\varphi$ として現れること、
- $x+$ 選別後の $z$ 測定が半々になること

です。

この区別を保つことが、QM1 から QM2 へ引き継いだ基本姿勢です。
<!-- solution-end -->
