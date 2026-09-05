# F0-00P3D：pushforward積分・LOTUS・Doob--Dynkin

P2AではLOTUSを使い、P3Aでは

$$
E[X\mid Y]=m(Y)
$$

という形を使いました。この補講では、その2本の床を証明します。

一見別物ですが、どちらも「可測写像 $Y$ を通して情報を移す」話です。

```text
標本空間 Ω
  │ Y
  ↓
観測空間 R

積分を下へ移す  → pushforward / LOTUS
可測関数を上へ戻す → Doob--Dynkin
```

---

## 1. 押し出し測度

可測空間 $(\Omega,\mathcal F)$、$(S,\mathcal S)$ と可測写像

$$
Y:\Omega\to S
$$

を考えます。$P$ を $\Omega$ 上の確率測度とします。

$Y$ による押し出し測度を

$$
\boxed{
P_Y(B):=P(Y^{-1}(B)),
\qquad B\in\mathcal S
}
$$

と定義します。

確率変数 $Y$ の「分布」は、この押し出し測度そのものです。

---

## 2. pushforward integration formula

<a id="thm-f0-00p3d-pushforward-integration"></a>

<!-- formal-statement-start -->
> **定理（押し出し積分公式）**  
> $Y:(\Omega,\mathcal F,P)\to(S,\mathcal S)$ を可測写像とし、$P_Y=P\circ Y^{-1}$ とする。非負可測関数 $g:S\to[0,\infty]$ に対して
>
> $$
> \boxed{
> \int_\Omega g(Y(\omega))\,P(d\omega)
> =
> \int_S g(y)\,P_Y(dy)
> }
> $$
>
> が成り立つ。さらに $g\circ Y\in L^1(P)$ なら符号付き可積分関数 $g$ にも同じ式が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### Step 1：指示関数

$g=\mathbf1_B$、$B\in\mathcal S$ とします。すると

$$
\int_\Omega \mathbf1_B(Y(\omega))\,dP
=P(Y\in B)
=P_Y(B).
$$

一方

$$
\int_S\mathbf1_B(y)\,P_Y(dy)=P_Y(B).
$$

従って成立します。

#### Step 2：非負単関数

$$
g=\sum_{k=1}^m a_k\mathbf1_{B_k},
\qquad a_k\ge0
$$

なら、積分の線形性とStep 1から

$$
\int g\circ Y\,dP
=
\sum_k a_kP_Y(B_k)
=
\int g\,dP_Y.
$$

#### Step 3：非負可測関数

非負可測関数 $g$ には、非負単関数列 $g_n$ で

$$
0\le g_n\uparrow g
$$

となるものがあります。すると

$$
0\le g_n\circ Y\uparrow g\circ Y.
$$

単調収束定理より

$$
\begin{aligned}
\int g\circ Y\,dP
&=\lim_{n\to\infty}\int g_n\circ Y\,dP\\
&=\lim_{n\to\infty}\int g_n\,dP_Y\\
&=\int g\,dP_Y.
\end{aligned}
$$

#### Step 4：符号付き可積分関数

$$
g=g^+-g^-
$$

と分解します。$g\circ Y\in L^1(P)$ なら、非負関数版を $|g|$ に適用して

$$
\int|g|\,dP_Y
=
\int|g\circ Y|\,dP
<\infty.
$$

従って $g^+,g^-$ の両方に非負版を適用でき、差を取れば

$$
\int g\circ Y\,dP
=
\int g\,dP_Y.
$$

$\square$
<!-- proof-end -->

---

## 3. LOTUS は上の定理そのもの

$S=\mathbb R$、$Y=X$ とすれば

$$
E[g(X)]
=\int_\Omega g(X(\omega))dP(\omega)
=\int_\mathbb R g(x)P_X(dx).
$$

したがって

$$
\boxed{E[g(X)]=\int g\,dP_X}
$$

です。

離散分布なら

$$
P_X=\sum_xp_X(x)\delta_x
$$

なので

$$
E[g(X)]=\sum_xg(x)p_X(x),
$$

密度 $f_X$ があれば

$$
E[g(X)]=\int g(x)f_X(x)dx.
$$

「離散公式」と「連続公式」は別定理ではなく、押し出し積分公式の特殊形です。

---

## 4. 例：$g(X)$ の分布を求めずに計算する

$X\sim\mathrm{Unif}(0,1)$ とします。

$Y=X^2$ の密度を先に求めなくても

$$
E[Y]
=E[X^2]
=\int_0^1x^2dx
=\frac13.
$$

LOTUSという妙な名前の本質は、**変換後の分布を作る作業を省略できる**ことです。

---

## 5. $\sigma(Y)$-可測とは何か

実数値確率変数

$$
Y:\Omega\to\mathbb R
$$

に対し

$$
\sigma(Y)
=
\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\}
$$

です。

したがって $\sigma(Y)$-可測な確率変数 $W$ は、「$Y$ が区別できない二つの標本を、勝手に別の値へ分ける」ことができません。

直感的には

> $W$ は $Y$ の値だけから計算できるはず

です。

これを定理にしたものがDoob--Dynkin lemmaです。

---

## 6. Doob--Dynkin lemma

<a id="thm-f0-00p3d-doob-dynkin"></a>

<!-- formal-statement-start -->
> **定理（Doob--Dynkin lemma：実数値版）**  
> $Y:\Omega\to\mathbb R$ を可測関数とする。実数値関数 $W:\Omega\to\mathbb R$ が $\sigma(Y)$-可測なら、あるBorel可測関数
>
> $$
> m:\mathbb R\to\mathbb R
> $$
>
> が存在して
>
> $$
> \boxed{W=m(Y)}
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 6.1 まず非負単関数の場合

$W$ が $\sigma(Y)$-可測な非負単関数なら

$$
W=\sum_{k=1}^m a_k\mathbf1_{A_k},
$$

ここで $A_k\in\sigma(Y)$ です。

$\sigma(Y)$ の定義から各 $A_k$ についてBorel集合 $B_k$ が存在し

$$
A_k=Y^{-1}(B_k)
$$

と書けます。

そこで

$$
m(y)=\sum_{k=1}^m a_k\mathbf1_{B_k}(y)
$$

と置けばBorel可測で、

$$
\begin{aligned}
m(Y(\omega))
&=\sum_k a_k\mathbf1_{B_k}(Y(\omega))\\
&=\sum_k a_k\mathbf1_{Y^{-1}(B_k)}(\omega)\\
&=W(\omega).
\end{aligned}
$$

よって単関数版が示されます。

### 6.2 非負可測関数

$W\ge0$ が $\sigma(Y)$-可測なら、非負単関数 $W_n$ を

$$
W_n\uparrow W
$$

となるように取れます。

各 $n$ について前節からBorel可測関数 $m_n$ が存在し

$$
W_n=m_n(Y).
$$

$Y(\Omega)$ 上では $m_n(Y)$ が単調増加です。しかし $Y$ が実際には取らない点で $m_n$ が単調とは限らないので、全空間上のBorel可測関数として安全に

$$
m(y):=\limsup_{n\to\infty}m_n(y)
$$

と定義します。

$\limsup$ of Borel measurable functions はBorel可測です。また任意の $\omega$ について

$$
\begin{aligned}
m(Y(\omega))
&=\limsup_n m_n(Y(\omega))\\
&=\lim_n W_n(\omega)\\
&=W(\omega).
\end{aligned}
$$

従って非負可測関数版が示されました。

### 6.3 一般の実数値関数

$$
W=W^+-W^-
$$

と分解します。$W^+,W^-$ はともに非負かつ $\sigma(Y)$-可測です。したがってBorel可測な $m_+,m_-$ が存在して

$$
W^+=m_+(Y),
\qquad
W^-=m_-(Y).
$$

$W$ は有限実数値なので $W^+,W^-$ が同時に $+\infty$ になることはありません。ただし $Y(\Omega)$ 外での差の定義事故を避けるため、例えば

$$
m(y)=
\begin{cases}
m_+(y)-m_-(y),&m_+(y),m_-(y)<\infty,\\
0,&\text{otherwise}
\end{cases}
$$

と定義すればBorel可測で、$Y(\Omega)$ 上では必ず

$$
m(Y)=W.
$$

これで証明が完了します。$\square$

---

## 7. 条件付き期待値へ適用する

P3Aで

$$
E[X\mid\sigma(Y)]
$$

は $\sigma(Y)$-可測です。

Doob--Dynkin lemmaにより、あるBorel可測関数 $m$ が存在して

$$
\boxed{
E[X\mid Y]
:=E[X\mid\sigma(Y)]
=m(Y)
}
$$

と書けます。

ここで重要なのは、$m$ 自体は一般に $P_Y$-a.e. の意味でしか一意でないことです。条件付き期待値そのものが $P$-a.s. 一意だからです。

「$E[X\mid Y=y]$ を関数として書く」という通常の記法は、この因子化定理を背後に持っています。

---

## 8. 例：$W=Y^2+1$

$$
W=Y^2+1
$$

なら明らかに

$$
m(y)=y^2+1
$$

として $W=m(Y)$ です。

Doob--Dynkin lemmaは、このように最初から式が分かっている場合ではなく、**$\sigma(Y)$-可測という抽象条件しか分からないときでも必ず何らかの $m$ が存在する**ことを保証します。

---

## 9. 演習A

### A01 指示関数のpushforward

$B\in\mathcal B(\mathbb R)$ に対し

$$
\int_\Omega\mathbf1_B(X)dP
=
\int_\mathbb R\mathbf1_B(x)P_X(dx)
$$

を押し出し測度の定義だけから示せ。

<!-- solution-start -->
左辺は $P(X\in B)=P(X^{-1}(B))$。押し出しの定義からこれは $P_X(B)$ であり、右辺も $P_X(B)$。
<!-- solution-end -->

### A02 既知の関数による因子化

$W=\sin Y+Y^2$ が $\sigma(Y)$-可測であることを示し、対応する $m$ を一つ与えよ。

<!-- solution-start -->
$m(y)=\sin y+y^2$ はBorel可測で $W=m(Y)$。Borel可測関数と可測関数の合成なので $W$ は $\sigma(Y)$-可測。
<!-- solution-end -->

---

## 10. 演習B

### B01 LOTUSを指示関数から再構成

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

の順で証明せよ。

<!-- solution-start -->
指示関数では押し出し測度の定義。単関数へ線形性で拡張。非負可測関数は単関数単調近似とMCT。一般可積分関数は正負部分へ分解する。
<!-- solution-end -->

### B02 Doob--Dynkinの単関数近似

$W\ge0$ が $\sigma(Y)$-可測とする。$W_n\uparrow W$ となる単関数近似を用いて $W=m(Y)$ となるBorel可測 $m$ を構成せよ。

<!-- solution-start -->
各 $W_n$ のレベル集合は $Y^{-1}(B)$ と書けるので $W_n=m_n(Y)$ となるBorel可測 $m_n$ を作れる。$m=\limsup_nm_n$ とすればBorel可測で、$Y(\Omega)$ 上では $m(Y)=\lim_nW_n=W$。
<!-- solution-end -->

---

## 11. 監査チェック

この補講で次のP2残件を閉じました。

- LOTUS / pushforward integration formula：**指示関数 → 単関数 → MCT → 正負部分**まで完全証明
- Doob--Dynkin lemma：**単関数因子化 → 非負可測関数 → 一般実数値**まで完全証明

P3Aですでに証明済みの

- take-out-what-is-known
- tower property

と合わせ、条件付き期待値のP2監査項目は閉じます。
