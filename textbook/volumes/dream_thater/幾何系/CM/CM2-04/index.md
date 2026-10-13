# CM2-04 Dolbeault複体・コホモロジー

<!-- definition-example-audit: strict -->

## 1. 局所的に解けても全体で解けるとは限らない

[局所bar∂-Poincaré補題](../CM2-03/index.md#thm-cm2-03-local-dbar-poincare)によって、$\bar\partial\alpha=0$ を満たす滑らかな $(p,q)$ 形式は、$q\ge1$ なら各点の近くで $\alpha=\bar\partial u$ と書ける。一方、[複素トーラスにおける周期積分の例](../CM2-03/index.md#ex-cm2-03-c01)では、各点の近くで解ける $d\bar z$ に大域的な原始関数が存在しなかった。

つまり「閉じた形式のすべてに大域的な原始形式が存在するか」は、局所微分方程式だけでは答えられない。存在しないときに、その失敗を単に「解けない」と言うのでなく、**どの閉形式が原始形式を持ち、どれが持たないかを区別する**量が欲しい。

そのために、閉形式を集めた空間を、すでに原始形式を持つ形式の空間で割る。これは実微分形式の de Rham コホモロジーに似た構成だが、ここでは $d$ でなく $\bar\partial$、全次数でなく $(p,q)$ の第二次数を使う。

## 2. 固定した $p$ で形式を縦につなぐ

$X$ を複素次元 $n\ge1$ の複素多様体とし、$\mathcal A^{p,q}(X)$ を滑らかな複素数値 $(p,q)$ 形式の複素ベクトル空間とする。$0\le p,q\le n$ で考え、それ以外の次数では $\mathcal A^{p,q}(X)=0$ と約束する。

[型別外微分の二乗零](../CM2-02/index.md#thm-cm2-02-double-complex-identities)により、固定した $p$ について次の矢印を二回たどると零になる。

$$
0\longrightarrow\mathcal A^{p,0}(X)
\xrightarrow{\ \bar\partial\ }\mathcal A^{p,1}(X)
\xrightarrow{\ \bar\partial\ }\cdots
\xrightarrow{\ \bar\partial\ }\mathcal A^{p,n}(X)
\longrightarrow0.
$$

この列が今回の主役である。例えば $n=1,p=0$ なら $\mathcal A^{0,0}\xrightarrow{\bar\partial}\mathcal A^{0,1}\to0$ となる。複素一次元ではすべての $(0,1)$ 形式が自動的に $\bar\partial$ 閉だが、すべてが大域的な $\bar\partial$ 像とは限らない。

<a id="def-cm2-04-dolbeault-complex"></a>

<!-- formal-statement-start -->
> **定義（Dolbeault複体）**  
> $X$ を複素次元 $n$ の複素多様体とし、$p\in\{0,\ldots,n\}$ を固定する。滑らかな $(p,q)$ 形式の複素ベクトル空間 $\mathcal A^{p,q}(X)$ と、型別外微分 $\bar\partial:\mathcal A^{p,q}(X)\to\mathcal A^{p,q+1}(X)$ からなる上記の列を、$p$ を固定した Dolbeault 複体という。境界での項は零空間とし、$\bar\partial^2=0$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-04-dolbeault-complex -->
**定義の確認**。$X=\mathbb C$、$p=0$ とすると $u(z)=z\bar z$ から

$$
\bar\partial u=z\,d\bar z,\qquad
\bar\partial(z\,d\bar z)=0
$$

となる。第一の式は[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)、第二の式は $d\bar z\wedge d\bar z=0$ から従う。したがって二回の作用が実際に零となり、この二つの空間は鎖複体の条件を満たす。
<!-- definition-example-end -->

## 3. 核と像を区別して商を作る

$\bar\partial\alpha=0$ を満たす形式を「閉」、$\alpha=\bar\partial u$ と書ける形式を「完全」と呼ぶ。この二つは[二乗零](../CM2-02/index.md#thm-cm2-02-double-complex-identities)により「完全なら閉」という関係にある。逆向きの失敗だけを残すため、閉形式同士を、差が完全形式であるとき同一視する。

<a id="def-cm2-04-cocycles-coboundaries"></a>

<!-- formal-statement-start -->
> **定義（bar∂閉形式とbar∂完全形式）**  
> 複素多様体 $X$、整数 $0\le p,q\le n$ について、次の部分空間を定める。$q=0$ の場合は $\mathcal A^{p,-1}(X)=0$ とする。

$$
Z_{\bar\partial}^{p,q}(X)
=\ker\!\left(\bar\partial:\mathcal A^{p,q}(X)
\to\mathcal A^{p,q+1}(X)\right),
$$

$$
B_{\bar\partial}^{p,q}(X)
=\operatorname{im}\!\left(\bar\partial:\mathcal A^{p,q-1}(X)
\to\mathcal A^{p,q}(X)\right).
$$

> 前者の元を bar∂閉形式、後者の元を bar∂完全形式という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-04-cocycles-coboundaries -->
**定義の確認**。$\mathbb C$ 上の $z\,d\bar z$ は $\bar\partial$ 閉で、しかも $\bar\partial(z\bar z)=z\,d\bar z$ なので完全である。したがって $z\,d\bar z$ は $Z_{\bar\partial}^{0,1}(\mathbb C)$ と $B_{\bar\partial}^{0,1}(\mathbb C)$ の双方に属する。対して $1\in\mathcal A^{0,0}(\mathbb C)$ は $\bar\partial1=0$ で閉だが、次数 $-1$ の原始形式は存在せず、零でない $1$ は完全ではない。
<!-- definition-example-end -->

<a id="def-cm2-04-dolbeault-cohomology"></a>

<!-- formal-statement-start -->
> **定義（Dolbeaultコホモロジー）**  
> 複素次元 $n$ の複素多様体 $X$ と $0\le p,q\le n$ に対して、Dolbeaultコホモロジーを次の複素ベクトル空間と定義する。

$$
H_{\bar\partial}^{p,q}(X)
=Z_{\bar\partial}^{p,q}(X)/
B_{\bar\partial}^{p,q}(X).
$$

> 閉形式 $\alpha$ の商空間での元を $[\alpha]$ と書く。$[\alpha]=[\beta]$ は、ある $u\in\mathcal A^{p,q-1}(X)$ により $\alpha-\beta=\bar\partial u$ と書けることを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-04-dolbeault-cohomology -->
**定義の確認**。$\mathbb C$ 上の $\alpha=d\bar z$ と $\beta=z\,d\bar z$ はどちらも閉で、$\alpha=\bar\partial\bar z$、$\beta=\bar\partial(z\bar z)$ である。従って $[\alpha]=[\beta]=[0]$。一方で $[\alpha]$ と $[\beta]$ を同じと主張するには、係数が等しいことは不要で、差が $\bar\partial(\bar z-z\bar z)$ であることを確認すれば十分である。
<!-- definition-example-end -->

<a id="prop-cm2-04-quotient"></a>

<!-- formal-statement-start -->
> **命題（商空間と零類の判定）**  
> 複素多様体 $X$ と $0\le p,q\le\dim_{\mathbb C}X$ に対して、$B_{\bar\partial}^{p,q}(X)$ は $Z_{\bar\partial}^{p,q}(X)$ の複素線形部分空間であり、上の商は複素ベクトル空間として定義できる。また、$\alpha\in Z_{\bar\partial}^{p,q}(X)$ に対して $[\alpha]=0$ であることと、$X$ 全体で $\alpha=\bar\partial u$ となる $u\in\mathcal A^{p,q-1}(X)$ が存在することは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

像の元を $\bar\partial u$ と書き、もう一度 $\bar\partial$ を作用させる。核への包含が得られれば商は定義でき、零類の判定は商空間の同値関係そのものを展開すればよい。

<!-- proof-start -->
### 証明

$\alpha\in B_{\bar\partial}^{p,q}(X)$ なら、定義より $\alpha=\bar\partial u$ と表せる。[二乗零](../CM2-02/index.md#thm-cm2-02-double-complex-identities)により

$$
\bar\partial\alpha
=\bar\partial(\bar\partial u)=0,
$$

従って $\alpha\in Z_{\bar\partial}^{p,q}(X)$。$\bar\partial$ は複素線形なので、任意の $a,b\in\mathbb C$ について $\bar\partial(au+bv)=a\bar\partial u+b\bar\partial v$ が成立する。これにより $Z,B$ はともに複素線形部分空間となり、$B\subset Z$ である。

商の定義から $[\alpha]=[0]$ と $\alpha-0\in B$ は同値である。さらに $B$ の定義を代入すれば、これは $\alpha=\bar\partial u$ となる大域的な $u$ の存在と同値である。$q=0$ では $B^{p,0}=0$ なので、この場合にも同じ議論が成立する。$\square$
<!-- proof-end -->

「同じコホモロジー類を持つ」は形式の値が等しいという意味ではない。また $[\alpha]$ を考えるためには、**代表元 $\alpha$ が閉であること**が必要である。任意の形式に無条件で角括弧を付けることはしない。

## 4. 次数0には何が残るか

$q=0$ では割るべき像が零空間であるため、$\bar\partial$ 閉な $(p,0)$ 形式そのものが残る。これは正則性と結び付く。

<a id="prop-cm2-04-zero-degree"></a>

<!-- formal-statement-start -->
> **命題（零次コホモロジーと正則p形式）**  
> 複素多様体 $X$ について、$H_{\bar\partial}^{p,0}(X)$ は大域的な正則 $(p,0)$ 形式の複素ベクトル空間に自然に一致する。ここで正則 $(p,0)$ 形式とは、どの正則座標でも $dz^{i_1}\wedge\cdots\wedge dz^{i_p}$ の係数が正則関数となる滑らかな $(p,0)$ 形式をいう。特に $H_{\bar\partial}^{0,0}(X)=\mathcal O(X)$ は $X$ 上の正則関数全体である。
<!-- formal-statement-end -->

### 証明の見取り図

$q=0$ の像は零。$\bar\partial$ の局所公式で係数ごとの反正則微分を読み、[正則関数の判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)を適用する。

<!-- proof-start -->
### 証明

$B_{\bar\partial}^{p,0}(X)=\operatorname{im}(\mathcal A^{p,-1}\to\mathcal A^{p,0})=0$ である。従って定義より $H_{\bar\partial}^{p,0}(X)=Z_{\bar\partial}^{p,0}(X)$。

正則座標 $z=(z^1,\ldots,z^n)$ において

$$
\omega=\sum_{|I|=p}a_I(z)\,dz^I
$$

と書く。$I=(i_1<\cdots<i_p)$ とし、$dz^I=dz^{i_1}\wedge\cdots\wedge dz^{i_p}$ である。[型別外微分の局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)を各項に適用すると

$$
\bar\partial\omega
=\sum_{|I|=p}\sum_{j=1}^n
\frac{\partial a_I}{\partial\bar z^j}\,
d\bar z^j\wedge dz^I.
$$

$dz^I\wedge d\bar z^j$ は $(p,1)$ 形式の局所基底だから、この和が零となる必要十分条件はすべての $I,j$ について $\partial a_I/\partial\bar z^j=0$ となることである。[正則関数の判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)より、これはすべての $a_I$ が正則であることと同値である。正則座標変換では係数の変換行列も正則なので、この性質は座標の選び方によらない。$p=0$ の場合は $\omega=a_\varnothing$、すなわち正則関数である。$\square$
<!-- proof-end -->

**直接例**。$\mathbb C$ では $1,z,z^2,\ldots$ はすべて異なる $H_{\bar\partial}^{0,0}(\mathbb C)$ の元である。$\bar\partial z^k=0$ であり、$B^{0,0}=0$ なので二つの異なる正則関数が完全形式の差によって同一視されることはない。対して $\bar z$ は $\bar\partial\bar z=d\bar z\ne0$ なので、零次コホモロジーの元ではない。

## 5. 正則写像による引き戻し

コホモロジーが複素多様体の構造を反映しているなら、正則写像でそれがどう移るかも重要である。[正則引き戻しとbar∂の可換性](../CM2-02/index.md#prop-cm2-02-conjugation-pullback)により、閉形式の引き戻しは閉、完全形式の引き戻しは完全となる。

<a id="prop-cm2-04-functoriality"></a>

<!-- formal-statement-start -->
> **命題（Dolbeaultコホモロジーの引き戻し）**  
> $F:X\to Y$ を複素多様体間の正則写像とする。任意の非負整数 $p,q$ に対して、引き戻しは複素線形写像

$$
F^*:H_{\bar\partial}^{p,q}(Y)
\longrightarrow H_{\bar\partial}^{p,q}(X),
\qquad [\alpha]\longmapsto[F^*\alpha]
$$

> を定める。恒等写像の引き戻しは恒等写像であり、正則写像 $G:Y\to Z$ に対し $(G\circ F)^*=F^*\circ G^*$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

写像が商空間上で定まるには、代表元を $\alpha+\bar\partial u$ に交換しても結果が同じであることが必要である。型保存と可換性でそれを示す。

<!-- proof-start -->
### 証明

$F$ は正則なので、[正則引き戻しの型保存](../CM2-01/index.md#prop-cm2-01-holomorphic-pullback)により $F^*\alpha$ は同じ $(p,q)$ 型である。また[引き戻しとの可換性](../CM2-02/index.md#prop-cm2-02-conjugation-pullback)から

$$
\bar\partial(F^*\alpha)
=F^*(\bar\partial\alpha).
$$

$\bar\partial\alpha=0$ なら左辺も零なので、閉形式が閉形式へ移る。$\alpha-\beta=\bar\partial u$ であれば

$$
F^*\alpha-F^*\beta
=F^*(\bar\partial u)
=\bar\partial(F^*u).
$$

従って代表元 $\alpha,\beta$ の違いは引き戻し後にも完全形式であり、$[F^*\alpha]=[F^*\beta]$ が成立する。これで商上の写像が良定義となる。$\alpha$ に関する複素線形性は形式の引き戻しの線形性から従う。

恒等写像については $\operatorname{id}_X^*\alpha=\alpha$。合成については、任意の形式 $\gamma$ に対する引き戻しの合成則 $(G\circ F)^*\gamma=F^*(G^*\gamma)$ を商の両辺に適用すれば、主張した順序の等式となる。$\square$
<!-- proof-end -->

**直接例**。$F:\mathbb C\to\mathbb C$ を $F(t)=t^2$ とすると

$$
F^*(d\bar z)=d(\bar t^2)=2\bar t\,d\bar t
=\bar\partial(\bar t^2).
$$

元の $d\bar z=\bar\partial\bar z$ は零類だから、引き戻した形式も零類である。形式としては $d\bar z$ と $2\bar t\,d\bar t$ は異なるが、各空間でのコホモロジー類は零という対応になっている。

## 6. 局所解の差が大域解の障害を表す

局所可解性から大域可解性を調べるには、開集合上の原始形式を貼り合わせてみるのが自然である。$q=1,p=0$ なら、局所原始形式は**関数**であり、その差を取り扱いやすい。ここでは一般の層コホモロジーを仮定せず、局所解を手で比較する。

開被覆 $X=\bigcup_iU_i$ を取り、閉じた $(0,1)$ 形式 $\alpha$ に対して局所解 $\bar\partial u_i=\alpha|_{U_i}$ があるとする。重なり $U_i\cap U_j$ では

$$
\bar\partial(u_i-u_j)=\alpha-\alpha=0.
$$

従って[正則性判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)により $c_{ij}=u_i-u_j$ は正則関数になる。重なり三つの上では $c_{ij}+c_{jk}+c_{ki}=0$ という関係もある。

<a id="thm-cm2-04-gluing-obstruction"></a>

<!-- formal-statement-start -->
> **定理（局所原始関数の貼り合わせ判定）**  
> $X$ を複素多様体、$\alpha\in\mathcal A^{0,1}(X)$ を $\bar\partial$ 閉形式とする。$X$ の開被覆 $(U_i)$ と、各 $U_i$ 上の滑らかな関数 $u_i$ が $\bar\partial u_i=\alpha|_{U_i}$ を満たすと仮定する。重なりにおく $c_{ij}=u_i-u_j$ は正則であり、三重重なりで

$$
c_{ij}+c_{jk}+c_{ki}=0
$$

> を満たす。さらに次の二条件は同値である。
>
> 1. $[\alpha]=0$ が $H_{\bar\partial}^{0,1}(X)$ で成立する。
> 2. 各 $U_i$ に正則関数 $h_i$ があり、すべての重なりで $c_{ij}=h_i-h_j$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

局所解そのものをつなごうとすると差 $c_{ij}$ が障害になる。正則関数 $h_i$ の分だけ局所解を変更しても $\bar\partial$ は変わらない。この自由度で差をすべて零にできれば、大域解が得られる。

<!-- proof-start -->
### 証明

重なりで $\bar\partial c_{ij}=\bar\partial u_i-\bar\partial u_j=0$ だから、[正則関数の判定](../CM2-02/index.md#prop-cm2-02-holomorphic-function)より $c_{ij}$ は正則である。三重重なりでは

$$
c_{ij}+c_{jk}+c_{ki}
=(u_i-u_j)+(u_j-u_k)+(u_k-u_i)=0.
$$

**(1) から (2)**。$[\alpha]=0$ なら[零類の判定](#prop-cm2-04-quotient)から大域的な滑らかな $u$ があり $\bar\partial u=\alpha$。各 $U_i$ 上で $h_i=u_i-u|_{U_i}$ とおくと、$\bar\partial h_i=\alpha-\alpha=0$、よって $h_i$ は正則である。そして

$$
h_i-h_j=(u_i-u)-(u_j-u)=c_{ij}.
$$

**(2) から (1)**。$v_i=u_i-h_i$ とおく。$h_i$ は正則なので

$$
\bar\partial v_i=\bar\partial u_i-\bar\partial h_i=\alpha|_{U_i}.
$$

さらに $U_i\cap U_j$ で

$$
v_i-v_j=(u_i-u_j)-(h_i-h_j)=c_{ij}-c_{ij}=0.
$$

従って $v_i$ は重なりで一致し、各点で $v(x)=v_i(x)$（$x\in U_i$）と定義すると、被覆の重なりで値が一致するので大域的な滑らかな関数 $v$ を定める。局所的に $\bar\partial v=\alpha$ だから大域的にも $\bar\partial v=\alpha$。再び[零類の判定](#prop-cm2-04-quotient)より $[\alpha]=0$。$\square$
<!-- proof-end -->

[局所bar∂-Poincaré補題](../CM2-03/index.md#thm-cm2-03-local-dbar-poincare)は、どの点の近くにもこのような原始関数を取れることを保証する。しかし、その差 $c_{ij}$ を正則な補正 $h_i-h_j$ にできるとは言っていない。局所理論と大域コホモロジーの間に残るのが、この貼り合わせの問題である。

**簡単な貼り合わせ例**。$\mathbb C$ を $U_1=\{\operatorname{Re}z<1\}$ と $U_2=\{\operatorname{Re}z>-1\}$ で覆い、$\alpha=d\bar z$ とする。局所解を $u_1=\bar z$、$u_2=\bar z+z$ とすると $c_{12}=-z$。正則補正を $h_1=0$、$h_2=z$ と置けば $h_1-h_2=-z$。従って $u_1-h_1=u_2-h_2=\bar z$ は大域解になる。

## 7. 複素トーラスに残る非零類

$\Lambda=\mathbb Z+i\mathbb Z$ とし、$X=\mathbb C/\Lambda$ を一次元の複素トーラスとする。[トーラスの正則アトラス](../CM1-09/index.md#thm-cm1-09-complex-torus-atlas)のもと、平行移動で不変な $d\bar z$ は大域的な $(0,1)$ 形式 $\alpha$ を定める。

<a id="prop-cm2-04-torus-class"></a>

<!-- formal-statement-start -->
> **命題（複素トーラスの非零Dolbeault類）**  
> $X=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上の $\alpha$ を、被覆空間 $\mathbb C$ への引き戻しが $d\bar z$ となる滑らかな $(0,1)$ 形式とする。このとき $\bar\partial\alpha=0$ だが

$$
[\alpha]\ne0\quad\text{in }H_{\bar\partial}^{0,1}(X).
$$

> 特に $H_{\bar\partial}^{0,1}(X)$ は零空間ではない。
<!-- formal-statement-end -->

### 証明の見取り図

局所的には $\bar z$ が原始関数となる。もし大域解があれば、その持ち上げは1と $i$ を周期とする関数で、反正則微分が1になる。基本正方形上でその微分を積分して矛盾を出す。

<!-- proof-start -->
### 証明

次元1では $\mathcal A^{0,2}(X)=0$ だから $\bar\partial\alpha=0$。仮に $[\alpha]=0$ とすると[零類の判定](#prop-cm2-04-quotient)より滑らかな $u:X\to\mathbb C$ が存在して $\bar\partial u=\alpha$。商写像 $\pi:\mathbb C\to X$ に沿う $\widetilde u=u\circ\pi$ は

$$
\widetilde u(z+1)=\widetilde u(z),\qquad
\widetilde u(z+i)=\widetilde u(z),\qquad
\partial_{\bar z}\widetilde u=1
$$

を満たす。$z=x+iy$、$Q=[0,1]\times[0,1]$ とし、$\partial_{\bar z}=(\partial_x+i\partial_y)/2$ を代入すると

$$
\begin{aligned}
\int_Q\partial_{\bar z}\widetilde u\,dx\,dy
&=\frac12\int_0^1
\bigl(\widetilde u(1,y)-\widetilde u(0,y)\bigr)\,dy\\
&\quad+\frac i2\int_0^1
\bigl(\widetilde u(x,1)-\widetilde u(x,0)\bigr)\,dx=0.
\end{aligned}
$$

一方 $\partial_{\bar z}\widetilde u=1$ から同じ積分は面積 $\int_Q1\,dx\,dy=1$ に等しい。矛盾するので大域原始関数は存在せず、$[\alpha]\ne0$。$\square$
<!-- proof-end -->

**何を計算したか**。ここで示したのは特定の一つの非零類の存在であり、$H_{\bar\partial}^{0,1}(X)$ の次元や全類の分類ではない。これらは次章の低次元計算で改めて扱う。また $q=0$ で正則関数が残る現象と、$q=1$ で大域原始形式の障害が残る現象は、同じ商構成の異なる側面である。

## 8. 演習：零類・引き戻し・貼り合わせを計算する

### Level A

<a id="ex-cm2-04-a01"></a>
#### CM2-04-A01 核・像を区別する
- Level: A

$\mathbb C$ 上の $f(z)=z+\bar z$、$\alpha=3\,d\bar z$、$\beta=\bar z\,d\bar z$ について、$f$ が $(0,0)$ 次の閉形式か、$\alpha,\beta$ が $(0,1)$ 次の閉形式かを判定し、後二者が完全なら原始関数を明示せよ。

<!-- solution-start -->
**詳細解答**。$\bar\partial f=d\bar z\ne0$ だから $f\notin Z^{0,0}_{\bar\partial}(\mathbb C)$。複素次元1で $(0,2)$ 形式は零だから、$(0,1)$ 形式 $\alpha,\beta$ はともに閉である。さらに

$$
\bar\partial(3\bar z)=3\,d\bar z=\alpha,\qquad
\bar\partial\!\left(\frac12\bar z^2\right)=\bar z\,d\bar z=\beta.
$$

よって両者は $B^{0,1}$ にも属し、商ではともに零類である。閉であることだけで完全性を主張したのではなく、それぞれ原始関数を作った。
<!-- solution-end -->

<a id="ex-cm2-04-a02"></a>
#### CM2-04-A02 同じ類の異なる代表元
- Level: A

$\mathbb C$ 上で $\alpha=d\bar z$、$\beta=(1+2\bar z)\,d\bar z$ とする。$[\alpha]=[\beta]$ を直接確認せよ。

<!-- solution-start -->
**詳細解答**。どちらも $(0,1)$ 型なので次元1では閉である。差は

$$
\beta-\alpha=2\bar z\,d\bar z
=\bar\partial(\bar z^2).
$$

差が完全形式であるため、[Dolbeaultコホモロジーの定義](#def-cm2-04-dolbeault-cohomology)より $[\beta]=[\alpha]$。さらに $\alpha=\bar\partial\bar z$ なので、両方とも零類である。
<!-- solution-end -->

<a id="ex-cm2-04-a03"></a>
#### CM2-04-A03 零次の核
- Level: A

$\mathbb C$ 上の $1,z^2,\bar z$ のうち $H_{\bar\partial}^{0,0}(\mathbb C)$ に属するものを判定し、$1$ と $z^2$ が異なる類である理由を述べよ。

<!-- solution-start -->
**詳細解答**。[零次の判定](#prop-cm2-04-zero-degree)より、滑らかな関数は正則である場合に限り $H_{\bar\partial}^{0,0}$ の元になる。$\bar\partial1=0$、$\bar\partial(z^2)=0$、$\bar\partial\bar z=d\bar z\ne0$ だから $1,z^2$ が該当し、$\bar z$ は該当しない。$B^{0,0}=0$ なので、$1$ と $z^2$ が同じ類となるには関数自体が一致しなければならない。例えば $z=0$ で $1\ne0^2$ なので異なる類である。
<!-- solution-end -->

<a id="ex-cm2-04-a04"></a>
#### CM2-04-A04 次数の上下端
- Level: A

複素次元 $2$ の多様体 $X$ で、固定した $p=1$ の Dolbeault 複体をすべて書け。また $H_{\bar\partial}^{1,0}(X)$ の分母と、$H_{\bar\partial}^{1,2}(X)$ の分子を求めよ。

<!-- solution-start -->
**詳細解答**。[複体の定義](#def-cm2-04-dolbeault-complex)から

$$
0\longrightarrow\mathcal A^{1,0}(X)
\xrightarrow{\bar\partial}\mathcal A^{1,1}(X)
\xrightarrow{\bar\partial}\mathcal A^{1,2}(X)
\longrightarrow0.
$$

$(1,-1)$ 形式はないので $B_{\bar\partial}^{1,0}=0$。また $(1,3)$ 形式もないから $\bar\partial:\mathcal A^{1,2}\to0$ は零写像であり、$Z_{\bar\partial}^{1,2}=\mathcal A^{1,2}(X)$ である。ただし $H^{1,2}=\mathcal A^{1,2}/B^{1,2}$ であって、分母が自動的に零という意味ではない。
<!-- solution-end -->

<a id="ex-cm2-04-a05"></a>
#### CM2-04-A05 閉でない形式には類を付けない
- Level: A

$\mathbb C^2$ 上の $\gamma=\bar z^1\,d\bar z^2$ が $H_{\bar\partial}^{0,1}(\mathbb C^2)$ の類を定めるか判定せよ。

<!-- solution-start -->
**詳細解答**。[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)で係数を微分すると

$$
\bar\partial\gamma
=d\bar z^1\wedge d\bar z^2\ne0.
$$

したがって $\gamma\notin Z_{\bar\partial}^{0,1}(\mathbb C^2)$ であり、商 $Z/B$ の元 $[\gamma]$ は定義されない。これは「非零の類を定める」とは違う。そもそも閉形式でないため、代表元の資格がない。
<!-- solution-end -->

### Level B

<a id="ex-cm2-04-b01"></a>
#### CM2-04-B01 正則写像と零類
- Level: B

$F:\mathbb C\to\mathbb C$ を $F(t)=t^3$ とし、$\alpha=(1+\bar z)\,d\bar z$ とする。$\alpha$ の原始関数を求め、$F^*\alpha$ を直接計算して引き戻し後の原始関数も確かめよ。

<!-- solution-start -->
**詳細解答**。$u(z)=\bar z+\frac12\bar z^2$ とすると

$$
\bar\partial u=(1+\bar z)\,d\bar z=\alpha.
$$

$F$ は正則であり、$F^*\bar z=\bar t^3$、$F^*d\bar z=d(\bar t^3)=3\bar t^2\,d\bar t$。従って

$$
F^*\alpha=(1+\bar t^3)\,3\bar t^2\,d\bar t.
$$

一方 $u\circ F=\bar t^3+\frac12\bar t^6$ であり

$$
\bar\partial(u\circ F)
=(3\bar t^2+3\bar t^5)\,d\bar t=F^*\alpha.
$$

これは[引き戻しの命題](#prop-cm2-04-functoriality)の計算上の検証で、双方の類は零である。
<!-- solution-end -->

<a id="ex-cm2-04-b02"></a>
#### CM2-04-B02 局所解の正則差
- Level: B

$\mathbb C$ 上で $\alpha=2\bar z\,d\bar z$ とする。$U_1=\{\operatorname{Re}z<1\}$、$U_2=\{\operatorname{Re}z>-1\}$ における局所解 $u_1=\bar z^2+z$、$u_2=\bar z^2+2z+1$ に対して、差 $c_{12}$ を求め、正則補正を構成して大域解を作れ。

<!-- solution-start -->
**詳細解答**。$\bar\partial u_1=\bar\partial u_2=2\bar z\,d\bar z$ だから、どちらも局所原始関数である。重なりでは

$$
c_{12}=u_1-u_2=-z-1.
$$

これは $z$ の多項式で正則である。$h_1=z$、$h_2=2z+1$ と選ぶと

$$
h_1-h_2=z-(2z+1)=-z-1=c_{12}.
$$

従って $u_1-h_1=\bar z^2$、$u_2-h_2=\bar z^2$ は重なりで一致し、大域的な $u=\bar z^2$ を与える。$\bar\partial u=\alpha$ なので[貼り合わせ判定](#thm-cm2-04-gluing-obstruction)の十分条件を具体的に満たした。
<!-- solution-end -->

<a id="ex-cm2-04-b03"></a>
#### CM2-04-B03 pが正でも零次は正則
- Level: B

$\mathbb C^2$ 上の滑らかな $(1,0)$ 形式 $\omega=\bar z^2\,dz^1+z^1\,dz^2$ を考える。$\bar\partial\omega$ を計算し、$\omega$ が $H_{\bar\partial}^{1,0}(\mathbb C^2)$ の元になるか判定せよ。また $\eta=z^2\,dz^1+z^1\,dz^2$ はどうか。

<!-- solution-start -->
**詳細解答**。[局所公式](../CM2-02/index.md#thm-cm2-02-local-formula)より

$$
\bar\partial\omega
=d\bar z^2\wedge dz^1
=-dz^1\wedge d\bar z^2\ne0.
$$

従って $\omega$ は閉でなく、零次コホモロジー類を定めない。一方

$$
\bar\partial\eta
=\bar\partial(z^2)\wedge dz^1
+\bar\partial(z^1)\wedge dz^2=0,
$$

なぜなら $z^1,z^2$ は正則であるからである。[零次の命題](#prop-cm2-04-zero-degree)より $\eta$ は正則 $(1,0)$ 形式として $H_{\bar\partial}^{1,0}$ の元になる。$B^{1,0}=0$ なので $\eta\ne0$ は非零類を与える。
<!-- solution-end -->

<a id="ex-cm2-04-b04"></a>
#### CM2-04-B04 トーラス類のスカラー倍
- Level: B

$X=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で $\alpha=d\bar z$ が降りる $(0,1)$ 形式とする。$c\in\mathbb C$ に対し、$[c\alpha]=0$ と $c=0$ が同値であることを証明せよ。

<!-- solution-start -->
**詳細解答**。$c=0$ なら $c\alpha=0=\bar\partial0$ だから零類である。逆に $c\ne0$ かつ $[c\alpha]=0$ なら、[零類の判定](#prop-cm2-04-quotient)により $\bar\partial u=c\alpha$ となる大域的な $u$ が存在する。$\bar\partial$ は複素線形なので

$$
\bar\partial(c^{-1}u)
=c^{-1}\bar\partial u
=c^{-1}c\alpha=\alpha.
$$

これは[トーラスの非零類](#prop-cm2-04-torus-class)に反する。従って $c\ne0$ では $[c\alpha]\ne0$。特に $c\mapsto[c\alpha]$ は $\mathbb C$ から $H_{\bar\partial}^{0,1}(X)$ への単射線形写像であるが、この段階では全射とは主張しない。
<!-- solution-end -->

### Level C

<a id="ex-cm2-04-c01"></a>
#### CM2-04-C01 複体・商・大域障害の総合
- Level: C

$X=\mathbb C/(\mathbb Z+i\mathbb Z)$ を複素トーラス、$\pi:\mathbb C\to X$ を商写像とし、$X$ 上の $(0,1)$ 形式 $\alpha$ を $\pi^*\alpha=d\bar z$ で定める。

1. $\bar\partial\alpha=0$ を示し、各点の近くで原始関数を作れ。
2. $[\alpha]$ が $H_{\bar\partial}^{0,1}(X)$ の零類でないことを、周期条件と基本正方形上の積分を用いて示せ。
3. $[\alpha]=0$ となるよう局所原始関数を正則補正によって貼り合わせることができない理由を、貼り合わせ判定との関係で説明せよ。
4. $\beta=\alpha+\bar\partial f$（$f\in C^\infty(X)$）とおく。$[\beta]=[\alpha]$ と、$\beta$ が大域完全形式でないことを示せ。

<!-- solution-start -->
**詳細解答**。

**(1)** 商を定める格子平行移動 $z\mapsto z+\lambda$ に対して $d\overline{z+\lambda}=d\bar z$ なので形式は $X$ に降りる。複素次元1で $(0,2)$ 形式は零だから $\bar\partial\alpha=0$。点 $x\in X$ を持ち上げ $z_0$ で表し、格子周期と重ならない小円板上で $w=z-z_0$ を座標とすれば

$$
u_{\mathrm{loc}}=\bar w,\qquad
\bar\partial u_{\mathrm{loc}}=d\bar w=\alpha
$$

が成り立つ。従って局所的には完全である。

**(2)** 大域的な $u$ が $\bar\partial u=\alpha$ を満たすなら、$\widetilde u=u\circ\pi$ は $1,i$ の双方を周期とし、$\partial_{\bar z}\widetilde u=1$。$z=x+iy$ で $\partial_{\bar z}=(\partial_x+i\partial_y)/2$ だから

$$
\begin{aligned}
1
&=\int_0^1\int_0^1\partial_{\bar z}\widetilde u\,dx\,dy\\
&=\frac12\int_0^1\!
\bigl(\widetilde u(1,y)-\widetilde u(0,y)\bigr)\,dy\\
&\quad+\frac i2\int_0^1\!
\bigl(\widetilde u(x,1)-\widetilde u(x,0)\bigr)\,dx=0.
\end{aligned}
$$

最後の二つの積分が零なのはそれぞれ周期1と周期 $i$ による。$1=0$ という矛盾より大域解はない。[零類の判定](#prop-cm2-04-quotient)から $[\alpha]\ne0$。

**(3)** 任意の局所解 $u_i$ について差 $c_{ij}=u_i-u_j$ は正則である。[貼り合わせ判定](#thm-cm2-04-gluing-obstruction)により、もし正則関数 $h_i$ によって $c_{ij}=h_i-h_j$ とできれば、大域的な関数 $u_i-h_i$ が貼り合わされ $\bar\partial u=\alpha$ を満たす。しかし(2)でそのような大域解が存在しないと証明した。従って正則補正は不可能である。

**(4)** $\beta$ は閉である。実際、[二乗零](../CM2-02/index.md#thm-cm2-02-double-complex-identities)より

$$
\bar\partial\beta
=\bar\partial\alpha+\bar\partial^2f=0+0=0.
$$

また $\beta-\alpha=\bar\partial f$ は完全形式なので、[商の定義](#def-cm2-04-dolbeault-cohomology)から $[\beta]=[\alpha]$。仮に $\beta=\bar\partial g$ とすれば $\alpha=\bar\partial(g-f)$ も成立して(2)に反する。従って $\beta$ も大域完全でない。
<!-- solution-end -->

## 9. 次に計算すべきもの

この章で得たのは、すべての $(p,q)$ について $H_{\bar\partial}^{p,q}(X)$ を**定義する方法**、零類・正則引き戻し・零次の同定、および局所解を貼り合わせられないときの大域的障害である。コホモロジーが非零であることを示すには、一つの閉形式が完全でないと示せばよい。一方、空間全体の次元や代表元を分類するには、任意の閉形式を扱う追加の議論が必要になる。

次章では、その追加の議論を低次元の複素多様体で実行する。