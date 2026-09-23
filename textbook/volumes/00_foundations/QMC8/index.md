# QMC8 準 Monte Carlo VIII：高次準 Monte Carlo 法

QMC5 では、デジタル点集合の積分誤差を

$$
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k)
$$

という **Walsh 周波数の選別問題**へ移しました。

さらに NRT 重み

$$
\mu_1(\boldsymbol k)
$$

を使うと、通常の $(t,m,s)$-ネットは「低い Walsh 周波数を双対ネットからどこまで追い出したか」で特徴付けられました。

しかし NRT 重みは、各座標で **最も高い非零桁を一つだけ**見ます。

滑らかな関数では、通常の Fourier 解析で

$$
\text{微分可能回数が増える}
\quad\Longrightarrow\quad
\text{高周波係数が速く減衰する}
$$

ように、Walsh 解析でも複数の桁位置を使って滑らかさを拾いたくなります。

そこで本章では、

$$
\boxed{
\text{複数の非零桁位置を測る重み}
\longrightarrow
\text{高次デジタルネット}
\longrightarrow
N^{-\alpha}\text{ 型の誤差率}
}
$$

という高次準 Monte Carlo 法の骨格を作ります。

鍵は三つです。

1. NRT 重みを **Dick の $\alpha$ 重み**へ拡張する。
2. $m$ 桁の入力から $\alpha m$ 桁程度の出力を作り、双対ネットの低い高次周波数を排除する。
3. Walsh 係数が Dick の $\alpha$ 重みに応じて十分速く減衰する関数では、その排除がそのまま $N^{-\alpha}$ 型の求積誤差へ変わる。

最後に、既存の通常デジタルネットを $\alpha s$ 次元で作り、桁を交互に並べ直して $s$ 次元の高次デジタルネットへ変換する **桁交互配置（digit interlacing）**を完全に追います。

---

## 0. 本章で使う既出事項

QMC5 から次を使います。

- [Walsh 関数](../QMC5/index.md#def-qmc5-walsh-function)
- [Walsh 関数の積分直交性](../QMC5/index.md#thm-qmc5-walsh-integral-orthogonality)
- [デジタル点集合の双対ネット](../QMC5/index.md#def-qmc5-dual-net)
- [デジタルネット上の Walsh 関数の離散直交性](../QMC5/index.md#thm-qmc5-digital-character-property)
- [絶対収束 Walsh 級数](../QMC5/index.md#def-qmc5-absolute-walsh-series)
- [NRT 重み](../QMC5/index.md#def-qmc5-nrt-weight)
- [$t$ 値と最小双対 NRT 重みの双対関係](../QMC5/index.md#thm-qmc5-t-value-duality)

本章でも底 $b$ は素数とし、

$$
\mathbb F_b
=
\mathbb Z/b\mathbb Z
$$

上で桁を計算します。

QMC5 では生成行列を

$$
C_j\in\mathbb F_b^{m\times m}
$$

としました。

高次法では出力桁数を入力桁数より増やしたいので、本章では

$$
C_j\in\mathbb F_b^{n\times m}
$$

という長方形行列まで広げます。

> **停止線**
>
> 本章は高次デジタルネットの決定論的な周波数機構を扱います。QMC7 のランダム化と組み合わせた高次 RQMC の最適な二乗平均誤差率、重み付き Sobolev 空間での最適対数因子、桁交互配置多項式格子（interlaced polynomial lattice） の高速 CBC 構成は後続の計算機演習・発展文献へ送ります。

---

## 1. 一つの非零桁だけでは高次の滑らかさを測れない

整数 $k>0$ の $b$ 進展開を、非零桁だけ抜き出して

$$
k
=
\kappa_1b^{a_1-1}
+\cdots+
\kappa_\nu b^{a_\nu-1},
$$

$$
a_1>a_2>\cdots>a_\nu>0,
\qquad
\kappa_i\in\{1,\ldots,b-1\}
$$

と書きます。

QMC5 の NRT 重みは

$$
\mu_1(k)=a_1
$$

でした。

つまり最高位の非零桁しか見ません。

高次法では、上から $\alpha$ 個までの非零桁位置を足します。

<a id="def-qmc8-dick-alpha-weight"></a>
<!-- formal-statement-start -->
### 定義（Dick の α 重み）

$\alpha\in\mathbb N$ とする。

$k=0$ に対して

$$
\mu_\alpha(0)=0
$$

と置く。

$k>0$ を

$$
k
=
\kappa_1b^{a_1-1}
+\cdots+
\kappa_\nu b^{a_\nu-1},
\qquad
a_1>\cdots>a_\nu>0
$$

と書いたとき、

$$
\boxed{
\mu_\alpha(k)
=
\sum_{i=1}^{\min(\alpha,\nu)}a_i
}
$$

を **Dick の $\alpha$ 重み** と呼ぶ。

多次元では

$$
\boxed{
\mu_\alpha(\boldsymbol k)
=
\sum_{j=1}^s
\mu_\alpha(k_j)
}
$$

と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc8-dick-alpha-weight -->
**定義の確認**：底2で $13=(1101)_2$

$$
13
=
2^3+2^2+2^0
$$

なので、非零桁位置は

$$
a_1=4,\qquad
a_2=3,\qquad
a_3=1
$$

です。

したがって

$$
\mu_1(13)=4,
$$

$$
\mu_2(13)=4+3=7,
$$

$$
\mu_3(13)=4+3+1=8.
$$

$\alpha$ を大きくすると、最高位だけでなく次の非零桁の位置まで重みに反映されることが直接確認できます。
<!-- definition-example-end -->

同じ最高位を持つ整数でも、高次重みは区別します。

底2で

$$
8=(1000)_2,
\qquad
13=(1101)_2
$$

なら

$$
\mu_1(8)=\mu_1(13)=4
$$

ですが、

$$
\mu_2(8)=4,
\qquad
\mu_2(13)=7.
$$

NRT 重みでは同じ粗さに見えた二つの周波数を、高次重みでは分けられます。

<a id="prop-qmc8-alpha1-is-nrt"></a>
<!-- formal-statement-start -->
### 命題（Dick の1重みと NRT 重みの一致）

任意の

$$
\boldsymbol k\in\mathbb N_0^s
$$

に対して

$$
\boxed{
\mu_1(\boldsymbol k)
=
\mu_{\mathrm{NRT}}(\boldsymbol k)
}
$$

が成り立つ。

ここで右辺は QMC5 の NRT 重みである。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha=1$ なら、定義では各座標の非零桁位置のうち最大のものを一つだけ取ります。

これは NRT 重みそのものです。

<!-- proof-start -->
### 証明

まず一次元で考えます。

$k=0$ なら両者とも0です。

$k>0$ の非零桁位置を

$$
a_1>\cdots>a_\nu>0
$$

とすると、Dick の1重みは定義から

$$
\mu_1(k)
=
\sum_{i=1}^{\min(1,\nu)}a_i
=
a_1.
$$

一方、QMC5 の NRT 重みも「最高位の非零桁の位置」で定義されているため

$$
\mu_{\mathrm{NRT}}(k)=a_1.
$$

したがって一次元で一致します。

多次元では両者とも座標ごとの重みを足すので、

$$
\mu_1(\boldsymbol k)
=
\sum_{j=1}^s\mu_1(k_j)
=
\sum_{j=1}^s\mu_{\mathrm{NRT}}(k_j)
=
\mu_{\mathrm{NRT}}(\boldsymbol k).
$$
<!-- proof-end -->

この命題により、高次理論は通常のデジタルネット理論を捨てて別物を作るのではなく、

$$
\boxed{
\alpha=1
\quad\text{で QMC5 へ戻る拡張}
}
$$

になっています。

---

## 2. 高次法では生成する桁数を増やす

点数を

$$
N=b^m
$$

とします。

入力番号

$$
h\in\{0,\ldots,b^m-1\}
$$

の $b$ 進桁ベクトルを

$$
\boldsymbol h
=
(h_0,\ldots,h_{m-1})^{\mathsf T}
\in\mathbb F_b^m
$$

とします。

QMC5 では $m\times m$ 生成行列から各座標を $m$ 桁まで作りました。

ここでは出力桁数を $n$ とし、

$$
C_j
\in
\mathbb F_b^{n\times m},
\qquad
j=1,\ldots,s
$$

とします。

整数

$$
k
=
\sum_{r=0}^\infty
\kappa_r b^r
$$

に対し、下位 $n$ 桁ベクトルを

$$
\nu_n(k)
=
(\kappa_0,\ldots,\kappa_{n-1})^{\mathsf T}
\in\mathbb F_b^n
$$

と書きます。

<a id="def-qmc8-high-precision-digital-net"></a>
<!-- formal-statement-start -->
### 定義（高精度デジタル点集合と双対ネット）

素数底 $b$、正整数 $m,n,s$ と生成行列

$$
C_1,\ldots,C_s
\in
\mathbb F_b^{n\times m}
$$

を取る。

各入力

$$
\boldsymbol h\in\mathbb F_b^m
$$

に対し、

$$
\boldsymbol y_j
=
C_j\boldsymbol h
=
(y_{j,1},\ldots,y_{j,n})^{\mathsf T}
$$

と置き、

$$
x_{h,j}
=
\sum_{r=1}^{n}
y_{j,r}b^{-r}
$$

から

$$
\boldsymbol x_h
=
(x_{h,1},\ldots,x_{h,s})
$$

を作る。

$$
\boxed{
P
=
\{
\boldsymbol x_h:
\boldsymbol h\in\mathbb F_b^m
\}
}
$$

を、この生成行列から作る **$n$ 桁出力の高精度デジタル点集合** と呼ぶ。

さらに

$$
\boxed{
P^\perp
=
\left\{
\boldsymbol k\in\mathbb N_0^s:
\sum_{j=1}^s
C_j^{\mathsf T}\nu_n(k_j)
=
\boldsymbol0
\right\}
}
$$

をその双対ネットとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc8-high-precision-digital-net -->
**定義の確認**：底2、$m=1,n=2,s=1$

$$
C
=
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

とします。

入力桁は $h_0\in\mathbb F_2$ の一つだけです。

$h_0=0$ では

$$
C(0)
=
\begin{pmatrix}
0\\
0
\end{pmatrix}
$$

なので点は0です。

$h_0=1$ では

$$
C(1)
=
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

なので

$$
x
=
\frac12+\frac14
=
\frac34.
$$

従って

$$
\boxed{
P=\left\{0,\frac34\right\}.
}
$$

周波数

$$
k
=
\kappa_0
+
\kappa_1 2
+
\kappa_2 2^2+\cdots
$$

に対して

$$
\nu_2(k)
=
\begin{pmatrix}
\kappa_0\\
\kappa_1
\end{pmatrix}.
$$

双対条件は

$$
C^{\mathsf T}\nu_2(k)
=
(1,1)
\begin{pmatrix}
\kappa_0\\
\kappa_1
\end{pmatrix}
=
\kappa_0+\kappa_1
=
0
\quad\text{in }\mathbb F_2.
$$

よって

$$
\boxed{
k\in P^\perp
\iff
\kappa_0=\kappa_1.
}
$$

点集合と双対条件の両方を定義から直接構成できました。
<!-- definition-example-end -->

$n=m$ のときは QMC5 の正方生成行列型デジタル点集合へ戻ります。

違いは、点数 $b^m$ を変えずに **一つの点が持つ $b$ 進桁を $n$ 桁まで増やせる**ことです。

### 2.1 Walsh 周波数消去則は長方形行列でも変わらない

<a id="thm-qmc8-rectangular-character"></a>
<!-- formal-statement-start -->
### 定理（高精度デジタル点集合上の Walsh 関数の離散直交性）

上の生成行列

$$
C_1,\ldots,C_s
\in
\mathbb F_b^{n\times m}
$$

から作った $b^m$ 点のデジタル点集合を $P$ とする。

任意の

$$
\boldsymbol k\in\mathbb N_0^s
$$

に対し、

$$
\boxed{
\frac1{b^m}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
\begin{cases}
1,
&
\boldsymbol k\in P^\perp,
\\
0,
&
\boldsymbol k\notin P^\perp
\end{cases}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

QMC5 の正方行列の場合と核心は同じです。

Walsh 位相を入力桁ベクトル $\boldsymbol h$ との内積へ戻すと、

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_n(k_j)
$$

が零かどうかだけが残ります。

零でなければ $\mathbb F_b^m$ 上の非自明な指標を全て足すことになり、和は0です。

<!-- proof-start -->
### 証明

入力を

$$
\boldsymbol h
\in
\mathbb F_b^m
$$

とし、対応する点を $\boldsymbol x_h$ と書きます。

第 $j$ 座標の出力桁ベクトルは

$$
C_j\boldsymbol h
$$

です。

Walsh 関数の定義より、$\omega_b=e^{2\pi i/b}$ とすれば

$$
\operatorname{wal}_{k_j}(x_{h,j})
=
\omega_b^{
\nu_n(k_j)^{\mathsf T}
C_j\boldsymbol h
}.
$$

点の $n$ 桁より後ろは0なので、周波数の下位 $n$ 桁だけが現れます。

多次元 Walsh 関数は座標積なので

$$
\begin{aligned}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x_h)
&=
\prod_{j=1}^s
\omega_b^{
\nu_n(k_j)^{\mathsf T}C_j\boldsymbol h
}
\\
&=
\omega_b^{
\left(
\sum_{j=1}^s
C_j^{\mathsf T}\nu_n(k_j)
\right)^{\mathsf T}
\boldsymbol h
}.
\end{aligned}
$$

ここで

$$
\boldsymbol v
=
\sum_{j=1}^s
C_j^{\mathsf T}\nu_n(k_j)
\in\mathbb F_b^m
$$

と置きます。

$\boldsymbol v=\boldsymbol0$、すなわち $\boldsymbol k\in P^\perp$ なら各項は1なので

$$
\frac1{b^m}
\sum_{\boldsymbol h\in\mathbb F_b^m}1
=
1.
$$

次に $\boldsymbol v\ne\boldsymbol0$ とします。

少なくとも一つの成分 $v_r$ が非零です。

他の $m-1$ 成分を固定し、$h_r$ だけを $\mathbb F_b$ 全体で動かすと、その部分和は定数倍を除いて

$$
\sum_{a\in\mathbb F_b}
\omega_b^{v_r a}.
$$

$v_r\ne0$ なので $a\mapsto v_ra$ は $\mathbb F_b$ の置換です。

したがって

$$
\sum_{a\in\mathbb F_b}
\omega_b^{v_ra}
=
\sum_{c=0}^{b-1}\omega_b^c
=
0.
$$

よって $\boldsymbol h$ 全体の和も0です。

以上から表示式が従います。
<!-- proof-end -->

この定理により、QMC5 の

$$
\text{「双対ネットだけが Walsh 周波数として残る」}
$$

という原理は、出力精度 $n$ を増やしてもそのまま使えます。

---

## 3. 双対ネットの「最も低い高次周波数」を測る

高次重みを導入したので、双対ネット側でも最小値を取ります。

<a id="def-qmc8-minimum-dual-dick-weight"></a>
<!-- formal-statement-start -->
### 定義（最小双対 Dick 重み）

デジタル点集合 $P$ とその双対ネット $P^\perp$ に対し、

$$
\boxed{
\rho_\alpha(P)
=
\min\left\{
\mu_\alpha(\boldsymbol k):
\boldsymbol k\in
P^\perp\setminus\{\boldsymbol0\}
\right\}
}
$$

を **最小双対 Dick 重み** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc8-minimum-dual-dick-weight -->
**定義の確認**：$P=\{0,3/4\}$ の $\rho_2$

前節の底2の例では

$$
k\in P^\perp
\iff
\kappa_0=\kappa_1.
$$

$k=1=(01)_2$ と $k=2=(10)_2$ は双対に入りません。

一方、

$$
k=3=(11)_2
$$

は双対に入り、

$$
\mu_2(3)
=
2+1
=
3.
$$

また

$$
k=4=(100)_2
$$

は下位2桁が00なので双対に入り、

$$
\mu_2(4)=3.
$$

重み1または2の非零双対周波数は存在しないため、

$$
\boxed{
\rho_2(P)=3.
}
$$
<!-- definition-example-end -->

通常の $t$ 値では

$$
\rho_1(P)
$$

が重要でした。

高次法では

$$
\rho_\alpha(P)
$$

を $\alpha m$ に近いところまで押し上げます。

<a id="def-qmc8-order-alpha-digital-net"></a>
<!-- formal-statement-start -->
### 定義（次数 α デジタルネット）

$\alpha,m,s$ を正整数とし、出力精度

$$
n\ge\alpha m
$$

の $b^m$ 点デジタル点集合 $P$ を取る。

整数

$$
0\le t_\alpha\le\alpha m
$$

に対し、

$$
\boxed{
\rho_\alpha(P)
>
\alpha m-t_\alpha
}
$$

が成り立つとき、$P$ を **次数 $\alpha$ のデジタル $(t_\alpha,m,s)$-net** と呼ぶ。

本章では本文中では **次数 $\alpha$ デジタルネット** と略記する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc8-order-alpha-digital-net -->
**定義の確認**：2点集合 $P=\{0,3/4\}$

この例では

$$
b=2,
\qquad
m=1,
\qquad
n=2,
\qquad
\alpha=2
$$

で、

$$
n=\alpha m=2.
$$

前節で

$$
\rho_2(P)=3
$$

と求めました。

$t_2=0$ とすると必要条件は

$$
\rho_2(P)
>
2\cdot1-0
=
2.
$$

実際に

$$
3>2
$$

なので、

$$
\boxed{
P
\text{ は次数 }2\text{ のデジタル }(0,1,1)\text{-ネット}
}
$$

です。
<!-- definition-example-end -->

### 3.1 $\alpha=1$ では通常の $t$ 値へ戻る

$\alpha=1$、$n=m$ とします。

命題より

$$
\rho_1(P)
$$

は QMC5 の最小双対 NRT 重みです。

従って条件

$$
\rho_1(P)>m-t_1
$$

は、QMC5 の [$t$ 値と最小双対 NRT 重みの双対関係](../QMC5/index.md#thm-qmc5-t-value-duality) と一致します。

したがって

$$
\boxed{
\text{次数 }1
=
\text{通常のデジタル }(t,m,s)\text{-net}
}
$$

です。

---

## 4. なぜ $\alpha m$ 桁程度の出力精度が必要なのか

高次法では、単に新しい重みを定義するだけでは足りません。

もし生成行列が $n$ 行しか持たなければ、下位 $n$ 桁がすべて0の周波数は生成行列から見えません。

これが有限精度の障壁になります。

<a id="prop-qmc8-precision-barrier"></a>
<!-- formal-statement-start -->
### 命題（有限出力精度による最小双対 Dick 重みの上限）

生成行列

$$
C_1,\ldots,C_s
\in
\mathbb F_b^{n\times m}
$$

から作るデジタル点集合を $P$ とする。

任意の

$$
\alpha\ge1
$$

に対して

$$
\boxed{
\rho_\alpha(P)
\le
n+1
}
$$

が成り立つ。

従って

$$
\rho_\alpha(P)
>
\alpha m-t_\alpha
$$

を満たしたいなら、必要条件として

$$
\boxed{
n\ge
\alpha m-t_\alpha
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

第1座標だけに周波数

$$
b^n
$$

を入れます。

この整数の下位 $n$ 桁はすべて0なので、どんな生成行列でも双対条件を自動的に満たします。

一方、その Dick 重みは $n+1$ です。

<!-- proof-start -->
### 証明

周波数ベクトル

$$
\boldsymbol k^\star
=
(b^n,0,\ldots,0)
$$

を考えます。

$b^n$ の $b$ 進表示は

$$
b^n
=
1\cdot b^n
$$

なので、下位 $n$ 桁

$$
\kappa_0,\ldots,\kappa_{n-1}
$$

はすべて0です。

従って

$$
\nu_n(b^n)
=
\boldsymbol0.
$$

他の座標も0なので

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_n(k_j^\star)
=
\boldsymbol0.
$$

よって

$$
\boldsymbol k^\star
\in P^\perp.
$$

しかも $\boldsymbol k^\star\ne\boldsymbol0$ です。

$b^n$ の唯一の非零桁位置は $n+1$ なので、任意の $\alpha\ge1$ に対し

$$
\mu_\alpha(b^n)=n+1.
$$

従って

$$
\rho_\alpha(P)
\le
\mu_\alpha(\boldsymbol k^\star)
=
n+1.
$$

これで前半が示されました。

さらに

$$
\rho_\alpha(P)
>
\alpha m-t_\alpha
$$

を要求すると、

$$
n+1
\ge
\rho_\alpha(P)
>
\alpha m-t_\alpha.
$$

$n,\alpha m,t_\alpha$ は整数なので

$$
n
\ge
\alpha m-t_\alpha.
$$
<!-- proof-end -->

この命題は、なぜ 次数 $\alpha$ デジタルネットの標準的な構成で

$$
n\approx\alpha m
$$

まで桁を生成するのかを説明します。

たとえば $t_\alpha$ を $m$ に依らない小さな定数に保ちたいなら、

$$
n
\ge
\alpha m-O(1)
$$

が必要です。

点数は

$$
N=b^m
$$

のままですが、一点あたりに必要な内部桁数は高次化に応じて増えます。

---

## 5. 滑らかさを Walsh 係数の減衰として読む

高次デジタルネットが低い Dick 重みの周波数を消しても、被積分関数の高次周波数成分が大きければ誤差は小さくなりません。

必要なのは

$$
\boxed{
\mu_\alpha(\boldsymbol k)
\text{ が大きい}
\quad\Longrightarrow\quad
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
\text{ が小さい}
}
$$

という関数側の条件です。

ここでは高次収束の機構を完全に追えるよう、係数そのものへ強い可算和条件を置きます。

<a id="def-qmc8-higher-order-walsh-norm"></a>
<!-- formal-statement-start -->
### 定義（高次 Walsh 係数ノルム）

$f:[0,1)^s\to\mathbb C$ の Walsh 係数を

$$
\widehat f_{\mathrm{wal}}(\boldsymbol k)
$$

とする。

$\alpha\in\mathbb N$ に対し、

$$
\boxed{
\|f\|_{\mathrm{Wal},\alpha,1}
=
|\widehat f_{\mathrm{wal}}(\boldsymbol0)|
+
\sum_{\boldsymbol k\ne\boldsymbol0}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
}
$$

が有限であるとき、$f$ は **有限な高次 Walsh 係数ノルムを持つ**という。

誤差評価では定数成分を除いた

$$
\boxed{
|f|_{\mathrm{Wal},\alpha,1}
=
\sum_{\boldsymbol k\ne\boldsymbol0}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
}
$$

を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc8-higher-order-walsh-norm -->
**定義の確認**：有限 Walsh 多項式

底2、一次元で

$$
f(x)
=
2
+
3\operatorname{wal}_1(x)
-
\operatorname{wal}_3(x)
$$

とします。

$\alpha=2$ では

$$
\mu_2(1)=1,
\qquad
\mu_2(3)=2+1=3.
$$

したがって

$$
\begin{aligned}
\|f\|_{\mathrm{Wal},2,1}
&=
|2|
+
|3|2^{1}
+
|-1|2^{3}
\\
&=
2+6+8
\\
&=
\boxed{16}.
\end{aligned}
$$

また

$$
\boxed{
|f|_{\mathrm{Wal},2,1}=14.
}
$$

有限 Walsh 多項式では非零係数が有限個なので、このノルムは確かに有限です。
<!-- definition-example-end -->

この条件から各係数には直ちに

$$
\boxed{
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
\le
|f|_{\mathrm{Wal},\alpha,1}
b^{-\mu_\alpha(\boldsymbol k)}
}
$$

という高次減衰が従います。

ただし、ここで重要な注意があります。

### 5.1 この係数ノルムと通常の微分可能性は同じ概念ではない

有限 Walsh 多項式は区分的に不連続でも、上の係数ノルムは有限です。

したがって

$$
\|f\|_{\mathrm{Wal},\alpha,1}<\infty
$$

を、そのまま

$$
f\in C^\alpha
$$

と同一視してはいけません。

本章の係数ノルムは、

$$
\text{高次周波数の減衰}
\quad\text{と}\quad
\text{高次デジタルネットの双対構造}
$$

の噛み合わせを、自前で完全証明するための **Walsh 係数側の強い仮定**です。

一方、標準的な高次 QMC 理論では、混合偏導関数を持つ Sobolev 型関数空間などから Walsh 係数の Dick 重みに応じた減衰を導きます。

その導出では $b$ 進差分・反復積分・関数空間ノルムの比較が必要になります。

本章の後続定理はその外部結果を仮定に使いません。

ここでは

$$
\boxed{
\text{古典的な滑らかさ}
\;\Longrightarrow\;
\text{高次 Walsh 減衰}
}
$$

が高次 QMC の解析側の背景であり、本章ではその **デジタル側の機構**を係数ノルムで閉じる、と整理します。

---

## 6. 高次重みがそのまま $N^{-\alpha}$ 型誤差へ変わる

ここまでで必要な材料がそろいました。

- 点集合側：低い Dick 重みの双対周波数を排除する。
- 関数側：Dick 重みが大きいほど Walsh 係数を強く罰する。

両者を QMC5 型の誤差公式で掛け合わせます。

<a id="thm-qmc8-higher-order-error"></a>
<!-- formal-statement-start -->
### 定理（次数 α デジタルネットの高次 Walsh 誤差評価）

$P$ を底 $b$ の次数 $\alpha$ のデジタル $(t_\alpha,m,s)$-net とし、

$$
N=b^m
$$

とする。

$f$ が有限な高次 Walsh 係数ノルムを持つなら、

$$
\boxed{
|Q_P(f)-I(f)|
\le
b^{-\rho_\alpha(P)}
|f|_{\mathrm{Wal},\alpha,1}
}
$$

が成り立つ。

さらに 次数 $\alpha$ 条件から

$$
\rho_\alpha(P)
\ge
\alpha m-t_\alpha+1
$$

なので、

$$
\boxed{
|Q_P(f)-I(f)|
\le
b^{t_\alpha-1}
N^{-\alpha}
|f|_{\mathrm{Wal},\alpha,1}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

高次 Walsh 係数ノルムが有限なら、重みを外しても

$$
\sum_{\boldsymbol k}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
<\infty
$$

なので Walsh 級数は絶対収束します。

前節の離散直交性から、誤差には非零双対周波数だけが残ります。

その全てで

$$
\mu_\alpha(\boldsymbol k)
\ge
\rho_\alpha(P)
$$

なので、共通因子

$$
b^{-\rho_\alpha(P)}
$$

を外へ出せます。

<!-- proof-start -->
### 証明

まず

$$
b^{\mu_\alpha(\boldsymbol k)}
\ge1
$$

なので、

$$
\sum_{\boldsymbol k\ne\boldsymbol0}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
\le
\sum_{\boldsymbol k\ne\boldsymbol0}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
<
\infty.
$$

従って $f$ の Walsh 級数は絶対収束します。

そのため有限点平均と級数の交換が正当化されます。

前節の Walsh 離散直交性と、QMC5 の [Walsh 関数の積分直交性](../QMC5/index.md#thm-qmc5-walsh-integral-orthogonality) を使うと、

$$
Q_P(f)-I(f)
=
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\widehat f_{\mathrm{wal}}(\boldsymbol k).
$$

絶対値を取り、

$$
\begin{aligned}
|Q_P(f)-I(f)|
&\le
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
\\
&=
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
\left(
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
\right)
b^{-\mu_\alpha(\boldsymbol k)}.
\end{aligned}
$$

双対ネット内の全ての非零周波数で

$$
\mu_\alpha(\boldsymbol k)
\ge
\rho_\alpha(P)
$$

なので、

$$
b^{-\mu_\alpha(\boldsymbol k)}
\le
b^{-\rho_\alpha(P)}.
$$

したがって

$$
\begin{aligned}
|Q_P(f)-I(f)|
&\le
b^{-\rho_\alpha(P)}
\sum_{\substack{
\boldsymbol k\in P^\perp\\
\boldsymbol k\ne\boldsymbol0
}}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
\\
&\le
b^{-\rho_\alpha(P)}
\sum_{\boldsymbol k\ne\boldsymbol0}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
\\
&=
b^{-\rho_\alpha(P)}
|f|_{\mathrm{Wal},\alpha,1}.
\end{aligned}
$$

これで第一の評価が示されました。

次に 次数 $\alpha$ 条件は

$$
\rho_\alpha(P)
>
\alpha m-t_\alpha
$$

です。

左辺と右辺は整数なので

$$
\rho_\alpha(P)
\ge
\alpha m-t_\alpha+1.
$$

従って

$$
b^{-\rho_\alpha(P)}
\le
b^{-(\alpha m-t_\alpha+1)}
=
b^{t_\alpha-1}b^{-\alpha m}.
$$

最後に

$$
N=b^m
$$

より

$$
b^{-\alpha m}
=
N^{-\alpha}.
$$

したがって

$$
|Q_P(f)-I(f)|
\le
b^{t_\alpha-1}
N^{-\alpha}
|f|_{\mathrm{Wal},\alpha,1}.
$$
<!-- proof-end -->

ここで高次化の意味が明確になります。

$\alpha=1$ なら

$$
N^{-1}
$$

型です。

$\alpha=2$ なら

$$
N^{-2}
$$

型です。

$\alpha=3$ なら

$$
N^{-3}
$$

型です。

ただしこの結論は、

$$
\boxed{
\text{次数 }\alpha\text{ の点集合}
+
\text{次数 }\alpha\text{ に対応する係数減衰}
}
$$

を **同時に**持つときのものです。

片方だけでは高次収束になりません。

### 6.1 最小例

底2、$\alpha=2$、$m=1$ の

$$
P=\left\{0,\frac34\right\}
$$

では

$$
\rho_2(P)=3,
\qquad
t_2=0.
$$

従って

$$
|Q_P(f)-I(f)|
\le
2^{-3}
|f|_{\mathrm{Wal},2,1}.
$$

一方、定理の $N$ 表示では

$$
N=2
$$

なので

$$
2^{t_2-1}N^{-2}
=
2^{-1}\cdot2^{-2}
=
2^{-3}.
$$

両者が一致します。

---

## 7. 桁交互配置：通常ネットから高次ネットを作る

ここまでの定義だけでは、

> では $\rho_\alpha(P)$ の大きい点集合をどう作るのか

が残っています。

代表的な答えが **桁交互配置**です。

発想は単純です。

$\alpha$ 個の座標の桁を

$$
\text{1桁目を順番に}
\to
\text{2桁目を順番に}
\to
\cdots
$$

と並べ、一つの座標へ詰め込みます。

<a id="def-qmc8-digit-interlacing"></a>
<!-- formal-statement-start -->
### 定義（桁交互配置）

$\alpha\in\mathbb N$ とし、

$$
x_r
=
\sum_{q=1}^{\infty}
\xi_{r,q}b^{-q},
\qquad
r=1,\ldots,\alpha
$$

とする。

$$
\boxed{
\mathcal D_\alpha(x_1,\ldots,x_\alpha)
=
\sum_{q=1}^{\infty}
\sum_{r=1}^{\alpha}
\xi_{r,q}
b^{-\{\alpha(q-1)+r\}}
}
$$

を **桁交互配置** と呼ぶ。

$\alpha s$ 次元では連続する $\alpha$ 座標ずつをまとめ、

$$
\boxed{
\mathcal D_\alpha:
[0,1)^{\alpha s}
\to
[0,1)^s
}
$$

を

$$
\mathcal D_\alpha
(x_1,\ldots,x_{\alpha s})
=
\bigl(
\mathcal D_\alpha(x_1,\ldots,x_\alpha),
\ldots,
\mathcal D_\alpha(
x_{\alpha(s-1)+1},\ldots,x_{\alpha s}
)
\bigr)
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qmc8-digit-interlacing -->
**定義の確認**：底2、$\alpha=2$

$$
x_1
=
(0.1010\ldots)_2,
\qquad
x_2
=
(0.0110\ldots)_2
$$

とします。

各桁は

$$
x_1:\quad
1,\ 0,\ 1,\ 0,\ldots
$$

$$
x_2:\quad
0,\ 1,\ 1,\ 0,\ldots
$$

です。

桁交互配置では

$$
x_{1,1},
x_{2,1},
x_{1,2},
x_{2,2},
x_{1,3},
x_{2,3},
\ldots
$$

の順に並べるので、

$$
\mathcal D_2(x_1,x_2)
=
(0.10011100\ldots)_2.
$$

最初の6桁を直接見ると

$$
\boxed{
1,\ 0,\ 0,\ 1,\ 1,\ 1
}
$$

となり、二つの入力座標の桁が交互に入っていることを確認できます。
<!-- definition-example-end -->

### 7.1 生成行列では「行を交互に挿す」

$\alpha s$ 個の通常デジタル座標を

$$
C_{j,r}
\in
\mathbb F_b^{m\times m},
\qquad
j=1,\ldots,s,
\quad
r=1,\ldots,\alpha
$$

から作るとします。

ここで $C_{j,r}$ は、元の $\alpha s$ 個の生成行列のうち

$$
\alpha(j-1)+r
$$

番目のものです。

各 $C_{j,r}$ の第 $q$ 行を

$$
\boldsymbol c_{j,r,q}
\in
\mathbb F_b^m
$$

と書きます。

新しい行列

$$
D_j
\in
\mathbb F_b^{\alpha m\times m}
$$

を

$$
\boxed{
\text{$D_j$ の第 }\alpha(q-1)+r\text{ 行}
=
\boldsymbol c_{j,r,q}
}
$$

で作ります。

<a id="prop-qmc8-interlaced-matrix-point"></a>
<!-- formal-statement-start -->
### 命題（生成行列の行交互配置と点の桁交互配置の一致）

上の $C_{j,r}$ から作る $\alpha s$ 次元デジタル点を

$$
\boldsymbol z_h
\in[0,1)^{\alpha s}
$$

とする。

また、行を交互配置した

$$
D_1,\ldots,D_s
\in
\mathbb F_b^{\alpha m\times m}
$$

から作る $s$ 次元デジタル点を

$$
\boldsymbol x_h
$$

とする。

このとき各入力番号 $h$ に対し

$$
\boxed{
\boldsymbol x_h
=
\mathcal D_\alpha(\boldsymbol z_h)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$D_j$ の第 $\alpha(q-1)+r$ 行は、元の第 $(j,r)$ 座標の第 $q$ 行そのものです。

したがって出力の第 $\alpha(q-1)+r$ 桁は、元の第 $(j,r)$ 座標の第 $q$ 桁と一致します。

これは桁交互配置の定義そのものです。

<!-- proof-start -->
### 証明

入力桁ベクトルを

$$
\boldsymbol h\in\mathbb F_b^m
$$

とします。

元の第 $(j,r)$ 座標の第 $q$ 出力桁は

$$
\xi_{j,r,q}
=
\boldsymbol c_{j,r,q}\boldsymbol h.
$$

一方、新しい生成行列 $D_j$ の第 $\alpha(q-1)+r$ 行は定義から

$$
\boldsymbol c_{j,r,q}
$$

です。

従って新しい第 $j$ 座標の第 $\alpha(q-1)+r$ 桁は

$$
\boldsymbol c_{j,r,q}\boldsymbol h
=
\xi_{j,r,q}.
$$

つまり新しい第 $j$ 座標の桁列は

$$
\xi_{j,1,1},
\xi_{j,2,1},
\ldots,
\xi_{j,\alpha,1},
\xi_{j,1,2},
\ldots,
\xi_{j,\alpha,2},
\ldots
$$

の順に並びます。

これは

$$
\mathcal D_\alpha
(
z_{h,\alpha(j-1)+1},
\ldots,
z_{h,\alpha j}
)
$$

の桁列と一致します。

全ての $j=1,\ldots,s$ で同じことが成り立つため、

$$
\boldsymbol x_h
=
\mathcal D_\alpha(\boldsymbol z_h).
$$
<!-- proof-end -->

この構成では、点数は依然として

$$
b^m
$$

ですが、各出力座標は

$$
\alpha m
$$

桁を持ちます。

前節の精度障壁に対してちょうど必要な桁数が自然に生まれています。

---

## 8. なぜ桁交互配置で 次数 $\alpha$ になるのか

点の桁を交互配置するだけでは、高次ネットになる理由がまだ見えていません。

周波数側でも逆向きに桁をほどきます。

出力周波数

$$
k_j
=
\sum_{a=0}^\infty
\kappa_{j,a}b^a
$$

に対して、$r=1,\ldots,\alpha$ ごとに

$$
\ell_{j,r}
=
\sum_{q=0}^{m-1}
\kappa_{j,\alpha q+r-1}b^q
$$

を作ります。

つまり出力周波数の

$$
r,\ r+\alpha,\ r+2\alpha,\ldots
$$

番目の桁を一つの元周波数へ戻します。

<a id="thm-qmc8-interlacing-order-alpha"></a>
<!-- formal-statement-start -->
### 定理（桁交互配置による次数 α デジタルネット構成）

$P'$ を底 $b$ の デジタル $(t,m,\alpha s)$-ネット とする。

その $m\times m$ 生成行列を $\alpha$ 個ずつ行交互配置し、

$$
D_1,\ldots,D_s
\in
\mathbb F_b^{\alpha m\times m}
$$

から $s$ 次元点集合 $P$ を作る。

$$
\boxed{
\tau_\alpha
=
\min\left\{
\alpha m,\,
\alpha t
+
\frac{s\alpha(\alpha-1)}2
\right\}
}
$$

と置くと、

$$
\boxed{
P
\text{ は次数 }\alpha\text{ のデジタル }
(\tau_\alpha,m,s)\text{-ネット}
}
$$

である。
<!-- formal-statement-end -->

この評価は一般の鋭い $t_\alpha$ 評価を狙ったものではなく、**通常ネットを桁交互配置すれば $m$ に比例しない品質パラメータを得られる仕組み**を章内で完全に示すための評価です。

### 証明の見取り図

出力の双対周波数を $\alpha s$ 個の元周波数へほどきます。

元周波数が非零なら、元の $(t,m,\alpha s)$-ネット性から

$$
\mu_1(\boldsymbol\ell)>m-t
$$

です。

次に、各元座標の最高位非零桁を出力側へ戻すと、その位置はおよそ $\alpha$ 倍されます。

一つの出力座標にまとめる際の位置ずれは最大でも

$$
\frac{\alpha(\alpha-1)}2
$$

です。

これを $s$ 座標で足すと定理の補正項が出ます。

<!-- proof-start -->
### 証明

元の $\alpha s$ 個の生成行列を

$$
C_{j,r}
\in
\mathbb F_b^{m\times m},
\qquad
1\le j\le s,
\quad
1\le r\le\alpha
$$

と書きます。

行交互配置後の行列を $D_j$ とします。

非零周波数

$$
\boldsymbol k
=
(k_1,\ldots,k_s)
\in
P^\perp\setminus\{\boldsymbol0\}
$$

を任意に取ります。

まず、各 $k_j$ の最初の $\alpha m$ 桁が全て0である場合を考えます。

$\boldsymbol k\ne\boldsymbol0$ なので、少なくとも一つの座標で最初の非零桁位置が

$$
\alpha m+1
$$

以上です。

従って

$$
\mu_\alpha(\boldsymbol k)
\ge
\alpha m+1
>
\alpha m-\tau_\alpha.
$$

よってこの場合は目的の条件を満たします。

以下では、最初の $\alpha m$ 桁のどこかが非零であるとします。

各 $k_j$ の最初の $\alpha m$ 桁を $\alpha$ 本へほどき、

$$
\ell_{j,r}
=
\sum_{q=0}^{m-1}
\kappa_{j,\alpha q+r-1}b^q
$$

を作ります。

これらをまとめた $\alpha s$ 次元周波数を

$$
\boldsymbol\ell
=
(\ell_{1,1},\ldots,\ell_{1,\alpha},
\ldots,
\ell_{s,1},\ldots,\ell_{s,\alpha})
$$

とします。

仮定より最初の $\alpha m$ 桁のどこかは非零なので、

$$
\boldsymbol\ell\ne\boldsymbol0.
$$

行交互配置の定義から、

$$
D_j^{\mathsf T}\nu_{\alpha m}(k_j)
=
\sum_{r=1}^{\alpha}
C_{j,r}^{\mathsf T}\nu_m(\ell_{j,r}).
$$

$\boldsymbol k\in P^\perp$ なので左辺を $j$ について足したものは0です。

従って

$$
\sum_{j=1}^s
\sum_{r=1}^{\alpha}
C_{j,r}^{\mathsf T}\nu_m(\ell_{j,r})
=
\boldsymbol0.
$$

これは

$$
\boldsymbol\ell
\in
(P')^\perp
$$

を意味します。

しかも $\boldsymbol\ell\ne\boldsymbol0$ です。

$P'$ は デジタル $(t,m,\alpha s)$-ネット なので、QMC5 の [$t$ 値と最小双対 NRT 重みの双対関係](../QMC5/index.md#thm-qmc5-t-value-duality) から

$$
\mu_1(\boldsymbol\ell)
>
m-t.
\tag{1}
$$

次に Dick 重みを比較します。

$\ell_{j,r}\ne0$ のとき、その最高位非零桁位置を

$$
q_{j,r}
=
\mu_1(\ell_{j,r})
$$

とします。

$\ell_{j,r}=0$ なら

$$
q_{j,r}=0
$$

と置きます。

$\ell_{j,r}$ の最高位非零桁は、桁交互配置後の $k_j$ では

$$
a_{j,r}
=
\alpha(q_{j,r}-1)+r
$$

番目の非零桁になります。

一つの $j$ について非零な $q_{j,r}$ は高々 $\alpha$ 個です。

Dick の $\alpha$ 重みは $k_j$ の高い非零桁位置を最大 $\alpha$ 個足すため、

$$
\mu_\alpha(k_j)
\ge
\sum_{\substack{
1\le r\le\alpha\\
q_{j,r}>0
}}
\left[
\alpha(q_{j,r}-1)+r
\right].
$$

右辺を変形すると

$$
\begin{aligned}
\mu_\alpha(k_j)
&\ge
\alpha
\sum_{r=1}^{\alpha}q_{j,r}
-
\sum_{\substack{
1\le r\le\alpha\\
q_{j,r}>0
}}
(\alpha-r)
\\
&\ge
\alpha
\sum_{r=1}^{\alpha}q_{j,r}
-
\sum_{r=1}^{\alpha}(\alpha-r)
\\
&=
\alpha
\sum_{r=1}^{\alpha}q_{j,r}
-
\frac{\alpha(\alpha-1)}2.
\end{aligned}
$$

$j=1,\ldots,s$ について足すと

$$
\begin{aligned}
\mu_\alpha(\boldsymbol k)
&\ge
\alpha
\sum_{j=1}^s
\sum_{r=1}^{\alpha}q_{j,r}
-
\frac{s\alpha(\alpha-1)}2
\\
&=
\alpha\mu_1(\boldsymbol\ell)
-
\frac{s\alpha(\alpha-1)}2.
\end{aligned}
$$

式 (1) を代入して

$$
\mu_\alpha(\boldsymbol k)
>
\alpha(m-t)
-
\frac{s\alpha(\alpha-1)}2.
$$

すなわち

$$
\mu_\alpha(\boldsymbol k)
>
\alpha m
-
\left(
\alpha t
+
\frac{s\alpha(\alpha-1)}2
\right).
\tag{2}
$$

もし

$$
\alpha t
+
\frac{s\alpha(\alpha-1)}2
\le
\alpha m
$$

なら、$\tau_\alpha$ は括弧内そのものなので、式 (2) から

$$
\mu_\alpha(\boldsymbol k)
>
\alpha m-\tau_\alpha
$$

です。

一方、

$$
\alpha t
+
\frac{s\alpha(\alpha-1)}2
>
\alpha m
$$

なら

$$
\tau_\alpha=\alpha m
$$

です。

このとき必要条件は

$$
\mu_\alpha(\boldsymbol k)>0
$$

ですが、$\boldsymbol k\ne\boldsymbol0$ なので自動的に成り立ちます。

従って全ての非零双対周波数で

$$
\mu_\alpha(\boldsymbol k)
>
\alpha m-\tau_\alpha.
$$

よって

$$
\rho_\alpha(P)
>
\alpha m-\tau_\alpha
$$

であり、$P$ は 次数 $\alpha$ のデジタル $(\tau_\alpha,m,s)$-net です。
<!-- proof-end -->

この定理の重要な点は、元の $t$、次元 $s$、次数 $\alpha$ を固定すれば、右辺

$$
\alpha t
+
\frac{s\alpha(\alpha-1)}2
$$

は $m$ に依存しないことです。

十分大きな $m$ では

$$
\tau_\alpha
$$

も $m$ に依らない定数になります。

従って前節の誤差定理と組み合わせると、

$$
\boxed{
|Q_P(f)-I(f)|
=
O(N^{-\alpha})
}
$$

という高次収束が得られます。

---

## 9. 高次 QMC の構造を一枚で整理する

ここまでを周波数側から並べると、

$$
\boxed{
\begin{array}{c}
\text{通常のデジタル }(t,m,\alpha s)\text{-net}
\\[2mm]
\downarrow\ \text{桁交互配置}
\\[2mm]
\text{次数 }\alpha\text{ デジタルネット}
\\[2mm]
\downarrow
\\[2mm]
\rho_\alpha(P)\approx \alpha m
\\[2mm]
\downarrow
\\[2mm]
\text{低い Dick 重みの Walsh 周波数を消去}
\\[2mm]
+\quad
\text{高次 Walsh 係数減衰}
\\[2mm]
\downarrow
\\[2mm]
|Q_P(f)-I(f)|
\lesssim
N^{-\alpha}
\end{array}
}
$$

です。

ここで三つの「高次」が同じ $\alpha$ でそろっています。

- 関数側：$\alpha$ 次相当の Walsh 減衰
- 周波数側：Dick の $\alpha$ 重み
- 点集合側：次数 $\alpha$ デジタルネット

どれか一つだけ $\alpha$ を大きくしても、残りが追いつかなければ高次収束にはなりません。

### 9.1 QMC7 のランダム化との役割分担

QMC7 の [ランダム化準 Monte Carlo 法](../QMC7/index.md) は、

$$
\text{不偏性}
+
\text{反復による誤差評価}
$$

を与えました。

本章の高次化は、

$$
\text{滑らかさを利用して決定論的な周波数誤差を速く落とす}
$$

仕組みです。

したがって両者は競合しません。

概念的には

$$
\boxed{
\text{高次点集合}
\quad+\quad
\text{構造を保つランダム化}
}
$$

という組合せも可能です。

ただし、スクランブル後の最適な二乗平均誤差率を証明するには、QMC7 の分散公式よりさらに細かな Walsh 係数対の解析が必要になるため、本章の主線には持ち込みません。

---

## 10. 失敗例：高次にすれば自動的に速くなるわけではない

### 10.1 関数側に高次減衰がない

点集合が次数4 でも、被積分関数の Walsh 係数が一次相当しか減衰しないなら、

$$
b^{-\mu_4(\boldsymbol k)}
$$

に対応する強い係数評価を使えません。

点集合が持つ高次能力を関数側が使い切れないからです。

**失った条件**は高次 Walsh 減衰です。

**壊れる証明機構**は、誤差和の各係数へ

$$
b^{-\mu_\alpha(\boldsymbol k)}
$$

を掛けて $\rho_\alpha(P)$ を外へ出す段階です。

### 10.2 出力精度を $n=m$ のままにする

$\alpha=2$ を狙っても $n=m$ のままなら、精度障壁から

$$
\rho_2(P)\le m+1.
$$

一方、次数 2 で小さい $t_2$ を得るには

$$
\rho_2(P)>2m-t_2
$$

が必要です。

$m$ が大きくなると両立しません。

**失った条件**は十分な出力精度です。

**壊れる機構**は、下位 $n$ 桁が全て0の周波数

$$
b^n
$$

を生成行列が検出できないことです。

### 10.3 $t_\alpha$ が $m$ と同じ速さで増える

誤差評価は

$$
b^{t_\alpha-1}N^{-\alpha}
$$

です。

もし

$$
t_\alpha\approx \alpha m
$$

なら

$$
b^{t_\alpha}N^{-\alpha}
$$

がほぼ定数になり、高次収束の利点が消えます。

したがって「次数 $\alpha$ と名付けた」だけでは足りず、

$$
\boxed{
t_\alpha
\text{ を }m\text{ に対して小さく保つ}
}
$$

ことが設計上重要です。

### 10.4 高次 Walsh 係数ノルムを古典的滑らかさと同一視する

有限 Walsh 多項式は不連続でも高次 Walsh 係数ノルムが有限です。

従って

$$
\|f\|_{\mathrm{Wal},\alpha,1}<\infty
$$

から古典的な $C^\alpha$ 級を結論してはいけません。

本章のノルムは **高次誤差機構を閉じるためのWalsh 係数条件**です。

古典的混合 Sobolev 空間との精密な対応は別の解析問題です。

---

## 11. 演習

### 演習 QMC8-A1

- Level: A
- 主題: Dick の $\alpha$ 重み
- 使用技術: $b$ 進非零桁位置
- 計算量: 小

底2で

$$
k_1=13=(1101)_2,
\qquad
k_2=10=(1010)_2,
\qquad
k_3=8=(1000)_2
$$

とする。

1. 各 $k_i$ について $\mu_1,\mu_2,\mu_3$ を求めよ。
2. $k_1$ と $k_3$ は $\mu_1$ では同じ重みだが、$\mu_2$ では異なることを確認せよ。
3. $\boldsymbol k=(13,10)$ に対する $\mu_2(\boldsymbol k)$ を求めよ。

<!-- solution-start -->
### 詳細解答

まず非零桁位置を高い順に並べます。

$$
13=(1101)_2
=
2^3+2^2+2^0
$$

なので位置は

$$
4,\ 3,\ 1.
$$

従って

$$
\mu_1(13)=4,
$$

$$
\mu_2(13)=4+3=7,
$$

$$
\mu_3(13)=4+3+1=8.
$$

次に

$$
10=(1010)_2
=
2^3+2^1
$$

なので位置は

$$
4,\ 2.
$$

よって

$$
\mu_1(10)=4,
$$

$$
\mu_2(10)=4+2=6,
$$

$\alpha=3$ でも非零桁は2個しかないため

$$
\mu_3(10)=4+2=6.
$$

最後に

$$
8=(1000)_2
=
2^3
$$

なので非零桁位置は4だけです。

従って

$$
\mu_1(8)
=
\mu_2(8)
=
\mu_3(8)
=
4.
$$

特に

$$
\mu_1(13)=\mu_1(8)=4
$$

ですが、

$$
\mu_2(13)=7,
\qquad
\mu_2(8)=4.
$$

したがって高次重みは「最高位が同じ」という情報だけでは区別できなかった周波数を区別します。

多次元では座標和なので

$$
\mu_2(13,10)
=
\mu_2(13)+\mu_2(10)
=
7+6
=
\boxed{13}.
$$
<!-- solution-end -->

### 演習 QMC8-A2

- Level: A
- 主題: 高精度デジタル点集合と双対ネット
- 使用技術: 長方形生成行列・双対条件
- 計算量: 小

底2、$m=1,n=2,s=1$ で

$$
C
=
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

とする。

1. 2点の点集合 $P$ を求めよ。
2. $k=1,2,3,4$ がそれぞれ $P^\perp$ に入るか判定せよ。
3. $\rho_2(P)$ を求めよ。
4. この点集合が次数2のデジタル $(0,1,1)$-net であることを確認せよ。

<!-- solution-start -->
### 詳細解答

入力は

$$
h_0=0,\ 1
$$

です。

$h_0=0$ では出力桁は $(0,0)$ なので点は0です。

$h_0=1$ では

$$
C(1)
=
\begin{pmatrix}
1\\
1
\end{pmatrix}
$$

なので

$$
x
=
(0.11)_2
=
\frac12+\frac14
=
\frac34.
$$

従って

$$
\boxed{
P=\left\{0,\frac34\right\}.
}
$$

双対条件は

$$
\kappa_0+\kappa_1=0
\quad\text{in }\mathbb F_2
$$

です。

各周波数について、

$$
1=(01)_2
$$

では $(\kappa_0,\kappa_1)=(1,0)$ なので双対に入りません。

$$
2=(10)_2
$$

では $(0,1)$ なので入りません。

$$
3=(11)_2
$$

では $(1,1)$ で

$$
1+1=0
\quad\text{in }\mathbb F_2
$$

なので双対に入ります。

$$
4=(100)_2
$$

では下位2桁が $(0,0)$ なので双対に入ります。

従って

$$
3,4\in P^\perp,
\qquad
1,2\notin P^\perp.
$$

Dick の2重みは

$$
\mu_2(3)=2+1=3,
$$

$$
\mu_2(4)=3.
$$

重み1,2の非零双対周波数はないので

$$
\boxed{
\rho_2(P)=3.
}
$$

$\alpha m=2$ であり、

$$
\rho_2(P)=3>2-0.
$$

よって

$$
\boxed{
P
\text{ は次数 }2\text{ のデジタル }(0,1,1)\text{-ネット}
}
$$

です。
<!-- solution-end -->

### 演習 QMC8-A3

- Level: A
- 主題: 高次 Walsh 係数ノルム
- 使用技術: Walsh 係数・Dick 重み
- 計算量: 小

底2で

$$
f(x)
=
1
+
2\operatorname{wal}_1(x)
-
3\operatorname{wal}_2(x)
+
\operatorname{wal}_3(x)
$$

とする。

1. $\mu_2(1),\mu_2(2),\mu_2(3)$ を求めよ。
2. $\|f\|_{\mathrm{Wal},2,1}$ を求めよ。
3. $|f|_{\mathrm{Wal},2,1}$ を求めよ。
4. 各非零 Walsh 係数について
   $$
   |\widehat f_{\mathrm{wal}}(k)|
   \le
   |f|_{\mathrm{Wal},2,1}2^{-\mu_2(k)}
   $$
   が成り立つことを確認せよ。

<!-- solution-start -->
### 詳細解答

底2で

$$
1=(1)_2,
\qquad
2=(10)_2,
\qquad
3=(11)_2.
$$

したがって

$$
\mu_2(1)=1,
$$

$$
\mu_2(2)=2,
$$

$$
\mu_2(3)=2+1=3.
$$

Walsh 係数は

$$
\widehat f(0)=1,
\quad
\widehat f(1)=2,
\quad
\widehat f(2)=-3,
\quad
\widehat f(3)=1
$$

です。

よって

$$
\begin{aligned}
\|f\|_{\mathrm{Wal},2,1}
&=
1
+
2\cdot2^1
+
3\cdot2^2
+
1\cdot2^3
\\
&=
1+4+12+8
\\
&=
\boxed{25}.
\end{aligned}
$$

定数項を除けば

$$
\boxed{
|f|_{\mathrm{Wal},2,1}=24.
}
$$

係数評価を一つずつ確認します。

$k=1$ では

$$
|2|
=
2
\le
24\cdot2^{-1}
=
12.
$$

$k=2$ では

$$
|-3|
=
3
\le
24\cdot2^{-2}
=
6.
$$

$k=3$ では

$$
|1|
=
1
\le
24\cdot2^{-3}
=
3.
$$

全て成立します。

これはノルムの各項

$$
|\widehat f(k)|2^{\mu_2(k)}
$$

が総和24以下であることを、重みを右辺へ移しただけです。
<!-- solution-end -->

### 演習 QMC8-A4

- Level: A
- 主題: 桁交互配置
- 使用技術: 2進桁の再配置
- 計算量: 小

底2、$\alpha=2$ で

$$
x_1=(0.1101)_2,
\qquad
x_2=(0.0110)_2
$$

とする。

1. $\mathcal D_2(x_1,x_2)$ の先頭8桁を求めよ。
2. その値を分数で表せ。
3. 元の各座標が4桁なら、交互配置後に8桁が必要になる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

入力桁は

$$
x_1:\quad
1,\ 1,\ 0,\ 1,
$$

$$
x_2:\quad
0,\ 1,\ 1,\ 0.
$$

です。

交互配置では

$$
x_{1,1},
x_{2,1},
x_{1,2},
x_{2,2},
x_{1,3},
x_{2,3},
x_{1,4},
x_{2,4}
$$

の順に並べます。

従って

$$
\boxed{
\mathcal D_2(x_1,x_2)
=
(0.10110110)_2.
}
$$

分数へ直すと

$$
\frac12
+
\frac18
+
\frac1{16}
+
\frac1{64}
+
\frac1{128}.
$$

分母を256へそろえると

$$
\frac{128+32+16+4+2}{256}
=
\boxed{\frac{182}{256}}
=
\boxed{\frac{91}{128}}.
$$

元の各座標は4桁ですが、各桁段で2座標分を並べるので

$$
2\times4=8
$$

桁になります。

一般に $\alpha$ 個の $m$ 桁座標を交互配置すると、

$$
\alpha m
$$

桁の出力になります。
<!-- solution-end -->

### 演習 QMC8-B1

- Level: B
- 主題: 有限出力精度の障壁
- 使用技術: 双対条件・Dick 重み
- 計算量: 中

任意の底 $b$、任意の

$$
C_1,\ldots,C_s
\in
\mathbb F_b^{n\times m}
$$

から作るデジタル点集合 $P$ を考える。

1. 周波数
   $$
   \boldsymbol k^\star=(b^n,0,\ldots,0)
   $$
   が必ず $P^\perp$ に入ることを示せ。
2. $\mu_\alpha(\boldsymbol k^\star)$ を求め、$\rho_\alpha(P)\le n+1$ を示せ。
3. $\alpha=3,m=10$ で $t_3\le2$ を狙うとき、必要な $n$ の下限を求めよ。
4. $n=m=10$ のままではなぜこの品質を達成できないか説明せよ。

<!-- solution-start -->
### 詳細解答

$b^n$ の $b$ 進表示では、第 $n+1$ 桁だけが1で、下位 $n$ 桁は全て0です。

従って

$$
\nu_n(b^n)=\boldsymbol0.
$$

他座標も0なので

$$
\sum_{j=1}^s
C_j^{\mathsf T}\nu_n(k_j^\star)
=
C_1^{\mathsf T}\boldsymbol0
=
\boldsymbol0.
$$

よって

$$
\boxed{
\boldsymbol k^\star\in P^\perp.
}
$$

$\boldsymbol k^\star$ の唯一の非零桁位置は $n+1$ なので、どの $\alpha\ge1$ でも

$$
\mu_\alpha(\boldsymbol k^\star)
=
n+1.
$$

最小双対重みは双対内の非零周波数の最小値なので

$$
\boxed{
\rho_\alpha(P)\le n+1.
}
$$

次に

$$
\alpha=3,
\qquad
m=10,
\qquad
t_3\le2
$$

です。

次数3の条件には少なくとも

$$
n
\ge
\alpha m-t_3
$$

が必要です。

$t_3\le2$ を満たすには、最も緩い $t_3=2$ でも

$$
n
\ge
3\cdot10-2
=
\boxed{28}
$$

が必要です。

$n=m=10$ なら精度障壁から

$$
\rho_3(P)\le11.
$$

一方 $t_3\le2$ なら必要なのは

$$
\rho_3(P)>30-2=28.
$$

$$
11>28
$$

は不可能なので、どのように生成行列を選んでも達成できません。

失敗原因は点数不足ではなく **出力桁数不足**です。
<!-- solution-end -->

### 演習 QMC8-B2

- Level: B
- 主題: 次数 $\alpha$ ネットの誤差評価
- 使用技術: 最小双対 Dick 重み・高次 Walsh 係数ノルム
- 計算量: 中

底2の次数2のデジタル $(1,4,s)$-net $P$ を考える。

$$
N=2^4=16
$$

とし、関数 $f$ は

$$
|f|_{\mathrm{Wal},2,1}=20
$$

を満たすとする。

1. 次数2の条件から $\rho_2(P)$ の整数下限を求めよ。
2. $2^{-\rho_2(P)}|f|_{\mathrm{Wal},2,1}$ を使って誤差を上から評価せよ。
3. $2^{t_2-1}N^{-2}|f|_{\mathrm{Wal},2,1}$ を使って同じ評価を確認せよ。
4. 同じ $N=16$ で一次の $N^{-1}$ 型評価と比べ、高次化で $N$ に関する指数がどう変わったか説明せよ。

<!-- solution-start -->
### 詳細解答

次数2の条件は

$$
\rho_2(P)
>
2m-t_2.
$$

ここで

$$
m=4,
\qquad
t_2=1
$$

なので

$$
\rho_2(P)>8-1=7.
$$

$\rho_2(P)$ は整数だから

$$
\boxed{
\rho_2(P)\ge8.
}
$$

従って

$$
|Q_P(f)-I(f)|
\le
2^{-8}\cdot20
=
\boxed{\frac{20}{256}}
=
\boxed{\frac5{64}}.
$$

次に $N$ 表示を使います。

$$
2^{t_2-1}
=
2^{1-1}
=
1,
$$

$$
N^{-2}
=
16^{-2}
=
\frac1{256}.
$$

したがって

$$
2^{t_2-1}N^{-2}|f|_{\mathrm{Wal},2,1}
=
1\cdot\frac1{256}\cdot20
=
\boxed{\frac5{64}}.
$$

同じ評価が得られました。

一次の理論では点数依存が

$$
N^{-1}
$$

型でした。

ここでは

$$
N^{-2}
$$

型なので、$N$ を2倍にしたとき、主要因だけ見れば誤差は約

$$
2^{-2}
=
\frac14
$$

へ縮む設計です。

ただしこれは関数側の2次 Walsh 減衰と点集合側の次数2の条件を同時に仮定した結果です。
<!-- solution-end -->

### 演習 QMC8-B3

- Level: B
- 主題: 桁交互配置による品質パラメータ
- 使用技術: 桁交互配置の定理・パラメータ評価
- 計算量: 中

底2で、$4$ 次元の digital $(1,m,4)$-net を用意し、$\alpha=2$ の桁交互配置で $s=2$ 次元へ落とす。

1. 定理で得られる $\tau_2$ の上界を $m$ の式で書け。
2. $m\ge3$ なら $\tau_2$ がいくつ以下になるか求めよ。
3. $m=5$、$N=32$ のとき、有限な $|f|_{\mathrm{Wal},2,1}$ を持つ関数に対する誤差の $N$ 依存部分を求めよ。
4. 元のネットを2次元ではなく4次元で準備する理由を説明せよ。

<!-- solution-start -->
### 詳細解答

定理では

$$
\tau_\alpha
=
\min\left\{
\alpha m,\,
\alpha t
+
\frac{s\alpha(\alpha-1)}2
\right\}.
$$

ここで

$$
\alpha=2,
\qquad
t=1,
\qquad
s=2
$$

なので

$$
\alpha t
=
2,
$$

$$
\frac{s\alpha(\alpha-1)}2
=
\frac{2\cdot2\cdot1}{2}
=
2.
$$

従って

$$
\boxed{
\tau_2
=
\min\{2m,4\}.
}
$$

$m\ge2$ なら $2m\ge4$ なので既に $\tau_2\le4$ です。

特に $m\ge3$ では

$$
\boxed{
\tau_2\le4.
}
$$

$m=5$ なら

$$
N=2^5=32.
$$

誤差定理より

$$
|Q_P(f)-I(f)|
\le
2^{\tau_2-1}N^{-2}
|f|_{\mathrm{Wal},2,1}.
$$

$\tau_2\le4$ なので

$$
2^{\tau_2-1}
\le
2^3
=
8.
$$

従って

$$
\boxed{
|Q_P(f)-I(f)|
\le
8N^{-2}
|f|_{\mathrm{Wal},2,1}
}
$$

です。

$N=32$ を代入すれば

$$
8N^{-2}
=
\frac8{1024}
=
\frac1{128}.
$$

最後に、$\alpha=2$ では最終的な1座標を作るために元の2座標をまとめます。

最終次元が $s=2$ なので必要な元座標数は

$$
\alpha s
=
2\cdot2
=
4.
$$

従って4次元の通常ネットを2座標ずつまとめて、2次元の次数2デジタルネットへ変換します。
<!-- solution-end -->

### 演習 QMC8-C1

- Level: C
- 主題: 高次 QMC の統合問題
- 使用技術: Dick 重み・精度障壁・次数 $\alpha$ 条件・高次誤差率・桁交互配置
- 計算量: 大

底2、$\alpha=2$ の高次準 Monte Carlo 法を考える。

通常の デジタル $(0,3,2)$-ネット を用意し、2座標を桁交互配置して一次元の点集合 $P$ を作る。

被積分関数 $f$ は

$$
|f|_{\mathrm{Wal},2,1}=12
$$

を満たすとする。

1. 点数 $N$ と、交互配置後の出力桁数 $n$ を求めよ。
2. 定理から得られる $\tau_2$ を求めよ。
3. $\rho_2(P)$ の整数下限を求めよ。
4. $|Q_P(f)-I(f)|$ の上界を求めよ。
5. 同じ点数で一次の $N^{-1}$ 型誤差しか使えない場合と、$N$ に関する次数を比較せよ。
6. もし交互配置をせず $n=m=3$ のまま 次数2、$t_2=0$ を狙ったら不可能であることを精度障壁から示せ。
7. 「$\alpha=2$ の点集合を使えば、任意の可積分関数で $N^{-2}$ が出る」という主張が誤りである理由を説明せよ。

<!-- solution-start -->
### 詳細解答

元のネットは

$$
m=3
$$

なので点数は

$$
\boxed{
N=2^3=8.
}
$$

$\alpha=2$ の桁交互配置では、各元座標の $m=3$ 桁を2本まとめるため、出力桁数は

$$
\boxed{
n=\alpha m=6.
}
$$

次に 桁交互配置の定理 を使います。

ここでは

$$
t=0,
\qquad
\alpha=2,
\qquad
s=1.
$$

従って

$$
\tau_2
=
\min\left\{
2m,\,
2t+\frac{1\cdot2\cdot1}{2}
\right\}.
$$

右辺は

$$
2m=6,
$$

$$
2t+\frac{2}{2}
=
0+1
=
1.
$$

よって

$$
\boxed{
\tau_2=1.
}
$$

次数2の条件は

$$
\rho_2(P)
>
2m-\tau_2
=
6-1
=
5.
$$

$\rho_2(P)$ は整数なので

$$
\boxed{
\rho_2(P)\ge6.
}
$$

誤差定理より

$$
|Q_P(f)-I(f)|
\le
2^{-\rho_2(P)}
|f|_{\mathrm{Wal},2,1}.
$$

従って

$$
|Q_P(f)-I(f)|
\le
2^{-6}\cdot12
=
\frac{12}{64}
=
\boxed{\frac3{16}}.
$$

$N$ 表示でも確認します。

$$
2^{\tau_2-1}
=
2^{0}
=
1,
$$

$$
N^{-2}
=
8^{-2}
=
\frac1{64}.
$$

従って

$$
2^{\tau_2-1}N^{-2}|f|_{\mathrm{Wal},2,1}
=
1\cdot\frac1{64}\cdot12
=
\frac3{16}.
$$

一次の理論なら主要な点数依存は

$$
N^{-1}.
$$

今回の高次理論では

$$
N^{-2}.
$$

したがって同じ意味の定数が制御される範囲では、点数を増やしたときの指数が1から2へ上がっています。

次に、交互配置をせず

$$
n=m=3
$$

のまま

$$
\alpha=2,
\qquad
t_2=0
$$

を狙うとします。

精度障壁から

$$
\rho_2(P)
\le
n+1
=
4.
$$

一方 次数2、$t_2=0$ なら

$$
\rho_2(P)
>
2m
=
6
$$

が必要です。

$$
\rho_2(P)\le4
$$

と

$$
\rho_2(P)>6
$$

は両立しないので不可能です。

最後に、高次点集合だけでは $N^{-2}$ は保証されません。

誤差定理では

$$
|f|_{\mathrm{Wal},2,1}<\infty
$$

という関数側の高次 Walsh 減衰条件を使いました。

この条件がなければ

$$
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_2(\boldsymbol k)}
$$

の総和を有限量で抑えられず、

$$
b^{-\rho_2(P)}
$$

を共通因子として外へ出す証明が成立しません。

従って必要なのは

$$
\boxed{
\text{高次点集合}
+
\text{対応する関数側の高次減衰}
}
$$

であり、点集合だけを高次化しても任意の可積分関数に $N^{-2}$ が出るわけではありません。
<!-- solution-end -->

---

## 12. まとめ

本章では、QMC5 の双対 Walsh 理論を高次化しました。

最初に、整数の非零桁位置

$$
a_1>a_2>\cdots
$$

から

$$
\boxed{
\mu_\alpha(k)
=
a_1+\cdots+a_{\min(\alpha,\nu)}
}
$$

という Dick の $\alpha$ 重みを導入しました。

$\alpha=1$ では NRT 重みに戻るため、高次理論は通常のデジタルネット理論の自然な拡張です。

次に生成行列を

$$
m\times m
$$

から

$$
n\times m
$$

へ広げ、点数 $b^m$ を保ったまま出力桁数を増やしました。

長方形行列でも Walsh 周波数消去則

$$
\boxed{
\frac1{b^m}
\sum_{\boldsymbol x\in P}
\operatorname{wal}_{\boldsymbol k}(\boldsymbol x)
=
1_{\{\boldsymbol k\in P^\perp\}}
}
$$

がそのまま成立することを完全証明しました。

双対側では

$$
\rho_\alpha(P)
=
\min_{\boldsymbol k\in P^\perp\setminus\{0\}}
\mu_\alpha(\boldsymbol k)
$$

を導入し、

$$
\boxed{
\rho_\alpha(P)>
\alpha m-t_\alpha
}
$$

を次数 $\alpha$ デジタルネットの条件としました。

有限精度については、

$$
(b^n,0,\ldots,0)
\in P^\perp
$$

が必ず成り立つため

$$
\boxed{
\rho_\alpha(P)\le n+1
}
$$

を証明しました。

これにより、高品質な高次ネットで

$$
n\approx\alpha m
$$

が必要になる理由も説明できました。

関数側には

$$
|f|_{\mathrm{Wal},\alpha,1}
=
\sum_{\boldsymbol k\ne0}
|\widehat f_{\mathrm{wal}}(\boldsymbol k)|
b^{\mu_\alpha(\boldsymbol k)}
$$

という強い係数条件を置き、双対誤差公式から

$$
\boxed{
|Q_P(f)-I(f)|
\le
b^{-\rho_\alpha(P)}
|f|_{\mathrm{Wal},\alpha,1}
}
$$

を導きました。

次数 $\alpha$ 条件を代入すると

$$
\boxed{
|Q_P(f)-I(f)|
\le
b^{t_\alpha-1}
N^{-\alpha}
|f|_{\mathrm{Wal},\alpha,1}
}
$$

です。

最後に $\alpha s$ 次元の通常デジタルネットから、$\alpha$ 座標ずつ桁を交互配置して $s$ 次元へ落とす構成を作りました。

生成行列では行を

$$
1,2,\ldots,\alpha
$$

の順に交互配置するだけです。

周波数を逆にほどき、QMC5 の通常 $t$ 値の双対特徴付けと Dick 重みの比較を組み合わせることで、交互配置後の点集合が実際に 次数 $\alpha$ デジタルネットになることまで証明しました。

したがって QMC1 から QMC8 までで、

$$
\boxed{
\text{幾何学的均一性}
\to
\text{RKHS}
\to
\text{格子則}
\to
\text{デジタルネット}
\to
\text{Walsh 双対理論}
\to
\text{多項式格子}
\to
\text{ランダム化}
\to
\text{高次化}
}
$$

という準 Monte Carlo 法の理論本線が一巡しました。

次は Encore V 理論35講を横断し、用語・formal statement・証明依存・演習・詳細解答の整合をまとめて監査します。
