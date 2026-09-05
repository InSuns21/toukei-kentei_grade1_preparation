# F0-00P3D：pushforward積分・LOTUS・Doob--Dynkin

P2AではLOTUSを使い、P3Aでは

$$
E[X\mid Y]=m(Y)
$$

という形を使いました。この補講では、その2本の床を証明します。

```text
標本空間 Ω
  │ Y
  ↓
観測空間 R

積分を下へ移す   → pushforward / LOTUS
可測関数を上へ戻す → Doob--Dynkin
```

---

## 1. 押し出し測度

可測写像

$$
Y:(\Omega,\mathcal F)\to(S,\mathcal S)
$$

と、$\Omega$ 上の確率測度 $P$ を考えます。$Y$ による押し出し測度は

$$
\boxed{P_Y(B):=P(Y^{-1}(B)),\qquad B\in\mathcal S}
$$

です。確率変数の「分布」は、この押し出し測度そのものです。

---

## 2. pushforward integration formula

<a id="thm-f0-00p3d-pushforward-integration"></a>

<!-- formal-statement-start -->
> **定理（押し出し積分公式）**  
> $Y:(\Omega,\mathcal F,P)\to(S,\mathcal S)$ を可測写像、$P_Y=P\circ Y^{-1}$ とする。非負可測関数 $g:S\to[0,\infty]$ に対して次が成り立つ。

$$
\boxed{
\int_\Omega g(Y(\omega))\,P(d\omega)
=
\int_S g(y)\,P_Y(dy)
}
$$

さらに $g\circ Y\in L^1(P)$ なら、符号付き可積分関数 $g$ にも同じ式が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**Step 1：指示関数**  
$g=\mathbf1_B$、$B\in\mathcal S$ なら

$$
\int_\Omega\mathbf1_B(Y)dP
=P(Y\in B)
=P_Y(B)
=
\int_S\mathbf1_B(y)P_Y(dy).
$$

**Step 2：非負単関数**  

$$
g=\sum_{k=1}^m a_k\mathbf1_{B_k},
\qquad a_k\ge0
$$

なら、Step 1と積分の線形性から

$$
\int g\circ Y\,dP
=
\sum_k a_kP_Y(B_k)
=
\int g\,dP_Y.
$$

**Step 3：非負可測関数**  
$0\le g_n\uparrow g$ となる非負単関数列を取れば

$$
0\le g_n\circ Y\uparrow g\circ Y.
$$

単調収束定理より

$$
\begin{aligned}
\int g\circ Y\,dP
&=\lim_n\int g_n\circ Y\,dP\\
&=\lim_n\int g_n\,dP_Y\\
&=\int g\,dP_Y.
\end{aligned}
$$

**Step 4：符号付き可積分関数**  
$g=g^+-g^-$ と分解します。非負版を $|g|$ に適用すると

$$
\int|g|\,dP_Y
=
\int|g\circ Y|\,dP
<\infty.
$$

従って $g^+,g^-$ の両方に非負版を適用して差を取れます。$\square$
<!-- proof-end -->

---

## 3. LOTUS はこの定理そのもの

$S=\mathbb R$、$Y=X$ とすれば

$$
\boxed{
E[g(X)]
=
\int_\Omega g(X(\omega))dP(\omega)
=
\int_\mathbb R g(x)P_X(dx)
}.
$$

離散分布なら

$$
E[g(X)]=\sum_x g(x)p_X(x),
$$

密度 $f_X$ があれば

$$
E[g(X)]=\int g(x)f_X(x)dx.
$$

離散公式と連続公式は別定理ではなく、押し出し積分公式の特殊形です。

### 3.1 例

$X\sim\mathrm{Unif}(0,1)$ なら、$X^2$ の密度を求めなくても

$$
E[X^2]=\int_0^1x^2dx=\frac13.
$$

---

## 4. $\sigma(Y)$-可測とは何か

実数値可測関数 $Y:\Omega\to\mathbb R$ に対して

$$
\sigma(Y)
=
\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\}.
$$

従って $\sigma(Y)$-可測な実数値関数 $W$ は、$Y$ の値だけで判定できる情報しか使えません。直感的には

> $W$ は $Y$ の関数として書けるはず

です。これがDoob--Dynkin lemmaです。

---

## 5. Doob--Dynkin lemma

<a id="thm-f0-00p3d-doob-dynkin"></a>

<!-- formal-statement-start -->
> **定理（Doob--Dynkin lemma：実数値版）**  
> $Y:\Omega\to\mathbb R$ を可測関数とする。有限実数値関数 $W:\Omega\to\mathbb R$ が $\sigma(Y)$-可測なら、あるBorel可測関数 $m:\mathbb R\to\mathbb R$ が存在して次を満たす。

$$
\boxed{W=m(Y)}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**Step 1：非負単関数**  

$$
W=\sum_{k=1}^m a_k\mathbf1_{A_k},
\qquad A_k\in\sigma(Y)
$$

とします。各 $A_k$ はあるBorel集合 $B_k$ を使って

$$
A_k=Y^{-1}(B_k)
$$

と書けます。そこで

$$
m(y)=\sum_{k=1}^m a_k\mathbf1_{B_k}(y)
$$

と置けばBorel可測で

$$
m(Y)=W.
$$

**Step 2：非負可測関数**  
$W\ge0$ とします。非負単関数 $W_n$ を

$$
W_n\uparrow W
$$

となるように取ります。Step 1から各 $n$ についてBorel可測 $m_n$ があり

$$
W_n=m_n(Y).
$$

$Y(\Omega)$ 外では $m_n$ が単調である必要はないため、全実数上では

$$
m(y):=\limsup_{n\to\infty}m_n(y)
$$

と定義します。$m$ はBorel可測で、任意の $\omega$ について

$$
\begin{aligned}
m(Y(\omega))
&=\limsup_n m_n(Y(\omega))\\
&=\lim_n W_n(\omega)\\
&=W(\omega).
\end{aligned}
$$

**Step 3：一般の有限実数値関数**  

$$
W=W^+-W^-
$$

と分けます。Step 2からBorel可測な $m_+,m_-$ があり

$$
W^+=m_+(Y),
\qquad
W^-=m_-(Y).
$$

$Y(\Omega)$ 上では両者が同時に $+\infty$ になることはありません。像の外での $\infty-\infty$ を避けるため

$$
m(y)=
\begin{cases}
m_+(y)-m_-(y),&m_+(y),m_-(y)<\infty,\\
0,&\text{otherwise}
\end{cases}
$$

と置けば $m$ はBorel可測で、$m(Y)=W$ です。$\square$
<!-- proof-end -->

---

## 6. 条件付き期待値へ適用する

P3Aで

$$
E[X\mid\sigma(Y)]
$$

は $\sigma(Y)$-可測です。Doob--Dynkin lemmaにより、あるBorel可測関数 $m$ が存在して

$$
\boxed{
E[X\mid Y]
:=E[X\mid\sigma(Y)]
=m(Y)
}.
$$

$m$ は一般に $P_Y$-a.e. の意味でしか一意ではありません。これは条件付き期待値自体が $P$-a.s. 一意だからです。

---

## 7. 演習A

### A01 指示関数のpushforward

$B\in\mathcal B(\mathbb R)$ に対し

$$
\int_\Omega\mathbf1_B(X)dP
=
\int_\mathbb R\mathbf1_B(x)P_X(dx)
$$

を押し出し測度の定義だけから示せ。

<!-- solution-start -->
左辺は $P(X\in B)=P(X^{-1}(B))=P_X(B)$。右辺も指示関数の積分なので $P_X(B)$。
<!-- solution-end -->

### A02 既知の関数による因子化

$W=\sin Y+Y^2$ が $\sigma(Y)$-可測であることを示し、対応する $m$ を一つ与えよ。

<!-- solution-start -->
$m(y)=\sin y+y^2$ はBorel可測で $W=m(Y)$。従って $W$ は $\sigma(Y)$-可測。
<!-- solution-end -->

---

## 8. 演習B

### B01 LOTUSを再構成する

押し出し積分公式を

$$
\text{指示関数}
\to
\text{単関数}
\to
\text{非負可測関数}
\to
\text{可積分関数}
$$

の順に証明せよ。

<!-- solution-start -->
指示関数では押し出し測度の定義。単関数へ線形性で拡張。非負可測関数は単関数単調近似とMCT。一般可積分関数は正負部分へ分解する。
<!-- solution-end -->

### B02 Doob--Dynkinの単関数近似

$W\ge0$ が $\sigma(Y)$-可測とする。$W_n\uparrow W$ となる単関数近似から $W=m(Y)$ となるBorel可測 $m$ を構成せよ。

<!-- solution-start -->
各 $W_n$ のレベル集合を $Y^{-1}(B)$ と書き、$W_n=m_n(Y)$ を作る。$m=\limsup_nm_n$ とすればBorel可測で、$Y(\Omega)$ 上では $m(Y)=\lim_nW_n=W$。
<!-- solution-end -->

---

## 9. 監査チェック

この補講でP2残件だった

- LOTUS / pushforward integration formula
- Doob--Dynkin lemma

を完全証明しました。P3Aですでに証明済みの take-out-what-is-known と tower property と合わせ、条件付き期待値のP2監査項目は閉じます。
