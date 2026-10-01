# F0-00P6A 独立同分布中心極限定理：特性関数の二次展開から正規極限へ

P6 で準備した特性関数の積公式・二次展開・[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)を、ここで一つの極限定理へ組み立てます。核心は、独立な和を特性関数の積へ変え、$t/\sqrt n$ という0近傍で二次項だけを残し、その $n$ 乗を正規分布の特性関数へ収束させることです。

---

## 1. なぜ標準化するのか

$X_1,X_2,\ldots$ を独立同分布とし

$$
E[X_i]=\mu,
\qquad
0<\sigma^2=\operatorname{Var}(X_i)<\infty
$$

とします。和 $S_n=X_1+\cdots+X_n$ は平均 $n\mu$、分散 $n\sigma^2$ を持つので、そのままでは中心もばらつきも $n$ とともに動きます。

極限の形を見るには、まず平均を引いて中心を0へ戻し、次に標準偏差 $\sigma\sqrt n$ で割って分散を1へ固定します。この正規化を毎回使うので、先に記号を定めます。

<a id="def-f0-00p6a-standardized-sum"></a>

<!-- formal-statement-start -->
> **定義（独立同分布標準化和）**  
> $X_1,X_2,\ldots$ が独立同分布で

$$
E[X_i]=\mu,
\qquad
0<\sigma^2=\operatorname{Var}(X_i)<\infty
$$

> を満たすとき、

$$
Z_n
:=
\frac{S_n-n\mu}{\sigma\sqrt n}
=
\frac1{\sqrt n}
\sum_{i=1}^n\frac{X_i-\mu}{\sigma}
$$

> を独立同分布標準化和と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p6a-standardized-sum -->
**定義の確認**

$X_i\sim\operatorname{Bernoulli}(p)$、$0<p<1$ とします。このとき

$$
\mu=p,
\qquad
\sigma^2=p(1-p),
$$

なので

$$
Z_n
=
\frac{S_n-np}{\sqrt{np(1-p)}}.
$$

$S_n\sim\operatorname{Bin}(n,p)$ ですから、これは二項分布の中心を $np$ から0へ移し、標準偏差 $\sqrt{np(1-p)}$ で割った量です。
<!-- definition-example-end -->

---

## 2. 独立同分布中心極限定理

標準化したことで、全ての $n$ で $E[Z_n]=0$、$\operatorname{Var}(Z_n)=1$ です。しかし平均と分散を揃えただけでは分布の形までは決まりません。

ここで P6 の特性関数を使います。独立性は和を積へ変え、有限二次モーメントは各因子の0近傍を二次式で近似させます。$n$ 個の因子を掛けると、その二次項だけが指数化されて標準正規分布の特性関数が現れます。

<a id="thm-iid-clt"></a>

<!-- formal-statement-start -->
> **定理（独立同分布・有限分散版の中心極限定理）**  
> $X_1,X_2,\ldots$ を独立同分布とし、

$$
E[X_1]=\mu,
\qquad
0<\sigma^2=\operatorname{Var}(X_1)<\infty
$$

> とする。このとき

$$
\boxed{
\frac{S_n-n\mu}{\sigma\sqrt n}
\xrightarrow{d}
N(0,1)
}.
$$

> 同値に、標本平均 $\overline X_n=S_n/n$ について

$$
\boxed{
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}
\xrightarrow{d}
N(0,1)
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

中心化・標準化した

$$
Y_i:=\frac{X_i-\mu}{\sigma}
$$

は独立同分布で $E[Y_i]=0$, $E[Y_i^2]=1$ です。$Y_1$ の特性関数を $\varphi$ とすると、証明は次の4段階です。

1. 独立性から $\varphi_{Z_n}(t)=\{\varphi(t/\sqrt n)\}^n$ とする。
2. P6 の二次展開を $u=t/\sqrt n$ に適用し、1因子を $1-t^2/(2n)+o(n^{-1})$ と書く。
3. $n$ 乗の極限を取り、$e^{-t^2/2}$ を得る。
4. 右辺が標準正規分布の特性関数なので [Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)を適用する。

<!-- proof-start -->
### 証明

まず

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

と置きます。線形性から

$$
E[Y_i]
=
\frac{E[X_i]-\mu}{\sigma}
=0,
$$

また

$$
E[Y_i^2]
=
\frac{E[(X_i-\mu)^2]}{\sigma^2}
=
\frac{\operatorname{Var}(X_i)}{\sigma^2}
=1.
$$

標準化和は

$$
Z_n
=
\frac1{\sqrt n}\sum_{i=1}^nY_i
$$

です。

#### Step 1：独立和を特性関数の積へ変える

$Y_1$ の特性関数を $\varphi$ とします。固定した $t\in\mathbb R$ に対して

$$
\begin{aligned}
\varphi_{Z_n}(t)
&=
E\left[
\exp\left(
\frac{it}{\sqrt n}\sum_{i=1}^nY_i
\right)
\right]\\
&=
E\left[
\prod_{i=1}^n
e^{itY_i/\sqrt n}
\right].
\end{aligned}
$$

$Y_1,\ldots,Y_n$ は独立なので、[特性関数の積の性質](../F0_00P6_特性関数_中心極限定理/index.md#prop-f0-00p6-basic-properties)を繰り返し適用して

$$
\varphi_{Z_n}(t)
=
\prod_{i=1}^n
E[e^{itY_i/\sqrt n}].
$$

さらに同分布性から各因子は同じなので

$$
\boxed{
\varphi_{Z_n}(t)
=
\left\{
\varphi\left(\frac t{\sqrt n}\right)
\right\}^n
}.
$$

#### Step 2：0近傍の二次展開を代入する

$E[Y_1]=0$, $E[Y_1^2]=1$ なので、[特性関数の二次展開](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-second-order-expansion)から $u\to0$ で

$$
\varphi(u)
=
1-\frac{u^2}{2}+o(u^2).
$$

ここで

$$
u=\frac t{\sqrt n}
$$

を代入します。固定した $t$ に対し $u\to0$ であり、

$$
u^2=\frac{t^2}{n}.
$$

従って

$$
\varphi\left(\frac t{\sqrt n}\right)
=
1-\frac{t^2}{2n}
+r_n,
\qquad
r_n=o\left(\frac1n\right).
$$

ここで $r_n$ は固定した $t$ に対する複素数値の剰余列です。

#### Step 3：$n$ 乗の極限を取る

$$
a_n
:=
-\frac{t^2}{2}
+
nr_n
$$

と置きます。$nr_n\to0$ なので

$$
a_n\to-\frac{t^2}{2}
$$

です。また

$$
\varphi\left(\frac t{\sqrt n}\right)
=
1+\frac{a_n}{n}.
$$

収束列 $(a_n)$ は有界なので、十分大きい $n$ では $|a_n/n|\le1/2$ です。$|w|\le1/2$ に対し、$1$ の近傍で $\log1=0$ となる複素対数の枝を取ると

$$
\log(1+w)-w
=
-w^2\int_0^1\frac{s}{1+sw}\,ds,
$$

したがって

$$
|\log(1+w)-w|
\le
|w|^2.
$$

ここへ $w=a_n/n$ を代入すると

$$
\left|
n\log\left(1+\frac{a_n}{n}\right)-a_n
\right|
\le
\frac{|a_n|^2}{n}
\to0.
$$

よって

$$
n\log\left(1+\frac{a_n}{n}\right)
\to
-\frac{t^2}{2}.
$$

指数関数へ戻して

$$
\boxed{
\varphi_{Z_n}(t)
\to
e^{-t^2/2}
}.
$$

#### Step 4：Lévy 連続性定理で分布へ戻す

P6 の [Gaussian Fourier 恒等式](../F0_00P6_特性関数_中心極限定理/index.md#lem-f0-00p6-gaussian-fourier)から、標準正規分布 $N(0,1)$ の特性関数は

$$
e^{-t^2/2}.
$$

従って [Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)を $Z_n$ と $N(0,1)$ に適用して

$$
Z_n\xrightarrow d N(0,1).
$$

これが主張です。
<!-- proof-end -->

---

## 5. なぜ正規分布なのか

この証明を見ると、正規分布が出る理由はかなり明確です。

中心化した分布の特性関数は0近傍で

$$
1-\frac{\sigma^2t^2}{2}+\text{高次項}
$$

という二次項を持ちます。

独立な和では特性関数が積になり、$1/\sqrt n$ の尺度で見ると高次項が消え、二次項だけが指数化されて

$$
e^{-\sigma^2t^2/2}
$$

が残ります。

つまり

$$
\boxed{
\text{独立な和}
+\text{有限分散}
+\sqrt n\text{尺度}
\Longrightarrow
\text{二次項だけが生き残る}
}
$$

ため正規分布になります。

---

## 6. 仮定はどこで働いたか

証明を分解すると、各仮定の役割が見えます。

- **独立性**：標準化和の特性関数を各項の特性関数の積へ分けるために使いました。
- **同分布性**：その積を同じ因子の $n$ 乗へまとめるために使いました。
- **有限平均**：中心化 $X_i-\mu$ を定義するために使いました。
- **有限で正の分散**：$\sigma\sqrt n$ で標準化し、二次展開の係数を $-1/2$ に固定するために使いました。

特に有限分散を外すと、P6 の二次展開をこの形では使えません。したがって「独立な変数をたくさん足せば常に正規分布になる」という読み方は誤りです。正規極限が出たのは、有限二次モーメントが0近傍の二次項を支配したからです。

---

## 7. 標本平均として読む

$S_n=n\overline X_n$ なので

$$
\frac{S_n-n\mu}{\sigma\sqrt n}
=
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}.
$$

従って中心極限定理は、標本平均の誤差が典型的には $1/\sqrt n$ の大きさであり、その倍率を固定すると標準正規分布へ近づくことを表します。

この形は後の統計理論で繰り返し使いますが、本章で必要なのは「どの統計量に使えるか」を覚えることではなく、**独立和の積表示と二次展開から $\sqrt n$ 尺度が出る計算を再現できること**です。

---

## 章末チェック

- 特性関数が常に存在する理由を説明できる。
- 独立な和で特性関数が積になることを示せる。
- 有限二次モーメントから0近傍の二次展開を説明できる。
- Lévy連続性定理の役割を説明できる。
- 特性関数を使って独立同分布中心極限定理を導ける。
- 正規分布が二次項の指数化として現れる理由を説明できる。
- 有限分散がない場合に正規極限が保証されないことを説明できる。

---

## 演習

### F0-00P6A-A01 独立和を積へ変える

- Level: A
- 目安時間: 12分

$X_1,\ldots,X_n$ は独立同分布で $E[X_i]=\mu$, $\operatorname{Var}(X_i)=\sigma^2>0$ とする。

$$
Z_n=\frac{S_n-n\mu}{\sigma\sqrt n},
\qquad
Y_i=\frac{X_i-\mu}{\sigma}
$$

とし、$Y_1$ の特性関数を $\varphi$ とする。$\varphi_{Z_n}(t)$ を $\varphi$ で表せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
Z_n=\frac1{\sqrt n}\sum_{i=1}^nY_i.
$$

従って

$$
e^{itZ_n}
=
\prod_{i=1}^n e^{itY_i/\sqrt n}.
$$

$Y_1,\ldots,Y_n$ は独立なので期待値は積へ分かれ、

$$
\begin{aligned}
\varphi_{Z_n}(t)
&=
\prod_{i=1}^nE[e^{itY_i/\sqrt n}]\\
&=
\prod_{i=1}^n
\varphi\left(\frac t{\sqrt n}\right).
\end{aligned}
$$

さらに同分布性から全因子が同じなので

$$
\boxed{
\varphi_{Z_n}(t)
=
\left\{
\varphi\left(\frac t{\sqrt n}\right)
\right\}^n
}.
$$
<!-- solution-end -->

### F0-00P6A-A02 標本平均の標準化

- Level: A
- 目安時間: 8分

$\overline X_n=S_n/n$ とする。次を示せ。

$$
\frac{S_n-n\mu}{\sigma\sqrt n}
=
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}.
$$

<!-- solution-start -->
#### 詳細解答

$S_n=n\overline X_n$ を左辺へ代入すると

$$
\begin{aligned}
\frac{S_n-n\mu}{\sigma\sqrt n}
&=
\frac{n\overline X_n-n\mu}{\sigma\sqrt n}\\
&=
\frac{n(\overline X_n-\mu)}{\sigma\sqrt n}\\
&=
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}.
\end{aligned}
$$

最後の等号では $n/\sqrt n=\sqrt n$ を使いました。
<!-- solution-end -->

### F0-00P6A-A03 二次展開へ $t/\sqrt n$ を代入する

- Level: A
- 目安時間: 10分

$$
\varphi(u)=1-\frac{u^2}{2}+o(u^2)
\qquad(u\to0)
$$

とする。固定した $t$ について

$$
\varphi\left(\frac t{\sqrt n}\right)
=
1-\frac{t^2}{2n}+o(n^{-1})
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

固定した $t$ に対して

$$
u_n:=\frac t{\sqrt n}\to0
$$

です。元の展開へ $u=u_n$ を代入すると

$$
\varphi(u_n)
=
1-\frac{u_n^2}{2}+o(u_n^2).
$$

ここで

$$
u_n^2=\frac{t^2}{n}.
$$

$t$ は固定されているので $o(t^2/n)=o(1/n)$ です。従って

$$
\boxed{
\varphi\left(\frac t{\sqrt n}\right)
=
1-\frac{t^2}{2n}+o(n^{-1})
}.
$$
<!-- solution-end -->

### F0-00P6A-A04 Lévy 連続性定理を適用する

- Level: A
- 目安時間: 10分

ある確率変数列 $Z_n$ について

$$
\varphi_{Z_n}(t)\to e^{-t^2/2}
\qquad(\forall t\in\mathbb R)
$$

が分かっている。$Z_n$ の極限分布を答え、使う定理を明記せよ。

<!-- solution-start -->
#### 詳細解答

P6 で示した標準正規分布の特性関数は

$$
\varphi_{N(0,1)}(t)=e^{-t^2/2}.
$$

従って特性関数の各点極限は、既知の確率変数 $Z\sim N(0,1)$ の特性関数です。[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)を適用して

$$
\boxed{
Z_n\xrightarrow d N(0,1)
}.
$$
<!-- solution-end -->

### F0-00P6A-B01 $n$ 乗極限を途中式から示す

- Level: B
- 目安時間: 18分

複素数列 $a_n\to a$ に対して

$$
\left(1+\frac{a_n}{n}\right)^n\to e^a
$$

を示し、$a_n\to-t^2/2$ とした場合の極限を求めよ。

<!-- solution-start -->
#### 詳細解答

$a_n\to a$ なので $(a_n)$ は有界です。従って十分大きい $n$ では $|a_n/n|\le1/2$ です。

$|w|\le1/2$ では、$1$ の近傍で $\log1=0$ となる複素対数の枝を用いて

$$
\log(1+w)-w
=
-w^2\int_0^1\frac{s}{1+sw}\,ds
$$

と書けるので

$$
|\log(1+w)-w|
\le |w|^2.
$$

$w=a_n/n$ とすると

$$
\left|
n\log\left(1+\frac{a_n}{n}\right)-a_n
\right|
\le
\frac{|a_n|^2}{n}
\to0.
$$

従って

$$
n\log\left(1+\frac{a_n}{n}\right)
\to a.
$$

指数関数の連続性から

$$
\left(1+\frac{a_n}{n}\right)^n
\to e^a.
$$

特に $a=-t^2/2$ なら

$$
\boxed{
\left(1+\frac{a_n}{n}\right)^n
\to e^{-t^2/2}
}.
$$
<!-- solution-end -->

### F0-00P6A-B02 Rademacher 和で中心極限定理を確認する

- Level: B
- 目安時間: 20分

$P(X_i=1)=P(X_i=-1)=1/2$ で、$X_i$ は独立同分布とする。

$$
Z_n=\frac1{\sqrt n}\sum_{i=1}^nX_i
$$

について、$\cos u=1-u^2/2+o(u^2)$ を使って $Z_n\Rightarrow N(0,1)$ を示せ。

<!-- solution-start -->
#### 詳細解答

1個の $X_i$ の特性関数は

$$
\varphi_X(u)
=
\frac12e^{iu}+\frac12e^{-iu}
=
\cos u.
$$

独立性から

$$
\varphi_{Z_n}(t)
=
\left\{
\cos\left(\frac t{\sqrt n}\right)
\right\}^n.
$$

$u=t/\sqrt n$ を展開へ代入すると

$$
\cos\left(\frac t{\sqrt n}\right)
=
1-\frac{t^2}{2n}+o(n^{-1}).
$$

B01 の $n$ 乗極限を使って

$$
\varphi_{Z_n}(t)
\to
e^{-t^2/2}.
$$

右辺は $N(0,1)$ の特性関数なので、[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)から

$$
\boxed{
Z_n\xrightarrow d N(0,1)
}.
$$
<!-- solution-end -->

### F0-00P6A-B03 Bernoulli 標本平均の正規極限

- Level: B
- 目安時間: 20分

$X_i\sim\operatorname{Bernoulli}(p)$、$0<p<1$ が独立同分布とする。標本平均 $\overline X_n$ について、中心極限定理を適用した分布収束を明示せよ。

<!-- solution-start -->
#### 詳細解答

Bernoulli$(p)$ では

$$
E[X_i]=p,
\qquad
\operatorname{Var}(X_i)=p(1-p).
$$

$p\in(0,1)$ なので分散は有限かつ正です。従って本章の中心極限定理を

$$
\mu=p,
\qquad
\sigma=\sqrt{p(1-p)}
$$

として適用できます。

標本平均形式を使うと

$$
\frac{\sqrt n(\overline X_n-p)}
{\sqrt{p(1-p)}}
\xrightarrow d N(0,1).
$$

この標準化された形がまず得られます。さらに $\sqrt n(\overline X_n-p)$ 自体の極限を確認するには、その特性関数を考えます。標準化量を

$$
Z_n
=
\frac{\sqrt n(\overline X_n-p)}{\sqrt{p(1-p)}}
$$

と置けば

$$
\sqrt n(\overline X_n-p)
=
\sqrt{p(1-p)}\,Z_n.
$$

従って P6 の [特性関数の基本性質](../F0_00P6_特性関数_中心極限定理/index.md#prop-f0-00p6-basic-properties)で $a=\sqrt{p(1-p)}$, $b=0$ と置くと

$$
\varphi_{\sqrt n(\overline X_n-p)}(t)
=
\varphi_{Z_n}\!\left(t\sqrt{p(1-p)}\right)
\to
\exp\left\{-\frac{p(1-p)t^2}{2}\right\}.
$$

右辺は $N(0,p(1-p))$ の特性関数なので、[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)から

$$
\boxed{
\sqrt n(\overline X_n-p)
\xrightarrow d
N(0,p(1-p))
}
$$

も従います。
<!-- solution-end -->

### F0-00P6A-C01 中心極限定理の証明を仮定から再構成する

- Level: C
- 目安時間: 35分

$X_1,X_2,\ldots$ が独立同分布で

$$
E[X_1]=\mu,
\qquad
0<\operatorname{Var}(X_1)=\sigma^2<\infty
$$

とする。次の順で中心極限定理を証明せよ。

1. $Y_i=(X_i-\mu)/\sigma$ の平均と二次モーメントを求める。
2. $Z_n=n^{-1/2}\sum_{i=1}^nY_i$ の特性関数を $Y_1$ の特性関数 $\varphi$ で表す。
3. P6 の二次展開を $t/\sqrt n$ へ適用する。
4. $n$ 乗の極限を求める。
5. [Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)で結論する。
6. 独立性・同分布性・有限分散をそれぞれどこで使ったか説明する。

<!-- solution-start -->
#### 詳細解答

**1. 中心化・標準化。**

$$
E[Y_i]
=
\frac{E[X_i]-\mu}{\sigma}
=0.
$$

また

$$
E[Y_i^2]
=
\frac{E[(X_i-\mu)^2]}{\sigma^2}
=
1.
$$

**2. 特性関数の積表示。**

$$
Z_n=\frac1{\sqrt n}\sum_{i=1}^nY_i.
$$

独立性から

$$
\varphi_{Z_n}(t)
=
\prod_{i=1}^n
E[e^{itY_i/\sqrt n}],
$$

同分布性から各因子が同じなので

$$
\varphi_{Z_n}(t)
=
\left\{
\varphi\left(\frac t{\sqrt n}\right)
\right\}^n.
$$

**3. 二次展開。**

$E[Y_1]=0$, $E[Y_1^2]=1$ なので

$$
\varphi(u)
=
1-\frac{u^2}{2}+o(u^2).
$$

$u=t/\sqrt n$ とすると

$$
\varphi\left(\frac t{\sqrt n}\right)
=
1-\frac{t^2}{2n}+o(n^{-1}).
$$

**4. $n$ 乗極限。**

$$
a_n
:=
-\frac{t^2}{2}
+n\,o(n^{-1})
$$

と置けば $a_n\to-t^2/2$ です。B01 で示した複素数列の $n$ 乗極限をこの $a_n$ に適用して

$$
\varphi_{Z_n}(t)
=
\left(1+\frac{a_n}{n}\right)^n
\to
e^{-t^2/2}.
$$

**5. 分布の同定。**

$e^{-t^2/2}$ は $N(0,1)$ の特性関数です。[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)から

$$
Z_n\xrightarrow dN(0,1).
$$

すなわち

$$
\boxed{
\frac{S_n-n\mu}{\sigma\sqrt n}
\xrightarrow dN(0,1)
}.
$$

**6. 仮定の役割。**

- 独立性：Step 2 で和の特性関数を積へ分解した。
- 同分布性：Step 2 で積を同じ因子の $n$ 乗へまとめた。
- 有限分散：Step 1 の標準化と Step 3 の二次展開を可能にした。
- 分散が正：$\sigma$ で割る標準化を可能にした。

従って、仮定は単なる飾りではなく、証明の異なる段階を支えています。
<!-- solution-end -->

---

## 次に進む

中心極限定理まで揃ったので、次は [F0-00P7](../F0_00P7_統計モデル_尤度_正則性/index.md) で、この極限定理を統計理論へ接続します。
