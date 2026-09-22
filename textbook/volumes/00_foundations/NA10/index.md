# NA10 数値解析 X：固有値数値計算

NA9 では、反復法の収束を考えるたびに固有値が現れました。

定常反復では反復行列 $G$ の固有値が誤差減衰を支配し、共役勾配法では実対称正定値行列 $A$ の固有値分布が収束速度を支配しました。

では、その固有値自体をどう計算すればよいのでしょうか。

この章では

$$
Ax=\lambda x
$$

を満たす固有値 $\lambda$ と固有ベクトル $x$ を、行列ベクトル積・線形方程式・QR 分解を使って数値的に求めます。

中心となる流れは

~~~text
近似固有対の方程式誤差
  ↓
1本のベクトルを反復して支配方向を抽出
  ↓
シフトした線形方程式で狙う固有値を選択
  ↓
現在の近似値からシフトを自動更新
  ↓
複数方向を正規直交化しながら反復
  ↓
直交相似変換で固有値全体を追跡
~~~

です。

直接の前提は、[F0-00F1 の固有値・Rayleigh 商・実対称行列のスペクトル定理](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#def-rayleigh-quotient)、[F0-00E1 の QR 分解](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#def-f0-00e1-thin-qr)、[NA8 の線形方程式と Householder QR](../NA8/index.md)、[NA9 の反復法と行列ベクトル積](../NA9/index.md)、[NA1 の残差・後方誤差](../NA1/index.md#def-na1-residual)です。

この章の主要な収束定理は実対称行列について述べます。

実対称行列なら

$$
A=V\Lambda V^{\mathsf T}
$$

と直交対角化でき、固有ベクトルを正規直交基底として誤差を成分ごとに追えるからです。

一般の非正規行列では、固有ベクトルの非直交性が新しい条件の悪さを生みます。その問題を、対称行列の定理へ無理に押し込めません。

---

## 0. 固有値問題で「残差」は何を意味するか

連立方程式

$$
Ax=b
$$

では、近似解 $\widetilde x$ に対して

$$
b-A\widetilde x
$$

を残差としました。

固有値問題では右辺にも未知量があるため、近似固有値と近似固有ベクトルを組にして残差を定めます。

<a id="def-na10-eigenpair-residual"></a>
<!-- formal-statement-start -->
### 定義（固有対残差）

$A\in\mathbb R^{n\times n}$、$\mu\in\mathbb R$、非零ベクトル $x\in\mathbb R^n$ に対して

$$
\boxed{
r=Ax-\mu x
}
$$

を近似固有対 $(\mu,x)$ の **固有対残差**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-eigenpair-residual -->
### 例：残差が0なら厳密な固有対である

**定義の確認**。

$$
A=
\begin{pmatrix}
2&0\\
0&3
\end{pmatrix},
\qquad
\mu=3,
\qquad
x=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

とすると

$$
Ax-\mu x
=
\begin{pmatrix}
0\\3
\end{pmatrix}
-
3
\begin{pmatrix}
0\\1
\end{pmatrix}
=
0.
$$

従って $(3,x)$ は厳密な固有対です。

一方、

$$
\widetilde x
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\1
\end{pmatrix},
\qquad
\widetilde\mu=\frac52
$$

なら

$$
A\widetilde x-\widetilde\mu\widetilde x
=
\frac1{2\sqrt2}
\begin{pmatrix}
-1\\1
\end{pmatrix}
\ne0.
$$

この非零ベクトルが、固有値方程式をどれだけ満たしていないかを表します。
<!-- definition-example-end -->

したがって数値計算では

> 近似値そのものだけでなく、元の固有値方程式へ戻したときどれだけ満たしているか

を固有対残差で確認します。

---

## 1. Rayleigh 商はベクトルから固有値候補を作る

[F0-00F1](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#def-rayleigh-quotient) で、実対称行列 $A$ と非零ベクトル $x$ に対する Rayleigh 商

$$
\rho_A(x)
=
\frac{x^{\mathsf T}Ax}{x^{\mathsf T}x}
$$

を定義しました。

$x$ を単位ベクトル

$$
\|x\|_2=1
$$

に正規化しておけば

$$
\boxed{
\rho_A(x)=x^{\mathsf T}Ax
}
$$

です。

$x=v$ が単位固有ベクトルで

$$
Av=\lambda v
$$

なら

$$
\rho_A(v)
=
v^{\mathsf T}Av
=
\lambda v^{\mathsf T}v
=
\lambda.
$$

従って、固有ベクトルの近似 $x$ が得られたら

$$
\mu=\rho_A(x)
$$

を固有値近似として使うのが自然です。

さらに

$$
r=Ax-\rho_A(x)x
$$

と置くと

$$
x^{\mathsf T}r
=
x^{\mathsf T}Ax-\rho_A(x)x^{\mathsf T}x
=
0.
$$

したがって

$$
\boxed{
r\perp x
}
$$

です。

Rayleigh 商を使うと、固有対残差は近似方向 $x$ に直交します。

---

## 2. Rayleigh 商の誤差と残差を固有ベクトル展開で読む

実対称行列 $A\in\mathbb R^{n\times n}$ の固有値を

$$
\lambda_1,\dots,\lambda_n
$$

とし、対応する正規直交固有ベクトルを

$$
v_1,\dots,v_n
$$

とします。

単位ベクトル $x$ を

$$
x
=
\sum_{i=1}^n c_i v_i,
\qquad
\sum_{i=1}^n c_i^2=1
$$

と展開します。

Rayleigh 商は

$$
\begin{aligned}
\mu
&=
x^{\mathsf T}Ax\\
&=
\left(
\sum_i c_i v_i
\right)^{\mathsf T}
\left(
\sum_j \lambda_j c_jv_j
\right)\\
&=
\sum_{i=1}^n
\lambda_i c_i^2.
\end{aligned}
$$

つまり Rayleigh 商は固有値の重み付き平均です。

固有対残差は

$$
r
=
Ax-\mu x
=
\sum_{i=1}^n
c_i(\lambda_i-\mu)v_i
$$

なので

$$
\boxed{
\|r\|_2^2
=
\sum_{i=1}^n
c_i^2(\lambda_i-\mu)^2
}
$$

となります。

<a id="prop-na10-rayleigh-residual"></a>
<!-- formal-statement-start -->
### 命題（Rayleigh 商の誤差と固有対残差の評価）

$A\in\mathbb R^{n\times n}$ を実対称行列とし、固有値を $\lambda_1,\dots,\lambda_n$ とする。

単位ベクトル $x$ に対して

$$
\mu=\rho_A(x),
\qquad
r=Ax-\mu x
$$

と置く。

このとき少なくとも一つの固有値 $\lambda_j$ が存在して

$$
\boxed{
|\lambda_j-\mu|
\le
\|r\|_2
}
$$

を満たす。

さらに、単位固有ベクトル $v_1$ に対応する固有値を $\lambda_1$ とし、

$$
x
=
c_1v_1+w,
\qquad
w\perp v_1
$$

と書く。

$v_1$ と $x$ のなす鋭角を $\theta$ とし、

$$
|c_1|=\cos\theta,
\qquad
\|w\|_2=\sin\theta
$$

とする。

$$
\Gamma
=
\max_{i\ge2}
|\lambda_i-\lambda_1|
$$

と置けば

$$
\boxed{
|\rho_A(x)-\lambda_1|
\le
\Gamma\sin^2\theta
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず近傍固有値の存在を示します。

上で導いた式から

$$
\|r\|_2^2
=
\sum_{i=1}^n
c_i^2(\lambda_i-\mu)^2.
$$

ここで

$$
d
=
\min_i|\lambda_i-\mu|
$$

と置くと、すべての $i$ について

$$
|\lambda_i-\mu|\ge d
$$

なので

$$
\begin{aligned}
\|r\|_2^2
&=
\sum_i c_i^2(\lambda_i-\mu)^2\\
&\ge
\sum_i c_i^2 d^2\\
&=
d^2.
\end{aligned}
$$

従って

$$
d\le\|r\|_2.
$$

これは、ある固有値 $\lambda_j$ が

$$
|\lambda_j-\mu|
\le
\|r\|_2
$$

を満たすことを意味します。

次に $\lambda_1$ への Rayleigh 商誤差を評価します。

正規直交固有ベクトル展開を

$$
x
=
c_1v_1+\sum_{i=2}^n c_iv_i
$$

と書けば

$$
\mu
=
\lambda_1c_1^2
+
\sum_{i=2}^n
\lambda_ic_i^2.
$$

また

$$
1
=
c_1^2
+
\sum_{i=2}^n c_i^2.
$$

従って

$$
\begin{aligned}
\mu-\lambda_1
&=
\sum_{i=2}^n
(\lambda_i-\lambda_1)c_i^2.
\end{aligned}
$$

絶対値を取ると

$$
|\mu-\lambda_1|
\le
\Gamma
\sum_{i=2}^n c_i^2.
$$

そして

$$
\sum_{i=2}^n c_i^2
=
\sin^2\theta
$$

なので

$$
\boxed{
|\mu-\lambda_1|
\le
\Gamma\sin^2\theta
}.
$$
<!-- proof-end -->

ここには重要な二つの事実があります。

1. 固有ベクトル方向の誤差が角度 $\theta$ 程度でも、Rayleigh 商の誤差は $\sin^2\theta$ で効く。
2. 固有対残差が小さければ、実対称行列では必ずその Rayleigh 商の近くに真の固有値がある。

後者は一般の非正規行列へ、そのまま移してはいけません。

---

## 3. 行列を繰り返し掛けると支配固有方向が残る

固有値を

$$
|\lambda_1|
>
|\lambda_2|
\ge
\cdots
\ge
|\lambda_n|
$$

と並べられる実対称行列を考えます。

初期ベクトルを固有ベクトル基底で

$$
x_0
=
c_1v_1+\cdots+c_nv_n
$$

と展開すると

$$
A^kx_0
=
c_1\lambda_1^kv_1
+
\cdots
+
c_n\lambda_n^kv_n.
$$

$\lambda_1^k$ をくくれば

$$
A^kx_0
=
\lambda_1^k
\left[
c_1v_1
+
\sum_{i=2}^n
c_i
\left(
\frac{\lambda_i}{\lambda_1}
\right)^k
v_i
\right].
$$

もし

$$
c_1\ne0
$$

なら、括弧の中では $v_1$ 以外の成分が相対的に小さくなります。

この仕組みを反復法にしたものが冪乗法です。

<a id="def-na10-power-method"></a>
<!-- formal-statement-start -->
### 定義（冪乗法）

$A\in\mathbb R^{n\times n}$ と単位初期ベクトル $x_0$ を与える。

$Ax_k\ne0$ である間、

$$
y_{k+1}=Ax_k,
$$

$$
\boxed{
x_{k+1}
=
\frac{y_{k+1}}{\|y_{k+1}\|_2}
}
$$

と更新する。

固有値近似には

$$
\boxed{
\mu_k
=
\rho_A(x_k)
=
x_k^{\mathsf T}Ax_k
}
$$

を用いる。

この反復を **冪乗法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-power-method -->
### 例：対角行列で支配成分が残ることを直接見る

**定義の確認**。

$$
A
=
\operatorname{diag}(5,2,1),
\qquad
x_0
=
\frac1{\sqrt3}
\begin{pmatrix}
1\\1\\1
\end{pmatrix}
$$

とします。

正規化前の第1反復は

$$
Ax_0
=
\frac1{\sqrt3}
\begin{pmatrix}
5\\2\\1
\end{pmatrix}.
$$

方向だけ見れば

$$
x_1
=
\frac1{\sqrt{30}}
\begin{pmatrix}
5\\2\\1
\end{pmatrix}.
$$

さらに

$$
A
\begin{pmatrix}
5\\2\\1
\end{pmatrix}
=
\begin{pmatrix}
25\\4\\1
\end{pmatrix},
$$

なので

$$
x_2
=
\frac1{\sqrt{642}}
\begin{pmatrix}
25\\4\\1
\end{pmatrix}.
$$

第1成分に対する相対比は

$$
\frac{4}{25},
\qquad
\frac{1}{25}
$$

まで小さくなっています。

対応する Rayleigh 商は

$$
\begin{aligned}
\mu_2
&=
\frac{
5\cdot25^2
+
2\cdot4^2
+
1\cdot1^2
}{642}\\
&=
\frac{3158}{642}\\
&=
\frac{1579}{321}.
\end{aligned}
$$

これは最大固有値5へ近づいています。
<!-- definition-example-end -->

---

## 4. 冪乗法の収束率は固有値の絶対値比で決まる

<a id="thm-na10-power-convergence"></a>
<!-- formal-statement-start -->
### 定理（実対称行列に対する冪乗法の方向収束）

$A\in\mathbb R^{n\times n}$ を実対称行列とする。

固有値を

$$
|\lambda_1|
>
|\lambda_2|
\ge
\cdots
\ge
|\lambda_n|
$$

と並べ、対応する正規直交固有ベクトルを

$$
v_1,\dots,v_n
$$

とする。

初期ベクトルを

$$
x_0
=
\sum_{i=1}^n c_iv_i,
\qquad
c_1\ne0
$$

とする。

正規化前の反復

$$
y_k=A^kx_0
$$

と $v_1$ のなす鋭角を $\theta_k$ とする。

$$
q
=
\frac{|\lambda_2|}{|\lambda_1|}
<1,
$$

$$
C
=
\left(
\sum_{i=2}^n
\left|
\frac{c_i}{c_1}
\right|^2
\right)^{1/2}
$$

と置けば

$$
\boxed{
\tan\theta_k
\le
Cq^k
}
$$

である。

従って冪乗法の方向は $v_1$ の張る1次元部分空間へ収束する。

さらに

$$
\Gamma
=
\max_{i\ge2}
|\lambda_i-\lambda_1|
$$

とすれば Rayleigh 商は

$$
\boxed{
|\rho_A(y_k)-\lambda_1|
\le
\Gamma C^2q^{2k}
}
$$

を満たす。ただし Rayleigh 商はベクトルの定数倍で変わらないので、$\rho_A(y_k)$ は正規化後の $x_k$ で計算してよい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固有ベクトル展開から

$$
y_k
=
A^kx_0
=
\sum_{i=1}^n
c_i\lambda_i^kv_i.
$$

$c_1\lambda_1^k\ne0$ なので、方向を変えない定数倍を除いて

$$
\frac{y_k}{c_1\lambda_1^k}
=
v_1
+
\sum_{i=2}^n
\frac{c_i}{c_1}
\left(
\frac{\lambda_i}{\lambda_1}
\right)^k
v_i.
$$

第2項を $w_k$ と置きます。

$$
w_k
\perp v_1.
$$

従って $v_1$ 成分の大きさが1で、直交成分の大きさが $\|w_k\|_2$ だから

$$
\tan\theta_k
=
\|w_k\|_2.
$$

正規直交性より

$$
\begin{aligned}
\|w_k\|_2^2
&=
\sum_{i=2}^n
\left|
\frac{c_i}{c_1}
\right|^2
\left|
\frac{\lambda_i}{\lambda_1}
\right|^{2k}\\
&\le
q^{2k}
\sum_{i=2}^n
\left|
\frac{c_i}{c_1}
\right|^2\\
&=
C^2q^{2k}.
\end{aligned}
$$

従って

$$
\tan\theta_k
\le
Cq^k.
$$

$q<1$ なので右辺は0へ収束し、方向は $v_1$ の張る部分空間へ近づきます。

次に Rayleigh 商誤差を評価します。

[Rayleigh 商の誤差評価](#prop-na10-rayleigh-residual)から

$$
|\rho_A(y_k)-\lambda_1|
\le
\Gamma\sin^2\theta_k.
$$

鋭角について

$$
\sin\theta_k
\le
\tan\theta_k
$$

なので

$$
|\rho_A(y_k)-\lambda_1|
\le
\Gamma C^2q^{2k}.
$$
<!-- proof-end -->

### 何が仮定として効いているか

この証明では

$$
|\lambda_1|>|\lambda_2|
$$

が、他の固有方向を相対的に縮めるために使われました。

また

$$
c_1\ne0
$$

が、最初から支配固有方向を完全に欠いていないことを保証します。

この二つを落とすと、証明機構そのものが壊れます。

---

## 5. 冪乗法がうまくいかない二つの典型例

### 5.1 支配固有値の絶対値が重なる

$$
A
=
\begin{pmatrix}
2&0\\
0&-2
\end{pmatrix},
\qquad
x_0
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\1
\end{pmatrix}
$$

とします。

1回作用させると

$$
x_1
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\-1
\end{pmatrix}.
$$

さらに1回作用させると

$$
x_2
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\1
\end{pmatrix}.
$$

従って方向は2周期で振動します。

ここで失われた仮定は

$$
|\lambda_1|>|\lambda_2|
$$

です。

固有値の絶対値比

$$
q
=
\frac{|\lambda_2|}{|\lambda_1|}
$$

が1なので、不要な固有方向が相対的に縮みません。

### 5.2 初期ベクトルが目的固有方向と直交する

$$
A
=
\begin{pmatrix}
5&0\\
0&2
\end{pmatrix},
\qquad
x_0
=
\begin{pmatrix}
0\\1
\end{pmatrix}
$$

とします。

すると

$$
A^kx_0
=
2^k
\begin{pmatrix}
0\\1
\end{pmatrix}.
$$

最大固有値5に対応する固有ベクトル $e_1$ の成分は最初から0で、その後も0のままです。

ここでは

$$
c_1\ne0
$$

という仮定を失っています。

---

## 6. 逆行列を掛けずに「逆行列の冪乗法」をする

冪乗法は絶対値最大の固有値を選びます。

では絶対値最小の固有値を選びたいときはどうすればよいでしょうか。

$A$ が可逆で

$$
Av_i=\lambda_iv_i
$$

なら

$$
A^{-1}v_i
=
\frac1{\lambda_i}v_i.
$$

従って $A^{-1}$ の絶対値最大固有値は、$A$ の絶対値最小固有値に対応します。

ただし数値計算では $A^{-1}$ を明示的に作りません。

<a id="def-na10-inverse-iteration"></a>
<!-- formal-statement-start -->
### 定義（逆反復法）

可逆行列 $A$ と単位初期ベクトル $x_0$ を与える。

各反復で線形方程式

$$
\boxed{
Ay_{k+1}=x_k
}
$$

を解き、

$$
\boxed{
x_{k+1}
=
\frac{y_{k+1}}{\|y_{k+1}\|_2}
}
$$

とする。

この方法を **逆反復法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-inverse-iteration -->
### 例：対角行列で絶対値最小固有値を選ぶ

**定義の確認**。

$$
A
=
\operatorname{diag}(1,3,7),
\qquad
x_0
=
\frac1{\sqrt3}
\begin{pmatrix}
1\\1\\1
\end{pmatrix}
$$

とします。

正規化を一旦無視して

$$
Ay_1
=
\begin{pmatrix}
1\\1\\1
\end{pmatrix}
$$

を解くと

$$
y_1
=
\begin{pmatrix}
1\\1/3\\1/7
\end{pmatrix}.
$$

第1成分が相対的に最も大きくなり、固有値1の固有方向へ近づきます。

$A^{-1}$ を明示的に作る必要はなく、毎回同じ係数行列 $A$ の連立方程式を解けばよいので、NA8 の LU 分解などを一度作って使い回せます。
<!-- definition-example-end -->

---

## 7. シフトすると「近い固有値」を選べる

ある実数 $\sigma$ に対し

$$
A-\sigma I
$$

を考えます。

$Av_i=\lambda_iv_i$ なら

$$
(A-\sigma I)v_i
=
(\lambda_i-\sigma)v_i.
$$

さらに $\sigma$ が固有値でなければ

$$
(A-\sigma I)^{-1}v_i
=
\frac1{\lambda_i-\sigma}v_i.
$$

従って

$$
|\lambda_i-\sigma|
$$

が最も小さい固有値ほど、逆行列側では絶対値最大になります。

<a id="def-na10-shifted-inverse"></a>
<!-- formal-statement-start -->
### 定義（シフト付き逆反復法）

$A\in\mathbb R^{n\times n}$ と、$A$ の固有値ではない実数 $\sigma$、単位初期ベクトル $x_0$ を与える。

各反復で

$$
\boxed{
(A-\sigma I)y_{k+1}=x_k
}
$$

を解き、

$$
\boxed{
x_{k+1}
=
\frac{y_{k+1}}{\|y_{k+1}\|_2}
}
$$

とする。

この方法を **シフト付き逆反復法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-shifted-inverse -->
### 例：シフト $5/2$ で固有値3を選ぶ

**定義の確認**。

$$
A
=
\operatorname{diag}(1,3,7),
\qquad
\sigma=\frac52.
$$

すると

$$
A-\sigma I
=
\operatorname{diag}
\left(
-\frac32,
\frac12,
\frac92
\right).
$$

逆作用の固有値は

$$
-\frac23,
\qquad
2,
\qquad
\frac29.
$$

絶対値最大は2で、元の固有値3に対応します。

$x_0=(1,1,1)^{\mathsf T}$ から1回の正規化前反復を行うと

$$
y_1
=
\begin{pmatrix}
-2/3\\
2\\
2/9
\end{pmatrix}.
$$

第2成分が支配的になっています。
<!-- definition-example-end -->

---

## 8. シフト付き逆反復法の収束率

<a id="thm-na10-shifted-inverse-convergence"></a>
<!-- formal-statement-start -->
### 定理（実対称行列に対するシフト付き逆反復法の方向収束）

$A\in\mathbb R^{n\times n}$ を実対称行列とし、固有値を

$$
\lambda_1,\dots,\lambda_n
$$

とする。

$\sigma$ は固有値ではなく、

$$
|\lambda_1-\sigma|
<
|\lambda_i-\sigma|
\qquad(i\ge2)
$$

を満たすとする。

対応する正規直交固有ベクトルを $v_i$ とし、初期ベクトルを

$$
x_0
=
\sum_{i=1}^n c_iv_i,
\qquad
c_1\ne0
$$

とする。

$$
d_1
=
|\lambda_1-\sigma|,
\qquad
d_2
=
\min_{i\ge2}
|\lambda_i-\sigma|,
$$

$$
q
=
\frac{d_1}{d_2}
<1
$$

と置く。

正規化前の反復

$$
y_k
=
(A-\sigma I)^{-k}x_0
$$

と $v_1$ のなす鋭角を $\theta_k$ とすれば、ある初期値依存の定数 $C$ に対して

$$
\boxed{
\tan\theta_k
\le
Cq^k
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A$ は実対称なので

$$
Av_i=\lambda_iv_i
$$

を満たす正規直交基底を取れます。

従って

$$
(A-\sigma I)^{-1}v_i
=
\frac1{\lambda_i-\sigma}v_i.
$$

よって

$$
y_k
=
\sum_{i=1}^n
c_i
(\lambda_i-\sigma)^{-k}
v_i.
$$

第1成分をくくると

$$
y_k
=
c_1(\lambda_1-\sigma)^{-k}
\left[
v_1
+
\sum_{i=2}^n
\frac{c_i}{c_1}
\left(
\frac{\lambda_1-\sigma}{\lambda_i-\sigma}
\right)^k
v_i
\right].
$$

括弧内の直交成分のノルムは

$$
\left[
\sum_{i=2}^n
\left|
\frac{c_i}{c_1}
\right|^2
\left|
\frac{\lambda_1-\sigma}{\lambda_i-\sigma}
\right|^{2k}
\right]^{1/2}.
$$

各 $i\ge2$ について

$$
\left|
\frac{\lambda_1-\sigma}{\lambda_i-\sigma}
\right|
\le
\frac{d_1}{d_2}
=
q.
$$

従って冪乗法と同じ議論で

$$
\tan\theta_k
\le
Cq^k.
$$
<!-- proof-end -->

この定理から、

> シフトを目的固有値へ近づけるほど、目的固有方向は強く増幅される

と分かります。

ただし $\sigma$ を固有値へ近づけるほど

$$
A-\sigma I
$$

は特異行列に近づきます。

したがって、反復回数だけを見ればよいわけではありません。

各反復で解く線形方程式の条件の悪さも同時に見ます。

---

## 9. 現在の近似からシフトを自動更新する

固定シフト $\sigma$ を人が選ぶ代わりに、現在の近似ベクトル $x_k$ から

$$
\mu_k
=
\rho_A(x_k)
$$

を計算し、これを次のシフトに使うことができます。

<a id="def-na10-rqi"></a>
<!-- formal-statement-start -->
### 定義（Rayleigh 商反復）

$A\in\mathbb R^{n\times n}$ を実対称行列とし、単位初期ベクトル $x_0$ を与える。

各 $k$ で

$$
\mu_k
=
\rho_A(x_k)
$$

を計算する。

もし

$$
Ax_k-\mu_kx_k=0
$$

なら終了する。

そうでなく、$A-\mu_kI$ が可逆なら

$$
\boxed{
(A-\mu_kI)y_{k+1}=x_k
}
$$

を解き、

$$
\boxed{
x_{k+1}
=
\frac{y_{k+1}}{\|y_{k+1}\|_2}
}
$$

とする。

この方法を **Rayleigh 商反復**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-rqi -->
### 例：1回で角度比が $1/3$ から $1/27$ へ縮む

**定義の確認**。

$$
A
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
$$

を考えます。

固有値3に対応する単位固有ベクトルは

$$
v_+
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\1
\end{pmatrix},
$$

固有値1に対応するものは

$$
v_-
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\-1
\end{pmatrix}.
$$

初期ベクトルを

$$
x_0
=
\frac1{\sqrt5}
\begin{pmatrix}
2\\1
\end{pmatrix}
$$

とします。

固有ベクトル基底では

$$
\begin{pmatrix}
2\\1
\end{pmatrix}
=
\frac3{\sqrt2}v_+
+
\frac1{\sqrt2}v_-.
$$

従って $v_+$ に対する角度の正接は

$$
\tan\theta_0
=
\frac13.
$$

Rayleigh 商は

$$
\mu_0
=
\frac{
(2,1)
\begin{pmatrix}
5\\4
\end{pmatrix}
}{5}
=
\frac{14}{5}.
$$

正規化係数は方向に影響しないので、

$$
\left(
A-\frac{14}{5}I
\right)y
=
\begin{pmatrix}
2\\1
\end{pmatrix}
$$

を解きます。

すると

$$
y
=
\begin{pmatrix}
65/9\\
70/9
\end{pmatrix}
\propto
\begin{pmatrix}
13\\14
\end{pmatrix}.
$$

固有ベクトル基底では

$$
\begin{pmatrix}
13\\14
\end{pmatrix}
=
\frac{27}{\sqrt2}v_+
-
\frac1{\sqrt2}v_-.
$$

従って

$$
\boxed{
\tan\theta_1
=
\frac1{27}
=
\left(
\frac13
\right)^3
}.
$$

この例では1回の反復で、方向誤差の比がちょうど3乗になっています。
<!-- definition-example-end -->

---

## 10. Rayleigh 商反復が局所的に3次になる理由

<a id="thm-na10-rqi-cubic"></a>
<!-- formal-statement-start -->
### 定理（Rayleigh 商反復の局所3次収束）

$A\in\mathbb R^{n\times n}$ を実対称行列とし、$\lambda_1$ を単純固有値、$v_1$ を対応する単位固有ベクトルとする。

他の固有値との隔たりを

$$
\gamma
=
\min_{i\ge2}
|\lambda_i-\lambda_1|
>0
$$

とし、

$$
\Gamma
=
\max_{i\ge2}
|\lambda_i-\lambda_1|
$$

とする。

単位ベクトル $x$ と $v_1$ のなす鋭角を $\theta$ とし、

$$
\mu=\rho_A(x)
$$

とする。

$$
|\mu-\lambda_1|
\le
\frac{\gamma}{2}
$$

であり、$A-\mu I$ が可逆であるとする。

Rayleigh 商反復を1回行って得られる単位ベクトルを $x_+$、その $v_1$ に対する角度を $\theta_+$ とすれば

$$
\boxed{
\tan\theta_+
\le
\frac{2\Gamma}{\gamma}
\tan^3\theta
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

正規直交固有ベクトル基底で

$$
x
=
c_1v_1
+
\sum_{i=2}^n c_iv_i
$$

と書きます。

鋭角を取っているので

$$
|c_1|=\cos\theta,
$$

$$
\left(
\sum_{i=2}^n c_i^2
\right)^{1/2}
=
\sin\theta.
$$

[Rayleigh 商の誤差評価](#prop-na10-rayleigh-residual)から

$$
|\mu-\lambda_1|
\le
\Gamma\sin^2\theta.
$$

Rayleigh 商反復の線形方程式

$$
(A-\mu I)y=x
$$

を固有ベクトル基底で解くと

$$
y
=
\frac{c_1}{\lambda_1-\mu}v_1
+
\sum_{i=2}^n
\frac{c_i}{\lambda_i-\mu}v_i.
$$

$i\ge2$ について三角不等式より

$$
|\lambda_i-\mu|
\ge
|\lambda_i-\lambda_1|
-
|\mu-\lambda_1|.
$$

仮定から

$$
|\mu-\lambda_1|
\le
\frac\gamma2
$$

なので

$$
|\lambda_i-\mu|
\ge
\gamma-\frac\gamma2
=
\frac\gamma2.
$$

したがって新しい角度の正接は

$$
\begin{aligned}
\tan\theta_+
&=
\frac{
\left[
\sum_{i=2}^n
\left|
\frac{c_i}{\lambda_i-\mu}
\right|^2
\right]^{1/2}
}{
\left|
\frac{c_1}{\lambda_1-\mu}
\right|
}\\
&\le
\frac{
(2/\gamma)\sin\theta
}{
|c_1|/|\lambda_1-\mu|
}\\
&=
\frac{2|\lambda_1-\mu|}{\gamma}
\tan\theta.
\end{aligned}
$$

ここへ

$$
|\lambda_1-\mu|
\le
\Gamma\sin^2\theta
$$

を代入すると

$$
\tan\theta_+
\le
\frac{2\Gamma}{\gamma}
\sin^2\theta
\tan\theta.
$$

最後に

$$
\sin\theta\le\tan\theta
$$

なので

$$
\boxed{
\tan\theta_+
\le
\frac{2\Gamma}{\gamma}
\tan^3\theta
}.
$$
<!-- proof-end -->

### どこで3乗が生まれたか

3乗は二つの効果の積です。

まず Rayleigh 商の固有値誤差が

$$
|\mu-\lambda_1|
\le
\Gamma\sin^2\theta
$$

と角度誤差の2乗になります。

次に逆反復の1回で、方向誤差へさらに

$$
|\mu-\lambda_1|
$$

が掛かります。

したがって

~~~text
方向誤差
  ↓ Rayleigh 商
固有値誤差 ≈ 方向誤差^2
  ↓ 逆反復
新しい方向誤差 ≈ 固有値誤差 × 方向誤差
  ↓
方向誤差^3
~~~

となります。

---

## 11. 固有対残差は対称固有値問題の後方誤差になる

NA1 では、計算結果が

> 少しだけ摂動した問題の厳密解になっているか

を見る後方誤差を扱いました。

固有値問題でも同じ考え方が使えます。

<a id="prop-na10-eigen-backward-error"></a>
<!-- formal-statement-start -->
### 命題（固有対残差の対称後方誤差）

$A\in\mathbb R^{n\times n}$ を実対称行列とし、$x$ を単位ベクトルとする。

$$
\mu=\rho_A(x),
\qquad
r=Ax-\mu x
$$

と置く。

このとき、対称行列 $E$ で

$$
(A+E)x=\mu x
$$

を満たすもののうち、2-ノルムが最小のものは

$$
\boxed{
\|E\|_2=\|r\|_2
}
$$

を達成できる。

従って単位ベクトル $x$ と Rayleigh 商 $\mu$ に対する固有対残差ノルムは、対称摂動に制限した固有値問題の最小後方誤差である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
x^{\mathsf T}r=0
$$

なので

$$
r\perp x.
$$

$r=0$ なら $E=0$ とすればよいので、以下 $r\ne0$ とします。

$$
u
=
\frac{r}{\|r\|_2}
$$

と置けば

$$
u\perp x,
\qquad
\|u\|_2=1.
$$

次の対称行列を考えます。

$$
\boxed{
E
=
-\|r\|_2
\left(
ux^{\mathsf T}
+
xu^{\mathsf T}
\right)
}.
$$

$x^{\mathsf T}x=1$、$u^{\mathsf T}x=0$ なので

$$
\begin{aligned}
Ex
&=
-\|r\|_2
\left[
u(x^{\mathsf T}x)
+
x(u^{\mathsf T}x)
\right]\\
&=
-\|r\|_2u\\
&=
-r.
\end{aligned}
$$

従って

$$
(A+E)x
=
Ax-r
=
\mu x.
$$

次に $E$ の2-ノルムを求めます。

$\operatorname{span}\{x,u\}$ 上で、基底 $(x,u)$ に関する $E$ の行列表現は

$$
\begin{pmatrix}
0&-\|r\|_2\\
-\|r\|_2&0
\end{pmatrix}
$$

です。

この行列の固有値は

$$
\pm\|r\|_2
$$

で、直交補空間上では $E=0$ です。

従って

$$
\|E\|_2=\|r\|_2.
$$

一方、任意の対称行列 $\widetilde E$ が

$$
(A+\widetilde E)x=\mu x
$$

を満たすなら

$$
\widetilde E x=-r.
$$

したがって誘導ノルムの定義から

$$
\|\widetilde E\|_2
\ge
\|\widetilde Ex\|_2
=
\|r\|_2.
$$

よって上で構成した $E$ が最小値を達成します。
<!-- proof-end -->

この命題は、計算した近似固有対に対して

$$
\|Ax-\mu x\|_2
$$

を報告する意味をはっきりさせます。

残差が小さいということは、元の対称行列をその程度だけ動かせば、その近似対が厳密な固有対になるということです。

---

## 12. 1本ではなく複数の固有方向を同時に追う

冪乗法は1本のベクトルを反復します。

複数の支配的固有方向を同時に求めたいなら、複数のベクトルを列に並べた行列を反復します。

ただし単に

$$
AQ_k
$$

を繰り返すと、全列が最も強い固有方向へ寄ってしまいます。

そこで各段階で列を正規直交化します。

<a id="def-na10-orthogonal-iteration"></a>
<!-- formal-statement-start -->
### 定義（直交反復法）

$A\in\mathbb R^{n\times n}$ と、列が正規直交する

$$
Q_0\in\mathbb R^{n\times p}
$$

を与える。

各反復で

$$
Z_{k+1}=AQ_k
$$

を計算し、その薄い QR 分解

$$
\boxed{
Z_{k+1}
=
Q_{k+1}R_{k+1}
}
$$

を取る。

これを **直交反復法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-orthogonal-iteration -->
### 例：$p=1$ なら冪乗法へ戻る

**定義の確認**。

$p=1$ なら $Q_k$ は単位ベクトル1本です。

$$
Z_{k+1}=AQ_k
$$

の薄い QR 分解は、列ベクトルをその長さで割るだけなので

$$
Q_{k+1}
=
\frac{AQ_k}{\|AQ_k\|_2}
$$

です。

これは符号の選び方を除けば冪乗法そのものです。

したがって直交反復法は、冪乗法を「複数方向を正規直交化しながら同時に追う」形へ拡張した方法です。
<!-- definition-example-end -->

---

## 13. QR 分解を固有値反復へ変える

正方行列 $A_k$ を QR 分解し

$$
A_k=Q_kR_k
$$

とします。

因子の順序を逆にして

$$
A_{k+1}=R_kQ_k
$$

と置きます。

一見すると単なる積の入れ替えですが、ここには相似変換が隠れています。

<a id="def-na10-qr-iteration"></a>
<!-- formal-statement-start -->
### 定義（QR 法）

$A_0=A$ とする。

各 $k$ で

$$
\boxed{
A_k=Q_kR_k
}
$$

と QR 分解し、

$$
\boxed{
A_{k+1}=R_kQ_k
}
$$

と更新する。

この反復を **QR 法**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-qr-iteration -->
### 例：2次対称行列の1回の QR 更新

**定義の確認**。

$$
A_0
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
$$

とします。

第1列

$$
\begin{pmatrix}
2\\1
\end{pmatrix}
$$

を正規化すると

$$
q_1
=
\frac1{\sqrt5}
\begin{pmatrix}
2\\1
\end{pmatrix}.
$$

これに直交する単位ベクトルとして

$$
q_2
=
\frac1{\sqrt5}
\begin{pmatrix}
-1\\2
\end{pmatrix}
$$

を取れば

$$
Q_0
=
\frac1{\sqrt5}
\begin{pmatrix}
2&-1\\
1&2
\end{pmatrix}.
$$

$$
R_0
=
Q_0^{\mathsf T}A_0
=
\begin{pmatrix}
\sqrt5&4/\sqrt5\\
0&3/\sqrt5
\end{pmatrix}.
$$

従って

$$
A_1
=
R_0Q_0
=
\begin{pmatrix}
14/5&3/5\\
3/5&6/5
\end{pmatrix}.
$$

非対角成分は

$$
1
\quad\longrightarrow\quad
\frac35
$$

へ小さくなりました。

一方

$$
\operatorname{tr}A_0
=
4
=
\operatorname{tr}A_1,
$$

$$
\det A_0
=
3
=
\det A_1
$$

で、固有値1と3は保存されています。
<!-- definition-example-end -->

<a id="prop-na10-qr-similarity"></a>
<!-- formal-statement-start -->
### 命題（QR 更新の直交相似性）

正方行列 $A_k$ の QR 分解を

$$
A_k=Q_kR_k
$$

とし、

$$
A_{k+1}=R_kQ_k
$$

とする。

このとき

$$
\boxed{
A_{k+1}
=
Q_k^{\mathsf T}A_kQ_k
}
$$

である。

従って $A_{k+1}$ は $A_k$ と相似で、固有値を保存する。

さらに $A_k$ が実対称なら $A_{k+1}$ も実対称である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Q_k$ は直交行列なので

$$
Q_k^{\mathsf T}Q_k=I.
$$

QR 分解

$$
A_k=Q_kR_k
$$

の左から $Q_k^{\mathsf T}$ を掛けると

$$
R_k
=
Q_k^{\mathsf T}A_k.
$$

従って

$$
\begin{aligned}
A_{k+1}
&=
R_kQ_k\\
&=
Q_k^{\mathsf T}A_kQ_k.
\end{aligned}
$$

これは直交相似変換なので固有値を保存します。

また $A_k^{\mathsf T}=A_k$ なら

$$
\begin{aligned}
A_{k+1}^{\mathsf T}
&=
(Q_k^{\mathsf T}A_kQ_k)^{\mathsf T}\\
&=
Q_k^{\mathsf T}A_k^{\mathsf T}Q_k\\
&=
Q_k^{\mathsf T}A_kQ_k\\
&=
A_{k+1}.
\end{aligned}
$$

従って対称性も保存されます。
<!-- proof-end -->

---

## 14. 実用的な QR 法ではシフトと問題分割を使う

無シフト QR 法は理論構造を見るには重要ですが、実用計算ではそのまま使うとは限りません。

シフト $\sigma_k$ を選び

$$
A_k-\sigma_k I
=
Q_kR_k
$$

と分解して

$$
\boxed{
A_{k+1}
=
R_kQ_k+\sigma_k I
}
$$

と更新します。

このとき

$$
\begin{aligned}
A_{k+1}
&=
Q_k^{\mathsf T}
(A_k-\sigma_k I)
Q_k
+
\sigma_k I\\
&=
Q_k^{\mathsf T}A_kQ_k.
\end{aligned}
$$

従ってシフトを入れても固有値は保存されます。

狙いは、シフト付き逆反復法と同じく、目的の固有値近傍を強く選択して非対角成分の減衰を速めることです。

実対称問題では反復が進み

$$
A_k
=
\begin{pmatrix}
B_k&*\\
*&a_{nn}^{(k)}
\end{pmatrix}
$$

の最後の行・列をつなぐ非対角成分が十分小さくなれば、

$$
a_{nn}^{(k)}
$$

を収束した固有値として切り離し、残りの $(n-1)\times(n-1)$ 問題へ進めます。

<a id="def-na10-deflation"></a>
<!-- formal-statement-start -->
### 定義（デフレーション）

固有値反復により、行列が数値的に

$$
A_k
\approx
\begin{pmatrix}
B_k&0\\
0&\lambda
\end{pmatrix}
$$

というブロック対角形へ分離したとき、収束した固有値 $\lambda$ に対応する行・列を後続計算から切り離し、残りの小さい固有値問題

$$
B_k
$$

へ移る操作を **デフレーション**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na10-deflation -->
### 例：3次問題を2次問題へ切り分ける

**定義の確認**。

反復の結果

$$
A_k
\approx
\begin{pmatrix}
4&1&0\\
1&2&0\\
0&0&7
\end{pmatrix}
$$

となったとします。

第3行・第3列は他の成分と結合していないので、$7$ はすでに切り離された固有値です。

したがって残る計算は

$$
\begin{pmatrix}
4&1\\
1&2
\end{pmatrix}
$$

の2次固有値問題だけです。

このように、収束済みの固有値を再計算対象から外して問題の次元を下げるのがデフレーションです。
<!-- definition-example-end -->

実装上は、対称行列をまず直交相似変換で三重対角行列へ落としてから、シフト付き QR 法を行うのが標準的です。

この章では Hessenberg 化・三重対角化の実装詳細までは進まず、

- なぜ QR 更新が固有値を保存するのか
- なぜシフトが効くのか
- なぜ非対角成分が小さくなれば問題を分割できるのか

という骨格までを扱います。

---

## 15. 方法ごとの役割を整理する

### 冪乗法

1回の主要計算は

$$
x\longmapsto Ax
$$

です。

大規模疎行列で、絶対値最大の固有値と固有ベクトル1本だけ欲しいときに自然です。

ただし

$$
|\lambda_1|
\approx
|\lambda_2|
$$

だと遅くなります。

### シフト付き逆反復法

主要計算は

$$
(A-\sigma I)y=x
$$

を解くことです。

特定の位置 $\sigma$ に近い固有値を1個狙えます。

同じシフトを固定するなら、$A-\sigma I$ の分解を一度作って再利用できます。

### Rayleigh 商反復

シフトを

$$
\sigma_k=\rho_A(x_k)
$$

と毎回更新します。

実対称行列の単純固有値へ十分近づけば、局所的に非常に速く収束します。

一方、シフトが毎回変わるため、固定シフトの逆反復法のように同じ LU 分解を単純に使い回せません。

### QR 法

一つの固有ベクトルだけでなく、行列全体を直交相似変換しながら固有値全体を取り出す方法です。

密な中小規模行列で全固有値を求める標準的な骨格になります。

---

## 16. 失敗例から仮定の役割を確認する

### 16.1 絶対値最大固有値が一意でない

冪乗法の

$$
|\lambda_1|>|\lambda_2|
$$

が失われると、不要な固有方向が相対的に減衰しない場合があります。

先ほどの

$$
A=\operatorname{diag}(2,-2)
$$

が典型例です。

### 16.2 初期ベクトルが目的固有空間と直交する

目的固有方向の係数が0なら、線形反復だけではその成分は新しく生まれません。

したがって冪乗法・逆反復法ともに

$$
c_1\ne0
$$

が必要です。

実際の浮動小数点計算では丸め誤差が微小成分を作ることはありますが、それを理論上の収束保証の代わりにはしません。

### 16.3 シフトが固有値そのものに一致する

$$
\sigma=\lambda_j
$$

なら

$$
A-\sigma I
$$

は特異です。

シフト付き逆反復法の線形方程式を通常の意味では解けません。

Rayleigh 商反復では、すでに

$$
Ax_k-\mu_kx_k=0
$$

ならその時点で終了します。

そうでないのにシフトが固有値へ正確に当たった場合は、線形方程式が特異になるため、実装上の処理が必要です。

### 16.4 固有値が重複する

重複固有値に対しては固有ベクトル1本が一意ではありません。

本質的な対象はその固有空間です。

このため複数固有方向を扱うときは、1本ずつのベクトルより不変部分空間を追う直交反復法の見方が自然になります。

### 16.5 非正規行列

実対称行列では正規直交固有ベクトル基底があり、

$$
\|r\|_2^2
=
\sum_i c_i^2(\lambda_i-\mu)^2
$$

と分解できました。

非正規行列では、この正規直交固有ベクトルによる成分表示が使えません。

したがって

$$
\min_i|\lambda_i-\mu|
\le
\|r\|_2
$$

という対称行列の保証を、仮定なしに一般行列へ移してはいけません。

---

## 17. 演習

### NA10-A01 冪乗法を2回実行する

- Level: A
- 目安時間: 15分

$$
A
=
\operatorname{diag}(5,2,1),
\qquad
x_0
=
\frac1{\sqrt3}
\begin{pmatrix}
1\\1\\1
\end{pmatrix}
$$

とする。

1. 冪乗法で $x_1,x_2$ を求めよ。
2. $x_2$ の Rayleigh 商 $\mu_2$ を求めよ。
3. 最大固有値5に対応する固有ベクトル $e_1$ に対し、正規化前ベクトル $A^2x_0$ の直交成分と $e_1$ 成分の比を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
Ax_0
=
\frac1{\sqrt3}
\begin{pmatrix}
5\\2\\1
\end{pmatrix}.
$$

ノルムは

$$
\left\|
\begin{pmatrix}
5\\2\\1
\end{pmatrix}
\right\|_2
=
\sqrt{25+4+1}
=
\sqrt{30}.
$$

したがって

$$
\boxed{
x_1
=
\frac1{\sqrt{30}}
\begin{pmatrix}
5\\2\\1
\end{pmatrix}
}.
$$

次に

$$
Ax_1
=
\frac1{\sqrt{30}}
\begin{pmatrix}
25\\4\\1
\end{pmatrix}.
$$

方向だけを正規化すればよいので

$$
25^2+4^2+1^2
=
625+16+1
=
642.
$$

従って

$$
\boxed{
x_2
=
\frac1{\sqrt{642}}
\begin{pmatrix}
25\\4\\1
\end{pmatrix}
}.
$$

Rayleigh 商は

$$
\begin{aligned}
\mu_2
&=
x_2^{\mathsf T}Ax_2\\
&=
\frac{
5\cdot25^2
+
2\cdot4^2
+
1\cdot1^2
}{642}\\
&=
\frac{3125+32+1}{642}\\
&=
\boxed{
\frac{1579}{321}
}.
\end{aligned}
$$

次に正規化前の

$$
A^2x_0
\propto
\begin{pmatrix}
25\\4\\1
\end{pmatrix}
$$

を考えます。

$e_1$ 成分の大きさは25です。

$e_1^\perp$ 成分は

$$
\begin{pmatrix}
0\\4\\1
\end{pmatrix}
$$

なので、そのノルムは

$$
\sqrt{4^2+1^2}
=
\sqrt{17}.
$$

従って角度の正接は

$$
\boxed{
\tan\theta_2
=
\frac{\sqrt{17}}{25}
}.
$$

初期時点では $e_1$ 成分1に対して直交成分ノルムは $\sqrt2$ だったので、支配固有方向が急速に残っていることが確認できます。
<!-- solution-end -->

### NA10-A02 Rayleigh 商と固有対残差

- Level: A
- 目安時間: 15分

$$
A
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix},
\qquad
x
=
\frac1{\sqrt5}
\begin{pmatrix}
2\\1
\end{pmatrix}
$$

とする。

1. Rayleigh 商 $\mu=\rho_A(x)$ を求めよ。
2. 固有対残差
   $$
   r=Ax-\mu x
   $$
   を求めよ。
3. $\|r\|_2$ を求めよ。
4. $A$ の固有値が1と3であることを使い、
   $$
   \min_{\lambda\in\{1,3\}}
   |\lambda-\mu|
   \le
   \|r\|_2
   $$
   を数値で確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
Ax
=
\frac1{\sqrt5}
\begin{pmatrix}
5\\4
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
\mu
&=
x^{\mathsf T}Ax\\
&=
\frac1{5}
(2,1)
\begin{pmatrix}
5\\4
\end{pmatrix}\\
&=
\frac{14}{5}.
\end{aligned}
$$

よって

$$
\boxed{
\mu=\frac{14}{5}
}.
$$

次に

$$
\mu x
=
\frac1{\sqrt5}
\begin{pmatrix}
28/5\\
14/5
\end{pmatrix}.
$$

したがって

$$
\begin{aligned}
r
&=
\frac1{\sqrt5}
\begin{pmatrix}
5\\4
\end{pmatrix}
-
\frac1{\sqrt5}
\begin{pmatrix}
28/5\\14/5
\end{pmatrix}\\
&=
\frac1{\sqrt5}
\begin{pmatrix}
-3/5\\6/5
\end{pmatrix}\\
&=
\boxed{
\frac{3}{5\sqrt5}
\begin{pmatrix}
-1\\2
\end{pmatrix}
}.
\end{aligned}
$$

従って

$$
\|r\|_2
=
\frac{3}{5\sqrt5}
\sqrt{1+4}
=
\boxed{
\frac35
}.
$$

Rayleigh 商から各固有値までの距離は

$$
\left|
3-\frac{14}{5}
\right|
=
\frac15,
$$

$$
\left|
1-\frac{14}{5}
\right|
=
\frac95.
$$

従って

$$
\min_{\lambda\in\{1,3\}}
|\lambda-\mu|
=
\frac15
\le
\frac35
=
\|r\|_2.
$$

[Rayleigh 商と残差の評価](#prop-na10-rayleigh-residual)が具体的に確認できました。
<!-- solution-end -->

### NA10-A03 シフト付き逆反復法

- Level: A
- 目安時間: 15分

$$
A
=
\operatorname{diag}(1,3,7),
\qquad
\sigma=\frac52,
\qquad
x_0=
\begin{pmatrix}
1\\1\\1
\end{pmatrix}
$$

とする。

1. 正規化前の第1反復 $y_1$ を求めよ。
2. $\sigma$ に最も近い固有値を求めよ。
3. 目的固有値と2番目に近い固有値までの距離から、方向誤差の幾何減衰係数
   $$
   q=\frac{d_1}{d_2}
   $$
   を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
A-\sigma I
=
\operatorname{diag}
\left(
-\frac32,
\frac12,
\frac92
\right).
$$

線形方程式

$$
(A-\sigma I)y_1=x_0
$$

を成分ごとに解くと

$$
-\frac32y_{1,1}=1,
$$

$$
\frac12y_{1,2}=1,
$$

$$
\frac92y_{1,3}=1.
$$

従って

$$
\boxed{
y_1
=
\begin{pmatrix}
-2/3\\
2\\
2/9
\end{pmatrix}
}.
$$

$\sigma=5/2$ から各固有値までの距離は

$$
\left|1-\frac52\right|
=
\frac32,
$$

$$
\left|3-\frac52\right|
=
\frac12,
$$

$$
\left|7-\frac52\right|
=
\frac92.
$$

最も近いのは

$$
\boxed{\lambda=3}
$$

です。

最小距離は

$$
d_1=\frac12,
$$

2番目に小さい距離は

$$
d_2=\frac32.
$$

従って

$$
\boxed{
q
=
\frac{d_1}{d_2}
=
\frac13
}.
$$

各反復で目的外成分は、目的成分に対して少なくともこの比で相対的に縮むことが分かります。
<!-- solution-end -->

### NA10-A04 QR 法を1回実行する

- Level: A
- 目安時間: 20分

$$
A_0
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
$$

とする。

1. 
   $$
   Q_0
   =
   \frac1{\sqrt5}
   \begin{pmatrix}
   2&-1\\
   1&2
   \end{pmatrix}
   $$
   としたとき、$R_0=Q_0^{\mathsf T}A_0$ を求めよ。
2. $A_1=R_0Q_0$ を求めよ。
3. $A_1=Q_0^{\mathsf T}A_0Q_0$ を確認せよ。
4. $A_0,A_1$ の対角成分の和と行列式を比較せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
Q_0^{\mathsf T}
=
\frac1{\sqrt5}
\begin{pmatrix}
2&1\\
-1&2
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
R_0
&=
Q_0^{\mathsf T}A_0\\
&=
\frac1{\sqrt5}
\begin{pmatrix}
2&1\\
-1&2
\end{pmatrix}
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}\\
&=
\frac1{\sqrt5}
\begin{pmatrix}
5&4\\
0&3
\end{pmatrix}.
\end{aligned}
$$

よって

$$
\boxed{
R_0
=
\begin{pmatrix}
\sqrt5&4/\sqrt5\\
0&3/\sqrt5
\end{pmatrix}
}.
$$

次に

$$
\begin{aligned}
A_1
&=
R_0Q_0\\
&=
\frac15
\begin{pmatrix}
5&4\\
0&3
\end{pmatrix}
\begin{pmatrix}
2&-1\\
1&2
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
14/5&3/5\\
3/5&6/5
\end{pmatrix}
}.
\end{aligned}
$$

一方

$$
R_0
=
Q_0^{\mathsf T}A_0
$$

なので

$$
R_0Q_0
=
Q_0^{\mathsf T}A_0Q_0.
$$

従って

$$
\boxed{
A_1=Q_0^{\mathsf T}A_0Q_0
}.
$$

対角成分の和は

$$
2+2=4,
$$

$$
\frac{14}{5}+\frac65=4.
$$

行列式は

$$
\det A_0=4-1=3,
$$

$$
\det A_1
=
\frac{84}{25}
-
\frac9{25}
=
3.
$$

よって対角成分の和と行列式はともに保存されています。

2次行列では固有値の和が対角成分の和に、固有値の積が行列式に一致するので、固有値1と3が保存されることとも整合します。
<!-- solution-end -->

### NA10-B01 冪乗法の角度評価を具体化する

- Level: B
- 目安時間: 20分

$A$ を実対称行列とし、正規直交固有ベクトル $v_1,v_2,v_3$ に対して

$$
Av_1=6v_1,
\qquad
Av_2=2v_2,
\qquad
Av_3=-v_3
$$

とする。

初期ベクトルを

$$
x_0
=
2v_1+v_2+2v_3
$$

とする。

1. [冪乗法の方向収束定理](#thm-na10-power-convergence)の $C,q$ を求めよ。
2. 第 $k$ 反復の角度について具体的な上界を与えよ。
3. Rayleigh 商について
   $$
   |\rho_A(A^kx_0)-6|
   $$
   の具体的な上界を与えよ。

<!-- solution-start -->
#### 詳細解答

固有値の絶対値は

$$
6,\qquad2,\qquad1
$$

なので支配固有値は6です。

第2に大きい絶対値は2だから

$$
\boxed{
q=\frac{2}{6}=\frac13
}.
$$

初期係数は

$$
c_1=2,
\qquad
c_2=1,
\qquad
c_3=2.
$$

従って

$$
\begin{aligned}
C
&=
\left[
\left(\frac{1}{2}\right)^2
+
\left(\frac{2}{2}\right)^2
\right]^{1/2}\\
&=
\left(
\frac14+1
\right)^{1/2}\\
&=
\boxed{
\frac{\sqrt5}{2}
}.
\end{aligned}
$$

したがって

$$
\boxed{
\tan\theta_k
\le
\frac{\sqrt5}{2}
\left(
\frac13
\right)^k
}.
$$

次に

$$
\Gamma
=
\max\{|2-6|,|-1-6|\}
=
7.
$$

従って定理の Rayleigh 商評価から

$$
\begin{aligned}
|\rho_A(A^kx_0)-6|
&\le
\Gamma C^2q^{2k}\\
&=
7\cdot\frac54
\left(
\frac19
\right)^k.
\end{aligned}
$$

よって

$$
\boxed{
|\rho_A(A^kx_0)-6|
\le
\frac{35}{4}
\left(
\frac19
\right)^k
}.
$$

方向誤差の上界は $1/3$ の $k$ 乗で減衰し、Rayleigh 商誤差の上界はその2乗に対応する $1/9$ の $k$ 乗で減衰します。
<!-- solution-end -->

### NA10-B02 固有対残差から最小対称摂動を作る

- Level: B
- 目安時間: 25分

$A$ を実対称行列、$x$ を単位ベクトルとし、

$$
\mu=x^{\mathsf T}Ax,
\qquad
r=Ax-\mu x
$$

とする。

$r\ne0$ と仮定する。

1. $x^{\mathsf T}r=0$ を示せ。
2. 
   $$
   u=\frac{r}{\|r\|_2}
   $$
   と置き、
   $$
   E
   =
   -\|r\|_2
   (ux^{\mathsf T}+xu^{\mathsf T})
   $$
   と定める。$E$ が対称で $(A+E)x=\mu x$ を満たすことを示せ。
3. $\|E\|_2=\|r\|_2$ を示せ。
4. 同じ条件を満たす任意の摂動 $\widetilde E$ に対し
   $$
   \|\widetilde E\|_2\ge\|r\|_2
   $$
   を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
\begin{aligned}
x^{\mathsf T}r
&=
x^{\mathsf T}(Ax-\mu x)\\
&=
x^{\mathsf T}Ax
-
\mu x^{\mathsf T}x.
\end{aligned}
$$

$x$ は単位ベクトルなので

$$
x^{\mathsf T}x=1.
$$

また

$$
\mu=x^{\mathsf T}Ax.
$$

従って

$$
\boxed{
x^{\mathsf T}r=0
}.
$$

よって $u=r/\|r\|_2$ は

$$
u\perp x
$$

を満たします。

次に

$$
E
=
-\|r\|_2
(ux^{\mathsf T}+xu^{\mathsf T})
$$

では

$$
E^{\mathsf T}=E
$$

なので $E$ は対称です。

また

$$
\begin{aligned}
Ex
&=
-\|r\|_2
\left[
u(x^{\mathsf T}x)
+
x(u^{\mathsf T}x)
\right]\\
&=
-\|r\|_2u\\
&=
-r.
\end{aligned}
$$

したがって

$$
(A+E)x
=
Ax-r
=
\mu x.
$$

次に $\operatorname{span}\{x,u\}$ 上で $E$ の作用を見ます。

$$
Ex=-\|r\|_2u,
$$

$$
Eu=-\|r\|_2x.
$$

従って正規直交基底 $(x,u)$ で

$$
E
\longleftrightarrow
\begin{pmatrix}
0&-\|r\|_2\\
-\|r\|_2&0
\end{pmatrix}.
$$

この2次行列の固有値は

$$
\pm\|r\|_2.
$$

また $\operatorname{span}\{x,u\}^{\perp}$ 上では $E=0$ です。

従って対称行列の2-ノルムは固有値絶対値の最大値なので

$$
\boxed{
\|E\|_2=\|r\|_2
}.
$$

最後に任意の $\widetilde E$ が

$$
(A+\widetilde E)x=\mu x
$$

を満たすなら

$$
\widetilde Ex
=
\mu x-Ax
=
-r.
$$

誘導2-ノルムの定義から

$$
\|\widetilde E\|_2
\ge
\frac{\|\widetilde Ex\|_2}{\|x\|_2}.
$$

$\|x\|_2=1$ なので

$$
\boxed{
\|\widetilde E\|_2
\ge
\|r\|_2
}.
$$

従って上で構成した $E$ は最小後方誤差を実現します。
<!-- solution-end -->

### NA10-B03 Rayleigh 商反復を1回追う

- Level: B
- 目安時間: 25分

$$
A
=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix},
\qquad
x_0
=
\frac1{\sqrt5}
\begin{pmatrix}
2\\1
\end{pmatrix}
$$

とする。

1. 固有値3に対応する
   $$
   v_+
   =
   \frac1{\sqrt2}
   \begin{pmatrix}
   1\\1
   \end{pmatrix}
   $$
   と固有値1に対応する
   $$
   v_-
   =
   \frac1{\sqrt2}
   \begin{pmatrix}
   1\\-1
   \end{pmatrix}
   $$
   を用いて $x_0$ の方向誤差 $\tan\theta_0$ を求めよ。
2. $\mu_0=\rho_A(x_0)$ を求めよ。
3. Rayleigh 商反復を1回行い、$x_1$ の方向が $(13,14)^{\mathsf T}$ に一致することを示せ。
4. $\tan\theta_1=1/27$ を確認せよ。
5. $\mu_1$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず正規化係数を一旦外して

$$
\begin{pmatrix}
2\\1
\end{pmatrix}
=
\frac3{\sqrt2}v_+
+
\frac1{\sqrt2}v_-.
$$

従って目的方向 $v_+$ に対する誤差比は

$$
\boxed{
\tan\theta_0
=
\frac{1/\sqrt2}{3/\sqrt2}
=
\frac13
}.
$$

次に

$$
A
\begin{pmatrix}
2\\1
\end{pmatrix}
=
\begin{pmatrix}
5\\4
\end{pmatrix}.
$$

よって

$$
\mu_0
=
\frac{(2,1)(5,4)^{\mathsf T}}{5}
=
\boxed{
\frac{14}{5}
}.
$$

Rayleigh 商反復では

$$
\left(
A-\frac{14}{5}I
\right)y
=
x_0
$$

を解きます。

右辺の定数倍は解の方向にしか影響しないので、

$$
\left(
A-\frac{14}{5}I
\right)y
=
\begin{pmatrix}
2\\1
\end{pmatrix}
$$

を解けば十分です。

係数行列は

$$
\begin{pmatrix}
-4/5&1\\
1&-4/5
\end{pmatrix}.
$$

連立方程式は

$$
-\frac45y_1+y_2=2,
$$

$$
y_1-\frac45y_2=1.
$$

第1式から

$$
y_2
=
2+\frac45y_1.
$$

第2式へ代入すると

$$
y_1
-
\frac45
\left(
2+\frac45y_1
\right)
=
1.
$$

従って

$$
\frac9{25}y_1
=
\frac{13}{5}.
$$

よって

$$
y_1=\frac{65}{9}.
$$

さらに

$$
y_2
=
2+\frac45\cdot\frac{65}{9}
=
\frac{70}{9}.
$$

したがって

$$
y
=
\frac5{9}
\begin{pmatrix}
13\\14
\end{pmatrix}
$$

であり、

$$
\boxed{
x_1
\parallel
\begin{pmatrix}
13\\14
\end{pmatrix}
}.
$$

この方向を固有ベクトル基底へ分解すると

$$
\begin{pmatrix}
13\\14
\end{pmatrix}
=
\frac{27}{\sqrt2}v_+
-
\frac1{\sqrt2}v_-.
$$

従って

$$
\boxed{
\tan\theta_1
=
\frac{1}{27}
}.
$$

実際

$$
\frac1{27}
=
\left(
\frac13
\right)^3.
$$

最後に

$$
A
\begin{pmatrix}
13\\14
\end{pmatrix}
=
\begin{pmatrix}
40\\41
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
\mu_1
&=
\frac{
(13,14)
(40,41)^{\mathsf T}
}{
13^2+14^2
}\\
&=
\frac{
520+574
}{
169+196
}\\
&=
\boxed{
\frac{1094}{365}
}.
\end{aligned}
$$

これは

$$
3-\frac{1094}{365}
=
\frac1{365}
$$

なので、1回だけで固有値3へ非常に近づいています。
<!-- solution-end -->

### NA10-C01 3個の固有値に対して方法を使い分ける

- Level: C
- 目安時間: 35分

$$
A
=
\begin{pmatrix}
2&1&0\\
1&2&0\\
0&0&6
\end{pmatrix}
$$

とする。

1. 次の3本が正規直交固有ベクトルであることを確認し、対応する固有値を求めよ。
   $$
   v_1
   =
   \frac1{\sqrt2}
   \begin{pmatrix}
   1\\-1\\0
   \end{pmatrix},
   \qquad
   v_2
   =
   \frac1{\sqrt2}
   \begin{pmatrix}
   1\\1\\0
   \end{pmatrix},
   \qquad
   v_3
   =
   \begin{pmatrix}
   0\\0\\1
   \end{pmatrix}.
   $$
2. 初期ベクトルが3固有方向すべてに非零成分を持つとする。冪乗法がどの固有値を選ぶか述べ、支配方向に対する最悪の固有値比を求めよ。
3. シフト $\sigma=2.6$ のシフト付き逆反復法はどの固有値を選ぶか。目的固有値までの距離 $d_1$ と2番目に近い固有値までの距離 $d_2$ を求め、$q=d_1/d_2$ を求めよ。
4. 最小固有値を狙うためシフト $\sigma=0.8$ を用いる。同様に $q$ を求めよ。
5. シフト付き逆反復法で十分よい固有ベクトル近似を得た後、Rayleigh 商反復へ切り替える利点を説明せよ。
6. 固有値3個すべてを同時に求めたい場合、QR 法が1本ずつの逆反復法と比べてどのような役割を持つか説明せよ。

<!-- solution-start -->
#### 詳細解答

まず $v_1$ について

$$
A
\begin{pmatrix}
1\\-1\\0
\end{pmatrix}
=
\begin{pmatrix}
1\\-1\\0
\end{pmatrix}.
$$

従って

$$
Av_1=v_1,
$$

つまり固有値は

$$
\lambda_1=1.
$$

次に

$$
A
\begin{pmatrix}
1\\1\\0
\end{pmatrix}
=
\begin{pmatrix}
3\\3\\0
\end{pmatrix}.
$$

従って

$$
Av_2=3v_2,
$$

固有値は

$$
\lambda_2=3.
$$

最後に

$$
Av_3
=
6v_3
$$

なので

$$
\lambda_3=6.
$$

また

$$
v_1^{\mathsf T}v_2
=
\frac12(1-1)=0,
$$

$v_3$ は最初の2本と明らかに直交し、各ノルムは1です。

従って3本は正規直交固有ベクトルです。

冪乗法では絶対値最大固有値6が支配します。

他の固有値絶対値は3と1なので、最悪の相対比は

$$
\boxed{
q_{\mathrm{power}}
=
\frac36
=
\frac12
}.
$$

したがって初期ベクトルが $v_3$ 成分を持てば、方向は $v_3$ へ近づきます。

次に

$$
\sigma=2.6
$$

とします。

各固有値までの距離は

$$
|1-2.6|=1.6,
$$

$$
|3-2.6|=0.4,
$$

$$
|6-2.6|=3.4.
$$

従って目的固有値は3です。

$$
d_1=0.4,
\qquad
d_2=1.6.
$$

よって

$$
\boxed{
q
=
\frac{0.4}{1.6}
=
\frac14
}.
$$

冪乗法で固有値6を取るときの比 $1/2$ より、小さい比で目的外成分を減衰させられます。

次に

$$
\sigma=0.8
$$

とします。

距離は

$$
|1-0.8|=0.2,
$$

$$
|3-0.8|=2.2,
$$

$$
|6-0.8|=5.2.
$$

従って最小固有値1が選ばれ、

$$
d_1=0.2,
\qquad
d_2=2.2.
$$

よって

$$
\boxed{
q
=
\frac{0.2}{2.2}
=
\frac1{11}
}.
$$

次に Rayleigh 商反復への切替を考えます。

固定シフト付き逆反復法では

$$
(A-\sigma I)y=x
$$

の同じ係数行列を繰り返し使えるため、目的固有値の近くへ入る段階では効率がよいです。

十分近づいた後は

$$
\sigma_k=\rho_A(x_k)
$$

と更新する Rayleigh 商反復へ切り替えると、[局所3次収束定理](#thm-na10-rqi-cubic)により方向誤差を非常に速く減らせます。

ただし Rayleigh 商反復ではシフトが毎回変わるため、固定シフトの因数分解をそのまま使い回せないという計算コスト上の違いがあります。

最後に全固有値を求める場合を考えます。

1本ずつの逆反復法では、狙う固有値ごとに適切なシフトを選び、重複して同じ固有値へ収束しないよう管理する必要があります。

QR 法では

$$
A_{k+1}
=
Q_k^{\mathsf T}A_kQ_k
$$

という直交相似変換で行列全体を更新し、固有値全体を保存したまま対角形へ近づけます。

従って

- 特定の1固有値を狙うならシフト付き逆反復法
- 良い初期近似から1固有対を高速に仕上げるなら Rayleigh 商反復
- 固有値全体を組織的に求めるなら QR 法

という役割分担になります。
<!-- solution-end -->

---

## 18. この章の要点

1. 近似固有対 $(\mu,x)$ の品質は
   $$
   r=Ax-\mu x
   $$
   という固有対残差で確認する。
2. 単位ベクトル $x$ に対し
   $$
   \mu=\rho_A(x)=x^{\mathsf T}Ax
   $$
   と取れば
   $$
   r\perp x.
   $$
3. 実対称行列では
   $$
   \min_i|\lambda_i-\mu|
   \le
   \|r\|_2
   $$
   なので、小さい残差は近傍に真の固有値があることを保証する。
4. 冪乗法は絶対値最大の固有方向を抽出し、その方向誤差は
   $$
   \frac{|\lambda_2|}{|\lambda_1|}
   $$
   の冪で減衰する。
5. 支配固有値の絶対値が重なる、または初期ベクトルが目的固有方向と直交すると、冪乗法の収束機構は壊れる。
6. シフト付き逆反復法は
   $$
   (A-\sigma I)^{-1}
   $$
   の冪乗法であり、$\sigma$ に最も近い固有値を選ぶ。
7. Rayleigh 商反復はシフトを現在の Rayleigh 商へ更新し、実対称行列の単純固有値近傍では
   $$
   \tan\theta_{k+1}
   \le
   C\tan^3\theta_k
   $$
   という局所3次収束を持つ。
8. 実対称行列では固有対残差ノルム
   $$
   \|Ax-\rho_A(x)x\|_2
   $$
   が対称摂動に対する最小後方誤差になる。
9. 直交反復法は冪乗法を複数ベクトルへ拡張し、各段で QR 分解により独立な方向を保つ。
10. QR 法の1回の更新は
    $$
    A_{k+1}
    =
    Q_k^{\mathsf T}A_kQ_k
    $$
    という直交相似変換であり、固有値と対称性を保存する。
11. シフトとデフレーションにより、QR 法は固有値全体を順に切り出す方法へ発展する。

次の NA11 では、非負行列に特有の固有値構造へ進みます。Perron--Frobenius 理論を使うと、最大固有値と正の固有ベクトルが確率行列・PageRank の意味へ直接つながります。
