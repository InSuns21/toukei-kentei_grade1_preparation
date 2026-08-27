# Core 24 順序統計量・十分性・Rao–Blackwell

- 旧No.: 01
- 演習価値: S
- 難度: A
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$X_1,X_2,X_3\overset{\mathrm{iid}}\sim U(-1/2,1/2)$ とし、$Y_i=X_i+\theta$とする。順序統計量を$Y_{(1)}\le Y_{(2)}\le Y_{(3)}$とする。

1. $E[Y_{(1)}],E[Y_{(2)}],E[Y_{(3)}]$を求めよ。
2. 任意の$c$に対し

$$
\widehat\theta_c
=cY_{(1)}+(1-2c)Y_{(2)}+cY_{(3)}
$$

が不偏であることを示せ。
3. $(Y_{(1)},Y_{(3)})$が$\theta$の十分統計量であることを示せ。
4. $E[Y_{(2)}\mid Y_{(1)},Y_{(3)}]$を求め、Rao–Blackwell化により族$\widehat\theta_c$内で分散最小となる$c$を求めよ。

## 詳細解答

### 1. 順序統計量の期待値

まず位置をずらして

$$
U_i=X_i+\frac12\sim U(0,1)
$$

とする。すると

$$
Y_{(k)}=\theta-\frac12+U_{(k)}
$$

なので、$U_{(1)},U_{(2)},U_{(3)}$の期待値を求めればよい。

#### 最小値 $U_{(1)}$

$0<u<1$ に対し、$U_{(1)}>u$ とは3個の標本がすべて $u$ より大きいことだから

$$
\begin{aligned}
P(U_{(1)}>u)
&=P(U_1>u,U_2>u,U_3>u)\\
&=(1-u)^3.
\end{aligned}
$$

よって

$$
F_{U_{(1)}}(u)=1-(1-u)^3,
$$

したがって密度は

$$
f_{U_{(1)}}(u)=3(1-u)^2.
$$

ゆえに

$$
\begin{aligned}
E[U_{(1)}]
&=\int_0^1 u\,3(1-u)^2\,du\\
&=\frac14.
\end{aligned}
$$

#### 最大値 $U_{(3)}$

同様に、$U_{(3)}\le u$ とは3個すべてが $u$ 以下であることだから

$$
F_{U_{(3)}}(u)=P(U_1\le u,U_2\le u,U_3\le u)=u^3.
$$

したがって

$$
f_{U_{(3)}}(u)=3u^2,
$$

ゆえに

$$
E[U_{(3)}]
=\int_0^1 u\,3u^2\,du
=\frac34.
$$

#### 中央値 $U_{(2)}$

$U_{(2)}\le u$ となるのは、3個のうち少なくとも2個が $u$ 以下のときである。したがって

$$
\begin{aligned}
F_{U_{(2)}}(u)
&=\binom32u^2(1-u)+u^3\\
&=3u^2-2u^3.
\end{aligned}
$$

よって

$$
f_{U_{(2)}}(u)=6u(1-u),
$$

したがって

$$
\begin{aligned}
E[U_{(2)}]
&=\int_0^1 u\,6u(1-u)\,du\\
&=\frac12.
\end{aligned}
$$

以上より

$$
E[U_{(1)}]=\frac14,
\qquad
E[U_{(2)}]=\frac12,
\qquad
E[U_{(3)}]=\frac34.
$$

$Y_{(k)}=\theta-1/2+U_{(k)}$ に戻せば

$$
\boxed{
E[Y_{(1)}]=\theta-\frac14,
\quad
E[Y_{(2)}]=\theta,
\quad
E[Y_{(3)}]=\theta+\frac14
}.
$$

#### 別解：順序統計量の一般公式を使う場合

連続独立同分布標本の第$k$順序統計量の密度公式から、$U_i\sim U(0,1)$ では

$$
f_{U_{(k)}}(u)
=\frac{3!}{(k-1)!(3-k)!}
 u^{k-1}(1-u)^{3-k},
\qquad 0<u<1.
$$

したがって

$$
U_{(k)}\sim \operatorname{Beta}(k,4-k),
\qquad
E[U_{(k)}]=\frac{k}{4}.
$$

これを使えば同じ結果が直ちに得られる。ただし本問では、上の本流解答のように最小値・中央値・最大値の事象から分布を作れるようにしておく方が、公式を忘れた場合にも対応しやすい。

### 2. 不偏性

$$
\begin{aligned}
E[\widehat\theta_c]
&=c(\theta-1/4)+(1-2c)\theta+c(\theta+1/4)\\
&=\theta.
\end{aligned}
$$

したがって全ての $c$ で不偏である。

### 3. 十分性：Neyman–Fisher 因子分解定理

$Y_i\sim U(\theta-1/2,\theta+1/2)$ なので、同時確率密度関数は

$$
f_\theta(y)
=\prod_{i=1}^3
\boldsymbol{1}_{\{\theta-1/2<y_i<\theta+1/2\}}.
$$

この条件は

$$
y_{(3)}-\frac12<\theta<y_{(1)}+\frac12
$$

と同値なので

$$
f_\theta(y)
=g_\theta(y_{(1)},y_{(3)})h(y),
$$

$$
g_\theta(a,b)
=\boldsymbol{1}_{\{b-1/2<\theta<a+1/2\}},
\qquad h(y)=1.
$$

ここで使う **Neyman–Fisher 因子分解定理**は、同時確率密度関数または同時確率質量関数を

$$
f_\theta(y)=g_\theta(T(y))h(y)
$$

と書け、$h$ が母数に依存しないとき、$T$ が十分統計量になるという定理である。本問では母数 $\theta$ への依存が最小値と最大値だけを通じて現れているので、

$$
\boxed{(Y_{(1)},Y_{(3)})\text{ は }\theta\text{ の十分統計量}}
$$

である。

### 4. 条件付き分布を導出してRao–Blackwell化する

ここでは「両端を固定すると内部点はその間の一様分布になる」という公式を最初から使わず、条件付き密度を直接導く。

$$
A=Y_{(1)},\qquad M=Y_{(2)},\qquad B=Y_{(3)}
$$

と置く。また

$$
\ell=\theta-\frac12,
\qquad
r=\theta+\frac12
$$

とする。

各 $Y_i$ の密度は区間 $(\ell,r)$ 上で1である。$\ell<a<m<b<r$ を満たす点 $(a,m,b)$ の近くに順序統計量 $(A,M,B)$ が入るためには、元の $(Y_1,Y_2,Y_3)$ がその3つの小区間へ1個ずつ入ればよい。その割り当ては

$$
3!=6
$$

通りあるので、順序統計量の同時密度は

$$
f_{A,M,B}(a,m,b)=6,
\qquad \ell<a<m<b<r.
$$

次に $M$ を積分して、両端 $(A,B)$ の同時密度を求める。

$$
\begin{aligned}
f_{A,B}(a,b)
&=\int_a^b f_{A,M,B}(a,m,b)\,dm\\
&=\int_a^b 6\,dm\\
&=6(b-a),
\qquad \ell<a<b<r.
\end{aligned}
$$

したがって、$a<m<b$ に対する条件付き密度は

$$
\begin{aligned}
f_{M\mid A,B}(m\mid a,b)
&=\frac{f_{A,M,B}(a,m,b)}{f_{A,B}(a,b)}\\
&=\frac{6}{6(b-a)}\\
&=\frac{1}{b-a}.
\end{aligned}
$$

これは $(a,b)$ 上の一様分布の密度そのものである。よって

$$
M\mid(A=a,B=b)\sim U(a,b),
$$

したがって

$$
\boxed{
E[Y_{(2)}\mid Y_{(1)},Y_{(3)}]
=\frac{Y_{(1)}+Y_{(3)}}2
}.
$$

ここで

$$
S=(Y_{(1)},Y_{(3)})
$$

と置く。問3で $S$ は十分統計量と分かっているので、Rao–Blackwell の定理を使える。

$S$ を条件として $\widehat\theta_c$ の期待値を取ると

$$
\begin{aligned}
E[\widehat\theta_c\mid S]
&=cY_{(1)}
 +(1-2c)E[Y_{(2)}\mid S]
 +cY_{(3)}\\
&=cY_{(1)}
 +(1-2c)\frac{Y_{(1)}+Y_{(3)}}2
 +cY_{(3)}\\
&=\frac{Y_{(1)}+Y_{(3)}}2.
\end{aligned}
$$

つまり、どの $c$ から出発しても Rao–Blackwell 化後の推定量は同じである。

さらに、全分散公式を使うと

$$
\operatorname{Var}(\widehat\theta_c)
=
\operatorname{Var}\!\left(E[\widehat\theta_c\mid S]\right)
+
E\!\left[\operatorname{Var}(\widehat\theta_c\mid S)\right].
$$

$S$ を固定したとき確率的に残るのは $Y_{(2)}$ だけなので

$$
\operatorname{Var}(\widehat\theta_c\mid S)
=(1-2c)^2\operatorname{Var}(Y_{(2)}\mid S).
$$

そして

$$
Y_{(2)}\mid(Y_{(1)}=a,Y_{(3)}=b)\sim U(a,b)
$$

だから

$$
\operatorname{Var}(Y_{(2)}\mid S)
=\frac{(Y_{(3)}-Y_{(1)})^2}{12}>0
$$

がほとんど確実に成り立つ。したがって第2項を最小にするには

$$
(1-2c)^2=0
$$

でなければならず、

$$
\boxed{c=\frac12}
$$

が族 $\widehat\theta_c$ の中で一意に分散最小である。このとき

$$
\widehat\theta_{1/2}
=\frac{Y_{(1)}+Y_{(3)}}2
$$

であり、これはまさに Rao–Blackwell 化後の推定量である。

#### 別解：条件付き順序統計量の一般結果を使う場合

連続一様標本では、最小値 $a$ と最大値 $b$ を条件にすると、その間にある標本点は $(a,b)$ 上の一様分布の順序統計量になる。本問は内部点が1個だけなので直ちに

$$
Y_{(2)}\mid(Y_{(1)}=a,Y_{(3)}=b)\sim U(a,b)
$$

が得られる。そこから Rao–Blackwell 化すれば同じ結論 $c=1/2$ に至る。

## 本番答案

$U_i=X_i+1/2\sim U(0,1)$ と置く。

最小値について

$$
P(U_{(1)}>u)=(1-u)^3
$$

より $f_{U_{(1)}}(u)=3(1-u)^2$、最大値について

$$
P(U_{(3)}\le u)=u^3
$$

より $f_{U_{(3)}}(u)=3u^2$。また中央値について

$$
P(U_{(2)}\le u)
=\binom32u^2(1-u)+u^3
=3u^2-2u^3
$$

より $f_{U_{(2)}}(u)=6u(1-u)$。積分して

$$
E[U_{(1)}]=\frac14,
\quad
E[U_{(2)}]=\frac12,
\quad
E[U_{(3)}]=\frac34.
$$

したがって

$$
E[Y_{(1)},Y_{(2)},Y_{(3)}]
=(\theta-1/4,\theta,\theta+1/4),
$$

よって $\widehat\theta_c$ は全$c$で不偏。

同時確率密度関数は

$$
f_\theta(y)
=\boldsymbol{1}_{\{y_{(3)}-1/2<\theta<y_{(1)}+1/2\}},
$$

と最小値・最大値だけを通じて母数に依存するので **Neyman–Fisher 因子分解定理**から $(Y_{(1)},Y_{(3)})$ は十分。

$A=Y_{(1)},M=Y_{(2)},B=Y_{(3)}$ とすると、$a<m<b$ 上で

$$
f_{A,M,B}(a,m,b)=6,
$$

したがって

$$
f_{A,B}(a,b)=\int_a^b6\,dm=6(b-a).
$$

よって

$$
f_{M\mid A,B}(m\mid a,b)=\frac1{b-a},
\qquad a<m<b,
$$

なので

$$
E[Y_{(2)}\mid Y_{(1)},Y_{(3)}]
=\frac{Y_{(1)}+Y_{(3)}}2.
$$

Rao–Blackwell 化すると全$c$で

$$
E[\widehat\theta_c\mid Y_{(1)},Y_{(3)}]
=\frac{Y_{(1)}+Y_{(3)}}2.
$$

また条件付き分散は

$$
(1-2c)^2\frac{(Y_{(3)}-Y_{(1)})^2}{12}
$$

なので、全分散公式よりこれを0にする

$$
\boxed{c=1/2}
$$

が一意に分散最小。

## 採点基準

- 順序統計量の期待値: 5点
- 不偏性: 4点
- 十分性（因子分解定理と条件確認）: 5点
- 条件付き期待値・Rao–Blackwell（条件確認を含む）: 6点
