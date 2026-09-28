# MICRO12 リスク回避・Arrow--Pratt・確率優越

<!-- definition-example-audit: strict -->

MICRO11 では、くじ上の選好がどのような公理の下で期待効用

$$
E[u(X)]
$$

によって表せるかを構成しました。本章では結果を **金銭額・富**として読み、その効用関数の曲がり方が「不確実性をどれだけ嫌うか」をどう決めるかを調べます。

中心となる流れは

$$
\boxed{
\text{期待効用}
\longrightarrow
\text{凹性}
\longrightarrow
\text{確実性等価・リスクプレミアム}
\longrightarrow
\text{Arrow--Pratt}
\longrightarrow
\text{確率優越}
}
$$

です。

測度論を前提にしないため、本文ではすべてのくじを **有限支持**とします。つまり確率変数 $X$ は有限個の金額だけを取ります。MICRO11 の期待効用表現を前提にし、金額の区間 $I\subset\mathbb R$ 上で結果効用

$$
u:I\to\mathbb R
$$

が定義され、金額が大きいほど望ましい場合には $u$ は増加するとします。

---

## 1. 「平均が同じなら確実な方がよい」を数式にする

平均が100円の二つの選択肢

$$
100\text{ 円を確実にもらう}
$$

と

$$
0\text{ 円と200円をそれぞれ確率 }1/2\text{ でもらう}
$$

を考えます。

どちらも平均額は100円です。違うのは二つ目だけが不確実だという点です。

<a id="def-micro12-risk-aversion"></a>

<!-- formal-statement-start -->
> **定義（リスク回避）**  
> 金銭くじ上の選好が期待効用
>
$$
E[u(X)]
$$
>
> で表されているとする。
>
> 任意の有限支持くじ $X$ について、平均額 $E[X]$ を確実に受け取る方を $X$ 以上に好む、すなわち
>
$$
u(E[X])
\ge
E[u(X)]
$$
>
> が成り立つとき、この選好を **リスク回避的**という。
>
> 非退化なくじ、すなわち少なくとも二つの異なる金額を正の確率で取る全ての $X$ について不等号が狭義になるとき、**狭義にリスク回避的**という。
<!-- formal-statement-end -->

この定義は「分散が小さいものを好む」とは言っていません。比較しているのはまず、あるくじと **その平均を確実に受け取る選択肢**です。

<!-- definition-example-start: def-micro12-risk-aversion -->
**定義の確認**：平方根効用

$$
u(w)=\sqrt{w},
\qquad
X=
\begin{cases}
0 & \text{確率 }1/2,\\
4 & \text{確率 }1/2
\end{cases}
$$

とします。

平均は

$$
E[X]
=
\frac12\cdot0+\frac12\cdot4
=
2.
$$

平均を確実に得る効用は

$$
u(E[X])
=
\sqrt2.
$$

一方、くじの期待効用は

$$
E[u(X)]
=
\frac12\sqrt0+\frac12\sqrt4
=
1.
$$

したがって

$$
\sqrt2>1
$$

なので、このくじに対しては平均2を確実に得る方が好まれます。
<!-- definition-example-end -->

この現象を一つ一つのくじで確認する代わりに、効用関数そのものの形で判定できます。

<a id="thm-micro12-risk-aversion-concavity"></a>

<!-- formal-statement-start -->
> **定理（リスク回避と凹効用の同値）**  
> 区間 $I$ 上の増加関数 $u:I\to\mathbb R$ が有限支持くじの期待効用を表しているとする。
>
> このとき次は同値である。
>
> 1. 選好はリスク回避的である。
> 2. $u$ は凹関数である。
>
> また $u$ が狭義凹なら、全ての非退化な有限支持くじに対して
>
$$
u(E[X])>E[u(X)]
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

凹性からリスク回避を出す向きは、有限個の点に対する Jensen 型不等式です。逆向きは二点くじだけを使います。二点くじの平均を確実に受け取る方が常に好まれるなら、それがそのまま凹性の定義になります。

<!-- proof-start -->
### 証明

まず $u$ が凹であるとします。

有限支持くじ $X$ が値

$$
x_1,\dots,x_n
$$

を確率

$$
p_1,\dots,p_n
$$

で取り、

$$
p_i\ge0,
\qquad
\sum_{i=1}^n p_i=1
$$

とします。

示したいのは

$$
u\left(\sum_{i=1}^n p_i x_i\right)
\ge
\sum_{i=1}^n p_i u(x_i)
$$

です。

$n=2$ では凹性の定義そのものです。

$n-1$ 個まで成り立つとします。$p_n=1$ なら自明です。$p_n<1$ のとき

$$
q_i
=
\frac{p_i}{1-p_n}
\qquad
(i=1,\dots,n-1)
$$

と置けば、

$$
q_i\ge0,
\qquad
\sum_{i=1}^{n-1}q_i=1.
$$

平均は

$$
\sum_{i=1}^n p_i x_i
=
(1-p_n)
\left(
\sum_{i=1}^{n-1}q_i x_i
\right)
+
p_nx_n.
$$

二点に対する凹性から

$$
u\left(\sum_{i=1}^n p_i x_i\right)
\ge
(1-p_n)
u\left(\sum_{i=1}^{n-1}q_i x_i\right)
+
p_nu(x_n).
$$

帰納法の仮定を使うと

$$
u\left(\sum_{i=1}^{n-1}q_i x_i\right)
\ge
\sum_{i=1}^{n-1}q_i u(x_i).
$$

したがって

$$
\begin{aligned}
u(E[X])
&\ge
(1-p_n)
\sum_{i=1}^{n-1}q_i u(x_i)
+
p_nu(x_n)
\\
&=
\sum_{i=1}^n p_i u(x_i)
\\
&=
E[u(X)].
\end{aligned}
$$

よってリスク回避的です。

逆に、選好がリスク回避的であるとします。

任意の $x,y\in I$ と $\lambda\in[0,1]$ を取り、

$$
X=
\begin{cases}
x & \text{確率 }\lambda,\\
y & \text{確率 }1-\lambda
\end{cases}
$$

とします。

この平均は

$$
E[X]
=
\lambda x+(1-\lambda)y.
$$

リスク回避の定義から

$$
u(\lambda x+(1-\lambda)y)
\ge
\lambda u(x)+(1-\lambda)u(y).
$$

これは $u$ の凹性そのものです。

最後に $u$ が狭義凹で $X$ が非退化なら、有限 Jensen 不等式のどこかで異なる二点を正の重みで混ぜるため不等号が狭義になります。従って

$$
u(E[X])>E[u(X)].
$$

以上で示されました。$\square$
<!-- proof-end -->

この定理により、リスク回避という選好の性質を、効用関数の **凹性**へ翻訳できます。

---

## 2. 確実性等価とリスクプレミアム

同じくじでも、「何円を確実にもらえるなら手放してよいか」を金額で表した方が比較しやすいことがあります。

<a id="def-micro12-certainty-equivalent"></a>

<!-- formal-statement-start -->
> **定義（確実性等価）**  
> $u$ を区間 $I$ 上の連続かつ狭義増加な効用関数とし、$X$ を $I$ 内に有限支持を持つくじとする。
>
> $X$ と無差別になる確実な金額 $c(X)$、すなわち
>
$$
u(c(X))
=
E[u(X)]
$$
>
> を満たす $c(X)$ を $X$ の **確実性等価**という。
<!-- formal-statement-end -->

$E[u(X)]$ は $u$ の最小値と最大値の間にあります。$u$ は連続かつ狭義増加なので、その値を取る金額は一意に存在します。

<a id="def-micro12-risk-premium"></a>

<!-- formal-statement-start -->
> **定義（リスクプレミアム）**  
> くじ $X$ の平均を
>
$$
\mu=E[X]
$$
>
> とする。確実性等価を $c(X)$ とするとき、
>
$$
\pi(X)
=
\mu-c(X)
$$
>
> を $X$ の **リスクプレミアム**という。
<!-- formal-statement-end -->

リスクプレミアムは「平均額から何円まで差し引かれても、不確実性が消えるなら受け入れるか」を表します。

<!-- definition-example-start: def-micro12-certainty-equivalent, def-micro12-risk-premium -->
**定義の確認**：平方根効用で確実性等価を求める

先ほどの

$$
u(w)=\sqrt w,
\qquad
X=
\begin{cases}
0 & \text{確率 }1/2,\\
4 & \text{確率 }1/2
\end{cases}
$$

では

$$
E[u(X)]=1.
$$

したがって確実性等価 $c$ は

$$
\sqrt c=1
$$

を満たし、

$$
\boxed{
c(X)=1
}
$$

です。

一方、

$$
E[X]=2.
$$

よってリスクプレミアムは

$$
\boxed{
\pi(X)=2-1=1
}
$$

です。
<!-- definition-example-end -->

<a id="prop-micro12-ce-premium-sign"></a>

<!-- formal-statement-start -->
> **命題（確実性等価とリスクプレミアムの符号）**  
> $u$ を連続・狭義増加・凹関数とし、$X$ を有限支持くじとする。
>
> このとき
>
$$
c(X)\le E[X]
$$
>
> かつ
>
$$
\pi(X)\ge0.
$$
>
> $u$ が狭義凹で $X$ が非退化なら、両不等号は狭義になる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

凹性と前節の有限 Jensen 不等式から

$$
E[u(X)]
\le
u(E[X]).
$$

確実性等価の定義より

$$
u(c(X))
=
E[u(X]).
$$

したがって

$$
u(c(X))
\le
u(E[X]).
$$

$u$ は狭義増加なので、

$$
c(X)\le E[X].
$$

よって

$$
\pi(X)
=
E[X]-c(X)
\ge0.
$$

狭義凹かつ非退化なら Jensen 不等式が狭義になるため、

$$
u(c(X))
<
u(E[X]),
$$

したがって

$$
c(X)<E[X],
\qquad
\pi(X)>0.
$$

$\square$
<!-- proof-end -->

---

## 3. Arrow--Pratt の局所的リスク回避度

凹かどうかだけでは、「どちらの効用の方がより強くリスクを嫌うか」までは分かりません。

滑らかな効用では、傾きに対する曲率の大きさを比べます。

<a id="def-micro12-arrow-pratt"></a>

<!-- formal-statement-start -->
> **定義（Arrow--Pratt の絶対的・相対的リスク回避度）**  
> 開区間 $I$ 上で
>
$$
u\in C^2(I),
\qquad
u'(w)>0
$$
>
> とする。
>
> **絶対的リスク回避度**を
>
$$
A_u(w)
=
-\frac{u''(w)}{u'(w)}
$$
>
> と定める。
>
> さらに $w>0$ の領域では、**相対的リスク回避度**を
>
$$
R_u(w)
=
-w\frac{u''(w)}{u'(w)}
=
wA_u(w)
$$
>
> と定める。
<!-- formal-statement-end -->

凹効用なら $u''(w)\le0$ なので

$$
A_u(w)\ge0.
$$

絶対的リスク回避度は「同じ金額幅のリスク」に対する局所的な嫌悪、相対的リスク回避度は「富の何割かが動くリスク」に対する局所的な嫌悪を測ります。

<!-- definition-example-start: def-micro12-arrow-pratt -->
**定義の確認**：CARA と CRRA

まず

$$
u(w)
=
-e^{-aw},
\qquad
a>0
$$

とします。

$$
u'(w)=ae^{-aw},
\qquad
u''(w)=-a^2e^{-aw}
$$

なので、

$$
A_u(w)
=
-\frac{-a^2e^{-aw}}{ae^{-aw}}
=
a.
$$

絶対的リスク回避度は富に依存せず一定です。

次に $w>0$ で

$$
u(w)
=
\frac{w^{1-\gamma}}{1-\gamma},
\qquad
\gamma>0,\quad
\gamma\ne1
$$

とします。

$$
u'(w)=w^{-\gamma},
\qquad
u''(w)=-\gamma w^{-\gamma-1}.
$$

従って

$$
A_u(w)
=
\frac{\gamma}{w},
$$

$$
R_u(w)
=
\gamma.
$$

$\gamma=1$ の極限に対応する

$$
u(w)=\log w
$$

でも

$$
R_u(w)=1.
$$
<!-- definition-example-end -->

### 3.1 正のアフィン変換では変わらない

MICRO11 では期待効用表現は

$$
v(w)=au(w)+b,
\qquad
a>0
$$

までしか一意でないことを見ました。

このとき

$$
v'(w)=au'(w),
\qquad
v''(w)=au''(w)
$$

なので、

$$
-\frac{v''(w)}{v'(w)}
=
-\frac{au''(w)}{au'(w)}
=
A_u(w).
$$

従って $A_u$ も $R_u$ も、期待効用の許容された尺度変更に依存しません。

<a id="thm-micro12-arrow-pratt-order"></a>

<!-- formal-statement-start -->
> **定理（Arrow--Pratt のリスク回避順序）**  
> 開区間 $I$ 上で
>
$$
u,v\in C^2(I),
\qquad
u'(w)>0,
\qquad
v'(w)>0
$$
>
> とする。
>
> 次の二条件は同値である。
>
> 1. ある増加凹関数 $\phi$ が存在して
>
$$
v=\phi\circ u
$$
>
> と書ける。
> 2. 全ての $w\in I$ について
>
$$
A_v(w)\ge A_u(w)
$$
>
> が成り立つ。
>
> さらにこれらが成り立つとき、任意の有限支持くじ $X$ について
>
$$
c_v(X)\le c_u(X),
$$
>
> すなわち $v$ で評価する主体の方が確実性等価を高く付けない。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ は狭義増加なので逆関数を持ちます。

$$
\phi
=
v\circ u^{-1}
$$

と置き、その二階微分の符号を調べます。Arrow--Pratt 指標の大小は、ちょうど $\phi$ の凹性へ翻訳されます。

<!-- proof-start -->
### 証明

$u'(w)>0$ なので $u$ は狭義増加で、像 $u(I)$ 上に逆関数を持ちます。

$$
\phi
=
v\circ u^{-1}
$$

と置けば、

$$
v=\phi\circ u.
$$

$z=u(w)$ と書くと、

$$
\phi'(z)
=
\frac{v'(w)}{u'(w)}
>0.
$$

従って $\phi$ は増加です。

さらに $w$ で微分し、最後に $dz/dw=u'(w)$ で割ると、

$$
\phi''(u(w))
=
\frac{v''(w)u'(w)-v'(w)u''(w)}
{u'(w)^3}.
$$

分母は正です。

一方、

$$
A_v(w)\ge A_u(w)
$$

は

$$
-\frac{v''(w)}{v'(w)}
\ge
-\frac{u''(w)}{u'(w)}
$$

と同値です。

$u'(w),v'(w)>0$ なので整理すると、

$$
v''(w)u'(w)-v'(w)u''(w)
\le0.
$$

従って

$$
\phi''(u(w))\le0.
$$

つまり $\phi$ は凹です。

逆に $\phi$ が増加凹なら同じ式を逆向きにたどることで

$$
A_v(w)\ge A_u(w)
$$

が得られます。

最後に確実性等価を比較します。

$$
v=\phi\circ u
$$

なので、

$$
E[v(X)]
=
E[\phi(u(X))].
$$

$\phi$ の凹性から、

$$
E[\phi(u(X))]
\le
\phi(E[u(X)]).
$$

$v^{-1}=u^{-1}\circ\phi^{-1}$ であり、両逆関数は増加なので、

$$
\begin{aligned}
c_v(X)
&=
v^{-1}(E[v(X)])
\\
&=
u^{-1}
\left(
\phi^{-1}(E[\phi(u(X))])
\right)
\\
&\le
u^{-1}(E[u(X)])
\\
&=
c_u(X).
\end{aligned}
$$

よって $v$ の方が全てのくじに対して確実性等価を弱く低く付けます。$\square$
<!-- proof-end -->

---

## 4. 小さなリスクでは「曲率 × 分散」が効く

Arrow--Pratt 指標がなぜ

$$
-\frac{u''}{u'}
$$

という形なのかを、小さな平均ゼロリスクから導きます。

富 $w$ の周りに

$$
X_t=w+tZ
$$

という小さなリスクを載せます。ここで $Z$ は有限支持で

$$
E[Z]=0.
$$

$t$ が小さいほどリスク幅が小さくなります。

<a id="thm-micro12-local-risk-premium"></a>

<!-- formal-statement-start -->
> **定理（小リスクのリスクプレミアム近似）**  
> $u$ を $w$ の近傍で $C^2$ 級とし、
>
$$
u'(w)>0.
$$
>
> 有限支持確率変数 $Z$ が
>
$$
E[Z]=0
$$
>
> を満たすとする。
>
> $X_t=w+tZ$ のリスクプレミアムを $\pi_t$ とすると、
>
$$
\pi_t
=
\frac12
A_u(w)
t^2E[Z^2]
+
o(t^2)
\qquad
(t\to0).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Z$ は有限支持なので、各実現値について $t\to0$ の Taylor 展開を行い、その有限和を取れます。

$$
u(w+tZ)
=
u(w)
+
u'(w)tZ
+
\frac12u''(w)t^2Z^2
+
o(t^2).
$$

期待値を取ると、

$$
E[u(w+tZ)]
=
u(w)
+
u'(w)tE[Z]
+
\frac12u''(w)t^2E[Z^2]
+
o(t^2).
$$

$E[Z]=0$ なので、

$$
E[u(X_t)]
=
u(w)
+
\frac12u''(w)t^2E[Z^2]
+
o(t^2).
$$

一方、$X_t$ の平均は $w$ です。

リスクプレミアムを $\pi_t$ とすると確実性等価は

$$
c(X_t)=w-\pi_t.
$$

定義から

$$
u(w-\pi_t)
=
E[u(X_t)].
$$

右辺は $u(w)+O(t^2)$ なので、$u'(w)>0$ から $\pi_t=O(t^2)$ です。

そこで左辺を一次まで展開すると、

$$
u(w-\pi_t)
=
u(w)-u'(w)\pi_t+o(t^2).
$$

これを右辺と等置して、

$$
-u'(w)\pi_t
=
\frac12u''(w)t^2E[Z^2]
+
o(t^2).
$$

したがって、

$$
\pi_t
=
-\frac12
\frac{u''(w)}{u'(w)}
t^2E[Z^2]
+
o(t^2).
$$

よって

$$
\boxed{
\pi_t
=
\frac12
A_u(w)t^2E[Z^2]
+
o(t^2)
}
$$

です。$\square$
<!-- proof-end -->

平均ゼロなので

$$
t^2E[Z^2]
=
\operatorname{Var}(tZ).
$$

従って小さなリスクでは、

$$
\boxed{
\text{リスクプレミアム}
\approx
\frac12
\times
\text{絶対的リスク回避度}
\times
\text{分散}
}
$$

となります。

ここで重要なのは **局所近似**であることです。大きなリスクを分散だけで完全に順位付けできる、という主張ではありません。

---

## 5. 一次確率優越：全ての「多いほどよい」効用に共通する順序

平均や分散を計算する前に、分布そのものから明らかに優劣が決まる場合があります。

有限支持くじ $X$ の分布関数を

$$
F_X(t)
=
P(X\le t)
$$

とします。

<a id="def-micro12-fosd"></a>

<!-- formal-statement-start -->
> **定義（一次確率優越）**  
> 有限支持くじ $X,Y$ について、
>
$$
F_X(t)\le F_Y(t)
\qquad
(\forall t\in\mathbb R)
$$
>
> が成り立つとき、$X$ は $Y$ を **一次確率優越**するといい、
>
$$
X\succeq_{\mathrm{FOSD}}Y
$$
>
> と書く。
<!-- formal-statement-end -->

同じ閾値 $t$ に対して「$t$ 以下に落ちる確率」が $X$ の方で常に小さい、という意味です。

<!-- definition-example-start: def-micro12-fosd -->
**定義の確認**：二つの二点くじ

$$
X=
\begin{cases}
100 & \text{確率 }1/2,\\
200 & \text{確率 }1/2,
\end{cases}
$$

$$
Y=
\begin{cases}
50 & \text{確率 }1/2,\\
150 & \text{確率 }1/2
\end{cases}
$$

とします。

各区間で累積確率を比べると、

- $t<50$ では両方0
- $50\le t<100$ では $F_X(t)=0,\ F_Y(t)=1/2$
- $100\le t<150$ では両方 $1/2$
- $150\le t<200$ では $F_X(t)=1/2,\ F_Y(t)=1$
- $t\ge200$ では両方1

です。

従って全ての $t$ で

$$
F_X(t)\le F_Y(t),
$$

よって

$$
X\succeq_{\mathrm{FOSD}}Y.
$$
<!-- definition-example-end -->

<a id="thm-micro12-fosd-eu"></a>

<!-- formal-statement-start -->
> **定理（一次確率優越の期待効用特徴付け）**  
> $X,Y$ を有限支持くじとする。
>
> 次は同値である。
>
> 1.
>
$$
X\succeq_{\mathrm{FOSD}}Y.
$$
>
> 2. 両くじの支持を含む有限集合上の任意の非減少関数 $u$ について
>
$$
E[u(X)]
\ge
E[u(Y)]
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

二つのくじの支持を小さい順に並べます。

期待効用は「最大結果の効用」から「各閾値以下にいる累積確率 × その区間での効用増分」を引く形に変形できます。

<!-- proof-start -->
### 証明

$X,Y$ の支持の合併を

$$
x_1<x_2<\cdots<x_m
$$

とします。

任意の関数 $u$ に対して

$$
\Delta_k
=
u(x_{k+1})-u(x_k)
$$

と置きます。

有限分布について、次の恒等式が成り立ちます。

$$
E[u(X)]
=
u(x_m)
-
\sum_{k=1}^{m-1}
\Delta_k F_X(x_k).
$$

実際、$p_i=P(X=x_i)$、$F_i=F_X(x_i)$ とすると

$$
p_i=F_i-F_{i-1},
\qquad
F_0=0.
$$

したがって

$$
\begin{aligned}
E[u(X)]
&=
\sum_{i=1}^m u(x_i)(F_i-F_{i-1})
\\
&=
u(x_m)F_m
-
\sum_{k=1}^{m-1}
F_k\{u(x_{k+1})-u(x_k)\}.
\end{aligned}
$$

$F_m=1$ なので恒等式が得られます。

$u$ が非減少なら

$$
\Delta_k\ge0.
$$

さらに $X\succeq_{\mathrm{FOSD}}Y$ なら

$$
F_X(x_k)\le F_Y(x_k).
$$

従って

$$
\begin{aligned}
E[u(X)]-E[u(Y)]
&=
\sum_{k=1}^{m-1}
\Delta_k
\{F_Y(x_k)-F_X(x_k)\}
\\
&\ge0.
\end{aligned}
$$

よって 1 から 2 が従います。

逆に 2 が成り立つとします。

任意の $k$ について

$$
u_k(x)
=
\begin{cases}
0 & x\le x_k,\\
1 & x>x_k
\end{cases}
$$

と置きます。これは支持上で非減少です。

すると

$$
E[u_k(X)]
=
P(X>x_k)
=
1-F_X(x_k),
$$

$$
E[u_k(Y)]
=
1-F_Y(x_k).
$$

仮定から

$$
1-F_X(x_k)
\ge
1-F_Y(x_k),
$$

すなわち

$$
F_X(x_k)\le F_Y(x_k).
$$

支持の間では分布関数は一定なので、全ての $t$ で同じ不等式が成り立ちます。

従って

$$
X\succeq_{\mathrm{FOSD}}Y.
$$

$\square$
<!-- proof-end -->

一次確率優越はリスク回避を仮定しません。単に「金額が多いほどよい」という全ての選好に共通する順序です。

---

## 6. 二次確率優越：リスク回避的な全員に共通する順序

一次確率優越では比較できない代表例が、

$$
S\equiv100
$$

と

$$
R=
\begin{cases}
80 & \text{確率 }1/2,\\
120 & \text{確率 }1/2
\end{cases}
$$

です。

$R$ には100より高い結果も低い結果もあるため、どちらも相手を一次確率優越しません。

しかし平均は同じ100です。凹効用なら、前半で証明した Jensen 型不等式から

$$
u(100)
\ge
\frac12u(80)+\frac12u(120).
$$

この比較を分布だけから判定するのが二次確率優越です。

各閾値 $t$ に対して

$$
L_X(t)
=
E[(t-X)_+],
\qquad
(a)_+=\max\{a,0\}
$$

と置きます。

$L_X(t)$ は、$X$ が $t$ を下回ったときの不足額を平均したものです。

有限支持では

$$
L_X(t)
=
\int_{-\infty}^t F_X(s)\,ds.
$$

実際、

$$
(t-X)_+
=
\int_{-\infty}^t
\mathbf 1_{\{X\le s\}}
\,ds
$$

を各有限個の実現値について足し合わせれば得られます。

<a id="def-micro12-ssd"></a>

<!-- formal-statement-start -->
> **定義（二次確率優越）**  
> 有限支持くじ $X,Y$ について、
>
$$
L_X(t)
\le
L_Y(t)
\qquad
(\forall t\in\mathbb R)
$$
>
> すなわち
>
$$
\int_{-\infty}^tF_X(s)\,ds
\le
\int_{-\infty}^tF_Y(s)\,ds
\qquad
(\forall t)
$$
>
> が成り立つとき、$X$ は $Y$ を **二次確率優越**するといい、
>
$$
X\succeq_{\mathrm{SSD}}Y
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-micro12-ssd -->
**定義の確認**：確実な100と80・120のくじ

$$
S\equiv100,
$$

$$
R=
\begin{cases}
80 & \text{確率 }1/2,\\
120 & \text{確率 }1/2
\end{cases}
$$

を考えます。

$t<80$ では両方

$$
L_S(t)=L_R(t)=0.
$$

$80\le t<100$ では

$$
L_S(t)=0,
$$

$$
L_R(t)
=
\frac12(t-80).
$$

従って

$$
L_S(t)\le L_R(t).
$$

$100\le t<120$ では

$$
L_S(t)=t-100,
$$

$$
L_R(t)=\frac12(t-80).
$$

差は

$$
L_R(t)-L_S(t)
=
\frac12(t-80)-(t-100)
=
60-\frac t2
\ge0.
$$

$t\ge120$ では両者の平均が100なので、

$$
L_S(t)=t-100,
$$

$$
L_R(t)
=
\frac12(t-80)+\frac12(t-120)
=
t-100.
$$

従って全ての $t$ で

$$
L_S(t)\le L_R(t).
$$

よって

$$
S\succeq_{\mathrm{SSD}}R.
$$
<!-- definition-example-end -->

<a id="thm-micro12-ssd-eu"></a>

<!-- formal-statement-start -->
> **定理（二次確率優越の期待効用特徴付け）**  
> $X,Y$ を有限支持くじとする。
>
> 次は同値である。
>
> 1.
>
$$
X\succeq_{\mathrm{SSD}}Y.
$$
>
> 2. 両くじの支持を含む区間上の任意の非減少凹関数 $u$ について
>
$$
E[u(X)]
\ge
E[u(Y)]
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

逆向きは

$$
u_t(x)=\min\{x,t\}
$$

という増加凹関数を入れるだけです。

順向きでは、有限個の支持点上の凹関数を折れ線で補間します。凹な折れ線は、線形関数から

$$
(t-x)_+
$$

型の折れ曲がりを非負係数で引いた形に分解できます。SSD の定義がまさにその期待値を比較しているため、全ての非減少凹効用に順位が移ります。

<!-- proof-start -->
### 証明

まず

$$
X\succeq_{\mathrm{SSD}}Y
$$

とします。

$X,Y$ の支持の合併を

$$
x_1<x_2<\cdots<x_m
$$

とします。

増加凹関数 $u$ を取り、隣接点間の傾きを

$$
s_k
=
\frac{u(x_{k+1})-u(x_k)}
{x_{k+1}-x_k}
\qquad
(k=1,\dots,m-1)
$$

と置きます。

$u$ は増加なので

$$
s_k\ge0.
$$

また凹性により傾きは減少するので

$$
s_1\ge s_2\ge\cdots\ge s_{m-1}\ge0.
$$

$$
\beta=s_{m-1},
$$

$$
c_j=s_{j-1}-s_j
\qquad
(j=2,\dots,m-1)
$$

と置けば、

$$
\beta\ge0,
\qquad
c_j\ge0.
$$

支持区間上の折れ線補間は、ある定数 $\alpha$ を用いて

$$
u(x)
=
\alpha+\beta x
-
\sum_{j=2}^{m-1}
c_j(x_j-x)_+
$$

と書けます。

実際、区間 $(x_k,x_{k+1})$ で右辺の傾きは

$$
\beta
+
\sum_{j=k+1}^{m-1}c_j
=
s_k
$$

となり、各区間で $u$ と同じ傾きを持ちます。定数 $\alpha$ を一つの点で一致させれば、全支持点で一致します。

従って、

$$
\begin{aligned}
E[u(X)]-E[u(Y)]
&=
\beta\{E[X]-E[Y]\}
\\
&\quad
-
\sum_{j=2}^{m-1}
c_j
\{
L_X(x_j)-L_Y(x_j)
\}.
\end{aligned}
$$

SSD の仮定から各 $j$ について

$$
L_X(x_j)-L_Y(x_j)\le0.
$$

さらに $t\ge x_m$ では

$$
L_X(t)=t-E[X],
$$

$$
L_Y(t)=t-E[Y].
$$

SSD 条件

$$
L_X(t)\le L_Y(t)
$$

より

$$
E[X]\ge E[Y].
$$

したがって右辺の第一項は非負で、各和の項も

$$
-c_j\{L_X(x_j)-L_Y(x_j)\}\ge0.
$$

よって

$$
E[u(X)]\ge E[u(Y)].
$$

これで 1 から 2 が示されました。

逆に、全ての増加凹関数 $u$ について

$$
E[u(X)]\ge E[u(Y)]
$$

が成り立つとします。

任意の $t\in\mathbb R$ に対して

$$
u_t(x)
=
\min\{x,t\}
=
t-(t-x)_+
$$

と置きます。

$u_t$ は増加かつ凹です。

したがって

$$
E[u_t(X)]
\ge
E[u_t(Y)].
$$

定義を代入すると、

$$
t-E[(t-X)_+]
\ge
t-E[(t-Y)_+].
$$

よって

$$
L_X(t)
\le
L_Y(t).
$$

これは全ての $t$ で成り立つので、

$$
X\succeq_{\mathrm{SSD}}Y.
$$

$\square$
<!-- proof-end -->

この定理から直ちに、

$$
X\succeq_{\mathrm{FOSD}}Y
\Longrightarrow
X\succeq_{\mathrm{SSD}}Y
$$

が従います。増加凹関数は増加関数の一部だからです。

逆は一般には成り立ちません。確実な100と80・120のくじがその反例でした。

---

## 7. mean-preserving spread：平均を変えずにリスクだけを広げる

「平均はそのまま、各結果の周りに追加のばらつきを載せる」という操作を明示します。

<a id="def-micro12-mps"></a>

<!-- formal-statement-start -->
> **定義（mean-preserving spread）**  
> 有限支持確率変数 $X$ に対し、同じ確率空間上の有限支持確率変数 $Y$ が
>
$$
E[Y\mid X=x]
=
x
$$
>
> を $P(X=x)>0$ である全ての $x$ について満たすとする。
>
> ここで有限離散の場合の条件付き期待値は

$$
E[Y\mid X=x]
=
\sum_y yP(Y=y\mid X=x)
$$

である。

この条件を満たす $Y$ を $X$ から得られる **mean-preserving spread** と呼ぶ。
<!-- formal-statement-end -->

これは、各元の結果 $x$ を「平均だけは $x$ のままの追加くじ」に置き換える操作です。

<!-- definition-example-start: def-micro12-mps -->
**定義の確認**：100を80・120へ広げる

$$
X\equiv100
$$

とします。

$X=100$ が起きた後に、

$$
Y=
\begin{cases}
80 & \text{確率 }1/2,\\
120 & \text{確率 }1/2
\end{cases}
$$

へ置き換えます。

条件付き平均は

$$
E[Y\mid X=100]
=
\frac12\cdot80+\frac12\cdot120
=
100
=
X.
$$

したがって $Y$ は $X$ の mean-preserving spread です。
<!-- definition-example-end -->

<a id="prop-micro12-mps-ssd"></a>

<!-- formal-statement-start -->
> **命題（mean-preserving spread は二次確率優越で悪化させる）**  
> $Y$ が有限支持確率変数 $X$ の mean-preserving spread であるとする。
>
> このとき
>
$$
E[Y]=E[X]
$$
>
> であり、
>
$$
X\succeq_{\mathrm{SSD}}Y.
$$
>
> 特に任意の増加凹効用 $u$ について
>
$$
E[u(X)]
\ge
E[u(Y)].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

条件付き平均保存から、

$$
E[Y]
=
\sum_x P(X=x)E[Y\mid X=x].
$$

仮定

$$
E[Y\mid X=x]=x
$$

を代入すると、

$$
E[Y]
=
\sum_x P(X=x)x
=
E[X].
$$

次に任意の凹関数 $u$ を取ります。

各 $x$ について、条件付き分布 $Y\mid X=x$ は有限支持です。

有限 Jensen 不等式より、

$$
u(E[Y\mid X=x])
\ge
E[u(Y)\mid X=x].
$$

左辺は平均保存条件から

$$
u(x)
$$

です。従って

$$
u(x)
\ge
E[u(Y)\mid X=x].
$$

両辺を $P(X=x)$ で重み付けして全ての $x$ について足すと、

$$
E[u(X)]
\ge
E[u(Y)].
$$

特に全ての非減少凹効用について成立するので、二次確率優越の期待効用特徴付けから

$$
X\succeq_{\mathrm{SSD}}Y.
$$

$\square$
<!-- proof-end -->

この命題は、凹効用・mean-preserving spread・二次確率優越を一つの図にまとめます。

$$
\boxed{
\text{平均を保つ拡散}
\Longrightarrow
\text{全ての凹効用で期待効用低下}
\Longrightarrow
\text{SSD で悪化}
}
$$

---

## 8. 平均と分散だけで十分なのは局所・特殊な場合

ここまでを見ると、リスク比較を平均と分散だけで行いたくなります。しかし一般にはそれでは足りません。

Arrow--Pratt の小リスク近似では

$$
\pi
\approx
\frac12A(w)\operatorname{Var}(X)
$$

となりましたが、これは $w$ の近くに集中した小さなリスクについての二次近似です。

大きなリスクでは効用関数の高次の形も効きます。また同じ平均・同じ分散でも分布の裾や歪みが違えば、増加凹効用全体での順位が一致するとは限りません。

一方、一次・二次確率優越は「ある一つの効用関数」ではなく、

- FOSD：全ての増加効用
- SSD：全ての非減少凹効用

に共通する順位を分布だけから取り出します。

したがって、

$$
\text{Arrow--Pratt}
$$

は **一人の滑らかな期待効用主体の局所的なリスク嫌悪**を、

$$
\text{確率優越}
$$

は **広い効用関数クラスに共通する分布の順位**を表しています。

---

# 演習

## Level A

<a id="ex-micro12-a01"></a>

### MICRO12-A01 凹性からリスク回避を確認する

- Level: A
- 目安時間: 15分

$$
u(w)=\sqrt w
$$

とし、

$$
X=
\begin{cases}
25 & \text{確率 }1/2,\\
225 & \text{確率 }1/2
\end{cases}
$$

とする。

1. $E[X]$ を求めよ。
2. $u(E[X])$ と $E[u(X)]$ を求めよ。
3. このくじに対して平均額を確実に受け取る方が好まれることを確認せよ。

<!-- solution-start -->
#### 詳細解答

平均は

$$
E[X]
=
\frac12\cdot25+\frac12\cdot225
=
\frac{250}{2}
=
125.
$$

したがって

$$
u(E[X])
=
\sqrt{125}
=
5\sqrt5.
$$

一方、

$$
E[u(X)]
=
\frac12\sqrt{25}
+
\frac12\sqrt{225}
=
\frac12\cdot5+\frac12\cdot15
=
10.
$$

比較すると、

$$
5\sqrt5>10
$$

です。実際、両辺は正なので平方して

$$
125>100
$$

と確認できます。

よって

$$
u(E[X])>E[u(X]).
$$

したがってこの非退化なくじに対し、平均125を確実に受け取る方が好まれます。
<!-- solution-end -->

<a id="ex-micro12-a02"></a>

### MICRO12-A02 確実性等価とリスクプレミアム

- Level: A
- 目安時間: 15分

$$
u(w)=\sqrt w
$$

の下で、

$$
X=
\begin{cases}
0 & \text{確率 }1/4,\\
16 & \text{確率 }3/4
\end{cases}
$$

とする。

1. $E[u(X)]$ を求めよ。
2. 確実性等価 $c(X)$ を求めよ。
3. 平均 $E[X]$ とリスクプレミアム $\pi(X)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

期待効用は

$$
E[u(X)]
=
\frac14\sqrt0+\frac34\sqrt{16}
=
0+\frac34\cdot4
=
3.
$$

確実性等価 $c$ は

$$
\sqrt c=3
$$

を満たすので、

$$
\boxed{
c(X)=9
}
$$

です。

平均は

$$
E[X]
=
\frac14\cdot0+\frac34\cdot16
=
12.
$$

したがってリスクプレミアムは

$$
\pi(X)
=
E[X]-c(X)
=
12-9
=
\boxed{3}.
$$

凹効用なので確実性等価9は平均12より小さく、リスクプレミアムは正です。
<!-- solution-end -->

<a id="ex-micro12-a03"></a>

### MICRO12-A03 Arrow--Pratt 指標を計算する

- Level: A
- 目安時間: 20分

次の効用関数について絶対的リスク回避度 $A(w)$ と相対的リスク回避度 $R(w)$ を求めよ。

1.
$$
u(w)=-e^{-2w}.
$$

2.
$$
u(w)=\log w,
\qquad
w>0.
$$

<!-- solution-start -->
#### 詳細解答

1. まず

$$
u'(w)=2e^{-2w},
$$

$$
u''(w)=-4e^{-2w}.
$$

従って

$$
A(w)
=
-\frac{u''(w)}{u'(w)}
=
-\frac{-4e^{-2w}}{2e^{-2w}}
=
2.
$$

よって

$$
\boxed{
A(w)=2
}
$$

です。

相対的リスク回避度は

$$
R(w)
=
wA(w)
=
\boxed{2w}.
$$

2. $u(w)=\log w$ では

$$
u'(w)=\frac1w,
$$

$$
u''(w)=-\frac1{w^2}.
$$

従って

$$
A(w)
=
-\frac{-1/w^2}{1/w}
=
\frac1w.
$$

また

$$
R(w)
=
w\cdot\frac1w
=
1.
$$

したがって

$$
\boxed{
A(w)=\frac1w,
\qquad
R(w)=1
}
$$

です。
<!-- solution-end -->

<a id="ex-micro12-a04"></a>

### MICRO12-A04 一次確率優越を判定する

- Level: A
- 目安時間: 20分

$$
X=
\begin{cases}
2 & \text{確率 }1/4,\\
5 & \text{確率 }3/4,
\end{cases}
$$

$$
Y=
\begin{cases}
1 & \text{確率 }1/2,\\
5 & \text{確率 }1/2
\end{cases}
$$

とする。

1. $F_X(t),F_Y(t)$ を区間ごとに書け。
2. $X$ と $Y$ のどちらが一次確率優越するか判定せよ。

<!-- solution-start -->
#### 詳細解答

$X$ の分布関数は

$$
F_X(t)
=
\begin{cases}
0 & t<2,\\
1/4 & 2\le t<5,\\
1 & t\ge5.
\end{cases}
$$

$Y$ の分布関数は

$$
F_Y(t)
=
\begin{cases}
0 & t<1,\\
1/2 & 1\le t<5,\\
1 & t\ge5.
\end{cases}
$$

区間ごとに比較します。

- $t<1$ では両方0
- $1\le t<2$ では $F_X(t)=0\le1/2=F_Y(t)$
- $2\le t<5$ では $F_X(t)=1/4\le1/2=F_Y(t)$
- $t\ge5$ では両方1

従って全ての $t$ で

$$
F_X(t)\le F_Y(t).
$$

よって

$$
\boxed{
X\succeq_{\mathrm{FOSD}}Y
}
$$

です。

このため任意の非減少効用 $u$ について

$$
E[u(X)]\ge E[u(Y)]
$$

が成り立ちます。
<!-- solution-end -->

## Level B

<a id="ex-micro12-b01"></a>

### MICRO12-B01 リスク回避から凹性を再構成する

- Level: B
- 目安時間: 25分

増加効用 $u$ が有限支持くじの期待効用を表すとする。

任意の有限支持くじ $X$ について

$$
u(E[X])\ge E[u(X)]
$$

が成り立つと仮定する。

任意の $x,y$ と $\lambda\in[0,1]$ に対して

$$
u(\lambda x+(1-\lambda)y)
\ge
\lambda u(x)+(1-\lambda)u(y)
$$

を導き、$u$ が凹であることを示せ。

<!-- solution-start -->
#### 詳細解答

凹性を示すには、任意の二点 $x,y$ と重み $\lambda$ について定義の不等式を出せば十分です。

そこで二点くじ

$$
X=
\begin{cases}
x & \text{確率 }\lambda,\\
y & \text{確率 }1-\lambda
\end{cases}
$$

を考えます。

この平均は

$$
E[X]
=
\lambda x+(1-\lambda)y.
$$

また期待効用は

$$
E[u(X)]
=
\lambda u(x)+(1-\lambda)u(y).
$$

仮定されたリスク回避条件

$$
u(E[X])\ge E[u(X)]
$$

へ代入すると、

$$
u(\lambda x+(1-\lambda)y)
\ge
\lambda u(x)+(1-\lambda)u(y).
$$

$x,y,\lambda$ は任意だったので、これは $u$ の凹性の定義です。

従って

$$
\boxed{
u\text{ は凹関数}
}
$$

です。

ポイントは、全てのくじを使う必要はなく、二点くじだけで凹性を回収できることです。
<!-- solution-end -->

<a id="ex-micro12-b02"></a>

### MICRO12-B02 FOSD では比較できないが SSD では比較できる

- Level: B
- 目安時間: 30分

$$
S\equiv10,
$$

$$
R=
\begin{cases}
6 & \text{確率 }1/2,\\
14 & \text{確率 }1/2
\end{cases}
$$

とする。

1. $S$ が $R$ を一次確率優越しないことを示せ。
2. $R$ が $S$ を一次確率優越しないことも示せ。
3. 下方部分期待値
$$
L_X(t)=E[(t-X)_+]
$$
を比較し、
$$
S\succeq_{\mathrm{SSD}}R
$$
を示せ。

<!-- solution-start -->
#### 詳細解答

まず分布関数を見ます。

$S$ は10で確実なので、

$$
F_S(t)
=
\begin{cases}
0 & t<10,\\
1 & t\ge10.
\end{cases}
$$

$R$ は6と14を等確率で取るので、

$$
F_R(t)
=
\begin{cases}
0 & t<6,\\
1/2 & 6\le t<14,\\
1 & t\ge14.
\end{cases}
$$

$6\le t<10$ では

$$
F_S(t)=0<F_R(t)=1/2.
$$

これは $S$ が $R$ よりよい方向です。

しかし $10\le t<14$ では

$$
F_S(t)=1>F_R(t)=1/2.
$$

不等号が逆転します。

したがって

$$
S\succeq_{\mathrm{FOSD}}R
$$

ではありません。

同じ逆転により

$$
R\succeq_{\mathrm{FOSD}}S
$$

でもありません。

次に下方部分期待値を計算します。

$t<6$ では

$$
L_S(t)=L_R(t)=0.
$$

$6\le t<10$ では

$$
L_S(t)=0,
$$

$$
L_R(t)=\frac12(t-6).
$$

従って

$$
L_S(t)\le L_R(t).
$$

$10\le t<14$ では

$$
L_S(t)=t-10,
$$

$$
L_R(t)=\frac12(t-6).
$$

差は

$$
L_R(t)-L_S(t)
=
\frac12(t-6)-(t-10)
=
7-\frac t2.
$$

$t<14$ なので

$$
7-\frac t2>0.
$$

従ってこの区間でも

$$
L_S(t)\le L_R(t).
$$

$t\ge14$ では両者の平均が10なので、

$$
L_S(t)=t-10,
$$

$$
L_R(t)
=
\frac12(t-6)+\frac12(t-14)
=
t-10.
$$

よって全ての $t$ で

$$
L_S(t)\le L_R(t).
$$

したがって

$$
\boxed{
S\succeq_{\mathrm{SSD}}R
}
$$

です。

これは、全ての非減少凹効用を持つリスク回避主体が確実な10を弱く好むことと同値です。
<!-- solution-end -->

<a id="ex-micro12-b03"></a>

### MICRO12-B03 小リスク近似と CARA の厳密値を比べる

- Level: B
- 目安時間: 35分

効用を

$$
u(w)=-e^{-aw},
\qquad
a>0
$$

とする。

富 $w$ に対し、

$$
X=
\begin{cases}
w-h & \text{確率 }1/2,\\
w+h & \text{確率 }1/2
\end{cases}
$$

という平均ゼロの対称リスクを考える。

1. 確実性等価 $c(X)$ を厳密に求めよ。
2. リスクプレミアム $\pi(X)=w-c(X)$ を求めよ。
3. $h\to0$ で
$$
\pi(X)=\frac12ah^2+o(h^2)
$$
となることを確認せよ。

<!-- solution-start -->
#### 詳細解答

期待効用は

$$
\begin{aligned}
E[u(X)]
&=
-\frac12e^{-a(w-h)}
-\frac12e^{-a(w+h)}
\\
&=
-e^{-aw}
\frac{e^{ah}+e^{-ah}}{2}.
\end{aligned}
$$

双曲線余弦

$$
\cosh z
=
\frac{e^z+e^{-z}}2
$$

を使うと、

$$
E[u(X)]
=
-e^{-aw}\cosh(ah).
$$

確実性等価 $c$ は

$$
-e^{-ac}
=
-e^{-aw}\cosh(ah)
$$

を満たします。

符号を消して対数を取ると、

$$
-ac
=
-aw+\log\cosh(ah).
$$

従って

$$
\boxed{
c(X)
=
w-\frac1a\log\cosh(ah)
}
$$

です。

よってリスクプレミアムは

$$
\boxed{
\pi(X)
=
\frac1a\log\cosh(ah)
}
$$

です。

次に $h\to0$ の展開を使います。

$$
\cosh z
=
1+\frac{z^2}{2}+O(z^4).
$$

したがって

$$
\log\cosh z
=
\frac{z^2}{2}+O(z^4).
$$

$z=ah$ を代入すると、

$$
\pi(X)
=
\frac1a
\left(
\frac{a^2h^2}{2}
+
O(h^4)
\right).
$$

従って

$$
\boxed{
\pi(X)
=
\frac12ah^2
+
O(h^4)
}
$$

です。

特に

$$
\pi(X)
=
\frac12ah^2+o(h^2).
$$

CARA 効用では

$$
A(w)=a.
$$

またこの対称リスクの分散は

$$
\operatorname{Var}(X)=h^2.
$$

したがって一般の小リスク近似

$$
\frac12A(w)\operatorname{Var}(X)
$$

と一致します。
<!-- solution-end -->

## Level C

<a id="ex-micro12-c01"></a>

### MICRO12-C01 三つのくじをリスク回避・確率優越・Arrow--Pratt で統合比較する

- Level: C
- 目安時間: 60分

三つのくじを

$$
A\equiv100,
$$

$$
B=
\begin{cases}
80 & \text{確率 }1/2,\\
120 & \text{確率 }1/2,
\end{cases}
$$

$$
C=
\begin{cases}
60 & \text{確率 }1/2,\\
140 & \text{確率 }1/2
\end{cases}
$$

とする。

1. 三つの平均を求めよ。
2. $A,B,C$ の間では FOSD による比較が成立しない組があることを確認せよ。
3. $B$ が $A$ の mean-preserving spread、$C$ が $B$ からさらに平均を保って広げた分布として構成できることを示せ。
4.
$$
A\succeq_{\mathrm{SSD}}B\succeq_{\mathrm{SSD}}C
$$
を示せ。
5. $u(w)=\sqrt w$ の下で三つの期待効用を比較せよ。
6. $u_1(w)=\log w$ と
$$
u_2(w)=-\frac1w
$$
について相対的リスク回避度を計算し、どちらが Arrow--Pratt の意味でよりリスク回避的か判定せよ。

<!-- solution-start -->
#### 詳細解答

1. 平均は

$$
E[A]=100.
$$

$$
E[B]
=
\frac12\cdot80+\frac12\cdot120
=
100.
$$

$$
E[C]
=
\frac12\cdot60+\frac12\cdot140
=
100.
$$

したがって三つとも平均100です。

2. 例えば $A$ と $B$ を比べます。

$80\le t<100$ では

$$
F_A(t)=0,
\qquad
F_B(t)=1/2.
$$

従ってこの区間では

$$
F_A(t)<F_B(t).
$$

一方、$100\le t<120$ では

$$
F_A(t)=1,
\qquad
F_B(t)=1/2.
$$

不等号が逆転します。

したがって $A$ と $B$ の間に FOSD は成立しません。

同様に $B$ と $C$ でも分布関数が交差するので、平均保存型のリスク増加を FOSD だけでは捉えられません。

3. $A=100$ が実現した後、

$$
80,\ 120
$$

を等確率で選べば条件付き平均は

$$
\frac12(80+120)=100.
$$

従って $B$ は $A$ の mean-preserving spread です。

次に $B$ から $C$ を作ります。

$B=80$ のとき

$$
Y=
\begin{cases}
60 & \text{確率 }3/4,\\
140 & \text{確率 }1/4
\end{cases}
$$

とすると、

$$
E[Y\mid B=80]
=
\frac34\cdot60+\frac14\cdot140
=
45+35
=
80.
$$

$B=120$ のとき

$$
Y=
\begin{cases}
60 & \text{確率 }1/4,\\
140 & \text{確率 }3/4
\end{cases}
$$

とすると、

$$
E[Y\mid B=120]
=
\frac14\cdot60+\frac34\cdot140
=
15+105
=
120.
$$

さらに $B$ 自体が80と120を等確率で取るので、$Y=60$ の無条件確率は

$$
\frac12\cdot\frac34
+
\frac12\cdot\frac14
=
\frac12,
$$

$Y=140$ も同様に $1/2$ です。

従って $Y$ の周辺分布はちょうど $C$ であり、$C$ は $B$ の mean-preserving spread として構成できます。

4. mean-preserving spread は SSD で悪化させる命題から、

$$
A\succeq_{\mathrm{SSD}}B
$$

かつ

$$
B\succeq_{\mathrm{SSD}}C.
$$

したがって

$$
\boxed{
A\succeq_{\mathrm{SSD}}B\succeq_{\mathrm{SSD}}C
}
$$

です。

5. 平方根効用では

$$
E[u(A)]
=
10.
$$

$$
E[u(B)]
=
\frac12\sqrt{80}
+
\frac12\sqrt{120}.
$$

$$
E[u(C)]
=
\frac12\sqrt{60}
+
\frac12\sqrt{140}.
$$

数値化せずとも、$u(w)=\sqrt w$ は増加凹関数なので SSD の順位から

$$
\boxed{
E[u(A)]
\ge
E[u(B)]
\ge
E[u(C)]
}
$$

が直ちに従います。

しかも $u$ は狭義凹で、各 spread は非退化なので不等号は狭義です。

6. まず

$$
u_1(w)=\log w
$$

では

$$
u_1'(w)=\frac1w,
\qquad
u_1''(w)=-\frac1{w^2}.
$$

従って

$$
R_1(w)
=
-w
\frac{-1/w^2}{1/w}
=
1.
$$

次に

$$
u_2(w)=-\frac1w
$$

では

$$
u_2'(w)=\frac1{w^2},
$$

$$
u_2''(w)=-\frac2{w^3}.
$$

したがって

$$
R_2(w)
=
-w
\frac{-2/w^3}{1/w^2}
=
2.
$$

よって

$$
R_2(w)>R_1(w)
$$

です。

絶対的リスク回避度も

$$
A_1(w)=\frac1w,
\qquad
A_2(w)=\frac2w
$$

なので全ての $w>0$ で

$$
A_2(w)>A_1(w).
$$

Arrow--Pratt のリスク回避順序の定理から、

$$
\boxed{
u_2\text{ の主体の方が }u_1\text{ の主体よりリスク回避的}
}
$$

と判定できます。
<!-- solution-end -->

---

MICRO11 が「なぜ期待効用という形でくじを評価できるのか」を公理から与えたのに対し、本章は、その結果効用の **凹性と曲率**がリスク態度を決め、さらに効用関数を特定しなくても分布だけで比較できる **一次・二次確率優越**へ進みました。

次の MICRO13 では、不確実性ではなく **時間**をまたぐ選択へ移り、現在消費と将来消費の交換、利子率、貯蓄・借入、Euler 方程式を扱います。
