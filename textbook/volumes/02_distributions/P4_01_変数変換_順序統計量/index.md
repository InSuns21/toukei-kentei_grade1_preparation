# P4-01 変数変換・順序統計量

本章では、確率変数を別の量へ変換したときの分布と、標本を小さい順に並べたときの分布を扱います。

変数変換は、まず次の手順で処理します。

1. **変換後の値がどの範囲を取り得るか決める。**
2. **変換後の値から、元の値を求める。** 1つとは限らない。
3. **確率または確率密度関数を変換する。** 多変数ならヤコビアンを使う。
4. **最後に積分して1になるか確認する。**

特に $Y=X^2$ のような変換では、$y>0$ に対して元の $x$ は $x=\sqrt y$ と $x=-\sqrt y$ の2つです。この「元の値を全部拾う」という考え方が一変数変換の中心です。

本章は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md) に従います。演習は問題の直後に詳細解答・本番答案・採点基準を置きます。

## この章で解けるようになる問題

- $Y=g(X)$ の分布を、累積分布関数または確率密度関数の変換から求める。
- $g(x)=y$ を満たす元の $x$ が複数あるとき、全ての寄与を足す。
- 2変数の変換で、変換後の範囲とヤコビアンを正しく求める。
- 和・差・積・比の分布を求める。
- 最大値・最小値・第 $k$ 順序統計量の分布を求める。
- 標本範囲 $R=X_{(n)}-X_{(1)}$ の分布を求める。

## 前提知識

- F0-00: 逆関数、置換積分、2変数のヤコビアン。
- P2-01: 累積分布関数 $F_X(x)=P(X\le x)$ と確率密度関数。
- P1-02: 独立な確率変数の同時確率。
- P3-02: 一様・指数・正規・ガンマ・ベータ分布。
- P3-03: 同時確率密度関数と周辺化。

---

# 1. まず具体例で考える

## 1.1 平方変換 $Y=X^2$

$X\sim\operatorname{Unif}(-1,1)$ とします。確率密度関数は
$$
f_X(x)=\frac12\boldsymbol{1}_{(-1,1)}(x)
$$
です。

$Y=X^2$ なので $0\le Y\le1$ です。$0\le y<1$ では
$$
\begin{aligned}
F_Y(y)
&=P(Y\le y)\\
&=P(X^2\le y)\\
&=P(-\sqrt y\le X\le\sqrt y)\\
&=\sqrt y.
\end{aligned}
$$
したがって
$$
f_Y(y)=\frac{1}{2\sqrt y},\qquad0<y<1.
$$

ここで重要なのは、$y=x^2$ を解くと
$$
x=\sqrt y,\qquad x=-\sqrt y
$$
の2つが出ることです。確率密度関数の変換公式を使う場合も、この2つを両方足します。

## 1.2 極座標変換

2変数では、独立な標準正規確率変数 $X,Y$ を例にします。新しい変数 $R,\Theta$ を
$$
X=R\cos\Theta,\qquad Y=R\sin\Theta,
$$
$$
R>0,\qquad0\le\Theta<2\pi
$$
で定めます。

このとき
$$
\left|\det\frac{\partial(x,y)}{\partial(r,\theta)}\right|
=\left|\det
\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}\right|
=r.
$$

したがって
$$
f_{R,\Theta}(r,\theta)
=\frac1{2\pi}e^{-r^2/2}r,
\qquad r>0,\ 0\le\theta<2\pi.
$$


---

# 2. 一変数の変換

## 2.1 1対1に対応する場合

$Y=g(X)$ とし、変換後の値 $y$ から元の値が
$$
x=h(y)
$$
と一意に求まるとします。すると
$$
f_Y(y)=f_X\{h(y)\}\left|\frac{dh(y)}{dy}\right|
$$
です。

この式は暗記だけで済ませず、単調増加の場合なら
$$
F_Y(y)=P(Y\le y)
=P\{X\le h(y)\}
=F_X\{h(y)\}
$$
を微分すると得られる、と理解しておきます。

## 2.2 元の値が複数ある場合

$g(x)=y$ を満たす元の値を
$$
x_1(y),\ldots,x_m(y)
$$
とします。元の $X$ の取り得る範囲に入る解を全て使って
$$
f_Y(y)
=\sum_{j=1}^m
f_X\{x_j(y)\}
\left|\frac{dx_j(y)}{dy}\right|
$$
とします。

たとえば $Y=X^2$ なら、$y>0$ に対して $x=\pm\sqrt y$ の両方を使います。

---

# 3. 2変数の変換とヤコビアン

$(X,Y)$ から
$$
(U,V)=T(X,Y)
$$
を作るとします。まず $u,v$ から元の $x,y$ を
$$
x=x(u,v),\qquad y=y(u,v)
$$
と解きます。

次に、元の範囲を新しい変数の不等式へ直します。最後に
$$
J(u,v)
=\det\frac{\partial(x,y)}{\partial(u,v)}
$$
を計算し、
$$
f_{U,V}(u,v)
=f_{X,Y}\{x(u,v),y(u,v)\}|J(u,v)|
$$
を使います。

2変数変換では次の3点をセットで確認します。

1. 元の変数を新しい変数で表す式。
2. 新しい変数の取り得る範囲。
3. ヤコビアンの絶対値。

## 3.1 和・差・積・比

同時確率密度関数を $f_{X,Y}$ とします。

### 和 $S=X+Y$

補助変数として $V=X$ を取ると
$$
x=v,\qquad y=s-v
$$
で、ヤコビアンの絶対値は1です。したがって
$$
f_S(s)=\int_{-\infty}^{\infty}f_{X,Y}(v,s-v)\,dv.
$$

独立なら
$$
f_S(s)=\int_{-\infty}^{\infty}f_X(v)f_Y(s-v)\,dv.
$$

### 差 $D=X-Y$

$$
f_D(d)=\int_{-\infty}^{\infty}f_{X,Y}(v,v-d)\,dv.
$$

### 積 $P=XY$

補助変数として $V=X$ を取ると
$$
x=v,\qquad y=p/v,
$$
$$
\left|\frac{\partial(x,y)}{\partial(p,v)}\right|=\frac1{|v|}.
$$
したがって
$$
f_P(p)=\int_{v\ne0}f_{X,Y}\left(v,\frac pv\right)\frac{dv}{|v|}.
$$

### 比 $R=X/Y$

補助変数として $V=Y$ を取ると
$$
x=rv,\qquad y=v,
$$
$$
\left|\frac{\partial(x,y)}{\partial(r,v)}\right|=|v|.
$$
したがって
$$
f_R(r)=\int_{-\infty}^{\infty}|v|f_{X,Y}(rv,v)\,dv.
$$

積分範囲は、式を覚えるのではなく元の $X,Y$ の範囲から毎回決めます。

---

# 4. 順序統計量

独立同分布の連続確率変数
$$
X_1,\ldots,X_n
$$
を小さい順に並べ、
$$
X_{(1)}\le X_{(2)}\le\cdots\le X_{(n)}
$$
と書きます。

- $X_{(1)}$: 最小値
- $X_{(n)}$: 最大値
- $X_{(k)}$: 第 $k$ 順序統計量

共通の累積分布関数を
$$
F(x)=P(X_i\le x)
$$
とし、確率密度関数を $f(x)$ とします。

## 4.1 最大値

最大値 $M=X_{(n)}$ が $x$ 以下であることは、全ての標本が $x$ 以下であることと同値です。
$$
P(M\le x)=F(x)^n.
$$
微分して
$$
f_M(x)=nF(x)^{n-1}f(x).
$$

## 4.2 最小値

最小値 $L=X_{(1)}$ が $x$ より大きいことは、全ての標本が $x$ より大きいことと同値です。
$$
P(L>x)=\{1-F(x)\}^n.
$$
したがって
$$
f_L(x)=n\{1-F(x)\}^{n-1}f(x).
$$

## 4.3 第 $k$ 順序統計量

$X_{(k)}$ が $x$ のすぐ近くにあるには、典型的には

- $x$ 以下に $k-1$ 個、
- $x$ のすぐ右の短い区間に1個、
- それより右に $n-k$ 個

と並びます。

この並べ方は
$$
\frac{n!}{(k-1)!(n-k)!}
$$
通りです。短い区間 $(x,x+h]$ に1個入る確率は約 $f(x)h$ なので、
$$
P\{x<X_{(k)}\le x+h\}
\approx
\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}f(x)h\{1-F(x)\}^{n-k}.
$$

両辺を $h$ で割って $h\downarrow0$ とすると
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$

短い区間に2個以上入る確率は $h^2$ 程度なので、$h$ で割って極限を取ると消えます。

## 4.4 累積分布関数で一様分布へ直す

$F$ が連続で、考えている範囲で狭義単調増加とします。各標本について
$$
U_i=F(X_i)
$$
と置きます。$0<u<1$ で
$$
\begin{aligned}
P(U_i\le u)
&=P\{F(X_i)\le u\}\\
&=P\{X_i\le F^{-1}(u)\}\\
&=u
\end{aligned}
$$
なので
$$
U_i\sim\operatorname{Unif}(0,1).
$$

$F$ は単調増加なので、$X_1,\ldots,X_n$ を小さい順に並べてから $F$ を作用させても順序は変わりません。したがって
$$
U_{(k)}=F\{X_{(k)}\}.
$$

4.3 の第 $k$ 順序統計量の公式を一様分布 $F(u)=u$, $f(u)=1$ に適用すると
$$
f_{U_{(k)}}(u)
=\frac{n!}{(k-1)!(n-k)!}
u^{k-1}(1-u)^{n-k},
\qquad0<u<1.
$$
これはベータ分布の確率密度関数なので
$$
F\{X_{(k)}\}
\sim\operatorname{Beta}(k,n-k+1).
$$

## 4.5 最小値と最大値の同時密度

$U=X_{(1)}$, $V=X_{(n)}$ とします。$u<v$ のとき

- 最小値を取る標本を1個選ぶ。
- 最大値を取る標本を1個選ぶ。
- 残り $n-2$ 個を $(u,v)$ に入れる。

最小値と最大値を取る標本の選び方は $n(n-1)$ 通りなので
$$
f_{U,V}(u,v)
=n(n-1)\{F(v)-F(u)\}^{n-2}f(u)f(v),
\qquad u<v.
$$

---

# 5. 典型例

## 例1 平方変換

$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$ とします。

$0<y<1$ では元の $x$ は
$$
x=\sqrt y,\qquad x=-\sqrt y
$$
です。それぞれ
$$
\left|\frac{dx}{dy}\right|=\frac1{2\sqrt y}
$$
なので
$$
f_Y(y)
=\frac12\frac1{2\sqrt y}
+\frac12\frac1{2\sqrt y}
=\frac1{2\sqrt y},
\qquad0<y<1.
$$

片方だけ使うと積分が $1/2$ になってしまいます。

## 例2 独立な一様分布の和

独立な $X,Y\sim\operatorname{Unif}(0,1)$ とし、$S=X+Y$ とします。
$$
f_S(s)=\int f_X(x)f_Y(s-x)\,dx.
$$

$0<x<1$ と $0<s-x<1$ が同時に成り立つ $x$ の範囲を取ると
$$
f_S(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\le s<2,\\
0,&\text{otherwise}.
\end{cases}
$$

## 例3 極座標

独立な標準正規確率変数 $X,Y$ に対し
$$
X=R\cos\Theta,\qquad Y=R\sin\Theta,
$$
$$
R>0,\qquad0\le\Theta<2\pi
$$
とします。ヤコビアンの絶対値は $r$ なので
$$
f_{R,\Theta}(r,\theta)
=\frac1{2\pi}re^{-r^2/2}.
$$

右辺が
$$
\left(re^{-r^2/2}\right)\left(\frac1{2\pi}\right)
$$
と分かれるので、$R$ と $\Theta$ は独立です。

## 例4 一様標本の最大値

$X_1,\ldots,X_n$ を独立な $\operatorname{Unif}(0,\theta)$ とし、$M=\max_iX_i$ とします。$0<m<\theta$ では
$$
P(M\le m)
=P(X_1\le m,\ldots,X_n\le m)
=\left(\frac m\theta\right)^n.
$$
したがって
$$
f_M(m)=\frac{nm^{n-1}}{\theta^n},
\qquad0<m<\theta.
$$

---

# 6. 本番での解き方

## 一変数変換

1. $Y$ の取り得る範囲を書く。
2. $g(x)=y$ を解き、元の $X$ の範囲に入る解を全て書く。
3. 各解について $|dx/dy|$ を計算する。
4. 全て足す。
5. 積分して1になるか確認する。

## 2変数変換

1. $u,v$ から $x,y$ を解く。
2. 元の範囲を $u,v$ の不等式へ直す。
3. $|\partial(x,y)/\partial(u,v)|$ を計算する。
4. 同時確率密度関数へ代入する。
5. 不要な変数を積分して周辺化する。

## 順序統計量

- 最大値: 「全て $x$ 以下」。
- 最小値: 「全て $x$ より大きい」。
- 第 $k$ 順序統計量: 「左に $k-1$ 個、中央に1個、右に $n-k$ 個」。
- 最小値と最大値: 「端を取る標本を選び、残りを間に入れる」。

---

# 7. 演習


## Level A

### P4-A01 平方変換

- level: A
- minutes: 8
- topics: 一変数変換

連続確率変数 $X$ は一様分布 $\operatorname{Unif}(-1,1)$ に従い、
$$
f_X(x)=\frac12\boldsymbol{1}_{(-1,1)}(x)
$$
とする。新しい確率変数を
$$
Y=X^2
$$
と定める。$Y$ の取り得る範囲、累積分布関数
$$
F_Y(y)=P(Y\le y)
$$
および確率密度関数 $f_Y(y)$ を求めよ。

<!-- solution-start -->

#### 詳細解答

$Y=X^2$ なので $0\le Y\le1$ です。

$0\le y<1$ では
$$
\begin{aligned}
F_Y(y)
&=P(X^2\le y)\\
&=P(-\sqrt y\le X\le\sqrt y)\\
&=\int_{-\sqrt y}^{\sqrt y}\frac12\,dx
=\sqrt y.
\end{aligned}
$$
したがって
$$
F_Y(y)=
\begin{cases}
0,&y<0,\\
\sqrt y,&0\le y<1,\\
1,&y\ge1.
\end{cases}
$$

$0<y<1$ で微分すると
$$
f_Y(y)=\frac1{2\sqrt y}.
$$
よって
$$
f_Y(y)=\frac1{2\sqrt y}\boldsymbol{1}_{(0,1)}(y).
$$

#### 本番答案

$0\le Y\le1$。$0\le y<1$ で
$$
F_Y(y)=P(-\sqrt y\le X\le\sqrt y)=\sqrt y.
$$
したがって
$$
f_Y(y)=\frac1{2\sqrt y}\boldsymbol{1}_{(0,1)}(y).
$$

#### 採点基準

範囲4点、累積分布関数8点、確率密度関数8点。合計20点。

<!-- solution-end -->

### P4-A02 指数分布の尺度変換

- level: A
- minutes: 8
- topics: 一変数変換, 指数分布

$\lambda>0$ とする。連続確率変数 $X$ は指数分布に従い、
$$
f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x)
$$
とする。$Y=2X$ と定める。$Y$ の確率密度関数を求め、指数分布として母数を答えよ。

<!-- solution-start -->

#### 詳細解答

$Y=2X$ なので $y>0$ では
$$
x=\frac y2,
\qquad
\left|\frac{dx}{dy}\right|=\frac12.
$$
したがって
$$
\begin{aligned}
f_Y(y)
&=f_X(y/2)\frac12\\
&=\lambda e^{-\lambda y/2}\frac12\\
&=\frac\lambda2e^{-(\lambda/2)y},\qquad y>0.
\end{aligned}
$$
よって
$$
Y\sim\operatorname{Exp}(\lambda/2).
$$

#### 本番答案

$$
f_Y(y)=\frac\lambda2e^{-(\lambda/2)y}\boldsymbol{1}_{(0,\infty)}(y),
$$
したがって $Y\sim\operatorname{Exp}(\lambda/2)$。

#### 採点基準

元の値の表示5点、微分係数5点、確率密度関数6点、分布同定4点。合計20点。

<!-- solution-end -->

### P4-A03 一様標本の最大値

- level: A
- minutes: 8
- topics: 最大値

$X_1,\ldots,X_4$ は互いに独立で、それぞれ
$$
f_X(x)=\boldsymbol{1}_{(0,1)}(x)
$$
を確率密度関数にもつ一様分布 $\operatorname{Unif}(0,1)$ に従う。最大値を
$$
M=\max(X_1,\ldots,X_4)
$$
とする。$M$ の累積分布関数、確率密度関数、期待値を求めよ。

<!-- solution-start -->

#### 詳細解答

$0\le m\le1$ で
$$
\begin{aligned}
F_M(m)
&=P(M\le m)\\
&=P(X_1\le m,\ldots,X_4\le m)\\
&=m^4.
\end{aligned}
$$
したがって
$$
f_M(m)=4m^3,\qquad0<m<1.
$$

期待値は
$$
E[M]=\int_0^1m\cdot4m^3\,dm=\frac45.
$$

#### 本番答案

$$
F_M(m)=
\begin{cases}
0,&m<0,\\
m^4,&0\le m<1,\\
1,&m\ge1,
\end{cases}
$$
$$
f_M(m)=4m^3\boldsymbol{1}_{(0,1)}(m),
\qquad E[M]=\frac45.
$$

#### 採点基準

累積分布関数8点、確率密度関数5点、期待値7点。合計20点。

<!-- solution-end -->

### P4-A04 一様分布の第2順序統計量

- level: A
- minutes: 10
- topics: 順序統計量, ベータ分布

$X_1,\ldots,X_5$ は独立な $\operatorname{Unif}(0,1)$ に従い、確率密度関数は
$$
f_X(x)=\boldsymbol{1}_{(0,1)}(x)
$$
である。小さい順に並べた値を
$$
X_{(1)}\le\cdots\le X_{(5)}
$$
と書く。

第 $k$ 順序統計量の確率密度関数
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x)
$$
を用いてよい。

また、$Z\sim\operatorname{Beta}(a,b)$ の平均・分散は
$$
E[Z]=\frac{a}{a+b},
\qquad
\operatorname{Var}(Z)=\frac{ab}{(a+b)^2(a+b+1)}
$$
である。

$X_{(2)}$ の分布、平均、分散を求めよ。

<!-- solution-start -->

#### 詳細解答

一様分布では $0<x<1$ で
$$
F(x)=x,\qquad f(x)=1.
$$
$n=5,k=2$ を代入すると
$$
\begin{aligned}
f_{X_{(2)}}(x)
&=\frac{5!}{1!3!}x(1-x)^3\\
&=20x(1-x)^3.
\end{aligned}
$$
これは $\operatorname{Beta}(2,4)$ の確率密度関数です。

したがって
$$
E[X_{(2)}]=\frac{2}{6}=\frac13,
$$
$$
\operatorname{Var}(X_{(2)})
=\frac{2\cdot4}{6^2\cdot7}
=\frac2{63}.
$$

#### 本番答案

$$
X_{(2)}\sim\operatorname{Beta}(2,4),
\quad
E[X_{(2)}]=\frac13,
\quad
\operatorname{Var}(X_{(2)})=\frac2{63}.
$$

#### 採点基準

順序統計量の密度8点、分布同定4点、平均4点、分散4点。合計20点。

<!-- solution-end -->

## Level B

### P4-B01 一様分布の和

- level: B
- minutes: 15
- topics: 和, 畳込み

$X,Y$ は独立で、それぞれ一様分布 $\operatorname{Unif}(0,1)$ に従い、
$$
f_X(x)=f_Y(x)=\boldsymbol{1}_{(0,1)}(x)
$$
とする。和を
$$
S=X+Y
$$
とする。$S$ の確率密度関数と累積分布関数を求めよ。

<!-- solution-start -->

#### 詳細解答

独立性より
$$
f_S(s)=\int_{-\infty}^{\infty}f_X(x)f_Y(s-x)\,dx.
$$
被積分関数が1になるには
$$
0<x<1,
\qquad
0<s-x<1
$$
が必要です。したがって積分範囲は
$$
(0,1)\cap(s-1,s)
$$
です。

よって
$$
f_S(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\le s<2,\\
0,&\text{otherwise}.
\end{cases}
$$

積分すると
$$
F_S(s)=
\begin{cases}
0,&s\le0,\\
s^2/2,&0<s<1,\\
1-(2-s)^2/2,&1\le s<2,\\
1,&s\ge2.
\end{cases}
$$
です。

#### 本番答案

$$
f_S(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\le s<2,\\
0,&\text{otherwise},
\end{cases}
$$
$$
F_S(s)=
\begin{cases}
0,&s\le0,\\
s^2/2,&0<s<1,\\
1-(2-s)^2/2,&1\le s<2,\\
1,&s\ge2.
\end{cases}
$$

#### 採点基準

積分範囲8点、確率密度関数6点、累積分布関数6点。合計20点。

<!-- solution-end -->

### P4-B05 一様分布3個・4個の和

- level: B
- minutes: 15
- topics: 和, 畳込み, 区分的な確率密度関数

$X_1,X_2,X_3,X_4$ は互いに独立で、それぞれ一様分布 $\operatorname{Unif}(0,1)$ に従い、
$$
f_X(x)=\boldsymbol{1}_{(0,1)}(x)
$$
とする。$m=2,3,4$ に対して
$$
S_m=X_1+\cdots+X_m
$$
と置く。

$S_2=X_1+X_2$ の確率密度関数は
$$
f_{S_2}(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\le s<2,\\
0,&\text{otherwise}
\end{cases}
$$
であるとしてよい。

1. $m=3,4$ について $S_m$ と $m-S_m$ が同じ分布をもつことを示せ。
2. $S_3$ の確率密度関数を求めよ。
3. $S_4$ の確率密度関数を求めよ。

<!-- solution-start -->

#### 詳細解答

まず $1-X_i$ も $\operatorname{Unif}(0,1)$ に従い、互いに独立です。したがって
$$
m-S_m=(1-X_1)+\cdots+(1-X_m)
$$
は $S_m$ と同じ分布をもちます。よって
$$
f_{S_m}(s)=f_{S_m}(m-s)
$$
です。

$S_3=S_2+X_3$ なので、畳み込みから
$$
f_{S_3}(s)=\int_0^1 f_{S_2}(s-x)\,dx.
$$
$t=s-x$ と見れば、積分しているのは
$$
s-1<t<s
$$
の範囲にある $f_{S_2}(t)$ です。

$0<s<1$ では $0<t<s$ なので
$$
f_{S_3}(s)=\int_0^s t\,dt=\frac{s^2}{2}.
$$

$1\le s<2$ では区分点 $t=1$ をまたぐので
$$
\begin{aligned}
f_{S_3}(s)
&=\int_{s-1}^1 t\,dt+\int_1^s(2-t)\,dt\\
&=\frac{1-(s-1)^2}{2}
+\left(2s-\frac{s^2}{2}-\frac32\right)\\
&=-s^2+3s-\frac32.
\end{aligned}
$$

$2\le s<3$ では対称性から
$$
f_{S_3}(s)=f_{S_3}(3-s)=\frac{(3-s)^2}{2}.
$$
したがって
$$
f_{S_3}(s)=
\begin{cases}
\dfrac{s^2}{2},&0<s<1,\\
-s^2+3s-\dfrac32,&1\le s<2,\\
\dfrac{(3-s)^2}{2},&2\le s<3,\\
0,&\text{otherwise}.
\end{cases}
$$

次に $S_4=S_3+X_4$ なので
$$
f_{S_4}(s)=\int_0^1 f_{S_3}(s-x)\,dx.
$$
対称性
$$
f_{S_4}(s)=f_{S_4}(4-s)
$$
があるため、$0<s<2$ だけ計算すれば残りも得られます。

$0<s<1$ では
$$
f_{S_4}(s)
=\int_0^s\frac{t^2}{2}\,dt
=\frac{s^3}{6}.
$$

$1\le s<2$ では $t=1$ で分けて
$$
\begin{aligned}
f_{S_4}(s)
&=\int_{s-1}^1\frac{t^2}{2}\,dt
+\int_1^s\left(-t^2+3t-\frac32\right)dt\\
&=\frac{1-(s-1)^3}{6}
+\left[-\frac{t^3}{3}+\frac{3t^2}{2}-\frac{3t}{2}\right]_1^s\\
&=\frac{1-(s-1)^3}{6}
-\frac{s^3}{3}+\frac{3s^2}{2}-\frac{3s}{2}+\frac13\\
&=-\frac{s^3}{2}+2s^2-2s+\frac23.
\end{aligned}
$$

$2\le s<3$ は $4-s\in(1,2]$ なので
$$
f_{S_4}(s)
=-\frac{(4-s)^3}{2}
+2(4-s)^2-2(4-s)+\frac23.
$$

$3\le s<4$ は $4-s\in(0,1]$ なので
$$
f_{S_4}(s)=\frac{(4-s)^3}{6}.
$$

よって
$$
f_{S_4}(s)=
\begin{cases}
\dfrac{s^3}{6},&0<s<1,\\
-\dfrac{s^3}{2}+2s^2-2s+\dfrac23,&1\le s<2,\\
-\dfrac{(4-s)^3}{2}+2(4-s)^2-2(4-s)+\dfrac23,&2\le s<3,\\
\dfrac{(4-s)^3}{6},&3\le s<4,\\
0,&\text{otherwise}.
\end{cases}
$$

#### 本番答案

$1-X_i\sim\operatorname{Unif}(0,1)$ より $S_m\overset{d}=m-S_m$。

$$
f_{S_3}(s)=
\begin{cases}
s^2/2,&0<s<1,\\
-s^2+3s-3/2,&1\le s<2,\\
(3-s)^2/2,&2\le s<3,\\
0,&\text{otherwise}.
\end{cases}
$$

また $0<s<2$ だけ畳み込みを計算し、$f_{S_4}(s)=f_{S_4}(4-s)$ を使うと
$$
f_{S_4}(s)=
\begin{cases}
s^3/6,&0<s<1,\\
-s^3/2+2s^2-2s+2/3,&1\le s<2,\\
f_{S_4}(4-s),&2\le s<4,\\
0,&\text{otherwise}.
\end{cases}
$$

#### 採点基準

対称性4点、$S_3$ の畳み込みと区間分け7点、$S_3$ の密度3点、$S_4$ の畳み込みと区間分け4点、$S_4$ の密度2点。合計20点。

<!-- solution-end -->

### P4-B02 指数分布の比

- level: B
- minutes: 15
- topics: 比, ヤコビアン

$\lambda,\mu>0$ とする。$X,Y$ は独立で、
$$
f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x),
$$
$$
f_Y(y)=\mu e^{-\mu y}\boldsymbol{1}_{(0,\infty)}(y)
$$
とする。比を
$$
R=\frac XY
$$
とする。$R$ の取り得る範囲、確率密度関数、累積分布関数を求めよ。

<!-- solution-start -->

#### 詳細解答

補助変数として $V=Y$ を取ります。
$$
r=\frac xy,\qquad v=y
$$
なので
$$
x=rv,\qquad y=v.
$$
$x,y>0$ から
$$
r>0,\qquad v>0.
$$

ヤコビアンの絶対値は
$$
\left|\det
\begin{pmatrix}
v&r\\
0&1
\end{pmatrix}\right|=v.
$$
したがって
$$
f_{R,V}(r,v)
=\lambda\mu v e^{-(\lambda r+\mu)v},
\qquad r,v>0.
$$

$v$ を積分して
$$
\begin{aligned}
f_R(r)
&=\lambda\mu\int_0^\infty ve^{-(\lambda r+\mu)v}\,dv\\
&=\frac{\lambda\mu}{(\lambda r+\mu)^2},
\qquad r>0.
\end{aligned}
$$

また
$$
\begin{aligned}
F_R(r)
&=P(X\le rY)\\
&=\int_0^\infty P(X\le ry)\mu e^{-\mu y}\,dy\\
&=\int_0^\infty(1-e^{-\lambda ry})\mu e^{-\mu y}\,dy\\
&=\frac{\lambda r}{\mu+\lambda r},
\qquad r>0.
\end{aligned}
$$

$r\le0$ では $F_R(r)=0$、$f_R(r)=0$ です。

#### 本番答案

$r>0$ で
$$
f_R(r)=\frac{\lambda\mu}{(\lambda r+\mu)^2},
\qquad
F_R(r)=\frac{\lambda r}{\mu+\lambda r}.
$$
$r\le0$ では0。

#### 採点基準

変換と範囲5点、ヤコビアン4点、確率密度関数6点、累積分布関数5点。合計20点。

<!-- solution-end -->

### P4-B03 標準正規分布と極座標

- level: B
- minutes: 15
- topics: 2変数変換, ヤコビアン

$X,Y$ は独立な標準正規確率変数で、
$$
f_X(x)=f_Y(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},
\qquad x\in\mathbb R
$$
とする。

新しい変数 $R,\Theta$ を
$$
X=R\cos\Theta,
\qquad
Y=R\sin\Theta,
$$
$$
R>0,
\qquad
0\le\Theta<2\pi
$$
で定める。

1. $(R,\Theta)$ の同時確率密度関数を求めよ。
2. $R$ と $\Theta$ の各周辺確率密度関数を求めよ。
3. $R$ と $\Theta$ が独立であることを示せ。
4. $T=R^2$ の確率密度関数を求め、自由度2のカイ二乗分布
$$
f_{\chi^2_2}(t)=\frac12e^{-t/2}\boldsymbol{1}_{(0,\infty)}(t)
$$
と一致することを確認せよ。

<!-- solution-start -->

#### 詳細解答

元の変数は
$$
x=r\cos\theta,\qquad y=r\sin\theta
$$
です。ヤコビアンの絶対値は
$$
\left|\det
\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}\right|
=r.
$$

独立性より
$$
f_{X,Y}(x,y)=\frac1{2\pi}e^{-(x^2+y^2)/2}.
$$
$x^2+y^2=r^2$ なので
$$
f_{R,\Theta}(r,\theta)
=\frac1{2\pi}re^{-r^2/2},
$$
$$
r>0,\qquad0\le\theta<2\pi.
$$

周辺化すると
$$
f_R(r)=re^{-r^2/2}\boldsymbol{1}_{(0,\infty)}(r),
$$
$$
f_\Theta(\theta)=\frac1{2\pi}\boldsymbol{1}_{[0,2\pi)}(\theta).
$$
同時密度がこの2つの積に分かれるので独立です。

$T=R^2$ とすると
$$
r=\sqrt t,
\qquad
\frac{dr}{dt}=\frac1{2\sqrt t}.
$$
よって
$$
f_T(t)
=f_R(\sqrt t)\frac1{2\sqrt t}
=\frac12e^{-t/2},
\qquad t>0.
$$

#### 本番答案

$$
f_{R,\Theta}(r,\theta)
=\frac1{2\pi}re^{-r^2/2}
\quad(r>0,0\le\theta<2\pi).
$$
$$
f_R(r)=re^{-r^2/2},
\qquad
f_\Theta(\theta)=\frac1{2\pi}.
$$
積に分かれるので独立。さらに $T=R^2$ は
$$
f_T(t)=\frac12e^{-t/2}\boldsymbol{1}_{(0,\infty)}(t),
$$
したがって $T\sim\chi^2_2$。

#### 採点基準

ヤコビアン4点、同時密度5点、周辺密度5点、独立性2点、$R^2$ の変換4点。合計20点。

<!-- solution-end -->

### P4-B04 最小値と最大値

- level: B
- minutes: 15
- topics: 最小値, 最大値

$X_1,X_2,X_3$ は独立な $\operatorname{Unif}(0,1)$ に従い、
$$
f_X(x)=\boldsymbol{1}_{(0,1)}(x)
$$
とする。小さい順に並べた値を
$$
X_{(1)}\le X_{(2)}\le X_{(3)}
$$
と書き、
$$
U=X_{(1)},\qquad V=X_{(3)}
$$
とする。

最小値と最大値の同時確率密度関数
$$
f_{U,V}(u,v)
=n(n-1)\{F(v)-F(u)\}^{n-2}f(u)f(v),
\qquad u<v
$$
を用いてよい。

1. $(U,V)$ の同時確率密度関数を求めよ。
2. $P(U>0.2,V<0.8)$ を求めよ。

<!-- solution-start -->

#### 詳細解答

$n=3$, $F(x)=x$, $f(x)=1$ を代入すると
$$
f_{U,V}(u,v)=6(v-u),
\qquad0<u<v<1.
$$

$U>0.2$ かつ $V<0.8$ は、3つの標本全てが $(0.2,0.8)$ に入ることと同値です。したがって
$$
P(U>0.2,V<0.8)=0.6^3=0.216.
$$

#### 本番答案

$$
f_{U,V}(u,v)=6(v-u)\boldsymbol{1}_{\{0<u<v<1\}}.
$$
また
$$
P(U>0.2,V<0.8)=0.6^3=0.216.
$$

#### 採点基準

同時密度12点、事象の言い換え4点、確率4点。合計20点。

<!-- solution-end -->

## Level C

### P4-C01 標準正規変数の平方

- level: C
- minutes: 25
- topics: 非単調変換, カイ二乗分布

$X$ は標準正規分布に従い、
$$
f_X(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},
\qquad x\in\mathbb R
$$
とする。$Y=X^2$ と定める。

ガンマ分布は本教材では形状 $a>0$、率 $b>0$ を用い、
$$
f(y)=\frac{b^a}{\Gamma(a)}y^{a-1}e^{-by}\boldsymbol{1}_{(0,\infty)}(y)
$$
とする。また
$$
E[Y]=\frac ab,
\qquad
\operatorname{Var}(Y)=\frac a{b^2}
$$
を用いてよい。

モーメント母関数は
$$
M_Y(t)=E[e^{tY}]
$$
と定義する。

1. $Y$ の取り得る範囲を求め、$y>0$ に対して $x^2=y$ を満たす元の $x$ を全て書け。
2. $Y$ の確率密度関数を求めよ。
3. ガンマ分布として形状・率を答え、自由度1のカイ二乗分布と同定せよ。
4. $E[Y]$, $\operatorname{Var}(Y)$ を求めよ。
5. 定義から $M_Y(t)$ を積分で導き、有限となる $t$ の範囲を求めよ。

<!-- solution-start -->

#### 詳細解答

$Y=X^2$ なので $Y\ge0$ です。$y>0$ では
$$
x=\sqrt y,\qquad x=-\sqrt y.
$$
両方について
$$
\left|\frac{dx}{dy}\right|=\frac1{2\sqrt y}.
$$
したがって
$$
\begin{aligned}
f_Y(y)
&=\frac1{\sqrt{2\pi}}e^{-y/2}\frac1{2\sqrt y}
+\frac1{\sqrt{2\pi}}e^{-y/2}\frac1{2\sqrt y}\\
&=\frac{e^{-y/2}}{\sqrt{2\pi y}},
\qquad y>0.
\end{aligned}
$$

ガンマ分布の密度と比較すると
$$
a=\frac12,\qquad b=\frac12.
$$
よって
$$
Y\sim\operatorname{Gamma}\left(\frac12,\frac12\right)=\chi_1^2.
$$
平均と分散は
$$
E[Y]=1,\qquad\operatorname{Var}(Y)=2.
$$

モーメント母関数は
$$
\begin{aligned}
M_Y(t)
&=\int_0^\infty e^{ty}\frac{e^{-y/2}}{\sqrt{2\pi y}}\,dy\\
&=\frac1{\sqrt{2\pi}}\int_0^\infty y^{-1/2}e^{-(1/2-t)y}\,dy.
\end{aligned}
$$
$t<1/2$ ならガンマ積分を使えて
$$
M_Y(t)=(1-2t)^{-1/2}.
$$
$t=1/2$ では $y^{-1/2}$ の無限区間積分となって発散し、$t>1/2$ では指数部分が増加するので発散します。

したがって
$$
M_Y(t)=(1-2t)^{-1/2},\qquad t<\frac12.
$$

#### 本番答案

$Y\ge0$。$y>0$ では $x=\pm\sqrt y$ の両方を使い
$$
f_Y(y)=\frac{e^{-y/2}}{\sqrt{2\pi y}},
\qquad y>0.
$$
よって
$$
Y\sim\operatorname{Gamma}(1/2,1/2)=\chi_1^2,
$$
$$
E[Y]=1,\qquad\operatorname{Var}(Y)=2.
$$
さらに
$$
M_Y(t)
=\frac1{\sqrt{2\pi}}\int_0^\infty y^{-1/2}e^{-(1/2-t)y}\,dy
=(1-2t)^{-1/2},
$$
有限範囲は $t<1/2$。

#### 採点基準

範囲・元の値4点、確率密度関数5点、分布同定4点、平均分散3点、モーメント母関数4点。合計20点。

<!-- solution-end -->

### P4-C02 指数変数の和と比率

- level: C
- minutes: 28
- topics: 2変数変換, 和, 比

$\lambda>0$ とする。$X,Y$ は独立で、共に指数分布
$$
f(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x)
$$
に従う。

新しい確率変数を
$$
S=X+Y,
\qquad
U=\frac{X}{X+Y}
$$
と定める。

ガンマ分布 $\operatorname{Gamma}(a,b)$ は形状 $a$、率 $b$ とし、
$$
f(s)=\frac{b^a}{\Gamma(a)}s^{a-1}e^{-bs}\boldsymbol{1}_{(0,\infty)}(s)
$$
とする。一様分布 $\operatorname{Unif}(0,1)$ の確率密度関数は $0<u<1$ で1である。

1. $s,u$ から元の $x,y$ を求めよ。
2. $S,U$ の取り得る範囲を求めよ。
3. $|\partial(x,y)/\partial(s,u)|$ を求めよ。
4. $(S,U)$ の同時確率密度関数と各周辺分布を求めよ。
5. $S,U$ が独立であることを示せ。

<!-- solution-start -->

#### 詳細解答

$$
x+y=s,
\qquad
u=\frac{x}{x+y}
$$
より
$$
x=su,\qquad y=s(1-u).
$$
$x,y>0$ なので
$$
s>0,\qquad0<u<1.
$$

ヤコビアンは
$$
\det
\begin{pmatrix}
u&s\\
1-u&-s
\end{pmatrix}
=-s,
$$
したがって絶対値は $s$ です。

独立性より
$$
\begin{aligned}
f_{S,U}(s,u)
&=\lambda e^{-\lambda su}
\lambda e^{-\lambda s(1-u)}s\\
&=\lambda^2se^{-\lambda s},
\end{aligned}
$$
$$
s>0,\qquad0<u<1.
$$

これは
$$
\left\{\lambda^2se^{-\lambda s}\boldsymbol{1}_{(0,\infty)}(s)\right\}
\left\{\boldsymbol{1}_{(0,1)}(u)\right\}
$$
と分かれます。

したがって
$$
S\sim\operatorname{Gamma}(2,\lambda),
\qquad
U\sim\operatorname{Unif}(0,1),
$$
かつ $S,U$ は独立です。

#### 本番答案

$$
x=su,\qquad y=s(1-u),\qquad s>0,\ 0<u<1.
$$
ヤコビアンの絶対値は $s$。よって
$$
f_{S,U}(s,u)=\lambda^2se^{-\lambda s}
\boldsymbol{1}_{(0,\infty)}(s)
\boldsymbol{1}_{(0,1)}(u).
$$
したがって
$$
S\sim\operatorname{Gamma}(2,\lambda),
\quad
U\sim\operatorname{Unif}(0,1),
$$
かつ独立。

#### 採点基準

元の変数4点、範囲4点、ヤコビアン4点、同時密度4点、周辺分布・独立4点。合計20点。

<!-- solution-end -->

### P4-C03 第 $k$ 順序統計量

- level: C
- minutes: 27
- topics: 順序統計量, ベータ分布

$X_1,\ldots,X_n$ は独立同分布の連続確率変数とする。共通の累積分布関数と確率密度関数を
$$
F(x)=P(X_i\le x),
\qquad
f(x)=F'(x)
$$
とし、ここでは $F$ は連続微分可能とする。

小さい順に並べた値を
$$
X_{(1)}\le\cdots\le X_{(n)}
$$
と書く。$1\le k\le n$ とする。

ベータ関数
$$
B(a,b)=\int_0^1u^{a-1}(1-u)^{b-1}\,du
=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$
を用いてよい。また $Z\sim\operatorname{Beta}(a,b)$ の平均・分散は
$$
E[Z]=\frac{a}{a+b},
\qquad
\operatorname{Var}(Z)=\frac{ab}{(a+b)^2(a+b+1)}
$$
である。

1. $h>0$ が小さいとき、$X_{(k)}\in(x,x+h]$ となる主要な標本配置を説明せよ。
2. $X_{(k)}$ の確率密度関数を導け。
3. その密度を積分して1になることをベータ積分で確認せよ。
4. $F\{X_{(k)}\}$ の分布を求めよ。
5. $n=5,k=3$ かつ $X_i\sim\operatorname{Unif}(0,1)$ のとき、$X_{(3)}$ の平均と分散を求めよ。

<!-- solution-start -->

#### 詳細解答

$X_{(k)}$ が $(x,x+h]$ に入る主要な配置は

- $x$ 以下に $k-1$ 個、
- $(x,x+h]$ に1個、
- $x+h$ より大きい側に $n-k$ 個

です。配置数は
$$
\frac{n!}{(k-1)!(n-k)!}.
$$

$h$ が小さいと
$$
P(x<X_i\le x+h)=F(x+h)-F(x)\approx f(x)h.
$$
したがって
$$
P\{x<X_{(k)}\le x+h\}
\approx
\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}f(x)h\{1-F(x)\}^{n-k}.
$$
$h$ で割って極限を取ると
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$

正規化は $u=F(x)$, $du=f(x)dx$ と置いて
$$
\begin{aligned}
\int f_{X_{(k)}}(x)\,dx
&=\frac{n!}{(k-1)!(n-k)!}
\int_0^1u^{k-1}(1-u)^{n-k}\,du\\
&=\frac{n!}{(k-1)!(n-k)!}B(k,n-k+1)\\
&=1.
\end{aligned}
$$

また
$$
F\{X_{(k)}\}\sim\operatorname{Beta}(k,n-k+1).
$$

$n=5,k=3$ の一様標本では
$$
X_{(3)}\sim\operatorname{Beta}(3,3),
$$
したがって
$$
E[X_{(3)}]=\frac12,
\qquad
\operatorname{Var}(X_{(3)})=\frac1{28}.
$$

#### 本番答案

左に $k-1$ 個、短い区間に1個、右に $n-k$ 個を置くので
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$
$u=F(x)$ と置くとベータ積分で正規化される。また
$$
F\{X_{(k)}\}\sim\operatorname{Beta}(k,n-k+1).
$$
$n=5,k=3$ の一様標本では平均 $1/2$、分散 $1/28$。

#### 採点基準

配置4点、密度6点、正規化4点、ベータ分布3点、数値3点。合計20点。

<!-- solution-end -->

### P4-C04 指数標本の最小値と最大値

- level: C
- minutes: 25
- topics: 最小値, 最大値, 指数分布

$\lambda>0$ とする。$X_1,\ldots,X_n$ は独立で、共に
$$
f_X(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x)
$$
に従う。小さい順に並べた値を $X_{(1)},\ldots,X_{(n)}$ とし、
$$
U=X_{(1)},
\qquad
V=X_{(n)}
$$
とする。

指数分布では
$$
P(X_i>x)=e^{-\lambda x},
\qquad x\ge0
$$
を用いてよい。

1. $U$ の生存関数 $P(U>u)$ と分布を求めよ。
2. $E[U]$ を求めよ。
3. $V$ の累積分布関数と確率密度関数を求めよ。
4. $0\le a<b$ に対し $P(U>a,V\le b)$ を求めよ。
5. $n\ge2$ のとき $U,V$ が独立でないことを示せ。

<!-- solution-start -->

#### 詳細解答

$u\ge0$ で
$$
\begin{aligned}
P(U>u)
&=P(X_1>u,\ldots,X_n>u)\\
&=\{e^{-\lambda u}\}^n\\
&=e^{-n\lambda u}.
\end{aligned}
$$
したがって
$$
U\sim\operatorname{Exp}(n\lambda),
\qquad
E[U]=\frac1{n\lambda}.
$$

$v\ge0$ では
$$
\begin{aligned}
F_V(v)
&=P(X_1\le v,\ldots,X_n\le v)\\
&=\{1-e^{-\lambda v}\}^n.
\end{aligned}
$$
微分して
$$
f_V(v)
=n\lambda e^{-\lambda v}\{1-e^{-\lambda v}\}^{n-1}.
$$

$U>a$ かつ $V\le b$ は全標本が $(a,b]$ に入ることなので
$$
P(U>a,V\le b)
=\{e^{-\lambda a}-e^{-\lambda b}\}^n.
$$

もし独立なら
$$
P(U>a,V\le b)
=P(U>a)P(V\le b)
=e^{-n\lambda a}\{1-e^{-\lambda b}\}^n
$$
となるはずですが、一般には一致しません。したがって独立ではありません。

#### 本番答案

$$
P(U>u)=e^{-n\lambda u}
$$
より
$$
U\sim\operatorname{Exp}(n\lambda),
\qquad E[U]=\frac1{n\lambda}.
$$
また
$$
F_V(v)=(1-e^{-\lambda v})^n,
$$
$$
f_V(v)=n\lambda e^{-\lambda v}(1-e^{-\lambda v})^{n-1}.
$$
さらに
$$
P(U>a,V\le b)
=(e^{-\lambda a}-e^{-\lambda b})^n,
$$
周辺確率の積とは一般に異なるので非独立。

#### 採点基準

最小値5点、期待値2点、最大値5点、同時事象4点、非独立4点。合計20点。

<!-- solution-end -->

### P4-C05 差・積・比

- level: C
- minutes: 28
- topics: 差, 積, 比

$X,Y$ は独立な $\operatorname{Unif}(0,1)$ に従い、
$$
f_X(x)=f_Y(x)=\boldsymbol{1}_{(0,1)}(x)
$$
とする。新しい確率変数を
$$
D=X-Y,
\qquad
P=XY,
\qquad
R=\frac XY
$$
と定める。

1. $D$ の取り得る範囲と確率密度関数を求めよ。
2. $P$ の取り得る範囲と確率密度関数を求めよ。
3. $R$ の取り得る範囲と確率密度関数を求めよ。
4. 3つの確率密度関数をそれぞれ積分し、1になることを確認せよ。
5. $P(X<Y)$ を $R$ の分布から求めよ。

<!-- solution-start -->

#### 詳細解答

差について
$$
f_D(d)=\int f_X(x)f_Y(x-d)\,dx.
$$
$0<x<1$ と $0<x-d<1$ を同時に満たす区間の長さを取るので
$$
f_D(d)=(1-|d|)\boldsymbol{1}_{(-1,1)}(d).
$$

積について、$p=xy$ とし補助変数を $x$ とすると $y=p/x$ です。$0<x<1$, $0<p/x<1$ から
$$
0<p<1,\qquad p<x<1.
$$
ヤコビアンの絶対値は $1/x$ なので
$$
f_P(p)=\int_p^1\frac{dx}{x}=-\log p,
\qquad0<p<1.
$$

比について、$r=x/y$ とし補助変数を $y$ とすると $x=ry$ です。ヤコビアンの絶対値は $y$。$0<y<1$ と $0<ry<1$ から
$$
0<y<\min(1,1/r),
\qquad r>0.
$$
したがって
$$
f_R(r)
=\int_0^{\min(1,1/r)}y\,dy
=
\begin{cases}
1/2,&0<r\le1,\\
1/(2r^2),&r>1,\\
0,&r\le0.
\end{cases}
$$

正規化は
$$
\int_{-1}^1(1-|d|)\,dd=1,
$$
$$
\int_0^1-\log p\,dp=1,
$$
$$
\int_0^1\frac12\,dr+\int_1^\infty\frac1{2r^2}\,dr=1.
$$

$X<Y$ は $R<1$ と同値なので
$$
P(X<Y)=\int_0^1\frac12\,dr=\frac12.
$$

#### 本番答案

$$
f_D(d)=(1-|d|)\boldsymbol{1}_{(-1,1)}(d),
$$
$$
f_P(p)=-\log p\,\boldsymbol{1}_{(0,1)}(p),
$$
$$
f_R(r)=
\begin{cases}
1/2,&0<r\le1,\\
1/(2r^2),&r>1,\\
0,&r\le0.
\end{cases}
$$
各積分は1であり、$P(X<Y)=P(R<1)=1/2$。

#### 採点基準

差4点、積5点、比6点、正規化3点、確率2点。合計20点。

<!-- solution-end -->

## Level D

### P4-D01 二つの順序統計量

- level: D
- minutes: 40
- topics: 順序統計量, 同時確率密度関数

$X_1,\ldots,X_n$ は独立同分布の連続確率変数とする。共通の累積分布関数と確率密度関数を
$$
F(x)=P(X_i\le x),
\qquad
f(x)=F'(x)
$$
とし、ここでは $F$ は連続微分可能とする。

小さい順に並べた値を
$$
X_{(1)}\le\cdots\le X_{(n)}
$$
とする。$1\le i<j\le n$ とする。

1. $x<y$ とする。$X_{(i)}$ が $x$ のすぐ右、$X_{(j)}$ が $y$ のすぐ右に入るとき、標本が5つの区間にそれぞれ何個入るかを書け。
2. その配置数を求めよ。
3. $(X_{(i)},X_{(j)})$ の同時確率密度関数を導け。
4. $i=1,j=n$ として最小値・最大値の同時密度を求めよ。
5. 得られた密度が全確率を表している理由を、標本配置の数え上げと結び付けて説明せよ。

<!-- solution-start -->

#### 詳細解答

$x<y$ とし、$x$ と $y$ のすぐ右に短い区間を取ります。主要な配置は

- $x$ 以下に $i-1$ 個、
- $x$ のすぐ右に1個、
- $x$ と $y$ の間に $j-i-1$ 個、
- $y$ のすぐ右に1個、
- $y$ より大きい側に $n-j$ 個

です。

配置数は
$$
\frac{n!}{(i-1)!(j-i-1)!(n-j)!}.
$$

短い区間の幅をそれぞれ $h,\ell$ とすると、その2区間に1個ずつ入る確率はそれぞれ約 $f(x)h$, $f(y)\ell$ です。したがって
$$
\begin{aligned}
& P\{x<X_{(i)}\le x+h,\ y<X_{(j)}\le y+\ell\}\\
&\quad\approx
\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
F(x)^{i-1}f(x)h\\
&\qquad\times\{F(y)-F(x)\}^{j-i-1}f(y)\ell
\{1-F(y)\}^{n-j}.
\end{aligned}
$$

$h\ell$ で割って極限を取ると
$$
\begin{aligned}
f_{X_{(i)},X_{(j)}}(x,y)
&=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
F(x)^{i-1}f(x)\\
&\quad\times\{F(y)-F(x)\}^{j-i-1}f(y)
\{1-F(y)\}^{n-j},
\qquad x<y.
\end{aligned}
$$

$i=1,j=n$ とすると
$$
f_{X_{(1)},X_{(n)}}(x,y)
=n(n-1)\{F(y)-F(x)\}^{n-2}f(x)f(y),
\qquad x<y.
$$

係数は、各標本を「左・$x$ 付近・中央・$y$ 付近・右」のどこへ入れるかを数えたものです。取り得る全ての配置を足せば標本全体の確率1を分割しているため、得られた同時密度も全領域で積分すると1になります。

#### 本番答案

配置は
$$
(i-1),\ 1,\ (j-i-1),\ 1,\ (n-j)
$$
個。よって
$$
\begin{aligned}
f_{X_{(i)},X_{(j)}}(x,y)
&=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
F(x)^{i-1}f(x)\\
&\quad\times\{F(y)-F(x)\}^{j-i-1}f(y)
\{1-F(y)\}^{n-j},
\quad x<y.
\end{aligned}
$$
$i=1,j=n$ で
$$
f_{X_{(1)},X_{(n)}}(x,y)
=n(n-1)\{F(y)-F(x)\}^{n-2}f(x)f(y).
$$
係数は標本配置の全場合を数えたものなので、全領域で積分すると1になる。

#### 採点基準

配置4点、係数4点、同時密度7点、最小最大3点、正規化の説明2点。合計20点。

<!-- solution-end -->

---

# 8. 30分ドリル

## P4-DRILL-01 一様標本の最大値・最小値・標本範囲

- level: C
- minutes: 30
- total: 100点

$\theta>0$、$n\ge2$ とする。$X_1,\ldots,X_n$ は互いに独立で、同じ一様分布 $\operatorname{Unif}(0,\theta)$ に従い、
$$
f_\theta(x)=\frac1\theta\boldsymbol{1}_{(0,\theta)}(x)
$$
とする。

小さい順に並べた値を $X_{(1)},\ldots,X_{(n)}$ とし、
$$
U=X_{(1)}=\min_iX_i,
\qquad
V=X_{(n)}=\max_iX_i,
$$
$$
R=V-U
$$
とする。

条件付き確率密度関数は、$f_V(v)>0$ の範囲で
$$
f_{U\mid V}(u\mid v)=\frac{f_{U,V}(u,v)}{f_V(v)}
$$
とする。

また $Z\sim\operatorname{Beta}(a,b)$ の平均・分散
$$
E[Z]=\frac{a}{a+b},
\qquad
\operatorname{Var}(Z)=\frac{ab}{(a+b)^2(a+b+1)}
$$
を用いてよい。

1. $V$ の累積分布関数、確率密度関数、期待値を求めよ。（20点）
2. $(U,V)$ の同時確率密度関数と、$0<u<v<\theta$ における $f_{U\mid V}(u\mid v)$ を求めよ。（25点）
3. $E[U\mid V=v]$ を求めよ。（10点）
4. $R$ の確率密度関数、期待値、分散を求めよ。（25点）
5. 
$$
T_1=\frac{n+1}{n}V,
\qquad
T_2=\frac{n+1}{n-1}R
$$
がともに $\theta$ の不偏推定量であることを示し、分散を比較せよ。（20点）

<!-- solution-start -->

### 詳細解答

$0\le v\le\theta$ で
$$
F_V(v)
=P(X_1\le v,\ldots,X_n\le v)
=\left(\frac v\theta\right)^n.
$$
したがって
$$
f_V(v)=\frac{nv^{n-1}}{\theta^n},
\qquad0<v<\theta.
$$
期待値は
$$
E[V]
=\int_0^\theta v\frac{nv^{n-1}}{\theta^n}\,dv
=\frac{n\theta}{n+1}.
$$

$0<u<v<\theta$ で、最小値を取る標本と最大値を取る標本を順に選ぶ方法は $n(n-1)$ 通りです。残り $n-2$ 個が $(u,v)$ に入るので
$$
f_{U,V}(u,v)
=\frac{n(n-1)}{\theta^n}(v-u)^{n-2}.
$$
したがって
$$
\begin{aligned}
f_{U\mid V}(u\mid v)
&=\frac{f_{U,V}(u,v)}{f_V(v)}\\
&=\frac{(n-1)(v-u)^{n-2}}{v^{n-1}},
\qquad0<u<v.
\end{aligned}
$$

条件付き期待値は
$$
\begin{aligned}
E[U\mid V=v]
&=\int_0^vu\frac{(n-1)(v-u)^{n-2}}{v^{n-1}}\,du.
\end{aligned}
$$
$u=vz$ と置くと
$$
E[U\mid V=v]
=v(n-1)\int_0^1z(1-z)^{n-2}\,dz
=\frac vn.
$$

次に
$$
r=v-u,
\qquad
w=u
$$
と置きます。すると
$$
u=w,\qquad v=w+r.
$$
$0<u<v<\theta$ は
$$
0<r<\theta,
\qquad
0<w<\theta-r
$$
になります。ヤコビアンの絶対値は1なので
$$
\begin{aligned}
f_R(r)
&=\int_0^{\theta-r}\frac{n(n-1)}{\theta^n}r^{n-2}\,dw\\
&=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r),
\qquad0<r<\theta.
\end{aligned}
$$

$Z=R/\theta$ とすると
$$
f_Z(z)=n(n-1)z^{n-2}(1-z),
\qquad0<z<1,
$$
したがって
$$
Z\sim\operatorname{Beta}(n-1,2).
$$
よって
$$
E[R]=\theta\frac{n-1}{n+1},
$$
$$
\operatorname{Var}(R)
=\theta^2\frac{2(n-1)}{(n+1)^2(n+2)}.
$$

また $V/\theta\sim\operatorname{Beta}(n,1)$ なので
$$
\operatorname{Var}(V)
=\theta^2\frac{n}{(n+1)^2(n+2)}.
$$

したがって
$$
E[T_1]=\frac{n+1}{n}E[V]=\theta,
$$
$$
E[T_2]=\frac{n+1}{n-1}E[R]=\theta.
$$
両方とも不偏です。

分散は
$$
\operatorname{Var}(T_1)
=\frac{\theta^2}{n(n+2)},
$$
$$
\operatorname{Var}(T_2)
=\frac{2\theta^2}{(n-1)(n+2)}.
$$
比を取ると
$$
\frac{\operatorname{Var}(T_2)}{\operatorname{Var}(T_1)}
=\frac{2n}{n-1}>1.
$$
したがって $T_1$ の方が分散が小さいです。

### 本番答案

$$
F_V(v)=\left(\frac v\theta\right)^n,
\quad
f_V(v)=\frac{nv^{n-1}}{\theta^n},
\quad
E[V]=\frac{n\theta}{n+1}.
$$
$$
f_{U,V}(u,v)=\frac{n(n-1)}{\theta^n}(v-u)^{n-2},
$$
$$
f_{U\mid V}(u\mid v)
=\frac{(n-1)(v-u)^{n-2}}{v^{n-1}},
\quad
E[U\mid V=v]=\frac vn.
$$
$$
f_R(r)=\frac{n(n-1)}{\theta^n}r^{n-2}(\theta-r),
\quad0<r<\theta.
$$
$R/\theta\sim\operatorname{Beta}(n-1,2)$ より
$$
E[R]=\frac{n-1}{n+1}\theta,
\quad
\operatorname{Var}(R)=\frac{2(n-1)\theta^2}{(n+1)^2(n+2)}.
$$
したがって $T_1,T_2$ は不偏で
$$
\operatorname{Var}(T_1)=\frac{\theta^2}{n(n+2)}
<
\frac{2\theta^2}{(n-1)(n+2)}
=\operatorname{Var}(T_2).
$$

### 採点基準

最大値20点、同時・条件付き密度25点、条件付き期待値10点、標本範囲25点、推定量比較20点。合計100点。

<!-- solution-end -->

---

# 9. 実過去問演習

問題文・図表は転載せず、公式問題集の年度・科目・大問番号で参照します。

### PAST-P4-01: MATH-2024-Q5

- 入手先: 統計検定公式問題集［2022〜2024年］
- 現在解く範囲: 順序統計量の周辺・同時密度、条件付き密度、条件付き期待値
- 後続章で再挑戦: 十分性とRao--Blackwell化
- 答案確認: 変数の取り得る範囲、配置係数、条件付き密度の分母を明記する。

### PAST-P4-02: MATH-2018-Q5

- 入手先: 統計検定公式問題集［2018〜2019年］
- 現在解く範囲: 最小・中央値・最大の密度、同時密度、標本範囲のモーメント
- 後続章で再挑戦: 推定量の比較
- 答案確認: 順序統計量の並びと積分範囲を先に確認する。

### PAST-P4-03: MATH-2024-Q2

- 入手先: 統計検定公式問題集［2022〜2024年］
- 現在解く範囲: 累積分布関数、確率密度関数、最大値、不偏推定量
- 後続章で再挑戦: 最尤推定量と平均二乗誤差
- 答案確認: 変数の取り得る範囲と不偏化係数を確認する。

---

# 10. 復習チェック

- [ ] 変換後の値が取り得る範囲を最初に書ける。
- [ ] $g(x)=y$ を解き、元の範囲に入る $x$ を全て拾える。
- [ ] 一変数変換で $|dx/dy|$ を付けられる。
- [ ] 2変数変換で $x,y$ を $u,v$ で表せる。
- [ ] 元の範囲を新しい変数の不等式へ直せる。
- [ ] ヤコビアンの絶対値を計算できる。
- [ ] 和・差・積・比の積分範囲を元の分布から決められる。
- [ ] 最大値を「全て以下」の事象から求められる。
- [ ] 最小値を「全て超える」の事象から求められる。
- [ ] 第 $k$ 順序統計量の係数を配置数から説明できる。
- [ ] 最小値と最大値の同時密度を配置から導ける。
- [ ] 標本範囲の密度を最小値・最大値の同時密度から求められる。
- [ ] モーメント母関数を求める問題では、定義の積分から出発できる。
