# EVOL3 散逸作用素・Lumer--Phillips

<!-- definition-example-audit: strict -->

EVOL2 では、縮小 $C_0$ 半群の生成作用素を判定する Hille--Yosida 定理を学びました。そこでは

$$
\lambda I-A
$$

の可逆性と

$$
\|R(\lambda,A)\|
\le
\frac1\lambda
$$

というレゾルベント評価が中心でした。

しかし偏微分方程式では、レゾルベントを先に計算するよりも、解のエネルギーが増えないことを直接確認できる場合がよくあります。たとえば Hilbert 空間上の線形発展方程式

$$
u'(t)=Au(t)
$$

に対して

$$
\operatorname{Re}\langle Au,u\rangle\le0
$$

なら、形式的には

$$
\frac{d}{dt}\|u(t)\|^2
=
2\operatorname{Re}\langle Au(t),u(t)\rangle
\le0.
$$

つまり時間発展はノルムを増やさないはずです。

本章の問いは、その逆向きを含めて

$$
\boxed{
\text{エネルギー散逸}
\quad\Longleftrightarrow\quad
\text{縮小半群生成}
}
$$

を作用素側の条件でどう正確に記述するか、です。

ただし「エネルギーが減る」だけでは生成性に足りません。時間発展を本当に作るには、作用素が十分に大きい定義域を持ち、

$$
\lambda I-A
$$

が空間全体へ届くことが必要です。Lumer--Phillips 定理は

$$
\text{dissipativity}
+
\text{range condition}
$$

を、縮小 $C_0$ 半群の生成性と結び付けます。

本章の流れは

$$
\text{散逸性}
\to
\text{Hilbert 空間での内積条件}
\to
\text{range condition}
\to
m\text{-散逸性}
\to
\text{Lumer--Phillips}
$$

です。

---

## 1. Banach 空間では散逸性を resolvent 型不等式で定義する

Hilbert 空間では内積を使えますが、一般の Banach 空間には内積がありません。そこでまず、EVOL2 のレゾルベント評価を逆向きに読める形で定義します。

<a id="def-evol3-dissipative"></a>
<!-- formal-statement-start -->
### 定義（散逸作用素）

$X$ を実または複素 Banach 空間とし、

$$
A:D(A)\subset X\to X
$$

を線形作用素とする。

任意の $x\in D(A)$ と任意の $\lambda>0$ に対して

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|
$$

が成り立つとき、$A$ を **散逸作用素**という。
<!-- formal-statement-end -->

この定義は、もし $\lambda I-A$ が全単射なら

$$
R(\lambda,A)
=
(\lambda I-A)^{-1}
$$

に対して

$$
\|R(\lambda,A)y\|
\le
\frac1\lambda\|y\|
$$

が自動的に出る形になっています。

実際、$y=(\lambda I-A)x$ と置けば

$$
\lambda\|x\|
\le
\|y\|,
$$

従って

$$
\|x\|
\le
\frac1\lambda\|y\|.
$$

つまり Hille--Yosida で必要だった評価の半分は、散逸性だけで既に含まれています。

<!-- definition-example-start: def-evol3-dissipative -->
### **定義の確認**：$\ell^2$ 上の減衰対角作用素

$X=\ell^2(\mathbb N)$ とし、

$$
D(A)
=
\left\{
x=(x_n):
(nx_n)\in\ell^2
\right\},
$$

$$
Ax=(-nx_n)_{n\ge1}
$$

とします。

任意の $\lambda>0$ について

$$
((\lambda I-A)x)_n
=
(\lambda+n)x_n.
$$

従って

$$
\begin{aligned}
\|(\lambda I-A)x\|_2^2
&=
\sum_{n=1}^{\infty}
(\lambda+n)^2|x_n|^2
\\
&\ge
\lambda^2
\sum_{n=1}^{\infty}|x_n|^2
\\
&=
\lambda^2\|x\|_2^2.
\end{aligned}
$$

平方根を取ると

$$
\|(\lambda I-A)x\|_2
\ge
\lambda\|x\|_2.
$$

よって $A$ は散逸作用素です。
<!-- definition-example-end -->

この例は EVOL2 の縮小半群

$$
T(t)x=(e^{-nt}x_n)
$$

の生成作用素でした。散逸性は、各モードが $e^{-nt}$ で減衰することを作用素側で表しています。

---

## 2. Banach 空間の「内積の代わり」は支持汎関数で見る

散逸性のノルム不等式は Banach 空間でそのまま使えますが、エネルギー法との対応が少し見えにくい形です。

$x\ne0$ に対し [Hahn--Banach 定理](../F0_02C6_Hahn_Banach_分離定理/index.md#thm-f0-02c6-hahn-banach-real)から

$$
x^*\in X^*
$$

で

$$
\|x^*\|=\|x\|,
\qquad
x^*(x)=\|x\|^2
$$

を満たすものが取れます。このような $x^*$ を $x$ における支持汎関数と考えます。

もし各 $x\in D(A)$ に対して、そのような $x^*$ を選んで

$$
\operatorname{Re}x^*(Ax)\le0
$$

とできるなら、任意の $\lambda>0$ について

$$
\begin{aligned}
\|(\lambda I-A)x\|\|x^*\|
&\ge
\operatorname{Re}x^*((\lambda I-A)x)
\\
&=
\lambda\|x\|^2
-
\operatorname{Re}x^*(Ax)
\\
&\ge
\lambda\|x\|^2.
\end{aligned}
$$

$\|x^*\|=\|x\|$ なので

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|.
$$

従って散逸性が従います。

一般 Banach 空間では支持汎関数が一意とは限りません。Hilbert 空間では Riesz 表現により支持汎関数が内積で表されるため、次節の条件へ簡約されます。

---

## 3. Hilbert 空間では $\operatorname{Re}\langle Ax,x\rangle\le0$ と同値になる

Hilbert 空間では、散逸性を普段のエネルギー不等式そのもので判定できます。

<a id="prop-evol3-hilbert-dissipativity"></a>
<!-- formal-statement-start -->
### 命題（Hilbert 空間での散逸性判定）

$H$ を実または複素 Hilbert 空間、

$$
A:D(A)\subset H\to H
$$

を線形作用素とする。

次は同値である。

1. $A$ は散逸作用素である。
2. 任意の $x\in D(A)$ について
   $$
   \operatorname{Re}\langle Ax,x\rangle
   \le0
   $$
   が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず 2 から 1 を示します。

任意の $\lambda>0$ と $x\in D(A)$ に対し

$$
\begin{aligned}
\|(\lambda I-A)x\|^2
&=
\|\lambda x-Ax\|^2
\\
&=
\lambda^2\|x\|^2
-
2\lambda
\operatorname{Re}\langle Ax,x\rangle
+
\|Ax\|^2.
\end{aligned}
$$

仮定

$$
\operatorname{Re}\langle Ax,x\rangle\le0
$$

から中央項は非負なので

$$
\|(\lambda I-A)x\|^2
\ge
\lambda^2\|x\|^2.
$$

従って

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|.
$$

よって $A$ は散逸的です。

逆に 1 を仮定します。散逸性を二乗すると

$$
\lambda^2\|x\|^2
-
2\lambda
\operatorname{Re}\langle Ax,x\rangle
+
\|Ax\|^2
\ge
\lambda^2\|x\|^2.
$$

従って

$$
-2\lambda
\operatorname{Re}\langle Ax,x\rangle
+
\|Ax\|^2
\ge0.
$$

$\lambda>0$ で割ると

$$
-2\operatorname{Re}\langle Ax,x\rangle
+
\frac{\|Ax\|^2}{\lambda}
\ge0.
$$

ここで $\lambda\to\infty$ とすると

$$
-2\operatorname{Re}\langle Ax,x\rangle
\ge0.
$$

したがって

$$
\operatorname{Re}\langle Ax,x\rangle
\le0.
$$

よって 1 と 2 は同値です。$\square$
<!-- proof-end -->

この命題により、Hilbert 空間では PDE の積分 by parts から得られるエネルギー不等式を、そのまま散逸性の確認に使えます。

---

## 4. 散逸性だけでは足りない：定義域が小さすぎる例

ここで重要な反例を見ます。

$X=\ell^2$ とし、稠密部分空間

$$
c_{00}
=
\{x\in\ell^2:x_n=0\text{ が有限個を除いて成り立つ}\}
$$

上だけで

$$
A:D(A)=c_{00}\to\ell^2,
\qquad
Ax=0
$$

と定めます。

任意の $\lambda>0$ に対し

$$
\|(\lambda I-A)x\|
=
\|\lambda x\|
=
\lambda\|x\|.
$$

従って $A$ は散逸作用素です。

しかし

$$
\operatorname{Ran}(\lambda I-A)
=
\lambda c_{00}
=
c_{00}
\ne
\ell^2.
$$

したがって $\lambda I-A$ は空間全体へ届きません。

しかも $A$ は閉作用素ではありません。例えば

$$
x=(1/n)_{n\ge1}
$$

は $\ell^2$ に入り、有限切断 $x^{(N)}\in c_{00}$ は

$$
x^{(N)}\to x
$$

ですが

$$
Ax^{(N)}=0\to0.
$$

もし $A$ が閉なら $x\in D(A)=c_{00}$ でなければなりませんが、実際には $x\notin c_{00}$ です。

この作用素は

$$
\widetilde A=0
\qquad
D(\widetilde A)=\ell^2
$$

へ散逸性を保ったまま拡張できます。

従って

$$
\boxed{
\text{散逸性}
\quad\text{だけでは}
\quad
\text{生成作用素になるには足りない}
}
$$

ということが分かります。

不足しているのが range condition です。

---

## 5. range condition と $m$-散逸性

散逸性だけでは、前節の $c_{00}$ 上の零作用素のように「定義域が小さすぎて時間発展を決められない」場合を排除できません。そこで、$lambda I-A$ が空間全体を覆うことを要求し、散逸性に不足していた生成作用素としての十分な大きさを補います。

<a id="def-evol3-range-m-dissipative"></a>
<!-- formal-statement-start -->
### 定義（range condition と m-散逸作用素）

$X$ を Banach 空間、

$$
A:D(A)\subset X\to X
$$

を散逸作用素とする。

ある $\lambda_0>0$ について

$$
\operatorname{Ran}(\lambda_0 I-A)
=
X
$$

が成り立つことを **range condition** という。

散逸性と range condition の両方を満たす $A$ を、本章では **$m$-散逸作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-evol3-range-m-dissipative -->
### **定義の確認**：対角作用素は $m$-散逸的

第1節の

$$
Ax=(-nx_n)
$$

を考えます。

任意の $\lambda>0$ と $y=(y_n)\in\ell^2$ に対して

$$
x_n=\frac{y_n}{\lambda+n}
$$

と置きます。

すると

$$
\sum_{n=1}^{\infty}n^2|x_n|^2
=
\sum_{n=1}^{\infty}
\left(
\frac{n}{\lambda+n}
\right)^2
|y_n|^2
\le
\|y\|_2^2.
$$

よって $x\in D(A)$ です。

さらに

$$
((\lambda I-A)x)_n
=
(\lambda+n)\frac{y_n}{\lambda+n}
=
y_n.
$$

したがって

$$
\operatorname{Ran}(\lambda I-A)
=
\ell^2.
$$

第1節で散逸性も確認したので、$A$ は $m$-散逸作用素です。
<!-- definition-example-end -->

$m$ は maximal の意味を持つ記号として使われますが、「極大」の言い方には文献差があります。そこで順序による極大性も区別しておきます。

<a id="def-evol3-maximal-dissipative"></a>
<!-- formal-statement-start -->
### 定義（極大散逸作用素）

散逸作用素 $A$ が **極大散逸的**であるとは、$A$ を真に拡張する散逸作用素が存在しないことをいう。

すなわち、散逸作用素 $B$ が

$$
A\subset B
$$

を満たせば必ず

$$
A=B
$$

となることをいう。
<!-- formal-statement-end -->

本章で Lumer--Phillips に使うのは、range condition を含む $m$-散逸性です。

$m$-散逸作用素は順序の意味でも極大散逸的です。実際、$A\subset B$ を散逸的拡張とし、$\operatorname{Ran}(\lambda_0I-A)=X$ とします。任意の $x\in D(B)$ に対し

$$
y=(\lambda_0I-B)x
$$

と置きます。range condition から、ある $z\in D(A)$ が存在して

$$
(\lambda_0I-A)z=y
$$

となります。$A\subset B$ だから

$$
(\lambda_0I-B)z=y.
$$

従って

$$
(\lambda_0I-B)(x-z)=0.
$$

散逸性から $\lambda_0I-B$ は単射なので

$$
x=z\in D(A).
$$

よって $D(B)\subset D(A)$、従って $A=B$ です。

---

## 6. range condition を持つ散逸作用素は自動的に閉じる

EVOL2 の Hille--Yosida を使うには閉性が必要でした。ところが Lumer--Phillips では、range condition が閉性まで与えます。

<a id="prop-evol3-m-dissipative-closed"></a>
<!-- formal-statement-start -->
### 命題（m-散逸作用素は閉作用素）

$X$ を Banach 空間、

$$
A:D(A)\subset X\to X
$$

を $m$-散逸作用素とする。

すると $A$ は閉作用素である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

range condition を満たす $\lambda_0>0$ を一つ固定します。

散逸性から

$$
\|(\lambda_0I-A)x\|
\ge
\lambda_0\|x\|
$$

なので $\lambda_0I-A$ は単射です。

range condition により全射でもあるので

$$
R_0
=
(\lambda_0I-A)^{-1}:X\to D(A)
$$

が定義できます。

さらに $y=(\lambda_0I-A)x$ と置けば

$$
\|R_0y\|
=
\|x\|
\le
\frac1{\lambda_0}\|y\|.
$$

従って

$$
\|R_0\|
\le
\frac1{\lambda_0}.
$$

ここで

$$
x_n\in D(A),
\qquad
x_n\to x,
\qquad
Ax_n\to y
$$

とします。

すると

$$
(\lambda_0I-A)x_n
\to
\lambda_0x-y.
$$

各 $n$ について

$$
x_n
=
R_0(\lambda_0I-A)x_n.
$$

$R_0$ は有界なので極限を取れて

$$
x
=
R_0(\lambda_0x-y).
$$

右辺は $D(A)$ に入るので

$$
x\in D(A).
$$

さらに

$$
(\lambda_0I-A)x
=
\lambda_0x-y
$$

だから

$$
Ax=y.
$$

従って $A$ のグラフは閉じています。$\square$
<!-- proof-end -->

つまり Lumer--Phillips では

$$
\text{散逸性}
+
\text{range condition}
$$

から

$$
\text{閉性}
$$

を別仮定なしで回収できます。

---

## 7. range condition は一点で確認すれば全ての $\lambda>0$ へ広がる

$m$-散逸性の定義では、ある一つの $\lambda_0>0$ で range condition を仮定しました。

Hille--Yosida では全ての $\lambda>0$ に対するレゾルベントが必要です。そこで一点の全射性を正実軸全体へ広げます。

<a id="lem-evol3-range-propagation"></a>
<!-- formal-statement-start -->
### 補題（range condition の正実軸への伝播）

$A:D(A)\subset X\to X$ を散逸作用素とする。

ある $\mu>0$ について

$$
\operatorname{Ran}(\mu I-A)=X
$$

とする。

すると

$$
|\lambda-\mu|<\mu
$$

を満たすすべての $\lambda>0$ について

$$
\operatorname{Ran}(\lambda I-A)=X.
$$

特に、ある $\lambda_0>0$ で range condition が成り立てば、すべての $\lambda>0$ について

$$
\operatorname{Ran}(\lambda I-A)=X
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\mu I-A$ は散逸性により単射、仮定により全射なので逆作用素

$$
R_\mu=(\mu I-A)^{-1}
$$

を持ちます。

散逸性から

$$
\|R_\mu\|
\le
\frac1\mu.
$$

任意の $x\in D(A)$ に対して

$$
y=(\mu I-A)x
$$

と置くと

$$
x=R_\mu y.
$$

したがって

$$
\begin{aligned}
(\lambda I-A)x
&=
(\mu I-A)x
+
(\lambda-\mu)x
\\
&=
y
+
(\lambda-\mu)R_\mu y
\\
&=
\left[
I+(\lambda-\mu)R_\mu
\right]y.
\end{aligned}
$$

よって

$$
\operatorname{Ran}(\lambda I-A)
=
\operatorname{Ran}
\left[
I+(\lambda-\mu)R_\mu
\right].
$$

ここで

$$
\|(\lambda-\mu)R_\mu\|
\le
\frac{|\lambda-\mu|}{\mu}
<1.
$$

従って Neumann 級数

$$
\left[
I+(\lambda-\mu)R_\mu
\right]^{-1}
=
\sum_{k=0}^{\infty}
\left[
-(\lambda-\mu)R_\mu
\right]^k
$$

が作用素ノルムで収束し、この作用素は全単射です。

よって

$$
\operatorname{Ran}(\lambda I-A)=X.
$$

これで $\mu$ の周囲の区間

$$
0<\lambda<2\mu
$$

へ全射性が広がりました。

最初の range condition の点を $\lambda_0$ とします。上の議論で

$$
(0,2\lambda_0)
$$

の全てで全射です。

次に

$$
\mu_1=\frac32\lambda_0
$$

を選べば $\mu_1<2\lambda_0$ なので $\mu_1$ でも全射です。同じ議論から

$$
(0,2\mu_1)
=
(0,3\lambda_0)
$$

まで広がります。

さらに

$$
\mu_k
=
\left(\frac32\right)^k\lambda_0
$$

と繰り返せば

$$
(0,2\mu_k)
$$

まで全射性が広がります。

$\mu_k\to\infty$ なので、任意の $\lambda>0$ はいずれかの区間 $(0,2\mu_k)$ に入ります。

従って全ての $\lambda>0$ で

$$
\operatorname{Ran}(\lambda I-A)=X.
$$

$\square$
<!-- proof-end -->

散逸性と全射性を合わせると、各 $\lambda>0$ で

$$
\|R(\lambda,A)\|
\le
\frac1\lambda
$$

も同時に得られます。

これで Hille--Yosida のレゾルベント条件がそろいました。

---

## 8. Lumer--Phillips 定理

<a id="thm-evol3-lumer-phillips"></a>
<!-- formal-statement-start -->
### 定理（Lumer--Phillips）

$X$ を Banach 空間、

$$
A:D(A)\subset X\to X
$$

を稠密定義線形作用素とする。

次は同値である。

1. $A$ は縮小 $C_0$ 半群の生成作用素である。
2. $A$ は $m$-散逸作用素である。すなわち
   - $A$ は散逸的であり、
   - ある $\lambda_0>0$ について
     $$
     \operatorname{Ran}(\lambda_0I-A)=X
     $$
     が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1 から 2

$A$ が縮小 $C_0$ 半群の生成作用素であるとします。

EVOL2 の生成作用素の一般論から $A$ は閉かつ稠密定義です。

さらに縮小半群版 Hille--Yosida から、任意の $\lambda>0$ について

$$
\lambda\in\rho(A),
$$

$$
\|R(\lambda,A)\|
\le
\frac1\lambda.
$$

任意の $x\in D(A)$ に対して

$$
y=(\lambda I-A)x
$$

と置けば

$$
x=R(\lambda,A)y.
$$

従って

$$
\|x\|
\le
\frac1\lambda\|y\|.
$$

すなわち

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|.
$$

よって $A$ は散逸的です。

また $\lambda\in\rho(A)$ なので

$$
\operatorname{Ran}(\lambda I-A)=X.
$$

従って $A$ は $m$-散逸作用素です。

#### 2 から 1

逆に、$A$ が稠密定義かつ $m$-散逸的であるとします。

第6節の命題から $A$ は閉作用素です。

第7節の補題から、ある一点の range condition は全ての $\lambda>0$ へ広がるので

$$
\operatorname{Ran}(\lambda I-A)=X
\qquad(\lambda>0).
$$

散逸性から $\lambda I-A$ は単射です。従って全ての $\lambda>0$ について

$$
\lambda\in\rho(A).
$$

さらに散逸性から

$$
\|R(\lambda,A)\|
\le
\frac1\lambda.
$$

以上により

- $A$ は閉作用素
- $D(A)$ は稠密
- 全ての $\lambda>0$ が $\rho(A)$ に入る
- $\|R(\lambda,A)\|\le1/\lambda$

がそろいました。

これは EVOL2 の縮小半群版 Hille--Yosida の条件そのものです。

従って $A$ は縮小 $C_0$ 半群の生成作用素です。$\square$
<!-- proof-end -->

Lumer--Phillips は Hille--Yosida と競合する別定理ではありません。

証明を見ると

$$
\boxed{
\text{散逸性}
+
\text{range condition}
\Longrightarrow
\text{Hille--Yosida の resolvent 条件}
}
$$

という変換になっています。

つまり、PDE のエネルギー構造をレゾルベント条件へ橋渡しする定理です。

---

## 9. Hilbert 空間版はエネルギー不等式そのものになる

第3節の判定を Lumer--Phillips へ代入すると、Hilbert 空間では非常に使いやすい形になります。

<a id="cor-evol3-lumer-phillips-hilbert"></a>
<!-- formal-statement-start -->
### 系（Hilbert 空間版 Lumer--Phillips）

$H$ を Hilbert 空間、

$$
A:D(A)\subset H\to H
$$

を稠密定義線形作用素とする。

次は同値である。

1. $A$ は縮小 $C_0$ 半群の生成作用素である。
2. 任意の $x\in D(A)$ について
   $$
   \operatorname{Re}\langle Ax,x\rangle\le0
   $$
   であり、ある $\lambda_0>0$ について
   $$
   \operatorname{Ran}(\lambda_0I-A)=H
   $$
   が成り立つ。
<!-- formal-statement-end -->

これは PDE でよく現れる

$$
\text{積分 by parts}
\to
\operatorname{Re}\langle Ax,x\rangle\le0
\to
\text{range condition}
\to
\text{半群生成}
$$

という流れを、そのまま定理にしたものです。

---

## 10. 散逸性は古典解のエネルギーを単調減少させる

$A$ が縮小半群 $(T(t))_{t\ge0}$ の生成作用素で、$x\in D(A)$ とします。

EVOL2 の軌道微分から

$$
u(t)=T(t)x
$$

は

$$
u'(t)=Au(t)
$$

を満たし、さらに

$$
u(t)\in D(A)
$$

です。

Hilbert 空間なら

$$
\begin{aligned}
\frac{d}{dt}\|u(t)\|^2
&=
\frac{d}{dt}\langle u(t),u(t)\rangle
\\
&=
2\operatorname{Re}\langle u'(t),u(t)\rangle
\\
&=
2\operatorname{Re}\langle Au(t),u(t)\rangle.
\end{aligned}
$$

散逸性から

$$
\operatorname{Re}\langle Au(t),u(t)\rangle
\le0,
$$

従って

$$
\frac{d}{dt}\|u(t)\|^2
\le0.
$$

よって

$$
\|T(t)x\|
\le
\|x\|.
$$

ここでは $x\in D(A)$ に対して微分しました。一般の $x\in H$ については $D(A)$ の稠密性と $T(t)$ の連続性で近似すれば縮小性が全空間へ広がります。

この計算は、Lumer--Phillips の「散逸」の名前が単なる用語ではなく、エネルギー法そのものを表していることを示しています。

---

## 11. Dirichlet Laplacian を Lumer--Phillips で判定する

$H=L^2(0,\pi)$ とし、

$$
e_n(x)=\sqrt{\frac2\pi}\sin(nx)
$$

を正規直交基底とします。

作用素 $A$ を

$$
D(A)
=
\left\{
u=\sum_{n=1}^{\infty}a_ne_n:
\sum_{n=1}^{\infty}n^4|a_n|^2<\infty
\right\},
$$

$$
Au
=
-\sum_{n=1}^{\infty}n^2a_ne_n
$$

で定めます。

これは零 Dirichlet 境界条件の Laplacian に対応します。

<a id="prop-evol3-dirichlet-laplacian"></a>
<!-- formal-statement-start -->
### 命題（Dirichlet Laplacian は縮小半群を生成する）

上の $A$ は $L^2(0,\pi)$ 上の縮小 $C_0$ 半群を生成する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず有限個の $e_n$ の線形結合は $D(A)$ に入り、それらは $L^2(0,\pi)$ に稠密なので $D(A)$ は稠密です。

次に

$$
u=\sum a_ne_n\in D(A)
$$

に対して

$$
\begin{aligned}
\langle Au,u\rangle
&=
\left\langle
-\sum n^2a_ne_n,
\sum a_ne_n
\right\rangle
\\
&=
-\sum_{n=1}^{\infty}
n^2|a_n|^2
\\
&\le0.
\end{aligned}
$$

従って [Hilbert 空間での散逸性判定](#prop-evol3-hilbert-dissipativity)から $A$ は散逸的です。

次に $\lambda>0$ と

$$
f=\sum f_ne_n\in L^2(0,\pi)
$$

を任意に取ります。

$$
u
=
\sum_{n=1}^{\infty}
\frac{f_n}{\lambda+n^2}e_n
$$

と置きます。

まず

$$
\begin{aligned}
\sum_{n=1}^{\infty}
n^4
\left|
\frac{f_n}{\lambda+n^2}
\right|^2
&=
\sum_{n=1}^{\infty}
\left(
\frac{n^2}{\lambda+n^2}
\right)^2
|f_n|^2
\\
&\le
\sum_{n=1}^{\infty}|f_n|^2
<\infty.
\end{aligned}
$$

従って $u\in D(A)$ です。

さらに

$$
\begin{aligned}
(\lambda I-A)u
&=
\sum_{n=1}^{\infty}
(\lambda+n^2)
\frac{f_n}{\lambda+n^2}
e_n
\\
&=
\sum_{n=1}^{\infty}f_ne_n
\\
&=
f.
\end{aligned}
$$

よって

$$
\operatorname{Ran}(\lambda I-A)
=
L^2(0,\pi).
$$

散逸性と range condition がそろったので、[Hilbert 空間版 Lumer--Phillips](#cor-evol3-lumer-phillips-hilbert) により $A$ は縮小 $C_0$ 半群を生成します。$\square$
<!-- proof-end -->

EVOL2 では同じ結論を Hille--Yosida のレゾルベント表示から得ました。

ここでは

$$
\langle Au,u\rangle\le0
$$

というエネルギー構造を入口にしています。

滑らかな $u$ については積分 by parts により

$$
\langle u'',u\rangle
=
-\int_0^\pi|u'(x)|^2\,dx
$$

となるため、Fourier 基底で見た散逸性と PDE のエネルギー法は同じ内容です。

---

## 12. Stokes 作用素へ接続するときは符号に注意する

Navier--Stokes 方程式では、正の Stokes 作用素を $\mathcal A$ と書く規約を使うと、線形部分は

$$
u_t+\nu\mathcal Au=0
$$

です。

発展方程式の形

$$
u_t=Gu
$$

へ直すと生成作用素は

$$
G=-\nu\mathcal A.
$$

NS1 で扱う正値性

$$
\langle\mathcal Au,u\rangle\ge0
$$

は、生成作用素 $G$ について

$$
\operatorname{Re}\langle Gu,u\rangle
=
-\nu\langle\mathcal Au,u\rangle
\le0
$$

となります。

従って「Stokes 作用素が散逸的」とだけ言うと、符号規約によって意味が逆転し得ます。

本系列では

$$
\boxed{
\text{正作用素 }\mathcal A
\quad\Longleftrightarrow\quad
\text{生成作用素 }-\nu\mathcal A\text{ が散逸的}
}
$$

と区別します。

具体的な Leray 射影、発散零空間、Stokes 作用素の構成は [NS1](../NS1/index.md) の責務であり、本章では逆輸入しません。

---

## 13. Hille--Yosida と Lumer--Phillips の使い分け

二つの定理は同じ生成問題を違う入口から見ています。

Hille--Yosida は

$$
\boxed{
\text{resolvent が分かる}
\to
\text{半群生成}
}
$$

という定理です。

Lumer--Phillips は

$$
\boxed{
\text{エネルギー散逸}
+
\text{range condition}
\to
\text{半群生成}
}
$$

という定理です。

PDE ではしばしば

$$
\operatorname{Re}\langle Au,u\rangle\le0
$$

は積分 by parts ですぐ分かる一方、

$$
R(\lambda,A)
$$

を明示的に書くのは難しいことがあります。

その場合、range condition を楕円型方程式

$$
(\lambda I-A)u=f
$$

の可解性として示せれば、Lumer--Phillips が直接使えます。

したがって

$$
\text{エネルギー評価}
+
\text{楕円型可解性}
$$

が

$$
\text{時間発展の存在}
$$

へ変換されるわけです。

---

## 14. 演習

### Level A

<a id="ex-evol3-a01"></a>
#### EVOL3-A01 Hilbert 空間の散逸性判定
- Level: A

Hilbert 空間 $H$ 上の作用素 $A$ が

$$
\operatorname{Re}\langle Ax,x\rangle\le0
$$

を全ての $x\in D(A)$ で満たすとする。

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|
$$

を示せ。

<!-- solution-start -->
**詳細解答**

任意の $\lambda>0$ と $x\in D(A)$ に対して

$$
\begin{aligned}
\|(\lambda I-A)x\|^2
&=
\|\lambda x-Ax\|^2
\\
&=
\lambda^2\|x\|^2
-
2\lambda\operatorname{Re}\langle Ax,x\rangle
+
\|Ax\|^2.
\end{aligned}
$$

仮定から

$$
-2\lambda\operatorname{Re}\langle Ax,x\rangle
\ge0,
$$

また

$$
\|Ax\|^2\ge0.
$$

従って

$$
\|(\lambda I-A)x\|^2
\ge
\lambda^2\|x\|^2.
$$

両辺は非負なので平方根を取り

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|.
$$

よって $A$ は散逸的です。
<!-- solution-end -->

<a id="ex-evol3-a02"></a>
#### EVOL3-A02 対角作用素の散逸性
- Level: A

$\ell^2$ 上で

$$
A(x_n)=(-a_nx_n),
$$

$$
D(A)
=
\{x:(a_nx_n)\in\ell^2\},
$$

とする。ただし $a_n\ge0$ とする。

$A$ が散逸作用素であることを示せ。

<!-- solution-start -->
**詳細解答**

任意の $x\in D(A)$ について

$$
\langle Ax,x\rangle
=
-\sum_{n=1}^{\infty}
a_n|x_n|^2.
$$

$a_n\ge0$ なので

$$
\operatorname{Re}\langle Ax,x\rangle
=
-\sum_{n=1}^{\infty}
a_n|x_n|^2
\le0.
$$

[Hilbert 空間での散逸性判定](#prop-evol3-hilbert-dissipativity)より $A$ は散逸作用素です。

ノルム不等式を直接確認するなら

$$
((\lambda I-A)x)_n
=
(\lambda+a_n)x_n
$$

なので

$$
\|(\lambda I-A)x\|_2^2
=
\sum(\lambda+a_n)^2|x_n|^2
\ge
\lambda^2\|x\|_2^2
$$

となります。
<!-- solution-end -->

<a id="ex-evol3-a03"></a>
#### EVOL3-A03 散逸的だが $m$-散逸的でない作用素
- Level: A

$\ell^2$ 上で

$$
D(A)=c_{00},
\qquad
Ax=0
$$

とする。

1. $A$ が散逸的であることを示せ。
2. 任意の $\lambda>0$ について
   $$
   \operatorname{Ran}(\lambda I-A)\ne\ell^2
   $$
   を示せ。
3. $A$ が縮小 $C_0$ 半群の生成作用素になれない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

1. $x\in c_{00}$ に対して

$$
(\lambda I-A)x
=
\lambda x.
$$

従って

$$
\|(\lambda I-A)x\|
=
\lambda\|x\|.
$$

よって散逸性の不等式を等号で満たします。

2. $A=0$ なので

$$
\operatorname{Ran}(\lambda I-A)
=
\lambda c_{00}
=
c_{00}.
$$

$c_{00}$ は $\ell^2$ に稠密ですが、全体ではありません。例えば

$$
(1/n)_{n\ge1}\in\ell^2
$$

は有限支えではないので $c_{00}$ に入りません。

従って

$$
\operatorname{Ran}(\lambda I-A)
\ne
\ell^2.
$$

3. Lumer--Phillips の必要条件によれば、縮小半群の生成作用素なら range condition を満たさなければなりません。

この $A$ は range condition を満たさないので生成作用素ではありません。

別の見方では、$C_0$ 半群の生成作用素は EVOL2 により閉作用素ですが、この $A$ は閉作用素ではありません。
<!-- solution-end -->

<a id="ex-evol3-a04"></a>
#### EVOL3-A04 散逸性から resolvent 評価を出す
- Level: A

$A$ を散逸作用素とし、ある $\lambda>0$ について

$$
\operatorname{Ran}(\lambda I-A)=X
$$

とする。

$$
R(\lambda,A)
$$

が存在し

$$
\|R(\lambda,A)\|
\le
\frac1\lambda
$$

を満たすことを示せ。

<!-- solution-start -->
**詳細解答**

散逸性から

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|
$$

です。

もし

$$
(\lambda I-A)x=0
$$

なら

$$
0\ge\lambda\|x\|
$$

なので $x=0$ です。従って $\lambda I-A$ は単射です。

問題の仮定から全射でもあるので逆作用素

$$
R(\lambda,A)
=
(\lambda I-A)^{-1}
$$

が定義できます。

任意の $y\in X$ に対し

$$
x=R(\lambda,A)y
$$

と置けば

$$
y=(\lambda I-A)x.
$$

従って

$$
\|y\|
\ge
\lambda\|x\|.
$$

よって

$$
\|R(\lambda,A)y\|
=
\|x\|
\le
\frac1\lambda\|y\|.
$$

上限を取って

$$
\|R(\lambda,A)\|
\le
\frac1\lambda.
$$
<!-- solution-end -->

<a id="ex-evol3-a05"></a>
#### EVOL3-A05 散逸性とエネルギー単調性
- Level: A

$H$ を Hilbert 空間、$A$ を散逸作用素とする。

$u:[0,T]\to D(A)$ が

$$
u'(t)=Au(t)
$$

を満たす古典解であるとする。

$$
\|u(t)\|
\le
\|u(0)\|
$$

を示せ。

<!-- solution-start -->
**詳細解答**

[Hilbert 空間での散逸性判定](#prop-evol3-hilbert-dissipativity)から

$
\operatorname{Re}\langle Au(t),u(t)\rangle
\le0.
$$

また

$$
u'(t)=Au(t)
$$

なので

$$
\begin{aligned}
\frac{d}{dt}\|u(t)\|^2
&=
2\operatorname{Re}\langle u'(t),u(t)\rangle
\\
&=
2\operatorname{Re}\langle Au(t),u(t)\rangle
\\
&\le0.
\end{aligned}
$$

従って $t\mapsto\|u(t)\|^2$ は非増大です。

よって

$$
\|u(t)\|^2
\le
\|u(0)\|^2.
$$

平方根を取れば

$$
\|u(t)\|
\le
\|u(0)\|.
$$
<!-- solution-end -->

### Level B

<a id="ex-evol3-b01"></a>
#### EVOL3-B01 range condition の局所伝播
- Level: B

$A$ を散逸作用素とし、ある $\mu>0$ について

$$
\operatorname{Ran}(\mu I-A)=X
$$

とする。

$|\lambda-\mu|<\mu$ なら

$$
\operatorname{Ran}(\lambda I-A)=X
$$

を Neumann 級数で示せ。

<!-- solution-start -->
**詳細解答**

まず散逸性と全射性から

$$
R_\mu=(\mu I-A)^{-1}
$$

が存在し、

$$
\|R_\mu\|
\le
\frac1\mu.
$$

任意の $x\in D(A)$ に対して

$$
y=(\mu I-A)x
$$

と置けば $x=R_\mu y$ です。

したがって

$$
\begin{aligned}
(\lambda I-A)x
&=
(\mu I-A)x
+
(\lambda-\mu)x
\\
&=
y+(\lambda-\mu)R_\mu y
\\
&=
[I+(\lambda-\mu)R_\mu]y.
\end{aligned}
$$

ここで

$$
\|(\lambda-\mu)R_\mu\|
\le
\frac{|\lambda-\mu|}{\mu}
<1.
$$

従って

$$
I+(\lambda-\mu)R_\mu
$$

は Neumann 級数

$$
\sum_{k=0}^{\infty}
[-(\lambda-\mu)R_\mu]^k
$$

を逆作用素に持ち、全射です。

$y$ は $X$ 全体を動くので

$$
\operatorname{Ran}(\lambda I-A)=X.
$$
<!-- solution-end -->

<a id="ex-evol3-b02"></a>
#### EVOL3-B02 $m$-散逸作用素の閉性
- Level: B

$A$ が散逸的で

$$
\operatorname{Ran}(\lambda_0I-A)=X
$$

を満たすとする。

列

$$
x_n\in D(A),
\qquad
x_n\to x,
\qquad
Ax_n\to y
$$

から $x\in D(A)$ と $Ax=y$ を導け。

<!-- solution-start -->
**詳細解答**

A04 と同じ議論から

$$
R_0=(\lambda_0I-A)^{-1}
$$

が存在し

$$
\|R_0\|
\le
\frac1{\lambda_0}.
$$

従って $R_0$ は有界です。

仮定の収束から

$$
(\lambda_0I-A)x_n
=
\lambda_0x_n-Ax_n
\to
\lambda_0x-y.
$$

一方

$$
x_n
=
R_0(\lambda_0I-A)x_n.
$$

$R_0$ の連続性により

$$
x_n
\to
R_0(\lambda_0x-y).
$$

左辺は $x$ に収束しているので [距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)から

$$
x
=
R_0(\lambda_0x-y).
$$

$R_0$ の値は $D(A)$ に入るため

$$
x\in D(A).
$$

さらに

$$
(\lambda_0I-A)x
=
\lambda_0x-y,
$$

従って

$$
Ax=y.
$$

よって $A$ は閉作用素です。
<!-- solution-end -->

<a id="ex-evol3-b03"></a>
#### EVOL3-B03 $m$-散逸性から極大性を示す
- Level: B

$A$ を $m$-散逸作用素とし、$B$ を散逸作用素で

$$
A\subset B
$$

を満たすものとする。

$A=B$ を示せ。

<!-- solution-start -->
**詳細解答**

$m$-散逸性から、ある $\lambda_0>0$ について

$$
\operatorname{Ran}(\lambda_0I-A)=X.
$$

任意の $x\in D(B)$ を取ります。

$$
y=(\lambda_0I-B)x
$$

と置きます。

range condition により、ある $z\in D(A)$ が存在して

$$
(\lambda_0I-A)z=y.
$$

$A\subset B$ なので $z\in D(B)$ かつ $Bz=Az$ です。従って

$$
(\lambda_0I-B)z
=
(\lambda_0I-A)z
=
y.
$$

よって

$$
(\lambda_0I-B)(x-z)=0.
$$

$B$ は散逸的なので

$$
\|(\lambda_0I-B)(x-z)\|
\ge
\lambda_0\|x-z\|.
$$

左辺は0だから

$$
x-z=0.
$$

従って

$$
x=z\in D(A).
$$

任意の $x\in D(B)$ が $D(A)$ に入るので

$$
D(B)\subset D(A).
$$

最初から $A\subset B$ なので逆包含もあり、

$$
A=B.
$$
<!-- solution-end -->

<a id="ex-evol3-b04"></a>
#### EVOL3-B04 対角作用素へ Lumer--Phillips を適用する
- Level: B

$\ell^2$ 上で

$$
A(x_n)=(-nx_n),
$$

$$
D(A)=\{x:(nx_n)\in\ell^2\}
$$

とする。

Lumer--Phillips を用いて $A$ が縮小 $C_0$ 半群を生成することを示し、その半群を求めよ。

<!-- solution-start -->
**詳細解答**

まず $c_{00}\subset D(A)$ で、$c_{00}$ は $\ell^2$ に稠密なので $D(A)$ は稠密です。

次に

$$
\langle Ax,x\rangle
=
-\sum_{n=1}^{\infty}
n|x_n|^2
\le0.
$$

[Hilbert 空間での散逸性判定](#prop-evol3-hilbert-dissipativity)により $A$ は散逸的です。

$\lambda>0$ と $y\in\ell^2$ を任意に取り、

$$
x_n=\frac{y_n}{\lambda+n}
$$

と置きます。

すると

$$
\sum n^2|x_n|^2
=
\sum
\left(
\frac{n}{\lambda+n}
\right)^2
|y_n|^2
\le
\|y\|_2^2,
$$

従って $x\in D(A)$ です。

また

$$
(\lambda+n)x_n=y_n
$$

なので

$$
(\lambda I-A)x=y.
$$

よって range condition が成立します。

Lumer--Phillips により $A$ は縮小 $C_0$ 半群を生成します。

各標準基底 $e_n$ について

$$
Ae_n=-ne_n.
$$

従って係数は

$$
c_n'(t)=-nc_n(t)
$$

を満たし、

$$
c_n(t)=e^{-nt}c_n(0).
$$

したがって半群は

$$
T(t)x
=
(e^{-nt}x_n)_{n\ge1}
$$

です。
<!-- solution-end -->

### Level C

<a id="ex-evol3-c01"></a>
#### EVOL3-C01 Dirichlet Laplacian をエネルギー側から生成する
- Level: C

$H=L^2(0,\pi)$ とし、

$$
e_n(x)=\sqrt{\frac2\pi}\sin(nx)
$$

を正規直交基底とする。

$$
D(A)
=
\left\{
u=\sum_{n\ge1}a_ne_n:
\sum_{n\ge1}n^4|a_n|^2<\infty
\right\},
$$

$$
Au
=
-\sum_{n\ge1}n^2a_ne_n
$$

と定める。

1. $D(A)$ が $H$ に稠密であることを示せ。
2. $A$ が散逸的であることを示せ。
3. 任意の $\lambda>0$ で
   $$
   \operatorname{Ran}(\lambda I-A)=H
   $$
   を示せ。
4. Lumer--Phillips により $A$ が縮小 $C_0$ 半群を生成することを示せ。
5. その半群が
   $$
   T(t)u
   =
   \sum_{n\ge1}
   e^{-n^2t}a_ne_n
   $$
   であることを示せ。
6. $u_0\in D(A)$ に対し
   $$
   \frac{d}{dt}\|T(t)u_0\|_2^2
   =
   -2\sum_{n\ge1}
   n^2e^{-2n^2t}|a_n|^2
   \le0
   $$
   を示せ。

<!-- solution-start -->
**詳細解答**

1. 有限個の $e_n$ の線形結合は $D(A)$ に入ります。

$(e_n)$ は $L^2(0,\pi)$ の正規直交基底なので、その有限線形結合全体は $L^2(0,\pi)$ に稠密です。

従って

$$
\overline{D(A)}
=
L^2(0,\pi).
$$

2. $u=\sum a_ne_n\in D(A)$ に対して

$$
\begin{aligned}
\langle Au,u\rangle
&=
\left\langle
-\sum n^2a_ne_n,
\sum a_ne_n
\right\rangle
\\
&=
-\sum n^2|a_n|^2
\\
&\le0.
\end{aligned}
$$

従って

$$
\operatorname{Re}\langle Au,u\rangle\le0.
$$

Hilbert 空間での判定から $A$ は散逸的です。

3. $\lambda>0$ と

$$
f=\sum f_ne_n\in L^2(0,\pi)
$$

を取ります。

候補を

$$
u
=
\sum
\frac{f_n}{\lambda+n^2}e_n
$$

と置きます。

まず

$$
\begin{aligned}
\sum n^4
\left|
\frac{f_n}{\lambda+n^2}
\right|^2
&=
\sum
\left(
\frac{n^2}{\lambda+n^2}
\right)^2|f_n|^2
\\
&\le
\sum|f_n|^2
<\infty.
\end{aligned}
$$

従って $u\in D(A)$ です。

さらに

$$
\begin{aligned}
(\lambda I-A)u
&=
\sum
(\lambda+n^2)
\frac{f_n}{\lambda+n^2}e_n
\\
&=
\sum f_ne_n
\\
&=
f.
\end{aligned}
$$

$f$ は任意なので

$$
\operatorname{Ran}(\lambda I-A)
=
L^2(0,\pi).
$$

4. 1で稠密性、2で散逸性、3で range condition を示しました。

従って Lumer--Phillips により $A$ は縮小 $C_0$ 半群を生成します。

5. 各基底ベクトルについて

$$
Ae_n=-n^2e_n.
$$

従って軌道 $T(t)e_n$ は一変数方程式

$$
c_n'(t)=-n^2c_n(t),
\qquad
c_n(0)=1
$$

を満たします。

その解は

$$
c_n(t)=e^{-n^2t}.
$$

よって

$$
T(t)e_n=e^{-n^2t}e_n.
$$

線形性と連続性により

$$
u=\sum a_ne_n
$$

に対して

$$
T(t)u
=
\sum e^{-n^2t}a_ne_n.
$$

6. $u_0\in D(A)$ なら

$$
T(t)u_0
=
\sum e^{-n^2t}a_ne_n.
$$

[Parseval の等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-parseval-identity)から

$
\|T(t)u_0\|_2^2
=
\sum e^{-2n^2t}|a_n|^2.
$$

$u_0\in D(A)$ より

$$
\sum n^4|a_n|^2<\infty.
$$

特に

$$
\sum n^2|a_n|^2<\infty
$$

なので項別微分を正当化できます。

従って

$$
\begin{aligned}
\frac{d}{dt}\|T(t)u_0\|_2^2
&=
\sum
(-2n^2)
e^{-2n^2t}|a_n|^2
\\
&=
-2
\sum
n^2e^{-2n^2t}|a_n|^2
\\
&\le0.
\end{aligned}
$$

これは抽象的な散逸性が、熱方程式のエネルギー減衰として具体化した式です。
<!-- solution-end -->

---

## 15. 本章で持ち帰る構造

散逸性は

$$
\|(\lambda I-A)x\|
\ge
\lambda\|x\|
$$

という resolvent 型不等式です。

Hilbert 空間ではこれは

$$
\operatorname{Re}\langle Ax,x\rangle
\le0
$$

と同値で、古典解に対して

$$
\frac{d}{dt}\|u(t)\|^2\le0
$$

を与えます。

ただし散逸性だけでは、$c_{00}$ 上の零作用素のように定義域が小さすぎる場合を排除できません。

そこで

$$
\operatorname{Ran}(\lambda_0I-A)=X
$$

という range condition を加えます。

この二条件から

1. $\lambda_0I-A$ の逆作用素が有界になる。
2. $A$ が閉作用素になる。
3. range condition が全ての $\lambda>0$ へ広がる。
4. 
   $$
   \|R(\lambda,A)\|\le\frac1\lambda
   $$
   が得られる。
5. Hille--Yosida を適用できる。

という流れが得られます。

従って Lumer--Phillips の核心は

$$
\boxed{
\text{エネルギー散逸}
+
\text{range condition}
\Longrightarrow
\text{縮小時間発展}
}
$$

です。

次章 EVOL4 では、こうして得られた半群を用いて

$$
u'(t)=Au(t)+f(t)
$$

を積分形へ変換し、古典解を持たない初期値まで含める mild solution と Duhamel 公式を体系化します。
