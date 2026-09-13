# F0-00P3D：pushforward積分・LOTUS・Doob--Dynkin

<!-- definition-example-audit: strict -->

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

<a id="def-f0-00p3d-pushforward-measure"></a>

<!-- formal-statement-start -->
> **定義（押し出し測度）**  
> 可測写像 $Y:(\Omega,\mathcal F)\to(S,\mathcal S)$ と $\Omega$ 上の確率測度 $P$ に対し、$Y$ による押し出し測度 $P_Y=P\circ Y^{-1}$ を

$$
\boxed{P_Y(B):=P(Y^{-1}(B)),\qquad B\in\mathcal S}
$$

> で定めます。
<!-- formal-statement-end -->

確率変数の「分布」は、この押し出し測度そのものです。

### 1.1 直接例：定義を実際に使う

$\Omega=\{\omega_1,\omega_2,\omega_3\}$、

$$
P(\{\omega_1\})=\frac12,\qquad
P(\{\omega_2\})=\frac13,\qquad
P(\{\omega_3\})=\frac16
$$

とし、$Y(\omega_1)=0$、$Y(\omega_2)=Y(\omega_3)=1$ とします。

<!-- definition-example-start: def-f0-00p3d-pushforward-measure -->
**定義の確認**  
$B=\{1\}$ なら

$$
Y^{-1}(B)=\{\omega_2,\omega_3\}
$$

なので

$$
P_Y(\{1\})
=P(Y^{-1}(\{1\}))
=\frac13+\frac16
=\frac12.
$$

同様に $P_Y(\{0\})=1/2$ です。したがって $P_Y$ は $\{0,1\}$ 上で質量 $1/2,1/2$ を持つ確率測度です。ここでは「$Y$ の値を数え直した」のではなく、各集合を逆像で $\Omega$ へ戻して $P$ で測っています。
<!-- definition-example-end -->

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

> また、実数値可測関数 $g$ については
> $g\circ Y\in L^1(P)$ と $g\in L^1(P_Y)$ は同値であり、そのとき同じ等式が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**Step 1：指示関数**  
$g=\mathbf1_B$、$B\in\mathcal S$ なら、押し出し測度の定義そのものから

$$
\int_\Omega\mathbf1_B(Y)dP
=P(Y\in B)
=P(Y^{-1}(B))
=P_Y(B)
=
\int_S\mathbf1_B(y)P_Y(dy).
$$

**Step 2：非負単関数**  

$$
g=\sum_{k=1}^m a_k\mathbf1_{B_k},
\qquad a_k\ge0
$$

なら、Step 1と有限和に対する積分の加法性から

$$
\int g\circ Y\,dP
=
\sum_k a_kP_Y(B_k)
=
\int g\,dP_Y.
$$

**Step 3：非負可測関数**  
$0\le g_n\uparrow g$ となる非負単関数列を取れば、$Y$ が可測なので $g_n\circ Y$ も可測で

$$
0\le g_n\circ Y\uparrow g\circ Y.
$$

[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を $P$ 側と $P_Y$ 側に適用すると

$$
\begin{aligned}
\int g\circ Y\,dP
&=\lim_n\int g_n\circ Y\,dP\\
&=\lim_n\int g_n\,dP_Y\\
&=\int g\,dP_Y.
\end{aligned}
$$

**Step 4：符号付き可積分関数**  
まず非負版を $|g|$ に適用すると

$$
\int_S|g|\,dP_Y
=
\int_\Omega|g(Y)|\,dP.
$$

したがって一方が有限なら他方も有限で、$g\in L^1(P_Y)$ と $g\circ Y\in L^1(P)$ は同値です。その場合は

$$
g=g^+-g^-,
\qquad
(g\circ Y)^\pm=g^\pm\circ Y
$$

であり、$g^+,g^-$ の双方にStep 3を適用して差を取れば

$$
\int g\circ Y\,dP=\int g\,dP_Y
$$

を得ます。$\square$
<!-- proof-end -->

---

## 3. LOTUS はこの定理そのもの

$S=\mathbb R$ とすれば、実数値確率変数 $Y$ とBorel可測関数 $g$ に対して

$$
\boxed{
E[g(Y)]
=
\int_\Omega g(Y(\omega))dP(\omega)
=
\int_\mathbb R g(y)P_Y(dy)
}
$$

です。非負の場合は両辺が $+\infty$ でもよく、符号付きの場合は上の可積分性条件の下で使います。

離散分布なら

$$
E[g(Y)]=\sum_y g(y)P(Y=y),
$$

密度 $f_Y$ があれば

$$
E[g(Y)]=\int_\mathbb R g(y)f_Y(y)dy.
$$

離散公式と連続公式は別定理ではなく、押し出し積分公式の特殊形です。

### 3.1 例：変換後の密度を求めずに計算する

$Y\sim\mathrm{Unif}(0,1)$ なら、$Y^2$ の密度を先に求めなくてもLOTUSから

$$
E[Y^2]=\int_0^1y^2dy=\frac13.
$$

---

## 4. $\sigma(Y)$-可測とは何か

<a id="def-f0-00p3d-sigma-y-measurable"></a>

実数値可測関数 $Y:\Omega\to\mathbb R$ に対して

$$
\sigma(Y)
=
\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\}.
$$

右辺が本当に $\sigma$ 代数になるのは、逆像が補集合と可算和を保つからです。したがって「$Y$ を可測にする最小の $\sigma$ 代数」という定義と一致します。

<!-- formal-statement-start -->
> **定義（$\sigma(Y)$-可測）**  
> 実数値関数 $W:\Omega\to\mathbb R$ が $\sigma(Y)$-可測であるとは、任意のBorel集合 $C\subset\mathbb R$ に対して $W^{-1}(C)\in\sigma(Y)$ が成り立つことです。
<!-- formal-statement-end -->

### 4.1 直接例：同じ $Y$ の値を持つ点を区別しない

1.1節の有限確率空間で $W=3Y-1$ とします。

<!-- definition-example-start: def-f0-00p3d-sigma-y-measurable -->
**定義の確認**  
$W$ は $\omega_1$ で $-1$、$\omega_2,\omega_3$ で $2$ です。したがって任意のBorel集合 $C$ に対する $W^{-1}(C)$ は

$$
\varnothing,\quad
\{\omega_1\},\quad
\{\omega_2,\omega_3\},\quad
\Omega
$$

のいずれかであり、いずれも $\sigma(Y)$ に属します。よって $W$ は $\sigma(Y)$-可測です。特に $Y(\omega_2)=Y(\omega_3)$ の2点を $W$ も区別していません。
<!-- definition-example-end -->

この「$Y$ が見分けられない点を $W$ も見分けない」という直感を、Borel可測な関数 $m$ の存在へ引き上げるのがDoob--Dynkin lemmaです。単に「fiber上で一定だから」と置くのではなく、以下では $m$ を単関数近似から実際に構成します。

---

## 5. Doob--Dynkin lemma

<a id="thm-f0-00p3d-doob-dynkin"></a>

<!-- formal-statement-start -->
> **定理（Doob--Dynkin lemma：実数値版）**  
> $Y:\Omega\to\mathbb R$ を可測関数とする。有限実数値関数 $W:\Omega\to\mathbb R$ が $\sigma(Y)$-可測なら、あるBorel可測関数 $m:\mathbb R\to\mathbb R$ が存在して

$$
\boxed{W=m(Y)}
$$

> が各 $\omega\in\Omega$ で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**Step 0：$\sigma(Y)$ の各集合を実際に逆像で表す**  

$$
\mathcal C:=\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\}
$$

と置きます。$Y^{-1}(\mathbb R)=\Omega$、

$$
Y^{-1}(B^c)=Y^{-1}(B)^c,
\qquad
Y^{-1}\!\left(\bigcup_jB_j\right)=\bigcup_jY^{-1}(B_j)
$$

なので $\mathcal C$ は $\sigma$ 代数です。しかも $Y$ を可測にするために必要なBorel逆像をすべて含むので

$$
\sigma(Y)=\mathcal C.
$$

したがって、以後 $A\in\sigma(Y)$ と書いた集合は必ずあるBorel集合 $B$ を用いて $A=Y^{-1}(B)$ と表せます。この点が「fiber上で一定」という直感だけでは足りない部分です。

**Step 1：非負単関数**  

$$
W=\sum_{k=1}^r a_k\mathbf1_{A_k},
\qquad a_k\ge0,\quad A_k\in\sigma(Y)
$$

とします。Step 0から各 $A_k$ に対しBorel集合 $B_k$ が存在して

$$
A_k=Y^{-1}(B_k)
$$

と書けます。そこで

$$
m(y)=\sum_{k=1}^r a_k\mathbf1_{B_k}(y)
$$

と置けば $m$ はBorel可測で、各 $\omega$ に対して

$$
\begin{aligned}
m(Y(\omega))
&=\sum_{k=1}^r a_k\mathbf1_{B_k}(Y(\omega))\\
&=\sum_{k=1}^r a_k\mathbf1_{Y^{-1}(B_k)}(\omega)\\
&=W(\omega).
\end{aligned}
$$

**Step 2：非負可測関数**  
$W\ge0$ とします。[非負可測関数の単関数近似](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)により、$\sigma(Y)$-可測な非負単関数 $W_n$ を

$$
0\le W_n\uparrow W
$$

となるように取れます。Step 1から各 $n$ に対してBorel可測 $m_n\ge0$ があり

$$
W_n=m_n(Y).
$$

$Y(\Omega)$ の外側では $m_n$ が単調である保証はないので、全実数上で安全に定義するため

$$
m(y):=\limsup_{n\to\infty}m_n(y)
$$

と置きます。可測関数列の $\limsup$ はBorel可測です。また任意の $\omega$ について

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

と分けます。$W^+,W^-$ はともに非負かつ $\sigma(Y)$-可測なので、Step 2からBorel可測な拡張実数値関数 $m_+,m_-$ があり

$$
W^+=m_+(Y),
\qquad
W^-=m_-(Y).
$$

$W$ は有限実数値だから、$Y(\Omega)$ 上で $m_+(Y),m_-(Y)$ はともに有限です。そこで像の外での $\infty-\infty$ を避けるため

$$
m(y)=
\begin{cases}
m_+(y)-m_-(y),&m_+(y)<\infty,\ m_-(y)<\infty,\\
0,&\text{otherwise}
\end{cases}
$$

と置きます。有限値を取る領域はBorel集合であり、その上で差を取っているので $m$ はBorel可測です。さらに $Y(\Omega)$ 上では常に第1場合に入るため $m(Y)=W$ です。$\square$
<!-- proof-end -->

---

## 6. 条件付き期待値へ適用する

P3Aで構成した

$$
Z:=E[X\mid\sigma(Y)]
$$

の各versionは $\sigma(Y)$-可測です。[Doob--Dynkin lemma](#thm-f0-00p3d-doob-dynkin)をそのversion $Z$ に適用すると、あるBorel可測関数 $m$ が存在して

$$
\boxed{
Z=m(Y)
}
$$

と点ごとに書けます。この事実を略記して

$$
E[X\mid Y]:=E[X\mid\sigma(Y)]=m(Y)\qquad P\text{-a.s.}
$$

と書きます。最後の等号を a.s. と書くのは、条件付き期待値そのものがa.s.同値類だからです。

### 6.1 version の自由度は $P_Y$-a.e. の自由度とちょうど一致する

Borel可測関数 $m_1,m_2$ に対して

$$
D:=\{y:m_1(y)\ne m_2(y)\}
$$

はBorel集合です。押し出し測度の定義から

$$
\begin{aligned}
P(m_1(Y)\ne m_2(Y))
&=P(Y\in D)\\
&=P_Y(D).
\end{aligned}
$$

したがって

$$
\boxed{
m_1(Y)=m_2(Y)\quad P\text{-a.s.}
\iff
m_1=m_2\quad P_Y\text{-a.e.}
}
$$

です。つまり、条件付き期待値のversionを変える自由度と、$m$ を $P_Y$-零集合上で変更する自由度は同じです。特に $Y$ が決して取らない値で $m$ をどう定義しても $m(Y)$ は変わりません。

### 6.2 離散型では「比の公式」が出る

$Y$ が高々可算な値を取り、$P(Y=y)>0$ とします。$X\in L^1$ に対して

$$
\boxed{
m(y)=\frac{E[X\mathbf1_{\{Y=y\}}]}{P(Y=y)}}
$$

と置くと、$m(Y)$ は $E[X\mid Y]$ のversionになります。実際、$B$ を $Y$ の値の集合とすると、互いに素な事象 $\{Y=y\}$ 上で

$$
\begin{aligned}
E[m(Y)\mathbf1_{\{Y\in B\}}]
&=\sum_{y\in B}m(y)P(Y=y)\\
&=\sum_{y\in B}E[X\mathbf1_{\{Y=y\}}]\\
&=E[X\mathbf1_{\{Y\in B\}}].
\end{aligned}
$$

$X\in L^1$ なのでこの和は絶対収束し、条件付き期待値の積分保存条件を満たします。$P(Y=y)=0$ の点では $m(y)$ は任意に定めてよく、これは6.1節の $P_Y$-a.e. 自由度そのものです。

一方、連続型では通常 $P(Y=y)=0$ です。したがって

$$
\frac{E[X\mathbf1_{\{Y=y\}}]}{P(Y=y)}
$$

という点確率の比は $0/0$ になり、一般の条件付き期待値の定義にはなりません。連続型でも $E[X\mid Y]=m(Y)$ はDoob--Dynkinと条件付き期待値の定義から成立し、密度の比は追加の密度仮定がある場合にだけ現れます。

### 6.3 joint density がある特殊場合

$(X,Y)$ が $\mathbb R^2$ 上のjoint density $f_{X,Y}$ を持ち、$E|X|<\infty$ とします。

$$
f_Y(y):=\int_{\mathbb R}f_{X,Y}(x,y)\,dx
$$

とし、$f_Y(y)>0$ の点で

$$
f_{X\mid Y}(x\mid y):=
\frac{f_{X,Y}(x,y)}{f_Y(y)}
$$

と定めます。さらに

$$
m(y):=
\begin{cases}
\displaystyle\int_{\mathbb R}x f_{X\mid Y}(x\mid y)\,dx,&f_Y(y)>0,\\
0,&f_Y(y)=0
\end{cases}
$$

と置きます。$E|X|<\infty$ なのでTonelli/Fubiniにより $\int |x|f_{X,Y}(x,y)dx<\infty$ はほとんどすべての $y$ で成り立ち、$m$ は $P_Y$-a.e. で意味を持ちます。

この式が条件付き期待値になることは、任意のBorel集合 $B$ に対して

$$
\begin{aligned}
E[m(Y)\mathbf1_{\{Y\in B\}}]
&=\int_Bm(y)f_Y(y)dy\\
&=\int_B\int_{\mathbb R}x f_{X,Y}(x,y)\,dx\,dy\\
&=E[X\mathbf1_{\{Y\in B\}}]
\end{aligned}
$$

と確認できます。ここで使ったのは **joint density の存在、$X\in L^1$、Tonelli/Fubini** です。一般の確率変数対にはこのdensity表示を持ち込めません。結論として、density公式はDoob--Dynkinの代替定義ではなく、追加仮定の下で得られる具体的なversionです。

---

## 7. 演習A

### F0-00P3D-A01 指示関数のpushforward

- Level: A
- 目安時間: 8分

$B\in\mathcal B(\mathbb R)$ に対し

$$
\int_\Omega\mathbf1_B(Y)dP
=
\int_\mathbb R\mathbf1_B(y)P_Y(dy)
$$

を押し出し測度の定義だけから示せ。

<!-- solution-start -->
#### 詳細解答
左辺は指示関数の積分なので

$$
\int_\Omega\mathbf1_B(Y)dP
=P(Y\in B)
=P(Y^{-1}(B)).
$$

押し出し測度の定義 $P_Y(B)=P(Y^{-1}(B))$ により、これは $P_Y(B)$ です。一方、右辺も指示関数の積分なので

$$
\int_\mathbb R\mathbf1_B(y)P_Y(dy)=P_Y(B).
$$

よって両辺は一致します。これはLOTUS証明の最初の段です。
<!-- solution-end -->

### F0-00P3D-A02 有限分布でpushforwardとLOTUSを計算する

- Level: A
- 目安時間: 10分

$P(\omega_1,\omega_2,\omega_3)=(1/2,1/3,1/6)$、$Y(\omega_1)=0$、$Y(\omega_2)=Y(\omega_3)=1$ とする。

1. $P_Y$ を求めよ。
2. $g(y)=2y+1$ として、標本空間上の和と $P_Y$ によるLOTUSの両方から $E[g(Y)]$ を計算せよ。

<!-- solution-start -->
#### 詳細解答
1. $Y^{-1}(\{0\})=\{\omega_1\}$、$Y^{-1}(\{1\})=\{\omega_2,\omega_3\}$ なので

$$
P_Y(\{0\})=\frac12,
\qquad
P_Y(\{1\})=\frac13+\frac16=\frac12.
$$

2. 標本空間上では $g(0)=1$、$g(1)=3$ より

$$
E[g(Y)]
=1\cdot\frac12+3\cdot\left(\frac13+\frac16\right)
=2.
$$

LOTUSでは

$$
\int g\,dP_Y
=1\cdot P_Y(\{0\})+3\cdot P_Y(\{1\})
=\frac12+\frac32=2.
$$

逆像で作った $P_Y$ が標本空間側の重みを正確に引き継いでいることが確認できます。
<!-- solution-end -->

### F0-00P3D-A03 既知の関数による因子化

- Level: A
- 目安時間: 8分

$W=\sin Y+Y^2$ が $\sigma(Y)$-可測であることを示し、$W=m(Y)$ となるBorel可測関数 $m$ を一つ与えよ。

<!-- solution-start -->
#### 詳細解答

$$
m(y)=\sin y+y^2
$$

と置きます。$y\mapsto\sin y$ と $y\mapsto y^2$ は連続なのでBorel可測で、その和 $m$ もBorel可測です。したがって合成 $m\circ Y$ は $\sigma(Y)$-可測です。また定義から

$$
m(Y)=\sin Y+Y^2=W.
$$

よって $W$ は $\sigma(Y)$-可測で、求める因子化は上の $m$ です。
<!-- solution-end -->

### F0-00P3D-A04 version は点ごとには一意でない

- Level: A
- 目安時間: 10分

$Y\sim\mathrm{Bernoulli}(1/2)$ とし、

$$
m_1(y)=y,
\qquad
m_2(y)=
\begin{cases}y,&y\in\{0,1\},\\100,&y\notin\{0,1\}
\end{cases}
$$

とする。$m_1(Y)=m_2(Y)$ a.s. であることと、$m_1,m_2$ が $P_Y$-a.e. では一致するが点ごとには一致しないことを確認せよ。

<!-- solution-start -->
#### 詳細解答
$Y$ は $0$ または $1$ しか取らないので、各標本点で

$$
m_1(Y)=Y=m_2(Y).
$$

したがってa.s.どころか点ごとに合成は一致します。一方、例えば $y=2$ では $m_1(2)=2$、$m_2(2)=100$ であり、関数としては一致しません。

しかし $P_Y$ は $\{0,1\}$ に全質量を持つので

$$
P_Y(\{y:m_1(y)\ne m_2(y)\})=0.
$$

よって $m_1=m_2$ は $P_Y$-a.e. です。$m(Y)$ の一意性が点ごとではなく $P_Y$-a.e. である理由が具体化されています。
<!-- solution-end -->

---

## 8. 演習B

### F0-00P3D-B01 LOTUSを4段階で再構成する

- Level: B
- 目安時間: 18分

押し出し積分公式を

$$
\text{指示関数}
\to
\text{非負単関数}
\to
\text{非負可測関数}
\to
\text{可積分関数}
$$

の順に証明せよ。

<!-- solution-start -->
#### 詳細解答
**指示関数。** $g=\mathbf1_B$ なら

$$
\int g(Y)dP=P(Y\in B)=P_Y(B)=\int g\,dP_Y.
$$

**非負単関数。** $g=\sum_{k=1}^r a_k\mathbf1_{B_k}$、$a_k\ge0$ と書き、有限加法性を使えば

$$
\int g(Y)dP
=\sum_ka_kP_Y(B_k)
=\int g\,dP_Y.
$$

**非負可測関数。** 非負単関数 $g_j\uparrow g$ を取り、$g_j(Y)\uparrow g(Y)$ にMCTを適用します。

$$
\int g(Y)dP
=\lim_j\int g_j(Y)dP
=\lim_j\int g_jdP_Y
=\int gdP_Y.
$$

**可積分関数。** まず非負版を $|g|$ に適用して

$$
\int|g(Y)|dP=\int|g|dP_Y<\infty
$$

を得ます。そこで $g=g^+-g^-$ と分解し、$g^+,g^-$ に非負版を適用して差を取ればよいです。この最後の可積分性確認がないと $\infty-\infty$ を作る危険があります。
<!-- solution-end -->

### F0-00P3D-B02 Doob--Dynkinを単関数近似から構成する

- Level: B
- 目安時間: 20分

$W\ge0$ が $\sigma(Y)$-可測とする。$W_n\uparrow W$ となる非負単関数近似から、Borel可測 $m$ を実際に構成して $W=m(Y)$ を示せ。

<!-- solution-start -->
#### 詳細解答
各 $W_n$ を

$$
W_n=\sum_{k=1}^{r_n}a_{n,k}\mathbf1_{A_{n,k}},
\qquad A_{n,k}\in\sigma(Y)
$$

と書きます。$\sigma(Y)=\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\}$ なので、各 $A_{n,k}$ にBorel集合 $B_{n,k}$ を選んで

$$
A_{n,k}=Y^{-1}(B_{n,k})
$$

とできます。そこで

$$
m_n(y)=\sum_{k=1}^{r_n}a_{n,k}\mathbf1_{B_{n,k}}(y)
$$

と置けば $m_n$ はBorel可測で $m_n(Y)=W_n$ です。

$Y(\Omega)$ 外で $m_n$ が単調とは限らないため

$$
m(y)=\limsup_nm_n(y)
$$

と定義します。$\limsup$ は可測性を保つので $m$ はBorel可測です。任意の $\omega$ で

$$
m(Y(\omega))
=\limsup_nm_n(Y(\omega))
=\lim_nW_n(\omega)
=W(\omega).
$$

これでfiber上の直感に頼らず、Borel可測な $m$ を構成できました。
<!-- solution-end -->

### F0-00P3D-B03 離散条件付き期待値の比の公式

- Level: B
- 目安時間: 18分

$X\in L^1$、$Y$ は高々可算値を取るとする。$P(Y=y)>0$ の点で

$$
m(y)=\frac{E[X\mathbf1_{\{Y=y\}}]}{P(Y=y)}
$$

と定める。$m(Y)$ が $E[X\mid\sigma(Y)]$ のversionであることを、条件付き期待値の定義から示せ。また $P(Y=y)=0$ の点で $m(y)$ が任意でよい理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
まず $m(Y)$ は $Y$ の関数なので $\sigma(Y)$-可測です。可積分性は

$$
\begin{aligned}
E|m(Y)|
&=\sum_{y:P(Y=y)>0}|m(y)|P(Y=y)\\
&=\sum_y|E[X\mathbf1_{\{Y=y\}}]|\\
&\le\sum_yE[|X|\mathbf1_{\{Y=y\}}]\\
&=E|X|<\infty
\end{aligned}
$$

から従います。

次に $A\in\sigma(Y)$ なら $A=\{Y\in B\}$ と書けます。したがって

$$
\begin{aligned}
E[m(Y)\mathbf1_A]
&=\sum_{y\in B}m(y)P(Y=y)\\
&=\sum_{y\in B}E[X\mathbf1_{\{Y=y\}}]\\
&=E[X\mathbf1_A].
\end{aligned}
$$

条件付き期待値の3条件を満たすので $m(Y)$ はそのversionです。$P(Y=y)=0$ の点を変更しても、その点集合は $P_Y$-零集合であり $Y$ がそこへ入る確率は0です。したがって $m(Y)$ のa.s.同値類は変わりません。
<!-- solution-end -->

---

## 9. 演習C

### F0-00P3D-C01 joint density から条件付き密度公式を導く

- Level: C
- 目安時間: 30分

$(X,Y)$ はjoint density $f_{X,Y}$ を持ち、$E|X|<\infty$ とする。

$$
f_Y(y)=\int f_{X,Y}(x,y)dx
$$

と置き、$f_Y(y)>0$ で

$$
m(y)=\frac{\int x f_{X,Y}(x,y)dx}{f_Y(y)}
$$

と定義し、$f_Y(y)=0$ では $m(y)=0$ とする。

1. 分子がほとんどすべての $y$ で絶対収束することを示せ。
2. 任意のBorel集合 $B$ に対し
   $E[m(Y)\mathbf1_{\{Y\in B\}}]=E[X\mathbf1_{\{Y\in B\}}]$
   を示せ。
3. これが連続型での「点確率の比」ではなく、density仮定の下の特殊表示である理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
1. $E|X|<\infty$ とjoint densityの定義から

$$
\int_{\mathbb R}\int_{\mathbb R}|x|f_{X,Y}(x,y)\,dx\,dy
=E|X|<\infty.
$$

Tonelli/Fubiniにより、内側の積分

$$
\int|x|f_{X,Y}(x,y)dx
$$

はLebesgue-a.e.の $y$ で有限です。従って分子 $\int x f_{X,Y}(x,y)dx$ はそのような $y$ で絶対収束します。

2. $f_Y(y)=0$ なら非負関数 $f_{X,Y}(\cdot,y)$ の積分が0なので、ほとんどすべての $x$ で $f_{X,Y}(x,y)=0$ です。従って分子も0です。よってa.e.に

$$
m(y)f_Y(y)=\int x f_{X,Y}(x,y)dx.
$$

これを用いると

$$
\begin{aligned}
E[m(Y)\mathbf1_{\{Y\in B\}}]
&=\int_Bm(y)f_Y(y)dy\\
&=\int_B\int x f_{X,Y}(x,y)dx\,dy\\
&=\int\!\!\int x\mathbf1_B(y)f_{X,Y}(x,y)dx\,dy\\
&=E[X\mathbf1_{\{Y\in B\}}].
\end{aligned}
$$

また $E|m(Y)|\le E|X|$ も同じ積分評価から従うので可積分です。したがって $m(Y)$ は $E[X\mid\sigma(Y)]$ のversionです。

3. 連続型では典型的に $P(Y=y)=0$ なので

$$
\frac{E[X\mathbf1_{\{Y=y\}}]}{P(Y=y)}
$$

は $0/0$ で定義できません。上の式は、joint densityが存在するときにRadon--Nikodym型の比が通常の関数比 $f_{X,Y}/f_Y$ として書けるため得られる特殊形です。joint densityがなければこの導出は使えず、一般論は条件付き期待値の定義とDoob--Dynkinに戻ります。
<!-- solution-end -->

---

## 10. 監査チェック

この補講で、次を本文から再構成できる形にしました。

- 押し出し測度の定義から、指示関数 → 単関数 → 非負可測関数 → 可積分関数の順にLOTUSを証明する。
- Doob--Dynkin lemma で、$\sigma(Y)$ の逆像表示と単関数近似からBorel可測な $m$ を実際に構成する。
- $E[X\mid Y]=m(Y)$ のversion自由度が $m$ の $P_Y$-a.e. 自由度と一致することを示す。
- 離散型の比の公式と、連続型一般では点確率の比が定義にならないことを区別する。
- joint density がある場合だけ条件付き密度表示へ進み、その追加仮定と証明境界を明示する。
