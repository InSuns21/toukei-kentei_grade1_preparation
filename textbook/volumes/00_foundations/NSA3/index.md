# NSA3 Łoś の定理と移送原理

<!-- definition-example-audit: strict -->

NSA2 では、項・一階論理式・構造・変数割当て・充足を定義し、論理式の構成に沿って議論する構文帰納法まで準備しました。これで「何を移送するのか」は書けるようになりました。

しかし、まだ大きな穴が残っています。NSA1 で作った超実数の商構成について、実数で真な一階命題がなぜ超実数でも真なのかは証明していません。加法や順序の性質を毎回代表列へ戻って確認するだけなら、超準解析のたびに同じ仕事を繰り返すことになります。

この章で行うことは一つです。

> 超冪の中で論理式が真であることを、元の構造でその論理式が真になる添字集合の大きさへ翻訳する。

この章では、その翻訳を一つの中心定理として証明します。原子論理式、否定、論理積・論理和、存在量化、全称量化を一つずつ処理し、最後に標準構造と超冪の間で一階命題の真偽が保存される帰結を取り出します。

特に存在量化では、添字ごとの witness を一つの列へ束ねる必要があります。ここでは SET9 で得た可算選択を使います。自由超フィルターの存在に使った選択原理と、witness 列を作る選択は役割が異なるので、同じ一言で済ませません。

---

## 1. 元の構造から超冪構造を作る

まず「数の集合を商にする」だけでなく、言語の定数・関数・関係まで超冪へ運びます。

一階言語 $\mathcal L$ と、その構造 $\mathcal M$ を固定します。台集合を $M$ とし、$\mathbb N$ 上の自由超フィルター $\mathcal U$ を固定します。

数列 $a=(a_n)$ と $b=(b_n)$ に対し

$$
a\sim_{\mathcal U}b
\iff
\{n\in\mathbb N:a_n=b_n\}\in\mathcal U
$$

とし、同値類を

$$
[a_n]_{\mathcal U}
$$

と書きます。文脈が明らかなときは添字 $\mathcal U$ を省きます。

<a id="def-nsa3-ultrapower-structure"></a>
<!-- formal-statement-start -->
### 定義（一階構造の超冪）

$\mathcal L$-構造 $\mathcal M$ と $\mathbb N$ 上の自由超フィルター $\mathcal U$ を固定する。

**超冪構造**

$$
\mathcal P
=
\mathcal M^{\mathbb N}/\mathcal U
$$

を次で定める。

台集合は

$$
P=M^{\mathbb N}/\!\sim_{\mathcal U}
$$

とする。

定数記号 $c$ について

$$
c^{\mathcal P}
=
[c^{\mathcal M},c^{\mathcal M},\ldots].
$$

$k$ 項関数記号 $f$ について

$$
f^{\mathcal P}
\bigl(
[a_n^1],\ldots,[a_n^k]
\bigr)
=
\left[
f^{\mathcal M}
(a_n^1,\ldots,a_n^k)
\right].
$$

$k$ 項関係記号 $R$ について

$$
\mathcal P
\models
R([a_n^1],\ldots,[a_n^k])
$$

であることを

$$
\left\{
n:
\mathcal M
\models
R(a_n^1,\ldots,a_n^k)
\right\}
\in\mathcal U
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nsa3-ultrapower-structure -->
**定義の確認**。$\mathcal M=\mathbb R_{\mathrm{of}}$ とすると、台集合は NSA1 の

$$
{}^*\mathbb R
=
\mathbb R^{\mathbb N}/\mathcal U
$$

です。

例えば加法は

$$
[a_n]+[b_n]
=
[a_n+b_n]
$$

となり、順序関係は

$$
[a_n]<[b_n]
\iff
\{n:a_n<b_n\}\in\mathcal U
$$

となります。これは NSA1 で直接定義した加法・順序と一致します。

つまり NSA1 の商構成を、任意の一階言語の定数・関数・関係へ同じ規則で広げたものが超冪構造です。
<!-- definition-example-end -->

### 1.1 多ソートの場合

NSA2 で導入した多ソート言語でも同じ構成を使います。

ソート $S$ の台集合を $M_S$ とすると、超冪側のソートは

$$
P_S=M_S^{\mathbb N}/\mathcal U
$$

です。関数記号

$$
f:S_1\times\cdots\times S_k\to T
$$

は

$$
f^{\mathcal P}:
P_{S_1}\times\cdots\times P_{S_k}\to P_T
$$

へ座標ごとに拡張し、関係記号も同じく添字集合が $\mathcal U$ に属するかで解釈します。

証明は各ソートの型を保つだけで、一ソートの場合と同じです。

---

## 2. 代表元を変えても記号の意味は変わらない

超冪の要素は列そのものではなく同値類です。従って、関数や関係の定義が代表列に依存しないことを先に閉じます。

<a id="prop-nsa3-ultrapower-symbol-well-defined"></a>
<!-- formal-statement-start -->
### 命題（超冪の記号解釈は代表元によらない）

各 $j=1,\ldots,k$ について

$$
[a_n^j]=[b_n^j]
$$

とする。

このとき任意の $k$ 項関数記号 $f$ について

$$
\left[
f^{\mathcal M}(a_n^1,\ldots,a_n^k)
\right]
=
\left[
f^{\mathcal M}(b_n^1,\ldots,b_n^k)
\right].
$$

また任意の $k$ 項関係記号 $R$ について

$$
\{n:\mathcal M\models R(a_n^1,\ldots,a_n^k)\}\in\mathcal U
$$

であることと

$$
\{n:\mathcal M\models R(b_n^1,\ldots,b_n^k)\}\in\mathcal U
$$

であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

各座標で代表列が一致する添字集合を全部交わします。その共通部分は $\mathcal U$ に属し、その上では関数値も関係の真偽も完全に一致します。

<!-- proof-start -->
### 証明

各 $j$ について

$$
E_j
=
\{n:a_n^j=b_n^j\}
\in\mathcal U
$$

です。フィルターは有限共通部分で閉じているので

$$
E
=
E_1\cap\cdots\cap E_k
\in\mathcal U.
$$

まず関数記号 $f$ を考えます。$n\in E$ なら全ての $j$ について $a_n^j=b_n^j$ なので

$$
f^{\mathcal M}(a_n^1,\ldots,a_n^k)
=
f^{\mathcal M}(b_n^1,\ldots,b_n^k).
$$

従って二つの関数値列が一致する添字集合は $E$ を含みます。フィルターの上方閉性から、その一致集合も $\mathcal U$ に属します。よって二つの同値類は等しいです。

次に関係記号 $R$ を考えます。

$$
A
=
\{n:\mathcal M\models R(a_n^1,\ldots,a_n^k)\},
$$

$$
B
=
\{n:\mathcal M\models R(b_n^1,\ldots,b_n^k)\}
$$

と置きます。

$n\in E$ では入力が全て一致するので

$$
n\in A
\iff
n\in B.
$$

従って $A\cap E=B\cap E$ です。

$A\in\mathcal U$ なら

$$
A\cap E\in\mathcal U.
$$

しかも $A\cap E\subseteq B$ なので上方閉性から $B\in\mathcal U$ です。逆向きも同じ議論で従います。

よって関係の解釈も代表元に依存しません。
<!-- proof-end -->

---

## 3. 項は「座標ごとに計算してから商を取る」

次節の中心定理で原子論理式を処理するには、複雑な項を超冪で評価した結果が、各添字で項を評価した列の同値類になることを確認します。

<a id="lem-nsa3-term-evaluation"></a>
<!-- formal-statement-start -->
### 補題（超冪における項評価補題）

$t(x_1,\ldots,x_k)$ を $\mathcal L$ の項とする。

各 $j$ について列 $(a_n^j)$ を取り

$$
A_j=[a_n^j]\in P
$$

とする。

このとき

$$
t^{\mathcal P}(A_1,\ldots,A_k)
=
\left[
t^{\mathcal M}(a_n^1,\ldots,a_n^k)
\right].
$$
<!-- formal-statement-end -->

### 証明の見取り図

項は変数・定数から始め、関数記号を有限回適用して作られます。従って NSA2 と同じく項の構成に関する帰納法を使います。

<!-- proof-start -->
### 証明

項 $t$ の構成に関して帰納法を行います。

**変数の場合。** $t=x_j$ なら左辺は $A_j=[a_n^j]$ です。右辺も

$$
[a_n^j]
$$

なので一致します。

**定数の場合。** $t=c$ なら第1節で定めた定数記号の座標ごとの解釈から

$$
c^{\mathcal P}
=
[c^{\mathcal M},c^{\mathcal M},\ldots].
$$

これは各添字で $c$ を評価した列の同値類です。

**関数記号を適用する場合。** 

$$
t=f(t_1,\ldots,t_m)
$$

とします。帰納法の仮定により各 $i$ について

$$
t_i^{\mathcal P}(A_1,\ldots,A_k)
=
\left[
t_i^{\mathcal M}(a_n^1,\ldots,a_n^k)
\right].
$$

第1節で定めた $f$ の座標ごとの解釈を使うと

$$
t^{\mathcal P}(A_1,\ldots,A_k)
$$

は

$$
\left[
f^{\mathcal M}
\left(
t_1^{\mathcal M}(a_n^1,\ldots,a_n^k),
\ldots,
t_m^{\mathcal M}(a_n^1,\ldots,a_n^k)
\right)
\right]
$$

に等しいです。

括弧内はまさに

$$
t^{\mathcal M}(a_n^1,\ldots,a_n^k)
$$

なので結論が従います。
<!-- proof-end -->

この補題により、原子論理式の段階では「超冪で項を評価する」ことと「各添字で評価してから同値類を取る」ことを自由に行き来できます。

---

## 4. 一階論理式の真偽を添字集合へ翻訳する

ここまでの準備を一つの定理にまとめます。

論理式

$$
\varphi(x_1,\ldots,x_k)
$$

を取り、表示した変数が全ての自由変数を含むとします。

超冪のパラメータを

$$
A_j=[a_n^j]
\qquad
(j=1,\ldots,k)
$$

とし、元の構造で論理式が真になる添字集合を

$$
T_\varphi
=
\left\{
n\in\mathbb N:
\mathcal M
\models
\varphi(a_n^1,\ldots,a_n^k)
\right\}
$$

と書きます。

代表列を別のものへ替えても、各パラメータが同時に一致する $\mathcal U$-大集合上では論理式へ代入する値が同じです。従って $T_\varphi$ が $\mathcal U$ に属するかどうかは代表列の選び方に依存しません。

<a id="thm-nsa3-los"></a>
<!-- formal-statement-start -->
### 定理（Łoś の定理）

$\mathcal L$-構造 $\mathcal M$、$\mathbb N$ 上の自由超フィルター $\mathcal U$、超冪

$$
\mathcal P=\mathcal M^{\mathbb N}/\mathcal U
$$

を取る。

任意の一階論理式

$$
\varphi(x_1,\ldots,x_k)
$$

と任意の代表列 $(a_n^j)$ に対し

$$
\mathcal P
\models
\varphi([a_n^1],\ldots,[a_n^k])
$$

であることと

$$
\left\{
n:
\mathcal M
\models
\varphi(a_n^1,\ldots,a_n^k)
\right\}
\in\mathcal U
$$

であることは同値である。

多ソート一階言語でも、各変数と代表列を対応するソートに取れば同じ結論が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

NSA2 の構文帰納法をそのまま使います。

- 原子論理式では項評価補題と商の定義を使う。
- 否定では[超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy)を使う。
- 論理積では有限共通部分、論理和では超フィルター性を使う。
- 存在量化では添字ごとの witness を可算選択で一つの列に束ねる。
- 全称量化では、失敗する添字が $\mathcal U$-大なら反例 witness の列を作って矛盾させる。

以下で各段を省略せず確認します。

<!-- proof-start -->
### 証明

論理式 $\varphi$ の構成に関して帰納法を行います。

#### 原子論理式：等号

まず

$$
\varphi=(t=u)
$$

とします。

項評価補題により

$$
t^{\mathcal P}([a_n^1],\ldots,[a_n^k])
=
[t^{\mathcal M}(a_n^1,\ldots,a_n^k)],
$$

$$
u^{\mathcal P}([a_n^1],\ldots,[a_n^k])
=
[u^{\mathcal M}(a_n^1,\ldots,a_n^k)].
$$

従って

$$
\mathcal P\models t=u
$$

であることは、二つの代表列が $\mathcal U$-大な添字集合上で一致するとき同じ同値類を表すことにより

$$
\left\{
n:
t^{\mathcal M}(a_n^1,\ldots,a_n^k)
=
u^{\mathcal M}(a_n^1,\ldots,a_n^k)
\right\}
\in\mathcal U
$$

と同値です。

これはまさに

$$
\{n:\mathcal M\models t=u\}\in\mathcal U
$$

です。

#### 原子論理式：関係記号

次に

$$
\varphi=R(t_1,\ldots,t_m)
$$

とします。

項評価補題により、超冪で各 $t_i$ を評価した値は

$$
\left[
t_i^{\mathcal M}(a_n^1,\ldots,a_n^k)
\right]
$$

です。

第1節で定めた関係記号 $R$ の座標ごとの解釈から

$$
\mathcal P
\models
R(t_1,\ldots,t_m)
$$

であることは

$$
\left\{
n:
\mathcal M
\models
R(t_1,\ldots,t_m)
\right\}
\in\mathcal U
$$

と同値です。

これで原子論理式の場合が終わりました。

#### 否定

$$
\varphi=\neg\psi
$$

とします。

帰納法の仮定により

$$
\mathcal P\models\psi
\iff
T_\psi\in\mathcal U.
$$

従って

$$
\mathcal P\models\neg\psi
$$

であることは

$$
T_\psi\notin\mathcal U
$$

と同値です。

[超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy)により

$$
T_\psi\notin\mathcal U
\iff
\mathbb N\setminus T_\psi\in\mathcal U.
$$

一方

$$
T_{\neg\psi}
=
\mathbb N\setminus T_\psi.
$$

従って

$$
\mathcal P\models\neg\psi
\iff
T_{\neg\psi}\in\mathcal U.
$$

#### 論理積

$$
\varphi=\psi\land\theta
$$

とします。

充足の定義と帰納法の仮定から

$$
\mathcal P\models\psi\land\theta
$$

であることは

$$
T_\psi\in\mathcal U
\quad\text{かつ}\quad
T_\theta\in\mathcal U
$$

と同値です。

フィルターの有限共通部分性により、これは

$$
T_\psi\cap T_\theta\in\mathcal U
$$

と同値です。逆向きは

$$
T_\psi\cap T_\theta\subseteq T_\psi,
\qquad
T_\psi\cap T_\theta\subseteq T_\theta
$$

と上方閉性から従います。

また

$$
T_{\psi\land\theta}
=
T_\psi\cap T_\theta.
$$

従って結論が成り立ちます。

#### 論理和

$$
\varphi=\psi\lor\theta
$$

とします。

もし

$$
T_\psi\in\mathcal U
$$

なら $T_\psi\subseteq T_\psi\cup T_\theta$ なので

$$
T_\psi\cup T_\theta\in\mathcal U.
$$

$T_\theta\in\mathcal U$ の場合も同じです。

逆に

$$
T_\psi\cup T_\theta\in\mathcal U
$$

と仮定します。

もし $T_\psi,T_\theta$ のどちらも $\mathcal U$ に属さないなら、超フィルター性から

$$
\mathbb N\setminus T_\psi\in\mathcal U,
\qquad
\mathbb N\setminus T_\theta\in\mathcal U.
$$

従ってその共通部分

$$
\mathbb N\setminus(T_\psi\cup T_\theta)
$$

も $\mathcal U$ に属します。

すると $T_\psi\cup T_\theta$ とその補集合がともに $\mathcal U$ に属し、その共通部分である空集合まで $\mathcal U$ に属することになります。これはフィルターの定義に反します。

従って

$$
T_\psi\cup T_\theta\in\mathcal U
\iff
T_\psi\in\mathcal U
\text{ または }
T_\theta\in\mathcal U.
$$

しかも

$$
T_{\psi\lor\theta}
=
T_\psi\cup T_\theta.
$$

帰納法の仮定と合わせて論理和の場合が従います。

#### 存在量化：超冪で witness があるなら添字集合は大きい

$$
\varphi=\exists y\,\psi(y,x_1,\ldots,x_k)
$$

とします。

まず

$$
\mathcal P
\models
\exists y\,\psi(y,[a_n^1],\ldots,[a_n^k])
$$

を仮定します。

充足の定義から、ある超冪の元

$$
B=[b_n]
$$

が存在して

$$
\mathcal P
\models
\psi([b_n],[a_n^1],\ldots,[a_n^k]).
$$

帰納法の仮定を $\psi$ に適用すると

$$
A
=
\left\{
n:
\mathcal M
\models
\psi(b_n,a_n^1,\ldots,a_n^k)
\right\}
\in\mathcal U.
$$

一方

$$
A
\subseteq
E,
$$

ただし

$$
E
=
\left\{
n:
\mathcal M
\models
\exists y\,\psi(y,a_n^1,\ldots,a_n^k)
\right\}.
$$

フィルターの上方閉性により

$$
E\in\mathcal U.
$$

#### 存在量化：添字集合が大きいなら witness 列を作る

逆に

$$
E\in\mathcal U
$$

を仮定します。

各 $n\in E$ について

$$
W_n
=
\left\{
b\in M:
\mathcal M
\models
\psi(b,a_n^1,\ldots,a_n^k)
\right\}
$$

と置きます。$n\in E$ の定義から $W_n$ は空ではありません。

ここで witness を各 $n$ ごとに一つずつ取る必要があります。「各 $n$ で一つ取る」ことを無言で済ませず、選択の箇所を分離します。

構造の台集合 $M$ は空でないので、まず一つ

$$
b_0\in M
$$

を固定します。

全ての $n\in\mathbb N$ に対して

$$
V_n
=
\begin{cases}
W_n,&n\in E,\\
\{b_0\},&n\notin E
\end{cases}
$$

と置けば、各 $V_n$ は非空です。

SET9 の可算選択を使い

$$
b_n\in V_n
\qquad
(n\in\mathbb N)
$$

となる列 $(b_n)$ を取ります。

$n\in E$ なら $b_n\in W_n$ なので

$$
\mathcal M
\models
\psi(b_n,a_n^1,\ldots,a_n^k).
$$

$n\notin E$ では、そもそも存在量化が偽なので、どの $b\in M$ を入れても $\psi$ は偽です。

従って

$$
\left\{
n:
\mathcal M
\models
\psi(b_n,a_n^1,\ldots,a_n^k)
\right\}
=
E.
$$

仮定から $E\in\mathcal U$ なので、帰納法の仮定により

$$
\mathcal P
\models
\psi([b_n],[a_n^1],\ldots,[a_n^k]).
$$

よって $[b_n]$ を witness として

$$
\mathcal P
\models
\exists y\,\psi(y,[a_n^1],\ldots,[a_n^k]).
$$

存在量化の場合が示されました。

ここで使った可算選択は、$\mathcal U$ の存在を与える超フィルター拡張とは別の役割です。前者は witness の可算列を作り、後者は「大きい添字集合」を判定する超フィルターそのものを用意します。

#### 全称量化：添字ごとに真なら超冪でも真

$$
\varphi=\forall y\,\psi(y,x_1,\ldots,x_k)
$$

とします。

まず

$$
E
=
\left\{
n:
\mathcal M
\models
\forall y\,\psi(y,a_n^1,\ldots,a_n^k)
\right\}
\in\mathcal U
$$

を仮定します。

任意の超冪の元

$$
B=[b_n]
$$

を取ります。

$n\in E$ なら全ての $b\in M$ について $\psi$ が真なので、とくに

$$
\mathcal M
\models
\psi(b_n,a_n^1,\ldots,a_n^k).
$$

従って

$$
E
\subseteq
\left\{
n:
\mathcal M
\models
\psi(b_n,a_n^1,\ldots,a_n^k)
\right\}.
$$

上方閉性から右辺も $\mathcal U$ に属します。帰納法の仮定より

$$
\mathcal P
\models
\psi([b_n],[a_n^1],\ldots,[a_n^k]).
$$

$B=[b_n]$ は任意だったので

$$
\mathcal P
\models
\forall y\,\psi(y,[a_n^1],\ldots,[a_n^k]).
$$

#### 全称量化：超冪で真なら失敗添字は大きくなれない

逆に

$$
\mathcal P
\models
\forall y\,\psi(y,[a_n^1],\ldots,[a_n^k])
$$

を仮定します。

$E\notin\mathcal U$ と仮定して矛盾を導きます。超フィルター性から

$$
F
=
\mathbb N\setminus E
\in\mathcal U.
$$

$n\in F$ では全称量化が偽なので

$$
W_n
=
\left\{
b\in M:
\mathcal M
\models
\neg\psi(b,a_n^1,\ldots,a_n^k)
\right\}
$$

は非空です。

存在量化のときと同じく、$n\notin F$ では固定した $b_0\in M$ を入れ、可算選択で列 $(b_n)$ を作ります。すると

$$
F
\subseteq
\left\{
n:
\mathcal M
\models
\neg\psi(b_n,a_n^1,\ldots,a_n^k)
\right\}.
$$

右辺は $\mathcal U$ に属するので、帰納法の仮定から

$$
\mathcal P
\models
\neg\psi([b_n],[a_n^1],\ldots,[a_n^k]).
$$

しかし最初の仮定では全ての超冪の元について $\psi$ が真です。特に $[b_n]$ に対して真でなければならず、矛盾します。

従って

$$
E\in\mathcal U.
$$

以上で、原子論理式・否定・論理積・論理和・存在量化・全称量化の全てについて帰納段階が閉じました。構文帰納法により任意の一階論理式について Łoś の定理が成り立ちます。
<!-- proof-end -->

---

## 5. 標準パラメータを定数列で入れる

直前の定理は、パラメータが任意の代表列でも成り立つ強い主張です。ここでは、そのパラメータを定数列にした特別な場合を取り出します。

標準元 $a\in M$ を

$$
{}^*a
=
[a,a,a,\ldots]
$$

へ送ります。NSA1 の実数の標準埋め込みと同じ構成です。

<a id="cor-nsa3-transfer"></a>
<!-- formal-statement-start -->
### 系（移送原理）

$\varphi(x_1,\ldots,x_k)$ を $\mathcal L$ の一階論理式とし、$a_1,\ldots,a_k\in M$ を取る。

このとき

$$
\mathcal M
\models
\varphi(a_1,\ldots,a_k)
$$

であることと

$$
\mathcal M^{\mathbb N}/\mathcal U
\models
\varphi({}^*a_1,\ldots,{}^*a_k)
$$

であることは同値である。

特に文 $\sigma$ について

$$
\mathcal M\models\sigma
\iff
\mathcal M^{\mathbb N}/\mathcal U\models\sigma.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各パラメータを定数列で表すと、元の構造で真になる添字集合は

$$
T_\varphi
=
\left\{
n:
\mathcal M
\models
\varphi(a_1,\ldots,a_k)
\right\}.
$$

右辺の真偽は $n$ に依存しません。

元の構造で命題が真なら

$$
T_\varphi=\mathbb N.
$$

超フィルターは全体集合を含むので $T_\varphi\in\mathcal U$ です。

元の構造で命題が偽なら

$$
T_\varphi=\varnothing.
$$

超フィルターは空集合を含まないので $T_\varphi\notin\mathcal U$ です。

[Łoś の定理](#thm-nsa3-los)から結論が従います。
<!-- proof-end -->

移送原理は「実数で真なものは何でも超実数で真」という無制限な規則ではありません。

正確には

> 固定した一階言語で書かれた一階論理式について、標準構造とその超冪の間で真偽が保存される

という定理です。

---

## 6. 最初の移送例：代数と順序

### 6.1 多項式の式を運ぶ

実数では

$$
\forall x\forall y\;
(x+y)^2=x^2+2xy+y^2
$$

が真です。

これは順序体の言語で書ける一階の文なので、[移送原理](#cor-nsa3-transfer)により

$$
\forall X\forall Y\in{}^*\mathbb R
$$

について

$$
(X+Y)^2=X^2+2XY+Y^2
$$

が成り立ちます。

ここで $X,Y$ は標準実数に限りません。無限小や無限大超実数を含む全ての超実数を走ります。

### 6.2 順序と加法

実数で真な

$$
\forall x\forall y\forall z\;
(x<y\to x+z<y+z)
$$

も一階の文です。

従って超実数でも

$$
X<Y
\to
X+Z<Y+Z
$$

が全ての $X,Y,Z\in{}^*\mathbb R$ について成り立ちます。

NSA1 ではこれを代表列から直接確認できました。NSA3 以降は、同じ種類の一階命題を一つずつ再証明せず、移送原理でまとめて使えます。

### 6.3 正の元には正の平方根がある

実数では

$$
\forall x\;
\left(
0<x
\to
\exists y\;
(0<y\land y\cdot y=x)
\right)
$$

が真です。

これは固定した順序体言語の一階の文なので、超実数でも

$$
0<X
\to
\exists Y\in{}^*\mathbb R\;
(0<Y\land Y^2=X)
$$

が成り立ちます。

$X$ が無限大超実数でも、この結論は変わりません。存在する平方根 $Y$ も一般には非標準な超実数です。

---

## 7. 固定した標準関数・標準関係を言語へ入れる

順序体言語には $\sin$ や $\exp$ のような関数記号はありません。しかし、固定した関数一つを扱いたいなら、言語を拡張できます。

<a id="cor-nsa3-standard-symbol-transfer"></a>
<!-- formal-statement-start -->
### 系（固定した標準関数・標準関係の移送）

固定した関数

$$
f:M^k\to M
$$

を表す $k$ 項関数記号を言語へ追加し、$\mathcal M$ でその記号を $f$ として解釈する。

このとき超冪での解釈は

$$
{}^*f([a_n^1],\ldots,[a_n^k])
=
[f(a_n^1,\ldots,a_n^k)].
$$

同様に固定した関係 $R\subseteq M^k$ を言語へ追加すると、その超冪での解釈は

$$
{}^*R([a_n^1],\ldots,[a_n^k])
$$

が真であることと

$$
\{n:R(a_n^1,\ldots,a_n^k)\}\in\mathcal U
$$

であることが同値になる。

拡張した言語の任意の一階論理式について移送原理が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

言語へ新しい関数記号または関係記号を追加したあとも、一つの一階言語とその構造であることに変わりはありません。

超冪での関数・関係の解釈は第1節の定義そのものです。その拡張言語へ Łoś の定理と移送原理を適用すれば結論が従います。
<!-- proof-end -->

例えば固定した

$$
f(x)=x^2+1
$$

を言語へ入れると

$$
{}^*f([a_n])
=
[a_n^2+1].
$$

実数で

$$
\forall x\;(f(x)>0)
$$

が真なので、移送により全ての超実数 $X$ について

$$
{}^*f(X)>0
$$

です。

### 7.1 中間値型の主張を使うとき

固定した関数 $f$ を言語へ入れたうえで、その $f$ が実数上で中間値性を持つなら、その性質を一階論理式として書いて移送できます。

ただし

> 任意の連続関数 $f$ について中間値の定理が成り立つ

というメタな定理を、そのまま一ソートの順序体言語へ移送しているわけではありません。

固定関数 $f$ を関数記号として扱うのか、関数そのものを量化する別ソートを用意するのかを先に決める必要があります。

---

## 8. 多ソート移送が内部集合への入口になる

NSA2 の集合ソート

$$
R,
\qquad
\operatorname{Set}(R)
$$

を思い出します。

<a id="prop-nsa3-many-sorted-transfer"></a>
<!-- formal-statement-start -->
### 命題（多ソート超冪での移送）

$\mathcal L$ を多ソート一階言語、$\mathcal M$ を各ソートの台集合が空でない $\mathcal L$-構造とする。各ソート $S$ について

$$
P_S=M_S^{\mathbb N}/\mathcal U
$$

として超冪構造 $\mathcal P$ を作る。

型の合った任意の一階論理式 $\varphi$ について、自由変数に対応する代表列を各ソートから取れば

$$
\mathcal P\models\varphi([a_n^1],\ldots,[a_n^k])
$$

であることと

$$
\{n:\mathcal M\models\varphi(a_n^1,\ldots,a_n^k)\}\in\mathcal U
$$

であることは同値である。

従って標準パラメータを定数列で埋め込んだ場合には、多ソート言語でも移送原理が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Łoś の定理の証明を、各変数・項・関数記号・関係記号のソートを保ちながら繰り返します。

原子論理式では、項評価補題の各項が宣言された出力ソートに属するため、同じソートの超冪で等号・関係を評価できます。否定・論理積・論理和ではソートに依存する操作はありません。

存在量化

$$
\exists y^T\,\psi
$$

では、各添字での witness 集合はソート $T$ の台集合 $M_T$ の非空部分集合です。SET9 の可算選択をその可算族へ適用して $b_n\in M_T$ を選べば、$[b_n]\in P_T$ が超冪側の witness になります。

全称量化も、反例 witness を作る場合には同じソート $T$ で列を選びます。

従って構文帰納法の全段階が型を保って成立し、一ソートの Łoś の定理と同じ同値が得られます。標準パラメータの場合は真になる添字集合が $\mathbb N$ または $\varnothing$ になるので、移送原理も同様に従います。
<!-- proof-end -->

標準構造で

$$
M_R=\mathbb R,
\qquad
M_{\operatorname{Set}(R)}=\mathcal P(\mathbb R)
$$

とし、所属関係

$$
\in\ \subseteq R\times\operatorname{Set}(R)
$$

を入れます。

超冪では

$$
P_R
=
\mathbb R^{\mathbb N}/\mathcal U
=
{}^*\mathbb R,
$$

$$
P_{\operatorname{Set}(R)}
=
\mathcal P(\mathbb R)^{\mathbb N}/\mathcal U.
$$

集合ソートの要素は集合列

$$
(A_n)
$$

の同値類 $[A_n]$ です。

数の超実数 $X=[x_n]$ に対し

$$
X\in[A_n]
$$

であることは、所属関係の超冪解釈により

$$
\{n:x_n\in A_n\}\in\mathcal U
$$

と同値です。

固定した標準集合 $A\subseteq\mathbb R$ の定数列

$$
[A,A,A,\ldots]
$$

を

$$
{}^*A
$$

と書けば

$$
[x_n]\in{}^*A
\iff
\{n:x_n\in A\}\in\mathcal U.
$$

これが NSA4 で内部集合を定義する入口です。

重要なのは、集合ソートの超冪が

$$
\mathcal P({}^*\mathbb R)
$$

そのものではないことです。量化変数が走るのは集合列の同値類として得られる対象です。外から見た任意の部分集合まで自動的に量化しているわけではありません。

---

## 9. 移送できない外部的な言い方

<a id="prop-nsa3-first-order-restriction"></a>
<!-- formal-statement-start -->
### 命題（移送原理の一階制約）

この章の移送原理が直接適用されるのは、あらかじめ固定した一階言語 $\mathcal L$ の一階論理式である。

従って次のような性質は、そのままでは移送原理の対象にならない。

- $\mathcal L$ に記号がない「標準である」という外部的性質。
- 「全ての標準実数」のように、超冪の台集合全体より狭い外部的範囲だけを量化する言い方。
- 対応するソートを用意していないのに、部分集合や関数そのものを量化する言い方。
- 多ソート化した場合でも、そのソートの超冪を越えて任意の外部部分集合まで量化する言い方。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Łoś の定理は、一階論理式を原子論理式・論理結合子・量化から作る構文帰納法で証明しました。従って定理が扱う語彙と量化範囲は、固定した言語と構造で指定されたものに限られます。

記号が言語にない性質は、その構文の一階論理式ではありません。また量化記号は、対応するソートの台集合全体を走ります。超冪ではその台集合が各ソートの超冪になるため、「標準元だけ」や「外部部分集合全部」へ量化範囲を勝手に置き換えることはできません。

以下の各例は、この構文上・意味論上の制約が実際にどう現れるかを確認するものです。
<!-- proof-end -->

### 9.1 「標準である」は現在の言語にない

超実数 $X$ が標準元であるとは、ある $a\in\mathbb R$ が存在して

$$
X={}^*a
$$

となることです。

しかし順序体言語には「標準である」という述語記号はありません。

では述語 $\operatorname{Std}$ を勝手に追加すればよいでしょうか。

標準構造 $\mathbb R$ では全ての実数が標準なので

$$
\operatorname{Std}^{\mathbb R}=\mathbb R
$$

と解釈するしかありません。

その超冪では任意の $X=[x_n]$ について

$$
\{n:\operatorname{Std}(x_n)\}
=
\mathbb N.
$$

従って

$$
\operatorname{Std}^{\mathcal P}(X)
$$

は全ての超実数 $X$ で真になります。

つまり、この方法で得られる述語は「定数列から来た標準元」を切り出しません。標準性はこの超冪を外から見る概念です。

### 9.2 無限小もそのままでは一階ではない

$X$ が無限小であるとは

$$
|X|<r
$$

が全ての正の**標準実数** $r$ について成り立つことです。

量化範囲を全超実数へ変えて

$$
\forall r>0\;(|X|<r)
$$

としてはいけません。

$X>0$ なら $r=X/2$ も超実数なので、この式は非零の正の無限小に対してさえ偽になります。

「標準な $r$ に限る」という外部条件が本質です。

### 9.3 Dedekind 完備性をそのまま超実数へ移さない

「全ての非空有界部分集合は上限を持つ」という通常の Dedekind 完備性は、数だけを量化する一ソート順序体言語の一階文ではありません。

集合ソートを追加すれば、標準構造の部分集合についての命題を一階化できます。しかし移送後に集合ソートが走るのは第8節の内部集合です。

従って得られるのは内部集合についての対応する主張であり、

$$
{}^*\mathbb R
$$

の任意の外部部分集合まで Dedekind 完備である、という結論ではありません。

実際、後で見るように超実数体そのものは実数体と同じ意味で Dedekind 完備ではありません。

---

## 10. 移送を使う前の確認手順

[移送原理](#cor-nsa3-transfer)を使うときは、完成式だけを書かずに少なくとも次を確認します。

1. 元の標準構造は何か。
2. 使っている言語にはどの定数・関数・関係が入っているか。
3. 移送したい主張はその言語の一階論理式か。
4. 各量化変数はどのソートを走るか。
5. 固定関数・固定集合を使うなら、その記号をどの構造でどう解釈したか。
6. 移送後の関数・関係・集合は座標ごとにどう拡張されるか。
7. standard・無限小・有限・外部集合など、外から定義する語を紛れ込ませていないか。

NSA4 以降ではこの確認が特に重要です。「transfer より」と一言書く前に、何を transfer しているのかを一度式に落とします。

---

## 演習

### Level A

<a id="ex-nsa3-a01"></a>
#### NSA3-A01 項評価補題を具体的に確認する
- Level: A

$\mathbb R_{\mathrm{of}}$ の超冪で

$$
X=[x_n],
\qquad
Y=[y_n]
$$

とする。

項

$$
t(x,y)=(x+y)^2+1
$$

について

$$
t^{{}^*\mathbb R}(X,Y)
=
[(x_n+y_n)^2+1]
$$

となることを、項を内側から評価して確認せよ。

<!-- solution-start -->
#### 詳細解答

まず超冪の加法から

$$
X+Y=[x_n+y_n].
$$

次に乗法を使うと

$$
(X+Y)^2
=
[x_n+y_n]\,[x_n+y_n]
=
[(x_n+y_n)^2].
$$

定数 $1$ は定数列の同値類

$$
{}^*1=[1,1,\ldots]
$$

なので

$$
(X+Y)^2+1
=
[(x_n+y_n)^2]+[1]
=
[(x_n+y_n)^2+1].
$$

これは各添字で項 $t$ を先に評価してから同値類を取ったものです。
<!-- solution-end -->

<a id="ex-nsa3-a02"></a>
#### NSA3-A02 否定と論理和の添字集合を読む
- Level: A

論理式 $\psi,\theta$ に対応する真になる添字集合をそれぞれ $A,B\subseteq\mathbb N$ とする。

1. $\neg\psi$ の真になる添字集合を求めよ。
2. $\psi\lor\theta$ の真になる添字集合を求めよ。
3. 超フィルター $\mathcal U$ について

$$
A\cup B\in\mathcal U
\iff
A\in\mathcal U
\text{ または }
B\in\mathcal U
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

1. 否定は各添字で真偽を反転するので

$$
T_{\neg\psi}
=
\mathbb N\setminus A.
$$

2. 論理和はどちらか一方が真なら真なので

$$
T_{\psi\lor\theta}
=
A\cup B.
$$

3. $A\in\mathcal U$ なら $A\subseteq A\cup B$ と上方閉性から $A\cup B\in\mathcal U$ です。$B\in\mathcal U$ の場合も同じです。

逆に $A\cup B\in\mathcal U$ とし、$A,B$ のどちらも $\mathcal U$ に属さないと仮定します。[超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy)から

$$
\mathbb N\setminus A\in\mathcal U,
\qquad
\mathbb N\setminus B\in\mathcal U.
$$

有限共通部分を取ると

$$
\mathbb N\setminus(A\cup B)\in\mathcal U.
$$

すると $A\cup B$ とその補集合がともに $\mathcal U$ に入り、空集合も $\mathcal U$ に入ることになって矛盾します。

従って $A\in\mathcal U$ または $B\in\mathcal U$ です。
<!-- solution-end -->

<a id="ex-nsa3-a03"></a>
#### NSA3-A03 多項式恒等式を移送する
- Level: A

実数で

$$
\forall x\forall y\;
(x-y)(x+y)=x^2-y^2
$$

が成り立つことを使い、任意の超実数 $X,Y$ について

$$
(X-Y)(X+Y)=X^2-Y^2
$$

が成り立つ理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

元の主張は $0,1,+,\cdot,-$ だけを使う一階の文です。従って順序体言語の部分言語で書けます。

実数構造でその文は真なので、[移送原理](#cor-nsa3-transfer)により実数構造の超冪でも同じ文が真です。

移送後の量化変数 $X,Y$ は超冪の台集合

$$
{}^*\mathbb R
$$

の全要素を走ります。従って標準実数だけでなく、無限小・無限大超実数を含む任意の $X,Y$ について恒等式が成り立ちます。
<!-- solution-end -->

<a id="ex-nsa3-a04"></a>
#### NSA3-A04 固定関数の標準拡張を計算する
- Level: A

固定関数

$$
f(x)=x^2+1
$$

を表す関数記号を言語へ追加する。

$$
X=[x_n]
$$

に対する $\,{}^*f(X)$ を求めよ。また実数上の

$$
\forall x\;(f(x)>0)
$$

から超実数上で何が従うか答えよ。

<!-- solution-start -->
#### 詳細解答

超冪の関数記号は座標ごとに解釈するので

$$
{}^*f([x_n])
=
[f(x_n)]
=
[x_n^2+1].
$$

元の実数構造では全ての $x\in\mathbb R$ について $x^2+1>0$ です。

この文は拡張した一階言語の文なので移送原理を適用でき、

$$
\forall X\in{}^*\mathbb R,
\qquad
{}^*f(X)>0
$$

が従います。
<!-- solution-end -->

### Level B

<a id="ex-nsa3-b01"></a>
#### NSA3-B01 存在量化の witness 列を構成する
- Level: B

論理式

$$
\exists y\,\psi(y,x)
$$

について、代表列 $X=[a_n]$ を固定する。

$$
E
=
\{n:\mathcal M\models\exists y\,\psi(y,a_n)\}
\in\mathcal U
$$

と仮定する。

可算選択をどこで使うかを明示しながら

$$
\mathcal P\models\exists y\,\psi(y,X)
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$n\in E$ に対して

$$
W_n
=
\{b\in M:\mathcal M\models\psi(b,a_n)\}
$$

と置きます。$E$ の定義から $W_n$ は非空です。

台集合 $M$ は非空なので一つ $b_0\in M$ を固定します。

全ての $n\in\mathbb N$ について

$$
V_n
=
\begin{cases}
W_n,&n\in E,\\
\{b_0\},&n\notin E
\end{cases}
$$

と置くと、$(V_n)$ は非空集合の可算族です。

ここで SET9 の可算選択を使い

$$
b_n\in V_n
$$

となる列 $(b_n)$ を選びます。

$n\in E$ なら $b_n\in W_n$ なので

$$
\mathcal M\models\psi(b_n,a_n).
$$

$n\notin E$ なら存在量化そのものが偽なので、どの $b$ を入れても $\psi(b,a_n)$ は偽です。

従って

$$
\{n:\mathcal M\models\psi(b_n,a_n)\}
=
E
\in\mathcal U.
$$

$\psi$ に対する Łoś の帰納法の仮定から

$$
\mathcal P\models\psi([b_n],X).
$$

よって $[b_n]$ が超冪での witness となり

$$
\mathcal P\models\exists y\,\psi(y,X).
$$

可算選択を使ったのは、各添字で存在する witness を一つの列 $(b_n)$ に同時にまとめる箇所です。
<!-- solution-end -->

<a id="ex-nsa3-b02"></a>
#### NSA3-B02 全称量化の逆向きを再構成する
- Level: B

$$
\mathcal P
\models
\forall y\,\psi(y,X)
$$

を仮定する。

$$
E
=
\{n:\mathcal M\models\forall y\,\psi(y,a_n)\}
$$

が $\mathcal U$ に属することを、$E\notin\mathcal U$ と仮定して反例 witness の列を作る方法で示せ。

<!-- solution-start -->
#### 詳細解答

$E\notin\mathcal U$ と仮定します。

[超フィルターの二者択一](../SET9/index.md#thm-set9-ultrafilter-dichotomy)から

$$
F=\mathbb N\setminus E\in\mathcal U.
$$

$n\in F$ では

$$
\mathcal M\not\models\forall y\,\psi(y,a_n)
$$

なので、少なくとも一つ

$$
b\in M
$$

が存在して

$$
\mathcal M\models\neg\psi(b,a_n).
$$

従って

$$
W_n
=
\{b\in M:\mathcal M\models\neg\psi(b,a_n)\}
$$

は $n\in F$ で非空です。

$n\notin F$ では固定元 $b_0\in M$ を入れるように非空集合族を作り、可算選択で列 $(b_n)$ を取ります。

すると

$$
F
\subseteq
\{n:\mathcal M\models\neg\psi(b_n,a_n)\}.
$$

$F\in\mathcal U$ と上方閉性から右辺も $\mathcal U$ に属します。帰納法の仮定により

$$
\mathcal P\models\neg\psi([b_n],X).
$$

しかし最初の仮定では全ての超冪の元 $Y$ について $\psi(Y,X)$ が真です。特に $Y=[b_n]$ でも真でなければならず矛盾します。

従って $E\in\mathcal U$ です。
<!-- solution-end -->

<a id="ex-nsa3-b03"></a>
#### NSA3-B03 standard 述語を追加する誤りを説明する
- Level: B

「標準超実数だけを切り出したいので、実数構造へ1項述語 $\operatorname{Std}$ を追加し

$$
\operatorname{Std}^{\mathbb R}=\mathbb R
$$

とすればよい」という案を考える。

その超冪で $\operatorname{Std}$ がどの超実数に対して真になるか求め、この案が失敗する理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

任意の超実数

$$
X=[x_n]
$$

を取ります。

元の実数構造では全ての $x_n$ が実数なので

$$
\operatorname{Std}^{\mathbb R}(x_n)
$$

は全ての $n$ で真です。

従って真になる添字集合は

$$
\{n:\operatorname{Std}(x_n)\}
=
\mathbb N.
$$

全体集合は $\mathcal U$ に属するので [Łoś の定理](#thm-nsa3-los)から

$$
\operatorname{Std}^{\mathcal P}(X)
$$

は任意の $X\in{}^*\mathbb R$ で真です。

したがってこの述語は定数列から来る標準元だけを切り出さず、超実数全体を表します。

「標準である」という概念は、元の構造の内部にある普通の述語をそのまま超冪化して得られるものではありません。
<!-- solution-end -->

<a id="ex-nsa3-b04"></a>
#### NSA3-B04 集合ソートの量化範囲を確認する
- Level: B

標準構造で

$$
M_R=\mathbb R,
\qquad
M_{\operatorname{Set}(R)}=\mathcal P(\mathbb R)
$$

とし、所属関係を持つ二ソート言語を考える。

1. 超冪の集合ソートを式で書け。
2. $A\subseteq\mathbb R$ を固定したとき $\,{}^*A$ を表す元を書け。
3. $X=[x_n]$ について

$$
X\in{}^*A
$$

の意味を添字集合で書け。
4. この量化範囲が $\mathcal P({}^*\mathbb R)$ 全体とは限らない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 集合ソートの超冪は

$$
P_{\operatorname{Set}(R)}
=
\mathcal P(\mathbb R)^{\mathbb N}/\mathcal U
$$

です。

2. 固定集合 $A$ は定数列で埋め込み

$$
{}^*A
=
[A,A,A,\ldots]
$$

と表します。

3. 所属関係の超冪解釈から

$$
X\in{}^*A
\iff
\{n:x_n\in A\}\in\mathcal U.
$$

4. 集合ソートの要素は集合列 $(A_n)$ の同値類として作られたものです。超実数全体の外から任意に選んだ部分集合が、必ず何らかの集合列 $[A_n]$ で表せるとは定義されていません。

従って多ソート移送で集合を量化しても、その量化は超冪の集合ソートを走るのであり、外部部分集合を含む $\mathcal P({}^*\mathbb R)$ 全体を自動的に走るわけではありません。
<!-- solution-end -->

### Level C

<a id="ex-nsa3-c01"></a>
#### NSA3-C01 正の超実数の平方根を移送と代表列の両方から確認する
- Level: C

実数では

$$
\forall x\;
\left(
0<x
\to
\exists y\;
(0<y\land y^2=x)
\right)
$$

が成り立つ。

1. [移送原理](#cor-nsa3-transfer)から、任意の正の超実数 $X$ が正の平方根を持つことを示せ。
2. $X=[x_n]>0$ とし

$$
E=\{n:x_n>0\}\in\mathcal U
$$

とする。代表列から平方根の witness 列 $(y_n)$ を具体的に作り、$Y=[y_n]$ が $Y>0$ かつ $Y^2=X$ を満たすことを示せ。
3. $X$ が無限小である場合に「平方根 $Y$ も標準実数である」と移送から結論できない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 元の実数上の文は $0,\cdot,<$ だけで書ける一階の文です。実数構造で真なので、[移送原理](#cor-nsa3-transfer)から超実数構造でも

$$
\forall X\;
\left(
0<X
\to
\exists Y\;
(0<Y\land Y^2=X)
\right)
$$

が真です。

従って任意の正の超実数 $X$ は正の平方根を持ちます。

2. $E\in\mathcal U$ 上では $x_n>0$ なので通常の正の平方根 $\sqrt{x_n}$ が存在します。そこで

$$
y_n
=
\begin{cases}
\sqrt{x_n},&n\in E,\\
0,&n\notin E
\end{cases}
$$

と置きます。

$n\in E$ なら

$$
y_n>0,
\qquad
y_n^2=x_n.
$$

従って

$$
E
\subseteq
\{n:y_n>0\},
$$

$$
E
\subseteq
\{n:y_n^2=x_n\}.
$$

$E\in\mathcal U$ と上方閉性から両方の右辺が $\mathcal U$ に属します。

よってNSA1 で確認した超実数の順序と $\mathcal U$-同値の判定から

$$
Y=[y_n]>0,
$$

$$
Y^2=[y_n^2]=[x_n]=X.
$$

これは Łoś の定理の存在量化の witness 構成を、平方根という具体的な場合に実行したものです。

3. 「$Y$ が標準実数である」は順序体言語の一階論理式ではありません。移送した文が保証するのは、超実数の台集合のどこかに正の平方根 $Y$ が存在することだけです。

実際、$X$ が正の非零無限小なら、その正の平方根 $Y$ も正の非零無限小になります。もし $Y$ が正の標準実数なら $Y^2$ も正の標準実数であり、非零無限小 $X$ にはなりません。

従って「存在する witness が標準である」という追加結論は移送から出ません。
<!-- solution-end -->
