# F0-00P2A 期待値・LOTUS：確率空間から分布上の積分へ

P2で分布の密度をRadon--Nikodym微分として統一しました。次に期待値を

$$E[g(X)]=\int_\Omega g(X(\omega))\,dP(\omega)=\int g(x)\,dP_X(x)$$

という**押し出し積分公式（LOTUS）**として整理します。離散和と連続積分を別公式として暗記する必要はありません。

---

## 1. 期待値は確率測度に関する積分

確率変数 $X$ の期待値は

$$
\boxed{
E[X]
=\int_\Omega X(\omega)\,dP(\omega)
}
$$

です。

より一般に可測関数 $g$ について

$$
E[g(X)]
=\int_\Omega g(X(\omega))\,dP(\omega).
$$

これは「標本空間上で平均を取る」という定義です。

---

## 2. なぜ分布だけで期待値を計算できるのか

$P_X$ は $X$ による押し出し測度でした。

押し出し測度の積分公式から

$$
\boxed{
\int_\Omega g(X(\omega))\,dP(\omega)
=
\int_{\mathbb R}g(x)\,dP_X(x)
}
$$

です。

したがって

$$
\boxed{
E[g(X)]
=\int g(x)\,dP_X(x)
}
$$

となります。

これをLOTUS、law of the unconscious statistician と呼ぶことがあります。

この名前は冗談めいていますが、内容は真面目です。

> $g(X)$ の分布をいちいち求めなくても、$X$ の分布に対して $g$ を積分すればよい

という定理です。

---

## 3. 離散・連続の期待値公式は同じ式

離散分布なら

$$
P_X=\sum_x p_X(x)\delta_x
$$

なので

$$
E[g(X)]
=\sum_x g(x)p_X(x).
$$

連続分布なら

$$
dP_X=f_X(x)\,dx
$$

なので

$$
E[g(X)]
=\int g(x)f_X(x)\,dx.
$$

どちらも

$$
\int g\,dP_X
$$

の特殊形です。

---

## 4. 分散・モーメントも測度積分

$$
E[X^k]
=\int x^k\,dP_X(x)
$$

が $k$ 次モーメントです。

平均 $\mu=E[X]$ が存在するとき

$$
\operatorname{Var}(X)
=E[(X-\mu)^2]
$$

です。

有限分散という条件は

$$
X\in L^2(P)
$$

と言い換えられます。

有限平均は

$$
X\in L^1(P)
$$

です。

この言い換えによって、確率論と関数解析が直接接続します。

---

## 5. 期待値の線形性は積分の線形性

可積分な $X,Y$ と定数 $a,b$ に対して

$$
E[aX+bY]
=aE[X]+bE[Y].
$$

これは確率特有の魔法ではなく、Lebesgue積分の線形性です。

同様に

$$
X\ge0
\Longrightarrow E[X]\ge0
$$

も積分の単調性です。

通常教材で期待値の性質として並ぶ公式のかなりの部分は、測度積分の一般定理を確率測度へ適用したものです。

---

## 5A. 後で繰り返し使う確率測度の2つの基本性質

Borel--Cantelli補題へ進む前に、確率測度の可算加法性から導かれる2つの道具を正本化しておきます。

<a id="thm-f0-00p2a-union-bound"></a>

<!-- formal-statement-start -->
> **定理（可算劣加法性・union bound）**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ に対して

$$
\boxed{
P\left(\bigcup_{n=1}^{\infty}A_n\right)
\le
\sum_{n=1}^{\infty}P(A_n)
}
$$

> が成り立ちます。有限個の場合も同じ不等式です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：重なりを除いて互いに素な事象へ直す

$$
B_1:=A_1,
\qquad
B_n:=A_n\setminus\bigcup_{k<n}A_k
\quad(n\ge2)
$$

と置きます。$B_n$ は互いに素で、$B_n\subset A_n$、かつ

$$
\bigcup_{n=1}^{\infty}B_n
=
\bigcup_{n=1}^{\infty}A_n
$$

です。したがって確率測度の可算加法性と単調性から

$$
P\left(\bigcup_{n=1}^{\infty}A_n\right)
=
\sum_{n=1}^{\infty}P(B_n)
\le
\sum_{n=1}^{\infty}P(A_n).
$$

$\square$
<!-- proof-end -->

<a id="thm-f0-00p2a-continuity-from-above"></a>

<!-- formal-statement-start -->
> **定理（確率測度の上からの連続性）**  
> 事象列が

$$
A_1\supset A_2\supset\cdots
$$

> と単調減少し、$A:=\bigcap_{n=1}^{\infty}A_n$ とします。このとき

$$
\boxed{P(A_n)\downarrow P(A)}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：補集合側を増加列にして下からの連続性へ戻す

$$
B_n:=A_1\setminus A_n
$$

と置くと $B_n\uparrow A_1\setminus A$ です。測度の下からの連続性より

$$
P(B_n)\uparrow P(A_1\setminus A).
$$

ここで $P(A_1)\le1<\infty$ なので

$$
P(A_n)=P(A_1)-P(B_n)
$$

と引き算でき、極限を取れば

$$
P(A_n)\downarrow P(A_1)-P(A_1\setminus A)=P(A).
$$

$\square$
<!-- proof-end -->

上からの連続性で有限性が必要になる点は重要です。一般の測度では $\mu(A_1)=\infty$ のとき同じ引き算はできませんが、確率測度では常に $P(A_1)\le1$ なので自動的に条件を満たします。

---

<a id="thm-f0-00p2a-markov"></a>

## 6. Markovの不等式：期待値からtail確率を抑える

<!-- formal-statement-start -->
> **定理（Markovの不等式）**  
> 非負確率変数 $Y\ge0$ が $E[Y]<\infty$ を満たすとします。このとき任意の $a>0$ に対して

$$
\boxed{
P(Y\ge a)\le\frac{E[Y]}{a}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

事象 $\{Y\ge a\}$ 上では $Y\ge a$、それ以外では左辺が0なので、点ごとに

$$
a\mathbf1_{\{Y\ge a\}}\le Y
$$

が成り立ちます。両辺の期待値を取ると

$$
aP(Y\ge a)
=aE[\mathbf1_{\{Y\ge a\}}]
\le E[Y].
$$

$a>0$ で割れば

$$
P(Y\ge a)\le\frac{E[Y]}{a}.
$$

$\square$
<!-- proof-end -->

特に $p>0$ とし、$Y=|X|^p$、$a=\varepsilon^p$ と置けば

$$
\boxed{
P(|X|>\varepsilon)
\le
\frac{E|X|^p}{\varepsilon^p}
}
$$

を得ます。この形は、後で $L^p$ 収束から確率収束を導くときや、$L^2$ 収束から確率の大きい部分列を抜き出すときに使います。

---

## 7. 期待値の極限交換も積分論になる

$X_n\to X$ a.s. だけでは一般に

$$
E[X_n]\to E[X]
$$

とは限りません。

しかし例えば

$$
|X_n|\le Y,
\qquad E[Y]<\infty
$$

なら優収束定理から

$$
\boxed{
E[X_n]\to E[X]
}
$$

です。

また $0\le X_n\uparrow X$ なら単調収束定理から交換できます。

この視点は後の尤度微分や漸近統計で重要になります。

---

## 8. 密度はa.e.一意である

Radon--Nikodym微分は基準測度に関してa.e.一意です。

したがってpdf $f_X$ も一点で値を変えても同じ分布を表します。

例えば正規密度の一点だけを1000へ変更しても、対応する確率測度は変わりません。

pdfは「各点の確率」ではありません。

連続分布では

$$
P(X=x)=0
$$

であっても

$$
f_X(x)>0
$$

でよいのはこのためです。

---

## 演習

### F0-00P2A-A01 LOTUSで期待値を計算する

- Level: A
- 目安時間: 10分

$X\sim\mathrm{Unif}(0,1)$ とする。LOTUSを用いて $E[X^2]$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$P_X$ のLebesgue密度は1なので $E[X^2]=\int_0^1x^2dx=1/3$。

#### 本番答案
$E[X^2]=\int_0^1x^2dx=1/3$。

#### 採点基準（20点）
- LOTUSの式: 8点
- 積分: 8点
- 結論: 4点
<!-- solution-end -->

### F0-00P2A-B01 押し出し積分公式を説明する

- Level: B
- 目安時間: 15分

$P_X=P\circ X^{-1}$ のとき、可積分な $g$ に対して $E[g(X)]=\int g\,dP_X$ となる理由を、指示関数→単関数→一般の可測関数の順に説明せよ。

<!-- solution-start -->
#### 詳細解答
$g=\mathbf1_B$ では両辺は $P(X\in B)=P_X(B)$。有限線形結合である単関数へ線形性で拡張し、非負可測関数は単関数の単調近似とMCT、符号付き可積分関数は正負部分へ分解して従う。

#### 本番答案
指示関数で押し出しの定義そのもの。単関数へ線形拡張し、MCTで非負可測関数、正負部分分解で可積分関数へ拡張する。

#### 採点基準（20点）
- 指示関数: 5点
- 単関数: 4点
- MCT: 6点
- 符号付き関数: 5点
<!-- solution-end -->

---

## 次に進む

期待値を積分として使えるようになったら [F0-00P3](../F0_00P3_独立_積測度_条件付き期待値/index.md) で独立性と積測度へ進みます。
