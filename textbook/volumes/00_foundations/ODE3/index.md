# ODE3 標準常微分方程式 III：線形連立系・行列指数・安定性

ODE2 では高階の線形方程式を扱いました。今度は未知量そのものをベクトルにし、複数の量が互いに影響しながら時間発展する系を扱います。

この章の中心は

$$
x'(t)=Ax(t)
$$

です。スカラー方程式 $y'=ay$ の解が $e^{at}$ だったのと同じ役割を、行列では $e^{tA}$ が担います。ただし、行列では対角化できない場合があり、純虚数の固有値でも Jordan block があると多項式成長が重なります。そのため「固有値の実部だけを見る」という標語には境界条件があります。

この章では次を一本につなげます。

```text
線形連立系
  ↓
行列指数を冪級数から構成
  ↓
x'=Ax の唯一解と基本行列
  ↓
対角化 / Jordan block / 複素固有値
  ↓
非斉次系の定数変化公式
  ↓
2次元位相図
  ↓
固有値実部 + Jordan構造による安定性判定
```

前提は [ODE2 高階線形微分方程式](../ODE2/index.md) と [LA4 Jordan構造](../LA4/index.md) です。特に Jordan 標準形そのものは再証明せず、[Jordan標準形定理](../LA4/index.md#thm-la4-jordan-form) を正本として使います。一方、行列指数の収束・微分、線形系の解公式、定数変化公式、安定性判定は本章で閉じます。

---

## 1. 線形連立系は「ベクトルを動かす ODE」

<a id="def-ode3-linear-system"></a>
<!-- formal-statement-start -->
> **定義（定係数線形連立系・斉次系・非斉次系）**  
> $A\in\mathbb R^{d\times d}$ を定数行列、$f:I\to\mathbb R^d$ を既知の連続関数、$x:I\to\mathbb R^d$ を未知の微分可能関数とする。

$$
x'(t)=Ax(t)+f(t)
$$

> を定係数線形連立系という。$f\equiv0$ の場合を斉次系、一般の $f$ を持つ場合を非斉次系という。時刻 $t_0\in I$ と $x_0\in\mathbb R^d$ を指定した

$$
x'(t)=Ax(t)+f(t),\qquad x(t_0)=x_0
$$

> を初期値問題という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode3-linear-system -->
**定義の確認**

$$
\begin{cases}
x_1'=2x_1-x_2+e^t,\\
x_2'=x_1+2x_2
\end{cases}
$$

では

$$
x=\begin{pmatrix}x_1\\x_2\end{pmatrix},\qquad
A=\begin{pmatrix}2&-1\\1&2\end{pmatrix},\qquad
f(t)=\begin{pmatrix}e^t\\0\end{pmatrix}
$$

と置けば $x'=Ax+f(t)$ です。$A$ は時刻に依存せず、$f$ は連続なので定義の条件を満たします。$f\not\equiv0$ なので非斉次系です。
<!-- definition-example-end -->

ODE2 で $n$ 階方程式を

$$
(y,y',\ldots,y^{(n-1)})
$$

へ束ねたのは、この形の特殊例でした。ここでは「高階方程式を一階化するための補助ベクトル」ではなく、ベクトル値の未知量そのものを主役にします。

---

## 2. 行列指数を級数から作る

スカラーでは

$$
e^z=\sum_{k=0}^{\infty}\frac{z^k}{k!}
$$

でした。行列でも同じ式を採用します。ただし、まず級数が本当に収束し、微分してよいことを確認する必要があります。

<a id="def-ode3-matrix-exponential"></a>
<!-- formal-statement-start -->
> **定義（行列指数）**  
> $A\in\mathbb C^{d\times d}$ と $t\in\mathbb R$ に対し

$$
\boxed{
e^{tA}:=\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}
}
$$

> と定める。ここで $A^0=I$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode3-matrix-exponential -->
**定義の確認**

冪零行列なら級数は有限で止まります。

$$
N=\begin{pmatrix}0&1\\0&0\end{pmatrix}
$$

では $N^2=0$ です。従って

$$
e^{tN}
=I+tN
=\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$

「指数関数なのに多項式が出る」ことが、後の Jordan block と境界安定性の核心になります。
<!-- definition-example-end -->

<a id="thm-ode3-matrix-exponential-properties"></a>
<!-- formal-statement-start -->
> **定理（行列指数の基本性質）**  
> $A\in\mathbb C^{d\times d}$ とする。行列指数の級数は任意の有界閉区間上で各成分について絶対かつ一様に収束し、$t\mapsto e^{tA}$ は微分可能である。さらに任意の $s,t\in\mathbb R$ について

$$
\frac{d}{dt}e^{tA}=Ae^{tA}=e^{tA}A,
$$

$$
e^{0A}=I,
\qquad
e^{sA}e^{tA}=e^{(s+t)A},
\qquad
(e^{tA})^{-1}=e^{-tA}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各成分をスカラー級数として評価します。$A^k$ の成分数は有限なので、$k$ 乗で増える部分はある定数の $k$ 乗で抑えられ、$k!$ がそれを上回ります。導関数の級数も同じ方法で一様収束するため、[微分と極限の交換定理](../RA5/index.md#thm-ra5-derivative)を成分ごとに使えます。時間加法則は絶対収束した二つの級数の積を次数ごとにまとめ、二項定理で閉じます。

<!-- proof-start -->
### 証明

まず収束を示します。

$$
M:=\max_{1\le i,j\le d}|a_{ij}|
$$

と置きます。$k\ge1$ では $(A^k)_{ij}$ は $d^{k-1}$ 個の積

$$
a_{ii_1}a_{i_1i_2}\cdots a_{i_{k-1}j}
$$

の和なので

$$
|(A^k)_{ij}|\le d^{k-1}M^k.
$$

$|t|\le T$ なら

$$
\left|\frac{t^k(A^k)_{ij}}{k!}\right|
\le
\frac{M(dMT)^{k-1}T}{k!}
$$

で、右辺の数値級数は指数級数により収束します。従って各成分の級数は $[-T,T]$ 上で絶対かつ一様に収束します。

第 $n$ 近似を

$$
S_n(t)=\sum_{k=0}^{n}\frac{t^kA^k}{k!}
$$

とします。微分すると

$$
S_n'(t)
=\sum_{k=1}^{n}\frac{k t^{k-1}A^k}{k!}
=A\sum_{r=0}^{n-1}\frac{t^rA^r}{r!}.
$$

導関数級数も、$|t|\le T$ で

$$
\left|\frac{t^r(A^{r+1})_{ij}}{r!}\right|
\le
M\frac{(dMT)^r}{r!}
$$

と抑えられ、一様収束します。また $S_n(0)=I$ は収束します。よって [微分と極限の交換定理](../RA5/index.md#thm-ra5-derivative)を各成分へ適用して

$$
\frac{d}{dt}e^{tA}
=Ae^{tA}
$$

を得ます。$A$ は全ての $A^k$ と可換なので同じ級数から

$$
Ae^{tA}=e^{tA}A
$$

です。$t=0$ を定義へ入れれば $e^{0A}=I$ です。

次に時間加法則を示します。各成分で絶対収束しているため級数の積を次数ごとにまとめられます。

$$
\begin{aligned}
e^{sA}e^{tA}
&=\sum_{k=0}^{\infty}\sum_{\ell=0}^{\infty}
\frac{s^kt^\ell}{k!\ell!}A^{k+\ell}\\
&=\sum_{n=0}^{\infty}
\left(\sum_{k=0}^{n}\frac{s^kt^{n-k}}{k!(n-k)!}\right)A^n\\
&=\sum_{n=0}^{\infty}\frac{(s+t)^n}{n!}A^n\\
&=e^{(s+t)A}.
\end{aligned}
$$

ここで三行目は

$$
\sum_{k=0}^{n}\binom nk s^kt^{n-k}=(s+t)^n
$$

を使いました。特に $s=-t$ とすると

$$
e^{-tA}e^{tA}=e^{0A}=I,
$$

逆順でも同じなので $(e^{tA})^{-1}=e^{-tA}$ です。$\square$
<!-- proof-end -->

この定理で、行列指数は単なる記号ではなく「時間を足すと行列を掛ける」時間発展になりました。

---

## 3. $x'=Ax$ の唯一解と基本行列

<a id="def-ode3-fundamental-matrix"></a>
<!-- formal-statement-start -->
> **定義（基本行列・主基本行列）**  
> $A\in\mathbb R^{d\times d}$ とする。微分可能な行列値関数 $\Phi:I\to\mathbb R^{d\times d}$ が

$$
\Phi'(t)=A\Phi(t)
$$

> を満たし、全ての $t\in I$ で $\Phi(t)$ が可逆であるとき、$\Phi$ を斉次系 $x'=Ax$ の基本行列という。さらに指定時刻 $t_0\in I$ で $\Phi(t_0)=I$ を満たす基本行列を、$t_0$ における主基本行列という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode3-fundamental-matrix -->
**定義の確認**

対角系で条件を直接確認します。

$$
A=\begin{pmatrix}-1&0\\0&2\end{pmatrix},
\qquad
\Phi(t)=\begin{pmatrix}e^{-t}&0\\0&e^{2t}\end{pmatrix}
$$

とします。直接微分すると

$$
\Phi'(t)
=\begin{pmatrix}-e^{-t}&0\\0&2e^{2t}\end{pmatrix}
=A\Phi(t).
$$

また

$$
\det\Phi(t)=e^t\ne0
$$

なので全時刻で可逆です。さらに $\Phi(0)=I$ なので、これは時刻0の主基本行列です。
<!-- definition-example-end -->

<a id="thm-ode3-homogeneous-ivp"></a>
<!-- formal-statement-start -->
> **定理（定係数斉次線形系の初期値問題）**  
> $A\in\mathbb R^{d\times d}$、$t_0\in\mathbb R$、$x_0\in\mathbb R^d$ とする。初期値問題

$$
x'(t)=Ax(t),\qquad x(t_0)=x_0
$$

> は全実数上でただ一つの解を持ち、その解は

$$
\boxed{x(t)=e^{(t-t_0)A}x_0}
$$

> である。また

$$
\Phi(t)=e^{(t-t_0)A}
$$

> は $t_0$ における主基本行列である。
<!-- formal-statement-end -->

### 証明の見取り図

存在は行列指数を微分すれば直ちに確認できます。一意性では、任意の解 $x(t)$ に逆向き時間発展 $e^{-(t-t_0)A}$ を掛けます。積の微分で二項がちょうど打ち消し合い、その積が定数になるため、別の解が入り込む余地がありません。

<!-- proof-start -->
### 証明

候補

$$
x(t)=e^{(t-t_0)A}x_0
$$

を微分すると、[行列指数の基本性質](#thm-ode3-matrix-exponential-properties)から

$$
x'(t)=Ae^{(t-t_0)A}x_0=Ax(t).
$$

また $t=t_0$ では

$$
x(t_0)=Ix_0=x_0.
$$

従って解は存在します。

一意性のため、同じ初期値を持つ任意の解 $x$ を取り

$$
y(t):=e^{-(t-t_0)A}x(t)
$$

と置きます。積の微分則と $x'=Ax$ から

$$
\begin{aligned}
y'(t)
&=-Ae^{-(t-t_0)A}x(t)+e^{-(t-t_0)A}x'(t)\\
&=-Ae^{-(t-t_0)A}x(t)+e^{-(t-t_0)A}Ax(t).
\end{aligned}
$$

$A$ と $e^{-(t-t_0)A}$ は可換なので二項は相殺し、$y'(t)=0$ です。従って $y(t)$ は定数で

$$
y(t)=y(t_0)=x_0.
$$

両辺へ $e^{(t-t_0)A}$ を掛ければ

$$
x(t)=e^{(t-t_0)A}x_0.
$$

よって一意です。

最後に $\Phi(t)=e^{(t-t_0)A}$ と置くと

$$
\Phi'=A\Phi,
\qquad
\Phi(t_0)=I.
$$

さらに逆行列は $e^{-(t-t_0)A}$ なので全時刻で可逆です。従って主基本行列です。$\square$
<!-- proof-end -->

基本行列の第 $j$ 列は初期値 $e_j$ から出発した解です。従って一つの行列 $e^{(t-t_0)A}$ が、全ての初期値の時間発展を同時に保持しています。

---

## 4. 対角化できれば、各固有方向が独立に指数発展する

$A=PDP^{-1}$、

$$
D=\operatorname{diag}(\lambda_1,\ldots,\lambda_d)
$$

と対角化できるとします。すると

$$
A^k=PD^kP^{-1}
$$

なので、級数へ代入して

$$
\boxed{
e^{tA}=Pe^{tD}P^{-1}
}
$$

かつ

$$
e^{tD}
=\operatorname{diag}(e^{\lambda_1t},\ldots,e^{\lambda_dt}).
$$

したがって $x_0$ を固有ベクトル $v_j$ の線形結合

$$
x_0=\sum_j c_jv_j
$$

へ分解できれば

$$
x(t)=\sum_j c_j e^{\lambda_jt}v_j.
$$

固有値は「固有方向ごとの時間発展率」になっています。

### 例：saddle の最小例

$$
A=\begin{pmatrix}1&0\\0&-2\end{pmatrix}
$$

なら

$$
x_1(t)=c_1e^t,
\qquad
x_2(t)=c_2e^{-2t}.
$$

$x_2$ 軸上では原点へ近づきますが、少しでも $x_1$ 成分があれば将来は発散します。「一部の解が原点へ行く」ことと「平衡点が安定である」ことは別です。

---

## 5. 対角化できないとき：Jordan block が多項式を生む

LA4 で証明した [Jordan標準形定理](../LA4/index.md#thm-la4-jordan-form) を使います。ここで必要なのは、各 Jordan block の指数を実際に計算することです。

<a id="thm-ode3-jordan-exponential"></a>
<!-- formal-statement-start -->
> **定理（相似変換と Jordan block の行列指数）**  
> $A,P,B\in\mathbb C^{d\times d}$、$P$ を可逆とし $A=PBP^{-1}$ とする。このとき

$$
e^{tA}=Pe^{tB}P^{-1}.
$$

> また $m$ 次 Jordan block を

$$
J_m(\lambda)=\lambda I+N,
\qquad N^m=0
$$

> と書けば

$$
\boxed{
e^{tJ_m(\lambda)}
=e^{\lambda t}
\sum_{r=0}^{m-1}\frac{t^rN^r}{r!}
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

相似変換は冪 $A^k=PB^kP^{-1}$ を保つので級数へそのまま入ります。Jordan block では $\lambda I$ と $N$ が可換であり、指数が積へ分かれます。さらに $N^m=0$ のため冪級数が有限和で止まります。

<!-- proof-start -->
### 証明

$A=PBP^{-1}$ なら帰納的に

$$
A^k=PB^kP^{-1}.
$$

従って

$$
\begin{aligned}
e^{tA}
&=\sum_{k=0}^{\infty}\frac{t^kPB^kP^{-1}}{k!}\\
&=P\left(\sum_{k=0}^{\infty}\frac{t^kB^k}{k!}\right)P^{-1}\\
&=Pe^{tB}P^{-1}.
\end{aligned}
$$

次に $J=\lambda I+N$ とします。$\lambda I$ と $N$ は可換なので二項定理により

$$
(\lambda I+N)^k
=\sum_{r=0}^{k}\binom kr\lambda^{k-r}N^r.
$$

これを指数級数へ入れ、$N^m=0$ を使って $r=0,\ldots,m-1$ だけ残すと

$$
\begin{aligned}
e^{tJ}
&=\sum_{r=0}^{m-1}
N^r\sum_{k=r}^{\infty}
\frac{t^k}{k!}\binom kr\lambda^{k-r}\\
&=\sum_{r=0}^{m-1}
\frac{t^rN^r}{r!}
\sum_{q=0}^{\infty}\frac{(\lambda t)^q}{q!}\\
&=e^{\lambda t}
\sum_{r=0}^{m-1}\frac{t^rN^r}{r!}.
\end{aligned}
$$

有限個の $r$ しかないため、ここでの和の入れ替えに無限個どうしの問題はありません。$\square$
<!-- proof-end -->

### 例：2次 Jordan block

$$
J=\begin{pmatrix}\lambda&1\\0&\lambda\end{pmatrix}
=\lambda I+
\begin{pmatrix}0&1\\0&0\end{pmatrix}
$$

では $N^2=0$ なので

$$
\boxed{
e^{tJ}
=e^{\lambda t}
\begin{pmatrix}1&t\\0&1\end{pmatrix}
}.
$$

従って初期値 $x_0=(0,1)^\top$ なら

$$
x(t)=e^{\lambda t}\begin{pmatrix}t\\1\end{pmatrix}.
$$

$\lambda<0$ なら多項式 $t$ があっても指数減衰が勝ちます。一方 $\lambda=0$ なら $t$ がそのまま成長します。これが「実部0では Jordan 構造まで見なければならない」理由です。

---

## 6. 複素固有値から実数値の振動解を作る

実行列 $A$ が複素固有値

$$
\lambda=\alpha+i\beta
\qquad(\beta\ne0)
$$

を持つとき、共役 $\overline\lambda=\alpha-i\beta$ も固有値です。複素固有ベクトルを使って計算してから実部・虚部へ戻せます。

<a id="thm-ode3-complex-real-solutions"></a>
<!-- formal-statement-start -->
> **定理（複素固有対からの実解構成）**  
> $A\in\mathbb R^{d\times d}$ とする。$v=p+iq\in\mathbb C^d$ が固有値 $\lambda=\alpha+i\beta$ $(\beta\ne0)$ に属する固有ベクトルである、すなわち $Av=\lambda v$ とする。このとき

$$
x_1(t)
=e^{\alpha t}
\bigl(p\cos\beta t-q\sin\beta t\bigr),
$$

$$
x_2(t)
=e^{\alpha t}
\bigl(p\sin\beta t+q\cos\beta t\bigr)
$$

> はともに実数値の解 $x'=Ax$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Av=\lambda v$ なので

$$
z(t):=e^{\lambda t}v
$$

は複素数値の解です。Euler の公式から

$$
\begin{aligned}
z(t)
&=e^{\alpha t}(\cos\beta t+i\sin\beta t)(p+iq)\\
&=e^{\alpha t}
\Bigl[
(p\cos\beta t-q\sin\beta t)
+i(p\sin\beta t+q\cos\beta t)
\Bigr].
\end{aligned}
$$

従って $z=x_1+ix_2$ です。$A$ は実行列なので

$$
z'=Az
\Longrightarrow
x_1'+ix_2'=Ax_1+iAx_2.
$$

実部と虚部を比較して

$$
x_1'=Ax_1,
\qquad
x_2'=Ax_2.
$$

よってどちらも実数値解です。$\square$
<!-- proof-end -->

### 二次元の標準回転ブロック

$$
A=\begin{pmatrix}\alpha&-\beta\\\beta&\alpha\end{pmatrix}
=\alpha I+\beta
\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

では

$$
\boxed{
e^{tA}
=e^{\alpha t}
\begin{pmatrix}
\cos\beta t&-\sin\beta t\\
\sin\beta t&\cos\beta t
\end{pmatrix}
}.
$$

虚部 $\beta$ は回転速度、実部 $\alpha$ は半径の指数的な増減率です。

---

## 7. 非斉次系：定数変化公式

スカラー ODE の積分因子や ODE2 の定数変化法と同じ発想を、行列指数で書きます。

<a id="thm-ode3-variation-of-constants"></a>
<!-- formal-statement-start -->
> **定理（非斉次線形系の定数変化公式）**  
> $A\in\mathbb R^{d\times d}$、$f:I\to\mathbb R^d$ を連続、$t_0\in I$、$x_0\in\mathbb R^d$ とする。初期値問題

$$
x'(t)=Ax(t)+f(t),
\qquad
x(t_0)=x_0
$$

> の唯一解は

$$
\boxed{
x(t)=e^{(t-t_0)A}x_0
+\int_{t_0}^{t}e^{(t-s)A}f(s)\,ds
}
$$

> である。積分は成分ごとに取る。
<!-- formal-statement-end -->

### 証明の見取り図

$x=e^{(t-t_0)A}c(t)$ として「定数ベクトルを時間依存へ変える」と、斉次部分 $Ax$ が打ち消されます。残る $c'$ を積分すれば公式が出ます。公式が得られた後は、微分して方程式と初期条件を直接検証します。

<!-- proof-start -->
### 証明

まず任意の解 $x$ に対し

$$
y(t):=e^{-(t-t_0)A}x(t)
$$

と置きます。行列指数の微分公式と $x'=Ax+f$ から

$$
\begin{aligned}
y'
&=-Ae^{-(t-t_0)A}x
+e^{-(t-t_0)A}(Ax+f)\\
&=e^{-(t-t_0)A}f(t).
\end{aligned}
$$

$A$ とその行列指数が可換なので斉次部分が相殺しました。成分ごとに微積分学の基本定理を使えば

$$
y(t)
=x_0+
\int_{t_0}^{t}e^{-(s-t_0)A}f(s)\,ds.
$$

両辺へ $e^{(t-t_0)A}$ を掛け、時間加法則

$$
e^{(t-t_0)A}e^{-(s-t_0)A}=e^{(t-s)A}
$$

を使うと主張の公式を得ます。

逆に右辺を $X(t)$ と置きます。積分項について、被積分関数は連続であり、$t$ による微分は

$$
Ae^{(t-s)A}f(s)
$$

です。差の正当化は成分ごとに連続関数の微積分学の基本定理と積の微分を使えばよく、

$$
\frac{d}{dt}
\int_{t_0}^{t}e^{(t-s)A}f(s)\,ds
=f(t)+A\int_{t_0}^{t}e^{(t-s)A}f(s)\,ds.
$$

従って

$$
X'=AX+f.
$$

$t=t_0$ では積分が0、指数が $I$ なので $X(t_0)=x_0$ です。一意性は、二つの解の差が斉次系を満たし、[定係数斉次線形系の初期値問題](#thm-ode3-homogeneous-ivp)の一意性から0になることに従います。$\square$
<!-- proof-end -->

### 例：一定の外力

$A$ が可逆で $f(t)\equiv b$ のとき

$$
x(t)=e^{tA}x_0+
\int_0^te^{(t-s)A}b\,ds.
$$

$r=t-s$ と置けば

$$
\int_0^te^{rA}b\,dr.
$$

$\frac{d}{dr}(A^{-1}e^{rA})=e^{rA}$ だから

$$
\boxed{
x(t)=e^{tA}x_0+A^{-1}(e^{tA}-I)b
}.
$$

定常点 $x_*=-A^{-1}b$ を使えば

$$
x(t)-x_*=e^{tA}(x_0-x_*),
$$

となり、非斉次系の平衡点近傍の挙動も斉次系へ帰着します。

---

## 8. 二次元位相図を固有値から読む

二次元では、解公式を平面上の軌道として読むと固有値の意味が視覚的になります。

| 固有値 | 典型的な位相図 | 将来の挙動 |
|---|---|---|
| $\lambda_1,\lambda_2<0$（実） | node sink | 原点へ収束 |
| $\lambda_1,\lambda_2>0$（実） | node source | 原点から発散 |
| $\lambda_1\lambda_2<0$ | saddle | 一方の固有方向だけ収束、他方は発散 |
| $\alpha\pm i\beta$, $\alpha<0$ | spiral sink | 回転しながら収束 |
| $\alpha\pm i\beta$, $\alpha>0$ | spiral source | 回転しながら発散 |
| $\pm i\beta$ | center | 半径を保つ回転 |

この表は「固有値が異なる典型例」をまず読むためのものです。重複実固有値では対角化可能か Jordan block かで軌道の形が変わります。

### 例：saddle の軌道方程式

$$
x_1'=x_1,
\qquad
x_2'=-2x_2
$$

なら

$$
x_1=c_1e^t,
\qquad
x_2=c_2e^{-2t}.
$$

$c_1c_2\ne0$ のとき $e^t=x_1/c_1$ なので

$$
x_2
=c_2\left(\frac{x_1}{c_1}\right)^{-2}
=\frac{c_2c_1^2}{x_1^2}.
$$

時間を消去すると双曲線型の軌道が現れます。$x_2$ 軸は将来に原点へ入る特別な方向、$x_1$ 軸は将来に原点から出る方向です。

### 例：center は「収束しない安定」の候補

$$
A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

なら $e^{tA}$ は回転行列です。従って

$$
\|x(t)\|_2=\|x_0\|_2
$$

で、原点の近くから出れば近くに留まりますが、$x_0\ne0$ なら原点へは収束しません。この区別を次節で定義します。

---

## 9. 安定性は「近くに留まる」と「近づく」を分ける

<a id="def-ode3-stability"></a>
<!-- formal-statement-start -->
> **定義（Lyapunov安定・漸近安定・指数安定）**  
> 定係数斉次線形系 $x'=Ax$ の平衡点 $x=0$ を考え、初期時刻を0とする。$\|x\|_2=(\sum_i |x_i|^2)^{1/2}$ を Euclid 長さと書く。
>
> 1. $0$ が **Lyapunov安定** であるとは、任意の $\varepsilon>0$ に対しある $\delta>0$ が存在し、$\|x_0\|_2<\delta$ なら対応する解が全ての $t\ge0$ で $\|x(t)\|_2<\varepsilon$ を満たすことをいう。
> 2. $0$ が **漸近安定** であるとは、Lyapunov安定であり、さらにある $r>0$ が存在して $\|x_0\|_2<r$ なら $x(t)\to0$ $(t\to\infty)$ となることをいう。
> 3. $0$ が **指数安定** であるとは、ある定数 $C\ge1$ と $\gamma>0$ が存在し、全ての $x_0\in\mathbb R^d$ と $t\ge0$ について

$$
\|e^{tA}x_0\|_2
\le Ce^{-\gamma t}\|x_0\|_2
$$

> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ode3-stability -->
**定義の確認**

$x'=-2x$ で三つの安定性を直接確認します。

解は $x(t)=e^{-2t}x_0$ です。任意の $\varepsilon>0$ に対し $\delta=\varepsilon$ とすれば

$$
|x_0|<\delta
\Longrightarrow
|x(t)|=e^{-2t}|x_0|\le|x_0|<\varepsilon
$$

なので Lyapunov安定です。また $x(t)\to0$ なので漸近安定です。さらに

$$
|x(t)|\le e^{-2t}|x_0|
$$

だから $C=1$, $\gamma=2$ と取れ、指数安定でもあります。
<!-- definition-example-end -->

center の例では Lyapunov安定ですが漸近安定ではありません。次に、一般の定係数線形系でこの違いを完全に判定します。

---

## 10. 固有値実部と Jordan 構造による安定性判定

<a id="thm-ode3-spectral-stability"></a>
<!-- formal-statement-start -->
> **定理（定係数線形系の固有値実部と Jordan 構造による安定性判定）**  
> $A\in\mathbb R^{d\times d}$ とし、複素数体上での全固有値を重複度込みで考える。斉次系 $x'=Ax$ の平衡点 $0$ について次が成り立つ。
>
> 1. 全ての固有値 $\lambda$ が $\operatorname{Re}\lambda<0$ を満たすことと、$0$ が指数安定であることは同値である。このとき $0$ は漸近安定でもある。
> 2. ある固有値が $\operatorname{Re}\lambda>0$ を満たすなら、$0$ は Lyapunov不安定である。
> 3. 全ての固有値が $\operatorname{Re}\lambda\le0$ のとき、$0$ が Lyapunov安定であるための必要十分条件は、$\operatorname{Re}\lambda=0$ の各固有値に属する Jordan block が全て1次であることである。
> 4. 従って $0$ が漸近安定であることと、全ての固有値が $\operatorname{Re}\lambda<0$ を満たすことは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

[Jordan標準形定理](../LA4/index.md#thm-la4-jordan-form)で各 block へ分解します。固有値 $\lambda$ の $m$ 次 block は

$$
e^{\lambda t}
\left(I+tN+\cdots+\frac{t^{m-1}N^{m-1}}{(m-1)!}\right)
$$

を生みます。

- $\operatorname{Re}\lambda<0$：指数減衰が有限次数の多項式成長に勝つ。
- $\operatorname{Re}\lambda>0$：固有方向で指数増大する。
- $\operatorname{Re}\lambda=0$：1次 block なら大きさは有界だが、2次以上なら $t,t^2,\ldots$ が残って増大する。

したがって境界では固有値だけでなく Jordan block の大きさが本質です。

<!-- proof-start -->
### 証明

複素数体上で [Jordan標準形定理](../LA4/index.md#thm-la4-jordan-form) を使い

$$
A=PJP^{-1}
$$

とします。$J$ は Jordan block の直和です。

まず、固定行列 $P=(p_{ij})$ による乗算はユークリッド長さを高々定数倍します。実際、[Cauchy--Schwarz の不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から各行について

$$
\left|\sum_jp_{ij}z_j\right|^2
\le
\left(\sum_j|p_{ij}|^2\right)
\left(\sum_j|z_j|^2\right).
$$

$i$ について足せば

$$
\|Pz\|_2
\le C_P\|z\|_2,
\qquad
C_P:=\left(\sum_{i,j}|p_{ij}|^2\right)^{1/2}.
$$

$P^{-1}$ にも同様の定数があります。従って $e^{tA}=Pe^{tJ}P^{-1}$ の有界性・指数減衰・非有界性は、定数倍を除いて各 Jordan block の挙動で決まります。

固有値 $\lambda$、大きさ $m$ の block では [Jordan block の行列指数](#thm-ode3-jordan-exponential)から

$$
e^{tJ_m(\lambda)}
=e^{\lambda t}
\sum_{r=0}^{m-1}\frac{t^rN^r}{r!}.
$$

#### 1. 全ての実部が負なら指数安定

固有値は有限個なので

$$
\eta:=-\max_\lambda\operatorname{Re}\lambda>0.
$$

各 block の項は定数倍を除いて

$$
t^r e^{-\eta t}
\qquad(0\le r\le m-1)
$$

で抑えられます。$t^r e^{-\eta t/2}$ は $[0,\infty)$ 上連続で $t\to\infty$ で0へ行くため有界です。よってある $K_r$ が存在して

$$
t^re^{-\eta t}
\le K_r e^{-\eta t/2}.
$$

block 数も項数も有限なので定数をまとめれば

$$
\|e^{tA}x_0\|_2
\le Ce^{-\eta t/2}\|x_0\|_2.
$$

従って指数安定です。

逆に指数安定だとします。もし固有値 $\lambda$ が $\operatorname{Re}\lambda\ge0$ を持てば、対応する複素固有ベクトル $v\ne0$ に対し

$$
e^{tA}v=e^{\lambda t}v
$$

なのでその大きさは $e^{\operatorname{Re}\lambda t}\|v\|_2$ です。これは $Ce^{-\gamma t}\|v\|_2$ で全 $t\ge0$ に抑えられません。実行列について複素ベクトルを使った評価は、実部・虚部を二つの実ベクトルに分ければ同じ指数減衰評価が両者に適用され、その複素和にも適用されるため矛盾します。従って全固有値の実部は負です。

#### 2. 正の実部があれば不安定

実固有値 $\lambda>0$ なら実固有ベクトル $v$ に沿う解 $e^{\lambda t}v$ が増大します。任意の $\delta>0$ に対し十分小さい $cv$ を初期値にしても、将来は固定した $\varepsilon$ 球を出るので Lyapunov安定ではありません。

非実固有値 $\lambda=\alpha+i\beta$ で $\alpha>0$ なら、[複素固有対からの実解構成](#thm-ode3-complex-real-solutions)により、$p,q$ が張る実不変部分空間上で解は $e^{\alpha t}$ 倍の回転になります。この二次元部分空間上で基底変換は定数倍の歪みしか与えないため、非零解の大きさは指数的に増大し、同様に不安定です。

#### 3. 実部0の境界

全固有値が $\operatorname{Re}\lambda\le0$ とします。実部0の全 block が1次なら、それらの指数は $e^{i\beta t}$ で絶対値1です。実部が負の block は上で示したように有界かつ減衰します。従ってある $M>0$ が存在して

$$
\|e^{tA}x_0\|_2\le M\|x_0\|_2
\qquad(t\ge0).
$$

任意の $\varepsilon>0$ に対し $\delta=\varepsilon/M$ と取れば Lyapunov安定です。

逆に、実部0の固有値 $\lambda=i\beta$ に大きさ2以上の Jordan block があるとします。長さ2の Jordan 鎖の末尾ベクトルを初期値に取れば、複素化した解には

$$
e^{i\beta t}(v_2+t v_1)
$$

という一次成長項が現れます。この複素解の実部と虚部は実数値解です。もし両方とも有界なら複素解も有界になるはずなので、少なくとも一方は非有界です。その実初期値を任意に小さく定数倍しても、十分長い時間後には固定した近傍を出ます。従って Lyapunov不安定です。

#### 4. 漸近安定

全実部が負なら指数安定なので $x(t)\to0$ です。逆に漸近安定なら Lyapunov安定ですから、正実部や境界上の非自明 Jordan block は排除されます。もし実部0の1次 block が残れば、その block 上では $|e^{i\beta t}|=1$ で非零解が0へ収束しません。従って実部0の固有値も存在できず、全固有値の実部が負です。$\square$
<!-- proof-end -->

### 反例：$\operatorname{Re}\lambda=0$ だけでは足りない

二つの行列を比べます。

$$
A_1=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
A_2=\begin{pmatrix}0&1\\0&0\end{pmatrix}.
$$

$A_1$ の固有値は $\pm i$ で、どちらも1次 block です。$e^{tA_1}$ は回転行列なので有界で、原点は Lyapunov安定です。

$A_2$ の固有値は0だけですが、2次 Jordan block です。

$$
e^{tA_2}=\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$

初期値 $(0,\varepsilon)^\top$ は

$$
x(t)=(t\varepsilon,\varepsilon)^\top
$$

となっていくらでも遠くへ行きます。失われたのは「境界固有値の Jordan block が1次」という条件であり、証明ではまさに多項式因子を一様有界にする機構が壊れています。

---

## 11. ここまでの解法・判定フロー

```text
x' = Ax + f(t)
  │
  ├─ f = 0
  │    │
  │    ├─ Aが対角化可能
  │    │      └─ 固有方向ごとに e^{λt}
  │    │
  │    ├─ Aが対角化不能
  │    │      └─ Jordan block → e^{λt} × 多項式
  │    │
  │    └─ 実2次元で複素固有値
  │           └─ e^{αt} × 回転
  │
  └─ f ≠ 0
       └─ variation of constants
            e^{(t-t0)A}x0 + ∫e^{(t-s)A}f(s)ds

安定性
  ├─ 全 Re λ < 0 → 指数安定
  ├─ どれか Re λ > 0 → 不安定
  └─ 全 Re λ ≤ 0
       └─ Re λ = 0 の Jordan block
            ├─ 全て1次 → Lyapunov安定
            └─ 2次以上 → 不安定
```

次章 ODE4 では $x'=F(x)$ の非線形系へ進みます。そこで平衡点 $x_*$ の近くで

$$
F(x_*+h)\approx DF(x_*)h
$$

と線形化し、本章の固有値・位相図・安定性を局所解析へ使います。本章の判定がそのまま使えるのは線形系であり、非線形系へ移すには ODE4 の線形化定理が別途必要です。

---

## 12. 演習

### Level A

<a id="ex-ode3-a01"></a>
#### ODE3-A01 対角行列の行列指数
- Level: A

$$
A=\begin{pmatrix}-2&0\\0&3\end{pmatrix}
$$

とする。$e^{tA}$ を求め、初期値 $x(0)=(1,2)^\top$ に対する $x'=Ax$ の解を求めよ。また原点が安定か判定せよ。

<!-- solution-start -->
**詳細解答**

対角行列の冪は

$$
A^k=\begin{pmatrix}(-2)^k&0\\0&3^k\end{pmatrix}
$$

です。従って行列指数の定義から各対角成分を指数級数として足せば

$$
e^{tA}
=\begin{pmatrix}e^{-2t}&0\\0&e^{3t}\end{pmatrix}.
$$

[定係数斉次線形系の初期値問題](#thm-ode3-homogeneous-ivp)より

$$
x(t)=e^{tA}x(0)
=\begin{pmatrix}e^{-2t}&0\\0&e^{3t}\end{pmatrix}
\begin{pmatrix}1\\2\end{pmatrix}
=\boxed{\begin{pmatrix}e^{-2t}\\2e^{3t}\end{pmatrix}}.
$$

固有値は $-2,3$ です。正の実部を持つ固有値 $3$ があるので、[固有値実部と Jordan 構造による安定性判定](#thm-ode3-spectral-stability)により原点は Lyapunov不安定です。実際、第二固有方向では小さい初期値も $e^{3t}$ 倍に増大します。
<!-- solution-end -->

<a id="ex-ode3-a02"></a>
#### ODE3-A02 回転と減衰
- Level: A

$$
A=\begin{pmatrix}-1&-2\\2&-1\end{pmatrix}
$$

とする。$e^{tA}$ を求め、$x(0)=(1,0)^\top$ の解と原点の安定性を求めよ。

<!-- solution-start -->
**詳細解答**

$$
A=-I+2J,
\qquad
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
J^2=-I
$$

と分けます。$I$ と $J$ は可換なので、本文の回転ブロック公式から

$$
e^{tA}
=e^{-t}
\begin{pmatrix}
\cos2t&-\sin2t\\
\sin2t&\cos2t
\end{pmatrix}.
$$

従って

$$
x(t)=e^{tA}\begin{pmatrix}1\\0\end{pmatrix}
=\boxed{e^{-t}\begin{pmatrix}\cos2t\\\sin2t\end{pmatrix}}.
$$

半径は

$$
\|x(t)\|_2=e^{-t}
$$

なので、角速度2で回転しながら原点へ収束する spiral sink です。固有値は $-1\pm2i$ で全て実部が負だから、原点は指数安定です。
<!-- solution-end -->

<a id="ex-ode3-a03"></a>
#### ODE3-A03 2次 Jordan block
- Level: A

$$
A=\begin{pmatrix}-1&1\\0&-1\end{pmatrix}
$$

について $e^{tA}$ を求め、$x(0)=(0,1)^\top$ の解を求めよ。対角化できなくても原点が漸近安定である理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$$
A=-I+N,
\qquad
N=\begin{pmatrix}0&1\\0&0\end{pmatrix},
\qquad
N^2=0
$$

です。[Jordan block の行列指数](#thm-ode3-jordan-exponential)から

$$
e^{tA}
=e^{-t}(I+tN)
=e^{-t}
\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$

従って

$$
x(t)
=e^{-t}
\begin{pmatrix}1&t\\0&1\end{pmatrix}
\begin{pmatrix}0\\1\end{pmatrix}
=\boxed{e^{-t}\begin{pmatrix}t\\1\end{pmatrix}}.
$$

第一成分には $te^{-t}$ が現れますが

$$
te^{-t}\to0
$$

なので $x(t)\to0$ です。唯一の固有値は $-1$ で実部が負です。非自明 Jordan block は多項式因子を作りますが、負の指数減衰が有限次数の多項式成長に勝つため、[固有値実部と Jordan 構造による安定性判定](#thm-ode3-spectral-stability)より原点は指数安定、従って漸近安定です。
<!-- solution-end -->

<a id="ex-ode3-a04"></a>
#### ODE3-A04 非斉次系の定数変化
- Level: A

$$
x'=\begin{pmatrix}-1&0\\0&-2\end{pmatrix}x
+\begin{pmatrix}1\\e^{-2t}\end{pmatrix},
\qquad
x(0)=\begin{pmatrix}0\\0\end{pmatrix}
$$

を解け。

<!-- solution-start -->
**詳細解答**

$$
A=\begin{pmatrix}-1&0\\0&-2\end{pmatrix}
$$

なので

$$
e^{(t-s)A}
=\begin{pmatrix}e^{-(t-s)}&0\\0&e^{-2(t-s)}\end{pmatrix}.
$$

初期値は0だから、[定数変化公式](#thm-ode3-variation-of-constants)より

$$
x(t)
=\int_0^t
\begin{pmatrix}e^{-(t-s)}&0\\0&e^{-2(t-s)}\end{pmatrix}
\begin{pmatrix}1\\e^{-2s}\end{pmatrix}ds.
$$

第一成分は

$$
\begin{aligned}
x_1(t)
&=\int_0^te^{-(t-s)}ds\\
&=e^{-t}\int_0^te^sds\\
&=e^{-t}(e^t-1)\\
&=1-e^{-t}.
\end{aligned}
$$

第二成分は

$$
\begin{aligned}
x_2(t)
&=\int_0^te^{-2(t-s)}e^{-2s}ds\\
&=\int_0^te^{-2t}ds\\
&=te^{-2t}.
\end{aligned}
$$

従って

$$
\boxed{
x(t)=\begin{pmatrix}1-e^{-t}\\te^{-2t}\end{pmatrix}}.
$$

第二成分では強制項 $e^{-2t}$ と斉次モード $e^{-2t}$ が同じ減衰率を持つため、積分によって $t$ が一つ現れています。
<!-- solution-end -->

### Level B

<a id="ex-ode3-b01"></a>
#### ODE3-B01 saddle の位相図
- Level: B

$$
x_1'=2x_1,
\qquad
x_2'=-x_2
$$

を考える。

1. 一般解を求めよ。
2. $x_1x_2^2$ が各軌道上で一定であることを示せ。
3. 将来 $t\to\infty$ に原点へ収束する初期値全体を求め、原点の安定性を判定せよ。

<!-- solution-start -->
**詳細解答**

1. 二つの式は独立で、

$$
x_1(t)=c_1e^{2t},
\qquad
x_2(t)=c_2e^{-t}.
$$

従って

$$
\boxed{x(t)=(c_1e^{2t},c_2e^{-t})^\top}.
$$

2. 解へ代入すると

$$
x_1(t)x_2(t)^2
=c_1e^{2t}\,c_2^2e^{-2t}
=c_1c_2^2,
$$

で時刻に依存しません。従って各非退化軌道は $x_1x_2^2=\text{constant}$ を満たします。

3. $t\to\infty$ で $x_2(t)=c_2e^{-t}\to0$ ですが、$c_1\ne0$ なら $x_1(t)=c_1e^{2t}$ は発散します。従って原点へ収束するには必要十分に $c_1=0$、つまり初期値が $x_2$ 軸上にあることです。

しかし Lyapunov安定性は「ある特別な方向が収束する」だけでは足りません。固有値は $2,-1$ で正の固有値を含むため、任意に小さい $x_1$ 成分が指数増大します。よって原点は不安定です。
<!-- solution-end -->

<a id="ex-ode3-b02"></a>
#### ODE3-B02 実部0の二つの系を比較する
- Level: B

次の二つの系を比較する。

$$
A=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
B=\begin{pmatrix}0&1\\0&0\end{pmatrix}.
$$

1. $e^{tA}$ と $e^{tB}$ を求めよ。
2. どちらも固有値の実部が0以下であることを確認せよ。
3. 原点の Lyapunov安定性が異なる理由を Jordan 構造まで含めて説明せよ。

<!-- solution-start -->
**詳細解答**

1. $A^2=-I$ なので偶数冪と奇数冪に分けると

$$
e^{tA}
=I\cos t+A\sin t
=\begin{pmatrix}\cos t&-\sin t\\\sin t&\cos t\end{pmatrix}.
$$

$B^2=0$ なので

$$
e^{tB}=I+tB
=\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$

2. $A$ の固有値は $\pm i$、$B$ の固有値は0（代数的重複度2）です。従ってどちらも全固有値の実部は0です。

3. $e^{tA}$ は回転行列なので

$$
\|e^{tA}x_0\|_2=\|x_0\|_2
$$

です。従って $A$ の原点は Lyapunov安定ですが、非零解は原点へ収束しないので漸近安定ではありません。

一方 $B$ は固有値0に対する2次 Jordan block です。初期値 $x_0=(0,\varepsilon)^\top$ に対し

$$
e^{tB}x_0=(t\varepsilon,\varepsilon)^\top
$$

となり、第一成分が線形成長します。したがって任意に小さい初期値からでも固定近傍を出るため不安定です。

違いは「実部0」そのものではなく、境界固有値に非自明 Jordan block があるかどうかです。
<!-- solution-end -->

<a id="ex-ode3-b03"></a>
#### ODE3-B03 3次冪零行列と強制項
- Level: B

$$
N=\begin{pmatrix}
0&1&0\\
0&0&1\\
0&0&0
\end{pmatrix},
\qquad
f(t)=\begin{pmatrix}0\\0\\1\end{pmatrix}
$$

とする。

1. $e^{tN}$ を求めよ。
2. $x'=Nx+f(t)$、$x(0)=0$ を定数変化公式で解け。
3. この斉次系の原点が不安定である理由を説明せよ。

<!-- solution-start -->
**詳細解答**

1. $N^3=0$ で

$$
N^2=\begin{pmatrix}0&0&1\\0&0&0\\0&0&0\end{pmatrix}.
$$

従って行列指数は有限和になり

$$
\begin{aligned}
e^{tN}
&=I+tN+\frac{t^2}{2}N^2\\
&=\boxed{
\begin{pmatrix}
1&t&t^2/2\\
0&1&t\\
0&0&1
\end{pmatrix}}.
\end{aligned}
$$

2. 初期値0なので

$$
x(t)=\int_0^te^{(t-s)N}f(s)ds.
$$

$r=t-s$ と書けば

$$
e^{rN}f
=\begin{pmatrix}r^2/2\\r\\1\end{pmatrix}.
$$

従って

$$
\begin{aligned}
x(t)
&=\int_0^t
\begin{pmatrix}(t-s)^2/2\\t-s\\1\end{pmatrix}ds\\
&=\boxed{
\begin{pmatrix}t^3/6\\t^2/2\\t\end{pmatrix}}.
\end{aligned}
$$

3. $N$ の固有値は0だけですが3次 Jordan block です。斉次解にも $t$ と $t^2$ の成長が現れます。例えば初期値 $e_3$ では

$$
e^{tN}e_3=(t^2/2,t,1)^\top
$$

が非有界です。境界固有値の block が1次でないため、[固有値実部と Jordan 構造による安定性判定](#thm-ode3-spectral-stability)より原点は不安定です。
<!-- solution-end -->

### Level C

<a id="ex-ode3-c01"></a>
#### ODE3-C01 パラメータ付き線形系を完全分類する
- Level: C

実数パラメータ $a$ に対し

$$
A_a=
\begin{pmatrix}
a&-1\\
1&a
\end{pmatrix},
\qquad
x'=A_ax,
\qquad
x(0)=\begin{pmatrix}1\\0\end{pmatrix}
$$

を考える。

1. $A_a$ の固有値を求めよ。
2. $e^{tA_a}$ を行列の形で求め、初期値問題を解け。
3. $a<0$, $a=0$, $a>0$ の各場合に位相図の型と原点の Lyapunov安定性・漸近安定性・指数安定性を判定せよ。
4. $a=0$ の場合、原点が Lyapunov安定だが漸近安定でないことを定義から直接示せ。
5. 比較として

$$
J_0=\begin{pmatrix}0&1\\0&0\end{pmatrix}
$$

を考え、固有値の実部は同じ0でも原点が不安定になる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

1. 特性多項式は

$$
\begin{aligned}
\det(\lambda I-A_a)
&=\det\begin{pmatrix}\lambda-a&1\\-1&\lambda-a\end{pmatrix}\\
&=(\lambda-a)^2+1.
\end{aligned}
$$

従って

$$
\boxed{\lambda=a\pm i}.
$$

2. 行列を

$$
A_a=aI+R,
\qquad
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

と分けると $R^2=-I$ です。$aI$ と $R$ は可換なので

$$
\begin{aligned}
e^{tA_a}
&=e^{at}e^{tR}\\
&=\boxed{
e^{at}
\begin{pmatrix}
\cos t&-\sin t\\
\sin t&\cos t
\end{pmatrix}}.
\end{aligned}
$$

従って指定初期値では

$$
\boxed{
x(t)=e^{at}\begin{pmatrix}\cos t\\\sin t\end{pmatrix}}.
$$

3. 解の半径は

$$
\|x(t)\|_2=e^{at}\|x(0)\|_2.
$$

一般の初期値でも回転行列は Euclid ノルムを保つので

$$
\|e^{tA_a}x_0\|_2=e^{at}\|x_0\|_2.
$$

- $a<0$：回転しながら指数減衰する spiral sink。$C=1$, $\gamma=-a$ と取れるので指数安定、従って漸近安定かつ Lyapunov安定です。
- $a=0$：半径一定の center。Lyapunov安定ですが漸近安定ではなく、従って指数安定でもありません。
- $a>0$：回転しながら指数増大する spiral source。原点は Lyapunov不安定です。

4. $a=0$ では

$$
\|x(t)\|_2=\|x_0\|_2
$$

です。任意の $\varepsilon>0$ に対して $\delta=\varepsilon$ と取れば

$$
\|x_0\|_2<\delta
\Longrightarrow
\|x(t)\|_2=\|x_0\|_2<\varepsilon
$$

が全 $t\ge0$ で成り立つので Lyapunov安定です。

一方 $x_0\ne0$ なら

$$
\|x(t)\|_2=\|x_0\|_2>0
$$

が永久に続き、$x(t)\to0$ ではありません。従って漸近安定ではありません。

5. $J_0^2=0$ なので

$$
e^{tJ_0}
=I+tJ_0
=\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$

固有値は0だけで実部は0ですが、2次 Jordan block です。初期値 $(0,\varepsilon)^\top$ に対して

$$
e^{tJ_0}\begin{pmatrix}0\\\varepsilon\end{pmatrix}
=\begin{pmatrix}t\varepsilon\\\varepsilon\end{pmatrix}
$$

となり非有界です。$A_0$ では境界固有値 $\pm i$ が1次 block で回転だけを生むのに対し、$J_0$ では非自明 Jordan block が $t$ という多項式因子を生みます。したがって「全固有値の実部が0以下」だけでは Lyapunov安定を保証できません。
<!-- solution-end -->

---

## 13. 章末チェック

- 定係数線形連立系を $x'=Ax+f(t)$ と書き、斉次・非斉次を区別できる。
- 行列指数の級数が収束し、$\frac{d}{dt}e^{tA}=Ae^{tA}$ となる理由を説明できる。
- 時間加法則 $e^{sA}e^{tA}=e^{(s+t)A}$ と逆行列 $e^{-tA}$ を導ける。
- $x'=Ax$, $x(t_0)=x_0$ の唯一解を $e^{(t-t_0)A}x_0$ と書ける。
- 基本行列の意味を説明し、$e^{(t-t_0)A}$ が主基本行列であることを確認できる。
- 対角化と Jordan block から行列指数を計算できる。
- 複素固有値の実部を成長率、虚部を回転率として実解へ戻せる。
- 非斉次系を定数変化公式で解ける。
- 二次元系の node / saddle / spiral / center を固有値から読める。
- Lyapunov安定・漸近安定・指数安定を区別できる。
- 全固有値の実部が負なら指数安定であることを Jordan 形から説明できる。
- 実部0の固有値では、非自明 Jordan block が多項式成長を生んで安定性を壊すことを説明できる。