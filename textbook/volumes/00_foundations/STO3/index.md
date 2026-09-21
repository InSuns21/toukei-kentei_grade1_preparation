# STO3：確率過程を構成し、連続な標本路を得る

<!-- definition-example-audit: strict -->

> **既出概念への参照**：STO1 の [確率過程](../STO1/index.md#def-sto1-stochastic-process) と [修正・識別不能性](../STO1/index.md#def-sto1-modification-indistinguishable) を既知として使います。

STO1 では、確率過程を「時刻で添字付けされた確率変数族」として定義し、修正と識別不能性を区別しました。

しかし、確率過程を実際に作る場面では逆向きの問題が現れます。

「各有限個の時刻だけを見た同時分布」は自然に書けても、

$$
\{X_t:t\in T\}
$$

という全時刻の確率変数族が最初から存在するとは限りません。

さらに、過程が存在しても、その標本路

$$
t\longmapsto X_t(\omega)
$$

が連続とは限りません。

この章の中心線は

$$
\boxed{
\text{有限次元分布}
\to
\text{consistency}
\to
\text{標準経路空間}
\to
\text{Kolmogorov 拡張}
\to
\text{モーメント評価}
\to
\text{連続な修正}
}
$$

です。

STO4 では、この仕組みをガウスな有限個の時刻の同時分布へ適用してブラウン運動を構成します。したがって本章ではブラウン運動の存在を仮定せず、「過程の存在」と「連続な標本路」を別々の問題として閉じます。

---

## 1. 過程全体を知らなくても、有限個の時刻の分布は指定できる

時間集合を任意の集合 $T$ とします。

有限集合 $I\subset T$ に対して

$$
\mathbb R^I
=
\{x:I\to\mathbb R\}
$$

と書きます。$I=\{t_1,\ldots,t_m\}$ と順序を付ければ、これは通常の $\mathbb R^m$ と同一視できます。

$I\subset J$ に対して座標射影を

$$
\pi_{J,I}:\mathbb R^J\to\mathbb R^I,
\qquad
\pi_{J,I}(x)=x|_I
$$

とします。

<a id="def-sto3-fdd-consistency"></a>

<!-- formal-statement-start -->
> **定義（有限次元分布と整合性）**  
> 実数値確率過程 $X=(X_t)_{t\in T}$ と有限集合 $I\subset T$ に対し、
>
$$
\mu_I
=
P\circ (X_t)_{t\in I}^{-1}
$$
>
> を $X$ の $I$ における **有限次元分布**という。
>
> 一方、各有限集合 $I\subset T$ に対して $\mathbb R^I$ 上の確率測度 $\mu_I$ が与えられているとする。この族が **整合的**であるとは、任意の有限集合 $I\subset J\subset T$ について
>
$$
\mu_I
=
\mu_J\circ\pi_{J,I}^{-1}
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

実在する過程から有限次元分布を取り出せば、整合性は自動です。大きい時刻集合 $J$ の同時分布から余分な座標を捨てれば、小さい時刻集合 $I$ の同時分布へ戻るからです。

重要なのは逆です。

> 整合的な有限次元分布族を先に指定したとき、それを本当に一つの確率過程として実現できるか。

これが本章前半で解く「整合的な有限時刻の分布から過程を構成できるか」という問いです。

<!-- definition-example-start: def-sto3-fdd-consistency -->
### 直接例：全ての有限集合で独立な公平符号を指定する

**定義の確認**

各有限集合 $I\subset T$ に対し

$$
\mu_I
=
\bigotimes_{t\in I}
\left(
\frac12\delta_{-1}
+
\frac12\delta_1
\right)
$$

とします。

$I\subset J$ のとき、$\mu_J$ のうち $J\setminus I$ の座標を積分して消すと、それぞれの座標で

$$
\frac12+\frac12=1
$$

が掛かるだけなので、残る分布は

$$
\bigotimes_{t\in I}
\left(
\frac12\delta_{-1}
+
\frac12\delta_1
\right)
=
\mu_I
$$

です。

従って $(\mu_I)$ は整合的です。

ここでまだ「全ての $t\in T$ に対して独立な確率変数 $X_t$ が存在する」とは仮定していません。今確認したのは、有限個だけ見たときに矛盾が起きないことです。
<!-- definition-example-end -->

---

## 2. 標準経路空間は「全ての候補経路」を標本点にする

有限次元分布を一つの過程へまとめるため、標本空間そのものを「全ての経路」にします。

<a id="def-sto3-canonical-trajectory-space"></a>

<!-- formal-statement-start -->
> **定義（標準経路空間と円筒集合）**  
> 時間集合 $T$ に対し
>
$$
\Omega^\ast=\mathbb R^T
$$
>
> と置く。$\omega\in\Omega^\ast$ は写像 $\omega:T\to\mathbb R$ であり、一つの候補標本路とみなす。
>
> 各 $t\in T$ について座標写像
>
$$
X_t^\ast(\omega)=\omega(t)
$$
>
> を定め、
>
$$
\mathcal F^\ast
=
\sigma(X_t^\ast:t\in T)
$$
>
> とする。
>
> 有限集合 $I\subset T$ と Borel 集合 $B\subset\mathbb R^I$ に対する
>
$$
C(I,B)
=
\left\{
\omega\in\Omega^\ast:
(\omega(t))_{t\in I}\in B
\right\}
$$
>
> を **円筒集合** という。
<!-- formal-statement-end -->

$\mathcal F^\ast$ は円筒集合全体が生成する $\sigma$ 代数です。

ここで大切なのは、$\Omega^\ast$ に入る経路の大半が連続でなくても構わないことです。まず「有限次元分布を持つ過程を存在させる」仕事だけを行います。連続性は後半で別に回収します。

<!-- definition-example-start: def-sto3-canonical-trajectory-space -->
### 直接例：二時刻だけを観測する円筒集合

**定義の確認**

$T=[0,\infty)$ とし、

$$
I=\{1,2\},
\qquad
B=(-\infty,0]\times[1,\infty)
$$

とします。

すると

$$
C(I,B)
=
\{\omega:\omega(1)\le0,\ \omega(2)\ge1\}
$$

です。

この事象は、経路の時刻 1 と 2 の値だけを見れば判定できます。時刻 $1.5$ や $100$ の値は何であっても構いません。

したがって円筒集合は「有限個の時刻しか見ない事象」です。有限次元分布が直接確率を指定できる事象も、まさにこの形です。
<!-- definition-example-end -->

---

## 3. 整合的な有限時刻分布を全時刻へ拡張する

無限個の時刻へ進む前に、有限次元の Borel 確率測度を compact 集合で内側から近似できることを先に閉じます。これは後で円筒集合上の有限加法性を可算加法性へ上げる核心です。

<a id="lem-sto3-finite-borel-compact-approximation"></a>

<!-- formal-statement-start -->
> **補題（有限 Borel 測度の compact 内部近似）**  
> $\mu$ を $\mathbb R^m$ 上の有限 Borel 測度とする。任意の Borel 集合 $A\subset\mathbb R^m$ と任意の $\varepsilon>0$ に対し、compact 集合 $K\subset A$ が存在して
>
$$
\mu(A\setminus K)<\varepsilon
$$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
\mathcal R
=
\left\{
A\in\mathcal B(\mathbb R^m):
\forall\varepsilon>0,\
\exists F\subset A\subset G,\
F\text{ closed},\
G\text{ open},\
\mu(G\setminus F)<\varepsilon
\right\}
$$

と置きます。

**Step 1：open set は $\mathcal R$ に入る。**

open set $G$ に対し

$$
F_n
=
\left\{
x\in G:
\|x\|\le n,\
\operatorname{dist}(x,G^c)\ge\frac1n
\right\}
$$

と置きます。

$F_n$ は closed かつ有界なので compact です。また

$$
F_n\uparrow G.
$$

実際、$x\in G$ なら $G$ が open なので

$$
\operatorname{dist}(x,G^c)>0
$$

であり、十分大きい $n$ では $\|x\|\le n$ かつ $\operatorname{dist}(x,G^c)\ge1/n$ です。

[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)により

$$
\mu(G\setminus F_n)\to0.
$$

従って任意の $\varepsilon>0$ に対して十分大きい $n$ を取れば、$F_n\subset G\subset G$ で $\mu(G\setminus F_n)<\varepsilon$ です。

**Step 2：$\mathcal R$ は補集合で閉じる。**

$F\subset A\subset G$ なら

$$
G^c\subset A^c\subset F^c.
$$

$G^c$ は closed、$F^c$ は open で、

$$
F^c\setminus G^c
=
G\setminus F.
$$

従って $A\in\mathcal R$ なら $A^c\in\mathcal R$ です。

**Step 3：$\mathcal R$ は可算和で閉じる。**

$A=\bigcup_{n\ge1}A_n$、各 $A_n\in\mathcal R$ とします。

$\mu$ は有限測度なので

$$
A^{(N)}
=
\bigcup_{n=1}^N A_n
\uparrow A
$$

に対し

$$
\mu(A\setminus A^{(N)})\to0.
$$

まず $N$ を大きく取り

$$
\mu(A\setminus A^{(N)})<\frac{\varepsilon}{4}
$$

とします。

各 $n$ に対し

$$
F_n\subset A_n\subset G_n,
\qquad
\mu(G_n\setminus F_n)
<
\frac{\varepsilon}{2^{n+3}}
$$

となる closed $F_n$ と open $G_n$ を取ります。

$$
F=\bigcup_{n=1}^N F_n,
\qquad
G=\bigcup_{n\ge1}G_n
$$

と置くと、$F$ は有限個の closed 集合の和なので closed、$G$ は open です。

さらに

$$
F\subset A\subset G.
$$

また

$$
G\setminus A
\subset
\bigcup_{n\ge1}(G_n\setminus A_n),
$$

$$
A^{(N)}\setminus F
\subset
\bigcup_{n=1}^N(A_n\setminus F_n)
$$

なので

$$
\begin{aligned}
\mu(G\setminus F)
&\le
\mu(G\setminus A)
+
\mu(A\setminus A^{(N)})
+
\mu(A^{(N)}\setminus F)\\
&<
\frac{\varepsilon}{4}
+
\frac{\varepsilon}{4}
+
\frac{\varepsilon}{4}
<
\varepsilon.
\end{aligned}
$$

従って $A\in\mathcal R$ です。

以上から $\mathcal R$ は全ての open set を含む $\sigma$ 代数なので

$$
\mathcal B(\mathbb R^m)\subset\mathcal R.
$$

最後に Borel 集合 $A$ と $\varepsilon>0$ を取ります。上の結果から closed $F\subset A$ で

$$
\mu(A\setminus F)<\frac{\varepsilon}{2}
$$

とできます。

また

$$
[-N,N]^m\uparrow\mathbb R^m
$$

なので、有限性と[測度の下からの連続性](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md#thm-f0-00d2-01)から十分大きい $N$ で

$$
\mu(\mathbb R^m\setminus[-N,N]^m)
<
\frac{\varepsilon}{2}
$$

です。

$$
K=F\cap[-N,N]^m
$$

と置けば $K$ は compact で $K\subset A$、かつ

$$
\begin{aligned}
\mu(A\setminus K)
&\le
\mu(A\setminus F)
+
\mu(\mathbb R^m\setminus[-N,N]^m)\\
&<
\varepsilon.
\end{aligned}
$$

これで補題を得ます。
<!-- proof-end -->

<a id="thm-sto3-kolmogorov-extension"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov 拡張定理：実数値版）**  
> $T$ を任意の集合とする。各有限集合 $I\subset T$ に対して $\mathbb R^I$ 上の確率測度 $\mu_I$ が与えられ、族 $(\mu_I)$ が
>
$$
\mu_I=\mu_J\circ\pi_{J,I}^{-1}
\qquad
(I\subset J,\ I,J\text{ finite})
$$
>
> を満たすとする。
>
> このとき標準経路空間
>
$$
\Omega^\ast=\mathbb R^T,
\qquad
\mathcal F^\ast=\sigma(X_t^\ast:t\in T)
$$
>
> 上に一意な確率測度 $P^\ast$ が存在し、全ての有限集合 $I\subset T$ について
>
$$
P^\ast\circ (X_t^\ast)_{t\in I}^{-1}
=
\mu_I
$$
>
> が成り立つ。
<!-- formal-statement-end -->

この定理の意味は強力です。

有限個の時刻を選ぶたびに矛盾なく同時分布を指定できれば、**全時刻を同時に持つ確率過程が存在する**ことが分かります。

ただし、定理が作るのは

$$
(\Omega^\ast,\mathcal F^\ast,P^\ast),
\qquad
X_t^\ast(\omega)=\omega(t)
$$

という過程までです。標本路が連続であるとは一言も言っていません。

### 証明の見取り図

証明は三段階です。

1. 円筒集合に有限次元分布から確率を入れる。
2. その確率が前測度であることを示す。
3. [D4 の測度拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)で $\sigma$ 代数へ拡張する。

最も非自明なのは 2 です。

有限加法性だけでは D4 の測度拡張定理を使えません。円筒集合の減少列

$$
A_n\downarrow\varnothing
$$

に対し

$$
\mu_0(A_n)\downarrow0
$$

を示し、可算加法性まで上げる必要があります。

[有限 Borel 測度の compact 内部近似](#lem-sto3-finite-borel-compact-approximation)を使って、円筒集合前測度の可算加法性を閉じます。

<!-- proof-start -->
### Kolmogorov 拡張定理の証明

円筒集合全体を $\mathcal C$ とします。

#### Step 1：円筒集合全体は algebra

二つの円筒集合

$$
C(I,B),
\qquad
C(J,D)
$$

は $K=I\cup J$ の座標だけを見ればよく、

$$
C(I,B)\cap C(J,D)
$$

も $K$ に依存する円筒集合です。

補集合も

$$
C(I,B)^c=C(I,B^c)
$$

なので円筒集合です。

従って $\mathcal C$ は algebra です。

#### Step 2：有限次元分布から $\mu_0$ を定める

$$
\mu_0(C(I,B))
=
\mu_I(B)
$$

と定めます。

この定義が表現の取り方に依らないことを確認します。

もし

$$
C(I,B)=C(J,D)
$$

なら $K=I\cup J$ として

$$
\pi_{K,I}^{-1}(B)
=
\pi_{K,J}^{-1}(D)
$$

です。

実際、$\mathbb R^K$ の任意の点は $T\setminus K$ の座標へ例えば 0 を入れれば $\mathbb R^T$ の経路へ延長できるため、円筒集合の等しさは $K$ 上の集合の等しさを意味します。

整合性から

$$
\begin{aligned}
\mu_I(B)
&=
\mu_K(\pi_{K,I}^{-1}(B))\\
&=
\mu_K(\pi_{K,J}^{-1}(D))\\
&=
\mu_J(D).
\end{aligned}
$$

よって $\mu_0$ は well-defined です。

同じく、互いに素な有限個の円筒集合を共通の有限座標集合 $K$ へ持ち上げれば、$\mu_K$ の有限加法性から $\mu_0$ の有限加法性が従います。

また

$$
\mu_0(\Omega^\ast)=1.
$$

#### Step 3：空集合へ減少する円筒集合の確率は 0 へ減少する

$$
A_1\supset A_2\supset\cdots,
\qquad
A_n\in\mathcal C,
\qquad
\bigcap_{n=1}^\infty A_n=\varnothing
$$

とします。

示すべきは

$$
\mu_0(A_n)\downarrow0
$$

です。

反対に、ある $\delta>0$ が存在して

$$
\mu_0(A_n)\ge\delta
\qquad
(\forall n)
$$

と仮定します。

各 $n$ について有限集合 $I_n\subset T$ と Borel 集合 $B_n\subset\mathbb R^{I_n}$ を取り

$$
A_n=C(I_n,B_n)
$$

と書きます。

必要なら

$$
I_n
\leftarrow
I_1\cup\cdots\cup I_n
$$

と座標を増やして表現し直せるので、

$$
I_1\subset I_2\subset\cdots
$$

としてよいです。

正数列 $(\varepsilon_n)$ を

$$
\sum_{n=1}^\infty\varepsilon_n<\frac{\delta}{2}
$$

となるように取ります。

[有限 Borel 測度の compact 内部近似](#lem-sto3-finite-borel-compact-approximation)から、各 $n$ に compact 集合

$$
K_n\subset B_n
$$

を

$$
\mu_{I_n}(B_n\setminus K_n)<\varepsilon_n
$$

となるように選びます。

対応する円筒集合を

$$
H_n=C(I_n,K_n)
$$

とします。

さらに

$$
D_n
=
\bigcap_{j=1}^n H_j
$$

と置きます。

$j\le n$ なら $A_n\subset A_j$ なので

$$
A_n\setminus D_n
\subset
\bigcup_{j=1}^n(A_j\setminus H_j).
$$

有限加法性から得られる有限劣加法性を使うと

$$
\begin{aligned}
\mu_0(D_n)
&\ge
\mu_0(A_n)
-
\sum_{j=1}^n
\mu_0(A_j\setminus H_j)\\
&>
\delta-\sum_{j=1}^\infty\varepsilon_j\\
&>
\frac{\delta}{2}.
\end{aligned}
$$

従って全ての $D_n$ は非空です。

ここから compact 性を使います。

$$
I_\infty=\bigcup_{n=1}^\infty I_n
$$

は可算集合です。各座標 $t\in I_\infty$ が初めて $I_n$ に現れる番号を $n(t)$ とし、$K_{n(t)}$ の $t$ 座標への射影を $L_t$ とします。

$L_t$ は非空 compact 集合です。

積空間

$$
K=\prod_{t\in I_\infty}L_t
$$

を考えます。

各 $D_n$ が課す条件は有限個の座標だけに依存し、compact 集合 $K_j$ への所属条件なので、

$$
E_n:=K\cap D_n
$$

は座標ごとの極限で閉じた条件です。

さらに $E_n$ が非空であることも確認します。$D_n$ の点を一つ取ると、その $I_n$ 座標は $H_1,\ldots,H_n$ の全条件を満たします。特に $t\in I_n$ なら $n(t)\le n$ なので、その $t$ 座標は $K_{n(t)}$ の射影 $L_t$ に入ります。$t\in I_\infty\setminus I_n$ の座標は $D_n$ の条件に現れないので、各 $L_t$ から値を選んで補えば $K\cap D_n$ の点が得られます。

従って各 $E_n$ は非空で、

$$
E_1\supset E_2\supset\cdots
$$

です。

ここでは一般の積空間の compact 性を黒箱にせず、対角部分列で共通点を作ります。

$I_\infty$ を

$$
I_\infty=\{t_1,t_2,\ldots\}
$$

と列挙し、各 $n$ から一点

$$
x^{(n)}\in E_n
$$

を取ります。

$L_{t_1}$ は compact なので、$(x_{t_1}^{(n)})_n$ から収束部分列を取れます。その部分列から $t_2$ 座標でも収束する部分列を取り、以下同様に続けます。対角部分列 $(x^{(n_k)})_k$ を取れば、全ての $r$ について

$$
x_{t_r}^{(n_k)}
\to
x_{t_r}
\in
L_{t_r}.
$$

従って

$$
x=(x_{t_r})_{r\ge1}\in K
$$

を得ます。

固定した $m$ を取ります。十分大きい $k$ では $n_k\ge m$ なので、減少性から

$$
x^{(n_k)}\in E_{n_k}\subset E_m.
$$

$E_m$ の条件は有限個の座標が compact 集合 $K_j$ に属することだけであり、その条件は座標ごとの極限で保存されます。従って

$$
x\in E_m.
$$

$m$ は任意なので

$$
x\in\bigcap_{m=1}^\infty E_m.
$$

したがって

$$
\bigcap_{n=1}^\infty D_n\ne\varnothing.
$$

この点を $I_\infty$ 以外の座標へ任意に延長すれば

$$
\omega\in\bigcap_{n=1}^\infty H_n
\subset
\bigcap_{n=1}^\infty A_n
$$

を得ます。

これは

$$
\bigcap_nA_n=\varnothing
$$

に矛盾します。

よって

$$
A_n\downarrow\varnothing
\quad\Longrightarrow\quad
\mu_0(A_n)\downarrow0.
$$

#### Step 4：有限加法性から前測度へ

互いに素な $C_1,C_2,\ldots\in\mathcal C$ があり、

$$
C=\bigcup_{n=1}^\infty C_n\in\mathcal C
$$

とします。

$$
R_N
=
C\setminus\bigcup_{n=1}^NC_n
$$

と置くと

$$
R_N\downarrow\varnothing.
$$

有限加法性から

$$
\mu_0(C)
=
\sum_{n=1}^N\mu_0(C_n)+\mu_0(R_N).
$$

$N\to\infty$ で $\mu_0(R_N)\to0$ なので

$$
\mu_0(C)
=
\sum_{n=1}^\infty\mu_0(C_n).
$$

従って $\mu_0$ は前測度です。

#### Step 5：Carathéodory 拡張

[D4 の拡張結果](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)から、$\mu_0$ は

$$
\sigma(\mathcal C)=\mathcal F^\ast
$$

上の測度 $P^\ast$ へ拡張されます。

しかも

$$
\mu_0(\Omega^\ast)=1
$$

なので前測度は有限、従って $\sigma$ 有限です。拡張は一意です。

円筒集合の定義から、全ての有限 $I\subset T$ について

$$
P^\ast\circ(X_t^\ast)_{t\in I}^{-1}
=
\mu_I
$$

です。

これで定理が証明されました。
<!-- proof-end -->

### どの仮定が働いたか

この証明で重要だったのは、単なる「有限次元分布がある」ことではありません。

- **整合性**：同じ円筒集合を異なる座標集合で表しても同じ確率になる。
- **有限次元空間が $\mathbb R^m$**：Borel 確率測度を compact 集合で内側から近似できる。
- **compact 性**：有限個ずつ矛盾しない制約が、可算個同時にも矛盾しないことを保証する。
- **D4 の測度拡張定理**：algebra 上の前測度を生成 $\sigma$ 代数へ運ぶ。

「整合的だから何となく無限次元分布がある」のではなく、有限次元の tightness と測度拡張がその橋になっています。

---

## 4. 拡張 theorem は標本路の正則性を何も保証しない

Kolmogorov 拡張定理が作る標準 process の標本点は

$$
\omega:T\to\mathbb R
$$

という任意の関数です。

従って、連続標本路が欲しいなら追加情報が必要です。

ここで STO1 の [修正の定義](../STO1/index.md#def-sto1-modification-indistinguishable) が効きます。

元の過程 $X$ と各固定時刻でほとんど確実に一致しつつ、よりよい標本路を持つ過程 $\widetilde X$ を作ればよいのです。

「各時刻の分布を変えずに、全時刻を同時に見た経路だけを改善する」というのが連続性 theorem の役目です。

---

## 5. 連続性を指数で定量化する

<a id="def-sto3-holder-continuity"></a>

<!-- formal-statement-start -->
> **定義（Hölder 連続性）**  
> 区間 $[0,T]$ 上の関数 $f$ と指数 $\gamma\in(0,1]$ を考える。ある定数 $C_f<\infty$ が存在して
>
$$
|f(t)-f(s)|
\le
C_f|t-s|^\gamma
\qquad
(s,t\in[0,T])
$$
>
> が成り立つとき、$f$ は指数 $\gamma$ で **Hölder 連続** であるという。
<!-- formal-statement-end -->

$\gamma=1$ は Lipschitz 連続性です。

$\gamma<1$ では、短い時間差 $h$ に対する変動が

$$
O(h^\gamma)
$$

で抑えられます。

<!-- definition-example-start: def-sto3-holder-continuity -->
### 直接例：$f(t)=\sqrt t$ は $1/2$-Hölder

**定義の確認**

$s,t\ge0$ とします。

一般性を失わず $t\ge s$ とすると

$$
\sqrt t-\sqrt s
=
\frac{t-s}{\sqrt t+\sqrt s}.
$$

さらに

$$
\sqrt t+\sqrt s
\ge
\sqrt{t-s}
$$

なので

$$
|\sqrt t-\sqrt s|
\le
\sqrt{t-s}
=
|t-s|^{1/2}.
$$

従って $f(t)=\sqrt t$ は $1/2$-Hölder です。

一方、0 の近くで

$$
\frac{|\sqrt t-\sqrt0|}{|t-0|}
=
\frac1{\sqrt t}\to\infty
$$

なので Lipschitz ではありません。

Hölder 指数は「連続か否か」より細かく、経路の粗さを測ります。
<!-- definition-example-end -->

---

## 6. モーメント評価から連続修正を作る

<a id="thm-sto3-kolmogorov-chentsov"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov--Chentsov 連続性 theorem：1 パラメータ版）**  
> 実数値確率過程 $X=(X_t)_{0\le t\le T}$ に対し、ある定数
>
$$
\alpha>0,\qquad
\beta>0,\qquad
C<\infty
$$
>
> が存在し、全ての $s,t\in[0,T]$ について
>
$$
E|X_t-X_s|^\alpha
\le
C|t-s|^{1+\beta}
$$
>
> が成り立つとする。
>
> このとき $X$ は連続な修正 $\widetilde X$ を持つ。
>
> さらに任意の
>
$$
0<\gamma<\frac{\beta}{\alpha}
$$
>
> に対し、$\widetilde X$ は指数 $\gamma$ で Hölder 連続な標本路を a.s. 持つように選べる。
<!-- formal-statement-end -->

### まず指数を読む

右辺の時間差の指数は

$$
1+\beta
$$

です。

二進分割の第 $n$ 段には約 $2^n$ 本の隣接区間があります。

一つの区間で大きな増分が起こる確率を [Markov の不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)で抑えると、全区間の union bound によって $2^n$ が一つ失われます。

その結果に残る指数が

$$
\beta-\alpha\gamma
$$

です。

これが正なら

$$
\sum_n2^{-n(\beta-\alpha\gamma)}<\infty
$$

となり、Borel--Cantelli 第1補題を使えます。

したがって条件

$$
\gamma<\frac{\beta}{\alpha}
$$

は proof mechanism そのものから出てきます。

### 証明の見取り図

1. 二進格子上の隣接増分を一斉に抑える。
2. 悪い水準の確率和が有限であることを示す。
3. [Borel--Cantelli 第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1)で、十分細かい水準では全隣接増分が小さい状態にする。
4. 二進近似列を各標本点ごとに Cauchy にして $\widetilde X_t$ を定義する。
5. 元の $X_t$ への確率収束と比較して修正であることを示す。
6. 同じ二進連鎖評価で Hölder 評価を得る。

<!-- proof-start -->
### 証明

任意の

$$
0<\gamma<\frac{\beta}{\alpha}
$$

を固定します。

さらに中間指数 $\eta$ を

$$
\gamma<\eta<\frac{\beta}{\alpha}
$$

となるように一つ取ります。

#### Step 1：二進格子の悪い事象

第 $n$ 段の grid を

$$
D_n
=
\left\{
\frac{kT}{2^n}:k=0,\ldots,2^n
\right\}
$$

とします。

隣接増分のどれかが $2^{-n\eta}$ を超える事象を

$$
A_n
=
\left\{
\max_{0\le k<2^n}
\left|
X_{(k+1)T/2^n}
-
X_{kT/2^n}
\right|
>
2^{-n\eta}
\right\}
$$

とします。

union bound と [Markov の不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)から

$$
\begin{aligned}
P(A_n)
&\le
\sum_{k=0}^{2^n-1}
P\left(
\left|
X_{(k+1)T/2^n}
-
X_{kT/2^n}
\right|
>
2^{-n\eta}
\right)\\
&\le
\sum_{k=0}^{2^n-1}
2^{n\alpha\eta}
E\left|
X_{(k+1)T/2^n}
-
X_{kT/2^n}
\right|^\alpha.
\end{aligned}
$$

モーメント評価を代入すると

$$
\begin{aligned}
P(A_n)
&\le
2^n
2^{n\alpha\eta}
C
\left(
\frac{T}{2^n}
\right)^{1+\beta}\\
&=
CT^{1+\beta}
2^{-n(\beta-\alpha\eta)}.
\end{aligned}
$$

$\eta<\beta/\alpha$ なので

$$
\beta-\alpha\eta>0.
$$

従って

$$
\sum_{n=1}^\infty P(A_n)<\infty.
$$

[Borel--Cantelli 第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1)より、確率 1 で $A_n$ は有限回しか起こりません。

従って確率 1 の事象 $\Omega_0$ 上で、各 $\omega\in\Omega_0$ に対しある $N(\omega)$ が存在して、

$$
n\ge N(\omega)
$$

なら全ての隣接二進点について

$$
\left|
X_{(k+1)T/2^n}(\omega)
-
X_{kT/2^n}(\omega)
\right|
\le
2^{-n\eta}.
$$

#### Step 2：各 $t$ を左二進点で近似する

$t\in[0,T]$ に対し

$$
q_n(t)
=
\frac{T}{2^n}
\left\lfloor
\frac{2^nt}{T}
\right\rfloor
$$

とします。$t=T$ のときは $q_n(T)=T$ とします。

すると

$$
q_n(t)\to t.
$$

また $q_{n+1}(t)$ と $q_n(t)$ は同じ点であるか、第 $n+1$ 段で隣接する点です。

従って $\omega\in\Omega_0$ かつ $n$ が十分大きければ

$$
|X_{q_{n+1}(t)}(\omega)-X_{q_n(t)}(\omega)|
\le
2^{-(n+1)\eta}.
$$

よって

$$
\sum_{n}
|X_{q_{n+1}(t)}(\omega)-X_{q_n(t)}(\omega)|
<\infty.
$$

したがって $(X_{q_n(t)}(\omega))_n$ は Cauchy 列です。

$\omega\in\Omega_0$ では

$$
\widetilde X_t(\omega)
=
\lim_{n\to\infty}X_{q_n(t)}(\omega)
$$

と定め、$\omega\notin\Omega_0$ では例えば $\widetilde X_t(\omega)=0$ と定めます。

各固定 $t$ について $\widetilde X_t$ は可測確率変数です。

#### Step 3：$\widetilde X$ は $X$ の修正

固定した $t$ についてモーメント評価から

$$
E|X_{q_n(t)}-X_t|^\alpha
\le
C|q_n(t)-t|^{1+\beta}
\to0.
$$

[Markov の不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)により

$$
X_{q_n(t)}
\to
X_t
\qquad
\text{in probability}.
$$

一方、定義から

$$
X_{q_n(t)}
\to
\widetilde X_t
\qquad
\text{a.s.}
$$

であり、従って確率収束もします。

確率収束の極限は a.s. の意味で一意なので

$$
P(\widetilde X_t=X_t)=1.
$$

これは各固定 $t$ で成立するため、$\widetilde X$ は $X$ の修正です。

#### Step 4：二進連鎖評価で Hölder 評価

$\omega\in\Omega_0$ を固定します。

十分大きい $n$ について、全ての $t$ で

$$
\begin{aligned}
|\widetilde X_t-X_{q_n(t)}|
&\le
\sum_{m=n}^{\infty}
|X_{q_{m+1}(t)}-X_{q_m(t)}|\\
&\le
\sum_{m=n}^{\infty}
2^{-(m+1)\eta}\\
&=
\frac{2^{-(n+1)\eta}}{1-2^{-\eta}}.
\end{aligned}
$$

$s<t$ に対し $n$ を

$$
T2^{-(n+1)}
<
t-s
\le
T2^{-n}
$$

となるように取ります。

$q_n(s)$ と $q_n(t)$ は同一か、第 $n$ 段で隣接する点なので、$n$ が十分大きければ

$$
|X_{q_n(t)}-X_{q_n(s)}|
\le
2^{-n\eta}.
$$

従って

$$
|\widetilde X_t-\widetilde X_s|
\le
C_\eta\,2^{-n\eta}
$$

となる有限な定数 $C_\eta$ が存在します。

一方

$$
2^{-n}
<
\frac{2(t-s)}{T}
$$

なので

$$
|\widetilde X_t-\widetilde X_s|
\le
C_\eta'
|t-s|^\eta
$$

です。

これは十分小さい $|t-s|$ に対して成立します。有限区間上では、この局所 bound から定数を大きくすれば全ての $s,t$ に対する bound へ拡張できます。

したがって $\widetilde X$ の標本路は a.s. 指数 $\eta$ で Hölder 連続です。

$\eta>\gamma$ なので、有限区間では

$$
|t-s|^\eta
\le
T^{\eta-\gamma}|t-s|^\gamma
$$

より指数 $\gamma$ でも Hölder 連続です。

$\gamma<\beta/\alpha$ は任意だったので結論を得ます。
<!-- proof-end -->

---

## 7. モーメントの次数を上げると、得られる Hölder 指数も上がる

連続性 theorem を使うときは

$$
E|X_t-X_s|^\alpha
\le
C|t-s|^{1+\beta}
$$

を見つけた後、

$$
\frac{\beta}{\alpha}
$$

を計算します。

例えば

$$
E|X_t-X_s|^4
\le
C|t-s|^2
$$

なら

$$
\alpha=4,
\qquad
1+\beta=2,
\qquad
\beta=1.
$$

従って

$$
\gamma<\frac14
$$

の Hölder 標本路を持つ修正が得られます。

より一般に、ある $p>2$ について

$$
E|X_t-X_s|^p
\le
C_p|t-s|^{p/2}
$$

なら

$$
\alpha=p,
\qquad
1+\beta=\frac p2,
\qquad
\beta=\frac p2-1
$$

なので

$$
\gamma
<
\frac{\beta}{\alpha}
=
\frac12-\frac1p.
$$

$p$ をいくらでも大きく取れるなら、任意の

$$
\gamma<\frac12
$$

へ近づけます。

STO4 ではガウス increment の高次モーメントがまさにこの形を与えます。

---

## 8. 連続な修正は識別不能になる

STO1 では修正と識別不能性が一般には異なることを見ました。

しかし連続標本路を持つと、可算稠密集合が非可算時刻を支配します。

<a id="prop-sto3-continuous-modifications-indistinguishable"></a>

<!-- formal-statement-start -->
> **命題（連続な modifications は識別不能）**  
> $X=(X_t)_{0\le t\le T}$ と $Y=(Y_t)_{0\le t\le T}$ を同じ確率空間上の実数値過程とする。
>
> 各固定 $t$ について
>
$$
P(X_t=Y_t)=1
$$
>
> とし、さらに $X$ と $Y$ の標本路がともに a.s. 連続であるとする。
>
> このとき
>
$$
P(X_t=Y_t\text{ for all }t\in[0,T])=1.
$$
>
> すなわち $X$ と $Y$ は識別不能である。
<!-- formal-statement-end -->

### 証明の見取り図

全実数時刻を一度に扱うのではなく、有理数時刻だけを先にそろえます。

有理数は可算個なので、各時刻ごとの確率 1 事象を可算共通部分にできます。

最後に連続性で全実数時刻へ広げます。

<!-- proof-start -->
### 証明

$$
D=\mathbb Q\cap[0,T]
$$

とします。

各 $q\in D$ について

$$
P(X_q=Y_q)=1.
$$

$D$ は可算なので

$$
\Omega_1
=
\bigcap_{q\in D}\{X_q=Y_q\}
$$

は確率 1 の事象です。

また $X,Y$ がともに連続標本路を持つ事象を $\Omega_2$ とすれば

$$
P(\Omega_2)=1.
$$

従って

$$
P(\Omega_1\cap\Omega_2)=1.
$$

$\omega\in\Omega_1\cap\Omega_2$ と $t\in[0,T]$ を任意に取ります。

有理数列 $q_n\in D$ を

$$
q_n\to t
$$

となるように取ります。

連続性から

$$
X_{q_n}(\omega)\to X_t(\omega),
\qquad
Y_{q_n}(\omega)\to Y_t(\omega).
$$

一方 $\omega\in\Omega_1$ なので全ての $n$ で

$$
X_{q_n}(\omega)=Y_{q_n}(\omega).
$$

従って極限を取って

$$
X_t(\omega)=Y_t(\omega).
$$

$t$ は任意なので、$\omega\in\Omega_1\cap\Omega_2$ では全時刻で一致します。

よって $X,Y$ は識別不能です。
<!-- proof-end -->

STO3 で連続な修正を一つ構成できれば、その後は「どの連続 version を採用したか」という曖昧さは識別不能性の範囲まで消えます。

---

## 9. 拡張と連続性は別の仕事である

この章の二大定理は役割が違います。

| 定理 | 入力 | 出力 | 解決する問題 |
|---|---|---|---|
| Kolmogorov 拡張 | 整合的な有限次元分布 | 標準 process | 過程は存在するか |
| Kolmogorov--Chentsov | increment のモーメント評価 | Hölder 連続な修正 | 良い標本路を選べるか |

この二つを混ぜないことが重要です。

有限次元分布だけから標本路の正則性は出ません。

逆にモーメント評価は、そもそも過程が存在しなければ適用対象がありません。

STO4 では

$$
\text{ガウス有限次元分布}
\overset{\text{拡張}}{\longrightarrow}
\text{ガウス process}
\overset{\text{連続性}}{\longrightarrow}
\text{連続ブラウン candidate}
$$

という順番でブラウン運動を作ります。

---

# 10. 演習 A

#### STO3-A01 Bernoulli 有限次元分布の整合性
- Level: A

任意の時間集合 $T$ に対し、各有限集合 $I\subset T$ について

$$
\mu_I
=
\bigotimes_{t\in I}
\left(
p\delta_1+(1-p)\delta_0
\right),
\qquad
0\le p\le1
$$

とする。

$I\subset J$ のとき

$$
\mu_I
=
\mu_J\circ\pi_{J,I}^{-1}
$$

を直接示せ。

<!-- solution-start -->
### 詳細解答

$I\subset J$ とします。

有限集合なので

$$
J=I\cup\{u_1,\ldots,u_r\}
$$

と書けます。

$\mu_J$ は全座標の積測度なので、$I$ の座標がある値

$$
x=(x_t)_{t\in I}\in\{0,1\}^I
$$

を取る確率は

$$
\prod_{t\in I}
p^{x_t}(1-p)^{1-x_t}
$$

に、余分な座標 $u_1,\ldots,u_r$ の全ての取り方の確率和を掛けたものです。

各 $u_j$ について

$$
p+(1-p)=1
$$

なので、余分な $r$ 座標を全て和で消すと係数は

$$
1^r=1
$$

です。

従って $I$ 座標の周辺分布は

$$
\prod_{t\in I}
p^{x_t}(1-p)^{1-x_t},
$$

すなわち $\mu_I$ です。

したがって

$$
\mu_I
=
\mu_J\circ\pi_{J,I}^{-1}.
$$

有限状態空間では点集合上で一致すれば全ての部分集合上で一致するため、整合性が示されました。
<!-- solution-end -->

#### STO3-A02 標準座標過程の有限次元分布
- Level: A

$T=\{0,1,2\}$、

$$
\Omega^\ast=\mathbb R^T,
\qquad
X_t^\ast(\omega)=\omega(t)
$$

とする。

$\mathbb R^T$ 上の確率測度 $P^\ast$ が

$$
P^\ast(X_0^\ast=0,X_1^\ast=1,X_2^\ast=1)=\frac18
$$

を満たすとする。

1. 事象 $\{X_0^\ast=0,X_2^\ast=1\}$ を円筒集合として書け。
2. その確率が有限次元分布 $\mu_{\{0,2\}}$ のどの値に等しいかを書け。

<!-- solution-start -->
### 詳細解答

1. $I=\{0,2\}$ とし、

$$
B=\{(0,1)\}\subset\mathbb R^{\{0,2\}}
$$

とします。

すると

$$
C(I,B)
=
\{\omega:\omega(0)=0,\ \omega(2)=1\}
$$

であり、

$$
\{X_0^\ast=0,X_2^\ast=1\}
=
C(\{0,2\},\{(0,1)\})
$$

です。

この事象を判定するのに時刻 1 の値は不要です。

2. 有限次元分布の定義から

$$
\mu_{\{0,2\}}
=
P^\ast\circ(X_0^\ast,X_2^\ast)^{-1}.
$$

従って

$$
P^\ast(X_0^\ast=0,X_2^\ast=1)
=
\mu_{\{0,2\}}(\{(0,1)\}).
$$

与えられた $1/8$ は三時刻全てを固定した一つの原子の確率であり、二時刻の周辺確率を求めるには $X_1^\ast$ の全ての可能値について足し合わせる必要があります。したがって問題文の情報だけから数値そのものは一意に決まりません。

この点が「有限次元分布は必要な座標だけを周辺化して得る」という意味です。
<!-- solution-end -->

#### STO3-A03 Kolmogorov--Chentsov 連続定理の指数計算
- Level: A

過程 $X=(X_t)_{0\le t\le1}$ が

$$
E|X_t-X_s|^4
\le
12|t-s|^2
$$

を満たすとする。

[Kolmogorov--Chentsov 連続性 theorem](#thm-sto3-kolmogorov-chentsov) を使って保証できる Hölder 指数の範囲を求めよ。

<!-- solution-start -->
### 詳細解答

定理の仮定

$$
E|X_t-X_s|^\alpha
\le
C|t-s|^{1+\beta}
$$

と比較します。

左辺のモーメント次数から

$$
\alpha=4.
$$

右辺では

$$
1+\beta=2
$$

なので

$$
\beta=1.
$$

従って定理が保証する指数は

$$
0<\gamma<\frac{\beta}{\alpha}
=
\frac14.
$$

よって $X$ は、任意の

$$
\boxed{0<\gamma<\frac14}
$$

について $\gamma$-Hölder 連続な標本路を持つ修正を持ちます。

$\gamma=1/4$ 自体は、この定理の結論からは保証されません。strict inequality であることに注意します。
<!-- solution-end -->

#### STO3-A04 連続な修正はなぜ全時刻で一致するか
- Level: A

$X,Y$ を $[0,1]$ 上の連続標本路を持つ過程とし、各固定 $t$ について

$$
P(X_t=Y_t)=1
$$

とする。

有理数集合

$$
D=\mathbb Q\cap[0,1]
$$

だけを使って

$$
P(X_t=Y_t\ \forall t\in[0,1])=1
$$

を示せ。

<!-- solution-start -->
### 詳細解答

各 $q\in D$ について

$$
P(X_q=Y_q)=1.
$$

$D$ は可算集合なので

$$
\Omega_1
=
\bigcap_{q\in D}\{X_q=Y_q\}
$$

は可算個の確率 1 事象の共通部分であり、

$$
P(\Omega_1)=1.
$$

また $X,Y$ の標本路がともに連続である事象を $\Omega_2$ とすれば

$$
P(\Omega_2)=1.
$$

従って

$$
P(\Omega_1\cap\Omega_2)=1.
$$

$\omega\in\Omega_1\cap\Omega_2$ と $t\in[0,1]$ を固定します。

$D$ は $[0,1]$ で稠密なので、有理数列 $q_n\in D$ で

$$
q_n\to t
$$

となるものを取れます。

連続性から

$$
X_{q_n}(\omega)\to X_t(\omega),
\qquad
Y_{q_n}(\omega)\to Y_t(\omega).
$$

一方 $\omega\in\Omega_1$ なので

$$
X_{q_n}(\omega)=Y_{q_n}(\omega)
$$

が全ての $n$ で成立します。

極限を取れば

$$
X_t(\omega)=Y_t(\omega).
$$

$t$ は任意なので、この $\omega$ では全時刻で一致します。

よって

$$
P(X_t=Y_t\ \forall t\in[0,1])=1.
$$
<!-- solution-end -->

---

# 11. 演習 B

#### STO3-B01 共分散 $\min(s,t)$ が有限次元共分散として正しい
- Level: B

有限個の時刻

$$
0\le t_1,\ldots,t_m
$$

を取り、

$$
\Sigma_{ij}=\min(t_i,t_j)
$$

と置く。

1. 任意の $a_1,\ldots,a_m\in\mathbb R$ に対し
   $$
   \sum_{i,j=1}^m a_i a_j\min(t_i,t_j)\ge0
   $$
   を示せ。
2. 従って $\Sigma$ が半正定値であることを示せ。
3. $I\subset J$ で座標を減らしたとき、この分散共分散行列が対応する添字の行・列だけを残した部分行列へ移ることを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 恒等式

$$
\min(s,t)
=
\int_0^\infty
1_{\{u\le s\}}
1_{\{u\le t\}}
\,du
$$

を使います。

実際、積

$$
1_{\{u\le s\}}1_{\{u\le t\}}
$$

が 1 になるのは

$$
0\le u\le\min(s,t)
$$

の範囲なので、積分値は $\min(s,t)$ です。

従って

$$
\begin{aligned}
\sum_{i,j=1}^m a_i a_j\min(t_i,t_j)
&=
\sum_{i,j=1}^m
a_i a_j
\int_0^\infty
1_{\{u\le t_i\}}1_{\{u\le t_j\}}\,du\\
&=
\int_0^\infty
\sum_{i,j=1}^m
a_i a_j
1_{\{u\le t_i\}}1_{\{u\le t_j\}}
\,du\\
&=
\int_0^\infty
\left(
\sum_{i=1}^m
a_i1_{\{u\le t_i\}}
\right)^2du\\
&\ge0.
\end{aligned}
$$

2. 半正定値の定義は

$$
a^\mathsf T\Sigma a\ge0
\qquad
(\forall a\in\mathbb R^m)
$$

です。

1 の左辺はまさに $a^\mathsf T\Sigma a$ なので、$\Sigma$ は半正定値です。

3. 時刻集合 $J$ から $I$ の座標だけを残すと、共分散は対応する添字 $i,j\in I$ の成分

$$
\min(t_i,t_j)
$$

だけを残します。

従って分散共分散行列は $\Sigma_J$ の対応する添字の行・列だけを残した部分行列となり、それは $\Sigma_I$ そのものです。

STO4 ではこの整合性とガウス周辺分布の安定性を組み合わせ、ブラウン有限次元分布を作ります。
<!-- solution-end -->

#### STO3-B02 円筒集合前測度の「空集合への減少列で確率が0へ下がる性質」
- Level: B

Kolmogorov 拡張定理の証明で、円筒集合 sets

$$
A_n\downarrow\varnothing
$$

に対し

$$
\mu_0(A_n)\downarrow0
$$

を示す部分を考える。

次の論理を自力で再構成せよ。

1. $\mu_0(A_n)\ge\delta>0$ と仮定する。
2. 各有限次元集合 $B_n$ を compact $K_n\subset B_n$ で
   $$
   \mu(B_n\setminus K_n)<\varepsilon_n,
   \qquad
   \sum_n\varepsilon_n<\delta/2
   $$
   と近似する。
3. 有限個の compact 円筒集合の共通部分 $D_n$ が全て非空であることを示す。
4. 関係する座標が可算個しかないことと compact 性から
   $$
   \bigcap_nD_n\ne\varnothing
   $$
   を導き矛盾を得よ。

<!-- solution-start -->
### 詳細解答

$A_n$ は有限集合 $I_n$ の座標だけに依存する円筒集合です。

座標を累積して

$$
I_1\subset I_2\subset\cdots
$$

としてよいです。

1. 反対に

$$
\mu_0(A_n)\ge\delta>0
$$

が全ての $n$ で成り立つと仮定します。

2. $A_n=C(I_n,B_n)$ と書きます。

正数 $\varepsilon_n$ を

$$
\sum_{n=1}^\infty\varepsilon_n<\frac\delta2
$$

となるように取り、有限次元 compact 近似から

$$
K_n\subset B_n,
\qquad
K_n\text{ compact},
\qquad
\mu_{I_n}(B_n\setminus K_n)<\varepsilon_n
$$

とします。

対応する compact 円筒集合を

$$
H_n=C(I_n,K_n)
$$

と置きます。

3.

$$
D_n=\bigcap_{j=1}^nH_j
$$

とします。

$j\le n$ なら $A_n\subset A_j$ なので

$$
A_n\setminus D_n
\subset
\bigcup_{j=1}^n(A_j\setminus H_j).
$$

従って

$$
\begin{aligned}
\mu_0(D_n)
&\ge
\mu_0(A_n)
-
\sum_{j=1}^n\mu_0(A_j\setminus H_j)\\
&>
\delta-\sum_{j=1}^\infty\varepsilon_j\\
&>
\frac\delta2.
\end{aligned}
$$

よって $D_n$ は非空です。

4. 関係する座標集合

$$
I_\infty=\bigcup_nI_n
$$

は可算です。

各座標が初めて現れる compact $K_n$ の射影をその座標の compact 値域 $L_t$ とし、

$$
K^\ast=\prod_{t\in I_\infty}L_t
$$

を考えます。

可算個の compact metric spaces の積は、対角部分列法で compact です。

各 $D_n$ は有限個の座標に対する closed 条件なので $K^\ast$ 内で closed です。

しかも

$$
D_1\supset D_2\supset\cdots
$$

で各 $D_n$ は非空です。

compact 空間内の nested nonempty closed sets の共通部分は非空なので

$$
\bigcap_nD_n\ne\varnothing.
$$

しかし

$$
D_n\subset H_n\subset A_n
$$

だから

$$
\bigcap_nD_n
\subset
\bigcap_nA_n
=
\varnothing,
$$

矛盾です。

従って最初の仮定が誤りで

$$
\mu_0(A_n)\downarrow0.
$$

これが finite additivity を前測度の countable additivity へ上げる核心です。
<!-- solution-end -->

#### STO3-B03 高次モーメントから $1/2$ 未満の Hölder 指数へ
- Level: B

過程 $X=(X_t)_{0\le t\le T}$ が、各偶数 $p\ge4$ に対し定数 $C_p$ を用いて

$$
E|X_t-X_s|^p
\le
C_p|t-s|^{p/2}
$$

を満たすとする。

任意の

$$
0<\gamma<\frac12
$$

に対し、$\gamma$-Hölder 連続な修正が存在することを示せ。

<!-- solution-start -->
### 詳細解答

目標の $\gamma$ を一つ固定します。

$$
\gamma<\frac12
$$

なので

$$
\frac12-\gamma>0.
$$

偶数 $p$ を十分大きく取れば

$$
\frac1p
<
\frac12-\gamma
$$

とできます。

これは

$$
\gamma
<
\frac12-\frac1p
$$

と同値です。

この $p$ に対するモーメント評価

$$
E|X_t-X_s|^p
\le
C_p|t-s|^{p/2}
$$

を Kolmogorov--Chentsov の形

$$
E|X_t-X_s|^\alpha
\le
C|t-s|^{1+\beta}
$$

と比較すると

$$
\alpha=p,
$$

$$
1+\beta=\frac p2,
$$

したがって

$$
\beta=\frac p2-1.
$$

よって

$$
\frac{\beta}{\alpha}
=
\frac{p/2-1}{p}
=
\frac12-\frac1p.
$$

選んだ $p$ では

$$
\gamma<\frac{\beta}{\alpha}
$$

なので連続性 theorem を適用でき、指数 $\gamma$ で Hölder 連続な標本路を持つ修正が存在します。

$\gamma<1/2$ は任意だったので、任意の $1/2$ 未満の指数を得られます。

重要なのは、一つの固定した $p$ だけでは

$$
\gamma<\frac12-\frac1p
$$

までしか出ないことです。$p$ を大きくできることが $1/2$ 直前まで押し上げます。
<!-- solution-end -->

---

# 12. 演習 C

#### STO3-C01 有限次元分布から連続過程までを一気に構成する
- Level: C

時間区間を $[0,T]$ とする。

各有限集合 $I\subset[0,T]$ に対し $\mathbb R^I$ 上の確率測度 $\mu_I$ が与えられ、次を満たすとする。

1. $(\mu_I)$ は整合的である。
2. ある $\alpha>0,\beta>0,C<\infty$ が存在し、任意の二時刻 $s,t\in[0,T]$ に対し、二次元分布 $\mu_{\{s,t\}}$ の座標を $(x_s,x_t)$ と書けば
   $$
   \int_{\mathbb R^{\{s,t\}}}
   |x_t-x_s|^\alpha
   \,\mu_{\{s,t\}}(dx)
   \le
   C|t-s|^{1+\beta}.
   $$

次を示せ。

1. 標準経路空間上に有限次元分布 $(\mu_I)$ を持つ過程 $X^\ast$ が存在する。
2. $X^\ast$ は連続修正 $\widetilde X$ を持つ。
3. 任意の $0<\gamma<\beta/\alpha$ に対し、$\widetilde X$ は $\gamma$-Hölder 連続な標本路を a.s. 持つように選べる。
4. 同じ有限次元分布を持つ別の連続過程 $Y$ が同じ確率空間上で $X^\ast$ の修正になっているなら、$Y$ と $\widetilde X$ は識別不能である。

<!-- solution-start -->
### 詳細解答

この問題では「存在」と「標本路正則性」を二つの定理で順に処理します。

**1. 過程の存在。**

$(\mu_I)$ は整合的なので [Kolmogorov 拡張定理](#thm-sto3-kolmogorov-extension)を適用できます。

従って

$$
\Omega^\ast=\mathbb R^{[0,T]},
\qquad
\mathcal F^\ast
=
\sigma(X_t^\ast:0\le t\le T)
$$

上に一意な確率測度 $P^\ast$ が存在し、

$$
X_t^\ast(\omega)=\omega(t)
$$

と置けば、全ての有限集合 $I$ に対して

$$
P^\ast\circ(X_t^\ast)_{t\in I}^{-1}
=
\mu_I
$$

です。

したがって指定された有限次元分布を持つ過程が存在します。

**2. increment モーメント評価を標準 process へ移す。**

$s,t$ を固定します。

$(X_s^\ast,X_t^\ast)$ の分布は $\mu_{\{s,t\}}$ なので、分布による期待値表示から

$$
\begin{aligned}
E^\ast|X_t^\ast-X_s^\ast|^\alpha
&=
\int
|x_t-x_s|^\alpha
\,\mu_{\{s,t\}}(dx)\\
&\le
C|t-s|^{1+\beta}.
\end{aligned}
$$

従って標準 process 自身が Kolmogorov--Chentsov のモーメント条件を満たします。

よって [Kolmogorov--Chentsov 連続性 theorem](#thm-sto3-kolmogorov-chentsov)から、$X^\ast$ は連続修正 $\widetilde X$ を持ちます。

**3. Hölder exponent。**

同じ定理から、任意の

$$
0<\gamma<\frac{\beta}{\alpha}
$$

に対し、$\widetilde X$ は指数 $\gamma$ で Hölder 連続な標本路を a.s. 持つように選べます。

したがって

$$
\boxed{
\text{consistent 有限次元分布}
+
\text{increment モーメント評価}
\Longrightarrow
\text{連続過程 realization}
}
$$

が得られました。

**4. 連続 version の一意性。**

$Y$ が同じ確率空間上で $X^\ast$ の修正であるとします。

$\widetilde X$ も $X^\ast$ の修正なので、各固定 $t$ について

$$
P^\ast(Y_t=X_t^\ast)=1,
$$

$$
P^\ast(\widetilde X_t=X_t^\ast)=1.
$$

従って

$$
P^\ast(Y_t=\widetilde X_t)=1
$$

です。

$Y$ と $\widetilde X$ はともに連続標本路を持つので、[連続な modifications は識別不能](#prop-sto3-continuous-modifications-indistinguishable) を適用して

$$
P^\ast(
Y_t=\widetilde X_t
\text{ for all }t\in[0,T]
)=1.
$$

つまり

$$
\boxed{
Y\text{ and }\widetilde X\text{ are 識別不能}.
}
$$

この結論により、連続 version は「各時刻ごとに同じ」だけでなく、経路全体としてほぼ確実に一意になります。
<!-- solution-end -->

---

# 13. 章末チェック

この章を終えた時点で、次を本文だけから再構成できることを目標にします。

- 有限次元分布を有限座標集合上の確率測度として書ける。
- consistency を座標射影による周辺化として確認できる。
- 標準経路空間 $\mathbb R^T$ と coordinate process を構成できる。
- 円筒集合が有限個の時刻だけを見る事象であることを説明できる。
- Kolmogorov 拡張 theorem で consistency が well-definedness に使われる箇所を示せる。
- 円筒集合前測度の「空集合への減少列で確率が0へ下がる性質」 を有限次元 compact approximation と countable compactness から証明できる。
- Carathéodory 拡張 theorem を使って標準 process を完成できる。
- 拡張 theorem が標本路連続性を保証しない理由を説明できる。
- Kolmogorov--Chentsov theorem の exponent $\beta/\alpha$ をモーメント評価から計算できる。
- 二進格子、Markov inequality、union bound、Borel--Cantelli、連鎖評価の順で連続性 theorem の核心証明を再構成できる。
- 連続な修正が識別不能まで一意になる理由を、有理数の可算稠密性から証明できる。
- consistent 有限次元分布と increment モーメント評価を組み合わせて連続過程 realization を作れる。

次の STO4 では、この構成を centered ガウス有限次元分布

$$
E[X_sX_t]=\min(s,t)
$$

へ適用し、ブラウン運動を実際に構成します。その後、reflection principle、到達時刻、Markov property、strong Markov property へ進みます。
