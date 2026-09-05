# F0-00P2A 期待値・LOTUS：確率空間から分布上の積分へ

P2で分布の密度をRadon--Nikodym微分として統一しました。次に期待値を

$$
E[g(X)]=\int_\Omega g(X(\omega))\,dP(\omega)=\int g(x)\,dP_X(x)
$$

という**押し出し積分公式（LOTUS）**として整理します。離散和と連続積分を別公式として暗記する必要はありません。

---

## 1. 期待値は確率測度に関する積分

確率変数 $X$ の期待値は

$$
\boxed{E[X]=\int_\Omega X(\omega)\,dP(\omega)}
$$

です。

より一般に可測関数 $g$ について

$$
E[g(X)]=\int_\Omega g(X(\omega))\,dP(\omega).
$$

これは「標本空間上で平均を取る」という定義です。

---

## 2. 押し出し積分公式：なぜ分布だけで期待値を計算できるのか

$P_X=P\circ X^{-1}$ は $X$ による押し出し測度です。

<a id="thm-f0-00p2a-pushforward-integration"></a>

<!-- formal-statement-start -->
> **定理（押し出し積分公式・LOTUS）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の実数値確率変数 $X$ と、その分布

$$
P_X=P\circ X^{-1}
$$

> を考えます。Borel可測関数 $g:\mathbb R\to[0,\infty]$ に対して

$$
\boxed{
\int_\Omega g(X(\omega))\,dP(\omega)
=\int_{\mathbb R}g(x)\,dP_X(x)
}
$$

> が成り立ちます。$g(X)\in L^1(P)$ の場合には、符号を持つ実数値 $g$ に対しても同じ等式が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：指示関数 → 単関数 → 非負可測関数 → 可積分関数

まず $g=\mathbf1_B$、$B\in\mathcal B(\mathbb R)$ とします。押し出し測度の定義から

$$
\begin{aligned}
\int_\Omega \mathbf1_B(X(\omega))\,dP(\omega)
&=P(X\in B)\\
&=P(X^{-1}(B))\\
&=P_X(B)\\
&=\int_{\mathbb R}\mathbf1_B(x)\,dP_X(x).
\end{aligned}
$$

次に非負単関数

$$
s(x)=\sum_{j=1}^m a_j\mathbf1_{B_j}(x),
\qquad a_j\ge0,
$$

に対しては、積分の線形性から

$$
\int_\Omega s(X)\,dP
=\sum_{j=1}^m a_jP(X\in B_j)
=\sum_{j=1}^m a_jP_X(B_j)
=\int_{\mathbb R}s\,dP_X.
$$

一般の非負Borel可測関数 $g$ には、非負単関数列 $s_n$ を

$$
0\le s_n\uparrow g
$$

となるように取れます。このとき $s_n(X)\uparrow g(X)$ なので、両側で単調収束定理を使うと

$$
\begin{aligned}
\int_\Omega g(X)\,dP
&=\lim_{n\to\infty}\int_\Omega s_n(X)\,dP\\
&=\lim_{n\to\infty}\int_{\mathbb R}s_n\,dP_X\\
&=\int_{\mathbb R}g\,dP_X.
\end{aligned}
$$

最後に符号を持つ可積分 $g$ は

$$
g=g^+-g^-
$$

と分解します。非負関数の場合を $g^+,g^-$ に適用し、可積分性により両者の積分が有限なので差を取れます。これで可積分な場合も従います。$\square$
<!-- proof-end -->

したがって

$$
\boxed{E[g(X)]=\int g(x)\,dP_X(x)}
$$

となります。これをLOTUS、law of the unconscious statistician と呼ぶことがあります。

名前は冗談めいていますが、内容は

> $g(X)$ の分布をいちいち求めなくても、$X$ の分布に対して $g$ を積分すればよい

という厳密な押し出し積分公式です。

---

## 3. 離散・連続の期待値公式は同じ式

離散分布なら

$$
P_X=\sum_x p_X(x)\delta_x
$$

なので

$$
E[g(X)]=\sum_x g(x)p_X(x).
$$

連続分布なら

$$
dP_X=f_X(x)\,dx
$$

なので

$$
E[g(X)]=\int g(x)f_X(x)\,dx.
$$

どちらも

$$
\int g\,dP_X
$$

の特殊形です。

---

## 4. 分散・モーメントも測度積分

$$
E[X^k]=\int x^k\,dP_X(x)
$$

が $k$ 次モーメントです。

平均 $\mu=E[X]$ が存在するとき

$$
\operatorname{Var}(X)=E[(X-\mu)^2]
$$

です。

有限分散という条件は $X\in L^2(P)$、有限平均は $X\in L^1(P)$ と言い換えられます。この言い換えによって、確率論と関数解析が直接接続します。

---

## 5. 期待値の線形性は積分の線形性

可積分な $X,Y$ と定数 $a,b$ に対して

$$
E[aX+bY]=aE[X]+bE[Y].
$$

これは確率特有の魔法ではなく、Lebesgue積分の線形性です。

同様に

$$
X\ge0\Longrightarrow E[X]\ge0
$$

も積分の単調性です。

通常教材で期待値の性質として並ぶ公式のかなりの部分は、測度積分の一般定理を確率測度へ適用したものです。

---

## 6. 期待値の極限交換も積分論になる

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
\boxed{E[X_n]\to E[X]}
$$

です。また $0\le X_n\uparrow X$ なら単調収束定理から交換できます。

この視点は後の尤度微分や漸近統計で重要になります。

---

## 7. 密度はa.e.一意である

Radon--Nikodym微分は基準測度に関してa.e.一意です。

したがってpdf $f_X$ も一点で値を変えても同じ分布を表します。例えば正規密度の一点だけを1000へ変更しても、対応する確率測度は変わりません。

pdfは「各点の確率」ではありません。連続分布では

$$
P(X=x)=0
$$

であっても $f_X(x)>0$ でよいのはこのためです。

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
